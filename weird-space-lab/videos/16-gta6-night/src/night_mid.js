// ===================== Weird Space Lab: the night GTA 6 comes out =====================
// our own people and rooms; no game footage, art, logos or characters (screens are seen from the side or show our own UI)
const D2R = Math.PI / 180;
const rotFor = (lon, t) => -(lon + 90) * D2R - t * .03;
function proj(lat, lon, e, t) {
  const u = (lon + 180) / 360, la = lat * D2R;
  let x = -Math.cos(2 * Math.PI * u) * Math.cos(la), y = Math.sin(la), z = Math.sin(2 * Math.PI * u) * Math.cos(la);
  const ry = (e.rot ?? .6) + t * .03, rx = e.tx ?? 0, rz = e.tilt ?? .41;
  [x, z] = [x * Math.cos(ry) + z * Math.sin(ry), -x * Math.sin(ry) + z * Math.cos(ry)];
  [y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
  [x, y] = [x * Math.cos(rz) - y * Math.sin(rz), x * Math.sin(rz) + y * Math.cos(rz)];
  return { x: e.x + e.r * x, y: e.y - e.r * y, vis: z > .05 };
}
// the flickering colour of a game screen
const tvCol = t => ['#4fa8ff', '#ff5aa8', '#ffb347', '#7affc8', '#9a7aff'][Math.floor(t * 2.2 + Math.sin(t * 5)) % 5 + (Math.floor(t * 2.2) < 0 ? 5 : 0)];
const tvI = t => .75 + .25 * Math.sin(t * 13) * Math.sin(t * 4.7);
// a game controller (generic)
const pad = (x, y, s = 1, t = 0) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,-8 Q-34,-16 -22,-16 L22,-16 Q34,-16 30,-8 L36,12 Q38,22 28,20 L16,8 L-16,8 L-28,20 Q-38,22 -36,12Z" fill="#1c1d22"/>` +
  `<path d="M-30,-8 Q-34,-16 -22,-16 L22,-16 Q34,-16 30,-8" stroke="#55565e" stroke-width="2" fill="none"/><circle cx="-14" cy="-4" r="5" fill="#33343a"/><circle cx="14" cy="-4" r="5" fill="#33343a"/><circle cx="${-14 + Math.sin(t * 9) * 1.5}" cy="-4" r="3" fill="#55565e"/></g>`;
// a person sitting on a sofa holding a controller, facing right (towards the TV). y = seat height
function gamer(x, y, s, c, t, o = {}) {
  const lift = o.lift ?? 1, tired = o.tired || 0, col = o.glow || tvCol(t), gI = (o.gi ?? 1) * tvI(t);
  const legs = limb(0, 0, 1.5, .12, 76, 74, 19, c.pants), leg2 = limb(-6, 0, 1.45, .05, 76, 74, 19, '#1d2028');
  const shoe = l => `<ellipse cx="${l.x2 + 9}" cy="${l.y2 + 1}" rx="17" ry="7" fill="#3a3530"/>`;
  const lean = -6 - tired * 10, bob = Math.sin(t * 2.4) * 1.5;
  const torso = `<path d="M-24,6 C-30,-40 -34,-90 -26,-112 Q-4,-124 22,-112 C30,-80 28,-40 24,6Z" fill="${c.top}"/><path d="M-24,6 C-30,-40 -34,-90 -26,-112 L-8,-118 L-8,6Z" fill="#000" opacity=".25"/>`;
  const ua = lerp(.15, .55, lift), fa = lerp(.35, 1.95, lift);
  const armB = limb(-6, -100, ua - .1, fa - .05, 52, 46, 14, mix(c.top, '#000000', .2)), armF = limb(2, -100, ua, fa, 52, 46, 15, c.top);
  const hx = 6, hy = -150 + bob, eye = tired ? `<path d="M${hx + 8},${hy - 2} q4,2 7,0" stroke="#1a120d" stroke-width="2.5" fill="none"/>` : `<ellipse cx="${hx + 11}" cy="${hy - 2}" rx="2.4" ry="3" fill="#1a120d"/>`;
  const head = `<rect x="${hx - 7}" y="${-132}" width="14" height="20" rx="5" fill="${c.skin}"/><ellipse cx="${hx}" cy="${hy}" rx="20" ry="24" fill="${c.skin}"/><ellipse cx="${hx - 6}" cy="${hy + 2}" rx="13" ry="20" fill="#000" opacity=".15"/>` +
    `<path d="M${hx - 21},${hy - 2} C${hx - 24},${hy - 30} ${hx + 6},${hy - 36} ${hx + 21},${hy - 14} C${hx + 14},${hy - 20} ${hx - 2},${hy - 18} ${hx - 8},${hy - 12} C${hx - 12},${hy - 4} ${hx - 14},${hy + 6} ${hx - 21},${hy - 2}Z" fill="${c.hair}"/>` + eye +
    `<ellipse cx="${hx - 14}" cy="${hy + 1}" rx="4" ry="6.5" fill="${c.skin}"/>`;
  // screen light on the front of the face and body
  const glow = `<g style="mix-blend-mode:screen" opacity="${.55 * gI}"><ellipse cx="${hx + 12}" cy="${hy}" rx="12" ry="22" fill="${col}" filter="url(#blur2)"/><path d="M8,-112 Q22,-112 24,-80 L24,6 L10,6Z" fill="${col}" opacity=".6" filter="url(#blur2)"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">` + leg2.svg + shoe(leg2) + legs.svg + shoe(legs) + `<g transform="rotate(${lean},0,0)">` + armB.svg + torso + head + glow + armF.svg +
    `<circle cx="${armF.x2}" cy="${armF.y2}" r="7.5" fill="${c.skin}"/>` + pad(armF.x2 + 4, armF.y2 - 2, .8, t) + `</g></g>`;
}
// a living room at night, real scale: 240 px per metre (wall 2.7 m), floor at y=1180
function room(t, o = {}) {
  const FL = 1180, dawn = o.dawn || 0;
  let s = `<rect width="720" height="1280" fill="${mix('#141828', '#3a3a52', dawn)}"/><rect x="0" y="${FL - 648}" width="720" height="648" fill="${mix('#1c2134', '#4a4a62', dawn)}"/>`;
  // window with the city at night (or dawn)
  s += `<rect x="70" y="600" width="250" height="300" fill="${mix('#0a1030', '#e8a070', dawn)}"/>` + Array.from({ length: 8 }, (_, i) => { const r = RS(i + 50), h = 80 + r() * 160, w = 24 + r() * 20, x = 70 + i * 32; return `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${mix('#141a30', '#6a5a6a', dawn)}"/>` + Array.from({ length: 6 }, (_, k) => `<rect x="${x + 5 + (k % 2) * 10}" y="${900 - h + 10 + Math.floor(k / 2) * 22}" width="6" height="8" fill="${r() < .6 ? tvCol(t + i + k) : '#ffd27a'}" opacity="${.5 + .3 * Math.sin(t * 7 + i * 3 + k)}"/>`).join(''); }).join('') +
    `<rect x="62" y="592" width="266" height="316" fill="none" stroke="#2a2a34" stroke-width="16"/><path d="M195,600 V900 M70,750 H320" stroke="#2a2a34" stroke-width="8"/>`;
  // wooden floor with a real wood texture
  s += `<defs>${photoPat('wood', 'wood_floor_deck', 300)}</defs><rect y="${FL}" width="720" height="${1280 - FL}" fill="#5a3e2a"/>` + photoFill(`M0,${FL} H720 V1280 H0Z`, 'wood', .7, 'multiply');
  // wall clock (digital)
  s += `<rect x="400" y="600" width="170" height="70" rx="10" fill="#0a0a0c"/>` + EN(o.clock || '23:59', 485, 650, 44, o.clockCol || '#ff5a4a', 'middle', 800);
  // the TV on a low cabinet, seen from the side, lighting the room
  const col = tvCol(t), I = tvI(t) * (o.tv ?? 1);
  s += `<rect x="560" y="1060" width="160" height="120" fill="#2a2420"/><rect x="560" y="1060" width="160" height="8" fill="#3a322c"/>` +
    `<polygon points="640,880 140,760 140,1180 640,1040" fill="${col}" opacity="${.13 * I}" filter="url(#soft)"/><rect x="636" y="880" width="12" height="160" rx="3" fill="#0a0a0c"/><rect x="630" y="880" width="6" height="160" fill="${col}" opacity="${.9 * I}"/><rect x="640" y="1040" width="6" height="22" fill="#111"/>`;
  // the sofa
  s += `<rect x="40" y="980" width="290" height="70" rx="20" fill="#3a4a6a"/><rect x="20" y="900" width="60" height="200" rx="22" fill="#33425e"/><rect x="40" y="1040" width="300" height="80" rx="14" fill="#2e3c58"/><rect x="60" y="1120" width="16" height="60" fill="#1a1a1a"/><rect x="300" y="1120" width="16" height="60" fill="#1a1a1a"/>`;
  return s;
}
const P1 = { top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d' };
// 0: an apartment block at night – window after window lights up with a game screen
function sceneHook(t) {
  let s = `<rect width="720" height="1280" fill="#060818"/>` + stars(t, .6);
  s += `<rect x="60" y="420" width="600" height="900" fill="#1a1c28"/><rect x="60" y="420" width="600" height="14" fill="#2a2c38"/>`;
  const r = RS(77); for (let row = 0; row < 9; row++) for (let col = 0; col < 6; col++) {
    const x = 90 + col * 95, y = 460 + row * 95, on = r() < Math.min(.95, .25 + t * .3), c = tvCol(t + row * 1.7 + col);
    s += `<rect x="${x}" y="${y}" width="60" height="60" fill="${on ? c : '#0c0e18'}" opacity="${on ? .55 + .3 * tvI(t + row + col) : 1}"/><path d="M${x + 30},${y} V${y + 60}" stroke="#1a1c28" stroke-width="4"/>`;
    if (on && (row + col) % 3 === 0) s += `<circle cx="${x + 15}" cy="${y + 34}" r="8" fill="#05060a"/><path d="M${x + 1},${y + 60} Q${x + 3},${y + 44} ${x + 15},${y + 44} Q${x + 27},${y + 44} ${x + 29},${y + 60}Z" fill="#05060a"/>`;
  }
  F.ov = ''; F.flash = 0; return s;
}
// 1: one living room – 23:59, then midnight, the controller comes up
function sceneRoom(t) {
  const mid = WS(1, 1), on = t >= mid, lift = ease(ramp(t, WS(1, 4), WS(1, 7)));
  let s = room(t, { clock: on ? '00:00' : '23:59', clockCol: on ? '#f4c76b' : '#ff5a4a', tv: on ? 1 : .25 });
  s += gamer(200, 1040, 1.25, P1, t, { lift, gi: on ? 1 : .3 });
  F.flash = on && t < mid + .25 ? .25 * (1 - (t - mid) / .25) : 0; F.ov = ''; return s;
}
// 1b: midnight sweeping west across the real Earth at night – the players light up as it passes
const CITIES = [[-36.8, 174.8], [-33.9, 151.2], [35.7, 139.7], [37.6, 127], [31.2, 121.5], [1.35, 103.8], [19.1, 72.9], [25.2, 55.3], [33.3, 44.4], [24.7, 46.7], [41, 29], [55.8, 37.6], [52.5, 13.4], [48.9, 2.3], [51.5, -.1], [40.4, -3.7], [-23.5, -46.6], [40.7, -74], [19.4, -99.1], [34, -118.2]];
function sceneGlobe(t) {
  const st = WS(1, 8) - .4, q = ramp(t, st, L(1).end + .4), lon = lerp(190, 20, q);
  const e = { x: 360, y: 820, r: 330, a: 1, sunI: .1, lights: 1, rot: rotFor(lon - 25, t), tx: .1, tilt: 0 };
  F.earth = e; F.light = [360, -3000]; F.moon = null;
  let dots = ''; CITIES.forEach(([la, lo]) => { const passed = ((lon - lo + 720) % 360) < 180 && lo > lon - 1 || lo >= lon; const p = proj(la, lo, e, t);
    if (p.vis && lo >= lon) dots += `<circle cx="${p.x}" cy="${p.y}" r="16" fill="${tvCol(t + lo)}" opacity=".35" filter="url(#soft)"/><circle cx="${p.x}" cy="${p.y}" r="5" fill="#fff"/>`; });
  F.ov = dots; F.flash = 0; return space(t, '#010208', '#03050f');
}
// 2: the download – 212 GB vs a 128 GB phone
function sceneDownload(t) {
  const k = ease(ramp(t, WS(2, 9), WS(2, 10) + .4)), ph = ease(ramp(t, WS(2, 13), WS(2, 18)));
  let s = room(t, { clock: '00:01', clockCol: '#f4c76b' }) + `<rect width="720" height="1280" fill="#000" opacity=".6"/>`;
  F.ov = `<g transform="translate(360,${560})"><rect x="-300" y="-110" width="600" height="220" rx="24" fill="rgba(8,12,30,.92)" stroke="rgba(255,255,255,.15)"/>` +
    EN('DOWNLOADING', -260, -50, 22, 'rgba(255,255,255,.6)', 'start', 700, 'letter-spacing="3"') + EN(Math.round(212 * k) + ' GB', 260, -40, 64, '#f4c76b', 'end', 800) +
    `<rect x="-260" y="20" width="520" height="20" rx="10" fill="rgba(255,255,255,.15)"/><rect x="-260" y="20" width="${520 * (.03 + .05 * k)}" height="20" rx="10" fill="#4fa8ff"/>` + EN('GTA 6', -260, 80, 24, '#fff', 'start', 800) + `</g>` +
    `<g opacity="${ph}" transform="translate(360,960)"><rect x="-90" y="-180" width="180" height="360" rx="28" fill="#0a0a0c" stroke="#444" stroke-width="5"/><rect x="-78" y="-160" width="156" height="320" rx="16" fill="#151a26"/>` +
    EN('128 GB', 0, -100, 34, '#fff', 'middle', 800) + `<rect x="-60" y="-60" width="120" height="16" rx="8" fill="rgba(255,255,255,.15)"/><rect x="-60" y="-60" width="${120 * Math.min(1, 212 / 128 * ph)}" height="16" rx="8" fill="${ph > .6 ? '#e53935' : '#4fa8ff'}"/>` +
    `<g opacity="${ramp(ph, .6, .9)}">` + EN('Not enough', 0, 10, 24, '#ff8a8a', 'middle', 800) + EN('storage', 0, 40, 24, '#ff8a8a', 'middle', 800) + `</g></g>`;
  F.flash = 0; return s;
}
// 3: how long it takes – 212 GB = 1,696 gigabits
function clockFace(x, y, r, hrs, col) {
  const a = hrs / 12 * Math.PI * 2, b = hrs * Math.PI * 2;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#f4f4f0" stroke="#333" stroke-width="5"/>` + Array.from({ length: 12 }, (_, i) => { const q = i / 12 * Math.PI * 2; return `<path d="M${x + Math.sin(q) * r * .8},${y - Math.cos(q) * r * .8} L${x + Math.sin(q) * r * .92},${y - Math.cos(q) * r * .92}" stroke="#333" stroke-width="3"/>`; }).join('') +
    `<path d="M${x},${y} L${x + Math.sin(a) * r * .5},${y - Math.cos(a) * r * .5}" stroke="#111" stroke-width="7" stroke-linecap="round"/><path d="M${x},${y} L${x + Math.sin(b) * r * .75},${y - Math.cos(b) * r * .75}" stroke="${col}" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="6" fill="#111"/>`;
}
function sceneSpeed(t) {
  const a = ease(ramp(t, WS(3, 3), WS(3, 8))), b = ease(ramp(t, WS(3, 11), WS(3, 16)));
  let s = `<rect width="720" height="1280" fill="#0a0d1a"/>`;
  F.ov = wPanel(40, 440, 640, 360, '') + clockFace(150, 620, 100, 4.7 * a, '#4fa8ff') + EN('100 Mbps', 290, 580, 30, '#fff', 'start', 800) + EN(`≈ ${(4.7 * a).toFixed(1)} hours`, 290, 640, 44, '#f4c76b', 'start', 800) + EN('fast connection', 290, 680, 20, 'rgba(255,255,255,.6)', 'start', 500) +
    `<g opacity="${ramp(t, WS(3, 9), WS(3, 10))}">` + wPanel(40, 830, 640, 360, '') + clockFace(150, 1010, 100, 23.6 * b, '#e53935') + EN('20 Mbps', 290, 970, 30, '#fff', 'start', 800) + EN(`≈ ${(23.6 * b).toFixed(1)} hours`, 290, 1030, 44, '#ff8a8a', 'start', 800) + EN('slow connection', 290, 1070, 20, 'rgba(255,255,255,.6)', 'start', 500) + `</g>`;
  F.flash = 0; return s;
}
// 4: preload opened on November 10, nine days before launch
function scenePreload(t) {
  const k = ease(ramp(t, WS(4, 5), WS(4, 8) + .3));
  let s = `<rect width="720" height="1280" fill="#0a0d1a"/>`;
  let cal = wPanel(60, 450, 600, 560, 'NOVEMBER');
  for (let d = 1; d <= 30; d++) { const i = d - 1, x = 100 + (i % 7) * 76, y = 540 + Math.floor(i / 7) * 92, inR = d >= 10 && d < 19 && (d - 10) / 9 < k;
    cal += (d === 19 ? `<rect x="${x - 6}" y="${y - 40}" width="68" height="68" rx="12" fill="#f4c76b"/>` : '') + (d === 10 ? `<rect x="${x - 6}" y="${y - 40}" width="68" height="68" rx="12" fill="none" stroke="#4fa8ff" stroke-width="4"/>` : '') +
      EN(String(d), x + 28, y + 6, 30, d === 19 ? '#111' : '#fff', 'middle', 800) + (inR ? `<path d="M${x + 6},${y - 30} L${x + 52},${y + 18} M${x + 52},${y - 30} L${x + 6},${y + 18}" stroke="#4fa8ff" stroke-width="4" opacity=".8"/>` : ''); }
  F.ov = cal + `<g opacity="${k}">` + EN('Preload: Nov 10', 100, 1060, 26, '#4fa8ff', 'start', 800) + EN('Launch: Nov 19', 620, 1060, 26, '#f4c76b', 'end', 800) + `</g>`; F.flash = 0; return s;
}
// 5–6: the money – GTA 5 day one and day three, then GTA 6 with a question mark
function sceneMoney(t) {
  const a = ease(ramp(t, WS(5, 7), WS(5, 10))), b = ease(ramp(t, WS(5, 15), WS(5, 18))), c = ease(ramp(t, S0(6), WS(6, 6) + .3));
  const G = 1120, PX = .52; // px per $1M
  const bar = (x, v, k, col, lab, top) => `<rect x="${x}" y="${G - v * PX * k}" width="150" height="${v * PX * k}" rx="8" fill="${col}"/>` + `<rect x="${x}" y="${G - v * PX * k}" width="150" height="${v * PX * k}" rx="8" fill="url(#billS)" opacity=".5"/>` +
    `<g opacity="${k}">` + EN(top, x + 75, G - v * PX * k - 18, 30, '#fff', 'middle', 800) + `</g>` + EN(lab, x + 75, G + 40, 22, 'rgba(255,255,255,.75)', 'middle', 700);
  let s = `<rect width="720" height="1280" fill="#0a0d1a"/><defs><pattern id="billS" width="150" height="8" patternUnits="userSpaceOnUse"><rect width="150" height="2" fill="#000" opacity=".35"/></pattern></defs>`;
  s += `<path d="M40,${G} H680" stroke="rgba(255,255,255,.3)" stroke-width="3"/>` + bar(60, 815, a, '#3f8a4a', 'GTA 5 · day 1', '$800M+') + bar(285, 1000, b, '#4fa860', 'GTA 5 · day 3', '$1B') +
    `<g opacity="${c}">` + `<rect x="510" y="${G - 1000 * PX * 1.12 * c}" width="150" height="${1000 * PX * 1.12 * c}" rx="8" fill="#f4c76b" opacity=".85"/>` + EN('?', 585, G - 1000 * PX * 1.12 * c - 20, 72, '#f4c76b', 'middle', 800) + EN('GTA 6', 585, G + 40, 22, '#f4c76b', 'middle', 800) + `</g>`;
  F.ov = ''; F.flash = 0; return s;
}
// 7: dawn – still playing
function sceneSleep(t) {
  let s = room(t, { clock: '05:47', clockCol: '#f4c76b', dawn: .55 });
  s += `<g transform="translate(470,1060)"><rect x="-60" y="0" width="120" height="16" fill="#3a2a20"/>` + [0, 1, 2].map(i => `<rect x="${-46 + i * 30}" y="-36" width="18" height="36" rx="3" fill="${['#2a7ae0', '#e0402a', '#2ae07a'][i]}"/>`).join('') + `</g>`;
  s += gamer(200, 1040, 1.25, P1, t, { lift: 1, tired: ease(ramp(t, S0(7), WS(7, 11))) });
  F.ov = ''; F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(8, 0), WS(8, 6)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneRoom }, { s: WS(1, 8) - .4, f: sceneGlobe }, { s: S0(2) - .2, f: sceneDownload }, { s: S0(3) - .2, f: sceneSpeed },
  { s: S0(4) - .2, f: scenePreload }, { s: S0(5) - .2, f: sceneMoney }, { s: S0(7) - .2, f: sceneSleep }, { s: S0(8) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Midnight', S0(1)], ['212 GB', S0(2)], ['Download time', S0(3)], ['Day-one money', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'Midnight, country by country', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', 'Bigger than your phone', 360, 330, 'red', WS(2, 17), S0(3) - .3],
  ['c3', 'Preload: 9 days early', 360, 330, 'big', WS(4, 7), S0(5) - .3],
  ['c4', 'Guinness World Record', 360, 330, 'big', WS(5, 23), S0(6) - .1],
  ['c5', 'Record broken?', 360, 330, 'red', WS(6, 5), S0(7) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(8, 6), 999],
];
setupUI('GTA 6 NIGHT', TLI, CHIPS);
