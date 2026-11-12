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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), cta=Wd(9, 7)[1])
tick = lambda amp=.12: burst(.025, 2500, 7000, .006, amp)
beat = lambda at, a=.5: (place(sfx, tone(60, 42, .2, .08, a), at), place(sfx, tone(55, 40, .18, .07, a * .7), at + .2))
# 0: the Earth; the eyelids close over the view: a deep thud, a muffled heartbeat
mus += pad(['D2', 'A2', 'F3', 'A3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(1.2, .25), .1); place(sfx, bell(note('D5'), 2., .08), .3)
lc = Wd(0, 5)[1]; place(sfx, whoosh(1.4, .3), lc - .2); place(sfx, tone(70, 38, 1.6, .7, .55), Wd(0, 8)[1])
for k in range(3): beat(Wd(0, 8)[1] + .5 + k * .8, .45)
# 1: planes over the globe: a jet hum, radar blips; then the cockpit alarm
sfx += noise_band(90, 700, T['s1'] - .2, T['s3'] - .1, .08, .6, .5, lfo=.4)
for k in range(8): place(sfx, tone(1400, 1400, .07, .03, .05), T['s1'] + .3 + k * .55, 1., .3 + .05 * k)
mus += pad(['D2', 'A2', 'C3', 'F3'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
a0 = Wd(1, 9)[1]
for k in range(6): place(sfx, tone(960 if k % 2 == 0 else 760, 960 if k % 2 == 0 else 760, .16, .12, .07), a0 + k * .3, 1., .6)
# 2: autopilot chime; a question tone for the runway; the tower: radar pings
place(sfx, bell(note('A5'), 1.6, .08), Wd(2, 0)[1] + .1); place(sfx, bell(note('E5'), 1.6, .06), Wd(2, 1)[1] + .1)
mus += pad(['F2', 'C3', 'A3'], T['s2'] - .2, Wd(2, 7)[1], .06, .8, .5)
place(sfx, tone(400, 620, .6, .4, .1), Wd(2, 9)[1] - .2)
mus += pad(['C#2', 'Ab2', 'D3'], Wd(2, 7)[1] - .1, T['s3'] + .3, .07, .4, .8, bright=4)
for k in range(4): place(sfx, tone(1800, 1800, .1, .08, .05), Wd(2, 10)[1] + k * .45, 1., .7)
# 3: traffic, horns, then the crash (impact, glass) and hazard ticks
sfx += noise_band(60, 900, T['s3'] - .2, T['s4'], .08, .4, .6, lfo=.5)
place(sfx, tone(415, 415, .5, .4, .07) + tone(523, 523, .5, .4, .05), Wd(3, 4)[1], 1., .7)
tcr = Wd(3, 8)[1] - .05
place(sfx, burst(.9, 60, 1200, .25, .9), tcr); place(sfx, burst(.5, 1000, 6000, .15, .45), tcr + .02)
for k in range(14): place(sfx, tone(3000 + 400 * (k % 5), 2800 + 300 * (k % 4), .12, .06, .05), tcr + .1 + k * .07, 1., .3 + .03 * k)
place(sfx, tone(415, 415, 1.2, 1., .06) + tone(523, 523, 1.2, 1., .05), tcr + .3, 1., .4)
for k in range(5): place(sfx, tick(.1), tcr + .7 + k * .33, 1., .3)
mus += pad(['A2', 'E3', 'C4'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
# 4: the lights go out: a power-down drop at each step, a low hum that fades
sfx += noise_band(50, 160, T['s4'], T['s5'], .07, .4, 1., lfo=.2)
t0, t1 = Wd(4, 4)[1] - .1, Wd(4, 9)[1]
for k in range(6): place(sfx, tone(220, 70, .7, .3, .14), t0 + (t1 - t0) * k / 6, 1., .3 + .08 * k); place(sfx, burst(.06, 2000, 7000, .02, .12), t0 + (t1 - t0) * k / 6)
mus += pad(['D2', 'A2', 'F3'], T['s4'] - .2, T['s5'] + .3, .07, .8, .8, bright=4)
# 5: the brain: a third lights up (bell), the eye closes (falling tone), idle (low drone)
place(sfx, bell(note('E5'), 2., .09), Wd(5, 4)[1]); place(sfx, bell(note('B5'), 2., .06), Wd(5, 6)[1])
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s5'] - .2, Wd(5, 7)[1], .06, .8, .4)
place(sfx, tone(700, 160, 1.2, .5, .12), Wd(5, 7)[1])
mus += pad(['C#2', 'Ab2', 'D3'], Wd(5, 7)[1] - .1, T['s6'] + .3, .07, .5, .8, bright=4)
# 6: rewiring: a rising shimmer, bells for touch and sound
sfx += noise_band(3000, 8000, Wd(6, 7)[1], T['s7'], .03, 1., .5, lfo=.8)
for k, f in enumerate(('A4', 'C#5', 'E5', 'A5')): place(sfx, bell(note(f), 2., .07), Wd(6, 7)[1] + k * .3, 1., .3 + .1 * k)
place(sfx, bell(note('E6'), 2., .05), Wd(6, 10)[1])
mus += pad(['A2', 'E3', 'A3', 'C#4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
# 7: the twist: a warm, hopeful pad; cane taps in step
place(sfx, whoosh(.8, .25), T['s7'] - .3); place(sfx, bell(note('D5'), 2.4, .1), Wd(7, 0)[1])
for k in range(int((T['s8'] - T['s7']) / .72)): place(sfx, burst(.03, 1500, 5000, .01, .16), T['s7'] + .3 + k * .72, 1., .6)
mus += pad(['D3', 'A3', 'D4', 'F#4'], T['s7'] - .2, T['s8'] + .3, .07, .6, .8)
for k, f in enumerate(('D5', 'F#5', 'A5')): place(sfx, bell(note(f), 2.4, .08), Wd(7, 8)[1] + k * .2, 1., .3 + .15 * k)
# 8: braille taps, then tongue clicks and their echoes off the wall
for k in range(6): place(sfx, burst(.02, 1200, 4000, .008, .08), T['s8'] + .2 + k * .35, 1., .4)
c0 = Wd(8, 6)[1] - .1
for k in range(4): place(sfx, burst(.03, 2000, 8000, .006, .35), c0 + k * .55, 1., .35); place(sfx, burst(.03, 2000, 6000, .008, .12), c0 + k * .55 + .6, 1., .7)
place(sfx, bell(note('A5'), 2., .08), Wd(8, 9)[1])
mus += pad(['G2', 'D3', 'Bb3', 'D4'], T['s8'] - .2, T['s9'] + .3, .06, .8, .8)
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
