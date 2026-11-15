# ماذا لو أصبحت الشمس زرقاء؟ — Short #42

67.0 s, 1080x1920, 30 fps. Global framing. Idea #2 from the 13 Nov evening research (8.8–10.5x outlier, 539K): a Sun idea, the channel's strongest category. The Sun keeps its size; only its colour (its surface temperature) changes.

What it shows, in order:
1. The real 3D Earth beside the Sun; the Sun turns blue-white and its light on the Earth turns cold.
2. Three stars light up: red «٣٠٠٠ كلفن», yellow «٥٨٠٠ كلفن», blue «فوقَ ١٠٠٠٠ كلفن»; a colour bar with «أشدُّ حرارة».
3. The 3D Sun close up, turning blue while the counter climbs from ٥٨٠٠ to ١٠٠٠٠ كلفن.
4. The blue Sun (a dashed ring: «الحجمُ نفسُه») sends nine beams to the Earth: «×٩».
5. A city street in harsh blue-white light, a deeper blue sky, people shading their eyes.
6. A UV-index gauge climbs from today's maximum (١١) to ٣٨٥; then a face reddens while a stopwatch reaches ٢٥ ثانية.
7. The Earth heats (thermometer ١٥° → ٢٣٠°), the land dries out and steam rises from the oceans: «المحيطاتُ تغلي».
8. Thick cream clouds wrap the Earth; the camera pulls back to Venus beside it: «سطحُها ٤٦٤°».
9. A big blue star burns fast; bars: «نجمٌ أزرقُ كبير: ملايينُ السنين فقط» against «شمسُنا: ١٠ مليارات سنة».
10. The blue star dies in a supernova; a timeline runs from «وُلِد النجم» to «نحن» (٤٫٥ مليار سنة).
11. Our Earth with a red and a blue star, the question mark and the subscribe button.

Source in `src/`. `bbs.sh` builds `blue.html` from `sup_n.js` + `mil_lib.js` + `am_lib.js` + `oe_help.js` + `sp_help.js` + `sw_help.js` (the #41 globe helpers) + `bs_lib.js` + `bs_b.js`.
- `gl3d_bs.js` is `gl3d_sw.js` (mirror fix kept) with:
  - the Sun's `hue` (0 yellow → 1 blue-white, limb-darkened, fine granulation, blue corona) and `ts` (granulation speed)
  - on the Earth: `lc` (colour of the sunlight), `scorch` (dry land), `boil` (steam over the oceans), `venus` (a thick cream cloud deck)
  - the moon slot carries a Venus texture (`tex/venus_tex.py` → `tex/venus_1024.jpg`), with `r` and `rot`
  - the 3D layer now fades in when the previous scene was 2D (it used to pop in at full opacity).
- `bs_b.js`: `camPt` (a 3D point behind a screen spot), `starD` (an SVG star with granulation and corona), `beams`, `uvGauge`, `stopw`, `thermoH` (0–250 °C).
- `bs_lib.js`: `street5` (shops عصائر, هدايا, حلاق, مطعم, قرطاسية; new blocks and trees; sun position and colour options).

## Title
ماذا لو أصبحت الشمس زرقاء؟ 🔵☀️

(vidIQ title score 81. yt-package lint: 30 characters, inside both the mobile and desktop cuts.)

## Description
ماذا لو أصبحت الشمس زرقاء؟ نجمٌ أزرق أحرّ بكثير: طاقة أكبر بتسع مرات، وأشعة فوق بنفسجية تحرق الجلد في أقل من دقيقة!
ومحيطات تغلي، وأرض تصبح جحيمًا مثل كوكب الزهرة… والمفاجأة في عمر النجوم الزرقاء.
أيّ لون تختار لشمسنا؟ اكتب في التعليقات.

#ماذا_لو #الشمس #النجوم #الفضاء #علوم #هل_تعلم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو أصبحت الشمس زرقاء, الشمس الزرقاء, نجم أزرق, لون النجوم, حرارة الشمس, الأشعة فوق البنفسجية, كوكب الزهرة, الفضاء, الشمس, علوم, هل تعلم, what if the sun was blue

## Settings
Not made for kids · not altered/synthetic content · Science & Technology · Arabic · cover at 1 s

## Search queries this should win
ماذا لو أصبحت الشمس زرقاء · الشمس الزرقاء · لماذا النجوم الزرقاء أحر. The title and the first two description lines carry these words. No keyword research (vidIQ credits are low); the Short lives on the Shorts feed.

## Facts (as narrated)
Scenario: the Sun keeps its radius and mass; only its surface temperature rises until it shines blue-white.
- **Star colour = temperature:** a star's colour follows its surface temperature (black-body radiation, Wien's law). Red stars (M) are the coolest, about 2,400–3,700 K; the Sun (G2) is about 5,772 K; blue and blue-white stars (B, O) are above about 10,000 K (Rigel about 12,000 K, Spica about 22,000 K). Shown: red ٣٠٠٠ كلفن, yellow ٥٨٠٠ كلفن, blue فوقَ ١٠٠٠٠ كلفن.
- **«من ستّة آلاف إلى عشرة آلاف»:** the Sun's photosphere is about 5,772 K (≈ 6,000); the scenario uses 10,000 K.
- **Nine times the energy:** at the same radius, luminosity scales as T⁴ (Stefan–Boltzmann): (10,000 / 5,772)⁴ ≈ 9.0.
- **Blue-white light, deeper blue sky:** a 10,000 K black body peaks near 290 nm and looks blue-white to the eye; the sky scatters short wavelengths (Rayleigh, ∝ λ⁻⁴), so with a bluer source it turns a deeper blue.
- **UV more than thirty times:** black-body ratio of a 10,000 K to a 5,772 K star of the same size: UV-B (280–315 nm) ≈ 35×, UV-A ≈ 20×, visible ≈ 8×. The fraction of the output in UV rises from about 12% to about 48%. Shown: the UV index going from 11 (today's extreme) to about 385 (11 × 35), assuming the ozone layer filters the same fraction.
- **Skin burns in under a minute:** at a UV index of about 11, fair skin burns in about 10–15 minutes; 35 times the UV-B gives about 20–25 seconds. The stopwatch stops at 25 s.
- **Over 200 degrees:** equilibrium temperature scales as L^¼: 9^¼ ≈ 1.73. Today's mean surface temperature of about 288 K (15 °C) becomes about 499 K ≈ 226 °C with the same albedo and greenhouse effect. Shown: 15° → 230°.
- **The oceans boil, the steam traps more heat:** water vapour is a greenhouse gas; above about 1.1–1.4 times today's sunlight, models show a runaway greenhouse that boils the oceans. Nine times is far beyond that.
- **Like Venus:** Venus receives about 1.9 times Earth's sunlight; a runaway greenhouse left it with thick clouds and a surface of about 464 °C. Venus's radius is about 95% of Earth's, so they are drawn almost the same size.
- **Real blue stars live millions of years, not billions:** massive O and B stars burn their fuel much faster; their main-sequence lifetimes run from a few million years (O) to a few hundred million (late B). The Sun's total lifetime is about 10 billion years.
- **It would have died billions of years before us:** the Earth is about 4.54 billion years old and modern humans appeared about 300,000 years ago, so a blue star would have died more than 4 billion years before people existed. Massive blue stars end as supernovae (shown).
- **Global framing:** the street and the people stand for any city in the world.
