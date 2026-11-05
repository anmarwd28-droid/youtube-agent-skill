// node render.js -> avatar.png (800x800) and banner.png (2560x1440); banner-guides.png shows the safe area
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  for (const [mode, w, h, out, extra] of [['avatar', 800, 800, 'avatar.png', ''], ['banner', 2560, 1440, 'banner.png', ''], ['banner', 2560, 1440, 'banner-guides.png', '&guides=1']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await p.goto('file://' + path.resolve(__dirname, 'art.html') + '?mode=' + mode + extra);
    await p.evaluate(async () => { await Promise.all(['700 100px "Noto Naskh Arabic"', '700 100px Amiri', '700 50px "Space Grotesk"', '500 40px "Space Grotesk"'].map(f => document.fonts.load(f, 'ماذا لو؟ LAB'))); await document.fonts.ready; });
    await p.evaluate(() => { document.getElementById('root').innerHTML = document.getElementById('root').innerHTML; });
    await p.screenshot({ path: path.join(__dirname, out) });
    await p.close();
  }
  await b.close();
})();
