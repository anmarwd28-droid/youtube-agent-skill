// ===================== "what if land and oceans swapped places?" (Short #41) =====================
// The Earth is the gl3d_world disc-globe (m = 1) with gl3d_sw.js: `swap` sweeps the swapped texture (tex/swap_tex.py) in from the north pole,
// `ridgeA` lights the mid-ocean ridge in gold, `trenchA` the Mariana trench, `heat` tints the equator red and the poles blue.
const WDEF = `<linearGradient id="rockW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b88a60"/><stop offset="1" stop-color="#7a5236"/></linearGradient>` +
  `<linearGradient id="rockE" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#5a3c28"/><stop offset="1" stop-color="#3a2618"/></linearGradient>` +
  `<linearGradient id="deepH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab4cc" stop-opacity="0"/><stop offset="1" stop-color="#4a5e78" stop-opacity=".55"/></linearGradient>` +
  `<linearGradient id="hotSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86c4"/><stop offset=".55" stop-color="#a9c6de"/><stop offset="1" stop-color="#f2e4c4"/></linearGradient>` +
  `<linearGradient id="redSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a94c2"/><stop offset=".5" stop-color="#d8c8a8"/><stop offset="1" stop-color="#f4d6a0"/></linearGradient>` +
  `<linearGradient id="evS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8dee8"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#9aa6b8"/></linearGradient>` +
  `<linearGradient id="evR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8076"/><stop offset=".5" stop-color="#6a625a"/><stop offset="1" stop-color="#3e3832"/></linearGradient>` +
  `<linearGradient id="waterB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8ac8"/><stop offset="1" stop-color="#14467a"/></linearGradient>` +
  `<linearGradient id="landB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2bf86"/><stop offset="1" stop-color="#a87a48"/></linearGradient>` +
  `<radialGradient id="sunW"><stop offset="0" stop-color="#fffbe8" stop-opacity=".9"/><stop offset=".3" stop-color="#ffe9b0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>` +
  `<filter id="grainS" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="hazeW" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".006 .03" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>`;
const WDEFS = () => `${DEFS()}${WDEF}`;

// ---------- the globe: o.lon = the longitude facing the camera, o.el = camera elevation (rad), o.d = distance ----------
function gW(t, o = {}) {
  const az = o.az ?? .3, el = o.el ?? .28, d = o.d ?? 10.4, tg = o.tg || [0, .09, 0];
  const cam = orbit(d, el, az, tg, o.fov ?? 30), spin = az - ((o.lon ?? 0) + 180) * Math.PI / 180;
  const L = sunFor(az, o.off ?? -.6, o.up ?? .5);
  F.w = { set: 'space', cam, L, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .3, swap: o.swap || 0, ridgeA: o.ridgeA || 0, trenchA: o.trenchA || 0, heat: o.heat || 0 } };
  F.earth = null; F.moon = null; F.sun = null;
  const P = (la, lo, h = 1) => proj3(cam, geo3(la, lo + 180, spin, h)), vis = (la, lo) => { const n = geo3(la, lo + 180, spin, 1), v = [cam.pos[0] - n[0], cam.pos[1] - n[1], cam.pos[2] - n[2]], l = Math.hypot(...v); return (n[0] * v[0] + n[1] * v[1] + n[2] * v[2]) / l; };
  const c0 = proj3(cam, [0, 0, 0]), cN = Math.hypot(...cam.pos.map((x, i) => x)), R = c0[2] / Math.sqrt(1 - 1 / (cN * cN));
  return { cam, spin, P, vis, c0, R };
}
// a label pinned to a place on the globe, hidden on the far side
const pin = (G, la, lo, tx, a, col = '#fff', fs = 30) => { const v = G.vis(la, lo); if (v < .15 || a <= 0) return ''; const [x, y] = G.P(la, lo); return lbl(x, y, tx, (a * clamp((v - .15) / .2)).toFixed(2), col, fs); };
// a path along lat/lon points on the globe (only the visible part), with a moving dash
function gPath(G, pts, o = {}) {
  let d = '', on = false, last = null;
  for (let i = 0; i < pts.length - 1; i++) for (let k = 0; k < 8; k++) { const f = k / 8, la = lerp(pts[i][0], pts[i + 1][0], f), lo = lerp(pts[i][1], pts[i + 1][1], f);
    if (G.vis(la, lo) < .05) { on = false; continue; } const [x, y] = G.P(la, lo, 1.012); d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; last = [x, y]; }
  return { d, last };
}

// ---------- bars: water vs land share ----------
function shareBar(y, pW, a) {
  if (a <= 0) return ''; const x0 = 70, w = 580, h = 70, wW = w * pW;
  return `<g opacity="${a.toFixed(2)}">` + panel(40, y - 70, 640, 190, a) +
    `<clipPath id="barC"><rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="18"/></clipPath><g clip-path="url(#barC)">` +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h}" fill="url(#landB)"/><rect x="${x0}" y="${y}" width="${w}" height="${h}" fill="#000" filter="url(#grainS)" opacity=".35"/>` +
    `<rect x="${x0 + w - wW}" y="${y}" width="${wW.toFixed(1)}" height="${h}" fill="url(#waterB)"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x0 + w - wW},${y + 12 + i * 10} q12,-5 24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0" stroke="#fff" stroke-width="1.4" fill="none" opacity=".16"/>`).join('') +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h * .45}" fill="#fff" opacity=".12"/></g>` +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="#f4c76b" stroke-width="3"/>` +
    lbl(x0 + w - wW / 2, y - 18, `ماء ${AR(Math.round(pW * 100))}٪`, 1, '#9fd0ff', 32) + lbl(x0 + (w - wW) / 2, y - 18, `يابسة ${AR(Math.round((1 - pW) * 100))}٪`, 1, '#f4d29a', 32) + `</g>`;
}

// ---------- a path filled with lit rock (fractal noise through a diffuse light, like mountainsR) ----------
function litRock(d, id, c1, c2, seed, o = {}) {
  const fx = o.fx ?? .018, fy = o.fy ?? .006, sc = o.sc ?? 5;
  return `<defs><clipPath id="lc${id}"><path d="${d}"/></clipPath><linearGradient id="lg${id}" x1="0" y1="0" x2="${o.gx ?? 0}" y2="${o.gy ?? 1}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>` +
    `<filter id="lf${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="6" seed="${seed}" result="n"/><feDiffuseLighting in="n" surfaceScale="${sc}" lighting-color="#ffffff" result="l"><feDistantLight azimuth="${o.az ?? 205}" elevation="${o.el ?? 36}"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="${o.k1 ?? 1.4}" k2="0" k3="0" k4="0"/></filter></defs>` +
    `<g clip-path="url(#lc${id})"><rect x="${o.x ?? -40}" y="${o.y ?? -40}" width="${o.w ?? 800}" height="${o.h ?? 1360}" fill="url(#lg${id})" filter="url(#lf${id})"/></g>`;
}
// a jagged line between two points (ledges and notches), as an array of points
function jag(x0, y0, x1, y1, n, amp, seed, bow = 0) { const r = RS(seed), p = []; for (let i = 0; i <= n; i++) { const f = i / n, e = i === 0 || i === n ? 0 : 1; p.push([lerp(x0, x1, f) + bow * Math.sin(f * Math.PI) + e * (r() - .5) * amp, lerp(y0, y1, f) + e * (r() - .5) * amp * .4]); } return p; }
// ---------- the Mariana valley in cross-section, with Everest dropped inside ----------
// rim at y = 470, valley floor at 1170 (11 km -> 700 px, 63.6 px/km); Everest 8.85 km -> 563 px
function valleyX(t, a, ev, gap) {
  if (a <= 0) return ''; const RIM = 470, BOT = 1170, k = 700 / 11;
  let s = `<g opacity="${a.toFixed(2)}"><rect x="-20" y="-20" width="760" height="1320" fill="url(#redSky)"/>`;
  s += `<circle cx="560" cy="300" r="140" fill="url(#sunW)"/><circle cx="560" cy="300" r="46" fill="#fff4cf" opacity=".45" filter="url(#blur9)"/><circle cx="560" cy="300" r="22" fill="#fffdf2"/>`;
  // the far rim of the valley (back wall, hazy) and the plains beyond
  s += `<path d="M-20,${RIM - 30} C120,${RIM - 44} 260,${RIM - 26} 380,${RIM - 38} C500,${RIM - 50} 620,${RIM - 30} 740,${RIM - 40} L740,${RIM + 10} L-20,${RIM + 10}Z" fill="#c8a47a"/>` + mountainsR(RIM - 36, 40, 412, { rock: '#b89a7c', haze: .5, hazeCol: '#e0cdb4' });
  // back wall of the valley (far side, in haze), lit rock with strata
  const back = `M40,${RIM} C120,${RIM + 200} 200,${RIM + 470} 270,${BOT} L450,${BOT} C520,${RIM + 470} 600,${RIM + 200} 680,${RIM}Z`;
  s += litRock(back, 'vb', '#a88466', '#6a5446', 31, { fx: .012, fy: .03, sc: 4 });
  for (let i = 0; i < 16; i++) { const y = RIM + 20 + i * 44, w0 = 640 - (y - RIM) / (BOT - RIM) * 450; s += `<path d="M${360 - w0 / 2},${y} q${w0 / 4},${(-8 + (i % 3) * 5)} ${w0 / 2},0 t${w0 / 2},0" stroke="${i % 2 ? '#5a3c28' : '#c8a07a'}" stroke-width="${5 + (i % 4) * 3}" fill="none" opacity=".22"/>`; }
  s += `<path d="${back}" fill="url(#deepH)"/>`;
  // Everest, lowered in from above: lit rock, a shaded east face, snow fields with streaks down the gullies
  const ey = BOT - (1 - ev) * 800 - 6, H = 8.85 * k, top = ey - H;
  if (ev > 0) { const ex = 360, r = RS(88), pts = [];
    const sil = [[-310, 0], [-250, .12], [-200, .2], [-160, .34], [-120, .4], [-80, .58], [-50, .66], [-22, .86], [0, 1], [26, .9], [48, .8], [70, .82], [110, .66], [150, .55], [190, .5], [230, .32], [270, .16], [310, 0]];
    sil.forEach(([dx, f], i) => { pts.push([ex + dx, ey - H * f]); if (i < sil.length - 1) { const [dx2, f2] = sil[i + 1]; for (let q = 1; q < 4; q++) pts.push([ex + lerp(dx, dx2, q / 4) + (r() - .5) * 6, ey - H * lerp(f, f2, q / 4) + (r() - .5) * H * .02]); } });
    const body = `M${pts.map(PT).join(' L')}Z`, si = pts.findIndex(p => p[1] === top);
    s += `<ellipse cx="${ex}" cy="${ey + 8}" rx="330" ry="22" fill="#000" opacity=".35" filter="url(#blur9)"/>` + litRock(body, 'ev' + Math.round(ey), '#9a9288', '#4e4842', 41, { fx: .03, fy: .012, sc: 7, x: ex - 320, y: top - 10, w: 640, h: H + 30 });
    // the east face in shade: from the summit down a ridge to the base
    const spine = jag(ex, top, ex + 30, ey, 10, 18, 42);
    s += `<path d="M${pts.slice(si).map(PT).join(' L')} L${spine.slice().reverse().map(PT).join(' L')}Z" fill="#1a1e2a" opacity=".42"/>`;
    // snow: above about 55% of the height, with a jagged snow line and tongues down the gullies
    const snowY = f => ey - H * f; let sn = `M${pts.filter(p => p[1] < snowY(.52)).map(PT).join(' L')}`; const sl = jag(ex + 150, snowY(.52), ex - 150, snowY(.52), 16, 40, 43);
    sl.forEach((p, i) => { sn += ` L${PT(p)}`; if (i % 3 === 1) sn += ` L${(p[0] - 6).toFixed(1)},${(p[1] + 40 + r() * 70).toFixed(1)} L${(p[0] - 14).toFixed(1)},${(p[1] + 4).toFixed(1)}`; });
    s += `<defs><clipPath id="evc"><path d="${body}"/></clipPath></defs><g clip-path="url(#evc)">` + litRock(sn + 'Z', 'evs' + Math.round(ey), '#ffffff', '#c6d0de', 44, { fx: .05, fy: .02, sc: 3, k1: 1.15, x: ex - 320, y: top - 10, w: 640, h: H * .6 }) +
      `<path d="M${pts.slice(si).map(PT).join(' L')} L${spine.slice().reverse().map(PT).join(' L')}Z" fill="#30405a" opacity=".3"/>` +
      Array.from({ length: 9 }, (_, i) => { const x0 = ex - 200 + i * 48 + r() * 20, y0 = snowY(.5 - r() * .1); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} l${(-4 + r() * 8).toFixed(1)},${(30 + r() * 80).toFixed(1)}" stroke="#eef2f8" stroke-width="${(1 + r() * 1.5).toFixed(1)}" opacity=".28"/>`; }).join('') + `</g>`;
    s += `<path d="M${spine.map(PT).join(' L')}" stroke="#d8dee8" stroke-width="2" fill="none" opacity=".35"/>`; }
  // front walls (cut faces of the section): jagged edges, lit left, shaded right, strata
  const eL = jag(40, RIM, 270, BOT, 14, 26, 5, 30), eR = jag(680, RIM, 450, BOT, 14, 26, 6, -30);
  const wallL = `M-30,${RIM - 2} L${eL.map(PT).join(' L')} L-30,${BOT + 140}Z`, wallR = `M750,${RIM - 2} L${eR.map(PT).join(' L')} L750,${BOT + 140}Z`;
  s += litRock(wallL, 'wl', '#d2a274', '#7a5034', 32, { fx: .02, fy: .05, sc: 6 }) + litRock(wallR, 'wr', '#7a5a42', '#2e1e14', 33, { fx: .02, fy: .05, sc: 6, k1: 1.25 });
  s += `<g clip-path="url(#lcwl)">` + Array.from({ length: 18 }, (_, i) => { const y = RIM + 14 + i * 42 + (i % 3) * 6; return `<path d="M-20,${y} q60,${(i % 2 ? 6 : -6)} 120,0 t120,0 t120,0" stroke="${i % 2 ? '#5a3a24' : '#f0c898'}" stroke-width="${3 + (i % 3) * 3}" fill="none" opacity=".28"/>`; }).join('') + `</g>`;
  s += `<g clip-path="url(#lcwr)">` + Array.from({ length: 18 }, (_, i) => { const y = RIM + 14 + i * 42 + (i % 3) * 6; return `<path d="M740,${y} q-60,${(i % 2 ? -6 : 6)} -120,0 t-120,0 t-120,0" stroke="${i % 2 ? '#1a100a' : '#8a6a50'}" stroke-width="${3 + (i % 3) * 3}" fill="none" opacity=".3"/>`; }).join('') + `</g>`;
  s += `<path d="M${eL.map(PT).join(' L')}" stroke="#f6d8b0" stroke-width="3" fill="none" opacity=".5"/><path d="M${eR.map(PT).join(' L')}" stroke="#000" stroke-width="4" fill="none" opacity=".35"/>`;
  s += `<path d="M-20,${BOT} L740,${BOT} L740,1300 L-20,1300Z" fill="#4a3424"/>` + litRock(`M240,${BOT + 4} C300,${BOT - 26} 420,${BOT - 24} 480,${BOT + 4}Z`, 'vt', '#8a6a50', '#5a4030', 34, { fx: .05, fy: .08, sc: 3 });
  // the surface on both sides (the old ocean floor, now dry land)
  s += `<path d="M-20,${RIM - 6} L40,${RIM - 4} L40,${RIM + 4} L-20,${RIM + 4}Z" fill="#e2c08e"/><path d="M680,${RIM - 4} L740,${RIM - 6} L740,${RIM + 4} L680,${RIM + 4}Z" fill="#a88a62"/>`;
  // dimension lines
  const d1 = ease(ramp(t, WS(4, 5) - .2, WS(4, 7))), d2 = ease(ramp(t, WS(4, 13), WS(4, 15)));
  if (d1 > 0) s += `<g opacity="${d1.toFixed(2)}"><path d="M640,${RIM} L640,${RIM + (BOT - RIM) * d1}" stroke="#f4c76b" stroke-width="4"/><path d="M620,${RIM} L660,${RIM} M620,${BOT} L660,${BOT}" stroke="#f4c76b" stroke-width="4" opacity="${d1 > .98 ? 1 : 0}"/>` + lbl(620, (RIM + BOT) / 2, '١١ كم', 1, '#f4c76b', 40, 'end') + `</g>`;
  if (ev > .98) { const q = ease(ramp(t, WS(4, 11) + .5, WS(4, 12) + .2)); s += `<g opacity="${q.toFixed(2)}"><path d="M120,${top} L120,${BOT}" stroke="#fff" stroke-width="3"/><path d="M104,${top} L136,${top} M104,${BOT} L136,${BOT}" stroke="#fff" stroke-width="3"/>` + lbl(140, (top + BOT) / 2 + 60, 'إيفرست ٨٫٨ كم', 1, '#fff', 30, 'start') + `</g>`; }
  if (d2 > 0) s += `<g opacity="${d2.toFixed(2)}"><path d="M200,${RIM} L520,${RIM}" stroke="#ff6a4a" stroke-width="4" stroke-dasharray="14 10"/><path d="M360,${RIM + 6} L360,${top - 6}" stroke="#ff6a4a" stroke-width="3"/>` + lbl(380, (RIM + top) / 2 + 12, 'أكثرُ من ٢ كم', 1, '#ff8a6a', 30, 'start') + `</g>`;
  s += lbl(110, RIM - 22, 'السطح', 1, '#fff', 26);
  return s + `</g>`;
}

// ---------- desert dunes: layered, a gradient on each, soft slip faces in shade below the crests, ripples, haze ----------
function dunes(t, o = {}) {
  const sd = o.seed || 1, y0 = o.y0 ?? 700, n = o.n ?? 6, id = 'd' + sd;
  let s = '', defs = '';
  for (let i = 0; i < n; i++) { const r = RS(sd * 31 + i), k = i / (n - 1), base = y0 + Math.pow(k, 1.5) * 560, amp = 14 + k * 60, fr = .006 + r() * .004, ph = r() * 9, ph2 = r() * 9;
    const cy = x => base - amp * (.55 * Math.sin(x * fr + ph) + .3 * Math.sin(x * fr * 2.3 + ph2) + .15 * Math.sin(x * fr * 5.1 + ph * 2));
    const xs = []; for (let x = -30; x <= 750; x += 6) xs.push(x);
    const crest = xs.map(x => [x, cy(x)]), d = `M-30,1300 L${crest.map(PT).join(' L')} L750,1300Z`;
    const lit = mix(o.lit || '#e8c48a', o.haze || '#e9d8bc', (1 - k) * .75), low = mix(o.low || '#cf9a5e', o.haze || '#e9d8bc', (1 - k) * .7), dark = mix(o.dark || '#a86e3c', o.haze || '#e9d8bc', (1 - k) * .65);
    defs += `<linearGradient id="${id}g${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit}"/><stop offset="1" stop-color="${low}"/></linearGradient>`;
    s += `<path d="${d}" fill="url(#${id}g${i})"/>`;
    // slip face: a continuous band under the crest, as deep as the crest falls away from the sun (sun on the left)
    const dep = xs.map(x => { const sl = (cy(x + 4) - cy(x - 4)) / 8; return clamp(sl * 2.2, 0, 1) * (16 + amp * 1.1); });
    for (let q = 2; q < dep.length - 2; q++) dep[q] = (dep[q - 2] + dep[q - 1] + dep[q] + dep[q + 1] + dep[q + 2]) / 5;
    s += `<path d="M${crest.map(PT).join(' L')} L${xs.map((x, q) => [x, cy(x) + dep[q]]).reverse().map(PT).join(' L')}Z" fill="${dark}" opacity=".62" filter="url(#blur2)"/>`;
    s += `<path d="M${crest.map(PT).join(' L')}" stroke="#fff6e0" stroke-width="${(1 + k * 1.4).toFixed(1)}" fill="none" opacity="${(.3 + .3 * k).toFixed(2)}"/>`;
    if (k > .45) for (let q = 0; q < 8; q++) { const yy = 22 + q * (9 + k * 9); let rp = ''; for (let x = -30; x <= 750; x += 14) rp += (x === -30 ? 'M' : ' L') + x + ',' + (cy(x) + yy + 3 * Math.sin(x * .06 + q * 1.7)).toFixed(1); s += `<path d="${rp}" stroke="${dark}" stroke-width="1.2" fill="none" opacity="${(.16 * k).toFixed(2)}"/>`; }
    s += `<path d="${d}" fill="#000" filter="url(#grainS)" opacity="${(.1 + .16 * k).toFixed(2)}"/>`;
  }
  return `<defs>${defs}</defs>` + s;
}
// mesas and buttes: lit red rock with strata, a shaded side, erosion streaks and a talus apron at the foot
function mesas(yb, seed, rock, hmax, o = {}) {
  const r = RS(seed); let s = '', x = -60 + r() * 40, n = 0;
  while (x < 760) { const w = 80 + r() * 170, h = hmax * (.45 + r() * .55), sl = 8 + r() * 16, tal = h * (.25 + r() * .15), id = 'm' + seed + '_' + (n++);
    const top = yb - h, P = jag(x + sl, top, x + w - sl, top, 6, 5, seed + n);
    const body = `M${x - tal * .6},${yb} L${x + sl * .3},${yb - tal} L${x + sl * .5},${top + h * .3} L${PT(P[0])} L${P.slice(1).map(PT).join(' L')} L${x + w - sl * .4},${top + h * .35} L${x + w - sl * .2},${yb - tal} L${x + w + tal * .7},${yb}Z`;
    s += litRock(body, id, mix(rock, '#ffffff', .12), mix(rock, '#3a1408', .35), seed * 7 + n, { fx: .03, fy: .006, sc: 4, x: x - tal, y: top - 6, w: w + tal * 2, h: h + 12 });
    s += `<defs><clipPath id="c${id}"><path d="${body}"/></clipPath></defs><g clip-path="url(#c${id})">` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${x - tal},${(top + (i + .5) * h / 9).toFixed(1)} L${x + w + tal},${(top + (i + .5) * h / 9 + (i % 2 ? 2 : -2)).toFixed(1)}" stroke="${i % 3 ? '#5a1e0a' : '#f4c090'}" stroke-width="${(1.5 + (i % 3) * 1.8).toFixed(1)}" opacity=".3"/>`).join('') +
      Array.from({ length: Math.floor(w / 14) }, () => { const sx = x + sl + r() * (w - 2 * sl); return `<path d="M${sx.toFixed(1)},${(top + 4).toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(h * (.3 + r() * .5)).toFixed(1)}" stroke="#3a1408" stroke-width="${(1 + r() * 2).toFixed(1)}" opacity=".25"/>`; }).join('') +
      `<path d="M${x + w * .62},${top - 4} L${x + w + tal},${top - 4} L${x + w + tal},${yb + 2} L${x + w * .7},${yb + 2}Z" fill="#2a0e04" opacity=".32"/>` +
      `<path d="M${x - tal},${yb - tal} Q${x + w / 2},${yb - tal * 1.25} ${x + w + tal},${yb - tal} L${x + w + tal},${yb + 2} L${x - tal},${yb + 2}Z" fill="${mix(rock, '#f0c898', .45)}" opacity=".45"/>` +
      `<path d="M${PT(P[0])} L${P.slice(1).map(PT).join(' L')}" stroke="#ffe0b8" stroke-width="2.5" fill="none" opacity=".45"/></g>`;
    if (o.haze) s += `<path d="${body}" fill="${o.hazeCol || '#f2d2aa'}" opacity="${o.haze}"/>`;
    x += w + 30 + r() * 120; }
  return s;
}
function thermo(x, y, v, a, lab) {
  if (a <= 0) return ''; const top = y - 330, bot = y, k = clamp((v + 20) / 70), lev = bot - 30 - k * (bot - 60 - top), hot = mix('#3a8ae0', '#e8402a', k);
  let s = `<g opacity="${a.toFixed(2)}">` + panel(x - 70, top - 30, 140, 470, a);
  s += `<rect x="${x - 14}" y="${top}" width="28" height="${bot - top - 10}" rx="14" fill="#e8eef4" opacity=".9"/><circle cx="${x}" cy="${bot - 10}" r="30" fill="${hot}"/><rect x="${x - 7}" y="${lev}" width="14" height="${bot - 10 - lev}" fill="${hot}"/>` +
    `<rect x="${x - 10}" y="${top + 6}" width="5" height="${bot - top - 30}" rx="2" fill="#fff" opacity=".6"/>`;
  [-10, 0, 20, 45].forEach(q => { const yy = bot - 30 - clamp((q + 20) / 70) * (bot - 60 - top); s += `<path d="M${x + 16},${yy} L${x + 28},${yy}" stroke="#fff" stroke-width="2"/>`; });
  return s + lbl(x, top - 46, lab, 1, v > 15 ? '#ffb08a' : '#a8d4ff', 34) + `</g>`;
}
// snow on the street (under the people): white pavement and road with tracks, drifts at the walls, caps on the awnings
function snowGround(t, k) {
  if (k <= 0) return ''; const r = RS(5);
  let s = `<g opacity="${k.toFixed(2)}"><rect x="-200" y="${PV - 6}" width="1120" height="${KB - PV + 8}" fill="#eef2f7"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#9ab0c8" filter="url(#grainR)" opacity=".18"/>`;
  let dr = `M-20,${PV + 4}`; for (let x = -20; x <= 740; x += 20) dr += ` L${x},${(PV - 8 - 12 * Math.abs(Math.sin(x * .021 + 1)) - 6 * r()).toFixed(1)}`; s += `<path d="${dr} L740,${PV + 8} L-20,${PV + 8}Z" fill="#f6f8fb"/><path d="${dr}" stroke="#b8c8dc" stroke-width="3" fill="none" opacity=".6"/>`;
  SHOPW.forEach(([sx, sw]) => { s += `<path d="M${sx - 6},${PV - 97} q${sw / 2 + 6},-14 ${sw + 12},0 Z" fill="#f8fafc"/><path d="M${sx - 6},${PV - 97} q${sw / 2 + 6},-14 ${sw + 12},0" stroke="#b8c8dc" stroke-width="2" fill="none"/>`; });
  for (let i = 0; i < 26; i++) { const x = r() * 720, y = PV + 14 + r() * 80; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="7" ry="3" fill="#8aa0b8" opacity=".35"/>`; }
  s += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#e6ebf2"/><rect x="-20" y="1160" width="760" height="20" fill="#9aa6b6" opacity=".55" filter="url(#blur2)"/><rect x="-20" y="1236" width="760" height="18" fill="#9aa6b6" opacity=".55" filter="url(#blur2)"/>`;
  return s + `</g>`;
}
function snowTrees() { let s = ''; [[100, 280], [604, 296]].forEach(([x, h]) => { const r = RS(x), cy = PV + 60 - h * .72;
  for (let i = 0; i < 16; i++) { const a = r() * 6.28, d = r() * h * .3; s += `<ellipse cx="${(x + Math.cos(a) * d * 1.1).toFixed(1)}" cy="${(cy + Math.sin(a) * d * .8 - 10).toFixed(1)}" rx="${(10 + r() * 16).toFixed(1)}" ry="${(5 + r() * 6).toFixed(1)}" fill="#f6f9fc" opacity="${(.55 + .35 * r()).toFixed(2)}" filter="url(#blur2)"/>`; } });
  return s; }
function snowFall(t, k, n = 170) {
  if (k <= 0) return ''; const r = RS(77); let s = '';
  for (let i = 0; i < n; i++) { const z = .4 + r() * .9, x = pmod(r() * 760 + Math.sin(t * .8 + i) * 14 * z, 760) - 20, y = pmod(r() * 1300 + t * 90 * z, 1300) - 10; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 * z + .6).toFixed(1)}" fill="#fff" opacity="${(k * (.45 + .4 * z)).toFixed(2)}"/>`; }
  return s;
}

// ===================== scenes =====================
// 0: the Earth, and the swap sweeps over it from the north pole
function sceneHook(t) {
  const sw = ease(ramp(t, .05, 2.5));
  gW(t, { d: 7.4, el: .3, lon: -22 - t * 2.2, swap: sw, clouds: .45 - .2 * sw, lights: .3 });
  F.ov = ''; return space(t);
}
// 1: today 71% water; after the swap less than a third
function sceneShare(t) {
  const back = ease(ramp(t, S0(1) - .2, S0(1) + .5)), fwd = ease(ramp(t, WS(1, 9), WS(1, 12) + .4)), sw = (1 - back) + fwd;
  gW(t, { d: 10.2, el: .3, lon: -30 - (t - S0(1)) * 2.5, tg: [0, -.32, 0], swap: clamp(sw), clouds: .45 - .2 * clamp(sw) });
  const pW = lerp(.71, .29, ease(ramp(t, WS(1, 11), WS(1, 16)))), a = ease(ramp(t, S0(1), S0(1) + .5));
  F.ov = `<defs>${WDEFS()}</defs>` + shareBar(1060, pW, a); return space(t);
}
// 2: the ocean floors are all joined: one giant continent, and the continents become closed seas
function sceneOne(t) {
  const T = t - S0(2) + .2, lon = 25 - T * 13;
  const G = gW(t, { d: 8.8, el: .22, lon, swap: 1, clouds: .25 });
  const a = ease(ramp(t, WS(2, 9) - .2, WS(2, 10) + .2));
  F.ov = pin(G, 4, 20, 'أفريقيا', a, '#ffffff', 34) + pin(G, -14, -58, 'أمريكا الجنوبية', a, '#ffffff', 30) + pin(G, 44, -100, 'أمريكا الشمالية', a, '#ffffff', 30) + pin(G, 50, 15, 'أوروبا', a, '#ffffff', 28);
  return space(t);
}
// 3: the mid-ocean ridge, 65,000 km, lit in gold
function sceneRidge(t) {
  const T = t - S0(3) + .2, g = ease(ramp(t, WS(3, 3), WS(3, 6)));
  gW(t, { d: 8.6 - T * .18, el: .12, lon: -32 - T * 1.5, swap: 1, clouds: .22, ridgeA: 1.25 * g });
  F.ov = ''; return space(t);
}
// 4: the Mariana trench becomes a valley 11 km deep; Everest would not reach its rim
function sceneTrench(t) {
  const T = t - S0(4) + .2, z = ease(ramp(t, S0(4) - .2, WS(4, 3)));
  gW(t, { d: lerp(8.4, 4.2, z), el: lerp(.2, .26, z), lon: lerp(170, 143, z), swap: 1, clouds: .2, trenchA: 1.2 * ease(ramp(t, S0(4), WS(4, 1) + .3)) });
  const a = ease(ramp(t, WS(4, 3) - .3, WS(4, 3) + .4)), ev = ease(ramp(t, WS(4, 10), WS(4, 11) + .35));
  F.ov = `<defs>${WDEFS()}</defs>` + valleyX(t, a, ev, 0); return space(t);
}
// 5: less water, less rain (the clouds thin out over the supercontinent)
function sceneDry(t) {
  const T = t - S0(5) + .2, cl = ease(ramp(t, WS(5, 4), WS(5, 6) + .3));
  gW(t, { d: 8.6, el: .05, lon: -150 - T * 2, swap: 1, clouds: .3 - .24 * cl });
  F.ov = ''; return space(t);
}
// 5b: the heart of the continent, thousands of kilometres from any sea: endless desert
function sceneSand(t) {
  const W2 = t - WS(5, 7) + .4, x = 110 + W2 * 30, y = 1062 + Math.sin(x * .004) * 6;
  let o = `<defs>${WDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)"/>` +
    `<circle cx="170" cy="420" r="170" fill="url(#sunW)"/><circle cx="170" cy="420" r="50" fill="#fff4cf" opacity=".45" filter="url(#blur9)"/><circle cx="170" cy="420" r="22" fill="#fffdf2"/>` +
    `<g filter="url(#hazeW)">` + mountainsR(690, 60, 77, { rock: '#b89474', haze: .55, hazeCol: '#e6d6be' }) + dunes(t, { seed: 4, y0: 690 }) + `</g>` +
    `<ellipse cx="${x + 6}" cy="${y + 3}" rx="40" ry="7" fill="#7a4a22" opacity=".35" filter="url(#blur2)"/>` +
    Array.from({ length: 12 }, (_, i) => { const fx = x - 28 - i * 25; return fx > -20 ? `<ellipse cx="${fx.toFixed(1)}" cy="${(1065 + Math.sin(fx * .004) * 6 + (i % 2 ? 3 : -3)).toFixed(1)}" rx="7" ry="3" fill="#8a5a2a" opacity="${(.32 - i * .02).toFixed(2)}"/>` : ''; }).join('') +
    hero(x, y, Object.assign({ s: .72, face: 1, shade: 1, walk: x / 34 }, YOU));
  noEarth(); F.ov = ''; return o;
}
// 6: summer above 45 degrees, winter well below zero: a swing of more than 50 degrees
function sceneSeasons(t) {
  const w = ease(ramp(t, WS(6, 9) - .3, WS(6, 10) + .5)), y0 = PV + 74;
  const ppl = (k) => { let fg = ''; [[0, 60, 1, 2, .7, -10, 20], [1, 520, -1, 9, .8, 34, 26], [2, 430, -1, 5, .68, -4, 22]].forEach(([i, x0, f, pi, sc, dy, sp]) => { const x = x0 + f * (t - S0(6)) * sp, P = palS(pi); if (k > .5) { P.top = mix(P.top, '#2a3444', .55); } fg += hero(x, y0 + dy, Object.assign({ s: sc, face: f, shade: 1, walk: x / 30 }, P)); }); return fg; };
  const sum = street4(t, { N: 0, id: 'su', cars: 0, sky: ['#3f78c0', '#a8c8e6', '#f6e6c6'], warp: 5, fg: ppl(0) }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#ffb060" opacity=".1"/>`;
  let s = `<defs>${WDEFS()}</defs>` + sum;
  if (w > 0) { const win = street4(t, { N: 0, id: 'wi', cars: 0, overcast: 1, sky: ['#7d8a9c', '#aeb8c6', '#d8dee6'], ground: snowGround(t, 1), fg: ppl(1) }) + snowTrees() + `<rect x="-20" y="-20" width="760" height="1320" fill="#a8c0e0" opacity=".14"/>` + snowFall(t, 1);
    s += `<g opacity="${w.toFixed(2)}">${win}</g>`; }
  const v = lerp(46, -10, w), a = ease(ramp(t, S0(6), S0(6) + .5));
  s += thermo(610, 900, v, a, v > 15 ? 'صيفًا' : 'شتاءً') + lbl(610, 962, `${AR(Math.round(Math.abs(v)))}°`, a, '#fff', 40) + (v < 0 ? lbl(610, 998, 'تحت الصفر', a, '#cfe6ff', 24) : '');
  noEarth(); F.ov = ''; return s;
}
// 7: closed seas carry no warmth to the poles: hotter tropics, colder poles
function sceneCurrents(t) {
  const sw = ease(ramp(t, WS(7, 2), WS(7, 5) + .3)), h = ease(ramp(t, WS(7, 8), WS(7, 10)));
  const G = gW(t, { d: 8.6, el: .1, lon: -38 - (t - S0(7)) * 2, swap: sw, clouds: .4 - .2 * sw, heat: .9 * h });
  const flows = [[[14, -72], [24, -79], [33, -76], [40, -62], [45, -42], [52, -26], [60, -10]], [[-8, -33], [-18, -38], [-28, -45], [-38, -52]], [[8, -22], [14, -32]].reverse().concat([]), [[-30, 8], [-20, 2], [-10, -6]].reverse()];
  let o = `<defs>${WDEFS()}</defs>`; const fa = 1 - ease(ramp(t, WS(7, 4), WS(7, 6)));
  [flows[0], flows[1]].forEach((pts, i) => { const p = gPath(G, pts); if (!p.d || fa <= 0) return;
    o += `<path d="${p.d}" stroke="#000" stroke-opacity=".35" stroke-width="10" fill="none" stroke-linecap="round" opacity="${fa.toFixed(2)}"/><path d="${p.d}" stroke="#ff8a3a" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="22 14" stroke-dashoffset="${(-t * 60).toFixed(1)}" opacity="${fa.toFixed(2)}"/>`;
    if (p.last) o += `<circle cx="${p.last[0].toFixed(1)}" cy="${p.last[1].toFixed(1)}" r="9" fill="#ffb07a" opacity="${fa.toFixed(2)}"/>`; });
  const xk = ease(ramp(t, WS(7, 3), WS(7, 4))) * fa;
  if (xk > 0) { const [x, y] = G.P(36, -50); o += `<g opacity="${xk.toFixed(2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><path d="M-26,-26 L26,26 M26,-26 L-26,26" stroke="#000" stroke-opacity=".5" stroke-width="16" stroke-linecap="round"/><path d="M-26,-26 L26,26 M26,-26 L-26,26" stroke="#ff3a2a" stroke-width="10" stroke-linecap="round"/></g>`; }
  const la = ease(ramp(t, WS(7, 9), WS(7, 10))), lb = ease(ramp(t, WS(7, 11), WS(7, 12)));
  if (la > 0) { const [x, y] = G.P(0, -38 - (t - S0(7)) * 2); o += lbl(x, y + 12, 'أحرّ 🔥', la, '#ffd0b0', 40); }
  if (lb > 0) { const [x, y] = G.P(68, -38 - (t - S0(7)) * 2), [x2, y2] = G.P(-66, -38 - (t - S0(7)) * 2); o += lbl(x, y + 4, 'أبرد ❄️', lb, '#d0e8ff', 36) + lbl(x2, y2 + 20, 'أبرد ❄️', lb, '#d0e8ff', 36); }
  F.ov = o; return space(t);
}
// 8: people would crowd the new coasts: city lights along the shores of the closed seas
function scenePeople(t) {
  const T = t - S0(8) + .2, li = ease(ramp(t, WS(8, 1) - .2, WS(8, 3) + .6));
  gW(t, { d: 8.2 - T * .14, el: .3, lon: 5 - T * 2.4, off: -2.25, up: .2, swap: 1, clouds: .2, lights: .1 + .9 * li, sunI: .9 });
  F.ov = ''; return space(t);
}
// 9: the surprise: 250 million years ago all land was one continent, Pangaea, with a burning desert at its heart
function scenePangaea(t) {
  const T = t - S0(9) + .2, back = ease(ramp(t, WS(9, 1), WS(9, 12))), yrs = Math.round(250 * back);
  gW(t, { d: 8.4, el: .25, lon: 10 + 260 * back * back, swap: 0, clouds: .45 });
  const a = ease(ramp(t, WS(9, 13) - .3, WS(9, 13) + .5));
  let o = `<defs>${WDEFS()}</defs>`;
  const ca = ease(ramp(t, WS(9, 1), WS(9, 2))) * (1 - a);
  if (ca > 0) o += `<g opacity="${ca.toFixed(2)}">` + panel(150, 1010, 420, 120, 1) + lbl(360, 1068, `قبل ${AR(yrs)} مليون سنة`, 1, '#f4c76b', 44) + lbl(360, 1110, '⏪', 1, '#fff', 26) + `</g>`;
  if (a > 0) o += `<g opacity="${a.toFixed(2)}"><rect x="-20" y="-20" width="760" height="1320" fill="url(#redSky)"/>` +
    `<circle cx="180" cy="380" r="180" fill="url(#sunW)"/><circle cx="180" cy="380" r="50" fill="#fff4cf" opacity=".5" filter="url(#blur9)"/><circle cx="180" cy="380" r="22" fill="#fffdf2"/>` +
    `<g filter="url(#hazeW)">` + mesas(745, 9, '#c47a4e', 150, { haze: .42, hazeCol: '#f2d2aa' }) + mesas(805, 21, '#b0603a', 240) + `<rect x="-20" y="760" width="760" height="70" fill="#f0c890" opacity=".22"/>` + dunes(t, { seed: 11, y0: 790, n: 5, lit: '#e8a868', dark: '#a85a30', haze: '#f0caa0' }) + `</g></g>`;
  F.ov = o; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: -20 - (t - S0(10)) * 4, swap: 1, clouds: .25 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 7) - .3, WS(10, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneShare }, { s: S0(2) - .2, f: sceneOne }, { s: S0(3) - .2, f: sceneRidge }, { s: S0(4) - .2, f: sceneTrench }, { s: S0(5) - .2, f: sceneDry }, { s: WS(5, 7) - .35, f: sceneSand }, { s: S0(6) - .2, f: sceneSeasons }, { s: S0(7) - .2, f: sceneCurrents }, { s: S0(8) - .2, f: scenePeople }, { s: S0(9) - .2, f: scenePangaea }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneShare, sceneOne, sceneRidge, sceneTrench, sceneDry, sceneCurrents, scenePeople, scenePangaea]);
const XF = .5;
const TLI = [['قارّةٌ واحدة', S0(2)], ['الجبال', S0(3)], ['الوادي', S0(4)], ['الصحراء', S0(5)]];
const LIST_ON = new Set([sceneSand]);
const CHIPS = [
  ['c2', 'قارّةٌ واحدةٌ عملاقة', 360, 330, 'big', WS(2, 6), WS(2, 9) - .1], ['c2b', 'القارّاتُ بحارٌ مغلقة', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c3', '٦٥ ألفَ كم من الجبال', 360, 1180, 'big', WS(3, 8), S0(4) - .3],
  ['c5', 'تبخّرٌ ومطرٌ أقلّ', 360, 330, 'big', WS(5, 4), WS(5, 7) - .1], ['c5b', 'أكثرُ من ٤٠٠٠ كم عن أقرب بحر', 360, 1200, 'big', WS(5, 10), S0(6) - .3],
  ['c6', 'فرقٌ أكثرُ من ٥٠ درجة', 360, 330, 'red big', WS(6, 11), S0(7) - .3],
  ['c8', '٤٠٪ من البشر قربَ السواحل', 360, 1180, 'big', WS(8, 9), S0(9) - .3],
  ['c9', 'بانجيا', 360, 330, 'big', WS(9, 18), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">العالَمُ المقلوب</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
