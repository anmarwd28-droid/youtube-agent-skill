# Shared real-world assets for Weird Space Lab

## planets/ — Solar System Scope textures (CC BY 4.0)
Source: https://www.solarsystemscope.com/textures/ (based on NASA mission imagery).
License: Creative Commons Attribution 4.0. **Credit in the video description when used:** "Planet textures: Solar System Scope (CC BY 4.0)".
Use in a scene through the 3D layer: `F.planet = { x, y, r, a: 1, tex: 'mars', rot, spin, tilt, haze: [r, g, b] }` (needs `gl3d_wsl.js` and the `planets/` folder copied next to the page).

## textures/ — Poly Haven photo textures (CC0, no credit needed)
Source: https://polyhaven.com (1k diffuse maps): rock_face, snow_02, forest_ground_04, wood_floor_deck, aerial_grass_rock, brown_mud_leaves_01, asphalt_02, sandstone_cracks.
Use in SVG as a pattern fill blended over the drawn shapes (see `photoFill` in `common.js`), so the look stays the same 2D style with real surface detail.
