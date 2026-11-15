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

// ===================== scenes =====================
const TE = () => WS(0, 3) + .12;   // the moment the Moon breaks
// 0: the Earth and the Moon; cracks glow and the Moon bursts into rocks
function sceneHook(t) {
  const G = gW(t, { d: 7.4, el: .2, lon: 25 - t * 3, tg: [0, .64, 0], clouds: .45, lights: .3 }), fp = fpx(G.cam);
  const mp = camPt(G.cam, 520, 345, 5.2), mr = 84 * 5.2 / fp, te = TE(), [mx, my] = proj3(G.cam, mp);
  if (t < te) F.w.moon = { pos: mp, L: F.w.L, shC: NOFAR, shR: .001, r: mr, crack: ease(ramp(t, WS(0, 2) - .25, te)), rot: t * .05 };
  else F.w.debris = { c: mp, k: mr * (1.1 + 2.6 * (1 - Math.exp(-(t - te) * 1.4))), size: mr * .065, hot: .55 * Math.pow(1 - ramp(t, te, te + .9), 2), n: .5 };
  F.flash = t > te ? .38 * Math.pow(1 - ramp(t, te, te + .3), 2) : 0;
  let o = `<defs>${MDEFS()}</defs>`;
  if (t > te - .05) { const k = ramp(t, te, te + 1.4); o += `<circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${(90 + 260 * k).toFixed(1)}" fill="url(#flashG)" opacity="${(.9 * (1 - k)).toFixed(2)}"/>` + ring(mx, my, ramp(t, te, te + 1.1), 60, 420, '#ffd9a0'); }
  F.ov = o; return space(t);
}
// 1: blowing it apart takes all the energy the Sun gives out in five minutes
function sceneEnergy(t) {
  const T = t - S0(1) + .2, cam = orbit(7.2 - T * .08, 0, 0, [0, 0, 0], 30), m = ease(ramp(t, WS(1, 5), WS(1, 10) + .3));
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: [0, .5, 0], r: .62, a: 1, hue: 0, g: 6, ts: 1.5 } }; F.earth = F.moon = F.sun = null;
  const a = ease(ramp(t, S0(1), S0(1) + .5)), sec = Math.round(300 * m), tm = `${AR(Math.floor(sec / 60))}:${AR(String(sec % 60).padStart(2, '0'))}`;
  F.ov = `<defs>${MDEFS()}</defs><g opacity="${a.toFixed(2)}">` + panel(90, 930, 540, 250, 1) + lbl(360, 980, 'كلُّ طاقةِ الشمس', 1, '#ffd86a', 30) +
    lbl(360, 1062, tm, 1, '#fff', 72) + `<rect x="130" y="1100" width="460" height="24" rx="12" fill="#ffffff" opacity=".14"/><rect x="${(590 - 460 * m).toFixed(1)}" y="1100" width="${(460 * m).toFixed(1)}" height="24" rx="12" fill="#f4c76b"/>` +
    lbl(360, 1160, 'دقائق', 1, '#c8d4e8', 24) + `</g>`;
  return space(t);
}
// 2: more than 300,000 times the asteroid that ended the dinosaurs
function sceneDino(t) {
  noEarth(); const T = t - S0(2) + .2, a1 = ease(ramp(t, WS(2, 5) - .2, WS(2, 6) + .3)), g = ease(ramp(t, WS(2, 3) - .2, WS(2, 10)));
  let s = space(t) + `<defs>${MDEFS()}</defs>`;
  // one rock = the dinosaur asteroid, then the field fills with copies (each dot = many)
  const rd = `M150,560 C130,520 160,488 196,492 C226,486 252,506 250,540 C256,574 236,604 200,606 C168,612 146,592 150,560Z`;
  s += `<g opacity="${a1.toFixed(2)}" transform="translate(${(-40 * g).toFixed(1)},0)">` + litRock(rd, 'ast', '#9a8a7a', '#4a4038', 31, { fx: .06, fy: .06, sc: 4, az: 225, el: 40 }) +
    `<path d="${rd}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="2"/>` + lbl(200, 660, 'نيزكُ الديناصورات', 1, '#ffd0a0', 28) + `</g>`;
  if (g > 0) { const r = RS(9), n = Math.floor(900 * g); let d = '';
    for (let i = 0; i < n; i++) { const an = r() * 6.283, rr = Math.sqrt(r()) * 250, x = 500 + Math.cos(an) * rr * .8, y = 600 + Math.sin(an) * rr, z = 2 + r() * 2.6;
      d += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${z.toFixed(1)}" ry="${(z * .8).toFixed(1)}" fill="${mix('#c8b8a4', '#5a5048', r())}"/>`; }
    s += `<g opacity="${clamp(g * 2).toFixed(2)}">${d}</g>`; }
  const c = ease(ramp(t, WS(2, 1), WS(2, 5)));
  s += lbl(360, 1010, `×${AR(Math.round(300 * c))} ألف`, c > 0 ? 1 : 0, '#f4c76b', 84);
  F.ov = ''; return s;
}
// 3: in the night sky the Moon becomes a vast cloud of rocks, shining in sunlight
function sceneCloud(t) {
  const T = t - S0(3) + .2, y0 = PV + 74, k = ease(ramp(t, WS(3, 2), WS(3, 8))), lk = ease(ramp(t, S0(3), S0(3) + 1));
  const fg = looker(140, y0 + 10, .78, 1, 3, lk, t) + looker(300, y0 - 2, .72, -1, 7, lk, t, { hF: [300 - .72 * 30, y0 - 2 - .72 * 150] }) + looker(560, y0 + 14, .8, -1, 1, lk, t);
  const s = `<defs>${MDEFS()}</defs>` + street6(t, { N: 1, id: 'mc', cars: 0, noMoon: 1, fg });
  const cam = orbit(10, 0, 0, [0, 0, 0], 30), c = camPt(cam, 470, 345, 10), fp = fpx(cam), mr = 40 * 10 / fp;
  F.w = { set: 'space', cam, L: [-.6, .5, .6], debris: { c, k: mr * (1.6 + 1.0 * k + T * .03), size: mr * .075, hot: 0, n: .55 } }; F.earth = F.moon = F.sun = null;
  F.ov = `<defs>${MDEFS()}</defs><circle cx="470" cy="345" r="${(150 + 50 * k).toFixed(0)}" fill="#fff4dc" opacity=".08" filter="url(#soft)"/>`;
  return s;
}
// 4: the pieces keep orbiting, collide and grind down, and spread along the orbit into a ring like Saturn's
function sceneRing(t) {
  const T = t - S0(4) + .2, sp = ease(ramp(t, WS(4, 7) - .3, WS(4, 13))), tl = .32, R = 2.25;
  const G = gW(t, { d: 14.5 - T * .12, el: .22, lon: -30 - T * 3, clouds: .45, off: -.5 });
  const th0 = 1.2 + T * .12, c = ringPt(R, th0, tl);
  F.w.debris = { c, k: .6, spread: sp, R, tilt: tl, th0, size: .022, hot: 0, n: lerp(.55, 1, sp) }; F.w.dust = { R: R * .93, a: .55 * ease(ramp(t, WS(4, 9), WS(4, 13) + .5)), tilt: tl };
  let o = `<defs>${MDEFS()}</defs>`; const cl = ease(ramp(t, WS(4, 5) - .2, WS(4, 6))) * (1 - ease(ramp(t, WS(4, 8), WS(4, 9))));
  if (cl > 0) { const r = RS(Math.floor(t * 6)); for (let i = 0; i < 4; i++) { const q = [c[0] + (r() - .5) * .7, c[1] + (r() - .5) * .5, c[2] + (r() - .5) * .7], [x, y] = proj3(G.cam, q); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(6 + 10 * r()).toFixed(1)}" fill="#fff2d0" opacity="${(cl * .8).toFixed(2)}" filter="url(#blur2)"/>`; } }
  o += lbl(360, 1236, 'ليس بالمقياسِ الحقيقيّ', ease(ramp(t, S0(4), S0(4) + .5)), '#9aa6b8', 20);
  F.ov = o; return space(t);
}
// 5: some of it falls on us: meteors light up the night; big rocks could wipe out a city
function sceneMeteors(t) {
  const T = t - S0(5) + .2, y0 = PV + 74, ri = ease(ramp(t, S0(5) - .2, S0(5) + .6)), hit = WS(5, 8) + .1, fk = ramp(t, hit - .9, hit), bl = t > hit ? 1 - ramp(t, hit, hit + 1.4) : 0;
  const fb = t < hit && fk > 0 ? (() => { const x = lerp(660, 520, fk), y = lerp(150, 760, fk * fk); return `<path d="M${(x + 120).toFixed(1)},${(y - 300).toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}" stroke="#ffb060" stroke-width="16" stroke-linecap="round" opacity=".35" filter="url(#soft)"/><path d="M${(x + 70).toFixed(1)},${(y - 180).toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}" stroke="#fff0c8" stroke-width="5" stroke-linecap="round"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26" fill="url(#flashG)"/>`; })() : '';
  const glow = t > hit ? `<ellipse cx="520" cy="780" rx="${(160 + 360 * ramp(t, hit, hit + 1.2)).toFixed(0)}" ry="${(110 + 230 * ramp(t, hit, hit + 1.2)).toFixed(0)}" fill="url(#flashG)" opacity="${(.4 + .55 * bl).toFixed(2)}"/>` : '';
  const sky2 = skyRing(ri) + meteors(t, S0(5) - .3, 34, ease(ramp(t, WS(5, 3) - .3, WS(5, 3) + .2)), 3) + fb + glow;
  const lk = 1, fg = looker(130, y0 + 12, .78, 1, 5, lk, t) + looker(330, y0, .74, 1, 8, lk, t, { hF: [330 + .74 * 24, y0 - .74 * 300] }) + looker(580, y0 + 14, .8, -1, 2, lk, t);
  let s = `<defs>${MDEFS()}</defs>` + street6(t, { N: 1, id: 'mm', cars: 0, noMoon: 1, sky2, fg });
  if (t > hit) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ffb070" opacity="${(.32 * bl).toFixed(2)}" style="mix-blend-mode:screen"/>`;
  F.flash = t > hit ? .55 * Math.pow(1 - ramp(t, hit, hit + .35), 2) : 0;
  noEarth(); F.ov = ''; return s;
}
// 6: without the Moon the tides shrink to about a third
function sceneTides(t) {
  noEarth(); const T = t - S0(6) + .2, amp = lerp(1, .32, ease(ramp(t, WS(6, 3), WS(6, 8)))), ph = T * 2.6, lv = Math.sin(ph) * 120 * amp, wy = 760 - lv;
  let s = `<defs>${MDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)"/>` + cumulus(200 + t * 4, 330, 240, 41, { a: .9 }) + cumulus(560 + t * 3, 420, 180, 43, { a: .8 });
  s += mountainsR(640, 50, 61, { rock: '#7d8e9e', haze: .6, hazeCol: '#c8d8e6' });
  // the harbour wall with tide marks (seaweed below the high-water line)
  const wd = `M430,470 L740,470 L740,1300 L430,1300 Z`; s += litRock(wd, 'wl', '#b8ae9c', '#6e665a', 17, { fx: .03, fy: .09, sc: 3, az: 200 });
  for (let i = 0; i < 9; i++) s += `<path d="M430,${520 + i * 90} L740,${520 + i * 90}" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`;
  s += `<rect x="430" y="640" width="310" height="260" fill="#3a4a2a" opacity=".45"/><rect x="430" y="640" width="310" height="260" fill="#000" filter="url(#grainS)" opacity=".3"/>`;
  for (let i = 0; i < 5; i++) { const y = 640 + i * 60; s += `<path d="M450,${y} L470,${y}" stroke="#fff" stroke-width="3"/>` + lbl(500, y + 9, `${AR(4 - i)} م`, 1, '#fff', 22); }
  s += `<rect x="-20" y="${wy.toFixed(1)}" width="760" height="${(1320 - wy).toFixed(1)}" fill="url(#seaG)"/>`;
  for (let i = 0; i < 6; i++) { const yy = wy + 14 + i * 38; let p = `M-20,${yy.toFixed(1)}`; for (let x = -20; x <= 740; x += 40) p += ` q10,${(-5 - i).toFixed(0)} 20,0 t20,0`; s += `<path d="${p}" stroke="#fff" stroke-opacity="${(.28 - i * .04).toFixed(2)}" stroke-width="2" fill="none" transform="translate(${((t * 30 + i * 13) % 40 - 40).toFixed(1)},0)"/>`; }
  s += `<path d="M430,${wy.toFixed(1)} L740,${wy.toFixed(1)}" stroke="#eaf6ff" stroke-width="4" opacity=".7"/>`;
  // a moored boat rides the tide
  const by = wy - 4; s += `<g transform="translate(220,${by.toFixed(1)}) rotate(${(Math.sin(t * 1.3) * 2).toFixed(2)})"><path d="M-120,-30 L120,-30 L96,22 L-100,22Z" fill="#c8402a"/><path d="M-120,-30 L120,-30 L116,-20 L-118,-20Z" fill="#f4f0e8"/><rect x="-40" y="-78" width="70" height="48" rx="6" fill="#e8e4dc"/><rect x="-30" y="-70" width="20" height="16" fill="#5a7a98"/><rect x="0" y="-70" width="20" height="16" fill="#5a7a98"/><path d="M-100,22 L96,22" stroke="#000" stroke-opacity=".3" stroke-width="4"/></g><path d="M330,${(by - 30).toFixed(1)} Q390,${(by - 60).toFixed(1)} 432,${(by - 120).toFixed(1)}" stroke="#3a3028" stroke-width="3" fill="none"/>`;
  // the tide curve today vs without the Moon
  const ga = ease(ramp(t, S0(6), S0(6) + .5)); let p1 = '', p2 = '';
  for (let x = 0; x <= 340; x += 6) { p1 += (x ? ' L' : 'M') + (60 + x) + ',' + (1150 - Math.sin(x / 340 * 12.566 - ph) * 50).toFixed(1); p2 += (x ? ' L' : 'M') + (60 + x) + ',' + (1150 - Math.sin(x / 340 * 12.566 - ph) * 50 * amp).toFixed(1); }
  s += `<g opacity="${ga.toFixed(2)}">` + panel(40, 1040, 380, 210, 1) + `<path d="${p1}" stroke="#ffffff" stroke-opacity=".3" stroke-width="3" fill="none" stroke-dasharray="8 6"/><path d="${p2}" stroke="#7ac8ff" stroke-width="5" fill="none"/>` + lbl(230, 1080, amp < .9 ? 'بلا قمر' : 'المدُّ اليوم', 1, '#bfe4ff', 24) + `</g>`;
  F.ov = ''; return s;
}
// 7: corals that spawn by moonlight lose their clock
function sceneCoral(t) {
  noEarth(); const T = t - S0(7) + .2, off = ease(ramp(t, WS(7, 6) - .2, WS(7, 7) + .3)), sp = ease(ramp(t, S0(7), WS(7, 2)));
  let s = `<defs>${MDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#deepG)"/>`;
  // moonlight shafts from the surface (fade when the Moon is gone)
  for (let i = 0; i < 6; i++) { const x = 60 + i * 120 + Math.sin(t * .6 + i) * 20; s += `<path d="M${x},-20 L${x + 70},-20 L${x + 200},1100 L${x - 60},1100Z" fill="url(#rayG)" opacity="${(.9 * (1 - off)).toFixed(2)}"/>`; }
  s += `<path d="M-20,1040 Q200,1000 380,1030 T740,1010 L740,1300 L-20,1300Z" fill="#8a7a5a"/><path d="M-20,1040 Q200,1000 380,1030 T740,1010 L740,1300 L-20,1300Z" fill="#000" filter="url(#grainS)" opacity=".35"/>`;
  s += seaFan(110, 1040, 230, 3, '#b0486a') + brainC(250, 1060, 110, 80, 7, '#c89a5a', '#7a5a2a') + branchC(420, 1050, 300, 11, '#d88aa0', '#7a3a4a') + branchC(600, 1050, 260, 13, '#e0a86a', '#7a4a1a') + brainC(560, 1110, 90, 60, 19, '#9a8ab8', '#4a3a6a') + seaFan(690, 1060, 180, 21, '#d06a4a');
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#06182c" opacity="${(.35 * off).toFixed(2)}"/>`;
  // spawn bundles rise in sync under moonlight; without it only a few drift up, out of step
  const r = RS(51); let e = '';
  for (let i = 0; i < 260; i++) { const x0 = [250, 420, 600, 560][i % 4] + (r() - .5) * 160, st = r() * 3, sync = i % 9 === 0 ? 1 : 1 - off, ph = pmod(T * .2 + r() * .55 + st * .1 * off, 1), y = 1040 - ph * 1100, x = x0 + Math.sin(t * .8 + i) * 18 * ph;
    const a = sp * sync * Math.min(1, ph * 6) * (1 - ph * .6); if (a <= .02) continue;
    e += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.6 + r() * 2.4).toFixed(1)}" fill="${['#ffb0c0', '#ffc890', '#ff9aa8'][i % 3]}" opacity="${a.toFixed(2)}"/>`; }
  s += e;
  const ca = ease(ramp(t, WS(7, 6) - .1, WS(7, 7) + .2));
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}" transform="translate(360,560)"><circle r="78" fill="#0a0e1c" opacity=".85"/><circle r="64" fill="none" stroke="#f4c76b" stroke-width="5"/><path d="M0,0 L0,-42 M0,0 L30,16" stroke="#f4c76b" stroke-width="6" stroke-linecap="round"/>` + lbl(0, 130, '؟', 1, '#f4c76b', 60) + `</g>`;
  F.ov = ''; return s;
}
// 8: the surprise: the rocks may gather into a new moon, as our Moon itself was born from the debris of a giant impact
function sceneTwist(t) {
  const T = t - S0(8) + .2, R = 2.25, tl = .32, g = ease(ramp(t, WS(8, 1), WS(8, 9))), hot = ease(ramp(t, WS(8, 10) - .2, WS(8, 11) + .4));
  const G = gW(t, { d: 14 - T * .1, el: .22, lon: 60 - T * 3, clouds: .45, off: -.5, heat: .5 * hot, lights: .3 + .4 * hot });
  const th0 = .5 + T * .02, c = ringPt(R, th0, tl), sp = Math.max(1 - ease(ramp(t, WS(8, 1), WS(8, 6))), hot);
  F.w.debris = { c, k: .3 * (1 - g), spread: sp, R, tilt: tl, th0, size: .022, hot: .9 * hot, gather: ramp(t, WS(8, 5), WS(8, 9)) * (1 - hot), n: 1 };
  F.w.dust = { R: R * .93, a: .55 * sp, tilt: tl, col: [1, 1 - .45 * hot, 1 - .75 * hot] };
  const mg = ease(ramp(t, WS(8, 7), WS(8, 9) + .3)) * (1 - hot); if (mg > .01) F.w.moon = { pos: c, L: F.w.L, shC: NOFAR, shR: .001, r: .27 * mg, rot: t * .05 };
  const la = ease(ramp(t, WS(8, 10) - .2, WS(8, 10) + .4));
  F.ov = la > 0 ? `<g opacity="${la.toFixed(2)}">` + panel(190, 1080, 340, 90, 1) + lbl(360, 1138, 'قبلَ ٤٫٥ مليار سنة', 1, '#ffb08a', 34) + `</g>` : '';
  return space(t);
}
// 9: a ring or a moon? the Earth with both, the question mark and the subscribe button
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, R = 2.3, tl = .3;
  const G = gW(t, { d: 12.5, el: .2, tg: [0, .9, 0], lon: -20 - (t - S0(9)) * 4, clouds: .4 });
  F.w.dust = { R, a: .45, tilt: tl }; F.w.debris = { c: [0, 0, 0], k: 0, spread: 1, R: R * 1.07, tilt: tl, th0: 0, size: .02, n: .6 };
  F.w.moon = { pos: camPt(G.cam, 630, 590, 12.5), L: F.w.L, shC: NOFAR, shR: .001, r: .28, rot: t * .05 };
  F.ov = `<g opacity="${q}"><text x="360" y="430" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7) - .3, WS(9, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneEnergy }, { s: S0(2) - .2, f: sceneDino }, { s: S0(3) - .2, f: sceneCloud }, { s: S0(4) - .2, f: sceneRing }, { s: S0(5) - .2, f: sceneMeteors }, { s: S0(6) - .2, f: sceneTides }, { s: S0(7) - .2, f: sceneCoral }, { s: S0(8) - .2, f: sceneTwist }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneEnergy, sceneDino, sceneRing, sceneTwist, sceneCloud]);
const XF = .5;
const TLI = [['الانفجار', 0], ['سحابةُ صخور', S0(3)], ['حلقة', S0(4)], ['شُهُب', S0(5)]];
const LIST_ON = new Set([sceneMeteors]);
const CHIPS = [
  ['c1', '= تفجيرُ القمر', 360, 330, 'big', WS(1, 10), S0(2) - .3],
  ['c3', 'سحابةٌ من الصخور', 360, 1200, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'حلقةٌ حولَ الأرض', 360, 330, 'big', WS(4, 13), S0(5) - .3],
  ['c5', 'شُهُبٌ ونيازك', 360, 1200, 'red big', WS(5, 3), S0(6) - .3],
  ['c6', 'المدُّ: نحوَ الثلث', 220, 330, 'big', WS(6, 7), S0(7) - .3],
  ['c7', 'المرجانُ يفقدُ ساعتَه', 360, 330, 'big', WS(7, 6), S0(8) - .3],
  ['c8', 'قمرٌ جديد', 360, 330, 'big', WS(8, 8), WS(8, 10) - .1],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">انفجارُ القمر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
