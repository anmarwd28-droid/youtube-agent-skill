#!/bin/bash
# build cov.html (#57): the #54 chain without tm_c.js + cv_a/b/c.js, 3D module gl3d_cv.js (made by mk_cv.py)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js wh_help.js tc_lib.js tc_a.js gt_a.js gt_b.js pl_help.js zb_a.js zb_b.js zb_d.js zb_e.js mx_help.js ex_a.js st_a.js st_b.js ap_a.js ap_b.js hi_a.js hi_b.js tm_a.js tm_b.js sc_a.js sc_b.js cv_a.js cv_b.js cv_c.js > cv_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js cv_new.js > cv_mid.js && node --check cv_mid.js 2>&1 | head -5; python3 build_short.py cov cv_mid.js "كورونا|أسرعُ|الإغلاق.|الأكسجين،|ثلاثينَ|عشرينَ|مليارٍ|مناعةٌ|ديكساميثازون،|نوبل.|السرطان.|واشتركْ." >/dev/null && python3 - <<'PY'
p="cov.html"; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_cv.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
