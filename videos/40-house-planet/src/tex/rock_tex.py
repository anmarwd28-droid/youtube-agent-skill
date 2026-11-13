# procedural rocky texture for the house-sized planet (#40): equirect 2048x1024, seamless, craters and boulders
import numpy as np
from PIL import Image
W, H = 2048, 1024
rng = np.random.default_rng(40)
lon = (np.arange(W) + .5) / W * 2 * np.pi; lat = np.pi / 2 - (np.arange(H) + .5) / H * np.pi
LO, LA = np.meshgrid(lon, lat)
P = np.stack([np.cos(LA) * np.sin(LO), np.sin(LA), np.cos(LA) * np.cos(LO)], -1)
def waves(n, f0, f1, seed):
    r = np.random.default_rng(seed); out = np.zeros((H, W))
    for i in range(n):
        f = f0 * (f1 / f0) ** (i / max(1, n - 1)); k = r.normal(size=3); k /= np.linalg.norm(k)
        out += np.cos(P @ (k * f) + r.uniform(0, 6.283)) / f ** .9
    return out / np.abs(out).max()
base = waves(60, 1.5, 40, 1)           # large patches
fine = waves(120, 30, 260, 2)          # grain
ridge = 1 - np.abs(waves(50, 4, 30, 3))  # ridged rock
h = .55 * base + .25 * ridge + .2 * fine
# craters
for i in range(70):
    c = rng.normal(size=3); c /= np.linalg.norm(c); rad = .03 + .22 * rng.random() ** 3
    d = np.arccos(np.clip(P @ c, -1, 1)) / rad
    bowl = np.where(d < 1, -(1 - d ** 2) * .9, 0); rim = np.exp(-((d - 1) / .18) ** 2) * .5
    h += (bowl + rim) * (.35 + .4 * rad / .25)
# boulders (small bright tops with dark sides)
for i in range(2200):
    c = rng.normal(size=3); c /= np.linalg.norm(c); rad = .004 + .012 * rng.random()
    d = np.arccos(np.clip(P @ c, -1, 1)) / rad
    h += np.where(d < 1, .6 * np.sqrt(np.clip(1 - d * d, 0, 1)), 0)
h = (h - h.min()) / (h.max() - h.min())
# colour: grey-brown rock with warmer rusty patches and darker basalt
tint = waves(30, 1, 8, 4)
c1 = np.array([58, 53, 49]); c2 = np.array([190, 176, 158]); rust = np.array([150, 110, 82]); bas = np.array([60, 60, 64])
col = c1 + (c2 - c1) * h[..., None]
col = col * (1 - .35 * np.clip(tint, 0, 1)[..., None]) + rust * .35 * np.clip(tint, 0, 1)[..., None]
col = col * (1 - .3 * np.clip(-tint, 0, 1)[..., None]) + bas * .3 * np.clip(-tint, 0, 1)[..., None]
col *= (.85 + .3 * fine[..., None] * .5)
Image.fromarray(np.clip(col, 0, 255).astype(np.uint8)).save('tex/rock_hs.jpg', quality=92)
Image.fromarray((h * 255).astype(np.uint8)).save('tex/rock_hs_h.png')
print('ok')
