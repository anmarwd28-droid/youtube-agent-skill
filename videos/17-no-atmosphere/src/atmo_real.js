// ===== realism pass for the atmosphere Short: shots 1, 2, 3, 4, 5, 6, 9 =====
// a leafy street tree: tapered trunk, branches, a lumpy crown lit from the upper left with a leaf texture
function lumpP(cx, cy, R, r) {
  const n = 9, p = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = R * (.78 + .32 * r()); p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .86]); }
  let d = `M${((p[0][0] + p[n - 1][0]) / 2).toFixed(1)},${((p[0][1] + p[n - 1][1]) / 2).toFixed(1)}`;
  for (let i = 0; i < n; i++) { const a = p[i], b = p[(i + 1) % n]; d += ` Q${a[0].toFixed(1)},${a[1].toFixed(1)} ${((a[0] + b[0]) / 2).toFixed(1)},${((a[1] + b[1]) / 2).toFixed(1)}`; }
  return d + 'Z';
}
function treeR(x, y, h, seed, t) {
  const r = RS(seed + 200), cy = y - h * .7, sw = Math.sin(t * .9 + seed) * h * .004;
  let s = `<path d="M${x - h * .036},${y} C${x - h * .02},${y - h * .2} ${x - h * .028},${y - h * .36} ${x - h * .012 + sw},${y - h * .5} L${x + h * .014 + sw},${y - h * .5} C${x + h * .02},${y - h * .32} ${x + h * .018},${y - h * .2} ${x + h * .036},${y}Z" fill="#4a3a2c"/>` +
    `<path d="M${x - h * .03},${y} C${x - h * .018},${y - h * .2} ${x - h * .024},${y - h * .36} ${x - h * .01 + sw},${y - h * .5}" stroke="#7a6650" stroke-width="${h * .008}" fill="none"/>`;
  [[-1, .8], [0, 1], [1, .85]].forEach(([b, l]) => { s += `<path d="M${x + sw},${y - h * .46} Q${x + b * h * .06 + sw},${y - h * .6} ${x + b * h * .17 * l + sw},${y - h * (.68 + .1 * l)}" stroke="#4a3a2c" stroke-width="${h * .012}" fill="none" stroke-linecap="round"/>`; });
  const cl = []; for (let i = 0; i < 30; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); cl.push([x + sw + Math.cos(a) * d * h * .27, cy + Math.sin(a) * d * h * .2 - h * .02, h * (.06 + .045 * r()), r]); }
  cl.sort((a, b) => a[1] - b[1]);
  const dk = cl.map(c => `<path d="${lumpP(c[0], c[1], c[2], c[3])}"/>`).join('');
  s += `<g fill="#22361a">${dk}</g>`;
  cl.forEach(c => { const lit = ((x - c[0]) * .7 + (cy - c[1])) / (h * .3); s += `<path d="${lumpP(c[0] - c[2] * .15, c[1] - c[2] * .2, c[2] * .8, c[3])}" fill="${mix('#2e4a1e', '#4a6e2a', Math.max(0, Math.min(1, .5 + lit)))}"/>`; if (lit > -.15) s += `<path d="${lumpP(c[0] - c[2] * .35, c[1] - c[2] * .4, c[2] * .45, c[3])}" fill="${mix('#5a7e32', '#86a44a', Math.max(0, Math.min(1, lit)))}"/>`; });
  s += `<g fill="#000" filter="url(#cropT)" opacity=".38">${dk}</g>`;
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, d = .9 + .15 * r(); s += `<circle cx="${x + sw + Math.cos(a) * d * h * .3}" cy="${cy + Math.sin(a) * d * h * .23}" r="${h * (.006 + .008 * r())}" fill="${r() > .5 ? '#2e4a1e' : '#4a6e2a'}"/>`; }
  return s;
}
const castSh = (x, y, sc = .55) => `<path d="M${x - 9 * sc / .55},${y} L${x + 70 * sc / .55},${y + 9} Q${x + 80 * sc / .55},${y + 13} ${x + 68 * sc / .55},${y + 15} L${x - 7 * sc / .55},${y + 7}Z" fill="#000" opacity=".9"/>`;

// 0: the walker really walks along the pavement, then stops when the sky goes black
function sceneHook(t) {
  const tg = tGone(), k = ease(ramp(t, tg, tg + .6));
  const sky = [mix('#3a7cc4', blackSky[0], k), mix('#8ab8e0', blackSky[1], k), mix('#d2e4f0', blackSky[2], k)];
  let clouds = ''; for (let i = 0; i < 6; i++) { const r = RS(i + 3), cx = 80 + r() * 560, cy = 470 + r() * 200 - k * 600 * (.5 + r()); clouds += `<ellipse cx="${cx}" cy="${cy}" rx="${110 + r() * 60}" ry="${36 + r() * 16 + k * 80}" fill="#fff" opacity="${.85 * (1 - k)}" filter="url(#soft)"/><ellipse cx="${cx + 20}" cy="${cy + 14}" rx="${80 + r() * 40}" ry="${18 + r() * 8}" fill="#c8d4e0" opacity="${.6 * (1 - k)}" filter="url(#soft)"/>`; }
  const wx = 200 + Math.min(t, tg) * 30;
  let s = bareStreet(t, { id: 'a0', green: 1, sky, sunGlow: .28 * (1 - k), afterSky: stars(k, t) + clouds, harsh: k > .5 });
  s += (k > .5 ? castSh(wx, 1088) + castSh(520, 1082, .52) : '') + onWalk(wx, 1088, CROWD[0], .55, 1, t, { moving: t < tg ? 1 : 0, phase: t * 6, lookUp: k * .5 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { lookUp: k * .5 });
  F.ov = ''; F.flash = t > tg && t < tg + .4 ? .25 * (1 - (t - tg) / .4) : 0; return s;
}
// 1: a black daytime sky full of stars next to a harsh white Sun; shadows hard and pitch black
function sceneBlack(t) {
  let s = bareStreet(t, { id: 'a1', green: 1, sky: blackSky, sunGlow: 0, harsh: 1, afterSky: stars(1, t) + `<path d="M-20,560 Q200,460 420,500 T760,430" stroke="#cfd8ff" stroke-width="80" fill="none" opacity=".08" filter="url(#haze)"/>` });
  s += `<circle cx="150" cy="470" r="30" fill="#ffffff"/><circle cx="150" cy="470" r="40" fill="#fff" opacity=".5" filter="url(#blur2)"/>`;
  s += castSh(250, 1088) + castSh(520, 1082, .52) + onWalk(250, 1088, CROWD[0], .55, 1, t, { lookUp: .6 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { lookUp: .6 });
  F.ov = ''; return s;
}
// 2: silence: a car horn and a shop speaker still vibrate, but their sound rings die instantly
function sceneSilence(t) {
  const die = ease(ramp(t, WS(2, 2) - .2, WS(2, 2) + .5));
  let s = bareStreet(t, { id: 'a2', green: 1, sky: blackSky, sunGlow: 0, harsh: 1, afterSky: stars(1, t) });
  s += `<circle cx="150" cy="470" r="30" fill="#ffffff"/>`;
  const rings = (x, y, n, col) => Array.from({ length: n }, (_, q) => { const ph = pmod(t * 1.2 + q / n, 1); return `<path d="M${x + 10 + ph * 120},${y - 50 - ph * 60} A${60 + ph * 120},${60 + ph * 120} 0 0 1 ${x + 10 + ph * 120},${y + 50 + ph * 60}" stroke="${col}" stroke-width="${4 - 2 * ph}" fill="none" opacity="${((1 - ph) * (1 - die)).toFixed(2)}"/>`; }).join('');
  s += `<g transform="translate(380,860)"><rect x="-30" y="-24" width="40" height="48" rx="6" fill="#2a2a2e"/><path d="M10,-24 L44,-46 L44,46 L10,24Z" fill="#3a3a40"/><circle cx="-10" cy="0" r="12" fill="#555"/></g>` + rings(424, 860, 4, '#f4c76b');
  s += rings(640, 1150, 4, '#ffffff');
  s += `<g opacity="${die}" transform="translate(360,620)"><circle r="70" fill="#0a0e1c" opacity=".85" stroke="#fff" stroke-width="3"/><path d="M-30,-14 h18 l22,-20 v68 l-22,-20 h-18Z" fill="#fff"/><path d="M22,-20 L50,20 M50,-20 L22,20" stroke="#e53935" stroke-width="6" stroke-linecap="round"/></g>`;
  s += castSh(250, 1088) + onWalk(250, 1088, CROWD[0], .55, 1, t, { lookUp: .1 });
  F.ov = ''; return s;
}
// 3: from cruising height: farmland, the Tigris and Baghdad below, crisp to the horizon (no haze); a detailed airliner loses its lift and noses down; birds tumble
const GP = (X, Z) => [360 + X * 250 / Z, 905 + 375 / Z];
const rX = Z => .55 * Math.sin(Z * .32 + .4) + .3 * Math.sin(Z * .85) - .15;
function groundFromAbove(t) {
  let s = `<path d="M-20,912 Q360,899 740,912 L740,1290 L-20,1290Z" fill="#b49c74"/>`;
  const GR = ['#4a6a2e', '#5e7a36', '#3e5a26', '#6a7a3a', '#557232', '#2e4420'], DS = ['#b8a47e', '#a89670', '#c4b08a', '#9a8a62', '#b09a72'];
  // fields: irrigated green near the river, open desert away from it
  let Z = 1, row = 0;
  while (Z < 34) { const r = RS(row + 300), Z2 = Z * (1.1 + .08 * r()), zm = (Z + Z2) / 2, st = .24 * Math.pow(zm, .9), lim = 1.7 * Z2, far = Math.min(1, zm / 30);
    for (let X = -lim; X < lim;) { const w = st * (.45 + 1.1 * r()), d = Math.abs(X + w / 2 - rX(zm)), green = r() < Math.exp(-d / 1.0) * .95;
      const c = mix(green ? GR[Math.floor(r() * GR.length)] : DS[Math.floor(r() * DS.length)], '#b49c74', far * .55), a = GP(X, Z), b = GP(X + w, Z), c2 = GP(X + w, Z2), dd = GP(X, Z2);
      s += `<path d="M${PT(a)} L${PT(b)} L${PT(c2)} L${PT(dd)}Z" fill="${c}"${green ? ` stroke="#3a3a22" stroke-width="${(.9 / Math.sqrt(zm)).toFixed(2)}" stroke-opacity=".5"` : ''}/>`;
      if (green && zm < 4) { const nn = 3 + Math.floor(r() * 4); for (let q = 1; q < nn; q++) { const u = q / nn, p1 = GP(X + w * u, Z), p2 = GP(X + w * u, Z2); s += `<path d="M${PT(p1)} L${PT(p2)}" stroke="#000" stroke-opacity=".1" stroke-width=".8"/>`; } }
      X += w; }
    Z = Z2; row++; }
  // groves of trees lining both banks
  for (let i = 0; i < 260; i++) { const r = RS(i + 1500), Zg = 1 + Math.pow(r(), 1.6) * 24, side = r() > .5 ? 1 : -1, Xg = rX(Zg) + side * (.1 + r() * .3), p = GP(Xg, Zg), rr = 9 / Zg * (.6 + r()); s += `<ellipse cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" rx="${(rr * 1.6).toFixed(1)}" ry="${rr.toFixed(1)}" fill="${r() > .4 ? '#24381a' : '#30482a'}"/><ellipse cx="${(p[0] + rr * 1.2).toFixed(1)}" cy="${(p[1] + rr * .3).toFixed(1)}" rx="${(rr * 1.2).toFixed(1)}" ry="${(rr * .5).toFixed(1)}" fill="#000" opacity=".5"/>`; }
  // Baghdad on both banks: a grey urban ground, a grid of streets, blocks with sunlit roofs and black shadows
  const cz0 = 3.4, cz1 = 8.5, edge = Z => GP(rX(Z) - 1, Z), edge2 = Z => GP(rX(Z) + 1, Z); let L1 = [], R1 = []; for (let Z = cz0; Z <= cz1; Z *= 1.05) { L1.push(edge(Z)); R1.push(edge2(Z)); }
  s += `<path d="M${L1.map(PT).join(' L')} L${R1.reverse().map(PT).join(' L')}Z" fill="#8e877a"/>`;
  for (let Zc = cz0; Zc < cz1; Zc += .22) for (let Xo = -.95; Xo < .95; Xo += .13) { const r = RS(Math.round(Zc * 100) * 31 + Math.round(Xo * 100)), Xc = rX(Zc) + Xo; if (Math.abs(Xo) < .1 || r() < .15 || Math.abs(Xo) > .95 - .4 * r()) continue;
    const w = .07 + .04 * r(), dz = .12 + .06 * r(), a = GP(Xc, Zc), b = GP(Xc + w, Zc), c2 = GP(Xc + w, Zc + dz), dd = GP(Xc, Zc + dz), sh = 3.2 / Zc;
    s += `<path d="M${PT(a)} L${PT(b)} L${PT(c2)} L${PT(dd)}Z" fill="${mix('#a8a092', '#e0d8c8', r())}"/><path d="M${PT(a)} L${PT(b)} L${b[0].toFixed(1)},${(b[1] + sh).toFixed(1)} L${a[0].toFixed(1)},${(a[1] + sh).toFixed(1)}Z" fill="#000" opacity=".75"/>`; }
  // the Tigris, with lighter banks and two bridges
  const rv = (Z, sgn) => GP(rX(Z) + sgn * .085, Z); let A = [], B = []; for (let Z = 1; Z < 34; Z *= 1.03) { A.push(rv(Z, -1)); B.push(rv(Z, 1)); }
  s += `<path d="M${A.map(PT).join(' L')} L${B.slice().reverse().map(PT).join(' L')}Z" fill="#16262e"/><path d="M${A.map(PT).join(' L')}" stroke="#8a8a62" stroke-width="1.5" fill="none" opacity=".7"/><path d="M${B.map(PT).join(' L')}" stroke="#8a8a62" stroke-width="1.5" fill="none" opacity=".7"/>`;
  [4.6, 6.8].forEach(Zb => { const p1 = GP(rX(Zb) - .12, Zb), p2 = GP(rX(Zb) + .12, Zb); s += `<path d="M${PT(p1)} L${PT(p2)}" stroke="#d8d0c0" stroke-width="${(10 / Zb).toFixed(1)}"/>`; });
  // a highway curving across the desert
  const hp = []; for (let Z = 1; Z < 34; Z *= 1.06) hp.push(GP(-2.2 + .9 * Math.sin(Z * .18) + .04 * Z, Z)); s += `<path d="M${hp.map(PT).join(' L')}" stroke="#4a4a4e" stroke-width="3" fill="none"/><path d="M${hp.map(PT).join(' L')}" stroke="#d8d0c0" stroke-width=".8" fill="none" opacity=".7"/>`;
  s += `<path d="M-20,912 Q360,899 740,912 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  return s;
}
function airliner() {
  return `<defs><linearGradient id="fusG" gradientUnits="userSpaceOnUse" x1="0" y1="-26" x2="0" y2="18"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eef1f4"/><stop offset=".8" stop-color="#b8c0c8"/><stop offset="1" stop-color="#7a828c"/></linearGradient>` +
    `<linearGradient id="engG" gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="44"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#c8ced4"/><stop offset="1" stop-color="#6a727c"/></linearGradient>` +
    `<linearGradient id="wngG" gradientUnits="userSpaceOnUse" x1="40" y1="4" x2="-100" y2="66"><stop offset="0" stop-color="#d4dae0"/><stop offset="1" stop-color="#8a929c"/></linearGradient>` +
    `<linearGradient id="tailG" gradientUnits="userSpaceOnUse" x1="-110" y1="-24" x2="-196" y2="-104"><stop offset="0" stop-color="#2a4a7e"/><stop offset="1" stop-color="#132a50"/></linearGradient></defs>` +
    // far wing peeking above the fuselage, tail fin, far stabiliser
    `<path d="M10,-22 L-40,-22 L-70,-40 L-52,-40Z" fill="#9aa2ac"/><path d="M-150,-22 L-202,-104 L-178,-104 L-112,-22Z" fill="url(#tailG)"/><path d="M-196,-100 L-180,-100 L-170,-84 L-188,-86Z" fill="#c9a24a"/><path d="M-160,-18 L-196,-30 L-188,-32 L-146,-20Z" fill="#a8b0b8"/>` +
    // fuselage
    `<path d="M-196,-18 L-150,-25 L150,-25 C172,-25 190,-15 195,-3 C193,8 176,16 150,16 L-100,16 C-136,16 -166,4 -196,-12Z" fill="url(#fusG)"/>` +
    `<path d="M-150,-2 L162,-2 L170,2 L-150,3Z" fill="#1e3c6e"/><path d="M-150,5 L150,5" stroke="#c9a24a" stroke-width="1.6"/><path d="M-100,15 L150,15" stroke="#5a626c" stroke-width="1.5" opacity=".6"/>` +
    Array.from({ length: 30 }, (_, q) => `<rect x="${-128 + q * 9}" y="-14" width="5" height="7" rx="2.3" fill="#26303c"/>`).join('') +
    `<path d="M162,-16 L177,-16 L184,-9 L163,-9Z" fill="#1a2430"/><path d="M170,-16 L171,-9" stroke="#eef1f4" stroke-width="1.2"/>` +
    [[138, -21], [-20, -21], [-136, -20]].map(([dx, dy]) => `<rect x="${dx}" y="${dy}" width="11" height="24" rx="3" fill="none" stroke="#9aa2ac" stroke-width="1"/>`).join('') +
    `<path d="M-196,-18 L-150,-25 L150,-25" stroke="#fff" stroke-width="1.5" fill="none" opacity=".9"/>` +
    // near wing, pylon and engine, near stabiliser
    `<path d="M44,6 L-44,10 L-114,64 L-90,64Z" fill="url(#wngG)"/><path d="M44,6 L-90,64" stroke="#fff" stroke-width="1.4" opacity=".7"/><path d="M-114,64 L-122,48 L-112,48 L-98,62Z" fill="#1e3c6e"/>` +
    `<path d="M14,14 L-6,14 L-12,24 L8,24Z" fill="#a8b0b8"/><path d="M38,20 L-26,20 Q-38,30 -26,42 L38,42 Q44,31 38,20Z" fill="url(#engG)"/><ellipse cx="39" cy="31" rx="5" ry="11" fill="#d8dde2"/><ellipse cx="40" cy="31" rx="3.2" ry="8.6" fill="#2a3038"/><path d="M-26,24 L-36,28 L-36,34 L-26,38Z" fill="#5a626c"/>` +
    `<path d="M-150,-6 L-200,6 L-192,12 L-136,2Z" fill="#b8c0c8"/>`;
}
function bird(x, y, sc, flap, rot) {
  const f = Math.sin(flap) * 10;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})"><path d="M0,0 C-6,${-3 - f * .3} -14,${-10 - f} -26,${-8 - f * 1.2} C-17,${-3 - f * .4} -10,0 -4,2Z M0,0 C6,${-3 - f * .3} 14,${-10 - f} 26,${-8 - f * 1.2} C17,${-3 - f * .4} 10,0 4,2Z" fill="#2a2a30"/><ellipse cx="0" cy="1.5" rx="7" ry="3.2" fill="#3a3a42"/><circle cx="7" cy="0" r="2.6" fill="#3a3a42"/><path d="M-7,1 L-12,4 L-7,3Z" fill="#2a2a30"/></g>`;
}
function sceneFly(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 4) - .3, L(3).end + .2));
  let s = `<defs>${RDEF}${RDEF2}</defs><rect width="720" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="600" cy="420" r="26" fill="#fff"/><circle cx="600" cy="420" r="34" fill="#fff" opacity=".4" filter="url(#blur2)"/>` + groundFromAbove(t);
  const px = 330 + T * 18, py = 640 + k * k * 260, ang = 16 * k;
  s += `<g transform="translate(${px},${py}) rotate(${ang}) scale(.95)">` + Array.from({ length: 7 }, (_, q) => `<path d="M${-280 + q * 12},${-40 + q * 12} q140,-8 300,0" stroke="#cfe2ff" stroke-width="1.4" fill="none" opacity="${(.4 * (1 - k)).toFixed(2)}" stroke-dasharray="26 18" stroke-dashoffset="${-t * 260}"/>`).join('') + airliner() + `</g>`;
  for (let i = 0; i < 6; i++) { const r = RS(i + 40), x = 90 + r() * 540, y = 470 + r() * 160 + k * k * (300 + 120 * r()), fl = k > .3 ? t * 3 + i : t * 14 + i, rot = k * t * 220 * (r() - .5); s += bird(x + T * 10 * (r() - .5), y, .9 + .4 * r(), fl, rot); }
  F.ov = ''; return s;
}
// 4: the gauge and stopwatch over the airless street
function scenePressure(t) {
  const k = ease(ramp(t, WS(4, 2) - .2, WS(4, 4) + .4)), sec = Math.min(15, Math.max(0, (t - WS(4, 5)) * 8));
  let s = bareStreet(t, { id: 'a4', green: 1, sky: blackSky, sunGlow: 0, harsh: 1, afterSky: stars(1, t) }) + `<rect width="720" height="1280" fill="#000" opacity=".45"/>`;
  s += `<g transform="translate(220,700)"><circle r="134" fill="#000" opacity=".4" filter="url(#blur2)"/><circle r="130" fill="#f4f4f0"/><circle r="130" fill="none" stroke="#333" stroke-width="10"/><circle r="122" fill="none" stroke="#bbb" stroke-width="2"/><path d="M-100,0 A100,100 0 0 1 100,0" stroke="#43a047" stroke-width="14" fill="none"/>` + [0, .25, .5, .75, 1].map(v => `<text x="${-Math.cos(Math.PI * v) * 76}" y="${-Math.sin(Math.PI * v) * 76 + 8}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="18" fill="#333">${v}</text>`).join('') +
    `<path d="M0,0 L${-Math.cos(Math.PI * (1 - k)) * 96},${-Math.sin(Math.PI * (1 - k)) * 96}" stroke="#c62828" stroke-width="6" stroke-linecap="round"/><circle r="10" fill="#333"/><text y="60" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#333">ضغط الهواء</text></g>`;
  const an = Math.PI * 2 * sec / 60;
  s += `<g transform="translate(520,700)"><circle r="114" fill="#000" opacity=".4" filter="url(#blur2)"/><circle r="110" fill="#f4f4f4"/><circle r="110" fill="none" stroke="#333" stroke-width="9"/><rect x="-14" y="-142" width="28" height="26" rx="5" fill="#333"/><path d="M0,0 L0,-90 A90,90 0 ${an > Math.PI ? 1 : 0},1 ${Math.sin(an) * 90},${-Math.cos(an) * 90}Z" fill="#e53935" opacity=".35"/><rect x="-3" y="-94" width="6" height="94" fill="#c62828" transform="rotate(${an * 180 / Math.PI})"/><circle r="8" fill="#333"/><text y="56" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#222">${String(Math.floor(sec)).padStart(2, '0')}s</text></g>`;
  F.ov = ''; return s;
}
// rugged mountains: a fractal ridge, sunlit left faces, black shaded right faces, gullies and rock texture
function ridgeP(x0, x1, yb, amp, seed, n0 = 7) {
  const r = RS(seed); let h = Array.from({ length: n0 + 1 }, () => r()); let sc = .5;
  for (let lv = 0; lv < 6; lv++) { const nh = []; for (let i = 0; i < h.length - 1; i++) nh.push(h[i], (h[i] + h[i + 1]) / 2 + (r() - .5) * sc); nh.push(h[h.length - 1]); h = nh; sc *= .55; }
  return h.map((v, i) => [x0 + (x1 - x0) * i / (h.length - 1), yb - amp * Math.max(.05, v)]);
}
function mountains(yb, amp, seed, lit, shade, n0) {
  const p = ridgeP(-30, 750, yb, amp, seed, n0), r = RS(seed + 77), body = `M-30,${yb + 30} L${p.map(PT).join(' L')} L750,${yb + 30}Z`, W = Math.max(3, Math.floor(p.length / (n0 * 2.2)));
  let s = `<path d="${body}" fill="${lit}"/><path d="${body}" fill="${lit}" filter="url(#reliefR)" opacity=".85"/>`;
  const pk = []; for (let i = 1; i < p.length - 1; i++) { let top = true; for (let q = Math.max(0, i - W); q <= Math.min(p.length - 1, i + W); q++) if (q !== i && p[q][1] <= p[i][1]) { top = false; break; } if (top) pk.push(i); }
  pk.forEach((i, n) => {
    const lim = n + 1 < pk.length ? pk[n + 1] : p.length - 1; let j = i; for (let q = i; q <= lim; q++) if (p[q][1] > p[j][1]) j = q;
    if (j <= i + 1) return;
    const P = p[i], V = p[j], H = yb + 30 - P[1], sp = []; for (let k = 1; k <= 6; k++) sp.push([P[0] + (V[0] - P[0]) * (.06 + .28 * k / 6) + (r() - .5) * 10, P[1] + H * k / 6]);
    s += `<path d="M${p.slice(i, j + 1).map(PT).join(' L')} L${(V[0] - (V[0] - P[0]) * .25).toFixed(1)},${yb + 30} L${sp.reverse().map(PT).join(' L')}Z" fill="${shade}" opacity=".78"/>`;
    for (let g = 0; g < 2; g++) { let x = P[0] - 6 - g * 10, y = P[1] + 10 + g * 8, d = `M${x.toFixed(1)},${y.toFixed(1)}`; for (let k = 0; k < 5; k++) { x -= (4 + r() * 8) * H / 160; y += H / 7; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } s += `<path d="${d}" stroke="${shade}" stroke-width="${1 + H / 140}" fill="none" opacity=".18"/>`; }
  });
  s += `<path d="${body}" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  return s;
}
// 5: the sea boils, then evaporation chills it and ice spreads from the shore towards us
function sceneBoil(t) {
  const boil = ease(ramp(t, WS(5, 1) - .3, WS(5, 2) + .4)) * (1 - ease(ramp(t, WS(5, 11) - .2, L(5).end))), ice = ease(ramp(t, WS(5, 10), L(5).end + .3)), HY = 868;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="seaB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e2028"/><stop offset=".5" stop-color="#143240"/><stop offset="1" stop-color="#1c4656"/></linearGradient>` +
    `<filter id="wavyR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .09" numOctaves="2" seed="${3 + Math.floor(t * 8) % 4}"/><feDisplacementMap in="SourceGraphic" scale="${14 + 30 * boil}" xChannelSelector="R" yChannelSelector="G"/></filter>` +
    `<linearGradient id="iceG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab0be"/><stop offset="1" stop-color="#dae6ee"/></linearGradient><clipPath id="seaC"><rect y="${HY}" width="720" height="${1290 - HY}"/></clipPath><clipPath id="iceC"><rect y="${HY - 2}" width="720" height="${ice * (1300 - HY)}"/></clipPath></defs>` +
    `<rect width="720" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="150" cy="470" r="26" fill="#fff"/><circle cx="150" cy="470" r="34" fill="#fff" opacity=".4" filter="url(#blur2)"/>`;
  const mt = mountains(846, 230, 61, '#8a7a68', '#1a1612', 6) + mountains(866, 110, 62, '#6e6052', '#141008', 9);
  s += mt + `<path d="M-20,858 Q180,850 360,856 T740,854 L740,${HY + 4} L-20,${HY + 4}Z" fill="#9a8a72"/><path d="M-20,858 Q180,850 360,856 T740,854 L740,${HY + 4} L-20,${HY + 4}Z" fill="#000" filter="url(#pebT)" opacity=".6"/>`;
  s += `<rect y="${HY}" width="720" height="${1290 - HY}" fill="url(#seaB)"/>`;
  s += `<g clip-path="url(#seaC)"><g opacity=".28" filter="url(#wavyR)" transform="translate(0,${2 * HY}) scale(1,-1)">${mt}</g></g>`;
  // perspective wave texture: light crests and dark troughs, bigger towards us; churned up while boiling
  for (let k = 0; k < 70; k++) { const u = Math.pow(k / 69, 1.8), y = HY + 4 + u * (1290 - HY), r = RS(k + 500), n = 9 + Math.floor(8 * (1 - u));
    for (let i = 0; i < n; i++) { const len = (30 + 220 * u) * (.4 + r()), x = r() * 820 - 60 + Math.sin(t * .8 + i + k) * (3 + 10 * u) * (1 + 3 * boil), a = (.6 + 3 * u) * (1 + 3 * boil * Math.abs(Math.sin(t * 7 + i * 3 + k))), y2 = y + (r() - .5) * 6 * u;
      s += `<path d="M${x.toFixed(1)},${(y2 + 1.5 + 2 * u).toFixed(1)} q${len * .25},${a} ${len * .5},0 t${len * .5},0" stroke="#03090e" stroke-width="${(.8 + 2.4 * u).toFixed(2)}" fill="none" opacity=".5"/><path d="M${x.toFixed(1)},${y2.toFixed(1)} q${len * .25},${-a} ${len * .5},0 t${len * .5},0" stroke="${r() > .5 ? '#4a7a8a' : '#6a96a4'}" stroke-width="${(.6 + 1.6 * u).toFixed(2)}" fill="none" opacity="${(.22 + .2 * boil).toFixed(2)}"/>`; } }
  // the Sun's glitter path on the water
  for (let k = 0; k < 40; k++) { const u = Math.pow(k / 39, 1.6), y = HY + 4 + u * (1290 - HY), r = RS(k + 700), sp = 14 + 190 * u, n = 3 + Math.floor(5 * u);
    for (let i = 0; i < n; i++) { const g = (r() + r() + r()) / 1.5 - 1, x = 150 + g * sp, fl = .5 + .5 * Math.sin(t * (6 + 4 * r()) + i * 2 + k), w = 3 + 22 * u * r();
      s += `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${1 + 2 * u}" rx="1" fill="#fff" opacity="${(fl * (1 - Math.abs(g) * .6) * (1 - ice)).toFixed(2)}"/>`; } }
  // boiling: domes rise and burst into spray
  for (let i = 0; i < 110; i++) { const r = RS(i + 7), u = Math.pow(r(), 1.4), y0 = HY + 10 + u * (1270 - HY), x = r() * 720, ph = pmod(t * (1.6 + r() * 2.4) + r(), 1), R = (3 + r() * 9) * (.3 + u * 1.4), o = boil * (1 - ice);
    if (o <= 0) break;
    if (ph < .75) { const rr = R * (.3 + ph); s += `<path d="M${x - rr},${y0} A${rr},${rr * .8} 0 0 1 ${x + rr},${y0}Z" fill="#2a5a6a" opacity="${(o * .9).toFixed(2)}"/><path d="M${x - rr * .8},${y0 - rr * .3} A${rr * .8},${rr * .6} 0 0 1 ${x + rr * .2},${y0 - rr * .7}" stroke="#d8eef4" stroke-width="${.8 + u}" fill="none" opacity="${(o * .9).toFixed(2)}"/>`; }
    else { const v = (ph - .75) / .25; for (let q = 0; q < 5; q++) { const a = -Math.PI * (.15 + .7 * q / 4); s += `<circle cx="${x + Math.cos(a) * R * 1.6 * v}" cy="${y0 + Math.sin(a) * R * 2.2 * v + R * 2 * v * v}" r="${.6 + u * 1.6}" fill="#e8f6fa" opacity="${(o * (1 - v)).toFixed(2)}"/>`; } } }
  // vapour leaving the surface, lit from the left
  for (let i = 0; i < 16; i++) { const r = RS(i + 50), ph = pmod(t * .3 + r(), 1), x = r() * 720 + ph * 50, y = HY + 40 + r() * 240 - ph * 380; s += `<ellipse cx="${x}" cy="${y}" rx="${50 + ph * 150}" ry="${16 + ph * 50}" fill="#eef4f8" opacity="${(.32 * boil * (1 - ph) * (1 - ice)).toFixed(2)}" filter="url(#soft)"/><ellipse cx="${x + 20 + ph * 30}" cy="${y + 10}" rx="${30 + ph * 110}" ry="${10 + ph * 34}" fill="#8a9aa6" opacity="${(.18 * boil * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; }
  // ice: a frosted sheet with pressure ridges and cracks, spreading out from the shore; sparkles and a broad sun sheen
  if (ice > 0) { s += `<g clip-path="url(#iceC)"><rect y="${HY}" width="720" height="${1290 - HY}" fill="url(#iceG)"/><rect y="${HY}" width="720" height="${1290 - HY}" fill="#fff" filter="url(#stainD)" opacity=".55"/><rect y="${HY}" width="720" height="${1290 - HY}" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
      `<ellipse cx="150" cy="${HY + 260}" rx="160" ry="200" fill="#fff" opacity=".35" filter="url(#soft)"/>` + cracks(HY + 6, 1290, 1, 77, -20, 740, '#6a8aa0') +
      Array.from({ length: 6 }, (_, q) => { const yy = HY + 30 + Math.pow(q / 5, 1.6) * 360; return `<path d="M-20,${yy} q180,${-6 - q * 2} 380,${4} t380,-2" stroke="#f4faff" stroke-width="${2 + q}" fill="none" opacity=".6"/><path d="M-20,${yy + 3 + q} q180,${-6 - q * 2} 380,${4} t380,-2" stroke="#5a7488" stroke-width="${1 + q * .6}" fill="none" opacity=".5"/>`; }).join('') +
      Array.from({ length: 40 }, (_, q) => { const r = RS(q + 1200); return `<circle cx="${r() * 720}" cy="${HY + Math.pow(r(), 1.3) * 420}" r="${1 + r() * 1.6}" fill="#fff" opacity="${(.5 + .5 * Math.sin(t * 5 + q)).toFixed(2)}"/>`; }).join('') + `</g>`;
    s += `<rect y="${HY - 2 + ice * (1300 - HY) - 3}" width="720" height="6" fill="#eef6fa" opacity="${ice < 1 ? .8 : 0}" filter="url(#blur2)"/>`; }
  F.ov = ''; return s;
}
// 7: the same desert landscape, split: (left) baked under a black sky with hard black shadows, (right) frozen at night, frost on every rock
const ROCKDEF = `<linearGradient id="rkD" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="#e2c69c"/><stop offset=".45" stop-color="#9a7c58"/><stop offset=".75" stop-color="#3a2a1c"/><stop offset="1" stop-color="#1a120a"/></linearGradient>` +
  `<linearGradient id="rkN" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="#6a7686"/><stop offset=".5" stop-color="#2e3642"/><stop offset="1" stop-color="#0e1218"/></linearGradient>` +
  `<filter id="frostT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="17"/><feColorMatrix values="0 0 0 0 .92  0 0 0 0 .96  0 0 0 0 1  0 0 0 -4.2 2.3"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="frostP" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="3" seed="27"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .92  0 0 0 0 1  0 0 0 -3.2 2.0"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
function rockR(x, y, sc, seed, day) {
  const r = RS(seed), n = 12, w = 32 * sc * (.8 + .5 * r()), h = 22 * sc * (.7 + .6 * r()), p = [];
  for (let i = 0; i < n; i++) { const a = Math.PI + i / n * Math.PI * 2, rr = .82 + .3 * r(); p.push([x + Math.cos(a) * w * rr, y - h * .45 + Math.sin(a) * h * rr * (Math.sin(a) > 0 ? .45 : 1)]); }
  const d = `M${p.map(PT).join(' L')}Z`;
  let s = day ? `<path d="M${x - w * .7},${y + 1} Q${x + w * 1.2},${y - 2} ${x + w * 2.6},${y + h * .25} Q${x + w * 1.4},${y + h * .5} ${x - w * .5},${y + h * .35}Z" fill="#000" opacity=".9"/>` : `<ellipse cx="${x}" cy="${y + h * .2}" rx="${w * 1.05}" ry="${h * .22}" fill="#000" opacity=".45"/>`;
  s += `<path d="${d}" fill="url(#${day ? 'rkD' : 'rkN'})"/><path d="${d}" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  s += day ? `<path d="M${p.slice(1, 6).map(PT).join(' L')}" stroke="#f4e2c0" stroke-width="${1.2 * sc}" fill="none" opacity=".7"/>` : `<path d="M${p.slice(1, 7).map(PT).join(' L')} Q${x},${y - h * .9} ${PT(p[1])}Z" fill="#eef6ff" opacity=".8"/><path d="${d}" fill="#fff" filter="url(#frostT)" opacity=".3"/>`;
  return s;
}
function terrain(t, day) {
  const gnd = `M-20,890 Q180,876 360,884 T740,880 L740,1290 L-20,1290Z`;
  let s = `<defs>${ROCKDEF}</defs>` + mountains(882, 150, 71, day ? '#b09070' : '#2c3440', day ? '#2a1e14' : '#06080c', 6);
  s += `<path d="${gnd}" fill="${day ? '#c8a878' : '#2a3240'}"/><path d="${gnd}" fill="#000" filter="url(#pebT)" opacity="${day ? .45 : .5}"/>`;
  s += day ? cracks(900, 1290, 1, 81, -20, 740, '#7a5a3a') : `<path d="${gnd}" fill="#fff" filter="url(#frostP)" opacity=".55"/><path d="${gnd}" fill="#fff" filter="url(#frostT)" opacity=".18"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + 600), u = Math.pow(i / 29, 1.5), y = 904 + u * 340, x = pmod(i * .618 + .13, 1) * 780 - 30 + (r() - .5) * 40; s += rockR(x, y, .3 + u * 1.6 * (.6 + .6 * r()), i + 600, day); }
  if (!day) for (let i = 0; i < 60; i++) { const r = RS(i + 1400); s += `<circle cx="${r() * 720}" cy="${900 + Math.pow(r(), 1.4) * 380}" r="${.8 + r() * 1.6}" fill="#fff" opacity="${(.4 + .6 * Math.abs(Math.sin(t * 3 + i))).toFixed(2)}"/>`; }
  else for (let i = 0; i < 7; i++) s += `<path d="M-20,${900 + i * 22} q90,${Math.sin(t * 5 + i) * 5} 190,0 t190,0 t190,0 t190,0" stroke="#fff" stroke-width="1.5" fill="none" opacity=".12"/>`;
  return s;
}
function sceneMoonlike(t) {
  let s = `<defs>${RDEF}${RDEF2}<clipPath id="cL7"><rect width="358" height="1280"/></clipPath><clipPath id="cR7"><rect x="362" width="358" height="1280"/></clipPath></defs>`;
  s += `<g clip-path="url(#cL7)"><rect width="720" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="260" cy="420" r="30" fill="#fff"/><circle cx="260" cy="420" r="40" fill="#fff" opacity=".45" filter="url(#blur2)"/>` + terrain(t, 1) + `<rect y="880" width="360" height="410" fill="#ff7a2a" opacity=".1"/>` +
    `<text x="180" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#ffb060" style="paint-order:stroke" stroke="#000" stroke-width="5">النهار: حارق</text></g>`;
  s += `<g clip-path="url(#cR7)"><rect width="720" height="1280" fill="#000"/>` + stars(1, t) + stars(.6, t + 2) + `<path d="M380,300 Q560,520 740,700" stroke="#cfd8ff" stroke-width="90" fill="none" opacity=".07" filter="url(#haze)"/>` + terrain(t, 0) +
    `<text x="540" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#9ccaff" style="paint-order:stroke" stroke="#000" stroke-width="5">الليل: متجمّد</text></g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  s += thermoC(90, 520, 860, 38) + thermoC(450, 520, 860, -28);
  F.ov = ''; return s;
}
