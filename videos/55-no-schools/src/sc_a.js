// ===================== "what if schools vanished from the world?" (Short #55) =====================
// helpers: the #54 chain (tm_a/tm_b, without tm_c.js). Scenes 0-4: the school vanishes, 1.5 billion at home, 2020, back in time, the campfire.
const SCDEF = `<linearGradient id="brickW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8553a"/><stop offset="1" stop-color="#8a4430"/></linearGradient>` +
  `<pattern id="brkS" width="28" height="14" patternUnits="userSpaceOnUse"><path d="M0,.5 H28 M0,7.5 H28 M7,0 V7 M21,7 V14" stroke="#5a2a1a" stroke-width="1.2" opacity=".55"/></pattern>` +
  `<linearGradient id="clsWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc4"/><stop offset="1" stop-color="#cdbd9c"/></linearGradient>` +
  `<linearGradient id="clsFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6644"/><stop offset="1" stop-color="#5a3e28"/></linearGradient>` +
  `<linearGradient id="deskT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c89a62"/><stop offset="1" stop-color="#a87a48"/></linearGradient>` +
  `<linearGradient id="beamC" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>` +
  `<radialGradient id="fireG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb24a" stop-opacity=".75"/><stop offset=".45" stop-color="#ff7a2a" stop-opacity=".3"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="nightG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a1c"/><stop offset=".7" stop-color="#121a36"/><stop offset="1" stop-color="#22243a"/></linearGradient>` +
  `<linearGradient id="mudW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfa878"/><stop offset="1" stop-color="#b08a5c"/></linearGradient>` +
  `<pattern id="mudB" width="40" height="18" patternUnits="userSpaceOnUse"><path d="M0,.5 H40 M0,9.5 H40 M10,0 V9 M30,9 V18" stroke="#8a6a44" stroke-width="1.4" opacity=".45"/></pattern>`;
const SCD = () => TMDEFS2() + HIDEF2 + DEFS() + SCDEF;
const AR4 = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// a child = the house person, smaller, with a school bag on the back (drawn first so the body covers it)
function kid(x, y, s, f, pi, o = {}, bag = '#d8402a') {
  const p = bag ? `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(f * s).toFixed(3)},${s})"><rect x="-50" y="-250" width="38" height="92" rx="12" fill="${bag}"/><rect x="-50" y="-250" width="38" height="92" rx="12" fill="url(#torsoSh)"/><rect x="-46" y="-196" width="28" height="26" rx="6" fill="#000" opacity=".18"/><path d="M-46,-238 h26" stroke="#fff" stroke-width="2" opacity=".25"/></g>` : '';
  return p + man(x, y, s, f, pi, o);
}
// particles drifting up from a rectangle (a building dissolving)
function dissolveR(x0, y0, w, h, k, seed, cols) {
  if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < 260; i++) { const x = x0 + r() * w, y = y0 + r() * h, f = clamp((k - r() * .5) / .5); if (f <= 0) continue;
    const dx = (r() - .4) * 140 * f, dy = -(60 + r() * 260) * f, z = 3 + r() * 7;
    s += `<rect x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" width="${z.toFixed(1)}" height="${(z * .6).toFixed(1)}" fill="${cols[i % cols.length]}" opacity="${((1 - f) * .95).toFixed(2)}" transform="rotate(${(r() * 90).toFixed(0)},${(x + dx).toFixed(1)},${(y + dy).toFixed(1)})"/>`; }
  return s;
}
// a two-storey brick school (a new building for this video): x0 left, base y, width w, height h
function schoolB(x0, base, w, h, t) {
  const top = base - h, cx = x0 + w / 2;
  let s = `<rect x="${x0}" y="${top}" width="${w}" height="${h}" fill="url(#brickW)"/><rect x="${x0}" y="${top}" width="${w}" height="${h}" fill="url(#brkS)"/><rect x="${x0}" y="${top}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".22"/>`;
  s += `<rect x="${x0}" y="${top}" width="14" height="${h}" fill="#000" opacity=".14"/><rect x="${x0 + w - 18}" y="${top}" width="18" height="${h}" fill="#000" opacity=".22"/>`;
  // stone bands, cornice, the central bay with a pediment
  [top + 16, top + h * .5].forEach(y => s += `<rect x="${x0 - 6}" y="${y}" width="${w + 12}" height="10" fill="#e8dcc4"/><rect x="${x0 - 6}" y="${y + 9}" width="${w + 12}" height="4" fill="#000" opacity=".25"/>`);
  s += `<rect x="${x0 - 10}" y="${top - 10}" width="${w + 20}" height="16" fill="#efe4cc"/><rect x="${x0 - 10}" y="${top + 5}" width="${w + 20}" height="5" fill="#000" opacity=".3"/>`;
  s += `<rect x="${cx - 70}" y="${top - 6}" width="140" height="${h + 6}" fill="#b4603f"/><rect x="${cx - 70}" y="${top - 6}" width="140" height="${h + 6}" fill="url(#brkS)"/><rect x="${cx + 56}" y="${top - 6}" width="14" height="${h + 6}" fill="#000" opacity=".2"/>` +
    `<path d="M${cx - 82},${top - 6} L${cx},${top - 66} L${cx + 82},${top - 6}Z" fill="#efe4cc"/><path d="M${cx - 64},${top - 14} L${cx},${top - 54} L${cx + 64},${top - 14}Z" fill="#c8b898"/><path d="M${cx},${top - 66} L${cx + 82},${top - 6} L${cx},${top - 6}Z" fill="#000" opacity=".14"/>`;
  // a round clock-less window in the pediment, then the windows: two floors, kids' paper drawings on some
  s += `<circle cx="${cx}" cy="${top - 30}" r="12" fill="#3a5270"/><circle cx="${cx}" cy="${top - 30}" r="12" fill="none" stroke="#fff" stroke-width="3"/>`;
  const r = RS(55), DR = ['#f4c84a', '#e84a5a', '#4aa0e8', '#5ab85a'];
  [top + 40, top + h * .5 + 26].forEach((wy, fl) => {
    for (let j = 0; j < 6; j++) { const wx = x0 + 20 + j * ((w - 40) / 6) + ((w - 40) / 6 - 40) / 2; if (wx + 40 > cx - 74 && wx < cx + 74) continue;
      s += `<rect x="${wx - 5}" y="${wy - 5}" width="50" height="${h * .5 - 70}" fill="#efe4cc"/><rect x="${wx}" y="${wy}" width="40" height="${h * .5 - 80}" fill="#3e5a78"/><path d="M${wx},${wy + h * .25 - 40} h40 M${wx + 20},${wy} v${h * .5 - 80}" stroke="#efe4cc" stroke-width="4"/>` +
        `<path d="M${wx + 4},${wy + 30} L${wx + 22},${wy + 4}" stroke="#fff" stroke-width="6" opacity=".18"/><rect x="${wx - 8}" y="${wy + h * .5 - 80}" width="56" height="6" fill="#e8dcc4"/><rect x="${wx - 8}" y="${wy + h * .5 - 74}" width="56" height="3" fill="#000" opacity=".25"/>`;
      if (r() < .55) { const c = DR[Math.floor(r() * 4)], px = wx + 4 + r() * 12, py = wy + 6 + r() * 10; s += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="15" height="18" fill="#fffef4"/><circle cx="${(px + 7.5).toFixed(1)}" cy="${(py + 7).toFixed(1)}" r="4" fill="${c}"/><path d="M${(px + 2).toFixed(1)},${(py + 15).toFixed(1)} h11" stroke="#5ab85a" stroke-width="2"/>`; } } });
  // the central windows above the door, the plaque, the door with steps
  s += `<rect x="${cx - 46}" y="${top + 40}" width="92" height="${h * .5 - 80}" fill="#3e5a78"/><path d="M${cx},${top + 40} v${h * .5 - 80} M${cx - 46},${top + h * .25 - 20} h92" stroke="#efe4cc" stroke-width="4"/><rect x="${cx - 52}" y="${top + 34}" width="104" height="${h * .5 - 68}" fill="none" stroke="#efe4cc" stroke-width="6"/>`;
  s += `<rect x="${cx - 62}" y="${top + h * .5 + 18}" width="124" height="38" rx="4" fill="#f4ecd8"/><rect x="${cx - 62}" y="${top + h * .5 + 18}" width="124" height="38" rx="4" fill="none" stroke="#8a6a3a" stroke-width="2"/>` +
    `<text x="${cx}" y="${top + h * .5 + 47}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#5a2a1a">مدرسة</text>`;
  const dt = top + h * .5 + 66;
  s += `<path d="M${cx - 42},${base - 18} V${dt + 36} a42,36 0 0 1 84,0 V${base - 18}Z" fill="#efe4cc"/><path d="M${cx - 34},${base - 18} V${dt + 40} a34,30 0 0 1 68,0 V${base - 18}Z" fill="#2a4a3a"/>` +
    `<path d="M${cx},${dt + 12} V${base - 18}" stroke="#1a3024" stroke-width="3"/><rect x="${cx - 28}" y="${dt + 60}" width="22" height="40" fill="#1a3024" opacity=".5"/><rect x="${cx + 6}" y="${dt + 60}" width="22" height="40" fill="#1a3024" opacity=".5"/><circle cx="${cx - 6}" cy="${base - 60}" r="3" fill="#c8a040"/><circle cx="${cx + 6}" cy="${base - 60}" r="3" fill="#c8a040"/>` +
    `<rect x="${cx - 60}" y="${base - 18}" width="120" height="9" fill="#d8ccb4"/><rect x="${cx - 70}" y="${base - 9}" width="140" height="9" fill="#c8bca4"/><rect x="${cx - 70}" y="${base - 2}" width="140" height="2" fill="#000" opacity=".25"/>`;
  // a low railing at the base of the side wings
  [[x0 + 6, cx - 80], [cx + 80, x0 + w - 6]].forEach(([a, b]) => { s += `<path d="M${a},${base - 34} H${b}" stroke="#2a2a2a" stroke-width="3"/>` + Array.from({ length: Math.floor((b - a) / 12) + 1 }, (_, i) => `<path d="M${a + i * 12},${base} V${base - 34}" stroke="#2a2a2a" stroke-width="2"/>`).join(''); });
  return s;
}
// an empty plot where the school stood: bare earth, weeds
function emptyLot(x0, base, w) {
  const r = RS(77); let s = `<path d="M${x0},${base} L${x0 + 10},${base - 26} Q${x0 + w / 2},${base - 40} ${x0 + w - 10},${base - 24} L${x0 + w},${base}Z" fill="#8a7458"/><path d="M${x0},${base} L${x0 + 10},${base - 26} Q${x0 + w / 2},${base - 40} ${x0 + w - 10},${base - 24} L${x0 + w},${base}Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 40; i++) { const x = x0 + 14 + r() * (w - 28), y = base - 4 - r() * 20, h = 8 + r() * 16; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(r() * 6 - 3).toFixed(1)},${(-h / 2).toFixed(1)} ${(r() * 8 - 4).toFixed(1)},${(-h).toFixed(1)}" stroke="${mix('#5a7a3a', '#8a9a4a', r())}" stroke-width="2" fill="none"/>`; }
  return s;
}
// the street for this video: brick and stone houses around a school (o.sk = how far the school has dissolved)
function street12(t, o = {}) {
  const N = o.N || 0, id = o.id || 's', sk = o.sk || 0;
  const sky = [mix('#3a76c0', '#060c24', N), mix('#a2c6e8', '#16224a', N), mix('#f4e6c8', '#3a3660', N)];
  let s = `<defs>${DEFN()}${SCDEF}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  s += sun3(150, 430, 1 - N) + cumulus(220 + t * 2, 480, 240, 31, { a: .85 * (1 - N) }) + cumulus(610 + t * 1.2, 560, 190, 33, { a: .7 * (1 - N) });
  let g = farCity(91, 905, mix(sky[2], '#5a6478', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-20, 150, 400, '#d8c49a', 821, 2], [560, 180, 380, '#8a9aa8', 824, 0]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  g += emptyLot(150, PV, 420);
  if (sk < 1) g += `<g opacity="${(1 - sk).toFixed(2)}">${schoolB(150, PV, 420, 360, t)}</g>`;
  g += dissolveR(150, PV - 420, 420, 420, sk, 9, ['#a8553a', '#8a4430', '#efe4cc', '#3e5a78']);
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4baa8"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a49a88" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 48 + 8},${PV} L${q * 48 - 4},${KB}" stroke="#a49a88" stroke-width="1.4"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4e4e54"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>`;
  // a zebra crossing in front of the school
  for (let i = 0; i < 6; i++) g += `<path d="M${250 + i * 40},${KB + 22} L${236 + i * 44},1290" stroke="#e8e4d8" stroke-width="22" opacity=".85"/>`;
  [[86, 270, 171], [654, 250, 173]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  g += o.mid || '';
  if (o.cars !== 0) g += car(o.carX || 600, 1180, .95, '#e8c23a', -1, 0);
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (o.top) s += o.top;
  return s;
}
// ---------- 0: children walk to school; the school dissolves; they stop and look ----------
function sceneHook(t) {
  const sk = ease(ramp(t, WS(0, 3) - .1, WS(0, 6) + .2)), st = ease(ramp(t, WS(0, 3) + .2, WS(0, 5)));
  const K = [[40, 1, .6, 1, '#d8402a', 0], [150, 1, .56, 4, '#2a6ab8', 1], [640, -1, .58, 6, '#e8a02a', 2], [540, -1, .62, 2, '#5a3a8a', 3]];
  let fg = '';
  K.forEach(([x0, f, sc, pi, bg, j]) => { const tt = Math.min(t, WS(0, 3) + .3 + j * .1), xx = x0 + f * tt * 34, moving = t < WS(0, 3) + .3 + j * .1;
    fg += kid(xx, 1082 + j * 6, sc, moving ? f : (j % 2 ? f : -f), pi, moving ? { walk: xx / (26 * sc) + j } : { lookUp: st * .6 }, bg); });
  fg += man(470, 1100, .86, -1, 7, t < WS(0, 3) + .4 ? { walk: (470 - Math.min(t, WS(0, 3) + .4) * 30) / 22 } : { lookUp: st * .7 });
  return street12(t, { sk, fg, cars: 0 });
}
// ---------- 1: one morning: more than 1.5 billion students stay at home (the Earth) ----------
function sceneHome(t) {
  const t0 = S0(1) - .2, T = t - t0, n = ease(ramp(t, WS(1, 5) - .3, WS(1, 8) + .2));
  gAt(t, 360, 720, { d: lerp(8.6, 7.4, ease(clamp(T / 4.5))), el: .3, lon: 30 + T * 6, clouds: .4, lights: .5, off: lerp(-1.4, -.5, ease(clamp(T / 4))) });
  const v = Math.round(1.5e9 * n);
  F.ov = `<g opacity="${ease(ramp(t, WS(1, 5) - .3, WS(1, 5))).toFixed(2)}">${panel(130, 1060, 460, 120)}${lbl(360, 1120, (n < .999 ? AR4((v / 1e9).toFixed(2)).replace(".", "٫") : "+١٫٥") + " مليار", 1, "#f4c76b", 44)}${lbl(360, 1160, 'طالبٍ في البيوت', 1, '#fff', 26)}</g>`;
  return space(t);
}
// ---------- 2: 2020: the classrooms really did close ----------
function deskC(x, y, s, o = {}) {   // a school desk seen from the front-side, with a chair upside down on it (o.up)
  let g = `<ellipse cx="0" cy="6" rx="120" ry="12" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-96,-118 V0 M96,-118 V0 M-80,-110 V-12 M80,-110 V-12" stroke="#4a4a52" stroke-width="7"/><path d="M-96,-40 H96" stroke="#4a4a52" stroke-width="4"/>` +
    `<path d="M-110,-130 L110,-130 L100,-116 L-100,-116Z" fill="url(#deskT)"/><path d="M-110,-130 L110,-130" stroke="#e0b880" stroke-width="2"/><rect x="-100" y="-116" width="200" height="10" fill="#7a5430"/>` +
    `<rect x="-88" y="-106" width="176" height="40" fill="#5a4030" opacity=".55"/>`;
  if (o.up) g += `<g transform="translate(0,-130)"><rect x="-56" y="-14" width="112" height="14" rx="3" fill="#3a5a8a"/><rect x="-56" y="-14" width="112" height="4" fill="#fff" opacity=".2"/>` +
    `<path d="M-48,-14 V-96 M48,-14 V-96 M-38,-14 V-84 M38,-14 V-84" stroke="#5a5a62" stroke-width="6"/><rect x="-54" y="-58" width="108" height="34" rx="6" fill="#3a5a8a" transform="translate(0,${-40})"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function motes(x0, y0, w, h, t, n, seed) { const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = x0 + pmod(r() * w + t * (6 + r() * 8), w), y = y0 + pmod(r() * h - t * (4 + r() * 6), h); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + r() * 1.8).toFixed(1)}" fill="#fff8e0" opacity="${(.25 + .5 * r() * (.6 + .4 * Math.sin(t * 2 + i))).toFixed(2)}"/>`; }
  return s; }
function sceneClosed(t) {
  const t0 = S0(2) - .2, T = t - t0, ca = ease(ramp(t, WS(2, 6) - .2, WS(2, 7) + .3));
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#clsWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  // the window wall on the right with daylight, the board on the back wall
  s += `<rect x="-20" y="380" width="760" height="10" fill="#b8a888"/>`;
  [[540, 420], [540, 700]].forEach(([wx, wy]) => s += `<rect x="${wx - 10}" y="${wy - 10}" width="180" height="250" fill="#f4ecd8"/><rect x="${wx}" y="${wy}" width="160" height="230" fill="url(#winL)"/><path d="M${wx + 80},${wy} V${wy + 230} M${wx},${wy + 115} H${wx + 160}" stroke="#f4ecd8" stroke-width="8"/>` +
    `<path d="M${wx + 14},${wy + 200} L${wx + 70},${wy + 24}" stroke="#fff" stroke-width="12" opacity=".3"/><rect x="${wx - 14}" y="${wy + 236}" width="188" height="10" fill="#e0d4bc"/>`);
  s += `<rect x="40" y="430" width="440" height="260" rx="6" fill="#6a4a2e"/><rect x="54" y="444" width="412" height="232" fill="url(#boardG)"/><rect x="54" y="444" width="412" height="232" fill="#fff" filter="url(#grainR)" opacity=".08"/><rect x="44" y="686" width="432" height="12" fill="#8a6a4a"/>` +
    `<path d="M80,600 q40,-14 90,0 t110,-4" stroke="#e8ece0" stroke-width="3" fill="none" opacity=".25"/><path d="M90,520 h150 M90,560 h110" stroke="#e8ece0" stroke-width="3" opacity=".2"/>`;
  s += `<g opacity="${ca.toFixed(2)}"><text x="260" y="560" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="54" fill="#f4f2e8" opacity=".9">مُغلَقة</text><text x="260" y="630" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4f2e8" opacity=".8">٢٠٢٠</text></g>`;
  // sunbeams through the windows onto the floor, the floor, then the desks with chairs upside down
  s += `<rect x="-20" y="900" width="760" height="420" fill="url(#clsFloor)"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".25"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 100 - 60},900 L${i * 150 - 260},1300" stroke="#3a2614" stroke-width="2" opacity=".35"/>`).join('') + `<rect x="-20" y="896" width="760" height="10" fill="#6a4a2a"/>`;
  s += scr(`<path d="M540,440 L700,440 L420,1240 L80,1240Z" fill="url(#beamC)" opacity=".6"/>`);
  [[150, 960, .62], [400, 960, .62], [270, 1060, .78], [560, 1070, .78], [120, 1200, .98], [430, 1210, .98]].forEach(([x, y, sc]) => s += deskC(x, y, sc, { up: 1 }));
  s += scr(motes(300, 480, 380, 700, T, 60, 4));
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: back in time, to before the first school (a landscape rolls back to 2000 BC) ----------
function sceneBack(t) {
  const t0 = S0(3) - .2, T = t - t0, k = ease(ramp(t, WS(3, 5) - .2, WS(3, 16) + .2));
  const cyc = k * 5, ph = pmod(cyc, 1), day = .5 - .5 * Math.cos(ph * 6.2832), ang = Math.PI * (1 - ph);
  const top = mix('#0a1030', '#3a76c0', day), mid = mix('#1a2040', '#a8c8e6', day), bot = mix('#2a2848', '#f2e0bc', day);
  let s = `<defs>${SCD()}<linearGradient id="skB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".65" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skB)"/>`;
  { const r = RS(23); for (let i = 0; i < 120; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 800).toFixed(1)}" r="${(.5 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${((1 - day) * (.3 + .6 * r())).toFixed(2)}"/>`; }
  // the sun runs backwards across the sky (right to left)
  const sx = 360 - Math.cos(ang) * 340, sy = 820 - Math.sin(ang) * 380;
  if (k > 0 && k < 1) s += `<g opacity="${(Math.sin(ang) * .95).toFixed(2)}"><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="140" fill="url(#sunW)"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="22" fill="#fffdf2"/></g>`;
  else s += sun3(560, 470, 1);
  s += mountainsR(860, 120, 13, { rock: mix('#2a2a40', '#8a8aa0', day) });
  // layers on the horizon: today's city -> an old walled town -> mud-brick houses -> open plain
  const L1 = 1 - ease(ramp(k, .05, .35)), L2 = ease(ramp(k, .2, .4)) * (1 - ease(ramp(k, .55, .75))), L3 = ease(ramp(k, .6, .8));
  const hz = 900, gc = mix('#3a3a4a', '#b8a888', day);
  if (L1 > 0) s += `<g opacity="${L1.toFixed(2)}">${farCity(51, hz, mix('#2a3040', '#7a8494', day))}</g>`;
  if (L2 > 0) { let g = `<rect x="80" y="${hz - 70}" width="560" height="70" fill="${mix('#3a3430', '#a89070', day)}"/>` + Array.from({ length: 19 }, (_, i) => `<rect x="${80 + i * 30}" y="${hz - 82}" width="16" height="14" fill="${mix('#3a3430', '#a89070', day)}"/>`).join('');
    [[150, 150], [330, 190], [520, 160]].forEach(([x, h]) => g += `<rect x="${x - 26}" y="${hz - h}" width="52" height="${h}" fill="${mix('#2e2a28', '#9a8264', day)}"/><path d="M${x - 32},${hz - h} L${x},${hz - h - 50} L${x + 32},${hz - h}Z" fill="${mix('#2a2020', '#8a4a3a', day)}"/>`);
    g += `<path d="M400,${hz - 70} a60,60 0 0 1 120,0Z" fill="${mix('#2e2a28', '#a89478', day)}"/>`; s += `<g opacity="${L2.toFixed(2)}">${g}</g>`; }
  if (L3 > 0) { let g = ''; const r = RS(5); for (let i = 0; i < 9; i++) { const x = 60 + i * 72 + r() * 20, w = 44 + r() * 30, h = 26 + r() * 18; g += `<rect x="${x.toFixed(1)}" y="${(hz - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${mix('#3a3028', '#b89a70', day)}"/><rect x="${(x + w * .4).toFixed(1)}" y="${(hz - h * .6).toFixed(1)}" width="8" height="${(h * .6).toFixed(1)}" fill="#2a1e14" opacity=".6"/>`; }
    s += `<g opacity="${L3.toFixed(2)}">${g}</g>`; }
  s += `<rect x="-20" y="${hz}" width="760" height="420" fill="${gc}"/><rect x="-20" y="${hz}" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".25"/>` + dunes(t, { seed: 11, y0: hz + 40, n: 3 });
  s += `<rect x="-20" y="${hz}" width="760" height="420" fill="#0a1030" opacity="${((1 - day) * .5).toFixed(2)}"/>`;
  // the year counter
  const yr = Math.round(lerp(2020, -2000, k)), txt = yr >= 0 ? AR4(yr) : AR4(-yr) + ' ق.م';
  s += `${panel(170, 1040, 380, 120)}<text x="360" y="1122" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="${yr < 0 ? '#f4c76b' : '#fff'}">${txt}</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: children learned by copying their parents, and from stories around the fire ----------
function campfire(x, y, t, k = 1) {
  let s = `<ellipse cx="${x}" cy="${y + 4}" rx="70" ry="14" fill="#1a1008"/>`;
  [[-46, -6, 30], [-10, -10, -24], [30, -4, 18]].forEach(([dx, dy, a]) => s += `<rect x="${x + dx - 30}" y="${y + dy - 7}" width="64" height="14" rx="7" fill="#4a2e1a" transform="rotate(${a},${x + dx},${y + dy})"/><rect x="${x + dx - 30}" y="${y + dy - 7}" width="64" height="5" rx="3" fill="#7a5a3a" transform="rotate(${a},${x + dx},${y + dy})"/>`);
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.2832; s += `<ellipse cx="${(x + Math.cos(a) * 66).toFixed(1)}" cy="${(y + Math.sin(a) * 14).toFixed(1)}" rx="13" ry="8" fill="#5a5048"/><ellipse cx="${(x + Math.cos(a) * 66).toFixed(1)}" cy="${(y + Math.sin(a) * 14 - 3).toFixed(1)}" rx="9" ry="4" fill="#8a7a6a" opacity=".6"/>`; }
  const up = (fx, fy, sc, tt) => `<g transform="translate(${fx},${fy}) scale(1,-1)">${flame(0, 0, sc, tt, k)}</g>`;
  s += up(x - 16, y - 4, .5, t) + up(x + 14, y - 2, .42, t + .3) + up(x, y - 6, .66, t + .7);
  return s;
}
function smokeUp(x, y, t, a) { let s = ''; for (let i = 0; i < 7; i++) { const q = pmod(t * .25 + i / 7, 1); s += `<ellipse cx="${(x + Math.sin(q * 5 + i) * 30 * q).toFixed(1)}" cy="${(y - q * 420).toFixed(1)}" rx="${(20 + q * 60).toFixed(1)}" ry="${(16 + q * 40).toFixed(1)}" fill="#8a8a9a" opacity="${(a * .18 * (1 - q)).toFixed(2)}" filter="url(#blur5)"/>`; } return s; }
function sceneFire(t) {
  const t0 = S0(4) - .2, T = t - t0, kn = ease(ramp(t, WS(4, 5) - .2, WS(4, 6) + .2));
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#nightG)"/><g transform="rotate(-24,360,640)"><ellipse cx="360" cy="640" rx="800" ry="120" fill="#3a3a6a" opacity=".3" filter="url(#soft)"/><ellipse cx="380" cy="640" rx="520" ry="50" fill="#c8c0d8" opacity=".14" filter="url(#soft)"/></g>`;
  { const r = RS(41); for (let i = 0; i < 260; i++) { const z = r(); s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 860).toFixed(1)}" r="${(.4 + z * z * 1.5).toFixed(2)}" fill="${z > .92 ? '#ffe0b8' : '#fff'}" opacity="${(.3 + .55 * z * (.7 + .3 * Math.sin(t * 2 + i))).toFixed(2)}"/>`; } }
  s += `<g>${mountainsR(860, 90, 17, { rock: '#121428' })}</g>`;
  { let fr = ''; const r = RS(44); for (let i = 0; i < 26; i++) fr += pine(-20 + i * 30 + r() * 14, 900, 90 + r() * 110, 900 + i, '#0a0c16'); s += fr; }
  s += `<rect x="-20" y="890" width="760" height="420" fill="#1a1610"/><rect x="-20" y="890" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  const fx = 360, fy = 1110;
  { const r = RS(12); for (let i = 0; i < 60; i++) s += `<g opacity=".35">${tuft(r() * 720, 920 + r() * 360, 8 + r() * 10, i)}</g>`; }
  s += scr(`<ellipse cx="${fx}" cy="${fy - 40}" rx="${(420 + 14 * Math.sin(t * 7)).toFixed(1)}" ry="320" fill="url(#fireG)" opacity=".75"/>`);
  // left: a father shows his son how to shape a stone tool; right and front: an elder tells a story to three children
  const sitK = { lF: [2.0, .45], lB: [1.85, .32] };
  let P = '';
  P += man(110, 1050, .78, 1, 3, Object.assign({}, sitK, { top: '#7a5a3a', pants: '#4a3420', lean: 12, hF: [180, 980], hB: [170, 1000] }));
  P += `<path d="M170,982 l16,-10 l10,12 l-14,10Z" fill="#6a6a72"/><path d="M178,986 l8,-4" stroke="#aaaab4" stroke-width="2"/>`;
  P += kid(206, 1060, .52, -1, 5, Object.assign({}, sitK, { top: '#9a7a4a', pants: '#5a4028', lean: 14, hF: [178, 1000 - 4 * Math.sin(t * 6) * kn], hB: [186, 1010] }), '');
  P += man(560, 1060, .8, -1, 8, Object.assign({}, sitK, { top: '#6a4a30', pants: '#3a2a1a', hair: '#c8c4bc', lean: 4, aF: [1.6 + .3 * Math.sin(T * 2.2), 2.4 + .3 * Math.sin(T * 2.2)], hB: [520, 1030] }));
  [[500, 1210, .62, -1, 1, '#8a5a3a'], [200, 1214, .6, 1, 6, '#7a6a3a'], [640, 1150, .6, -1, 2, '#5a4a2a']].forEach(([x, y, sc, f, pi, c]) => P += kid(x, y, sc, f, pi, Object.assign({}, sitK, { top: c, pants: '#3a2a1a', lean: 6, lookUp: .3, hF: [x + f * 50 * sc, y - 60 * sc], hB: [x + f * 40 * sc, y - 56 * sc] }), ''));
  // warm light on the side of each body that faces the fire
  s += `<g>${P}</g>` + scr(`<ellipse cx="${fx}" cy="${fy - 60}" rx="300" ry="200" fill="url(#fireG)" opacity=".35"/>`);
  s += campfire(fx, fy, t) + smokeUp(fx, fy - 120, t, 1);
  { const r = RS(8); for (let i = 0; i < 14; i++) { const q = pmod(t * .6 + r(), 1); s += `<circle cx="${(fx + (r() - .5) * 60 + Math.sin(q * 9 + i) * 20).toFixed(1)}" cy="${(fy - 60 - q * 300).toFixed(1)}" r="${(1.5 + r() * 1.5).toFixed(1)}" fill="#ffc870" opacity="${(1 - q).toFixed(2)}"/>`; } }
  noEarth(); F.ov = ''; return s;
}
