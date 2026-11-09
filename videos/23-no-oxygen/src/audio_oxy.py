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
T = dict(gone=Wd(0, 3)[1], pres=S0(1), pop=Wd(1, 10)[1], fire=S0(2), out=Wd(2, 4)[1], eng=S0(3), stall=Wd(3, 2)[1], jet=Wd(3, 12)[1], relight=Wd(3, 16)[1], you=S0(4), bound=S0(5), ret=S0(6), reig=Wd(6, 7)[1], air=S0(7), cta=S0(8))
# 0: city ambience, then a sucking whoosh as the oxygen vanishes
sfx += noise_band(150, 2500, 0, T['pres'] + .2, .06, .3, .4, lfo=.4)
place(sfx, whoosh(1.4, .3)[::-1].copy(), T['gone'] - .6)
mus += pad(['A2', 'E3', 'C4'], T['gone'], T['fire'] + .3, .05, 1.0, .8, bright=4)
# 1: a pressure drop – low sweep down, two ear pops
place(sfx, tone(140, 50, 1.6, .9, .45), T['pres'] + 1.8)
for k in range(2): place(sfx, burst(.05, 300, 2500, .015, .5), T['pop'] + k * .25, 1., .3 + .4 * k)
# 2: fire crackling, then snuffed
sfx += noise_band(800, 6000, T['fire'] - .2, T['out'] + .3, .14, .2, .3, lfo=1.)
for at in np.arange(T['fire'], T['out'], .09): place(sfx, burst(.03, 1500, 8000, .01, .25), at + rng.uniform(0, .05), 1., rng.uniform(.2, .8))
place(sfx, whoosh(.8, .3), T['out'] - .3)
mus += pad(['D2', 'A2', 'F3'], T['out'], T['eng'] + .3, .05, .6, .8, bright=4)
# 3: engines – a hum that winds down; a jet roar that cuts and comes back
sfx += noise_band(60, 400, T['eng'] - .2, T['stall'] + .6, .18, .3, .8)
place(sfx, tone(110, 35, 1.4, .7, .4), T['stall'] - .1)
sfx += noise_band(300, 3000, T['jet'] - 2.5, T['jet'] + .2, .08, .6, .3)
sfx += noise_band(300, 3000, T['relight'] + .2, T['you'] + .3, .08, .6, .6)
mus += pad(['C2', 'G2', 'Eb3'], T['eng'], T['you'] + .3, .05, .8, .8, bright=4)
# 4: a heartbeat
for k in range(int((T['bound'] - T['you']) / .85)): place(sfx, tone(60, 45, .18, .07, .5), T['you'] + .3 + k * .85); place(sfx, tone(55, 42, .15, .06, .35), T['you'] + .5 + k * .85)
mus += pad(['F2', 'C3', 'A3'], T['you'] - .1, T['bound'] + .3, .045, .8, .8)
# 5: the surprise – light bells
mus += pad(['G2', 'D3', 'B3', 'F#4'], T['bound'] - .1, T['ret'] + .3, .06, .8, .8)
for k, f in enumerate(('B4', 'D5', 'G5')): place(sfx, bell(note(f), 2.0, .08), T['bound'] + .2 + k * .3, 1., .3 + .2 * k)
# 6: oxygen rushes back, embers flare
place(sfx, whoosh(1.4, .35), T['ret'] + .2)
sfx += noise_band(800, 6000, T['reig'] - .2, T['air'] + .2, .14, .5, .4, lfo=1.)
place(sfx, burst(1.2, 40, 600, .5, .6), T['reig'])
# 7-8: calm Earth, CTA
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['air'], TOTAL, .07, .8, 1.2)
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
