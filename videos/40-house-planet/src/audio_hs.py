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
# 0: wonder: a soft space pad, a whoosh as the camera pulls back to show the whole tiny planet
mus += pad(['D2', 'A2', 'E3', 'F#3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(2.0, .22), .3); place(sfx, bell(note('A5'), 2.4, .09), Wd(0, 6)[1])
sfx += noise_band(60, 220, 0, T['s1'], .02, .5, .5, lfo=.4)
# 1: the house and the measurements: two pings, a ticking ring traced around the planet
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
place(sfx, bell(note('E6'), 1.6, .08), Wd(1, 3)[1]); place(sfx, bell(note('B5'), 1.6, .07), Wd(1, 3)[1] + .25)
for k in range(12): place(sfx, tick(.06), Wd(1, 6)[1] + k * (Wd(1, 9)[1] + .3 - Wd(1, 6)[1]) / 12, 1., .2 + .6 * k / 12)
# 2: weight: a falling digital count, then a tiny "blip" at 0.1 g
mus += pad(['E2', 'B2', 'G3', 'D4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
place(sfx, tone(900, 200, Wd(2, 10)[1] - Wd(2, 8)[1], .9, .06), Wd(2, 8)[1])
for k in range(10): place(sfx, tick(.05), Wd(2, 8)[1] + k * (Wd(2, 10)[1] - Wd(2, 8)[1]) / 10)
place(sfx, tone(1800, 1800, .12, .05, .08), Wd(2, 10)[1]); place(sfx, tone(2400, 2400, .12, .05, .07), Wd(2, 10)[1] + .14)
# 3: the air leaves: a long airy hiss rising away; then a helmet seal "click-hiss"
sfx += noise_band(800, 6000, Wd(3, 4)[1] - .2, T['s4'] - .4, .07, .3, 1.2)
place(sfx, whoosh(1.8, .22), Wd(3, 5)[1])
mus += pad(['C#2', 'Ab2', 'E3', 'B3'], T['s3'] - .2, T['s4'] + .3, .06, .6, .8, bright=4)
place(sfx, tick(.3), Wd(3, 9)[1] - .1); place(sfx, burst(.5, 2000, 8000, .15, .12), Wd(3, 9)[1] - .05)
# 4: one step and you drift away for ever: a soft footstep, a slow rising tone, then a lonely ping
place(sfx, burst(.15, 80, 800, .05, .25), Wd(4, 1)[1] + .2)
place(sfx, tone(220, 660, 3.5, 2.0, .06), Wd(4, 1)[1] + .3); place(sfx, whoosh(2.4, .15), Wd(4, 2)[1])
mus += pad(['A1', 'E2', 'C3', 'G3'], T['s4'] - .2, Wd(4, 9)[1], .07, .5, .5, bright=4)
place(sfx, bell(note('E5'), 3., .08), Wd(4, 6)[1])
mus += pad(['F2', 'C3', 'A3', 'E4'], Wd(4, 9)[1] - .2, T['s5'] + .3, .06, .5, .8)
for k in range(2): place(sfx, bell(note(('C6', 'G5')[k]), 1.4, .06), Wd(4, 12)[1] + k * .3)
# 5: ropes: rhythmic hand-over-hand grips (soft thuds) and a strap ratchet
mus += pad(['D2', 'A2', 'F#3', 'A3'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
for k in range(7): place(sfx, burst(.08, 150, 1500, .03, .14), T['s5'] + .3 + k * .5, 1., .4 + .2 * (k % 2))
for k in range(6): place(sfx, tick(.09), Wd(5, 6)[1] + k * .07)
# 6: horizon and night: a calm chord, then the light drops into a cold low chord
mus += pad(['G2', 'D3', 'A3', 'B3'], T['s6'] - .2, Wd(6, 9)[1], .06, .8, .6)
place(sfx, bell(note('D6'), 1.8, .07), Wd(6, 3)[1])
mus += pad(['E2', 'B2', 'G3', 'D4'], Wd(6, 9)[1] - .3, T['s7'] + .3, .06, .8, .8, bright=3)
place(sfx, tone(500, 180, 1.6, .7, .06), Wd(6, 10)[1])
# 7: the twist: a reveal, the ball's slow orbit as a rising and falling hum, a ticking clock, then a "bonk"
place(sfx, whoosh(.8, .25), T['s7'] - .3); place(sfx, bell(note('C#5'), 2.4, .1), Wd(7, 0)[1])
mus += pad(['F#2', 'C#3', 'A3', 'E4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
o0, o1 = Wd(7, 1)[1] + .1, Wd(7, 13)[1] + .3
orb = np.exp(-((t - (o0 + o1) / 2) / ((o1 - o0) * .45)) ** 2) * ((t > o0) & (t < o1))
sfx += np.stack([np.sin(2 * np.pi * 330 * t + 3 * np.sin(2 * np.pi * .4 * t)) * orb * .025] * 2, 1)
for k in range(int((o1 - o0) / .5)): place(sfx, tick(.05), o0 + k * .5)
place(sfx, burst(.25, 100, 1800, .08, .45), o1); place(sfx, tone(400, 150, .3, .1, .15), o1)
# 8: not even round: a rocky crunch as the sphere deforms
sfx += noise_band(60, 900, Wd(8, 1)[1], Wd(8, 2)[1] + .7, .08, .2, .4, lfo=3.)
place(sfx, tone(80, 45, 1.2, .5, .3), Wd(8, 2)[1])
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s8'] - .2, T['s9'] + .3, .06, .8, .8, bright=4)
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
