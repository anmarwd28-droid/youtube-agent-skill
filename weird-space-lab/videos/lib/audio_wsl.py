"""Synthesize the music bed and sound effects for the Short (no samples, no copyright).
usage: python3 -I audio_wsl.py <pylib> <timing.json> <total_seconds> <out.wav> <events.json>"""
import sys, json, wave
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]; EV = json.load(open(sys.argv[5]))
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

# a pad per narration line (chords from events.json, cycling), soft whooshes at scene changes, and timed effects
chords = EV.get('chords', [['D3', 'A3', 'E4', 'F#4'], ['B2', 'F#3', 'D4'], ['G2', 'D3', 'B3', 'D4'], ['A2', 'E3', 'C#4', 'E4']])
for i, l in enumerate(TM):
    end = TM[i + 1]['start'] + .3 if i + 1 < len(TM) else TOTAL
    if i == len(TM) - 1: mus[:] += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], l['start'] - .2, TOTAL, .07, .8, 1.2)
    else: mus[:] += pad(chords[i % len(chords)], max(0, l['start'] - .3), end, .05, .9, .7, bright=4)
    if i > 0: place(sfx, whoosh(1.1, .18), l['start'] - .45, 1., .3 + .4 * (i % 2))
sfx += noise_band(200, 1800, 0, TOTAL, .02, 1, 1, lfo=.5)
for at in EV.get('boom', []): place(sfx, burst(2.2, 18, 180, .7, 1.0), at); place(sfx, burst(.5, 200, 2500, .12, .4), at + .02)
for at in EV.get('click', []): place(sfx, burst(.04, 2000, 8000, .01, .5), at); place(sfx, tone(1400, 900, .08, .03, .3), at)
for at in EV.get('pop', []): place(sfx, tone(600, 1400, .12, .05, .25), at, 1., .5)
for at in EV.get('whoosh', []): place(sfx, whoosh(1.6, .4), at)
for at in EV.get('drop', []): place(sfx, tone(260, 60, 1.6, .8, .3), at)
for a, b in EV.get('rumble', []): sfx[:] += noise_band(20, 220, a, b, .35, .3, .5, lfo=.8)
for a, b in EV.get('wind', []): sfx[:] += noise_band(200, 2500, a, b, .1, .5, .6, lfo=.9)
for a, b in EV.get('hiss', []): sfx[:] += noise_band(2500, 9000, a, b, .05, .3, .4, lfo=.6)
for a, b in EV.get('beeps', []):
    for at in np.arange(a, b, .9): place(sfx, tone(1760, 1760, .06, .03, .05), at, 1., .7)
for a, b in EV.get('birds', []):
    for at in np.arange(a, b, .4): place(sfx, tone(2800 + rng.uniform(0, 1000), 3800 + rng.uniform(0, 800), .08, .04, .04), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
for a, b in EV.get('buzz', []):
    tt = np.arange(N) / SR; e = env(a, b, .3, .3) * .03 * (1 + .5 * np.sin(2 * np.pi * 7 * tt)); w = np.sin(2 * np.pi * 220 * tt) + .5 * np.sin(2 * np.pi * 440 * tt + 1); sfx[:, 0] += w * e; sfx[:, 1] += w * e
last = TM[-1]; cta = [w for w in last['words'] if w[0].startswith('Tell')]
if cta:
    for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))): place(sfx, bell(f, 2.4, .12), cta[0][1] + .1 + at, 1., .35 + .15 * k)
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
print('ok')
