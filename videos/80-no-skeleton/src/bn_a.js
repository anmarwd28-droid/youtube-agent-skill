// bn_a.js (#80): what if your skeleton vanished for five seconds? Built on the #79 chain (streetO, hero, studio, brainSide, lungs, glE).
const f1 = v => (+v).toFixed(1);
const arB = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const arC = n => arB(String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));
const BL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const BND = `<filter id="bnGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="2.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="bnBone" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbf6ea"/><stop offset=".6" stop-color="#e8dabe"/><stop offset="1" stop-color="#bba684"/></radialGradient>
<radialGradient id="bnMar" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#d84a4a"/><stop offset=".7" stop-color="#a82830"/><stop offset="1" stop-color="#6a1018"/></radialGradient>
<linearGradient id="bnVes" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a1a22"/><stop offset=".5" stop-color="#4a0a10"/><stop offset="1" stop-color="#7a1a22"/></linearGradient>
<radialGradient id="bnXr" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#14304e"/><stop offset="1" stop-color="#040a16"/></radialGradient>
<radialGradient id="bnSkin" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#f0c4a0"/><stop offset="1" stop-color="#c08a68"/></radialGradient>
<radialGradient id="bnCoch" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#f4c8b8"/><stop offset="1" stop-color="#c07a6a"/></radialGradient>
<radialGradient id="lungG" cx=".4" cy=".35"><stop offset="0" stop-color="#f2a6a0"/><stop offset=".7" stop-color="#d4706a"/><stop offset="1" stop-color="#9a4440"/></radialGradient>`;
const BNDEFS = () => `${LDEFS()}${IQDEF}${BND}`;
// this video's street: new buildings and shops
const BNBLK = [[-14, 150, 450, '#a87a5a', 811, 1], [136, 160, 380, '#6a7a94', 812, 2], [296, 150, 480, '#c8b48e', 813, 0], [446, 150, 410, '#7a5e6a', 814, 1], [596, 160, 460, '#5e8a7a', 815, 2]];
const BNSHOP = [[-4, 140, 'صيدلية', '#2a7a6a'], [146, 140, 'ساعات', '#5a4a2a'], [306, 130, 'عطور', '#7a3a5a'], [456, 130, 'حلويات', '#a8602a'], [606, 140, 'ملابس', '#2a4a7a']];
const bnStreet = (t, o = {}) => streetO(t, Object.assign({ blocks: BNBLK, shops: BNSHOP }, o));
const XR = { top: '#4a86c0', pants: '#3a6ea8', skin: '#5a96cc', hair: '#4a80b8' };
// ---------- the joints of hero() (same maths), so a skeleton can sit inside the same person ----------
function heroJ(x, y, o = {}) {
  const s = o.s || 1, f = o.face || 1, lean = (o.lean || 0) * Math.PI / 180, rotD = o.rot || 0, pv = o.pv || 0;
  let lF = o.lF || [.1, .06], lB = o.lB || [-.1, -.14], aF = o.aF || [.05, .3], aB = o.aB || [-.05, .25], hipY = o.hipY;
  if (o.walk != null) { const p = o.walk, A = o.amp || .6, leg = ph => { const a = Math.sin(ph) * A, bend = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - bend]; }, sw = -Math.sin(p) * A * .85;
    lB = leg(p + Math.PI); lF = leg(p); aB = [-sw - .05, -sw + .25]; aF = [sw + .05, sw + .3]; hipY = -150 - Math.abs(Math.cos(p)) * 4; }
  const dyL = l => 76 * Math.cos(l[0]) + 74 * Math.cos(l[1]); if (hipY == null) hipY = -Math.max(dyL(lF), dyL(lB));
  const ty = hipY - 112, shX = 2, shY = ty + 14, hx = 6, hy = ty - 34;
  const toLocal = (wx, wy) => { const px = wx - x, py = wy - y - pv, a = -rotD * Math.PI / 180, qx = px * Math.cos(a) - py * Math.sin(a), qy = px * Math.sin(a) + py * Math.cos(a) + pv, lx = qx / (f * s), ly = qy / s - hipY;
    return [lx * Math.cos(-lean) - ly * Math.sin(-lean), lx * Math.sin(-lean) + ly * Math.cos(-lean) + hipY]; };
  if (o.hF) { const p = toLocal(o.hF[0], o.hF[1]); aF = ik(shX, shY, p[0], p[1], 60, 56, o.bendF ?? -1); }
  if (o.hB) { const p = toLocal(o.hB[0], o.hB[1]); aB = ik(shX - 4, shY, p[0], p[1], 60, 56, o.bendB ?? -1); }
  const fw = (lx, ly, ln = 1) => { if (ln) { const dx = lx, dy = ly - hipY; lx = dx * Math.cos(lean) - dy * Math.sin(lean); ly = dx * Math.sin(lean) + dy * Math.cos(lean) + hipY; }
    const px = lx * f * s, py = ly * s - pv, a = rotD * Math.PI / 180; return [x + px * Math.cos(a) - py * Math.sin(a), y + pv + px * Math.sin(a) + py * Math.cos(a)]; };
  return { s, f, lean, rotD, pv, lF, lB, aF, aB, hipY, ty, shX, shY, hx, hy, tilt: -16 * (o.lookUp || 0), fw };
}
// one bone: a shaft with knobbed ends; gap > 0 splits off the ends (a baby's bones are still in pieces)
function bnBone(x1, y1, x2, y2, w, c, g = 0) {
  const k = (x, y, r) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${c}"/>`;
  if (g <= 0) return `<path d="M${f1(x1)},${f1(y1)} L${f1(x2)},${f1(y2)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` + k(x1, y1, w * .82) + k(x2, y2, w * .82);
  const L = Math.hypot(x2 - x1, y2 - y1) || 1, ux = (x2 - x1) / L, uy = (y2 - y1) / L, d = w * .82 + 5 * g;
  return `<path d="M${f1(x1 + ux * d)},${f1(y1 + uy * d)} L${f1(x2 - ux * d)},${f1(y2 - uy * d)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` + k(x1, y1, w * .82) + k(x2, y2, w * .82);
}
// the skeleton of a hero() pose, in the same frame. o2: {col, gap, head (skull scale), glow, a}
function skel(x, y, o, o2 = {}) {
  const J = heroJ(x, y, o), c = o2.col || '#f2f8ff', g = o2.gap || 0, hs = o2.head || 1, B = (a, b, cc, d, w) => bnBone(a, b, cc, d, w, c, g);
  const { hipY, ty, shX, shY, hx, hy } = J;
  const leg = l => { const kx = Math.sin(l[0]) * 76, ky = hipY + Math.cos(l[0]) * 76, ax = kx + Math.sin(l[1]) * 74, ay = ky + Math.cos(l[1]) * 74;
    return B(0, hipY, kx, ky, 11) + B(kx, ky, ax, ay, 8.5) + `<path d="M${f1(kx + 3)},${f1(ky + 8)} L${f1(ax + 3)},${f1(ay - 6)}" stroke="${c}" stroke-width="3.2" stroke-linecap="round" opacity=".9"/>` +
      `<path d="M${f1(ax - 7)},${f1(ay + 1)} L${f1(ax + 24)},${f1(ay + 4)} M${f1(ax + 6)},${f1(ay + 2)} L${f1(ax + 26)},${f1(ay - 1)}" stroke="${c}" stroke-width="4.2" stroke-linecap="round"/>` + `<ellipse cx="${f1(kx + 7)}" cy="${f1(ky - 2)}" rx="5" ry="6.5" fill="${c}"/>`; };
  const arm = (sx, l) => { const ex = sx + Math.sin(l[0]) * 60, ey = shY + Math.cos(l[0]) * 60, wx = ex + Math.sin(l[1]) * 54, wy = ey + Math.cos(l[1]) * 54;
    return B(sx, shY, ex, ey, 7.5) + B(ex, ey, wx, wy, 4.4) + `<path d="M${f1(ex + 2.5)},${f1(ey + 4)} L${f1(wx + 2.5)},${f1(wy - 1)}" stroke="${c}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M${f1(wx)},${f1(wy)} l${f1(Math.sin(l[1]) * 10)},${f1(Math.cos(l[1]) * 10)} M${f1(wx + 3)},${f1(wy)} l${f1(Math.sin(l[1] + .3) * 9)},${f1(Math.cos(l[1] + .3) * 9)}" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`; };
  // spine: a gentle S of vertebrae from the pelvis to the skull
  let sp = ''; const N = 13;
  for (let i = 0; i < N; i++) { const q = i / (N - 1), yy = lerp(hipY - 22, ty + 6, q), xx = -13 + 3.5 * Math.sin(q * Math.PI * 1.4); sp += `<rect x="${f1(xx - 6 - g * 1)}" y="${f1(yy - 3.6)}" width="12" height="${f1(6.4 - g * 1.6)}" rx="2.4" fill="${c}"/>`; }
  for (let i = 0; i < 4; i++) { const q = i / 3; sp += `<rect x="${f1(lerp(-9, hx - 8, q) - 4)}" y="${f1(lerp(ty + 2, hy + 18, q) - 3)}" width="9" height="5" rx="2" fill="${c}"/>`; }
  let rb = ''; for (let j = 0; j < 7; j++) { const yy = ty + 16 + j * 9.5; rb += `<path d="M-9,${f1(yy)} Q12,${f1(yy - 8 + j)} 21,${f1(yy + 8 + j * 1.6)}" stroke="${c}" stroke-width="2.6" fill="none" stroke-linecap="round" opacity="${g > 0 ? .85 : 1}"/>`; }
  rb += `<path d="M22,${f1(ty + 12)} L24,${f1(ty + 72)}" stroke="${c}" stroke-width="5" stroke-linecap="round"/><path d="M${shX - 1},${f1(shY - 3)} L21,${f1(ty + 9)}" stroke="${c}" stroke-width="4" stroke-linecap="round"/><path d="M-16,${f1(shY - 4)} L-2,${f1(shY + 2)} L-12,${f1(shY + 34)}Z" fill="${c}" opacity=".7"/>`;
  const pel = `<path d="M-24,${f1(hipY - 34)} Q-34,${f1(hipY - 8)} -12,${f1(hipY + 8)} Q4,${f1(hipY + 13)} 19,${f1(hipY + 3)} Q27,${f1(hipY - 16)} 14,${f1(hipY - 30)} Q-4,${f1(hipY - 20)} -24,${f1(hipY - 34)}Z" fill="${c}" opacity=".55" stroke="${c}" stroke-width="4"/>` +
    `<ellipse cx="5" cy="${f1(hipY - 1)}" rx="8" ry="6.5" fill="#0a1626" opacity=".6"/><path d="M-20,${f1(hipY - 30)} Q-6,${f1(hipY - 22)} 12,${f1(hipY - 26)}" stroke="${c}" stroke-width="3" fill="none"/>` + (g > 0 ? `<path d="M-4,${f1(hipY - 26)} L2,${f1(hipY + 10)}" stroke="#0a1626" stroke-width="${f1(3 * g)}" opacity=".8"/>` : '');
  const sk = `<g transform="rotate(${f1(J.tilt)},${hx},${hy + 14}) translate(${hx},${hy + 18}) scale(${hs}) translate(${-hx},${-(hy + 18)})">` +
    `<ellipse cx="${hx - 2}" cy="${hy - 4}" rx="19.5" ry="20.5" fill="${c}"/><path d="M${hx + 3},${hy + 1} L${hx + 19},${hy + 1} L${hx + 18},${hy + 12} L${hx + 4},${hy + 14}Z" fill="${c}"/>` +
    `<path d="M${hx - 9},${hy + 7} L${hx - 5},${hy + 22} L${hx + 16},${hy + 22} L${hx + 18},${hy + 15}" stroke="${c}" stroke-width="5" fill="none" stroke-linejoin="round"/>` +
    `<ellipse cx="${hx + 10}" cy="${hy - 2}" rx="5.6" ry="5" fill="#0a1626" opacity=".85"/><path d="M${hx + 16},${hy + 3} l3,4 l-4,1Z" fill="#0a1626" opacity=".8"/><path d="M${hx + 6},${hy + 15} h11" stroke="#0a1626" stroke-width="1.4" opacity=".6"/>` +
    (g > 0 ? `<path d="M${hx - 20},${hy - 6} Q${hx - 2},${hy - 16} ${hx + 14},${hy - 12} M${hx - 4},${hy - 25} Q${hx - 6},${hy - 10} ${hx - 2},${hy + 2}" stroke="#0a1626" stroke-width="${f1(2.6 * g)}" fill="none" opacity=".85"/><ellipse cx="${hx - 4}" cy="${hy - 22}" rx="${f1(6 * g)}" ry="${f1(4 * g)}" fill="#0a1626" opacity=".45"/>` : '') + `</g>`;
  const up = `<g transform="rotate(${f1(J.lean * 57.29578)},0,${f1(hipY)})">`;
  const body = `<g opacity=".55">${up}${arm(shX - 4, J.aB)}</g>${leg(J.lB)}</g>` + up + sp + rb + pel + sk + `</g>` + leg(J.lF) + up + arm(shX, J.aF) + `</g>`;
  return `<g opacity="${f1(o2.a ?? 1)}"${o2.glow === 0 ? '' : ' filter="url(#bnGlow)"'}><g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(J.rotD)},0,${J.pv}) scale(${(J.f * J.s).toFixed(4)},${J.s})">${body}</g></g>`;
}
// the soft-tissue "X-ray" of a person: the same pose in see-through blue
const xrBody = (x, y, o, a = .5) => `<g opacity="${f1(a)}">${hero(x, y, Object.assign({}, o, XR, { shade: 0, noShadow: 1 }))}</g>`;
// a person with no bones: k 0 standing -> .5 knees buckle -> 1 a soft heap on the ground; T = time since landing for the wobble
function limpO(k, f, T = 0) {
  const u = ease(clamp(k / .5)), v = ease(clamp((k - .42) / .58));
  const jig = k >= 1 ? Math.sin(T * 15) * .06 * Math.exp(-T * 2.4) : 0;
  return { o: { lF: [lerp(.08, .95, u), lerp(.04, -.85, u)], lB: [lerp(-.08, .55, u), lerp(-.12, -1.25, u)], aF: [lerp(.05, .55, u), lerp(.3, .35, u)], aB: [lerp(-.05, .35, u), lerp(.25, .15, u)],
    lean: lerp(0, 34, u), rot: f * lerp(0, 80, v), pv: 0, lookUp: -.7 * u }, sq: 1 - .32 * v + jig, sx: 1 + .1 * v };
}
function limp(x, y, s, f, k, pal, T = 0, o = {}) {
  const L = limpO(k, f, T);
  return `<g transform="translate(${f1(x)},${f1(y)}) scale(${L.sx.toFixed(3)},${L.sq.toFixed(3)}) translate(${f1(-x)},${f1(-y)})">` + hero(x, y, Object.assign({ s, face: f, shade: 1 }, L.o, pal, o)) + `</g>`;
}
// ---------- 0: hook: a street; an X-ray band sweeps across and shows everyone's skeleton ----------
const BNP = [[40, 1062, 1, 1, .66, 0], [210, 1090, -1, 2, .7, 1.7], [380, 1048, 1, 3, .62, 3.1], [545, 1082, -1, 5, .7, .6], [690, 1054, -1, 7, .64, 2.4]];
const bnWalk = (t, x0, y, f, sc, ph0) => ({ x: x0 + f * 34 * t, o: { s: sc, face: f, walk: t * 4.2 + ph0, shade: 1 } });
function sceneHook(t) {
  let top = ''; BNP.forEach(([x0, y, f, pi, sc, ph0]) => { const P = bnWalk(t, x0, y, f, sc, ph0); top += hero(P.x, y, Object.assign({}, P.o, gp(pi))); });
  let s = `<defs>${BNDEFS()}</defs>` + bnStreet(t, { id: 'b0', top });
  // the X-ray band
  const bx = lerp(-160, 880, ramp(t, .15, 3.4)), W = 250, vanish = 1 - ease(ramp(t, WS(0, 7), WS(0, 7) + .35)), fl = vanish * (t > WS(0, 7) ? (Math.sin(t * 60) > 0 ? 1 : .35) : 1);
  let xr = `<rect x="${f1(bx - W / 2)}" y="-20" width="${W}" height="1320" fill="url(#bnXr)"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M-20,${i * 44} H740" stroke="#3a7ab8" stroke-width="1" opacity=".18"/>`).join('');
  BNP.forEach(([x0, y, f, pi, sc, ph0]) => { const P = bnWalk(t, x0, y, f, sc, ph0); xr += xrBody(P.x, y, P.o, .42) + skel(P.x, y, P.o, { a: fl }); });
  s += `<clipPath id="bnBand"><rect x="${f1(bx - W / 2)}" y="-20" width="${W}" height="1320"/></clipPath><g clip-path="url(#bnBand)">${xr}</g>` +
    [-1, 1].map(d => `<rect x="${f1(bx + d * W / 2 - 3)}" y="-20" width="6" height="1320" fill="#9ae0ff" opacity=".9" filter="url(#blur2)"/><rect x="${f1(bx + d * W / 2 - 1)}" y="-20" width="2" height="1320" fill="#fff"/>`).join('');
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: 206 bones hold you up ----------
function sceneCount(t) {
  const st = S0(1) - .2, rv = ease(ramp(t, st, WS(1, 2))), cn = ease(ramp(t, WS(1, 2), WS(1, 4) + .3)), X = 300, Y = 1150, S = 2.1, o = { s: S, face: 1, aF: [.12, .22], aB: [-.1, .18] };
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB1', '#1a2c44', '#040a14', 5);
  const top = lerp(Y + 40, 380, rv);
  s += `<clipPath id="bnRv"><rect x="-20" y="${f1(top)}" width="760" height="1400"/></clipPath><g clip-path="url(#bnRv)"><ellipse cx="${X}" cy="${Y}" rx="120" ry="16" fill="#000" opacity=".5" filter="url(#blur5)"/>${xrBody(X, Y, o, .5)}${skel(X, Y, o)}</g>`;
  if (rv > 0 && rv < 1) s += `<rect x="-20" y="${f1(top - 3)}" width="760" height="6" fill="#9ae0ff" filter="url(#blur2)"/><rect x="-20" y="${f1(top - 1)}" width="760" height="2" fill="#fff"/>`;
  // the count
  s += `<g opacity="${clamp(cn * 4).toFixed(2)}"><text x="560" y="620" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="150" fill="#f4c76b" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,.7))">${arB(Math.round(206 * cn))}</text>${BL(560, 690, 'عظمة', 1, '#fff', 40)}</g>`;
  // labels with leader lines
  const J = heroJ(X, Y, o), P = (lx, ly) => J.fw(lx, ly), L = [['الجمجمة', P(J.hx - 2, J.hy - 6), 560, 860, WS(1, 5)], ['الأضلاع', P(16, J.ty + 40), 560, 940, WS(1, 6)], ['العمودُ الفقري', P(-12, J.ty + 70), 560, 1020, WS(1, 7)], ['الحوض', P(0, J.hipY - 12), 560, 1100, WS(1, 8)], ['عظمُ الفخذ', P(Math.sin(.1) * 40, J.hipY + 40), 560, 1180, WS(1, 9)]];
  L.forEach(([tx, p, lx, ly, t0]) => { const a = ease(ramp(t, t0 - .2, t0 + .2)); if (a > 0) s += `<g opacity="${a.toFixed(2)}"><path d="M${f1(p[0])},${f1(p[1])} L${lx - 110},${ly - 10}" stroke="#f4c76b" stroke-width="2.4"/><circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="6" fill="#f4c76b"/>${BL(lx, ly, tx, 1, '#fff', 30)}</g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the first second: the bones dissolve and you fold to the ground ----------
function bnWall(off = 0) {
  let g = `<rect x="-20" y="-20" width="760" height="1320" fill="#a8c8e4"/><rect x="-20" y="740" width="760" height="580" fill="#bcb2a2"/><rect x="-20" y="740" width="760" height="580" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let q = 0; q < 12; q++) for (let r = -1; r < 10; r++) { const x = pmod(r * 96 - off + (q % 2) * 48, 960) - 120; g += `<rect x="${f1(x)}" y="${740 + q * 50}" width="94" height="48" fill="none" stroke="#a09684" stroke-width="2"/>`; }
  [['#8a6a5a', -20], ['#5e7a8a', 220], ['#b8a07a', 460]].forEach(([c, x]) => { g += `<rect x="${x}" y="100" width="242" height="642" fill="${c}"/><rect x="${x}" y="100" width="242" height="642" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${x + 30}" y="430" width="182" height="250" fill="#2a3440"/><rect x="${x + 36}" y="436" width="170" height="238" fill="#8ab0c8" opacity=".5"/><path d="M${x + 36},436 l70,0 l-40,238 l-30,0Z" fill="#fff" opacity=".12"/><rect x="${x + 30}" y="170" width="70" height="100" fill="#2a3440"/><rect x="${x + 142}" y="170" width="70" height="100" fill="#2a3440"/><rect x="${x + 10}" y="380" width="222" height="34" fill="${mix(c, '#000000', .35)}"/>`; });
  return g + `<rect x="-20" y="730" width="760" height="16" fill="#000" opacity=".25"/>`;
}
function sceneFirst(t) {
  const st = S0(2) - .2, T = t - st, sk = ease(ramp(t, st, st + .5)) * (1 - ease(ramp(t, WS(2, 2), WS(2, 3)))), ds = ramp(t, WS(2, 2) - .1, WS(2, 3) + .4);
  const k = ease(ramp(t, WS(2, 3), WS(2, 3) + 1.1)), land = Math.max(0, t - (WS(2, 3) + 1.1)), X = 250, Y = 1130, S = 1.55, pal = { top: '#2a8a6a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };
  const o = k > 0 ? Object.assign({ s: S, face: 1 }, limpO(k, 1, land).o) : { s: S, face: 1, aF: [.08, .2], aB: [-.06, .16] };
  let s = `<defs>${BNDEFS()}</defs>` + bnWall();
  s += k > 0 ? limp(X, Y, S, 1, k >= 1 ? 1 : k, pal, land) : hero(X, Y, Object.assign({}, o, pal, { shade: 1 }));
  if (sk > 0) s += xrBody(X, Y, o, .35 * sk) + skel(X, Y, o, { a: sk });
  if (ds > 0 && ds < 1) s += sparkles(X + 10, Y - 250, 200, 480, 40, t, 1 - ds, 81);
  // an impact ripple when the heap lands
  const ip = ramp(t, WS(2, 3) + .9, WS(2, 3) + 1.8); if (ip > 0 && ip < 1) s += `<ellipse cx="${X + 230}" cy="${Y}" rx="${f1(120 + 200 * ip)}" ry="${f1(14 + 20 * ip)}" fill="none" stroke="#fff" stroke-width="4" opacity="${f1(.6 * (1 - ip))}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: muscles still work but have no bone to pull ----------
function armDiag(X, Y, bone, c, T, a) {
  // shoulder at (X, Y); upper arm hangs down; with bone the biceps lifts the forearm, without it the arm just sags and bunches
  const up = 150, fo = 140; let s = '';
  if (bone) { const ang = lerp(1.45, .25, c), ex = X, ey = Y + up, wx = ex + Math.sin(ang) * fo, wy = ey + Math.cos(ang) * fo, mx = ex + Math.sin(ang) * 38, my = ey + Math.cos(ang) * 38;
    s += `<path d="M${X},${Y} L${ex},${ey} L${f1(wx)},${f1(wy)}" stroke="url(#bnSkin)" stroke-width="66" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>`;
    s += bnBone(X - 6, Y + 6, ex - 6, ey - 4, 13, 'url(#bnBone)') + bnBone(ex - 4, ey + 2, wx, wy, 9, 'url(#bnBone)') + `<path d="M${ex + 5},${ey + 6} L${f1(wx + 4)},${f1(wy - 3)}" stroke="#e8dabe" stroke-width="6" stroke-linecap="round"/>`;
    const bul = 18 + 14 * c; s += `<path d="M${X + 14},${Y + 18} Q${f1(X + 14 + bul + 10)},${f1(Y + up * .5)} ${f1(mx + 10)},${f1(my - 4)} Q${X + 10},${Y + up * .55} ${X + 8},${Y + 20}Z" fill="#c8383e"/><path d="M${X + 18},${Y + 30} Q${f1(X + 16 + bul)},${f1(Y + up * .5)} ${f1(mx + 6)},${f1(my - 6)}" stroke="#ff8a8a" stroke-width="2" fill="none" opacity=".6"/><path d="M${f1(mx + 10)},${f1(my - 4)} L${f1(mx + 2)},${f1(my + 2)}" stroke="#f4f0e0" stroke-width="5" stroke-linecap="round"/>`;
    s += `<path d="M${f1(wx - 6)},${f1(wy)} l18,-6 l16,4" stroke="url(#bnSkin)" stroke-width="20" fill="none" stroke-linecap="round" opacity=".7"/>`;
  } else { // a soft tube that hangs and wobbles; the muscle bunches into a knot but nothing lifts
    const wob = Math.sin(T * 3) * 10, ex = X + 6 + wob * .4, ey = Y + up - 10 * c, wx = X + 30 + wob, wy = Y + up + fo - 30 - 18 * c;
    s += `<path d="M${X},${Y} Q${f1(X - 10)},${f1(Y + up * .6)} ${f1(ex)},${f1(ey)} Q${f1(ex + 10)},${f1(ey + 70)} ${f1(wx)},${f1(wy)}" stroke="url(#bnSkin)" stroke-width="${f1(66 + 6 * c)}" fill="none" stroke-linecap="round" opacity=".55"/>`;
    const bul = 18 + 22 * c; s += `<ellipse cx="${f1(X + 14)}" cy="${f1(Y + up * .45 + 10 * c)}" rx="${f1(bul * .7)}" ry="${f1(up * .42 - 26 * c)}" fill="#c8383e"/><path d="M${X + 6},${f1(Y + up * .3)} q${f1(8 + 6 * c)},10 0,${f1(30 - 8 * c)} M${X + 20},${f1(Y + up * .32)} q${f1(8 + 6 * c)},10 0,${f1(30 - 8 * c)}" stroke="#ff8a8a" stroke-width="2" fill="none" opacity=".55"/>`;
    s += `<path d="M${f1(wx - 6)},${f1(wy)} l18,6 l10,12" stroke="url(#bnSkin)" stroke-width="20" fill="none" stroke-linecap="round" opacity=".7"/>`;
  }
  return `<g opacity="${a.toFixed(2)}">${s}</g>`;
}
function sceneMuscle(t) {
  const st = S0(3) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), a2 = ease(ramp(t, WS(3, 4) - .2, WS(3, 4) + .3)), c = (1 - Math.cos(T * 3.2)) * .5 * ease(ramp(t, WS(3, 1), WS(3, 2)));
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB3', '#3a2a2a', '#0c0606', 9);
  s += `<g opacity="${a.toFixed(2)}">${panel(40, 420, 310, 640)}${BL(195, 480, 'مع العظم', 1, '#7ae08a', 32)}</g><g transform="translate(150,540) scale(1.15) translate(-150,-540)">` + armDiag(150, 540, 1, c, T, a) + `</g>`;
  s += `<g opacity="${a2.toFixed(2)}">${panel(370, 420, 310, 640)}${BL(525, 480, 'بلا عظم', 1, '#ff8a7a', 32)}</g><g transform="translate(480,540) scale(1.15) translate(-480,-540)">` + armDiag(480, 540, 0, c, T, a2) + `</g>`;
  s += `<g opacity="${a.toFixed(2)}">${BL(195, 1010, 'العضلةُ تشدُّ العظم', 1, '#fff', 25)}</g><g opacity="${a2.toFixed(2)}">${BL(525, 1010, 'تنقبضُ… ولا شيءَ يتحرّك', 1, '#fff', 25)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: everywhere in the world, eight billion people fall at once ----------
const BNW = [[30, 1060, 1, 1, .62], [170, 1092, -1, 2, .68], [300, 1050, 1, 3, .6], [440, 1086, 1, 4, .66], [580, 1056, -1, 5, .62], [690, 1094, -1, 6, .68]];
function sceneWorld(t) {
  const st = S0(4) - .2, T = t - st, t0 = WS(4, 5) - .1;
  let top = ''; BNW.forEach(([x0, y, f, pi, sc], j) => { const kt = t0 + j * .09, k = ease(ramp(t, kt, kt + 1)), x = x0 + f * 30 * Math.min(T, kt - st), land = Math.max(0, t - kt - 1);
    top += k > 0 ? limp(x, y, sc, f, k, gp(pi), land) : hero(x, y, Object.assign({ s: sc, face: f, walk: t * 4.2 + j, shade: 1 }, gp(pi))); });
  let s = `<defs>${BNDEFS()}</defs>` + bnStreet(t + 10, { id: 'b4', top });
  const q = ease(ramp(t, WS(4, 1), WS(4, 3)));
  if (q > 0) [[130, 560, '#d8c4a4', '#6a8aa0', 2], [360, 500, '#a8b8c8', '#c08060', 4], [590, 560, '#e0c8a0', '#5a8a6a', 6]].forEach(([X, Y, c1, c2, pi], i) => { const a = clamp(q * 2 - i * .4), k = ease(ramp(t, t0 + .1 * i, t0 + 1 + .1 * i)), land = Math.max(0, t - t0 - 1 - .1 * i);
    s += `<g opacity="${a.toFixed(2)}"><clipPath id="bnIn${i}"><circle cx="${X}" cy="${Y}" r="92"/></clipPath><circle cx="${X}" cy="${Y}" r="100" fill="#fff"/><g clip-path="url(#bnIn${i})"><rect x="${X - 100}" y="${Y - 100}" width="200" height="200" fill="${c2}"/>` +
      `<rect x="${X - 90}" y="${Y - 70}" width="60" height="110" fill="${c1}"/><rect x="${X - 20}" y="${Y - 90}" width="54" height="130" fill="${mix(c1, '#000000', .2)}"/><rect x="${X + 40}" y="${Y - 60}" width="60" height="100" fill="${mix(c1, '#ffffff', .2)}"/><rect x="${X - 100}" y="${Y + 40}" width="200" height="70" fill="#b8ae9c"/>` +
      limp(X - 40, Y + 76, .34, 1, k, gp(pi), land) + limp(X + 40, Y + 82, .34, -1, k, gp(pi + 1), land) + `</g></g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: no skull to guard the brain, no ribs to hold the chest open ----------
function sceneHeadChest(t) {
  const st = S0(5) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), sv = ease(ramp(t, WS(5, 1) - .1, WS(5, 1) + .5)), rv = ease(ramp(t, WS(5, 7) - .1, WS(5, 7) + .5)), b = ease(ramp(t, WS(5, 8), WS(5, 10)));
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB5', '#24324a', '#060a14', 13);
  // the head: skin, skull, brain
  const HX = 360, HY = 470;
  s += `<g opacity="${a.toFixed(2)}">${panel(60, 240, 600, 450)}<path d="M${HX - 170},${HY + 30} C${HX - 200},${HY - 120} ${HX - 80},${HY - 205} ${HX + 40},${HY - 196} C${HX + 160},${HY - 186} ${HX + 205},${HY - 90} ${HX + 192},${HY + 10} L${HX + 226},${HY + 70} Q${HX + 232},${HY + 86} ${HX + 206},${HY + 90} L${HX + 204},${HY + 118} Q${HX + 214},${HY + 126} ${HX + 200},${HY + 136} Q${HX + 208},${HY + 150} ${HX + 196},${HY + 162} Q${HX + 190},${HY + 200} ${HX + 120},${HY + 205} L${HX + 60},${HY + 215} L${HX + 50},${HY + 240} L${HX - 90},${HY + 240} Q${HX - 100},${HY + 150} ${HX - 170},${HY + 30}Z" fill="url(#bnSkin)" opacity=".5"/><ellipse cx="${HX - 40}" cy="${HY + 40}" rx="26" ry="40" fill="#c08a68" opacity=".55"/>` +
    `<g opacity="${(1 - sv).toFixed(2)}" filter="url(#bnGlow)"><ellipse cx="${HX}" cy="${HY}" rx="168" ry="158" fill="none" stroke="url(#bnBone)" stroke-width="22"/><path d="M${HX + 120},${HY + 90} Q${HX + 175},${HY + 120} ${HX + 165},${HY + 175} L${HX + 60},${HY + 180}" stroke="url(#bnBone)" stroke-width="20" fill="none" stroke-linecap="round"/></g>` +
    `<g transform="translate(0,${f1(10 * sv)})">${brainSide(HX - 6, HY - 6, .92 - .03 * sv, 5, { noShadow: 1 })}</g>`;
  if (sv > 0 && sv < 1) s += sparkles(HX, HY - 40, 360, 300, 40, t, 1 - sv, 55);
  if (sv > .6) s += `<circle cx="${HX}" cy="${HY}" r="${f1(176 + 8 * Math.sin(T * 6))}" fill="none" stroke="#ff4a3a" stroke-width="5" opacity="${f1(.7 * (sv - .6) / .4)}"/>`;
  s += `</g>`;
  // the chest: ribs over breathing lungs
  const CX = 360, CY = 980, amp = lerp(.06, .015, b), br = 1 + amp * Math.sin(T * 2.6), sag = lerp(1, .8, b);
  let rib = `<path d="M${CX},770 L${CX},1110" stroke="url(#bnBone)" stroke-width="16" stroke-linecap="round"/>`;
  for (let j = 0; j < 7; j++) { const y = 800 + j * 40, w = 150 + j * 10; [-1, 1].forEach(d => { rib += `<path d="M${CX + d * 8},${y} Q${CX + d * (w + 30)},${y - 20} ${CX + d * w},${y + 56}" stroke="url(#bnBone)" stroke-width="13" fill="none" stroke-linecap="round"/>`; }); }
  s += `<g opacity="${ease(ramp(t, st + .3, st + .8)).toFixed(2)}">${panel(60, 720, 600, 470)}<path d="M${CX - 230},1180 L${CX - 210},760 Q${CX},730 ${CX + 210},760 L${CX + 230},1180Z" fill="url(#bnSkin)" opacity=".22"/>` +
    `<g transform="translate(${CX},${CY - 40}) scale(${(1.35 * br).toFixed(3)},${(1.35 * br * sag).toFixed(3)}) translate(${-CX},${-(CY - 40)})">${lungs(CX, CY, 1.05, 0)}</g>` +
    `<g opacity="${(1 - rv).toFixed(2)}" filter="url(#bnGlow)">${rib}</g>`;
  if (rv > 0 && rv < 1) s += sparkles(CX, 950, 400, 360, 40, t, 1 - rv, 56);
  s += `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the three smallest bones in the ear vanish: the world goes nearly silent ----------
function sceneEar(t) {
  const st = S0(6) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), ov = ease(ramp(t, WS(6, 3) - .1, WS(6, 4) + .1)), qv = ease(ramp(t, WS(6, 6), WS(6, 8)));
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB6', '#2a2a40', '#08080e', 17) + `<g opacity="${a.toFixed(2)}">${panel(30, 380, 660, 560)}`;
  // outer ear, canal, eardrum
  s += `<path d="M150,520 C60,500 40,600 70,680 C90,740 60,800 110,840 C150,868 175,820 160,760 C150,720 175,700 160,640 C150,600 175,560 150,520Z" fill="url(#bnSkin)"/><path d="M140,560 C100,560 90,620 110,660" stroke="#a06a50" stroke-width="6" fill="none" opacity=".6"/>` +
    `<path d="M150,650 L325,640 L325,720 L150,712Z" fill="#c88a70"/><path d="M150,650 L325,640" stroke="#8a5a48" stroke-width="4"/><path d="M150,712 L325,720" stroke="#8a5a48" stroke-width="4"/>`;
  const vib = 4 * Math.sin(T * 30) * (1 - .6 * ov);
  s += `<ellipse cx="333" cy="680" rx="${f1(7 + Math.abs(vib) * .6)}" ry="52" fill="#f0d0c0" stroke="#c09080" stroke-width="2"/>`;
  // middle ear cavity and the three bones (drawn large)
  s += `<ellipse cx="400" cy="670" rx="72" ry="96" fill="#3a1418" opacity=".55"/>`;
  const jig = Math.sin(T * 30) * 3, ob = 1 - ov;
  s += `<g opacity="${ob.toFixed(2)}" transform="translate(${f1(jig * .5)},0)"><path d="M340,700 L352,630" stroke="url(#bnBone)" stroke-width="9" stroke-linecap="round"/><ellipse cx="362" cy="618" rx="16" ry="14" fill="url(#bnBone)"/>` +
    `<path d="M374,612 Q398,606 402,630 L400,690" stroke="url(#bnBone)" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M404,690 L452,676 M404,698 L452,708" stroke="url(#bnBone)" stroke-width="6" stroke-linecap="round"/><rect x="450" y="668" width="12" height="48" rx="4" fill="url(#bnBone)"/></g>`;
  if (ov > 0 && ov < 1) s += sparkles(400, 650, 140, 160, 26, t, 1 - ov, 61);
  // cochlea and nerve
  let sp = 'M520,700'; for (let i = 1; i <= 60; i++) { const q = i / 60, r = 58 * (1 - q * .82), ang = q * Math.PI * 5; sp += ` L${f1(530 + Math.cos(ang) * r)},${f1(700 + Math.sin(ang) * r)}`; }
  const sig = (1 - ov) * (.5 + .5 * Math.sin(T * 8));
  s += `<path d="M470,640 C470,560 560,560 560,620 M490,640 C480,590 540,580 545,620" stroke="url(#bnCoch)" stroke-width="12" fill="none" opacity=".9"/><path d="${sp}" stroke="url(#bnCoch)" stroke-width="16" fill="none" stroke-linecap="round"/>` +
    `<circle cx="530" cy="700" r="70" fill="#ffd86a" opacity="${f1(.25 * sig)}" filter="url(#blur5)"/><path d="M590,690 C620,660 640,640 680,630" stroke="#f4c76b" stroke-width="8" fill="none" opacity="${f1(.4 + .6 * sig)}"/>`;
  // sound waves: arcs that travel down the canal
  for (let i = 0; i < 5; i++) { const p = pmod(T * .9 + i / 5, 1), x = 40 + p * 290; s += `<path d="M${f1(x)},${f1(640)} Q${f1(x + 22)},680 ${f1(x)},${f1(720)}" stroke="#9ae0ff" stroke-width="5" fill="none" opacity="${f1(.8 * Math.sin(p * Math.PI))}"/>`; }
  s += BL(333, 790, 'طبلةُ الأذن', 1, '#fff', 24) + `<g opacity="${(1 - ov * .5).toFixed(2)}">${BL(400, 560, 'أصغرُ ٣ عظمات', 1, '#f4c76b', 26)}</g>` + BL(540, 820, 'القوقعة', 1, '#fff', 24);
  // the loudness meter
  const lv = lerp(.9, .08, ov) * (.85 + .15 * Math.sin(T * 9));
  s += `${BL(560, 885, 'الصوتُ الذي تسمعه', 1, '#cfe0f0', 22)}<rect x="90" y="868" width="300" height="26" rx="13" fill="#1a2030"/><rect x="90" y="868" width="${f1(300 * lv)}" height="26" rx="13" fill="${lv > .3 ? '#7ae08a' : '#ff7a5a'}"/></g>`;
  if (qv > 0) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity="${f1(.25 * qv)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: bone marrow makes about two million red cells a second ----------
function sceneMarrow(t) {
  const st = S0(7) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), cut = ease(ramp(t, WS(7, 2) - .2, WS(7, 3) + .2)), cn = ease(ramp(t, WS(7, 6), WS(7, 12))), tv = WS(7, 13), gone = ease(ramp(t, tv - .1, tv + .5));
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB7', '#3a2026', '#0c0406', 21) + `<g opacity="${a.toFixed(2)}">${panel(30, 380, 660, 700)}`;
  // the vessel above
  s += `<rect x="40" y="478" width="640" height="64" rx="30" fill="url(#bnVes)"/><rect x="40" y="478" width="640" height="10" rx="5" fill="#c04a54" opacity=".6"/><path d="M360,600 L360,540" stroke="#7a1a22" stroke-width="28"/>`;
  // the long bone, cut open in the middle
  const bo = 1 - gone * .85;
  s += `<g opacity="${bo.toFixed(2)}"><ellipse cx="120" cy="640" rx="70" ry="68" fill="url(#bnBone)"/><ellipse cx="600" cy="640" rx="70" ry="68" fill="url(#bnBone)"/><rect x="110" y="590" width="500" height="100" fill="url(#bnBone)"/>` +
    `<g opacity="${cut.toFixed(2)}"><rect x="190" y="606" width="340" height="68" rx="20" fill="url(#bnMar)"/>` + Array.from({ length: 26 }, (_, i) => { const r = RS(i + 300); return `<circle cx="${f1(200 + r() * 320)}" cy="${f1(612 + r() * 56)}" r="${f1(2 + r() * 3)}" fill="#f0a0a0" opacity=".5"/>`; }).join('') +
    [[120, 640], [600, 640]].map(([x, y], j) => Array.from({ length: 16 }, (_, i) => { const r = RS(i + 400 + j * 40); return `<ellipse cx="${f1(x + (r() - .5) * 90)}" cy="${f1(y + (r() - .5) * 80)}" rx="${f1(4 + r() * 6)}" ry="${f1(3 + r() * 4)}" fill="#c89a7a" opacity=".7"/>`; }).join('')).join('') + `</g></g>`;
  if (gone > 0 && gone < 1) s += sparkles(360, 640, 560, 160, 40, t, 1 - gone, 71);
  // red cells: born in the marrow, up the small vessel and along the big one; no new ones after the bone is gone
  const rate = .55, N = 22;
  for (let i = 0; i < N; i++) { const p = pmod(T * rate + i / N, 1), born = t - p / rate; if (born > tv || born < st - 99) continue; const r = RS(i + 500);
    let x, y; if (p < .18) { x = 360 + (r() - .5) * 10; y = 640 - p / .18 * 130; } else { x = 360 + (p - .18) / .82 * 340; y = 510 + (r() - .5) * 30; }
    if (p < .18 && cut < .5) continue;
    s += `<g transform="translate(${f1(x)},${f1(y)}) rotate(${f1(r() * 180 + T * 40)})"><ellipse rx="13" ry="9" fill="#d8343e"/><ellipse rx="6" ry="4" fill="#a81e28"/></g>`; }
  s += BL(360, 740, 'نخاعُ العظم', cut, '#ffb0a0', 28);
  s += `<g opacity="${clamp(cn * 4).toFixed(2)}"><text x="360" y="900" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="92" direction="ltr" fill="#f4c76b" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,.7))">${arC(2000000 * cn)}</text>${BL(360, 970, 'خليّةُ دمٍ حمراء… كلَّ ثانية', 1, '#fff', 30)}</g></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: the bones come back; people get up, stunned ----------
function sceneBack(t) {
  const st = S0(8) - .2, fl = ramp(t, WS(8, 1), WS(8, 3) + .4), up0 = WS(8, 6) - .2;
  let top = '', xr = ''; BNW.forEach(([x0, y, f, pi, sc], j) => { const x = x0 + f * 60, kt = up0 + j * .12, k = 1 - ease(ramp(t, kt, kt + 1.1)), L = limpO(k, f, 9);
    top += limp(x, y, sc, f, k, gp(pi), 9);
    if (fl > 0 && fl < 1) { const w = Math.sin(fl * Math.PI); xr += `<ellipse cx="${f1(x + f * 120 * sc)}" cy="${y - 16}" rx="${f1(190 * sc)}" ry="${f1(46 * sc)}" fill="#dff4ff" opacity="${f1(.75 * w)}" filter="url(#blur9)"/>` + sparkles(x + f * 120 * sc, y - 30, 260 * sc, 80, 10, t, w, 90 + j); } });
  let s = `<defs>${BNDEFS()}</defs>` + bnStreet(t + 30, { id: 'b8', top: top + xr });
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the surprise: born with about 300 bones, many fuse until 206 remain ----------
function sceneBaby(t) {
  const st = S0(9) - .2, a = ease(ramp(t, st, st + .6)), g = ease(ramp(t, WS(9, 5), WS(9, 12) + .2)), X = 360, Y = 1120, S = lerp(1.15, 1.55, g), o = { s: S, face: 1, aF: [.14, .3], aB: [-.1, .22] };
  let s = `<defs>${BNDEFS()}</defs>` + studio('stB9', '#1c2a3c', '#04080e', 23);
  s += `<g opacity="${a.toFixed(2)}"><rect x="110" y="300" width="500" height="900" rx="18" fill="#0c1a2a"/><rect x="110" y="300" width="500" height="900" rx="18" fill="#9ad0ff" opacity=".07"/><rect x="110" y="300" width="500" height="900" rx="18" fill="none" stroke="#3a5a7a" stroke-width="6"/>` +
    `<ellipse cx="${X}" cy="${Y - 200}" rx="200" ry="340" fill="#4a8ac0" opacity=".08" filter="url(#blur9)"/>${xrBody(X, Y, o, .45)}${skel(X, Y, o, { gap: 1 - g, head: lerp(1.6, 1, g) })}` +
    `<text x="${X}" y="${430}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="110" fill="#f4c76b" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,.7))">${g < .02 ? '≈ ' : ''}${arB(Math.round(lerp(300, 206, g)))}</text>` +
    BL(X, 1170, g < .5 ? 'عند الولادة' : 'عند البلوغ', 1, '#fff', 30) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 12) - .3, WS(10, 12) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneFirst }, { s: S0(3) - .2, f: sceneMuscle }, { s: S0(4) - .2, f: sceneWorld }, { s: S0(5) - .2, f: sceneHeadChest },
  { s: S0(6) - .2, f: sceneEar }, { s: S0(7) - .2, f: sceneMarrow }, { s: S0(8) - .2, f: sceneBack }, { s: S0(9) - .2, f: sceneBaby }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneCount, sceneFirst, sceneMuscle, sceneHeadChest, sceneEar, sceneMarrow, sceneBaby]);
const XF = .5;
const TLI = [['السقوط', S0(2)], ['العضلات', S0(3)], ['الدماغ', S0(5)], ['السمع', S0(6)], ['الدم', S0(7)], ['العودة', S0(8)]];
const LIST_ON = new Set([sceneBack]);
const CHIPS = [
  ['c0', '٥ ثوانٍ بلا عظام', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c2', 'الثانيةُ الأولى', 360, 330, 'big', WS(2, 0), S0(3) - .3],
  ['c4', '٨ ملياراتِ إنسان', 360, 330, 'red big', WS(4, 6), S0(5) - .3],
  ['c6', 'صمتٌ تقريباً', 360, 330, 'big', WS(6, 6), S0(7) - .3],
  ['c8', 'عادتِ العظام', 360, 330, 'big', WS(8, 1), S0(9) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 12) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">٥ ثوانٍ بلا عظام</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
