"""Synthesize the music bed and sound effects for the Short (no samples, no copyright).
usage: python3 -I audio.py <pylib> <timing.json> <total_seconds> <out.wav>"""
import sys, json, wave
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]
SR = 44100; N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)
L = lambda i: TM[i]; Wd = lambda i, j: TM[i]["words"][j]
T = dict(gone=Wd(0, 6)[1] - .1, picnic=L(1)["start"], wilt=L(2)["start"], orch=L(3)["start"], market=L(4)["start"], corn=L(5)["start"], wind=Wd(5, 6)[1], pond=L(6)["start"], fall=Wd(7, 2)[1], floor=L(8)["start"], pile=L(9)["start"], ant=L(10)["start"], end=L(11)["start"])
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


def buzz(dur, f=220, amp=.06):
    tt = np.arange(int(dur * SR)) / SR; fm = f * (1 + .03 * np.sin(2 * np.pi * 7 * tt)); ph = 2 * np.pi * np.cumsum(fm) / SR
    w = sum(np.sin(ph * h) / h for h in range(1, 8)); e = np.clip(tt / .2, 0, 1) * np.clip((dur - tt) / .3, 0, 1); return w * e * amp
def chirp(f0, f1, dur, amp=.06): return tone(f0, f1, dur, dur * .6, amp)
# ---------------- music
mus += pad(['G3', 'B3', 'D4', 'G4'], 0, T['gone'] + .3, .05, .6, .4)
mus += pad(['E3', 'G3', 'B3'], T['gone'], T['wilt'] + .6, .05, .3, .8)
mus += pad(['D2', 'A2', 'F3'], T['wilt'], T['orch'] + .6, .065, .4, .8, bright=4)
place(sfx, tone(60, 30, 2.5, .8, .6), T['wilt'] + .3); sfx += noise_band(200, 1200, T['wilt'], T['orch'], .02, 1., .5, lfo=.8)
mus += pad(['C3', 'G3', 'E4', 'G4'], T['orch'], T['market'] + .6, .055, .6, .8)
mus += pad(['A2', 'E3', 'C4'], T['market'], T['corn'] + .6, .055, .6, .8)
mus += pad(['F3', 'A3', 'C4', 'F4'], T['corn'], T['pond'] + .6, .055, .6, .8)
mus += pad(['D3', 'F3', 'A3'], T['pond'], T['floor'] + .6, .06, .6, .8)
mus += pad(['Bb2', 'F3', 'D4'], T['floor'], T['ant'] + .6, .06, .6, .8)
mus += pad(['G3', 'B3', 'D4', 'G4', 'B4'], T['ant'], TOTAL, .07, 1.0, 1.2)
# ---------------- effects
place(sfx, buzz(T['gone'] + .2, 230, .05), 0, 1., .65); place(sfx, buzz(T['gone'], 180, .03), .2, 1., .35)
for at in (.4, 1.3, 2.1): place(sfx, chirp(3200, 4200, .12, .04), at, 1., .3); place(sfx, chirp(3800, 3000, .1, .03), at + .15, 1., .3)
for k in range(10): place(sfx, bell(note('B6') * (1 + .02 * k), .9, .015), T['gone'] + k * .06, 1., .3 + .05 * k)
sfx += noise_band(300, 2500, T['picnic'], T['wilt'] + .2, .006, .5, .5, lfo=.5)
place(sfx, buzz(Wd(1, 3)[1] - T['picnic'] + .2, 520, .03), T['picnic'], 1., .55)
for at in np.arange(T['orch'], T['market'] - .3, 2.2): place(sfx, buzz(1.8, rng.uniform(200, 260), .035), at, 1., rng.uniform(.3, .7))
for at in np.arange(T['orch'] + .5, T['market'], 1.3): place(sfx, chirp(3000, 4300, .1, .03), at, 1., rng.uniform(.2, .8))
sfx += noise_band(250, 1800, T['market'], T['corn'] + .2, .012, .5, .5, lfo=.8)
for at in np.arange(Wd(3, 3)[1], T['corn'] - .5, .7): place(sfx, tone(1800, 1800, .06, .03, .05), at, 1., .6)
sfx += noise_band(200, 1400, T['corn'] - .2, T['pond'] + .2, .02 + 0, .6, .5, lfo=1.2)
sfx += noise_band(300, 1600, T['wind'], T['pond'], .035, .5, .5, lfo=1.)
for at in np.arange(T['pond'] + .3, T['floor'], .8):
    place(sfx, tone(140, 110, .12, .05, .2), at, 1., .6); place(sfx, tone(150, 115, .1, .04, .14), at + .13, 1., .6)
for at in np.arange(T['pond'], T['floor'], .9):
    for j in range(3): place(sfx, tone(4300, 4200, .03, .012, .03), at + j * .06, 1., rng.uniform(.2, .8))
for i in range(4): place(sfx, burst(.06, 500, 3000, .02, .35), T['fall'] + i * .35 + .4, 1., .3 + i * .15); place(sfx, tone(220, 160, .2, .06, .2), T['fall'] + i * .35 + .4)
for at in np.sort(rng.uniform(T['floor'], T['pile'] + 4, 40)): place(sfx, burst(.05, 1500, 7000, .015, rng.uniform(.04, .1)), at, 1., rng.uniform(.2, .8))
for k, (f, at) in enumerate(((note('G5'), 0), (note('D6'), .3), (note('G6'), .6))):
    place(sfx, bell(f, 2.2, .1), T['ant'] + .3 + at, 1., .35 + .15 * k)
for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))):
    place(sfx, bell(f, 2.4, .12), T['end'] + .1 + at, 1., .35 + .15 * k)
place(sfx, buzz(TOTAL - T['end'], 240, .025), T['end'], 1., .5)
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
