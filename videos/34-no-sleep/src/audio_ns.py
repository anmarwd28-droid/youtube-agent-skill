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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), cta=Wd(8, 7)[1])
tick = lambda amp=.12: burst(.025, 2500, 7000, .006, amp)
# 0: the Earth spins, ten fast ticks for ten days, low drone
mus += pad(['D2', 'A2', 'F3', 'A3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
for k in range(10): place(sfx, tick(.18), .3 + k * .25, 1., .3 + .04 * k); place(sfx, tone(880 + k * 40, 880 + k * 40, .06, .03, .05), .3 + k * .25)
place(sfx, whoosh(1.2, .25), .1); place(sfx, bell(note('D5'), 2., .09), 2.7)
# 1: night room: slow clock, memory drains (falling tones)
for k in range(int(T['s2'] - T['s1'])): place(sfx, tick(.09), T['s1'] + .2 + k, 1., .35)
mus += pad(['D2', 'A2', 'C3', 'F3'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
d0 = Wd(1, 3)[1]
for k in range(8): place(sfx, tone(900 - k * 60, 820 - k * 60, .18, .1, .05), d0 + k * .5, 1., .6)
place(sfx, bell(note('A4'), 2., .08), Wd(1, 10)[1])
# 2: the brain washes itself: soft flowing water, then a low dread when the waste piles up
sfx += noise_band(150, 900, T['s2'], Wd(2, 8)[1] + .2, .07, .6, .5, lfo=.8)
for k in range(12): place(sfx, tone(500 + 40 * (k % 4), 700 + 40 * (k % 4), .12, .07, .025), T['s2'] + .4 + k * .3, 1., .3 + .04 * k)
mus += pad(['F2', 'C3', 'A3'], T['s2'] - .2, Wd(2, 8)[1], .06, .8, .5)
mus += pad(['C#2', 'Ab2', 'D3'], Wd(2, 8)[1] - .1, T['s3'] + .3, .07, .4, .8, bright=4)
place(sfx, tone(80, 50, 1.6, .9, .4), Wd(2, 10)[1])
# 3: morning, pouring water; the microsleep: everything drops to a heartbeat; jolt and spill
m0, m1 = Wd(3, 8)[1] - .15, Wd(3, 10)[1] - .25
for k in range(6): place(sfx, tone(2600 + 300 * (k % 3), 3400 + 200 * (k % 2), .09, .05, .03), T['s3'] + .3 + k * .45, 1., .8)
sfx += noise_band(800, 4000, T['s3'] + .3, m0, .05, .3, .1)
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s3'] - .2, m0, .06, .8, .3)
for k in range(2): place(sfx, tone(60, 42, .2, .08, .55), m0 + .25 + k * .7); place(sfx, tone(55, 40, .18, .07, .4), m0 + .45 + k * .7)
place(sfx, whoosh(.5, .35), m1 - .3); place(sfx, burst(.6, 300, 3000, .25, .35), m1 - .1)
for k in range(5): place(sfx, tone(1300 - k * 80, 900 - k * 60, .08, .04, .06), m1 + .3 + k * .32, 1., .4)
mus += pad(['D2', 'A2', 'F3'], m1 - .3, T['s4'] + .3, .06, .4, .8)
# 4: the street, a sneeze, the chart grows
sfx += noise_band(80, 1200, T['s4'], T['s5'] + .2, .07, .4, .5, lfo=.5)
place(sfx, burst(.12, 1500, 6000, .05, .3), Wd(4, 9)[1] - .25); place(sfx, burst(.45, 600, 5000, .14, .6), Wd(4, 9)[1] - .1)
c0, c1 = Wd(4, 10)[1] - .2, Wd(4, 12)[1] + .2
for k in range(14): place(sfx, tone(400 + k * 35, 400 + k * 35, .05, .025, .06), c0 + (c1 - c0) * k / 14)
place(sfx, bell(note('E5'), 2., .09), c1)
mus += pad(['A2', 'E3', 'C4'], T['s4'] - .2, T['s5'] + .3, .06, .8, .8)
# 5: hallucinations: detuned eerie pad, warbling tones, whispery air, flicker clicks
for f in (220, 233): 
    tt = np.arange(int((T['s6'] - T['s5'] + .3) * SR)) / SR
    place(sfx, np.sin(2 * np.pi * f * tt + 3 * np.sin(2 * np.pi * .7 * tt)) * np.clip(tt / 1.2, 0, 1) * np.clip((tt[-1] - tt) / .6, 0, 1) * .05, T['s5'] - .1, 1., .3 if f == 220 else .7)
sfx += noise_band(2000, 7000, Wd(5, 3)[1], T['s6'], .05, .8, .4, lfo=1.)
place(sfx, tone(140, 90, 1.4, .6, .3), Wd(5, 6)[1] - .2)
for k in range(6): place(sfx, burst(.02, 3000, 9000, .005, .2), Wd(5, 9)[1] + .1 + k * .1)
mus += pad(['Bb1', 'F2', 'C#3'], T['s5'] - .2, T['s6'] + .3, .07, .6, .8, bright=4)
# 6: counting down: a blip for each number, then a falling "lost" tone
for k, (i, j) in enumerate(((6, 6), (6, 7), (6, 7), (6, 8), (6, 9), (6, 10))):
    at = Wd(i, j)[1] + (.45 if k == 2 else .05 if k == 1 else 0); place(sfx, bell(note(['A5', 'G5', 'F5', 'E5', 'D5', 'C#5'][k]), 1.2, .08), at, 1., .3 + .08 * k)
place(sfx, tone(600, 200, 1.2, .6, .12), Wd(6, 11)[1])
for k in range(int(T['s7'] - T['s6'])): place(sfx, tick(.08), T['s6'] + .3 + k * 1.1, 1., .4)
mus += pad(['D2', 'A2', 'F3', 'Bb3'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
# 7: time-lapse of 11 days (fast ticks), then sleep (soft pad), then a morning chime
sl, up = Wd(7, 11)[1] - .25, Wd(7, 17)[1] - .2
for k in range(44): place(sfx, tick(.08), T['s7'] + .4 + k * (sl - T['s7'] - .5) / 44, 1., .3 + .4 * (k % 2))
mus += pad(['G2', 'D3', 'Bb3'], T['s7'] - .2, sl, .06, .8, .5)
mus += pad(['F2', 'C3', 'A3', 'E4'], sl - .1, up, .05, .6, .6, bright=3)
for k, f in enumerate(('D5', 'F#5', 'A5', 'D6')): place(sfx, bell(note(f), 2.4, .09), up + .1 + k * .18, 1., .3 + .15 * k)
mus += pad(['D3', 'A3', 'D4', 'F#4'], up - .2, T['s8'] + .3, .07, .6, .8)
# 8: the end
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
