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
# 0: the face; a blink and the eye opens in the middle: a whoosh, a soft swell, a bell
mus += pad(['D2', 'A2', 'F3', 'A3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(1.2, .22), .1); place(sfx, bell(note('D5'), 2., .07), .3)
place(sfx, whoosh(1.0, .3), Wd(0, 5)[1] - .2); place(sfx, tone(90, 50, 1.2, .5, .4), Wd(0, 8)[1] - .1); place(sfx, bell(note('A5'), 2.4, .1), Wd(0, 8)[1] + .1)
# 1: two pictures: two soft chimes, then a click when the distance is measured
place(sfx, bell(note('E5'), 1.6, .07), Wd(1, 3)[1], 1., .3); place(sfx, bell(note('G5'), 1.6, .07), Wd(1, 4)[1], 1., .7)
place(sfx, whoosh(.7, .18), Wd(1, 6)[1] - .2); place(sfx, tick(.14), Wd(1, 9)[1]); place(sfx, tick(.1), Wd(1, 9)[1] + .12)
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
# 2: the street: city hum; the throw (whoosh), the bonk; the jug pours and spills
sfx += noise_band(80, 900, T['s2'] - .2, T['s3'], .06, .4, .6, lfo=.5)
tt = Wd(2, 5)[1] - .25
place(sfx, whoosh(.8, .25), tt); place(sfx, tone(520, 260, .18, .06, .4), tt + 1.0); place(sfx, burst(.12, 300, 2500, .04, .35), tt + 1.0)
for k in range(3): place(sfx, tone(180, 150, .12, .05, .25 * .6 ** k), tt + 1.45 + k * .22, 1., .4)
p0 = Wd(2, 8)[1] - .1
sfx += noise_band(1500, 6000, p0, p0 + 2.0, .05, .2, .4, lfo=.8)
for k in range(8): place(sfx, burst(.04, 800, 3000, .02, .07), p0 + .3 + k * .18, 1., .5)
mus += pad(['C3', 'G3', 'Eb4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
# 3: the field of view shrinks: a falling tone; the bike bell from the side
sfx += noise_band(60, 700, T['s3'] - .2, T['s4'], .06, .4, .6, lfo=.4)
place(sfx, tone(880, 520, 1.4, .8, .12), Wd(3, 6)[1])
for k in range(2): place(sfx, bell(note('E6'), .8, .06), Wd(3, 11)[1] + k * .22, 1., .9)
place(sfx, tone(300, 300, .25, .15, .1), Wd(3, 14)[1])
mus += pad(['A2', 'E3', 'C4'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
# 4: no spare eye: a hit, then darkness (low drop)
place(sfx, burst(.4, 80, 1500, .12, .7), Wd(4, 4)[1]); place(sfx, tone(200, 50, 1.6, .7, .3), Wd(4, 6)[1])
mus += pad(['C#2', 'Ab2', 'D3'], T['s4'] - .2, T['s5'] + .3, .07, .5, .8, bright=4)
# 5: the brain copes: a hopeful turn, chimes on each cue
mus += pad(['F2', 'C3', 'A3', 'C4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
for k, w in enumerate((3, 7, 8)): place(sfx, bell(note(('A5', 'C6', 'E6')[k]), 1.8, .07), Wd(5, w)[1], 1., .3 + .2 * k)
sfx += noise_band(2000, 6000, T['s5'], T['s6'], .015, 1., 1., lfo=.6)
# 6: the cinema: a deep film hum and a sci-fi swell, then a buzzer on 'two eyes'
sfx += noise_band(40, 200, T['s6'] - .2, T['s7'], .06, .5, .6, lfo=.3)
place(sfx, tone(110, 220, 2.0, 1.2, .12), T['s6'] + .2)
place(sfx, tone(180, 180, .35, .25, .12) + tone(185, 185, .35, .25, .1), Wd(6, 9)[1], 1., .5)
mus += pad(['D2', 'A2', 'F3'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8, bright=4)
# 7: the myth and the skull: low mysterious drone, a stone thud, a reveal bell
mus += pad(['C#2', 'Ab2', 'C#3', 'E3'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8, bright=4)
place(sfx, whoosh(.8, .25), T['s7'] - .3); place(sfx, tone(60, 40, 1.0, .4, .5), Wd(7, 9)[1])
place(sfx, bell(note('C#5'), 2.4, .1), Wd(7, 12)[1]); place(sfx, bell(note('Ab5'), 2.4, .07), Wd(7, 16)[1])
# 8: under the microscope: water bubbles, little hops
sfx += noise_band(200, 1200, T['s8'] - .2, T['s9'], .03, .5, .5, lfo=.8)
for k in range(7): place(sfx, tone(600 + 90 * (k % 3), 900 + 90 * (k % 3), .08, .04, .06), T['s8'] + .4 + k * .77, 1., .4 + .05 * k)
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
