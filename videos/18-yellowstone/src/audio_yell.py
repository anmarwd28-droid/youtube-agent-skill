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
T = dict(cut=S0(1), lc=S0(2), boom=Wd(3, 1)[1], ash=S0(4), glass=S0(5), veil=S0(6), win=S0(7), tam=S0(8), good=S0(9), sci=S0(10), cta=Wd(10, 4)[1])
# 0: the park at peace – wind in the pines, birds, a geyser hissing; then a low tremor
sfx += noise_band(150, 1800, 0, T['cut'] + .4, .05, .3, .5, lfo=.5)
for at in np.arange(.3, T['cut'] - .6, .55): place(sfx, tone(2600 + rng.uniform(0, 1200), 3600 + rng.uniform(0, 900), .09, .05, .05), at + rng.uniform(0, .25), 1., rng.uniform(.2, .8))
sfx += noise_band(1500, 7000, .8, 2.8, .09, .4, .6)
sfx += noise_band(25, 140, 1.9, T['cut'] + .3, .35, .5, .3)
# 1–2: under the ground – dark pads and a slow pulse
mus += pad(['D2', 'A2', 'F3'], T['cut'] - .2, T['boom'] - .3, .055, 1.0, .6, bright=4)
for k in range(int((T['boom'] - T['cut']) / 1.6)): place(sfx, tone(55, 40, .6, .25, .25), T['cut'] + .4 + k * 1.6)
sfx += noise_band(30, 200, T['lc'] + 3.3, T['lc'] + 7.0, .25, .3, .6)
# 3: the eruption – a huge boom, then a roaring column with crackling lightning
place(sfx, burst(4.5, 18, 160, 1.4, 1.0), T['boom'] - .05); place(sfx, burst(1.2, 100, 1200, .35, .5), T['boom'])
sfx += noise_band(30, 500, T['boom'] + .3, T['ash'] + .4, .3, .4, .8, lfo=.4)
for at in (T['boom'] + 2.2, T['boom'] + 4.1, T['boom'] + 5.6): place(sfx, burst(.5, 1500, 9000, .08, .3), at, 1., rng.uniform(.3, .7)); place(sfx, burst(1.5, 30, 300, .5, .4), at + .05)
mus += pad(['D2', 'A2', 'D3', 'F3'], T['boom'] + .5, T['glass'] + .3, .06, 1.5, .8, bright=5)
# 4–5: ash spreading and falling – a soft hiss and patter; jet engines winding down
sfx += noise_band(2000, 9000, T['ash'], T['veil'], .04, .8, .8, lfo=.6)
for at in np.arange(T['glass'], T['veil'], .05): place(sfx, burst(.02, 3000, 9000, .008, .03), at + rng.uniform(0, .04), 1., rng.uniform(.2, .8))
place(sfx, tone(900, 180, 2.4, 1.2, .12), T['glass'] + 2.1, 1., .4)
# 6–7: the veil and the cold – airy pads, then wind
mus += pad(['Bb2', 'F3', 'D4'], T['veil'] - .2, T['tam'] + .4, .05, 1.0, .8, bright=4)
sfx += noise_band(200, 1400, T['win'], T['tam'] + .3, .07, .6, .6, lfo=.7)
# 8: 1816 – a music-box tune in the snow
for k, nm in enumerate(['A5', 'F5', 'D5', 'E5', 'C5', 'A4']): place(sfx, bell(note(nm), 1.8, .07), T['tam'] + 1.6 + k * .9, 1., .3 + .08 * k)
mus += pad(['A2', 'E3', 'C4'], T['tam'], T['good'] + .3, .045, .8, .8, bright=4)
# 9–10: the good news – a warm major chord; bells at the end
mus += pad(['F2', 'C3', 'A3', 'F4'], T['good'], T['sci'] + .4, .06, .6, .8)
for at in np.arange(T['sci'] + .3, T['cta'], .5): place(sfx, tone(1800, 1800, .05, .02, .05), at, 1., .7)
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['sci'], TOTAL, .07, .8, 1.2)
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
