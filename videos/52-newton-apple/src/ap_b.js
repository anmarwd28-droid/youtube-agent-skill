
// ap_b.js: scenes 3-6 (the Moon is falling, the law of gravity, Halley's comet, Neptune found on paper)

// ---------- 3: the Moon really falls: 1.3 mm every second, but it races forward, so it keeps going round ----------
const MO = { RM: 2.7, w: .1 };
const moonAt = th => [MO.RM * Math.cos(th), 0, -MO.RM * Math.sin(th)];
const arrowH = (x0, y0, x1, y1, col, w = 4, hs = 16) => { const a = Math.atan2(y1 - y0, x1 - x0); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${(x1 - hs * Math.cos(a - .45)).toFixed(1)},${(y1 - hs * Math.sin(a - .45)).toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} L${(x1 - hs * Math.cos(a + .45)).toFixed(1)},${(y1 - hs * Math.sin(a + .45)).toFixed(1)}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
function sceneMoonOrbit(t) {
  const t0 = S0(3) - .2, T = t - t0, tA = WS(3, 1) - .1, tB = WS(3, 10), tC = WS(3, 14);
  const G = gW(t, { d: 21 - T * .06, el: 1.0, az: .25, lon: 20 + T * 4, clouds: .45, lights: .25, off: -1.1, tg: [0, 0, -1.1] });
  const th = -2.0 + MO.w * T, mp = moonAt(th);
  F.w.moon = { pos: mp, r: .42, L: F.w.L, shC: NOFAR, shR: .001, rot: .2 };
  const P = p => proj3(G.cam, p), [mx, my] = P(mp), mR = fit3(G.cam, mp, .42)[2];
  let o = `<defs>${APDEFS()}</defs>`;
  // the orbit: a faint ring always, drawn bright at the end
  const ring = (a0, a1, n) => { let d = ''; for (let i = 0; i <= n; i++) { const [x, y] = P(moonAt(lerp(a0, a1, i / n))); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; };
  const ra = ease(ramp(t, tC - .2, tC + .6));
  o += `<path d="${ring(0, 6.2832, 120)}" stroke="#9fc4ff" stroke-width="${(1.6 + 1.4 * ra).toFixed(1)}" fill="none" opacity="${(.22 + .5 * ra).toFixed(2)}" stroke-dasharray="${ra > .5 ? '0' : '6 8'}"/>`;
  // from tA: where the Moon would go without gravity (straight on) vs where it really goes; the gap = the fall
  const thA = -2.0 + MO.w * (tA - t0), PA = moonAt(thA), v = [-Math.sin(thA), 0, -Math.cos(thA)], ga = ease(ramp(t, tA, tA + .4)) * (1 - ease(ramp(t, tB + .6, tB + 1.1)));
  if (ga > 0) { const dth = Math.max(0, th - thA), gp = PA.map((q, i) => q + v[i] * MO.RM * Math.tan(dth)), [gx, gy] = P(gp), [ax, ay] = P(PA), [ex, ey] = P(PA.map((q, i) => q + v[i] * 3.6));
    o += `<g opacity="${ga.toFixed(2)}"><path d="M${ax.toFixed(1)},${ay.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#fff" stroke-width="2.6" stroke-dasharray="10 8" opacity=".8"/>` +
      `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="${mR.toFixed(1)}" fill="#dfe6f0" opacity=".12" stroke="#fff" stroke-width="2" stroke-dasharray="6 5"/>`;
    if (dth > .08) o += arrowH(gx, gy, lerp(gx, mx, .82), lerp(gy, my, .82), '#ff7a5a', 4, 14);
    o += lbl(ex - 10, ey - 24, 'بلا جاذبيّة', ease(ramp(t, tA + .3, tA + .8)), '#fff', 24) + `</g>`;
    const fa = ease(ramp(t, WS(3, 6) - .2, WS(3, 7))) * ga; if (fa > 0) o += lbl(lerp(gx, mx, .5) - 20, lerp(gy, my, .5) + 44, 'يسقطُ نحوَنا', fa, '#ff9a7a', 26); }
  // its forward speed: an arrow along its path
  const va = ease(ramp(t, tB - .2, tB + .3));
  if (va > 0) { const tip = mp.map((q, i) => q + [-Math.sin(th), 0, -Math.cos(th)][i] * 1.0), [tx, ty] = P(tip); o += `<g opacity="${va.toFixed(2)}">${arrowH(mx, my, tx, ty, '#f4c76b', 5, 18)}${lbl(Math.min(tx, 630), ty + 44, '١ كم/ث', 1, '#f4c76b', 26)}</g>`; }
  o += lbl(G.c0[0], G.c0[1] + G.R + 40, 'الأرض', ease(ramp(t, t0 + .3, t0 + .8)), '#9fd0ff', 24) + lbl(mx - mR - 44, my + 8, 'القمر', ease(ramp(t, t0 + .3, t0 + .8)), '#dfe6f0', 24);
  F.ov = o; return space(t);
}

// ---------- 4: from this question came the law of gravity... without the apple, maybe decades later ----------
function scenePrincipia(t) {
  const t0 = S0(4) - .2, T = t - t0, gone = ease(ramp(t, WS(4, 6) - .1, WS(4, 9))), cf = 1 + .04 * Math.sin(t * 13) + .03 * Math.sin(t * 29);
  let s = `<defs>${APDEFS()}<linearGradient id="wallP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a120c"/><stop offset="1" stop-color="#3a2618"/></linearGradient><linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4426"/><stop offset="1" stop-color="#3a2210"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#wallP)"/>`;
  // wooden wall panels and a small leaded window with the night outside
  for (let i = 0; i < 5; i++) s += `<rect x="${-10 + i * 150}" y="250" width="132" height="420" rx="4" fill="#2a1a10" stroke="#4a2e1a" stroke-width="5"/>`;
  s += `<rect x="70" y="330" width="200" height="250" fill="#0e1a34"/><rect x="70" y="330" width="200" height="250" fill="none" stroke="#3a2412" stroke-width="12"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${70 + i * 40},330 L${70 + i * 40 + 120},580 M${270 - i * 40},330 L${150 - i * 40},580" stroke="#3a2a1a" stroke-width="2" opacity=".8"/>`).join('');
  s += `<circle cx="200" cy="390" r="26" fill="#dfe6f0" opacity=".8"/><circle cx="192" cy="384" r="26" fill="#0e1a34" opacity=".0"/>`;
  // the candle and its warm light
  const cx = 560, cy = 800;
  s += scr(`<circle cx="${cx}" cy="${cy - 70}" r="${(420 * cf).toFixed(0)}" fill="url(#candG)" opacity=".55"/>`);
  s += `<path d="M0,870 L720,870 L760,1320 L-40,1320Z" fill="url(#deskG)"/><path d="M0,870 L720,870 L760,1320 L-40,1320Z" fill="#000" filter="url(#barkF)" opacity=".35"/><rect x="-20" y="862" width="760" height="12" fill="#8a5a32"/>`;
  s += `<rect x="${cx - 16}" y="${cy - 40}" width="32" height="110" rx="4" fill="#efe4c8"/><rect x="${cx - 16}" y="${cy - 40}" width="10" height="110" fill="#fff" opacity=".4"/><ellipse cx="${cx}" cy="${cy + 72}" rx="44" ry="12" fill="#a08040"/><ellipse cx="${cx}" cy="${cy + 68}" rx="40" ry="9" fill="#c8a860"/>`;
  s += `<path d="M${cx},${cy - 40} v-12" stroke="#2a1a10" stroke-width="2"/><path d="M${cx},${cy - 96 * cf} C${cx + 12},${cy - 70} ${cx + 10},${cy - 52} ${cx},${cy - 48} C${cx - 10},${cy - 52} ${cx - 12},${cy - 70} ${cx},${cy - 96 * cf}Z" fill="#ffd27a"/><path d="M${cx},${cy - 78} C${cx + 5},${cy - 64} ${cx + 4},${cy - 54} ${cx},${cy - 51} C${cx - 4},${cy - 54} ${cx - 5},${cy - 64} ${cx},${cy - 78}Z" fill="#fff6d8"/>`;
  // the open book: two curved pages; ink drawings: the Earth, the falling apple and the Moon's orbit, lines of text, the law
  const bx = 300, by = 1010, ink = `#2a1a0e`, ia = (1 - .9 * gone).toFixed(2);
  s += `<path d="M${bx - 250},${by - 120} Q${bx - 120},${by - 150} ${bx},${by - 128} L${bx},${by + 110} Q${bx - 120},${by + 88} ${bx - 262},${by + 118}Z" fill="#5a3a20"/>`;
  s += `<path d="M${bx - 244},${by - 128} Q${bx - 120},${by - 160} ${bx - 2},${by - 134} L${bx - 2},${by + 100} Q${bx - 120},${by + 76} ${bx - 254},${by + 108}Z" fill="url(#paperG)"/><path d="M${bx + 2},${by - 134} Q${bx + 120},${by - 160} ${bx + 244},${by - 128} L${bx + 254},${by + 108} Q${bx + 120},${by + 76} ${bx + 2},${by + 100}Z" fill="url(#paperG)"/>`;
  s += `<path d="M${bx - 244},${by - 128} Q${bx - 120},${by - 160} ${bx - 2},${by - 134} L${bx - 2},${by + 100} Q${bx - 120},${by + 76} ${bx - 254},${by + 108}Z M${bx + 2},${by - 134} Q${bx + 120},${by - 160} ${bx + 244},${by - 128} L${bx + 254},${by + 108} Q${bx + 120},${by + 76} ${bx + 2},${by + 100}Z" fill="#000" filter="url(#paperF)" opacity=".8"/><path d="M${bx},${by - 134} L${bx},${by + 100}" stroke="#000" stroke-width="10" opacity=".18" filter="url(#blur5)"/>`;
  let pg = `<g opacity="${ia}" stroke="${ink}" fill="none">`;
  const ex = bx - 130, ey = by - 10; pg += `<circle cx="${ex}" cy="${ey}" r="34" stroke-width="2.4"/><path d="M${ex - 34},${ey} Q${ex},${ey + 12} ${ex + 34},${ey}" stroke-width="1.2"/>` +
    `<path d="M${ex - 92},${ey - 30} A100,82 0 0 1 ${ex + 70},${ey - 70}" stroke-width="1.8" stroke-dasharray="5 4"/><circle cx="${ex + 70}" cy="${ey - 70}" r="9" stroke-width="2"/>` +
    `<path d="M${ex + 70},${ey - 60} L${ex + 40},${ey - 30}" stroke-width="1.6"/><circle cx="${ex - 10}" cy="${ey - 60}" r="5" stroke-width="1.6"/><path d="M${ex - 10},${ey - 54} v14" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  for (let i = 0; i < 7; i++) pg += `<path d="M${ex - 100},${ey + 50 + i * 12} H${ex + 100 - (i === 6 ? 80 : 0)}" stroke-width="2" opacity=".35" stroke-dasharray="${14 + (i * 7) % 11} 4"/>`;
  for (let i = 0; i < 4; i++) pg += `<path d="M${bx + 30},${by - 110 + i * 14} H${bx + 220}" stroke-width="2" opacity=".35" stroke-dasharray="${12 + (i * 5) % 9} 4"/>`;
  for (let i = 0; i < 5; i++) pg += `<path d="M${bx + 30},${by + 20 + i * 14} H${bx + 220 - (i === 4 ? 70 : 0)}" stroke-width="2" opacity=".35" stroke-dasharray="${12 + (i * 5) % 9} 4"/>`;
  pg += `</g><g opacity="${ia}"><text x="${bx + 126}" y="${by - 18}" text-anchor="middle" direction="ltr" font-family="Georgia, serif" font-style="italic" font-size="38" fill="${ink}">F = G·m₁m₂ / r²</text></g>`;
  s += pg;
  // the quill in its inkwell
  s += `<ellipse cx="610" cy="1000" rx="34" ry="12" fill="#1a1410"/><path d="M576,1000 L580,950 Q610,940 640,950 L644,1000Z" fill="#2a2420"/><path d="M590,950 Q600,946 612,948" stroke="#8a8a8a" stroke-width="2" opacity=".5"/>`;
  s += `<path d="M608,950 L660,700" stroke="#e8e0d0" stroke-width="3"/><path d="M660,700 C700,740 690,820 640,880 C650,820 650,760 660,700Z" fill="#f0ece4"/><path d="M660,700 C640,760 636,820 640,880" stroke="#c8c0b0" stroke-width="1.5" fill="none"/>`;
  // without the apple: the ink fades and a timeline shows the law arriving decades later
  const ta = ease(ramp(t, WS(4, 9) - .2, WS(4, 10) + .2)), mv = ease(ramp(t, WS(4, 10), WS(4, 12) + .2));
  if (gone > 0) s += lbl(bx, by - 10, '؟', gone, '#ff7a5a', 120);
  if (ta > 0) { s += `<g opacity="${ta.toFixed(2)}">` + panel(60, 560, 600, 110, 1) + `<path d="M110,632 H610" stroke="#8a94a6" stroke-width="4"/><circle cx="150" cy="632" r="9" fill="#f4c76b"/>` + lbl(150, 610, '١٦٨٧', 1, '#f4c76b', 24) +
    `<circle cx="${lerp(150, 560, mv).toFixed(1)}" cy="632" r="11" fill="#ff7a5a"/>` + lbl(lerp(150, 560, mv), 610, mv > .5 ? '+عشرات السنين؟' : '', 1, '#ff9a7a', 24) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: nobody predicts the return of Halley's comet (1758) ----------
function sceneHalley(t) {
  const t0 = S0(5) - .2, T = t - t0, HZ = 960, ca = ease(ramp(t, t0, t0 + .8));
  let s = `<defs>${APDEFS()}<linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050a1c"/><stop offset=".7" stop-color="#14224a"/><stop offset="1" stop-color="#2a3a64"/></linearGradient>` +
    `<linearGradient id="dTail" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff8e8" stop-opacity=".85"/><stop offset=".4" stop-color="#e8e0d0" stop-opacity=".35"/><stop offset="1" stop-color="#c8c0b0" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="iTail" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#bfe0ff" stop-opacity=".8"/><stop offset="1" stop-color="#6ab0ff" stop-opacity="0"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="${HZ + 40}" fill="url(#nSky)"/>`;
  { const r = RS(91); for (let i = 0; i < 170; i++) { const x = r() * 720, y = r() * HZ, m = r(); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.6 + 1.6 * m * m).toFixed(1)}" fill="#fff" opacity="${(.35 + .5 * m * (.7 + .3 * Math.sin(t * 3 + i))).toFixed(2)}"/>`; } }
  // the comet: a bright head, a broad curved dust tail and a thin straight blue ion tail, pointing away from the Sun (below the horizon)
  const hx = 300 - T * 4, hy = 620 - T * 2;
  s += `<g opacity="${ca.toFixed(2)}">` + scr(`<path d="M${hx},${hy} C${hx - 60},${hy - 120} ${hx - 160},${hy - 230} ${hx - 300},${hy - 300} L${hx - 210},${hy - 330} C${hx - 110},${hy - 240} ${hx - 30},${hy - 120} ${hx + 6},${hy - 6}Z" fill="url(#dTail)" filter="url(#blur9)"/>` +
    `<path d="M${hx},${hy} L${hx - 150},${hy - 400} L${hx - 120},${hy - 404}Z" fill="url(#iTail)" filter="url(#blur5)"/><path d="M${hx},${hy} C${hx - 50},${hy - 110} ${hx - 140},${hy - 210} ${hx - 260},${hy - 290}" stroke="#fff" stroke-width="3" fill="none" opacity=".25" filter="url(#blur2)"/>` +
    `<circle cx="${hx}" cy="${hy}" r="70" fill="url(#comG)"/><circle cx="${hx}" cy="${hy}" r="7" fill="#fff"/>`) + `</g>`;
  // an old town on a hill: gables, chimneys, a tower, a few warm windows
  let tw = `M-20,${HZ + 30} L-20,${HZ - 40}`; const r = RS(57); let x = -20; const roofs = [];
  while (x < 740) { const w = 50 + r() * 50, h = 60 + r() * 60, top = HZ - h; if (x > 420 && x < 500) { tw += ` L${x},${HZ - 150} L${x + 12},${HZ - 150} L${x + 12},${HZ - 210} L${x + 24},${HZ - 250} L${x + 36},${HZ - 210} L${x + 36},${HZ - 150} L${x + 48},${HZ - 150}`; x += 48; continue; }
    tw += ` L${x},${top + 30} L${x + w / 2},${top} L${x + w},${top + 30}`; roofs.push([x, w, top]); if (r() < .6) tw += ` L${x + w * .75},${top + 14} L${x + w * .75},${top - 10} L${x + w * .75 + 12},${top - 10} L${x + w * .75 + 12},${top + 20}`; x += w; }
  tw += ` L740,${HZ + 30}Z`;
  s += `<path d="${tw}" fill="#0c1020"/>`;
  roofs.forEach(([x0, w, top], i) => { const q = RS(i + 5); for (let k = 0; k < 2; k++) if (q() < .45) s += `<rect x="${(x0 + 10 + q() * (w - 24)).toFixed(1)}" y="${(top + 40 + q() * 30).toFixed(1)}" width="9" height="12" fill="#ffc870" opacity=".85"/>`; });
  s += `<path d="M-20,${HZ + 10} Q200,${HZ - 30} 420,${HZ + 4} T760,${HZ - 10} L760,1320 L-20,1320Z" fill="#141c14"/><path d="M-20,${HZ + 10} Q200,${HZ - 30} 420,${HZ + 4} T760,${HZ - 10} L760,1320 L-20,1320Z" fill="#000" filter="url(#cropT)" opacity=".3"/>`;
  // people of the 1700s on the hill, looking up and pointing
  const PP = [[120, 1120, .8, 1, '#3a2c3a', '#2a2420'], [270, 1170, 1.1, 1, '#4a3424', '#2a2420'], [480, 1130, .82, -1, '#2c3444', '#22242a'], [590, 1150, .86, -1, '#4a2a2a', '#2a2420']];
  PP.forEach(([px, py, ps, f, tp, pt], i) => { const pnt = i === 1 || i === 2; s += `<g opacity=".95">` + newton(px, py, { s: ps, face: f, top: tp, pants: pt, hair: ['#2a1c14', '#5a4030', '#8a8070', '#3a2a1c'][i], lookUp: 1.1, aF: pnt ? [2.6, 2.9] : [.2, .6], skin: '#c8a888' }) + `</g>`; });
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#9ab8ff" opacity=".05"/>`;
  s += lbl(hx + 70, hy + 90, 'مذنّبُ هالي', ease(ramp(t, WS(5, 3) - .3, WS(5, 4))), '#cfe6ff', 28);
  noEarth(); F.ov = ''; return s;
}

// ---------- 6: nobody finds Neptune with pen and paper before seeing it in a telescope (1846) ----------
function sceneNeptune(t) {
  const t0 = S0(6) - .2, T = t - t0, pd = ease(ramp(t, WS(6, 5) - .3, WS(6, 6) + .3)), na = ease(ramp(t, WS(6, 7) - .3, WS(6, 9)));
  let o = `<defs>${APDEFS()}</defs>`;
  // the sheet of calculations: the Sun, the orbit of Uranus pulled off course, the dashed orbit beyond and the predicted spot
  const px = 290, py = 640, sc = lerp(1, .8, na), sy = lerp(0, -40, na);
  o += `<g transform="translate(${px},${py + sy}) scale(${sc.toFixed(3)}) rotate(-3)"><rect x="-250" y="-200" width="500" height="380" rx="6" fill="url(#paperG)"/><rect x="-250" y="-200" width="500" height="380" rx="6" fill="#000" filter="url(#paperF)" opacity=".75"/><rect x="-250" y="-200" width="500" height="380" rx="6" fill="none" stroke="#8a7a5a" stroke-width="2"/>`;
  const ink = '#2a1a0e'; o += `<g stroke="${ink}" fill="none"><circle cx="-90" cy="0" r="10" fill="${ink}"/><circle cx="-90" cy="0" r="95" stroke-width="2"/><circle cx="-90" cy="0" r="160" stroke-width="2" stroke-dasharray="7 6"/>`;
  o += `<circle cx="${(-90 + 95 * Math.cos(-.5)).toFixed(1)}" cy="${(95 * Math.sin(-.5)).toFixed(1)}" r="7" stroke-width="2" fill="#7a9ab0"/>` + arrowH(-90 + 95 * Math.cos(-.5) + 8, 95 * Math.sin(-.5) - 4, -90 + 118 * Math.cos(-.62), 118 * Math.sin(-.62), ink, 2, 8) + `</g>`;
  for (let i = 0; i < 6; i++) o += `<path d="M${90},${-150 + i * 22} H${220 - (i % 3) * 20}" stroke="${ink}" stroke-width="2" opacity=".4" stroke-dasharray="${10 + (i * 7) % 9} 4"/>`;
  o += `<text x="150" y="40" text-anchor="middle" direction="ltr" font-family="Georgia, serif" font-style="italic" font-size="22" fill="${ink}" opacity=".75">a³ ∝ T²</text><text x="150" y="80" text-anchor="middle" direction="ltr" font-family="Georgia, serif" font-style="italic" font-size="22" fill="${ink}" opacity=".75">F ∝ 1/r²</text>`;
  const X = [-90 + 160 * Math.cos(-.85), 160 * Math.sin(-.85)], xk = pd;
  if (xk > 0) { const L = 16; o += `<path d="M${X[0] - L},${X[1] - L} L${(X[0] - L + 2 * L * Math.min(1, xk * 2)).toFixed(1)},${(X[1] - L + 2 * L * Math.min(1, xk * 2)).toFixed(1)}" stroke="#a0180c" stroke-width="5" stroke-linecap="round"/>` + (xk > .5 ? `<path d="M${X[0] + L},${X[1] - L} L${(X[0] + L - 2 * L * (xk * 2 - 1)).toFixed(1)},${(X[1] - L + 2 * L * (xk * 2 - 1)).toFixed(1)}" stroke="#a0180c" stroke-width="5" stroke-linecap="round"/>` : ''); }
  // the quill writing the cross
  const qx = X[0] + (xk < 1 ? 14 * Math.sin(t * 9) : 40), qy = X[1] + (xk < 1 ? 10 * Math.cos(t * 9) : -20), qa = 1 - na;
  o += `<g opacity="${qa.toFixed(2)}"><path d="M${qx},${qy} L${qx + 120},${qy - 200}" stroke="#e8e0d0" stroke-width="3"/><path d="M${qx + 120},${qy - 200} C${qx + 170},${qy - 170} ${qx + 160},${qy - 90} ${qx + 100},${qy - 40} C${qx + 110},${qy - 100} ${qx + 112},${qy - 150} ${qx + 120},${qy - 200}Z" fill="#f0ece4"/></g></g>`;
  // Neptune itself (3D), exactly where the cross says
  const cam = { pos: [0, 0, 12], look: [0, 0, 0], fov: 30 }, wz = Math.tan(15 * Math.PI / 180) * 12 / 640, nx = 300, ny = lerp(1160, 1010, na), nr = 168;
  F.w = { set: 'space', cam, L: [-.7, .4, .6], disc: null, moon: { pos: [(nx - 360) * wz, -(ny - 640) * wz, 0], r: nr * wz * Math.max(.002, ease(na)), L: [-.75, .35, .55], shC: NOFAR, shR: .001, rot: T * .25, nep: 1 } };
  F.earth = null; F.moon = null; F.sun = null;
  o += lbl(nx, ny + nr + 44, 'نبتون', ease(ramp(t, WS(6, 9) - .2, WS(6, 9) + .4)), '#9fc4ff', 28);
  if (na > 0 && na < 1) o += ring(nx, ny, na, 40, 260, '#9fc4ff');
  F.ov = o; return space(t);
}
