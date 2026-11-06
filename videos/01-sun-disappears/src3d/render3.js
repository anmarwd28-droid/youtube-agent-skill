// usage: node render2.js <html> <audio> <outMp4> <total> [stillsDir t1,t2,...]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const [html, audio, outMp4, totalS, stillsDir, stillsList] = process.argv.slice(2);
  const total = Number(totalS), fps = 30;
  const srv = spawn('python3', ['-m', 'http.server', String(process.env.PORT || 8765), '--bind', '127.0.0.1', '--directory', __dirname], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 1200));
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 720, height: 1280 }, deviceScaleFactor: 1.5 });
  page.on('pageerror', e => console.log('PAGEERROR', e.message));
  const timing = JSON.parse(require('fs').readFileSync(process.env.TIMING, 'utf8')); await page.addInitScript(([tm, t]) => { window.TIMING = tm; window.TOTAL = t; }, [timing, total]);
  await page.goto('http://127.0.0.1:' + (process.env.PORT || 8765) + '/' + path.basename(html)); await page.waitForFunction(() => window.sceneReady || window.GL, null, { timeout: 180000 });
  await page.evaluate(async () => {
    await Promise.all(['700 46px "Noto Naskh Arabic"', '700 20px "Noto Naskh Arabic"', '700 58px Amiri', '700 92px "Space Grotesk"', '500 25px "Cormorant Garamond"'].map(f => document.fonts.load(f, 'اليقين abc')));
    await document.fonts.ready;
  });
  if (stillsDir) {
    for (const t of stillsList.split(',').map(Number)) { await page.evaluate(t => render(t), t); await page.screenshot({ path: path.join(stillsDir, `s_${t}.jpg`), type: 'jpeg', quality: 85 }); }
    await browser.close(); srv.kill(); return;
  }
  const n = Math.ceil(total * fps), f0 = Number(process.env.F0 || 0), f1 = Number(process.env.F1 || n), noAudio = !!process.env.F1;
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-', ...(noAudio ? [] : ['-i', audio]),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', '-r', String(fps), '-profile:v', 'high',
    ...(noAudio ? [] : ['-c:a', 'aac', '-b:a', '192k', '-ar', '44100', '-af', `apad,atrim=0:${total}`, '-t', String(total)]), '-movflags', '+faststart', outMp4], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = f0; i < f1; i++) {
    await page.evaluate(t => render(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 90 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await browser.close(); srv.kill(); console.log('done');
})();
