import numpy as np
from PIL import Image, ImageFilter
im = np.asarray(Image.open('earth_atmos_2048.jpg').convert('RGB')).astype(float) / 255
H, W, _ = im.shape
r, g, b = im[..., 0], im[..., 1], im[..., 2]
ocean = ((b > r + .04) & (b > g - .02)) | ((r + g + b) < .2)
ocean = np.asarray(Image.fromarray((ocean * 255).astype(np.uint8)).filter(ImageFilter.MedianFilter(5))) > 127
lat = 90 - (np.arange(H) + .5) / H * 180; LAT = np.repeat(lat[:, None], W, 1)
rng = np.random.default_rng(3)
def noise(cells, seed):
    rr = np.random.default_rng(seed); gg = rr.random((cells // 2 + 1, cells)); gg = np.concatenate([gg, gg[:, :1]], 1)
    big = Image.fromarray((gg * 255).astype(np.uint8)).resize((W + W // cells, H), Image.BICUBIC)
    return np.asarray(big)[:, :W] / 255.
n = .6 * noise(16, 1) + .3 * noise(64, 2) + .1 * noise(256, 3)
shore = 38 + (n - .5) * 16                                       # the new coastline near ±38°
newsea = np.abs(LAT) > shore
# exposed sea floor: sediment browns with relief-like noise, darker in old deep basins
land = np.asarray(Image.fromarray(((~ocean) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(28))) / 255.
deep = np.clip(1 - land * 3, 0, 1)
fb = .5 * noise(24, 21) + .3 * noise(48, 22) + .2 * noise(96, 23)
ridge = np.exp(-((noise(10, 31) - .5) / .03) ** 2)
base = np.stack([.70, .62, .50], -1) * (1 - deep[..., None]) + np.stack([.46, .40, .34], -1) * deep[..., None]
floor = base * (.82 + .32 * fb[..., None]) * (1 - .25 * ridge[..., None])
floor = floor + np.stack([.08, .06, .02], -1) * (1 - deep[..., None]) * (fb[..., None] > .55)
out = im.copy()
m = (~newsea) & ocean
out[m] = floor[m]
# the new polar oceans cover everything poleward of the shore, shallow and turquoise near the coast, deep further out
depth = np.clip((np.abs(LAT) - shore) / 18, 0, 1)
seaC = np.stack([.05 + .12 * (1 - depth), .2 + .22 * (1 - depth), .38 + .2 * (1 - depth)], -1) * (.9 + .15 * noise(96, 9))[..., None]
out[newsea] = seaC[newsea]
# keep the polar ice caps visible at the very top/bottom as sea ice
ice = np.abs(LAT) > 84 - 3 * noise(32, 11)
out[ice] = np.stack([.86, .9, .94], -1) * (.9 + .1 * noise(64, 12)[..., None])[ice]
Image.fromarray((np.clip(out, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.7)).save('earth_stopped.jpg', quality=92)
print('ok')
