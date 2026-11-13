#!/bin/bash
# rebuild oneeye.html from sup_n.js + mil_lib.js + bl_lib.js + bl_b.js (saved together as bl_new.js)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js oe_lib.js oe_b.js > oe_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js oe_new.js > oe_mid.js && node --check oe_mid.js 2>&1 | head -5; python3 build_short.py oneeye oe_mid.js "واحدةٍ|المسافة.|عُمقَه…|أصعبَ|وخمسين.|تراه.|احتياطيّة.|أعمى|ذكيّ:|عيناً.|ثلاثيّةُ|عينَين،|والغريب؟|قزمة،|«سايكلوبس»…|فعلاً|واشتركْ." >/dev/null && python3 - <<'PY'
p='oneeye.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_world.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
