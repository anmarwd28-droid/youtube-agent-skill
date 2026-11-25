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
T = {f"s{i}": S0(i) for i in range(1, 9)}; T['cta'] = Wd(8, 7)[1]
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
def beep(at, amp=.05, f=880): place(sfx, tone(f, f, .12, .08, amp), at, 1., .55)
def buzzW(at, amp=.05): place(sfx, tone(180, 160, .35, .3, amp), at, 1., .5)
def sizz(start, end, amp=.012): return noise_band(3000, 9000, start, end, amp, .2, .6, lfo=5.)
def splash(at, amp=.05, pan=.5): place(sfx, burst(.35, 400, 6000, .12, amp), at, 1., pan)
# 0: hook: a street, a gold flash, two new arms appear
mus += pad(['D2', 'A2', 'F3', 'C4'], 0, T['s1'] + .3, .05, .4, .8, bright=3); sfx += street(0, T['s1'] + .2, .014); steps(.1, 1.2, .4, .03)
shimmer(Wd(0, 4)[1] - .2, .035, 6); place(sfx, whoosh(.7, .04), Wd(0, 4)[1] - .5, 1., .5); chime(Wd(0, 7)[1], .03, .6, 'B5')
# 1: kitchen sizzle and chops, bricks, a desk: pen scratch, crunch, phone buzz
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s1'] - .2, T['s2'] + .3, .055, .8, .8)
sfx += sizz(T['s1'], Wd(1, 4)[1], .014)
for k in range(6): place(sfx, burst(.05, 600, 4000, .015, .05), T['s1'] + .3 + k * .22, 1., .6)
for k in range(4): clatter(Wd(1, 5)[1] + k * .45, .035)
scratch(Wd(1, 8)[1], Wd(1, 9)[1] + .3, .018); place(sfx, burst(.12, 800, 5000, .04, .05), Wd(1, 9)[1] + .2, 1., .4); buzzW(Wd(1, 11)[1], .04)
# 2: the brain: a hum, the motor strip lights up
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s2'] - .2, T['s3'] + .3, .055, 1.0, .8); sfx += scanhum(T['s2'], T['s3'], .01)
shimmer(Wd(2, 7)[1], .03, 6); chime(Wd(2, 9)[1], .03, .6, 'E6')
# 3: weight, heart beating faster, food
mus += pad(['D2', 'A2', 'F3', 'A3'], T['s3'] - .2, T['s4'] + .3, .05, .8, .8)
thud(Wd(3, 7)[1], .14); heart(Wd(3, 9)[1], Wd(3, 12)[1], .1, .62); place(sfx, burst(.1, 600, 4000, .03, .04), Wd(3, 13)[1] + .1, 1., .5)
# 4: a clothes shop: hangers, a zip, a seat belt click
mus += pad(['G2', 'D3', 'Bb3', 'D4'], T['s4'] - .2, T['s5'] + .3, .055, .8, .8)
for w in (4, 5): clank(Wd(4, w)[1], .02, .4)
place(sfx, burst(.08, 1500, 6000, .02, .06), Wd(4, 8)[1] + .3, 1., .6); place(sfx, burst(.05, 1500, 6000, .015, .05), Wd(4, 8)[1] + .4, 1., .6)
# 5: the pool: water, strokes, a whistle of victory
mus += pad(['C2', 'G2', 'Eb3', 'G3'], T['s5'] - .2, T['s6'] + .3, .055, .8, .8); sfx += noise_band(300, 3000, T['s5'], T['s6'] + .2, .018, .4, .5, lfo=2.)
for k in range(10): splash(T['s5'] + .4 + k * .45, .04, .3 + .04 * k)
chime(Wd(5, 9)[1], .04, .5, 'E6')
# 6: the twist: deep time, a shore 370 million years ago
mus += pad(['E2', 'B2', 'G3', 'B3'], T['s6'] - .2, T['s7'] + .3, .06, .8, .8); beat(Wd(6, 0)[1], .3)
sfx += noise_band(80, 900, T['s6'], T['s7'], .02, .8, .8, lfo=1.)
for w in (8, 10, 11): tick(Wd(6, w)[1], .04, 2000)
place(sfx, whoosh(1.4, .04), Wd(6, 15)[1] - .4, 1., .5); rewind(Wd(6, 17)[1], .8, .03); drum(Wd(6, 19)[1], .16)
# 7: wings flap, then insects
mus += pad(['A1', 'E2', 'C3', 'E3'], T['s7'] - .2, T['s8'] + .3, .055, .8, .8)
for k in range(5): place(sfx, whoosh(.3, .03), Wd(7, 2)[1] + k * .35, 1., .3 + .1 * k)
sfx += noise_band(2000, 6000, Wd(7, 7)[1], T['s8'], .006, .2, .3, lfo=3.)
chime(Wd(7, 9)[1], .03, .5, 'B5')
# 8: the end
mus += pad(['D2', 'A2', 'D3', 'F#3', 'A3'], T['s8'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('D4'), 0), (note('A4'), .35), (note('D5'), .7))):
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
