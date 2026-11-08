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
T = dict(off=Wd(0, 3)[1], fl=S0(1), spin=S0(2), tan=S0(3), lift=S0(4), sea=Wd(4, 8)[1], air=S0(5), sky=Wd(5, 18)[1], rock=S0(6), spring=Wd(6, 8)[1], shake=Wd(6, 11)[1],
         iss=S0(7), on=Wd(8, 2)[1], drop=Wd(8, 4)[1], wind=Wd(8, 11)[1], end=S0(9), cta=Wd(9, 11)[1])
def click(at): place(sfx, burst(.04, 2000, 8000, .01, .5), at); place(sfx, tone(1400, 900, .08, .03, .3), at)
# 0: a city street – traffic hum, birds; the gravity switch clicks off, a soft whoosh and a low falling tone
sfx += noise_band(80, 900, 0, T['off'] + 1.0, .06, .3, .6, lfo=.4)
for at in np.arange(.2, T['off'], .45): place(sfx, tone(2800 + rng.uniform(0, 1000), 3800 + rng.uniform(0, 800), .08, .04, .04), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
click(T['off'] - .05); place(sfx, whoosh(1.6, .35), T['off']); place(sfx, tone(220, 70, 1.8, .9, .25), T['off'] + .1)
# 1–4: weightless – a floating, slightly eerie pad and soft air
mus += pad(['D3', 'A3', 'E4', 'F#4'], T['off'] + .3, T['air'] + .3, .055, 1.2, .8, bright=4)
sfx += noise_band(300, 2500, T['fl'], T['spin'] + .3, .035, .6, .6, lfo=.6)
place(sfx, whoosh(1.4, .3), T['spin'] - .3); place(sfx, whoosh(1.2, .25), T['tan'] - .2)
for k in range(4): place(sfx, bell(note(['A5', 'E5', 'F#5', 'D5'][k]), 1.6, .05), T['lift'] + .2 + k * .55, 1., .3 + .12 * k)
sfx += noise_band(150, 1200, T['sea'], T['air'] + .2, .08, .5, .5, lfo=.8)      # the sea
for at in np.arange(T['sea'] + .3, T['air'], .22): place(sfx, tone(500 + rng.uniform(0, 600), 1200 + rng.uniform(0, 600), .07, .03, .05), at + rng.uniform(0, .1), 1., rng.uniform(.2, .8))  # bloops
# 5: air pressure, then the sky rising – a rising wind that gets louder and higher
mus += pad(['B2', 'F#3', 'D4'], T['air'] - .2, T['rock'] + .3, .05, 1.0, .8, bright=4)
ramp_up = np.clip((t - T['sky']) / max(.1, T['rock'] - T['sky']), 0, 1)
for lo, hi in ((300, 1200), (800, 3000), (2000, 6000)):
    n = noise_band(lo, hi, T['sky'] - .2, T['rock'] + .2, .12, .5, .4); sfx += n * ramp_up[:, None] ** 1.5
# 6: deep rock – a low groan, then the shaking
sfx += noise_band(25, 160, T['rock'], T['iss'] + .1, .25, .6, .5, lfo=.5)
place(sfx, burst(2.0, 20, 200, .8, .6), T['spring'] - .05)
sfx += noise_band(20, 300, T['shake'], T['iss'] + .1, .45, .2, .5, lfo=.9)
# 7: the space station – a quiet space pad and soft telemetry beeps
mus += pad(['E3', 'B3', 'G4', 'D5'], T['iss'] - .2, T['on'] + .1, .05, 1.0, .5)
for at in np.arange(T['iss'] + .5, T['on'] - .3, 1.1): place(sfx, tone(1760, 1760, .06, .03, .05), at, 1., .7)
# 8: gravity back – click, everything lands with a thud, then a howling wind
click(T['on'] - .05); place(sfx, tone(80, 220, .5, .4, .2), T['on'])
place(sfx, burst(2.2, 18, 180, .6, 1.0), T['drop'] + .2); place(sfx, burst(.6, 200, 2500, .15, .5), T['drop'] + .22)
for lo, hi in ((150, 900), (600, 2500)): sfx += noise_band(lo, hi, T['wind'] - .2, T['end'] + .6, .16, .6, .8, lfo=.9)
mus += pad(['D2', 'A2', 'F3'], T['on'], T['end'] + .3, .055, .6, .8, bright=5)
# 9: the end – a warm open chord and bells
mus += pad(['D3', 'A3', 'D4', 'F#4', 'A4'], T['end'], TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('D5'), 0), (note('A5'), .35), (note('D6'), .7))): place(sfx, bell(f, 2.4, .12), T['cta'] + .1 + at, 1., .35 + .15 * k)
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
