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
T = dict(trip=S0(1), land=S0(2), td=S0(2) - .2 + 1.25, jump=Wd(2, 13)[1], helmet=S0(3), warn=Wd(3, 2)[1], jars=S0(3) + 2.05, faint=S0(3) + 6.0,
         cold=S0(4), sky=S0(5), sunset=Wd(5, 7)[1], storm=S0(6), globe=S0(6) + 2.3, shield=S0(7), under=S0(7) + 3.0, farm=S0(8), ice=S0(8) + 2.4,
         clock=S0(9), year=S0(9) + 2.9, end=S0(10))
# ---------------- music (spacious minor pads)
mus += pad(['A2', 'E3', 'C4'], 0, T['land'] + .6, .055, .4, .8)
mus += pad(['F2', 'C3', 'A3'], T['land'], T['helmet'] + .6, .06, .5, .8)
mus += pad(['D2', 'A2', 'F3'], T['helmet'], T['cold'] + .6, .06, .5, .8, bright=4)
mus += pad(['E2', 'B2', 'G3'], T['cold'], T['sky'] + .6, .055, .5, .8, bright=4)
mus += pad(['C3', 'G3', 'E4'], T['sky'], T['storm'] + .6, .06, .5, .8)
mus += pad(['A2', 'E3', 'C4'], T['storm'], T['shield'] + .6, .065, .5, .8, bright=4)
mus += pad(['F2', 'C3', 'A3'], T['shield'], T['farm'] + .6, .06, .5, .8)
mus += pad(['C3', 'G3', 'E4'], T['farm'], T['clock'] + .6, .06, .5, .8)
mus += pad(['G2', 'D3', 'B3'], T['clock'], T['end'] + .6, .06, .5, .8)
mus += pad(['A2', 'E3', 'A3', 'C4', 'E4'], T['end'], TOTAL, .07, .8, 1.2)
# ---------------- effects
sfx += noise_band(150, 900, 0, T['trip'] + .3, .03, .4, .5, lfo=.8)                       # thin Martian wind
place(sfx, tone(55, 38, 1.6, .7, .5), T['trip'] - .1); place(sfx, burst(1.4, 60, 900, .6, .35), T['trip'] - .1)   # departure burn
place(sfx, whoosh(2.4, .25), T['trip'] + .4)
sfx += noise_band(60, 1600, T['land'] - .2, T['td'] + .2, .09, .5, .15)                    # retro-rockets
place(sfx, tone(80, 40, .6, .2, .6), T['td']); place(sfx, burst(1.8, 200, 3000, .7, .25), T['td'])   # touchdown + dust
place(sfx, tone(500, 520, .05, .02, .2), T['td'] + .3)                                      # hatch
for k in range(4): place(sfx, tone(110, 80, .2, .06, .35), T['jump'] + .26 + .64 + k * .9, 1., .3)        # Earth landings
for k in range(2): place(sfx, tone(95, 70, .25, .08, .3), T['jump'] + .26 + 1.67 + k * 1.93, 1., .7)      # Mars landings
for k in range(3):                                                                           # breathing in the helmet
    sfx += noise_band(300, 2500, T['helmet'] - .2 + k * 1.1, T['helmet'] + .4 + k * 1.1, .05, .3, .3)
for k in range(5): place(sfx, tone(1300, 1300, .12, .06, .18), T['warn'] + k * .32, 1., .5)  # alarm beeps
for at in np.arange(T['jars'] + .2, T['faint'], .45): place(sfx, burst(.02, 3000, 9000, .006, .05), at + rng.uniform(0, .2), 1., rng.uniform(.2, .8))
for k in range(4): place(sfx, tone(60, 45, .25, .08, .55), T['faint'] + .3 + k * .75); place(sfx, tone(55, 42, .2, .07, .4), T['faint'] + .52 + k * .75)  # heartbeat
for at in np.arange(T['faint'] + 1.0, T['cold'], .133): place(sfx, tone(3000, 2900, .02, .006, .07), at, 1., .6)   # stopwatch
sfx += noise_band(250, 900, T['cold'], T['sky'] + .3, .04, .8, .6, lfo=1.)                  # cold night wind
for k, nm in enumerate(['E5', 'B5', 'E6']): place(sfx, bell(note(nm), 2.6, .08), T['sunset'] - .2 + k * .3, 1., .4 + .1 * k)
sfx += noise_band(100, 2500, T['storm'], T['shield'] + .2, .11, 2.2, .6, lfo=1.)            # storm
for at in np.arange(T['shield'] + .3, T['under'], .12): place(sfx, burst(.015, 2500, 9000, .005, .07), at + rng.uniform(0, .08), 1., rng.uniform(.2, .8))
sfx += noise_band(50, 140, T['under'], T['farm'] + .3, .05, .6, .6)                         # underground hum
for at in np.arange(T['ice'] + 1.6, T['clock'], .45): place(sfx, tone(1500, 900, .06, .02, .12), at, 1., .6)   # water drops
for at in np.arange(T['clock'] + .2, T['year'], .5): place(sfx, tone(2200, 2100, .03, .008, .1), at, 1., .4 + .2 * ((at * 2) % 2 > 1))
place(sfx, whoosh(2.6, .22), T['year'] + .2)
for k, (f, at) in enumerate(((note('A5'), 0), (note('E6'), .35), (note('A6'), .7))):
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
