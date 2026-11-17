# ماذا لو بقي ٩٩ شخصاً فقط في العالم؟ — Short #46

77.0 s, 1080x1920, 30 fps. Global framing. The user's own idea (16 Nov): «ماذا لو كان هناك ٩٩ شخص في العالم». ElevenLabs: 934 characters.

What it shows, in order:
1. The night side of the real 3D Earth, full of city lights: the lights die, a counter falls from ٨٬٣٠٠٬٠٠٠٬٠٠٠ to ٩٩, and 99 gold points stay on the land: «شخصاً فقط».
2. The Sun comes round; the globe zooms on Africa with the 99 points scattered over the land; a dashed circle around one point: «حصّةُ شخصٍ واحد», «١٫٥ مليون كم² لكلِّ شخص».
3. One person with a backpack beside an empty road that runs to the horizon, two cars left where they stopped: «أقربُ إنسان: نحو ٦٠٠ كم».
4. A city street at night: the buildings go dark block by block, the street lamps die, the Milky Way appears; one person with a torch stops and looks at a phone with no signal: «انقطاعُ الكهرباء», «لا إنترنت». The side list shows here.
5. Inside a dim shop: the fruit on the «طازج» stand rots and flies gather: «يفسُدُ في أيام»; the last shopper arrives with a trolley full of tins in front of the «معلّبات» shelves: «المعلّبات: صالحةٌ لسنوات».
6. A nuclear plant at dusk (two cooling towers, the reactor dome, the turbine hall, a pylon) by a river: «نحوُ ٤٠٠ مفاعل»; the steam stops: «إطفاءٌ تلقائيّ». An inset shows the used-fuel pool: the lights of the plant go out, the water boils away, the fuel glows red, a radiation sign: «خطرُ تسرّبِ الإشعاع».
7. The same street years later: ivy climbs the buildings, moss and grass split the road, a rusty car; a stag, a doe and a fawn walk in, a fox trots on the pavement: «بعدَ سنوات», «الحيواناتُ تعود». The side list shows here.
8. Speech bubbles saying hello in 21 languages burst one after another while a counter falls from ٧٬٠٠٠ to ٩٩; three stay: «أكثرُ من ٧٠٠٠ لغة», «يبقى أقلُّ من ٩٩».
9. A dead factory under a grey sky (saw-tooth roof, broken windows, two chimneys with the last smoke); a medicine shelf empties: «لا مصانعَ ولا أدوية».
10. A small village at golden hour: four houses by a river, a fire with people round it, two farmers in a field, someone fishing: «قريةٌ واحدة: ٩٩ شخصاً».
11. All 99 people as a grid of figures: «كلُّ البشر: ٩٩» and a gold ؟; then a DNA helix and a family tree where two cousins marry («أقارب») and their children are marked red («أجيالٌ أضعف»): «الخطر: أمراضٌ وراثيّة».
12. A generation ship with two spinning rings leaves the Earth towards a red star («بروكسيما ب», «٤٫٢ سنة ضوئيّة»): «٩٨ شخصاً يكفون», «رحلةٌ تدومُ ٦٣٠٠ سنة»; a row of couples: «أزواجٌ من عائلاتٍ مختلفة», «٤٩ زوجاً بلا قرابة».
13. The Earth, the question mark and the subscribe button.

Source in `src/`. `bln.sh` builds `lone.html` from `sup_n.js` + `mil_lib.js` + `am_lib.js` + `oe_help.js` + `sp_help.js` + `sw_help.js` + `ln_lib.js` + `ppl99.js` + `ln_a.js` + `ln_b.js` + `ln_c.js` + `ln_d.js` (in the work folder the script, timing, voice and `ppl99.js` sit in `lone/`).
- `gl3d_ln.js` is `gl3d_dry.js` unchanged (the house Earth with the mirror and 3D-fade fixes). The night side: `off: 2.75` in `gAt`/`gW`, `lights` 1.7 → 0.
- `tex/ppl99.py` → `ppl99.js`: 99 random land points, at least 5.2° apart; point 0 is fixed in the Sahara.
- `ln_a.js`: `dots99` (the points on the globe), `capPath` (a circle on the globe by angular radius), `milkyW`, `noSignal`, the shop (`SHELF`, `prod`, `fruit` that rots, `trolley`), `sceneAlone` (a road to a vanishing point with poles and wires).
- `ln_b.js`: `coolTower` (hyperbolic cooling tower), `plume`, `radSym`, `poolInset`; `ivyM` (ivy and moss: a noise mask whose level rises with the height gradient of the source, so it is dense at the bottom and sparse at the top), `tuft` (grass), `deer` (from `quad` horse: slim legs, white rump, antlers, fawn spots); the greeting bubbles; the factory and `medItem`; `cottage` and the village.
- `ln_c.js`: `icon` (a person figure), `helix` (DNA with broken rungs), the family tree, `starship` (rings with near and far halves).
- `ln_lib.js`: `street9` (shops بقالة, مخبز, هواتف, أحذية, ألعاب; new blocks `BLK9`; `litB`/`litS`/`lampK` switch off the windows, shops and lamps; `wall` = a layer over the facades).

## Title
ماذا لو بقي ٩٩ شخصاً فقط في العالم؟ 🌍

(yt-package lint: 37 characters, inside both cuts, carries a number; ten variants all scored 94. Not scored on vidIQ: 0 credits until 13 Dec.)

## Description
ماذا لو بقي ٩٩ شخصاً فقط في العالم؟ تنقطع الكهرباء خلال أيام، وتتوقف المفاعلات النووية، وتعود الحيوانات إلى المدن.
ماذا لو اختفى كل البشر إلا ٩٩ إنساناً؟ هل يكفي هذا العدد لتستمر البشرية؟ المفاجأة: دراسة علمية حسبت أن ٩٨ شخصاً يكفون… بشرط واحد.
هل تنجو لو كنت منهم؟ اكتب جوابك في التعليقات.

#ماذا_لو #البشر #نهاية_العالم #الأرض #علوم #هل_تعلم #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
ماذا لو, ماذا لو بقي ٩٩ شخصا فقط, ماذا لو بقي 99 شخص في العالم, ماذا لو اختفى البشر, آخر البشر على الأرض, عدد سكان العالم, انقراض البشر, نهاية العالم, زواج الأقارب, المفاعلات النووية, بروكسيما ب, علوم, هل تعلم, what if only 99 people were left on earth, what if only 100 people existed

## Settings
Not made for kids · not altered/synthetic content · Science & Technology · Arabic · cover at 3 s (the night Earth with the 99 points and the number ٩٩)

## Search queries this should win
ماذا لو بقي ٩٩ شخصا فقط في العالم · ماذا لو اختفى كل البشر إلا · ماذا لو بقي ١٠٠ شخص على الأرض. The title and the first two description lines carry these words. No keyword research (vidIQ: 0 credits).

## Facts (as narrated)
Scenario: suddenly only 99 people are left, scattered at random over the land.
- **Today:** about 8.2–8.3 billion people (UN World Population Prospects 2024). The counter starts at 8.3 billion.
- **1.5 million km² each:** the land area of the Earth is about 148.9 million km²; 148.9 ÷ 99 = 1.50 million km² (nearly three times France). On the globe the circle has that area: radius √(1.5 × 10⁶ ÷ π) ≈ 690 km = 6.2° of arc.
- **The nearest person about 600 km away:** for points scattered at random with density ρ, the mean distance to the nearest neighbour is 1 ÷ (2√ρ) = √(1.5 × 10⁶) ÷ 2 ≈ 613 km. Without transport or communication, many would never meet anyone.
- **The power stops within days:** power stations need operators and a constant fuel supply, and a grid needs constant balancing; without staff, plants trip and grids black out within hours to days. The internet needs power for its data centres and exchanges.
- **Fresh food rots quickly; tins last for years:** without refrigeration fresh food spoils in days. Commercially canned food stays safe for years while the can is intact (USDA: best quality 2–5 years, safe much longer). 99 people could not finish the world's stock.
- **About 400 nuclear reactors shut themselves down:** about 410–440 power reactors are operable in about 30 countries (IAEA PRIS). They are built to shut down automatically (scram) when the grid or the operators fail. But the fuel keeps giving off decay heat: the cores and the used-fuel pools need cooling by pumps; emergency diesel generators carry fuel for about a week. Without power the water can boil away and radioactivity can leak, as at Fukushima in 2011. Narrated as "may leak".
- **Years later plants split the streets and animals return to the cities:** roots and frost break asphalt within years; wildlife (wolves, deer, boar) thrives in the Chernobyl exclusion zone since people left.
- **Of 7,000 languages only a few stay:** there are about 7,100 living languages (Ethnologue 2025: 7,159). 99 people can carry at most 99 mother tongues, in practice far fewer.
- **Much knowledge is lost: no factories, no medicine:** modern industry needs millions of specialised workers and supply chains; 99 people cannot run them.
- **One small village, farming and hunting or fishing:** 99 people are the size of a small village or a large hunter-gatherer band.
- **Is the number enough? The danger is inbreeding:** in a small closed population relatives end up having children together; harmful recessive variants meet more often and the offspring are weaker (inbreeding depression). Conservation genetics uses the "50/500 rule" (Franklin 1980): an effective population of about 50 avoids severe inbreeding in the short term and about 500 keeps long-term adaptability (Frankham et al. 2014 suggest 100 and 1,000).
- **The surprise: 98 people are enough for a 6,300-year voyage:** Marin & Beluffi, "Computing the minimal crew for a multi-generational space journey towards Proxima Centauri b" (Journal of the British Interplanetary Society, 2018), simulated a 6,300-year trip with the HERITAGE code: a starting crew of 98 (49 couples) kept the population healthy, provided the pairings follow strict rules that limit inbreeding. Proxima b is 4.2 light-years away. Other estimates are larger (Moore 2002: 150–180; Smith 2014: 10,000–40,000 for a safe margin), so the video says "a study worked out".
- **Not shown to scale:** the generation ship is an artist's drawing; the study does not describe a ship design.
- **Global framing:** the street, the shop, the plant, the factory and the village stand for anywhere in the world; the greetings are from many languages.
