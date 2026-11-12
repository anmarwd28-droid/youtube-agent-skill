// ===================== "what if all people went blind at the same moment?" (Short #35) =====================
const glB = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * (o.sp ?? .03), Ld = sunFor((o.az ?? .25) + t * .02, o.off ?? -.6, o.up ?? .5), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]);
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; F.earth = null; F.moon = null; F.sun = null;
  return { cam, spin, cN, c0, R: c0[2] / Math.sqrt(1 - 1 / (cN * cN)) }; };
const vis3 = (g, P) => clamp(((P[0] * g.cam.pos[0] + P[1] * g.cam.pos[1] + P[2] * g.cam.pos[2]) / g.cN - .1) / .25);
const BLDEF = `<radialGradient id="lidV" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>` +
  `<radialGradient id="visG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".95"/><stop offset=".55" stop-color="#f4c76b" stop-opacity=".7"/><stop offset="1" stop-color="#f4a84b" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="tealG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d8fff6" stop-opacity=".95"/><stop offset=".55" stop-color="#5fe0d0" stop-opacity=".65"/><stop offset="1" stop-color="#2ab0b0" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="deadG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5a6070" stop-opacity=".95"/><stop offset=".6" stop-color="#4a5060" stop-opacity=".7"/><stop offset="1" stop-color="#4a5060" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="skyA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f62a8"/><stop offset=".55" stop-color="#7fa9d6"/><stop offset="1" stop-color="#d9d6c8"/></linearGradient>` +
  `<linearGradient id="rwG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a6e74"/><stop offset="1" stop-color="#3e4146"/></linearGradient>` +
  `<linearGradient id="paperG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6efe0"/><stop offset="1" stop-color="#ddd2bc"/></linearGradient>` +
  `<linearGradient id="skinH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8704e"/><stop offset=".5" stop-color="#cf9878"/><stop offset="1" stop-color="#b47c5a"/></linearGradient>` +
  `<filter id="lidB" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="16"/></filter>`;
const DEFL = () => `${DEFN()}${BLDEF}`;
// dark glasses over the eye of the last hero() drawn (side view)
const shades = (s, f = 1) => { const e = HP.eye, h = HP.head; return `<path d="M${(e[0] - 7 * s * f).toFixed(1)},${(e[1] - 4.5 * s).toFixed(1)} h${(15 * s * f).toFixed(1)} v${(8 * s).toFixed(1)} q${(-7 * s * f).toFixed(1)},${(4 * s).toFixed(1)} ${(-15 * s * f).toFixed(1)},0Z" fill="#101216"/><path d="M${(e[0] - 7 * s * f).toFixed(1)},${(e[1] - 3 * s).toFixed(1)} L${(h[0] - 12 * s * f).toFixed(1)},${(h[1] - 1 * s).toFixed(1)}" stroke="#101216" stroke-width="${(1.8 * s).toFixed(1)}"/><path d="M${(e[0] - 4 * s * f).toFixed(1)},${(e[1] - 2.5 * s).toFixed(1)} l${(5 * s * f).toFixed(1)},0" stroke="#fff" stroke-width="${(1.2 * s).toFixed(1)}" opacity=".45"/>`; };

// 0: the Earth, then everyone's eyes close at once (eyelids close over the view)
function sceneHook(t) {
  glB(t, { d: 7.6, az: .1, spin: 3.7, sp: .05, lights: .7, el: .26 });
  const k = ease(ramp(t, WS(0, 5) - .15, WS(0, 8) + .25)), H = lerp(980, 34, k), wob = k > .9 ? 6 * Math.sin(t * 9) * (1 - k) : 0;
  let o = '';
  if (k > 0) o += `<path d="M-60,-60 H780 V1340 H-60Z M-420,640 Q360,${(640 - 2 * H - wob).toFixed(1)} 1140,640 Q360,${(640 + 2 * H).toFixed(1)} -420,640Z" fill-rule="evenodd" fill="#140907" filter="url(#lidB)"/>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#2a2a34" opacity="${(.28 * k).toFixed(2)}"/>` +
    `<path d="M-60,-60 H780 V1340 H-60Z M-420,640 Q360,${(640 - 2 * H - wob - 40).toFixed(1)} 1140,640 Q360,${(640 + 2 * H + 40).toFixed(1)} -420,640Z" fill-rule="evenodd" fill="#5a1a12" opacity="${(.35 * k).toFixed(2)}" filter="url(#lidB)"/>`;
  F.ov = `<defs>${BLDEF}</defs>` + o;
  return space(t);
}

// 1: about a million people are in the air right now; their pilots can't see
const FLTS = (() => { const r = RS(77), o = []; for (let i = 0; i < 300; i++) { const c = CITIES[Math.floor(r() * CITIES.length)]; o.push([c[0] + (r() - .5) * 34, c[1] + (r() - .5) * 46, r() * 6.28, .7 + r() * .9, r()]); } return o; })();
function cockpit(cx, cy, R, t, a) {
  if (a <= 0) return '';
  const T = t - WS(1, 9);
  let s = `<defs><clipPath id="ckC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><linearGradient id="ckS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f74b8"/><stop offset="1" stop-color="#cfe0ee"/></linearGradient></defs>`;
  let g = `<rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#1c222c"/>` +
    // the windscreen: sky and clouds racing past
    `<path d="M${cx - 40},${cy - R} L${cx + R},${cy - R} L${cx + R},${cy + 10} L${cx + 10},${cy + 10} Z" fill="url(#ckS)"/>` +
    cumulus(pmod(cx + 260 - T * 160, 520) + cx - 160, cy - 18, 150, 31, { a: .95 }) + cumulus(pmod(cx + 120 - T * 110, 520) + cx - 140, cy + 2, 110, 33, { a: .8 }) +
    `<path d="M${cx - 40},${cy - R} L${cx + 10},${cy + 10}" stroke="#2a313c" stroke-width="16"/><path d="M${cx + 70},${cy - R} L${cx + 80},${cy + 10}" stroke="#2a313c" stroke-width="10"/>` +
    // the instrument panel with lit screens
    `<path d="M${cx - R},${cy + 10} L${cx + R},${cy + 10} L${cx + R},${cy + R} L${cx - R},${cy + R}Z" fill="#2a3038"/><rect x="${cx - R}" y="${cy + 10}" width="${2 * R}" height="8" fill="#000" opacity=".4"/>` +
    [[cx + 20, cy + 34], [cx + 86, cy + 34]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="52" height="40" rx="4" fill="#0a1420"/><rect x="${x + 4}" y="${y + 4}" width="44" height="16" fill="#3a8ad8" opacity=".8"/><rect x="${x + 4}" y="${y + 20}" width="44" height="16" fill="#8a5a2a" opacity=".8"/><path d="M${x + 8},${y + 20} h36" stroke="#fff" stroke-width="1.5"/>`).join('') +
    `<circle cx="${cx + 150}" cy="${cy + 86}" r="5" fill="#ff4a3a" opacity="${(.5 + .5 * Math.sin(t * 10)).toFixed(2)}"/>`;
  // the seat and the pilot (eyes shut, one hand on the yoke, the other rubbing his eyes)
  g += `<rect x="${cx - 120}" y="${cy - 70}" width="44" height="150" rx="14" fill="#3a3430"/><rect x="${cx - 120}" y="${cy - 70}" width="14" height="150" rx="7" fill="#fff" opacity=".08"/>`;
  const px = cx - 60, py = cy + 190, rub = Math.sin(t * 7) * 3;
  const P = hero(px, py, Object.assign({ s: .9, face: 1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1, closed: 1, hF: [cx + 22, cy + 60], hB: [px + 26 + rub, cy - 34 + rub * .5], top: '#e8ecf2', pants: '#1c2230', skin: '#c08a68', hair: '#2a1e18' }));
  g += P + `<path d="M${cx + 22},${cy + 60} L${cx + 40},${cy + 40}" stroke="#15181c" stroke-width="7" stroke-linecap="round"/><rect x="${cx + 8}" y="${cy + 52}" width="30" height="9" rx="4" fill="#15181c"/>` +
    `<path d="M${px - 4},${cy - 50} q-4,-22 16,-28 q22,-4 26,16" stroke="#222" stroke-width="5" fill="none"/><rect x="${px + 22}" y="${cy - 52}" width="9" height="14" rx="4" fill="#222"/>`;
  s += `<g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#ckC)">${g}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
  return s;
}
function sceneFlights(t) {
  const T = t - S0(1), g = glB(t, { d: 8.4, az: .2, spin: 4.0, sp: .025, lights: .45, el: .32 });
  const a = ease(ramp(t, S0(1) - .2, S0(1) + .6)), bl = ease(ramp(t, WS(1, 9) - .2, WS(1, 9) + .9)), ck = ease(ramp(t, WS(1, 9) - .1, WS(1, 9) + .4));
  let o = `<defs>${SDEF}${BLDEF}</defs>`;
  const deg = Math.PI / 180;
  FLTS.forEach(([la, lo, hd, sp, k]) => {
    const d = sp * (T + 4) * 1.1, cl = Math.max(.3, Math.cos(la * deg)), lat = la + Math.cos(hd) * d, lon = lo + Math.sin(hd) * d / cl;
    const P = geo3(lat, lon, g.spin, 1.012), v = vis3(g, P); if (v <= 0) return;
    const p = proj3(g.cam, P), P2 = geo3(lat + Math.cos(hd) * .9, lon + Math.sin(hd) * .9 / cl, g.spin, 1.012), p2 = proj3(g.cam, P2), ang = Math.atan2(p2[1] - p[1], p2[0] - p[0]) * 57.3;
    const red = k < bl, col = red ? '#ff6a5a' : '#ffe7a8', fl = red ? .6 + .4 * Math.sin(t * 12 + k * 40) : 1;
    o += `<g transform="translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${ang.toFixed(0)})" opacity="${(v * a * fl).toFixed(2)}"><path d="M-22,0 L-6,0" stroke="${col}" stroke-width="1.4" opacity=".35"/><path d="M6,0 L-4,-4.4 L-2,0 L-4,4.4Z" fill="${col}"/><path d="M1,-1 L-1,-6 L-3,-6 L-2,-1 M1,1 L-1,6 L-3,6 L-2,1" fill="${col}"/></g>`;
  });
  o += cockpit(360, 1062, 150, t, ck);
  F.ov = o; return space(t);
}

// 2: the autopilot keeps the plane up, but who sees the runway? the tower is blind too
function runway(t, a) {
  // a perspective runway from the far haze to the bottom of the frame
  const y0 = 905, y1 = 1300, xL0 = 390, xR0 = 446, xL1 = 150, xR1 = 690, L = (u, xa, xb) => lerp(xa, xb, u);
  let s = `<path d="M${xL0},${y0} L${xR0},${y0} L${xR1},${y1} L${xL1},${y1}Z" fill="url(#rwG)"/><path d="M${xL0},${y0} L${xR0},${y0} L${xR1},${y1} L${xL1},${y1}Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 9; i++) { const u0 = Math.pow(i / 9, 1.6), u1 = Math.pow((i + .45) / 9, 1.6), ya = lerp(y0, y1, u0), yb = lerp(y0, y1, u1), wa = lerp(2, 8, u0), wb = lerp(2, 8, u1), ca = L(u0, (xL0 + xR0) / 2, (xL1 + xR1) / 2);
    s += `<path d="M${(ca - wa / 2).toFixed(1)},${ya.toFixed(1)} L${(ca + wa / 2).toFixed(1)},${ya.toFixed(1)} L${(ca + wb / 2).toFixed(1)},${yb.toFixed(1)} L${(ca - wb / 2).toFixed(1)},${yb.toFixed(1)}Z" fill="#eceae2" opacity=".85"/>`; }
  // threshold piano keys and edge lights
  for (let q = 0; q < 8; q++) { const u = q / 8, x = lerp(xL0 + 4, xR0 - 4, u); s += `<rect x="${x.toFixed(1)}" y="${y0 + 3}" width="4" height="9" fill="#eceae2" opacity=".85"/>`; }
  for (let i = 0; i <= 12; i++) { const u = Math.pow(i / 12, 1.5), y = lerp(y0, y1, u), r = lerp(1.4, 5, u), on = .55 + .45 * Math.sin(t * 6 - i * .8);
    s += `<circle cx="${L(u, xL0, xL1).toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff4c8" opacity="${on.toFixed(2)}"/><circle cx="${L(u, xR0, xR1).toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#fff4c8" opacity="${on.toFixed(2)}"/>`; }
  return s;
}
function tower(x, base) {
  return `<path d="M${x - 16},${base} L${x - 11},${base - 230} L${x + 11},${base - 230} L${x + 16},${base}Z" fill="#d8d4cc"/><path d="M${x + 4},${base} L${x + 6},${base - 230} L${x + 11},${base - 230} L${x + 16},${base}Z" fill="#000" opacity=".2"/>` +
    `<path d="M${x - 40},${base - 232} L${x + 40},${base - 232} L${x + 30},${base - 270} L${x - 30},${base - 270}Z" fill="#2a3a4a"/><path d="M${x - 36},${base - 236} L${x + 36},${base - 236} L${x + 28},${base - 266} L${x - 28},${base - 266}Z" fill="#7aa8c8" opacity=".75"/>` +
    `<path d="M${x - 28},${base - 266} L${x - 4},${base - 266} L${x - 18},${base - 236} L${x - 36},${base - 236}Z" fill="#fff" opacity=".25"/><rect x="${x - 34}" y="${base - 284}" width="68" height="14" fill="#e8e4dc"/><path d="M${x},${base - 284} v-26" stroke="#555" stroke-width="3"/><circle cx="${x}" cy="${base - 312}" r="4" fill="#ff4a3a"/>` +
    `<rect x="${x - 40}" y="${base - 232}" width="80" height="6" fill="#000" opacity=".25"/>`;
}
function controller(cx, cy, R, t, a) {
  if (a <= 0) return '';
  let g = `<rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#1a2430"/><path d="M${cx - R},${cy - R} L${cx + R},${cy - R} L${cx + R},${cy - 6} L${cx - R},${cy - 6}Z" fill="#8ab4d4"/>` +
    `<path d="M${cx - R},${cy - 30} Q${cx},${cy - 44} ${cx + R},${cy - 30} L${cx + R},${cy - 6} L${cx - R},${cy - 6}Z" fill="#6a8a5a"/><path d="M${cx - 50},${cy - 6} L${cx + 6},${cy - 40} L${cx + 14},${cy - 40} L${cx - 30},${cy - 6}Z" fill="#5a5e64"/>` +
    [-60, 0, 60].map(dx => `<path d="M${cx + dx},${cy - R} v${R - 6}" stroke="#2a3440" stroke-width="7"/>`).join('') +
    `<rect x="${cx - R}" y="${cy - 6}" width="${2 * R}" height="${R + 6}" fill="#2c3440"/>`;
  // the radar screen glowing green, and the controller (eyes shut, hands feeling the desk)
  const rx = cx + 40, ry = cy + 40, sw = t * 2.4;
  g += `<rect x="${rx - 44}" y="${ry - 40}" width="88" height="68" rx="6" fill="#0a0f0c"/><circle cx="${rx}" cy="${ry - 6}" r="28" fill="#0e3a1c"/><circle cx="${rx}" cy="${ry - 6}" r="28" fill="none" stroke="#3ae07a" stroke-width="1.2" opacity=".6"/><circle cx="${rx}" cy="${ry - 6}" r="16" fill="none" stroke="#3ae07a" stroke-width="1" opacity=".4"/>` +
    `<path d="M${rx},${ry - 6} L${(rx + Math.cos(sw) * 28).toFixed(1)},${(ry - 6 + Math.sin(sw) * 28).toFixed(1)}" stroke="#7affa8" stroke-width="2"/>` + [[.7, .4], [-.5, .3], [.2, -.6]].map(([u, v]) => `<circle cx="${(rx + u * 24).toFixed(1)}" cy="${(ry - 6 + v * 24).toFixed(1)}" r="2.4" fill="#aaffc8"/>`).join('') +
    `<rect x="${cx - R}" y="${cy + 30}" width="${2 * R}" height="12" fill="#4a4038"/>`;
  const px = cx - 60, py = cy + 160, gr = Math.sin(t * 2.5) * 10;
  g += hero(px, py, Object.assign({ s: .82, face: 1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1, closed: 1, lookUp: .3, hF: [cx + 4 + gr, cy + 32], hB: [cx - 20 - gr, cy + 34], top: '#3a5a7a', pants: '#2a2a34', skin: '#b07a58', hair: '#1a1410' })) +
    `<path d="M${px - 8},${cy - 36} q4,-26 26,-20" stroke="#222" stroke-width="5" fill="none"/><circle cx="${px - 6}" cy="${cy - 30}" r="7" fill="#222"/>`;
  return `<defs><clipPath id="ctC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#ctC)">${g}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#e0483a" stroke-width="5"/></g>`;
}
function sceneAuto(t) {
  const T = t - S0(2), q = ease(ramp(t, WS(2, 7) - .2, WS(2, 9) + .3)), tw = ease(ramp(t, WS(2, 10) - .2, WS(2, 10) + .4));
  let s = `<defs>${DEFL()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyA)"/>`;
  s += `<circle cx="610" cy="250" r="120" fill="#fff6d8" opacity=".22" filter="url(#soft)"/><circle cx="610" cy="250" r="46" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="610" cy="250" r="22" fill="#fffef6"/>`;
  // ground far below: hills, fields, haze, the airport
  s += mountainsR(860, 50, 61, { rock: '#7e8a9a' }) + `<rect x="-20" y="840" width="760" height="460" fill="#8a9a6a"/>` + meadow(880, 1300, t, { c0: '#8ea064', c1: '#5a6e3a' }) +
    forestR(846, 34, 18, 34, 71, '#4a6a3a', { dy: 8 }) + `<rect x="-20" y="826" width="760" height="60" fill="#d9d6c8" opacity=".45" filter="url(#soft)"/>`;
  // apron and terminal at the right, taxiway
  s += `<path d="M470,915 L720,905 L720,1010 L520,1010Z" fill="#8a8c90"/><rect x="560" y="884" width="170" height="30" fill="#c8ccd2"/><rect x="560" y="890" width="170" height="16" fill="#5a86aa" opacity=".8"/><rect x="560" y="884" width="170" height="5" fill="#fff" opacity=".5"/><path d="M446,950 Q500,946 560,938" stroke="#9a9ca0" stroke-width="10" fill="none"/>`;
  s += runway(t, 1) + tower(120, 1000);
  // the glide path the pilot can't see: dashed line to the threshold, with a question mark
  const px = 330 + Math.sin(T * .5) * 14 + T * 6, py = 470 + Math.sin(T * .8) * 6;
  if (q > 0) { const d = `M${px + 20},${py + 30} Q${px + 80},${py + 300} 418,905`; s += `<path d="${d}" stroke="#f4c76b" stroke-width="5" fill="none" stroke-dasharray="14 12" stroke-dashoffset="${(-t * 30).toFixed(1)}" opacity="${(q * .9).toFixed(2)}"/>` +
    `<text x="480" y="890" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${(110 * q).toFixed(0)}" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="6" stroke-opacity=".6" opacity="${q.toFixed(2)}">؟</text>`; }
  // clouds below the plane, then the airliner (autopilot light on)
  s += cumulus(pmod(140 - T * 14, 900) - 100, 690, 260, 41, { a: .9 }) + cumulus(pmod(560 - T * 10, 900) - 100, 640, 200, 43, { a: .8 });
  s += `<g transform="translate(${px.toFixed(1)},${py.toFixed(1)}) scale(.8) rotate(-1.5)"><ellipse cx="0" cy="40" rx="210" ry="10" fill="#000" opacity=".08" filter="url(#soft)"/>${airliner()}</g>`;
  s += `<g opacity="${ease(ramp(t, WS(2, 0), WS(2, 1) + .2)).toFixed(2)}">` + panel(px - 150, py + 70, 300, 64) + `<circle cx="${px - 118}" cy="${py + 102}" r="10" fill="#3ae07a"/><circle cx="${px - 118}" cy="${py + 102}" r="18" fill="#3ae07a" opacity=".25"/>` + lbl(px + 22, py + 113, 'الطيّارُ الآليّ: يعمل', 1, '#d8ffe6', 27) + `</g>`;
  s += controller(470, 1110, 130, t, tw) + (tw > 0 ? `<path d="M156,722 L360,1040" stroke="#e0483a" stroke-width="4" stroke-dasharray="10 8" opacity="${(tw * .8).toFixed(2)}"/><circle cx="120" cy="745" r="52" fill="none" stroke="#e0483a" stroke-width="5" opacity="${tw.toFixed(2)}"/>` : '');
  noEarth(); F.ov = ''; return s;
}

// 3: millions of cars on the road: within seconds, crashes
function sceneCars(t) {
  const st = S0(3) - .2, T = t - st, tc = WS(3, 8) - .05, aft = t - tc;
  const lane1 = 1176, lane2 = 1262, s9 = .9;
  // car A (lane 1, going left): brakes and stops crooked against the kerb
  const Ta = clamp(T / 3.4), xa = 900 - 330 * (1 - (1 - Ta) * (1 - Ta)) - (T > 3.4 ? 0 : 0), ra = -7 * ease(ramp(T, 2.2, 3.4));
  // car C (lane 2, going right): slows and stops; car B behind it doesn't, and hits it
  const xC0 = 560, vC = 140, tsC = 1.8, xc = T < tsC ? xC0 - vC * (tsC - T) * .6 - 40 : xC0 - 40 + (aft > 0 ? 46 * (1 - Math.exp(-aft * 4)) : 0) - (T < tsC ? 0 : 40 * Math.exp(-(T - tsC) * 3) * 0);
  const xb = aft < 0 ? (xc - 214) + 150 * aft : (xc - 46 * (1 - Math.exp(-aft * 4))) - 214 - 34 * (1 - Math.exp(-aft * 6)) + 0;
  const rb = aft > 0 ? -5 * Math.sin(Math.min(aft * 9, Math.PI)) * Math.exp(-aft * 1.5) - 3 * clamp(aft * 4) : 0, rc = aft > 0 ? 3 * clamp(aft * 5) : 0;
  const haz = Math.floor(t * 3) % 2 === 0 ? 1 : 0;
  const hazL = (x, y, f) => haz ? `<circle cx="${(x - 112 * s9 * f).toFixed(1)}" cy="${y - 42}" r="14" fill="#ffb02a" opacity=".55" filter="url(#blur2)"/><circle cx="${(x + 104 * s9 * f).toFixed(1)}" cy="${y - 42}" r="10" fill="#ffb02a" opacity=".5" filter="url(#blur2)"/>` : '';
  let fg = '';
  // people on the pavement: arms out, eyes shut, feeling their way
  const p1x = 120 + T * 16, p1 = hero(p1x, PV + 74, Object.assign({ s: .62, face: 1, shade: 1, walk: T * 2.6, amp: .32, closed: 1, hF: [p1x + 64, PV + 74 - 150], hB: [p1x + 58, PV + 74 - 132], lean: 4 }, YOU));
  const p2 = hero(470, PV + 86, Object.assign({ s: .6, face: -1, shade: 1, closed: 1, lookUp: .4, hF: [470 - 52 + Math.sin(t * 2) * 8, PV + 86 - 150], hB: [470 - 40 - Math.sin(t * 2) * 8, PV + 86 - 168] }, pal(2)));
  const p3 = hero(640, PV + 66, Object.assign({ s: .58, face: -1, shade: 1, closed: 1, hF: [640 - 30, PV + 66 - 150], hB: [640 - 24, PV + 66 - 175] }, pal(0), { top: '#c8a04a' }));
  fg += p3 + p2 + p1;
  // cars
  fg += `<g transform="rotate(${ra.toFixed(2)},${xa.toFixed(1)},${lane1})">${car(xa, lane1, s9, '#e4e4e8', -1, 0)}</g>` + (T > 3.2 ? hazL(xa, lane1, -1) : '');
  fg += `<g transform="rotate(${rc.toFixed(2)},${xc.toFixed(1)},${lane2})">${car(xc, lane2, s9, '#b8322a', 1, 0)}</g>` + (T > tsC ? hazL(xc, lane2, 1) : '');
  fg += `<g transform="rotate(${rb.toFixed(2)},${xb.toFixed(1)},${lane2})">${car(xb, lane2, s9, '#2a5a8a', 1, 0)}</g>`;
  // the crash: dust, glass, steam
  if (aft > 0) { const cx = xb + 104, cy = lane2 - 40, r = RS(5);
    fg += puff(cx, cy, 30 + aft * 60, Math.max(0, .9 - aft * .5)) + puff(cx + 20, cy - 20, 20 + aft * 40, Math.max(0, .7 - aft * .4));
    for (let i = 0; i < 18; i++) { const vx = (r() - .3) * 260, vy = -120 - r() * 160, tt = Math.min(aft, .9), x = cx + vx * tt, y = Math.min(lane2 + 4, cy + vy * tt + 420 * tt * tt); fg += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(3 + r() * 4).toFixed(1)}" height="${(2 + r() * 3).toFixed(1)}" fill="#cfe6f4" opacity=".85" transform="rotate(${(r() * 90).toFixed(0)},${x.toFixed(1)},${y.toFixed(1)})"/>`; }
    for (let i = 0; i < 6; i++) { const p = pmod(aft * .6 + i / 6, 1); fg += `<circle cx="${(cx + 10 + Math.sin(i + aft) * 10).toFixed(1)}" cy="${(cy - 30 - p * 160).toFixed(1)}" r="${(14 + p * 30).toFixed(1)}" fill="#e8e8ec" opacity="${(.4 * (1 - p) * clamp(aft * 2)).toFixed(2)}" filter="url(#blur5)"/>`; } }
  // a second crash further down the street (a car into a lamp post), just after
  let s = street3(t, { N: 0, id: 'c', fg, cars: 0 });
  noEarth(); F.ov = ''; return s;
}

// 4: within days: factories stop, the lights go out city after city
function sceneDark(t) {
  const t0 = WS(4, 4) - .1, t1 = WS(4, 9), u = clamp((t - t0) / (t1 - t0)), n = 6, st = Math.floor(u * n), fr = u * n - st;
  let L = 1 - st / n; if (u > 0 && u < 1 && fr < .3) L -= (Math.floor(t * 24) % 2 ? .5 : 0) / n; // a flicker before each grid fails
  glB(t, { d: 8.2, az: .4, spin: 2.2, sp: .02, lights: 1.2 * Math.max(.04, L), sunI: .9, off: 2.7, up: .3, el: .3 });
  F.ov = ''; return space(t);
}

// 5–6: the brain: a third of the cortex is for seeing; it goes idle; then it takes up touch and sound
const VISP = 'M232,560 C236,520 262,488 300,474 C318,520 326,586 330,640 C334,668 344,690 360,700 C330,704 306,688 286,676 C252,664 234,640 232,604Z';
function brainV(vis, dead, teal, t, eyeOpen) {
  let s = `<defs><clipPath id="brV"><path d="${BRAINP}"/></clipPath></defs>`;
  s += `<path d="${HEADP}" fill="url(#headG)"/><path d="${HEADP}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    `<path d="M300,440 C380,375 500,395 545,470 C520,440 470,420 410,420 C350,422 300,460 262,520 C258,490 270,460 300,440Z" fill="#2a1e18"/>` +
    `<path d="M520,606 q18,-8 34,2" stroke="#2a1e18" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    (eyeOpen ? `<path d="M518,628 q16,-12 32,0 q-16,10 -32,0Z" fill="#f4eee6"/><circle cx="536" cy="628" r="6" fill="#3a2210"/><circle cx="538" cy="626" r="1.6" fill="#fff"/>` : `<path d="M518,630 q16,8 32,0" stroke="#3a2418" stroke-width="3.5" fill="none" stroke-linecap="round"/>`) +
    `<path d="M566,786 q8,3 12,-1" stroke="#7a3a2a" stroke-width="3" fill="none"/>` +
    // the ear
    `<path d="M352,700 C336,690 324,712 330,736 C334,756 350,768 360,760 C372,750 370,716 352,700Z" fill="#b07858"/><path d="M350,712 C342,716 340,734 348,746" stroke="#7a4a32" stroke-width="3" fill="none"/>`;
  s += `<path d="M232,604 C214,500 290,428 388,428 C486,426 556,482 556,562 C558,630 520,668 472,672 C432,676 412,706 376,706 C330,706 306,682 280,676 C246,668 234,640 232,604Z" fill="#3a1a1e" opacity=".55"/>`;
  s += `<path d="M360,684 C356,730 368,780 390,830 L426,824 C408,780 398,730 402,684Z" fill="#c88a8c"/><ellipse cx="300" cy="676" rx="54" ry="30" fill="url(#cereG)"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${256 + q * 3},${662 + q * 6} q44,-6 88,${2 + q}" stroke="#7a3a44" stroke-width="1.6" fill="none" opacity=".6"/>`).join('');
  s += `<path d="${BRAINP}" fill="url(#brainG)"/><g clip-path="url(#brV)">`;
  // the visual cortex (back of the brain) – gold when working, grey when idle, teal when it takes up new work
  const pul = .85 + .15 * Math.sin(t * 6);
  if (vis > 0) s += `<path d="${VISP}" fill="#f4c76b" opacity="${(.55 * vis * pul).toFixed(2)}"/><ellipse cx="282" cy="590" rx="120" ry="130" fill="url(#visG)" opacity="${(.8 * vis * pul).toFixed(2)}"/>`;
  if (dead > 0) s += `<path d="${VISP}" fill="#5a6070" opacity="${(.7 * dead).toFixed(2)}"/><ellipse cx="282" cy="590" rx="110" ry="120" fill="url(#deadG)" opacity="${(.6 * dead).toFixed(2)}"/>`;
  if (teal > 0) { s += `<path d="${VISP}" fill="#4ad0c4" opacity="${(.5 * teal * pul).toFixed(2)}"/><ellipse cx="282" cy="590" rx="120" ry="130" fill="url(#tealG)" opacity="${(.75 * teal * pul).toFixed(2)}"/>`;
    for (let i = 0; i < 3; i++) { const p = pmod(t * .8 + i / 3, 1); s += `<ellipse cx="282" cy="590" rx="${(20 + p * 110).toFixed(1)}" ry="${(24 + p * 120).toFixed(1)}" fill="none" stroke="#d8fff6" stroke-width="3" opacity="${(teal * (1 - p) * .7).toFixed(2)}"/>`; } }
  s += SULCI.map(d => `<path d="${d}" stroke="#9a4a56" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".75"/><path d="${d}" stroke="#ffe4e2" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".45" transform="translate(-2,-2)"/>`).join('') +
    `<path d="M300,530 C350,560 420,548 470,600" stroke="#8a3a48" stroke-width="5" fill="none" opacity=".7"/></g><path d="${BRAINP}" fill="none" stroke="#8a3a48" stroke-width="3"/>`;
  // the region boundary
  const bd = Math.max(vis, dead, teal); if (bd > 0) s += `<path d="${VISP}" fill="none" stroke="${teal > .3 ? '#bffff4' : dead > .5 ? '#9aa4b8' : '#fff0c0'}" stroke-width="3" stroke-dasharray="9 7" opacity="${(.85 * bd).toFixed(2)}"/>`;
  return s;
}
// the path from the eye to the back of the brain, with signals flowing (when the eye works)
function opticPath(a, flow, t) {
  if (a <= 0) return ''; const d = 'M528,636 C480,662 420,676 372,668 C340,662 318,640 300,612';
  return `<path d="${d}" stroke="#000" stroke-width="9" fill="none" opacity="${(.25 * a).toFixed(2)}"/><path d="${d}" stroke="${flow > 0 ? '#f4c76b' : '#7a808c'}" stroke-width="5" fill="none" opacity="${(.85 * a).toFixed(2)}"/>` +
    (flow > 0 ? `<path d="${d}" stroke="#fff6d0" stroke-width="5" fill="none" stroke-dasharray="8 26" stroke-dashoffset="${(t * 90).toFixed(1)}" opacity="${(flow * a).toFixed(2)}"/>` : '');
}
function labBG(id) {
  let s = `<defs>${DEFL()}<radialGradient id="${id}" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="#1e2a50"/><stop offset="1" stop-color="#070b1a"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#${id})"/>`;
  const r = RS(3); for (let i = 0; i < 24; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(10 + r() * 40).toFixed(1)}" fill="#6a8aff" opacity="${(.03 + .04 * r()).toFixed(3)}"/>`;
  return s;
}
function pie3(cx, cy, R, k, col) {
  const a1 = -Math.PI / 2 + k * 2 * Math.PI / 3, x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a3048"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>` + (k > .01 ? `<path d="M${cx},${cy} L${cx},${cy - R} A${R},${R} 0 0 1 ${x1.toFixed(1)},${y1.toFixed(1)}Z" fill="${col}"/>` : '');
}
function sceneSee(t) {
  const v = ease(ramp(t, WS(5, 3) - .1, WS(5, 5) + .2)), off = ease(ramp(t, WS(5, 7) - .1, WS(5, 7) + .5)), dead = ease(ramp(t, WS(5, 10) - .2, WS(5, 12) + .2));
  let s = labBG('lbS') + `<g transform="translate(-34,40)">` + brainV(v * (1 - dead), dead, 0, t, off < .5) + opticPath(1, 1 - off, t) + `</g>`;
  const pa = ease(ramp(t, WS(5, 4), WS(5, 5) + .3));
  s += `<g opacity="${pa.toFixed(2)}">` + panel(60, 1080, 600, 120) + pie3(150, 1140, 44, pa, dead > .5 ? '#7a808c' : '#f4c76b') + lbl(420, 1132, 'نحوَ ثُلُثِ قشرةِ الدماغ', 1, '#fff', 30) + lbl(420, 1176, dead > .5 ? 'بلا عمل' : 'تعملُ للرؤية', 1, dead > .5 ? '#c8ccd6' : '#f4c76b', 30) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function handR(x, y, s, rot) { // index finger tip at (x,y); the finger points along -x before rotation
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot}) scale(${s})">` +
    `<ellipse cx="200" cy="40" rx="190" ry="60" fill="#000" opacity=".22" filter="url(#blur9)"/>` +
    `<path d="M128,-26 C170,-34 240,-30 330,-26 L330,62 C250,70 180,70 138,58 C112,50 100,30 104,10 C106,-8 114,-20 128,-26Z" fill="url(#skinH)"/>` +
    // curled middle, ring and little fingers under the palm edge
    `<path d="M112,22 C92,22 86,40 100,48 C114,54 128,48 128,36Z" fill="#b07858"/><path d="M118,42 C100,46 98,62 112,66 C126,68 136,60 134,50Z" fill="#a87050"/><path d="M126,60 C112,66 114,78 126,80 C138,80 144,72 142,64Z" fill="#9a6648"/>` +
    // the thumb along the top
    `<path d="M150,-28 C136,-38 120,-40 108,-36" stroke="#c08868" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M146,-34 C134,-41 122,-43 112,-41" stroke="#fff" stroke-width="3" fill="none" opacity=".2" stroke-linecap="round"/>` +
    // the pointing index finger, with knuckle creases and a nail
    `<path d="M120,-10 C80,-14 40,-12 6,-10" stroke="#c89070" stroke-width="26" fill="none" stroke-linecap="round"/><path d="M120,0 C80,-2 40,0 6,0" stroke="#000" stroke-width="6" fill="none" opacity=".12" stroke-linecap="round"/><path d="M118,-18 C80,-21 40,-19 8,-17" stroke="#fff" stroke-width="4" fill="none" opacity=".22" stroke-linecap="round"/>` +
    `<ellipse cx="10" cy="-14" rx="11" ry="7" fill="#e8bca4"/><ellipse cx="7" cy="-15.5" rx="5" ry="2.4" fill="#fff" opacity=".5"/>` +
    `<path d="M40,-21 q2,5 0,10 M46,-21 q2,5 0,10 M84,-22 q3,6 0,12" stroke="#8a5a40" stroke-width="1.6" fill="none" opacity=".75"/>` +
    `<path d="M130,-24 q8,-6 18,-4 M160,-28 q10,-4 20,-2" stroke="#8a5a40" stroke-width="2" fill="none" opacity=".5"/></g>`;
}
function sceneRewire(t) {
  const tl = ease(ramp(t, WS(6, 7) - .2, WS(6, 9) + .2)), snd = ease(ramp(t, WS(6, 10) - .3, WS(6, 10) + .3)), dead = 1 - tl;
  let s = labBG('lbR') + `<g transform="translate(-34,40)">` + brainV(0, dead, Math.max(tl, snd), t, false) + opticPath(.5 * dead, 0, t) + `</g>`;
  // touch: a fingertip on raised dots, a nerve line glowing up to the back of the brain
  const nerve = 'M100,1060 C70,960 110,820 170,760 C200,724 220,690 236,664';
  if (tl > 0) s += `<path d="${nerve}" stroke="#4ad0c4" stroke-width="5" fill="none" opacity="${(.8 * tl).toFixed(2)}"/><path d="${nerve}" stroke="#d8fff6" stroke-width="5" fill="none" stroke-dasharray="8 22" stroke-dashoffset="${(t * -90).toFixed(1)}" opacity="${tl.toFixed(2)}"/>`;
  const pa = ease(ramp(t, S0(6), S0(6) + .4));
  s += `<g opacity="${pa.toFixed(2)}">` + panel(60, 1060, 600, 150) + `<defs><clipPath id="tpC"><rect x="76" y="1072" width="230" height="126" rx="12"/></clipPath></defs><g clip-path="url(#tpC)"><rect x="76" y="1072" width="230" height="126" fill="url(#paperG)"/>` +
    Array.from({ length: 18 }, (_, i) => { const x = 96 + (i % 9) * 22 + (i % 2) * 6, y = 1120 + Math.floor(i / 9) * 30; return `<circle cx="${x}" cy="${y + 1.5}" r="4.4" fill="#000" opacity=".2"/><circle cx="${x}" cy="${y}" r="4.2" fill="${x < 96 + 22 * 4 * tl ? '#bff4ec' : '#f2eadb'}"/><circle cx="${x - 1.3}" cy="${y - 1.3}" r="1.5" fill="#fff" opacity=".8"/>`; }).join('') +
    handR(96 + 22 * 4 * tl + 4, 1116, .55, 40) + `</g><rect x="76" y="1072" width="230" height="126" rx="12" fill="none" stroke="#4ad0c4" stroke-width="3" opacity="${(.4 + .6 * tl).toFixed(2)}"/>` +
    lbl(490, 1120, 'اللمس', .4 + .6 * tl, '#9ff0e6', 36) + lbl(490, 1176, 'والأصوات', .4 + .6 * snd, '#9ff0e6', 36) + `</g>`;
  // sound: waves coming in at the ear, then to the same region
  if (snd > 0) { for (let i = 0; i < 4; i++) { const p = pmod(t * .9 + i / 4, 1), R = 30 + (1 - p) * 140; s += `<path d="M${(318 - R).toFixed(1)},${(780 - R * .6).toFixed(1)} A${R.toFixed(1)},${R.toFixed(1)} 0 0 0 ${(318 - R).toFixed(1)},${(780 + R * .6).toFixed(1)}" stroke="#9ff0e6" stroke-width="4" fill="none" opacity="${(snd * p * .9).toFixed(2)}" transform="rotate(${-0},318,780)"/>`; }
    s += `<path d="M300,760 C280,720 262,690 254,664" stroke="#4ad0c4" stroke-width="5" fill="none" opacity="${(.8 * snd).toFixed(2)}"/>` + ''; }
  noEarth(); F.ov = ''; return s;
}

// 7: the twist: 43 million blind people already live among us – they'd be the teachers
function sceneTwist(t) {
  const T = t - S0(7) + .2, ph = T * 4.4, lx = 230 + T * 38, y = PV + 76;
  let lead = hero(lx, y, Object.assign({ s: .66, face: 1, shade: 1, walk: ph, amp: .5, hF: [lx + 46, y - 92] }, pal(3), { top: '#6a4a8a' }));
  const LH = Object.assign({}, HP), sw = Math.sin(ph * .5) * 16, tip = [lx + 92 + sw, y + 2];
  lead += shades(.66) + `<path d="M${LH.hand[0].toFixed(1)},${LH.hand[1].toFixed(1)} L${tip[0].toFixed(1)},${tip[1].toFixed(1)}" stroke="#f4f4f0" stroke-width="4.5" stroke-linecap="round"/><path d="M${(LH.hand[0] + (tip[0] - LH.hand[0]) * .84).toFixed(1)},${(LH.hand[1] + (tip[1] - LH.hand[1]) * .84).toFixed(1)} L${tip[0].toFixed(1)},${tip[1].toFixed(1)}" stroke="#d0302a" stroke-width="4.5" stroke-linecap="round"/>` +
    `<ellipse cx="${tip[0].toFixed(1)}" cy="${(y + 4).toFixed(1)}" rx="10" ry="3" fill="#000" opacity=".25"/>`;
  // two followers, eyes shut, each with a hand on the shoulder in front
  let fol = ''; let prev = LH;
  [[pal(1), -84, 1.3], [YOU, -168, 2.6]].forEach(([c, dx, pp]) => { const fx = lx + dx, sh = [prev.chest[0] - 8, prev.chest[1] - 16];
    const f = hero(fx, y + 4, Object.assign({ s: .64, face: 1, shade: 1, walk: ph + pp, amp: .38, closed: 1, hF: sh }, c)); prev = Object.assign({}, HP); fol = f + fol; });
  const fg = fol + lead;
  let s = street3(t, { N: 0, id: 't', fg, cars: 0 });
  // a ring of soft light around the leader when "teachers of the world" is said
  const k = ease(ramp(t, WS(7, 8) - .2, WS(7, 9) + .3)); if (k > 0) s += scr(`<circle cx="${LH.chest[0].toFixed(1)}" cy="${(LH.chest[1] - 20).toFixed(1)}" r="${(90 + 20 * Math.sin(t * 3)).toFixed(1)}" fill="url(#goldG)" opacity="${(.45 * k).toFixed(2)}"/>`);
  noEarth(); F.ov = ''; return s;
}

// 8: reading by touch (Braille), then echolocation: a tongue click, the echo shows where the wall is
const BRL = (() => { const r = RS(808), o = []; for (let row = 0; row < 3; row++) for (let c = 0; c < 14; c++) { const cell = Math.floor(r() * 64) | 1; for (let d = 0; d < 6; d++) if (cell >> d & 1) o.push([row, c, d % 2, Math.floor(d / 2)]); } return o; })();
function braille(t) {
  let s = `<defs>${DEFL()}<linearGradient id="tblG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a32"/><stop offset="1" stop-color="#3e2a1c"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#tblG)"/>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".35"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M-20,${120 + i * 140} C200,${110 + i * 140} 500,${136 + i * 140} 740,${118 + i * 140}" stroke="#2a1a10" stroke-width="2" fill="none" opacity=".35"/>`).join('');
  // the page, slightly turned, with a soft shadow
  s += `<g transform="rotate(-6,360,800)"><rect x="70" y="420" width="580" height="760" rx="6" fill="#000" opacity=".45" filter="url(#blur9)"/><rect x="60" y="400" width="580" height="760" rx="6" fill="url(#paperG)"/><rect x="60" y="400" width="580" height="760" rx="6" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  const fx = lerp(120, 560, clamp((t - S0(8) - .1) / 2.4)), rowY = r => 640 + r * 120;
  BRL.forEach(([row, c, dx, dy]) => { const x = 110 + c * 38 + dx * 12, y = rowY(row) + dy * 12, touched = row === 0 && x < fx + 6;
    s += `<circle cx="${x}" cy="${y + 1.6}" r="4.4" fill="#000" opacity=".22"/><circle cx="${x}" cy="${y}" r="4.2" fill="${touched ? '#ffe7a8' : '#f2eadb'}"/><circle cx="${x - 1.4}" cy="${y - 1.4}" r="1.6" fill="#fff" opacity=".85"/>` + (touched ? `<circle cx="${x}" cy="${y}" r="9" fill="#f4c76b" opacity=".35"/>` : ''); });
  s += handR(fx, rowY(0) + 2, 1.1, 48) + `</g>`;
  return s;
}
function echo(t) {
  const t0 = WS(8, 6) - .1, wallX = 520;
  let s = street3(t, { N: .92, id: 'e', cars: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#050a1a" opacity=".5"/>`;
  // the wall ahead (dark until the echo comes back)
  const hits = []; for (let i = 0; i < 4; i++) { const tc = t0 + i * .55, p = (t - tc) / 1.1; if (p > 0) hits.push([tc, p]); }
  const seen = clamp(hits.reduce((m, [, p]) => Math.max(m, p > .55 ? Math.min(1, (p - .55) * 3) : 0), 0) + ease(ramp(t, WS(8, 9) - .3, WS(8, 10) + .3)));
  let wall = `<rect x="${wallX}" y="640" width="260" height="470" fill="#7a4a3a"/><rect x="${wallX}" y="640" width="260" height="470" fill="url(#brkL)"/><rect x="${wallX}" y="640" width="260" height="470" fill="#fff" filter="url(#wallI)" opacity=".25"/><rect x="${wallX - 6}" y="628" width="272" height="16" fill="#9a8a7a"/><rect x="${wallX}" y="640" width="30" height="470" fill="#000" opacity=".25"/>`;
  s += wall + `<rect x="${wallX - 10}" y="620" width="300" height="500" fill="#050a1a" opacity="${(.82 * (1 - seen * .8)).toFixed(2)}"/>`;
  if (seen > 0) s += `<rect x="${wallX}" y="640" width="260" height="470" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${(seen * .9).toFixed(2)}"/>` + lbl(wallX + 110, 600, 'الجدار', seen, '#f4c76b', 34);
  // the walker with dark glasses and a cane, clicking his tongue
  const px = 200, py = PV + 80;
  s += hero(px, py, Object.assign({ s: .7, face: 1, shade: 1, hF: [px + 52, py - 90] }, pal(3), { top: '#6a4a8a' }));
  const H = Object.assign({}, HP); s += shades(.7) + `<path d="M${H.hand[0].toFixed(1)},${H.hand[1].toFixed(1)} L${px + 96},${py + 2}" stroke="#f4f4f0" stroke-width="4.5" stroke-linecap="round"/><path d="M${(px + 86)},${py - 14} L${px + 96},${py + 2}" stroke="#d0302a" stroke-width="4.5" stroke-linecap="round"/>`;
  const mx = H.head[0] + 16, my = H.head[1] + 14;
  // outgoing click rings (gold) and returning echoes (pale blue)
  hits.forEach(([tc, p]) => { if (p < .55) { const R = 20 + p / .55 * (wallX - mx); s += `<path d="M${(mx + R * .2).toFixed(1)},${(my - R * .9).toFixed(1)} A${R.toFixed(1)},${R.toFixed(1)} 0 0 1 ${(mx + R * .2).toFixed(1)},${(my + R * .9).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none" opacity="${(.9 * (1 - p)).toFixed(2)}"/>`; }
    else if (p < 1.1) { const q = (p - .55) / .55, R = (wallX - mx) * (1 - q) + 10; s += `<path d="M${(mx + R).toFixed(1)},${(my - R * .7).toFixed(1)} A${(R * .9).toFixed(1)},${(R * .9).toFixed(1)} 0 0 0 ${(mx + R).toFixed(1)},${(my + R * .7).toFixed(1)}" stroke="#bfe4ff" stroke-width="4" fill="none" opacity="${(.8 * (1 - q * .7)).toFixed(2)}" transform="translate(${(-R * .9 + (wallX - mx - R) * 0).toFixed(1)},0)"/>`; }
    if (t - tc < .35) s += lbl(mx + 18, my - 44, 'طَق', 1 - (t - tc) / .35, '#fff', 30); });
  return s;
}
function sceneTouch(t) {
  const sw = ease(ramp(t, WS(8, 3) - .35, WS(8, 3) + .15));
  let s = sw < 1 ? braille(t) : '';
  if (sw > 0) s += `<g opacity="${sw.toFixed(2)}">${echo(t)}</g>`;
  noEarth(); F.ov = ''; return s;
}

function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(9)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(9)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7) - .3, WS(9, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneFlights }, { s: S0(2) - .2, f: sceneAuto }, { s: S0(3) - .2, f: sceneCars }, { s: S0(4) - .2, f: sceneDark }, { s: S0(5) - .2, f: sceneSee }, { s: S0(6) - .2, f: sceneRewire }, { s: S0(7) - .2, f: sceneTwist }, { s: S0(8) - .2, f: sceneTouch }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneFlights, sceneDark, sceneSee, sceneRewire, sceneAuto]);
const XF = .5;
const TLI = [['الثانية الأولى', S0(1)], ['بعد ثوانٍ', S0(3)], ['خلال أيّام', S0(4)], ['بعد ٥ أيّام', S0(6)]];
const LIST_ON = new Set([sceneCars, sceneTwist]);
const CHIPS = [
  ['c0', '٨ مليارات إنسان… بلا بصر', 360, 1150, 'big', WS(0, 3), S0(1) - .3],
  ['c1', 'نحوَ مليونِ إنسانٍ في الجوّ الآن', 360, 330, 'big', WS(1, 3), WS(1, 9) - .2], ['c1b', 'والطيّارون لا يرون!', 360, 330, 'red big', WS(1, 9), S0(2) - .3],
  ['c2', 'مَن يرى المدرج؟', 360, 330, 'big', WS(2, 7), WS(2, 10) - .2], ['c2b', 'برجُ المراقبةِ أعمى أيضاً', 360, 330, 'red big', WS(2, 10), S0(3) - .3],
  ['c3', 'ملايينُ السيّارات', 360, 330, 'big', WS(3, 2), WS(3, 8) - .2], ['c3b', 'حوادث خلال ثوانٍ', 360, 330, 'red big', WS(3, 8), S0(4) - .3],
  ['c4', 'المصانعُ تتوقّف', 360, 330, 'big', WS(4, 2), WS(4, 4) - .1], ['c4b', 'الكهرباءُ تنطفئ', 360, 330, 'red big', WS(4, 4), WS(4, 9) - .2], ['c4c', 'مَن سيزرعُ الطعام؟', 360, 1150, 'big', WS(4, 9), S0(5) - .3],
  ['c5', 'للرؤية', 360, 330, 'big', WS(5, 6) - .1, WS(5, 7) + .2], ['c5b', 'بلا عمل', 360, 330, 'red big', WS(5, 11), S0(6) - .3],
  ['c6', 'بعدَ ٥ أيّامٍ فقط', 360, 330, 'big', WS(6, 4), S0(7) - .3],
  ['c7', '٤٣ مليونَ كفيف', 360, 330, 'big', WS(7, 1), WS(7, 8) - .2], ['c7b', 'معلّمو العالم', 360, 330, 'big', WS(7, 8), S0(8) - .3],
  ['c8', 'القراءةُ باللمس', 360, 330, 'big', WS(8, 1), WS(8, 3) - .3], ['c8b', 'يرى بالصدى', 360, 330, 'big', WS(8, 5), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا بصر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
