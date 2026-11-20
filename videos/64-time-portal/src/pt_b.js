// pt_b.js (#64): scenes 5-8 (the queue at the portal gate, the grandfather paradox, the markets, the portal destroys itself)
// a steel portal gate (a ring on a base) around the portal of light
function gate(cx, cy, rx, ry, t, a = 1) {
  let g = `<g opacity="${a}"><path d="M${cx - rx - 70},${cy + ry + 40} L${cx - rx - 30},${cy + ry - 40} L${cx + rx + 30},${cy + ry - 40} L${cx + rx + 70},${cy + ry + 40}Z" fill="#4a5058"/><path d="M${cx - rx - 70},${cy + ry + 40} h${2 * rx + 140}" stroke="#2a2e34" stroke-width="6"/>`;
  g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx + 34}" ry="${ry + 34}" fill="none" stroke="url(#steelR)" stroke-width="44"/><ellipse cx="${cx}" cy="${cy}" rx="${rx + 34}" ry="${ry + 34}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="2"/><ellipse cx="${cx}" cy="${cy}" rx="${rx + 12}" ry="${ry + 12}" fill="none" stroke="#2a2e34" stroke-width="4"/>`;
  for (let i = 0; i < 16; i++) { const an = i / 16 * 6.283, x = cx + Math.cos(an) * (rx + 34), y = cy + Math.sin(an) * (ry + 34), on = (Math.floor(t * 6) + i) % 4 === 0;
    g += `<rect x="${(x - 9).toFixed(1)}" y="${(y - 6).toFixed(1)}" width="18" height="12" rx="3" fill="#2a2e34"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="${on ? '#bfe6ff' : '#5a7a9a'}"/>`; }
  return g + `</g>`;
}
// ---------- 5: a plaza: a long queue at the portal gate; through it, Giza while the pyramid is built, then dinosaurs ----------
function sceneQueue(t) {
  const t0 = S0(5) - .2, T = t - t0, sw = ease(ramp(t, WS(5, 9) - .3, WS(5, 9) + .3));
  let s = `<defs>${PTDEF}${TMDEFS2()}${CBDEF}${IQDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a3450"/>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#spotG)"/>`;
  // a hall: tall glass wall at the back
  s += `<rect x="-20" y="380" width="760" height="560" fill="#3a4a6a"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 90},380 V940" stroke="#1e2638" stroke-width="8"/>`).join('') + `<path d="M-20,640 H740" stroke="#1e2638" stroke-width="6"/><rect x="-20" y="380" width="760" height="560" fill="url(#glsG)" opacity=".2"/>`;
  s += `<rect x="-20" y="940" width="760" height="380" fill="#9a9ca4"/><rect x="-20" y="940" width="760" height="380" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${i * 120 - 60},940 L${i * 180 - 340},1320" stroke="#7a7c84" stroke-width="2"/>`).join('');
  const cx = 470, cy = 690, rx = 160, ry = 230;
  let inner = sw < 1 ? `<g opacity="${(1 - sw).toFixed(2)}">${gizaView(t)}</g>` : '';
  if (sw > 0) inner += `<g opacity="${sw.toFixed(2)}">${jungleView(t)}</g>`;
  s += gate(cx, cy, rx, ry, t) + portal(cx, cy, rx, ry, t, 1, inner, { id: 'pq', clear: .6 });
  s += scr(`<ellipse cx="${cx}" cy="960" rx="260" ry="40" fill="url(#ptGlow)" opacity=".5"/>`);
  // rope posts and the queue (people waiting, a little shuffle)
  for (let i = 0; i < 6; i++) { const x = 40 + i * 70; s += `<rect x="${x - 4}" y="${1060 - 70}" width="8" height="70" fill="#c8a040"/><circle cx="${x}" cy="${1060 - 72}" r="7" fill="#e8c860"/>` + (i < 5 ? `<path d="M${x},${1060 - 60} Q${x + 35},${1060 - 40} ${x + 70},${1060 - 60}" stroke="#a82a2a" stroke-width="5" fill="none"/>` : ''); }
  for (let i = 0; i < 7; i++) { const x = 340 - i * 56 + Math.sin(T * 1.2 + i) * 3, y = 1120 + (i % 2) * 18, sc = .7 + (i % 2) * .04;
    s += hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, lookUp: .15, aF: [.1, .5] }, gp(i))); const [hx, hy] = HP.hand; if (i % 3 === 0) s += `<rect x="${hx - 6}" y="${hy - 14}" width="16" height="22" rx="2" fill="#f4c76b"/>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the grandfather paradox: a traveller holds an old family photo; he starts to fade ----------
function sceneParadox(t) {
  const t0 = S0(6) - .2, T = t - t0, fd = ease(ramp(t, WS(6, 6), WS(6, 8) + .4));
  let s = `<defs>${PTDEF}${TMDEFS2()}${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#5a4636"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += Array.from({ length: 12 }, (_, i) => `<path d="M${i * 64},380 V1000" stroke="#4a382a" stroke-width="22" opacity=".35"/>`).join('');
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#3a2a1e"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#gnWood)" opacity=".4"/>`;
  // a big old photo on the wall: a young couple of the 1950s, in sepia
  const P = (x, y) => `<g transform="translate(${x},${y})"><rect x="-150" y="-180" width="300" height="360" fill="#3a2414"/><rect x="-134" y="-164" width="268" height="328" fill="#e8dcc0"/><rect x="-120" y="-150" width="240" height="270" fill="#c8b08a"/>` +
    `<g filter="url(#iqSep)">${hero(-40, 120, Object.assign({ s: .62, face: 1, shade: 1, noShadow: 1 }, { top: '#4a4a5a', pants: '#2a2a30', skin: '#c89a74', hair: '#2a1d16' }))}${hero(40, 120, Object.assign({ s: .58, face: -1, shade: 1, noShadow: 1 }, { top: '#8a4a5a', pants: '#8a4a5a', skin: '#d0a07a', hair: '#3a2a1a' }))}${hairL(.58, -1, '#3a2a1a')}</g>` +
    `<rect x="-120" y="-150" width="240" height="270" fill="#6a4a20" opacity=".18"/><text x="0" y="150" text-anchor="middle" font-family="Noto Naskh Arabic" font-size="18" fill="#5a4a3a">١٩٥٨</text></g>`;
  s += P(400, 650);
  // the traveller; he fades and breaks into sparks
  const tr = hero(200, 1180, Object.assign({ s: 1.1, face: 1, shade: 1, lookUp: .1, aF: [.9, -.6] }, gp(1)));
  s += `<g opacity="${(1 - .85 * fd).toFixed(2)}">${tr}</g>`;
  if (fd > 0) { const r = RS(5); let p = ''; for (let i = 0; i < 40; i++) { const ph = pmod(T * .5 + r(), 1) * fd, x = 160 + r() * 90 + ph * 60, y = 1180 - r() * 330 - ph * 160; p += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + 2 * r()).toFixed(1)}" fill="#bfe6ff" opacity="${((1 - ph) * fd).toFixed(2)}"/>`; } s += scr(p); }
  s += PTL(400, 900, "جَدُّك وجدّتُك", ease(ramp(t, WS(6, 9), WS(6, 10))), '#f4c76b', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: whoever knows the future wins everything: a trading floor, the boards crash ----------
function sceneMarket(t) {
  const t0 = S0(7) - .2, T = t - t0, cr = ease(ramp(t, WS(7, 6) - .2, WS(7, 7) + .8));
  let s = `<defs>${PTDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#0e1424"/>`;
  // the big board
  s += `<rect x="30" y="400" width="660" height="440" rx="8" fill="#05080f"/><rect x="30" y="400" width="660" height="440" rx="8" fill="none" stroke="#2a3448" stroke-width="6"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M60,${450 + i * 50} H660" stroke="#1a2438" stroke-width="1.4"/>`;
  let d = ''; for (let i = 0; i <= 60; i++) { const x = 60 + i * 10, v = 600 - i * 2.2 + 18 * Math.sin(i * .9) + 10 * Math.sin(i * 2.3), c = i > 36 ? (i - 36) / 24 : 0, y = v + cr * c * c * 330 * clamp((T * 30 - i) / 10 + 1); d += (i ? ' L' : 'M') + x + ',' + Math.min(820, y).toFixed(1); }
  s += `<path d="${d}" stroke="${cr > .1 ? '#ff4a3a' : '#3ad86a'}" stroke-width="5" fill="none"/>`;
  // ticker rows (generic codes)
  ['ALX', 'BRQ', 'CNM', 'DLT', 'EVR', 'FNX'].forEach((c, i) => { const dn = cr > .2 || i % 3 === 1, v = (dn ? -1 : 1) * (2 + (i * 7) % 9 + (cr > .2 ? 18 * cr : 0));
    s += `<text x="${80 + (i % 3) * 210}" y="${880 + Math.floor(i / 3) * 0}" font-family="Inter Display, sans-serif" font-size="0">.</text>`;
    s += `<g transform="translate(${60 + (i % 3) * 210},${900 + Math.floor(i / 3) * 56})"><rect x="0" y="-34" width="196" height="46" rx="6" fill="#0a1020"/><text x="12" y="-2" direction="ltr" font-family="Inter Display, sans-serif" font-weight="600" font-size="24" fill="#c8d0e0">${c}</text><text x="184" y="-2" text-anchor="end" direction="ltr" font-family="Inter Display, sans-serif" font-weight="600" font-size="24" fill="${dn ? '#ff4a3a' : '#3ad86a'}">${dn ? '▼' : '▲'} ${Math.abs(v).toFixed(1)}%</text></g>`; });
  s += scr(`<rect x="30" y="400" width="660" height="440" fill="${cr > .1 ? '#ff2a1a' : '#1a6a3a'}" opacity="${(.06 + .06 * cr * (.5 + .5 * Math.sin(t * 10))).toFixed(2)}"/>`);
  // traders: hands on their heads as it crashes; one calm man with a glowing paper from the future
  [[110, 1250, 1, 0], [250, 1270, 1, 2], [480, 1262, -1, 3], [640, 1250, -1, 5]].forEach(([x, y, f, i]) => { const up = cr;
    s += hero(x, y, Object.assign({ s: .9, face: f, shade: 1, lookUp: .35 * up, hF: up > .3 ? [x + f * 8, y - 300 * .9] : undefined, hB: up > .3 ? [x - f * 4, y - 296 * .9] : undefined }, gp(i))); });
  s += hero(370, 1290, Object.assign({ s: 1.0, face: 1, shade: 1, hF: [420, 1100], hB: [400, 1110], lookUp: -.3 }, gp(4)));
  { const [hx, hy] = HP.hand; s += scr(`<circle cx="${hx}" cy="${hy - 10}" r="70" fill="url(#ptGold)" opacity=".7"/>`) + `<g transform="rotate(-10,${hx},${hy})"><rect x="${hx - 34}" y="${hy - 44}" width="68" height="50" fill="#f6f0dc"/><path d="M${hx - 26},${hy - 34} h52 M${hx - 26},${hy - 24} h40 M${hx - 26},${hy - 14} h48" stroke="#5a5040" stroke-width="2.4"/><text x="${hx}" y="${hy + 2}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="14" fill="#c8302a">٢٠٥٠</text></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: Hawking's chronology protection: the portal in a lab overloads and blows apart ----------
function sceneBoom(t) {
  const t0 = S0(8) - .2, T = t - t0, hb = WS(8, 11), b = clamp((t - hb) / .35), fl = clamp(1 - Math.abs(t - hb - .1) / .6), af = ease(ramp(t, hb + .1, hb + 1.4));
  const cx = 360, cy = 720, rx = 170, ry = 250, k = 1 - af;
  let s = `<defs>${PTDEF}${TMDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141a26"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += Array.from({ length: 10 }, (_, i) => `<rect x="${i * 76 - 10}" y="380" width="60" height="580" fill="#1e2636"/>`).join('') + `<rect x="-20" y="960" width="760" height="360" fill="#2a303c"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 100 - 40},960 L${i * 150 - 260},1320" stroke="#3a4250" stroke-width="2"/>`).join('');
  const shake = b > 0 && af < 1 ? 6 * Math.sin(t * 60) * (1 - af) : (t > hb - 2 ? 2 * Math.sin(t * 45) * clamp((t - hb + 2) / 2) : 0);
  let g = '';
  if (af < .12) g += gate(cx, cy, rx, ry, t, 1) + portal(cx, cy, rx, ry, t, k, '', { id: 'pb' });
  // cracks of light growing on the ring before it blows
  const cg = clamp((t - (hb - 2.2)) / 2.2); if (cg > 0 && af < .12) { const r = RS(9); for (let i = 0; i < 9; i++) { const a = r() * 6.283; let x = cx + Math.cos(a) * (rx + 34), y = cy + Math.sin(a) * (ry + 34), d = `M${x.toFixed(1)},${y.toFixed(1)}`; for (let j = 0; j < 5 * cg; j++) { x += (r() - .5) * 40; y += (r() - .5) * 40; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } g += `<path d="${d}" stroke="#e8f6ff" stroke-width="3" fill="none"/>`; } }
  s += `<g transform="translate(${shake.toFixed(1)},0)">${g}</g>`;
  if (af > 0) { // the broken ring: pieces flung out, smoke
    const r = RS(13); let p = '', sm = '';
    for (let i = 0; i < 14; i++) { const a = i / 14 * 6.283 + r() * .2, d = 1 + af * (.6 + r() * 1.2), x = cx + Math.cos(a) * (rx + 34) * d, y = cy + Math.sin(a) * (ry + 34) * d + af * af * 260, rot = af * (r() - .5) * 400;
      p += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(0)})"><path d="M-26,-10 L24,-14 L28,10 L-22,12Z" fill="url(#steelR)"/><path d="M-26,-10 L24,-14" stroke="#ffb070" stroke-width="3" opacity="${(1 - af).toFixed(2)}"/></g>`; }
    for (let i = 0; i < 22; i++) { const k2 = clamp(af * 1.3 - i * .02), x = cx + (r() - .5) * 360 * k2, y = cy + 100 - k2 * (100 + r() * 300); sm += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(40 + 90 * k2).toFixed(0)}" ry="${(30 + 50 * k2).toFixed(0)}" fill="${i % 2 ? '#5a5e66' : '#7a7e86'}" opacity="${(.4 * (1 - k2 * .6)).toFixed(2)}"/>`; }
    s += `<g filter="url(#smB)">${sm}</g>${p}`; }
  if (fl > 0) s += scr(`<circle cx="${cx}" cy="${cy}" r="${(200 + 500 * fl).toFixed(0)}" fill="url(#ptGlow)" opacity="${fl.toFixed(2)}"/>`) + `<rect x="-20" y="-20" width="760" height="1320" fill="#e8f6ff" opacity="${(.65 * fl * fl).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
