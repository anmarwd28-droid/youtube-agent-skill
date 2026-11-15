# ماذا لو انفجر القمر؟ — Short #43

56.8 s, 1080x1920, 30 fps. Global framing. Idea #3 from the 13 Nov evening research (12x outlier, 1.8M views); a Moon idea, one of the channel's strongest categories. The user chose it from «اختفاء الحديد / انفجار القمر» on my advice.

What it shows, in order:
1. The real 3D Earth and Moon; glowing cracks spread over the Moon, then it bursts into a cloud of rocks with a flash and a shock ring.
2. The 3D Sun with a timer: «كلُّ طاقةِ الشمس» filling from ٠:٠٠ to ٥:٠٠ minutes: «= تفجيرُ القمر».
3. A rock labelled «نيزكُ الديناصورات», then a field of rocks fills the screen: «×٣٠٠ ألف».
4. A night street with no Moon: a cloud of sunlit rocks in the sky, people looking up: «سحابةٌ من الصخور».
5. The Earth in space: the clump of rocks orbits, collides (sparks) and spreads along the orbit into a ring of rocks and dust: «حلقةٌ حولَ الأرض» (not to scale).
6. The night street under the ring arc: meteors streak; a fireball falls beyond the city and lights the sky: «شُهُبٌ ونيازك». The side list shows here.
7. A harbour wall with tide marks and a moored boat: the tide range shrinks; a graph «المدُّ اليوم» → «بلا قمر»: «المدُّ: نحوَ الثلث».
8. A coral reef at night: moonlight shafts and coral spawn rising in sync; the light goes and the spawning falls out of step, a clock with «؟»: «المرجانُ يفقدُ ساعتَه».
9. The ring gathers back into a new moon («قمرٌ جديد»); then the debris ring glows hot: «قبلَ ٤٫٥ مليار سنة».
10. The Earth with a ring and a Moon, the question mark and the subscribe button.

Source in `src/`. `bmx.sh` builds `moon.html` from `sup_n.js` + `mil_lib.js` + `am_lib.js` + `oe_help.js` + `sp_help.js` + `sw_help.js` + `mx_lib.js` + `mx_b.js`.
- `gl3d_mx.js` is `gl3d_bs.js` (mirror fix and 3D-fade fix kept) with the real Moon back in the moon slot and:
  - `crack` on the Moon: glowing Voronoi fissures
  - `w.debris`: 2,200 instanced irregular rocks; `c` and `k` make an expanding shell-shaped cloud, `spread` (0 → 1) stretches it along a tilted orbit into a ring, `gather` pulls it back to one point, `hot` makes the rocks glow, `n` thins them
  - `w.dust`: a translucent banded dust ring (`R`, `a`, `tilt`, `col`)
- `mx_b.js`: `camPt`, `ringPt`, `meteors`, `skyRing` (the ring seen from the ground), `branchC`/`brainC`/`seaFan` (coral reef), a harbour with tide marks, a tide graph.
- `mx_lib.js`: `street6` (shops بقالة, خيّاط, سجّاد, عسل, أجهزة; new blocks and trees; `noMoon`, `sky2`).

## Title
ماذا لو انفجر القمر؟ 🌕💥

(vidIQ title score 79. yt-package lint: 23 characters, inside both cuts.)

## Description
ماذا لو انفجر القمر فجأة؟ سحابة هائلة من الصخور تدور حول الأرض، ثم حلقة مثل حلقات زحل… وشهب تسقط علينا!
ماذا يحدث للمد والجزر؟ ولماذا يفقد المرجان ساعته؟ والمفاجأة: قد يولد قمر جديد.
حلقة أم قمر؟ اكتب رأيك في التعليقات.

#ماذا_لو #القمر #الفضاء #علوم #هل_تعلم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو انفجر القمر, انفجار القمر, القمر, حلقات حول الأرض, المد والجزر, الشهب, النيازك, المرجان, نشأة القمر, الفضاء, علوم, هل تعلم, what if the moon exploded

## Settings
Not made for kids · not altered/synthetic content · Science & Technology · Arabic · cover at 1 s

## Search queries this should win
ماذا لو انفجر القمر · انفجار القمر · ماذا يحدث لو انفجر القمر. The title and the first description line carry these words. No keyword research (vidIQ credits are low).

## Facts (as narrated)
- **Five minutes of the Sun:** the energy needed to blow the Moon apart is its gravitational binding energy, U = 3GM²/(5R) = 3 × 6.674×10⁻¹¹ × (7.35×10²² kg)² / (5 × 1.737×10⁶ m) ≈ 1.25×10²⁹ J. The Sun puts out 3.83×10²⁶ W, so that is about 325 s ≈ 5.4 minutes of its whole output.
- **More than 300,000 times the dinosaur asteroid:** estimates for the Chicxulub impact energy range from about 10²³ to 4.2×10²³ J (100 million megatons of TNT). 1.25×10²⁹ / 4.2×10²³ ≈ 300,000, and more with the lower estimates.
- **A cloud of rocks shining in sunlight:** the Moon shines by reflected sunlight; broken into many pieces, the same material spreads over a larger area of sky.
- **The pieces keep orbiting, collide and spread into a ring:** fragments with only a little extra speed stay in orbit around the Earth; their slightly different speeds spread them along the orbit, and collisions grind them down. A ring of debris is the common outcome in simulations of a disrupted moon (the idea behind "Seveneves"). The ring is drawn much closer to the Earth than the real 384,400 km ("ليس بالمقياس الحقيقي").
- **Meteors, and rocks that could wipe out a city:** fragments knocked onto orbits that cross the Earth would fall as meteors; a stony body tens of metres across or larger can destroy a city (Tunguska, 1908: about 50–60 m, about 2,000 km² of forest flattened).
- **Tides shrink to about a third:** the Moon's tidal force is about 2.2 times the Sun's (the Sun's is about 46% of the Moon's). With the Moon's mass spread into an even ring, its tide disappears and the Sun's remains: 0.46 / 1.46 ≈ 0.31 of today's spring-tide range.
- **Corals that spawn by moonlight:** many reef corals (for example on the Great Barrier Reef) release their eggs and sperm together on a few nights a year, timed by the phase of the Moon; their light-sensing cells read moonlight.
- **A new moon may form:** debris outside the Roche limit (about 18,000 km for rock around the Earth) tends to clump together again over time.
- **Our Moon was born from a giant impact:** the leading theory says a Mars-sized body (Theia) hit the young Earth about 4.5 billion years ago, and the Moon gathered from the ring of hot debris.
- **Global framing:** the street and the people stand for any city in the world.
