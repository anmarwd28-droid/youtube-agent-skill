// iq_a.js (#63): what if everyone were a genius? Shared pieces (a new street, head glows, a drawn brain, a chalkboard, a bell curve) + scenes 0-4
const IQDEF = `<radialGradient id="iqG"><stop offset="0" stop-color="#fff2c0" stop-opacity=".95"/><stop offset=".3" stop-color="#f4c76b" stop-opacity=".5"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="brG" cx=".42" cy=".34" r=".8"><stop offset="0" stop-color="#f6c4c2"/><stop offset=".55" stop-color="#d8949a"/><stop offset="1" stop-color="#8a4a58"/></radialGradient>` +
  `<radialGradient id="cbG" cx=".45" cy=".35" r=".8"><stop offset="0" stop-color="#e2a6a8"/><stop offset="1" stop-color="#8a4c58"/></radialGradient>` +
  `<linearGradient id="bsG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9a5a62"/><stop offset=".5" stop-color="#d49a9c"/><stop offset="1" stop-color="#8a4a54"/></linearGradient>` +
  `<linearGradient id="brassH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dc96"/><stop offset=".45" stop-color="#c8963a"/><stop offset="1" stop-color="#6a4a16"/></linearGradient>` +
  `<linearGradient id="brassV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a16"/><stop offset=".4" stop-color="#f0d48a"/><stop offset=".6" stop-color="#c8963a"/><stop offset="1" stop-color="#5a3c10"/></linearGradient>` +
  `<linearGradient id="bdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c4a3a"/><stop offset="1" stop-color="#1e3628"/></linearGradient>` +
  `<radialGradient id="spotG" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#fff2d8" stop-opacity=".3"/><stop offset="1" stop-color="#fff2d8" stop-opacity="0"/></radialGradient>` +
  `<filter id="chalkF" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="d"/><feComponentTransfer in="n" result="m"><feFuncA type="linear" slope="2.2" intercept="-.5"/></feComponentTransfer><feComposite in="d" in2="m" operator="in"/></filter>` +
  `<filter id="smudge" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006 .012" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .5 -.12"/></filter>` +
  `<filter id="iqSep"><feColorMatrix values=".39 .77 .19 0 0  .35 .69 .17 0 0  .27 .53 .13 0 0  0 0 0 1 0"/></filter>`;
const IQDEF2 = IQDEF + WDEF;
const IQL = (x, y, tx, a, col = '#fff', fs = 24) => lbl(x, y, tx, a, col, fs);
const AR2 = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);

// ---------- the #63 street: new buildings, a bookshop and a café, an asphalt road ----------
const SHOPQ = [[-4, 146, 'مكتبة', '#2a5a7a'], [154, 132, 'مقهى', '#7a4a2a'], [298, 150, 'زهور', '#a83a5a'], [460, 128, 'بصريّات', '#3a6a5a'], [600, 136, 'مخبز', '#b07a2a']];
function shopRowQ(PV) { const keep = SHOPB.slice(); SHOPB.splice(0, SHOPB.length, ...SHOPQ); const r = shopRowB(PV); SHOPB.splice(0, SHOPB.length, ...keep); return r; }
function streetQ(t, o = {}) {
  const N = o.N || 0, id = o.id || 'q';
  const sky = [mix('#3c78bc', '#060c24', N), mix('#a2c4e4', '#16224a', N), mix('#f0e2c6', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(16); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 700).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`; }
  if (N < .98) s += sun3(560, 440, 1 - N) + cumulus(140 + t * 1.5, 480, 240, 31, { a: .85 * (1 - N) }) + cumulus(560 + t, 580, 190, 33, { a: .7 * (1 - N) });
  let g = farCity(71, 905, mix(sky[2], '#5a6478', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-12, 160, 360, '#c2b08e', 931, 0], [146, 150, 470, '#7a8a9a', 932, 2], [294, 160, 330, '#b06a52', 933, 1], [452, 146, 420, '#e0d2b4', 934, 0], [596, 160, 380, '#5e7a6a', 935, 1]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowQ(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c6bca8"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a49880" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 50 + 12},${PV} L${q * 50},${KB}" stroke="#a49880" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4c4c54"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 30}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  [[226, 300, 17], [660, 270, 19]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[40, 0], [430, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(pmod(-200 + t * 60, 1100) - 160, 1258, .9, '#2a5a8a', 1, 0) + car(pmod(900 - t * 50, 1100) - 160, 1170, .9, '#c8c8cc', -1, 0);
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}
// ---------- a "genius" glow on a head: a soft gold halo, sparks and a few neural threads ----------
function glowHead(x, y, s, k, t, i) {
  if (k <= 0) return ''; const r = RS(i * 7 + 3), R = 70 * s * (.8 + .2 * k), p = .85 + .15 * Math.sin(t * 4 + i);
  let g = scr(`<circle cx="${x.toFixed(1)}" cy="${(y - 6 * s).toFixed(1)}" r="${(R * 1.35 * p).toFixed(1)}" fill="url(#iqG)" opacity="${Math.min(1, 1.1 * k).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${(y - 10 * s).toFixed(1)}" r="${(R * .55).toFixed(1)}" fill="url(#iqG)" opacity="${(.8 * k).toFixed(2)}"/>`);
  if (k > 0 && k < 1) g += `<circle cx="${x.toFixed(1)}" cy="${(y - 6 * s).toFixed(1)}" r="${(R * (.4 + 1.6 * k)).toFixed(1)}" fill="none" stroke="#ffe7a0" stroke-width="${(5 * (1 - k)).toFixed(1)}" opacity="${(.9 * (1 - k)).toFixed(2)}"/>`;
  for (let j = 0; j < 5; j++) { const a = t * (1.2 + r()) + j * 1.26, rr = (26 + 12 * r()) * s, sx = x + Math.cos(a) * rr, sy = y - 8 * s + Math.sin(a) * rr * .6 - 16 * s, z = (1.5 + 2 * r()) * s * k;
    g += `<path d="M${sx.toFixed(1)},${(sy - z * 2).toFixed(1)} L${(sx + z * .5).toFixed(1)},${(sy - z * .5).toFixed(1)} L${(sx + z * 2).toFixed(1)},${sy.toFixed(1)} L${(sx + z * .5).toFixed(1)},${(sy + z * .5).toFixed(1)} L${sx.toFixed(1)},${(sy + z * 2).toFixed(1)} L${(sx - z * .5).toFixed(1)},${(sy + z * .5).toFixed(1)} L${(sx - z * 2).toFixed(1)},${sy.toFixed(1)} L${(sx - z * .5).toFixed(1)},${(sy - z * .5).toFixed(1)}Z" fill="#fff4cc" opacity="${(.9 * k).toFixed(2)}"/>`; }
  return g;
}
// thin gold threads between heads, with pulses running along them
function threads(P, k, t) {
  if (k <= 0 || P.length < 2) return ''; let g = '';
  for (let i = 0; i < P.length - 1; i++) { const [x0, y0] = P[i], [x1, y1] = P[i + 1], mx = (x0 + x1) / 2, my = Math.min(y0, y1) - 60 - 20 * Math.sin(i * 2.1), kk = clamp(k * 2 - i * .15);
    if (kk <= 0) continue; const d = `M${x0.toFixed(1)},${(y0 - 10).toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${(y1 - 10).toFixed(1)}`;
    g += `<path d="${d}" stroke="#f4c76b" stroke-width="2.6" fill="none" opacity="${(.7 * kk).toFixed(2)}" stroke-dasharray="${(kk * 400).toFixed(0)} 400"/>`;
    const u = pmod(t * .8 + i * .37, 1), qx = (1 - u) * (1 - u) * x0 + 2 * u * (1 - u) * mx + u * u * x1, qy = (1 - u) * (1 - u) * (y0 - 10) + 2 * u * (1 - u) * my + u * u * (y1 - 10);
    if (kk > .9) g += scr(`<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="9" fill="url(#iqG)"/>`); }
  return g;
}
// ---------- a drawn brain, side view (front to the right); (cx, cy) = centre, s = scale (about 300 x 260 at s = 1) ----------
const BRP = 'M-150,8 C-160,-62 -108,-116 -28,-120 C52,-124 132,-96 150,-30 C162,10 150,46 122,60 C100,72 76,70 56,64 C30,86 -16,84 -46,66 C-92,64 -132,52 -150,8Z';
function brainSide(cx, cy, s, seed = 1, o = {}) {
  const r = RS(seed), id = 'brC' + seed, gl = o.glow || 0;
  let g = `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) scale(${s})"><defs><clipPath id="${id}"><path d="${BRP}"/></clipPath></defs>`;
  if (!o.noShadow) g += `<ellipse cx="0" cy="140" rx="150" ry="16" fill="#000" opacity=".35" filter="url(#blur9)"/>`;
  // brain stem and cerebellum (behind)
  g += `<path d="M-52,50 C-44,80 -50,112 -58,138 L-26,142 C-20,110 -14,82 -16,56Z" fill="url(#bsG)"/><path d="M-50,60 C-44,90 -48,116 -54,138" stroke="#6a3440" stroke-width="2" fill="none" opacity=".4"/>`;
  g += `<ellipse cx="-96" cy="70" rx="58" ry="34" fill="url(#cbG)"/>`;
  for (let i = 0; i < 9; i++) { const yy = 46 + i * 6; g += `<path d="M${-150 + i * 2},${yy} Q-96,${yy - 10 + i * 1.4} ${-42 - i * 2},${yy + 2}" stroke="#6a2e3c" stroke-width="1.6" fill="none" opacity=".5" clip-path="url(#cbc${seed})"/>`; }
  g = g.replace('</defs>', `<clipPath id="cbc${seed}"><ellipse cx="-96" cy="70" rx="58" ry="34"/></clipPath></defs>`);
  // cerebrum: base fill, folds (gyri), the lateral and central sulci, shading
  g += `<path d="${BRP}" fill="url(#brG)"/><g clip-path="url(#${id})">`;
  let dk = '', lt = '';
  for (let i = 0; i < 78; i++) { let x = -150 + r() * 300, y = -122 + r() * 196, a = r() * 6.283; const n = 6 + Math.floor(r() * 7); let d = `M${x.toFixed(1)},${y.toFixed(1)}`;
    for (let j = 0; j < n; j++) { a += (r() - .5) * 2.8; const L = 7 + r() * 5, qx = x + Math.cos(a) * L * .6, qy = y + Math.sin(a) * L * .6; x += Math.cos(a) * L; y += Math.sin(a) * L; a += (r() - .5) * .8; d += ` Q${qx.toFixed(1)},${qy.toFixed(1)} ${x.toFixed(1)},${y.toFixed(1)}`; }
    dk += d + ' '; lt += d + ' '; }
  g += `<path d="${dk}" stroke="#5a1e2c" stroke-width="9" fill="none" opacity=".3" stroke-linecap="round" filter="url(#blur2)" transform="translate(2,3)"/><path d="${lt}" stroke="#ffe8e6" stroke-width="8" fill="none" opacity=".3" stroke-linecap="round" transform="translate(-3,-3)"/><path d="${dk}" stroke="#6e2c3a" stroke-width="4.2" fill="none" opacity=".8" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += `<path d="M78,40 C40,22 4,10 -40,-2" stroke="#5a2232" stroke-width="5" fill="none" opacity=".75"/><path d="M78,44 C40,26 4,14 -40,2" stroke="#ffd8d8" stroke-width="2" fill="none" opacity=".35"/>` +
    `<path d="M8,-120 C14,-80 26,-40 36,10" stroke="#5a2232" stroke-width="4" fill="none" opacity=".6"/>`;
  g += `<path d="${BRP}" fill="#fff" opacity=".0"/><ellipse cx="-30" cy="-60" rx="120" ry="60" fill="#fff" opacity=".12" filter="url(#blur9)"/><path d="M-150,8 C-132,52 -92,64 -46,66 C-16,84 30,86 56,64 C76,70 100,72 122,60" stroke="#4a1a28" stroke-width="16" fill="none" opacity=".25" filter="url(#blur5)"/>`;
  if (gl > 0) g += `<path d="${BRP}" fill="#ffd36a" opacity="${(.28 * gl).toFixed(2)}"/><path d="${dk}" stroke="#fff3c0" stroke-width="2.4" fill="none" opacity="${(.7 * gl).toFixed(2)}"/>`;
  g += `</g><path d="${BRP}" fill="none" stroke="#6a2a38" stroke-width="2.4" opacity=".7"/>`;
  if (gl > 0) g += scr(`<ellipse cx="0" cy="-20" rx="${190}" ry="150" fill="url(#iqG)" opacity="${(.5 * gl).toFixed(2)}"/>`);
  return g + `</g>`;
}
// ---------- a classroom wall with a chalkboard; inner(clipped to the board) ----------
const BD = { x: 40, y: 430, w: 640, h: 500 };
function boardRoom(t, inner, o = {}) {
  const { x, y, w, h } = BD;
  let s = `<defs>${IQDEF}${GNDEF}<clipPath id="bdC"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#d8ccb0"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".16"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#spotG)"/>`;
  s += `<rect x="-20" y="1040" width="760" height="280" fill="#8a6a4a"/><rect x="-20" y="1040" width="760" height="280" fill="#000" filter="url(#gnWood)" opacity=".45"/><rect x="-20" y="1030" width="760" height="14" fill="#6a4e36"/><rect x="-20" y="1044" width="760" height="20" fill="url(#aoDn)" opacity=".6"/>`;
  for (let i = 0; i < 9; i++) s += `<path d="M${-20 + i * 96},1064 L${-200 + i * 140},1300" stroke="#5a3e28" stroke-width="2" opacity=".5"/>`;
  s += `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="4" fill="#7a5232"/><rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="4" fill="#000" filter="url(#gnWood)" opacity=".4"/><rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="5" fill="#fff" opacity=".2"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#bdG)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" filter="url(#smudge)" opacity=".5"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  s += `<path d="M${x + 60},${y + 60} q120,40 240,-10 M${x + 380},${y + 420} q90,-30 200,10" stroke="#fff" stroke-width="40" opacity=".035" fill="none" stroke-linecap="round"/>`;
  s += `<g clip-path="url(#bdC)">${inner}</g>`;
  s += `<rect x="${x - 20}" y="${y + h + 8}" width="${w + 40}" height="16" fill="#6a4628"/><rect x="${x - 20}" y="${y + h + 8}" width="${w + 40}" height="4" fill="#fff" opacity=".2"/><rect x="${x - 20}" y="${y + h + 24}" width="${w + 40}" height="10" fill="#000" opacity=".2" filter="url(#blur2)"/>` +
    `<rect x="${x + 420}" y="${y + h - 6}" width="60" height="16" rx="3" fill="#3a3a44"/><rect x="${x + 420}" y="${y + h + 2}" width="60" height="8" fill="#c8c0a8"/><rect x="${x + 520}" y="${y + h + 2}" width="34" height="7" rx="3" fill="#f2f0e8"/><rect x="${x + 566}" y="${y + h + 3}" width="22" height="6" rx="3" fill="#f2d070"/>`;
  return s;
}
// a bell curve in chalk. m = mean on screen (x), sd = px per 15 points, base y, peak height, cut = x from which the tail is painted gold (or null)
function bellPath(m, sd, base, H, x0, x1) { let d = ''; for (let x = x0; x <= x1; x += 4) { const z = (x - m) / sd, y = base - H * Math.exp(-.5 * z * z); d += (d ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; }
function bell(m, sd, base, H, k, o = {}) {
  const x0 = m - sd * 4, x1 = m + sd * 4, d = bellPath(m, sd, base, H, x0, x1);
  let s = `<g filter="url(#chalkF)"><path d="${d} L${x1},${base} L${x0},${base}Z" fill="#fff" opacity=".06"/>`;
  if (o.cut != null && o.ca > 0) { const c = o.cut; s += `<path d="${bellPath(m, sd, base, H, c, x1)} L${x1},${base} L${c},${base}Z" fill="#f4c76b" opacity="${(.75 * o.ca).toFixed(2)}"/>`; }
  s += `<path d="${d}" stroke="#f4f2ea" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="${(k * 1400).toFixed(0)} 1400"/></g>`;
  return s;
}
// chalk text
const chalkT = (x, y, tx, a, col = '#f4f2ea', fs = 30, dir = 'rtl') => a > 0 ? `<text x="${x}" y="${y}" text-anchor="middle" direction="${dir}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a.toFixed(2)}" filter="url(#chalkF)">${tx}</text>` : '';

// ---------- 0: hook. A city street in the morning; the people's heads light up one by one ----------
const WALKQ = [[60, 1046, 1, 0, .6, 36], [250, 1080, 1, 2, .66, 30], [430, 1052, -1, 1, .6, 34], [560, 1092, -1, 3, .7, 30], [680, 1040, -1, 4, .58, 32], [-60, 1092, 1, 5, .68, 34]];
function crowdQ(t, T, k, o = {}) {
  let g = '', P = [];
  WALKQ.forEach(([x0, y, f, i, s, v], j) => { const x = x0 + f * v * T, kk = clamp(k * 1.6 - j * .12);
    g += hero(x, y, Object.assign({ s, face: f, shade: 1, walk: T * 4.4 + j * 1.3, amp: .42 }, gp(i + (o.pal || 0))));
    const [hx, hy] = HP.head; P.push([hx, hy, kk]); });
  const ord = P.slice().sort((a, b) => a[0] - b[0]);
  g += threads(ord.filter(p => p[2] > 0), k, T);
  P.forEach(([hx, hy, kk], j) => { g += glowHead(hx, hy, WALKQ[j][4], kk * (o.gk ?? 1), T, j); });
  return g;
}
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 6) - .5, WS(0, 6) + .9));
  noEarth(); F.ov = '';
  return `<defs>${IQDEF}</defs>` + streetQ(t, { N: .06, id: 'h0', top: crowdQ(t, t, k) });
}
// ---------- 1: the chalkboard: a bell curve; only about 2% above 130 ----------
const BX = v => 360 + (v - 100) * 70 / 15;
function sceneCurve(t) {
  const k = ease(ramp(t, S0(1), WS(1, 4))), ax = ease(ramp(t, S0(1) - .2, S0(1) + .3)), ca = ease(ramp(t, WS(1, 10) - .2, WS(1, 11) + .3));
  let inn = `<g filter="url(#chalkF)"><path d="M80,860 H650" stroke="#f4f2ea" stroke-width="4" opacity="${ax.toFixed(2)}"/></g>`;
  inn += bell(BX(100), 70, 860, 330, k, { cut: BX(130), ca });
  [[70, '٧٠'], [100, '١٠٠'], [130, '١٣٠'], [145, '١٤٥']].forEach(([v, s], i) => { const a = ease(ramp(t, WS(1, 1) + i * .2, WS(1, 1) + i * .2 + .4)); inn += `<g filter="url(#chalkF)"><path d="M${BX(v)},852 v16" stroke="#f4f2ea" stroke-width="4" opacity="${a.toFixed(2)}"/></g>` + chalkT(BX(v), 904, s, a, v === 130 ? '#f4c76b' : '#f4f2ea', 30); });
  inn += chalkT(370, 486, 'مُعامِلُ الذكاء', ease(ramp(t, WS(1, 8) - .3, WS(1, 8) + .2)), '#f4f2ea', 34);
  inn += chalkT(BX(100), 640, 'أغلبُ الناس', ease(ramp(t, WS(1, 6), WS(1, 7))), '#f4f2ea', 32);
  inn += chalkT(BX(140) + 6, 760, '٢٪', ca, '#f4c76b', 46);
  if (ca > 0) inn += `<g filter="url(#chalkF)" opacity="${ca.toFixed(2)}"><path d="M${BX(140) + 6},776 Q${BX(140) - 6},800 ${BX(136)},818" stroke="#f4c76b" stroke-width="3" fill="none"/></g>`;
  // the teacher points at the tail
  const tp = ease(ramp(t, WS(1, 9), WS(1, 10)));
  let s = boardRoom(t, inn);
  s += hero(96, 1196, Object.assign({ s: 1.02, face: 1, shade: 1, hF: [lerp(200, 236, tp), lerp(1010, 940, tp)], lookUp: .2 }, gp(5)));
  { const [hx, hy] = HP.hand, tx = lerp(330, BX(137), tp), ty = lerp(950, 836, tp), L = Math.hypot(tx - hx, ty - hy), ux = (tx - hx) / L, uy = (ty - hy) / L;
    s += `<path d="M${(hx - ux * 14).toFixed(1)},${(hy - uy * 14).toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}" stroke="#5a3a1e" stroke-width="5" stroke-linecap="round"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="3.5" fill="#2a1a0c"/>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the globe: eight billion people at once, gold lights everywhere ----------
function sceneBillions(t) {
  const t0 = S0(2) - .2, T = t - t0, n = ease(ramp(t, WS(2, 1), WS(2, 7) + .3)), pa = ease(ramp(t, WS(2, 2) - .3, WS(2, 2)));
  const G = glE(t, { d: 9.6, el: .28, lon: 30 + T * 7, clouds: .4, lights: .4 + .9 * n, off: -.55 });
  let ov = '';
  CITY.forEach(([la, lo], i) => { const kk = clamp(n * 1.4 - (i / CITY.length) * .5); if (kk <= 0) return; const v = G.vis(la, lo); if (v < .08) return; const [x, y] = G.P(la, lo, 1.01), p = .8 + .2 * Math.sin(t * 3 + i), a = kk * clamp((v - .08) / .2);
    ov += scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(26 * p).toFixed(1)}" fill="url(#iqG)" opacity="${(.8 * a).toFixed(2)}"/>`) + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.6" fill="#fff6d0" opacity="${a.toFixed(2)}"/>`; });
  if (pa > 0) ov += `<g opacity="${pa.toFixed(2)}">${panel(110, 1080, 500, 140)}${IQL(360, 1150, ARK(Math.round(8e9 * n)), 1, '#f4c76b', 54)}${IQL(360, 1196, 'إنسانٍ بذكاءِ أعظمِ العلماء', 1, '#fff', 24)}</g>`;
  F.ov = `<defs>${IQDEF}</defs>` + ov;
  return space(t);
}
// ---------- 3: genius is not a bigger brain: a brass balance, an average brain and Einstein's lighter one ----------
function sceneBrains(t) {
  const tilt = 7 * ease(ramp(t, WS(3, 7), WS(3, 9) + .4)) - 0, a1 = ease(ramp(t, WS(3, 7), WS(3, 8))), a0 = ease(ramp(t, WS(3, 4), WS(3, 5)));
  let s = `<defs>${IQDEF}${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141826"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<path d="M300,-20 L420,-20 L700,1200 L20,1200Z" fill="#fff2d8" opacity=".06" filter="url(#blur9)"/><ellipse cx="360" cy="1180" rx="330" ry="50" fill="#fff2d8" opacity=".08" filter="url(#blur9)"/>`;
  s += `<rect x="-20" y="1150" width="760" height="170" fill="#2a2420"/><rect x="-20" y="1150" width="760" height="170" fill="#000" filter="url(#gnWood)" opacity=".4"/><path d="M-20,1150 h760" stroke="#5a4a3a" stroke-width="3"/>`;
  // the balance: base, post, beam tilted by `tilt` (right side up = lighter)
  const px = 360, py = 610, L = 250, an = -tilt * Math.PI / 180, ex = [px - L * Math.cos(an), px + L * Math.cos(an)], ey = [py - L * Math.sin(an), py + L * Math.sin(an)];
  s += `<ellipse cx="360" cy="1150" rx="120" ry="18" fill="#000" opacity=".5" filter="url(#blur5)"/><path d="M270,1150 Q280,1110 330,1100 L390,1100 Q440,1110 450,1150Z" fill="url(#brassH)"/><rect x="348" y="${py}" width="24" height="${1100 - py}" fill="url(#brassV)"/><circle cx="360" cy="${py - 6}" r="22" fill="url(#brassH)"/><path d="M352,${py - 40} L360,${py - 70} L368,${py - 40}Z" fill="url(#brassV)"/>`;
  s += `<g transform="rotate(${(-tilt).toFixed(2)},${px},${py})"><rect x="${px - L - 10}" y="${py - 8}" width="${2 * L + 20}" height="16" rx="8" fill="url(#brassH)"/><circle cx="${px - L}" cy="${py}" r="11" fill="url(#brassH)"/><circle cx="${px + L}" cy="${py}" r="11" fill="url(#brassH)"/></g><circle cx="${px}" cy="${py}" r="9" fill="#5a3c10"/>`;
  // pans with chains and brains
  const pan = (x, y, bs, sd, gl) => { const yp = y + 300; let g = '';
    [-80, 0, 80].forEach(dx => g += `<path d="M${x},${y + 6} L${x + dx},${yp}" stroke="#b8923e" stroke-width="2.4" stroke-dasharray="6 3"/>`);
    g += brainSide(x, yp - 64 * bs, bs * .62, sd, { noShadow: 1, glow: gl }) + `<path d="M${x - 110},${yp} Q${x},${yp + 46} ${x + 110},${yp}Z" fill="url(#brassH)"/><ellipse cx="${x}" cy="${yp}" rx="110" ry="12" fill="#e8c878"/><ellipse cx="${x}" cy="${yp + 1}" rx="96" ry="8" fill="#8a6a2a" opacity=".5"/>`;
    return g; };
  s += pan(ex[0], ey[0], 1.0, 3, 0) + pan(ex[1], ey[1], .93, 5, .35 * a1);
  s += IQL(ex[0], ey[0] + 400, 'دماغٌ متوسّط', a0, '#fff', 26) + IQL(ex[0], ey[0] + 440, '≈ ١٣٥٠ غرام', a0, '#f4c76b', 32);
  s += IQL(ex[1], ey[1] + 400, 'أينشتاين', a1, '#fff', 26) + IQL(ex[1], ey[1] + 440, '١٢٣٠ غرام', a1, '#f4c76b', 32);
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: the brain is 2% of the weight but uses 20% of the energy ----------
function sceneEnergy(t) {
  const t0 = S0(4) - .2, T = t - t0, e = ease(ramp(t, WS(4, 2) - .2, WS(4, 6))), w = ease(ramp(t, WS(4, 9), WS(4, 12)));
  let s = `<defs>${IQDEF}<linearGradient id="enW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a52"/><stop offset="1" stop-color="#121a2a"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#enW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let i = 0; i < 14; i++) s += `<path d="M${i * 56},380 V1300" stroke="#6a8ab0" stroke-width="1" opacity=".08"/><path d="M-20,${400 + i * 64} H740" stroke="#6a8ab0" stroke-width="1" opacity=".08"/>`;
  // the person, big, in profile; food energy runs up to the head
  const ps = 1.32, px = 180, py = 1220;
  s += hero(px, py, Object.assign({ s: ps, face: 1, shade: 1, noShadow: 1 }, gp(0)));
  const [hx, hy] = HP.head, hip = HP.hip;
  for (let i = 0; i < 16; i++) { const u = pmod(T * .55 + i / 16, 1), x = lerp(hip[0] + 8, hx, u) + Math.sin(u * 9 + i) * 6, y = lerp(hip[1] - 40, hy + 10, u), a = e * Math.sin(u * Math.PI);
    s += scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="url(#iqG)" opacity="${a.toFixed(2)}"/>`); }
  // a round inset: the brain inside the head
  s += scr(`<circle cx="${hx}" cy="${hy}" r="${(40 + 10 * Math.sin(T * 4)).toFixed(1)}" fill="url(#iqG)" opacity="${(.8 * e).toFixed(2)}"/>`) + `<path d="M${hx + 10},${hy - 30} L230,770" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 6" opacity=".8"/>` +
    `<circle cx="210" cy="600" r="172" fill="#0a0e1c" opacity=".9"/>${brainSide(214, 600, .82, 7, { noShadow: 1, glow: e })}<circle cx="210" cy="600" r="172" fill="none" stroke="#f4c76b" stroke-width="5"/>`;
  // two bars: weight and energy
  const bar = (x, lab, v, k, col) => { const H = 520, top = 1150 - H; let g = `<rect x="${x - 46}" y="${top}" width="92" height="${H}" rx="14" fill="#0a0e1c" opacity=".7"/><rect x="${x - 46}" y="${top}" width="92" height="${H}" rx="14" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>`;
    const h = H * v * k * 3.5; g += `<rect x="${x - 38}" y="${(1142 - h).toFixed(1)}" width="76" height="${h.toFixed(1)}" rx="9" fill="${col}"/>` + IQL(x, 1196, lab, 1, '#fff', 26) + IQL(x, (1130 - h - 16).toFixed(1), AR2(Math.round(v * 100 * k)) + '٪', k > .02 ? 1 : 0, col, 40); return g; };
  s += bar(470, 'الوزن', .02, w, '#9ab8d8') + bar(610, 'الطاقة', .2, e, '#f4c76b');
  s += IQL(540, 520, '≈ ٢٠ واط', ease(ramp(t, WS(4, 5), WS(4, 6))), '#f4c76b', 34);
  noEarth(); F.ov = ''; return s;
}
