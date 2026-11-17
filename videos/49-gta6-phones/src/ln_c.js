// 8: is this number enough for humanity to go on? The danger is inbreeding
const icon = (x, y, s, c, a = 1, hc = null) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M-20,34 C-20,6 -14,-10 0,-10 C14,-10 20,6 20,34Z" fill="${c}"/><path d="M-20,34 C-20,6 -14,-10 0,-10 L0,34Z" fill="#000" opacity=".16"/><circle cx="0" cy="-26" r="13" fill="${hc || c}"/><circle cx="-4" cy="-30" r="5" fill="#fff" opacity=".22"/></g>`;
function helix(x, y0, y1, t, kb) {
  const A = 44, ph = y => (y - y0) * .021 + t * 1.1, pa = [], pb = []; let back = '', front = '', rungs = '';
  for (let y = y0; y <= y1; y += 4) { const p = ph(y); pa.push([x + A * Math.sin(p), y, Math.cos(p)]); pb.push([x - A * Math.sin(p), y, -Math.cos(p)]); }
  const seg = (P, col) => { for (let i = 0; i < P.length - 1; i++) { const d = `<path d="M${P[i][0].toFixed(1)},${P[i][1]} L${P[i + 1][0].toFixed(1)},${P[i + 1][1]}" stroke="${P[i][2] > 0 ? col : mix(col, '#0a0e1c', .55)}" stroke-width="${P[i][2] > 0 ? 10 : 7}" stroke-linecap="round"/>`; if (P[i][2] > 0) front += d; else back += d; } };
  seg(pa, '#6ab4ff'); seg(pb, '#c79aff');
  const r = RS(19), PC = [['#ff9a6a', '#5ad0ff'], ['#f4c76b', '#8ae08a']]; let n = 0;
  for (let y = y0 + 10; y <= y1 - 6; y += 23) { const p = ph(y), xa = x + A * Math.sin(p), xb = x - A * Math.sin(p), bad = r() < .55 && r() < kb * 1.4, [c1, c2] = PC[n++ % 2], mx = (xa + xb) / 2, op = (.55 + .45 * Math.abs(Math.sin(p))).toFixed(2);
    if (bad) rungs += `<path d="M${xa.toFixed(1)},${y} L${(mx + (xa - mx) * .35).toFixed(1)},${y - 3} M${xb.toFixed(1)},${y} L${(mx + (xb - mx) * .35).toFixed(1)},${y + 3}" stroke="#ff4a3a" stroke-width="6" stroke-linecap="round" opacity="${op}"/><circle cx="${mx.toFixed(1)}" cy="${y}" r="${(9 + 3 * Math.sin(t * 6 + y)).toFixed(1)}" fill="#ff4a3a" opacity=".35" filter="url(#blur2)"/>`;
    else rungs += `<path d="M${xa.toFixed(1)},${y} L${mx.toFixed(1)},${y}" stroke="${c1}" stroke-width="5" opacity="${op}"/><path d="M${mx.toFixed(1)},${y} L${xb.toFixed(1)},${y}" stroke="${c2}" stroke-width="5" opacity="${op}"/>`; }
  return `<g>${back}${rungs}${front}</g>`;
}
function sceneGenes(t) {
  const tB = WS(8, 7) - .25, q = ease(ramp(t, tB, tB + .5)), r = RS(8);
  let s = `<defs>${LDEFS()}</defs>` + studio('gnS', '#2a3654', '#080b18', 9);
  // all of humanity in one frame: 99 people
  if (q < 1) { let g = ''; for (let i = 0; i < 99; i++) { const c = i % 11, rw = Math.floor(i / 11), P = PALS[Math.floor(r() * PALS.length)], a = ramp(t, S0(8) - .15 + ((c * 7 + rw * 3) % 23) * .02, S0(8) + .1 + ((c * 7 + rw * 3) % 23) * .02), pop = 1 + .25 * Math.sin(Math.PI * a) * (1 - a);
      g += icon(80 + c * 56, 474 + rw * 68 + 2 * Math.sin(t * 1.4 + i), .9 * pop, P.top, a, P.skin); }
    s += `<g opacity="${(1 - q).toFixed(2)}">${g}<text x="360" y="1190" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="130" fill="#f4c76b" opacity="${ease(ramp(t, WS(8, 6), WS(8, 6) + .4)).toFixed(2)}" style="filter:drop-shadow(0 6px 16px rgba(0,0,0,.7))">؟</text></g>`; }
  // a family tree: two cousins marry, and the damage shows in their children
  if (q > 0) { const kb = ease(ramp(t, WS(8, 12) - .1, S0(9) - .4)), g1 = q, g2 = ease(ramp(t, WS(8, 8), WS(8, 8) + .4)), g3 = ease(ramp(t, WS(8, 9), WS(8, 9) + .4)), lk = ease(ramp(t, WS(8, 10) - .1, WS(8, 10) + .4)), g4 = ease(ramp(t, WS(8, 12) - .1, WS(8, 12) + .4));
    const Y = [500, 680, 860, 1050], ln = (d, a, c = '#f4c76b', w = 3.5) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" opacity="${a.toFixed(2)}" stroke-linecap="round"/>`;
    const hxS = helix(112, 430, 1170, t, kb); let g = '';
    g += ln(`M436,${Y[0]} H516`, g1) + ln(`M476,${Y[0]} V${Y[0] + 84} M350,${Y[0] + 84} H602 M350,${Y[0] + 84} V${Y[1] - 46} M602,${Y[0] + 84} V${Y[1] - 46}`, g2);
    g += ln(`M286,${Y[1]} H350 M602,${Y[1]} H666`, g2) + ln(`M318,${Y[1]} V${Y[2] - 46} M634,${Y[1]} V${Y[2] - 46}`, g3);
    g += ln(`M350,${Y[2] - 5} H602 M350,${Y[2] + 5} H602`, lk, '#ff5a4a', 4) + ln(`M476,${Y[2] + 5} V${Y[2] + 96} M410,${Y[2] + 96} H542 M410,${Y[2] + 96} V${Y[3] - 46} M542,${Y[2] + 96} V${Y[3] - 46}`, g4, '#ff5a4a');
    g += icon(410, Y[0], 1.25, '#e8eef6', g1) + icon(542, Y[0], 1.25, '#e8eef6', g1);
    g += icon(350, Y[1], 1.25, '#e8eef6', g2) + icon(602, Y[1], 1.25, '#e8eef6', g2) + icon(254, Y[1], 1.25, '#7c8aa2', g2) + icon(698, Y[1], 1.25, '#7c8aa2', g2);
    g += icon(318, Y[2], 1.25, mix('#e8eef6', '#ffb0a0', lk), g3) + icon(634, Y[2], 1.25, mix('#e8eef6', '#ffb0a0', lk), g3);
    g += icon(410, Y[3], 1.25, '#e5564c', g4) + icon(542, Y[3], 1.25, '#e5564c', g4);
    g += lbl(476, Y[2] - 24, 'أقارب', lk, '#ff8a7a', 34) + lbl(476, Y[3] + 100, 'أجيالٌ أضعف', g4, '#ff8a7a', 32);
    if (g4 > 0) [410, 542].forEach((x, i) => { g += `<circle cx="${x}" cy="${Y[3] - 6}" r="${(52 + 6 * Math.sin(t * 5 + i)).toFixed(1)}" fill="none" stroke="#ff5a4a" stroke-width="3" opacity="${(.6 * g4).toFixed(2)}" stroke-dasharray="8 7"/>`; });
    s += `<g opacity="${q.toFixed(2)}">${hxS}<g transform="translate(-24,0)">${g}</g></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 9: the surprise: a study worked out that 98 people are enough for a 6,300-year voyage to Proxima b, if the couples are chosen with care
function starship(t) {
  const fk = .85 + .15 * Math.sin(t * 31); let s = '', far = '', near = '';
  const ring = (cx, RX, RY, w, ph, n) => {
    far += `<path d="M${cx},${-RY} A${RX},${RY} 0 0 0 ${cx},${RY}" stroke="#2a3040" stroke-width="${w + 4}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 0 ${cx},${RY}" stroke="#6e7888" stroke-width="${w}" fill="none"/>`;
    near += `<path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#1e2430" stroke-width="${w + 4}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#c4ccd8" stroke-width="${w}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#fff" stroke-width="${w * .25}" fill="none" opacity=".5" transform="translate(${w * .25},0)"/>`;
    for (let i = 0; i < 4; i++) { const a = ph + i * Math.PI / 2, x = cx + RX * Math.cos(a), y = RY * Math.sin(a), d = `<path d="M${cx},0 L${x.toFixed(1)},${y.toFixed(1)}" stroke="${Math.cos(a) > 0 ? '#aab4c2' : '#5a6474'}" stroke-width="5"/>`; if (Math.cos(a) > 0) near += d; else far += d; }
    for (let i = 0; i < n; i++) { const a = ph * 1 + i / n * 6.2832, x = cx + RX * Math.cos(a), y = RY * Math.sin(a), d = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(w * .2).toFixed(1)}" fill="#ffe8a0" opacity="${(Math.cos(a) > 0 ? .95 : .45).toFixed(2)}"/>`; if (Math.cos(a) > 0) near += d; else far += d; }
  };
  ring(64, 30, 150, 20, t * .5, 26); ring(-44, 24, 116, 16, -t * .62 + 1, 20);
  // exhaust
  s += `<ellipse cx="-372" cy="0" rx="${(130 * fk).toFixed(1)}" ry="${(17 * fk).toFixed(1)}" fill="url(#exhG)" opacity=".95" filter="url(#blur5)"/><ellipse cx="-286" cy="0" rx="40" ry="7" fill="#fff" opacity=".95" filter="url(#blur2)"/>`;
  // radiators
  [-1, 1].forEach(sg => { s += `<path d="M-196,${sg * 10} L-118,${sg * 10} L-106,${sg * 118} L-208,${sg * 118}Z" fill="#4a2c34"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-196 - i * 2},${sg * (10 + (i + 1) * 15.4)} H${-118 + i * 2}" stroke="#ff8a6a" stroke-width="1.6" opacity=".55"/>`).join('') + `<path d="M-196,${sg * 10} L-118,${sg * 10} L-106,${sg * 118} L-208,${sg * 118}Z" fill="none" stroke="#8a94a6" stroke-width="2.5"/>`; });
  s += far;
  // spine truss
  s += `<rect x="-226" y="-8" width="412" height="16" fill="url(#hullM)"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${-222 + i * 20},8 l10,-16 l10,16" stroke="#3a4252" stroke-width="1.6" fill="none"/>`).join('');
  // fuel tanks
  [[-150, -24], [-150, 24], [-96, -24], [-96, 24]].forEach(([x, y]) => { s += `<rect x="${x - 24}" y="${y - 13}" width="48" height="26" rx="13" fill="url(#foilG)"/><rect x="${x - 24}" y="${y - 13}" width="48" height="8" rx="4" fill="#fff" opacity=".3"/>`; });
  // engine
  s += `<rect x="-250" y="-24" width="40" height="48" rx="5" fill="url(#hullM)"/><path d="M-250,-16 L-278,-30 L-278,30 L-250,16Z" fill="#3a4252"/><path d="M-278,-30 L-278,30" stroke="#9ad8ff" stroke-width="5"/><ellipse cx="-280" cy="0" rx="8" ry="26" fill="#cfeaff" opacity=".9" filter="url(#blur2)"/>`;
  // hubs, the command module, the shield
  s += `<rect x="44" y="-20" width="40" height="40" rx="6" fill="url(#hullM)"/><rect x="-60" y="-17" width="34" height="34" rx="5" fill="url(#hullM)"/>`;
  s += `<rect x="140" y="-22" width="92" height="44" rx="22" fill="url(#hullM)"/><rect x="150" y="-16" width="70" height="9" rx="4" fill="#fff" opacity=".35"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${158 + i * 12}" y="-3" width="7" height="8" rx="2" fill="#ffe8a0"/>`).join('') + `<ellipse cx="244" cy="0" rx="10" ry="48" fill="#aeb6c4"/><ellipse cx="247" cy="0" rx="6" ry="44" fill="#e6eaf0"/><path d="M186,-22 L176,-74 M176,-74 l-9,-3 M176,-74 l9,-3" stroke="#c4ccd8" stroke-width="3" fill="none"/><circle cx="176" cy="-78" r="5" fill="#e6eaf0"/>`;
  return s + near;
}
function sceneShip(t) {
  const T = t - S0(9) + .2, mv = ease(ramp(t, S0(9) - .2, WS(9, 13)));
  gAt(t, lerp(214, 58, mv), lerp(968, 940, mv), { d: lerp(9.2, 34, mv), el: .2, lon: 30 + T * 2.5, clouds: .4, lights: .3 });
  const sx = lerp(330, 414, mv), sy = lerp(650, 706, mv) + 5 * Math.sin(t * .9), sc = lerp(.82, .98, mv), stA = ease(ramp(t, WS(9, 8) - .2, WS(9, 9))), STX = 632, STY = 470, pa = ease(ramp(t, WS(9, 14) - .2, WS(9, 14) + .35));
  let o = `<defs>${LDEFS()}</defs>`;
  // Proxima Centauri (a red dwarf) and the way there
  if (stA > 0) { const nx = sx + Math.cos(-.384) * 250 * sc, ny = sy + Math.sin(-.384) * 250 * sc;
    o += `<g opacity="${stA.toFixed(2)}"><circle cx="${STX}" cy="${STY}" r="${(54 + 5 * Math.sin(t * 3)).toFixed(1)}" fill="url(#redSt)"/><circle cx="${STX}" cy="${STY}" r="6" fill="#fff2e0"/><circle cx="${STX + 22}" cy="${STY + 9}" r="3.2" fill="#8ac8ff"/><path d="M${nx.toFixed(1)},${ny.toFixed(1)} Q${(nx + STX) / 2 + 30},${(ny + STY) / 2} ${STX - 6},${STY + 40}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="3 11" fill="none" stroke-linecap="round" stroke-dashoffset="${(-t * 26).toFixed(1)}"/></g>` +
      lbl(STX - 128, STY - 2, 'بروكسيما ب', stA, '#ffc8a8', 30) + lbl(STX - 128, STY + 32, '٤٫٢ سنة ضوئيّة', stA * ease(ramp(t, WS(9, 10), WS(9, 11))), '#fff', 23); }
  o += `<g transform="translate(${sx.toFixed(1)},${sy.toFixed(1)}) rotate(-22) scale(${sc.toFixed(3)})">${starship(t)}</g>`;
  // the couples, chosen so that they are not related
  if (pa > 0) { const X0 = 50, Y0 = 1004, CP = ['#8ac8ff', '#f4a8c0', '#a8e0a0', '#f4c76b', '#c8a8f4', '#ffb08a', '#8ae0d8'];
    o += `<g opacity="${pa.toFixed(2)}">` + panel(X0, Y0, 620, 190, 1) + lbl(360, Y0 + 44, 'أزواجٌ من عائلاتٍ مختلفة', 1, '#fff', 28);
    for (let i = 0; i < 7; i++) { const x = X0 + 62 + i * 82.6, a = ease(ramp(t, WS(9, 15) - .1 + i * .13, WS(9, 15) + .2 + i * .13)), y = Y0 + 124;
      o += icon(x - 15, y, .82, CP[i], a) + icon(x + 15, y, .82, mix(CP[(i + 3) % 7], '#ffffff', .25), a) + `<path d="M${x - 8},${y - 52} q8,-12 16,0" stroke="#f4c76b" stroke-width="3.5" fill="none" opacity="${a.toFixed(2)}" stroke-linecap="round"/><circle cx="${x}" cy="${y - 60}" r="4" fill="#f4c76b" opacity="${a.toFixed(2)}"/>`; }
    o += `</g>`; }
  F.ov = o; return space(t) + `<g opacity=".8">${milkyW(t, { rot: -26, seed: 12 })}</g>`;
}
