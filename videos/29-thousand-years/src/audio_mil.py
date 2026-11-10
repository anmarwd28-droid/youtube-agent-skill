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
T = dict(s1=S0(1), k=Wd(1, 9)[1], s2=S0(2), s3=S0(3), en=Wd(3, 4)[1], s4=S0(4), s5=S0(5), s6=S0(6), third=Wd(6, 16)[1], s7=S0(7), cta=S0(8))
sfx += noise_band(80, 1200, 0, T['s1'] + .4, .05, .2, .5, lfo=.4)
for k in range(12): place(sfx, tone(900 + k * 60, 900 + k * 60, .05, .03, .05), .2 + k * .12)
mus += pad(['D3', 'A3', 'D4', 'F#4'], 0, T['s2'] + .3, .07, .5, .9)
place(sfx, whoosh(.8, .25), T['k']); place(sfx, bell(note('D5'), 2., .09), T['k'] + .9)
mus += pad(['B2', 'F#3', 'D4'], T['s2'] - .2, T['s3'] + .3, .06, .8, .8, bright=5)
for at in np.arange(T['s2'], T['s3'], 1 / 1.17): place(sfx, tone(70, 45, .16, .08, .4), at); place(sfx, tone(60, 40, .14, .07, .28), at + .19)
mus += pad(['G2', 'D3', 'B3'], T['s3'] - .2, T['s4'] + .3, .06, .8, .8, bright=5)
for at in np.arange(T['en'], T['s4'] - .3, .3): place(sfx, burst(.12, 1500, 6000, .05, .07), at)
mus += pad(['D3', 'A3', 'F#4', 'A4'], T['s4'] - .2, T['s5'] + .3, .065, .8, .8)
for k in range(30): place(sfx, bell(note(['D5', 'F#5', 'A5', 'B5'][k % 4]), .5, .03), Wd(4, 1)[1] + k * .075, 1., .2 + .6 * (k % 5) / 4)
mus += pad(['D2', 'A2', 'F#3'], T['s5'] - .2, T['s6'] + .3, .06, .8, .8, bright=4)
place(sfx, tone(200, 600, 3., 2., .07), Wd(5, 4)[1])
mus += pad(['E2', 'B2', 'G3'], T['s6'] - .2, T['s7'] + .3, .055, .8, .8, bright=4)
for k in range(6): place(sfx, tone(300 - k * 25, 120, .3, .15, .12), Wd(6, 6)[1] + k * .5)
place(sfx, bell(note('E5'), 2., .09), T['third'])
mus += pad(['A2', 'E3', 'C#4', 'B4'], T['s7'] - .2, T['cta'] + .3, .06, .8, .8)
sfx += noise_band(60, 500, T['s7'], T['cta'], .12, .6, .6, lfo=.6)
for at in np.arange(T['s7'] + .5, T['cta'], .9): place(sfx, tone(500, 900, .12, .06, .03), at, 1., rng.uniform(.2, .8))
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
