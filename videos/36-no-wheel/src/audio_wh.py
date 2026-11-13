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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), cta=Wd(9, 11)[1])
tick = lambda amp=.12: burst(.025, 2500, 7000, .006, amp)
creak = lambda at, a=.08: place(sfx, tone(180, 140, .25, .12, a) + tone(260, 200, .25, .1, a * .5), at, 1., .4)
# 0: Earth; the wooden wheel rolls (creaks), then crumbles to dust
mus += pad(['D2', 'A2', 'F3', 'A3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(1.2, .25), .05)
for k in range(3): creak(.2 + k * .5)
place(sfx, burst(1.4, 300, 4000, .5, .45), Wd(0, 5)[1]); place(sfx, tone(110, 55, 1.2, .5, .3), Wd(0, 5)[1])
# 1: the ancient cart: hooves, creaks; then the wheels vanish and the cart drops with a thud
mus += pad(['A2', 'E3', 'A3', 'C4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
for k in range(int((Wd(1, 12)[1] - T['s1']) / .45)): place(sfx, burst(.05, 300, 1500, .02, .16), T['s1'] + .1 + k * .45, 1., .6)
for k in range(8): creak(T['s1'] + .4 + k * .7, .05)
place(sfx, burst(.9, 300, 4000, .3, .35), Wd(1, 11)[1]); place(sfx, burst(.4, 40, 400, .12, .8), Wd(1, 13)[1] + .1)
# 2: city traffic, a bike bell, a tram bell; each one vanishes with a soft "poof"
sfx += noise_band(60, 900, T['s2'] - .2, T['s3'], .07, .4, .6, lfo=.5)
place(sfx, bell(note('E6'), .8, .06), T['s2'] + .3); place(sfx, bell(note('A5'), 1., .07), T['s2'] + .9)
for j in (1, 3, 5): place(sfx, whoosh(.7, .3), Wd(2, j)[1]); place(sfx, burst(.5, 400, 3000, .18, .25), Wd(2, j)[1] + .1)
mus += pad(['F2', 'C3', 'A3'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
place(sfx, bell(note('C5'), 2., .07), Wd(2, 10)[1])
# 3: wind at altitude, then the jet fan spinning up (rising whine)
sfx += noise_band(200, 2500, T['s3'] - .2, T['s4'], .05, .6, .5, lfo=.8)
tt = np.arange(int((T['s4'] - Wd(3, 4)[1]) * SR)) / SR; f = 300 + 1500 * np.clip(tt / 2.5, 0, 1); ph = 2 * np.pi * np.cumsum(f) / SR
place(sfx, (np.sin(ph) + .4 * np.sin(2 * ph)) * np.clip(tt / .8, 0, 1) * np.clip((tt[-1] - tt) / .4, 0, 1) * .05, Wd(3, 4)[1], 1., .5)
mus += pad(['D2', 'A2', 'C3', 'F3'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
# 4: the turbine: a deep hum, electric crackles on the wires, a bell for 90%
sfx += noise_band(50, 140, T['s4'], T['s5'], .08, .5, .5, lfo=.3)
for k in range(10): place(sfx, burst(.04, 3000, 9000, .01, .07), T['s4'] + .5 + k * .6, 1., .3 + .04 * k)
place(sfx, bell(note('A5'), 2., .08), Wd(4, 2)[1]); place(sfx, bell(note('E6'), 2., .07), Wd(4, 13)[1])
mus += pad(['A2', 'E3', 'C#4', 'E4'], T['s4'] - .2, T['s5'] + .3, .06, .8, .8)
# 5: city goes dark (power-down drop); clock ticks slow to a stop
place(sfx, tone(220, 50, 1.2, .5, .2), Wd(5, 2)[1])
gs = Wd(5, 6)[1]; at = gs - .2
for k in range(9): place(sfx, tick(.14), at, 1., .5); at += .3 + k * .07
mus += pad(['C#2', 'Ab2', 'D3'], T['s5'] - .2, T['s6'] + .3, .07, .5, .8, bright=4)
# 6: hooves of the donkey, the sledge scraping on dirt, heavy breaths
for k in range(int((T['s7'] - T['s6']) / .5)): place(sfx, burst(.05, 300, 1500, .02, .14), T['s6'] + k * .5, 1., .7)
sfx += noise_band(200, 1400, T['s6'], T['s7'], .05, .5, .5, lfo=.9)
mus += pad(['G2', 'D3', 'Bb3'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
# 7: the museum: a soft hall tone, a chime for the toy, a low "no" for the cart
place(sfx, whoosh(.8, .2), T['s7'] - .3); place(sfx, bell(note('D5'), 2.4, .1), Wd(7, 0)[1]); place(sfx, bell(note('A5'), 2., .08), Wd(7, 6)[1])
place(sfx, tone(300, 150, .8, .4, .14), Wd(7, 9)[1])
mus += pad(['D3', 'A3', 'F4'], T['s7'] - .2, T['s8'] + .3, .06, .8, .8)
# 8: mountain wind; llama steps; a rising, open chord for the long roads
sfx += noise_band(300, 2500, T['s8'] - .2, T['s9'], .05, .8, .5, lfo=.8)
for k in range(int((T['s9'] - T['s8']) / .4)): place(sfx, burst(.04, 600, 2400, .015, .1), T['s8'] + k * .4, 1., .3 + .1 * (k % 4))
mus += pad(['D3', 'A3', 'D4', 'F#4'], T['s8'] - .2, T['s9'] + .3, .07, .8, .8)
# 9: the end
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['s9'] - .1, TOTAL, .07, .8, 1.2)
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
