// ===================== "what if the Earth were flat?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
// deep space with the real Milky Way (Solar System Scope, CC BY 4.0)
const milky = (a = .85, x = -920, y = 0, w = 2560) => space(0, '#010208', '#04061a') + `<image href="tex/milky_way.jpg" x="${x}" y="${y}" width="${w}" height="${w / 2}" opacity="${a}" preserveAspectRatio="none"/>`;
// screen point of disc-local (u, v) for a disc at (cx, cy), radius R, tilted by tilt
const DP = (cx, cy, R, tilt, u, v) => [cx + R * u, cy + R * v * Math.cos(tilt)];
function arrow(x0, y0, x1, y1, a, col = '#f4c76b', w = 4) {
  const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, h = 12 + w * 2;
  return `<g opacity="${a.toFixed(2)}"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="#000" stroke-opacity=".5" stroke-width="${w + 4}" stroke-linecap="round"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${(x1 - ux * h - uy * h * .55).toFixed(1)},${(y1 - uy * h + ux * h * .55).toFixed(1)} L${(x1 - ux * h + uy * h * .55).toFixed(1)},${(y1 - uy * h - ux * h * .55).toFixed(1)}Z" fill="${col}" stroke="#000" stroke-opacity=".5" stroke-width="2"/></g>`;
}
const noEarth = () => { F.earth = null; F.moon = null; F.sun = null; };
// 0: the real globe flattens into a disc
function sceneHook(t) {
  const m = 1 - ease(ramp(t, WS(0, 3) - .1, WS(0, 6) + .3));
  let s = milky(.8); noEarth();
  F.disc = { x: 360, y: 760, r: 270, a: 1, tilt: 1.0 - .1 * (1 - m), spin: .3 + t * .05, m, sunI: 1, L: [-.5, .6, 1], clouds: .7 };
  F.ov = ''; return s;
}
// 1: gravity pulls any Earth-sized body into a ball: the disc folds back into a sphere
function sceneRound(t) {
  const st = S0(1) - .2, T = t - st, ar = ease(ramp(t, WS(1, 4) - .2, WS(1, 5) + .3)), m = ease(ramp(t, WS(1, 9) - .3, WS(1, 14) + .4));
  let s = milky(.8); noEarth();
  const tilt = .95, R = 280; F.disc = { x: 360, y: 760, r: R, a: 1, tilt, spin: .4 + t * .05, m, sunI: 1, L: [-.5, .6, 1], clouds: .7 };
  let o = ''; const fa = ar * (1 - ease(ramp(t, WS(1, 9) - .3, WS(1, 9) + .4)));
  if (fa > 0) for (let i = 0; i < 8; i++) { const th = i / 8 * 6.283 + .2, [x0, y0] = DP(360, 760, R, tilt, Math.sin(th) * 1.18, Math.cos(th) * 1.18), [x1, y1] = DP(360, 760, R, tilt, Math.sin(th) * .82, Math.cos(th) * .82); o += arrow(x0, y0, x1, y1, fa); }
  F.ov = o; return s;
}
// 2: on a disc, gravity points to the centre of the disc, not straight down
function scenePull(t) {
  const st = S0(2) - .2, T = t - st, ar = ease(ramp(t, WS(2, 7) - .2, WS(2, 10) + .3)), dn = ease(ramp(t, WS(2, 11) - .1, WS(2, 13) + .2));
  let s = milky(.8); noEarth();
  const tilt = 1.02, R = 300, CY = 780; F.disc = { x: 360, y: CY, r: R, a: 1, tilt, spin: .9 + t * .03, m: 0, sunI: 1, L: [-.4, .6, 1], clouds: .65 };
  let o = `<g opacity="${ar.toFixed(2)}"><circle cx="360" cy="${CY}" r="9" fill="#f4c76b" stroke="#000" stroke-width="2"/></g>`;
  [[.88, .3], [.88, 2.0], [.88, 3.6], [.88, 5.0], [.55, 1.1], [.55, 4.3]].forEach(([r, th], i) => { const [x0, y0] = DP(360, CY, R, tilt, Math.sin(th) * r, Math.cos(th) * r), [x1, y1] = DP(360, CY, R, tilt, Math.sin(th) * r * .45, Math.cos(th) * r * .45);
    const a = ar * ease(ramp(t, WS(2, 7) + i * .12, WS(2, 7) + i * .12 + .4)); o += arrow(x0, y0, x1, y1, a);
    // a crossed-out "straight down" arrow at the same spots
    o += `<g opacity="${(dn * .9).toFixed(2)}">` + arrow(x0, y0, x0, y0 + 60, 1, '#cfd8ff', 3) + `<path d="M${x0 - 12},${y0 + 18} l24,24 M${x0 + 12},${y0 + 18} l-24,24" stroke="#ff5a4a" stroke-width="5" stroke-linecap="round"/></g>`; });
  F.ov = o; return s;
}
// 3: away from the centre the ground tilts under your feet: the street leans, people climb an endless slope
function sceneSlope(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 4) - .2, WS(3, 10) + .5)), ang = 12 * k, rad = ang * Math.PI / 180, PX = 360, PY = 1094;
  let s = `<g transform="rotate(${(-ang).toFixed(2)},${PX},${PY})"><g transform="translate(${PX},${PY}) scale(1.72) translate(${-PX},${-PY})">` + cityDay(t, { id: 's3' }) + `</g></g>`;
  // the pavement line, in screen space, after rotation: y = PY - (x-PX)*tan(ang) (scaled by 1.42 around the pivot)
  const gy = x => PY - (x - PX) * Math.tan(rad);
  const walk = (x0, c, sc, sp, ph) => { const x = x0 + T * sp * (1 - .55 * k), y = gy(x) + 2; return `<g transform="rotate(${(-ang * .2).toFixed(2)},${x},${y}) rotate(${(ang * .55).toFixed(2)},${x},${y})">` + castSh(x, y, sc) + onWalk(x, y, CROWD[c], sc, 1, t, { moving: 1, phase: t * (6 - 2.5 * k) + ph, amp: .7 + .15 * k }) + `</g>`; };
  s += walk(90, 0, .56, 26, 0) + walk(260, 2, .58, 22, 1.3);
  // a ball rolls down the slope towards the centre
  const bx = 520 - 160 * k * k - T * 5 * k, by = gy(bx) - 12; s += `<circle cx="${bx}" cy="${by}" r="12" fill="#e8463a"/><path d="M${bx - 12},${by} Q${bx},${by + 6} ${bx + 12},${by}" stroke="#fff" stroke-width="3" fill="none" transform="rotate(${(-T * 200 * k).toFixed(0)},${bx},${by})"/>`;
  // slope gauge
  s += `<g transform="translate(150,520)" opacity="${ease(ramp(t, WS(3, 7) - .2, WS(3, 7) + .3)).toFixed(2)}"><rect x="-110" y="-70" width="220" height="130" rx="18" fill="#0a0e1c" opacity=".88"/><path d="M-80,30 L80,30" stroke="#8a93b8" stroke-width="3"/><path d="M-80,30 L${-80 + 160 * Math.cos(rad * 2)},${30 - 160 * Math.sin(rad * 2)}" stroke="#f4c76b" stroke-width="5" stroke-linecap="round"/><path d="M-40,30 A40,40 0 0 0 ${-80 + 40 * Math.cos(rad * 2) + 40},${30 - 40 * Math.sin(rad * 2)}" fill="none" stroke="#f4c76b" stroke-width="2"/>` + lbl(0, -36, 'ميلٌ يزداد', 1, '#cfd8ff', 20) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 4: oceans and air slide to the middle: a vast central sea, dry airless rims
function sceneSea(t) {
  const st = S0(4) - .2, T = t - st, sea = ease(ramp(t, WS(4, 0) - .2, WS(4, 8) + .4)), dry = ease(ramp(t, WS(4, 1), WS(4, 12) + .3));
  let s = milky(.8); noEarth();
  const tilt = .98, R = 300, CY = 790; F.disc = { x: 360, y: CY, r: R, a: 1, tilt, spin: 1.1 + t * .03, m: 0, sunI: 1, L: [-.4, .7, 1], sea, dry, clouds: .65 * (1 - dry * .6) };
  let o = ''; const [ex, ey] = DP(360, CY, R, tilt, -.78, .55);
  o += lbl(360, CY - 70, 'بحرٌ هائل', ease(ramp(t, WS(4, 5), WS(4, 6) + .3)), '#cfe6ff', 28);
  o += `<g opacity="${ease(ramp(t, WS(4, 9), WS(4, 10) + .3)).toFixed(2)}"><path d="M${ex},${ey} L${ex - 20},${ey + 120}" stroke="#f4c76b" stroke-width="2"/>` + lbl(ex + 30, ey + 150, 'أطرافٌ جافّة بلا هواء', 1, '#f4c76b', 24) + `</g>`;
  // water sliding inward: faint streaks over the disc
  for (let i = 0; i < 14; i++) { const th = i / 14 * 6.283, ph = pmod(T * .5 + i * .37, 1), r0 = .95 - ph * .45, [x0, y0] = DP(360, CY, R, tilt, Math.sin(th) * r0, Math.cos(th) * r0), [x1, y1] = DP(360, CY, R, tilt, Math.sin(th) * (r0 - .12), Math.cos(th) * (r0 - .12));
    o += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#bfe0ff" stroke-width="2.5" stroke-linecap="round" opacity="${(.5 * Math.sin(ph * Math.PI) * sea * (1 - dry * .7)).toFixed(2)}"/>`; }
  F.ov = o; return s;
}
// 5: no day and night as we know it: when the Sun rises, the whole disc lights up at once
function sceneDay(t) {
  const st = S0(5) - .2, T = t - st, up = ease(ramp(t, WS(5, 8) - .2, WS(5, 12) + .3));
  let s = milky(.8); noEarth();
  F.sun = { x: 600, y: lerp(560, 330, up), r: 46, a: .2 + .8 * up };
  F.disc = { x: 340, y: 800, r: 290, a: 1, tilt: 1.0, spin: 1.4 + t * .03, m: 0, sunI: .05 + .95 * up, lights: 1 - up * .9, L: [.5, .9, .8], clouds: .6 };
  F.ov = `<circle cx="600" cy="${lerp(560, 330, up)}" r="120" fill="#fff2c8" opacity="${(.18 * up).toFixed(2)}" filter="url(#soft)"/>`; return s;
}
// 6: ships don't sink below the horizon: they only shrink until haze hides them
function sceneShip(t) {
  const st = S0(6) - .2, T = t - st, k = ease(ramp(t, WS(6, 1) - .3, WS(6, 10) + .4)), fog = ramp(t, WS(6, 8), WS(6, 10) + .4), HZ = 700;
  let s = `<defs><linearGradient id="skS6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a86b8"/><stop offset="1" stop-color="#dfe8ee"/></linearGradient><linearGradient id="seS6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa8bf"/><stop offset=".08" stop-color="#3f6f94"/><stop offset="1" stop-color="#0f3352"/></linearGradient><linearGradient id="fgS6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8ee" stop-opacity="0"/><stop offset=".5" stop-color="#dfe8ee" stop-opacity="1"/><stop offset="1" stop-color="#dfe8ee" stop-opacity="0"/></linearGradient>${CUDEF}${RDEF}</defs>` +
    `<rect width="720" height="${HZ}" fill="url(#skS6)"/>` + cumulus(160, 470, 200, 4, { a: .8 }) + cumulus(560, 560, 160, 6, { a: .7 }) + `<rect y="${HZ}" width="720" height="${1280 - HZ}" fill="url(#seS6)"/><rect y="${HZ}" width="720" height="${1280 - HZ}" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  // waves: perspective glints
  const r = RS(11); for (let i = 0; i < 260; i++) { const z = Math.pow(r(), 1.8), y = HZ + 4 + z * 580, x = pmod(r() * 760 + Math.sin(T * 1.2 + i) * 6 * (z + .2), 760) - 20, w = 4 + z * 46; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-2 - z * 5).toFixed(1)} ${w.toFixed(1)},0" stroke="${r() < .5 ? '#cfe2f2' : '#08243c'}" stroke-width="${(1 + z * 2).toFixed(1)}" fill="none" opacity="${(.25 + .35 * z).toFixed(2)}"/>`; }
  // the ship: whole at every distance (no hull hidden), only smaller
  const sc = lerp(1.25, .07, Math.pow(k, .6)), sx = lerp(300, 420, k), sy = lerp(1010, HZ + 3, Math.pow(k, .45));
  s += `<g transform="translate(${sx.toFixed(1)},${sy.toFixed(1)}) scale(${sc.toFixed(3)})" opacity="${(1 - fog * .95).toFixed(2)}"><path d="M-170,0 L170,0 L150,40 L-150,40Z" fill="#7a2a22"/><path d="M-182,-38 L190,-38 L170,0 L-170,0Z" fill="#20262e"/><rect x="-182" y="-42" width="372" height="6" fill="#e8e8e8"/>` +
    Array.from({ length: 22 }, (_, i) => { const cx = -150 + (i % 11) * 22, cy = -60 - Math.floor(i / 11) * 18; return `<rect x="${cx}" y="${cy}" width="20" height="17" fill="${['#c0392b', '#2a6ab0', '#e8a23a', '#3a8a5a', '#8a8a8a'][(i * 7) % 5]}"/>`; }).join('') +
    `<rect x="110" y="-110" width="50" height="72" fill="#f2f2f2"/><rect x="114" y="-102" width="42" height="8" fill="#2a3a4a"/><rect x="128" y="-140" width="12" height="30" fill="#c83a2a"/><path d="M-170,40 Q-260,46 -420,44" stroke="#fff" stroke-width="6" opacity=".5" fill="none"/></g>`;
  s += `<rect y="${HZ - 60}" width="720" height="120" fill="url(#fgS6)" opacity="${(.25 + .75 * fog).toFixed(2)}"/>`;
  s += lbl(360, 1180, 'تصغرُ فقط', ease(ramp(t, WS(6, 5), WS(6, 6) + .3)), '#fff', 30);
  noEarth(); F.ov = ''; return s;
}
// 7: the edge: a rock cliff (Poly Haven textures) looking out over space, stars below the rim; no air, a black sky
function sceneEdge(t) {
  const st = S0(7) - .2, T = t - st, cam = ease(clamp(T / (S0(8) - st))), EY = 860 - 40 * cam;
  let s = `<defs><pattern id="rkT" patternUnits="userSpaceOnUse" width="512" height="512" patternTransform="translate(0,${EY}) scale(1.4,.55)"><image href="tex/aerial_rocks.jpg" width="512" height="512"/></pattern><pattern id="rkF" patternUnits="userSpaceOnUse" width="300" height="300"><image href="tex/rock_face.jpg" width="300" height="300"/></pattern>` +
    `<linearGradient id="gdE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset=".25" stop-color="#000" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".05"/></linearGradient><radialGradient id="snE" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".2" stop-color="#fff6e0" stop-opacity=".25"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>${RDEF}</defs>`;
  s += milky(1) + stars(1, t);
  s += `<circle cx="560" cy="330" r="80" fill="url(#snE)"/><circle cx="560" cy="330" r="16" fill="#fffdf6"/>`;
  // the far rim: a jagged lip, with the cliff face falling away below on the right
  let lip = `M-20,${EY + 20}`; const r = RS(31); for (let x = 0; x <= 740; x += 20) lip += ` L${x},${(EY + Math.sin(x * .03) * 6 + (r() - .5) * 10).toFixed(1)}`;
  s += `<path d="M560,${EY + 4} L740,${EY - 4} L740,1280 L700,1280 Q640,${EY + 260} 600,${EY + 60}Z" fill="url(#rkF)"/><path d="M560,${EY + 4} L740,${EY - 4} L740,1280 L700,1280 Q640,${EY + 260} 600,${EY + 60}Z" fill="#000" opacity=".25"/>`;
  const GP = `${lip} L560,${EY + 4} Q610,${EY + 200} 690,1290 L-20,1290Z`;
  let bands = '', pats = ''; for (let b = 0; b < 12; b++) { const y0 = EY - 12 + (1300 - EY) * Math.pow(b / 12, 1.7), y1 = EY - 12 + (1300 - EY) * Math.pow((b + 1) / 12, 1.7), sc = .16 + 1.3 * Math.pow((b + .5) / 12, 1.4);
    pats += `<pattern id="rkB${b}" patternUnits="userSpaceOnUse" width="512" height="512" patternTransform="translate(${-b * 37},${y0}) scale(${(sc * 1.1).toFixed(3)},${(sc * .42).toFixed(3)})"><image href="tex/aerial_rocks.jpg" width="512" height="512"/></pattern>`;
    bands += `<rect x="-20" y="${y0.toFixed(1)}" width="760" height="${(y1 - y0 + 1).toFixed(1)}" fill="url(#rkB${b})"/>`; }
  s += `<defs>${pats}<clipPath id="gcE"><path d="${GP}"/></clipPath><linearGradient id="hzE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c8b0" stop-opacity=".35"/><stop offset=".12" stop-color="#d8c8b0" stop-opacity="0"/></linearGradient><linearGradient id="lgE" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#fff2d8" stop-opacity=".22"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient></defs>` +
    `<g clip-path="url(#gcE)">${bands}<rect x="-20" y="${EY - 20}" width="760" height="${1300 - EY}" fill="#5a4a38" opacity=".22"/><rect x="-20" y="${EY - 20}" width="760" height="${1300 - EY}" fill="url(#lgE)"/><rect x="-20" y="${EY - 20}" width="760" height="${1300 - EY}" fill="url(#hzE)"/><rect x="-20" y="${EY - 20}" width="760" height="${1300 - EY}" fill="#000" filter="url(#grainR)" opacity=".2"/></g>` +
    `<path d="${lip} L560,${EY + 4}" stroke="#fff2d8" stroke-width="2" fill="none" opacity=".5"/>`;
  s += lbl(300, EY - 40, 'الحافّة', ease(ramp(t, WS(7, 7) - .1, WS(7, 7) + .4)), '#f4c76b', 34);
  noEarth(); F.ov = ''; return s;
}
// 8: we know it's a ball: in every lunar eclipse Earth's shadow on the Moon is round
function sceneEclipse(t) {
  const st = S0(8) - .2, T = t - st, k = ease(ramp(t, WS(8, 3) - .3, WS(8, 11) + .4)), out = ease(ramp(t, WS(8, 10), WS(8, 12) + .2));
  let s = milky(.7); F.earth = null; F.sun = null;
  const MX = 360, MY = 760, MR = 220; F.moon = { x: MX, y: MY, r: MR, a: 1, sunI: 1.05 }; F.light = [MX, MY];
  const SR = MR * 2.7, cx = MX - SR - MR * 1.05 + k * (MR * 1.75), cy = MY - 40;
  F.ov = `<defs><clipPath id="mC8"><circle cx="${MX}" cy="${MY}" r="${MR - .5}"/></clipPath><radialGradient id="shR" cx=".5" cy=".5" r=".5"><stop offset=".9" stop-color="#3a0a04" stop-opacity=".86"/><stop offset=".97" stop-color="#5a1a08" stop-opacity=".55"/><stop offset="1" stop-color="#5a1a08" stop-opacity="0"/></radialGradient></defs>` +
    `<g clip-path="url(#mC8)"><circle cx="${cx.toFixed(1)}" cy="${cy}" r="${SR}" fill="url(#shR)"/></g>` +
    `<circle cx="${cx.toFixed(1)}" cy="${cy}" r="${SR * .985}" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="12 10" opacity="${(.85 * out).toFixed(2)}"/>`;
  return s;
}
// 9: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = milky(.8); noEarth();
  F.disc = { x: 360, y: 800, r: 250, a: 1, tilt: 1.0, spin: 2 + t * .08, m: 0, sunI: 1, L: [-.4, .6, 1], clouds: .7 };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7), WS(9, 7) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneRound }, { s: S0(2) - .2, f: scenePull }, { s: S0(3) - .2, f: sceneSlope }, { s: S0(4) - .2, f: sceneSea },
  { s: S0(5) - .2, f: sceneDay }, { s: S0(6) - .2, f: sceneShip }, { s: S0(7) - .2, f: sceneEdge }, { s: S0(8) - .2, f: sceneEclipse }, { s: S0(9) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneHook, sceneRound, scenePull, sceneSea, sceneDay, sceneEclipse, sceneSlope]);
const XF = .5;
const TLI = [['جاذبيّة نحو المركز', S0(2)], ['أرضٌ مائلة', S0(3)], ['بحرٌ في الوسط', S0(4)], ['نهارٌ واحد', S0(5)]];
const LIST_ON = new Set([scenePull, sceneSlope, sceneSea, sceneDay]);
const CHIPS = [
  ['c1', 'الجاذبيّة تصنعُ الكُرات', 360, 330, 'big', WS(1, 12), S0(2) - .3],
  ['c2', 'نحوَ المركز', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c3', 'نهارٌ واحدٌ للجميع', 360, 330, 'big', WS(5, 11), S0(6) - .3],
  ['c4', 'ظلٌّ دائريٌّ دائماً', 360, 330, 'big', WS(8, 11), S0(9) - .3],
  ['c5', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">أرضٌ مسطّحة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
