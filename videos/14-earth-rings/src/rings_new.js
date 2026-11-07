
// ===================== "what if Earth had rings like Saturn?" =====================
// rings in Earth's equatorial plane, ~1.35–2.25 Earth radii (inside the Roche limit): faint inner ring, bright main ring, a gap, outer ring
const BANDS = [[1.35, 1.55, .25], [1.55, 1.75, .75], [1.75, 1.95, .95], [1.95, 2.0, .06], [2.0, 2.25, .6]];
function ringPart(cx, cy, R, part, tilt = -23, e = .26, a = 1, shade = 0) {
  let s = `<g transform="rotate(${tilt},${cx},${cy})" opacity="${a}">`;
  BANDS.forEach(([r0, r1, op], bi) => { const n = 6; for (let q = 0; q < n; q++) { const rr = R * lerp(r0, r1, (q + .5) / n), w = R * (r1 - r0) / n + .6, o = op * (.8 + .4 * Math.sin(q * 2.3 + bi));
      s += `<path d="M${cx - rr},${cy} A${rr},${rr * e} 0 0 ${part === 'back' ? 1 : 0} ${cx + rr},${cy}" stroke="${mix('#e8dcc4', '#b8a888', (q % 3) / 3)}" stroke-width="${w}" fill="none" opacity="${o.toFixed(2)}"/>`; } });
  if (part === 'back' && shade) s += `<path d="M${cx + R * .2},${cy - R * .25 * e * 4} L${cx + R * 2.4},${cy - R * .05} L${cx + R * 2.4},${cy - R * .55} L${cx + R * .2},${cy - R * .9}Z" fill="#000" opacity="${.6 * shade}"/>`;
  return s + `</g>`;
}
// the rings as seen from Baghdad (33°N), looking south: inner edge ~10° up, outer edge ~36° up; day = pale, night = bright with Earth's shadow cutting the middle
function skyRing(t, hz, o = {}) {
  const night = o.night || 0, apexOut = hz - 36 * 15, apexIn = hz - 10 * 15, cy = hz + 700; let s = `<g opacity="${o.a ?? 1}">`;
  BANDS.forEach(([r0, r1, op], bi) => { const n = 7; for (let q = 0; q < n; q++) { const u = (lerp(r0, r1, (q + .5) / n) - 1.35) / .9, apex = lerp(apexIn, apexOut, u), ry = cy - apex, w = (apexIn - apexOut) * (r1 - r0) / .9 / n + 2.5;
      const col = night ? mix('#fff4e0', '#d8c8a8', (q % 3) / 3) : mix('#ffffff', '#e4ecf4', (q % 3) / 3), oo = op * (night ? .9 : .5) * (.88 + .12 * Math.sin(q * 2.1 + bi));
      s += `<path d="M-400,${cy} A760,${ry} 0 0 1 1120,${cy}" stroke="${col}" stroke-width="${w}" fill="none" opacity="${oo.toFixed(2)}"/>`; } });
  if (night && o.shadow) s += `<path d="M310,${apexOut - 30} Q360,${apexOut - 40} 410,${apexOut - 30} L430,${apexIn + 40} Q360,${apexIn + 30} 290,${apexIn + 40}Z" fill="#05070f" opacity="${.85 * o.shadow}" filter="url(#soft)"/>`;
  if (night) s += `<path d="M-400,${cy} A760,${cy - lerp(apexIn, apexOut, .5)} 0 0 1 1120,${cy}" stroke="#fff6e0" stroke-width="${apexIn - apexOut}" fill="none" opacity=".12" filter="url(#haze)"/>`;
  return s + `</g>`;
}
function baghdadFront(t, base, night) {
  let s = shanasheel(-10, base, 180, 230, 11) + bldg(180, base, 110, 300, '#bca68a', 3, .15) + shanasheel(310, base, 150, 210, 12) + bldg(470, base, 100, 180, '#a8927a', 4, .15) + shanasheel(580, base, 160, 200, 13);
  s += palmG(160, base + 10, 250, t, night * .6) + palmG(460, base + 10, 230, t, night * .6);
  s += `<rect y="${base}" width="720" height="${1290 - base}" fill="${mix('#b8ab98', '#2a2830', night)}"/><rect y="${base}" width="720" height="${1290 - base}" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  return s;
}
// 0: the hook – Baghdad at dusk under a vast ring arch
function sceneHook(t) {
  let s = `<defs>${RDEF}<linearGradient id="skH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2440"/><stop offset=".6" stop-color="#6a5a7a"/><stop offset="1" stop-color="#e8a878"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skH)"/>` + stars(.5, t);
  s += skyRing(t, 1000, { night: .7, a: .95 });
  s += baghdadFront(t, 1010, .5) + `<rect width="720" height="1280" fill="#1a1020" opacity=".2"/>`;
  s += person(260, 1180, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .9 }) + person(400, 1190, { s: .57, face: -1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, t, lookUp: .9 });
  F.ov = ''; return s;
}
// 1: from space: the 3D Earth with rings over the equator; the back of the rings passes behind the planet, the front in front of it
function sceneSpace(t) {
  let s = space(t, '#020309', '#070a1c');
  const cx = 360, cy = 760, R = 150, k = ease(ramp(t, S0(1) - .2, S0(1) + 1.2));
  F.earth = { x: cx, y: cy, r: R, a: 1, sunI: 1.05, lights: .3, rot: 2.2, tilt: .41 }; F.light = [-600, 400];
  s += ringPart(cx, cy, R, 'back', -23, .26, k, 0);
  F.ov = ringPart(cx, cy, R, 'front', -23, .26, k) + `<g opacity="${ramp(t, WS(1, 5), WS(1, 5) + .4)}"><circle cx="${cx + 300}" cy="${cy - 160}" r="18" fill="#a89a88"/><circle cx="${cx + 312}" cy="${cy - 150}" r="9" fill="#d8e8f4"/><circle cx="${cx + 290}" cy="${cy - 144}" r="6" fill="#8a7a6a"/><text x="${cx + 300}" y="${cy - 196}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">صخور وجليد</text></g>`;
  return s;
}
// 2: Baghdad by day, looking south: a pale arch across the blue sky
function sceneDay(t) {
  let s = `<defs>${RDEF}<linearGradient id="skD2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7cc4"/><stop offset=".7" stop-color="#9cc4e6"/><stop offset="1" stop-color="#dcebf4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skD2)"/>`;
  s += skyRing(t, 1000, { night: 0, a: ease(ramp(t, S0(2) - .2, S0(2) + .8)) });
  s += `<circle cx="80" cy="420" r="30" fill="#fffdf2"/><circle cx="80" cy="420" r="120" fill="#fff6d0" opacity=".3" filter="url(#soft)"/>`;
  s += baghdadFront(t, 1010, 0) + car(560, 1240, .9, '#c83a2a', -1, 0);
  s += person(260, 1180, { s: .55, face: 1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: .8 }) + person(330, 1190, { s: .5, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .8 });
  s += `<text x="40" y="975" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">← الشرق</text><text x="680" y="975" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">الغرب →</text><text x="360" y="975" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">الجنوب</text>`;
  F.ov = ''; return s;
}
// 3: the same view at night: the rings blaze with sunlight, light the streets, and Earth's shadow cuts a dark gap in the middle
function sceneNight(t) {
  let s = `<defs>${RDEF}<linearGradient id="skN3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050f"/><stop offset="1" stop-color="#1a2440"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skN3)"/>` + stars(.8, t);
  s += skyRing(t, 1000, { night: 1, shadow: ease(ramp(t, WS(3, 10) - .3, WS(3, 10) + .5)) });
  s += `<circle cx="600" cy="300" r="14" fill="#f4f0e0" opacity=".7"/>`;
  s += baghdadFront(t, 1010, 1) + `<rect y="1010" width="720" height="280" fill="#fff4e0" opacity=".1"/>`;
  s += person(260, 1180, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .8 }).replace(/fill="#[0-9a-f]{6}"/gi, m => m) + `<rect width="720" height="1280" fill="#000" opacity="0"/>`;
  F.ov = ''; return s;
}
// 4: the shadow of the rings falls on the winter hemisphere (here the north) – a darker, colder band
function sceneWinter(t) {
  let s = space(t, '#020309', '#070a1c');
  const cx = 360, cy = 780, R = 210, k = ease(ramp(t, WS(4, 1) - .2, WS(4, 4) + .3));
  F.earth = { x: cx, y: cy, r: R, a: 1, sunI: 1.05, lights: .2, rot: 1.0, tilt: .41 }; F.light = [-500, 950];
  s += ringPart(cx, cy, R * .7, 'back', -23, .22, 1);
  let sh = `<defs><clipPath id="disk4"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#disk4)" opacity="${k}"><g transform="rotate(-23,${cx},${cy})">`;
  BANDS.forEach(([r0, r1, op], bi) => { const y0 = cy - R * lerp(.15, .75, (r0 - 1.35) / .9), w = R * (r1 - r0) * .7; sh += `<path d="M${cx - R * 1.2},${y0} Q${cx},${y0 - 30} ${cx + R * 1.2},${y0}" stroke="#000" stroke-width="${w}" fill="none" opacity="${(.55 * op).toFixed(2)}"/>`; });
  sh += `</g></g>`;
  F.ov = sh + ringPart(cx, cy, R * .7, 'front', -23, .22, 1) + `<g opacity="${k}"><text x="${cx + R + 6}" y="${cy - R * .5}" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#9ccaff" style="paint-order:stroke" stroke="#000" stroke-width="4">ظل الحلقات</text><text x="${cx - R - 20}" y="${cy + R + 60}" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b">☀ الشمس ←</text></g>`;
  return s;
}
// 5: meteors: ring fragments falling as shooting stars over the city
function sceneMeteors(t) {
  let s = `<defs>${RDEF}<linearGradient id="skM5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#03050f"/><stop offset="1" stop-color="#1a2440"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skM5)"/>` + stars(.8, t);
  s += skyRing(t, 1000, { night: 1, shadow: 1, a: .9 });
  for (let i = 0; i < 14; i++) { const r = RS(i + 10), ph = pmod(t * .7 + r(), 1), x0 = r() * 760, y0 = 360 + r() * 260, x = x0 - ph * 300, y = y0 + ph * 420; if (ph > .7) continue;
    s += `<path d="M${x + 120},${y - 170} L${x},${y}" stroke="url(#mtr${i})" stroke-width="${2 + r() * 3}" stroke-linecap="round"/><defs><linearGradient id="mtr${i}" gradientUnits="userSpaceOnUse" x1="${x + 120}" y1="${y - 170}" x2="${x}" y2="${y}"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff6d8"/></linearGradient></defs><circle cx="${x}" cy="${y}" r="${3 + r() * 2}" fill="#fff" filter="url(#blur2)"/>`; }
  s += baghdadFront(t, 1010, 1);
  s += person(330, 1180, { s: .55, face: -1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, t, lookUp: .9 });
  F.ov = ''; return s;
}
// 6: launching gets dangerous: a rocket climbs toward the ring plane, the low orbits are full of ring debris
function sceneRocket(t) {
  const st = S0(6) - .2, T = t - st, ry = 1060 - Math.pow(Math.max(0, T - .3), 2) * 38;
  let s = `<defs>${RDEF}<linearGradient id="skR6" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5a9a"/><stop offset="1" stop-color="#cfe2f0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR6)"/>`;
  s += skyRing(t, 1080, { night: 0, a: .9 });
  s += `<rect y="1080" width="720" height="210" fill="#8a8a7a"/><rect y="1080" width="720" height="210" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  s += `<path d="M120,1100 L120,780 M160,1100 L160,780 M120,800 L160,820 M120,860 L160,880 M120,920 L160,940 M120,980 L160,1000 M160,800 L120,820 M160,860 L120,880 M160,920 L120,940 M160,980 L120,1000" stroke="#c84a2a" stroke-width="5"/><rect x="100" y="1086" width="200" height="16" fill="#5a5a5a"/>`;
  const rx = 220; s += `<g transform="translate(${rx},${ry})"><path d="M-14,0 L-14,-150 Q0,-196 14,-150 L14,0Z" fill="#f4f4f0"/><path d="M-14,-40 L-26,6 L-14,0Z M14,-40 L26,6 L14,0Z" fill="#2a2a2a"/><rect x="-14" y="-120" width="28" height="10" fill="#2a2a2a"/>` +
    (T > .2 ? `<path d="M-12,0 L0,${80 + 40 * Math.sin(t * 30)} L12,0Z" fill="#ffd27a"/><path d="M-8,0 L0,${50} L8,0Z" fill="#fff"/>` : '') + `</g>`;
  if (T > .3) for (let i = 0; i < 14; i++) { const r = RS(i + 20), ph = pmod(t * .5 + r(), 1); s += `<circle cx="${rx + (r() - .5) * 200 * (1 + ph)}" cy="${Math.min(1080, ry + 40 + ph * 160)}" r="${30 + ph * 60}" fill="#eceae4" opacity="${(.6 * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; }
  for (let i = 0; i < 16; i++) { const r = RS(i + 50); s += `<circle cx="${r() * 720}" cy="${560 + r() * 200}" r="${2 + r() * 3}" fill="#6a5a4a" opacity=".8"/>`; }
  s += `<g opacity="${ramp(t, WS(6, 4) - .2, WS(6, 4) + .3)}"><path d="M${rx + 30},${ry - 220} L560,600" stroke="#ff5a3a" stroke-width="3" stroke-dasharray="10 8"/><circle cx="560" cy="600" r="26" fill="none" stroke="#ff5a3a" stroke-width="4"/><path d="M548,588 L572,612 M572,588 L548,612" stroke="#ff5a3a" stroke-width="4"/></g>`;
  F.ov = ''; return s;
}
// 7: 466 million years ago (Ordovician): bare rocky shores with no land plants, a warm shallow sea, and possibly a ring in the sky
function sceneAncient(t) {
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skA7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset=".7" stop-color="#a8c4d8"/><stop offset="1" stop-color="#e4e0d4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skA7)"/>`;
  s += skyRing(t, 900, { night: 0, a: .85 });
  s += `<path d="M-20,900 L120,840 L260,870 L380,820 L520,880 L740,850 L740,930 L-20,930Z" fill="#7a6a5a" filter="url(#reliefR)"/>`;
  s += riverW(920, 1080, t, { id: 'a7', col: ['#3a8a9a', '#1e5a6a'], sunX: 500 });
  s += `<path d="M-20,1060 Q200,1040 400,1070 T740,1060 L740,1290 L-20,1290Z" fill="#8a7a64"/><path d="M-20,1060 Q200,1040 400,1070 T740,1060 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".5"/>`;
  for (let i = 0; i < 9; i++) { const r = RS(i + 30); s += `<ellipse cx="${r() * 720}" cy="${1110 + r() * 150}" rx="${20 + r() * 40}" ry="${10 + r() * 16}" fill="#6a5e50"/><ellipse cx="${r() * 720}" cy="${1110 + r() * 150}" rx="${14 + r() * 20}" ry="${6 + r() * 6}" fill="#3a7a8a" opacity=".7"/>`; }
  const tri = (x, y, sc) => `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="0" cy="0" rx="22" ry="14" fill="#6a5a44"/><path d="M-22,0 Q0,-18 22,0" stroke="#3a2e22" stroke-width="2" fill="none"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${-14 + q * 7},-12 L${-14 + q * 7},12" stroke="#3a2e22" stroke-width="1.5"/>`).join('') + `<path d="M-6,-14 L6,-14" stroke="#3a2e22" stroke-width="2"/></g>`;
  s += tri(200, 1200, 1.2) + tri(520, 1150, 1) + tri(400, 1240, 1.3);
  s += `<g opacity="${ramp(t, WS(7, 12) - .2, WS(7, 12) + .3)}"><rect x="160" y="440" width="400" height="64" rx="16" fill="#0a0e1c" opacity=".8"/><text x="360" y="484" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#f4c76b">قبل ٤٦٦ مليون سنة</text></g>`;
  F.ov = ''; return s;
}
// 8: CTA – the ringed Earth and the question
function sceneEarth(t) {
  const st = S0(8), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  const cx = 360, cy = 760, R = 150;
  F.earth = { x: cx, y: cy, r: R, a: 1, sunI: 1, lights: .4, rot: .8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  s += ringPart(cx, cy, R, 'back', -23, .26, 1, 0);
  F.ov = ringPart(cx, cy, R, 'front', -23, .26, 1) + `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 2), WS(8, 2) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpace }, { s: S0(2) - .2, f: sceneDay }, { s: S0(3) - .2, f: sceneNight }, { s: S0(4) - .2, f: sceneWinter },
  { s: S0(5) - .2, f: sceneMeteors }, { s: S0(6) - .2, f: sceneRocket }, { s: S0(7) - .2, f: sceneAncient }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneSpace, sceneWinter]);
const XF = .5;

// ---------- UI ----------
const TLI = [['السماء', S0(2)], ['الليل', S0(3)], ['الشتاء', S0(4)], ['الشهب', S0(5)], ['الصواريخ', S0(6)]];
const LIST_ON = new Set([sceneMeteors, sceneRocket]);
const CHIPS = [
  ['c1', 'فوق خط الاستواء', 360, 330, 'big', WS(1, 2), S0(2) - .3],
  ['c2', 'قوس في السماء الجنوبية', 360, 330, 'big', WS(2, 3), WS(2, 9)],
  ['c3', 'حتى في النهار', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c4', 'أضوأ من القمر', 360, 330, 'big', WS(3, 5), WS(3, 10) - .2],
  ['c5', 'ظل الأرض', 360, 330, 'dark', WS(3, 10), S0(4) - .3],
  ['c6', 'شتاء أبرد', 360, 330, 'big', WS(4, 8), S0(5) - .3],
  ['c7', 'شهب أكثر', 360, 330, 'big', WS(5, 5), S0(6) - .3],
  ['c8', 'خطر الاصطدام', 360, 330, 'red', WS(6, 3), S0(7) - .3],
  ['c9', 'دراسة ٢٠٢٤', 360, 330, 'big', WS(7, 1), WS(7, 10)],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 5), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">لو للأرض حلقات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act;
    $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = (SCENES[i].f === sceneSpace || SCENES[i].f === sceneWinter) ? .9 : 0;
}
