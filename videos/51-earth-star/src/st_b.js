// ---------- 5: suppose it swallowed a giant cloud of hydrogen ----------
function sceneCloud(t) {
  const t0 = S0(5) - .2, T = t - t0, k = ease(ramp(t, WS(5, 2), S0(6) + .2));
  const G = gW(t, { d: lerp(30, 22, ease(ramp(t, t0, S0(6)))), el: .3, az: .3, lon: 10 - T * 3, clouds: .35, lights: .3, off: -.75, tg: [0, -.1, 0] });
  F.w.cloud = { a: ease(ramp(t, t0, t0 + .9)), k: .42 * k, R: 8, tilt: .1, spin: 2 + T * .35 };
  Object.assign(F.w.disc, { star: .08 * k, glow: .35 * k, gs: 4, gc: [1, .45, .5] });
  const la = ease(ramp(t, WS(5, 3), WS(5, 4) + .3)) * (1 - ease(ramp(t, S0(6) - .6, S0(6) - .3)));
  let o = `<defs>${STDEFS()}</defs>`;
  o += `<g opacity="${la.toFixed(2)}"><path d="M${(G.c0[0] + 30).toFixed(1)},${(G.c0[1] + 30).toFixed(1)} L${(G.c0[0] + 120).toFixed(1)},${(G.c0[1] + 150).toFixed(1)}" stroke="#9fd0ff" stroke-width="2.4"/>${lbl(G.c0[0] + 140, G.c0[1] + 186, 'الأرض', 1, '#9fd0ff', 26)}</g>`;
  F.ov = o; return space(t);
}

// ---------- 6: gravity thousands of times stronger: the Moon falls onto it in under an hour ----------
function clockI(x, y, r, min, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="${r + 10}" fill="#0a0e1c" opacity=".88"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f4f1ea"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#sphSh)" opacity=".35"/>`;
  const an = m => (m / 60) * 6.2832 - 1.5708;
  s += `<path d="M${x},${y} L${x},${y - r * .92} A${r * .92},${r * .92} 0 ${min > 30 ? 1 : 0} 1 ${(x + Math.cos(an(min)) * r * .92).toFixed(1)},${(y + Math.sin(an(min)) * r * .92).toFixed(1)} Z" fill="#ff7a3a" opacity=".35"/>`;
  for (let i = 0; i < 12; i++) { const q = i * .5236; s += `<path d="M${(x + Math.cos(q) * r * .82).toFixed(1)},${(y + Math.sin(q) * r * .82).toFixed(1)} L${(x + Math.cos(q) * r * .94).toFixed(1)},${(y + Math.sin(q) * r * .94).toFixed(1)}" stroke="#2a2a30" stroke-width="${i % 3 ? 2 : 4}"/>`; }
  s += `<path d="M${x},${y} L${(x + Math.cos(an(min)) * r * .8).toFixed(1)},${(y + Math.sin(an(min)) * r * .8).toFixed(1)}" stroke="#c0281a" stroke-width="5" stroke-linecap="round"/><path d="M${x},${y} L${x},${y - r * .5}" stroke="#2a2a30" stroke-width="7" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="6" fill="#2a2a30"/>`;
  return s + `</g>`;
}
function sceneMoonFall(t) {
  const t0 = S0(6) - .2, T = t - t0, az = .3, ti = WS(6, 11) + .2;
  const cm = ease(ramp(t, t0, t0 + 2.2)), lonC = 10 - (t - S0(5) + .2) * 3;
  const G = gW(t, { d: lerp(22, 15.4, cm) - T * .08, el: lerp(.3, .2, cm), az, lon: lonC, clouds: lerp(.35, 0, cm), lights: lerp(.3, .1, cm), off: -.75, tg: [0, lerp(-.1, .55, cm), 0] });
  const st = lerp(.18, .4, ease(ramp(t, t0, S0(7))));
  Object.assign(F.w.disc, { star: st, glow: lerp(.4, .6, ramp(t, t0, S0(7))), gs: lerp(4, 4.6, ramp(t, t0, S0(7))), gc: [1, .42, .3] });
  F.w.cloud = { a: 1 - ease(ramp(t, t0, S0(7))), k: lerp(.42, .75, ease(ramp(t, t0, S0(7)))), R: 8, tilt: .1, spin: 2 + (t - S0(5) + .2) * .35 };
  const rt = [Math.cos(az), 0, -Math.sin(az)], P0 = [-rt[0] * 1.45, 2.4, -rt[2] * 1.45], dir = (() => { const l = Math.hypot(...P0); return P0.map(v => v / l); })(), P1 = dir.map(v => v * .98);
  const u = Math.pow(ease(ramp(t, WS(6, 5) - .2, ti)), 1.7), mp = [lerp(P0[0], P1[0], u), lerp(P0[1], P1[1], u), lerp(P0[2], P1[2], u)];
  if (t < ti) F.w.moon = { pos: mp, L: [-mp[0], -mp[1] + .3, -mp[2]], shC: NOFAR, shR: .001, r: .27, ex: 0, rot: .3 + t * .05, hot: .8 * Math.pow(u, 2) };
  let o = `<defs>${STDEFS()}</defs>`;
  const [ix, iy] = proj3(G.cam, P1);
  if (t > ti - .05) { const k = ramp(t, ti, ti + 1.3); o += `<circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${(60 + 260 * k).toFixed(1)}" fill="url(#flashG)" opacity="${(.95 * (1 - k)).toFixed(2)}"/>` + ring(ix, iy, ramp(t, ti, ti + 1.1), 40, 300, '#ffd9a0'); F.w.disc.glow += .5 * Math.pow(1 - k, 2); }
  if (t < ti) { const [mx, my] = proj3(G.cam, mp), la = ease(ramp(t, t0 + .4, t0 + .9)) * (1 - ease(ramp(t, WS(6, 6), WS(6, 7))));
    o += `<g opacity="${la.toFixed(2)}"><path d="M${(mx + 30).toFixed(1)},${(my + 26).toFixed(1)} L${(mx + 84).toFixed(1)},${(my + 86).toFixed(1)}" stroke="#dfe6f0" stroke-width="2.4"/>${lbl(mx + 104, my + 122, 'القمر', 1, '#dfe6f0', 26)}</g>`;
    // a hot trail behind it as it speeds up
    const [px, py] = proj3(G.cam, P0), tl = Math.pow(u, .8); if (u > .05) o += scr(`<path d="M${lerp(mx, px, .35 * tl).toFixed(1)},${lerp(my, py, .35 * tl).toFixed(1)} L${mx.toFixed(1)},${my.toFixed(1)}" stroke="#ff9a5a" stroke-width="${(10 + 30 * u).toFixed(1)}" stroke-linecap="round" opacity="${(.5 * u).toFixed(2)}" filter="url(#blur9)"/>`); }
  const ca = ease(ramp(t, WS(6, 5) - .4, WS(6, 5) + .1));
  o += clockI(360, 1090, 80, lerp(0, 43, ease(ramp(t, WS(6, 5) - .2, ti))), ca);
  F.ov = o; return space(t);
}

// ---------- 7: the oceans boil, the mountains melt, no life is left ----------
function sceneBoil(t) {
  const t0 = S0(7) - .2, T = t - t0, HZ = 800, bo = ease(ramp(t, WS(7, 0), WS(7, 1) + .4)), melt = ease(ramp(t, WS(7, 2) - .1, S0(8))), wo = ease(ramp(t, WS(7, 4), WS(7, 6) + .5));
  let s = `<defs>${STDEFS()}${CUDEF}<linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16060a"/><stop offset=".4" stop-color="#4a1008"/><stop offset=".78" stop-color="#c03a14"/><stop offset="1" stop-color="#ff9238"/></linearGradient>` +
    `<linearGradient id="bSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3414"/><stop offset=".12" stop-color="#4a160a"/><stop offset="1" stop-color="#12060a"/></linearGradient>` +
    `<radialGradient id="stG" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#fff2e6"/><stop offset=".55" stop-color="#f0c8b0"/><stop offset="1" stop-color="#b86a4a" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="lavaV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0a0"/><stop offset=".4" stop-color="#ff8a2a"/><stop offset="1" stop-color="#c0300c"/></linearGradient>` +
    `<filter id="steamF" x="-30%" y="-40%" width="160%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".018 .03" numOctaves="3" seed="5"/><feDisplacementMap in="SourceGraphic" scale="55" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="5"/></filter><radialGradient id="bubG" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#ffe0b0" stop-opacity=".9"/><stop offset=".5" stop-color="#c06a3a" stop-opacity=".25"/><stop offset="1" stop-color="#ffb070" stop-opacity=".8"/></radialGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="${HZ + 40}" fill="url(#bSky)"/>`;
  // the hydrogen still falling: glowing streaks and fireballs
  s += scr(`<g opacity=".55">${Array.from({ length: 5 }, (_, i) => { const x = 80 + i * 150 + Math.sin(t * .4 + i) * 20; return `<path d="M${x},-40 C${x - 60},200 ${x - 120},420 ${x - 200},${HZ}" stroke="#ff8a6a" stroke-width="${30 + i * 8}" fill="none" opacity=".25" filter="url(#blur12)"/>`; }).join('')}</g>`);
  { const r = RS(71); for (let i = 0; i < 9; i++) { const sp = .5 + .4 * r(), ph = (T * sp + r()) % 1, x0 = 80 + r() * 640, x = x0 - ph * 260, y = -40 + ph * (HZ - 120), L = 90 + 80 * r();
    s += scr(`<path d="M${x.toFixed(1)},${y.toFixed(1)} L${(x + L * .55).toFixed(1)},${(y - L).toFixed(1)}" stroke="#ffc890" stroke-width="5" stroke-linecap="round" opacity="${(.8 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="url(#flashG)" opacity="${(1 - ph).toFixed(2)}"/>`); } }
  // mountains that sag and run with lava
  const amp = lerp(230, 150, melt), mY = HZ - 60;
  s += mountainsR(mY, amp, 517, { rock: '#5a3024', base: '#1a0a08', shade: '#080204', shadeA: .5, az: 250, el: 20, k1: 1.2 });
  s += scr(`<rect x="-20" y="${mY - amp - 10}" width="760" height="${amp + 60}" fill="#ff5a1a" opacity="${(.12 + .3 * melt).toFixed(2)}"/>`);
  { const r = RS(91), n = Math.round(6 + 14 * melt); for (let i = 0; i < n; i++) { let x = 20 + r() * 680, y = mY - amp * (.45 + .45 * r()), d = `M${x.toFixed(1)},${y.toFixed(1)}`; const len = (.3 + .7 * r()) * clamp(melt * 1.6 - i / n * .6 + .4);
    for (let k = 0; k < 8; k++) { x += (r() - .5) * 26; y += (mY + 30 - y) * .13 * len + 4; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; }
    s += `<path d="${d}" stroke="#ff7a1a" stroke-width="${(5 + 6 * r()).toFixed(1)}" fill="none" opacity=".55" filter="url(#blur5)"/><path d="${d}" stroke="url(#lavaV)" stroke-width="${(2 + 2.5 * r()).toFixed(1)}" fill="none" stroke-linecap="round" stroke-dasharray="14 6" stroke-dashoffset="${(-T * 30).toFixed(1)}"/>`; } }
  s += `<rect x="-20" y="${mY + 10}" width="760" height="40" fill="#ff7a2a" opacity="${(.25 + .4 * melt).toFixed(2)}" filter="url(#blur9)"/>`;
  // a coastal city on the shore: dark facades lit from below by the glow, fires behind some windows
  s += `<defs><linearGradient id="bldF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0a08"/><stop offset=".7" stop-color="#2a100a"/><stop offset="1" stop-color="#6a2410"/></linearGradient></defs>`;
  { const r = RS(58); let x = -20; while (x < 740) { const w = 30 + r() * 46, h = 50 + r() * 150 * (1 - Math.abs(x - 360) / 640), y = HZ + 6 - h;
    s += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 10).toFixed(1)}" fill="url(#bldF)"/><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 10).toFixed(1)}" fill="#000" filter="url(#rockF)" opacity=".25"/>` +
      `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="2.5" fill="#ff9a4a" opacity=".75"/><rect x="${(x + w - 5).toFixed(1)}" y="${y.toFixed(1)}" width="5" height="${(h + 10).toFixed(1)}" fill="#ff7a2a" opacity=".3"/>`;
    if (r() < .35) s += `<path d="M${(x + w * .6).toFixed(1)},${y.toFixed(1)} v${(-14 - 20 * r()).toFixed(1)}" stroke="#1a0a08" stroke-width="2"/>`;
    for (let wy = y + 10; wy < HZ - 8; wy += 14) for (let wx = x + 5; wx < x + w - 8; wx += 11) { const q = r(); if (q < .3) s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="5" height="7" fill="${q < .08 ? '#ffd06a' : '#ff7a2a'}" opacity="${(q < .08 ? .9 : .35 + .3 * Math.sin(t * 7 + wx + wy)).toFixed(2)}"/>`; }
    if (r() < .25) { const fx = x + w * (.2 + .6 * r()); s += scr(`<path d="M${(fx - 10).toFixed(1)},${y.toFixed(1)} Q${fx.toFixed(1)},${(y - 30 - 10 * Math.sin(t * 9 + x)).toFixed(1)} ${(fx + 10).toFixed(1)},${y.toFixed(1)}Z" fill="#ffb040" opacity=".85" filter="url(#blur2)"/>`); }
    x += w + 2 + r() * 8; } }
  // its reflection, broken by the boiling water
  s += `<rect x="-20" y="${HZ}" width="760" height="60" fill="#ff8a3a" opacity=".18" filter="url(#blur9)"/>`;
  // the boiling sea
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#bSea)"/>`;
  { const r = RS(19); for (let i = 0; i < 70; i++) { const y = HZ + 6 + Math.pow(r(), 1.6) * 470, w = 20 + (y - HZ) * .25 * r(), x = r() * 760 - 20 + Math.sin(t * 2 + i) * 6;
    s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} h${w.toFixed(1)}" stroke="#ff9a4a" stroke-width="${(1 + (y - HZ) / 200).toFixed(1)}" opacity="${(.15 + .35 * r()).toFixed(2)}"/>`; } }
  { const r = RS(23), n = Math.round(90 * bo); for (let i = 0; i < n; i++) { const x0 = r() * 720, y0 = HZ + 20 + Math.pow(r(), 1.3) * 450, sz = (2 + 9 * r()) * (.4 + (y0 - HZ) / 300), ph = (T * (.8 + r()) + r()) % 1, y = y0 - ph * 10;
    s += ph < .85 ? `<circle cx="${x0.toFixed(1)}" cy="${y.toFixed(1)}" r="${(sz * (.4 + ph)).toFixed(1)}" fill="url(#bubG)" opacity="${(.85).toFixed(2)}"/>` : `<circle cx="${x0.toFixed(1)}" cy="${y.toFixed(1)}" r="${(sz * 1.8).toFixed(1)}" fill="none" stroke="#ffd0a0" stroke-width="1.5" opacity=".6"/>`; } }
  // steam rising off the water: wispy columns (puffs warped by turbulence), lit orange from below, fading as they rise
  { const r = RS(37), cols = Math.round(16 * bo); let st = ''; for (let c = 0; c < cols; c++) { const x0 = r() * 760 - 20, yb = HZ + 40 + Math.pow(r(), 1.2) * 380, sc = .5 + (yb - HZ) / 420, sp = .5 + .4 * r(), ph0 = r();
      for (let k = 0; k < 7; k++) { const ph = (T * sp * .35 + ph0 + k / 7) % 1, y = yb - ph * (260 + 200 * sc), w = (26 + 70 * ph) * sc * (.8 + .4 * r()), x = x0 + Math.sin(ph * 5 + c) * 18 * sc + ph * 30;
        st += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .75).toFixed(1)}" fill="url(#stG)" opacity="${(.42 * Math.sin(Math.min(1, ph * 1.4) * Math.PI) * bo).toFixed(2)}"/>`; } }
    s += `<g filter="url(#steamF)">${st}</g>`; }
  s += `<rect x="-20" y="${HZ - 40}" width="760" height="120" fill="#ffd8c0" opacity="${(.22 * bo).toFixed(2)}" filter="url(#blur12)"/>`;
  // the heat whites everything out (stops short of white, see style.md)
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ffd2a0" opacity="${(.62 * wo).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: millions of years later its core ignites: a red star the size of Jupiter ----------
function sceneIgnite(t) {
  const t0 = S0(8) - .2, T = t - t0, az = .3, ig = WS(8, 3), wd = ease(ramp(t, WS(8, 6) - .3, WS(8, 8) + .3));
  const rt = [Math.cos(az), 0, -Math.sin(az)], off = 1.25 * wd;
  const G = gW(t, { d: lerp(8.6, 15.5, wd), el: .1, az, lon: 40 - T * 3, clouds: 0, lights: 0, off: -.75, tg: [rt[0] * off, -.1, rt[2] * off] });
  const st = lerp(.45, 1, ease(ramp(t, ig - .3, ig + 1.2))), fl = t > ig ? Math.pow(1 - ramp(t, ig, ig + 1.4), 2) : 0;
  Object.assign(F.w.disc, { star: st, glow: lerp(.5, .9, ease(ramp(t, ig, ig + 1))) + .6 * fl, gs: lerp(4.4, 6.2, ease(ramp(t, ig, ig + 1))) + 3 * fl, gc: [1, .42, .2] });
  const jp = [rt[0] * 2.5, 0, rt[2] * 2.5];
  if (wd > 0) F.w.moon = { pos: jp, L: [-1, .25, .5], shC: NOFAR, shR: .001, r: 1, ex: 0, jup: 1, rot: t * .05 };
  F.w.L = [-1, .25, .5];
  let o = `<defs>${STDEFS()}</defs>`;
  if (t > ig - .05) o += ring(G.c0[0], G.c0[1], ramp(t, ig, ig + 1.2), G.R, 300, '#ffb070');
  if (wd > 0) { const [jx, jy, jR] = fit3(G.cam, jp, 1), la = ease(ramp(t, WS(8, 8), WS(8, 9) + .3));
    o += `<g opacity="${la.toFixed(2)}">${lbl(jx, jy + jR + 60, 'المشتري', 1, '#e8d8c0', 28)}${lbl(G.c0[0], G.c0[1] + G.R + 60, 'النجمُ الجديد', 1, '#ff9a6a', 28)}` +
      `</g>`; const ea = ease(ramp(t, WS(8, 9), WS(8, 9) + .4)), er = jR / 11, ey = jy + jR + 130;
    o += `<g opacity="${ea.toFixed(2)}"><image href="${EICO[0]}" x="${(jx - er).toFixed(1)}" y="${(ey - er).toFixed(1)}" width="${(2 * er).toFixed(1)}" height="${(2 * er).toFixed(1)}"/>${lbl(jx, ey + er + 34, 'الأرضُ اليوم', 1, '#9fd0ff', 22)}</g>`; }
  F.ov = o; return space(t);
}
