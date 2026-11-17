// ===================== "what if the Earth turned into a sun?" (Short #51) =====================
// gl3d_es.js = gl3d_ex.js (#48) + disc.star (0 → glowing lava cracks → 1 red-dwarf photosphere), disc.glow/gs/gc (a glow sprite around the globe),
// w.cloud (a swirling hydrogen cloud of soft points that collapses onto the planet: a, k, R, tilt), sun.rd (red-dwarf colours), moon.jup (Jupiter), moon.hot.
const STDEF = `<radialGradient id="pG" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#ffd0c0"/><stop offset=".45" stop-color="#e8443a"/><stop offset="1" stop-color="#6a0e0c"/></radialGradient>` +
  `<radialGradient id="nG" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#9aa6b8"/><stop offset="1" stop-color="#2e3644"/></radialGradient>` +
  `<radialGradient id="fusF"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".3" stop-color="#fff2b0" stop-opacity=".8"/><stop offset=".7" stop-color="#ffb040" stop-opacity=".25"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="redGl"><stop offset="0" stop-color="#ffd2a0" stop-opacity="1"/><stop offset=".18" stop-color="#ff7a3a" stop-opacity=".75"/><stop offset=".45" stop-color="#e8401c" stop-opacity=".25"/><stop offset="1" stop-color="#a0200c" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="sphSh" cx=".38" cy=".34" r=".72"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity=".82"/></radialGradient>` +
  `<filter id="cellF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".045" numOctaves="3" seed="12"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.5 0 0 0 1.0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="flowF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="4" seed="31"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.6 0 0 0 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="rockF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.3 0 0 0 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const STDEFS = () => `${XDEFS()}${STDEF}`;
const EICO = ['tex/earth_ico.png', 'tex/earth_ico2.png', 'tex/earth_ico3.png'];

// ---------- a quarter cut into a sphere drawn on screen at (x, y, R): concentric layers inside a wedge ----------
function sectP(x, y, R, a0, a1) { const p = a => [x + R * Math.cos(a), y + R * Math.sin(a)], [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${x.toFixed(1)},${y.toFixed(1)} L${x0.toFixed(1)},${y0.toFixed(1)} A${R.toFixed(1)},${R.toFixed(1)} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)} Z`; }
// stops: [[frac, colour], ...] from the centre out; tex: [[r0, r1, filterId, opacity], ...]
function cutaway(id, x, y, R, a0, a1, stops, tex, t, glow) {
  if (a1 - a0 < .01) return '';
  let s = `<defs><radialGradient id="cg${id}" gradientUnits="userSpaceOnUse" cx="${x}" cy="${y}" r="${R}">${stops.map(([f, c]) => `<stop offset="${f}" stop-color="${c}"/>`).join('')}</radialGradient>` +
    `<clipPath id="cc${id}"><path d="${sectP(x, y, R, a0, a1)}"/></clipPath></defs>`;
  s += `<g clip-path="url(#cc${id})"><circle cx="${x}" cy="${y}" r="${R}" fill="url(#cg${id})"/>`;
  tex.forEach(([r0, r1, f, o], i) => { s += `<defs><mask id="cm${id}${i}"><circle cx="${x}" cy="${y}" r="${(r1 * R).toFixed(1)}" fill="#fff"/><circle cx="${x}" cy="${y}" r="${(r0 * R).toFixed(1)}" fill="#000"/></mask></defs>` +
    `<g mask="url(#cm${id}${i})"><rect x="${(x - R).toFixed(1)}" y="${(y - R).toFixed(1)}" width="${(2 * R).toFixed(1)}" height="${(2 * R).toFixed(1)}" fill="#000" filter="url(#${f})" opacity="${o}" transform="rotate(${(t * 3 * (i % 2 ? -1 : 1)).toFixed(1)},${x},${y})"/></g>`; });
  if (glow) s += `<circle cx="${x}" cy="${y}" r="${(glow[0] * R * 1.6).toFixed(1)}" fill="url(#fusF)" opacity="${glow[1].toFixed(2)}"/>`;
  // the two cut faces: a soft shadow along each straight edge gives the wedge some depth
  const e = a => `<path d="M${x},${y} L${(x + R * Math.cos(a)).toFixed(1)},${(y + R * Math.sin(a)).toFixed(1)}" stroke="#000" stroke-width="16" opacity=".35" filter="url(#blur5)"/>`;
  s += e(a0) + e(a1) + `</g>`;
  s += `<path d="${sectP(x, y, R, a0, a1)}" fill="none" stroke="#fff4d8" stroke-width="1.6" opacity=".55"/>`;
  return s;
}
// a leader line + label
const tag = (x0, y0, x1, y1, tx, a, col = '#fff', fs = 26) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="2.4"/><circle cx="${x0.toFixed(1)}" cy="${y0.toFixed(1)}" r="5" fill="${col}"/>${lbl(x1, y1 + (y1 < y0 ? -10 : 30), tx, 1, col, fs)}</g>`;
// a proton (p) or neutron (n)
const nuc = (x, y, r, k) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="url(#${k}G)"/>` + (k === 'p' ? `<text x="${x.toFixed(1)}" y="${(y + r * .38).toFixed(1)}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="${(r * 1.05).toFixed(0)}" fill="#fff" opacity=".85">+</text>` : '');
const fit3 = (cam, p, r) => { const [x, y] = proj3(cam, p), d = Math.hypot(cam.pos[0] - p[0], cam.pos[1] - p[1], cam.pos[2] - p[2]); return [x, y, r * fpx(cam) / Math.sqrt(d * d - r * r)]; };

// ---------- 0: the Earth cracks, glows and turns into a red star ----------
function sceneHook(t) {
  const te = S0(1) - .2, k = ease(ramp(t, 0, WS(0, 5) + .5));
  const G = gW(t, { d: lerp(5.6, 8.4, ease(ramp(t, 0, te + .5))), el: .14, az: .3, lon: 25 - t * 5, clouds: .4 * (1 - ease(ramp(t, 0, 1.2))), lights: .3, off: -.6, tg: [0, .02, 0] });
  Object.assign(F.w.disc, { star: lerp(.1, .97, k), glow: .95 * ease(ramp(t, .4, te)), gs: lerp(3.5, 6.5, k), gc: [1, .4, .17] });
  F.ov = ''; return space(t);
}

// ---------- 1: the Sun shines because its core fuses hydrogen at 15 million degrees ----------
function sceneSunCore(t) {
  const t0 = S0(1) - .2, T = t - t0, cam = orbit(8.6 - T * .08, 0, 0, [0, 0, 0], 30), sp = [0, .7, 0], sr = 1;
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: sp, r: sr, a: 1, hue: 0, g: 5.2, ts: 1.5 } }; F.earth = F.moon = F.sun = null;
  const [x, y, R] = fit3(cam, sp, sr), op = ease(ramp(t, WS(1, 3) - .2, WS(1, 4) + .3));
  let o = `<defs>${STDEFS()}</defs>`;
  o += cutaway('s', x, y, R * .995, -.35, -.35 + op * 1.75, [[0, '#ffffff'], [.12, '#fff6cc'], [.24, '#ffd66a'], [.26, '#ffb444'], [.5, '#f6962e'], [.69, '#ec7a22'], [.71, '#e0581a'], [.9, '#d4461a'], [1, '#ff8a3a']],
    [[.7, 1, 'cellF', .32], [.25, .7, 'flowF', .16]], t, [.25, .55 + .25 * Math.sin(t * 6)]);
  const la = ease(ramp(t, WS(1, 3) + .2, WS(1, 4) + .5));
  o += tag(x + R * .12, y + R * .06, x + R * .2 + 40, y + R + 40, 'القلب', la, '#fff2c0', 28);
  // fusion inset: four hydrogen nuclei (right) → one helium nucleus (left) + energy
  const ia = ease(ramp(t, WS(1, 5) - .3, WS(1, 5) + .2));
  if (ia > 0) {
    const cy = 1040, cx = 360, ph = ((t - WS(1, 5) + .3) % 2.5) / 2.5, inn = ease(clamp(ph / .42)), fl = ph > .4 && ph < .62 ? Math.sin((ph - .4) / .22 * Math.PI) : 0, out = ease(clamp((ph - .5) / .5));
    o += `<g opacity="${ia.toFixed(2)}">` + panel(70, 900, 580, 260, 1) + `<clipPath id="fusC"><rect x="70" y="900" width="580" height="260" rx="18"/></clipPath><g clip-path="url(#fusC)">`;
    if (ph < .48) [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([a, b], i) => { const d = lerp(1, .08, inn); o += nuc(cx + 110 + 150 * d + a * 22 * d, cy - 10 + b * 62 * d + a * 10, 24, 'p'); });
    if (ph > .45) { const hx = lerp(cx, 175, out); [[-13, -13, 'p'], [13, 13, 'p'], [13, -13, 'n'], [-13, 13, 'n']].forEach(([a, b, k]) => { o += nuc(hx + a, cy - 10 + b, 21, k); });
      for (let i = 0; i < 6; i++) { const an = i * 1.047 + .3, r0 = 30 + out * 150; let d = ''; for (let k = 0; k <= 10; k++) { const rr = r0 + k * 5, w = Math.sin(k * 1.6 + t * 20) * 5; d += (k ? ' L' : 'M') + (cx + 40 + Math.cos(an) * rr - Math.sin(an) * w).toFixed(1) + ',' + (cy + Math.sin(an) * rr + Math.cos(an) * w).toFixed(1); }
        o += `<path d="${d}" stroke="#ffd86a" stroke-width="3" fill="none" opacity="${(.9 * (1 - out)).toFixed(2)}"/>`; } }
    if (fl > 0) o += `<circle cx="${cx + 120}" cy="${cy}" r="${(40 + 90 * fl).toFixed(1)}" fill="url(#fusF)" opacity="${fl.toFixed(2)}"/>`;
    o += `</g>` + lbl(530, 1138, 'هيدروجين', 1, '#ff9a8a', 26) + lbl(185, 1138, 'هيليوم', 1, '#c8d4e8', 26) + lbl(360, 1138, '+ طاقة', 1, '#ffd86a', 26) + `</g>`;
  }
  F.ov = o; return space(t);
}

// ---------- 2: the Earth's core is only about 6,000 degrees ----------
function sceneEarthCore(t) {
  const t0 = S0(2) - .2, T = t - t0, az = .3;
  const G = gW(t, { d: 9.6 - T * .1, el: .12, az, lon: 20 - T * 2, clouds: .4, lights: .3, off: -.75, tg: [0, -.25, 0] });
  const x = G.c0[0], y = G.c0[1], R = G.R, op = ease(ramp(t, WS(2, 0), WS(2, 2) + .2));
  let o = `<defs>${STDEFS()}</defs>`;
  o += cutaway('e', x, y, R * .998, -.3, -.3 + op * 1.65, [[0, '#fffbe6'], [.12, '#fff0b0'], [.19, '#ffd66a'], [.2, '#ffb236'], [.4, '#f58a24'], [.54, '#e66a1c'], [.555, '#b8400f'], [.75, '#a0300e'], [.965, '#6e2412'], [.97, '#5a4636'], [1, '#76604a']],
    [[.555, .97, 'flowF', .3], [.2, .54, 'cellF', .18], [.97, 1, 'rockF', .4]], t, [.19, .35 + .1 * Math.sin(t * 4)]);
  const la = ease(ramp(t, WS(2, 1), WS(2, 2) + .3));
  o += tag(x + R * .1, y + R * .05, x + R * .2 + 40, y + R + 46, 'القلب', la, '#fff2c0', 28);
  // temperature comparison
  const ta = ease(ramp(t, WS(2, 4) - .2, WS(2, 5) + .2)), w = ease(ramp(t, WS(2, 5), WS(2, 7)));
  if (ta > 0) o += `<g opacity="${ta.toFixed(2)}">` + panel(60, 960, 600, 230, 1) +
    lbl(640, 1006, 'قلبُ الشمس', 1, '#ffd86a', 26, 'start') + lbl(80, 1006, '١٥ مليون °م', 1, '#ffd86a', 26, 'end') +
    `<rect x="80" y="1020" width="560" height="26" rx="13" fill="#ffd86a"/><rect x="80" y="1020" width="560" height="10" rx="5" fill="#fff" opacity=".35"/>` +
    lbl(640, 1096, 'قلبُ الأرض', 1, '#ff9a5a', 26, 'start') + lbl(80, 1096, '٦٬٠٠٠ °م', 1, '#ff9a5a', 26, 'end') +
    `<rect x="${(640 - 4 * w).toFixed(1)}" y="1110" width="${(4 * w).toFixed(1)}" height="26" rx="2" fill="#ff7a3a"/><rect x="80" y="1110" width="560" height="26" rx="13" fill="none" stroke="#ff9a5a" stroke-width="1.5" stroke-dasharray="6 6" opacity=".45"/>` +
    lbl(360, 1176, 'أبردُ بنحوِ ٢٬٥٠٠ مرّة', ease(ramp(t, WS(2, 8) - .2, WS(2, 8) + .3)), '#fff', 26) + `</g>`;
  F.ov = o; return space(t);
}

// ---------- 3: it would need more than 25,000 times its mass: a ball made of Earths ----------
function sceneMass(t) {
  const t0 = S0(3) - .2, T = t - t0, g0 = WS(3, 3), g1 = WS(3, 13);
  const pull = ease(ramp(t, t0, g0 + .3)), d = lerp(9.6, 265, pull);
  const G = gW(t, { d, el: .12, az: .3, lon: 18 - T * 2, clouds: .4, lights: .3, off: -.75, tg: [0, lerp(-.25, 0, pull), 0] });
  const cx = G.c0[0], cy = G.c0[1], r0 = Math.max(G.R, 9);
  const gk = ease(ramp(t, g0, g1)), N = Math.pow(25600, gk), R = r0 * Math.cbrt(N);
  let o = `<defs>${STDEFS()}<pattern id="eP" patternUnits="userSpaceOnUse" width="${(r0 * 4).toFixed(2)}" height="${(r0 * 3.464).toFixed(2)}" x="${cx}" y="${cy}">` +
    [[0, 0, 0], [2, 0, 1], [1, 1.732, 2], [3, 1.732, 0]].map(([a, b, k]) => `<image href="${EICO[k]}" x="${(a * r0 - r0 * 1.04).toFixed(2)}" y="${(b * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/>` +
      (a === 0 ? `<image href="${EICO[k]}" x="${(4 * r0 - r0 * 1.04).toFixed(2)}" y="${(b * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/>` : '')).join('') +
    `<image href="${EICO[1]}" x="${(1 * r0 - r0 * 1.04).toFixed(2)}" y="${(-1.732 * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/><image href="${EICO[2]}" x="${(3 * r0 - r0 * 1.04).toFixed(2)}" y="${(-1.732 * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/>` +
    `<image href="${EICO[0]}" x="${(1 * r0 - r0 * 1.04).toFixed(2)}" y="${(3.464 * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/><image href="${EICO[1]}" x="${(3 * r0 - r0 * 1.04).toFixed(2)}" y="${(3.464 * r0 - r0 * 1.04).toFixed(2)}" width="${(r0 * 2.08).toFixed(2)}" height="${(r0 * 2.08).toFixed(2)}"/></pattern>` +
    `<clipPath id="ballC"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}"/></clipPath></defs>`;
  if (gk > 0) {
    const ba = ease(ramp(t, g0, g0 + .4));
    o += `<g opacity="${ba.toFixed(2)}"><g clip-path="url(#ballC)"><rect x="${(cx - R - 2).toFixed(1)}" y="${(cy - R - 2).toFixed(1)}" width="${(2 * R + 4).toFixed(1)}" height="${(2 * R + 4).toFixed(1)}" fill="#04060e"/>` +
      `<rect x="${(cx - R - 2).toFixed(1)}" y="${(cy - R - 2).toFixed(1)}" width="${(2 * R + 4).toFixed(1)}" height="${(2 * R + 4).toFixed(1)}" fill="url(#eP)"/></g>` +
      `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#sphSh)"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(R + 1.5).toFixed(1)}" fill="none" stroke="#7ab8ff" stroke-width="3" opacity=".35" filter="url(#blur2)"/></g>`;
    // Earths flying in from every side
    const rf = RS(33); for (let i = 0; i < 46; i++) { const an = rf() * 6.283, sp = .45 + .5 * rf(), ph = (T * sp + rf()) % 1, rr = lerp(R + 520, R, ease(ph)), a2 = an + (1 - ph) * .9;
      if (t > g1 + .3) continue; const x = cx + Math.cos(a2) * rr, y = cy + Math.sin(a2) * rr, rs = r0 * (1.4 - .4 * ph);
      o += `<image href="${EICO[i % 3]}" x="${(x - rs).toFixed(1)}" y="${(y - rs).toFixed(1)}" width="${(2 * rs).toFixed(1)}" height="${(2 * rs).toFixed(1)}" opacity="${(Math.min(1, ph * 4) * ba).toFixed(2)}"/>`; }
  }
  const ca = ease(ramp(t, g0 + .2, g0 + .6)), nn = Math.round(N / (N > 1000 ? 100 : 1)) * (N > 1000 ? 100 : 1);
  if (ca > 0) o += `<g opacity="${ca.toFixed(2)}">` + panel(170, 1060, 380, 120, 1) + lbl(360, 1100, 'الكتلةُ المطلوبة', 1, '#c8d4e8', 26) + `<text x="360" y="1160" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">× ${ARK(Math.min(25000, nn))}</text>` + `</g>`;
  F.ov = o; return space(t);
}

// ---------- 4: a star is mostly hydrogen; the Earth is iron and rock ----------
function sceneMix(t) {
  const t0 = S0(4) - .2, T = t - t0, az = .3;
  const rt = [Math.cos(az), 0, -Math.sin(az)];
  const G = gW(t, { d: 21 - T * .15, el: .04, az, lon: 10 - T * 2, clouds: .4, lights: .3, off: -.9, tg: [-1.05 * rt[0], -1.5, -1.05 * rt[2]] });
  const sp = [-2.2 * rt[0], 0, -2.2 * rt[2]];
  F.w.sun = { pos: sp, r: 1.05, a: 1, hue: 0, g: 3.4, ts: 1.5 }; F.w.L = [-rt[0], .15, -rt[2] + .25];
  const [sx, sy, sR] = fit3(G.cam, sp, 1.15), ex = G.c0[0], ey = G.c0[1];
  const a = ease(ramp(t, t0 + .3, t0 + .8)), b = ease(ramp(t, WS(4, 4) - .2, WS(4, 5)));
  const col = (x, segs, k, hdr, hc) => { let y = 1170, s = `<g>` + lbl(x + 110, 692, hdr, 1, hc, 30);
    segs.forEach(([p, c, tx, pc]) => { const h = 4.1 * p * k; y -= h; s += `<rect x="${x}" y="${y.toFixed(1)}" width="220" height="${Math.max(0, h - 2).toFixed(1)}" rx="6" fill="${c}"/><rect x="${x}" y="${y.toFixed(1)}" width="220" height="${Math.max(0, h - 2).toFixed(1)}" rx="6" fill="#000" filter="url(#rockF)" opacity=".18"/><rect x="${x}" y="${y.toFixed(1)}" width="220" height="${Math.min(8, Math.max(0, h - 2)).toFixed(1)}" rx="4" fill="#fff" opacity=".22"/>`;
      if (tx && h > 40) s += lbl(x + 110, y + h / 2 + 10, `${tx} ${pc}`, Math.min(1, (h - 40) / 20), '#fff', 24); }); return s + `</g>`; };
  let o = `<defs>${STDEFS()}</defs><g opacity="${a.toFixed(2)}">` + panel(50, 645, 620, 550, 1);
  o += col(90, [[74, '#d8505a', 'هيدروجين', '٧٤٪'], [25, '#e8b84a', 'هيليوم', '٢٥٪'], [1, '#8a8e96']], 1, 'الشمس', '#ffd86a');
  o += col(410, [[32, '#7a7f88', 'حديد', '٣٢٪'], [30, '#5a86b8', 'أكسجين', '٣٠٪'], [15, '#a88a62', 'سيليكون', '١٥٪'], [14, '#6a8a6a', 'مغنيسيوم', '١٤٪'], [9, '#4a4a52', 'أخرى', '٩٪']], b, 'الأرض', '#9fd0ff');
  const ha = ease(ramp(t, WS(4, 4), WS(4, 5) + .2));
  o += lbl(520, 735, 'هيدروجين: شبهُ معدوم', ha, '#ff8a7a', 22);
  o += `</g>`;
  F.ov = o; return space(t);
}
