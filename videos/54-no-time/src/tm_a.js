// ===================== "what if humans never discovered time?" (Short #54) =====================
// helpers: the #53 chain (without hi_c.js). Scenes 0-4: the clock tower, the sky clock, the Nile calendar, the lost harvest, Babylon's sixty.
const TMDEF = `<linearGradient id="stoneT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8a88e"/><stop offset=".55" stop-color="#d6c8ae"/><stop offset="1" stop-color="#9a8a72"/></linearGradient>` +
  `<radialGradient id="dialW" cx=".45" cy=".4" r=".65"><stop offset="0" stop-color="#fffdf6"/><stop offset=".8" stop-color="#ece6d6"/><stop offset="1" stop-color="#cfc6b0"/></radialGradient>` +
  `<linearGradient id="skyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a82c4"/><stop offset=".6" stop-color="#a8c8e4"/><stop offset="1" stop-color="#f0e2c4"/></linearGradient>` +
  `<linearGradient id="sandG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b884"/><stop offset="1" stop-color="#b48a58"/></linearGradient>` +
  `<linearGradient id="nileG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8aa0"/><stop offset=".5" stop-color="#3a6a82"/><stop offset="1" stop-color="#2a5268"/></linearGradient>` +
  `<linearGradient id="silt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a44"/><stop offset="1" stop-color="#6a4e30"/></linearGradient>` +
  `<linearGradient id="papy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8d6a8"/><stop offset=".5" stop-color="#dcc690"/><stop offset="1" stop-color="#c8ae74"/></linearGradient>` +
  `<radialGradient id="clayT" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#c8946a"/><stop offset=".7" stop-color="#a87650"/><stop offset="1" stop-color="#7a5236"/></radialGradient>` +
  `<radialGradient id="lampW" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffcf80" stop-opacity=".55"/><stop offset="1" stop-color="#ffcf80" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="pyrL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e4c890"/><stop offset="1" stop-color="#c8a468"/></linearGradient>` +
  `<linearGradient id="fieldG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a9a48"/><stop offset="1" stop-color="#4a6a2a"/></linearGradient>` +
  `<linearGradient id="soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5a3a"/><stop offset="1" stop-color="#4a3420"/></linearGradient>` +
  `<radialGradient id="sunDisk"><stop offset="0" stop-color="#fffdf2"/><stop offset=".5" stop-color="#fff2c8"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="woodT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a24"/><stop offset="1" stop-color="#3a2416"/></linearGradient>`;
const TMDEFS = () => `${TDEFS()}${HIDEF}${TMDEF}`;
const roman = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];
// a clock face (Roman numerals). hh, mm in hours/minutes; o.sec draws a seconds hand; o.k fades the face to blank (0..1 = dissolving)
function dialF(cx, cy, R, hh, mm, o = {}) {
  const v = 1 - (o.k || 0), an = f => f * 6.2832 - 1.5708;
  let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#dialW)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#2a2420" stroke-width="${(R * .05).toFixed(1)}"/>`;
  if (v <= .01) return s;
  let g = '';
  for (let i = 0; i < 60; i++) { const q = an(i / 60), big = i % 5 === 0; g += `<path d="M${(cx + Math.cos(q) * R * (big ? .8 : .86)).toFixed(1)},${(cy + Math.sin(q) * R * (big ? .8 : .86)).toFixed(1)} L${(cx + Math.cos(q) * R * .92).toFixed(1)},${(cy + Math.sin(q) * R * .92).toFixed(1)}" stroke="#2a2420" stroke-width="${(big ? R * .035 : R * .014).toFixed(1)}"/>`; }
  if (o.num !== 0) roman.forEach((n, i) => { const q = an(i / 12); g += `<text x="${(cx + Math.cos(q) * R * .66).toFixed(1)}" y="${(cy + Math.sin(q) * R * .66 + R * .07).toFixed(1)}" text-anchor="middle" font-family="Georgia,serif" font-size="${(R * .19).toFixed(1)}" fill="#2a2420">${n}</text>`; });
  const ha = an(((hh % 12) + mm / 60) / 12), ma = an(mm / 60), col = o.blue ? '#1a2a6a' : '#1e1a18';
  g += `<path d="M${(cx - Math.cos(ha) * R * .1).toFixed(1)},${(cy - Math.sin(ha) * R * .1).toFixed(1)} L${(cx + Math.cos(ha) * R * .5).toFixed(1)},${(cy + Math.sin(ha) * R * .5).toFixed(1)}" stroke="${col}" stroke-width="${(R * .07).toFixed(1)}" stroke-linecap="round"/>` +
    `<path d="M${(cx - Math.cos(ma) * R * .12).toFixed(1)},${(cy - Math.sin(ma) * R * .12).toFixed(1)} L${(cx + Math.cos(ma) * R * .76).toFixed(1)},${(cy + Math.sin(ma) * R * .76).toFixed(1)}" stroke="${col}" stroke-width="${(R * .045).toFixed(1)}" stroke-linecap="round"/>`;
  if (o.sec != null) { const sa = an(o.sec / 60); g += `<path d="M${(cx - Math.cos(sa) * R * .16).toFixed(1)},${(cy - Math.sin(sa) * R * .16).toFixed(1)} L${(cx + Math.cos(sa) * R * .84).toFixed(1)},${(cy + Math.sin(sa) * R * .84).toFixed(1)}" stroke="#b0281a" stroke-width="${(R * .018).toFixed(1)}" stroke-linecap="round"/>`; }
  g += `<circle cx="${cx}" cy="${cy}" r="${(R * .055).toFixed(1)}" fill="#1e1a18"/>`;
  s += `<g opacity="${v.toFixed(2)}">${g}</g>`;
  // glass glare
  s += `<path d="M${cx - R * .7},${cy - R * .35} A${R * .8},${R * .8} 0 0 1 ${cx + R * .3},${cy - R * .78}" stroke="#fff" stroke-width="${(R * .08).toFixed(1)}" fill="none" opacity=".25" stroke-linecap="round"/>`;
  return s;
}
// particles drifting away from a disc (the numerals and hands dissolving)
function dissolve(cx, cy, R, k, seed) {
  if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < 70; i++) { const a = r() * 6.2832, d = Math.sqrt(r()) * R * .9, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, f = clamp((k - r() * .4) / .6);
    if (f <= 0) continue; const dx = (r() - .3) * 160 * f, dy = -(40 + r() * 120) * f;
    s += `<rect x="${(x + dx).toFixed(1)}" y="${(y + dy).toFixed(1)}" width="${(2 + r() * 4).toFixed(1)}" height="${(2 + r() * 4).toFixed(1)}" fill="#2a2420" opacity="${((1 - f) * .9).toFixed(2)}" transform="rotate(${(r() * 90).toFixed(0)},${(x + dx).toFixed(1)},${(y + dy).toFixed(1)})"/>`; }
  return s;
}
// a stone clock tower (a new building for this video): centre x, base y; clock drawn by the caller at (x, base - h + 150)
function clockTower(x, base, h, t, N) {
  const w = 150, top = base - h;
  let s = `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="url(#stoneT)"/><rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".28"/>`;
  for (let q = 0; q < h / 22; q++) s += `<path d="M${x - w / 2},${top + q * 22} H${x + w / 2}" stroke="#8a7a62" stroke-width="1" opacity=".45"/>` + Array.from({ length: 4 }, (_, i) => `<path d="M${x - w / 2 + (i * 40 + (q % 2) * 20) % w},${top + q * 22} v22" stroke="#8a7a62" stroke-width="1" opacity=".35"/>`).join('');
  s += `<rect x="${x - w / 2}" y="${top}" width="16" height="${h}" fill="#000" opacity=".12"/><rect x="${x + w / 2 - 22}" y="${top}" width="22" height="${h}" fill="#000" opacity=".2"/>`;
  // cornices
  [top + 230, top + 70].forEach(y => s += `<rect x="${x - w / 2 - 10}" y="${y}" width="${w + 20}" height="14" fill="#cbbb9e"/><rect x="${x - w / 2 - 10}" y="${y + 12}" width="${w + 20}" height="5" fill="#000" opacity=".25"/>`);
  // belfry arches above the clock
  for (let i = 0; i < 2; i++) { const ax = x - 34 + i * 68; s += `<path d="M${ax - 22},${top + 66} v-30 a22,22 0 0 1 44,0 v30Z" fill="${mix('#2a2a30', '#ffd59a', N * .6)}"/>`; }
  // pyramid roof with copper patina
  s += `<path d="M${x - w / 2 - 14},${top} L${x},${top - 150} L${x + w / 2 + 14},${top}Z" fill="#5a8a7a"/><path d="M${x},${top - 150} L${x + w / 2 + 14},${top} L${x},${top}Z" fill="#000" opacity=".25"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x},${top - 150} L${x - w / 2 - 14 + i * 34},${top}" stroke="#3a6a5a" stroke-width="1.4" opacity=".6"/>`).join('') + `<path d="M${x},${top - 150} v-34" stroke="#2a2a2a" stroke-width="4"/><circle cx="${x}" cy="${top - 186}" r="6" fill="#c8a040"/>`;
  // tall windows below
  for (let k = 0; k < 4; k++) { const wy = top + 270 + k * 120; if (wy > base - 140) break; s += `<path d="M${x - 18},${wy + 70} v-50 a18,18 0 0 1 36,0 v50Z" fill="${mix('#3a4a5a', '#ffd59a', N * .8)}"/><path d="M${x - 18},${wy + 70} h36" stroke="#cbbb9e" stroke-width="6"/>`; }
  // arched door
  s += `<path d="M${x - 34},${base} v-80 a34,34 0 0 1 68,0 v80Z" fill="#3a2a1e"/><path d="M${x},${base} v-112" stroke="#2a1a10" stroke-width="2"/>`;
  return s;
}
// the street for this video: old stone and plaster houses around a clock tower (o.N night, o.clk {h,m,k,sec}, o.fg people)
function street11(t, o = {}) {
  const N = o.N || 0, id = o.id || 'q';
  const sky = [mix('#3a72b8', '#060c24', N), mix('#9cc0e2', '#16224a', N), mix('#efe2c8', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(14); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 700).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    s += moon(120, 440, 28, N); }
  if (N < .98) s += sun3(590, 420, 1 - N) + cumulus(160 + t * 1.5, 470, 240, 21, { a: .85 * (1 - N) }) + cumulus(600 + t, 560, 190, 23, { a: .7 * (1 - N) });
  let g = farCity(64, 905, mix(sky[2], '#5a6478', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-14, 140, 360, '#c8a07a', 811, 0], [120, 150, 420, '#9a6a5a', 812, 1], [430, 146, 400, '#d8c49a', 813, 2], [570, 170, 350, '#7a8a9a', 814, 0]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  g += clockTower(360, PV, 520, t, N);
  const sh = shopRowB(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#bcb2a2"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#9a907e" stroke-width="1.5"/>`;
  for (let q = -1; q < 24; q++) g += `<path d="M${q * 34 + 8},${PV} L${q * 34},${KB}" stroke="#9a907e" stroke-width="1.2"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  // cobbled road
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#56524e"/>`;
  { const r = RS(91); for (let row = 0; row < 9; row++) { const y = KB + 18 + row * 20, h = 12 + row * .8; for (let i = -1; i < 26; i++) g += `<rect x="${(i * 30 + (row % 2) * 15 + r() * 4).toFixed(1)}" y="${y}" width="26" height="${h.toFixed(1)}" rx="5" fill="${mix('#6a6660', '#4a4642', r())}"/>`; } }
  g += `<rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>`;
  [[86, 270, 161], [640, 290, 163]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[200, 0]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  g += o.mid || '';
  if (o.cars !== 0) g += car(o.carX || 520, 1180, .95, '#8a2a2a', -1, 0);
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}
// ---------- 0: the clock on the tower spins, then dissolves ----------
function sceneHook(t) {
  const kd = ease(ramp(t, WS(0, 5) - .2, WS(0, 5) + .5)), sp = t < .5 ? 0 : Math.pow(t - .5, 2.2) * 3.2;
  const mm = (10 + sp * 60) % 60, hh = 10 + (10 + sp * 60) / 60, cx = 360, cy = PV - 520 + 150;
  const clk = dialF(cx, cy, 64, hh, mm, { k: kd }) + dissolve(cx, cy, 64, ease(ramp(t, WS(0, 5) - .2, WS(0, 5) + 1)), 3);
  const PP = [[150, 1, .86, 3, 0], [470, -1, .84, 6, 1], [610, -1, .82, 1, 2]];
  let fg = '';
  PP.forEach(([x, f, sc, pi, j]) => { const stop = ease(ramp(t, WS(0, 5) - .1 + j * .12, WS(0, 5) + .4 + j * .12)), xx = x + f * (1 - stop) * t * 26;
    fg += man(xx, 1090, sc, j === 0 ? 1 : f, pi, stop < 1 ? { walk: xx / (26 * sc) + j } : { lookUp: 1 }); });
  return street11(t, { mid: clk, fg, cars: 0 });
}
// ---------- 1: the sky as a clock: the sun's day, the moon's month ----------
function moonPh(x, y, r, ph, a) {   // ph 0 new .. .5 full .. 1 new
  if (a <= 0) return ''; const lit = '#f2eee2', dk = '#1a1e2c', c = Math.cos(ph * 6.2832), rx = Math.abs(c) * r;
  let d; if (ph <= .5) d = `M${x},${y - r} A${r},${r} 0 0 1 ${x},${y + r} A${rx.toFixed(1)},${r} 0 0 ${c > 0 ? 0 : 1} ${x},${y - r}Z`;
  else d = `M${x},${y - r} A${r},${r} 0 0 0 ${x},${y + r} A${rx.toFixed(1)},${r} 0 0 ${c > 0 ? 1 : 0} ${x},${y - r}Z`;
  return `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="${r}" fill="${dk}"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#3a4058" stroke-width="1.5"/><path d="${d}" fill="${lit}"/>` +
    `<circle cx="${x - r * .3}" cy="${y - r * .2}" r="${r * .18}" fill="#000" opacity=".1"/><circle cx="${x + r * .25}" cy="${y + r * .3}" r="${r * .13}" fill="#000" opacity=".1"/></g>`;
}
function obelisk(x, base, h) {
  return `<path d="M${x - 20},${base} L${x - 13},${base - h} L${x},${base - h - 26} L${x + 13},${base - h} L${x + 20},${base}Z" fill="#d8bc88"/><path d="M${x},${base - h - 26} L${x + 13},${base - h} L${x + 20},${base} L${x + 2},${base}Z" fill="#000" opacity=".22"/>` +
    Array.from({ length: 7 }, (_, i) => `<rect x="${x - 6}" y="${base - h + 30 + i * 32}" width="10" height="12" fill="#8a6a40" opacity=".5"/>`).join('');
}
function sceneSky(t) {
  const t0 = S0(1) - .2, ds = ease(ramp(t, WS(1, 3) - .3, WS(1, 9) - .3)), nt = ease(ramp(t, WS(1, 9) - .4, WS(1, 9) + .4));
  const ang = Math.PI * (1 - ds), sx = 360 + Math.cos(ang) * 330, sy = 760 - Math.sin(ang) * 420, hi = Math.sin(ang);
  const top = mix(mix('#e8885a', '#3a76c0', hi), '#060a1e', nt), mid = mix(mix('#f4b880', '#9cc4e6', hi), '#141c3c', nt), bot = mix(mix('#ffd8a0', '#f2e2c0', hi), '#2a2848', nt);
  let s = `<defs>${TMDEFS()}<linearGradient id="skS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".65" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skS)"/>`;
  if (nt > 0) { const r = RS(33); for (let i = 0; i < 140; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 820).toFixed(1)}" r="${(.5 + r() * 1.3).toFixed(1)}" fill="#fff" opacity="${(nt * (.3 + .6 * r())).toFixed(2)}"/>`; }
  // the sun on its arc (a dotted path shows the day)
  const sa = 1 - nt;
  s += `<path d="M30,760 A330,420 0 0 1 690,760" stroke="#fff4c8" stroke-width="2" stroke-dasharray="4 10" fill="none" opacity="${(.45 * sa * ease(ramp(t, WS(1, 3) - .3, WS(1, 3) + .3))).toFixed(2)}"/>`;
  s += `<g opacity="${sa.toFixed(2)}"><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="170" fill="url(#sunW)" opacity=".8"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="24" fill="#fffdf2"/></g>`;
  s += cumulus(140 + (t - t0) * 6, 520, 220, 41, { a: .7 * sa }) + cumulus(560 + (t - t0) * 4, 600, 170, 43, { a: .55 * sa });
  // the moon's phases across the night sky
  for (let i = 0; i < 8; i++) { const ti = WS(1, 9) + .1 + i * .12; s += moonPh(76 + i * 81, 470, 30, (i + 1) / 9, ease(ramp(t, ti, ti + .3)) * nt); }
  s += `<g opacity="${(nt * ease(ramp(t, WS(1, 10) - .1, WS(1, 10) + .3))).toFixed(2)}"><path d="M60,530 H660" stroke="#f4c76b" stroke-width="2" opacity=".7"/><path d="M60,522 v16 M660,522 v16" stroke="#f4c76b" stroke-width="2" opacity=".7"/>${lbl(360, 572, '٢٩٫٥ يوماً', 1, '#f4c76b', 26)}</g>`;
  // land: far mesas, sand, the obelisk and its shadow, a watcher
  s += `<g>` + mountainsR(800, 110, 7, { rock: mix('#c8a074', '#2a2a40', nt) }) + `</g>` + `<rect x="-20" y="790" width="760" height="520" fill="url(#sandG)"/><rect x="-20" y="790" width="760" height="520" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += dunes(t, { seed: 3, y0: 840, n: 4 });
  const ox = 300, ob = 1010, shL = 260 * (1 - Math.min(1, hi * 1.2)) + 60, shA = (sx < ox ? 1 : -1);
  s += `<path d="M${ox - 18},${ob} L${ox + shA * shL},${ob + 18} L${ox + shA * shL},${ob + 30} L${ox + 18},${ob + 6}Z" fill="#2a1a0a" opacity="${(.4 * sa).toFixed(2)}" filter="url(#blur2)"/>` + obelisk(ox, ob, 280);
  s += `<rect x="-20" y="${790}" width="760" height="520" fill="#0a1030" opacity="${(nt * .6).toFixed(2)}"/>`;
  s += man(520, 1130, .95, -1, 8, { lookUp: 1, coat: '#e8dcc0', pants: '#cbbf9e', top: '#e8dcc0' });
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the Nile floods every year: a calendar of 365 days ----------
function pyramid(x, base, w, c = 'url(#pyrL)') { const h = w * .64;
  return `<path d="M${x - w / 2},${base} L${x},${base - h} L${x + w / 2},${base}Z" fill="${c}"/><path d="M${x},${base - h} L${x + w / 2},${base} L${x + w * .1},${base}Z" fill="#7a5a34" opacity=".45"/>` +
    Array.from({ length: 8 }, (_, i) => { const y = base - h + h * (i + 1) / 9, hw = w / 2 * (i + 1) / 9; return `<path d="M${(x - hw).toFixed(1)},${y.toFixed(1)} H${(x + hw).toFixed(1)}" stroke="#8a6a40" stroke-width=".8" opacity=".35"/>`; }).join(''); }
function reeds(x, y, n, seed, t) { const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const xx = x + r() * 120 - 60, h = 40 + r() * 50, b = Math.sin(t * 1.5 + i) * 4; s += `<path d="M${xx.toFixed(1)},${y} q${(b + 2).toFixed(1)},${(-h / 2).toFixed(1)} ${(b * 2).toFixed(1)},${(-h).toFixed(1)}" stroke="${mix('#4a6a2a', '#8aa04a', r())}" stroke-width="2.4" fill="none"/>` + (r() < .5 ? `<ellipse cx="${(xx + b * 2).toFixed(1)}" cy="${(y - h).toFixed(1)}" rx="5" ry="9" fill="#6a7a3a"/>` : ''); }
  return s; }
function calPanel(x, y, k, n) {   // 12 months × 30 days + 5 extra days (gold), filled up to n days
  if (k <= 0) return ''; let s = `<g opacity="${k.toFixed(2)}"><rect x="${x}" y="${y}" width="400" height="300" rx="10" fill="url(#papy)"/><rect x="${x}" y="${y}" width="400" height="300" rx="10" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    `<path d="M${x},${y + 8} H${x + 400} M${x},${y + 292} H${x + 400}" stroke="#a88a50" stroke-width="2" opacity=".6"/>`;
  for (let m = 0; m < 12; m++) for (let d = 0; d < 30; d++) { const i = m * 30 + d; if (i >= n) continue; const cx = x + 380 - m * 31, cy = y + 30 + d * 8; s += `<rect x="${cx - 12}" y="${cy - 2.5}" width="24" height="5" rx="1.5" fill="#5a3a1a" opacity=".75"/>`; }
  for (let e = 0; e < 5; e++) if (360 + e < n) s += `<circle cx="${x + 34 + e * 18}" cy="${y + 282}" r="6" fill="#c8901a"/>`;
  return s + `</g>`; }
function sceneNile(t) {
  const t0 = S0(2) - .2, T = t - t0, fl = ease(ramp(t, WS(2, 4) - .2, WS(2, 7) + .3)), ca = ease(ramp(t, WS(2, 9) - .3, WS(2, 9) + .3));
  const n = Math.round(365 * ease(ramp(t, WS(2, 10), WS(2, 14) + .3)));
  let s = `<defs>${TMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyDay)"/>${sun3(560, 480, .9)}` + cumulus(200 + T * 5, 540, 230, 61, { a: .7 });
  s += `<g>` + pyramid(520, 780, 190, '#d8c094') + pyramid(380, 780, 130, '#d0b88a') + pyramid(640, 782, 90, '#ccb486') + `</g><rect x="-20" y="770" width="760" height="30" fill="#e8d4a8"/>`;
  // far bank, river, near bank (the flood covers the near fields with dark silt water)
  const wy = 860 - fl * 70, nb = 960;
  s += `<rect x="-20" y="790" width="760" height="80" fill="#9aa860"/><rect x="-20" y="${wy.toFixed(1)}" width="760" height="${(nb - wy + fl * 120).toFixed(1)}" fill="url(#nileG)"/>`;
  s += Array.from({ length: 10 }, (_, i) => `<path d="M${pmod(i * 83 + T * 22, 800) - 40},${(wy + 12 + (i % 5) * 16).toFixed(1)} h${30 + i * 4}" stroke="#d8eef4" stroke-width="2" opacity=".35"/>`).join('');
  s += `<rect x="-20" y="${nb + fl * 120}" width="760" height="400" fill="url(#fieldG)"/>`;
  { const r = RS(9); for (let row = 0; row < 9; row++) { const y = nb + fl * 120 + 14 + row * 30; if (y > 1290) break; for (let i = 0; i < 18; i++) s += `<path d="M${(i * 44 + r() * 10).toFixed(1)},${y} q4,-14 2,-22 M${(i * 44 + 8 + r() * 10).toFixed(1)},${y} q-4,-12 0,-20" stroke="#3a5a1a" stroke-width="2.2" fill="none" opacity=".7"/>`; } }
  s += `<rect x="-20" y="${nb - 10}" width="760" height="${(fl * 130 + 10).toFixed(1)}" fill="url(#nileG)" opacity="${(fl * .95).toFixed(2)}"/><rect x="-20" y="${nb - 10}" width="760" height="${(fl * 130 + 10).toFixed(1)}" fill="url(#silt)" opacity="${(fl * .25).toFixed(2)}"/>` +
    Array.from({ length: 8 }, (_, i) => `<path d="M${pmod(i * 97 - T * 18, 800) - 40},${(nb + 4 + (i % 4) * fl * 30).toFixed(1)} h${40 + i * 5}" stroke="#c8d8d0" stroke-width="2" opacity="${(fl * .4).toFixed(2)}"/>`).join('') +
    Array.from({ length: 12 }, (_, i) => `<path d="M${i * 64 + 20},${(nb + fl * 120 - 2).toFixed(1)} q4,-16 2,-26 M${i * 64 + 30},${(nb + fl * 120 - 2).toFixed(1)} q-4,-14 0,-22" stroke="#4a6a2a" stroke-width="2.4" fill="none" opacity="${(fl * .8).toFixed(2)}"/>`).join('');
  s += reeds(80, 880 - fl * 60, 14, 5, t) + reeds(650, 884 - fl * 60, 12, 7, t);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  s += man(150, 1180, .95, 1, 4, { coat: '#e8dcc0', pants: '#d0c4a4', top: '#e8dcc0' }) + man(560, 1200, .92, -1, 9, { coat: '#d8ccb0', pants: '#c4b894', top: '#d8ccb0' });
  s += calPanel(160, 380, ca, n) + `<g opacity="${(ca * ease(ramp(t, WS(2, 11), WS(2, 11) + .2))).toFixed(2)}">${panel(250, 700, 220, 64)}${lbl(360, 744, fmtN(n) + ' يوماً', 1, '#f4c76b', 32)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: no calendar: the seeds go in at the wrong time; the first cities never rise ----------
function sceneSeason(t) {
  const t0 = S0(3) - .2, T = t - t0, gr = ease(ramp(t, t0, WS(3, 1))), fr = ease(ramp(t, WS(3, 2) - .1, WS(3, 5))), cityK = ease(ramp(t, WS(3, 6) - .2, WS(3, 11)));
  const sky = mix('#8ab4dc', '#9aa4b4', fr);
  let s = `<defs>${TMDEFS()}<linearGradient id="skN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#4a7ab8', '#5a6a80', fr)}"/><stop offset=".7" stop-color="${sky}"/><stop offset="1" stop-color="${mix('#e8dcc0', '#d8dce0', fr)}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skN)"/>` +
    cumulus(200 + T * 5, 500, 260, 81, { a: .6 + .3 * fr }) + cumulus(560 + T * 4, 560, 220, 83, { a: .5 + .3 * fr });
  // the first city on the horizon: mud-brick walls and a stepped temple; it fades to a dashed outline
  const cx0 = 470, cb = 800;
  const city = `<rect x="${cx0 - 210}" y="${cb - 60}" width="420" height="60" fill="#b8946a"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${cx0 - 210 + i * 30}" y="${cb - 72}" width="16" height="14" fill="#b8946a"/>`).join('') +
    `<path d="M${cx0 - 90},${cb - 60} h180 v-40 h-30 v-40 h-30 v-34 h-60 v34 h-30 v40 h-30Z" fill="#c8a478"/><path d="M${cx0 + 30},${cb - 174} v34 h30 v40 h30 v40 h-60Z" fill="#000" opacity=".2"/>` +
    Array.from({ length: 7 }, (_, i) => `<rect x="${cx0 - 190 + i * 58}" y="${cb - 40}" width="12" height="18" fill="#5a3a24" opacity=".6"/>`).join('');
  const cityO = `<path d="M${cx0 - 210},${cb} v-60 h120 v-40 h30 v-40 h30 v-34 h60 v34 h30 v40 h30 v40 h120 v60" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" fill="none"/>`;
  s += `<g opacity="${(1 - cityK).toFixed(2)}">${city}</g><g opacity="${(cityK * .8).toFixed(2)}">${cityO}${lbl(cx0, cb - 200, 'المدنُ الأولى؟', 1, '#fff', 26)}</g>`;
  s += `<rect x="-20" y="${cb}" width="760" height="40" fill="${mix('#9aa860', '#a8aca0', fr)}"/>`;
  // the field: furrows of dark soil and young sprouts that frost kills
  s += `<rect x="-20" y="840" width="760" height="460" fill="url(#soilG)"/><rect x="-20" y="840" width="760" height="460" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let row = 0; row < 8; row++) { const y = 860 + row * 52, sc = .6 + row * .12;
    s += `<path d="M-20,${y + 18} H740" stroke="#3a2614" stroke-width="${(6 * sc).toFixed(1)}" opacity=".6"/>`;
    for (let i = 0; i < 12; i++) { const x = i * 64 + (row % 2) * 32, h = (10 + 22 * gr) * sc, wl = fr * (0.6 + .4 * Math.sin(i + row)), c = mix('#6aa03a', '#7a6a3a', wl);
      s += `<path d="M${x},${y + 14} q${(-2 + wl * 10).toFixed(1)},${(-h * .6).toFixed(1)} ${(wl * 14 * sc).toFixed(1)},${(-h * (1 - wl * .5)).toFixed(1)}" stroke="${c}" stroke-width="${(3 * sc).toFixed(1)}" fill="none" stroke-linecap="round"/>` +
        `<path d="M${x},${y + 4 - h * .3} q${(-8 * sc).toFixed(1)},${(-4 * sc).toFixed(1)} ${(-12 * sc).toFixed(1)},${(4 * sc * (1 + wl)).toFixed(1)}" stroke="${c}" stroke-width="${(2.4 * sc).toFixed(1)}" fill="none"/>`;
      if (fr > .2) s += `<ellipse cx="${x + 4}" cy="${y + 15}" rx="${(10 * sc).toFixed(1)}" ry="${(3 * sc).toFixed(1)}" fill="#f4f6fa" opacity="${(fr * .8).toFixed(2)}"/>`; } }
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#c8d4e4" opacity="${(fr * .12).toFixed(2)}"/>` + snowFall(t, fr, 140);
  s += man(170, 1200, 1.0, 1, 5, { coat: '#d8c8a8', pants: '#b8a888', top: '#d8c8a8', lookUp: fr > .5 ? 1 : 0 });
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: Babylon's sixty: a clay tablet, then 60 minutes and 60 seconds ----------
function wedge(x, y, s, rot) { return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-6,-10 L6,-10 L0,-4Z" fill="#5a3420"/><path d="M0,-4 L0,14" stroke="#5a3420" stroke-width="2.4"/><path d="M-6,-10 L6,-10" stroke="#e8b88a" stroke-width="1" opacity=".6"/></g>`; }
function sceneBabylon(t) {
  const t0 = S0(4) - .2, T = t - t0, ck = ease(ramp(t, WS(4, 5) - .4, WS(4, 5) + .1)), mn = ease(ramp(t, WS(4, 5) - .1, WS(4, 6) + .5)), sc = ramp(t, WS(4, 7) - .2, WS(4, 8) + .8);
  let s = `<defs>${TMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1a120c"/><circle cx="560" cy="380" r="520" fill="url(#lampW)"/>`;
  s += `<rect x="-20" y="940" width="760" height="360" fill="url(#woodT)"/><rect x="-20" y="940" width="760" height="360" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="940" width="760" height="10" fill="#7a5a3a"/>`;
  // the oil lamp
  s += `<ellipse cx="600" cy="940" rx="58" ry="14" fill="#000" opacity=".3"/><path d="M548,930 q52,-44 104,0 q-10,14 -52,14 q-42,0 -52,-14Z" fill="#a87650"/><path d="M640,918 q18,-6 24,-14" stroke="#a87650" stroke-width="10" fill="none" stroke-linecap="round"/>` +
    `<path d="M664,904 q-10,-26 0,-48 q12,22 0,48Z" fill="#ffd27a" transform="rotate(${(Math.sin(t * 9) * 4).toFixed(1)},664,904)"/><circle cx="664" cy="880" r="60" fill="url(#lampW)"/>`;
  // the clay tablet, tilted, with rows of cuneiform; the sign for sixty glows gold
  const tk = 1 - ck * .85;
  s += `<g opacity="${tk.toFixed(2)}" transform="rotate(-6,330,700)"><ellipse cx="340" cy="955" rx="220" ry="20" fill="#000" opacity=".4" filter="url(#blur2)"/><rect x="130" y="470" width="400" height="470" rx="46" fill="url(#clayT)"/><rect x="130" y="470" width="400" height="470" rx="46" fill="#000" filter="url(#grainR)" opacity=".35"/>` +
    `<path d="M150,500 q180,-24 360,0" stroke="#e8b890" stroke-width="3" fill="none" opacity=".5"/>`;
  { const r = RS(17); for (let row = 0; row < 10; row++) { const y = 520 + row * 40; s += `<path d="M160,${y + 18} H500" stroke="#6a4028" stroke-width="1.4" opacity=".5"/>`; let x = 175; while (x < 490) { const n = 1 + Math.floor(r() * 3); for (let q = 0; q < n; q++) s += wedge(x + q * 9, y, 1.05, r() < .25 ? 90 : 0); x += n * 9 + 14 + r() * 10; } } }
  const g6 = ease(ramp(t, WS(4, 4) - .4, WS(4, 4)));
  s += `<g opacity="${g6.toFixed(2)}"><rect x="260" y="620" width="140" height="110" rx="16" fill="#f4c76b" opacity=".25"/><rect x="260" y="620" width="140" height="110" rx="16" fill="none" stroke="#f4c76b" stroke-width="3"/></g></g>`;
  s += `<g opacity="${(g6 * tk).toFixed(2)}">${wedge(330, 664, 3.2, 0)}${lbl(330, 770, '= ٦٠', 1, '#f4c76b', 40)}</g>`;
  // the clock face draws itself: 60 minute marks, then a seconds hand sweeps
  if (ck > 0) { const cx = 360, cy = 650, R = 230;
    s += `<g opacity="${ck.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 18}" fill="#0a0e1c" opacity=".85"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#dialW)"/>`;
    for (let i = 0; i < 60; i++) { if (i / 60 > mn) break; const q = i / 60 * 6.2832 - 1.5708, big = i % 5 === 0; s += `<path d="M${(cx + Math.cos(q) * R * (big ? .8 : .87)).toFixed(1)},${(cy + Math.sin(q) * R * (big ? .8 : .87)).toFixed(1)} L${(cx + Math.cos(q) * R * .94).toFixed(1)},${(cy + Math.sin(q) * R * .94).toFixed(1)}" stroke="${big ? '#2a2420' : '#5a5048'}" stroke-width="${big ? 6 : 2.5}"/>`; }
    s += lbl(cx, cy - 60, '٦٠ دقيقة', ease(ramp(t, WS(4, 5), WS(4, 5) + .3)), '#2a2420', 30).replace('stroke="#000" stroke-width="5"', 'stroke="#fff" stroke-width="0"');
    s += lbl(cx, cy + 90, '٦٠ ثانية', ease(ramp(t, WS(4, 7), WS(4, 7) + .3)), '#b0281a', 30).replace('stroke="#000" stroke-width="5"', 'stroke="#fff" stroke-width="0"');
    const sa = sc * 6.2832 - 1.5708; if (sc > 0) s += `<path d="M${cx},${cy} L${(cx + Math.cos(sa) * R * .86).toFixed(1)},${(cy + Math.sin(sa) * R * .86).toFixed(1)}" stroke="#b0281a" stroke-width="4" stroke-linecap="round"/>`;
    s += `<circle cx="${cx}" cy="${cy}" r="10" fill="#2a2420"/></g>`; }
  noEarth(); F.ov = ''; return s;
}
