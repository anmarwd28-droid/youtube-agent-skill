# builds lens.png: a displacement map for a point-mass gravitational lens (each pixel samples the background at beta = theta - thetaE^2/theta)
# Einstein radius ~45 px: about 17 cm around the hole when seen from ~3 m with the wall ~1 m behind it (sqrt(4GM/c^2 * Dls/(Dl*Ds)) ≈ 0.04 rad).
import numpy as np
from PIL import Image
N, HALF, SCALE, TE = 512, 256.0, 240.0, 45.0
y, x = np.mgrid[0:N, 0:N].astype(float); dx, dy = x + .5 - HALF, y + .5 - HALF; r = np.hypot(dx, dy) + 1e-6
d = np.minimum(TE ** 2 / r, SCALE / 2 * .98) * np.clip((HALF - r) / 40, 0, 1)
R = np.clip(.5 - d * dx / r / SCALE, 0, 1); G = np.clip(.5 - d * dy / r / SCALE, 0, 1)
Image.fromarray((np.stack([R, G, np.full_like(R, .5), np.ones_like(R)], -1) * 255 + .5).astype(np.uint8), 'RGBA').save('lens.png'); print('lens.png ok')
