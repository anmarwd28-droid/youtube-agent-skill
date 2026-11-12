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
FL = 2 * 24.26 / 9.81
T = dict(lift=.12, leap=Wd(0, 4)[1] - .2, eyes=Wd(0, 6)[1] - .15, hero=Wd(0, 7)[1], s1=S0(1), w1=Wd(1, 4)[1], w2=Wd(1, 5)[1], s2=S0(2), strain=Wd(2, 3)[1], law=Wd(2, 6)[1], fly=Wd(2, 8)[1] + .05,
         s3=S0(3), jump=Wd(3, 0)[1] + .45, s4=S0(4), beam=Wd(4, 0)[1] + .12, cut=Wd(4, 3)[1] + .5, kw=Wd(4, 6)[1], x10=Wd(4, 8)[1], s5=S0(5), ghost=Wd(5, 1)[1] + .1, rays=Wd(5, 4)[1], blind=Wd(5, 11)[1],
         s6=S0(6), hop=Wd(6, 6)[1] - .05, atom=Wd(6, 12)[1], s7=S0(7), you=Wd(7, 1)[1], brain=Wd(7, 4)[1], bulb=Wd(7, 12)[1], cta=S0(8))
def buzz(f, dur, amp):
    tt = np.arange(int(dur * SR)) / SR; w = sum(np.sin(2 * np.pi * f * h * tt + h) / h for h in range(1, 16)); w *= 1 + .3 * np.sin(2 * np.pi * 37 * tt)
    return w / (np.abs(w).max() + 1e-9) * np.clip(tt / .05, 0, 1) * np.clip((dur - tt) / .15, 0, 1) * amp
# 0: a city morning; the car goes up (whoosh), a man leaps (rising tone), eyes ignite (zap), then a bright "hero" chord
sfx += noise_band(80, 1200, 0, T['s1'] + .4, .05, .2, .5, lfo=.4)
place(sfx, whoosh(.9, .3), T['lift']); place(sfx, tone(70, 130, .8, .5, .3), T['lift'] + .05)
place(sfx, tone(180, 720, .55, .3, .16), T['leap']); place(sfx, whoosh(.7, .22), T['leap'], 1., .25)
place(sfx, buzz(190, .9, .1), T['eyes'], 1., .75); place(sfx, tone(2400, 900, .35, .12, .08), T['eyes'], 1., .75)
mus += pad(['D3', 'A3', 'D4', 'F#4'], 0, T['s2'] + .3, .07, .5, .9)
for k, (f, at) in enumerate(((note('D5'), 0), (note('F#5'), .12), (note('A5'), .24))): place(sfx, bell(f, 2.0, .09), T['hero'] + at, 1., .35 + .15 * k)
# 1: the weight goes down through the body, the ground pushes back: two soft thuds
place(sfx, tone(60, 90, 1.2, .6, .22), T['s1'] + .3); place(sfx, tone(90, 45, .5, .25, .4), T['w1']); place(sfx, tone(55, 95, .5, .25, .35), T['w2'])
# 2: the push. Strain, bricks cracking, the law (a bell), then you are thrown back: whoosh and a far crash
mus += pad(['B2', 'F#3', 'D4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8, bright=5)
sfx += noise_band(40, 220, T['strain'], T['fly'], .22, .5, .1, lfo=.5)
for at in np.arange(T['strain'] + .15, T['fly'], .33): place(sfx, burst(.09, 500, 4200, .03, .16), at + rng.uniform(0, .12), 1., .3)
place(sfx, bell(note('B4'), 2.0, .1), T['law']); place(sfx, bell(note('F#5'), 2.0, .07), T['law'] + .15)
place(sfx, tone(110, 40, .4, .2, .45), T['fly']); place(sfx, whoosh(.8, .4), T['fly'], 1., .65); place(sfx, burst(.5, 80, 2500, .16, .35), T['fly'] + .62, 1., .85)
# 3: the jump: a spring, wind that follows the speed (loud, silent at the top, loud again), the impact, two warning beeps
mus += pad(['G2', 'D3', 'B3'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8, bright=5)
place(sfx, tone(140, 620, .5, .35, .28), T['jump'] - .05); place(sfx, whoosh(.6, .3), T['jump'] - .05)
wind = fft_filter(rng.standard_normal(N), 350, 3200); wind /= np.abs(wind).max() + 1e-9
tau = (t - T['jump']) / FL; ew = np.where((tau > 0) & (tau < 1), np.abs(1 - 2 * tau) ** 1.3, 0.0) * .2
sfx += np.stack([wind * ew, np.roll(wind, 400) * ew], 1)
place(sfx, tone(95, 30, .9, .4, .55), T['jump'] + FL); place(sfx, burst(.6, 60, 3000, .14, .3), T['jump'] + FL)
for k in range(2): place(sfx, tone(880, 880, .14, .2, .07), T['jump'] + FL + .55 + k * .3)
# 4: eye beams: a buzzing ray, sparks, the steel piece clangs on the ground; then the power numbers
mus += pad(['E2', 'B2', 'G3'], T['s4'] - .2, T['s5'] + .3, .055, .8, .8, bright=4)
place(sfx, buzz(160, T['cut'] + .2 - T['beam'], .16), T['beam'], 1., .55); place(sfx, tone(3200, 1400, .3, .1, .07), T['beam'])
for at in np.arange(T['beam'] + .3, T['cut'] + .1, .07): place(sfx, burst(.05, 2500, 9000, .015, .09), at + rng.uniform(0, .05), 1., rng.uniform(.55, .9))
for m, a in ((1, 1), (2.32, .6), (3.87, .4), (5.1, .25)): place(sfx, bell(190 * m, 1.6, .1 * a), T['cut'] + .85, 1., .85)
place(sfx, burst(.25, 150, 3000, .06, .3), T['cut'] + .85, 1., .85)
place(sfx, tone(520, 780, .25, .15, .08), T['kw']); place(sfx, bell(note('E5'), 1.8, .1), T['x10']); place(sfx, bell(note('B5'), 1.8, .07), T['x10'] + .12)
# 5: invisible: a glassy shimmer; light passes through (soft glints); then blindness: everything drops to a low hum
mus += pad(['A2', 'E3', 'C#4', 'B4'], T['s5'] - .2, T['blind'] + .2, .06, .8, .5)
place(sfx, whoosh(1.0, .2), T['ghost']); place(sfx, tone(1800, 3600, .9, .5, .05), T['ghost'])
for at in np.arange(T['rays'], T['blind'] - .2, .34): place(sfx, bell(note('E6') * rng.uniform(.95, 1.3), .9, .035), at, 1., rng.uniform(.2, .8))
place(sfx, tone(160, 38, 1.4, .7, .34), T['blind']); sfx += noise_band(25, 110, T['blind'], T['s6'] + .2, .3, .3, .5)
# 6: space: eight billion feet leave the ground and land (one deep double thud); the Earth does not care; a tiny ping for the atom
mus += pad(['D2', 'A2', 'F#3'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8, bright=4)
place(sfx, whoosh(.7, .3), T['hop']); place(sfx, tone(70, 34, 1.0, .5, .5), T['hop'] + 1.1); place(sfx, burst(.5, 30, 300, .2, .3), T['hop'] + 1.1)
place(sfx, bell(note('A6'), 1.4, .07), T['atom'] + .2)
# 7: the twist: a warm swell, neurons sparkle, the bulb clicks on
mus += pad(['G2', 'D3', 'B3', 'F#4'], T['s7'] - .1, T['cta'] + .3, .07, .7, .8)
place(sfx, bell(note('D5'), 2.2, .1), T['you']); place(sfx, bell(note('G5'), 2.2, .07), T['you'] + .14)
for at in np.arange(T['brain'], T['bulb'] - .3, .16): place(sfx, bell(note(rng.choice(['D6', 'F#6', 'A6', 'B5', 'G6'])), .5, .028), at + rng.uniform(0, .08), 1., rng.uniform(.15, .85))
place(sfx, burst(.03, 1500, 7000, .01, .3), T['bulb'] + .5); place(sfx, tone(120, 120, 1.6, .9, .08), T['bulb'] + .52)
# 8: the call to action
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['cta'] - .1, TOTAL, .07, .8, 1.2)
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
