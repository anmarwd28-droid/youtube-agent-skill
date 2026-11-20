#!/bin/bash
# build smart.html (#63): the #60 chain without sd_a/sd_b.js + cb_help.js + gn_a.js + iq_a/b/c.js, 3D module gl3d_cb.js (the cube morph off)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js wh_help.js tc_lib.js tc_a.js gt_a.js gt_b.js pl_help.js zb_a.js zb_b.js zb_d.js zb_e.js mx_help.js ex_a.js st_a.js st_b.js ap_a.js ap_b.js hi_a.js hi_b.js tm_a.js tm_b.js sc_a.js sc_b.js cv_a.js cv_b.js ww_a.js ww_b.js w2_a.js w2_b.js cb_help.js gn_a.js iq_a.js iq_b.js iq_c.js > iq_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js iq_new.js > iq_mid.js && node --check iq_mid.js 2>&1 | head -5; python3 build_short.py smart iq_mid.js "عباقرة؟|مئةً|ثمانيةُ|أخفَّ|عشرينَ|ملايينِ|سنوات،|آلاتٍ|أطولَ|حكمة،|متوسّطين.|ثلاثِ|سبعين.|ببطء،|واشتركْ." >/dev/null && python3 - <<'PY'
p="smart.html"; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_cb.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
