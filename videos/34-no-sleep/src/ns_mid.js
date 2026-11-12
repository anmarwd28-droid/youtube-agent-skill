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
    `<ellipse cx="${hx + 11}" cy="${hy - 2}" rx="2.4" ry="3" fill="${g > .3 ? '#fff' : '#1a120d'}"/>` + (o.lid || o.closed ? `<rect x="${hx + 7.6}" y="${hy - 6.2}" width="7" height="${(o.closed ? 6.4 : o.lid * 4.4).toFixed(2)}" fill="${c.skin}"/><path d="M${hx + 7.6},${(hy - 6.2 + (o.closed ? 5.2 : o.lid * 4.4)).toFixed(2)} q3.5,${o.closed ? 1.8 : .6} 7,0" stroke="#3a2418" stroke-width="1.2" fill="none" opacity=".85"/>` : '') +
    (o.bags ? `<path d="M${hx + 7.4},${hy + 2.4} q3.8,2.8 7.6,0" stroke="#6a3448" stroke-width="1.8" fill="none" opacity="${(.55 * o.bags).toFixed(2)}"/><ellipse cx="${hx + 11}" cy="${hy + 3.6}" rx="4.4" ry="1.8" fill="#5a2a3a" opacity="${(.22 * o.bags).toFixed(2)}"/>` : '') + `<path d="M${hx + 6},${hy - 9} q6,-3 11,0" stroke="${c.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
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
const dimSt = (t, id, op = .6, o = {}) => streetS(t, Object.assign({ id, cars: 0 }, o)) + `<rect width="720" height="1280" fill="#0a1028" opacity="${op}"/>`;
// ===================== "what if you did not sleep for ten days?" (Short #34) =====================
const NDEF = `<radialGradient id="lampG"><stop offset="0" stop-color="#ffd59a" stop-opacity=".9"/><stop offset=".35" stop-color="#ffb35c" stop-opacity=".3"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="lampW"><stop offset="0" stop-color="#ffc874" stop-opacity=".75"/><stop offset=".4" stop-color="#ff9e48" stop-opacity=".28"/><stop offset="1" stop-color="#ff8a30" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="scrG"><stop offset="0" stop-color="#9fd0ff" stop-opacity=".55"/><stop offset="1" stop-color="#6aa8ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="brainG" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#f6c6c4"/><stop offset=".6" stop-color="#e09a9c"/><stop offset="1" stop-color="#b86a72"/></radialGradient>` +
  `<radialGradient id="cereG" cx=".4" cy=".3"><stop offset="0" stop-color="#eab0b0"/><stop offset="1" stop-color="#a85c66"/></radialGradient>` +
  `<linearGradient id="headG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8704e"/><stop offset=".55" stop-color="#c89070"/><stop offset="1" stop-color="#d9a584"/></linearGradient>` +
  `<radialGradient id="irisG"><stop offset="0" stop-color="#2a1608"/><stop offset=".35" stop-color="#5a3216"/><stop offset=".8" stop-color="#8a5a2a"/><stop offset="1" stop-color="#3a2210"/></radialGradient>` +
  `<radialGradient id="scleraG" cx=".5" cy=".4"><stop offset="0" stop-color="#fbf6ee"/><stop offset=".75" stop-color="#eadfd2"/><stop offset="1" stop-color="#c9a8a0"/></radialGradient>` +
  `<radialGradient id="virG" cx=".38" cy=".35"><stop offset="0" stop-color="#d6f0a8"/><stop offset=".6" stop-color="#7ab05a"/><stop offset="1" stop-color="#3c6a30"/></radialGradient>` +
  `<radialGradient id="vigB" cx=".5" cy=".5" r=".72"><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></radialGradient>` +
  `<linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c8" stop-opacity=".5"/><stop offset="1" stop-color="#fff2c8" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5236"/><stop offset="1" stop-color="#a87650"/></linearGradient>` +
  `<linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8774c"/><stop offset="1" stop-color="#7a5232"/></linearGradient>` +
  `<linearGradient id="curG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#244c52"/><stop offset=".25" stop-color="#3a6e74"/><stop offset=".5" stop-color="#2a5a60"/><stop offset=".75" stop-color="#40767c"/><stop offset="1" stop-color="#22484e"/></linearGradient>` +
  `<radialGradient id="dropG"><stop offset="0" stop-color="#e8f4ff" stop-opacity=".8"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="clumpG" cx=".4" cy=".35"><stop offset="0" stop-color="#d8a860"/><stop offset=".7" stop-color="#8a5a2a"/><stop offset="1" stop-color="#5a3414"/></radialGradient>` +
  `<filter id="blur12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>`;
const DEFN = () => `${DEFB()}${NDEF}`;
const mulF = (id, N) => { const r = lerp(1, .34, N), g = lerp(1, .38, N), b = lerp(1, .56, N); return `<filter id="${id}" x="-200" y="-200" width="1120" height="1700" filterUnits="userSpaceOnUse"><feColorMatrix type="matrix" values="${r.toFixed(3)} 0 0 0 0  0 ${g.toFixed(3)} 0 0 0  0 0 ${b.toFixed(3)} 0 ${(.015 * N).toFixed(3)}  0 0 0 1 0"/></filter>`; };
const scr = (inner) => `<g style="mix-blend-mode:screen">${inner}</g>`;

// ---------- the room: wall, window to the city, desk, lamp, chair, wooden floor. o: {N, day, mess, id, cyc}
function outside(t, N, id, x0, y0, w, h) {
  const sky = [mix('#6aa4dc', '#0a1430', N), mix('#a9cdec', '#1c2a58', N), mix('#f4e2c0', '#3a3a6a', N)];
  let s = `<defs><linearGradient id="os${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient><clipPath id="oc${id}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}"/></clipPath></defs>`;
  s += `<g clip-path="url(#oc${id})"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="url(#os${id})"/>`;
  if (N > .02) { const r = RS(77); for (let i = 0; i < 40; i++) s += `<circle cx="${(x0 + r() * w).toFixed(1)}" cy="${(y0 + r() * h * .6).toFixed(1)}" r="${(.6 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(N * (.3 + .6 * r())).toFixed(2)}"/>`;
    s += `<circle cx="${x0 + w * .72}" cy="${y0 + 70}" r="60" fill="#fff8e0" opacity="${(.16 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(x0 + w * .72, y0 + 70, 22, N); }
  if (N < .98) s += `<circle cx="${x0 + w * .25}" cy="${y0 + 90}" r="80" fill="#fff6d0" opacity="${(.35 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${x0 + w * .25}" cy="${y0 + 90}" r="18" fill="#fffdf0" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(x0 + w * .6 + t * 2, y0 + 150, 150, 61, { a: .8 * (1 - N) });
  const hz = mix('#7a8ea8', '#141c38', N);
  s += farCity(97, y0 + h - 20, hz, { hk: .75 });
  // lit city windows at night
  if (N > .02) { const r = RS(91); for (let i = 0; i < 90; i++) { const wx = x0 + r() * w, wy = y0 + h - 30 - r() * 200, k = r(); s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3.4" height="4.6" fill="${k < .7 ? '#ffd27e' : '#cfe4ff'}" opacity="${(N * (.5 + .5 * r())).toFixed(2)}"/>`; } }
  s += `<rect x="${x0}" y="${y0 + h - 22}" width="${w}" height="22" fill="${mix('#6a7480', '#0c1020', N)}"/></g>`;
  return s;
}
const WX = 372, WY = 410, WWd = 270, WHt = 380;
function deskItems(t, N, mess, o = {}) {
  let s = '';
  // desk: top, front edge, drawer unit, legs
  s += `<rect x="20" y="866" width="470" height="18" rx="3" fill="url(#deskG)"/><rect x="20" y="866" width="470" height="4" fill="#fff" opacity=".22"/><rect x="20" y="884" width="470" height="8" fill="#000" opacity=".25"/>` +
    `<rect x="36" y="884" width="140" height="134" fill="#8a5c38"/><rect x="36" y="884" width="140" height="134" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    [0, 1, 2].map(i => `<rect x="44" y="${894 + i * 42}" width="124" height="36" rx="3" fill="#9a6a42"/><rect x="44" y="${894 + i * 42}" width="124" height="4" fill="#fff" opacity=".14"/><rect x="92" y="${909 + i * 42}" width="28" height="5" rx="2" fill="#d8c8a8"/>`).join('') +
    `<rect x="456" y="884" width="16" height="134" fill="#6a4428"/><rect x="456" y="884" width="5" height="134" fill="#fff" opacity=".12"/>`;
  // lamp: base, two arms, shade
  s += `<ellipse cx="80" cy="864" rx="34" ry="7" fill="#2a2a30"/><path d="M80,862 L104,760 L170,742" stroke="#2e2e36" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="104" cy="760" r="6" fill="#4a4a52"/>` +
    `<path d="M150,728 L206,742 L196,780 L136,764Z" fill="#c8a040"/><path d="M150,728 L206,742 L203,752 L146,738Z" fill="#fff" opacity=".25"/><ellipse cx="166" cy="772" rx="30" ry="9" fill="#fff4cc" opacity="${(.4 + .6 * N).toFixed(2)}" transform="rotate(15,166,772)"/>`;
  // books, mug(s), papers, laptop back
  s += `<rect x="226" y="842" width="96" height="12" fill="#2e5a8a"/><rect x="232" y="830" width="86" height="12" fill="#a83a3a"/><rect x="222" y="854" width="104" height="12" fill="#3a7a4a"/><rect x="226" y="842" width="96" height="3" fill="#fff" opacity=".3"/><rect x="232" y="830" width="86" height="3" fill="#fff" opacity=".3"/>` +
    `<path d="M342,862 L344,770 L352,768 L356,862Z" fill="#4a4e56"/><path d="M344,770 L352,768 L354,780 L345,782Z" fill="#fff" opacity=".2"/><rect x="330" y="860" width="96" height="6" rx="2" fill="#8a8e96"/>`;
  const mugs = mess ? [[196, 1], [300, 0], [420, 1]] : [[196, 1]];
  mugs.forEach(([mx, st], i) => { s += `<path d="M${mx - 14},${866} L${mx - 16},${830} L${mx + 16},${830} L${mx + 14},${866}Z" fill="${['#e8e2d6', '#c84a3a', '#3a6a9a'][i]}"/><path d="M${mx + 15},838 q14,2 12,14 q-2,8 -12,6" stroke="${['#e8e2d6', '#c84a3a', '#3a6a9a'][i]}" stroke-width="5" fill="none"/><ellipse cx="${mx}" cy="830" rx="16" ry="4" fill="#3a2214"/><path d="M${mx - 14},834 L${mx - 13},862" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>` +
    (st && !mess ? Array.from({ length: 3 }, (_, q) => { const p = pmod(t * .45 + q / 3, 1); return `<path d="M${mx - 6 + q * 6},${826 - p * 50} q${6 * Math.sin(t * 2 + q)},-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity="${(.35 * Math.sin(p * Math.PI)).toFixed(2)}" stroke-linecap="round"/>`; }).join('') : ''); });
  if (!o.noBook) s += `<path d="M370,860 L410,848 L448,860 L448,866 L370,866Z" fill="#f4efe2"/><path d="M410,848 L410,864" stroke="#b8ae98" stroke-width="1.5"/>` + [0, 1, 2, 3].map(q => `<path d="M${378 + q * 2},${858 - q * 2.2} l26,-7 M${416 + q * 2},${851 + q * 2.2} l24,6" stroke="#9a9488" stroke-width="1"/>`).join('');
  if (mess) { const r = RS(5); for (let i = 0; i < 7; i++) { const px = 40 + r() * 600, py = 1050 + r() * 190, a = r() * 50 - 25, w = 46 + r() * 16, k = (py - 1000) / 280;
    s += `<g transform="translate(${px.toFixed(1)},${py.toFixed(1)}) scale(${(.8 + .5 * k).toFixed(2)},${(.36 + .2 * k).toFixed(2)}) rotate(${a.toFixed(1)})"><rect x="${(-w / 2 + 3).toFixed(1)}" y="-29" width="${w.toFixed(1)}" height="62" fill="#000" opacity=".22"/><rect x="${(-w / 2).toFixed(1)}" y="-32" width="${w.toFixed(1)}" height="62" fill="#f4f0e6"/>` + [0, 1, 2, 3, 4, 5].map(q => `<path d="M${(-w / 2 + 6).toFixed(1)},${-22 + q * 9} h${(w - 14 - (q % 3) * 6).toFixed(1)}" stroke="#8a90a8" stroke-width="2" opacity=".6"/>`).join('') + `</g>`; }
    for (let i = 0; i < 5; i++) { const px = 60 + r() * 520, py = 1100 + r() * 140; s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="11" fill="#e8e4da"/><path d="M${(px - 7).toFixed(1)},${(py - 3).toFixed(1)} l6,4 l5,-6 M${(px - 3).toFixed(1)},${(py + 5).toFixed(1)} l7,-2" stroke="#a8a294" stroke-width="1.4" fill="none"/>`; } }
  return s;
}
function clockW(cx, cy, R, hh, mm) {
  const ha = (hh % 12 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2;
  return `<circle cx="${cx + 3}" cy="${cy + 4}" r="${R + 2}" fill="#000" opacity=".25" filter="url(#blur2)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a2a30"/><circle cx="${cx}" cy="${cy}" r="${R - 5}" fill="#f6f2e8"/>` +
    Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${(cx + Math.cos(a) * (R - 9)).toFixed(1)},${(cy + Math.sin(a) * (R - 9)).toFixed(1)} L${(cx + Math.cos(a) * (R - 15)).toFixed(1)},${(cy + Math.sin(a) * (R - 15)).toFixed(1)}" stroke="#333" stroke-width="${i % 3 ? 1.5 : 3}"/>`; }).join('') +
    `<path d="M${cx},${cy} L${(cx + Math.cos(ha) * R * .48).toFixed(1)},${(cy + Math.sin(ha) * R * .48).toFixed(1)}" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/><path d="M${cx},${cy} L${(cx + Math.cos(ma) * R * .72).toFixed(1)},${(cy + Math.sin(ma) * R * .72).toFixed(1)}" stroke="#1a1a1a" stroke-width="2.6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="#c0392b"/>` +
    `<path d="M${cx - R * .6},${cy - R * .55} A${R * .8},${R * .8} 0 0 1 ${cx + R * .2},${cy - R * .78}" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`;
}
function calendar(x, y, n, flip = 0) {
  return `<rect x="${x + 3}" y="${y + 4}" width="92" height="112" fill="#000" opacity=".22" filter="url(#blur2)"/><rect x="${x}" y="${y}" width="92" height="112" fill="#f8f4ea"/><rect x="${x}" y="${y}" width="92" height="28" fill="#c0392b"/>` +
    [0, 1, 2, 3, 4].map(i => `<circle cx="${x + 14 + i * 16}" cy="${y + 2}" r="3" fill="#555"/>`).join('') +
    `<text x="${x + 46}" y="${y + 21}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="16" fill="#fff">اليوم</text>` +
    `<text x="${x + 46}" y="${y + 92}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${n >= 10 ? 52 : 60}" fill="#2a2a2a">${AR(n)}</text>` +
    (flip > 0 && flip < 1 ? `<path d="M${x},${y + 28} L${x + 92},${y + 28} L${x + 92 - flip * 30},${y + 28 + 84 * (1 - flip)} L${x + flip * 30},${y + 28 + 84 * (1 - flip)}Z" fill="#fff" opacity="${(1 - flip).toFixed(2)}"/>` : '');
}
function picture(x, y) {
  return `<rect x="${x + 4}" y="${y + 6}" width="200" height="140" fill="#000" opacity=".25" filter="url(#blur2)"/><rect x="${x}" y="${y}" width="200" height="140" fill="#3a2a1e"/><rect x="${x + 10}" y="${y + 10}" width="180" height="120" fill="#efe6d4"/>` +
    `<defs><clipPath id="pic"><rect x="${x + 22}" y="${y + 22}" width="156" height="96"/></clipPath><linearGradient id="picS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a868"/><stop offset="1" stop-color="#f8dcb0"/></linearGradient></defs>` +
    `<g clip-path="url(#pic)"><rect x="${x + 22}" y="${y + 22}" width="156" height="96" fill="url(#picS)"/><circle cx="${x + 130}" cy="${y + 56}" r="13" fill="#fff4d8"/><path d="M${x + 22},${y + 118} L${x + 22},${y + 84} L${x + 60},${y + 52} L${x + 92},${y + 80} L${x + 120},${y + 62} L${x + 178},${y + 98} L${x + 178},${y + 118}Z" fill="#6a5a7a"/><path d="M${x + 60},${y + 52} L${x + 70},${y + 62} L${x + 64},${y + 60} L${x + 54},${y + 58}Z" fill="#fff" opacity=".8"/><path d="M${x + 22},${y + 118} L${x + 22},${y + 100} Q${x + 90},${y + 86} ${x + 178},${y + 106} L${x + 178},${y + 118}Z" fill="#3a4a3a"/></g>` +
    `<path d="M${x + 10},${y + 10} L${x + 70},${y + 10} L${x + 10},${y + 70}Z" fill="#fff" opacity=".12"/>`;
}
const hlab = n => n === 1 ? 'ساعة واحدة' : n === 2 ? 'ساعتان' : AR(n) + ' ' + hrs(n);
const hrs = n => n === 1 ? 'ساعة' : n === 2 ? 'ساعتان' : n >= 3 && n <= 10 ? 'ساعات' : 'ساعة';
function lampD(x, base, h) {
  return `<ellipse cx="${x + 6}" cy="${base + 2}" rx="18" ry="5" fill="#000" opacity=".3"/><rect x="${x - 9}" y="${base - 26}" width="18" height="26" rx="3" fill="#3e444c"/><rect x="${x - 4}" y="${base - h}" width="8" height="${h - 24}" fill="#4a525c"/><rect x="${x - 4}" y="${base - h}" width="3" height="${h - 24}" fill="#fff" opacity=".18"/>` +
    `<path d="M${x},${base - h + 4} q0,-24 34,-22 l30,0" stroke="#4a525c" stroke-width="6" fill="none"/><path d="M${x + 50},${base - h - 18} l30,0 l-6,14 l-18,0Z" fill="#3a4048"/><rect x="${x + 56}" y="${base - h - 4}" width="18" height="5" rx="2" fill="#f4ead0"/>`;
}
function room(t, o = {}) {
  const N = o.N ?? 1, id = o.id || 'r';
  let s = `<defs>${DEFN()}${mulF('nf' + id, N * .92)}</defs>` + outside(t, N, id, WX, WY, WWd, WHt);
  // wall with the window hole, then frame, curtains, clock, calendar
  let g = `<path d="M-200,-200 H920 V1012 H-200Z M${WX},${WY} V${WY + WHt} H${WX + WWd} V${WY}Z" fill-rule="evenodd" fill="#d6c4a2"/>` +
    `<path d="M-200,-200 H920 V1012 H-200Z M${WX},${WY} V${WY + WHt} H${WX + WWd} V${WY}Z" fill-rule="evenodd" fill="#fff" filter="url(#wallI)" opacity=".35"/>` +
    `<rect x="-20" y="-20" width="760" height="1032" fill="url(#aoUp)" opacity=".25"/>` +
    `<rect x="-20" y="992" width="760" height="22" fill="#efe6d2"/><rect x="-20" y="992" width="760" height="4" fill="#fff" opacity=".5"/>`;
  g += `<rect x="${WX - 14}" y="${WY - 14}" width="${WWd + 28}" height="${WHt + 28}" fill="none" stroke="#f2ece0" stroke-width="14"/><path d="M${WX + WWd / 2},${WY} V${WY + WHt} M${WX},${WY + WHt * .42} H${WX + WWd}" stroke="#f2ece0" stroke-width="9"/>` +
    `<path d="M${WX + 8},${WY + WHt - 8} L${WX + WWd * .45},${WY + 8}" stroke="#fff" stroke-width="22" opacity=".06"/><rect x="${WX - 30}" y="${WY + WHt + 12}" width="${WWd + 60}" height="14" fill="#f6f0e4"/><rect x="${WX - 30}" y="${WY + WHt + 26}" width="${WWd + 60}" height="6" fill="#000" opacity=".2"/>`;
  [[WX - 64, 70], [WX + WWd - 6, 70]].forEach(([cx, cw]) => { g += `<rect x="${cx}" y="${WY - 40}" width="${cw}" height="${WHt + 110}" fill="url(#curG)"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${cx + 7 + q * 14},${WY - 40} V${WY + WHt + 70}" stroke="#000" stroke-opacity=".16" stroke-width="3"/>`).join('') + `<rect x="${cx}" y="${WY - 40}" width="${cw}" height="${WHt + 110}" fill="#000" filter="url(#grainR)" opacity=".2"/>`; });
  g += `<rect x="${WX - 90}" y="${WY - 50}" width="${WWd + 180}" height="8" rx="4" fill="#5a4a3a"/>`;
  g += picture(56, 404) + clockW(104, 676, 46, o.hh ?? 2, o.mm ?? 40) + calendar(214, 618, o.day || 1, o.flip || 0);
  // floor: planks in perspective, rug
  g += `<rect x="-200" y="1014" width="1120" height="300" fill="url(#woodG)"/><rect x="-20" y="1014" width="760" height="280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let q = 0; q < 9; q++) { const yy = 1014 + q * q * 3.4 + q * 6; g += `<path d="M-20,${yy.toFixed(1)} H740" stroke="#4a3020" stroke-width="${(1 + q * .15).toFixed(1)}" opacity=".55"/>`; }
  for (let q = -6; q < 14; q++) g += `<path d="M${360 + q * 70},1014 L${360 + q * 150},1290" stroke="#4a3020" stroke-width="1.2" opacity=".35"/>`;
  g += `<rect x="-20" y="1014" width="760" height="20" fill="url(#aoDn)" opacity=".6"/><ellipse cx="420" cy="1150" rx="300" ry="70" fill="#6a2e34"/><ellipse cx="420" cy="1150" rx="282" ry="60" fill="none" stroke="#d8b878" stroke-width="5" stroke-dasharray="14 8"/><ellipse cx="420" cy="1150" rx="300" ry="70" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<g filter="url(#nf${id})">${g}${o.mid ? o.mid : ''}</g>`;
  return s;
}
// light layers drawn over the filtered room: lamp pool, window light (day), screen glow
const lampLight = (N, a = 1) => N > .02 ? scr(`<circle cx="170" cy="840" r="330" fill="url(#lampW)" opacity="${(N * a * .9).toFixed(2)}"/><path d="M146,770 L206,782 L330,868 L40,868Z" fill="#ffd89a" opacity="${(N * a * .14).toFixed(2)}" filter="url(#soft)"/>`) + `<ellipse cx="166" cy="772" rx="24" ry="6" fill="#fff8e0" opacity="${(N * a).toFixed(2)}" transform="rotate(15,166,772)"/>` : '';
const sunBeam = (D) => D > .02 ? scr(`<path d="M${WX},${WY + WHt} L${WX + WWd},${WY + WHt} L${WX + WWd - 120},1280 L${WX - 330},1280Z" fill="url(#beamG)" opacity="${(.45 * D).toFixed(2)}"/>`) : '';
function chair(x, y, s, f = -1) { // back on the far side from the face
  const bx = x - f * 44 * s;
  return `<rect x="${bx - 6 * s}" y="${y - 250 * s}" width="${12 * s}" height="${250 * s}" fill="#3a2c22"/><rect x="${bx - 12 * s}" y="${y - 250 * s}" width="${24 * s}" height="${70 * s}" rx="${6 * s}" fill="#4a382a"/>` +
    `<rect x="${x - 54 * s}" y="${y - 82 * s}" width="${108 * s}" height="${12 * s}" rx="${3 * s}" fill="#5a4432"/><rect x="${x - 50 * s}" y="${y - 70 * s}" width="${8 * s}" height="${70 * s}" fill="#3a2c22"/><rect x="${x + 42 * s}" y="${y - 70 * s}" width="${8 * s}" height="${70 * s}" fill="#3a2c22"/>`;
}
// the seated, tired person (YOU) at the desk, facing left
const SIT = (x, y, s, o = {}) => hero(x, y, Object.assign({ s, face: -1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1 }, YOU, o));

// ---------- the brain in a head profile ----------
const HEADP = 'M250,1130 C245,1010 230,930 222,860 C190,700 200,520 300,440 C380,375 500,395 545,470 C568,515 572,570 562,610 C566,640 580,670 606,712 C612,724 600,736 576,742 C582,752 584,764 578,774 C572,782 566,788 570,796 C578,806 576,820 566,836 C562,856 556,872 540,884 C512,900 482,904 462,915 L456,1130 Z';
const BRAINP = 'M246,604 C232,512 296,450 386,446 C474,442 538,490 540,560 C543,620 508,650 468,656 C430,662 410,690 378,690 C338,690 318,666 290,662 C258,656 248,632 246,604Z';
const SULCI = (() => { const r = RS(404), o = []; for (let i = 0; i < 26; i++) { let x = 260 + r() * 270, y = 462 + r() * 190, a = r() * 6.28, d = `M${x.toFixed(1)},${y.toFixed(1)}`;
  for (let k = 0; k < 6; k++) { a += (r() - .5) * 2.2; const nx = x + Math.cos(a) * 16, ny = y + Math.sin(a) * 12; d += ` Q${(x + Math.cos(a + 1.2) * 9).toFixed(1)},${(y + Math.sin(a + 1.2) * 9).toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`; x = nx; y = ny; } o.push(d); } return o; })();
const WASTE = (() => { const r = RS(405), o = []; for (let i = 0; i < 46; i++) { const a = r() * 6.28, d = Math.sqrt(r()); o.push([392 + Math.cos(a) * d * 130, 560 + Math.sin(a) * d * 85, 2.5 + r() * 3.5, r()]); } return o; })();
function brainSVG(clean, clog, t, glowEye) {
  let s = `<defs><clipPath id="brC"><path d="${BRAINP}"/></clipPath></defs>`;
  s += `<path d="${HEADP}" fill="url(#headG)"/><path d="${HEADP}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    // ear, eye, brow, lips line, the hair cap
    `<path d="M300,440 C380,375 500,395 545,470 C520,440 470,420 410,420 C350,422 300,460 262,520 C258,490 270,460 300,440Z" fill="#2a1e18"/>` +
    `<path d="M520,606 q18,-8 34,2" stroke="#2a1e18" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    (glowEye ? `<path d="M518,628 q16,-12 32,0 q-16,10 -32,0Z" fill="#f4eee6"/><circle cx="536" cy="628" r="6" fill="#3a2210"/><circle cx="538" cy="626" r="1.6" fill="#fff"/>` : `<path d="M518,630 q16,8 32,0" stroke="#3a2418" stroke-width="3.5" fill="none" stroke-linecap="round"/>`) +
    `<path d="M566,786 q8,3 12,-1" stroke="#7a3a2a" stroke-width="3" fill="none"/>`;
  // skull cavity and brain
  s += `<path d="M232,604 C214,500 290,428 388,428 C486,426 556,482 556,562 C558,630 520,668 472,672 C432,676 412,706 376,706 C330,706 306,682 280,676 C246,668 234,640 232,604Z" fill="#3a1a1e" opacity=".55"/>`;
  s += `<path d="M360,684 C356,730 368,780 390,830 L426,824 C408,780 398,730 402,684Z" fill="#c88a8c"/><ellipse cx="300" cy="676" rx="54" ry="30" fill="url(#cereG)"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${256 + q * 3},${662 + q * 6} q44,-6 88,${2 + q}" stroke="#7a3a44" stroke-width="1.6" fill="none" opacity=".6"/>`).join('');
  s += `<path d="${BRAINP}" fill="url(#brainG)"/><g clip-path="url(#brC)">` + SULCI.map(d => `<path d="${d}" stroke="#9a4a56" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".75"/><path d="${d}" stroke="#ffe4e2" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".45" transform="translate(-2,-2)"/>`).join('') +
    `<path d="M300,530 C350,560 420,548 470,600" stroke="#8a3a48" stroke-width="5" fill="none" opacity=".7"/>`;
  // night: the brain's washing fluid flows along the folds and carries the waste out
  if (clean > 0) { s += `<g opacity="${clean.toFixed(2)}">` + SULCI.map((d, i) => `<path d="${d}" stroke="#7fd4ff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="10 16" stroke-dashoffset="${(-t * 40 - i * 7).toFixed(1)}" opacity=".85"/>`).join('') + `</g>`; }
  s += `</g><path d="${BRAINP}" fill="none" stroke="#8a3a48" stroke-width="3"/>`;
  // waste: gold specks leave at night; brown clumps grow when awake
  WASTE.forEach(([x, y, r, k], i) => {
    const out = clamp((clean * 1.6 - k * .6)), tx = lerp(x, 404, out), ty = lerp(y, 840, out * out), a = (1 - out) * (clog > 0 ? 0 : 1);
    if (a > .02) s += `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${r.toFixed(1)}" fill="#f4c76b" opacity="${(a * .95).toFixed(2)}"/>`;
    const g = clamp(clog * 1.5 - k * .5); if (g > 0) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * (.6 + 1.6 * g)).toFixed(1)}" fill="url(#clumpG)" opacity="${(.95 * Math.min(1, g * 2)).toFixed(2)}"/><circle cx="${(x - r * .4).toFixed(1)}" cy="${(y - r * .4).toFixed(1)}" r="${(r * .5 * g).toFixed(1)}" fill="#f0d090" opacity=".5"/>`; });
  if (clean > 0) for (let i = 0; i < 8; i++) { const p = pmod(t * .5 + i / 8, 1); s += `<circle cx="${(404 + Math.sin(p * 9 + i) * 6).toFixed(1)}" cy="${(700 + p * 260).toFixed(1)}" r="4" fill="#f4c76b" opacity="${(clean * (1 - p)).toFixed(2)}"/>`; }
  return s;
}

// ---------- a big, tired, open eye (the microsleep) ----------
function bigEye(cx, cy, w, open, red) {
  const h = w * .4 * open, r = RS(31);
  let s = `<defs><clipPath id="eyC"><path d="M${cx - w / 2},${cy} Q${cx - w * .1},${cy - h * 1.35} ${cx + w / 2},${cy - h * .1} Q${cx},${cy + h * 1.15} ${cx - w / 2},${cy}Z"/></clipPath></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${w * .9}" ry="${w * .62}" fill="#c89070"/><ellipse cx="${cx}" cy="${cy + w * .2}" rx="${w * .6}" ry="${w * .22}" fill="#6a3448" opacity="${(.35 * red).toFixed(2)}" filter="url(#blur12)"/>` +
    `<path d="M${cx - w * .7},${cy - w * .38} Q${cx},${cy - w * .62} ${cx + w * .7},${cy - w * .36}" stroke="#2a1e18" stroke-width="${w * .08}" fill="none" stroke-linecap="round"/>`;
  s += `<g clip-path="url(#eyC)"><rect x="${cx - w}" y="${cy - w}" width="${w * 2}" height="${w * 2}" fill="url(#scleraG)"/>` +
    Array.from({ length: 14 }, (_, i) => { const sd = i < 7 ? -1 : 1, y0 = cy + (r() - .5) * h, x0 = cx + sd * w * .5; let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`, x = x0, y = y0; for (let k = 0; k < 4; k++) { x -= sd * w * (.05 + r() * .05); y += (r() - .5) * w * .06; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } return `<path d="${d}" stroke="#c0303a" stroke-width="${(1 + r() * 1.2).toFixed(1)}" fill="none" opacity="${(red * .7).toFixed(2)}"/>`; }).join('') +
    `<circle cx="${cx + w * .04}" cy="${cy - h * .1}" r="${w * .21}" fill="url(#irisG)"/><circle cx="${cx + w * .04}" cy="${cy - h * .1}" r="${w * .095}" fill="#080402"/>` +
    Array.from({ length: 18 }, (_, i) => { const a = i / 18 * 6.28; return `<path d="M${(cx + w * .04 + Math.cos(a) * w * .1).toFixed(1)},${(cy - h * .1 + Math.sin(a) * w * .1).toFixed(1)} L${(cx + w * .04 + Math.cos(a) * w * .2).toFixed(1)},${(cy - h * .1 + Math.sin(a) * w * .2).toFixed(1)}" stroke="#c89a50" stroke-width="1.2" opacity=".35"/>`; }).join('') +
    `<circle cx="${cx + w * .1}" cy="${cy - h * .3}" r="${w * .04}" fill="#fff" opacity=".9"/><path d="M${cx - w / 2},${cy - h * .6} Q${cx},${cy - h * 1.4} ${cx + w / 2},${cy - h * .6} L${cx + w / 2},${cy - h * 2} L${cx - w / 2},${cy - h * 2}Z" fill="#000" opacity=".22"/></g>` +
    `<path d="M${cx - w / 2},${cy} Q${cx - w * .1},${cy - h * 1.35} ${cx + w / 2},${cy - h * .1}" stroke="#3a2418" stroke-width="${w * .035}" fill="none"/>` +
    Array.from({ length: 9 }, (_, i) => { const k = (i + 1) / 10, x = lerp(cx - w * .45, cx + w * .45, k), y = cy - h * 1.2 * Math.sin(k * Math.PI) * .9; return `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w * .02).toFixed(1)},${(-w * .06).toFixed(1)} ${(w * .05).toFixed(1)},${(-w * .08).toFixed(1)}" stroke="#1a0e08" stroke-width="2" fill="none"/>`; }).join('') +
    `<path d="M${cx - w * .48},${cy + h * .2} Q${cx},${cy + h * 1.3} ${cx + w * .48},${cy}" stroke="#8a4a3a" stroke-width="${w * .02}" fill="none" opacity=".6"/>`;
  return s;
}
function virus(x, y, R, rot, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="rotate(${rot.toFixed(1)},${x.toFixed(1)},${y.toFixed(1)})">`;
  for (let i = 0; i < 12; i++) { const q = i / 12 * 6.28; s += `<path d="M${(x + Math.cos(q) * R).toFixed(1)},${(y + Math.sin(q) * R).toFixed(1)} L${(x + Math.cos(q) * R * 1.45).toFixed(1)},${(y + Math.sin(q) * R * 1.45).toFixed(1)}" stroke="#4a7a3a" stroke-width="${(R * .14).toFixed(1)}"/><circle cx="${(x + Math.cos(q) * R * 1.5).toFixed(1)}" cy="${(y + Math.sin(q) * R * 1.5).toFixed(1)}" r="${(R * .16).toFixed(1)}" fill="#c84a3a"/>`; }
  return s + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#virG)"/><circle cx="${(x - R * .3).toFixed(1)}" cy="${(y - R * .3).toFixed(1)}" r="${(R * .25).toFixed(1)}" fill="#fff" opacity=".35"/></g>`;
}

// ---------- the street of this video: five new buildings, new shops; day or night ----------
function blockN(x, base, w, h, col, seed, kind = 0) {
  const r = RS(seed), top = base - h, sw = w * .12, trim = mix(col, '#ffffff', .45), dk = mix(col, '#000000', .42);
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/>` + (kind === 1 ? `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#brk)"/>` : '') +
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".32"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#sunSide)"/>` +
    `<path d="M${x + w},${top} l${sw},${-sw * .4} l0,${h} l${-sw},${sw * .4}Z" fill="${dk}"/><path d="M${x},${top} l${sw},${-sw * .4} l${w},0 l${-sw},${sw * .4}Z" fill="${mix(col, '#ffffff', .3)}"/>` +
    `<rect x="${x - 4}" y="${top - 8}" width="${w + 8}" height="12" fill="${trim}"/><rect x="${x - 4}" y="${top + 4}" width="${w + 8}" height="5" fill="#000" opacity=".26"/>`;
  let e = '';
  const fh = kind === 2 ? 44 : 54, rows = Math.floor((h - 128) / fh), cols = Math.max(2, Math.round(w / (kind === 2 ? 75 : 46))), cw = w / cols;
  for (let i = 0; i < rows; i++) { const wy = top + 22 + i * fh;
    if (kind === 0) s += `<rect x="${x}" y="${wy + 40}" width="${w}" height="4" fill="${trim}" opacity=".6"/><rect x="${x}" y="${wy + 44}" width="${w}" height="2" fill="#000" opacity=".18"/>`;
    if (kind === 2) { s += `<rect x="${x + 6}" y="${wy}" width="${w - 12}" height="26" fill="#4a6a88"/><path d="M${x + 6},${wy + 22} L${x + w * .5},${wy} L${x + w * .62},${wy} L${x + 6},${wy + 26}Z" fill="#cfe6f8" opacity=".3"/><rect x="${x + 4}" y="${wy + 26}" width="${w - 8}" height="5" fill="${trim}"/>`; }
    for (let j = 0; j < cols; j++) { const wx = x + j * cw + cw / 2, lit = r() < .45, cur = r(), ww = kind === 2 ? cw - 6 : Math.min(24, cw * .52), wh = kind === 2 ? 26 : 32;
      if (kind === 2) { s += `<path d="M${wx + cw / 2},${wy} v26" stroke="${trim}" stroke-width="2"/>`; if (lit) e += `<rect x="${(wx - ww / 2).toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="26" fill="#ffd590" opacity="${(.75 + .25 * cur).toFixed(2)}"/>`; continue; }
      const arch = kind === 1 ? `<path d="M${wx - ww / 2},${wy + 8} A${ww / 2},${ww / 2 * .7} 0 0 1 ${wx + ww / 2},${wy + 8} Z" fill="#48688a"/>` : '';
      s += `<rect x="${wx - ww / 2 - 3}" y="${wy - 3}" width="${ww + 6}" height="${wh + 6}" fill="${trim}"/><rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" fill="#48688a"/>${arch}<path d="M${wx - ww / 2},${wy + wh * .7} L${wx - ww / 2},${wy} L${wx + ww * .2},${wy}Z" fill="#cfe6f8" opacity=".35"/><path d="M${wx},${wy} v${wh}" stroke="${trim}" stroke-width="1.6"/>` +
        `<rect x="${wx - ww / 2 - 5}" y="${wy + wh + 2}" width="${ww + 10}" height="4" fill="${trim}"/><rect x="${wx - ww / 2 - 4}" y="${wy + wh + 6}" width="${ww + 8}" height="3" fill="#000" opacity=".22"/>` +
        (cur < .3 ? `<rect x="${wx - ww / 2}" y="${wy}" width="${ww * .35}" height="${wh}" fill="#e8dcc0" opacity=".85"/>` : '') + (kind === 0 && cur > .82 ? `<rect x="${wx + ww / 2 + 3}" y="${wy + wh - 14}" width="16" height="12" fill="#e4e4e0"/><path d="M${wx + ww / 2 + 5},${wy + wh - 8} h12" stroke="#999" stroke-width="1"/>` : '');
      if (lit) e += `<rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" fill="${cur < .5 ? '#ffd27e' : '#ffe3b0'}" opacity="${(.8 + .2 * cur).toFixed(2)}"/>` + (cur < .3 ? `<rect x="${wx - ww / 2}" y="${wy}" width="${ww * .35}" height="${wh}" fill="#c87a3a" opacity=".55"/>` : '') + (cur > .9 ? `<ellipse cx="${wx + 3}" cy="${wy + wh - 6}" rx="5" ry="9" fill="#5a3a20" opacity=".7"/><circle cx="${wx + 3}" cy="${wy + wh - 18}" r="4" fill="#5a3a20" opacity=".7"/>` : ''); } }
  if (kind !== 2) s += roofKit(x, top - 8, w, seed);
  else s += `<rect x="${x + w * .2}" y="${top - 30}" width="${w * .5}" height="22" fill="#a8b0b8"/><rect x="${x + w * .2}" y="${top - 30}" width="${w * .5}" height="4" fill="#fff" opacity=".3"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${x + w * .24 + q * w * .1},${top - 26} v16" stroke="#7a828a" stroke-width="2"/>`).join('');
  return { s, e };
}
const SHOPN = [[-4, 150, 'حلويات', '#a8456a'], [158, 128, 'عطور', '#6a4a9a'], [298, 146, 'خضار', '#3f8a3a'], [456, 118, 'كتب', '#2a6a9a'], [586, 150, 'ملابس', '#b8642a']];
function shopRowN(PV) {
  let s = '', e = '';
  SHOPN.forEach(([sx, sw, name, c], i) => { const r = RS(i + 161), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`;
    e += `<rect x="${gx}" y="${PV - 72}" width="${gw}" height="66" fill="#ffd9a0" opacity=".42"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${mix(c, '#ffffff', .2)}" opacity=".7"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${gx},${PV} L${gx + gw},${PV} L${gx + gw + 30},${PV + 90} L${gx - 30},${PV + 90}Z" fill="#ffcf8a" opacity=".16" filter="url(#soft)"/>`; });
  return { s, e };
}
const PV = 1000, KB = 1104;
// o: {N (0 day..1 night), id, cars, fg: extra svg inside the filtered group, warp: displacement scale}
function street2(t, o = {}) {
  const N = o.N || 0, id = o.id || 's';
  const sky = [mix('#3a6fb8', '#060c24', N), mix('#93bbe2', '#16224a', N), mix('#ebe3d0', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .92)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>` +
    (o.warp ? `<filter id="wp${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${(.008 + .002 * Math.sin(t * 1.3)).toFixed(4)} ${(.016 + .003 * Math.cos(t * 1.1)).toFixed(4)}" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${o.warp.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>` : '') +
    `</defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(12); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 760).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    s += `<circle cx="560" cy="430" r="90" fill="#fff8e0" opacity="${(.14 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(560, 430, 30, N); }
  if (N < .98) s += `<circle cx="150" cy="470" r="150" fill="#fff6d0" opacity="${(.28 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="150" cy="470" r="30" fill="#fffdf2" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(230 + t * 1.2, 430, 230, 13, { a: .9 * (1 - N) }) + cumulus(560 + t * .8, 560, 170, 15, { a: .8 * (1 - N) });
  let g = farCity(34, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-10, 168, 330, '#d9c39c', 341, 0], [158, 142, 430, '#8e5a44', 342, 1], [300, 154, 372, '#a7aeb4', 343, 2], [454, 132, 300, '#c98f6a', 344, 0], [586, 150, 398, '#6f8a7c', 345, 1]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowN(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  [[110, 290, 7], [600, 262, 9]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// ===================== scenes =====================
// 0: the Earth spins, day after day, and you stay awake
function sceneHook(t) {
  const k = ease(ramp(t, .25, 2.75)), n = Math.min(10, 1 + Math.floor(k * 9.999)), az = .3 + t * .05;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.0 + t * 2.3, clouds: .5, lights: .8 } };
  F.earth = null; F.moon = null; F.sun = null;
  const a = ease(ramp(t, .1, .5));
  F.ov = `<g opacity="${a.toFixed(2)}">` + panel(160, 1010, 400, 170) + lbl(360, 1066, 'بلا نوم', 1, '#fff', 30) + lbl(440, 1140, 'اليوم', 1, '#fff', 40) + lbl(300, 1146, AR(n), 1, '#f4c76b', 76) +
    Array.from({ length: 10 }, (_, i) => `<circle cx="${(232 + i * 28).toFixed(0)}" cy="1166" r="6" fill="${i < n ? '#f4c76b' : 'rgba(255,255,255,.3)'}"/>`).join('').replace(/cy="1166"/g, 'cy="1170"') + `</g>`;
  return space(t);
}
// 1: one night: memory falls by about 40%
function sceneMem(t) {
  const T = t - S0(1), dr = ease(ramp(t, WS(1, 3) - .1, WS(1, 11) + .4));
  const hand = [426, 858];
  let mid = chair(560, 1068, 1.4) + SIT(560, 1068, 1.4, { lean: -8, lookUp: -.4, hF: hand, hB: [392, 860], lid: .35 + .2 * dr, bags: .6 });
  const H = HP.head;
  let s = room(t, { N: 1, day: 1, id: 'm', mid: deskItems(t, 1, 0) + mid, hh: 2, mm: 10 + T * 6 }) + lampLight(1) + scr(`<circle cx="${H[0] - 30}" cy="${H[1] + 10}" r="90" fill="url(#lampW)" opacity=".35"/>`);
  // letters fly from the book into the head; when memory drops, 2 in 5 fall away grey
  const LET = ['أ', '٧', 'ب', '٣', 'ج', '؟', 'د', '٩', 'هـ', '٥'];
  for (let i = 0; i < 10; i++) { const p = pmod(T * .55 + i / 10, 1), drop = (i % 5 < 2) && dr > .05 && p > .45, bx = 410, by = 846;
    let x = lerp(bx, H[0] - 18, p), y = lerp(by, H[1] - 6, p) - Math.sin(p * Math.PI) * 70, col = '#f4c76b', a = Math.sin(Math.min(p, .92) / .92 * Math.PI) * .95;
    if (drop) { const q = (p - .45) / .55; x = lerp(bx, H[0] - 18, .45) - q * 30; y = lerp(by, H[1] - 6, .45) - Math.sin(.45 * Math.PI) * 70 + q * q * 260; col = '#8a8a90'; a = (1 - q) * .9; }
    s += lbl(x.toFixed(1), y.toFixed(1), LET[i], a.toFixed(2), col, 30); }
  // memory panel (bottom)
  const pc = 1 - .4 * dr, a0 = ease(ramp(t, S0(1) + .2, S0(1) + .7)), bw = 440 * pc;
  s += `<g opacity="${a0.toFixed(2)}">` + panel(40, 1086, 640, 150) + lbl(560, 1132, 'الحفظ', 1, '#fff', 30) + `<rect x="${640 - 440}" y="1160" width="440" height="34" rx="17" fill="#2a2e44"/><rect x="${640 - bw}" y="1160" width="${bw.toFixed(1)}" height="34" rx="17" fill="#f4c76b"/>` +
    (dr > .02 ? `<rect x="${640 - 440}" y="1160" width="${(440 - bw).toFixed(1)}" height="34" rx="17" fill="#e0483a" opacity="${(.55 * dr).toFixed(2)}"/>` : '') +
    lbl(130, 1192, AR(Math.round(pc * 100)) + '٪', 1, dr > .5 ? '#ff8a7a' : '#f4c76b', 44) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 2: the brain washes itself in sleep; awake, the waste piles up
function sceneBrain(t) {
  const c = ease(ramp(t, WS(2, 2) - .3, WS(2, 3))) * (1 - ease(ramp(t, WS(2, 8) - .3, WS(2, 8) + .2))), g = ease(ramp(t, WS(2, 8), WS(2, 11) + .3)), asleep = t < WS(2, 8) - .05;
  let s = `<defs>${DEFN()}<radialGradient id="labB" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="#1e2a50"/><stop offset="1" stop-color="#070b1a"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#labB)"/>`;
  const r = RS(3); for (let i = 0; i < 24; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(10 + r() * 40).toFixed(1)}" fill="#6a8aff" opacity="${(.03 + .04 * r()).toFixed(3)}"/>`;
  s += `<g transform="translate(-34,40)">` + brainSVG(c, g, t, !asleep) + `</g>`;
  // sleep / awake badge
  const ba = ease(ramp(t, S0(2) + .1, S0(2) + .5));
  s += `<g opacity="${ba.toFixed(2)}">` + panel(40, 1060, 640, 130) + (asleep ? `<path d="M140,1098 a34,34 0 1 0 30,52 a26,26 0 1 1 -30,-52Z" fill="#f4e6b0"/>` + lbl(250, 1110, 'ز', .8, '#cfe4ff', 26) + lbl(272, 1092, 'ز', .6, '#cfe4ff', 20) + lbl(470, 1140, 'وأنتَ نائم: ينظّف', 1, '#7fd4ff', 38)
    : `<path d="M110,1125 q40,-34 80,0 q-40,32 -80,0Z" fill="#f4eee6"/><circle cx="150" cy="1125" r="13" fill="#3a2210"/><circle cx="153" cy="1121" r="3" fill="#fff"/>` + lbl(460, 1140, 'بلا نوم: تتراكم', 1, '#e8b070', 38)) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 3: day 2: a microsleep while pouring water, eyes open
function sceneMicro(t) {
  const m0 = WS(3, 8) - .15, m1 = WS(3, 10) - .25, bl = ease(ramp(t, m0, m0 + .3)) * (1 - ease(ramp(t, m1 - .25, m1))), after = t > m1 - .25;
  const pour = after ? 0 : 1, fill = after ? 1 : clamp((t - S0(3) - .3) / 6) * .7, over = after ? ease(ramp(t, m1 - .25, m1 + 1.2)) : 0;
  const jolt = after ? Math.exp(-(t - m1) * 5) * Math.sin((t - m1) * 30) * 6 : 0;
  // the jug in the hand, the mug on the desk
  const mx = 196, my = 866, jx = 262, jy = 760;
  let mid = deskItems(t, 0, 0, { noBook: 1 });
  const P = hero(470, 1068, Object.assign({ s: 1.4, face: -1, shade: 1, lean: -6 + jolt * .4, lookUp: -.5, hF: [jx + 20, jy + 10], hB: [404, 866], lid: .5, bags: .9 }, YOU));
  let jug = `<g transform="rotate(${pour ? -38 : -8},${jx + 20},${jy + 10})"><path d="M${jx - 30},${jy - 40} L${jx + 24},${jy - 40} L${jx + 30},${jy + 36} L${jx - 34},${jy + 36}Z" fill="#cfe6f4" opacity=".75"/><path d="M${jx - 30},${jy - 40} L${jx - 44},${jy - 50}" stroke="#cfe6f4" stroke-width="6"/><rect x="${jx - 32}" y="${jy - 6}" width="62" height="42" fill="#5aa6d8" opacity=".55"/><path d="M${jx + 26},${jy - 30} q22,8 18,34 q-2,14 -18,16" stroke="#9ab8c8" stroke-width="6" fill="none"/><path d="M${jx - 22},${jy - 34} L${jx - 24},${jy + 30}" stroke="#fff" stroke-width="4" opacity=".5"/></g>`;
  mid += P + jug;
  // the stream, the mug filling and overflowing, the puddle
  let w = '';
  if (pour || over < 1) w += `<path d="M${jx - 44 + 12},${jy - 30} Q${mx + 6},${jy - 10} ${mx + 2},${my - 34}" stroke="#7ac0ea" stroke-width="7" fill="none" opacity="${(.85 * (1 - over * .8)).toFixed(2)}"/>`;
  w += `<rect x="${mx - 13}" y="${(my - 4 - 30 * fill).toFixed(1)}" width="26" height="${(30 * fill).toFixed(1)}" fill="#5aa6d8" opacity=".75"/>`;
  if (over > 0) w += `<path d="M${mx - 16},${my - 34} q-6,12 -4,34 M${mx + 16},${my - 34} q8,14 6,34" stroke="#7ac0ea" stroke-width="5" fill="none" opacity=".8"/><ellipse cx="${mx}" cy="${my + 2}" rx="${(30 + 120 * over).toFixed(1)}" ry="${(4 + 4 * over).toFixed(1)}" fill="#7ac0ea" opacity=".7"/><path d="M${mx + 100 * over},${my + 6} v${(over * 60).toFixed(1)}" stroke="#7ac0ea" stroke-width="4" opacity="${over.toFixed(2)}"/><path d="M${mx - 80 * over},${my + 6} v${(over * 40).toFixed(1)}" stroke="#7ac0ea" stroke-width="3" opacity="${over.toFixed(2)}"/>` +
    `<ellipse cx="${mx}" cy="1040" rx="${(80 * over).toFixed(1)}" ry="${(10 * over).toFixed(1)}" fill="#7ac0ea" opacity=".55"/>`;
  let s = room(t, { N: 0, day: 2, id: 'u', mid: mid + w, hh: 8, mm: 15 + (t - S0(3)) * 4 }) + sunBeam(1);
  // the blackout: the world goes dark for 3 seconds, the eye stays open
  if (bl > 0) { const secs = Math.min(3, Math.max(0, Math.floor((t - m0) / ((m1 - m0) / 3)) + 1));
    s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity="${(bl * .97).toFixed(2)}"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#vigB)" opacity="${bl.toFixed(2)}"/>` +
      `<g opacity="${bl.toFixed(2)}">` + bigEye(360, 700, 300, 1, .8) + `<circle cx="360" cy="1010" r="44" fill="none" stroke="#2a2e44" stroke-width="8"/><circle cx="360" cy="1010" r="44" fill="none" stroke="#f4c76b" stroke-width="8" stroke-dasharray="${(276.5 * clamp((t - m0) / (m1 - m0 - .25))).toFixed(1)} 300" transform="rotate(-90,360,1010)"/>` + lbl(360, 1100, 'غفوة: ٣ ثوانٍ', 1, '#f4c76b', 46) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// 4: the immune system weakens: 4x more colds
function sceneImm(t) {
  const T = t - S0(4), sn = WS(4, 9) - .1, sk = ramp(t, sn, sn + 1.6), ch = ease(ramp(t, WS(4, 2) - .1, WS(4, 2) + .4)), b2 = ease(ramp(t, WS(4, 10) - .2, WS(4, 12) + .2));
  const x = 250 + T * 18, ph = T * 5.4, sneeze = sk > 0 && sk < 1 ? Math.sin(sk * Math.PI) : 0;
  let fg = hero(x, PV + 70, Object.assign({ s: .62, face: 1, shade: 1, walk: sk > 0 && sk < 1 ? null : ph, lean: sneeze * 18, lookUp: sneeze * -.8, lid: .55, bags: 1 }, YOU, { top: '#5a6a8a' }));
  const H = HP.head;
  fg += hero(600 - T * 30, PV + 82, Object.assign({ s: .58, face: -1, walk: T * 5 + 1, shade: 1 }, pal(1)));
  // the sneeze cloud and floating viruses
  if (sk > 0) { const r = RS(9); for (let i = 0; i < 22; i++) { const d = sk * (60 + r() * 120), a = -.4 + r() * .8, px = H[0] + 14 + Math.cos(a) * d, py = H[1] + 14 + Math.sin(a) * d * .7 + sk * 20; fg += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(3 + r() * 6).toFixed(1)}" fill="url(#dropG)" opacity="${((1 - sk) * .9).toFixed(2)}"/>`; } }
  let s = street2(t, { N: 0, id: 'i', fg, cars: 1 });
  const va = ease(ramp(t, WS(4, 0), WS(4, 1) + .3)); for (let i = 0; i < 6; i++) { const r = RS(i + 40); s += virus(60 + i * 110 + r() * 40 + Math.sin(t + i) * 18, 760 + r() * 180 + Math.cos(t * .8 + i) * 14, 13 + r() * 8, t * 20 + i * 40, va * (.7 + .3 * r())); }
  // the chart: under 6 h vs 7 h+
  s += `<g opacity="${ch.toFixed(2)}">` + panel(40, 400, 520, 268) + lbl(300, 446, 'خطرُ الإصابةِ بالزكام', 1, '#fff', 30) +
    lbl(420, 506, 'نومٌ ٧ ساعات أو أكثر', 1, '#cfe9d8', 24) + `<rect x="${540 - 110}" y="520" width="110" height="40" rx="8" fill="#7fc8a0"/>` + lbl(485, 549, 'مرّة', 1, '#fff', 25) +
    lbl(420, 596, 'نومٌ أقلّ من ٦ ساعات', 1, '#ffb0a8', 24) + `<rect x="${(540 - 110 - 330 * b2).toFixed(1)}" y="610" width="${(110 + 330 * b2).toFixed(1)}" height="40" rx="8" fill="#e0483a"/>` + (b2 > .3 ? lbl((540 - 110 - 330 * b2 + 62).toFixed(1), 639, '٤ مرّات', b2, '#fff', 25) : '') + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 5: day 3: hallucinations: a road sign becomes a person; the street ripples
function sceneHallu(t) {
  const h = ease(ramp(t, WS(5, 3), WS(5, 5) + .2)), fig = ease(ramp(t, WS(5, 6) - .3, WS(5, 6) + .5)), thg = ease(ramp(t, WS(5, 7) - .2, WS(5, 8)));
  const gone = ease(ramp(t, WS(5, 9) + .1, WS(5, 9) + .7)), fl = gone > 0 && gone < 1 ? (Math.floor(t * 30) % 3 === 0 ? .2 : 1) : 1;
  const sway = Math.sin(t * 1.3) * 4;
  let top = hero(200, PV + 70, Object.assign({ s: .7, face: 1, shade: 1, lean: sway, lookUp: .1, lid: .7, bags: 1 }, YOU, { top: '#5a6a8a' })), fg = '';
  // the road sign (real), and the shadow person it turns into
  const sx = 440, sa = 1 - fig * (1 - gone);
  fg += `<g opacity="${sa.toFixed(2)}"><rect x="${sx - 3}" y="${PV - 210}" width="6" height="290" fill="#6a6e76"/><circle cx="${sx}" cy="${PV - 210}" r="34" fill="#2a5aa8" stroke="#fff" stroke-width="5"/><path d="M${sx - 16},${PV - 210} h26 m-10,-12 l12,12 l-12,12" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const fa = fig * (1 - gone) * fl;
  if (fa > .01) { const ghost = hero(sx, PV + 80, { s: .9, face: -1, top: '#0a0c14', pants: '#06070c', skin: '#0a0c14', hair: '#06070c', noShadow: 1, lean: Math.sin(t * 2) * 3 });
    top += `<ellipse cx="${sx}" cy="${PV + 40}" rx="70" ry="160" fill="#000" opacity="${(fa * .25).toFixed(2)}" filter="url(#blur12)"/><g opacity="${(fa * .95).toFixed(2)}">${ghost}</g>` + `<circle cx="${HP.eye[0].toFixed(1)}" cy="${HP.eye[1].toFixed(1)}" r="3.5" fill="#ffeeb0" opacity="${fa.toFixed(2)}"/><circle cx="${HP.eye[0].toFixed(1)}" cy="${HP.eye[1].toFixed(1)}" r="10" fill="#ffd27a" opacity="${(fa * .35).toFixed(2)}" filter="url(#blur2)"/>`; }
  let s = street2(t, { N: 1, id: 'h', fg, top, cars: 1, carX: 640, warp: (h * 14 + thg * 10) * (1 - gone) });
  // "things": drifting coloured shapes in the air
  const ta = thg * (1 - gone) * fl;
  if (ta > .01) for (let i = 0; i < 9; i++) { const r = RS(i + 80), x = 60 + r() * 600 + Math.sin(t * .9 + i) * 30, y = 720 + r() * 300 + Math.cos(t * .7 + i * 2) * 26, R = 14 + r() * 20, c = ['#ff6ad5', '#6af0ff', '#ffe46a', '#9a7aff'][i % 4];
    s += `<g opacity="${(ta * .55).toFixed(2)}" transform="rotate(${(t * 40 + i * 30).toFixed(1)},${x.toFixed(1)},${y.toFixed(1)})"><path d="M${x - R},${y} Q${x},${y - R * 1.4} ${x + R},${y} Q${x},${y + R * 1.4} ${x - R},${y}Z" fill="${c}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(R * .35).toFixed(1)}" fill="#fff" opacity=".6"/></g>`; }
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#vigB)" opacity="${(.35 + .25 * h * (1 - gone)).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// 6: the last days: 100 minus 7… and you stop at 65
function sceneCount(t) {
  const a0 = ease(ramp(t, WS(6, 3) - .2, WS(6, 3) + .3)), q = ease(ramp(t, WS(6, 11) - .1, WS(6, 12) + .2));
  const nums = [[100, WS(6, 6) - .1], [93, WS(6, 7) + .05], [86, WS(6, 7) + .45], [79, WS(6, 8) - .05], [72, WS(6, 9)], [65, WS(6, 10)]];
  const sway = Math.sin(t * 1.1) * 5;
  let mid = deskItems(t, 1, 1) + chair(560, 1068, 1.4) + SIT(560, 1068, 1.4, { lean: -14 + sway, lookUp: -1.1 * (.4 + .6 * q), hF: [440, 862], hB: [400, 864], lid: .85, bags: 1.2 });
  const H = HP.head;
  let s = room(t, { N: 1, day: 10, id: 'c', mid, hh: 4, mm: 20 + (t - S0(6)) * 3 }) + lampLight(1, .8);
  // the subtraction panel: numbers right to left, two rows
  const pos = [[470, 482], [320, 482], [170, 482], [470, 588], [320, 588], [170, 588]];
  s += `<g opacity="${a0.toFixed(2)}">` + panel(40, 386, 520, 232);
  nums.forEach(([n, at], i) => { const k = ease(ramp(t, at, at + .25)); if (k <= 0) return; const [x, y] = pos[i], dim = 1 - .55 * q;
    s += `<g opacity="${(k * dim).toFixed(2)}">` + lbl(x, y + (1 - k) * 16, AR(n), 1, i === 5 ? '#ff9a8a' : '#f4c76b', 64) + `</g>`;
    if (i > 0) { const [px] = pos[i - 1], mx = i === 3 ? 400 : (px + x) / 2, my = i === 3 ? 528 : y - 62; s += `<g opacity="${(k * .9 * dim).toFixed(2)}"><rect x="${mx - 36}" y="${my - 19}" width="72" height="28" rx="8" fill="#2a2e44"/><text x="${mx}" y="${my + 2}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#cfd8ff">ناقص ٧</text></g>`; } });
  if (q > 0) s += lbl(85, 594, '؟', q, '#fff', 90);
  s += `</g>`;
  // a thought bubble above the drooping head
  if (q > 0) s += `<g opacity="${q.toFixed(2)}"><circle cx="${H[0] - 26}" cy="${H[1] - 40}" r="7" fill="#f4f1e8"/><circle cx="${H[0] - 42}" cy="${H[1] - 62}" r="11" fill="#f4f1e8"/><ellipse cx="${H[0] - 76}" cy="${H[1] - 104}" rx="54" ry="36" fill="#f4f1e8"/>` + lbl(H[0] - 76, H[1] - 89, '…؟', 1, '#2a2a2a', 42) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 7: the real record: 11 days awake (1964), then 14 hours of sleep, and he woke up fine
function bed(N) {
  return `<rect x="40" y="800" width="34" height="230" rx="6" fill="#5a3a26"/><rect x="40" y="800" width="10" height="230" fill="#fff" opacity=".12"/><rect x="620" y="900" width="26" height="130" rx="5" fill="#5a3a26"/>` +
    `<rect x="60" y="940" width="580" height="60" rx="10" fill="#efe9dc"/><rect x="60" y="990" width="580" height="22" fill="#6a4630"/><rect x="60" y="1008" width="580" height="8" fill="#000" opacity=".3"/>` +
    `<path d="M78,936 Q80,898 130,896 L200,900 Q226,904 222,936 Q220,950 150,950 Q90,952 78,936Z" fill="#f8f6f0"/><path d="M90,940 Q150,948 216,936" stroke="#d8d2c4" stroke-width="3" fill="none"/>`;
}
function blanket(x0, x1, top, legs) {
  return `<path d="M${x0},${top + 8} Q${x0 + 20},${top - 6} ${x0 + 60},${top} Q${(x0 + x1) / 2},${top - 18 + (legs ? 10 : 0)} ${x1 - 40},${top + (legs ? 4 : 0)} Q${x1 + 6},${top + 6} ${x1 + 10},${top + 40} L${x1 + 14},1008 L${x0 - 6},1008 Q${x0 - 14},${top + 40} ${x0},${top + 8}Z" fill="#3a6a9a"/>` +
    `<path d="M${x0},${top + 8} Q${x0 + 20},${top - 6} ${x0 + 60},${top} Q${(x0 + x1) / 2},${top - 18 + (legs ? 10 : 0)} ${x1 - 40},${top + (legs ? 4 : 0)}" stroke="#fff" stroke-width="5" fill="none" opacity=".25"/>` +
    Array.from({ length: 5 }, (_, q) => `<path d="M${x0 + 40 + q * (x1 - x0 - 60) / 4},${top + 10} q-10,40 6,80" stroke="#1a3a5a" stroke-width="3" fill="none" opacity=".4"/>`).join('') + `<rect x="${x0 - 8}" y="${top + 6}" width="${x1 - x0 + 22}" height="${1008 - top - 6}" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
}
function sceneRecord(t) {
  const sl = WS(7, 11) - .25, up = WS(7, 17) - .2;
  if (t < sl) { // awake for 11 days: the window cycles day and night, the calendar flips
    const k = clamp((t - (S0(7) + .4)) / (WS(7, 8) - S0(7) - .3)), d = 1 + Math.min(10, Math.floor(k * 11)), fr = pmod(k * 11, 1), N = .5 + .5 * Math.cos(k * 11 * Math.PI * 2);
    const sway = Math.sin(t * 1.2) * 6;
    const mid = hero(560, 1080, Object.assign({ s: 1.35, face: -1, shade: 1, lean: sway, lookUp: -.4, lid: .5 + .3 * k, bags: 1, aF: [.25, -.4], aB: [-.1, .3] }, YOU));
    let s = room(t, { N: N * .9, day: d, flip: k > 0 && k < 1 ? fr : 0, id: 'a', mid: deskItems(t, N, 1) + mid, hh: Math.floor(k * 264) % 12, mm: (k * 264 * 60) % 60 }) + lampLight(N * .9) + sunBeam(1 - N);
    s += `<g opacity="${ease(ramp(t, WS(7, 5) - .3, WS(7, 5) + .2)).toFixed(2)}">` + panel(40, 1090, 640, 120) + lbl(470, 1166, hlab(d * 24), 1, '#f4c76b', 50) + lbl(150, 1162, 'عام ١٩٦٤', 1, '#fff', 34) + `</g>`;
    noEarth(); F.ov = ''; return s;
  }
  // in bed: 14 hours; at sunrise he sits up, fine
  const hk = clamp((t - sl - .3) / (up - sl - .4)), N = t < up ? 1 : 1 - ease(ramp(t, up, up + .8)), wake = ease(ramp(t, up, up + .5));
  let mid = bed(N);
  if (wake < 1) { const P = hero(330, 1090, Object.assign({ s: 1.1, face: 1, rot: -90, pv: -165, closed: 1, noShadow: 1, aF: [.1, .2], aB: [-.1, .1] }, YOU)); mid += `<g opacity="${(1 - wake).toFixed(2)}">${P}${blanket(220, 600, 900, 0)}</g>`; }
  if (wake > 0) { const P = hero(270, 952, Object.assign({ s: 1.1, face: 1, shade: 1, lF: [1.5708, 1.5708], lB: [1.5708, 1.5708], noShadow: 1, hF: [300, 952 - 236], hB: [250, 952 - 240], lookUp: .3 }, YOU)); mid += `<g opacity="${wake.toFixed(2)}">${P}${blanket(250, 600, 922, 1)}</g>`; }
  let s = room(t, { N: N * .95, day: 12, id: 'b', mid, hh: 8 + hk * 14, mm: (hk * 14 * 60) % 60 }) + sunBeam(1 - N);
  // the sleeping Zs and the 14-hour counter
  if (wake < 1) for (let i = 0; i < 3; i++) { const p = pmod((t - sl) * .6 + i / 3, 1); s += lbl((250 + p * 90 + i * 6).toFixed(1), (880 - p * 130).toFixed(1), 'ز', ((1 - p) * (1 - wake)).toFixed(2), '#cfe4ff', 28 + i * 6); }
  s += `<g opacity="${ease(ramp(t, sl, sl + .4)).toFixed(2)}">` + panel(40, 1090, 640, 120) + lbl(470, 1166, hlab(Math.max(1, Math.round(hk * 14))), 1, '#f4c76b', 50) + lbl(150, 1162, wake > .5 ? 'بخير' : 'نوم', 1, wake > .5 ? '#9ff0b8' : '#cfe4ff', 38) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 8: the closing Earth
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(8)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 7) - .3, WS(8, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMem }, { s: S0(2) - .2, f: sceneBrain }, { s: S0(3) - .2, f: sceneMicro }, { s: S0(4) - .2, f: sceneImm }, { s: S0(5) - .2, f: sceneHallu }, { s: S0(6) - .2, f: sceneCount }, { s: S0(7) - .2, f: sceneRecord }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneBrain, sceneCount, sceneMem]);
const XF = .5;
const TLI = [['اليوم ١', S0(1)], ['اليوم ٢', S0(3)], ['اليوم ٣', S0(5)], ['اليوم ١٠', S0(6)]];
const LIST_ON = new Set([sceneMem, sceneMicro, sceneHallu, sceneCount]);
const CHIPS = [
  ['c1', 'ليلةٌ واحدة… ذاكرةٌ أضعف', 360, 330, 'big', WS(1, 3), S0(2) - .3], ['c2', 'الدماغُ ينظّفُ نفسَه في النوم', 360, 330, 'big', WS(2, 2), WS(2, 8) - .2], ['c2b', 'بلا نوم: تتراكمُ الفضلات', 360, 330, 'red big', WS(2, 10), S0(3) - .3],
  ['c3', 'غفوةٌ رغماً عنك', 360, 330, 'big', WS(3, 5), WS(3, 10) - .2], ['c3b', 'والعينانِ مفتوحتان!', 360, 330, 'red big', WS(3, 10), S0(4) - .3],
  ['c4', 'المناعةُ تضعف', 360, 330, 'red big', WS(4, 0), WS(4, 8)], ['c4b', 'زكامٌ أكثرَ بأربعِ مرّات', 360, 330, 'big', WS(4, 11), S0(5) - .3],
  ['c5', 'هلوسة', 360, 330, 'red big', WS(5, 4), S0(6) - .3], ['c6', 'تنسى ما كنتَ تفعله', 360, 330, 'big', WS(6, 12), S0(7) - .3],
  ['c7', 'أحدَ عشرَ يوماً بلا نوم', 360, 330, 'big', WS(7, 6), WS(7, 11) - .3], ['c7b', 'نامَ ١٤ ساعةً فقط', 360, 330, 'big', WS(7, 13), WS(7, 17) - .2], ['c7c', 'واستيقظَ بخير', 360, 330, 'big', WS(7, 17), S0(8) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا نوم</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
