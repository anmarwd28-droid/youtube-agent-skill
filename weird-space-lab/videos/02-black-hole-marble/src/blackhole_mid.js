// ===================== Weird Space Lab: What if a marble-sized black hole appeared in your room? =====================
const BX = 360, BY = 820;
function room(t, o = {}) {
  let s = `<defs><linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdb99a"/><stop offset="1" stop-color="#b39c7c"/></linearGradient>` +
    `<linearGradient id="winG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1430"/><stop offset="1" stop-color="#3a3a6a"/></linearGradient></defs>`;
  s += `<rect width="720" height="1010" fill="url(#wallG)"/><rect width="720" height="1010" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 64}" y="0" width="2" height="1010" fill="#fff" opacity=".06"/>`;
  s += `<rect y="985" width="720" height="25" fill="#8a6e50"/>`;
  // window with a night city
  s += `<rect x="410" y="420" width="250" height="330" fill="url(#winG)"/>`;
  const r = RS(3); for (let i = 0; i < 9; i++) { const x = 410 + i * 28, h = 60 + r() * 150; s += `<rect x="${x}" y="${750 - h}" width="26" height="${h}" fill="#141a30"/>` + Array.from({ length: Math.floor(h / 18) }, (_, q) => r() > .5 ? `<rect x="${x + 6 + (q % 2) * 8}" y="${750 - h + 8 + q * 18}" width="5" height="6" fill="#ffcf87" opacity=".8"/>` : '').join(''); }
  s += `<rect x="404" y="414" width="262" height="342" fill="none" stroke="#f4f0e6" stroke-width="12"/><rect x="532" y="414" width="6" height="342" fill="#f4f0e6"/><rect x="404" y="580" width="262" height="6" fill="#f4f0e6"/><rect x="396" y="752" width="278" height="14" fill="#e8e2d4"/>`;
  // picture frame and shelf
  s += `<rect x="90" y="470" width="170" height="120" fill="#5a4030"/><rect x="100" y="480" width="150" height="100" fill="#7ab4e0"/><path d="M100,580 L150,520 L190,560 L215,535 L250,580Z" fill="#3a6a3a"/><circle cx="215" cy="505" r="12" fill="#fff6d0"/>`;
  // floor
  s += `<rect y="1010" width="720" height="270" fill="#8a6440"/>` + Array.from({ length: 6 }, (_, q) => `<rect y="${1010 + q * 46}" width="720" height="2" fill="#5a3e24" opacity=".6"/>`).join('') + Array.from({ length: 14 }, (_, q) => `<rect x="${(q * 131) % 720}" y="${1010 + (q % 6) * 46}" width="2" height="46" fill="#5a3e24" opacity=".5"/>`).join('') + `<rect y="1010" width="720" height="270" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += `<ellipse cx="300" cy="1120" rx="250" ry="60" fill="#8a3a3a" opacity=".85"/><ellipse cx="300" cy="1120" rx="220" ry="48" fill="none" stroke="#e8c48a" stroke-width="3" opacity=".6"/>`;
  // sofa
  s += `<rect x="40" y="860" width="300" height="70" rx="20" fill="#3a5a7a"/><rect x="30" y="900" width="320" height="90" rx="18" fill="#2f4e6c"/><rect x="20" y="880" width="44" height="110" rx="16" fill="#3a5a7a"/><rect x="316" y="880" width="44" height="110" rx="16" fill="#3a5a7a"/><rect x="60" y="990" width="12" height="22" fill="#2a2a2a"/><rect x="310" y="990" width="12" height="22" fill="#2a2a2a"/><rect x="90" y="870" width="70" height="44" rx="10" fill="#f4c76b" opacity=".85"/>`;
  // lamp
  s += `<rect x="640" y="830" width="6" height="200" fill="#333"/><path d="M606,780 L680,780 L664,840 L622,840Z" fill="#f4e6c8"/><circle cx="643" cy="880" r="90" fill="#fff6d0" opacity=".12" filter="url(#soft)"/><rect x="620" y="1026" width="46" height="8" rx="4" fill="#333"/>`;
  // coffee table with a mug and a book
  s += `<rect x="250" y="1050" width="220" height="16" rx="5" fill="#6a4a30"/><rect x="266" y="1066" width="10" height="44" fill="#4a3220"/><rect x="444" y="1066" width="10" height="44" fill="#4a3220"/><rect x="300" y="1022" width="26" height="28" rx="4" fill="#e8e4d8"/><rect x="380" y="1040" width="60" height="10" fill="#c0392b"/>`;
  if (o.person !== false) s += castSh(560, 1170, .6) + onWalk(560, 1170, CROWD[2], .6, -1, t, { lookUp: o.look || 0 });
  return s;
}
function bhole(x, y, r, t, a = 1) {
  if (a <= .01) return '';
  return `<g opacity="${a}"><circle cx="${x}" cy="${y}" r="${r * 4}" fill="#000" opacity=".35" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r * 1.55}" fill="none" stroke="#ffd59a" stroke-width="${Math.max(1.5, r * .35)}" opacity=".9"/>` +
    `<circle cx="${x}" cy="${y}" r="${r * 1.55}" fill="none" stroke="#fff" stroke-width="${Math.max(.8, r * .12)}" opacity=".9"/><ellipse cx="${x}" cy="${y}" rx="${r * 2.6}" ry="${r * .5}" fill="none" stroke="#ffb35c" stroke-width="${Math.max(1, r * .25)}" opacity=".75" transform="rotate(${-12 + Math.sin(t) * 2},${x},${y})"/><circle cx="${x}" cy="${y}" r="${r}" fill="#000"/></g>`;
}
// 0: an ordinary living room; on "appeared" a tiny black hole pops into the middle
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 10) - .1, WS(0, 10) + .3));
  let s = room(t, { look: k * .3 }) + bhole(BX, BY, 9 * k + .01, t, k);
  F.ov = k > 0 ? `<circle cx="${BX}" cy="${BY}" r="${30 + 50 * k}" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${.9 * (1 - ramp(t, WS(0, 13), S0(1)))}"/>` : '';
  F.flash = 0; return s;
}
// 1: the marble-sized black hole has the mass of the whole Earth
function sceneMass(t) {
  const k = ease(ramp(t, S0(1), S0(1) + .6)), e = ease(ramp(t, WS(1, 5) - .2, WS(1, 9) + .2));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 510, y: 760, r: 150 * (.3 + .7 * e) + .01, a: e, sunI: 1, lights: .2, rot: 3 + t * .05, tilt: .41 }; F.light = [-600, 300]; F.moon = null;
  F.ov = bhole(190, 760, 26 * k, t, k) + EN('≈ 1.8 cm', 190, 880, 26, '#fff') + EN('(shown much bigger)', 190, 910, 17, 'rgba(255,255,255,.55)', 'middle', 500) +
    `<g opacity="${e}">` + EN('=', 340, 785, 80, '#f4c76b') + EN('6,000,000,000,000,000,000,000 t', 510, 960, 19, '#fff', 'middle', 700) + `</g>`;
  return s;
}
// 2: back in the room – gravity arrows pointing in from everywhere
function scenePull(t) {
  const k = ease(ramp(t, WS(2, 3) - .2, WS(2, 7)));
  let s = room(t, { look: .3 }) + bhole(BX, BY, 9, t) + `<rect width="720" height="1280" fill="#000" opacity="${.25 * k}"/>`;
  let a = ''; for (let i = 0; i < 16; i++) { const an = i / 16 * Math.PI * 2 + .2, r1 = 330 - ((t * 140 + i * 37) % 200), r2 = r1 - 60;
    a += `<path d="M${BX + Math.cos(an) * r1},${BY + Math.sin(an) * r1} L${BX + Math.cos(an) * r2},${BY + Math.sin(an) * r2}" stroke="#f4c76b" stroke-width="4" marker-end="url(#arrY)" opacity="${k * .9}"/>`; }
  F.ov = a + `<g opacity="${k}"><path d="M${BX},${BY} L${BX + 200},${BY}" stroke="#fff" stroke-width="2" stroke-dasharray="6 6"/>` + EN('1 m', BX + 100, BY - 14, 22, '#fff') + `</g>`;
  F.flash = 0; return s;
}
// 3: the whole room spirals into the black hole
function sceneFall(t) {
  const p = ease(ramp(t, WS(3, 0) - .2, WS(3, 13) + .2)), sc = Math.max(.001, 1 - p), rot = p * p * 220;
  let s = `<rect width="720" height="1280" fill="#000"/>` + stars(.5, t);
  s += `<g transform="translate(${BX},${BY}) rotate(${rot}) scale(${sc}) translate(${-BX},${-BY})" opacity="${1 - p * .3}">${room(t, { look: .4 })}</g>`;
  // stretched streaks of matter falling in
  let st = ''; const r = RS(15); for (let i = 0; i < 60; i++) { const an = r() * Math.PI * 2 + t * (1 + r()), d = (1 - ((t * (.8 + r()) + r()) % 1)) * 520 * (.4 + p);
    st += `<path d="M${BX + Math.cos(an) * d},${BY + Math.sin(an) * d} L${BX + Math.cos(an + .15) * d * .7},${BY + Math.sin(an + .15) * d * .7}" stroke="${['#ffd59a', '#fff', '#c8a07a'][i % 3]}" stroke-width="${1 + r() * 2}" opacity="${.6 * p}" stroke-linecap="round"/>`; }
  F.ov = st + bhole(BX, BY, 10 + p * 6, t); F.flash = 0; return s;
}
// 4: the infalling matter heats up and flashes brighter than the Sun
function sceneFlash(t) {
  const k = ease(ramp(t, WS(4, 6), WS(4, 11))), fl = ramp(t, WS(4, 10) - .05, WS(4, 10) + .1) * (1 - ramp(t, WS(4, 10) + .1, WS(4, 13) + .3));
  let s = `<rect width="720" height="1280" fill="#000"/>` + stars(.6 * (1 - k), t);
  s += `<defs><radialGradient id="hotG"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#cfe2ff"/><stop offset=".55" stop-color="#ffb35c" stop-opacity=".6"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient></defs>`;
  s += `<circle cx="${BX}" cy="${BY}" r="${60 + 380 * k}" fill="url(#hotG)" opacity="${.4 + .6 * k}"/>`;
  for (let i = 0; i < 3; i++) s += `<ellipse cx="${BX}" cy="${BY}" rx="${90 + i * 50 + k * 60}" ry="${18 + i * 9}" fill="none" stroke="${['#fff', '#ffd59a', '#ff8a3a'][i]}" stroke-width="${6 - i}" opacity=".8" transform="rotate(-12,${BX},${BY})"/>`;
  F.ov = bhole(BX, BY, 12, t); F.flash = .85 * fl; return s;
}
// 5: the black hole and Earth pull each other equally – the planet starts to fall in
function sceneEarthPull(t) {
  const k = ease(ramp(t, WS(5, 4) - .2, WS(5, 15))), f = ease(ramp(t, WS(5, 18), L(5).end + .4));
  let s = space(t, '#02040c', '#060a1e');
  const ex = 360, ey = 820, er = 270, ang = -2.2, bx = ex + Math.cos(ang) * (er + 6), by = ey + Math.sin(ang) * (er + 6);
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .2, rot: 3.6 + t * .03, tilt: .41 }; F.light = [-700, 100]; F.moon = null;
  let deb = ''; if (f > 0) { const r = RS(21); for (let i = 0; i < 70; i++) { const a0 = ang + (r() - .5) * 1.4, d0 = er * (.75 + .25 * r()), q = (t * (.4 + r() * .6) + r()) % 1, px = lerp(ex + Math.cos(a0) * d0, bx, q * q), py = lerp(ey + Math.sin(a0) * d0, by, q * q);
    deb += `<circle cx="${px}" cy="${py}" r="${1.5 + r() * 3}" fill="${['#8a6a4a', '#5a8ac0', '#c8b08a', '#ffd59a'][i % 4]}" opacity="${f * (.4 + .6 * q)}"/>`; } }
  F.ov = deb + bhole(bx, by, 11, t) + `<circle cx="${bx}" cy="${by}" r="${26}" fill="#ffd59a" opacity="${.35 * f}" filter="url(#soft)"/>` +
    `<g opacity="${k}">${wArrow(bx + 16, by + 20, bx + 120, by + 150)}${wArrow(ex - 30, ey - 40, ex - 120, ey - 160, '#fff')}</g>`;
  F.flash = 0; return s;
}
// 6: Earth torn apart into a glowing disk around the black hole
function sceneDisk(t) {
  const k = ease(ramp(t, S0(6) - .2, WS(6, 7))), d = ease(ramp(t, WS(6, 6), WS(6, 14) + .3)), cx = 360, cy = 760;
  let s = space(t, '#02040c', '#060a1e');
  F.earth = { x: cx + 40, y: cy + 60, r: 240 * (1 - k * .55), a: 1 - k, sunI: 1, lights: .2, rot: 3.6 + t * .03, tilt: .41 }; F.light = [-700, 100]; F.moon = null;
  s += `<defs><radialGradient id="diskG"><stop offset=".18" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#ffffff"/><stop offset=".45" stop-color="#ffcf87"/><stop offset=".75" stop-color="#e0662a" stop-opacity=".8"/><stop offset="1" stop-color="#8a2a1a" stop-opacity="0"/></radialGradient></defs>`;
  let disk = `<ellipse cx="${cx}" cy="${cy}" rx="${300 * d}" ry="${80 * d}" fill="url(#diskG)" transform="rotate(-10,${cx},${cy})"/>`;
  const r = RS(33); for (let i = 0; i < 80; i++) { const a = r() * Math.PI * 2 + t * (2.4 - r()), rr = (80 + r() * 220) * d; disk += `<circle cx="${cx + Math.cos(a) * rr}" cy="${cy + Math.sin(a) * rr * .27}" r="${1 + r() * 3}" fill="${['#fff', '#ffd59a', '#ff8a3a', '#8a6a4a'][i % 4]}" opacity="${.8 * d}" transform="rotate(-10,${cx},${cy})"/>`; }
  F.ov = disk + `<circle cx="${cx}" cy="${cy}" r="${48 * d + 8}" fill="#000"/><circle cx="${cx}" cy="${cy}" r="${52 * d + 9}" fill="none" stroke="#fff6dc" stroke-width="3" opacity="${d}"/>` +
    `<path d="M${cx - 300 * d},${cy + 10} Q${cx},${cy - 120 * d} ${cx + 300 * d},${cy - 40}" stroke="#ffcf87" stroke-width="${10 * d}" fill="none" opacity="${.5 * d}" filter="url(#blur2)"/>`;
  F.flash = 0; return s;
}
// 7a: the size of it – smaller than a coin
function sceneCoin(t) {
  const k = ease(ramp(t, S0(7) - .1, WS(7, 6) + .2));
  let s = `<rect width="720" height="1280" fill="#0a0d1c"/>` + stars(.5, t);
  F.ov = `<g opacity="${k}"><circle cx="230" cy="760" r="122" fill="#c8a24a"/><circle cx="230" cy="760" r="122" fill="none" stroke="#8a6a20" stroke-width="8"/><circle cx="230" cy="760" r="100" fill="none" stroke="#e8c870" stroke-width="3"/>` + EN('COIN', 230, 770, 30, '#6a4a10') + EN('≈ 2.4 cm', 230, 930, 24, '#fff') + `</g>` +
    bhole(500, 760, 44 * k + .01, t, k) + `<g opacity="${k}">` + EN('≈ 1.8 cm', 500, 930, 24, '#fff') + `</g>`;
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = bhole(360, 820, 30, t) + endCard(t, WS(7, 7), WS(7, 15), false); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMass }, { s: S0(2) - .2, f: scenePull }, { s: S0(3) - .2, f: sceneFall }, { s: S0(4) - .2, f: sceneFlash },
  { s: S0(5) - .2, f: sceneEarthPull }, { s: S0(6) - .2, f: sceneDisk }, { s: S0(7) - .2, f: sceneCoin }, { s: WS(7, 7) - .3, f: sceneEnd },
];
const XF = .5;
const TLI = [['Earth\'s mass', S0(1)], ['40 trillion g', S0(2)], ['Room falls in', S0(3)], ['Flash', S0(4)], ['Earth falls in', S0(5)]];
const LIST_ON = new Set([scenePull, sceneEarthPull]);
const CHIPS = [
  ['c1', 'Mass of the whole Earth', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', '40 trillion × gravity', 360, 330, 'red', WS(2, 7), S0(3) - .3],
  ['c3', 'Faster than a blink', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', 'Brighter than the Sun', 360, 330, 'big', WS(4, 10), S0(5) - .3],
  ['c5', 'Same pull, both ways', 360, 330, 'dark', WS(5, 5), WS(5, 17) - .2],
  ['c6', 'Earth falls in', 360, 330, 'red', WS(5, 18), S0(6) - .3],
  ['c7', 'A glowing disk', 360, 330, 'big', WS(6, 13), S0(7) - .3],
  ['c8', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 15), 999],
];
setupUI('WHAT HAPPENS', TLI, CHIPS);
