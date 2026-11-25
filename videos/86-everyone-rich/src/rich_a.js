// rich_a.js (#86): what if every human suddenly had a million dollars? Built on the #85 chain (streetD, hero, p39, shelfE, glE, studio).
const r1 = v => (+v).toFixed(1);
const RL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const fmtA = n => AR(Math.round(n).toLocaleString('en-US')).replace(/,/g, '٬');
const RCD = `<radialGradient id="rcPop"><stop offset="0" stop-color="#fff4c8" stop-opacity=".85"/><stop offset=".4" stop-color="#f4c76b" stop-opacity=".35"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="rcScr"><stop offset="0" stop-color="#a8e8c0" stop-opacity=".6"/><stop offset="1" stop-color="#7ad8a0" stop-opacity="0"/></radialGradient>
<radialGradient id="rcDot"><stop offset="0" stop-color="#fff6d0" stop-opacity="1"/><stop offset=".35" stop-color="#f4c76b" stop-opacity=".7"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="rcBread" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f2c47e"/><stop offset=".55" stop-color="#c8843a"/><stop offset="1" stop-color="#7e461a"/></radialGradient>
<linearGradient id="rcNote" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9cc49a"/><stop offset=".5" stop-color="#7aa878"/><stop offset="1" stop-color="#5a8a5a"/></linearGradient>
<linearGradient id="rcTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece4d4"/><stop offset="1" stop-color="#cfc2a8"/></linearGradient>
<linearGradient id="rcWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a42"/><stop offset="1" stop-color="#5e3c20"/></linearGradient>
<linearGradient id="rcCnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0d8c8"/><stop offset="1" stop-color="#a89c88"/></linearGradient>
<linearGradient id="rcBox" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f2ee"/><stop offset="1" stop-color="#c8c8c2"/></linearGradient>
<linearGradient id="rcCab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset="1" stop-color="#1e3e6a"/></linearGradient>
<linearGradient id="rcGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfe4f4"/><stop offset="1" stop-color="#6a8aa8"/></linearGradient>
<linearGradient id="rcBag" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a4e58"/><stop offset=".5" stop-color="#1e2026"/><stop offset="1" stop-color="#0c0d10"/></linearGradient>
<linearGradient id="rcGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8902a"/><stop offset=".5" stop-color="#ffe08a"/><stop offset="1" stop-color="#c8902a"/></linearGradient>
<linearGradient id="rcBlue" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a7ac8"/><stop offset="1" stop-color="#8ac4ff"/></linearGradient>
<linearGradient id="rcRed" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#c8382e"/><stop offset="1" stop-color="#ff8a6a"/></linearGradient>
<linearGradient id="rcSep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b48e"/><stop offset="1" stop-color="#8a7452"/></linearGradient>
<linearGradient id="rcWheat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4d68a"/><stop offset="1" stop-color="#c89a3a"/></linearGradient>
<linearGradient id="rcSky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a92cc"/><stop offset="1" stop-color="#e8dcc0"/></linearGradient>
<radialGradient id="rcIn" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#2a3450"/><stop offset="1" stop-color="#0e1222"/></radialGradient>
<filter id="rcSepF" x="-200" y="-200" width="1120" height="1700" filterUnits="userSpaceOnUse"><feColorMatrix type="matrix" values=".42 .58 .14 0 .02  .36 .52 .12 0 .0  .27 .40 .10 0 -.02  0 0 0 1 0"/></filter>`;
const RCDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${RCD}`;
const rcQ = (x, y, a, sc = 1) => a <= 0 ? '' : `<text x="${r1(x)}" y="${r1(y)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${r1(54 * sc * (.6 + .4 * Math.min(1, a * 1.4)))}" fill="#f4c76b" opacity="${r1(Math.min(1, a))}" style="paint-order:stroke" stroke="#2a1a08" stroke-width="4">؟</text>`;
const rcSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
function rcSubs(t, P, d = .35) {
  let i = 0; P.forEach((p, j) => { if (t >= p[0]) i = j; });
  const k = i > 0 ? ease(ramp(t, P[i][0], P[i][0] + d)) : 1;
  return k < 1 ? P[i - 1][1](t) + `<g opacity="${Math.round(k * 100) / 100}">${P[i][1](t)}</g>` : P[i][1](t);
}
function rcInset(x, y, inner, a, R = 100, id = 'i') {
  if (a <= 0) return ''; const k = .7 + .3 * Math.min(1, a * 1.3);
  return `<g opacity="${r1(Math.min(1, a))}" transform="translate(${x},${y}) scale(${r1(k * 100) / 100})"><defs><clipPath id="rcC${id}"><circle r="${R}"/></clipPath></defs><circle r="${R + 6}" fill="#0a0e1c" opacity=".55"/><g clip-path="url(#rcC${id})"><circle r="${R}" fill="url(#rcIn)"/>${inner}</g><circle r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
}
// ---------- props ----------
// a phone held in the hand, screen facing the person (a soft green glow)
const rcPhone = (P, s, f, glow = 1) => `<g transform="translate(${r1(P[0])},${r1(P[1])}) rotate(${-f * 14}) scale(${s})"><rect x="-8" y="-15" width="16" height="27" rx="3.4" fill="#15181e"/><rect x="-6.4" y="-12.8" width="12.8" height="22" rx="2" fill="#bff0d0" opacity="${r1(.25 + .7 * glow)}"/></g>` + (glow > 0 ? `<circle cx="${r1(P[0])}" cy="${r1(P[1])}" r="${r1(26 * s)}" fill="url(#rcScr)" opacity="${r1(glow)}"/>` : '');
// a green bank notification bubble
function rcBubble(x, y, a, s = 1) {
  if (a <= 0) return ''; const k = .6 + .4 * Math.min(1, a * 1.5);
  return `<g opacity="${r1(Math.min(1, a))}" transform="translate(${r1(x)},${r1(y - (1 - Math.min(1, a)) * 20)}) scale(${r1(s * k * 100) / 100})"><rect x="-76" y="-24" width="152" height="40" rx="14" fill="#14301e" opacity=".9"/><rect x="-76" y="-24" width="152" height="40" rx="14" fill="none" stroke="#5ad88a" stroke-width="2.4"/><path d="M-8,16 L0,28 L8,16Z" fill="#14301e"/>` +
    `<text x="0" y="5" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="#7af0a8">+١٬٠٠٠٬٠٠٠ $</text></g>`;
}
// a loaf of bread
const loaf = (x, y, s = 1, rot = 0) => `<g transform="translate(${r1(x)},${r1(y)}) rotate(${rot}) scale(${s})"><ellipse cx="2" cy="10" rx="40" ry="8" fill="#000" opacity=".22"/><path d="M-40,6 Q-44,-22 -10,-26 Q20,-30 38,-14 Q46,-2 38,8 Q0,14 -40,6Z" fill="url(#rcBread)"/>` +
  [-20, -4, 12, 26].map((q, i) => `<path d="M${q - 6},${-18 + i * 2} q8,4 10,14" stroke="#f6d8a0" stroke-width="3" fill="none" opacity=".75" stroke-linecap="round"/>`).join('') + `<path d="M-30,-14 Q-4,-28 26,-18" stroke="#fff" stroke-width="3" fill="none" opacity=".18"/></g>`;
// a generic banknote (no portrait): medallion + value
function bnote(x, y, w, col, txt, rot = 0, o = {}) {
  const h = w * .46, dk = mix(col, '#000000', .38);
  return `<g transform="translate(${r1(x)},${r1(y)}) rotate(${r1(rot)})"${o.sk ? ` opacity="${o.sk}"` : ''}><rect x="${-w / 2 + 3}" y="${-h / 2 + 4}" width="${w}" height="${h}" rx="4" fill="#000" opacity=".22"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="${col}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="#fff" filter="url(#grainR)" opacity=".18"/>` +
    `<rect x="${-w / 2 + w * .04}" y="${-h / 2 + w * .04}" width="${w * .92}" height="${h - w * .08}" rx="3" fill="none" stroke="${dk}" stroke-width="${r1(Math.max(1, w * .012))}"/>` +
    `<circle cx="${r1(w * .24)}" cy="0" r="${r1(h * .3)}" fill="${mix(col, '#ffffff', .3)}"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${r1(w * .24)},0 l${r1(h * .28 * Math.cos(i * .785))},${r1(h * .28 * Math.sin(i * .785))}" stroke="${dk}" stroke-width="${r1(Math.max(.8, w * .008))}"/>`).join('') +
    (txt ? `<text x="${r1(-w * .14)}" y="${r1(h * .13)}" text-anchor="middle" direction="${o.ltr ? 'ltr' : 'rtl'}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${r1(o.fs || h * .34)}" fill="${mix(col, '#000000', .55)}">${txt}</text>` : '') + (o.extra || '') + `</g>`;
}
// a bundle of notes with a paper band
function bundle(x, y, w, n, col = '#7aa878') {
  let s = ''; const h = w * .46;
  for (let i = 0; i < n; i++) s += `<rect x="${r1(x - w / 2 + (i % 2) * 1.5)}" y="${r1(y - h / 2 - i * 2.4)}" width="${w}" height="${r1(h)}" rx="3" fill="${i === n - 1 ? col : mix(col, '#000000', .18 + .1 * (i % 2))}"/>`;
  const top = y - h / 2 - (n - 1) * 2.4;
  return s + `<rect x="${r1(x - w / 2)}" y="${r1(top)}" width="${w}" height="${r1(h)}" rx="3" fill="none" stroke="${mix(col, '#000000', .4)}" stroke-width="1.4"/><circle cx="${r1(x + w * .22)}" cy="${r1(top + h / 2)}" r="${r1(h * .25)}" fill="${mix(col, '#ffffff', .3)}"/><rect x="${r1(x - w * .12)}" y="${r1(top - 1)}" width="${r1(w * .16)}" height="${r1(h + (n - 1) * 2.4 + 2)}" fill="#efe6cc"/>`;
}
// a box delivery truck seen from the side (parked)
function boxTruck(x, y, s, f = 1) {
  const wh = (cx) => `<circle cx="${cx}" cy="-22" r="24" fill="#1a1a1e"/><circle cx="${cx}" cy="-22" r="13" fill="#8a8e96"/><circle cx="${cx}" cy="-22" r="5" fill="#3a3c42"/>` + [0, 1, 2, 3, 4].map(k => `<circle cx="${r1(cx + 9 * Math.cos(k * 1.2566))}" cy="${r1(-22 + 9 * Math.sin(k * 1.2566))}" r="1.8" fill="#4a4c52"/>`).join('');
  return `<g transform="translate(${r1(x)},${r1(y)}) scale(${f * s},${s})"><ellipse cx="0" cy="2" rx="200" ry="12" fill="#000" opacity=".35" filter="url(#blur2)"/>` +
    `<rect x="-190" y="-220" width="270" height="180" rx="4" fill="url(#rcBox)"/><rect x="-190" y="-220" width="270" height="180" fill="#000" filter="url(#grainR)" opacity=".08"/><path d="M-190,-60 H80" stroke="#9a9a94" stroke-width="3"/>` + [0, 1, 2, 3].map(k => `<path d="M${-150 + k * 60},-216 V-62" stroke="#d8d8d2" stroke-width="2"/>`).join('') +
    `<rect x="-190" y="-220" width="270" height="10" fill="#fff" opacity=".4"/><rect x="-170" y="-170" width="120" height="44" rx="6" fill="#2a6aa8" opacity=".85"/><path d="M-160,-148 h100" stroke="#fff" stroke-width="5" opacity=".7"/>` +
    `<path d="M86,-40 V-150 Q86,-162 98,-162 H150 Q166,-162 174,-146 L196,-96 Q200,-88 200,-78 V-40Z" fill="url(#rcCab)"/><path d="M104,-150 H148 Q158,-150 164,-138 L182,-98 H104Z" fill="url(#rcGlass)"/><path d="M110,-146 L132,-102" stroke="#fff" stroke-width="5" opacity=".25"/>` +
    `<rect x="100" y="-88" width="16" height="5" rx="2" fill="#c8c8cc"/><rect x="186" y="-70" width="16" height="10" rx="3" fill="#f4e8a8"/><rect x="-196" y="-46" width="400" height="12" rx="4" fill="#2a2c30"/>` + wh(-130) + wh(-60) + wh(150) + `</g>`;
}
// a black rubbish bag
function rbag(x, y, s, seed) { const r = RS(seed), w = 34 + r() * 10, h = 40 + r() * 12;
  return `<g transform="translate(${r1(x)},${r1(y)}) scale(${s}) rotate(${r1((r() - .5) * 16)})"><ellipse cx="0" cy="2" rx="${w + 4}" ry="7" fill="#000" opacity=".35" filter="url(#blur2)"/><path d="M${-w},0 Q${-w - 6},${-h * .7} ${-8},${-h} L-4,${-h - 10} Q0,${-h - 16} 4,${-h - 10} L8,${-h} Q${w + 6},${-h * .7} ${w},0Z" fill="url(#rcBag)"/>` +
    `<path d="M${-w * .5},${-h * .6} Q${-w * .3},${-h * .85} -2,${-h * .9}" stroke="#8a8e9a" stroke-width="3" fill="none" opacity=".5"/><path d="M-6,${-h - 6} l-10,-10 M6,${-h - 6} l10,-10" stroke="#16171b" stroke-width="5" stroke-linecap="round"/></g>`; }
// a rolled-down shop shutter
function rcShut(x, y, w, h, a = 1) { if (a <= 0) return ''; const hh = h * a; let s = `<rect x="${x}" y="${y}" width="${w}" height="${r1(hh)}" fill="#8e969e"/>`;
  for (let i = 0; i < hh / 9; i++) s += `<path d="M${x},${r1(y + i * 9 + 4)} H${x + w}" stroke="#5e666e" stroke-width="2"/><path d="M${x},${r1(y + i * 9 + 6)} H${x + w}" stroke="#c8ced4" stroke-width="1.4" opacity=".6"/>`;
  return s + `<rect x="${x}" y="${y}" width="${w}" height="${r1(hh)}" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${x}" y="${r1(y + hh - 8)}" width="${w}" height="8" fill="#4a5058"/>`; }
// the person holding a phone in front of the chest
function phoneP(x, y, s, f, i, o = {}) {
  const tgt = [x + f * 26 * s, y - 200 * s + (o.dy || 0) * s];
  const g = hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: o.lookUp ?? -.28, hF: tgt, hB: [tgt[0] - f * 4 * s, tgt[1] + 8 * s] }, gp(i), o.pal || {}));
  return g + rcPhone(HP.hand, s * 1.1, f, o.glow ?? 1);
}
// ---------- a new street for this video ----------
const RCBLK = [[-12, 150, 450, '#b88a6a', 891, 1], [138, 162, 500, '#6a7a8e', 892, 2], [300, 150, 410, '#d4b896', 893, 0], [450, 150, 470, '#7e6a8a', 894, 1], [600, 164, 430, '#8a9a72', 895, 2]];
const RCSHOP = [[-4, 140, 'مخبز', '#8a4a22'], [146, 150, 'هواتف', '#2a4a6a'], [306, 130, 'مجوهرات', '#6a2a4a'], [456, 140, 'أثاث', '#4a5a2a'], [606, 140, 'سيّارات', '#3a3a5a']];
const rcStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: RCBLK, shops: RCSHOP }, o));
// ---------- 0: hook: every phone on the street lights up: +1,000,000 ----------
function sceneHook(t) {
  const stop = WS(0, 6) - .3, ph = ease(ramp(t, stop, stop + .5)), nt = WS(0, 10) - .1, cel = ease(ramp(t, WS(0, 11) + .25, WS(0, 11) + .7));
  const L = [];
  // you, in front: walk in, stop, look at the phone
  { const x0 = 382, y = 1094, s = 1, T = Math.min(t, stop), x = x0 + 40 * T, wk = t < stop;
    if (wk) L.push([y, hero(x, y, Object.assign({ s, face: 1, shade: 1, walk: T * 4.2 + .3 }, YOU))]);
    else L.push([y, phoneP(x, y, s, 1, 0, { pal: YOU, glow: .4 + .6 * ease(ramp(t, nt, nt + .3)), lookUp: lerp(-.28, -.1, cel) })]); }
  // people of the city: they walk, stop, take out their phones; then they cheer
  [[48, 1050, 1, 2, .86, .4, 34], [654, 1052, -1, 5, .88, 2.1, 36], [218, 1034, 1, 3, .84, 1.1, 22], [104, 1026, 1, 6, .8, .7, 30]].forEach(([x0, y, f, pi, s, phs, v], j) => {
    const T = Math.min(t, stop + j * .12), x = x0 + f * v * T, wk = t < stop + j * .12;
    if (wk) { L.push([y, hero(x, y, Object.assign({ s, face: f, shade: 1, walk: T * 4.3 + phs }, gp(pi)))]); return; }
    if (cel > 0 && j % 2 === 0) { const hop = Math.abs(Math.sin((t - WS(0, 11)) * 7)) * 10 * cel;
      L.push([y, hero(x, y - hop, Object.assign({ s, face: f, shade: 1, lookUp: .35, hF: [x + f * 34 * s, y - hop - 330 * s], hB: [x - f * 10 * s, y - hop - 330 * s] }, gp(pi))) + rcPhone(HP.hand, s * 1.1, f, .8)]); }
    else L.push([y, phoneP(x, y, s, f, pi, { glow: .3 + .7 * ease(ramp(t, nt + j * .13, nt + j * .13 + .3)) })]);
    const [hx, hy] = HP.head; if (j % 2 === 1) L.push([y + .1, rcBubble(clamp(hx, 160, 560), hy - 64 * s, ease(ramp(t, nt + j * .13, nt + j * .13 + .35)), s * .9)]);
  });
  const Z = 'translate(360,1060) scale(1.2) translate(-360,-1060)';
  let s = `<defs>${RCDEFS()}</defs><g transform="${Z}">` + rcStreet(t, { id: 'h0' }) + `</g><g transform="${Z}">${rcSort(L)}</g>`;
  // the bank card rising above you
  const ca = ease(ramp(t, WS(0, 10) - .2, WS(0, 10) + .3)), cnt = ease(ramp(t, WS(0, 10), WS(0, 11) + .45));
  if (ca > 0) { const y0 = 400 + (1 - ca) * 40;
    s += `<g opacity="${r1(ca)}"><ellipse cx="360" cy="${y0 + 110}" rx="300" ry="160" fill="url(#rcPop)" opacity="${r1(.5 + .3 * cel)}"/><rect x="130" y="${y0}" width="460" height="210" rx="30" fill="#0f1a16" opacity=".93"/><rect x="130" y="${y0}" width="460" height="210" rx="30" fill="none" stroke="#5ad88a" stroke-width="3"/>` +
      `<text x="560" y="${y0 + 52}" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#cfe8da">رصيدُك</text><circle cx="172" cy="${y0 + 42}" r="16" fill="#5ad88a"/><path d="M164,${y0 + 42} l6,6 l10,-12" stroke="#0f1a16" stroke-width="4" fill="none"/>` +
      `<text x="360" y="${y0 + 140}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="72" fill="#f4d27a" style="paint-order:stroke" stroke="#2a1a08" stroke-width="3">${fmtA(1e6 * cnt)} $</text>` +
      `<path d="M190,${y0 + 172} H530" stroke="#5ad88a" stroke-width="2" opacity=".4"/><text x="360" y="${y0 + 196}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#8ac8a0">إيداعٌ جديد</text></g>` + sparkles(360, y0 + 100, 520, 260, 16, t, cel, 861); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: the globe: 8 billion millionaires; the new money vs one year of the world's output ----------
const RCCITY = [[40.7, -74], [34, -118], [19.4, -99], [-23.5, -46.6], [-34.6, -58.4], [4.7, -74], [-12, -77], [51.5, 0], [48.9, 2.3], [52.5, 13.4], [40.4, -3.7], [41.9, 12.5], [55.8, 37.6], [30, 31.2], [6.5, 3.4], [-1.3, 36.8], [-26.2, 28], [9, 38.7], [33.3, 44.4], [24.7, 46.7], [25.2, 55.3], [35.7, 51.4], [41, 29], [28.6, 77.2], [19, 72.8], [23.8, 90.4], [13.7, 100.5], [-6.2, 106.8], [1.3, 103.8], [39.9, 116.4], [31.2, 121.5], [22.3, 114.2], [35.7, 139.7], [37.6, 127], [14.6, 121], [-33.9, 151.2], [-37.8, 145], [43.7, -79.4], [45.5, -73.6], [41.9, -87.6], [29.8, -95.4], [33.6, -7.6], [36.8, 10.2], [15.6, 32.5], [-4.3, 15.3], [12, 8.5], [5.6, -0.2], [-8.8, 13.2], [60.2, 24.9], [59.3, 18.1], [50.4, 30.5], [47.5, 19], [31.5, 74.3], [24.9, 67], [3.1, 101.7], [10.8, 106.7], [-41.3, 174.8], [64.1, -21.9], [-0.2, -78.5], [10.5, -66.9], [18.5, -69.9], [23.1, -82.4]];
function sceneWorld(t) {
  const st = S0(1) - .2, T = t - st, G = glE(t, { d: 10.9, el: .22, lon: 10 + T * 16, clouds: .38, lights: .55, tg: [0, -.05, 0] });
  const dots = ease(ramp(t, WS(1, 0) - .1, WS(1, 2) + .3)), bar = ease(ramp(t, WS(1, 3) - .2, WS(1, 3) + .4)), b2 = ease(ramp(t, WS(1, 9) - .2, WS(1, 9) + .3)), big = ease(ramp(t, WS(1, 6) - .1, WS(1, 6) + .4));
  let ov = '';
  RCCITY.forEach(([la, lo], i) => { const v = G.vis(la, lo), d0 = WS(1, 0) - .1 + (i % 17) * .09, a = clamp((v - .1) / .25) * ease(ramp(t, d0, d0 + .3)); if (a <= 0) return; const [px, py] = G.P(la, lo, 1.01), tw = .75 + .25 * Math.sin(t * 6 + i * 1.7);
    ov += `<circle cx="${r1(px)}" cy="${r1(py)}" r="${r1(16 * tw)}" fill="url(#rcDot)" opacity="${r1(a)}"/><circle cx="${r1(px)}" cy="${r1(py)}" r="3.4" fill="#fffbe8" opacity="${r1(a)}"/>`; });
  // the counter of millionaires
  const n = 8.2e9 * ease(ramp(t, WS(1, 0) - .1, WS(1, 2) + .2));
  ov += `<g opacity="${r1(dots)}">${panel(150, 404, 420, 74)}<text x="360" y="455" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#f4d27a">${fmtA(n)} مليونير</text></g>`;
  // the bars: new money (8,200 trillion) vs world output in one year (~110 trillion)
  if (bar > 0) { const x1 = 640, W = 560, Y1 = 1022, Y2 = 1112, w1 = W * ease(ramp(t, WS(1, 3), WS(1, 5) + .3)), w2 = Math.max(3, W / 74.5) * b2;
    ov += `<g opacity="${r1(bar)}">${panel(40, 962, 640, 280)}` +
      `<text x="${x1}" y="${Y1 - 22}" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">المالُ الجديد: نحوَ ٨٬٢٠٠ تريليون دولار</text>` +
      `<rect x="${r1(x1 - w1)}" y="${Y1}" width="${r1(w1)}" height="34" rx="8" fill="url(#rcGold)"/>` +
      `<g opacity="${r1(b2)}"><text x="${x1}" y="${Y2 - 22}" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#bfe0ff">إنتاجُ العالمِ في سنة: نحوَ ١١٠ تريليونات</text>` +
      `<rect x="${r1(x1 - w2)}" y="${Y2}" width="${r1(w2)}" height="34" rx="2" fill="url(#rcBlue)"/><path d="M${x1 - 18},${Y2 + 17} H${x1 - 70}" stroke="#8ac4ff" stroke-width="3"/><path d="M${x1 - 22},${Y2 + 9} l-8,8 l8,8" stroke="#8ac4ff" stroke-width="3" fill="none"/></g></g>`; }
  if (big > 0) ov += `<g opacity="${r1(big)}" transform="translate(360,${r1(1214 + (1 - big) * 10)})"><text x="0" y="0" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4c76b" style="paint-order:stroke" stroke="#1a1208" stroke-width="6">أكثرُ من ٧٠ ضعفاً</text></g>`;
  F.ov = `<defs>${RCD}</defs>` + ov; return space(t);
}
// ---------- 2: everyone runs to the shops; the shelves empty ----------
function shotRun(t) {
  const T = t - (S0(2) - .2), L = [];
  [[60, 1040, 2, .82, 0], [-80, 1066, 5, .86, 1.1], [170, 1092, 0, .9, 2.3], [300, 1048, 3, .84, .6], [-220, 1084, 6, .88, 1.7], [420, 1024, 4, .78, 2.9], [-360, 1034, 1, .8, .2]].forEach(([x0, y, pi, s, ph], j) => {
    const x = x0 + (128 + j * 6) * T * s / .85;
    L.push([y, hero(x, y, Object.assign({ s, face: 1, shade: 1, walk: T * 6.6 + ph, amp: .85, lean: 9 }, gp(pi), j === 2 ? YOU : {}))]); });
  // a sale sign the crowd runs to
  const sg = `<g transform="translate(620,860)"><rect x="-70" y="-30" width="140" height="56" rx="8" fill="#c8382e"/><rect x="-70" y="-30" width="140" height="56" rx="8" fill="none" stroke="#fff" stroke-width="3"/><text x="0" y="10" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">مفتوح</text></g>`;
  const Z = 'translate(360,1060) scale(1.18) translate(-360,-1060)';
  return `<g transform="${Z}">` + rcStreet(t, { id: 'r2', top: rcSort(L) }) + `</g>`;
}
function shotShelf(t) {
  const t0 = WS(2, 6) - .25, T = t - t0, FL = 944, k = ease(ramp(t, WS(2, 6) - .1, WS(2, 8) + .6));
  let s = `<rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#b8b0a0"/><rect x="-20" y="280" width="760" height="120" fill="#8e877a"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${70 + i * 220}" y="330" width="140" height="16" rx="3" fill="#f2f0e8"/><ellipse cx="${140 + i * 220}" cy="352" rx="90" ry="18" fill="#fff8e0" opacity=".35" filter="url(#blur9)"/>`;
  s += shelfE(k);
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#b4ab98"/>`;
  for (let i = 1; i < 9; i++) { const y = FL + Math.pow(i / 9, 1.7) * (1300 - FL); s += `<path d="M-20,${r1(y)} H740" stroke="#8c8472" stroke-width="${r1(1 + i * .25)}" opacity=".7"/>`; }
  for (let i = -9; i <= 9; i++) s += `<path d="M${360 + i * 46},${FL} L${360 + i * 150},1300" stroke="#8c8472" stroke-width="1.6" opacity=".7"/>`;
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="${FL}" width="760" height="60" fill="url(#aoDn)" opacity=".8"/>`;
  [[110, 1010, 0, 1], [230, 1064, 3, 4], [470, 1004, 5, 2], [640, 1090, 1, 6], [360, 1120, 2, 3]].forEach(([x, y, kd, ci], i) => { const a = ease(ramp(t, WS(2, 7) + i * .25, WS(2, 7) + i * .25 + .3)); if (a > 0) s += `<g opacity="${r1(a)}" transform="rotate(${[-8, 6, 10, -5, 4][i]},${x + 15},${y})">${prod(x, y, kd, ...PCOL[ci])}</g>`; });
  // three shoppers sweep the shelves into baskets and a trolley
  const u = .5 + .5 * Math.sin(T * 6), v = .5 + .5 * Math.sin(T * 5 + 1.3);
  s += hero(560, 1170, Object.assign({ s: .92, face: -1, shade: 1, lookUp: .2, hF: [480, 780 + 90 * u], hB: [520, 1050] }, gp(1))) + basket(530, 1056, 1, 4);
  s += hero(330, 1200, Object.assign({ s: .95, face: 1, shade: 1, lookUp: .35, hF: [410, 640 + 60 * v], hB: [380, 700 + 40 * v] }, gp(4)));
  const bx = 120 + ease(ramp(t, t0, t0 + 1.5)) * 20;
  s += trolley(bx + 110, 1250, .92) + hero(bx, 1240, Object.assign({ s: .97, face: 1, shade: 1, hF: [bx + 200, 1088], hB: [bx + 196, 1092], lean: 5 }, YOU));
  return s;
}
function sceneRush(t) { let s = `<defs>${RCDEFS()}</defs>` + rcSubs(t, [[S0(2) - .2, shotRun], [WS(2, 6) - .25, shotShelf]]); noEarth(); F.ov = ''; return s; }
// ---------- 3: the same goods, more money: the price of bread climbs (inflation) ----------
function sceneBakery(t) {
  const st = S0(3) - .2, T = t - st, CT = 1000, same = ease(ramp(t, WS(3, 1) - .1, WS(3, 3) + .2)) * (1 - ease(ramp(t, WS(3, 6), WS(3, 7)))), mon = ease(ramp(t, WS(3, 6) - .1, WS(3, 10) + .3)), pr = ease(ramp(t, WS(3, 11) - .1, WS(3, 13) + .6)), inf = ease(ramp(t, WS(3, 14) - .1, WS(3, 16) + .3));
  let s = `<defs>${RCDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#rcTile)"/>`;
  for (let r = 0; r < 30; r++) { const yy = 380 + r * 26; if (yy > CT) break; for (let q = 0; q < 13; q++) s += `<rect x="${q * 64 - 30 + (r % 2) * 32}" y="${yy}" width="62" height="24" rx="2" fill="#f4efe2" stroke="#cbbfa8" stroke-width="1.2"/>`; }
  s += `<rect x="-20" y="380" width="760" height="640" fill="#000" filter="url(#grainR)" opacity=".08"/><ellipse cx="260" cy="560" rx="300" ry="200" fill="#fff6dc" opacity=".3" filter="url(#blur16)"/>`;
  // wooden shelves behind the counter with the SAME loaves (they never grow)
  const SH = [[90, 640], [90, 800]];
  SH.forEach(([x, y]) => { s += `<rect x="${x - 20}" y="${y}" width="470" height="16" fill="url(#rcWood)"/><rect x="${x - 20}" y="${y + 16}" width="470" height="12" fill="#000" opacity=".18" filter="url(#blur2)"/>`; for (let i = 0; i < 5; i++) s += loaf(x + 30 + i * 88, y - 4, .95, (i % 2) * 4 - 2); });
  if (same > 0) s += `<g opacity="${r1(same)}"><rect x="56" y="588" width="480" height="244" rx="16" fill="none" stroke="#f4c76b" stroke-width="5" stroke-dasharray="14 8"/>${panel(186, 520, 220, 56)}${RL(296, 560, 'نفسُ البضائع', 1, '#f4c76b', 32)}</g>`;
  // the price board on the right: the price of one loaf climbs
  const steps = [1, 2, 5, 20, 100, 500, 1000], ix = Math.min(steps.length - 1, Math.floor(pr * (steps.length - .01))), price = pr > 0 ? steps[ix] : 1;
  s += `<g transform="translate(570,500)"><path d="M-40,-90 L0,-120 L40,-90" stroke="#5a4a3a" stroke-width="3" fill="none"/><rect x="-96" y="-90" width="192" height="200" rx="10" fill="#1e2a24"/><rect x="-96" y="-90" width="192" height="200" rx="10" fill="none" stroke="#8a6a42" stroke-width="8"/><rect x="-88" y="-82" width="176" height="184" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
    `<text x="0" y="-44" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#f2f0e4">رغيفُ خبز</text>${loaf(0, 6, .8)}` +
    `<text x="0" y="86" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="${price >= 100 ? 44 : 50}" fill="${pr > .2 ? '#ff8a6a' : '#f4f0d8'}">${fmtA(price)} $</text></g>`;
  if (pr > 0) s += `<g opacity="${r1(Math.min(1, pr * 3))}"><path d="M440,${r1(590 - 110 * pr)} V590" stroke="#e8584a" stroke-width="14" stroke-linecap="round"/><path d="M422,${r1(610 - 110 * pr)} L440,${r1(580 - 110 * pr)} L458,${r1(610 - 110 * pr)}" stroke="#ff8a6a" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  // the baker behind the counter
  s += hero(470, 1140, Object.assign({ s: 1.08, face: -1, shade: 1, lookUp: .05 + .1 * pr, hF: [400, 940], hB: [430, 960] }, { top: '#f2f0ea', pants: '#3a3a40', skin: '#b0784e', hair: '#1d1612' }));
  // counter
  s += `<rect x="290" y="${CT}" width="470" height="300" fill="url(#rcWood)"/><rect x="290" y="${CT}" width="470" height="300" fill="#000" filter="url(#gnWood)" opacity=".45"/><path d="M520,${CT + 30} v260" stroke="#4a2e18" stroke-width="3"/>` +
    `<rect x="282" y="${CT - 16}" width="480" height="20" rx="3" fill="url(#rcCnt)"/><rect x="282" y="${CT - 16}" width="480" height="5" fill="#fff" opacity=".35"/><rect x="290" y="${CT + 4}" width="470" height="20" fill="#000" opacity=".25" filter="url(#blur2)"/>` + loaf(400, CT - 20, .9) + loaf(640, CT - 20, .9, 3);
  // customers queueing with growing bundles of notes
  const nb = 2 + Math.round(14 * mon);
  [[210, 1250, 0, 1.08], [90, 1218, 3, 1.0]].forEach(([x, y, pi, sc], j) => { const g = hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, lookUp: .1, hF: [x + 66 * sc, y - 200 * sc], hB: [x + 50 * sc, y - 192 * sc] }, gp(pi), j === 0 ? YOU : {}));
    const [hx, hy] = HP.hand; s += g + bundle(hx + 10, hy - 8, 66 * sc, nb + j * 2, '#7aa878'); });
  // the panel: goods stay the same, money grows
  if (mon > 0) { const gw = 150, mw = 150 + 380 * mon;
    s += `<g opacity="${r1(Math.min(1, mon * 2))}">${panel(30, 404, 380, 130)}${RL(360, 456, 'السِّلَع', 1, '#fff', 26)}<rect x="60" y="440" width="${gw * .8}" height="20" rx="5" fill="#c8843a"/>${RL(360, 508, 'المال', 1, '#7af0a8', 26)}<rect x="60" y="492" width="${r1(Math.min(250, mw * .48))}" height="20" rx="5" fill="#5ad88a"/></g>`; }
  if (inf > 0) s += `<g opacity="${r1(inf)}">${panel(360, 1150, 300, 76)}${RL(510, 1202, 'أسعارٌ أعلى', 1, '#ff9a7a', 36)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: many stop working: shutters down, rubbish piles up, a truck stands still; who bakes, drives, cleans, heals? ----------
function sceneNoWork(t) {
  const st = S0(4) - .2, T = t - st, sh = ease(ramp(t, st + .2, WS(4, 3) + .2)), bags = ramp(t, st, WS(4, 12));
  const PV = 1000;
  // shutters over the shop windows (shop row is at PV-98..PV)
  let fg = RCSHOP.map(([sx, sw], i) => rcShut(sx + 6, PV - 82, sw - 12, 80, clamp(sh * 1.3 - i * .08))).join('');
  // rubbish bags along the kerb, more and more
  const BG = [[40, 1100], [92, 1106], [66, 1090], [300, 1104], [338, 1096], [520, 1106], [560, 1094], [118, 1080], [590, 1108], [360, 1086], [20, 1080], [548, 1080]];
  BG.forEach(([x, y], i) => { const a = clamp(bags * BG.length - i); if (a > 0) fg += `<g opacity="${r1(a)}">${rbag(x, y, .74, 300 + i)}</g>`; });
  // two people stand idle on the pavement
  fg += phoneP(490, 1060, .74, 1, 2, { glow: .6 }) + hero(552, 1066, Object.assign({ s: .76, face: -1, shade: 1, lookUp: .02, aF: [.35, -.9], aB: [-.3, -1.0] }, gp(5)));
  // the delivery truck parked at the kerb, nobody in it
  const top = boxTruck(470, 1196, .72, 1);
  let s = `<defs>${RCDEFS()}</defs>` + rcStreet(t, { id: 'n4', N: .18, fg, top });
  // four questions in round insets: baker, driver, cleaner, doctor
  const IN = [[140, 516, 5, 'مَن يخبز؟', 'b'], [380, 516, 7, 'مَن يقود؟', 'd'], [140, 800, 9, 'مَن ينظّف؟', 'c'], [380, 800, 11, 'مَن يعالج؟', 'm']];
  IN.forEach(([x, y, w, tx, id]) => { const a = ease(ramp(t, WS(4, w) - .15, WS(4, w) + .3)); if (a <= 0) return; let inner = '';
    if (id === 'b') inner = `<rect x="-100" y="20" width="200" height="90" fill="#6a4a2a"/><path d="M-60,20 Q0,-60 60,20Z" fill="#3a2418"/><path d="M-40,20 Q0,-30 40,20Z" fill="#111" opacity=".85"/>` + loaf(-30, 52, .7) + loaf(34, 56, .7, 4);
    if (id === 'd') inner = `<rect x="-100" y="40" width="200" height="60" fill="#4a4c52"/>` + `<g transform="translate(6,60) scale(.42)">${boxTruck(0, 0, 1, 1)}</g>`;
    if (id === 'c') inner = `<rect x="-100" y="40" width="200" height="60" fill="#8a8478"/>` + rbag(-40, 70, .8, 7) + rbag(10, 74, .7, 8) + rbag(48, 66, .6, 9) + `<path d="M60,-40 L30,60" stroke="#8a5a2a" stroke-width="6"/><path d="M14,58 L46,66 L40,80 L8,72Z" fill="#c8a040"/>`;
    if (id === 'm') inner = `<rect x="-100" y="-100" width="200" height="200" fill="#e8f0ee"/><rect x="-100" y="40" width="200" height="60" fill="#c8d8d4"/><rect x="-70" y="20" width="140" height="22" rx="6" fill="#f8faf8" stroke="#9ab0aa" stroke-width="3"/><path d="M-70,42 V80 M70,42 V80" stroke="#7a8a86" stroke-width="5"/><rect x="-62" y="6" width="40" height="18" rx="8" fill="#fff" stroke="#9ab0aa" stroke-width="2"/><rect x="-16" y="-70" width="32" height="70" rx="5" fill="#2a9a8a"/><rect x="-35" y="-51" width="70" height="32" rx="5" fill="#2a9a8a"/>`;
    s += rcInset(x, y, inner, a, 90, id) + RL(x, y + 128, tx, r1(a), '#fff', 28) + rcQ(x + 72, y - 62, a, .9); });
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: Germany, about 1923: a barrow of banknotes for bread (sepia) ----------
function barrow(x, y, s, f, fill, t, rollD) {
  const r = RS(91); let notes = ''; for (let i = 0; i < Math.round(fill); i++) { const c = i % 4, row = Math.floor(i / 4); notes += bundle(-74 + c * 40 + (row % 2) * 12 + (r() - .5) * 6, -64 - row * 13, 48, 3, ['#b8a878', '#9ab08a', '#c8b48a'][i % 3]); }
  const a = rollD / 22;
  return `<g transform="translate(${r1(x)},${r1(y)}) scale(${f * s},${s})"><ellipse cx="0" cy="2" rx="110" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/>` +
    `<path d="M-60,-30 L-150,-60" stroke="#5a3a1e" stroke-width="7" stroke-linecap="round"/><path d="M-60,-30 L-40,-2 M40,-30 L30,-2" stroke="#3a3a3a" stroke-width="6"/>` + notes +
    `<path d="M-100,-70 L100,-70 L80,-28 L-80,-28Z" fill="#6a6a64"/><path d="M-100,-70 L100,-70 L96,-62 L-96,-62Z" fill="#9a9a90"/><path d="M-80,-28 L80,-28" stroke="#3a3a36" stroke-width="3"/>` +
    `<g transform="translate(98,-24) rotate(${r1(a * 57.3)})"><circle r="24" fill="#2a2a28"/><circle r="17" fill="#6a5a46"/>` + [0, 1, 2, 3, 4, 5].map(k => `<path d="M0,0 L${r1(17 * Math.cos(k * 1.047))},${r1(17 * Math.sin(k * 1.047))}" stroke="#3a2e22" stroke-width="3"/>`).join('') + `<circle r="4" fill="#2a2a28"/></g></g>`;
}
function sceneGermany(t) {
  const st = S0(5) - .2, T = t - st, yr = ease(ramp(t, WS(5, 6) - .2, WS(5, 6) + .3)), p0 = ease(ramp(t, WS(5, 11) - .2, WS(5, 12) + .2)), p1 = ease(ramp(t, WS(5, 14) - .1, WS(5, 16) + .3));
  const walkEnd = WS(5, 14) + .3, Tw = Math.min(t, walkEnd) - st, wk = t < walkEnd, x = 40 + 34 * Tw;
  let g = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#rcSky2)"/>` + cumulus(200 + T * 3, 470, 230, 41, { a: .5 });
  // stone facade of an old house with tall windows
  g += `<rect x="-20" y="380" width="760" height="680" fill="#b8a688"/><rect x="-20" y="380" width="760" height="680" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="-20" y="380" width="760" height="680" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  for (let r = 0; r < 16; r++) g += `<path d="M-20,${400 + r * 40} H740" stroke="#8a7a62" stroke-width="1.4" opacity=".35"/>`;
  [[60, 440], [250, 440], [470, 440], [640, 440]].forEach(([wx, wy]) => { g += `<rect x="${wx - 8}" y="${wy - 14}" width="96" height="16" fill="#9a8a6e"/><rect x="${wx}" y="${wy}" width="80" height="150" fill="#3a4250"/><path d="M${wx + 40},${wy} V${wy + 150} M${wx},${wy + 56} H${wx + 80}" stroke="#d8d0c0" stroke-width="5"/><rect x="${wx - 6}" y="${wy + 150}" width="92" height="10" fill="#9a8a6e"/>`; });
  // the bakery front: a sign, a big window with loaves, a door
  g += `<rect x="150" y="680" width="560" height="320" fill="#4a3426"/><rect x="150" y="680" width="560" height="56" fill="#2a1e16"/><text x="430" y="720" text-anchor="middle" direction="rtl" font-family="Amiri" font-weight="700" font-size="40" fill="#e8d4a0">مخبز</text>` +
    `<rect x="176" y="756" width="330" height="200" fill="#6a7480"/><rect x="176" y="756" width="330" height="200" fill="#fff4d0" opacity=".25"/><rect x="186" y="880" width="310" height="10" fill="#5a3e28"/>` + [0, 1, 2, 3].map(i => loaf(222 + i * 78, 874, .8, (i % 2) * 4)).join('') + [0, 1, 2].map(i => loaf(250 + i * 90, 940, .75)).join('') + `<path d="M176,756 L300,956" stroke="#fff" stroke-width="18" opacity=".08"/>` +
    `<rect x="530" y="756" width="150" height="244" fill="#2e2218"/><rect x="544" y="772" width="122" height="110" fill="#5a6470"/><circle cx="650" cy="900" r="6" fill="#c8a860"/>`;
  // the price card in the window
  if (p0 > 0) g += `<g opacity="${r1(p0)}"><rect x="186" y="770" width="306" height="96" rx="6" fill="#f2ead6"/><text x="476" y="806" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="23" fill="#3a2a1a">أواخرَ ١٩٢٢: ١٦٠ مارك</text>` +
    `<text x="476" y="850" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${r1(23 + 2 * p1)}" fill="${p1 > .3 ? '#a8281e' : '#3a2a1a'}" opacity="${r1(.25 + .75 * p1)}">أواخرَ ١٩٢٣: ٢٠٠ مليار مارك</text></g>`;
  // cobbled pavement and street
  g += `<rect x="-20" y="1000" width="760" height="300" fill="#8a7e6a"/>` + Array.from({ length: 7 }, (_, r) => Array.from({ length: 16 }, (_, q) => `<ellipse cx="${q * 50 - 10 + (r % 2) * 25}" cy="${1014 + r * 34}" rx="22" ry="12" fill="#9a8e78" stroke="#6a604e" stroke-width="2"/>`).join('')).join('') + `<rect x="-20" y="1000" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1000" width="760" height="30" fill="url(#aoDn)" opacity=".6"/>`;
  // a woman waits at the door with a basket full of notes
  g += p39(610, 1088, .9, -1, 4, t, { hat: 'lady', skirt: '#5a3a4a', hatC: '#4a2a2a', h: { hF: [570, 958], hB: [580, 962], lookUp: .05 } });
  g += `<g transform="translate(566,968)"><path d="M-30,-10 h60 l-6,34 h-48Z" fill="#8a6a3a"/>${bundle(-12, -16, 30, 3, '#c8b48a')}${bundle(12, -20, 30, 4, '#9ab08a')}<path d="M-26,-10 Q0,-48 26,-10" stroke="#6a4a22" stroke-width="4" fill="none"/></g>`;
  // the man pushes the barrow of money to the bakery
  const bw = barrow(x + 194, 1176, .95, 1, 22, t, 34 * Tw * 1.4);
  const man = p39(x, 1170, .95, 1, 1, t, { hat: 'fed', walk: wk ? Tw * 4 : null, h: { hF: [x + 48, 1112], hB: [x + 40, 1116], lean: 6 } });
  g += man + bw;
  let s = `<defs>${RCDEFS()}${DEFN()}</defs><g filter="url(#rcSepF)">${g}</g><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/><radialGradient id="rcVig" cx=".5" cy=".55" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a1008" stop-opacity=".6"/></radialGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#rcVig)"/>`;
  if (yr > 0) s += `<g opacity="${r1(yr)}">${panel(470, 400, 220, 70)}${RL(580, 446, 'ألمانيا ١٩٢٣', 1, '#f4c76b', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6a: the globe turns to Zimbabwe ----------
function sceneZimGlobe(t) {
  const st = S0(6) - .2, T = t - st, G = glE(t, { d: lerp(10.4, 8.2, ease(clamp(T / 1.6))), el: -.25, lon: lerp(-20, 30, ease(clamp(T / 1.4))), clouds: .35, lights: .3, tg: [0, -.1, 0] });
  const a = ease(ramp(t, st + .4, st + .8)); let ov = '';
  if (a > 0 && G.vis(-19, 30) > .2) { const [px, py] = G.P(-19, 30, 1.01); ov += `<circle cx="${r1(px)}" cy="${r1(py)}" r="22" fill="url(#rcDot)" opacity="${r1(a)}"/><circle cx="${r1(px)}" cy="${r1(py)}" r="5" fill="#fff" opacity="${r1(a)}"/><path d="M${r1(px)},${r1(py - 10)} V${r1(py - 70)}" stroke="#f4c76b" stroke-width="3" opacity="${r1(a)}"/>` + lbl(px, py - 84, 'زيمبابوي', r1(a), '#fff', 36); }
  F.ov = `<defs>${RCD}</defs>` + ov; return space(t);
}
// ---------- 6b: prices double every day; the 100-trillion-dollar note ----------
function sceneZim(t) {
  const st = WS(6, 3) - .3, T = t - st, ch = ease(ramp(t, st, st + .4)), nt = ease(ramp(t, WS(6, 8) - .2, WS(6, 9) + .3)), zz = ease(ramp(t, WS(6, 11) - .2, WS(6, 12) + .3));
  let s = `<defs>${RCDEFS()}</defs>` + studio('stZ', '#2a3a4e', '#080c16', 12);
  // the chart: 7 days, the price doubles each day
  const X0 = 110, Y0 = 1080, BW = 64, sc = 7, up = 1 - nt * .25;
  let c = `<path d="M${X0 - 20},${Y0} H${X0 + 7 * 76 + 10} M${X0 - 20},${Y0} V${Y0 - 620}" stroke="#8a96aa" stroke-width="3"/>`;
  for (let d = 0; d < 7; d++) { const a = ease(ramp(t, st + .25 + d * .3, st + .5 + d * .3)); if (a <= 0) continue; const h = Math.pow(2, d) * sc * a, x = X0 + d * 76;
    c += `<rect x="${x}" y="${r1(Y0 - h)}" width="${BW}" height="${r1(h)}" rx="4" fill="url(#rcRed)"/><rect x="${x}" y="${r1(Y0 - h)}" width="${BW * .3}" height="${r1(h)}" fill="#fff" opacity=".15"/>` +
      `<text x="${x + BW / 2}" y="${Y0 + 34}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#cfd8e4">${AR(d + 1)}</text>` + (d > 0 ? `<text x="${x + BW / 2}" y="${r1(Y0 - h - 14)}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#ffb09a" opacity="${r1(a)}" style="paint-order:stroke" stroke="#000" stroke-width="4">×٢</text>` : ''); }
  c += RL(X0 + 3 * 76 + 30, Y0 + 76, 'الأيّام', 1, '#cfd8e4', 26) + RL(360, 470, 'الأسعارُ تتضاعفُ كلَّ يومٍ تقريباً', 1, '#fff', 34) + RL(360, 516, 'ذروةُ التضخّم: نوفمبر ٢٠٠٨', 1, '#9aa8bc', 26);
  s += `<g opacity="${r1(ch * (1 - nt))}">${c}</g>`;
  // the 100 trillion dollar note slides in
  if (nt > 0) { const x = lerp(1000, 360, nt), y = 760;
    s += `<g opacity="${r1(nt)}"><ellipse cx="${r1(x)}" cy="${y}" rx="380" ry="170" fill="url(#rcPop)" opacity="${r1(.35 + .25 * zz)}"/>` +
      bnote(x, y, 620, '#8ab0a0', '', -4, { extra: `<text x="-112" y="-22" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#1e3a30">١٠٠ تريليون</text><text x="-112" y="34" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#1e3a30">دولار</text><text x="-112" y="104" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="${r1(26 + 8 * zz)}" fill="#7a1e14" opacity="${r1(.4 + .6 * zz)}">١٠٠٬٠٠٠٬٠٠٠٬٠٠٠٬٠٠٠</text>` }) +
      sparkles(x, y, 620, 300, 12, t, zz, 871) + `</g>` + `<g opacity="${r1(zz)}">${RL(360, 1010, 'ورقةٌ صدرَت عام ٢٠٠٩', 1, '#cfd8e4', 30)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: the twist: paper money blows away; real wealth is food, homes and work ----------
function sceneTwist(t) {
  const st = S0(7) - .2, T = t - st, bl = ease(ramp(t, WS(7, 6) - .2, WS(7, 9))), L = [];
  // people look at their notes; the wind takes them
  [[140, 1056, 1, 0, .9], [215, 1092, 1, 3, .92], [430, 1090, -1, 2, .94], [560, 1058, -1, 5, .88]].forEach(([x, y, f, pi, s], j) => {
    const lk = bl > .3 ? .35 : .05, hold = bl < .5 ? { hF: [x + f * 42 * s, y - 196 * s], hB: [x + f * 30 * s, y - 190 * s] } : { aF: [.5 + .2 * Math.sin(t * 3 + j), .9], aB: [-.2, .3] };
    L.push([y, hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: lk }, gp(pi), j === 2 ? YOU : {}, hold)) + (bl < .5 ? bundle(HP.hand[0] + f * 8, HP.hand[1] - 6, 46 * s, Math.round(6 * (1 - bl * 2)) + 1, '#7aa878') : '')]); });
  // flying notes
  let fly = ''; const r = RS(611);
  for (let i = 0; i < 46; i++) { const d0 = r() * .9, ph = clamp((bl - d0 * .4) * 1.6), x0 = 100 + r() * 560, y0 = 840 + r() * 240; if (ph <= 0) continue;
    const x = x0 + ph * (500 + r() * 400) + Math.sin(t * 3 + i) * 20, y = y0 - ph * (500 + r() * 300) + Math.sin(t * 4 + i * 2) * 18; if (x > 800 || y < 330) continue;
    fly += bnote(x, y, 54 + r() * 20, ['#7aa878', '#8ab0a0', '#a8b47a'][i % 3], '', (t * 140 + i * 37) % 360, { sk: r1(.9 * (1 - ph * .4)) }); }
  const Z = 'translate(360,1060) scale(1.25) translate(-360,-1060)';
  let s = `<defs>${RCDEFS()}</defs><g transform="${Z}">` + rcStreet(t, { id: 't7', top: rcSort(L) + fly }) + `</g>`;
  // three insets: food, homes, work
  const IN = [[590, 528, 10, 'طعام', 'f'], [360, 528, 11, 'بيوت', 'h'], [130, 528, 12, 'عمل', 'w']];
  IN.forEach(([x, y, w, tx, id]) => { const a = ease(ramp(t, WS(7, w) - .2, WS(7, w) + .3)); if (a <= 0) return; let inner = '';
    if (id === 'f') { inner = `<rect x="-100" y="-100" width="200" height="200" fill="url(#rcSky2)"/><rect x="-100" y="10" width="200" height="90" fill="#c89a3a"/>`; for (let i = 0; i < 26; i++) { const sx = -96 + i * 7.6, sy = 20 + (i % 3) * 8; inner += `<path d="M${r1(sx)},100 L${r1(sx + 2)},${sy}" stroke="#a87a2a" stroke-width="2"/><ellipse cx="${r1(sx + 2)}" cy="${sy - 6}" rx="3" ry="9" fill="url(#rcWheat)"/>`; } inner += loaf(0, 66, 1.1); }
    if (id === 'h') inner = `<rect x="-100" y="-100" width="200" height="200" fill="url(#rcSky2)"/><rect x="-100" y="60" width="200" height="40" fill="#6a9a4a"/><rect x="-56" y="-10" width="112" height="76" fill="#d8b896"/><path d="M-70,-6 L0,-60 L70,-6Z" fill="#a84a32"/><rect x="-12" y="22" width="24" height="44" fill="#5a3a22"/><rect x="-44" y="8" width="22" height="20" fill="#8ac4e8"/><rect x="22" y="8" width="22" height="20" fill="#8ac4e8"/>`;
    if (id === 'w') inner = `<rect x="-100" y="-100" width="200" height="200" fill="#3a5a7a"/><rect x="-100" y="70" width="200" height="30" fill="#a89478"/>` + `<g transform="translate(-10,90) scale(.5)">${hero(0, 0, Object.assign({ s: 1, face: 1, shade: 1, hF: [70, -190], hB: [60, -184] }, { top: '#e8a030', pants: '#3a4a6a', skin: '#a8744c', hair: '#1d1612' }))}${brickStack(40, -150, 8)}</g><path d="M-38,-30 Q-38,-56 -14,-56 Q10,-56 10,-32Z" fill="#f4d040" transform="translate(4,8) scale(.9)"/>`;
    s += rcInset(x, y, inner, a, 95, 't' + id) + RL(x, y + 138, tx, r1(a), '#f4c76b', 36); });
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 40 + (t - S0(8)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 7) - .3, WS(8, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWorld }, { s: S0(2) - .2, f: sceneRush }, { s: S0(3) - .2, f: sceneBakery }, { s: S0(4) - .2, f: sceneNoWork },
  { s: S0(5) - .2, f: sceneGermany }, { s: S0(6) - .2, f: sceneZimGlobe }, { s: WS(6, 3) - .3, f: sceneZim }, { s: S0(7) - .2, f: sceneTwist }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneZim, sceneNoWork, sceneTwist]);
const XF = .5;
const TLI = [['الشراء', S0(2)], ['الأسعار', S0(3)], ['العمل', S0(4)], ['ألمانيا ١٩٢٣', S0(5)], ['زيمبابوي ٢٠٠٨', S0(6)]];
const LIST_ON = new Set([sceneNoWork]);
const CHIPS = [
  ['c0', 'مليونُ دولار لكلِّ إنسان', 360, 330, 'red big', WS(0, 10), S0(1) - .3],
  ['c1', '٨ ملياراتِ مليونير', 360, 330, 'big', WS(1, 0), S0(2) - .3],
  ['c2', 'الرفوفُ تفرغ', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'التضخُّم', 360, 330, 'red big', WS(3, 16) - .1, S0(4) - .3],
  ['c4', 'مَن سيعمل؟', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c6', '١٠٠ تريليون دولار', 360, 330, 'big', WS(6, 10), S0(7) - .3],
  ['c7', 'الثروةُ هي ما ننتجُه', 360, 330, 'big', WS(7, 9), S0(8) - .3],
  ['c8', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">لو صارَ الجميعُ أغنياء</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
