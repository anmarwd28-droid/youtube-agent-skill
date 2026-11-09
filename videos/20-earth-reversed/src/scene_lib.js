// shared realistic helpers: aerial ground, airliner, birds, rugged mountains, rocks
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
function ridgeP(x0, x1, yb, amp, seed, n0 = 7) {
  const r = RS(seed); let h = Array.from({ length: n0 + 1 }, () => r()); let sc = .5;
  for (let lv = 0; lv < 6; lv++) { const nh = []; for (let i = 0; i < h.length - 1; i++) nh.push(h[i], (h[i] + h[i + 1]) / 2 + (r() - .5) * sc); nh.push(h[h.length - 1]); h = nh; sc *= .55; }
  return h.map((v, i) => [x0 + (x1 - x0) * i / (h.length - 1), yb - amp * Math.max(.05, v)]);
}
function mountains(yb, amp, seed, lit, shade, n0, snowAt = 0) {
  const p = ridgeP(-30, 750, yb, amp, seed, n0), r = RS(seed + 77), body = `M-30,${yb + 30} L${p.map(PT).join(' L')} L750,${yb + 30}Z`, W = Math.max(3, Math.floor(p.length / (n0 * 2.2)));
  let s = `<path d="${body}" fill="${lit}"/><path d="${body}" fill="${lit}" filter="url(#reliefR)" opacity=".85"/>`;
  if (snowAt > 0) { const rs = RS(seed + 5), id = 'snw' + seed; let ln = `M-40,-10 L760,-10`; for (let x = 760; x >= -40; x -= 14) ln += ` L${x},${(yb - amp * snowAt + (rs() - .5) * amp * .22).toFixed(1)}`; ln += 'Z';
    s += `<defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs><g clip-path="url(#${id})"><path d="${ln}" fill="#f2f5fa"/><path d="${ln}" fill="#9aa8b8" filter="url(#reliefR)" opacity=".35"/></g>`; }
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
