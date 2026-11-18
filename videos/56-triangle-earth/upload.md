# ماذا لو كانت الأرض على شكل مثلث؟ — Short #56

79 s, 1080x1920, 30 fps. The user's idea (18 Nov): «ماذا لو اصبحت الارض مثلثه» (he asked for it to be made on its own while he sleeps, NOT scheduled before he watches it). Read as a regular triangular pyramid (tetrahedron) with the same volume as the Earth. ElevenLabs: 928 characters (about 7,950 of 10,000 left). vidIQ: 10 credits (two title scores: «ماذا لو كانت الأرض على شكل مثلث؟» 89, «ماذا لو أصبحت الأرض مثلثة؟» 82). yt-package (title.py: all four candidates 76) and yt-seo used; no outlier search ("the Earth as a cube" was already a proven outlier in `reference/videos.md`).

What it shows, in order:
1. The real 3D Earth folds into a triangular pyramid (the Earth's map on four flat faces); chip «الأرضُ… مثلّثة».
2. The pyramid turns; gold dots on its four corners; a dashed circle shows today's round Earth «الأرضُ اليوم»; chips «٤ وجوهٍ مثلّثة», «بنفسِ الحجم».
3. A true cross-section (through one edge and the middle of the opposite edge): a hot core, white arrows of gravity pointing to the centre; the face centres are the closest points «٤٬٣٠٠ كم», a corner is far «١٢٬٨٠٠ كم»; sea and air gather at the face centres. Chips «الجاذبيّةُ نحوَ المركز», «وسطُ الوجهِ هو الأقرب».
4. The 3D pyramid: the continents fade and the water runs into one round sea in the middle of each face, surrounded by bare rock; chip «٤ بحارٍ فقط».
5. A man walks away from the sea up a straight rocky plane that feels like a mountain; the angle grows; chips «الأرضُ المستويةُ… جبل», «ميلٌ ≈ ٥٥°».
6. The 3D pyramid seen low: a dashed line from the sea up to the corner «أعلى بـ ٨٬٥٠٠ كم»; chips «أكثرُ من ٨٬٠٠٠ كم», «في الفضاء».
7. The summit: a frozen rock spire under a black starry sky, the Sun hard and white; chip «بلا هواءٍ ولا ماء». Side list «الأرضُ المثلّثة».
8. The sunlight swings onto one face and the whole face lights up at once; three horizons with the Sun rising together at «06:00»; chips «والغريب؟», «شروقٌ واحدٌ لربعِ العالم».
9. A shore town on a narrow coast below a rock wall that climbs into the dark sky; the pyramid unfolded into four triangles with a sea in each, numbered ١–٤; chip «٤ حضاراتٍ منفصلة».
10. A small irregular asteroid «صغير — شكلٌ غيرُ منتظم» next to a round icy moon «كرة — أكبرُ من بضعِ مئاتِ الكيلومترات»; arrows of gravity squeeze a triangle into a circle; chips «والمفاجأة؟», «الجاذبيّةُ تصنعُ الكرة».
11. The 3D pyramid shakes, its edges glow orange and the corners sink until it is the round Earth again; chip «زلازلُ هائلة».
12. The round Earth turns; chip «كلُّ الكواكبِ مستديرة».
13. The Earth, the question mark and the subscribe button.

Source in `src/`. `btr.sh` builds `tri.html` from the #54 helper chain (without `tm_c.js`) and this video's `tr_a.js` (`TRV`/`TRF` the corners and face centres, `tri3` the 3D pyramid, `triP` a corner on screen, `starsK`, `arrowT`, `xsec` the true cross-section, `rockS` from #45; scenes 0-6) and `tr_b.js` (`netInset` the unfolded pyramid, `potato` an asteroid, `mimas` a round icy moon; scenes 7-12, chips and the list). 3D module `gl3d_tr.js` is made by `mk_tr.py` from `gl3d_ap.js`: `disc.tet` folds the globe into a tetrahedron of the same volume (flat face normals in the fragment shader, mesh 360x900 so the edges stay sharp), `disc.pool` (four round seas, bare rock, frost near the corners), `disc.quake` (glowing edges). Audio: `audio_tr.py`.

## Title
ماذا لو كانت الأرض على شكل مثلث؟ 🔺

(vidIQ title score 89. yt-package title.py: 34 characters, inside both cuts.)

## Description
ماذا لو كانت الأرض على شكل مثلث؟ هرم بأربعة وجوه: تجري المحيطات إلى وسط كل وجه، وترتفع الزوايا أكثر من ٨٠٠٠ كيلومتر في الفضاء، وتشرق الشمس في اللحظة نفسها على ربع العالم.
والمفاجأة: هذا الشكل لا يدوم… لماذا كل الكواكب مستديرة؟
برأيك، أي شكل غريب نجرّب في المرة القادمة؟ اكتب في التعليقات.

#ماذا_لو #الأرض #الجاذبية #علوم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو كانت الأرض مثلثة, ماذا لو كانت الأرض على شكل مثلث, الأرض مثلثة, شكل الأرض, لماذا الأرض كروية, لماذا الكواكب مستديرة, الجاذبية, الأرض المكعبة, الأرض المسطحة, علوم, فضاء, what if earth was a triangle

## Settings
Not made for kids · not altered/synthetic content · Education · Arabic · cover at 2.3 s (the Earth as a triangular pyramid)

## Search queries this should win
ماذا لو كانت الأرض مثلثة · لماذا الأرض كروية · لماذا الكواكب مستديرة.

## Facts (as narrated)
- **The shape:** a regular tetrahedron (four equilateral triangles) with the Earth's volume (1.083 × 10¹² km³): V = a³ / (6√2) → edge a ≈ 20,900 km. Inradius r = a / (2√6) ≈ 4,270 km (centre to the middle of a face); circumradius R = 3r ≈ 12,800 km (centre to a corner); centre to the middle of an edge = √3 r ≈ 7,400 km.
- **Gravity to the centre:** taken, as in the usual "cube Earth" thought experiment, to point roughly at the centre of mass. The closest points to the centre are the face centres, so water and air settle there: four round seas (with the Earth's ocean volume shared out, each sea is a lens about 2,300 km across and up to roughly 150 km deep).
- **The slope:** where gravity points to the centre but the ground is a flat plane, the ground feels tilted by the angle between the plane's normal and the line to the centre: cos θ = r / d. At the middle of an edge d = √3 r → θ ≈ 54.7° ("نحو ٥٥ درجة"); at a corner d = 3r → θ ≈ 70.5°.
- **The corners:** 12,800 − 4,270 ≈ 8,500 km farther from the centre than the face centres ("more than 8,000 km"); Earth's atmosphere is effectively gone by about 100 km, so the corners and edges are in space: no air, no liquid water, frozen rock.
- **One sunrise:** every point of a flat face has the same horizon plane, so the Sun crosses it at the same moment for the whole face (a quarter of the surface).
- **Four civilisations:** each sea is cut off from the others by edges that rise into space; said as a consequence of the geometry.
- **Why it cannot last:** above a few hundred kilometres, self-gravity overcomes the strength of rock and ice and pulls a body into a near-sphere (hydrostatic equilibrium); Saturn's moon Mimas (≈ 396 km) is about the smallest round body known, smaller asteroids are irregular. A tetrahedral Earth would collapse, with enormous earthquakes, back into a sphere.
