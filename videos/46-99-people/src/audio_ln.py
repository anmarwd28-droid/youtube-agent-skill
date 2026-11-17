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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), s10=S0(10), cta=Wd(10, 5)[1], alone=Wd(1, 14)[1], know=Wd(6, 8)[1])
rr = np.random.default_rng(6)
def wind(lo, hi, start, end, amp, a=.6, r=.8, rate=.31):   # gusty band noise
    n = fft_filter(rng.standard_normal(N), lo, hi); n /= np.abs(n).max() + 1e-9
    g = .55 + .45 * np.sin(2 * np.pi * rate * t + 1.3) * np.sin(2 * np.pi * rate * .37 * t + .4)
    e = env(start, end, a, r) * amp * g; return np.stack([n * e, np.roll(n, 700) * e], 1)

# 0: the night Earth: a warm drone; the city lights die (a falling hum, clicks), one clear bell on "99"
mus += pad(['D2', 'A2', 'D3', 'F3'], 0, T['s1'] + .3, .07, .3, .8, bright=4)
place(sfx, tone(240, 55, 1.5, 1.1, .16), .45)
for k in range(10): place(sfx, burst(.03, 1200, 6000, .012, .07), .5 + k * .13 + rr.random() * .04, 1., rr.random())
place(sfx, bell(note('D5'), 2.6, .12), 1.95); place(sfx, bell(note('A5'), 2.0, .06), 2.1)
# 1: scattered over the land: an open chord, soft pings for the points, a turn to the lonely land
mus += pad(['D2', 'A2', 'F3', 'C4', 'E4'], T['s1'] - .2, T['alone'] + .3, .065, .8, .8, bright=4)
for k in range(8): place(sfx, bell(note(['A5', 'D6', 'E6', 'A5', 'F6', 'D6', 'E6', 'A6'][k]), .8, .025), T['s1'] + .3 + k * .22, 1., rr.random())
place(sfx, whoosh(1.0, .12), Wd(1, 4)[1] - .2); place(sfx, bell(note('E5'), 2.0, .08), Wd(1, 9)[1])
# 1b: alone: wind over an empty plain, far birds
mus += pad(['A2', 'E3', 'B3', 'E4'], T['alone'] - .3, T['s2'] + .3, .055, .6, .8)
sfx += wind(200, 1800, T['alone'] - .3, T['s2'] + .2, .08)
for k in range(4): place(sfx, tone(2600 + 300 * (k % 2), 3300, .09, .05, .02), T['alone'] + .6 + k * .5, 1., .7)
# 2: the power stops: a mains hum that dies, clicks as the blocks go dark, then silence and a low note
mus += pad(['Bb1', 'F2', 'D3', 'A3'], T['s2'] - .2, T['s3'] + .3, .065, .6, .8, bright=4)
hum_end = Wd(2, 5)[1] + .3
hum = (np.sin(2 * np.pi * 100 * t) + .5 * np.sin(2 * np.pi * 200 * t) + .25 * np.sin(2 * np.pi * 300 * t)) * env(T['s2'] - .2, hum_end, .3, 1.2) * .035
sfx += np.stack([hum, hum], 1)
for k in range(5): place(sfx, burst(.05, 700, 4000, .018, .14), Wd(2, 2)[1] - .15 + k * .44, 1., .2 + .15 * k); place(sfx, tone(180, 60, .35, .2, .1), Wd(2, 2)[1] - .15 + k * .44)
place(sfx, tone(90, 40, 1.6, 1.0, .22), Wd(2, 5)[1]); place(sfx, bell(note('F5'), 1.8, .06), Wd(2, 7)[1])
for k in range(3): place(sfx, tone(880, 880, .12, .08, .035), Wd(2, 8)[1] + k * .2)
# 3: the shop: flies over the spoiled fruit, then trolley wheels and tins
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8)
fly = np.sin(2 * np.pi * 210 * t + 6 * np.sin(2 * np.pi * 9 * t)) * env(Wd(3, 1)[1], Wd(3, 4)[1] + .4, .5, .6) * .018 * (1 + .6 * np.sin(2 * np.pi * 1.7 * t))
sfx += np.stack([fly, np.roll(fly, 500)], 1)
sfx += noise_band(2500, 6000, Wd(3, 4)[1] - .8, Wd(3, 6)[1] + .2, .02, .2, .3, lfo=.9)
for k in range(5): place(sfx, bell(note(['C6', 'E6', 'G6', 'E6', 'C7'][k]), .5, .035), Wd(3, 5)[1] + k * .16, 1., rr.random())
place(sfx, burst(.04, 1500, 6000, .015, .1), Wd(3, 7)[1] + .2)
# 4: the plant: a deep turbine drone that winds down; water bubbling; an alarm pulse on "radiation"
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['s4'] - .2, T['s5'] + .3, .07, .8, .8, bright=4)
dr = (np.sin(2 * np.pi * 62 * t) + .4 * np.sin(2 * np.pi * 124 * t)) * env(T['s4'] - .2, Wd(4, 6)[1] + .6, .5, 1.6) * .07
sfx += np.stack([dr, dr], 1); sfx += noise_band(300, 2500, T['s4'] - .2, Wd(4, 6)[1] + .4, .035, .5, 1.4)
place(sfx, tone(300, 70, 1.6, 1.2, .1), Wd(4, 4)[1])
for k in range(22): f0 = 300 + rr.random() * 600; place(sfx, tone(f0, f0 * 1.8, .08, .05, .05 * min(1, .3 + k / 12)), Wd(4, 9)[1] + k * .17 + rr.random() * .05, 1., rr.random())
sfx += noise_band(3000, 9000, Wd(4, 11)[1], T['s5'], .025, .8, .5)
for k in range(4): place(sfx, tone(740, 740, .16, .12, .06), Wd(4, 14)[1] + .1 + k * .32); place(sfx, tone(590, 590, .16, .12, .05), Wd(4, 14)[1] + .26 + k * .32)
# 5: years later: a soft wind in leaves, birdsong, hooves
mus += pad(['G2', 'D3', 'B3', 'E4', 'A4'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8)
sfx += wind(1500, 7000, T['s5'] - .2, T['s6'] + .2, .035, rate=.5)
for k in range(11): f0 = 2400 + rr.random() * 1500; place(sfx, tone(f0, f0 * (1.15 + .3 * rr.random()), .1, .06, .03), T['s5'] + .3 + k * .4 + rr.random() * .15, 1., rr.random())
for k in range(8): place(sfx, burst(.05, 150, 900, .02, .09), Wd(5, 5)[1] - .3 + k * .21, 1., .75 - k * .05)
# 6: the languages: a murmur of voices; pops as they vanish; then a hollow note
mus += pad(['A2', 'E3', 'G3', 'C4'], T['s6'] - .2, T['know'] + .3, .055, .8, .8)
murm = fft_filter(rng.standard_normal(N), 250, 900); murm /= np.abs(murm).max() + 1e-9
murm *= env(T['s6'] - .2, Wd(6, 7)[1] + .4, .3, 2.2) * .05 * (1 + .7 * np.sin(2 * np.pi * 3.1 * t) * np.sin(2 * np.pi * 1.3 * t + 1)); sfx += np.stack([murm, np.roll(murm, 900)], 1)
for k in range(18): f0 = 700 + rr.random() * 900; place(sfx, tone(f0, f0 * .5, .07, .04, .06), T['s6'] + .55 + k * (Wd(6, 7)[1] + .5 - T['s6'] - .55) / 17, 1., rr.random())
place(sfx, bell(note('E5'), 2.0, .07), Wd(6, 4)[1])
# 6b: the dead factory: a metal clank, wind through broken windows
mus += pad(['F2', 'C3', 'Ab3', 'Eb4'], T['know'] - .3, T['s7'] + .3, .06, .6, .8, bright=4)
sfx += wind(300, 2200, T['know'] - .3, T['s7'] + .2, .06)
place(sfx, bell(note('C4') * 1.03, 1.8, .1), Wd(6, 11)[1]); place(sfx, burst(.2, 500, 3000, .07, .12), Wd(6, 11)[1])
for k in range(6): place(sfx, tone(900 - 80 * k, 500, .1, .06, .035), Wd(6, 13)[1] + .35 + k * .12, 1., .3 + .08 * k)
# 7: the village: a warm major chord, a crackling fire, water, a hoe in the soil
mus += pad(['D2', 'A2', 'F#3', 'A3', 'D4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
for k in range(40): place(sfx, burst(.02, 1500, 7000, .008, .05 + .05 * rr.random()), T['s7'] + rr.random() * (T['s8'] - T['s7']), 1., .65)
sfx += noise_band(600, 3500, T['s7'], T['s8'], .02, .6, .6, lfo=.6)
for k in range(5): place(sfx, burst(.08, 200, 1200, .03, .08), T['s7'] + .5 + k * .78, 1., .2)
place(sfx, bell(note('A5'), 2.2, .07), Wd(7, 3)[1])
# 8: the question; then the family tree: ticks for each generation, a dark turn
mus += pad(['B1', 'F#2', 'D3', 'A3'], T['s8'] - .2, Wd(8, 7)[1], .06, .8, .8, bright=4)
for k in range(12): place(sfx, tone(1200 + 60 * k, 1200 + 60 * k, .05, .03, .03), T['s8'] + k * .07, 1., k / 11)
place(sfx, bell(note('F#5'), 2.0, .08), Wd(8, 6)[1])
mus += pad(['Bb1', 'F2', 'C#3', 'Ab3'], Wd(8, 7)[1] - .3, T['s9'] + .3, .07, .6, .8, bright=4)
for at in (Wd(8, 7)[1], Wd(8, 8)[1], Wd(8, 9)[1]): place(sfx, tone(660, 660, .1, .07, .05), at)
place(sfx, tone(140, 80, 1.2, .8, .2), Wd(8, 10)[1]); place(sfx, burst(.25, 60, 400, .1, .25), Wd(8, 12)[1])
for k in range(5): place(sfx, burst(.04, 1800, 6000, .015, .06), Wd(8, 12)[1] + .3 + k * .25, 1., .15)
# 9: the surprise: a hit, then the ship: a steady engine and a wide hopeful chord
place(sfx, whoosh(.8, .25), T['s9'] - .35); place(sfx, bell(note('E5'), 2.4, .1), Wd(9, 0)[1]); place(sfx, burst(.3, 40, 300, .12, .4), Wd(9, 0)[1])
mus += pad(['E2', 'B2', 'G#3'.replace('G#', 'Ab'), 'B3', 'E4'], T['s9'] - .2, Wd(9, 14)[1] + .3, .07, .8, .8)
eng = (np.sin(2 * np.pi * 48 * t) + .5 * np.sin(2 * np.pi * 96 * t + 1)) * env(T['s9'], T['s10'], 1.0, 1.0) * .045 * (1 + .1 * np.sin(2 * np.pi * 5 * t))
sfx += np.stack([eng, eng], 1); sfx += noise_band(150, 900, T['s9'], T['s10'], .03, 1.0, 1.0)
place(sfx, bell(note('B5'), 2.2, .08), Wd(9, 4)[1]); place(sfx, bell(note('E6'), 2.2, .06), Wd(9, 8)[1]); place(sfx, bell(note('Ab5'), 2.2, .07), Wd(9, 11)[1])
mus += pad(['A2', 'E3', 'C#4', 'E4', 'A4'], Wd(9, 14)[1] - .2, T['s10'] + .3, .065, .5, .8)
for k in range(7): place(sfx, bell(note(['A5', 'C#6', 'E6', 'A5', 'C#6', 'E6', 'A6'][k]), .7, .035), Wd(9, 15)[1] + k * .13, 1., .2 + .09 * k)
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
