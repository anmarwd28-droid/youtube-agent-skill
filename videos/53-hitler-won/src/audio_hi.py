"""Synthesize the music bed and sound effects for the Short (no samples, no copyright).
usage: python3 -I audio.py <pylib> <timing.json> <total_seconds> <out.wav>"""
import sys, json, wave
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]
SR = 44100; N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)
L = lambda i: TM[i]; Wd = lambda i, j: TM[i]["words"][j]
t = np.arange(N) / SR
mus = np.zeros((N, 2)); sfx = np.zeros((N, 2))

def env(start, end, a=.5, r=.8):
    e = np.clip((t - start) / max(a, 1e-3), 0, 1) * np.clip((end - t) / max(r, 1e-3), 0, 1)
    return np.where((t >= start) & (t <= end), e, 0.0)
def note(f):  # midi-ish helper: name -> Hz
    names = {'C': -9, 'C#': -8, 'D': -7, 'Eb': -6, 'E': -5, 'F': -4, 'F#': -3, 'G': -2, 'Ab': -1, 'A': 0, 'Bb': 1, 'B': 2}
    n, o = f[:-1], int(f[-1]); return 440 * 2 ** ((names[n] + (o - 4) * 12) / 12)
def pad(chord, start, end, amp=.06, a=1.2, r=1.2, bright=6):
    e = env(start, end, a, r); out = np.zeros((N, 2))
    for k, nm in enumerate(chord):
        f = note(nm)
        for d, pan in ((-.11, .25), (0, .5), (.12, .75)):
            ff = f * 2 ** (d / 12)
            w = sum(np.sin(2 * np.pi * ff * h * t + k + h) / h ** 1.6 for h in range(1, bright))
            w *= 1 + .15 * np.sin(2 * np.pi * .13 * t + k)
            out[:, 0] += w * (1 - pan); out[:, 1] += w * pan
    return out * (e * amp / len(chord))[:, None]
def fft_filter(x, lo, hi):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[(f < lo) | (f > hi)] = 0; return np.fft.irfft(X, len(x))
def noise_band(lo, hi, start, end, amp, a=.3, r=.5, lfo=0.):
    n = fft_filter(rng.standard_normal(N), lo, hi); n /= np.abs(n).max() + 1e-9
    e = env(start, end, a, r) * amp * (1 + lfo * np.sin(2 * np.pi * .23 * t + 1) * np.sin(2 * np.pi * .071 * t))
    return np.stack([n * e, np.roll(n, 300) * e], 1)
def place(buf, sig, at, gain=1., pan=.5):
    i = int(at * SR); sig = sig[: max(0, N - i)]
    buf[i:i + len(sig), 0] += sig * gain * (1 - pan) * 2 * .5; buf[i:i + len(sig), 1] += sig * gain * pan * 2 * .5
def tone(f0, f1, dur, decay, amp=1.):
    tt = np.arange(int(dur * SR)) / SR; f = f0 * (f1 / f0) ** (tt / dur); ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-tt / decay) * amp
def burst(dur, lo, hi, decay, amp=1.):
    n = fft_filter(rng.standard_normal(int(dur * SR) + 2048), lo, hi)[: int(dur * SR)]
    tt = np.arange(len(n)) / SR; return n / (np.abs(n).max() + 1e-9) * np.exp(-tt / decay) * amp
def whoosh(dur, amp=1.):
    n = rng.standard_normal(int(dur * SR)); tt = np.arange(len(n)) / SR; out = np.zeros(len(n))
    for k, (lo, hi) in enumerate([(200, 500), (400, 900), (800, 1800), (1500, 3500), (3000, 7000)]):
        b = fft_filter(n, lo, hi); c = (k + .5) / 5 * dur; out += b * np.exp(-((tt - c) / (dur * .22)) ** 2)
    return out / (np.abs(out).max() + 1e-9) * amp
def bell(f, dur=2.5, amp=.3):
    tt = np.arange(int(dur * SR)) / SR
    return sum(np.sin(2 * np.pi * f * m * tt) * np.exp(-tt / (dur * .35 / m ** .5)) * a for m, a in ((1, 1), (2.76, .45), (5.4, .22), (8.9, .1))) * amp
S0 = lambda i: L(i)["start"]
T = {f"s{i}": S0(i) for i in range(1, 13)}; T['cta'] = Wd(12, 10)[1]
rr = np.random.default_rng(6)
def groan(dur, amp=1., f0=95):
    n = rng.standard_normal(int(dur * SR)); tt = np.arange(len(n)) / SR
    b = fft_filter(n, 180, 900) * .5 + fft_filter(n, 500, 1400) * .3; b /= np.abs(b).max() + 1e-9
    v = np.sin(2 * np.pi * f0 * (1 + .04 * np.sin(2 * np.pi * 5 * tt)) * tt) * .6 + np.sin(2 * np.pi * f0 * 2.02 * tt) * .25
    e = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 1.5
    return (b * .6 + v * .5) * e * amp
def beat(at, amp=.3):
    place(sfx, tone(70, 40, .18, .08, amp), at); place(sfx, tone(65, 38, .16, .07, amp * .7), at + .22)
def drone(f, start, end, amp):
    e = env(start, end, 1.2, 1.2); w = np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * f * 1.5 * t + 1) + .25 * np.sin(2 * np.pi * f * 2.01 * t)
    w *= 1 + .3 * np.sin(2 * np.pi * .2 * t); return np.stack([w * e * amp, np.roll(w, 400) * e * amp], 1)
def pluck(f, dur=1.2, amp=.1):
    tt = np.arange(int(dur * SR)) / SR; return sum(np.sin(2 * np.pi * f * h * tt) * np.exp(-tt * (3 + h * 1.5)) / h for h in range(1, 6)) * amp
def birds(start, end, n, amp=.03):
    for k in range(n):
        at = start + rr.random() * (end - start - .4); f0 = 2600 + rr.random() * 1600
        for q in range(2 + int(rr.random() * 3)): place(sfx, tone(f0, f0 * (1.15 + .2 * rr.random()), .07, .04, amp), at + q * .11, 1., rr.random())
def thud(at, amp=.3): place(sfx, tone(140, 60, .2, .07, amp), at); place(sfx, burst(.12, 80, 900, .04, amp * .4), at)

# 0: the hook: a low drone and a dark swell as the occupied area spreads, a deep hit on "هتلر"
mus += pad(['D2', 'A2', 'F3'], 0, T['s1'] + .3, .06, .5, .6, bright=3); drone(note('D2'), 0, T['s1'], .05)
place(sfx, burst(.6, 30, 250, .25, .45), Wd(0, 3)[1]); place(sfx, tone(110, 55, 1.6, .8, .08), Wd(0, 3)[1]); place(sfx, whoosh(1.4, .12), .3)
place(sfx, whoosh(.6, .15), T['s1'] - .45)
# 1: 1942: a march-like low pulse while the front line is drawn, a toll on "الفولغا"
mus += pad(['D2', 'A2', 'F3', 'A3'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
k = 0
while T['s1'] + k * .5 < T['s2'] - .3: place(sfx, burst(.08, 40, 300, .05, .14), T['s1'] + .2 + k * .5, 1., .5); k += 1
place(sfx, bell(note('D4'), 3.0, .08), Wd(1, 14)[1])
# 2: Stalingrad: winter wind, a gauge that drops, a rising count of planes
sfx += noise_band(200, 1800, T['s2'] - .2, T['s3'], .02, .6, .6, lfo=.5)
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s2'] - .2, T['s3'] + .3, .06, .6, .8, bright=3)
place(sfx, burst(.5, 30, 300, .2, .35), Wd(2, 1)[1]); place(sfx, tone(400, 120, 1.0, .9, .05), Wd(2, 4)[1] + .1)
for k in range(12): place(sfx, tone(900 + k * 40, 900 + k * 40, .04, .02, .03), Wd(2, 7)[1] + k * .2, 1., .6)
# 3: the Holocaust: a slow, quiet minor chord, a distant train, no hits
mus += pad(['C2', 'G2', 'Eb3', 'G3'], T['s3'] - .2, T['s4'] + .3, .05, 1.2, 1.2, bright=2)
sfx += noise_band(60, 400, T['s3'] - .2, Wd(3, 7)[1], .018, .6, .8, lfo=2.)
place(sfx, bell(note('C4'), 4.0, .05), Wd(3, 7)[1])
# 4: no United Nations: a hollow fall as the building fades, a "cross" on the declaration
mus += pad(['F2', 'C3', 'Ab3'], T['s4'] - .2, T['s5'] + .3, .055, .6, .8, bright=3)
place(sfx, tone(330, 110, 1.4, .8, .06), Wd(4, 3)[1]); place(sfx, burst(.15, 500, 4000, .05, .15), Wd(4, 8)[1] + .1); place(sfx, burst(.15, 500, 4000, .05, .12), Wd(4, 8)[1] + .35)
# 5: the V-2 launch: ignition roar, climb sweep, a bright chime at space
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s5'] - .2, T['s6'] + .3, .055, .6, .8, bright=4)
sfx += noise_band(40, 900, Wd(5, 2)[1], Wd(5, 9)[1], .07, .2, 1.5, lfo=6.)
place(sfx, burst(.8, 30, 400, .3, .4), Wd(5, 2)[1] + .1); place(sfx, tone(200, 1200, 3.0, 9., .03), Wd(5, 3)[1]); place(sfx, bell(note('E5'), 2.4, .08), Wd(5, 8)[1])
# 6: the Saturn V: a rising chord, a long rumble at the launch, a warm bell on "القمر"
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s6'] - .2, T['s7'] + .3, .065, .8, .8)
sfx += noise_band(30, 700, Wd(6, 9)[1] - .3, T['s7'], .09, .3, 1.0, lfo=5.)
place(sfx, burst(1.0, 25, 300, .4, .5), Wd(6, 9)[1] - .3); place(sfx, bell(note('B4'), 2.6, .09), Wd(6, 14)[1])
# 7: rockets as weapons: cold drone, a searchlight hum
mus += pad(['D2', 'A2', 'F3'], T['s7'] - .2, T['s8'] + .3, .055, .6, .8, bright=2); drone(note('D2'), T['s7'], T['s8'], .05)
sfx += noise_band(800, 2200, T['s7'], T['s8'], .008, .5, .5, lfo=.3); place(sfx, tone(220, 110, 1.2, .8, .06), Wd(7, 6)[1])
# 8: the bomb: typewriter clicks on the letter, desert wind, a tense low pad
for k in range(12): place(sfx, burst(.03, 2000, 7000, .01, .07), T['s8'] + .1 + k * .13 + (k % 3) * .02, 1., .45 + .05 * (k % 3))
sfx += noise_band(300, 1500, Wd(8, 3)[1], T['s9'], .015, .6, .5, lfo=.4)
mus += pad(['B1', 'F#2', 'D3', 'F#3'], T['s8'] - .2, T['s9'] + .3, .06, .6, .8, bright=3)
# 9: the twist: a hit, the nucleus splitting (a sharp crack and a sweep), a bell on "برلين"
place(sfx, whoosh(.8, .2), T['s9'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(9, 0)[1]); place(sfx, bell(note('E5'), 2.4, .09), Wd(9, 0)[1])
place(sfx, burst(.4, 300, 6000, .1, .35), Wd(9, 1)[1] + .3); place(sfx, tone(1600, 200, .8, .6, .06), Wd(9, 1)[1] + .3); place(sfx, bell(note('A4'), 2.6, .09), Wd(9, 5)[1])
mus += pad(['C2', 'G2', 'E3', 'G3', 'C4'], T['s9'] - .2, T['s10'] + .3, .07, .8, .8)
# 10: leaving: harbour, a ship's horn, footsteps
sfx += noise_band(200, 1200, T['s10'] - .2, T['s11'], .012, .5, .5, lfo=.3)
place(sfx, tone(110, 108, 1.6, .9, .07), T['s10'] + .5); place(sfx, tone(165, 163, 1.6, .9, .04), T['s10'] + .5)
k = 0
while T['s10'] + k * .45 < T['s11'] - .3: place(sfx, burst(.05, 300, 2500, .02, .05), T['s10'] + .3 + k * .45, 1., .45 + .1 * (k % 2)); k += 1
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s10'] - .2, T['s11'] + .3, .06, .8, .8, bright=3)
# 11: the scientists' arcs across the ocean: soft rising tones, one per arc
for k in range(4): place(sfx, tone(500 + k * 120, 900 + k * 160, 1.2, 3., .03), Wd(11, k)[1], 1., .3 + .12 * k)
mus += pad(['D2', 'A2', 'F3', 'A3', 'D4'], T['s11'] - .2, T['s12'] + .3, .065, .8, .8)
# 12: the end
mus += pad(['D2', 'A2', 'D3', 'F3', 'A3'], T['s12'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('D4'), 0), (note('A4'), .35), (note('D5'), .7))):
    place(sfx, bell(f, 2.4, .12), T['cta'] + .1 + at, 1., .35 + .15 * k)

# ---------------- simple reverb on music, then mix
ir_len = int(2.2 * SR); ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR / .6); ir /= np.sqrt((ir ** 2).sum())
def conv(x): n = len(x) + ir_len; X = np.fft.rfft(x, n) * np.fft.rfft(ir, n); return np.fft.irfft(X, n)[: len(x)]
wet = np.stack([conv(mus[:, 0]), conv(np.roll(mus[:, 1], 211))], 1)
mix = mus * .7 + wet * .45 + sfx
mix = mix[: int(TOTAL * SR)]
fade = np.clip((TOTAL - np.arange(len(mix)) / SR) / .6, 0, 1); mix *= fade[:, None]
mix /= np.abs(mix).max() + 1e-9; mix *= .8
with wave.open(OUT, 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok', T)
