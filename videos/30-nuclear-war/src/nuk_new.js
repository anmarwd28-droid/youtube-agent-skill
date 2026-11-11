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
