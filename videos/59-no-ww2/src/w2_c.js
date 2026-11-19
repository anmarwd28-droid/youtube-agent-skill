// w2_c.js: #59 scenes 13-16: independence after the war (more than 80 colonies), the microwave born from radar, the end; scene list, chips, list
// capitals of colonies that became independent after 1945 (lat, lon, year)
const INDEP = [[33.5, 36.3, 1946], [31.95, 35.9, 1946], [14.6, 121.0, 1946], [28.6, 77.2, 1947], [33.7, 73.0, 1947], [16.8, 96.2, 1948], [6.9, 79.9, 1948], [-6.2, 106.8, 1949], [32.9, 13.2, 1951], [11.55, 104.9, 1953], [17.97, 102.6, 1953], [21.0, 105.85, 1954],
  [15.6, 32.5, 1956], [34.0, -6.8, 1956], [36.8, 10.2, 1956], [5.6, -.2, 1957], [3.1, 101.7, 1957], [9.5, -13.7, 1958], [3.87, 11.5, 1960], [14.7, -17.4, 1960], [6.1, 1.2, 1960], [-18.9, 47.5, 1960], [-4.3, 15.3, 1960], [2.0, 45.3, 1960], [6.5, 2.6, 1960], [13.5, 2.1, 1960],
  [12.4, -1.5, 1960], [5.3, -4.0, 1960], [12.1, 15.0, 1960], [4.4, 18.6, 1960], [.4, 9.45, 1960], [12.6, -8.0, 1960], [9.06, 7.5, 1960], [18.1, -15.95, 1960], [35.2, 33.4, 1960], [8.5, -13.2, 1961], [-6.8, 39.3, 1961], [29.4, 48.0, 1961], [36.75, 3.06, 1962], [.35, 32.6, 1962],
  [-1.95, 30.06, 1962], [-3.4, 29.4, 1962], [18.0, -76.8, 1962], [10.65, -61.5, 1962], [-1.3, 36.8, 1963], [-13.97, 33.8, 1964], [-15.4, 28.3, 1964], [35.9, 14.5, 1964], [13.45, -16.6, 1965], [1.35, 103.8, 1965], [4.17, 73.5, 1965], [-24.65, 25.9, 1966], [-29.3, 27.5, 1966],
  [6.8, -58.15, 1966], [13.1, -59.6, 1966], [12.8, 45.0, 1967], [-20.16, 57.5, 1968], [-26.3, 31.1, 1968], [3.75, 8.78, 1968], [-18.1, 178.4, 1970], [26.2, 50.6, 1971], [25.3, 51.5, 1971], [24.45, 54.4, 1971], [25.05, -77.35, 1973], [11.86, -15.6, 1974], [-25.97, 32.6, 1975],
  [-8.84, 13.23, 1975], [14.9, -23.5, 1975], [-9.44, 147.2, 1975], [5.85, -55.2, 1975], [-11.7, 43.25, 1975], [11.6, 43.15, 1977], [-9.43, 159.95, 1978], [-17.8, 31.05, 1980], [-17.7, 168.3, 1980], [17.25, -88.77, 1981], [4.9, 114.9, 1984], [-22.56, 17.08, 1990]];
const INL = [[28.6, 77.2, 'الهند ١٩٤٧', -1], [-6.2, 106.8, 'إندونيسيا ١٩٤٩', -1], [5.6, -.2, 'غانا ١٩٥٧', 1], [36.75, 3.06, 'الجزائر ١٩٦٢', 1], [-1.3, 36.8, 'كينيا ١٩٦٣', -1]];

// ---------- 13: after the war the empires weakened and more than 80 colonies became independent; without it, maybe decades later ----------
function sceneColon(t) {
  const t0 = S0(10) - .2, T = t - t0, yq = ramp(t, WS(10, 3) - .3, S0(11) - .5), yr = Math.round(1945 + 45 * yq), gr = ease(ramp(t, WS(11, 2) - .2, WS(11, 6)));
  const G = gAt(t, 360, 720, { d: lerp(8.0, 7.4, ease(clamp(T / 8))), el: .12, lon: lerp(22, 52, ease(clamp(T / 9))), clouds: .35, lights: .3, off: -.6 });
  let o = `<defs>${W2D()}</defs>`;
  INDEP.forEach(([la, lo, y], i) => { const k = clamp((yr - y + 1) / 2); if (k <= 0 || yq <= 0) return; const v = G.vis(la, lo); if (v < .12) return; const [x, y2] = G.P(la, lo, 1.01), a = k * clamp((v - .12) / .2), p = .8 + .2 * Math.sin(t * 3 + i);
    const c = mix('#f4c76b', '#8a8a90', gr); o += `<circle cx="${x.toFixed(1)}" cy="${y2.toFixed(1)}" r="${(15 * p * (1 - .35 * gr)).toFixed(1)}" fill="${c}" opacity="${(.4 * a * (1 - .5 * gr)).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y2.toFixed(1)}" r="5" fill="${mix('#fff6d0', '#9a9aa0', gr)}" opacity="${a.toFixed(2)}"/>` + (gr > 0 ? `<circle cx="${x.toFixed(1)}" cy="${y2.toFixed(1)}" r="7" fill="none" stroke="#c8c8cc" stroke-width="1.5" opacity="${(gr * a).toFixed(2)}"/>` : ''); });
  INL.forEach(([la, lo, tx, sd], i) => { const yy = +tx.slice(-4).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d)), k = clamp((yr - yy + 1) / 2) * (1 - gr); if (k <= 0 || yq <= 0 || G.vis(la, lo) < .35) return; const [x, y] = G.P(la, lo, 1.01);
    o += `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${(x + sd * 46).toFixed(1)},${(y - 40).toFixed(1)}" stroke="#fff" stroke-width="2" opacity="${(.7 * k).toFixed(2)}"/>` + lbl((x + sd * 50).toFixed(1), (y - 48).toFixed(1), tx, k.toFixed(2), '#fff', 24, sd > 0 ? 'end' : 'start'); });
  const pa = ease(ramp(t, WS(10, 3) - .5, WS(10, 3))) * (1 - gr);
  if (pa > 0) o += `<g opacity="${pa.toFixed(2)}">${panel(230, 1120, 260, 100)}${lbl(360, 1190, AR4(Math.max(1945, yr)), 1, '#f4c76b', 56)}</g>`;
  if (gr > 0) o += `<g opacity="${gr.toFixed(2)}">${panel(200, 1120, 320, 100)}${lbl(360, 1190, '١٩٤٥ ← ؟', 1, '#cfd6e0', 52)}</g>`;
  F.ov = o; return space(t);
}

// ---------- 14: the microwave in your kitchen ----------
function sceneKitchen(t) {
  const t0 = S0(12) - .2, T = t - t0;
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#e8dccc"/>`;
  // wall tiles, upper cabinets, a window at dusk
  let tl = ''; for (let y = 640; y < 960; y += 40) for (let x = -20; x < 740; x += 40) tl += `<rect x="${x + 1}" y="${y + 1}" width="38" height="38" fill="${(x / 40 + y / 40) % 2 ? '#f2ece2' : '#ece4d8'}"/>`; s += tl + `<rect x="-20" y="640" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  s += `<rect x="460" y="380" width="230" height="240" fill="#3a4a78"/><rect x="460" y="380" width="230" height="240" fill="url(#dawn39)" opacity=".8"/><path d="M575,380 V620 M460,500 H690" stroke="#f4f0e8" stroke-width="10"/><rect x="452" y="372" width="246" height="256" fill="none" stroke="#f4f0e8" stroke-width="12"/>`;
  s += `<rect x="-20" y="380" width="440" height="230" fill="#7a5a40"/>` + [0, 1, 2].map(i => `<rect x="${-8 + i * 144}" y="392" width="132" height="206" rx="4" fill="#8a6a4c"/><rect x="${110 + i * 144}" y="480" width="6" height="40" rx="3" fill="#d8c8a8"/>`).join('') + `<rect x="-20" y="600" width="440" height="14" fill="#000" opacity=".2"/>`;
  // the counter, the microwave, a bowl turning inside
  s += `<rect x="-20" y="960" width="760" height="30" fill="#5a5048"/><rect x="-20" y="960" width="760" height="8" fill="#fff" opacity=".18"/><rect x="-20" y="990" width="760" height="320" fill="#8a6a4c"/>` + [0, 1, 2, 3].map(i => `<rect x="${-8 + i * 190}" y="1004" width="176" height="290" rx="4" fill="#9a7a5a"/>`).join('');
  const mx = 90, my = 740, mw = 360, mh = 220;
  s += `<g transform="translate(250,960) scale(.62) translate(-270,-960)">` + `<rect x="${mx + 10}" y="${my + mh}" width="${mw}" height="14" fill="#000" opacity=".25" filter="url(#blur2)"/><rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="14" fill="#e4e6ea"/><rect x="${mx}" y="${my}" width="${mw}" height="20" rx="10" fill="#fff" opacity=".5"/>`;
  s += `<rect x="${mx + 18}" y="${my + 20}" width="${mw * .66}" height="${mh - 40}" rx="8" fill="#1a1c20"/><rect x="${mx + 24}" y="${my + 26}" width="${mw * .66 - 12}" height="${mh - 52}" rx="6" fill="#e8a84a" opacity=".75"/>` + scr(`<rect x="${mx + 24}" y="${my + 26}" width="${mw * .66 - 12}" height="${mh - 52}" fill="url(#mwG)" opacity=".7"/>`);
  const ang = T * 2.2, bx = mx + 18 + mw * .33 + Math.sin(ang) * 26; s += `<ellipse cx="${mx + 18 + mw * .33}" cy="${my + mh - 44}" rx="80" ry="12" fill="#c88a3a" opacity=".6"/><path d="M${bx - 44},${my + mh - 80} Q${bx},${my + mh - 30} ${bx + 44},${my + mh - 80}Z" fill="#f4f0e8"/><ellipse cx="${bx}" cy="${my + mh - 80}" rx="44" ry="9" fill="#e8c890"/>`;
  for (let i = 0; i < 3; i++) { const ph = pmod(T * .6 + i / 3, 1); s += `<path d="M${(bx - 14 + i * 14).toFixed(1)},${(my + mh - 90 - ph * 50).toFixed(1)} q6,-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity="${(.6 * Math.sin(ph * Math.PI)).toFixed(2)}"/>`; }
  s += `<path d="M${mx + 18},${my + 20} h${mw * .66} v${mh - 40} h${-mw * .66}Z" fill="none" stroke="#fff" stroke-width="2" opacity=".2"/><path d="M${mx + 40},${my + 40} l60,120" stroke="#fff" stroke-width="10" opacity=".08"/>`;
  const sec = Math.max(0, 15 - Math.floor(T * 2)); s += `<rect x="${mx + mw * .74}" y="${my + 30}" width="${mw * .2}" height="34" rx="4" fill="#0e1a12"/><text x="${mx + mw * .84}" y="${my + 56}" text-anchor="middle" direction="ltr" font-family="Courier New" font-weight="700" font-size="24" fill="#7aff9a">0:${String(sec).padStart(2, '0')}</text>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s += `<rect x="${mx + mw * .75 + c * 22}" y="${my + 80 + r * 26}" width="16" height="16" rx="3" fill="#c8ccd2"/>`;
  s += `<rect x="${mx + mw * .78}" y="${my + mh - 50}" width="${mw * .14}" height="26" rx="5" fill="#a8acb4"/></g>`;
  // a person waiting beside it
  s += hero(560, 1420, { s: 1.75, face: -1, shade: 1, top: '#3a6a8a', pants: '#2a2e3a', skin: '#c89070', hair: '#2a1a12', aF: [.5, 1.9], aB: [-.1, .3] });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ffb060" opacity=".06"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 15: born from the war's radar: a radar engineer, a magnetron, a chocolate bar melting in his pocket (1945) ----------
function radarDish(x, y, s, t) { const c = Math.cos(t * 1.3), w = 120 * Math.max(.12, Math.abs(c));
  let g = `<path d="M${x - 50},${y + 260} L${x - 8},${y + 30} M${x + 50},${y + 260} L${x + 8},${y + 30}" stroke="#3a3e44" stroke-width="6"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${x - 50 + i * 7},${y + 260 - i * 38} L${x + 44 - i * 7},${y + 222 - i * 38} M${x + 50 - i * 7},${y + 260 - i * 38} L${x - 44 + i * 7},${y + 222 - i * 38}" stroke="#3a3e44" stroke-width="3"/>`).join('');
  g += `<ellipse cx="${x}" cy="${y}" rx="${w.toFixed(1)}" ry="110" fill="${c > 0 ? '#c8ccd2' : '#7a7e86'}" stroke="#3a3e44" stroke-width="4"/>` + [-.6, 0, .6].map(q => `<path d="M${(x + q * w).toFixed(1)},${(y - 110 * Math.sqrt(1 - q * q)).toFixed(1)} V${(y + 110 * Math.sqrt(1 - q * q)).toFixed(1)}" stroke="#5a5e66" stroke-width="2"/>`).join('') + `<path d="M${x - w},${y} H${x + w}" stroke="#5a5e66" stroke-width="2"/>`;
  g += `<path d="M${x},${y} L${(x + c * 60).toFixed(1)},${y - 20}" stroke="#2a2e34" stroke-width="5"/>`;
  return `<g transform="scale(${s})" transform-origin="${x} ${y}">${g}</g>`; }
function magnetron(x, y, s, t) { let g = `<rect x="-60" y="-50" width="120" height="100" rx="8" fill="url(#copperB)"/>`; for (let i = 0; i < 7; i++) g += `<rect x="${-56 + i * 16}" y="-70" width="8" height="140" rx="3" fill="#b87a4a" opacity=".85"/>`;
  g += `<circle r="28" fill="#5a2e16"/><circle r="16" fill="#2a1408"/><path d="M60,-18 H150 L190,-50 V50 L150,18 H60Z" fill="#8a9096"/><path d="M60,-18 H150 L190,-50" stroke="#fff" stroke-width="2" opacity=".4" fill="none"/><rect x="-30" y="50" width="60" height="40" fill="#2a2a2e"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`; }
function sceneSpencer(t) {
  const t0 = WS(12, 6) - .3, T = t - t0, ch = ease(ramp(t, WS(12, 9) - .2, WS(12, 11))), melt = ease(ramp(t, WS(12, 10), WS(12, 16)));
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#8a8a80"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  // a big window: the sea, the radar dish turning on its tower
  s += `<rect x="40" y="380" width="640" height="420" fill="url(#bSky)"/><rect x="40" y="690" width="640" height="110" fill="#4a7a9a"/>` + cumulus(200 + T * 4, 480, 200, 17, { a: .8 }) + radarDish(470, 560, .9, t);
  s += `<path d="M40,380 H680 V800 H40Z M253,380 V800 M466,380 V800 M40,590 H680" stroke="#3a3a36" stroke-width="12" fill="none"/>`;
  // the bench and the magnetron, the invisible waves
  s += `<rect x="-20" y="960" width="760" height="350" fill="#4a4038"/><rect x="-20" y="950" width="760" height="20" fill="#6a5a48"/>` + magnetron(250, 900, .7, t);
  for (let i = 0; i < 5; i++) { const ph = pmod(T * .8 + i / 5, 1); s += `<path d="M${(390 + ph * 90).toFixed(1)},${(895 - 45 * (1 + ph)).toFixed(1)} Q${(406 + ph * 116).toFixed(1)},895 ${(390 + ph * 90).toFixed(1)},${(895 + 45 * (1 + ph)).toFixed(1)}" stroke="#ffd8a0" stroke-width="3" fill="none" opacity="${(.4 * Math.sin(ph * Math.PI)).toFixed(2)}"/>`; }
  // the engineer: white shirt, tie, glasses; the pocket faces the horn
  s += hero(590, 1330, { s: 1.45, face: -1, shade: 1, top: '#eceee8', pants: '#4a4a50', skin: '#e0b890', hair: '#8a8680', aF: [.3, .9], aB: [-.1, .3], lookUp: -.15 });
  const [ex, ey] = HP.eye; s += `<circle cx="${(ex - 2).toFixed(1)}" cy="${ey.toFixed(1)}" r="9" fill="none" stroke="#1a1a1a" stroke-width="2.5"/><path d="M${(ex + 7).toFixed(1)},${(ey - 1).toFixed(1)} l16,-2" stroke="#1a1a1a" stroke-width="2.5"/>`;
  const [nx, ny] = [HP.head[0] + 2, HP.head[1] + 40 * 1.45]; const pk = HP.chest; s += `<path d="M${(nx - 2).toFixed(1)},${(ny + 4).toFixed(1)} l-6,16 l6,74 l6,-74Z" fill="#7a2a2a"/>`;
  // the inset: the chocolate bar softening in his pocket
  if (ch > 0) { const cx = 210, cy = 640, R = 150; let g = `<g opacity="${ch.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#f4c76b"/><defs><clipPath id="chI"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#chI)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#eceee8"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
    g += `<path d="M${cx - R},${cy - 40} H${cx + R}" stroke="#d0d2cc" stroke-width="4"/><rect x="${cx - 90}" y="${cy - 40}" width="180" height="160" rx="10" fill="#e4e6e0" stroke="#c8cac4" stroke-width="4"/>`;
    const sag = 30 * melt; g += `<path d="M${cx - 70},${cy - 90} H${cx + 70} V${cy + 10 + sag * .4} Q${cx},${cy + 10 + sag * 1.4} ${cx - 70},${cy + 10 + sag * .4}Z" fill="#5a3418"/><path d="M${cx - 70},${cy - 90} H${cx + 70} V${cy - 50} H${cx - 70}Z" fill="#c8402a"/>`;
    for (let i = 0; i < 3; i++) g += `<rect x="${cx - 60 + i * 42}" y="${cy - 40}" width="36" height="${(40 + sag * .3).toFixed(1)}" rx="${(4 + 10 * melt).toFixed(1)}" fill="#6a4020" opacity="${(1 - .7 * melt).toFixed(2)}"/>`;
    [[-30, .9], [10, 1.2], [44, .7]].forEach(([dx, k]) => g += `<path d="M${cx + dx - 6},${cy + 20} Q${cx + dx},${(cy + 20 + 70 * melt * k).toFixed(1)} ${cx + dx + 6},${cy + 20}Z" fill="#5a3418" opacity="${melt.toFixed(2)}"/><circle cx="${cx + dx}" cy="${(cy + 22 + 70 * melt * k).toFixed(1)}" r="${(6 * melt).toFixed(1)}" fill="#5a3418"/>`);
    g += `<rect x="${cx - 90}" y="${cy - 40}" width="180" height="160" rx="10" fill="#f0f2ec" opacity=".35"/><path d="M${cx - 90},${cy - 40} H${cx + 90}" stroke="#c8cac4" stroke-width="5"/></g></g>`;
    s += g + `<path d="M${210 + 150 * .7},${640 + 150 * .7} L${(pk[0] + 6).toFixed(1)},${(pk[1] - 10).toFixed(1)}" stroke="#f4c76b" stroke-width="3" opacity="${(ch * .8).toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 16: would the world have been better? Comment, subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(13, 0) - .2, WS(13, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, T = t - (S0(13) - .2);
  gAt(t, 360, 760, { d: lerp(9.4, 9.0, ease(clamp(T / 3))), el: .3, lon: 20 + T * 7, clouds: .45, lights: .4, off: -.6 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(13, 9) - .3, WS(13, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}

const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneDawn }, { s: WS(1, 9) - .3, f: sceneSpread }, { s: S0(2) - .2, f: sceneDead }, { s: S0(3) - .2, f: sceneFamily }, { s: WS(3, 8) - .3, f: sceneTree },
  { s: S0(4) - .2, f: sceneWarsaw }, { s: S0(5) - .2, f: sceneHiro }, { s: S0(6) - .2, f: sceneLab }, { s: S0(7) - .2, f: scenePetri }, { s: WS(7, 7) - .3, f: sceneFactory }, { s: S0(8) - .2, f: sceneComp },
  { s: S0(9) - .2, f: sceneReactor }, { s: WS(9, 3) - .3, f: sceneRocket }, { s: S0(10) - .2, f: sceneColon }, { s: S0(12) - .2, f: sceneKitchen }, { s: WS(12, 6) - .3, f: sceneSpencer }, { s: S0(13) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneSpread, sceneColon, sceneRocket]);
const XF = .5;
const TLI = [['البنسلين', S0(7)], ['الحاسوب', S0(8)], ['المفاعل', S0(9)], ['الصاروخ', WS(9, 3)]];
const LIST_ON = new Set([sceneLab, sceneComp]);
const CHIPS = [
  ['c0', '١٩٣٩ – ١٩٤٥', 360, 1200, 'big', WS(0, 4), S0(1) - .3],
  ['c1', '١ سبتمبر ١٩٣٩', 360, 330, 'big', WS(1, 0), WS(1, 9) - .1],
  ['c1b', 'أكبرُ حربٍ في التاريخ', 360, 330, 'red big', WS(1, 9), WS(1, 14) - .1],
  ['c1c', '٦ سنوات', 360, 330, 'big', WS(1, 14), S0(2) - .3],
  ['c2', '٣ من كلِّ ١٠٠', 360, 330, 'red big', WS(2, 7), S0(3) - .3],
  ['c3', 'لو لم تَقُم…', 360, 330, 'ice', WS(3, 0), WS(3, 8) - .1],
  ['c3b', 'ملايينُ العائلات', 360, 330, 'big', WS(3, 8), S0(4) - .3],
  ['c4', 'وارسو ١٩٤٥', 360, 330, 'big', WS(4, 1), WS(4, 4) - .1],
  ['c4b', 'أكثرُ من ٨٠٪ دُمِّر', 360, 330, 'red big', WS(4, 4), WS(4, 11) - .1],
  ['c4c', 'كانت ستبقى', 360, 330, 'big', WS(4, 11), S0(5) - .3],
  ['c5', 'هيروشيما وناغازاكي ١٩٤٥', 360, 330, 'big', WS(5, 1), WS(5, 4) - .1],
  ['c5b', 'لم تُضرَبا', 360, 330, 'big', WS(5, 4), S0(6) - .3],
  ['c6', 'الحربُ سرّعتِ العلم', 360, 330, 'big', WS(6, 1), S0(7) - .3],
  ['c7', 'البنسلين ١٩٢٨', 360, 330, 'big', WS(7, 1), WS(7, 7) - .1],
  ['c7b', 'إنتاجٌ بالملايين', 360, 330, 'big', WS(7, 10), S0(8) - .3],
  ['c8', 'أوّلُ الحواسيب ١٩٤٤ – ١٩٤٥', 300, 330, 'big', WS(8, 0), S0(9) - .3],
  ['c9', 'أوّلُ مفاعل — ١٩٤٢', 360, 330, 'big', WS(9, 0), WS(9, 3) - .1],
  ['c9b', 'الفضاء — ١٩٤٤', 300, 330, 'big', WS(9, 3) + .2, S0(10) - .3],
  ['c10', 'ضعُفتِ الإمبراطوريّات', 360, 330, 'big', WS(10, 0), WS(10, 3) - .1],
  ['c10b', '+٨٠ مستعمرةً استقلّت', 360, 330, 'big', WS(10, 3), S0(11) - .3],
  ['c11', 'ربّما… لعقودٍ أطول', 360, 330, 'ice', WS(11, 2), S0(12) - .3],
  ['c12', 'والغريب؟', 360, 330, 'big', WS(12, 0), WS(12, 6) - .1],
  ['c12b', 'رادارُ الحرب', 360, 330, 'big', WS(12, 6), WS(12, 9) - .1],
  ['c12c', '١٩٤٥ — شوكولاتةٌ ذائبة', 360, 330, 'big', WS(12, 9), S0(13) - .3],
  ['c13', '@MadhaLawLab', 360, 1200, 'dark', WS(13, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ما سرّعته الحرب</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
