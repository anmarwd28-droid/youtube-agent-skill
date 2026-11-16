# Mars for the moon slot of gl3d_dry.js (#45), all in code: rust/ochre plains, dark albedo regions (Syrtis Major, Acidalia...),
# the north-south dichotomy, Tharsis volcanoes, Valles Marineris, Hellas, craters, small polar caps.
# Writes tex/mars_dry.jpg (today) and tex/mars_wet.jpg (ancient Mars: lakes and seas in the low ground, river valleys).
import numpy as np; from PIL import Image; from scipy import ndimage as nd
W, H = 2048, 1024
lat = np.linspace(90, -90, H)[:, None] * np.ones((1, W)); lon = (np.arange(W) + .5)[None, :] / W * 360 - 180 + np.zeros((H, 1))
def fbm(oct=6, base=6, seed=0):
    rr = np.random.default_rng(seed); out = np.zeros((H, W)); amp = 1; tot = 0
    for o in range(oct):
        n = base * 2 ** o; z = rr.random((n // 2 + 2, n + 1)); z[:, -1] = z[:, 0]
        zz = nd.zoom(z, (H / (n // 2 + 1), W / n), order=3)[:H, :W]; out += amp * zz; tot += amp; amp *= .55
    return out / tot
N1, N2, N3, NH = fbm(seed=11), fbm(seed=12, base=10), fbm(seed=13, base=4), fbm(oct=5, base=40, seed=14)
def blob(la, lo, sla, slo, rot=0):
    dx = ((lon - lo + 180) % 360 - 180) * np.cos(np.radians(la)); dy = lat - la; c, s_ = np.cos(rot), np.sin(rot)
    u = dx * c + dy * s_; v = -dx * s_ + dy * c; return np.exp(-(u / slo) ** 2 - (v / sla) ** 2)
C = lambda *v: np.array(v, float)
def mixc(c, t, k): k = np.clip(k, 0, 1)[..., None]; return c * (1 - k) + t * k
# height: north low, Tharsis and Elysium high, Hellas and Argyre deep, the canyon
h = .5 + .5 * (N3 - .5) + .25 * (N1 - .5) - .34 / (1 + np.exp(-(lat - 28 - 26 * (N3 - .5) - 12 * np.sin(np.radians(lon) * 1.5)) / 5))
h += .5 * blob(0, -112, 22, 26) + .22 * blob(25, 147, 10, 12) - .55 * blob(-42, 70, 11, 15) - .3 * blob(-50, -43, 6, 8)
f = np.clip((lon + 92) / 50, 0, 1); cy = -6 - 8 * f + 1.5 * np.sin(lon / 4)
canyon = np.exp(-((lat - cy) / (1.3 + 1.2 * np.sin(f * 3.14))) ** 2) * (lon > -95) * (lon < -40) * np.sin(np.clip(f, 0, 1) * 3.14) ** .5
h -= .35 * canyon
vol = sum(blob(la, lo, r, r) for la, lo, r in [(18.6, -134, 3.2), (0.5, -120.5, 1.8), (-8.5, -112.5, 1.8), (11.5, -104.5, 1.8), (25, 147, 2.2)])
h += .35 * vol
# craters, mostly on the southern highlands
rng = np.random.default_rng(7); cr = np.zeros((H, W)); south = 1 / (1 + np.exp((lat - 15) / 12))
for k in range(700):
    la = np.degrees(np.arcsin(rng.uniform(-1, .75))); lo = rng.uniform(-180, 180); R = 0.4 + 3.6 * rng.random() ** 5
    if rng.random() > .25 + .75 / (1 + np.exp((la - 15) / 12)): continue
    y0, y1 = int((90 - la - R * 2.2) / 180 * H), int((90 - la + R * 2.2) / 180 * H) + 1; y0, y1 = max(y0, 0), min(y1, H)
    wx = int(R * 2.2 / max(np.cos(np.radians(la)), .2) / 360 * W) + 2; xc = int((lo + 180) / 360 * W); xs = np.arange(xc - wx, xc + wx + 1) % W
    dy = lat[y0:y1, :1] - la; dx = ((lon[:1, xs] - lo + 180) % 360 - 180) * np.cos(np.radians(la)); d = np.sqrt(dx ** 2 + dy ** 2) / R
    cr[y0:y1, xs] += (-.5 * np.exp(-(d / .7) ** 4) + .3 * np.exp(-((d - 1) / .2) ** 2)) * (.5 + .5 * rng.random())
h2 = h + .06 * cr
# colours
rust, ochre, dark, pale = C(178, 98, 54), C(212, 150, 92), C(98, 66, 52), C(226, 178, 128)
col = mixc(rust, ochre, (N1 - .35) * 2.2 + (NH - .5)); col = mixc(col, pale, (h - .72) * 2.5 + .5 * blob(0, -112, 20, 24))
alb = blob(8, 70, 14, 7, .3) + .9 * blob(45, -30, 12, 16) + .8 * blob(-25, -5, 8, 30, .1) + .8 * blob(-30, 110, 7, 34, -.15) + .7 * blob(-20, 170, 7, 22) + .6 * blob(55, 90, 6, 28) + .5 * blob(-35, -120, 7, 20)
col = mixc(col, dark, np.clip(alb * (.7 + .9 * N2) - .15, 0, 1) * .85)
col = mixc(col, C(84, 52, 42), canyon * .8); col = mixc(col, C(150, 86, 56), vol * .6)
col = col * (1 + .22 * np.clip(cr, -1, .6))[..., None]
gy, gx = np.gradient(nd.gaussian_filter(h2, .8)); shade = np.clip(1 + 9 * (-gx * .8 - gy * .6), .6, 1.35); col = col * shade[..., None] * (.92 + .16 * NH[..., None])
cap = np.clip((np.abs(lat) - np.where(lat > 0, 80, 85) + 5 * (N2 - .5) + 3 * (NH - .5)) / 1.2, 0, 1)
dry = mixc(col, C(238, 234, 228), cap)
Image.fromarray(np.clip(dry, 0, 255).astype(np.uint8)).save('tex/mars_dry.jpg', quality=93)
# ancient Mars: water in the low ground (a northern sea, Hellas, Argyre, the canyon, crater lakes), a greyer sky-lit tint near the shores
ww = np.cos(np.radians(lat)); o_ = np.argsort(h2.ravel()); cw_ = np.cumsum(ww.ravel()[o_]); lev = h2.ravel()[o_][np.searchsorted(cw_, .27 * cw_[-1])]; wk = np.clip((lev - h2 + .012 * (NH - .5)) / .012, 0, 1)
deep, shal = C(22, 52, 96), C(52, 110, 140); water = mixc(shal, deep, (lev - h2) / .12); water = water * (.92 + .16 * N2[..., None])
# river valleys: thin ridged-noise lines near the shores of the southern highlands
riv = np.clip(1 - np.abs(2 * fbm(oct=4, base=24, seed=31) - 1) * 9, 0, 1) * np.clip(1 - (h2 - lev) / .12, 0, 1) * (h2 > lev)
wet = mixc(col * C(.9, .95, .92), C(44, 88, 124), riv * .85)
wet = mixc(wet, C(120, 104, 76), np.clip(1 - (h2 - lev) / .05, 0, 1) * .35 * (h2 > lev))       # damp ground near the shores
wet = mixc(wet, water, wk); wet = mixc(wet, C(238, 234, 228), np.clip(cap * 1.0 + np.clip((np.abs(lat) - 72 + 6 * (N2 - .5)) / 3, 0, 1) * wk, 0, 1))
Image.fromarray(np.clip(wet, 0, 255).astype(np.uint8)).save('tex/mars_wet.jpg', quality=93)
w = np.cos(np.radians(lat)); print('water fraction', (wk * w).sum() / w.sum())
