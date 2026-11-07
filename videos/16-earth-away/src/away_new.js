
// ===================== "what if Earth drifted away from the Sun?" =====================
// 0: the real Sun and the 3D Earth; Earth slides outward along its orbit
function sceneHook(t) {
  const k = ease(ramp(t, .3, 2.6));
  let s = space(t, '#020309', '#070a1c');
  F.sun = { x: 90, y: 560, r: 80, a: 1 }; F.earth = { x: lerp(330, 580, k), y: lerp(760, 960, k), r: lerp(100, 80, k), a: 1, sunI: lerp(1.1, .7, k), lights: .3, rot: 2.4, tilt: .41 }; F.light = [90, 560];
  F.ov = `<path d="M330,760 L${lerp(330, 580, k)},${lerp(760, 960, k)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 8" opacity=".7"/><circle cx="90" cy="560" r="${300 + 80 * k}" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="2"/>`;
  return s;
}
// 1: the habitable zone: Venus too hot, Mars too cold, Earth at 150 million km where water stays liquid (not to scale)
function sceneZone(t) {
  const sx = 40, sy = 820, rV = 230, rE = 330, rM = 500, z = ramp(t, WS(1, 8), WS(1, 8) + .5), d = ramp(t, WS(1, 3), WS(1, 3) + .4);
  let s = space(t, '#020309', '#070a1c');
  F.sun = { x: sx, y: sy, r: 70, a: 1 }; const ea = -.62; F.earth = { x: sx + rE * Math.cos(ea), y: sy + rE * Math.sin(ea), r: 34, a: 1, sunI: 1.1, lights: .2, rot: 2.0 + t * .2 - t * .03, tilt: .41 }; F.light = [sx, sy];
  let ov = `<defs><radialGradient id="hzG" cx="${sx}" cy="${sy}" r="${rE + 110}" gradientUnits="userSpaceOnUse"><stop offset="${(rE - 70) / (rE + 110)}" stop-color="#4ade80" stop-opacity="0"/><stop offset="${(rE - 40) / (rE + 110)}" stop-color="#4ade80" stop-opacity=".22"/><stop offset="${(rE + 60) / (rE + 110)}" stop-color="#4ade80" stop-opacity=".22"/><stop offset="1" stop-color="#4ade80" stop-opacity="0"/></radialGradient></defs>`;
  ov += `<circle cx="${sx}" cy="${sy}" r="${rE + 110}" fill="url(#hzG)" opacity="${z}"/>`;
  [[rV, '#ff8a5a'], [rE, '#7ac8ff'], [rM, '#ff6a3a']].forEach(([r, c]) => { ov += `<circle cx="${sx}" cy="${sy}" r="${r}" fill="none" stroke="${c}" stroke-opacity=".35" stroke-width="2"/>`; });
  const pl = (r, a, rad, c) => { const x = sx + r * Math.cos(a), y = sy + r * Math.sin(a); return `<circle cx="${x}" cy="${y}" r="${rad}" fill="${c}"/><circle cx="${x + rad * .3}" cy="${y + rad * .2}" r="${rad}" fill="#000" opacity=".45"/>`; };
  ov += pl(rV, -1.45, 16, '#e8c890') + pl(rM, -.2, 12, '#c8602e');
  ov += `<g font-family="Noto Naskh Arabic" font-weight="700" font-size="24" style="paint-order:stroke" stroke="#000" stroke-width="4"><text x="${sx + rV * Math.cos(-1.45) + 26}" y="${sy + rV * Math.sin(-1.45) + 8}" fill="#ffb08a">الزهرة: حارّة جداً</text><text x="${sx + rM * Math.cos(-.2)}" y="${sy + rM * Math.sin(-.2) + 46}" text-anchor="middle" fill="#ff9a6a">المريخ: باردة جداً</text>` +
    `<text x="${sx + rE * Math.cos(ea) + 46}" y="${sy + rE * Math.sin(ea) + 8}" fill="#9ce0b0">الأرض</text><text x="360" y="1180" text-anchor="middle" fill="#9ce0b0" opacity="${z}">المنطقة الصالحة للحياة</text></g>`;
  ov += `<g opacity="${d}"><path d="M${sx + 70},${sy} L${sx + rE},${sy}" stroke="#f4c76b" stroke-width="3" marker-end="url(#arrY)"/><text x="${sx + (rE + 70) / 2}" y="${sy - 14}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="4">١٥٠ مليون كم</text></g>`;
  F.ov = ov; return s;
}
// a glass thermometer (°C)
function thermoC(x, top, bot, v) {
  const yOf = c => lerp(bot - 50, top + 30, (c + 30) / 70);
  let s = `<rect x="${x - 28}" y="${top}" width="56" height="${bot - top}" rx="28" fill="#f4f6f8" opacity=".94"/><rect x="${x - 10}" y="${top + 16}" width="20" height="${bot - top - 50}" rx="10" fill="#d8dee4"/><circle cx="${x}" cy="${bot - 32}" r="22" fill="#d32f2f"/><rect x="${x - 6}" y="${yOf(v)}" width="12" height="${bot - 32 - yOf(v)}" fill="#d32f2f"/>`;
  for (let c = -30; c <= 40; c += 10) s += `<rect x="${x + 12}" y="${yOf(c) - 1}" width="12" height="2" fill="#333"/><text x="${x + 30}" y="${yOf(c) + 6}" font-family="Space Grotesk" font-weight="700" font-size="17" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${c}°</text>`;
  return s;
}
// 2: just 10% farther: the same Baghdad street in thinner, cooler light; people in coats; the thermometer falls
function sceneDim(t) {
  const k = ease(ramp(t, WS(2, 6) - .2, WS(2, 16) + .3));
  let s = bareStreet(t, { id: 'd2', green: 1, sky: [mix('#4a86c6', '#5a6e88', k), mix('#92bce0', '#9aa8b8', k), mix('#d2e4f0', '#c8d0d8', k)] });
  s += `<rect width="720" height="1280" fill="#1a2a4a" opacity="${.22 * k}"/>`;
  s += thermoC(80, 420, 900, lerp(30, 16, k));
  s += onWalk(300, 1088, CROWD[0], .55, 1, t, { coat: k > .5 ? 1 : 0, scarf: k > .5 ? '#c0392b' : null, moving: 1, phase: t * 6 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { coat: k > .5 ? 1 : 0, scarf: k > .5 ? '#2a4a7a' : null });
  F.ov = ''; return s;
}
// 3: the year stretches to ~420 days; a wall calendar keeps flipping; winter lingers in the street
function sceneYear(t) {
  const k = ease(ramp(t, WS(3, 1), WS(3, 6) + .3)), day = Math.round(lerp(1, 421, k)), snow = ease(ramp(t, WS(3, 7) - .3, L(3).end));
  let s = bareStreet(t, { id: 'y3', green: 0, sky: ['#6a7a90', '#a8b4c0', '#d0d8de'] });
  s += `<rect y="990" width="720" height="${116 * snow}" fill="#f4f8fc" opacity=".9"/>` + Array.from({ length: 80 }, (_, i) => { const r = RS(i + 3), x = pmod(r() * 760 + Math.sin(t + i) * 20, 760) - 20, y = pmod(r() * 1300 + t * (40 + r() * 50), 1300) - 20; return `<circle cx="${x}" cy="${y}" r="${1.5 + r() * 2.5}" fill="#fff" opacity="${.85 * snow}"/>`; }).join('');
  s += `<g transform="translate(360,620)"><rect x="-170" y="-150" width="340" height="300" rx="14" fill="#fff"/><rect x="-170" y="-150" width="340" height="70" rx="14" fill="#c62828"/><text x="0" y="-102" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff">اليوم</text><text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="110" fill="#1a1a1a">${AR(day)}</text><text x="0" y="110" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="${day > 365 ? '#c62828' : '#555'}">${day > 365 ? 'السنة لم تنتهِ بعد!' : 'من السنة'}</text>` +
    [0, 1, 2].map(q => `<rect x="${-110 + q * 100}" y="-162" width="14" height="30" rx="5" fill="#555"/>`).join('') + (k < 1 ? `<path d="M-170,-80 Q0,${-80 + 40 * Math.sin(t * 20)} 170,-80" stroke="#ddd" stroke-width="3" fill="none"/>` : '') + `</g>`;
  s += onWalk(300, 1088, CROWD[2], .55, 1, t, { coat: 1, scarf: '#5a5a5a', lookUp: .1 });
  F.ov = ''; return s;
}
// 4: ice spreads from both poles; the white ice throws sunlight back to space, so it gets colder still
function sceneIce(t) {
  const k = ease(ramp(t, WS(4, 1) - .2, L(4).end + .2)), cx = 400, cy = 780, R = 230;
  let s = space(t, '#020309', '#070a1c');
  F.sun = { x: -60, y: 520, r: 120, a: 1 }; F.earth = { x: cx, y: cy, r: R, a: 1, sunI: 1.05, lights: .1, rot: 4.7 + t * .03 - t * .03, tilt: .2 }; F.light = [-60, 520];
  const cap = lerp(.16, .44, k);
  let ov = `<defs><clipPath id="dk4"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><linearGradient id="nightSh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset=".75" stop-color="#000" stop-opacity=".75"/><stop offset="1" stop-color="#000" stop-opacity=".95"/></linearGradient><linearGradient id="iceCap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".97"/><stop offset=".8" stop-color="#e8f2fa" stop-opacity=".9"/><stop offset="1" stop-color="#e8f2fa" stop-opacity="0"/></linearGradient></defs><g clip-path="url(#dk4)">`;
  let top = `M${cx - R},${cy - R}`; for (let x = cx - R; x <= cx + R; x += 12) top += ` L${x},${(cy - R + 2 * R * cap * .5 + 10 * Math.sin(x * .03 + 1) + 4 * Math.sin(x * .07)).toFixed(1)}`;
  ov += `<path d="${top} L${cx + R},${cy - R}Z" fill="url(#iceCap)" filter="url(#blur2)"/>`;
  let bot = `M${cx - R},${cy + R}`; for (let x = cx - R; x <= cx + R; x += 12) bot += ` L${x},${(cy + R - 2 * R * cap * .45 + 10 * Math.sin(x * .035 + 2) + 4 * Math.sin(x * .08)).toFixed(1)}`;
  ov += `<path d="${bot} L${cx + R},${cy + R}Z" fill="#f4f8fc" opacity=".92" filter="url(#blur2)"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#nightSh)"/></g>`;
  const ar = ramp(t, WS(4, 7) - .2, WS(4, 7) + .3);
  [[cx - 60, cy - R * .8], [cx + 40, cy - R * .7], [cx - 20, cy + R * .75]].forEach(([x, y], i) => { ov += `<g opacity="${ar}"><path d="M${x - 220},${y - 40 + i * 20} L${x},${y}" stroke="#ffd27a" stroke-width="4"/><path d="M${x},${y} L${x - 160},${y - 170 + i * 60}" stroke="#fff6d0" stroke-width="4" stroke-dasharray="10 6" marker-end="url(#arrW)"/></g>`; });
  ov += `<text x="${cx}" y="${cy + R + 70}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4" opacity="${ar}">الجليد يعكس ضوء الشمس إلى الفضاء</text>`;
  F.ov = ov; return s;
}
// 5: at Mars' distance: a small, pale Sun low over a frozen harbour; ships locked in pressure-ridged sea ice
function sceneFrozen(t) {
  const k = ease(ramp(t, S0(5), L(5).end + .2));
  let s = `<defs>${RDEF}${RDEF2}<filter id="iceX" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .06" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .5  0 0 0 0 .65  0 0 0 -1.5 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter><linearGradient id="skF5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2440"/><stop offset=".7" stop-color="#5a6a80"/><stop offset="1" stop-color="#a8b0b8"/></linearGradient><linearGradient id="iceS5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfdce6"/><stop offset="1" stop-color="#8aa0b4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF5)"/>` + stars(.3, t);
  s += `<circle cx="470" cy="760" r="16" fill="#fff6e8"/><circle cx="470" cy="760" r="80" fill="#fff0d8" opacity=".25" filter="url(#soft)"/><circle cx="470" cy="760" r="30" fill="#fff8f0" opacity=".3" filter="url(#blur2)"/>`;
  const r0 = RS(9); let x = -20; while (x < 740) { const w = 30 + r0() * 50, h = 60 + r0() * 160; s += `<rect x="${x}" y="${860 - h}" width="${w}" height="${h}" fill="#3a4250"/><rect x="${x}" y="${860 - h}" width="${w}" height="8" fill="#f4f8fc"/>`; x += w + 6; }
  s += `<rect y="860" width="720" height="20" fill="#e8eef4"/>`;
  s += riverW(880, 900 + 380 * (1 - k), t, { id: 'f5', col: ['#3a5a70', '#1e3a50'] });
  s += `<rect y="${900 + 380 * (1 - k) - 20}" width="720" height="${400}" fill="url(#iceS5)"/><rect y="880" width="720" height="400" fill="#fff" filter="url(#iceX)" opacity="${.5 * k}"/>`;
  for (let i = 0; i < 10; i++) { const r = RS(i + 30), y = 940 + r() * 300; s += `<path d="M-20,${y} Q200,${y - 14} 360,${y + 4} T740,${y - 8}" stroke="#f4f8fc" stroke-width="${3 + r() * 4}" fill="none" opacity="${.8 * k}"/><path d="M-20,${y + 6} Q200,${y - 8} 360,${y + 10} T740,${y - 2}" stroke="#6a8098" stroke-width="2" fill="none" opacity="${.5 * k}"/>`; }
  s += `<g transform="translate(220,1000)"><path d="M-110,0 L110,0 L90,40 L-90,40Z" fill="#3a3e44"/><rect x="-60" y="-50" width="80" height="50" fill="#d8d8d0"/><rect x="30" y="-90" width="16" height="90" fill="#8a3a2a"/><rect x="-110" y="-4" width="220" height="10" fill="#f4f8fc"/></g>`;
  s += `<g transform="translate(560,1110) scale(.8)"><path d="M-120,0 L120,0 L100,44 L-100,44Z" fill="#6a2a22"/><rect x="-40" y="-60" width="90" height="60" fill="#e8e4dc"/><rect x="-120" y="-4" width="240" height="12" fill="#f4f8fc"/></g>`;
  s += `<rect width="720" height="1280" fill="#0a1430" opacity=".2"/>`;
  F.ov = ''; return s;
}
// 6: deep under the ice: black smokers on the sea floor, shimmering hot water, tube worms, white crabs and shrimp – life without sunlight
function sceneVents(t) {
  let s = `<defs>${RDEF}${RDEF2}<filter id="iceX" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .06" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .5  0 0 0 0 .65  0 0 0 -1.5 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter><linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3a5a"/><stop offset=".3" stop-color="#0a1a30"/><stop offset="1" stop-color="#03060e"/></linearGradient><radialGradient id="ventG"><stop offset="0" stop-color="#ffb060" stop-opacity=".6"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#deep)"/>`;
  s += `<path d="M-20,-20 L740,-20 L740,380 Q560,410 360,392 T-20,402Z" fill="#cfe4f2"/><path d="M-20,380 Q180,412 360,392 T740,380" stroke="#8ab8d8" stroke-width="10" fill="none"/><rect x="-20" y="-20" width="760" height="420" fill="#fff" filter="url(#iceX)" opacity=".6"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + 10), y = pmod(r() * 900 + t * 20, 900) + 400; s += `<circle cx="${r() * 720}" cy="${y}" r="${1 + r() * 1.5}" fill="#9ab8d0" opacity=".35"/>`; }
  s += `<path d="M-20,1100 Q120,1060 260,1090 T520,1070 T740,1090 L740,1290 L-20,1290Z" fill="#2a2420"/><path d="M-20,1100 Q120,1060 260,1090 T520,1070 T740,1090 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".6"/>`;
  [[230, 1080, 260], [470, 1074, 200], [610, 1090, 150]].forEach(([x, y, h], i) => { s += `<circle cx="${x}" cy="${y - h}" r="${110}" fill="url(#ventG)"/><path d="M${x - 40},${y} L${x - 22},${y - h} L${x + 22},${y - h} L${x + 40},${y}Z" fill="#3a2e26"/><path d="M${x - 40},${y} L${x - 22},${y - h} L${x - 8},${y - h} L${x - 14},${y}Z" fill="#000" opacity=".3"/>` + Array.from({ length: 5 }, (_, q) => `<ellipse cx="${x + (q % 2 ? 14 : -14)}" cy="${y - h * (.2 + q * .15)}" rx="14" ry="7" fill="#4a3a2e"/>`).join('');
    for (let q = 0; q < 8; q++) { const ph = pmod(t * .4 + q / 8 + i * .3, 1); s += `<circle cx="${x + Math.sin(ph * 6 + q) * 14 * ph + ph * 20}" cy="${y - h - 10 - ph * 300}" r="${16 + ph * 50}" fill="#0a0a0a" opacity="${(.75 * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; } });
  for (let i = 0; i < 16; i++) { const r = RS(i + 50), x = 150 + r() * 420, y = 1090 + r() * 40, h = 50 + r() * 60, sw = Math.sin(t * 1.5 + i) * 6; s += `<path d="M${x},${y} q${sw},-${h * .5} ${sw * .5},-${h}" stroke="#f4f0e8" stroke-width="7" fill="none" stroke-linecap="round"/><ellipse cx="${x + sw * .5}" cy="${y - h - 6}" rx="9" ry="12" fill="#e53935"/>`; }
  for (let i = 0; i < 5; i++) { const r = RS(i + 80), x = 100 + r() * 520 + Math.sin(t + i) * 8, y = 1130 + r() * 50; s += `<ellipse cx="${x}" cy="${y}" rx="14" ry="8" fill="#e8e4dc"/><path d="M${x - 14},${y} l-10,6 M${x - 12},${y + 4} l-10,8 M${x + 14},${y} l10,6 M${x + 12},${y + 4} l10,8 M${x - 8},${y - 6} l-6,-10 M${x + 8},${y - 6} l6,-10" stroke="#e8e4dc" stroke-width="2.4"/>`; }
  for (let i = 0; i < 8; i++) { const r = RS(i + 90), x = pmod(r() * 720 + t * 30, 720), y = 860 + r() * 200; s += `<path d="M${x},${y} q10,-4 20,0 q-10,4 -20,0Z" fill="#f4c8b0" opacity=".8"/>`; }
  F.ov = ''; return s;
}
// 7: the Moon really is receding, about 3.8 cm a year, but it will not escape (not to scale)
function sceneMoon(t) {
  const k = ramp(t, WS(7, 3), L(7).end);
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 200, y: 800, r: 120, a: 1, sunI: 1.05, lights: .3, rot: 2.2, tilt: .41 }; F.moon = { x: 520 + 40 * k, y: 700, r: 34, a: 1, sunI: 1.1 }; F.light = [-500, 400];
  F.ov = `<g opacity="${ramp(t, WS(7, 7) - .2, WS(7, 7) + .3)}"><path d="M330,780 L${480 + 40 * k},720" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 6"/><path d="M${560 + 40 * k},700 l60,0" stroke="#f4c76b" stroke-width="4" marker-end="url(#arrY)"/><text x="${600 + 40 * k}" y="660" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="4">٣٫٨ سم كل سنة</text></g>`;
  return s;
}
// 8: CTA – Earth safe in its stable orbit
function sceneEarth(t) {
  const st = S0(8), k = ease(ramp(t, WS(8, 8) - .2, WS(8, 8) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: 1, lights: .3, rot: 4.8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 9), WS(8, 9) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneZone }, { s: S0(2) - .2, f: sceneDim }, { s: S0(3) - .2, f: sceneYear }, { s: S0(4) - .2, f: sceneIce },
  { s: S0(5) - .2, f: sceneFrozen }, { s: S0(6) - .2, f: sceneVents }, { s: S0(7) - .2, f: sceneMoon }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneZone, sceneIce, sceneMoon, sceneHook]);
const XF = .5;
const TLI = [['+١٠٪ بُعداً', S0(2)], ['سنة أطول', S0(3)], ['الجليد', S0(4)], ['بُعد المريخ', S0(5)], ['الأعماق', S0(6)]];
const LIST_ON = new Set([sceneDim, sceneYear]);
const CHIPS = [
  ['c1', 'ضوء أقل بنحو السُّدس', 360, 330, 'big', WS(2, 6), WS(2, 11)],
  ['c2', 'أبرد بأكثر من ١٠ درجات', 360, 330, 'big', WS(2, 11), S0(3) - .3],
  ['c3', 'سنة ≈ ٤٢٠ يوماً', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'أقل من نصف الضوء', 360, 330, 'big', WS(5, 7), S0(6) - .3],
  ['c5', 'حياة قرب الينابيع الحارة', 360, 330, 'big', WS(6, 7), S0(7) - .3],
  ['c6', 'لن يفلت منّا', 360, 330, 'big', WS(7, 12), S0(8) - .3],
  ['c7', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 11), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">لو ابتعدت الأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = (SCENES[i].f === sceneZone || SCENES[i].f === sceneMoon) ? .9 : 0;
}
