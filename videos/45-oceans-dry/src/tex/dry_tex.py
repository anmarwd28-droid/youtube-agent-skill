# "the oceans dried up" Earth (#45). Reads tex/earth_atmos_2048.jpg (the published Shorts' Earth) and replaces only the oceans
# with the dry sea floor: pale shelves, darker abyssal plains (red clay), the real mid-ocean ridge and trenches as relief
# (paths and relief come from swap_tex.py), white salt pans in the basins. The land is untouched.
# Writes tex/earth_dry.jpg and tex/earth_dry_mask.png (R = ridge, G = Mariana trench, B = depth: the drain order in the shader).
import numpy as np; from PIL import Image; from scipy import ndimage as nd
src = open('tex/swap_tex.py').read().split('# ---- land colours ----')[0]
# Arctic: all the sea ice is sea floor here (white north of 70 outside Greenland), and Greenland's north coast is a soft line, not a box edge
src = src.replace("rng = np.random.default_rng(41)", "oc |= (white & (lat > 70) & ~grl) | (grl & (lat > 82.7 + .7 * np.sin(lon / 6.0))) | (lat > 83.5); oc = nd.median_filter(oc.astype(np.uint8), 5) > 0\nrng = np.random.default_rng(41)")
exec(src)
C = lambda *v: np.array(v, float)
def mixc(c, t, k): k = np.clip(k, 0, 1)[..., None]; return c * (1 - k) + t * k
depth = .12 + 3.9 * (1 - np.exp(-np.clip(dW - 55, 0, None) / (110 + 90 * N2))) - 1.7 * ridgeF * (dW > 200) - .5 * ridge + 6.0 * trench + .5 * (NM - .5) - 1.3 * seam
depth = np.clip(nd.gaussian_filter(depth, 1.2), .05, 11)
dn = np.clip(depth / 4.4, 0, 1)
shelf, slope, abyss, clay, rock, salt = C(202, 182, 146), C(186, 160, 126), C(158, 140, 120), C(150, 112, 88), C(86, 80, 76), C(240, 236, 226)
col = mixc(shelf, slope, (depth - .15) / .9); col = mixc(col, abyss, (depth - 1.2) / 2.2)
col = mixc(col, clay, np.clip((N1 - .42) * 3 + (NH - .5), 0, 1) * np.clip((depth - 2.4) / 1.2, 0, 1) * .7)
kr = np.clip(ridge * (.45 + rug) * .9 + rug * .22 * (NM > .55) + 1.3 * seam, 0, 1); col = mixc(col, rock, kr)
ksalt = np.clip((N3 - .46) * 5 + (NM - .5) * 3, 0, 1) * (1 - np.clip(ridgeF * 1.4, 0, 1)) * np.clip((dW - 250) / 300, 0, 1)
ksalt2 = np.clip((NH - .6) * 5, 0, 1) * np.clip(1 - np.abs(depth - .5) / .5, 0, 1) * .6           # salt crust on the shelves too
col = mixc(col, salt, np.clip(ksalt * .85 + ksalt2, 0, 1))
gy, gx = np.gradient(nd.gaussian_filter(hgt - .16 * depth, .6)); shade = np.clip(1 + 3.6 * (-gx * .8 - gy * .6), .62, 1.32)
col = col * shade[..., None] * (.93 + .14 * NH[..., None]) * (1 - .2 * dn[..., None]); col = mixc(col, C(52, 44, 40), trench * .85)
edge = np.exp(-((dW - 75) / 30) ** 2) * .22; col = col * (1 - edge[..., None])                           # the continental slope: a darker band off the coasts
lk = nd.gaussian_filter(land.astype(float), 1.0)[..., None]
out = a * (1 - lk) + col * lk
Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)).save('tex/earth_dry.jpg', quality=93)
mk = np.stack([np.exp(-(dR / 45) ** 2) * 255, np.exp(-(dT / 45) ** 2) * 255 * (np.abs(lat - 14) < 14) * (lon > 136) * (lon < 150), np.clip(depth / 5.6, 0, 1) * 255 * land], -1)
Image.fromarray(mk.astype(np.uint8)).save('tex/earth_dry_mask.png')
w = np.cos(np.radians(lat)); print('sea floor fraction', (land * w).sum() / w.sum(), 'mean depth', (depth * land * w).sum() / (land * w).sum())
