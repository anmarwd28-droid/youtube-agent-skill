"""Earth day texture with a Yellowstone ash blanket over North America (thick near the park, thinning east), land only."""
import sys
sys.path.insert(0, sys.argv[1])
import numpy as np
from PIL import Image
im = np.asarray(Image.open('tex/earth_atmos_2048.jpg').convert('RGB')).astype(np.float32) / 255
H, W, _ = im.shape
lon = (np.arange(W) + .5) / W * 360 - 180; lat = 90 - (np.arange(H) + .5) / H * 180
LON, LAT = np.meshgrid(np.radians(lon), np.radians(lat))
y0, x0 = np.radians(44.4), np.radians(-110.6)
d = 6371 * np.arccos(np.clip(np.sin(LAT) * np.sin(y0) + np.cos(LAT) * np.cos(y0) * np.cos(LON - x0), -1, 1))
# bearing: the blanket is stretched downwind (east) and shorter upwind (west)
br = np.arctan2(np.sin(LON - x0) * np.cos(LAT), np.cos(y0) * np.sin(LAT) - np.sin(y0) * np.cos(LAT) * np.cos(LON - x0))
reach = 1900 + 1900 * np.clip(np.sin(br), 0, 1) + 500 * np.clip(-np.cos(br), 0, 1)
k = np.clip(1.2 - d / reach, 0, 1) ** .6
r, g, b = im[..., 0], im[..., 1], im[..., 2]
ocean = ((g - r) > 7 / 255) & (b > r + .06) & (b > g + .03)
k = np.where(ocean, k * .35, k)
rng = np.random.default_rng(3); n = rng.random((H // 8, W // 8)); n = np.asarray(Image.fromarray((n * 255).astype(np.uint8)).resize((W, H), Image.BILINEAR)) / 255
near = np.clip(1 - d / 900, 0, 1)[..., None]
ash = np.stack([.66 + .08 * n, .65 + .08 * n, .64 + .07 * n], -1) * (1 - .35 * near)
out = im * (1 - k[..., None]) + ash * k[..., None]
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8)).save('tex/earth_ash.jpg', quality=92)
print('ok', k.max(), (k > .5).mean())
