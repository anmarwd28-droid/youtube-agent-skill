// ===================== chapters 2-5: an hour, a day, a week, a month =====================
const skyR = (id, c, x0 = -700, x1 = 1500, y0 = 100, y1 = 1400) => `<defs>${DEFB()}<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${c.map((k, i) => `<stop offset="${(i / (c.length - 1)).toFixed(2)}" stop-color="${k}"/>`).join('')}</linearGradient></defs><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${id})"/>`;
const NSKY = ['#04060f', '#0a1230', '#1c2a4c'];
function starsWd(t, x0, x1, y0, y1, n = 320, seed = 3, tw = 1) { const r = RS(seed + 900); let s = ''; for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), y = y0 + r() * (y1 - y0), z = Math.pow(r(), 3) * 1.6 + .45, c = r(); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z.toFixed(2)}" fill="${c < .14 ? '#ffe2c0' : c > .86 ? '#cfe0ff' : '#fff'}" opacity="${(clamp((y1 - y) / 150) * (.62 + .33 * tw * Math.sin(t * 1.3 + i))).toFixed(2)}"/>`; } return s; }
function ridge(x0, x1, yb, amp, seed, col, o = {}) { const p = ridgeP(x0, x1, yb, amp, seed, o.n0 || 7), d = `M${x0},${yb + 80} L${p.map(PT).join(' L')} L${x1},${yb + 80}Z`;
  return `<path d="${d}" fill="${col}"/><path d="${d}" fill="#000" filter="url(#grainR)" opacity="${o.tex ?? .3}"/>` + (o.snow ? `<path d="${d}" fill="#dfe8f4" opacity="${o.snow}"/>` : '') + (o.rim ? `<path d="M${p.map(PT).join(' L')}" stroke="${o.rim}" stroke-width="2.5" fill="none" opacity=".5"/>` : ''); }
const hillP = (x0, x1, y, amp, seed, wl = 420) => { let d = `M${x0},${y + 400} L${x0},${y}`; for (let x = x0; x <= x1; x += 20) d += ` L${x},${(y - amp * (.5 + .5 * Math.sin(x / wl * 6.283 + seed)) - amp * .25 * Math.sin(x / wl * 15 + seed * 2.3)).toFixed(1)}`; return d + ` L${x1},${y + 400}Z`; };
const NB = (s, b = .6) => `<g style="filter:brightness(${b})">${s}</g>`;
const glowC = (x, y, r, a = .6) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#lampG)" opacity="${a}"/>`;
function house(x, y, w, h, col, lit = 1, o = {}) { const rf = o.roof || '#5a3a30';
  return `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M${x - 12},${y - h} L${x + w / 2},${y - h - w * .32} L${x + w + 12},${y - h}Z" fill="${rf}"/><path d="M${x + w / 2},${y - h - w * .32} L${x + w + 12},${y - h} L${x + w * .7},${y - h}Z" fill="#000" opacity=".25"/>` +
    `<rect x="${x + w * .42}" y="${y - h * .52}" width="${w * .17}" height="${h * .52}" fill="#2a1e18"/>` + [[.12, .62], [.7, .62]].map(([a, b]) => `<rect x="${x + w * a}" y="${y - h * b - 6}" width="${w * .18}" height="${h * .3}" fill="${lit ? '#ffd890' : '#26303e'}"/>` + (lit ? `<rect x="${x + w * a - 8}" y="${y - h * b - 14}" width="${w * .18 + 16}" height="${h * .3 + 16}" fill="#ffc870" opacity="${.18 * lit}" filter="url(#blur2)"/>` : '')).join('') +
    (o.snow ? `<path d="M${x - 12},${y - h} L${x + w / 2},${y - h - w * .32} L${x + w + 12},${y - h} l-14,2 L${x + w / 2},${y - h - w * .32 + 14} L${x + 2},${y - h + 2}Z" fill="#eef4fa" opacity="${o.snow}"/>` : ''); }
function bareTree(x, y, h, seed, col = '#2a2420', w0) { const r = RS(seed + 40); let s = ''; const br = (x0, y0, a, L, w, d) => { const x1 = x0 + Math.sin(a) * L, y1 = y0 - Math.cos(a) * L; s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w.toFixed(1)}" stroke-linecap="round"/>`; if (d > 0) { const n = d > 2 ? 3 : 2; for (let i = 0; i < n; i++) br(x1, y1, a + (i - (n - 1) / 2) * .62 + (r() - .5) * .4, L * (.62 + r() * .16), w * .62, d - 1); } };
  br(x, y, (r() - .5) * .1, h * .36, w0 || h * .055, 4); return s; }
const orb = (id, x, y, r, c1, c2, a = 1, ex = '') => `<g opacity="${a.toFixed(2)}"><defs><radialGradient id="ob${id}" cx=".34" cy=".32" r=".8"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><clipPath id="oc${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#ob${id})"/><g clip-path="url(#oc${id})">${ex}</g><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="${r * .12}"/></g>`;
// ---------- chapter 2: after an hour ----------
const PLN = [['عطارد', 250, 13, '#c8bca8', '#6a6258', '٣ دقائق'], ['الزهرة', 345, 21, '#f0d8a0', '#a8803a', '٦ دقائق'], ['الأرض', 448, 23, '#6aa8e8', '#1a3a7a', '٨ دقائق'], ['المرّيخ', 552, 17, '#e88a5a', '#7a3220', '١٣ دقيقة'], ['المشتري', 790, 72, '#f0d8b8', '#9a6a48', '٤٣ دقيقة'], ['زحل', 1075, 56, '#f0e0b0', '#a08850', '٨٠ دقيقة']];
function scenePlanets(t) {
  noW(); const y = 392, f0 = S0(11), fx = t < WS(11, 14) ? lerp(470, 640, ease(ramp(t, f0, WS(11, 13)))) : lerp(640, 880, ease(ramp(t, WS(11, 14), WS(11, 22) + .2)));
  let s = spaceW(t) + `<defs><linearGradient id="lf" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".5"/><stop offset="1" stop-color="#ffe9a8" stop-opacity=".05"/></linearGradient></defs><rect x="${fx.toFixed(1)}" y="${y - 150}" width="${(1280 - fx).toFixed(1)}" height="300" fill="url(#lf)" opacity=".22"/><path d="M${fx.toFixed(1)},${y - 160} Q${(fx + 34).toFixed(1)},${y} ${fx.toFixed(1)},${y + 160}" stroke="#fff3c8" stroke-width="5" fill="none"/>` + txt(fx + 4, y - 176, 'آخرُ ضوء', 1, '#ffe9a8', 23) +
    `<circle cx="112" cy="${y}" r="74" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 9" opacity=".85"/>` + txt(112, y + 9, 'الشمس؟', 1, '#f4c76b', 24);
  PLN.forEach((p, i) => { const lit = clamp((p[1] + p[2] - fx) / (p[2] * 2 + 1)), ex = i === 4 ? [-40, -18, 6, 30].map((dy, q) => `<rect x="${p[1] - 80}" y="${y + dy}" width="160" height="${q % 2 ? 9 : 14}" fill="${q % 2 ? '#b07a50' : '#c89868'}" opacity=".55"/>`).join('') + `<ellipse cx="${p[1] + 24}" cy="${y + 20}" rx="15" ry="8" fill="#c8583a" opacity=".7"/>` : i === 2 ? `<path d="M${p[1] - 12},${y - 12} q10,-8 16,2 q6,12 -6,16 q-12,2 -10,-18Z" fill="#4a9a5a"/>` : '';
    s += (i === 5 ? `<ellipse cx="${p[1]}" cy="${y}" rx="104" ry="22" fill="none" stroke="#d8c898" stroke-width="12" opacity="${(.2 + .6 * lit).toFixed(2)}" transform="rotate(-14,${p[1]},${y})"/>` : '') + orb('p' + i, p[1], y, p[2], mix('#1a1c26', p[3], .12 + .88 * lit), mix('#0a0b12', p[4], .1 + .9 * lit)) +
      txt(p[1], y + p[2] + 44, p[0], 1, lit > .5 ? '#fff' : 'rgba(255,255,255,.55)', 24) + txt(p[1], y + p[2] + 76, p[5], 1, '#f4c76b', 19); });
  return s;
}
chip('المشتري يلمعُ ساعةً أخرى', 640, 150, 'big', WS(11, 14), S0(12) - .4);
function satel(x, y, s, k, t) { const pc = mix('#2a5ad0', '#10141e', k), bob = Math.sin(t * .7) * 5;
  return `<g transform="translate(${x},${y + bob}) rotate(-14) scale(${s})">` + [-1, 1].map(d => `<rect x="${d > 0 ? 46 : -206}" y="-34" width="160" height="68" fill="${pc}"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M${(d > 0 ? 46 : -206) + 20 + i * 20},-34 v68" stroke="#000" stroke-opacity=".45" stroke-width="2"/>`).join('') + `<path d="M${d > 0 ? 46 : -206},0 h160" stroke="#000" stroke-opacity=".45" stroke-width="2"/><rect x="${d > 0 ? 46 : -206}" y="-34" width="160" height="68" fill="none" stroke="#c8ccd4" stroke-width="3"/><path d="M${d > 0 ? 46 : -206},-34 l160,68" stroke="#fff" stroke-opacity="${(.25 * (1 - k)).toFixed(2)}" stroke-width="14"/>`).join('') +
    `<rect x="-46" y="-40" width="92" height="80" rx="6" fill="#d8b860"/><rect x="-46" y="-40" width="30" height="80" rx="6" fill="#fff" opacity=".25"/><rect x="16" y="-40" width="30" height="80" fill="#000" opacity=".25"/><rect x="-12" y="-74" width="24" height="36" fill="#9aa2ae"/><ellipse cx="0" cy="-84" rx="34" ry="14" fill="#e6e8ec"/><ellipse cx="0" cy="-88" rx="22" ry="8" fill="#000" opacity=".2"/><circle cx="0" cy="8" r="13" fill="#1a1c22"/><circle cx="0" cy="8" r="7" fill="${k > .5 ? '#e0483a' : '#5ad08a'}"/></g>`; }
function sceneSat(t) {
  const cam = g3(t, { d: 5.2, el: .1, az: 1.2, sunI: 0, lights: 1, amb: .18, tg: [1.5, .7, 0], daz: .02 }), k = ease(ramp(t, WS(12, 2), WS(12, 4))), b = lerp(1, .32, ease(ramp(t, WS(12, 5), S0(13))));
  F.ov = satel(850, 330, 1.15, k, t) + `<g opacity="${ramp(t, WS(12, 5), WS(12, 5) + .4).toFixed(2)}"><rect x="1010" y="505" width="170" height="64" rx="12" fill="#0a0e1c" opacity=".85"/><rect x="1028" y="521" width="118" height="32" rx="6" fill="none" stroke="#fff" stroke-width="3"/><rect x="1148" y="530" width="8" height="14" fill="#fff"/><rect x="1033" y="526" width="${(108 * b).toFixed(1)}" height="22" rx="3" fill="${b > .5 ? '#5ad08a' : '#f4c76b'}"/>` + txt(1095, 600, 'بطّاريّة فقط', 1, '#fff', 22) + `</g>`;
  return spaceW(t, { mw: .4, mwy: 120, mwa: 8 });
}
function sceneScatter(t) {
  noW(); const T = Math.max(0, t - WS(12, 9)), cx = 640, cy = 400; let s = spaceW(t) + `<circle cx="${cx}" cy="${cy}" r="30" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="7 6"/>`;
  [[70, 6, '#c8bca8', 1.6, .4], [112, 9, '#f0d8a0', 1.2, 2.1], [156, 10, '#6aa8e8', 1, 3.6], [205, 8, '#e88a5a', .82, 5.2], [300, 22, '#e0c098', .44, .9], [392, 18, '#e8d8a0', .32, 4.3]].forEach(([R, r, c, v, a0], i) => { const a = a0 + (WS(12, 9) - S0(12)) * .05 * v, px = cx + R * Math.cos(a), py = cy + R * .52 * Math.sin(a), tx = -Math.sin(a), ty = .52 * Math.cos(a), d = T * 46 * v, x = px + tx * d, y = py + ty * d;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${R * .52}" fill="none" stroke="#fff" stroke-opacity="${(.35 - .2 * ramp(T, 0, 2)).toFixed(2)}" stroke-width="1.6" stroke-dasharray="5 7"/>` + arrow(px, py, x + tx * (r + 26), y + ty * (r + 26), ramp(T, .2, .8) * .85, '#f4c76b', 3) + orb('s' + i, x, y, r, mix('#1a1c26', c, .5), '#0a0b12') + (i === 2 ? txt(x, y - 22, 'الأرض', 1, '#9fd0ff', 20) : ''); });
  return s;
}
chip('لا شمسَ تجمعُها', 640, 150, 'dark', WS(12, 10), S0(13) - .4);
function seaW(t, y0, y1, x0, x1, c = ['#12305a', '#06122a'], id = 'se', calm = 1) { let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="url(#${id})"/>`; const r = RS(51);
  for (let i = 0; i < 90; i++) { const u = r(), y = y0 + 6 + u * u * (y1 - y0 - 10), w = 30 + 90 * u, x = x0 + pmod(r() * (x1 - x0) + t * (6 + 22 * u) * calm, x1 - x0); s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-3 - 5 * u).toFixed(1)} ${w.toFixed(1)},0" stroke="#cfe4ff" stroke-width="${(1 + 1.8 * u).toFixed(1)}" fill="none" stroke-opacity="${(.14 + .22 * u).toFixed(2)}"/>`; } return s; }
function sceneTide(t) {
  noW(); const k = ease(ramp(t, WS(13, 3), WS(13, 8))), lv = lerp(900, 936, k);
  let s = skyR('td', NSKY) + starsWd(t, -300, 1100, 380, 860, 240, 4) + milkyW(.55, 380, 560, -10, .8) + ridge(-300, 1100, 880, 70, 5, '#0e1626', { n0: 5 }) + seaW(t, lv, 1300, -300, 1100) +
    `<path d="M-300,1300 L-300,1010 Q60,1000 300,930 Q520,872 760,862 L1100,850 L1100,1300Z" fill="#3a3626"/><path d="M-300,1300 L-300,1010 Q60,1000 300,930 Q520,872 760,862 L1100,850 L1100,1300Z" fill="#000" filter="url(#grainR)" opacity=".4"/>` +
    `<path d="M-300,900 H420" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8" opacity="${k.toFixed(2)}"/>` + txt(250, 886, 'المدُّ قبل اختفاء الشمس', k, '#f4c76b', 20) + `<rect x="566" y="800" width="10" height="100" fill="#1a1c22"/>` + glowC(586, 800, 110, .5) + `<rect x="574" y="796" width="18" height="9" rx="3" fill="#ffe2ad"/>` + house(640, 866, 110, 70, '#4a4038', 1) + NB(stander(520, 905, 1, .36, -1, t, {}) , .55);
  F.ov = `<g opacity="${ramp(t, WS(13, 4), WS(13, 4) + .5).toFixed(2)}">` + panel(96, 130, 330, 190) + txt(261, 172, 'مَن يصنعُ المدَّ؟', 1, '#fff', 24) + `<rect x="126" y="198" width="${(180).toFixed(0)}" height="30" rx="8" fill="#cfd8ff"/>` + txt(356, 222, 'القمر ⅔', 1, '#cfd8ff', 22) +
    `<rect x="126" y="252" width="90" height="30" rx="8" fill="#f4c76b" opacity="${(1 - .8 * k).toFixed(2)}"/>` + txt(356, 276, 'الشمس ⅓', 1 - .6 * k, '#f4c76b', 22) + (k > .5 ? `<path d="M120,267 h110" stroke="#ff5a4a" stroke-width="4"/>` : '') + `</g>`;
  return camMv(s, t, S0(13), S0(14), [1.5, 300, 860], [1.62, 330, 870]);
}
function fieldNight(t, o = {}) { const x0 = -500, x1 = 1220, fc = o.fc || '#18261c';
  let s = skyR(o.id || 'fn', o.sky || NSKY, x0 - 200, x1 + 200) + `<g opacity="${o.stars ?? 1}">` + milkyW(o.mw ?? .9, 360, 500, -22, 1.05) + starsWd(t, x0, x1, 150, 900, 520, 8, o.tw ?? 1) + `</g>` + ridge(x0, x1, 900, 120, 21, '#0c1322', { n0: 5, snow: o.snow ? o.snow * .5 : 0 }) + ridge(x0, x1, 930, 60, 22, '#101a28', { n0: 6, snow: o.snow ? o.snow * .6 : 0 }) +
    `<path d="${hillP(x0, x1, 960, 26, 1.3)}" fill="${fc}"/><path d="${hillP(x0, x1, 960, 26, 1.3)}" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  return s; }
function sceneSkyField(t) {
  noW(); const far = fieldNight(t, {}) + house(520, 962, 120, 74, '#3a3430', 1) + bareTree(470, 962, 0, 1) + treeR(690, 966, 170, 4, t) + `<rect x="-500" y="1010" width="1720" height="300" fill="#0e1812"/><rect x="-500" y="1010" width="1720" height="300" fill="#000" filter="url(#grainR)" opacity=".4"/>` +
    NB(stander(180, 1090, 0, .6, 1, t, { lookUp: 1 }) + stander(262, 1094, 2, .56, 1, t, { lookUp: 1 }) + stander(330, 1098, 1, .36, -1, t, { lookUp: 1 }) + stander(60, 1080, 3, .58, 1, t, { lookUp: 1, phone: .6 }), .72);
  const a = S0(14) - .2, c = t < S0(15) ? mv3(t, a, S0(15), [1.55, 330, 930], [1.05, 360, 720]) : mv3(t, S0(15), S0(15) + 3, [1.05, 360, 720], [1.2, 330, 800]);
  return camG(far, c[0], c[1], c[2]);
}
chip('الساعةُ ١٢ ظهراً', 640, 150, 'big', WS(14, 10), S0(15) - .2);
// ---------- chapter 3: after a day ----------
function cropRows(t, y0, y1, x0, x1, dead = 0) { let s = ''; const r = RS(31); for (let i = 0; i < 9; i++) { const u = i / 8, y = y0 + u * u * (y1 - y0), sc = .35 + u * 1.1, n = Math.floor((x1 - x0) / (26 * sc));
    for (let j = 0; j < n; j++) { const x = x0 + j * 26 * sc + (i % 2) * 13 * sc, h = (26 + r() * 10) * sc, dr = dead * (.5 + r() * .5) * h * .55, c = mix('#2f6a34', '#5a5236', dead);
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(dr * .4).toFixed(1)},${(-h * .6).toFixed(1)} ${dr.toFixed(1)},${(-h + dr * .5).toFixed(1)}" stroke="${c}" stroke-width="${(3 * sc).toFixed(1)}" fill="none" stroke-linecap="round"/><ellipse cx="${(x + dr).toFixed(1)}" cy="${(y - h + dr * .5).toFixed(1)}" rx="${(7 * sc).toFixed(1)}" ry="${(5 * sc).toFixed(1)}" fill="${mix('#e8b830', '#6a5a30', dead)}"/><path d="M${x.toFixed(1)},${(y - h * .45).toFixed(1)} q${(8 * sc).toFixed(1)},${(-4 * sc + dr * .2).toFixed(1)} ${(13 * sc).toFixed(1)},${(2 * sc + dr * .3).toFixed(1)}" stroke="${c}" stroke-width="${(2.4 * sc).toFixed(1)}" fill="none"/>`; } } return s; }
function farmW(t, o = {}) { const x0 = -500, x1 = 1220;
  return fieldNight(t, { id: 'fm', mw: .7, fc: '#16241a' }) + house(60, 964, 150, 92, '#6a3a30', 1, { roof: '#3a2a26' }) + house(250, 964, 100, 66, '#4a4a44', 1) + `<rect x="394" y="874" width="40" height="92" fill="#8a8f98"/><path d="M394,874 q20,-26 40,0Z" fill="#a8aeb8"/><rect x="394" y="874" width="12" height="92" fill="#fff" opacity=".15"/>` + glowC(214, 880, 120, .5) + `<rect x="210" y="872" width="5" height="92" fill="#1a1c22"/>` + treeR(-140, 968, 190, 6, t) + treeR(820, 968, 210, 9, t) +
    `<path d="${hillP(x0, x1, 990, 10, 4)}" fill="#1c2a1c"/>` + NB(cropRows(t, 1000, 1290, x0, x1, o.dead || 0), .62); }
function leafPanel(t, a, x = 880, y = 330) { const k = ease(ramp(t, WS(16, 15), WS(16, 18)));
  return `<g opacity="${a.toFixed(2)}">` + panel(x - 190, y - 120, 380, 250) + `<path d="M${x - 40},${y + 60} C${x - 120},${y} ${x - 80},${y - 90} ${x + 30},${y - 80} C${x + 60},${y - 10} ${x + 20},${y + 50} ${x - 40},${y + 60}Z" fill="${mix('#4aa850', '#5a5a44', k)}"/><path d="M${x - 40},${y + 60} Q${x - 20},${y - 10} ${x + 30},${y - 80}" stroke="#1e4a22" stroke-width="3" fill="none"/>` +
    [0, 1, 2].map(i => arrow(x + 150 - i * 6, y - 104 + i * 34, x + 62, y - 62 + i * 30, 1 - k * .85, '#ffe9a8', 4)).join('') + (k > .4 ? `<path d="M${x + 84},${y - 96} l52,70 M${x + 136},${y - 96} l-52,70" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round"/>` : '') + txt(x + 110, y + 4, 'ضوء', 1, '#ffe9a8', 22) +
    txt(x - 60, y + 108, k > .5 ? 'توقّفَ صنعُ الغذاء' : 'ضوء ← غذاء', 1, k > .5 ? '#ff8a7a' : '#fff', 24) + `</g>`; }
function sceneFarm(t) {
  const a = CS(3); noW(); F.ov = leafPanel(t, ease(ramp(t, WS(16, 13) - .3, WS(16, 13) + .3)));
  return camMv(farmW(t, { dead: .25 * ramp(t, a, S0(17)) }), t, a, S0(17), [1.0, 330, 860], [1.5, 250, 990]);
}
function flowers(t, x0, n, y, closed) { let s = ''; const r = RS(71); for (let i = 0; i < n; i++) { const x = x0 + i * 46 + r() * 20, h = 70 + r() * 40, c = ['#e84a6a', '#f4c84a', '#c86ad8', '#ff8a4a'][i % 4], dr = closed * 10;
    s += `<path d="M${x},${y} q${-6 + dr * .3},${-h * .5} ${dr},${-h}" stroke="#3a6a34" stroke-width="4" fill="none"/><path d="M${x},${y - h * .4} q14,-10 22,2" stroke="#3a6a34" stroke-width="4" fill="none"/>` + (closed > .5 ? `<path d="M${x + dr - 8},${y - h} q8,-30 16,0 q-8,10 -16,0Z" fill="${c}"/><path d="M${x + dr},${y - h - 20} v22" stroke="#000" stroke-opacity=".25" stroke-width="2"/>` : [0, 1, 2, 3, 4].map(q => `<ellipse cx="${x + dr + Math.cos(q * 1.257) * 11}" cy="${y - h + Math.sin(q * 1.257) * 11}" rx="9" ry="6" fill="${c}" transform="rotate(${q * 72},${x + dr + Math.cos(q * 1.257) * 11},${y - h + Math.sin(q * 1.257) * 11})"/>`).join('') + `<circle cx="${x + dr}" cy="${y - h}" r="6" fill="#f4e04a"/>`); } return s; }
function sceneBirds(t) {
  noW(); const fx = lerp(1180, 380, ramp(t, WS(17, 8), S0(18) + .5));
  const s = fieldNight(t, { id: 'bd', mw: .6 }) + bareTree(250, 1010, 520, 7, '#1c1a18', 26) + `<path d="M60,790 Q250,800 470,770" stroke="#1c1a18" stroke-width="12" fill="none" stroke-linecap="round"/>` +
    NB([120, 190, 300, 380].map((x, i) => pigeon(x, 782 - (x > 250 ? (x - 250) * .1 : (250 - x) * -.03) - 4, 2.6, 0, i) + `<path d="M${x + 12},${760 - i % 2 * 4} q6,-4 12,0" stroke="#fff" stroke-width="2" fill="none" opacity="${(.5 + .4 * Math.sin(t * 1.5 + i)).toFixed(2)}"/>`).join('') + txt(250, 720, 'z z z', .7, '#cfe0ff', 26), .7) +
    `<rect x="-500" y="1030" width="1720" height="300" fill="#101a12"/><rect x="-500" y="1030" width="1720" height="300" fill="#000" filter="url(#grainR)" opacity=".4"/>` + NB(flowers(t, 430, 9, 1120, 1) + quad(fx, 1076, 1.15, { kind: 'wolf', face: -1, moving: 1, phase: t * 7 }), .6) + `<circle cx="${fx - 96}" cy="${1076 - 96}" r="3" fill="#ffe9a8"/>`;
  return camMv(s, t, S0(17) - .2, S0(18), [1.9, 250, 840], [1.35, 440, 960]);
}
chip('لا فجرَ يوقظُها', 640, 650, 'dark', WS(17, 3), WS(17, 8) - .3);
function sceneHeat(t) {
  const cam = g3(t, { d: 6.4, el: .16, az: 4.1, sunI: 0, lights: 1, amb: .2, tg: [-1.1, 0, 0] }), e = proj3w(cam, [0, 0, 0]), v = lerp(15, 9, ease(ramp(t, S0(18), S0(19)))), a = ramp(t, WS(18, 4), WS(18, 4) + .5), p = 1 + .04 * Math.sin(t * 2);
  F.ov = `<circle cx="${e[0]}" cy="${e[1]}" r="${(244 * p).toFixed(1)}" fill="none" stroke="#ff9a5a" stroke-width="16" opacity=".16" filter="url(#soft)"/><circle cx="${e[0]}" cy="${e[1]}" r="${(232 * p).toFixed(1)}" fill="none" stroke="#ffb878" stroke-width="5" opacity=".3"/>` + thermo(190, 470, 230, v, -30, 20) +
    `<g opacity="${a.toFixed(2)}">` + arrow(470, 290, e[0] - 250, 320, 1, '#ffb878', 4) + txt(410, 298, 'الهواء', 1, '#ffb878', 28) + arrow(470, 470, e[0] - 200, 440, ramp(t, WS(18, 5), WS(18, 5) + .4), '#7ac0ff', 4) + txt(392, 480, 'المحيطات', ramp(t, WS(18, 5), WS(18, 5) + .4), '#7ac0ff', 28) + `</g>`;
  return spaceW(t, { mw: .35, mwy: 640, mwa: -4 });
}
chip('خزّانُ حرارةٍ عملاق', 640, 650, '', WS(18, 6), S0(19) - .4);
function turbine(x, y, h, ang) { return `<path d="M${x - 5},${y} L${x - 2},${y - h} L${x + 2},${y - h} L${x + 5},${y}Z" fill="#c8ccd4"/><g transform="rotate(${ang.toFixed(1)},${x},${y - h})">` + [0, 120, 240].map(a => `<path d="M${x},${y - h} q${h * .05},${-h * .22} 0,${-h * .5} q${-h * .035},${h * .28} 0,${h * .5}Z" fill="#e6e8ec" transform="rotate(${a},${x},${y - h})"/>`).join('') + `</g><circle cx="${x}" cy="${y - h}" r="${h * .03}" fill="#9aa2ae"/>`; }
function sceneWeather(t) {
  noW(); const T = t - S0(19), sp = 1 - ease(ramp(t, S0(19), WS(19, 9))), ang = 200 * (T - T * T / (2 * 5.6) * (T < 5.6 ? 1 : 0)) * (T < 5.6 ? 1 : 0) + (T >= 5.6 ? 200 * 2.8 : 0), ev = 1 - ease(ramp(t, WS(19, 9), S0(20) - .3));
  let s = skyR('wt', NSKY) + starsWd(t, -400, 1100, 380, 860, 200, 12) + [0, 1, 2].map(i => `<g opacity="${(.5 * (.4 + .6 * sp)).toFixed(2)}">` + cumulus(120 + i * 300 + T * 14 * sp, 560 + i * 34, 220, 21 + i, { a: 1, base: '#2a3448' }) + `</g>`).join('') + ridge(-400, 1100, 900, 80, 7, '#0e1626', { n0: 5 }) + `<path d="${hillP(-400, 420, 936, 30, 2.2)}" fill="#16221c"/>` + NB(turbine(40, 925, 250, ang) + turbine(210, 930, 300, ang + 40) + turbine(360, 940, 230, ang + 80), .75) + seaW(t, 950, 1300, -400, 1100, ['#12305a', '#06122a'], 'ws', .25 + .75 * sp);
  for (let i = 0; i < 7; i++) { const x = 520 + i * 74, k = pmod(T * .35 + i * .17, 1); s += `<path d="M${x},${1010 - k * 150} q10,-16 0,-32 q-10,-16 0,-32" stroke="#9fd0ff" stroke-width="4" fill="none" opacity="${((1 - k) * .7 * ev).toFixed(2)}" stroke-linecap="round"/>`; }
  F.ov = txt(900, 470, 'تبخّر', ev * ramp(t, WS(19, 9), WS(19, 9) + .4), '#9fd0ff', 26) + txt(250, 250, 'رياح', sp * ramp(t, WS(19, 7), WS(19, 7) + .4), '#fff', 26);
  return camMv(s, t, S0(19) - .2, S0(20), [.98, 330, 800], [1.06, 380, 810]);
}
chip('الطقسُ يهدأ', 640, 150, 'ice', WS(19, 3), S0(20) - .4);
const CITY2 = { id: 'n', seed: 9, dark: 1, lit: 1, clouds: .15, mw: .5, cars: [[120, 0, '#c8c8cc', 1, 0], [700, 0, '#7a2a2a', -1, 0], [0, 1, '#e8e4d0', 1, 60]] };
function sceneCityLit(t) {
  noW(); const ppl = NB(walker(-200, 1066, 30, 1, .5, t, { coat: 1 }) + walker(760, 1054, -28, 2, .5, t, { coat: 1, scarf: '#a83a3a' }) + walker(300, 1080, 26, 3, .52, t, { coat: 1 }) + walker(1050, 1070, -32, 0, .5, t, { coat: 1, hat: '#2a4a6a' }), .66);
  return camMv(cityW(t, CITY2) + ppl, t, S0(20) - .2, CS(4) + .5, [.9, 360, 790], [1.25, 400, 880]);
}
chip('الكهرباءُ تعمل', 640, 150, '', WS(20, 3), WS(20, 6)); chip('حين ينفدُ الدفء؟', 640, 150, 'red', WS(20, 13), CS(4));
// ---------- chapter 4: after a week ----------
function sceneEarthCool(t) {
  const v = lerp(15, -18, ease(ramp(t, WS(21, 7), WS(21, 18)))), cam = g3(t, { d: 6.4, el: .16, az: 1.4, sunI: 0, lights: .9, amb: .2, ice: .16 + .2 * ramp(t, S0(21), S0(22)), tg: [-1.1, 0, 0], clouds: .4 });
  F.ov = thermo(190, 470, 230, v, -30, 20);
  return spaceW(t, { mw: .35, mwy: 110, mwa: 6 });
}
chip('من ١٥° إلى ١٨° تحت الصفر', 760, 640, 'ice', WS(21, 14), S0(22) - .4);
function sceneDesert(t) {
  noW(); const fr = ease(ramp(t, WS(22, 8), S0(23))), d1 = hillP(-500, 1220, 940, 90, .6, 700), d2 = hillP(-500, 1220, 1010, 70, 3.1, 520), d3 = hillP(-500, 1220, 1110, 60, 5, 640);
  let s = skyR('ds', NSKY) + milkyW(.8, 420, 520, -18, 1) + starsWd(t, -500, 1220, 150, 900, 480, 15) + `<path d="${d1}" fill="#3a2e22"/><path d="${d1}" fill="#cfe0f4" opacity="${(fr * .5).toFixed(2)}"/><path d="${d2}" fill="#4a3a28"/><path d="${d2}" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="${d2}" fill="#dce8f8" opacity="${(fr * .55).toFixed(2)}"/><path d="${d3}" fill="#5a4630"/><path d="${d3}" fill="#000" filter="url(#grainR)" opacity=".35"/><path d="${d3}" fill="#e4eefa" opacity="${(fr * .6).toFixed(2)}"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + 3), x = -480 + r() * 1680, y = 1060 + r() * 200; s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} q30,-8 60,0" stroke="#000" stroke-opacity=".2" stroke-width="2" fill="none"/>`; }
  s += `<path d="M560,1010 L640,930 L720,1010Z" fill="#8a6a48"/><path d="M640,930 L720,1010 L676,1010Z" fill="#000" opacity=".3"/><path d="M628,1010 L640,960 L652,1010Z" fill="#ffd890"/>` + glowC(640, 990, 100, .5) + NB(stander(510, 1018, 3, .42, 1, t, WINT(1, .9)), .6) + rockR(180, 1090, 2.2, 4, 0) + rockR(-160, 1040, 1.5, 7, 0);
  F.ov = thermo(1090, 470, 200, lerp(8, -32, ease(ramp(t, S0(22), S0(23)))), -40, 20, 1, { cap: 'الصحراء' });
  return camMv(s, t, S0(22) - .2, S0(23), [1.05, 360, 820], [1.4, 470, 930]);
}
chip('هواءٌ جافّ = لا غطاء', 520, 150, 'dark', WS(22, 3), WS(22, 8) - .2);
function sceneCoast(t) {
  noW(); const row = cityRow(17, -500, 1200); let s = skyR('cc', NSKY) + starsWd(t, -500, 1220, 300, 760, 220, 19) + farCityW(40, 900, '#16203a', -500, 1220, .8), L = '';
  row.forEach(b => { const h = b.h * .62, top = 930 - h, r = RS(b.sd); s += `<rect x="${b.x}" y="${top}" width="${b.w - 6}" height="${h}" fill="${mix(b.col, '#0a1024', .78)}"/>`; for (let i = 0; i < Math.floor(h / 26) - 1; i++) for (let j = 0; j < Math.floor(b.w / 26); j++) if (r() < .5) L += `<rect x="${b.x + 8 + j * 26}" y="${top + 12 + i * 26}" width="12" height="15" fill="#ffd890" opacity="${(.6 + r() * .4).toFixed(2)}"/>`; });
  s += L + `<rect x="-500" y="926" width="1720" height="14" fill="#2a2e3a"/>` + seaW(t, 940, 1300, -500, 1220, ['#1a3a66', '#081428'], 'cs');
  for (let i = 0; i < 40; i++) { const r = RS(i + 60), x = -480 + r() * 1680; s += `<path d="M${x.toFixed(0)},944 v${(30 + r() * 90).toFixed(0)}" stroke="#ffd890" stroke-width="${(3 + r() * 4).toFixed(1)}" stroke-opacity="${(.1 + .12 * Math.sin(t * 2 + i) ** 2).toFixed(2)}"/>`; }
  for (let i = 0; i < 16; i++) { const k = pmod(t * .12 + i * .37, 1), x = -400 + i * 105 + Math.sin(t * .4 + i) * 20; s += `<ellipse cx="${x.toFixed(0)}" cy="${(1010 - k * 120).toFixed(0)}" rx="${(50 + k * 60).toFixed(0)}" ry="${(16 + k * 22).toFixed(0)}" fill="#dfeaff" opacity="${(.2 * Math.sin(k * Math.PI)).toFixed(2)}" filter="url(#soft)"/>`; }
  F.ov = thermo(190, 470, 200, lerp(-18, -12, ease(ramp(t, WS(23, 3), WS(23, 6)))), -40, 20, 1, { cap: 'الساحل' }) + arrow(760, 600, 760, 500, ramp(t, WS(23, 7), WS(23, 7) + .4), '#ff9a5a', 5) + arrow(930, 610, 930, 510, ramp(t, WS(23, 8), WS(23, 8) + .4), '#ff9a5a', 5) + txt(845, 660, 'حرارةُ البحر', ramp(t, WS(23, 7), WS(23, 7) + .4), '#ffb878', 26);
  return camMv(s, t, S0(23) - .2, S0(24), [1.2, 360, 880], [1.35, 420, 900]);
}
function sceneSnowWorld(t) {
  noW(); const sn = .1 + .5 * ease(ramp(t, S0(24), S0(25)));
  const ppl = NB(stander(250, 1066, 0, .5, 1, t, Object.assign({ lookUp: 1 }, WINT(0))) + stander(330, 1070, 2, .34, -1, t, Object.assign({ lookUp: 1 }, WINT(2))) + walker(900, 1056, -26, 1, .5, t, WINT(1)) + stander(560, 1074, 3, .52, -1, t, Object.assign({ lookUp: 1 }, WINT(3))), .68);
  const um = [150, 470, 760].map((x, i) => `<path d="M${x},1000 v-92" stroke="#3a3a3e" stroke-width="5"/><path d="M${x - 62},${908} q62,-52 124,0Z" fill="${['#e05a4a', '#f4c84a', '#3a8ad0'][i]}"/><path d="M${x - 62},908 q62,-60 124,0 l-10,-4 q-52,-44 -104,0Z" fill="#f2f6fb" opacity="${clamp(sn * 1.6)}"/>`).join('');
  return camMv(cityW(t, { id: 'sw', seed: 14, dark: 1, lit: 1, clouds: 0, snow: sn, fall: 1, stars: 0, cars: [[640, 0, '#c8c8cc', 1, 0]], extra: um }) + ppl, t, S0(24) - .2, S0(25), [1.0, 380, 800], [1.38, 380, 900]);
}
chip('ثلجٌ في كلِّ مكان', 640, 150, 'ice', WS(24, 5), S0(25) - .4);
function fireBarrel(x, y, t) { let f = ''; for (let i = 0; i < 7; i++) { const k = pmod(t * 1.6 + i / 7, 1), w = 16 * (1 - k) + 5; f += `<path d="M${x - w + Math.sin(t * 9 + i) * 4},${y - 60 - k * 30} q${w},${-50 * (1 - k * .5)} ${w * 2},0 q${-w},14 ${-w * 2},0Z" fill="${['#ffe08a', '#ffb04a', '#ff7a2a'][i % 3]}" opacity="${(.9 * (1 - k)).toFixed(2)}"/>`; }
  return `<circle cx="${x}" cy="${y - 60}" r="170" fill="url(#fireGlow)" opacity="${(.34 + .05 * Math.sin(t * 11)).toFixed(2)}"/><rect x="${x - 24}" y="${y - 60}" width="48" height="62" rx="5" fill="#3a3a40"/><rect x="${x - 24}" y="${y - 44}" width="48" height="5" fill="#1a1a1e"/><rect x="${x - 24}" y="${y - 20}" width="48" height="5" fill="#1a1a1e"/><ellipse cx="${x}" cy="${y - 60}" rx="24" ry="6" fill="#ff9a3a"/>` + f; }
function sceneFrozenStreet(t) {
  noW(); const px = 606, k = ramp(t, WS(25, 3), WS(25, 3) + .5);
  const pipe = `<rect x="${px}" y="760" width="12" height="240" fill="#6a7078"/><rect x="${px - 3}" y="900" width="18" height="12" fill="#4a5058"/>` + (k > 0 ? `<path d="M${px + 6},906 q${40 * k},${30} ${60 * k},${96} q${-30 * k},-20 ${-40 * k},-30 q${-6 * k},50 ${-14 * k},94 q-10,-60 -6,-160Z" fill="#dff0ff" opacity=".92"/><path d="M${px - 30},1002 q40,-26 110,0Z" fill="#dff0ff"/>` + [0, 1, 2, 3].map(i => `<path d="M${px - 4 + i * 6},912 l3,${(26 + i * 9) * k} l3,${-(26 + i * 9) * k}Z" fill="#eef8ff"/>`).join('') : '');
  const ppl = fireBarrel(250, 1070, t) + NB(stander(170, 1072, 0, .5, 1, t, Object.assign({ hug: 1 }, WINT(0))) + stander(330, 1072, 1, .5, -1, t, Object.assign({ hug: 1 }, WINT(1))) + stander(110, 1080, 2, .52, 1, t, Object.assign({ hug: 1 }, WINT(2))) + stander(396, 1082, 3, .5, -1, t, Object.assign({ hug: 1 }, WINT(3))), .85);
  return camMv(cityW(t, { id: 'fz', seed: 14, dark: 1, lit: .8, litK: .6, clouds: 0, snow: .8, fall: .5, stars: .6, cars: [[640, 0, '#c8c8cc', 1, 0]], extra: pipe }) + ppl, t, S0(25) + 2.2, S0(26), [1.5, 500, 930], [1.6, 300, 950]);
}
function sceneLake(t) {
  noW(); let s = fieldNight(t, { id: 'lk', mw: .6, snow: .8, fc: '#c8d6e6' }) + `<path d="M-500,1010 Q200,960 700,990 T1220,1000 L1220,1300 L-500,1300Z" fill="#9fc0dc"/><path d="M-500,1010 Q200,960 700,990 T1220,1000 L1220,1300 L-500,1300Z" fill="#fff" filter="url(#wallI)" opacity=".5"/>`;
  const r = RS(5); for (let i = 0; i < 26; i++) { const x = -450 + r() * 1600, y = 1030 + r() * 230; s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} l${(40 + r() * 80).toFixed(0)},${(r() * 30 - 15).toFixed(0)} l${(r() * 60).toFixed(0)},${(10 + r() * 30).toFixed(0)}" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`; }
  s += `<path d="M300,1060 q70,34 150,0 l-10,-20 l-130,0Z" fill="#6a4a30"/><path d="M372,1040 v-70" stroke="#3a2a1e" stroke-width="5"/><path d="M290,1064 q80,-10 170,0" stroke="#eef6ff" stroke-width="8" fill="none"/>` + pineR(-80, 1000, 190, 4, '#1c3a2a', { snow: .9 }) + pineR(-10, 1004, 150, 5, '#1c3a2a', { snow: .9 }) + pineR(860, 996, 210, 6, '#1c3a2a', { snow: .9 }) + `<rect x="-500" y="100" width="1720" height="1300" fill="#060a1c" opacity=".42"/>` + snowW(t, 160, .7, -500, 1220, 500, 1300, 3);
  return camMv(s, t, S0(25) - .2, S0(25) + 2.6, [1.2, 360, 900], [1.3, 380, 920]);
}
chip('أنهارٌ من جليد', 640, 150, 'ice', WS(25, 1), WS(25, 3) - .2);
function sceneGraph(t) {
  noW(); const x0 = 250, y0 = 250, w = 780, h = 330, n = 24, p = ramp(t, S0(26), WS(26, 10) + .6) * n, v = i => -18 - i * .62 - Math.sin(i * .9) * .5, Y = q => y0 + h * (q - (-16)) / (-36 - (-16));
  let d = '', dots = ''; for (let i = 0; i <= Math.min(n, Math.floor(p)); i++) { d += (i ? 'L' : 'M') + (x0 + i / n * w).toFixed(1) + ',' + Y(v(i)).toFixed(1); dots += `<circle cx="${(x0 + i / n * w).toFixed(1)}" cy="${Y(v(i)).toFixed(1)}" r="5" fill="#9fd4ff"/>`; }
  const cur = v(Math.min(n, p));
  F.ov = panel(170, 190, 940, 470) + `<path d="M${x0},${y0} v${h} h${w}" stroke="#fff" stroke-opacity=".7" stroke-width="3" fill="none"/>` + [-20, -25, -30, -35].map(q => `<path d="M${x0},${Y(q)} h${w}" stroke="#fff" stroke-opacity=".14" stroke-width="1.5"/>` + txt(x0 - 44, Y(q) + 7, AR(-q) + '°', 1, '#9fd4ff', 20)).join('') + [0, 6, 12, 18, 24].map(q => txt(x0 + q / n * w, y0 + h + 34, 'س ' + AR(q), 1, 'rgba(255,255,255,.7)', 19)).join('') +
    `<path d="${d}" stroke="#9fd4ff" stroke-width="4" fill="none"/>` + dots + txt(640, 232, 'الحرارة ساعةً بعد ساعة (تحت الصفر)', 1, '#fff', 24) + txt(940, 300, fmtT(cur), 1, '#f4c76b', 34);
  return camG(cityW(t, { id: 'gr', seed: 14, dark: 1, lit: .6, litK: .5, clouds: 0, snow: .85, fall: .4, stars: .5 }), 1.1, 380, 860) + `<rect width="1280" height="720" fill="#04060f" opacity=".45"/>`;
}
// ---------- chapter 5: after a month ----------
function shipC(x, y, s, ice = 0) { let c = ''; const r = RS(8); for (let i = 0; i < 9; i++) for (let j = 0; j < 3 + (i % 3 === 1 ? 1 : 0); j++) c += `<rect x="${-190 + i * 34}" y="${-56 - j * 20}" width="32" height="19" fill="${['#c84a3a', '#3a6ab0', '#e0a030', '#3a8a5a', '#8a8f98'][Math.floor(r() * 5)]}"/><path d="M${-190 + i * 34 + 8},${-56 - j * 20} v19 M${-190 + i * 34 + 16},${-56 - j * 20} v19 M${-190 + i * 34 + 24},${-56 - j * 20} v19" stroke="#000" stroke-opacity=".2"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-230,-36 L250,-36 L226,8 L-206,8Z" fill="#2a3a52"/><path d="M-230,-36 L250,-36 L246,-26 L-226,-26Z" fill="#fff" opacity=".2"/><path d="M-208,0 L228,0 L226,8 L-206,8Z" fill="#8a2a2a"/>${c}<rect x="132" y="-116" width="70" height="80" fill="#e8eaee"/><rect x="132" y="-116" width="70" height="80" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="138" y="-108" width="58" height="10" fill="#ffd890"/><rect x="138" y="-88" width="58" height="8" fill="#2a3a52"/><rect x="156" y="-146" width="22" height="30" fill="#c84a3a"/><path d="M167,-146 v-22" stroke="#3a3a40" stroke-width="3"/>` +
    (ice ? `<path d="M-240,6 q60,-16 120,-2 q70,-14 150,0 q70,-12 150,-2 l40,10 l-470,4Z" fill="#eef6ff" opacity="${ice}"/><path d="M-230,-36 q120,-10 240,0 t240,0 l0,5 l-480,0Z" fill="#eef6ff" opacity="${ice * .8}"/>` : '') + `</g>`; }
function craneQ(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 V-230 M40,0 V-230 M-40,-230 H40 M-40,-150 L40,-230 M40,-150 L-40,-230 M-40,-70 L40,-150 M40,-70 L-40,-150" stroke="#c8582a" stroke-width="9" fill="none"/><path d="M-130,-238 H190" stroke="#c8582a" stroke-width="13"/><path d="M0,-238 V-310 L190,-240 M0,-310 L-130,-240" stroke="#a84a22" stroke-width="5" fill="none"/><rect x="-20" y="-262" width="44" height="26" fill="#e8eaee"/><path d="M120,-232 v96" stroke="#2a2a2e" stroke-width="3"/><rect x="102" y="-138" width="36" height="20" fill="#3a6ab0"/><circle cx="0" cy="-314" r="5" fill="#ff5a4a"/></g>`; }
function icePlates(t, y0, y1, x0, x1, k, seed = 4) { const r = RS(seed); let s = ''; for (let i = 0; i < 70; i++) { const u = r(), y = y0 + u * (y1 - y0), x = x0 + r() * (x1 - x0), w = 50 + r() * 110, hh = 10 + u * 20, ap = clamp(k * 1.6 - u * .9 - r() * .3);
    if (ap > 0) s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} l${(w * .3).toFixed(0)},${(-hh * .5).toFixed(0)} l${(w * .5).toFixed(0)},${(hh * .2).toFixed(0)} l${(w * .2).toFixed(0)},${(hh * .6).toFixed(0)} l${(-w * .45).toFixed(0)},${(hh * .5).toFixed(0)} l${(-w * .4).toFixed(0)},${(-hh * .3).toFixed(0)}Z" fill="#e4f0fc" opacity="${(ap * .92).toFixed(2)}"/><path d="M${x.toFixed(0)},${y.toFixed(0)} l${(w * .3).toFixed(0)},${(-hh * .5).toFixed(0)} l${(w * .5).toFixed(0)},${(hh * .2).toFixed(0)}" stroke="#fff" stroke-width="2" fill="none" opacity="${ap.toFixed(2)}"/>`; } return s; }
function scenePort(t) {
  noW(); const a = CS(5), k = .25 + .75 * ease(ramp(t, S0(27), S0(28)));
  let s = skyR('pt', NSKY) + starsWd(t, -600, 1300, 280, 800, 260, 23) + milkyW(.5, 300, 470, -12, .9) + farCityW(52, 892, '#141e36', -600, 1300, .7) + `<rect x="-600" y="884" width="1900" height="26" fill="#3a3e48"/><rect x="-600" y="884" width="1900" height="6" fill="#eef4fa" opacity=".7"/>` + NB(craneQ(-120, 886, .9) + craneQ(330, 886, .9) + craneQ(1010, 886, .8), .7) + [-120, 330, 1010].map(x => glowC(x, 620, 150, .45)).join('') + [-320, 110, 560, 800].map(x => `<rect x="${x}" y="800" width="5" height="86" fill="#1a1c22"/>` + glowC(x + 3, 800, 90, .5)).join('') +
    seaW(t, 910, 1300, -600, 1300, ['#16345e', '#081428'], 'ps', .3) + icePlates(t, 915, 1290, -600, 1300, k) + NB(shipC(560, 1010, 1.25, k), .78) + NB(shipC(-250, 960, .8, k), .6) + snowW(t, 120, .5, -600, 1300, 400, 1300, 6);
  return camMv(s, t, a, S0(28), [.92, 200, 800], [1.25, 480, 900]);
}
chip('الموانئُ تتوقّف', 640, 150, 'ice', WS(27, 6), S0(28) - .4);
function chain(t, a) { const st = [WS(28, 3), WS(28, 8), WS(28, 11)], ic = [['نبات', '#5ab05a'], ['آكلُ عشب', '#d8b070'], ['مفترس', '#c86a5a']]; let s = `<g opacity="${a.toFixed(2)}">` + panel(330, 560, 620, 120);
  ic.forEach((c, i) => { const x = 440 + i * 200, dead = ramp(t, st[i], st[i] + .4); s += `<circle cx="${x}" cy="606" r="30" fill="${mix(c[1], '#3a3a40', dead)}"/>` + txt(x, 664, c[0], 1, '#fff', 20) + (dead > 0 ? `<path d="M${x - 20},586 l40,40 M${x + 20},586 l-40,40" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round" opacity="${dead}"/>` : '') + (i < 2 ? arrow(x + 44, 606, x + 150, 606, 1, '#fff', 3) : ''); });
  return s + `</g>`; }
function sceneDeadField(t) {
  noW(); const s = fieldNight(t, { id: 'df', mw: .6, snow: .5, fc: '#2a2a22' }) + `<rect x="-500" y="1000" width="1720" height="320" fill="#3a3626"/><rect x="-500" y="1000" width="1720" height="320" fill="#dfe8f4" filter="url(#wallI)" opacity=".7"/>` + bareTree(120, 1010, 380, 3, '#1c1a18', 18) + bareTree(830, 1004, 300, 9, '#1c1a18', 14) + NB(cropRows(t, 1020, 1280, -500, 1220, 1), .55) +
    NB(quad(420, 1090, 1.2, { kind: 'cow', face: 1, moving: t < WS(28, 8), phase: t * 4 }) + quad(lerp(1100, 700, ramp(t, WS(28, 9), S0(29))), 1130, 1.25, { kind: 'wolf', face: -1, moving: 1, phase: t * 6 }), .62);
  F.ov = chain(t, ramp(t, WS(28, 1), WS(28, 1) + .4));
  return camMv(s, t, S0(28) - .2, S0(29), [1.15, 360, 880], [1.4, 460, 960]);
}
function sceneBigTree(t) {
  noW(); const a = ramp(t, WS(29, 4), WS(29, 4) + .5), s = fieldNight(t, { id: 'bt', mw: .7, snow: .7, fc: '#c8d4e2' }) + `<rect x="-500" y="1010" width="1720" height="320" fill="#b8c6d6"/><rect x="-500" y="1010" width="1720" height="320" fill="#fff" filter="url(#wallI)" opacity=".6"/>` + `<path d="M262,1030 q-10,-150 26,-280 l44,0 q34,130 26,280Z" fill="#3a2e26"/><path d="M262,1030 q-10,-150 26,-280 l44,0 q34,130 26,280Z" fill="#000" filter="url(#woodTex)" opacity=".7"/>` + bareTree(310, 760, 560, 12, '#3a2e26', 40) + `<path d="M200,1034 q110,-30 230,0Z" fill="#eef4fa"/><rect x="-500" y="100" width="1720" height="1300" fill="#060a1c" opacity="${(.4).toFixed(2)}"/>` + snowW(t, 120, .6, -500, 1220, 400, 1300, 2);
  let dots = ''; const r = RS(3); for (let i = 0; i < 40; i++) { const an = r() * 6.283, d = Math.sqrt(r()) * 100; dots += `<circle cx="${(860 + Math.cos(an) * d).toFixed(1)}" cy="${(390 + Math.sin(an) * d).toFixed(1)}" r="${(4 + r() * 3).toFixed(1)}" fill="#f4c76b" opacity="${(.6 + .4 * Math.sin(t * 2 + i)).toFixed(2)}"/>`; }
  F.ov = `<g opacity="${a.toFixed(2)}"><path d="M520,560 L750,430" stroke="#f4c76b" stroke-width="3" stroke-dasharray="7 6"/><circle cx="860" cy="390" r="124" fill="#5a4030" stroke="#f4c76b" stroke-width="4"/>` + [100, 78, 56, 34, 14].map(q => `<circle cx="860" cy="390" r="${q}" fill="none" stroke="#2a1c14" stroke-width="3" opacity=".6"/>`).join('') + dots + txt(860, 556, 'سكّرٌ مخزونٌ في الجذع', 1, '#f4c76b', 26) + `</g>`;
  return camMv(s, t, S0(29) - .2, S0(30), [.9, 450, 740], [1.0, 470, 760]);
}
function sceneAlgae(t) {
  noW(); const dead = ease(ramp(t, WS(30, 2), WS(30, 9))), g = ramp(t, WS(30, 10), WS(30, 10) + .5), r = RS(9); let c = '';
  for (let i = 0; i < 46; i++) { const an = r() * 6.283, d = Math.sqrt(r()) * 190, x = 400 + Math.cos(an) * d + Math.sin(t * .5 + i) * 6, y = 400 + Math.sin(an) * d + Math.cos(t * .4 + i) * 6 + dead * i * .6, col = mix(['#6ad06a', '#a8d84a', '#4ab8a0'][i % 3], '#5a6068', clamp(dead * 1.5 - r() * .5)), ty = i % 3;
    c += ty === 0 ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="20" ry="8" fill="${col}" transform="rotate(${(r() * 180).toFixed(0)},${x.toFixed(1)},${y.toFixed(1)})"/>` : ty === 1 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="${col}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="12" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-dasharray="3 3"/>` : `<path d="M${x.toFixed(1)},${(y - 14).toFixed(1)} l12,22 l-24,0Z" fill="${col}"/>`; }
  F.ov = `<defs><clipPath id="lens"><circle cx="400" cy="400" r="210"/></clipPath><radialGradient id="lz"><stop offset="0" stop-color="#1a5a7a"/><stop offset="1" stop-color="#082438"/></radialGradient></defs><circle cx="400" cy="400" r="210" fill="url(#lz)"/><g clip-path="url(#lens)">${c}</g><circle cx="400" cy="400" r="210" fill="none" stroke="#c8ccd4" stroke-width="10"/><circle cx="400" cy="400" r="216" fill="none" stroke="#000" stroke-opacity=".4" stroke-width="3"/>` + txt(400, 652, 'طحالبُ مجهريّة (مكبَّرة)', 1, '#fff', 22) +
    `<g opacity="${g.toFixed(2)}">` + panel(700, 290, 470, 230) + txt(935, 336, 'الأكسجينُ في الهواء', 1, '#fff', 25) + `<rect x="740" y="364" width="390" height="40" rx="10" fill="#1a2436"/><rect x="740" y="364" width="${(390 * .21).toFixed(0)}" height="40" rx="10" fill="#7ac0ff"/>` + txt(782, 392, '٢١٪', 1, '#06122a', 22) + txt(935, 452, 'يكفينا آلافَ السنين', 1, '#f4c76b', 28) + txt(935, 492, 'المشكلةُ ليست التنفّس', 1, 'rgba(255,255,255,.7)', 20) + `</g>`;
  return `<rect width="1280" height="720" fill="#04101e"/>` + seaW(t, 0, 720, 0, 1280, ['#0a2a48', '#04101e'], 'al', .4);
}
chip('نصفُ أكسجينِ الأرض', 400, 150, 'big', WS(30, 6), WS(30, 10) - .2);
function sceneSilos(t) {
  noW(); const lv = lerp(.8, .12, ease(ramp(t, WS(31, 2), S0(32) + 1.5))), mo = 1 + Math.floor(ramp(t, WS(31, 2), S0(32) + 1.5) * 3.99);
  let s = fieldNight(t, { id: 'sl', mw: .5, snow: .8, fc: '#b8c6d6' }) + `<rect x="-500" y="1000" width="1720" height="320" fill="#aebccc"/><rect x="-500" y="1000" width="1720" height="320" fill="#fff" filter="url(#wallI)" opacity=".6"/>`;
  [140, 300, 460, 620].forEach((x, i) => { const h = 330, w = 130, top = 1010 - h, l = clamp(lv + (i - 1.5) * .04); s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#9aa2ae"/><rect x="${x}" y="${top}" width="${w * .28}" height="${h}" fill="#fff" opacity=".2"/><rect x="${x + w * .74}" y="${top}" width="${w * .26}" height="${h}" fill="#000" opacity=".22"/>` + Array.from({ length: 9 }, (_, q) => `<path d="M${x},${top + 20 + q * 36} h${w}" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`).join('') + `<path d="M${x - 4},${top} q${w / 2 + 4},-64 ${w + 8},0Z" fill="#b8c0cc"/><path d="M${x - 4},${top} q${w / 2 + 4},-70 ${w + 8},0 l-10,-2 q${-w / 2 + 6},-52 ${-w + 12},0Z" fill="#eef4fa"/>` +
      `<rect x="${x + w / 2 - 15}" y="${top + 26}" width="30" height="${h - 56}" rx="6" fill="#0a0e1c"/><rect x="${x + w / 2 - 11}" y="${(top + 30 + (h - 64) * (1 - l)).toFixed(1)}" width="22" height="${((h - 64) * l).toFixed(1)}" rx="4" fill="${l < .3 ? '#ff6a4a' : '#f4c76b'}"/>`; });
  s += `<rect x="-500" y="100" width="1720" height="1300" fill="#060a1c" opacity=".38"/>` + glowC(110, 800, 140, .5) + `<rect x="106" y="800" width="6" height="210" fill="#1a1c22"/>`;
  F.ov = panel(900, 290, 250, 150) + txt(1025, 340, 'الشهر', 1, '#fff', 26) + txt(1025, 408, AR(mo), 1, '#f4c76b', 60) + txt(520, 600, 'مخزونُ الحبوب', ramp(t, WS(31, 2), WS(31, 2) + .4), '#f4c76b', 28);
  return camMv(s, t, S0(31) - .2, CS(6), [1.25, 420, 850], [1.36, 440, 860]);
}
