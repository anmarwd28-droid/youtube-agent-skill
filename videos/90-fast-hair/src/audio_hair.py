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
def clank(at, amp=.05, pan=.5):  # armour plates touching
    place(sfx, bell(note('E6') * (1 + .03 * rr.random()), .5, amp), at, 1., pan); place(sfx, burst(.06, 2000, 7000, .02, amp * .6), at, 1., pan)
def drum(at, amp=.25): place(sfx, tone(110, 55, .35, .16, amp), at); place(sfx, burst(.2, 60, 600, .08, amp * .5), at)
def twang(at, amp=.08): place(sfx, pluck(note('A2'), .5, amp), at); place(sfx, whoosh(.35, amp * .5), at + .02)
def pop(at, amp=.12, pan=.5): place(sfx, burst(.5, 60, 2500, .12, amp), at, 1., pan); place(sfx, burst(1.2, 3000, 9000, .5, amp * .25), at + .05, 1., pan)
def launch(at, amp=.03, pan=.5): place(sfx, tone(900, 2600, .5, .6, amp), at, 1., pan)
def chime(at, amp=.05, pan=.5, n='E6'): place(sfx, bell(note(n) * (1 + .02 * rr.random()), 1.2, amp), at, 1., pan)
def scratch(start, end, amp=.02):
    k = 0
    while start + k * .09 < end: place(sfx, burst(.06, 2500, 7000, .02, amp * (.6 + .4 * rr.random())), start + k * .09, 1., .45); k += 1
def street(start, end, amp=.012): return noise_band(80, 900, start, end, amp, .6, .6, lfo=.4)
def hum(start, end, f, amp): return drone(f, start, end, amp)
def steps(start, end, every, amp=.05):
    k = 0
    while start + k * every < end: place(sfx, burst(.05, 150, 1800, .015, amp), start + k * every, 1., .4 + .2 * (k % 2)); k += 1
def rewind(at, dur, amp=.06):
    tt = np.arange(int(dur * SR)) / SR; f = 900 * (300 / 900) ** (tt / dur); w = np.sin(2 * np.pi * np.cumsum(f) / SR) * (1 + .5 * np.sin(2 * np.pi * 18 * tt)); place(sfx, w * np.exp(-tt / dur) * amp, at)
    for k in range(int(dur / .08)): tick(at + k * .08, .025, 3000)
def kids(start, end, amp=.012): return noise_band(500, 3500, start, end, amp, .5, .5, lfo=1.2)
def buzz(start, end, amp=.02, f=520):  # a mosquito's whine: about 500 wing beats a second, wavering, panning
    i0, i1 = int(start * SR), min(int(end * SR), N); tt = t[i0:i1] - start
    if i1 <= i0: return
    fm = f * (1 + .03 * np.sin(tt * 2.3) + .01 * np.sin(tt * 11)); ph = 2 * np.pi * np.cumsum(fm) / SR
    sig = (np.sin(ph) + .5 * np.sin(2 * ph) + .25 * np.sin(3 * ph)) * (.6 + .4 * np.sin(tt * 1.7)) * env(start, end, .25, .15)[i0:i1] * amp
    pan = .5 + .4 * np.sin(tt * 1.3); sfx[i0:i1, 0] += sig * (1 - pan); sfx[i0:i1, 1] += sig * pan
def squish(at, amp=.04, pan=.5): place(sfx, tone(380, 160, .12, .05, amp), at, 1., pan); place(sfx, burst(.08, 400, 2500, .03, amp * .5), at, 1., pan)
def glide(at, dur=.9, amp=.05):  # the grip goes: a falling slippery whistle with a soft hiss
    place(sfx, tone(1400, 300, dur, dur * .6, amp), at); place(sfx, burst(dur, 1500, 6000, dur * .5, amp * .5), at, 1., .5)
def hiss(start, end, amp=.012): return noise_band(2000, 7000, start, end, amp, .3, .4, lfo=.8)
def creak(at, amp=.04): place(sfx, tone(220, 160, .5, .3, amp), at, 1., .4); place(sfx, tone(330, 250, .4, .25, amp * .6), at + .15, 1., .6)
def clatter(at, amp=.08):
    for k in range(5): place(sfx, burst(.08, 300, 3000, .03, amp * (1 - k * .15)), at + k * .09 + rr.random() * .03, 1., .3 + .1 * k)
def screech(at, dur=1.2, amp=.04): place(sfx, tone(2200, 1600, dur, dur * .7, amp), at, 1., .55); place(sfx, burst(dur, 2500, 8000, dur * .6, amp * .6), at, 1., .45)
def sizzle(start, end, amp=.014): return noise_band(3000, 9000, start, end, amp, .2, .8, lfo=6.)
def scanhum(start, end, amp=.012): return drone(110, start, end, amp) + noise_band(900, 2400, start, end, amp * .5, .2, .3, lfo=4.)
def flop(at, amp=.08, pan=.5): place(sfx, tone(180, 70, .35, .14, amp), at, 1., pan); place(sfx, burst(.25, 100, 700, .1, amp * .5), at + .03, 1., pan)
def shimmer(at, amp=.03, n=6):
    for k in range(n): chime(at + k * .07, amp, .3 + .07 * k, ['E6', 'B5', 'Ab5', 'E6', 'B5', 'E5'][k % 6])
def heart(start, end, amp=.08, every=.85):
    x = start
    while x < end: place(sfx, tone(70, 45, .12, .06, amp), x); place(sfx, tone(65, 42, .1, .05, amp * .7), x + .22); x += every
def roar(at, dur=1.6, amp=.12): place(sfx, tone(150, 70, dur, dur * .8, amp), at, 1., .5); place(sfx, burst(dur, 80, 1400, dur * .7, amp * .7), at, 1., .5); place(sfx, tone(220, 110, dur * .8, dur * .6, amp * .4), at + .05, 1., .5)
def stomp(at, amp=.2): place(sfx, tone(70, 30, .5, .25, amp), at); place(sfx, burst(.3, 30, 300, .15, amp * .6), at)
def boom(at, amp=.3): place(sfx, tone(60, 25, 3., 1.6, amp), at); place(sfx, burst(2.5, 30, 2000, 1.2, amp * .7), at)
def crunch(at, amp=.12):
    for k in range(5): place(sfx, burst(.06, 1500, 7000, .02, amp * (1 - k * .15)), at + k * .045, 1., .4 + .05 * k)
def cluck(at, amp=.05):
    for k in range(3): place(sfx, tone(900, 600, .08, .04, amp), at + k * .14, 1., .6)
#def uw(start, end, amp=.03): return noise_band(30, 260, start, end, amp, .5, .6, lfo=.8) + noise_band(300, 900, start, end, amp * .25, .5, .6, lfo=1.5)
def bubbles(start, end, n, amp=.03):
    for k in range(n):
        at = start + rr.random() * (end - start - .2); f0 = 500 + rr.random() * 900; place(sfx, tone(f0, f0 * 1.8, .06, .03, amp), at, 1., .3 + .4 * rr.random())
def waves(start, end, amp=.03): return noise_band(150, 2200, start, end, amp, .8, .8, lfo=1.6)
def song(at, amp=.04):  # a humpback-like moan
    place(sfx, tone(260, 520, 1.1, .9, amp), at, 1., .4); place(sfx, tone(520, 230, 1.3, 1.0, amp * .8), at + 1.0, 1., .6)
def gull(at, amp=.02):
    for q in range(3): place(sfx, tone(1700, 1100, .16, .1, amp), at + q * .2, 1., .7)
def uw(start, end, amp=.03): return noise_band(30, 260, start, end, amp, .5, .6, lfo=.8) + noise_band(300, 900, start, end, amp * .25, .5, .6, lfo=1.5)
def bubbles(start, end, n, amp=.03):
    for k in range(n):
        at = start + rr.random() * (end - start - .2); f0 = 500 + rr.random() * 900; place(sfx, tone(f0, f0 * 1.8, .06, .03, amp), at, 1., .3 + .4 * rr.random())
def waves(start, end, amp=.03): return noise_band(150, 2200, start, end, amp, .8, .8, lfo=1.6)
def song(at, amp=.04):  # a humpback-like moan
    place(sfx, tone(260, 520, 1.1, .9, amp), at, 1., .4); place(sfx, tone(520, 230, 1.3, 1.0, amp * .8), at + 1.0, 1., .6)
def gull(at, amp=.02):
    for q in range(3): place(sfx, tone(1700, 1100, .16, .1, amp), at + q * .2, 1., .7)
def cashreg(at, amp=.05, pan=.5):  # a register "ka-ching": a click, then two bright bells
    place(sfx, burst(.05, 1500, 6000, .015, amp * .8), at, 1., pan); place(sfx, bell(note('E6'), .9, amp), at + .06, 1., pan); place(sfx, bell(note('B6'), .9, amp * .7), at + .12, 1., pan)
def notif(at, amp=.04, pan=.5): place(sfx, bell(note('A5'), .6, amp), at, 1., pan); place(sfx, bell(note('E6'), .7, amp), at + .1, 1., pan)
def flutter(start, end, amp=.02):  # paper notes in the wind
    k = 0
    while start + k * .06 < end: place(sfx, burst(.04, 1200, 5000, .012, amp * (.5 + .5 * rr.random())), start + k * .06 + rr.random() * .03, 1., .3 + .4 * rr.random()); k += 1
T = {f"s{i}": S0(i) for i in range(1, 10)}; T["cta"] = Wd(9, 10)[1]; T["tw"] = Wd(8, 7)[1] - .25
def snip(at, amp=.05, pan=.5): place(sfx, burst(.05, 2500, 8000, .015, amp), at, 1., pan); place(sfx, tone(3200, 2400, .05, .02, amp * .5), at + .01, 1., pan)
def swish(at, dur=.8, amp=.03): place(sfx, whoosh(dur, amp), at)
def creakR(at, amp=.04): place(sfx, tone(160, 120, .8, .5, amp), at, 1., .4); place(sfx, tone(240, 190, .6, .4, amp * .5), at + .2, 1., .6)
def trumpet(at, amp=.05):
    tt = np.arange(int(1.1 * SR)) / SR; f = 300 + 180 * np.sin(np.pi * np.clip(tt / .9, 0, 1)); ph = 2 * np.pi * np.cumsum(f) / SR
    w = sum(np.sin(ph * h) / h ** .9 for h in range(1, 9)) * np.sin(np.pi * np.clip(tt / 1.1, 0, 1)) ** .6; place(sfx, fft_filter(w, 200, 4000) * amp, at, 1., .35)
# 0: hook: the hair shoots out in the street
mus += pad(['D3', 'A3', 'F4', 'C5'], 0, T['s1'] + .3, .05, .6, .8, bright=4); sfx += street(0, T['s1'], .01)
place(sfx, tone(300, 1600, 2.6, 1.8, .03), .5); swish(.6, 1.4, .04); swish(2.0, 1.0, .03); shimmer(Wd(0, 6)[1], .025, 5)
# 1: today: 1 cm a month (the follicle, magnified)
mus += pad(['A2', 'E3', 'C4', 'E4'], T['s1'] - .2, T['s2'] + .3, .055, 1.0, .8, bright=4); sfx += scanhum(T['s1'], T['s1'] + 1.0, .01)
for k in range(30): tick(Wd(1, 4)[1] - .1 + k * .1, .02, 2400)
chime(Wd(1, 9)[1], .04, .5, 'E6')
# 2: x100: 4 cm a day, the shoulders in a week
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s2'] - .2, T['s3'] + .3, .055, .8, .8, bright=4); place(sfx, tone(200, 1400, 1.2, .9, .04), Wd(2, 1)[1] - .2)
for k in range(7): tick(Wd(2, 3)[1] + k * .65, .035, 1800); swish(Wd(2, 3)[1] + k * .65, .4, .012)
chime(Wd(2, 11)[1], .04, .5, 'B5')
# 3: a month, two months: dragging the hair on the pavement
mus += pad(['C3', 'G3', 'E4', 'G4'], T['s3'] - .2, T['s4'] + .3, .055, .8, .8, bright=4); sfx += street(T['s3'], T['s4'], .012); steps(T['s3'], T['s4'], .4, .03)
sfx += noise_band(1500, 6000, Wd(3, 7)[1], T['s4'], .008, .4, .4, lfo=2.)
# 4: everyone: beards, the barber every day
mus += pad(['D3', 'A3', 'F#4', 'A4'], T['s4'] - .2, T['s5'] + .3, .055, .8, .8, bright=4); sfx += street(T['s4'], T['s5'], .012)
for k in range(16): snip(Wd(4, 6)[1] + k * .35, .035, .55)
place(sfx, burst(.6, 2500, 7000, .25, .02), Wd(4, 13)[1], 1., .6)
# 5: keratin, a third of your protein, hungry
mus += pad(['A2', 'E3', 'C4', 'E4'], T['s5'] - .2, T['s6'] + .3, .055, .8, .8, bright=3); chime(Wd(5, 3)[1], .035, .5, 'E6'); shimmer(Wd(5, 7)[1], .022, 5)
for k in range(10): tick(Wd(5, 10)[1] + k * .14, .022, 2000 + 40 * k)
place(sfx, tone(110, 70, .6, .3, .05), Wd(5, 15)[1] + .1)
# 6: the world: tens of thousands of tonnes
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8, bright=3); sfx += hum(T['s6'], T['s7'], 55, .016); swish(T['s6'] - .1, .8, .03)
for k in range(12): tick(Wd(6, 4)[1] + k * .14, .022, 1800 + 30 * k)
# 7: strength: 100 g, a braid, ten tonnes, an elephant
mus += pad(['G2', 'D3', 'Bb3', 'D4'], T['s7'] - .2, T['s8'] + .3, .055, .8, .8, bright=3); clank(Wd(7, 5)[1], .04)
creakR(Wd(7, 8)[1], .04); thud(Wd(7, 13)[1], .2); trumpet(Wd(7, 15)[1] + .1, .045)
# 8: the twist: a few years, falls, then a ten-storey building
mus += pad(['A2', 'E3', 'C4', 'E4', 'B4'], T['s8'] - .2, T['s9'] + .3, .06, 1.0, .8, bright=3); chime(Wd(8, 0)[1], .045, .5, 'E6')
place(sfx, tone(900, 300, .9, .5, .03), Wd(8, 6)[1]); swish(T['tw'], 1.2, .035); sfx += noise_band(200, 1500, Wd(8, 10)[1], Wd(8, 15)[1], .012, .5, .5, lfo=.6)
for k in range(10): tick(Wd(8, 15)[1] + k * .12, .02, 1600 + 80 * k)
# 9: the end
mus += pad(['C3', 'G3', 'C4', 'E4', 'G4'], T['s9'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('C4'), 0), (note('G4'), .35), (note('C5'), .7))):
    place(sfx, bell(f, 2.4, .12), T['cta'] + .1 + at, 1., .35 + .15 * k)
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
