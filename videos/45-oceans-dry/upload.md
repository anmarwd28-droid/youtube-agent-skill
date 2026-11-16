# ماذا لو جفّت المحيطات؟ — Short #45

58.6 s, 1080x1920, 30 fps. Global framing. The user picked it (16 Nov) from two ideas with ruined cities and deserts («اختفى الحديد» / «جفّت المحيطات»); he asked for destroyed houses, deserts and a ruined world. ElevenLabs: 706 characters (new key, 10,000 a month).

What it shows, in order:
1. The real 3D Earth: the oceans drain away in two seconds (shallow shelves first, the deep basins last) and the dry sea floor appears.
2. The Earth over the Indian Ocean: the mid-ocean ridge lights up in gold: «أطولُ سلسلةِ جبال: ٦٥ ألف كم»; the globe turns to the Pacific: «خندقُ ماريانا», and an inset cross-section drops Everest (٨٫٨ كم) into the trench (١١ كم): «أعمقُ من إيفرست».
3. The dry sea floor: a container ship falls from the sky and lands in a cloud of dust, a second one far away; the old sea level as a dashed line far above: «متوسّطُ العمق: ٣٫٧ كم».
4. A white salt flat with a cracked crust; then a city with a white layer rising to 150 m over the buildings: «طبقةُ ملح: ١٥٠ مترًا».
5. A city street in the rain: the rain thins out and stops, the clouds leave: «٨٦٪ من التبخّرِ يأتي من المحيطات». The side list shows here.
6. A green valley with a river and a forest: the river dries to cracked mud, the trees die, and dunes cover the land: «اليابسةُ صحراء».
7. The street with dead trees: a blazing day (thermometer ٥٠°) turns to a freezing night (١٢° تحت الصفر); people shiver.
8. A wall of dust rolls over the abandoned street: «عواصفُ الغبارِ والملح»; then the same city in ruins, half buried: broken buildings, a leaning lamp post, a fallen shop sign, a car under the sand: «مدنٌ تحتَ الرمال».
9. Marine plankton under a microscope with oxygen bubbles; the water goes and they die; a bar «مصادرُ الأكسجين» loses its ocean half: «نصفُ الأكسجين».
10. The dry, scorched Earth; then Mars: today's Mars, then ancient Mars with a northern sea and lakes («قبلَ أكثرَ من ٣ مليارات سنة»), then dry again: «اليوم: صحراءُ ميتة».
11. The Earth fills with water again, the question mark and the subscribe button.

Source in `src/`. `bdr.sh` builds `dry.html` from `sup_n.js` + `mil_lib.js` + `am_lib.js` + `oe_help.js` + `sp_help.js` + `sw_help.js` + `dr_lib.js` + `dr_b.js`.
- `gl3d_dry.js` is `gl3d_pl.js` (mirror fix and 3D-fade fix kept) with:
  - `disc.swap` 0 → 1 as a DRAIN: the sea level drops by a depth mask (B channel of `tex/flat3_drym.png`), so shelves dry first and trenches last; `ridgeA` / `trenchA` light the ridge and the Mariana trench; `scorch` dries the land only
  - Mars in the moon slot: `moon.wet` 1 = ancient Mars with water (`tex/mars_wet.jpg`), 0 = today (`tex/mars_dry.jpg`)
- `tex/dry_tex.py` → `earth_dry.jpg` + `earth_dry_mask.png` (then `azim.py` → `flat3_dry.jpg`, `flat3_drym.png`): the Earth with the oceans replaced by the sea floor (shelves, abyssal plains, the real ridge and trench paths from `swap_tex.py`, salt pans). `tex/mars_tex.py` → the two Mars maps.
- `dr_b.js`: `gAt` (the Earth centred on a screen spot), `camPt`, `deadTree`, `duneL` (one dune layer), `rockS` (sunlit boulders), `seabed`, `shipDry` (a container ship with its whole hull), `trenchInset`, `saltFlat`, `saltCity`, `ruinB` (a building with a broken top, dark windows, cracks and a dust coat), `farRuins`, `dustWall`, `sandBlow`, `ruinCity`, `plank` (four kinds of phytoplankton).
- `dr_lib.js`: `street8` (shops سمك, قهوة, دهانات, حقائب, توابل; new blocks; `back` layer, `dead` trees, `cl`). At night pass the people as `top`, not `fg`: the lit shop windows are drawn over `fg`.

## Title
ماذا لو جفّت المحيطات؟ 🌊🏜️

(yt-package lint: 27 characters, inside both cuts. vidIQ scored the longer variant «ماذا لو جفّت المحيطات فجأة؟ 🌊» at 67; the last 5 credits went on it, so the shorter title, in the channel's usual pattern, is not scored.)

## Description
ماذا لو جفّت المحيطات فجأة؟ يظهر قاع لم يره أحد: أطول سلسلة جبال في العالم وخندق أعمق من ارتفاع إيفرست، وتسقط السفن نحو ٤ كيلومترات!
ماذا لو اختفت المحيطات والبحار؟ يكاد المطر يتوقف، وتتحول اليابسة إلى صحراء، وتُدفن المدن تحت الرمال… والمفاجأة: هذا حدث فعلًا على المريخ.
هل كنت تتوقع ذلك؟ اكتب رأيك في التعليقات.

#ماذا_لو #المحيطات #البحار #الأرض #علوم #هل_تعلم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو جفت المحيطات, ماذا لو اختفت المحيطات, جفاف المحيطات, قاع المحيط, خندق ماريانا, المحيطات, البحار, الصحراء, العواصف الترابية, العوالق البحرية, المريخ, علوم, هل تعلم, what if the oceans dried up

## Settings
Not made for kids · not altered/synthetic content · Science & Technology · Arabic · cover at 1 s

## Search queries this should win
ماذا لو جفت المحيطات · ماذا لو اختفت المحيطات · ماذا يحدث لو جفت البحار. The title and the first two description lines carry these words. No keyword research (vidIQ credits ran out).

## Facts (as narrated)
Scenario: all the water of the oceans is gone at once; the salt stays behind.
- **The longest mountain chain in the world:** the mid-ocean ridge system runs for about 65,000 km through all the oceans (NOAA); the Andes, the longest range on land, are about 7,000 km.
- **A trench deeper than Everest is high:** the Challenger Deep in the Mariana Trench is about 10.9–11 km deep; Everest is 8.85 km high, so its summit would be about 2 km below sea level.
- **Ships fall to a floor about four kilometres down on average:** the mean depth of the ocean is about 3,680 m (NOAA: 3,682 m). Shown: «٣٫٧ كم».
- **Salt enough to cover all the land 150 m deep:** the oceans hold about 5 × 10¹⁹ kg of salt (3.5% of 1.4 × 10²¹ kg). At 2,170 kg/m³ that is about 2.2 × 10⁷ km³; over the 149 million km² of land it makes a layer about 150 m thick (NOAA: "more than 500 feet").
- **The rain almost stops:** about 86% of the world's evaporation comes from the oceans (and about 78% of the rain falls on them); land evaporation alone could not keep the water cycle going.
- **Rivers dry up, forests die, the land turns to desert:** with almost no rain, rivers and lakes are not refilled and vegetation dies.
- **Scorching days, freezing nights:** water stores far more heat than land or air (the oceans hold more than 90% of the extra heat of global warming) and moist air holds the night's warmth; dry deserts today already swing by 30–40 °C between day and night. Shown: 50° by day, 12° below zero at night, as in today's deserts.
- **Dust and salt storms bury abandoned cities:** the dry bed of the Aral Sea already sends tens of millions of tonnes of salt and dust into the air each year; dunes bury abandoned towns within decades (Kolmanskop in Namibia).
- **Marine plankton make about half of the oxygen:** phytoplankton produce roughly 50% of the oxygen made on Earth each year (NOAA; estimates range from 50% to 80%).
- **It really happened on Mars:** Mars had rivers, lakes and probably a northern sea more than 3 billion years ago (river valleys, deltas such as Jezero, lake beds in Gale crater). It lost most of its atmosphere and its water, and today it is a cold, dry desert.
- **Not to scale:** the ship scene and the salt-layer city are drawings; the 3.7 km and 150 m lines show the numbers, not true proportions.
- **Global framing:** the street and the people stand for any city in the world.
