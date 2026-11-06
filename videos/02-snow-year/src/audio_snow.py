"""Synthesize the music bed and sound effects for the Short (no samples, no copyright).
usage: python3 -I audio.py <pylib> <timing.json> <total_seconds> <out.wav>"""
import sys, json, wave
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]
SR = 44100; N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)
L = lambda i: TM[i]; Wd = lambda i, j: TM[i]["words"][j]
T = dict(day1=L(5)["start"], week=L(9)["start"], fire=L(12)["start"], roof=L(13)["start"], month=L(16)["start"], globe=L(21)["start"], layers=L(27)["start"], year=L(30)["start"], ball=L(33)["start"], volc=L(36)["start"], cant=L(37)["start"], baker=L(39)["start"], end=L(42)["start"])
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


# ---------------- music: slow, cold, wintry pads that darken over the year, warm at the end
mus += pad(['D3', 'A3', 'F4', 'A4'], 0, T['day1'] + .8, .06, 1.5, .8)
mus += pad(['F3', 'C4', 'A4', 'C5'], T['day1'], T['week'] + .8, .06, .8, .8)                 # day one: light, pretty
mus += pad(['D3', 'A3', 'F4'], T['week'], T['roof'] + .8, .06, .8, .8)
mus += pad(['Bb2', 'F3', 'D4'], T['roof'], T['month'] + .8, .06, .6, .8)
mus += pad(['G2', 'D3', 'Bb3'], T['month'], T['globe'] + .8, .06, .8, .8)
mus += pad(['D2', 'A2', 'F3'], T['globe'], T['layers'] + .8, .05, .8, .8, bright=4)
mus += pad(['A2', 'E3', 'C#4'], T['layers'], T['year'] + .8, .06, .6, .8)
mus += pad(['D2', 'A2'], T['year'], T['ball'] + .8, .06, 1.2, .8, bright=3)                     # buried city: bare drone
mus += pad(['Bb2', 'F3', 'D4', 'F4'], T['ball'], T['cant'] + .8, .06, .8, .8)
mus += pad(['F3', 'A3', 'C4', 'F4'], T['cant'], T['baker'] + .8, .06, .6, .8)
mus += pad(['C3', 'G3', 'E4', 'G4'], T['baker'], T['end'] + .8, .06, .6, .8)
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['end'], TOTAL, .07, .8, 1.2)
# ---------------- effects
sfx += noise_band(400, 2500, 0, T['week'] + .5, .012, 1.5, .8, lfo=.4)                          # soft snowfall hush
sfx += noise_band(300, 1400, T['week'], T['month'] + .5, .02, .8, .8, lfo=.6)                   # wind
for at in np.sort(rng.uniform(T['fire'], T['roof'] - .3, 40)):
    place(sfx, burst(.02, 2000, 9000, .004, rng.uniform(.02, .05)), at, 1., .5 + rng.uniform(-.1, .1))
for at in (T['roof'] + 2.5, T['roof'] + 5.5, T['roof'] + 8.5):                                 # roof creaks
    place(sfx, tone(140, 95, .7, .25, .25), at); place(sfx, burst(.05, 600, 3000, .02, .2), at + .02)
sfx += noise_band(250, 1800, T['month'], T['globe'] + .3, .028, .8, .8, lfo=.7)
sfx += noise_band(30, 200, T['globe'] - .3, T['layers'] + .3, .05, 1., 1.)                      # space hum
for at in (T['layers'] + 2, T['layers'] + 4.5, T['layers'] + 7):                                # ice compressing
    place(sfx, burst(.06, 1500, 9000, .015, .35), at, 1., rng.uniform(.3, .7)); place(sfx, tone(80, 55, .5, .15, .3), at)
sfx += noise_band(250, 2200, T['year'] - .1, T['ball'] + .2, .035, .5, .6, lfo=.9)              # blizzard
sfx += noise_band(25, 160, T['volc'] - .2, T['cant'] + .2, .07, .8, .6)                         # volcano rumble
sfx += noise_band(1800, 6000, T['cant'], T['baker'] + .2, .006, .5, .5)                         # light air on the sunny day
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
