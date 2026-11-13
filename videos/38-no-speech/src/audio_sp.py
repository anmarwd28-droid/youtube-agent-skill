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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 7)[1])
tick = lambda amp=.12: burst(.025, 2500, 7000, .006, amp)
# 0: the face tries to speak: a soft murmur of voices-like noise, then a cut to silence
mus += pad(['D2', 'A2', 'F3', 'A3'], 0, T['s1'] + .3, .07, .3, .8, bright=5)
place(sfx, whoosh(1.1, .2), .1)
sfx += noise_band(250, 1800, 0, Wd(0, 7)[1] + .1, .05, .3, .05, lfo=.9)
place(sfx, tone(400, 90, .5, .2, .35), Wd(0, 7)[1] + .05); place(sfx, bell(note('A5'), 2.4, .1), Wd(0, 8)[1] + .1)
# 1: the busy street, lots of chatter (filtered noise with a fast tremolo); pops at the silence
cr = noise_band(300, 2500, T['s1'] - .2, Wd(1, 10)[1] + .05, .07, .4, .05, lfo=.9)
cr *= (1 + .5 * np.sin(2 * np.pi * 6.3 * t) * np.sin(2 * np.pi * 1.7 * t))[:, None]; sfx += cr
sfx += noise_band(60, 600, T['s1'] - .2, T['s2'], .04, .4, .6, lfo=.4)
for k in range(10): place(sfx, tick(.05), Wd(1, 3)[1] + k * .55, 1., .3 + .04 * k)
for k in range(4): place(sfx, tone(900 - 80 * k, 500, .08, .03, .2), Wd(1, 10)[1] + k * .05, 1., .2 + .2 * k)
place(sfx, tone(140, 60, 1.0, .5, .35), Wd(1, 11)[1])
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s1'] - .2, Wd(1, 10)[1], .06, .8, .2)
mus += pad(['D2', 'A2'], Wd(1, 10)[1], T['s2'] + .3, .04, .3, .8, bright=3)
# 2: the Earth and the languages: a shimmer of chimes, then a falling sweep when they go silent
mus += pad(['C3', 'G3', 'D4', 'E4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
for k in range(8): place(sfx, bell(note(('C6', 'E6', 'G6', 'D6')[k % 4]), 1.2, .04), T['s2'] + .2 + k * .25, 1., .2 + .08 * k)
place(sfx, tone(1200, 200, 1.4, .7, .12), Wd(2, 6)[1] - .1); place(sfx, whoosh(1.0, .2), Wd(2, 6)[1] - .3)
# 3: a phone rings, then nothing; radio hiss fades; a music box melody with no words
ring = lambda at: [place(sfx, (tone(1320, 1320, .4, 1., .07) + tone(1760, 1760, .4, 1., .05)) * (np.sin(2 * np.pi * 20 * np.arange(int(.4 * SR)) / SR) > 0), at + k * .5, 1., .3) for k in range(2)]
ring(T['s3'] - .1)
sfx += noise_band(1500, 7000, Wd(3, 4)[1] - .2, Wd(3, 5)[1] + .6, .03, .3, .5)
for k, nm in enumerate(['E5', 'G5', 'A5', 'C6', 'A5', 'G5']): place(sfx, bell(note(nm), 1.2, .07), Wd(3, 6)[1] + k * .3, 1., .6)
mus += pad(['A2', 'E3', 'C4'], T['s3'] - .2, T['s4'] + .3, .05, .8, .8)
# 4: danger: tension, a car approaching, brakes screech, then the silent call
mus += pad(['C#2', 'Ab2', 'D3'], T['s4'] - .2, T['s5'] + .3, .07, .5, .8, bright=4)
sfx += noise_band(60, 900, T['s4'] - .1, Wd(4, 7)[1] + .3, .06, 2.0, .2)
place(sfx, burst(1.0, 2500, 6000, .45, .25), Wd(4, 7)[1] + .2, 1., .7); place(sfx, tone(2600, 2100, .9, .5, .06), Wd(4, 7)[1] + .2, 1., .7)
place(sfx, tone(80, 50, .6, .3, .4), Wd(4, 6)[1])
for k in range(3): place(sfx, tone(700, 700, .12, .1, .08), Wd(4, 10)[1] + k * .3, 1., .6)
# 5: messages: soft notification pings
sfx += noise_band(80, 700, T['s5'] - .2, T['s6'], .04, .4, .6, lfo=.4)
for k in range(6): place(sfx, tone(1400 + 200 * (k % 2), 1900 + 200 * (k % 2), .09, .05, .1), T['s5'] + .3 + k * .75, 1., .3 + .1 * (k % 4))
for k in range(5): place(sfx, burst(.05, 2000, 6000, .015, .05), Wd(5, 5)[1] + k * .2, 1., .4)
mus += pad(['F2', 'C3', 'A3', 'C4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
# 6: faces: a chime per emotion
for k, w in enumerate((2, 3, 4)): place(sfx, bell(note(('E5', 'B4', 'F4')[k]), 1.8, .08), Wd(6, w)[1], 1., .3 + .2 * k)
mus += pad(['G2', 'D3', 'Bb3', 'D4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
# 7: sign languages: warm hopeful pad, soft swishes of hands
mus += pad(['D2', 'A2', 'F#3', 'A3', 'E4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
for k in range(6): place(sfx, whoosh(.35, .06), T['s7'] + .3 + k * 1.05, 1., .3 + .1 * (k % 3))
place(sfx, bell(note('D6'), 2., .08), Wd(7, 5)[1])
# 8: the twist: a reveal and a children's playground murmur (no words)
place(sfx, whoosh(.8, .25), T['s8'] - .3); place(sfx, bell(note('C#5'), 2.4, .1), Wd(8, 0)[1]); place(sfx, bell(note('E5'), 2.4, .08), Wd(8, 5)[1])
mus += pad(['A2', 'E3', 'C#4', 'E4'], T['s8'] - .2, T['s9'] + .3, .07, .8, .8)
for k in range(6): place(sfx, whoosh(.3, .05), T['s8'] + .4 + k * 1.1, 1., .4)
# 9: darkness and touch: low drone, a heartbeat-like soft pulse
mus += pad(['C#2', 'Ab2', 'E3'], T['s9'] - .2, T['s10'] + .3, .06, .8, .8, bright=3)
for k in range(4): place(sfx, tone(60, 45, .2, .08, .3), Wd(9, 2)[1] + k * .9); place(sfx, tone(55, 40, .18, .07, .2), Wd(9, 2)[1] + k * .9 + .2)
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
