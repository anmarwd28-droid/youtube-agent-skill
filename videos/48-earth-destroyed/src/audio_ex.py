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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 10)[1])
rr = np.random.default_rng(6)
def wind(lo, hi, start, end, amp, a=.6, r=.8, rate=.31):
    n = fft_filter(rng.standard_normal(N), lo, hi); n /= np.abs(n).max() + 1e-9
    g = .55 + .45 * np.sin(2 * np.pi * rate * t + 1.3) * np.sin(2 * np.pi * rate * .37 * t + .4)
    e = env(start, end, a, r) * amp * g; return np.stack([n * e, np.roll(n, 700) * e], 1)
crk = Wd(0, 8)[1]; boom = Wd(0, 12)[1] - .15
# 0: the Earth: a calm wide chord; cracking rumbles and creaks; the explosion
mus += pad(['D2', 'A2', 'D3', 'F3', 'A3'], 0, crk + .3, .07, .3, .6, bright=4)
rum = fft_filter(rng.standard_normal(N), 25, 160); rum /= np.abs(rum).max() + 1e-9; rum *= env(crk - .3, boom + .2, .8, .1) * .28 * np.clip((t - crk + .3) / (boom - crk + .3), 0, 1); sfx += np.stack([rum, np.roll(rum, 300)], 1)
for k in range(14): place(sfx, burst(.08, 300, 3000, .03, .06 + .01 * k), crk + k * (boom - crk) / 14 + rr.random() * .1, 1., rr.random())
place(sfx, burst(1.6, 20, 600, .55, 1.0), boom); place(sfx, tone(90, 25, 2.5, 1.4, .5), boom); place(sfx, whoosh(1.2, .35), boom - .6)
for k in range(20): place(sfx, burst(.05, 800, 6000, .02, .05), boom + .3 + k * .12 + rr.random() * .1, 1., rr.random())
mus += pad(['Bb1', 'F2', 'C#3', 'Ab3'], boom, T['s1'] + .3, .07, .8, .8, bright=4)
# 1: the Sun: a hot roar, ticks for each day
sfx += np.stack([fft_filter(rng.standard_normal(N), 60, 900) * env(T['s1'] - .2, T['s2'], .4, .5) * .02] * 2, 1)
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s1'] - .2, T['s2'] + .3, .06, .6, .8)
for k in range(7): place(sfx, bell(note(['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'C6'][k]), .6, .045), Wd(1, 5)[1] + k * (Wd(1, 11)[1] - Wd(1, 5)[1]) / 7, 1., .2 + .1 * k)
# 2: rocks rushing past, impacts on the Moon
mus += pad(['A1', 'E2', 'C3', 'G3'], T['s2'] - .2, T['s3'] + .3, .065, .5, .8, bright=4)
for k in range(4): place(sfx, whoosh(.9, .18), T['s2'] + k * .55, 1., .2 + .2 * k)
for k in range(7): place(sfx, burst(.3, 40, 500, .12, .25), Wd(2, 4)[1] + k * .32 + rr.random() * .1, 1., .6 + .05 * k)
# 3: the Moon alone: a lonely, floating chord
mus += pad(['E2', 'B2', 'G3', 'D4', 'F#4'], T['s3'] - .2, T['s4'] + .3, .065, .8, .8)
place(sfx, bell(note('B5'), 2.4, .07), Wd(3, 4)[1])
# 4: life: birdsong and a warm chord that drains away
mus += pad(['G2', 'D3', 'B3', 'E4', 'A4'], T['s4'] - .2, Wd(4, 4)[1], .065, .6, 1.2)
for k in range(8): f0 = 2400 + rr.random() * 1500; place(sfx, tone(f0, f0 * 1.2, .1, .06, .03), T['s4'] + .2 + k * .3, 1., rr.random())
sfx += wind(1500, 6000, T['s4'] - .2, Wd(4, 3)[1], .03, rate=.5)
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], Wd(4, 3)[1], T['s5'] + .3, .06, 1.2, .8, bright=4)
# 5: Mars: thin cold wind; a shimmer when the blue star flares, then silence
sfx += wind(300, 2500, T['s5'] - .2, T['s6'], .04)
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
place(sfx, whoosh(1.0, .2), Wd(5, 11)[1] - .3); place(sfx, bell(note('E6'), 2.4, .1), Wd(5, 11)[1]); place(sfx, bell(note('B5'), 2.4, .07), Wd(5, 11)[1] + .2)
place(sfx, tone(220, 110, 1.4, 1.0, .08), Wd(5, 13)[1])
# 6: radio: crackle and a morse-like pulse travelling outward
mus += pad(['F2', 'C3', 'A3', 'C4', 'E4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8)
sfx += noise_band(2000, 7000, T['s6'], T['s7'], .012, .4, .4, lfo=.9)
for k in range(16): place(sfx, tone(880, 880, .08 if k % 3 else .2, .06, .04), T['s6'] + .4 + k * .3, 1., .3 + .03 * k)
# 7: Voyager: a soft, hopeful theme, a record crackle and a few notes like a voice
mus += pad(['G2', 'D3', 'B3', 'D4', 'G4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
sfx += noise_band(1500, 6000, Wd(7, 3)[1], T['s8'], .01, .4, .4)
for k in range(6): place(sfx, bell(note(['G5', 'B5', 'D6', 'B5', 'A5', 'G5'][k]), 1.2, .05), Wd(7, 3)[1] + k * .55, 1., .3 + .08 * k)
# 8: the debris ring: a dark drone, distant impacts
mus += pad(['Bb1', 'F2', 'Db3'.replace('Db', 'C#'), 'Ab3'], T['s8'] - .2, T['s9'] + .3, .07, .8, .8, bright=4)
for at in (Wd(8, 8)[1], Wd(8, 9)[1], Wd(8, 10)[1] + .3): place(sfx, burst(.4, 30, 300, .15, .3), at); place(sfx, tone(140, 50, .9, .6, .12), at)
# 9: the twist: a hit, then a slow swelling roar as the Sun grows
place(sfx, whoosh(.8, .25), T['s9'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(9, 0)[1]); place(sfx, bell(note('E5'), 2.4, .1), Wd(9, 0)[1])
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s9'] - .2, Wd(9, 11)[1], .065, .8, .8)
roar = fft_filter(rng.standard_normal(N), 30, 400); roar /= np.abs(roar).max() + 1e-9; roar *= env(Wd(9, 11)[1], T['s10'], 2.0, .6) * .25 * np.clip((t - Wd(9, 11)[1]) / 3.5, 0, 1); sfx += np.stack([roar, np.roll(roar, 500)], 1)
mus += pad(['C2', 'G2', 'Eb3', 'Bb3', 'D4'], Wd(9, 11)[1], T['s10'] + .3, .075, 1.5, .8, bright=4)
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
