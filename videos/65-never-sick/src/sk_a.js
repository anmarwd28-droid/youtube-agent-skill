// sk_a.js (#65): what if nobody ever got sick? A new street, the shield, germs, bacteria + scenes 0-5
const SKDEF = `<radialGradient id="skShield" cx=".5" cy=".5" r=".5"><stop offset=".7" stop-color="#f4c76b" stop-opacity="0"/><stop offset=".93" stop-color="#ffe6a0" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c8" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="skGerm" cx=".38" cy=".34" r=".7"><stop offset="0" stop-color="#d8f4a0"/><stop offset=".5" stop-color="#6aa83a"/><stop offset="1" stop-color="#2a4a18"/></radialGradient>` +
  `<radialGradient id="skRod" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f4c8e0"/><stop offset=".55" stop-color="#c0608a"/><stop offset="1" stop-color="#5a1a3a"/></radialGradient>` +
  `<radialGradient id="skCoc" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#d8d0f8"/><stop offset=".55" stop-color="#7a6ac8"/><stop offset="1" stop-color="#2a2060"/></radialGradient>` +
  `<radialGradient id="skGut" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#f0b8a8"/><stop offset=".7" stop-color="#c87a6a"/><stop offset="1" stop-color="#7a3a34"/></radialGradient>` +
  `<radialGradient id="tcA" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e8f6ff"/><stop offset=".55" stop-color="#8ac0e8"/><stop offset="1" stop-color="#2a5a8a"/></radialGradient>` +
  `<linearGradient id="skSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a929a"/><stop offset=".5" stop-color="#d8dee4"/><stop offset="1" stop-color="#7a828a"/></linearGradient>` +
  `<linearGradient id="skWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8e4"/><stop offset="1" stop-color="#b4c8c0"/></linearGradient>` +
  `<linearGradient id="skFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a4b2ae"/><stop offset="1" stop-color="#6e7e7a"/></linearGradient>`;
const SKD = () => CVD() + SKDEF;
const SKL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);

// ---------- the #65 street: other buildings, a pharmacy in the middle ----------
const SHOPK = [[-4, 146, 'مخبز', '#a8642a'], [150, 140, 'مقهى', '#5a3a2a'], [298, 150, 'صيدليّة', '#1e8a5a'], [456, 132, 'كتب', '#2a4a8a'], [596, 140, 'زهور', '#a83a5a']];
function shopRowK(PV) { const keep = SHOPB.slice(); SHOPB.splice(0, SHOPB.length, ...SHOPK); const r = shopRowB(PV); SHOPB.splice(0, SHOPB.length, ...keep); return r; }
function streetK(t, o = {}) {
  const N = o.N || 0, id = o.id || 'k';
  const sky = [mix('#4a7ec0', '#060c24', N), mix('#a8c8e4', '#16224a', N), mix('#f0e4cc', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  s += sun3(580, 560, .7 * (1 - N)) + cumulus(160 + t * 1.5, 450, 260, 61, { a: .75 * (1 - N) }) + cumulus(560 + t, 520, 190, 63, { a: .6 * (1 - N) });
  let g = farCity(71, 905, mix(sky[2], '#5a6478', .45)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-12, 160, 460, '#b8a48a', 951, 2], [148, 150, 360, '#7a8a96', 952, 1], [298, 158, 420, '#e2d4bc', 953, 0], [456, 140, 520, '#8a5a4a', 954, 2], [596, 160, 380, '#a8b4a0', 955, 1]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowK(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#bcb2a6"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#9c9284" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 46 + 20},${PV} L${q * 46 + 12},${KB}" stroke="#9c9284" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#46484e"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  [[60, 300, 37], [670, 270, 39]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[230, 0], [500, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  g += o.road || '';
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}
// a germ: a lumpy green ball with short hairs (for the street, not the microscope)
function germ(x, y, R, t, seed, a = 1) {
  if (a <= 0) return ''; const r = RS(seed); let d = '', h = '';
  for (let i = 0; i <= 28; i++) { const q = i / 28 * 6.283, k = 1 + .08 * Math.sin(q * 5 + seed) + .04 * Math.sin(q * 11 + t * 3); d += (i ? ' L' : 'M') + (x + Math.cos(q) * R * k).toFixed(1) + ',' + (y + Math.sin(q) * R * k).toFixed(1); }
  for (let i = 0; i < 12; i++) { const q = i / 12 * 6.283 + seed + Math.sin(t * 2 + i) * .1; h += `<path d="M${(x + Math.cos(q) * R).toFixed(1)},${(y + Math.sin(q) * R).toFixed(1)} L${(x + Math.cos(q) * R * 1.45).toFixed(1)},${(y + Math.sin(q) * R * 1.45).toFixed(1)}" stroke="#4a7a2a" stroke-width="${(R * .14).toFixed(1)}" stroke-linecap="round"/><circle cx="${(x + Math.cos(q) * R * 1.48).toFixed(1)}" cy="${(y + Math.sin(q) * R * 1.48).toFixed(1)}" r="${(R * .13).toFixed(1)}" fill="#a8d86a"/>`; }
  return `<g opacity="${a.toFixed(2)}">${h}<path d="${d}Z" fill="url(#skGerm)"/><ellipse cx="${(x - R * .3).toFixed(1)}" cy="${(y - R * .35).toFixed(1)}" rx="${(R * .3).toFixed(1)}" ry="${(R * .18).toFixed(1)}" fill="#fff" opacity=".35"/></g>`;
}
// a gold shield bubble around a person standing at (x, y) of scale s; hit = 0..1 flash
function shieldP(x, y, s, a, hit = 0) {
  if (a <= 0) return ''; const cy = y - 190 * s, rx = 120 * s, ry = 230 * s;
  return scr(`<g opacity="${a.toFixed(2)}"><ellipse cx="${x}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="url(#skShield)"/><ellipse cx="${x}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="none" stroke="#ffe6a0" stroke-width="${(3 + 5 * hit).toFixed(1)}" opacity="${(.6 + .4 * hit).toFixed(2)}"/></g>`);
}

// ---------- 0: hook. A busy street; a cloud of germs drifts in; every person lights up with a gold shield and the germs bounce off ----------
const WALKK = [[60, 1060, 1, 0, .62, 30], [250, 1090, 1, 2, .7, 26], [480, 1060, -1, 1, .62, 28], [650, 1092, -1, 3, .7, 30]];
function sceneHook(t) {
  const sh = ease(ramp(t, 1.4, 2.4));
  let top = '', fx = '';
  const pos = WALKK.map(([x0, y, f, i, s, v], j) => { const x = x0 + f * v * t; top += hero(x, y, Object.assign({ s, face: f, shade: 1, walk: t * 4.4 + j, amp: .42 }, gp(i))); return [x, y, s]; });
  // germs: drift in from the left, wobble, and spring back when they touch a shield
  for (let i = 0; i < 16; i++) { const r = RS(40 + i), y0 = 640 + r() * 420, sp = 90 + r() * 70, ph = r() * 6;
    let x = -60 + (t - r() * 1.2) * sp + Math.sin(t * 2 + ph) * 10, y = y0 + Math.sin(t * 1.6 + ph) * 26, hit = 0;
    pos.forEach(([px, py, s]) => { const cy = py - 190 * s, dx = (x - px) / (120 * s), dy = (y - cy) / (230 * s), d = Math.hypot(dx, dy); if (sh > .3 && d < 1.25) { const k = (1.25 - d) / 1.25; x += dx / (d || 1) * 60 * k; y += dy / (d || 1) * 30 * k; hit = Math.max(hit, k); } });
    fx += germ(x, y, 9 + r() * 7, t, i, clamp((x + 40) / 60) * (1 - .5 * hit)); }
  pos.forEach(([x, y, s], j) => { top += shieldP(x, y, s, sh * (.8 + .2 * Math.sin(t * 3 + j))); });
  noEarth(); F.ov = '';
  return `<defs>${SKD()}</defs>` + streetK(t, { id: 'h0', top: top + fx });
}

// ---------- 1: no cold, no fever, no cancer (three things crossed out), then an immune cell swallows a virus ----------
function tissueBox(x, y, s) {
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="110" ry="14" fill="#000" opacity=".3" filter="url(#blur5)"/><path d="M-100,0 L-100,-90 L100,-90 L100,0Z" fill="#7ab0d8"/><path d="M-100,-90 L-80,-110 L120,-110 L100,-90Z" fill="#a8d0ec"/><path d="M100,0 L120,-20 L120,-110 L100,-90Z" fill="#4a80a8"/>` +
    `<ellipse cx="10" cy="-100" rx="44" ry="8" fill="#2a4a68"/><path d="M-20,-102 Q-40,-170 0,-200 Q20,-170 30,-200 Q60,-160 40,-102Z" fill="#f8fafc"/><path d="M0,-200 Q10,-150 6,-104" stroke="#d8e0e8" stroke-width="3" fill="none"/>` +
    [-60, -20, 20, 60].map(xx => `<circle cx="${xx}" cy="-45" r="14" fill="#fff" opacity=".35"/>`).join('') + `</g>`;
}
function thermo(x, y, s, v) {   // a clinical thermometer lying at an angle; v = mercury fill
  return `<g transform="translate(${x},${y}) rotate(-35) scale(${s})"><rect x="-14" y="-170" width="28" height="200" rx="14" fill="#eef4f8" stroke="#a8b4bc" stroke-width="3"/><circle cx="0" cy="40" r="24" fill="#d8302a"/><circle cx="-7" cy="33" r="7" fill="#fff" opacity=".5"/>` +
    `<rect x="-5" y="${(30 - 190 * v).toFixed(1)}" width="10" height="${(190 * v).toFixed(1)}" fill="#d8302a"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M6,${-150 + i * 18} h8" stroke="#5a646a" stroke-width="2"/>`).join('') + `<rect x="-12" y="-166" width="6" height="190" rx="3" fill="#fff" opacity=".5"/></g>`;
}
function tumour(x, y, s) {
  let g = `<g transform="translate(${x},${y}) scale(${s})">`;
  [[-30, -10, 46, 1], [30, -20, 40, 2], [40, 30, 36, 3], [-20, 34, 42, 4], [6, 6, 38, 5]].forEach(([cx, cy, R, sd]) => { let d = ''; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283, k = 1 + .08 * Math.sin(a * 4 + sd) + .05 * Math.sin(a * 9 + sd * 2); d += (i ? ' L' : 'M') + (cx + Math.cos(a) * R * k).toFixed(1) + ',' + (cy + Math.sin(a) * R * k).toFixed(1); }
    g += `<path d="${d}Z" fill="#000" opacity=".3" transform="translate(5,6)" filter="url(#blur2)"/><path d="${d}Z" fill="url(#tmG)"/><ellipse cx="${cx - R * .3}" cy="${cy - R * .35}" rx="${R * .3}" ry="${R * .18}" fill="#fff" opacity=".25"/><circle cx="${cx + R * .1}" cy="${cy + R * .05}" r="${R * .3}" fill="#5a1a5a" opacity=".35"/>`; });
  return g + `</g>`;
}
function xMark(x, y, R, k) { if (k <= 0) return ''; const a = R * k; return `<g opacity="${Math.min(1, k * 2).toFixed(2)}"><path d="M${x - a},${y - a} L${x + a},${y + a} M${x + a},${y - a} L${x - a},${y + a}" stroke="#000" stroke-opacity=".5" stroke-width="22" stroke-linecap="round" transform="translate(3,4)"/><path d="M${x - a},${y - a} L${x + a},${y + a} M${x + a},${y - a} L${x - a},${y + a}" stroke="#e53935" stroke-width="16" stroke-linecap="round"/></g>`; }
function sceneNo(t) {
  const T = t - (S0(1) - .2), xs = [WS(1, 1), WS(1, 3), WS(1, 5)].map(w => ease(ramp(t, w, w + .35))), mic = ease(ramp(t, WS(1, 6) - .5, WS(1, 6) + .2));
  let s = `<defs>${SKD()}<radialGradient id="tmG" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d8a0d8"/><stop offset=".55" stop-color="#8a3a8a"/><stop offset="1" stop-color="#3a0e3a"/></radialGradient></defs>`;
  // a bedside table at night: the three things on it
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#2a3442"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>` + scr(`<ellipse cx="360" cy="620" rx="420" ry="330" fill="#ffd8a0" opacity=".2" filter="url(#blur16)"/>`);
  s += `<rect x="-20" y="900" width="760" height="40" fill="#7a5034"/><rect x="-20" y="940" width="760" height="380" fill="#5a3824"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#gnWood)" opacity=".35"/><rect x="-20" y="896" width="760" height="8" fill="#9a6a44"/>`;
  const cards = [[140, 'زُكام', tissueBox(140, 880, 1.15)], [365, 'حُمّى', thermo(365, 850, 1.3, .9)], [585, 'سرطان', tumour(585, 800, 1.4)]];
  cards.forEach(([x, lab, art], i) => { s += art + SKL(x, 1010, lab, 1, '#fff', 34) + xMark(x, 790, 80, xs[i]); });
  // then: the microscope view, an immune cell eating a virus
  if (mic > 0) { const k = ease(ramp(t, WS(1, 8), S0(2) - .4)), vx = lerp(470, 395, k), R = 150;
    s += `<g opacity="${mic.toFixed(2)}"><rect x="-20" y="-20" width="760" height="1320" fill="url(#micBg)"/>` + bokehF(t, 12, 5, .7) +
      covV(vx, 760, lerp(60, 24, k), t, { id: 'n1', a: 1 - .9 * k }) + `<g opacity=".93">${cellT(330, 760, R * (1 + .05 * Math.sin(t * 2)), 5, t, 'A')}</g>` +
      `<path d="M${330 + R * .7},${760 - R * .6} Q${vx + 30},${760 - 80} ${vx + 60},760 Q${vx + 30},${760 + 80} ${330 + R * .7},${760 + R * .6}" fill="url(#tcA)" opacity="${(.85 * clamp(k * 2)).toFixed(2)}"/>` +
      SKL(330, 560, 'خليّةٌ مناعيّة', 1, '#bfe6ff', 28) + SKL(520, 650, 'فيروس', 1 - k, '#ff9a8a', 26) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 2: 38 trillion bacteria in your body, more than your own 30 trillion cells ----------
function rodB(x, y, L, w, ang, t, seed) {   // a rod bacterium with a few flagella
  const r = RS(seed); let fl = '';
  for (let i = 0; i < 3; i++) { let d = `M${(-L / 2).toFixed(1)},${((i - 1) * w * .3).toFixed(1)}`; for (let j = 1; j <= 8; j++) d += ` L${(-L / 2 - j * 7).toFixed(1)},${((i - 1) * w * .3 + Math.sin(j * 1.2 + t * 6 + i + seed) * 4).toFixed(1)}`; fl += `<path d="${d}" stroke="#d898b8" stroke-width="1.6" fill="none" opacity=".7"/>`; }
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)})">${fl}<rect x="${-L / 2}" y="${-w / 2}" width="${L}" height="${w}" rx="${w / 2}" fill="url(#skRod)"/><rect x="${-L / 2 + 4}" y="${-w / 2 + 3}" width="${L - 8}" height="${w * .25}" rx="${w * .12}" fill="#fff" opacity=".3"/></g>`;
}
function cocB(x, y, R, n, ang) { let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)})">`; for (let i = 0; i < n; i++) g += `<circle cx="${i * R * 1.8}" cy="${Math.sin(i) * 3}" r="${R}" fill="url(#skCoc)"/><circle cx="${i * R * 1.8 - R * .3}" cy="${Math.sin(i) * 3 - R * .35}" r="${R * .3}" fill="#fff" opacity=".35"/>`; return g + `</g>`; }
function gutView(cx, cy, R, t) {   // a round magnified view of the gut lining crowded with bacteria
  let s = `<defs><clipPath id="gutC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#gutC)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#skGut)"/>`;
  // villi: soft fingers along the bottom
  for (let i = 0; i < 9; i++) { const x = cx - R + i * R / 4 + 10; s += `<path d="M${x - 22},${cy + R} Q${x - 26},${cy + R * .25} ${x},${cy + R * .2} Q${x + 26},${cy + R * .25} ${x + 22},${cy + R}Z" fill="#e89a88"/><path d="M${x - 10},${cy + R * .28} Q${x},${cy + R * .24} ${x + 8},${cy + R * .3}" stroke="#fff" stroke-width="3" opacity=".3" fill="none"/>`; }
  const r = RS(7); for (let i = 0; i < 26; i++) { const x = cx - R + r() * 2 * R, y = cy - R + r() * R * 1.5, a = r() * 180 + t * 10 * (r() - .5); s += r() < .6 ? rodB(x + Math.sin(t + i) * 4, y, 44 + r() * 20, 16, a, t, i) : cocB(x, y, 8, 3 + Math.floor(r() * 3), a); }
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-width="40" opacity=".25" filter="url(#blur9)"/></g>`;
  return s + `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#skSteel)" stroke-width="12"/><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="none" stroke="#2a2e34" stroke-width="3"/>`;
}
function sceneBact(t) {
  const T = t - (S0(2) - .2), z = ease(ramp(t, S0(2) + .2, S0(2) + 1.2)), b1 = ease(ramp(t, WS(2, 4), WS(2, 7) + .3)), b2 = ease(ramp(t, WS(2, 8), WS(2, 11) + .3));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1c2634"/>` + scr(`<ellipse cx="200" cy="760" rx="300" ry="500" fill="#7ac8ff" opacity=".12" filter="url(#blur16)"/>`);
  // a person, big, with the belly marked
  s += hero(190, 1180, Object.assign({ s: 1.45, face: 1, shade: 1, noShadow: 1 }, gp(1)));
  s += `<circle cx="196" cy="${1180 - 225 * 1.45 + 60}" r="${(26 * z).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4"/><path d="M222,${1180 - 225 * 1.45 + 50} L${lerp(222, 380, z).toFixed(1)},${lerp(1180 - 225 * 1.45 + 50, 640, z).toFixed(1)}" stroke="#f4c76b" stroke-width="3" opacity="${z.toFixed(2)}"/>`;
  if (z > 0) s += `<g opacity="${z.toFixed(2)}">${gutView(500, 560, 190 * (.6 + .4 * z), t)}</g>`;
  // the two bars
  const bar = (y, k, w, col, lab, val) => `<g opacity="${clamp(k * 3).toFixed(2)}">${panel(360, y - 52, 340, 128)}<rect x="384" y="${y}" width="${(292 * w * k).toFixed(1)}" height="30" rx="10" fill="${col}"/>${SKL(530, y - 12, lab, 1, '#fff', 22)}${SKL(530, y + 64, val, 1, col, 30)}</g>`;
  s += bar(890, b1, 1, '#e88ab8', 'بكتيريا', '٣٨ تريليون') + bar(1050, b2, 30 / 38, '#8ac0e8', 'خلايا جسمك', '٣٠ تريليون');
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: viruses and germs attack every day, and always fail ----------
function sceneAttack(t) {
  const T = t - (S0(3) - .2), fail = ease(ramp(t, WS(3, 9), WS(3, 11) + .2));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#micBg)"/>` + bokehF(t, 16, 21, .8);
  // the body's own cells: a wall of pale cells along the bottom
  for (let i = 0; i < 7; i++) { const x = i * 120 - 10; let d = ''; for (let j = 0; j <= 30; j++) { const a = j / 30 * 6.283, k = 1 + .05 * Math.sin(a * 3 + i); d += (j ? ' L' : 'M') + (x + Math.cos(a) * 74 * k).toFixed(1) + ',' + (1180 + Math.sin(a) * 90 * k).toFixed(1); }
    s += `<path d="${d}Z" fill="#e8b8a8"/><path d="${d}Z" fill="#000" opacity=".12" filter="url(#blur5)" transform="translate(0,8)"/><circle cx="${x - 6}" cy="1160" r="24" fill="#a85a6a" opacity=".7"/><ellipse cx="${x - 24}" cy="1130" rx="20" ry="10" fill="#fff" opacity=".25"/>`; }
  // attackers: coronavirus-like, rabies-like bullets and green germs come down; immune cells chase and swallow them
  const at = [[150, 0], [330, 1], [520, 2], [620, 0], [240, 2], [440, 1]];
  at.forEach(([x0, k], i) => { const st = S0(3) - .2 + i * .55, u = ease(clamp((t - st) / 2.2)), y = lerp(380, 640 + (i % 3) * 90, u), x = x0 + Math.sin(t * 1.4 + i) * 20;
    if (t < st) return; const caught = clamp((t - st - 2.1) / .7), a = 1 - .85 * caught;
    if (k === 0) s += covV(x, y, 34, t, { id: 'a' + i, a, ph: i });
    else if (k === 1) s += covV(x, y, 28, t, { id: 'b' + i, a, ph: i * 2 });
    else s += germ(x, y, 24, t, i + 50, a);
    const mv = ease(clamp((t - st - .4) / 1.9)), cx = lerp(i % 2 ? 790 : -70, x + (i % 2 ? 30 : -30), mv), cy = lerp(1060, y + 20, mv);
    if (t > st + .4) s += `<g opacity=".92">${cellT(cx, cy, 70, i * 3 + 1, t, 'A')}</g>`;
    if (caught > 0 && caught < 1) s += scr(`<circle cx="${x}" cy="${y}" r="${(40 + 60 * caught).toFixed(1)}" fill="none" stroke="#bfe6ff" stroke-width="4" opacity="${(1 - caught).toFixed(2)}"/>`); });
  s += SKL(360, 720, 'تفشلُ دائماً', fail, '#f4c76b', 44);
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: hospitals empty out; only accidents and births are left ----------
function bedE(x, y, s) {   // an empty, made bed (side view, head on the left)
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="190" ry="12" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-180,0 V-160 M180,0 V-110" stroke="url(#chromeV)" stroke-width="8"/><path d="M-180,-150 h20 M160,-104 h20" stroke="#8a929a" stroke-width="5"/><rect x="-176" y="-92" width="352" height="16" rx="3" fill="#9aa2aa"/>` +
    [-150, 150].map(wx => `<circle cx="${wx}" cy="-8" r="8" fill="#2a2e34"/><path d="M${wx},-16 V-76" stroke="#7a828a" stroke-width="5"/>`).join('') +
    `<rect x="-172" y="-116" width="344" height="28" rx="6" fill="#eef2f4"/><rect x="-162" y="-140" width="100" height="30" rx="14" fill="#fff"/><path d="M-150,-128 q40,-6 80,0" stroke="#d8dee2" stroke-width="3" fill="none"/>` +
    `<rect x="-40" y="-122" width="208" height="16" rx="5" fill="#d0dce4"/><path d="M-40,-116 H168" stroke="#fff" stroke-width="3" opacity=".5"/></g>`;
}
function crib(x, y, s, t) {   // a hospital crib with a newborn wrapped in a blanket
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="80" ry="8" fill="#000" opacity=".25" filter="url(#blur2)"/><path d="M-60,0 V-90 M60,0 V-90" stroke="url(#chromeV)" stroke-width="6"/><rect x="-66" y="-100" width="132" height="12" rx="4" fill="#9aa2aa"/>` +
    `<path d="M-74,-100 L-64,-170 H64 L74,-100Z" fill="#dff0fa" opacity=".55" stroke="#a8c8dc" stroke-width="2"/><ellipse cx="6" cy="-122" rx="38" ry="16" fill="#f4c8d8"/><circle cx="-34" cy="-126" r="15" fill="#e8b48e"/><path d="M-46,-132 q12,-12 24,0" fill="#f4c8d8"/><path d="M-38,-124 q3,2 6,0" stroke="#5a3a2a" stroke-width="1.6" fill="none"/>` +
    `<path d="M-74,-100 L-64,-170 H64 L74,-100" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/></g>`;
}
function sceneWard(t) {
  const T = t - (S0(4) - .2), em = ease(ramp(t, WS(4, 3), WS(4, 4) + .8)), acc = ease(ramp(t, WS(4, 9), WS(4, 10) + .3)), bir = ease(ramp(t, WS(4, 11) - .2, WS(4, 11) + .4));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  s += `<rect x="-20" y="300" width="760" height="70" fill="#e8eeec"/><rect x="-20" y="370" width="760" height="8" fill="#000" opacity=".15"/>` + [60, 300, 540].map((x, i) => `<rect x="${x}" y="318" width="140" height="26" rx="4" fill="#fffef4" opacity="${i === 1 ? 1 : 1 - .6 * em}"/>` + scr(`<ellipse cx="${x + 70}" cy="360" rx="150" ry="90" fill="url(#tubeL)" opacity="${((i === 1 ? .8 : .8 - .5 * em)).toFixed(2)}"/>`)).join('');
  // windows with daylight, a handrail, the floor
  [[40, 560], [300, 560]].forEach(([x, y]) => { s += `<rect x="${x}" y="${y}" width="180" height="230" fill="#cfe4f0"/><rect x="${x}" y="${y + 150}" width="180" height="80" fill="#a8c8a0" opacity=".6"/><path d="M${x + 90},${y} V${y + 230} M${x},${y + 115} H${x + 180}" stroke="#e8eef0" stroke-width="10"/><rect x="${x}" y="${y}" width="180" height="230" fill="none" stroke="#e8eef0" stroke-width="12"/>`; });
  s += `<rect x="262" y="440" width="196" height="54" rx="8" fill="#f4f8f6"/><rect x="262" y="440" width="196" height="54" rx="8" fill="none" stroke="#2a7a5a" stroke-width="3"/>` + lbl(360, 477, 'جناحُ المرضى', 1, '#1a5a3a', 26);
  s += `<rect x="-20" y="842" width="760" height="10" rx="4" fill="#c8d0cc"/><rect x="-20" y="900" width="760" height="60" fill="#8aa49a" opacity=".5"/>`;
  s += `<rect x="-20" y="960" width="760" height="340" fill="url(#skFloor)"/><rect x="-20" y="960" width="760" height="340" fill="#000" filter="url(#grainR)" opacity=".15"/><rect x="-20" y="956" width="760" height="8" fill="#5a6a66"/>` + [130, 370, 610].map(x => `<rect x="${x - 40}" y="970" width="80" height="320" fill="#fff" opacity=".07" filter="url(#blur5)"/>`).join('');
  // back row: three beds, patients fade away and the beds are made
  const PB = [[150, 1010, .78, { skin: '#c08a66', blanket: '#7aa8c8' }], [420, 1010, .78, { skin: '#8d5a3b', blanket: '#8ab8a0', hair: '#d8d8d8' }], [690, 1010, .78, { skin: '#b07a55', blanket: '#9a9ac8' }]];
  PB.forEach(([x, y, sc, o], i) => { const k = clamp(em * 1.6 - i * .3); s += bedE(x, y, sc) + (k < 1 ? `<g opacity="${(1 - k).toFixed(2)}">${bedP(x, y, sc, o)}</g>` : ''); });
  // front: one bed with a leg in a cast (an accident), and a crib with a newborn
  if (acc > 0) s += `<g opacity="${acc.toFixed(2)}">${bedP(230, 1250, 1.05, { skin: '#a46a46', blanket: '#c8a07a', hair: '#1b1410', o2: 0 })}<rect x="250" y="${1250 - 150}" width="110" height="34" rx="16" fill="#f4f4f0" transform="rotate(-8,300,1117)"/><path d="M210,1090 L330,1040" stroke="#7a828a" stroke-width="3"/>${SKL(230, 1300, 'حادث', 1, '#ffd08a', 30)}</g>`;
  if (bir > 0) s += `<g opacity="${bir.toFixed(2)}">${crib(580, 1250, 1.3, t)}${SKL(580, 1300, 'ولادة', 1, '#ffd08a', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: pharmacies close; millions of doctors and nurses look for new jobs ----------
function boxC(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-40" y="-60" width="80" height="60" fill="#c89a5a"/><path d="M-40,-60 L-30,-74 H30 L40,-60Z" fill="#dab070"/><rect x="-40" y="-60" width="80" height="60" fill="#000" filter="url(#grainR)" opacity=".15"/><path d="M-40,-40 H40" stroke="#a87a3a" stroke-width="3"/><path d="M-14,-58 v-12" stroke="#5a8ab8" stroke-width="2"/><rect x="-24" y="-56" width="20" height="24" fill="#f4f4f0"/><rect x="2" y="-52" width="16" height="18" fill="#e8e8f0"/></g>`; }
function scenePharm(t) {
  const T = t - (S0(5) - .2), sh = ease(ramp(t, WS(5, 0), WS(5, 1) + .6)), wk = ease(ramp(t, WS(5, 2), WS(5, 3)));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#c8c0b0"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // the pharmacy front: stone wall, green sign with a cross, a window with shelves, a door
  s += `<rect x="-20" y="360" width="760" height="680" fill="#d8ccb8"/><rect x="-20" y="360" width="760" height="680" fill="#000" filter="url(#gnWood)" opacity=".08"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M-20,${380 + i * 48} H740" stroke="#b8ac98" stroke-width="2"/>`).join('');
  s += `<rect x="40" y="400" width="640" height="90" rx="6" fill="#1e7a52"/><rect x="40" y="400" width="640" height="20" rx="6" fill="#fff" opacity=".12"/>` + `<text x="420" y="465" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="48" fill="#fff">صيدليّة</text>`;
  s += scr(`<g><rect x="100" y="415" width="60" height="60" fill="#3ae08a" opacity=".2" filter="url(#blur5)"/></g>`) + `<path d="M118,445 H142 M130,433 V457" stroke="#4af09a" stroke-width="12" stroke-linecap="round"/>`;
  // the window (left) and the door (right), both with the inside visible
  const shop = (x, y, w, h) => { let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e8f0ec"/>`; for (let r = 0; r < 4; r++) { g += `<rect x="${x}" y="${y + 40 + r * 90}" width="${w}" height="8" fill="#a8b0b0"/>`; const rr = RS(r * 7 + x); for (let i = 0; i < w / 26; i++) g += `<rect x="${x + 6 + i * 26}" y="${y + 40 + r * 90 - 24 - rr() * 30}" width="18" height="${(24 + rr() * 30).toFixed(0)}" fill="${['#e85a4a', '#4a8ad8', '#f4f4f0', '#6ac08a', '#f4c84a'][Math.floor(rr() * 5)]}"/>`; } return g + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" opacity=".15"/>`; };
  s += shop(60, 540, 360, 420) + shop(470, 540, 190, 420);
  // the rolling shutters come down
  s += `<rect x="52" y="530" width="376" height="16" fill="#5a6066"/><rect x="462" y="530" width="206" height="16" fill="#5a6066"/>` + shutter(56, 546, 368, 414 * sh) + shutter(466, 546, 198, 414 * clamp(sh * 1.1));
  if (sh > .7) s += `<g transform="translate(240,${(546 + 414 * sh - 150).toFixed(0)}) rotate(-4)" opacity="${ramp(sh, .7, 1).toFixed(2)}"><rect x="-80" y="-34" width="160" height="68" rx="6" fill="#f8f4e8"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="38" fill="#c0392b">مغلق</text></g>`;
  s += `<rect x="-20" y="1040" width="760" height="260" fill="#9a9488"/><rect x="-20" y="1040" width="760" height="260" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1036" width="760" height="10" fill="#6a665c"/>`;
  // doctors and nurses walk away carrying boxes
  const W = [[300, 1240, .8, 1, 0], [470, 1260, .82, -1, 2], [120, 1270, .84, 1, 4]];
  W.forEach(([x0, y, sc, f, i], j) => { const x = x0 + f * wk * T * 34; const h = { hF: [x + f * 50 * sc, y - 200 * sc], hB: [x + f * 4 * sc, y - 196 * sc] }; s += j === 1 ? nurse(x, y, sc, f, t, { walk: T * 3 + j, h }) : coatP(x, y, sc, f, i, t, { walk: T * 3 + j, h });
    s += boxC(x + f * 20 * sc, y - 170 * sc, sc * .9); });
  noEarth(); F.ov = ''; return s;
}
