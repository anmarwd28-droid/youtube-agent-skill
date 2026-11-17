// ===================== "what if only 99 people were left in the world?" (Short #46) =====================
// gl3d_ln.js = gl3d_dry.js (the house Earth with the mirror and 3D-fade fixes). The 99 people are 99 land points (ppl99.js, made by tex/ppl99.py).
const LDEF = `<linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86c8"/><stop offset=".5" stop-color="#a9c8e2"/><stop offset="1" stop-color="#efe6cc"/></linearGradient>` +
  `<linearGradient id="duskS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2850"/><stop offset=".42" stop-color="#4a4a7c"/><stop offset=".64" stop-color="#b8707a"/><stop offset=".8" stop-color="#f2a868"/><stop offset="1" stop-color="#f8cf8a"/></linearGradient>` +
  `<linearGradient id="goldS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a78b4"/><stop offset=".42" stop-color="#b9c2c4"/><stop offset=".62" stop-color="#f4d49a"/><stop offset="1" stop-color="#f8dfae"/></linearGradient>` +
  `<linearGradient id="grayS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7c8894"/><stop offset=".6" stop-color="#b4bcc2"/><stop offset="1" stop-color="#d8d8d0"/></linearGradient>` +
  `<radialGradient id="ppG"><stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#f4c76b" stop-opacity=".85"/><stop offset="1" stop-color="#f4c76b" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="canSh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".42"/><stop offset=".28" stop-color="#fff" stop-opacity=".3"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient>` +
  `<linearGradient id="twrG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6e6a72"/><stop offset=".3" stop-color="#a8a2a2"/><stop offset=".62" stop-color="#e2d2c0"/><stop offset=".86" stop-color="#f0d8b4"/><stop offset="1" stop-color="#b89a84"/></linearGradient>` +
  `<linearGradient id="poolG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a9ae6"/><stop offset="1" stop-color="#0c3a86"/></linearGradient>` +
  `<linearGradient id="rivG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ec8ee"/><stop offset=".5" stop-color="#3f8ed0"/><stop offset="1" stop-color="#1c5a98"/></linearGradient>` +
  `<linearGradient id="beamL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff4d0" stop-opacity=".75"/><stop offset="1" stop-color="#fff4d0" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="winLt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6dc" stop-opacity=".55"/><stop offset="1" stop-color="#fff6dc" stop-opacity="0"/></linearGradient>` +
  `<radialGradient id="frG" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></radialGradient>` +
  `<radialGradient id="redSt"><stop offset="0" stop-color="#fff2e0"/><stop offset=".12" stop-color="#ffb07a"/><stop offset=".4" stop-color="#ff5a3a" stop-opacity=".45"/><stop offset="1" stop-color="#ff3a2a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="hullM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset=".45" stop-color="#a8b2c0"/><stop offset="1" stop-color="#3a4252"/></linearGradient>` +
  `<linearGradient id="foilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#d8a23c"/><stop offset="1" stop-color="#6a4a14"/></linearGradient>` +
  `<linearGradient id="exhG" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".15" stop-color="#9ad8ff" stop-opacity=".9"/><stop offset="1" stop-color="#3a7aff" stop-opacity="0"/></linearGradient>` +
  `<filter id="steamF" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".014 .02" numOctaves="3" seed="8"/><feDisplacementMap in="SourceGraphic" scale="46" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="7"/></filter>` +
  `<filter id="darkC"><feColorMatrix values=".56 0 0 0 0  0 .6 0 0 0  0 0 .68 0 0  0 0 0 1 0"/></filter>`;
const LDEFS = () => `${DEFS()}${WDEF}${ROCKDEF}${LDEF}`;
// ivy / moss mask: the drawing shows only where a fractal noise is above a level (lv 0 = nothing, 1 = nearly everything)
const ivyF = (id, lv, seed, fx = .03, fy = .022) => `<filter id="${id}" filterUnits="userSpaceOnUse" x="-20" y="300" width="760" height="1000"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="4" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  11 0 0 0 ${(-7.4 + 3.6 * lv).toFixed(2)}" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>`;
// a 3D point at depth z (along the view axis) behind the screen spot (x, y)
function camPt(c, x, y, z) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], nrm = a => { const l = Math.hypot(...a); return a.map(v => v / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), fp = 640 / Math.tan(c.fov * Math.PI / 360), a = (x - 360) / fp * z, b = -(y - 640) / fp * z;
  return [0, 1, 2].map(i => c.pos[i] + f[i] * z + r[i] * a + u[i] * b);
}
// the Earth with its centre at the screen spot (ex, ey)
function gAt(t, ex, ey, o) { const az = o.az ?? .3, c0 = orbit(o.d, o.el ?? .28, az, [0, 0, 0], 30), Q = camPt(c0, ex, ey, o.d); return gW(t, Object.assign({}, o, { az, tg: [-Q[0], -Q[1], -Q[2]] })); }
const sun3 = (x, y, a = 1, c = '#fff4cf') => `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="150" fill="url(#sunW)"/><circle cx="${x}" cy="${y}" r="48" fill="${c}" opacity=".45" filter="url(#blur9)"/><circle cx="${x}" cy="${y}" r="22" fill="#fffdf2"/></g>`;
const fmtN = n => AR(String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',')).replace(/,/g, '٬');
const man = (x, y, s, f, pi, o = {}) => hero(x, y, Object.assign({ s, face: f, shade: 1 }, palS(pi), o));
function milkyW(t, o = {}) {
  const r = RS(o.seed || 71); let s = `<g transform="rotate(${o.rot ?? -28},360,640)"><ellipse cx="360" cy="640" rx="900" ry="150" fill="#3a3a6a" opacity=".35" filter="url(#soft)"/><ellipse cx="360" cy="640" rx="700" ry="80" fill="#c8b89a" opacity=".22" filter="url(#soft)"/><ellipse cx="420" cy="640" rx="260" ry="60" fill="#f4e0c0" opacity=".25" filter="url(#soft)"/>`;
  for (let i = 0; i < 6; i++) { const x0 = -200 + i * 200; s += `<path d="M${x0},${(640 + (r() - .5) * 30).toFixed(1)} q60,${(-20 + r() * 40).toFixed(1)} 120,${((r() - .5) * 20).toFixed(1)} t140,${((r() - .5) * 30).toFixed(1)}" stroke="#0a0a14" stroke-width="${(10 + r() * 18).toFixed(1)}" fill="none" opacity=".55" filter="url(#blur2)"/>`; }
  for (let i = 0; i < 520; i++) { const g = (r() + r() + r() + r()) / 2 - 1, x = -300 + r() * 1320, y = 640 + g * 220, z = r(); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.4 + z * z * 1.4).toFixed(2)}" fill="${z > .9 ? (r() > .5 ? '#ffd8b0' : '#cfe0ff') : '#ffffff'}" opacity="${(.35 + .5 * z * (.7 + .3 * Math.sin(t * 2 + i))).toFixed(2)}"/>`; }
  return s + `</g>`;
}

// ---------- the 99 people as points of light on the globe ----------
function dots99(G, t, a, sc = 1) {
  if (a <= 0) return ''; let s = '';
  PPL99.forEach(([la, lo], i) => { const v = G.vis(la, lo); if (v < .1) return; const [x, y] = G.P(la, lo, 1.004), q = clamp((v - .1) / .25) * clamp(a * 2.2 - (i % 23) / 23 * 1.2), r = (i === 0 ? 6.5 : 5) * sc * (.8 + .2 * Math.sin(t * 2.2 + i * 1.7));
    if (q <= 0) return;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 3.4).toFixed(1)}" fill="url(#ppG)" opacity="${(q * .95).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * .5).toFixed(1)}" fill="#fffbe8" opacity="${q.toFixed(2)}"/>`; });
  return s;
}
// a circle on the globe: every point at `rad` degrees from (la, lo)
function capPath(G, la, lo, rad, n = 64) { const d = rad * Math.PI / 180, a1 = la * Math.PI / 180, pts = [];
  for (let i = 0; i < n; i++) { const th = i / n * 6.2832, la2 = Math.asin(Math.sin(a1) * Math.cos(d) + Math.cos(a1) * Math.sin(d) * Math.cos(th)), lo2 = lo * Math.PI / 180 + Math.atan2(Math.sin(th) * Math.sin(d) * Math.cos(a1), Math.cos(d) - Math.sin(a1) * Math.sin(la2));
    pts.push(G.P(la2 * 180 / Math.PI, lo2 * 180 / Math.PI, 1.003)); }
  return 'M' + pts.map(PT).join(' L') + 'Z'; }

// 0: the night side of the Earth; the city lights die and only 99 points remain
function sceneHook(t) {
  const k = ease(ramp(t, .45, 1.75)), fl = k > 0 && k < 1 ? .86 + .14 * Math.sin(t * 46) : 1, kn = ease(ramp(t, .45, 1.95));
  const G = gAt(t, 360, 640, { d: 7.6, el: .22, lon: 14 + t * 1.2, clouds: .3, lights: 1.7 * (1 - k) * fl, off: 2.75 });
  const n = Math.exp(lerp(Math.log(8.3e9), Math.log(99), kn)), pop = kn >= 1 ? 1 + .5 * Math.exp(-(t - 1.95) * 5) * Math.sin((t - 1.95) * 16) : 1, fs = (kn >= 1 ? 150 : 84) * pop;
  F.ov = `<defs>${LDEFS()}</defs>` + dots99(G, t, ease(ramp(t, 1.5, 2.3))) +
    `<text x="360" y="${kn >= 1 ? 1128 : 1108}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs.toFixed(1)}" fill="#f4c76b" opacity="${ease(ramp(t, .2, .5)).toFixed(2)}" style="filter:drop-shadow(0 5px 16px rgba(0,0,0,.8))">${fmtN(n)}</text>` +
    lbl(360, 1196, 'شخصاً فقط', ease(ramp(t, 2.1, 2.5)), '#fff', 42);
  return space(t);
}
// 1: scattered over the land: each one gets 1.5 million km2
const HLL = PPL99[0];
function sceneScatter(t) {
  const day = ease(ramp(t, S0(1) - .25, S0(1) + 1.5)), zm = ease(ramp(t, WS(1, 4) - .3, WS(1, 7))), ca = ease(ramp(t, WS(1, 5), WS(1, 7) + .2));
  const G = gAt(t, 360, lerp(640, 800, zm), { d: lerp(7.6, 5.8, zm), el: lerp(.22, .262, zm), lon: lerp(14 + t * 1.2, 20, zm), clouds: lerp(.3, .16, zm), lights: .25, off: lerp(2.75, -.62, day) });
  let o = `<defs>${LDEFS()}</defs>`;
  if (ca > 0) { const d = capPath(G, HLL[0], HLL[1], 6.2 * (.3 + .7 * ca)), [hx, hy] = G.P(HLL[0], HLL[1], 1.003);
    o += `<g opacity="${ca.toFixed(2)}"><path d="${d}" fill="#f4c76b" opacity=".2"/><path d="${d}" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="9 6"/></g>` + `<g style="filter:drop-shadow(0 2px 5px rgba(0,0,0,.9))">${lbl(hx, hy - 64, 'حصّةُ شخصٍ واحد', ease(ramp(t, WS(1, 7), WS(1, 8))), '#ffe6a8', 32)}</g>`; }
  o += dots99(G, t, 1, lerp(1, 1.25, zm));
  F.ov = o; return space(t);
}
// 1b: one of them, alone in an empty land: an empty road to the horizon
function sceneAlone(t) {
  const T = t - (WS(1, 14) - .3), hz = 760, VX = 430, VY = hz + 28, f = y => (y - VY) / (1300 - VY), cx = y => lerp(VX, 370, f(y)), hw = y => 250 * f(y);
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/>` + sun3(560, 430) + cumulus(130 + T * 9, 470, 250, 61, { a: .95 }) + cumulus(430 + T * 6, 590, 190, 62, { a: .85 }) + cumulus(680 + T * 7, 520, 170, 63, { a: .8 });
  s += mountainsR(hz - 30, 150, 511, { rock: '#8792a0', haze: .62, hazeCol: '#d2dce6', snowAt: .58 }) + `<rect x="-20" y="${hz - 40}" width="760" height="70" fill="#9aa6a4"/>` + mountainsR(hz - 6, 74, 513, { rock: '#7c8c80', haze: .5, hazeCol: '#ccd6d4' }) + `<rect x="-20" y="${hz - 12}" width="760" height="40" fill="#869a80"/>` + mountainsR(hz + 10, 50, 512, { rock: '#82a062', haze: .3, hazeCol: '#cdd8d0' }) + `<rect x="-20" y="${hz + 4}" width="760" height="50" fill="#8cab5c"/>`;
  s += meadow(hz + 22, 1300, t, { c0: '#8fab58', c1: '#56762e' }) + forestR(hz + 34, 26, 34, 74, 9, '#3f6b35', { haze: .2, hazeCol: '#c4d0c0' });
  s += `<rect x="-20" y="${hz - 20}" width="760" height="90" fill="#eef0e0" opacity=".4" filter="url(#blur9)"/>`;
  // the road
  const road = `M${cx(1300) - hw(1300)},1300 L${VX - 3},${VY} L${VX + 3},${VY} L${cx(1300) + hw(1300)},1300Z`;
  s += `<path d="M${cx(1300) - hw(1300) - 46},1300 L${VX - 5},${VY} L${VX + 5},${VY} L${cx(1300) + hw(1300) + 46},1300Z" fill="#b6a886"/><path d="${road}" fill="#55575e"/><path d="${road}" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  s += `<path d="M${cx(1300) - hw(1300) + 16},1300 L${VX - 2.4},${VY}" stroke="#e8e4d8" stroke-width="5" opacity=".7"/><path d="M${cx(1300) + hw(1300) - 16},1300 L${VX + 2.4},${VY}" stroke="#e8e4d8" stroke-width="5" opacity=".7"/>`;
  for (let i = 0; i < 16; i++) { const z0 = 1 + i * .62, y0 = VY + (1300 - VY) / z0, y1 = VY + (1300 - VY) / (z0 + .26), w0 = 7 * f(y0), w1 = 7 * f(y1);
    s += `<path d="M${(cx(y0) - w0).toFixed(1)},${y0.toFixed(1)} L${(cx(y1) - w1).toFixed(1)},${y1.toFixed(1)} L${(cx(y1) + w1).toFixed(1)},${y1.toFixed(1)} L${(cx(y0) + w0).toFixed(1)},${y0.toFixed(1)}Z" fill="#e8e4d8" opacity=".85"/>`; }
  // power poles along the right side, wires sagging between them
  const pz = [1.5, 2.2, 3.2, 4.7, 7, 10.5], tops = [];
  pz.slice().reverse().forEach(z => { const y = VY + (1300 - VY) / z, x = cx(y) + hw(y) + 74 * f(y), h = 420 * f(y), w = 7 * f(y) + .8; tops.push([x, y - h, f(y)]);
    s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} V${(y - h).toFixed(1)}" stroke="#5a4a3a" stroke-width="${w.toFixed(1)}"/><path d="M${(x - 34 * f(y)).toFixed(1)},${(y - h * .94).toFixed(1)} h${(68 * f(y)).toFixed(1)}" stroke="#5a4a3a" stroke-width="${(w * .7).toFixed(1)}"/>`; });
  for (let i = 0; i < tops.length - 1; i++) [-1, 1].forEach(sd => { const a = tops[i], b = tops[i + 1]; s += `<path d="M${(a[0] + sd * 30 * a[2]).toFixed(1)},${(a[1] + a[2] * 22).toFixed(1)} Q${((a[0] + b[0]) / 2 + sd * 30 * (a[2] + b[2]) / 2).toFixed(1)},${((a[1] + b[1]) / 2 + 60 * b[2]).toFixed(1)} ${(b[0] + sd * 30 * b[2]).toFixed(1)},${(b[1] + b[2] * 22).toFixed(1)}" stroke="#2e2a28" stroke-width="${(.6 + 1.6 * b[2]).toFixed(1)}" fill="none" opacity=".8"/>`; });
  // two cars left where they stopped
  s += car(cx(872) + 10, 872, .2, '#b8b4ac', -1, 0) + car(cx(968) - 46, 968, .4, '#8a3a32', 1, 0);
  // the last person for hundreds of kilometres
  const px = 150, py = 1196, sc = .98, sway = Math.sin(T * 1.3) * 1.2;
  s += `<ellipse cx="${px + 56}" cy="${py + 6}" rx="110" ry="12" fill="#1c2a12" opacity=".35" filter="url(#blur5)"/>`;
  const P = palS(5); s += `<g transform="translate(${(px - 30 * sc).toFixed(1)},${(py - 262 * sc).toFixed(1)}) rotate(${sway.toFixed(2)})"><rect x="-22" y="0" width="40" height="${86 * sc}" rx="13" fill="#5a6a3a"/><rect x="-22" y="0" width="40" height="${86 * sc}" rx="13" fill="url(#canSh)" opacity=".7"/><rect x="-18" y="${40 * sc}" width="32" height="${30 * sc}" rx="6" fill="#48562e"/><rect x="-16" y="-12" width="28" height="18" rx="8" fill="#7a6a4a"/></g>`;
  s += hero(px, py, Object.assign({ s: sc, face: 1, shade: 1, lean: sway * .5, lookUp: .12 }, P));
  for (let i = 0; i < 5; i++) s += bird(250 + i * 34 + T * 22, 640 - i * 12 + (i % 2) * 18, .34, Math.sin(t * 9 + i * 1.3), -4);
  noEarth(); F.ov = ''; return s;
}

// 2: within days the power stations stop: the cities go dark and the internet falls silent
function noSignal(x, y, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})"><circle r="62" fill="#0a0e1c" opacity=".9"/><circle r="62" fill="none" stroke="#ff5a4a" stroke-width="4"/>`;
  [48, 33, 18].forEach(r => { s += `<path d="M${(-r * .82).toFixed(1)},${(20 - r * .57).toFixed(1)} A${r},${r} 0 0 1 ${(r * .82).toFixed(1)},${(20 - r * .57).toFixed(1)}" stroke="#8a94a6" stroke-width="7" fill="none" stroke-linecap="round"/>`; });
  return s + `<circle cx="0" cy="22" r="6" fill="#8a94a6"/><path d="M-36,-36 L36,36" stroke="#ff5a4a" stroke-width="8" stroke-linecap="round"/></g>`;
}
function scenePower(t) {
  const T = t - S0(2) + .2, y0 = PV + 78, t0 = WS(2, 2) - .15, ord = [2, 0, 4, 1, 3], cutS = [1, 3, 0, 4, 2];
  const flick = (ti) => t < ti ? 1 : t < ti + .4 ? (Math.sin((t - ti) * 55) > -.2 ? .95 : .2) * (1 - (t - ti) / .4) : 0;
  const litB = ord.map(q => flick(t0 + q * .44)), litS = cutS.map(q => flick(t0 + .2 + q * .44)), lampK = flick(WS(2, 5) - .2), dark = ease(ramp(t, t0 + .4, WS(2, 5) + .5));
  const N = lerp(.84, .97, dark), stopT = WS(2, 7) - .25, xp = 96 + Math.min(T, stopT - S0(2) + .2) * 42, st = t > stopT, hk = ease(ramp(t, stopT, stopT + .5)), s8 = .82, f = 1;
  const A = { s: s8, face: f, shade: 1, walk: st ? null : xp / 28, hF: [xp + f * s8 * 60, y0 - s8 * 196] };
  if (st) { A.hB = [xp + f * s8 * lerp(10, 34, hk), y0 - s8 * lerp(150, 232, hk)]; A.lookUp = -.1 * hk; }
  let fg = hero(xp, y0, Object.assign(A, palS(3))); const H = HP.hand.slice(), HB = HP.handB.slice(), HD = HP.head.slice();
  fg += `<g transform="translate(${H[0].toFixed(1)},${H[1].toFixed(1)}) rotate(14)"><rect x="-6" y="-7" width="34" height="14" rx="4" fill="#2a2e36"/><rect x="24" y="-10" width="12" height="20" rx="3" fill="#4a505c"/><rect x="34" y="-8" width="4" height="16" fill="#fff8d8"/></g>`;
  if (st) fg += phoneIn(HB, s8 * 1.25, f, 1);
  const sky2 = `<g opacity="${(.9 * dark).toFixed(2)}">${milkyW(t, { rot: -34, seed: 5 })}</g>`;
  let s = `<defs>${LDEFS()}</defs>` + street9(t, { N, id: 'pw', cars: 0, overcast: 1, litB, litS, lampK, noMoon: 1, sky2, ground: car(560, 1170, .95, '#9aa2ac', -1, 0), top: fg });
  // the torch beam: the only light left
  const bx = H[0] + 34, by = H[1] + 8;
  s += scr(`<path d="M${bx.toFixed(1)},${(by - 8).toFixed(1)} L${(bx + 330).toFixed(1)},${(by + 10).toFixed(1)} L${(bx + 350).toFixed(1)},${(y0 + 34).toFixed(1)} L${(bx + 120).toFixed(1)},${(y0 + 40).toFixed(1)}Z" fill="#fff0c0" opacity="${(.2 + .12 * dark).toFixed(2)}" filter="url(#blur9)"/><ellipse cx="${(bx + 250).toFixed(1)}" cy="${y0 + 26}" rx="150" ry="26" fill="#fff0c0" opacity="${(.22 + .2 * dark).toFixed(2)}" filter="url(#blur9)"/><circle cx="${(bx + 4).toFixed(1)}" cy="${by.toFixed(1)}" r="16" fill="#fff8d8" opacity=".9" filter="url(#blur5)"/>`);
  s += noSignal(HD[0] + 150, HD[1] - 96, ease(ramp(t, WS(2, 7) + .25, WS(2, 8))));
  noEarth(); F.ov = ''; return s;
}

// 3: fresh food rots in days; the tins in the shops last for years
const PRODS = [['can', 30, 44], ['tall', 26, 58], ['jar', 32, 50], ['box', 42, 62], ['flat', 44, 26], ['can', 34, 40]];
const PCOL = [['#c8382e', '#f2e6c8'], ['#2f7a3e', '#f4e9a8'], ['#d8a22c', '#7a2a1a'], ['#2a5a9a', '#e8eef6'], ['#e8e2d2', '#c8382e'], ['#7a3a8a', '#f0d890'], ['#e07a2a', '#fff2d0'], ['#3a8a8a', '#f6f0e0']];
function prod(x, by, kd, c1, c2) {
  const [k, w, h] = PRODS[kd], y = by - h;
  if (k === 'box') return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c1}"/><rect x="${x + 5}" y="${y + 10}" width="${w - 10}" height="${h * .42}" rx="3" fill="${c2}"/><circle cx="${x + w / 2}" cy="${y + 10 + h * .21}" r="${h * .13}" fill="${c1}" opacity=".85"/><rect x="${x + 6}" y="${y + h * .72}" width="${w - 12}" height="4" fill="${c2}" opacity=".7"/><rect x="${x}" y="${y}" width="${w * .22}" height="${h}" fill="#000" opacity=".22"/><rect x="${x}" y="${y}" width="${w}" height="3" fill="#fff" opacity=".3"/>`;
  if (k === 'jar') return `<rect x="${x + 2}" y="${y + 8}" width="${w - 4}" height="${h - 8}" rx="6" fill="${c1}" opacity=".92"/><rect x="${x + 2}" y="${y + 20}" width="${w - 4}" height="${h * .42}" fill="${c2}"/><rect x="${x + 4}" y="${y}" width="${w - 8}" height="10" rx="2" fill="#c8a23c"/><rect x="${x + 2}" y="${y + 8}" width="${w - 4}" height="${h - 8}" rx="6" fill="url(#canSh)"/>`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="${c1}"/><rect x="${x}" y="${y + h * .24}" width="${w}" height="${h * .5}" fill="${c2}"/><ellipse cx="${x + w / 2}" cy="${y + h * .49}" rx="${w * .26}" ry="${h * .16}" fill="${c1}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="url(#canSh)"/><rect x="${x}" y="${y}" width="${w}" height="4" rx="2" fill="#dfe3e8"/><rect x="${x}" y="${by - 4}" width="${w}" height="4" rx="2" fill="#8a9098" opacity=".9"/>`;
}
const SHELF = (() => { const r = RS(461); let s = ''; const X0 = 34, X1 = 686;
  s += `<rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#4e463e"/><rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; let x = X0 + 4 + r() * 8;
    s += `<rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="96" fill="#3a332c"/><rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="40" fill="url(#aoDn)" opacity=".8"/>`;
    while (x < X1 - 50) { const kd = Math.floor(r() * PRODS.length), [c1, c2] = PCOL[Math.floor(r() * PCOL.length)], w = PRODS[kd][1], n = 2 + Math.floor(r() * 4), miss = r() < .3 ? Math.floor(r() * n) : -1;
      for (let i = 0; i < n && x < X1 - w - 4; i++) { if (i !== miss) { if (PRODS[kd][0] === 'flat') s += prod(x, by, kd, c1, c2) + prod(x, by - 26, kd, c1, c2) + (r() > .4 ? prod(x, by - 52, kd, c1, c2) : ''); else s += prod(x, by, kd, c1, c2); } x += w + 3; }
      x += 7 + r() * 9; }
    s += `<rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="10" fill="#8c8478"/><rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="3" fill="#fff" opacity=".25"/><rect x="${X0 - 12}" y="${by + 10}" width="${X1 - X0 + 24}" height="6" fill="#000" opacity=".3"/>` +
      Array.from({ length: 6 }, (_, i) => `<rect x="${X0 + 40 + i * 108}" y="${by + 1}" width="34" height="8" fill="#f4eed8"/><path d="M${X0 + 45 + i * 108},${by + 5} h18" stroke="#c8382e" stroke-width="2"/>`).join(''); }
  s += `<rect x="${X0 - 12}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X1}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="26" fill="#2f6a3a"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="5" fill="#fff" opacity=".2"/>` +
    `<text x="360" y="416" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#f6f2e4">معلّبات</text>`;
  return s; })();
// a piece of fruit; kr = how rotten
function fruit(x, y, r, col, kr, seed) {
  const q = RS(seed), c = mix(col, q() > .5 ? '#5a4a2c' : '#6e6a52', kr * (.75 + .25 * q())), ry = r * (1 - .22 * kr);
  let s = `<ellipse cx="${x.toFixed(1)}" cy="${(y + r - ry).toFixed(1)}" rx="${r}" ry="${ry.toFixed(1)}" fill="${c}"/><ellipse cx="${x.toFixed(1)}" cy="${(y + r - ry).toFixed(1)}" rx="${r}" ry="${ry.toFixed(1)}" fill="url(#frG)" opacity="${(1 - .5 * kr).toFixed(2)}"/>`;
  if (kr > .3) for (let i = 0; i < 3; i++) s += `<ellipse cx="${(x + (q() - .5) * r * 1.1).toFixed(1)}" cy="${(y + r - ry + (q() - .5) * ry).toFixed(1)}" rx="${(r * (.2 + .2 * q())).toFixed(1)}" ry="${(r * .18).toFixed(1)}" fill="${i % 2 ? '#d8dcc8' : '#2e2618'}" opacity="${((kr - .3) * (i % 2 ? .75 : .6)).toFixed(2)}"/>`;
  return s;
}
function trolley(x, y, s) {
  let c = ''; const r = RS(77); for (let i = 0; i < 9; i++) c += prod(-78 + (i % 5) * 31 + r() * 4, -92 - Math.floor(i / 5) * 40, [0, 5, 0, 1, 0][i % 5], ...PCOL[i % PCOL.length]);
  let g = ''; for (let i = 0; i <= 8; i++) g += `<path d="M${-88 + i * 21},-146 L${-76 + i * 18.5},-78" stroke="#c8ccd2" stroke-width="2.4"/>`; for (let i = 0; i < 4; i++) g += `<path d="M${-88 + i * 4},${-146 + i * 22} H${80 - i * 4}" stroke="#c8ccd2" stroke-width="2.4"/>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><ellipse cx="0" cy="2" rx="100" ry="9" fill="#000" opacity=".3" filter="url(#blur2)"/>${c}<path d="M-90,-148 L82,-148 L72,-76 L-78,-76Z" fill="#aab2bc" opacity=".16"/>${g}<path d="M-90,-148 L82,-148 L72,-76 L-78,-76Z" fill="none" stroke="#e2e6ea" stroke-width="4"/><path d="M82,-148 L112,-176 M-70,-76 L-62,-22 L64,-22 L70,-76 M-62,-22 L-66,-10 M64,-22 L68,-10" stroke="#b8bec6" stroke-width="5" fill="none" stroke-linecap="round"/><rect x="100" y="-184" width="26" height="9" rx="4" fill="#c8382e"/><circle cx="-66" cy="-8" r="9" fill="#2a2e36"/><circle cx="68" cy="-8" r="9" fill="#2a2e36"/><circle cx="-66" cy="-8" r="3.5" fill="#8a9098"/><circle cx="68" cy="-8" r="3.5" fill="#8a9098"/></g>`;
}
function sceneFood(t) {
  const T = t - S0(3) + .2, FL = 944, kr = ease(ramp(t, WS(3, 1) - .1, WS(3, 3) + .5)), ws = ease(ramp(t, WS(3, 4) - .9, WS(3, 6) + .2)), gl = ease(ramp(t, WS(3, 5) - .1, WS(3, 5) + .5));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#b8b0a0"/><rect x="-20" y="280" width="760" height="120" fill="#8e877a"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${70 + i * 220}" y="330" width="140" height="16" rx="3" fill="#d2d0c8"/><rect x="${70 + i * 220}" y="342" width="140" height="5" fill="#000" opacity=".3"/>`;   // the dead ceiling lights
  s += SHELF;
  // the floor: worn tiles running to a vanishing point
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#b4ab98"/>`;
  for (let i = 1; i < 9; i++) { const y = FL + Math.pow(i / 9, 1.7) * (1300 - FL); s += `<path d="M-20,${y.toFixed(1)} H740" stroke="#8c8472" stroke-width="${(1 + i * .25).toFixed(1)}" opacity=".7"/>`; }
  for (let i = -9; i <= 9; i++) s += `<path d="M${360 + i * 46},${FL} L${360 + i * 150},1300" stroke="#8c8472" stroke-width="1.6" opacity=".7"/>`;
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="${FL}" width="760" height="60" fill="url(#aoDn)" opacity=".8"/>`;
  // the produce stand: fresh, then spoiled
  const sx = 30, sy = 1010; let st = `<path d="M${sx - 10},${sy + 170} L${sx + 4},${sy} L${sx + 316},${sy} L${sx + 330},${sy + 170}Z" fill="#6a4a2c"/><path d="M${sx - 10},${sy + 170} L${sx + 4},${sy} L${sx + 316},${sy} L${sx + 330},${sy + 170}Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  const FR = [['#d83a2e', 17], ['#f08a1e', 18], ['#e8c832', 16], ['#6aa83a', 19], ['#c8324a', 15], ['#e8a03a', 17]];
  for (let rw = 0; rw < 3; rw++) for (let c = 0; c < 3; c++) { const bx = sx + 10 + c * 104 - rw * 5, by = sy + 8 + rw * 54, bw = 100 + rw * 3, [col, rr] = FR[(rw * 3 + c) % 6], q = RS(rw * 9 + c + 5);
    st += `<rect x="${bx}" y="${by}" width="${bw}" height="50" fill="#8a6a44"/><rect x="${bx}" y="${by}" width="${bw}" height="50" fill="url(#aoDn)" opacity=".7"/>`;
    for (let i = 0; i < 9; i++) st += fruit(bx + 14 + (i % 5) * (bw - 28) / 4 + (q() - .5) * 6, by + 6 + Math.floor(i / 5) * 15 + q() * 5, rr * (.85 + .2 * q()), col, clamp(kr * 1.25 - q() * .25), rw * 50 + c * 9 + i);
    st += `<rect x="${bx}" y="${by + 38}" width="${bw}" height="14" fill="#a8845a"/><rect x="${bx}" y="${by + 38}" width="${bw}" height="3" fill="#fff" opacity=".2"/><path d="M${bx},${by + 38} v14 M${bx + bw},${by + 38} v14" stroke="#5a3e24" stroke-width="3"/>`; }
  st += `<rect x="${sx + 104}" y="${sy - 52}" width="112" height="40" rx="5" fill="#2f6a3a"/><text x="${sx + 160}" y="${sy - 24}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f6f2e4">طازج</text><path d="M${sx + 160},${sy - 12} v14" stroke="#4a3a2a" stroke-width="5"/>`;
  s += `<ellipse cx="${sx + 160}" cy="${sy + 176}" rx="190" ry="14" fill="#000" opacity=".3" filter="url(#blur5)"/>` + st;
  if (kr > .15) { for (let i = 0; i < 12; i++) { const a = t * (3 + i % 4) + i * 2.1, x = sx + 60 + (i * 53) % 230 + Math.cos(a) * 26, y = sy - 20 + (i * 37) % 120 + Math.sin(a * 1.3) * 20;
      s += `<g opacity="${clamp((kr - .15) * 2).toFixed(2)}"><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="3.2" ry="2.2" fill="#14100c"/><ellipse cx="${(x - 2).toFixed(1)}" cy="${(y - 3).toFixed(1)}" rx="3" ry="1.4" fill="#fff" opacity=".5"/></g>`; }
    s += `<ellipse cx="${sx + 160}" cy="${sy + 20}" rx="170" ry="70" fill="#8a9a4a" opacity="${(.14 * kr).toFixed(2)}" filter="url(#blur9)"/>`; }
  // the last shopper and a trolley full of tins
  const px = lerp(840, 566, ws), py = 1196, wk = ws < 1, s9 = .92, tx = px - 150;
  s += trolley(tx, py + 10, 1);
  const A = { s: s9, face: -1, shade: 1, walk: wk ? px / 30 : null };
  if (wk) { A.hF = [tx + 112, py + 10 - 178]; A.hB = [tx + 112, py + 10 - 178]; } else { const u = ease(ramp(t, WS(3, 6) + .2, WS(3, 7) + .3)); A.hF = [px - s9 * lerp(60, 74, u), py - s9 * lerp(150, 214, u)]; A.hB = [tx + 112, py + 10 - 178]; A.lookUp = .1 * u; }
  s += hero(px, py, Object.assign(A, palS(7)));
  if (!wk) { const H = HP.hand; s += `<g transform="translate(${(H[0] - 15).toFixed(1)},${(H[1] + 14).toFixed(1)})">${prod(0, 0, 0, '#c8382e', '#f2e6c8')}</g>`; }
  // dim: the only light comes through the shop window on the left
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a2238" opacity=".2" style="mix-blend-mode:multiply"/>` + scr(`<path d="M-60,330 L420,470 L760,1300 L-60,1300Z" fill="url(#winLt)" opacity=".6" filter="url(#soft)"/>`);
  s += sparkles(250, 760, 420, 560, 22, t, .5, 4) + sparkles(360, 700, 600, 440, 16, t, .9 * gl, 9);
  noEarth(); F.ov = ''; return s;
}
