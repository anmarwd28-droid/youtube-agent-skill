// ===================== "what if the plague spread again?" (Short #44) =====================
// gl3d_pl.js (from gl3d_mx.js, mirror and 3D-fade fixes kept) adds an infection layer on the Earth: disc.inf = {o: [lat, lon], r (radians), a}:
// a noisy red front from the origin; land tinted, city lights turn red.
const PDEF = `<radialGradient id="mfG" cx=".45" cy=".42"><stop offset="0" stop-color="#fbf4fb"/><stop offset=".7" stop-color="#e8d6ec"/><stop offset="1" stop-color="#b89ac4"/></radialGradient>` +
  `<radialGradient id="labG" cx=".5" cy=".35"><stop offset="0" stop-color="#1c2a40"/><stop offset="1" stop-color="#070b16"/></radialGradient>` +
  `<linearGradient id="ratG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7c70"/><stop offset=".6" stop-color="#5e544c"/><stop offset="1" stop-color="#3e3832"/></linearGradient>` +
  `<linearGradient id="fleaG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8843a"/><stop offset=".6" stop-color="#7a4418"/><stop offset="1" stop-color="#3e200a"/></linearGradient>` +
  `<radialGradient id="lungG" cx=".4" cy=".35"><stop offset="0" stop-color="#f2a6a0"/><stop offset=".7" stop-color="#d4706a"/><stop offset="1" stop-color="#9a4440"/></radialGradient>` +
  `<radialGradient id="dropG"><stop offset="0" stop-color="#e8f4ff" stop-opacity=".7"/><stop offset="1" stop-color="#c8e0f4" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="capR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f06a5a"/><stop offset=".45" stop-color="#c8302a"/><stop offset="1" stop-color="#7a1a14"/></linearGradient>` +
  `<linearGradient id="capW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e6e8ec"/><stop offset="1" stop-color="#a8acb4"/></linearGradient>`;
const PDEFS = () => `${DEFS()}${WDEF}${PDEF}`;
const vec = (la, lo) => { const a = la * Math.PI / 180, b = lo * Math.PI / 180; return [Math.cos(a) * Math.cos(b), Math.cos(a) * Math.sin(b), Math.sin(a)]; };
const toLL = v => [Math.asin(clamp(v[2], -1, 1)) * 180 / Math.PI, Math.atan2(v[1], v[0]) * 180 / Math.PI];
const slerp = (a, b, f) => { const d = Math.acos(clamp(a[0] * b[0] + a[1] * b[1] + a[2] * b[2], -1, 1)), s = Math.sin(d) || 1; return [0, 1, 2].map(i => (Math.sin((1 - f) * d) * a[i] + Math.sin(f * d) * b[i]) / s); };
// a flight arc (great circle lifted above the surface), drawn up to fraction k, with the plane at its head
function flight(G, A, B, k, a) {
  if (a <= 0 || k <= 0) return ''; const va = vec(...A), vb = vec(...B); let d = '', on = false, head = null;
  for (let i = 0; i <= 40 * k; i++) { const f = i / 40, [la, lo] = toLL(slerp(va, vb, f)), h = 1.012 + .16 * Math.sin(Math.PI * f); if (G.vis(la, lo) < .02) { on = false; continue; } const [x, y] = G.P(la, lo, h); d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; head = [x, y]; }
  let s = d ? `<path d="${d}" stroke="#000" stroke-opacity=".35" stroke-width="6" fill="none"/><path d="${d}" stroke="#ff7a5a" stroke-width="3" fill="none" opacity="${a.toFixed(2)}"/>` : '';
  if (head && k < 1) s += `<circle cx="${head[0].toFixed(1)}" cy="${head[1].toFixed(1)}" r="6" fill="#fff" opacity="${a.toFixed(2)}"/>`;
  if (k >= 1 && G.vis(...B) > .1) { const [x, y] = G.P(...B); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#ff3a2a" opacity="${a.toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="none" stroke="#ff6a4a" stroke-width="2" opacity="${(a * .7).toFixed(2)}"/>`; }
  return s;
}
// a pulsing marker on the globe
const pulse = (G, la, lo, t, a, ph = 0) => { if (a <= 0 || G.vis(la, lo) < .15) return ''; const [x, y] = G.P(la, lo, 1.01), p = pmod(t * .7 + ph, 1);
  return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(8 + 34 * p).toFixed(1)}" fill="none" stroke="#ff4a3a" stroke-width="3" opacity="${(a * (1 - p)).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="8" fill="#ff3a2a" opacity="${a.toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#fff" opacity="${a.toFixed(2)}"/>`; };
// a row of ten people icons: k0 of them coloured c0, the rest c1
function people10(y, n, col, a, lab) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}">` + panel(40, y - 90, 640, 200, 1);
  for (let i = 0; i < 10; i++) { const x = 640 - 32 - i * 60, c = i < n ? col : '#d8dee8';
    s += `<circle cx="${x}" cy="${y - 40}" r="13" fill="${c}"/><path d="M${x - 20},${y + 22} C${x - 20},${y - 6} ${x - 14},${y - 22} ${x},${y - 22} C${x + 14},${y - 22} ${x + 20},${y - 6} ${x + 20},${y + 22}Z" fill="${c}"/>`; }
  return s + lbl(360, y + 80, lab, 1, '#fff', 30) + `</g>`;
}
// the microscope field: purple-stained rod bacteria (darker at both ends); k = how many are broken by the drug
function microField(cx, cy, R, t, a, kill = 0) {
  if (a <= 0) return ''; const r = RS(17); let s = `<g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 16}" fill="#2a2f3a"/><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#565c68"/><defs><clipPath id="mfc"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#mfc)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#mfG)"/>`;
  for (let i = 0; i < 70; i++) { const an = r() * 6.283, rr = Math.sqrt(r()) * R * .95, x = cx + Math.cos(an) * rr + Math.sin(t * .7 + i) * 3, y = cy + Math.sin(an) * rr + Math.cos(t * .6 + i) * 3, rot = r() * 180, L = 15 + r() * 9, dead = r() < kill;
    s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(0)})" opacity="${dead ? (1 - kill * .65).toFixed(2) : 1}">` + (dead ? `<rect x="${-L / 2}" y="-3.5" width="${L * .42}" height="7" rx="3.5" fill="#b89ac8"/><rect x="${L * .1}" y="-3.5" width="${L * .38}" height="7" rx="3.5" fill="#b89ac8" transform="rotate(25)"/>` :
      `<rect x="${-L / 2}" y="-4" width="${L}" height="8" rx="4" fill="#9a6ab8"/><rect x="${-L / 2}" y="-4" width="${L * .3}" height="8" rx="4" fill="#5a2a7a"/><rect x="${L / 2 - L * .3}" y="-4" width="${L * .3}" height="8" rx="4" fill="#5a2a7a"/>`) + `</g>`; }
  return s + `<circle cx="${cx - R * .3}" cy="${cy - R * .35}" r="${R * .5}" fill="#fff" opacity=".12" filter="url(#soft)"/></g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="10" filter="url(#blur2)"/></g>`;
}
// a rat (side view, facing left), drawn
function rat(x, y, s, t) {
  const tw = Math.sin(t * 3) * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="48" rx="86" ry="9" fill="#000" opacity=".3" filter="url(#blur2)"/>` +
    `<path d="M70,18 C120,24 150,-6 190,4 C210,10 222,${(26 + tw).toFixed(1)} 238,${(20 + tw).toFixed(1)}" stroke="#c8968a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M70,18 C120,24 150,-6 190,4 C210,10 222,${(26 + tw).toFixed(1)} 238,${(20 + tw).toFixed(1)}" stroke="#e8b8a8" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".6"/>` +
    `<path d="M40,30 L44,46 L56,47 M-20,32 L-26,46 L-14,47" stroke="#d8a090" stroke-width="7" stroke-linecap="round" fill="none"/>` +
    `<path d="M-60,4 C-60,-34 -10,-46 40,-38 C80,-30 92,0 78,24 C66,40 20,44 -20,40 C-44,38 -60,28 -60,4Z" fill="url(#ratG)"/>` +
    Array.from({ length: 18 }, (_, i) => `<path d="M${-40 + i * 6},${-30 + (i % 3) * 4} l6,8" stroke="#a89888" stroke-width="1.4" opacity=".5"/>`).join('') +
    `<path d="M-50,-8 C-80,-16 -100,-6 -112,2 C-104,12 -84,18 -54,18Z" fill="url(#ratG)"/><circle cx="-112" cy="2" r="5" fill="#e09a90"/>` +
    `<ellipse cx="-58" cy="-22" rx="14" ry="16" fill="#8a7a6e"/><ellipse cx="-58" cy="-21" rx="8" ry="10" fill="#e0a8a0"/>` +
    `<circle cx="-82" cy="-4" r="4.6" fill="#120c0a"/><circle cx="-83.5" cy="-5.5" r="1.4" fill="#fff"/>` +
    `<path d="M-104,4 L-136,-4 M-104,6 L-138,8 M-104,8 L-132,18" stroke="#2a2420" stroke-width="1" opacity=".7"/>` +
    `<path d="M-60,4 C-60,-34 -10,-46 40,-38 C80,-30 92,0 78,24" stroke="#fff" stroke-opacity=".12" stroke-width="4" fill="none"/>` +
    `<path d="M-40,34 L-44,46 L-32,47 M24,38 L22,46 L34,47" stroke="#d8a090" stroke-width="7" stroke-linecap="round" fill="none"/></g>`;
}
// a flea (side view), drawn: flattened amber body, bristles, long jumping legs
function flea(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="62" rx="70" ry="7" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-10,22 L-34,46 L-40,62 M10,24 L4,46 L-2,62 M30,18 L58,6 L52,40 L74,62" stroke="#6a3a14" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>` +
    `<path d="M-48,-4 C-50,-30 -20,-46 16,-42 C52,-38 66,-10 58,14 C50,32 14,36 -14,30 C-36,24 -48,14 -48,-4Z" fill="url(#fleaG)"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${-20 + i * 14},-40 Q${-14 + i * 14},-4 ${-22 + i * 14},28" stroke="#3e200a" stroke-width="1.6" fill="none" opacity=".55"/>`).join('') +
    Array.from({ length: 12 }, (_, i) => `<path d="M${-36 + i * 8},${-34 + Math.abs(6 - i) * 2} l4,-7" stroke="#2a1606" stroke-width="1.3"/>`).join('') +
    `<path d="M-48,-4 C-62,-8 -70,4 -66,12 C-60,18 -50,14 -44,10Z" fill="#9a5a24"/><circle cx="-58" cy="2" r="3" fill="#120a04"/><path d="M-66,10 L-74,26" stroke="#5a2e10" stroke-width="2.5"/>` +
    `<path d="M-30,-26 C-10,-38 20,-38 40,-28" stroke="#ffe0b0" stroke-width="3" fill="none" opacity=".35"/></g>`;
}
// lungs with the infection (red patches)
function lungs(x, y, s, k) {
  const L = `M-12,-70 C-50,-74 -96,-30 -100,40 C-102,90 -70,110 -36,96 C-16,88 -10,40 -12,-20Z`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-120 L0,-60 M0,-60 L-30,-30 M0,-60 L30,-30" stroke="#e8d0c8" stroke-width="12" stroke-linecap="round" fill="none"/>` +
    `<path d="${L}" fill="url(#lungG)"/><path d="${L}" fill="url(#lungG)" transform="scale(-1,1)"/>` +
    `<path d="M-30,-30 L-56,10 M-44,-10 L-70,0 M-56,10 L-60,50 M-56,10 L-34,40 M30,-30 L56,10 M44,-10 L70,0 M56,10 L60,50 M56,10 L34,40" stroke="#b05a54" stroke-width="3" fill="none" opacity=".7"/>` +
    `<g opacity="${(k * .85).toFixed(2)}" filter="url(#blur5)"><ellipse cx="-62" cy="30" rx="22" ry="28" fill="#8a1a14"/><ellipse cx="58" cy="54" rx="20" ry="22" fill="#8a1a14"/><ellipse cx="-40" cy="70" rx="16" ry="14" fill="#8a1a14"/><ellipse cx="64" cy="-6" rx="14" ry="16" fill="#8a1a14"/></g></g>`;
}
// a capsule
const capsule = (x, y, rot, s) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s})"><ellipse cx="0" cy="22" rx="34" ry="5" fill="#000" opacity=".25" filter="url(#blur2)"/><path d="M0,-13 L-26,-13 A13,13 0 0 0 -26,13 L0,13Z" fill="url(#capR)"/><path d="M0,-13 L26,-13 A13,13 0 0 1 26,13 L0,13Z" fill="url(#capW)"/><path d="M-30,-7 L24,-7" stroke="#fff" stroke-width="3" opacity=".45" stroke-linecap="round"/></g>`;

// ===================== scenes =====================
const CAFFA = [45.0, 35.4], HUB = [25.3, 55.4];
// 0: the Earth at night: red spreads from one place across the city lights
function sceneHook(t) {
  const k = ease(ramp(t, .2, 2.4));
  gW(t, { d: 7.6, el: .4, lon: 45 - t * 3, off: -2.4, up: .25, lights: 1, sunI: .9, clouds: .3 });
  F.w.disc.inf = { o: CAFFA, r: .05 + 1.05 * k, a: 1 };
  F.ov = ''; return space(t);
}
// 1: the Black Death, about 700 years ago: a third to a half of Europe
function sceneBlack(t) {
  const T = t - S0(1) + .2, G = gW(t, { d: 8.4, el: .62, lon: 20 + T * 1.2, tg: [0, -.25, 0], clouds: .35 });
  const r = .02 + .5 * ease(ramp(t, WS(1, 4), WS(1, 12))) + .5 * ease(ramp(t, WS(1, 13), WS(1, 16) + .4));
  F.w.disc.inf = { o: CAFFA, r, a: 1 };
  const n = t < WS(1, 9) ? 0 : t < WS(1, 10) ? 3 : 5, pa = ease(ramp(t, WS(1, 7) - .2, WS(1, 7) + .3));
  F.ov = `<defs>${PDEFS()}</defs>` + pin(G, 45, 35.4, '١٣٤٧', ease(ramp(t, S0(1), S0(1) + .5)) * (1 - ease(ramp(t, WS(1, 6), WS(1, 7)))), '#ffd0a0', 30) +
    people10(1090, n, '#5a5f6a', pa, n ? (n === 3 ? 'ثلثُ السكّان' : 'إلى نصفِهم') : 'سكّانُ أوروبا');
  return space(t);
}
// 2: the cause: a small bacterium carried by fleas from rats to people
function sceneGerm(t) {
  noEarth(); const T = t - S0(2) + .2, mv = ease(ramp(t, WS(2, 3) - .3, WS(2, 4))), ar = ease(ramp(t, WS(2, 6) - .1, WS(2, 6) + .4)), af = ease(ramp(t, WS(2, 4) - .1, WS(2, 4) + .4)), ah = ease(ramp(t, WS(2, 8) - .1, WS(2, 8) + .4));
  let s = `<defs>${PDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#labG)"/>`;
  const cx = lerp(360, 360, mv), cy = lerp(660, 470, mv), R = lerp(240, 150, mv);
  s += microField(cx, cy, R, t, 1);
  const box = (x, lab, a, inner) => a > 0 ? `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="900" r="96" fill="#101828" stroke="#f4c76b" stroke-width="3" opacity=".95"/>${inner}${lbl(x, 1036, lab, 1, '#fff', 28)}</g>` : '';
  s += box(580, 'فأر', ar, `<g clip-path="url(#cpR)"><defs><clipPath id="cpR"><circle cx="580" cy="900" r="92"/></clipPath></defs>${rat(600, 900, .62, t)}</g>`) +
    box(360, 'برغوث', af, flea(366, 896, .95)) +
    box(140, 'إنسان', ah, `<g clip-path="url(#cpH)"><defs><clipPath id="cpH"><circle cx="140" cy="900" r="92"/></clipPath></defs>${hero(140, 984, Object.assign({ s: .5, face: 1, shade: 1 }, palS(3)))}</g>`);
  s += arrow(474, 900, 470, 900, 0) + (af > 0 && ar > 0 ? arrow(484, 900, 462, 900, ar * af, '#f4c76b', 5) : '') + (ah > 0 ? arrow(264, 900, 242, 900, ah, '#f4c76b', 5) : '');
  F.ov = ''; return s;
}
// 3: its worst form hits the lungs and passes person to person by coughing
function sceneCough(t) {
  const T = t - S0(3) + .2, y0 = PV + 74, ck = WS(3, 5), c = ease(ramp(t, ck - .3, ck + .1)) * (1 - ease(ramp(t, ck + 1.6, ck + 2.2)));
  const xa = 300, xb = 470 - Math.min(T, 2.2) * 10;
  let fg = hero(xa, y0 + 6, Object.assign({ s: .8, face: 1, shade: 1, lean: 10 * c, hF: c > .05 ? [xa + .8 * 30, y0 + 6 - .8 * (262 - 10)] : undefined, closed: c > .5 }, palS(5)));
  fg += hero(xb, y0 + 12, Object.assign({ s: .78, face: -1, shade: 1, walk: T < 2.2 ? xb / 30 : null }, palS(8)));
  if (t > ck - .1) { const p = ramp(t, ck - .1, ck + 1.8), r = RS(31); let d = '';
    for (let i = 0; i < 90; i++) { const an = (r() - .5) * .9, v = 120 + r() * 220, x = xa + 34 + Math.cos(an) * v * p, y = y0 + 6 - .8 * 252 + Math.sin(an) * v * p * .6 + 40 * p * p * r(); d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.5 + r() * 2.2).toFixed(1)}" fill="#e8f4ff" opacity="${((1 - p) * .8).toFixed(2)}"/>`; }
    d += `<ellipse cx="${(xa + 60 + 130 * p).toFixed(1)}" cy="${(y0 - 196).toFixed(1)}" rx="${(30 + 90 * p).toFixed(1)}" ry="${(18 + 40 * p).toFixed(1)}" fill="url(#dropG)" opacity="${(1 - p).toFixed(2)}"/>`; fg += d; }
  let s = `<defs>${PDEFS()}</defs>` + street7(t, { N: 0, id: 'pc', cars: 1, fg });
  const la = ease(ramp(t, WS(3, 2) - .2, WS(3, 3) + .2));
  if (la > 0) s += `<g opacity="${la.toFixed(2)}">` + panel(36, 400, 240, 270, 1) + lungs(156, 556, .9, ease(ramp(t, WS(3, 2), WS(3, 4)))) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 4: once it travelled for years with caravans and ships; today a plane carries it between continents in one day
function sceneTravel(t) {
  const T = t - S0(4) + .2, sw = ease(ramp(t, WS(4, 6) - .3, WS(4, 8) + .2)), lon = lerp(45 + T * 1.5, 60 - (t - WS(4, 6)) * 4, sw);
  const G = gW(t, { d: lerp(8.4, 9.6, sw), el: lerp(.55, .38, sw), lon, tg: [0, -.1, 0], clouds: .35 });
  const route = [[43, 75], [41, 63], [45, 35.4], [41, 29], [38.2, 15.6], [43.3, 5.4], [48.9, 2.3], [51.5, -.1]], rk = ease(ramp(t, S0(4), WS(4, 5) + .3));
  F.w.disc.inf = { o: sw > 0 ? HUB : CAFFA, r: sw > 0 ? .02 + 1.5 * ease(ramp(t, WS(4, 9), WS(4, 14) + .2)) : .05 + .6 * rk, a: 1 - .0 * sw };
  let o = `<defs>${PDEFS()}</defs>`;
  if (sw < 1) { const n = Math.max(2, Math.ceil(route.length * rk)), p = gPath(G, route.slice(0, n)), a = 1 - sw;
    if (p.d) o += `<path d="${p.d}" stroke="#000" stroke-opacity=".4" stroke-width="9" fill="none" opacity="${a.toFixed(2)}"/><path d="${p.d}" stroke="#ffb07a" stroke-width="5" stroke-dasharray="14 10" fill="none" opacity="${a.toFixed(2)}"/>`;
    const yr = Math.round(lerp(1346, 1351, rk)); o += `<g opacity="${(ease(ramp(t, S0(4), S0(4) + .4)) * a).toFixed(2)}">` + panel(200, 1060, 320, 120, 1) + lbl(360, 1110, 'بالقوافلِ والسفن', 1, '#ffd0a0', 26) + lbl(360, 1156, AR(yr), 1, '#fff', 40) + `</g>`; }
  if (sw > 0) { const dests = [[51.5, -.1], [40.6, -73.8], [-33.9, 151.2], [35.7, 139.7], [-23.5, -46.6], [6.5, 3.4], [19.1, 72.9], [55.8, 37.6], [-1.3, 36.8], [1.35, 103.8]];
    dests.forEach((d, i) => { const k = ease(ramp(t, WS(4, 9) + i * .22, WS(4, 9) + i * .22 + 1.3)); o += flight(G, HUB, d, k, sw); });
    const hrs = Math.round(24 * ease(ramp(t, WS(4, 9), WS(4, 14)))); o += `<g opacity="${sw.toFixed(2)}">` + panel(200, 1060, 320, 120, 1) + lbl(360, 1110, 'بالطائرة', 1, '#ffb0a0', 26) + lbl(360, 1156, `${AR(hrs)} ساعة`, 1, '#fff', 40) + `</g>`; }
  F.ov = o; return space(t);
}
// 5: the big difference today: antibiotics; with early treatment about nine in ten survive
function sceneCure(t) {
  noEarth(); const T = t - S0(5) + .2, sp = WS(5, 6) - .1, ma = 1 - ease(ramp(t, sp - .3, sp + .1)), drop = ramp(t, WS(5, 4) - .3, WS(5, 5) + .2), kill = ease(ramp(t, WS(5, 5), sp));
  let s = `<defs>${PDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#labG)"/>`;
  if (ma > 0) { s += `<g opacity="${ma.toFixed(2)}">` + microField(360, 700, 250, t, 1, kill);
    const r = RS(41); for (let i = 0; i < 6; i++) { const x = 160 + i * 80 + (r() - .5) * 30, y = lerp(-80 - r() * 200, 420 + r() * 60, Math.min(1, drop * (1.1 + r() * .3))); s += capsule(x, y, r() * 360 + t * 40, 1.1); } s += `</g>`; }
  const pa = ease(ramp(t, sp, sp + .4)), n = Math.round(9 * ease(ramp(t, WS(5, 9), WS(5, 14))));
  if (pa > 0) { s += `<g opacity="${pa.toFixed(2)}">` + capsule(250, 560, -20, 2.4) + capsule(470, 600, 25, 2.1) + capsule(370, 480, 70, 1.8) + `</g>` + people10(860, n, '#4caf50', pa, 'ينجو ٩ من كلِّ ١٠');
    for (let i = 0; i < n; i++) { const x = 640 - 32 - i * 60; s += `<path d="M${x - 8},${860 - 70} l6,6 l12,-14" stroke="#fff" stroke-width="3" fill="none" opacity="${pa.toFixed(2)}"/>`; } }
  F.ov = ''; return s;
}
// 6: quarantine and rodent control close it in quickly
function sceneContain(t) {
  const T = t - S0(6) + .2, k = ease(ramp(t, WS(6, 4), WS(6, 7) + .3));
  const G = gW(t, { d: 9.2, el: .32, lon: 50 - T * 2, clouds: .35 });
  F.w.disc.inf = { o: HUB, r: lerp(1.25, .06, k), a: 1 };
  const [x, y] = G.P(...HUB), ra = lerp(330, 34, k), a = ease(ramp(t, WS(6, 4) - .2, WS(6, 4) + .3));
  F.ov = a > 0 && G.vis(...HUB) > .1 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${ra.toFixed(1)}" fill="none" stroke="#7ad0ff" stroke-width="5" stroke-dasharray="16 10" opacity="${a.toFixed(2)}"/>` : '';
  return space(t);
}
// 7: the surprise: plague never went away: hundreds of cases are still recorded every year
function sceneNow(t) {
  const T = t - S0(7) + .2, G = gW(t, { d: 9.4, el: .1, lon: lerp(55, -95, ease(ramp(t, WS(7, 8), S0(8) + .2))), clouds: .35 });
  const a = ease(ramp(t, WS(7, 1), WS(7, 3)));
  F.ov = pulse(G, -19, 47, t, a) + pulse(G, 1.5, 30, t, a, .3) + pulse(G, 47, 100, t, a, .6) + pulse(G, -7, -79, t, a, .2) + pulse(G, 35.5, -106, t, a, .5) +
    pin(G, -19, 47, 'مدغشقر', a, '#ffd0c0', 26) + pin(G, 1.5, 30, 'الكونغو', a, '#ffd0c0', 26) + pin(G, -7, -79, 'البيرو', a, '#ffd0c0', 26);
  return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: -20 - (t - S0(8)) * 4, clouds: .4 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 7) - .3, WS(8, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneBlack }, { s: S0(2) - .2, f: sceneGerm }, { s: S0(3) - .2, f: sceneCough }, { s: S0(4) - .2, f: sceneTravel }, { s: S0(5) - .2, f: sceneCure }, { s: S0(6) - .2, f: sceneContain }, { s: S0(7) - .2, f: sceneNow }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneBlack, sceneGerm, sceneTravel, sceneCure, sceneContain, sceneNow]);
const XF = .5;
const TLI = [['الموتُ الأسود', S0(1)], ['البراغيث', S0(2)], ['الرئتان', S0(3)], ['الطائرة', S0(4)]];
const LIST_ON = new Set([sceneCough]);
const CHIPS = [
  ['c1', 'الموتُ الأسود', 360, 330, 'red big', WS(1, 5), S0(2) - .3],
  ['c2', 'يرسينيا الطاعونيّة', 360, 330, 'big', WS(2, 1), WS(2, 3)],
  ['c3', 'الطاعونُ الرئويّ', 360, 330, 'red big', WS(3, 3), S0(4) - .3],
  ['c4', 'يومٌ واحد', 360, 330, 'red big', WS(4, 13), S0(5) - .3],
  ['c5', 'المضادّاتُ الحيويّة', 360, 330, 'big', WS(5, 4), S0(6) - .3],
  ['c6', 'الحجرُ الصحّي', 360, 330, 'big', WS(6, 1), S0(7) - .3],
  ['c7', 'مئاتُ الحالاتِ كلَّ عام', 360, 1200, 'red big', WS(7, 8), S0(8) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الطاعون</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
