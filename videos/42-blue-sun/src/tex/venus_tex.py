# Venus as seen in visible light: a smooth cream-yellow cloud deck with soft, sheared bands (no surface visible). Writes tex/venus_1024.jpg (equirectangular 1024x512).
import numpy as np
from PIL import Image
W, H = 1024, 512
rng = np.random.default_rng(7)
def noise(sx, sy, oct=5):
    out = np.zeros((H, W)); amp = 1.0; tot = 0
    for o in range(oct):
        gx, gy = sx * 2 ** o, sy * 2 ** o
        g = rng.random((gy + 2, gx + 2)); g[:, -2:] = g[:, :2]   # wrap in longitude
        ys = np.linspace(0, gy, H, endpoint=False); xs = np.linspace(0, gx, W, endpoint=False)
        y0 = ys.astype(int); x0 = xs.astype(int); fy = (ys - y0)[:, None]; fx = (xs - x0)[None, :]
        fy = fy * fy * (3 - 2 * fy); fx = fx * fx * (3 - 2 * fx)
        a = g[y0][:, x0]; b = g[y0][:, x0 + 1]; c = g[y0 + 1][:, x0]; d = g[y0 + 1][:, x0 + 1]
        out += amp * ((a * (1 - fx) + b * fx) * (1 - fy) + (c * (1 - fx) + d * fx) * fy); tot += amp; amp *= .5
    return out / tot
lat = np.linspace(90, -90, H)[:, None] * np.pi / 180
n1 = noise(6, 3); n2 = noise(16, 6, 4)
# sheared bands: the 4-day super-rotation drags features into chevrons
shear = (np.abs(np.sin(lat)) * 0.35)
xs = (np.arange(W)[None, :] / W + shear + n1 * .12) % 1.0
band = np.sin(lat * 7 + n1 * 5 + np.sin(xs * 6.283 * 2) * .6) * .5 + .5
v = .55 * band + .3 * n2 + .15 * n1
v = (v - v.min()) / (v.max() - v.min())
light = np.array([250, 238, 200]) / 255; dark = np.array([196, 160, 102]) / 255
img = dark[None, None, :] * (1 - v[..., None]) + light[None, None, :] * v[..., None]
img *= (0.92 + 0.08 * np.cos(lat))[..., None]
Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).save('tex/venus_1024.jpg', quality=92)
print('ok')
