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
te = Wd(0, 3)[1] + .12
# 0: cracks glow (a rising groan), the Moon bursts (a deep blast, debris hiss, a long rumble)
mus += pad(['D2', 'A2', 'D3', 'F3'], 0, te, .06, .3, .3, bright=4)
place(sfx, tone(60, 180, te, 1.5, .12), 0); sfx += noise_band(200, 1200, .3, te, .03, .4, .05, lfo=1.)
place(sfx, burst(1.8, 25, 1200, .6, 1.0), te); place(sfx, tone(70, 30, 2.4, 1.0, .6), te); place(sfx, whoosh(1.6, .3), te + .05)
sfx += noise_band(1500, 6000, te + .1, T['s1'] + .4, .03, .2, .8, lfo=1.5); sfx += noise_band(30, 160, te, T['s1'] + .5, .08, .05, 1.0)
mus += pad(['D2', 'A2', 'F3', 'C4'], te + .3, T['s1'] + .3, .065, .6, .8, bright=4)
# 1: the Sun's energy: a bright drone, the timer ticks and fills
mus += pad(['A2', 'E3', 'C#4', 'E4'], T['s1'] - .2, T['s2'] + .3, .06, .8, .8)
sfx += noise_band(80, 500, T['s1'], T['s2'], .04, .6, .6, lfo=.6)
t0, t1 = Wd(1, 5)[1], Wd(1, 10)[1] + .3
for k in range(20): place(sfx, tick(.05), t0 + k * (t1 - t0) / 20, 1., .3 + .4 * k / 20)
place(sfx, bell(note('E6'), 1.8, .1), t1)
# 2: the dinosaur asteroid (a thud), then the field fills (a rising swarm)
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8, bright=4)
place(sfx, burst(.3, 50, 600, .1, .35), Wd(2, 6)[1]); place(sfx, tone(200, 900, Wd(2, 10)[1] - Wd(2, 3)[1], 2.5, .05), Wd(2, 3)[1])
sfx += noise_band(2000, 7000, Wd(2, 3)[1], Wd(2, 10)[1] + .4, .03, .8, .4, lfo=1.2); place(sfx, bell(note('C#6'), 1.6, .08), Wd(2, 5)[1])
# 3: the night street under the rock cloud: crickets, a hushed city
mus += pad(['D2', 'A2', 'F3', 'Bb3'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8, bright=4)
sfx += noise_band(80, 600, T['s3'], T['s4'], .03, .6, .6, lfo=.4)
rr = np.random.default_rng(4)
for k in range(30): place(sfx, tone(4200, 4300, .05, .02, .02), T['s3'] + k * .2 + rr.random() * .05, 1., rr.random())
place(sfx, bell(note('F5'), 2.4, .08), Wd(3, 5)[1])
# 4: the pieces orbit and collide (clacks), spread into a ring (a long shimmering sweep)
mus += pad(['G2', 'D3', 'Bb3', 'F4'], T['s4'] - .2, T['s5'] + .3, .06, .8, .8)
for k in range(9): place(sfx, burst(.06, 300, 3000, .02, .12), Wd(4, 5)[1] + k * .14 + rr.random() * .06, 1., rr.random())
place(sfx, whoosh(3.0, .2), Wd(4, 7)[1]); sfx += noise_band(3000, 8000, Wd(4, 9)[1], T['s5'], .02, .8, .6, lfo=1.)
place(sfx, bell(note('D6'), 2.0, .08), Wd(4, 13)[1]); place(sfx, bell(note('A6'), 2.0, .05), Wd(4, 16)[1])
# 5: meteors (short whooshes), the fireball falls and hits beyond the city
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['s5'] - .2, T['s6'] + .3, .065, .6, .8, bright=4)
for k in range(8): place(sfx, whoosh(.5, .1), Wd(5, 3)[1] + k * .35 + rr.random() * .1, 1., rr.random())
hit = Wd(5, 8)[1] + .1
place(sfx, tone(900, 120, .9, .6, .08), hit - .9); place(sfx, burst(1.6, 20, 900, .5, .9), hit); place(sfx, tone(55, 28, 2.0, 1.0, .5), hit)
sfx += noise_band(25, 140, hit, T['s6'] + .3, .07, .05, 1.0)
# 6: the tides: waves, gulls, the swell grows calmer
mus += pad(['F2', 'C3', 'A3', 'C4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
sfx += noise_band(150, 2000, T['s6'], T['s7'], .05, .5, .5, lfo=2.)
for k in range(2): place(sfx, tone(1800, 1300, .25, .15, .03), T['s6'] + .6 + k * 1.3, 1., .7)
place(sfx, bell(note('C6'), 1.6, .07), Wd(6, 7)[1])
# 7: underwater: a muffled hum, bubbles; the clock (a tick-tock that stops)
mus += pad(['Bb1', 'F2', 'D3', 'A3'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8, bright=3)
sfx += noise_band(40, 300, T['s7'], T['s8'], .05, .5, .5, lfo=.6)
tb = T['s7']
while tb < Wd(7, 6)[1]: place(sfx, tone(400 + 600 * rr.random(), 900 + 600 * rr.random(), .04, .02, .03), tb, 1., rr.random()); tb += .08 + .1 * rr.random()
for k in range(4): place(sfx, burst(.03, 1500, 5000, .01, .12 if k % 2 else .09), Wd(7, 6)[1] + k * .3)
# 8: the surprise: a hit; the rocks gather (a converging swell); the new Moon (bells); 4.5 billion years ago (a deep warm drone)
place(sfx, whoosh(.8, .25), T['s8'] - .35); place(sfx, bell(note('C#5'), 2.4, .1), Wd(8, 0)[1]); place(sfx, burst(.3, 40, 300, .12, .4), Wd(8, 0)[1])
mus += pad(['A2', 'E3', 'B3', 'E4'], T['s8'] - .2, Wd(8, 10)[1], .065, .8, .6)
place(sfx, tone(200, 600, Wd(8, 9)[1] - Wd(8, 1)[1], 3.0, .05), Wd(8, 1)[1]); sfx += noise_band(1000, 5000, Wd(8, 1)[1], Wd(8, 9)[1], .025, .8, .3, lfo=1.)
place(sfx, bell(note('E6'), 2.2, .1), Wd(8, 8)[1]); place(sfx, bell(note('B6'), 2.0, .06), Wd(8, 8)[1] + .2)
mus += pad(['D2', 'A2', 'F3', 'C4'], Wd(8, 10)[1] - .2, T['s9'] + .3, .07, .6, .8, bright=4)
sfx += noise_band(30, 200, Wd(8, 10)[1], T['s9'], .06, .5, .5, lfo=.6); place(sfx, tone(80, 45, 2.0, 1.0, .25), Wd(8, 10)[1])
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
