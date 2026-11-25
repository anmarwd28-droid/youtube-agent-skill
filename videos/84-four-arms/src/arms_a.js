// arms_a.js (#84): what if you had four arms? Built on the #83 chain without bk_a.js (streetD, hero, brainSide, studio, quad, frog, antS, glE).
const b1 = v => (+v).toFixed(1);
const AL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const ARD = `<radialGradient id="arPopG"><stop offset="0" stop-color="#fff4c8" stop-opacity=".85"/><stop offset=".4" stop-color="#f4c76b" stop-opacity=".35"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="arGlow"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset=".45" stop-color="#f4c76b" stop-opacity=".3"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<linearGradient id="arTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8e4da"/><stop offset="1" stop-color="#cfc8b8"/></linearGradient>
<linearGradient id="arWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a42"/><stop offset="1" stop-color="#6a4426"/></linearGradient>
<linearGradient id="arSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6e767e"/><stop offset=".45" stop-color="#d4dade"/><stop offset=".6" stop-color="#f2f4f6"/><stop offset="1" stop-color="#7a828a"/></linearGradient>
<linearGradient id="arCnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8d0c0"/><stop offset="1" stop-color="#a89c88"/></linearGradient>
<linearGradient id="arPan" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4e54"/><stop offset="1" stop-color="#1a1c20"/></linearGradient>
<linearGradient id="arPot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a3a2a"/><stop offset=".4" stop-color="#c8644a"/><stop offset="1" stop-color="#6a2e20"/></linearGradient>
<radialGradient id="arFlame"><stop offset="0" stop-color="#bfe4ff" stop-opacity=".95"/><stop offset=".5" stop-color="#3a8aff" stop-opacity=".6"/><stop offset="1" stop-color="#2a5aff" stop-opacity="0"/></radialGradient>
<radialGradient id="arSteam"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
<linearGradient id="arWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe4e6"/><stop offset="1" stop-color="#b8c0c4"/></linearGradient>
<linearGradient id="arFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a4a"/><stop offset="1" stop-color="#4e3624"/></linearGradient>
<linearGradient id="arWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4ab8d8"/><stop offset=".5" stop-color="#1e8ab8"/><stop offset="1" stop-color="#0e5a8a"/></linearGradient>
<linearGradient id="arSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a9a9a"/><stop offset="1" stop-color="#1e5a6a"/></linearGradient>
<linearGradient id="arDevSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8ab0"/><stop offset=".6" stop-color="#c8c8b0"/><stop offset="1" stop-color="#e8d8a8"/></linearGradient>
<linearGradient id="arMud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7452"/><stop offset="1" stop-color="#5a4630"/></linearGradient>
<linearGradient id="arFish" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6a4a"/><stop offset=".55" stop-color="#8a8a5e"/><stop offset="1" stop-color="#c8bc8a"/></linearGradient>
<radialGradient id="arHeart" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#f08070"/><stop offset=".5" stop-color="#c83a32"/><stop offset="1" stop-color="#7a1a1a"/></radialGradient>
<radialGradient id="arInset" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#2a3450"/><stop offset="1" stop-color="#0e1222"/></radialGradient>
<radialGradient id="arBread" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f0c27a"/><stop offset=".6" stop-color="#c8843a"/><stop offset="1" stop-color="#8a4e1e"/></radialGradient>
<linearGradient id="arSeat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2c32"/><stop offset=".5" stop-color="#4a4e56"/><stop offset="1" stop-color="#26282e"/></linearGradient>
<linearGradient id="arCarIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8c4dc"/><stop offset="1" stop-color="#e8e0cc"/></linearGradient>
<linearGradient id="arBone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e8"/><stop offset="1" stop-color="#d8c8a8"/></linearGradient>
<filter id="arTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="4" seed="8"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .08  0 0 0 0 .06  0 0 0 .6 -.15"/></filter>`;
const ARDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${ARD}`;
const arQ = (x, y, a, sc = 1) => a <= 0 ? '' : `<text x="${b1(x)}" y="${b1(y)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${b1(54 * sc * (.6 + .4 * Math.min(1, a * 1.4)))}" fill="#f4c76b" opacity="${b1(Math.min(1, a))}" style="paint-order:stroke" stroke="#2a1a08" stroke-width="4">؟</text>`;
const arSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
// a sub-shot switcher inside one scene: P = [[t0, f], [t1, f], ...], crossfade d seconds
function subs(t, P, d = .35) {
  let i = 0; P.forEach((p, j) => { if (t >= p[0]) i = j; });
  const k = i > 0 ? ease(ramp(t, P[i][0], P[i][0] + d)) : 1;
  return k < 1 ? P[i - 1][1](t) + `<g opacity="${b1(k * 100) / 100}">${P[i][1](t)}</g>` : P[i][1](t);
}
// ---------- the house person with FOUR arms: a second pair of shoulders lower on the torso ----------
// extra o: cF/cB [upper, fore] angles of the lower front/back arm, gF/gB world targets, k2 (0-1, the lower pair fades in), glow2 (gold outline on the lower pair)
function hero4(x, y, o = {}) {
  const c = Object.assign({}, YOU, o), s = o.s || 1, f = o.face || 1, lean = (o.lean || 0) * Math.PI / 180, rotD = o.rot || 0, pv = o.pv || 0;
  let lF = o.lF || [.1, .06], lB = o.lB || [-.1, -.14], aF = o.aF || [.05, .3], aB = o.aB || [-.05, .25], cF = o.cF || [.3, 1.05], cB = o.cB || [.18, .95], hipY = o.hipY;
  if (o.walk != null) { const p = o.walk, A = o.amp || .6, leg = ph => { const a = Math.sin(ph) * A, bend = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - bend]; }, sw = -Math.sin(p) * A * .85;
    lB = leg(p + Math.PI); lF = leg(p); aB = [-sw - .05, -sw + .25]; aF = [sw + .05, sw + .3]; if (!o.cF) cF = [-sw * .7 + .25, -sw * .7 + .95]; if (!o.cB) cB = [sw * .7 + .15, sw * .7 + .85]; hipY = -150 - Math.abs(Math.cos(p)) * 4; }
  const dyL = l => 76 * Math.cos(l[0]) + 74 * Math.cos(l[1]); if (hipY == null) hipY = -Math.max(dyL(lF), dyL(lB));
  const ty = hipY - 112, shX = 2, shY = ty + 14, s2X = 3, s2Y = ty + 58, hx = 6, hy = ty - 34;
  const toLocal = (wx, wy) => { const px = wx - x, py = wy - y - pv, a = -rotD * Math.PI / 180, qx = px * Math.cos(a) - py * Math.sin(a), qy = px * Math.sin(a) + py * Math.cos(a) + pv, lx = qx / (f * s), ly = qy / s - hipY;
    return [lx * Math.cos(-lean) - ly * Math.sin(-lean), lx * Math.sin(-lean) + ly * Math.cos(-lean) + hipY]; };
  if (o.hF) { const p = toLocal(o.hF[0], o.hF[1]); aF = ik(shX, shY, p[0], p[1], 60, 56, o.bendF ?? -1); }
  if (o.hB) { const p = toLocal(o.hB[0], o.hB[1]); aB = ik(shX - 4, shY, p[0], p[1], 60, 56, o.bendB ?? -1); }
  if (o.gF) { const p = toLocal(o.gF[0], o.gF[1]); cF = ik(s2X, s2Y, p[0], p[1], 56, 52, o.bendF2 ?? -1); }
  if (o.gB) { const p = toLocal(o.gB[0], o.gB[1]); cB = ik(s2X - 4, s2Y, p[0], p[1], 56, 52, o.bendB2 ?? -1); }
  const L1 = limb(0, hipY, lB[0], lB[1], 76, 74, 19, c.pants), L2 = limb(0, hipY, lF[0], lF[1], 76, 74, 19, c.pants);
  const shoe = (l, col, a) => `<ellipse cx="${l.x2 + 9}" cy="${l.y2 + 1}" rx="17" ry="7" fill="${col}"${o.air ? ` transform="rotate(${(-a[1] * 57.3).toFixed(1)},${l.x2.toFixed(1)},${l.y2.toFixed(1)})"` : ''}/>`;
  const sl = c.sleeve || c.top, dk = mix(sl, '#000000', .16);
  const torso = `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} Q4,${ty - 9} 26,${ty + 6} C33,${ty + 30} 27,${hipY - 40} 25,${hipY + 6} Z" fill="${c.top}"/>` +
    `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} L-6,${ty} L-8,${hipY + 6}Z" fill="#000" opacity=".22"/>` +
    (o.shade !== 0 ? `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} Q4,${ty - 9} 26,${ty + 6} C33,${ty + 30} 27,${hipY - 40} 25,${hipY + 6} Z" fill="url(#torsoSh)"/><path d="M-12,${ty + 1} Q5,${ty + 13} 21,${ty + 2}" stroke="#000" stroke-width="3" fill="none" opacity=".22" stroke-linecap="round"/><ellipse cx="6" cy="${ty + 5}" rx="15" ry="5" fill="#000" opacity=".16"/>` : '') +
    // the second shoulder: a soft fold above it and a seam where the lower sleeve joins
    `<path d="M-14,${s2Y - 15} Q4,${s2Y - 22} 20,${s2Y - 13}" stroke="#000" stroke-width="3.2" fill="none" opacity=".2" stroke-linecap="round"/><ellipse cx="${s2X}" cy="${s2Y - 4}" rx="16" ry="12" fill="#000" opacity=".1"/>`;
  const k2 = o.k2 ?? 1, wrap = (svg, a) => a >= 1 ? svg : a <= 0 ? '' : `<g opacity="${a.toFixed(2)}">${svg}</g>`;
  const armB = limb(shX - 4, shY, aB[0], aB[1], 60, 56, 14, c.top), armF = limb(shX, shY, aF[0], aF[1], 60, 56, 15, c.top);
  const armB2 = limb(s2X - 4, s2Y, cB[0], cB[1], 56, 52, 13.5, sl), armF2 = limb(s2X, s2Y, cF[0], cF[1], 56, 52, 14.5, sl);
  const gl2 = o.glow2 || 0, glowA = (A, w) => gl2 > 0 ? `<g opacity="${gl2.toFixed(2)}">${A.svg.replace(/stroke="[^"]+" stroke-width="[^"]+"/, `stroke="#ffd36a" stroke-width="${w + 9}"`)}</g>` : '';
  const capF = `<ellipse cx="${s2X + 1}" cy="${s2Y}" rx="9.5" ry="9" fill="${sl}"/><path d="M${s2X - 9},${s2Y - 3} Q${s2X + 1},${s2Y - 11} ${s2X + 10},${s2Y - 3}" stroke="${dk}" stroke-width="2.4" fill="none"/>`;
  const tilt = -16 * (o.lookUp || 0), g = o.glow || 0, gc = o.glowCol || '#ff5a3a';
  const head = `<rect x="${hx - 7}" y="${ty - 16}" width="14" height="20" rx="5" fill="${c.skin}"/><g transform="rotate(${tilt},${hx},${hy + 14})">` +
    `<ellipse cx="${hx}" cy="${hy}" rx="20" ry="24" fill="${c.skin}"/><ellipse cx="${hx - 6}" cy="${hy + 2}" rx="13" ry="20" fill="#000" opacity=".12"/>` +
    `<path d="M${hx - 21},${hy - 2} C${hx - 24},${hy - 30} ${hx + 6},${hy - 36} ${hx + 21},${hy - 14} C${hx + 14},${hy - 20} ${hx - 2},${hy - 18} ${hx - 8},${hy - 12} C${hx - 12},${hy - 4} ${hx - 14},${hy + 6} ${hx - 21},${hy - 2}Z" fill="${c.hair}"/>` +
    `<ellipse cx="${hx + 11}" cy="${hy - 2}" rx="2.4" ry="3" fill="#1a120d"/>` + (o.closed ? `<rect x="${hx + 7.6}" y="${hy - 6.2}" width="7" height="6.4" fill="${c.skin}"/><path d="M${hx + 7.6},${hy - 1} q3.5,1.8 7,0" stroke="#3a2418" stroke-width="1.2" fill="none" opacity=".85"/>` : '') +
    `<path d="M${hx + 6},${hy - 9} q6,-3 11,0" stroke="${c.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` + (o.smile ? `<path d="M${hx + 9},${hy + 13} q5,3 9,-1" stroke="#5a2a1e" stroke-width="2" fill="none" stroke-linecap="round"/>` : '') +
    `<ellipse cx="${hx - 14}" cy="${hy + 1}" rx="4" ry="6.5" fill="${c.skin}"/>` +
    `<ellipse cx="${hx - 14}" cy="${hy + 1.5}" rx="2" ry="4" fill="#000" opacity=".18"/><path d="M${hx - 3},${hy + 22} Q${hx + 8},${hy + 26} ${hx + 15},${hy + 17}" stroke="#000" stroke-width="5" fill="none" opacity=".1" stroke-linecap="round"/><path d="M${hx + 17},${hy - 12} Q${hx + 21},${hy + 2} ${hx + 15},${hy + 15}" stroke="#fff" stroke-width="2" fill="none" opacity=".2" stroke-linecap="round"/><rect x="${hx - 7}" y="${ty - 12}" width="14" height="8" fill="#000" opacity=".16"/><circle cx="${hx + 11.8}" cy="${hy - 3}" r=".8" fill="#fff" opacity=".9"/>` +
    (g > 0 ? `<circle cx="${hx + 11}" cy="${hy - 2}" r="${(9 * g).toFixed(1)}" fill="${gc}" opacity="${(.75 * g).toFixed(2)}" filter="url(#blur2)"/>` : '') + (o.hat ? o.hat(hx, hy) : '') + `</g>`;
  const up = `<g transform="rotate(${(lean * 57.29578).toFixed(2)},0,${hipY.toFixed(2)})">`, shadow = o.noShadow ? '' : `<ellipse cx="4" cy="2" rx="46" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/>`;
  const fw = (lx, ly, ln = 1) => { if (ln) { const dx = lx, dy = ly - hipY; lx = dx * Math.cos(lean) - dy * Math.sin(lean); ly = dx * Math.sin(lean) + dy * Math.cos(lean) + hipY; }
    const px = lx * f * s, py = ly * s - pv, a = rotD * Math.PI / 180; return [x + px * Math.cos(a) - py * Math.sin(a), y + pv + px * Math.sin(a) + py * Math.cos(a)]; };
  HP = { hand: fw(armF.x2, armF.y2), handB: fw(armB.x2, armB.y2), hand2: fw(armF2.x2, armF2.y2), handB2: fw(armB2.x2, armB2.y2), eye: fw(hx + 11, hy - 2), head: fw(hx, hy), mouth: fw(hx + 16, hy + 15), ear: fw(hx - 14, hy + 1), chest: fw(0, ty + 50), sh2: fw(s2X, s2Y), footF: fw(L2.x2, L2.y2, 0), footB: fw(L1.x2, L1.y2, 0), hip: fw(0, hipY, 0) };
  const ol = (A, w, col) => A.svg.replace(/stroke="[^"]+" stroke-width="[^"]+"/, `stroke="${mix(col, '#000000', .4)}" stroke-width="${(w + 3.6).toFixed(1)}"`) + A.svg;
  const hand = (A, r) => `<circle cx="${A.x2}" cy="${A.y2}" r="${r}" fill="${c.skin}"/><circle cx="${A.x2 - 2}" cy="${A.y2 + 2}" r="${r * .6}" fill="#000" opacity=".1"/>`;
  return `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotD.toFixed(2)},0,${pv}) scale(${(f * s).toFixed(4)},${s})">${shadow}` +
    up + ol(armB, 14, c.top) + hand(armB, 7) + wrap(glowA(armB2, 13.5) + ol(armB2, 13.5, mix(sl, '#000000', .12)).split(`stroke="${sl}"`).join(`stroke="${mix(sl, '#000000', .12)}"`) + hand(armB2, 6.8), k2) + `</g>` + L1.svg.replace(c.pants, '#1d2028') + shoe(L1, '#3a3530', lB) +
    up + torso + head + `</g>` + L2.svg + shoe(L2, '#4a443c', lF) + up + wrap(glowA(armF2, 14.5) + ol(armF2, 14.5, sl) + capF + hand(armF2, 7.3), k2) + (o.preF || '') + ol(armF, 15, c.top) + hand(armF, 7.5) + `</g></g>`;
}
const P4 = (x, y, s, f, i, o = {}) => hero4(x, y, Object.assign({ s, face: f }, gp(i), o));
// the gold flash that brings the new arms
function arFlash(x, y, s, a, t, seed) {
  if (a <= 0 || a >= 1) return ''; const fl = Math.sin(a * Math.PI);
  return `<ellipse cx="${b1(x)}" cy="${b1(y - 180 * s)}" rx="${b1(120 * s)}" ry="${b1(220 * s)}" fill="url(#arPopG)" opacity="${b1(fl * .9)}"/>` + sparkles(x, y - 180 * s, 200 * s, 320 * s, 12, t, fl, seed);
}
// ---------- 0: hook: on a city street, you suddenly have four arms ----------
const ARBLK = [[-12, 150, 430, '#a8806a', 881, 1], [140, 160, 470, '#5e7a8e', 882, 2], [300, 150, 390, '#c8b08a', 883, 0], [452, 150, 450, '#8a6e7e', 884, 1], [600, 164, 420, '#7a906a', 885, 2]];
const ARSHOP = [[-4, 140, 'مقهى', '#5a3a22'], [146, 150, 'زهور', '#3a6a3a'], [306, 130, 'أحذية', '#2a3a5a'], [456, 140, 'حلويات', '#8a2a4a'], [606, 140, 'مكتبة', '#4a4a2a']];
const arStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: ARBLK, shops: ARSHOP }, o));
function sceneHook(t) {
  const tA = WS(0, 4) - .2, fa = ramp(t, tA, tA + 1.1), k2 = ease(ramp(t, tA + .2, tA + .75)), wv = ease(ramp(t, WS(0, 6), WS(0, 7))), L = [];
  // you: the four arms appear in a gold flash, then you look at them
  const x = 360, y = 1092, s = 1, w = Math.sin(t * 9) * 14;
  const hold = { hF: [x + 52 + w * wv, lerp(y - 186, y - 330, wv)], gF: [x + 62, lerp(y - 140, y - 168, k2)], hB: [x + 40 - w * .6 * wv, lerp(y - 170, y - 300, wv)], gB: [x + 50, y - 150], bendF2: -1 };
  L.push([y, hero4(x, y, Object.assign({ s, face: 1, lookUp: lerp(.05, -.35, k2) * (1 - wv) + .1 * wv, k2, glow2: Math.sin(clamp(fa) * Math.PI) * .8, smile: wv > .5 ? 1 : 0 }, gp(0), { top: '#e85a2a' }, k2 > 0 ? hold : {})) + arFlash(x, y, s, fa, t, 841)]);
  // people of today walk, stop and stare
  [[100, 1050, 1, 2, .9, .4, 1.25], [650, 1046, -1, 5, .9, 2.1, 1.5], [245, 1030, 1, 3, .86, 1, 99]].forEach(([x0, yy, f, pi, sc, ph, stop], j) => { if (stop > 50) { L.push([yy, hero(x0, yy, Object.assign({ s: sc, face: 1, shade: 1, lookUp: .05, hF: k2 > .5 ? [x0 + 20, yy - 280 * sc] : undefined }, gp(pi))) + arQ(x0 + 4, yy - 360 * sc, ease(ramp(t, WS(0, 6), WS(0, 6) + .4)), 1)]); return; }
    const T = Math.min(t, stop), xx = x0 + f * 52 * T, wk = t < stop;
    L.push([yy, hero(xx, yy, Object.assign({ s: sc, face: wk ? f : -f, shade: 1, walk: wk ? T * 4.4 + ph : null, lookUp: wk ? 0 : .1 }, gp(pi))) + arQ(xx + 2, yy - 370 * sc, ease(ramp(t, stop + .4, stop + .8)), 1)]); });
  const top = `<g transform="translate(360,1060) scale(1.32) translate(-360,-1060)">${arSort(L)}</g>`;
  let s0 = `<defs>${ARDEFS()}</defs><g transform="translate(360,1060) scale(1.32) translate(-360,-1060)">` + arStreet(t, { id: 'a0' }) + `</g>` + top;
  noEarth(); F.ov = ''; return s0;
}
// ---------- 1: the cook with four hands, the builder carrying twice the bricks, you writing, eating and on the phone ----------
const CHEF = { top: '#f2f0ea', pants: '#3a3a40', skin: '#c8946e', hair: '#2a1e16' };
const chefHat = (hx, hy) => `<path d="M${hx - 20},${hy - 14} L${hx - 18},${hy - 40} Q${hx - 34},${hy - 58} ${hx - 14},${hy - 66} Q${hx - 4},${hy - 84} ${hx + 12},${hy - 68} Q${hx + 34},${hy - 64} ${hx + 20},${hy - 40} L${hx + 21},${hy - 14}Z" fill="#fafafa"/><path d="M${hx - 20},${hy - 22} L${hx + 21},${hy - 22}" stroke="#d8d8d8" stroke-width="3"/><path d="M${hx - 6},${hy - 44} q2,-14 8,-20" stroke="#ddd" stroke-width="2" fill="none"/><path d="M${hx - 20},${hy - 14} L${hx - 18},${hy - 40} Q${hx - 34},${hy - 58} ${hx - 14},${hy - 66}" stroke="#000" stroke-width="5" fill="none" opacity=".08"/>`;
function shotKitchen(t) {
  const T = t - S0(1), CT = 1010;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#arTile)"/>`;
  for (let r = 0; r < 40; r++) { const yy = 380 + r * 24; if (yy > CT) break; for (let q = 0; q < 13; q++) s += `<rect x="${q * 64 - 30 + (r % 2) * 32}" y="${yy}" width="62" height="22" rx="2" fill="#f4f2ec" stroke="#c8c0b0" stroke-width="1.2"/>`; }
  s += `<rect x="-20" y="380" width="760" height="640" fill="#000" filter="url(#grainR)" opacity=".08"/><ellipse cx="200" cy="640" rx="260" ry="200" fill="#fff6dc" opacity=".25" filter="url(#blur16)"/>`;
  // upper cabinets with shelves of jars, the steel hood
  s += `<rect x="-20" y="300" width="290" height="190" fill="url(#arWood)"/><rect x="-20" y="300" width="290" height="190" fill="#000" filter="url(#gnWood)" opacity=".5"/><path d="M125,300 v190" stroke="#4a2e18" stroke-width="3"/><rect x="95" y="462" width="20" height="6" rx="3" fill="#c8c8c8"/><rect x="135" y="462" width="20" height="6" rx="3" fill="#c8c8c8"/><rect x="-20" y="486" width="290" height="14" fill="#000" opacity=".18" filter="url(#blur2)"/>`;
  s += `<path d="M470,640 L500,430 H700 L730,640Z" fill="url(#arSteel)"/><rect x="565" y="300" width="70" height="132" fill="url(#arSteel)"/><path d="M470,640 H730" stroke="#5a6068" stroke-width="5"/><rect x="470" y="644" width="270" height="22" fill="#000" opacity=".15" filter="url(#blur2)"/><rect x="510" y="630" width="200" height="6" fill="#fff6d0" opacity=".7"/>`;
  // the counter (the cook stands at its left end) and the stove
  s += `<rect x="300" y="${CT}" width="460" height="300" fill="url(#arWood)"/><rect x="300" y="${CT}" width="460" height="300" fill="#000" filter="url(#gnWood)" opacity=".45"/><path d="M520,${CT + 30} v260" stroke="#4a2e18" stroke-width="3"/><rect x="480" y="${CT + 110}" width="24" height="7" rx="3" fill="#c8c8c8"/><rect x="540" y="${CT + 110}" width="24" height="7" rx="3" fill="#c8c8c8"/>` +
    `<rect x="292" y="${CT - 16}" width="470" height="20" rx="3" fill="url(#arCnt)"/><rect x="292" y="${CT - 16}" width="470" height="5" fill="#fff" opacity=".35"/><rect x="300" y="${CT + 4}" width="460" height="20" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
  // the pot on the far burner, steam
  s += `<ellipse cx="640" cy="${CT - 18}" rx="46" ry="8" fill="url(#arFlame)" opacity=".8"/><path d="M582,${CT - 112} h116 v88 q0,8 -8,8 h-100 q-8,0 -8,-8Z" fill="url(#arPot)"/><ellipse cx="640" cy="${CT - 112}" rx="58" ry="10" fill="#5a2a1a"/><ellipse cx="640" cy="${CT - 111}" rx="51" ry="7" fill="#d8823a"/><rect x="572" y="${CT - 100}" width="12" height="9" rx="3" fill="#2a2a2a"/><rect x="696" y="${CT - 100}" width="12" height="9" rx="3" fill="#2a2a2a"/><path d="M590,${CT - 100} v70" stroke="#fff" stroke-width="5" opacity=".2"/>`;
  for (let i = 0; i < 4; i++) { const ph = pmod(T * .5 + i * .25, 1); s += `<ellipse cx="${b1(630 + i * 8 + Math.sin(T * 2 + i) * 14)}" cy="${b1(CT - 130 - ph * 220)}" rx="${b1(24 + ph * 30)}" ry="${b1(20 + ph * 26)}" fill="url(#arSteam)" opacity="${b1(.7 * Math.sin(ph * Math.PI))}"/>`; }
  // bowl (lower back hand whisks), board with carrots (lower front hand chops)
  s += `<path d="M300,${CT - 66} h76 q-4,50 -38,52 q-34,-2 -38,-52Z" fill="#e8e4dc"/><ellipse cx="338" cy="${CT - 66}" rx="38" ry="8" fill="#f0d070"/><path d="M300,${CT - 66} q4,50 38,52" stroke="#000" stroke-width="3" fill="none" opacity=".12"/>`;
  s += `<rect x="388" y="${CT - 28}" width="140" height="13" rx="3" fill="#c89a62"/><rect x="388" y="${CT - 28}" width="140" height="4" fill="#fff" opacity=".25"/>` + [0, 1, 2, 3, 4].map(k => `<ellipse cx="${470 - k * 13}" cy="${CT - 32}" rx="6" ry="4.5" fill="#e8742a"/><ellipse cx="${469 - k * 13}" cy="${CT - 33.5}" rx="2.6" ry="1.5" fill="#ffb070" opacity=".7"/>`).join('') + `<path d="M480,${CT - 34} q20,-9 36,0Z" fill="#e8742a"/><path d="M516,${CT - 34} l10,-8 M516,${CT - 34} l12,-2" stroke="#4a9a3a" stroke-width="3"/>`;
  // the cook: upper front hand tosses the pan, upper back hand lifts a finished plate, lower front hand chops, lower back hand whisks
  const x = 236, y = 1272, sc = 1.55, ch = Math.abs(Math.sin(T * 9)), toss = Math.sin(T * 4.5) * .5 + .5, wh = Math.sin(T * 12);
  const g = hero4(x, y, Object.assign({ s: sc, face: 1, lookUp: .1, hat: chefHat, hF: [400, 905 - toss * 24], hB: [372, 792], gF: [420, CT - 44 - ch * 30], gB: [330 + wh * 8, CT - 86], bendF2: -1, bendB2: -1 }, CHEF));
  const H = HP;
  // the plate held up high (behind the head side), the knife, the whisk, the pan
  const [bx, by] = H.handB; let pr = `<g transform="translate(${b1(bx + 6)},${b1(by - 6)})"><ellipse cx="0" cy="4" rx="58" ry="11" fill="#d0d0cc"/><ellipse cx="0" cy="0" rx="58" ry="11" fill="#f4f4f0"/><ellipse cx="0" cy="-1" rx="40" ry="7" fill="#e4e4e0"/><path d="M-26,-2 q8,-22 30,-20 q22,2 24,20Z" fill="url(#arBread)"/><circle cx="-8" cy="-12" r="5" fill="#4aa84a"/><circle cx="8" cy="-16" r="4" fill="#d84a3a"/></g>`;
  for (let i = 0; i < 3; i++) { const ph = pmod(T * .6 + i * .33, 1); pr += `<path d="M${b1(bx - 6 + i * 10)},${b1(by - 30 - ph * 60)} q-6,-12 0,-24" stroke="#fff" stroke-width="3" fill="none" opacity="${b1(.5 * Math.sin(ph * Math.PI))}"/>`; }
  const [kx, ky] = H.hand2; pr += `<path d="M${b1(kx + 6)},${b1(ky + 4)} L${b1(kx + 66)},${b1(ky + 20)} L${b1(kx + 64)},${b1(ky + 4)} Z" fill="url(#arSteel)" stroke="#5a6068" stroke-width="1"/><rect x="${b1(kx - 18)}" y="${b1(ky - 3)}" width="26" height="11" rx="3" fill="#2a2a2a" transform="rotate(12,${b1(kx)},${b1(ky)})"/>`;
  const [wx, wy] = H.handB2; pr += `<path d="M${b1(wx)},${b1(wy)} L${b1(wx + 8)},${b1(CT - 70)}" stroke="#8a8a90" stroke-width="5" stroke-linecap="round"/>` + [0, 1, 2].map(k => `<ellipse cx="${b1(wx + 10)}" cy="${b1(CT - 58)}" rx="${7 - k * 2}" ry="14" fill="none" stroke="#b8b8c0" stroke-width="1.8"/>`).join('');
  const [px, py] = H.hand, pa = -4 - toss * 10;
  pr += `<g transform="rotate(${b1(pa)},${b1(px)},${b1(py)})"><rect x="${b1(px - 12)}" y="${b1(py - 6)}" width="92" height="12" rx="5" fill="#2a2a2e"/><path d="M${b1(px + 74)},${b1(py - 10)} h150 q-6,30 -28,34 h-94 q-22,-4 -28,-34Z" fill="url(#arPan)"/><ellipse cx="${b1(px + 149)}" cy="${b1(py - 10)}" rx="75" ry="8" fill="#3a3a3e"/>` +
    [0, 1, 2, 3, 4, 5].map(k => `<ellipse cx="${b1(px + 106 + k * 16)}" cy="${b1(py - 16 - Math.abs(Math.sin(T * 4.5 + k)) * 34 * toss)}" rx="8" ry="5.5" fill="${['#4aa84a', '#e8c84a', '#d84a3a', '#4aa84a', '#e8a83a', '#d84a3a'][k]}"/>`).join('') + `</g>`;
  s += g + pr;
  return s;
}
const WORK = { top: '#e8a030', pants: '#3a4a6a', skin: '#a8744c', hair: '#1d1612' };
const helmet = (hx, hy) => `<path d="M${hx - 22},${hy - 8} Q${hx - 22},${hy - 38} ${hx},${hy - 38} Q${hx + 24},${hy - 38} ${hx + 24},${hy - 10}Z" fill="#f4d040"/><path d="M${hx - 26},${hy - 8} H${hx + 34}" stroke="#d8b030" stroke-width="5" stroke-linecap="round"/><path d="M${hx - 10},${hy - 34} q-6,10 -6,24" stroke="#fff" stroke-width="3" fill="none" opacity=".4"/>`;
function shotSite(t) {
  const T = t - (WS(1, 4) - .2);
  let s = `<linearGradient id="arSiS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a92cc"/><stop offset="1" stop-color="#e8d8b8"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#arSiS)"/>` + sun3(600, 520, .8) + cumulus(240 + T * 4, 560, 220, 61, { a: .6 });
  s += farCity(57, 880, '#8a96a8');
  for (let i = 0; i < 5; i++) { const yy = 860 - i * 70; s += `<rect x="60" y="${yy - 70}" width="300" height="70" fill="#c8b8a0" stroke="#7a6a5a" stroke-width="3"/><rect x="60" y="${yy - 70}" width="300" height="70" fill="#000" filter="url(#grainR)" opacity=".15"/>` + [0, 1, 2, 3].map(k => `<rect x="${80 + k * 70}" y="${yy - 54}" width="40" height="38" fill="#4a5a6a"/><rect x="${80 + k * 70}" y="${yy - 54}" width="40" height="6" fill="#000" opacity=".25"/>`).join(''); }
  s += `<path d="M420,880 V300 M420,310 H710 M420,310 L390,350 H420" stroke="#e8b030" stroke-width="12"/><path d="M420,880 V300" stroke="#000" stroke-width="4" opacity=".2"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M414,${860 - i * 48} L426,${836 - i * 48}" stroke="#b88a20" stroke-width="3"/>`).join('') + `<path d="M640,310 V${470 + Math.sin(t) * 16}" stroke="#3a3a3a" stroke-width="3"/><rect x="620" y="${470 + Math.sin(t) * 16}" width="40" height="30" fill="#b8584a"/>`;
  s += `<rect x="-20" y="880" width="760" height="420" fill="#a89478"/><rect x="-20" y="880" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="880" width="760" height="20" fill="url(#aoDn)" opacity=".4"/>` + brickStack(560, 1000, 24) + brickStack(30, 990, 12);
  // two builders walk right: the usual one carries one stack, the four-armed one carries two
  const L = [], v = 62, la = ease(ramp(t, WS(1, 6) - .1, WS(1, 6) + .3));
  [[330, 1050, 3, 0, .9], [110, 1235, 4, 1, 1.05]].forEach(([x0, y, pi, four, sc], j) => { const x = x0 + T * v, wk = T * 4.4 + j * 1.3;
    if (four) { const g = hero4(x, y, Object.assign({ s: sc, face: 1, walk: wk, amp: .45, hat: helmet, hF: [x + 32 * sc, y - 172 * sc], hB: [x + 8 * sc, y - 168 * sc], gF: [x + 36 * sc, y - 106 * sc], gB: [x + 12 * sc, y - 102 * sc] }, WORK, { top: '#3a7ab8' }));
      L.push([y, g + `<g transform="translate(${b1(x + 8 * sc)},${b1(y - 170 * sc)}) scale(${sc * .9})">${brickStack(-34, 0, 8)}</g><g transform="translate(${b1(x + 12 * sc)},${b1(y - 104 * sc)}) scale(${sc * .9})">${brickStack(-34, 0, 8)}</g>` + AL(x + 40, y - 360 * sc, '١٦ طوبة', la, '#f4c76b', 32)]); }
    else { const g = hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, walk: wk, amp: .45, hF: [x + 32 * sc, y - 172 * sc], hB: [x + 8 * sc, y - 168 * sc] }, WORK));
      L.push([y, g + `<g transform="translate(${b1(x + 8 * sc)},${b1(y - 170 * sc)}) scale(${sc * .9})">${brickStack(-34, 0, 8)}</g>` + `<path d="M${b1(x - 16 * sc)},${b1(y - 256 * sc)} q${b1(20 * sc)},${b1(-26 * sc)} ${b1(42 * sc)},0Z" fill="#f4d040"/>` + AL(x + 40, y - 350 * sc, '٨ طوبات', la, '#fff', 30)]); } });
  s += arSort(L);
  return s;
}
const SEAT4 = { lF: [1.5708, .05], lB: [1.42, -.02] };
function shotDesk(t) {
  const T = t - (WS(1, 8) - .2);
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#arWall)"/>` + Array.from({ length: 16 }, (_, i) => `<rect x="${i * 48 - 10}" y="-20" width="20" height="960" fill="#fff" opacity=".05"/>`).join('') + `<rect x="-20" y="-20" width="760" height="960" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  s += `<rect x="420" y="430" width="250" height="300" rx="6" fill="#5a4a3a"/><rect x="434" y="444" width="222" height="272" fill="#a8d0ec"/><path d="M434,640 Q500,600 560,630 T656,610 V716 H434Z" fill="#7a9a6a" opacity=".7"/><rect x="434" y="444" width="222" height="272" fill="#fff4d0" opacity=".3"/><path d="M545,444 v272 M434,580 h222" stroke="#5a4a3a" stroke-width="8"/>`;
  s += `<path d="M420,730 L560,730 L740,1300 L300,1300Z" fill="#fff4d0" opacity=".12"/>`;
  s += `<rect x="-20" y="930" width="760" height="370" fill="url(#arFloor)"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M-20,${940 + i * i * 6} H740" stroke="#000" stroke-width="2" opacity=".18"/>`).join('') + `<rect x="-20" y="930" width="760" height="370" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="918" width="760" height="14" fill="#e8e4dc"/>`;
  const x = 250, y = 1200, sc = 1.22, DT = y - 152 * sc;
  // chair
  s += `<rect x="${x - 70}" y="${y - 92 * sc}" width="${110 * sc}" height="16" rx="6" fill="#3a3a44"/><path d="M${x - 62},${y - 82 * sc} V${y} M${x + 40},${y - 82 * sc} V${y}" stroke="#2a2a30" stroke-width="7"/><path d="M${x - 66},${y - 90 * sc} L${x - 80},${y - 300 * sc}" stroke="#3a3a44" stroke-width="16" stroke-linecap="round"/>`;
  // the person: the upper front hand holds the phone to the ear, the lower front hand writes, the upper back hand eats, the lower back hand holds the mug
  const bite = Math.max(0, Math.sin(T * 2.4)), wr = Math.sin(T * 14) * 4;
  const g = hero4(x, y, Object.assign({ s: sc, face: 1, lookUp: -.12 }, SEAT4, gp(5), { top: '#4a6a8a', hF: [x - 4 * sc, y - 226 * sc], gF: [x + 128 + wr, DT - 8], hB: [lerp(x + 120, x + 30 * sc, bite), lerp(DT - 40, y - 210 * sc, bite)], gB: [x + 200, DT - 14], bendF: 1 }));
  const H = HP;
  // desk
  let d = `<rect x="${x + 70}" y="${DT}" width="400" height="18" rx="3" fill="url(#arWood)"/><rect x="${x + 70}" y="${DT}" width="400" height="5" fill="#fff" opacity=".2"/><path d="M${x + 86},${DT + 18} V${y} M${x + 450},${DT + 18} V${y}" stroke="#5a3a22" stroke-width="12"/><rect x="${x + 70}" y="${DT + 18}" width="400" height="14" fill="#000" opacity=".2" filter="url(#blur2)"/>`;
  d += `<path d="M${x + 96},${DT - 2} L${x + 190},${DT - 2} L${x + 186},${DT - 6} L${x + 100},${DT - 6}Z" fill="#fafaf4"/>` + [0, 1, 2].map(k => `<path d="M${x + 108},${DT - 3.5 - k * .1} h${50 + k * 10}" stroke="#4a5a8a" stroke-width="1" opacity=".5"/>`).join('');
  d += `<path d="M${x + 300},${DT - 70} h110 l-6,-60 h-98Z" fill="#2a2e36"/><rect x="${x + 312}" y="${DT - 126}" width="86" height="50" fill="#4a7aa8"/><rect x="${x + 340}" y="${DT - 10}" width="30" height="10" fill="#2a2e36"/>`;
  // props in hands (drawn over the person)
  const [wx, wy] = H.hand2, [px, py] = H.hand, [ex, ey] = H.handB, [mx, my] = H.handB2;
  let pr = `<path d="M${b1(wx - 2)},${b1(wy - 4)} L${b1(wx + 10)},${b1(wy + 12)}" stroke="#1a3a8a" stroke-width="3.5" stroke-linecap="round"/>`;
  pr += `<rect x="${b1(px - 8)}" y="${b1(py - 30)}" width="15" height="44" rx="4" fill="#1a1c22" transform="rotate(-16,${b1(px)},${b1(py)})"/><rect x="${b1(px - 6)}" y="${b1(py - 27)}" width="3" height="36" rx="1" fill="#4a5a7a" transform="rotate(-16,${b1(px)},${b1(py)})"/>`;
  pr += `<g transform="translate(${b1(ex + 8)},${b1(ey - 4)})"><path d="M-14,-10 h30 q6,0 6,6 v4 h-42 v-4 q0,-6 6,-6Z" fill="#e8c088"/><rect x="-14" y="0" width="42" height="6" fill="#6aa84a"/><rect x="-14" y="6" width="42" height="5" fill="#c84a3a"/><path d="M-14,11 h42 q0,8 -8,8 h-26 q-8,0 -8,-8Z" fill="#d8a868"/></g>`;
  pr += `<g transform="translate(${b1(mx + 6)},${b1(DT)})"><path d="M-12,-34 h26 v28 q0,6 -6,6 h-14 q-6,0 -6,-6Z" fill="#e8e4dc"/><path d="M14,-28 q12,0 12,10 q0,10 -12,10" stroke="#e8e4dc" stroke-width="4" fill="none"/><rect x="-12" y="-34" width="26" height="5" fill="#000" opacity=".12"/>` + [0, 1].map(k => `<path d="M${-2 + k * 8},-40 q-5,-10 0,-20 q5,-10 0,-18" stroke="#fff" stroke-width="2.4" fill="none" opacity="${b1(.4 + .2 * Math.sin(T * 3 + k))}"/>`).join('') + `</g>`;
  s += d + g + pr;
  return s;
}
function sceneSkills(t) {
  let s = `<defs>${ARDEFS()}</defs>` + subs(t, [[S0(1) - .2, shotKitchen], [WS(1, 4) - .2, shotSite], [WS(1, 8) - .2, shotDesk]]);
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the brain must change: the motor cortex grows to move the two new hands ----------
const MCURVE = [[8, -120], [11, -100], [15, -80], [20, -60], [26, -40], [31, -15], [36, 10]];
function motorBand(w0, w1) { const P = MCURVE.map(([x, y]) => [x + 3 + w0, y]), Q = MCURVE.map(([x, y]) => [x + 3 + w1, y]).reverse();
  return 'M' + P.map(p => p.join(',')).join(' L') + ' L' + Q.map(p => p.join(',')).join(' L') + 'Z'; }
function sceneBrain(t) {
  const st = S0(2) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), ml = ease(ramp(t, WS(2, 5) - .1, WS(2, 6) + .3)), gr = ease(ramp(t, WS(2, 7) - .1, WS(2, 8) + .2)), nw = ease(ramp(t, WS(2, 9) - .1, WS(2, 10) + .3));
  let s = `<defs>${ARDEFS()}</defs>` + studio('stA', '#2c3a5a', '#080c18', 6);
  const cx = 360, cy = 590, sc = 1.15;
  s += scr(`<circle cx="${cx}" cy="${cy}" r="300" fill="#f4c76b" opacity="${b1(.05 + .08 * ml)}" filter="url(#blur16)"/>`);
  s += brainSide(cx, cy, sc, 7, { glow: .1, noShadow: 1 });
  // the motor strip, just in front of the central groove; it widens, then a new bright patch for the new hands
  const W = lerp(22, 40, gr), pul = .75 + .25 * Math.sin(t * 6);
  s += `<g transform="translate(${cx},${cy}) scale(${sc})"><defs><clipPath id="arBrC"><path d="${BRP}"/></clipPath></defs><g clip-path="url(#arBrC)">` +
    `<path d="${motorBand(2, W)}" fill="#ffd36a" opacity="${b1(.55 * ml * pul)}"/><path d="${motorBand(2, W)}" fill="none" stroke="#fff3c0" stroke-width="2" opacity="${b1(.8 * ml)}"/>` +
    (nw > 0 ? `<ellipse cx="${b1(24 + W * .6)}" cy="-52" rx="${b1(14 + 6 * nw)}" ry="22" fill="#fff" opacity="${b1(.6 * nw * pul)}" filter="url(#blur5)"/><ellipse cx="${b1(26 + W * .6)}" cy="-52" rx="9" ry="16" fill="#ffe9a8" opacity="${b1(.9 * nw)}"/>` : '') + `</g></g>`;
  // label with a leader line
  const lx = cx + 40 * sc, ly = cy - 120 * sc;
  s += `<path d="M${b1(lx)},${b1(ly + 10)} L${b1(lx + 60)},${b1(ly - 60)} H600" stroke="#f4c76b" stroke-width="3" fill="none" opacity="${b1(ml)}"/>` + AL(560, ly - 76, 'القشرةُ الحركيّة', b1(ml), '#f4c76b', 32);
  // a small four-armed person below: signals run from the strip to the hands
  const px = 330, py = 1236, ps = 1.02;
  const pg = hero4(px, py, Object.assign({ s: ps, face: 1, lookUp: .05, k2: 1, glow2: .5 * nw, hF: [px + 70, py - 290 * ps], gF: [px + 80, py - 180 * ps], hB: [px + 40, py - 300 * ps], gB: [px + 50, py - 170 * ps] }, gp(0), { top: '#e85a2a' }));
  const H = [HP.hand, HP.handB, HP.hand2, HP.handB2];
  s += `<g opacity="${b1(a)}">${pg}</g>`;
  const src = [cx + 30 * sc, cy - 50 * sc];
  H.forEach(([hx, hy], i) => { const nu = i >= 2, k = nu ? nw : ml; if (k <= 0) return; const mx = (src[0] + hx) / 2 + (i % 2 ? -90 : 90), my = (src[1] + hy) / 2;
    const d = `M${b1(src[0])},${b1(src[1])} Q${b1(mx)},${b1(my)} ${b1(hx)},${b1(hy)}`;
    s += `<path d="${d}" stroke="${nu ? '#fff3c0' : '#f4c76b'}" stroke-width="${nu ? 3 : 2.4}" fill="none" opacity="${b1(.6 * k)}" stroke-dasharray="${b1(k * 900)} 900"/>`;
    const u = pmod(t * .9 + i * .25, 1), qx = (1 - u) * (1 - u) * src[0] + 2 * u * (1 - u) * mx + u * u * hx, qy = (1 - u) * (1 - u) * src[1] + 2 * u * (1 - u) * my + u * u * hy;
    if (k > .9) s += scr(`<circle cx="${b1(qx)}" cy="${b1(qy)}" r="10" fill="url(#arGlow)"/>`); });
  s += AL(570, 1010, '+ يدانِ جديدتان', b1(nw), '#fff3c0', 32);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: each arm is about 5% of your weight: heavier, the heart works harder, more food ----------
function heartD(x, y, sc, t, rate) {
  const b = 1 + .07 * Math.max(0, Math.sin(t * rate * 6.283)) ** 4;
  return `<g transform="translate(${x},${y}) scale(${b1(sc * b * 100) / 100})"><path d="M-8,-58 q-4,-26 8,-40 M10,-56 q2,-24 18,-34 q14,-6 22,4" stroke="#b83a3a" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-22,-50 q-8,-20 -2,-36" stroke="#5a6ab8" stroke-width="14" fill="none" stroke-linecap="round"/>` +
    `<path d="M0,64 C-40,40 -70,10 -66,-22 C-62,-52 -34,-60 -14,-46 C-4,-58 22,-64 44,-48 C70,-28 62,14 0,64Z" fill="url(#arHeart)"/><path d="M-6,-40 C4,-10 0,24 6,56" stroke="#7a1a1a" stroke-width="3" fill="none" opacity=".6"/><path d="M-6,-40 C-14,-20 -30,0 -44,6" stroke="#f4c060" stroke-width="2.4" fill="none" opacity=".55"/><ellipse cx="-34" cy="-26" rx="16" ry="10" fill="#fff" opacity=".22" transform="rotate(-30,-34,-26)"/></g>`;
}
function arInset(x, y, inner, a, R = 100) {
  if (a <= 0) return ''; const k = .75 + .25 * Math.min(1, a * 1.5);
  return `<g transform="translate(${x},${y}) scale(${b1(k * 100) / 100})" opacity="${b1(clamp(a * 1.5))}"><circle cx="0" cy="6" r="${R}" fill="#000" opacity=".3"/><circle cx="0" cy="0" r="${R}" fill="url(#arInset)"/>${inner}<circle cx="0" cy="0" r="${R}" fill="none" stroke="#f4c76b" stroke-width="4"/></g>`;
}
function plateF(k) { let g = `<ellipse cx="0" cy="30" rx="78" ry="20" fill="#e8e8e4"/><ellipse cx="0" cy="26" rx="58" ry="13" fill="#d0d0cc"/>`;
  g += `<path d="M-50,22 Q-52,-12 -20,-18 Q20,-24 44,0 Q54,16 40,24Z" fill="url(#arBread)"/>`;
  if (k > .3) g += `<circle cx="-24" cy="${b1(14 - 30 * k)}" r="16" fill="#d84a3a"/><circle cx="-28" cy="${b1(10 - 30 * k)}" r="4" fill="#fff" opacity=".4"/>`;
  if (k > .6) g += `<ellipse cx="22" cy="${b1(8 - 40 * k)}" rx="20" ry="14" fill="#e8c84a"/><path d="M-6,${b1(-6 - 52 * k)} q10,-26 26,-30" stroke="#6aa84a" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  return g; }
function sceneBody(t) {
  const st = S0(3) - .2, a5 = ease(ramp(t, WS(3, 1) - .1, WS(3, 3) + .2)), hv = ease(ramp(t, WS(3, 7) - .2, WS(3, 8) + .2)), hr = ease(ramp(t, WS(3, 9) - .2, WS(3, 10))), fd = ease(ramp(t, WS(3, 12) - .2, WS(3, 13)));
  let s = `<defs>${ARDEFS()}</defs>` + studio('stB', '#34405e', '#0a0e1a', 9) + `<ellipse cx="360" cy="1180" rx="420" ry="60" fill="#000" opacity=".35" filter="url(#blur9)"/>`;
  // a bathroom scale
  const x = 330, y = 1170, sc = 1.55;
  s += `<rect x="${x - 86}" y="${y - 6}" width="172" height="34" rx="12" fill="#e8ecf0"/><rect x="${x - 86}" y="${y + 18}" width="172" height="10" rx="5" fill="#000" opacity=".18"/><rect x="${x - 34}" y="${y + 2}" width="68" height="20" rx="4" fill="#1a2a2a"/>`;
  const kg = Math.round(lerp(70, 77, hv)); s += `<text x="${x}" y="${y + 18}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="16" fill="${hv > .5 ? '#ff8a6a' : '#7ae0c0'}" direction="ltr">${kg} kg</text>`;
  s += hero4(x, y - 6, Object.assign({ s: sc, face: 1, lookUp: -.15 + .2 * hr, glow2: .85 * a5 * (1 - hv * .5) * (.8 + .2 * Math.sin(t * 5)) }, gp(0), { top: '#e85a2a', aF: [.55, 1.0], aB: [.4, .9], cF: [-.32, -.12], cB: [-.22, -.05] }));
  const [ax, ay] = HP.hand2;
  s += `<path d="M${b1(ax + 18)},${b1(ay - 10)} L575,${b1(ay - 70)}" stroke="#f4c76b" stroke-width="3" opacity="${b1(a5)}"/>` + `<g opacity="${b1(a5)}">${panel(470, ay - 190, 230, 104)}${AL(585, ay - 146, 'ذراعٌ واحدة', 1, '#fff', 26)}${AL(585, ay - 106, '≈ ٥٪ من الوزن', 1, '#f4c76b', 30)}</g>`;
  s += `<g opacity="${b1(hv)}">${panel(410, 1140, 290, 56)}${AL(555, 1178, 'الوزن: +١٠٪ تقريباً', 1, '#ff9a7a', 28)}</g>`;
  s += arInset(150, 560, heartD(0, 0, .95, t, lerp(1.1, 2.1, hr)), hr) + AL(150, 700, 'قلبٌ يعملُ أكثر', b1(hr), '#fff', 26);
  s += arInset(570, 560, `<g transform="scale(${b1(.85 + .25 * fd)})">${plateF(fd)}</g>`, fd) + AL(570, 700, 'طعامٌ أكثر', b1(fd), '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: the world is made for two arms: shirts, jackets, car seats, seat belts ----------
const shirt = (x, y, c, sc = 1, sl = 2) => `<g transform="translate(${x},${y}) scale(${sc})"><path d="M0,-6 q-6,-10 0,-14 q6,-4 8,4" stroke="#8a8a8a" stroke-width="2.4" fill="none"/><path d="M-40,8 L0,0 L40,8 Z" stroke="#8a8a8a" stroke-width="2.4" fill="none"/>` +
  `<path d="M-14,4 L-44,14 L-66,58 L-50,66 L-34,40 L-34,120 L34,120 L34,40 L50,66 L66,58 L44,14 L14,4 Q0,14 -14,4Z" fill="${c}"/><path d="M-34,40 L-34,120 L-14,120 L-18,30Z" fill="#000" opacity=".15"/><path d="M-14,4 Q0,20 14,4" stroke="#000" stroke-width="2" fill="none" opacity=".25"/><path d="M0,14 V118" stroke="#000" stroke-width="1.2" opacity=".2"/>` + [0, 1, 2, 3].map(k => `<circle cx="3" cy="${30 + k * 22}" r="2.2" fill="#fff" opacity=".6"/>`).join('') + `</g>`;
function shotShop(t) {
  const T = t - (S0(4) - .2);
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="#e4d8c4"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${i * 90 - 20}" y="-20" width="44" height="1000" fill="#fff" opacity=".06"/>`).join('') + `<rect x="-20" y="-20" width="760" height="1000" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  for (let i = 0; i < 4; i++) s += `<ellipse cx="${100 + i * 180}" cy="400" rx="90" ry="40" fill="#fff8e0" opacity=".35" filter="url(#blur9)"/><rect x="${80 + i * 180}" y="380" width="40" height="10" rx="4" fill="#d8d0c0"/>`;
  // rails of shirts and jackets, every one with two sleeves
  s += `<path d="M20,600 H500" stroke="#8a8a90" stroke-width="6"/><path d="M40,600 V420 M480,600 V420" stroke="#8a8a90" stroke-width="5"/>`;
  ['#6a8ab8', '#e8e4d8', '#3a5a3a', '#e8b84a', '#5a4a7a', '#2a3a5a'].forEach((c, i) => { s += shirt(70 + i * 76, 614, c, .82); });
  s += `<rect x="-20" y="960" width="760" height="340" fill="#b8a488"/><rect x="-20" y="960" width="760" height="340" fill="#000" filter="url(#grainR)" opacity=".15"/><rect x="-20" y="960" width="760" height="24" fill="url(#aoDn)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M${i * 130 - 40},960 L${i * 170 - 160},1300" stroke="#8a7a60" stroke-width="2" opacity=".5"/>`).join('');
  // a mirror with the shopper in it? no: a mannequin with a jacket
  s += `<rect x="602" y="760" width="16" height="340" fill="#c8c0b0"/><ellipse cx="610" cy="1100" rx="50" ry="10" fill="#8a8070"/>` + shirt(610, 770, '#4a3a2a', 1.15);
  // the four-armed shopper holds up a shirt: two sleeves, four arms
  const x = 250, y = 1180, sc = 1.15, sh = Math.sin(T * 1.5) * 4;
  const g = hero4(x, y, Object.assign({ s: sc, face: 1, lookUp: .12, hF: [x + 96, y - 330 + sh], hB: [x + 76, y - 322 + sh], gF: [x + 88, y - 168], gB: [x + 60, y - 186], bendF2: -1 }, gp(2), { top: '#4e6a3a' }));
  const [hx, hy] = HP.hand;
  s += g + shirt(hx + 32, hy - 6, '#c84a3a', 1.1) + `<path d="M${b1(HP.hand[0])},${b1(HP.hand[1])} m-6,-6 a7,7 0 1 0 1,0" fill="${gp(2).skin}"/>` + arQ(x + 40, y - 420, ease(ramp(t, WS(4, 3) - .2, WS(4, 3) + .3)), 1.3);
  { const la = ease(ramp(t, WS(4, 4) - .1, WS(4, 4) + .3)); s += `<g opacity="${b1(la)}">${panel(440, 1150, 250, 60)}${AL(565, 1191, 'كُمّانِ فقط', 1, '#f4c76b', 32)}</g>`; }
  return s;
}
function shotCar(t) {
  const T = t - (WS(4, 6) - .2), bk = ease(ramp(t, WS(4, 8) - .3, WS(4, 9)));
  // inside a car, seen from the passenger side: the window with the street passing
  let s = `<defs><clipPath id="arWinC"><path d="M40,470 Q60,420 140,420 H560 Q640,420 690,520 L700,760 H40Z"/></clipPath></defs><rect x="-20" y="-20" width="760" height="1320" fill="#2e3036"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += `<g clip-path="url(#arWinC)"><rect x="0" y="400" width="720" height="380" fill="url(#arCarIn)"/><g transform="translate(${b1(-pmod(T * 60, 200))},0)">${farCity(71, 740, '#8a96a8')}</g>` + Array.from({ length: 6 }, (_, i) => { const tx = pmod(i * 170 - T * 520, 1020) - 150; return `<rect x="${b1(tx)}" y="640" width="12" height="130" fill="#5a4a3a"/><circle cx="${b1(tx + 6)}" cy="620" r="52" fill="#4a7a3a"/><circle cx="${b1(tx - 10)}" cy="606" r="30" fill="#6a9a4a" opacity=".7"/>`; }).join('') + `<rect x="0" y="400" width="720" height="380" fill="#cfe4f4" opacity=".18"/></g>`;
  s += `<path d="M40,470 Q60,420 140,420 H560 Q640,420 690,520 L700,760 H40Z" fill="none" stroke="#1c1e22" stroke-width="24"/><path d="M300,420 L270,760" stroke="#1c1e22" stroke-width="26"/>`;
  s += `<rect x="-20" y="760" width="760" height="540" fill="#3a3c44"/><rect x="-20" y="760" width="760" height="540" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="760" width="760" height="12" fill="#5a5c64"/><path d="M60,860 H620" stroke="#2a2c32" stroke-width="5"/>`;
  // dashboard, steering column and wheel (seen edge-on), the seat
  s += `<path d="M500,790 Q560,770 740,780 V1040 Q640,1020 580,970 Z" fill="#232529"/><path d="M500,790 Q560,770 740,780" stroke="#4a4c54" stroke-width="4" fill="none"/><rect x="600" y="830" width="90" height="40" rx="6" fill="#111" opacity=".8"/><circle cx="625" cy="850" r="13" fill="none" stroke="#7ac8ff" stroke-width="2" opacity=".6"/><circle cx="665" cy="850" r="13" fill="none" stroke="#7ac8ff" stroke-width="2" opacity=".6"/>`;
  const x = 240, y = 1240, sc = 1.6;
  s += `<path d="M${x - 2},${y - 128} L${x - 44},${y - 400} Q${x - 50},${y - 424} ${x - 22},${y - 428} L${x + 8},${y - 428} Q${x + 32},${y - 424} ${x + 28},${y - 400} L${x + 40},${y - 140}Z" fill="url(#arSeat)"/><rect x="${x - 62}" y="${y - 500}" width="74" height="70" rx="24" fill="url(#arSeat)" transform="rotate(-8,${x - 25},${y - 465})"/><path d="M${x - 36},${y - 432} v12 M${x - 16},${y - 432} v12" stroke="#8a8c94" stroke-width="5"/>`;
  s += `<path d="M${x - 30},${y - 140} Q${x - 40},${y - 100} ${x},${y - 96} L${x + 170},${y - 96} Q${x + 196},${y - 100} ${x + 190},${y - 130} L${x + 180},${y - 150} L${x - 10},${y - 150}Z" fill="url(#arSeat)"/><rect x="${x - 20}" y="${y - 96}" width="200" height="100" fill="#1e2024"/>`;
  const g = hero4(x + 20, y - 40, Object.assign({ s: sc, face: 1, lookUp: .03 }, SEAT4, gp(6), { top: '#7a4a5a', hF: [452, 832 + Math.sin(T * 1.4) * 3], hB: [462, 870], gF: [lerp(x + 120, x + 98, bk), lerp(y - 196, y - 172, bk)], gB: [x + 96, y - 160] }));
  const [sx, sy] = HP.sh2;
  s += g;
  s += `<path d="M480,870 L600,980" stroke="#1a1a1e" stroke-width="24" stroke-linecap="round"/><ellipse cx="462" cy="855" rx="20" ry="92" fill="none" stroke="#111214" stroke-width="16" transform="rotate(-20,462,855)"/><ellipse cx="462" cy="855" rx="20" ry="92" fill="none" stroke="#3a3c42" stroke-width="3" transform="rotate(-20,462,855)" opacity=".6"/>`;
  // the seat belt: from the pillar over the upper shoulder, across the chest, pinning the lower arms
  if (bk > 0) { const p = `M${x - 20},${y - 410} L${b1(sx + 20)},${b1(sy + 10)} L${x + 150},${y - 150}`; s += `<g opacity="${b1(bk)}"><path d="${p}" stroke="#141416" stroke-width="18" fill="none" stroke-linejoin="round"/><path d="${p}" stroke="#4a4a52" stroke-width="2.4" fill="none" stroke-dasharray="10 8"/><rect x="${x + 150}" y="${y - 168}" width="30" height="22" rx="4" fill="#c8c8cc"/></g>`; }
  const xa = ease(ramp(t, WS(4, 9) - .1, WS(4, 9) + .3));
  if (xa > 0) s += `<g opacity="${b1(xa)}"><circle cx="${b1(sx + 120)}" cy="${b1(sy - 70)}" r="32" fill="#e53935"/><path d="M${b1(sx + 106)},${b1(sy - 84)} l28,28 M${b1(sx + 134)},${b1(sy - 84)} l-28,28" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M${b1(sx + 100)},${b1(sy - 44)} L${b1(sx + 40)},${b1(sy + 10)}" stroke="#e53935" stroke-width="4"/></g>`;
  return s;
}
function sceneWorld(t) { let s = `<defs>${ARDEFS()}</defs>` + subs(t, [[S0(4) - .2, shotShop], [WS(4, 6) - .2, shotCar]]); noEarth(); F.ov = ''; return s; }
// ---------- 5: swimming: most of the push comes from the arms ----------
function swim4(x, y, s, t, four, o = {}) {
  const p = t * (o.kr || 3.4), k = .24;
  const lF = [k * Math.sin(p * 2), k * Math.sin(p * 2) - .14], lB = [-k * Math.sin(p * 2), -k * Math.sin(p * 2) - .14];
  const arm = ph => { const a = pmod(ph, 6.2832); return [Math.PI - a, Math.PI - a + (a > 3.2 ? .5 : .15)]; };
  const A = Object.assign({ s, face: 1, rot: 84, pv: -150 * s, noShadow: 1, shade: 1, lF, lB, aF: arm(p), aB: arm(p + Math.PI), lookUp: .3 }, o.pal || gp(1));
  if (four) Object.assign(A, { cF: arm(p + Math.PI / 2), cB: arm(p + Math.PI * 1.5) });
  return (four ? hero4 : hero)(x, y + 150 * s, A);
}
function sceneSwim(t) {
  const st = S0(5) - .2, T = t - st, pu = ease(ramp(t, WS(5, 2) - .1, WS(5, 6) + .2)), win = ease(ramp(t, WS(5, 8) - .1, WS(5, 10)));
  let s = `<defs>${ARDEFS()}<clipPath id="arL1"><rect x="0" y="440" width="720" height="380"/></clipPath><clipPath id="arL2"><rect x="0" y="840" width="720" height="380"/></clipPath></defs><rect x="-20" y="-20" width="760" height="1320" fill="#1a2a3a"/>`;
  const lane = (y0, id, four, spd, pal) => { const SY = y0 + 90, x = -220 + T * spd;
    let g = `<g clip-path="url(#${id})"><rect x="-20" y="${y0}" width="760" height="380" fill="url(#arWater)"/><rect x="-20" y="${y0}" width="760" height="90" fill="#bfe6f4" opacity=".55"/>`;
    g += `<path d="M-20,${SY} ` + Array.from({ length: 19 }, (_, i) => `Q${i * 40},${b1(SY - 6 + Math.sin(T * 3 + i) * 3)} ${i * 40 + 20},${SY}`).join(' ') + ` V${y0 + 380} H-20Z" fill="url(#arWater)"/>`;
    for (let i = 0; i < 14; i++) { const cx = pmod(i * 67 + T * 20, 780) - 30, cy = SY + 60 + (i * 41) % 220; g += `<path d="M${b1(cx)},${b1(cy)} q20,-10 40,0 q-16,14 -40,0" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`; }
    g += `<rect x="-20" y="${y0 + 340}" width="760" height="40" fill="#3a8ab0"/>` + Array.from({ length: 13 }, (_, i) => `<path d="M${i * 60 - 20},${y0 + 340} V${y0 + 380}" stroke="#2a6a90" stroke-width="2"/>`).join('') + `<rect x="-20" y="${y0 + 352}" width="760" height="10" fill="#1a3a5a" opacity=".7"/>`;
    g += Array.from({ length: 24 }, (_, i) => `<ellipse cx="${i * 32}" cy="${SY - 2}" rx="12" ry="7" fill="${i % 4 < 2 ? '#e84a3a' : '#f4f4f4'}"/>`).join('');
    g += swim4(x, SY + 58, 1.08, t, four, { kr: 3.4 * (four ? 1.05 : 1), pal: pal });
    // push arrows: water pushed back by the hands
    if (pu > 0) { const H = four ? [HP.hand, HP.handB, HP.hand2, HP.handB2] : [HP.hand, HP.handB]; H.forEach(([hx, hy]) => { if (hy < SY + 10) return; g += `<path d="M${b1(hx - 10)},${b1(hy)} h-50 m14,-10 l-14,10 l14,10" stroke="#f4c76b" stroke-width="4" fill="none" opacity="${b1(.85 * pu)}"/>`; }); }
    g += `<rect x="690" y="${y0 + 90}" width="30" height="290" fill="#e8e4dc"/><rect x="690" y="${y0 + 90}" width="8" height="290" fill="#000" opacity=".15"/>`;
    return g + `</g>`; };
  s += lane(440, 'arL1', 0, 128, { top: '#e8a030', pants: '#2a3a8a', skin: '#c8946e', hair: '#2a1e16' }) + lane(840, 'arL2', 1, 168, { top: '#e85a2a', pants: '#1a1a3a', skin: '#c89070', hair: '#2a1e18' });
  s += `<rect x="-20" y="820" width="760" height="20" fill="#1a2a3a"/>` + AL(600, 500, 'ذراعان', 1, '#fff', 30) + AL(590, 900, 'أربعُ أذرع', 1, '#f4c76b', 32);
  if (win > 0) s += `<g opacity="${b1(win)}">${panel(380, 1150, 320, 52)}${AL(540, 1186, 'رقمٌ قياسيٌّ جديد؟', 1, '#f4c76b', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the twist: no land vertebrate has more than four limbs, all inherited from a fish ~370 million years ago ----------
function lizard(x, y, s, t) { const w = Math.sin(t * 5) * .2;
  const leg = (lx, ly, a, far) => `<path d="M${lx},${ly} l${b1(Math.sin(a) * 18)},14 l${b1(Math.sin(a) * 6 + 6)},14" stroke="${far ? '#3a5a2a' : '#5a8a3a'}" stroke-width="${far ? 6 : 7}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="30" rx="80" ry="7" fill="#000" opacity=".25" filter="url(#blur2)"/>` + leg(-26, 6, -w, 1) + leg(30, 6, w, 1) +
    `<path d="M-40,2 Q-100,8 -150,22 Q-100,16 -40,14Z" fill="#4a7a34"/><path d="M-44,0 Q-10,-16 34,-6 Q56,-10 70,-2 Q76,6 62,10 Q40,14 30,12 Q-10,20 -44,14Z" fill="#5a8a3a"/><path d="M-44,10 Q-10,20 30,12" stroke="#c8d89a" stroke-width="4" fill="none" opacity=".7"/>` +
    Array.from({ length: 9 }, (_, i) => `<circle cx="${-36 + i * 9}" cy="${-4 + (i % 2) * 4}" r="2.2" fill="#2e5a22" opacity=".7"/>`).join('') + `<circle cx="58" cy="-2" r="2.6" fill="#1a1a0a"/>` + leg(-20, 10, w, 0) + leg(36, 10, -w, 0) + `</g>`; }
function badge4(x, y, a, n = '٤') { if (a <= 0) return ''; const k = .6 + .4 * Math.min(1, a * 1.4);
  return `<g transform="translate(${b1(x)},${b1(y)}) scale(${b1(k * 100) / 100})" opacity="${b1(clamp(a * 1.5))}"><circle r="26" fill="#0a0e1c" opacity=".85"/><circle r="26" fill="none" stroke="#f4c76b" stroke-width="3"/><text y="12" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#f4c76b">${n}</text></g>`; }
function shotLineup(t) {
  const st = S0(6) - .2, T = t - st, ts = [0, 1, 2, 3, 4, 5].map(i => lerp(WS(6, 1), WS(6, 11), i / 5));
  let s = studio('stE', '#2e3a54', '#090d18', 15);
  const C = [[30, 410], [255, 410], [480, 410], [30, 800], [255, 800], [480, 800]], W = 210, H = 320;
  const art = [cx => lizard(cx, 660, 1.15, t), cx => frog(cx, 670, .9), cx => hero(cx, 680, Object.assign({ s: .8, face: -1, shade: 1, lookUp: .05 }, gp(4))),
    cx => quad(cx - 10, 1060, 1.45, { kind: 'dog', face: 1, phase: 0 }), cx => `<g transform="translate(${cx},1056) scale(5.2)">${pigeon(0, 0, 1, t, 3)}</g>`, cx => quad(cx, 1060, 2.6, { kind: 'cat', face: -1, phase: 0 })];
  const nm = ['سحلية', 'ضفدع', 'إنسان', 'كلب', 'حمامة', 'قطّ'];
  C.forEach(([cx0, cy0], i) => { const a = ease(ramp(t, ts[i] - .35, ts[i] + .15)); if (a <= 0) return; const cx = cx0 + W / 2, gy = cy0 + H - 60;
    s += `<g opacity="${b1(a)}"><defs><clipPath id="arCd${i}"><rect x="${cx0}" y="${cy0}" width="${W}" height="${H}" rx="18"/></clipPath></defs><g clip-path="url(#arCd${i})"><rect x="${cx0}" y="${cy0}" width="${W}" height="${H}" fill="url(#bkFarmSky)"/>` +
      `<rect x="${cx0}" y="${gy - 40}" width="${W}" height="100" fill="#8aa05a"/><rect x="${cx0}" y="${gy - 40}" width="${W}" height="100" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="${cx0}" y="${gy - 44}" width="${W}" height="8" fill="#6a8a4a" opacity=".6"/>` + art[i](cx) + `</g>` +
      `<rect x="${cx0}" y="${cy0}" width="${W}" height="${H}" rx="18" fill="none" stroke="#f4c76b" stroke-width="3" opacity=".8"/>` + AL(cx, cy0 + H + 34, nm[i], 1, '#fff', 26) + `</g>` + badge4(cx0 + W - 30, cy0 + 30, ease(ramp(t, ts[i] - .1, ts[i] + .3))); });
  const ok = ease(ramp(t, WS(6, 8) - .2, WS(6, 11)));
  s += `<g opacity="${b1(ok)}">${panel(130, 1190, 460, 64)}${AL(360, 1234, 'لا أكثرَ من ٤ أطراف', 1, '#f4c76b', 34)}</g>`;
  return s;
}
function tiktaalik(x, y, s, t, gl) {
  const w = Math.sin(t * 2.2), fin = (fx, fy, a, far, L = 46) => { const ex = fx + Math.sin(a) * L, ey = fy + Math.cos(a) * L * .6;
    return `<path d="M${fx},${fy} Q${b1((fx + ex) / 2 + 8)},${b1((fy + ey) / 2 - 6)} ${b1(ex)},${b1(ey)} Q${b1(ex - 10)},${b1(ey + 10)} ${b1(ex - 24)},${b1(ey + 2)} Q${b1((fx + ex) / 2 - 6)},${b1((fy + ey) / 2 + 8)} ${fx - 6},${fy + 8}Z" fill="${far ? '#4a5a3a' : '#7a7a52'}"/>` +
      (gl > 0 ? `<path d="M${fx},${fy} Q${b1((fx + ex) / 2 + 8)},${b1((fy + ey) / 2 - 6)} ${b1(ex)},${b1(ey)} Q${b1(ex - 10)},${b1(ey + 10)} ${b1(ex - 24)},${b1(ey + 2)} Q${b1((fx + ex) / 2 - 6)},${b1((fy + ey) / 2 + 8)} ${fx - 6},${fy + 8}Z" fill="#ffd36a" opacity="${b1(gl * (.7 + .2 * Math.sin(t * 6)))}" stroke="#fff3c0" stroke-width="3"/>` : '') +
      Array.from({ length: 4 }, (_, k) => `<path d="M${b1(ex - 4 - k * 6)},${b1(ey + 2)} l-4,8" stroke="#3a3a2a" stroke-width="1.6" opacity=".6"/>`).join(''); };
  let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="40" rx="190" ry="14" fill="#000" opacity=".3" filter="url(#blur5)"/>`;
  g += fin(30, 14, 1.2 + .3 * w, 1, 62) + fin(-80, 18, 1.4 - .3 * w, 1, 50);
  const body = `M120,-8 Q150,-16 176,-2 Q186,8 172,14 Q140,22 110,18 Q40,30 -60,22 Q-140,16 -200,${b1(4 + 8 * w)} Q-240,${b1(-6 + 10 * w)} -262,${b1(-20 + 14 * w)} Q-236,${b1(10 + 10 * w)} -196,${b1(18 + 6 * w)} Q-130,34 -60,30 Q40,36 110,26`;
  g += `<path d="M120,-8 Q60,-34 -20,-30 Q-120,-24 -200,${b1(-2 + 8 * w)} Q-236,${b1(-8 + 12 * w)} -262,${b1(-20 + 14 * w)} Q-236,${b1(10 + 10 * w)} -196,${b1(20 + 6 * w)} Q-130,34 -60,30 Q40,36 110,26 Q150,24 176,8 Q186,0 170,-6 Q146,-14 120,-8Z" fill="url(#arFish)"/>`;
  g += `<g opacity=".5">` + Array.from({ length: 60 }, (_, i) => { const cx = -190 + (i % 15) * 20 + ((i / 15 | 0) % 2) * 10, cy = -18 + (i / 15 | 0) * 11; return `<path d="M${cx},${cy} q6,6 0,10" stroke="#3a4a2a" stroke-width="1.4" fill="none"/>`; }).join('') + `</g>`;
  g += `<path d="M-200,${b1(-2 + 8 * w)} Q-230,${b1(-40 + 12 * w)} -262,${b1(-20 + 14 * w)}" fill="#6a7a4a" stroke="#4a5a3a" stroke-width="2"/><path d="M-60,-26 Q-100,-40 -150,-18" fill="#6a7a4a"/>`;
  g += `<path d="M100,-14 Q130,-30 150,-12" stroke="#3a4a2a" stroke-width="2" fill="none" opacity=".6"/><ellipse cx="132" cy="-14" rx="7" ry="5" fill="#e8d8a0"/><circle cx="134" cy="-15" r="3.4" fill="#120c06"/><path d="M150,8 Q166,8 178,4" stroke="#3a2a1a" stroke-width="2" fill="none"/><path d="M80,-20 Q84,0 80,22" stroke="#3a4a2a" stroke-width="2" fill="none" opacity=".5"/>`;
  g += `<path d="M-60,22 Q40,30 110,18" stroke="#e8e0b8" stroke-width="5" fill="none" opacity=".35"/>`;
  g += fin(40, 22, .9 - .3 * w, 0, 66) + fin(-70, 26, 1.1 + .3 * w, 0, 54);
  return g + `</g>`;
}
function shotDevon(t) {
  const st = WS(6, 12) - .3, T = t - st, gl = ease(ramp(t, WS(6, 13) - .2, WS(6, 14) + .2)), dt = ease(ramp(t, WS(6, 17) - .2, WS(6, 19)));
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#arDevSky)"/>` + sun3(560, 600, .75) + cumulus(240 + T * 4, 560, 260, 81, { a: .5 });
  s += mountainsR(780, 140, 83, { rock: '#6a6a72' }) + `<rect x="-20" y="760" width="760" height="40" fill="#d8d0b8" opacity=".3"/>`;
  s += `<rect x="-20" y="790" width="760" height="510" fill="url(#arSea)"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${-20 + (i * 97) % 740},${820 + i * 18} q30,-6 60,0" stroke="#fff" stroke-width="2" fill="none" opacity=".25"/>`).join('');
  // the muddy shore with early plants (no flowers, no grass yet)
  s += `<path d="M-20,1300 L-20,1010 Q200,960 380,990 Q560,1010 740,960 V1300Z" fill="url(#arMud)"/><path d="M-20,1300 L-20,1010 Q200,960 380,990 Q560,1010 740,960 V1300Z" fill="#000" filter="url(#arTex)" opacity=".6"/><path d="M-20,1010 Q200,960 380,990 Q560,1010 740,960" stroke="#c8b888" stroke-width="5" fill="none" opacity=".5"/>`;
  const plant = (px, py, h, sd) => { const r = RS(sd); let g = ''; for (let k = 0; k < 7; k++) { const a = (r() - .5) * .8, hh = h * (.6 + .4 * r()); g += `<path d="M${px},${py} q${b1(a * 40)},${b1(-hh * .5)} ${b1(a * 70)},${b1(-hh)}" stroke="#3a6a2a" stroke-width="4" fill="none"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${b1(px + a * 70 * q / 6)},${b1(py - hh * q / 6)} l-8,-6 M${b1(px + a * 70 * q / 6)},${b1(py - hh * q / 6)} l8,-6" stroke="#4a7a34" stroke-width="2"/>`).join(''); } return g; };
  s += plant(600, 990, 160, 85) + plant(680, 970, 130, 86) + plant(70, 1000, 120, 87);
  s += tiktaalik(350, 1080, 1.5, t, gl);
  if (gl > 0) s += `<g opacity="${b1(gl)}">${panel(150, 1180, 420, 64)}${AL(360, 1224, '٤ زعانف ⟵ ٤ أطراف', 1, '#f4c76b', 34)}</g>`;
  if (dt > 0) s += `<g opacity="${b1(dt)}">${panel(150, 430, 420, 70)}${AL(360, 476, 'قبلَ نحوِ ٣٧٠ مليونَ سنة', 1, '#fff', 32)}</g>`;
  return s;
}
function sceneTwist(t) { let s = `<defs>${ARDEFS()}${BKFS}</defs>` + subs(t, [[S0(6) - .2, shotLineup], [WS(6, 12) - .3, shotDevon]]); noEarth(); F.ov = ''; return s; }
const BKFS = `<linearGradient id="bkFarmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86c8"/><stop offset=".6" stop-color="#a8cbe6"/><stop offset="1" stop-color="#f2e2be"/></linearGradient>`;
// ---------- 7: wings of birds and bats are changed arms; insects have six legs ----------
const BC = ['#f4c76b', '#7ac8ff', '#ff8a7a'];
function boneArm(x, y, kind, a) {
  // humerus (gold), radius + ulna (blue), hand / finger bones (red), drawn from the shoulder at (x, y) to the right
  let g = `<g transform="translate(${x},${y})" opacity="${b1(a)}">`;
  const bone = (x0, y0, x1, y1, w, c) => `<path d="M${x0},${y0} L${x1},${y1}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/><circle cx="${x0}" cy="${y0}" r="${w * .75}" fill="${c}"/><circle cx="${x1}" cy="${y1}" r="${w * .75}" fill="${c}"/>`;
  if (kind === 0) { g += bone(0, 0, 110, 30, 12, BC[0]) + bone(116, 28, 214, 10, 7, BC[1]) + bone(116, 36, 214, 20, 6, BC[1]) + [0, 1, 2, 3, 4].map(k => bone(226, 14, 262 + k * 4, -6 + k * 10, 4, BC[2]) + bone(262 + k * 4, -6 + k * 10, 288 + k * 3, -14 + k * 14, 3, BC[2])).join(''); }
  if (kind === 1) { g += bone(0, 0, 80, 30, 12, BC[0]) + bone(86, 28, 180, -4, 7, BC[1]) + bone(86, 36, 180, 4, 5, BC[1]) + bone(192, -2, 240, -10, 6, BC[2]) + bone(240, -10, 272, -14, 4, BC[2]) + bone(196, 6, 222, 10, 3, BC[2]);
    g += Array.from({ length: 9 }, (_, k) => `<path d="M${120 + k * 18},${-6 - k * .5} q${30 + k * 4},${-30 - k} ${60 + k * 8},${-36 - k * 2}" stroke="#e8e0d0" stroke-width="3" fill="none" opacity=".35"/>`).join(''); }
  if (kind === 2) { g += `<path d="M0,0 L80,30 L170,0 L250,-40 L300,-10 L310,40 L250,70 L170,90 L120,80 L60,60Z" fill="#6a5a50" opacity=".45"/>` + bone(0, 0, 80, 30, 11, BC[0]) + bone(84, 30, 170, 0, 7, BC[1]) + [[250, -40], [300, -10], [310, 40], [250, 70]].map(([fx, fy]) => bone(176, 2, fx, fy, 3.5, BC[2])).join('') + bone(176, 2, 192, -18, 3, BC[2]); }
  return g + `</g>`;
}
function shotBones(t) {
  const st = S0(7) - .2, T = t - st, a = [WS(7, 0), WS(7, 1) + .2, WS(7, 3)].map(w => ease(ramp(t, w - .2, w + .3))), md = ease(ramp(t, WS(7, 4) - .2, WS(7, 5)));
  let s = studio('stC', '#2e3a54', '#090d18', 12);
  const R = [[0, 'ذراعُ الإنسان', 500], [1, 'جناحُ الطائر', 760], [2, 'جناحُ الخفّاش', 1030]];
  R.forEach(([k, tx, y], i) => { if (a[i] <= 0) return; s += `<g opacity="${b1(a[i])}"><rect x="30" y="${y - 120}" width="660" height="220" rx="20" fill="#0a0e1c" opacity=".65"/><rect x="30" y="${y - 120}" width="660" height="220" rx="20" fill="none" stroke="#f4c76b" stroke-width="2" opacity=".5"/>` + AL(560, y - 78, tx, 1, '#fff', 30) + `</g>`;
    if (k === 0) s += `<g opacity="${b1(a[i] * .5)}"><path d="M150,${y + 8} Q260,${y + 46} 330,${y + 40} Q410,${y + 30} 440,${y + 20} Q456,${y + 4} 440,${y - 6} Q400,${y + 10} 330,${y + 12} Q250,${y + 10} 150,${y - 24}Z" fill="#c89070"/></g>`;
    if (k === 1) s += `<g opacity="${b1(a[i] * .55)}"><path d="M150,${y} Q250,${y + 34} 330,${y - 8} Q420,${y - 50} 480,${y - 30} Q440,${y + 10} 470,${y + 40} Q400,${y + 30} 380,${y + 60} Q320,${y + 50} 290,${y + 70} Q220,${y + 50} 150,${y + 40}Z" fill="#8a8c96"/></g>`;
    s += boneArm(150, y, k, a[i]); });
  s += `<g opacity="${b1(md)}">${AL(360, 1236, 'العظامُ نفسُها، بأشكالٍ مختلفة', 1, '#f4c76b', 30)}</g>`;
  // the colour key: same bones in all three
  s += `<g opacity="${b1(a[0])}">` + [['العضد', 0], ['الساعد', 1], ['اليد', 2]].map(([tx, i]) => `<circle cx="${560 - i * 170}" cy="1172" r="10" fill="${BC[i]}"/>` + AL(515 - i * 170, 1181, tx, 1, '#fff', 24)).join('') + `</g>`;
  return s;
}
// an ant seen from above: head, thorax with the six legs, waist, abdomen
function antTop(x, y, sc, t) {
  const F = [], leg = (rx, ry, side, i) => { const ph = t * 7 + i * 2.1 + (side > 0 ? 0 : Math.PI), sw = Math.sin(ph) * 6, ang = [-.9, 0, .85][i], L1 = 46, L2 = 58;
    const kx = rx + Math.sin(ang) * L1 * .6 + sw * .4, ky = ry + side * L1, fx = kx + Math.sin(ang) * L2 + sw, fy = ky + side * L2 * .7;
    F.push([x + fx * sc, y + fy * sc]);
    return `<path d="M${rx},${ry} L${b1(kx)},${b1(ky)} L${b1(fx)},${b1(fy)}" stroke="#1a0e08" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${rx},${ry} L${b1(kx)},${b1(ky)}" stroke="#7a4a2a" stroke-width="2" fill="none" opacity=".6"/>`; };
  let g = `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="-10" cy="10" rx="150" ry="70" fill="#000" opacity=".3" filter="url(#blur9)"/>`;
  [-1, 1].forEach(side => { [[-6, 0], [6, 1], [18, 2]].forEach(([rx, i]) => { g += leg(rx, side * 8, side, i); }); });
  g += `<ellipse cx="-78" cy="0" rx="44" ry="32" fill="url(#arAnt)"/>` + [0, 1, 2].map(q => `<path d="M${-104 + q * 18},-28 q-6,28 0,56" stroke="#2a140a" stroke-width="2" fill="none" opacity=".6"/>`).join('') + `<ellipse cx="-86" cy="-12" rx="22" ry="8" fill="#fff" opacity=".2"/>`;
  g += `<ellipse cx="-28" cy="0" rx="8" ry="7" fill="url(#arAnt)"/><ellipse cx="6" cy="0" rx="28" ry="15" fill="url(#arAnt)"/><ellipse cx="2" cy="-6" rx="14" ry="4" fill="#fff" opacity=".2"/>`;
  g += `<ellipse cx="54" cy="0" rx="22" ry="21" fill="url(#arAnt)"/><ellipse cx="66" cy="-12" rx="5" ry="6" fill="#0a0504"/><ellipse cx="66" cy="12" rx="5" ry="6" fill="#0a0504"/><path d="M74,-6 q12,-4 14,4 M74,6 q12,4 14,-4" stroke="#3a1c10" stroke-width="5" fill="none"/>`;
  const aw = Math.sin(t * 4) * 6; g += `<path d="M62,-16 L82,-44 Q104,${b1(-58 + aw)} 124,${b1(-48 + aw)} M62,16 L82,44 Q104,${b1(58 - aw)} 124,${b1(48 - aw)}" stroke="#1a0e08" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  return [g + `</g>`, F];
}
function shotInsect(t) {
  const st = WS(7, 6) - .25, T = t - st, n = Math.floor(clamp(ramp(t, WS(7, 8) - .2, WS(7, 10) - .1)) * 6.99);
  let s = `<radialGradient id="arAnt" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#8a4a2a"/><stop offset=".5" stop-color="#4a2414"/><stop offset="1" stop-color="#1a0a06"/></radialGradient>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#8a7454"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#arTex)" opacity=".7"/>`;
  const r = RS(91); for (let i = 0; i < 40; i++) { const px = r() * 720, py = 420 + r() * 860, rr = 4 + r() * 10; s += `<ellipse cx="${b1(px + 2)}" cy="${b1(py + 3)}" rx="${b1(rr)}" ry="${b1(rr * .7)}" fill="#000" opacity=".25"/><ellipse cx="${b1(px)}" cy="${b1(py)}" rx="${b1(rr)}" ry="${b1(rr * .7)}" fill="${['#a8946e', '#c8b48a', '#7a6a4e'][i % 3]}"/>`; }
  s += `<path d="M560,1280 Q600,1080 760,980" stroke="#3a6a2a" stroke-width="12" fill="none"/><path d="M640,1100 q90,-60 140,-20 q-70,40 -140,20Z" fill="#5a9a3a"/>`;
  const [ant, FT] = antTop(330 + T * 14, 830, 2.3, t);
  s += ant;
  const ord = [0, 1, 2, 5, 4, 3];
  for (let k = 0; k < n; k++) { const [fx, fy] = FT[ord[k]]; s += badge4(fx + (fy < 830 ? 0 : 0), fy + (fy < 830 ? -34 : 34), 1, AR(k + 1)); }
  if (n >= 6) s += `<g>${panel(170, 1150, 380, 70)}${AL(360, 1198, 'الحشرات: ٦ أرجل', 1, '#f4c76b', 36)}</g>`;
  return s;
}
function sceneWings(t) { let s = `<defs>${ARDEFS()}</defs>` + subs(t, [[S0(7) - .2, shotBones], [WS(7, 6) - .25, shotInsect]]); noEarth(); F.ov = ''; return s; }
// ---------- 8: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(8)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 7) - .3, WS(8, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSkills }, { s: S0(2) - .2, f: sceneBrain }, { s: S0(3) - .2, f: sceneBody }, { s: S0(4) - .2, f: sceneWorld },
  { s: S0(5) - .2, f: sceneSwim }, { s: S0(6) - .2, f: sceneTwist }, { s: S0(7) - .2, f: sceneWings }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneBrain, sceneBody, sceneSwim, sceneWings]);
const XF = .5;
const TLI = [['الدماغ', S0(2)], ['الوزن والقلب', S0(3)], ['الملابس', S0(4)], ['السباحة', S0(5)]];
const LIST_ON = new Set([sceneWorld]);
const CHIPS = [
  ['c0', 'أربعُ أذرع', 360, 330, 'red big', WS(0, 4), S0(1) - .3],
  ['c1', 'أربعُ أيدٍ معاً', 360, 330, 'big', WS(1, 2), S0(2) - .3],
  ['c2', 'دماغٌ يتغيّر', 360, 330, 'big', WS(2, 2), S0(3) - .3],
  ['c3', '+١٠٪ من الوزن', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c4', 'صُمِّمَ لذراعَين', 360, 330, 'big', WS(4, 2), S0(5) - .3],
  ['c5', 'الدفعُ من الذراعَين', 360, 330, 'big', WS(5, 2), S0(6) - .3],
  ['c6', 'المفاجأة', 360, 330, 'red big', WS(6, 0), S0(7) - .3],
  ['c7', 'أذرعٌ معدَّلة', 360, 330, 'big', WS(7, 4), S0(8) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بأربعِ أذرع</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
