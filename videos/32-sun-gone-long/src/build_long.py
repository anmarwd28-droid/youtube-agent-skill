# Long horizontal video (1280x720 page, rendered at 1920x1080): same template as the Shorts, turned to landscape.
# usage: python3 build_long.py <name> "<kw1|kw2>" file1.js file2.js ...   (needs <name>/chap_times.json)
import re, sys, json
name, keys, files = sys.argv[1], sys.argv[2].split('|'), sys.argv[3:]
a = open('animals2_src.html').read()
head = a[:a.index('// ---------- scenes ----------')]
head = head.replace('.chip.red {', '.chip.ice { background: rgba(225,242,255,.95); color: #0d2238; }\n  .chip.red {', 1)
head = re.sub(r"const KEY = new Set\(\[.*?\]\);", 'const KEY = new Set(' + json.dumps(keys, ensure_ascii=False) + ');', head, flags=re.S)
head = head.replace('width: 720px; height: 1280px', 'width: 1280px; height: 720px').replace('width:720px;height:1280px', 'width:1280px;height:720px')
head = head.replace('width="720" height="1280"', 'width="1280" height="720"').replace('viewBox="0 0 720 1280"', 'viewBox="0 0 1280 720"')
assert '720px; height: 1280' not in head and 'height="1280"' not in head
css = '''<style>
  #cap { left: 70px; right: 70px; top: 20px; }
  #cap .line { font-size: 40px; line-height: 1.5; text-shadow: 0 2px 14px rgba(0,0,0,.85), 0 0 4px rgba(0,0,0,.6); }
  #cap .line.big { font-size: 54px; }
  .chip { font-size: 26px; } .chip.big { font-size: 34px; padding: 6px 22px 10px; }
  .list { top: 132px; right: 18px; width: 196px; height: 452px; }
  .list .it { width: 150px; font-size: 19px; }
  #note { display: none; }
  #dim { position: absolute; inset: 0; background: #04060f; opacity: 0; }
  #chT { position: absolute; left: 0; right: 0; top: 250px; text-align: center; direction: rtl; opacity: 0; }
  #chT .n { font-family: 'Noto Naskh Arabic', serif; font-size: 26px; font-weight: 700; color: rgba(255,255,255,.75); letter-spacing: 1px; }
  #chT .t { font-family: 'Noto Naskh Arabic', serif; font-size: 104px; font-weight: 700; color: #f4c76b; line-height: 1.35; text-shadow: 0 6px 30px rgba(0,0,0,.8); }
  #chT .ln { margin: 6px auto 0; height: 4px; background: #f4c76b; border-radius: 2px; }
  #chTag { position: absolute; left: 22px; top: 656px; padding: 4px 16px 8px; border-radius: 12px; background: rgba(8,12,30,.72); border: 1px solid rgba(244,199,107,.55); color: #f4c76b; font-family: 'Noto Naskh Arabic', serif; font-weight: 700; font-size: 22px; direction: rtl; opacity: 0; white-space: nowrap; }
</style>
</head>'''
head = head.replace('</head>', css, 1)
head = head.replace('<div id="ui"></div>', '<div id="dim"></div><div id="ui"></div><div id="chT"><div class="n"></div><div class="t"></div><div class="ln"></div></div><div id="chTag"></div>', 1)
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in head
head = head.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js', 'gl3d_wide.js'))
head = head.replace('<stop offset="0" stop-color="#000" stop-opacity=".55"/><stop offset=".22" stop-color="#000" stop-opacity=".25"/><stop offset=".34" stop-color="#000" stop-opacity="0"/>', '<stop offset="0" stop-color="#03050c" stop-opacity=".86"/><stop offset=".1" stop-color="#03050c" stop-opacity=".7"/><stop offset=".17" stop-color="#03050c" stop-opacity=".3"/><stop offset=".26" stop-color="#03050c" stop-opacity="0"/>')
assert 'stop-opacity=".86"' in head
tail = '''window.render = function (t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const cur = SCENES[i], prev = SCENES[i - 1], xf = cur.xf ?? XF, k = prev ? ease(ramp(t, cur.s, cur.s + xf)) : 1;
  F = { t }; let ovA = '', FA = null;
  if (prev && k < 1) { $('sA').innerHTML = prev.f(t); ovA = F.ov || ''; FA = { t, w: F.w, opacity: 1 - k }; } else $('sA').innerHTML = '';
  F = { t };
  $('sB').innerHTML = cur.f(t); $('sB').setAttribute('opacity', k);
  $('oA').innerHTML = ovA; $('oA').setAttribute('opacity', 1 - k); $('oB').innerHTML = F.ov || ''; $('oB').setAttribute('opacity', k);
  F.opacity = k;
  if (window.GLA) GLA.draw(FA || { t, opacity: 0 });
  if (window.GL) GL.draw(F);
  $('turb').setAttribute('seed', String(Math.floor(t * 24) % 50));
  $('flash').setAttribute('opacity', F.flash || 0);
  $('fade').setAttribute('opacity', clamp((t - (TOTAL - .5)) / .5) + (1 - ramp(t, 0, .4)) + (F.black || 0));
  renderCap(t); renderUI(t);
};
</script>
</body>
</html>
'''
cht = 'const CHT = ' + open(name + '/chap_times.json').read() + ';\n'
src = head + cht + '\n'.join(open(f).read() for f in files) + '\n' + tail
sun = open('sun.html').read().split('\n')
src = src.replace('//@@FISH@@', '\n'.join(sun[371:390])).replace('//@@SHARED@@', '\n'.join(sun[102:158])).replace('//@@PERSON@@', '\n'.join(sun[212:260])).replace('//@@LAMP@@', '\n'.join(sun[278:283]))
open(name + '.html', 'w').write(src); print('built', name, len(src))
