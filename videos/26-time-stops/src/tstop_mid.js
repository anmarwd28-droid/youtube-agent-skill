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
  s += o.afterSky || '';
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
function quad(x, y, sc, o = {}) {
  const k = o.kind || 'dog', f = o.face || 1, ph = o.phase || 0, mv = o.moving ? 1 : 0;
  const P = { dog: { L: 72, H: 50, leg: 46, neck: 24, hd: 17, col: '#b08a5a', dark: '#6a4e30', belly: '#dcc49e' },
    wolf: { L: 96, H: 62, leg: 62, neck: 30, hd: 23, col: '#8e887c', dark: '#4e4a44', belly: '#cec8bc' },
    fox: { L: 60, H: 38, leg: 32, neck: 20, hd: 16, col: '#c8641e', dark: '#2a1a10', belly: '#f4e8d8' },
    horse: { L: 150, H: 104, leg: 100, neck: 56, hd: 30, col: '#c0a06a', dark: '#2e2216', belly: '#e6d4ae' },
    cow: { L: 140, H: 100, leg: 74, neck: 34, hd: 30, col: '#e8e2d6', dark: '#2a2420', belly: '#f4f0ea' },
    cat: { L: 44, H: 28, leg: 24, neck: 10, hd: 13, col: o.col || '#8a827a', dark: '#3a3634', belly: '#c2bcb6' } }[k];
  const col = o.col || P.col, dk = P.dark, L = P.L, H = P.H, leg = P.leg, ty = -(leg + H * .22), bob = mv ? Math.abs(Math.sin(ph)) * 2 : 0;
  const limb = (jx, jy, a, hind, c, w) => { const u = leg * .55, l = leg * .52, kx = jx + Math.sin(a) * u, ky = jy + Math.cos(a) * u, b = hind ? -.55 : .25, fx = kx + Math.sin(a * .6 + b) * l, fy = ky + Math.cos(a * .6 + b) * l * .98;
    return `<path d="M${jx},${jy} L${kx},${ky} L${fx},${fy}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${fx + w * .3}" cy="${fy}" rx="${w * .65}" ry="${w * .35}" fill="${(k === 'horse' || k === 'cow') ? '#1a1410' : dk}"/>`; };
  const sw = a => Math.sin(ph + a) * .5 * mv, shX = L * .34, hpX = -L * .36, jy = ty + H * .12, lw = (k === 'horse' || k === 'cow') ? 13 : k === 'cat' ? 6 : 9;
  const farC = mix(col, '#000000', .3), legC = (k === 'horse' || k === 'cow') || k === 'fox' ? mix(col, dk, .55) : col;
  let s = `<g transform="translate(${x},${y - bob * sc}) scale(${f * sc},${sc})"><ellipse cx="0" cy="2" rx="${L * .62}" ry="${L * .07}" fill="#000" opacity=".28"/>`;
  s += limb(shX - 4, jy, sw(Math.PI), false, farC, lw) + limb(hpX - 4, jy, sw(0), true, farC, lw);
  // tail
  if (k === 'dog') s += `<path d="M${-L * .5},${ty - H * .1} q${-L * .22},${-H * .35} ${-L * .12},${-H * .62}" stroke="${col}" stroke-width="${lw * .8}" fill="none" stroke-linecap="round"/>`;
  if (k === 'wolf') s += `<path d="M${-L * .5},${ty - H * .05} q${-L * .25},${H * .2} ${-L * .3},${H * .6}" stroke="${mix(col, '#000000', .1)}" stroke-width="${lw * 1.5}" fill="none" stroke-linecap="round"/>`;
  if (k === 'fox') s += `<path d="M${-L * .5},${ty} q${-L * .35},${H * .05} ${-L * .55},${H * .4}" stroke="${col}" stroke-width="${lw * 2}" fill="none" stroke-linecap="round"/><circle cx="${-L * 1.04}" cy="${ty + H * .42}" r="${lw * .9}" fill="#f8f0e4"/>`;
  if ((k === 'horse' || k === 'cow')) s += `<path d="M${-L * .5},${ty - H * .12} q${-L * .12},${H * .1} ${-L * .14},${H * .75}" stroke="${dk}" stroke-width="${lw * 1.4}" fill="none" stroke-linecap="round"/>`;
  if (k === 'cat') s += `<path d="M${-L * .5},${ty} q${-L * .3},${-H * .2} ${-L * .25},${-H * 1.2}" stroke="${col}" stroke-width="${lw}" fill="none" stroke-linecap="round"/>`;
  // torso: barrel, chest, back shading, lighter belly
  s += `<path d="M${-L * .5},${ty - H * .18} C${-L * .45},${ty - H * .42} ${L * .3},${ty - H * .46} ${L * .48},${ty - H * .2} C${L * .56},${ty + H * .06} ${L * .44},${ty + H * .36} ${L * .22},${ty + H * .34} C${0},${ty + H * .3} ${-L * .3},${ty + H * .36} ${-L * .46},${ty + H * .22} C${-L * .56},${ty + H * .1} ${-L * .55},${ty - H * .02} ${-L * .5},${ty - H * .18}Z" fill="${col}"/>`;
  s += `<path d="M${-L * .4},${ty + H * .26} C${-L * .1},${ty + H * .34} ${L * .2},${ty + H * .34} ${L * .36},${ty + H * .22}" stroke="${P.belly}" stroke-width="${H * .12}" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s += `<path d="M${-L * .46},${ty - H * .24} C${-L * .2},${ty - H * .42} ${L * .2},${ty - H * .44} ${L * .42},${ty - H * .26}" stroke="#000" stroke-width="${H * .08}" fill="none" opacity=".18" stroke-linecap="round"/>`;
  if (k === 'cow') s += `<ellipse cx="${-L * .15}" cy="${ty - H * .05}" rx="${L * .16}" ry="${H * .2}" fill="#2a2420"/><ellipse cx="${L * .25}" cy="${ty + H * .08}" rx="${L * .1}" ry="${H * .14}" fill="#2a2420"/>`;
  s += limb(shX + 4, jy, sw(0), false, legC, lw) + limb(hpX + 4, jy, sw(Math.PI), true, legC, lw);
  // neck and head (thick neck; head drawn pointing forward then rotated down)
  const nx = L * .44, ny = ty - H * .18, hd = P.hd, gz = o.graze ? 1 : 0, ang = ((k === 'horse' || k === 'cow') ? 38 : k === 'wolf' ? 14 : k === 'cat' ? 0 : 8) + gz * 52;
  const hx = nx + P.neck * ((k === 'horse' || k === 'cow') ? .55 : .75) + gz * P.neck * .5, hy = ny - P.neck * ((k === 'horse' || k === 'cow') ? 1.0 : .7) + gz * P.neck * 1.9;
  s += `<path d="M${nx - L * .06},${ny - H * .18} Q${(nx + hx) / 2 - hd * .2},${(ny + hy) / 2 - hd * .6} ${hx - hd * .2},${hy - hd * .42} L${hx + hd * .25},${hy + hd * .38} Q${(nx + hx) / 2 + hd * .4},${(ny + hy) / 2 + hd * .4} ${nx + L * .08},${ny + H * .3}Z" fill="${col}"/>`;
  if ((k === 'horse' || k === 'cow')) s += `<path d="M${nx - L * .06},${ny - H * .2} Q${(nx + hx) / 2 - hd * .3},${(ny + hy) / 2 - hd * .75} ${hx - hd * .25},${hy - hd * .5}" stroke="${dk}" stroke-width="${hd * .32}" fill="none" stroke-linecap="round"/>`;
  let hdS = '';
  if ((k === 'horse' || k === 'cow')) hdS = `<path d="M0,${-hd * .45} C${hd * .5},${-hd * .55} ${hd * 1.3},${-hd * .35} ${hd * 1.7},${-hd * .15} C${hd * 1.86},${-hd * .05} ${hd * 1.86},${hd * .3} ${hd * 1.66},${hd * .36} C${hd * 1.2},${hd * .46} ${hd * .5},${hd * .62} 0,${hd * .5}Z" fill="${col}"/><ellipse cx="${hd * 1.55}" cy="${hd * .12}" rx="${hd * .3}" ry="${hd * .26}" fill="#ecdcc0"/><ellipse cx="${hd * 1.72}" cy="${hd * .04}" rx="${hd * .06}" ry="${hd * .05}" fill="#2a1a10"/>` +
      `<ellipse cx="${hd * .42}" cy="${-hd * .18}" rx="${hd * .08}" ry="${hd * .07}" fill="#120c08"/><path d="M${hd * .02},${-hd * .4} L${-hd * .05},${-hd * .82} L${hd * .2},${-hd * .48}Z" fill="${dk}"/>`;
  else if (k === 'cat') hdS = `<ellipse cx="${hd * .2}" cy="0" rx="${hd * .62}" ry="${hd * .55}" fill="${col}"/><path d="M${-hd * .2},${-hd * .35} L${-hd * .1},${-hd * .95} L${hd * .2},${-hd * .5}Z M${hd * .3},${-hd * .45} L${hd * .55},${-hd * .95} L${hd * .7},${-hd * .3}Z" fill="${col}"/><ellipse cx="${hd * .45}" cy="${-hd * .08}" rx="${hd * .1}" ry="${hd * .12}" fill="#d8c040"/><ellipse cx="${hd * .78}" cy="${hd * .15}" rx="${hd * .08}" ry="${hd * .06}" fill="#c87a7a"/>`;
  else hdS = `<ellipse cx="${hd * .15}" cy="0" rx="${hd * .6}" ry="${hd * .5}" fill="${col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02} Q${hd * 1.5},${hd * .12} ${hd * 1.36},${hd * .2} L${hd * .45},${hd * .4}Z" fill="${k === 'fox' ? '#f4e8d8' : col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02}" stroke="${k === 'fox' ? col : mix(col, '#000000', .15)}" stroke-width="${hd * .14}"/>` +
      `<ellipse cx="${hd * 1.4}" cy="${hd * .06}" rx="${hd * .12}" ry="${hd * .1}" fill="#1a1210"/><ellipse cx="${hd * .55}" cy="${-hd * .15}" rx="${hd * .08}" ry="${hd * .09}" fill="#120c08"/>` +
      `<path d="M${-hd * .25},${-hd * .3} L${-hd * .12},${-hd * (k === 'dog' ? .95 : 1.05)} L${hd * .15},${-hd * .38}Z" fill="${k === 'fox' ? '#2a1a10' : mix(col, '#000000', .15)}"/><path d="M${hd * .15},${hd * .38} Q${hd * .7},${hd * .55} ${hd * 1.2},${hd * .25}" stroke="${P.belly}" stroke-width="${hd * .14}" fill="none" opacity=".8"/>`;
  s += `<g transform="translate(${hx - hd * .1},${hy}) rotate(${ang})">${hdS}</g>`;
  return s + `</g>`;
}
function pigeon(x, y, s, t, seed = 0, fly = 0) {
  if (fly) { const fl = Math.sin(t * 16 + seed) * 10; return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-16,${-fl} Q-8,-4 0,0 Q8,-4 16,${-fl}" stroke="#3a3a40" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="1" rx="5" ry="3" fill="#5a5a62"/></g>`; }
  const pk = Math.max(0, Math.sin(t * 3 + seed)) ** 6 * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-8" rx="11" ry="7" fill="#8a8c96"/><path d="M-10,-8 l-8,3 l8,2Z" fill="#4a4c54"/><ellipse cx="9" cy="${-15 + pk}" rx="5" ry="4.5" fill="#7a7c88"/><path d="M13,${-15 + pk} l4,1 l-4,1Z" fill="#c8a880"/><ellipse cx="4" cy="-9" rx="4" ry="3" fill="#6a9a8a" opacity=".6"/><path d="M-2,-1 v4 M3,-1 v4" stroke="#c86a5a" stroke-width="1.5"/></g>`;
}

// ===== realism pass for the plants Short: shots 1, 2, 3, 5, 6, 7, 10, 11 =====
// a fuller Baghdad street: shopfronts with signs and awnings, AC units, dishes, overhead wires, lamps, a wide tiled pavement with a kerb, trees in grates, parked cars
function bareStreet(t, o = {}) {
  const g = o.green ?? 0, sky = o.sky || ['#4a86c6', '#92bce0', '#d2e4f0'], PV = 1000, KB = 1104;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="sk${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${o.id})"/>`;
  s += `<circle cx="150" cy="470" r="30" fill="#fffdf2"/><circle cx="150" cy="470" r="150" fill="#fff6d0" opacity="${o.sunGlow ?? .28}" filter="url(#soft)"/>${o.afterSky || ''}`;
  const hz = mix(sky[2], '#5a6878', .35), r = RS(7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".7"/>`; x += w + 4; }
  s += shanasheel(-10, PV, 170, 260, 11) + bldg(170, PV, 120, 340, '#bca68a', 3, .15) + shanasheel(300, PV, 150, 230, 12) + bldg(460, PV, 110, 220, '#a8927a', 4, .15) + shanasheel(580, PV, 160, 210, 13);
  // shopfronts on the ground floor
  [[6, 150, 'مخبز', '#c0392b'], [178, 104, 'صيدلية', '#2a8a4a'], [306, 138, 'سوبرماركت', '#2a5a9a'], [468, 94, 'حلويات', '#d9822b'], [586, 148, 'أقمشة', '#6a3a8a']].forEach(([sx, sw, name, c]) => {
    s += `<rect x="${sx}" y="${PV - 96}" width="${sw}" height="96" fill="#2a2420"/><rect x="${sx + 6}" y="${PV - 80}" width="${sw - 12}" height="74" fill="#3a4a5a" opacity=".8"/><rect x="${sx + 6}" y="${PV - 80}" width="${(sw - 12) * .35}" height="74" fill="#fff" opacity=".12"/>` +
      `<rect x="${sx - 2}" y="${PV - 122}" width="${sw + 4}" height="26" fill="${c}"/><text x="${sx + sw / 2}" y="${PV - 103}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 96} L${sx + sw + 4},${PV - 96} L${sx + sw + 12},${PV - 76} L${sx - 12},${PV - 76}Z" fill="${mix(c, '#ffffff', .25)}" opacity=".9"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<rect x="${sx - 8 + q * 18}" y="${PV - 96}" width="9" height="20" fill="#fff" opacity=".25"/>`).join(''); });
  [[60, 780], [240, 720], [390, 820], [520, 840], [660, 850]].forEach(([ax, ay]) => { s += `<rect x="${ax}" y="${ay}" width="30" height="20" fill="#e8e8e8"/><rect x="${ax + 3}" y="${ay + 4}" width="24" height="2" fill="#999"/><rect x="${ax + 3}" y="${ay + 9}" width="24" height="2" fill="#999"/>`; });
  s += `<path d="M-20,760 Q180,800 360,770 T740,780" stroke="#1e1e1e" stroke-width="2" fill="none"/><path d="M-20,775 Q180,820 360,790 T740,800" stroke="#1e1e1e" stroke-width="1.5" fill="none"/>`;
  // the wide pavement: tiles, kerb, then the road
  s += `<rect y="${PV}" width="720" height="${KB - PV}" fill="#c8bca6"/><rect y="${PV}" width="720" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M0,${PV + 26 * (q + 1)} L720,${PV + 26 * (q + 1)}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = 0; q < 16; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect y="${KB}" width="720" height="12" fill="#e8e4d8"/><rect y="${KB + 8}" width="720" height="4" fill="#8a8478"/>` + Array.from({ length: 9 }, (_, q) => `<rect x="${q * 80}" y="${KB}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('');
  s += `<rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#4e4e54"/><rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  // tree grates and planters on the pavement (with or without their plants)
  [[120, PV + 60], [420, PV + 60], [640, PV + 60]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${px - 26 + q * 10},${py - 5} v10" stroke="#7a7068" stroke-width="2"/>`).join(''); });
  if (g > 0) s += `<g opacity="${g}">` + treeB(120, PV + 58, 300, 3) + palmG(270, PV + 40, 300, t) + treeB(420, PV + 58, 280, 4) + palmG(530, PV + 40, 280, t) + treeB(640, PV + 58, 260, 5) +
    [[200, PV + 18], [360, PV + 18], [580, PV + 18]].map(([px, py]) => `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${px - 24 + q * 8},${py - 12} q${q % 2 ? 4 : -4},-18 ${q % 2 ? 2 : -2},-30" stroke="#4a8a2a" stroke-width="3.5" fill="none"/><circle cx="${px - 24 + q * 8 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#e84a5a', '#f4c84a', '#fff'][q % 3]}"/>`).join('')).join('') + `</g>`;
  else [[200, PV + 18], [360, PV + 18], [580, PV + 18]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/><rect x="${px - 26}" y="${py - 10}" width="52" height="8" fill="#6a4e32"/>`; });
  [40, 340, 690].forEach(lx => { s += lampPost(lx, PV + 80, 250, o.lamps || 0); });
  s += car(520, 1170, .95, '#d8d8dc', -1, 0) + car(150, 1250, .9, '#a83a2a', 1, 0);
  return s;
}
const onWalk = (x, y, c, sc, face, t, o = {}) => person(x, y, Object.assign({ s: sc, face, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t }, o));
// 1–2: dawn on a green street; then the plants dissolve. The walker is on the pavement
function sceneHook(t) {
  const tv = tVan(), k = ramp(t, tv, tv + .7);
  let s = bareStreet(t, { id: 'h0', green: 1 - k, sky: ['#5a7ab0', '#d8a888', '#f4d0a0'], lamps: .6 });
  if (k > 0 && k < 1) for (let i = 0; i < 70; i++) { const r = RS(i + 5), x = 40 + r() * 660, y = 720 + r() * 380 - k * 140 * r(); s += `<circle cx="${x}" cy="${y}" r="${2 + 3 * r()}" fill="${r() > .5 ? '#7ac850' : '#f4f8e8'}" opacity="${((1 - k) * .9).toFixed(2)}"/>`; }
  s += onWalk(300 + Math.min(t, tv) * 30, 1086, CROWD[0], .55, 1, t, { moving: t < tv ? 1 : 0, phase: t * 6, lookUp: k * .3 }) + onWalk(560, 1080, CROWD[1], .5, -1, t, { lookUp: k * .3 });
  F.ov = ''; return s;
}
// 3: the morning after: empty grates and planters, people standing on the pavement looking around
function sceneMorning(t) {
  let s = bareStreet(t, { id: 'm1', green: 0 });
  s += onWalk(230, 1090, CROWD[1], .55, 1, t, { lookUp: .2 }) + onWalk(330, 1084, CROWD[3], .52, -1, t, { lookUp: .25 }) + onWalk(500, 1078, CROWD[2], .5, -1, t, { lookUp: .1 });
  F.ov = ''; return s;
}
// 5: a real Iraqi table seen from above at an angle: samoon, steaming rice, glossy dates, salad, kebab on bread, laban, istikan tea
function sceneFood(t) {
  const k2 = ramp(t, WS(3, 11) - .2, WS(3, 11) + .4);
  let s = `<defs>${RDEF}${RDEF2}<radialGradient id="plateG" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#ecebe6"/><stop offset="1" stop-color="#c8c4bc"/></radialGradient><radialGradient id="tomG" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a6a"/><stop offset=".5" stop-color="#d8301c"/><stop offset="1" stop-color="#8a140a"/></radialGradient><radialGradient id="dateG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b8723a"/><stop offset=".5" stop-color="#6a2e12"/><stop offset="1" stop-color="#2a1006"/></radialGradient><radialGradient id="kebG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#9a5a2e"/><stop offset="1" stop-color="#4a2410"/></radialGradient></defs>`;
  s += `<rect width="720" height="1280" fill="#c8a678"/><rect width="720" height="1280" fill="#fff" filter="url(#wallI)" opacity=".5"/><rect y="0" width="720" height="760" fill="#b8925e" opacity=".5"/>`;
  s += `<path d="M-40,760 L760,760 L760,1290 L-40,1290Z" fill="#e8e0cc"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M${-40 + i * 60},760 L${-120 + i * 70},1290" stroke="#c0392b" stroke-width="5" opacity=".35"/>`).join('') + Array.from({ length: 9 }, (_, i) => `<path d="M-40,${780 + i * 60} L760,${780 + i * 60}" stroke="#c0392b" stroke-width="5" opacity=".35"/>`).join('');
  const plate = (x, y, rx, inner) => `<ellipse cx="${x}" cy="${y + 8}" rx="${rx}" ry="${rx * .4}" fill="#000" opacity=".22" filter="url(#blur2)"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .4}" fill="url(#plateG)"/><ellipse cx="${x}" cy="${y}" rx="${rx * .78}" ry="${rx * .31}" fill="none" stroke="#d8d4cc" stroke-width="2"/>${inner}`;
  const samoon = (x, y) => `<path d="M${x - 46},${y} Q${x - 30},${y - 26} ${x},${y - 24} Q${x + 30},${y - 26} ${x + 46},${y} Q${x + 20},${y + 14} ${x},${y + 12} Q${x - 20},${y + 14} ${x - 46},${y}Z" fill="#d89a4a"/><path d="M${x - 34},${y - 8} Q${x},${y - 30} ${x + 34},${y - 8}" stroke="#f4c88a" stroke-width="4" fill="none"/><path d="M${x - 20},${y - 4} l40,0" stroke="#a86a2a" stroke-width="2" opacity=".6"/>`;
  const steam = (x, y) => Array.from({ length: 3 }, (_, q) => { const ph = pmod(t * .5 + q / 3, 1); return `<path d="M${x - 20 + q * 20},${y - ph * 60} q10,-15 0,-30" stroke="#fff" stroke-width="5" fill="none" opacity="${(.5 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }).join('');
  const items = [
    [170, 860, 'صمون', plate(170, 860, 92, samoon(150, 860) + samoon(196, 872)), 'حنطة'],
    [400, 860, 'تمن', plate(400, 860, 104, `<ellipse cx="400" cy="852" rx="76" ry="26" fill="#f6f2e4"/>` + Array.from({ length: 70 }, (_, q) => { const r = RS(q + 9); return `<ellipse cx="${330 + r() * 140}" cy="${834 + r() * 34}" rx="3.4" ry="1.5" fill="${r() > .5 ? '#e4dcc8' : '#fffcf2'}" transform="rotate(${r() * 180},${330 + r() * 140},${834 + r() * 34})"/>`; }).join('') + steam(400, 830)), 'رز'],
    [612, 872, 'تمر', plate(612, 872, 74, Array.from({ length: 8 }, (_, q) => `<ellipse cx="${574 + (q % 4) * 24}" cy="${862 + Math.floor(q / 4) * 13}" rx="12" ry="7.5" fill="url(#dateG)"/><ellipse cx="${570 + (q % 4) * 24}" cy="${858 + Math.floor(q / 4) * 13}" rx="4" ry="1.8" fill="#fff" opacity=".45"/>`).join('')), 'نخيل'],
    [228, 1036, 'زلاطة', plate(228, 1036, 84, [0, 1, 2, 3, 4].map(q => `<path d="M${190 + q * 18},${1030 + (q % 2) * 6} a12,9 0 1,0 0.1,0" fill="url(#tomG)"/>`).join('') + [0, 1, 2].map(q => `<ellipse cx="${200 + q * 28}" cy="${1042}" rx="11" ry="7" fill="#5a9a3a"/><ellipse cx="${200 + q * 28}" cy="${1042}" rx="7" ry="4" fill="#cfe8a8"/>`).join('') + `<path d="M182,1030 q10,-10 20,-2" stroke="#3a8a2a" stroke-width="3" fill="none"/>`), 'نبات'],
    [482, 1036, 'كباب', plate(482, 1036, 112, `<path d="M396,1046 Q482,1020 568,1046 Q482,1062 396,1046Z" fill="#e8c890"/>` + `<rect x="398" y="1022" width="176" height="5" fill="#9a9a9a"/>` + [0, 1, 2, 3, 4].map(q => `<ellipse cx="${416 + q * 34}" cy="${1030}" rx="18" ry="11" fill="url(#kebG)"/><path d="M${404 + q * 34},${1026} l10,8 M${412 + q * 34},${1024} l10,8" stroke="#2a1006" stroke-width="2" opacity=".7"/>`).join('') + `<ellipse cx="540" cy="1050" rx="14" ry="7" fill="#d8301c" opacity=".9"/><ellipse cx="440" cy="1052" rx="12" ry="6" fill="#f4f0e8" opacity=".9"/>`), 'بقرة ← عشب'],
    [636, 1150, 'لبن', `<ellipse cx="640" cy="1186" rx="34" ry="8" fill="#000" opacity=".2"/><path d="M612,1100 L668,1100 L662,1184 L618,1184Z" fill="#f8faf8" opacity=".95"/><path d="M612,1100 L668,1100" stroke="#e0e4e0" stroke-width="3"/>` + Array.from({ length: 6 }, (_, q) => `<circle cx="${620 + q * 8}" cy="${1124 + (q % 3) * 14}" r="1.8" fill="#fff" opacity=".9"/>`).join(''), 'بقرة ← عشب'],
    [90, 1150, 'چاي', `<ellipse cx="90" cy="1186" rx="40" ry="10" fill="#d8d4cc"/><path d="M74,1120 Q66,1150 78,1180 L102,1180 Q114,1150 106,1120Z" fill="#8a2a0e" opacity=".85"/><path d="M74,1120 L106,1120" stroke="#e8e0d0" stroke-width="3"/>` + steam(90, 1110), 'نبات الشاي'],
  ];
  items.forEach(([x, y, name, svg, src], i) => { const ap = ramp(t, S0(3) - .1 + i * .18, S0(3) + .2 + i * .18), tag = ramp(t, WS(3, 9) - .2 + i * .13, WS(3, 9) + .2 + i * .13), ly = (name === 'لبن' || name === 'چاي') ? y - 60 : y - 52;
    s += `<g opacity="${ap}">${svg}<text x="${x}" y="${ly}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${name}</text></g>` +
      `<g opacity="${tag}"><rect x="${x - 60}" y="${y + 40}" width="120" height="30" rx="10" fill="#3a8a3a"/><text x="${x}" y="${y + 61}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">🌿 ${src}</text></g>`; });
  if (k2 > 0) s += `<g opacity="${k2}"><rect x="40" y="420" width="640" height="260" rx="20" fill="#0a0e1c" opacity=".8"/><g transform="translate(110,620)">` + Array.from({ length: 26 }, (_, q) => `<path d="M${-40 + q * 6},0 q${(q % 2 ? 3 : -3)},-22 ${(q % 2 ? 1 : -1) * 2},-${30 + (q % 4) * 6}" stroke="${q % 3 ? '#6aa83a' : '#8ac850'}" stroke-width="2.5" fill="none"/>`).join('') + `</g>` +
    `<path d="M220,570 h70" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/>` + quad(400, 640, 1.0, { kind: 'cow', graze: 1 }) + `<path d="M500,570 h60" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/><text x="610" y="566" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">لحم وحليب</text><text x="110" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#9ce0b0">عشب</text><text x="400" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">بقرة</text></g>`;
  F.ov = ''; return s;
}
// 6: the supermarket: strip lights, aisle signs, an end-cap, empty shelves with a few leftovers, "sold out" cards, flattened boxes on the floor
function sceneMarket(t) {
  const k = ease(ramp(t, S0(4), WS(4, 4) + .3));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="shelfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0f2"/><stop offset="1" stop-color="#c8ccd2"/></linearGradient><linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dade"/><stop offset="1" stop-color="#f4f2ec"/></linearGradient></defs><rect width="720" height="1280" fill="url(#ceil)"/>`;
  for (let q = 0; q < 3; q++) s += `<rect x="${60 + q * 220}" y="${380 + q * 4}" width="160" height="10" rx="4" fill="#ffffff"/><ellipse cx="${140 + q * 220}" cy="${400}" rx="120" ry="30" fill="#fff" opacity=".5" filter="url(#soft)"/>`;
  s += `<rect x="250" y="404" width="220" height="40" rx="6" fill="#c62828"/><text x="360" y="432" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">ممر ٤ — مواد غذائية</text>`;
  s += `<rect x="20" y="450" width="680" height="670" fill="#d8dce2"/><rect x="20" y="450" width="680" height="670" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  const types = [(x, y, c) => `<rect x="${x}" y="${y - 70}" width="40" height="70" rx="3" fill="${c}"/><rect x="${x + 4}" y="${y - 50}" width="32" height="22" fill="#fff" opacity=".85"/><rect x="${x + 8}" y="${y - 44}" width="24" height="4" fill="${c}"/><rect x="${x}" y="${y - 70}" width="12" height="70" fill="#fff" opacity=".18"/>`,
    (x, y, c) => `<rect x="${x + 8}" y="${y - 60}" width="24" height="60" rx="8" fill="${c}"/><rect x="${x + 14}" y="${y - 72}" width="12" height="14" rx="3" fill="${mix(c, '#000000', .3)}"/><rect x="${x + 8}" y="${y - 40}" width="24" height="16" fill="#fff" opacity=".8"/><rect x="${x + 10}" y="${y - 58}" width="5" height="50" fill="#fff" opacity=".25"/>`,
    (x, y, c) => `<rect x="${x + 4}" y="${y - 42}" width="32" height="42" rx="4" fill="#b8bcc2"/><rect x="${x + 4}" y="${y - 34}" width="32" height="24" fill="${c}"/><ellipse cx="${x + 20}" cy="${y - 42}" rx="16" ry="4" fill="#e0e4e8"/><rect x="${x + 6}" y="${y - 40}" width="6" height="36" fill="#fff" opacity=".3"/>`];
  for (let sh = 0; sh < 5; sh++) { const y = 570 + sh * 125; s += `<rect x="20" y="${y}" width="680" height="16" fill="url(#shelfB)"/><rect x="20" y="${y + 16}" width="680" height="4" fill="#9aa0a8"/>`;
    for (let q = 0; q < 15; q++) { const r = RS(sh * 30 + q), x = 34 + q * 44, keep = r() > .15 + .8 * k; if (keep) s += types[q % 3](x, y, ['#d84a3a', '#f4b84a', '#3a7ad0', '#4aa84a', '#8a4ab8'][(q + sh) % 5]); else if (r() > .6) s += `<rect x="${x + 6}" y="${y - 5}" width="26" height="5" fill="#b8b4ac" opacity=".6"/>`;
      if (q % 3 === 0) s += `<rect x="${x}" y="${y + 3}" width="34" height="12" fill="#fff59d"/><text x="${x + 17}" y="${y + 13}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="9" fill="#333">${(1 + (q * 7 + sh) % 9) * 250}</text>`; }
    if (k > .6 && sh % 2 === 0) s += `<g transform="translate(${140 + sh * 120},${y - 46}) rotate(-4)"><rect x="-50" y="-16" width="100" height="32" fill="#fff" stroke="#c62828" stroke-width="2"/><text x="0" y="7" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#c62828">نفدت الكمية</text></g>`; }
  s += `<rect y="1120" width="720" height="170" fill="#d0ccc4"/><rect y="1120" width="720" height="170" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${i * 140},1120 L${i * 140 - 60},1290" stroke="#b0aca4" stroke-width="2"/>`).join('') + `<path d="M0,1180 L720,1180" stroke="#b0aca4" stroke-width="2"/>`;
  s += `<g opacity="${k}"><path d="M470,1150 L560,1140 L572,1160 L482,1172Z" fill="#c8a070"/><path d="M590,1200 L680,1186 L690,1206 L600,1222Z" fill="#b8905e"/></g>`;
  s += person(250, 1250, { s: .66, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .05 }) + `<g transform="translate(290,1260)"><path d="M0,-110 L150,-110 L136,-36 L14,-36Z" fill="none" stroke="#8a8e94" stroke-width="5"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${10 + q * 24},-108 L${18 + q * 21},-38" stroke="#8a8e94" stroke-width="2"/>`).join('') + `<path d="M0,-110 L-24,-140" stroke="#8a8e94" stroke-width="6"/><circle cx="24" cy="-12" r="12" fill="#333"/><circle cx="126" cy="-12" r="12" fill="#333"/></g>`;
  s += person(560, 1240, { s: .6, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .1 });
  F.ov = ''; return s;
}
// 7: a farm with nothing growing: cracked bare fields, a dry trough and fence, a farmhouse; thin cattle with ribs showing, heads low; a wolf arrives
function sceneHerbivores(t) {
  const w = ramp(t, WS(4, 9) - .2, WS(4, 9) + .6);
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skHv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9cb0"/><stop offset="1" stop-color="#ecd8b4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skHv)"/><circle cx="560" cy="480" r="30" fill="#fff6e0"/><circle cx="560" cy="480" r="140" fill="#fff0d0" opacity=".3" filter="url(#soft)"/>`;
  s += `<path d="M-20,830 Q160,790 340,810 T740,796 L740,880 L-20,880Z" fill="#b09070" filter="url(#reliefR)"/>`;
  s += `<rect x="520" y="790" width="110" height="60" fill="#c8b48a"/><rect x="515" y="784" width="120" height="10" fill="#a8946a"/><rect x="560" y="814" width="18" height="36" fill="#6a4a2e"/><rect x="592" y="806" width="16" height="14" fill="#4a5a6a"/><rect x="636" y="760" width="6" height="90" fill="#7a7a7a"/><path d="M620,762 L660,756" stroke="#9a9a9a" stroke-width="10"/>`;
  s += `<rect y="860" width="720" height="430" fill="#c8a87a" filter="url(#reliefR)"/><rect y="860" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".35"/>` + cracks(890, 1290, .75, 21, -20, 740, '#6a4a2a');
  for (let i = 0; i < 12; i++) { const x = -10 + i * 64; s += `<rect x="${x}" y="${920}" width="6" height="54" fill="#6a5040"/>`; } s += `<path d="M-20,934 L740,934 M-20,956 L740,956" stroke="#6a5040" stroke-width="3"/>`;
  s += `<rect x="300" y="1150" width="160" height="34" rx="6" fill="#7a7a80"/><rect x="306" y="1154" width="148" height="14" rx="4" fill="#4a4038"/><path d="M308,1162 q70,-6 144,0" stroke="#8a7a5a" stroke-width="2" fill="none"/>`;
  const thin = (x, y, sc, face, col, graze, mv) => { let c = quad(x, y, sc, { kind: 'cow', graze, face, col, moving: mv, phase: t * 2.2 }); const rb = Array.from({ length: 5 }, (_, q) => `<path d="M${x + face * (-14 + q * 9) * sc},${y - 88 * sc} q${face * 3 * sc},${16 * sc} 0,${30 * sc}" stroke="#000" stroke-width="${1.6 * sc}" fill="none" opacity=".35"/>`).join(''); return c + rb; };
  s += thin(210, 1080, 1.05, 1, '#d8ccb8', 1, 0) + thin(500, 1120, 1.15, -1, '#a87850', 0, 1) + thin(110, 1220, 1.2, 1, '#e4dccc', 1, 0);
  s += `<g opacity="${w}">` + quad(lerp(800, 620, w), 1240, 1.3, { kind: 'wolf', moving: 1, phase: t * 6, face: -1 }) + `</g>`;
  for (let i = 0; i < 3; i++) { const a = t * .6 + i * 2.1; s += pigeon(360 + Math.cos(a) * 120, 520 + Math.sin(a) * 40, 2.2, t, i, 1); }
  F.ov = ''; return s;
}
// 10: (left) a layered forest breathing vapour that becomes clouds and rain over a river; (right) bare cracked land under an empty sky
function sceneRain(t) {
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skRn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7090"/><stop offset="1" stop-color="#cfdae0"/></linearGradient><linearGradient id="skDr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7cc8"/><stop offset="1" stop-color="#f0e4c8"/></linearGradient><clipPath id="cL6"><rect width="358" height="1280"/></clipPath><clipPath id="cR6"><rect x="362" width="358" height="1280"/></clipPath></defs>`;
  s += `<g clip-path="url(#cL6)"><rect width="360" height="1280" fill="url(#skRn)"/>`;
  for (let i = 0; i < 6; i++) s += `<ellipse cx="${20 + i * 65}" cy="${450 + (i % 2) * 34}" rx="100" ry="48" fill="${i % 2 ? '#dfe4ea' : '#c8d0d8'}" opacity=".95" filter="url(#soft)"/><ellipse cx="${30 + i * 65}" cy="${480 + (i % 2) * 34}" rx="70" ry="22" fill="#9aa4b0" opacity=".7" filter="url(#soft)"/>`;
  for (let q = 0; q < 4; q++) s += `<rect x="${40 + q * 90}" y="500" width="40" height="300" fill="#b8c4d0" opacity=".25" filter="url(#blur2)"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 3), x = r() * 360, y = pmod(r() * 320 + t * 640, 320) + 500; s += `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 18}" stroke="#dde8f2" stroke-width="1.5" opacity=".55"/>`; }
  for (let i = 0; i < 12; i++) { const r = RS(i + 90); s += pine(-10 + i * 32 + r() * 10, 900 + r() * 20, 140 + r() * 60, i + 90, mix('#3e5e3a', '#5a7a4a', .5 + .3 * r())); }
  s += `<rect y="800" width="360" height="140" fill="#cfdae0" opacity=".35" filter="url(#haze)"/>`;
  for (let i = 0; i < 12; i++) { const r = RS(i + 40); s += treeB(-10 + i * 32 + r() * 10, 1010 + r() * 40, 180 + r() * 90, i + 40); }
  for (let i = 0; i < 7; i++) { const x = 20 + i * 50, ph = pmod(t * .45 + i * .17, 1); s += `<path d="M${x},${900 - ph * 330} q14,-22 0,-44 q-14,-22 0,-44" stroke="#ffffff" stroke-width="5" fill="none" opacity="${(.65 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }
  s += `<rect y="1050" width="360" height="240" fill="#3e5e26"/><rect y="1050" width="360" height="240" fill="#000" filter="url(#grainR)" opacity=".3"/>` + riverW(1120, 1170, t, { id: 'r10', col: ['#5a8aa0', '#3a6a80'] });
  for (let i = 0; i < 20; i++) { const r = RS(i + 70); s += `<path d="M${r() * 360},${1180 + r() * 60} q-6,-20 0,-34 q6,14 2,34" fill="#4a8a32"/>`; }
  s += `<text x="180" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">مع الغابات</text></g>`;
  s += `<g clip-path="url(#cR6)"><rect x="360" width="360" height="1280" fill="url(#skDr)"/><circle cx="600" cy="460" r="30" fill="#fffdf2"/><circle cx="600" cy="460" r="130" fill="#fff6d0" opacity=".35" filter="url(#soft)"/>`;
  s += `<path d="M360,940 L420,880 L500,910 L580,860 L660,900 L720,880 L720,1000 L360,1000Z" fill="#b89a78" filter="url(#reliefR)"/><path d="M360,990 Q460,950 560,970 T720,960 L720,1290 L360,1290Z" fill="#c8a478" filter="url(#reliefR)"/>` + cracks(1000, 1290, 1, 5, 220, 960, '#6a4a2a').replace(/<g /, '<g clip-path="url(#cR6)" ');
  for (let q = 0; q < 5; q++) s += `<path d="M360,${960 + q * 14} q180,${Math.sin(t * 4 + q) * 5} 360,0" stroke="#fff" stroke-width="2" fill="none" opacity=".15"/>`;
  s += `<path d="M400,1140 Q520,1120 640,1150" stroke="#9a7a58" stroke-width="18" fill="none" opacity=".6"/>`;
  s += `<text x="540" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بدون غابات</text></g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  F.ov = ''; return s;
}
// 11: CO2 climbs over the hot, hazy city; the man stands on the pavement
function sceneCO2(t) {
  const k = ease(ramp(t, WS(7, 0), L(7).end + .2));
  let s = bareStreet(t, { id: 'c7', green: 0, sky: [mix('#4a86c6', '#c89a6a', k), mix('#92bce0', '#e8c090', k), mix('#d2e4f0', '#f4dcb0', k)] });
  s += `<rect width="720" height="1280" fill="#ff9a4a" opacity="${.12 * k}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${940 + i * 20} q180,${Math.sin(t * 4 + i) * 6} 380,0 t380,0" stroke="#fff" stroke-width="2" fill="none" opacity="${.15 * k}"/>`).join('');
  s += `<g><rect x="190" y="420" width="340" height="140" rx="20" fill="#0a0e1c" opacity=".82"/><text x="360" y="466" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#cfd8ff">ثاني أكسيد الكربون ↑</text><rect x="220" y="490" width="280" height="26" rx="10" fill="#2a3046"/><rect x="220" y="490" width="${280 * (.35 + .65 * k)}" height="26" rx="10" fill="${mix('#f4c76b', '#e53935', k)}"/></g>`;
  s += onWalk(300, 1088, CROWD[0], .55, 1, t, { lookUp: .2 });
  F.ov = ''; return s;
}
// shared realistic helpers: aerial ground, airliner, birds, rugged mountains, rocks
const GP = (X, Z) => [360 + X * 250 / Z, 905 + 375 / Z];
const rX = Z => .55 * Math.sin(Z * .32 + .4) + .3 * Math.sin(Z * .85) - .15;
function groundFromAbove(t) {
  let s = `<path d="M-20,912 Q360,899 740,912 L740,1290 L-20,1290Z" fill="#b49c74"/>`;
  const GR = ['#4a6a2e', '#5e7a36', '#3e5a26', '#6a7a3a', '#557232', '#2e4420'], DS = ['#b8a47e', '#a89670', '#c4b08a', '#9a8a62', '#b09a72'];
  // fields: irrigated green near the river, open desert away from it
  let Z = 1, row = 0;
  while (Z < 34) { const r = RS(row + 300), Z2 = Z * (1.1 + .08 * r()), zm = (Z + Z2) / 2, st = .24 * Math.pow(zm, .9), lim = 1.7 * Z2, far = Math.min(1, zm / 30);
    for (let X = -lim; X < lim;) { const w = st * (.45 + 1.1 * r()), d = Math.abs(X + w / 2 - rX(zm)), green = r() < Math.exp(-d / 1.0) * .95;
      const c = mix(green ? GR[Math.floor(r() * GR.length)] : DS[Math.floor(r() * DS.length)], '#b49c74', far * .55), a = GP(X, Z), b = GP(X + w, Z), c2 = GP(X + w, Z2), dd = GP(X, Z2);
      s += `<path d="M${PT(a)} L${PT(b)} L${PT(c2)} L${PT(dd)}Z" fill="${c}"${green ? ` stroke="#3a3a22" stroke-width="${(.9 / Math.sqrt(zm)).toFixed(2)}" stroke-opacity=".5"` : ''}/>`;
      if (green && zm < 4) { const nn = 3 + Math.floor(r() * 4); for (let q = 1; q < nn; q++) { const u = q / nn, p1 = GP(X + w * u, Z), p2 = GP(X + w * u, Z2); s += `<path d="M${PT(p1)} L${PT(p2)}" stroke="#000" stroke-opacity=".1" stroke-width=".8"/>`; } }
      X += w; }
    Z = Z2; row++; }
  // groves of trees lining both banks
  for (let i = 0; i < 260; i++) { const r = RS(i + 1500), Zg = 1 + Math.pow(r(), 1.6) * 24, side = r() > .5 ? 1 : -1, Xg = rX(Zg) + side * (.1 + r() * .3), p = GP(Xg, Zg), rr = 9 / Zg * (.6 + r()); s += `<ellipse cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" rx="${(rr * 1.6).toFixed(1)}" ry="${rr.toFixed(1)}" fill="${r() > .4 ? '#24381a' : '#30482a'}"/><ellipse cx="${(p[0] + rr * 1.2).toFixed(1)}" cy="${(p[1] + rr * .3).toFixed(1)}" rx="${(rr * 1.2).toFixed(1)}" ry="${(rr * .5).toFixed(1)}" fill="#000" opacity=".5"/>`; }
  // Baghdad on both banks: a grey urban ground, a grid of streets, blocks with sunlit roofs and black shadows
  const cz0 = 3.4, cz1 = 8.5, edge = Z => GP(rX(Z) - 1, Z), edge2 = Z => GP(rX(Z) + 1, Z); let L1 = [], R1 = []; for (let Z = cz0; Z <= cz1; Z *= 1.05) { L1.push(edge(Z)); R1.push(edge2(Z)); }
  s += `<path d="M${L1.map(PT).join(' L')} L${R1.reverse().map(PT).join(' L')}Z" fill="#8e877a"/>`;
  for (let Zc = cz0; Zc < cz1; Zc += .22) for (let Xo = -.95; Xo < .95; Xo += .13) { const r = RS(Math.round(Zc * 100) * 31 + Math.round(Xo * 100)), Xc = rX(Zc) + Xo; if (Math.abs(Xo) < .1 || r() < .15 || Math.abs(Xo) > .95 - .4 * r()) continue;
    const w = .07 + .04 * r(), dz = .12 + .06 * r(), a = GP(Xc, Zc), b = GP(Xc + w, Zc), c2 = GP(Xc + w, Zc + dz), dd = GP(Xc, Zc + dz), sh = 3.2 / Zc;
    s += `<path d="M${PT(a)} L${PT(b)} L${PT(c2)} L${PT(dd)}Z" fill="${mix('#a8a092', '#e0d8c8', r())}"/><path d="M${PT(a)} L${PT(b)} L${b[0].toFixed(1)},${(b[1] + sh).toFixed(1)} L${a[0].toFixed(1)},${(a[1] + sh).toFixed(1)}Z" fill="#000" opacity=".75"/>`; }
  // the Tigris, with lighter banks and two bridges
  const rv = (Z, sgn) => GP(rX(Z) + sgn * .085, Z); let A = [], B = []; for (let Z = 1; Z < 34; Z *= 1.03) { A.push(rv(Z, -1)); B.push(rv(Z, 1)); }
  s += `<path d="M${A.map(PT).join(' L')} L${B.slice().reverse().map(PT).join(' L')}Z" fill="#16262e"/><path d="M${A.map(PT).join(' L')}" stroke="#8a8a62" stroke-width="1.5" fill="none" opacity=".7"/><path d="M${B.map(PT).join(' L')}" stroke="#8a8a62" stroke-width="1.5" fill="none" opacity=".7"/>`;
  [4.6, 6.8].forEach(Zb => { const p1 = GP(rX(Zb) - .12, Zb), p2 = GP(rX(Zb) + .12, Zb); s += `<path d="M${PT(p1)} L${PT(p2)}" stroke="#d8d0c0" stroke-width="${(10 / Zb).toFixed(1)}"/>`; });
  // a highway curving across the desert
  const hp = []; for (let Z = 1; Z < 34; Z *= 1.06) hp.push(GP(-2.2 + .9 * Math.sin(Z * .18) + .04 * Z, Z)); s += `<path d="M${hp.map(PT).join(' L')}" stroke="#4a4a4e" stroke-width="3" fill="none"/><path d="M${hp.map(PT).join(' L')}" stroke="#d8d0c0" stroke-width=".8" fill="none" opacity=".7"/>`;
  s += `<path d="M-20,912 Q360,899 740,912 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  return s;
}
function airliner() {
  return `<defs><linearGradient id="fusG" gradientUnits="userSpaceOnUse" x1="0" y1="-26" x2="0" y2="18"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#eef1f4"/><stop offset=".8" stop-color="#b8c0c8"/><stop offset="1" stop-color="#7a828c"/></linearGradient>` +
    `<linearGradient id="engG" gradientUnits="userSpaceOnUse" x1="0" y1="18" x2="0" y2="44"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#c8ced4"/><stop offset="1" stop-color="#6a727c"/></linearGradient>` +
    `<linearGradient id="wngG" gradientUnits="userSpaceOnUse" x1="40" y1="4" x2="-100" y2="66"><stop offset="0" stop-color="#d4dae0"/><stop offset="1" stop-color="#8a929c"/></linearGradient>` +
    `<linearGradient id="tailG" gradientUnits="userSpaceOnUse" x1="-110" y1="-24" x2="-196" y2="-104"><stop offset="0" stop-color="#2a4a7e"/><stop offset="1" stop-color="#132a50"/></linearGradient></defs>` +
    // far wing peeking above the fuselage, tail fin, far stabiliser
    `<path d="M10,-22 L-40,-22 L-70,-40 L-52,-40Z" fill="#9aa2ac"/><path d="M-150,-22 L-202,-104 L-178,-104 L-112,-22Z" fill="url(#tailG)"/><path d="M-196,-100 L-180,-100 L-170,-84 L-188,-86Z" fill="#c9a24a"/><path d="M-160,-18 L-196,-30 L-188,-32 L-146,-20Z" fill="#a8b0b8"/>` +
    // fuselage
    `<path d="M-196,-18 L-150,-25 L150,-25 C172,-25 190,-15 195,-3 C193,8 176,16 150,16 L-100,16 C-136,16 -166,4 -196,-12Z" fill="url(#fusG)"/>` +
    `<path d="M-150,-2 L162,-2 L170,2 L-150,3Z" fill="#1e3c6e"/><path d="M-150,5 L150,5" stroke="#c9a24a" stroke-width="1.6"/><path d="M-100,15 L150,15" stroke="#5a626c" stroke-width="1.5" opacity=".6"/>` +
    Array.from({ length: 30 }, (_, q) => `<rect x="${-128 + q * 9}" y="-14" width="5" height="7" rx="2.3" fill="#26303c"/>`).join('') +
    `<path d="M162,-16 L177,-16 L184,-9 L163,-9Z" fill="#1a2430"/><path d="M170,-16 L171,-9" stroke="#eef1f4" stroke-width="1.2"/>` +
    [[138, -21], [-20, -21], [-136, -20]].map(([dx, dy]) => `<rect x="${dx}" y="${dy}" width="11" height="24" rx="3" fill="none" stroke="#9aa2ac" stroke-width="1"/>`).join('') +
    `<path d="M-196,-18 L-150,-25 L150,-25" stroke="#fff" stroke-width="1.5" fill="none" opacity=".9"/>` +
    // near wing, pylon and engine, near stabiliser
    `<path d="M44,6 L-44,10 L-114,64 L-90,64Z" fill="url(#wngG)"/><path d="M44,6 L-90,64" stroke="#fff" stroke-width="1.4" opacity=".7"/><path d="M-114,64 L-122,48 L-112,48 L-98,62Z" fill="#1e3c6e"/>` +
    `<path d="M14,14 L-6,14 L-12,24 L8,24Z" fill="#a8b0b8"/><path d="M38,20 L-26,20 Q-38,30 -26,42 L38,42 Q44,31 38,20Z" fill="url(#engG)"/><ellipse cx="39" cy="31" rx="5" ry="11" fill="#d8dde2"/><ellipse cx="40" cy="31" rx="3.2" ry="8.6" fill="#2a3038"/><path d="M-26,24 L-36,28 L-36,34 L-26,38Z" fill="#5a626c"/>` +
    `<path d="M-150,-6 L-200,6 L-192,12 L-136,2Z" fill="#b8c0c8"/>`;
}
function bird(x, y, sc, flap, rot) {
  const f = Math.sin(flap) * 10;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})"><path d="M0,0 C-6,${-3 - f * .3} -14,${-10 - f} -26,${-8 - f * 1.2} C-17,${-3 - f * .4} -10,0 -4,2Z M0,0 C6,${-3 - f * .3} 14,${-10 - f} 26,${-8 - f * 1.2} C17,${-3 - f * .4} 10,0 4,2Z" fill="#2a2a30"/><ellipse cx="0" cy="1.5" rx="7" ry="3.2" fill="#3a3a42"/><circle cx="7" cy="0" r="2.6" fill="#3a3a42"/><path d="M-7,1 L-12,4 L-7,3Z" fill="#2a2a30"/></g>`;
}
function ridgeP(x0, x1, yb, amp, seed, n0 = 7) {
  const r = RS(seed); let h = Array.from({ length: n0 + 1 }, () => r()); let sc = .5;
  for (let lv = 0; lv < 6; lv++) { const nh = []; for (let i = 0; i < h.length - 1; i++) nh.push(h[i], (h[i] + h[i + 1]) / 2 + (r() - .5) * sc); nh.push(h[h.length - 1]); h = nh; sc *= .55; }
  return h.map((v, i) => [x0 + (x1 - x0) * i / (h.length - 1), yb - amp * Math.max(.05, v)]);
}
function mountains(yb, amp, seed, lit, shade, n0, snowAt = 0) {
  const p = ridgeP(-30, 750, yb, amp, seed, n0), r = RS(seed + 77), body = `M-30,${yb + 30} L${p.map(PT).join(' L')} L750,${yb + 30}Z`, W = Math.max(3, Math.floor(p.length / (n0 * 2.2)));
  let s = `<path d="${body}" fill="${lit}"/><path d="${body}" fill="${lit}" filter="url(#reliefR)" opacity=".85"/>`;
  if (snowAt > 0) { const rs = RS(seed + 5), id = 'snw' + seed; let ln = `M-40,-10 L760,-10`; for (let x = 760; x >= -40; x -= 14) ln += ` L${x},${(yb - amp * snowAt + (rs() - .5) * amp * .22).toFixed(1)}`; ln += 'Z';
    s += `<defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs><g clip-path="url(#${id})"><path d="${ln}" fill="#f2f5fa"/><path d="${ln}" fill="#9aa8b8" filter="url(#reliefR)" opacity=".35"/></g>`; }
  const pk = []; for (let i = 1; i < p.length - 1; i++) { let top = true; for (let q = Math.max(0, i - W); q <= Math.min(p.length - 1, i + W); q++) if (q !== i && p[q][1] <= p[i][1]) { top = false; break; } if (top) pk.push(i); }
  pk.forEach((i, n) => {
    const lim = n + 1 < pk.length ? pk[n + 1] : p.length - 1; let j = i; for (let q = i; q <= lim; q++) if (p[q][1] > p[j][1]) j = q;
    if (j <= i + 1) return;
    const P = p[i], V = p[j], H = yb + 30 - P[1], sp = []; for (let k = 1; k <= 6; k++) sp.push([P[0] + (V[0] - P[0]) * (.06 + .28 * k / 6) + (r() - .5) * 10, P[1] + H * k / 6]);
    s += `<path d="M${p.slice(i, j + 1).map(PT).join(' L')} L${(V[0] - (V[0] - P[0]) * .25).toFixed(1)},${yb + 30} L${sp.reverse().map(PT).join(' L')}Z" fill="${shade}" opacity=".78"/>`;
    for (let g = 0; g < 2; g++) { let x = P[0] - 6 - g * 10, y = P[1] + 10 + g * 8, d = `M${x.toFixed(1)},${y.toFixed(1)}`; for (let k = 0; k < 5; k++) { x -= (4 + r() * 8) * H / 160; y += H / 7; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } s += `<path d="${d}" stroke="${shade}" stroke-width="${1 + H / 140}" fill="none" opacity=".18"/>`; }
  });
  s += `<path d="${body}" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  return s;
}
const ROCKDEF = `<linearGradient id="rkD" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="#e2c69c"/><stop offset=".45" stop-color="#9a7c58"/><stop offset=".75" stop-color="#3a2a1c"/><stop offset="1" stop-color="#1a120a"/></linearGradient>` +
  `<linearGradient id="rkN" x1="0" y1="0" x2="1" y2=".7"><stop offset="0" stop-color="#6a7686"/><stop offset=".5" stop-color="#2e3642"/><stop offset="1" stop-color="#0e1218"/></linearGradient>` +
  `<filter id="frostT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="17"/><feColorMatrix values="0 0 0 0 .92  0 0 0 0 .96  0 0 0 0 1  0 0 0 -4.2 2.3"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="frostP" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="3" seed="27"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .92  0 0 0 0 1  0 0 0 -3.2 2.0"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
function rockR(x, y, sc, seed, day) {
  const r = RS(seed), n = 12, w = 32 * sc * (.8 + .5 * r()), h = 22 * sc * (.7 + .6 * r()), p = [];
  for (let i = 0; i < n; i++) { const a = Math.PI + i / n * Math.PI * 2, rr = .82 + .3 * r(); p.push([x + Math.cos(a) * w * rr, y - h * .45 + Math.sin(a) * h * rr * (Math.sin(a) > 0 ? .45 : 1)]); }
  const d = `M${p.map(PT).join(' L')}Z`;
  let s = day ? `<path d="M${x - w * .7},${y + 1} Q${x + w * 1.2},${y - 2} ${x + w * 2.6},${y + h * .25} Q${x + w * 1.4},${y + h * .5} ${x - w * .5},${y + h * .35}Z" fill="#000" opacity=".9"/>` : `<ellipse cx="${x}" cy="${y + h * .2}" rx="${w * 1.05}" ry="${h * .22}" fill="#000" opacity=".45"/>`;
  s += `<path d="${d}" fill="url(#${day ? 'rkD' : 'rkN'})"/><path d="${d}" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  s += day ? `<path d="M${p.slice(1, 6).map(PT).join(' L')}" stroke="#f4e2c0" stroke-width="${1.2 * sc}" fill="none" opacity=".7"/>` : `<path d="M${p.slice(1, 7).map(PT).join(' L')} Q${x},${y - h * .9} ${PT(p[1])}Z" fill="#eef6ff" opacity=".8"/><path d="${d}" fill="#fff" filter="url(#frostT)" opacity=".3"/>`;
  return s;
}
// ===== realism kit v2: terrain-lit mountains, lodgepole pines, meadows, cumulus clouds =====
// mountains lit by a real heightmap: a fractal ridge silhouette, rock + snow passed through a diffuse-lighting filter (gullies and ridges catch the light from the upper left),
// the big faces away from the light darkened, and aerial haze for distant ranges
function mountainsR(yb, amp, seed, o = {}) {
  const p = o.points || ridgeP(-30, 750, yb, amp, seed, o.n0 || 6), body = `M-30,${yb + 40} L${p.map(PT).join(' L')} L750,${yb + 40}Z`, id = 'm' + seed + '_' + Math.round(yb);
  const rock = o.rock || '#8a8478', snowAt = o.snowAt ?? 0, r = RS(seed + 9);
  let s = `<defs><clipPath id="c${id}"><path d="${body}"/></clipPath><filter id="f${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${(2.6 / amp).toFixed(4)} ${(1.0 / amp).toFixed(4)}" numOctaves="6" seed="${seed}" result="n"/><feDiffuseLighting in="n" surfaceScale="${(amp * .11).toFixed(1)}" lighting-color="#ffffff" result="l"><feDistantLight azimuth="${o.az ?? 205}" elevation="${o.el ?? 32}"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="${o.k1 ?? 1.35}" k2="0" k3="0" k4="0"/></filter>` +
    `<linearGradient id="g${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(rock, '#ffffff', .08)}"/><stop offset="1" stop-color="${o.base || mix(rock, '#2a2620', .55)}"/></linearGradient></defs>`;
  let inner = `<rect x="-30" y="${yb - amp - 20}" width="780" height="${amp + 70}" fill="url(#g${id})"/>`;
  if (snowAt > 0) { let ln = `M-40,${yb - amp - 40} L760,${yb - amp - 40}`; for (let x = 760; x >= -40; x -= 10) { const gul = Math.pow(Math.abs(Math.sin(x * .045 + seed)), 6) * amp * .22; ln += ` L${x},${(yb - amp * snowAt + (r() - .5) * amp * .12 + gul).toFixed(1)}`; } ln += 'Z'; inner += `<path d="${ln}" fill="${o.snow || '#f4f7fb'}"/>`; }
  s += `<g clip-path="url(#c${id})"><g filter="url(#f${id})">${inner}</g>`;
  // the big faces turned away from the light
  const W = Math.max(3, Math.floor(p.length / ((o.n0 || 6) * 2.2))), pk = [];
  for (let i = 1; i < p.length - 1; i++) { let top = true; for (let q = Math.max(0, i - W); q <= Math.min(p.length - 1, i + W); q++) if (q !== i && p[q][1] <= p[i][1]) { top = false; break; } if (top) pk.push(i); }
  pk.forEach((i, n) => { const lim = n + 1 < pk.length ? pk[n + 1] : p.length - 1; let j = i; for (let q = i; q <= lim; q++) if (p[q][1] > p[j][1]) j = q; if (j <= i + 1) return;
    const P = p[i], V = p[j], H = yb + 40 - P[1], sp = []; for (let k = 1; k <= 7; k++) sp.push([P[0] + (V[0] - P[0]) * (.05 + .3 * k / 7) + (r() - .5) * 12, P[1] + H * k / 7]);
    s += `<path d="M${p.slice(i, j + 1).map(PT).join(' L')} L${(V[0] - (V[0] - P[0]) * .2).toFixed(1)},${yb + 40} L${sp.reverse().map(PT).join(' L')}Z" fill="${o.shade || '#0e1420'}" opacity="${o.shadeA ?? .42}"/>`; });
  if (o.haze) s += `<rect x="-30" y="${yb - amp - 20}" width="780" height="${amp + 70}" fill="${o.hazeCol || '#b8c8d8'}" opacity="${o.haze}"/>`;
  s += `<rect x="-30" y="${yb - amp * .25}" width="780" height="${amp * .25 + 40}" fill="${o.footCol || '#1e2a1e'}" opacity="${o.foot ?? 0}"/>`;
  return s + `</g>`;
}
// a lodgepole pine: tall straight trunk, narrow ragged crown mostly in the upper part, needles lit from the upper left
function pineR(x, y, h, seed, col, o = {}) {
  const r = RS(seed + 300), lean = (r() - .5) * h * .03, dk = mix(col, '#000000', .45), lt = mix(col, o.lightCol || '#b8c890', o.lit ?? .3), snow = o.snow || 0;
  let s = `<path d="M${x - h * .012},${y} L${x + lean - h * .004},${y - h} L${x + lean + h * .004},${y - h} L${x + h * .012},${y}Z" fill="#4a3a2a"/>`;
  const start = .28 + .15 * r(), n = 13;
  for (let i = 0; i < n; i++) { const u = i / (n - 1), yy = y - h * (start + (1 - start) * u), cx = x + lean * (start + (1 - start) * u), w = h * (.11 * Math.pow(1 - u, .9) + .02) * (.7 + .6 * r()); if (r() < .12 && u < .7) continue;
    const pts = []; const m = 7; for (let k = 0; k <= m; k++) { const v = k / m, px = cx - w + v * 2 * w, top = yy - h * .045 * (1 - Math.abs(v - .5) * 1.6) - r() * h * .015; pts.push([px + (r() - .5) * w * .15, top]); }
    const bot = []; for (let k = m; k >= 0; k--) { const v = k / m; bot.push([cx - w + v * 2 * w + (r() - .5) * w * .2, yy + h * .02 + Math.abs(v - .5) * h * .03 + r() * h * .012]); }
    s += `<path d="M${pts.concat(bot).map(PT).join(' L')}Z" fill="${dk}"/><path d="M${pts.slice(0, 5).map(PT).join(' L')} L${PT([cx, yy + h * .01])} L${PT([cx - w * .9, yy + h * .015])}Z" fill="${lt}" opacity=".5"/>`;
    if (snow) s += `<path d="M${pts.slice(1, 7).map(PT).join(' L')}" stroke="#f4f7fb" stroke-width="${Math.max(1, h * .012)}" fill="none" opacity="${snow}"/>`; }
  return s + `<path d="M${x + lean},${y - h} l0,${-h * .04}" stroke="${dk}" stroke-width="${h * .012}"/>`;
}
function forestR(y0, n, h0, h1, seed, col, o = {}) {
  const r = RS(seed + 70), tr = []; for (let i = 0; i < n; i++) tr.push([(o.x0 ?? -20) + ((o.x1 ?? 740) - (o.x0 ?? -20)) * (i + r() * .9) / n, y0 + r() * (o.dy ?? 12), h0 + (h1 - h0) * r(), seed * 97 + i]);
  tr.sort((a, b) => a[1] - b[1]);
  let s = `<path d="M-20,${y0 + 6} ${tr.map(t => `L${t[0].toFixed(1)},${(t[1] - t[2] * .45).toFixed(1)}`).join(' ')} L740,${y0 + 6} L740,${y0 + (o.dy ?? 12) + 8} L-20,${y0 + (o.dy ?? 12) + 8}Z" fill="${mix(o.haze ? mix(col, o.hazeCol || '#8a9aac', o.haze) : col, '#000000', .5)}"/>`;
  const cc = o.haze ? mix(col, o.hazeCol || '#8a9aac', o.haze) : col;
  tr.forEach(t => { s += pineR(t[0], t[1], t[2], t[3], cc, o); });
  return s;
}
// a meadow in perspective: colour variation and grass texture, tufts of blades that get taller towards us and sway
function meadow(y0, y1, t, o = {}) {
  const c0 = o.c0 || '#7a8a4a', c1 = o.c1 || '#5a6a32', id = 'md' + Math.round(y0);
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(c0, '#c8c0a0', .25)}"/><stop offset="1" stop-color="${c1}"/></linearGradient></defs><rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="url(#${id})"/>`;
  s += `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#000" filter="url(#stalkT)" opacity=".28"/><rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="${o.patch || '#a8a060'}" filter="url(#cropT)" opacity=".35"/>`;
  const r = RS(o.seed || 41), n = o.n || 340;
  for (let i = 0; i < n; i++) { const u = Math.pow(r(), .7), y = y0 + u * (y1 - y0), x = r() * 760 - 20, hh = (3 + 34 * u * u) * (.6 + .8 * r()), sw = Math.sin(t * 1.6 + x * .02) * hh * .12, c = mix(r() > .5 ? c0 : c1, r() > .7 ? '#c8b870' : '#3a4a1e', r() * .45);
    s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .4 - 2).toFixed(1)},${(-hh * .55).toFixed(1)} ${(sw - 4).toFixed(1)},${(-hh).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .3).toFixed(1)},${(-hh * .6).toFixed(1)} ${(sw + 1).toFixed(1)},${(-hh * 1.1).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} q${(sw * .4 + 2).toFixed(1)},${(-hh * .5).toFixed(1)} ${(sw + 5).toFixed(1)},${(-hh * .85).toFixed(1)}" stroke="${c}" stroke-width="${(.8 + 1.6 * u).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  return s;
}
// a cumulus cloud: many soft lumps, bright tops, grey flat bases
function cumulus(cx, cy, w, seed, o = {}) {
  const r = RS(seed + 500); let s = `<g opacity="${o.a ?? 1}" filter="url(#cloudF)">`;
  s += `<ellipse cx="${cx}" cy="${cy + w * .08}" rx="${w * .55}" ry="${w * .07}" fill="${o.base || '#a8b4c4'}" filter="url(#soft)"/>`;
  for (let i = 0; i < 34; i++) { const a = r(), b = r(), x = cx + (a - .5) * w, y = cy - b * w * .24 * (1 - Math.abs(a - .5) * 1.2), rr = w * (.05 + .08 * r()) * (1.1 - Math.abs(a - .5)); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#cuG)"/>`; }
  return s + `</g>`;
}
const CUDEF = `<filter id="cloudF" x="-20%" y="-30%" width="140%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="3" seed="8"/><feDisplacementMap in="SourceGraphic" scale="14" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.6"/></filter><radialGradient id="cuG" cx=".4" cy=".3" r=".7"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef2f6"/><stop offset="1" stop-color="#b8c4d2"/></radialGradient>`;

// a mountain silhouette through given control points, roughened with fractal detail (for named peaks such as Everest or a volcano cone)
function profileP(ctrl, seed, rough = .06, lv = 6) {
  const r = RS(seed + 33); let p = ctrl.map(q => q.slice());
  let sc = rough; for (let l = 0; l < lv; l++) { const np = []; for (let i = 0; i < p.length - 1; i++) { const a = p[i], b = p[i + 1], L = Math.hypot(b[0] - a[0], b[1] - a[1]); np.push(a, [(a[0] + b[0]) / 2 + (r() - .5) * L * sc * .3, (a[1] + b[1]) / 2 + (r() - .5) * L * sc]); } np.push(p[p.length - 1]); p = np; sc *= .62; }
  return p;
}
// ===== realism pass (atmosphere Short): the street without date palms, fuller trees, hard black shadows and harsher contrast once the air is gone =====
function bareStreet(t, o = {}) {
  const g = o.green ?? 0, sky = o.sky || ['#4a86c6', '#92bce0', '#d2e4f0'], PV = 1000, KB = 1104;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="sk${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${o.id})"/>`;
  s += `<circle cx="150" cy="470" r="${o.sunR ?? 30}" fill="${o.sunCol || '#fffdf2'}"/><circle cx="150" cy="470" r="${o.glowR ?? 150}" fill="${o.glowCol || '#fff6d0'}" opacity="${o.sunGlow ?? .28}" filter="url(#soft)"/>${o.afterSky || ''}`;
  const hz = mix(sky[2], '#5a6878', .35), r = RS(7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += o.harsh ? `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="#6e655a"/><rect x="${x + w * .7}" y="${900 - h}" width="${w * .3}" height="${h}" fill="#000" opacity=".55"/>` + Array.from({ length: Math.floor(h / 22) }, (_, q) => Array.from({ length: Math.floor(w / 16) }, (_, p) => `<rect x="${x + 5 + p * 16}" y="${900 - h + 8 + q * 22}" width="6" height="9" fill="#1a1c22"/>`).join('')).join('') : `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".7"/>`; x += w + 4; }
  s += shanasheel(-10, PV, 170, 260, 11) + bldg(170, PV, 120, 340, '#bca68a', 3, .15) + shanasheel(300, PV, 150, 230, 12) + bldg(460, PV, 110, 220, '#a8927a', 4, .15) + shanasheel(580, PV, 160, 210, 13);
  // shopfronts on the ground floor
  [[6, 150, 'مخبز', '#c0392b'], [178, 104, 'صيدلية', '#2a8a4a'], [306, 138, 'سوبرماركت', '#2a5a9a'], [468, 94, 'حلويات', '#d9822b'], [586, 148, 'أقمشة', '#6a3a8a']].forEach(([sx, sw, name, c]) => {
    s += `<rect x="${sx}" y="${PV - 96}" width="${sw}" height="96" fill="#2a2420"/><rect x="${sx + 6}" y="${PV - 80}" width="${sw - 12}" height="74" fill="#3a4a5a" opacity=".8"/><rect x="${sx + 6}" y="${PV - 80}" width="${(sw - 12) * .35}" height="74" fill="#fff" opacity=".12"/>` +
      `<rect x="${sx - 2}" y="${PV - 122}" width="${sw + 4}" height="26" fill="${c}"/><text x="${sx + sw / 2}" y="${PV - 103}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 96} L${sx + sw + 4},${PV - 96} L${sx + sw + 12},${PV - 76} L${sx - 12},${PV - 76}Z" fill="${mix(c, '#ffffff', .25)}" opacity=".9"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<rect x="${sx - 8 + q * 18}" y="${PV - 96}" width="9" height="20" fill="#fff" opacity=".25"/>`).join(''); });
  [[60, 780], [240, 720], [390, 820], [520, 840], [660, 850]].forEach(([ax, ay]) => { s += `<rect x="${ax}" y="${ay}" width="30" height="20" fill="#e8e8e8"/><rect x="${ax + 3}" y="${ay + 4}" width="24" height="2" fill="#999"/><rect x="${ax + 3}" y="${ay + 9}" width="24" height="2" fill="#999"/>`; });
  s += `<path d="M-20,760 Q180,800 360,770 T740,780" stroke="#1e1e1e" stroke-width="2" fill="none"/><path d="M-20,775 Q180,820 360,790 T740,800" stroke="#1e1e1e" stroke-width="1.5" fill="none"/>`;
  // the wide pavement: tiles, kerb, then the road
  s += `<rect y="${PV}" width="720" height="${KB - PV}" fill="#c8bca6"/><rect y="${PV}" width="720" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M0,${PV + 26 * (q + 1)} L720,${PV + 26 * (q + 1)}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = 0; q < 16; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect y="${KB}" width="720" height="12" fill="#e8e4d8"/><rect y="${KB + 8}" width="720" height="4" fill="#8a8478"/>` + Array.from({ length: 9 }, (_, q) => `<rect x="${q * 80}" y="${KB}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('');
  s += `<rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#4e4e54"/><rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  // tree grates and planters on the pavement (with or without their plants)
  [[120, PV + 60], [420, PV + 60], [640, PV + 60]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${px - 26 + q * 10},${py - 5} v10" stroke="#7a7068" stroke-width="2"/>`).join(''); });
  if (g > 0) s += [120, 420, 640].map((px, i) => `<path d="M${px - 20},${PV + 60} Q${px + 40},${PV + 50} ${px + 120},${PV + 64} Q${px + 150},${PV + 82} ${px + 90},${PV + 92} Q${px + 20},${PV + 96} ${px - 18},${PV + 70}Z" fill="#000" opacity="${(o.harsh ? .88 : .22) * g}" ${o.harsh ? '' : 'filter="url(#blur2)"'}/>`).join('');
  if (g > 0) s += `<g opacity="${g}">` + treeR(120, PV + 58, 300, 3, t) + treeR(420, PV + 58, 280, 4, t) + treeR(640, PV + 58, 260, 5, t) +
    [[200, PV + 18], [360, PV + 18], [580, PV + 18]].map(([px, py]) => `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${px - 24 + q * 8},${py - 12} q${q % 2 ? 4 : -4},-18 ${q % 2 ? 2 : -2},-30" stroke="#4a8a2a" stroke-width="3.5" fill="none"/><circle cx="${px - 24 + q * 8 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#e84a5a', '#f4c84a', '#fff'][q % 3]}"/>`).join('')).join('') + `</g>`;
  else [[200, PV + 18], [360, PV + 18], [580, PV + 18]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/><rect x="${px - 26}" y="${py - 10}" width="52" height="8" fill="#6a4e32"/>`; });
  [40, 340, 690].forEach(lx => { s += lampPost(lx, PV + 80, 250, o.lamps || 0); });
  s += car(520, 1170, .95, '#d8d8dc', -1, 0) + car(150, 1250, .9, '#a83a2a', 1, 0);
  return o.harsh ? `<defs><filter id="harshF" x="0" y="0" width="100%" height="100%"><feComponentTransfer><feFuncR type="gamma" amplitude="1.12" exponent="1.45"/><feFuncG type="gamma" amplitude="1.12" exponent="1.45"/><feFuncB type="gamma" amplitude="1.1" exponent="1.5"/></feComponentTransfer></filter></defs><g filter="url(#harshF)">${s}</g>` : s;
}
// shared: realistic street tree (lumpy lit crown) and hard cast shadow for people
function lumpP(cx, cy, R, r) {
  const n = 9, p = []; for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, rr = R * (.78 + .32 * r()); p.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * .86]); }
  let d = `M${((p[0][0] + p[n - 1][0]) / 2).toFixed(1)},${((p[0][1] + p[n - 1][1]) / 2).toFixed(1)}`;
  for (let i = 0; i < n; i++) { const a = p[i], b = p[(i + 1) % n]; d += ` Q${a[0].toFixed(1)},${a[1].toFixed(1)} ${((a[0] + b[0]) / 2).toFixed(1)},${((a[1] + b[1]) / 2).toFixed(1)}`; }
  return d + 'Z';
}
function treeR(x, y, h, seed, t) {
  const r = RS(seed + 200), cy = y - h * .7, sw = Math.sin(t * .9 + seed) * h * .004;
  let s = `<path d="M${x - h * .036},${y} C${x - h * .02},${y - h * .2} ${x - h * .028},${y - h * .36} ${x - h * .012 + sw},${y - h * .5} L${x + h * .014 + sw},${y - h * .5} C${x + h * .02},${y - h * .32} ${x + h * .018},${y - h * .2} ${x + h * .036},${y}Z" fill="#4a3a2c"/>` +
    `<path d="M${x - h * .03},${y} C${x - h * .018},${y - h * .2} ${x - h * .024},${y - h * .36} ${x - h * .01 + sw},${y - h * .5}" stroke="#7a6650" stroke-width="${h * .008}" fill="none"/>`;
  [[-1, .8], [0, 1], [1, .85]].forEach(([b, l]) => { s += `<path d="M${x + sw},${y - h * .46} Q${x + b * h * .06 + sw},${y - h * .6} ${x + b * h * .17 * l + sw},${y - h * (.68 + .1 * l)}" stroke="#4a3a2c" stroke-width="${h * .012}" fill="none" stroke-linecap="round"/>`; });
  const cl = []; for (let i = 0; i < 30; i++) { const a = r() * Math.PI * 2, d = Math.sqrt(r()); cl.push([x + sw + Math.cos(a) * d * h * .27, cy + Math.sin(a) * d * h * .2 - h * .02, h * (.06 + .045 * r()), r]); }
  cl.sort((a, b) => a[1] - b[1]);
  const dk = cl.map(c => `<path d="${lumpP(c[0], c[1], c[2], c[3])}"/>`).join('');
  s += `<g fill="#22361a">${dk}</g>`;
  cl.forEach(c => { const lit = ((x - c[0]) * .7 + (cy - c[1])) / (h * .3); s += `<path d="${lumpP(c[0] - c[2] * .15, c[1] - c[2] * .2, c[2] * .8, c[3])}" fill="${mix('#2e4a1e', '#4a6e2a', Math.max(0, Math.min(1, .5 + lit)))}"/>`; if (lit > -.15) s += `<path d="${lumpP(c[0] - c[2] * .35, c[1] - c[2] * .4, c[2] * .45, c[3])}" fill="${mix('#5a7e32', '#86a44a', Math.max(0, Math.min(1, lit)))}"/>`; });
  s += `<g fill="#000" filter="url(#cropT)" opacity=".38">${dk}</g>`;
  for (let i = 0; i < 46; i++) { const a = r() * Math.PI * 2, d = .9 + .15 * r(); s += `<circle cx="${x + sw + Math.cos(a) * d * h * .3}" cy="${cy + Math.sin(a) * d * h * .23}" r="${h * (.006 + .008 * r())}" fill="${r() > .5 ? '#2e4a1e' : '#4a6e2a'}"/>`; }
  return s;
}
const castSh = (x, y, sc = .55) => `<path d="M${x - 9 * sc / .55},${y} L${x + 70 * sc / .55},${y + 9} Q${x + 80 * sc / .55},${y + 13} ${x + 68 * sc / .55},${y + 15} L${x - 7 * sc / .55},${y + 7}Z" fill="#000" opacity=".9"/>`;

// ===================== "what if time stopped for 5 seconds for everyone except you?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const num = (x, y, tx, a, col = '#fff', fs = 40) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".6">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
const YOU = { top: '#e85a2a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };
// the frozen look: desaturate towards a cold blue-grey by f (0..1); built per id so each scene can blend
function frzDef(id, f) {
  const k = 1 - f, g = [.3, .59, .11], tint = [.82, .9, 1.06], d = .92;
  const row = (c) => [0, 1, 2].map(j => ((c === j ? k : 0) + f * g[j] * tint[c] * d).toFixed(3)).join(' ') + ' 0 0';
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${row(0)} ${row(1)} ${row(2)} 0 0 0 1 0"/></filter>`;
}
// a bird in flight; w = wing phase
function bird(x, y, s, w, col = '#2a2a30') {
  const u = Math.sin(w) * 12 * s;
  return `<path d="M${x - 16 * s},${y - u} Q${x - 7 * s},${y - 4 * s - u * .4} ${x},${y} Q${x + 7 * s},${y - 4 * s - u * .4} ${x + 16 * s},${y - u}" stroke="${col}" stroke-width="${2.6 * s}" fill="none" stroke-linecap="round"/><ellipse cx="${x}" cy="${y + 1.5 * s}" rx="${4.5 * s}" ry="${2.2 * s}" fill="${col}"/>`;
}
// an umbrella held by a walker (x,y = feet, sc = person scale, face)
function umbrella(x, y, sc, face, col) {
  const k = sc / .55, hx = x + face * 16 * k, top = y - 222 * k, w = 64 * k;
  return `<path d="M${hx},${y - 118 * k} L${hx},${top}" stroke="#2a2a2a" stroke-width="${2.4 * k}"/><path d="M${hx - w},${top + 26 * k} Q${hx},${top - 34 * k} ${hx + w},${top + 26 * k} Q${hx + w * .66},${top + 16 * k} ${hx + w * .33},${top + 26 * k} Q${hx},${top + 16 * k} ${hx - w * .33},${top + 26 * k} Q${hx - w * .66},${top + 16 * k} ${hx - w},${top + 26 * k}Z" fill="${col}"/><path d="M${hx - w},${top + 26 * k} Q${hx},${top - 34 * k} ${hx},${top - 4 * k}" fill="#fff" opacity=".14"/>`;
}
// the world at world-time tf: street, walkers, birds, a ball in flight and (optionally) rain; f = frozen look
const WALK = [[60, 1088, 0, .55, 1, '#2a3a5a'], [560, 1082, 1, .52, -1, '#8a2a3a'], [330, 1094, 2, .57, 1, null], [690, 1086, 3, .5, -1, '#2a5a4a']];
function world(t, tf, o = {}) {
  const rain = o.rain || 0, f = o.f || 0, id = o.id || 'w';
  const sky = rain ? ['#56677c', '#8d9aa8', '#c4c8cc'] : ['#3e72b8', '#96bce0', '#e8e2d0'];
  let s = bareStreet(tf, { id, green: 1, sky, sunR: rain ? 0 : 30, glowR: rain ? 0 : 150, sunGlow: rain ? 0 : .28, afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: rain ? .55 : .9 }) + cumulus(560, 520, 170, 2, { a: rain ? .5 : .85 }) });
  if (rain) s += `<rect y="1116" width="720" height="170" fill="#9ab0c8" opacity=".16"/>` + Array.from({ length: 6 }, (_, i) => { const r = RS(i + 40), px = 40 + r() * 640, py = 1150 + r() * 120; return `<ellipse cx="${px}" cy="${py}" rx="${30 + r() * 40}" ry="${4 + r() * 3}" fill="#c8d8e8" opacity=".28"/>`; }).join('');
  // walkers (with umbrellas in the rain)
  WALK.forEach(([x0, y, c, sc, face, uc], i) => { const x = pmod(x0 + face * 26 * tf + 60, 840) - 60; s += castSh(x, y, sc) + onWalk(x, y, CROWD[c], sc, face, tf, { moving: 1, phase: tf * 6 + i, amp: .7 }) + (rain && uc ? umbrella(x, y, sc, face, uc) : ''); });
  // a child's ball in mid-flight over the pavement
  if (o.ball) { const ph = pmod(tf * .6, 1), bx = 180 + ph * 160, by = 1040 - Math.sin(ph * Math.PI) * 150; s += `<ellipse cx="${bx}" cy="1094" rx="${12 - 6 * Math.sin(ph * Math.PI)}" ry="3" fill="#000" opacity=".3"/><circle cx="${bx}" cy="${by}" r="13" fill="#e8463a"/><path d="M${bx - 13},${by} Q${bx},${by + 6} ${bx + 13},${by}" stroke="#fff" stroke-width="3" fill="none"/><circle cx="${bx - 4}" cy="${by - 5}" r="4" fill="#fff" opacity=".35"/>` + person(170, 1096, { s: .4, face: 1, t: tf, top: '#3a8ac8', pants: '#2a2a34', skin: '#b07850', hair: '#1a1210' }); }
  // a flock of birds crossing the sky
  for (let i = 0; i < 7; i++) { const r = RS(i + 60), bx = pmod(-80 + r() * 300 + tf * (55 + r() * 10), 900) - 90, by = 600 + r() * 150 + Math.sin(tf * 1.3 + i) * 10; s += bird(bx, by, .9 + r() * .5, tf * 11 + i * 1.7, rain ? '#2e3036' : '#2a2a30'); }
  // rain: streaks while moving, beads when frozen; splash crowns frozen on the road
  if (rain) { const mv = 1 - f; for (let i = 0; i < 170; i++) { const r = RS(i + 100), z = .4 + r() * .6, x = r() * 760 - 20 + tf * 20 * z, y = pmod(r() * 1320 + tf * 950 * z, 1320) - 30, L = (6 + 30 * mv) * z;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(-3 * z * mv).toFixed(1)},${L.toFixed(1)}" stroke="#e8f2ff" stroke-width="${(1.1 + 1.6 * z * (1 - mv * .5)).toFixed(2)}" stroke-linecap="round" opacity="${(.35 + .4 * z).toFixed(2)}"/>`; }
    for (let i = 0; i < 16; i++) { const r = RS(i + 300), x = 20 + r() * 680, y = 1125 + r() * 150, ph = pmod(tf * 2.2 + r(), 1), w = 4 + ph * 10; s += `<path d="M${x - w},${y} q${w * .3},${-8 * (1 - ph)} ${w * .5},${-2} M${x + w},${y} q${-w * .3},${-8 * (1 - ph)} ${-w * .5},${-2} M${x},${y - 2} l0,${-10 * (1 - ph)}" stroke="#e8f2ff" stroke-width="1.4" fill="none" opacity="${(.6 * (1 - ph)).toFixed(2)}"/><ellipse cx="${x}" cy="${y + 1}" rx="${w}" ry="${w * .22}" fill="none" stroke="#e8f2ff" stroke-width="1" opacity="${(.5 * (1 - ph)).toFixed(2)}"/>`; } }
  if (f > 0) s = `<defs>${frzDef('fz' + id, f)}</defs><g filter="url(#fz${id})">${s}</g>`;
  return s;
}
// "you": in colour, walking at real time t
const you = (x, y, sc, t, mv = 1, o = {}) => castSh(x, y, sc) + person(x, y, Object.assign({ s: sc, face: 1, moving: mv, phase: t * 6, amp: .7, t }, YOU, o));
// a ripple of frozen time spreading from (x,y)
const ripple = (x, y, p) => p > 0 && p < 1 ? `<circle cx="${x}" cy="${y}" r="${40 + p * 900}" fill="none" stroke="#dfeaff" stroke-width="${10 * (1 - p) + 2}" opacity="${(.6 * (1 - p)).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x}" cy="${y}" r="${30 + p * 760}" fill="none" stroke="#fff" stroke-width="2" opacity="${(.4 * (1 - p)).toFixed(2)}"/>` : '';
// 0: a busy street; on "توقّف" everything freezes – except you
function sceneHook(t) {
  const FZ = WS(0, 6) + .1, tf = Math.min(t, FZ), f = ease(ramp(t, FZ, FZ + .5));
  let s = world(t, tf, { f, id: 'h', ball: 1 });
  s += you(250 + t * 16, 1100, .6, t);
  s += ripple(270 + t * 16, 900, clamp((t - FZ) / 1.4));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 1: an ordinary 5 seconds: ~20 births and 200+ lightning flashes on Earth; a 5-second ring
function sceneNormal(t) {
  const st = S0(1) - .2, T = t - st, k = clamp((t - WS(1, 0)) / (WS(1, 17) + .6 - WS(1, 0))), kb = ease(ramp(t, WS(1, 4) - .2, WS(1, 7) + .4)), kl = ease(ramp(t, WS(1, 10) - .2, WS(1, 14) + .4));
  let s = space(t, '#02030a', '#070a1c');
  F.earth = { x: 360, y: 720, r: 240, a: 1, sunI: 1.05, lights: .55, rot: 2.1 + t * .03, tilt: .41 }; F.light = [-300, 300]; F.moon = null; F.sun = null;
  let o = '';
  // lightning flashes over the night side (short, sharp, with a faint cloud-lit halo)
  for (let i = 0; i < 40; i++) { const r = RS(i + 7), a = r() * 6.283, rr = Math.sqrt(r()) * 200, x = 360 + Math.cos(a) * rr, y = 720 + Math.sin(a) * rr * .95, ph = pmod(T * (.6 + r() * .5) + r(), 1);
    if (x < 330 || ph > .06 || kl <= 0) continue; const b = (1 - ph / .06) * kl;
    o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="#cfe0ff" opacity="${(.35 * b).toFixed(2)}" filter="url(#blur2)"/><path d="M${x},${y - 5} l-2,4 l3,0 l-2,5" stroke="#fff" stroke-width="1.4" fill="none" opacity="${b.toFixed(2)}"/>`; }
  // 5-second ring
  const left = Math.max(0, 5 - k * 5);
  o += `<g transform="translate(360,1130)"><circle r="52" fill="#0a0e1c" opacity=".9"/><circle r="44" fill="none" stroke="#2a3048" stroke-width="7"/><circle r="44" fill="none" stroke="#f4c76b" stroke-width="7" stroke-dasharray="${(276.5 * (1 - k)).toFixed(1)} 400" transform="rotate(-90)" stroke-linecap="round"/>` + num(0, 13, left.toFixed(1), 1, '#fff', 30) + `</g>`;
  o += `<g transform="translate(150,1130)"><rect x="-120" y="-50" width="240" height="100" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 0, `+${Math.round(21 * kb)}`, kb, '#f4c76b', 40) + lbl(0, 34, 'مولوداً', kb, '#cfd8ff', 20) + `</g>`;
  o += `<g transform="translate(570,1130)"><rect x="-120" y="-50" width="240" height="100" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 0, `+${Math.round(220 * kl)}`, kl, '#cfe0ff', 40) + lbl(0, 34, 'بَرقاً', kl, '#cfd8ff', 20) + `</g>`;
  F.ov = o; return s;
}
// 2: rain, birds, people – then everything freezes; you keep walking among them
const FZ2 = () => WS(2, 2) + .2;
function sceneFreeze(t) {
  const FZ = FZ2(), tf = Math.min(t, FZ), f = ease(ramp(t, FZ, FZ + .6));
  let s = world(t, tf, { f, id: 'f', rain: 1, ball: 1 });
  s += you(120 + (t - S0(2)) * 22, 1100, .6, t);
  s += ripple(140 + (FZ - S0(2)) * 22, 900, clamp((t - FZ) / 1.5));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// the frozen street behind the close-ups
const frozenBG = (t, id) => world(t, FZ2(), { f: 1, id, rain: 1, ball: 1 });
// 3: light itself stops: photons hang in mid-air, short of your eye – then total darkness
function sceneDark(t) {
  const st = S0(3) - .2, T = t - st, ph = ease(ramp(t, WS(3, 3) - .2, WS(3, 7) + .3)), dk = ease(ramp(t, WS(3, 11) - .3, WS(3, 13) + .2));
  let s = frozenBG(t, 'd3') + `<rect width="720" height="1280" fill="#0a1028" opacity=".45"/>`;
  s += `<g transform="translate(250,1250) scale(3.2)">` + person(0, 120, Object.assign({ s: .9, face: 1, t }, YOU)) + `</g>`;
  // photons: three rays from the bright sky towards the eye (~285,770); each stops short, a frozen trail of dots
  const E = [292, 772];
  [[720, 700], [720, 880], [700, 1060]].forEach(([sx, sy], j) => { for (let i = 0; i < 14; i++) { const u = i / 14 * .82, x = sx + (E[0] - sx) * u, y = sy + (E[1] - sy) * u, a = ph * (1 - Math.abs(Math.sin(i * 1.3 + j)) * .25);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#fff2c0" opacity="${(.3 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#fffbe8" opacity="${a.toFixed(2)}"/>`; }
    const u = .86, x = sx + (E[0] - sx) * u, y = sy + (E[1] - sy) * u; s += `<path d="M${x.toFixed(1)},${(y - 10).toFixed(1)} l0,20" stroke="#ff6a5a" stroke-width="3" opacity="${ph.toFixed(2)}"/>`; });
  s += lbl(300, 560, 'ضوءٌ متوقّف', ph * (1 - dk), '#fff2c0', 26);
  s += `<rect width="720" height="1280" fill="#000" opacity="${(.94 * dk).toFixed(2)}"/>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 4: silence: sound waves frozen in the air; only your heartbeat, inside your body
function sceneSilence(t) {
  const st = S0(4) - .2, T = t - st, w = ease(ramp(t, WS(4, 0) - .2, WS(4, 4) + .3)), hb = ease(ramp(t, WS(4, 9) - .2, WS(4, 11) + .3));
  let s = frozenBG(t, 's4') + `<rect width="720" height="1280" fill="#02040c" opacity=".86"/>`;
  // a car horn's sound: rings frozen in place (dashed: no motion)
  for (let i = 0; i < 6; i++) s += `<path d="M${560 - 40 - i * 46},${1150 - 120 - i * 40} A${120 + i * 70},${120 + i * 70} 0 0 0 ${560 - 40 - i * 46},${1150 + 120 + i * 40}" stroke="#9ab8e8" stroke-width="3" stroke-dasharray="10 9" fill="none" opacity="${(w * (.7 - i * .09) * (1 - hb * .6)).toFixed(2)}"/>`;
  s += lbl(560, 1000, 'صوتٌ متجمّد', w * (1 - hb), '#9ab8e8', 24);
  // you, dimly lit, and a beating heart (≈ 72 bpm)
  const beat = Math.pow(Math.max(0, Math.sin(T * Math.PI * 2 * 1.2)), 8), hs = 1 + .16 * beat * hb;
  s += `<g transform="translate(330,1260) scale(2.4)" opacity=".55">` + person(0, 0, Object.assign({ s: 1, face: 1, t }, YOU)) + `</g>`;
  s += `<g transform="translate(352,690) scale(${hs.toFixed(3)})" opacity="${hb.toFixed(2)}"><path d="M0,22 C-30,2 -36,-18 -22,-28 C-12,-35 -2,-28 0,-18 C2,-28 12,-35 22,-28 C36,-18 30,2 0,22Z" fill="#c8202a"/><path d="M-16,-20 Q-22,-10 -14,0" stroke="#ff8a8a" stroke-width="3" fill="none" opacity=".7"/></g>`;
  // ECG trace
  let d = ''; for (let x = 0; x <= 720; x += 4) { const ph = pmod((x / 720) * 2.4 - T * 1.2, 1), y = 1090 - (ph < .04 ? Math.sin(ph / .04 * Math.PI) * 70 : ph < .07 ? -Math.sin((ph - .04) / .03 * Math.PI) * 22 : 0); d += (x ? 'L' : 'M') + x + ',' + y.toFixed(1); }
  s += `<path d="${d}" stroke="#ff4a4a" stroke-width="3" fill="none" opacity="${(hb * .9).toFixed(2)}"/>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// an air molecule (N2 or O2): two touching shaded spheres
function mol(x, y, r, a, c) { const dx = Math.cos(a) * r * .8, dy = Math.sin(a) * r * .8; return [[-1], [1]].map(([q]) => `<circle cx="${(x + q * dx).toFixed(1)}" cy="${(y + q * dy).toFixed(1)}" r="${r}" fill="url(#${c})"/>`).join(''); }
// 5: the frozen air won't move aside: a wall of fixed molecules in front of you
function sceneWall(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 1) - .2, WS(5, 4) + .3)), push = ease(ramp(t, WS(5, 7) - .2, WS(5, 10) + .3));
  let s = `<defs><radialGradient id="mN" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#e8f0ff"/><stop offset=".55" stop-color="#7a9ad8"/><stop offset="1" stop-color="#2a3a6a"/></radialGradient><radialGradient id="mO" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffe8e8"/><stop offset=".55" stop-color="#e86a5a"/><stop offset="1" stop-color="#6a1e1a"/></radialGradient></defs>` + frozenBG(t, 'w5') + `<rect width="720" height="1280" fill="#060a1a" opacity=".78"/>`;
  // molecules: dense lattice-free gas, fixed in place, filling the space ahead (kept below the side list)
  const r = RS(23); let m = ''; for (let i = 0; i < 120; i++) { const x = 330 + r() * 400, y = 650 + r() * 520, a = r() * 3.14, rr = 7 + r() * 5, isO = r() < .21, dx = x - 300, dy = y - 900, dd = Math.hypot(dx, dy), sq = push * 26 * Math.exp(-dd / 90);
    m += `<g opacity="${k.toFixed(2)}">` + mol(x + sq * dx / dd, y + sq * dy / dd, rr, a, isO ? 'mO' : 'mN') + `</g>`; }
  s += m + `<rect x="330" y="640" width="6" height="540" fill="#9ab8e8" opacity="${(.0 + .35 * push).toFixed(2)}" filter="url(#blur2)"/>`;
  // you push against it and don't move
  s += `<g transform="translate(${180 + push * 30 + Math.sin(T * 9) * 2 * push},1180)">` + castSh(0, 0, .8) + person(0, 0, Object.assign({ s: .8, face: 1, t, moving: 1, phase: 1.2, amp: .5 * push }, YOU)) + `<path d="M${30},${-205} L${120 + push * 6},${-260}" stroke="${YOU.top}" stroke-width="16" stroke-linecap="round"/><circle cx="${126 + push * 6}" cy="-262" r="10" fill="${YOU.skin}"/></g>`;
  s += lbl(530, 1220, 'جزيئاتُ هواءٍ متجمّدة', k, '#cfd8ff', 22);
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 6: no air into your lungs – but one held breath lasts far longer than 5 seconds
function sceneBreath(t) {
  const st = S0(6) - .2, T = t - st, k = ease(ramp(t, WS(6, 0) - .2, WS(6, 2) + .3)), kb = ease(ramp(t, WS(6, 7) - .2, WS(6, 11) + .3));
  let s = frozenBG(t, 'b6') + `<rect width="720" height="1280" fill="#060a1a" opacity=".8"/>`;
  s += `<g transform="translate(300,1250) scale(2.6)" opacity=".6">` + person(0, 0, Object.assign({ s: 1, face: 1, t }, YOU)) + `</g>`;
  // lungs (semi-transparent) on the chest, not expanding
  const lx = 318, ly = 680; s += `<g opacity="${(.85 * k).toFixed(2)}"><path d="M${lx - 6},${ly - 70} L${lx - 6},${ly - 20} M${lx - 6},${ly - 20} L${lx - 30},${ly} M${lx - 6},${ly - 20} L${lx + 18},${ly}" stroke="#f2c8c8" stroke-width="5" fill="none"/>` +
    `<path d="M${lx - 16},${ly - 30} C${lx - 70},${ly - 40} ${lx - 84},${ly + 40} ${lx - 70},${ly + 90} C${lx - 50},${ly + 100} ${lx - 24},${ly + 90} ${lx - 18},${ly + 60}Z" fill="#e88a8a" opacity=".75"/><path d="M${lx + 4},${ly - 30} C${lx + 58},${ly - 40} ${lx + 72},${ly + 40} ${lx + 58},${ly + 90} C${lx + 38},${ly + 100} ${lx + 12},${ly + 90} ${lx + 6},${ly + 60}Z" fill="#e88a8a" opacity=".75"/></g>`;
  // blocked inflow at the mouth
  s += `<g opacity="${k.toFixed(2)}"><path d="M520,${520} L${400},${545}" stroke="#9ab8e8" stroke-width="4" stroke-dasharray="8 7"/><path d="M398,532 l24,26 M422,532 l-24,26" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round"/></g>`;
  // bars: 5 s vs a normal breath-hold of ~30–90 s
  s += `<g transform="translate(40,1040)"><rect width="640" height="170" rx="18" fill="#0a0e1c" opacity=".92"/>` + lbl(610, 46, 'المطلوب', kb, '#cfd8ff', 22, 'end') + `<rect x="30" y="60" width="${(540 * 5 / 90 * kb).toFixed(1)}" height="20" rx="6" fill="#f4c76b"/>` + num(110, 78, '5 s', kb, '#f4c76b', 22) +
    lbl(610, 118, 'حبسُ النفَسِ عادةً', kb, '#cfd8ff', 22, 'end') + `<rect x="30" y="132" width="${(540 * kb).toFixed(1)}" height="20" rx="6" fill="#4caf50"/>` + num(300, 168, '30–90 s', kb, '#fff', 22) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 7: time returns: colour comes back, the rain falls, nobody noticed
function sceneResume(t) {
  const GO = WS(7, 1) + .1, tf = FZ2() + Math.max(0, t - GO), f = 1 - ease(ramp(t, GO, GO + .6));
  let s = world(t, tf, { f, id: 'r', rain: 1, ball: 1 });
  s += you(300, 1100, .6, t, 0, { lookUp: .15 });
  s += ripple(320, 900, clamp((t - GO) / 1.5));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 8: "the darkest moment of your life": the dark frozen street and a 5-second ring
function sceneLast(t) {
  const st = S0(8) - .2, T = t - st, k = clamp((t - WS(8, 0)) / (WS(8, 8) + .6 - WS(8, 0)));
  let s = frozenBG(t, 'l8') + `<rect width="720" height="1280" fill="#000" opacity="${(.55 + .35 * k).toFixed(2)}"/>`;
  s += `<g transform="translate(300,1100)" opacity=".85">` + you(0, 0, .6, t, 0) + `</g>`;
  const n = Math.max(0, Math.ceil(5 - k * 5 - 1e-6));
  s += `<g transform="translate(360,720)"><circle r="120" fill="#0a0e1c" opacity=".85"/><circle r="104" fill="none" stroke="#2a3048" stroke-width="12"/><circle r="104" fill="none" stroke="#f4c76b" stroke-width="12" stroke-dasharray="${(653.5 * (1 - k)).toFixed(1)} 800" transform="rotate(-90)" stroke-linecap="round"/><text y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="110" fill="#fff">${AR(n)}</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 9: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7), WS(9, 7) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneNormal }, { s: S0(2) - .2, f: sceneFreeze }, { s: S0(3) - .2, f: sceneDark }, { s: S0(4) - .2, f: sceneSilence },
  { s: S0(5) - .2, f: sceneWall }, { s: S0(6) - .2, f: sceneBreath }, { s: S0(7) - .2, f: sceneResume }, { s: S0(8) - .2, f: sceneLast }, { s: S0(9) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneDark, sceneSilence, sceneWall, sceneBreath, sceneLast]);
const XF = .5;
const TLI = [['ظلام', S0(3)], ['صمت', S0(4)], ['هواء صلب', S0(5)], ['بلا تنفّس', S0(6)]];
const LIST_ON = new Set([sceneDark, sceneSilence, sceneWall, sceneBreath]);
const CHIPS = [
  ['c1', 'في ٥ ثوانٍ عاديّة', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c2', 'الزمنُ متجمّد', 360, 330, 'red', WS(2, 2) + .3, S0(3) - .3],
  ['c3', 'ظلامٌ تامّ', 360, 330, 'red', WS(3, 12), S0(4) - .3],
  ['c4', 'لم يلاحظ أحد', 360, 330, 'big', WS(7, 7), S0(8) - .3],
  ['c5', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الزمن متوقّف</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
