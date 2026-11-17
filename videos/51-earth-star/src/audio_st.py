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
T = {f"s{i}": S0(i) for i in range(1, 12)}; T['cta'] = Wd(11, 8)[1]
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
# 0: the hook: a deep rumble, lava crackle, a rising tone as the Earth ignites, a hit on "شمس؟"
sfx += drone(41, 0, T['s1'] + .4, .05) + noise_band(30, 260, 0, T['s1'] + .2, .05, .2, .5, lfo=.6)
mus += pad(['A1', 'E2', 'C3', 'E3'], 0, T['s1'] + .3, .06, .3, .6, bright=4)
for k in range(14): place(sfx, burst(.08, 600, 5000, .03, .05), .1 + k * .14 + rr.random() * .1, 1., rr.random())
place(sfx, tone(80, 320, 2.0, 1.6, .08), .05); place(sfx, burst(.6, 30, 220, .3, .55), Wd(0, 5)[1]); place(sfx, tone(160, 50, 1.4, .9, .14), Wd(0, 5)[1])
place(sfx, whoosh(.6, .18), T['s1'] - .45)
# 1: the Sun: a low roar, a warm pad, a soft pop for every fusion flash
sfx += noise_band(40, 320, T['s1'] - .2, T['s2'] + .2, .05, .5, .5, lfo=.7)
mus += pad(['D2', 'A2', 'F#3', 'A3'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
place(sfx, burst(.3, 200, 2500, .1, .1), Wd(1, 3)[1])
fs = Wd(1, 5)[1] - .3
for k in range(4):
    at = fs + 2.5 * k + 1.27
    if at < T['s2']: place(sfx, tone(900, 1800, .25, .12, .05), at, 1., .6); place(sfx, burst(.15, 1500, 7000, .05, .06), at)
place(sfx, bell(note('D5'), 2.0, .07), Wd(1, 7)[1])
# 2: the Earth's core: a deeper rumble, ticks as the bars appear
sfx += noise_band(25, 180, T['s2'] - .2, T['s3'], .05, .5, .5, lfo=.5)
mus += pad(['B1', 'F#2', 'D3', 'F#3'], T['s2'] - .2, T['s3'] + .3, .055, .7, .8, bright=4)
place(sfx, tone(600, 600, .05, .03, .05), Wd(2, 5)[1]); place(sfx, tone(400, 400, .05, .03, .05), Wd(2, 7)[1]); place(sfx, tone(300, 120, .6, .4, .06), Wd(2, 8)[1])
# 3: a ball of Earths: whooshes, an accelerating count, a hit on "ألف مرة"
place(sfx, whoosh(1.0, .2), T['s3'] - .1)
for k in range(10): place(sfx, whoosh(.5, .05), Wd(3, 3)[1] + k * .38, 1., rr.random())
ta, tb = Wd(3, 3)[1], Wd(3, 13)[1]; n = 36
for k in range(n): u = (k / n) ** .7; at = ta + (tb - ta) * u; place(sfx, tone(500 + 18 * k, 500 + 18 * k, .035, .02, .03), at)
place(sfx, burst(.5, 30, 250, .25, .45), Wd(3, 12)[1]); place(sfx, tone(330, 82, 1.2, .8, .09), Wd(3, 12)[1])
mus += pad(['G1', 'D2', 'Bb2', 'D3'], T['s3'] - .2, T['s4'] + .3, .06, .6, .8, bright=4)
# 4: what it is made of: soft blips as the columns rise, a low "wrong" tone on "لكنّها"
for k in range(5): place(sfx, tone(700 - 60 * k, 700 - 60 * k, .07, .04, .035), Wd(4, 5)[1] + k * .18, 1., .7)
for k in range(2): place(sfx, tone(440 + 110 * k, 440 + 110 * k, .07, .04, .03), Wd(4, 1)[1] + k * .2, 1., .3)
place(sfx, tone(140, 70, .9, .5, .1), Wd(4, 5)[1]); place(sfx, burst(.3, 40, 300, .12, .25), Wd(4, 7)[1])
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s4'] - .2, T['s5'] + .3, .055, .6, .8)
# 5: the hydrogen cloud: an airy shimmer and a wide pad
sfx += noise_band(3000, 9000, T['s5'] - .2, T['s6'] + 1, .018, .8, .8, lfo=1.)
mus += pad(['C#2', 'G#2', 'E3', 'B3', 'D#4'], T['s5'] - .2, T['s6'] + .3, .07, 1., .8) if False else pad(['C#2', 'Ab2', 'E3', 'B3', 'Eb4'], T['s5'] - .2, T['s6'] + .3, .07, 1., .8)
place(sfx, whoosh(1.6, .15), Wd(5, 2)[1])
# 6: the Moon falls: clock ticks, a rising whoosh and tone, a big impact
ti = Wd(6, 11)[1] + .2
sfx += drone(46, T['s6'], ti + .3, .04)
k = 0
while Wd(6, 5)[1] + k * .3 < ti: place(sfx, tone(1500, 1500, .03, .015, .04), Wd(6, 5)[1] + k * .3, 1., .6); k += 1
place(sfx, tone(120, 700, ti - Wd(6, 5)[1] + .1, 9., .05), Wd(6, 5)[1] - .1); place(sfx, whoosh(1.4, .25), ti - 1.3, 1., .3)
place(sfx, burst(1.2, 25, 220, .5, .8), ti); place(sfx, burst(.5, 300, 4000, .15, .3), ti); place(sfx, tone(110, 35, 1.8, 1.0, .2), ti)
mus += pad(['D2', 'A2', 'C3', 'F3'], T['s6'] - .2, T['s7'] + .3, .055, .6, .8, bright=4)
# 7: the oceans boil: bubbling, hissing steam, a roar; a deep swell on "حياة"
sfx += noise_band(2000, 8000, T['s7'] - .1, T['s8'], .035, .4, .6, lfo=.8) + noise_band(30, 300, T['s7'] - .1, T['s8'], .06, .4, .6, lfo=.5)
for k in range(60): place(sfx, tone(140 + rr.random() * 260, 300 + rr.random() * 400, .06, .03, .03), Wd(7, 0)[1] + rr.random() * 3.6, 1., rr.random())
for k in range(5): place(sfx, burst(.4, 40, 400, .2, .12), Wd(7, 2)[1] + k * .35 + rr.random() * .1)
place(sfx, tone(60, 40, 1.8, 1.2, .15), Wd(7, 5)[1]); mus += drone(55, T['s7'], T['s8'] + .2, .035)
# 8: millions of years later: near silence, then the ignition boom and a bright chord
place(sfx, whoosh(1.2, .12), T['s8'] - .3)
place(sfx, tone(50, 120, 1.0, 9., .05), Wd(8, 3)[1] - 1.0); place(sfx, burst(1.4, 25, 240, .6, .8), Wd(8, 3)[1]); place(sfx, tone(220, 55, 2.2, 1.4, .16), Wd(8, 3)[1])
mus += pad(['F#2', 'C#3', 'A3', 'E4'], Wd(8, 3)[1] - .1, T['s9'] + .3, .075, .6, .8)
place(sfx, bell(note('A4'), 2.4, .08), Wd(8, 6)[1]); place(sfx, bell(note('E5'), 2.4, .06), Wd(8, 9)[1])
# 9: Mars: wind, a second-sun shimmer
sfx += noise_band(200, 1500, T['s9'] - .2, T['s10'], .03, .5, .5, lfo=.8)
mus += pad(['D2', 'A2', 'F3', 'A3'], T['s9'] - .2, T['s10'] + .3, .06, .8, .8)
place(sfx, bell(note('C#5'), 2.6, .08), Wd(9, 5)[1]); place(sfx, tone(900, 1300, .9, .6, .03), Wd(9, 5)[1])
# 10: the twist: a hit, a counting tick line, a rising bell line
place(sfx, whoosh(.8, .2), T['s10'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(10, 0)[1]); place(sfx, bell(note('E5'), 2.4, .09), Wd(10, 0)[1])
ta, tb = Wd(10, 4)[1], Wd(10, 9)[1]
for k in range(24): place(sfx, tone(600 + 25 * k, 600 + 25 * k, .03, .02, .025), ta + (tb - ta) * k / 24)
for k, nn in enumerate(('C5', 'E5', 'G5', 'C6')): place(sfx, bell(note(nn), 1.8, .07), Wd(10, 8)[1] + k * .18, 1., .3 + .12 * k)
place(sfx, tone(500, 250, .5, .3, .05), Wd(10, 12)[1])
mus += pad(['C2', 'G2', 'E3', 'G3', 'C4'], T['s10'] - .2, T['s11'] + .3, .07, .8, .8)
# 11: the end
mus += pad(['A2', 'E3', 'A3', 'C#4', 'E4'], T['s11'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('A4'), 0), (note('E5'), .35), (note('A5'), .7))):
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
