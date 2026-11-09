"""Earth day texture for the retrograde-rotation climate (after Mikolajewicz et al. 2018): the Sahara and Arabia turn to savanna and grassland; parts of the Americas dry out to desert."""
import sys
sys.path.insert(0, sys.argv[1])
import numpy as np
from PIL import Image
im = np.asarray(Image.open('tex/earth_atmos_2048.jpg').convert('RGB')).astype(np.float32) / 255
H, W, _ = im.shape
lon = (np.arange(W) + .5) / W * 360 - 180; lat = 90 - (np.arange(H) + .5) / H * 180
LON, LAT = np.meshgrid(lon, lat)
r, g, b = im[..., 0], im[..., 1], im[..., 2]
ocean = ((g - r) > 7 / 255) & (b > r + .06) & (b > g + .03)
rng = np.random.default_rng(5)
def noise(sc):
    n = rng.random((H // sc + 2, W // sc + 2)); return np.asarray(Image.fromarray((n * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)) / 255.
n = .6 * noise(24) + .4 * noise(6)
def box(la0, la1, lo0, lo1, soft=4):
    return np.clip(np.minimum.reduce([(LAT - la0) / soft, (la1 - LAT) / soft, (LON - lo0) / soft, (lo1 - LON) / soft]), 0, 1)
desert = (r > g * .95) & (r > b * 1.15) & ~ocean
green_k = np.clip(np.maximum(box(8, 36, -18, 36, 9), box(12, 33, 34, 60, 7)) * (.55 + .7 * n), 0, 1) * desert
n2 = noise(64); gc = np.stack([.36 + .12 * n2, .44 + .12 * n, .2 + .06 * n], -1)
out = im * (1 - green_k[..., None] * .85) + gc * green_k[..., None] * .85
veg = (g >= r * .9) & ~ocean
dry_k = np.maximum.reduce([box(24, 40, -112, -80, 4), box(-32, -6, -66, -36, 4), box(15, 28, -110, -95, 3)]) * veg * (.55 + .45 * n)
dc = np.stack([.72 + .08 * n, .58 + .07 * n, .40 + .05 * n], -1)
out = out * (1 - dry_k[..., None]) + dc * dry_k[..., None]
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8)).save('tex/earth_retro.jpg', quality=92); print('ok', green_k.mean(), dry_k.mean())
