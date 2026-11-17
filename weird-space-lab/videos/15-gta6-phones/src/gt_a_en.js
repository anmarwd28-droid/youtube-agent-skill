// ===================== "what if GTA 6 ran on every phone?" (Short #49) =====================
// The game on the screens is a generic drawn open-world city drive (no logos, no characters, no copied art).
const GDEF = `<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a6a"/><stop offset=".45" stop-color="#e86a7a"/><stop offset=".8" stop-color="#ffb070"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient>` +
  `<linearGradient id="gRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a52"/><stop offset="1" stop-color="#1e1a24"/></linearGradient>` +
  `<linearGradient id="carR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a6a"/><stop offset=".55" stop-color="#c81e3a"/><stop offset="1" stop-color="#5a0a1a"/></linearGradient>` +
  `<radialGradient id="scrGlow"><stop offset="0" stop-color="#ffb08a" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a6a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="phB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3e46"/><stop offset=".5" stop-color="#14161a"/><stop offset="1" stop-color="#2a2e34"/></linearGradient>` +
  `<linearGradient id="techBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1430"/><stop offset="1" stop-color="#1a1036"/></linearGradient>` +
  `<radialGradient id="hotG"><stop offset="0" stop-color="#ff5a2a" stop-opacity=".75"/><stop offset=".5" stop-color="#ff7a3a" stop-opacity=".3"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="wallR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b8a4"/><stop offset="1" stop-color="#a89880"/></linearGradient>`;
const GDEFS = () => `${TDEFS()}${GDEF}`;

// ---------- the game seen on a screen: a sports car speeding down a sunset avenue ----------
function gameView(x, y, w, h, t, id, o = {}) {
  const sp = o.sp ?? 1, ph = t * 2.2 * sp, hz = h * .46, vx = w * .5;
  let s = `<defs><clipPath id="gv${id}"><rect x="0" y="0" width="${w}" height="${h}" rx="${o.rx ?? 6}"/></clipPath></defs><g transform="translate(${x.toFixed(1)},${y.toFixed(1)})" clip-path="url(#gv${id})">`;
  s += `<rect width="${w}" height="${h}" fill="url(#gSky)"/><circle cx="${w * .72}" cy="${hz - h * .08}" r="${h * .1}" fill="#ffe2a8" opacity=".9"/>`;
  // skyline, sliding slowly
  const r = RS(91); let sk = ''; for (let i = 0; i < 18; i++) { const bw = w * (.05 + r() * .06), bh = h * (.1 + r() * .32), bx = pmod(i * w * .085 - t * 6 * sp, w * 1.5) - w * .2; sk += `<rect x="${bx.toFixed(1)}" y="${(hz - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${['#3a2a52', '#4a3462', '#2e2446'][i % 3]}"/>` + (r() > .4 ? `<rect x="${(bx + bw * .2).toFixed(1)}" y="${(hz - bh * .8).toFixed(1)}" width="${(bw * .6).toFixed(1)}" height="${(bh * .08).toFixed(1)}" fill="${['#ff4ab0', '#3ae8e0', '#ffd84a'][i % 3]}" opacity=".8"/>` : ''); }
  s += sk;
  // the road in perspective with moving dashes and side lights
  s += `<path d="M${vx - w * .02},${hz} L${vx + w * .02},${hz} L${w * 1.1},${h} L${-w * .1},${h}Z" fill="url(#gRoad)"/>`;
  for (let i = 0; i < 7; i++) { const z = pmod(i / 7 + ph * .25, 1), y0 = hz + (h - hz) * z * z, y1 = hz + (h - hz) * Math.min(1, (z + .06) * (z + .06)), ww = .006 * w + .02 * w * z; s += `<path d="M${(vx - ww / 2).toFixed(1)},${y0.toFixed(1)} L${(vx + ww / 2).toFixed(1)},${y0.toFixed(1)} L${(vx + ww).toFixed(1)},${y1.toFixed(1)} L${(vx - ww).toFixed(1)},${y1.toFixed(1)}Z" fill="#ffe8a0" opacity=".85"/>`;
    [-1, 1].forEach(sd => { const lx = vx + sd * (w * .03 + w * .6 * z), ly = hz + (h - hz) * z * z - h * .3 * z; s += `<path d="M${lx.toFixed(1)},${(hz + (h - hz) * z * z).toFixed(1)} V${ly.toFixed(1)}" stroke="#2a2232" stroke-width="${(1 + 3 * z).toFixed(1)}"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${(1 + 4 * z).toFixed(1)}" fill="#ffe2b0"/>`; }); }
  // an oncoming car far ahead and our car from behind, swaying in the lane
  const fz = pmod(ph * .18, 1), fy = hz + (h - hz) * fz * fz * .5, fsc = .2 + .5 * fz;
  s += `<rect x="${(vx + w * .06 * fz - w * .04 * fsc).toFixed(1)}" y="${(fy - h * .05 * fsc).toFixed(1)}" width="${(w * .08 * fsc).toFixed(1)}" height="${(h * .05 * fsc).toFixed(1)}" rx="2" fill="#3a6ab0"/><circle cx="${(vx + w * .06 * fz - w * .025 * fsc).toFixed(1)}" cy="${(fy - h * .02 * fsc).toFixed(1)}" r="${(1.5 + 3 * fsc).toFixed(1)}" fill="#fff8d8"/>`;
  const cx = vx + Math.sin(t * 1.3 * sp) * w * .06, cy = h * .82, cw = w * .26, chh = h * .2, tilt = Math.cos(t * 1.3 * sp) * 3;
  s += `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${tilt.toFixed(1)})"><ellipse cx="0" cy="${chh * .55}" rx="${cw * .6}" ry="${chh * .12}" fill="#000" opacity=".45"/>` +
    `<path d="M${-cw * .5},${chh * .45} L${-cw * .46},${-chh * .05} L${-cw * .3},${-chh * .45} L${cw * .3},${-chh * .45} L${cw * .46},${-chh * .05} L${cw * .5},${chh * .45}Z" fill="url(#carR)"/>` +
    `<path d="M${-cw * .26},${-chh * .4} L${cw * .26},${-chh * .4} L${cw * .34},${-chh * .08} L${-cw * .34},${-chh * .08}Z" fill="#1a2030" opacity=".9"/><path d="M${-cw * .2},${-chh * .38} L${-cw * .05},${-chh * .38} L${-cw * .2},${-chh * .12}Z" fill="#fff" opacity=".25"/>` +
    `<rect x="${-cw * .46}" y="${chh * .02}" width="${cw * .22}" height="${chh * .1}" rx="2" fill="#ff2a3a"/><rect x="${cw * .24}" y="${chh * .02}" width="${cw * .22}" height="${chh * .1}" rx="2" fill="#ff2a3a"/><rect x="${-cw * .5}" y="${chh * .32}" width="${cw}" height="${chh * .13}" fill="#1a1a1e"/>` +
    `<rect x="${-cw * .5}" y="${chh * .35}" width="${cw * .14}" height="${chh * .22}" rx="3" fill="#0e0e10"/><rect x="${cw * .36}" y="${chh * .35}" width="${cw * .14}" height="${chh * .22}" rx="3" fill="#0e0e10"/>` +
    `<circle cx="${-cw * .35}" cy="${chh * .07}" r="${chh * .18}" fill="#ff3a3a" opacity=".25" filter="url(#blur2)"/><circle cx="${cw * .35}" cy="${chh * .07}" r="${chh * .18}" fill="#ff3a3a" opacity=".25" filter="url(#blur2)"/></g>`;
  // speed lines and a simple HUD: minimap, speed
  for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + 1, k = pmod(ph * .7 + i * .37, 1); s += `<path d="M${(vx + Math.cos(a) * w * (.2 + .3 * k)).toFixed(1)},${(hz + Math.sin(a) * h * (.2 + .3 * k)).toFixed(1)} l${(Math.cos(a) * w * .06).toFixed(1)},${(Math.sin(a) * h * .06).toFixed(1)}" stroke="#fff" stroke-width="1.5" opacity="${(.35 * k).toFixed(2)}"/>`; }
  s += `<circle cx="${h * .17}" cy="${h * .8}" r="${h * .13}" fill="#1a2a3a" opacity=".8" stroke="#fff" stroke-width="1.5"/><path d="M${h * .1},${h * .86} l${h * .06},${-h * .1} l${h * .05},${h * .06}" stroke="#ffd84a" stroke-width="2" fill="none"/><circle cx="${h * .17}" cy="${h * .8}" r="2.5" fill="#fff"/>` +
    `<text x="${w - h * .1}" y="${h * .9}" text-anchor="end" font-family="Inter" font-weight="800" font-size="${(h * .11).toFixed(1)}" fill="#fff" opacity=".9">${Math.round(160 + 20 * Math.sin(t * .9))}</text>`;
  return s + `</g>`;
}
// a phone in landscape with the game on it
function phoneL(x, y, w, h, t, id, o = {}) {
  const b = Math.max(4, h * .07);
  return `<g transform="rotate(${(o.rot || 0).toFixed(1)},${x + w / 2},${y + h / 2})">` + (o.glow === 0 ? '' : `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w * .8}" ry="${h * .9}" fill="url(#scrGlow)" opacity="${(o.glow ?? .7).toFixed(2)}"/>`) +
    `<rect x="${x - b}" y="${y - b}" width="${w + 2 * b}" height="${h + 2 * b}" rx="${b * 2.4}" fill="url(#phB)"/>` + (o.off ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${b}" fill="#0c0e12"/>` : gameView(x, y, w, h, t, id, { rx: b })) +
    `<path d="M${x},${y + h} L${x + w * .45},${y} L${x + w * .6},${y} L${x + w * .15},${y + h}Z" fill="#fff" opacity=".06"/></g>`;
}
// a person playing with the phone held sideways in both hands; returns svg (sets HP)
function player(x, y, s, f, pi, t, o = {}) {
  const px = x + f * s * 46, py = y - s * (o.sit ? 150 : 214), bob = Math.sin(t * 2.3 + x) * 1.5;
  const base = o.sit ? { lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1 } : {};
  let g = hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: -.32, hF: [px + f * s * 16, py + bob], hB: [px - f * s * 14, py + 2 + bob] }, base, palS(pi), o.h || {}));
  const w = 44 * s, h = 22 * s;
  g += `<g transform="translate(${px.toFixed(1)},${(py + bob - 4 * s).toFixed(1)}) rotate(${(f * -12).toFixed(1)})"><rect x="${-w / 2 - 2}" y="${-h / 2 - 2}" width="${w + 4}" height="${h + 4}" rx="4" fill="#15171c"/>` + (o.off ? '' : gameView(-w / 2, -h / 2, w, h, t, 'p' + pi + Math.round(x), { rx: 2 })) + `</g>` +
    (o.off ? '' : `<ellipse cx="${(HP.head[0] + f * 8).toFixed(1)}" cy="${(HP.head[1] + 6).toFixed(1)}" rx="${(24 * s).toFixed(1)}" ry="${(28 * s).toFixed(1)}" fill="#ff9a7a" opacity=".14" filter="url(#blur5)"/>`);
  return g;
}

// ---------- 0a: everyone plays it, everywhere: the street ----------
function sceneHook(t) {
  const y0 = PV + 78;
  const top = player(96, y0 + 4, .78, 1, 3, t) + player(300, y0 - 4, .74, -1, 6, t) + player(470, y0 + 10, .8, 1, 1, t) + player(640, y0, .76, -1, 8, t);
  let s = `<defs>${GDEFS()}</defs>` + street10(t, { N: 0, id: 'hk', cars: 0, overcast: 1, back: sun3(600, 470), top, ground: car(400, 1250, .9, '#2a5a8a', 1, 0) });
  // the big screen: what they are all playing
  const k = ease(ramp(t, .1, .6));
  s += `<g opacity="${k.toFixed(2)}" transform="translate(360,560) scale(${(.9 + .1 * k).toFixed(3)}) translate(-360,-560)">${phoneL(110, 450, 500, 236, t, 'big', { glow: .5 })}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 0b: on the bus ----------
function sceneBus(t) {
  const t0 = WS(0, 16) - .2, T = t - t0;
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#d8d2c4"/>`;
  // windows with the city sliding past
  s += `<rect x="-20" y="420" width="760" height="300" fill="#8ab4d8"/>` + `<g transform="translate(${(-pmod(T * 260, 400)).toFixed(1)},0)">${farCity(41, 720, '#6a7a8a', { hk: 1.2 })}<g transform="translate(400,0)">${farCity(41, 720, '#6a7a8a', { hk: 1.2 })}</g></g>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${-20 + i * 190}" y="410" width="22" height="320" fill="#b8b2a4"/>`;
  s += `<rect x="-20" y="400" width="760" height="20" fill="#a8a294"/><rect x="-20" y="720" width="760" height="40" fill="#a8a294"/><path d="M-20,360 H740" stroke="#c8ccd2" stroke-width="10"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${30 + i * 130},360 v40" stroke="#c8ccd2" stroke-width="3"/><ellipse cx="${30 + i * 130}" cy="408" rx="10" ry="12" fill="none" stroke="#e8e4dc" stroke-width="4"/>`).join('');
  // seats and seated players
  s += `<rect x="-20" y="1180" width="760" height="140" fill="#5a5e66"/>`;
  [[110, 3], [340, 7], [570, 2]].forEach(([x, pi], i) => { s += `<rect x="${x - 64}" y="900" width="28" height="220" rx="10" fill="#2a5a8a"/><rect x="${x - 64}" y="1104" width="130" height="30" rx="10" fill="#2a5a8a"/><rect x="${x - 64}" y="1104" width="130" height="8" rx="4" fill="#fff" opacity=".15"/><path d="M${x - 50},1134 V1180 M${x + 50},1134 V1180" stroke="#3a3e46" stroke-width="6"/>` + player(x, 1170, .82, 1, pi, t, { sit: 1 }); });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity=".08"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 0c: in the café ----------
function sceneCafe(t) {
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#wallR)"/><rect x="-20" y="-20" width="760" height="1320" fill="#fff" filter="url(#wallI)" opacity=".2"/>`;
  s += `<rect x="60" y="420" width="600" height="280" fill="#3a2a22"/><rect x="72" y="432" width="576" height="256" fill="#8ab4d8"/><g transform="translate(72,432) scale(.8)">${farCity(53, 320, '#6a7a8a', { hk: 1 })}</g><rect x="72" y="640" width="576" height="48" fill="#9aa49a"/><path d="M360,432 V688" stroke="#3a2a22" stroke-width="10"/>` + [0, 1, 2].map(i => `<circle cx="${180 + i * 180}" cy="380" r="18" fill="#ffe0a0" opacity=".9"/><path d="M${180 + i * 180},300 V362" stroke="#2a2a2a" stroke-width="2"/>`).join('');
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#8a6a4a"/>`;
  [[200, 4], [520, 9]].forEach(([x, pi], i) => { s += chair(x, 1180, .9, i ? -1 : 1) + player(x, 1180, .9, i ? -1 : 1, pi, t, { sit: 1 }); });
  s += `<rect x="250" y="1010" width="220" height="16" rx="4" fill="#5a3a24"/><path d="M360,1026 V1180" stroke="#3a2a1a" stroke-width="10"/><path d="M300,1010 h22 v-20 h-22Z M400,1010 h22 v-20 h-22Z" fill="#f2efe8"/><path d="M308,980 q4,-10 0,-18 M410,980 q4,-10 0,-18" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 1: it comes out on 19 November, on PlayStation and Xbox only ----------
function consoleBox(x, y, s, kind) {   // generic consoles: a tall white tower, a black box (no logos)
  if (kind === 0) return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="40" ry="6" fill="#000" opacity=".3" filter="url(#blur2)"/><path d="M-30,0 C-36,-120 -30,-230 -16,-260 L16,-260 C30,-230 36,-120 30,0Z" fill="#f2f2f0"/><rect x="-10" y="-262" width="20" height="262" fill="#14161a"/><path d="M-30,0 C-36,-120 -30,-230 -16,-260 L-10,-260 L-10,0Z" fill="#000" opacity=".08"/><circle cx="0" cy="-120" r="2.5" fill="#6ab0ff"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="46" ry="6" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-38" y="-200" width="76" height="200" rx="6" fill="#1a1c20"/><rect x="-38" y="-200" width="76" height="16" fill="#2a2e34"/><circle cx="0" cy="-192" r="22" fill="#14161a"/><circle cx="0" cy="-192" r="18" fill="#2a8a4a" opacity=".5"/><rect x="-38" y="-200" width="20" height="200" fill="#fff" opacity=".05"/></g>`;
}
function sceneConsole(t) {
  const t0 = S0(1) - .2, T = t - t0, FL = 1000, ca = ease(ramp(t, WS(1, 3) - .2, WS(1, 3) + .3)), oa = ease(ramp(t, WS(1, 8) - .2, WS(1, 8) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#3a3a52"/><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#fff" filter="url(#wallI)" opacity=".12"/>`;
  // the TV with the game
  s += `<rect x="120" y="500" width="480" height="285" rx="10" fill="#0e0f12"/>` + gameView(132, 512, 456, 261, t, 'tv', { rx: 4 }) + `<rect x="330" y="785" width="60" height="30" fill="#1a1c20"/><ellipse cx="360" cy="460" rx="420" ry="200" fill="url(#scrGlow)" opacity=".25"/>`;
  s += `<rect x="40" y="815" width="640" height="70" rx="6" fill="#5a3a2a"/><rect x="40" y="815" width="640" height="10" fill="#fff" opacity=".12"/>`;
  s += consoleBox(78, 815, .5, 0) + consoleBox(648, 815, .48, 1);
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#6a5a4a"/><rect x="-20" y="${FL}" width="760" height="40" fill="url(#aoDn)" opacity=".6"/>`;
  // a player on the sofa with a controller
  s += `<rect x="120" y="1040" width="480" height="160" rx="30" fill="#7a3a3a"/><rect x="100" y="980" width="520" height="90" rx="30" fill="#8a4444"/>`;
  s += hero(360, 1210, Object.assign({ s: .95, face: -1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1, lookUp: .05, hF: [300, 1080], hB: [316, 1086] }, palS(5))) + `<path d="M276,1072 q20,-12 44,0 q8,14 -4,20 h-36 q-12,-6 -4,-20Z" fill="#1a1c20"/>`;
  // the date and "only on"
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}" transform="translate(560,600) rotate(4)"><rect x="-70" y="-90" width="140" height="160" rx="10" fill="#f6f2e6"/><rect x="-70" y="-90" width="140" height="44" rx="10" fill="#c8382e"/>${lbl(0, -58, 'NOV', 1, '#fff', 26)}<text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="74" fill="#2a2e34">${AR(19)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
