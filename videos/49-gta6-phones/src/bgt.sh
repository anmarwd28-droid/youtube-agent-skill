#!/bin/bash
# build gta.html (#49): sup_n.js + mil_lib.js + am_lib.js + oe_help.js + sp_help.js + sw_help.js + ln_lib.js + ppl99.js + ln_a/b/c.js (#46 helpers) + mx_help.js (#43 helpers) + ex_a.js + ex_b.js (this video)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js wh_help.js tc_lib.js tc_a.js gt_a.js gt_b.js gt_c.js > gt_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js gt_new.js > gt_mid.js && node --check gt_mid.js 2>&1 | head -5; python3 build_short.py gta gt_mid.js "سِكس|الهواتف؟|نوفمبر،|فقط.|غيغابايت…|وعشرينَ|خمسة|أقوى|لسخنَ|فيُبطئُ|واط|دقائق.|لازدحمتْ|السحابيّة.|الصورةَ|والمفاجأة؟|ثلاثة،|فايف|واشتركْ." >/dev/null && python3 - <<'PY'
p='gta.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_ex.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
