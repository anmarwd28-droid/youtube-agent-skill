# a small lit Earth sprite (orthographic view of the house day map + clouds, blue rim), for "a ball made of Earths" (#51)
import numpy as np
from PIL import Image
day = np.asarray(Image.open('earth_atmos_2048.jpg').convert('RGB')).astype(float) / 255
cl = np.asarray(Image.open('earth_clouds_1024.png').convert('L').resize((2048, 1024))).astype(float) / 255
def make(N, lon0, out):
    y, x = np.mgrid[0:N, 0:N]; u = (x + .5) / N * 2 - 1; v = 1 - (y + .5) / N * 2; r2 = u * u + v * v; m = r2 <= 1
    z = np.sqrt(np.clip(1 - r2, 0, 1)); lat = np.arcsin(np.clip(v, -1, 1)); lon = np.arctan2(u, z) + lon0
    tx = ((lon / (2 * np.pi) + .5) % 1 * 2047).astype(int); ty = ((.5 - lat / np.pi) * 1023).astype(int)
    c = day[ty, tx]; k = cl[ty, tx][..., None]; c = c * (1 - .75 * k) + .95 * k
    L = np.array([-.3, .3, .9]); L /= np.linalg.norm(L); d = u * L[0] + v * L[1] + z * L[2]
    lit = np.clip(d * 1.0 + .25, 0, 1) ** .7; col = c * (.05 + 1.1 * lit[..., None])
    rim = (1 - z) ** 2.6; col += np.array([.3, .55, 1.0]) * (rim * (.15 + .85 * np.clip(d + .4, 0, 1)))[..., None]
    a = np.clip((1 - np.sqrt(r2)) * N * .5, 0, 1); img = np.dstack([np.clip(col, 0, 1) * 255, a * 255]).astype(np.uint8); img[~m] = 0
    Image.fromarray(img, 'RGBA').save(out)
make(96, 0.3, 'earth_ico.png'); make(96, 2.4, 'earth_ico2.png'); make(96, 4.4, 'earth_ico3.png'); print('ok')
