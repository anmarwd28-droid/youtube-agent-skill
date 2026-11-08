# usage: python3 sheet.py <dir with s_*.jpg> <out.jpg>  (quick contact sheet of test stills)
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
fs = sorted(glob.glob(os.path.join(sys.argv[1], 's_*.jpg')), key=lambda f: float(os.path.basename(f)[2:-4])); W, H = 300, 533; n = 6
im = Image.new('RGB', (W * n, H * ((len(fs) + n - 1) // n)), '#111'); d = ImageDraw.Draw(im); f = ImageFont.truetype('/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf', 30)
for i, p in enumerate(fs):
    x, y = (i % n) * W, (i // n) * H; im.paste(Image.open(p).resize((W, H)), (x, y)); d.text((x + 6, y + 4), os.path.basename(p)[2:-4], fill='yellow', font=f)
im.save(sys.argv[2], quality=85)
