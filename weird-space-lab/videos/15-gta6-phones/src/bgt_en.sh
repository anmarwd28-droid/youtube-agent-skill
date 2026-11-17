#!/bin/bash
# build gta_en.html: the English version of #49 for Weird Space Lab. Same helpers; tc_lib_en.js + gt_a/b/c_en.js (English text);
# the scene events keep the Arabic word timings, remapped line by line onto the English narration (window.TA).
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js wh_help.js tc_lib_en.js tc_a.js gt_a_en.js gt_b_en.js gt_c_en.js > gten_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js gten_new.js > gten_mid.js && node --check gten_mid.js 2>&1 | head -5; python3 build_short.py gta_en gten_mid.js "GTA|phone?|nineteenth,|PlayStation|gigabytes,|twenty-eight.|several|stronger|heat|slow|watts|six|minutes.|jam.|cloud|gaming.|picture.|twist?|thirteen.|comments." >/dev/null && python3 - <<'PY'
import json
p='gta_en.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_ex.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
# English fonts and left-to-right text
s=s.replace("<style>","<style>\n  @font-face { font-family: 'Inter Display'; src: url('InterDisplay-Bold.otf'); font-weight: 700 800; }\n  @font-face { font-family: 'Inter Display'; src: url('InterDisplay-Medium.otf'); font-weight: 500; }",1)
s=s.replace("#cap .line { font-family: 'Noto Naskh Arabic', serif; direction: rtl; font-size: 46px;","#cap .line { font-family: 'Inter Display', sans-serif; direction: ltr; font-size: 44px;")
s=s.replace("font-family: 'Noto Naskh Arabic', serif","font-family: 'Inter Display', sans-serif").replace("direction: rtl","direction: ltr")
s=s.replace('font-family="Noto Naskh Arabic"','font-family="Inter Display"').replace('direction="rtl"','direction="ltr"')
a="const AR = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace('.', '٫');"; assert a in s
s=s.replace(a,"const AR = n => String(n);")
# scene events: the Arabic word times, remapped into the English line windows
ta=json.load(open('gta/timing.json'))
a="const WS = (i, j) => TM[i].words[Math.min(j, TM[i].words.length - 1)][1];"; assert a in s
s=s.replace(a,"const TA = "+json.dumps(ta,ensure_ascii=False)+";\nconst WS = (i, j) => { const A = TA[i], w = A.words[Math.min(j, A.words.length - 1)][1], E = TM[i], f = (w - A.start) / Math.max(.01, A.end - A.start); return E.start + f * (E.end - E.start); };")
open(p,'w').write(s); print('built')
PY
