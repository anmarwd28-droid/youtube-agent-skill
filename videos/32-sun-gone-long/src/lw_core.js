// ===================== long landscape video core (1280x720 page): camera, space, wide city, widgets, UI =====================
// World scenes are drawn in the Shorts' units (pavement at y=1000) and shown through camG(inner, k, wx, wy): k=1.78 shows a 720-wide window.
const CS = i => CHT[i].start - 2.0;
const camG = (inner, k, wx, wy) => zoomG(inner, k, wx, wy, 640, 360);
const mv3 = (t, a, b, A, B) => { const q = ease(ramp(t, a, b)); return A.map((v, i) => lerp(v, B[i], q)); };
const camMv = (inner, t, a, b, A, B) => { const c = mv3(t, a, b, A, B); return camG(inner, c[0], c[1], c[2]); };
function proj3w(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 360 / Math.tan(c.fov * Math.PI / 360);
  return [640 + dot(d, r) / z * fp, 360 - dot(d, u) / z * fp, fp / z]; }
const noW = () => { F.w = null; F.earth = null; F.moon = null; F.sun = null; F.ov = ''; };
const fmtT = v => v < 0 ? `${AR(Math.abs(Math.round(v)))}° تحت الصفر` : `${AR(Math.round(v))}°`;
const txt = (x, y, tx, a = 1, col = '#fff', fs = 26, anc = 'middle') => lbl(x, y, tx, a, col, fs, anc);
// ---------- space behind the three.js layer: the Shorts' navy gradient and stars, landscape ----------
const STW = (() => { const r = RS(171); return Array.from({ length: 340 }, () => [r() * 1280, r() * 720, Math.pow(r(), 3) * 1.7 + .45, r() * 6, r()]); })();
const starsW = (t, a = 1, tw = 1, ymax = 720) => STW.map(s => s[1] > ymax ? '' : `<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="${s[2].toFixed(2)}" fill="${s[4] < .14 ? '#ffe2c0' : s[4] > .86 ? '#cfe0ff' : '#fff'}" opacity="${(a * (ymax < 720 ? clamp((ymax - s[1]) / 140) : 1) * (.62 + .33 * tw * Math.sin(t * 1.4 + s[3]))).toFixed(2)}"/>`).join('');
const MWS = (() => { const r = RS(77); return Array.from({ length: 620 }, () => { const u = r() * 2 - 1, g = (r() + r() + r() - 1.5) * .7; return [u * 760, g * 74 * (1 - .35 * u * u), Math.pow(r(), 4) * 1.5 + .3, r()]; }); })();
function milkyW(a, cx = 640, cy = 300, ang = -24, sc = 1) {
  if (a <= 0) return '';
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy}) rotate(${ang}) scale(${sc})"><defs><radialGradient id="mwG"><stop offset="0" stop-color="#dfe6ff" stop-opacity=".5"/><stop offset=".5" stop-color="#9fb0e8" stop-opacity=".22"/><stop offset="1" stop-color="#8090d0" stop-opacity="0"/></radialGradient>` +
    `<filter id="mwF" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency=".03 .1" numOctaves="5" seed="14"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .88  0 0 0 0 1  0 0 0 2.6 -1.3"/><feComposite in2="SourceGraphic" operator="in"/><feGaussianBlur stdDeviation="1.2"/></filter>` +
    `<filter id="mwD" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency=".014 .05" numOctaves="4" seed="31"/><feColorMatrix values="0 0 0 0 .02  0 0 0 0 .02  0 0 0 0 .06  0 0 0 3.4 -1.7"/><feComposite in2="SourceGraphic" operator="in"/><feGaussianBlur stdDeviation="3"/></filter></defs>` +
    `<ellipse rx="820" ry="120" fill="url(#mwG)" opacity=".7"/><ellipse rx="800" ry="84" fill="#fff" filter="url(#mwF)" opacity=".26"/><ellipse cx="40" rx="260" ry="62" fill="#ffe8c8" opacity=".16" filter="url(#haze)"/><ellipse rx="700" ry="30" fill="#fff" filter="url(#mwD)" opacity=".6"/>` +
    MWS.map(s => `<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="${s[2].toFixed(2)}" fill="${s[3] < .2 ? '#ffe2c0' : '#fff'}" opacity="${(.35 + .5 * s[3]).toFixed(2)}"/>`).join('') + `</g>`;
}
function spaceW(t, o = {}) {
  return `<defs><linearGradient id="spw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.top || '#070a1f'}"/><stop offset="1" stop-color="${o.bot || '#0b0f2b'}"/></linearGradient><radialGradient id="nbw"><stop offset="0" stop-color="#4b2fa8" stop-opacity=".2"/><stop offset="1" stop-color="#4b2fa8" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="1280" height="720" fill="url(#spw)"/><ellipse cx="1010" cy="170" rx="460" ry="330" fill="url(#nbw)"/><ellipse cx="180" cy="600" rx="380" ry="260" fill="url(#nbw)" opacity=".6"/>` + milkyW(o.mw || 0, o.mwx ?? 640, o.mwy ?? 300, o.mwa ?? -24) + starsW(t, o.st ?? 1, o.tw ?? 1);
}
// three.js globe with the house look: g3({d, el, az, tg, spin, sunI, lights, ice, amb, clouds, atm, L})
function g3(t, o = {}) {
  const az = (o.az ?? .25) + t * (o.daz ?? .012), g = o.tg || [0, 0, 0], cam = orbit(o.d || 7, o.el ?? .22, az, [g[0] * Math.cos(az), g[1], -g[0] * Math.sin(az)], o.fov || 30);
  F.w = { set: 'space', cam, L: o.L || sunFor(az, o.off ?? -.75, o.up ?? .35), disc: { m: 1, spin: (o.spin ?? 3.6) + t * (o.dspin ?? .05), clouds: o.clouds ?? .5, sunI: o.sunI ?? 1, lights: o.lights ?? .5, ice: o.ice || 0, amb: o.amb || 0, atm: o.atm ?? 1 } };
  return cam;
}
// ---------- a thermometer (screen space) ----------
function thermo(x, y, h, v, lo, hi, a = 1, o = {}) {
  if (a <= 0) return ''; const k = clamp((v - lo) / (hi - lo)), fy = y - 6 - k * (h - 14), col = mix('#6fc0ff', '#ff5a3a', clamp((v + 30) / 50)), z = y - 6 - clamp((0 - lo) / (hi - lo)) * (h - 14);
  let s = `<g opacity="${a.toFixed(2)}"><rect x="${x - 78}" y="${y - h - 62}" width="156" height="${h + 158}" rx="20" fill="#0a0e1c" opacity=".82"/><rect x="${x - 78}" y="${y - h - 62}" width="156" height="${h + 158}" rx="20" fill="none" stroke="#fff" stroke-opacity=".16"/>` +
    `<rect x="${x - 34}" y="${y - h}" width="20" height="${h}" rx="10" fill="#e8eef6"/><circle cx="${x - 24}" cy="${y + 14}" r="23" fill="#e8eef6"/><rect x="${x - 29}" y="${fy.toFixed(1)}" width="10" height="${(y - fy + 8).toFixed(1)}" rx="5" fill="${col}"/><circle cx="${x - 24}" cy="${y + 14}" r="16" fill="${col}"/><circle cx="${x - 30}" cy="${y + 8}" r="5" fill="#fff" opacity=".5"/>`;
  for (let i = 0; i <= 8; i++) { const yy = y - 6 - i / 8 * (h - 14); s += `<path d="M${x - 8},${yy.toFixed(1)} h${i % 2 ? 9 : 16}" stroke="#fff" stroke-opacity=".7" stroke-width="2"/>`; }
  if (lo < 0 && hi > 0) s += `<path d="M${x - 40},${z.toFixed(1)} h70" stroke="#f4c76b" stroke-width="2" stroke-dasharray="5 4"/>` + txt(x + 50, z + 6, '٠°', 1, '#f4c76b', 17);
  return s + txt(x, y - h - 24, o.cap || 'الحرارة', 1, 'rgba(255,255,255,.75)', 19) + txt(x, y + 66, `${AR(Math.abs(Math.round(v)))}°`, 1, v < 0 ? '#9fd4ff' : '#ffd08a', 34) + txt(x, y + 88, v < 0 ? 'تحت الصفر' : 'فوق الصفر', 1, 'rgba(255,255,255,.7)', 15) + `</g>`;
}
// the same people, walking for real (position moves with the legs), with winter clothes when cold
function walker(x0, y, v, ci, sc, t, o = {}) { const c = CROWD[ci % 4], x = x0 + v * t, f = v >= 0 ? 1 : -1;
  return person(x, y, Object.assign({ s: sc, face: f, moving: Math.abs(v) > 1, phase: x * f / (sc * 30), top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t }, o)); }
const stander = (x, y, ci, sc, face, t, o = {}) => { const c = CROWD[ci % 4]; return person(x, y, Object.assign({ s: sc, face, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t }, o)); };
const WINT = (i, b = .8) => ({ coat: 1, hat: ['#7a2a2a', '#2a4a6a', '#3a3a3a', '#6a5a2a'][i % 4], scarf: ['#c8a040', '#a83a3a', '#d8d8d8', '#3a7a5a'][i % 4], breath: b, seed: i * .23 });
// snowfall in world units over a box
function snowW(t, n, a, x0, x1, y0, y1, seed = 9) { if (a <= 0) return ''; let s = ''; const r = RS(seed + 600), H = y1 - y0;
  for (let i = 0; i < n; i++) { const xx = x0 + r() * (x1 - x0), sp = 26 + r() * 46, ph = r() * H, sz = 1 + r() * 2.4, y = y0 + pmod(ph + t * sp, H), x = xx + Math.sin(t * .8 + i) * 12; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${sz.toFixed(1)}" fill="#fff" opacity="${(a * (.45 + r() * .5)).toFixed(2)}"/>`; }
  return s; }
// ---------- the wide city street: a new building row for every seed. Returns the SVG in world units ----------
const CNAMES = ['مقهى', 'مكتبة', 'صيدلية', 'فواكه', 'مخبز', 'مطعم', 'ملابس', 'بقالة', 'هواتف', 'زهور', 'ألعاب', 'حلويات'], CCOL = ['#7a4a2a', '#2a5a9a', '#2a8a4a', '#d9822b', '#c0392b', '#8a2a6a', '#2a7a8a', '#5a5a9a', '#a8562a', '#3a8a6a', '#b8862a', '#9a3a4a'];
function cityRow(seed, x0, x1) { const r = RS(seed * 13 + 5), o = [], cols = ['#b2684e', '#cfbda0', '#a8785a', '#c9b08a', '#9a6a58', '#d8c8a8', '#b89070', '#8a6a60']; let x = x0, i = 0;
  while (x < x1) { const k = r(), ty = k < .52 ? 'apt' : k < .78 ? 'glass' : 'apt2'; let w = 132 + r() * 58, h = 205 + r() * 150; if (ty === 'glass') h += 55;
    o.push({ x, w, h, ty, col: cols[Math.floor(r() * cols.length)], sd: seed * 31 + i, bands: r() > .5, i }); x += w; i++; }
  return o; }
function shopOne(sx, sw, PV, name, c, sd) { const r = RS(sd + 61), gx = sx + 6, gw = sw - 12, dw = 30;
  return `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
    Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx.toFixed(1)}" y="${(PV - 14 - bh).toFixed(1)}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
    `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/><rect x="${gx + gw - dw + 5}" y="${PV - 42}" width="3" height="14" fill="#d8d8d8"/>` +
    `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
    `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
    `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') + `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`; }
function farCityW(seed, base, hz, x0, x1, hk0 = 1) { let s = ''; [[.5, 1.25, 0], [.78, 1, 1]].forEach(([op, hk, li]) => { const r = RS(seed + li * 31); let x = x0 - li * 17;
    while (x < x1) { const w = 38 + r() * 66, h = (64 + r() * 190) * hk * hk0, c = mix(hz, '#ffffff', li ? 0 : .22), k = r();
      s += `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" fill="${c}" opacity="${op}"/><rect x="${x.toFixed(1)}" y="${(base - h + 6).toFixed(1)}" width="${w.toFixed(1)}" height="${(h - 6).toFixed(1)}" fill="url(#winP)" opacity="${li ? .8 : .5}"/><rect x="${(x + w * .72).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(w * .28).toFixed(1)}" height="${h.toFixed(1)}" fill="#0c1830" opacity="${li ? .14 : .07}"/>`;
      if (k > .8) s += `<rect x="${(x + w * .4).toFixed(1)}" y="${(base - h - 16).toFixed(1)}" width="${(w * .3).toFixed(1)}" height="16" fill="${c}" opacity="${op}"/>`;
      if (k < .13) s += `<path d="M${(x + w / 2).toFixed(1)},${(base - h).toFixed(1)} v-34" stroke="${c}" stroke-width="2.2" opacity="${op}"/>`;
      x += w + 3; } }); return s; }
// o: {id, seed, x0, x1, sky:[3], dark 0..1, lit 0..1 (windows, shops, lamps), sun:[x,y,a], clouds 0..1, snow 0..1 (cover), fall 0..1 (snowfall), cars:[[x,lane,col,face,v]], noTrees, stars 0..1, mw}
function cityW(t, o = {}) {
  const x0 = o.x0 ?? -470, x1 = o.x1 ?? 1190, PV = 1000, KB = 1104, id = o.id || 'c', dk = o.dark || 0, lit = o.lit || 0, sn = o.snow || 0, sky = o.sky || ['#3a6fb8', '#93bbe2', '#ebe3d0'], sd = o.seed || 1, Wd = x1 - x0, row = cityRow(sd, x0, x1 - 60);
  let s = `<defs>${DEFB()}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="${x0 - 300}" y="100" width="${Wd + 600}" height="1400" fill="url(#sk${id})"/>`;
  if (o.sun && o.sun[2] > 0) s += `<g opacity="${o.sun[2]}"><circle cx="${o.sun[0]}" cy="${o.sun[1]}" r="150" fill="#fff6d0" opacity=".28" filter="url(#soft)"/><circle cx="${o.sun[0]}" cy="${o.sun[1]}" r="30" fill="#fffdf2"/></g>`;
  const ca = o.clouds ?? 1; if (ca > 0) for (let i = 0; i < 6; i++) { const cx = x0 + pmod(i * 331 + sd * 97 + t * (1 + i % 3 * .3) * (o.wind ?? 1), Wd + 300) - 150; s += cumulus(cx, 380 + (i * 67) % 200, 150 + (i * 53) % 110, 3 + i * 2 + sd, { a: ca * (.6 + (i % 3) * .15) }); }
  s += farCityW(28 + sd, 905, mix(sky[2], '#55657a', .4), x0 - 30, x1 + 30) + `<rect x="${x0 - 20}" y="780" width="${Wd + 40}" height="125" fill="${sky[2]}" opacity=".22"/>`;
  row.forEach(b => { s += b.ty === 'glass' ? officeGlass(b.x, PV, b.w, b.h, b.sd) : aptBrick(b.x, PV, b.w, b.h, b.col, b.sd, { bands: b.bands, balShift: b.i % 2, fh: b.ty === 'apt2' ? 54 : 46 });
    s += shopOne(b.x + 2, b.w - 4, PV, CNAMES[(b.i * 5 + sd) % 12], CCOL[(b.i * 7 + sd * 3) % 12], b.sd);
    if (sn > 0) s += `<path d="M${b.x - 4},${PV - b.h - 6} q${b.w * .25},${-10 * sn - 4} ${b.w * .5},${-6 * sn} t${b.w * .5 + 8},${4 * sn} l0,8 l${-b.w - 8},0Z" fill="#f2f6fb" opacity="${clamp(sn * 1.4)}"/><rect x="${b.x - 15}" y="${PV - 100}" width="${b.w + 30}" height="${7 * sn}" rx="3" fill="#f2f6fb" opacity="${clamp(sn * 1.4)}"/>`; });
  s += `<rect x="${x0 - 20}" y="${PV - 20}" width="${Wd + 40}" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  s += `<rect x="${x0 - 300}" y="${PV}" width="${Wd + 600}" height="${KB - PV}" fill="#c9bda7"/><rect x="${x0}" y="${PV}" width="${Wd}" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="${x0}" y="${PV}" width="${Wd}" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M${x0},${PV + 26 * (q + 1)} H${x1}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = Math.floor(x0 / 48); q < x1 / 48 + 1; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect x="${x0 - 300}" y="${KB}" width="${Wd + 600}" height="12" fill="#e8e4d8"/><rect x="${x0 - 300}" y="${KB + 8}" width="${Wd + 600}" height="4" fill="#8a8478"/>`; for (let q = Math.floor(x0 / 80); q < x1 / 80 + 1; q++) s += `<rect x="${q * 80 - 40}" y="${KB}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`;
  s += `<rect x="${x0 - 300}" y="${KB + 12}" width="${Wd + 600}" height="400" fill="#4e4e54"/><rect x="${x0}" y="${KB + 12}" width="${Wd}" height="290" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="${x0}" y="${KB + 12}" width="${Wd}" height="16" fill="url(#aoDn)" opacity=".6"/>`;
  for (let q = Math.floor(x0 / 120); q < x1 / 120 + 1; q++) s += `<rect x="${q * 120 - 100}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`;
  const lamps = [], trees = []; for (let x = x0 + 60; x < x1; x += 262) lamps.push(x); for (let x = x0 + 190, i = 0; x < x1; x += 262, i++) trees.push([x, 250 + (i * 37) % 70, 3 + i * 2 + sd]);
  if (!o.noTrees) trees.forEach(([px, h, tsd]) => { const py = PV + 60; s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + (dk < .5 ? `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - dk * 2)).toFixed(2)}" filter="url(#blur2)"/>` : '') + treeR(px, py - 2, h, tsd, t * (o.wind ?? 1)); });
  lamps.forEach(lx => { s += lampPost(lx, PV + 80, 250, 0); });
  (o.cars || []).forEach(c => { const cx = c[4] ? x0 - 200 + pmod(c[0] - x0 + 200 + c[4] * t, Wd + 400) : c[0]; s += car(cx, c[1] ? 1256 : 1168, .95, c[2], c[3], lit > .5 ? 1 : 0); if (sn > 0 && !c[4]) s += `<path d="M${cx - 80},1100 q40,${-26 - 14 * sn} 90,-22 q50,4 76,22Z" fill="#f2f6fb" opacity="${clamp(sn * 1.5)}"/>`; });
  if (sn > 0) { s += `<rect x="${x0 - 300}" y="${PV}" width="${Wd + 600}" height="420" fill="#eef3f9" opacity="${(sn * .86).toFixed(2)}"/><rect x="${x0}" y="${PV}" width="${Wd}" height="300" fill="#6a84a8" filter="url(#grainR)" opacity="${(sn * .3).toFixed(2)}"/>`;
    const r = RS(sd + 44); for (let x = x0; x < x1; x += 90) { const w = 70 + r() * 90, hh = (14 + r() * 26) * sn; s += `<path d="M${x},${PV + 4} q${w * .4},${-hh * 2} ${w},0Z" fill="#f6f9fc" opacity="${clamp(sn * 1.3)}"/><path d="M${x + 30},${KB + 14} q${w * .5},${-hh * 1.5} ${w * 1.2},0Z" fill="#f6f9fc" opacity="${clamp(sn * 1.3)}"/>`; } }
  if (o.extra) s += o.extra;
  if (o.fall) s += snowW(t, 260, o.fall, x0, x1, 300, 1300, sd);
  if (dk > 0) { s += `<rect x="${x0 - 300}" y="100" width="${Wd + 600}" height="1400" fill="#050816" opacity="${(dk * .8).toFixed(3)}"/>`;
    const r = RS(sd + 5); let st = ''; for (let i = 0; i < 260; i++) { const x = x0 + r() * Wd, y = 110 + r() * 470, z = Math.pow(r(), 3) * 1.4 + .4; st += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${z.toFixed(2)}" fill="#fff" opacity="${(clamp((560 - y) / 160) * (.6 + .35 * Math.sin(t * 1.3 + i))).toFixed(2)}"/>`; }
    s += `<g opacity="${(clamp((dk - .5) * 2) * (o.stars ?? 1)).toFixed(2)}">${o.mw ? milkyW(o.mw, (x0 + x1) / 2, 330, -14, .9) : ''}${st}</g>`; }
  if (lit > 0) { let L = ''; row.forEach(b => { const r = RS(b.sd + 777), top = PV - b.h;
      if (b.ty === 'glass') { const cols = Math.round(b.w / 27), pw = b.w / cols, rows = Math.floor((b.h - 100) / 27); for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) if (r() < .4 * (o.litK ?? 1)) L += `<rect x="${(b.x + j * pw + 2).toFixed(1)}" y="${top + 9 + i * 27}" width="${(pw - 4).toFixed(1)}" height="23" fill="${r() > .3 ? '#ffe2a0' : '#dff0ff'}" opacity="${(.5 + r() * .4).toFixed(2)}"/>`; }
      else { const fh = b.ty === 'apt2' ? 54 : 46, rows = Math.floor((b.h - 108) / fh), cols = Math.max(2, Math.round(b.w / 54)), cw = b.w / cols, ww = Math.min(26, cw * .5), wh = Math.min(30, fh * .64);
        for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) if (r() < .55 * (o.litK ?? 1)) { const wx = b.x + j * cw + cw / 2, wy = top + 18 + i * fh; L += `<rect x="${(wx - ww / 2).toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="${wh.toFixed(1)}" fill="${r() > .25 ? '#ffd890' : '#fff0c8'}" opacity="${(.7 + r() * .3).toFixed(2)}"/><rect x="${(wx - ww / 2 - 8).toFixed(1)}" y="${wy - 8}" width="${(ww + 16).toFixed(1)}" height="${(wh + 16).toFixed(1)}" fill="#ffc870" opacity=".13" filter="url(#blur2)"/>`; } }
      L += `<rect x="${b.x + 8}" y="${PV - 80}" width="${b.w - 16}" height="74" fill="url(#shG)"/>` + Array.from({ length: Math.floor((b.w - 60) / 17) }, (_, q) => `<rect x="${b.x + 16 + q * 17}" y="${PV - 14 - 12 - r() * 20}" width="12" height="${12 + 20}" fill="#3a2a1a" opacity=".55"/>`).join("") + `<rect x="${b.x + 8}" y="${PV - 14}" width="${b.w - 16}" height="9" fill="#1c1814"/><rect x="${b.x + b.w - 42}" y="${PV - 80}" width="4" height="80" fill="#1c1814"/><rect x="${b.x}" y="${PV - 124}" width="${b.w}" height="27" fill="${CCOL[(b.i * 7 + sd * 3) % 12]}" opacity=".55"/><text x="${b.x + b.w / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff" opacity=".9">${CNAMES[(b.i * 5 + sd) % 12]}</text><ellipse cx="${b.x + b.w / 2}" cy="${PV + 22}" rx="${b.w * .5}" ry="24" fill="#ffd890" opacity=".16" filter="url(#soft)"/>`; });
    lamps.forEach(lx => { L += `<circle cx="${lx + 18}" cy="${PV + 80 - 242}" r="150" fill="url(#lampG)" opacity=".62"/><rect x="${lx + 10}" y="${PV + 80 - 248}" width="16" height="10" rx="3" fill="#ffe2ad"/><ellipse cx="${lx + 30}" cy="${PV + 92}" rx="120" ry="26" fill="#ffd59a" opacity=".2" filter="url(#soft)"/>`; });
    s += `<defs><linearGradient id="shG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6b0" stop-opacity=".75"/><stop offset="1" stop-color="#d89a48" stop-opacity=".45"/></linearGradient></defs><g opacity="${lit.toFixed(2)}">${L}</g>`; }
  return s;
}
// ---------- UI: chapter cards, the timeline list, the chapter tag, chips ----------
const TLBL = ['٨ دقائق', 'ساعة', 'يوم', 'أسبوع', 'شهر', 'سنة', '١٠٠ سنة', 'ألف سنة', 'مليون سنة'];
const CHP = [], chip = (tx, x, y, cls, a, b) => { CHP.push(['k' + CHP.length, tx, x, y, cls, a, b]); };
function uiInit() {
  $('ui').innerHTML = `<div class="list" id="tl"><div class="hd">الخطّ الزمنيّ</div><div class="rail"></div><div class="fill" id="tlf"></div>` + TLBL.map((x, i) => { const y = 66 + i * 42; return `<div class="it" id="tli${i}" style="top:${y}px">${x}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
    CHP.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
}
function renderUI(t) {
  let c = 0; CHT.forEach((x, i) => { if (t >= x.start - 2.15) c = i; });
  const st = CHT[c].start, a = st - 2.15, isCh = c >= 1 && c <= 9, card = isCh ? ease(ramp(t, a + .1, a + .5)) * (1 - ease(ramp(t, st + .5, st + 1.1))) : 0, nx = CHT[c + 1] ? CHT[c + 1].start - 2.15 : TOTAL;
  $('dim').style.opacity = card * .5; const T = $('chT'); T.style.opacity = card; T.style.transform = `translateY(${(1 - ease(ramp(t, a + .1, a + .6))) * 18}px)`;
  if (isCh) { T.querySelector('.n').textContent = `الفصل ${AR(c)} من ٩`; T.querySelector('.t').textContent = CHT[c].title; T.querySelector('.ln').style.width = (ease(ramp(t, a + .3, a + 1.1)) * 320) + 'px'; }
  const prev = c === 0 ? ease(ramp(t, WS(2, 3), WS(2, 3) + .5)) * (1 - ease(ramp(t, WS(2, 9), WS(2, 9) + .5))) : 0;
  $('tl').style.opacity = Math.max(prev, isCh ? ease(ramp(t, a + .3, a + .7)) * (1 - ease(ramp(t, st + 4.6, st + 5.3))) : 0);
  const act = c === 0 ? Math.floor(clamp(ramp(t, WS(2, 3), WS(2, 9))) * 8.99) : Math.min(8, c - 1), shown = c > 0 || t >= WS(2, 3);
  $('tlf').style.height = (act * 42) + 'px';
  TLBL.forEach((x, k) => { const o = shown && k <= act, cur = k === act && shown; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  const tg = $('chTag'); tg.style.opacity = isCh ? ease(ramp(t, st + 4.9, st + 5.5)) * (1 - ease(ramp(t, nx - .2, nx + .2))) : 0; if (isCh) tg.textContent = CHT[c].title;
  CHP.forEach(k => { $(k[0]).style.opacity = ease(ramp(t, k[5], k[5] + .3)) * (1 - ease(ramp(t, k[6] - .3, k[6]))); });
}
