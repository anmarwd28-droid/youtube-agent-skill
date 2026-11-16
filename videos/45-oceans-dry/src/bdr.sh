#!/bin/bash
# build dry.html: sup_n.js + mil_lib.js + am_lib.js + oe_help.js + sp_help.js (helpers) + sw_help.js (#41 globe/terrain helpers) + dr_lib.js (street8) + dr_b.js (this video)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js dr_lib.js dr_b.js > dr_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js dr_new.js > dr_mid.js && node --check dr_mid.js 2>&1 | head -5; python3 build_short.py dry dr_mid.js "المحيطاتُ|سلسلةِ|إيفرست.|السفنُ|ملحٌ|المطرُ|صحراء.|حارق،|متجمّد،|عواصفُ|الرمال.|الأكسجين.|والمفاجأة؟|المريخ:|واشتركْ." >/dev/null && python3 - <<'PY'
p='dry.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_dry.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
