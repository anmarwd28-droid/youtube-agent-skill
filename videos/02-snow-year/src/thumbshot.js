const { chromium } = require('playwright'); const { spawn } = require('child_process');
(async () => { const srv = spawn('python3', ['-m', 'http.server', '8840', '--bind', '127.0.0.1', '--directory', __dirname], { stdio: 'ignore' }); await new Promise(r => setTimeout(r, 1200));
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  p.on('pageerror', e => console.log('ERR', e.message));
  await p.goto('http://127.0.0.1:8840/thumb.html'); await p.waitForFunction(() => window.sceneReady, null, { timeout: 120000 });
  await p.evaluate(async () => { await document.fonts.load('900 150px Cairo', 'تثلج'); await document.fonts.ready; });
  await p.screenshot({ path: process.argv[2], type: 'jpeg', quality: 92 }); await b.close(); srv.kill(); })();
