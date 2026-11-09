// ===================== Weird Space Lab: What if you could teleport anywhere on Earth? =====================
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
// 1: they reappear – with an arrow showing their old speed still attached
function sceneCatch(t) {
  const ap = S0(1) - .1, k = ramp(t, ap, ap + .6), a = ease(ramp(t, WS(1, 6) - .2, WS(1, 10)));
  let s = space(t, '#0b1020', '#141a34') + wPanel(60, 520, 600, 620, '');
  s += `<g opacity="${ease(k)}">` + onWalk(300, 1060, CROWD[2], .7, 1, t, {}) + `</g>`;
  F.ov = sparkle(300, 860, k, 20, 7) + `<g opacity="${a}">` + wArrow(360, 860, 360 + 240 * a, 860, '#f4c76b', 8) + EN('your speed', 480, 830, 26, '#f4c76b') + `</g>`; F.flash = 0; return s;
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
  let s = `<defs><linearGradient id="polS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ac8"/><stop offset="1" stop-color="#d8e8f4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#polS)"/>` +
    `<path d="M-20,980 L120,940 L260,975 L420,930 L560,970 L740,935 L740,1300 L-20,1300Z" fill="#f4f8fc"/><rect y="980" width="720" height="300" fill="#e8f0f8"/>` +
    Array.from({ length: 12 }, (_, i) => { const x = 760 - ((t * 1800 + i * 160) % 1500); return `<path d="M${x},${1000 + (i % 4) * 60} l120,0" stroke="#c8d8e8" stroke-width="4"/>`; }).join('');
  s += `<g transform="rotate(-70,300,780)">` + onWalk(300, 900, CROWD[2], .9, 1, t, { lookUp: .3 }) + `</g>`;
  let lines = ''; const r = RS(5); for (let i = 0; i < 26; i++) { const y = 650 + r() * 400, x = 760 - ((t * 2600 * (.6 + r() * .8) + r() * 1200) % 1300); lines += `<path d="M${x},${y} l${120 + r() * 160},0" stroke="#fff" stroke-width="2.5" opacity="${.5 * r() + .2}"/>`; }
  const by = 520, W = 520;
  F.ov = lines + `<g opacity="${k}">` + EN('Pistol bullet', 100, by - 10, 22, '#1a2a3a', 'start') + `<rect x="100" y="${by}" width="${W * 1300 / 1670 * k}" height="30" rx="6" fill="#7a8a9a"/>` + EN('≈ 1,300 km/h', 110 + W * 1300 / 1670 * k, by + 23, 22, '#1a2a3a', 'start', 500) +
    EN('You', 100, by + 66, 22, '#1a2a3a', 'start') + `<rect x="100" y="${by + 76}" width="${W * k}" height="30" rx="6" fill="#f4c76b"/>` + EN('1,670 km/h', 110 + W * k, by + 99, 22, '#1a2a3a', 'start', 700) + `</g>`;
  F.flash = 0; return s;
}
// 5: on top of Everest the air holds only a third of the oxygen
function sceneEverest(t) {
  const k = ease(ramp(t, WS(5, 13) - .2, WS(5, 18))), p = ease(ramp(t, WS(5, 19), WS(5, 27)));
  let s = `<defs><linearGradient id="evS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3a7a"/><stop offset="1" stop-color="#8ab8e0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#evS)"/>`;
  s += mountains(1180, 300, 5, '#d8dce4', '#6a7486', 6) + `<path d="M140,1280 L360,820 L580,1280Z" fill="#e8ecf2"/><path d="M360,820 L580,1280 L460,1280Z" fill="#9aa4b4"/><path d="M360,820 L300,950 L340,930 L360,980 L380,920 L420,960Z" fill="#fff"/>`;
  s += onWalk(360, 830, CROWD[2], .45, 1, t, { lookUp: .2 }) + `<path d="M380,${830 - 150} l60,-40" stroke="#c62828" stroke-width="3"/><path d="M440,${830 - 190} l40,10 l-40,12Z" fill="#c62828"/>`;
  // oxygen gauge
  const cx = 200, cy = 560, R = 90, an = Math.PI * (1 - lerp(1, .33, k));
  F.ov = `<g><circle cx="${cx}" cy="${cy}" r="${R + 10}" fill="#f4f4f0"/><path d="M${cx - R + 10},${cy} A${R - 10},${R - 10} 0 0 1 ${cx + R - 10},${cy}" stroke="#43a047" stroke-width="12" fill="none"/>` +
    `<path d="M${cx},${cy} L${cx + Math.cos(an) * (R - 20)},${cy - Math.sin(an) * (R - 20)}" stroke="#c62828" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="8" fill="#333"/>` + EN('OXYGEN', cx, cy + 40, 20, '#333') + EN(`${Math.round(lerp(100, 33, k))}%`, cx, cy + 70, 26, '#c62828', 'middle', 800) + `</g>` +
    `<g opacity="${p}">` + EN('8,849 m', 520, 560, 34, '#fff', 'middle', 800) + `</g>`;
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
