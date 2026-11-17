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
