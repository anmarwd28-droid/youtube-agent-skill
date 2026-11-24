"""Music bed and sound effects for the Pharaohs long video (no samples). Everything is synthesized per segment, so 9 minutes stay fast.
usage: python3 -I audio_phar.py <pylib> <timing.json> <total_seconds> <out.wav>   (chap_times.json sits next to timing.json)"""
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


# a Hijaz colour (D Eb F# G A Bb C) for ancient Egypt
D = ['D2', 'A2', 'F#3']; Eb = ['Eb2', 'Bb2', 'G3']; Cm = ['C2', 'G2', 'Eb3']; Gm = ['G2', 'D3', 'Bb3']; Dm = ['D2', 'A2', 'F3']; Bb = ['Bb2', 'F3', 'D4']; F = ['F2', 'C3', 'A3']; A = ['A2', 'E3', 'C#4']; Am = ['A2', 'E3', 'C4']; C = ['C2', 'G2', 'E3']; G = ['G2', 'D3', 'B3']
PROG = [[D, Eb, D, Cm, D], [Dm, Bb, F, A], [D, Gm, Eb, D], [D, Eb, Cm, D, Gm, Eb, D], [Dm, Gm, A, Dm], [D, Gm, Cm, D], [Dm, F, Bb, A], [Gm, Eb, Cm, D], [Dm, Bb, Gm, A, D, G, D]]
for c, ch in enumerate(CH):
    l0 = ch["line"]; l1 = CH[c + 1]["line"] if c + 1 < len(CH) else len(TM)
    for k, i in enumerate(range(l0, l1)):
        st = (ch["start"] - 2.2 if k == 0 and c else max(0, S0(i) - .3)); en = (S0(i + 1) + .6 if i + 1 < len(TM) else TOTAL)
        pad(PROG[c][k % len(PROG[c])], st, en, .055, 1.0, 1.5, bright=4 if c in (7,) else 5)
    if c:  # chapter card: whoosh, low drum, bells
        t0 = ch["start"] - 2.0; place(whoosh(1.1, .3), t0, 1., .5); place(tone(110, 48, 1.6, .7, .45), t0 + .45); place(bell(note('D5'), 2.6, .12), t0 + .5, 1., .4); place(bell(note('Eb5'), 2.6, .07), t0 + .9, 1., .65)
def drum(at, amp=.35): place(tone(95, 50, .5, .16, amp), at); place(burst(.08, 200, 1500, .03, amp * .4), at)
def crackle(a, b, n, amp=.12):
    for k in range(n): place(burst(.02, 1500, 7000, .006, amp * (.5 + rng.random())), a + rng.random() * (b - a), 1., rng.random())
def chirp(at, f=3200, amp=.06):
    for q in range(3): place(tone(f, f * 1.35, .07, .03, amp), at + q * .09, 1., .3)
# intro: desert wind, the eyes open, the haulers' rhythm, Egypt on the globe, the secret
noise_band(150, 1200, 0, S0(2), .07, 1.5, 1., lfo=.8); place(whoosh(1.4, .25), .2)
for k in range(8): drum(S0(1) + k * .8, .28)
place(bell(note('D5'), 3, .12), Wd(2, 3)); place(bell(note('A5'), 3, .08), Wd(2, 4) + .2); place(whoosh(1.2, .25), S0(3) - .2)
place(tone(140, 55, 2.2, .9, .45), Wd(4, 5)); place(bell(note('Eb5'), 3, .1), Wd(4, 6))
# chapter 1: dawn birds, bread crunch, the grinding stone, an ominous end
for k in range(10): chirp(S0(5) + rng.random() * 10, 2600 + rng.random() * 1600, .05)
place(burst(.35, 800, 6000, .12, .45), Wd(10, 2)); place(burst(.25, 1200, 7000, .08, .35), Wd(10, 3))
noise_band(150, 900, S0(11), S0(12), .08, .4, .6, lfo=.9)
place(tone(120, 60, 1.8, .7, .35), S0(13))
# chapter 2: the river, the flood, Sirius, the calendar, danger, the boats, the papyrus
noise_band(300, 2200, S0(14) - 1, S0(16), .07, .8, 1., lfo=.6); noise_band(80, 600, S0(15), S0(16), .08, 1, 1.)
place(bell(note('A5'), 3.2, .12), Wd(16, 7)); place(bell(note('D6'), 3.2, .07), Wd(16, 7) + .3); place(bell(note('F#5'), 3, .08), Wd(17, 7))
for k in range(30): place(tone(1800, 1800, .03, .012, .035), Wd(18, 2) + k * (Wd(18, 20) - Wd(18, 2)) / 30, 1., .5)
place(bell(note('D5'), 2.5, .1), Wd(18, 17))
noise_band(60, 300, S0(19), S0(21), .12, .6, .8); noise_band(400, 2500, S0(19), S0(21), .05, .6, .8, lfo=.5)
place(burst(.9, 150, 3000, .3, .5), Wd(20, 7)); place(tone(90, 60, 1.4, .6, .5), Wd(20, 15)); place(burst(.6, 200, 2500, .25, .35), Wd(20, 15))
noise_band(300, 2000, S0(21), S0(22), .07, .6, .6, lfo=.7)
for k in range(5): place(burst(.18, 2000, 9000, .07, .12), S0(22) + .2 + k * .35, 1., .6)
place(whoosh(1.2, .25), S0(23) + .4); place(bell(note('A5'), 3, .1), Wd(24, 4)); place(whoosh(1.4, .25), S0(25))
# chapter 3: the pyramid
noise_band(150, 1200, S0(26), S0(27), .06, .8, .8, lfo=.8); place(tone(70, 40, 2.4, 1., .4), Wd(26, 0)); place(whoosh(1.2, .25), Wd(27, 1))
for k in range(24): place(tone(1500, 1500, .03, .012, .03), Wd(28, 1) + k * .12, 1., .5)
place(tone(110, 50, 1.2, .5, .4), Wd(28, 9)); place(bell(note('D6'), 3, .1), Wd(29, 12))
noise_band(50, 180, S0(30), S0(31), .12, .3, .6); place(burst(.15, 2000, 8000, .04, .3), S0(30) + 1.4)
place(bell(note('F#5'), 2.5, .1), Wd(31, 12)); place(bell(note('A5'), 2.5, .08), Wd(31, 13)); place(bell(note('D6'), 2.5, .07), Wd(31, 14))
crackle(S0(32), S0(33), 60, .08)
for k in range(5): place(burst(.05, 2500, 9000, .015, .2), Wd(34, 3) + k * .3, 1., .4)
place(bell(note('Eb5'), 2.5, .08), Wd(34, 16))
for k in range(int((S0(37) - S0(35)) / .8)): drum(S0(35) + k * .8, .22)
noise_band(1500, 6000, Wd(36, 6), S0(37), .06, .3, .5, lfo=.5)
place(whoosh(1.0, .25), Wd(37, 8)); place(bell(note('A5'), 3, .1), Wd(37, 16)); place(bell(note('D5'), 3, .1), S0(38))
place(tone(80, 40, 1.8, .8, .45), Wd(39, 17)); place(whoosh(1.2, .2), Wd(39, 7))
for k in range(4): place(burst(.05, 2500, 9000, .015, .35), S0(40) - .2 + .314 + k * 1.2566, 1., .5); place(tone(900, 700, .15, .06, .1), S0(40) - .2 + .314 + k * 1.2566)
place(bell(note('D6'), 3, .12), Wd(41, 8))
place(tone(200, 60, .9, .3, .55), Wd(42, 3)); place(burst(.6, 100, 2500, .2, .45), Wd(42, 3))
# chapter 4: the doctor
noise_band(60, 300, S0(43), S0(46), .07, .6, .8); place(tone(140, 70, 1.2, .5, .3), Wd(43, 3))
for k in range(6): place(burst(.12, 2000, 9000, .05, .12), S0(46) + .3 + k * .45, 1., .6)
for k in range(8): place(burst(.05, 1500, 6000, .02, .12), Wd(47, 6) + k * .35, 1., .4)
for k in range(6): place(tone(1200, 900, .12, .05, .08), Wd(48, 1) + .5 + k * .7, 1., .4)
place(bell(note('A5'), 3, .1), Wd(49, 8)); place(bell(note('D6'), 3, .12), Wd(50, 8))
noise_band(180, 260, Wd(52, 7), S0(53), .05, .3, .5, lfo=.9)
# chapter 5: the market
noise_band(250, 1500, CH[5]["start"] - 1, S0(57), .07, 1, 1., lfo=.9)
place(bell(note('E6'), 2.2, .12), Wd(55, 5)); place(bell(note('B6'), 1.8, .06), Wd(55, 5) + .05)
place(bell(note('D5'), 2, .07), Wd(56, 3)); place(bell(note('A5'), 2, .07), Wd(56, 8))
place(whoosh(.9, .2), Wd(59, 4))
for k in range(6): place(burst(.06, 3000, 9000, .02, .08), S0(60) + .5 + k * .5, 1., .6)
# chapter 6: the scribe
for k in range(14): place(burst(.06, 3000, 9000, .02, .07), S0(61) + .4 + k * .5, 1., .6)
for k in range(5): place(bell(note(['D5', 'F#5', 'A5', 'C6', 'D6'][k]), 2, .06), S0(63) + .2 + k * .5, 1., .3 + .1 * k)
for k in range(3): place(tone(1600, 1600, .04, .02, .06), Wd(64, [1, 8, 12][k]))
place(bell(note('D6'), 3, .1), Wd(65, 7)); place(whoosh(1.4, .2), S0(66))
# chapter 7: evening fire, senet, crickets under the stars, Sirius, the hard life
crackle(CH[7]["start"] - 1, S0(68), 70, .08); noise_band(250, 1200, CH[7]["start"] - 1, S0(68), .04, .8, .8, lfo=.9)
for k in range(5): place(burst(.04, 1500, 6000, .015, .2), Wd(68, 6) + k * .9)
for k in range(60): place(tone(4300, 4300, .025, .01, .03), S0(69) + (k // 3) * .55 + (k % 3) * .06 + rng.random() * .02, 1., rng.random())
place(bell(note('A5'), 3.5, .1), Wd(70, 4)); place(tone(110, 55, 2.0, .8, .3), Wd(71, 7))
# ending
place(tone(70, 40, 2.6, 1.0, .45), Wd(73, 1)); place(bell(note('D5'), 3, .12), Wd(73, 2))
place(whoosh(1.2, .2), Wd(74, 5)); place(bell(note('A5'), 3, .1), Wd(74, 17))
place(bell(note('F#5'), 2.5, .09), Wd(75, 6)); place(bell(note('A5'), 2.5, .09), Wd(75, 18)); place(tone(60, 120, 1.6, .7, .3), Wd(75, 21))
place(bell(note('Eb5'), 2.8, .09), Wd(77, 5))
for k, nm in enumerate(('D5', 'A5', 'D6')): place(bell(note(nm), 2.6, .12), Wd(79, 0) + .1 + k * .35, 1., .35 + .15 * k)
# reverb on the music, then the mix
ir_len = int(2.2 * SR); ir = rng.standard_normal(ir_len) * np.exp(-np.arange(ir_len) / SR / .6); ir /= np.sqrt((ir ** 2).sum())
def conv(x): n = len(x) + ir_len; return np.fft.irfft(np.fft.rfft(x, n) * np.fft.rfft(ir, n), n)[: len(x)]
wet = np.stack([conv(mus[:, 0]), conv(np.roll(mus[:, 1], 211))], 1)
mix = (mus * .7 + wet * .45 + sfx)[: int(TOTAL * SR)]
mix *= np.clip((TOTAL - np.arange(len(mix)) / SR) / .8, 0, 1)[:, None]; mix /= np.abs(mix).max() + 1e-9; mix *= .8
with wave.open(OUT, 'wb') as w: w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((mix * 32767).astype('<i2').tobytes())
print('ok', len(mix) / SR)
