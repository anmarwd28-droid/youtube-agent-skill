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
const orbit = (d, el, az, tg = [0, .3, 0], fov = 30) => ({ pos: [tg[0] + d * Math.sin(az) * Math.cos(el), tg[1] + d * Math.sin(el), tg[2] + d * Math.cos(az) * Math.cos(el)], look: tg, fov });
function proj3(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 640 / Math.tan(c.fov * Math.PI / 360);
  return [360 + dot(d, r) / z * fp, 640 - dot(d, u) / z * fp, fp / z]; }
function geo3(lat, lon, spin, h = 1) { const la = lat * Math.PI / 180, lo = lon * Math.PI / 180, x = Math.cos(la) * Math.sin(lo), y = -Math.cos(la) * Math.cos(lo), z = Math.sin(la), c = Math.cos(spin), s = Math.sin(spin);
  return [(x * c - y * s) * h, z * h, -(x * s + y * c) * h]; }
const BDEF = `<filter id="blurU" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1400" height="1900"><feGaussianBlur stdDeviation="5"/></filter>`;
const CITIES = [[35.7, 139.7], [28.6, 77.2], [31.2, 121.5], [-23.5, -46.6], [19.4, -99.1], [30, 31.2], [19.1, 72.9], [39.9, 116.4], [23.8, 90.4], [34.7, 135.5], [40.7, -74], [24.9, 67], [-34.6, -58.4], [29.6, 106.5], [41, 29], [22.6, 88.4], [14.6, 121], [6.5, 3.4], [-22.9, -43.2], [-4.3, 15.3], [23.1, 113.3], [34, -118.2], [55.8, 37.6], [31.5, 74.3], [13, 77.6], [48.9, 2.3], [4.7, -74.1], [-6.2, 106.8], [13.1, 80.3], [-12, -77], [13.8, 100.5], [37.6, 127], [17.4, 78.5], [51.5, -.1], [35.7, 51.4], [41.9, -87.6], [30.6, 104.1], [30.6, 114.3], [10.8, 106.7], [-8.8, 13.2], [23, 72.6], [3.1, 101.7], [34.3, 108.9], [24.7, 46.7], [33.3, 44.4], [-33.4, -70.7], [40.4, -3.7], [43.7, -79.4], [-6.8, 39.3], [-26.2, 28], [15.5, 32.6], [1.35, 103.8], [-33.9, 151.2], [-1.3, 36.8], [9, 38.7], [33.6, -7.6], [36.8, 3.1], [12, 8.5], [5.3, -4], [5.6, -.2], [52.5, 13.4], [41.9, 12.5], [50.5, 30.5], [41.3, 69.2], [34.5, 69.2], [16.8, 96.2], [21, 105.8], [-37.8, 145], [25.3, 51.5], [21.5, 39.2], [36.2, 37.2], [33.5, 36.3], [31.9, 35.9], [15.4, 44.2], [9.1, 7.5], [14.7, -17.4], [-15.4, 28.3], [-18.9, 47.5], [-25.9, 32.6], [0.3, 32.6], [12.6, -8], [45.5, -73.6], [29.8, -95.4], [25.8, -80.2], [10.5, -66.9], [-0.2, -78.5], [-16.5, -68.1], [59.3, 18.1], [52.2, 21], [44.4, 26.1], [38, 23.7], [27.7, 85.3], [6.9, 79.9], [22.3, 114.2], [25, 121.5], [43.2, 76.9], [47.9, 106.9], [-36.8, 174.8], [64.1, -21.9], [61.2, -149.9]];
const SPK = (() => { const r = RS(88), o = []; CITIES.forEach(([la, lo], i) => { o.push([la, lo, 1, r()]); const n = i < 46 ? 3 : 1; for (let q = 0; q < n; q++) o.push([la + (r() - .5) * 9, lo + (r() - .5) * 11, .6, r()]); }); return o; })();
function globeCam(t, o = {}) { return orbit(o.d || 10.4, o.el ?? .32, (o.az ?? .25) + t * .02, o.tg || [0, .09, 0]); }
const sunFor = (az, off = -.6, up = .5) => [Math.sin(az + off), up, Math.cos(az + off)];
// ===================== "what if a global nuclear war broke out?" (Short #30) =====================
const gl = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * .03, Ld = sunFor((o.az ?? .25) + t * .02), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]); F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; return { cam, spin, cN, c0, R: c0[2] / Math.sqrt(1 - 1 / (cN * cN)) }; };
const vis3 = (g, P) => clamp(((P[0] * g.cam.pos[0] + P[1] * g.cam.pos[1] + P[2] * g.cam.pos[2]) / g.cN - .1) / .25);
const ARCS = (() => { const r = RS(12), o = []; for (let i = 0; i < 26; i++) { const a = Math.floor(r() * 60), b = (a + 7 + Math.floor(r() * 40)) % 70; o.push([a, b, r()]); } return o; })();
function arcs(g, t, t0, dur) {
  let s = '';
  ARCS.forEach(([a, b, rr], i) => { const st = t0 + rr * dur, k = clamp((t - st) / 1.3); if (k <= 0) return; const A = geo3(CITIES[a][0], CITIES[a][1], g.spin), B = geo3(CITIES[b][0], CITIES[b][1], g.spin); let d = '', last = null, n = 0;
    for (let j = 0; j <= 24 * k; j++) { const u = j / 24, h = 1 + .22 * Math.sin(Math.PI * u), P = [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u], L = Math.hypot(...P), Q = P.map(x => x / L * h); if (vis3(g, Q) <= 0) { d += ' '; n = 0; continue; } const p = proj3(g.cam, Q); d += (n ? ' L' : ' M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); n++; last = p; }
    if (d.trim()) s += `<path d="${d}" stroke="#ffb24a" stroke-width="2.2" fill="none" stroke-opacity="${(.85 * (1 - clamp((t - st - 1.6) / 1.2))).toFixed(2)}"/>`;
    if (k < 1 && last) s += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.5" fill="#fff"/>`;
    if (k >= 1 && vis3(g, B) > 0) { const p = proj3(g.cam, B), f = clamp((t - st - 1.3) / 1.6); s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(6 + 22 * f).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - f * .7).toFixed(2)}"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(3 + 3 * (1 - f)).toFixed(1)}" fill="#fff" opacity="${(1 - f * .5).toFixed(2)}"/>`; } });
  return s;
}
function sceneHook(t) { const g = gl(t); F.ov = `<defs>${SDEF}</defs>` + arcs(g, t, .1, 1.6); F.earth = null; F.moon = null; F.sun = null; return space(t); }
// 1: more than 12,000 warheads
function sceneCount(t) {
  const g = gl(t), k = ease(ramp(t, WS(1, 3), WS(1, 9) + .2)); let o = `<defs>${SDEF}</defs>` + arcs(g, t, .1, 1.6) + arcs(g, t + 40, WS(1, 10) + 39.6, 1.4), r = RS(3);
  o += panel(150, 1010, 420, 180) + lbl(360, 1062, 'رؤوسٌ نوويّة في العالم', 1, '#cfd8ff', 24) + lbl(360, 1146, `+${AR(Math.round(12000 * k))}`, 1, '#ff7a5a', 60);
  for (let i = 0; i < 120 * k; i++) { const x = 60 + (i % 20) * 31.5, y = 1220 + Math.floor(i / 20) * 9; o += `<rect x="${x}" y="${y}" width="20" height="5" rx="2" fill="#ff7a5a" opacity=".8"/>`; }
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
function mushroom(x, y, k, t) {
  const h = 360 * k, cw = 110 + 80 * k, cy = y - h;
  return `<g filter="url(#cloudF)"><path d="M${x - 36 - 20 * k},${y} C${x - 20},${y - h * .4} ${x - 46},${y - h * .7} ${x - 30},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#8a6a52"/><path d="M${x - 10},${y} C${x},${y - h * .5} ${x - 14},${y - h * .8} ${x},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#4a3a30" opacity=".6"/>` +
    `<ellipse cx="${x}" cy="${y - 10}" rx="${120 + 160 * k}" ry="${26 + 20 * k}" fill="#9a8672"/>` +
    [[0, 0, 1, '#b08060'], [-.5, .12, .62, '#96705a'], [.5, .12, .62, '#7a5a4a'], [-.2, -.2, .7, '#e0a060'], [.15, -.26, .55, '#ffcf80']].map(([dx, dy, s, c]) => `<ellipse cx="${x + dx * cw}" cy="${cy + dy * cw}" rx="${cw * s}" ry="${cw * s * .52}" fill="${c}"/>`).join('') + `<ellipse cx="${x}" cy="${cy + cw * .28}" rx="${cw * .8}" ry="${cw * .16}" fill="#3a2a24" opacity=".5"/></g>`;
}
// different places around the world (same drawn style): 0 street by day, 1 street at night, 2 coast, 3 snowy mountain city, 4 desert city, 5 river city at dusk
function place(t, v, dk = 0) {
  const sk = (a, b, c) => `<defs>${DEFB()}${BDEF}<linearGradient id="pk${v}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(a, '#1a1412', dk)}"/><stop offset=".6" stop-color="${mix(b, '#5a3a2a', dk)}"/><stop offset="1" stop-color="${mix(c, '#c8643a', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#pk${v})"/>`;
  if (v === 0) return { s: streetS(t, { id: 'p0', sky: [mix('#3a6fb8', '#1a1412', dk), mix('#93bbe2', '#5a3a2a', dk), mix('#ebe3d0', '#c8643a', dk)] }), gy: 900, sc: 1 };
  if (v === 1) return { s: streetS(t, { id: 'p1', cars: 0, sky: [mix('#070b24', '#1a1412', dk), mix('#1a2450', '#5a3a2a', dk), mix('#3a3a66', '#c8643a', dk)] }) + `<rect width="720" height="1280" fill="#060a20" opacity=".5"/>` + stars(.8 * (1 - dk), t) + [28, 250, 694].map(x => `<circle cx="${x + 18}" cy="838" r="110" fill="url(#lampG)" opacity=".7"/>`).join(''), gy: 900, sc: 1 };
  if (v === 2) { let s = sk('#2a5a9a', '#8ab4d8', '#f0d8b0') + cumulus(180, 420, 220, 4, { a: .85 }) + farCity(41, 850, '#7a8aa0', { hk: 1.3 }) + `<rect y="850" width="720" height="430" fill="${mix('#2a6a9a', '#3a2a24', dk)}"/><rect y="850" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
    for (let i = 0; i < 26; i++) { const z = i / 25, y = 862 + z * z * 400; s += `<path d="M${pmod(i * 173 + t * 20 * (i % 2 ? 1 : -1), 760) - 30},${y} q${20 + 40 * z},${-3 - 5 * z} ${40 + 80 * z},0" stroke="#dff0ff" stroke-width="${1 + 2.5 * z}" fill="none" stroke-opacity="${.25 + .3 * z}"/>`; } return { s, gy: 850, sc: .8 }; }
  if (v === 3) return { s: sk('#5a7a9a', '#a8bcd0', '#e8eef2') + mountainsR(880, 330, 7, { snow: .5 }) + farCity(52, 930, '#8a94a4', { hk: .8 }) + `<rect y="930" width="720" height="350" fill="#eef2f6"/><rect y="930" width="720" height="350" fill="#000" filter="url(#grainR)" opacity=".12"/>` + forestR(960, 9, 90, 150, 3, '#2a4a3a', {}) + snow(t, 60, .8), gy: 930, sc: .7 };
  if (v === 4) return { s: sk('#c8843a', '#e8b878', '#f8e0b0') + `<circle cx="540" cy="420" r="40" fill="#fff6dc"/>` + mountainsR(900, 120, 9, {}) + farCity(63, 930, '#b89a78', { hk: .9 }) + `<path d="M-20,930 Q200,900 380,935 T740,925 L740,1280 L-20,1280Z" fill="#d8b070"/><path d="M-20,1040 Q260,990 460,1050 T740,1030 L740,1280 L-20,1280Z" fill="#c89858"/><rect y="930" width="720" height="350" fill="#000" filter="url(#grainR)" opacity=".2"/>`, gy: 930, sc: .75 };
  let s = sk('#3a3a7a', '#c86a6a', '#f8c080') + farCity(74, 880, '#4a4466', { hk: 1.5 }) + `<rect y="880" width="720" height="60" fill="#2a2840"/><rect y="940" width="720" height="340" fill="${mix('#6a5a8a', '#3a2a24', dk)}"/>` + [120, 300, 480, 660].map(x => `<rect x="${x - 8}" y="900" width="16" height="70" fill="#1e1c30"/>`).join('') + `<rect y="892" width="720" height="14" fill="#1e1c30"/><rect y="940" width="720" height="340" fill="#f8c080" opacity=".18"/>`;
  return { s, gy: 880, sc: .85 };
}
// 2: explosions in city after city around the world: flash, fireball, blast ring, mushroom cloud
function boom(x, gy, sc, u, t) {
  const fb = ease(ramp(u, 0, .18)), k = ease(ramp(u, .12, 1.05)), w = clamp((u - .05) / .9); if (u <= 0) return '';
  let s = `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.35 * fb).toFixed(2)}"/><defs><radialGradient id="fbG"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#fff3c0"/><stop offset=".8" stop-color="#ffb04a" stop-opacity=".8"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient></defs>`;
  s += `<g transform="translate(${x},${gy}) scale(${sc}) translate(${-x},${-gy})">` + (k > 0 ? mushroom(x, gy, k, t) : '') + `<circle cx="${x}" cy="${gy - 20 - 360 * k}" r="${(170 * fb * (1 - .75 * k)).toFixed(1)}" fill="url(#fbG)" opacity="${(1 - k * .9).toFixed(2)}"/><circle cx="${x}" cy="${gy - 20 - 360 * k}" r="${(300 * fb * (1 - .6 * k)).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - k).toFixed(2)}"/>` +
    (w > 0 && w < 1 ? `<ellipse cx="${x}" cy="${gy}" rx="${(80 + w * 760).toFixed(1)}" ry="${(30 + w * 400).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(14 * (1 - w) + 2).toFixed(1)}" stroke-opacity="${(.7 * (1 - w)).toFixed(2)}"/>` : '') + `</g>`;
  return s;
}
const SHOTS2 = [[0, 360], [2, 420], [3, 300], [1, 380], [4, 330], [5, 400], [0, 300]];
function sceneBlast(t) {
  const st = S0(2) - .2, t0 = WS(2, 3) - .15, en = S0(3) - .2, n = SHOTS2.length, dur = (en - t0) / n, i = t < t0 ? 0 : Math.min(n - 1, Math.floor((t - t0) / dur)), u = t - (t0 + i * dur), [v, x] = SHOTS2[i], P = place(t, v);
  const sh = t < t0 ? 0 : 9 * Math.exp(-u * 3.5), s = `<g transform="translate(${(Math.sin(t * 61) * sh).toFixed(1)},${(Math.cos(t * 53) * sh).toFixed(1)}) scale(1.03) translate(-10,-18)">${P.s}</g>` + boom(x, P.gy, P.sc, t < t0 ? 0 : u + .001, t);
  F.flash = t < t0 ? 0 : .95 * clamp(1 - Math.abs(u - .06) / .22);
  noEarth(); F.ov = ''; return s;
}
// 3: the lights of the cities go out, all communication stops
function sceneDark(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 0), WS(3, 2) + .5)), fl = k < 1 ? .85 + .15 * Math.sin(t * 40) : 1, g = gl(t, { sunI: .05, lights: (1 - k) * fl * 1.2, spin: 4.6 });
  let o = `<defs>${SDEF}</defs>`; const r = RS(17);
  for (let i = 0; i < 14; i++) { const c = CITIES[Math.floor(r() * 70)], P = geo3(c[0], c[1], g.spin), ph = pmod(T * .7 + r(), 1); if (vis3(g, P) <= 0 || ph > .35) continue; const p = proj3(g.cam, P), f = ph / .35; o += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(5 + 26 * f).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - f).toFixed(2)}"/>`; }
  const a = ease(ramp(t, WS(3, 3), WS(3, 5)));
  o += `<g opacity="${a.toFixed(2)}">` + panel(170, 1030, 380, 150) + [0, 1, 2, 3].map(i => `<rect x="${262 + i * 22}" y="${1118 - i * 14}" width="14" height="${20 + i * 14}" rx="3" fill="#3a4466"/>`).join('') + `<path d="M250,1066 l110,84 M360,1066 l-110,84" stroke="#ff5a4a" stroke-width="8"/>` + lbl(450, 1116, 'لا إشارة', 1, '#ffc2b8', 30) + `</g>`;
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// 6: nuclear winter on the ground: snow in summer, dusk at noon
function sceneFrozen(t) {
  const st = S0(6) - .2, T = t - st, k = ease(ramp(T, 0, 2.5));
  let s = streetS(t, { id: 'f', cars: 0, sky: [mix('#3a6fb8', '#24262c', k), mix('#93bbe2', '#55585e', k), mix('#ebe3d0', '#8a8a8c', k)] }) + `<rect width="720" height="1280" fill="#10141c" opacity="${(.42 * k).toFixed(2)}"/>`;
  s += `<g opacity="${k.toFixed(2)}"><path d="M-20,1000 Q120,984 260,1002 T520,996 T740,1004 L740,1104 L-20,1104Z" fill="#eef3f8"/><rect x="-20" y="1104" width="760" height="12" fill="#f4f7fa"/><path d="M-20,1150 Q200,1130 380,1160 T740,1140 L740,1280 L-20,1280Z" fill="#dfe6ee" opacity=".9"/>` +
    [[-10, 696, 158], [148, 628, 136], [284, 568, 164], [448, 762, 126], [574, 682, 160]].map(([x, y, w]) => `<path d="M${x - 3},${y + 2} q${w / 2},-14 ${w + 6},0 l0,-9 l${-w - 6},0Z" fill="#f4f7fa"/>`).join('') + SHOPS.map(([sx, sw]) => `<path d="M${sx - 12},925 q${sw / 2},-12 ${sw + 24},0 l0,-6 l${-sw - 24},0Z" fill="#f4f7fa"/>`).join('') + `</g>`;
  [[150, 0, 1], [520, 2, -1]].forEach(([x0, c, f], i) => { const x = x0 + f * 14 * T; s += person(x, 1090, Object.assign({ s: .55, face: f, moving: 1, phase: t * 4 + i, amp: .5, t, coat: 1, scarf: '#b8322a', breath: k, hat: '#2a2a34' }, pal(c))); });
  s += snow(t, 130, k);
  s += lbl(360, 1210, 'صيفٌ تحتَ الصفر', ease(ramp(t, WS(6, 3), WS(6, 5))), '#dff0ff', 34);
  noEarth(); F.ov = ''; return s;
}
// 3: cities burn everywhere and send black smoke into the stratosphere: ~150 million tonnes
const SHOTS3 = [1, 2, 5, 0];
function sceneSoot(t) {
  const st = S0(4) - .2, T = t - st, en = S0(5) - .2, n = SHOTS3.length, dur = (en - st) / n, i = Math.min(n - 1, Math.floor(T / dur)), k = ease(ramp(t, WS(4, 9), WS(4, 13) + .2)), dk = .75, P = place(t, SHOTS3[i], dk), gy = P.gy + 30;
  let s = P.s + `<rect width="720" height="1280" fill="51a0c06" opacity=".4"/>`;
  [70, 190, 330, 470, 610].forEach((x, q) => { for (let j = 0; j < 9; j++) { const ph = pmod(T * (.16 + .03 * q) + j / 9, 1), y = gy - ph * 950, w = 40 + ph * 150; s += `<ellipse cx="${(x + Math.sin(ph * 5 + q + j + i) * 30 + ph * 60).toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .7).toFixed(1)}" fill="50c0a0a" opacity="${(.5 * Math.sin(Math.min(1, ph * 4) * 1.57)).toFixed(2)}" filter="url(5blur9)"/>`; }
    for (let j = 0; j < 4; j++) { const fl = (40 + 30 * Math.sin(T * 9 + q * 2 + j * 1.7)) * P.sc; s += `<path d="M${x - 26 + j * 16},${gy} q8,${-fl} 4,${-fl * 1.6} q10,${fl * .6} 12,${fl * 1.6}Z" fill="url(5flameG)"/>`; }
    s += `<circle cx="${x}" cy="${gy - 20}" r="110" fill="url(5fireGlow)" opacity=".5"/>`; });
  s += panel(160, 1030, 400, 170) + lbl(360, 1082, 'دخانٌ يصعدُ إلى الجوّ', 1, '5cfd8ff', 24) + lbl(360, 1158, `${AR(Math.round(150 * k))} مليون طنّ`, 1, '5f4c76b', 46);
  F.flash = .5 * clamp(1 - Math.abs(T - i * dur - .05) / .15) * (i > 0 ? 1 : 0);
  noEarth(); F.ov = ''; return s;
}
// 4: nuclear winter: the smoke veils the planet and it cools by about 9 degrees
function veil(g, k) { return `<defs><radialGradient id="vlG"><stop offset="0" stop-color="#3a3a3e" stop-opacity=".82"/><stop offset=".8" stop-color="#2a2a2e" stop-opacity=".9"/><stop offset="1" stop-color="#1a1a1e" stop-opacity=".95"/></radialGradient><filter id="vlF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .2  0 0 0 0 .22  0 0 0 2.2 -.75"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs><circle cx="${g.c0[0].toFixed(1)}" cy="${g.c0[1].toFixed(1)}" r="${(g.R + 3).toFixed(1)}" fill="url(#vlG)" opacity="${(k * .8).toFixed(2)}"/><circle cx="${g.c0[0].toFixed(1)}" cy="${g.c0[1].toFixed(1)}" r="${(g.R + 3).toFixed(1)}" fill="#fff" filter="url(#vlF)" opacity="${(k * .5).toFixed(2)}"/>`; }
function sceneWinter(t) {
  const k = ease(ramp(t, WS(5, 0), WS(5, 4) + .4)), kt = ease(ramp(t, WS(5, 5), WS(5, 10) + .2)), g = gl(t, { sunI: 1 - .45 * k });
  let o = `<defs>${SDEF}</defs>` + veil(g, k);
  o += panel(110, 1010, 500, 190) + `<rect x="150" y="1040" width="26" height="110" rx="13" fill="61c2440" stroke="6dfe6ff" stroke-width="2.5"/><rect x="156" y="${1050 + 60 * kt}" width="14" height="${94 - 60 * kt}" rx="7" fill="${mix('6ff6a4a', '66ab4ff', kt)}"/><circle cx="163" cy="1160" r="20" fill="${mix('6ff6a4a', '66ab4ff', kt)}" stroke="6dfe6ff" stroke-width="2.5"/>` + lbl(400, 1070, 'حرارةُ الأرض', 1, '6cfd8ff', 24) + lbl(400, 1150, `${AR(Math.round(9 * kt))} درجات أقلّ`, 1, '69ad0ff', 46);
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// 5: crops die in the fields under a dim sun
function sceneCrops(t) {
  const st = S0(7) - .2, T = t - st, dk = ease(ramp(T, 0, 2.2));
  let s = `<defs>${DEFB()}<linearGradient id="skc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('85a7a9a', '82a2c32', dk)}"/><stop offset="1" stop-color="${mix('8c8d0c8', '86a6a6c', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(8skc)"/><circle cx="520" cy="470" r="120" fill="8fff6d0" opacity="${(.25 - .15 * dk).toFixed(2)}" filter="url(8soft)"/><circle cx="520" cy="470" r="26" fill="${mix('8fffdf2', '8b8a898', dk)}"/>`;
  s += mountainsR(820, 150, 5, {}) + `<rect y="800" width="720" height="480" fill="${mix('8b89a4a', '88e8a84', dk)}"/><rect y="800" width="720" height="480" fill="8000" filter="url(8grainR)" opacity=".3"/>`;
  s += `<rect x="90" y="740" width="110" height="64" fill="85a4a40"/><path d="M80,742 L145,700 L210,742Z" fill="83a2e28"/><rect x="130" y="768" width="22" height="36" fill="82a201a"/>`;
  const r = RS(4); for (let row = 0; row < 11; row++) { const z = row / 10, y = 830 + Math.pow(z, 1.5) * 420, n = Math.round(30 - 14 * z), h = 26 + 90 * z;
    for (let i = 0; i < n; i++) { const x = (i + r() * .6) * 760 / n - 20, droop = dk * (30 + r() * 50) * (r() > .5 ? 1 : -1) * z, col = mix('8c8a23a', '85a4e3a', dk); s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(droop * .2).toFixed(1)},${(-h * .6).toFixed(1)} ${droop.toFixed(1)},${(-h * (1 - .45 * dk)).toFixed(1)}" stroke="${col}" stroke-width="${(1.5 + 3 * z).toFixed(1)}" fill="none"/><ellipse cx="${(x + droop).toFixed(1)}" cy="${(y - h * (1 - .45 * dk)).toFixed(1)}" rx="${(2 + 4 * z).toFixed(1)}" ry="${(5 + 9 * z).toFixed(1)}" fill="${col}"/>`; } }
  s += `<rect y="800" width="720" height="480" fill="8eef2f6" opacity="${(.22 * dk).toFixed(2)}"/>` + snow(t, 90, dk * .9);
  noEarth(); F.ov = ''; return s;
}
// 6: most victims die of famine, not of the bombs: more than 5 billion
function sceneFamine(t) {
  const g = gl(t, { sunI: .55 }), k1 = ease(ramp(t, WS(8, 3), WS(8, 5) + .3)), k2 = ease(ramp(t, WS(8, 6), WS(8, 11) + .3)), BX = 640, BW = 430;
  let o = `<defs>${SDEF}</defs>` + veil(g, 1);
  o += panel(50, 990, 620, 230) + lbl(BX - 44, 1052, 'القنابل', 1, '9ffc2b8', 24) + `<rect x="${BX - 100 - BW * .07 * k1}" y="1026" width="${BW * .07 * k1}" height="36" rx="6" fill="9e5483a"/>` + lbl(BX - 100 - BW * .07 - 110, 1052, 'مئاتُ الملايين', k1, '9fff', 22) +
    lbl(BX - 40, 1162, 'الجوع', 1, '9ffe4a0', 24) + `<rect x="${BX - 100 - BW * k2}" y="1136" width="${BW * k2}" height="36" rx="6" fill="9f4c76b"/>` + lbl(BX - 100 - BW / 2, 1162, '+٥ مليارات', k2 > .6 ? 1 : 0, '91c140a', 24);
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 7) - .2, WS(9, 7) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(9)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(9)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="10f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 9), WS(9, 9) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="10e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="10fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneBlast }, { s: S0(3) - .2, f: sceneDark }, { s: S0(4) - .2, f: sceneSoot }, { s: S0(5) - .2, f: sceneWinter }, { s: S0(6) - .2, f: sceneFrozen }, { s: S0(7) - .2, f: sceneCrops }, { s: S0(8) - .2, f: sceneFamine }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneCount, sceneBlast, sceneDark, sceneWinter, sceneFamine]);
const XF = .5;
const TLI = [['كراتُ نار', S0(2)], ['دخانٌ أسود', S0(4)], ['شتاءٌ نوويّ', S0(6)], ['مجاعة', S0(7)]];
const LIST_ON = new Set([sceneBlast, sceneSoot, sceneFrozen, sceneCrops]);
const CHIPS = [
  ['c1', '+١٢٬٠٠٠ رأسٍ نوويّ', 360, 330, 'red', WS(1, 6), S0(2) - .3], ['c2', 'في كلِّ قارّة', 360, 330, 'red', WS(2, 1), S0(3) - .3], ['c2b', 'ظلامٌ تامّ', 360, 330, 'big', WS(3, 1), S0(4) - .3], ['c3', '١٥٠ مليون طنّ', 360, 330, 'big', WS(4, 11), S0(5) - .3], ['c4', '٩ درجات أقلّ', 360, 330, 'ice', WS(5, 9), S0(6) - .3], ['c4b', 'الشتاءُ النوويّ', 360, 330, 'ice', WS(6, 1), S0(7) - .3],
  ['c5', 'العالمُ كلُّه يجوع', 360, 330, 'big', WS(7, 4), S0(8) - .3], ['c6', 'الجوعُ أخطرُ من القنابل', 360, 330, 'red', WS(8, 7), S0(9) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 9), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">حربٌ نوويّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
