// ===================== Weird Space Lab: What if a marble-sized black hole appeared in your room? =====================
// Real-world scale for the room: the wall is 2.7 m high (floor line y = 1000, ceiling y = 300), so about 259 px per metre.
const BX = 410, BY = 640, PXM = 259;
const _lensPre = new Image(); _lensPre.src = 'lens.png';
// gravitational lensing: every pixel around the hole samples the room from closer to the hole (see lens.png, built by lens_map.py)
const lensDef = (x, y, s = 1) => `<filter id="lensF" filterUnits="userSpaceOnUse" x="0" y="0" width="720" height="1280" color-interpolation-filters="sRGB">` +
  `<feFlood flood-color="rgb(128,128,128)" result="n"/><feImage href="lens.png" x="${x - 256 * s}" y="${y - 256 * s}" width="${512 * s}" height="${512 * s}" preserveAspectRatio="none" result="m0"/>` +
  `<feComposite in="m0" in2="n" operator="over" result="m"/><feDisplacementMap in="SourceGraphic" in2="m" scale="${240 * s}" xChannelSelector="R" yChannelSelector="G"/></filter>`;
function room(t, o = {}) {
  const FL = 1000, CE = 300, M = PXM;
  let s = `<defs><linearGradient id="wallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6c6aa"/><stop offset="1" stop-color="#bfa98a"/></linearGradient>` +
    `<linearGradient id="winG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1430"/><stop offset="1" stop-color="#2e3466"/></linearGradient>` +
    `<linearGradient id="flG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5636"/><stop offset="1" stop-color="#9a7048"/></linearGradient>` +
    `<radialGradient id="lampL" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff2d0" stop-opacity="0"/></radialGradient></defs>`;
  // ceiling, wall, skirting
  s += `<rect width="720" height="${CE}" fill="#e8e0d0"/><rect y="${CE - 10}" width="720" height="10" fill="#d0c4ac"/><rect y="${CE}" width="720" height="${FL - CE}" fill="url(#wallG)"/><rect y="${CE}" width="720" height="${FL - CE}" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  s += `<rect y="${FL - 18}" width="720" height="18" fill="#efe8da"/><rect y="${FL - 2}" width="720" height="2" fill="#8a7a62"/>`;
  // window 1.0 m wide, sill at 0.9 m, top at 2.2 m, with a night city outside
  const wx = 440, ww = 1.0 * M, wt = FL - 2.2 * M, wb = FL - .9 * M;
  s += `<rect x="${wx}" y="${wt}" width="${ww}" height="${wb - wt}" fill="url(#winG)"/>`;
  const r = RS(3); for (let i = 0; i < 8; i++) { const x = wx + i * 33, h = 60 + r() * 170; s += `<rect x="${x}" y="${wb - h}" width="31" height="${h}" fill="#141a30"/>` + Array.from({ length: Math.floor(h / 16) }, (_, q) => r() > .45 ? `<rect x="${x + 5 + (q % 3) * 8}" y="${wb - h + 6 + q * 16}" width="4" height="5" fill="#ffcf87" opacity=".85"/>` : '').join(''); }
  s += `<rect x="${wx - 8}" y="${wt - 8}" width="${ww + 16}" height="${wb - wt + 16}" fill="none" stroke="#f4f0e6" stroke-width="10"/><rect x="${wx + ww / 2 - 3}" y="${wt}" width="6" height="${wb - wt}" fill="#f4f0e6"/><rect x="${wx - 16}" y="${wb + 4}" width="${ww + 32}" height="12" fill="#e8e2d4"/>`;
  s += `<path d="M${wx - 40},${wt - 30} L${wx - 10},${wt - 30} L${wx - 4},${FL - 30} L${wx - 46},${FL - 30}Z" fill="#8a3a3a" opacity=".9"/><path d="M${wx + ww + 10},${wt - 30} L${wx + ww + 40},${wt - 30} L${wx + ww + 46},${FL - 30} L${wx + ww + 4},${FL - 30}Z" fill="#8a3a3a" opacity=".9"/><rect x="${wx - 60}" y="${wt - 36}" width="${ww + 120}" height="6" fill="#5a4a3a"/>`;
  // a framed picture 0.7 x 0.5 m above the sofa, and a wall socket
  s += `<rect x="90" y="${FL - 1.95 * M}" width="${.7 * M}" height="${.5 * M}" fill="#5a4030"/><rect x="98" y="${FL - 1.95 * M + 8}" width="${.7 * M - 16}" height="${.5 * M - 16}" fill="#7ab4e0"/><path d="M98,${FL - 1.45 * M - 8} L150,${FL - 1.7 * M} L190,${FL - 1.56 * M} L222,${FL - 1.66 * M} L${90 + .7 * M - 8},${FL - 1.45 * M - 8}Z" fill="#3a6a3a"/>`;
  s += `<rect x="40" y="${FL - .3 * M}" width="18" height="26" rx="3" fill="#f4f0e6" stroke="#bbb"/>`;
  // floor with perspective boards
  s += `<rect y="${FL}" width="720" height="${1280 - FL}" fill="url(#flG)"/>` + Array.from({ length: 16 }, (_, q) => `<path d="M${360 + (q - 8) * 46},${FL} L${360 + (q - 8) * 120},1280" stroke="#5a3e24" stroke-width="2" opacity=".45"/>`).join('') + `<rect y="${FL}" width="720" height="${1280 - FL}" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<ellipse cx="300" cy="1150" rx="300" ry="80" fill="#7a3434" opacity=".9"/><ellipse cx="300" cy="1150" rx="270" ry="66" fill="none" stroke="#e8c48a" stroke-width="3" opacity=".55"/>`;
  // lamp light
  s += `<circle cx="640" cy="${FL - 1.55 * M}" r="300" fill="url(#lampL)"/>`;
  // sofa: 1.6 m wide, seat 0.45 m, back 0.85 m
  const sx0 = 14, sw = 1.6 * M;
  s += `<rect x="${sx0}" y="${FL - .85 * M}" width="${sw}" height="${.5 * M}" rx="22" fill="#3a5a7a"/><rect x="${sx0 - 6}" y="${FL - .48 * M}" width="${sw + 12}" height="${.42 * M}" rx="18" fill="#2f4e6c"/><rect x="${sx0 + 20}" y="${FL - .5 * M}" width="${sw / 2 - 26}" height="26" rx="10" fill="#3e6080"/><rect x="${sx0 + sw / 2 + 6}" y="${FL - .5 * M}" width="${sw / 2 - 26}" height="26" rx="10" fill="#3e6080"/>` +
    `<rect x="${sx0 - 16}" y="${FL - .62 * M}" width="40" height="${.58 * M}" rx="14" fill="#36587a"/><rect x="${sx0 + sw - 24}" y="${FL - .62 * M}" width="40" height="${.58 * M}" rx="14" fill="#36587a"/><rect x="${sx0 + 10}" y="${FL - 8}" width="10" height="22" fill="#2a2a2a"/><rect x="${sx0 + sw - 20}" y="${FL - 8}" width="10" height="22" fill="#2a2a2a"/>` +
    `<rect x="${sx0 + 40}" y="${FL - .78 * M}" width="${.35 * M}" height="${.3 * M}" rx="12" fill="#f4c76b" opacity=".9" transform="rotate(-8,${sx0 + 80},${FL - .65 * M})"/>`;
  // floor lamp 1.6 m
  s += `<rect x="636" y="${FL + 30 - 1.45 * M}" width="7" height="${1.45 * M}" fill="#333"/><path d="M${600},${FL + 30 - 1.6 * M} L${680},${FL + 30 - 1.6 * M} L${664},${FL + 30 - 1.4 * M} L${616},${FL + 30 - 1.4 * M}Z" fill="#f4e6c8"/><ellipse cx="640" cy="${FL + 32}" rx="30" ry="7" fill="#333"/>`;
  // coffee table in front: 1.0 m x 0.42 m high (slightly nearer, so a little bigger), with a mug and a book
  const ty = 1185, tw = 1.0 * M * 1.08, th = .42 * M * 1.08, tx = 300 - tw / 2;
  s += `<rect x="${tx}" y="${ty - th}" width="${tw}" height="16" rx="5" fill="#6a4a30"/><rect x="${tx + 14}" y="${ty - th + 16}" width="10" height="${th - 16}" fill="#4a3220"/><rect x="${tx + tw - 24}" y="${ty - th + 16}" width="10" height="${th - 16}" fill="#4a3220"/>` +
    `<rect x="${tx + 40}" y="${ty - th - 30}" width="24" height="30" rx="4" fill="#e8e4d8"/><rect x="${tx + 150}" y="${ty - th - 10}" width="70" height="10" fill="#c0392b"/><rect x="${tx + 154}" y="${ty - th - 18}" width="62" height="8" fill="#2a5a9a"/>`;
  // a person 1.75 m tall standing a little in front of the wall (scale from the measured figure height of 323 units)
  if (o.person !== false) { const ps = 1.75 * M * 1.04 / 323; s += castSh(560, 1205, ps * .55) + onWalk(560, 1205, CROWD[2], ps, -1, t, { lookUp: o.look || 0 }); }
  return s;
}
// the black hole seen in the room: a pure black shadow with a faint photon ring (no glowing disk – nothing is falling in yet)
function holeInRoom(x, y, r, a = 1) {
  if (a <= .01) return '';
  return `<g opacity="${a}"><circle cx="${x}" cy="${y}" r="${r * 1.12}" fill="none" stroke="#fff6e0" stroke-width="${Math.max(.6, r * .08)}" opacity=".55"/><circle cx="${x}" cy="${y}" r="${r}" fill="#000"/></g>`;
}
// a realistic black hole with an accretion disk, seen almost edge-on (like the simulations): the far side of the disk is lensed into arcs above and below
function holeDisk(x, y, R, t, a = 1, tilt = -8) {
  if (a <= .01) return '';
  const id = 'hd' + Math.round(R);
  let s = `<defs><linearGradient id="${id}d" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#ffe2a8"/><stop offset=".7" stop-color="#f08a3a"/><stop offset="1" stop-color="#7a2a10"/></linearGradient>` +
    `<radialGradient id="${id}g"><stop offset=".3" stop-color="#ffcf87" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient></defs>`;
  s += `<g opacity="${a}" transform="rotate(${tilt},${x},${y})"><circle cx="${x}" cy="${y}" r="${R * 4}" fill="url(#${id}g)"/>`;
  // lensed far side of the disk: an arch over the top and a thinner one under the bottom
  s += `<path d="M${x - R * 1.9},${y} A${R * 1.9},${R * 1.6} 0 0 1 ${x + R * 1.9},${y}" stroke="url(#${id}d)" stroke-width="${R * .42}" fill="none" opacity=".9" filter="url(#blur2)"/>`;
  s += `<path d="M${x - R * 1.35},${y} A${R * 1.35},${R * 1.2} 0 0 0 ${x + R * 1.35},${y}" stroke="url(#${id}d)" stroke-width="${R * .16}" fill="none" opacity=".75"/>`;
  // photon ring and the shadow
  s += `<circle cx="${x}" cy="${y}" r="${R * 1.06}" fill="none" stroke="#fff4dc" stroke-width="${Math.max(1, R * .05)}"/><circle cx="${x}" cy="${y}" r="${R}" fill="#000"/>`;
  // near side of the disk crossing in front, brighter on the side moving toward us
  s += `<ellipse cx="${x}" cy="${y}" rx="${R * 3.4}" ry="${R * .34}" fill="none" stroke="url(#${id}d)" stroke-width="${R * .5}" opacity=".95"/>`;
  s += `<path d="M${x - R * 3.4},${y} A${R * 3.4},${R * .34} 0 0 0 ${x + R * 3.4},${y}" stroke="url(#${id}d)" stroke-width="${R * .55}" fill="none"/>`;
  // streaks orbiting in the disk
  const r = RS(id.length + Math.round(R)); for (let i = 0; i < 26; i++) { const ph = r() * Math.PI * 2 + t * (1.5 + r()), rr = R * (1.6 + r() * 1.8), px = x + Math.cos(ph) * rr, py = y + Math.sin(ph) * rr * .1;
    if (Math.sin(ph) > 0 || Math.abs(Math.cos(ph)) * rr > R * 1.05) s += `<ellipse cx="${px}" cy="${py}" rx="${R * .18}" ry="${R * .03}" fill="#fff6e0" opacity=".6"/>`; }
  return s + `</g>`;
}
// 0: an ordinary living room; on "appeared" a black dot appears and bends the room behind it
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 10) - .1, WS(0, 10) + .5));
  const s = `<defs>${lensDef(BX, BY, k)}</defs><g filter="url(#lensF)">${room(t, { look: k * .25 })}</g>` + holeInRoom(BX, BY, 12 * k, k);
  F.ov = k > 0 ? `<circle cx="${BX}" cy="${BY}" r="${90}" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 8" opacity="${.8 * ramp(t, WS(0, 10) + .3, WS(0, 12)) * (1 - ramp(t, WS(0, 13), S0(1)))}"/>` : '';
  F.flash = 0; return s;
}
// 1: the marble-sized black hole has the mass of the whole Earth
function sceneMass(t) {
  const k = ease(ramp(t, S0(1), S0(1) + .6)), e = ease(ramp(t, WS(1, 5) - .2, WS(1, 9) + .2));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 510, y: 760, r: 150 * (.3 + .7 * e) + .01, a: e, sunI: 1, lights: .2, rot: 3 + t * .05, tilt: .41 }; F.light = [-600, 300]; F.moon = null;
  F.ov = holeDisk(180, 760, 26 * k + .01, t, k * .0001) + `<circle cx="180" cy="760" r="${60 * k}" fill="#000" opacity="${k}"/><circle cx="180" cy="760" r="${64 * k}" fill="none" stroke="#fff6e0" stroke-width="3" opacity="${.7 * k}"/>` +
    EN('≈ 1.8 cm', 180, 880, 26, '#fff') + EN('(drawn much bigger)', 180, 910, 17, 'rgba(255,255,255,.55)', 'middle', 500) +
    `<g opacity="${e}">` + EN('=', 330, 785, 80, '#f4c76b') + EN('6,000,000,000,000,000,000,000 t', 510, 960, 19, '#fff', 'middle', 700) + `</g>`;
  return s;
}
// 2: back in the room – arrows show the pull toward the hole from every direction
function scenePull(t) {
  const k = ease(ramp(t, WS(2, 3) - .2, WS(2, 7)));
  let s = `<defs>${lensDef(BX, BY)}</defs><g filter="url(#lensF)">${room(t, { look: .25 })}</g>` + holeInRoom(BX, BY, 12) + `<rect width="720" height="1280" fill="#000" opacity="${.3 * k}"/>`;
  let a = ''; for (let i = 0; i < 16; i++) { const an = i / 16 * Math.PI * 2 + .2, r1 = 330 - ((t * 140 + i * 37) % 200), r2 = r1 - 60;
    a += `<path d="M${BX + Math.cos(an) * r1},${BY + Math.sin(an) * r1} L${BX + Math.cos(an) * r2},${BY + Math.sin(an) * r2}" stroke="#f4c76b" stroke-width="4" marker-end="url(#arrY)" opacity="${k * .9}"/>`; }
  F.ov = a + `<g opacity="${k}"><path d="M${BX},${BY} L${BX + PXM},${BY}" stroke="#fff" stroke-width="2" stroke-dasharray="6 6"/>` + EN('1 m', BX + PXM / 2, BY - 14, 22, '#fff') + `</g>`;
  F.flash = 0; return s;
}
// 3: everything is pulled in – the room is stretched toward the hole and swallowed
function sceneFall(t) {
  const p = ease(ramp(t, WS(3, 0) - .2, WS(3, 13) + .2)), sc = Math.max(.001, 1 - p), rot = p * p * 70;
  let s = `<rect width="720" height="1280" fill="#000"/>` + stars(.4, t);
  s += `<defs>${lensDef(BX, BY, 1 + p * 1.5)}</defs><g filter="url(#lensF)"><g transform="translate(${BX},${BY}) rotate(${rot}) scale(${sc}) translate(${-BX},${-BY})" opacity="${1 - p * .3}">${room(t, { look: .4 })}</g></g>`;
  let st = ''; const r = RS(15); for (let i = 0; i < 70; i++) { const an = r() * Math.PI * 2 + t * (.3 + r() * .3), d = (1 - ((t * (.8 + r()) + r()) % 1)) * 520 * (.4 + p);
    st += `<path d="M${BX + Math.cos(an) * d},${BY + Math.sin(an) * d} L${BX + Math.cos(an) * d * .72},${BY + Math.sin(an) * d * .72}" stroke="${['#ffd59a', '#fff', '#c8a07a'][i % 3]}" stroke-width="${1 + r() * 2}" opacity="${.55 * p}" stroke-linecap="round"/>`; }
  F.ov = st + holeDisk(BX, BY, 22, t, p) ; F.flash = 0; return s;
}
// 4: the infalling matter heats up and flashes brighter than the Sun
function sceneFlash(t) {
  const k = ease(ramp(t, WS(4, 6), WS(4, 11))), fl = ramp(t, WS(4, 10) - .05, WS(4, 10) + .1) * (1 - ramp(t, WS(4, 10) + .1, WS(4, 13) + .3));
  let s = `<rect width="720" height="1280" fill="#000"/>` + stars(.6 * (1 - k), t);
  s += `<defs><radialGradient id="hotG"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#cfe2ff"/><stop offset=".55" stop-color="#ffb35c" stop-opacity=".5"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient></defs>`;
  s += `<circle cx="${BX}" cy="${BY}" r="${80 + 360 * k}" fill="url(#hotG)" opacity="${.35 + .55 * k}"/>`;
  F.ov = holeDisk(BX, BY, 30 + 10 * k, t, 1); F.flash = .85 * fl; return s;
}
// 5: the black hole and Earth pull each other equally – the planet starts to fall in
function sceneEarthPull(t) {
  const k = ease(ramp(t, WS(5, 4) - .2, WS(5, 15))), f = ease(ramp(t, WS(5, 18), L(5).end + .4));
  let s = space(t, '#02040c', '#060a1e');
  const ex = 360, ey = 820, er = 270, ang = -2.2, bx = ex + Math.cos(ang) * (er + 6), by = ey + Math.sin(ang) * (er + 6);
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .2, rot: 3.6 + t * .03, tilt: .41 }; F.light = [-700, 100]; F.moon = null;
  let deb = ''; if (f > 0) { const r = RS(21); for (let i = 0; i < 80; i++) { const a0 = ang + (r() - .5) * 1.4, d0 = er * (.75 + .25 * r()), q = (t * (.4 + r() * .6) + r()) % 1, px = lerp(ex + Math.cos(a0) * d0, bx, q * q), py = lerp(ey + Math.sin(a0) * d0, by, q * q);
    deb += `<circle cx="${px}" cy="${py}" r="${1.5 + r() * 3}" fill="${['#8a6a4a', '#5a8ac0', '#c8b08a', '#ffd59a'][i % 4]}" opacity="${f * (.4 + .6 * q)}"/>`; } }
  F.ov = deb + holeDisk(bx, by, 9, t, .4 + .6 * f, -30) + `<g opacity="${k}">${wArrow(bx + 18, by + 22, bx + 120, by + 150)}${wArrow(ex - 30, ey - 40, ex - 120, ey - 160, '#fff')}</g>`;
  F.flash = 0; return s;
}
// 6: Earth torn apart into a glowing disk around the black hole
function sceneDisk(t) {
  const k = ease(ramp(t, S0(6) - .2, WS(6, 7))), d = ease(ramp(t, WS(6, 6), WS(6, 14) + .3)), cx = 360, cy = 760;
  let s = space(t, '#02040c', '#060a1e');
  F.earth = { x: cx + 40, y: cy + 60, r: 240 * (1 - k * .55), a: 1 - k, sunI: 1, lights: .2, rot: 3.6 + t * .03, tilt: .41 }; F.light = [-700, 100]; F.moon = null;
  F.ov = holeDisk(cx, cy, 20 + 52 * d, t, .3 + .7 * d); F.flash = 0; return s;
}
// 7a: the size of it – smaller than a coin
function sceneCoin(t) {
  const k = ease(ramp(t, S0(7) - .1, WS(7, 6) + .2));
  let s = `<rect width="720" height="1280" fill="#0a0d1c"/>` + stars(.5, t);
  F.ov = `<g opacity="${k}"><circle cx="230" cy="760" r="122" fill="#c8a24a"/><circle cx="230" cy="760" r="122" fill="none" stroke="#8a6a20" stroke-width="8"/><circle cx="230" cy="760" r="100" fill="none" stroke="#e8c870" stroke-width="3"/>` + EN('COIN', 230, 770, 30, '#6a4a10') + EN('≈ 2.4 cm', 230, 930, 24, '#fff') + `</g>` +
    `<g opacity="${k}"><circle cx="500" cy="760" r="90" fill="#000"/><circle cx="500" cy="760" r="95" fill="none" stroke="#fff6e0" stroke-width="3" opacity=".7"/>` + EN('≈ 1.8 cm', 500, 930, 24, '#fff') + `</g>`;
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = holeDisk(360, 840, 46, t, 1) + endCard(t, WS(7, 7), WS(7, 15), false); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMass }, { s: S0(2) - .2, f: scenePull }, { s: S0(3) - .2, f: sceneFall }, { s: S0(4) - .2, f: sceneFlash },
  { s: S0(5) - .2, f: sceneEarthPull }, { s: S0(6) - .2, f: sceneDisk }, { s: S0(7) - .2, f: sceneCoin }, { s: WS(7, 7) - .3, f: sceneEnd },
];
const XF = .5;
const TLI = [['Earth\'s mass', S0(1)], ['40 trillion g', S0(2)], ['Room falls in', S0(3)], ['Flash', S0(4)], ['Earth falls in', S0(5)]];
const LIST_ON = new Set([sceneEarthPull]);
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
