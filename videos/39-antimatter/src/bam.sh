#!/bin/bash
# rebuild anti.html from sup_n.js + mil_lib.js + sp_lib.js + oe_b.js (helpers) + sp_b.js
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js am_b.js > am_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js am_new.js > am_mid.js && node --check am_mid.js 2>&1 | head -5; python3 build_short.py anti am_mid.js "المضادّة؟|معكوسةٌ|يَفنى|غاما|هيروشيما.|ميغاطن…|بالتساوي|مليارِ|سيرن…|والغريب؟|بوزيترونٍ|واشتركْ." >/dev/null && python3 - <<'PY'
p='anti.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_world.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
