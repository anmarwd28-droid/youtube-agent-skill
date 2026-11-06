"""Synthesize the music bed and sound effects for the Short (no samples, no copyright).
usage: python3 -I audio.py <pylib> <timing.json> <total_seconds> <out.wav>"""
import sys, json, wave
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]
SR = 44100; N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)
L = lambda i: TM[i]; Wd = lambda i, j: TM[i]["words"][j]
T = dict(gone=Wd(0, 9)[1] - .3, empty=L(1)["start"], sea=Wd(1, 4)[1], cat=Wd(1, 8)[1], silence=Wd(2, 4)[1], sil=L(2)["start"], fridge=L(3)["start"], produce=L(4)["start"], coral=L(5)["start"], soil=L(6)["start"], seeds=L(7)["start"], birdsgone=Wd(7, 8)[1], alone=L(8)["start"], earth=L(9)["start"], end=L(10)["start"])
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


def chirp(f0, f1, dur, amp=.06): return tone(f0, f1, dur, dur * .6, amp)
# ---------------- music (cut to silence on "silence")
mus += pad(['D3', 'A3', 'F4', 'A4'], 0, T['silence'], .055, 1.2, .08)
mus += pad(['D2', 'A2'], T['gone'], T['silence'], .04, .8, .08, bright=3)
mus += pad(['A2', 'E3', 'C4'], T['fridge'] - .3, T['coral'] + .6, .05, 1.5, .8)
mus += pad(['F2', 'C3', 'A3'], T['coral'], T['seeds'] + .6, .055, .6, .8)
mus += pad(['D2', 'A2', 'F3'], T['seeds'], T['alone'] + .6, .055, .6, .8)
mus += pad(['Bb2', 'F3', 'D4'], T['alone'], T['earth'] + .6, .05, 1.2, .8)
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['earth'], TOTAL, .07, 1.4, 1.2)
# ---------------- effects
sfx += noise_band(200, 1200, 0, T['silence'], .012, 1., .06, lfo=.6)
for at in (.4, 1.1, 1.9, 2.6): place(sfx, chirp(3200, 4300, .12, .05), at, 1., .3 + .1 * (at % 1)); place(sfx, chirp(3900, 3100, .1, .04), at + .16, 1., .4)
place(sfx, tone(90, 70, 1.5, .5, .25), .6, 1., .4)
place(sfx, whoosh(1.6, .3), T['empty'] + .2)
sfx += noise_band(60, 500, T['sea'] - .1, T['cat'], .05, .3, .2)
for at in np.arange(T['cat'], T['sil'] - .1, .7): place(sfx, tone(4300, 4200, .03, .012, .04), at, 1., .7)
place(sfx, tone(520, 700, .25, .12, .08), T['cat'] + .3, 1., .4)
sfx += noise_band(300, 900, T['sil'], T['silence'], .01, .5, .05)
place(sfx, tone(60, 60, 3.5, 1.5, .0), T['silence'])
sfx += noise_band(80, 160, T['fridge'], T['produce'] + .2, .03, .3, .4)
place(sfx, burst(.2, 200, 2000, .06, .25), T['fridge'] + .3)
for at in (Wd(3, 4)[1], Wd(3, 6)[1], Wd(3, 8)[1], Wd(3, 10)[1]): place(sfx, tone(900, 500, .25, .08, .1), at)
sfx += noise_band(300, 2000, T['produce'], T['coral'] + .2, .008, .5, .5, lfo=.8)
sfx += noise_band(50, 500, T['coral'], T['soil'] + .2, .05, .5, .5)
for at in np.sort(rng.uniform(T['coral'], T['soil'], 12)): place(sfx, tone(rng.uniform(350, 600), rng.uniform(900, 1300), .07, .03, .05), at, 1., rng.uniform(.3, .7))
sfx += noise_band(40, 200, T['soil'], T['seeds'] + .2, .05, .5, .5)
for at in np.arange(T['seeds'] + .3, T['birdsgone'], .5): place(sfx, chirp(3000, 4400, .1, .04), at, 1., rng.uniform(.3, .8))
sfx += noise_band(300, 1400, T['alone'], T['earth'] + .2, .02, 1., .8, lfo=.7)
for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))):
    place(sfx, bell(f, 2.4, .12), T['end'] + .1 + at, 1., .35 + .15 * k)
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
