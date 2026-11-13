// ===================== "what if your body were made of antimatter?" (Short #39) =====================
const AMDEF = `<filter id="antiF" x="-40%" y="-30%" width="180%" height="160%"><feMorphology in="SourceAlpha" operator="dilate" radius="3" result="d"/><feGaussianBlur in="d" stdDeviation="9" result="b"/><feFlood flood-color="#b496ff"/><feComposite in2="b" operator="in"/></filter>` +
  `<radialGradient id="pRed" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ffc0b0"/><stop offset=".5" stop-color="#e0483a"/><stop offset="1" stop-color="#5a1008"/></radialGradient>` +
  `<radialGradient id="pBlue" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#d0ecff"/><stop offset=".5" stop-color="#2a7ad8"/><stop offset="1" stop-color="#0a2258"/></radialGradient>` +
  `<radialGradient id="pGold" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff4cc"/><stop offset=".5" stop-color="#f0b040"/><stop offset="1" stop-color="#6a3a08"/></radialGradient>` +
  `<radialGradient id="pVio" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#f0e0ff"/><stop offset=".5" stop-color="#9a5ae8"/><stop offset="1" stop-color="#2a0e5a"/></radialGradient>` +
  `<radialGradient id="flashG"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#f4ecff" stop-opacity=".85"/><stop offset=".6" stop-color="#c0a0ff" stop-opacity=".25"/><stop offset="1" stop-color="#9a70ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="vioGl"><stop offset="0" stop-color="#c8a8ff" stop-opacity=".55"/><stop offset="1" stop-color="#8a5aff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="cloudE"><stop offset="0" stop-color="#7ab8ff" stop-opacity=".14"/><stop offset=".7" stop-color="#4a88e8" stop-opacity=".05"/><stop offset="1" stop-color="#4a88e8" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="cloudP"><stop offset="0" stop-color="#ffd27a" stop-opacity=".14"/><stop offset=".7" stop-color="#e8a84a" stop-opacity=".05"/><stop offset="1" stop-color="#e8a84a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="glassT" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9ab8d8" stop-opacity=".35"/><stop offset=".18" stop-color="#ffffff" stop-opacity=".45"/><stop offset=".35" stop-color="#9ab8d8" stop-opacity=".08"/><stop offset=".8" stop-color="#9ab8d8" stop-opacity=".12"/><stop offset="1" stop-color="#cfe0f0" stop-opacity=".4"/></linearGradient>` +
  `<linearGradient id="copC" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a3414"/><stop offset=".35" stop-color="#e09050"/><stop offset=".55" stop-color="#b86a30"/><stop offset="1" stop-color="#4a2410"/></linearGradient>` +
  `<linearGradient id="steelC" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a5058"/><stop offset=".4" stop-color="#c8ced6"/><stop offset=".6" stop-color="#8a9098"/><stop offset="1" stop-color="#3a4048"/></linearGradient>` +
  `<radialGradient id="bulbG" cx=".42" cy=".38" r=".7"><stop offset="0" stop-color="#ffffff" stop-opacity=".16"/><stop offset=".8" stop-color="#c8d8e8" stop-opacity=".08"/><stop offset="1" stop-color="#e8f0f8" stop-opacity=".3"/></radialGradient>` +
  `<linearGradient id="desG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6a9a"/><stop offset=".55" stop-color="#c8a07a"/><stop offset="1" stop-color="#f0c890"/></linearGradient>`;
const ADEFS = () => `${DEFS()}${AMDEF}`;
const VIO = '#b496ff';

// a shaded particle: a little sphere with its charge sign, plus a soft halo
const ptc = (x, y, r, g, sg, a = 1, halo = '') => a <= .01 ? '' : `<g opacity="${a.toFixed(2)}">` + (halo ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 1.6).toFixed(1)}" fill="${halo}" opacity=".45" filter="url(#blur9)"/>` : '') +
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#${g})"/><ellipse cx="${(x - r * .32).toFixed(1)}" cy="${(y - r * .38).toFixed(1)}" rx="${(r * .3).toFixed(1)}" ry="${(r * .2).toFixed(1)}" fill="#fff" opacity=".55"/>` +
  (sg ? `<text x="${x.toFixed(1)}" y="${(y + r * .36).toFixed(1)}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${(r * 1.05).toFixed(1)}" fill="#fff" style="direction:ltr">${sg}</text>` : '') + `</g>`;
// a person with the antimatter shimmer: the same drawn person, with a violet halo around the outline
function antiHero(x, y, o, k, t) {
  const h = hero(x, y, o), P = Object.assign({}, HP);
  const glow = k > 0 ? `<g filter="url(#antiF)" opacity="${clamp(k * (.8 + .2 * Math.sin(t * 7.3) * Math.sin(t * 3.1))).toFixed(2)}">${h}</g>` : '';
  return { s: glow + h, P };
}
// tiny violet twinkles on the body outline
function antiTw(cx, cy, w, h, n, t, a, seed) {
  if (a <= .01) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = cx + (r() - .5) * w, y = cy + (r() - .5) * h, p = pmod(t * (.8 + r()) + r(), 1), k = Math.pow(Math.sin(p * Math.PI), 3) * a, z = 1.5 + r() * 2.5;
    if (k > .03) s += `<path d="M${x},${y - z * 2.4} L${x + z * .4},${y - z * .4} L${x + z * 2.4},${y} L${x + z * .4},${y + z * .4} L${x},${y + z * 2.4} L${x - z * .4},${y + z * .4} L${x - z * 2.4},${y} L${x - z * .4},${y - z * .4}Z" fill="#efe6ff" opacity="${k.toFixed(2)}"/>`; }
  return s;
}
const tag = (x, y, tx, col, bg, fs = 22) => { const w = tx.length * fs * .52 + 30; return `<rect x="${(x - w / 2).toFixed(1)}" y="${y - fs * .95}" width="${w.toFixed(1)}" height="${fs * 1.5}" rx="${fs * .75}" fill="${bg}" opacity=".85"/>` + lbl(x, y, tx, 1, col, fs); };
function mushroom(x, y, k, t) {
  const h = 360 * k, cw = 110 + 80 * k, cy = y - h;
  return `<g filter="url(#cloudF)"><path d="M${x - 36 - 20 * k},${y} C${x - 20},${y - h * .4} ${x - 46},${y - h * .7} ${x - 30},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#8a6a52"/><path d="M${x - 10},${y} C${x},${y - h * .5} ${x - 14},${y - h * .8} ${x},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#4a3a30" opacity=".6"/>` +
    `<ellipse cx="${x}" cy="${y - 10}" rx="${120 + 160 * k}" ry="${26 + 20 * k}" fill="#9a8672"/>` +
    [[0, 0, 1, '#b08060'], [-.5, .12, .62, '#96705a'], [.5, .12, .62, '#7a5a4a'], [-.2, -.2, .7, '#e0a060'], [.15, -.26, .55, '#ffcf80']].map(([dx, dy, s, c]) => `<ellipse cx="${x + dx * cw}" cy="${cy + dy * cw}" rx="${cw * s}" ry="${cw * s * .52}" fill="${c}"/>`).join('') + `<ellipse cx="${x}" cy="${cy + cw * .28}" rx="${cw * .8}" ry="${cw * .16}" fill="#3a2a24" opacity=".5"/></g>`;
}
// a spiral galaxy made of dots (two arms, dust lanes, a small soft core)
function galaxy(cx, cy, R, a, t, seed = 5, sq = .42, rot = 0) {
  if (a <= .01) return ''; const r = RS(seed); let s = `<g opacity="${a.toFixed(2)}"><ellipse cx="${cx}" cy="${cy}" rx="${R * 1.05}" ry="${R * sq * 1.05}" fill="#6a5aa8" opacity=".14" filter="url(#soft)"/><ellipse cx="${cx}" cy="${cy}" rx="${R * .55}" ry="${R * sq * .55}" fill="#c8b0e8" opacity=".14" filter="url(#soft)"/>`;
  const ca = Math.cos(rot), sa = Math.sin(rot), P = (u, v) => { const x = u * ca - v * sa, y = u * sa + v * ca; return [cx + x, cy + y * sq]; };
  for (let i = 0; i < 900; i++) { const arm = i % 2, u = Math.pow(r(), .7), th = u * 2.6 * Math.PI + arm * Math.PI + t * .05, sc = (r() - .5) * (.7 - .35 * u) * R * (r() < .3 ? 2.2 : 1), rr = u * R;
    const [x, y] = P(Math.cos(th) * rr + sc * Math.cos(th + 1.57), Math.sin(th) * rr + sc * Math.sin(th + 1.57)), z = r();
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.5 + z * z * 1.6).toFixed(2)}" fill="${z > .93 ? '#ffd8b0' : z > .8 ? '#bcd4ff' : '#fff'}" opacity="${(.35 + .6 * (1 - u * .6) * r()).toFixed(2)}"/>`; }
  for (let i = 0; i < 2; i++) { let d = ''; for (let j = 0; j <= 40; j++) { const u = .15 + j / 40 * .8, th = u * 2.6 * Math.PI + i * Math.PI + .25 + t * .05, [x, y] = P(Math.cos(th) * u * R, Math.sin(th) * u * R); d += (j ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
    s += `<path d="${d}" stroke="#1a1028" stroke-width="${R * .05}" fill="none" opacity=".45" filter="url(#blur2)"/>`; }
  return s + `<ellipse cx="${cx}" cy="${cy}" rx="${R * .16}" ry="${R * .16 * sq * 1.3}" fill="#fff4dc" opacity=".55" filter="url(#blur9)"/><ellipse cx="${cx}" cy="${cy}" rx="${R * .06}" ry="${R * .045}" fill="#fff"/></g>`;
}

// 0: you reach to shake hands with your antimatter twin
function sceneHook(t) {
  const y0 = PV + 74, e = ease(ramp(t, .15, WS(0, 7))), z = 1.42 + .14 * ease(clamp(t / 3.2)), hy = y0 - 154;
  let fg = '';
  fg += hero(250, y0, Object.assign({ s: .82, face: 1, shade: 1, hF: [lerp(296, 344, e), hy] }, YOU));
  const A = Object.assign({}, HP);
  const B = antiHero(470, y0, Object.assign({ s: .82, face: -1, shade: 1, hF: [lerp(424, 376, e), hy] }, YOU), .55 + .35 * e, t);
  fg += B.s + antiTw(470, y0 - 130, 120, 260, 18, t, .5 + .5 * e, 9);
  // the crackle in the gap between the hands
  const sp = e * (.7 + .3 * Math.abs(Math.sin(t * 23)));
  if (sp > .05) { let arc = ''; const r = RS(Math.floor(t * 18)); for (let i = 0; i < 3; i++) { let d = `M${(A.hand[0] + 6).toFixed(1)},${A.hand[1].toFixed(1)}`; for (let j = 1; j <= 4; j++) d += ` L${lerp(A.hand[0] + 6, B.P.hand[0] - 6, j / 4).toFixed(1)},${(hy + (r() - .5) * 22 * sp).toFixed(1)}`; arc += `<path d="${d}" stroke="#f0e6ff" stroke-width="${(1.2 + r() * 1.6).toFixed(1)}" fill="none" opacity="${(.6 + .4 * r()).toFixed(2)}"/>`; }
    fg += `<circle cx="360" cy="${hy}" r="${(26 + 16 * sp).toFixed(1)}" fill="url(#vioGl)"/>` + arc + `<circle cx="360" cy="${hy}" r="${(3 + 3 * sp).toFixed(1)}" fill="#fff"/>`; }
  fg += tag(A.head[0], A.head[1] - 62, 'مادّة عاديّة', '#fff', '#2a3a5a', 20) + tag(B.P.head[0], B.P.head[1] - 62, 'مادّة مضادّة', '#efe6ff', '#4a2a8a', 20);
  let s = `<defs>${ADEFS()}</defs><g transform="translate(360,${hy}) scale(${z.toFixed(4)}) translate(-360,${-hy})">` + street3(t, { N: 0, id: 'h', fg, cars: 0, lamps: 0 }) + `</g>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#2a1060" opacity="${(.12 * e).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 1: the atom and the anti-atom, mirror images
function sceneAtoms(t) {
  const T = t - S0(1), pp = ease(ramp(t, WS(1, 6) - .2, WS(1, 6) + .3)), ap = ease(ramp(t, WS(1, 8) - .2, WS(1, 8) + .3));
  let s = `<defs>${ADEFS()}</defs>` + studio('stA', '#232a44', '#05070e', 17);
  s += `<path d="M360,430 L360,1150" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 10" opacity=".5"/>`;
  const atom = (cx, cy, nuc, nG, nS, el, eG, eS, cl, hi, lab) => {
    let a = `<ellipse cx="${cx}" cy="${cy}" rx="150" ry="150" fill="url(#${cl})"/>`;
    [[0, 1], [60, .7], [-60, .7]].forEach(([rot, o]) => { a += `<ellipse cx="${cx}" cy="${cy}" rx="128" ry="44" fill="none" stroke="#fff" stroke-width="1.4" opacity="${(.22 * o).toFixed(2)}" transform="rotate(${rot},${cx},${cy})"/>`; });
    const ph = T * 2.2 + (cx > 360 ? Math.PI : 0), ex = Math.cos(ph) * 128, ey = Math.sin(ph) * 44, rr = 25 * Math.PI / 180, X = cx + ex * Math.cos(rr) - ey * Math.sin(rr), Y = cy + ex * Math.sin(rr) + ey * Math.cos(rr), front = Math.sin(ph) > 0;
    a += `<ellipse cx="${cx}" cy="${cy}" rx="128" ry="44" fill="none" stroke="${el === 'pBlue' ? '#7ab8ff' : '#ffd27a'}" stroke-width="2" opacity=".5" transform="rotate(25,${cx},${cy})"/>`;
    const eSv = ptc(X, Y, 15, eG, eS, 1, el === 'pBlue' ? '#4a8aff' : '#ffb84a');
    if (!front) a += eSv;
    a += ptc(cx, cy, 40, nG, nS, 1, nG === 'pRed' ? '#ff6a4a' : '#a070ff');
    if (front) a += eSv;
    if (hi.e > 0) a += `<circle cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" r="${(28 + 6 * Math.sin(t * 6)).toFixed(1)}" fill="none" stroke="#fff" stroke-width="3" opacity="${hi.e.toFixed(2)}"/>`;
    if (hi.n > 0) a += `<circle cx="${cx}" cy="${cy}" r="${(58 + 6 * Math.sin(t * 6)).toFixed(1)}" fill="none" stroke="#fff" stroke-width="3" opacity="${hi.n.toFixed(2)}"/>`;
    return a + tag(cx, cy - 196, lab, '#fff', '#0a0e1c', 24);
  };
  s += atom(185, 760, 'p', 'pRed', '+', 'pBlue', 'pBlue', '−', 'cloudE', { e: 0, n: 0 }, 'هيدروجين');
  s += atom(535, 760, 'ap', 'pVio', '−', 'pGold', 'pGold', '+', 'cloudP', { e: pp, n: ap }, 'هيدروجين مضادّ');
  // the parts, named under each atom
  const row = (x, y, c, tx, a) => a > 0 ? `<g opacity="${a.toFixed(2)}">` + lbl(x, y, tx, 1, c, 25) + `</g>` : '';
  const b0 = ease(ramp(t, S0(1) + .4, S0(1) + 1));
  s += row(185, 1010, '#ff9a86', 'بروتون: موجب', b0) + row(185, 1056, '#9ccaff', 'إلكترون: سالب', b0);
  s += row(535, 1010, '#d6bcff', 'بروتون مضادّ: سالب', Math.max(ap, b0 * .5)) + row(535, 1056, '#ffd88a', 'بوزيترون: موجب', Math.max(pp, b0 * .5));
  s += lbl(360, 1160, 'نفسُ الكتلة… شحنةٌ معاكسة', ease(ramp(t, WS(1, 3), WS(1, 4))), '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}

// 2: an electron meets a positron: both vanish into two gamma rays
function sceneAnnihilate(t) {
  const c = WS(2, 4) + .15, u = clamp((t - (S0(2) - .2)) / (c - S0(2) + .2)), m = Math.pow(u, 2.2), hit = t >= c, fl = hit ? Math.exp(-(t - c) * 3.2) : 0, g = hit ? clamp((t - c) / 1.6) : 0;
  let s = `<defs>${ADEFS()}</defs>` + studio('stN', '#1e2440', '#04050c', 23);
  const cy = 700;
  if (!hit) { const xl = lerp(70, 352, m), xr = lerp(650, 368, m);
    for (let i = 1; i < 7; i++) { const q = i / 7; s += `<circle cx="${(xl - i * 16 * (.4 + m)).toFixed(1)}" cy="${cy}" r="${(10 * (1 - q)).toFixed(1)}" fill="#4a8aff" opacity="${(.18 * (1 - q)).toFixed(2)}"/><circle cx="${(xr + i * 16 * (.4 + m)).toFixed(1)}" cy="${cy}" r="${(10 * (1 - q)).toFixed(1)}" fill="#ffb84a" opacity="${(.18 * (1 - q)).toFixed(2)}"/>`; }
    s += ptc(xl, cy, 22, 'pBlue', '−', 1, '#4a8aff') + ptc(xr, cy, 22, 'pGold', '+', 1, '#ffb84a');
    s += lbl(xl, cy + 64, 'إلكترون', 1, '#9ccaff', 22) + lbl(xr, cy + 64, 'بوزيترون', 1, '#ffd88a', 22); }
  // two gamma photons fly out in opposite directions (wavy lines)
  if (g > 0) { [[1, -1], [-1, 1]].forEach(([dx, dy], q) => { const L = 30 + 270 * ease(g), ang = Math.atan2(dy * .55, dx), ca = Math.cos(ang), sa = Math.sin(ang); let d = '';
      for (let j = 0; j <= 80; j++) { const l = j / 80 * L, w = Math.sin(l * .16 - t * 30) * 9; d += (j ? ' L' : 'M') + (360 + ca * l - sa * w).toFixed(1) + ',' + (cy + sa * l + ca * w).toFixed(1); }
      s += `<path d="${d}" stroke="#d8c8ff" stroke-width="10" fill="none" opacity=".25" filter="url(#blur2)"/><path d="${d}" stroke="#f4eeff" stroke-width="3" fill="none"/>` + `<circle cx="${(360 + ca * L).toFixed(1)}" cy="${(cy + sa * L).toFixed(1)}" r="7" fill="#fff"/>`;
      if (g > .25) s += lbl(360 + ca * (L * .62) + (q ? -40 : 40), cy + sa * (L * .62) + (q ? 64 : -34), 'أشعّةُ غاما', ease(ramp(g, .25, .45)), '#e8dcff', 24); }); }
  if (fl > .01) s += `<circle cx="360" cy="${cy}" r="${(30 + 120 * fl).toFixed(1)}" fill="url(#flashG)" opacity="${fl.toFixed(2)}"/><circle cx="360" cy="${cy}" r="${(6 + 10 * fl).toFixed(1)}" fill="#fff" opacity="${fl.toFixed(2)}"/>`;
  // E = mc² and the comparison: 100% vs under 1%
  const em = ease(ramp(t, WS(2, 7) - .2, WS(2, 7) + .3));
  if (em > 0) s += `<g opacity="${em.toFixed(2)}"><text x="360" y="520" text-anchor="middle" font-family="Inter" font-weight="700" font-size="64" fill="#f4c76b" style="direction:ltr">E = mc²</text></g>`;
  const cb = ease(ramp(t, WS(2, 8) - .1, WS(2, 9)));
  if (cb > 0) { s += `<g opacity="${cb.toFixed(2)}">` + panel(70, 930, 580, 240) + lbl(560, 990, 'الفناء', 1, '#efe6ff', 26) + lbl(560, 1100, 'القنبلة النوويّة', 1, '#ffb89a', 26);
    s += `<rect x="110" y="1012" width="500" height="24" rx="6" fill="#ffffff" opacity=".1"/><rect x="${(610 - 500 * cb).toFixed(1)}" y="1012" width="${(500 * cb).toFixed(1)}" height="24" rx="6" fill="${VIO}"/>` + lbl(150, 990, '١٠٠٪', 1, '#fff', 28);
    s += `<rect x="110" y="1122" width="500" height="24" rx="6" fill="#ffffff" opacity=".1"/><rect x="604" y="1122" width="6" height="24" rx="3" fill="#ff7a5a"/>` + lbl(150, 1100, 'أقلّ من ١٪', 1, '#fff', 26) + `</g>`; }
  F.flash = hit ? .55 * Math.exp(-(t - c) * 9) : 0;
  noEarth(); F.ov = ''; return s;
}

// 3: the moment you appear, the air hits your skin and you glow with gamma rays
function sceneAir(t) {
  const T = t - S0(3), y0 = PV + 74, ap = ease(ramp(t, S0(3) - .1, S0(3) + .5)), gl = ease(ramp(t, WS(3, 5) - .2, WS(3, 6) + .2)), hit = ease(ramp(t, WS(3, 2) - .2, WS(3, 3)));
  let fg = '';
  // two passers-by who back away
  const bk = ease(ramp(t, WS(3, 5), WS(3, 9) + .4));
  fg += hero(150 - 70 * bk, y0 + 4, Object.assign({ s: .7, face: 1, shade: 1, lean: -10 * bk, hF: [150 - 70 * bk + 36, y0 - 150 - 70 * bk], hB: [150 - 70 * bk + 26, y0 - 140 - 60 * bk] }, palS(2)));
  fg += hero(600 + 60 * bk, y0 - 2, Object.assign({ s: .68, face: -1, shade: 1, lean: -10 * bk, hF: [600 + 60 * bk - 36, y0 - 140 - 70 * bk] }, palS(9)));
  const X = antiHero(360, y0 + 10, Object.assign({ s: .92, face: 1, shade: 1, hF: [405, y0 - 120], hB: [330, y0 - 116] }, YOU), (.45 + .55 * gl) * ap, t);
  fg += `<g opacity="${ap.toFixed(2)}">${X.s}</g>`;
  let s = `<defs>${ADEFS()}</defs>` + street3(t, { N: 0, id: 'a', fg, cars: 0 });
  // the air molecules streaming in and flashing on the skin
  if (hit > 0) { const r = RS(501);
    for (let i = 0; i < 80; i++) { const ang = r() * 6.283, d0 = 220 + r() * 300, tx = 360 + (r() - .5) * 64, ty = y0 - 14 - r() * 250, per = 1 + r() * 1.3, p = pmod(T / per + r(), 1), ox = Math.cos(ang), oy = Math.sin(ang);
      if (p < .86) { const k = p / .86, x = tx + ox * d0 * (1 - k), y = ty + oy * d0 * (1 - k), rt = r() * 3.14; s += `<g opacity="${(hit * .8).toFixed(2)}"><circle cx="${(x - 4 * Math.cos(rt)).toFixed(1)}" cy="${(y - 4 * Math.sin(rt)).toFixed(1)}" r="4" fill="#cfe0f0"/><circle cx="${(x + 4 * Math.cos(rt)).toFixed(1)}" cy="${(y + 4 * Math.sin(rt)).toFixed(1)}" r="4" fill="#aac4dc"/></g>`; }
      else { const f = 1 - (p - .86) / .14; s += `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${(4 + 16 * f).toFixed(1)}" fill="url(#flashG)" opacity="${(hit * f).toFixed(2)}"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${(2.5 * f).toFixed(1)}" fill="#fff" opacity="${hit.toFixed(2)}"/>`; } } }
  // gamma rays radiating out
  if (gl > 0) { let rays = ''; for (let i = 0; i < 22; i++) { const a = i / 22 * 6.283 + .1, L = 640; rays += `<path d="M${(360 + Math.cos(a) * 60).toFixed(1)},${(y0 - 140 + Math.sin(a) * 90).toFixed(1)} L${(360 + Math.cos(a) * L).toFixed(1)},${(y0 - 140 + Math.sin(a) * L).toFixed(1)}" stroke="#e8dcff" stroke-width="2.4" stroke-dasharray="26 18" stroke-dashoffset="${(-t * 260).toFixed(1)}" opacity="${(.45 * gl).toFixed(2)}"/>`; }
    s += `<rect x="-20" y="-20" width="760" height="1320" fill="#2a1060" opacity="${(.2 * gl).toFixed(2)}"/>` + scr(`<ellipse cx="360" cy="${y0 - 130}" rx="${150 + 20 * Math.sin(t * 9)}" ry="230" fill="url(#vioGl)" opacity="${gl.toFixed(2)}"/>`) + rays; }
  s += antiTw(360, y0 - 130, 110, 270, 26, t, ap * (.4 + .6 * gl), 13);
  noEarth(); F.ov = ''; return s;
}

// 4: one gram held in a magnetic trap = about three Hiroshima bombs
function sceneGram(t) {
  const T = t - S0(4);
  let s = `<defs>${ADEFS()}</defs>` + studio('stG', '#2a3048', '#06080e', 31);
  // the bench
  s += `<rect x="-20" y="760" width="760" height="40" fill="#3a3e46"/><rect x="-20" y="760" width="760" height="5" fill="#8a909a"/><rect x="-20" y="800" width="760" height="20" fill="#000" opacity=".4" filter="url(#blur2)"/>`;
  // the magnetic trap: glass tube, copper coils, the gram floating in the middle
  const tx = 270, top = 420, bot = 760, jx = Math.sin(t * 5.3) * 2, jy = Math.sin(t * 4.1) * 3;
  s += `<rect x="${tx - 92}" y="${bot - 26}" width="184" height="26" rx="6" fill="url(#steelC)"/><rect x="${tx - 92}" y="${top - 10}" width="184" height="26" rx="6" fill="url(#steelC)"/>`;
  s += `<rect x="${tx - 62}" y="${top + 16}" width="124" height="${bot - top - 42}" fill="#0a1020" opacity=".55"/>`;
  s += `<circle cx="${tx + jx}" cy="${590 + jy}" r="${(46 + 6 * Math.sin(t * 6)).toFixed(1)}" fill="url(#vioGl)"/>` + ptc(tx + jx, 590 + jy, 9, 'pVio', '', 1) + antiTw(tx, 590, 50, 50, 6, t, .8, 3);
  s += `<rect x="${tx - 62}" y="${top + 16}" width="124" height="${bot - top - 42}" fill="url(#glassT)"/>`;
  for (const yc of [470, 520, 660, 710]) s += `<rect x="${tx - 78}" y="${yc - 14}" width="156" height="28" rx="8" fill="url(#copC)"/>` + Array.from({ length: 12 }, (_, q) => `<path d="M${tx - 74 + q * 13},${yc - 14} l0,28" stroke="#3a1a08" stroke-width="1.2" opacity=".5"/>`).join('');
  s += `<path d="M${tx + 30},${590} L${tx + 130},${560}" stroke="#f4c76b" stroke-width="2"/>` + lbl(tx + 196, 568, 'غرامٌ واحد', 1, '#f4c76b', 26) + lbl(tx + 196, 604, 'في فخٍّ مغناطيسيّ', ease(ramp(t, S0(4) + .4, S0(4) + 1)), '#cfd8ff', 20);
  // the three mushroom clouds, one by one
  const pn = ease(ramp(t, WS(4, 5) - .2, WS(4, 6)));
  if (pn > 0) { s += `<defs><clipPath id="mcC"><rect x="40" y="860" width="640" height="380" rx="22"/></clipPath></defs><g opacity="${pn.toFixed(2)}"><g clip-path="url(#mcC)"><rect x="40" y="860" width="640" height="380" fill="url(#desG)"/>` +
      mountainsR(1150, 50, 23, {}) + `<rect x="40" y="1150" width="640" height="90" fill="#c89a62"/><rect x="40" y="1150" width="640" height="90" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
    [[160, WS(4, 7)], [360, WS(4, 8)], [560, WS(4, 9) - .1]].forEach(([x, t0]) => { const k = ease(clamp((t - t0) / 1.6)), f = clamp((t - t0) / .25); if (f <= 0) return;
      s += `<g transform="translate(${x},1160) scale(.5) translate(${-x},-1160)">` + mushroom(x, 1160, Math.max(.05, k), t) + `</g><circle cx="${x}" cy="${(1150 - 170 * k).toFixed(1)}" r="${(60 * (1 - k * .8)).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - k).toFixed(2)}"/>`; });
    s += `</g><rect x="40" y="860" width="640" height="380" rx="22" fill="none" stroke="#f4c76b" stroke-width="3" opacity=".7"/>` + tag(360, 905, 'قنبلةُ هيروشيما × ٣', '#fff', '#0a0e1c', 22) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 5: your whole body: about 3,000 megatons, seen from space; then the bars
function sceneBody(t) {
  const g = glB(t, { d: 10.6, lights: .55, az: .1 }), c0 = g.c0, R = g.R, fx = c0[0] - .28 * R, fy = c0[1] - .22 * R, tb = WS(5, 4) - .05;
  const I = t < tb ? 0 : ease(clamp((t - tb) / .2)) * (1 - .55 * ease(clamp((t - tb - .3) / 3.5))), p = clamp((t - tb) / 3.4);
  let o = `<defs>${AMDEF}${SDEF}</defs>`;
  if (I > 0) o += scr(`<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(34 + 110 * I).toFixed(1)}" fill="url(#flashG)" opacity="${I.toFixed(2)}"/>`) + `<circle cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" r="${(3 + 5 * I).toFixed(1)}" fill="#fff" opacity="${I.toFixed(2)}"/>`;
  if (p > 0 && p < 1) o += `<ellipse cx="${fx.toFixed(1)}" cy="${fy.toFixed(1)}" rx="${(10 + .3 * R * p).toFixed(1)}" ry="${(8 + .24 * R * p).toFixed(1)}" fill="none" stroke="#fff4dc" stroke-width="${(5 * (1 - p) + 1).toFixed(1)}" opacity="${(.7 * (1 - p)).toFixed(2)}"/>`;
  const bk = ease(ramp(t, WS(5, 9) - .3, WS(5, 9) + .5)), gr = ease(ramp(t, WS(5, 9), WS(5, 15)));
  if (bk > 0) { o += `<g opacity="${bk.toFixed(2)}">` + panel(50, 920, 620, 290);
    const rows = [['هيروشيما', '١٥ كيلوطن', 2, '#ffb89a'], ['أقوى قنبلةٍ نوويّة', '٥٠ ميغاطن', 9.3, '#ff7a5a'], ['جسمُك', 'نحو ٣٬٠٠٠ ميغاطن', 560, VIO]];
    rows.forEach(([a, b, w, c], i) => { const y = 980 + i * 82; o += lbl(520, y, a, 1, '#fff', 25) + lbl(170, y, b, 1, c, 25) + `<rect x="80" y="${y + 14}" width="560" height="20" rx="5" fill="#fff" opacity=".08"/><rect x="${(640 - w * (i === 2 ? gr : 1)).toFixed(1)}" y="${y + 14}" width="${Math.max(2, w * (i === 2 ? gr : 1)).toFixed(1)}" height="20" rx="4" fill="${c}"/>`; });
    o += `</g>`; }
  F.flash = t > tb ? .35 * Math.exp(-(t - tb) * 6) : 0;
  F.ov = o; return space(t);
}

// 6: why don't we see it? the Big Bang made both, almost equally
const BB = (() => { const r = RS(77), o = []; for (let i = 0; i < 180; i++) o.push({ a: r() * 6.283, v: .35 + r() * .65, ty: i % 2, ph: r() * 6.28, z: r(), surv: i % 2 === 0 && i % 36 === 0, ta: r() }); return o; })();
const BBC = [360, 700];
function bbPos(p, u, t) { const R = 40 + 420 * (1 - Math.exp(-u * 1.1)) * p.v, w = .25 * u; return [BBC[0] + Math.cos(p.a + w) * R + Math.sin(t * .7 + p.ph) * 6, BBC[1] + Math.sin(p.a + w) * R * .9 + Math.cos(t * .6 + p.ph) * 6]; }
function particlesBB(t, kill) {
  const tb = WS(6, 4) - .1, u = Math.max(0, t - tb); let s = '';
  BB.forEach((p, i) => { if (u <= 0) return; let [x, y] = bbPos(p, u, t), a = clamp(u * 2);
    if (kill && !p.surv) { const tk = WS(7, 1) + p.ta * (WS(7, 11) - WS(7, 1)), q = clamp((t - tk) / .5); if (q >= 1) { const f = clamp((t - tk - .5) / .5); if (f < 1) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(6 + 22 * f).toFixed(1)}" fill="url(#flashG)" opacity="${(1 - f).toFixed(2)}"/>`; return; }
      const j = i % 2 ? i - 1 : i + 1, [x2, y2] = bbPos(BB[Math.min(j, BB.length - 1)], u, t); x = lerp(x, (x + x2) / 2, ease(q)); y = lerp(y, (y + y2) / 2, ease(q)); }
    if (kill && p.surv) { const m = ease(ramp(t, WS(7, 11), WS(7, 14))); x = lerp(x, BBC[0] + Math.cos(p.a) * 150, m); y = lerp(y, BBC[1] + Math.sin(p.a) * 60, m); a *= 1 - .8 * ease(ramp(t, WS(7, 13), WS(7, 14) + .4)); }
    s += ptc(x, y, 4 + 3 * p.z, p.ty ? 'pVio' : 'pGold', '', a, p.surv && kill ? '#ffd27a' : ''); });
  return s;
}
function sceneBang(t) {
  const tb = WS(6, 4) - .1, fl = t > tb ? Math.exp(-(t - tb) * 2.2) : 0, q = 1 - ease(ramp(t, tb - .4, tb));
  let o = `<defs>${AMDEF}${SDEF}</defs>`;
  if (q > 0) o += `<g opacity="${q.toFixed(2)}">` + galaxy(360, 720, 300, .9, t, 5, .42, -.3) + tag(360, 1060, 'أينَ المادّةُ المضادّة؟', '#efe6ff', '#2a1a4a', 30) + `</g>`;
  if (fl > .01) o += scr(`<circle cx="${BBC[0]}" cy="${BBC[1]}" r="${(60 + 260 * (1 - fl)).toFixed(1)}" fill="url(#flashG)" opacity="${fl.toFixed(2)}"/>`);
  o += particlesBB(t, false);
  const eq = ease(ramp(t, WS(6, 8) - .1, WS(6, 9)));
  if (eq > 0) o += `<g opacity="${eq.toFixed(2)}">` + panel(70, 1080, 580, 130) + lbl(520, 1158, 'مادّة', 1, '#ffd27a', 34) + lbl(360, 1160, '=', 1, '#fff', 40) + lbl(200, 1158, 'مادّة مضادّة', 1, '#d6bcff', 34) + `</g>`;
  F.flash = t > tb ? .4 * Math.exp(-(t - tb) * 5) : 0;
  noEarth(); F.ov = o; return space(t);
}
// 7: for every billion antiparticles, a billion and one particles; the extra one made everything
function sceneBillion(t) {
  let o = `<defs>${AMDEF}${SDEF}</defs>`;
  const gx = ease(ramp(t, WS(7, 12) - .2, WS(7, 14) + .2));
  o += galaxy(360, 700, 290, gx, t, 7, .4, .4);
  o += particlesBB(t, true);
  const cp = ease(ramp(t, WS(7, 2) - .2, WS(7, 3))) * (1 - ease(ramp(t, WS(7, 12) - .1, WS(7, 13))));
  if (cp > 0) { o += `<g opacity="${cp.toFixed(2)}">` + panel(70, 1020, 580, 190) + lbl(560, 1090, 'مضادّة', 1, '#d6bcff', 28) + lbl(270, 1092, '١٬٠٠٠٬٠٠٠٬٠٠٠', 1, '#efe6ff', 36) + lbl(560, 1170, 'مادّة', 1, '#ffd27a', 28);
    const one = ease(ramp(t, WS(7, 7) - .1, WS(7, 8) + .2));
    o += `<text x="270" y="1172" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="36" fill="#ffd27a" style="direction:ltr">١٬٠٠٠٬٠٠٠٬٠٠<tspan fill="${one > .5 ? '#ffffff' : '#ffd27a'}" font-size="${(36 + 16 * one).toFixed(0)}">١</tspan></text>`;
    if (one > 0) o += `<circle cx="${(270 + 112 + 4 * one).toFixed(1)}" cy="1158" r="${(26 + 4 * Math.sin(t * 6)).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${one.toFixed(2)}"/>`;
    o += `</g>`; }
  noEarth(); F.ov = o; return space(t);
}

// 8: CERN made it; all of it would light one bulb for a few minutes
function sceneCern(t) {
  const sw = ease(ramp(t, WS(8, 5) - .3, WS(8, 5) + .2)), T = t - S0(8);
  let s = `<defs>${ADEFS()}<linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a7ab8"/><stop offset=".7" stop-color="#a8c4e0"/><stop offset="1" stop-color="#e8e4d4"/></linearGradient></defs>`;
  if (sw < 1) { let g = `<rect x="-20" y="-20" width="760" height="700" fill="url(#skC)"/>` + cumulus(200 + T * 3, 470, 200, 21, { a: .85 }) + cumulus(560 + T * 2, 420, 150, 22, { a: .75 }) +
      mountainsR(640, 210, 31, { snowAt: .55 }) + mountainsR(668, 110, 33, { rock: '#6a7a6a' }) + `<rect x="-20" y="650" width="760" height="30" fill="#c8d4dc" opacity=".55" filter="url(#blur9)"/>`;
    g += meadow(660, 1300, t, { c0: '#8a9a5a', c1: '#5a6a3a' });
    // fields, roads and villages seen from above at a slant
    const r = RS(91);
    for (let row = 0; row < 9; row++) { const y = 672 + Math.pow(row / 9, 1.5) * 620, h = 16 + row * 9; for (let x = -20; x < 740;) { const w = 50 + r() * 120 + row * 14; g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${['#9aa860', '#7a8a48', '#b0a868', '#6a7a40', '#a89a5a'][Math.floor(r() * 5)]}" opacity=".55"/>`; x += w + 2; } }
    g += `<path d="M-20,${720} C200,760 300,820 740,800" stroke="#d8d0c0" stroke-width="5" fill="none" opacity=".8"/><path d="M120,1300 C200,1050 260,900 380,690" stroke="#d8d0c0" stroke-width="7" fill="none" opacity=".8"/>`;
    g += `<path d="M-20,700 C40,690 120,700 170,730 C130,770 40,780 -20,770Z" fill="#4a7aa8"/><path d="M-20,700 C40,690 120,700 170,730" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`;
    for (let i = 0; i < 46; i++) { const x = r() * 720, y = 700 + r() * 520, z = .5 + (y - 700) / 520; g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(10 * z).toFixed(1)}" height="${(7 * z).toFixed(1)}" fill="#e8dcc8"/><path d="M${x.toFixed(1)},${y.toFixed(1)} l${(5 * z).toFixed(1)},${(-4 * z).toFixed(1)} l${(5 * z).toFixed(1)},${(4 * z).toFixed(1)}Z" fill="#a8483a"/>`; }
    // the 27 km ring, with a bright bunch running round it
    const cx = 390, cy = 930, rx = 270, ry = 112, ph = T * 2.4;
    g += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#f4c76b" stroke-width="12" opacity=".25" filter="url(#blur2)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#f4c76b" stroke-width="3.5" stroke-dasharray="14 8" opacity=".9"/>`;
    g += `<ellipse cx="200" cy="860" rx="62" ry="26" fill="none" stroke="#f4c76b" stroke-width="2.5" opacity=".7"/>`;
    for (let k = 0; k < 10; k++) { const a = ph - k * .06; g += `<circle cx="${(cx + Math.cos(a) * rx).toFixed(1)}" cy="${(cy + Math.sin(a) * ry).toFixed(1)}" r="${(5 - k * .4).toFixed(1)}" fill="#fff" opacity="${(1 - k / 10).toFixed(2)}"/>`; }
    g += tag(cx, cy - ry - 26, 'مسرّعُ سيرن: ٢٧ كم', '#fff', '#0a0e1c', 20);
    s += `<g opacity="${(1 - sw).toFixed(2)}">${g}</g>`; }
  if (sw > 0) { const on = ease(ramp(t, WS(8, 11) - .3, WS(8, 11) + .2)), off = ease(ramp(t, WS(8, 14) + .3, S0(9) + .2)), L = on * (1 - off) * (.92 + .08 * Math.sin(t * 40) * Math.sin(t * 13));
    let b = studio('stB', mix('#1a1c28', '#4a3a28', L), '#040406', 43);
    b += `<circle cx="360" cy="640" r="${(300 + 30 * L).toFixed(1)}" fill="url(#warmG)" opacity="${(L * .95).toFixed(2)}"/>`;
    b += `<path d="M300,860 C300,800 230,770 230,650 A130,130 0 1 1 490,650 C490,770 420,800 420,860Z" fill="url(#bulbG)" stroke="#cfdcea" stroke-width="2.5" stroke-opacity=".55"/>`;
    b += `<path d="M268,610 A96,96 0 0 1 330,540" stroke="#fff" stroke-width="7" fill="none" opacity=".35" stroke-linecap="round"/>`;
    b += `<path d="M340,860 L344,690 M380,860 L376,690" stroke="#8a8a8a" stroke-width="2"/><path d="M344,690 l6,-10 l6,10 l6,-10 l6,10 l6,-10 l6,10 l6,-10" stroke="${L > .1 ? '#fff4d0' : '#6a5a4a'}" stroke-width="${(2.5 + 2 * L).toFixed(1)}" fill="none"/>`;
    if (L > .05) b += `<ellipse cx="362" cy="684" rx="40" ry="18" fill="#fff8e0" opacity="${(L * .8).toFixed(2)}" filter="url(#blur9)"/>`;
    b += `<rect x="296" y="860" width="128" height="78" rx="8" fill="url(#steelC)"/>` + [0, 1, 2, 3].map(i => `<path d="M298,${872 + i * 17} L422,${866 + i * 17}" stroke="#2a2e34" stroke-width="3" opacity=".5"/>`).join('') + `<path d="M330,938 L390,938 L372,968 L348,968Z" fill="#2a2a2e"/>`;
    // the minutes timer
    const tm = ease(ramp(t, WS(8, 11), WS(8, 14) + .3)), A = tm * 6.283 - 1.5708;
    b += `<g opacity="${on.toFixed(2)}"><circle cx="360" cy="1100" r="54" fill="#0a0e1c" opacity=".85"/><circle cx="360" cy="1100" r="44" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="8"/>` + (tm > 0 ? `<path d="M360,1056 A44,44 0 ${tm > .5 ? 1 : 0} 1 ${(360 + Math.cos(A) * 44).toFixed(1)},${(1100 + Math.sin(A) * 44).toFixed(1)}" stroke="#f4c76b" stroke-width="8" fill="none" stroke-linecap="round"/>` : '') + lbl(360, 1112, 'دقائق', 1, '#fff', 20) + `</g>`;
    s += `<g opacity="${sw.toFixed(2)}">${b}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 9: the twist: your body makes antimatter right now (potassium-40)
function sceneInside(t) {
  const T = t - S0(9), y0 = 1190;
  let s = `<defs>${ADEFS()}</defs>` + studio('stI', '#3a3048', '#0a0810', 47);
  s += `<ellipse cx="330" cy="${y0 + 4}" rx="190" ry="26" fill="#000" opacity=".4" filter="url(#blur9)"/>`;
  s += hero(320, y0, Object.assign({ s: 1.5, face: 1, shade: 1, hF: [420, y0 - 300], lookUp: -.05 }, palS(1)));
  const Hd = Object.assign({}, HP);
  // a banana in the hand (potassium)
  const bx = Hd.hand[0] + 4, by = Hd.hand[1] - 6;
  s += `<g transform="translate(${bx.toFixed(1)},${by.toFixed(1)}) rotate(-28)"><path d="M-6,0 C0,-50 30,-86 70,-96 C46,-74 26,-40 20,4 Z" fill="#f0c83a"/><path d="M-6,0 C0,-50 30,-86 70,-96 C56,-82 40,-62 30,-36" stroke="#a8841a" stroke-width="2.5" fill="none" opacity=".6"/><path d="M6,-6 C12,-40 34,-70 62,-90" stroke="#fff6b0" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/><path d="M66,-98 l8,-4 l-2,8Z" fill="#4a3a1a"/><path d="M-8,0 l26,4 l-2,10 l-22,-4Z" fill="#7a6a2a"/></g>`;
  s += `<circle cx="${Hd.hand[0]}" cy="${Hd.hand[1]}" r="11" fill="#c08a66"/>`;
  // positron events inside the body: a tiny violet flash and two gamma ticks in opposite directions
  const ev = ease(ramp(t, WS(9, 1) - .2, WS(9, 2)));
  if (ev > 0) for (let i = 0; i < 9; i++) { const r = RS(900 + i), per = 1.6 + r() * 1.4, p = pmod(T / per + r(), 1), cyc = Math.floor(T / per + r()), q = RS(cyc * 31 + i * 7), x = 300 + (q() - .5) * 70, y = y0 - 60 - q() * 330, ang = q() * 6.28;
    if (p < .3) { const f = 1 - p / .3, L = 18 + 60 * (1 - f); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + 18 * f).toFixed(1)}" fill="url(#flashG)" opacity="${(ev * f).toFixed(2)}"/><path d="M${(x + Math.cos(ang) * 8).toFixed(1)},${(y + Math.sin(ang) * 8).toFixed(1)} L${(x + Math.cos(ang) * L).toFixed(1)},${(y + Math.sin(ang) * L).toFixed(1)} M${(x - Math.cos(ang) * 8).toFixed(1)},${(y - Math.sin(ang) * 8).toFixed(1)} L${(x - Math.cos(ang) * L).toFixed(1)},${(y - Math.sin(ang) * L).toFixed(1)}" stroke="#efe6ff" stroke-width="2" opacity="${(ev * f).toFixed(2)}"/>`; } }
  // the count
  const cn = ease(ramp(t, WS(9, 6) - .2, WS(9, 8)));
  if (cn > 0) s += `<g opacity="${cn.toFixed(2)}">` + panel(420, 1060, 270, 160) + lbl(555, 1128, `+${AR(Math.round(100 * cn))}`, 1, '#d6bcff', 54) + lbl(555, 1186, 'بوزيترون كلَّ ساعة', 1, '#fff', 24) + `</g>`;
  // potassium-40 tile
  const kt = ease(ramp(t, WS(9, 13) - .3, WS(9, 13) + .3));
  if (kt > 0) s += `<g opacity="${kt.toFixed(2)}" transform="translate(545,560)"><rect x="-92" y="-92" width="184" height="184" rx="18" fill="#1a2238" stroke="#f4c76b" stroke-width="3"/><text x="-70" y="-58" font-family="Inter" font-weight="700" font-size="24" fill="#cfd8ff" style="direction:ltr">19</text>` +
    `<text x="0" y="34" text-anchor="middle" font-family="Inter" font-weight="700" font-size="96" fill="#fff" style="direction:ltr">K</text><text x="44" y="-30" font-family="Inter" font-weight="700" font-size="26" fill="#f4c76b" style="direction:ltr">40</text>` + lbl(0, 76, 'بوتاسيوم', 1, '#f4c76b', 22) + `</g>`;
  noEarth(); F.ov = ''; return s;
}

function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(10)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(10)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8) - .3, WS(10, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneAtoms }, { s: S0(2) - .2, f: sceneAnnihilate }, { s: S0(3) - .2, f: sceneAir }, { s: S0(4) - .2, f: sceneGram }, { s: S0(5) - .2, f: sceneBody }, { s: S0(6) - .2, f: sceneBang }, { s: S0(7) - .2, f: sceneBillion }, { s: S0(8) - .2, f: sceneCern }, { s: S0(9) - .2, f: sceneInside }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneAtoms, sceneAnnihilate, sceneBody, sceneBang, sceneBillion]);
const XF = .5;
const TLI = [['الذرّة', S0(1)], ['الفناء', S0(2)], ['غرامٌ واحد', S0(4)], ['جسمُك كلُّه', S0(5)]];
const LIST_ON = new Set([sceneGram]);
const CHIPS = [
  ['c0', 'لا تلمسْه!', 360, 1205, 'red big', WS(0, 6), S0(1) - .3],
  ['c1', 'نسخةٌ معكوسة', 360, 330, 'big', WS(1, 2), S0(2) - .3],
  ['c2', 'يفنى الاثنان', 360, 330, 'red big', WS(2, 4), WS(2, 7) - .2], ['c2b', 'كلُّ الكتلة ← طاقة', 360, 330, 'big', WS(2, 7), S0(3) - .3],
  ['c3', 'الهواءُ يفنى على جلدك', 360, 330, 'big', WS(3, 2), WS(3, 7) - .2], ['c3b', 'أشعّةُ غاما قاتلة', 360, 330, 'red big', WS(3, 7), S0(4) - .3],
  ['c4', '١ غرام ≈ ٤٣ كيلوطن', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c5', 'نحو ٣٬٠٠٠ ميغاطن', 360, 330, 'red big', WS(5, 6), WS(5, 9) - .2], ['c5b', '٦٠ ضعفَ أقوى قنبلة', 360, 330, 'red big', WS(5, 9), S0(6) - .3],
  ['c6', 'الانفجارُ العظيم', 360, 330, 'big', WS(6, 4), WS(6, 9) - .2], ['c6b', 'بالتساوي تقريباً', 360, 330, 'big', WS(6, 9), S0(7) - .3],
  ['c7', 'جسيمٌ زائدٌ واحد', 360, 330, 'big', WS(7, 7), WS(7, 12) - .2], ['c7b', 'ومنه: النجومُ… ونحن', 360, 330, 'big', WS(7, 12), S0(8) - .3],
  ['c8', 'صنعوها فعلاً', 360, 330, 'big', WS(8, 0) + .2, WS(8, 6) - .2], ['c8b', 'تكفي مصباحاً لدقائق', 360, 330, 'big', WS(8, 11), S0(9) - .3],
  ['c9', 'داخلَ جسمِك الآن', 360, 330, 'big', WS(9, 1), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">المادّة المضادّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
