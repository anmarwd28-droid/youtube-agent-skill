// ww_a.js: #58 "what if World War I had never happened?": defs, the 1914 maps (empires, fronts, capitals), globe helpers, the old-town facades, people of 1914, the vintage car; scenes 0-1
const WWDEF = `<linearGradient id="mudG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5440"/><stop offset=".5" stop-color="#4e3c2c"/><stop offset="1" stop-color="#2e2218"/></linearGradient>` +
  `<linearGradient id="mudT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6650"/><stop offset="1" stop-color="#55443a"/></linearGradient>` +
  `<linearGradient id="warSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e3a40"/><stop offset=".45" stop-color="#7a6658"/><stop offset=".8" stop-color="#b08660"/><stop offset="1" stop-color="#c89a6a"/></linearGradient>` +
  `<linearGradient id="nightW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1020"/><stop offset=".6" stop-color="#1e2236"/><stop offset="1" stop-color="#3a3444"/></linearGradient>` +
  `<linearGradient id="oldSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e9cc8"/><stop offset=".6" stop-color="#b4cce0"/><stop offset="1" stop-color="#e8e4d6"/></linearGradient>` +
  `<linearGradient id="winterSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7488"/><stop offset=".6" stop-color="#a4acb8"/><stop offset="1" stop-color="#d4d6da"/></linearGradient>` +
  `<linearGradient id="sbG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b48a"/><stop offset=".6" stop-color="#a48c64"/><stop offset="1" stop-color="#6e5a3e"/></linearGradient>` +
  `<linearGradient id="plankG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a5034"/><stop offset=".5" stop-color="#86684a"/><stop offset="1" stop-color="#5a4028"/></linearGradient>` +
  `<radialGradient id="gasG"><stop offset="0" stop-color="#c8d46a" stop-opacity=".75"/><stop offset=".6" stop-color="#aab84e" stop-opacity=".4"/><stop offset="1" stop-color="#8a9a3a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="smkG"><stop offset="0" stop-color="#4a4440" stop-opacity=".8"/><stop offset=".6" stop-color="#5a524c" stop-opacity=".4"/><stop offset="1" stop-color="#6a625a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="flashG"><stop offset="0" stop-color="#fffbe0"/><stop offset=".3" stop-color="#ffd070" stop-opacity=".85"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="flareG"><stop offset="0" stop-color="#fff8e0" stop-opacity=".9"/><stop offset=".25" stop-color="#ffe8a0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd080" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="khG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e5a3a"/><stop offset=".5" stop-color="#7a7450"/><stop offset="1" stop-color="#4a4630"/></linearGradient>` +
  `<linearGradient id="brassG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a2a"/><stop offset=".5" stop-color="#e8c870"/><stop offset="1" stop-color="#9a7a34"/></linearGradient>` +
  `<linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a3e"/><stop offset=".5" stop-color="#22302a"/><stop offset="1" stop-color="#141c18"/></linearGradient>` +
  `<linearGradient id="riverS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8a8e"/><stop offset="1" stop-color="#3a5258"/></linearGradient>` +
  `<radialGradient id="bloodG" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#c0303a"/><stop offset=".6" stop-color="#7a0e18"/><stop offset="1" stop-color="#4a060c"/></radialGradient>`;
const WWD = () => CVD() + WWDEF + HIDEF;

// ---------- the 1914 maps (lat, lon), simplified ----------
const EMP = {
  ru: { c: '#5cc07a', n: 'الروسيّة', at: [56, 40], p: [[69.6, 30.5], [70.5, 50], [72.5, 70], [75, 100], [73, 130], [70, 160], [66, 180], [62, 179], [60, 165], [55, 160], [51, 156.5], [57, 156], [60, 150], [59, 142], [54, 140], [48, 140], [43, 132], [42.5, 130.7], [45, 133], [48.4, 135], [53.3, 125], [49.8, 117], [50, 108], [50.2, 98], [49.2, 87.5], [45, 80], [42.5, 80], [39.5, 73.5], [37.2, 71.5], [37.2, 68], [35.8, 63], [37, 60], [38.1, 56], [37.4, 53.9], [38.4, 48.9], [39.4, 44.8], [40.2, 43.6], [41.5, 41.6], [43.5, 39.8], [44.6, 37.4], [45.3, 36.6], [44.4, 34.0], [45.6, 32.6], [46.5, 30.8], [45.4, 29.7], [45.5, 28.2], [48.2, 26.6], [48.6, 26.2], [49.6, 25.6], [50.5, 24.1], [50.3, 23.5], [50.5, 22.0], [50.2, 20.0], [50.3, 19.0], [50.9, 19.0], [51.5, 18.5], [52.3, 18.1], [52.8, 19.3], [53.2, 20.5], [53.3, 22.5], [54.4, 22.7], [55.2, 21.3], [56.5, 21.0], [57.6, 21.6], [58.9, 23.4], [59.4, 24.4], [60.3, 26.5], [60.0, 23.0], [60.5, 21.5], [61.6, 21.4], [63.4, 22.3], [65.0, 25.3], [65.8, 24.2], [68.0, 23.4], [69.0, 21.0], [69.9, 27.3]] },
  de: { c: '#7a8ae0', n: 'الألمانيّة', at: [51.6, 10.6], p: [[54.8, 8.6], [54.4, 10.2], [54.1, 11.2], [54.4, 13.2], [54.1, 14.3], [54.6, 16.5], [54.8, 18.4], [54.4, 19.6], [55.2, 21.3], [54.4, 22.7], [53.3, 22.5], [53.2, 20.5], [52.8, 19.3], [52.3, 18.1], [51.5, 18.5], [50.9, 19.0], [50.3, 19.0], [50.1, 18.0], [50.6, 16.2], [50.8, 15.0], [50.3, 12.3], [49.3, 12.8], [48.6, 13.6], [47.6, 13.0], [47.5, 10.3], [47.6, 9.6], [47.6, 7.6], [48.4, 7.1], [49.0, 6.6], [49.5, 5.9], [50.1, 6.1], [50.8, 6.0], [51.8, 6.0], [52.3, 7.0], [53.3, 7.2], [53.6, 8.0], [54.0, 8.8]] },
  at: { c: '#f0c04a', n: 'النمساويّة', at: [47.4, 19.2], p: [[50.3, 19.0], [50.2, 20.0], [50.5, 22.0], [50.3, 23.5], [50.5, 24.1], [49.6, 25.6], [48.6, 26.2], [48.2, 26.6], [47.6, 25.6], [46.9, 26.0], [46.0, 26.4], [45.5, 26.0], [45.4, 24.5], [45.2, 23.0], [44.7, 22.4], [44.8, 21.4], [44.8, 20.4], [44.9, 19.4], [44.0, 19.5], [43.3, 19.2], [42.6, 18.5], [42.4, 18.5], [43.0, 17.5], [43.5, 16.4], [44.1, 15.2], [44.6, 14.8], [45.3, 14.3], [45.6, 13.7], [45.8, 13.5], [46.4, 13.6], [46.5, 12.5], [45.8, 11.0], [46.1, 10.5], [46.6, 10.4], [47.0, 9.6], [47.5, 9.6], [47.5, 10.3], [47.6, 13.0], [48.6, 13.6], [49.3, 12.8], [50.3, 12.3], [50.8, 15.0], [50.6, 16.2], [50.1, 18.0]] },
  ot: { c: '#ec6a40', n: 'العثمانيّة', at: [38.6, 34.5], p: [[41.98, 28.0], [41.7, 26.4], [40.8, 26.0], [40.1, 26.2], [39.0, 26.8], [38.4, 26.6], [37.3, 27.2], [36.7, 28.0], [36.2, 29.6], [36.8, 30.7], [36.2, 32.5], [36.4, 34.5], [36.8, 36.0], [36.0, 35.9], [35.0, 35.9], [34.4, 35.8], [33.3, 35.2], [32.5, 34.9], [31.5, 34.4], [31.3, 34.2], [29.55, 34.9], [28.0, 35.2], [26.0, 36.6], [24.0, 38.0], [21.5, 39.1], [19.0, 40.5], [16.5, 42.6], [15.0, 42.9], [12.8, 43.4], [14.0, 45.0], [17.0, 44.0], [20.0, 42.5], [23.0, 41.5], [26.0, 39.8], [28.0, 38.8], [30.5, 38.6], [31.5, 41.0], [30.5, 44.0], [29.8, 46.5], [30.0, 47.8], [29.95, 48.6], [30.5, 48.1], [31.5, 47.6], [33.0, 46.0], [34.5, 45.5], [35.8, 46.0], [37.0, 44.8], [39.4, 44.4], [40.2, 43.6], [41.5, 41.6], [41.3, 40.0], [41.0, 38.0], [41.7, 35.0], [42.0, 33.5], [41.5, 31.5], [41.2, 29.1], [41.6, 28.2]] }
};
const FRONTS = [
  [[51.15, 2.75], [50.85, 2.9], [50.4, 2.8], [49.95, 2.9], [49.6, 3.0], [49.4, 3.4], [49.25, 4.1], [49.2, 5.0], [49.0, 5.5], [48.85, 6.1], [48.5, 6.9], [48.0, 7.0], [47.55, 7.15]],
  [[57.0, 24.0], [56.6, 25.5], [55.9, 26.6], [54.8, 26.6], [53.9, 26.0], [53.1, 26.0], [52.1, 25.8], [51.2, 25.4], [50.7, 25.3], [49.8, 25.4], [49.0, 25.6], [48.3, 25.9], [47.8, 26.6]],
  [[45.7, 13.6], [46.1, 13.6], [46.4, 13.4], [46.5, 12.5], [46.1, 11.7], [45.85, 11.4], [45.9, 10.8], [46.3, 10.5]],
  [[40.9, 20.8], [41.0, 21.7], [41.1, 22.5], [41.2, 23.3], [41.3, 24.0]]];
// the capitals of the countries at war (1914-1918), on every continent
const CAPS = [[51.5, -.1], [48.9, 2.35], [52.5, 13.4], [48.2, 16.4], [59.9, 30.3], [41.9, 12.5], [41.0, 29.0], [42.7, 23.3], [44.8, 20.5], [44.4, 26.1], [50.85, 4.35], [38.7, -9.1], [38.0, 23.7], [42.4, 18.9], [43.9, 12.45],
  [35.7, 139.7], [38.9, -77.0], [45.4, -75.7], [-37.8, 145.0], [-41.3, 174.8], [-25.7, 28.2], [28.6, 77.2], [-22.9, -43.2], [39.9, 116.4], [13.75, 100.5], [23.1, -82.4], [9.0, -79.5], [14.6, -90.5], [6.3, -10.8], [18.5, -72.3], [14.1, -87.2], [9.9, -84.1], [12.1, -86.3]];

// a point on the globe, pushed onto the visible limb when it is on the far side (so a big area keeps a clean edge)
function PC(G, la, lo, h = 1.004) {
  const n = geo3(la, lo + 180, G.spin, h), cp = G.cam.pos, cl = Math.hypot(...cp), c = cp.map(v => v / cl), d = n[0] * c[0] + n[1] * c[1] + n[2] * c[2], hz = 1 / cl + .015;
  if (d >= hz) return proj3(G.cam, n);
  const q = [n[0] - (d - hz) * c[0], n[1] - (d - hz) * c[1], n[2] - (d - hz) * c[2]], ql = Math.hypot(...q) / h;
  return proj3(G.cam, q.map(v => v / ql));
}
function polyD(G, pts, step = 4) { let d = ''; pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; for (let j = 0; j < step; j++) { const [x, y] = PC(G, lerp(p[0], q[0], j / step), lerp(p[1], q[1], j / step)); d += (d ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } }); return d + 'Z'; }
// one empire on the globe. k = how much it has shattered (0 whole, 1 gone), hi = highlight
function empL(G, key, a, k = 0, hi = 0, t = 0) {
  if (a <= 0) return ''; const E = EMP[key], d = polyD(G, E.p, key === 'ru' ? 3 : 5), id = 'em' + key + Math.round(t * 30);
  let xs = [], ys = []; d.replace(/[ML](-?[\d.]+),(-?[\d.]+)/g, (m, x, y) => { xs.push(+x); ys.push(+y); });
  const x0 = Math.max(-20, Math.min(...xs)), x1 = Math.min(740, Math.max(...xs)), y0 = Math.max(-20, Math.min(...ys)), y1 = Math.min(1300, Math.max(...ys));
  let msk = '';
  if (k <= 0) msk = `<rect x="-20" y="-20" width="760" height="1320" fill="#fff"/>`;
  else if (k < 1) { const r = RS(key.charCodeAt(0) * 7 + key.charCodeAt(1)), cs = 34; for (let y = y0; y < y1; y += cs) for (let x = x0; x < x1; x += cs) { for (let tri = 0; tri < 2; tri++) { const dl = r() * .55, q = clamp((k - dl) / .45); if (q >= 1) continue;
      const dx = (r() - .5) * 60 * q, dy = 40 * q * q + (r() - .3) * 30 * q, pts = tri ? [[x, y], [x + cs, y], [x + cs, y + cs]] : [[x, y], [x, y + cs], [x + cs, y + cs]];
      msk += `<path d="M${pts.map(p => (p[0] + dx).toFixed(0) + ',' + (p[1] + dy).toFixed(0)).join(' L')}Z" fill="#fff" opacity="${(1 - q).toFixed(2)}"/>`; } } }
  const hl = 1 + hi * .6;
  let s = `<defs><clipPath id="${id}c"><path d="${d}"/></clipPath><mask id="${id}m">${msk}</mask></defs><g opacity="${a.toFixed(2)}">`;
  s += `<g mask="url(#${id}m)"><path d="${d}" fill="${E.c}" opacity="${(.42 * hl).toFixed(2)}"/><path d="${d}" fill="#fff" opacity="${(.12 * hi).toFixed(2)}"/>` +
    `<path d="${d}" fill="none" stroke="#08080c" stroke-width="6" opacity=".35" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${E.c}" stroke-width="${(2.6 + hi * 1.6).toFixed(1)}" stroke-linejoin="round"/></g>`;
  if (k > 0 && k < 1) { const r = RS(key.length * 31 + 5); let cr = ''; for (let i = 0; i < 7; i++) { let x = lerp(x0, x1, .2 + r() * .6), y = lerp(y0, y1, .2 + r() * .6), p = `M${x.toFixed(0)},${y.toFixed(0)}`; const an = r() * 6.28; for (let j = 0; j < 6; j++) { x += Math.cos(an + (r() - .5) * 1.2) * 26; y += Math.sin(an + (r() - .5) * 1.2) * 26; p += ` L${x.toFixed(0)},${y.toFixed(0)}`; } cr += p + ' '; }
    s += `<path d="${cr}" stroke="#140a08" stroke-width="3" fill="none" opacity="${(Math.sin(Math.min(1, k * 2.2) * Math.PI) * .8).toFixed(2)}" clip-path="url(#${id}c)"/>`;
    s += `<path d="${d}" fill="none" stroke="#c8c8c8" stroke-width="1.6" stroke-dasharray="6 6" opacity="${(.6 * clamp(k * 2)).toFixed(2)}"/>`; }
  return s + `</g>`;
}
function frontsL(G, k, t, h = 1.008) {
  if (k <= 0) return ''; let s = '';
  FRONTS.forEach((F0, i) => { const d = partD(linePath(G, F0, h), clamp(k * 1.25 - i * .08)); s += `<path d="${d}" stroke="#2a0204" stroke-width="13" fill="none" stroke-linecap="round" opacity=".55"/><path d="${d}" stroke="#ff6a4a" stroke-width="16" fill="none" stroke-linecap="round" opacity=".18" filter="url(#blur2)"/><path d="${d}" stroke="#ff3a2a" stroke-width="5.5" fill="none" stroke-linecap="round" stroke-dasharray="12 6"/>`; });
  // shell flashes along the fronts
  const r = RS(77); for (let i = 0; i < 22; i++) { const L = FRONTS[i % 4], p = L[Math.floor(r() * L.length)], ph = pmod(t * (.7 + r() * .6) + r(), 1); if (G.vis(p[0], p[1]) < .2 || ph > .35) continue; const [x, y] = G.P(p[0] + (r() - .5) * .6, p[1] + (r() - .5) * .6, h), q = ph / .35;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(8 + 22 * q).toFixed(1)}" fill="url(#flashG)" opacity="${(k * (1 - q)).toFixed(2)}"/>`; }
  return s;
}
const capDots = (G, n, t, list = CAPS) => { let s = ''; list.forEach(([la, lo], i) => { const k = clamp(n * 1.4 - i / list.length * .5); if (k <= 0) return; const v = G.vis(la, lo); if (v < .08) return; const [x, y] = G.P(la, lo, 1.01), a = k * clamp((v - .08) / .2), p = .8 + .2 * Math.sin(t * 3 + i);
  s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(15 * p).toFixed(1)}" fill="#f4c76b" opacity="${(.35 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.5" fill="#fff6d0" opacity="${a.toFixed(2)}"/>`; }); return s; };

// ---------- the old town: facades of about 1900 (stucco, cornices, arched windows, balconies, mansard roofs) ----------
function facade(x, base, w, h, o = {}) {
  const r = RS(o.seed || 1), col = o.col || '#d8c8a8', fl = o.fl || Math.max(3, Math.round(h / 120)), fh = h / (fl + .35), nw = o.nw || Math.max(2, Math.round(w / 64)), ww = w / nw, top = base - h, N = o.N || 0;
  let s = `<g>`;
  // the roof
  const rk = o.roof ?? Math.floor(r() * 3);
  if (rk === 0) s += `<path d="M${x - 6},${top} L${x + 14},${top - 54} L${x + w - 14},${top - 54} L${x + w + 6},${top}Z" fill="#4a5a64"/><path d="M${x + 14},${top - 54} L${x + w - 14},${top - 54}" stroke="#2a343a" stroke-width="4"/>` + Array.from({ length: nw }, (_, i) => `<rect x="${(x + i * ww + ww / 2 - 11).toFixed(1)}" y="${top - 44}" width="22" height="30" rx="10" fill="#e8e0cc"/><rect x="${(x + i * ww + ww / 2 - 7).toFixed(1)}" y="${top - 38}" width="14" height="24" rx="7" fill="#2a3440"/>`).join('');
  else if (rk === 1) s += `<path d="M${x - 4},${top} L${x + w / 2},${top - 70} L${x + w + 4},${top}Z" fill="#a8583a"/><path d="M${x + w / 2},${top - 70} L${x + w + 4},${top}" stroke="#000" stroke-width="18" opacity=".12"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M${x + w * i / 7},${top} L${x + w / 2},${top - 70}" stroke="#7a3a24" stroke-width="1.4" opacity=".5"/>`).join('');
  else s += `<rect x="${x - 4}" y="${top - 26}" width="${w + 8}" height="26" fill="${mix(col, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(w / 18) }, (_, i) => `<rect x="${x + 4 + i * 18}" y="${top - 22}" width="9" height="20" rx="4" fill="${mix(col, '#000000', .25)}"/>`).join('') + `<rect x="${x - 8}" y="${top - 32}" width="${w + 16}" height="8" fill="${mix(col, '#ffffff', .35)}"/>`;
  // the wall, light from the left, grain
  s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    `<rect x="${x + w * .72}" y="${top}" width="${w * .28}" height="${h}" fill="#000" opacity=".1"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#aoDn)" opacity=".35"/>`;
  // the ground floor: rusticated, with arched doors / shop fronts
  const gf = fh * 1.15;
  for (let i = 0; i < 6; i++) s += `<path d="M${x},${base - gf + i * gf / 6} H${x + w}" stroke="#000" stroke-width="1.4" opacity=".14"/>`;
  for (let i = 0; i < nw; i++) { const cx = x + i * ww + ww / 2, dw = ww * .62, dt = base - gf * .86; s += `<path d="M${(cx - dw / 2).toFixed(1)},${base} V${(dt + dw / 2).toFixed(1)} A${(dw / 2).toFixed(1)},${(dw / 2).toFixed(1)} 0 0 1 ${(cx + dw / 2).toFixed(1)},${(dt + dw / 2).toFixed(1)} V${base}Z" fill="${N > .5 ? '#f4c870' : '#2a2620'}"/><path d="M${(cx - dw / 2 + 5).toFixed(1)},${base} V${(dt + dw / 2).toFixed(1)}" stroke="#fff" stroke-width="2" opacity=".15"/>`;
    if (o.shops && i % 2 === 0) s += `<path d="M${(cx - dw / 2 - 8).toFixed(1)},${(dt + 4).toFixed(1)} h${(dw + 16).toFixed(1)} l-10,34 h${(-dw + 4).toFixed(1)}Z" fill="${['#a83a2a', '#2a5a3a', '#3a4a7a', '#8a6a2a'][(i + (o.seed || 0)) % 4]}"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${(cx - dw / 2 - 2 + q * (dw + 4) / 5).toFixed(1)},${(dt + 4).toFixed(1)} l-2,34" stroke="#fff" stroke-width="5" opacity=".2"/>`).join(''); }
  s += `<rect x="${x - 4}" y="${base - gf - 8}" width="${w + 8}" height="10" fill="${mix(col, '#ffffff', .35)}"/><rect x="${x - 4}" y="${base - gf + 2}" width="${w + 8}" height="5" fill="#000" opacity=".2"/>`;
  // the upper floors: windows with frames, pediments, shutters, balconies
  for (let f = 1; f <= fl; f++) { const yb = base - gf - (f - 1) * fh, wy = yb - fh * .82, wh = fh * .6, kind = (f + (o.seed || 0)) % 3;
    if (f < fl) s += `<rect x="${x - 3}" y="${yb - fh - 4}" width="${w + 6}" height="6" fill="${mix(col, '#ffffff', .3)}"/><rect x="${x - 3}" y="${yb - fh + 2}" width="${w + 6}" height="3" fill="#000" opacity=".16"/>`;
    for (let i = 0; i < nw; i++) { const cx = x + i * ww + ww / 2, wd = ww * .44, lit = N > 0 && RS(i * 13 + f * 7 + (o.seed || 0))() < .55;
      const gl = lit ? '#f8d48a' : '#34414c';
      s += `<rect x="${(cx - wd / 2 - 5).toFixed(1)}" y="${(wy - 5).toFixed(1)}" width="${(wd + 10).toFixed(1)}" height="${(wh + 10).toFixed(1)}" fill="${mix(col, '#ffffff', .4)}"/>` +
        (kind === 1 ? `<path d="M${(cx - wd / 2).toFixed(1)},${(wy + wh).toFixed(1)} V${(wy + wd / 2).toFixed(1)} A${(wd / 2).toFixed(1)},${(wd / 2).toFixed(1)} 0 0 1 ${(cx + wd / 2).toFixed(1)},${(wy + wd / 2).toFixed(1)} V${(wy + wh).toFixed(1)}Z" fill="${gl}"/>` : `<rect x="${(cx - wd / 2).toFixed(1)}" y="${wy.toFixed(1)}" width="${wd.toFixed(1)}" height="${wh.toFixed(1)}" fill="${gl}"/>`) +
        `<path d="M${cx.toFixed(1)},${(wy + (kind === 1 ? wd / 2 : 0)).toFixed(1)} V${(wy + wh).toFixed(1)} M${(cx - wd / 2).toFixed(1)},${(wy + wh * .42).toFixed(1)} H${(cx + wd / 2).toFixed(1)}" stroke="${mix(col, '#ffffff', .5)}" stroke-width="2.4"/>` +
        (lit ? '' : `<path d="M${(cx - wd / 2 + 3).toFixed(1)},${(wy + wh - 4).toFixed(1)} L${(cx - 2).toFixed(1)},${(wy + 8).toFixed(1)}" stroke="#a8c4d4" stroke-width="5" opacity=".22"/>`) +
        `<rect x="${(cx - wd / 2 - 8).toFixed(1)}" y="${(wy + wh + 3).toFixed(1)}" width="${(wd + 16).toFixed(1)}" height="7" fill="${mix(col, '#ffffff', .3)}"/><rect x="${(cx - wd / 2 - 6).toFixed(1)}" y="${(wy + wh + 10).toFixed(1)}" width="${(wd + 12).toFixed(1)}" height="4" fill="#000" opacity=".2"/>`;
      if (kind === 0) s += `<path d="M${(cx - wd / 2 - 9).toFixed(1)},${(wy - 7).toFixed(1)} L${cx.toFixed(1)},${(wy - 26).toFixed(1)} L${(cx + wd / 2 + 9).toFixed(1)},${(wy - 7).toFixed(1)}Z" fill="${mix(col, '#ffffff', .3)}"/><path d="M${(cx - wd / 2 - 9).toFixed(1)},${(wy - 7).toFixed(1)} L${(cx + wd / 2 + 9).toFixed(1)},${(wy - 7).toFixed(1)}" stroke="#000" stroke-width="2" opacity=".2"/>`;
      if (kind === 2) s += `<rect x="${(cx - wd / 2 - 7).toFixed(1)}" y="${(wy - 12).toFixed(1)}" width="${(wd + 14).toFixed(1)}" height="7" fill="${mix(col, '#ffffff', .3)}"/>`;
      if (o.shut && kind !== 1) s += `<rect x="${(cx - wd / 2 - 16).toFixed(1)}" y="${wy.toFixed(1)}" width="10" height="${wh.toFixed(1)}" fill="${o.shut}"/><rect x="${(cx + wd / 2 + 6).toFixed(1)}" y="${wy.toFixed(1)}" width="10" height="${wh.toFixed(1)}" fill="${o.shut}"/>`;
      if (f === 2 && o.balc) s += `<rect x="${(cx - wd / 2 - 14).toFixed(1)}" y="${(wy + wh + 2).toFixed(1)}" width="${(wd + 28).toFixed(1)}" height="6" fill="#3a3a3a"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${(cx - wd / 2 - 12 + q * (wd + 24) / 6).toFixed(1)},${(wy + wh - 22).toFixed(1)} v24" stroke="#2a2a2a" stroke-width="2"/>`).join('') + `<path d="M${(cx - wd / 2 - 14).toFixed(1)},${(wy + wh - 22).toFixed(1)} h${(wd + 28).toFixed(1)}" stroke="#2a2a2a" stroke-width="3"/>`; } }
  // pilasters at the edges
  s += `<rect x="${x}" y="${top}" width="9" height="${h}" fill="#fff" opacity=".14"/><rect x="${x + w - 9}" y="${top}" width="9" height="${h}" fill="#000" opacity=".14"/>`;
  return s + `</g>`;
}
// a cobbled street with pavement (perspective-free, as the house streets)
function cobbles(y0, y1, col = '#6a645c', seed = 3) { let s = `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="${col}"/>`; const r = RS(seed);
  for (let y = y0 + 6, row = 0; y < y1; y += 13 + row * .6, row++) { const off = (row % 2) * 12; for (let x = -20 + off; x < 740; x += 24 + r() * 4) s += `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="20" height="${(9 + row * .5).toFixed(0)}" rx="4" fill="${mix(col, r() > .5 ? '#ffffff' : '#000000', .08 + r() * .08)}"/>`; }
  return s + `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${y0}" width="760" height="20" fill="url(#aoDn)" opacity=".6"/>`; }

// ---------- people of 1914: coats, hats, long skirts ----------
const P14 = [{ top: '#2e2a2a', pants: '#26242a', skin: '#c89a74', hair: '#2a1d16' }, { top: '#4a3e30', pants: '#3a3228', skin: '#b07a55', hair: '#1b1410' }, { top: '#3a4250', pants: '#2a2e38', skin: '#d0a07a', hair: '#5a3a22' }, { top: '#6a5240', pants: '#4a3a2e', skin: '#a87050', hair: '#1d1612' }, { top: '#5a2e34', pants: '#2a2228', skin: '#c08a66', hair: '#3a2a1a' }];
function hat(kind, s, col = '#1c1a1a') { const [hx, hy] = HP.head, f = (HP.eye[0] > hx) ? 1 : -1;
  if (kind === 'bowler') return `<ellipse cx="${(hx).toFixed(1)}" cy="${(hy - 15 * s).toFixed(1)}" rx="${(27 * s).toFixed(1)}" ry="${(5 * s).toFixed(1)}" fill="${col}"/><path d="M${(hx - 18 * s).toFixed(1)},${(hy - 15 * s).toFixed(1)} Q${(hx - 19 * s).toFixed(1)},${(hy - 40 * s).toFixed(1)} ${hx.toFixed(1)},${(hy - 40 * s).toFixed(1)} Q${(hx + 19 * s).toFixed(1)},${(hy - 40 * s).toFixed(1)} ${(hx + 18 * s).toFixed(1)},${(hy - 15 * s).toFixed(1)}Z" fill="${col}"/><path d="M${(hx - 10 * s).toFixed(1)},${(hy - 34 * s).toFixed(1)} q${(8 * s).toFixed(1)},${(-4 * s).toFixed(1)} ${(16 * s).toFixed(1)},0" stroke="#fff" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".25"/>`;
  if (kind === 'cap') return `<path d="M${(hx - 20 * s).toFixed(1)},${(hy - 12 * s).toFixed(1)} Q${(hx - 18 * s).toFixed(1)},${(hy - 32 * s).toFixed(1)} ${(hx + 4 * s).toFixed(1)},${(hy - 30 * s).toFixed(1)} Q${(hx + 22 * s).toFixed(1)},${(hy - 26 * s).toFixed(1)} ${(hx + 20 * s).toFixed(1)},${(hy - 14 * s).toFixed(1)}Z" fill="${col}"/><path d="M${(hx + f * 12 * s).toFixed(1)},${(hy - 13 * s).toFixed(1)} l${(f * 18 * s).toFixed(1)},${(3 * s).toFixed(1)}" stroke="${col}" stroke-width="${(5 * s).toFixed(1)}" stroke-linecap="round"/>`;
  if (kind === 'fur') return `<path d="M${(hx - 22 * s).toFixed(1)},${(hy - 8 * s).toFixed(1)} Q${(hx - 24 * s).toFixed(1)},${(hy - 40 * s).toFixed(1)} ${hx.toFixed(1)},${(hy - 40 * s).toFixed(1)} Q${(hx + 24 * s).toFixed(1)},${(hy - 40 * s).toFixed(1)} ${(hx + 22 * s).toFixed(1)},${(hy - 8 * s).toFixed(1)}Z" fill="${col}"/><path d="M${(hx - 22 * s).toFixed(1)},${(hy - 12 * s).toFixed(1)} H${(hx + 22 * s).toFixed(1)}" stroke="#000" stroke-width="${(5 * s).toFixed(1)}" opacity=".25"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${(hx - 18 * s + i * 7 * s).toFixed(1)},${(hy - 38 * s).toFixed(1)} l${(2 * s).toFixed(1)},${(4 * s).toFixed(1)}" stroke="#fff" stroke-width="${(1.4 * s).toFixed(1)}" opacity=".2"/>`).join('');
  if (kind === 'lady') return `<ellipse cx="${hx.toFixed(1)}" cy="${(hy - 18 * s).toFixed(1)}" rx="${(36 * s).toFixed(1)}" ry="${(8 * s).toFixed(1)}" fill="${col}"/><path d="M${(hx - 16 * s).toFixed(1)},${(hy - 20 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 40 * s).toFixed(1)} ${(hx + 16 * s).toFixed(1)},${(hy - 20 * s).toFixed(1)}Z" fill="${col}"/><path d="M${(hx - 14 * s).toFixed(1)},${(hy - 24 * s).toFixed(1)} q${(12 * s).toFixed(1)},${(-14 * s).toFixed(1)} ${(30 * s).toFixed(1)},${(-8 * s).toFixed(1)}" stroke="#e8d8c0" stroke-width="${(5 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  return ''; }
// a person of 1914: k = palette, o.hat, o.skirt (a long skirt over the legs), o.walk, o.h
function p14(x, y, s, f, k, t, o = {}) { const P = Object.assign({}, P14[k % P14.length], o.pal || {}); let g = hero(x, y, Object.assign({ s, face: f, shade: 1, walk: o.walk ?? null }, P, o.h || {}));
  const hip = HP.hip, ff = HP.footF, fb = HP.footB, hx = HP.head[0];
  if (o.skirt) { const sc = o.skirt, yb = Math.max(ff[1], fb[1]) - 6 * s, xm = (ff[0] + fb[0]) / 2; g += `<path d="M${(hip[0] - 22 * s).toFixed(1)},${(hip[1] - 8 * s).toFixed(1)} L${(hip[0] + 22 * s).toFixed(1)},${(hip[1] - 8 * s).toFixed(1)} L${(xm + 38 * s).toFixed(1)},${yb.toFixed(1)} Q${xm.toFixed(1)},${(yb + 6 * s).toFixed(1)} ${(xm - 38 * s).toFixed(1)},${yb.toFixed(1)}Z" fill="${sc}"/><path d="M${(hip[0] - 22 * s).toFixed(1)},${(hip[1] - 8 * s).toFixed(1)} L${(xm - 38 * s).toFixed(1)},${yb.toFixed(1)} L${(xm - 18 * s).toFixed(1)},${yb.toFixed(1)}Z" fill="#000" opacity=".2"/><path d="M${(hip[0] - 23 * s).toFixed(1)},${(hip[1] - 8 * s).toFixed(1)} H${(hip[0] + 23 * s).toFixed(1)}" stroke="#000" stroke-width="${(4 * s).toFixed(1)}" opacity=".3"/>`; }
  if (o.stache) { const [ex, ey] = HP.eye, d = ex > hx ? 1 : -1; g += `<path d="M${(ex - d * 6 * s).toFixed(1)},${(ey + 12 * s).toFixed(1)} q${(d * 6 * s).toFixed(1)},${(-3 * s).toFixed(1)} ${(d * 13 * s).toFixed(1)},${(2 * s).toFixed(1)}" stroke="${o.stache}" stroke-width="${(4.4 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  if (o.hat) g += hat(o.hat, s, o.hatC);
  return g; }

// ---------- a touring car of about 1911 (side view, open top) ----------
function carV(x, y, s, f, t, o = {}) {
  const rot = (o.roll || 0) * 57.3;
  const wheel = (cx) => { let w = `<g transform="translate(${cx},-34)"><circle r="34" fill="#141414"/><circle r="27" fill="#d8ccb0"/><circle r="24" fill="#2a2a2a"/><g transform="rotate(${rot.toFixed(1)})">`; for (let i = 0; i < 12; i++) w += `<path d="M0,0 L${(23 * Math.cos(i * .5236)).toFixed(1)},${(23 * Math.sin(i * .5236)).toFixed(1)}" stroke="#c8b890" stroke-width="3"/>`; return w + `</g><circle r="6" fill="url(#brassG)"/></g>`; };
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(f * s).toFixed(3)},${s})"><ellipse cx="0" cy="2" rx="190" ry="10" fill="#000" opacity=".35" filter="url(#blur2)"/>`;
  // the chassis, fenders and running board
  g += `<path d="M-170,-46 L170,-46 L170,-56 L-170,-56Z" fill="#141a16"/><path d="M-150,-56 Q-118,-92 -84,-56 M88,-56 Q122,-92 156,-56" stroke="#141a16" stroke-width="10" fill="none"/><path d="M-84,-50 L88,-50" stroke="#2a2a2a" stroke-width="8"/>`;
  // the body: hood in front (right), high tub with seats, folded top at the back
  g += `<path d="M66,-60 L66,-118 L150,-110 Q162,-96 158,-60Z" fill="url(#carBody)"/><rect x="156" y="-122" width="16" height="66" rx="3" fill="url(#brassG)"/><path d="M160,-118 v58 M166,-118 v58" stroke="#5a4a24" stroke-width="1.4"/>` +
    `<path d="M-160,-60 L-160,-128 Q-150,-142 -110,-138 L60,-130 L66,-60Z" fill="url(#carBody)"/><path d="M-158,-124 Q-120,-136 60,-126" stroke="#fff" stroke-width="2.4" fill="none" opacity=".22"/><path d="M-30,-128 V-62" stroke="#000" stroke-width="2" opacity=".35"/>` +
    `<path d="M-168,-136 Q-196,-150 -186,-118 Q-176,-104 -160,-112Z" fill="#2a2420"/><path d="M-182,-146 Q-210,-128 -178,-110" stroke="#4a3e30" stroke-width="6" fill="none"/>` +
    `<path d="M60,-132 L74,-176" stroke="#888" stroke-width="3"/><path d="M48,-176 L82,-172" stroke="#a8c0c8" stroke-width="3" opacity=".7"/><circle cx="170" cy="-104" r="9" fill="url(#brassG)"/><circle cx="170" cy="-104" r="5" fill="#fff6d0"/>`;
  g += wheel(-117) + wheel(122) + `</g>`;
  // the people on the seats: drawn as upper bodies above the tub
  const cid = 'cv' + Math.round(x) + Math.round(y);
  g += `<defs><clipPath id="${cid}"><rect x="-40" y="-40" width="800" height="${(y - 70 * s + 40).toFixed(1)}"/></clipPath></defs><g clip-path="url(#${cid})">`;
  (o.pp || []).forEach(([px, k, h]) => { const wx = x + f * px * s, ps = s * .72; g += hero(wx, y - 66 * s, Object.assign({ s: ps, face: f, shade: 1, lF: [1.5708, .05], lB: [1.42, -.02], noShadow: 1, aF: [.5, 1.2] }, P14[k % P14.length])) + (h ? hat(h, ps, h === 'lady' ? '#e8e0d0' : '#1c1a1a') : ''); });
  g += `</g>`;
  return g;
}

// ---------- 0: the hook: the fronts of 1914-1918 burn across Europe ----------
function sceneHook(t) {
  const k = ease(clamp(t / 3));
  const G = gAt(t, 360, 760, { d: lerp(3.7, 3.1, k), el: .84, lon: 14 + t * .7, clouds: .28, lights: .25, off: -.7, up: .6 });
  F.ov = `<defs>${WWD()}</defs>` + frontsL(G, ease(ramp(t, .2, 2.4)), t);
  return space(t);
}

// ---------- 1: summer 1914, a shot in Sarajevo starts a war of more than thirty countries ----------
function sceneShot(t) {
  const t0 = S0(1) - .2, T = t - t0, sh = WS(1, 7);
  let s = `<defs>${WWD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#oldSky)"/>`;
  s += `<g transform="translate(360,900) scale(${(1 + .04 * ease(clamp(T / 6))).toFixed(3)}) translate(-360,-900)">`;
  // the hills behind the town, then the facades along the river street
  s += `<path d="M-20,700 Q120,560 260,640 Q380,560 520,620 Q640,570 740,640 V900 H-20Z" fill="#7a9a7a"/><path d="M-20,700 Q120,560 260,640 Q380,560 520,620 Q640,570 740,640 V900 H-20Z" fill="#000" filter="url(#grainR)" opacity=".15"/><path d="M-20,760 Q200,690 420,730 Q600,700 740,740 V900 H-20Z" fill="#6a8a6a"/>`;
  s += `<rect x="-20" y="560" width="760" height="380" fill="#b4c8d8" opacity=".25"/>`;
  [[-40, 190, 430, '#e0cca4', 4, 0], [150, 170, 470, '#cfb8a0', 7, 2], [320, 200, 400, '#e4d8bc', 2, 1], [520, 240, 450, '#d4bc94', 9, 0]].forEach(([x, w, h, c, sd, rf]) => { s += facade(x, 990, w, h, { col: c, seed: sd, roof: rf, shops: 1, balc: sd % 2, shut: sd === 7 ? '#3a5a4a' : null }); });
  // the pavement with people of 1914, the cobbled street, the river wall
  s += `<rect x="-20" y="990" width="760" height="60" fill="#b8ae9c"/><rect x="-20" y="990" width="760" height="60" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1046" width="760" height="8" fill="#8a8274"/>` + cobbles(1054, 1300, '#6e665c', 5);
  [40, 470].forEach(lx => { s += `<path d="M${lx},1040 V800" stroke="#1e2224" stroke-width="7"/><path d="M${lx - 10},1040 h20 l-4,-30 h-12Z" fill="#1e2224"/><path d="M${lx - 16},800 h32 l-6,-36 h-20Z" fill="#e8e0c0" stroke="#1e2224" stroke-width="4"/><path d="M${lx - 18},764 h36 l-18,-14Z" fill="#1e2224"/>`; });
  const scat = ease(ramp(t, sh + .1, sh + 1.2));
  [[80, 1046, .66, 1, 0, 'bowler'], [190, 1044, .64, -1, 4, 'lady', '#3a2a4a'], [300, 1046, .66, 1, 1, 'cap'], [420, 1044, .62, 1, 2, 'bowler'], [520, 1046, .64, -1, 3, 'lady', '#5a4a3a'], [640, 1046, .66, -1, 0, 'bowler']].forEach(([x, y, sc, f, k, h, sk], i) => {
    const run = scat * (i % 2 ? -1 : 1) * 40; s += p14(x + run, y, sc, scat > .2 ? (i % 2 ? -1 : 1) : f, k, t, { hat: h, skirt: sk, hatC: h === 'lady' ? '#3a2a2a' : null, walk: scat > .05 ? T * 3 + i : null, h: scat > .05 ? {} : { aF: [.1, .35] } }); });
  // the car comes along the street and stops at the shot
  const cx = lerp(820, 300, ease(clamp((t - t0) / (sh - t0 + .2)))), roll = (820 - cx) / 34;
  s += carV(cx, 1200, .86, -1, t, { roll, pp: [[30, 1, 'cap'], [-70, 0, 'bowler'], [-125, 4, 'lady']] });
  // the shot: a small flash and smoke from the pavement, pigeons fly up
  const fq = clamp((t - sh) / .5); if (t > sh - .02 && fq < 1) s += `<circle cx="250" cy="1010" r="${(10 + 50 * fq).toFixed(1)}" fill="url(#flashG)" opacity="${(1 - fq).toFixed(2)}"/>`;
  if (t > sh) { const q = clamp((t - sh) / 2.2); s += `<ellipse cx="${(250 + 30 * q).toFixed(1)}" cy="${(1000 - 70 * q).toFixed(1)}" rx="${(14 + 40 * q).toFixed(1)}" ry="${(10 + 26 * q).toFixed(1)}" fill="#e8e4dc" opacity="${(.6 * (1 - q)).toFixed(2)}" filter="url(#blur2)"/>`;
    for (let i = 0; i < 9; i++) { const q2 = clamp((t - sh - i * .05) / 2.4); s += bird(200 + i * 40 + q2 * (120 + i * 20), 960 - q2 * (380 + i * 30), .55, Math.sin(t * 22 + i), -10); } }
  s += `</g>`;
  noEarth(); F.ov = ''; return s;
}
function sceneWar(t) {
  const G = gAt(t, 360, 700, { d: lerp(5.2, 8.8, ease(ramp(t, WS(1, 10) - .3, WS(1, 16)))), el: .5, lon: lerp(18, -30, ease(ramp(t, WS(1, 10), WS(1, 16) + .4))), clouds: .4, lights: .3, off: -.7 });
  F.ov = `<defs>${WWD()}</defs>` + frontsL(G, 1 - ease(ramp(t, WS(1, 10), WS(1, 12))), t) + capDots(G, ease(ramp(t, WS(1, 11), WS(1, 16))), t);
  return space(t);
}
// ---------- a dead tree: bare branching limbs ----------
function deadTree(x, y, h, seed, col = '#4a3a2c') {
  const r = RS(seed); let s = '';
  const br = (x0, y0, ang, len, w, d) => { const x1 = x0 + Math.sin(ang) * len, y1 = y0 - Math.cos(ang) * len, mx = (x0 + x1) / 2 + (r() - .5) * len * .22, my = (y0 + y1) / 2;
    s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}" stroke="${col}" stroke-width="${w.toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    if (d > 0) { const n = d > 2 ? 2 : 2 + (r() > .5 ? 1 : 0); for (let i = 0; i < n; i++) br(x1, y1, ang + (i - (n - 1) / 2) * (.7 + r() * .3) + (r() - .5) * .3, len * (.62 + r() * .2), Math.max(1.2, w * .6), d - 1); } };
  br(x, y, (r() - .5) * .12, h * .36, h * .055, 4);
  return `<g>${s}</g><path d="M${(x - h * .014).toFixed(1)},${y} L${(x - h * .008).toFixed(1)},${(y - h * .3).toFixed(1)}" stroke="#fff" stroke-width="2.5" opacity=".14" stroke-linecap="round"/>`;
}
