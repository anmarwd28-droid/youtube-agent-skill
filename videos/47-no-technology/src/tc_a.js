// ===================== "what if there were no technology?" (Short #47) =====================
// everything that runs on electricity or fuel stops at once. gl3d_tc.js = gl3d_ln.js (the house Earth with the mirror and 3D-fade fixes).
const TDEF = `<linearGradient id="chrG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a626c"/><stop offset=".22" stop-color="#e8eef4"/><stop offset=".4" stop-color="#9aa4ae"/><stop offset=".62" stop-color="#f6f8fa"/><stop offset=".85" stop-color="#7a828c"/><stop offset="1" stop-color="#3a4048"/></linearGradient>` +
  `<linearGradient id="chrV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fa"/><stop offset=".45" stop-color="#a8b2bc"/><stop offset=".7" stop-color="#e2e8ee"/><stop offset="1" stop-color="#5a626c"/></linearGradient>` +
  `<linearGradient id="steelS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a727c"/><stop offset=".5" stop-color="#b8c0c8"/><stop offset="1" stop-color="#d8dee4"/></linearGradient>` +
  `<linearGradient id="watS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe2f6" stop-opacity=".55"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#8ac4e8" stop-opacity=".55"/></linearGradient>` +
  `<linearGradient id="tileW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dcd4"/><stop offset="1" stop-color="#bfc6bc"/></linearGradient>` +
  `<linearGradient id="bbG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5a8a"/><stop offset=".5" stop-color="#7a4ae8"/><stop offset="1" stop-color="#2ab0f0"/></linearGradient>` +
  `<radialGradient id="bbGl"><stop offset="0" stop-color="#b48aff" stop-opacity=".5"/><stop offset="1" stop-color="#b48aff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="satGl"><stop offset="0" stop-color="#fff8e0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffd890" stop-opacity=".45"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="apronG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8a49a"/><stop offset="1" stop-color="#7e7a72"/></linearGradient>` +
  `<linearGradient id="seaD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9eb0"/><stop offset=".06" stop-color="#4a6a88"/><stop offset=".5" stop-color="#2a4a6a"/><stop offset="1" stop-color="#16304c"/></linearGradient>` +
  `<linearGradient id="skyO" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6e8a"/><stop offset=".6" stop-color="#a8b4c0"/><stop offset="1" stop-color="#e2d8c8"/></linearGradient>`;
const TDEFS = () => `${LDEFS()}${WHDEF}${TDEF}`;
const flick = (t, ti) => t < ti ? 1 : t < ti + .4 ? (Math.sin((t - ti) * 55) > -.2 ? .95 : .2) * (1 - (t - ti) / .4) : 0;
// distance travelled (in seconds at full speed) from t0 to t, braking between ts and te
function travel(t, t0, ts, te) { let d = 0; for (let u = t0; u < t; u += 1 / 30) d += (1 - ease(ramp(u, ts, te))) / 30; return d; }

// ---------- 0: the Earth at night with its satellites; then every light and every machine stops ----------
const SATS = [[53, 20, 1.12, .62, 0], [97.6, 130, 1.1, .7, 1.3], [28.5, 250, 1.15, .5, 2.2], [63, 300, 1.22, .4, 4.1], [8, 60, 1.3, .3, 3.2]];
function satXY(G, inc, node, h, u) { const i = inc * Math.PI / 180, la = Math.asin(Math.sin(i) * Math.sin(u)) * 180 / Math.PI, lo = node + Math.atan2(Math.cos(i) * Math.sin(u), Math.cos(u)) * 180 / Math.PI;
  const p = geo3(la, lo + 180, G.spin, h), cl = Math.hypot(...G.cam.pos), front = (p[0] * G.cam.pos[0] + p[1] * G.cam.pos[1] + p[2] * G.cam.pos[2]) / (h * cl), [x, y] = G.P(la, lo, h), out = Math.hypot(x - G.c0[0], y - G.c0[1]) > G.R;
  return [x, y, front > 0 || out, front]; }
function sats(G, t, live) {
  let s = '';
  SATS.forEach(([inc, node, h, sp, ph], k) => { let d = '', on = false;
    for (let j = 0; j <= 120; j++) { const [x, y, v] = satXY(G, inc, node, h, j / 120 * 6.2832); if (!v) { on = false; continue; } d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; }
    s += `<path d="${d}" stroke="#f4c76b" stroke-width="1.6" fill="none" opacity="${(.12 + .3 * live).toFixed(2)}" stroke-dasharray="5 7"/>`;
    for (let q = 0; q < 3; q++) { const u = ph + q * 2.1 + t * sp * .35, [x, y, v, fr] = satXY(G, inc, node, h, u); if (!v) continue; const sc = 1.15 + .4 * clamp(fr), bl = live * (.75 + .25 * Math.sin(t * 7 + k * 3 + q));
      s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(k * 40 + q * 25).toFixed(0)}) scale(${sc.toFixed(2)})"><rect x="-15" y="-3" width="10" height="6" fill="#4a6aa8"/><rect x="5" y="-3" width="10" height="6" fill="#4a6aa8"/><path d="M-15,0 h30" stroke="#c8ccd2" stroke-width=".8"/><rect x="-4" y="-4" width="8" height="8" rx="1" fill="${mix('#7a7e86', '#e8d8a8', live)}"/></g>` +
        (bl > .02 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(16 * sc).toFixed(1)}" fill="url(#satGl)" opacity="${bl.toFixed(2)}"/>` : ''); } });
  return s;
}
function sceneHook(t) {
  const t0 = WS(0, 9) - .15, k = ease(ramp(t, t0, t0 + 1.3)), fl = k > 0 && k < 1 ? .8 + .2 * Math.sin(t * 46) : 1, live = 1 - ease(ramp(t, t0 + .3, t0 + 1.1));
  const G = gAt(t, 360, 700, { d: lerp(8.2, 7.4, ease(ramp(t, 0, 6))), el: .2, lon: 34 + t * 1.4, clouds: .3, lights: 1.75 * (1 - k) * fl, off: 2.75 });
  F.ov = `<defs>${TDEFS()}</defs>` + sats(G, t, live);
  return space(t);
}

// ---------- 1: the screens go out, the phones die, the street goes dark ----------
function billboard(t, lit) {   // a big LED screen on the facade of block 3
  const x = 318, y = 478, w = 128, h = 168;
  let base = `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="#2a2c32"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c0e12"/><path d="M${x},${y + h} L${x + w * .55},${y} L${x + w * .75},${y} L${x + w * .2},${y + h}Z" fill="#fff" opacity=".05"/>` +
    `<path d="M${x + 20},${y + h + 6} v34 M${x + w - 20},${y + h + 6} v34" stroke="#3a3c42" stroke-width="6"/>`;
  let em = '';
  if (lit > .01) { const p = t * .9;
    em = `<g opacity="${lit.toFixed(2)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#bbG)"/>` +
      [0, 1, 2].map(i => `<circle cx="${(x + w / 2 + Math.cos(p + i * 2.1) * 34).toFixed(1)}" cy="${(y + 64 + Math.sin(p * 1.3 + i * 2.1) * 26).toFixed(1)}" r="${18 - i * 4}" fill="#fff" opacity="${(.35 + i * .1).toFixed(2)}"/>`).join('') +
      `<rect x="${x + 14}" y="${y + 116}" width="${w - 28}" height="14" rx="3" fill="#fff" opacity=".85"/><rect x="${x + 30}" y="${y + 140}" width="${w - 60}" height="9" rx="3" fill="#fff" opacity=".55"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000" opacity=".12" filter="url(#grainR)"/></g>` +
      scr(`<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${w * 1.5}" fill="url(#bbGl)" opacity="${lit.toFixed(2)}"/>`); }
  return { base, em };
}
function sceneScreens(t) {
  const T = t - S0(1) + .2, y0 = PV + 78, tvL = flick(t, WS(1, 1) - .1), bbL = flick(t, WS(1, 1) + .2), dk = ease(ramp(t, WS(1, 4), WS(1, 8)));
  const ord = [2, 0, 4, 1, 3], litB = ord.map(q => flick(t, WS(1, 4) + q * .3)), litS = [1, 3, 0, 4, 2].map(q => flick(t, WS(1, 4) + .15 + q * .3)), lampK = flick(t, WS(1, 6));
  const N = lerp(.8, .95, ease(ramp(t, WS(1, 4), WS(1, 9)))), bb = billboard(t, bbL);
  const PP = [[112, 1, .8, 3], [318, -1, .78, 6], [548, 1, .82, 1]];
  let top = '', emit = bb.em;
  PP.forEach(([x, f, s, pi], i) => { const ph = flick(t, WS(1, 2) + .05 + i * .22), up = ease(ramp(t, WS(1, 2) + .5 + i * .22, WS(1, 3) + .6 + i * .22)), sway = Math.sin(T * 1.1 + i) * .8;
    const A = { s, face: f, shade: 1, lean: sway, lookUp: lerp(-.22, .16, up), hF: [x + f * s * lerp(40, 30, up), y0 - s * lerp(236, 170, up)], hB: [x + f * s * lerp(30, 12, up), y0 - s * lerp(224, 130, up)] };
    top += hero(x, y0 + i % 2 * 8, Object.assign(A, palS(pi))); const H = HP.hand.slice();
    top += phoneIn(H, s * 2, f, ph);
    if (ph > .02) emit += scr(`<ellipse cx="${(HP.head[0] + f * 10).toFixed(1)}" cy="${(HP.head[1] + 8).toFixed(1)}" rx="30" ry="34" fill="#8ac4ff" opacity="${(.4 * ph).toFixed(2)}" filter="url(#blur5)"/>`); });
  emit += `<rect x="-20" y="-20" width="760" height="1320" fill="#0c1430" opacity="${(.12 + .42 * dk).toFixed(2)}" style="mix-blend-mode:multiply"/>`;
  const sky2 = `<circle cx="590" cy="420" r="70" fill="url(#sunW)" opacity=".25"/><circle cx="590" cy="420" r="20" fill="#eef2ff" opacity=".9"/><circle cx="584" cy="414" r="6" fill="#c8d0e0" opacity=".5"/>`;
  let s = `<defs>${TDEFS()}</defs>` + street10(t, { N, id: 'sc', cars: 0, overcast: 1, noMoon: 1, sky2, litB, litS, lampK, tv: tvL, wall: bb.base, emit, top, ground: car(430, 1258, .9, '#8a2a2a', -1, 0) });
  noEarth(); F.ov = ''; return s;
}

// ---------- 2a: the cars stop in their lanes; the traffic light goes dark ----------
function trafficL(x, base, red) {
  return `<rect x="${x - 4}" y="${base - 330}" width="8" height="330" fill="#3a3e44"/><rect x="${x - 3}" y="${base - 330}" width="2" height="330" fill="#fff" opacity=".2"/><rect x="${x - 17}" y="${base - 420}" width="34" height="96" rx="6" fill="#22252a"/>` +
    [0, 1, 2].map(i => `<circle cx="${x}" cy="${base - 402 + i * 30}" r="10" fill="${i === 0 ? mix('#3a1a1a', '#ff3a2a', red) : i === 1 ? '#3a321a' : '#1a3022'}"/><path d="M${x - 12},${base - 412 + i * 30} q12,-6 24,0" stroke="#22252a" stroke-width="5" fill="none"/>`).join('') +
    (red > .02 ? scr(`<circle cx="${x}" cy="${base - 402}" r="40" fill="#ff5a3a" opacity="${(.45 * red).toFixed(2)}" filter="url(#blur9)"/>`) : '');
}
function sceneJam(t) {
  const t0 = S0(2) - .2, ts = WS(2, 0) - .2, te = WS(2, 1) + .25, d = travel(t, t0 - .6, ts, te), T = t - t0, red = flick(t, WS(2, 0));
  let fg = '';
  // lane near the kerb: going left; far lane: going right; all stop where they are
  [[840, '#d8d8dc'], [570, '#2a5a8a'], [300, '#b8a24a']].forEach(([x0, c]) => { fg += car(x0 - 150 * d, 1162, .8, c, -1, 0); });
  fg += `<path d="M-20,1200 H740" stroke="#e8e4d8" stroke-width="5" stroke-dasharray="40 30" opacity=".75"/>`;
  [[-150, '#b8322a'], [130, '#e8e6e0'], [410, '#3a6a4a']].forEach(([x0, c]) => { fg += car(x0 + 170 * d, 1224, .84, c, 1, 0); });
  // people on the pavement stop and look at the road
  const st = ease(ramp(t, WS(2, 1), WS(2, 2)));
  const pA = 140 + Math.min(T, WS(2, 1) - t0) * 30, pB = 470 - Math.min(T, WS(2, 1) + .2 - t0) * 26;
  let ped = hero(pA, PV + 72, Object.assign({ s: .7, face: 1, shade: 1, walk: t < WS(2, 1) ? pA / 24 : null, lookUp: -.06 * st }, palS(2)));
  ped += hero(pB, PV + 86, Object.assign({ s: .74, face: -1, shade: 1, walk: t < WS(2, 1) + .2 ? pB / 24 : null }, palS(9)));
  let s = `<defs>${TDEFS()}</defs>` + street10(t, { N: 0, id: 'jm', cars: 0, overcast: 1, back: sun3(600, 470), fg: ped + trafficL(668, PV + 96, red) + fg });
  noEarth(); F.ov = ''; return s;
}

// ---------- 2b: the ships drift: no engine, no wake, no smoke ----------
function cargoShip(dir = 1, seed = 5) {   // drawn at the origin, waterline y=0, ~380 px long, facing +x (from #27)
  const pal = ['#c0392b', '#2a6ab0', '#e8a23a', '#3a8a5a', '#8a8a8a', '#2a4a7a', '#d8d8d8'], r = RS(seed); let c = '';
  for (let tr = 0; tr < 3; tr++) for (let i = 0; i < 12; i++) { const x = -120 + i * 23, y = -58 - tr * 17, col = pal[Math.floor(r() * pal.length)]; if (tr === 2 && (i < 2 || i > 9)) continue;
    c += `<rect x="${x}" y="${y}" width="22" height="16.5" fill="${col}"/><rect x="${x}" y="${y}" width="22" height="3" fill="#fff" opacity=".18"/><rect x="${x + 15}" y="${y}" width="7" height="16.5" fill="#000" opacity=".22"/>` + [5, 10].map(q => `<path d="M${x + q},${y + 2} v13" stroke="#000" stroke-width=".8" opacity=".25"/>`).join(''); }
  return `<g transform="scale(${dir},1)"><defs><linearGradient id="hlG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3440"/><stop offset="1" stop-color="#141a22"/></linearGradient></defs>` +
    `<path d="M-185,-40 L175,-40 Q205,-36 196,-18 L182,0 L-170,0 Q-186,-18 -185,-40Z" fill="url(#hlG)"/><path d="M-170,0 L182,0 L176,14 L-164,14Z" fill="#8a2a22"/><path d="M-185,-42 L178,-42 L176,-38 L-185,-38Z" fill="#e8e8e8"/>` +
    `<path d="M-185,-40 L175,-40 Q205,-36 196,-18 L182,0 L-170,0Z" fill="#fff" opacity=".07"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-160 + i * 40},-40 v40" stroke="#000" stroke-width="1" opacity=".18"/>`).join('') + c +
    `<rect x="-178" y="-104" width="44" height="62" fill="#f2f2ee"/><rect x="-178" y="-104" width="14" height="62" fill="#000" opacity=".12"/>` + [0, 1, 2, 3].map(q => `<rect x="-174" y="${-98 + q * 14}" width="36" height="5" fill="#2a3a4a"/>`).join('') +
    `<rect x="-184" y="-112" width="56" height="9" fill="#e8e8e4"/><rect x="-170" y="-138" width="13" height="27" fill="#2a2a2a"/><rect x="-170" y="-132" width="13" height="6" fill="#2a6ab0"/><path d="M-152,-112 v-22 M-156,-128 h8" stroke="#ddd" stroke-width="2"/></g>`;
}
function seaRows(T, HZ, gx, seed) {
  let s = ''; const r = RS(seed);
  for (let row = 0; row < 34; row++) { const z = Math.pow(row / 33, 1.7), y = HZ + 3 + z * (1280 - HZ - 10), n = Math.round(26 - 18 * z), w = 8 + 70 * z, ph = T * (.18 + z * .35);
    for (let i = 0; i < n; i++) { const x = pmod(i * 760 / n + r() * 40 + ph * 40 * (row % 2 ? 1 : -1), 780) - 30, gl = Math.abs(x - gx - (y - HZ) * .15) < 50 + z * 70;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-2 - 6 * z).toFixed(1)} ${w.toFixed(1)},0" stroke="${gl ? '#fff0d0' : r() < .55 ? '#c8d8e4' : '#0e2840'}" stroke-width="${(1 + 2.4 * z).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${((gl ? .6 : .34) * (.4 + .6 * z)).toFixed(2)}"/>`; } }
  return s;
}
function sceneSea(t) {
  const t0 = WS(2, 4) - .25, T = t - t0, HZ = 700;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#skyO)"/>` + sun3(470, 560, .75, '#ffe8c0') +
    cumulus(140 + T * 6, 420, 300, 71, { a: .9 }) + cumulus(560 + T * 4, 500, 240, 73, { a: .8 }) + cumulus(330 + T * 5, 600, 200, 75, { a: .7 });
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#seaD)"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<path d="M455,${HZ} L485,${HZ} L600,1300 L360,1300Z" fill="#fff0d0" opacity=".1"/>` + seaRows(T, HZ, 470, 23);
  // a far ship, also dead in the water
  s += `<g transform="translate(150,${HZ + 14}) scale(.22)" opacity=".75">${cargoShip(-1, 9)}</g>`;
  // the near ship: no wake, no smoke; it drifts sideways with the wind and rolls slowly
  const sx = 330 + T * 16, sy = 990, roll = Math.sin(t * .9) * 2.4 + 1.5, bob = Math.sin(t * 1.3) * 4;
  s += `<g transform="translate(${sx.toFixed(1)},${(sy + bob).toFixed(1)}) scale(1.05,-.5)" opacity=".26" filter="url(#blur2)">${cargoShip(1)}</g>` +
    `<g transform="translate(${sx.toFixed(1)},${(sy + bob).toFixed(1)}) scale(1.05) rotate(${roll.toFixed(2)})">${cargoShip(1)}</g>` +
    `<path d="M${(sx - 210).toFixed(1)},${(sy + bob + 6).toFixed(1)} q210,10 420,0" stroke="#e8f0f4" stroke-width="3" fill="none" opacity=".35"/>`;
  for (let i = 0; i < 4; i++) s += bird(560 - i * 40 - T * 30, 520 + i * 14 + (i % 2) * 12, .32, Math.sin(t * 8 + i), 4);
  noEarth(); F.ov = ''; return s;
}

// ---------- 2c: no plane takes off: the airliners stay at the gates ----------
function jetOnGround(x, y, s, dir = 1) {   // airliner with its landing gear; (x, y) = the ground under the main wheels
  const gear = `<path d="M150,14 L150,56 M-24,16 L-24,54 M-4,16 L-4,54" stroke="#8a929c" stroke-width="5"/><circle cx="150" cy="60" r="9" fill="#1e2026"/><circle cx="-24" cy="58" r="11" fill="#1e2026"/><circle cx="-4" cy="58" r="11" fill="#1e2026"/><circle cx="-24" cy="58" r="4" fill="#8a929c"/><circle cx="-4" cy="58" r="4" fill="#8a929c"/>`;
  return `<g transform="translate(${x},${y}) scale(${(s * dir).toFixed(3)},${s})"><ellipse cx="20" cy="70" rx="220" ry="10" fill="#000" opacity=".3" filter="url(#blur5)"/><g transform="translate(0,-69)">${gear}${airliner()}</g></g>`;
}
function sceneAir(t) {
  const t0 = WS(2, 8) - .25, T = t - t0, HZ = 820;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#dSky)"/>` + sun3(560, 420) + cumulus(170 + T * 5, 520, 260, 81, { a: .9 }) + cumulus(520 + T * 4, 610, 200, 83, { a: .75 });
  // the terminal: a long glass hall with a curved roof, the control tower behind
  s += `<rect x="560" y="${HZ - 250}" width="34" height="250" fill="#c8ccd0"/><rect x="560" y="${HZ - 250}" width="10" height="250" fill="#000" opacity=".12"/><path d="M540,${HZ - 250} L614,${HZ - 250} L604,${HZ - 296} L550,${HZ - 296}Z" fill="#2a3a4a"/><path d="M546,${HZ - 300} h62 l-8,-12 h-46Z" fill="#d8dce0"/><path d="M577,${HZ - 312} v-24" stroke="#8a929c" stroke-width="3"/>`;
  s += `<path d="M-20,${HZ - 120} Q360,${HZ - 168} 740,${HZ - 120} L740,${HZ} L-20,${HZ}Z" fill="#dfe3e6"/><path d="M-20,${HZ - 110} Q360,${HZ - 156} 740,${HZ - 110} L740,${HZ - 4} L-20,${HZ - 4}Z" fill="#4a6a88"/>` +
    Array.from({ length: 24 }, (_, i) => `<path d="M${-20 + i * 33},${HZ - 4} V${(HZ - 110 - 46 * Math.sin(Math.PI * (i * 33) / 760)).toFixed(1)}" stroke="#c8ced4" stroke-width="3"/>`).join('') +
    `<path d="M-20,${HZ - 110} Q360,${HZ - 156} 740,${HZ - 110} L740,${HZ - 60} Q360,${HZ - 100} -20,${HZ - 60}Z" fill="#fff" opacity=".14"/><rect x="-20" y="${HZ - 10}" width="760" height="10" fill="#8a8e94"/>`;
  // the jet bridges
  [[150, 1], [470, 1]].forEach(([x]) => { s += `<path d="M${x},${HZ - 60} L${x + 120},${HZ + 30} L${x + 120},${HZ + 66} L${x},${HZ - 24}Z" fill="#b8bcc2"/><path d="M${x},${HZ - 60} L${x + 120},${HZ + 30}" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M${x + 100},${HZ + 64} v70" stroke="#5a5e66" stroke-width="7"/>`; });
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#apronG)"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${-60 + i * 140},${HZ} L${-260 + i * 200},1300" stroke="#6e6a62" stroke-width="2" opacity=".5"/>`).join('') +
    `<path d="M-20,1150 Q360,1120 740,1160" stroke="#e8c84a" stroke-width="7" fill="none" opacity=".85"/><path d="M-20,${HZ + 70} H740" stroke="#e8c84a" stroke-width="4" opacity=".6"/>`;
  // a far plane at the next gate, the near one at its gate; no engines running
  s += jetOnGround(600, HZ + 100, .48, -1) + jetOnGround(330, 1100, 1.5, 1);
  // a baggage tug and a departures board gone dark
  s += `<g transform="translate(640,1150) scale(.5)"><ellipse cx="0" cy="4" rx="70" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-60" y="-46" width="80" height="34" rx="4" fill="#e8b82a"/><rect x="-10" y="-80" width="40" height="40" rx="4" fill="#d8a81a"/><rect x="-6" y="-76" width="30" height="20" fill="#3a5a7a"/><circle cx="-40" cy="-8" r="13" fill="#1e2026"/><circle cx="10" cy="-8" r="13" fill="#1e2026"/><rect x="30" y="-36" width="70" height="26" rx="3" fill="#8a929c"/><circle cx="80" cy="-6" r="9" fill="#1e2026"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 3a: no pumps: the tap runs dry ----------
function sceneTap(t) {
  const t0 = S0(3) - .2, T = t - t0, flow = 1 - ease(ramp(t, WS(3, 1), WS(3, 3) + .4)), drip = ramp(t, WS(3, 3) + .4, WS(3, 6) + 1), CT = 820;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${CT + 20}" fill="url(#tileW)"/>`;
  for (let r = 0; r < 12; r++) s += `<path d="M-20,${300 + r * 46} H740" stroke="#a8b0a4" stroke-width="2"/>`;
  for (let c = 0; c < 14; c++) for (let r = 0; r < 12; r++) s += `<path d="M${(r % 2 ? 26 : 0) + c * 52},${300 + r * 46} v46" stroke="#a8b0a4" stroke-width="2"/>`;
  s += `<rect x="-20" y="280" width="760" height="${CT - 280}" fill="#fff" filter="url(#wallI)" opacity=".18"/>`;
  // the window: a sunny street outside, pipes on the wall
  s += `<rect x="30" y="380" width="250" height="300" fill="#e8e4d8"/><rect x="42" y="392" width="226" height="276" fill="url(#dSky)"/>` + `<g transform="translate(42,392) scale(.31)">${farCity(91, 860, '#9aa8b4')}</g>` +
    `<rect x="42" y="600" width="226" height="68" fill="#a8b4a8"/><path d="M155,392 V668 M42,530 H268" stroke="#e8e4d8" stroke-width="10"/><rect x="24" y="676" width="262" height="14" fill="#d8d2c4"/><path d="M42,392 L130,392 L42,520Z" fill="#fff" opacity=".18"/>`;
  s += `<path d="M640,280 V${CT}" stroke="url(#chrG)" stroke-width="18"/><path d="M600,280 V${CT}" stroke="#8a929c" stroke-width="10"/><rect x="590" y="560" width="62" height="20" rx="4" fill="#5a626c"/><circle cx="620" cy="570" r="16" fill="#c8382e"/><path d="M609,570 h22" stroke="#fff" stroke-width="4"/>`;
  // the counter and the sink
  s += `<rect x="-20" y="${CT}" width="760" height="40" fill="#5a4a3e"/><rect x="-20" y="${CT}" width="760" height="40" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="${CT}" width="760" height="6" fill="#fff" opacity=".2"/>` +
    `<rect x="-20" y="${CT + 40}" width="760" height="${1300 - CT - 40}" fill="#e8e2d6"/><rect x="-20" y="${CT + 40}" width="760" height="24" fill="url(#aoDn)" opacity=".7"/>` +
    [0, 1, 2].map(i => `<rect x="${10 + i * 240}" y="${CT + 70}" width="220" height="${1300 - CT - 70}" rx="6" fill="#dcd4c6" stroke="#b8ae9c" stroke-width="3"/><rect x="${90 + i * 240}" y="${CT + 100}" width="60" height="10" rx="5" fill="url(#chrG)"/>`).join('');
  s += `<path d="M190,${CT + 4} L550,${CT + 4} L534,${CT + 34} L206,${CT + 34}Z" fill="#8a929c"/><path d="M196,${CT + 6} L544,${CT + 6} L532,${CT + 30} L208,${CT + 30}Z" fill="#3e444c"/><ellipse cx="430" cy="${CT + 26}" rx="14" ry="4" fill="#1a1c20"/>`;
  // the tap: chrome column and spout
  s += `<rect x="290" y="${CT - 18}" width="70" height="20" rx="6" fill="url(#chrG)"/><rect x="306" y="${CT - 230}" width="38" height="216" fill="url(#chrG)"/>` +
    `<path d="M306,${CT - 226} C306,${CT - 300} 330,${CT - 318} 380,${CT - 318} C420,${CT - 318} 444,${CT - 290} 444,${CT - 240} L426,${CT - 240} C426,${CT - 278} 408,${CT - 298} 380,${CT - 298} C344,${CT - 298} 344,${CT - 270} 344,${CT - 226}Z" fill="url(#chrV)"/>` +
    `<rect x="424" y="${CT - 244}" width="22" height="12" rx="3" fill="#5a626c"/><g transform="rotate(${(-28 * ease(ramp(t, WS(3, 3), WS(3, 6)))).toFixed(1)},306,${CT - 196})"><path d="M306,${CT - 200} L278,${CT - 236} L268,${CT - 230} L298,${CT - 186}Z" fill="url(#chrG)"/><circle cx="273" cy="${CT - 234}" r="10" fill="url(#chrV)"/></g>` +
    `<path d="M312,${CT - 228} V${CT - 30}" stroke="#fff" stroke-width="4" opacity=".7"/>`;
  // a glass in the sink: it fills while the water runs, then stops half full
  const lvl = .15 + .45 * clamp((t - t0) / (WS(3, 3) - t0)), gx = 435, gb = CT + 22, gh = 78, wl = gb - 4 - (gh - 8) * lvl;
  s += `<path d="M${gx - 26},${gb - gh} L${gx + 26},${gb - gh} L${gx + 21},${gb} L${gx - 21},${gb}Z" fill="#dff0f8" opacity=".25"/><path d="M${gx - 25 + 5 * (1 - (gb - wl) / gh)},${wl.toFixed(1)} L${gx + 25 - 5 * (1 - (gb - wl) / gh)},${wl.toFixed(1)} L${gx + 21},${gb - 3} L${gx - 21},${gb - 3}Z" fill="#7ac0e8" opacity=".55"/><ellipse cx="${gx}" cy="${wl.toFixed(1)}" rx="23" ry="3" fill="#d8f0ff" opacity=".7"/>` +
    `<path d="M${gx - 26},${gb - gh} L${gx - 21},${gb} M${gx + 26},${gb - gh} L${gx + 21},${gb}" stroke="#fff" stroke-width="2.5" opacity=".7"/><path d="M${gx - 18},${gb - gh + 8} L${gx - 15},${gb - 8}" stroke="#fff" stroke-width="4" opacity=".45"/>`;
  // the water: a stream that thins out, then a few drops, then nothing
  const sx = 435, sy = CT - 232, ey = wl;
  if (flow > .02) { const w = 4 + 12 * flow; s += `<rect x="${(sx - w / 2).toFixed(1)}" y="${sy}" width="${w.toFixed(1)}" height="${(ey - sy).toFixed(1)}" fill="url(#watS)" opacity="${(.5 + .5 * flow).toFixed(2)}"/>` + Array.from({ length: 6 }, (_, i) => { const y = sy + pmod(T * 900 + i * 60, ey - sy); return `<ellipse cx="${sx}" cy="${y.toFixed(1)}" rx="${(w * .4).toFixed(1)}" ry="6" fill="#fff" opacity=".5"/>`; }).join('') + `<ellipse cx="${sx}" cy="${(ey - 1).toFixed(1)}" rx="${(8 + 12 * flow).toFixed(1)}" ry="4" fill="#fff" opacity=".7"/>`; }
  else if (drip < 1) { const ph = pmod(T * 1.6, 1), y = sy + ph * ph * (ey - sy); s += `<ellipse cx="${sx}" cy="${(sy + 2).toFixed(1)}" rx="4" ry="${(4 + 3 * pmod(T * 1.6 + .5, 1)).toFixed(1)}" fill="#cfeaff" opacity="${(.85 * (1 - drip)).toFixed(2)}"/>` + (ph > .08 ? `<ellipse cx="${sx}" cy="${y.toFixed(1)}" rx="3.5" ry="5" fill="#cfeaff" opacity="${(.85 * (1 - drip)).toFixed(2)}"/>` : ''); }
  // inset: the city's water pump stops and the pressure falls to zero
  const pa = ease(ramp(t, t0 + .2, t0 + .6)), pr = 1 - ease(ramp(t, WS(3, 0) + .2, WS(3, 2) + .6)), rot = T < 1 ? T * 900 : 900 + (T - 1) * 900 * pr;
  if (pa > 0) { const cx = 548, cy = 476, Rr = 96;
    s += `<g opacity="${pa.toFixed(2)}"><defs><clipPath id="pmpC"><circle cx="${cx}" cy="${cy}" r="${Rr}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${Rr + 6}" fill="#f4c76b"/><g clip-path="url(#pmpC)"><rect x="${cx - Rr}" y="${cy - Rr}" width="${2 * Rr}" height="${2 * Rr}" fill="#c8ccc8"/><rect x="${cx - Rr}" y="${cy + 46}" width="${2 * Rr}" height="80" fill="#8a8e88"/>` +
      `<path d="M${cx - Rr},${cy + 20} H${cx - 40} M${cx + 40},${cy - 10} H${cx + 74} V${cy - Rr}" stroke="#2a6ab0" stroke-width="22" fill="none"/><path d="M${cx - Rr},${cy + 14} H${cx - 40}" stroke="#fff" stroke-width="4" opacity=".3"/>` +
      `<circle cx="${cx}" cy="${cy + 10}" r="46" fill="#2a6ab0"/><circle cx="${cx}" cy="${cy + 10}" r="46" fill="url(#frG)"/><circle cx="${cx}" cy="${cy + 10}" r="20" fill="#1a3a6a"/>` +
      `<g transform="translate(${cx},${cy + 10}) rotate(${(rot % 360).toFixed(1)})">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0,0 L14,-4 L16,4Z" fill="#8ab0d8" transform="rotate(${i * 60})"/>`).join('')}</g>` +
      `<rect x="${cx - 40}" y="${cy - 54}" width="80" height="30" rx="5" fill="#5a626c"/><rect x="${cx - 40}" y="${cy - 54}" width="80" height="8" rx="4" fill="#fff" opacity=".2"/></g>` +
      `<g transform="translate(${cx - 60},${cy - 62})"><circle r="30" fill="#f6f2e6" stroke="#3a3e44" stroke-width="5"/><path d="M-20,12 A23,23 0 1 1 20,12" stroke="#c8382e" stroke-width="3" fill="none" stroke-dasharray="4 3"/><path d="M0,0 L${(Math.cos(Math.PI * (1.15 + .7 * pr)) * 22).toFixed(1)},${(Math.sin(Math.PI * (1.15 + .7 * pr)) * 22).toFixed(1)}" stroke="#1a1c20" stroke-width="3" stroke-linecap="round"/><circle r="4" fill="#1a1c20"/></g>` +
      lbl(cx, cy + 86, 'مضخّةُ المياه', 1, '#f6f2e6', 21) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 3b: people go back to the river with buckets ----------
function bucket(x, y, s, full = 1, col = '#5a7a9a') {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><path d="M-16,-8 Q0,-34 16,-8" stroke="#3a3e44" stroke-width="2.4" fill="none"/><path d="M-17,-8 L17,-8 L13,22 L-13,22Z" fill="${col}"/><path d="M-17,-8 L17,-8 L13,22 L-13,22Z" fill="url(#canSh)" opacity=".6"/><ellipse cx="0" cy="-8" rx="17" ry="4" fill="${full ? '#5a8ab0' : '#2a2e34'}"/><ellipse cx="-4" cy="-9" rx="7" ry="1.4" fill="#fff" opacity="${full ? .5 : 0}"/></g>`;
}
function sceneRiver(t) {
  const t0 = WS(3, 7) - .25, T = t - t0, HZ = 690;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#goldS)"/>` + sun3(170, 470, .9) + cumulus(420 + T * 5, 450, 260, 91, { a: .85 }) + cumulus(650 + T * 4, 560, 180, 93, { a: .7 });
  // the city across the river: dead, no smoke, no lights
  s += farCity(97, HZ + 40, '#8a92a0', { hk: 1.25 }) + `<rect x="-20" y="${HZ - 60}" width="760" height="100" fill="#e8d8c0" opacity=".35" filter="url(#blur9)"/>` + `<rect x="-20" y="${HZ + 30}" width="760" height="22" fill="#7a8a6a"/>` + forestR(HZ + 50, 22, 26, 60, 7, '#4a6a3a', { haze: .3, hazeCol: '#d8d0b8' });
  // the river with ripples and the sun's glitter
  s += `<rect x="-20" y="${HZ + 52}" width="760" height="${1300 - HZ - 52}" fill="url(#rivG)"/>` + `<g transform="translate(0,${2 * (HZ + 52)}) scale(1,-1)" opacity=".16">${farCity(97, HZ + 40, '#8a92a0', { hk: 1.25 })}</g>` + `<path d="M150,${HZ + 52} L190,${HZ + 52} L290,1300 L60,1300Z" fill="#fff4d0" opacity=".14"/>`;
  { const r = RS(31); for (let i = 0; i < 70; i++) { const z = r(), y = HZ + 60 + z * z * 380, w = 10 + z * 60, x = pmod(r() * 760 + T * (10 + z * 30), 780) - 30, g = Math.abs(x - 170 - (y - HZ) * .2) < 70;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},-4 ${w.toFixed(1)},0" stroke="${g ? '#fff6d8' : '#d8ecf8'}" stroke-width="${(1.2 + z * 2).toFixed(1)}" fill="none" opacity="${(g ? .7 : .35).toFixed(2)}"/>`; } }
  // the near bank: stone steps down to the water, grass at the top
  const st = [[1300, 0], [1250, 1], [1196, 2], [1150, 3], [1110, 4]];
  s += `<path d="M-20,1010 L740,1060 L740,1300 L-20,1300Z" fill="#9a907e"/><path d="M-20,1010 L740,1060 L740,1300 L-20,1300Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 7; i++) { const y = 1030 + i * 38 + i * i * 2; s += `<path d="M-20,${y} L740,${y + 50}" stroke="#6e6658" stroke-width="3"/><path d="M-20,${y + 3} L740,${y + 53}" stroke="#d8ccb4" stroke-width="2" opacity=".5"/>`; }
  s += `<path d="M-20,1012 L740,1062" stroke="#d8ccb4" stroke-width="4"/><ellipse cx="300" cy="1036" rx="220" ry="10" fill="#1a3a5a" opacity=".35" filter="url(#blur5)"/>`;
  // people: one fills a bucket at the water, two carry water up the steps, one waits with jerrycans
  const k = ease(ramp(t, t0, t0 + 1.4));
  s += hero(250, 1044, Object.assign({ s: .7, face: -1, shade: 1, lean: 24, hF: [192, 1020 + 6 * Math.sin(T * 2)], hB: [204, 992] }, palS(4))) + bucket(192, 1030 + 6 * Math.sin(T * 2), 1.05, 1);
  const wx = 400 + T * 30;
  s += hero(wx, 1130, Object.assign({ s: .8, face: 1, shade: 1, walk: wx / 26, amp: .4, hF: [wx + 20, 1032], hB: [wx - 6, 1036] }, palS(1))) + bucket(HP.hand[0], HP.hand[1] + 24, 1.25, 1, '#c8642a');
  const w2 = 540 + T * 24;
  s += hero(w2, 1206, Object.assign({ s: .86, face: 1, shade: 1, walk: w2 / 26 + 2, amp: .4, hF: [w2 + 22, 1094] }, palS(8))) + bucket(HP.hand[0], HP.hand[1] + 24, 1.3, 1, '#4a7a4a');
  s += hero(84, 1170, Object.assign({ s: .84, face: 1, shade: 1, lookUp: -.05, hF: [104, 1080], hB: [76, 1082] }, palS(5))) + `<g transform="translate(118,1166)"><rect x="-18" y="-60" width="36" height="58" rx="5" fill="#d8b82a"/><rect x="-6" y="-70" width="12" height="12" fill="#a8901a"/><rect x="-18" y="-60" width="36" height="58" rx="5" fill="url(#canSh)" opacity=".6"/></g><g transform="translate(40,1174)"><rect x="-18" y="-60" width="36" height="58" rx="5" fill="#2a6ab0"/><rect x="-6" y="-70" width="12" height="12" fill="#1a4a80"/><rect x="-18" y="-60" width="36" height="58" rx="5" fill="url(#canSh)" opacity=".6"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: no trucks: the shops are empty in three days ----------
const SHELFP = (() => { const r = RS(463), o = []; const X0 = 34, X1 = 686;
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; let x = X0 + 4 + r() * 8;
    while (x < X1 - 50) { const kd = Math.floor(r() * PRODS.length), [c1, c2] = PCOL[Math.floor(r() * PCOL.length)], w = PRODS[kd][1], n = 2 + Math.floor(r() * 4);
      for (let i = 0; i < n && x < X1 - w - 4; i++) { o.push([x, by, kd, c1, c2, r()]); x += w + 3; } x += 7 + r() * 9; } }
  return o; })();
function shelfE(k) {
  const X0 = 34, X1 = 686; let s = `<rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#4e463e"/><rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; s += `<rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="96" fill="#3a332c"/><rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="40" fill="url(#aoDn)" opacity=".8"/>`; }
  SHELFP.forEach(([x, by, kd, c1, c2, rr]) => { if (rr < k * 1.04 - .02) return; const fl = PRODS[kd][0] === 'flat'; s += prod(x, by, kd, c1, c2) + (fl && rr > k * 1.04 + .2 ? prod(x, by - 26, kd, c1, c2) : ''); });
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; s += `<rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="10" fill="#8c8478"/><rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="3" fill="#fff" opacity=".25"/><rect x="${X0 - 12}" y="${by + 10}" width="${X1 - X0 + 24}" height="6" fill="#000" opacity=".3"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${X0 + 40 + i * 108}" y="${by + 1}" width="34" height="8" fill="#f4eed8"/><path d="M${X0 + 45 + i * 108},${by + 5} h18" stroke="#c8382e" stroke-width="2"/>`).join(''); }
  s += `<rect x="${X0 - 12}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X1}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="26" fill="#8a3a2a"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="5" fill="#fff" opacity=".2"/>` +
    `<text x="360" y="416" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#f6f2e4">موادّ غذائيّة</text>`;
  return s;
}
function basket(x, y, s, n) {
  let c = ''; for (let i = 0; i < n; i++) c += prod(-34 + i * 24, -18, [0, 1, 0, 5][i % 4], ...PCOL[(i * 3) % PCOL.length]);
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><g transform="scale(.7)">${c}</g><path d="M-30,-14 L30,-14 L24,18 L-24,18Z" fill="#c8382e" opacity=".9"/><path d="M-30,-14 L30,-14 L24,18 L-24,18Z" fill="url(#canSh)" opacity=".6"/>` + [0, 1, 2, 3].map(i => `<path d="M${-22 + i * 14},-8 v20" stroke="#8a1a12" stroke-width="2"/>`).join('') + `<path d="M-22,-14 Q0,-50 22,-14" stroke="#2a2e34" stroke-width="3" fill="none"/></g>`;
}
function sceneShop(t) {
  const t0 = S0(4) - .2, T = t - t0, FL = 944, k = ease(ramp(t, WS(4, 1), WS(4, 6) + .5)), day = 1 + Math.min(2, Math.floor(ramp(t, WS(4, 2), WS(4, 6) + .2) * 2.999));
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#b8b0a0"/><rect x="-20" y="280" width="760" height="120" fill="#8e877a"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${70 + i * 220}" y="330" width="140" height="16" rx="3" fill="#d2d0c8"/><rect x="${70 + i * 220}" y="342" width="140" height="5" fill="#000" opacity=".3"/>`;
  s += shelfE(k);
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#b4ab98"/>`;
  for (let i = 1; i < 9; i++) { const y = FL + Math.pow(i / 9, 1.7) * (1300 - FL); s += `<path d="M-20,${y.toFixed(1)} H740" stroke="#8c8472" stroke-width="${(1 + i * .25).toFixed(1)}" opacity=".7"/>`; }
  for (let i = -9; i <= 9; i++) s += `<path d="M${360 + i * 46},${FL} L${360 + i * 150},1300" stroke="#8c8472" stroke-width="1.6" opacity=".7"/>`;
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="${FL}" width="760" height="60" fill="url(#aoDn)" opacity=".8"/>`;
  // things dropped on the floor as the shelves empty
  [[120, 1010, 0, 1], [210, 1060, 3, 4], [470, 1000, 5, 2], [640, 1080, 1, 6]].forEach(([x, y, kd, ci], i) => { const a = ease(ramp(t, WS(4, 3) + i * .3, WS(4, 3) + i * .3 + .3)); if (a > 0) s += `<g opacity="${a.toFixed(2)}" transform="rotate(${[-70, 15, 80, -12][i]},${x},${y})">${prod(x, y, kd, ...PCOL[ci])}</g>`; });
  // two shoppers grab the last things
  const ax = lerp(760, 470, ease(ramp(t, t0, WS(4, 3)))), wkA = t < WS(4, 3);
  const A = { s: .9, face: -1, shade: 1, walk: wkA ? ax / 30 : null }; if (!wkA) { const u = .5 + .5 * Math.sin((t - WS(4, 3)) * 5); A.hF = [ax - 70, 830 + 60 * u]; A.hB = [ax - 30, 1040]; A.lookUp = .15; }
  s += hero(ax, 1170, Object.assign(A, palS(7))); if (!wkA) s += basket(ax - 30, 1056, 1, 3);
  const bx = 150 + ease(ramp(t, t0 + .6, WS(4, 4))) * 30;
  s += trolley(bx + 110, 1236, .9) + hero(bx, 1226, Object.assign({ s: .95, face: 1, shade: 1, hF: [bx + 200, 1076], hB: [bx + 196, 1080], lean: 4 }, palS(2)));
  // dim: no ceiling lights, only the window light
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a2238" opacity=".22" style="mix-blend-mode:multiply"/>` + scr(`<path d="M-60,330 L420,470 L760,1300 L-60,1300Z" fill="url(#winLt)" opacity=".55" filter="url(#soft)"/>`);
  // the day counter
  const da = ease(ramp(t, WS(4, 2) - .2, WS(4, 2) + .2)), pop = 1 + .25 * Math.exp(-pmod((t - WS(4, 2)) * 1.5, 1) * 6) * (da > 0 ? 1 : 0);
  if (da > 0) s += `<g opacity="${da.toFixed(2)}">${panel(500, 1050, 190, 110, 1)}${lbl(595, 1092, 'اليوم', 1, '#c8d0dc', 26)}<text x="595" y="1146" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${(52 * pop).toFixed(1)}" fill="${day === 3 ? '#ff7a5a' : '#f4c76b'}">${AR(day)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
