// ---------- scenes ----------
let F = {};
const RS = s => { const r = R(s * 7919 + 13); r(); return r; };
const AR = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace('.', '٫');
const RDEF = `<filter id="wallI" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -1.4 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="reliefR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="5" seed="21" result="n"/><feDiffuseLighting in="n" surfaceScale="6" lighting-color="#ffffff" result="l"><feDistantLight azimuth="225" elevation="40"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1.3" k2="0" k3="0" k4="0"/></filter>` +
  `<filter id="grainR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .08  0 0 0 0 .06  0 0 0 -2.4 1.3"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="smokeF" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="9"/></filter>` +
  `<filter id="dustR" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".006 .02" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 .78  0 0 0 0 .5  0 0 0 0 .26  0 0 0 1.5 -.35"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<linearGradient id="flameG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe066"/><stop offset=".45" stop-color="#ff9a1f"/><stop offset="1" stop-color="#d8361a" stop-opacity=".2"/></linearGradient>` +
  `<radialGradient id="fireGlow"><stop offset="0" stop-color="#ffb040" stop-opacity=".7"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>`;

// ---- realistic helpers (same family as the earlier Shorts) ----
function bldg(x, base, w, h, col, seed, side = .25) {
  const r = RS(seed), sw = w * side; let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".35"/><path d="M${x + w},${base - h} l${sw},-${sw * .4} l0,${h} l-${sw},${sw * .4}Z" fill="${mix(col, '#000000', .35)}"/><path d="M${x},${base - h} l${sw},-${sw * .4} l${w},0 l-${sw},${sw * .4}Z" fill="${mix(col, '#ffffff', .25)}"/>`;
  const cols = Math.max(2, Math.floor(w / 22)), rows = Math.floor((h - 20) / 30);
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const wx = x + 6 + j * (w - 12) / cols, wy = base - h + 12 + i * 30; s += `<rect x="${wx}" y="${wy}" width="${(w - 12) / cols - 6}" height="16" fill="${r() > .85 ? '#ffd890' : '#5a7a98'}" opacity=".8"/><rect x="${wx}" y="${wy}" width="${((w - 12) / cols - 6) * .4}" height="16" fill="#fff" opacity=".15"/><rect x="${wx - 1}" y="${wy + 16}" width="${(w - 12) / cols - 4}" height="3" fill="#000" opacity=".2"/>`; }
  return s;
}
function shanasheel(x, base, w, h, seed) {
  const r = RS(seed); let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#c8a678"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".6"/><rect x="${x - 4}" y="${base - h - 8}" width="${w + 8}" height="10" fill="#a8865a"/>`;
  const bw = w * .6, bx = x + w * .2, by = base - h * .78, bh = h * .32;
  s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#6a3e1e"/><rect x="${bx - 6}" y="${by + bh}" width="${bw + 12}" height="8" fill="#4a2a12"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${bx + 6 + i * (bw - 12) / 5}" y="${by + 6}" width="${(bw - 12) / 5 - 6}" height="${bh - 12}" fill="#3a2410"/><path d="M${bx + 6 + i * (bw - 12) / 5},${by + 6} l${((bw - 12) / 5 - 6) / 2},-6 l${((bw - 12) / 5 - 6) / 2},6" fill="#8a5a2a"/>` +
    Array.from({ length: 3 }, (_, j) => `<line x1="${bx + 6 + i * (bw - 12) / 5}" y1="${by + 10 + j * (bh - 20) / 3}" x2="${bx + i * (bw - 12) / 5 + (bw - 12) / 5}" y2="${by + 10 + j * (bh - 20) / 3}" stroke="#a87a4a" stroke-width="1.4"/>`).join('')).join('');
  return s + `<path d="M${x + w * .38},${base} L${x + w * .38},${base - 70} Q${x + w * .5},${base - 92} ${x + w * .62},${base - 70} L${x + w * .62},${base}Z" fill="#5a3a1e"/>`;
}
function palmR(x, y, h, t, col = '#3a3424', fr = '#2e4a22', dry = 0) {
  fr = dry ? mix(fr, '#8a7a3a', dry) : fr;
  const tx = x + h * .1, ty = y - h; let s = `<path d="M${x - 7},${y} Q${x + h * .02},${y - h * .55} ${tx - 4},${ty} L${tx + 4},${ty} Q${x + h * .04},${y - h * .55} ${x + 7},${y}Z" fill="${col}"/>`;
  for (let i = 0; i < 16; i++) { const u = i / 16; s += `<path d="M${x - 6 + (tx - x) * u},${y - h * u} l12,-4" stroke="#000" stroke-opacity=".3" stroke-width="2"/>`; }
  [-170, -145, -120, -95, -70, -45, -20, 5, 25].forEach((a, i) => { const ang = (a + Math.sin(t * 1.1 + i) * 1.5 + dry * 12) * Math.PI / 180, Ln = h * .5, ex = tx + Math.cos(ang) * Ln, ey = ty + Math.sin(ang) * Ln * .45 + Ln * .4, cx = tx + Math.cos(ang) * Ln * .5, cy = ty + Math.sin(ang) * Ln * .5 - Ln * .12;
    s += `<path d="M${tx},${ty} Q${cx},${cy} ${ex},${ey}" stroke="${fr}" stroke-width="4" fill="none"/>`;
    for (let j = 1; j < 12; j++) { const u = j / 12, px = (1 - u) * (1 - u) * tx + 2 * (1 - u) * u * cx + u * u * ex, py = (1 - u) * (1 - u) * ty + 2 * (1 - u) * u * cy + u * u * ey, ll = 22 * (1 - u * .7);
      s += `<path d="M${px},${py} l${-ll * .5},${ll} M${px},${py} l${ll * .5},${ll}" stroke="${fr}" stroke-width="2.2" stroke-linecap="round"/>`; } });
  return s + `<circle cx="${tx}" cy="${ty + 6}" r="7" fill="#8a5a2a"/>`;
}
function pine(x, y, h, seed, col, bend = 0) {
  const r = RS(seed); let o = `<g transform="translate(${x},${y}) rotate(${bend})"><path d="M${-h * .02},0 L${-h * .008},${-h * .95} L${h * .008},${-h * .95} L${h * .02},0Z" fill="#3a2a1a"/>`;
  for (let i = 0; i < 9; i++) { const u = i / 9, yb = -h * (.12 + u * .8), w = h * (.3 * Math.pow(1 - u, 1.1) + .035), ht = h * .16; let pts = [`${(r() - .5) * 3},${yb - ht}`];
    for (let k = 0; k <= 9; k++) { const v = k / 9, px = -w + v * 2 * w, droop = (k % 2 ? ht * .16 : -ht * .02) + r() * ht * .1; pts.push(`${px + (r() - .5) * w * .12},${yb + droop}`); }
    o += `<polygon points="${pts.join(' ')}" fill="${col}"/><polygon points="${pts.slice(0, 6).join(' ')}" fill="#000" opacity=".18"/>`; }
  return o + `</g>`;
}
// a car seen from the side; y = where the tyres touch
function car(x, y, s, col, face = 1, lights = 0) {
  return `<g transform="translate(${x},${y}) scale(${face * s},${s})"><ellipse cx="0" cy="2" rx="120" ry="8" fill="#000" opacity=".3"/>` +
    `<path d="M-115,-22 L-112,-52 Q-100,-60 -70,-62 L-40,-96 Q-30,-104 10,-104 L50,-104 Q66,-102 80,-64 L108,-58 Q120,-54 120,-36 L118,-22Z" fill="${col}"/>` +
    `<path d="M-34,-92 L-4,-92 L-4,-64 L-60,-64Z M4,-92 L46,-92 Q58,-90 68,-64 L4,-64Z" fill="#2a3a4a"/><path d="M-30,-90 L-14,-90 L-40,-66 L-52,-66Z" fill="#fff" opacity=".18"/>` +
    `<path d="M-112,-44 L118,-44" stroke="#000" stroke-opacity=".2" stroke-width="2"/><rect x="-6" y="-58" width="12" height="3" fill="#000" opacity=".4"/><rect x="40" y="-58" width="12" height="3" fill="#000" opacity=".4"/>` +
    `<circle cx="-72" cy="-18" r="20" fill="#1a1a1a"/><circle cx="-72" cy="-18" r="10" fill="#9a9aa0"/><circle cx="76" cy="-18" r="20" fill="#1a1a1a"/><circle cx="76" cy="-18" r="10" fill="#9a9aa0"/>` +
    `<rect x="110" y="-50" width="10" height="8" rx="2" fill="${lights ? '#fff6d0' : '#e8e0c0'}"/>` + (lights ? `<path d="M120,-46 L420,-90 L420,10Z" fill="#fff6d0" opacity="${.18 * lights}" filter="url(#blur2)"/>` : '') + `<rect x="-118" y="-50" width="7" height="9" rx="2" fill="#c0302a"/></g>`;
}
// a person holding an umbrella (open = 0..1)
function umb(x, y, c, s, face, open, t, col = '#2a3a5a') {
  let o = person(x, y, { s, face, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t, lookUp: c.lookUp || 0, phase: c.phase, moving: c.moving });
  if (open > .02) { const hx = x + 10 * s * face, top = y - 380 * s, R_ = 82 * s;
    o += `<g opacity="${open}"><path d="M${hx},${y - 150 * s} L${hx},${top}" stroke="#222" stroke-width="${3 * s + 1}"/><path d="M${hx - R_},${top + 18 * s} Q${hx - R_},${top - R_ * .75} ${hx},${top - R_ * .8} Q${hx + R_},${top - R_ * .75} ${hx + R_},${top + 18 * s} q${-R_ / 4},-12 ${-R_ / 2},0 q${-R_ / 4},-12 ${-R_ / 2},0 q${-R_ / 4},-12 ${-R_ / 2},0 q${-R_ / 4},-12 ${-R_ / 2},0Z" fill="${col}"/>` +
      `<path d="M${hx},${top - R_ * .8} Q${hx - R_ * .5},${top - R_ * .4} ${hx - R_ * .5},${top + 12 * s} M${hx},${top - R_ * .8} Q${hx + R_ * .5},${top - R_ * .4} ${hx + R_ * .5},${top + 12 * s}" stroke="#000" stroke-opacity=".25" stroke-width="2" fill="none"/></g>`; }
  return o;
}
// falling rain streaks + splashes on a ground band
function rain(t, a, n = 150, seed = 1, gy0 = 1000, gy1 = 1280) {
  if (a <= 0) return ''; const r = RS(seed); let s = `<g stroke="#d8e6f2" stroke-linecap="round">`;
  for (let i = 0; i < n; i++) { const x0 = r() * 820 - 40, sp = 1300 + r() * 500, ph = r() * 1500, L_ = 26 + r() * 30, y = pmod(ph + t * sp, 1500) - 120, x = x0 - (y + 120) * .12;
    s += `<line x1="${x}" y1="${y}" x2="${x - L_ * .12}" y2="${y + L_}" stroke-width="${1.2 + r()}" opacity="${a * (.25 + .4 * r())}"/>`; }
  s += `</g>`;
  for (let i = 0; i < n * .3; i++) { const sx = r() * 720, sy = gy0 + r() * (gy1 - gy0), ph = pmod(t * 2.2 + r(), 1);
    s += `<ellipse cx="${sx}" cy="${sy}" rx="${3 + 14 * ph}" ry="${1 + 4 * ph}" fill="none" stroke="#e8f2fa" stroke-width="1.4" opacity="${a * .6 * (1 - ph)}"/>`; }
  return s;
}
// cracked-mud plates in perspective between y0 and y1 (k fades the cracks in)
function cracks(y0, y1, k, seed, x0 = -20, x1 = 740, col = '#3a2412', fill = null) {
  if (k <= 0 && !fill) return ''; const r = RS(seed), NU = 12, NV = 10, P = [];
  const map = (u, v) => { const yy = y0 + Math.pow(v, 1.5) * (y1 - y0), sp = .55 + .9 * Math.pow(v, 1.5); return [360 + (u - .5) * (x1 - x0) * sp * 1.25, yy]; };
  for (let j = 0; j <= NV; j++) { P.push([]); for (let i = 0; i <= NU; i++) P[j].push(map(i / NU + (i % NU ? (r() - .5) * .06 : 0), j / NV + (j % NV ? (r() - .5) * .05 : 0))); }
  let s = '';
  if (fill) for (let j = 0; j < NV; j++) for (let i = 0; i < NU; i++) { const q = [P[j][i], P[j][i + 1], P[j + 1][i + 1], P[j + 1][i]]; s += `<polygon points="${q.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ')}" fill="${mix(fill, '#ffffff', r() * .12)}"/>`; }
  s += `<g stroke="${col}" stroke-linecap="round" fill="none" opacity="${k}">`;
  for (let j = 0; j <= NV; j++) for (let i = 0; i <= NU; i++) { const p = P[j][i], w = .8 + 3.2 * (p[1] - y0) / (y1 - y0);
    if (i < NU) { const q = P[j][i + 1]; s += `<path d="M${p[0]},${p[1]} Q${(p[0] + q[0]) / 2 + (r() - .5) * 8},${(p[1] + q[1]) / 2 + (r() - .5) * 4} ${q[0]},${q[1]}" stroke-width="${w}"/>`; }
    if (j < NV) { const q = P[j + 1][i]; s += `<path d="M${p[0]},${p[1]} Q${(p[0] + q[0]) / 2 + (r() - .5) * 10},${(p[1] + q[1]) / 2} ${q[0]},${q[1]}" stroke-width="${w}"/>`; } }
  return s + `</g>`;
}
// river water body between y0..y1 with ripples, glints and a reflected far bank
function riverW(y0, y1, t, o = {}) {
  const c = o.col || ['#5a8a8a', '#2e5a5e'], id = o.id || 'a';
  let s = `<defs><linearGradient id="rv${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></linearGradient></defs><rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="url(#rv${id})"/>`;
  if (o.refl) s += `<rect x="-20" y="${y0}" width="760" height="${Math.min(40, (y1 - y0) * .4)}" fill="${o.refl}" opacity=".35"/>`;
  const n = Math.max(3, Math.floor((y1 - y0) / 14));
  for (let k = 0; k < n; k++) { const yy = y0 + 4 + (k + .5) * (y1 - y0 - 6) / n; let d = `M-20,${yy}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${-1.5 - k * .1} 40,0`;
    s += `<path d="${d}" stroke="${k % 2 ? '#d8eef0' : '#0e2a2e'}" stroke-width="1.4" fill="none" opacity=".22" transform="translate(${Math.sin(t * .9 + k) * 12 + (o.flow || 0) * t * 30 % 40},0)"/>`; }
  if (o.sunX !== undefined) { const r = RS(91); for (let i = 0; i < 26; i++) { const u = r(); s += `<rect x="${o.sunX + (r() - .5) * 160 * (.3 + u)}" y="${y0 + 4 + u * (y1 - y0 - 8)}" width="${6 + u * 20}" height="2" fill="#fff6d8" opacity="${(.3 + .5 * r()) * (.5 + .5 * Math.sin(t * 5 + i))}"/>`; } }
  return s + `<path d="M-20,${y0} L740,${y0}" stroke="#e8f4f2" stroke-width="2" opacity=".5"/>`;
}
// the shared Baghdad street: sky, far skyline, houses, palms, pavement, road (wet 0..1)
function street(t, o = {}) {
  const id = o.id || 'a', sk = o.sky || ['#3f7fc4', '#8ab8e0', '#cfe4f2'], wet = o.wet || 0;
  let s = `<defs>${RDEF}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sk[0]}"/><stop offset=".6" stop-color="${sk[1]}"/><stop offset="1" stop-color="${sk[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${id})"/>`;
  if (o.sun) s += `<defs><radialGradient id="sun${id}"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".6"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs><g opacity="${o.sun}"><circle cx="${o.sunX || 150}" cy="${o.sunY || 470}" r="240" fill="url(#sun${id})"/><circle cx="${o.sunX || 150}" cy="${o.sunY || 470}" r="34" fill="#fffdf2"/></g>`;
  if (o.clouds) { const r = RS(5); for (let i = 0; i < 14; i++) { const cx = pmod(r() * 900 + t * (8 + r() * 6), 1000) - 140, cy = 360 + r() * 360, rr = 90 + r() * 110;
    s += `<g opacity="${o.clouds}"><ellipse cx="${cx}" cy="${cy}" rx="${rr * 1.6}" ry="${rr * .7}" fill="${mix('#5a6270', '#8a929e', r())}" filter="url(#soft)"/><ellipse cx="${cx - rr * .3}" cy="${cy - rr * .25}" rx="${rr}" ry="${rr * .45}" fill="#9aa2ae" opacity=".55" filter="url(#soft)"/></g>`; } }
  const hz = mix(sk[2], '#5a6878', .35), r = RS(7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".75"/>`; if (r() > .7) s += `<rect x="${x + w / 2 - 3}" y="${900 - h - 40}" width="6" height="40" fill="${hz}" opacity=".75"/>`; x += w + 4; }
  s += `<path d="M300,900 L300,760 Q330,700 360,760 L360,900Z" fill="${hz}" opacity=".85"/><rect x="380" y="640" width="12" height="260" fill="${hz}" opacity=".85"/><circle cx="386" cy="636" r="9" fill="${hz}" opacity=".85"/>`;
  s += shanasheel(-10, 1000, 170, 250, 11) + bldg(170, 1000, 110, 330, '#bca68a', 3, .15) + shanasheel(300, 1000, 150, 220, 12) + bldg(460, 1000, 100, 200, '#a8927a', 4, .15) + shanasheel(570, 1000, 160, 190, 13);
  s += palmR(160, 1010, 250, t, '#3a3424', '#2e4a22', o.dry || 0) + palmR(455, 1010, 230, t, '#3a3424', '#2e4a22', o.dry || 0);
  s += `<rect y="1000" width="720" height="56" fill="${mix('#b8ab98', '#6a645a', wet)}"/>` + Array.from({ length: 13 }, (_, i) => `<rect x="${i * 60}" y="1000" width="2" height="56" fill="#000" opacity=".12"/>`).join('') + `<rect y="1054" width="720" height="12" fill="#8a8478"/>`;
  s += `<rect y="1066" width="720" height="220" fill="${mix('#55555a', '#2a2c32', wet)}"/><rect y="1066" width="720" height="220" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1166" width="64" height="7" fill="#e8e4d8" opacity="${.8 - .4 * wet}"/>`).join('');
  if (wet > 0) { s += `<g opacity="${wet}">` + [[60, 'c8a678'], [225, 'bca68a'], [375, 'c8a678'], [510, 'a8927a'], [650, 'c8a678']].map(([cx, c]) => `<rect x="${cx - 40}" y="1070" width="80" height="200" fill="#${c}" opacity=".18" filter="url(#blur2)"/>`).join('') +
    Array.from({ length: 6 }, (_, i) => { const r2 = RS(i + 60); return `<ellipse cx="${r2() * 720}" cy="${1100 + r2() * 160}" rx="${50 + r2() * 70}" ry="${8 + r2() * 8}" fill="${sk[1]}" opacity=".45"/>`; }).join('') + `</g>`; }
  return s;
}

// 0: it is raining on a Baghdad street – then it stops, the clouds clear, umbrellas close: a year with no rain begins
function sceneHook(t) {
  const stop = WS(0, 2) + .25, k = ease(ramp(t, stop, stop + 1.6)), ra = 1 - ramp(t, stop, stop + .35);
  const sky = [mix('#4a525e', '#3f7fc4', k), mix('#6a727e', '#8ab8e0', k), mix('#8a929c', '#cfe4f2', k)];
  let s = street(t, { id: 'h', sky, wet: 1 - .6 * k, clouds: 1 - k, sun: k });
  s += car(560, 1200, .9, '#c8c8cc', -1, 1 - k) + car(140, 1250, .95, '#a83a2a', 1, 1 - k);
  const op = 1 - ease(ramp(t, stop + .6, stop + 1.4));
  s += umb(250, 1040, Object.assign({}, CROWD[0], { lookUp: .35 * k }), .5, 1, op, t, '#1e2a4a') + umb(400, 1046, Object.assign({}, CROWD[1], { lookUp: .4 * k }), .52, -1, op, t, '#7a1e2a') + umb(640, 1036, Object.assign({}, CROWD[3], { lookUp: .3 * k }), .46, -1, op, t, '#2a4a2a');
  s += rain(t, ra, 170, 3);
  F.ov = ''; return s;
}
// 1: the first days – the Tigris still full, normal life on the corniche, a boat on the water
function sceneNormal(t) {
  let s = `<defs>${RDEF}<linearGradient id="skN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fc4"/><stop offset="1" stop-color="#cfe4f2"/></linearGradient><radialGradient id="sunN"><stop offset="0" stop-color="#fffbe8" stop-opacity=".9"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".5"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skN)"/><circle cx="160" cy="470" r="240" fill="url(#sunN)"/><circle cx="160" cy="470" r="32" fill="#fffdf2"/>`;
  const hz = '#8a9aa8', r = RS(17); let x = -20;
  while (x < 740) { const w = 30 + r() * 60, h = 40 + r() * 130; s += `<rect x="${x}" y="${790 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".8"/>`; x += w + 6; }
  s += `<rect y="780" width="720" height="14" fill="#9a8e74"/>` + palmR(80, 790, 120, t) + palmR(260, 790, 110, t) + palmR(420, 790, 130, t);
  s += riverW(794, 1010, t, { id: 'n', sunX: 160, refl: '#7a8a86' });
  const bx = pmod(80 + (t - S0(1)) * 20, 900) - 100;
  s += `<g transform="translate(${bx},905)"><path d="M-60,0 L60,0 L44,20 L-44,20Z" fill="#e8e0d0"/><path d="M-60,0 L60,0 L56,6 L-56,6Z" fill="#2a6a9a"/><rect x="-20" y="-24" width="36" height="24" fill="#f4f0e8"/><rect x="-14" y="-18" width="10" height="10" fill="#4a6a8a"/>${person(28, 2, { s: .2, face: 1, top: '#c84a2a', pants: '#222', skin: '#a46a46', hair: '#111', t })}</g><ellipse cx="${bx}" cy="928" rx="80" ry="6" fill="#fff" opacity=".2"/>`;
  s += `<rect y="1010" width="720" height="270" fill="#c2b49a"/><rect y="1010" width="720" height="270" fill="#000" filter="url(#grainR)" opacity=".3"/><rect y="1010" width="720" height="10" fill="#8a7e6a"/>` + Array.from({ length: 10 }, (_, i) => `<rect x="${i * 80 + 10}" y="960" width="8" height="54" fill="#5a5048"/>`).join('') + `<rect y="962" width="720" height="6" fill="#5a5048"/><rect y="984" width="720" height="4" fill="#5a5048"/>`;
  const walk = (x0, sp, c, sc, ph) => { const xx = pmod(x0 + (t - S0(1)) * sp, 900) - 90; return person(xx, 1180, { s: sc, face: sp > 0 ? 1 : -1, moving: 1, phase: t * 6 + ph, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t }); };
  s += walk(120, 40, CROWD[0], .5, 0) + walk(560, -36, CROWD[1], .52, 1) + walk(330, 30, CROWD[2], .54, 2);
  F.ov = ''; return s;
}
// dam over a reservoir: level 1 = full (spilling), lower = shoreline recedes, white "bathtub ring" shows
function damView(t, level, o = {}) {
  const ly = lerp(690, 560, level);
  let s = `<defs>${RDEF}<linearGradient id="skD${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8ad0"/><stop offset="1" stop-color="#d8e8f2"/></linearGradient><linearGradient id="damC" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8a86"/><stop offset=".5" stop-color="#c8c6c0"/><stop offset="1" stop-color="#7a7a76"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skD${o.id})"/>`;
  s += `<path d="M-20,560 L120,470 L260,520 L400,450 L560,510 L740,460 L740,700 L-20,700Z" fill="#9a8a70" filter="url(#reliefR)"/>`;
  s += `<path d="M-20,560 L120,470 L260,520 L400,450 L560,510 L740,460 L740,560 L-20,560Z" fill="#7a8a5a" opacity=".35"/>`;
  if (level < 1) s += `<rect x="-20" y="560" width="760" height="${ly - 560}" fill="#e8e2d4" opacity=".85"/><rect x="-20" y="560" width="760" height="${ly - 560}" fill="#000" filter="url(#grainR)" opacity=".4"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${560 + (ly - 560) * (i + 1) / 7} L740,${560 + (ly - 560) * (i + 1) / 7}" stroke="#b8ae98" stroke-width="2" opacity=".6"/>`).join('');
  s += riverW(ly, 708, t, { id: 'd' + o.id, col: ['#3a7aa0', '#1e4a6a'] });
  // dam crest + downstream face, spillway, river below, canyon walls
  s += `<path d="M-20,708 L740,708 L740,1280 L-20,1280Z" fill="#8a7a60" filter="url(#reliefR)"/>`;
  s += `<path d="M90,708 L630,708 L560,1000 L160,1000Z" fill="url(#damC)"/><path d="M90,708 L630,708 L560,1000 L160,1000Z" fill="#fff" filter="url(#wallI)" opacity=".35"/><rect x="80" y="696" width="560" height="16" fill="#d8d6d0"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${110 + i * 60}" y="684" width="10" height="14" fill="#9a9894"/>`).join('');
  for (let i = 1; i < 6; i++) s += `<path d="M${90 + i * 90},708 L${160 + i * 67},1000" stroke="#6a6a66" stroke-width="2" opacity=".5"/>`;
  const spill = ramp(level, .9, 1);
  if (spill > 0) for (let i = 0; i < 3; i++) { const xx = 300 + i * 60; s += `<path d="M${xx},712 L${xx + 40},712 L${xx + 34},1000 L${xx + 6},1000Z" fill="#f4faff" opacity="${.85 * spill}"/>` + Array.from({ length: 4 }, (_, j) => { const yy = 712 + pmod(t * 400 + j * 72, 288); return `<rect x="${xx + 8}" y="${yy}" width="24" height="18" fill="#cfe4f2" opacity="${.6 * spill}"/>`; }).join(''); }
  s += `<path d="M-20,700 L92,708 L160,1000 L84,1280 L-20,1280Z" fill="#8a7458" filter="url(#reliefR)"/><path d="M740,700 L628,708 L560,1000 L636,1280 L740,1280Z" fill="#7e6a50" filter="url(#reliefR)"/>` +
    Array.from({ length: 10 }, (_, i) => { const r = RS(i + 40), lft = i < 5, x = lft ? 10 + r() * 90 : 630 + r() * 90, y = 760 + r() * 480; return `<ellipse cx="${x}" cy="${y}" rx="${10 + r() * 10}" ry="${6 + r() * 5}" fill="#4a5a2a" opacity=".8"/>`; }).join('');
  s += `<rect x="160" y="1000" width="400" height="44" fill="#6a6a66"/><rect x="190" y="1010" width="40" height="22" fill="#2a3a4a"/><rect x="250" y="1010" width="40" height="22" fill="#2a3a4a"/><rect x="420" y="1010" width="40" height="22" fill="#2a3a4a"/>`;
  s += `<path d="M160,1044 L560,1044 L640,1280 L80,1280Z" fill="#3a7aa0" opacity="${.35 + .55 * level}"/>`;
  s += `<path d="M560,1000 L600,840 M640,1000 L600,840 M584,900 L616,900 M576,940 L624,940" stroke="#555" stroke-width="5" fill="none"/><path d="M600,840 Q680,800 760,830" stroke="#333" stroke-width="2" fill="none"/>`;
  return s;
}
// 2: the dams are still full – water spills over the gates
function sceneDamFull(t) { const s = damView(t, 1, { id: 'f' }); F.ov = ''; return s; }
// a wheat plant: dry 0..1 turns it from green to straw-brown and makes it wilt
function wheat(x, y, h, dry, seed, t) {
  const r = RS(seed), bend = (6 + 20 * dry) * (r() > .5 ? 1 : -1) * (.6 + .4 * r()) + Math.sin(t * 1.5 + seed) * 2 * (1 - dry);
  const col = mix(mix('#4f8a2e', '#7aa83a', r()), '#8a6a32', dry), ear = mix('#9ab84a', '#9a7a3a', dry);
  const tx = x + Math.sin(bend * Math.PI / 180) * h, ty = y - Math.cos(bend * Math.PI / 180) * h;
  let s = `<path d="M${x},${y} Q${x + (tx - x) * .2},${y - h * .6} ${tx},${ty}" stroke="${col}" stroke-width="${Math.max(1, h * .03)}" fill="none"/>`;
  s += `<path d="M${x},${y - h * .25} q${-h * .25},${-h * .1} ${-h * (.35 - .15 * dry)},${h * (.05 + .25 * dry)}" stroke="${col}" stroke-width="${Math.max(1, h * .025)}" fill="none"/><path d="M${x},${y - h * .4} q${h * .25},${-h * .1} ${h * (.35 - .15 * dry)},${h * (.05 + .3 * dry)}" stroke="${col}" stroke-width="${Math.max(1, h * .025)}" fill="none"/>`;
  return s + `<ellipse cx="${tx}" cy="${ty}" rx="${h * .04}" ry="${h * .12}" fill="${ear}" transform="rotate(${bend},${tx},${ty})"/>`;
}
// 3: after weeks – the field soil dries and cracks, the wheat wilts and turns straw-brown
function sceneSoil(t) {
  const st = S0(2) - .2, dry = ease(ramp(t, WS(2, 4), WS(2, 6) + .6)), crk = ease(ramp(t, WS(2, 3) - .2, WS(2, 4) + .6));
  let s = `<defs>${RDEF}<linearGradient id="skS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8ad0"/><stop offset="1" stop-color="#e8e4d4"/></linearGradient><radialGradient id="sunS"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".6"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skS)"/><circle cx="150" cy="470" r="260" fill="url(#sunS)"/><circle cx="150" cy="470" r="34" fill="#fffdf2"/>`;
  for (let i = 0; i < 9; i++) s += palmR(20 + i * 60 + (i % 2) * 14, 790, 70 + (i % 3) * 16, t, '#4a4434', '#4a5a3a');
  s += `<rect y="786" width="720" height="500" fill="${mix('#6a4a2e', '#dccaa8', crk)}" filter="url(#reliefR)"/><rect y="786" width="720" height="500" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  s += cracks(800, 1280, crk, 31, -20, 740, '#3a2412');
  const r = RS(40);
  for (let row = 0; row < 22; row++) { const v = row / 21, yy = 800 + Math.pow(v, 1.5) * 470, sc = .3 + Math.pow(v, 1.5) * 1.3, n = Math.round(22 + 26 * (1 - v));
    for (let i = 0; i < n; i++) { const xx = (i + .5 + (r() - .5) * .5) / n * 900 - 90; if (row > 15 && xx > 400 && xx < 540) continue; s += wheat(xx, yy, 90 * sc, clamp(dry * (.8 + .4 * r())), row * 100 + i, t); } }
  s += person(470, 1210, { s: .6, face: -1, top: '#e8e2d4', pants: '#4a4a52', skin: '#a46a46', hair: '#1b1410', t, lookUp: -.2 });
  F.ov = ''; return s;
}
// 4: aerial farmland – 8 of 10 plots are rain-fed and turn brown; 2 irrigated by a canal stay green
function sceneFields(t) {
  const k = ease(ramp(t, WS(3, 8), WS(3, 11) + .4));
  let s = `<defs>${RDEF}</defs><rect width="720" height="1280" fill="#a89a78"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<g transform="translate(360,800) scale(1,.66) rotate(-6) translate(-330,-470)">`;
  const W_ = 300, H_ = 170;
  for (let j = 0; j < 5; j++) for (let i = 0; i < 2; i++) { const x = i * (W_ + 60), y = j * (H_ + 22), irr = (j === 4), r = RS(j * 10 + i + 70);
    const g = irr ? mix('#4a8a2a', '#5a9a32', r()) : mix(mix('#4a8a2a', '#6a9a3a', r()), mix('#b89a62', '#a8885a', r()), k);
    s += `<rect x="${x}" y="${y}" width="${W_}" height="${H_}" fill="${g}"/>` + Array.from({ length: 14 }, (_, q) => `<rect x="${x}" y="${y + 6 + q * 12}" width="${W_}" height="3" fill="#000" opacity=".12"/>`).join('');
    if (!irr) { const rc = RS(j * 7 + i + 90); s += `<g stroke="#5a4020" stroke-width="2.4" fill="none" opacity="${.8 * k}">`; for (let q = 0; q < 16; q++) { let px = x + rc() * W_, py = y + rc() * H_, d = `M${px},${py}`; for (let m = 0; m < 4; m++) { px = clamp(px + (rc() - .5) * 70, x + 2, x + W_ - 2); py = clamp(py + (rc() - .5) * 50, y + 2, y + H_ - 2); d += ` L${px},${py}`; } s += `<path d="${d}"/>`; } s += `</g>`; }
    s += `<text x="${x + W_ / 2}" y="${y + H_ / 2 + 14}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="38" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="5" opacity="${ramp(t, WS(3, 8), WS(3, 8) + .4)}">${irr ? 'مروية' : 'مطرية'}</text>`; }
  s += `<rect x="-60" y="${4 * (H_ + 22) + H_ + 8}" width="780" height="26" fill="#3a7aa8"/><rect x="-60" y="${4 * (H_ + 22) + H_ + 12}" width="780" height="4" fill="#cfe8f8" opacity=".6"/>`;
  s += `<rect x="${W_ + 18}" y="-40" width="24" height="1000" fill="#c8b890"/>`;
  for (let i = 0; i < 7; i++) s += `<circle cx="${-40 + i * 120}" cy="-30" r="22" fill="#3a5a2a"/>`;
  s += `</g>`;
  F.ov = ''; return s;
}
function tomato(x, y, r) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="#d8321e"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .28}" fill="#fff" opacity=".35"/><path d="M${x - 6},${y - r + 2} l6,4 l6,-4 l-6,-2Z" fill="#2a6a1a"/>`; }
function orange(x, y, r) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="#f08a1a"/><circle cx="${x}" cy="${y}" r="${r}" fill="#000" filter="url(#grainR)" opacity=".25"/><circle cx="${x - r * .35}" cy="${y - r * .35}" r="${r * .25}" fill="#fff" opacity=".3"/>`; }
function eggplant(x, y, r) { return `<ellipse cx="${x}" cy="${y}" rx="${r * 1.4}" ry="${r * .8}" fill="#4a1e4a" transform="rotate(-20,${x},${y})"/><ellipse cx="${x - r * .4}" cy="${y - r * .3}" rx="${r * .5}" ry="${r * .18}" fill="#fff" opacity=".25" transform="rotate(-20,${x},${y})"/><path d="M${x + r},${y - r * .5} l${r * .6},${-r * .3}" stroke="#2a6a1a" stroke-width="5"/>`; }
function samoon(x, y, r) { return `<path d="M${x - r * 1.5},${y} Q${x},${y - r * 1.1} ${x + r * 1.5},${y} Q${x},${y + r * .6} ${x - r * 1.5},${y}Z" fill="#d89a4a"/><path d="M${x - r},${y - r * .1} Q${x},${y - r * .7} ${x + r},${y - r * .1}" stroke="#f4c88a" stroke-width="3" fill="none"/>`; }
function crateR(x, y, w, fruit, fill, seed) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="110" fill="#9a6a3a"/>` + [0, 1, 2].map(k => `<rect x="${x}" y="${y + k * 38}" width="${w}" height="4" fill="#5a3a1a"/>`).join('') + `<rect x="${x}" y="${y}" width="${w}" height="110" fill="none" stroke="#5a3a1a" stroke-width="4"/>`;
  const r = RS(seed), n = Math.round(16 * fill);
  for (let i = 0; i < n; i++) s += fruit(x + 18 + (i % 5) * (w - 36) / 4 + (r() - .5) * 6, y + 2 - Math.floor(i / 5) * 18 + (r() - .5) * 4, 14);
  return s;
}
// 5: a market stall – half the produce and bread disappears from the crates and the shelf
function sceneMarket(t) {
  const k = ease(ramp(t, WS(3, 14), WS(3, 16) + .3)), f = 1 - .55 * k;
  let s = `<defs>${RDEF}<linearGradient id="awn" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c0392b"/><stop offset=".5" stop-color="#e05a4a"/><stop offset="1" stop-color="#c0392b"/></linearGradient></defs><rect width="720" height="1280" fill="#d8c8a8"/><rect width="720" height="1280" fill="#fff" filter="url(#wallI)" opacity=".5"/>`;
  s += `<path d="M-20,420 L740,420 L740,500 L-20,500Z" fill="url(#awn)"/>` + Array.from({ length: 10 }, (_, i) => `<rect x="${i * 80}" y="420" width="40" height="80" fill="#f4efe4" opacity=".85"/><path d="M${i * 80},500 q20,22 40,0 q20,22 40,0" fill="${i % 2 ? '#f4efe4' : '#c0392b'}"/>`).join('');
  s += `<rect x="40" y="700" width="640" height="16" fill="#6a4a2a"/><rect x="40" y="590" width="640" height="12" fill="#6a4a2a"/>`;
  for (let i = 0; i < 18; i++) if (i / 18 < f) s += i < 9 ? samoon(80 + i * 70, 680, 20) : samoon(80 + (i - 9) * 70, 572, 20);
  s += person(380, 1000, { s: .58, face: -1, top: '#e8e2d4', pants: '#3a3a42', skin: '#9a5e3e', hair: '#1b1410', t });
  s += `<rect x="20" y="1010" width="680" height="30" fill="#7a5230"/><rect x="20" y="1040" width="680" height="240" fill="#6a4426"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="20" y="${1040 + i * 40}" width="680" height="3" fill="#3a2410" opacity=".6"/>`).join('');
  s += crateR(40, 900, 200, tomato, f, 1) + crateR(260, 900, 200, orange, f, 2) + crateR(480, 900, 200, eggplant, f, 3);
  s += `<g transform="translate(600,800) rotate(${-8 + 4 * k})"><rect x="-60" y="-34" width="120" height="68" rx="8" fill="#fff"/><text x="0" y="12" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="${k > .5 ? '#c62828' : '#1a1a1a'}">${k > .5 ? 'السعر ↑' : 'السعر'}</text></g>`;
  s += person(130, 1270, { s: .72, face: 1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .05 });
  F.ov = ''; return s;
}
// 6: the Tigris shrinks to a weak stream; the cracked riverbed shows, boats sit on mud, people walk on the bed
function sceneRiver(t) {
  const k = ease(ramp(t, S0(4) - .1, WS(4, 7) + .3)), crk = ease(ramp(t, WS(4, 8) - .3, WS(4, 9) + .4));
  let s = `<defs>${RDEF}<linearGradient id="skR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#e4dcc8"/></linearGradient><radialGradient id="sunR"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".6"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skR)"/><circle cx="140" cy="470" r="250" fill="url(#sunR)"/><circle cx="140" cy="470" r="32" fill="#fffdf2"/>`;
  const hz = '#8e98a0', r = RS(17); let x = -20;
  while (x < 740) { const w = 30 + r() * 60, h = 40 + r() * 130; s += `<rect x="${x}" y="${790 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".8"/>`; x += w + 6; }
  s += `<rect y="780" width="720" height="14" fill="#9a8e74"/>` + palmR(80, 790, 120, t, '#3a3424', '#2e4a22', .4 * k) + palmR(260, 790, 110, t, '#3a3424', '#2e4a22', .4 * k) + palmR(420, 790, 130, t, '#3a3424', '#2e4a22', .4 * k);
  // the river bed (mud) and the shrinking channel
  s += `<rect y="794" width="720" height="216" fill="#9a8466" filter="url(#reliefR)"/><rect y="794" width="720" height="216" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  s += cracks(800, 1010, crk, 77, -20, 740, '#4a3420');
  const c0 = lerp(794, 872, k), c1 = lerp(1010, 918, k);
  s += riverW(c0, c1, t, { id: 'r', col: [mix('#5a8a8a', '#7a8a6a', k), mix('#2e5a5e', '#4a5a40', k)], sunX: 140 });
  s += `<path d="M-20,${c1} L740,${c1}" stroke="#5a4a32" stroke-width="4" opacity=".6"/>`;
  // bridge with piers
  s += `<rect x="-20" y="742" width="760" height="20" fill="#b8b0a0"/><rect x="-20" y="736" width="760" height="6" fill="#8a8478"/>` + [90, 300, 510].map(px => `<rect x="${px}" y="762" width="34" height="${c0 - 762 + 8 + 60 * k}" fill="#a8a092"/><rect x="${px}" y="${c0 - 8}" width="34" height="${60 * k + 8}" fill="#6a6a5a" opacity=".6"/>`).join('');
  // boats stranded on the mud
  s += `<g transform="translate(560,${lerp(905, 965, k)}) rotate(${-9 * k})"><path d="M-70,0 L70,0 L52,24 L-52,24Z" fill="#e8e0d0"/><path d="M-70,0 L70,0 L66,7 L-66,7Z" fill="#2a6a9a"/><rect x="-24" y="-26" width="40" height="26" fill="#f4f0e8"/></g>`;
  s += `<g transform="translate(160,${lerp(860, 840, k)}) rotate(${6 * k}) scale(.7)"><path d="M-70,0 L70,0 L52,24 L-52,24Z" fill="#d8c8a8"/><path d="M-70,0 L70,0 L66,7 L-66,7Z" fill="#8a3a2a"/></g>`;
  if (k > .6) s += person(lerp(250, 330, ramp(t, WS(4, 8), L(4).end + .2)), 985, { s: .34, face: 1, moving: 1, phase: t * 6, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t });
  s += `<rect y="1010" width="720" height="270" fill="#c2b49a"/><rect y="1010" width="720" height="270" fill="#000" filter="url(#grainR)" opacity=".3"/><rect y="1010" width="720" height="10" fill="#8a7e6a"/>` + Array.from({ length: 10 }, (_, i) => `<rect x="${i * 80 + 10}" y="960" width="8" height="54" fill="#5a5048"/>`).join('') + `<rect y="962" width="720" height="6" fill="#5a5048"/><rect y="984" width="720" height="4" fill="#5a5048"/>`;
  s += person(420, 1200, { s: .6, face: -1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: -.1 });
  F.ov = ''; return s;
}
// analog gauge 0..1
function gauge(x, y, r, v, lab) {
  const a = Math.PI * (1 - v); let s = `<circle cx="${x}" cy="${y}" r="${r + 14}" fill="#1a1e24" opacity=".9"/><path d="M${x - r},${y} A${r},${r} 0 0 1 ${x + r},${y}" stroke="#3a4048" stroke-width="18" fill="none"/>`;
  s += `<path d="M${x - r},${y} A${r},${r} 0 0 1 ${x - r * Math.cos(Math.PI * .3)},${y - r * Math.sin(Math.PI * .3)}" stroke="#e53935" stroke-width="18" fill="none"/><path d="M${x + r * Math.cos(Math.PI * .3)},${y - r * Math.sin(Math.PI * .3)} A${r},${r} 0 0 1 ${x + r},${y}" stroke="#43a047" stroke-width="18" fill="none"/>`;
  return s + `<path d="M${x},${y} L${x + Math.cos(a) * (r - 14)},${y - Math.sin(a) * (r - 14)}" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="10" fill="#fff"/><text x="${x}" y="${y + 52}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">${lab}</text>`;
}
// 7: the reservoir drains – the bathtub ring appears, the spillway is dry, the power gauge falls
function sceneDam(t) {
  const k = ease(ramp(t, S0(5) - .1, WS(5, 2) + .3)), g = ease(ramp(t, WS(5, 2) - .2, WS(5, 4) + .4));
  let s = damView(t, lerp(.95, .18, k), { id: 'e' });
  s += gauge(600, 1150, 80, lerp(.9, .25, g), 'الكهرباء');
  F.ov = ''; return s;
}
// 8: cross-section – the water table sinks; old shallow wells run dry, a rig drills deeper and deeper
function sceneWell(t) {
  const k = ease(ramp(t, S0(6), L(6).end + .2)), gy = 640, wt = lerp(780, 1060, k);
  let s = `<defs>${RDEF}<linearGradient id="skW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#e4dcc8"/></linearGradient><linearGradient id="aqW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ab0"/><stop offset="1" stop-color="#2a4a6a"/></linearGradient></defs><rect width="720" height="${gy}" fill="url(#skW)"/>`;
  s += palmR(70, gy, 150, t, '#3a3424', '#2e4a22', .5) + palmR(640, gy, 140, t, '#3a3424', '#2e4a22', .5) + `<rect x="430" y="${gy - 90}" width="140" height="90" fill="#c8b48a"/><rect x="420" y="${gy - 100}" width="160" height="12" fill="#a8946a"/><rect x="480" y="${gy - 54}" width="30" height="54" fill="#6a4a2a"/>`;
  s += `<rect y="${gy}" width="720" height="${1280 - gy}" fill="#a8845a"/><rect y="${gy + 100}" width="720" height="110" fill="#8a6a4a"/><rect y="${gy}" width="720" height="${1280 - gy}" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  s += `<rect y="${wt}" width="720" height="${1220 - wt}" fill="url(#aqW)" opacity=".75"/><rect y="${wt}" width="720" height="${1220 - wt}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect y="1220" width="720" height="60" fill="#4a4440"/>`;
  s += `<path d="M-20,${wt} Q180,${wt - 8} 360,${wt} T740,${wt}" stroke="#bfe4ff" stroke-width="4" fill="none"/><text x="700" y="${wt - 12}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#e8f6ff" style="paint-order:stroke" stroke="#0a2a4a" stroke-width="4">منسوب المياه الجوفية</text>`;
  s += `<rect x="0" y="${gy - 4}" width="720" height="6" fill="#6a4a2a"/>`;
  [[150, 820], [260, 900]].forEach(([wx, d]) => { const dry = d < wt; s += `<rect x="${wx - 8}" y="${gy}" width="16" height="${d - gy}" fill="#3a2a1a"/><rect x="${wx - 4}" y="${gy}" width="8" height="${d - gy}" fill="${dry ? '#5a4430' : '#4a8ac0'}"/><rect x="${wx - 16}" y="${gy - 40}" width="32" height="40" fill="#8a8a8a"/>` + (dry ? `<text x="${wx}" y="${gy - 54}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#c62828" style="paint-order:stroke" stroke="#fff" stroke-width="4">جاف</text>` : ''); });
  const dd = Math.max(940, wt + 70);
  s += `<path d="M330,${gy} L370,${gy - 180} L410,${gy}" stroke="#d9822b" stroke-width="8" fill="none"/><path d="M345,${gy - 60} h50 M355,${gy - 120} h30" stroke="#d9822b" stroke-width="5"/><rect x="364" y="${gy - 180}" width="12" height="${dd - gy + 180}" fill="#9a9a9a"/><path d="M370,${dd + 16} l-12,-18 h24Z" fill="#555"/>`;
  [[100, '٢٠ م'], [260, '٥٠ م'], [500, '١٠٠ م']].forEach(([d, lab]) => { const yy = gy + d * .62; s += `<path d="M20,${yy} h24" stroke="#fff" stroke-width="3"/><text x="52" y="${yy + 8}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${lab}</text>`; });
  s += `<path d="M640,${lerp(800, 1000, k) - 70} v70" stroke="#ff8a80" stroke-width="6" marker-end="url(#arrW)" opacity="${ramp(t, WS(6, 5), WS(6, 5) + .3)}"/>`;
  s += person(240, gy, { s: .42, face: 1, top: '#e8e2d4', pants: '#4a4a52', skin: '#a46a46', hair: '#1b1410', t, lookUp: -.15 });
  F.ov = ''; return s;
}
function flame(x, y, h, t, seed) {
  const w = h * .32, f = Math.sin(t * 13 + seed) * .12 * h, g = Math.sin(t * 9 + seed * 2) * .06 * h;
  const pth = (s_) => `M${x - w * s_},${y} C${x - w * s_},${y - h * .45 * s_} ${x - w * .2 + g},${y - h * .7 * s_} ${x + f},${y - h * s_} C${x + w * .25 + g},${y - h * .7 * s_} ${x + w * s_},${y - h * .45 * s_} ${x + w * s_},${y}Z`;
  return `<path d="${pth(1)}" fill="#e2431a" opacity=".85"/><path d="${pth(.72)}" fill="#ff8c1a" opacity=".9"/><path d="${pth(.42)}" fill="#ffe066"/>`;
}
// 9: a dry pine forest catches fire – flames run through dry grass, smoke darkens the sky, embers fly
function sceneFire(t) {
  const st = S0(7) - .2, k = ease(ramp(t, st + .3, WS(7, 4) + .2));
  let s = `<defs>${RDEF}<linearGradient id="skF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#7a8aa0', '#3a3030', k)}"/><stop offset="1" stop-color="${mix('#e8c890', '#e8803a', k)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF)"/>`;
  s += `<path d="M-20,760 Q160,700 360,730 T740,710 L740,900 L-20,900Z" fill="#8a7a5a"/>`;
  for (let i = 0; i < 16; i++) { const r = RS(i + 300); s += pine(-10 + i * 48 + r() * 20, 800 + r() * 20, 140 + r() * 60, i + 300, mix('#5a6a3a', '#7a6a3a', r())); }
  s += `<rect y="860" width="720" height="420" fill="#c8a860" filter="url(#reliefR)"/><rect y="860" width="720" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 160; i++) { const r = RS(i + 400), x = r() * 740, y = 870 + Math.pow(r(), 1.3) * 400, h = 10 + (y - 860) * .05; s += `<path d="M${x},${y} l${-3 + r() * 6},${-h} M${x + 3},${y} l${2 + r() * 4},${-h * .8}" stroke="${mix('#b8984a', '#8a6a3a', r())}" stroke-width="1.6"/>`; }
  for (let i = 0; i < 7; i++) { const r = RS(i + 500); s += pine(20 + i * 110 + r() * 30, 1000 + r() * 160, 300 + r() * 120, i + 500, mix('#6a6a3a', '#8a6a3a', r())); }
  // fire front moves right
  const fx = lerp(-80, 640, k);
  s += `<defs><linearGradient id="charG" gradientUnits="userSpaceOnUse" x1="${fx - 260}" y1="0" x2="${fx + 40}" y2="0"><stop offset="0" stop-color="#1a1210" stop-opacity=".7"/><stop offset="1" stop-color="#1a1210" stop-opacity="0"/></linearGradient></defs><rect x="-40" y="868" width="${fx + 120}" height="420" fill="url(#charG)"/>`;
  for (let i = 0; i < 22; i++) { const r = RS(i + 600), x = fx - r() * 520, y = 900 + r() * 360; if (x < -40) continue; const h = (50 + r() * 110) * (.5 + (y - 860) / 420);
    s += `<circle cx="${x}" cy="${y - h * .3}" r="${h}" fill="url(#fireGlow)"/>` + flame(x, y, h, t, i) + flame(x + h * .3, y + 4, h * .7, t, i + 50); }
  for (let i = 0; i < 16; i++) { const r = RS(i + 700), ph = pmod(t * .25 + r(), 1), x = fx - r() * 500 + ph * 120, y = 900 - ph * 600; if (x < -60) continue;
    s += `<circle cx="${x}" cy="${y}" r="${60 + ph * 160}" fill="${mix('#3a3230', '#6a6260', ph)}" opacity="${.7 * (1 - ph) * k}" filter="url(#smokeF)"/>`; }
  for (let i = 0; i < 30; i++) { const r = RS(i + 800), ph = pmod(t * .6 + r(), 1); s += `<circle cx="${fx - r() * 400 + ph * 160}" cy="${1000 - ph * 500}" r="${1.5 + r() * 2}" fill="#ffc04a" opacity="${(1 - ph) * k}"/>`; }
  F.ov = ''; return s;
}
// 10: a dust storm over Baghdad – orange sky, low visibility, headlights on, people cover their faces
function sceneDust(t) {
  const k = ease(ramp(t, WS(7, 5) - .4, WS(7, 7) + .3));
  let s = street(t, { id: 'du', sky: ['#a8602a', '#c8823a', '#d89a52'], dry: .6 });
  s += car(560, 1210, .9, '#c8c8cc', -1, 1) + car(150, 1260, .95, '#2a4a7a', 1, 1);
  s += person(270, 1040, { s: .5, face: 1, moving: 1, phase: t * 6, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, scarf: '#e8e2d4', t }) + person(420, 1046, { s: .52, face: -1, moving: 1, phase: t * 6 + 1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, scarf: '#4a4a52', t });
  s += `<rect x="-40" y="-40" width="800" height="1360" fill="#fff" filter="url(#dustR)" opacity="${.35 + .45 * k}"/><rect width="720" height="1280" fill="#c07a3a" opacity="${.3 + .25 * k}"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 900), y = r() * 1280, x = pmod(r() * 900 + t * (500 + r() * 300), 900) - 90; s += `<path d="M${x},${y} l-${30 + r() * 40},2" stroke="#f0c890" stroke-width="1.5" opacity=".45"/>`; }
  F.ov = ''; return s;
}
// 11: rain returns – clouds roll in, a downpour, and muddy flood water rushes down the street
function sceneRainBack(t) {
  const rk = ramp(t, WS(8, 1) - .2, WS(8, 1) + .6), fl = ease(ramp(t, WS(8, 5) - .3, WS(8, 6) + .4)), lvl = lerp(1290, 1150, fl);
  const sky = ['#3a414c', '#5a626e', '#7a828c'];
  let s = street(t, { id: 'rb', sky, wet: rk, clouds: 1, dry: .3 });
  s += car(560, 1210, .9, '#c8c8cc', -1, 1) + car(150, 1236, .95, '#2a4a7a', 1, 1);
  s += umb(270, 1040, Object.assign({}, CROWD[0], { lookUp: .2 }), .5, 1, rk, t, '#1e2a4a') + umb(420, 1046, Object.assign({}, CROWD[1], { lookUp: .2 }), .52, -1, rk, t, '#7a1e2a');
  if (fl > 0) { s += `<defs><linearGradient id="mudW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a42"/><stop offset="1" stop-color="#5a4228"/></linearGradient></defs>`;
    let d = `M-20,${lvl}`; for (let x = -20; x <= 740; x += 30) d += ` L${x},${lvl + Math.sin(x * .04 - t * 6) * 4}`;
    s += `<path d="${d} L740,1290 L-20,1290Z" fill="url(#mudW)" opacity=".92"/>`;
    for (let i = 0; i < 18; i++) { const r = RS(i + 950), y = lvl + 10 + r() * 180, x = pmod(r() * 900 + t * 260, 900) - 90; s += `<path d="M${x},${y} q20,-4 40,0 q20,4 40,0" stroke="#d8c0a0" stroke-width="2" fill="none" opacity=".5"/>`; }
    s += `<path d="${d}" stroke="#e8d8c0" stroke-width="3" fill="none" opacity=".7"/>`;
    for (let i = 0; i < 3; i++) { const x = pmod(100 + i * 300 + t * 220, 900) - 90; s += `<g transform="translate(${x},${lvl + 6}) rotate(${Math.sin(t * 3 + i) * 10})"><rect x="-26" y="-6" width="52" height="12" fill="#7a5a3a"/></g>`; } }
  s += rain(t, rk, 170, 7, 1000, 1280);
  F.ov = ''; return s;
}
// 12: why – on hard, dry, cracked soil the rain runs off; on moist soil it soaks in
function sceneSoak(t) {
  const st = WS(8, 7) - .3, k = ease(ramp(t, st + .2, L(8).end + .1)), gy = 760;
  let s = `<defs>${RDEF}<linearGradient id="skK" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a414c"/><stop offset="1" stop-color="#8a929c"/></linearGradient><linearGradient id="soakG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5a7a" stop-opacity=".85"/><stop offset="1" stop-color="#3a5a7a" stop-opacity="0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skK)"/>`;
  s += `<rect x="0" y="${gy}" width="358" height="520" fill="#c4a47a"/><rect x="362" y="${gy}" width="358" height="520" fill="#6a4a2e"/><rect y="${gy}" width="720" height="520" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="358" y="380" width="4" height="900" fill="#f4c76b"/>`;
  s += `<defs><clipPath id="cpL"><rect x="0" y="0" width="358" height="1280"/></clipPath></defs><g clip-path="url(#cpL)">` + cracks(gy, gy + 120, 1, 9, -200, 560, '#4a3020') + `<rect x="0" y="${gy}" width="358" height="${40 * k}" fill="url(#soakG)"/>` +
    `<rect x="0" y="${gy - 12 * k}" width="358" height="${12 * k}" fill="#5a7a9a" opacity=".8"/>` + Array.from({ length: 4 }, (_, i) => { const x = pmod(i * 100 + t * 160, 400) - 40; return `<path d="M${x},${gy - 30} l50,0" stroke="#cfe4f2" stroke-width="5" marker-end="url(#arrW)" opacity="${k}"/>`; }).join('') + `</g>`;
  s += `<rect x="362" y="${gy}" width="358" height="${360 * k}" fill="url(#soakG)"/>` + Array.from({ length: 4 }, (_, i) => `<path d="M${420 + i * 80},${gy + 10} l0,${70 + 120 * k}" stroke="#cfe4f2" stroke-width="5" marker-end="url(#arrW)" opacity="${k}"/>`).join('');
  s += `<defs><clipPath id="cpTop"><rect x="0" y="360" width="720" height="${gy - 360}"/></clipPath></defs><g clip-path="url(#cpTop)">` + rain(t, 1, 110, 11, gy - 6, gy) + `</g>`;
  s += `<g font-family="Noto Naskh Arabic" font-weight="700" font-size="30" text-anchor="middle" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4"><text x="180" y="1200">تربة جافة صلبة</text><text x="540" y="1200">تربة رطبة</text>` +
    `<text x="180" y="1240" font-size="24" fill="#ffcf87">الماء يجري فوقها</text><text x="540" y="1240" font-size="24" fill="#bfe4ff">الماء يتسرّب داخلها</text></g>`;
  F.ov = ''; return s;
}
// 13: CTA over the blue planet
function sceneEarth(t) {
  const st = S0(9), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 740, r: 250, a: 1, sunI: 1, lights: .3, rot: 1.0, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 4), WS(9, 4) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneNormal }, { s: WS(1, 6) - .25, f: sceneDamFull }, { s: S0(2) - .2, f: sceneSoil },
  { s: S0(3) - .2, f: sceneFields }, { s: WS(3, 12) - .3, f: sceneMarket }, { s: S0(4) - .2, f: sceneRiver }, { s: S0(5) - .2, f: sceneDam },
  { s: S0(6) - .2, f: sceneWell }, { s: S0(7) - .2, f: sceneFire }, { s: WS(7, 5) - .3, f: sceneDust }, { s: S0(8) - .2, f: sceneRainBack },
  { s: WS(8, 7) - .3, f: sceneSoak }, { s: S0(9) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['الأيام الأولى', S0(1)], ['التربة', S0(2)], ['الغذاء', S0(3)], ['الأنهار', S0(4)], ['السدود', S0(5)], ['الآبار', S0(6)], ['الحرائق', S0(7)], ['الفيضان', S0(8)]];
const LIST_ON = new Set([sceneNormal, sceneSoil, sceneRiver, sceneDust]);
const CHIPS = [
  ['c1', '٣٦٥ يوماً بلا مطر', 360, 330, 'big', WS(0, 7), S0(1) - .3],
  ['c2', 'الأيام الأولى: كل شيء طبيعي', 360, 330, 'big', WS(1, 1), WS(1, 6) - .2],
  ['c3', 'السدود ممتلئة', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c4', 'بعد أسابيع', 360, 330, 'big', WS(2, 1), WS(2, 3)],
  ['c5', 'تجفّ التربة', 360, 330, 'big', WS(2, 3), WS(2, 5)],
  ['c6', 'تذبل المحاصيل', 360, 330, 'big', WS(2, 5), S0(3) - .3],
  ['c7', '٨٠٪ من الأراضي الزراعية', 360, 330, 'big', WS(3, 1), WS(3, 12) - .3],
  ['c8', 'أكثر من نصف غذائنا', 360, 330, 'big', WS(3, 14), S0(4) - .3],
  ['c9', 'دجلة والفرات', 360, 330, 'big', WS(4, 2), WS(4, 6)],
  ['c10', 'جداول ضعيفة', 360, 330, 'big', WS(4, 6), WS(4, 8)],
  ['c11', 'قيعان متشققة', 360, 330, 'big', WS(4, 8), S0(5) - .3],
  ['c12', 'كهرباء أقل', 360, 330, 'red', WS(5, 2), S0(6) - .3],
  ['c13', 'آبار أعمق', 360, 330, 'big', WS(6, 2), WS(6, 5)],
  ['c14', 'المياه الجوفية تنخفض', 360, 330, 'big', WS(6, 5), S0(7) - .3],
  ['c15', 'حرائق', 360, 330, 'red', WS(7, 2), WS(7, 5) - .3],
  ['c16', 'عواصف ترابية', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c17', 'فيضانات', 360, 330, 'red', WS(8, 6), WS(8, 7) - .3],
  ['c18', 'الأرض الصلبة لا تمتص الماء', 360, 330, 'big', WS(8, 11), S0(9) - .3],
  ['c19', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:356px"><div class="hd">سنة بلا مطر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 36; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  const vis = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 36) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act;
    $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + k).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
