// ---------- three.js camera helpers (world units: Earth radius 1), as in Short #27 ----------
const orbit = (d, el, az, tg = [0, .3, 0], fov = 30) => ({ pos: [tg[0] + d * Math.sin(az) * Math.cos(el), tg[1] + d * Math.sin(el), tg[2] + d * Math.cos(az) * Math.cos(el)], look: tg, fov });
function proj3(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 640 / Math.tan(c.fov * Math.PI / 360);
  return [360 + dot(d, r) / z * fp, 640 - dot(d, u) / z * fp, fp / z]; }
// a point on the three.js globe (same mapping as gl3d_world: north pole up, spin about the axis)
function geo3(lat, lon, spin, h = 1) { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180, x = Math.cos(la) * Math.sin(lo), y = -Math.cos(la) * Math.cos(lo), z = Math.sin(la), c = Math.cos(spin), s = Math.sin(spin);
  return [(x * c - y * s) * h, z * h, -(x * s + y * c) * h]; }
const beam = (x0, y0, x1, y1, a, w = 1, fl = 1) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}" stroke-linecap="round" fill="none"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ff3a1e" stroke-width="${(18 * w).toFixed(1)}" opacity="${(.4 * fl).toFixed(2)}" filter="url(#blurU)"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ff6a3a" stroke-width="${(6.5 * w).toFixed(1)}" opacity=".9"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#fff6dc" stroke-width="${(2.4 * w).toFixed(1)}"/></g>`;
const BDEF = `<filter id="blurU" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1900"><feGaussianBlur stdDeviation="5"/></filter>`;

const ST0 = { trees: [[100, 300, 3], [664, 250, 5]], lamps: [28, 694] };
// ---------- 0: the hook. A street; one man lifts a car with one hand, one leaps to the roofs, one has burning eyes ----------
function liftRig(t, kL, o = {}) {
  const HX = 400, HY = 1098, S = .62, cr = 1 - ease(ramp(kL, .04, .62));
  const cx = lerp(456, HX + 6, kL), cyB = lerp(1150, 872 + (o.dip || 0), kL) - Math.sin(kL * Math.PI) * 34, ang = -15 * Math.sin(kL * Math.PI) - 4 * kL + Math.sin(t * 2.1) * 1.1 * kL;
  const hs = hero(HX, HY, { s: S, face: 1, lF: [.16 + .85 * cr, .1 - .8 * cr], lB: [-.2 + .95 * cr, -.16 - .62 * cr], lean: 50 * cr, hF: [cx - 6, cyB - lerp(48, 14, ease(ramp(kL, .3, .75)))], aB: [-.5, .8], lookUp: .45 * kL });
  const sh = `<ellipse cx="${cx.toFixed(1)}" cy="${lerp(1152, 1110, kL).toFixed(1)}" rx="${lerp(98, 74, kL).toFixed(1)}" ry="${lerp(7, 9, kL).toFixed(1)}" fill="#000" opacity="${lerp(.32, .2, kL).toFixed(2)}" filter="url(#blur2)"/>`;
  return { svg: sh + castSh(HX, HY, S) + hs + `<g transform="rotate(${ang.toFixed(2)},${cx.toFixed(1)},${(cyB - 14).toFixed(1)})">` + carNS(cx, cyB, .8, '#d8d8dc', -1) + `</g>`, cx, cyB };
}
function leaper(t, x0, tJ) {
  const c = pal(2), S = .52, g = 653, v0 = 783, u = t - tJ, tLd = 2 * v0 / g, GY = 1092;
  if (u < 0) { const cr = ease(ramp(u, -.42, -.06)); return castSh(x0, GY, S) + hero(x0, GY, Object.assign({ s: S, face: 1, lF: [.1 + .9 * cr, .06 - .85 * cr], lB: [-.1 + .9 * cr, -.14 - .7 * cr], aF: [.05 - .9 * cr, .3 - .6 * cr], aB: [-.05 - .9 * cr, .25 - .6 * cr], lean: 22 * cr, lookUp: 1 - cr }, c)); }
  const uu = Math.min(u, tLd), h = v0 * uu - .5 * g * uu * uu, v = v0 - g * uu, kd = ease(ramp(uu, tLd * .38, tLd * .62)), cr2 = u > tLd ? 1 - ease(ramp(u, tLd, tLd + .45)) : 0, L = (a, b) => [lerp(a[0], b[0], kd), lerp(a[1], b[1], kd)];
  let s = `<ellipse cx="${x0 + 4}" cy="${GY + 2}" rx="${(23 * (1 - .6 * h / 480)).toFixed(1)}" ry="4" fill="#000" opacity="${(.3 * (1 - .6 * h / 480)).toFixed(2)}" filter="url(#blur2)"/>`;
  if (u < tLd && Math.abs(v) > 120) { const len = Math.abs(v) * .16, sg = v > 0 ? 1 : -1, yy = GY - h - (sg > 0 ? 20 : 150); s += `<path d="M${x0 + 2},${yy} L${x0 + 2},${yy + sg * len}" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity="${(.3 * Math.abs(v) / v0).toFixed(2)}" filter="url(#blurU)"/>`; }
  s += u > tLd ? hero(x0, GY, Object.assign({ s: S, face: 1, lF: [.1 + 1.0 * cr2, .06 - .9 * cr2], lB: [-.1 + .9 * cr2, -.14 - .9 * cr2], aF: [.05 + .5 * cr2, .3], aB: [-.05 - .7 * cr2, .25 - .4 * cr2], lean: 24 * cr2, noShadow: 1 }, c))
    : hero(x0, GY - h, Object.assign({ s: S, face: 1, air: 1, noShadow: 1, lF: L([.1, -.05], [.62, -.42]), lB: L([-.22, -.5], [.15, -.95]), aF: L([2.9, 3.05], [2.1, 2.6]), aB: L([2.6, 2.8], [-2.0, -2.5]), lookUp: .7 * (1 - kd) }, c));
  const pu = clamp(u / .7), pl = clamp((u - tLd) / .7);
  return s + puff(x0 - 24 - pu * 26, GY - 4, 10 + pu * 22, (1 - pu) * .9) + puff(x0 + 30 + pu * 26, GY - 4, 9 + pu * 20, (1 - pu) * .8) + (u > tLd ? puff(x0 - 30 - pl * 30, GY - 4, 12 + pl * 24, (1 - pl) * .9) + puff(x0 + 34 + pl * 30, GY - 4, 11 + pl * 22, (1 - pl) * .8) : '');
}
function lasereye(t, x, tE) {
  const g = ease(ramp(t, tE, tE + .25)), S = .55;
  const s = castSh(x, 1088, S) + hero(x, 1088, Object.assign({ s: S, face: 1, glow: g, lookUp: .7 * g, aF: [.05 + .5 * g, .3 + .9 * g], aB: [-.05 - .3 * g, .25] }, pal(1))), e = HP.eye, k = ease(ramp(t, tE + .1, tE + .45));
  return s + beam(e[0], e[1], e[0] + 300 * k, e[1] - 470 * k, g, .8, .85 + .15 * Math.sin(t * 50)) + `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="${(16 * g).toFixed(1)}" fill="url(#redG)" opacity="${(.9 * g).toFixed(2)}"/>`;
}
function sceneHook(t) {
  const kL = ease(ramp(t, .12, .95)), tJ = WS(0, 4) - .2, tE = WS(0, 6) - .15, tX = WS(0, 7) + .1;
  let s = `<defs>${BDEF}</defs>` + streetS(t, Object.assign({ id: 'h', cars: 0 }, ST0)) + car(pmod(-170 + t * 80, 1100) - 180, 1256, .9, '#a83a2a', 1, 0);
  const wx = Math.min(52 + t * 26, 92);
  s += castSh(wx, 1086, .5) + onWalk(wx, 1086, CROWD[0], .5, 1, t, { moving: wx < 92 ? 1 : 0, phase: t * 6, amp: .7, lookUp: ease(ramp(t, 1.4, 1.9)) });
  s += leaper(t, 208, tJ) + lasereye(t, 552, tE);
  const L = liftRig(t, kL);
  s += L.svg + ring(L.cx, L.cyB - 50, clamp((t - .8) / 1.3)) + sparkles(404, 950, 250, 330, 16, t, kL * .9, 3);
  F.flash = .28 * clamp(1 - Math.abs(t - tX) / .22);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: closer. One hand holds 1.5 tonnes; the weight still goes through the body into the ground ----------
function sceneLift(t) {
  const st = S0(1) - .2, T = t - st, dipK = Math.sin(Math.PI * clamp((t - (st + .3)) / 1.3)), k = 1.6 + .1 * ease(clamp(T / 5));
  let w = streetS(t, Object.assign({ id: 'l', cars: 0 }, ST0)) + car(pmod(-170 + t * 80, 1100) - 180, 1256, .9, '#a83a2a', 1, 0) + castSh(92, 1086, .5) + onWalk(92, 1086, CROWD[0], .5, 1, t, { lookUp: 1 });
  const L = liftRig(t, 1, { dip: 46 * dipK });
  w += L.svg + sparkles(404, 950, 230, 300, 12, t, .7, 3);
  let s = zoomG(w, k, 404, 1098, 300, 1140);
  const X = wx => 300 + (wx - 404) * k, Y = wy => 1140 + (wy - 1098) * k;
  const a1 = ease(ramp(t, WS(1, 1) - .1, WS(1, 1) + .3)), ty = Y(L.cyB - 104) - 10;
  s += `<g opacity="${a1.toFixed(2)}">` + panel(X(L.cx) - 112, ty - 60, 224, 62) + lbl(X(L.cx), ty - 17, '≈ ١٬٥٠٠ كغ', 1, '#f4c76b', 36) + `</g>`;
  const a2 = ease(ramp(t, WS(1, 4), WS(1, 4) + .35)), g2 = ease(ramp(t, WS(1, 4), WS(1, 4) + .7)), a3 = ease(ramp(t, WS(1, 5), WS(1, 5) + .35)), g3 = ease(ramp(t, WS(1, 5), WS(1, 5) + .7));
  s += arrow(X(404) - 104, Y(L.cyB) + 8, X(404) - 104, lerp(Y(L.cyB) + 60, 1128, g2), a2, '#ff6b5a', 7) + lbl(X(404) - 200, 930, 'وزنُ السيّارة', a2, '#ffc2b8', 27) +
    arrow(X(404) + 112, 1140, X(404) + 112, lerp(1100, 960, g3), a3, '#f4c76b', 7) + lbl(X(404) + 214, 1046, 'ردُّ فعلِ الأرض', a3, '#ffe4a0', 27);
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: push a wall with super force: the wall pushes back just as hard (Newton's third law) and you fly backwards ----------
function brickWall(k) {
  const x1 = 214, top = 404, base = 1128, hx = x1 + 13, hy = 884, r = RS(44);
  let s = `<path d="M${x1 + 24},${base - 2} L${x1 + 330},${base + 22} L${x1 + 330},${base + 62} L${x1 + 24},${base + 14}Z" fill="#000" opacity=".2" filter="url(#blur2)"/>` +
    `<rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#a65d44"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="url(#brkL)"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#000" filter="url(#stainD)" opacity=".22"/>` +
    `<rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="url(#sunSide)"/>` +
    `<rect x="${x1}" y="${top}" width="26" height="${base - top}" fill="#6a3626"/><rect x="${x1}" y="${top}" width="26" height="${base - top}" fill="url(#brkL)" opacity=".7"/><rect x="${x1}" y="${top}" width="5" height="${base - top}" fill="#fff" opacity=".1"/>` +
    `<rect x="-30" y="${base - 34}" width="${x1 + 30}" height="34" fill="#8f877a"/><rect x="-30" y="${base - 34}" width="${x1 + 30}" height="5" fill="#fff" opacity=".22"/><rect x="${x1}" y="${base - 34}" width="26" height="34" fill="#59534b"/>` +
    `<rect x="-30" y="${top - 18}" width="${x1 + 64}" height="20" rx="3" fill="#d2c9b9"/><rect x="${x1}" y="${top - 18}" width="34" height="20" rx="3" fill="#000" opacity=".25"/><rect x="-30" y="${top + 2}" width="${x1 + 58}" height="6" fill="#000" opacity=".3"/>` +
    `<rect x="-30" y="${base - 12}" width="${x1 + 56}" height="12" fill="url(#aoUp)" opacity=".8"/>`;
  if (k > 0) { let c = ''; const jl = (px, off) => Math.floor((px - 4 - off) / 34) * 34 + off;
    for (let i = 0; i < 6; i++) { const dir = i % 2 ? -1 : 1, n = Math.max(1, Math.round((2 + r() * 6) * k)); let li = Math.round((hy + dir * (6 + i * 9 + r() * 10) - .5) / 8.5), px = x1, d = `M${px},${(li * 8.5 + .5).toFixed(1)}`;
      for (let q = 0; q < n; q++) { const even = pmod(li, 2) === 0, dd = r() < .92 ? dir : -dir, off = dd > 0 ? (even ? 8 : 25) : (even ? 25 : 8); px = jl(px, off); if (px < -20) break; li += dd; d += ` H${px} V${(li * 8.5 + .5).toFixed(1)}`; }
      c += `<path d="${d}" stroke="#1e0d08" stroke-width="${(3.6 - i * .3).toFixed(1)}" fill="none"/><path d="${d}" stroke="#e9b99c" stroke-width="1" fill="none" opacity=".45" transform="translate(1.2,1.6)"/>`; }
    [[-34, -8], [-68, 9], [-34, 26], [0, 9]].forEach(([dx, dy], i) => { const bx = 190 + dx + (i % 2 ? 17 : 0), by = Math.round((hy + dy) / 8.5) * 8.5 + .5; c += `<rect x="${bx}" y="${by}" width="${i % 2 ? 17 : 24}" height="8.5" fill="#2a130c" opacity=".7"/>`; });
    s += `<g opacity="${clamp(k * 1.6).toFixed(2)}">${c}<rect x="${x1}" y="${hy - 30}" width="9" height="24" rx="3" fill="#1e0d08" opacity=".6"/><rect x="${x1}" y="${hy + 6}" width="9" height="24" rx="3" fill="#1e0d08" opacity=".6"/></g>`; }
  return s;
}
function scenePush(t) {
  const st = S0(2) - .2, T = t - st, tP = WS(2, 1), tF = WS(2, 8) + .05, GY = 1126, HX = 358, u = t - tF;
  const kp = ease(ramp(t, tP - .32, tP + .02)), strain = ease(ramp(t, WS(2, 3), WS(2, 3) + .5)), dmg = clamp(.55 * ease(ramp(t, WS(2, 3) + .1, WS(2, 4) + .4)) + .45 * ease(ramp(t, tF - .1, tF + .15)));
  let s = `<defs>${BDEF}</defs>` + zoomG(streetS(t, { id: 'p', cars: 0, trees: [[566, 268, 5]], lamps: [250, 694] }) + car(590, 1168, .95, '#d8d8dc', -1, 0), 1.55, 430, 1098, 400, GY) + `<rect width="720" height="1280" fill="#f2ead8" opacity=".1"/>` + brickWall(dmg);
  if (u < 0) {
    const wk = 1 - kp, x = HX + 70 * wk * (1 - ease(ramp(t, st, tP - .3))) + Math.sin(t * 57) * 1.3 * strain;
    hero(x, GY, { s: 1, face: -1, walk: t * 6, amp: .6 }); const h0 = HP.hand, h1 = HP.handB, m = (a, b) => [lerp(a[0], b[0], kp), lerp(a[1], b[1], kp)];
    const wl = (ph => { const a = Math.sin(ph) * .6, b = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - b]; });
    s += castSh(x, GY, 1) + hero(x, GY, { s: 1, face: -1, lF: m(wl(t * 6), [.62, -.2]), lB: m(wl(t * 6 + Math.PI), [-.5, -.42]), lean: 19 * kp + 3 * strain, hF: m(h0, [243, 868]), hB: m(h1, [243, 900]), noShadow: 1 });
    s += `<ellipse cx="243" cy="884" rx="${(26 * strain).toFixed(1)}" ry="${(34 * strain).toFixed(1)}" fill="url(#goldG)" opacity="${(.7 * strain).toFixed(2)}"/>`;
  } else {
    const x = HX + 780 * u + 420 * u * u, yc = GY - 150 - 250 * u + 520 * u * u, rot = 100 * ease(clamp(u / .55));
    s += `<ellipse cx="${x.toFixed(1)}" cy="${GY + 4}" rx="40" ry="7" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
    for (let i = 0; i < 6; i++) { const yy = yc - 110 + i * 44, L = 150 + (i * 37 % 90); s += `<path d="M${(x - 60).toFixed(1)},${yy.toFixed(1)} L${(x - 60 - L * clamp(u * 4)).toFixed(1)},${yy.toFixed(1)}" stroke="#fff" stroke-width="${3 + i % 2 * 2}" stroke-linecap="round" opacity="${(.5 * (1 - clamp(u / .8))).toFixed(2)}"/>`; }
    s += hero(x, yc + 150, { s: 1, face: -1, rot, pv: -150, air: 1, noShadow: 1, lF: [1.05 + .2 * Math.sin(t * 20), .5], lB: [.7, .15 + .2 * Math.cos(t * 20)], aF: [1.9, 1.5], aB: [1.5, 1.15] });
    for (let i = 0; i < 5; i++) { const p = clamp((u - i * .05) / .8); s += puff(HX + 30 + i * 70 * clamp(u * 3), GY - 6 - p * 26, 16 + p * 34, (1 - p) * .8 * (u > i * .05 ? 1 : 0)); }
    const pc = clamp((u - .5) / .9); if (u > .5) s += puff(705 - pc * 30, 1010 - pc * 40, 30 + pc * 60, (1 - pc) * .9) + puff(690, 1060 - pc * 20, 24 + pc * 40, (1 - pc) * .7);
    s += `<path d="M${HX - 6},${GY + 2} L${HX + 250},${GY + 5}" stroke="#3a342c" stroke-width="5" stroke-linecap="round" opacity="${(.55 * clamp(u * 5)).toFixed(2)}"/><path d="M${HX - 30},${GY + 14} L${HX + 220},${GY + 18}" stroke="#3a342c" stroke-width="5" stroke-linecap="round" opacity="${(.55 * clamp(u * 5)).toFixed(2)}"/>`;
  }
  // the two equal forces
  const a1 = ease(ramp(t, WS(2, 3) - .1, WS(2, 3) + .3)), g1 = ease(ramp(t, WS(2, 3) - .1, WS(2, 3) + .6)), a2 = ease(ramp(t, WS(2, 5), WS(2, 5) + .3)), g2 = ease(ramp(t, WS(2, 5), WS(2, 5) + .6));
  s += arrow(450, 640, lerp(420, 262, g1), 640, a1, '#f4c76b', 9) + lbl(356, 616, 'قوّتُك', a1, '#ffe4a0', 30) + arrow(262, 706, lerp(292, 450, g2), 706, a2, '#ff6b5a', 9) + lbl(356, 756, 'قوّةُ الجدار', a2, '#ffc2b8', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: a jump as high as ten storeys (30 m): 4.9 s in the air, and back on the ground at more than 80 km/h ----------
function jumpBG(t) {
  const sky = ['#3a6fb8', '#93bbe2', '#ebe3d0'], G = 1140, TX = 70, TW = 250, fh = 66, top = G - fh * 10;
  let s = `<defs>${DEFB()}${BDEF}<linearGradient id="skj" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-10" y="-10" width="740" height="1300" fill="url(#skj)"/>`;
  s += `<circle cx="590" cy="352" r="150" fill="#fff6d0" opacity=".3" filter="url(#soft)"/><circle cx="590" cy="352" r="30" fill="#fffdf2"/>` + cumulus(500 + t * 1.5, 660, 200, 3, { a: .9 }) + cumulus(210 - t, 400, 150, 9, { a: .7 }) + cumulus(400 + t, 830, 150, 5, { a: .7 });
  s += farCity(31, 1052, mix(sky[2], '#55657a', .4), { hk: 1.1 }) + `<rect x="-20" y="900" width="760" height="150" fill="${sky[2]}" opacity=".22"/>`;
  s += bldg(446, G, 124, 268, '#bfae92', 9, .12) + roofKit(446, G - 268, 124, 5) + officeGlass(566, G, 104, 330, 311) + aptBrick(662, G, 90, 214, '#b2684e', 281, { cols: 2 });
  // the ten-storey block of flats
  s += aptBrick(TX, G, TW, fh * 10, '#c8b99c', 301, { fh, rows: 9, cols: 4, ww: 34, wh: 40, bands: 1, side: .1 });
  s += `<rect x="${TX}" y="${G - fh + 6}" width="${TW}" height="${fh - 6}" fill="#3a3028"/>` + [0, 1, 3].map(i => `<rect x="${TX + 10 + i * 60}" y="${G - fh + 16}" width="50" height="${fh - 22}" fill="#48688a"/><path d="M${TX + 10 + i * 60},${G - 6} L${TX + 10 + i * 60},${G - fh + 16} L${TX + 34 + i * 60},${G - fh + 16}Z" fill="#cfe6f8" opacity=".3"/>`).join('') +
    `<rect x="${TX + 128}" y="${G - fh + 12}" width="54" height="${fh - 12}" fill="#221a14"/><rect x="${TX + 132}" y="${G - fh + 16}" width="22" height="${fh - 18}" fill="#5a7890"/><rect x="${TX + 157}" y="${G - fh + 16}" width="22" height="${fh - 18}" fill="#5a7890"/><path d="M${TX + 112},${G - fh + 6} l86,0 l10,12 l-106,0Z" fill="#8a2f2a"/><rect x="${TX + 102}" y="${G - fh + 18}" width="106" height="4" fill="#000" opacity=".3"/>` +
    `<rect x="${TX - 10}" y="${G - 14}" width="${TW + 40}" height="14" fill="url(#aoUp)" opacity=".6"/>`;
  // ground
  s += `<rect x="-10" y="${G}" width="740" height="62" fill="#c9bda7"/><rect x="-10" y="${G}" width="740" height="62" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-10" y="${G}" width="740" height="20" fill="url(#aoDn)" opacity=".6"/>` + [1, 2].map(q => `<path d="M-10,${G + 21 * q} H730" stroke="#a89c86" stroke-width="1.5"/>`).join('') + Array.from({ length: 17 }, (_, q) => `<path d="M${q * 48 - 8},${G} l-8,62" stroke="#a89c86" stroke-width="1.5"/>`).join('') +
    `<rect x="-10" y="${G + 62}" width="740" height="12" fill="#e8e4d8"/><rect x="-10" y="${G + 70}" width="740" height="4" fill="#8a8478"/>` + Array.from({ length: 10 }, (_, q) => `<rect x="${q * 80 - 20}" y="${G + 62}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('') +
    `<rect x="-10" y="${G + 74}" width="740" height="80" fill="#4e4e54"/><rect x="-10" y="${G + 74}" width="740" height="80" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  s += `<path d="M618,${G + 40} Q680,${G + 30} 740,${G + 44} L740,${G + 62} Q660,${G + 66} 616,${G + 50}Z" fill="#000" opacity=".2" filter="url(#blur2)"/>` + treeR(636, G + 40, 250, 7, t) + `<path d="M560,${G + 50} l64,9 l0,4 l-64,-7Z" fill="#000" opacity=".3"/>` + lampPost(560, G + 50, 230, 0) + car(596, G + 118, .86, '#d8d8dc', -1, 0);
  // floor ruler: ten ticks, 30 m
  const RX = 372; s += `<path d="M${RX},${G} V${top}" stroke="#fff" stroke-width="3" opacity=".9"/><path d="M${RX},${G} V${top}" stroke="#000" stroke-width="7" opacity=".25"/><path d="M${RX},${G} V${top}" stroke="#fff" stroke-width="3"/>`;
  for (let i = 1; i <= 10; i++) { const y = G - i * fh; s += `<path d="M${RX - 9},${y} h18" stroke="#fff" stroke-width="3"/>` + lbl(RX + 26, y + 40, AR(i), .95, i === 10 ? '#f4c76b' : '#fff', 20); }
  s += `<path d="M${TX + TW},${top} H540" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/>`;
  return s;
}
function sceneJump(t) {
  const st = S0(3) - .2, tL = WS(3, 0) + .45, FL = 2 * 24.26 / 9.81, tau = (t - tL) / FL, G = 1140, H = 660, HX = 470, S = .24, tc = clamp(tau), h = H * (1 - Math.pow(2 * tc - 1, 2)), hy = G - h;
  const z = 1 + .75 * (1 - ease(ramp(tau, -.02, .34))) + .7 * ease(ramp(tau, .74, .99)), fx = clamp(HX - 40 / z, 360 / z, 720 - 360 / z), fy = clamp(hy - 150 / z, 640 / z, 1280 - 640 / z);
  let w = jumpBG(t);
  const a30 = ease(ramp(tau, .2, .34)) * (1 - ease(ramp(tau, .66, .76))); w += lbl(410, G - H - 14, '٣٠ م', a30, '#f4c76b', 34);
  // shadow on the pavement, speed trail
  w += `<ellipse cx="${HX + 2}" cy="${G + 2}" rx="${(10 * (1 - .65 * h / H)).toFixed(1)}" ry="2.4" fill="#000" opacity="${(.34 * (1 - .6 * h / H)).toFixed(2)}"/>`;
  const vn = tau > 0 && tau < 1 ? (1 - 2 * tc) : 0;
  if (Math.abs(vn) > .12) { const len = Math.abs(vn) * 110, yy = vn > 0 ? hy - 6 : hy - 60; w += `<path d="M${HX + 1},${yy} L${HX + 1},${yy + (vn > 0 ? len : -len)}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${(.34 * Math.abs(vn)).toFixed(2)}" filter="url(#blurU)"/>`; }
  let hs;
  if (tau < 0) { const cr = ease(ramp(t, tL - .55, tL - .1)) * (1 - ease(ramp(t, tL - .1, tL))); hs = hero(HX, G, { s: S, face: 1, noShadow: 1, lF: [.1 + .95 * cr, .06 - .85 * cr], lB: [-.1 + .9 * cr, -.14 - .72 * cr], aF: [.05 - 1.0 * cr, .3 - .7 * cr], aB: [-.05 - 1.0 * cr, .25 - .7 * cr], lean: 24 * cr, lookUp: .8 }); }
  else if (tau < 1) { const kd = ease(ramp(tau, .4, .6)), fl = Math.sin(t * 13) * kd, L = (a, b) => [lerp(a[0], b[0], kd), lerp(a[1], b[1], kd)];
    hs = hero(HX, hy, { s: S, face: 1, air: 1, noShadow: 1, lF: L([.08, -.05], [.7 + .15 * fl, -.45]), lB: L([-.2, -.5], [.2 - .15 * fl, -1.0]), aF: L([2.9, 3.05], [2.3 + .35 * fl, 2.8]), aB: L([2.65, 2.8], [-2.2 + .35 * fl, -2.7]), lookUp: .7 * (1 - kd), lean: -8 * kd }); }
  else { const q = t - (tL + FL), sh = Math.sin(t * 40) * 1.2 * (1 - clamp(q / .5)); hs = hero(HX + sh, G, { s: S, face: 1, noShadow: 1, lF: [1.25, -1.0], lB: [.45, -1.55], aF: [.75, .25], aB: [-.8, -.2], lean: 26 }); }
  w += hs;
  // dust at take-off, impact burst at landing
  const pu = clamp(tau / .12); if (tau > 0) w += puff(HX - 14 - pu * 14, G - 2, 6 + pu * 12, (1 - pu) * .9) + puff(HX + 16 + pu * 14, G - 2, 6 + pu * 11, (1 - pu) * .8);
  const q = t - (tL + FL);
  if (q > 0) { const p = clamp(q / .9), fl = clamp(1 - q / .32);
    w += `<ellipse cx="${HX}" cy="${G + 1}" rx="${(8 + p * 78).toFixed(1)}" ry="${(2 + p * 11).toFixed(1)}" fill="none" stroke="#f1e6d0" stroke-width="${(5 * (1 - p) + 1).toFixed(1)}" opacity="${(.9 * (1 - p)).toFixed(2)}"/>` + puff(HX - 20 - p * 46, G - 6 - p * 8, 9 + p * 24, (1 - p) * .95) + puff(HX + 22 + p * 46, G - 6 - p * 8, 9 + p * 24, (1 - p) * .95) + puff(HX, G - 10 - p * 18, 8 + p * 20, (1 - p) * .7);
    for (let i = 0; i < 11; i++) { const a = Math.PI * (1.08 + i * .084), r0 = 12 + 20 * (1 - fl), r1 = r0 + 26 + (i % 3) * 12, cx = Math.cos(a), sy = Math.sin(a) * .8, bx = HX + cx * r0, by = G - 4 + sy * r0;
      w += `<polygon points="${(bx - sy * 2.2).toFixed(1)},${(by + cx * 2.2).toFixed(1)} ${(bx + sy * 2.2).toFixed(1)},${(by - cx * 2.2).toFixed(1)} ${(HX + cx * r1).toFixed(1)},${(G - 4 + sy * r1).toFixed(1)}" fill="${i % 2 ? '#ff5a3a' : '#fff1c0'}" fill-opacity="${fl.toFixed(2)}"/>`; }
    const r = RS(8); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.1 + r() * .8), sp = 60 + r() * 80, px = HX + Math.cos(a) * sp * q, py = G - 4 + Math.sin(a) * sp * q + 160 * q * q; if (py < G + 2) w += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="3.4" height="3.4" fill="#8a8072" transform="rotate(${(q * 400 * (r() - .5)).toFixed(0)},${px.toFixed(1)},${py.toFixed(1)})"/>`; } }
  let s = `<g transform="translate(360,640) scale(${z.toFixed(4)}) translate(${(-fx).toFixed(2)},${(-fy).toFixed(2)})">${w}</g>`;
  // speed gauge (screen space)
  const v = tau <= 0 ? 0 : tau < .5 ? 87 * (1 - 2 * tc) : 84 * (2 * tc - 1), hit = tau >= 1, ag = ease(ramp(t, st + .3, st + .7));
  s += `<g opacity="${ag.toFixed(2)}">` + panel(34, 1116, 252, 122) + (hit ? `<rect x="34" y="1116" width="252" height="122" rx="18" fill="none" stroke="#ff5a3a" stroke-width="4" opacity="${(.6 + .4 * Math.sin(t * 9)).toFixed(2)}"/>` : '') + lbl(160, 1156, 'السرعة', 1, '#cfd8ff', 22) + lbl(160, 1214, `${AR(Math.round(v))} كم/س`, 1, hit ? '#ff7a5a' : '#f4c76b', 44) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: eye beams that cut steel need about 1 kW: ten times what the whole body produces (~100 W) ----------
function steelCol(t, kc, kf, cool) {
  const x0 = 548, w = 64, yT = 704, yB = 1014, yc = 792; let s = '';
  s += `<ellipse cx="${x0 + w / 2 + 30}" cy="${yB + 30}" rx="96" ry="10" fill="#000" opacity=".35" filter="url(#blur2)"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="30" rx="3" fill="#8f8a82"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="6" fill="#fff" opacity=".22"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="30" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="${x0 - 12}" y="${yB - 10}" width="${w + 24}" height="12" fill="#59626e"/>` +
    [-6, w - 4].map(d => `<circle cx="${x0 + d + 5}" cy="${yB - 4}" r="4" fill="#2c333c"/>`).join('');
  const part = (y0, y1) => `<rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="url(#stG)"/><rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#000" filter="url(#stainD)" opacity=".28"/><rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#5a2a12" filter="url(#wallI)" opacity=".2"/>` +
    `<path d="M${x0 + 15},${y0} V${y1} M${x0 + w - 15},${y0} V${y1}" stroke="#2f3843" stroke-width="2" opacity=".7"/><path d="M${x0 + 17},${y0} V${y1}" stroke="#fff" stroke-width="1.2" opacity=".25"/>`;
  s += part(yc, yB) + [840, 900, 960].map(y => `<circle cx="${x0 + 32}" cy="${y}" r="4.5" fill="#39424d"/><circle cx="${x0 + 31}" cy="${y - 1}" r="2" fill="#aeb8c4"/>`).join('');
  s += `<g transform="translate(${(14 * kf).toFixed(1)},${(252 * kf * kf).toFixed(1)}) rotate(${(90 * Math.min(1, kf * 1.25)).toFixed(1)},${x0 + w},${yc})">` + part(yT, yc) + `<rect x="${x0}" y="${yT}" width="${w}" height="5" fill="#fff" opacity=".3"/><rect x="${x0}" y="${yc - 5}" width="${w * kc}" height="5" fill="#ffb060" opacity="${cool.toFixed(2)}"/></g>`;
  if (kc > 0) s += `<rect x="${x0 - 2}" y="${yc - 9}" width="${(w * kc + 4).toFixed(1)}" height="18" rx="8" fill="#ff7a2a" opacity="${(.75 * cool).toFixed(2)}" filter="url(#blur5)"/><rect x="${x0}" y="${yc - 2.5}" width="${(w * kc).toFixed(1)}" height="5" fill="${mix('#8a3a1a', '#fff2b0', cool)}"/>`;
  return s;
}
function sceneLaser(t) {
  const st = S0(4) - .2, T = t - st, tB = WS(4, 0) + .12, tC = WS(4, 3) + .5, kc = ramp(t, tB + .25, tC), on = ease(ramp(t, tB, tB + .15)) * (1 - ease(ramp(t, tC + .05, tC + .3))), kf = ramp(t, tC + .1, tC + .85), cool = 1 - .8 * ease(ramp(t, tC + .3, tC + 3.2));
  let s = `<defs>${BDEF}</defs>` + streetS(t, { id: 'z', cars: 0 }) + [[470, 0, -1], [700, 3, -1], [330, 2, 1]].map(([x0, c, f], i) => { const x = x0 + f * 24 * T; return castSh(x, 1086 + i * 4, .52) + onWalk(x, 1086 + i * 4, CROWD[c], .52, f, t, { moving: 1, phase: t * 6 + i * 2, amp: .7 }); }).join('') + `<rect width="720" height="1280" fill="#0a1028" opacity=".58"/>`;
  s += steelCol(t, kc, kf, cool) + lbl(486, 1000, 'فولاذ', ease(ramp(t, st + .4, st + .8)), '#dfe6ee', 28) + (kf >= 1 ? (p => puff(668 - p * 30, 1040 - p * 10, 14 + p * 30, (1 - p) * .9) + puff(700 + p * 10, 1036 - p * 14, 12 + p * 26, (1 - p) * .8))(clamp((t - tC - .85) / .8)) : '');
  s += hero(250, 1634, { s: 2.88, face: 1, noShadow: 1, shade: 1, glow: Math.max(on, .25 * ease(ramp(t, st + .2, tB))) });
  const e = HP.eye, hxp = 548 + 64 * kc, hyp = 792, fl = .85 + .15 * Math.sin(t * 61);
  s += beam(e[0] + 4, e[1], hxp, hyp, on, 1.25, fl) + `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="${(34 * on).toFixed(1)}" fill="url(#redG)" opacity="${(.95 * on).toFixed(2)}"/>`;
  if (on > .05) { s += `<circle cx="${hxp.toFixed(1)}" cy="${hyp}" r="${(26 * fl).toFixed(1)}" fill="url(#goldG)" opacity="${on.toFixed(2)}"/><circle cx="${hxp.toFixed(1)}" cy="${hyp}" r="6" fill="#fff" opacity="${on.toFixed(2)}"/>`;
    const r = RS(21); for (let i = 0; i < 34; i++) { const ph = pmod(T * (1.6 + r() * 1.2) + r(), 1), a = Math.PI * (.62 + r() * .9), sp = 70 + r() * 150, px = hxp + Math.cos(a) * sp * ph, py = hyp + Math.sin(a) * sp * ph * .7 + 190 * ph * ph, vx = Math.cos(a) * sp, vy = Math.sin(a) * sp * .7 + 380 * ph, vl = Math.hypot(vx, vy) || 1, ln = 9 + r() * 12;
      s += `<path d="M${px.toFixed(1)},${py.toFixed(1)} l${(-vx / vl * ln).toFixed(1)},${(-vy / vl * ln).toFixed(1)}" stroke="${ph < .4 ? '#fff3c0' : '#ffb24a'}" stroke-width="${(2.6 * (1 - ph) + .6).toFixed(1)}" stroke-linecap="round" opacity="${(on * (1 - ph)).toFixed(2)}"/>`; } }
  // smoke from the cut and molten drops
  for (let i = 0; i < 5; i++) { const ph = pmod(T * .45 + i / 5, 1), a = clamp((t - tB - .4) / .5) * (1 - clamp((t - tC - 1.6) / 1.2)); s += `<circle cx="${(580 + Math.sin(i * 2.1 + ph * 4) * 14).toFixed(1)}" cy="${(780 - ph * 150).toFixed(1)}" r="${(10 + ph * 24).toFixed(1)}" fill="#b9b2ac" opacity="${(a * .32 * (1 - ph)).toFixed(2)}" filter="url(#blur5)"/>`; }
  for (let i = 0; i < 3; i++) { const q = t - (tB + .7 + i * .42); if (q > 0 && q < .7) s += `<ellipse cx="${556 + i * 17}" cy="${(796 + 440 * q * q).toFixed(1)}" rx="3" ry="${(4 + 8 * q).toFixed(1)}" fill="#ffc24a"/>`; }
  // power panel: the laser bar first, then x10, then the body
  const ap = ease(ramp(t, WS(4, 4) - .1, WS(4, 4) + .3)), kb = ease(ramp(t, WS(4, 5), WS(4, 7) + .25)), ax = ease(ramp(t, WS(4, 8) - .05, WS(4, 8) + .3)), ab = ease(ramp(t, WS(4, 11) - .1, WS(4, 11) + .3)), BX = 598;
  s += `<g opacity="${ap.toFixed(2)}">` + panel(372, 1046, 334, 190) + lbl(650, 1104, 'الليزر', 1, '#ffc2b8', 24) + `<rect x="${(BX - 196 * kb).toFixed(1)}" y="1078" width="${(196 * kb).toFixed(1)}" height="34" rx="6" fill="#e5483a"/><rect x="${(BX - 196 * kb).toFixed(1)}" y="1078" width="${(196 * kb).toFixed(1)}" height="9" rx="4" fill="#fff" opacity=".25"/>` + lbl(BX - 98, 1104, '١٬٠٠٠ واط', kb > .7 ? 1 : 0, '#fff', 24) +
    `<g opacity="${ab.toFixed(2)}">` + lbl(650, 1192, 'جسدُك', 1, '#ffe4a0', 24) + `<rect x="${BX - 19.6}" y="1166" width="19.6" height="34" rx="5" fill="#f4c76b"/>` + lbl(BX - 86, 1192, '١٠٠ واط', 1, '#f4c76b', 24) + `</g>` +
    `<g opacity="${ax.toFixed(2)}" transform="translate(432,1196) scale(${(1 + .25 * Math.sin(Math.PI * clamp((t - WS(4, 8)) / .5))).toFixed(3)})">` + lbl(0, 0, '×١٠', 1, '#f4c76b', 44) + `</g></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: invisible means light goes straight through your eyes too: nothing is absorbed by the retina, so you are blind ----------
function eyeInset(cx, cy, R, k, t, a) {
  if (a <= 0) return ''; const ex = cx + 8, ey = cy, vis = 1 - .8 * k;
  let s = `<g opacity="${a.toFixed(2)}"><defs><clipPath id="eyC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><radialGradient id="vitG"><stop offset="0" stop-color="#fbeee6"/><stop offset="1" stop-color="#f0d6c8"/></radialGradient></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${R + 5}" fill="#000" opacity=".35" filter="url(#blur5)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#0b1024"/><g clip-path="url(#eyC)">`;
  // the eye in section, light coming from the left
  s += `<g opacity="${vis.toFixed(2)}"><path d="M${ex + 70},${ey - 6} L${ex + 150},${ey + 14} L${ex + 150},${ey + 44} L${ex + 66},${ey + 20}Z" fill="#e3bf8e"/><path d="M${ex + 70},${ey + 4} L${ex + 150},${ey + 26}" stroke="#b98a5a" stroke-width="2" fill="none"/>` +
    `<circle cx="${ex}" cy="${ey}" r="80" fill="#f6f1e8"/><circle cx="${ex}" cy="${ey}" r="80" fill="none" stroke="#cfc4b2" stroke-width="2.5"/><circle cx="${ex}" cy="${ey}" r="70" fill="url(#vitG)"/>` +
    `<path d="M${(ex + 70 * Math.cos(-2.15)).toFixed(1)},${(ey + 70 * Math.sin(-2.15)).toFixed(1)} A70,70 0 1 1 ${(ex + 70 * Math.cos(2.15)).toFixed(1)},${(ey + 70 * Math.sin(2.15)).toFixed(1)}" fill="none" stroke="#7a1f16" stroke-width="11"/><path d="M${(ex + 68 * Math.cos(-2.15)).toFixed(1)},${(ey + 68 * Math.sin(-2.15)).toFixed(1)} A68,68 0 1 1 ${(ex + 68 * Math.cos(2.15)).toFixed(1)},${(ey + 68 * Math.sin(2.15)).toFixed(1)}" fill="none" stroke="#e0563a" stroke-width="6"/>` +
    `<path d="M${ex - 62},${ey - 50} Q${ex - 112},${ey} ${ex - 62},${ey + 50}" fill="#d6ecf8" opacity=".85" stroke="#8fb9d2" stroke-width="2.5"/>` +
    `<path d="M${ex - 60},${ey - 52} L${ex - 52},${ey - 17} L${ex - 60},${ey - 15} L${ex - 68},${ey - 48}Z M${ex - 60},${ey + 52} L${ex - 52},${ey + 17} L${ex - 60},${ey + 15} L${ex - 68},${ey + 48}Z" fill="#6b4a2a"/>` +
    `<ellipse cx="${ex - 42}" cy="${ey}" rx="14" ry="31" fill="#eaf6fc" stroke="#8fb9d2" stroke-width="2.5"/><ellipse cx="${ex - 46}" cy="${ey - 8}" rx="4" ry="12" fill="#fff" opacity=".7"/></g>`;
  s += `<circle cx="${ex}" cy="${ey}" r="80" fill="none" stroke="#dff2ff" stroke-width="2.5" stroke-dasharray="7 7" opacity="${(.85 * k).toFixed(2)}"/><path d="M${ex - 62},${ey - 50} Q${ex - 112},${ey} ${ex - 62},${ey + 50}" fill="none" stroke="#dff2ff" stroke-width="2.5" stroke-dasharray="7 7" opacity="${(.85 * k).toFixed(2)}"/>`;
  // three rays: focused on the retina (normal) or straight through (invisible)
  [-15, 0, 15].forEach((o, i) => { const x0 = cx - R - 4, xl = ex - 42, fx = lerp(ex + 66, cx + R + 10, k), fy = lerp(ey, ey + o, k), d = `M${x0},${ey + o} L${xl},${ey + o} L${fx.toFixed(1)},${fy.toFixed(1)}`;
    s += `<path d="${d}" stroke="#f4c76b" stroke-width="6" fill="none" opacity=".25" stroke-linejoin="round"/><path d="${d}" stroke="#ffe7a8" stroke-width="2.6" fill="none" stroke-dasharray="14 9" stroke-dashoffset="${(-t * 90).toFixed(1)}" stroke-linejoin="round"/>`; });
  s += `<circle cx="${ex + 66}" cy="${ey}" r="${(13 + 2 * Math.sin(t * 7)).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - k).toFixed(2)}"/></g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="4"/>`;
  return s + `</g>`;
}
function sceneGhost(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 1) + .1, WS(5, 3) + .35)), tD = WS(5, 11), kd = ease(ramp(t, tD - .05, tD + .7)), GY = 1124;
  const slow = 1 - .85 * ease(ramp(t, tD - .4, tD + .2)), xw = 236 + 24 * Math.min(T, tD - st) + 6 * clamp((t - tD) / 1.2), ph = 6 * (Math.min(t, tD) + .15 * Math.max(0, t - tD)), grope = ease(ramp(t, tD - .2, tD + .4));
  let s = `<defs>${BDEF}</defs>` + zoomG(streetS(t, { id: 'g', cars: 0, trees: [[566, 268, 5]], lamps: [28, 694] }) + car(pmod(520 + T * 85, 1300) - 200, 1256, .9, '#a83a2a', 1, 0) + castSh(640 - 20 * T, 1084, .5) + onWalk(640 - 20 * T, 1084, CROWD[3], .5, -1, t, { moving: 1, phase: t * 6, amp: .7 }), 1.5, 330, 1098, 330, GY);
  // sunlight: rays cross the head and carry on
  const ar = ease(ramp(t, WS(5, 4) - .2, WS(5, 4) + .3)) * (1 - kd), base = { s: .93, face: 1, walk: ph, amp: .55 * slow + .1, noShadow: 1 };
  if (grope > 0) { hero(xw, GY, base); const h0 = HP.hand, h1 = HP.handB; base.hF = [lerp(h0[0], xw + 92, grope), lerp(h0[1], GY - 196 + Math.sin(t * 5) * 10, grope)]; base.hB = [lerp(h1[0], xw + 80, grope), lerp(h1[1], GY - 170 + Math.cos(t * 4.3) * 12, grope)]; }
  const body = hero(xw, GY, base), hd = HP.head;
  let rays = ''; [-20, 0, 20].forEach((o, i) => { const dx = .86, dy = .51, nx = -dy * o, ny = dx * o, x0 = hd[0] + nx - dx * 700, y0 = hd[1] + ny - dy * 700, x1 = hd[0] + nx + dx * 420, y1 = hd[1] + ny + dy * 420;
    rays += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ffe9a8" stroke-width="11" opacity=".13"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#fff3c8" stroke-width="1.8" opacity=".75"/>`;
    for (let j = 0; j < 7; j++) { const p = pmod(t * .55 + j / 7 + i * .09, 1); rays += `<circle cx="${lerp(x0, x1, p).toFixed(1)}" cy="${lerp(y0, y1, p).toFixed(1)}" r="4.2" fill="#fff6d8" opacity="${(.95 * Math.sin(p * Math.PI)).toFixed(2)}"/>`; } });
  s += `<g opacity="${(ar * k).toFixed(2)}">${rays}</g>`;
  s += `<rect width="720" height="1280" fill="#02030a" opacity="${(.9 * kd).toFixed(2)}"/>`;
  s += `<g opacity="${(1 - k).toFixed(2)}">` + castSh(xw, GY, .93) + body + `</g><g opacity="${k.toFixed(2)}" filter="url(#ghostF)">${body}</g>`;
  // the eye, in section
  const ai = ease(ramp(t, WS(5, 4) - .35, WS(5, 4) + .05)), ke = ease(ramp(t, WS(5, 5), WS(5, 6) + .3)), CX = 214, CY = 590, R = 138;
  s += `<path d="M${CX + 70},${CY + 118} L${(hd[0] + 6).toFixed(1)},${(hd[1] - 30).toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="4 7" opacity="${(ai * .9).toFixed(2)}"/>` + eyeInset(CX, CY, R, ke, t, ai) +
    lbl(CX, CY + R + 40, 'عينٌ عاديّة: الضوءُ يتوقّفُ هنا', ai * (1 - ease(ramp(ke, .2, .5))), '#fff', 23) + lbl(CX, CY + R + 40, 'عينٌ شفّافة: الضوءُ يعبُرُها', ai * ease(ramp(ke, .5, .8)), '#ffe4a0', 23);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: eight billion super-jumpers at once move the Earth by less than the width of an atom ----------
const CITIES = [[35.7, 139.7], [28.6, 77.2], [31.2, 121.5], [-23.5, -46.6], [19.4, -99.1], [30, 31.2], [19.1, 72.9], [39.9, 116.4], [23.8, 90.4], [34.7, 135.5], [40.7, -74], [24.9, 67], [-34.6, -58.4], [29.6, 106.5], [41, 29], [22.6, 88.4], [14.6, 121], [6.5, 3.4], [-22.9, -43.2], [-4.3, 15.3], [23.1, 113.3], [34, -118.2], [55.8, 37.6], [31.5, 74.3], [13, 77.6], [48.9, 2.3], [4.7, -74.1], [-6.2, 106.8], [13.1, 80.3], [-12, -77], [13.8, 100.5], [37.6, 127], [17.4, 78.5], [51.5, -.1], [35.7, 51.4], [41.9, -87.6], [30.6, 104.1], [30.6, 114.3], [10.8, 106.7], [-8.8, 13.2], [23, 72.6], [3.1, 101.7], [34.3, 108.9], [24.7, 46.7], [33.3, 44.4], [-33.4, -70.7], [40.4, -3.7], [43.7, -79.4], [-6.8, 39.3], [-26.2, 28], [15.5, 32.6], [1.35, 103.8], [-33.9, 151.2], [-1.3, 36.8], [9, 38.7], [33.6, -7.6], [36.8, 3.1], [12, 8.5], [5.3, -4], [5.6, -.2], [52.5, 13.4], [41.9, 12.5], [50.5, 30.5], [41.3, 69.2], [34.5, 69.2], [16.8, 96.2], [21, 105.8], [-37.8, 145], [25.3, 51.5], [21.5, 39.2], [36.2, 37.2], [33.5, 36.3], [31.9, 35.9], [15.4, 44.2], [9.1, 7.5], [14.7, -17.4], [-15.4, 28.3], [-18.9, 47.5], [-25.9, 32.6], [0.3, 32.6], [12.6, -8], [45.5, -73.6], [29.8, -95.4], [25.8, -80.2], [10.5, -66.9], [-0.2, -78.5], [-16.5, -68.1], [59.3, 18.1], [52.2, 21], [44.4, 26.1], [38, 23.7], [27.7, 85.3], [6.9, 79.9], [22.3, 114.2], [25, 121.5], [43.2, 76.9], [47.9, 106.9], [-36.8, 174.8], [64.1, -21.9], [61.2, -149.9]];
const SPK = (() => { const r = RS(88), o = []; CITIES.forEach(([la, lo], i) => { o.push([la, lo, 1, r()]); const n = i < 46 ? 3 : 1; for (let q = 0; q < n; q++) o.push([la + (r() - .5) * 9, lo + (r() - .5) * 11, .6, r()]); }); return o; })();
function atomSvg(x, y, R, t) {
  let s = `<defs><radialGradient id="atG"><stop offset="0" stop-color="#cfe0ff" stop-opacity="1"/><stop offset=".35" stop-color="#6f95f0" stop-opacity=".75"/><stop offset=".8" stop-color="#5a4fd0" stop-opacity=".3"/><stop offset="1" stop-color="#4b3fb8" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${R}" fill="url(#atG)"/>`;
  const r = RS(5); for (let i = 0; i < 70; i++) { const a = r() * 6.283 + t * (.3 + r() * .5) * (i % 2 ? 1 : -1), d = Math.pow(r(), .7) * R * .92; s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${(.8 + r() * 1.3).toFixed(1)}" fill="#dbe8ff" opacity="${(.2 + .5 * (1 - d / R)).toFixed(2)}"/>`; }
  return s + [[-3, -2, '#ff7a6a'], [3, -1, '#8ab4ff'], [0, 3, '#ff7a6a'], [-1, -5, '#8ab4ff']].map(([dx, dy, c]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3.6" fill="${c}"/>`).join('') + `<circle cx="${x - 1}" cy="${y - 2}" r="9" fill="#fff" opacity=".25" filter="url(#blur2)"/>`;
}
function globeCam(t, o = {}) { return orbit(o.d || 10.4, o.el ?? .32, (o.az ?? .25) + t * .02, o.tg || [0, .09, 0]); }
const sunFor = (az, off = -.6, up = .5) => [Math.sin(az + off), up, Math.cos(az + off)];
function sceneGlobe(t) {
  const st = S0(6) - .2, T = t - st, cam = globeCam(t), spin = 4.2 + t * .03, Ld = sunFor(.25 + t * .02), tJ = WS(6, 6) - .05, u = (t - tJ) / 1.15, hop = u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0;
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: .45 } };
  const cN = Math.hypot(...cam.pos), ln = Math.hypot(...Ld), c0 = proj3(cam, [0, 0, 0]), Rpx = c0[2] / Math.sqrt(1 - 1 / (cN * cN)) * 1;
  let o = `<defs>${SDEF}${BDEF}</defs>`, dots = '';
  SPK.forEach(([la, lo, sz, rr], i) => { const P = geo3(la, lo, spin), fr = (P[0] * cam.pos[0] + P[1] * cam.pos[1] + P[2] * cam.pos[2]) / cN, vis = clamp((fr - .12) / .25), ap = ease(ramp(t, WS(6, 1) + rr * 1.2, WS(6, 1) + rr * 1.2 + .3)); if (vis <= 0 || ap <= 0) return;
    const hh = 1.004 + .06 * hop * (.7 + .6 * rr), a = proj3(cam, P), b = proj3(cam, [P[0] * hh, P[1] * hh, P[2] * hh]), lit = clamp(.55 + .45 * (P[0] * Ld[0] + P[1] * Ld[1] + P[2] * Ld[2]) / ln * 2), al = vis * ap * lit;
    if (hop > .02) dots += `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}" stroke="#f4c76b" stroke-width="${(1.6 * sz).toFixed(1)}" opacity="${(al * .55).toFixed(2)}" stroke-linecap="round"/>`;
    dots += `<circle cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="${(2.5 * sz + 1.4 * hop).toFixed(1)}" fill="#ffe9a8" opacity="${al.toFixed(2)}"/>`; });
  o += `<g filter="url(#blur2)" opacity=".8">${dots}</g>` + dots;
  // a fixed reference circle: the Earth stays exactly inside it
  const ac = ease(ramp(t, WS(6, 7) - .1, WS(6, 7) + .4)); o += `<circle cx="${c0[0].toFixed(1)}" cy="${c0[1].toFixed(1)}" r="${(Rpx + 12).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="3 10" stroke-linecap="round" opacity="${(ac * .85).toFixed(2)}"/>`;
  // inset: the shift next to one atom
  const ai = ease(ramp(t, WS(6, 9), WS(6, 9) + .4)), PX = 74, PY = 1000;
  const ad = ease(ramp(t, WS(6, 11) - .1, WS(6, 11) + .3));
  o += `<g opacity="${ai.toFixed(2)}">` + panel(PX, PY, 572, 206) + atomSvg(PX + 462, PY + 96, 80, t) + lbl(PX + 462, PY + 196, 'ذرّةٌ واحدة', 1, '#cfd8ff', 22) +
    `<path d="M${PX + 44},${PY + 62} h160 M${PX + 44},${PY + 52} v20 M${PX + 204},${PY + 52} v20" stroke="#dfe6ff" stroke-width="3" fill="none"/>` + lbl(PX + 290, PY + 70, 'عرضُ الذرّة', 1, '#dfe6ff', 24) +
    `<g opacity="${ad.toFixed(2)}"><path d="M${PX + 44},${PY + 140} h16 M${PX + 44},${PY + 128} v24 M${PX + 60},${PY + 128} v24" stroke="#f4c76b" stroke-width="4" fill="none"/>` + lbl(PX + 190, PY + 149, 'إزاحةُ الأرض', 1, '#f4c76b', 30) + `</g></g>`;
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// ---------- 7: the twist. You already are super: 86 billion neurons running on about 20 W, less than a small light bulb ----------
function brainSvg(cx, cy, rx, ry, t, k) {
  if (k <= 0) return ''; const r = RS(31);
  const out = `M${cx - rx},${cy + ry * .1} C${cx - rx * 1.02},${cy - ry * .75} ${cx - rx * .45},${cy - ry * 1.08} ${cx + rx * .1},${cy - ry} C${cx + rx * .7},${cy - ry * .95} ${cx + rx * 1.04},${cy - ry * .35} ${cx + rx},${cy + ry * .2} C${cx + rx * .96},${cy + ry * .6} ${cx + rx * .55},${cy + ry * .7} ${cx + rx * .2},${cy + ry * .62} C${cx - rx * .1},${cy + ry * .95} ${cx - rx * .55},${cy + ry * .78} ${cx - rx * .62},${cy + ry * .55} C${cx - rx * .9},${cy + ry * .6} ${cx - rx},${cy + ry * .4} ${cx - rx},${cy + ry * .1}Z`;
  let s = `<g opacity="${k.toFixed(2)}"><defs><radialGradient id="brG" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#ffd0c8"/><stop offset=".6" stop-color="#ec9c98"/><stop offset="1" stop-color="#c26a72"/></radialGradient><clipPath id="brC"><path d="${out}"/></clipPath></defs>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.5}" ry="${ry * 1.55}" fill="url(#goldG)" opacity=".5"/>` +
    // cerebellum and brain stem behind
    `<path d="M${cx - rx * .2},${cy + ry * .5} C${cx - rx * .15},${cy + ry * 1.0} ${cx - rx * .05},${cy + ry * 1.5} ${cx + rx * .02},${cy + ry * 1.75} L${cx + rx * .2},${cy + ry * 1.7} C${cx + rx * .12},${cy + ry * 1.3} ${cx + rx * .1},${cy + ry * .9} ${cx + rx * .12},${cy + ry * .5}Z" fill="#d9a09a"/>` +
    `<ellipse cx="${cx - rx * .52}" cy="${cy + ry * .78}" rx="${rx * .36}" ry="${ry * .34}" fill="#d48a84"/>` + [-.2, -.08, .04, .16].map(d => `<path d="M${cx - rx * .86},${cy + ry * (.78 + d)} Q${cx - rx * .52},${cy + ry * (.72 + d)} ${cx - rx * .18},${cy + ry * (.8 + d)}" stroke="#a65a5e" stroke-width="2" fill="none"/>`).join('') +
    `<path d="${out}" fill="url(#brG)" stroke="#a65a62" stroke-width="3"/><g clip-path="url(#brC)">`;
  // folds: wavy arcs that follow the outline
  for (let i = 0; i < 7; i++) { const q = .2 + i * .125, n = 26; let d = '';
    for (let j = 0; j <= n; j++) { const th = -Math.PI * 1.08 + j / n * Math.PI * 1.16 + (i % 2) * .08, wob = 1 + .075 * Math.sin(j * 1.9 + i * 2.3) + .04 * Math.sin(j * 4.1 + i), px = cx + Math.cos(th) * rx * q * wob * 1.08 + rx * .06, py = cy + ry * .28 + Math.sin(th) * ry * q * wob * 1.25; d += (j ? ' L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1); }
    s += `<path d="${d}" stroke="#a8545e" stroke-width="3.4" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity=".75"/><path d="${d}" stroke="#ffd9d2" stroke-width="1.4" fill="none" stroke-linejoin="round" opacity=".55" transform="translate(-1.5,-2)"/>`; }
  for (let i = 0; i < 12; i++) { const a = -Math.PI * (.08 + .92 * r()), d0 = .25 + r() * .5, x0 = cx + Math.cos(a) * rx * d0, y0 = cy + ry * .2 + Math.sin(a) * ry * d0 * 1.1; s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} q${((r() - .5) * 26).toFixed(1)},${(-8 - r() * 12).toFixed(1)} ${((r() - .5) * 30).toFixed(1)},${(-18 - r() * 16).toFixed(1)}" stroke="#a8545e" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>`; }
  s += `<path d="${out}" fill="none" stroke="#000" stroke-width="16" opacity=".12"/>`;
  // neurons firing
  const N = []; for (let i = 0; i < 44; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * .82; N.push([cx + Math.cos(a) * rx * d, cy - ry * .05 + Math.sin(a) * ry * d * .82, r()]); }
  N.forEach((p, i) => { const j = (i * 7 + 3) % N.length, q = N[j], dd = Math.hypot(p[0] - q[0], p[1] - q[1]); if (dd < rx * .75) { const ph = pmod(t * (.9 + p[2]) + p[2] * 3, 1); s += `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} L${q[0].toFixed(1)},${q[1].toFixed(1)}" stroke="#fff3c0" stroke-width="1.2" opacity=".28"/><circle cx="${lerp(p[0], q[0], ph).toFixed(1)}" cy="${lerp(p[1], q[1], ph).toFixed(1)}" r="2.6" fill="#fff" opacity="${Math.sin(ph * Math.PI).toFixed(2)}"/>`; } });
  N.forEach(p => { const fl = .5 + .5 * Math.sin(t * (4 + p[2] * 7) + p[2] * 20); s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(2 + 2.4 * fl).toFixed(1)}" fill="#ffe9a8" opacity="${(.45 + .5 * fl).toFixed(2)}"/>`; });
  return s + `</g></g>`;
}
function bulb(x, y, k, t) {
  const glassC = mix('#cdd6e0', '#fff0b8', k);
  return `<circle cx="${x}" cy="${y}" r="${(70 + 4 * Math.sin(t * 5)).toFixed(1)}" fill="url(#goldG)" opacity="${(.75 * k).toFixed(2)}"/>` +
    `<path d="M${x - 17},${y + 40} C${x - 20},${y + 22} ${x - 44},${y + 8} ${x - 44},${y - 16} A44,44 0 1 1 ${x + 44},${y - 16} C${x + 44},${y + 8} ${x + 20},${y + 22} ${x + 17},${y + 40}Z" fill="${glassC}" opacity="${(.42 + .5 * k).toFixed(2)}" stroke="#eef3f8" stroke-width="2.5"/>` +
    `<path d="M${x - 9},${y + 38} L${x - 12},${y + 2} L${x - 5},${y - 8} L${x},${y + 2} L${x + 5},${y - 8} L${x + 12},${y + 2} L${x + 9},${y + 38}" fill="none" stroke="${mix('#6a5a48', '#ffffff', k)}" stroke-width="2.6" stroke-linejoin="round"/>` +
    `<path d="M${x - 30},${y - 34} Q${x - 22},${y - 50} ${x - 6},${y - 54}" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>` +
    `<rect x="${x - 18}" y="${y + 40}" width="36" height="30" rx="4" fill="#9aa2ac"/>` + [0, 1, 2].map(i => `<path d="M${x - 18},${y + 48 + i * 8} l36,4" stroke="#5b636d" stroke-width="2.4"/>`).join('') + `<rect x="${x - 18}" y="${y + 40}" width="10" height="30" rx="4" fill="#fff" opacity=".28"/><path d="M${x - 9},${y + 70} h18 l-4,9 h-10Z" fill="#3c424a"/>`;
}
function sceneBrain(t) {
  const st = S0(7) - .2, T = t - st, kb = ease(ramp(t, WS(7, 4) - .1, WS(7, 5) + .4)), kc = ease(ramp(t, WS(7, 6) - .1, WS(7, 10) + .3)), kl = ease(ramp(t, WS(7, 12), WS(7, 14) + .2)), aura = ease(ramp(t, WS(7, 1), WS(7, 3)));
  let s = `<defs>${BDEF}</defs>` + streetS(t, { id: 'b' }) + `<rect width="720" height="1280" fill="#070b1c" opacity=".8"/>`;
  const HXc = 300, HYc = 742, S = 5.2;
  s += `<ellipse cx="${HXc}" cy="${HYc + 10}" rx="${200 + 6 * Math.sin(t * 3)}" ry="${236 + 6 * Math.sin(t * 3)}" fill="url(#goldG)" opacity="${(.34 * aura).toFixed(2)}"/>`;
  s += hero(HXc - 6 * S, HYc + 296 * S, { s: S, face: 1, noShadow: 1, shade: 1 });
  // an x-ray window into the head, then the brain
  s += `<ellipse cx="${HXc - 26}" cy="${HYc - 52}" rx="100" ry="76" fill="#160c2a" opacity="${(.62 * kb).toFixed(2)}" filter="url(#blur5)"/>` + brainSvg(HXc - 22, HYc - 60, 90, 61, t, kb);
  s += lbl(HXc, 540, `${AR(Math.round(86 * kc))} مليار خليّة عصبيّة`, ease(ramp(t, WS(7, 6) - .1, WS(7, 6) + .3)), '#ffe4a0', 36);
  // the 20 W bulb, fed from the brain
  const ab = ease(ramp(t, WS(7, 11) - .2, WS(7, 11) + .3)), BX = 566, BY = 800;
  let wire = `M${HXc + 52},${HYc - 70} C${HXc + 150},${HYc - 150} ${BX - 30},${BY - 170} ${BX},${BY - 62}`;
  s += `<g opacity="${ab.toFixed(2)}"><path d="${wire}" stroke="#f4c76b" stroke-width="3" fill="none" stroke-dasharray="3 9" stroke-linecap="round" stroke-dashoffset="${(-t * 40).toFixed(1)}"/>` + bulb(BX, BY, kl, t) + lbl(BX, BY + 122, '٢٠ واط', kl, '#f4c76b', 36) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: CTA ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  const az = .3 + (t - S0(8)) * .04; F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneLift }, { s: S0(2) - .2, f: scenePush }, { s: S0(3) - .2, f: sceneJump }, { s: S0(4) - .2, f: sceneLaser },
  { s: S0(5) - .2, f: sceneGhost }, { s: S0(6) - .2, f: sceneGlobe }, { s: S0(7) - .2, f: sceneBrain }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneLift, scenePush, sceneJump, sceneLaser, sceneGhost, sceneGlobe, sceneBrain]);
const XF = .5;
const TLI = [['قوّةٌ هائلة', S0(1)], ['قفزةٌ عملاقة', S0(3)], ['أشعّةُ العيون', S0(4)], ['الاختفاء', S0(5)]];
const LIST_ON = new Set([sceneLift, scenePush, sceneJump, sceneLaser, sceneGhost]);
const CHIPS = [
  ['c1', 'الفيزياءُ لا تتغيّر', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', 'لكلِّ فعلٍ ردُّ فعل', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'أكثرُ من ٨٠ كم/س', 360, 330, 'red', WS(3, 11), S0(4) - .3],
  ['c4', '١٠ أضعافِ قدرةِ جسدِك', 360, 330, 'big', WS(4, 8), S0(5) - .3],
  ['c5', 'أعمى', 360, 330, 'red', WS(5, 12), S0(6) - .3],
  ['c6', '٨ مليارات قفزة', 360, 330, 'big', WS(6, 2), WS(6, 7) - .1],
  ['c7', 'أقلُّ من عرضِ ذرّة', 360, 330, 'big', WS(6, 11), S0(7) - .3],
  ['c8', 'أنت خارقٌ فعلاً', 360, 330, 'big', WS(7, 2), S0(8) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">قوى خارقة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
