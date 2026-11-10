# tileable ocean normal map: sum of random periodic waves (integer wave numbers keep it seamless)
import numpy as np, sys
from PIL import Image
N = 1024; rng = np.random.default_rng(5); y, x = np.mgrid[0:N, 0:N] / N * 2 * np.pi
h = np.zeros((N, N)); hx = np.zeros((N, N)); hy = np.zeros((N, N))
for i in range(90):
    k = rng.integers(1, 40); a = rng.uniform(0, 2 * np.pi); kx, ky = np.round(k * np.cos(a)), np.round(k * np.sin(a))
    if kx == 0 and ky == 0: continue
    amp = 1.0 / (np.hypot(kx, ky) ** 1.3); ph = rng.uniform(0, 2 * np.pi); arg = kx * x + ky * y + ph
    h += amp * np.sin(arg); hx += amp * kx * np.cos(arg); hy += amp * ky * np.cos(arg)
s = 0.6 / np.abs(np.stack([hx, hy])).max(); nx, ny = -hx * s * 3, -hy * s * 3; nz = np.ones_like(nx)
L = np.sqrt(nx * nx + ny * ny + nz * nz); img = np.stack([nx / L, ny / L, nz / L], -1) * .5 + .5
Image.fromarray((img * 255).astype(np.uint8)).save(sys.argv[1], quality=95); print('ok')
