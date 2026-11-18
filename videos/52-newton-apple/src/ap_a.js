
// =================== #52: what if the apple had not fallen on Newton's head? ===================
// ap_a.js: defs, Newton (the house person in 1660s clothes), the apple tree, the stone farmhouse, the English countryside; scenes 0-2
const APDEF = `<radialGradient id="apG" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="#ff8a6a"/><stop offset=".35" stop-color="#d8281c"/><stop offset=".8" stop-color="#8a1010"/><stop offset="1" stop-color="#5a0a0a"/></radialGradient>` +
  `<radialGradient id="apY" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="#f4e08a"/><stop offset=".4" stop-color="#c8a83a"/><stop offset="1" stop-color="#6a5a1a"/></radialGradient>` +
  `<linearGradient id="cSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e9ccc"/><stop offset=".55" stop-color="#a8c4dc"/><stop offset=".85" stop-color="#e8dcc0"/><stop offset="1" stop-color="#f4e2bc"/></linearGradient>` +
  `<linearGradient id="barkG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a6248"/><stop offset=".35" stop-color="#5a4432"/><stop offset="1" stop-color="#2a1e16"/></linearGradient>` +
  `<linearGradient id="stoneW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8c79e"/><stop offset="1" stop-color="#b09a72"/></linearGradient>` +
  `<linearGradient id="slateR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e5a52"/><stop offset="1" stop-color="#857e70"/></linearGradient>` +
  `<radialGradient id="candG"><stop offset="0" stop-color="#ffe8b0" stop-opacity=".9"/><stop offset=".25" stop-color="#ffb24a" stop-opacity=".35"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="comG"><stop offset="0" stop-color="#ffffff"/><stop offset=".2" stop-color="#e8f4ff" stop-opacity=".9"/><stop offset=".55" stop-color="#9ad0ff" stop-opacity=".25"/><stop offset="1" stop-color="#6ab0ff" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="paperG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f2e6c8"/><stop offset="1" stop-color="#d8c69a"/></linearGradient>` +
  `<filter id="paperF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .35 0 0 0 0 .25 0 0 0 0 .1 0 0 0 .5 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="barkF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".08 .012" numOctaves="3" seed="12"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.4 -.55"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="stoneF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05 .09" numOctaves="4" seed="21"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .24 0 0 0 0 .15 0 0 0 1.1 -.45"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const APDEF2 = `<filter id="leafD" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".11" numOctaves="2" seed="31"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -9 4.6"/><feComposite in2="SourceGraphic" operator="in"/></filter><filter id="leafL" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".13" numOctaves="2" seed="47"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 9 -5.6"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const APDEFS = () => `${STDEFS()}${CUDEF}${APDEF}${APDEF2}`;

// ---------- Newton: the house person with shoulder-length hair, a dark coat with long skirts, a white collar band ----------
function newton(x, y, o = {}) {
  const c = Object.assign({ top: '#3a2b26', pants: '#2c2420', skin: '#ecc6a2', hair: '#5e4028', shade: 1 }, o), s = o.s || 1, f = o.face || 1;
  const body = hero(x, y, c), H = Object.assign({}, HP), [hx, hy] = H.head, tl = -16 * (o.lookUp || 0) * Math.PI / 180;
  const P = (lx, ly) => { const qx = lx * Math.cos(tl) - ly * Math.sin(tl), qy = lx * Math.sin(tl) + ly * Math.cos(tl); return `${(hx + qx * f * s).toFixed(1)},${(hy + qy * s).toFixed(1)}`; };
  const hc = c.hair, hd = mix(hc, '#000000', .35), hl = mix(hc, '#d8b080', .35);
  // the long hair behind the head (drawn first, the head covers its front)
  let back = `<path d="M${P(-2, -26)} C${P(-26, -24)} ${P(-34, 0)} ${P(-30, 22)} C${P(-28, 40)} ${P(-30, 52)} ${P(-22, 60)} C${P(-14, 54)} ${P(-8, 44)} ${P(-6, 30)} C${P(-4, 14)} ${P(4, 0)} ${P(10, -6)}Z" fill="${hd}"/>` +
    `<path d="M${P(-24, -10)} C${P(-30, 10)} ${P(-26, 34)} ${P(-24, 52)}" stroke="${hl}" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".45"/>`;
  // the coat skirts below the waist (standing only)
  let skirt = '';
  if (!o.sit) { const [px, py] = H.hip, w = 26 * s, L = 60 * s; skirt += `<path d="M${(px - w).toFixed(1)},${(py - 8 * s).toFixed(1)} L${(px + w).toFixed(1)},${(py - 8 * s).toFixed(1)} L${(px + w * 1.25).toFixed(1)},${(py + L).toFixed(1)} Q${px.toFixed(1)},${(py + L + 6 * s).toFixed(1)} ${(px - w * 1.3).toFixed(1)},${(py + L).toFixed(1)}Z" fill="${mix(c.top, '#000000', .2)}"/><path d="M${(px + w * .1 * f).toFixed(1)},${(py - 4 * s).toFixed(1)} L${(px + w * .2 * f).toFixed(1)},${(py + L).toFixed(1)}" stroke="#000" stroke-width="${(1.5 * s).toFixed(1)}" opacity=".3"/>`; }
  // the front lock over the ear and the white collar band
  const front = `<path d="M${P(-8, -20)} C${P(-20, -14)} ${P(-22, 10)} ${P(-18, 30)} C${P(-14, 40)} ${P(-10, 40)} ${P(-8, 32)} C${P(-10, 16)} ${P(-6, 0)} ${P(0, -10)}Z" fill="${hc}"/><path d="M${P(-12, -6)} C${P(-16, 10)} ${P(-14, 24)} ${P(-12, 34)}" stroke="${hl}" stroke-width="${(1.6 * s).toFixed(1)}" fill="none" opacity=".5"/>` +
    `<path d="M${P(-2, 26)} L${P(14, 26)} L${P(16, 40)} L${P(6, 44)} L${P(0, 38)}Z" fill="#f4f0e6"/><path d="M${P(6, 30)} L${P(8, 44)}" stroke="#b8b0a0" stroke-width="${(1.2 * s).toFixed(1)}"/>`;
  HP = H; const k = body.lastIndexOf('<g transform="rotate('), b2 = skirt && k > 0 ? body.slice(0, k) + skirt + body.slice(k) : body;
  return back + b2 + front;
}

// ---------- an apple: shaded, with a highlight and a stem ----------
const appleS = (x, y, r, rot = 0, a = 1, y2 = 0) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><path d="M0,${(-r * .78).toFixed(1)} C${(r * .9).toFixed(1)},${(-r * 1.15).toFixed(1)} ${(r * 1.25).toFixed(1)},${(r * .2).toFixed(1)} ${(r * .45).toFixed(1)},${(r * .95).toFixed(1)} Q0,${(r * 1.1).toFixed(1)} ${(-r * .45).toFixed(1)},${(r * .95).toFixed(1)} C${(-r * 1.25).toFixed(1)},${(r * .2).toFixed(1)} ${(-r * .9).toFixed(1)},${(-r * 1.15).toFixed(1)} 0,${(-r * .78).toFixed(1)}Z" fill="url(#${y2 ? 'apY' : 'apG'})"/>` +
  `<ellipse cx="${(-r * .35).toFixed(1)}" cy="${(-r * .3).toFixed(1)}" rx="${(r * .2).toFixed(1)}" ry="${(r * .28).toFixed(1)}" fill="#fff" opacity=".45"/><path d="M0,${(-r * .72).toFixed(1)} q${(r * .1).toFixed(1)},${(-r * .4).toFixed(1)} ${(r * .3).toFixed(1)},${(-r * .55).toFixed(1)}" stroke="#4a3018" stroke-width="${Math.max(1, r * .14).toFixed(1)}" fill="none" stroke-linecap="round"/>${r > 9 ? `<path d="M${(r * .12).toFixed(1)},${(-r * .95).toFixed(1)} q${(r * .5).toFixed(1)},${(-r * .45).toFixed(1)} ${(r * .9).toFixed(1)},${(-r * .2).toFixed(1)} q${(-r * .45).toFixed(1)},${(r * .3).toFixed(1)} ${(-r * .9).toFixed(1)},${(r * .2).toFixed(1)}Z" fill="#4a7a2a"/>` : ''}</g>`;

// ---------- the apple tree: short gnarled trunk, tapered limbs, a crown of many leaf clusters, apples ----------
// a tapered limb along a quadratic curve, as a filled shape
function limbT(x0, y0, cx, cy, x1, y1, w0, w1, col) {
  const L = [], R = [], n = 10; for (let i = 0; i <= n; i++) { const u = i / n, v = 1 - u, x = v * v * x0 + 2 * v * u * cx + u * u * x1, y = v * v * y0 + 2 * v * u * cy + u * u * y1, dx = 2 * v * (cx - x0) + 2 * u * (x1 - cx), dy = 2 * v * (cy - y0) + 2 * u * (y1 - cy), l = Math.hypot(dx, dy) || 1, w = lerp(w0, w1, u) / 2;
    L.push([x - dy / l * w, y + dx / l * w]); R.push([x + dy / l * w, y - dx / l * w]); }
  return `<path d="M${L.map(PT).join(' L')} L${R.reverse().map(PT).join(' L')}Z" fill="${col}"/>`;
}
function appleTree(x, y, h, seed, t, o = {}) {
  const r = RS(seed), sw = Math.sin(t * .8 + seed) * h * .003, cx = x + (o.dx ?? h * .04), cy = y - h * .6, RX = h * (o.rx ?? .44), RY = h * (o.ry ?? .26), tw = h * .06, fy = y - h * .3;
  let s = `<ellipse cx="${x + h * .1}" cy="${y + 4}" rx="${h * .4}" ry="${h * .03}" fill="#1a2410" opacity=".35" filter="url(#blur9)"/>`;
  // the limbs first (the crown covers most of them, they show in the gaps)
  const LIM = o.limbs || [[-.92, .35], [-.55, .85], [-.12, 1.0], [.3, .95], [.68, .7], [.95, .25]], ends = [];
  let lb = '';
  LIM.forEach(([ax, ay], i) => { const ex = cx + ax * RX * .8 + sw, ey = cy + RY * (.25 - ay * .55), sx = x + (i - 2.5) * tw * .28, mx = lerp(sx, ex, .3), my = lerp(fy, ey, .75) + h * .02, w0 = h * (.052 - Math.abs(ax) * .012);
    ends.push([ex, ey]); ends.push([lerp(sx, ex, .7), lerp(fy, ey, .88)]); lb += limbT(sx, fy + 26, mx, my, ex, ey, w0, w0 * .25, '#4a3828') + limbT(sx - 2, fy + 6, mx - 3, my - 3, ex - 2, ey - 2, w0 * .3, w0 * .08, '#6e5844');
    // two twigs from each limb
    for (let k = 0; k < 2; k++) { const u = .55 + .25 * k, bx = (1 - u) * (1 - u) * sx + 2 * (1 - u) * u * mx + u * u * ex, by = (1 - u) * (1 - u) * fy + 2 * (1 - u) * u * my + u * u * ey, tx = clamp(bx + (r() - .5) * RX * .5, cx - RX * .9, cx + RX * .9), ty = Math.max(cy - RY * .8, by - RY * (.2 + .3 * r()));
      lb += limbT(bx, by, (bx + tx) / 2, (by + ty) / 2 + 8, tx, ty, w0 * .32, w0 * .08, '#3a2a1e'); ends.push([tx, ty]); } });
  s += lb;
  // the trunk: thick, twisted, flaring into roots
  const tr = `M${x - tw * 1.8},${y + 4} C${x - tw * .9},${y - h * .04} ${x - tw * 1.25},${y - h * .16} ${x - tw * .95},${fy} Q${x},${fy + tw * .7} ${x + tw * 1.05},${fy} C${x + tw * .8},${y - h * .15} ${x + tw * 1.15},${y - h * .05} ${x + tw * 2},${y + 4}Z`;
  s += `<path d="${tr}" fill="url(#barkG)"/><path d="${tr}" fill="#000" filter="url(#barkF)" opacity=".65"/>`;
  for (let i = 0; i < 8; i++) { const u = (i + .5) / 8, xx = x - tw * 1.1 + u * tw * 2.1, tws = (r() - .5) * tw * .6; s += `<path d="M${(xx + (r() - .5) * 6).toFixed(1)},${y} C${(xx + tws).toFixed(1)},${(y - h * .1).toFixed(1)} ${(xx - tws).toFixed(1)},${(y - h * .2).toFixed(1)} ${(xx * .85 + x * .15).toFixed(1)},${fy}" stroke="${i < 3 ? '#9a8264' : '#1a120c'}" stroke-width="${(h * .003 + r() * 1.6).toFixed(1)}" fill="none" opacity=".55"/>`; }
  s += `<ellipse cx="${x + tw * .2}" cy="${y - h * .17}" rx="${tw * .22}" ry="${tw * .34}" fill="#1a120c" opacity=".7"/><ellipse cx="${x + tw * .15}" cy="${y - h * .17}" rx="${tw * .12}" ry="${tw * .24}" fill="#0a0604" opacity=".7"/>`;
  // the crown: clusters of small leaf lumps around the limb ends
  const cl = []; ends.forEach(([ex, ey], i) => { const nn = i < LIM.length ? 0 : 0; for (let k = 0; k < 15; k++) { const a = r() * 6.2832, d = Math.sqrt(r()); cl.push([ex + Math.cos(a) * d * RX * .34, ey + Math.sin(a) * d * RY * .42 - RY * .05, h * (.026 + .022 * r()), r]); } });
  for (let k = 0; k < 40; k++) { const a = r() * 6.2832, d = Math.sqrt(r()); cl.push([cx + Math.cos(a) * d * RX * .8, cy + Math.sin(a) * d * RY * .8 - RY * .1, h * (.03 + .02 * r()), r]); }
  cl.sort((a, b) => a[1] - b[1]);
  const dk = cl.map(c => `<path d="${lumpP(c[0], c[1], c[2] * 1.12, c[3])}"/>`).join('');
  s += `<g fill="#183010">${dk}</g>`;
  const apples = []; let ap = '';
  cl.forEach(c => { const lit = clamp(.5 + ((cx - c[0]) * .5 + (cy - c[1]) * 1.3) / (RX * .9)), q = c[3];
    s += `<path d="${lumpP(c[0] - c[2] * .1, c[1] - c[2] * .16, c[2] * .9, q)}" fill="${mix('#26421a', '#4a762a', lit)}"/>`;
    if (lit > .25) s += `<path d="${lumpP(c[0] - c[2] * .3, c[1] - c[2] * .36, c[2] * .5, q)}" fill="${mix('#4e7a2c', '#8cb44e', lit)}" opacity=".9"/>`;
    if (q() < .065 && c[1] > cy - RY * .6) { const ax = c[0] + (q() - .4) * c[2], ay = c[1] + c[2] * (.3 + .4 * q()); apples.push([ax, ay]); ap += appleS(ax, ay, h * .011, (q() - .5) * 40, clamp(.6 + lit * .5)); } });
  // leaf texture over the whole crown: dark gaps and lit leaf specks
  s += `<g fill="#000" filter="url(#leafD)" opacity=".3">${dk}</g><g fill="#b8d878" filter="url(#leafL)" opacity=".5">${dk}</g>` + ap;
  for (let i = 0; i < 110; i++) { const c = cl[Math.floor(r() * cl.length)], a = r() * 6.2832, lx = c[0] + Math.cos(a) * c[2] * 1.05, ly = c[1] + Math.sin(a) * c[2] * .95; s += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${(h * (.005 + .004 * r())).toFixed(1)}" ry="${(h * .0028).toFixed(1)}" transform="rotate(${(r() * 180).toFixed(0)},${lx.toFixed(1)},${ly.toFixed(1)})" fill="${r() > .5 ? '#26421a' : '#5a8632'}"/>`; }
  APPLES = apples; return s;
}
let APPLES = [];

// ---------- Woolsthorpe-like farmhouse: two storeys of limestone, a steep stone-slate roof, gable chimneys, mullioned windows ----------
function manor(x, y, s, o = {}) {
  const r = RS(o.seed || 7), lit = o.lit ?? 1;
  let g = `<ellipse cx="40" cy="4" rx="260" ry="16" fill="#1a2410" opacity=".4" filter="url(#blur5)"/>`;
  // side gable wall in perspective, then the front wall
  g += `<path d="M170,0 L242,-26 L242,-196 L206,-302 L170,-170Z" fill="#9a8662"/><path d="M170,0 L242,-26 L242,-196 L206,-302 L170,-170Z" fill="#000" filter="url(#stoneF)" opacity=".5"/><path d="M170,0 L242,-26 L242,-196 L206,-302 L170,-170Z" fill="#1a1410" opacity=".28"/>`;
  g += `<rect x="-170" y="-170" width="340" height="170" fill="url(#stoneW)"/><rect x="-170" y="-170" width="340" height="170" fill="#000" filter="url(#stoneF)" opacity=".55"/>`;
  for (let k = 1; k < 13; k++) { const yy = -k * 13; g += `<path d="M-170,${yy} H170" stroke="#6a5a40" stroke-width=".9" opacity=".35"/>`; for (let q = 0; q < 9; q++) { const xx = -170 + (q + (k % 2) * .5 + r() * .3) * 40; if (xx < 168) g += `<path d="M${xx.toFixed(1)},${yy} v13" stroke="#6a5a40" stroke-width=".8" opacity=".3"/>`; } }
  g += `<rect x="-170" y="-40" width="340" height="40" fill="#3a3020" opacity=".18"/><rect x="-176" y="-8" width="352" height="8" fill="#8a7a5a"/>`;
  // roof: front slope and the stone ridge, rows of stone slates (smaller near the ridge)
  const roof = `M-186,-164 L174,-164 L208,-304 L-150,-304Z`;
  g += `<path d="${roof}" fill="url(#slateR)"/><path d="${roof}" fill="#000" filter="url(#stoneF)" opacity=".45"/>`;
  for (let k = 1; k < 12; k++) { const u = Math.pow(k / 12, .85), yy = -164 - 140 * u, x0 = -186 + 36 * u, x1 = 174 + 34 * u; g += `<path d="M${x0.toFixed(1)},${yy.toFixed(1)} H${x1.toFixed(1)}" stroke="#2e2c28" stroke-width="1.3" opacity=".45"/>`;
    for (let q = 0; q < 16; q++) { const xx = x0 + (q + (k % 2) * .5 + r() * .25) * (x1 - x0) / 16; g += `<path d="M${xx.toFixed(1)},${yy.toFixed(1)} l${(-1).toFixed(1)},${(140 / 12).toFixed(1)}" stroke="#2e2c28" stroke-width=".7" opacity=".3"/>`; } }
  g += `<path d="M-150,-304 L208,-304" stroke="#4a4640" stroke-width="7" stroke-linecap="round"/><path d="M-188,-162 L176,-162" stroke="#3a3630" stroke-width="5"/><path d="M170,-170 L206,-304" stroke="#8a826e" stroke-width="5"/>`;
  // two chimneys with soft smoke
  [[-128, -304, 56], [196, -304, 58]].forEach(([cx, cy, ch]) => { g += `<rect x="${cx - 15}" y="${cy - ch}" width="30" height="${ch + 6}" fill="#bca880"/><rect x="${cx - 15}" y="${cy - ch}" width="30" height="${ch + 6}" fill="#000" filter="url(#stoneF)" opacity=".5"/><rect x="${cx + 3}" y="${cy - ch}" width="12" height="${ch + 6}" fill="#000" opacity=".2"/><rect x="${cx - 18}" y="${cy - ch - 6}" width="36" height="8" fill="#8a7a5a"/>`; });
  if (o.smoke != null) { const t = o.smoke; for (let i = 0; i < 6; i++) { const ph = pmod(t * .12 + i / 6, 1); g += `<circle cx="${(196 + ph * 70 + Math.sin(ph * 6 + i) * 8).toFixed(1)}" cy="${(-372 - ph * 160).toFixed(1)}" r="${(10 + ph * 34).toFixed(1)}" fill="#e8e4dc" opacity="${(.35 * (1 - ph)).toFixed(2)}" filter="url(#blur9)"/>`; } }
  // mullioned windows (glass with a sky reflection, stone surrounds, hood moulds) and the door
  const win = (wx, wy, w, h, n) => { let q = `<rect x="${wx - w / 2 - 5}" y="${wy - h / 2 - 5}" width="${w + 10}" height="${h + 10}" fill="#e2d4b0"/><rect x="${wx - w / 2}" y="${wy - h / 2}" width="${w}" height="${h}" fill="#252c36"/>` +
    `<path d="M${wx - w / 2},${wy + h / 2} L${wx - w / 2},${wy - h / 2 + 6} L${wx + w / 2 - 10},${wy - h / 2}" fill="none" stroke="#8aa0b8" stroke-width="2" opacity=".35"/><path d="M${wx - w / 2 + 4},${wy + h / 2 - 4} L${wx + w / 2 - 6},${wy - h / 2 + 8}" stroke="#b8c8d8" stroke-width="5" opacity=".14"/>`;
    for (let k = 1; k < n; k++) q += `<rect x="${(wx - w / 2 + k * w / n - 2.5).toFixed(1)}" y="${wy - h / 2}" width="5" height="${h}" fill="#d8caa4"/>`;
    q += `<rect x="${wx - w / 2}" y="${wy - h * .12}" width="${w}" height="4" fill="#d8caa4"/><path d="M${wx - w / 2 - 10},${wy - h / 2 - 9} H${wx + w / 2 + 10} v6 H${wx - w / 2 - 10}Z" fill="#c8b890"/><path d="M${wx - w / 2 - 10},${wy - h / 2 - 3} H${wx + w / 2 + 10}" stroke="#4a3e2a" stroke-width="2" opacity=".5"/>`;
    if (lit < 1) q += `<rect x="${wx - w / 2}" y="${wy - h / 2}" width="${w}" height="${h}" fill="#ffc870" opacity="${(1 - lit).toFixed(2)}"/>`;
    return q; };
  [-120, -62, 62, 120].forEach(wx => g += win(wx, -58, 40, 50, 2)); [-130, -65, 0, 65, 130].forEach(wx => g += win(wx, -126, 38, 42, 2));
  g += `<rect x="-22" y="-92" width="44" height="92" fill="#e2d4b0"/><rect x="-16" y="-86" width="32" height="86" fill="#4a3422"/>` + [-8, 0, 8].map(dx => `<path d="M${dx},-86 v86" stroke="#2a1c12" stroke-width="1.4" opacity=".6"/>`).join('') + `<circle cx="9" cy="-42" r="2.2" fill="#c8a860"/><rect x="-26" y="-98" width="52" height="7" fill="#c8b890"/>`;
  g += win(206, -120, 22, 34, 1).replace(/fill="#e2d4b0"/, 'fill="#bca880"');
  // weathering: darker at the base and under the eaves, a soft bush at the wall foot
  g += `<rect x="-170" y="-170" width="340" height="16" fill="#000" opacity=".22"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}

// ---------- the English countryside: sky, clouds, rolling fields with hedgerows, far trees ----------
function countrySky(t, hz, o = {}) {
  let s = `<rect x="-20" y="-20" width="760" height="${hz + 40}" fill="url(#cSky)"/>`;
  s += `<circle cx="-60" cy="${hz - 330}" r="380" fill="url(#sunW)" opacity=".55"/>`;
  s += cumulus(170 + t * 2, hz - 330, 300, 3, { a: .9 }) + cumulus(560 + t * 1.5, hz - 400, 240, 8, { a: .75 });
  return s;
}
function fields(t, hz, seed, o = {}) {
  const r = RS(seed); let s = '';
  const hill = (y0, amp, ph, k) => { let d = `M-20,${hz + 60}`; for (let x = -20; x <= 740; x += 20) d += ` L${x},${(y0 - amp * (.5 + .5 * Math.sin(x * k + ph)) - amp * .3 * Math.sin(x * k * 2.3 + ph * 1.7)).toFixed(1)}`; return d + ` L740,${hz + 60}Z`; };
  // far hills (hazy), middle hills (field patches + hedgerows)
  s += `<path d="${hill(hz - 24, 50, seed, .009)}" fill="#8aa08a"/><path d="${hill(hz - 24, 50, seed, .009)}" fill="#c8d4dc" opacity=".45"/>`;
  const mid = hill(hz - 4, 34, seed + 2, .012), id = 'fl' + seed;
  s += `<defs><clipPath id="${id}"><path d="${mid}"/></clipPath></defs><g clip-path="url(#${id})"><rect x="-20" y="${hz - 80}" width="760" height="160" fill="#6e8a48"/>`;
  for (let i = 0; i < 9; i++) { const x0 = -40 + i * 90 + r() * 30, c = ['#7a9450', '#8a9a52', '#a8a058', '#5e7a3e', '#94a85a'][Math.floor(r() * 5)];
    s += `<path d="M${x0},${hz - 90} L${x0 + 95 + r() * 30},${hz - 90} L${x0 + 70 + r() * 30},${hz + 60} L${x0 - 30},${hz + 60}Z" fill="${c}" opacity=".75"/>`; }
  s += `<rect x="-20" y="${hz - 80}" width="760" height="160" fill="#000" filter="url(#cropT)" opacity=".2"/>`;
  for (let i = 0; i < 4; i++) { const y = hz - 50 + i * 16, sz = 2.2 + i * 1.1; for (let x = -20; x <= 740; x += sz * 1.3) { const yy = y + Math.sin(x * .013 + i + seed) * 9, rr = sz * (.8 + .5 * r()); s += `<circle cx="${x.toFixed(1)}" cy="${(yy - rr * .4).toFixed(1)}" r="${rr.toFixed(1)}" fill="#22361a"/>`; if (r() < .5) s += `<circle cx="${(x - rr * .3).toFixed(1)}" cy="${(yy - rr * .8).toFixed(1)}" r="${(rr * .5).toFixed(1)}" fill="#5a7a34" opacity=".7"/>`; } if (i === 3) for (let k = 0; k < 5; k++) { const x = 60 + k * 150 + r() * 60; s += treeR(x, y + Math.sin(x * .013 + i + seed) * 9, 40 + r() * 20, seed * 31 + k, t); } }
  s += `</g><rect x="-20" y="${hz - 80}" width="760" height="100" fill="#d8dce0" opacity=".12"/>`;
  // a few far trees on the fields
  for (let i = 0; i < 7; i++) { const x = 30 + i * 105 + r() * 50, y = hz - 6 + r() * 12, h = 50 + r() * 34; s += `<g opacity=".85">${treeR(x, y, h, seed * 10 + i, t)}</g>`; }
  return s;
}
// the orchard: grass, a few far apple trees, the main tree and Newton; sh pans the camera up (everything moves down)
function orchardBack(t, hz, o = {}) {
  let s = countrySky(t, hz, o) + fields(t, hz, o.seed || 5, o);
  if (o.house) s += manor(o.house[0], o.house[1], o.house[2], { smoke: t, seed: 3 });
  s += meadow(hz + 10, 1320, t, { c0: '#86a24e', c1: '#4e6e2a', patch: '#b8b060', seed: 52 });
  return s;
}

// ---------- 0: the hook: the apple falls toward his head... and goes back up ----------
function sceneHook(t) {
  const HZ = 790, tf0 = .5, tf1 = WS(0, 6), tr1 = S0(1) - .25, fall = ease(ramp(t, tf0, tf0 + .2)) * 0 + clamp((t - tf0) / (tf1 - tf0)), back = ease(ramp(t, tf1 + .12, tr1));
  let s = `<defs>${APDEFS()}</defs>` + orchardBack(t, HZ, { house: [560, HZ + 22, .44] });
  s += appleTree(165, 1110, 980, 17, t);
  // Newton sitting against the trunk, reading
  const nx = 268, ny = 1150, ns = 1.42, look = .5 * (1 - back) + .1;
  s += newton(nx, ny, { s: ns, face: 1, sit: 1, hipY: -12, lF: [2.15, .62], lB: [1.5, 1.62], lean: -6, lookUp: -.4 + look * .2, hF: [nx + 82 * ns, ny - 60 * ns], hB: [nx + 70 * ns, ny - 66 * ns] });
  const [hx, hy] = HP.head;
  s += `<g transform="translate(${(nx + 78 * ns).toFixed(1)},${(ny - 70 * ns).toFixed(1)}) rotate(-28)"><rect x="-26" y="-4" width="52" height="8" fill="#5a3a22"/><path d="M-24,-4 Q-12,-16 0,-6 Q12,-16 24,-4" fill="#f0e6cc" stroke="#8a7a5a" stroke-width="1"/></g>`;
  // the apple: from the branch to just above his head, then rewound back up
  const a0 = [hx + 6, 792], a1 = [hx + 6, hy - 46], k = Math.pow(fall, 2) * (1 - back), ax = lerp(a0[0], a1[0], k), ay = lerp(a0[1], a1[1], k);
  if (fall > 0 && fall < 1 && back === 0) s += `<path d="M${ax},${(ay - 10 - 60 * fall).toFixed(1)} L${ax},${(ay - 8).toFixed(1)}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${(.18 * fall).toFixed(2)}" filter="url(#blur2)"/>`;
  if (back > 0 && back < 1) { for (let i = 1; i < 4; i++) s += appleS(ax, ay + i * 16 * (1 - back), 17, 0, .22 / i); s += scr(`<path d="M${ax - 40},${ay + 30} L${ax - 40},${ay + 120}" stroke="#fff" stroke-width="3" opacity=".35"/><path d="M${ax + 40},${ay + 30} L${ax + 40},${ay + 120}" stroke="#fff" stroke-width="3" opacity=".35"/>`); }
  s += `<path d="M${a0[0] + 2},${a0[1] - 18} q4,-20 -6,-34" stroke="#3a2a1e" stroke-width="4" fill="none"/>` + appleS(ax, ay, 17, 8 * Math.sin(t * 3) * (1 - fall));
  // a rewind sign at the freeze
  const rw = ramp(t, tf1 + .05, tf1 + .2) * (1 - ramp(t, tr1 - .2, tr1));
  if (rw > 0) s += `<g opacity="${(.9 * rw).toFixed(2)}" transform="translate(560,600)"><circle r="54" fill="#0a0e1c" opacity=".55"/><path d="M8,-24 L-22,0 L8,24Z M34,-24 L4,0 L34,24Z" fill="#fff"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 1: 1666: the plague closes the university, young Newton goes home to his mother's farm ----------
function gateInset(x, y, R, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}"><defs><clipPath id="gtC"><circle cx="${x}" cy="${y}" r="${R}"/></clipPath></defs><circle cx="${x}" cy="${y}" r="${R + 8}" fill="#0a0e1c" opacity=".85"/><g clip-path="url(#gtC)">`;
  s += `<rect x="${x - R}" y="${y - R}" width="${2 * R}" height="${2 * R}" fill="#8a9cb0"/><rect x="${x - R}" y="${y - R}" width="${2 * R}" height="${2 * R}" fill="url(#stoneW)"/><rect x="${x - R}" y="${y - R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#stoneF)" opacity=".5"/>`;
  for (let k = 0; k < 12; k++) s += `<path d="M${x - R},${y - R + k * 20} H${x + R}" stroke="#6a5a40" stroke-width="1" opacity=".4"/>`;
  // a Tudor-style gate arch with closed oak doors, a chain and a lock
  s += `<path d="M${x - 62},${y + R} V${y - 20} Q${x - 62},${y - 70} ${x},${y - 80} Q${x + 62},${y - 70} ${x + 62},${y - 20} V${y + R}Z" fill="#c8b890"/><path d="M${x - 50},${y + R} V${y - 16} Q${x - 50},${y - 60} ${x},${y - 66} Q${x + 50},${y - 60} ${x + 50},${y - 16} V${y + R}Z" fill="#4a3220"/>`;
  for (let i = -4; i <= 4; i++) s += `<path d="M${x + i * 11},${y - 62 + Math.abs(i) * 2} V${y + R}" stroke="#2a1a10" stroke-width="1.6" opacity=".7"/>`;
  s += `<path d="M${x},${y - 66} V${y + R}" stroke="#1a100a" stroke-width="3"/>` + [-1, 1].map(k => `<rect x="${x + k * 30 - 14}" y="${y - 24}" width="28" height="5" fill="#2a2a2a"/><rect x="${x + k * 30 - 14}" y="${y + 40}" width="28" height="5" fill="#2a2a2a"/>`).join('');
  s += `<path d="M${x - 30},${y + 8} Q${x},${y + 30} ${x + 30},${y + 8}" stroke="#9a9a9a" stroke-width="5" fill="none" stroke-dasharray="7 3"/><rect x="${x - 9}" y="${y + 16}" width="18" height="16" rx="3" fill="#c8a040"/><path d="M${x - 6},${y + 16} v-6 a6,6 0 0 1 12,0 v6" stroke="#c8a040" stroke-width="3" fill="none"/>`;
  s += `</g><circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="4"/>` + lbl(x, y + R + 40, 'الجامعةُ مغلقة', 1, '#fff', 26) + `</g>`;
  return s;
}
function scenePlague(t) {
  const t0 = S0(1) - .2, T = t - t0, HZ = 760;
  let s = `<defs>${APDEFS()}</defs>` + countrySky(t, HZ) + fields(t, HZ, 9);
  s += meadow(HZ + 6, 1320, t, { c0: '#8aa452', c1: '#506e2c', patch: '#c0b464', seed: 61 });
  // the farmhouse, a dry-stone wall and the lane
  s += manor(430, 1010, .95, { smoke: t, seed: 5 });
  // the lane: packed earth with wheel ruts, stones and grass verges
  const lane = `M-20,1066 C200,1046 420,1036 740,1056 L740,1150 C420,1132 200,1142 -20,1182Z`;
  s += `<path d="${lane}" fill="#a08a64"/><path d="${lane}" fill="#000" filter="url(#stoneF)" opacity=".45"/><path d="${lane}" fill="#5a4a30" filter="url(#cropT)" opacity=".35"/>`;
  [[1092, .3], [1120, .35]].forEach(([yy, op]) => s += `<path d="M-20,${yy + 14} C200,${yy} 420,${yy - 8} 740,${yy + 4}" stroke="#6a5a3c" stroke-width="7" fill="none" opacity="${op}"/><path d="M-20,${yy + 17} C200,${yy + 3} 420,${yy - 5} 740,${yy + 7}" stroke="#c8b48a" stroke-width="2" fill="none" opacity=".35"/>`);
  { const r = RS(35); for (let i = 0; i < 40; i++) { const x = r() * 740 - 10, y = 1060 + r() * 100, w = 2 + r() * 5; s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .55).toFixed(1)}" fill="${mix('#7a6a50', '#d0c0a0', r())}"/>`; }
    for (let x = -20; x < 740; x += 7) { const yy = 1058 - 4 * Math.sin(x * .004) - (x / 740) * 2 + 1, hh = 6 + r() * 12; s += `<path d="M${x},${(yy + 10).toFixed(1)} q2,${(-hh * .6).toFixed(1)} ${(r() * 6 - 3).toFixed(1)},${(-hh).toFixed(1)}" stroke="${mix('#4e6e2a', '#9ab45a', r())}" stroke-width="2" fill="none"/>`; } }
  // a dry-stone wall: flat stones in rows, coping stones on edge on top, with a gap for the gate
  { const r = RS(33); [[-20, 250], [600, 740]].forEach(([x0, x1]) => { let w = ''; for (let row = 0; row < 4; row++) { const yy = 1040 - row * 11; for (let x = x0 + (row % 2) * 9; x < x1; x += 14 + r() * 10) { const sw2 = 12 + r() * 10; w += `<path d="M${x.toFixed(1)},${yy} l${(sw2 * .1).toFixed(1)},-10 l${(sw2 * .8).toFixed(1)},${(-1 + r() * 2).toFixed(1)} l${(sw2 * .1).toFixed(1)},10Z" fill="${mix('#8a7c62', '#cfc2a2', r())}" stroke="#4a3e2c" stroke-width="1"/>`; } }
      for (let x = x0; x < x1; x += 7 + r() * 3) w += `<path d="M${x.toFixed(1)},996 l1,-${(10 + r() * 4).toFixed(1)} l5,0 l1,${(10 + r() * 3).toFixed(1)}Z" fill="${mix('#7a6c52', '#bfb292', r())}" stroke="#4a3e2c" stroke-width=".8"/>`;
      s += `<rect x="${x0}" y="996" width="${x1 - x0}" height="46" fill="#3a3224"/>` + w + `<rect x="${x0}" y="1030" width="${x1 - x0}" height="12" fill="#000" opacity=".2"/>`; });
    s += `<rect x="248" y="976" width="12" height="68" fill="#6a5a44"/><rect x="590" y="976" width="12" height="68" fill="#6a5a44"/>`; }
  // Newton walks along the lane towards the house, carrying a satchel of books
  const wx = lerp(-60, 330, ease(ramp(t, t0 + .2, S0(2) + .2))), ph = (t - t0) * 7.2;
  s += newton(wx, 1150, { s: 1.12, face: 1, walk: ph, amp: .5 });
  const [hx, hy] = HP.hand; s += `<g transform="translate(${hx.toFixed(1)},${(hy + 4).toFixed(1)})"><path d="M-8,0 L-8,-26" stroke="#3a2818" stroke-width="3"/><rect x="-22" y="0" width="34" height="26" rx="4" fill="#6a4a2a"/><rect x="-22" y="0" width="34" height="9" rx="3" fill="#5a3c22"/></g>`;
  s += gateInset(140, 545, 105, ease(ramp(t, WS(1, 5) - .3, WS(1, 6) + .1)) * (1 - ease(ramp(t, WS(1, 9) - .2, WS(1, 9) + .3))));
  noEarth(); F.ov = ''; return s;
}

// ---------- 2: he sees an apple fall and asks: if the Earth pulls the apple, why doesn't the Moon fall? ----------
function sceneApple(t) {
  const t0 = S0(2) - .2, HZ = 800, pan = ease(ramp(t, WS(2, 9) - .4, WS(2, 13) + .2)), sh = 360 * pan;
  let s = `<defs>${APDEFS()}</defs><g transform="translate(0,${sh.toFixed(1)})">` + orchardBack(t, HZ, { seed: 6 });
  // a sky strip above the frame for the pan up
  s += `<defs><linearGradient id="skyUp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset="1" stop-color="#6e9ccc"/></linearGradient></defs><rect x="-20" y="-420" width="760" height="402" fill="url(#skyUp)"/>`;
  s += appleTree(470, 1150, 940, 23, t, { dx: -40 });
  // Newton standing on the left, looking at the tree, then up at the Moon
  const nx = 190, ny = 1170, ns = 1.3;
  s += newton(nx, ny, { s: ns, face: 1, lookUp: lerp(.1, 1.1, pan), aF: [.35, 1.2], aB: [-.1, .5] });
  // the apple falls from the crown to the grass, with a dashed path and an arrow
  const fa = WS(2, 1) - .1, fb = WS(2, 3), k = Math.pow(clamp((t - fa) / (fb - fa)), 2), ax = 412, ay = lerp(808, 1158, k);
  const pa = ease(ramp(t, fb, fb + .4)) * (1 - pan);
  s += `<g opacity="${pa.toFixed(2)}"><path d="M${ax},818 L${ax},1120" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/><path d="M${ax - 12},1104 L${ax},1126 L${ax + 12},1104" stroke="#fff" stroke-width="4" fill="none"/></g>`;
  if (k > 0 && k < 1) s += `<path d="M${ax},${(ay - 14 - 50 * k).toFixed(1)} L${ax},${(ay - 10).toFixed(1)}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".2" filter="url(#blur2)"/>`;
  s += appleS(ax, ay, 15, k >= 1 ? 70 : 0);
  s += `</g>`;
  // the Moon in the daytime sky (3D), with a dashed "why doesn't it fall?" arrow
  const mx = 520, my = lerp(-160, 440, pan), mr = 52, ma = ease(ramp(t, WS(2, 8), WS(2, 10)));
  const cam = { pos: [0, 0, 10], look: [0, 0, 0], fov: 30 }, wz = Math.tan(15 * Math.PI / 180) * 10 / 640, wp = [(mx - 360) * wz, -(my - 640) * wz, 0];
  F.w = { set: 'space', cam, L: [-.6, .5, .6], disc: null, moon: { pos: wp, r: mr * wz, L: [-.7, .35, .55], shC: NOFAR, shR: .001, a: ma, rot: 1.2 } };
  F.earth = null; F.moon = null; F.sun = null;
  const qa = ease(ramp(t, WS(2, 12), WS(2, 13) + .2));
  F.ov = `<defs>${APDEFS()}</defs><g opacity="${qa.toFixed(2)}"><path d="M${mx},${my + mr + 14} L${mx},${my + mr + 180}" stroke="#fff" stroke-width="3" stroke-dasharray="10 8"/><path d="M${mx - 12},${my + mr + 164} L${mx},${my + mr + 186} L${mx + 12},${my + mr + 164}" stroke="#fff" stroke-width="4" fill="none"/>` + lbl(mx + 70, my + mr + 120, '؟', 1, '#f4c76b', 64) + `</g>`;
  return s;
}
