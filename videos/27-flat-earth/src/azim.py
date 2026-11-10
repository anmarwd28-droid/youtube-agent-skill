import sys, numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, out, N = sys.argv[1], sys.argv[2], int(sys.argv[3])
im = np.asarray(Image.open(src).convert('RGB')); H, W = im.shape[:2]
y, x = np.mgrid[0:N, 0:N].astype(np.float32); u = (x + .5) / N * 2 - 1; v = (y + .5) / N * 2 - 1
r = np.sqrt(u * u + v * v); lat = 90 - r * 180; lon = np.degrees(np.arctan2(u, v))  # lon 0 points down (towards viewer)
px = ((lon + 180) / 360 * W).astype(np.int32) % W; py = np.clip(((90 - lat) / 180 * H).astype(np.int32), 0, H - 1)
o = im[py, px]; a = (r <= 1).astype(np.uint8) * 255
Image.fromarray(np.dstack([o, a])).save(out)
print('ok', out)
