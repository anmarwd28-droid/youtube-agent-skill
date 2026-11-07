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
T = dict(stop=Wd(0, 2)[1] + .25, normal=S0(1), damf=Wd(1, 6)[1] - .25, soil=S0(2), crack=Wd(2, 3)[1], fields=S0(3), market=Wd(3, 12)[1] - .3,
         river=S0(4), dam=S0(5), power=Wd(5, 2)[1], well=S0(6), fire=S0(7), dust=Wd(7, 5)[1] - .3, back=S0(8), rain2=Wd(8, 1)[1], flood=Wd(8, 5)[1], soak=Wd(8, 7)[1] - .3, end=S0(9))
# ---------------- music (sombre minor pads)
mus += pad(['D3', 'A3', 'F4'], T['stop'], T['soil'] + .6, .05, 1.0, .8)
mus += pad(['Bb2', 'F3', 'D4'], T['soil'], T['river'] + .6, .06, .5, .8)
mus += pad(['G2', 'D3', 'Bb3'], T['river'], T['well'] + .6, .06, .5, .8, bright=4)
mus += pad(['A2', 'E3', 'C4'], T['well'], T['back'] + .6, .065, .5, .8, bright=4)
mus += pad(['F2', 'C3', 'A3'], T['back'], T['end'] + .6, .06, .5, .8)
mus += pad(['D3', 'A3', 'D4', 'F4', 'A4'], T['end'], TOTAL, .07, .8, 1.2)
# ---------------- effects
sfx += noise_band(400, 7000, 0, T['stop'] + .15, .16, .05, .12)                    # rain
sfx += noise_band(80, 600, 0, T['stop'] + .3, .05, .05, .3)
place(sfx, tone(50, 35, 2.2, .9, .35), .05)                                           # distant thunder
place(sfx, whoosh(1.4, .18), T['stop'] + .2)
for at in np.arange(T['stop'] + .8, T['damf'], .9): place(sfx, tone(3400, 4200, .07, .03, .06), at + rng.uniform(0, .3), 1., rng.uniform(.3, .7))   # birds
sfx += noise_band(200, 1800, T['normal'], T['damf'] + .3, .025, .5, .4, lfo=.6)        # river
sfx += noise_band(100, 4000, T['damf'], T['soil'] + .3, .07, .4, .4)                   # spillway roar
sfx += noise_band(300, 1200, T['soil'], T['fields'] + .3, .03, .6, .5, lfo=1.)         # dry wind
for at in np.arange(T['crack'], T['fields'], .22): place(sfx, burst(.03, 1500, 6000, .01, .1), at + rng.uniform(0, .1), 1., rng.uniform(.2, .8))   # soil cracking
sfx += noise_band(300, 2500, T['market'], T['river'] + .2, .035, .3, .3, lfo=1.)       # market murmur
sfx += noise_band(200, 1500, T['river'], T['dam'], .02, .5, .8, lfo=.5)
place(sfx, tone(220, 70, 2.2, 1.2, .25), T['power'])                                  # power winding down
for at in np.arange(T['well'] + .3, T['fire'], .25): place(sfx, tone(90, 70, .12, .05, .2), at, 1., .5)   # drilling
sfx += noise_band(80, 1500, T['fire'], T['dust'] + .3, .07, .6, .4, lfo=1.)           # fire roar
for at in np.arange(T['fire'] + .2, T['dust'], .07): place(sfx, burst(.02, 1200, 7000, .006, .12), at + rng.uniform(0, .05), 1., rng.uniform(.2, .8))   # crackle
sfx += noise_band(200, 1400, T['dust'], T['back'] + .3, .08, .5, .5, lfo=1.2)          # dust wind
place(sfx, tone(55, 32, 2.6, 1.0, .5), T['back']); place(sfx, burst(.5, 200, 3000, .2, .25), T['back'])   # thunder
sfx += noise_band(400, 7000, T['rain2'], T['end'] + .3, .15, .6, .6)                    # rain returns
sfx += noise_band(60, 900, T['flood'] - .3, T['soak'] + .4, .09, .6, .6, lfo=.8)       # flood rush
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
