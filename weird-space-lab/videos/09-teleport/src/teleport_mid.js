// ===================== Weird Space Lab: What if you could teleport anywhere on Earth? =====================
const MBT = (sd) => `<filter id="mbt${sd}" x="-10%" y="0" width="120%" height="100%"><feGaussianBlur stdDeviation="${sd} 0"/></filter>`;
const EARTHAT = (x, y, r, rot, tilt = .41) => { F.earth = { x, y, r, a: 1, sunI: 1, lights: .25, rot, tilt }; F.light = [-700, y - 200]; F.moon = null; };
function sparkle(x, y, k, n = 26, seed = 4) {
  if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = `<circle cx="${x}" cy="${y}" r="${40 + 120 * k}" fill="none" stroke="#bfe0ff" stroke-width="${6 * (1 - k)}" opacity="${1 - k}"/>`;
  for (let i = 0; i < n; i++) { const a = r() * Math.PI * 2, d = (20 + r() * 140) * k; s += `<circle cx="${x + Math.cos(a) * d}" cy="${y + Math.sin(a) * d * 1.6}" r="${2 + r() * 4}" fill="#dff4ff" opacity="${1 - k}"/>`; }
  return s;
}
// 0: a person on the street teleports away in a flash of light
function sceneHook(t) {
  const tp = WS(0, 4) - .05, k = ramp(t, tp, tp + .7);
  let s = wStreet(t, { id: 't0' });
  if (t < tp + .15) s += castSh(360, 1090, .58) + `<g opacity="${1 - ramp(t, tp, tp + .15)}">` + onWalk(360, 1090, CROWD[2], .58, 1, t, {}) + `</g>`;
  F.ov = sparkle(360, 920, k); F.flash = t > tp && t < tp + .2 ? .35 * (1 - (t - tp) / .2) : 0; return s;
}
// 1: they reappear on another street – with an arrow showing their old speed still attached
function sceneCatch(t) {
  const ap = S0(1) - .1, k = ramp(t, ap, ap + .6), a = ease(ramp(t, WS(1, 6) - .2, WS(1, 10)));
  let s = wStreet(t, { id: 't1', sky: ['#4a7ab0', '#a8c8e0', '#e8eef2'] });
  s += `<g opacity="${ease(k)}">` + castSh(300, 1090, .58) + onWalk(300, 1090, CROWD[2], .58, 1, t, {}) + `</g>`;
  F.ov = sparkle(300, 920, k, 20, 7) + `<g opacity="${a}">` + wArrow(340, 920, 340 + 260 * a, 920, '#f4c76b', 8) + EN('your speed', 470, 890, 26, '#f4c76b') + `</g>`; F.flash = 0; return s;
}
// 2: Earth's spin carries you east – about 1,670 km/h at the equator
function sceneSpin(t) {
  const st = S0(2) - .2, k = ease(ramp(t, WS(2, 8) - .2, WS(2, 10) + .3)), ex = 360, ey = 800, er = 270;
  let s = space(t, '#03050f', '#0a1030'); EARTHAT(ex, ey, er, 3.2 + (t - st) * .35);
  const ang = -.41, ca = Math.cos(ang), sa = Math.sin(ang), ph = ((t - st) * .7) % 2 - 1, P = u => [ex + ca * u * er, ey + sa * u * er];
  const [x1, y1] = P(-1), [x2, y2] = P(1), d = P(Math.sin(ph * Math.PI / 2));
  F.ov = `<g opacity="${ease(ramp(t, WS(2, 2), WS(2, 7)))}"><path d="M${ex - er - 30},${ey - 60} A${er + 40},${er + 40} 0 0 1 ${ex - 40},${ey - er - 36}" stroke="#fff" stroke-width="3" fill="none" marker-end="url(#arrW)" opacity=".75"/>` + EN('EAST', ex - 90, ey - er - 60, 22, '#fff') + `</g>` +
    `<g opacity="${k}"><path d="M${x1},${y1} L${x2},${y2}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 9"/><circle cx="${d[0]}" cy="${d[1]}" r="10" fill="#f4c76b"/>` + EN('EQUATOR', x2 - 10, y2 - 30, 22, '#fff') + `</g>`;
  F.flash = 0; return s;
}
// 3: jump from the equator to the North Pole – and keep the sideways speed
function scenePole(t) {
  const st = S0(3) - .2, j = ease(ramp(t, WS(3, 0), WS(3, 7) + .2)), g = ease(ramp(t, WS(3, 13), WS(3, 21))), ex = 360, ey = 840, er = 260;
  let s = space(t, '#03050f', '#0a1030'); EARTHAT(ex, ey, er, 3.6 + (t - st) * .15, .05);
  const a0 = [ex - 40, ey + 20], a1 = [ex, ey - er + 4], mx = (a0[0] + a1[0]) / 2 - 160, my = (a0[1] + a1[1]) / 2 - 120;
  const q = j, px = (1 - q) ** 2 * a0[0] + 2 * (1 - q) * q * mx + q * q * a1[0], py = (1 - q) ** 2 * a0[1] + 2 * (1 - q) * q * my + q * q * a1[1];
  F.ov = `<path d="M${a0[0]},${a0[1]} Q${mx},${my} ${a1[0]},${a1[1]}" stroke="#bfe0ff" stroke-width="3" stroke-dasharray="8 8" fill="none" opacity="${.8 * j}"/>` +
    `<circle cx="${a0[0]}" cy="${a0[1]}" r="8" fill="#f4c76b" opacity="${1 - j}"/><circle cx="${px}" cy="${py}" r="11" fill="#f4c76b"/>` + EN('NORTH POLE', a1[0], a1[1] - 50, 22, '#fff') +
    `<g opacity="${g}">` + wArrow(a1[0] + 14, a1[1] - 10, a1[0] + 14 + 230 * g, a1[1] - 10, '#f4c76b', 7) + EN('still 1,670 km/h', a1[0] + 130, a1[1] - 34, 22, '#f4c76b') + `</g>` + sparkle(a1[0], a1[1], ramp(t, WS(3, 7), WS(3, 7) + .6), 14, 3);
  F.flash = 0; return s;
}
// 4: flying sideways over the polar ice, faster than a pistol bullet
function sceneBullet(t) {
  const k = ease(ramp(t, WS(4, 1) - .2, WS(4, 7)));
  let s = `<defs><linearGradient id="polS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a4a7a"/><stop offset=".55" stop-color="#9ab8d4"/><stop offset="1" stop-color="#f0d8c0"/></linearGradient>` +
    `<linearGradient id="iceG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dce8f2"/><stop offset="1" stop-color="#a8bccc"/></linearGradient>${MBT(16)}</defs><rect width="720" height="1280" fill="url(#polS)"/>` +
    `<circle cx="600" cy="930" r="38" fill="#fff4dc"/><circle cx="600" cy="930" r="140" fill="#ffe0b0" opacity=".3" filter="url(#soft)"/>`;
  // distant pressure ridges and the ice sheet, smeared by speed
  let ice = `<path d="M-20,960 L60,948 L140,958 L220,940 L300,955 L380,944 L470,958 L560,946 L640,957 L740,945 L740,1300 L-20,1300Z" fill="#c8d8e6"/>`;
  ice += `<rect y="970" width="720" height="320" fill="url(#iceG)"/><rect y="970" width="720" height="320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  for (let i = 0; i < 18; i++) { const y = 990 + i * 16 + i * i * 1.2, x = 760 - ((t * (900 + i * 120) + i * 97) % 1100); ice += `<path d="M${x},${y} q60,-4 140,0" stroke="#fff" stroke-width="${1.5 + i * .15}" opacity=".7" fill="none"/><path d="M${x + 30},${y + 4} q50,3 110,0" stroke="#8aa0b4" stroke-width="1.5" opacity=".5" fill="none"/>`; }
  s += `<g filter="url(#mbt16)">${ice}</g>`;
  s += shadowE(300, 1120, 60, .25) + `<g transform="rotate(-70,300,780)">` + onWalk(300, 900, CROWD[2], .9, 1, t, { lookUp: .3 }) + `</g>`;
  let lines = ''; const r = RS(5); for (let i = 0; i < 26; i++) { const y = 650 + r() * 400, x = 760 - ((t * 2600 * (.6 + r() * .8) + r() * 1200) % 1300); lines += `<path d="M${x},${y} l${120 + r() * 160},0" stroke="#fff" stroke-width="2.5" opacity="${.5 * r() + .2}"/>`; }
  const by = 520, W = 520;
  F.ov = lines + `<g opacity="${k}"><rect x="80" y="${by - 50}" width="${W + 140}" height="190" rx="18" fill="rgba(8,12,30,.55)"/>` + EN('Pistol bullet', 100, by - 10, 22, '#fff', 'start') + `<rect x="100" y="${by}" width="${W * 1300 / 1670 * k}" height="30" rx="6" fill="#9aa8b8"/>` + EN('≈ 1,300 km/h', 110 + W * 1300 / 1670 * k, by + 23, 20, '#fff', 'start', 500) +
    EN('You', 100, by + 66, 22, '#fff', 'start') + `<rect x="100" y="${by + 76}" width="${W * k}" height="30" rx="6" fill="#f4c76b"/>` + EN('1,670 km/h', 110 + W * k - 120, by + 99, 20, '#1a2a3a', 'start', 800) + `</g>`;
  F.flash = 0; return s;
}
// 5: on top of Everest the air holds only a third of the oxygen
// the summit pyramid: jagged ridges by midpoint displacement, a sunlit snow face, a shaded rock face with snow streaks, rock outcrops
const SUMMIT_TOP = [360, 870];
function jag(a, b, rough, seed, lv = 6) {
  let pts = [a, b]; const r = RS(seed);
  for (let l = 0; l < lv; l++) { const n = []; for (let i = 0; i < pts.length - 1; i++) { const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], len = Math.hypot(x2 - x1, y2 - y1);
      n.push(pts[i], [(x1 + x2) / 2 + (r() - .5) * len * rough * .3, (y1 + y2) / 2 + (r() - .5) * len * rough]); } n.push(pts[pts.length - 1]); pts = n; }
  return pts;
}
function summitPeak() { return SUMMIT_TOP; }
function summit(t) {
  const T = SUMMIT_TOP, L = jag(T, [-60, 1240], .16, 5), Rr = jag(T, [780, 1150], .16, 8), mid = jag(T, [430, 1300], .08, 11);
  let s = `<defs><linearGradient id="snF" x1="0" y1="0" x2=".6" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e4ecf6"/><stop offset="1" stop-color="#b8c8dc"/></linearGradient>` +
    `<linearGradient id="rkF" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a5262"/><stop offset="1" stop-color="#22262e"/></linearGradient></defs>`;
  // lit snow face (left of the central ridge) and shaded rock face (right)
  s += `<path d="M${L.map(PT).join(' L')} L-60,1300 L430,1300 L${mid.slice().reverse().map(PT).join(' L')}Z" fill="url(#snF)"/>`;
  s += `<path d="M${mid.map(PT).join(' L')} L780,1300 L780,1150 L${Rr.slice().reverse().map(PT).join(' L')}Z" fill="url(#rkF)"/>`;
  // snow streaks in gullies on the rock face
  const r = RS(19); for (let i = 0; i < 14; i++) { const q = .1 + r() * .8, x0 = lerp(T[0] + 20, 760, q), y0 = lerp(T[1] + 20, 1150, q) + 10;
    s += `<path d="M${x0},${y0} l${-30 - r() * 40},${120 + r() * 160} l${10 + r() * 14},0 Z" fill="#e8eef6" opacity="${.3 + .25 * r()}" filter="url(#blur2)"/>`; }
  // dark rock outcrops on the snow face
  for (let i = 0; i < 12; i++) { const q = .12 + r() * .8, x0 = lerp(T[0] - 20, 0, q) + r() * 60, y0 = lerp(T[1] + 30, 1220, q);
    s += `<path d="M${x0},${y0} l${14 + r() * 20},${-8 - r() * 10} l${10 + r() * 16},${18 + r() * 20} l${-30 - r() * 20},${6}Z" fill="#3a4250" opacity=".85"/>`; }
  s += `<path d="M${mid.map(PT).join(' L')}" stroke="#ffffff" stroke-width="3" fill="none" opacity=".8"/>`;
  s += `<path d="M${L.map(PT).join(' L')} L-60,1300 L780,1300 L780,1150 L${Rr.slice().reverse().map(PT).join(' L')}Z" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  for (let i = 0; i < 5; i++) s += `<ellipse cx="${T[0] + 70 + i * 60 + ((t * 40) % 60)}" cy="${T[1] - 4 - i * 6}" rx="${50 + i * 20}" ry="${8 + i * 3}" fill="#fff" opacity="${.35 - i * .05}" filter="url(#soft)"/>`;
  return s;
}
function sceneEverest(t) {
  const k = ease(ramp(t, WS(5, 13) - .2, WS(5, 18))), p = ease(ramp(t, WS(5, 19), WS(5, 27)));
  let s = `<defs><linearGradient id="evS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1a4a"/><stop offset=".6" stop-color="#3a6aa8"/><stop offset="1" stop-color="#a8c8e8"/></linearGradient></defs><rect width="720" height="1280" fill="url(#evS)"/>`;
  s += `<circle cx="140" cy="430" r="28" fill="#fffdf2"/><circle cx="140" cy="430" r="110" fill="#fff6d0" opacity=".25" filter="url(#soft)"/>`;
  s += mountains(1180, 200, 7, '#b8c8dc', '#6a7a94', 9) + `<rect y="1080" width="720" height="300" fill="#e8eef4" opacity=".55" filter="url(#haze)"/>`;
  for (let i = 0; i < 7; i++) { const r = RS(i + 21); s += `<ellipse cx="${(r() * 900 + t * 10 * (1 + r())) % 900 - 90}" cy="${1040 + r() * 120}" rx="${120 + r() * 80}" ry="${24 + r() * 14}" fill="#fff" opacity=".7" filter="url(#soft)"/>`; }
  s += summit(t);
  const [hx, hy] = summitPeak(); s += onWalk(hx, hy + 2, CROWD[2], .34, 1, t, { lookUp: .2, coat: 1 }) + `<path d="M${hx + 12},${hy - 90} l2,-36" stroke="#555" stroke-width="2"/><path d="M${hx + 14},${hy - 126} q16,${-3 + Math.sin(t * 6) * 3} 34,3 l-34,8Z" fill="#c62828"/>`;
  const cx = 170, cy = 600, R = 80, an = Math.PI * (1 - lerp(1, .33, k));
  F.ov = `<g><circle cx="${cx}" cy="${cy}" r="${R + 10}" fill="#f4f4f0"/><path d="M${cx - R + 10},${cy} A${R - 10},${R - 10} 0 0 1 ${cx + R - 10},${cy}" stroke="#43a047" stroke-width="12" fill="none"/>` +
    `<path d="M${cx},${cy} L${cx + Math.cos(an) * (R - 20)},${cy - Math.sin(an) * (R - 20)}" stroke="#c62828" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="8" fill="#333"/>` + EN('OXYGEN', cx, cy + 36, 18, '#333') + EN(`${Math.round(lerp(100, 33, k))}%`, cx, cy + 64, 24, '#c62828', 'middle', 800) + `</g>` +
    `<g opacity="${p}">` + EN('8,849 m', 540, 600, 34, '#fff', 'middle', 800) + `</g>`;
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(6, 0), WS(6, 6)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCatch }, { s: S0(2) - .2, f: sceneSpin }, { s: S0(3) - .2, f: scenePole }, { s: S0(4) - .2, f: sceneBullet },
  { s: S0(5) - .2, f: sceneEverest }, { s: S0(6) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Your speed', S0(1)], ['Earth spins', S0(2)], ['To the pole', S0(3)], ['To Everest', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'Your speed comes with you', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', '≈ 1,670 km/h at the equator', 360, 330, 'big', WS(2, 13), S0(3) - .3],
  ['c3', 'Still flying sideways', 360, 330, 'red', WS(3, 17), S0(4) - .3],
  ['c4', 'Faster than a pistol bullet', 360, 330, 'red', WS(4, 4), S0(5) - .3],
  ['c5', 'Only 1/3 of the oxygen', 360, 330, 'big', WS(5, 15), S0(6) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(6, 6), 999],
];
setupUI('TELEPORT', TLI, CHIPS);
