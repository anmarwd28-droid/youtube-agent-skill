#!/bin/bash
# build star.html (#51): the #50 helper chain (without its scenes file zb_c.js) + mx_help.js + ex_a.js (#48) + st_a/b/c.js (this video)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js wh_help.js tc_lib.js tc_a.js gt_a.js gt_b.js pl_help.js zb_a.js zb_b.js zb_d.js zb_e.js mx_help.js ex_a.js st_a.js st_b.js st_c.js > st_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js st_new.js > st_mid.js && node --check st_mid.js 2>&1 | head -5; python3 build_short.py star st_mid.js "شمس؟|الهيدروجين،|مليونَ|ستّةِ|آلافِ|خمسةٍ|وعشرينَ|الحديدِ|والصخر.|سحابةً|القمرُ|ساعة.|تغلي،|تذوب،|نجماً|أحمرَ|المرّيخ،|حمراء.|والمفاجأة؟|تريليوناتِ|واشتركْ." >/dev/null && python3 - <<'PY'
p='star.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_es.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
