# "land and oceans swap places" Earth (#41). Reads tex/earth_atmos_2048.jpg (the published Shorts' Earth), finds the oceans,
# and paints: old land -> closed seas (shelf + deep colour, sea ice near the poles); old ocean floor -> one supercontinent
# (desert far from water, green coastal belts by latitude, tundra and snow near the poles), with the real mid-ocean ridge
# (approximate path, ~65,000 km) and the deep trenches as relief. Also writes the night lights (cities along the new coasts)
# and a mask (R = ridge, G = trench) for the gold highlights. All soft, noise-modulated, no hard boxes.
import numpy as np; from PIL import Image; from scipy import ndimage as nd
a = np.asarray(Image.open('tex/earth_atmos_2048.jpg').convert('RGB')).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]; H, W = r.shape
lat = np.linspace(90, -90, H)[:, None] * np.ones((1, W)); lon = (np.arange(W) + .5)[None, :] / W * 360 - 180 + np.zeros((H, 1))
oc = ((g - r) > 7) & ((b - r) > 26) & ((r + g + b) < 330)
white = (r + g + b) > 600; grl = (lon > -75) & (lon < -10) & (lat < 84) & (lat > 59)
oc |= (white & (lat > 78) & ~grl) | (lat > 84)
oc = nd.median_filter(oc.astype(np.uint8), 5) > 0
s = lat < -55; sm = nd.gaussian_filter(oc.astype(float), 7) > .5; oc = np.where(s, sm, oc)
oc[lat < -74] = False
rng = np.random.default_rng(41)
def fbm(oct=6, base=6, seed=0):
    rr = np.random.default_rng(seed); out = np.zeros((H, W)); amp = 1; tot = 0
    for o in range(oct):
        n = base * 2 ** o; z = rr.random((n // 2 + 2, n + 1)); z[:, -1] = z[:, 0]
        zz = nd.zoom(z, (H / (n // 2 + 1), W / n), order=3)[:H, :W]; out += amp * zz; tot += amp; amp *= .55
    return out / tot
N1, N2, N3 = fbm(seed=1), fbm(seed=2, base=10), fbm(seed=3, base=4)
NH = fbm(oct=5, base=40, seed=7); NM = fbm(oct=5, base=18, seed=8)
P = W // 4
def edt_km(mask):   # distance (km) from each pixel to the nearest True of mask, longitude wrapped
    m = np.concatenate([mask[:, -P:], mask, mask[:, :P]], 1); d = nd.distance_transform_edt(~m)[:, P:-P]; return d * 19.55
land = oc                     # new land = old ocean
dW = edt_km(~land)            # land pixel -> distance to the new sea
dL = edt_km(land)             # sea pixel -> distance to the new coast
# ---- relief: ridge, trenches, seamounts ----
RIDGE = [
 [(80,120),(84,60),(84.5,0),(81,-3),(78,7),(74,8),(72,1),(70,-8),(67,-18),(63,-24),(58,-32),(53,-35),(50,-29),(45,-28),(40,-29),(35,-34),(30,-42),(25,-45),(20,-46),(15,-46),(10,-42),(5,-34),(1,-28),(0,-18),(-1,-15),(-5,-12),(-10,-13),(-15,-14),(-20,-12),(-25,-13),(-30,-14),(-35,-17),(-40,-17),(-45,-14),(-50,-8),(-54,-1)],
 [(-54,-1),(-53,10),(-52,20),(-48,32),(-44,38),(-40,45),(-36,52),(-33,57),(-28,63),(-25.5,70)],
 [(-25.5,70),(-20,67),(-15,66),(-10,67),(-5,68),(0,67),(5,62),(10,58),(13,52),(12,46)],
 [(-25.5,70),(-30,76),(-36,78),(-40,80),(-43,88),(-46,96),(-49,110),(-50,120),(-50,130),(-50,140),(-53,150),(-58,158),(-61,162),(-63,170),(-65,179.9)],
 [(-65,-180),(-64,-170),(-62,-160),(-60,-150),(-58,-140),(-56,-130),(-55,-120),(-50,-114),(-45,-112),(-40,-111),(-35,-110),(-30,-112),(-25,-113),(-20,-113),(-15,-112),(-10,-110),(-5,-106),(0,-102),(5,-103),(10,-104),(15,-105),(20,-107),(23,-108),(28,-112)],
 [(-35,-110),(-38,-100),(-41,-90),(-44,-80),(-46,-76)], [(2,-102),(2,-90),(1,-85)], [(40,-127),(44,-130),(48,-129)]]
TRENCH = [[(25,143),(20,147.5),(16,148),(13.5,146.6),(11.4,143.5),(11.4,141),(12.5,138.5)],
 [(51,158),(45,153),(40,145),(35,142.5),(30,142.5),(25,143)], [(51,-170),(51,-179.9)], [(52,179.9),(54,163)],
 [(-15,-173),(-22,-174.5),(-30,-177),(-37,-178)], [(-10,110),(-11,118),(-10,123)], [(-10,110),(-6,103),(0,96.5),(6,93.5)],
 [(-2,-82),(-10,-80.5),(-20,-71.8),(-30,-72.6),(-40,-75.4),(-48,-77)], [(14,-95),(16,-99),(18,-105)]]
def polymask(lines, wid_km, jit=0.0, seed=0):
    rr = np.random.default_rng(seed); m = np.zeros((H, W), bool); tot = 0
    for L in lines:
        for (la0, lo0), (la1, lo1) in zip(L[:-1], L[1:]):
            n = 400; f = np.linspace(0, 1, n); la = la0 + (la1 - la0) * f; lo = lo0 + (lo1 - lo0) * f
            la = la + jit * np.sin(f * 7 + rr.random() * 6); y = np.clip(((90 - la) / 180 * H).astype(int), 0, H - 1); x = (((lo + 180) / 360 * W).astype(int)) % W; m[y, x] = True
            tot += 6371 * np.arccos(np.clip(np.sin(np.radians(la0)) * np.sin(np.radians(la1)) + np.cos(np.radians(la0)) * np.cos(np.radians(la1)) * np.cos(np.radians(lo1 - lo0)), -1, 1))
    d = edt_km(m); return d, tot
dR, Lr = polymask(RIDGE, 0, .4, 5); dT, Lt = polymask(TRENCH, 0, .1, 6); print('ridge length km', int(Lr))
ridge = np.exp(-(dR / (260 + 160 * N2)) ** 2)                          # the ridge crest zone
ridgeF = np.exp(-(dR / 900) ** 2)                                          # the wide flanks
rift = np.exp(-(dR / 18) ** 2)                                             # the central rift valley
trench = np.exp(-(dT / 30) ** 2)
sm_ = [(19.8,-155.5),(20.7,-156.3),(21.5,-158),(22,-159.5),(23,-162),(24,-166),(25.5,-170),(27,-175),(28.5,179),(32,172),(36,171),(40,170.5),(45,168.5),(50,167)]
seam = np.zeros((H, W))
for k, (la, lo) in enumerate(sm_):
    y = (90 - la) / 180 * H; x = (lo + 180) / 360 * W; yy, xx = np.ogrid[:H, :W]; dx = (xx - x + W / 2) % W - W / 2
    seam += np.exp(-(((yy - y) ** 2 + (dx * np.cos(np.radians(la))) ** 2) / (2 * (9 if k < 2 else 7) ** 2))) * (.7 if k < 2 else .3)
rug = (1 - np.abs(2 * NH - 1)) ** 2                                      # ridged noise: rugged mountain texture
abyss = np.sin(dR / 45 + 14 * NM) * .5 + .5                                 # abyssal hills run parallel to the ridge
hgt = .9 * ridgeF + 1.1 * ridge * (.5 + rug) - .5 * rift * ridge - .5 * trench + 1.2 * seam + .05 * abyss * NM * (1 - ridge) + .35 * (NM - .5) + .25 * rug
hgt = nd.gaussian_filter(hgt, .7)
gy, gx = np.gradient(hgt); shade = np.clip(1 + 3.2 * (-gx * .8 - gy * .6), .72, 1.3)
# ---- land colours ----
al = np.abs(lat); C = lambda *v: np.array(v, float)
wet_lat = np.interp(al, [0, 10, 16, 22, 30, 38, 46, 60, 90], [1.0, .95, .55, .2, .15, .45, .85, .7, .4])
wet = np.clip(np.exp(-dW / (300 + 300 * N3)) * wet_lat * (.45 + .9 * N2) + (NH - .5) * .55 + (NM - .5) * .35, 0, 1) * .9
sand, ochre, redd, rock, salt = C(204, 178, 136), C(214, 190, 148), C(170, 112, 72), C(100, 90, 82), C(222, 216, 202)
inl = np.clip((dW - 900) / 1500, 0, 1)                                     # deep interior: redder
k1 = np.clip((N1 - .4) * 3 + (NM - .5), 0, 1)[..., None]; k2 = np.clip((N3 - .45) * 2.5 + inl * 1.2 + (NH - .5) * .8, 0, 1)[..., None]
col = sand * (1 - k1) + ochre * k1; col = col * (1 - k2 * .75) + redd * k2 * .75
kr = np.clip(ridge * (.4 + rug) * .85 + rug * .25 * (NM > .55), 0, 1)[..., None]; col = col * (1 - kr) + rock * kr
ks = np.clip((NH - .82) * 6, 0, 1) * (1 - ridge) * (al < 45)
kb = np.clip((NM - .58) * 4 + ridgeF * .4 - .2, 0, 1)[..., None] * .55; col = col * (1 - kb) + C(118, 104, 92) * kb   # dark basalt / clay plains
col = col * (1 - ks[..., None] * .6) + salt * ks[..., None] * .6
savanna, grass, forest = C(168, 150, 92), C(104, 116, 64), C(44, 66, 40)
def mixc(c, t, k): k = np.clip(k, 0, 1)[..., None]; return c * (1 - k) + t * k
col = mixc(col, savanna, (wet - .12) / .18); col = mixc(col, grass, (wet - .32) / .18); col = mixc(col, forest, (wet - .55) / .25)
tund = C(118, 112, 98); snow = C(238, 242, 246)
col = mixc(col, tund, (al - 50 + 14 * (N1 - .5)) / 10); col = mixc(col, snow, (al - 64 + 16 * (N2 - .5) + 8 * (NH - .5) + 4 * rug) / 4)
col = col * shade[..., None] * (.94 + .12 * NH[..., None]); col = mixc(col, C(66, 54, 46), trench * .75)
col = col * .88
# ---- sea colours (old land) ----
deep, shelf, coast = C(20, 38, 70), C(34, 84, 118), C(52, 120, 140)
sea = mixc(mixc(deep, shelf, np.exp(-dL / (120 + 120 * N2)) * .85), coast, np.exp(-dL / 22) * .6)
sea = sea * (.92 + .16 * N2[..., None])
ice = mixc(C(214, 226, 236), C(244, 248, 250), N1 * 1.2)
sea = mixc(sea, ice, (al - 64 + 14 * (N3 - .5) + 10 * (NH - .5)) / 1.2)
# soft coast blend
lk = nd.gaussian_filter(land.astype(float), 1.1)[..., None]
out = sea * (1 - lk) + col * lk
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('tex/earth_swap.jpg', quality=93)
# ---- night lights along the new coasts ----
nl = np.zeros((H, W))
P2 = np.clip(np.exp(-dW / 70) * (al < 62) * land * (.3 + N2), 0, None) + np.exp(-dW / 400) * .03 * land * (al < 55)
p = P2.ravel() / P2.sum(); idx = rng.choice(H * W, 9000, p=p)
yy, xx = np.divmod(idx, W); sz = rng.random(9000) ** 4
for y, x, s_ in zip(yy, xx, sz):
    rad = 1 + int(2.2 * s_); y0, y1 = max(0, y - rad * 3), min(H, y + rad * 3 + 1); x0, x1 = x - rad * 3, x + rad * 3 + 1
    gy_, gx_ = np.mgrid[y0:y1, x0:x1]; v = np.exp(-((gy_ - y) ** 2 + ((gx_ - x) * np.cos(np.radians(lat[y, 0]))) ** 2) / (2 * (rad * .55) ** 2)) * (.3 + .8 * s_)
    nl[gy_, gx_ % W] += v
nl = np.clip(nl, 0, 1.0) * .85
night = np.stack([nl * 255, nl * 210, nl * 140], -1)
Image.fromarray(np.clip(night, 0, 255).astype(np.uint8)).save('tex/earth_swap_night.png')
mk = np.stack([np.exp(-(dR / 45) ** 2) * 255, np.exp(-(dT / 45) ** 2) * 255 * (np.abs(lat - 14) < 14) * (lon > 136) * (lon < 150), np.zeros((H, W))], -1)
Image.fromarray(mk.astype(np.uint8)).save('tex/earth_swap_mask.png')
w = np.cos(np.radians(lat)); print('new water fraction', 1 - (land * w).sum() / w.sum())
