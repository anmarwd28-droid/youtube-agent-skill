"""Music bed and sound effects for the long video (no samples). Everything is synthesized per segment, so 9 minutes stay fast.
usage: python3 -I audio_sunl.py <pylib> <timing.json> <total_seconds> <out.wav>   (chap_times.json sits next to timing.json)"""
import sys, json, wave, os
sys.path.insert(0, sys.argv[1])
import numpy as np

TM = json.load(open(sys.argv[2], encoding="utf-8")); TOTAL = float(sys.argv[3]); OUT = sys.argv[4]
CH = json.load(open(os.path.join(os.path.dirname(sys.argv[2]), "chap_times.json"), encoding="utf-8"))
SR = 44100; N = int(TOTAL * SR) + SR
rng = np.random.default_rng(7)
mus = np.zeros((N, 2)); sfx = np.zeros((N, 2))
S0 = lambda i: TM[i]["start"]; E0 = lambda i: TM[i]["end"]; Wd = lambda i, j: TM[i]["words"][j][1]
NAMES = {'C': -9, 'C#': -8, 'D': -7, 'Eb': -6, 'E': -5, 'F': -4, 'F#': -3, 'G': -2, 'Ab': -1, 'A': 0, 'Bb': 1, 'B': 2}
def note(f): n, o = f[:-1], int(f[-1]); return 440 * 2 ** ((NAMES[n] + (o - 4) * 12) / 12)
def seg(start, end): i0 = max(0, int(start * SR)); i1 = min(N, int(end * SR)); return i0, i1, np.arange(i0, i1) / SR
def pad(chord, start, end, amp=.06, a=1.2, r=1.4, bright=5):
    i0, i1, tt = seg(start, end); e = np.clip((tt - start) / a, 0, 1) * np.clip((end - tt) / r, 0, 1); Lc = np.zeros(len(tt)); Rc = np.zeros(len(tt))
    for k, nm in enumerate(chord):
        f = note(nm)
        for d, pan in ((-.11, .25), (0, .5), (.12, .75)):
            ff = f * 2 ** (d / 12); w = sum(np.sin(2 * np.pi * ff * h * tt + k + h) / h ** 1.6 for h in range(1, bright)); w *= 1 + .15 * np.sin(2 * np.pi * .13 * tt + k)
            Lc += w * (1 - pan); Rc += w * pan
    g = e * amp / len(chord); mus[i0:i1, 0] += Lc * g; mus[i0:i1, 1] += Rc * g
def fft_filter(x, lo, hi): X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); X[(f < lo) | (f > hi)] = 0; return np.fft.irfft(X, len(x))
def noise_band(lo, hi, start, end, amp, a=.5, r=.8, lfo=0.):
    i0, i1, tt = seg(start, end); n = fft_filter(rng.standard_normal(len(tt)), lo, hi); n /= np.abs(n).max() + 1e-9
    e = np.clip((tt - start) / a, 0, 1) * np.clip((end - tt) / r, 0, 1) * amp * (1 + lfo * np.sin(2 * np.pi * .23 * tt + 1) * np.sin(2 * np.pi * .071 * tt))
    sfx[i0:i1, 0] += n * e; sfx[i0:i1, 1] += np.roll(n, 300) * e
def place(sig, at, gain=1., pan=.5):
    i = int(max(0, at) * SR); sig = sig[: max(0, N - i)]; sfx[i:i + len(sig), 0] += sig * gain * (1 - pan); sfx[i:i + len(sig), 1] += sig * gain * pan
def tone(f0, f1, dur, decay, amp=1.): tt = np.arange(int(dur * SR)) / SR; f = f0 * (f1 / f0) ** (tt / dur); return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / decay) * amp
def burst(dur, lo, hi, decay, amp=1.): n = fft_filter(rng.standard_normal(int(dur * SR) + 2048), lo, hi)[: int(dur * SR)]; tt = np.arange(len(n)) / SR; return n / (np.abs(n).max() + 1e-9) * np.exp(-tt / decay) * amp
def whoosh(dur, amp=1.):
    n = rng.standard_normal(int(dur * SR)); tt = np.arange(len(n)) / SR; out = np.zeros(len(n))
    for k, (lo, hi) in enumerate([(200, 500), (400, 900), (800, 1800), (1500, 3500), (3000, 7000)]): b = fft_filter(n, lo, hi); c = (k + .5) / 5 * dur; out += b * np.exp(-((tt - c) / (dur * .22)) ** 2)
    return out / (np.abs(out).max() + 1e-9) * amp
def bell(f, dur=2.5, amp=.3): tt = np.arange(int(dur * SR)) / SR; return sum(np.sin(2 * np.pi * f * m * tt) * np.exp(-tt / (dur * .35 / m ** .5)) * a for m, a in ((1, 1), (2.76, .45), (5.4, .22), (8.9, .1))) * amp

Dm = ['D2', 'A2', 'F3']; Bb = ['Bb2', 'F3', 'D4']; Gm = ['G2', 'D3', 'Bb3']; A = ['A2', 'E3', 'C#4']; F = ['F2', 'C3', 'A3']; Am = ['A2', 'E3', 'C4']; E = ['E2', 'B2', 'Ab3']
Cm = ['C2', 'G2', 'Eb3']; Ab = ['Ab2', 'Eb3', 'C4']; Fm = ['F2', 'C3', 'Ab3']; G = ['G2', 'D3', 'B3']; Em = ['E2', 'B2', 'G3']; C = ['C2', 'G2', 'E3']; B = ['B2', 'F#3', 'Eb4']
Eb = ['Eb2', 'Bb2', 'G3']; D = ['D3', 'A3', 'F#4']; C3 = ['C3', 'G3', 'E4']
PROG = [[Dm, Bb, Gm], [Dm, F, Gm, A], [Am, F, Dm, E], [Dm, Bb, Gm, A], [Cm, Ab, Fm, G], [Dm, Gm, Bb, A], [Em, C, Am, B], [Dm, Gm, Bb, A], [Cm, Ab, Fm, G, Cm, Eb, Ab, Eb, Fm, Eb], [Dm, Bb, F, C3, D, G, D], [D, G, D + ['A4']]]
for c, ch in enumerate(CH):
    l0 = ch["line"]; l1 = CH[c + 1]["line"] if c + 1 < len(CH) else len(TM)
    for k, i in enumerate(range(l0, l1)):
        st = (ch["start"] - 2.2 if k == 0 and c else S0(i) - .3); en = (S0(i + 1) + .6 if i + 1 < len(TM) else TOTAL)
        pad(PROG[c][k % len(PROG[c])], st, en, .06 if c < 10 else .07, 1.0, 1.5, bright=4 if c in (4, 6, 8) else 5)
    if c:  # chapter card: whoosh, low hit, bell
        t0 = ch["start"] - 2.0; place(whoosh(1.1, .3), t0, 1., .5); place(tone(110, 48, 1.6, .7, .45), t0 + .45); place(bell(note('D5'), 2.6, .12), t0 + .5, 1., .4); place(bell(note('A4'), 2.6, .08), t0 + .9, 1., .65)
# the Sun goes out; chapter 1 countdown; the lights go off
place(tone(150, 38, 2.4, .9, .7), 1.95); place(burst(1.4, 60, 3000, .45, .4), 1.95); noise_band(60, 400, 2.0, 9.0, .1, .4, 2.5, lfo=.5)
for k in range(int(Wd(7, 4) - S0(3))): place(tone(1400, 1400, .04, .015, .05), S0(3) + k, 1., .5 + .2 * (-1) ** k)
place(tone(520, 50, 1.3, .5, .6), Wd(7, 4)); place(burst(.5, 80, 1200, .2, .35), Wd(7, 4))
for k in range(3): place(tone(900 + 200 * k, 900 + 200 * k, .08, .04, .1), Wd(7, 4) + 1.4 + k * .28)
place(whoosh(1.4, .3), Wd(8, 3), 1., .7); place(whoosh(.9, .2), S0(5) + .4, 1., .3)
# chapter 2: the Moon and the planets go dark, the big sky
place(tone(400, 120, .9, .4, .25), Wd(10, 3)); place(tone(300, 90, 1.1, .5, .25), Wd(11, 21)); place(bell(note('E5'), 3., .1), Wd(14, 6)); place(bell(note('A5'), 3., .08), Wd(14, 8)); noise_band(300, 1200, S0(13), S0(14), .05, .8, .8, lfo=.9)
# chapters 3-5: night animals, wind dying, snow and ice
for k in range(4): place(tone(700, 520, .3, .2, .07), Wd(17, 8) + k * .5, 1., .3)
noise_band(200, 1400, S0(19), S0(20), .09, .5, 3.5, lfo=.6); noise_band(200, 1500, S0(22), S0(23), .1, .6, .8, lfo=.8); noise_band(250, 2500, S0(24), S0(27) - 2.4, .07, .8, 1., lfo=.7)
for k in range(5): place(burst(.12, 1500, 7000, .05, .22), Wd(25, 3) + k * .22, 1., .6)
noise_band(120, 900, CH[5]["start"] - 2, S0(28), .08, .8, 1., lfo=.8)
for k in range(6): place(burst(.25, 300, 2500, .1, .16), Wd(27, 10) + k * .4, 1., .2 + .1 * k)
place(tone(180, 70, 1.2, .5, .3), Wd(32, 0))
# chapter 6: blizzard, under the ice, the shelter hum, sonar
noise_band(200, 2600, S0(34) - .2, S0(35), .2, .4, .7, lfo=.9); noise_band(40, 220, S0(35), S0(36), .2, .6, .8); noise_band(50, 160, S0(36), CH[7]["start"] - 2, .09, .8, 1.)
for k in range(4): place(tone(1250, 1180, .9, .35, .12), Wd(37, 9) + .3 + k * .85, 1., .35)
place(tone(140, 60, .9, .35, .5), Wd(38, 4))
# chapter 7: dead wind on the surface, the shelter hum
noise_band(150, 1200, CH[7]["start"] - 2, S0(41), .09, .8, 1., lfo=.8); noise_band(50, 160, S0(41), S0(44), .09, .8, 1.); noise_band(150, 900, S0(44), CH[8]["start"] - 2, .07, .8, 1.5, lfo=.7)
# chapter 8: liquid air rain, silence, cosmic rays, the deep
for k in range(40): place(burst(.03, 2500, 9000, .012, .1), Wd(47, 8) + rng.random() * 3.2, 1., rng.random())
noise_band(150, 900, S0(48), Wd(49, 4), .07, .5, 2.5)
for k in range(14): place(burst(.02, 3000, 10000, .008, .28), S0(50) + rng.random() * 4, 1., rng.random())
noise_band(35, 200, Wd(51, 7), CH[9]["start"] - 2, .22, 1.5, 1.2)
for k in range(46): f = 300 + rng.random() * 700; place(tone(f, f * 1.7, .12, .06, .05), S0(52) + rng.random() * 30, 1., rng.random())
place(bell(note('Eb5'), 3., .1), Wd(53, 0)); place(tone(900, 900, .5, .2, .07), S0(54) + 1.2)
# chapter 9 and the ending
place(whoosh(1.6, .25), S0(58) + .6, 1., .8); noise_band(35, 200, S0(60), Wd(61, 11), .16, .6, 1.)
for k, nm in enumerate(('D5', 'F#5', 'A5')): place(bell(note(nm), 3., .11), Wd(60, 5) + k * .22, 1., .3 + .2 * k)
place(tone(70, 46, 3.5, 1.6, .5), Wd(62, 5)); place(tone(60, 140, 2.2, 1.2, .35), CH[10]["start"] - 1.2)
for k, nm in enumerate(('D5', 'A5', 'D6')): place(bell(note(nm), 2.6, .12), Wd(65, 4) + .1 + k * .35, 1., .35 + .15 * k)
# reverb on the music, then the mix
ir_len = int(2.2 * SR); ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR / .6); ir /= np.sqrt((ir ** 2).sum())
def conv(x): n = len(x) + ir_len; return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)[: len(x)]
wet = np.stack([conv(mus[:, 0]), conv(np.roll(mus[:, 1], 211))], 1)
mix = (mus * .7 + wet * .45 + sfx)[: int(TOTAL * SR)]
mix *= np.clip((TOTAL - np.arange(len(mix)) / SR) / .8, 0, 1)[:, None]; mix /= np.abs(mix).max() + 1e-9; mix *= .8
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok', len(mix) / SR)
