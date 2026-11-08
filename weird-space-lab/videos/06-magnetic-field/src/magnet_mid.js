// ===================== Weird Space Lab: What if Earth's magnetic field disappeared? =====================
// dipole field lines around a planet centred at (cx, cy) with radius R; axis tilted by ang degrees
function fieldLines(cx, cy, R, ang, a, t, col = '#7ab4ff') {
  if (a <= .01) return '';
  let s = `<g opacity="${a}" transform="rotate(${ang},${cx},${cy})">`;
  [1.5, 2.0, 2.7, 3.6].forEach((L, k) => { [-1, 1].forEach(side => {
    const th0 = Math.asin(Math.sqrt(1 / L)); let d = '';
    for (let i = 0; i <= 40; i++) { const th = th0 + (Math.PI - 2 * th0) * i / 40, r = L * R * Math.sin(th) ** 2; d += `${i ? 'L' : 'M'}${(cx + side * r * Math.sin(th)).toFixed(1)},${(cy - r * Math.cos(th)).toFixed(1)}`; }
    s += `<path d="${d}" stroke="${col}" stroke-width="${2.6 - k * .4}" fill="none" opacity="${.75 - k * .12}" stroke-dasharray="14 10" stroke-dashoffset="${-t * 30 * side}"/>`; }); });
  return s + `</g>`;
}
const EARTH = (x, y, r, rot = 3, extra = {}) => { F.earth = Object.assign({ x, y, r, a: 1, sunI: 1, lights: .3, rot: rot + F.t * .03, tilt: .41 }, extra); F.light = [-700, y - 100]; F.moon = null; };
// 0: the real Earth wrapped in its field lines; on "disappeared" the lines fade
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 5) - .1, WS(0, 5) + .6));
  let s = space(t, '#03050f', '#0a1030'); EARTH(360, 800, 200);
  F.ov = fieldLines(360, 800, 200, -15, 1 - k, t); return s;
}
// 1: a cut through the Earth: molten iron flowing in the outer core makes the field
function sceneCore(t) {
  const k = ease(ramp(t, WS(1, 3) - .2, WS(1, 9)));
  let s = space(t, '#03050f', '#0a1030');
  const cx = 360, cy = 820, R = 260;
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#3a6a9a"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += `<path d="M${cx},${cy} L${cx + R},${cy} A${R},${R} 0 0 0 ${cx},${cy - R}Z" fill="#8a5a3a"/>` +
    `<path d="M${cx},${cy} L${cx + R - 14},${cy} A${R - 14},${R - 14} 0 0 0 ${cx},${cy - R + 14}Z" fill="#c8542a"/>` +
    `<path d="M${cx},${cy} L${cx + R * .55},${cy} A${R * .55},${R * .55} 0 0 0 ${cx},${cy - R * .55}Z" fill="#f49a2a"/>` +
    `<path d="M${cx},${cy} L${cx + R * .22},${cy} A${R * .22},${R * .22} 0 0 0 ${cx},${cy - R * .22}Z" fill="#fff2b0"/>`;
  // swirling flow in the outer core
  for (let i = 0; i < 9; i++) { const a = -(i / 9) * Math.PI / 2 - .1 + t * .4 % (Math.PI / 18), rr = R * (.32 + .18 * ((i * 7) % 3) / 2); const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
    s += `<path d="M${x},${y} a10,10 0 1,1 10,10" stroke="#ffd59a" stroke-width="3" fill="none" opacity="${.8 * k}" transform="rotate(${t * 90 + i * 40},${x},${y})"/>`; }
  F.ov = fieldLines(cx, cy, R, -15, .5 * k, t) + `<g opacity="${k}">` + EN('Outer core: molten iron', cx + 40, cy - R * .38, 20, '#fff', 'start') + EN('Inner core', cx + 30, cy - 18, 18, '#3a2a10', 'start') + EN('Mantle', cx + R * .62, cy - R * .62, 20, '#fff', 'start') + `</g>`;
  return s;
}
// 2a: compass needles spin aimlessly
function sceneCompass(t) {
  const k = ease(ramp(t, WS(2, 2), WS(2, 4))), cx = 360, cy = 780;
  const ang = lerp(0, Math.sin(t * 2.3) * 140 + Math.sin(t * .9) * 80, k);
  let s = `<rect width="720" height="1280" fill="#2a1e16"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="250" fill="#8a6a3a"/><circle cx="${cx}" cy="${cy}" r="226" fill="#f4ecd8"/><circle cx="${cx}" cy="${cy}" r="226" fill="none" stroke="#5a4020" stroke-width="4"/>` +
    Array.from({ length: 36 }, (_, i) => `<rect x="${cx - 1.5}" y="${cy - 222}" width="3" height="${i % 9 === 0 ? 22 : 10}" fill="#5a4020" transform="rotate(${i * 10},${cx},${cy})"/>`).join('') +
    [['N', 0], ['E', 90], ['S', 180], ['W', 270]].map(([l, a]) => EN(l, cx + Math.sin(a / 57.3) * 170, cy - Math.cos(a / 57.3) * 170 + 14, 40, l === 'N' ? '#c62828' : '#3a2a10')).join('') +
    `<g transform="rotate(${ang},${cx},${cy})"><path d="M${cx},${cy - 150} L${cx + 18},${cy} L${cx - 18},${cy}Z" fill="#c62828"/><path d="M${cx},${cy + 150} L${cx + 18},${cy} L${cx - 18},${cy}Z" fill="#e8e4d8" stroke="#888" stroke-width="2"/></g><circle cx="${cx}" cy="${cy}" r="12" fill="#3a2a10"/>`;
  F.ov = ''; return s;
}
// 2b: sea turtles and birds wander off course
function turtle(x, y, s, t, rot) {
  const f = Math.sin(t * 4) * 12;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M20,-20 q30,${-18 + f} 46,${-4 + f}" stroke="#5a8a4a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="M20,20 q30,${18 - f} 46,${4 - f}" stroke="#5a8a4a" stroke-width="14" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="0" cy="0" rx="44" ry="34" fill="#6a5a2a"/>` + [[-14, -10], [14, -10], [0, 10], [-18, 12], [18, 12]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="10" ry="8" fill="#8a7a3a"/>`).join('') + `<circle cx="52" cy="0" r="14" fill="#7aa05a"/><circle cx="58" cy="-4" r="3" fill="#111"/></g>`;
}
function sceneLost(t) {
  const st = WS(2, 7) - .3, T = t - st;
  let s = `<defs><linearGradient id="seaL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a6a9a"/><stop offset="1" stop-color="#0a2a4a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#seaL)"/>`;
  for (let i = 0; i < 12; i++) s += `<path d="M-20,${420 + i * 70} q45,-6 90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0" stroke="#fff" stroke-opacity=".06" stroke-width="2" fill="none" transform="translate(${(t * 20) % 90 - 90},0)"/>`;
  // a wandering dashed path
  let d = '', x = 120, y = 1000, a = -.6; const r = RS(5); for (let i = 0; i < 40; i++) { a += (r() - .5) * 1.4; x += Math.cos(a) * 16; y += Math.sin(a) * 16; x = clamp(x, 60, 660); y = clamp(y, 480, 1180); d += `${i ? 'L' : 'M'}${x.toFixed(0)},${y.toFixed(0)}`; }
  s += `<path d="${d}" stroke="#f4c76b" stroke-width="3" fill="none" stroke-dasharray="10 8" opacity=".8"/>`;
  s += turtle(360 + Math.sin(T * .7) * 120, 820 + Math.cos(T * .9) * 80, 1.1, t, Math.sin(T * .8) * 140);
  for (let i = 0; i < 5; i++) s += bird(200 + i * 70 + Math.sin(T * 1.5 + i) * 60, 520 + Math.sin(T + i * 2) * 40, .9, t * 10 + i, Math.sin(T * 2 + i) * 40);
  F.ov = EN('?', 600, 560, 90, '#f4c76b'); return s;
}
// 3: the solar wind hits the upper atmosphere directly
function sceneWind(t) {
  const st = S0(3) - .2, k = ease(ramp(t, WS(3, 11) - .3, WS(3, 16)));
  let s = space(t, '#02040c', '#060a1e') + `<circle cx="-60" cy="800" r="200" fill="#ffb347" opacity=".35" filter="url(#soft)"/><circle cx="-60" cy="800" r="150" fill="#ffd27a"/>`;
  EARTH(520, 800, 170);
  let p = ''; const r = RS(41); for (let i = 0; i < 90; i++) { const y0 = 560 + r() * 480, v = 260 + r() * 160, x = 110 + ((t * v + r() * 600) % 600);
    if (x > 520 - Math.sqrt(Math.max(0, 182 ** 2 - (y0 - 800) ** 2))) continue;
    p += `<circle cx="${x}" cy="${y0}" r="${2 + r() * 2}" fill="${r() > .5 ? '#ffd59a' : '#ff8a5a'}" opacity=".85"/>`; }
  F.ov = p + `<path d="M${520 - 176},${640} A180,180 0 0 0 ${520 - 176},${960}" stroke="#ff5a8a" stroke-width="${10 * k}" fill="none" opacity="${.8 * k}" filter="url(#blur2)"/>` + EN('SOLAR WIND', 230, 520, 22, '#ffd59a', 'middle', 700, 'letter-spacing="2"');
  return s;
}
// 4: satellites take more radiation damage
function sceneSat(t) {
  const k = ease(ramp(t, WS(4, 3), WS(4, 6))), cx = 360, cy = 780;
  let s = space(t, '#02040c', '#060a1e');
  s += `<g transform="rotate(${Math.sin(t * .5) * 6},${cx},${cy})"><rect x="${cx - 300}" y="${cy - 50}" width="210" height="100" fill="#2a3a6a"/><rect x="${cx + 90}" y="${cy - 50}" width="210" height="100" fill="#2a3a6a"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${cx - 300 + i * 26}" y="${cy - 50}" width="1.5" height="100" fill="#c8a24a" opacity=".6"/><rect x="${cx + 90 + i * 26}" y="${cy - 50}" width="1.5" height="100" fill="#c8a24a" opacity=".6"/>`).join('') +
    `<rect x="${cx - 90}" y="${cy - 6}" width="180" height="12" fill="#888"/><rect x="${cx - 60}" y="${cy - 70}" width="120" height="140" rx="10" fill="#d8b04a"/><rect x="${cx - 60}" y="${cy - 70}" width="120" height="140" rx="10" fill="#000" filter="url(#grainR)" opacity=".25"/><circle cx="${cx}" cy="${cy - 100}" r="34" fill="#e8e4dc"/><rect x="${cx - 3}" y="${cy - 100}" width="6" height="34" fill="#888"/></g>`;
  let hits = ''; const r = RS(8); for (let i = 0; i < 40; i++) { const q = (t * (.8 + r()) + r()) % 1, sx = r() * 720, sy = 300 + r() * 300, ex = cx + (r() - .5) * 400, ey = cy + (r() - .5) * 120;
    hits += `<path d="M${lerp(sx, ex, q)},${lerp(sy, ey, q)} l${(ex - sx) * .06},${(ey - sy) * .06}" stroke="#ff8a5a" stroke-width="2.5" opacity="${k * .9}"/>` + (q > .9 ? `<circle cx="${ex}" cy="${ey}" r="${8}" fill="#fff6d0" opacity="${k}"/>` : ''); }
  F.ov = hits; return s;
}
// 5: Mars lost most of its air – the solar wind stripping a planet with no global field
function sceneMars(t) {
  const k = ease(ramp(t, WS(5, 6), WS(5, 16))), m = ease(ramp(t, WS(5, 20) - .4, WS(5, 22) + .2)), cx = 400, cy = 800;
  let s = space(t, '#02040c', '#060a1e') + `<circle cx="-80" cy="800" r="170" fill="#ffb347" opacity=".3" filter="url(#soft)"/><circle cx="-80" cy="800" r="120" fill="#ffd27a"/>`;
  s += glowBall(cx, cy, 180, '#e0884a', '#6a2a14', .2);
  let w = ''; const r = RS(17); for (let i = 0; i < 40; i++) { const a = (r() - .5) * 2.4, q = (t * (.3 + r() * .3) + r()) % 1, x0 = cx + Math.cos(a) * 186, y0 = cy + Math.sin(a) * 186;
    w += `<path d="M${x0 + q * 300},${y0 + Math.sin(a) * q * 120} l40,${Math.sin(a) * 14}" stroke="#bfe0ff" stroke-width="2.5" opacity="${(1 - q) * .8 * k}" stroke-linecap="round"/>`; }
  F.ov = w + `<g opacity="${m}">` + EN('MARS', cx, cy + 250, 34, '#fff', 'middle', 700, 'letter-spacing="4"') + `</g>`; return s;
}
// 6: the field has flipped many times – the magnetic stripes on the sea floor
function sceneFlip(t) {
  const k = ease(ramp(t, WS(6, 3), WS(6, 9))), fl = Math.floor(t * 1.2) % 2;
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + wPanel(40, 470, 640, 330, 'SEA FLOOR RECORD');
  const W = [40, 26, 50, 18, 36, 22, 44, 30], cx = 360; let x = 0;
  W.forEach((w, i) => { const c = i % 2 ? '#e8e4d8' : '#1a1a22'; s += `<rect x="${cx + x}" y="550" width="${w * k}" height="200" fill="${c}"/><rect x="${cx - x - w * k}" y="550" width="${w * k}" height="200" fill="${c}"/>`; x += w * k; });
  s += `<rect x="${cx - 4}" y="540" width="8" height="220" fill="#f49a2a"/>`;
  // a bar magnet flipping
  const by = 1000;
  s += `<g transform="rotate(${fl * 180 + Math.sin(t * 6) * 2},360,${by})"><rect x="200" y="${by - 50}" width="160" height="100" rx="10" fill="#c62828"/><rect x="360" y="${by - 50}" width="160" height="100" rx="10" fill="#3a5ad0"/>` + EN('N', 280, by + 18, 52, '#fff') + EN('S', 440, by + 18, 52, '#fff') + `</g>`;
  F.ov = ''; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = fieldLines(360, 780, 250, -15, .6, t) + endCard(t, WS(7, 0), WS(7, 8)); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCore }, { s: S0(2) - .2, f: sceneCompass }, { s: WS(2, 7) - .3, f: sceneLost }, { s: S0(3) - .2, f: sceneWind },
  { s: S0(4) - .2, f: sceneSat }, { s: S0(5) - .2, f: sceneMars }, { s: S0(6) - .2, f: sceneFlip }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Compasses', S0(2)], ['Animals lost', WS(2, 7)], ['Solar wind', S0(3)], ['Satellites', S0(4)], ['Air & water', S0(5)]];
const LIST_ON = new Set([sceneWind, sceneSat]);
const CHIPS = [
  ['c1', 'Molten iron makes the shield', 360, 330, 'big', WS(1, 11), S0(2) - .3],
  ['c2', 'No more north', 360, 330, 'red', WS(2, 4), WS(2, 7) - .4],
  ['c3', 'Lost at sea', 360, 330, 'big', WS(2, 21), S0(3) - .3],
  ['c4', 'Hits the air directly', 360, 330, 'red', WS(3, 12), S0(4) - .3],
  ['c5', 'More radiation damage', 360, 330, 'red', WS(4, 3), S0(5) - .3],
  ['c6', 'Like Mars', 360, 330, 'big', WS(5, 21), S0(6) - .3],
  ['c7', 'Flipped many times – life survived', 360, 330, 'big', WS(6, 8), S0(7) - .3],
  ['c8', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 8), 999],
];
setupUI('NO FIELD', TLI, CHIPS);
