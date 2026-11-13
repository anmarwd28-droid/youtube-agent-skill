# ماذا لو تبادلت اليابسة والمحيطات أماكنها؟ — Short #41

80.2 s, 1080x1920, 30 fps. Global framing. Idea #1 from the 13 Nov evening research (54x in the yt-viral swipe, 36x vidIQ outliers): one simple change to the whole Earth.

What it shows, in order:
1. The real 3D Earth; the swap sweeps over it from the north pole: the continents become seas with their own shapes, and the ocean floor becomes land.
2. A smaller Earth goes back to today, then swaps again; a bar under it moves from «ماء ٧١٪» to less than a third.
3. The swapped Earth turns: one supercontinent; the seas are labelled «أفريقيا», «أمريكا الجنوبية», «أمريكا الشمالية», «أوروبا».
4. The mid-ocean ridge lights up in gold across the Atlantic: «٦٥ ألفَ كم من الجبال».
5. Zoom to the Mariana trench (red), then a drawn cross-section: a valley 11 km deep; Everest is lowered in and its summit stays more than 2 km below the rim.
6. Clouds thin out over the supercontinent; then a person walks across endless dunes: «أكثرُ من ٤٠٠٠ كم عن أقرب بحر». The side list shows here.
7. A city street in summer heat (thermometer ٤٦°), which turns to snow and ١٠° تحت الصفر: «فرقٌ أكثرُ من ٥٠ درجة».
8. Today's warm currents (dashed arrows) cross the Atlantic; after the swap they are gone (red ✕); the Earth turns red at the equator and blue at the poles: «أحرّ» / «أبرد».
9. The night side of the swapped Earth: city lights line the shores of the new seas: «٤٠٪ من البشر قربَ السواحل».
10. Time rewinds on the real Earth («قبل ٢٥٠ مليون سنة»), then the burning desert of Pangaea: red mesas and dunes, «بانجيا».
11. The swapped Earth with the question mark and the subscribe button.

Source in `src/`. `bsw.sh` builds `swap.html` from `sup_n.js` + `mil_lib.js` + `am_lib.js` + `oe_help.js` + `sp_help.js` + `sw_lib.js` + `sw_b.js`.
- `gl3d_sw.js` is `gl3d_world.js` with these changes:
  - `swap` sweeps in the swapped textures from the north pole, with a noisy front.
  - `ridgeA` lights the ridge in gold and `trenchA` lights the trench.
  - `heat` tints the globe by latitude.
  - **Mirror fix:** the old disc-globe drew the Earth mirrored (east on the left). The x of the texture coordinate is now flipped.
  - `gW(t, {lon, el, d, ...})` in `sw_b.js` puts any real longitude facing the camera. `pin()` and `gPath()` place labels and paths on the right places (checked at Cape Town, Rio, Cairo and London).
- The textures come from `tex/swap_tex.py`, which writes `earth_swap.jpg`, the night lights along the new coasts and the ridge and trench mask. They are reprojected with `azim.py` to `flat3_swap.jpg`, `flat3_swapn.jpg` and `flat3_swapm.png`.
- `sw_b.js` adds:
  - `litRock` (any path filled with lit rock) and `jag` (jagged edges)
  - `valleyX`: the trench section, with Everest drawn with lit rock and snow
  - `dunes`: layered, with soft slip faces
  - `mesas`: red buttes with strata and talus
  - `thermo`, `snowGround`, `snowTrees` and `snowFall`
- `sw_lib.js` is a new street, `street4`, with options `sky`, `overcast` and `ground`. Its shops are عطور, أحذية, ألعاب, خضار and أقمشة.

## Title
ماذا لو تبادلت اليابسة والمحيطات أماكنها؟ 🌍

(vidIQ title score 81, against 62 for «ماذا لو صارت القارات بحارًا؟ 🌍». yt-package lint: 43 characters; the mobile cut keeps «ماذا لو تبادلت اليابسة والمحيطات», so the subject survives.)

## Description
ماذا لو تبادلت اليابسة والمحيطات أماكنها؟ القارات تصبح بحارًا مغلقة، وقاع المحيط يصبح قارة واحدة عملاقة!
أطول سلسلة جبال على الأرض، ووادٍ أعمق من إيفرست، وصحراء بلا نهاية، وفرق حرارة يتجاوز ٥٠ درجة بين الصيف والشتاء.
أين كنت ستعيش؟ اكتب جوابك في التعليقات.

#ماذا_لو #الأرض #المحيطات #جغرافيا #علوم #هل_تعلم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو تبادلت اليابسة والمحيطات, اليابسة والمحيطات, المحيطات, القارات, قاع المحيط, خندق ماريانا, سلسلة جبال وسط المحيط, بانجيا, الأرض, جغرافيا, مناخ, علوم, هل تعلم, what if land and oceans swapped places

## Settings
Not made for kids · not altered/synthetic content · Science & Technology · Arabic · cover at 1 s

## Search queries this should win
ماذا لو تبادلت اليابسة والمحيطات · ماذا لو أصبحت القارات بحارًا · ماذا لو جف المحيط. The title and the first two description lines carry these words. There was no keyword research, to save vidIQ credits; the Short lives on the Shorts feed.

## Facts (as narrated)
Scenario: the water takes the places of the continents, and the ocean floor becomes dry land, keeping its relief. The shapes are swapped; water volume is not modelled.
- **71% / 29%:** water covers about 71% of Earth's surface and land about 29% (USGS, NOAA). After the swap, water covers about 29%, «أقلّ من الثلث».
- **One giant continent:** the world ocean (Pacific, Atlantic, Indian, Arctic, Southern) is one connected body, so its floor becomes one connected landmass. The continents become separate closed seas: Afro-Eurasia, the Americas, Australia and Antarctica.
- **The longest mountain range: about 65,000 km.** The mid-ocean ridge system is about 65,000 km long (NOAA Ocean Exploration). The ridge path drawn on the texture is about 63,000 km. The Andes, the longest range on land today, are about 7,000 km long.
- **Mariana: 11 km.** Challenger Deep is about 10,935 m deep. Everest is 8,849 m high, so its summit would sit about 2.1 km below the rim («أكثرُ من ٢ كم»).
- **Less evaporation and rain:** most evaporation comes from the ocean surface. With about 2.5 times less open water there is less moisture in the air, and the interior of a huge continent is far from any source of rain. Pangaea's interior was a vast arid region for the same reason.
- **«أكثرُ من ٤٠٠٠ كم عن أقرب بحر»:** this is the point of the new continent farthest from water, measured on the swap mask (Pacific interior, about 4,700–4,900 km after the latitude correction). Tiny islands, which would become ponds, are not counted.
- **A swing of more than 50 degrees:** water stores heat. Interiors far from the sea have extreme seasons: Yakutsk today ranges from about −40 °C in January to about +20 °C in July (≈ 60 °C). Shown in the video: summer 46 °C and winter 10 below zero (56 °C).
- **Closed seas carry no heat to the poles:** ocean currents (the Gulf Stream, the Brazil Current and others) carry a large part of the heat that moves from the equator toward the poles. Without a connected world ocean, that transport largely disappears, which means hotter tropics and colder poles.
- **40% near the coasts:** about 40% of the world's population lives within 100 km of the coast (UN Atlas of the Oceans).
- **Pangaea:** about 335 to 175 million years ago all the continents formed one supercontinent, Pangaea, which existed about 250 million years ago. Climate studies and its red beds and dune deposits show a very dry, hot interior with extreme seasons.
- **Global framing:** the street and the people stand for any city in the world.
