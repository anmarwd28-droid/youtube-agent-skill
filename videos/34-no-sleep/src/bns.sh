#!/bin/bash
# rebuild nosleep.html from sup_n.js + mil_lib.js + ns_b.js (saved together as ns_new.js)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js ns_b.js > ns_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js ns_new.js > ns_mid.js && node --check ns_mid.js 2>&1 | head -5; python3 build_short.py nosleep ns_mid.js "عشرةَ|ليلةٍ|أربعينَ|ينظّفُ|تتراكمُ|غفواتٌ|مفتوحتان.|تضعف:|بأربعِ|الهلوسة:|موجودة.|سبعةً|وستّين،|والغريب؟|أحدَ|عشرَ|فقط،|بخير.|واشتركْ." >/dev/null && python3 - <<'PY'
p='nosleep.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_world.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
