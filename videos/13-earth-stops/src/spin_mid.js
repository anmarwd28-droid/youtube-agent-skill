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

function palmG(x, y, h, t, haze = 0, dry = 0) {
  const k = h / 200, trunk = mix('#5a4a36', '#a4aeb6', haze), fr = mix(mix('#3a5a26', '#7a6a3a', dry), '#a2aeb6', haze), fr2 = mix(mix('#4e7a32', '#8a7a46', dry), '#b0bcc2', haze), leaf = h > 120 ? 8 : 5;
  const tx = x + h * .06, ty = y - h;
  let s = `<path d="M${x - 6 * k},${y} Q${x + h * .02},${y - h * .5} ${tx - 3.5 * k},${ty} L${tx + 3.5 * k},${ty} Q${x + h * .05},${y - h * .5} ${x + 6 * k},${y}Z" fill="${trunk}"/>`;
  for (let i = 0; i < 12; i++) { const u = i / 12; s += `<path d="M${x - 5 * k + (tx - x) * u},${y - h * u} l${10 * k},${-3 * k}" stroke="#000" stroke-opacity="${.25 * (1 - haze)}" stroke-width="${1.6 * k}"/>`; }
  for (let i = 0; i < 15; i++) { const ang = (-190 + i * 14.3 + Math.sin(t * 1.1 + i + x) * 1.2) * Math.PI / 180, Ln = h * (.42 + .08 * Math.sin(i * 2.3)), droop = Ln * (.5 + .2 * Math.cos(i));
    const ex = tx + Math.cos(ang) * Ln, ey = ty + Math.sin(ang) * Ln * .45 + droop * .7, cx = tx + Math.cos(ang) * Ln * .55, cy = ty + Math.sin(ang) * Ln * .5 - Ln * .1, col = i % 2 ? fr : fr2;
    const nx = -(ey - ty), ny = ex - tx, nl = Math.hypot(nx, ny) || 1, w = Ln * .1;
    s += `<path d="M${tx},${ty} Q${cx + nx / nl * w},${cy + ny / nl * w} ${ex},${ey} Q${cx - nx / nl * w},${cy - ny / nl * w} ${tx},${ty}Z" fill="${col}"/>`;
    for (let j = 1; j < leaf; j++) { const u = j / leaf, px = (1 - u) ** 2 * tx + 2 * (1 - u) * u * cx + u * u * ex, py = (1 - u) ** 2 * ty + 2 * (1 - u) * u * cy + u * u * ey, ll = w * 1.6 * (1 - u * .6);
      s += `<path d="M${px},${py} l${nx / nl * ll},${ny / nl * ll + 4 * k} M${px},${py} l${-nx / nl * ll},${-ny / nl * ll + 4 * k}" stroke="${col}" stroke-width="${1.5 * k}" stroke-linecap="round"/>`; } }
  return s + `<circle cx="${tx}" cy="${ty + 4 * k}" r="${6 * k}" fill="${mix('#7a4a22', '#a4aeb6', haze)}"/>`;
}
function treeB(x, y, h, seed, haze = 0, dry = 0) {
  const r = RS(seed), g0 = mix(mix('#2e4a1e', '#5a4a26', dry), '#8e9aa2', haze), g1 = mix(mix('#4a6e2e', '#8a7a3a', dry), '#a0acb4', haze), g2 = mix(mix('#6e9442', '#a8944a', dry), '#b6c0c6', haze);
  let s = `<path d="M${x - h * .025},${y} L${x - h * .01},${y - h * .5} L${x + h * .01},${y - h * .5} L${x + h * .025},${y}Z" fill="${mix('#4a3a2a', '#9aa4ac', haze)}"/>`;
  const bl = []; for (let i = 0; i < 14; i++) bl.push([x + (r() - .5) * h * .5, y - h * (.45 + r() * .5), h * (.11 + r() * .09)]);
  bl.forEach(b => { s += `<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="${g0}"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .2}" cy="${b[1] - b[2] * .25}" r="${b[2] * .78}" fill="${g1}"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .35}" cy="${b[1] - b[2] * .4}" r="${b[2] * .42}" fill="${g2}"/>`; });
  return s;
}
const RDEF2 = `<filter id="stainD" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".3 .006" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 .22  0 0 0 0 .2  0 0 0 0 .17  0 0 0 -1.2 .72"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="stalkT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .04" numOctaves="2" seed="13"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.8 1.0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="cropT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" seed="23"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 .75"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="pebT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".18" numOctaves="2" seed="31"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .12  0 0 0 -3 1.6"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const PT = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);

// ===================== "what if the Earth stopped spinning?" =====================
const tStop = () => WS(0, 6) - .1;
// 0: the 3D Earth spinning (faster than real, to read as motion) – then it halts with a jolt
function sceneHook(t) {
  const ts = tStop(), k = clamp((t - ts) / .25), spin = t < ts ? t * 1.6 : ts * 1.6 + (1 - Math.pow(1 - k, 3)) * .25;
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360 + (t > ts && t < ts + .4 ? Math.sin(t * 90) * 8 * (1 - k) : 0), y: 760, r: 240, a: 1, sunI: 1.05, lights: .3, rot: spin - t * .03, tilt: .41 }; F.light = [-700, 300];
  let ov = '';
  if (t < ts) for (let i = 0; i < 3; i++) { const a0 = (t * 3 + i * 2.1) % 6.283; ov += `<path d="M${360 + Math.cos(a0) * 290},${760 + Math.sin(a0) * 90} A290,90 0 0 1 ${360 + Math.cos(a0 + .7) * 290},${760 + Math.sin(a0 + .7) * 90}" stroke="#f4c76b" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>`; }
  if (t > ts) ov += `<circle cx="360" cy="760" r="${250 + 300 * k}" fill="none" stroke="#fff" stroke-width="${8 * (1 - k)}" opacity="${1 - k}"/>`;
  F.ov = ov; F.flash = t > ts ? .5 * (1 - clamp((t - ts) / .3)) : 0; return s;
}
// 1: how fast we are moving: the equator ≈1,670 km/h, Baghdad (33°N) ≈1,400 km/h
function sceneSpeed(t) {
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 760, r: 240, a: 1, sunI: 1.05, lights: .2, rot: .9 + t * .25 - t * .03, tilt: 0 }; F.light = [-600, 300];
  const R_ = 240, by = 760 - R_ * Math.sin(33 * Math.PI / 180), bw = R_ * Math.cos(33 * Math.PI / 180), eq = ramp(t, WS(1, 12) - .2, WS(1, 12) + .3), bg = ramp(t, WS(1, 4), WS(1, 4) + .4);
  let ov = `<g opacity="${eq}"><path d="M120,760 L600,760" stroke="#f4c76b" stroke-width="4"/><path d="M600,760 l-16,-9 l0,18Z" fill="#f4c76b"/><text x="360" y="745" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">خط الاستواء ≈ ١٦٧٠ كم/س</text></g>`;
  ov += `<g opacity="${bg}"><path d="M${360 - bw},${by} L${360 + bw},${by}" stroke="#7ac8ff" stroke-width="3" stroke-dasharray="8 6"/><circle cx="${360 + bw * .25}" cy="${by}" r="7" fill="#ff5a3a"/><text x="${360 + bw * .25}" y="${by - 16}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بغداد ≈ ١٤٠٠ كم/س</text></g>`;
  F.ov = ov; return s;
}
// 2: the stop: everything not anchored keeps going east – cars, bins, signs, fronds and dust shoot to the right; then speed bars vs a jet
function sceneFling(t) {
  const ts = WS(2, 2), u = Math.max(0, t - ts), shake = u > 0 && u < .6 ? Math.sin(t * 80) * 10 * (1 - u / .6) : 0;
  let s = `<g transform="translate(${shake},0)">` + street(t, { id: 'f2', sky: ['#4a86c6', '#92bce0', '#d2e4f0'], sun: 1, sunX: 150, sunY: 480, dry: clamp(u * 2) * .5 }) + `</g>`;
  const fly = (x0, y0, sp, w) => [x0 + u * u * sp * 900 + u * sp * 400, y0 - u * w * 80];
  [[120, 1214, 1, '#c83a2a', 1], [470, 1262, 1.2, '#d8d8dc', -1], [-60, 1262, .9, '#2a4a7a', 1]].forEach(([x, y, sp, c, fc]) => { const p = fly(x, y, sp, .6); s += `<g transform="rotate(${u * 40 * sp},${p[0]},${p[1]})">${car(p[0], p[1], .9, c, fc, 0)}</g>`; if (u > 0) s += `<path d="M${p[0] - 140},${p[1] - 40} L${p[0] - 20},${p[1] - 40}" stroke="#fff" stroke-width="18" opacity=".25" filter="url(#blur2)"/>`; });
  for (let i = 0; i < 26; i++) { const r = RS(i + 30), p = fly(r() * 720, 980 + r() * 280, .6 + r() * .8, r()); if (u > 0) s += `<rect x="${p[0]}" y="${p[1]}" width="${8 + r() * 20}" height="${5 + r() * 10}" fill="${mix('#8a7a5a', '#d8d0c0', r())}" transform="rotate(${u * 600 * r()},${p[0]},${p[1]})"/>`; }
  if (u > 0) s += `<rect x="-40" y="900" width="800" height="400" fill="#c8a878" opacity="${.5 * clamp(u * 2)}" filter="url(#haze)"/>` + Array.from({ length: 40 }, (_, i) => { const r = RS(i + 70), y = 300 + r() * 980, x = pmod(r() * 900 + t * 2400, 900) - 90; return `<path d="M${x},${y} l-${60 + r() * 80},0" stroke="#fff" stroke-width="2" opacity=".5"/>`; }).join('');
  const bars = ramp(t, WS(2, 10) - .2, WS(2, 10) + .3);
  if (bars > 0) s += `<g opacity="${bars}"><rect x="60" y="420" width="600" height="190" rx="18" fill="#0a0e1c" opacity=".78"/>` +
    `<text x="640" y="470" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">بغداد: ١٤٠٠ كم/س</text><rect x="${640 - 520 * bars}" y="484" width="${520 * bars}" height="22" rx="8" fill="#f4c76b"/>` +
    `<text x="640" y="550" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">طائرة نفاثة: ٩٠٠ كم/س</text><rect x="${640 - 334 * bars}" y="564" width="${334 * bars}" height="22" rx="8" fill="#7ac8ff"/>` +
    `<path d="M150,580 l40,-6 l8,-14 l6,0 l-2,14 l26,-4 l6,-8 l4,0 l-2,10 l4,4 l-4,2 l2,10 l-4,0 l-6,-8 l-26,-2 l2,14 l-6,0 l-8,-14 l-40,-4Z" fill="#cfe4ff"/></g>`;
  F.ov = ''; return s;
}
// 3: the air keeps moving: a storm stronger than any hurricane – palms bent flat, dust, debris, torn roofs
function sceneWind(t) {
  const st = S0(3) - .2, k = ease(ramp(t, st, st + 1.2));
  let s = `<defs>${RDEF}<linearGradient id="skW3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#4a86c6', '#5a4a3a', k)}"/><stop offset="1" stop-color="${mix('#d2e4f0', '#b08a5a', k)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skW3)"/>`;
  const r = RS(7); let x = -20; while (x < 740) { const w = 40 + r() * 70, h = 120 + r() * 260; s += bldg(x, 980, w, h, mix('#a89276', '#c8b89a', r()), Math.floor(r() * 99), .12); x += w + 8; }
  s += `<rect y="980" width="720" height="300" fill="#8a7a62"/><rect y="980" width="720" height="300" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  [[120, 1000, 230], [420, 1010, 260], [640, 1000, 210]].forEach(([px, py, h], i) => { s += `<g transform="rotate(${18 * k + Math.sin(t * 9 + i) * 3 * k},${px},${py})">${palmG(px, py, h, t * 3, 0, .2)}</g>`; });
  for (let i = 0; i < 18; i++) { const r2 = RS(i + 40), y = 380 + r2() * 860, xx = pmod(r2() * 900 + t * (1400 + r2() * 900), 900) - 90; s += `<g transform="translate(${xx},${y}) rotate(${t * 900 * r2()})"><rect x="-${6 + r2() * 14}" y="-4" width="${12 + r2() * 28}" height="${4 + r2() * 8}" fill="${mix('#6a5a4a', '#d8d0c0', r2())}"/></g>`; }
  s += `<rect x="-40" y="-40" width="800" height="1360" fill="#fff" filter="url(#dustR)" opacity="${.45 * k}"/>`;
  for (let i = 0; i < 70; i++) { const r2 = RS(i + 90), y = r2() * 1280, xx = pmod(r2() * 900 + t * (1800 + r2() * 800), 900) - 90; s += `<path d="M${xx},${y} l-${80 + r2() * 120},${4 + r2() * 4}" stroke="#f0d8b0" stroke-width="${1 + r2() * 2}" opacity="${.5 * k}"/>`; }
  F.ov = ''; return s;
}
// 4: the oceans keep moving: a wall of water taller than the towers rises behind a coastal city and breaks over it
function sceneWave(t) {
  const st = S0(4) - .2, k = ease(ramp(t, st, L(4).end + .3)), top = lerp(760, 300, k);
  let s = `<defs>${RDEF}<linearGradient id="skV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3a4a"/><stop offset="1" stop-color="#8a98a4"/></linearGradient><linearGradient id="wallW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a9aa6"/><stop offset=".25" stop-color="#2a6070"/><stop offset="1" stop-color="#0c2a34"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skV)"/>`;
  // the wave wall across the whole horizon, with a lighter, translucent upper face and a curling, foaming lip
  let lip = `M-20,${top + 60}`; for (let x = -20; x <= 740; x += 20) lip += ` L${x},${(top + 40 * Math.sin(x * .012 + t * 1.5) + 18 * Math.sin(x * .05 - t * 3)).toFixed(1)}`;
  s += `<path d="${lip} L740,1060 L-20,1060Z" fill="url(#wallW)"/>`;
  for (let q = 0; q < 14; q++) { const y = top + 60 + q * (1000 - top) / 14; s += `<path d="M-20,${y} Q180,${y - 10} 360,${y + 4} T740,${y - 6}" stroke="#cfe8ee" stroke-width="${1 + q * .1}" fill="none" opacity="${.18 - q * .008}" transform="translate(${Math.sin(t + q) * 12},0)"/>`; }
  s += `<path d="${lip}" stroke="#f4fafc" stroke-width="26" fill="none" opacity=".9"/><path d="${lip}" stroke="#ffffff" stroke-width="10" fill="none" transform="translate(0,22)" opacity=".55"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 60), x = r() * 760 - 20, ph = pmod(t * .9 + r(), 1), y = top + 40 * Math.sin(x * .012 + t * 1.5) - ph * 120; s += `<circle cx="${x + ph * 30}" cy="${y}" r="${10 + r() * 26 + ph * 20}" fill="#f4fafc" opacity="${(.7 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }
  s += `<rect x="-20" y="${top - 160}" width="760" height="200" fill="#e8f2f4" opacity="${.25 * k}" filter="url(#haze)"/>`;
  // the city in front: towers, palms, the corniche and the harbour
  const r = RS(13); let x = -20; while (x < 740) { const w = 40 + r() * 60, h = 150 + r() * 260; s += bldg(x, 1040, w, h, mix('#b8a888', '#d8ccb4', r()), Math.floor(r() * 99), .12); x += w + 8; }
  s += palmG(80, 1070, 200, t * 3, 0, 0) + palmG(330, 1070, 220, t * 3, 0, 0) + palmG(600, 1070, 200, t * 3, 0, 0);
  s += `<rect y="1040" width="720" height="40" fill="#b8b0a0"/><rect y="1080" width="720" height="210" fill="#24505a"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M-20,${1100 + q * 30} q180,-8 380,0 t380,0" stroke="#cfe4e8" stroke-width="1.5" fill="none" opacity=".3" transform="translate(${-t * 40 % 80},0)"/>`).join('');
  s += `<rect width="720" height="1280" fill="#0a1420" opacity="${.25 * k}"/>`;
  F.ov = ''; return s;
}
// 5: if it stays stopped, the oceans drain toward the poles and one giant equatorial continent emerges (real map, then the change)
function sceneMap(t) {
  const st = S0(5) - .2, k = ease(ramp(t, WS(5, 3), WS(5, 15) + .3)), mx = 20, my = 560, mw = 680, mh = 340;
  let s = `<defs><clipPath id="mapC"><rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="14"/></clipPath><linearGradient id="landEq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a670" stop-opacity="0"/><stop offset=".25" stop-color="#b89660"/><stop offset=".5" stop-color="#a8864e"/><stop offset=".75" stop-color="#b89660"/><stop offset="1" stop-color="#c8a670" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="seaN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e4a7a"/><stop offset="1" stop-color="#2a5a8a" stop-opacity="0"/></linearGradient><linearGradient id="seaS" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1e4a7a"/><stop offset="1" stop-color="#2a5a8a" stop-opacity="0"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="#0a1020"/>` + stars(.6, t);
  s += `<g clip-path="url(#mapC)"><image href="tex/earth_atmos_2048.jpg" x="${mx}" y="${my}" width="${mw}" height="${mh}" preserveAspectRatio="none"/>`;
  s += `<rect x="${mx}" y="${my + mh * .25}" width="${mw}" height="${mh * .5}" fill="url(#landEq)" opacity="${.92 * k}"/><rect x="${mx}" y="${my}" width="${mw}" height="${mh * (.18 + .12 * k)}" fill="url(#seaN)" opacity="${.95 * k}"/><rect x="${mx}" y="${my + mh * (.82 - .12 * k)}" width="${mw}" height="${mh * (.18 + .12 * k)}" fill="url(#seaS)" opacity="${.95 * k}"/>`;
  for (let q = 0; q < 4; q++) { const y = my + mh * (.06 + q * .03); s += `<path d="M${mx},${y} L${mx + mw},${y}" stroke="#cfe4ff" stroke-width="1.4" opacity="${.3 * k}" stroke-dasharray="10 14" stroke-dashoffset="${-t * 30}"/><path d="M${mx},${my + mh - (y - my)} L${mx + mw},${my + mh - (y - my)}" stroke="#cfe4ff" stroke-width="1.4" opacity="${.3 * k}" stroke-dasharray="10 14" stroke-dashoffset="${-t * 30}"/>`; }
  s += `</g><rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="14" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M${mx},${my + mh / 2} L${mx + mw},${my + mh / 2}" stroke="#f4c76b" stroke-width="2" stroke-dasharray="6 8" opacity=".8"/>`;
  [[my - 20, 'محيط القطب الشمالي', '#9ccaff', WS(5, 8)], [my + mh / 2 + 10, 'قارّة واحدة عملاقة', '#f4c76b', WS(5, 13)], [my + mh + 44, 'محيط القطب الجنوبي', '#9ccaff', WS(5, 8)]].forEach(([y, txt, c, a]) => { s += `<text x="360" y="${y}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="${c}" style="paint-order:stroke" stroke="#000" stroke-width="5" opacity="${ramp(t, a, a + .4)}">${txt}</text>`; });
  s += `<text x="360" y="${my + mh + 100}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#cfd8ff" opacity="${ramp(t, WS(5, 13), WS(5, 13) + .4)}">بعد آلاف السنين من التوقّف</text>`;
  F.ov = ''; return s;
}
// 6: one day lasts a year: six months of scorching day, then six months of freezing night, in the same Baghdad street
function sceneDayNight(t) {
  const n = ease(ramp(t, WS(6, 9) - .3, WS(6, 9) + .7));
  const sky = [mix('#7aa8d8', '#03050f', n), mix('#e8eef0', '#0c1024', n), mix('#fff6e0', '#1a2034', n)];
  let s = street(t, { id: 'dn' + Math.round(n * 10), sky, sun: 1 - n, sunX: 360, sunY: 430, dry: .9 * (1 - n) });
  if (n < 1) s += `<rect width="720" height="1280" fill="#fff4d0" opacity="${.18 * (1 - n)}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${960 + i * 18} q180,${Math.sin(t * 4 + i) * 6} 380,0 t380,0" stroke="#fff" stroke-width="2" fill="none" opacity="${.12 * (1 - n)}"/>`).join('');
  if (n > 0) s += stars(n, t) + `<rect y="990" width="720" height="300" fill="#e8f0f8" opacity="${.75 * n}"/><rect width="720" height="1280" fill="#0a1430" opacity="${.35 * n}"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${i * 150 + 20},1000 l30,-6 l40,4 l50,-4" stroke="#f4fbff" stroke-width="6" fill="none" opacity="${n}"/>`).join('');
  s += car(300, 1218, .9, '#8a8a8a', 1, 0);
  const lbl = (txt, a, c) => `<g opacity="${a}"><rect x="200" y="440" width="320" height="64" rx="16" fill="${c}"/><text x="360" y="484" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#1c140a">${txt}</text></g>`;
  s += lbl('٦ أشهر نهار ☀', ramp(t, WS(6, 5), WS(6, 5) + .3) * (1 - n), '#f4c76b') + lbl('٦ أشهر ليل', n, '#9ccaff');
  F.ov = ''; return s;
}
// 7: the good news: the real Earth slows very gently – the day grows by about 2 thousandths of a second per century
function sceneSlow(t) {
  const st = S0(7) - .2, k = ease(ramp(t, WS(7, 8), L(7).end));
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 820, r: 220, a: 1, sunI: 1.05, lights: .4, rot: 1.4, tilt: .41 }; F.light = [-700, 300];
  const yr = Math.round(lerp(2026, 2126, k)), ms = (.002 * k).toFixed(3);
  F.ov = `<g opacity="${ramp(t, WS(7, 8) - .3, WS(7, 8))}"><rect x="150" y="440" width="420" height="130" rx="18" fill="#0a0e1c" opacity=".8" stroke="#f4c76b" stroke-opacity=".5"/><text x="360" y="490" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#cfd8ff">طول اليوم — سنة ${AR(yr)}</text><text x="360" y="548" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="44" fill="#f4c76b" style="direction:ltr">24:00:00.${ms.split('.')[1]}</text></g>`;
  return s;
}
// 8: CTA
function sceneEarth(t) {
  const st = S0(8), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: 1, lights: .4, rot: .8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 2), WS(8, 2) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpeed }, { s: S0(2) - .2, f: sceneFling }, { s: S0(3) - .2, f: sceneWind }, { s: S0(4) - .2, f: sceneWave },
  { s: S0(5) - .2, f: sceneMap }, { s: S0(6) - .2, f: sceneDayNight }, { s: S0(7) - .2, f: sceneSlow }, { s: S0(8) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['التوقّف', S0(2)], ['الرياح', S0(3)], ['الأمواج', S0(4)], ['المحيطات', S0(5)], ['يوم = سنة', S0(6)]];
const LIST_ON = new Set([sceneWind]);
const CHIPS = [
  ['c1', 'خلال ثانية واحدة', 360, 330, 'red', WS(2, 2), WS(2, 10) - .3],
  ['c2', 'رياح أقوى من أي إعصار', 360, 330, 'red', WS(3, 3), S0(4) - .3],
  ['c3', 'أمواج عملاقة', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c4', 'يوم = سنة', 360, 330, 'big', WS(6, 3), S0(7) - .3],
  ['c5', '≈ ٠٫٠٠٢ ثانية كل قرن', 360, 330, 'big', WS(7, 11), S0(8) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 5), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">لو توقّفت الأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  const vis = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act;
    $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + k).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
