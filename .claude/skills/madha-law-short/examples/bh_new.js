
// ===================== "what if a grape-sized black hole appeared in a city?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function milkyWay(t, o = {}) {
  const r = RS(o.seed || 71); let s = `<g transform="rotate(${o.rot ?? -28},360,640)"><ellipse cx="360" cy="640" rx="900" ry="150" fill="#3a3a6a" opacity=".35" filter="url(#soft)"/><ellipse cx="360" cy="640" rx="700" ry="80" fill="#c8b89a" opacity=".22" filter="url(#soft)"/><ellipse cx="420" cy="640" rx="260" ry="60" fill="#f4e0c0" opacity=".25" filter="url(#soft)"/>`;
  for (let i = 0; i < 6; i++) { const x0 = -200 + i * 200; s += `<path d="M${x0},${640 + (r() - .5) * 30} q60,${-20 + r() * 40} 120,${(r() - .5) * 20} t140,${(r() - .5) * 30}" stroke="#0a0a14" stroke-width="${10 + r() * 18}" fill="none" opacity=".55" filter="url(#blur2)"/>`; }
  for (let i = 0; i < 700; i++) { const g = (r() + r() + r() + r()) / 2 - 1, x = -300 + r() * 1320, y = 640 + g * 220, z = r(); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.4 + z * z * 1.4).toFixed(2)}" fill="${z > .9 ? (r() > .5 ? '#ffd8b0' : '#cfe0ff') : '#ffffff'}" opacity="${(.35 + .5 * z * (.7 + .3 * Math.sin(t * 2 + i))).toFixed(2)}"/>`; }
  return s + `</g>`;
}
// a black hole in front of a scene: inside the lens radius the background appears magnified and flipped (strong lensing), an Einstein ring, the dark shadow; optional glowing accretion disk
function lensBH(cx, cy, R, bg, t, o = {}) {
  // strong lensing without a hard edge: an inverted, magnified image inside the Einstein ring, a stretched (non-inverted) image just outside it, both fading softly into the real scene; a thin Einstein ring and the black shadow
  const id = o.id || 'L', core = R * (o.core ?? .13), disk = o.disk || 0, re = R * .5, mag = o.mag ?? 1.7;
  let s = `<defs><radialGradient id="${id}mi" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff"/><stop offset=".72" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="${id}m1"><circle cx="${cx}" cy="${cy}" r="${re}" fill="url(#${id}mi)"/></mask>` +
    `<radialGradient id="${id}mo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".42" stop-color="#fff" stop-opacity="0"/><stop offset=".55" stop-color="#fff" stop-opacity="1"/><stop offset=".8" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><mask id="${id}m2"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#${id}mo)"/></mask></defs>`;
  s += `<g mask="url(#${id}m2)"><g transform="translate(${cx},${cy}) rotate(${(t * 3) % 360}) scale(1.22) translate(${-cx},${-cy})">${bg}</g></g>`;
  s += `<g mask="url(#${id}m1)"><g transform="translate(${cx},${cy}) rotate(${(t * 6) % 360}) scale(${-mag}) translate(${-cx},${-cy})">${bg}</g></g>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${re}" fill="none" stroke="#fff4e0" stroke-width="${Math.max(1, R * .012)}" opacity=".35" filter="url(#blur2)"/><circle cx="${cx}" cy="${cy}" r="${core * 1.3}" fill="none" stroke="#fff4e0" stroke-width="${Math.max(1, core * .1)}" opacity=".9" filter="url(#blur2)"/>`;
  if (disk > 0) { const rx = core * 4.2, ry = core * 1.1; s += `<g opacity="${disk}"><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#ffb860" stroke-width="${core * 1.1}" opacity=".55" filter="url(#blur2)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#fff0c8" stroke-width="${core * .35}" stroke-dasharray="${core * .8} ${core * .5}" stroke-dashoffset="${-t * core * 6}"/>` +
    `<path d="M${cx - core * 1.5},${cy} A${core * 1.6},${core * 1.9} 0 0 1 ${cx + core * 1.5},${cy}" stroke="#ffd090" stroke-width="${core * .5}" fill="none" opacity=".7" filter="url(#blur2)"/></g>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="${core}" fill="#000"/>`;
  return s;
}
const BX = 360, BY = 760;
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
// 0: midday in a city: a black hole the size of a grape appears in the air above the street – the scene behind it bends into a ring
function sceneHook(t) {
  const ap = ease(ramp(t, WS(0, 3) - .1, WS(0, 3) + .6)), bg = cityDay(t, { id: 'h0' });
  let s = bg;
  if (ap > 0) s += lensBH(BX, BY, 120 * ap, bg, t, { id: 'L0', core: .11 });
  for (let i = 0; i < 40; i++) { const r = RS(i + 9), a = r() * 6.28, ph = pmod(t * (.5 + r()) + r(), 1), d = (1 - ph) * (140 + 260 * r()); s += `<circle cx="${(BX + Math.cos(a) * d).toFixed(1)}" cy="${(BY + Math.sin(a) * d).toFixed(1)}" r="${(1 + r() * 2).toFixed(1)}" fill="#cfc8b8" opacity="${(.7 * ap * ph).toFixed(2)}"/>`; }
  s += onWalk(200, 1088, CROWD[0], .55, 1, t, { lookUp: .6 * ap }) + onWalk(540, 1082, CROWD[1], .52, -1, t, { lookUp: .6 * ap });
  F.ov = ''; return s;
}
// 1: a balance: the grape-sized black hole on one pan, the whole Earth (3D) on the other – level
function sceneMass(t) {
  const lv = ease(ramp(t, WS(1, 4) - .3, WS(1, 7) + .3)), tilt = lerp(14, 0, lv);
  let s = space(t, '#04050c', '#0a0c1c') + `<defs>${DEFB()}</defs>`;
  const px = 360, py = 560, L = 230, a = tilt * Math.PI / 180, lx = px - Math.cos(a) * L, ly = py + Math.sin(a) * L, rx = px + Math.cos(a) * L, ry = py - Math.sin(a) * L;
  F.earth = { x: rx, y: ry + 210, r: 105, a: 1, sunI: 1.05, lights: .2, rot: 2.6, tilt: .41 }; F.light = [-200, 400]; F.moon = null; F.sun = null;
  const pan = (x, y) => `<path d="M${x},${y} L${x - 120},${y + 300} M${x},${y} L${x + 120},${y + 300}" stroke="#c8ccd0" stroke-width="3"/>`;
  let o = `<path d="M${px},${py} L${px - 70},1150 L${px + 70},1150Z" fill="#6a6e76"/><path d="M${px},${py} L${px + 70},1150 L${px + 20},1150Z" fill="#000" opacity=".25"/><rect x="${px - 150}" y="1150" width="300" height="26" rx="6" fill="#5a5e66"/><path d="M${lx},${ly} L${rx},${ry}" stroke="#d8dce0" stroke-width="12" stroke-linecap="round"/><circle cx="${px}" cy="${py}" r="16" fill="#c8a040"/>` + pan(lx, ly) + pan(rx, ry);
  const tray = (x, y) => `<path d="M${x - 140},${y + 300} Q${x},${y + 350} ${x + 140},${y + 300}" fill="#8a8e96" stroke="#c8ccd0" stroke-width="3"/>`;
  o += tray(lx, ly) + tray(rx, ry);
  o += lensBH(lx, ly + 286, 26, `<rect width="720" height="1280" fill="#0a0c1c"/>${stars(1, t)}`, t, { id: 'L1', core: .25 }) + `<path d="M${lx - 12},${ly + 330} h24" stroke="#f4c76b" stroke-width="3"/>` + lbl(lx, ly + 372, '١٫٨ سم', 1, '#f4c76b', 26) + lbl(rx, ry + 372, 'الأرض كلّها', 1, '#cfe4ff', 26);
  F.ov = o; return s;
}
// 2: one kilometre from it, gravity is 40 million times Earth's: the street, a 1-km marker, a g-meter
function sceneG(t) {
  const k = ease(ramp(t, WS(2, 9) - .3, WS(2, 11) + .4)), bg = cityDay(t, { id: 'g2' });
  let s = bg + lensBH(BX, BY, 110, bg, t, { id: 'L2', core: .12 });
  s += `<g opacity="${ramp(t, WS(2, 1), WS(2, 1) + .4)}"><path d="M${BX + 20},880 L690,880" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/><path d="M${BX + 20},868 v24 M690,868 v24" stroke="#fff" stroke-width="3"/>` + lbl(530, 864, '١ كم', 1, '#fff', 28) + `</g>`;
  s += `<g transform="translate(40,400)"><rect width="300" height="130" rx="16" fill="#0a0e1c" opacity=".85"/>` + lbl(150, 40, 'الجاذبية على بُعد ١ كم', 1, '#cfd8ff', 20) + lbl(150, 100, `${AR(Math.round(40 * k))} مليون ضعف`, 1, k > .99 ? '#ff7a5a' : '#fff', 34) + `</g>`;
  F.ov = ''; return s;
}
// 3: air, buildings and rocks pour in, heating until they glow; an accretion disk lights up
function sceneFall(t) {
  const st = S0(3) - .2, T = t - st, hot = ease(ramp(t, WS(3, 7) - .3, WS(3, 9) + .5)), bg = cityDay(t, { id: 'f3', sky: ['#4a5a7a', '#9a8a7a', '#d8b890'] });
  let s = bg + `<rect width="720" height="1280" fill="#2a1a10" opacity="${.25 * hot}"/>`;
  const r = RS(301); let deb = '';
  for (let i = 0; i < 90; i++) { const a0 = r() * 6.28, d0 = 200 + r() * 520, sp = .25 + r() * .5, ph = Math.min(1, pmod(T * sp + r(), 1.2)), d = d0 * Math.pow(1 - ph, 1.6), a = a0 + ph * 3.2, x = BX + Math.cos(a) * d, y = BY + Math.sin(a) * d * .8, sz = (4 + r() * 12) * (.3 + .7 * (1 - ph)), heat = Math.pow(ph, 2) * (.4 + .6 * hot), c = mix(['#7a6a5a', '#8a8e94', '#a86a4a', '#5a7a4a'][i % 4], heat > .6 ? '#fff4d0' : '#ff8a3a', Math.min(1, heat * 1.3));
    if (d > 14) deb += `<rect x="${(x - sz / 2).toFixed(1)}" y="${(y - sz / 3).toFixed(1)}" width="${sz.toFixed(1)}" height="${(sz * .66).toFixed(1)}" fill="${c}" transform="rotate(${(ph * 400 + i * 30) % 360},${x.toFixed(1)},${y.toFixed(1)})"/>` + (heat > .35 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(sz * 1.6).toFixed(1)}" fill="#ff9a40" opacity="${(.35 * heat).toFixed(2)}" filter="url(#blur2)"/>` : ''); }
  s += deb + `<circle cx="${BX}" cy="${BY}" r="${70 + 90 * hot}" fill="#ffb060" opacity="${.35 * hot}" filter="url(#soft)"/>` + lensBH(BX, BY, 110, bg, t, { id: 'L3', core: .12, disk: .3 + .7 * hot });
  F.ov = ''; F.flash = 0; return s;
}
// 4: light bends around it: a night city and the stars, strongly lensed into a ring, the photon ring and a thin hot disk
function sceneLens(t) {
  const bg = bareStreet(t, { id: 'n4', green: 1, sky: ['#02030a', '#0a1028', '#1a2240'], sunR: 0, glowR: 0, sunGlow: 0, lamps: 1, afterSky: stars(1, t) + milkyWay(t, { rot: -30, seed: 4 }) });
  const R = ease(ramp(t, S0(4) - .2, WS(4, 4) + .4)) * 230;
  let s = bg + `<rect width="720" height="1280" fill="#000" opacity=".3"/>` + lensBH(BX, BY, Math.max(10, R), bg, t, { id: 'L4', core: .12, mag: 2.1, disk: .6 });
  F.ov = ''; return s;
}
// 5: it sinks to the centre of the Earth and the planet collapses around it: glowing cracks, the globe shrinks and burns
function sceneCore(t) {
  const sk = ease(ramp(t, WS(5, 1) - .2, WS(5, 4) + .4)), col = ease(ramp(t, WS(5, 6) - .2, WS(5, 12) + .4));
  let s = space(t, '#03030a', '#08081a');
  const R = lerp(270, 60, Math.pow(col, 1.4));
  F.earth = { x: 360, y: 780, r: R, a: 1 - .6 * col, sunI: 1.05 * (1 - .8 * col), lights: .2, rot: 2.6, tilt: .41 }; F.light = [-200, 400]; F.moon = null; F.sun = null;
  const r = RS(51); let cr = '';
  for (let k = 0; k < 14; k++) { const a = r() * 6.28; let x = 360, y = 780, d = `M${x},${y}`; for (let q = 0; q < 8; q++) { x += Math.cos(a + (r() - .5) * .9) * R * .13; y += Math.sin(a + (r() - .5) * .9) * R * .13; if (Math.hypot(x - 360, y - 780) > R * .97) break; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } cr += `<path d="${d}" stroke="#ff7a2a" stroke-width="${3 + 3 * col}" fill="none" opacity="${(ramp(t, WS(5, 5), WS(5, 7)) * .9).toFixed(2)}" filter="url(#blur2)"/><path d="${d}" stroke="#ffe0a0" stroke-width="1.6" fill="none" opacity="${ramp(t, WS(5, 5), WS(5, 7)).toFixed(2)}"/>`; }
  F.ov = `<circle cx="360" cy="780" r="${8 + 6 * sk}" fill="#ffd8a0" opacity="${.9 * sk * (1 - col)}" filter="url(#blur2)"/>` + cr + `<circle cx="360" cy="780" r="${R * 1.05}" fill="#ff6a1a" opacity="${.55 * col}" filter="url(#soft)"/><circle cx="360" cy="780" r="${R * .9}" fill="#ffb060" opacity="${.5 * col}"/>` + lbl(360, 1180, 'الثقب يغوص نحو المركز', sk * (1 - col), '#ffd8a0', 26);
  return s;
}
// 6: the surprise: the Sun becomes a black hole of the same mass – and Earth keeps orbiting exactly as before
function sceneSun(t) {
  const st = S0(6) - .2, sw = ease(ramp(t, WS(6, 6) - .3, WS(6, 9) + .4)), ok = ramp(t, WS(6, 10) - .2, WS(6, 10) + .4);
  let s = space(t, '#02030a', '#06081a');
  const ang = -.6 + (t - st) * .32, ex = 360 + Math.cos(ang) * 280, ey = 760 + Math.sin(ang) * 170;
  F.sun = { x: 360, y: 760, r: 90, a: 1 - sw, hue: 0 }; F.earth = { x: ex, y: ey, r: 26, a: 1, sunI: 1 - .85 * sw, lights: .4 + .5 * sw, rot: 2 + t * .2, tilt: .41 }; F.light = [360, 760]; F.moon = null;
  let o = `<ellipse cx="360" cy="760" rx="280" ry="170" fill="none" stroke="#9ab0d8" stroke-width="2" stroke-dasharray="8 8" opacity=".7"/>`;
  if (sw > 0) o += `<g opacity="${sw}">` + lensBH(360, 760, 90, `<rect width="720" height="1280" fill="#04050f"/>${stars(1, t)}${milkyWay(t, { rot: -18, seed: 6 })}`, t, { id: 'L6', core: .3, mag: 1.6 }) + `</g>`;
  o += lbl(360, 1010, 'المدار لا يتغيّر', ok, '#9af09a', 30);
  F.ov = o; return s;
}
// 7: that black hole would be only ~6 km across – drawn over a city map; then Earth freezing in the dark
function sceneSize(t) {
  const fr = ease(ramp(t, WS(7, 5) - .3, WS(7, 7) + .5));
  let s = `<defs>${DEFB()}</defs><rect width="720" height="1280" fill="#2a2e2a"/>`;
  const r = RS(77); let city = '';
  for (let by = 280; by < 1290; by += 70) for (let bx = -20; bx < 740; bx += 86) { const rw = (Math.floor(by / 70) % 4 === 0) ? 12 : 6, cw = (Math.floor(bx / 86) % 3 === 0) ? 12 : 6;
    for (let q = 0; q < 4; q++) { const x = bx + cw / 2 + (q % 2) * 38 + r() * 3, y = by + rw / 2 + Math.floor(q / 2) * 30 + r() * 3, w = 30 + r() * 8, h = 22 + r() * 6; if (r() < .1) { city += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#3a5a2a"/>` + Array.from({ length: 4 }, () => `<circle cx="${x + r() * w}" cy="${y + r() * h}" r="${3 + r() * 3}" fill="#2a4a1e"/>`).join(''); continue; }
      city += `<rect x="${x + 3}" y="${y + 4}" width="${w}" height="${h}" fill="#000" opacity=".35"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${mix(['#8a8478', '#a89c88', '#b8b4ac', '#7a6a5a', '#c8c0b0'][Math.floor(r() * 5)], '#ffffff', r() * .15)}"/><rect x="${x + 2}" y="${y + 2}" width="${w * .4}" height="${h * .4}" fill="#fff" opacity="${(.08 + r() * .1).toFixed(2)}"/>`; } }
  s += `<rect y="270" width="720" height="1020" fill="#4a4a48"/>` + city + `<path d="M-20,640 Q200,720 360,650 T740,710" stroke="#2e4a64" stroke-width="40" fill="none"/><path d="M-20,640 Q200,720 360,650 T740,710" stroke="#5a7a9a" stroke-width="2" fill="none" opacity=".7"/><path d="M220,690 L240,630 M500,680 L520,640" stroke="#c8c0b0" stroke-width="6"/><rect y="270" width="720" height="1020" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<circle cx="360" cy="760" r="180" fill="#000"/><circle cx="360" cy="760" r="186" fill="none" stroke="#fff0d0" stroke-width="4" opacity=".7" filter="url(#blur2)"/><path d="M180,960 h360" stroke="#fff" stroke-width="3"/><path d="M180,948 v24 M540,948 v24" stroke="#fff" stroke-width="3"/>` + lbl(360, 1004, '٦ كم', 1, '#fff', 32);
  if (fr > 0) { s += `<rect width="720" height="1280" fill="#03050c" opacity="${fr}"/>`; F.earth = { x: 360, y: 780, r: 260, a: fr, sunI: .22, lights: 0, rot: 2.2, tilt: .41 }; F.light = [-200, 400]; F.ov = lbl(360, 1120, 'بلا ضوء ولا دفء', fr, '#cfe4ff', 28); }
  else { F.earth = null; F.ov = ''; }
  F.sun = null; F.moon = null; return s;
}
// 8: the nearest known black hole, Gaia BH1, ~1,560 light-years away – far across our part of the galaxy
function sceneNear(t) {
  const k = ramp(t, WS(8, 4) - .2, WS(8, 9) + .3);
  let s = `<defs>${DEFB()}</defs><rect width="720" height="1280" fill="#020208"/>` + milkyWay(t, { rot: -24, seed: 12 });
  const sx = 200, sy = 980, bx = 560, by = 560, ex = lerp(sx, bx, k), ey = lerp(sy, by, k);
  s += `<circle cx="${sx}" cy="${sy}" r="9" fill="#ffe8a0"/><circle cx="${sx}" cy="${sy}" r="24" fill="#ffe8a0" opacity=".3" filter="url(#blur2)"/>` + lbl(sx, sy + 46, 'الشمس', 1, '#ffe8a0', 26);
  s += `<path d="M${sx},${sy} L${ex},${ey}" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" opacity=".8"/>`;
  s += `<g opacity="${k}"><circle cx="${bx}" cy="${by}" r="14" fill="#000" stroke="#ffd8a0" stroke-width="3"/><circle cx="${bx}" cy="${by}" r="30" fill="none" stroke="#ffd8a0" stroke-width="2" opacity=".5"/>` + lbl(bx, by - 46, 'Gaia BH1', 1, '#fff', 26) + lbl((sx + bx) / 2 + 40, (sy + by) / 2 + 10, '≈ ١٥٦٠ سنة ضوئية', 1, '#f4c76b', 28) + `</g>`;
  F.ov = ''; return s;
}
// 9: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 4), WS(9, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMass }, { s: S0(2) - .2, f: sceneG }, { s: S0(3) - .2, f: sceneFall }, { s: S0(4) - .2, f: sceneLens },
  { s: S0(5) - .2, f: sceneCore }, { s: S0(6) - .2, f: sceneSun }, { s: S0(7) - .2, f: sceneSize }, { s: S0(8) - .2, f: sceneNear }, { s: S0(9) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneMass, sceneCore, sceneSun, sceneSize]);
const XF = .5;
const TLI = [['يظهر', 0], ['يبتلع ما حوله', S0(3)], ['يحني الضوء', S0(4)], ['يغوص للمركز', S0(5)]];
const LIST_ON = new Set([sceneG, sceneFall, sceneLens, sceneCore]);
const CHIPS = [
  ['c1', 'كتلة الأرض في ١٫٨ سم', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', '×٤٠ مليون', 360, 330, 'red', WS(2, 10), S0(3) - .3],
  ['c3', 'عدسة الجاذبية', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c4', 'شمس بكتلتها نفسها', 360, 330, 'big', WS(6, 6), WS(6, 10)],
  ['c5', 'لا داعي للقلق', 360, 1200, 'big', WS(8, 10), S0(9) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ثقب بكتلة الأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
