// ===================== Weird Space Lab: What if you lived on a planet the size of a house? =====================
// the little planet is drawn with the real lunar surface texture (3D layer); scale: its 10 m diameter = 2R px
const ROCK = (x, y, r, a = 1) => { F.moon = { x, y, r, a, sunI: 1 }; F.light = [-600, y - 300]; };
const tinyEarth = (t) => { F.earth = { x: 600, y: 470, r: 70, a: 1, sunI: 1, lights: .3, rot: 2 + t * .05, tilt: .41 }; };
function astroAt(x, y, s, t, rot = 0) {
  return `<defs><radialGradient id="helmS" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#e8e4dc" stop-opacity="0"/><stop offset="1" stop-color="#7a766e" stop-opacity=".7"/></radialGradient><linearGradient id="visG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset=".3" stop-color="#e0a432"/><stop offset=".65" stop-color="#8a5414"/><stop offset="1" stop-color="#3a2208"/></linearGradient></defs>` +
    `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${astro(0, 0, { s: 1, t })}</g>`;
}
function house(x, base, h) {
  const w = h * 1.05;
  return `<g opacity=".92"><path d="M${x - w / 2},${base} L${x - w / 2},${base - h * .58} L${x},${base - h} L${x + w / 2},${base - h * .58} L${x + w / 2},${base}Z" fill="#c8a882"/><path d="M${x - w / 2 - 14},${base - h * .56} L${x},${base - h - 8} L${x + w / 2 + 14},${base - h * .56}" stroke="#8a3a2a" stroke-width="18" fill="none"/>` +
    `<rect x="${x - w * .32}" y="${base - h * .45}" width="${w * .18}" height="${h * .16}" fill="#3a4a5a"/><rect x="${x + w * .14}" y="${base - h * .45}" width="${w * .18}" height="${h * .16}" fill="#3a4a5a"/><rect x="${x - w * .08}" y="${base - h * .3}" width="${w * .16}" height="${h * .3}" fill="#5a3a24"/></g>`;
}
// 0: a small rocky world floating in space next to a house of the same size
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 6) - .2, WS(0, 11)));
  let s = space(t, '#02040c', '#060a1e'); tinyEarth(t); ROCK(250, 900, 150);
  F.ov = `<g opacity="${k}">` + house(530, 1050, 300) + EN('a house', 530, 1100, 24, '#fff') + `</g>` + astroAt(250, 752, .2, t);
  return s;
}
// 1: about ten metres across, made of rock like Earth
function sceneSize(t) {
  const k = ease(ramp(t, WS(1, 7), WS(1, 10)));
  let s = space(t, '#02040c', '#060a1e'); tinyEarth(t); ROCK(360, 860, 220);
  F.ov = astroAt(360, 642, .3, t) + `<g opacity="${k}"><path d="M140,1110 L580,1110" stroke="#f4c76b" stroke-width="5"/><path d="M140,1090 v40 M580,1090 v40" stroke="#f4c76b" stroke-width="5"/>` + EN('10 m', 360, 1160, 36, '#f4c76b', 'middle', 800) + `</g>`;
  return s;
}
// 2: gravity a million times weaker – a dropped tool barely moves
function sceneGravity(t) {
  const st = S0(2) - .2, T = Math.max(0, t - st), k = ease(ramp(t, WS(2, 5), WS(2, 9)));
  let s = space(t, '#02040c', '#060a1e'); ROCK(360, 1310, 520);
  const dy = .5 * 7.7e-6 * (T * T) * 259; // real fall in px at ~259 px/m: practically zero
  F.ov = astroAt(330, 800, .55, t) + `<g transform="translate(410,${640 + dy})"><rect x="-6" y="-30" width="12" height="60" rx="3" fill="#c8c8d0"/><rect x="-14" y="-38" width="28" height="12" rx="3" fill="#8a8a92"/></g>` +
    `<g opacity="${k}"><rect x="60" y="440" width="600" height="150" rx="18" fill="rgba(8,12,30,.6)"/>` + EN('Earth', 90, 485, 22, '#fff', 'start') + `<rect x="200" y="468" width="420" height="22" rx="5" fill="#7ab4ff"/>` +
    EN('This planet', 90, 545, 22, '#fff', 'start') + `<rect x="200" y="528" width="2" height="22" fill="#f4c76b"/>` + EN('≈ 1,000,000× weaker', 220, 546, 22, '#f4c76b', 'start', 800) + `</g>`;
  return s;
}
// 3: escape speed about 1 cm/s – slower than an ant walking
function ant(x, y, s, t) {
  const f = Math.sin(t * 18);
  return `<g transform="translate(${x},${y}) scale(${s})">` + [-1, 0, 1].map(i => `<path d="M${i * 14},0 l${-10 + f * 4 * (i % 2 ? 1 : -1)},18 M${i * 14},0 l${10 - f * 4 * (i % 2 ? 1 : -1)},-2 l6,20" stroke="#2a1a10" stroke-width="2.4" fill="none"/>`).join('') +
    `<ellipse cx="-30" cy="-4" rx="20" ry="13" fill="#3a2214"/><ellipse cx="0" cy="-4" rx="12" ry="8" fill="#4a2a18"/><circle cx="22" cy="-6" r="10" fill="#3a2214"/><path d="M28,-12 q12,-14 22,-8 M26,-14 q8,-18 18,-16" stroke="#2a1a10" stroke-width="2" fill="none"/><ellipse cx="-36" cy="-10" rx="6" ry="3" fill="#fff" opacity=".2"/></g>`;
}
function sceneAnt(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 11), WS(3, 14))), a = ease(ramp(t, WS(3, 16), WS(3, 20)));
  let s = `<rect width="720" height="1280" fill="#8a7a5a"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".35"/>` + Array.from({ length: 30 }, (_, i) => { const r = RS(i + 3); return `<ellipse cx="${r() * 720}" cy="${400 + r() * 880}" rx="${4 + r() * 10}" ry="${3 + r() * 6}" fill="${mix('#6a5a3a', '#a89a7a', r())}"/>`; }).join('');
  // a ruler with centimetre marks (real scale: 1 cm = 60 px here)
  s += `<rect x="40" y="820" width="640" height="70" fill="#f0d878"/>` + Array.from({ length: 11 }, (_, i) => `<rect x="${60 + i * 60}" y="820" width="2" height="${i % 5 === 0 ? 34 : 22}" fill="#3a2a10"/>` + EN(String(i), 61 + i * 60, 880, 16, '#3a2a10')).join('');
  const antX = 60 + ((T * 3 * 60) % 600), escX = 60 + ((T * .88 * 60) % 600);
  s += ant(antX, 806, 1.0, t) + `<g opacity="${k}"><circle cx="${escX}" cy="960" r="12" fill="#f4c76b"/>` + EN('escape speed ≈ 0.9 cm/s', escX + 20, 1000, 22, '#fff', 'start', 700) + `</g>`;
  F.ov = `<g opacity="${a}">` + EN('ant ≈ 3 cm/s', 360, 740, 28, '#fff', 'middle', 800) + `</g>`; return s;
}
// 4: one normal step and you drift away forever
function sceneStep(t) {
  const st = S0(4) - .2, q = ease(ramp(t, WS(4, 3), L(4).end + .5));
  let s = space(t, '#02040c', '#060a1e'); tinyEarth(t);
  ROCK(360 - q * 60, 1000 + q * 120, 220 * (1 - .45 * q));
  F.ov = astroAt(380 + q * 160, 780 - q * 520, .3 * (1 - .4 * q), t, q * 50) + `<g opacity="${ease(ramp(t, WS(4, 6), WS(4, 9)))}">` + wArrow(420, 760, 520, 560, '#f4c76b', 5) + `</g>`;
  return s;
}
// 5: no air – gas escapes straight to space, so you need a spacesuit
function sceneAir(t) {
  const k = ease(ramp(t, WS(5, 0), WS(5, 7)));
  let s = space(t, '#02040c', '#060a1e'); ROCK(360, 920, 260);
  let m = ''; const r = RS(31); for (let i = 0; i < 70; i++) { const a = r() * Math.PI * 2, q = (t * (.3 + r() * .4) + r()) % 1, d = 270 + q * 380;
    m += `<circle cx="${360 + Math.cos(a) * d}" cy="${920 + Math.sin(a) * d}" r="${2 + r() * 2}" fill="#bfe0ff" opacity="${k * (1 - q)}"/>`; }
  F.ov = m + astroAt(360, 662, .36, t);
  return s;
}
// 6: real tiny asteroids – landers must grab on or bounce away
function lander(x, y, s, rot) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-40" y="-30" width="80" height="60" rx="4" fill="#d8b04a"/><rect x="-40" y="-30" width="80" height="60" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    `<rect x="-36" y="-26" width="34" height="24" fill="#2a3a6a"/><rect x="2" y="-26" width="34" height="24" fill="#2a3a6a"/><path d="M-30,30 L-56,70 M30,30 L56,70 M0,30 L0,74" stroke="#b8b8c0" stroke-width="5"/><circle cx="-56" cy="70" r="7" fill="#888"/><circle cx="56" cy="70" r="7" fill="#888"/><circle cx="0" cy="74" r="7" fill="#888"/>` +
    `<path d="M40,-10 L90,-40" stroke="#c8c8d0" stroke-width="4"/><circle cx="92" cy="-41" r="6" fill="#f4c76b"/></g>`;
}
function sceneLander(t) {
  const st = S0(6) - .2, q = ramp(t, WS(6, 15) - .2, WS(6, 19) + .4), hop = Math.sin(Math.min(1, q) * Math.PI) * 260;
  let s = space(t, '#02040c', '#060a1e'); ROCK(360, 1180, 430);
  const lx = 300 + q * 160, ly = 690 - hop;
  F.ov = `<path d="M300,690 Q380,${690 - 520} 460,690" stroke="#bfe0ff" stroke-width="2.5" stroke-dasharray="8 8" fill="none" opacity="${.6 * ramp(t, WS(6, 17), WS(6, 19))}"/>` + lander(lx, ly, .9, Math.sin(q * 6) * 12);
  return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); ROCK(360, 820, 200); F.ov = astroAt(360, 622, .26, t) + endCard(t, WS(7, 0), WS(7, 4), false); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSize }, { s: S0(2) - .2, f: sceneGravity }, { s: S0(3) - .2, f: sceneAnt }, { s: S0(4) - .2, f: sceneStep },
  { s: S0(5) - .2, f: sceneAir }, { s: S0(6) - .2, f: sceneLander }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Tiny gravity', S0(2)], ['Escape speed', S0(3)], ['One step', S0(4)], ['No air', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', '10 m of solid rock', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', '~1 million × weaker gravity', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'Escape at 1 cm per second', 360, 330, 'red', WS(3, 12), S0(4) - .3],
  ['c4', 'One step = gone forever', 360, 330, 'red', WS(4, 4), S0(5) - .3],
  ['c5', 'No air at all', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c6', 'Grab on or bounce away', 360, 330, 'big', WS(6, 15), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 4), 999],
];
setupUI('TINY PLANET', TLI, CHIPS);
