#!/bin/bash
# build house.html: sup_n.js + mil_lib.js + am_lib.js + oe_help.js + sp_help.js (helpers) + hs_b.js (this video)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js hs_b.js > hs_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js hs_new.js > hs_mid.js && node --check hs_mid.js 2>&1 | head -5; python3 build_short.py house hs_mid.js "بيت؟|عشرون|بستمئة|عُشرَ|الهواء،|تقذفك|بسنتيمترين|بالحبال|ستة|الليل.|والغريب؟|كقمر|كرويًّا:|واشتركْ." >/dev/null && python3 - <<'PY'
p='house.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_hs.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
