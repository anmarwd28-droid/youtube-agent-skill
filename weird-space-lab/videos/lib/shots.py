# usage: python3 shots.py <video.mp4> <out.jpg> t1,t2,...  -> numbered shot sheet (5 columns)
import sys, subprocess, tempfile, os
from PIL import Image, ImageDraw, ImageFont
vid, out, ts = sys.argv[1], sys.argv[2], [float(x) for x in sys.argv[3].split(',')]
d = tempfile.mkdtemp(); fs = []
for i, t in enumerate(ts):
    p = os.path.join(d, f'{i:02d}.jpg'); subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', vid, '-frames:v', '1', '-q:v', '3', p], check=True); fs.append(p)
W, H, n = 360, 640, 5; rows = (len(fs) + n - 1) // n
im = Image.new('RGB', (W * n + (n - 1) * 6, H * rows + (rows - 1) * 6), '#fff'); dr = ImageDraw.Draw(im); f = ImageFont.truetype('/usr/share/fonts/opentype/inter/InterDisplay-Medium.otf', 44)
for i, p in enumerate(fs):
    x, y = (i % n) * (W + 6), (i // n) * (H + 6); im.paste(Image.open(p).resize((W, H)), (x, y))
    dr.rectangle([x + 6, y + 6, x + 70, y + 70], fill='#111'); dr.text((x + 38, y + 38), str(i + 1), fill='#ffe600', font=f, anchor='mm')
im.save(out, quality=85); print(out, im.size)
