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
T = dict(s1=S0(1), s2=S0(2), s3=S0(3), s4=S0(4), s5=S0(5), s6=S0(6), s7=S0(7), s8=S0(8), s9=S0(9), cta=Wd(9, 7)[1], bus=Wd(0, 16)[1], cafe=Wd(0, 19)[1])
rr = np.random.default_rng(6)
def eng(start, end, amp, f0=55):
    e = (np.sin(2 * np.pi * f0 * t + 3 * np.sin(2 * np.pi * 7 * t)) + .5 * np.sin(2 * np.pi * 2 * f0 * t)) * env(start, end, .3, .5) * amp * (1 + .3 * np.sin(2 * np.pi * .7 * t)); return np.stack([e, e], 1)
# 0: game music: a driving synth beat, an engine, street noise
bpm = 112; beat = 60 / bpm
mus += pad(['A1', 'E2', 'A2', 'C3', 'E3'], 0, T['s1'] + .3, .07, .2, .6, bright=6)
for k in range(int(T['s1'] / beat)):
    place(sfx, tone(110, 45, .25, .12, .22), k * beat); place(sfx, burst(.05, 5000, 12000, .015, .05), k * beat + beat / 2, 1., .6)
    if k % 4 == 2: place(sfx, burst(.12, 800, 5000, .04, .1), k * beat)
sfx += eng(0, T['bus'], .03)
sfx += noise_band(300, 3000, 0, T['s1'], .015, .4, .4, lfo=.6)
place(sfx, whoosh(.6, .18), T['bus'] - .3); place(sfx, whoosh(.6, .18), T['cafe'] - .3)
# 1: the release date: a stinger
place(sfx, bell(note('E5'), 2.0, .09), Wd(1, 3)[1]); place(sfx, tone(220, 90, .6, .4, .1), Wd(1, 11)[1])
mus += pad(['D2', 'A2', 'F3', 'C4'], T['s1'] - .2, T['s2'] + .3, .06, .6, .8)
# 2: storage: a filling bar, an error buzz
for k in range(14): place(sfx, tone(600 + 40 * k, 600 + 40 * k, .04, .03, .03), Wd(2, 1)[1] + k * .14)
for k in range(2): place(sfx, tone(180, 180, .18, .14, .1), Wd(2, 12)[1] + k * .22)
mus += pad(['C2', 'G2', 'Eb3', 'Bb3'], T['s2'] - .2, T['s3'] + .3, .06, .6, .8, bright=4)
# 3: the chips: electric hum and rising tones
sfx += np.stack([np.sin(2 * np.pi * 120 * t) * env(T['s3'] - .2, T['s4'], .3, .4) * .02] * 2, 1)
place(sfx, tone(300, 900, .8, .6, .06), Wd(3, 5)[1]); place(sfx, tone(300, 450, .5, .4, .05), Wd(3, 9)[1])
mus += pad(['F2', 'C3', 'A3', 'E4'], T['s3'] - .2, T['s4'] + .3, .06, .6, .8)
# 4: heat: a fizzing rise, the beat slows down
sfx += noise_band(3000, 9000, Wd(4, 3)[1], T['s5'], .02, 1.0, .4)
for k in range(10): place(sfx, tone(110, 45, .25, .12, .14), T['s4'] + .2 + k * beat * (1 + .12 * k))
mus += pad(['Bb1', 'F2', 'C#3', 'Ab3'], T['s4'] - .2, T['s5'] + .3, .065, .6, .8, bright=4)
# 5: battery: a ticking clock and a falling tone
for k in range(20): place(sfx, tone(1500, 1500, .03, .02, .04), Wd(5, 9)[1] + k * .1)
place(sfx, tone(800, 120, 1.6, 1.0, .08), Wd(5, 12)[1])
mus += pad(['A1', 'E2', 'C3', 'G3'], T['s5'] - .2, T['s6'] + .3, .06, .6, .8, bright=4)
# 6: the network: data chirps that turn into a jam
for k in range(24): f0 = 900 + rr.random() * 1600; place(sfx, tone(f0, f0 * 1.1, .05, .03, .03), T['s6'] + k * .17, 1., rr.random())
sfx += noise_band(200, 2000, Wd(6, 4)[1], T['s7'], .03, .5, .4, lfo=.9)
mus += pad(['D2', 'A2', 'F3', 'C4', 'E4'], T['s6'] - .2, T['s7'] + .3, .065, .6, .8, bright=4)
# 7: the cloud: a bright airy chord, servers humming
mus += pad(['G2', 'D3', 'B3', 'D4', 'G4'], T['s7'] - .2, T['s8'] + .3, .07, .8, .8)
sfx += noise_band(80, 600, Wd(7, 5)[1], T['s8'], .02, .4, .4)
for k in range(6): place(sfx, bell(note(['G5', 'B5', 'D6', 'G6', 'D6', 'B5'][k]), .8, .04), Wd(7, 10)[1] + k * .2, 1., .3 + .08 * k)
# 8: the twist: a hit and the beat comes back
place(sfx, whoosh(.8, .25), T['s8'] - .35); place(sfx, burst(.3, 40, 300, .12, .4), Wd(8, 0)[1]); place(sfx, bell(note('E5'), 2.4, .1), Wd(8, 0)[1])
mus += pad(['E2', 'B2', 'G3', 'B3', 'E4'], T['s8'] - .2, T['s9'] + .3, .07, .8, .8)
for k in range(int((T['s9'] - Wd(8, 3)[1]) / beat)): place(sfx, tone(110, 45, .25, .12, .15), Wd(8, 3)[1] + k * beat)
# 9: the end
mus += pad(['A2', 'E3', 'A3', 'C#4', 'E4'], T['s9'] - .1, TOTAL, .07, .8, 1.2)
for k, (f, at) in enumerate(((note('A4'), 0), (note('E5'), .35), (note('A5'), .7))):
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
