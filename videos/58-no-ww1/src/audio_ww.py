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
T = {f"s{i}": S0(i) for i in range(1, 13)}; T['cta'] = Wd(12, 9)[1]
rr = np.random.default_rng(6)
def groan(dur, amp=1., f0=95):
    n = rng.standard_normal(int(dur * SR)); tt = np.arange(len(n)) / SR
    b = fft_filter(n, 180, 900) * .5 + fft_filter(n, 500, 1400) * .3; b /= np.abs(b).max() + 1e-9
    v = np.sin(2 * np.pi * f0 * (1 + .04 * np.sin(2 * np.pi * 5 * tt)) * tt) * .6 + np.sin(2 * np.pi * f0 * 2.02 * tt) * .25
    e = np.sin(np.pi * np.clip(tt / dur, 0, 1)) ** 1.5
    return (b * .6 + v * .5) * e * amp
def beat(at, amp=.3):
    place(sfx, tone(70, 40, .18, .08, amp), at); place(sfx, tone(65, 38, .16, .07, amp * .7), at + .22)
def drone(f, start, end, amp):
    e = env(start, end, 1.2, 1.2); w = np.sin(2 * np.pi * f * t) + .4 * np.sin(2 * np.pi * f * 1.5 * t + 1) + .25 * np.sin(2 * np.pi * f * 2.01 * t)
    w *= 1 + .3 * np.sin(2 * np.pi * .2 * t); return np.stack([w * e * amp, np.roll(w, 400) * e * amp], 1)
def pluck(f, dur=1.2, amp=.1):
    tt = np.arange(int(dur * SR)) / SR; return sum(np.sin(2 * np.pi * f * h * tt) * np.exp(-tt * (3 + h * 1.5)) / h for h in range(1, 6)) * amp
def birds(start, end, n, amp=.03):
    for k in range(n):
        at = start + rr.random() * (end - start - .4); f0 = 2600 + rr.random() * 1600
        for q in range(2 + int(rr.random() * 3)): place(sfx, tone(f0, f0 * (1.15 + .2 * rr.random()), .07, .04, amp), at + q * .11, 1., rr.random())
def thud(at, amp=.3): place(sfx, tone(140, 60, .2, .07, amp), at); place(sfx, burst(.12, 80, 900, .04, amp * .4), at)
def tick(at, amp=.05, f=2400): place(sfx, burst(.025, f * .6, f * 2, .008, amp), at, 1., .5)
def chuff(at, amp=.12): place(sfx, burst(.22, 80, 1600, .09, amp), at, 1., .45)
def rumble(start, end, amp): return noise_band(25, 160, start, end, amp, .4, .8, lfo=1.3)
def heart(at, amp=.25): place(sfx, tone(60, 42, .14, .06, amp), at); place(sfx, tone(55, 40, .12, .05, amp * .7), at + .2)
def beep(at, amp=.05, f=1320): place(sfx, tone(f, f, .12, .05, amp), at, 1., .6)
END = TOTAL
def boom(at, amp=.3, pan=.5): place(sfx, burst(1.2, 25, 260, .35, amp), at, 1., pan); place(sfx, burst(.3, 200, 2500, .08, amp * .25), at, 1., pan)
def shot(at, amp=.35): place(sfx, burst(.25, 400, 6000, .03, amp), at); place(sfx, burst(1.4, 200, 2200, .5, amp * .15), at + .05)
# 0: the hook: a dark minor chord, far guns along the fronts
mus += pad(['D2', 'A2', 'F3'], 0, T['s1'] + .3, .05, .3, .6, bright=3)
for k in range(5): boom(.4 + k * .5, .18, .3 + .1 * k)
place(sfx, burst(.8, 30, 200, .3, .4), Wd(0, 6)[1])
# 1: a summer street in 1914: an old-world waltz pad, the car engine, the shot, pigeons, then the war spreads with a low hit
mus += pad(['F2', 'A2', 'C3', 'E3'], T['s1'] - .2, Wd(1, 7)[1], .04, 1., .3, bright=5)
for k in range(int((Wd(1, 7)[1] - T['s1']) / .09)): place(sfx, burst(.05, 60, 400, .02, .05), T['s1'] + k * .09, 1., .55)
shot(Wd(1, 7)[1]); birds(Wd(1, 7)[1] + .1, Wd(1, 10)[1], 6, .025)
for k in range(12): place(sfx, burst(.06, 300, 2000, .02, .03), Wd(1, 7)[1] + .2 + k * .14, 1., .3 + .4 * (k % 2))
mus += pad(['D2', 'A2', 'D3', 'F3'], Wd(1, 9)[1], T['s2'] + .3, .05, .5, 1., bright=4); place(sfx, burst(.8, 30, 200, .3, .35), Wd(1, 10)[1]); beat(Wd(1, 15)[1], .25)
# 2: the trenches: shellfire, a hiss of gas, a low hit on the number
mus += pad(['D2', 'F2', 'A2'], T['s2'] - .2, T['s3'] + .3, .045, 1., 1., bright=3)
for k in range(8): boom(T['s2'] + .3 + k * .7, .22, .2 + .08 * k)
sfx += noise_band(1500, 7000, Wd(2, 5)[1], T['s3'], .03, .8, 1.); place(sfx, burst(.6, 30, 180, .3, .35), Wd(2, 9)[1])
# 3: the flu: a quiet ward, coughs, a cold drone, a heartbeat as the planet turns red
mus += pad(['E2', 'G2', 'B2'], T['s3'] - .2, T['s4'] + .3, .045, 1., 1., bright=3)
for k in range(5): place(sfx, burst(.18, 300, 2500, .06, .06), T['s3'] + .6 + k * .9, 1., .3 + .1 * k)
for k in range(int((T['s4'] - Wd(3, 9)[1]) / .9)): heart(Wd(3, 9)[1] + k * .9, .2)
# 4: four empires fall: a crack and a crumble on each name
mus += pad(['C2', 'G2', 'Eb3'], T['s4'] - .2, T['s5'] + .3, .045, 1., 1., bright=4)
for k in range(4): at = Wd(4, 5 + k)[1] + .35; place(sfx, burst(.5, 80, 3000, .12, .2), at, 1., .3 + .13 * k); place(sfx, burst(1.0, 30, 300, .3, .2), at + .05)
# 5: Russia 1917: marching feet in snow, a crowd murmur, wind
mus += pad(['A1', 'E2', 'C3'], T['s5'] - .2, T['s6'] + .3, .045, 1., 1., bright=4)
for k in range(int((T['s6'] - T['s5']) / .38)): place(sfx, burst(.07, 200, 1800, .03, .05), T['s5'] + k * .38, 1., .4 + .2 * (k % 2))
sfx += noise_band(300, 1500, T['s5'], T['s6'], .025, .5, .8, lfo=.6) + noise_band(400, 2500, T['s5'], T['s6'], .012, .5, .8)
# 6: the borders: a pen scratching as the lines are drawn
mus += pad(['D2', 'A2', 'F3'], T['s6'] - .2, T['s7'] + .3, .045, 1., 1., bright=4)
sfx += noise_band(2500, 8000, Wd(6, 5)[1], Wd(6, 9)[1], .025, .1, .3, lfo=1.5); place(sfx, burst(.6, 30, 200, .3, .3), Wd(6, 10)[1])
# 7: the other map: a soft rising shimmer as the empires come back
mus += pad(['F2', 'C3', 'A3'], T['s7'] - .2, T['s8'] + .3, .045, 1., 1., bright=5)
place(sfx, tone(300, 900, 2.0, 2.0, .03), Wd(7, 3)[1]); place(sfx, bell(note('A5'), 2.4, .07), Wd(7, 10)[1])
# 8: science: propeller drones, the tank's tracks, a chime for the blood bank
mus += pad(['C3', 'E3', 'G3'], T['s8'] - .2, T['s9'] + .3, .045, 1., 1., bright=5)
sfx += drone(55, T['s8'] + .5, Wd(8, 12)[1], .03) + noise_band(80, 500, Wd(8, 12)[1] - .2, T['s9'], .05, .3, .5, lfo=1.)
for k in range(10): place(sfx, burst(.04, 600, 3000, .015, .03), Wd(8, 12)[1] + k * .2, 1., .45)
place(sfx, bell(note('E5'), 2.2, .08), Wd(8, 16)[1])
# 9: the twist: a night trench, a flare hiss, a low hit on the name
mus += pad(['D2', 'F2', 'Bb2'], T['s9'] - .2, T['s10'] + .3, .045, 1., 1., bright=3)
place(sfx, tone(1800, 600, 2.4, 2.0, .02), T['s9'] + .2); boom(T['s9'] + 1.2, .12, .8); place(sfx, burst(.9, 25, 160, .35, .45), Wd(9, 7)[1])
# 10: Versailles, then the second war: a pen, then rising rumble and booms
mus += pad(['G2', 'Bb2', 'D3'], T['s10'] - .2, Wd(10, 5)[1] + .3, .04, 1., .6, bright=4)
sfx += noise_band(2500, 8000, Wd(10, 2)[1], Wd(10, 4)[1] + .4, .02, .1, .3, lfo=1.5)
mus += pad(['D2', 'A2', 'Eb3'], Wd(10, 5)[1], T['s11'] + .3, .05, .5, 1., bright=3); sfx += rumble(Wd(10, 9)[1], T['s11'], .06)
for k in range(6): boom(Wd(10, 10)[1] + k * .45, .2, .2 + .12 * k)
# 11: the painter: a quiet street, a gentle lonely line
mus += pad(['A2', 'C3', 'E3'], T['s11'] - .2, T['s12'] + .3, .04, 1., 1., bright=5)
for k, n in enumerate(['E4', 'C4', 'A3']): place(sfx, pluck(note(n), 1.4, .06), T['s11'] + .8 + k * .9, 1., .5)
birds(T['s11'], T['s12'], 3, .015)
# 12: the ending: the Earth, a resolving chord, a bell on «واشتركْ»
mus += pad(['D3', 'F#3', 'A3', 'D4'], T['s12'] - .2, END, .05, 1., 1., bright=5)
for k, (f, at) in enumerate([(note('A5'), 0), (note('D5'), .3)]):
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
