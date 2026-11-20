// pt_a.js (#64): what if a time portal were built? Shared pieces (a new street, the portal, a space station, the wormhole) + scenes 0-4
const PTDEF = `<radialGradient id="ptGlow"><stop offset="0" stop-color="#e8f6ff" stop-opacity=".95"/><stop offset=".35" stop-color="#7ac8ff" stop-opacity=".5"/><stop offset="1" stop-color="#3a6aff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="ptGold"><stop offset="0" stop-color="#fff2c0" stop-opacity=".95"/><stop offset=".35" stop-color="#f4c76b" stop-opacity=".45"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="ptPur"><stop offset="0" stop-color="#f0d8ff" stop-opacity=".95"/><stop offset=".4" stop-color="#b06aff" stop-opacity=".5"/><stop offset="1" stop-color="#6a2ad8" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="steelR" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2e6ec"/><stop offset=".45" stop-color="#8a929c"/><stop offset="1" stop-color="#3a4048"/></linearGradient>` +
  `<linearGradient id="desertS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6ab0"/><stop offset=".55" stop-color="#f0a868"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient>` +
  `<linearGradient id="jungS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ac0c8"/><stop offset="1" stop-color="#d8e4d0"/></linearGradient>` +
  `<linearGradient id="sauG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8a6a"/><stop offset="1" stop-color="#3e4a36"/></linearGradient>` +
  `<filter id="ptRim" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".02 .05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter>`;
const PTL = (x, y, tx, a, col = '#fff', fs = 24) => lbl(x, y, tx, a, col, fs);

// ---------- the #64 street: other buildings, a watch shop and a toy shop ----------
const SHOPP = [[-4, 150, 'ساعات', '#2a4a7a'], [158, 130, 'صيدليّة', '#2a8a6a'], [300, 146, 'مطعم', '#a8402a'], [458, 128, 'ألعاب', '#c8902a'], [598, 140, 'هدايا', '#7a3a6a']];
function shopRowP(PV) { const keep = SHOPB.slice(); SHOPB.splice(0, SHOPB.length, ...SHOPP); const r = shopRowB(PV); SHOPB.splice(0, SHOPB.length, ...keep); return r; }
function streetP(t, o = {}) {
  const N = o.N || 0, id = o.id || 'p';
  const sky = [mix('#3a6aae', '#060c24', N), mix('#e0a87a', '#16224a', N), mix('#f6d8a8', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(18); for (let i = 0; i < 80; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 600).toFixed(1)}" r="${(.6 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r())).toFixed(2)}"/>`; }
  s += sun3(140, 640, .8 * (1 - N)) + cumulus(220 + t * 1.5, 470, 240, 81, { a: .7 * (1 - N) }) + cumulus(600 + t, 540, 180, 83, { a: .6 * (1 - N) });
  let g = farCity(91, 905, mix(sky[2], '#5a5a78', .45)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-12, 150, 420, '#9a7a62', 941, 1], [138, 168, 340, '#d8cab0', 942, 0], [306, 140, 500, '#6a7a8e', 943, 2], [446, 150, 380, '#c89a6a', 944, 0], [596, 160, 440, '#8a6a7a', 945, 1]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowP(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c2b6a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a09480" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 46 + 8},${PV} L${q * 46},${KB}" stroke="#a09480" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a50"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 80}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  [[90, 290, 27], [640, 280, 29]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[200, 0], [520, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX ?? 560, 1170, .95, '#3a5a3a', -1, 0);
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}
// ---------- the portal: a ring of light; inner = a scene (drawn in 720x1280 space) seen through it; k = how open (0..1) ----------
function portal(cx, cy, rx, ry, t, k, inner = '', o = {}) {
  if (k <= 0) return ''; const id = o.id || 'pt', RX = rx * k, RY = ry * (.15 + .85 * k), col = o.gold ? 'ptGold' : 'ptGlow';
  let s = scr(`<ellipse cx="${cx}" cy="${cy}" rx="${(RX * 2.1).toFixed(1)}" ry="${(RY * 1.5).toFixed(1)}" fill="url(#${col})" opacity="${(.7 * k).toFixed(2)}"/>`);
  s += `<defs><clipPath id="${id}C"><ellipse cx="${cx}" cy="${cy}" rx="${RX.toFixed(1)}" ry="${RY.toFixed(1)}"/></clipPath></defs>`;
  s += `<g clip-path="url(#${id}C)"><rect x="${cx - RX}" y="${cy - RY}" width="${2 * RX}" height="${2 * RY}" fill="#0a1a3a"/>` +
    (inner ? `<g transform="translate(${cx},${cy}) scale(${(RX / 300).toFixed(4)},${(RY / 520).toFixed(4)}) translate(-360,-700)" opacity="${clamp(k * 1.4 - .3).toFixed(2)}">${inner}</g>` : '');
  // the swirl over the view
  let sw = ''; for (let i = 0; i < 7; i++) { const a0 = t * 1.6 + i * .9; let d = ''; for (let j = 0; j <= 24; j++) { const u = j / 24, a = a0 + u * 3.4, r = 1 - u * .92; d += (j ? ' L' : 'M') + (cx + Math.cos(a) * RX * r).toFixed(1) + ',' + (cy + Math.sin(a) * RY * r).toFixed(1); }
    sw += `<path d="${d}" stroke="${o.gold ? '#ffe4a0' : '#bfe6ff'}" stroke-width="${(3 + 4 * (i % 3)).toFixed(0)}" fill="none" opacity="${(.12 + .06 * (i % 2)).toFixed(2)}" stroke-linecap="round"/>`; }
  s += `<g filter="url(#blur2)">${sw}</g><ellipse cx="${cx}" cy="${cy}" rx="${RX}" ry="${RY}" fill="url(#${col})" opacity="${(.35 * (1 - (o.clear || 0))).toFixed(2)}"/></g>`;
  // the burning rim: several wobbly rings
  let rim = ''; for (let i = 0; i < 4; i++) rim += `<ellipse cx="${cx}" cy="${cy}" rx="${(RX * (1 + .02 * i)).toFixed(1)}" ry="${(RY * (1 + .015 * i)).toFixed(1)}" fill="none" stroke="${['#ffffff', '#bfe6ff', '#7ac8ff', '#3a8aff'][i]}" stroke-width="${[4, 9, 16, 26][i]}" opacity="${[.95, .6, .35, .2][i] * k}" stroke-dasharray="${i ? `${60 + 30 * i} ${10 + 6 * i}` : 'none'}" stroke-dashoffset="${(t * 90 * (i % 2 ? 1 : -1)).toFixed(0)}"/>`;
  if (o.gold) rim = rim.replace(/#bfe6ff/g, '#ffe8a8').replace(/#7ac8ff/g, '#f4c76b').replace(/#3a8aff/g, '#e08a2a');
  s += scr(`<g filter="url(#ptRim)">${rim}</g>`);
  // sparks
  const r = RS(o.seed || 3); for (let i = 0; i < 18; i++) { const a = r() * 6.283, ph = pmod(t * (.6 + r() * .6) + r(), 1), d = 1 + ph * .35, x = cx + Math.cos(a) * RX * d, y = cy + Math.sin(a) * RY * d;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.6 * (1 - ph) + .6).toFixed(1)}" fill="${o.gold ? '#fff0c0' : '#e8f6ff'}" opacity="${((1 - ph) * k).toFixed(2)}"/>`; }
  return s;
}
// the view of Giza while the Great Pyramid is being built (drawn in 720x1280 space)
function gizaView(t) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#desertS)"/><circle cx="520" cy="760" r="140" fill="url(#ptGold)" opacity=".8"/><circle cx="520" cy="760" r="34" fill="#fff6dc"/>`;
  s += `<path d="M-20,860 Q200,830 400,850 T740,840 L740,1320 L-20,1320Z" fill="#d8a868"/><rect x="-20" y="850" width="760" height="470" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  s += pyramid(150, 870, 260, '#d0b07a') + pyramid(640, 868, 180, '#c8a46e');
  // the unfinished pyramid with a ramp and workers
  const bw = 440, top = 590, base = 900, cut = 150;
  s += `<path d="M${360 - bw / 2},${base} L${360 - cut / 2},${top} L${360 + cut / 2},${top} L${360 + bw / 2},${base}Z" fill="#e4c890"/><path d="M360,${top} L${360 + cut / 2},${top} L${360 + bw / 2},${base} L380,${base}Z" fill="#8a6a40" opacity=".35"/>`;
  for (let i = 1; i < 12; i++) { const y = top + (base - top) * i / 12, hw = cut / 2 + (bw - cut) / 2 * i / 12; s += `<path d="M${(360 - hw).toFixed(1)},${y.toFixed(1)} H${(360 + hw).toFixed(1)}" stroke="#a88a58" stroke-width="1.4" opacity=".6"/>`; }
  s += `<path d="M40,${base} L${360 - cut / 2 + 6},${top + 10} L${360 - cut / 2 + 40},${top + 18} L120,${base}Z" fill="#c8a066"/><path d="M40,${base} L${360 - cut / 2 + 6},${top + 10}" stroke="#a07a44" stroke-width="3"/>`;
  for (let i = 0; i < 9; i++) { const u = pmod(i / 9 + t * .02, 1), x = lerp(70, 360 - cut / 2 + 20, u), y = lerp(base - 6, top + 16, u);
    s += `<rect x="${(x - 9).toFixed(1)}" y="${(y - 12).toFixed(1)}" width="18" height="12" fill="#d8bc84" stroke="#8a6a3a" stroke-width="1"/>` + [-16, -24, -32].map(dx => `<path d="M${(x + dx).toFixed(1)},${(y + 2).toFixed(1)} l2,-12" stroke="#3a2414" stroke-width="3"/><circle cx="${(x + dx + 2).toFixed(1)}" cy="${(y - 13).toFixed(1)}" r="2.6" fill="#3a2414"/>`).join(''); }
  return s + `<rect x="-20" y="780" width="760" height="120" fill="#ffd8a0" opacity=".18" filter="url(#blur9)"/>`;
}
// a sauropod (side view, facing right); (x, y) = ground under the body, s = scale
function sauropod(x, y, s, t, a = 1, col = 'url(#sauG)') {
  const nk = Math.sin(t * .8) * 4;
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><ellipse cx="0" cy="4" rx="150" ry="12" fill="#000" opacity=".25" filter="url(#blur5)"/>` +
    `<path d="M-60,-40 L-56,0 L-38,0 L-34,-40Z M50,-40 L52,0 L70,0 L70,-40Z" fill="#3a4632"/>` +
    `<path d="M-200,-120 Q-140,-130 -90,-150 Q0,-200 80,-150 Q120,-180 150,-260 Q170,${-330 + nk} 205,${-336 + nk} Q232,${-338 + nk} 236,${-326 + nk} Q228,${-318 + nk} 206,${-318 + nk} Q186,-300 176,-250 Q160,-170 120,-110 Q90,-70 40,-60 Q-40,-50 -90,-70 Q-150,-90 -260,-96 Q-230,-110 -200,-120Z" fill="${col}"/>` +
    `<path d="M-40,-40 L-36,0 L-18,0 L-14,-44Z M80,-50 L84,0 L102,0 L100,-56Z" fill="#4a5640"/><path d="M-90,-150 Q0,-196 80,-150" stroke="#a8b48e" stroke-width="5" fill="none" opacity=".4"/><circle cx="222" cy="${-330 + nk}" r="2.4" fill="#141810"/></g>`;
}
function jungleView(t) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#jungS)"/>`;
  s += mountainsR(860, 120, 91, { snowAt: 0, rock: '#6a7a6a' }) + `<rect x="-20" y="840" width="760" height="40" fill="#e8f0e8" opacity=".5" filter="url(#blur9)"/>`;
  s += forestR(880, 30, 70, 130, 93, '#4a6a4a') + `<rect x="-20" y="880" width="760" height="440" fill="#5a7a3a"/>`;
  s += sauropod(120, 930, .9, t, .5, '#6a7a6a') + sauropod(380, 1010, 1.7, t + 2, .85);
  s += `<rect x="-20" y="780" width="760" height="200" fill="#e0ece0" opacity=".25" filter="url(#blur16)"/>`;
  for (let i = 0; i < 9; i++) { const x = i * 90 - 20, h = 140 + (i % 3) * 40; s += `<path d="M${x},1300 Q${x - 30},${1300 - h * .6} ${x - 60},${1300 - h} M${x},1300 Q${x + 30},${1300 - h * .7} ${x + 70},${1300 - h * .9} M${x},1300 Q${x},${1300 - h} ${x + 10},${1300 - h * 1.1}" stroke="#2e4a22" stroke-width="16" fill="none" stroke-linecap="round"/>`; }
  return s;
}

// ---------- 0: hook. An evening street; a portal of light opens on the pavement, people stop and stare ----------
const WALKP = [[40, 1060, 1, 0, .62, 34], [200, 1092, 1, 2, .68, 30], [520, 1056, -1, 1, .6, 32], [660, 1090, -1, 3, .7, 30]];
function sceneHook(t) {
  const k = ease(ramp(t, .3, 1.8)), stop = 1.6;
  let top = '';
  WALKP.forEach(([x0, y, f, i, s, v], j) => { const T = Math.min(t, stop + j * .15), x = x0 + f * v * T, w = t < stop + j * .15;
    top += hero(x, y, Object.assign({ s, face: f, shade: 1, walk: w ? T * 4.4 + j : null, amp: .42, lookUp: w ? 0 : .25, aF: w ? undefined : [.6, -.2] }, gp(i))); });
  noEarth(); F.ov = '';
  return `<defs>${PTDEF}${TMDEFS2()}</defs>` + streetP(t, { N: .35, id: 'h0', cars: 0, top: top + portal(360, 840, 150, 240, t, k, gizaView(t), { id: 'p0' }) });
}
// ---------- 1-2: time dilation. Two clocks over the Earth (the fast one runs slow), then a space station in orbit ----------
function issDraw(x, y, s, rot) {
  const pan = (dx) => `<g transform="translate(${dx},0)"><rect x="-16" y="-110" width="32" height="96" fill="#1a2a5a"/><rect x="-16" y="14" width="32" height="96" fill="#1a2a5a"/>` + [-110, -86, -62, -38, 14, 38, 62, 86].map(yy => `<path d="M-16,${yy} h32" stroke="#c8a040" stroke-width="1.6"/>`).join('') + `<path d="M-16,-110 L16,-110 L16,-14 L-16,-14Z M-16,14 L16,14 L16,110 L-16,110Z" fill="#7aa0e0" opacity=".18"/></g>`;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><rect x="-150" y="-5" width="300" height="10" fill="#c8ccd2"/>${pan(-130)}${pan(-90)}${pan(90)}${pan(130)}` +
    `<rect x="-40" y="-14" width="80" height="28" rx="12" fill="#eef0f2"/><rect x="-14" y="-40" width="28" height="80" rx="12" fill="#e2e4e8"/><rect x="-40" y="-14" width="80" height="10" rx="5" fill="#fff" opacity=".6"/><rect x="40" y="-9" width="40" height="18" rx="8" fill="#d8dce2"/><path d="M-30,14 h60" stroke="#000" stroke-opacity=".2" stroke-width="4"/></g>`;
}
function clockBox(x, y, R, sec, lab, sub, a, fast) {
  if (a <= 0) return ''; const an = sec / 60 * 6.2832 - 1.5708;
  let g = `<g opacity="${a.toFixed(2)}">${panel(x - R - 26, y - R - 26, 2 * R + 52, 2 * R + 120)}${dialF(x, y, R, 10, 10, {})}`;
  g += `<path d="M${x},${y} L${(x + Math.cos(an) * R * .82).toFixed(1)},${(y + Math.sin(an) * R * .82).toFixed(1)}" stroke="#c8302a" stroke-width="3" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="5" fill="#c8302a"/>`;
  if (fast) g += `<path d="M${x - R - 60},${y - 30} h40 M${x - R - 70},${y} h50 M${x - R - 60},${y + 30} h40" stroke="#7ac8ff" stroke-width="5" stroke-linecap="round" opacity=".7"/>`;
  return g + PTL(x, y + R + 50, lab, 1, '#fff', 26) + PTL(x, y + R + 82, sub, 1, '#f4c76b', 22) + `</g>`;
}
function sceneDilation(t) {
  const t0 = S0(1) - .2, T = t - t0, ca = ease(ramp(t, WS(1, 7) - .3, WS(1, 7) + .2)) * (1 - ease(ramp(t, S0(2) - .4, S0(2)))), ia = ease(ramp(t, S0(2) - .2, S0(2) + .5));
  glE(t, { d: lerp(9.8, 8.6, ease(ramp(t, t0, S0(3)))), el: .22, lon: 30 + T * 4, clouds: .45, lights: .35, off: -.5, tg: [0, -.2, 0] });
  let ov = `<defs>${PTDEF}${TMDEFS2()}</defs>`;
  const ts = T * 6;
  ov += clockBox(190, 560, 110, ts, 'على الأرض', 'الزمنُ عاديّ', ca, 0) + clockBox(530, 560, 110, ts * .45, 'بسرعةٍ كبيرة', 'الزمنُ أبطأ', ca, 1);
  if (ia > 0) { const u = (t - S0(2)) / 7, x = lerp(-80, 720, u), y = 560 + 60 * Math.sin(u * 1.2);
    ov += `<g opacity="${ia.toFixed(2)}">${issDraw(x, y, .9, 8)}</g>` + `<g opacity="${ia.toFixed(2)}">${panel(110, 1040, 500, 170)}${PTL(360, 1096, '+٨٠٠ يومٍ في المدار', 1, '#fff', 30)}${PTL(360, 1160, 'أصغرُ بـ ٠٫٠٢ ثانية', ease(ramp(t, WS(2, 12), WS(2, 13))), '#f4c76b', 40)}</g>`; }
  F.ov = ov; return space(t);
}
// ---------- 3-4: the wormhole: two sheets of space joined by a throat; it pinches shut without exotic matter ----------
function wormhole(t, r0, o = {}) {
  const cx = 360, cy = 830, R = 330, s = 250, rings = 16, n = 24, zR = Math.acosh(R / r0);
  const Y = (r, up) => cy + (up ? -1 : 1) * s * (r <= r0 ? 0 : Math.acosh(r / r0) / zR);
  let g = '';
  const rr = Array.from({ length: rings }, (_, i) => r0 + (R - r0) * Math.pow(i / (rings - 1), 1.7));
  [1, 0].forEach(up => {
    // faint fill of the sheet
    let d = `M${cx - R},${Y(R, up)}`; for (let i = rings - 1; i >= 0; i--) d += ` L${cx - rr[i]},${Y(rr[i], up)}`; for (let i = 0; i < rings; i++) d += ` L${cx + rr[i]},${Y(rr[i], up)}`;
    g += `<path d="${d}Z" fill="#2a4a9a" opacity=".18"/>`;
    rr.forEach((r, i) => g += `<ellipse cx="${cx}" cy="${Y(r, up).toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * .2).toFixed(1)}" fill="none" stroke="${up ? '#7ac8ff' : '#b08aff'}" stroke-width="${(1 + 1.4 * i / rings).toFixed(1)}" opacity="${(.35 + .5 * i / rings).toFixed(2)}"/>`);
    for (let j = 0; j < n; j++) { const a = j / n * 6.283 + t * .1; let p = ''; rr.forEach((r, i) => { p += (i ? ' L' : 'M') + (cx + Math.cos(a) * r).toFixed(1) + ',' + (Y(r, up) + Math.sin(a) * r * .2).toFixed(1); });
      g += `<path d="${p}" stroke="${up ? '#7ac8ff' : '#b08aff'}" stroke-width="1.2" fill="none" opacity="${(.25 + .3 * Math.max(0, Math.sin(a))).toFixed(2)}"/>`; }
  });
  g += scr(`<ellipse cx="${cx}" cy="${cy}" rx="${(r0 * 1.6).toFixed(1)}" ry="${(r0 * .6 + 20).toFixed(1)}" fill="url(#ptGlow)" opacity=".8"/>`);
  if (o.ex > 0) g += scr(`<ellipse cx="${cx}" cy="${cy}" rx="${(r0 + 16).toFixed(1)}" ry="${((r0 + 16) * .22).toFixed(1)}" fill="none" stroke="#c88aff" stroke-width="10" opacity="${o.ex.toFixed(2)}" filter="url(#blur2)"/><ellipse cx="${cx}" cy="${cy}" rx="${(r0 * 2.4).toFixed(1)}" ry="${(r0).toFixed(1)}" fill="url(#ptPur)" opacity="${(.7 * o.ex).toFixed(2)}"/>`);
  return g;
}
function sceneWorm(t) {
  const t0 = S0(3) - .2, T = t - t0, la = ease(ramp(t, WS(3, 6), WS(3, 8))), lb = ease(ramp(t, WS(3, 10), WS(3, 12)));
  const pinch = ease(ramp(t, WS(4, 9), WS(4, 13) + .3)), ex = ease(ramp(t, WS(4, 4), WS(4, 6))) * (1 - .8 * pinch) * (.8 + .2 * Math.sin(t * 9));
  const r0 = lerp(70, 6, pinch);
  let s = `<defs>${PTDEF}${CBDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(220, 64);
  s += wormhole(t, r0, { ex });
  s += PTL(360, 520, 'هنا والآن', la, '#7ac8ff', 30) + PTL(360, 1150, 'زمانٌ ومكانٌ آخر', lb, '#c8a8ff', 30);
  s += PTL(360, 720, 'مادّةٌ غريبة: طاقةٌ سالبة', ease(ramp(t, WS(4, 5), WS(4, 7))) * (1 - pinch), '#d8b0ff', 26);
  noEarth(); F.ov = ''; return s;
}
