// helpers from #36 (no wheel): woodWheel, bladeWheel, gear, dust, oxCart, plain, bike, tramCar
const WHDEF = `<linearGradient id="woodW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8875a"/><stop offset=".5" stop-color="#946640"/><stop offset="1" stop-color="#6e4a2c"/></linearGradient>` +
  `<radialGradient id="metG" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#eef2f6"/><stop offset=".6" stop-color="#9aa4b0"/><stop offset="1" stop-color="#4a525c"/></radialGradient>` +
  `<linearGradient id="bladeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a646e"/><stop offset=".5" stop-color="#c8d0d8"/><stop offset="1" stop-color="#6a747e"/></linearGradient>` +
  `<linearGradient id="bronzeG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5020"/><stop offset=".5" stop-color="#e0b060"/><stop offset="1" stop-color="#8a5a24"/></linearGradient>` +
  `<linearGradient id="skyW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset=".6" stop-color="#9cbcd8"/><stop offset="1" stop-color="#e8d8b8"/></linearGradient>` +
  `<linearGradient id="dirtG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a878"/><stop offset="1" stop-color="#8a6a44"/></linearGradient>` +
  `<radialGradient id="spotG" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#fff2d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff2d0" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="clayG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#e0a878"/><stop offset=".7" stop-color="#b0704a"/><stop offset="1" stop-color="#7a4a2e"/></radialGradient>`;
const DEFW = () => `${DEFN()}${WHDEF}`;
const recol = (svg, a, b) => svg.split(a).join(b);
function woodWheel(cx, cy, R, rot, a = 1, id = 'ww') {
  if (a <= 0) return '';
  let s = `<defs><clipPath id="${id}"><circle cx="0" cy="0" r="${R}"/></clipPath></defs><g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot.toFixed(1)})" opacity="${a.toFixed(2)}">`;
  s += `<circle r="${R}" fill="url(#woodW)"/><g clip-path="url(#${id})">` + Array.from({ length: 16 }, (_, i) => `<path d="M${(-R + i * R / 8 + 3).toFixed(1)},${-R} C${(-R + i * R / 8 + 8).toFixed(1)},${(-R * .3).toFixed(1)} ${(-R + i * R / 8 - 4).toFixed(1)},${(R * .3).toFixed(1)} ${(-R + i * R / 8 + 2).toFixed(1)},${R}" stroke="#5a3a20" stroke-width="1.2" fill="none" opacity=".45"/>`).join('') +
    `<path d="M${-R / 3},${-R} V${R} M${R / 3},${-R} V${R}" stroke="#3a2412" stroke-width="${(R * .03).toFixed(1)}"/><path d="M${-R / 3 + 3},${-R} V${R} M${R / 3 + 3},${-R} V${R}" stroke="#d8a878" stroke-width="1.5" opacity=".4"/>` +
    [-.5, .5].map(k => `<rect x="${-R}" y="${(k * R - R * .07).toFixed(1)}" width="${2 * R}" height="${(R * .14).toFixed(1)}" fill="#5a3a22"/><rect x="${-R}" y="${(k * R - R * .07).toFixed(1)}" width="${2 * R}" height="${(R * .03).toFixed(1)}" fill="#fff" opacity=".15"/>` + [-.6, 0, .6].map(q => `<circle cx="${(q * R).toFixed(1)}" cy="${(k * R).toFixed(1)}" r="${(R * .03).toFixed(1)}" fill="#2a1a0c"/>`).join('')).join('') + `</g>` +
    `<circle r="${R}" fill="none" stroke="#3a2412" stroke-width="${(R * .06).toFixed(1)}"/><circle r="${R * .96}" fill="none" stroke="#c89868" stroke-width="1.5" opacity=".35"/>` +
    `<circle r="${R * .2}" fill="#6a4426"/><circle r="${R * .2}" fill="none" stroke="#2a1a0c" stroke-width="3"/><circle r="${R * .08}" fill="#1a0e06"/><circle cx="${-R * .05}" cy="${-R * .06}" r="${R * .05}" fill="#fff" opacity=".12"/></g>`;
  return s;
}
function bladeWheel(cx, cy, R, rot, n, fill, hub = '#eef2f6') {
  let s = `<g transform="translate(${cx},${cy})"><circle r="${R + 10}" fill="#2a3038"/><circle r="${R + 10}" fill="none" stroke="url(#metG)" stroke-width="12"/><circle r="${R}" fill="#14181e"/><g transform="rotate(${rot.toFixed(1)})">`;
  for (let i = 0; i < n; i++) { const a = i / n * 360; s += `<path d="M${(R * .2).toFixed(1)},-6 C${(R * .5).toFixed(1)},-18 ${(R * .8).toFixed(1)},-24 ${(R * .99).toFixed(1)},-14 L${(R * .99).toFixed(1)},6 C${(R * .8).toFixed(1)},2 ${(R * .5).toFixed(1)},4 ${(R * .2).toFixed(1)},8Z" fill="${fill}" stroke="#2a3038" stroke-width="1" transform="rotate(${a.toFixed(1)})"/>`; }
  s += `</g><circle r="${R * .22}" fill="url(#metG)"/><circle cx="${(-R * .06).toFixed(1)}" cy="${(-R * .07).toFixed(1)}" r="${(R * .06).toFixed(1)}" fill="#fff" opacity=".5"/><circle r="${R * .04}" fill="#2a3038"/></g>`;
  return s;
}
function gear(cx, cy, R, teeth, rot, col) {
  let d = ''; for (let i = 0; i < teeth * 4; i++) { const a = (i / (teeth * 4)) * 2 * Math.PI + rot, r = (i % 4 < 2) ? R : R * .84; d += (i ? 'L' : 'M') + (cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1); }
  return `<path d="${d}Z" fill="${col}" stroke="#2a1a08" stroke-width="2"/><circle cx="${cx}" cy="${cy}" r="${R * .55}" fill="none" stroke="#2a1a08" stroke-width="2" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="${R * .16}" fill="#3a2a12"/>` + [0, 1, 2, 3].map(k => { const a = rot + k * Math.PI / 2; return `<path d="M${(cx + Math.cos(a) * R * .18).toFixed(1)},${(cy + Math.sin(a) * R * .18).toFixed(1)} L${(cx + Math.cos(a) * R * .52).toFixed(1)},${(cy + Math.sin(a) * R * .52).toFixed(1)}" stroke="#2a1a08" stroke-width="${(R * .1).toFixed(1)}" opacity=".35"/>`; }).join('');
}
const dust = (x, y, k, seed, n = 18, spread = 110) => { if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = puff(x, y, 30 + k * 80, (1 - k) * .8); for (let i = 0; i < n; i++) { const a = r() * 6.28, d = k * spread * (.4 + r()); s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d * .6 - k * 30).toFixed(1)}" r="${(2 + r() * 3).toFixed(1)}" fill="#e8d8b8" opacity="${((1 - k) * .9).toFixed(2)}"/>`; } return s; };
function oxCart(x, y, t, wa, drop, ph) {
  const ox = recol(quad(x + 190, y, 1.15, { kind: 'cow', face: 1, moving: drop < .5 ? 1 : 0, phase: ph }), '#e8e2d6', '#8a5a3a').split('#f4f0ea').join('#c89a72');
  const cy = y - 70 + drop * 52, rot = drop * 6;
  let c = `<g transform="rotate(${rot.toFixed(1)},${x - 60},${cy})"><path d="M${x + 40},${cy - 10} L${x + 200},${y - 104}" stroke="#5a3a20" stroke-width="9" stroke-linecap="round"/>` +
    `<path d="M${x - 150},${cy - 30} L${x + 60},${cy - 30} L${x + 52},${cy + 8} L${x - 142},${cy + 8}Z" fill="#8a5a34"/><path d="M${x - 150},${cy - 30} L${x + 60},${cy - 30} L${x + 58},${cy - 22} L${x - 148},${cy - 22}Z" fill="#c89868" opacity=".6"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x - 140 + i * 36},${cy - 30} V${cy + 8}" stroke="#4a2e18" stroke-width="2" opacity=".6"/>`).join('') +
    `<path d="M${x - 146},${cy - 30} L${x - 140},${cy - 80} M${x + 56},${cy - 30} L${x + 50},${cy - 80} M${x - 143},${cy - 80} L${x + 53},${cy - 80}" stroke="#6a4426" stroke-width="7"/>` +
    // sacks of grain in the cart
    [[-110, 0], [-60, 1], [-10, 2]].map(([dx, i]) => `<ellipse cx="${x + dx}" cy="${cy - 48}" rx="30" ry="22" fill="${['#d8c49a', '#cbb58a', '#e0cca4'][i]}"/><path d="M${x + dx - 10},${cy - 68} q10,-8 20,0" stroke="#8a7450" stroke-width="3" fill="none"/>`).join('') + `</g>`;
  return ox + c + woodWheel(x - 50, y - 46 + drop * 6, 46, ph * 30, wa, 'wh1');
}
function plain(t, o = {}) {
  let s = `<defs>${DEFW()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyW)"/>` +
    `<circle cx="560" cy="330" r="120" fill="#fff4d0" opacity=".22" filter="url(#soft)"/><circle cx="560" cy="330" r="50" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="560" cy="330" r="24" fill="#fffef6"/>` + cumulus(200 + t * 4, 470, 220, 51, { a: .85 }) +
    mountainsR(820, 120, o.seed || 81, { rock: o.rock || '#a08a70', snowAt: o.snow ?? 0 }) + `<rect x="-20" y="800" width="760" height="40" fill="#e8d8b8" opacity=".5" filter="url(#soft)"/>` +
    meadow(830, 1300, t, { c0: o.g0 || '#b8a868', c1: o.g1 || '#7a6a3a' }) +
    `<path d="M-20,1010 C200,990 500,1000 740,1010 L740,1140 C500,1130 200,1140 -20,1150Z" fill="url(#dirtG)"/><path d="M-20,1010 C200,990 500,1000 740,1010 L740,1140 C500,1130 200,1140 -20,1150Z" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    Array.from({ length: 12 }, (_, i) => { const r = RS(i + 9); return `<ellipse cx="${(r() * 740).toFixed(0)}" cy="${(1020 + r() * 110).toFixed(0)}" rx="${(4 + r() * 6).toFixed(1)}" ry="3" fill="#6a5034" opacity=".5"/>`; }).join('');
  return s;
}
function bike(x, y, s, col) {
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="-40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/><circle cx="40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/>` +
    `<path d="M-40,-24 L-10,-24 L20,-58 L-20,-58 Z M-10,-24 L-22,-64 M20,-58 L40,-24 M18,-58 L22,-72" stroke="${col}" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M-30,-66 h18" stroke="#1a1a1e" stroke-width="6" stroke-linecap="round"/><path d="M14,-72 h16" stroke="#1a1a1e" stroke-width="4" stroke-linecap="round"/><circle cx="-10" cy="-24" r="5" fill="#3a3a40"/></g>`;
}
function tramCar(x, y, len) {
  return `<rect x="${x}" y="${y - 70}" width="${len}" height="62" rx="12" fill="#e8e4dc"/><rect x="${x}" y="${y - 30}" width="${len}" height="10" fill="#c83a2a"/><rect x="${x}" y="${y - 70}" width="${len}" height="8" rx="4" fill="#fff" opacity=".5"/>` +
    Array.from({ length: Math.floor(len / 34) }, (_, i) => `<rect x="${x + 10 + i * 34}" y="${y - 60}" width="24" height="24" rx="3" fill="#3a5a7a"/><path d="M${x + 12 + i * 34},${y - 40} L${x + 26 + i * 34},${y - 60}" stroke="#fff" stroke-width="3" opacity=".25"/>`).join('') +
    `<rect x="${x}" y="${y - 8}" width="${len}" height="6" fill="#3a3a40"/>`;
}
