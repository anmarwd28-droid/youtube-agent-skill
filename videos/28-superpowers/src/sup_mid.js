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
  const hz = mix(sky[2], '#5a6878', .35), r = RS(o.seed ?? 7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += o.harsh ? `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="#6e655a"/><rect x="${x + w * .7}" y="${900 - h}" width="${w * .3}" height="${h}" fill="#000" opacity=".55"/>` + Array.from({ length: Math.floor(h / 22) }, (_, q) => Array.from({ length: Math.floor(w / 16) }, (_, p) => `<rect x="${x + 5 + p * 16}" y="${900 - h + 8 + q * 22}" width="6" height="9" fill="#1a1c22"/>`).join('')).join('') : `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".7"/>`; x += w + 4; }
  if (o.seed) { const q = RS(o.seed * 3 + 1), pal = ['#bca68a', '#a8927a', '#c8b49a', '#d2bfa2', '#9e8a74', '#c4a88c', '#b8a690']; let bx = -10;
    while (bx < 730) { const bw = 110 + q() * 60, bh = 200 + q() * 150; s += q() < .45 ? shanasheel(bx, PV, bw, bh, Math.floor(q() * 40) + 11) : bldg(bx, PV, bw, bh, pal[Math.floor(q() * pal.length)], 3 + Math.floor(q() * 2), .15); bx += bw; } }
  else s += shanasheel(-10, PV, 170, 260, 11) + bldg(170, PV, 120, 340, '#bca68a', 3, .15) + shanasheel(300, PV, 150, 230, 12) + bldg(460, PV, 110, 220, '#a8927a', 4, .15) + shanasheel(580, PV, 160, 210, 13);
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

// ===================== "what if everyone woke up tomorrow with a superpower?" (Short #28) =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const YOU = { top: '#e85a2a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };
const panel = (x, y, w, h, a = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#0a0e1c" opacity="${(.88 * a).toFixed(2)}"/>`;
const noEarth = () => { F.earth = null; F.moon = null; F.sun = null; F.w = null; };
const zoomG = (inner, k, wx, wy, sx, sy) => `<g transform="translate(${sx.toFixed(2)},${sy.toFixed(2)}) scale(${k.toFixed(4)}) translate(${(-wx).toFixed(2)},${(-wy).toFixed(2)})">${inner}</g>`;
function arrow(x0, y0, x1, y1, a, col = '#f4c76b', w = 4) {
  if (a <= 0) return ''; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy) || 1, ux = dx / L, uy = dy / L, h = 12 + w * 2;
  return `<g opacity="${a.toFixed(2)}"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="#000" stroke-opacity=".5" stroke-width="${w + 4}" stroke-linecap="round"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${(x1 - ux * h * .8).toFixed(1)},${(y1 - uy * h * .8).toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${(x1 - ux * h - uy * h * .55).toFixed(1)},${(y1 - uy * h + ux * h * .55).toFixed(1)} L${(x1 - ux * h + uy * h * .55).toFixed(1)},${(y1 - uy * h - ux * h * .55).toFixed(1)}Z" fill="${col}" stroke="#000" stroke-opacity=".5" stroke-width="2"/></g>`;
}
// ---------- defs of this video: brick courses, glass, far windows, sun-side shading, ghost (invisible) look, beams, steel ----------
const SDEF = `<pattern id="brk" width="20" height="10" patternUnits="userSpaceOnUse"><path d="M0,.5 H20 M0,5.5 H20 M5,0 V5 M15,5 V10" stroke="#000" stroke-opacity=".17" stroke-width="1"/><path d="M0,1.6 H20 M0,6.6 H20" stroke="#fff" stroke-opacity=".09" stroke-width="1"/></pattern>` +
  `<pattern id="brkL" width="34" height="17" patternUnits="userSpaceOnUse"><path d="M0,.5 H34 M0,9 H34 M8,0 V9 M25,9 V17" stroke="#3a1c12" stroke-opacity=".5" stroke-width="1.6"/><path d="M0,2.2 H34 M0,10.6 H34" stroke="#fff" stroke-opacity=".12" stroke-width="1.2"/></pattern>` +
  `<pattern id="winP" width="13" height="19" patternUnits="userSpaceOnUse"><rect x="3" y="5" width="6" height="9" fill="#fff" opacity=".2"/></pattern>` +
  `<linearGradient id="glsG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a6cdea"/><stop offset=".45" stop-color="#5a90bc"/><stop offset="1" stop-color="#2c5a84"/></linearGradient>` +
  `<linearGradient id="sunSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff2d0" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#101828" stop-opacity=".2"/></linearGradient>` +
  `<linearGradient id="aoUp" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="aoDn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>` +
  `<radialGradient id="goldG"><stop offset="0" stop-color="#fff3c8" stop-opacity=".95"/><stop offset=".35" stop-color="#f4c76b" stop-opacity=".5"/><stop offset="1" stop-color="#f4c76b" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="redG"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".25" stop-color="#ff7a5a" stop-opacity=".75"/><stop offset="1" stop-color="#ff2a1a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="dustG"><stop offset="0" stop-color="#e8dcc6" stop-opacity=".8"/><stop offset="1" stop-color="#cbbd9f" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="stG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#aeb8c4"/><stop offset=".12" stop-color="#e6ecf2"/><stop offset=".22" stop-color="#8f9aa8"/><stop offset=".3" stop-color="#5d6875"/><stop offset=".7" stop-color="#6c7784"/><stop offset=".8" stop-color="#909baa"/><stop offset=".9" stop-color="#c8d0da"/><stop offset="1" stop-color="#77828f"/></linearGradient>` +
  `<filter id="ghostF" x="-10%" y="-10%" width="120%" height="120%"><feMorphology in="SourceAlpha" operator="dilate" radius="1.3" result="d"/><feComposite in="d" in2="SourceAlpha" operator="out" result="edge"/><feFlood flood-color="#e8f6ff" flood-opacity=".95"/><feComposite in2="edge" operator="in" result="rim"/><feGaussianBlur in="rim" stdDeviation="2.4" result="rimB"/>` +
  `<feFlood flood-color="#bfe4ff" flood-opacity=".13"/><feComposite in2="SourceAlpha" operator="in" result="fill"/><feMerge><feMergeNode in="fill"/><feMergeNode in="rimB"/><feMergeNode in="rim"/></feMerge></filter>` +
  `<linearGradient id="torsoSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".26"/></linearGradient>` +
  `<filter id="blur5" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter><filter id="blur9" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}${SDEF}`;
// ---------- new buildings (illustrated, same family as bldg/shanasheel): brick flats with balconies, a glass office ----------
function roofKit(x, top, w, seed) {
  const r = RS(seed + 900), tx = x + w * (.18 + r() * .2), dx = x + w * (.62 + r() * .2);
  return `<rect x="${tx - 3}" y="${top - 30}" width="4" height="30" fill="#5a5a5e"/><rect x="${tx + 17}" y="${top - 30}" width="4" height="30" fill="#5a5a5e"/><rect x="${tx - 8}" y="${top - 52}" width="34" height="26" rx="6" fill="#d9dde2"/><rect x="${tx - 8}" y="${top - 52}" width="12" height="26" rx="6" fill="#fff" opacity=".35"/><rect x="${tx + 16}" y="${top - 52}" width="10" height="26" rx="5" fill="#000" opacity=".22"/>` +
    `<path d="M${dx},${top} v-22" stroke="#4a4a50" stroke-width="2.4"/><ellipse cx="${dx + 5}" cy="${top - 26}" rx="11" ry="8" fill="#e6e8ec" transform="rotate(-28,${dx + 5},${top - 26})"/><ellipse cx="${dx + 7}" cy="${top - 26}" rx="6" ry="4.5" fill="#000" opacity=".15" transform="rotate(-28,${dx + 5},${top - 26})"/>`;
}
function aptBrick(x, base, w, h, col, seed, o = {}) {
  const r = RS(seed), side = o.side ?? .13, sw = w * side, top = base - h, fh = o.fh || 46, trim = mix(col, '#ffffff', .5), dark = mix(col, '#000000', .4);
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#brk)"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#sunSide)"/>` +
    `<path d="M${x + w},${top} l${sw},${-sw * .4} l0,${h} l${-sw},${sw * .4}Z" fill="${dark}"/><path d="M${x},${top} l${sw},${-sw * .4} l${w},0 l${-sw},${sw * .4}Z" fill="${mix(col, '#ffffff', .3)}"/>` +
    `<rect x="${x - 3}" y="${top - 7}" width="${w + 6}" height="10" fill="${trim}"/><rect x="${x - 3}" y="${top + 3}" width="${w + 6}" height="4" fill="#000" opacity=".28"/>`;
  const rows = o.rows ?? Math.floor((h - (o.ground ?? 108)) / fh), cols = o.cols ?? Math.max(2, Math.round(w / 54)), cw = w / cols, ww = o.ww ?? Math.min(26, cw * .5), wh = o.wh ?? Math.min(30, fh * .64);
  for (let i = 0; i < rows; i++) { const wy = top + 18 + i * fh;
    if (o.bands) s += `<rect x="${x}" y="${wy + wh + 9}" width="${w}" height="3" fill="${trim}" opacity=".55"/><rect x="${x}" y="${wy + wh + 12}" width="${w}" height="2" fill="#000" opacity=".16"/>`;
    for (let j = 0; j < cols; j++) { const wx = x + j * cw + cw / 2, lit = r() > .88, cur = r(), bal = (j + seed + (o.balShift || 0)) % 2 === 0;
      s += `<rect x="${wx - ww / 2 - 2.5}" y="${wy - 2.5}" width="${ww + 5}" height="${wh + 5}" fill="${trim}"/><rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" fill="${lit ? '#ffd890' : '#48688a'}"/>` +
        `<path d="M${wx - ww / 2},${wy + wh * .75} L${wx - ww / 2},${wy} L${wx + ww * .2},${wy}Z" fill="#cfe6f8" opacity=".38"/><rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="5" fill="#000" opacity=".22"/><path d="M${wx},${wy} v${wh}" stroke="${trim}" stroke-width="1.8"/>` +
        (cur < .42 ? `<rect x="${wx + (cur < .2 ? -ww / 2 : ww * .14)}" y="${wy}" width="${ww * .36}" height="${wh}" fill="${['#efe4c8', '#cddcc6', '#e0c8c4'][Math.floor(cur * 7.1)]}" opacity=".88"/>` : '');
      if (bal) s += `<rect x="${wx - ww / 2 - 9}" y="${wy + wh + 3}" width="${ww + 18}" height="5" fill="#dcd6ca"/><rect x="${wx - ww / 2 - 7}" y="${wy + wh + 8}" width="${ww + 14}" height="6" fill="#000" opacity=".3"/><path d="M${wx - ww / 2 - 8},${wy + wh - 13} h${ww + 16}" stroke="#2c2c30" stroke-width="2.2"/>` +
        Array.from({ length: 7 }, (_, q) => `<path d="M${(wx - ww / 2 - 7 + q * (ww + 14) / 6).toFixed(1)},${wy + wh - 13} v16" stroke="#2c2c30" stroke-width="1.5"/>`).join('') +
        (r() > .5 ? `<rect x="${wx + ww / 2 - 2}" y="${wy + wh - 22}" width="9" height="10" fill="#b0603a"/><circle cx="${wx + ww / 2 + 2.5}" cy="${wy + wh - 26}" r="6.5" fill="#3f7a34"/><circle cx="${wx + ww / 2 + .5}" cy="${wy + wh - 28}" r="3" fill="#5c9a44"/>` : '');
      else s += `<rect x="${wx - ww / 2 - 4}" y="${wy + wh + 2.5}" width="${ww + 8}" height="4" fill="${mix(col, '#ffffff', .34)}"/><rect x="${wx - ww / 2 - 3}" y="${wy + wh + 6.5}" width="${ww + 6}" height="3" fill="#000" opacity="${.22}"/>`; } }
  return s + (o.roof === 0 ? '' : roofKit(x, top - 7, w, seed));
}
function officeGlass(x, base, w, h, seed, side = .12) {
  const r = RS(seed), sw = w * side, top = base - h, cols = Math.round(w / 27), pw = w / cols, ph = 27, rows = Math.floor((h - 100) / ph);
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#glsG)"/><path d="M${x + w},${top} l${sw},${-sw * .4} l0,${h} l${-sw},${sw * .4}Z" fill="#1c4064"/><path d="M${x},${top} l${sw},${-sw * .4} l${w},0 l${-sw},${sw * .4}Z" fill="#cfe2ee"/>`;
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const k = r(); if (k > .42) continue; s += `<rect x="${(x + j * pw + 1).toFixed(1)}" y="${top + 8 + i * ph}" width="${(pw - 2).toFixed(1)}" height="${ph - 2}" fill="${k < .12 ? '#d6ecfa' : k < .27 ? '#2a5886' : '#7fb0d6'}" opacity="${k < .12 ? .55 : .45}"/>`; }
  s += `<path d="M${x},${top + h * .46} L${x + w},${top + h * .1} L${x + w},${top + h * .27} L${x},${top + h * .63}Z" fill="#fff" opacity=".13"/><path d="M${x},${top + h * .7} L${x + w},${top + h * .34} L${x + w},${top + h * .38} L${x},${top + h * .74}Z" fill="#fff" opacity=".09"/>`;
  for (let j = 0; j <= cols; j++) s += `<path d="M${(x + j * pw).toFixed(1)},${top} v${h - 96}" stroke="#e8f1f7" stroke-opacity=".55" stroke-width="1.6"/>`;
  for (let i = 0; i <= rows; i++) s += `<path d="M${x},${top + 7 + i * ph} h${w}" stroke="#173654" stroke-opacity=".55" stroke-width="2"/>`;
  return s + `<rect x="${x - 2}" y="${top - 9}" width="${w + 4}" height="11" fill="#eef2f5"/><rect x="${x - 2}" y="${top + 2}" width="${w + 4}" height="3" fill="#000" opacity=".3"/><rect x="${x + w * .3}" y="${top - 34}" width="${w * .34}" height="26" fill="#9aa7b4"/><rect x="${x + w * .3}" y="${top - 34}" width="${w * .1}" height="26" fill="#fff" opacity=".25"/><path d="M${x + w * .78},${top - 9} v-44" stroke="#59626c" stroke-width="2.6"/><circle cx="${x + w * .78}" cy="${top - 55}" r="3" fill="#e0483a"/>`;
}
// far skyline: two hazy layers with faint windows
function farCity(seed, base, hz, o = {}) {
  let s = ''; [[.5, 1.25, 0], [.78, 1, 1]].forEach(([op, hk, li]) => { const r = RS(seed + li * 31); let x = -30 - li * 17;
    while (x < 740) { const w = 38 + r() * 66, h = (64 + r() * 190) * hk * (o.hk || 1), c = mix(hz, '#ffffff', li ? 0 : .22), k = r();
      s += `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${c}" opacity="${op}"/><rect x="${x.toFixed(1)}" y="${(base - h + 6).toFixed(1)}" width="${w.toFixed(1)}" height="${(h - 6).toFixed(1)}" fill="url(#winP)" opacity="${li ? .8 : .5}"/><rect x="${(x + w * .72).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(w * .28).toFixed(1)}" height="${h.toFixed(1)}" fill="#0c1830" opacity="${li ? .14 : .07}"/>`;
      if (k > .8) s += `<rect x="${(x + w * .4).toFixed(1)}" y="${(base - h - 16).toFixed(1)}" width="${(w * .3).toFixed(1)}" height="16" fill="${c}" opacity="${op}"/>`;
      if (k < .13) s += `<path d="M${(x + w / 2).toFixed(1)},${(base - h).toFixed(1)} v-34" stroke="${c}" stroke-width="2.2" opacity="${op}"/>`;
      x += w + 3; } });
  return s;
}
const SHOPS = [[-4, 146, 'مقهى', '#7a4a2a'], [154, 124, 'مكتبة', '#2a5a9a'], [290, 152, 'صيدلية', '#2a8a4a'], [452, 116, 'فواكه', '#d9822b'], [580, 148, 'مخبز', '#c0392b']];
function shopRow(PV) {
  let s = '';
  SHOPS.forEach(([sx, sw, name, c], i) => { const r = RS(i + 61), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/>` +
      `<rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      // things in the window, the door, reflections
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/><rect x="${gx + gw - dw + 5}" y="${PV - 42}" width="3" height="14" fill="#d8d8d8"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/>` +
      `<rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`; });
  return s;
}
// the street of this video. o: {id, sky, cars, trees:[[x,h,seed]], lamps:[x], seed}
function streetS(t, o = {}) {
  const sky = o.sky || ['#3a6fb8', '#93bbe2', '#ebe3d0'], PV = 1000, KB = 1104, id = o.id || 'q';
  let s = `<defs>${DEFB()}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  s += `<circle cx="150" cy="470" r="150" fill="#fff6d0" opacity=".28" filter="url(#soft)"/><circle cx="150" cy="470" r="30" fill="#fffdf2"/>` + cumulus(210 + t * 1.2, 420, 230, 3, { a: .9 }) + cumulus(545 + t * .8, 545, 170, 5, { a: .85 }) + cumulus(430 + t, 330, 120, 9, { a: .6 });
  s += farCity(28, 905, mix(sky[2], '#55657a', .4));
  s += `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`;
  // front row: new buildings for this video
  s += aptBrick(-10, PV, 158, 304, '#b2684e', 281, { bands: 1 }) + bldg(148, PV, 136, 372, '#cbb896', 6, .12) + roofKit(148, PV - 372, 136, 3) + officeGlass(284, PV, 164, 432, 283) + shanasheel(448, PV, 126, 238, 21) + aptBrick(574, PV, 160, 318, '#cfbda0', 286, { balShift: 1 });
  s += `<path d="M-20,742 Q170,790 330,752 T740,770" stroke="#22242a" stroke-width="1.8" fill="none" opacity=".8"/>`;
  [[200, 742], [505, 812], [596, 706]].forEach(([ax, ay]) => { s += `<rect x="${ax}" y="${ay}" width="30" height="20" rx="2" fill="#e8e8e8"/><rect x="${ax}" y="${ay}" width="30" height="4" fill="#fff"/><rect x="${ax + 3}" y="${ay + 7}" width="24" height="2" fill="#999"/><rect x="${ax + 3}" y="${ay + 12}" width="24" height="2" fill="#999"/><rect x="${ax + 2}" y="${ay + 20}" width="26" height="4" fill="#000" opacity=".25"/>`; });
  s += shopRow(PV) + `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  // pavement: tiles, kerb, then the road
  s += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c9bda7"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e8e4d8"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>` + Array.from({ length: 10 }, (_, q) => `<rect x="${q * 80 - 40}" y="${KB}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('');
  s += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4e4e54"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 100}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') +
    `<ellipse cx="310" cy="1236" rx="26" ry="7" fill="#3c3c42"/><ellipse cx="310" cy="1236" rx="26" ry="7" fill="none" stroke="#2a2a2e" stroke-width="2"/><path d="M292,1236 h36 M300,1232 h20 M300,1240 h20" stroke="#2a2a2e" stroke-width="1.4"/><rect x="606" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  // planters, tree grates, trees with soft shadows, lamp posts
  const trees = o.trees || [[100, 300, 3], [566, 268, 5]], lamps = o.lamps || [28, 250, 694];
  [[196, PV + 18], [486, PV + 18], [640, PV + 18]].forEach(([px, py], i) => { s += `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/><rect x="${px - 30}" y="${py - 14}" width="60" height="5" rx="2" fill="#fff" opacity=".2"/><rect x="${px - 26}" y="${py + 8}" width="62" height="5" fill="#000" opacity=".22"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${px - 24 + q * 8},${py - 12} q${q % 2 ? 4 : -4},-18 ${q % 2 ? 2 : -2},-30" stroke="#4a8a2a" stroke-width="3.5" fill="none"/><circle cx="${px - 24 + q * 8 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#e84a5a', '#f4c84a', '#fff'][(q + i) % 3]}"/>`).join(''); });
  trees.forEach(([px, h, sd]) => { const py = PV + 60; s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${px - 26 + q * 10},${py - 5} v10" stroke="#7a7068" stroke-width="2"/>`).join('') +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity=".22" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  lamps.forEach(lx => { s += `<path d="M${lx},${PV + 80} l64,9 l0,4 l-64,-7Z" fill="#000" opacity=".3"/>` + lampPost(lx, PV + 80, 250, 0); });
  if (o.cars !== 0) s += car(560, 1168, .95, '#d8d8dc', -1, 0) + car(pmod(-160 + t * 70, 1100) - 180, 1256, .9, '#a83a2a', 1, 0);
  return s;
}
// ---------- the house person with a free pose (same shapes as person()): superpowers change how people move ----------
let HP = {};
function ik(sx, sy, tx, ty, L1, L2, bend) {
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy) || .01; const dm = L1 + L2 - .5; if (d > dm) { dx *= dm / d; dy *= dm / d; d = dm; } d = Math.max(d, Math.abs(L1 - L2) + .5);
  const phi = Math.atan2(dx, dy), al = Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1)), a1 = phi + bend * al, ex = sx + Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1, Math.atan2(sx + dx - ex, sy + dy - ey)];
}
// o: {s, face, top, pants, skin, hair, lF/lB:[thigh,shin], aF/aB:[upper,fore], hF/hB:[world x,y] hand targets, walk: phase, amp, hipY, lean(deg), rot(deg), pv, lookUp, glow, glowCol, noShadow, air}
function hero(x, y, o = {}) {
  const c = Object.assign({}, YOU, o), s = o.s || 1, f = o.face || 1, lean = (o.lean || 0) * Math.PI / 180, rotD = o.rot || 0, pv = o.pv || 0;
  let lF = o.lF || [.1, .06], lB = o.lB || [-.1, -.14], aF = o.aF || [.05, .3], aB = o.aB || [-.05, .25], hipY = o.hipY;
  if (o.walk != null) { const p = o.walk, A = o.amp || .6, leg = ph => { const a = Math.sin(ph) * A, bend = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - bend]; }, sw = -Math.sin(p) * A * .85;
    lB = leg(p + Math.PI); lF = leg(p); aB = [-sw - .05, -sw + .25]; aF = [sw + .05, sw + .3]; hipY = -150 - Math.abs(Math.cos(p)) * 4; }
  const dyL = l => 76 * Math.cos(l[0]) + 74 * Math.cos(l[1]); if (hipY == null) hipY = -Math.max(dyL(lF), dyL(lB));
  const ty = hipY - 112, shX = 2, shY = ty + 14, hx = 6, hy = ty - 34;
  const toLocal = (wx, wy) => { const px = wx - x, py = wy - y - pv, a = -rotD * Math.PI / 180, qx = px * Math.cos(a) - py * Math.sin(a), qy = px * Math.sin(a) + py * Math.cos(a) + pv, lx = qx / (f * s), ly = qy / s - hipY;
    return [lx * Math.cos(-lean) - ly * Math.sin(-lean), lx * Math.sin(-lean) + ly * Math.cos(-lean) + hipY]; };
  if (o.hF) { const p = toLocal(o.hF[0], o.hF[1]); aF = ik(shX, shY, p[0], p[1], 60, 56, o.bendF ?? -1); }
  if (o.hB) { const p = toLocal(o.hB[0], o.hB[1]); aB = ik(shX - 4, shY, p[0], p[1], 60, 56, o.bendB ?? -1); }
  const L1 = limb(0, hipY, lB[0], lB[1], 76, 74, 19, c.pants), L2 = limb(0, hipY, lF[0], lF[1], 76, 74, 19, c.pants);
  const shoe = (l, col, a) => `<ellipse cx="${l.x2 + 9}" cy="${l.y2 + 1}" rx="17" ry="7" fill="${col}"${o.air ? ` transform="rotate(${(-a[1] * 57.3).toFixed(1)},${l.x2.toFixed(1)},${l.y2.toFixed(1)})"` : ''}/>`;
  const torso = `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} Q4,${ty - 9} 26,${ty + 6} C33,${ty + 30} 27,${hipY - 40} 25,${hipY + 6} Z" fill="${c.top}"/>` +
    `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} L-6,${ty} L-8,${hipY + 6}Z" fill="#000" opacity=".22"/>` +
    (o.shade ? `<path d="M-23,${hipY + 6} C-27,${hipY - 40} -31,${ty + 18} -22,${ty + 4} Q4,${ty - 9} 26,${ty + 6} C33,${ty + 30} 27,${hipY - 40} 25,${hipY + 6} Z" fill="url(#torsoSh)"/><path d="M-12,${ty + 1} Q5,${ty + 13} 21,${ty + 2}" stroke="#000" stroke-width="3" fill="none" opacity=".22" stroke-linecap="round"/><ellipse cx="6" cy="${ty + 5}" rx="15" ry="5" fill="#000" opacity=".16"/>` : '');
  const armB = limb(shX - 4, shY, aB[0], aB[1], 60, 56, 14, c.top), armF = limb(shX, shY, aF[0], aF[1], 60, 56, 15, c.top), tilt = -16 * (o.lookUp || 0), g = o.glow || 0, gc = o.glowCol || '#ff5a3a';
  const head = `<rect x="${hx - 7}" y="${ty - 16}" width="14" height="20" rx="5" fill="${c.skin}"/><g transform="rotate(${tilt},${hx},${hy + 14})">` +
    `<ellipse cx="${hx}" cy="${hy}" rx="20" ry="24" fill="${c.skin}"/><ellipse cx="${hx - 6}" cy="${hy + 2}" rx="13" ry="20" fill="#000" opacity=".12"/>` +
    `<path d="M${hx - 21},${hy - 2} C${hx - 24},${hy - 30} ${hx + 6},${hy - 36} ${hx + 21},${hy - 14} C${hx + 14},${hy - 20} ${hx - 2},${hy - 18} ${hx - 8},${hy - 12} C${hx - 12},${hy - 4} ${hx - 14},${hy + 6} ${hx - 21},${hy - 2}Z" fill="${c.hair}"/>` +
    `<ellipse cx="${hx + 11}" cy="${hy - 2}" rx="2.4" ry="3" fill="${g > .3 ? '#fff' : '#1a120d'}"/><path d="M${hx + 6},${hy - 9} q6,-3 11,0" stroke="${c.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${hx - 14}" cy="${hy + 1}" rx="4" ry="6.5" fill="${c.skin}"/>` +
    (o.shade ? `<ellipse cx="${hx - 14}" cy="${hy + 1.5}" rx="2" ry="4" fill="#000" opacity=".18"/><path d="M${hx - 3},${hy + 22} Q${hx + 8},${hy + 26} ${hx + 15},${hy + 17}" stroke="#000" stroke-width="5" fill="none" opacity=".1" stroke-linecap="round"/><path d="M${hx + 17},${hy - 12} Q${hx + 21},${hy + 2} ${hx + 15},${hy + 15}" stroke="#fff" stroke-width="2" fill="none" opacity=".2" stroke-linecap="round"/><rect x="${hx - 7}" y="${ty - 12}" width="14" height="8" fill="#000" opacity=".16"/><circle cx="${hx + 11.8}" cy="${hy - 3}" r=".8" fill="#fff" opacity="${g > .3 ? 0 : .9}"/>` : '') +
    (g > 0 ? `<circle cx="${hx + 11}" cy="${hy - 2}" r="${(9 * g).toFixed(1)}" fill="${gc}" opacity="${(.75 * g).toFixed(2)}" filter="url(#blur2)"/><circle cx="${hx + 11}" cy="${hy - 2}" r="${(2.6 * g).toFixed(1)}" fill="#fff"/>` : '') + `</g>`;
  const up = `<g transform="rotate(${(lean * 57.29578).toFixed(2)},0,${hipY.toFixed(2)})">`, shadow = o.noShadow ? '' : `<ellipse cx="4" cy="2" rx="44" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/>`;
  const fw = (lx, ly, ln = 1) => { if (ln) { const dx = lx, dy = ly - hipY; lx = dx * Math.cos(lean) - dy * Math.sin(lean); ly = dx * Math.sin(lean) + dy * Math.cos(lean) + hipY; }
    const px = lx * f * s, py = ly * s - pv, a = rotD * Math.PI / 180; return [x + px * Math.cos(a) - py * Math.sin(a), y + pv + px * Math.sin(a) + py * Math.cos(a)]; };
  HP = { hand: fw(armF.x2, armF.y2), handB: fw(armB.x2, armB.y2), eye: fw(hx + 11, hy - 2), head: fw(hx, hy), chest: fw(0, ty + 50), footF: fw(L2.x2, L2.y2, 0), footB: fw(L1.x2, L1.y2, 0), hip: fw(0, hipY, 0) };
  return `<g transform="translate(${x.toFixed(2)},${y.toFixed(2)}) rotate(${rotD.toFixed(2)},0,${pv}) scale(${(f * s).toFixed(4)},${s})">${shadow}` +
    up + armB.svg + `<circle cx="${armB.x2}" cy="${armB.y2}" r="7" fill="${c.skin}"/></g>` + L1.svg.replace(c.pants, '#1d2028') + shoe(L1, '#3a3530', lB) +
    up + torso + head + `</g>` + L2.svg + shoe(L2, '#4a443c', lF) + up + armF.svg + `<circle cx="${armF.x2}" cy="${armF.y2}" r="7.5" fill="${c.skin}"/></g></g>`;
}
const pal = i => { const c = CROWD[i]; return { top: c.top, pants: c.pants, skin: c.skin, hair: c.hair }; };
const carNS = (x, y, s, col, face) => car(x, y, s, col, face, 0).replace('<ellipse cx="0" cy="2" rx="120" ry="8" fill="#000" opacity=".3"/>', '');
// soft dust puff and gold sparkles
const puff = (x, y, r, a) => a > 0.01 ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * 1.5).toFixed(1)}" ry="${r.toFixed(1)}" fill="url(#dustG)" opacity="${a.toFixed(2)}"/>` : '';
function sparkles(cx, cy, w, h, n, t, a, seed = 1) {
  if (a <= 0) return ''; let s = ''; const r = RS(seed + 70);
  for (let i = 0; i < n; i++) { const x = cx + (r() - .5) * w, ph = pmod(t * (.5 + r() * .5) + r(), 1), y = cy + h * .5 - ph * h, k = Math.sin(ph * Math.PI), sz = (2 + r() * 3.2) * k;
    s += `<path d="M${x.toFixed(1)},${(y - sz * 2).toFixed(1)} L${(x + sz * .5).toFixed(1)},${(y - sz * .5).toFixed(1)} L${(x + sz * 2).toFixed(1)},${y.toFixed(1)} L${(x + sz * .5).toFixed(1)},${(y + sz * .5).toFixed(1)} L${x.toFixed(1)},${(y + sz * 2).toFixed(1)} L${(x - sz * .5).toFixed(1)},${(y + sz * .5).toFixed(1)} L${(x - sz * 2).toFixed(1)},${y.toFixed(1)} L${(x - sz * .5).toFixed(1)},${(y - sz * .5).toFixed(1)}Z" fill="#ffe9a8" opacity="${(a * k * .9).toFixed(2)}"/>`; }
  return s;
}
const ring = (x, y, p, R0 = 30, R1 = 520, col = '#f4c76b') => p > 0 && p < 1 ? `<circle cx="${x}" cy="${y}" r="${(R0 + p * R1).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(9 * (1 - p) + 2).toFixed(1)}" opacity="${(.55 * (1 - p)).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x}" cy="${y}" r="${(R0 * .8 + p * R1 * .86).toFixed(1)}" fill="none" stroke="#fff" stroke-width="2" opacity="${(.4 * (1 - p)).toFixed(2)}"/>` : '';
// ---------- three.js camera helpers (world units: Earth radius 1), as in Short #27 ----------
const orbit = (d, el, az, tg = [0, .3, 0], fov = 30) => ({ pos: [tg[0] + d * Math.sin(az) * Math.cos(el), tg[1] + d * Math.sin(el), tg[2] + d * Math.cos(az) * Math.cos(el)], look: tg, fov });
function proj3(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 640 / Math.tan(c.fov * Math.PI / 360);
  return [360 + dot(d, r) / z * fp, 640 - dot(d, u) / z * fp, fp / z]; }
// a point on the three.js globe (same mapping as gl3d_world: north pole up, spin about the axis)
function geo3(lat, lon, spin, h = 1) { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180, x = Math.cos(la) * Math.sin(lo), y = -Math.cos(la) * Math.cos(lo), z = Math.sin(la), c = Math.cos(spin), s = Math.sin(spin);
  return [(x * c - y * s) * h, z * h, -(x * s + y * c) * h]; }
const beam = (x0, y0, x1, y1, a, w = 1, fl = 1) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}" stroke-linecap="round" fill="none"><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ff3a1e" stroke-width="${(18 * w).toFixed(1)}" opacity="${(.4 * fl).toFixed(2)}" filter="url(#blurU)"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ff6a3a" stroke-width="${(6.5 * w).toFixed(1)}" opacity=".9"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#fff6dc" stroke-width="${(2.4 * w).toFixed(1)}"/></g>`;
const BDEF = `<filter id="blurU" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1900"><feGaussianBlur stdDeviation="5"/></filter>`;

const ST0 = { trees: [[100, 300, 3], [664, 250, 5]], lamps: [28, 694] };
// ---------- 0: the hook. A street; one man lifts a car with one hand, one leaps to the roofs, one has burning eyes ----------
function liftRig(t, kL, o = {}) {
  const HX = 400, HY = 1098, S = .62, cr = 1 - ease(ramp(kL, .04, .62));
  const cx = lerp(456, HX + 6, kL), cyB = lerp(1150, 872 + (o.dip || 0), kL) - Math.sin(kL * Math.PI) * 34, ang = -15 * Math.sin(kL * Math.PI) - 4 * kL + Math.sin(t * 2.1) * 1.1 * kL;
  const hs = hero(HX, HY, { s: S, face: 1, lF: [.16 + .85 * cr, .1 - .8 * cr], lB: [-.2 + .95 * cr, -.16 - .62 * cr], lean: 50 * cr, hF: [cx - 6, cyB - lerp(48, 14, ease(ramp(kL, .3, .75)))], aB: [-.5, .8], lookUp: .45 * kL });
  const sh = `<ellipse cx="${cx.toFixed(1)}" cy="${lerp(1152, 1110, kL).toFixed(1)}" rx="${lerp(98, 74, kL).toFixed(1)}" ry="${lerp(7, 9, kL).toFixed(1)}" fill="#000" opacity="${lerp(.32, .2, kL).toFixed(2)}" filter="url(#blur2)"/>`;
  return { svg: sh + castSh(HX, HY, S) + hs + `<g transform="rotate(${ang.toFixed(2)},${cx.toFixed(1)},${(cyB - 14).toFixed(1)})">` + carNS(cx, cyB, .8, '#d8d8dc', -1) + `</g>`, cx, cyB };
}
function leaper(t, x0, tJ) {
  const c = pal(2), S = .52, g = 653, v0 = 783, u = t - tJ, tLd = 2 * v0 / g, GY = 1092;
  if (u < 0) { const cr = ease(ramp(u, -.42, -.06)); return castSh(x0, GY, S) + hero(x0, GY, Object.assign({ s: S, face: 1, lF: [.1 + .9 * cr, .06 - .85 * cr], lB: [-.1 + .9 * cr, -.14 - .7 * cr], aF: [.05 - .9 * cr, .3 - .6 * cr], aB: [-.05 - .9 * cr, .25 - .6 * cr], lean: 22 * cr, lookUp: 1 - cr }, c)); }
  const uu = Math.min(u, tLd), h = v0 * uu - .5 * g * uu * uu, v = v0 - g * uu, kd = ease(ramp(uu, tLd * .38, tLd * .62)), cr2 = u > tLd ? 1 - ease(ramp(u, tLd, tLd + .45)) : 0, L = (a, b) => [lerp(a[0], b[0], kd), lerp(a[1], b[1], kd)];
  let s = `<ellipse cx="${x0 + 4}" cy="${GY + 2}" rx="${(23 * (1 - .6 * h / 480)).toFixed(1)}" ry="4" fill="#000" opacity="${(.3 * (1 - .6 * h / 480)).toFixed(2)}" filter="url(#blur2)"/>`;
  if (u < tLd && Math.abs(v) > 120) { const len = Math.abs(v) * .16, sg = v > 0 ? 1 : -1, yy = GY - h - (sg > 0 ? 20 : 150); s += `<path d="M${x0 + 2},${yy} L${x0 + 2},${yy + sg * len}" stroke="#fff" stroke-width="16" stroke-linecap="round" opacity="${(.3 * Math.abs(v) / v0).toFixed(2)}" filter="url(#blurU)"/>`; }
  s += u > tLd ? hero(x0, GY, Object.assign({ s: S, face: 1, lF: [.1 + 1.0 * cr2, .06 - .9 * cr2], lB: [-.1 + .9 * cr2, -.14 - .9 * cr2], aF: [.05 + .5 * cr2, .3], aB: [-.05 - .7 * cr2, .25 - .4 * cr2], lean: 24 * cr2, noShadow: 1 }, c))
    : hero(x0, GY - h, Object.assign({ s: S, face: 1, air: 1, noShadow: 1, lF: L([.1, -.05], [.62, -.42]), lB: L([-.22, -.5], [.15, -.95]), aF: L([2.9, 3.05], [2.1, 2.6]), aB: L([2.6, 2.8], [-2.0, -2.5]), lookUp: .7 * (1 - kd) }, c));
  const pu = clamp(u / .7), pl = clamp((u - tLd) / .7);
  return s + puff(x0 - 24 - pu * 26, GY - 4, 10 + pu * 22, (1 - pu) * .9) + puff(x0 + 30 + pu * 26, GY - 4, 9 + pu * 20, (1 - pu) * .8) + (u > tLd ? puff(x0 - 30 - pl * 30, GY - 4, 12 + pl * 24, (1 - pl) * .9) + puff(x0 + 34 + pl * 30, GY - 4, 11 + pl * 22, (1 - pl) * .8) : '');
}
function lasereye(t, x, tE) {
  const g = ease(ramp(t, tE, tE + .25)), S = .55;
  const s = castSh(x, 1088, S) + hero(x, 1088, Object.assign({ s: S, face: 1, glow: g, lookUp: .7 * g, aF: [.05 + .5 * g, .3 + .9 * g], aB: [-.05 - .3 * g, .25] }, pal(1))), e = HP.eye, k = ease(ramp(t, tE + .1, tE + .45));
  return s + beam(e[0], e[1], e[0] + 300 * k, e[1] - 470 * k, g, .8, .85 + .15 * Math.sin(t * 50)) + `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="${(16 * g).toFixed(1)}" fill="url(#redG)" opacity="${(.9 * g).toFixed(2)}"/>`;
}
function sceneHook(t) {
  const kL = ease(ramp(t, .12, .95)), tJ = WS(0, 4) - .2, tE = WS(0, 6) - .15, tX = WS(0, 7) + .1;
  let s = `<defs>${BDEF}</defs>` + streetS(t, Object.assign({ id: 'h', cars: 0 }, ST0)) + car(pmod(-170 + t * 80, 1100) - 180, 1256, .9, '#a83a2a', 1, 0);
  const wx = Math.min(52 + t * 26, 92);
  s += castSh(wx, 1086, .5) + onWalk(wx, 1086, CROWD[0], .5, 1, t, { moving: wx < 92 ? 1 : 0, phase: t * 6, amp: .7, lookUp: ease(ramp(t, 1.4, 1.9)) });
  s += leaper(t, 208, tJ) + lasereye(t, 552, tE);
  const L = liftRig(t, kL);
  s += L.svg + ring(L.cx, L.cyB - 50, clamp((t - .8) / 1.3)) + sparkles(404, 950, 250, 330, 16, t, kL * .9, 3);
  F.flash = .28 * clamp(1 - Math.abs(t - tX) / .22);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: closer. One hand holds 1.5 tonnes; the weight still goes through the body into the ground ----------
function sceneLift(t) {
  const st = S0(1) - .2, T = t - st, dipK = Math.sin(Math.PI * clamp((t - (st + .3)) / 1.3)), k = 1.6 + .1 * ease(clamp(T / 5));
  let w = streetS(t, Object.assign({ id: 'l', cars: 0 }, ST0)) + car(pmod(-170 + t * 80, 1100) - 180, 1256, .9, '#a83a2a', 1, 0) + castSh(92, 1086, .5) + onWalk(92, 1086, CROWD[0], .5, 1, t, { lookUp: 1 });
  const L = liftRig(t, 1, { dip: 46 * dipK });
  w += L.svg + sparkles(404, 950, 230, 300, 12, t, .7, 3);
  let s = zoomG(w, k, 404, 1098, 300, 1140);
  const X = wx => 300 + (wx - 404) * k, Y = wy => 1140 + (wy - 1098) * k;
  const a1 = ease(ramp(t, WS(1, 1) - .1, WS(1, 1) + .3)), ty = Y(L.cyB - 104) - 10;
  s += `<g opacity="${a1.toFixed(2)}">` + panel(X(L.cx) - 112, ty - 60, 224, 62) + lbl(X(L.cx), ty - 17, '≈ ١٬٥٠٠ كغ', 1, '#f4c76b', 36) + `</g>`;
  const a2 = ease(ramp(t, WS(1, 4), WS(1, 4) + .35)), g2 = ease(ramp(t, WS(1, 4), WS(1, 4) + .7)), a3 = ease(ramp(t, WS(1, 5), WS(1, 5) + .35)), g3 = ease(ramp(t, WS(1, 5), WS(1, 5) + .7));
  s += arrow(X(404) - 104, Y(L.cyB) + 8, X(404) - 104, lerp(Y(L.cyB) + 60, 1128, g2), a2, '#ff6b5a', 7) + lbl(X(404) - 200, 930, 'وزنُ السيّارة', a2, '#ffc2b8', 27) +
    arrow(X(404) + 112, 1140, X(404) + 112, lerp(1100, 960, g3), a3, '#f4c76b', 7) + lbl(X(404) + 214, 1046, 'ردُّ فعلِ الأرض', a3, '#ffe4a0', 27);
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: push a wall with super force: the wall pushes back just as hard (Newton's third law) and you fly backwards ----------
function brickWall(k) {
  const x1 = 214, top = 404, base = 1128, hx = x1 + 13, hy = 884, r = RS(44);
  let s = `<path d="M${x1 + 24},${base - 2} L${x1 + 330},${base + 22} L${x1 + 330},${base + 62} L${x1 + 24},${base + 14}Z" fill="#000" opacity=".2" filter="url(#blur2)"/>` +
    `<rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#a65d44"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="url(#brkL)"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="#000" filter="url(#stainD)" opacity=".22"/>` +
    `<rect x="-30" y="${top}" width="${x1 + 30}" height="${base - top}" fill="url(#sunSide)"/>` +
    `<rect x="${x1}" y="${top}" width="26" height="${base - top}" fill="#6a3626"/><rect x="${x1}" y="${top}" width="26" height="${base - top}" fill="url(#brkL)" opacity=".7"/><rect x="${x1}" y="${top}" width="5" height="${base - top}" fill="#fff" opacity=".1"/>` +
    `<rect x="-30" y="${base - 34}" width="${x1 + 30}" height="34" fill="#8f877a"/><rect x="-30" y="${base - 34}" width="${x1 + 30}" height="5" fill="#fff" opacity=".22"/><rect x="${x1}" y="${base - 34}" width="26" height="34" fill="#59534b"/>` +
    `<rect x="-30" y="${top - 18}" width="${x1 + 64}" height="20" rx="3" fill="#d2c9b9"/><rect x="${x1}" y="${top - 18}" width="34" height="20" rx="3" fill="#000" opacity=".25"/><rect x="-30" y="${top + 2}" width="${x1 + 58}" height="6" fill="#000" opacity=".3"/>` +
    `<rect x="-30" y="${base - 12}" width="${x1 + 56}" height="12" fill="url(#aoUp)" opacity=".8"/>`;
  if (k > 0) { let c = ''; const jl = (px, off) => Math.floor((px - 4 - off) / 34) * 34 + off;
    for (let i = 0; i < 6; i++) { const dir = i % 2 ? -1 : 1, n = Math.max(1, Math.round((2 + r() * 6) * k)); let li = Math.round((hy + dir * (6 + i * 9 + r() * 10) - .5) / 8.5), px = x1, d = `M${px},${(li * 8.5 + .5).toFixed(1)}`;
      for (let q = 0; q < n; q++) { const even = pmod(li, 2) === 0, dd = r() < .92 ? dir : -dir, off = dd > 0 ? (even ? 8 : 25) : (even ? 25 : 8); px = jl(px, off); if (px < -20) break; li += dd; d += ` H${px} V${(li * 8.5 + .5).toFixed(1)}`; }
      c += `<path d="${d}" stroke="#1e0d08" stroke-width="${(3.6 - i * .3).toFixed(1)}" fill="none"/><path d="${d}" stroke="#e9b99c" stroke-width="1" fill="none" opacity=".45" transform="translate(1.2,1.6)"/>`; }
    [[-34, -8], [-68, 9], [-34, 26], [0, 9]].forEach(([dx, dy], i) => { const bx = 190 + dx + (i % 2 ? 17 : 0), by = Math.round((hy + dy) / 8.5) * 8.5 + .5; c += `<rect x="${bx}" y="${by}" width="${i % 2 ? 17 : 24}" height="8.5" fill="#2a130c" opacity=".7"/>`; });
    s += `<g opacity="${clamp(k * 1.6).toFixed(2)}">${c}<rect x="${x1}" y="${hy - 30}" width="9" height="24" rx="3" fill="#1e0d08" opacity=".6"/><rect x="${x1}" y="${hy + 6}" width="9" height="24" rx="3" fill="#1e0d08" opacity=".6"/></g>`; }
  return s;
}
function scenePush(t) {
  const st = S0(2) - .2, T = t - st, tP = WS(2, 1), tF = WS(2, 8) + .05, GY = 1126, HX = 358, u = t - tF;
  const kp = ease(ramp(t, tP - .32, tP + .02)), strain = ease(ramp(t, WS(2, 3), WS(2, 3) + .5)), dmg = clamp(.55 * ease(ramp(t, WS(2, 3) + .1, WS(2, 4) + .4)) + .45 * ease(ramp(t, tF - .1, tF + .15)));
  let s = `<defs>${BDEF}</defs>` + zoomG(streetS(t, { id: 'p', cars: 0, trees: [[566, 268, 5]], lamps: [250, 694] }) + car(590, 1168, .95, '#d8d8dc', -1, 0), 1.55, 430, 1098, 400, GY) + `<rect width="720" height="1280" fill="#f2ead8" opacity=".1"/>` + brickWall(dmg);
  if (u < 0) {
    const wk = 1 - kp, x = HX + 70 * wk * (1 - ease(ramp(t, st, tP - .3))) + Math.sin(t * 57) * 1.3 * strain;
    hero(x, GY, { s: 1, face: -1, walk: t * 6, amp: .6 }); const h0 = HP.hand, h1 = HP.handB, m = (a, b) => [lerp(a[0], b[0], kp), lerp(a[1], b[1], kp)];
    const wl = (ph => { const a = Math.sin(ph) * .6, b = Math.max(0, Math.cos(ph)) * .75 + .05; return [a, a - b]; });
    s += castSh(x, GY, 1) + hero(x, GY, { s: 1, face: -1, lF: m(wl(t * 6), [.62, -.2]), lB: m(wl(t * 6 + Math.PI), [-.5, -.42]), lean: 19 * kp + 3 * strain, hF: m(h0, [243, 868]), hB: m(h1, [243, 900]), noShadow: 1 });
    s += `<ellipse cx="243" cy="884" rx="${(26 * strain).toFixed(1)}" ry="${(34 * strain).toFixed(1)}" fill="url(#goldG)" opacity="${(.7 * strain).toFixed(2)}"/>`;
  } else {
    const x = HX + 780 * u + 420 * u * u, yc = GY - 150 - 250 * u + 520 * u * u, rot = 100 * ease(clamp(u / .55));
    s += `<ellipse cx="${x.toFixed(1)}" cy="${GY + 4}" rx="40" ry="7" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
    for (let i = 0; i < 6; i++) { const yy = yc - 110 + i * 44, L = 150 + (i * 37 % 90); s += `<path d="M${(x - 60).toFixed(1)},${yy.toFixed(1)} L${(x - 60 - L * clamp(u * 4)).toFixed(1)},${yy.toFixed(1)}" stroke="#fff" stroke-width="${3 + i % 2 * 2}" stroke-linecap="round" opacity="${(.5 * (1 - clamp(u / .8))).toFixed(2)}"/>`; }
    s += hero(x, yc + 150, { s: 1, face: -1, rot, pv: -150, air: 1, noShadow: 1, lF: [1.05 + .2 * Math.sin(t * 20), .5], lB: [.7, .15 + .2 * Math.cos(t * 20)], aF: [1.9, 1.5], aB: [1.5, 1.15] });
    for (let i = 0; i < 5; i++) { const p = clamp((u - i * .05) / .8); s += puff(HX + 30 + i * 70 * clamp(u * 3), GY - 6 - p * 26, 16 + p * 34, (1 - p) * .8 * (u > i * .05 ? 1 : 0)); }
    const pc = clamp((u - .5) / .9); if (u > .5) s += puff(705 - pc * 30, 1010 - pc * 40, 30 + pc * 60, (1 - pc) * .9) + puff(690, 1060 - pc * 20, 24 + pc * 40, (1 - pc) * .7);
    s += `<path d="M${HX - 6},${GY + 2} L${HX + 250},${GY + 5}" stroke="#3a342c" stroke-width="5" stroke-linecap="round" opacity="${(.55 * clamp(u * 5)).toFixed(2)}"/><path d="M${HX - 30},${GY + 14} L${HX + 220},${GY + 18}" stroke="#3a342c" stroke-width="5" stroke-linecap="round" opacity="${(.55 * clamp(u * 5)).toFixed(2)}"/>`;
  }
  // the two equal forces
  const a1 = ease(ramp(t, WS(2, 3) - .1, WS(2, 3) + .3)), g1 = ease(ramp(t, WS(2, 3) - .1, WS(2, 3) + .6)), a2 = ease(ramp(t, WS(2, 5), WS(2, 5) + .3)), g2 = ease(ramp(t, WS(2, 5), WS(2, 5) + .6));
  s += arrow(450, 640, lerp(420, 262, g1), 640, a1, '#f4c76b', 9) + lbl(356, 616, 'قوّتُك', a1, '#ffe4a0', 30) + arrow(262, 706, lerp(292, 450, g2), 706, a2, '#ff6b5a', 9) + lbl(356, 756, 'قوّةُ الجدار', a2, '#ffc2b8', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: a jump as high as ten storeys (30 m): 4.9 s in the air, and back on the ground at more than 80 km/h ----------
function jumpBG(t) {
  const sky = ['#3a6fb8', '#93bbe2', '#ebe3d0'], G = 1140, TX = 70, TW = 250, fh = 66, top = G - fh * 10;
  let s = `<defs>${DEFB()}${BDEF}<linearGradient id="skj" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-10" y="-10" width="740" height="1300" fill="url(#skj)"/>`;
  s += `<circle cx="590" cy="352" r="150" fill="#fff6d0" opacity=".3" filter="url(#soft)"/><circle cx="590" cy="352" r="30" fill="#fffdf2"/>` + cumulus(500 + t * 1.5, 660, 200, 3, { a: .9 }) + cumulus(210 - t, 400, 150, 9, { a: .7 }) + cumulus(400 + t, 830, 150, 5, { a: .7 });
  s += farCity(31, 1052, mix(sky[2], '#55657a', .4), { hk: 1.1 }) + `<rect x="-20" y="900" width="760" height="150" fill="${sky[2]}" opacity=".22"/>`;
  s += bldg(446, G, 124, 268, '#bfae92', 9, .12) + roofKit(446, G - 268, 124, 5) + officeGlass(566, G, 104, 330, 311) + aptBrick(662, G, 90, 214, '#b2684e', 281, { cols: 2 });
  // the ten-storey block of flats
  s += aptBrick(TX, G, TW, fh * 10, '#c8b99c', 301, { fh, rows: 9, cols: 4, ww: 34, wh: 40, bands: 1, side: .1 });
  s += `<rect x="${TX}" y="${G - fh + 6}" width="${TW}" height="${fh - 6}" fill="#3a3028"/>` + [0, 1, 3].map(i => `<rect x="${TX + 10 + i * 60}" y="${G - fh + 16}" width="50" height="${fh - 22}" fill="#48688a"/><path d="M${TX + 10 + i * 60},${G - 6} L${TX + 10 + i * 60},${G - fh + 16} L${TX + 34 + i * 60},${G - fh + 16}Z" fill="#cfe6f8" opacity=".3"/>`).join('') +
    `<rect x="${TX + 128}" y="${G - fh + 12}" width="54" height="${fh - 12}" fill="#221a14"/><rect x="${TX + 132}" y="${G - fh + 16}" width="22" height="${fh - 18}" fill="#5a7890"/><rect x="${TX + 157}" y="${G - fh + 16}" width="22" height="${fh - 18}" fill="#5a7890"/><path d="M${TX + 112},${G - fh + 6} l86,0 l10,12 l-106,0Z" fill="#8a2f2a"/><rect x="${TX + 102}" y="${G - fh + 18}" width="106" height="4" fill="#000" opacity=".3"/>` +
    `<rect x="${TX - 10}" y="${G - 14}" width="${TW + 40}" height="14" fill="url(#aoUp)" opacity=".6"/>`;
  // ground
  s += `<rect x="-10" y="${G}" width="740" height="62" fill="#c9bda7"/><rect x="-10" y="${G}" width="740" height="62" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-10" y="${G}" width="740" height="20" fill="url(#aoDn)" opacity=".6"/>` + [1, 2].map(q => `<path d="M-10,${G + 21 * q} H730" stroke="#a89c86" stroke-width="1.5"/>`).join('') + Array.from({ length: 17 }, (_, q) => `<path d="M${q * 48 - 8},${G} l-8,62" stroke="#a89c86" stroke-width="1.5"/>`).join('') +
    `<rect x="-10" y="${G + 62}" width="740" height="12" fill="#e8e4d8"/><rect x="-10" y="${G + 70}" width="740" height="4" fill="#8a8478"/>` + Array.from({ length: 10 }, (_, q) => `<rect x="${q * 80 - 20}" y="${G + 62}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('') +
    `<rect x="-10" y="${G + 74}" width="740" height="80" fill="#4e4e54"/><rect x="-10" y="${G + 74}" width="740" height="80" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  s += `<path d="M618,${G + 40} Q680,${G + 30} 740,${G + 44} L740,${G + 62} Q660,${G + 66} 616,${G + 50}Z" fill="#000" opacity=".2" filter="url(#blur2)"/>` + treeR(636, G + 40, 250, 7, t) + `<path d="M560,${G + 50} l64,9 l0,4 l-64,-7Z" fill="#000" opacity=".3"/>` + lampPost(560, G + 50, 230, 0) + car(596, G + 118, .86, '#d8d8dc', -1, 0);
  // floor ruler: ten ticks, 30 m
  const RX = 372; s += `<path d="M${RX},${G} V${top}" stroke="#fff" stroke-width="3" opacity=".9"/><path d="M${RX},${G} V${top}" stroke="#000" stroke-width="7" opacity=".25"/><path d="M${RX},${G} V${top}" stroke="#fff" stroke-width="3"/>`;
  for (let i = 1; i <= 10; i++) { const y = G - i * fh; s += `<path d="M${RX - 9},${y} h18" stroke="#fff" stroke-width="3"/>` + lbl(RX + 26, y + 40, AR(i), .95, i === 10 ? '#f4c76b' : '#fff', 20); }
  s += `<path d="M${TX + TW},${top} H540" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/>`;
  return s;
}
function sceneJump(t) {
  const st = S0(3) - .2, tL = WS(3, 0) + .45, FL = 2 * 24.26 / 9.81, tau = (t - tL) / FL, G = 1140, H = 660, HX = 470, S = .24, tc = clamp(tau), h = H * (1 - Math.pow(2 * tc - 1, 2)), hy = G - h;
  const z = 1 + .75 * (1 - ease(ramp(tau, -.02, .34))) + .7 * ease(ramp(tau, .74, .99)), fx = clamp(HX - 40 / z, 360 / z, 720 - 360 / z), fy = clamp(hy - 150 / z, 640 / z, 1280 - 640 / z);
  let w = jumpBG(t);
  const a30 = ease(ramp(tau, .2, .34)) * (1 - ease(ramp(tau, .66, .76))); w += lbl(410, G - H - 14, '٣٠ م', a30, '#f4c76b', 34);
  // shadow on the pavement, speed trail
  w += `<ellipse cx="${HX + 2}" cy="${G + 2}" rx="${(10 * (1 - .65 * h / H)).toFixed(1)}" ry="2.4" fill="#000" opacity="${(.34 * (1 - .6 * h / H)).toFixed(2)}"/>`;
  const vn = tau > 0 && tau < 1 ? (1 - 2 * tc) : 0;
  if (Math.abs(vn) > .12) { const len = Math.abs(vn) * 110, yy = vn > 0 ? hy - 6 : hy - 60; w += `<path d="M${HX + 1},${yy} L${HX + 1},${yy + (vn > 0 ? len : -len)}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="${(.34 * Math.abs(vn)).toFixed(2)}" filter="url(#blurU)"/>`; }
  let hs;
  if (tau < 0) { const cr = ease(ramp(t, tL - .55, tL - .1)) * (1 - ease(ramp(t, tL - .1, tL))); hs = hero(HX, G, { s: S, face: 1, noShadow: 1, lF: [.1 + .95 * cr, .06 - .85 * cr], lB: [-.1 + .9 * cr, -.14 - .72 * cr], aF: [.05 - 1.0 * cr, .3 - .7 * cr], aB: [-.05 - 1.0 * cr, .25 - .7 * cr], lean: 24 * cr, lookUp: .8 }); }
  else if (tau < 1) { const kd = ease(ramp(tau, .4, .6)), fl = Math.sin(t * 13) * kd, L = (a, b) => [lerp(a[0], b[0], kd), lerp(a[1], b[1], kd)];
    hs = hero(HX, hy, { s: S, face: 1, air: 1, noShadow: 1, lF: L([.08, -.05], [.7 + .15 * fl, -.45]), lB: L([-.2, -.5], [.2 - .15 * fl, -1.0]), aF: L([2.9, 3.05], [2.3 + .35 * fl, 2.8]), aB: L([2.65, 2.8], [-2.2 + .35 * fl, -2.7]), lookUp: .7 * (1 - kd), lean: -8 * kd }); }
  else { const q = t - (tL + FL), sh = Math.sin(t * 40) * 1.2 * (1 - clamp(q / .5)); hs = hero(HX + sh, G, { s: S, face: 1, noShadow: 1, lF: [1.25, -1.0], lB: [.45, -1.55], aF: [.75, .25], aB: [-.8, -.2], lean: 26 }); }
  w += hs;
  // dust at take-off, impact burst at landing
  const pu = clamp(tau / .12); if (tau > 0) w += puff(HX - 14 - pu * 14, G - 2, 6 + pu * 12, (1 - pu) * .9) + puff(HX + 16 + pu * 14, G - 2, 6 + pu * 11, (1 - pu) * .8);
  const q = t - (tL + FL);
  if (q > 0) { const p = clamp(q / .9), fl = clamp(1 - q / .32);
    w += `<ellipse cx="${HX}" cy="${G + 1}" rx="${(8 + p * 78).toFixed(1)}" ry="${(2 + p * 11).toFixed(1)}" fill="none" stroke="#f1e6d0" stroke-width="${(5 * (1 - p) + 1).toFixed(1)}" opacity="${(.9 * (1 - p)).toFixed(2)}"/>` + puff(HX - 20 - p * 46, G - 6 - p * 8, 9 + p * 24, (1 - p) * .95) + puff(HX + 22 + p * 46, G - 6 - p * 8, 9 + p * 24, (1 - p) * .95) + puff(HX, G - 10 - p * 18, 8 + p * 20, (1 - p) * .7);
    for (let i = 0; i < 11; i++) { const a = Math.PI * (1.08 + i * .084), r0 = 12 + 20 * (1 - fl), r1 = r0 + 26 + (i % 3) * 12, cx = Math.cos(a), sy = Math.sin(a) * .8, bx = HX + cx * r0, by = G - 4 + sy * r0;
      w += `<polygon points="${(bx - sy * 2.2).toFixed(1)},${(by + cx * 2.2).toFixed(1)} ${(bx + sy * 2.2).toFixed(1)},${(by - cx * 2.2).toFixed(1)} ${(HX + cx * r1).toFixed(1)},${(G - 4 + sy * r1).toFixed(1)}" fill="${i % 2 ? '#ff5a3a' : '#fff1c0'}" fill-opacity="${fl.toFixed(2)}"/>`; }
    const r = RS(8); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.1 + r() * .8), sp = 60 + r() * 80, px = HX + Math.cos(a) * sp * q, py = G - 4 + Math.sin(a) * sp * q + 160 * q * q; if (py < G + 2) w += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="3.4" height="3.4" fill="#8a8072" transform="rotate(${(q * 400 * (r() - .5)).toFixed(0)},${px.toFixed(1)},${py.toFixed(1)})"/>`; } }
  let s = `<g transform="translate(360,640) scale(${z.toFixed(4)}) translate(${(-fx).toFixed(2)},${(-fy).toFixed(2)})">${w}</g>`;
  // speed gauge (screen space)
  const v = tau <= 0 ? 0 : tau < .5 ? 87 * (1 - 2 * tc) : 84 * (2 * tc - 1), hit = tau >= 1, ag = ease(ramp(t, st + .3, st + .7));
  s += `<g opacity="${ag.toFixed(2)}">` + panel(34, 1116, 252, 122) + (hit ? `<rect x="34" y="1116" width="252" height="122" rx="18" fill="none" stroke="#ff5a3a" stroke-width="4" opacity="${(.6 + .4 * Math.sin(t * 9)).toFixed(2)}"/>` : '') + lbl(160, 1156, 'السرعة', 1, '#cfd8ff', 22) + lbl(160, 1214, `${AR(Math.round(v))} كم/س`, 1, hit ? '#ff7a5a' : '#f4c76b', 44) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: eye beams that cut steel need about 1 kW: ten times what the whole body produces (~100 W) ----------
function steelCol(t, kc, kf, cool) {
  const x0 = 548, w = 64, yT = 704, yB = 1014, yc = 792; let s = '';
  s += `<ellipse cx="${x0 + w / 2 + 30}" cy="${yB + 30}" rx="96" ry="10" fill="#000" opacity=".35" filter="url(#blur2)"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="30" rx="3" fill="#8f8a82"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="6" fill="#fff" opacity=".22"/><rect x="${x0 - 28}" y="${yB}" width="${w + 56}" height="30" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="${x0 - 12}" y="${yB - 10}" width="${w + 24}" height="12" fill="#59626e"/>` +
    [-6, w - 4].map(d => `<circle cx="${x0 + d + 5}" cy="${yB - 4}" r="4" fill="#2c333c"/>`).join('');
  const part = (y0, y1) => `<rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="url(#stG)"/><rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#000" filter="url(#stainD)" opacity=".28"/><rect x="${x0}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#5a2a12" filter="url(#wallI)" opacity=".2"/>` +
    `<path d="M${x0 + 15},${y0} V${y1} M${x0 + w - 15},${y0} V${y1}" stroke="#2f3843" stroke-width="2" opacity=".7"/><path d="M${x0 + 17},${y0} V${y1}" stroke="#fff" stroke-width="1.2" opacity=".25"/>`;
  s += part(yc, yB) + [840, 900, 960].map(y => `<circle cx="${x0 + 32}" cy="${y}" r="4.5" fill="#39424d"/><circle cx="${x0 + 31}" cy="${y - 1}" r="2" fill="#aeb8c4"/>`).join('');
  s += `<g transform="translate(${(14 * kf).toFixed(1)},${(252 * kf * kf).toFixed(1)}) rotate(${(90 * Math.min(1, kf * 1.25)).toFixed(1)},${x0 + w},${yc})">` + part(yT, yc) + `<rect x="${x0}" y="${yT}" width="${w}" height="5" fill="#fff" opacity=".3"/><rect x="${x0}" y="${yc - 5}" width="${w * kc}" height="5" fill="#ffb060" opacity="${cool.toFixed(2)}"/></g>`;
  if (kc > 0) s += `<rect x="${x0 - 2}" y="${yc - 9}" width="${(w * kc + 4).toFixed(1)}" height="18" rx="8" fill="#ff7a2a" opacity="${(.75 * cool).toFixed(2)}" filter="url(#blur5)"/><rect x="${x0}" y="${yc - 2.5}" width="${(w * kc).toFixed(1)}" height="5" fill="${mix('#8a3a1a', '#fff2b0', cool)}"/>`;
  return s;
}
function sceneLaser(t) {
  const st = S0(4) - .2, T = t - st, tB = WS(4, 0) + .12, tC = WS(4, 3) + .5, kc = ramp(t, tB + .25, tC), on = ease(ramp(t, tB, tB + .15)) * (1 - ease(ramp(t, tC + .05, tC + .3))), kf = ramp(t, tC + .1, tC + .85), cool = 1 - .8 * ease(ramp(t, tC + .3, tC + 3.2));
  let s = `<defs>${BDEF}</defs>` + streetS(t, { id: 'z', cars: 0 }) + [[470, 0, -1], [700, 3, -1], [330, 2, 1]].map(([x0, c, f], i) => { const x = x0 + f * 24 * T; return castSh(x, 1086 + i * 4, .52) + onWalk(x, 1086 + i * 4, CROWD[c], .52, f, t, { moving: 1, phase: t * 6 + i * 2, amp: .7 }); }).join('') + `<rect width="720" height="1280" fill="#0a1028" opacity=".58"/>`;
  s += steelCol(t, kc, kf, cool) + lbl(486, 1000, 'فولاذ', ease(ramp(t, st + .4, st + .8)), '#dfe6ee', 28) + (kf >= 1 ? (p => puff(668 - p * 30, 1040 - p * 10, 14 + p * 30, (1 - p) * .9) + puff(700 + p * 10, 1036 - p * 14, 12 + p * 26, (1 - p) * .8))(clamp((t - tC - .85) / .8)) : '');
  s += hero(250, 1634, { s: 2.88, face: 1, noShadow: 1, shade: 1, glow: Math.max(on, .25 * ease(ramp(t, st + .2, tB))) });
  const e = HP.eye, hxp = 548 + 64 * kc, hyp = 792, fl = .85 + .15 * Math.sin(t * 61);
  s += beam(e[0] + 4, e[1], hxp, hyp, on, 1.25, fl) + `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="${(34 * on).toFixed(1)}" fill="url(#redG)" opacity="${(.95 * on).toFixed(2)}"/>`;
  if (on > .05) { s += `<circle cx="${hxp.toFixed(1)}" cy="${hyp}" r="${(26 * fl).toFixed(1)}" fill="url(#goldG)" opacity="${on.toFixed(2)}"/><circle cx="${hxp.toFixed(1)}" cy="${hyp}" r="6" fill="#fff" opacity="${on.toFixed(2)}"/>`;
    const r = RS(21); for (let i = 0; i < 34; i++) { const ph = pmod(T * (1.6 + r() * 1.2) + r(), 1), a = Math.PI * (.62 + r() * .9), sp = 70 + r() * 150, px = hxp + Math.cos(a) * sp * ph, py = hyp + Math.sin(a) * sp * ph * .7 + 190 * ph * ph, vx = Math.cos(a) * sp, vy = Math.sin(a) * sp * .7 + 380 * ph, vl = Math.hypot(vx, vy) || 1, ln = 9 + r() * 12;
      s += `<path d="M${px.toFixed(1)},${py.toFixed(1)} l${(-vx / vl * ln).toFixed(1)},${(-vy / vl * ln).toFixed(1)}" stroke="${ph < .4 ? '#fff3c0' : '#ffb24a'}" stroke-width="${(2.6 * (1 - ph) + .6).toFixed(1)}" stroke-linecap="round" opacity="${(on * (1 - ph)).toFixed(2)}"/>`; } }
  // smoke from the cut and molten drops
  for (let i = 0; i < 5; i++) { const ph = pmod(T * .45 + i / 5, 1), a = clamp((t - tB - .4) / .5) * (1 - clamp((t - tC - 1.6) / 1.2)); s += `<circle cx="${(580 + Math.sin(i * 2.1 + ph * 4) * 14).toFixed(1)}" cy="${(780 - ph * 150).toFixed(1)}" r="${(10 + ph * 24).toFixed(1)}" fill="#b9b2ac" opacity="${(a * .32 * (1 - ph)).toFixed(2)}" filter="url(#blur5)"/>`; }
  for (let i = 0; i < 3; i++) { const q = t - (tB + .7 + i * .42); if (q > 0 && q < .7) s += `<ellipse cx="${556 + i * 17}" cy="${(796 + 440 * q * q).toFixed(1)}" rx="3" ry="${(4 + 8 * q).toFixed(1)}" fill="#ffc24a"/>`; }
  // power panel: the laser bar first, then x10, then the body
  const ap = ease(ramp(t, WS(4, 4) - .1, WS(4, 4) + .3)), kb = ease(ramp(t, WS(4, 5), WS(4, 7) + .25)), ax = ease(ramp(t, WS(4, 8) - .05, WS(4, 8) + .3)), ab = ease(ramp(t, WS(4, 11) - .1, WS(4, 11) + .3)), BX = 598;
  s += `<g opacity="${ap.toFixed(2)}">` + panel(372, 1046, 334, 190) + lbl(650, 1104, 'الليزر', 1, '#ffc2b8', 24) + `<rect x="${(BX - 196 * kb).toFixed(1)}" y="1078" width="${(196 * kb).toFixed(1)}" height="34" rx="6" fill="#e5483a"/><rect x="${(BX - 196 * kb).toFixed(1)}" y="1078" width="${(196 * kb).toFixed(1)}" height="9" rx="4" fill="#fff" opacity=".25"/>` + lbl(BX - 98, 1104, '١٬٠٠٠ واط', kb > .7 ? 1 : 0, '#fff', 24) +
    `<g opacity="${ab.toFixed(2)}">` + lbl(650, 1192, 'جسدُك', 1, '#ffe4a0', 24) + `<rect x="${BX - 19.6}" y="1166" width="19.6" height="34" rx="5" fill="#f4c76b"/>` + lbl(BX - 86, 1192, '١٠٠ واط', 1, '#f4c76b', 24) + `</g>` +
    `<g opacity="${ax.toFixed(2)}" transform="translate(432,1196) scale(${(1 + .25 * Math.sin(Math.PI * clamp((t - WS(4, 8)) / .5))).toFixed(3)})">` + lbl(0, 0, '×١٠', 1, '#f4c76b', 44) + `</g></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: invisible means light goes straight through your eyes too: nothing is absorbed by the retina, so you are blind ----------
function eyeInset(cx, cy, R, k, t, a) {
  if (a <= 0) return ''; const ex = cx + 8, ey = cy, vis = 1 - .8 * k;
  let s = `<g opacity="${a.toFixed(2)}"><defs><clipPath id="eyC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><radialGradient id="vitG"><stop offset="0" stop-color="#fbeee6"/><stop offset="1" stop-color="#f0d6c8"/></radialGradient></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${R + 5}" fill="#000" opacity=".35" filter="url(#blur5)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#0b1024"/><g clip-path="url(#eyC)">`;
  // the eye in section, light coming from the left
  s += `<g opacity="${vis.toFixed(2)}"><path d="M${ex + 70},${ey - 6} L${ex + 150},${ey + 14} L${ex + 150},${ey + 44} L${ex + 66},${ey + 20}Z" fill="#e3bf8e"/><path d="M${ex + 70},${ey + 4} L${ex + 150},${ey + 26}" stroke="#b98a5a" stroke-width="2" fill="none"/>` +
    `<circle cx="${ex}" cy="${ey}" r="80" fill="#f6f1e8"/><circle cx="${ex}" cy="${ey}" r="80" fill="none" stroke="#cfc4b2" stroke-width="2.5"/><circle cx="${ex}" cy="${ey}" r="70" fill="url(#vitG)"/>` +
    `<path d="M${(ex + 70 * Math.cos(-2.15)).toFixed(1)},${(ey + 70 * Math.sin(-2.15)).toFixed(1)} A70,70 0 1 1 ${(ex + 70 * Math.cos(2.15)).toFixed(1)},${(ey + 70 * Math.sin(2.15)).toFixed(1)}" fill="none" stroke="#7a1f16" stroke-width="11"/><path d="M${(ex + 68 * Math.cos(-2.15)).toFixed(1)},${(ey + 68 * Math.sin(-2.15)).toFixed(1)} A68,68 0 1 1 ${(ex + 68 * Math.cos(2.15)).toFixed(1)},${(ey + 68 * Math.sin(2.15)).toFixed(1)}" fill="none" stroke="#e0563a" stroke-width="6"/>` +
    `<path d="M${ex - 62},${ey - 50} Q${ex - 112},${ey} ${ex - 62},${ey + 50}" fill="#d6ecf8" opacity=".85" stroke="#8fb9d2" stroke-width="2.5"/>` +
    `<path d="M${ex - 60},${ey - 52} L${ex - 52},${ey - 17} L${ex - 60},${ey - 15} L${ex - 68},${ey - 48}Z M${ex - 60},${ey + 52} L${ex - 52},${ey + 17} L${ex - 60},${ey + 15} L${ex - 68},${ey + 48}Z" fill="#6b4a2a"/>` +
    `<ellipse cx="${ex - 42}" cy="${ey}" rx="14" ry="31" fill="#eaf6fc" stroke="#8fb9d2" stroke-width="2.5"/><ellipse cx="${ex - 46}" cy="${ey - 8}" rx="4" ry="12" fill="#fff" opacity=".7"/></g>`;
  s += `<circle cx="${ex}" cy="${ey}" r="80" fill="none" stroke="#dff2ff" stroke-width="2.5" stroke-dasharray="7 7" opacity="${(.85 * k).toFixed(2)}"/><path d="M${ex - 62},${ey - 50} Q${ex - 112},${ey} ${ex - 62},${ey + 50}" fill="none" stroke="#dff2ff" stroke-width="2.5" stroke-dasharray="7 7" opacity="${(.85 * k).toFixed(2)}"/>`;
  // three rays: focused on the retina (normal) or straight through (invisible)
  [-15, 0, 15].forEach((o, i) => { const x0 = cx - R - 4, xl = ex - 42, fx = lerp(ex + 66, cx + R + 10, k), fy = lerp(ey, ey + o, k), d = `M${x0},${ey + o} L${xl},${ey + o} L${fx.toFixed(1)},${fy.toFixed(1)}`;
    s += `<path d="${d}" stroke="#f4c76b" stroke-width="6" fill="none" opacity=".25" stroke-linejoin="round"/><path d="${d}" stroke="#ffe7a8" stroke-width="2.6" fill="none" stroke-dasharray="14 9" stroke-dashoffset="${(-t * 90).toFixed(1)}" stroke-linejoin="round"/>`; });
  s += `<circle cx="${ex + 66}" cy="${ey}" r="${(13 + 2 * Math.sin(t * 7)).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - k).toFixed(2)}"/></g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="4"/>`;
  return s + `</g>`;
}
function sceneGhost(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 1) + .1, WS(5, 3) + .35)), tD = WS(5, 11), kd = ease(ramp(t, tD - .05, tD + .7)), GY = 1124;
  const slow = 1 - .85 * ease(ramp(t, tD - .4, tD + .2)), xw = 236 + 24 * Math.min(T, tD - st) + 6 * clamp((t - tD) / 1.2), ph = 6 * (Math.min(t, tD) + .15 * Math.max(0, t - tD)), grope = ease(ramp(t, tD - .2, tD + .4));
  let s = `<defs>${BDEF}</defs>` + zoomG(streetS(t, { id: 'g', cars: 0, trees: [[566, 268, 5]], lamps: [28, 694] }) + car(pmod(520 + T * 85, 1300) - 200, 1256, .9, '#a83a2a', 1, 0) + castSh(640 - 20 * T, 1084, .5) + onWalk(640 - 20 * T, 1084, CROWD[3], .5, -1, t, { moving: 1, phase: t * 6, amp: .7 }), 1.5, 330, 1098, 330, GY);
  // sunlight: rays cross the head and carry on
  const ar = ease(ramp(t, WS(5, 4) - .2, WS(5, 4) + .3)) * (1 - kd), base = { s: .93, face: 1, walk: ph, amp: .55 * slow + .1, noShadow: 1 };
  if (grope > 0) { hero(xw, GY, base); const h0 = HP.hand, h1 = HP.handB; base.hF = [lerp(h0[0], xw + 92, grope), lerp(h0[1], GY - 196 + Math.sin(t * 5) * 10, grope)]; base.hB = [lerp(h1[0], xw + 80, grope), lerp(h1[1], GY - 170 + Math.cos(t * 4.3) * 12, grope)]; }
  const body = hero(xw, GY, base), hd = HP.head;
  let rays = ''; [-20, 0, 20].forEach((o, i) => { const dx = .86, dy = .51, nx = -dy * o, ny = dx * o, x0 = hd[0] + nx - dx * 700, y0 = hd[1] + ny - dy * 700, x1 = hd[0] + nx + dx * 420, y1 = hd[1] + ny + dy * 420;
    rays += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#ffe9a8" stroke-width="11" opacity=".13"/><path d="M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}" stroke="#fff3c8" stroke-width="1.8" opacity=".75"/>`;
    for (let j = 0; j < 7; j++) { const p = pmod(t * .55 + j / 7 + i * .09, 1); rays += `<circle cx="${lerp(x0, x1, p).toFixed(1)}" cy="${lerp(y0, y1, p).toFixed(1)}" r="4.2" fill="#fff6d8" opacity="${(.95 * Math.sin(p * Math.PI)).toFixed(2)}"/>`; } });
  s += `<g opacity="${(ar * k).toFixed(2)}">${rays}</g>`;
  s += `<rect width="720" height="1280" fill="#02030a" opacity="${(.9 * kd).toFixed(2)}"/>`;
  s += `<g opacity="${(1 - k).toFixed(2)}">` + castSh(xw, GY, .93) + body + `</g><g opacity="${k.toFixed(2)}" filter="url(#ghostF)">${body}</g>`;
  // the eye, in section
  const ai = ease(ramp(t, WS(5, 4) - .35, WS(5, 4) + .05)), ke = ease(ramp(t, WS(5, 5), WS(5, 6) + .3)), CX = 214, CY = 590, R = 138;
  s += `<path d="M${CX + 70},${CY + 118} L${(hd[0] + 6).toFixed(1)},${(hd[1] - 30).toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="4 7" opacity="${(ai * .9).toFixed(2)}"/>` + eyeInset(CX, CY, R, ke, t, ai) +
    lbl(CX, CY + R + 40, 'عينٌ عاديّة: الضوءُ يتوقّفُ هنا', ai * (1 - ease(ramp(ke, .2, .5))), '#fff', 23) + lbl(CX, CY + R + 40, 'عينٌ شفّافة: الضوءُ يعبُرُها', ai * ease(ramp(ke, .5, .8)), '#ffe4a0', 23);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: eight billion super-jumpers at once move the Earth by less than the width of an atom ----------
const CITIES = [[35.7, 139.7], [28.6, 77.2], [31.2, 121.5], [-23.5, -46.6], [19.4, -99.1], [30, 31.2], [19.1, 72.9], [39.9, 116.4], [23.8, 90.4], [34.7, 135.5], [40.7, -74], [24.9, 67], [-34.6, -58.4], [29.6, 106.5], [41, 29], [22.6, 88.4], [14.6, 121], [6.5, 3.4], [-22.9, -43.2], [-4.3, 15.3], [23.1, 113.3], [34, -118.2], [55.8, 37.6], [31.5, 74.3], [13, 77.6], [48.9, 2.3], [4.7, -74.1], [-6.2, 106.8], [13.1, 80.3], [-12, -77], [13.8, 100.5], [37.6, 127], [17.4, 78.5], [51.5, -.1], [35.7, 51.4], [41.9, -87.6], [30.6, 104.1], [30.6, 114.3], [10.8, 106.7], [-8.8, 13.2], [23, 72.6], [3.1, 101.7], [34.3, 108.9], [24.7, 46.7], [33.3, 44.4], [-33.4, -70.7], [40.4, -3.7], [43.7, -79.4], [-6.8, 39.3], [-26.2, 28], [15.5, 32.6], [1.35, 103.8], [-33.9, 151.2], [-1.3, 36.8], [9, 38.7], [33.6, -7.6], [36.8, 3.1], [12, 8.5], [5.3, -4], [5.6, -.2], [52.5, 13.4], [41.9, 12.5], [50.5, 30.5], [41.3, 69.2], [34.5, 69.2], [16.8, 96.2], [21, 105.8], [-37.8, 145], [25.3, 51.5], [21.5, 39.2], [36.2, 37.2], [33.5, 36.3], [31.9, 35.9], [15.4, 44.2], [9.1, 7.5], [14.7, -17.4], [-15.4, 28.3], [-18.9, 47.5], [-25.9, 32.6], [0.3, 32.6], [12.6, -8], [45.5, -73.6], [29.8, -95.4], [25.8, -80.2], [10.5, -66.9], [-0.2, -78.5], [-16.5, -68.1], [59.3, 18.1], [52.2, 21], [44.4, 26.1], [38, 23.7], [27.7, 85.3], [6.9, 79.9], [22.3, 114.2], [25, 121.5], [43.2, 76.9], [47.9, 106.9], [-36.8, 174.8], [64.1, -21.9], [61.2, -149.9]];
const SPK = (() => { const r = RS(88), o = []; CITIES.forEach(([la, lo], i) => { o.push([la, lo, 1, r()]); const n = i < 46 ? 3 : 1; for (let q = 0; q < n; q++) o.push([la + (r() - .5) * 9, lo + (r() - .5) * 11, .6, r()]); }); return o; })();
function atomSvg(x, y, R, t) {
  let s = `<defs><radialGradient id="atG"><stop offset="0" stop-color="#cfe0ff" stop-opacity="1"/><stop offset=".35" stop-color="#6f95f0" stop-opacity=".75"/><stop offset=".8" stop-color="#5a4fd0" stop-opacity=".3"/><stop offset="1" stop-color="#4b3fb8" stop-opacity="0"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${R}" fill="url(#atG)"/>`;
  const r = RS(5); for (let i = 0; i < 70; i++) { const a = r() * 6.283 + t * (.3 + r() * .5) * (i % 2 ? 1 : -1), d = Math.pow(r(), .7) * R * .92; s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${(.8 + r() * 1.3).toFixed(1)}" fill="#dbe8ff" opacity="${(.2 + .5 * (1 - d / R)).toFixed(2)}"/>`; }
  return s + [[-3, -2, '#ff7a6a'], [3, -1, '#8ab4ff'], [0, 3, '#ff7a6a'], [-1, -5, '#8ab4ff']].map(([dx, dy, c]) => `<circle cx="${x + dx}" cy="${y + dy}" r="3.6" fill="${c}"/>`).join('') + `<circle cx="${x - 1}" cy="${y - 2}" r="9" fill="#fff" opacity=".25" filter="url(#blur2)"/>`;
}
function globeCam(t, o = {}) { return orbit(o.d || 10.4, o.el ?? .32, (o.az ?? .25) + t * .02, o.tg || [0, .09, 0]); }
const sunFor = (az, off = -.6, up = .5) => [Math.sin(az + off), up, Math.cos(az + off)];
function sceneGlobe(t) {
  const st = S0(6) - .2, T = t - st, cam = globeCam(t), spin = 4.2 + t * .03, Ld = sunFor(.25 + t * .02), tJ = WS(6, 6) - .05, u = (t - tJ) / 1.15, hop = u > 0 && u < 1 ? Math.sin(Math.PI * u) : 0;
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: .45 } };
  const cN = Math.hypot(...cam.pos), ln = Math.hypot(...Ld), c0 = proj3(cam, [0, 0, 0]), Rpx = c0[2] / Math.sqrt(1 - 1 / (cN * cN)) * 1;
  let o = `<defs>${SDEF}${BDEF}</defs>`, dots = '';
  SPK.forEach(([la, lo, sz, rr], i) => { const P = geo3(la, lo, spin), fr = (P[0] * cam.pos[0] + P[1] * cam.pos[1] + P[2] * cam.pos[2]) / cN, vis = clamp((fr - .12) / .25), ap = ease(ramp(t, WS(6, 1) + rr * 1.2, WS(6, 1) + rr * 1.2 + .3)); if (vis <= 0 || ap <= 0) return;
    const hh = 1.004 + .06 * hop * (.7 + .6 * rr), a = proj3(cam, P), b = proj3(cam, [P[0] * hh, P[1] * hh, P[2] * hh]), lit = clamp(.55 + .45 * (P[0] * Ld[0] + P[1] * Ld[1] + P[2] * Ld[2]) / ln * 2), al = vis * ap * lit;
    if (hop > .02) dots += `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}" stroke="#f4c76b" stroke-width="${(1.6 * sz).toFixed(1)}" opacity="${(al * .55).toFixed(2)}" stroke-linecap="round"/>`;
    dots += `<circle cx="${b[0].toFixed(1)}" cy="${b[1].toFixed(1)}" r="${(2.5 * sz + 1.4 * hop).toFixed(1)}" fill="#ffe9a8" opacity="${al.toFixed(2)}"/>`; });
  o += `<g filter="url(#blur2)" opacity=".8">${dots}</g>` + dots;
  // a fixed reference circle: the Earth stays exactly inside it
  const ac = ease(ramp(t, WS(6, 7) - .1, WS(6, 7) + .4)); o += `<circle cx="${c0[0].toFixed(1)}" cy="${c0[1].toFixed(1)}" r="${(Rpx + 12).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="3 10" stroke-linecap="round" opacity="${(ac * .85).toFixed(2)}"/>`;
  // inset: the shift next to one atom
  const ai = ease(ramp(t, WS(6, 9), WS(6, 9) + .4)), PX = 74, PY = 1000;
  const ad = ease(ramp(t, WS(6, 11) - .1, WS(6, 11) + .3));
  o += `<g opacity="${ai.toFixed(2)}">` + panel(PX, PY, 572, 206) + atomSvg(PX + 462, PY + 96, 80, t) + lbl(PX + 462, PY + 196, 'ذرّةٌ واحدة', 1, '#cfd8ff', 22) +
    `<path d="M${PX + 44},${PY + 62} h160 M${PX + 44},${PY + 52} v20 M${PX + 204},${PY + 52} v20" stroke="#dfe6ff" stroke-width="3" fill="none"/>` + lbl(PX + 290, PY + 70, 'عرضُ الذرّة', 1, '#dfe6ff', 24) +
    `<g opacity="${ad.toFixed(2)}"><path d="M${PX + 44},${PY + 140} h16 M${PX + 44},${PY + 128} v24 M${PX + 60},${PY + 128} v24" stroke="#f4c76b" stroke-width="4" fill="none"/>` + lbl(PX + 190, PY + 149, 'إزاحةُ الأرض', 1, '#f4c76b', 30) + `</g></g>`;
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// ---------- 7: the twist. You already are super: 86 billion neurons running on about 20 W, less than a small light bulb ----------
function brainSvg(cx, cy, rx, ry, t, k) {
  if (k <= 0) return ''; const r = RS(31);
  const out = `M${cx - rx},${cy + ry * .1} C${cx - rx * 1.02},${cy - ry * .75} ${cx - rx * .45},${cy - ry * 1.08} ${cx + rx * .1},${cy - ry} C${cx + rx * .7},${cy - ry * .95} ${cx + rx * 1.04},${cy - ry * .35} ${cx + rx},${cy + ry * .2} C${cx + rx * .96},${cy + ry * .6} ${cx + rx * .55},${cy + ry * .7} ${cx + rx * .2},${cy + ry * .62} C${cx - rx * .1},${cy + ry * .95} ${cx - rx * .55},${cy + ry * .78} ${cx - rx * .62},${cy + ry * .55} C${cx - rx * .9},${cy + ry * .6} ${cx - rx},${cy + ry * .4} ${cx - rx},${cy + ry * .1}Z`;
  let s = `<g opacity="${k.toFixed(2)}"><defs><radialGradient id="brG" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#ffd0c8"/><stop offset=".6" stop-color="#ec9c98"/><stop offset="1" stop-color="#c26a72"/></radialGradient><clipPath id="brC"><path d="${out}"/></clipPath></defs>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.5}" ry="${ry * 1.55}" fill="url(#goldG)" opacity=".5"/>` +
    // cerebellum and brain stem behind
    `<path d="M${cx - rx * .2},${cy + ry * .5} C${cx - rx * .15},${cy + ry * 1.0} ${cx - rx * .05},${cy + ry * 1.5} ${cx + rx * .02},${cy + ry * 1.75} L${cx + rx * .2},${cy + ry * 1.7} C${cx + rx * .12},${cy + ry * 1.3} ${cx + rx * .1},${cy + ry * .9} ${cx + rx * .12},${cy + ry * .5}Z" fill="#d9a09a"/>` +
    `<ellipse cx="${cx - rx * .52}" cy="${cy + ry * .78}" rx="${rx * .36}" ry="${ry * .34}" fill="#d48a84"/>` + [-.2, -.08, .04, .16].map(d => `<path d="M${cx - rx * .86},${cy + ry * (.78 + d)} Q${cx - rx * .52},${cy + ry * (.72 + d)} ${cx - rx * .18},${cy + ry * (.8 + d)}" stroke="#a65a5e" stroke-width="2" fill="none"/>`).join('') +
    `<path d="${out}" fill="url(#brG)" stroke="#a65a62" stroke-width="3"/><g clip-path="url(#brC)">`;
  // folds: wavy arcs that follow the outline
  for (let i = 0; i < 7; i++) { const q = .2 + i * .125, n = 26; let d = '';
    for (let j = 0; j <= n; j++) { const th = -Math.PI * 1.08 + j / n * Math.PI * 1.16 + (i % 2) * .08, wob = 1 + .075 * Math.sin(j * 1.9 + i * 2.3) + .04 * Math.sin(j * 4.1 + i), px = cx + Math.cos(th) * rx * q * wob * 1.08 + rx * .06, py = cy + ry * .28 + Math.sin(th) * ry * q * wob * 1.25; d += (j ? ' L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1); }
    s += `<path d="${d}" stroke="#a8545e" stroke-width="3.4" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity=".75"/><path d="${d}" stroke="#ffd9d2" stroke-width="1.4" fill="none" stroke-linejoin="round" opacity=".55" transform="translate(-1.5,-2)"/>`; }
  for (let i = 0; i < 12; i++) { const a = -Math.PI * (.08 + .92 * r()), d0 = .25 + r() * .5, x0 = cx + Math.cos(a) * rx * d0, y0 = cy + ry * .2 + Math.sin(a) * ry * d0 * 1.1; s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} q${((r() - .5) * 26).toFixed(1)},${(-8 - r() * 12).toFixed(1)} ${((r() - .5) * 30).toFixed(1)},${(-18 - r() * 16).toFixed(1)}" stroke="#a8545e" stroke-width="2.6" fill="none" stroke-linecap="round" opacity=".6"/>`; }
  s += `<path d="${out}" fill="none" stroke="#000" stroke-width="16" opacity=".12"/>`;
  // neurons firing
  const N = []; for (let i = 0; i < 44; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * .82; N.push([cx + Math.cos(a) * rx * d, cy - ry * .05 + Math.sin(a) * ry * d * .82, r()]); }
  N.forEach((p, i) => { const j = (i * 7 + 3) % N.length, q = N[j], dd = Math.hypot(p[0] - q[0], p[1] - q[1]); if (dd < rx * .75) { const ph = pmod(t * (.9 + p[2]) + p[2] * 3, 1); s += `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} L${q[0].toFixed(1)},${q[1].toFixed(1)}" stroke="#fff3c0" stroke-width="1.2" opacity=".28"/><circle cx="${lerp(p[0], q[0], ph).toFixed(1)}" cy="${lerp(p[1], q[1], ph).toFixed(1)}" r="2.6" fill="#fff" opacity="${Math.sin(ph * Math.PI).toFixed(2)}"/>`; } });
  N.forEach(p => { const fl = .5 + .5 * Math.sin(t * (4 + p[2] * 7) + p[2] * 20); s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(2 + 2.4 * fl).toFixed(1)}" fill="#ffe9a8" opacity="${(.45 + .5 * fl).toFixed(2)}"/>`; });
  return s + `</g></g>`;
}
function bulb(x, y, k, t) {
  const glassC = mix('#cdd6e0', '#fff0b8', k);
  return `<circle cx="${x}" cy="${y}" r="${(70 + 4 * Math.sin(t * 5)).toFixed(1)}" fill="url(#goldG)" opacity="${(.75 * k).toFixed(2)}"/>` +
    `<path d="M${x - 17},${y + 40} C${x - 20},${y + 22} ${x - 44},${y + 8} ${x - 44},${y - 16} A44,44 0 1 1 ${x + 44},${y - 16} C${x + 44},${y + 8} ${x + 20},${y + 22} ${x + 17},${y + 40}Z" fill="${glassC}" opacity="${(.42 + .5 * k).toFixed(2)}" stroke="#eef3f8" stroke-width="2.5"/>` +
    `<path d="M${x - 9},${y + 38} L${x - 12},${y + 2} L${x - 5},${y - 8} L${x},${y + 2} L${x + 5},${y - 8} L${x + 12},${y + 2} L${x + 9},${y + 38}" fill="none" stroke="${mix('#6a5a48', '#ffffff', k)}" stroke-width="2.6" stroke-linejoin="round"/>` +
    `<path d="M${x - 30},${y - 34} Q${x - 22},${y - 50} ${x - 6},${y - 54}" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>` +
    `<rect x="${x - 18}" y="${y + 40}" width="36" height="30" rx="4" fill="#9aa2ac"/>` + [0, 1, 2].map(i => `<path d="M${x - 18},${y + 48 + i * 8} l36,4" stroke="#5b636d" stroke-width="2.4"/>`).join('') + `<rect x="${x - 18}" y="${y + 40}" width="10" height="30" rx="4" fill="#fff" opacity=".28"/><path d="M${x - 9},${y + 70} h18 l-4,9 h-10Z" fill="#3c424a"/>`;
}
function sceneBrain(t) {
  const st = S0(7) - .2, T = t - st, kb = ease(ramp(t, WS(7, 4) - .1, WS(7, 5) + .4)), kc = ease(ramp(t, WS(7, 6) - .1, WS(7, 10) + .3)), kl = ease(ramp(t, WS(7, 12), WS(7, 14) + .2)), aura = ease(ramp(t, WS(7, 1), WS(7, 3)));
  let s = `<defs>${BDEF}</defs>` + streetS(t, { id: 'b' }) + `<rect width="720" height="1280" fill="#070b1c" opacity=".8"/>`;
  const HXc = 300, HYc = 742, S = 5.2;
  s += `<ellipse cx="${HXc}" cy="${HYc + 10}" rx="${200 + 6 * Math.sin(t * 3)}" ry="${236 + 6 * Math.sin(t * 3)}" fill="url(#goldG)" opacity="${(.34 * aura).toFixed(2)}"/>`;
  s += hero(HXc - 6 * S, HYc + 296 * S, { s: S, face: 1, noShadow: 1, shade: 1 });
  // an x-ray window into the head, then the brain
  s += `<ellipse cx="${HXc - 26}" cy="${HYc - 52}" rx="100" ry="76" fill="#160c2a" opacity="${(.62 * kb).toFixed(2)}" filter="url(#blur5)"/>` + brainSvg(HXc - 22, HYc - 60, 90, 61, t, kb);
  s += lbl(HXc, 540, `${AR(Math.round(86 * kc))} مليار خليّة عصبيّة`, ease(ramp(t, WS(7, 6) - .1, WS(7, 6) + .3)), '#ffe4a0', 36);
  // the 20 W bulb, fed from the brain
  const ab = ease(ramp(t, WS(7, 11) - .2, WS(7, 11) + .3)), BX = 566, BY = 800;
  let wire = `M${HXc + 52},${HYc - 70} C${HXc + 150},${HYc - 150} ${BX - 30},${BY - 170} ${BX},${BY - 62}`;
  s += `<g opacity="${ab.toFixed(2)}"><path d="${wire}" stroke="#f4c76b" stroke-width="3" fill="none" stroke-dasharray="3 9" stroke-linecap="round" stroke-dashoffset="${(-t * 40).toFixed(1)}"/>` + bulb(BX, BY, kl, t) + lbl(BX, BY + 122, '٢٠ واط', kl, '#f4c76b', 36) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: CTA ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  const az = .3 + (t - S0(8)) * .04; F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneLift }, { s: S0(2) - .2, f: scenePush }, { s: S0(3) - .2, f: sceneJump }, { s: S0(4) - .2, f: sceneLaser },
  { s: S0(5) - .2, f: sceneGhost }, { s: S0(6) - .2, f: sceneGlobe }, { s: S0(7) - .2, f: sceneBrain }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneLift, scenePush, sceneJump, sceneLaser, sceneGhost, sceneGlobe, sceneBrain]);
const XF = .5;
const TLI = [['قوّةٌ هائلة', S0(1)], ['قفزةٌ عملاقة', S0(3)], ['أشعّةُ العيون', S0(4)], ['الاختفاء', S0(5)]];
const LIST_ON = new Set([sceneLift, scenePush, sceneJump, sceneLaser, sceneGhost]);
const CHIPS = [
  ['c1', 'الفيزياءُ لا تتغيّر', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', 'لكلِّ فعلٍ ردُّ فعل', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'أكثرُ من ٨٠ كم/س', 360, 330, 'red', WS(3, 11), S0(4) - .3],
  ['c4', '١٠ أضعافِ قدرةِ جسدِك', 360, 330, 'big', WS(4, 8), S0(5) - .3],
  ['c5', 'أعمى', 360, 330, 'red', WS(5, 12), S0(6) - .3],
  ['c6', '٨ مليارات قفزة', 360, 330, 'big', WS(6, 2), WS(6, 7) - .1],
  ['c7', 'أقلُّ من عرضِ ذرّة', 360, 330, 'big', WS(6, 11), S0(7) - .3],
  ['c8', 'أنت خارقٌ فعلاً', 360, 330, 'big', WS(7, 2), S0(8) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">قوى خارقة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
