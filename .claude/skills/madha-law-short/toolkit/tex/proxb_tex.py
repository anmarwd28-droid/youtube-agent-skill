"""An 'eyeball' world for Proxima b (tidally locked): open ocean and some bare land around the point facing the star, sea ice growing towards the terminator, a frozen night side."""
import sys
sys.path.insert(0, sys.argv[1])
import numpy as np
from PIL import Image
W, H = 2048, 1024
lon = (np.arange(W) + .5) / W * 2 * np.pi - np.pi; lat = np.pi / 2 - (np.arange(H) + .5) / H * np.pi
LON, LAT = np.meshgrid(lon, lat)
d = np.degrees(np.arccos(np.clip(np.cos(LAT) * np.cos(LON), -1, 1)))  # angle from the substellar point (lon 0, lat 0)
rng = np.random.default_rng(11)
def noise(sc):
    n = rng.random((H // sc + 2, W // sc + 2)); return np.asarray(Image.fromarray((n * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC)) / 255.
n1 = .55 * noise(64) + .3 * noise(16) + .15 * noise(4)
n2 = .6 * noise(32) + .4 * noise(8)
edge = 62 + (n1 - .5) * 30
ocean = np.stack([.05 + .05 * n2, .2 + .12 * n2, .36 + .14 * n2], -1)
land = (n1 > .64) & (d < edge - 6)
landc = np.stack([.42 + .15 * n2, .3 + .1 * n2, .2 + .06 * n2], -1)
ice = np.stack([.86 + .1 * n2, .9 + .08 * n2, .96 + .04 * n2], -1) * (.8 + .2 * n1[..., None])
t = np.clip((d - edge) / 14, 0, 1)[..., None]
img = ocean * (1 - t) + ice * t
img = np.where(land[..., None], landc, img)
crack = (np.abs(noise(6) - .5) < .02) & (d > edge)
img[crack] *= .8
Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).save('tex/proxb.jpg', quality=92); print('ok')
