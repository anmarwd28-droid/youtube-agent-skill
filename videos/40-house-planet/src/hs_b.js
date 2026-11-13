// ===================== "what if you lived on a planet the size of a house?" (Short #40) =====================
// The planet is the 3D rock sphere of gl3d_hs.js (the `moon` slot: rock texture, bump, `lump`). Radius 1 world unit = 10 m.
// The people are the house 2D people in a spacesuit, drawn in F.ov at the TRUE scale (1.8 m = 0.18 of the radius).
const HDEF = `<radialGradient id="visG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe6a8"/><stop offset=".35" stop-color="#c8862a"/><stop offset=".7" stop-color="#3a2a1a"/><stop offset="1" stop-color="#120c08"/></radialGradient>` +
  `<radialGradient id="helG" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#e2e6ec"/><stop offset="1" stop-color="#9aa2ae"/></radialGradient>` +
  `<radialGradient id="airG"><stop offset=".78" stop-color="#7ab8ff" stop-opacity="0"/><stop offset=".9" stop-color="#8ac4ff" stop-opacity=".55"/><stop offset="1" stop-color="#8ac4ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="ballG" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ffe9c0"/><stop offset=".5" stop-color="#e8582a"/><stop offset="1" stop-color="#5a1a08"/></radialGradient>` +
  `<linearGradient id="wallH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f2e4ca"/><stop offset=".7" stop-color="#e2d0b0"/><stop offset="1" stop-color="#b8a486"/></linearGradient>` +
  `<linearGradient id="roofH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8502e"/><stop offset="1" stop-color="#7a2e18"/></linearGradient>` +
  `<pattern id="tileH" width="18" height="12" patternUnits="userSpaceOnUse"><path d="M0,11.5 H18" stroke="#3a1408" stroke-opacity=".45" stroke-width="1.6"/><path d="M9,0 V12" stroke="#3a1408" stroke-opacity=".25" stroke-width="1"/><path d="M0,2 H18" stroke="#fff" stroke-opacity=".12" stroke-width="1"/></pattern>` +
  `<linearGradient id="glsH" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8d8f0"/><stop offset=".5" stop-color="#4a7aa8"/><stop offset="1" stop-color="#1c3a5a"/></linearGradient>` +
  `<linearGradient id="domeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#d8dce4"/><stop offset="1" stop-color="#7a828e"/></linearGradient>` +
  `<radialGradient id="sunGl"><stop offset="0" stop-color="#fffbe8" stop-opacity=".9"/><stop offset=".3" stop-color="#ffe9b0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>`;
const HDEFS = () => `${SDEF}${HDEF}<linearGradient id="pebL" x1="0" y1="0" x2="1" y2=".6"><stop offset="0" stop-color="#e8dccb" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>`;
const PC = [-4, 2.6, 14];   // where the little planet floats (the Earth stays at the origin, far behind)
const add3 = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const nrm3 = a => { const l = Math.hypot(...a); return a.map(x => x / l); };
const crs3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// a camera at distance D from the planet centre, elevation el, azimuth az; (sx, sy) shift the planet on screen (world units at the centre)
function camP(D, el = .12, az = 0, sx = 0, sy = 0, fov = 34) {
  const pos = [PC[0] + D * Math.sin(az) * Math.cos(el), PC[1] + D * Math.sin(el), PC[2] + D * Math.cos(az) * Math.cos(el)];
  const f = nrm3([PC[0] - pos[0], PC[1] - pos[1], PC[2] - pos[2]]), r = nrm3(crs3(f, [0, 1, 0])), u = crs3(r, f);
  const look = add3(add3(PC, r, -sx), u, -sy);
  return { pos, look, fov, r, u, f };
}
// the planet's silhouette on screen: centre, radius (px), scale for a person (s), and a point on the limb at angle th (0 = top, clockwise)
function sil(c) {
  const v = [PC[0] - c.pos[0], PC[1] - c.pos[1], PC[2] - c.pos[2]], D = Math.hypot(...v), d = nrm3(v), up0 = nrm3(add3([0, 1, 0], d, -d[1])), rt = crs3(d, up0), rl = Math.sqrt(1 - 1 / (D * D));
  const nAt = th => add3(d.map(x => -x / D), add3(up0.map(x => x * Math.cos(th) * rl), rt, Math.sin(th) * rl));
  const at = (th, h = 0) => { const n = nAt(th), q = proj3(c, add3(PC, n, 1 + h)), q2 = proj3(c, add3(PC, n, 1.05 + h)); return [q[0], q[1], Math.atan2(q2[0] - q[0], q[1] - q2[1]) * 57.2958, q[2] * .18 / 330]; };
  const c0 = proj3(c, add3(PC, d, -1 / D)), T = at(0), Sd = at(Math.PI / 2), Bm = at(Math.PI), Lf = at(-Math.PI / 2);
  return { x: (Sd[0] + Lf[0]) / 2, y: (T[1] + Bm[1]) / 2, R: (Math.hypot(T[0] - Bm[0], T[1] - Bm[1]) + Math.hypot(Sd[0] - Lf[0], Sd[1] - Lf[1])) / 4, s: T[3], at };
}
// a camera from a position and a look point; blend two cameras
function cam2(pos, look, fov = 34) { const f = nrm3([look[0] - pos[0], look[1] - pos[1], look[2] - pos[2]]), r = nrm3(crs3(f, [0, 1, 0])), u = crs3(r, f); return { pos, look, fov, r, u, f }; }
const lerpCam = (A, B, k) => cam2(A.pos.map((x, i) => lerp(x, B.pos[i], k)), A.look.map((x, i) => lerp(x, B.look[i], k)), lerp(A.fov, B.fov, k));
// a point on the planet (unit normal n, height h in radii) on screen: x, y, the rotation of "up" there, and the scale of a person standing there
function onPt(c, n, h = 0) { const q = proj3(c, add3(PC, n, 1 + h)), q2 = proj3(c, add3(PC, n, 1.02 + h)); return [q[0], q[1], Math.atan2(q2[0] - q[0], q[1] - q2[1]) * 57.2958, q[2] * .18 / 330]; }
// light from the camera frame: a = right, b = up, c = towards the camera
const Lcam = (c, a, b, k) => nrm3(add3(add3(c.r.map(x => x * a), c.u, b), c.f, -k));
function planetW(t, c, L, o = {}) {
  F.w = { set: 'space', cam: { pos: c.pos, look: c.look, fov: c.fov }, L,
    moon: { pos: PC, L, shC: [-99, -99, -99], shR: .001, rot: (o.rot ?? 1.2) + t * (o.sp ?? 0), lump: o.lump || 0 },
    disc: o.earth === 0 ? null : { m: 1, spin: 4.4 + t * .02, clouds: .5, lights: .35 } };
  F.earth = null; F.moon = null; F.sun = null;
}

// ---------- the person in a spacesuit (the same drawn person: white suit, helmet with a gold visor, a backpack) ----------
function astro(x, y, o = {}) {
  const k = o.suit ?? 1, f = o.face || 1, s = o.s || 1;
  const base = Object.assign({ shade: 1, noShadow: 1 }, o, k > .5 ? { top: '#e9ebef', pants: '#dcdfe5', skin: '#cfd3da', hair: '#cfd3da' } : YOU);
  let body = hero(x, y, base); const P = Object.assign({}, HP);
  if (k <= .5) return { s: body, P };
  body = body.split('#1d2028').join('#b4b9c2').split('#3a3530').join('#8a9099').split('#4a443c').join('#a2a8b1');
  const ax = P.head[0] - P.hip[0], ay = P.head[1] - P.hip[1], L = Math.hypot(ax, ay) || 1, ux = ax / L, uy = ay / L, ang = Math.atan2(ux, -uy) * 57.2958;
  const bx = P.chest[0] - uy * f * -1 * 0 - (-uy) * 0, nx = -uy * f, ny = ux * f;   // (nx, ny) points to the front of the body
  const pk = `<g transform="translate(${(P.chest[0] - nx * 25 * s).toFixed(1)},${(P.chest[1] - ny * 25 * s - uy * 0).toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(4)})"><rect x="-17" y="-62" width="34" height="96" rx="9" fill="#c4c8d0"/><rect x="-17" y="-62" width="12" height="96" rx="6" fill="#000" opacity=".16"/><rect x="-11" y="-40" width="22" height="6" rx="2" fill="#8a929c"/><rect x="-11" y="-28" width="22" height="6" rx="2" fill="#8a929c"/></g>`;
  const hx = P.head[0] - ux * 2 * s, hy = P.head[1] - uy * 2 * s, r = 31 * s, vx = hx + nx * 6 * s, vy = hy + ny * 6 * s;
  const helm = `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${r.toFixed(1)}" fill="url(#helG)"/>` +
    `<ellipse cx="${vx.toFixed(1)}" cy="${vy.toFixed(1)}" rx="${(20 * s).toFixed(1)}" ry="${(22 * s).toFixed(1)}" fill="url(#visG)" transform="rotate(${ang.toFixed(1)},${vx.toFixed(1)},${vy.toFixed(1)})"/>` +
    `<ellipse cx="${(vx - nx * 5 * s + ux * 7 * s).toFixed(1)}" cy="${(vy - ny * 5 * s + uy * 7 * s).toFixed(1)}" rx="${(7 * s).toFixed(1)}" ry="${(4 * s).toFixed(1)}" fill="#fff" opacity=".55" transform="rotate(${(ang - 35).toFixed(1)},${(vx - nx * 5 * s + ux * 7 * s).toFixed(1)},${(vy - ny * 5 * s + uy * 7 * s).toFixed(1)})"/><circle cx="${(vx + nx * 6 * s - ux * 8 * s).toFixed(1)}" cy="${(vy + ny * 6 * s - uy * 8 * s).toFixed(1)}" r="${(2.2 * s).toFixed(1)}" fill="#fff" opacity=".6"/>` +
    `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#8a929e" stroke-width="${(2 * s).toFixed(1)}"/>` +
    `<rect x="${(hx - 14 * s).toFixed(1)}" y="${(hy + r - 6 * s).toFixed(1)}" width="${(28 * s).toFixed(1)}" height="${(9 * s).toFixed(1)}" rx="${(3 * s).toFixed(1)}" fill="#9aa2ae" transform="rotate(${ang.toFixed(1)},${hx.toFixed(1)},${hy.toFixed(1)})"/>`;
  const chestP = `<g transform="translate(${(P.chest[0] + nx * 10 * s).toFixed(1)},${(P.chest[1] + ny * 10 * s).toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${s.toFixed(4)})"><rect x="-9" y="-18" width="18" height="16" rx="3" fill="#7a8490"/><circle cx="-3" cy="-10" r="2" fill="#e53935"/><circle cx="3" cy="-10" r="2" fill="#4ad06a"/></g>`;
  return { s: pk + body + chestP + helm, P };
}
// a small soft contact shadow / dust on the ground
const dustP = (x, y, r, a) => a > .01 ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * .35).toFixed(1)}" fill="#c8b8a0" opacity="${a.toFixed(2)}" filter="url(#blur2)"/>` : '';
const darkOn = (svg, k) => k > .01 ? `<g>${svg}<g style="mix-blend-mode:multiply" opacity="${k.toFixed(2)}">${svg.replace(/fill="[^"]*"/g, 'fill="#1a2238"').replace(/stroke="[^"]*"/g, 'stroke="#1a2238"').replace(/url\(#[a-zA-Z]+\)/g, '#1a2238')}</g></g>` : svg;
const sunDisc = (x, y, a = 1) => a > .01 ? `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="120" fill="url(#sunGl)" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="48" fill="#fff4d0" opacity=".45" filter="url(#blur9)"/><circle cx="${x}" cy="${y}" r="20" fill="#fffdf4"/></g>` : '';

// small loose rocks on the ground (3D-placed, drawn shaded): n points near the top, spread in radians
function pebbles(c, seed, n, spread, tilt = 0) {
  const r = RS(seed); let o = '';
  const P = []; for (let i = 0; i < n; i++) { const a = (r() - .5) * 2 * spread, b = r() * spread * .9, ct = Math.cos(tilt), st = Math.sin(tilt), v = [Math.sin(a), Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b)], w = [v[0], v[1] * ct - v[2] * st, v[1] * st + v[2] * ct]; P.push([w, .25 + Math.pow(r(), 3) * 1.6, r(), r() * 1e4]); }
  P.map(([w, z, k, sd]) => [onPt(c, nrm3(w)), z, k, sd]).sort((A, B) => A[0][1] - B[0][1]).forEach(([q, z, k, sd]) => { if (q[1] < 0 || q[1] > 1300 || q[0] < -40 || q[0] > 760 || q[3] <= 0) return;
    const w = 46 * z * q[3], h = w * (.35 + .3 * k); if (w < 1.5) return; const rr = RS(Math.floor(sd));
    let d = ''; const m = 7; for (let j = 0; j <= m; j++) { const u = j / m, x = -w / 2 + u * w, y = -h * Math.sin(u * Math.PI) * (.75 + .5 * rr()) ; d += (j ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } d += 'Z';
    o += `<g transform="translate(${q[0].toFixed(1)},${q[1].toFixed(1)}) rotate(${q[2].toFixed(1)})"><ellipse cx="${(w * .3).toFixed(1)}" cy="${(h * .1).toFixed(1)}" rx="${(w * .6).toFixed(1)}" ry="${(h * .25).toFixed(1)}" fill="#000" opacity=".4" filter="url(#blur2)"/>` +
      `<path d="${d}" fill="${['#6e6458', '#7e7264', '#8c7e6c', '#5e564e'][Math.floor(k * 4)]}"/><path d="${d}" fill="url(#pebL)"/></g>`; });
  return o;
}
// ---------- a drawn two-storey house (same illustrated family as the street buildings) ----------
function houseD(x, base, w, h, t) {
  const wh = h * .64, rh = h - wh, x0 = x - w / 2, top = base - wh; let s = '';
  s += `<ellipse cx="${x}" cy="${base + 6}" rx="${w * .62}" ry="12" fill="#000" opacity=".35" filter="url(#blur5)"/>`;
  s += `<rect x="${x0}" y="${top}" width="${w}" height="${wh}" fill="url(#wallH)"/><rect x="${x0}" y="${top}" width="${w}" height="${wh}" fill="url(#brk)" opacity=".35"/>`;
  s += `<rect x="${x0}" y="${top}" width="${w}" height="${wh * .12}" fill="url(#aoDn)"/><rect x="${x0 - 3}" y="${base - 10}" width="${w + 6}" height="10" fill="#9a8a72"/>`;
  s += `<rect x="${x0}" y="${top + wh * .48}" width="${w}" height="5" fill="#cbb898"/>`;
  const win = (cx, cy, ww, hh) => `<rect x="${cx - ww / 2 - 4}" y="${cy - hh / 2 - 4}" width="${ww + 8}" height="${hh + 8}" fill="#f8f2e6"/><rect x="${cx - ww / 2}" y="${cy - hh / 2}" width="${ww}" height="${hh}" fill="url(#glsH)"/>` +
    `<path d="M${cx},${cy - hh / 2} V${cy + hh / 2} M${cx - ww / 2},${cy - hh * .08} H${cx + ww / 2}" stroke="#f8f2e6" stroke-width="3"/><path d="M${cx - ww / 2 + 4},${cy + hh / 2 - 6} L${cx - ww / 2 + ww * .45},${cy - hh / 2 + 4}" stroke="#fff" stroke-width="5" opacity=".25"/>` +
    `<rect x="${cx - ww / 2 - 7}" y="${cy + hh / 2 + 3}" width="${ww + 14}" height="5" fill="#d8c8a8"/><rect x="${cx - ww / 2 - 7}" y="${cy + hh / 2 + 8}" width="${ww + 14}" height="4" fill="#000" opacity=".18"/>`;
  [.2, .5, .8].forEach(k => { s += win(x0 + w * k, top + wh * .25, w * .13, wh * .22); });
  [.2, .8].forEach(k => { s += win(x0 + w * k, top + wh * .72, w * .13, wh * .24); });
  s += `<rect x="${x - w * .07}" y="${base - wh * .4}" width="${w * .14}" height="${wh * .4 - 10}" fill="#5a3420"/><rect x="${x - w * .07 + 5}" y="${base - wh * .4 + 6}" width="${w * .14 - 10}" height="${wh * .4 - 22}" fill="#6e4228"/><circle cx="${x + w * .04}" cy="${base - wh * .2}" r="3" fill="#e8c070"/>`;
  s += `<path d="M${x0 - w * .06},${top + 2} L${x0 + w * .16},${top - rh} L${x0 + w * .84},${top - rh} L${x0 + w * 1.06},${top + 2}Z" fill="url(#roofH)"/><path d="M${x0 - w * .06},${top + 2} L${x0 + w * .16},${top - rh} L${x0 + w * .84},${top - rh} L${x0 + w * 1.06},${top + 2}Z" fill="url(#tileH)"/>`;
  s += `<path d="M${x0 + w * .84},${top - rh} L${x0 + w * 1.06},${top + 2} L${x0 + w * .9},${top + 2}Z" fill="#000" opacity=".25"/><rect x="${x0 - w * .06}" y="${top}" width="${w * 1.12}" height="7" fill="#5a2210"/>`;
  s += `<rect x="${x0 + w * .68}" y="${top - rh * .95}" width="${w * .07}" height="${rh * .5}" fill="#8a5a44"/><rect x="${x0 + w * .67}" y="${top - rh * .98}" width="${w * .09}" height="6" fill="#6a4434"/>`;
  s += `<rect x="${x0 + w * .7}" y="${top}" width="${w * .3}" height="${wh}" fill="#000" opacity=".12"/>`;
  return s;
}
const dimLine = (x0, y0, x1, y1, tx, a, col = '#f4c76b') => a <= .01 ? '' : `<g opacity="${a.toFixed(2)}"><path d="M${x0},${y0} L${x1},${y1}" stroke="${col}" stroke-width="3" stroke-dasharray="10 7"/><path d="M${x0},${y0 - 14} V${y0 + 14} M${x1},${y1 - 14} V${y1 + 14}" stroke="${col}" stroke-width="3"/>` + lbl((x0 + x1) / 2, y0 - 18, tx, 1, col, 30) + `</g>`;

// 0: the hook: from your boots to the whole planet, the size of a house
function sceneHook(t) {
  const k = ease(clamp((t - .25) / 2.1)), cA = cam2([PC[0] + .05, PC[1] + 1.12, PC[2] + .78], [PC[0], PC[1] + 1.075, PC[2]], 38), cB = camP(8, .12, 0, 0, -.1, 34), c = lerpCam(cA, cB, k);
  const L = nrm3([-.55, .55, .6]); planetW(t, c, L);
  const [fx, fy, fr, fs] = onPt(c, [0, 1, 0]), A = astro(fx, fy, { s: fs, rot: fr, face: 1, hF: [fx + 70 * fs, fy - 230 * fs - 30 * fs * Math.sin(t * 2.4)] });
  F.ov = `<defs>${HDEFS()}</defs>` + (k < .6 ? `<g opacity="${(1 - k / .6).toFixed(2)}">${pebbles(c, 5, 60, .4)}</g>` : '') + A.s; F.flash = 0;
  return space(t);
}
// 1: a rocky planet 20 m across, next to a house of the same width; then its whole circumference: 63 m
function sceneSize(t) {
  const c = camP(10, .1, 0, 0, .26), L = nrm3([-.55, .5, .6]); planetW(t, c, L);
  const S = sil(c), [fx, fy, fr, fs] = onPt(c, [0, 1, 0]), A = astro(fx, fy, { s: fs, rot: fr, face: 1 });
  const hw = S.R * 2, hb = 1150, a = ease(ramp(t, S0(1) + .1, S0(1) + .6));
  let o = `<defs>${HDEFS()}</defs>` + A.s;
  o += `<g opacity="${a.toFixed(2)}">${houseD(360, hb, hw, hw * .58, t)}</g>`;
  const d1 = ease(ramp(t, WS(1, 3) - .2, WS(1, 3) + .3)) * (1 - ease(ramp(t, WS(1, 6) - .3, WS(1, 6))));
  o += dimLine(S.x - S.R, S.y, S.x + S.R, S.y, '٢٠ مترًا', d1) + dimLine(360 - hw / 2, hb + 40, 360 + hw / 2, hb + 40, '٢٠ مترًا', d1 * a);
  const p = ease(ramp(t, WS(1, 6), WS(1, 9) + .3));
  if (p > 0) { const rr = S.R * 1.06, end = -Math.PI / 2 + p * 2 * Math.PI * .999, la = p > .5 ? 1 : 0;
    o += `<path d="M${S.x.toFixed(1)},${(S.y - rr).toFixed(1)} A${rr.toFixed(1)},${rr.toFixed(1)} 0 ${la} 1 ${(S.x + Math.cos(end) * rr).toFixed(1)},${(S.y + Math.sin(end) * rr).toFixed(1)}" stroke="#f4c76b" stroke-width="4" fill="none" stroke-dasharray="12 8"/>` +
      `<circle cx="${(S.x + Math.cos(end) * rr).toFixed(1)}" cy="${(S.y + Math.sin(end) * rr).toFixed(1)}" r="7" fill="#fff4c8"/>` + lbl(S.x, S.y + S.R + 58, 'المحيط: ٦٣ مترًا', ease(ramp(t, WS(1, 7), WS(1, 8))), '#f4c76b', 32); }
  F.ov = o; return space(t);
}
// 2: gravity 600,000 times weaker: you stand on a bathroom scale that reads 0.1 g
function sceneWeight(t) {
  const T = t - S0(2), c = cam2([PC[0] + .26 + T * .006, PC[1] + 1.14, PC[2] + .84], [PC[0] + .02, PC[1] + 1.075, PC[2]], 40), L = nrm3([-.5, .7, .55]); planetW(t, c, L);
  const [fx, fy, fr, fs] = onPt(c, [0, 1, 0]), sc = fs, sw = 130 * sc, sh = 24 * sc, A = astro(fx, fy - sh * .9, { s: fs, rot: fr, face: 1 });
  let o = `<defs>${HDEFS()}</defs>` + pebbles(c, 3, 70, .45) + `<ellipse cx="${fx.toFixed(1)}" cy="${(fy + 2).toFixed(1)}" rx="${(sw * .62).toFixed(1)}" ry="${(sh * .45).toFixed(1)}" fill="#000" opacity=".45" filter="url(#blur5)"/>`;
  o += `<rect x="${(fx - sw / 2).toFixed(1)}" y="${(fy - sh).toFixed(1)}" width="${sw.toFixed(1)}" height="${sh.toFixed(1)}" rx="${(8 * sc).toFixed(1)}" fill="#e8ecf0"/><rect x="${(fx - sw / 2).toFixed(1)}" y="${(fy - sh * .35).toFixed(1)}" width="${sw.toFixed(1)}" height="${(sh * .35).toFixed(1)}" rx="${(6 * sc).toFixed(1)}" fill="#000" opacity=".2"/><rect x="${(fx + sw * .18).toFixed(1)}" y="${(fy - sh * .78).toFixed(1)}" width="${(sw * .22).toFixed(1)}" height="${(sh * .36).toFixed(1)}" rx="2" fill="#0e1a12"/>`;
  o += A.s;
  const rd = ease(ramp(t, WS(2, 8), WS(2, 10))), pa = ease(ramp(t, WS(2, 7), WS(2, 8)));
  if (pa > 0) { const v = rd < .98 ? AR(Math.max(1, Math.round(lerp(70, 0, rd)))) + ' كغ' : AR('0.1') + ' غرام';
    o += `<g opacity="${pa.toFixed(2)}">` + panel(160, 930, 400, 200) + `<rect x="195" y="955" width="330" height="104" rx="12" fill="#0e1a12" stroke="#2a3a2e" stroke-width="3"/>` +
    `<text x="360" y="1030" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#7cff9a" style="filter:drop-shadow(0 0 8px rgba(124,255,154,.6))">${v}</text>` +
    lbl(360, 1104, rd < .98 ? 'وزنُك' : 'عُشرُ غرامٍ فقط', 1, rd < .98 ? '#fff' : '#f4c76b', 28) + `</g>`; }
  F.ov = o; return space(t);
}
// 3: the air escapes into space at once, so you live in a spacesuit
const AIRM = (() => { const r = RS(31), o = []; for (let i = 0; i < 160; i++) o.push({ a: r() * 6.283, d: r(), v: .6 + r() * .8, z: 1 + r() * 1.6 }); return o; })();
function sceneAir(t) {
  const T = t - S0(3), c = cam2([PC[0] - .04 + T * .004, PC[1] + 1.13, PC[2] + .86], [PC[0] + .02, PC[1] + 1.09, PC[2]], 40), L = nrm3([-.5, .65, .55]); planetW(t, c, L, { earth: 0 });
  const [fx, fy, fr, fs] = onPt(c, [0, 1, 0]), ta = WS(3, 4), p = clamp((t - ta) / 2.4), suit = t > WS(3, 9) - .15 ? 1 : 0;
  const hz = sil(c).at(0)[1];
  let o = pebbles(c, 9, 60, .45) + `<defs>${HDEFS()}<linearGradient id="skyAir" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#9ccaf0" stop-opacity=".85"/><stop offset=".45" stop-color="#5a8ad0" stop-opacity=".45"/><stop offset="1" stop-color="#2a4a9a" stop-opacity="0"/></linearGradient></defs>`;
  // a thin blue sky over the ground, which rises and thins out into space
  const ha = 1 - ease(p);
  if (ha > .01) o += `<rect x="-20" y="${(hz - 760).toFixed(1)}" width="760" height="${(760 + 30).toFixed(1)}" fill="url(#skyAir)" opacity="${(.8 * ha).toFixed(2)}"/>`;
  AIRM.forEach((m, i) => { const x = (m.a / 6.283) * 760 - 20, y0 = hz - m.d * 520, y = y0 - (t > ta ? Math.pow((t - ta) * m.v, 1.5) * 380 : Math.sin(t * 2 + m.a * 5) * 6), al = (1 - clamp((y0 - y) / 900)) * .75;
    if (al > .02 && y > 380) o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(m.z * 1.6).toFixed(1)}" fill="#cfe6ff" opacity="${al.toFixed(2)}"/>` + (t > ta ? `<path d="M${x.toFixed(1)},${y.toFixed(1)} v${(18 * m.v).toFixed(1)}" stroke="#cfe6ff" stroke-width="${m.z.toFixed(1)}" opacity="${(al * .45).toFixed(2)}"/>` : ''); });
  const A = astro(fx, fy, { s: fs, rot: fr, face: 1, suit, lean: suit ? 0 : -4, hF: suit ? undefined : [fx + 40 * fs, fy - 260 * fs] });
  o += `<ellipse cx="${fx.toFixed(1)}" cy="${(fy + 2).toFixed(1)}" rx="${(50 * fs).toFixed(1)}" ry="${(9 * fs).toFixed(1)}" fill="#000" opacity=".4" filter="url(#blur5)"/>` + A.s;
  if (suit) { const g = Math.exp(-(t - WS(3, 9) + .15) * 3); if (g > .02) o += scr(`<circle cx="${A.P.head[0].toFixed(1)}" cy="${A.P.head[1].toFixed(1)}" r="${(90 * fs).toFixed(1)}" fill="url(#goldG)" opacity="${g.toFixed(2)}"/>`); }
  F.ov = o; return space(t);
}
// 4: one ordinary step and you fly off for ever: escape speed is under 2 cm/s
function sceneStep(t) {
  const zk = ease(ramp(t, WS(4, 2), WS(4, 8))), c = camP(lerp(1.9, 5.6, zk), .1, 0, 0, lerp(-1.23, -1.34, zk)), L = Lcam(c, -.55, .55, .6); planetW(t, c, L);
  const S = sil(c), [fx, fy, fr, fs] = S.at(0), ts = WS(4, 1), u = Math.max(0, t - ts - .25);
  const up = (u * 34 + u * u * 4) * fs / .2, dx = u * 16 * fs / .2, sp = u > 0 ? -u * 9 : 0;
  const A = astro(fx + dx, fy - up, { s: fs, face: 1, walk: t < ts + .25 ? (t - ts) * 4 : .8, amp: .45, rot: fr + sp, air: u > 0 ? 1 : 0 });
  let o = `<defs>${HDEFS()}</defs>`;
  if (u > 0) o += `<path d="M${fx},${fy - 10} Q${fx + dx * .3},${fy - up * .6} ${(fx + dx).toFixed(1)},${(fy - up).toFixed(1)}" stroke="#f4c76b" stroke-width="3" fill="none" stroke-dasharray="8 7" opacity=".8"/>` + dustP(fx + 6, fy, 80 * fs, .4 * Math.exp(-u * 2));
  o += A.s;
  const pa = ease(ramp(t, WS(4, 9) - .2, WS(4, 9) + .3));
  if (pa > 0) { o += `<g opacity="${pa.toFixed(2)}">` + panel(70, 900, 580, 220);
    o += lbl(560, 960, 'سرعةُ الإفلات', 1, '#fff', 26) + lbl(190, 960, '١٫٧ سم/ث', 1, '#ff8a6a', 30) + `<rect x="100" y="976" width="520" height="20" rx="5" fill="#fff" opacity=".08"/><rect x="613" y="976" width="7" height="20" rx="3" fill="#ff8a6a"/>`;
    o += lbl(560, 1052, 'خطوتُك العاديّة', 1, '#fff', 26) + lbl(190, 1052, '١٤٠ سم/ث', 1, '#f4c76b', 30) + `<rect x="100" y="1068" width="520" height="20" rx="5" fill="#fff" opacity=".08"/><rect x="${(620 - 520 * ease(ramp(t, WS(4, 10), WS(4, 13)))).toFixed(1)}" y="1068" width="${(520 * ease(ramp(t, WS(4, 10), WS(4, 13)))).toFixed(1)}" height="20" rx="4" fill="#f4c76b"/>` + `</g>`; }
  F.ov = o; return space(t);
}
// 5: you move hand over hand along ropes, and everything is tied down
function sceneRopes(t) {
  const T = t - S0(5), c = cam2([PC[0] + .02, PC[1] + 1.26, PC[2] + 1.1], [PC[0] + .02, PC[1] + 1.12, PC[2]], 40), L = nrm3([-.4, .7, .6]); planetW(t, c, L);
  const sc = onPt(c, [0, 1, 0])[3], gp = (th, h = 0) => onPt(c, [Math.sin(th), Math.cos(th) * Math.cos(.3), Math.cos(th) * Math.sin(.3)], h);
  let o = `<defs>${HDEFS()}</defs>` + pebbles(c, 7, 60, .5, .3);
  const th0 = -.3, th1 = .3, rh = .1; let d = '';
  for (let i = 0; i <= 60; i++) { const th = lerp(th0, th1, i / 60), sag = Math.sin(pmod((th - th0) / .15, 1) * Math.PI) * .025; const [x, y] = gp(th, rh - sag); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
  for (let i = 0; i <= 4; i++) { const th = th0 + i * .15, [x0, y0, , s0] = gp(th), [x1, y1] = gp(th, rh + .005); o += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#5a5f68" stroke-width="${(9 * s0).toFixed(1)}" stroke-linecap="round"/><circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="${(7 * s0).toFixed(1)}" fill="#f4c76b"/>`; }
  const dome = (th, w) => { const [x, y, a] = gp(th), h = w * .62; return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a.toFixed(1)})"><ellipse cx="0" cy="2" rx="${w * .62}" ry="${w * .07}" fill="#000" opacity=".4" filter="url(#blur5)"/><path d="M${-w / 2},0 C${-w / 2},${-h * 1.3} ${w / 2},${-h * 1.3} ${w / 2},0Z" fill="url(#domeG)"/><ellipse cx="${w * .05}" cy="${-h * .52}" rx="${w * .12}" ry="${w * .1}" fill="#2a4a6a" stroke="#9aa2ae" stroke-width="${w * .02}"/>` +
    `<path d="M${-w * .42},${-h * .62} Q0,${-h * .02} ${w * .44},${-h * .6}" stroke="#e8b84a" stroke-width="${w * .03}" fill="none"/><path d="M${-w * .2},${-h * .95} L${-w * .62},0 M${w * .2},${-h * .95} L${w * .62},0" stroke="#e8b84a" stroke-width="${w * .022}"/><rect x="${-w * .1}" y="${-h * .35}" width="${w * .2}" height="${h * .35}" rx="${w * .03}" fill="#8a929e"/></g>`; };
  const crate = (th, w) => { const [x, y, a] = gp(th); return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a.toFixed(1)})"><ellipse cx="0" cy="2" rx="${w * .7}" ry="${w * .1}" fill="#000" opacity=".4" filter="url(#blur2)"/><rect x="${-w / 2}" y="${-w * .7}" width="${w}" height="${w * .7}" fill="#9a6a3a"/><path d="M${-w / 2},${-w * .35} H${w / 2}" stroke="#6a4424" stroke-width="${w * .05}"/><rect x="${w * .1}" y="${-w * .7}" width="${w * .4}" height="${w * .7}" fill="#000" opacity=".18"/><path d="M${-w * .2},${-w * .72} L${-w * .7},0 M${w * .2},${-w * .72} L${w * .7},0" stroke="#e8b84a" stroke-width="${w * .04}"/></g>`; };
  o += crate(.17, 120 * gp(.17)[3]);
  o += `<path d="${d}" stroke="#000" stroke-width="${(9 * sc).toFixed(1)}" fill="none" opacity=".25" transform="translate(0,${(6 * sc).toFixed(1)})" filter="url(#blur2)"/><path d="${d}" stroke="#e8b84a" stroke-width="${(6 * sc).toFixed(1)}" fill="none"/><path d="${d}" stroke="#fff" stroke-width="${(1.6 * sc).toFixed(1)}" fill="none" opacity=".4" stroke-dasharray="${(6 * sc).toFixed(1)} ${(5 * sc).toFixed(1)}"/>`;
  // the person floats just above the ground, body along the rope, pulling hand over hand
  const th = lerp(-.22, -.05, ease(clamp(T / 3.8))), [hx, hy, hr, hs] = gp(th, .118), ph = T * 3.4;
  const A = astro(hx, hy, { s: hs, face: 1, rot: hr + 88, air: 1, lF: [.12, .05], lB: [-.08, -.2], hF: gp(th + .2 + .025 * Math.sin(ph), rh), hB: gp(th + .17 - .025 * Math.sin(ph), rh) });
  o += A.s;
  F.ov = o; return space(t);
}
// 6: the horizon is only 6 m away; a few moves take you from day into night
function sceneHorizon(t) {
  const c = camP(2.6, 0, 0, -.3, -1.16, 34), L = Lcam(c, -.94, .34, -.04); planetW(t, c, L, { earth: 0 });
  const S = sil(c), thT = Math.atan2(.34, .94), litF = th => -.94 * Math.sin(th) + .34 * Math.cos(th);
  const mv = ease(ramp(t, WS(6, 6), WS(6, 11) + .3)), th = lerp(0, thT + .22, mv), [px, py, pr, ps] = S.at(th), kN = clamp(1 - (litF(th) + .02) / .1);
  const A = astro(px, py, { s: ps, face: 1, rot: pr, walk: mv > 0 && mv < 1 ? t * 3.4 : 0, amp: .3 });
  let o = `<defs>${HDEFS()}</defs>` + sunDisc(96, 420, 1);
  const ha = ease(ramp(t, WS(6, 1), WS(6, 2))) * (1 - ease(ramp(t, WS(6, 6) - .3, WS(6, 6))));
  if (ha > .01) { const E = A.P.eye, dE = Math.hypot(E[0] - S.x, E[1] - S.y), ang = Math.atan2(E[1] - S.y, E[0] - S.x) + Math.acos(S.R / dE), H = [S.x + Math.cos(ang) * S.R, S.y + Math.sin(ang) * S.R];
    o += `<g opacity="${ha.toFixed(2)}"><path d="M${E[0].toFixed(1)},${E[1].toFixed(1)} L${H[0].toFixed(1)},${H[1].toFixed(1)}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="12 8"/><circle cx="${H[0].toFixed(1)}" cy="${H[1].toFixed(1)}" r="9" fill="#fff4c8"/>` +
      lbl((E[0] + H[0]) / 2 + 6, (E[1] + H[1]) / 2 - 26, '٦ أمتار', 1, '#f4c76b', 38) + lbl(H[0], H[1] + 52, 'الأفق', 1, '#fff', 30) + `</g>`; }
  o += darkOn(A.s, kN * .85);
  const da = ease(ramp(t, WS(6, 9), WS(6, 10))), [nx, ny] = S.at(thT + .2, -.08), [dx, dy] = S.at(thT - .22, -.1);
  if (da > 0) o += lbl(dx, dy, 'نهار', da, '#ffe7a8', 40) + lbl(nx, ny, 'ليل', da, '#9ab8ff', 40);
  F.ov = o; return space(t);
}
// 7: the twist: throw a ball slowly, it orbits the planet like a tiny moon and hits your back about an hour and a half later
function sceneBall(t) {
  const c = camP(6.4, .12, 0, 0, -.1), L = Lcam(c, -.55, .55, .6); planetW(t, c, L);
  const S = sil(c), sc = S.s, [fx, fy, fr] = S.at(-.02), tt = WS(7, 1) + .1, tE = WS(7, 13) + .3;
  const A = astro(fx, fy, { s: sc, rot: fr, face: 1, hF: t < tt + .3 ? [fx + 60 * sc * lerp(.2, 1, ease(clamp((t - tt + .4) / .7))), fy - 190 * sc] : undefined });
  const hand = A.P.hand, rb = Math.hypot(hand[0] - S.x, hand[1] - S.y), a0 = Math.atan2(hand[1] - S.y, hand[0] - S.x);
  let o = `<defs>${HDEFS()}</defs>`;
  const p = clamp((t - tt) / (tE - tt)), ang = a0 + 2 * Math.PI * (ease(p) * .985), hit = t > tE - .05;
  const pth = `<circle cx="${S.x.toFixed(1)}" cy="${S.y.toFixed(1)}" r="${rb.toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="6 9" opacity="${(.7 * ease(ramp(t, tt, tt + 1))).toFixed(2)}"/>`;
  o += pth + A.s;
  const bx = t < tt ? hand[0] + 3 : S.x + Math.cos(ang) * rb, by = t < tt ? hand[1] - 4 : S.y + Math.sin(ang) * rb;
  o += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${Math.max(5, 14 * sc * 3).toFixed(1)}" fill="url(#ballG)"/>`;
  if (hit) { const k = Math.exp(-(t - tE) * 2.5), B = A.P.chest; o += `<g opacity="${k.toFixed(2)}">${[0, 1, 2, 3, 4].map(i => { const a = i * 1.26 + t * 2, r = 36 + 10 * Math.sin(t * 9 + i); return `<path d="M${(B[0] - 20 + Math.cos(a) * r).toFixed(1)},${(B[1] + Math.sin(a) * r).toFixed(1)} l6,-12 l6,12 l-12,-7 h12z" fill="#ffe9a8"/>`; }).join('')}</g>`; }
  // the clock: 0 → about 1.5 hours
  const ca = ease(ramp(t, tt + .2, tt + .6)), mins = Math.round(90 * p);
  if (ca > 0) { const hh = Math.floor(mins / 60), mm = mins % 60;
    o += `<g opacity="${ca.toFixed(2)}">` + panel(230, 1080, 260, 96) + `<text x="360" y="1148" text-anchor="middle" font-family="Inter" font-weight="700" font-size="54" fill="#fff" style="direction:ltr">${AR(hh)}:${AR(String(mm).padStart(2, '0'))}</text></g>`; }
  F.ov = o; return space(t);
}
// 8: and it would not even be round: rock only pulls itself into a ball in bodies hundreds of kilometres across
function scenePotato(t) {
  const c = camP(6.8, .12, 0, 0, .1), L = Lcam(c, -.55, .55, .6), m = ease(ramp(t, WS(8, 1), WS(8, 2) + .6));
  planetW(t, c, L, { lump: .75 * m });
  const S = sil(c), [fx, fy, fr, fs] = S.at(0, .75 * m * .02), A = astro(fx, fy, { s: fs, rot: fr, face: 1 });
  let o = `<defs>${HDEFS()}</defs>` + A.s;
  const pa = ease(ramp(t, WS(8, 3), WS(8, 4)));
  if (pa > 0) { o += `<g opacity="${pa.toFixed(2)}">` + panel(60, 960, 600, 230);
    o += `<path d="M150,1080 c-26,-34 10,-62 40,-52 c34,-20 70,4 62,36 c22,30 -10,58 -44,48 c-28,18 -64,0 -58,-32z" fill="#8a7a68"/>` + lbl(200, 1160, 'صخرةٌ صغيرة', 1, '#fff', 24);
    o += `<circle cx="510" cy="1074" r="58" fill="#8a7a68"/><circle cx="494" cy="1056" r="24" fill="#fff" opacity=".12"/>` + lbl(510, 1160, 'قطرٌ أكبرُ من ٦٠٠ كم', 1, '#f4c76b', 24) + arrow(300, 1074, 420, 1074, 1, '#f4c76b', 4) + `</g>`; }
  F.ov = o; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(9)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(9)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7) - .3, WS(9, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSize }, { s: S0(2) - .2, f: sceneWeight }, { s: S0(3) - .2, f: sceneAir }, { s: S0(4) - .2, f: sceneStep }, { s: S0(5) - .2, f: sceneRopes }, { s: S0(6) - .2, f: sceneHorizon }, { s: S0(7) - .2, f: sceneBall }, { s: S0(8) - .2, f: scenePotato }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneSize, sceneWeight, sceneAir, sceneStep, sceneRopes, sceneHorizon, sceneBall, scenePotato]);
const XF = .5;
const TLI = [['الجاذبيّة', S0(2)], ['الهواء', S0(3)], ['الخطوة', S0(4)], ['الحبال', S0(5)]];
const LIST_ON = new Set([sceneRopes]);
const CHIPS = [
  ['c0', 'قطرُه ٢٠ مترًا', 360, 1205, 'big', WS(0, 5), S0(1) - .3],
  ['c1', 'بحجمِ بيت', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c2', 'أضعفُ ٦٠٠ ألفِ مرّة', 360, 330, 'big', WS(2, 3), S0(3) - .3],
  ['c3', 'الهواءُ يهرب', 360, 330, 'red big', WS(3, 4), WS(3, 9) - .2], ['c3b', 'بدلةُ فضاء دائمًا', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', 'لن تعودَ أبدًا', 360, 330, 'red big', WS(4, 6), S0(5) - .3],
  ['c5', 'كلُّ شيءٍ مربوط', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c7', 'قمرٌ صغير', 360, 330, 'big', WS(7, 11), S0(8) - .3],
  ['c8', 'ليس كرة!', 360, 330, 'red big', WS(8, 2), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الحياةُ هناك</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
