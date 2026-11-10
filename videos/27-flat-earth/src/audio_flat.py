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
T = dict(flat=Wd(0, 3)[1], round=S0(1), ball=Wd(1, 12)[1], pull=S0(2), arr=Wd(2, 7)[1], slope=S0(3), sea=S0(4), day=S0(5), rise=Wd(5, 8)[1], ship=S0(6), edge=S0(7), ecl=S0(8), cta=S0(9))
# hook: the globe flattens – a low groan and a whoosh
mus += pad(['A2', 'E3', 'C4'], 0, T['round'] + .3, .055, .6, .8, bright=3)
place(sfx, tone(220, 70, 1.8, 1.4, .3), T['flat'] - .1); place(sfx, whoosh(1.4, .35), T['flat'])
# gravity folds it back into a ball: a deep rising rumble
mus += pad(['D2', 'A2', 'F3'], T['round'] - .1, T['pull'] + .3, .055, .8, .8, bright=3)
sfx += noise_band(30, 180, T['ball'] - 1.4, T['ball'] + .8, .2, 1.0, .5, lfo=.6); place(sfx, tone(60, 140, 1.6, 1.2, .3), T['ball'] - 1.0)
# pull to the centre: soft swishes as the arrows appear
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['pull'] - .1, T['slope'] + .3, .055, .8, .8)
for k in range(6): place(sfx, whoosh(.5, .12), T['arr'] + k * .12, 1., .3 + .08 * k)
# the slope: street ambience, a ball rolling
sfx += noise_band(150, 1800, T['slope'], T['sea'] + .1, .06, .3, .3, lfo=.3)
sfx += noise_band(80, 400, T['slope'] + 3, T['sea'], .08, .5, .5, lfo=3.)
mus += pad(['F2', 'C3', 'A3'], T['slope'] - .1, T['sea'] + .3, .05, .8, .8, bright=4)
# the sea slides to the middle: water rush
sfx += noise_band(200, 3000, T['sea'], T['day'] + .1, .12, 1.0, .8, lfo=.4)
mus += pad(['Bb1', 'F2', 'D3'], T['sea'] - .1, T['day'] + .3, .055, .8, .8, bright=3)
# night → the whole disc lights at once: a bright swell
mus += pad(['G2', 'D3', 'Bb3'], T['day'] - .1, T['rise'] + .2, .045, .8, .4, bright=2)
mus += pad(['D3', 'A3', 'F#4', 'A4'], T['rise'], T['ship'] + .3, .06, 1.2, .8, bright=6)
for k, f in enumerate(('D5', 'F#5', 'A5', 'D6')): place(sfx, bell(note(f), 2.0, .07), T['rise'] + .3 + k * .18, 1., .3 + .12 * k)
# sea, gulls-free: waves and a distant ship horn
sfx += noise_band(150, 2500, T['ship'], T['edge'] + .1, .1, .5, .6, lfo=.25)
place(sfx, tone(110, 105, 1.8, 1.6, .2), T['ship'] + 1.2)
mus += pad(['E2', 'B2', 'G3'], T['ship'] - .1, T['edge'] + .3, .05, .8, .8, bright=3)
# the edge: no air – near silence, a deep drone
mus += pad(['C2', 'G2', 'C3'], T['edge'] - .1, T['ecl'] + .3, .05, 1.2, .8, bright=2)
place(sfx, tone(90, 45, 4.0, 3.0, .18), T['edge'] + .6)
# eclipse: a slow dark chord
mus += pad(['A1', 'E2', 'C3', 'G3'], T['ecl'] - .1, T['cta'] + .3, .055, .8, .8, bright=3)
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['cta'], TOTAL, .07, .8, 1.2)
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
