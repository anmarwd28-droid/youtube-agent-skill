# ماذا لو كانت الأرض مربعة؟ — Short #61

78.8 s, 1080x1920, 30 fps. The user's idea (19 Nov): «سوي ماذا لو كانت الارض مربعه». Read as a cube with the same volume as the Earth. ElevenLabs: 953 characters (about 3,770 of 10,000 left, resets 16 Dec). vidIQ: 10 credits (two title scores: «ماذا لو كانت الأرض مربعة؟ 🟫» 86, «ماذا لو كانت الأرض مكعبة؟» 85). yt-package (title.py: all five candidates 76) and yt-seo used; no outlier search ("the Earth as a cube" is already a proven outlier in `reference/videos.md`).

What it shows, in order:
1. The real 3D Earth folds into a cube (the Earth's map on six flat faces); chip «الأرضُ… مربّعة».
2. The cube turns; gold dots on its visible corners; a dashed circle shows today's round Earth «الأرضُ اليوم»; a gold bottom edge «≈ ١٠٬٣٠٠ كم»; chips «بنفسِ حجمِ الأرض», «٦ وجوهٍ مربّعة».
3. A true cross-section through the face centres (a square): a hot core, white arrows of gravity pointing to the centre; the middle of a face is the closest point «٥٬١٠٠ كم», an edge is far «٧٬٣٠٠ كم»; sea and air gather over the face centres. Chips «الجاذبيّةُ نحوَ المركز», «وسطُ الوجهِ هو الأقرب».
4. The 3D cube: the continents and oceans fade into bare rock relief and the water runs into one round sea in the middle of each face; a panel compares the deepest sea today «١١ كم» with the cube sea «٨٦ كم». Chips «٦ بحارٍ مستديرة», «أعمقُ من ٨٠ كم».
5. Close over one face: the round sea with a thin green shore ring traced in gold «عرضُها عشراتُ الكيلومترات فقط», blue air only over the sea; chips «الهواءُ يتجمّعُ أيضاً», «الحياةُ في حلقةٍ ضيّقة».
6. A man walks away from the sea, past a narrow grassy shore, up a straight rocky plane that tilts more and more; chip «أرضٌ مستوية… كجبل».
7. On the edge: looking along a knife-edge ridge in black space, an astronaut on the ridge, both faces falling away at 45°; chips «على الحافّة», «منحدرانِ ٤٥°».
8. The 3D cube: a dashed line from a face centre to a corner «+ ٣٬٧٦٠ كم»; chip «الزوايا أبعدُ عن المركز».
9. A frozen three-sided corner peak under the stars and a hard white Sun, an astronaut on the tip; chips «في الفضاء», «بلا هواءٍ ولا ماء»; side list «الأرضُ المربّعة».
10. Twist: two bathroom scales for the same person «عندَ البحر ٨٠ كغ», «عندَ الزاوية ٥٠ كغ»; chips «والغريب؟», «أخفُّ بأكثرَ من الثلث».
11. The sunlight swings onto one face and the whole face lights up at once; three horizons with the Sun rising together at «06:00»; chip «شروقٌ واحدٌ للوجهِ كلِّه».
12. Surprise: the cube shakes, white arrows press on the corners, the edges glow orange and it sinks into the round Earth; chips «والمفاجأة؟», «لا تبقى مكعّباً», «الجاذبيّةُ تسحقُ الزوايا», «زلازلُ لا تتوقّف», «كرةٌ من جديد», «لهذا… الأرضُ كرويّة».
13. The Earth, the question mark and the subscribe button.

Source in `src/`. `bcb.sh` builds `cube.html` from the #54 helper chain (without `tm_c.js`) plus `cb_help.js` (rockS, starsK, arrowT from #56 and `astro` from #40), `cb_a.js` (`CBV`/`CBF` corners and face centres, `cube3`, `cbP`, `faceV`/`cornerV` visibility, `onFace` a point on a face, `xsecC` the square cross-section, `depthPanel`, scenes 0-6) and `cb_b.js` (`scaleW` bathroom scale, scenes 7-12, chips and the list). 3D module `gl3d_cb.js` is made by `mk_cb.py` then `mk_cb2.py` from `gl3d_ap.js`: `disc.tet` folds the globe into a cube of the same volume (half side 0.806 R, flat face normals in the fragment shader), `disc.pool` (six round seas, a green shore ring, blue air near the seas; bare rock from a height field `cbH` with relief shading from a procedural bump, frost only near the corners), `disc.quake` (glowing edges). Audio: `audio_cb.py`. Physics check: `cube_phys.py`.

## Title
ماذا لو كانت الأرض مربعة؟ 🟫

(vidIQ title score 86. yt-package title.py: 27 characters, inside both cuts.)

## Description
ماذا لو كانت الأرض مربعة؟ مكعّب بستة وجوه بنفس حجم الأرض: تهرب المحيطات من الحواف إلى ستة بحار مستديرة أعمق من ٨٠ كيلومتراً، وتصبح الحواف قمماً حادة، والزوايا في الفضاء بلا هواء… ووزنك هناك أخف بأكثر من الثلث.
والمفاجأة: الأرض لا تبقى مكعّباً… لماذا الأرض كروية؟
برأيك، أي شكل نجرّب بعد المربع؟ اكتب في التعليقات.

#ماذا_لو #الأرض #الجاذبية #علوم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو كانت الأرض مربعة, الأرض مربعة, ماذا لو كانت الأرض مكعبة, الأرض المكعبة, شكل الأرض, لماذا الأرض كروية, لماذا الكواكب مستديرة, الجاذبية, الأرض المسطحة, الأرض مثلثة, علوم, فضاء, what if earth was a cube, cube earth

Search queries this should win (yt-seo query test): «ماذا لو كانت الأرض مربعة», «الأرض مكعبة», «لماذا الأرض كروية». The title and the first two description lines contain these words.

## Settings
YouTube Short, category Education, not made for kids, cover frame at 1.5 s (the cube just formed), Arabic.

## Facts (numbers and sources)
- A cube with the Earth's volume (4/3·π·R³, R = 6,371 km): side a = (4π/3)^(1/3)·R = 1.612·R ≈ 10,270 km («نحوَ عشرةِ آلافِ كيلومتر», «≈ ١٠٬٣٠٠ كم»). Face centre to centre a/2 ≈ 5,135 km, edge middle a/√2 ≈ 7,262 km, corner a·√3/2 ≈ 8,894 km. A corner is 8,894 − 5,135 ≈ 3,760 km farther from the centre than a face centre («بنحوِ أربعةِ آلافِ كيلومتر»).
- Gravity of a uniform cube (mean Earth density 5,514 kg/m³), computed numerically in `src/cube_phys.py` (sum over 120³ cells, points just above the surface): face centre g ≈ 9.56 m/s² (a sphere: 9.82), edge middle ≈ 7.8 m/s², corner ≈ 5.9 m/s². 5.9 / 9.56 ≈ 0.62, so a person of 80 kg at the sea weighs like 50 kg at a corner: more than a third lighter.
- Local slope: the angle between gravity and the flat face grows from 0° at the face centre to 45° at the edge middle and about 55° (54.7°) at a corner; on the edge itself the two faces fall away at 45° on each side. (Computed in `cube_phys.py`; at the corner the tilt equals the geometric angle atan(√2) = 54.7°.)
- Water and air run downhill to the lowest gravitational potential, the face centres. With the ocean volume (1.335 billion km³, NOAA) split into six, the equipotential lens over each face centre is ≈ 86 km deep at the middle and ≈ 1,290 km in radius (computed in `cube_phys.py`); the deepest point today, the Challenger Deep, is ≈ 11 km. The land rises about 5 km above the sea within some 30–40 km of the shore (the potential grows as r²), so breathable air covers only a narrow ring of shore.
- The edges and corners lie hundreds to thousands of km above the sea in potential (≈ 1,460 km for an edge middle, ≈ 2,400 km for a corner in g·h terms), far above the air (half the atmosphere's mass is below ≈ 5.5 km): bare frozen rock in space.
- A flat face has one horizon for every point on it, so the Sun rises at the same moment over the whole face.
- Hydrostatic equilibrium: bodies larger than a few hundred kilometres pull themselves into a round shape (rocky bodies above ≈ 600 km, icy ones above ≈ 400 km; Vesta, 525 km, is not round, Ceres, 940 km, is). The Earth's rock cannot hold 3,700 km corners: they would collapse in huge earthquakes until the Earth is a sphere again (the reason the IAU 2006 planet definition requires a nearly round shape).
