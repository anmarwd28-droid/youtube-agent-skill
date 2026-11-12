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
st = Wd(6, 5)[1] - .2
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), storm=st, s7=S0(7), s8=S0(8), cta=Wd(8, 4)[1])
# 0: wind over the city, wing beats
sfx += noise_band(200, 1800, 0, T['s1'] + .3, .06, .2, .5, lfo=.5)
for k in range(7): place(sfx, whoosh(.32, .2), .15 + k * .34, 1., .25 + .08 * k)
mus += pad(['D2', 'A2', 'F#3', 'A3'], 0, T['s1'] + .3, .07, .4, .8, bright=5)
# 1: wings open, the bus arrives
place(sfx, whoosh(.8, .35), Wd(1, 2)[1] - .25); place(sfx, bell(note('D5'), 2., .09), Wd(1, 4)[1])
place(sfx, tone(70, 55, 1.4, .8, .35), Wd(1, 6)[1] - .6); sfx += noise_band(60, 400, Wd(1, 6)[1] - .7, Wd(1, 7)[1] + .4, .12, .3, .5)
place(sfx, bell(note('A4'), 2., .08), Wd(1, 8)[1])
mus += pad(['G2', 'D3', 'B3'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8, bright=4)
# 2: muscles: slow heartbeat
for k in range(6):
    place(sfx, tone(75, 45, .22, .09, .5), T['s2'] + .3 + k * .75); place(sfx, tone(65, 40, .2, .08, .35), T['s2'] + .52 + k * .75)
for k in range(5): place(sfx, whoosh(.5, .12), T['s2'] + .2 + k * .95, 1., .3)
place(sfx, bell(note('E5'), 2., .09), Wd(2, 5)[1])
mus += pad(['A2', 'E3', 'C#4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
# 3: hard flapping, the calorie counter runs
for k in range(11): place(sfx, whoosh(.28, .16), T['s3'] + .2 + k * .57, 1., .4 + .03 * k)
c0, c1 = Wd(3, 3)[1] - .2, Wd(3, 6)[1] + .3
for k in range(24): place(sfx, tone(900 + k * 28, 900 + k * 28, .04, .02, .07), c0 + (c1 - c0) * k / 24)
place(sfx, bell(note('A5'), 1.6, .1), c1); place(sfx, bell(note('D5'), 2., .09), Wd(3, 8)[1]); place(sfx, bell(note('F#5'), 2., .09), Wd(3, 9)[1])
mus += pad(['F2', 'C3', 'A3'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
# 4: climbing: wind gets thinner and colder
sfx += noise_band(400, 5000, T['s4'], T['s5'], .1, 1.5, .6, lfo=.6); sfx += noise_band(3000, 9000, T['s4'] + 2.5, T['s5'], .04, 2., .5)
for k in range(8): place(sfx, whoosh(.36, .13), T['s4'] + .2 + k * .7, 1., .35)
place(sfx, bell(note('B5'), 2.4, .07), Wd(4, 5)[1]); place(sfx, bell(note('F#5'), 2.4, .06), Wd(4, 8)[1])
mus += pad(['B2', 'F#3', 'D4', 'A4'], T['s4'] - .2, T['s5'] + .3, .06, 1., .8)
# 5: the jam leaves, doors on the roofs
sfx += noise_band(60, 500, T['s5'], Wd(5, 5)[1] + .6, .14, .2, 1.2)
for k, f in enumerate((392, 440, 349)): place(sfx, tone(f, f, .22, .2, .07), T['s5'] + .25 + k * .33, 1., .3 + .2 * k)
for k in range(5): place(sfx, whoosh(.4, .15), Wd(5, 6)[1] + k * .45, 1., .8 - .12 * k)
place(sfx, bell(note('G5'), 2., .09), Wd(5, 7)[1])
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
# 6a: traffic lights in the sky
for k in range(3): place(sfx, tone(1200, 1200, .09, .05, .08), T['s6'] + .5 + k * .55)
place(sfx, tone(1600, 1600, .3, .2, .09), Wd(6, 4)[1] + .15); place(sfx, whoosh(.7, .3), Wd(6, 4)[1] + .2, 1., .7)
for k in range(5): place(sfx, whoosh(.22, .1), T['s6'] + .2 + k * .42, 1., .3)
mus += pad(['E2', 'B2', 'G3'], T['s6'] - .2, T['s7'] + .3, .07, .8, .8, bright=4)
# 6b: the storm
sfx += noise_band(1500, 9000, T['storm'], T['s7'] + .2, .11, .3, .5); sfx += noise_band(100, 700, T['storm'], T['s7'] + .2, .08, .3, .5, lfo=.8)
for at, g in ((T['storm'] + .78, .9), (T['storm'] + 2.52, .7)):
    place(sfx, burst(.08, 1500, 9000, .03, .5 * g), at); place(sfx, burst(2.4, 30, 260, .8, .9 * g), at + .06); place(sfx, tone(60, 32, 2., .9, .5 * g), at + .1)
# 7: the sea, pedals and a slow propeller
sfx += noise_band(200, 2500, T['s7'], T['s8'] + .2, .07, .8, .8, lfo=.9)
for k in range(30): place(sfx, tone(150, 110, .16, .08, .05), T['s7'] + .3 + k * .29, 1., .45)
place(sfx, bell(note('D5'), 2.4, .12), T['s7'] + .1); place(sfx, whoosh(1.1, .25), Wd(7, 5)[1] - .4)
d0, d1 = Wd(7, 9)[1] - .2, Wd(7, 13)[1] + .4
for k in range(20): place(sfx, tone(700 + k * 30, 700 + k * 30, .04, .02, .06), d0 + (d1 - d0) * k / 20)
place(sfx, bell(note('A5'), 2., .1), d1)
mus += pad(['G2', 'D3', 'B3', 'F#4'], T['s7'] - .1, T['s8'] + .3, .07, .7, .8)
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['s8'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))):
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
