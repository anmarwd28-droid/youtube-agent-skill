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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 4)[1])
rr = np.random.default_rng(6)
def wind(lo, hi, start, end, amp, a=.6, r=.8, rate=.31):   # gusty band noise
    n = fft_filter(rng.standard_normal(N), lo, hi); n /= np.abs(n).max() + 1e-9
    g = .55 + .45 * np.sin(2 * np.pi * rate * t + 1.3) * np.sin(2 * np.pi * rate * .37 * t + .4)
    e = env(start, end, a, r) * amp * g; return np.stack([n * e, np.roll(n, 700) * e], 1)
# 0: the oceans drain away: a long falling rush of water, a low drone
mus += pad(['D2', 'A2', 'D3', 'F3'], 0, T['s1'] + .3, .07, .3, .8, bright=4)
sfx += noise_band(300, 5000, .3, 2.2, .1, .5, .9, lfo=.4)
place(sfx, tone(420, 70, 1.9, 1.4, .12), .35); place(sfx, bell(note('D5'), 2.4, .07), Wd(0, 3)[1])
# 1: the floor nobody has seen: an open chord; a bell on the ridge, a turn, a deep note for the trench
mus += pad(['D2', 'A2', 'F3', 'C4', 'E4'], T['s1'] - .2, T['s2'] + .3, .065, .8, .8, bright=4)
place(sfx, bell(note('A5'), 2.0, .08), Wd(1, 5)[1]); place(sfx, whoosh(1.1, .14), Wd(1, 9)[1] + .2)
place(sfx, tone(110, 48, 1.6, .9, .3), Wd(1, 11)[1]); place(sfx, burst(.05, 800, 3000, .02, .1), Wd(1, 13)[1] + .3)
# 2: the ships fall: a falling whistle, two heavy thuds, creaking steel
mus += pad(['Bb1', 'F2', 'D3', 'A3'], T['s2'] - .2, T['s3'] + .3, .065, .6, .8, bright=4)
h1 = T['s2'] - .15 + .95; h2 = T['s2'] - .15 + 1.25
place(sfx, tone(900, 180, .95, .9, .1), T['s2'] - .15); place(sfx, whoosh(.9, .16), T['s2'] - .1)
place(sfx, burst(.7, 30, 220, .22, .7), h1); place(sfx, tone(70, 34, .8, .3, .5), h1); place(sfx, burst(.5, 300, 2500, .12, .16), h1 + .02)
place(sfx, burst(.4, 40, 260, .14, .3), h2, 1., .7)
for k in range(3): place(sfx, tone(210 + 40 * k, 150 + 30 * k, .5, .3, .05), h1 + .5 + k * .45, 1., .4)
sfx += wind(150, 1200, h1, T['s3'], .035)
place(sfx, bell(note('F5'), 1.6, .07), Wd(2, 6)[1])
# 3: the salt: thin glassy bells over a dry wind; the layer rises (a slow rising tone)
mus += pad(['A2', 'E3', 'B3', 'E4'], T['s3'] - .2, T['s4'] + .3, .055, .8, .8)
sfx += wind(600, 5000, T['s3'], Wd(3, 5)[1], .03)
for k in range(6): place(sfx, bell(note(['E6', 'B5', 'E6', 'A6', 'B5', 'E6'][k]), .9, .03), T['s3'] + .5 + k * .32, 1., rr.random())
place(sfx, tone(140, 420, Wd(3, 11)[1] - Wd(3, 8)[1] + .2, 2.5, .07), Wd(3, 8)[1] - .2); place(sfx, bell(note('E5'), 2.2, .1), Wd(3, 11)[1])
# 4: rain on the street, thinning out to nothing
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s4'] - .2, T['s5'] + .3, .06, .8, .8)
sfx += noise_band(1500, 9000, T['s4'] - .3, Wd(4, 3)[1] + .6, .09, .3, 1.5); sfx += noise_band(200, 900, T['s4'] - .3, Wd(4, 3)[1] + .3, .04, .3, 1.2)
for k in range(5): place(sfx, burst(.03, 1500, 5000, .012, .07 * (1 - k / 6)), Wd(4, 3)[1] + .2 + k * .28, 1., rr.random())
place(sfx, bell(note('A5'), 1.8, .07), Wd(4, 4)[1])
# 5: the river dries (cracking mud), trees die, sand: a dry wind grows
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8, bright=4)
sfx += noise_band(400, 3000, T['s5'] - .2, Wd(5, 0)[1] + .7, .05, .2, .8, lfo=.5)
for k in range(9): place(sfx, burst(.035, 900, 5000, .012, .11), Wd(5, 0)[1] + .5 + k * .16 + rr.random() * .05, 1., rr.random())
for k in range(3): place(sfx, burst(.12, 200, 1200, .05, .12), Wd(5, 2)[1] + k * .3, 1., .3 + .2 * k)
sfx += wind(250, 2500, Wd(5, 4)[1] - .2, T['s6'] + .2, .07)
# 6: scorching day (a thin high shimmer), freezing night (a cold bell, icy air)
mus += pad(['G2', 'D3', 'Bb3', 'F4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
sfx += noise_band(5000, 11000, T['s6'], Wd(6, 2)[1], .02, .3, .5, lfo=.9); place(sfx, tone(1900, 2100, 1.0, .8, .02), T['s6'] + .1)
place(sfx, whoosh(.8, .12), Wd(6, 2)[1] - .35); place(sfx, bell(note('D6'), 2.6, .09), Wd(6, 3)[1] - .1); place(sfx, bell(note('A6'), 2.0, .04), Wd(6, 3)[1] + .25)
sfx += wind(700, 4000, Wd(6, 2)[1], T['s7'], .03)
# 7: the dust storm: a roaring wall of wind, then sand hissing over the ruins
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8, bright=4)
sfx += wind(80, 900, T['s7'] - .2, Wd(7, 5)[1] + .4, .2, 1.2, 1.4, rate=.47); sfx += wind(900, 6000, T['s7'], T['s8'] + .2, .07, 1.0, .8, rate=.6)
place(sfx, tone(60, 42, 2.4, 1.6, .22), Wd(7, 1)[1]); place(sfx, bell(note('C4'), 3.0, .1), Wd(7, 5)[1])
for k in range(3): place(sfx, tone(190 + 30 * k, 120, .7, .4, .04), Wd(7, 5)[1] + .5 + k * .55, 1., .6)
# 8: plankton: soft bubbles while they live, then silence and a falling note
mus += pad(['A2', 'E3', 'G3', 'C4'], T['s8'] - .2, T['s9'] + .3, .055, .8, .8)
for k in range(9): f0 = 500 + rr.random() * 700; place(sfx, tone(f0, f0 * 1.7, .09, .05, .07 * (1 - k / 10)), T['s8'] - .1 + k * .17, 1., rr.random())
place(sfx, tone(520, 180, 1.4, 1.0, .07), Wd(8, 5)[1]); place(sfx, burst(.25, 60, 300, .1, .25), Wd(8, 6)[1])
# 9: the surprise: a hit; the turn to Mars; water (a clear bell), then a dead wind
place(sfx, whoosh(.8, .25), T['s9'] - .35); place(sfx, bell(note('C#5'), 2.4, .1), Wd(9, 0)[1]); place(sfx, burst(.3, 40, 300, .12, .4), Wd(9, 0)[1])
mus += pad(['F#2', 'C#3', 'A3', 'E4'], T['s9'] - .2, Wd(9, 6)[1] + .3, .065, .8, .8)
place(sfx, whoosh(1.3, .16), Wd(9, 3)[1] - .2)
mus += pad(['A2', 'E3', 'C#4', 'G#4'.replace('G#', 'Ab')], Wd(9, 6)[1] - .2, Wd(9, 13)[1] + .3, .06, .6, .8)
place(sfx, bell(note('E6'), 2.2, .08), Wd(9, 7)[1]); sfx += noise_band(800, 5000, Wd(9, 7)[1], Wd(9, 13)[1], .03, .6, .8, lfo=.6)
mus += pad(['F#2', 'C#3', 'F#3', 'A3'], Wd(9, 13)[1] - .2, T['s10'] + .3, .065, .5, .8, bright=4)
sfx += wind(200, 1800, Wd(9, 13)[1], T['s10'] + .2, .06)
# 10: the end: the water comes back
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['s10'] - .1, TOTAL, .07, .8, 1.2)
sfx += noise_band(400, 5000, T['s10'], T['s10'] + 1.6, .06, .6, .9)
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
