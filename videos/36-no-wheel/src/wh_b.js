// ===================== "what if the wheel was never invented?" (Short #36) =====================
const glB = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * (o.sp ?? .03), Ld = sunFor((o.az ?? .25) + t * .02, o.off ?? -.6, o.up ?? .5), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]);
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; F.earth = null; F.moon = null; F.sun = null;
  return { cam, spin, cN, c0 }; };
const WHDEF = `<linearGradient id="woodW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8875a"/><stop offset=".5" stop-color="#946640"/><stop offset="1" stop-color="#6e4a2c"/></linearGradient>` +
  `<radialGradient id="metG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#eef2f6"/><stop offset=".6" stop-color="#9aa4b0"/><stop offset="1" stop-color="#4a525c"/></radialGradient>` +
  `<linearGradient id="bladeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a646e"/><stop offset=".5" stop-color="#c8d0d8"/><stop offset="1" stop-color="#6a747e"/></linearGradient>` +
  `<linearGradient id="bronzeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5020"/><stop offset=".5" stop-color="#e0b060"/><stop offset="1" stop-color="#8a5a24"/></linearGradient>` +
  `<linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset=".6" stop-color="#9cbcd8"/><stop offset="1" stop-color="#e8d8b8"/></linearGradient>` +
  `<linearGradient id="dirtG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878"/><stop offset="1" stop-color="#8a6a44"/></linearGradient>` +
  `<radialGradient id="spotG" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#fff2d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff2d0" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="clayG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#e0a878"/><stop offset=".7" stop-color="#b0704a"/><stop offset="1" stop-color="#7a4a2e"/></radialGradient>`;
const DEFW = () => `${DEFN()}${WHDEF}`;
const recol = (svg, a, b) => svg.split(a).join(b);

// a solid wooden wheel of three planks with battens and a hub (the oldest kind)
function woodWheel(cx, cy, R, rot, a = 1, id = 'ww') {
  if (a <= 0) return '';
  let s = `<defs><clipPath id="${id}"><circle cx="0" cy="0" r="${R}"/></clipPath></defs><g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot.toFixed(1)})" opacity="${a.toFixed(2)}">`;
  s += `<circle r="${R}" fill="url(#woodW)"/><g clip-path="url(#${id})">` + Array.from({ length: 16 }, (_, i) => `<path d="M${(-R + i * R / 8 + 3).toFixed(1)},${-R} C${(-R + i * R / 8 + 8).toFixed(1)},${(-R * .3).toFixed(1)} ${(-R + i * R / 8 - 4).toFixed(1)},${(R * .3).toFixed(1)} ${(-R + i * R / 8 + 2).toFixed(1)},${R}" stroke="#5a3a20" stroke-width="1.2" fill="none" opacity=".45"/>`).join('') +
    `<path d="M${-R / 3},${-R} V${R} M${R / 3},${-R} V${R}" stroke="#3a2412" stroke-width="${(R * .03).toFixed(1)}"/><path d="M${-R / 3 + 3},${-R} V${R} M${R / 3 + 3},${-R} V${R}" stroke="#d8a878" stroke-width="1.5" opacity=".4"/>` +
    [-.5, .5].map(k => `<rect x="${-R}" y="${(k * R - R * .07).toFixed(1)}" width="${2 * R}" height="${(R * .14).toFixed(1)}" fill="#5a3a22"/><rect x="${-R}" y="${(k * R - R * .07).toFixed(1)}" width="${2 * R}" height="${(R * .03).toFixed(1)}" fill="#fff" opacity=".15"/>` + [-.6, 0, .6].map(q => `<circle cx="${(q * R).toFixed(1)}" cy="${(k * R).toFixed(1)}" r="${(R * .03).toFixed(1)}" fill="#2a1a0c"/>`).join('')).join('') + `</g>` +
    `<circle r="${R}" fill="none" stroke="#3a2412" stroke-width="${(R * .06).toFixed(1)}"/><circle r="${R * .96}" fill="none" stroke="#c89868" stroke-width="1.5" opacity=".35"/>` +
    `<circle r="${R * .2}" fill="#6a4426"/><circle r="${R * .2}" fill="none" stroke="#2a1a0c" stroke-width="3"/><circle r="${R * .08}" fill="#1a0e06"/><circle cx="${-R * .05}" cy="${-R * .06}" r="${R * .05}" fill="#fff" opacity=".12"/></g>`;
  return s;
}
// a bladed wheel seen from the front (jet fan or turbine runner), spinning
function bladeWheel(cx, cy, R, rot, n, fill, hub = '#eef2f6') {
  let s = `<g transform="translate(${cx},${cy})"><circle r="${R + 10}" fill="#2a3038"/><circle r="${R + 10}" fill="none" stroke="url(#metG)" stroke-width="12"/><circle r="${R}" fill="#14181e"/><g transform="rotate(${rot.toFixed(1)})">`;
  for (let i = 0; i < n; i++) { const a = i / n * 360; s += `<path d="M${(R * .2).toFixed(1)},-6 C${(R * .5).toFixed(1)},-18 ${(R * .8).toFixed(1)},-24 ${(R * .99).toFixed(1)},-14 L${(R * .99).toFixed(1)},6 C${(R * .8).toFixed(1)},2 ${(R * .5).toFixed(1)},4 ${(R * .2).toFixed(1)},8Z" fill="${fill}" stroke="#2a3038" stroke-width="1" transform="rotate(${a.toFixed(1)})"/>`; }
  s += `</g><circle r="${R * .22}" fill="url(#metG)"/><circle cx="${(-R * .06).toFixed(1)}" cy="${(-R * .07).toFixed(1)}" r="${(R * .06).toFixed(1)}" fill="#fff" opacity=".5"/><circle r="${R * .04}" fill="#2a3038"/></g>`;
  return s;
}
function gear(cx, cy, R, teeth, rot, col) {
  let d = ''; for (let i = 0; i < teeth * 4; i++) { const a = (i / (teeth * 4)) * 2 * Math.PI + rot, r = (i % 4 < 2) ? R : R * .84; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1); }
  return `<path d="${d}Z" fill="${col}" stroke="#2a1a08" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${R * .55}" fill="none" stroke="#2a1a08" stroke-width="2" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="${R * .16}" fill="#3a2a12"/>` + [0, 1, 2, 3].map(k => { const a = rot + k * Math.PI / 2; return `<path d="M${(cx + Math.cos(a) * R * .18).toFixed(1)},${(cy + Math.sin(a) * R * .18).toFixed(1)} L${(cx + Math.cos(a) * R * .52).toFixed(1)},${(cy + Math.sin(a) * R * .52).toFixed(1)}" stroke="#2a1a08" stroke-width="${(R * .1).toFixed(1)}" opacity=".35"/>`; }).join('');
}
const dust = (x, y, k, seed, n = 18, spread = 110) => { if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = puff(x, y, 30 + k * 80, (1 - k) * .8); for (let i = 0; i < n; i++) { const a = r() * 6.28, d = k * spread * (.4 + r()); s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d * .6 - k * 30).toFixed(1)}" r="${(2 + r() * 3).toFixed(1)}" fill="#e8d8b8" opacity="${((1 - k) * .9).toFixed(2)}"/>`; } return s; };

// 0: the Earth, and the first wheel crumbles to dust
function sceneHook(t) {
  glB(t, { d: 8.4, az: .1, spin: 3.7, sp: .05, lights: .5, el: .3 });
  const k = ramp(t, WS(0, 5) - .1, WS(0, 5) + 1.1), a = 1 - ease(clamp(k * 1.6));
  F.ov = `<defs>${WHDEF}</defs>` + woodWheel(360, 1010, 150, -t * 70, a, 'wh0') + `<defs>${SDEF}</defs>` + dust(360, 1010, k, 3, 40, 260);
  return space(t);
}

// 1: 5,500 years ago: an ox pulls a cart on solid wheels; then the wheels vanish and the cart drops
function oxCart(x, y, t, wa, drop, ph) {
  const ox = recol(quad(x + 190, y, 1.15, { kind: 'cow', face: 1, moving: drop < .5 ? 1 : 0, phase: ph }), '#e8e2d6', '#8a5a3a').split('#f4f0ea').join('#c89a72');
  const cy = y - 70 + drop * 52, rot = drop * 6;
  let c = `<g transform="rotate(${rot.toFixed(1)},${x - 60},${cy})"><path d="M${x + 40},${cy - 10} L${x + 200},${y - 104}" stroke="#5a3a20" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M${x - 150},${cy - 30} L${x + 60},${cy - 30} L${x + 52},${cy + 8} L${x - 142},${cy + 8}Z" fill="#8a5a34"/><path d="M${x - 150},${cy - 30} L${x + 60},${cy - 30} L${x + 58},${cy - 22} L${x - 148},${cy - 22}Z" fill="#c89868" opacity=".6"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x - 140 + i * 36},${cy - 30} V${cy + 8}" stroke="#4a2e18" stroke-width="2" opacity=".6"/>`).join('') +
    `<path d="M${x - 146},${cy - 30} L${x - 140},${cy - 80} M${x + 56},${cy - 30} L${x + 50},${cy - 80} M${x - 143},${cy - 80} L${x + 53},${cy - 80}" stroke="#6a4426" stroke-width="7"/>` +
    // sacks of grain in the cart
    [[-110, 0], [-60, 1], [-10, 2]].map(([dx, i]) => `<ellipse cx="${x + dx}" cy="${cy - 48}" rx="30" ry="22" fill="${['#d8c49a', '#cbb58a', '#e0cca4'][i]}"/><path d="M${x + dx - 10},${cy - 68} q10,-8 20,0" stroke="#8a7450" stroke-width="3" fill="none"/>`).join('') + `</g>`;
  return ox + c + woodWheel(x - 50, y - 46 + drop * 6, 46, ph * 30, wa, 'wh1');
}
function plain(t, o = {}) {
  let s = `<defs>${DEFW()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyW)"/>` +
    `<circle cx="560" cy="330" r="120" fill="#fff4d0" opacity=".22" filter="url(#soft)"/><circle cx="560" cy="330" r="50" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="560" cy="330" r="24" fill="#fffef6"/>` + cumulus(200 + t * 4, 470, 220, 51, { a: .85 }) +
    mountainsR(820, 120, o.seed || 81, { rock: o.rock || '#a08a70', snowAt: o.snow ?? 0 }) + `<rect x="-20" y="800" width="760" height="40" fill="#e8d8b8" opacity=".5" filter="url(#soft)"/>` +
    meadow(830, 1300, t, { c0: o.g0 || '#b8a868', c1: o.g1 || '#7a6a3a' }) +
    `<path d="M-20,1010 C200,990 500,1000 740,1010 L740,1140 C500,1130 200,1140 -20,1150Z" fill="url(#dirtG)"/><path d="M-20,1010 C200,990 500,1000 740,1010 L740,1140 C500,1130 200,1140 -20,1150Z" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    Array.from({ length: 12 }, (_, i) => { const r = RS(i + 9); return `<ellipse cx="${(r() * 740).toFixed(0)}" cy="${(1020 + r() * 110).toFixed(0)}" rx="${(4 + r() * 6).toFixed(1)}" ry="3" fill="#6a5034" opacity=".5"/>`; }).join('');
  return s;
}
function scenePast(t) {
  const T = t - S0(1) + .2, gone = ramp(t, WS(1, 11) - .2, WS(1, 14) + .4), wa = 1 - ease(clamp(gone * 1.5)), drop = ease(ramp(t, WS(1, 12), WS(1, 14) + .2));
  const x = 170 + Math.min(T, WS(1, 12) - S0(1) + .2) * 26, ph = Math.min(T, WS(1, 12) - S0(1) + .2) * 3;
  let s = plain(t) + oxCart(x, 1110, t, wa, drop, ph) + dust(x - 50, 1064, gone, 7, 26, 120);
  // the driver walking beside, stick in hand
  s += hero(x + 355, 1150, Object.assign({ s: .62, face: 1, shade: 1, walk: drop < .5 ? ph * 1.6 : null, amp: .45 }, { top: '#c8b48a', pants: '#8a7454', skin: '#b07a55', hair: '#2a1e18' }));
  noEarth(); F.ov = ''; return s;
}

// 2: no cars, no bikes, no trains: they all vanish from the street
function bike(x, y, s, col) {
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="-40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/><circle cx="40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/>` +
    `<path d="M-40,-24 L-10,-24 L20,-58 L-20,-58 Z M-10,-24 L-22,-64 M20,-58 L40,-24 M18,-58 L22,-72" stroke="${col}" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M-30,-66 h18" stroke="#1a1a1e" stroke-width="6" stroke-linecap="round"/><path d="M14,-72 h16" stroke="#1a1a1e" stroke-width="4" stroke-linecap="round"/><circle cx="-10" cy="-24" r="5" fill="#3a3a40"/></g>`;
}
function tramCar(x, y, len) {
  return `<rect x="${x}" y="${y - 70}" width="${len}" height="62" rx="12" fill="#e8e4dc"/><rect x="${x}" y="${y - 30}" width="${len}" height="10" fill="#c83a2a"/><rect x="${x}" y="${y - 70}" width="${len}" height="8" rx="4" fill="#fff" opacity=".5"/>` +
    Array.from({ length: Math.floor(len / 34) }, (_, i) => `<rect x="${x + 10 + i * 34}" y="${y - 60}" width="24" height="24" rx="3" fill="#3a5a7a"/><path d="M${x + 12 + i * 34},${y - 40} L${x + 26 + i * 34},${y - 60}" stroke="#fff" stroke-width="3" opacity=".25"/>`).join('') +
    `<rect x="${x}" y="${y - 8}" width="${len}" height="6" fill="#3a3a40"/>`;
}
function sceneCars(t) {
  const T = t - S0(2) + .2, vc = ramp(t, WS(2, 1), WS(2, 1) + 1), vb = ramp(t, WS(2, 3), WS(2, 3) + 1), vt = ramp(t, WS(2, 5), WS(2, 5) + 1.1);
  const ac = 1 - ease(clamp(vc * 1.6)), ab = 1 - ease(clamp(vb * 1.6)), at = 1 - ease(clamp(vt * 1.6));
  const trX = 420 - T * 110;
  let top = '';
  let fg = '';
  const p1x = 160 + T * 22; fg += hero(p1x, PV + 74, Object.assign({ s: .62, face: 1, shade: 1, walk: T * 4.4 }, YOU));
  fg += hero(610 - T * 18, PV + 84, Object.assign({ s: .6, face: -1, shade: 1, walk: T * 4.2 + 1 }, pal(1)));
  // a parked bike at the kerb
  if (ab > 0) fg += `<g opacity="${ab.toFixed(2)}">${bike(470, KB - 4, .9, '#2a7a5a')}</g>`; fg += dust(470, KB - 40, vb, 13);
  // cars moving in their lanes
  const xa = pmod(860 - T * 140, 1300) - 200, xb = pmod(-120 + T * 120, 1300) - 200, xc = 560;
  fg += `<path d="M-20,1184 H740 M-20,1170 H740" stroke="#8a8e94" stroke-width="3" opacity=".7"/>`;
  if (at > 0) fg += `<g opacity="${at.toFixed(2)}">${tramCar(trX, 1184, 200)}${tramCar(trX + 206, 1184, 200)}<path d="M${trX + 100},1114 l-30,-40 h60 M${trX + 306},1114 l-30,-40 h60" stroke="#3a3a40" stroke-width="3" fill="none"/></g>`;
  fg += dust(Math.max(60, Math.min(660, trX + 200)), 1130, vt, 11, 30, 200);
  if (ac > 0) fg += `<g opacity="${ac.toFixed(2)}">${car(xb, 1262, .9, '#2a5a8a', 1, 0)}${car(xc - T * 40, 1262, .9, '#b8322a', 1, 0)}</g>`;
  fg += dust(xb, 1226, vc, 17) + dust(xc - T * 40 + 40, 1226, vc, 19);
  let s = street3(t, { N: 0, id: 'c', fg, cars: 0 }) + top;
  noEarth(); F.ov = ''; return s;
}

// 3: planes won't fly: the heart of a jet engine is bladed wheels that turn
function sceneJet(t) {
  const T = t - S0(3) + .2, ins = ease(ramp(t, WS(3, 4) - .2, WS(3, 4) + .4)), no = ease(ramp(t, WS(3, 2) - .1, WS(3, 3) + .3));
  let s = `<defs>${DEFW()}<linearGradient id="skyJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f62a8"/><stop offset=".6" stop-color="#7fa9d6"/><stop offset="1" stop-color="#d9d6c8"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyJ)"/>` +
    `<circle cx="140" cy="250" r="120" fill="#fff6d8" opacity=".22" filter="url(#soft)"/><circle cx="140" cy="250" r="46" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="140" cy="250" r="22" fill="#fffef6"/>`;
  s += cumulus(pmod(160 - T * 30, 1000) - 150, 980, 360, 61, { a: .95 }) + cumulus(pmod(620 - T * 24, 1000) - 150, 1060, 300, 63, { a: .9 }) + cumulus(pmod(400 - T * 20, 1000) - 150, 1180, 380, 65, { a: .95 });
  const px = 360, py = 560 + Math.sin(T * .9) * 6;
  s += `<g transform="translate(${px},${py}) scale(1.15) rotate(-2)" opacity="${(1 - .35 * no).toFixed(2)}">${airliner()}</g>`;
  // the engine under the wing, circled, then the cutaway fan
  if (ins > 0) { const ex = px + 12, ey = py + 50;
    s += `<circle cx="${ex}" cy="${ey}" r="34" fill="none" stroke="#f4c76b" stroke-width="5" opacity="${ins.toFixed(2)}"/><path d="M${ex},${ey + 34} L${360},${790}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="10 8" opacity="${ins.toFixed(2)}"/>` +
      `<g opacity="${ins.toFixed(2)}">${bladeWheel(360, 960, 150 * (.6 + .4 * ins), t * 900, 22, 'url(#bladeG)')}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 4: about 90% of the world's electricity comes from giant turning wheels: turbines
function windT(x, base, h, rot, s = 1) {
  let o = `<path d="M${x - 6 * s},${base} L${x - 3 * s},${base - h} L${x + 3 * s},${base - h} L${x + 6 * s},${base}Z" fill="#e8ecf0"/><path d="M${x + 1 * s},${base} L${x + 2 * s},${base - h} L${x + 3 * s},${base - h} L${x + 6 * s},${base}Z" fill="#000" opacity=".15"/><rect x="${x - 10 * s}" y="${base - h - 8 * s}" width="${22 * s}" height="12" rx="4" fill="#e0e4e8"/>`;
  for (let k = 0; k < 3; k++) { const a = rot + k * 2.094; o += `<path d="M${x},${base - h} L${(x + Math.cos(a) * h * .55 - Math.sin(a) * 4).toFixed(1)},${(base - h + Math.sin(a) * h * .55 + Math.cos(a) * 4).toFixed(1)} L${(x + Math.cos(a) * h * .55).toFixed(1)},${(base - h + Math.sin(a) * h * .55).toFixed(1)}Z" fill="#f4f6f8" stroke="#b0b8c0" stroke-width="1.5"/>`; }
  return o + `<circle cx="${x}" cy="${base - h}" r="${5 * s}" fill="#c8ccd0"/>`;
}
function scenePower(t) {
  const T = t - S0(4), pa = ease(ramp(t, WS(4, 2) - .1, WS(4, 3) + .4)), lab = ease(ramp(t, WS(4, 13) - .2, WS(4, 13) + .3));
  let s = `<defs>${DEFW()}<radialGradient id="pwB" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#1e2a50"/><stop offset="1" stop-color="#070b1a"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#pwB)"/>`;
  // a dam with a turbine inside, a wind farm, and a steam plant (stacks) – all feeding the city by wires
  s += `<path d="M-20,1000 L740,1000 L740,1300 L-20,1300Z" fill="#1a2030"/>`;
  s += windT(90, 1000, 230, t * 1.6) + windT(190, 1000, 180, t * 1.6 + 1, .8);
  s += `<rect x="560" y="860" width="44" height="140" fill="#8a8e94"/><rect x="620" y="890" width="40" height="110" fill="#7a7e84"/><rect x="470" y="930" width="220" height="70" fill="#6a6e74"/>` +
    Array.from({ length: 5 }, (_, i) => { const p = pmod(t * .3 + i / 5, 1); return `<circle cx="${(582 + p * 30).toFixed(1)}" cy="${(850 - p * 160).toFixed(1)}" r="${(16 + p * 40).toFixed(1)}" fill="#e8ecf0" opacity="${(.35 * (1 - p)).toFixed(2)}" filter="url(#blur5)"/>`; }).join('');
  // the big turbine wheel in the middle, spinning, with sparks of electricity running to the city
  s += bladeWheel(360, 700, 210, t * 260, 16, 'url(#bronzeG)', '#e0b060');
  const wires = ['M360,920 C360,980 300,1040 250,1100', 'M360,920 C380,1000 470,1050 520,1100', 'M90,1000 C140,1050 200,1080 250,1100', 'M600,1000 C600,1050 560,1080 520,1100'];
  wires.forEach((d, i) => { s += `<path d="${d}" stroke="#3a4060" stroke-width="4" fill="none"/><path d="${d}" stroke="#ffe08a" stroke-width="4" fill="none" stroke-dasharray="6 30" stroke-dashoffset="${(-t * 120 - i * 9).toFixed(1)}"/>`; });
  // the lit city
  const r = RS(5); let city = ''; for (let i = 0; i < 9; i++) { const bx = 130 + i * 52, bh = 70 + r() * 90; city += `<rect x="${bx}" y="${1180 - bh}" width="46" height="${bh.toFixed(0)}" fill="#202842"/>` + Array.from({ length: Math.floor(bh / 18) * 3 }, (_, q) => r() > .45 ? `<rect x="${bx + 6 + (q % 3) * 13}" y="${(1180 - bh + 8 + Math.floor(q / 3) * 18).toFixed(0)}" width="8" height="10" fill="#ffd27e"/>` : '').join(''); }
  s += city + `<rect x="-20" y="1180" width="760" height="120" fill="#10141e"/>`;
  s += `<g opacity="${pa.toFixed(2)}">` + panel(80, 1192, 560, 76) + pie3(140, 1230, 30, pa * .9, '#f4c76b') + lbl(420, 1243, '٩٠٪ تقريباً من كهرباءِ العالم', 1, '#f4c76b', 28) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function pie3(cx, cy, R, k, col) { // k = fraction of a full turn (0..1)
  k = clamp(k); const a1 = -Math.PI / 2 + k * 2 * Math.PI, x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a3048"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>` + (k > .01 ? `<path d="M${cx},${cy} L${cx},${cy - R} A${R},${R} 0 ${k > .5 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)}Z" fill="${col}"/>` : '');
}

// 5: dark cities, stopped factories, no geared clocks
function sceneDarkCity(t) {
  const off = ease(ramp(t, WS(5, 2) - .1, WS(5, 3) + .3)), fl = off > 0 && off < 1 && Math.floor(t * 20) % 3 === 0 ? .3 : 0, gs = ramp(t, WS(5, 6) - .2, WS(5, 8) + .2);
  let s = street3(t, { N: .98, id: 'n', cars: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#02040c" opacity="${(Math.min(.82, off * .78 + fl)).toFixed(2)}"/>`;
  // the clock face with gears showing, which stops
  const ga = ease(ramp(t, WS(5, 6) - .3, WS(5, 6) + .1)), sp = (1 - ease(gs)) * 1.6, rot = t * sp + (gs > 0 ? 0 : 0);
  if (ga > 0) { const cx = 360, cy = 760;
    s += `<g opacity="${ga.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="190" fill="#000" opacity=".5" filter="url(#blur9)"/><circle cx="${cx}" cy="${cy}" r="180" fill="#1a1612"/><circle cx="${cx}" cy="${cy}" r="180" fill="none" stroke="url(#bronzeG)" stroke-width="12"/>` +
      gear(cx - 50, cy - 20, 82, 14, rot, '#c89a48') + gear(cx + 72, cy + 40, 56, 10, -rot * 1.4 + .2, '#b08038') + gear(cx + 30, cy - 110, 40, 8, -rot * 2.05, '#d8aa58') + gear(cx - 40, cy + 110, 46, 9, -rot * 1.78, '#a87830') +
      `<circle cx="${cx}" cy="${cy}" r="180" fill="#fff" opacity="${(.06 * gs).toFixed(2)}"/></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 6: goods carried on animals' backs, or dragged on wooden sledges – very slowly
function sceneGoods(t) {
  const T = t - S0(6) + .2, ph = T * 2.4;
  let s = plain(t, { seed: 83 });
  // a donkey with packs
  const dx = 380 + T * 14;
  s += recol(quad(dx, 1060, .85, { kind: 'horse', face: 1, moving: 1, phase: ph }), '#c0a06a', '#8e8678').split('#e6d4ae').join('#c8c0b4') +
    `<rect x="${dx - 70}" y="${1060 - 132}" width="56" height="40" rx="10" fill="#a8743a"/><rect x="${dx - 10}" y="${1060 - 130}" width="50" height="38" rx="10" fill="#8a5a2a"/><path d="M${dx - 66},${1060 - 118} h102" stroke="#5a3a1a" stroke-width="3"/>`;
  s += hero(dx + 160, 1072, Object.assign({ s: .6, face: 1, shade: 1, walk: ph * 1.1, amp: .4, hB: [dx + 120, 1072 - 120] }, { top: '#6a7a4a', pants: '#3a3428', skin: '#b07a55', hair: '#2a1e18' }));
  // two people dragging a stone block on a sledge, leaning hard
  const sx = 150 + T * 9, sy = 1150;
  s += `<path d="M${sx - 120},${sy} L${sx + 70},${sy} q16,0 22,-14" stroke="#6a4426" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="${sx - 110}" y="${sy - 22}" width="170" height="16" fill="#8a5a34"/>` +
    `<rect x="${sx - 100}" y="${sy - 112}" width="150" height="92" fill="#a8a094"/><rect x="${sx - 100}" y="${sy - 112}" width="150" height="92" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M${sx - 100},${sy - 112} l10,-10 h150 l-10,10Z" fill="#c8c0b4"/><path d="M${sx + 50},${sy - 112} l10,-10 v92 l-10,10Z" fill="#7a746a"/>` +
    puff(sx - 110, sy - 4, 18 + Math.sin(t * 4) * 4, .5);
  const rope = [sx + 90, sy - 14];
  [[sx + 170, 0], [sx + 240, 1.4]].forEach(([hx, pp]) => { s += `<path d="M${rope[0]},${rope[1]} L${hx + 14},${sy - 100}" stroke="#c8a878" stroke-width="3"/>` + hero(hx, sy + 4, Object.assign({ s: .64, face: 1, shade: 1, walk: ph * .8 + pp, amp: .5, lean: 22, hF: [hx + 4, sy - 92], hB: [hx - 6, sy - 96] }, pp ? pal(3) : pal(0))); });
  noEarth(); F.ov = ''; return s;
}

// 7: the strange part: ancient peoples in the Americas made toys with wheels – but never used wheels to carry anything
function clayDog(cx, cy, s) {
  return `<g transform="translate(${cx},${cy}) scale(${s})"><ellipse cx="0" cy="56" rx="110" ry="10" fill="#000" opacity=".35" filter="url(#blur5)"/>` +
    `<path d="M-30,32 L-30,46 M50,32 L50,46" stroke="#5a3a24" stroke-width="5"/>` +
    `<path d="M-80,-10 C-84,-40 -40,-50 10,-46 C50,-44 72,-36 78,-12 C82,12 60,28 10,30 C-40,32 -76,22 -80,-10Z" fill="url(#clayG)"/>` +
    `<path d="M60,-26 C70,-60 100,-70 116,-56 C128,-44 124,-20 104,-12 C92,-6 74,-10 66,-16Z" fill="url(#clayG)"/><path d="M98,-64 L106,-86 L112,-60Z M80,-60 L82,-82 L92,-62Z" fill="#a8683e"/><circle cx="104" cy="-42" r="4" fill="#2a1a10"/><path d="M118,-28 q6,4 4,10" stroke="#5a3424" stroke-width="2" fill="none"/>` +
    `<path d="M-78,-14 C-100,-26 -108,-40 -100,-50" stroke="#b0704a" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    `<path d="M-40,-40 q20,-6 40,0 M-20,-20 q16,-4 30,2" stroke="#7a4a2e" stroke-width="2.5" fill="none" opacity=".6"/><path d="M-60,-30 C-40,-46 20,-48 50,-36" stroke="#fff" stroke-width="4" fill="none" opacity=".18"/>` +
    [[-50, 40], [-10, 40], [30, 40], [70, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="url(#clayG)" stroke="#5a3424" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="4" fill="#3a2414"/>`).join('') + `</g>`;
}
function sceneToy(t) {
  const T = t - S0(7) + .2, no = ease(ramp(t, WS(7, 9) - .2, WS(7, 13) + .3));
  let s = `<defs>${DEFW()}<linearGradient id="musW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1410"/><stop offset="1" stop-color="#3a2c22"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#musW)"/>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M200,-20 L520,-20 L680,1100 L40,1100Z" fill="url(#spotG)"/>`;
  // pedestal and glass case, the toy rolling a little
  s += `<rect x="170" y="960" width="380" height="340" fill="#3a3430"/><rect x="170" y="960" width="380" height="16" fill="#5a524a"/><rect x="170" y="976" width="380" height="20" fill="#000" opacity=".3"/>` +
    `<rect x="160" y="560" width="400" height="400" fill="#bfe0ff" opacity=".07"/><rect x="160" y="560" width="400" height="400" fill="none" stroke="#dfefff" stroke-width="3" opacity=".35"/><path d="M190,580 L260,580 L190,700Z" fill="#fff" opacity=".1"/>`;
  s += clayDog(360 + Math.sin(T * 1.2) * 8, 880, 1.5);
  s += `<rect x="250" y="1030" width="220" height="50" rx="6" fill="#d8ccb0"/>` + lbl(360, 1064, 'لعبةٌ قديمة بعجلات', 1, '#2a1e12', 22).replace('stroke="#000"', 'stroke="#d8ccb0"');
  // a cart on wheels that never was: drawn faint, crossed out
  if (no > 0) s += `<g opacity="${no.toFixed(2)}"><g opacity=".55">${woodWheel(300, 480, 46, 0, 1, 'wt1')}${woodWheel(420, 480, 46, 0, 1, 'wt2')}<rect x="260" y="410" width="200" height="40" fill="#8a5a34"/></g><path d="M240,380 L480,530 M480,380 L240,530" stroke="#e0483a" stroke-width="10" stroke-linecap="round"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// 8: and they built mountain roads tens of thousands of kilometres long – walked only by people and animals
function sceneRoad(t) {
  const T = t - S0(8) + .2, ph = T * 2.6, dr = ease(ramp(t, WS(8, 1) - .2, WS(8, 6) + .3));
  let s = `<defs>${DEFW()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyW)"/>` + cumulus(500 + t * 3, 420, 240, 71, { a: .8 }) +
    mountainsR(780, 320, 91, { rock: '#8a8478', snowAt: .55 }) + `<rect x="-20" y="790" width="760" height="200" fill="#7a7468"/><rect x="-20" y="770" width="760" height="90" fill="#d8dcd8" opacity=".45" filter="url(#soft)"/>` + mountainsR(880, 120, 97, { rock: '#8a8270' }) + `<rect x="-20" y="860" width="760" height="60" fill="#d8dcd8" opacity=".3" filter="url(#soft)"/>` + mountainsR(920, 110, 95, { rock: '#6a7a44' }) + `<rect x="-20" y="940" width="760" height="360" fill="#5e6e3a"/>` + meadow(960, 1300, t, { c0: '#8a9a5a', c1: '#4e5e30' });
  // the stone road zig-zagging up the slope (drawn on)
  const road = 'M760,1250 C520,1220 300,1180 120,1120 C60,1100 80,1070 160,1060 C320,1040 460,1010 560,970 C620,948 600,925 520,920 C400,912 300,900 240,880';
  s += `<path d="${road}" stroke="#7a6a58" stroke-width="40" fill="none" stroke-linecap="round" stroke-dasharray="2400" stroke-dashoffset="${(2400 * (1 - dr)).toFixed(0)}"/><path d="${road}" stroke="#a89a84" stroke-width="30" fill="none" stroke-linecap="round" stroke-dasharray="2400" stroke-dashoffset="${(2400 * (1 - dr)).toFixed(0)}"/>` +
    `<path d="${road}" stroke="#6a5a48" stroke-width="2" fill="none" stroke-dasharray="6 10" stroke-dashoffset="0" opacity="${(.6 * dr).toFixed(2)}"/>`;
  // terraces on the slope
  for (let i = 0; i < 5; i++) s += `<path d="M${380 + i * 20},${1000 + i * 26} C${470 + i * 20},${990 + i * 26} ${580 + i * 20},${996 + i * 26} ${680},${1010 + i * 24}" stroke="#5a6a34" stroke-width="5" fill="none" opacity=".6"/>`;
  // a llama caravan and a runner on the road
  [[0, 0], [1, 110], [2, 220]].forEach(([i, dx]) => { const x = 620 - dx - T * 14, y = 1225 - dx * .1; s += recol(quad(x, y, .55, { kind: 'horse', face: -1, moving: 1, phase: ph + i }), '#c0a06a', ['#efe6d6', '#a8784a', '#e0d4c0'][i]) + `<rect x="${x - 22}" y="${y - 86}" width="40" height="22" rx="6" fill="${['#c83a3a', '#2a7a8a', '#d8a030'][i]}"/>`; });
  s += hero(260 - T * 4, 1118, Object.assign({ s: .5, face: -1, shade: 1, walk: ph * 1.6, amp: .7, lean: 8 }, { top: '#b83a2a', pants: '#3a2a20', skin: '#a06a46', hair: '#1a1410' }));
  noEarth(); F.ov = ''; return s;
}

function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(9)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(9)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 11) - .3, WS(9, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePast }, { s: S0(2) - .2, f: sceneCars }, { s: S0(3) - .2, f: sceneJet }, { s: S0(4) - .2, f: scenePower }, { s: S0(5) - .2, f: sceneDarkCity }, { s: S0(6) - .2, f: sceneGoods }, { s: S0(7) - .2, f: sceneToy }, { s: S0(8) - .2, f: sceneRoad }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, scenePower, sceneJet, sceneToy]);
const XF = .5;
const TLI = [['السيّارات', S0(2)], ['الطائرات', S0(3)], ['الكهرباء', S0(4)], ['النقل', S0(6)]];
const LIST_ON = new Set([sceneCars, sceneDarkCity]);
const CHIPS = [
  ['c1', 'قبلَ ٥٥٠٠ سنة: أوّلُ عجلة', 360, 330, 'big', WS(1, 2), WS(1, 10) - .2], ['c1b', 'لم توجدْ قطّ', 360, 330, 'red big', WS(1, 11), S0(2) - .3],
  ['c2', 'أكثرُ من مليارِ مركبة', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'لا طيران', 360, 330, 'red big', WS(3, 2), WS(3, 4) - .1], ['c3b', 'المحرّكُ النفّاث: عجلاتٌ بشفرات', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'التوربينات', 360, 330, 'big', WS(4, 13), S0(5) - .3],
  ['c5', 'مدنٌ مظلمة', 360, 330, 'red big', WS(5, 2), WS(5, 6) - .2], ['c5b', 'لا ساعاتٍ بتروس', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c6', 'على ظهورِ الحيوانات', 360, 330, 'big', WS(6, 2), WS(6, 5) - .1], ['c6b', 'أو على زلّاجاتٍ خشبيّة', 360, 330, 'big', WS(6, 5), WS(6, 10) - .1], ['c6c', 'ببطءٍ شديد', 360, 330, 'red big', WS(6, 10), S0(7) - .3],
  ['c7', 'ألعابٌ بعجلات', 360, 330, 'big', WS(7, 6), WS(7, 9) - .2], ['c7b', 'لكن لا عرباتٍ أبداً', 360, 330, 'red big', WS(7, 9), S0(8) - .3],
  ['c8', 'عشراتُ آلافِ الكيلومترات', 360, 330, 'big', WS(8, 3), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 11), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا عجلة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
