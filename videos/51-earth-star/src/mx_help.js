// ===================== "what if the Moon exploded?" (Short #43) =====================
// gl3d_mx.js (from gl3d_bs.js, mirror fix and 3D-fade fix kept): the moon slot is the real Moon again, with `crack` (glowing fissures);
// w.debris = instanced irregular rocks {c, k (clump radius), spread (0 clump → 1 ring), R, tilt, th0, size, hot, gather, n}; w.dust = a dust ring {R, a, tilt, col}.
const MDEF = `<radialGradient id="flashG"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".25" stop-color="#ffe6b0" stop-opacity=".75"/><stop offset=".6" stop-color="#ff9a4a" stop-opacity=".25"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="metG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".85" stop-color="#ffe2a8" stop-opacity=".8"/><stop offset="1" stop-color="#ffffff" stop-opacity="1"/></linearGradient>` +
  `<linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f8fc0"/><stop offset="1" stop-color="#0f3c62"/></linearGradient>` +
  `<linearGradient id="deepG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a4a78"/><stop offset=".55" stop-color="#0a2a4a"/><stop offset="1" stop-color="#06182c"/></linearGradient>` +
  `<linearGradient id="rayG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe6ff" stop-opacity=".22"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="wallG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8276"/><stop offset=".5" stop-color="#b0a898"/><stop offset="1" stop-color="#6a645a"/></linearGradient>` +
  `<filter id="ringT" x="-5%" y="-30%" width="110%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".9 .02" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .9  0 0 0 0 .88  0 0 0 0 .84  0 0 0 1.4 -.35"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const MDEFS = () => `${DEFS()}${WDEF}${MDEF}`;
function camPt(c, x, y, z) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], nrm = a => { const l = Math.hypot(...a); return a.map(v => v / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), fp = 640 / Math.tan(c.fov * Math.PI / 360), a = (x - 360) / fp * z, b = -(y - 640) / fp * z;
  return [0, 1, 2].map(i => c.pos[i] + f[i] * z + r[i] * a + u[i] * b);
}
const fpx = c => 640 / Math.tan(c.fov * Math.PI / 360);
const ringPt = (R, th, tl) => [Math.cos(th) * R, -Math.sin(th) * R * Math.sin(tl), Math.sin(th) * R * Math.cos(tl)];
const NOFAR = [-99, -99, -99];

// ---------- a drawn person looking up, standing on the pavement ----------
const looker = (x, y, s, f, pi, k, t, o = {}) => hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: .75 * k }, palS(pi), o));
// ---------- meteors: bright heads with tapering tails ----------
function meteors(t, t0, n, a, seed) {
  if (a <= 0) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const st = t0 + r() * 5.5, life = .55 + r() * .5, k = (t - st) / life, x0 = 40 + r() * 640, y0 = 120 + r() * 420, an = 2.1 + r() * .5, L = 140 + r() * 180;
    if (k < 0 || k > 1) continue; const hx = x0 + Math.cos(an) * L * k, hy = y0 + Math.sin(an) * L * k, tl = Math.min(L * k, 120), tx = hx - Math.cos(an) * tl, ty = hy - Math.sin(an) * tl, op = a * Math.sin(Math.PI * k);
    s += `<path d="M${tx.toFixed(1)},${ty.toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}" stroke="#ffd9a0" stroke-width="5" opacity="${(op * .3).toFixed(2)}" filter="url(#blur2)"/><path d="M${tx.toFixed(1)},${ty.toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}" stroke="#fff6e0" stroke-width="2" stroke-linecap="round" opacity="${(op * .9).toFixed(2)}"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="3" fill="#fff" opacity="${op.toFixed(2)}"/>`; }
  return s;
}
// ---------- the ring seen from the ground: a pale band across the night sky ----------
function skyRing(a) {
  if (a <= 0) return '';
  return `<g opacity="${a.toFixed(2)}"><path d="M-60,560 Q360,40 780,520" stroke="#e8e0d0" stroke-width="46" fill="none" opacity=".16" filter="url(#soft)"/><path d="M-60,560 Q360,40 780,520" stroke="#ece6da" stroke-width="30" fill="none" filter="url(#ringT)" opacity=".75"/>` +
    `<path d="M-60,572 Q360,52 780,532" stroke="#2a2a3a" stroke-width="5" fill="none" opacity=".35"/><path d="M-60,548 Q360,28 780,508" stroke="#fff8ea" stroke-width="2" fill="none" opacity=".35"/></g>`;
}
// ---------- coral reef (drawn): branching coral, brain coral domes, sea fans ----------
function branchC(x, y, h, seed, col, sh) {
  const r = RS(seed); let s = '';
  const br = (x0, y0, an, L, w, d) => { const x1 = x0 + Math.cos(an) * L, y1 = y0 + Math.sin(an) * L, cx = (x0 + x1) / 2 + (r() - .5) * L * .2, cy = (y0 + y1) / 2;
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${sh}" stroke-width="${(w + 2).toFixed(1)}" stroke-linecap="round" fill="none"/><path d="M${(x0 - w * .2).toFixed(1)},${y0.toFixed(1)} Q${(cx - w * .2).toFixed(1)},${cy.toFixed(1)} ${(x1 - w * .2).toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${(w * .7).toFixed(1)}" stroke-linecap="round" fill="none"/>`;
    if (d > 0) { const n = 2 + (r() > .5 ? 1 : 0); for (let i = 0; i < n; i++) br(x1, y1, an + (i - (n - 1) / 2) * .5 + (r() - .5) * .3, L * (.7 + r() * .15), w * .72, d - 1); }
    else s += `<circle cx="${x1.toFixed(1)}" cy="${y1.toFixed(1)}" r="${(w * .5).toFixed(1)}" fill="${mix(col, '#ffffff', .35)}"/>`; };
  br(x, y, -Math.PI / 2, h * .32, h * .09, 3); return s;
}
function brainC(x, y, rw, rh, seed, c1, c2) {
  const d = `M${x - rw},${y} C${x - rw},${y - rh * 1.3} ${x + rw},${y - rh * 1.3} ${x + rw},${y} Z`, r = RS(seed);
  let s = litRock(d, 'br' + seed, c1, c2, seed, { fx: .05, fy: .05, sc: 3, az: 225, el: 40, k1: 1.25 });
  for (let i = 0; i < 7; i++) { const yy = y - rh * (.12 + i * .13), ww = rw * Math.sqrt(Math.max(0, 1 - Math.pow((y - yy) / (rh * .98), 2))) * .92; let p = `M${(x - ww).toFixed(1)},${yy.toFixed(1)}`;
    for (let k = 1; k <= 10; k++) p += ` Q${(x - ww + (k - .5) * ww / 5).toFixed(1)},${(yy + (k % 2 ? -5 : 5) + (r() - .5) * 3).toFixed(1)} ${(x - ww + k * ww / 5).toFixed(1)},${yy.toFixed(1)}`;
    s += `<path d="${p}" stroke="#000" stroke-opacity=".22" stroke-width="2.2" fill="none"/>`; }
  return s + `<ellipse cx="${x}" cy="${y + 2}" rx="${rw * 1.05}" ry="7" fill="#000" opacity=".3" filter="url(#blur2)"/>`;
}
function seaFan(x, y, h, seed, col) {
  const r = RS(seed); let s = '';
  for (let i = 0; i < 26; i++) { const an = -Math.PI / 2 + (i / 25 - .5) * 1.7, L = h * (.55 + .45 * r()); s += `<path d="M${x},${y} Q${(x + Math.cos(an) * L * .5 + (r() - .5) * 10).toFixed(1)},${(y + Math.sin(an) * L * .5).toFixed(1)} ${(x + Math.cos(an) * L).toFixed(1)},${(y + Math.sin(an) * L).toFixed(1)}" stroke="${col}" stroke-width="${(1.6 + r()).toFixed(1)}" fill="none" opacity=".85"/>`; }
  for (let k = 1; k < 5; k++) s += `<path d="M${(x - h * .55 * k / 5).toFixed(1)},${(y - h * .5 * k / 5).toFixed(1)} Q${x},${(y - h * .95 * k / 5).toFixed(1)} ${(x + h * .55 * k / 5).toFixed(1)},${(y - h * .5 * k / 5).toFixed(1)}" stroke="${col}" stroke-width="1.2" fill="none" opacity=".5"/>`;
  return s;
}

