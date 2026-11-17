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
T = {f"s{i}": S0(i) for i in range(1, 12)}; T['cta'] = Wd(11, 7)[1]
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
# 0: the hook: a low horror drone, wind, groans, a hit on "zombie"
mus += drone(55, 0, T['s1'] + .4, .05) + pad(['A1', 'E2', 'C3', 'Eb3'], 0, T['s1'] + .3, .06, .3, .6, bright=4)
sfx += noise_band(150, 1200, 0, T['s1'], .03, .3, .5, lfo=.8)
for k, at in enumerate((.3, 1.4, 2.2)): place(sfx, groan(1.3, .1, 85 + 12 * k), at, 1., .3 + .2 * k)
place(sfx, burst(.4, 30, 200, .2, .5), Wd(0, 7)[1]); place(sfx, tone(220, 55, 1.2, .8, .12), Wd(0, 7)[1])
place(sfx, whoosh(.6, .2), T['s1'] - .4)
# 1: the jungle: insects and birds, an eerie pad; a crack as the stalk grows
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s1'] - .2, T['s2'] + .3, .05, .8, .8, bright=4)
sfx += noise_band(4000, 9000, T['s1'], T['s2'], .012, .6, .5, lfo=1.)
for k in range(9): f0 = 2200 + rr.random() * 1800; place(sfx, tone(f0, f0 * 1.3, .09, .05, .03), T['s1'] + .4 + k * .9 + rr.random() * .3, 1., rr.random())
place(sfx, tone(1200, 1200, .03, .01, .08), Wd(1, 13)[1]); place(sfx, tone(400, 90, .9, .5, .07), Wd(1, 14)[1])
for k in range(6): place(sfx, burst(.05, 2000, 7000, .02, .03), Wd(1, 15)[1] + k * .09)
# 2: rabies: a heartbeat that speeds up, a rising dissonance
mus += pad(['C2', 'G2', 'Eb3', 'F#3'], T['s2'] - .2, T['s3'] + .3, .06, .6, .8, bright=4)
hb = T['s2'] + .2
while hb < T['s3'] - .3:
    beat(hb, .22); hb += .85 if hb < Wd(2, 6)[1] else .55
place(sfx, tone(200, 600, 1.5, 1.2, .05), Wd(2, 8)[1]); place(sfx, groan(1.0, .08, 120), Wd(2, 9)[1], 1., .6)
place(sfx, burst(.15, 300, 3000, .05, .12), Wd(2, 11)[1])
# 3: doubling: a tick for each new day, pitch climbing
mus += pad(['A1', 'E2', 'C3', 'G3'], T['s3'] - .2, T['s4'] + .3, .055, .6, .8, bright=4)
for k, w in enumerate((3, 5, 10, 12, 13)): place(sfx, bell(note(['A4', 'C5', 'E5', 'A5', 'C6'][k]), 1.0, .06), Wd(3, w)[1], 1., .3 + .1 * k)
for k in range(8): place(sfx, groan(.7, .05, 100 + 6 * k), Wd(3, 12)[1] + k * .2, 1., rr.random())
# 4: 33 days: a fast count that rises into a hit
for k in range(33): place(sfx, tone(500 + 30 * k, 500 + 30 * k, .04, .02, .03), S0(4) + k * (Wd(4, 9)[1] + .5 - S0(4)) / 33)
sfx += drone(41, S0(4), T['s5'] + .3, .035)
place(sfx, burst(.5, 30, 250, .25, .5), Wd(4, 10)[1]); place(sfx, tone(330, 82, 1.4, .9, .1), Wd(4, 10)[1])
mus += pad(['F1', 'C2', 'Ab2', 'C3'], T['s4'] - .2, T['s5'] + .3, .06, .6, .8, bright=4)
# 5: flights: jets passing
for k in range(4): place(sfx, whoosh(1.4, .12), T['s5'] + .3 + k * 1.6, 1., .2 + .2 * k)
sfx += noise_band(80, 500, T['s5'], T['s6'], .02, .5, .5)
mus += pad(['D2', 'A2', 'F3', 'Bb3'], T['s5'] - .2, T['s6'] + .3, .055, .6, .8, bright=4)
# 6: the city falls, the village holds: distant sirens, then wind and birds
for k in range(3): place(sfx, tone(700, 950, .6, .5, .02), T['s6'] + .3 + k * .65, 1., .2); place(sfx, tone(950, 700, .6, .5, .02), T['s6'] + .6 + k * .65, 1., .2)
sfx += noise_band(200, 1500, T['s6'], T['s7'], .02, .5, .5, lfo=.7)
for k in range(5): f0 = 2600 + rr.random() * 900; place(sfx, tone(f0, f0 * .8, .12, .06, .03), Wd(6, 6)[1] + k * .5, 1., .7)
mus += pad(['G2', 'D3', 'Bb3', 'D4'], T['s6'] - .2, Wd(6, 6)[1], .055, .6, .8) + pad(['G2', 'D3', 'B3', 'D4'], Wd(6, 6)[1] - .2, T['s7'] + .3, .055, .6, .8)
# 7: blackout: a power-down whine, hum cuts out
sfx += np.stack([np.sin(2 * np.pi * 100 * t) * env(T['s7'] - .2, Wd(7, 3)[1] + .3, .3, .1) * .025] * 2, 1)
place(sfx, tone(900, 40, 1.4, .9, .1), Wd(7, 3)[1]); place(sfx, burst(.3, 40, 300, .15, .3), Wd(7, 3)[1] + .6)
for k in range(3): place(sfx, tone(1200, 1200, .06, .04, .04), Wd(7, 5)[1] + k * .25)
mus += drone(49, T['s7'], T['s8'] + .3, .04)
# 8: the twist: a hit, splashing water, a choked gasp; three slow days
place(sfx, whoosh(.8, .22), T['s8'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(8, 0)[1]); place(sfx, bell(note('E5'), 2.4, .09), Wd(8, 0)[1])
sfx += noise_band(1500, 7000, T['s8'] - .2, T['s9'], .02, .4, .5, lfo=.5)
place(sfx, burst(.6, 800, 6000, .25, .2), Wd(8, 3)[1]); place(sfx, groan(.8, .12, 140), Wd(8, 3)[1] + .1, 1., .3)
place(sfx, burst(.25, 200, 1200, .08, .1), Wd(8, 6)[1])
for k in range(3): place(sfx, bell(note(['A4', 'F4', 'D4'][k]), 1.4, .07), Wd(8, 11)[1] + k * .7)
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s8'] - .2, T['s9'] + .3, .06, .8, .8)
# 9: dawn in the mountains: a warm major chord, birds
mus += pad(['D2', 'A2', 'F#3', 'A3', 'D4'], T['s9'] - .2, T['s10'] + .3, .07, .8, .8)
for k in range(7): f0 = 2800 + rr.random() * 900; place(sfx, tone(f0, f0 * 1.25, .1, .05, .03), T['s9'] + .3 + k * .55, 1., rr.random())
# 10: the vaccine: hopeful, a rising bell line
mus += pad(['C2', 'G2', 'E3', 'G3', 'C4'], T['s10'] - .2, T['s11'] + .3, .07, .8, .8)
for k, nn in enumerate(('C5', 'E5', 'G5', 'C6')): place(sfx, bell(note(nn), 1.8, .07), Wd(10, 9)[1] + k * .18, 1., .3 + .12 * k)
place(sfx, burst(.3, 40, 300, .12, .25), Wd(10, 9)[1])
# 11: the end
mus += pad(['A2', 'E3', 'A3', 'C#4', 'E4'], T['s11'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('A4'), 0), (note('E5'), .35), (note('A5'), .7))):
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
