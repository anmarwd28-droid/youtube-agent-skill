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
T = dict(vanish=Wd(0, 4)[1] + .25, empty=S0(1), off=Wd(2, 2)[1] - .1, plant=Wd(2, 6)[1], subway=S0(3), air=S0(4), animals=S0(5), pripyat=Wd(5, 4)[1] - .3,
         crack=S0(6), green=Wd(6, 6)[1] - .3, bridge=S0(7), fall=Wd(7, 5)[1], forest=S0(8), tower=Wd(8, 3)[1], plastic=S0(9), radio=S0(10), end=S0(11))
# ---------------- music
mus += pad(['A2', 'E3', 'C4'], T['vanish'], T['subway'] + .6, .05, 1.2, .8)
mus += pad(['F2', 'C3', 'A3'], T['subway'], T['animals'] + .6, .055, .6, .8, bright=4)
mus += pad(['C3', 'G3', 'E4'], T['animals'], T['bridge'] + .6, .06, .6, .8)
mus += pad(['D3', 'A3', 'F4'], T['bridge'], T['plastic'] + .6, .06, .6, .8, bright=4)
mus += pad(['F2', 'C3', 'A3', 'E4'], T['plastic'], T['end'] + .6, .06, .6, .8)
mus += pad(['A2', 'E3', 'A3', 'C4', 'E4'], T['end'], TOTAL, .07, .8, 1.2)
# ---------------- effects
sfx += noise_band(80, 2500, 0, T['vanish'], .08, .05, .08, lfo=.6)                     # city traffic and crowd
for at in (.3, 1.0): place(sfx, tone(440, 440, .25, .2, .12), at, 1., .7)              # a horn
place(sfx, whoosh(1.0, .25), T['vanish'] - .1); place(sfx, tone(1800, 2600, .4, .25, .08), T['vanish'])
place(sfx, burst(.05, 1500, 6000, .015, .35), T['vanish'] + .45, 1., .4)               # phone on the pavement
sfx += noise_band(200, 1200, T['vanish'] + .2, T['off'], .025, .8, .4, lfo=.8)         # empty-street wind
for at in np.arange(T['empty'] + .3, T['off'] - .3, .9): place(sfx, tone(520, 470, .35, .2, .07), at + rng.uniform(0, .3), 1., rng.uniform(.3, .7))   # pigeons cooing
for at in np.arange(T['empty'], T['off'] - .5, 1.05): place(sfx, tone(1100, 1100, .05, .02, .06), at, 1., .8)   # signal ticking
sfx += noise_band(50, 120, T['off'] - 1.5, T['off'] + .2, .05, .4, .2)                 # mains hum, then the power dies
place(sfx, tone(220, 40, 1.6, .9, .35), T['off'])
place(sfx, tone(150, 30, 1.4, .8, .25), T['plant'])
for at in np.arange(T['off'] + 1.2, T['subway'], .14): place(sfx, tone(4200, 4300, .04, .01, .04 * (.5 + .5 * np.sin(at * 9))), at, 1., .5)   # crickets
for at in np.arange(T['subway'] + .3, T['air'], .55): place(sfx, tone(1400, 900, .06, .02, .14), at + rng.uniform(0, .3), 1., rng.uniform(.3, .7))   # dripping
sfx += noise_band(100, 1600, T['subway'] + .6, T['air'] + .2, .05, 1.2, .5, lfo=.8)     # rising water
for k in range(6): place(sfx, tone(880, 880, .15, .08, .12), T['subway'] + 1.2 + k * .5, 1., .8)   # pump alarm
for at in np.arange(T['air'] + .2, T['animals'], .4): place(sfx, tone(3200, 4400, .08, .04, .06), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))   # birdsong
sfx += noise_band(200, 1000, T['animals'], T['crack'], .02, .5, .5, lfo=.6)
for at in np.arange(T['animals'] + .2, T['pripyat'], .5): place(sfx, tone(3000, 4000, .07, .03, .06), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
hw = np.arange(int(2.2 * SR)) / SR; howl = np.sin(2 * np.pi * np.cumsum(420 + 160 * np.sin(np.pi * hw / 2.2) + 6 * np.sin(2 * np.pi * 5 * hw)) / SR) * np.sin(np.pi * hw / 2.2) ** 1.5 * .12
place(sfx, howl, T['pripyat'] + .6, 1., .7)                                            # a distant wolf
for at in np.arange(T['crack'] + 1.2, T['green'], .25): place(sfx, burst(.03, 800, 4000, .01, .1), at + rng.uniform(0, .1), 1., rng.uniform(.3, .7))   # asphalt cracking
for at in np.arange(T['green'], T['bridge'], .35): place(sfx, tone(3600, 4600, .08, .04, .06), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
for k in range(3): place(sfx, tone(140 + 30 * k, 90 + 20 * k, .9, .5, .12), T['bridge'] + .4 + k * .9, 1., .3 + .2 * k)   # groaning steel
place(sfx, burst(1.4, 60, 2500, .5, .55), T['fall'] + .4); place(sfx, burst(1.2, 300, 5000, .4, .3), T['fall'] + .9)   # span falls, splash
place(sfx, tone(60, 30, 2.4, 1.0, .5), T['tower']); place(sfx, burst(2.0, 50, 1500, .8, .45), T['tower'] + .2)          # tower collapses
for at in np.arange(T['tower'] + 1.6, T['plastic'], .45): place(sfx, tone(3000, 4200, .08, .04, .05), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
sfx += noise_band(150, 1500, T['plastic'], T['radio'] + .2, .05, .6, .5, lfo=1.2)       # waves on the bank
sfx += noise_band(1500, 7000, T['radio'], T['end'], .02, .4, .4, lfo=1.5)               # radio static
for k, at in enumerate(np.arange(T['radio'] + .4, T['end'] - .3, .22)): place(sfx, tone(1000, 1000, .06 if k % 3 else .16, .03, .05), at, 1., .5)   # morse-like beeps
for k, (f, at) in enumerate(((note('A5'), 0), (note('E6'), .35), (note('A6'), .7))):
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
