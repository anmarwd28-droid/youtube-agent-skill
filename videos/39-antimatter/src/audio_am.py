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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 8)[1])
tick = lambda amp=.12: burst(.025, 2500, 7000, .006, amp)
zap = lambda at, a=.1: [place(sfx, burst(.04, 3000, 9000, .01, a), at + k * .07, 1., .3 + .1 * (k % 3)) for k in range(3)]
# 0: the handshake: a rising electric crackle in the gap
mus += pad(['D2', 'A2', 'F3', 'Bb3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(1.1, .2), .1)
sfx += noise_band(2000, 8000, .3, Wd(0, 7)[1] + .3, .03, 1.5, .1, lfo=7.)
for k in range(8): zap(.5 + k * .3, .04 + .01 * k)
place(sfx, tone(220, 880, 1.2, .2, .12), Wd(0, 5)[1]); place(sfx, bell(note('A5'), 2.4, .1), Wd(0, 7)[1] + .1)
# 1: atoms: soft orbit shimmer, a ping for each named particle
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
for k in range(10): place(sfx, bell(note(('C6', 'E6', 'G6', 'B5')[k % 4]), 1., .03), T['s1'] + .3 + k * .55, 1., .2 + .06 * k)
place(sfx, bell(note('E6'), 2., .09), Wd(1, 6)[1]); place(sfx, bell(note('C5'), 2., .09), Wd(1, 8)[1])
# 2: annihilation: two particles rushing in, a bright pop and two fast gamma sweeps
mus += pad(['D2', 'A2', 'D3'], T['s2'] - .2, T['s3'] + .3, .06, .6, .8, bright=4)
c = Wd(2, 4)[1] + .15
place(sfx, tone(300, 1400, c - T['s2'] + .2, .4, .08), T['s2'] - .2)
place(sfx, burst(.5, 1500, 9000, .2, .35), c); place(sfx, tone(90, 40, .9, .4, .4), c)
place(sfx, tone(3000, 9000, .5, .3, .07), c + .05, 1., .2); place(sfx, tone(3000, 9000, .5, .3, .07), c + .05, 1., .8)
place(sfx, bell(note('A5'), 2., .07), Wd(2, 8)[1])
# 3: air hits the skin: crackling, then a deep humming gamma glow
sfx += noise_band(2500, 9000, Wd(3, 2)[1] - .2, T['s4'], .04, .5, .4, lfo=11.)
for k in range(14): zap(Wd(3, 2)[1] + k * .25, .05)
mus += pad(['C#2', 'Ab2', 'D3', 'G3'], T['s3'] - .2, T['s4'] + .3, .07, .6, .8, bright=4)
sfx += noise_band(50, 300, Wd(3, 5)[1] - .2, T['s4'] + .2, .07, .6, .4, lfo=.3)
place(sfx, tone(110, 55, 1.4, .5, .3), Wd(3, 5)[1])
# 4: a gram in the trap: an electric hum; three distant booms
sfx += noise_band(100, 400, T['s4'] - .1, Wd(4, 6)[1], .03, .4, .3, lfo=.5)
for w in (7, 8, 9): place(sfx, tone(70, 30, 1.6, .9, .45), Wd(4, w)[1] - (.1 if w == 9 else 0)); place(sfx, burst(1.2, 80, 900, .6, .25), Wd(4, w)[1])
mus += pad(['A2', 'E3', 'C4'], T['s4'] - .2, T['s5'] + .3, .05, .8, .8)
# 5: the whole body: a huge deep boom, a long rumble, then a rising swell under the bars
place(sfx, burst(2.5, 40, 1200, 1.6, .55), Wd(5, 4)[1] - .05); place(sfx, tone(55, 25, 3., 1.8, .6), Wd(5, 4)[1] - .05)
mus += pad(['C#2', 'Ab2', 'C#3', 'E3'], T['s5'] - .2, T['s6'] + .3, .07, .5, .8, bright=4)
place(sfx, tone(200, 600, 2.4, .5, .07), Wd(5, 9)[1])
# 6: the Big Bang: silence-like hush, then a bright bloom
mus += pad(['D3', 'A3', 'E4'], T['s6'] - .2, Wd(6, 4)[1], .04, .8, .3)
place(sfx, whoosh(1.0, .25), Wd(6, 4)[1] - .6); place(sfx, burst(1.8, 300, 8000, 1.2, .3), Wd(6, 4)[1] - .1)
mus += pad(['D2', 'A2', 'F#3', 'A3', 'E4'], Wd(6, 4)[1] - .1, T['s7'] + .3, .07, .4, .8)
# 7: pairs annihilating: many tiny pops, then a warm chord for "we were made"
for k in range(28): place(sfx, burst(.05, 2000, 8000, .02, .05), Wd(7, 1)[1] + k * (Wd(7, 11)[1] - Wd(7, 1)[1]) / 28, 1., .2 + .6 * ((k * 7) % 10) / 10)
place(sfx, bell(note('F#6'), 2.4, .1), Wd(7, 7)[1])
mus += pad(['G2', 'D3', 'B3', 'D4'], T['s7'] - .2, Wd(7, 12)[1], .06, .8, .5)
mus += pad(['D2', 'A2', 'F#3', 'A3', 'D4'], Wd(7, 12)[1] - .1, T['s8'] + .3, .07, .5, .8)
# 8: CERN: a smooth accelerator whirr, then a bulb click on and its hum, and off
sfx += noise_band(400, 1600, T['s8'] - .1, Wd(8, 5)[1], .03, .4, .3, lfo=2.4)
place(sfx, tick(.25), Wd(8, 11)[1] - .3); sfx += noise_band(100, 140, Wd(8, 11)[1] - .3, Wd(8, 14)[1] + .5, .015, .1, .2)
place(sfx, tick(.2), Wd(8, 14)[1] + .3)
mus += pad(['A2', 'E3', 'C#4', 'E4'], T['s8'] - .2, T['s9'] + .3, .06, .8, .8)
# 9: the twist: a reveal; tiny violet pops inside the body
place(sfx, whoosh(.8, .25), T['s9'] - .3); place(sfx, bell(note('C#5'), 2.4, .1), Wd(9, 0)[1]); place(sfx, bell(note('E5'), 2.4, .08), Wd(9, 5)[1])
for k in range(12): place(sfx, burst(.04, 3000, 9000, .01, .05), Wd(9, 1)[1] + k * .6, 1., .3 + .1 * (k % 5))
mus += pad(['F#2', 'C#3', 'A3', 'E4'], T['s9'] - .2, T['s10'] + .3, .07, .8, .8)
# 10: the end
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['s10'] - .1, TOTAL, .07, .8, 1.2)
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
