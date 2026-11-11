# Style rules: the user's feedback, collected over 21 videos

Check every test still against this list before the full render.

## Realism: the standing order (user, Nov 2026)
Every new video, every shot, goes to the **highest realism possible** without changing the house style. The user should never need to ask for it again.
- Before the full render, check each test still and ask: "does anything here look fake or flat?" If yes, fix it first.
- Use real textures (3D NASA bodies, terrain lighting, noise-textured walls and ground, soft shadows, haze and depth), not flat colour fills.
- Use the real 3D Moon, Earth and Sun wherever they appear.
- Avoid simple placeholders: no plain circles for planets, no box houses, no flat green slopes, no blobs.

### More realism inside the same style, never a new style (user, Nov 2026)
The flat-Earth Short (#27) was rebuilt as photoreal 3D. The user said it no longer looked like the channel: the 2D people looked pasted onto a realistic street. The rule is now:
- **Space scenes stay in three.js:** Earth, the flat disc, the Moon, the Sun and 3D arrows. Use the three.js textures already in the toolkit (`tex/earth_atmos_2048.jpg`, `earth_lights_2048.png`, `earth_clouds_1024.png`, `moon_1024.jpg`). This is the same Earth as the published Shorts (the one the user liked in "دارت الأرض بالعكس"): day/night terminator, city lights, clouds, a blue atmosphere rim, and a dark navy space with stars.
- **Streets, buildings and people stay in the illustrated 2D style of the published Shorts.** Make them a bit more realistic each time with better shading, light, shadows, depth and facade detail, and different buildings in every video. They must never look photographic.
- **Water, ships and terrain:** three.js is fine, but styled to match the drawings (moving waves, reflections and the channel's colours), not photoreal. Ships likewise: 3D, with colours and shading that sit with the drawn scenes.
- **People: keep them as they are** (the same 2D people). Change a person only if the idea changes how they move: flying, a superpower, no sleep (swaying, slow), hunger and so on.
- **No outside asset sites:** no Poly Haven, Solar System Scope or NASA downloads. Their hosts were removed from the network list. Everything else is made in code.
- **How #27 was fixed** (follow this in every video):
  - Space scenes render the three.js layer with a transparent background over the published SVG `space(t)` (navy gradient and stars).
  - The disc/globe shader is bright and saturated, with clouds that drift and cast shadows, sun glint on the oceans and a blue haze near the rim.
  - The atmosphere glow uses additive blending that keeps the canvas alpha (CustomBlending: One/One for colour, Zero/One for alpha).
  - The street is the drawn `cityDay(t, { seed })`: `bareStreet` builds a different front row of buildings for each seed. Use a new seed in every video.
  - The sea uses the channel's sky colours, with drawn `cumulus` clouds on top.
- **Test:** before rendering, compare a test still with a published Short. If it looks like a different channel, it is wrong.

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

## Ending line of every Short (user, Nov 2026)
- **Spoken last line:** end with one short line that asks for a comment and adds "subscribe" in the same breath, for example «اكتبْ جوابَك في التعليقات… واشتركْ.» Keep it under about 3 seconds.
- **On screen:** keep the red «اشترك» button and @MadhaLawLab as before.
- **Review after 10 Shorts:** compare `subscribersGained` and `averageViewPercentage` with the earlier Shorts in `audience.md`. If completion drops clearly, go back to the comment-only line.

