// ===================== "what if the oceans dried up?" (Short #45) =====================
// gl3d_dry.js (from gl3d_pl.js; mirror and 3D-fade fixes kept): `disc.swap` 0 -> 1 DRAINS the oceans (the sea level drops by the depth mask of
// tex/dry_tex.py: shelves dry first, trenches last), `ridgeA`/`trenchA` light the mid-ocean ridge and the Mariana trench, `scorch` dries the land.
// Mars sits in the moon slot (tex/mars_tex.py): `moon.wet` 1 = ancient Mars with lakes and seas, 0 = today.
const DDEF = `<linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8cc6"/><stop offset=".5" stop-color="#b4cde0"/><stop offset="1" stop-color="#efe2c6"/></linearGradient>` +
  `<linearGradient id="stSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#96693a"/><stop offset=".45" stop-color="#cb9a5e"/><stop offset="1" stop-color="#ecd09a"/></linearGradient>` +
  `<linearGradient id="seaG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfcba6"/><stop offset="1" stop-color="#ab8962"/></linearGradient>` +
  `<linearGradient id="saltG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf9f4"/><stop offset="1" stop-color="#d4cebf"/></linearGradient>` +
  `<linearGradient id="hullG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8e2e26"/><stop offset="1" stop-color="#4a1410"/></linearGradient>` +
  `<linearGradient id="trG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6cab2"/><stop offset="1" stop-color="#4a3c30"/></linearGradient>` +
  `<linearGradient id="soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5644"/><stop offset="1" stop-color="#3a2e24"/></linearGradient>` +
  `<linearGradient id="rivG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cc0ea"/><stop offset=".5" stop-color="#3a8ace"/><stop offset="1" stop-color="#1c5a98"/></linearGradient>` +
  `<radialGradient id="micW2" cx=".45" cy=".4"><stop offset="0" stop-color="#c6efec"/><stop offset=".7" stop-color="#74c2c8"/><stop offset="1" stop-color="#2c7c90"/></radialGradient>` +
  `<radialGradient id="micD2" cx=".45" cy=".4"><stop offset="0" stop-color="#f2ecde"/><stop offset=".7" stop-color="#d6c8aa"/><stop offset="1" stop-color="#96846a"/></radialGradient>` +
  `<radialGradient id="labD2" cx=".5" cy=".35"><stop offset="0" stop-color="#1c2a40"/><stop offset="1" stop-color="#070b16"/></radialGradient>` +
  `<filter id="dustB2" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".011 .017" numOctaves="3" seed="5"/><feDisplacementMap in="SourceGraphic" scale="54" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="6"/></filter>` +
  `<filter id="darkC"><feColorMatrix values=".56 0 0 0 0  0 .6 0 0 0  0 0 .68 0 0  0 0 0 1 0"/></filter>`;
const DDEFS = () => `${DEFS()}${WDEF}${ROCKDEF}${DDEF}`;
// a 3D point at depth z (along the view axis) behind the screen spot (x, y)
function camPt(c, x, y, z) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], nrm = a => { const l = Math.hypot(...a); return a.map(v => v / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), fp = 640 / Math.tan(c.fov * Math.PI / 360), a = (x - 360) / fp * z, b = -(y - 640) / fp * z;
  return [0, 1, 2].map(i => c.pos[i] + f[i] * z + r[i] * a + u[i] * b);
}
const fpx = c => 640 / Math.tan(c.fov * Math.PI / 360), NOFAR = [-99, -99, -99];
// the Earth with its centre at the screen spot (ex, ey)
function gAt(t, ex, ey, o) { const az = o.az ?? .3, c0 = orbit(o.d, o.el ?? .28, az, [0, 0, 0], 30), Q = camPt(c0, ex, ey, o.d); return gW(t, Object.assign({}, o, { az, tg: [-Q[0], -Q[1], -Q[2]] })); }
const looker = (x, y, s, f, pi, k, t, o = {}) => hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: .75 * k }, palS(pi), o));
const sun3 = (x, y, a = 1, c = '#fff4cf') => `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="150" fill="url(#sunW)"/><circle cx="${x}" cy="${y}" r="48" fill="${c}" opacity=".45" filter="url(#blur9)"/><circle cx="${x}" cy="${y}" r="22" fill="#fffdf2"/></g>`;

// ---------- a dead tree: bare branching limbs ----------
function deadTree(x, y, h, seed, col = '#4a3a2c') {
  const r = RS(seed); let s = '';
  const br = (x0, y0, ang, len, w, d) => { const x1 = x0 + Math.sin(ang) * len, y1 = y0 - Math.cos(ang) * len, mx = (x0 + x1) / 2 + (r() - .5) * len * .22, my = (y0 + y1) / 2;
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w.toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    if (d > 0) { const n = d > 2 ? 2 : 2 + (r() > .5 ? 1 : 0); for (let i = 0; i < n; i++) br(x1, y1, ang + (i - (n - 1) / 2) * (.7 + r() * .3) + (r() - .5) * .3, len * (.62 + r() * .2), Math.max(1.2, w * .6), d - 1); } };
  br(x, y, (r() - .5) * .12, h * .36, h * .055, 4);
  return `<g>${s}</g><path d="M${(x - h * .014).toFixed(1)},${y} L${(x - h * .008).toFixed(1)},${(y - h * .3).toFixed(1)}" stroke="#fff" stroke-width="2.5" opacity=".14" stroke-linecap="round"/>`;
}
// ---------- one dune layer (from `dunes`, #41): k 0 = far and hazy, 1 = near ----------
function duneL(base, k, seed, o = {}) {
  const r = RS(seed * 31 + 7), amp = (o.amp ?? (14 + k * 60)), fr = .006 + r() * .004, ph = r() * 9, ph2 = r() * 9, id = 'dl' + seed + '_' + Math.round(base);
  const cy = x => base - amp * (.55 * Math.sin(x * fr + ph) + .3 * Math.sin(x * fr * 2.3 + ph2) + .15 * Math.sin(x * fr * 5.1 + ph * 2));
  const xs = []; for (let x = -30; x <= 750; x += 6) xs.push(x);
  const crest = xs.map(x => [x, cy(x)]), d = `M-30,1300 L${crest.map(PT).join(' L')} L750,1300Z`, hz = o.haze || '#e9d8bc';
  const lit = mix(o.lit || '#e8c48a', hz, (1 - k) * .75), low = mix(o.low || '#cf9a5e', hz, (1 - k) * .7), dark = mix(o.dark || '#a86e3c', hz, (1 - k) * .65);
  let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit}"/><stop offset="1" stop-color="${low}"/></linearGradient></defs><path d="${d}" fill="url(#${id})"/>`;
  const dep = xs.map(x => { const sl = (cy(x + 4) - cy(x - 4)) / 8; return clamp(sl * 2.2, 0, 1) * (16 + amp * 1.1); });
  for (let q = 2; q < dep.length - 2; q++) dep[q] = (dep[q - 2] + dep[q - 1] + dep[q] + dep[q + 1] + dep[q + 2]) / 5;
  s += `<path d="M${crest.map(PT).join(' L')} L${xs.map((x, q) => [x, cy(x) + dep[q]]).reverse().map(PT).join(' L')}Z" fill="${dark}" opacity=".62" filter="url(#blur2)"/>`;
  s += `<path d="M${crest.map(PT).join(' L')}" stroke="#fff6e0" stroke-width="${(1 + k * 1.4).toFixed(1)}" fill="none" opacity="${(.3 + .3 * k).toFixed(2)}"/>`;
  if (k > .45) for (let q = 0; q < 8; q++) { const yy = 22 + q * (9 + k * 9); let rp = ''; for (let x = -30; x <= 750; x += 14) rp += (x === -30 ? 'M' : ' L') + x + ',' + (cy(x) + yy + 3 * Math.sin(x * .06 + q * 1.7)).toFixed(1); s += `<path d="${rp}" stroke="${dark}" stroke-width="1.2" fill="none" opacity="${(.16 * k).toFixed(2)}"/>`; }
  return s + `<path d="${d}" fill="#000" filter="url(#grainS)" opacity="${(.1 + .16 * k).toFixed(2)}"/>`;
}

// ---------- a sunlit boulder: an irregular block with a lit top facet, a shaded side and a soft shadow ----------
function rockS(x, y, sc, seed) {
  const r = RS(seed), w = 34 * sc * (.8 + .5 * r()), h = 24 * sc * (.7 + .6 * r()), n = 9, P = [];
  for (let i = 0; i <= n; i++) { const a = Math.PI + i / n * Math.PI, rr = .8 + .32 * r(); P.push([x + Math.cos(a) * w * rr, y + Math.sin(a) * h * rr]); }
  const top = P.map(p => [x + (p[0] - x) * (.52 + .1 * r()) - w * .1, y + (p[1] - y) * .62 - h * .12]), id = 'rs' + seed;
  return `<ellipse cx="${(x + w * .25).toFixed(1)}" cy="${(y + h * .08).toFixed(1)}" rx="${(w * 1.25).toFixed(1)}" ry="${(h * .24).toFixed(1)}" fill="#3a2a1a" opacity=".4" filter="url(#blur2)"/>` +
    `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b49a78"/><stop offset=".55" stop-color="#86705a"/><stop offset="1" stop-color="#4e3e30"/></linearGradient></defs>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="url(#${id})"/><path d="M${top.map(PT).join(' L')}Z" fill="#d8c29c" opacity=".7"/><path d="M${P.slice(Math.floor(n * .6)).map(PT).join(' L')} L${x.toFixed(1)},${y.toFixed(1)}Z" fill="#2a1e14" opacity=".3"/>` +
    `<path d="M${P.map(PT).join(' L')}Z" fill="#000" filter="url(#grainS)" opacity=".35"/><path d="M${P.slice(0, Math.ceil(n * .6)).map(PT).join(' L')}" stroke="#f2e2c0" stroke-width="${(1 + sc * .5).toFixed(1)}" fill="none" opacity=".5"/>`;
}
// ---------- the dry sea floor: the old coast far away (a slope kilometres high), rippled sediment, salt and damp patches, rocks ----------
function seabed(t, o = {}) {
  const hz = o.hz ?? 770, r = RS(o.seed || 3);
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/>` + sun3(o.sx ?? 150, o.sy ?? 440);
  s += mountainsR(hz - 96, 150, 461, { rock: '#b29a7e', haze: .62, hazeCol: '#e3d6c0', n0: 4 }) + `<rect x="-20" y="${hz - 62}" width="760" height="70" fill="#d6c6aa"/>` +
    mountainsR(hz - 14, 52, 462, { rock: '#a88c6c', haze: .4, hazeCol: '#dfcdb0' }) + `<rect x="-20" y="${hz - 4}" width="760" height="40" fill="#cdb692"/>`;
  s += `<rect x="-20" y="${hz}" width="760" height="${1300 - hz}" fill="url(#seaG2)"/><rect x="-20" y="${hz - 10}" width="760" height="70" fill="#efe2c6" opacity=".5" filter="url(#blur9)"/>`;
  for (let i = 0; i < 9; i++) { const k = r(), y = hz + 40 + k * k * 460, x = r() * 720, w = 50 + 170 * k; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${w.toFixed(0)}" ry="${(w * .15).toFixed(0)}" fill="${i % 3 ? '#86664a' : '#f8f2e4'}" opacity="${i % 3 ? .2 : .45}" filter="url(#blur5)"/>`; }
  for (let i = 0; i < 26; i++) { const k = Math.pow((i + .5) / 26, 1.7), y = hz + 14 + k * (1290 - hz), amp = 2 + 9 * k, wl = 40 + 150 * k, ph = r() * 9; let d = '';
    for (let x = -30; x <= 750; x += 12) d += (x === -30 ? 'M' : ' L') + x + ',' + (y + amp * Math.sin(x / wl * 6.28 + ph) + amp * .4 * Math.sin(x / wl * 15 + ph * 2)).toFixed(1);
    s += `<path d="${d}" stroke="#7a5a3a" stroke-width="${(1 + 3 * k).toFixed(1)}" fill="none" opacity="${(.1 + .16 * k).toFixed(2)}"/><path d="${d}" stroke="#fff3da" stroke-width="${(1 + 2 * k).toFixed(1)}" fill="none" opacity="${(.12 + .14 * k).toFixed(2)}" transform="translate(0,${(2 + 4 * k).toFixed(1)})"/>`; }
  s += `<rect x="-20" y="${hz}" width="760" height="${1300 - hz}" fill="#000" filter="url(#grainS)" opacity=".3"/>`;
  for (let i = 0; i < 12; i++) { const k = r(), y = hz + 30 + k * k * 480, x = r() * 720; if (Math.abs(x - 350) < 260 && y > 960 && y < 1090) continue; s += rockS(x, y, .4 + 1.5 * k, 70 + i); }
  return s;
}
// ---------- a container ship with its whole hull showing, lying on the ground (shipC from #32 draws it afloat) ----------
function shipC(x, y, s) { let c = ''; const r = RS(8); for (let i = 0; i < 9; i++) for (let j = 0; j < 3 + (i % 3 === 1 ? 1 : 0); j++) c += `<rect x="${-190 + i * 34}" y="${-56 - j * 20}" width="32" height="19" fill="${['#c84a3a', '#3a6ab0', '#e0a030', '#3a8a5a', '#8a8f98'][Math.floor(r() * 5)]}"/><path d="M${-190 + i * 34 + 8},${-56 - j * 20} v19 M${-190 + i * 34 + 16},${-56 - j * 20} v19 M${-190 + i * 34 + 24},${-56 - j * 20} v19" stroke="#000" stroke-opacity=".2"/><rect x="${-190 + i * 34}" y="${-56 - j * 20}" width="32" height="5" fill="#fff" opacity=".14"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-230,-36 L250,-36 L226,8 L-206,8Z" fill="#2a3a52"/><path d="M-230,-36 L250,-36 L246,-26 L-226,-26Z" fill="#fff" opacity=".2"/><path d="M-208,0 L228,0 L226,8 L-206,8Z" fill="#8a2a2a"/>${c}<rect x="132" y="-116" width="70" height="80" fill="#e8eaee"/><rect x="132" y="-116" width="70" height="80" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="138" y="-108" width="58" height="10" fill="#3a4a5a"/><rect x="138" y="-88" width="58" height="8" fill="#2a3a52"/><rect x="186" y="-116" width="16" height="80" fill="#000" opacity=".16"/><rect x="156" y="-146" width="22" height="30" fill="#c84a3a"/><path d="M167,-146 v-22" stroke="#3a3a40" stroke-width="3"/></g>`; }
function shipDry(x, y, s, rot) {
  const hull = `<path d="M-206,6 L226,6 L214,52 Q210,64 196,64 L-130,64 Q-176,58 -206,6Z" fill="url(#hullG2)"/><path d="M-206,6 L226,6 L224,16 L-200,16Z" fill="#000" opacity=".28"/><path d="M-140,58 L200,58" stroke="#000" stroke-width="5" opacity=".25"/>` +
    `<path d="M-214,2 q-22,10 -14,30 q8,10 26,6Z" fill="#6a201a"/>` +
    `<path d="M206,30 L236,34 L236,70 L202,64Z" fill="#3a1410"/><circle cx="222" cy="56" r="9" fill="#b89a4a"/><path d="M222,44 v24 M210,56 h24" stroke="#8a6a2a" stroke-width="4" stroke-linecap="round"/>` +
    Array.from({ length: 15 }, (_, i) => { const r = RS(i + 40), xx = -196 + i * 29 + r() * 10; return `<path d="M${xx.toFixed(1)},${(-30 + r() * 20).toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(28 + r() * 54).toFixed(1)}" stroke="#7a3a1a" stroke-width="${(2 + r() * 3).toFixed(1)}" opacity=".32" stroke-linecap="round"/>`; }).join('');
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${s})"><g transform="translate(0,-64)">${shipC(0, 0, 1)}${hull}</g></g>`;
}

// 0: the oceans drain away in two seconds
function sceneHook(t) {
  const k = ease(ramp(t, .35, 2.15));
  gW(t, { d: 7.6, el: .26, lon: -28 + t * 5, clouds: .45 - .2 * k, swap: k, lights: .3 });
  F.ov = ''; return space(t);
}
// 1: the floor nobody has seen: the longest mountain chain on Earth (the mid-ocean ridge), and a trench deeper than Everest is high
function trenchInset(a, kE) {
  if (a <= 0) return ''; const X0 = 60, Y0 = 868, Wd = 600, Hh = 330, sy = Y0 + 44, by = Y0 + Hh - 26, k = (by - sy) / 11;
  const vd = `M${X0 + 96},${sy} C${X0 + 176},${sy + 120} ${X0 + 206},${by} ${X0 + 236},${by} L${X0 + 364},${by} C${X0 + 394},${by} ${X0 + 424},${sy + 120} ${X0 + 504},${sy} Z`;
  let s = `<g opacity="${a.toFixed(2)}">` + panel(X0, Y0, Wd, Hh, 1) + `<defs><clipPath id="tiC"><rect x="${X0 + 8}" y="${Y0 + 8}" width="${Wd - 16}" height="${Hh - 16}" rx="12"/></clipPath><clipPath id="tiV"><path d="${vd}"/></clipPath></defs><g clip-path="url(#tiC)">`;
  s += `<rect x="${X0}" y="${Y0}" width="${Wd}" height="${sy - Y0}" fill="url(#dSky)"/>`;
  s += litRock(`M${X0},${sy} L${X0 + Wd},${sy} L${X0 + Wd},${Y0 + Hh} L${X0},${Y0 + Hh}Z`, 'ti', '#c8a27a', '#6a4a34', 51, { fx: .02, fy: .05, sc: 5, x: X0, y: sy, w: Wd, h: Hh });
  for (let i = 0; i < 9; i++) s += `<path d="M${X0},${sy + 16 + i * 30} q150,${i % 2 ? 7 : -7} 300,0 t300,0" stroke="${i % 2 ? '#4a2e1c' : '#f0cc9c'}" stroke-width="${3 + (i % 3) * 2}" fill="none" opacity=".22"/>`;
  s += `<path d="${vd}" fill="url(#trG)"/><path d="${vd}" fill="none" stroke="#2a1c12" stroke-width="5" opacity=".5"/>`;
  // Everest lowered into the trench: 8.85 km of the 11 km
  const H = 8.85 * k, ex = X0 + 300, off = (1 - kE) * 300, sil = [[-310, 0], [-250, .12], [-200, .2], [-160, .34], [-120, .4], [-80, .58], [-50, .66], [-22, .86], [0, 1], [26, .9], [48, .8], [70, .82], [110, .66], [150, .55], [190, .5], [230, .32], [270, .16], [310, 0]];
  const P = sil.map(([dx, f]) => [ex + dx * .2, by - H * f - off]), top = by - H - off;
  if (kE > 0) { const body = `M${P.map(PT).join(' L')}Z`, sn = top + H * .46, zz = Array.from({ length: 11 }, (_, i) => [ex + 70 - i * 14, sn + (i % 2 ? 26 : 0) + (i % 3) * 6]);
    s += `<g opacity="${clamp(kE * 3).toFixed(2)}"><defs><clipPath id="evI"><path d="${body}"/></clipPath></defs>` + litRock(body, 'evi' + Math.round(off), '#a39a8e', '#55504a', 57, { fx: .05, fy: .02, sc: 6, x: ex - 70, y: top - 6, w: 140, h: H + 12 }) +
      `<g clip-path="url(#evI)"><path d="M${ex - 80},${top - 10} L${ex + 80},${top - 10} L${zz.map(PT).join(' L')}Z" fill="#f6f8fc"/><path d="M${ex + 2},${top - 10} L${ex + 80},${top - 10} L${ex + 80},${by - off + 4} L${ex + 14},${by - off + 4} L${ex + 8},${(top + H * .5).toFixed(1)}Z" fill="#1a2030" opacity=".38"/></g></g>`; }
  s += `</g>`;
  s += `<path d="M${X0 + 20},${sy} H${X0 + Wd - 20}" stroke="#ff7a5a" stroke-width="3" stroke-dasharray="12 9" opacity=".9"/>` + lbl(X0 + Wd - 60, sy - 12, 'السطح', 1, '#ffb09a', 24);
  s += `<path d="M${X0 + 50},${sy} V${by}" stroke="#f4c76b" stroke-width="4"/><path d="M${X0 + 36},${sy} h28 M${X0 + 36},${by} h28" stroke="#f4c76b" stroke-width="4"/>` + lbl(X0 + 112, (sy + by) / 2 + 40, '١١ كم', 1, '#f4c76b', 36);
  if (kE > .9) { const q = clamp((kE - .9) * 10); s += `<g opacity="${q.toFixed(2)}"><path d="M${X0 + 420},${top} V${by}" stroke="#fff" stroke-width="3"/><path d="M${X0 + 408},${top} h24 M${X0 + 408},${by} h24" stroke="#fff" stroke-width="3"/>` + lbl(X0 + 508, (top + by) / 2 + 50, 'إيفرست', 1, '#fff', 28) + lbl(X0 + 508, (top + by) / 2 + 86, '٨٫٨ كم', 1, '#fff', 28) + `</g>`; }
  return s + `</g>`;
}
function sceneFloor(t) {
  const T = t - S0(1) + .2, mv = ease(ramp(t, WS(1, 9) + .2, WS(1, 10) + .7)), ia = ease(ramp(t, WS(1, 11) - .2, WS(1, 11) + .4));
  const G = gAt(t, 360, lerp(700, 520, mv), { d: lerp(8.2, 7.6, mv), el: lerp(.02, .3, mv), lon: lerp(42, 143, mv) + T * 1.2 * (1 - mv), clouds: .15, swap: 1, lights: .2, ridgeA: ease(ramp(t, WS(1, 5) - .3, WS(1, 6))) * (1 - .7 * mv), trenchA: ease(ramp(t, WS(1, 10), WS(1, 10) + .6)) });
  let o = `<defs>${DDEFS()}</defs>` + pin(G, 12.5, 141, 'خندقُ ماريانا', ease(ramp(t, WS(1, 10) + .5, WS(1, 11))), '#ffb09a', 30);
  o += trenchInset(ia, ease(ramp(t, WS(1, 12), WS(1, 14) + .2)));
  F.ov = o; return space(t);
}
// 2: the ships fall to a floor that is about 3.7 km down on average
function sceneShips(t) {
  const gy = 1052, t0 = S0(2) - .15, kf = ramp(t, t0, t0 + .95), hit = t0 + .95, kf2 = ramp(t, t0 + .4, t0 + 1.25), hit2 = t0 + 1.25;
  const set = ease(ramp(t, hit, hit + .5)), rot = lerp(-3, 8, set) + (t > hit ? 2.2 * Math.exp(-(t - hit) * 5) * Math.sin((t - hit) * 20) : 0);
  let s = `<defs>${DDEFS()}</defs>` + seabed(t, { hz: 770 });
  s += `<ellipse cx="556" cy="816" rx="62" ry="5" fill="#000" opacity="${(.32 * kf2).toFixed(2)}" filter="url(#blur2)"/>` + shipDry(556, lerp(260, 815, kf2 * kf2), .2, lerp(-2, -7, ease(ramp(t, hit2, hit2 + .4))));
  if (t > hit2) { const p = ramp(t, hit2, hit2 + 1.2); s += `<ellipse cx="556" cy="${(806 - 14 * p).toFixed(1)}" rx="${(40 + 70 * p).toFixed(1)}" ry="${(10 + 16 * p).toFixed(1)}" fill="#e6d4b0" opacity="${(.6 * (1 - p)).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += `<ellipse cx="350" cy="${gy + 4}" rx="${(110 + 130 * kf).toFixed(0)}" ry="${(7 + 9 * kf).toFixed(0)}" fill="#000" opacity="${(.1 + .32 * kf).toFixed(2)}" filter="url(#blur5)"/>`;
  s += shipDry(350, lerp(-90, gy, kf * kf), .92, rot);
  if (t > hit) { const p = ramp(t, hit, hit + 1.7), r = RS(4); for (let i = 0; i < 16; i++) { const dx = (r() - .5) * 520, rr = 30 + r() * 60; s += `<ellipse cx="${(350 + dx * (.6 + .6 * p)).toFixed(1)}" cy="${(gy + 4 - (16 + r() * 90) * p).toFixed(1)}" rx="${(rr * (1 + 1.6 * p)).toFixed(1)}" ry="${(rr * .6 * (1 + 1.2 * p)).toFixed(1)}" fill="#e6d4b0" opacity="${(.62 * (1 - p)).toFixed(2)}" filter="url(#blur9)"/>`; } }
  s += rockS(96, 1160, 1.9, 91) + rockS(640, 1216, 2.3, 92) + rockS(540, 1130, .9, 93);
  const la = ease(ramp(t, WS(2, 2), WS(2, 3) + .2)), da = ease(ramp(t, WS(2, 4), WS(2, 6)));
  s += `<g opacity="${la.toFixed(2)}"><path d="M20,404 H700" stroke="#a8d8ff" stroke-width="3" stroke-dasharray="16 10"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${60 + i * 130},398 q10,-9 20,0 t20,0" stroke="#a8d8ff" stroke-width="3" fill="none"/>`).join('') + lbl(430, 448, 'سطحُ البحرِ القديم', 1, '#c4e4ff', 28) + `</g>`;
  if (da > 0) s += `<g opacity="${clamp(da * 3).toFixed(2)}"><path d="M654,404 V${(404 + (gy - 404) * da).toFixed(1)}" stroke="#f4c76b" stroke-width="4"/><path d="M638,404 h32" stroke="#f4c76b" stroke-width="4"/>` + (da > .98 ? `<path d="M638,${gy} h32" stroke="#f4c76b" stroke-width="4"/>` : '') + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 3: the salt stays behind: enough to cover all the land with a layer 150 m thick
function saltFlat(t) {
  const hz = 730; let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/>` + sun3(540, 450);
  s += mountainsR(hz - 34, 96, 471, { rock: '#b8a48a', haze: .62, hazeCol: '#e8dcc8' }) + `<rect x="-20" y="${hz - 8}" width="760" height="30" fill="#e6dcc8"/>`;
  s += `<rect x="-20" y="${hz}" width="760" height="${1300 - hz}" fill="url(#saltG2)"/>` + cracks(hz + 2, 1300, .5, 19, -20, 740, '#9c8e78', '#f3f0e8');
  s += `<rect x="-20" y="${hz - 20}" width="760" height="130" fill="#fff" opacity=".55" filter="url(#blur9)"/>`;
  s += `<ellipse cx="520" cy="${hz + 50}" rx="56" ry="4" fill="#5a5048" opacity=".35" filter="url(#blur2)"/>` + shipDry(520, hz + 49, .18, -6);
  s += `<rect x="-20" y="${hz}" width="760" height="${1300 - hz}" fill="#000" filter="url(#grainS)" opacity=".14"/>` + sparkles(360, 1010, 700, 520, 46, t, .85, 5);
  return s;
}
function saltCity(t, k) {   // 2 px per metre: 150 m = 300 px
  const base = 1130, top = base - 300 * k; let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/>` + sun3(560, 440) + farCity(91, base, '#9aa8b8');
  [[100, 120, 330, '#8f98a6', 966, 2], [430, 110, 380, '#a09a94', 967, 0], [250, 100, 210, '#9a8f86', 968, 1]].forEach(([x, w, h, c, sd, kd]) => { s += blockN(x, base, w, h, c, sd, kd).s; }); s += `<rect x="-20" y="${base - 520}" width="760" height="520" fill="#b8cadc" opacity=".45"/>`;
  [[14, 146, 190, '#b89a7a', 961, 1], [176, 132, 250, '#8a9aa8', 962, 2], [330, 150, 500, '#9aa6b6', 963, 2], [498, 110, 150, '#d2c4a8', 964, 0], [596, 128, 230, '#a87a62', 965, 1]].forEach(([x, w, h, c, sd, kd]) => { s += blockN(x, base, w, h, c, sd, kd).s; });
  s += `<rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="url(#soilG)"/><rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="-20" y="${base}" width="760" height="8" fill="#8a8478"/>`;
  if (k > 0) { let d = `M-20,${base}`; for (let x = -20; x <= 740; x += 20) d += ` L${x},${(top + 5 * Math.sin(x * .021 + 1) + 3 * Math.sin(x * .07)).toFixed(1)}`; d += ` L740,${base}Z`;
    s += `<path d="${d}" fill="url(#saltG2)" opacity=".93"/><path d="${d}" fill="#000" filter="url(#grainS)" opacity=".16"/>` + Array.from({ length: 7 }, (_, i) => { const y = top + 26 + i * 42; return y < base - 6 ? `<path d="M-20,${y} q120,${i % 2 ? 5 : -5} 240,0 t240,0 t240,0 t240,0" stroke="#b8ae9a" stroke-width="2" fill="none" opacity=".4"/>` : ''; }).join('') +
      `<path d="${d.replace(/ L740,\d+Z$/, '')}" stroke="#fff" stroke-width="5" fill="none"/>`;
    s += `<path d="M52,${base} V${top.toFixed(1)}" stroke="#f4c76b" stroke-width="5"/><path d="M34,${base} h36 M34,${top.toFixed(1)} h36" stroke="#f4c76b" stroke-width="5"/>`; }
  return s;
}
function sceneSalt(t) {
  const q = ease(ramp(t, WS(3, 5) - .25, WS(3, 5) + .35)), k = ease(ramp(t, WS(3, 8) - .2, WS(3, 11)));
  let s = `<defs>${DDEFS()}</defs>` + (q < 1 ? saltFlat(t) : '') + (q > 0 ? `<g opacity="${q.toFixed(2)}">${saltCity(t, k)}</g>` : '');
  noEarth(); F.ov = ''; return s;
}
// 4: then the rain almost stops: most of the water vapour comes from the oceans
function sceneRain(t) {
  const T = t - S0(4) + .2, y0 = PV + 74, k = ease(ramp(t, WS(4, 1) - .2, WS(4, 3) + .6)), lk = ease(ramp(t, WS(4, 2), WS(4, 3) + .3));
  const sky = [mix('#566474', '#3f78c2', k), mix('#8a96a4', '#9cc0e4', k), mix('#b4bac0', '#ebe3d0', k)];
  let cl = ''; [[110, 430, 330, 41], [430, 480, 370, 42], [650, 410, 300, 43], [290, 580, 290, 44], [10, 560, 270, 45], [560, 600, 260, 46]].forEach(([x, y, w, sd], i) => { cl += cumulus(x + T * 16 * (i % 2 ? 1 : -1), y - 14 * k, w, sd, { a: .96 * (1 - k) }); });
  const back = sun3(150, 400, k) + `<g filter="url(#darkC)">${cl}</g>`;
  const xa = 172, xb = 506, xw = 286 + T * 19;
  const fg = looker(xa, y0 + 8, .78, 1, 2, lk, t, { hF: [xa + .78 * 58, y0 + 8 - .78 * 168] }) + hero(xw, y0 + 16, Object.assign({ s: .76, face: 1, shade: 1, walk: xw / 26 }, palS(9))) + looker(xb, y0 + 12, .8, -1, 6, lk, t);
  const ground = `<rect x="-20" y="${PV}" width="760" height="${1300 - PV}" fill="#5a6a7c" opacity="${(.32 * (1 - k)).toFixed(2)}"/>` + Array.from({ length: 7 }, (_, i) => `<ellipse cx="${60 + i * 105}" cy="${PV + 40 + (i % 3) * 30}" rx="${46 + (i % 2) * 20}" ry="7" fill="#dfe8f2" opacity="${(.3 * (1 - k)).toFixed(2)}"/>`).join('');
  let s = `<defs>${DDEFS()}</defs>` + street8(t, { N: 0, id: 'dr', sky, overcast: 1, back, cars: 0, ground: ground + car(640, 1170, .95, '#d8d8dc', -1, 0), fg });
  s += rain(t, (1 - k) * .95, 190, 3);
  noEarth(); F.ov = ''; return s;
}
// 5: rivers dry up, forests die, the land turns to desert
function sceneLand(t) {
  const kd = ease(ramp(t, S0(5) + .35, WS(5, 2) + .35)), kf = ease(ramp(t, WS(5, 2) - .3, WS(5, 4))), kq = ease(ramp(t, WS(5, 4) + .1, WS(5, 7) + .4)), hz = 770;
  let s = `<defs>${DDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)" opacity="${kq.toFixed(2)}"/>` + sun3(560, 440) +
    cumulus(160, 520, 200, 51, { a: .85 * (1 - kd) }) + cumulus(430, 600, 150, 52, { a: .7 * (1 - kd) });
  s += mountainsR(hz - 30, 120, 481, { rock: mix('#7c887e', '#a8947a', kf), haze: .5, hazeCol: '#d6dcdc', snowAt: .62 }) + `<rect x="-20" y="${hz - 12}" width="760" height="60" fill="${mix('#7a9468', '#b49a72', kf)}"/>`;
  s += mountainsR(hz + 12, 44, 482, { rock: mix('#5e7c48', '#9c8658', kf), haze: .25, hazeCol: '#d6dcd0' });
  s += meadow(hz + 30, 1300, t, { c0: mix('#7c9c4a', '#bca070', kf), c1: mix('#4e6e2c', '#8c7046', kf) });
  s += forestR(hz + 40, 36, 56, 104, 5, mix('#3a6a32', '#84705a', kf), { haze: .12 + .2 * kf, hazeCol: '#c8c4b4' });
  // the river: winds from the hills to the foreground
  const L = [], Rr = []; for (let i = 0; i <= 26; i++) { const v = i / 26, y = hz + 36 + Math.pow(v, 1.5) * (1310 - hz - 36), cx = 380 + 170 * Math.sin(v * 4.4 + .5) * (.25 + .75 * v) - 90 * v, w = 5 + 150 * Math.pow(v, 1.5); L.push([cx - w, y]); Rr.push([cx + w, y]); }
  const rv = `M${L.map(PT).join(' L')} L${Rr.slice().reverse().map(PT).join(' L')}Z`;
  s += `<defs><clipPath id="rvC"><path d="${rv}"/></clipPath></defs><path d="${rv}" fill="#8a6a48"/><g clip-path="url(#rvC)"><rect x="-20" y="${hz}" width="760" height="560" fill="#000" filter="url(#grainR)" opacity=".3"/>` + cracks(hz + 30, 1300, kd, 7, -20, 740, '#3e2816') +
    `<g opacity="${(1 - kd).toFixed(2)}"><rect x="-20" y="${hz}" width="760" height="560" fill="url(#rivG)"/>` + Array.from({ length: 22 }, (_, i) => { const r = RS(i + 60), v = Math.pow(r(), .7), y = hz + 40 + Math.pow(v, 1.5) * 500, x = 120 + r() * 480 + 12 * Math.sin(t * 1.4 + i); return `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(14 + 30 * v).toFixed(1)},-4 ${(28 + 60 * v).toFixed(1)},0" stroke="#fff" stroke-width="${(1 + 2.4 * v).toFixed(1)}" fill="none" opacity=".55"/>`; }).join('') + `<path d="M${L.map(p => [p[0] + 3 + (p[1] - hz) * .04, p[1]]).map(PT).join(' L')}" stroke="#d8f0ff" stroke-width="6" fill="none" opacity=".35" filter="url(#blur2)"/></g></g>` +
    `<path d="M${L.map(PT).join(' L')}" stroke="#3a2a1a" stroke-width="5" fill="none" opacity=".35"/><path d="M${Rr.map(PT).join(' L')}" stroke="#3a2a1a" stroke-width="4" fill="none" opacity=".25"/>`;
  // the sand takes over
  if (kq > 0) s += `<g opacity="${kq.toFixed(2)}">` + duneL(hz + 20, .1, 61) + duneL(hz + 90, .35, 62) + duneL(hz + 220, .65, 63) + `</g>`;
  const tr = [[108, 1040, 250, 5], [612, 1110, 300, 6], [470, 930, 150, 7]];
  tr.forEach(([x, y, h, sd]) => { s += `<ellipse cx="${x + 30}" cy="${y + 6}" rx="${h * .3}" ry="${h * .04}" fill="#000" opacity=".25" filter="url(#blur5)"/>` + (kf < 1 ? `<g opacity="${(1 - kf).toFixed(2)}">${treeB(x, y, h, sd, 0, kd * .9)}</g>` : '') + (kf > 0 ? `<g opacity="${kf.toFixed(2)}">${deadTree(x, y, h * .95, sd + 20)}</g>` : ''); });
  if (kq > 0) s += `<g opacity="${kq.toFixed(2)}">` + duneL(1190, 1, 64) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 6: scorching days, freezing nights: no sea to soften the temperature
function sceneTemp(t) {
  const T = t - S0(6) + .2, y0 = PV + 74, N = ease(ramp(t, WS(6, 2) - .4, WS(6, 3) - .1)), v = lerp(50, -12, ease(ramp(t, WS(6, 2) - .3, WS(6, 3) + .5)));
  const sky = [mix('#4f86c4', '#060c24', N), mix('#a9c6de', '#16224a', N), mix('#f2e4c4', '#3a3660', N)];
  const xa = 268, xb = 524, sh = N * 1.4 * Math.sin(t * 38), hug = N > .5;
  const A = { s: .8, face: 1, shade: 1, lean: 4 * N }, B = { s: .78, face: -1, shade: 1, lean: 4 * N };
  if (hug) { A.aF = [.7, -1.9]; A.aB = [.55, -1.75]; B.aF = [.7, -1.9]; B.aB = [.55, -1.75]; }   // forearms folded across the chest
  else { A.hF = [xa + .8 * 22, y0 + 6 - .8 * 268]; B.hF = [xb - .78 * 30, y0 + 12 - .78 * 262]; }
  let fg = hero(xa + sh, y0 + 6, Object.assign(A, palS(4))) + hero(xb - sh, y0 + 12, Object.assign(B, palS(1)));
  if (N > .6) [[xa + 30, y0 + 6 - .8 * 246, 1], [xb - 30, y0 + 12 - .78 * 246, -1]].forEach(([x, y, f], i) => { const p = pmod(t * .7 + i * .5, 1); fg += `<ellipse cx="${(x + f * 30 * p).toFixed(1)}" cy="${(y - 10 * p).toFixed(1)}" rx="${(8 + 22 * p).toFixed(1)}" ry="${(6 + 12 * p).toFixed(1)}" fill="#eaf2ff" opacity="${(.5 * (1 - p) * N).toFixed(2)}" filter="url(#blur5)"/>`; });
  const ground = `<rect x="-20" y="${PV}" width="760" height="${1300 - PV}" fill="#eef4ff" opacity="${(.3 * N).toFixed(2)}"/>` + car(470, 1170, .95, '#b8b0a2', -1, 0);
  let s = `<defs>${DDEFS()}</defs>` + street8(t, { N, id: 'dt', sky, cars: 0, dead: 1, overcast: 1, noMoon: 1, back: `<circle cx="150" cy="400" r="300" fill="url(#sunW)" opacity="${(.7 * (1 - N)).toFixed(2)}"/>` + sun3(150, 400, 1 - N), warp: N < .97 ? 4.5 * (1 - N) : 0, ground, top: fg });
  s += thermo(118, 850, v, 1, '') + lbl(118, 478, v >= 0 ? `${AR(Math.round(v))}°` : `${AR(Math.round(-v))}° تحت الصفر`, 1, v > 15 ? '#ffb08a' : '#a8d4ff', v >= 0 ? 36 : 27);
  noEarth(); F.ov = ''; return s;
}
// 7: dust and salt storms; the abandoned cities are buried under the sand
function ruinB(x, base, w, h, col, seed, kind, cutF) {
  const r = RS(seed + 5), top = base - h, b = blockN(x, base, w, h, col, seed, kind), W2 = w * 1.12 + 16;
  const body = b.s.replace(/#48688a|#4a6a88|#5a7890/g, '#211a14').replace(/#cfe6f8/g, '#2a221a');
  const dir = r() > .5 ? 1 : -1, n = 8, cut = h * (cutF ?? (.2 + r() * .26)), pts = [];
  for (let i = 0; i <= n; i++) { const f = i / n, dd = dir > 0 ? f : 1 - f; pts.push([x - 8 + W2 * f, top - 34 + cut * Math.pow(dd, 1.25) + (i % 2 ? 18 : 0) * (.4 + r()) + r() * 12]); }
  const id = 'rb' + seed, clip = `M${x - 12},${base + 6} L${x - 12},${pts[0][1].toFixed(1)} L${pts.map(PT).join(' L')} L${x + W2},${base + 6}Z`;
  let s = `<defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs><g clip-path="url(#${id})">${body}`;
  for (let q = 0; q < 6; q++) { let cx = x + r() * w, cy = top + cut * .5 + r() * h * .45, d = `M${cx.toFixed(1)},${cy.toFixed(1)}`; for (let i = 0; i < 6; i++) { cx += (r() - .5) * 28; cy += 14 + r() * 26; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; } s += `<path d="${d}" stroke="#1e1610" stroke-width="${(1.2 + r() * 1.8).toFixed(1)}" fill="none" opacity=".6"/>`; }
  for (let q = 0; q < 9; q++) { const sx = x + r() * w; s += `<path d="M${sx.toFixed(1)},${(top + cut * r()).toFixed(1)} l${(r() * 6 - 3).toFixed(1)},${(60 + r() * 160).toFixed(1)}" stroke="#4a3620" stroke-width="${(2 + r() * 5).toFixed(1)}" opacity=".2" stroke-linecap="round"/>`; }
  s += `<rect x="${x - 12}" y="${top - 60}" width="${W2 + 12}" height="${h + 70}" fill="#c89c62" opacity=".3"/></g>`;
  s += `<path d="M${pts.map(PT).join(' L')}" stroke="#eadcc0" stroke-width="3.5" fill="none" opacity=".6" stroke-linejoin="round"/>`;
  pts.forEach((p, i) => { if (i % 2) s += `<path d="M${p[0].toFixed(1)},${p[1].toFixed(1)} l${(r() * 10 - 5).toFixed(1)},${(-10 - r() * 16).toFixed(1)} M${(p[0] + 7).toFixed(1)},${(p[1] + 2).toFixed(1)} l${(r() * 8 - 2).toFixed(1)},${(-8 - r() * 14).toFixed(1)}" stroke="#2e2018" stroke-width="1.8" fill="none"/>`; });
  return s;
}
function farRuins(seed, base, col, n = 15) { const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = -30 + i * (790 / n) + r() * 14, w = 30 + r() * 38, h = 70 + r() * 200, m = 5; let d = `M${x.toFixed(1)},${base} L${x.toFixed(1)},${(base - h * (.6 + r() * .4)).toFixed(1)}`;
    for (let q = 1; q <= m; q++) d += ` L${(x + w * q / m).toFixed(1)},${(base - h * (.5 + r() * .5)).toFixed(1)}`; s += `<path d="${d} L${(x + w).toFixed(1)},${base}Z" fill="${col}"/>`;
    for (let a = 0; a < 3; a++) for (let b = 0; b < Math.floor(h * .45 / 16); b++) if (r() > .35) s += `<rect x="${(x + 5 + a * (w - 8) / 3).toFixed(1)}" y="${(base - h * .48 + b * 16).toFixed(1)}" width="${((w - 12) / 3 - 2).toFixed(1)}" height="8" fill="#000" opacity=".2"/>`; }
  return s; }
// a wall of dust whose front edge is near x = xf (dust fills everything to its left)
function dustWall(xf, t, a = 1) {
  if (a <= 0) return ''; const r = RS(21); let s = `<rect x="${(xf - 1900).toFixed(0)}" y="420" width="1800" height="900" fill="#b98b55"/>`;
  for (let i = 0; i < 20; i++) { const x = xf - 80 - i * 95 + (r() - .5) * 40, y = 430 - 16 * Math.sin(i * .9) - Math.min(i, 5) * 14 + (r() - .5) * 30; s += `<circle cx="${(x + 10 * Math.sin(t * 1.1 + i)).toFixed(1)}" cy="${y.toFixed(1)}" r="${(100 + r() * 70).toFixed(1)}" fill="${['#c79a62', '#b98b55', '#d2a772'][i % 3]}"/>`; }
  for (let i = 0; i < 24; i++) { const k = i / 23, y = 440 + k * 860 + (r() - .5) * 60, x = xf - 70 - 60 * Math.sin(k * 3.1) - r() * 70 + 14 * Math.sin(t * 1.3 + i); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(110 + r() * 100).toFixed(1)}" fill="${['#c79a62', '#b98b55', '#d2a772'][i % 3]}"/>`; }
  for (let i = 0; i < 26; i++) { const y = 400 + r() * 880, x = xf - 40 - r() * 520 + 10 * Math.sin(t * 1.7 + i * 2); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(50 + r() * 90).toFixed(1)}" fill="${i % 2 ? '#e2bf8a' : '#a87c4a'}" opacity=".45"/>`; }
  return `<g opacity="${a.toFixed(2)}"><g filter="url(#dustB2)">${s}</g></g>`;
}
function sandBlow(t, a, n = 80, seed = 9) { if (a <= 0) return ''; const r = RS(seed); let s = `<g opacity="${a.toFixed(2)}" stroke-linecap="round" fill="none">`;
  for (let i = 0; i < n; i++) { const z = .4 + r(), y = 390 + r() * 900, sp = 480 + 520 * z, x = pmod(r() * 1200 + t * sp, 1200) - 240, L = 70 + 170 * z, wv = 9 * Math.sin(t * 2 + i);
    s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(L / 2).toFixed(1)},${(-8 + wv).toFixed(1)} ${L.toFixed(1)},-2" stroke="#f4dcae" stroke-width="${(1 + 2.2 * z).toFixed(1)}" opacity="${(.12 + .22 * r()).toFixed(2)}"/>`; }
  return s + `</g>`; }
const SANDC = { lit: '#ecc98e', low: '#d2a468', dark: '#a8743e', haze: '#e4c896' };
function ruinCity(t, k) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#stSky)"/><circle cx="540" cy="450" r="260" fill="url(#sunW)" opacity=".8"/><circle cx="540" cy="450" r="36" fill="#fff6dc" opacity=".9" filter="url(#blur5)"/>`;
  s += farRuins(31, 905, '#b48e60') + `<rect x="-20" y="640" width="760" height="280" fill="#dcb880" opacity=".42"/>` + duneL(905, .15, 71, Object.assign({ amp: 16 }, SANDC));
  [[-14, 172, 470, '#b89a7a', 981, 1], [160, 148, 400, '#8a9aa8', 982, 2], [306, 160, 450, '#d2c4a8', 983, 0], [466, 144, 520, '#a87a62', 984, 1], [610, 136, 410, '#c8b89a', 985, 0]].forEach(([x, w, h, c, sd, kd], i) => { s += ruinB(x, 1010, w, h, c, sd, kd, i === 3 ? .62 : i === 1 ? .12 : undefined); });
  s += `<rect x="-20" y="930" width="760" height="90" fill="url(#aoUp)" opacity=".45"/>`;
  s += duneL(lerp(1014, 940, k), .5, 72, Object.assign({ amp: 26 }, SANDC));                                   // the drift against the walls
  s += `<g transform="rotate(12,70,1090)">${lampD(46, 1090, 250)}</g>` + deadTree(604, 1070, 250, 343, '#3e3024');
  s += `<g transform="translate(262,1040) rotate(-16)"><rect x="-72" y="-17" width="144" height="32" fill="#6a4428"/><rect x="-72" y="-17" width="144" height="6" fill="#fff" opacity=".18"/><text x="0" y="8" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#e8dcc8">قهوة</text><rect x="-72" y="-17" width="144" height="32" fill="#c89c62" opacity=".35"/></g>`;
  s += `<g transform="rotate(-5,440,1120)">${car(440, 1160, .95, '#9a9488', -1, 0)}<rect x="340" y="1066" width="210" height="96" fill="#c89c62" opacity=".28"/></g>`;
  s += duneL(lerp(1128, 1100, k), .8, 73, Object.assign({ amp: 20 }, SANDC)) + duneL(1240, 1, 74, SANDC);
  s += `<rect x="-20" y="300" width="760" height="1000" fill="#d8ac6c" opacity=".18"/>` + sandBlow(t, .95);
  return s;
}
function sceneStorm(t) {
  const xf = lerp(-260, 1150, ease(ramp(t, WS(7, 0) - .2, WS(7, 2) + .5))), cut = WS(7, 3) + .3, da = 1 - ease(ramp(t, WS(7, 4) - .25, WS(7, 5) + .25)), k = ease(ramp(t, WS(7, 5), S0(8)));
  let s = `<defs>${DDEFS()}</defs>`;
  if (t < cut) { const sky = ['#8ea4b8', '#cdbf9e', '#ead4a4'], back = sun3(560, 350, .75);
    s += street8(t, { N: 0, id: 'ds', sky, overcast: 1, back, cars: 0, dead: 1, ground: `<rect x="-20" y="${PV}" width="760" height="${1300 - PV}" fill="#d2b07a" opacity=".3"/>` + car(470, 1170, .95, '#a8a092', -1, 0) }) + `<rect x="-20" y="300" width="760" height="1000" fill="#d8ac6c" opacity=".16"/>` + sandBlow(t, .5, 50, 4); }
  else s += ruinCity(t, k);
  s += dustWall(xf, t, da) + sandBlow(t, .85 * ease(ramp(t, WS(7, 1), WS(7, 2))) * da, 60, 14);
  noEarth(); F.ov = ''; return s;
}
// 8: we lose the marine plankton that make about half of the oxygen
function plank(x, y, S, kind, rot, dead, seed) {
  const g = mix(['#6cbf3f', '#a8c83a', '#4fb07a', '#c8b040'][seed % 4], '#a09a8a', dead), g2 = mix('#2f7a2a', '#6e685a', dead), sh = mix('#eafff2', '#dcd6c6', dead); let s = '';
  if (kind === 0) s = `<circle r="30" fill="${sh}" opacity=".5"/><circle r="26" fill="${g}" opacity=".88"/>` + Array.from({ length: 16 }, (_, i) => { const a = i / 16 * 6.283; return `<path d="M${(Math.cos(a) * 7).toFixed(1)},${(Math.sin(a) * 7).toFixed(1)} L${(Math.cos(a) * 25).toFixed(1)},${(Math.sin(a) * 25).toFixed(1)}" stroke="${g2}" stroke-width="1.6" opacity=".7"/>`; }).join('') + `<circle r="16" fill="none" stroke="${g2}" stroke-width="1.2" opacity=".5"/><circle r="6" fill="${g2}" opacity=".8"/><circle r="30" fill="none" stroke="${sh}" stroke-width="2.5" opacity=".9"/><path d="M-18,-14 q10,-10 22,-8" stroke="#fff" stroke-width="3" fill="none" opacity=".5" stroke-linecap="round"/>`;
  else if (kind === 1) s = `<path d="M-46,0 Q0,-18 46,0 Q0,18 -46,0Z" fill="${sh}" opacity=".55"/><path d="M-42,0 Q0,-13 42,0 Q0,13 -42,0Z" fill="${g}" opacity=".88"/><path d="M-40,0 H40" stroke="${g2}" stroke-width="1.6"/>` + Array.from({ length: 13 }, (_, i) => { const xx = -36 + i * 6, hh = 11 * Math.sin((i + 1) / 14 * 3.1416); return `<path d="M${xx},${(-hh).toFixed(1)} V${hh.toFixed(1)}" stroke="${g2}" stroke-width="1.2" opacity=".6"/>`; }).join('') + `<ellipse cx="-14" cy="0" rx="8" ry="5" fill="${g2}" opacity=".6"/><ellipse cx="14" cy="0" rx="8" ry="5" fill="${g2}" opacity=".6"/><path d="M-30,-6 q14,-7 30,-7" stroke="#fff" stroke-width="2" fill="none" opacity=".45" stroke-linecap="round"/>`;
  else if (kind === 2) s = `<path d="M0,-34 L8,-16 Q26,-12 24,4 Q22,20 8,22 L14,40 L2,26 L-6,38 L-8,22 Q-24,18 -24,2 Q-24,-12 -8,-16Z" fill="${mix('#c8843a', '#a09a8a', dead)}" opacity=".9"/><path d="M-24,2 Q0,10 24,4" stroke="${mix('#6a3a12', '#5a544a', dead)}" stroke-width="3" fill="none"/><path d="M-10,-8 q8,-6 14,-2" stroke="#fff" stroke-width="2.5" fill="none" opacity=".4" stroke-linecap="round"/>`;
  else s = Array.from({ length: 5 }, (_, i) => `<rect x="${-50 + i * 20}" y="-9" width="18" height="18" rx="4" fill="${g}" opacity=".88" stroke="${sh}" stroke-width="2"/><ellipse cx="${-41 + i * 20}" cy="0" rx="5" ry="6" fill="${g2}" opacity=".7"/>`).join('');
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${S.toFixed(2)})">${s}</g>`;
}
function scenePlankton(t) {
  const T = t - S0(8) + .2, cx = 360, cy = 730, R = 286, dk = ease(ramp(t, WS(8, 0) + .2, WS(8, 2) + .7)), live = 1 - dk, r = RS(8); let f = '';
  for (let i = 0; i < 24; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * (R - 46), x = cx + Math.cos(a) * d + Math.sin(T * .5 + i) * 12 * live, y = cy + Math.sin(a) * d + Math.cos(T * .4 + i * 2) * 9 * live; f += plank(x, y, .66 + r() * .7, i % 4, r() * 360 + Math.min(T, WS(8, 2) - S0(8)) * (5 + i % 5) * (i % 2 ? 1 : -1), dk, i + 3); }
  for (let i = 0; i < 18; i++) { const x = cx - 220 + r() * 440, sp = 40 + r() * 50, y = cy + 270 - pmod(r() * 540 + T * sp, 540), rr = 5 + r() * 8; f += `<g opacity="${(.9 * live).toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="#fff" opacity=".22"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".85"/><circle cx="${(x - rr * .35).toFixed(1)}" cy="${(y - rr * .35).toFixed(1)}" r="${(rr * .22).toFixed(1)}" fill="#fff" opacity=".9"/></g>`; }
  let s = `<defs>${DDEFS()}<clipPath id="pkC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#labD2)"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 40}" fill="#fff" opacity=".05" filter="url(#soft)"/><g clip-path="url(#pkC)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#micW2)"/><g opacity="${dk.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#micD2)"/>` + cracks(cy - R, cy + R + 60, .45, 29, cx - R - 60, cx + R + 60, '#8a7858') + `</g>${f}` +
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-width="70" opacity=".22" filter="url(#blur9)"/></g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#0c1220" stroke-width="16"/><circle cx="${cx}" cy="${cy}" r="${R + 9}" fill="none" stroke="#5a6a82" stroke-width="3" opacity=".7"/>`;
  s += lbl(cx + 150, cy - 170, 'O₂', (.95 * live).toFixed(2), '#eaffff', 34) + lbl(cx - 170, cy + 150, 'O₂', (.95 * live).toFixed(2), '#eaffff', 30);
  // the sources of oxygen: about half from land plants, about half from ocean plankton
  const ba = ease(ramp(t, WS(8, 3), WS(8, 4))), X0 = 80, Y = 1146, Wd = 560, hh = 46, gk = ease(ramp(t, WS(8, 5), WS(8, 7)));
  s += `<g opacity="${ba.toFixed(2)}">` + panel(50, 1076, 620, 138, 1) + lbl(360, 1118, 'مصادرُ الأكسجين', 1, '#fff', 28) +
    `<clipPath id="oxC"><rect x="${X0}" y="${Y}" width="${Wd}" height="${hh}" rx="14"/></clipPath><g clip-path="url(#oxC)"><rect x="${X0}" y="${Y}" width="${Wd / 2}" height="${hh}" fill="#4f9a3a"/><rect x="${X0 + Wd / 2}" y="${Y}" width="${Wd / 2}" height="${hh}" fill="${mix('#2a9aa8', '#5a5650', gk)}"/><rect x="${X0}" y="${Y}" width="${Wd}" height="${hh * .45}" fill="#fff" opacity=".14"/></g>` +
    `<rect x="${X0}" y="${Y}" width="${Wd}" height="${hh}" rx="14" fill="none" stroke="#f4c76b" stroke-width="3"/><path d="M${X0 + Wd / 2},${Y} v${hh}" stroke="#f4c76b" stroke-width="3"/>` +
    lbl(X0 + Wd * .25, Y + 33, 'نباتاتُ اليابسة', 1, '#fff', 26) + lbl(X0 + Wd * .75, Y + 33, 'عوالقُ البحر', 1, mix('#ffffff', '#b8b0a4', gk), 26) +
    (gk > 0 ? `<path d="M${X0 + Wd * .56},${Y + 6} L${X0 + Wd * .94},${Y + hh - 6} M${X0 + Wd * .94},${Y + 6} L${X0 + Wd * .56},${Y + hh - 6}" stroke="#ff5a4a" stroke-width="5" stroke-linecap="round" opacity="${gk.toFixed(2)}"/>` : '') + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 9: the surprise: this really happened on Mars. It had rivers and lakes billions of years ago; today it is a dead desert
function sceneMars(t) {
  const T = t - S0(9) + .2, mv = ease(ramp(t, WS(9, 3) - .3, WS(9, 5) + .2));
  const G = gAt(t, lerp(360, -330, mv), lerp(720, 430, mv), { d: lerp(7.8, 11, mv), el: .2, lon: 35 + T * 2.5, clouds: 0, swap: 1, lights: 0 }); F.w.disc.scorch = 1;
  const fp = fpx(G.cam), zM = 9, mr = 250 * zM / fp, mx = lerp(1060, 360, mv), my = 760;
  const wet = ease(ramp(t, WS(9, 6) - .3, WS(9, 7) + .4)) * (1 - ease(ramp(t, WS(9, 13) - .1, WS(9, 14) + .5)));
  if (mv > .01) F.w.moon = { pos: camPt(G.cam, mx, my, zM), L: F.w.L, shC: NOFAR, shR: .001, r: mr, rot: 2.2 + T * .05, wet };
  F.ov = lbl(360, 1076, 'المريخ', ease(ramp(t, WS(9, 5), WS(9, 5) + .4)).toFixed(2), '#ffd0a0', 40);
  return space(t);
}
// 10: ask and subscribe (the water comes back)
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, back = ease(ramp(t, S0(10) - .1, S0(10) + 1.5));
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: -20 - (t - S0(10)) * 4, clouds: .4 * back, swap: 1 - back }); F.w.disc.scorch = 1 - back;
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 4) - .3, WS(10, 4) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneFloor }, { s: S0(2) - .2, f: sceneShips }, { s: S0(3) - .2, f: sceneSalt }, { s: S0(4) - .2, f: sceneRain }, { s: S0(5) - .2, f: sceneLand }, { s: S0(6) - .2, f: sceneTemp }, { s: S0(7) - .2, f: sceneStorm }, { s: S0(8) - .2, f: scenePlankton }, { s: S0(9) - .2, f: sceneMars }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneFloor, sceneShips, sceneSalt, scenePlankton, sceneMars]);
const XF = .5;
const TLI = [['السفنُ تسقط', S0(2)], ['المطرُ يتوقّف', S0(4)], ['اليابسةُ صحراء', S0(5)], ['المدنُ تُدفَن', S0(7)]];
const LIST_ON = new Set([sceneRain, sceneTemp]);
const CHIPS = [
  ['c1', 'أطولُ سلسلةِ جبال: ٦٥ ألف كم', 360, 330, 'big', WS(1, 5), WS(1, 10)],
  ['c1b', 'أعمقُ من إيفرست', 360, 330, 'red big', WS(1, 11), S0(2) - .3],
  ['c2', 'متوسّطُ العمق: ٣٫٧ كم', 360, 1200, 'big', WS(2, 5), S0(3) - .3],
  ['c3', 'طبقةُ ملح: ١٥٠ مترًا', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', '٨٦٪ من التبخّرِ يأتي من المحيطات', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c5', 'اليابسةُ صحراء', 360, 330, 'red big', WS(5, 5), S0(6) - .3],
  ['c7', 'عواصفُ الغبارِ والملح', 360, 330, 'big', WS(7, 1), WS(7, 4)],
  ['c7b', 'مدنٌ تحتَ الرمال', 360, 330, 'red big', WS(7, 5), S0(8) - .3],
  ['c8', 'نصفُ الأكسجين', 360, 330, 'red big', WS(8, 6), S0(9) - .3],
  ['c9', 'قبلَ أكثرَ من ٣ مليارات سنة', 360, 330, 'big', WS(9, 7), WS(9, 13)],
  ['c9b', 'اليوم: صحراءُ ميتة', 360, 330, 'red big', WS(9, 14), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 4), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا محيطات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
