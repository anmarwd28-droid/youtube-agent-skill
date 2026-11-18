// ===================== "what if the Earth were a triangle?" (Short #56) =====================
// helpers: the #54 chain (tm_a/tm_b). 3D module gl3d_tr.js: disc.tet (sphere -> tetrahedron of the same volume), disc.pool (four round seas), disc.quake (glowing edges).
// The tetrahedron (inradius 0.6708 of the Earth's radius, vertices at 2.0124): one vertex at the north pole, three at latitude -19.47°.
const TRV = [[90, 0], [-19.4712, 90], [-19.4712, 210], [-19.4712, -30]];        // vertices (lat, lon in the shader's frame)
const TRF = [[-90, 0], [19.4712, -90], [19.4712, 30], [19.4712, 150]];          // face centres
const TRDEF = `<linearGradient id="spaceK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030a"/><stop offset="1" stop-color="#0a1024"/></linearGradient>` +
  `<radialGradient id="coreG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe08a"/><stop offset=".35" stop-color="#ff9a3a"/><stop offset=".75" stop-color="#c8401a"/><stop offset="1" stop-color="#7a2a14"/></radialGradient>` +
  `<linearGradient id="mantG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a4a2a"/><stop offset="1" stop-color="#5a2e1a"/></linearGradient>` +
  `<radialGradient id="rockB" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#b8aa98"/><stop offset=".6" stop-color="#7a6e62"/><stop offset="1" stop-color="#2a2622"/></radialGradient>` +
  `<radialGradient id="mimG" cx=".36" cy=".32" r=".72"><stop offset="0" stop-color="#f2f0ec"/><stop offset=".55" stop-color="#b8b6b2"/><stop offset="1" stop-color="#3a3a3c"/></radialGradient>` +
  `<linearGradient id="seaT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7ab0"/><stop offset="1" stop-color="#14365a"/></linearGradient>` +
  `<linearGradient id="skyT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1030"/><stop offset=".45" stop-color="#2a4a8a"/><stop offset="1" stop-color="#9ac0e0"/></linearGradient>`;
const TRD = () => TMDEFS2() + TRDEF;
// rockS from #45 (dr_b.js): a sunlit rock with a lit top facet and a soft shadow
function rockS(x, y, sc, seed) {
  const r = RS(seed), w = 34 * sc * (.8 + .5 * r()), h = 24 * sc * (.7 + .6 * r()), n = 9, P = [];
  for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI, rr = .8 + .32 * r(); P.push([x + Math.cos(a) * w * rr, y + Math.sin(a) * h * rr]); }
  const top = P.map(p => [x + (p[0] - x) * (.52 + .1 * r()) - w * .1, y + (p[1] - y) * .62 - h * .12]), id = 'rs' + seed;
  return `<ellipse cx="${(x + w * .25).toFixed(1)}" cy="${(y + h * .08).toFixed(1)}" rx="${(w * 1.25).toFixed(1)}" ry="${(h * .24).toFixed(1)}" fill="#3a2a1a" opacity=".4" filter="url(#blur2)"/>` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b49a78"/><stop offset=".55" stop-color="#86705a"/><stop offset="1" stop-color="#4e3e30"/></linearGradient></defs>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="url(#${id})"/><path d="M${top.map(PT).join(' L')}Z" fill="#d8c29c" opacity=".7"/><path d="M${P.slice(Math.floor(n * .6)).map(PT).join(' L')} L${x.toFixed(1)},${y.toFixed(1)}Z" fill="#2a1e14" opacity=".3"/>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="#000" filter="url(#grainR)" opacity=".35"/><path d="M${P.slice(0, Math.ceil(n * .6)).map(PT).join(' L')}" stroke="#f2e2c0" stroke-width="${(1 + sc * .5).toFixed(1)}" fill="none" opacity=".5"/>`;
}

const triP = (G, ll, h) => { const p = proj3(G.cam, geo3(ll[0], ll[1], G.spin, h)); return [p[0], p[1]]; };
function tri3(t, o) { const G = gW(t, o); Object.assign(F.w.disc, { tet: o.tet ?? 1, pool: o.pool || 0, quake: o.quake || 0 }); return G; }
const starsK = (n, seed, a = 1) => { const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const z = r(); s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(.4 + z * z * 1.5).toFixed(2)}" fill="${z > .92 ? '#ffe0b8' : '#fff'}" opacity="${(a * (.3 + .6 * z)).toFixed(2)}"/>`; } return s; };
const arrowT = (x0, y0, x1, y1, col, w = 3) => { const a = Math.atan2(y1 - y0, x1 - x0); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${x1.toFixed(1)},${y1.toFixed(1)} l${(-12 * Math.cos(a - .45)).toFixed(1)},${(-12 * Math.sin(a - .45)).toFixed(1)} M${x1.toFixed(1)},${y1.toFixed(1)} l${(-12 * Math.cos(a + .45)).toFixed(1)},${(-12 * Math.sin(a + .45)).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`; };
// ---------- 0: the Earth turns into a triangular pyramid ----------
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 5) - .4, WS(0, 6) + .35));
  tri3(t, { d: lerp(9.4, 14.5, k), el: .3, lon: 90 - 50 * (1 - k) + t * 3, clouds: .4, lights: .3, tet: k, tg: [0, lerp(0, .25, k), 0] });
  F.ov = ''; return space(t);
}
// ---------- 1: four triangular faces, the same volume as today's Earth ----------
function sceneShape(t) {
  const t0 = S0(1) - .2, T = t - t0, ca = ease(ramp(t, WS(1, 5) - .3, WS(1, 5) + .3)) * (1 - ease(ramp(t, S0(2) - .6, S0(2) - .2)));
  const G = tri3(t, { d: 14.5, el: lerp(.3, .42, ease(clamp(T / 5))), lon: 90 + 3 * (S0(1) - .2) + T * 14, clouds: .4, lights: .3, tg: [0, .25, 0] });
  let o = '';
  if (ca > 0) { const [cx, cy] = G.c0;
    o += `<g opacity="${ca.toFixed(2)}"><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${G.R.toFixed(1)}" fill="none" stroke="#7fd4ff" stroke-width="3" stroke-dasharray="10 8"/>${lbl(cx, cy + G.R + 40, 'الأرضُ اليوم', 1, '#7fd4ff', 26)}</g>`; }
  { const fa = ease(ramp(t, WS(1, 2) - .2, WS(1, 4) + .2)) * (1 - ca * .6); TRV.forEach((v, i) => { const [x, y] = triP(G, v, 2.0124); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#f4c76b" opacity="${fa.toFixed(2)}"/>`; }); }
  F.ov = o; return space(t);
}
// ---------- 2: gravity pulls to the centre; the closest points are the middles of the faces (a true cross-section) ----------
// the plane through one edge (A-B) and the middle of the opposite edge (M) holds the centre O and two face centres (P, Q). r = inradius.
function xsec(t, cx, cy, S, o = {}) {
  const X = (x, y) => [cx + x * S, cy - (y - 1.7321) * S], A = X(-2.4495, 0), B = X(2.4495, 0), M = X(0, 3.4641), O = X(0, 1.7321), P = X(-.8165, 2.3094), Q = X(.8165, 2.3094);
  const tri = `M${A[0]},${A[1]} L${M[0]},${M[1]} L${B[0]},${B[1]}Z`;
  let s = `<defs><clipPath id="xsC"><path d="${tri}"/></clipPath></defs>`;
  // air and sea pooled over the face centres (sea surface = a circle around O, exaggerated 3x in depth so it shows)
  s += `<g opacity="${(o.air ?? 0).toFixed(2)}"><clipPath id="airC"><circle cx="${O[0]}" cy="${O[1]}" r="${(S * 1.12).toFixed(1)}"/></clipPath><g clip-path="url(#airC)"><rect x="0" y="0" width="720" height="1280" fill="#6ab4ff" opacity=".35"/></g></g>`;
  s += `<g opacity="${(o.sea ?? 0).toFixed(2)}"><clipPath id="seaC"><circle cx="${O[0]}" cy="${O[1]}" r="${(S * 1.06).toFixed(1)}"/></clipPath><g clip-path="url(#seaC)"><path d="M${A[0]},${A[1]} L${M[0]},${M[1]} L${B[0]},${B[1]} L${B[0] + 400},${B[1]} L${B[0] + 400},${M[1] - 400} L${A[0] - 400},${M[1] - 400} L${A[0] - 400},${A[1]}Z" fill="#2a6ab0"/></g></g>`;
  s += `<path d="${tri}" fill="url(#mantG)"/><g clip-path="url(#xsC)"><rect x="0" y="0" width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/><circle cx="${O[0]}" cy="${O[1]}" r="${(S * .55).toFixed(1)}" fill="url(#coreG)"/>` +
    `<path d="${tri}" fill="none" stroke="#a87a5a" stroke-width="${(S * .14).toFixed(1)}"/></g><path d="${tri}" fill="none" stroke="#d8b898" stroke-width="2"/>`;
  // gravity arrows from the surface towards the centre
  const ga = o.grav ?? 0;
  if (ga > 0) { const pts = [[-1.8, .9], [-1.3, 1.6], [-.8165, 2.3094], [-.4, 2.9], [.4, 2.9], [.8165, 2.3094], [1.3, 1.6], [1.8, .9], [-1.2, 0], [0, 0], [1.2, 0]];
    pts.forEach(([x, y], i) => { const [sx, sy] = X(x, y), dx = O[0] - sx, dy = O[1] - sy, l = Math.hypot(dx, dy), p = pmod(t * .8 + i * .13, 1), a0 = .12 + p * .25;
      s += `<g opacity="${(ga * Math.sin(p * Math.PI)).toFixed(2)}">${arrowT(sx + dx * a0, sy + dy * a0, sx + dx * (a0 + .32), sy + dy * (a0 + .32), '#fff', 3)}</g>`; }); }
  s += `<circle cx="${O[0]}" cy="${O[1]}" r="7" fill="#fff"/>`;
  const da = o.dist ?? 0, va = o.vert ?? 0;
  if (da > 0) s += `<g opacity="${da.toFixed(2)}"><path d="M${O[0]},${O[1]} L${P[0]},${P[1]}" stroke="#f4c76b" stroke-width="4"/><circle cx="${P[0]}" cy="${P[1]}" r="8" fill="#f4c76b"/><circle cx="${Q[0]}" cy="${Q[1]}" r="8" fill="#f4c76b"/>${lbl(P[0] - 60, P[1] - 34, '٤٬٣٠٠ كم', 1, '#f4c76b', 28)}</g>`;
  if (va > 0) s += `<g opacity="${va.toFixed(2)}"><path d="M${O[0]},${O[1]} L${A[0]},${A[1]}" stroke="#ff8a6a" stroke-width="4" stroke-dasharray="10 7"/><circle cx="${A[0]}" cy="${A[1]}" r="8" fill="#ff8a6a"/>${lbl(A[0] + 80, A[1] + 46, '١٢٬٨٠٠ كم', 1, '#ff8a6a', 28)}</g>`;
  return { s, O, P, Q, A, B, M };
}
function sceneGrav(t) {
  const t0 = S0(2) - .2, a = ease(ramp(t, t0, t0 + .5));
  const X = xsec(t, 360, 790, 108, { grav: ease(ramp(t, WS(2, 1) - .2, WS(2, 1) + .4)), dist: ease(ramp(t, WS(2, 6) - .2, WS(2, 6) + .4)), vert: ease(ramp(t, WS(2, 11) + .2, WS(2, 13) + .2)), sea: ease(ramp(t, WS(2, 11), WS(2, 13))), air: ease(ramp(t, WS(2, 11), WS(2, 13))) * .8 });
  let s = `<defs>${TRD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>${starsK(160, 5)}<g opacity="${a.toFixed(2)}">${X.s}</g>`;
  s += `<g opacity="${(a * .9).toFixed(2)}">${lbl(360, 1130, 'مقطعٌ في الأرضِ المثلّثة', 1, '#cfd8e8', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: the oceans and the air run to the face centres: four round seas ----------
function scenePool(t) {
  const t0 = S0(3) - .2, T = t - t0, pl = ease(ramp(t, WS(3, 0) - .2, WS(3, 8) + .2));
  tri3(t, { d: lerp(13.5, 11.5, ease(clamp(T / 6))), el: .33, lon: 90 + 8 * Math.sin(T * .3), clouds: .35, lights: .2, pool: pl, tg: [0, .1, 0] });
  F.ov = ''; return space(t);
}
// ---------- 4: walk away from the sea: the flat ground climbs like a mountain; ~55° at the edge ----------
function sceneSlope(t) {
  const t0 = S0(4) - .2, T = t - t0, ga = ease(ramp(t, WS(4, 9) - .3, WS(4, 11)));
  const tilt = lerp(18, 34, ga);
  let s = `<defs>${TRD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyT)"/>${starsK(80, 9, .6)}`;
  s += `<rect x="-20" y="900" width="300" height="420" fill="url(#seaT)"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${pmod(i * 47 + T * 12, 300) - 20},${960 + i * 34} h${24 + i * 3}" stroke="#cfe6f4" stroke-width="2" opacity=".35"/>`).join('');
  // the ground: a flat plane that feels tilted because "down" points to the planet's centre, under the sea
  const x0 = 180, y0 = 1010, ang = tilt * Math.PI / 180, x1 = 760, y1 = y0 - (x1 - x0) * Math.tan(ang);
  const d = `M${x0 - 40},1320 L${x0 - 40},${y0 + 14} Q${x0},${y0} ${x0 + 60},${y0 - 60 * Math.tan(ang * .7)} L${x1},${y1} L${x1},1320Z`;
  s += litRock(d, 'sl', '#9a8a74', '#5a4a3a', 11, { fx: .02, fy: .012, sc: 4 });
  s += `<path d="M${x0 - 40},${y0 + 14} Q${x0},${y0} ${x0 + 60},${y0 - 60 * Math.tan(ang * .7)} L${x1},${y1}" stroke="#d8c8a8" stroke-width="3" fill="none" opacity=".5"/>`;
  { const r = RS(4); for (let i = 0; i < 22; i++) { const f = r(), x = x0 + 80 + f * (x1 - x0 - 80), y = y0 - (x - x0) * Math.tan(ang) + 10 + r() * 200; s += rockS(x, y, .25 + r() * .3, i + 3); } }
  { const r = RS(8); for (let i = 0; i < 20; i++) { const x = x0 + r() * 200, y = y0 - (x - x0) * Math.tan(ang) + 6 + r() * 60; s += tuft(x, y, 10 + r() * 10, i); } }
  // a climber leaning into the slope
  const px = 400 + T * 6, py = y0 - (px - x0) * Math.tan(ang) + 4;
  s += man(px, py, .62, 1, 3, { walk: T * 2.4, amp: .45, lean: 14 });
  // the angle: true "down" (to the centre) vs. the ground
  if (ga > 0) { const ax = 470, ay = y0 - (ax - x0) * Math.tan(ang);
    s += `<g opacity="${ga.toFixed(2)}"><path d="M${ax},${ay} H${ax + 130}" stroke="#fff" stroke-width="2.4" stroke-dasharray="8 6"/><path d="M${ax + 100},${ay} A100,100 0 0 0 ${(ax + 100 * Math.cos(ang)).toFixed(1)},${(ay - 100 * Math.sin(ang)).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none"/></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: the corners rise more than 8,000 km, above the atmosphere ----------
function sceneVertex(t) {
  const t0 = S0(5) - .2, T = t - t0, la = ease(ramp(t, WS(5, 2) - .2, WS(5, 4)));
  const G = tri3(t, { d: lerp(12.6, 11.8, ease(clamp(T / 6))), el: .08, lon: 90 + 14 + T * 2, clouds: .35, lights: .2, pool: 1, tg: [0, .62, 0] });
  const top = triP(G, TRV[0], 2.0124), fc = triP(G, TRF[1], .6708);
  let o = '';
  if (la > 0) { o += `<g opacity="${la.toFixed(2)}"><path d="M${fc[0].toFixed(1)},${fc[1].toFixed(1)} L${top[0].toFixed(1)},${(top[1] + 14).toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/><circle cx="${top[0].toFixed(1)}" cy="${top[1].toFixed(1)}" r="9" fill="#f4c76b"/>` +
      `${panel(top[0] + 30, top[1] + 20, 240, 64)}${lbl(top[0] + 150, top[1] + 63, 'أعلى بـ ٨٬٥٠٠ كم', 1, '#f4c76b', 28)}</g>`; }
  F.ov = o; return space(t);
}
// ---------- 6: no air, no water: frozen rock under the stars ----------
function sceneSummit(t) {
  const t0 = S0(6) - .2, T = t - t0;
  let s = `<defs>${TRD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#020308"/>${starsK(320, 23)}`;
  // far below, the thin blue glow of air over a distant sea
  s += `<ellipse cx="200" cy="1250" rx="420" ry="90" fill="#4a7ac8" opacity=".35" filter="url(#soft)"/>`;
  const P = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
  // a far ridge, then the summit spire, lit hard from the right
  const far = jag(-20, 980, 740, 900, 18, 60, 7);
  s += litRock(`M${P(far)} L740,1320 L-20,1320Z`, 'sf', '#5a5c66', '#1a1c22', 19, { fx: .02, fy: .03, sc: 5, az: 20, el: 25 });
  const L1 = jag(40, 1320, 380, 600, 16, 46, 3), R1 = jag(380, 600, 700, 1320, 16, 46, 5);
  s += litRock(`M${P(L1)} L${P(R1)}Z`, 'su', '#9a9ca6', '#2a2c34', 17, { fx: .014, fy: .022, sc: 7, az: 200, el: 30 });
  s += `<path d="M${P(R1)} L380,600Z" fill="#000" opacity=".38"/>`;
  s += `<path d="M${P(L1)}" stroke="#e8eef6" stroke-width="3" fill="none" opacity=".35"/>`;
  s += sun3(110, 480, .9);
  noEarth(); F.ov = ''; return s;
}
