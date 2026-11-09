# Style rules: the user's feedback, collected over 21 videos

Check every test still against this list before the full render.

## Realism: the standing order (user, Nov 2026)
Every new video, every shot, goes to the **highest realism possible** without changing the house style. The user should never need to ask for it again.
- Before the full render, check each test still and ask: "does anything here look fake or flat?" If yes, fix it first.
- Use real textures (3D NASA bodies, terrain lighting, noise-textured walls and ground, soft shadows, haze and depth), not flat colour fills.
- Use the real 3D Moon, Earth and Sun wherever they appear.
- Avoid simple placeholders: no plain circles for planets, no box houses, no flat green slopes, no blobs.

## Look: keep it
- Use only the house style:
  - illustrated 2D people (`person`, `onWalk`)
  - the city street with a skyline (`bareStreet`)
  - the real NASA 3D Earth, Moon and Sun (gl3d)
  - captions at the top with gold keywords
  - gold chips
  - the side timeline list
  - a dark starfield for space scenes
- Never switch to another style (no photos, no AI video, no flat icon style).
- Raise the realism a little each time:
  - mountains, water, ships, trees, grass, airports and houses should look real
  - use real2.js (`mountainsR`, `forestR`, `meadow`, `cumulus`), `treeR` and textured walls
- The user's typical fix request is "زيد واقعيتها أكثر". Get there before they have to ask.

## Street scenes
- **No date palms anywhere.** Use `treeR`, broadleaf trees and pines.
- People walk forward for real: their position moves along with the walking legs (`onWalk`). No walking in place.
- People stand and walk on the pavement, never in the road.
- Parked cars sit on the shoulder or kerb, not in a driving lane. Moving cars stay in their lanes.
- The street stands for any city in the world. Use no country-specific signs or flags and no single-country framing.

## Text and layout
- Arabic text everywhere, Fusha, with correct tashkeel on keywords.
- Labels, chips, arrows and the side list must never overlap each other, the captions or important art. Move them.
- No text cut off at the screen edges.
- Write negative temperatures as "N° تحت الصفر". A minus sign displays wrongly in RTL.
- Use Arabic-Indic digits on screen (٤٠ مليون); English numbers are fine for proper names (Gaia BH1).

## Effects that went wrong before (don't repeat)
- **Glows:** a sun glow that looks like a solid ball: keep glows smaller and soft.
- **Map overlays:** hard-edged boxes on Earth textures: use noise-modulated soft masks.
- **Globe crossfades:** a dotted globe (z-fighting) during a crossfade between two spheres. The fixed gl3d modules prevent it; keep that line.
- **Lensing:** looked like a "glass ball". Use soft radial masks with an inverted inner image, a stretched outer ring, a faint Einstein ring and a black core.
- **Hurricanes:** need spiral bands, not concentric rings.
- **Plankton and colour blooms:** use a warped-turbulence swirl filter.
- **Frozen streets:** need real snow drifts against walls and cars.
- **Labels on the globe:** pin them to the right place (`geoXY`) and check that the shape of a country or region is right.

## Content
- Facts must be scientifically correct. Check numbers with formulas and sources, and list them in upload.md.
- Talk about the whole world, not one country.
- **Length:** as long as the idea needs (usually 55–75 s). Cut anything that adds nothing.
- **Hook:** line 0 is the "ماذا لو …؟" question over a strong first image.
- **Ending:**
  - Add a surprise or twist near the end ("والغريب؟", "والمفاجأة؟").
  - Finish with "اكتبْ سؤالَك في التعليقات، وقد يكونُ الفيديو القادم."
  - Show the Earth, a gold ؟ and a red اشترك button, with an @MadhaLawLab chip.
- **Voice:** ElevenLabs Brian (`nPczCjzI2devNBz1zQrb`, `eleven_multilingual_v2`), stability .5, similarity .75, style .15, speaker boost.
- **Audio:** a synthesized music and SFX bed (no samples), with the voice ducking it, at −14 LUFS.

## Review loop
- Send the mp4 together with the numbered 12-shot sheet. The user replies with shot numbers.
- Re-render only the affected chunks, then send the new video and sheet.
- If the user says a known small issue is fine (as with videos 13 and 15), leave the scheduled post alone and just don't repeat the issue.
