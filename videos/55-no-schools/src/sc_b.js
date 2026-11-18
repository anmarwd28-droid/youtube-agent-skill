// ---------- #55 scenes 5-8: the Sumerian tablet house, who could read, the doctor's 18 years, mothers who went to school ----------
const SEAT = { lF: [1.5708, .05], lB: [1.42, -.02] };
function beard(o) { const [hx, hy] = HP.head, f = o.f || 1, s = o.s || 1;
  return `<path d="M${(hx + f * 2 * s).toFixed(1)},${(hy + 10 * s).toFixed(1)} q${(f * 16 * s).toFixed(1)},${(4 * s).toFixed(1)} ${(f * 20 * s).toFixed(1)},${(-6 * s).toFixed(1)} q${(f * 2 * s).toFixed(1)},${(26 * s).toFixed(1)} ${(-f * 12 * s).toFixed(1)},${(36 * s).toFixed(1)} q${(-f * 14 * s).toFixed(1)},${(-4 * s).toFixed(1)} ${(-f * 10 * s).toFixed(1)},${(-30 * s).toFixed(1)}Z" fill="${o.c || '#d8d4cc'}"/>`; }
function tabletS(x, y, s, rot, n, seed) {   // a small clay tablet with n rows of wedge marks
  let g = `<rect x="-22" y="-28" width="44" height="56" rx="8" fill="url(#clayT)"/><rect x="-22" y="-28" width="44" height="56" rx="8" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  const r = RS(seed); for (let i = 0; i < n; i++) for (let j = 0; j < 4; j++) if (r() < .8) g += `<path d="M${-14 + j * 9},${-18 + i * 9} l4,0 l-2,3Z" fill="#5a3420"/>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot}) scale(${s})">${g}</g>`; }
function sceneSumer(t) {
  const t0 = S0(5) - .2, T = t - t0, ia = ease(ramp(t, WS(5, 9) - .3, WS(5, 9) + .2)), nw = ramp(t, WS(5, 9), WS(5, 13) + .4);
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyDay)"/>${sun3(600, 440, .9)}` + cumulus(160 + T * 4, 470, 220, 51, { a: .6 });
  // a ziggurat far away, above the courtyard wall
  s += `<g opacity=".7"><path d="M380,600 h260 v-40 h-40 v-40 h-50 v-36 h-80 v36 h-50 v40 h-40Z" fill="#c8a478"/><path d="M510,484 v36 h50 v40 h40 v40 h-90Z" fill="#000" opacity=".18"/><path d="M500,600 v-116" stroke="#a8845a" stroke-width="10"/></g>`;
  // the courtyard wall of mud brick, a doorway, a niche with tablets
  s += `<rect x="-20" y="580" width="760" height="420" fill="url(#mudW)"/><rect x="-20" y="580" width="760" height="420" fill="url(#mudB)"/><rect x="-20" y="580" width="760" height="420" fill="#fff" filter="url(#wallI)" opacity=".25"/>` +
    `<rect x="-20" y="568" width="760" height="16" fill="#c09868"/><rect x="-20" y="582" width="760" height="6" fill="#000" opacity=".2"/>`;
  s += `<path d="M600,1000 V760 a50,50 0 0 1 100,0 V1000Z" fill="#3a2a1e"/><path d="M610,1000 V770 a40,40 0 0 1 80,0 V1000Z" fill="#a8c8e4" opacity=".5"/><path d="M610,1000 V900 h80 V1000Z" fill="#d8b884" opacity=".7"/>`;
  s += `<rect x="440" y="650" width="130" height="110" fill="#6a4e32"/><rect x="440" y="650" width="130" height="10" fill="#000" opacity=".3"/>` + [0, 1].map(r => [0, 1, 2, 3].map(c => tabletS(458 + c * 31, 680 + r * 52, .5, (c - 1.5) * 3, 3, r * 4 + c)).join('')).join('') + `<path d="M440,706 h130" stroke="#8a6a44" stroke-width="5"/>`;
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#b8946a"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".28"/><rect x="-20" y="1000" width="760" height="14" fill="url(#aoDn)" opacity=".5"/>`;
  // a long mud bench, four boys with tablets, the teacher on a stool
  const by = 1150, sc = .66;
  s += `<rect x="20" y="${by - 76 * sc}" width="470" height="${76 * sc - 6}" fill="#c4a072"/><rect x="20" y="${by - 76 * sc}" width="470" height="6" fill="#e0c090"/><rect x="20" y="${by - 10}" width="470" height="10" fill="#000" opacity=".2"/><rect x="20" y="${by - 76 * sc}" width="470" height="${76 * sc}" fill="url(#mudB)"/>`;
  let P = '';
  const B = [[80, 4, '#e8dcc0'], [190, 1, '#d8ccb0'], [300, 6, '#e4d4b4'], [410, 2, '#dcd0b4']];
  B.forEach(([x, pi, c], i) => { const tx = x + 60 * sc, ty = by - 128 * sc, wr = Math.sin(t * 5 + i) * 3;
    P += kid(x, by, sc, 1, pi, Object.assign({}, SEAT, { top: c, pants: '#c8b898', lean: 10, hB: [tx - 6, ty + 8], hF: [tx + 6 + wr, ty - 6] }), '') + tabletS(tx, ty, sc * 1.1, -20, 4, i + 9) +
      `<path d="M${(tx + 6 + wr).toFixed(1)},${(ty - 6).toFixed(1)} l${(14 * sc).toFixed(1)},${(-22 * sc).toFixed(1)}" stroke="#c8a86a" stroke-width="3"/>`; });
  P += `<rect x="560" y="${by - 76 * .82}" width="70" height="${76 * .82}" fill="#7a5a3a"/><rect x="556" y="${by - 76 * .82 - 6}" width="78" height="8" fill="#9a7a50"/>`;
  P += man(600, by, .82, -1, 8, Object.assign({}, SEAT, { top: '#b88a5a', pants: '#a87a4a', hair: '#5a5a5a', aF: [1.5 + .2 * Math.sin(T * 2), 2.2], hB: [560, by - 120 * .82] })); P += beard({ f: -1, s: .82, c: '#6a6460' });
  s += P;
  // inset: wedges pressed into wet clay with a reed stylus
  if (ia > 0) { const cx = 200, cy = 640, R = 150;
    let g = `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#0a0e1c"/><clipPath id="tabC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><g clip-path="url(#tabC)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#clayT)"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
    const r = RS(31), N = Math.floor(nw * 40); let k = 0, lx = cx, ly = cy;
    for (let row = 0; row < 6; row++) { const y = cy - 110 + row * 44; g += `<path d="M${cx - R},${y + 22} H${cx + R}" stroke="#6a4028" stroke-width="1.4" opacity=".5"/>`; let x = cx + 110; while (x > cx - 120) { const n = 1 + Math.floor(r() * 3), rot = r() < .25 ? 90 : 0; for (let q = 0; q < n; q++) { if (k < N) { g += wedge(x - q * 12, y, 1.4, rot); lx = x - q * 12; ly = y; } k++; } x -= n * 12 + 16 + r() * 10; } }
    g += `<path d="M${lx + 2},${ly - 8} L${lx + 120},${ly - 150}" stroke="#d8b878" stroke-width="12" stroke-linecap="round"/><path d="M${lx + 2},${ly - 8} L${lx + 120},${ly - 150}" stroke="#8a6a3a" stroke-width="2" opacity=".6"/></g>` +
      `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="3"/>`;
    s += `<g opacity="${ia.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: without schools, reading is a secret: 12% could read in 1820, about 87% today ----------
function books(x, y, w, h, seed, a = 1) { const r = RS(seed); let s = '', bx = x;
  while (bx < x + w - 8) { const bw = 9 + r() * 9, bh = h * (.7 + r() * .3), c = ['#7a2a24', '#2a4a6a', '#3a5a3a', '#8a6a2a', '#5a3a5a', '#6a4a2a', '#2a3a4a'][Math.floor(r() * 7)];
    s += `<rect x="${bx.toFixed(1)}" y="${(y - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${c}"/><rect x="${bx.toFixed(1)}" y="${(y - bh).toFixed(1)}" width="2" height="${bh.toFixed(1)}" fill="#fff" opacity=".15"/><path d="M${bx.toFixed(1)},${(y - bh * .8).toFixed(1)} h${bw.toFixed(1)} M${bx.toFixed(1)},${(y - bh * .3).toFixed(1)} h${bw.toFixed(1)}" stroke="#d8b860" stroke-width="1.2" opacity=".5"/>`; bx += bw + .5; }
  return s; }
function glyph(x, y, c) { return `<circle cx="${x}" cy="${y - 22}" r="6.5" fill="${c}"/><path d="M${x - 9},${y} v-6 q0,-9 9,-9 q9,0 9,9 v6Z" fill="${c}"/>`; }
function sceneRead(t) {
  const t0 = S0(6) - .2, T = t - t0, pa = ease(ramp(t, WS(6, 7) - .3, WS(6, 7) + .2)), now = ease(ramp(t, WS(6, 19) - .2, WS(6, 22)));
  const lit = Math.round(lerp(12 * ease(ramp(t, WS(6, 12), WS(6, 14))), 87, now));
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a1a10"/>`;
  // bookcases along the back wall
  for (let c = 0; c < 3; c++) { const x = -10 + c * 250; s += `<rect x="${x}" y="380" width="240" height="640" fill="#4a2e1a"/><rect x="${x}" y="380" width="240" height="640" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
    for (let r = 0; r < 5; r++) { const y = 500 + r * 120; s += books(x + 14, y, 212, 96, c * 10 + r) + `<rect x="${x + 6}" y="${y}" width="228" height="12" fill="#6a4426"/><rect x="${x + 6}" y="${y + 12}" width="228" height="6" fill="#000" opacity=".35"/>`; }
    s += `<rect x="${x}" y="380" width="10" height="640" fill="#5a3a22"/><rect x="${x + 230}" y="380" width="10" height="640" fill="#2a1a0e"/>`; }
  s += `<rect x="-20" y="1020" width="760" height="300" fill="#3a2414"/><rect x="-20" y="1020" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="1016" width="760" height="10" fill="#1a0e06"/>`;
  // a lone reader by a candle (only a few could read), the room brightens for today
  s += `<rect x="430" y="${1180 - 132 * .9}" width="240" height="14" fill="#6a4426"/><path d="M450,${1180 - 120 * .9} V1180 M650,${1180 - 120 * .9} V1180" stroke="#4a2e1a" stroke-width="10"/>`;
  s += man(420, 1180, .9, 1, 3, Object.assign({}, SEAT, { top: '#4a3a5a', lean: 14, hF: [520, 1180 - 140 * .9], hB: [500, 1180 - 136 * .9] })) + `<rect x="${430 - 72}" y="${1180 - 76 * .9}" width="100" height="10" fill="#5a3a22"/><path d="M${430 - 64},${1180 - 70 * .9} V1180" stroke="#4a2e1a" stroke-width="8"/>`;
  s += `<path d="M490,${1180 - 132 * .9} l40,-6 l40,6 l-40,4Z" fill="#f4ecd8"/><path d="M530,${1180 - 138 * .9} v10" stroke="#a89878" stroke-width="1.5"/>` + candle(620, 1180 - 132 * .9, 46, t, 1);
  s += scr(`<circle cx="620" cy="${1180 - 132 * .9 - 60}" r="300" fill="url(#lampW)" opacity="${(.9 * (1 - now)).toFixed(2)}"/>`);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity="${(.45 * (1 - now)).toFixed(2)}"/>` + scr(`<rect x="-20" y="-20" width="760" height="1320" fill="#ffe8c0" opacity="${(.14 * now).toFixed(2)}"/>`);
  // the panel: 100 people, those who can read in gold
  if (pa > 0) { let g = panel(90, 400, 540, 560) + `<text x="360" y="462" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">${now > .5 ? 'اليوم' : 'عامَ ١٨٢٠'}</text>`;
    for (let i = 0; i < 100; i++) { const r = Math.floor(i / 10), c = i % 10, x = 144 + c * 48, y = 520 + r * 38; g += glyph(x, y, i < lit ? '#f4c76b' : '#5a6070'); }
    g += `<text x="360" y="930" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="56" fill="#f4c76b">٪${AR4(lit)}</text>`;
    s += `<g opacity="${pa.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: no doctors, no engineers: a doctor studies about 18 years before treating you ----------
function sceneDoctor(t) {
  const t0 = S0(7) - .2, T = t - t0, ba = ease(ramp(t, WS(7, 5) - .3, WS(7, 5) + .2)), fill = ramp(t, WS(7, 6), WS(7, 10) + .3), br = ease(ramp(t, WS(7, 4) - .3, WS(7, 4) + .3));
  let s = `<defs>${SCD()}<linearGradient id="hospW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4eeea"/><stop offset="1" stop-color="#c8d8d2"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hospW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  // the window: a city river with a suspension bridge (engineers' work)
  const wx = 40, wy = 430, ww = 330, wh = 300;
  s += `<rect x="${wx - 12}" y="${wy - 12}" width="${ww + 24}" height="${wh + 24}" fill="#f4f8f6"/><clipPath id="winC"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}"/></clipPath><g clip-path="url(#winC)"><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="url(#skyDay)"/>` +
    farCity(31, wy + 200, '#8a98a8') + `<rect x="${wx}" y="${wy + 200}" width="${ww}" height="100" fill="#5a7a92"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${wx + 10 + i * 56},${wy + 230 + (i % 3) * 18} h30" stroke="#cfe0ea" stroke-width="2" opacity=".5"/>`).join('');
  { const y = wy + 196, A = wx + 90, Bx = wx + 250; s += `<path d="M${wx - 10},${y} H${wx + ww + 10}" stroke="#3a3e48" stroke-width="8"/><path d="M${A},${y + 30} V${y - 110} M${Bx},${y + 30} V${y - 110}" stroke="#4a4e58" stroke-width="10"/>` +
    `<path d="M${wx - 10},${y - 20} Q${(A + wx) / 2},${y - 40} ${A},${y - 108} Q${(A + Bx) / 2},${y - 6} ${Bx},${y - 108} Q${(Bx + wx + ww) / 2},${y - 40} ${wx + ww + 10},${y - 20}" stroke="#8a3a2a" stroke-width="3" fill="none"/>` +
    Array.from({ length: 13 }, (_, i) => { const x = A + 12 + i * 12, q = (x - A) / (Bx - A), cy = y - 108 + 102 * (1 - Math.pow(2 * q - 1, 2)); return `<path d="M${x},${cy.toFixed(1)} V${y}" stroke="#8a3a2a" stroke-width="1"/>`; }).join('');
    s += `<g opacity="${br.toFixed(2)}"><path d="M${A - 20},${y - 120} H${Bx + 20} V${y + 30} H${A - 20}Z" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 7" fill="none"/></g>`; }
  s += `</g><path d="M${wx + ww / 2},${wy} V${wy + wh} M${wx},${wy + wh / 2} H${wx + ww}" stroke="#f4f8f6" stroke-width="8"/><path d="M${wx + 20},${wy + 120} L${wx + 110},${wy + 20}" stroke="#fff" stroke-width="14" opacity=".2"/>`;
  // the monitor with a heartbeat
  s += `<rect x="540" y="560" width="150" height="110" rx="10" fill="#2a3238"/><rect x="552" y="572" width="126" height="86" rx="4" fill="#0a1614"/>`;
  { let d = ''; for (let i = 0; i <= 60; i++) { const x = 554 + i * 2.05, p = pmod(i / 60 * 2 - T * .9, 1), y = 615 - (p > .4 && p < .44 ? 30 : p > .44 && p < .47 ? -14 : 0); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y; } s += `<path d="${d}" stroke="#4af08a" stroke-width="2.4" fill="none"/>`; }
  s += `<path d="M615,670 V880" stroke="#8a9298" stroke-width="6"/><path d="M590,880 h50" stroke="#8a9298" stroke-width="6"/>`;
  s += `<rect x="-20" y="940" width="760" height="380" fill="#b8c4c0"/><rect x="-20" y="940" width="760" height="380" fill="#000" filter="url(#grainR)" opacity=".12"/><rect x="-20" y="936" width="760" height="8" fill="#9aa6a2"/>`;
  // the bed with a patient
  s += `<ellipse cx="220" cy="1086" rx="210" ry="14" fill="#000" opacity=".2" filter="url(#blur2)"/><path d="M30,1080 V900 M410,1080 V960" stroke="#8a9298" stroke-width="8"/><rect x="30" y="990" width="380" height="40" rx="6" fill="#dfe6e8"/>` +
    `<rect x="40" y="972" width="110" height="34" rx="16" fill="#fff"/><ellipse cx="96" cy="958" rx="26" ry="22" fill="#b07a55"/><path d="M72,952 q20,-26 50,-4 q-24,-8 -50,4Z" fill="#2a1d16"/><path d="M110,956 q4,3 8,0" stroke="#3a2418" stroke-width="2" fill="none"/>` +
    `<path d="M120,1000 Q200,950 300,968 Q380,980 410,996 L410,1030 L120,1030Z" fill="#7aa8c8"/><path d="M130,996 Q210,958 300,974" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/>`;
  // the doctor: white coat, stethoscope
  s += man(500, 1120, .92, -1, 5, { top: '#f4f6f8', pants: '#2a3a5a', hB: [450, 1000], aF: [.2, .55] });
  { const [cx, cy] = HP.chest; s += `<path d="M${cx - 12},${cy - 44} q-6,40 6,60 q10,14 20,-2 q8,-24 2,-58" stroke="#2a2a30" stroke-width="3" fill="none"/><circle cx="${cx + 2}" cy="${cy + 20}" r="6" fill="#c8ccd2" stroke="#2a2a30" stroke-width="2"/>` +
    `<rect x="${cx - 4}" y="${cy - 4}" width="16" height="22" rx="2" fill="#fff" stroke="#c8ccd2"/>`; }
  // 18 years: 12 at school, 6 of medicine
  if (ba > 0) { let g = panel(40, 1136, 640, 110); const n = Math.floor(fill * 18.99);
    for (let i = 0; i < 18; i++) { const x = 650 - (i + 1) * 33, on = i < n; g += `<rect x="${x}" y="1150" width="29" height="40" rx="5" fill="${on ? (i < 12 ? '#4a8ad8' : '#f4c76b') : '#2a3040'}"/>`; }
    g += lbl(452, 1230, 'المدرسة: ١٢', 1, '#8ab8f0', 24) + lbl(155, 1230, 'الطبّ: ٦', ease(ramp(t, WS(7, 9), WS(7, 9) + .3)), '#f4c76b', 24);
    s += `<g opacity="${ba.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: half the fall in child deaths since 1970 comes from mothers' schooling ----------
function sceneMothers(t) {
  const t0 = S0(8) - .2, T = t - t0, ca = ease(ramp(t, WS(8, 1) - .3, WS(8, 1) + .2)), b2 = ease(ramp(t, WS(8, 5) - .2, WS(8, 10))), gd = ease(ramp(t, WS(8, 12) - .2, WS(8, 14) + .2));
  let s = `<defs>${SCD()}<linearGradient id="roomW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a5a"/><stop offset="1" stop-color="#6a4e42"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#roomW)"/>`;
  s += Array.from({ length: 16 }, (_, i) => `<path d="M${i * 48},380 V980" stroke="#5a4036" stroke-width="2" opacity=".35"/>`).join('') + `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  // a night window, a floor lamp
  s += `<rect x="520" y="420" width="170" height="250" fill="#f0e4d0"/><rect x="532" y="432" width="146" height="226" fill="#16224a"/><circle cx="640" cy="480" r="14" fill="#f2eee2"/><path d="M605,432 V658 M532,545 H678" stroke="#f0e4d0" stroke-width="7"/>`;
  s += `<path d="M80,1080 V700" stroke="#3a3030" stroke-width="6"/><path d="M40,700 L120,700 L104,640 L56,640Z" fill="#f4dca0"/>` + scr(`<circle cx="80" cy="690" r="340" fill="url(#lampW)" opacity=".9"/>`);
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#5a3e2a"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="996" width="760" height="8" fill="#3a2618"/>`;
  // the sofa, the mother reading a book to her child
  const by = 1150;
  s += `<rect x="150" y="${by - 230}" width="420" height="120" rx="30" fill="#3a5a6a"/><rect x="150" y="${by - 130}" width="420" height="96" rx="20" fill="#4a6a7a"/><rect x="130" y="${by - 160}" width="50" height="130" rx="20" fill="#3a5a6a"/><rect x="540" y="${by - 160}" width="50" height="130" rx="20" fill="#3a5a6a"/>` +
    `<rect x="150" y="${by - 130}" width="420" height="8" fill="#fff" opacity=".12"/><path d="M180,${by - 34} v26 M540,${by - 34} v26" stroke="#2a1a10" stroke-width="10"/>`;
  const bx = 380, bk = by - 150;
  s += man(320, by - 30, .86, 1, 1, Object.assign({}, SEAT, { top: '#a83a4a', hair: '#1a1210', lean: 4, hF: [bx + 6, bk - 4], hB: [bx - 10, bk + 6] }));
  s += kid(440, by - 30, .62, -1, 4, Object.assign({}, SEAT, { top: '#e8b84a', lean: 12, hF: [bx + 26, bk + 14], hB: [470, by - 120] }), '');
  s += `<path d="M${bx - 34},${bk} L${bx},${bk + 10} L${bx + 34},${bk} L${bx + 34},${bk - 40} L${bx},${bk - 30} L${bx - 34},${bk - 40}Z" fill="#f4ecd8"/><path d="M${bx},${bk + 10} V${bk - 30}" stroke="#a89878" stroke-width="2"/><path d="M${bx - 34},${bk - 40} L${bx - 34},${bk}" stroke="#2a6a9a" stroke-width="4"/>` +
    [0, 1, 2].map(i => `<path d="M${bx - 28},${bk - 30 + i * 9} l22,4 M${bx + 6},${bk - 26 + i * 9} l22,-4" stroke="#8a8a8a" stroke-width="1.5"/>`).join('');
  // the chart: child deaths a year, 1970 vs 2009; the fall, half of it gold
  if (ca > 0) { const base = 860, H1 = 330, H2 = H1 * (1 - 8.2 / 16.4) , xa = 200, xb = 420, w = 130;
    let g = panel(90, 400, 540, 540);
    g += `<rect x="${xa}" y="${base - H1}" width="${w}" height="${H1}" rx="6" fill="#8a9098"/>` + lbl(xa + w / 2, base + 44, '١٩٧٠', 1, '#fff', 28);
    const h2 = lerp(H1, H2, b2); g += `<rect x="${xb}" y="${(base - h2).toFixed(1)}" width="${w}" height="${h2.toFixed(1)}" rx="6" fill="#8a9098"/>` + lbl(xb + w / 2, base + 44, '٢٠٠٩', 1, '#fff', 28);
    if (b2 > .95) { const gap = H1 - H2, half = gap * 4.2 / 8.2; g += `<rect x="${xb}" y="${base - H1}" width="${w}" height="${gap}" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="8 6" opacity=".7"/>` +
      `<rect x="${xb}" y="${(base - H2 - half).toFixed(1)}" width="${w}" height="${half.toFixed(1)}" rx="6" fill="#f4c76b" opacity="${gd.toFixed(2)}"/>` +
      lbl(xb + w / 2, base - H1 + 34, '٨٫٢ مليون', 1, '#fff', 24) + lbl(xb + w / 2, base - H1 + 62, 'أقلّ', 1, '#fff', 22) + `<g opacity="${gd.toFixed(2)}">${lbl(xb + w / 2, base - H2 - half / 2 + 10, '٤٫٢ مليون', 1, '#1a1208', 24).replace('stroke="#000"', 'stroke="#f4c76b"')}</g>`; }
    g += lbl(360, 452, 'وَفَيَاتُ الأطفال في السنة', 1, '#fff', 26);
    s += `<g opacity="${ca.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
