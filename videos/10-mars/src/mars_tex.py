import numpy as np
from PIL import Image, ImageFilter
W, H = 2048, 1024
rng = np.random.default_rng(42)
def noise(cells_x, seed):
    r = np.random.default_rng(seed); cy = max(2, cells_x // 2)
    g = r.random((cy + 1, cells_x)); g = np.concatenate([g, g[:, :1]], 1)   # wrap in longitude
    im = Image.fromarray((g * 65535).astype(np.uint16).astype(np.int32), 'I').convert('F')
    big = im.resize((W + W // cells_x, H), Image.BICUBIC)
    return np.asarray(big)[:, :W] / 65535.0
def fbm(base, oct, seed, gain=.5):
    s = np.zeros((H, W)); a = 1; tot = 0
    for o in range(oct): s += a * noise(base * 2 ** o, seed + o); tot += a; a *= gain
    return s / tot
lon = (np.arange(W) + .5) / W * 360 - 180          # -180..180, 0 at centre
lat = 90 - (np.arange(H) + .5) / H * 180
LON, LAT = np.meshgrid(lon, lat)
def blob(lo, la, rx, ry, power=2):
    d = ((LON - lo + 180) % 360 - 180) / rx; e = (LAT - la) / ry
    return np.exp(-(np.abs(d) ** power + np.abs(e) ** power))
n1 = fbm(6, 6, 1); n2 = fbm(24, 5, 20); n3 = fbm(96, 4, 40)
# dark albedo regions (approximate real positions)
dark = (blob(70, 8, 16, 22) + blob(62, 25, 9, 10) +              # Syrtis Major wedge
        blob(-30, 45, 28, 12) +                                   # Acidalia
        blob(0, -4, 22, 6) + blob(-25, -8, 18, 8) +               # Meridiani / Margaritifer
        blob(-40, -26, 26, 10) +                                  # Erythraeum
        blob(140, -22, 30, 10) + blob(110, -18, 22, 9) +          # Cimmerium / Tyrrhenum
        blob(175, -25, 20, 9) + blob(90, 30, 18, 8) * .6 +        # Sirenum, Utopia
        np.exp(-((LAT + 25) / 14) ** 2) * .35)                    # southern dark band
dark = np.clip(dark * (0.65 + 0.7 * n1) - 0.25 * (n2 - .5), 0, 1.2)
bright = blob(70, -42, 20, 10) * .8 + blob(-120, 5, 35, 25) * .5 + blob(-150, 20, 30, 14) * .4   # Hellas, Tharsis, Amazonis
alb = np.clip(dark - bright + (n2 - .5) * .9 + (n3 - .5) * .35, 0, 1.4)
alb = np.clip((alb - .18) / .7, 0, 1) ** 1.2
base = np.array([196, 118, 72]) / 255; darkc = np.array([92, 58, 42]) / 255
k = np.clip(alb * 0.9, 0, 1)[..., None]
img = base * (1 - k) + darkc * k
img *= (0.86 + 0.28 * n2[..., None]) * (0.9 + 0.2 * n3[..., None])
# Valles Marineris: a long dark canyon system
vm = np.zeros((H, W))
for i in range(260):
    u = i / 259; lo = -105 + 58 * u; la = -7 - 6 * u + .8 * np.sin(u * 9)
    vm = np.maximum(vm, blob(lo, la, 1.2, 1.1 + 1.3 * np.sin(u * 3.1) ** 2) * (.6 + .4 * np.sin(u * 3.1)))
vm = np.clip(vm * (0.7 + 0.6 * n3), 0, 1)
img = img * (1 - .45 * vm[..., None])
# Tharsis volcanoes: bright-rimmed shields with dark calderas
for lo, la, r in [(-134, 18, 7), (-113, 12, 3.2), (-104, 2, 3.2), (-112, -9, 3.6), (-150, 40, 3)]:
    ring = blob(lo, la, r, r) ; cal = blob(lo, la, r * .22, r * .22)
    img = img * (1 + .12 * ring[..., None]) ; img = img * (1 - .45 * cal[..., None])
# craters (more in the southern highlands)
cr = np.zeros((H, W)); rimc = np.zeros((H, W)); r = np.random.default_rng(7)
for i in range(2600):
    la = np.degrees(np.arcsin(r.uniform(-1, 1))); 
    if la > 0 and r.random() < .6: continue
    lo = r.uniform(-180, 180); rad = 0.22 * (r.pareto(1.5) + 1); rad = min(rad, 8)
    sx = rad / max(np.cos(np.radians(la)), .2); y0 = int((90 - la) / 180 * H); x0 = int((lo + 180) / 360 * W)
    ry = int(rad / 180 * H * 1.6) + 2; rx = int(sx / 360 * W * 1.6) + 2
    ys = np.arange(max(0, y0 - ry), min(H, y0 + ry)); xs = np.arange(x0 - rx, x0 + rx) % W
    if len(ys) == 0: continue
    yy, xx = np.meshgrid(ys, xs, indexing='ij')
    dy = (yy - y0) / (rad / 180 * H); dx = (((xx - x0 + W // 2) % W) - W // 2) / (sx / 360 * W)
    d = np.sqrt(dx * dx + dy * dy)
    cr[yy, xx] = np.maximum(cr[yy, xx], np.clip(1 - d, 0, 1) ** .5 * (d < 1))
    rimc[yy, xx] = np.maximum(rimc[yy, xx], np.exp(-((d - 1) / .12) ** 2) * (1 - .5 * (dx > 0)))
img = img * (1 - .12 * cr[..., None]) * (1 + .08 * rimc[..., None])
# polar caps with ragged edges
edge = (n2 - .5) * 7 + (n3 - .5) * 3
north = np.clip((LAT - (81 + edge)) / 2.0, 0, 1); south = np.clip((-(LAT) - (85 + edge * .6)) / 1.6, 0, 1)
cap = np.maximum(north, south)[..., None]
img = img * (1 - cap) + np.array([238, 236, 232]) / 255 * cap * (0.92 + 0.1 * n3[..., None])
img = np.clip(img, 0, 1) ** 1.05
Image.fromarray((img * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.6)).save('mars_1024.jpg', quality=92)
print('ok')
