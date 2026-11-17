#!/bin/bash
# build lone.html: sup_n.js + mil_lib.js + am_lib.js + oe_help.js + sp_help.js (helpers) + sw_help.js (#41 globe/terrain helpers) + ln_lib.js (street9) + ppl99.js + ln_a/b/c/d.js (this video)
cd "$(dirname "$0")" && cat sup_n.js mil_lib.js am_lib.js oe_help.js sp_help.js sw_help.js ln_lib.js ppl99.js ln_a.js ln_b.js ln_c.js ln_d.js > ln_new.js && cat people_helpers.js plants_animals.js plants_real.js scene_lib.js real2.js red_street.js trees_real.js ln_new.js > ln_mid.js && node --check ln_mid.js 2>&1 | head -5; python3 build_short.py lone ln_mid.js "تسعةٌ|وتسعونَ|مليوناً|إنساناً|الكهرباء،|الإنترنت.|المعلّباتِ|مفاعلٍ|الإشعاع.|النباتاتُ|الحيواناتُ|لغة،|أدوية.|قريةً|الأقارب،|والمفاجأة؟|ثمانيةً|وتسعين|واشتركْ." >/dev/null && python3 - <<'PY'
p='lone.html'; s=open(p).read()
mod = "<script type=\"module\">import { init } from './gl3d_v2.js';"
assert mod in s
s=s.replace(mod, '<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>\n' + mod.replace('gl3d_v2.js','gl3d_ln.js'))
a="if (!sc || sc.f === sceneEarth) return '';"; assert a in s
s=s.replace(a,"if (!sc || sc.f === sceneEarth || (typeof NOKB !== 'undefined' && NOKB.has(sc.f))) return '';")
a="moon: F.moon, light: F.light"; assert a in s
s=s.replace(a,"moon: F.moon, sun: F.sun, disc: F.disc, w: F.w, light: F.light")
open(p,'w').write(s); print('built')
PY
