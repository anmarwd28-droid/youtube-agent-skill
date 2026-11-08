// ===================== Weird Space Lab: What if all 8 billion people jumped at the same time? =====================
const CREW = [[110, 0, 1, .5], [250, 2, 1, .54], [400, 1, -1, .52], [540, 3, -1, .55], [650, 0, -1, .5]];
const jumpH = (t, t0) => { const q = (t - t0) / .95; return q > 0 && q < 1 ? Math.sin(q * Math.PI) * 85 : 0; };
function crowdStreet(t, t0, id) {
  let s = wStreet(t, { id });
  CREW.forEach(([x, c, f, sc], i) => { const h = jumpH(t, t0 + i * .02); s += floater(x, 1092 - (i % 2) * 6, CROWD[c], sc, f, t, h, 0, { lookUp: h > 0 ? .3 : 0 }); });
  return s;
}
// 0: a street of people; on "jumped" everyone jumps together
function sceneHook(t) { const s = crowdStreet(t, WS(0, 8) - .1, 'j0'); F.ov = ''; return s; }
// 1: all of us together weigh about 400 million tonnes
function sceneWeigh(t) {
  const k = ease(ramp(t, S0(1), WS(1, 4)));
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + wPanel(40, 450, 640, 760, 'ALL OF HUMANITY');
  // a pile of tiny people
  const r = RS(5); let pile = ''; for (let i = 0; i < 60; i++) { const row = Math.floor(i / 10), col = i % 10, x = 150 + col * 46 + (row % 2) * 20, y = 1060 - row * 62;
    pile += `<g transform="translate(${x},${y}) scale(.15)" opacity="${clamp(k * 3 - row * .4)}">` + onWalk(0, 0, CROWD[i % 4], 1, i % 2 ? 1 : -1, t) + `</g>`; }
  s += pile + `<rect x="120" y="1070" width="480" height="14" rx="6" fill="#c8bca6"/>`;
  F.ov = `<g opacity="${ease(ramp(t, WS(1, 4), WS(1, 7)))}">` + EN('≈ 400,000,000 tonnes', 360, 640, 40, '#f4c76b') + EN('8 billion people', 360, 590, 26, '#fff', 'middle', 500) + `</g>`;
  return s;
}
// 2: Earth is about 15 trillion times heavier
function sceneHeavier(t) {
  const k = ease(ramp(t, WS(2, 4) - .3, WS(2, 6)));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 420, y: 800, r: 280 * (.2 + .8 * k), a: 1, sunI: 1, lights: .2, rot: 2 + t * .04, tilt: .41 }; F.light = [-600, 300]; F.moon = null;
  F.ov = `<circle cx="90" cy="800" r="4" fill="#f4c76b"/>` + EN('all of us', 90, 840, 20, '#fff') + `<path d="M90,830 L90,812" stroke="#fff" stroke-width="2"/>` + `<g opacity="${ease(ramp(t, WS(2, 7), WS(2, 9)))}">` + EN('× 15,000,000,000,000', 420, 1170, 34, '#f4c76b') + `</g>`;
  return s;
}
// 3: when we push off, Earth moves the other way – by less than an atom's width
function scenePush(t) {
  const k = ease(ramp(t, WS(3, 2) - .2, WS(3, 5))), m = ease(ramp(t, WS(3, 10) - .3, WS(3, 16)));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 1020, r: 420, a: 1, sunI: 1, lights: .2, rot: 2.6 + t * .03, tilt: .3 }; F.light = [-600, 200]; F.moon = null;
  let o = `<g opacity="${k}">${wArrow(360, 580, 360, 470)}${EN('we jump up', 440, 530, 22, '#f4c76b', 'start')}${wArrow(360, 1150, 360, 1172, '#fff', 3)}${EN('Earth moves down', 440, 1170, 22, '#fff', 'start')}</g>`;
  // magnifier with an atom
  const ax = 520, ay = 820;
  o += `<g opacity="${m}"><circle cx="${ax}" cy="${ay}" r="120" fill="#0b1020" stroke="#fff" stroke-width="5"/><circle cx="${ax}" cy="${ay}" r="9" fill="#e8734a"/>` +
    [0, 60, 120].map(a => `<ellipse cx="${ax}" cy="${ay}" rx="90" ry="30" fill="none" stroke="#7ab4ff" stroke-width="2" transform="rotate(${a + t * 20},${ax},${ay})"/>`).join('') +
    `<circle cx="${ax + 90 * Math.cos(t * 3)}" cy="${ay + 30 * Math.sin(t * 3)}" r="6" fill="#7ab4ff" transform="rotate(${t * 20},${ax},${ay})"/>` + EN('one atom', ax, ay + 150, 22, '#fff') + `</g>`;
  F.ov = o; return s;
}
// 4: we land, Earth moves back, nobody feels a thing
function sceneLand(t) { const s = crowdStreet(t, WS(4, 3) - .75, 'j4'); F.ov = ''; return s; }
// 5: a seismometer near a crowd picks up a tiny wiggle
function sceneSeismo(t) {
  const st = S0(5) - .2, tb = WS(5, 8);
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + wPanel(40, 520, 640, 520, 'SEISMOMETER');
  let d = ''; for (let x = 0; x <= 560; x += 4) { const tt = t - (560 - x) / 160, blip = Math.exp(-(((tt - tb) / .18) ** 2)) * 26; d += `${x ? 'L' : 'M'}${80 + x},${800 + Math.sin(tt * 40) * 1.6 + Math.sin(tt * 17) * 1.2 - blip * Math.sin(tt * 30)}`; }
  s += `<rect x="80" y="620" width="560" height="360" fill="#f4f0e6"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="80" y="${620 + i * 45}" width="560" height="1" fill="#c8bca6"/>`).join('') + `<path d="${d}" stroke="#c62828" stroke-width="2.5" fill="none"/><circle cx="640" cy="800" r="6" fill="#333"/>`;
  F.ov = ''; return s;
}
// 6: every time zone – clocks around the real Earth
function clock(x, y, h, lbl) {
  const ah = (h % 12) / 12 * Math.PI * 2;
  return `<circle cx="${x}" cy="${y}" r="56" fill="#f4f4f0" stroke="#333" stroke-width="5"/>` + Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<rect x="${x - 1.5}" y="${y - 50}" width="3" height="8" fill="#333" transform="rotate(${a * 57.3},${x},${y})"/>`; }).join('') +
    `<path d="M${x},${y} L${x + Math.sin(ah) * 30},${y - Math.cos(ah) * 30}" stroke="#111" stroke-width="5" stroke-linecap="round"/><path d="M${x},${y} L${x},${y - 44}" stroke="#c62828" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5" fill="#111"/>` + EN(lbl, x, y + 86, 22, '#fff');
}
function sceneZones(t) {
  const k = ease(ramp(t, WS(6, 7) - .2, WS(6, 10)));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 790, r: 210, a: 1, sunI: 1, lights: .8, rot: 1 + t * .25, tilt: .41 }; F.light = [-500, 790]; F.moon = null;
  F.ov = `<g opacity="${k}">` + clock(130, 560, 3, '3 AM') + clock(590, 560, 9, '9 AM') + clock(130, 1060, 15, '3 PM') + clock(590, 1060, 21, '9 PM') + `</g>`;
  return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(7, 0), WS(7, 4)); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWeigh }, { s: S0(2) - .2, f: sceneHeavier }, { s: S0(3) - .2, f: scenePush }, { s: S0(4) - .2, f: sceneLand },
  { s: S0(5) - .2, f: sceneSeismo }, { s: S0(6) - .2, f: sceneZones }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Push off', S0(3)], ['Earth moves', WS(3, 4)], ['We land', S0(4)], ['Tiny tremor', S0(5)]];
const LIST_ON = new Set([sceneLand]);
const CHIPS = [
  ['c1', 'All of us: ~400 million t', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'Earth: 15 trillion × heavier', 360, 330, 'big', WS(2, 7), S0(3) - .3],
  ['c3', 'Less than an atom\'s width', 360, 330, 'big', WS(3, 10), S0(4) - .3],
  ['c4', 'Nobody feels a thing', 360, 330, 'dark', WS(4, 8), S0(5) - .3],
  ['c5', 'A tiny tremor', 360, 330, 'big', WS(5, 8), S0(6) - .3],
  ['c6', 'Every time zone', 360, 330, 'red', WS(6, 8), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 4), 999],
];
setupUI('THE BIG JUMP', TLI, CHIPS);
