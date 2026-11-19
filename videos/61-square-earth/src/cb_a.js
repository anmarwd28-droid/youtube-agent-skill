// ===================== "what if the Earth were square (a cube)?" (Short #61) =====================
// 3D module gl3d_cb.js (made by mk_cb.py): disc.tet (sphere -> cube of the same volume, half side 0.806 R), disc.pool (six round seas), disc.quake (glowing edges).
// Shader frame: faces centred on the poles and on the equator at shader lon 0, 90, 180, -90 (geographic = shader - 180). Corners at lat ±35.264, shader lon ±45, ±135.
const CBH = .806, CBHV = CBH * Math.sqrt(3);
const CBV = []; [35.2644, -35.2644].forEach(la => [45, 135, -45, -135].forEach(lo => CBV.push([la, lo])));
const CBF = [[90, 0], [-90, 0], [0, 0], [0, 90], [0, 180], [0, -90]];
const CBD = () => TMDEFS2() + CBDEF + ASDEF;
const cbP = (G, ll, h) => { const p = proj3(G.cam, geo3(ll[0], ll[1], G.spin, h)); return [p[0], p[1]]; };
const unit = ll => geo3(ll[0], ll[1], 0, 1);
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
// how much a face (shader lat/lon of its centre) faces the camera (> 0 = front)
function faceV(G, f) { const n = geo3(f[0], f[1], G.spin, 1), c = G.cam.pos; return dot3(n, [c[0] - n[0] * CBH, c[1] - n[1] * CBH, c[2] - n[2] * CBH]) / Math.hypot(c[0] - n[0] * CBH, c[1] - n[1] * CBH, c[2] - n[2] * CBH); }
// a corner is visible when one of its three faces is a front face
const cornerV = (G, v) => Math.max(...CBF.filter(f => dot3(unit(f), unit(v)) > .1).map(f => faceV(G, f)));
function cube3(t, o) { const G = gW(t, o); Object.assign(F.w.disc, { tet: o.tet ?? 1, pool: o.pool || 0, quake: o.quake || 0 }); return G; }
// a point on the cube face with centre f, offset by angles (a, b) in radians along the face
const unitS = ll => { const la = ll[0] * Math.PI / 180, lo = ll[1] * Math.PI / 180; return [Math.cos(la) * Math.sin(lo), -Math.cos(la) * Math.cos(lo), Math.sin(la)]; };
function onFace(G, f, a, b) { const n = unitS(f), u = Math.abs(n[2]) > .9 ? [1, 0, 0] : [0, 0, 1], e1 = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]], l1 = Math.hypot(...e1), E1 = e1.map(x => x / l1), E2 = [n[1] * E1[2] - n[2] * E1[1], n[2] * E1[0] - n[0] * E1[2], n[0] * E1[1] - n[1] * E1[0]];
  const p = [0, 1, 2].map(i => (n[i] + E1[i] * Math.tan(a) + E2[i] * Math.tan(b)) * CBH), c = Math.cos(G.spin), s = Math.sin(G.spin), w = [p[0] * c - p[1] * s, p[2], -(p[0] * s + p[1] * c)], q = proj3(G.cam, w); return [q[0], q[1]]; }

// ---------- 0: the Earth folds into a cube ----------
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 3) - .1, WS(0, 6) + .3));
  cube3(t, { d: lerp(9.6, 12.6, k), el: lerp(.22, .42, k), lon: 10 + 30 * k + t * 2, clouds: .4, lights: .3, tet: k, tg: [0, lerp(0, .12, k), 0] });
  F.ov = ''; return space(t);
}
// ---------- 1: six square faces, the same volume as today's Earth, a side of ~10,300 km ----------
function sceneShape(t) {
  const t0 = S0(1) - .2, T = t - t0, ca = ease(ramp(t, WS(1, 1) - .2, WS(1, 1) + .4)) * (1 - ease(ramp(t, WS(1, 4), WS(1, 4) + .4)));
  const lon = 10 + 30 + (S0(1) - .2) * 2 + T * 9;
  const G = cube3(t, { d: 12.6, el: .42, lon, clouds: .4, lights: .3, tg: [0, .12, 0] });
  let o = '';
  if (ca > 0) { const [cx, cy] = G.c0;
    o += `<g opacity="${ca.toFixed(2)}"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${G.R.toFixed(1)}" fill="none" stroke="#7fd4ff" stroke-width="3" stroke-dasharray="10 8"/>${lbl(cx, cy + G.R + 95, 'الأرضُ اليوم', 1, '#7fd4ff', 28)}</g>`; }
  // gold dots on the visible corners
  const fa = ease(ramp(t, t0 + .3, t0 + .9));
  CBV.forEach(v => { const vv = cornerV(G, v); if (vv <= 0) return; const [x, y] = cbP(G, v, CBHV); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#f4c76b" opacity="${(fa * clamp(vv * 4)).toFixed(2)}"/>`; });
  // one bottom front edge, measured: the two lowest visible bottom corners
  const ea = ease(ramp(t, WS(1, 5) - .2, WS(1, 5) + .4));
  if (ea > 0) { const B = CBV.slice(4).map(v => [v, cornerV(G, v), cbP(G, v, CBHV)]).filter(q => q[1] > 0).sort((a, b) => b[2][1] - a[2][1]);
    if (B.length >= 2) { const A = B[0][2], C = B[1][2], mx = (A[0] + C[0]) / 2, my = (A[1] + C[1]) / 2;
      o += `<g opacity="${ea.toFixed(2)}"><path d="M${A[0].toFixed(1)},${A[1].toFixed(1)} L${C[0].toFixed(1)},${C[1].toFixed(1)}" stroke="#f4c76b" stroke-width="5" stroke-linecap="round"/>${lbl(mx, my + 56, '≈ ١٠٬٣٠٠ كم', 1, '#f4c76b', 32)}</g>`; } }
  F.ov = o; return space(t);
}
// ---------- 2: gravity pulls to the centre; the middle of each face is the closest point (a true cross-section through the face centres) ----------
function xsecC(t, cx, cy, S, o = {}) {
  const sq = `M${cx - S},${cy - S} H${cx + S} V${cy + S} H${cx - S}Z`;
  let s = `<defs><clipPath id="xsC"><path d="${sq}"/></clipPath></defs>`;
  // air and water collect over the face centres: inside a circle around the centre (depth exaggerated so it shows)
  s += `<g opacity="${(o.air ?? 0).toFixed(2)}"><clipPath id="airC"><circle cx="${cx}" cy="${cy}" r="${(S * 1.13).toFixed(1)}"/></clipPath><g clip-path="url(#airC)"><rect x="0" y="0" width="720" height="1280" fill="#6ab4ff" opacity=".32"/></g></g>`;
  s += `<g opacity="${(o.sea ?? 0).toFixed(2)}"><clipPath id="seaC"><circle cx="${cx}" cy="${cy}" r="${(S * 1.055).toFixed(1)}"/></clipPath><g clip-path="url(#seaC)"><rect x="0" y="0" width="720" height="1280" fill="#2a6ab0"/>` +
    Array.from({ length: 4 }, (_, i) => { const a = i * Math.PI / 2, x = cx + Math.cos(a) * S * 1.03, y = cy + Math.sin(a) * S * 1.03; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(i % 2 ? S * .26 : 4)}" ry="${(i % 2 ? 4 : S * .26)}" fill="#bfe4ff" opacity=".35"/>`; }).join('') + `</g></g>`;
  s += `<path d="${sq}" fill="url(#mantG)"/><g clip-path="url(#xsC)"><rect x="0" y="0" width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/><circle cx="${cx}" cy="${cy}" r="${(S * .55).toFixed(1)}" fill="url(#coreG)"/>` +
    `<path d="${sq}" fill="none" stroke="#a87a5a" stroke-width="${(S * .12).toFixed(1)}"/></g><path d="${sq}" fill="none" stroke="#d8b898" stroke-width="2"/>`;
  const ga = o.grav ?? 0;
  if (ga > 0) { const pts = []; [-.66, 0, .66].forEach(f => { pts.push([f, -1], [f, 1], [-1, f], [1, f]); }); pts.push([-1, -1], [1, -1], [-1, 1], [1, 1]);
    pts.forEach(([x, y], i) => { const sx = cx + x * S, sy = cy + y * S, dx = cx - sx, dy = cy - sy, p = pmod(t * .8 + i * .13, 1), a0 = .1 + p * .25;
      s += `<g opacity="${(ga * (1 - .7 * Math.max(o.dist ?? 0, o.edge ?? 0)) * Math.sin(p * Math.PI)).toFixed(2)}">${arrowT(sx + dx * a0, sy + dy * a0, sx + dx * (a0 + .3), sy + dy * (a0 + .3), '#fff', 3)}</g>`; }); }
  s += `<circle cx="${cx}" cy="${cy}" r="7" fill="#fff"/>`;
  const da = o.dist ?? 0, va = o.edge ?? 0;
  if (da > 0) s += `<g opacity="${da.toFixed(2)}"><path d="M${cx},${cy} V${cy - S}" stroke="#f4c76b" stroke-width="4"/><circle cx="${cx}" cy="${cy - S}" r="8" fill="#f4c76b"/>${panel(cx - 196, cy - S * .5 - 38, 170, 56)}${lbl(cx - 111, cy - S * .5 + 2, '٥٬١٠٠ كم', 1, '#f4c76b', 30)}${lbl(cx, cy - S - 92, 'وسطُ الوجه', 1, '#f4c76b', 26)}</g>`;
  if (va > 0) s += `<g opacity="${va.toFixed(2)}"><path d="M${cx},${cy} L${cx + S},${cy + S}" stroke="#ff8a6a" stroke-width="4" stroke-dasharray="10 7"/><circle cx="${cx + S}" cy="${cy + S}" r="8" fill="#ff8a6a"/>${panel(cx - 40, cy + S * .62 - 38, 170, 56)}${lbl(cx + 45, cy + S * .62 + 2, '٧٬٣٠٠ كم', 1, '#ff8a6a', 30)}${lbl(cx + S - 30, cy + S + 56, 'الحافّة', 1, '#ff8a6a', 26)}</g>`;
  return s;
}
function sceneGrav(t) {
  const t0 = S0(2) - .2, a = ease(ramp(t, t0, t0 + .5));
  const X = xsecC(t, 360, 780, 210, { grav: ease(ramp(t, WS(2, 0) - .2, WS(2, 0) + .4)), dist: ease(ramp(t, WS(2, 6) - .2, WS(2, 6) + .4)), edge: ease(ramp(t, WS(2, 10) - .2, WS(2, 10) + .4)), sea: ease(ramp(t, WS(2, 10) + .3, WS(2, 12) + .4)), air: ease(ramp(t, WS(2, 10) + .3, WS(2, 12) + .4)) * .8 });
  let s = `<defs>${CBD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>${starsK(160, 5)}<g opacity="${a.toFixed(2)}">${X}</g>`;
  s += `<g opacity="${(a * .9).toFixed(2)}">${lbl(360, 1150, 'مقطعٌ في الأرضِ المكعّبة', 1, '#cfd8e8', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: the oceans run off the edges into six round seas, deeper than 80 km ----------
function depthPanel(a) {
  if (a <= 0) return ''; const x0 = 90, y0 = 1235, H = 190, k = H / 90;
  let g = panel(60, y0 - H - 92, 600, H + 130);
  g += lbl(360, y0 - H - 50, 'أعمقُ بحر', 1, '#cfd8e8', 26);
  [[230, 11, 'اليوم', '#7fb8e8'], [490, 86, 'في المكعّب', '#3a8ad8']].forEach(([x, d, n, c], i) => { const h = d * k * (i ? ease(clamp(a * 1.4 - .2)) : 1);
    g += `<rect x="${x - 50}" y="${y0 - H}" width="100" height="${H}" fill="#1a2236"/><rect x="${x - 50}" y="${y0 - H}" width="100" height="${h.toFixed(1)}" fill="${c}"/><rect x="${x - 50}" y="${y0 - H}" width="100" height="${h.toFixed(1)}" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
      `<path d="M${x - 50},${y0 - H} H${x + 50}" stroke="#d8c8a0" stroke-width="3"/>` + lbl(x, y0 + 32, n, 1, '#cfd8e8', 24) + lbl(x, y0 - H + Math.max(h, 30) + (h > 60 ? -14 : 32), `${AR4(d)} كم`, 1, '#fff', 28); });
  return `<g opacity="${a.toFixed(2)}">${g}</g>`;
}
function scenePool(t) {
  const t0 = S0(3) - .2, T = t - t0, pl = ease(ramp(t, WS(3, 0) - .2, WS(3, 8) + .2)), dp = ease(ramp(t, WS(3, 9) - .3, WS(3, 9) + .4));
  cube3(t, { d: lerp(12.6, 11.2, ease(clamp(T / 6))), el: .45, lon: 30 + 6 * Math.sin(T * .3), clouds: .35, lights: .2, pool: pl, tg: [0, lerp(.12, -.42, dp), 0] });
  F.ov = depthPanel(dp); return space(t);
}
// ---------- 4: the air pools there too: only a narrow ring of life around each sea ----------
function sceneRing(t) {
  const t0 = S0(4) - .2, T = t - t0, la = ease(ramp(t, WS(4, 9) - .3, WS(4, 10) + .2));
  const lon = 2 + T * .8, sp = .3 - (lon + 180) * Math.PI / 180, fcW = geo3(0, 180, sp, CBH);
  const G = cube3(t, { d: lerp(2.55, 2.3, ease(clamp(T / 6))), el: .3, lon, clouds: .35, lights: .2, pool: 1, tg: [fcW[0], fcW[1] - .02, fcW[2]] });
  let o = '';
  if (la > 0) { const f = [0, 180], P = onFace(G, f, 0, .258), Q = onFace(G, f, 0, .258), c = onFace(G, f, 0, 0);
    // a gold ring that traces the green shore
    let d = ''; for (let i = 0; i <= 72; i++) { const a = i / 72 * 6.2832, p = onFace(G, f, .262 * Math.sin(a), .262 * Math.cos(a)); d += (i ? ' L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }
    o += `<g opacity="${la.toFixed(2)}"><path d="${d}Z" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="9 7"/>${panel(110, 1050, 500, 80)}${lbl(360, 1102, 'عرضُها عشراتُ الكيلومترات فقط', 1, '#f4c76b', 28)}</g>`; }
  F.ov = o; return space(t);
}
// ---------- 5: walk away from the shore: perfectly flat ground that feels like an endless mountain ----------
function sceneSlope(t) {
  const t0 = S0(5) - .2, T = t - t0, ga = ease(ramp(t, WS(5, 7) - .3, WS(5, 9)));
  const tilt = lerp(10, 24, ease(clamp(T / 6)));
  let s = `<defs>${CBD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyT)"/>${starsK(80, 9, .6)}`;
  s += `<rect x="-20" y="1018" width="300" height="320" fill="url(#seaT)"/><rect x="-20" y="1018" width="300" height="6" fill="#cfe6f4" opacity=".35"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${pmod(i * 47 + T * 12, 300) - 20},${1040 + i * 30} h${24 + i * 3}" stroke="#cfe6f4" stroke-width="2" opacity=".35"/>`).join('');
  const x0 = 180, y0 = 1010, ang = tilt * Math.PI / 180, x1 = 760, y1 = y0 - (x1 - x0) * Math.tan(ang);
  const d = `M${x0 - 40},1320 L${x0 - 40},${y0 + 14} Q${x0},${y0} ${x0 + 60},${y0 - 60 * Math.tan(ang * .7)} L${x1},${y1} L${x1},1320Z`;
  s += litRock(d, 'sl', '#9a8a74', '#5a4a3a', 11, { fx: .02, fy: .012, sc: 4 });
  // a thin green shore band at the bottom of the slope, fading up into bare rock
  // a narrow grassy shore at the bottom of the slope, fading up into bare rock
  { const band = `M${x0 - 40},1320 L${x0 - 40},${y0 + 14} Q${x0},${y0} ${x0 + 60},${y0 - 60 * Math.tan(ang * .7)} L${x0 + 230},${y0 - 230 * Math.tan(ang)} L${x0 + 230},1320Z`;
    s += `<defs><linearGradient id="shG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#fff" stop-opacity=".85"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="shM" maskContentUnits="userSpaceOnUse"><rect x="${x0 - 40}" y="0" width="270" height="1320" fill="url(#shG)"/></mask></defs>` +
      `<g mask="url(#shM)">${litRock(band, 'gr', '#6a9a3a', '#2e5a1e', 23, { fx: .05, fy: .09, sc: 3, k1: 1.25 })}</g>`; }
  s += `<path d="M${x0 - 40},${y0 + 14} Q${x0},${y0} ${x0 + 60},${y0 - 60 * Math.tan(ang * .7)} L${x1},${y1}" stroke="#d8c8a8" stroke-width="3" fill="none" opacity=".5"/>`;
  { const r = RS(4); for (let i = 0; i < 22; i++) { const f = r(), x = x0 + 120 + f * (x1 - x0 - 120), y = y0 - (x - x0) * Math.tan(ang) + 10 + r() * 200; s += rockS(x, y, .25 + r() * .3, i + 3); } }
  { const r = RS(8); for (let i = 0; i < 40; i++) { const x = x0 - 30 + Math.pow(r(), 1.4) * 250, y = y0 - (x - x0) * Math.tan(ang) + 6 + r() * 60; s += tuft(x, y, 10 + r() * 10, i); } }
  const px = 400 + T * 6, py = y0 - (px - x0) * Math.tan(ang) + 4;
  s += man(px, py, .62, 1, 3, { walk: T * 2.4, amp: .45, lean: 6 + tilt * .5 });
  if (ga > 0) { const ax = 470, ay = y0 - (ax - x0) * Math.tan(ang);
    s += `<g opacity="${ga.toFixed(2)}"><path d="M${ax},${ay} H${ax + 130}" stroke="#fff" stroke-width="2.4" stroke-dasharray="8 6"/><path d="M${ax + 100},${ay} A100,100 0 0 0 ${(ax + 100 * Math.cos(ang)).toFixed(1)},${(ay - 100 * Math.sin(ang)).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none"/></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: on the edge: a knife-edge ridge, 45° slopes on both sides, above the air ----------
function sceneEdge(t) {
  const t0 = S0(6) - .2, T = t - t0, aa = ease(ramp(t, WS(6, 9) - .3, WS(6, 10) + .2));
  const cx = 360, cy = 760;
  let s = `<defs>${CBD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#03050c"/>${starsK(300, 31)}`;
  // a thin blue line of air far below on both sides (the seas are thousands of km away)
  s += `<path d="M-20,${cy + 380} L${cx - 200},${cy + 160} L-20,${cy + 230}Z" fill="#4a7ac8" opacity=".1" filter="url(#soft)"/><path d="M740,${cy + 380} L${cx + 200},${cy + 160} L740,${cy + 230}Z" fill="#4a7ac8" opacity=".1" filter="url(#soft)"/>`;
  s += sun3(590, 470, .85);
  const P = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
  // far ridge line continuing the edge into the distance
  const far = jag(cx - 30, cy + 40, cx + 30, cy + 40, 4, 6, 5);
  // the two faces: left in shade, right in the hard sunlight
  const Lf = `M${cx},${cy} L-20,${cy + 380} L-20,1320 L${cx},1320Z`, Rf = `M${cx},${cy} L740,${cy + 380} L740,1320 L${cx},1320Z`;
  s += litRock(Lf, 'el', '#5a5c66', '#1c1e26', 13, { fx: .016, fy: .016, sc: 6, az: 30, el: 28 });
  s += litRock(Rf, 'er', '#b4b0a8', '#4a4640', 14, { fx: .016, fy: .016, sc: 6, az: 30, el: 40 });
  s += `<defs><linearGradient id="edS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient></defs><path d="M-20,${cy} H740 V1320 H-20Z" fill="url(#edS)" opacity=".6"/>`;
  // loose rocks on both faces, frost in the cracks
  { const r = RS(12); for (let i = 0; i < 26; i++) { const side = i % 2 ? 1 : -1, f = Math.pow(r(), .7), y = cy + 30 + f * 520, w = (y - cy) * .95, x = cx + side * (12 + r() * (w - 20)); if (y - cy < (Math.abs(x - cx))) continue; s += rockS(x, y, (.08 + .5 * (y - cy) / 560) * (.6 + r() * .6), i + 40); } }
  s += `<path d="M${cx},${cy} L${cx + 3},1320" stroke="#eef2f8" stroke-width="2.5" opacity=".55"/>`;
  s += `<path d="M-20,${cy + 380} L${cx},${cy} L740,${cy + 380}" stroke="#eef2f8" stroke-width="3" fill="none" opacity=".5"/>`;
  // the astronaut standing on the ridge
  const ay = 1080, A = astro(cx + 1, ay, { s: .78, face: 1, lean: 0 });
  s += `<ellipse cx="${cx + 1}" cy="${ay + 2}" rx="40" ry="7" fill="#000" opacity=".4" filter="url(#blur2)"/>` + A.s;
  if (aa > 0) { const R = 150, a = Math.PI / 4;
    s += `<g opacity="${aa.toFixed(2)}"><path d="M${cx - 230},${cy} H${cx + 230}" stroke="#fff" stroke-width="2.4" stroke-dasharray="8 6"/>` +
      `<path d="M${cx + R},${cy} A${R},${R} 0 0 1 ${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none"/>` +
      `<path d="M${cx - R},${cy} A${R},${R} 0 0 0 ${(cx - R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none"/>` +
      lbl(cx + 225, cy + 72, '٤٥°', 1, '#f4c76b', 36) + lbl(cx - 225, cy + 72, '٤٥°', 1, '#f4c76b', 36) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
