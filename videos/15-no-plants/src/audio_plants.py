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
T = dict(van=Wd(0, 6)[1] + .2, morn=S0(1), oxy=S0(2), food=S0(3), market=S0(4), herb=Wd(4, 5)[1] - .3, wolf=Wd(4, 9)[1], ero=S0(5), dust=Wd(5, 7)[1], mud=Wd(5, 10)[1], rain=S0(6), co2=S0(7), space=S0(8), end=S0(9))
mus += pad(['D3', 'A3', 'F4'], T['van'], T['food'] + .6, .05, 1.0, .8)
mus += pad(['Bb2', 'F3', 'D4'], T['food'], T['ero'] + .6, .06, .6, .8)
mus += pad(['G2', 'D3', 'Bb3'], T['ero'], T['co2'] + .6, .065, .6, .8, bright=4)
mus += pad(['A2', 'E3', 'C4'], T['co2'], T['end'] + .6, .06, .6, .8)
mus += pad(['D3', 'A3', 'D4', 'F4', 'A4'], T['end'], TOTAL, .07, .8, 1.2)
for at in np.arange(.1, T['van'], .3): place(sfx, tone(3400, 4500, .08, .04, .07), at + rng.uniform(0, .15), 1., rng.uniform(.2, .8))
place(sfx, whoosh(1.2, .25), T['van'] - .1); place(sfx, tone(2200, 3200, .6, .3, .06), T['van'])
sfx += noise_band(200, 1000, T['van'] + .4, T['oxy'] + .3, .03, .6, .5, lfo=.8)
for at in np.arange(T['oxy'] + .3, T['food'], .9): place(sfx, tone(2600, 2700, .3, .2, .03), at, 1., .5)
for k in range(5): place(sfx, burst(.05, 2000, 7000, .02, .12), T['food'] + .2 + k * .2, 1., .3 + .1 * k)
sfx += noise_band(300, 2500, T['market'], T['herb'] + .2, .03, .3, .3, lfo=1.)
place(sfx, tone(140, 110, 1.0, .5, .2), T['herb'] + .6, 1., .4)
hw = np.arange(int(2.0 * SR)) / SR; howl = np.sin(2 * np.pi * np.cumsum(420 + 160 * np.sin(np.pi * hw / 2.0) + 6 * np.sin(2 * np.pi * 5 * hw)) / SR) * np.sin(np.pi * hw / 2.0) ** 1.5 * .1
place(sfx, howl, T['wolf'], 1., .7)
sfx += noise_band(200, 1400, T['ero'], T['rain'] + .2, .05, .6, .4, lfo=1.2)
sfx += noise_band(100, 2500, T['dust'] - .3, T['mud'] + .3, .1, .5, .5, lfo=1.)
sfx += noise_band(40, 700, T['mud'] - .2, T['rain'] + .3, .12, .5, .5, lfo=.8)
sfx += noise_band(400, 7000, T['rain'], T['co2'], .06, .4, .4)
sfx += noise_band(300, 1200, T['co2'], T['space'] + .2, .03, .5, .4, lfo=1.)
for at in np.arange(T['space'] + .2, T['end'], .7): place(sfx, tone(2600, 2700, .4, .25, .03), at, 1., .5)
for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))):
    place(sfx, bell(f, 2.4, .12), T['end'] + .1 + at, 1., .35 + .15 * k)
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
