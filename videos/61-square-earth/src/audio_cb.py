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
T = {f"s{i}": S0(i) for i in range(1, 13)}; T['cta'] = Wd(12, 9)[1]
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
def tick(at, amp=.05, f=2400): place(sfx, burst(.025, f * .6, f * 2, .008, amp), at, 1., .5)
def chuff(at, amp=.12): place(sfx, burst(.22, 80, 1600, .09, amp), at, 1., .45)
def rumble(start, end, amp): return noise_band(25, 160, start, end, amp, .4, .8, lfo=1.3)
# 0: the hook: a deep shimmer as the Earth folds into a cube, a heavy hit on "مكعّباً"
mus += pad(['D2', 'A2', 'F3'], 0, T['s1'] + .3, .05, .4, .6, bright=3)
place(sfx, tone(200, 900, 1.6, 2.5, .03), Wd(0, 4)[1] - .5); place(sfx, burst(.7, 30, 220, .3, .45), Wd(0, 5)[1]); place(sfx, whoosh(1.0, .12), Wd(0, 5)[1])
# 1: the shape: a bright chord, a tick per corner, a bell on the edge length
mus += pad(['F2', 'C3', 'A3', 'C4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
for k in range(4): place(sfx, pluck(note(['D4', 'F4', 'A4', 'D5'][k]), 1.2, .05), T['s1'] + .2 + k * .16, 1., .3 + .1 * k)
place(sfx, bell(note('A5'), 2.2, .06), Wd(1, 5)[1])
# 2: gravity: a low pull for the arrows, bells on the face centre and the edge
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s2'] - .2, T['s3'] + .3, .055, .6, .8, bright=2)
place(sfx, tone(300, 80, 1.6, .9, .05), Wd(2, 0)[1]); place(sfx, bell(note('E5'), 2.2, .07), Wd(2, 6)[1]); place(sfx, bell(note('B4'), 2.0, .05), Wd(2, 10)[1])
# 3: the oceans run off: flowing water, a deep tone on the depth
sfx += noise_band(150, 1100, T['s3'] - .2, T['s4'], .022, .6, .6, lfo=.4); sfx += noise_band(60, 500, Wd(3, 0)[1], Wd(3, 8)[1], .03, .8, 1.0, lfo=.2)
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
place(sfx, bell(note('G5'), 2.4, .07), Wd(3, 6)[1]); place(sfx, tone(220, 70, 1.4, .8, .05), Wd(3, 9)[1])
# 4: the air pools: a soft breeze, gentle shore waves, a warm chord
sfx += noise_band(300, 2000, T['s4'] - .2, T['s5'], .013, .8, .8, lfo=.3)
mus += pad(['C3', 'G3', 'E4'], T['s4'] - .2, T['s5'] + .3, .055, .8, .8)
place(sfx, bell(note('C5'), 2.2, .06), Wd(4, 9)[1])
# 5: the climb: waves at the start, wind, footsteps, a tense chord
sfx += noise_band(80, 900, T['s5'] - .2, Wd(5, 4)[1], .02, .5, .8, lfo=.18)
sfx += noise_band(300, 2400, T['s5'] - .2, T['s6'], .016, .6, .6, lfo=.5)
for k in range(12): place(sfx, burst(.05, 200, 1500, .02, .04), T['s5'] + .4 + k * .5, 1., .45)
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s5'] - .2, T['s6'] + .3, .055, .6, .8, bright=3)
# 6: the knife edge: silence of space, a cold drone, a hit on the angle
mus += pad(['C2', 'G2', 'Eb3', 'G3'], T['s6'] - .2, T['s9'] + .3, .05, .8, .8, bright=2)
mus += drone(880, T['s6'] - .2, T['s9'], .005)
place(sfx, burst(.3, 40, 300, .12, .28), Wd(6, 10)[1])
# 7: the corners: a rising tone along the line, a low hit on "في الفضاء"
place(sfx, tone(300, 700, 1.6, 1.4, .03), Wd(7, 2)[1]); place(sfx, whoosh(.9, .1), Wd(7, 9)[1] - .4); place(sfx, burst(.5, 30, 200, .25, .35), Wd(7, 9)[1])
# 8: the twist: lighter weight, scale beeps
place(sfx, bell(note('E5'), 2.4, .08), Wd(8, 0)[1])
for k in range(6): place(sfx, tone(1800, 1800, .05, .03, .03), Wd(8, 3)[1] + k * .14)
place(sfx, tone(2200, 2200, .12, .06, .04), Wd(8, 6)[1])
# 9: sunrise everywhere at once: a rising chord, three soft bells together, birds
place(sfx, burst(.3, 40, 300, .12, .25), T['s9'])
mus += pad(['F2', 'C3', 'A3', 'C4', 'F4'], T['s9'] - .2, T['s10'] + .3, .07, 1.0, .8)
for k, n in enumerate(['C5', 'F5', 'A5']): place(sfx, bell(note(n), 2.4, .06), Wd(9, 4)[1], 1., .3 + .2 * k)
birds(Wd(9, 5)[1], T['s10'], 4, .02)
# 10: the surprise, then the collapse: huge rumbles and cracks
place(sfx, whoosh(.8, .16), T['s10'] - .35); place(sfx, burst(.3, 40, 300, .12, .35), Wd(10, 0)[1]); place(sfx, bell(note('E5'), 2.4, .08), Wd(10, 1)[1])
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s10'] - .2, T['s11'] + .3, .06, .6, .8, bright=2)
sfx += rumble(Wd(10, 8)[1] - .2, Wd(11, 4)[1] + .4, .09)
for k in range(8): place(sfx, burst(.5, 30, 400, .2, .3), Wd(10, 8)[1] + k * .7, 1., .3 + .06 * k); place(sfx, burst(.15, 800, 5000, .05, .08), Wd(10, 8)[1] + k * .7 + .1)
# 11: round again: a calm bright chord
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s11'] - .2, T['s12'] + .3, .065, .6, .8)
place(sfx, bell(note('G5'), 2.4, .08), Wd(11, 2)[1]); place(sfx, bell(note('D5'), 2.4, .06), Wd(11, 7)[1])
# 12: the end
mus += pad(['D2', 'A2', 'D3', 'F#3', 'A3'], T['s12'] - .1, TOTAL, .07, .8, 1.2)
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
