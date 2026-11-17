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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 8)[1], sea=Wd(2, 4)[1], air=Wd(2, 8)[1], river=Wd(3, 7)[1], plough=Wd(7, 5)[1])
rr = np.random.default_rng(6)
def wind(lo, hi, start, end, amp, a=.6, r=.8, rate=.31):
    n = fft_filter(rng.standard_normal(N), lo, hi); n /= np.abs(n).max() + 1e-9
    g = .55 + .45 * np.sin(2 * np.pi * rate * t + 1.3) * np.sin(2 * np.pi * rate * .37 * t + .4)
    e = env(start, end, a, r) * amp * g; return np.stack([n * e, np.roll(n, 700) * e], 1)
def hum(start, end, amp, f=100):
    h = (np.sin(2 * np.pi * f * t) + .5 * np.sin(2 * np.pi * 2 * f * t) + .25 * np.sin(2 * np.pi * 3 * f * t)) * env(start, end, .3, .5) * amp; return np.stack([h, h], 1)
cut = Wd(0, 9)[1]
# 0: the Earth with satellites: a bright busy pulse of data blips, then everything powers down at once
mus += pad(['E2', 'B2', 'E3', 'G3', 'B3'], 0, cut + .2, .07, .3, .5, bright=4)
for k in range(26): f0 = 1400 + rr.random() * 1800; place(sfx, tone(f0, f0, .05, .03, .025), .2 + k * .14 + rr.random() * .05, 1., rr.random())
sfx += hum(0, cut + .1, .03)
place(sfx, tone(420, 38, 1.8, 1.2, .3), cut - .05)            # the power-down
place(sfx, burst(.25, 60, 500, .1, .35), cut)
for k in range(8): place(sfx, burst(.03, 1500, 7000, .01, .06), cut + .1 + k * .12, 1., rr.random())
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], cut + .3, T['s1'] + .3, .07, 1.0, .8, bright=4)
# 1: the street: a hum, screens click off, phones blip out, the windows go dark block by block
mus += pad(['A1', 'E2', 'C3', 'G3'], T['s1'] - .2, T['s2'] + .3, .065, .6, .8, bright=4)
sfx += hum(T['s1'] - .2, Wd(1, 6)[1] + .2, .03, 120)
for at in (Wd(1, 1)[1] - .1, Wd(1, 1)[1] + .2): place(sfx, burst(.06, 800, 5000, .02, .14), at); place(sfx, tone(900, 60, .25, .15, .08), at)
for k in range(3): place(sfx, tone(1320, 660, .18, .1, .05), Wd(1, 2)[1] + .05 + k * .22, 1., .2 + .3 * k)
for k in range(5): place(sfx, burst(.05, 700, 4000, .018, .12), Wd(1, 4)[1] + k * .3, 1., .2 + .15 * k); place(sfx, tone(160, 60, .3, .2, .08), Wd(1, 4)[1] + k * .3)
place(sfx, tone(90, 40, 1.6, 1.0, .2), Wd(1, 8)[1])
# 2: traffic that brakes to silence; the sea; the empty airport
eng = fft_filter(rng.standard_normal(N), 60, 700); eng /= np.abs(eng).max() + 1e-9; eng *= env(T['s2'] - .3, Wd(2, 1)[1] + .4, .3, .6) * .07; sfx += np.stack([eng, np.roll(eng, 400)], 1)
for k in range(3): place(sfx, burst(.5, 2000, 6000, .2, .04), Wd(2, 0)[1] + k * .12, 1., .2 + .3 * k)   # brakes
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8)
sfx += noise_band(150, 1200, T['sea'] - .4, T['air'], .06, .5, .5, lfo=.8)    # waves
for k in range(3): place(sfx, tone(2600, 2900, .12, .07, .025), T['sea'] + .5 + k * .4, 1., .7)   # gulls
place(sfx, bell(note('D5'), 2.0, .06), T['sea'])
sfx += wind(300, 2500, T['air'] - .3, T['s3'], .05)
place(sfx, bell(note('A4'), 2.0, .07), T['air'] + .1)
# 3: the tap: water running thinner, drips; then the river and footsteps
water = fft_filter(rng.standard_normal(N), 1500, 8000); water /= np.abs(water).max() + 1e-9
water *= env(T['s3'] - .2, Wd(3, 3)[1] + .4, .2, 1.2) * .05 * (1 + .4 * np.sin(2 * np.pi * 7 * t)); sfx += np.stack([water, np.roll(water, 300)], 1)
for k in range(5): place(sfx, tone(1800, 900, .07, .04, .05), Wd(3, 3)[1] + .6 + k * .62)
place(sfx, tone(300, 80, .8, .5, .1), Wd(3, 0)[1] + .3)                          # the pump winds down
mus += pad(['F2', 'C3', 'Ab3', 'Eb4'], T['s3'] - .2, T['river'] + .3, .06, .8, .8, bright=4)
mus += pad(['G2', 'D3', 'Bb3', 'F4'], T['river'] - .3, T['s4'] + .3, .06, .6, .8)
sfx += noise_band(400, 3000, T['river'] - .3, T['s4'] + .2, .035, .4, .4, lfo=.6)
for k in range(5): place(sfx, burst(.06, 150, 900, .02, .06), T['river'] + .3 + k * .45, 1., .6)
# 4: the shop: rustling, tins, a ticking clock for the days
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['s4'] - .2, T['s5'] + .3, .065, .6, .8, bright=4)
for k in range(10): place(sfx, burst(.04, 1500, 6000, .015, .07), T['s4'] + .3 + k * .33 + rr.random() * .1, 1., rr.random())
for k in range(9): place(sfx, tone(1500, 1500, .03, .02, .05 if k % 3 == 0 else .025), Wd(4, 2)[1] + k * .35)
for k in range(3): place(sfx, bell(note(['C5', 'Bb4', 'G4'][k]), 1.2, .06), Wd(4, 2)[1] + k * 1.05)
# 5: the danger: a low hit, wind over the field, a dead machine
place(sfx, burst(.3, 40, 300, .12, .35), T['s5']); place(sfx, bell(note('Eb5'), 2.0, .07), T['s5'])
mus += pad(['Bb1', 'F2', 'C#3', 'Ab3'], T['s5'] - .2, T['s6'] + .3, .07, .6, .8, bright=4)
sfx += wind(800, 5000, T['s5'], T['s6'] + .2, .035, rate=.5)
for k in range(10): place(sfx, tone(900, 900, .06, .04, .03), Wd(5, 2)[1] + k * .06, 1., .1 + k * .08)
# 6: the hospital: a monitor beep that stops; a low drone
for k in range(4): place(sfx, tone(1000, 1000, .1, .08, .05), T['s6'] + k * .55)
place(sfx, tone(1000, 1000, .9, .7, .04), Wd(6, 2)[1] - .15); place(sfx, tone(140, 50, 1.0, .7, .12), Wd(6, 2)[1])
mus += pad(['A1', 'E2', 'C3', 'F3'], T['s6'] - .2, T['s7'] + .3, .065, .6, .8, bright=4)
# 7: hooves and cart wheels, then a field: birds, a plough in the soil
mus += pad(['D2', 'A2', 'F#3', 'A3', 'D4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
for k in range(9): place(sfx, burst(.05, 300, 1500, .02, .09), T['s7'] + k * .26, 1., .4 + .03 * k)
for k in range(9): f0 = 2400 + rr.random() * 1500; place(sfx, tone(f0, f0 * 1.25, .1, .06, .03), T['plough'] + .2 + k * .32, 1., rr.random())
sfx += noise_band(200, 1500, T['plough'], T['s8'], .025, .4, .4, lfo=.7)
# 8: one billion, then eight: a rising count of ticks and notes
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s8'] - .2, Wd(8, 11)[1], .065, .8, .8)
place(sfx, bell(note('A5'), 2.2, .08), Wd(8, 5)[1])
mus += pad(['D2', 'A2', 'F3', 'C4', 'E4'], Wd(8, 11)[1] - .3, T['s9'] + .3, .07, .6, .8, bright=4)
for k in range(8): place(sfx, bell(note(['C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5', 'C6'][k]), .6, .04), Wd(8, 12)[1] + k * .16, 1., .2 + .08 * k)
place(sfx, tone(110, 55, 1.4, 1.0, .15), Wd(8, 16)[1] + .2)
# 9: the surprise: a hit; the savanna: wind, stone strikes in rhythm; the timeline notes
place(sfx, whoosh(.8, .25), T['s9'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(9, 0)[1]); place(sfx, bell(note('E5'), 2.4, .1), Wd(9, 0)[1])
mus += pad(['E2', 'B2', 'G3', 'B3', 'E4'], T['s9'] - .2, T['s10'] + .3, .07, .8, .8)
sfx += wind(250, 2000, T['s9'], T['s10'] + .2, .035)
t0s = T['s9'] - .2
for k in range(12):
    at = t0s + k * .8 + .8 * .58
    if at < T['s10'] - .3: place(sfx, burst(.06, 1200, 7000, .012, .16), at, 1., .45); place(sfx, tone(2400, 1800, .05, .02, .04), at)
for k in range(5): place(sfx, bell(note(['E5', 'G5', 'B5', 'D6', 'E6'][k]), 1.4, .05), Wd(9, 11)[1] + k * .35, 1., .8 - .15 * k)
# 10: the end
mus += pad(['C3', 'G3', 'C4', 'E4', 'G4'], T['s10'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('C5'), 0), (note('G5'), .35), (note('C6'), .7))):
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
