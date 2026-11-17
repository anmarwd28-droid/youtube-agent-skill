"""99 points scattered at random over the land (not Antarctica), at least 5.2 degrees apart: the 99 people on the globe.
usage: python3 -I ppl99.py   (reads ocmask.png: 1 = ocean, 0 = land, equirectangular; writes ../ppl99.js)
Point 0 is fixed in the Sahara (15 N, 20 E): the scene zooms on it and draws one person's share of the land around it."""
from PIL import Image
import numpy as np, math, random
a = np.asarray(Image.open('ocmask.png').convert('L')).astype(float) / 255
H, W = a.shape
def land(lat, lon):
    y = int((90 - lat) / 180 * H); x = int((lon + 180) / 360 * W) % W
    c = lambda yy, xx: a[max(0, min(H - 1, yy)), xx % W] < .3
    return c(y, x) and c(y - 3, x) and c(y + 3, x) and c(y, x + 3) and c(y, x - 3)
def ang(p, q):
    la1, lo1, la2, lo2 = map(math.radians, (p[0], p[1], q[0], q[1]))
    return math.degrees(math.acos(max(-1, min(1, math.sin(la1) * math.sin(la2) + math.cos(la1) * math.cos(la2) * math.cos(lo1 - lo2)))))
random.seed(99)
P = [(15.0, 20.0)]
while len(P) < 99:
    z = random.uniform(-1, 1); lat = math.degrees(math.asin(z)); lon = random.uniform(-180, 180)
    if lat < -56 or lat > 80 or not land(lat, lon): continue
    if min(ang((lat, lon), q) for q in P) < 5.2 or ang((lat, lon), P[0]) < 8: continue
    P.append((round(lat, 1), round(lon, 1)))
open('../ppl99.js', 'w').write('const PPL99 = ' + str([list(p) for p in P]).replace(' ', '') + ';\n')
