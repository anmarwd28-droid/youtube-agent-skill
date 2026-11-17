# ماذا لو كانت GTA 6 تعمل على كل الهواتف؟ — Short #49

69.6 s, 1080x1920, 30 fps. The user's own idea (17 Nov), two days before the game's release: «ماذا لو كانت gta 6 تعمل على كل الهواتف … اريدهم همين يلعبونها و يظهر و همه يلعبون». ElevenLabs: 856 characters.
The game on every screen is a generic drawn city drive at sunset (a red sports car, a road, a skyline, a minimap and a speed number). No logos, characters or art from the real game.
The user said a trial came out "today"; no official source for a trial was found on 17 Nov, so the video only uses the official release facts.

What it shows, in order:
1. A street (street10): four people on the pavement play on phones held sideways; a big phone shows the game: «الجميعُ يلعب». Then three people playing on a bus, then two in a café.
2. A living room: the game on a TV, two generic consoles (no logos), a player on the sofa with a controller, a calendar «١٩ نوفمبر»: «١٩ نوفمبر ٢٠٢٦», «بلايستيشن ٥ وإكسبوكس فقط».
3. A phone's storage screen: the game's bar («أكثرُ من ٢٠٠ غيغابايت») runs past the phone's 128 GB bar and spills out red; «لا توجدُ مساحةٌ كافية».
4. Two chips and bars: the console's graphics ≈ 10 TFLOPS, the best phones ≈ 2–3: «أقوى بعدّةِ مرّات».
5. The phone heats up (a red glow, heat shimmer): temperature 34° → 47°, frame rate 30 → 12; the game stutters: «الهاتفُ يسخن», «يبطئُ نفسَه».
6. A console with a meter at 200 W, then a phone battery draining 100% → 0% while a timer runs to 6:00: «نحوَ ٢٠٠ واط», «تفرغُ في ٦ دقائق».
7. The night Earth (the house 3D globe) with download links between cities turning red and jammed: «الشبكاتُ تزدحم».
8. A data centre (racks with blinking lights), a cloud, picture packets streaming down to a player: «الألعابُ السحابيّة», «الهاتفُ يستقبلُ الصورةَ فقط».
9. The twist: a generic 2000s console and a phone, bars ≈ 0.2 vs ≈ 2 TFLOPS: «شغّل GTA 5 عام ٢٠١٣», «هاتفُك أقوى بعدّةِ مرّات».
10. The Earth, the question mark and the subscribe button.

Source in `src/`. `bgt.sh` builds `gta.html` from the #46 helpers (`sup_n` … `ln_c`), `wh_help.js`, `tc_lib.js` + `tc_a.js` (#47 helpers), and `gt_a.js` (`gameView`, `phoneL`, `player`, street/bus/café, `consoleBox`, the living room), `gt_b.js` (`bigPhone`, storage, `chipDie`, heat, `battery`), `gt_c.js` (network over the globe, `rack`, the cloud, `oldConsole`, the twist, scenes and chips). 3D module: `gl3d_ex.js` (#48).

## Title
ماذا لو كانت GTA 6 تعمل على كل الهواتف؟ 📱

(yt-package lint: inside both cuts; carries a name and a number. Not scored on vidIQ: 0 credits until 13 Dec.)

## Description
ماذا لو كانت GTA 6 تعمل على كل الهواتف؟ هل يستطيع هاتفك تشغيل جي تي إيه 6؟ الحجم، والحرارة، والبطارية… والحل الحقيقي.
GTA 6 تصدر في ١٩ نوفمبر ٢٠٢٦ على بلايستيشن ٥ وإكسبوكس فقط، وحجمها أكثر من ٢٠٠ غيغابايت. والمفاجأة: هاتفك اليوم أقوى من البلايستيشن ٣ الذي شغّل GTA 5.
هل ستلعبها على هاتفك؟ اكتب في التعليقات.

#GTA6 #جي_تي_ايه_6 #ماذا_لو #ألعاب #هواتف #shorts

—
ماذا لو؟ Lab — أسئلة مستحيلة… بأجوبة علمية.
اشترك حتى لا يفوتك السؤال القادم: @MadhaLawLab

## Tags
GTA 6, جي تي ايه 6, gta 6 على الهاتف, gta 6 للجوال, تحميل gta 6 للهاتف, ماذا لو, gta 6 mobile, gta 6 phone, gta 6 release date, حجم gta 6, الألعاب السحابية, بلايستيشن 5, ألعاب, هواتف

## Settings
Not made for kids · not altered/synthetic content · Science & Technology (or Gaming) · Arabic · cover at 2 s (the street with everyone playing and the big phone)

## Search queries this should win
gta 6 على الهاتف · ماذا لو gta 6 على الجوال · حجم gta 6. Timely: the game releases on 19 Nov 2026.

## Facts (as narrated)
- **Release:** Grand Theft Auto VI launches on 19 November 2026 on PlayStation 5 and Xbox Series X|S; no PC date announced (Rockstar newswire; press, Nov 2026).
- **Size more than 200 GB:** reported download size about 210 GB on PS5 and 225.3 GB (decimal) on Xbox (press, Nov 2026). Many phones come with 128 GB of storage.
- **Several times stronger:** the PS5 GPU is about 10.3 TFLOPS (FP32); the fastest phone GPUs are about 2–3 TFLOPS (e.g. Apple A17 Pro ≈ 2.1). Shown as ≈ 10 vs ≈ 2 to 3.
- **Heat and throttling:** phones limit their speed when they get hot to protect the battery and chips (thermal throttling). Numbers on screen (34° → 47°, 30 → 12 fps) are illustrative.
- **About 200 W → six minutes:** a PS5 draws about 200 W while playing; a typical phone battery holds about 5,000 mAh × 3.85 V ≈ 19–20 Wh; 19.5 Wh ÷ 200 W ≈ 0.1 h ≈ 6 minutes.
- **Networks jam:** a 200 GB download by millions of people at once would be hundreds of millions of terabytes in a few days (illustrative, no number narrated).
- **Cloud gaming:** the game runs on a server in a data centre and only the video is streamed to the device; the controls are sent back.
- **The twist:** GTA V came out in 2013 on PlayStation 3 and Xbox 360; the PS3 GPU (RSX) is about 0.2 TFLOPS, so a modern phone GPU (≈ 2) is several times stronger.
