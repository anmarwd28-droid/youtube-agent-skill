// hi_a.js: #53 "what if Hitler had won the war?": scenes 0-4 (Europe occupied on the 3D Earth, the front in 1942, Stalingrad, the Holocaust memorial, no United Nations)
const HIDEF = `<linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6070"/><stop offset=".55" stop-color="#8e929a"/><stop offset="1" stop-color="#b8b4ae"/></linearGradient>` +
  `<linearGradient id="dSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1c2e"/><stop offset=".5" stop-color="#4a3c4e"/><stop offset=".85" stop-color="#8a6458"/><stop offset="1" stop-color="#a87a5e"/></linearGradient>` +
  `<linearGradient id="nySky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e8ec8"/><stop offset=".6" stop-color="#a8c8e4"/><stop offset="1" stop-color="#e4ecf0"/></linearGradient>` +
  `<linearGradient id="glassG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3e6a7a"/><stop offset=".5" stop-color="#6a9aa6"/><stop offset="1" stop-color="#2e5462"/></linearGradient>` +
  `<linearGradient id="marbG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f2f0ea"/><stop offset="1" stop-color="#c8c4ba"/></linearGradient>` +
  `<linearGradient id="riverG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7e9a"/><stop offset="1" stop-color="#2e4a62"/></linearGradient>` +
  `<linearGradient id="carG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a36"/><stop offset="1" stop-color="#3a281e"/></linearGradient>` +
  `<radialGradient id="candF" cx=".5" cy=".7" r=".6"><stop offset="0" stop-color="#fff6d0"/><stop offset=".45" stop-color="#ffc85a"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="candH"><stop offset="0" stop-color="#ffb85a" stop-opacity=".55"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="waxG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8ccb4"/><stop offset=".4" stop-color="#f6eedc"/><stop offset="1" stop-color="#b8aa90"/></linearGradient>` +
  `<pattern id="hatchR" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="14" height="14" fill="none"/><path d="M0,0 V14" stroke="#ff6a5a" stroke-width="2.2" opacity=".55"/></pattern>`;
const HIDEFS = () => APDEFS() + HIDEF;

// the area held by Germany and its allies at its largest (November 1942), lat/lon, simplified
const OCC = [[43.4, -1.8], [46.2, -1.2], [47.3, -2.5], [48.6, -4.6], [48.7, -1.6], [49.7, -1.9], [49.4, .2], [50.9, 1.6], [51.4, 3.4], [53.3, 5.0], [53.6, 8.5], [55.5, 8.1], [57.1, 8.6], [58.0, 7.0], [59.0, 5.6], [62.0, 5.0], [64.0, 9.5], [67.0, 13.5], [69.5, 18.5], [70.5, 24], [70, 29],
  [69, 20.5], [68, 18], [65, 14.5], [63, 12.2], [61, 12.5], [59, 11.5], [56.5, 10.8], [55.0, 12.5], [54.4, 11.3], [54.1, 13.8], [54.5, 18.6], [55.7, 21.1], [57.0, 21.5], [59.4, 24.0],
  [59.8, 30.5], [58.3, 31.3], [56.3, 34.3], [53, 35.5], [51.7, 39.2], [49.5, 42], [48.7, 44.5], [46.3, 44.2], [43.7, 44.6], [43.3, 42.4], [44.4, 39.2], [44.7, 37.8], [45.2, 36.5], [44.4, 34.0], [45.5, 32.5], [46.5, 30.7],
  [44.0, 28.6], [42.0, 28.0], [41.8, 26.5], [40.8, 26.0], [40.0, 24.0], [38.0, 24.0], [36.5, 22.5], [37.0, 21.5], [39.5, 20.0], [40.5, 19.3], [40.6, 18.5], [39.8, 16.5], [38.0, 15.6], [38.9, 16.0], [40.0, 15.5], [41.2, 13.0], [42.4, 11.2], [44.0, 10.0], [43.8, 7.5], [43.1, 6.0], [43.4, 3.5], [42.5, 3.1], [42.7, .5]];
const FRONT = OCC.slice(35, 47), VOLGA = [[57.6, 39.9], [56.3, 44], [55.8, 49.1], [53.2, 50.1], [51.5, 46.4], [50, 45.4], [48.7, 44.5], [47.2, 46.6], [46.3, 48]];
// the polygon on the globe (densified so it follows the curve), clipped to a growing circle around Berlin
function occLayer(G, k, a, o = {}) {
  if (a <= 0 || k <= 0) return ''; let d = '';
  OCC.forEach((p, i) => { const q = OCC[(i + 1) % OCC.length]; for (let j = 0; j < 4; j++) { const [x, y] = G.P(lerp(p[0], q[0], j / 4), lerp(p[1], q[1], j / 4), 1.004); d += (d ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } });
  d += 'Z'; const [bx, by] = G.P(52.5, 13.4), id = 'occC' + (o.id || 0);
  return `<defs><clipPath id="${id}"><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(k * 1400).toFixed(1)}"/></clipPath></defs><g clip-path="url(#${id})" opacity="${a.toFixed(2)}">` +
    `<path d="${d}" fill="#3a0c10" opacity=".5"/><path d="${d}" fill="url(#hatchR)" opacity=".7"/><path d="${d}" fill="none" stroke="#1a0406" stroke-width="7" opacity=".45" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#ff5a4a" stroke-width="2.6" stroke-linejoin="round"/></g>`;
}
const linePath = (G, pts, h = 1.006) => { let d = ''; pts.forEach((p, i) => { if (i) { const q = pts[i - 1]; for (let j = 1; j <= 4; j++) { const [x, y] = G.P(lerp(q[0], p[0], j / 4), lerp(q[1], p[1], j / 4), h); d += ' L' + x.toFixed(1) + ',' + y.toFixed(1); } } else { const [x, y] = G.P(p[0], p[1], h); d += 'M' + x.toFixed(1) + ',' + y.toFixed(1); } }); return d; };
const partD = (d, k) => { const s = d.split(' L'); return s.slice(0, Math.max(1, Math.round(s.length * k))).join(' L'); };

// ---------- 0: the hook: the occupied area spreads over Europe ----------
function sceneHook(t) {
  const T = t;
  const G = gAt(t, 360, 700, { d: lerp(4.6, 4.0, ease(clamp(T / 3.3))), el: .86, lon: 16 + T * .8, clouds: .3, lights: .25, off: -.7, up: .6 });
  let o = `<defs>${HIDEFS()}</defs>` + occLayer(G, ease(ramp(t, .4, 2.9)), 1);
  const [bx, by] = G.P(52.5, 13.4); o += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="5" fill="#fff"/>` + lbl(bx, by - 16, 'برلين', ease(ramp(t, .3, .7)), '#fff', 24);
  F.ov = o; return space(t);
}

// ---------- 1: 1942: from France to the Volga ----------
function sceneEurope(t) {
  const t0 = S0(1) - .2, T = t - t0, z = ease(ramp(t, t0, WS(1, 9)));
  const G = gAt(t, 360, lerp(700, 680, z), { d: lerp(4.0, 3.5, z), el: .86, lon: lerp(18.6, 22, z) + T * .25, clouds: .25, lights: .2, off: -.7, up: .6 });
  let o = `<defs>${HIDEFS()}</defs>` + occLayer(G, 1, 1, { id: 1 });
  const fv = linePath(G, VOLGA), fa = ease(ramp(t, WS(1, 12) - .2, WS(1, 14) + .4));
  o += `<path d="${partD(fv, fa)}" stroke="#0e2a44" stroke-width="7" fill="none" stroke-linecap="round" opacity=".6"/><path d="${partD(fv, fa)}" stroke="#7ac4ff" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
  const fr = linePath(G, FRONT, 1.01), ka = ease(ramp(t, WS(1, 9), WS(1, 14)));
  o += `<path d="${partD(fr, ka)}" stroke="#2a0204" stroke-width="10" fill="none" stroke-linecap="round" opacity=".5"/><path d="${partD(fr, ka)}" stroke="#ff3a2a" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="14 7"/>`;
  o += pin(G, 47.4, 2.6, 'فرنسا', ease(ramp(t, WS(1, 11) - .2, WS(1, 11) + .2)), '#fff', 30) + pin(G, 52.4, 51, 'نهر الفولغا', fa, '#9fd0ff', 28) + pin(G, 52.5, 13.4, 'برلين', 1, '#ffd0c8', 22);
  const [sx, sy] = G.P(48.7, 44.5); if (G.vis(48.7, 44.5) > .2) o += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="7" fill="#fff" opacity="${fa.toFixed(2)}"/>` + lbl(sx - 4, sy + 34, 'ستالينغراد', fa, '#ffd0c8', 22);
  F.ov = o; return space(t);
}

// ---------- 2: broken at Stalingrad, out of fuel, and America alone built about 300,000 planes ----------
function ruinB2(x, base, w, h, col, seed, kind, cutF) {
  const r = RS(seed + 5), top = base - h, b = blockN(x, base, w, h, col, seed, kind), W2 = w * 1.12 + 16;
  const body = b.s.replace(/#48688a|#4a6a88|#5a7890/g, '#141418').replace(/#cfe6f8/g, '#1e1e22');
  const dir = r() > .5 ? 1 : -1, n = 8, cut = h * (cutF ?? (.2 + r() * .26)), pts = [];
  for (let i = 0; i <= n; i++) { const f = i / n, dd = dir > 0 ? f : 1 - f; pts.push([x - 8 + W2 * f, top - 34 + cut * Math.pow(dd, 1.25) + (i % 2 ? 18 : 0) * (.4 + r()) + r() * 12]); }
  const id = 'rw' + seed, clip = `M${x - 12},${base + 6} L${x - 12},${pts[0][1].toFixed(1)} L${pts.map(PT).join(' L')} L${x + W2},${base + 6}Z`;
  let s = `<defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs><g clip-path="url(#${id})">${body}`;
  for (let q = 0; q < 7; q++) { let cx = x + r() * w, cy = top + cut * .5 + r() * h * .45, d = `M${cx.toFixed(1)},${cy.toFixed(1)}`; for (let i = 0; i < 6; i++) { cx += (r() - .5) * 28; cy += 14 + r() * 26; d += ` L${cx.toFixed(1)},${cy.toFixed(1)}`; } s += `<path d="${d}" stroke="#16141a" stroke-width="${(1.2 + r() * 1.8).toFixed(1)}" fill="none" opacity=".6"/>`; }
  for (let q = 0; q < 5; q++) { const hx = x + 10 + r() * (w - 30), hy = top + cut + 20 + r() * h * .4, hr = 10 + r() * 16; s += `<path d="M${hx - hr},${hy} q${hr * .4},${-hr} ${hr},${-hr * .9} q${hr * .8},${hr * .2} ${hr},${hr} q${-hr * .5},${hr * .8} ${-hr},${hr * .7}Z" fill="#0e0e12" opacity=".85"/>`; }
  s += `<rect x="${x - 12}" y="${top - 60}" width="${W2 + 12}" height="${h + 70}" fill="#8a8c94" opacity=".32"/></g>`;
  s += `<path d="M${pts.map(PT).join(' L')}" stroke="#f4f6fa" stroke-width="5" fill="none" opacity=".75" stroke-linejoin="round"/>`;   // snow on the broken tops
  return s;
}
function smokeCol(x, y, h, t, seed, a = 1) { const r = RS(seed); let s = '';
  for (let i = 0; i < 14; i++) { const k = i / 13, ph = pmod(t * .08 + k, 1), yy = y - ph * h, xx = x + Math.sin(ph * 4 + seed) * 30 + ph * 90, rr = 24 + ph * 90; s += `<circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${rr.toFixed(1)}" fill="${i % 2 ? '#3a3a40' : '#4e4e54'}" opacity="${(a * .55 * (1 - ph)).toFixed(2)}"/>`; }
  return `<g filter="url(#blur5)">${s}</g>`; }
const planeTop = (x, y, s, a, col = '#c8ccd4') => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M0,-20 C2,-20 3,-16 3,-10 L3,-4 L22,2 L22,6 L3,4 L2,14 L8,18 L8,20 L0,19 L-8,20 L-8,18 L-2,14 L-3,4 L-22,6 L-22,2 L-3,-4 L-3,-10 C-3,-16 -2,-20 0,-20Z" fill="${col}"/><path d="M0,-18 L0,16" stroke="#fff" stroke-width="1" opacity=".5"/></g>`;
function gaugeC(x, y, v, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})">` + panel(-130, -120, 260, 250, 1);
  s += `<path d="M-90,30 A100,100 0 0 1 90,30" stroke="#2a2e3a" stroke-width="22" fill="none"/><path d="M-90,30 A100,100 0 0 1 -60,-40" stroke="#e53935" stroke-width="22" fill="none"/>`;
  for (let i = 0; i <= 8; i++) { const q = Math.PI * (1.12 - .24 / 8 * 0) - i * Math.PI * .98 / 8 - .07; s += `<path d="M${(Math.cos(q) * 70).toFixed(1)},${(30 - Math.sin(q) * 70 * .95).toFixed(1)} L${(Math.cos(q) * 82).toFixed(1)},${(30 - Math.sin(q) * 82 * .95).toFixed(1)}" stroke="#fff" stroke-width="3" opacity=".7"/>`; }
  const q = Math.PI * (.08 + .84 * v); s += `<path d="M0,30 L${(-Math.cos(q) * 80).toFixed(1)},${(30 - Math.sin(q) * 80).toFixed(1)}" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="0" cy="30" r="12" fill="#e8e8ec"/>`;
  s += `<text x="-104" y="80" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#ff6a5a">فارغ</text><text x="104" y="80" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#cfd6e0">ممتلئ</text>`;
  s += `<g transform="translate(0,-70)"><rect x="-16" y="-20" width="32" height="40" rx="4" fill="#cfd6e0"/><rect x="-10" y="-14" width="20" height="12" fill="#1a1e2a"/><path d="M16,-12 l10,8 v18 a4,4 0 0 1 -8,0 v-10" stroke="#cfd6e0" stroke-width="4" fill="none"/></g>`;
  return s + lbl(0, 118, 'الوقود', 1, '#fff', 26) + `</g>`;
}
function planesC(x, y, k, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})">` + panel(-170, -150, 340, 290, 1);
  const n = Math.round(30 * k); for (let i = 0; i < 30; i++) { const c = i % 6, r = Math.floor(i / 6); if (i < n) s += planeTop(-125 + c * 50, -120 + r * 34, .78, 1, i === n - 1 ? '#f4c76b' : '#c8ccd4'); }
  const v = Math.round(300000 * k / 1000) * 1000; s += `<text x="0" y="${90}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="48" fill="#f4c76b">${AR(v.toLocaleString('en-US')).replace(/,/g, '٬')}</text>`;
  return s + lbl(0, 126, 'طائرةٌ صنعتها أمريكا', 1, '#fff', 24) + `</g>`;
}
function sceneStalingrad(t) {
  const t0 = S0(2) - .2, T = t - t0, push = ease(clamp(T / 8));
  let s = `<defs>${HIDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#wSky)"/>`;
  s += `<g transform="translate(360,900) scale(${(1 + .05 * push).toFixed(3)}) translate(-360,-900)">`;
  s += farRuinsH(41, 860, '#5a5c64', 16) + `<rect x="-20" y="560" width="760" height="320" fill="#a8aab0" opacity=".42"/>` + smokeCol(140, 780, 620, t, 3, .9) + smokeCol(560, 760, 560, t, 7, .7);
  [[-30, 170, 430, '#8a8478', 991, 1], [150, 150, 360, '#7a7e86', 992, 2], [300, 168, 470, '#9a9284', 993, 0], [470, 150, 400, '#86827a', 994, 1], [612, 140, 330, '#8e8a82', 995, 0]].forEach(([x, w, h, c, sd, kd], i) => { s += ruinB2(x, 1000, w, h, c, sd, kd, i === 2 ? .5 : i === 1 ? .15 : undefined); });
  let gr = 'M-20,1004'; for (let x = -20; x <= 740; x += 20) gr += ` L${x},${(990 - 14 * Math.abs(Math.sin(x * .03)) - 8 * Math.sin(x * .011)).toFixed(1)}`;
  s += `<path d="${gr} L740,1300 L-20,1300Z" fill="#e8ecf2"/><path d="${gr}" stroke="#b8c2d0" stroke-width="3" fill="none"/>`;
  const r = RS(52); for (let i = 0; i < 22; i++) { const x = r() * 740, y = 1010 + r() * 260, w = 20 + r() * 60; s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} l${(w * .3).toFixed(0)},${(-w * .4).toFixed(0)} l${(w * .5).toFixed(0)},${(w * .1).toFixed(0)} l${(w * .2).toFixed(0)},${(w * .3).toFixed(0)}Z" fill="#6a6660"/><path d="M${x.toFixed(0)},${y.toFixed(0)} l${(w * .3).toFixed(0)},${(-w * .4).toFixed(0)} l${(w * .5).toFixed(0)},${(w * .1).toFixed(0)}" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`; }
  s += `<rect x="-20" y="1000" width="760" height="300" fill="#9aa6b8" filter="url(#grainR)" opacity=".15"/></g>`;
  s += snowFall(t, 1, 190) + `<rect x="-20" y="-20" width="760" height="1320" fill="#c8ccd4" opacity=".08"/>`;
  s += gaugeC(190, 900, lerp(.55, 0, ease(ramp(t, WS(2, 4), WS(2, 5) + .4))), ease(ramp(t, WS(2, 4) - .4, WS(2, 4))) * (1 - .4 * ramp(t, WS(2, 6) - .2, WS(2, 6) + .2)));
  s += planesC(500, 880, ease(ramp(t, WS(2, 7), WS(2, 12))), ease(ramp(t, WS(2, 6) - .3, WS(2, 6) + .1)));
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: the Holocaust would have gone on; tens of millions driven out of Eastern Europe ----------
function boxcar(x, y, s) {
  return `<g transform="translate(${x.toFixed(1)},${y}) scale(${s})"><rect x="-110" y="-120" width="220" height="110" rx="4" fill="url(#carG)"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${-104 + i * 22},-118 V-12" stroke="#000" stroke-width="2" opacity=".28"/>`).join('') +
    `<path d="M-114,-124 Q0,-136 114,-124 L114,-118 L-114,-118Z" fill="#2a2420"/><rect x="-30" y="-108" width="60" height="92" fill="#2e2018"/><path d="M-30,-108 L30,-16 M30,-108 L-30,-16" stroke="#1a120c" stroke-width="3" opacity=".6"/>` +
    `<rect x="70" y="-100" width="26" height="12" fill="#0a0806"/><path d="M72,-100 v12 M78,-100 v12 M84,-100 v12 M90,-100 v12" stroke="#4a3a2a" stroke-width="1.6"/><rect x="-110" y="-120" width="220" height="40" fill="#fff" opacity=".06"/>` +
    `<rect x="-118" y="-14" width="236" height="10" fill="#1a1612"/><circle cx="-70" cy="2" r="16" fill="#1a1816"/><circle cx="70" cy="2" r="16" fill="#1a1816"/><circle cx="-70" cy="2" r="6" fill="#4a4640"/><circle cx="70" cy="2" r="6" fill="#4a4640"/></g>`;
}
function wireFence(y, t) { let s = ''; for (let i = 0; i < 6; i++) { const x = -30 + i * 150; s += `<path d="M${x},${y} L${x - 8},${y - 600} L${x + 34},${y - 640}" stroke="#100c0c" stroke-width="13" fill="none"/><path d="M${x - 2},${y} L${x - 9},${y - 600}" stroke="#4a3e36" stroke-width="3" opacity=".5"/>`; }
  for (let j = 0; j < 10; j++) { const yy = y - 40 - j * 58; let d = `M-30,${yy}`; for (let x = -30; x <= 750; x += 30) d += ` Q${x + 15},${yy + 8} ${x + 30},${yy}`; s += `<path d="${d}" stroke="#140f0e" stroke-width="2.6" fill="none"/>`;
    for (let x = -10; x <= 740; x += 36) s += `<path d="M${x - 5},${yy - 5} l10,10 M${x + 5},${yy - 5} l-10,10" stroke="#140f0e" stroke-width="2.2"/>`; }
  return s; }
function candle(x, y, h, t, i) { const fl = 1 + .08 * Math.sin(t * 9 + i * 2.1) + .05 * Math.sin(t * 13 + i); return `<ellipse cx="${x}" cy="${y - h - 14}" rx="${(46 * fl).toFixed(1)}" ry="${(56 * fl).toFixed(1)}" fill="url(#candH)"/><rect x="${x - 11}" y="${y - h}" width="22" height="${h}" rx="3" fill="url(#waxG)"/><ellipse cx="${x}" cy="${y - h}" rx="11" ry="3.5" fill="#fff6e4"/><path d="M${x},${y - h} v-6" stroke="#2a1e14" stroke-width="2"/><path d="M${x},${(y - h - 30 * fl).toFixed(1)} C${x + 7},${y - h - 16} ${x + 6},${y - h - 6} ${x},${y - h - 5} C${x - 6},${y - h - 6} ${x - 7},${y - h - 16} ${x},${(y - h - 30 * fl).toFixed(1)}Z" fill="url(#candF)"/>`; }
function sceneMemorial(t) {
  const t0 = S0(3) - .2, T = t - t0, m = ease(ramp(t, WS(3, 6) - .6, WS(3, 7)));
  let s = `<defs>${HIDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dSky)"/>`;
  let fr = ''; const r = RS(61); for (let i = 0; i < 40; i++) fr += pine(-20 + i * 20 + r() * 10, 830, 120 + r() * 120, 600 + i, '#1a1a22');
  s += `<g opacity=".95">${fr}</g><rect x="-20" y="700" width="760" height="140" fill="#6a5250" opacity=".35"/>`;
  s += `<g transform="translate(600,0)"><path d="M-40,840 L-30,520 L30,520 L40,840" stroke="#1a1416" stroke-width="7" fill="none"/><path d="M-36,700 L36,700 M-33,600 L33,600 M-36,700 L33,600 M36,700 L-33,600" stroke="#1a1416" stroke-width="4"/><path d="M-56,520 L56,520 L44,470 L-44,470Z" fill="#1a1416"/><path d="M-62,474 L0,438 L62,474Z" fill="#141012"/><rect x="-36" y="482" width="72" height="26" fill="#a8786a" opacity=".35"/></g>`;
  s += `<rect x="-20" y="836" width="760" height="70" fill="#2e2624"/><path d="M-20,868 L740,868 M-20,884 L740,884" stroke="#6a625a" stroke-width="3"/>` + Array.from({ length: 26 }, (_, i) => `<rect x="${-20 + i * 30}" y="862" width="14" height="28" fill="#3a2e28"/>`).join('');
  const off = pmod(T * 60, 240); for (let i = -1; i < 5; i++) s += boxcar(840 - off * 1.1 - i * 264 - 360, 862, 1.1);
  s += `<rect x="-20" y="900" width="760" height="400" fill="#4a423c"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="900" width="760" height="60" fill="#000" opacity=".25" filter="url(#blur5)"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M${-40 + i * 70},${1010 + (i % 3) * 60} q60,-10 120,4" stroke="#2a2420" stroke-width="5" fill="none" opacity=".45"/>`).join('') + wireFence(1200, t);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0810" opacity="${(.15 + .25 * clamp(T / 6)).toFixed(2)}"/>`;
  if (m > 0) { let c = `<rect x="-20" y="-20" width="760" height="1320" fill="#08070a"/><rect x="-20" y="900" width="760" height="400" fill="#1a1512"/><rect x="-20" y="900" width="760" height="6" fill="#3a2e22"/>`;
    const N = [[90, 1000, 120], [190, 1040, 160], [300, 990, 100], [420, 1050, 180], [530, 1000, 130], [640, 1036, 150], [140, 1150, 90], [250, 1180, 140], [370, 1160, 110], [490, 1190, 160], [600, 1170, 120]];
    N.forEach(([x, y, h], i) => { const on = ease(ramp(t, WS(3, 7) + i * .12, WS(3, 7) + i * .12 + .3)); if (on > 0) c += `<g opacity="${on.toFixed(2)}">${candle(x, y, h, t, i)}</g>`; });
    c += `<rect x="-20" y="900" width="760" height="400" fill="#ffa040" opacity=".06"/>`;
    s += `<g opacity="${m.toFixed(2)}">${c}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: no United Nations, no Universal Declaration of Human Rights ----------
function unHQ(x, base, a) {
  let s = `<g opacity="${a.toFixed(2)}">`, w = 150, h = 500, top = base - h;
  s += `<path d="M${x - 230},${base} L${x - 230},${base - 70} Q${x - 150},${base - 110} ${x - 70},${base - 70} L${x - 70},${base}Z" fill="#e8e4dc"/><path d="M${x - 230},${base - 70} Q${x - 150},${base - 110} ${x - 70},${base - 70}" stroke="#a8a49a" stroke-width="3" fill="none"/><path d="M${x - 170},${base - 96} q20,-24 40,0" fill="#c8c4ba"/>`;
  s += `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${h}" fill="url(#glassG)"/>`;
  for (let i = 0; i < 35; i++) s += `<path d="M${x - w / 2},${top + 6 + i * 14} H${x + w / 2}" stroke="#1e3a46" stroke-width="2" opacity=".55"/>`;
  for (let i = 0; i < 12; i++) s += `<path d="M${x - w / 2 + 6 + i * 12.5},${top} V${base}" stroke="#a8d0dc" stroke-width="1" opacity=".25"/>`;
  [8, 17, 26].forEach(q => s += `<rect x="${x - w / 2}" y="${top + q * 14}" width="${w}" height="12" fill="#2a3a40"/>`);
  s += `<path d="M${x - w / 2 + 10},${top} L${x + w / 2 - 30},${top + h * .6} L${x + w / 2},${top + h * .6} L${x + w / 2},${top}Z" fill="#fff" opacity=".12"/>`;
  s += `<rect x="${x - w / 2 - 14}" y="${top - 4}" width="16" height="${h + 4}" fill="url(#marbG)"/><rect x="${x + w / 2 - 2}" y="${top - 4}" width="16" height="${h + 4}" fill="#b8b4aa"/><rect x="${x - w / 2 - 14}" y="${top - 10}" width="${w + 28}" height="10" fill="#d8d4cc"/>`;
  return s + `</g>`;
}
function flagRow(x0, y, n, t, a) { let s = `<g opacity="${a.toFixed(2)}">`; const C = ['#d84a3a', '#2a6ab8', '#f4c040', '#3a8a4a', '#ffffff', '#8a3a8a', '#e87a2a', '#1a1a1a', '#3ab0c8', '#c82a5a'];
  for (let i = 0; i < n; i++) { const x = x0 + i * 30, w = Math.sin(t * 3 + i * .7) * 3; s += `<path d="M${x},${y} V${y - 120}" stroke="#d8dce2" stroke-width="2.4"/><path d="M${x},${y - 120} q12,${w} 24,0 v16 q-12,${-w} -24,0Z" fill="${C[i % 10]}"/><path d="M${x},${y - 112} q12,${w} 24,0" stroke="${C[(i + 3) % 10]}" stroke-width="5" fill="none" opacity=".9"/>`; }
  return s + `</g>`; }
function sceneUN(t) {
  const t0 = S0(4) - .2, T = t - t0, gone = ease(ramp(t, WS(4, 3) - .1, WS(4, 4) + .2));
  let s = `<defs>${HIDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#nySky)"/>` + cumulus(200 + T * 3, 300, 280, 5, { a: .8 }) + cumulus(600 + T * 2, 220, 220, 9, { a: .6 });
  const r = RS(71); let sk = ''; for (let i = 0; i < 18; i++) { const x = -20 + i * 44, h = 120 + r() * 260; sk += `<rect x="${x}" y="${900 - h}" width="40" height="${h}" fill="${['#8a9cb0', '#9aa8b8', '#7e90a6', '#a0a4ac'][i % 4]}"/><rect x="${x + 28}" y="${900 - h}" width="12" height="${h}" fill="#000" opacity=".12"/>` + Array.from({ length: Math.floor(h / 18) }, (_, j) => `<path d="M${x + 4},${900 - h + 10 + j * 18} H${x + 36}" stroke="#5a6a7e" stroke-width="5" stroke-dasharray="5 3" opacity=".45"/>`).join(''); } s += sk + `<rect x="-20" y="560" width="760" height="340" fill="#c8d8e6" opacity=".5"/>`;
  s += unHQ(420, 920, 1 - gone);
  if (gone > 0) s += `<g opacity="${gone.toFixed(2)}"><rect x="345" y="420" width="150" height="500" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="12 9"/><rect x="190" y="850" width="160" height="70" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="12 9"/>${lbl(420, 650, '؟', 1, '#fff', 120)}</g>`;
  s += `<rect x="-20" y="914" width="760" height="30" fill="#8a8a84"/>` + flagRow(60, 990, 22, t, 1 - gone) + `<rect x="-20" y="990" width="760" height="40" fill="#6a6a64"/>`;
  let wv = ''; for (let i = 0; i < 9; i++) { let d = `M-20,${1050 + i * 28}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${(-5 + (i % 2) * 2).toFixed(0)} 40,0`; wv += `<path d="${d}" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`; }
  s += `<rect x="-20" y="1030" width="760" height="270" fill="url(#riverG)"/>` + `<g transform="translate(${(-pmod(T * 10, 40)).toFixed(1)},0)">${wv}</g>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#5a6070" opacity="${(.35 * gone).toFixed(2)}"/>`;
  const da = ease(ramp(t, WS(4, 5) - .3, WS(4, 5) + .1)), x2 = ease(ramp(t, WS(4, 8) - .1, WS(4, 8) + .4));
  if (da > 0) { s += `<g opacity="${da.toFixed(2)}" transform="translate(360,${(1080 - 20 * da).toFixed(1)}) rotate(-3)"><rect x="-170" y="-130" width="340" height="250" rx="6" fill="url(#paperG)"/><rect x="-170" y="-130" width="340" height="250" rx="6" filter="url(#paperF)" opacity=".5" fill="#c8b48a"/>` +
      lbl(0, -78, 'الإعلانُ العالميُّ', 1, '#3a2a1a', 30) + lbl(0, -38, 'لحقوقِ الإنسان ١٩٤٨', 1, '#3a2a1a', 26) + Array.from({ length: 5 }, (_, i) => `<path d="M-130,${-2 + i * 22} H${130 - (i === 4 ? 90 : 0)}" stroke="#7a6a5a" stroke-width="5" stroke-linecap="round" opacity=".45"/>`).join('') +
      (x2 > 0 ? `<path d="M-140,-110 L${(-140 + 280 * x2).toFixed(1)},${(-110 + 210 * x2).toFixed(1)}" stroke="#e53935" stroke-width="12" stroke-linecap="round"/>` + (x2 > .5 ? `<path d="M140,-110 L${(140 - 280 * (x2 - .5) * 2).toFixed(1)},${(-110 + 210 * (x2 - .5) * 2).toFixed(1)}" stroke="#e53935" stroke-width="12" stroke-linecap="round"/>` : '') : '') + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
function farRuinsH(seed, base, col, n = 15) { const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = -30 + i * (790 / n) + r() * 14, w = 30 + r() * 38, h = 70 + r() * 200, m = 5; let d = `M${x.toFixed(1)},${base} L${x.toFixed(1)},${(base - h * (.6 + r() * .4)).toFixed(1)}`;
    for (let q = 1; q <= m; q++) d += ` L${(x + w * q / m).toFixed(1)},${(base - h * (.5 + r() * .5)).toFixed(1)}`; s += `<path d="${d} L${(x + w).toFixed(1)},${base}Z" fill="${col}"/>`;
    for (let a = 0; a < 3; a++) for (let b = 0; b < Math.floor(h * .45 / 16); b++) if (r() > .35) s += `<rect x="${(x + 5 + a * (w - 8) / 3).toFixed(1)}" y="${(base - h * .48 + b * 16).toFixed(1)}" width="${((w - 12) / 3 - 2).toFixed(1)}" height="8" fill="#000" opacity=".2"/>`; }
  return s; }
