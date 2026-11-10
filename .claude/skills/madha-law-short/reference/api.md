# Scene code: the structure and helpers

The page is 720×1280 SVG. It renders to 1080×1920 at dpr 1.5, 30 fps. A WebGL canvas draws the 3D bodies, the SVG scene goes over it, and the UI layer (captions, chips, list) goes on top. `window.render(t)` draws one frame; `render3.js` calls it for every frame.

## Timing (from timing.json)
- `S0(i)`: start of narration line i.
- `WS(i, j)`: start of word j in line i (the index is clamped).
- `W(i, j)`: the [text, start, end] of a word.
- `TOTAL`: video length.
- `ramp(t, a, b)` returns 0→1, `ease(k)` gives smooth in/out, and `clamp`, `lerp`, `mix(hexA, hexB, k)` are colour and number helpers.
- `R(seed)` and `RS(seed)` are deterministic random generators. Never use `Math.random`, or chunks will not match.
- Tie every event to the word that names it (`WS(i, j)`), never to a fixed second.

## The structure of `X_new.js` (copy from `examples/bh_new.js`)
- **Scene functions:** `function sceneName(t) { ...; return svgString; }`. Inside one you can set:
  - `F.earth = {x, y, r, a, sunI, lights, rot, tilt, xr?, spin?}`: the real 3D Earth.
    - `sunI` sets how strongly the sun lights it, `lights` the night lights at 0–1, `rot` the starting longitude rotation, and `tilt` 0.41 for the real axial tilt.
    - `xr` (X tilt) and `spin` only work in gl3d_retro and gl3d_yell.
  - `F.moon = {...same keys}`: a second sphere. Its texture is set by the gl3d module (the Moon, Proxima b, an alternate Earth, and so on).
    - Put it at the same x, y and r as `F.earth` and fade `a` to crossfade the Earth into a changed Earth.
    - The module scales it by 1.004 and draws it after the Earth. This fixes the dotted z-fighting glitch: never remove that line.
  - `F.sun = {x, y, r, a, hue?}`: the 3D Sun. `hue: 0→1` turns it into a red dwarf (gl3d_red only).
  - `F.light = [x, y]`: where the light comes from, in screen pixels.
  - `F.ov`: an SVG overlay drawn above the 3D canvas (labels, arrows, question mark). Set it to `''` when not used.
  - `F.flash`: a 0–1 white flash.
- **`sceneEarth(t)`:** the closing scene. It shows the Earth, a big gold "؟", and a red "اشترك" button that bobs.
- **`SCENES = [{s: 0, f: sceneHook}, {s: S0(1) - .2, f: ...}, ...]`:** one scene per line. Scenes crossfade over `XF = .5` s.
- **`NOKB = new Set([...])`:** scenes with no slow Ken-Burns zoom. Use it for scenes with a 3D globe, maps and diagrams. It needs the NOKB sed patch from SKILL.md step 5.
- **`TLI = [['label', time], ...]` and `LIST_ON = new Set([...])`:** the side timeline list (4 items) and the scenes that show it. The header text is set in `$('ui').innerHTML`.
- **`CHIPS = [[id, text, x, y, cls, tIn, tOut], ...]`:** gold chips.
  - `cls` is one of `big`, `red`, `dark` or `ice`.
  - Keep them clear of captions (y≈330 under the caption, or y≈1200 at the bottom) and clear of each other.
- **`renderUI(t)`:** copy it unchanged from the example.

## Gold caption keywords
`build_short.py X X_mid.js "w1|w2"` puts these exact words (with tashkeel, as in script.json) in gold in the top captions. Pick 1–2 per line.

## The gl3d modules (copy one to `gl3d_X.js` and change the 4th texture)
| module | 2nd sphere texture | extras |
|---|---|---|
| gl3d_v2.js | moon_1024.jpg | basic |
| gl3d_red.js | proxb.jpg | Sun `hue` (red dwarf) |
| gl3d_retro.js | earth_retro.jpg | Earth `xr`, `spin` |
| gl3d_yell.js | earth_ash.jpg | `xr`, `spin`, plus `geoXY(lat, lon, e, t)` and `rotFor(lon)` for pinning SVG labels to places on the globe |
| gl3d_spin.js | earth_stopped.jpg | |
| gl3d_plants.js | earth_bare.jpg | |

To make a changed-Earth texture, write a Python script like `tex/retro_tex.py`, `tex/ash_tex.py` or `tex/proxb_tex.py`. These read `earth_atmos_2048.jpg` and paint soft, noise-modulated changes (never hard boxes). Save the result into `tex/`.

### gl3d_world.js: the three.js world (first used in #27, flat Earth)
- **What it does:** one renderer with a perspective camera and four sets, chosen per frame by `F.w = { set: 'space' | 'street' | 'sea' | 'edge', cam: { pos, look, fov }, ... }`.
  - The disc/globe morph (`disc: { m, spin, sea, dry, lights, sunI }`), the 3D arrows, the Sun and the Moon with the eclipse shadow live in `space`.
  - The textures are made in code.
  - Each scene returns a black SVG rect; people and labels go in `F.ov`.
  - The scene code uses `proj3(cam, point)` (see `videos/27-flat-earth/src/flat3_new.js`) to place 2D people on 3D ground.
- **Page setup:** it needs an import map and the crossfade patch. `videos/27-flat-earth/src/b3.sh` shows the build: add `<script type="importmap">{"imports":{"three":"./three.module.js"}}</script>` before the module script, and add `w: F.w` to the `FA` object.
- **Style limit:** use its space set freely. Street/sea/edge must follow the style rule in style.md: styled to match the drawings, never photoreal. `tex/flat3_*.jpg` are the three.js Earth maps reprojected to a disc by `azim.py`. `waternormals.jpg` comes from `waternormals.py`.

## Helper library (loaded before X_new.js)
- `sun.html` slices are pasted in by build_short:
  - `space(t, top, bot)`: a starfield
  - `person(x, y, {s, face, moving, phase, t, top, pants, skin, hair, coat, ...})`: the house 2D person
  - `skyline`, `sun`, `earth`, `moon`, `snow`, `palm`. Never use `palm` (no palms, see style.md).
- `red_street.js`: `bareStreet(t, {id, sky:[3 colours], sunR, sunCol, glowR, glowCol, sunGlow, harsh, green, afterSky})` is the standard palm-free city street. Most "people on Earth" scenes start from it.
- `plants_real.js`:
  - `onWalk(x, y, c, sc, face, t)`: a person who really walks forward along the pavement.
  - It also has another `bareStreet`. red_street.js loads later and wins.
- `people_helpers.js`:
  - `bldg`, `car(x, y, s, col, face, lights)` (parked cars go on the shoulder), `umb`, `rain`
  - `cracks`, `riverW`, `street`, `pine`, `treeB`
  - the filters `RDEF` and `RDEF2`
- `trees_real.js`: `treeR(x, y, h, seed, t)` for realistic street trees, and `castSh` for ground shadows.
- `real2.js` (the realism kit):
  - `mountainsR(yb, amp, seed, {snow, points, ...})` for lit terrain
  - `pineR` and `forestR` for trees, `meadow(y0, y1, t)` for grass
  - `cumulus(cx, cy, w, seed)` for clouds, which needs `CUDEF` in `<defs>`
  - `profileP`
- `scene_lib.js`:
  - `groundFromAbove`, `airliner`, `bird`
  - `ridgeP`, `mountains(..., snowAt)`, `rockR` with `ROCKDEF`
- `plants_animals.js`: `quad` (four-legged animals) and `pigeon`.
- `examples/bh_new.js` adds `milkyWay`, `lensBH` (gravitational lensing done with soft radial masks) and `cityDay`.
- `examples/yell_real.js` has realistic ash, eruption and village pieces.
