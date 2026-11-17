// ===================== Weird Space Lab: GTA 6 by the numbers =====================
// no game art, logos or characters: our own street, the real 3D Earth, real-scale comparisons
const D2R = Math.PI / 180;
// Earth rotation that puts longitude `lon` in the middle of the globe (the 3D layer adds t*0.03 on its own)
const rotFor = (lon, t) => -(lon + 90) * D2R - t * .03;
// screen position of a place on the 3D Earth (same rotation order as the 3D layer: Y, then X, then Z)
function proj(lat, lon, e, t) {
  const u = (lon + 180) / 360, la = lat * D2R;
  let x = -Math.cos(2 * Math.PI * u) * Math.cos(la), y = Math.sin(la), z = Math.sin(2 * Math.PI * u) * Math.cos(la);
  const ry = (e.rot ?? .6) + t * .03, rx = e.tx ?? 0, rz = e.tilt ?? .41;
  [x, z] = [x * Math.cos(ry) + z * Math.sin(ry), -x * Math.sin(ry) + z * Math.cos(ry)];
  [y, z] = [y * Math.cos(rx) - z * Math.sin(rx), y * Math.sin(rx) + z * Math.cos(rx)];
  [x, y] = [x * Math.cos(rz) - y * Math.sin(rz), x * Math.sin(rz) + y * Math.cos(rz)];
  return { x: e.x + e.r * x, y: e.y - e.r * y, vis: z > .05 };
}
const pin = (p, label, a = 1, side = 1) => p.vis ? `<g opacity="${a}"><circle cx="${p.x}" cy="${p.y}" r="22" fill="#f4c76b" opacity=".25"/><circle cx="${p.x}" cy="${p.y}" r="8" fill="#f4c76b" stroke="#fff" stroke-width="3"/>` +
  `<path d="M${p.x + side * 12},${p.y - 8} L${p.x + side * 50},${p.y - 46}" stroke="#fff" stroke-width="2.5"/>` + EN(label, p.x + side * 56, p.y - 52, 28, '#fff', side > 0 ? 'start' : 'end', 800, 'style="filter:drop-shadow(0 2px 6px rgba(0,0,0,.9))"') + `</g>` : '';
// a plain game case seen from the side (no cover art)
const caseSide = (x, y, w, h, c = '#1f5fbf') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/><rect x="${x}" y="${y}" width="${w}" height="${h * .3}" fill="#fff" opacity=".18"/><rect x="${x + w * .82}" y="${y}" width="${w * .18}" height="${h}" fill="#000" opacity=".25"/>`;
// the night version of our street with a big billboard
function nightStreet(t, id, bill = 1) {
  let s = wStreet(t, { id, sky: ['#05071a', '#141a3a', '#2a2a4a'], sunGlow: .05, lamps: 1 });
  s += `<rect width="720" height="1280" fill="#0a1030" opacity=".55" style="mix-blend-mode:multiply"/>`;
  // lit windows
  const r = RS(31); for (let i = 0; i < 40; i++) s += `<rect x="${r() * 700}" y="${700 + r() * 260}" width="10" height="14" fill="#ffd27a" opacity="${.5 + r() * .4}"/>`;
  // billboard on a rooftop
  const g = .75 + .25 * Math.sin(t * 6) * Math.sin(t * 2.3);
  s += `<g opacity="${bill}"><rect x="128" y="470" width="464" height="250" rx="10" fill="#0c0c14" stroke="#333" stroke-width="6"/><rect x="200" y="720" width="12" height="120" fill="#222"/><rect x="508" y="720" width="12" height="120" fill="#222"/>` +
    `<rect x="140" y="482" width="440" height="226" rx="6" fill="url(#bbG)"/><defs><linearGradient id="bbG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff4fa3"/><stop offset=".5" stop-color="#8a3cff"/><stop offset="1" stop-color="#1fb6ff"/></linearGradient></defs>` +
    `<rect x="140" y="482" width="440" height="226" rx="6" fill="#000" opacity=".25"/>` +
    EN('GTA 6', 360, 618, 112, '#fff', 'middle', 800, `style="filter:drop-shadow(0 0 ${14 * g}px #fff)"`) + EN('NOV 19', 360, 682, 40, '#f4c76b', 'middle', 800, 'letter-spacing="6"') +
    `<ellipse cx="360" cy="600" rx="330" ry="200" fill="#c060ff" opacity="${.18 * g}" filter="url(#soft)"/></g>`;
  return s;
}
// 0: a city at night, a crowd under a GTA 6 billboard
function sceneHook(t) {
  let s = nightStreet(t, 'n0') + castSh(250, 1094, .56) + onWalk(250, 1094, CROWD[0], .56, 1, t, { lookUp: .5 }) + castSh(470, 1090, .58) + onWalk(470, 1090, CROWD[2], .58, -1, t, { lookUp: .45 }) +
    onWalk(600, 1086, CROWD[1], .54, -1, t, { lookUp: .4 });
  const k = ease(ramp(t, WS(0, 8), WS(0, 12)));
  F.ov = `<g opacity="${k}">` + EN('THIS WEEK', 360, 420, 44, '#f4c76b', 'middle', 800, 'letter-spacing="8" style="filter:drop-shadow(0 3px 10px rgba(0,0,0,.8))"') + `</g>`; F.flash = 0; return s;
}
// 1: 2013 → 2026 – a baby grows into a teenager while the years tick by
function sceneWait(t) {
  const q = ease(ramp(t, WS(1, 6), WS(1, 18) + .3)), yr = Math.round(lerp(2013, 2026, q));
  let s = wStreet(t, { id: 'w1' });
  const sc = lerp(.2, .5, q); // a baby (~0.6 m) to a 13-year-old (~1.55 m) next to an adult (1.75 m, scale .56)
  s += castSh(300, 1094, sc) + onWalk(300, 1094, CROWD[1], sc, 1, t) + castSh(470, 1094, .56) + onWalk(470, 1094, CROWD[0], .56, -1, t);
  F.ov = `<rect x="60" y="430" width="600" height="190" rx="22" fill="rgba(8,12,30,.85)"/>` + EN(String(yr), 360, 540, 96, '#f4c76b', 'middle', 800) +
    `<rect x="110" y="575" width="500" height="10" rx="5" fill="rgba(255,255,255,.2)"/><rect x="110" y="575" width="${500 * q}" height="10" rx="5" fill="#f4c76b"/>` + EN('GTA 5', 110, 610, 18, '#fff', 'start') + EN('GTA 6', 610, 610, 18, '#fff', 'end');
  F.flash = 0; return s;
}
// 2a: 230 million game cases piled up on the street
function sceneSales(t) {
  const k = ease(ramp(t, WS(2, 5), WS(2, 7)));
  let s = wStreet(t, { id: 's2' });
  // a growing pile next to a person (a case is ~1.2 cm thick: 1.75 m person = 98 px, so a case is ~0.7 px)
  const h = lerp(20, 1100, ease(ramp(t, WS(2, 8), S0(3) - .3)));
  s += caseSide(330, 1094 - h, 40, h) + `<g>${Array.from({ length: Math.floor(h / 6) }, (_, i) => `<rect x="330" y="${1094 - i * 6}" width="40" height="1" fill="#000" opacity=".25"/>`).join('')}</g>` +
    castSh(450, 1094, .56) + onWalk(450, 1094, CROWD[0], .56, -1, t, { lookUp: .6 });
  F.ov = `<g opacity="${k}">` + `<rect x="30" y="430" width="470" height="120" rx="22" fill="rgba(8,12,30,.85)"/>` + EN(Math.round(lerp(0, 230, ease(ramp(t, WS(2, 4), WS(2, 7)))) ) + ' MILLION', 265, 500, 52, '#f4c76b', 'middle', 800) + EN('copies of GTA 5 sold', 265, 535, 22, '#fff') + `</g>`;
  F.flash = 0; return s;
}
// 2b: the stack seen from space at real scale – 2,760 km, the ISS orbits at ~400 km
function sceneTower(t) {
  const E = { x: 360, y: 1520, r: 600 }, kmPx = E.r / 6371, H = 2760 * kmPx, iss = 400 * kmPx, top = E.y - E.r;
  const g = ease(ramp(t, S0(2) + 4.2, WS(2, 22)));
  F.earth = { x: E.x, y: E.y, r: E.r, a: 1, sunI: 1, lights: .2, rot: rotFor(-35, t), tx: .1, tilt: 0 }; F.light = [-500, 300]; F.moon = null;
  let s = space(t, '#02040c', '#060a1e');
  const k = ease(ramp(t, WS(2, 23), WS(2, 26)));
  F.ov = `<path d="M360,${top} L360,${top - H * g}" stroke="#4f8fff" stroke-width="8"/><path d="M360,${top} L360,${top - H * g}" stroke="#fff" stroke-width="2" opacity=".6"/>` +
    `<circle cx="360" cy="${top - H * g}" r="10" fill="#f4c76b"/>` + `<g opacity="${g}">` + EN((Math.round(2760 * g / 10) * 10).toLocaleString('en-US') + ' km', 380, top - H * g - 18, 30, '#f4c76b', 'start', 800) + `</g>` +
    `<g opacity="${k}"><ellipse cx="360" cy="${E.y}" rx="${E.r + iss}" ry="${E.r + iss}" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="10 8" opacity=".7"/>` +
    `<g transform="translate(${360 - 170},${top - iss + 18})"><rect x="-26" y="-3" width="52" height="6" fill="#ccc"/><rect x="-24" y="-14" width="14" height="28" fill="#2a4a8a"/><rect x="10" y="-14" width="14" height="28" fill="#2a4a8a"/><rect x="-5" y="-6" width="10" height="12" fill="#eee"/></g>` +
    EN('Space Station ~400 km', 120, top - iss - 20, 22, '#fff', 'start', 700) + EN('×7', 400, top - H * .55, 64, '#fff', 'start', 800) + `</g>`;
  F.flash = 0; return s;
}
// 3: a phone playing a trailer, the view counter racing to 90 million in 24 hours
function sceneTrailer(t) {
  const q = ease(ramp(t, WS(3, 4), WS(3, 13))), v = Math.round(90421491 * q), hr = Math.round(24 * q);
  let s = nightStreet(t, 'n3', .35) + `<rect width="720" height="1280" fill="#000" opacity=".5"/>`;
  F.ov = `<g transform="translate(360,800)"><rect x="-210" y="-330" width="420" height="700" rx="46" fill="#0a0a0c" stroke="#3a3a40" stroke-width="6"/><rect x="-190" y="-300" width="380" height="214" rx="10" fill="url(#bbG)"/><rect x="-190" y="-300" width="380" height="214" rx="10" fill="#000" opacity=".35"/>` +
    `<circle cx="0" cy="-193" r="38" fill="#e53935"/><path d="M-12,-212 L20,-193 L-12,-174Z" fill="#fff"/>` + EN('GTA 6 · Trailer 1', -180, -50, 24, '#fff', 'start', 700) +
    EN(v.toLocaleString('en-US'), -180, 10, 44, '#f4c76b', 'start', 800) + EN('views', -180, 44, 22, 'rgba(255,255,255,.7)', 'start', 500) +
    `<rect x="-180" y="90" width="360" height="10" rx="5" fill="rgba(255,255,255,.15)"/><rect x="-180" y="90" width="${360 * q}" height="10" rx="5" fill="#e53935"/>` + EN(hr + ' h', 180, 136, 26, '#fff', 'end', 800) + EN('in one day', -180, 136, 22, 'rgba(255,255,255,.7)', 'start', 500) + `</g>`;
  F.flash = 0; return s;
}
// 4: a billion dollars in $100 bills, stacked: ~1.1 km, taller than the world's tallest building
function sceneMoney(t) {
  const q = ease(ramp(t, WS(4, 6), WS(4, 10))), k = ease(ramp(t, WS(4, 11), WS(4, 15)));
  // ground at y=1180; scale 1 km = 900 px
  const G = 1180, KM = 700 / 1.1, mH = 1.1 * KM * q, bH = .828 * KM;
  let s = `<defs><linearGradient id="dusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1840"/><stop offset=".7" stop-color="#3a5a8a"/><stop offset="1" stop-color="#e0a070"/></linearGradient></defs><rect width="720" height="1280" fill="url(#dusk)"/>` +
    `<rect y="${G}" width="720" height="${1280 - G}" fill="#2a2a30"/>`;
  // the world's tallest building (828 m), a stepped needle-like tower
  const bx = 470; s += `<path d="M${bx - 50},${G} L${bx - 34},${G - bH * .45} L${bx - 22},${G - bH * .7} L${bx - 10},${G - bH * .86} L${bx - 3},${G - bH} L${bx + 3},${G - bH} L${bx + 10},${G - bH * .86} L${bx + 22},${G - bH * .7} L${bx + 34},${G - bH * .45} L${bx + 50},${G}Z" fill="#9aa8c0"/>` +
    `<path d="M${bx},${G} L${bx},${G - bH}" stroke="#fff" stroke-width="2" opacity=".35"/>` + Array.from({ length: 26 }, (_, i) => { const y = G - i * bH * .033, w = 50 - 47 * (i * .033); return `<path d="M${bx - w * .9},${y} L${bx + w * .9},${y}" stroke="#ffe0a0" stroke-width="1.5" opacity=".5"/>`; }).join('') + EN('828 m', bx + 60, G - bH + 10, 22, '#fff', 'start');
  // the money stack
  s += `<rect x="220" y="${G - mH}" width="70" height="${mH}" fill="#6a9a6a"/><rect x="220" y="${G - mH}" width="70" height="${mH}" fill="url(#billP)"/><defs><pattern id="billP" width="70" height="6" patternUnits="userSpaceOnUse"><rect width="70" height="1" fill="#2a4a2a" opacity=".5"/></pattern></defs>` +
    `<rect x="276" y="${G - mH}" width="14" height="${mH}" fill="#000" opacity=".25"/>`;
  F.ov = `<g opacity="${q}">` + EN('$1,000,000,000', 255, G - mH - 50, 30, '#f4c76b', 'middle', 800) + EN('in $100 bills ≈ 1.1 km', 255, G - mH - 20, 20, '#fff') + `</g>` +
    `<g opacity="${k}">` + wPanel(380, 1196, 300, 60, '') + EN('ESTIMATE · NOT CONFIRMED', 530, 1234, 18, '#ff8a8a', 'middle', 800) + `</g>`;
  F.flash = 0; return s;
}
// 5: the real Earth turning to Florida – Leonida and Vice City
function sceneFlorida(t) {
  const st = S0(5) - .2, z = ease(ramp(t, st, WS(5, 8)));
  const e = { x: 360, y: lerp(820, 1000, z), r: lerp(300, 1500, z), a: 1, sunI: 1, lights: .1, rot: rotFor(lerp(-30, -81.5, ease(ramp(t, st, WS(5, 3)))), t), tx: lerp(.2, 27.5 * D2R, z), tilt: 0 };
  F.earth = e; F.light = [-400, 200]; F.moon = null;
  let s = space(t, '#02040c', '#060a1e');
  F.ov = pin(proj(25.77, -80.19, e, t), 'Vice City = Miami', ramp(t, WS(5, 9), WS(5, 11)), -1) + `<g opacity="${ramp(t, WS(5, 4), WS(5, 6))}">` +
    pin(proj(29.5, -82.5, e, t), 'Leonida = Florida', 1, 1) + `</g>`;
  F.flash = 0; return s;
}
// 6: midnight rolling around the real Earth, starting in New Zealand
const MIDN = [[-41, 174.8, 'New Zealand'], [35.7, 139.7, 'Japan'], [28.6, 77.2, 'India'], [25.2, 55.3, 'UAE'], [48.9, 2.3, 'Europe'], [-15.8, -47.9, 'Brazil'], [40.7, -74, 'New York']];
function sceneMidnight(t) {
  const st = S0(6) - .2, q = ramp(t, WS(6, 10) - .3, L(6).end + .6), lon = lerp(185, -80, q);
  const e = { x: 360, y: 820, r: 330, a: 1, sunI: .12, lights: 1, rot: rotFor(lon, t), tx: .15, tilt: 0 };
  F.earth = e; F.light = [360, -3000]; F.moon = null;
  let s = space(t, '#010208', '#03050f');
  const k = ease(ramp(t, WS(6, 6), WS(6, 8)));
  let lab = ''; MIDN.forEach(([la, lo, nm]) => { const d = Math.abs(((lo - lon + 540) % 360) - 180); if (d < 18) lab += pin(proj(la, lo, e, t), nm, 1 - d / 18, 1); });
  F.ov = `<g opacity="${k}"><path d="M360,470 L360,1170" stroke="#f4c76b" stroke-width="4" stroke-dasharray="14 8"/>` + `<rect x="290" y="420" width="140" height="56" rx="12" fill="#f4c76b"/>` + EN('00:00', 360, 461, 36, '#111', 'middle', 800) + `</g>` + lab;
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(7, 0), WS(7, 7)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWait }, { s: S0(2) - .2, f: sceneSales }, { s: WS(2, 13) - .2, f: sceneTower }, { s: S0(3) - .2, f: sceneTrailer },
  { s: S0(4) - .2, f: sceneMoney }, { s: S0(5) - .2, f: sceneFlorida }, { s: S0(6) - .2, f: sceneMidnight }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['13-year wait', S0(1)], ['230M copies', S0(2)], ['Record trailer', S0(3)], ['$1B+ budget', S0(4)], ['Vice City', S0(5)]];
const LIST_ON = new Set([sceneSales]);
const CHIPS = [
  ['c1', '13 years', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', '7× higher than the ISS', 360, 330, 'big', WS(2, 24), S0(3) - .3],
  ['c3', 'Guinness World Record', 360, 330, 'big', WS(3, 15), S0(4) - .3],
  ['c4', 'More than $1 billion?', 360, 330, 'red', WS(4, 7), S0(5) - .3],
  ['c5', 'Midnight, country by country', 360, 330, 'big', WS(6, 7), S0(7) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 7), 999],
];
setupUI('GTA 6', TLI, CHIPS);
