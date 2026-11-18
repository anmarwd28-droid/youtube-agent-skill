
// ap_c.js: scenes 7-12 (Newton's cannon, no satellites, Apollo 8, the twist, the tree today, the end), scene list, chips, UI

// ---------- 7: a cannonball at about 8 km/s never lands: it goes round the Earth ----------
function shotPath(c, R, r0, f, phi) { const e = 1 - f * f, r = e < 1e-4 ? r0 : r0 * (1 - e) / (1 - e * Math.cos(phi)); return [c[0] + r * Math.sin(phi), c[1] - r * Math.cos(phi), r]; }
function sceneCannon(t) {
  const t0 = S0(7) - .2, T = t - t0;
  const G = gAt(t, 330, 900, { d: 10.2, el: .18, lon: 10 + T * 2.5, clouds: .4, lights: .2, off: -.9 });
  const c = G.c0, R = G.R, r0 = R * 1.12;
  let o = `<defs>${APDEFS()}<radialGradient id="ballG" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#9aa0aa"/><stop offset=".5" stop-color="#3a3e46"/><stop offset="1" stop-color="#0e1014"/></radialGradient></defs>`;
  // the tall mountain (exaggerated, as in Newton's own drawing) with the cannon on its peak
  const mx = c[0], my = c[1] - R, pk = c[1] - r0 + 4, cp = q => [c[0] + R * .995 * Math.sin(q), c[1] - R * .995 * Math.cos(q)];
  let base = ''; for (let i = 0; i <= 12; i++) { const [x, y] = cp(lerp(.32, -.32, i / 12)); base += ` L${x.toFixed(1)},${y.toFixed(1)}`; }
  const [lx, ly] = cp(-.32), [rx, ry] = cp(.32), mid = `M${lx.toFixed(1)},${ly.toFixed(1)} Q${mx - 60},${my - 20} ${mx - 22},${pk + 30} L${mx - 6},${pk + 8} L${mx + 10},${pk + 6} L${mx + 26},${pk + 26} Q${mx + 70},${my - 24} ${rx.toFixed(1)},${ry.toFixed(1)}${base}Z`;
  o += `<path d="${mid}" fill="#7a6a54"/><path d="${mid}" fill="#000" filter="url(#stoneF)" opacity=".55"/>` +
    `<path d="M${mx + 2},${pk + 8} L${mx + 10},${pk + 6} L${mx + 26},${pk + 26} Q${mx + 70},${my - 24} ${rx.toFixed(1)},${ry.toFixed(1)} L${mx + 30},${my + 6}Z" fill="#1a1410" opacity=".4"/>` +
    `<path d="M${mx - 22},${pk + 30} L${mx - 6},${pk + 8} L${mx + 10},${pk + 6} L${mx + 22},${pk + 22} L${mx + 8},${pk + 30} L${mx - 4},${pk + 22} L${mx - 14},${pk + 36}Z" fill="#eef2f6"/>` +
    `<path d="M${lx.toFixed(1)},${ly.toFixed(1)}${base}" stroke="#2a3a20" stroke-width="5" fill="none" opacity=".4" filter="url(#blur2)"/>`;
  o += `<g transform="translate(${mx},${pk + 6}) scale(1.5)"><path d="M-16,0 L16,0 L12,-6 L-12,-6Z" fill="#5a3e24"/><circle cx="-8" cy="-2" r="7" fill="#4a3220" stroke="#2a1a10" stroke-width="2"/><circle cx="8" cy="-2" r="7" fill="#4a3220" stroke="#2a1a10" stroke-width="2"/><path d="M-14,-14 L30,-17 L30,-6 L-14,-5Z" fill="#2e3036"/><rect x="27" y="-19" width="5" height="15" fill="#1a1c20"/><path d="M-12,-13 L28,-16" stroke="#9a9ea6" stroke-width="2" opacity=".6"/><circle cx="-14" cy="-9.5" r="5" fill="#2e3036"/></g>`;
  // three shots, each faster: the first two fall back, the third goes all the way round
  const SH = [[.9, WS(7, 3) - .1, 1.1], [.95, WS(7, 5) - .1, 1.3], [1, WS(7, 9) - .2, WS(7, 15) + .2 - (WS(7, 9) - .2)]];
  SH.forEach(([f, ts, dur], i) => { if (t < ts) return; const e = 1 - f * f; let hit = 6.2832; if (f < 1) { const ch = (1 - (r0 * (1 - e)) / R) / e; hit = Math.acos(clamp(ch, -1, 1)); }
    const u = clamp((t - ts) / dur), ph = hit * (i < 2 ? Math.pow(u, .85) : ease(u)), n = 60, col = i < 2 ? '#ffb07a' : '#f4c76b';
    let d = ''; for (let k = 0; k <= n; k++) { const [x, y] = shotPath(c, R, r0, f, ph * k / n); d += (k ? ' L' : 'M') + x.toFixed(1) + ',' + (y - 16).toFixed(1); }
    const fade = i < 2 ? 1 - .55 * ease(ramp(t, SH[i + 1][1] - .2, SH[i + 1][1] + .4)) : 1;
    o += `<path d="${d}" stroke="${col}" stroke-width="${i < 2 ? 3 : 4}" fill="none" stroke-dasharray="${i < 2 ? '8 6' : '0'}" opacity="${(.9 * fade).toFixed(2)}"/>`;
    const [bx, by] = shotPath(c, R, r0, f, ph); if (u < 1 || i === 2) o += `<circle cx="${bx.toFixed(1)}" cy="${(by - 16).toFixed(1)}" r="8" fill="url(#ballG)"/>`;
    if (i < 2 && u >= 1) { const k = ramp(t, ts + dur, ts + dur + .8); if (k < 1) o += `<circle cx="${bx.toFixed(1)}" cy="${(by - 16).toFixed(1)}" r="${(8 + 30 * k).toFixed(1)}" fill="#c8b8a0" opacity="${(.6 * (1 - k)).toFixed(2)}" filter="url(#blur5)"/>`; }
    if (u < .12) o += `<circle cx="${mx + 52}" cy="${pk - 14}" r="${(10 + 120 * u).toFixed(1)}" fill="#ffe0b0" opacity="${(.8 * (1 - u / .12)).toFixed(2)}" filter="url(#blur5)"/>`;
    const lb = ['أبطأ: تسقط', 'أسرع: أبعد', ''][i]; if (lb) { const [lx, ly] = shotPath(c, R, r0, f, hit * .62); o += lbl(lx + 70, ly - 6, lb, ease(ramp(t, ts + .3, ts + .7)) * fade, col, 22); } });
  F.ov = o; return space(t);
}

// ---------- 8: no satellites: no maps on your phone, no weather forecast, no live broadcast ----------
function cardI(x, y, kind, a, off, lab) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})"><rect x="-92" y="-92" width="184" height="184" rx="22" fill="#0a0e1c" opacity=".88"/><rect x="-92" y="-92" width="184" height="184" rx="22" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>`;
  let g = '';
  if (kind === 0) { g += `<rect x="-44" y="-74" width="88" height="148" rx="14" fill="#1a1c22"/><rect x="-38" y="-62" width="76" height="120" rx="4" fill="#e8e2d0"/>` +
      `<path d="M-38,-20 Q0,-30 38,-6 M-10,-62 Q-4,0 8,58 M-38,30 L38,18" stroke="#fff" stroke-width="6" fill="none"/><path d="M-38,-20 Q0,-30 38,-6 M-10,-62 Q-4,0 8,58" stroke="#f4c76b" stroke-width="3" fill="none"/><path d="M14,-62 Q22,-30 38,-40 L38,-62Z" fill="#9ac8e8"/><rect x="-36" y="20" width="22" height="30" fill="#a8cc88"/>` +
      `<path d="M8,-28 a12,12 0 1 1 0.1,0 M8,-16 L8,-2" fill="#e53935" stroke="#e53935" stroke-width="4"/><circle cx="8" cy="-28" r="5" fill="#fff"/>`; }
  if (kind === 1) { g += `<circle cx="-18" cy="-18" r="30" fill="#ffc83a"/>` + Array.from({ length: 8 }, (_, i) => { const q = i * .785; return `<path d="M${(-18 + Math.cos(q) * 38).toFixed(1)},${(-18 + Math.sin(q) * 38).toFixed(1)} L${(-18 + Math.cos(q) * 48).toFixed(1)},${(-18 + Math.sin(q) * 48).toFixed(1)}" stroke="#ffc83a" stroke-width="5" stroke-linecap="round"/>`; }).join('') +
      `<path d="M-30,40 a24,24 0 0 1 10,-44 a32,32 0 0 1 58,6 a22,22 0 0 1 2,38Z" fill="#e8eef4"/><path d="M-30,40 H40" stroke="#b8c4d2" stroke-width="3"/>` + [-16, 4, 24].map(dx => `<path d="M${dx},52 l-6,14" stroke="#6ab0ff" stroke-width="4" stroke-linecap="round"/>`).join(''); }
  if (kind === 2) { g += `<rect x="-62" y="-50" width="124" height="84" rx="8" fill="#2a2e36"/><rect x="-54" y="-42" width="108" height="68" rx="3" fill="#4a7ab0"/><path d="M-54,10 Q-20,-14 0,4 T54,-6 L54,26 L-54,26Z" fill="#2e5a3a"/><path d="M-20,34 L-34,62 M20,34 L34,62" stroke="#2a2e36" stroke-width="6"/>` +
      `<rect x="-50" y="-38" width="46" height="18" rx="4" fill="#e53935"/><circle cx="-41" cy="-29" r="4" fill="#fff" opacity="${(.6 + .4 * Math.sin(Date.now ? 0 : 0)).toFixed(2)}"/><text x="-20" y="-24" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="12" fill="#fff">مباشر</text>`; }
  s += `<g opacity="${(1 - .55 * off).toFixed(2)}">${g}</g>`;
  if (off > 0) s += `<path d="M-70,-70 L${(-70 + 140 * Math.min(1, off * 1.4)).toFixed(1)},${(-70 + 140 * Math.min(1, off * 1.4)).toFixed(1)}" stroke="#ff4a3a" stroke-width="10" stroke-linecap="round"/>`;
  return s + lbl(0, 136, lab, 1, '#fff', 26) + `</g>`;
}
function sceneSats(t) {
  const t0 = S0(8) - .2, T = t - t0, gone = ease(ramp(t, WS(8, 1) - .1, WS(8, 2) + .2)), live = 1 - gone;
  const G = gAt(t, 310, 690, { d: 12, el: .2, lon: 30 + T * 3, clouds: .35, lights: .3, off: -.8 });
  let o = `<defs>${APDEFS()}${TDEFS()}</defs><g opacity="${(1 - .85 * gone).toFixed(2)}">` + sats(G, t, live) + `</g>`;
  const K = [[600, WS(8, 4), 'الخرائط', 0], [360, WS(8, 8), 'الطقس', 1], [120, WS(8, 11), 'البثُّ المباشر', 2]];
  K.forEach(([x, ti, lab, k]) => { o += cardI(x, 1030, k, ease(ramp(t, ti - .5, ti - .1)), ease(ramp(t, ti + .1, ti + .5)), lab); });
  F.ov = o; return space(t);
}

// ---------- 9: Apollo 8 (1968): "I think Isaac Newton is doing most of the driving right now" ----------
function bez(p0, p1, p2, p3, u) { const v = 1 - u; return [0, 1].map(i => v * v * v * p0[i] + 3 * v * v * u * p1[i] + 3 * v * u * u * p2[i] + u * u * u * p3[i]); }
function apolloPath(E, M, ER, mR) {
  const pts = [], lo = 1.9 * mR, A = [E[0] + ER * .62, E[1] - ER * .8], B = [M[0] + lo * Math.cos(2.5), M[1] + lo * Math.sin(2.5)], C = [M[0] + lo * Math.cos(-2.5), M[1] + lo * Math.sin(-2.5)], D = [E[0] + ER * .75, E[1] + ER * .68];
  for (let i = 0; i <= 40; i++) pts.push(bez(A, [A[0] + 120, A[1] - 120], [B[0] - 140, B[1] + 40], B, i / 40));
  for (let i = 1; i <= 40; i++) { const q = 2.5 - 5.0 * i / 40; pts.push([M[0] + lo * Math.cos(q), M[1] + lo * Math.sin(q)]); }
  for (let i = 1; i <= 40; i++) pts.push(bez(C, [C[0] - 140, C[1] - 40], [D[0] + 160, D[1] - 60], D, i / 40));
  return pts;
}
function sceneApollo(t) {
  const t0 = S0(9) - .2, T = t - t0;
  const G = gAt(t, 180, 900, { d: 14, el: .15, lon: 60 + T * 3, clouds: .45, lights: .25, off: -.4 });
  const mpos = camPt(G.cam, 440, 600, 14.6), [mx, my, mR] = fit3(G.cam, mpos, .27);
  F.w.moon = { pos: mpos, r: .27, L: F.w.L, shC: NOFAR, shR: .001, rot: .4 };
  const P = apolloPath(G.c0, [mx, my], G.R, mR);
  let o = `<defs>${APDEFS()}</defs>`;
  let d = ''; P.forEach((p, i) => d += (i ? ' L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1));
  const pa = ease(ramp(t, t0 + .2, t0 + .8));
  o += `<path d="${d}" stroke="#f4c76b" stroke-width="2.6" fill="none" stroke-dasharray="9 8" opacity="${(.75 * pa).toFixed(2)}"/>`;
  // the spacecraft moving along: a cone and a service module
  const u = clamp((t - t0 - .3) / (S0(10) - t0 + .4)), fi = u * (P.length - 1), i0 = Math.min(P.length - 2, Math.floor(fi)), [sx, sy] = P[i0].map((v, k) => lerp(v, P[i0 + 1][k], fi - i0)), ang = Math.atan2(P[i0 + 1][1] - P[i0][1], P[i0 + 1][0] - P[i0][0]) * 57.3;
  const behind = Math.hypot(sx - mx, sy - my) < mR * 1.05 && sx > mx;
  if (!behind) o += `<g transform="translate(${sx.toFixed(1)},${sy.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(.9)"><path d="M10,-7 L22,0 L10,7Z" fill="#e8ecf2"/><rect x="-14" y="-7" width="24" height="14" rx="2" fill="#c8ccd4"/><rect x="-14" y="-7" width="24" height="5" fill="#fff" opacity=".4"/><path d="M-14,-4 L-22,-6 L-22,6 L-14,4Z" fill="#5a5e66"/></g>`;
  o += lbl(mx - mR - 46, my + 8, 'القمر', pa, '#dfe6f0', 24);
  // the quote
  const qa = ease(ramp(t, WS(9, 6) - .2, WS(9, 7) + .2));
  if (qa > 0) o += `<g opacity="${qa.toFixed(2)}">` + panel(60, 1030, 600, 190, 1) + `<rect x="60" y="1030" width="8" height="190" rx="4" fill="#f4c76b"/>` + lbl(360, 1104, '«نيوتن هو مَن يقودُ الآن»', 1, '#f4c76b', 40) + lbl(360, 1176, 'رائدُ الفضاء بيل أندرس، أبولو ٨', 1, '#fff', 26) + `</g>`;
  F.ov = o; return space(t);
}

// ---------- 10: the twist: the apple never hit his head; he only saw it fall ----------
function parchment(x, y, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) rotate(-4)"><rect x="-150" y="-110" width="300" height="220" rx="6" fill="url(#paperG)"/><rect x="-150" y="-110" width="300" height="220" rx="6" fill="#000" filter="url(#paperF)" opacity=".8"/><rect x="-150" y="-110" width="300" height="220" rx="6" fill="none" stroke="#8a7a5a" stroke-width="2"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M-120,${-80 + i * 20} H${120 - (i === 7 ? 90 : (i * 13) % 30)}" stroke="#3a2a1a" stroke-width="2.2" opacity=".45" stroke-dasharray="${10 + (i * 7) % 9} 4"/>`;
  s += `<path d="M-60,${-80 + 3 * 20 + 6} H70" stroke="#c0281a" stroke-width="4" opacity=".75"/>`;
  return s + `</g>` + lbl(x, y + 150, 'رواها نيوتن لصديقه، ونُشرت عام ١٧٥٢', 1, '#fff', 22);
}
function sceneTwist(t) {
  const HZ = 790, fa = WS(10, 1) - .2, fb = WS(10, 3), k = clamp((t - fa) / (fb - fa));
  let s = `<defs>${APDEFS()}</defs>` + orchardBack(t, HZ, { house: [560, HZ + 22, .44] });
  s += appleTree(165, 1110, 980, 17, t);
  const nx = 268, ny = 1150, ns = 1.42, see = ease(ramp(t, fa + .2, fb + .3));
  s += newton(nx, ny, { s: ns, face: 1, sit: 1, hipY: -12, lF: [2.15, .62], lB: [1.5, 1.62], lean: -6, lookUp: lerp(.1, -.5, see), hF: [nx + 82 * ns, ny - 60 * ns], hB: [nx + 70 * ns, ny - 66 * ns] });
  const [hx, hy] = HP.head;
  s += `<g transform="translate(${(nx + 78 * ns).toFixed(1)},${(ny - 70 * ns).toFixed(1)}) rotate(-28)"><rect x="-26" y="-4" width="52" height="8" fill="#5a3a22"/><path d="M-24,-4 Q-12,-16 0,-6 Q12,-16 24,-4" fill="#f0e6cc" stroke="#8a7a5a" stroke-width="1"/></g>`;
  // the apple falls onto the grass in front of him, bounces and rolls a little
  const gx = 520, gy = 1172, x0 = 540, y0 = 800;
  let ax = x0, ay = y0, rot = 0;
  if (k > 0) { if (k < 1) { ay = lerp(y0, gy, k * k); ax = lerp(x0, gx, k); } else { const b = t - fb, hop = Math.max(0, Math.sin(Math.min(b / .45, 1) * Math.PI)) * 40 * Math.exp(-b * 2); ax = gx - 50 * (1 - Math.exp(-b * 2.2)); ay = gy - hop; rot = -120 * (1 - Math.exp(-b * 2.2)); } }
  if (k > 0 && k < 1) s += `<path d="M${ax},${(ay - 14 - 50 * k).toFixed(1)} L${ax},${(ay - 10).toFixed(1)}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".2" filter="url(#blur2)"/>`;
  s += `<ellipse cx="${ax.toFixed(1)}" cy="${gy + 14}" rx="18" ry="5" fill="#000" opacity="${(.3 * k).toFixed(2)}" filter="url(#blur2)"/>` + appleS(ax, ay, 18, rot);
  // "on his head?": a dashed path to the head, crossed out
  const xa = ease(ramp(t, WS(10, 4) - .2, WS(10, 5))), xc = ease(ramp(t, WS(10, 6) - .2, WS(10, 6) + .2));
  if (xa > 0) s += `<g opacity="${(xa * (1 - ease(ramp(t, WS(10, 8), WS(10, 9))))).toFixed(2)}"><path d="M${hx + 8},800 L${hx + 8},${hy - 40}" stroke="#fff" stroke-width="3" stroke-dasharray="9 7"/>${appleS(hx + 8, 790, 16, 0, .6)}` +
    (xc > 0 ? `<path d="M${hx - 30},${hy - 120} L${hx + 46},${hy - 44} M${hx + 46},${hy - 120} L${hx - 30},${hy - 44}" stroke="#ff4a3a" stroke-width="10" stroke-linecap="round" opacity="${xc.toFixed(2)}"/>` : '') + `</g>`;
  s += parchment(470, 560, ease(ramp(t, WS(10, 7) - .3, WS(10, 8))));
  noEarth(); F.ov = ''; return s;
}

// ---------- 11: the same tree is still alive today, more than 350 years later ----------
function sceneToday(t) {
  const t0 = S0(11) - .2, T = t - t0, HZ = 760;
  let s = `<defs>${APDEFS()}</defs>` + countrySky(t, HZ) + fields(t, HZ, 13);
  s += meadow(HZ + 6, 1320, t, { c0: '#8eaa56', c1: '#4e6e2a', patch: '#b8b464', seed: 73 });
  s += manor(560, 1000, .62, { smoke: t, seed: 9 });
  // the old tree: a gnarled leaning trunk, a heavy limb held up by a wooden prop
  s += appleTree(200, 1110, 760, 41, t, { rx: .5, ry: .26, dx: 60 });
  s += `<path d="M430,1112 L392,840" stroke="#6a5038" stroke-width="13" stroke-linecap="round"/><path d="M428,1110 L391,842" stroke="#a88a64" stroke-width="4" opacity=".5"/><path d="M372,846 Q392,826 414,838" stroke="#4a3626" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  // a low wooden fence around it
  const FX = [[-10, 1190], [130, 1178], [270, 1170], [410, 1176]];
  FX.forEach(([x, y], i) => { s += `<rect x="${x - 6}" y="${y - 70}" width="12" height="76" fill="#8a6a48"/><rect x="${x - 6}" y="${y - 70}" width="5" height="76" fill="#b8946a" opacity=".6"/>`; if (i < FX.length - 1) { const [x2, y2] = FX[i + 1]; [-56, -28].forEach(dy => s += `<path d="M${x},${y + dy} L${x2},${y2 + dy}" stroke="#9a7650" stroke-width="8"/><path d="M${x},${y + dy - 3} L${x2},${y2 + dy - 3}" stroke="#c8a478" stroke-width="2" opacity=".6"/>`); } });
  // visitors today: one takes a photo with a phone
  const V = [[520, 1200, 1.15, -1, 6], [618, 1215, 1.2, -1, 2]];
  V.forEach(([x, y, sc, f, pi], i) => { s += hero(x, y, Object.assign({ s: sc, face: f, shade: 1, lookUp: i === 0 ? .25 : .1 }, palS(pi), i === 0 ? { hF: [x - 70 * sc, y - 210 * sc], hB: [x - 64 * sc, y - 214 * sc] } : {})); if (i === 0) { const [px, py] = HP.hand; s += `<rect x="${(px - 18).toFixed(1)}" y="${(py - 30).toFixed(1)}" width="16" height="30" rx="3" fill="#1a1c22"/><rect x="${(px - 16).toFixed(1)}" y="${(py - 28).toFixed(1)}" width="12" height="26" rx="2" fill="#8ab8e8" opacity=".85"/>`; } });
  // a photo flash
  const fl = ramp(t, WS(11, 6), WS(11, 6) + .35); if (fl > 0 && fl < 1) s += `<circle cx="430" cy="960" r="${(20 + 60 * fl).toFixed(1)}" fill="#fff" opacity="${(.6 * (1 - fl)).toFixed(2)}" filter="url(#blur5)"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: ask and subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 0 - (t - S0(12)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 10) - .3, WS(12, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePlague }, { s: S0(2) - .2, f: sceneApple }, { s: S0(3) - .2, f: sceneMoonOrbit }, { s: S0(4) - .2, f: scenePrincipia }, { s: S0(5) - .2, f: sceneHalley },
  { s: S0(6) - .2, f: sceneNeptune }, { s: S0(7) - .2, f: sceneCannon }, { s: S0(8) - .2, f: sceneSats }, { s: S0(9) - .2, f: sceneApollo }, { s: S0(10) - .2, f: sceneTwist }, { s: S0(11) - .2, f: sceneToday }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneApple, sceneMoonOrbit, sceneNeptune, sceneCannon, sceneSats, sceneApollo]);
const XF = .5;
const TLI = [['هالي', S0(5)], ['نبتون', S0(6)], ['الأقمار', S0(8)], ['القمر', S0(9)]];
const LIST_ON = new Set([sceneHalley, sceneNeptune, sceneSats, sceneApollo]);
const CHIPS = [
  ['c1', 'الطاعون عام ١٦٦٦', 360, 330, 'red big', WS(1, 0), S0(2) - .3],
  ['c2', 'لماذا لا يسقطُ القمر؟', 360, 330, 'big', WS(2, 10), S0(3) - .3],
  ['c3', '١٫٣ مم كلَّ ثانية', 360, 330, 'big', WS(3, 8), S0(4) - .3],
  ['c4', 'قانونُ الجاذبيّة ١٦٨٧', 360, 330, 'big', WS(4, 4), WS(4, 9) - .1],
  ['c4b', 'ربّما تأخّرَ عشراتِ السنين', 360, 330, 'red big', WS(4, 9), S0(5) - .3],
  ['c5', 'عادَ عام ١٧٥٨', 360, 330, 'big', WS(5, 3), S0(6) - .3],
  ['c6', 'اكتُشِفَ بالحساب ١٨٤٦', 360, 330, 'big', WS(6, 5), S0(7) - .3],
  ['c7', '٨ كم في الثانية', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c8', 'لا أقمارَ صناعيّة', 360, 330, 'red big', WS(8, 1), S0(9) - .3],
  ['c9', 'أبولو ٨ — ١٩٦٨', 360, 330, 'big', WS(9, 2), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', S0(10), WS(10, 4) - .1],
  ['c10b', 'أسطورة!', 360, 330, 'red big', WS(10, 4), S0(11) - .3],
  ['c11', 'أكثرُ من ٣٥٠ عاماً', 360, 330, 'big', WS(11, 8), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا الجاذبيّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
