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
T = dict(fz0=Wd(0, 6)[1] + .1, normal=S0(1), freeze=S0(2), fz2=Wd(2, 2)[1] + .2, dark=S0(3), blk=Wd(3, 11)[1], sil=S0(4), hb=Wd(4, 9)[1] - .2, wall=S0(5), push=Wd(5, 7)[1], breath=S0(6), back=Wd(7, 1)[1] + .1, resume=S0(7), last=S0(8), cta=S0(9))
# hook: street hum, then time stops (a falling sweep and a soft "freeze" shimmer)
sfx += noise_band(120, 1800, 0, T['fz0'], .07, .2, .15, lfo=.3)
place(sfx, tone(500, 70, 1.4, 1.0, .35), T['fz0'] - .05); place(sfx, burst(1.2, 2000, 8000, .8, .12), T['fz0'])
mus += pad(['A2', 'E3', 'C4'], T['fz0'], T['normal'] + .3, .05, .5, .8, bright=3)
# an ordinary 5 seconds: clock ticks
for k in range(6): place(sfx, burst(.05, 2500, 6000, .02, .35), T['normal'] + .3 + k * 1.3, 1., .45 + .1 * (k % 2))
mus += pad(['D2', 'A2', 'F3', 'C4'], T['normal'] - .1, T['freeze'] + .3, .055, .8, .8, bright=4)
# rain and street, cut dead at the freeze
sfx += noise_band(900, 9000, T['freeze'], T['fz2'], .12, .4, .08)
place(sfx, tone(600, 60, 1.6, 1.2, .4), T['fz2'] - .05); place(sfx, burst(1.5, 2500, 9000, .9, .1), T['fz2'])
mus += pad(['C2', 'G2', 'Eb3'], T['fz2'], T['dark'] + .3, .05, .8, .8, bright=3)
# light stops: a thin high tone fading into darkness
mus += pad(['C2', 'G2', 'Bb2'], T['dark'] - .1, T['sil'] + .2, .05, .8, 1.2, bright=2)
place(sfx, tone(1800, 1600, 3.0, 2.5, .05), T['dark'] + 1.2)
place(sfx, tone(200, 40, 2.5, 2.0, .25), T['blk'])
# silence: almost nothing, then your heartbeat (lub-dub ~72 bpm)
k = 0
while T['hb'] + k / 1.2 < T['wall'] - .2:
    at = T['hb'] + k / 1.2; place(sfx, tone(70, 45, .18, .1, .7), at); place(sfx, tone(60, 40, .16, .09, .45), at + .2); k += 1
# frozen air wall: a low strained rumble when you push
sfx += noise_band(30, 160, T['push'] - .2, T['breath'] + .1, .18, .6, .4, lfo=.8)
mus += pad(['F2', 'C3', 'Ab3'], T['wall'] - .1, T['breath'] + .3, .05, .8, .8, bright=3)
# held breath
mus += pad(['Bb1', 'F2', 'D3'], T['breath'] - .1, T['resume'] + .3, .05, .8, .8, bright=3)
for k in range(5): place(sfx, tone(70, 45, .18, .1, .45), T['breath'] + .4 + k * .85)
# time returns: rising sweep, rain back
place(sfx, tone(80, 700, 1.0, 1.0, .25), T['back'] - .9); place(sfx, whoosh(1.2, .4), T['back'] - .5)
sfx += noise_band(900, 9000, T['back'], T['last'] + .2, .11, .3, .5)
mus += pad(['D3', 'A3', 'F#4'], T['back'], T['last'] + .3, .055, .6, .8)
# the darkest moment: five slow ticks
mus += pad(['A1', 'E2', 'C3'], T['last'] - .1, T['cta'] + .3, .05, .8, .8, bright=2)
for k in range(5): place(sfx, burst(.06, 1800, 5000, .025, .45), T['last'] + .3 + k * .8, 1., .5)
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
