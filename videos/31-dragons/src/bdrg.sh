#!/bin/bash
# rebuild sup.html from sup_a.js + sup_b.js (saved together as sup_new.js)
cd "$(dirname "$0")" && cat sup_a.js mil_lib.js drg_b.js > drg_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js drg_new.js > drg_mid.js && node --check drg_mid.js 2>&1 | head -5; python3 build_short.py drg drg_mid.js "التنانينُ|عملاقة:|عشرَ|أربعةُ|ذراعاه.|ممكنة!|الميثانِ|شرارةً|مجوّفةً|صدرٍ|خروفٍ|المطارات،|تحترق.|والغريب؟|كومودو،|سامّة.|التعليقات." >/dev/null && python3 - <<'PY'
p='drg.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_world.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
