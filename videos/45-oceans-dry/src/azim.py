# reproject an equirectangular map to the azimuthal "flat Earth" disc (North Pole at the centre)
# usage: azim.py src out N [alpha]   (alpha: use the source alpha channel as a grey cloud mask)
import sys, numpy as np
from PIL import Image
src, out, N = sys.argv[1], sys.argv[2], int(sys.argv[3]); use_a = len(sys.argv) > 4
im = Image.open(src); im = np.asarray(im.convert('RGBA'))[..., 3:4].repeat(3, -1) if use_a else np.asarray(im.convert('RGB')); H, W = im.shape[:2]
y, x = np.mgrid[0:N, 0:N].astype(np.float32); u = (x + .5) / N * 2 - 1; v = (y + .5) / N * 2 - 1
r = np.sqrt(u * u + v * v); lat = 90 - np.minimum(r, 1) * 180; lon = np.degrees(np.arctan2(u, v))
fx = (lon + 180) / 360 * W; fy = np.clip((90 - lat) / 180 * H, 0, H - 1.001)
x0 = np.floor(fx).astype(int) % W; x1 = (x0 + 1) % W; y0 = np.floor(fy).astype(int); y1 = np.minimum(y0 + 1, H - 1); ax = (fx - np.floor(fx))[..., None]; ay = (fy - y0)[..., None]
o = (im[y0, x0] * (1 - ax) + im[y0, x1] * ax) * (1 - ay) + (im[y1, x0] * (1 - ax) + im[y1, x1] * ax) * ay
Image.fromarray(o.astype(np.uint8)).save(out, quality=93); print('ok', out)
