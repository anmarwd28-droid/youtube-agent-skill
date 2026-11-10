#!/bin/bash
# rebuild flat3.html from flat3_new.js
cd "$(dirname "$0")" && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js flat3_new.js > flat3_mid.js && python3 build_short.py flat3 flat3_mid.js "مسطّحةً|كرة.|مركزِ|جبلاً|بحرٌ|جافّةٌ|كلُّه|تصغرُ|الحافّة…|دائريٌّ|التعليقات." >/dev/null && python3 - <<'PY'
p='flat3.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_world.js'))
s=s.replace("if (!sc || sc.f === sceneEarth) return '';","if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';").replace("moon: F.moon, light: F.light","moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
