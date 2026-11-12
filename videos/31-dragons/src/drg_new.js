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
const dimSt = (t, id, op = .6, o = {}) => streetS(t, Object.assign({ id, cars: 0 }, o)) + `<rect width="720" height="1280" fill="#0a1028" opacity="${op}"/>`;
// ===================== "what if dragons were real?" (Short #31) =====================
const DDEF = `<pattern id="sclP" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M0,10 Q7,-2 14,10" fill="none" stroke="#0c2a18" stroke-width="1.6"/><path d="M-7,5 Q0,-7 7,5 M7,5 Q14,-7 21,5" fill="none" stroke="#0c2a18" stroke-width="1.2" opacity=".6"/><path d="M2,8 Q7,1 12,8" fill="none" stroke="#9fe0a8" stroke-width=".8" opacity=".5"/></pattern><linearGradient id="drSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient><linearGradient id="drM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8684a" stop-opacity=".95"/><stop offset=".6" stop-color="#9a3a2a" stop-opacity=".9"/><stop offset="1" stop-color="#5a1e1a" stop-opacity=".95"/></linearGradient><linearGradient id="drB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7a4a"/><stop offset=".55" stop-color="#2a5a3a"/><stop offset="1" stop-color="#c8b06a"/></linearGradient><linearGradient id="drW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b0503a"/><stop offset="1" stop-color="#6a2a22"/></linearGradient><radialGradient id="fbG2"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#fff0a0"/><stop offset=".75" stop-color="#ff9a2a" stop-opacity=".85"/><stop offset="1" stop-color="#ff4a1a" stop-opacity="0"/></radialGradient>`;
// a wyvern-style dragon seen from the side, facing +x. o: {flap (phase), legs4, fire 0..1, t, grey, walk}
function dragon(x, y, s, o = {}) {
  const fl = Math.sin(o.flap || 0), up = -70 - 60 * fl, c1 = o.grey ? '#7a7f88' : 'url(#drB)', cw = o.grey ? '#5a5f68' : 'url(#drM)', dk = o.grey ? '#4a4f58' : '#1e3f2a', fold = o.fold || 0;
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(o.face || 1) * s},${s}) rotate(${o.rot || 0})">`;
  const wing = (ox, back) => { const tipX = lerp(-40, -10, fold) + ox, tipY = lerp(up * 2.1, -40, fold), sh = back ? .7 : 1;
    return `<g opacity="${back ? .75 : 1}"><path d="M${ox},-30 L${ox + 30},${(up * .9 * sh).toFixed(1)} L${tipX + 150},${(tipY * sh).toFixed(1)} Q${tipX + 110},${(tipY * .55 * sh + 30).toFixed(1)} ${tipX + 70},${(tipY * .5 * sh + 60).toFixed(1)} Q${tipX + 30},${(tipY * .3 * sh + 40).toFixed(1)} ${tipX - 10},${(tipY * .3 * sh + 80).toFixed(1)} Q${tipX - 50},${(tipY * .15 * sh + 50).toFixed(1)} ${ox - 70},${(40 + 20 * fl).toFixed(1)} Z" fill="${cw}"/>` +
      [150, 70, -10].map(dx => `<path d="M${ox + 30},${(up * .9 * sh).toFixed(1)} L${tipX + dx},${((dx === 150 ? tipY : dx === 70 ? tipY * .5 + 60 : tipY * .3 + 80) * (dx === 150 ? sh : 1)).toFixed(1)}" stroke="${dk}" stroke-width="5" fill="none"/>`).join('') + [110, 30, -30].map(dx => `<path d="M${ox + 30},${(up * .9 * sh).toFixed(1)} Q${tipX + dx},${(tipY * .35 + 20).toFixed(1)} ${tipX + dx - 10},${(tipY * .32 + 66).toFixed(1)}" stroke="#3a120e" stroke-width="1.6" fill="none" opacity=".55"/>`).join('') + `<path d="M${ox},-30 L${ox + 30},${(up * .9 * sh).toFixed(1)}" stroke="${dk}" stroke-width="9" stroke-linecap="round"/><path d="M${ox + 2},-32 L${ox + 30},${(up * .9 * sh).toFixed(1)}" stroke="#fff" stroke-width="2" opacity=".3"/><circle cx="${ox + 30}" cy="${(up * .9 * sh).toFixed(1)}" r="6" fill="#e8e0c0"/></g>`; };
  g += wing(10, 1);
  // tail, body, neck
  g += `<path d="M-90,0 C-170,10 -230,-30 -290,10 C-240,0 -180,40 -90,30Z" fill="${c1}"/><path d="M-290,10 l-34,-18 l10,22 l-14,16Z" fill="${dk}"/>`;
  const lg = (lx, ph) => { const a = o.walk ? Math.sin((o.walk || 0) + ph) * 14 : 0; return `<path d="M${lx},20 L${lx + 10 + a},66 L${lx - 6 + a},104" stroke="${dk}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${lx - 6 + a},104 l26,4 M${lx - 6 + a},104 l22,-8" stroke="#e8e0c0" stroke-width="5" stroke-linecap="round"/>`; };
  g += lg(-50, 0) + (o.legs4 ? lg(70, 2) : '');
  g += `<ellipse cx="0" cy="0" rx="112" ry="52" fill="${c1}"/><path d="M-100,18 Q0,62 100,16 Q0,44 -100,18Z" fill="#e8d89a" opacity="${o.grey ? .2 : .7}"/>`;
  g += `<path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="${c1}"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${-60 + i * 34},${-50 + Math.abs(i - 2) * 3} l10,-22 l12,20Z" fill="${dk}"/>`).join('');
  if (!o.grey) g += `<g><path d="M-90,0 C-170,10 -230,-30 -290,10 C-240,0 -180,40 -90,30Z" fill="url(#sclP)" opacity=".55"/><ellipse cx="0" cy="0" rx="112" ry="52" fill="url(#sclP)" opacity=".55"/><path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="url(#sclP)" opacity=".55"/><ellipse cx="0" cy="0" rx="112" ry="52" fill="url(#drSh)"/><path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="url(#drSh)" opacity=".7"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${-84 + i * 26},${26 + Math.sin(i * .5) * 12} q13,10 26,0" stroke="#8a7a3a" stroke-width="2" fill="none" opacity=".7"/>`).join('') + `</g>`;
  g += lg(-30, 3.14) + (o.legs4 ? lg(90, 5) : '');
  // head
  g += `<g transform="translate(190,-146) rotate(${o.head || 0})"><path d="M-20,-22 C10,-34 60,-26 92,-8 L96,6 C60,12 20,22 -18,18Z" fill="${c1}"/><path d="M30,8 L94,6 L88,${(18 + 22 * (o.fire || o.jaw || 0)).toFixed(1)} C60,${(26 + 22 * (o.fire || o.jaw || 0)).toFixed(1)} 30,26 0,20Z" fill="${dk}"/>` +
    `<path d="M-14,-22 l-40,-34 l22,30Z M0,-26 l-22,-44 l30,36Z" fill="#e8e0c0"/><path d="M-20,-22 C10,-34 60,-26 92,-8 L96,6 C60,12 20,22 -18,18Z" fill="url(#sclP)" opacity="${o.grey ? 0 : .5}"/><path d="M6,-24 Q28,-30 44,-16" stroke="${dk}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="26" cy="-10" r="12" fill="#ffb02a" opacity=".3"/><circle cx="26" cy="-10" r="8" fill="#ffd23a"/><ellipse cx="27" cy="-10" rx="2.6" ry="7" fill="#1a1208"/><circle cx="80" cy="-6" r="3" fill="#1a1208"/>` + [40, 54, 68, 80].map(xx => `<path d="M${xx},7 l4,9 l4,-9Z" fill="#fff"/>`).join('') + `</g>`;
  g += wing(-10, 0);
  return g + `</g>`;
}
// fire jet from (x,y) along angle a (deg), length L
function fire(x, y, a, L, k, t) {
  if (k <= 0) return ''; let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a})" opacity="${Math.min(1, k * 1.5).toFixed(2)}">`;
  for (let i = 0; i < 5; i++) { const u = .65 + (i + pmod(t * 1.5, 1)) / 5 * .6, r = 30 + u * L * .22; s += `<ellipse cx="${(u * L * k).toFixed(1)}" cy="${(-u * 30 + Math.sin(t * 7 + i) * 10).toFixed(1)}" rx="${(r * 1.2).toFixed(1)}" ry="${r.toFixed(1)}" fill="#2a2422" opacity="${(.3 * (1.3 - u)).toFixed(2)}" filter="url(#blur9)"/>`; }
  for (let i = 0; i < 12; i++) { const u = (i + pmod(t * 3, 1)) / 12, r = 12 + u * L * .26, xx = u * L * k; s += `<ellipse cx="${xx.toFixed(1)}" cy="${(Math.sin(t * 20 + i * 2) * 9 * u).toFixed(1)}" rx="${(r * 1.35).toFixed(1)}" ry="${r.toFixed(1)}" fill="url(#fbG2)" opacity="${(1 - u * .65).toFixed(2)}"/>`; }
  s += `<path d="M0,-7 L${(L * k * .55).toFixed(1)},-3 L${(L * k * .55).toFixed(1)},3 L0,7Z" fill="#fffbe0" opacity=".9" filter="url(#blur2)"/>`;
  const r = RS(3); for (let i = 0; i < 16; i++) { const u = pmod(t * (1.2 + r()) + r(), 1); s += `<circle cx="${(u * L * k * 1.1).toFixed(1)}" cy="${((r() - .5) * 90 * u - 40 * u * u).toFixed(1)}" r="${(1.5 + r() * 2.5).toFixed(1)}" fill="#ffd27a" opacity="${(1 - u).toFixed(2)}"/>`; }
  return s + `</g>`;
}
function burnBld(t, svg, x0, x1, base, h0, h1, c, id) {
  if (c <= 0) return svg; const r = RS(id.length * 13 + 5); let pts = `-60,-60 ${x0},-60`, x = x0;
  while (x < x1) { const w = 12 + r() * 26, hh = h0 + (h1 - h0) * Math.pow(r(), 1.4), y = lerp(-60, base - hh, ease(clamp(c * 1.3 - r() * .3))); pts += ` ${x.toFixed(1)},${y.toFixed(1)} ${Math.min(x1, x + w * .6).toFixed(1)},${(y + (r() - .3) * 24 * c).toFixed(1)}`; x += w; }
  pts += ` ${x1},-60 780,-60 780,1340 -60,1340`;
  let s = `<defs><clipPath id="bb${id}"><polygon points="${pts}"/></clipPath><linearGradient id="bk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6fb8"/><stop offset=".6" stop-color="#93bbe2"/><stop offset="1" stop-color="#e0a070"/></linearGradient></defs><rect x="${x0}" y="-60" width="${x1 - x0}" height="${base + 60}" fill="url(#bk${id})"/><g clip-path="url(#bb${id})">${svg}</g>`;
  s += `<rect x="${x0}" y="${base - h1 - 40}" width="${x1 - x0}" height="${h1 + 40}" fill="#1a0e08" opacity="${(.35 * c).toFixed(2)}"/>`;
  const q = RS(id.length + 9); for (let i = 0; i < 22; i++) { const px = x0 + q() * (x1 - x0), sz = 4 + q() * 9, f = clamp(c * 1.3 - q() * .3), y0 = base - h1 - q() * 160, py = y0 + (base - y0) * f * f; s += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${sz.toFixed(1)}" height="${(sz * .7).toFixed(1)}" fill="${q() > .5 ? '#5a4a40' : '#8a7a6a'}" transform="rotate(${(f * 320 * (q() - .5)).toFixed(0)},${px.toFixed(1)},${py.toFixed(1)})"/>`; }
  for (let i = 0; i < 7; i++) { const fx = x0 + (i + .5) * (x1 - x0) / 7, fl = (50 + 40 * Math.sin(t * 9 + i * 1.7)) * c, fy = base - h0 - (h1 - h0) * q() * c; s += `<path d="M${(fx - 16).toFixed(1)},${fy.toFixed(1)} q10,${(-fl).toFixed(1)} 6,${(-fl * 1.7).toFixed(1)} q14,${(fl * .7).toFixed(1)} 16,${(fl * 1.7).toFixed(1)}Z" fill="url(#flameG)"/>`; }
  s += `<ellipse cx="${(x0 + x1) / 2}" cy="${base - h1 * .5}" rx="${(x1 - x0) * .9}" ry="${h1 * .9}" fill="url(#fireGlow)" opacity="${(.7 * c).toFixed(2)}"/>`;
  for (let j = 0; j < 9; j++) { const ph = pmod(t * .22 + j / 9, 1), w = 40 + ph * 130; s += `<ellipse cx="${((x0 + x1) / 2 + Math.sin(ph * 5 + j) * 30 + ph * 50).toFixed(1)}" cy="${(base - h1 - ph * 700).toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .7).toFixed(1)}" fill="#141010" opacity="${(.5 * c * Math.sin(Math.min(1, ph * 4) * 1.57)).toFixed(2)}" filter="url(#blur9)"/>`; }
  return s;
}
const skyBG = (id, a = '#3a6fb8', b = '#93bbe2', c = '#ebe3d0') => `<defs>${DEFB()}${DDEF}<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#${id})"/>`;
const field = (t, y0 = 860) => mountainsR(y0 + 10, 190, 12, { snow: .25 }) + meadow(y0, 1280, t);
// 0: a dragon flies over the city and breathes fire
function sceneHook(t) {
  const x = -200 + t * 250, y = 540 + Math.sin(t * 2) * 26, f = clamp(1 - Math.abs(t - 1.25) / .75), c = ease(ramp(t, 1.05, 2.7));
  let s = `<defs>${DDEF}</defs>` + burnBld(t, streetS(t, { id: 'h' }), 574, 760, 1000, 90, 240, c, 'h');
  [[120, 0, 1], [330, 2, -1], [470, 1, 1]].forEach(([x0, cc, fc], i) => { const run = t > 1.3 ? 1 : 0, xx = x0 - 150 * Math.max(0, t - 1.3); s += castSh(xx, 1090, .52) + onWalk(xx, 1090, CROWD[cc], .52, run ? -1 : fc, t, run ? { moving: 1, phase: t * 12, amp: .9 } : { lookUp: ease(ramp(t, .2, .6)) }); });
  s += `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.16 * f).toFixed(2)}"/><ellipse cx="${x.toFixed(1)}" cy="1120" rx="170" ry="26" fill="#000" opacity=".22" filter="url(#blur9)"/>` + dragon(x, y, .75, { flap: t * 9, fire: f, head: 20 }) + fire(x + 200, y - 66, 30, 420, f, t);
  noEarth(); F.ov = ''; return s;
}
// 1: no giants: the largest flying animal ever had an 11 m wingspan and weighed about 250 kg
function sceneSize(t) {
  const a1 = ease(ramp(t, WS(1, 2) - .1, WS(1, 3) + .2)), x1 = ease(ramp(t, WS(1, 3), WS(1, 3) + .4)), a2 = ease(ramp(t, WS(1, 4), WS(1, 6))), aw = ease(ramp(t, WS(1, 11), WS(1, 14))), am = ease(ramp(t, WS(1, 15), WS(1, 17)));
  let s = skyBG('sz') + cumulus(200, 430, 220, 3, { a: .8 }) + field(t, 900);
  s += `<g opacity="${(a1 * (1 - .75 * ease(ramp(t, WS(1, 4), WS(1, 5))))).toFixed(2)}">` + dragon(330, 640, 1.25, { grey: 1, flap: 1.2 }) + `<g opacity="${x1}"><path d="M180,470 L500,800 M500,470 L180,800" stroke="#ff4a3a" stroke-width="16" stroke-linecap="butt"/></g></g>`;
  s += `<g opacity="${a2.toFixed(2)}">` + dragon(380, 860, .42, { flap: t * 5 }) + person(170, 1010, Object.assign({ s: .3, face: 1, t }, YOU)) + `</g>`;
  s += `<g opacity="${aw.toFixed(2)}"><path d="M250,1010 H520 M250,996 v28 M520,996 v28" stroke="#fff" stroke-width="4" fill="none"/>` + lbl(385, 1062, '١١ متراً', 1, '#f4c76b', 34) + `</g>` + `<g opacity="${am.toFixed(2)}">` + panel(230, 1110, 260, 80) + lbl(360, 1164, '≈ ٢٥٠ كغ', 1, '#fff', 34) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 2: four limbs only: wings are arms
function sceneLimbs(t) {
  const a1 = ease(ramp(t, WS(2, 2) - .2, WS(2, 4))), x1 = ease(ramp(t, WS(2, 5), WS(2, 5) + .4)), a2 = ease(ramp(t, WS(2, 8), WS(2, 10))), ok = ease(ramp(t, WS(2, 11), WS(2, 13)));
  let s = dimSt(t, 'l', .72) + `<defs>${DDEF}</defs>`;
  s += `<g opacity="${a1.toFixed(2)}">` + panel(40, 400, 640, 330) + dragon(330, 590, .62, { legs4: 1, flap: .6 }) + lbl(360, 716, '٦ أطراف', 1, '#ffc2b8', 30) + `<g opacity="${x1}"><path d="M560,430 l70,70 M630,430 l-70,70" stroke="#ff4a3a" stroke-width="14"/></g></g>`;
  s += `<g opacity="${a2.toFixed(2)}">` + panel(40, 770, 640, 360) + dragon(330, 980, .62, { flap: .6 }) + lbl(360, 1116, '٤ أطراف: الجناحُ ذراع', 1, '#b8f0c0', 30) + `<g opacity="${ok}"><path d="M556,840 l26,28 l52,-60" stroke="#4ad06a" stroke-width="14" fill="none"/><path d="M340,950 L360,880 L480,${(820).toFixed(0)}" stroke="#f4c76b" stroke-width="7" fill="none" stroke-dasharray="10 8"/></g></g>`;
  noEarth(); F.ov = ''; return s;
}
// 3: fire is possible: cows burp methane every day; a dragon that stores it only needs a spark
function sceneFire(t) {
  const st = S0(3) - .2, T = t - st, cut = WS(3, 9) - .15;
  let s = skyBG('fr') + cumulus(520, 420, 200, 4, { a: .8 });
  if (t < cut) { s += field(t, 880) + quad(250, 1060, 1.5, { kind: 'cow', face: 1 }) + quad(520, 990, 1.0, { kind: 'cow', face: -1, graze: 1 });
    for (let i = 0; i < 7; i++) { const p = pmod(T * .45 + i / 7, 1), a = ease(ramp(t, WS(3, 3), WS(3, 5))); s += `<g opacity="${(a * (1 - p)).toFixed(2)}"><circle cx="${(370 + p * 120 + Math.sin(i + T) * 14).toFixed(1)}" cy="${(950 - p * 330).toFixed(1)}" r="${(16 + p * 20).toFixed(1)}" fill="#cfe8ff" opacity=".45" stroke="#fff" stroke-width="2"/></g>`; }
    s += lbl(430, 640, 'ميثان CH₄', ease(ramp(t, WS(3, 5), WS(3, 6) + .2)), '#dff0ff', 34); }
  else { const u = t - cut, sp = clamp(1 - Math.abs(u - .9) / .25), f = ease(ramp(u, 1.0, 1.5)); s += field(t, 940) + dragon(210, 900, .95, { fold: 1, fire: f, jaw: .6, head: -6 });
    s += `<ellipse cx="250" cy="880" rx="60" ry="30" fill="#cfe8ff" opacity="${(.35 * (1 - f)).toFixed(2)}"/>` + (sp > 0 ? `<path d="M476,770 l14,-22 l4,18 l20,-10 l-12,20 l20,6 l-22,6 l8,20 l-18,-12 l-10,18Z" fill="#fff6a0" opacity="${sp.toFixed(2)}"/>` : '') + fire(478, 772, -4, 300, f, t);
    s += lbl(250, 1150, 'شرارة + ميثان = نار', ease(ramp(u, 1.2, 1.6)), '#ffe4a0', 34); }
  noEarth(); F.ov = ''; return s;
}
// 4: to fly it needs hollow, light bones like a bird's, and huge chest muscles
function sceneFly(t) {
  const ab = ease(ramp(t, WS(4, 3) - .1, WS(4, 5))), am = ease(ramp(t, WS(4, 8), WS(4, 10)));
  let s = skyBG('fl') + cumulus(180, 420, 210, 7, { a: .8 }) + cumulus(560, 560, 160, 2, { a: .7 }) + field(t, 980);
  s += `<ellipse cx="330" cy="1100" rx="150" ry="20" fill="#000" opacity=".2" filter="url(#blur9)"/>` + dragon(330, 760, .95, { flap: t * 6 });
  s += `<g opacity="${am.toFixed(2)}"><ellipse cx="372" cy="772" rx="52" ry="34" fill="#e0483a" opacity=".75"/>` + [0, 1, 2, 3].map(i => `<path d="M${336 + i * 16},750 q14,22 4,44" stroke="#8a1e16" stroke-width="3" fill="none"/>`).join('') + lbl(470, 900, 'عضلاتُ الطيران', 1, '#ffc2b8', 28) + `<path d="M400,800 L440,872" stroke="#ffc2b8" stroke-width="3"/></g>`;
  s += `<g opacity="${ab.toFixed(2)}">` + panel(40, 400, 280, 250) + `<ellipse cx="180" cy="508" rx="96" ry="70" fill="#efe6cf" stroke="#b8a878" stroke-width="5"/><ellipse cx="180" cy="508" rx="76" ry="52" fill="#141a30"/>` + [[-60, -30, 50, 36], [-20, -50, 30, 48], [40, -44, -30, 46], [66, -12, -64, 20]].map(([a, b, c2, d]) => `<path d="M${180 + a},${508 + b} L${180 + c2},${508 + d}" stroke="#efe6cf" stroke-width="6" stroke-linecap="butt"/>`).join('') + lbl(180, 624, 'عظمٌ مجوَّف', 1, '#ffe4a0', 28) + `<path d="M300,560 L270,700" stroke="#f4c76b" stroke-width="3" stroke-dasharray="6 6"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// 4: a one-tonne dragon needs about a sheep of meat every day (Kleiber's law)
function sceneFood(t) {
  const st = S0(5) - .2, T = t - st, n = Math.min(7, Math.floor(ramp(t, WS(5, 4), S0(6) - .4) * 7.99));
  let s = skyBG('fd') + cumulus(180, 400, 200, 6, { a: .8 }) + field(t, 880) + dragon(190, 960, .8, { fold: 1, jaw: .3 + .3 * Math.abs(Math.sin(T * 6)), head: 14 });
  for (let i = 0; i < 7; i++) { const gone = i < n; s += `<g opacity="${gone ? .15 : 1}">` + sheep(380 + (i % 4) * 86 + (i > 3 ? 40 : 0), 1040 + Math.floor(i / 4) * 110, .9, i % 2) + `</g>`; }
  s += panel(400, 440, 270, 150) + lbl(535, 492, 'اليوم', 1, '#cfd8ff', 24) + lbl(535, 562, AR(Math.max(1, n)), 1, '#f4c76b', 60);
  noEarth(); F.ov = ''; return s;
}
// 5: closed airports, fire-proof roofs
function sceneCity(t) {
  const st = S0(6) - .2, T = t - st, x = 860 - T * 190, y = 470 + Math.sin(T * 2) * 22, k = ease(ramp(t, WS(6, 2), WS(6, 4) + .3)), f = clamp(1 - Math.abs(T - 1.5) / .8), c = ease(ramp(T, 1.4, 3.4));
  let s = `<defs>${DDEF}</defs>` + burnBld(t, streetS(t, { id: 'c', cars: 0 }), 284, 448, 1000, 100, 300, c, 'c');
  s += `<g opacity="${k.toFixed(2)}">` + [[-10, 696, 158], [148, 628, 136], [448, 762, 126], [574, 682, 160]].map(([bx, by, w]) => `<path d="M${bx - 6},${by + 4} L${bx + w / 2},${by - 46} L${bx + w + 6},${by + 4}Z" fill="#7a8088"/><path d="M${bx - 6},${by + 4} L${bx + w / 2},${by - 46} L${bx + w / 2},${by + 4}Z" fill="#fff" opacity=".2"/>` + [0, 1, 2, 3].map(i => `<path d="M${bx + w * .1 + i * w * .26},${by + 2} l${w * .06},-14" stroke="#4a5058" stroke-width="2"/>`).join('')).join('') + `</g>`;
  s += `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.14 * f).toFixed(2)}"/>` + dragon(x, y, .62, { flap: t * 9, face: -1, fire: f, head: 16 }) + `<g transform="translate(${(x - 124).toFixed(1)},${(y - 55).toFixed(1)}) scale(-1,1)">` + fire(0, 0, 32, 360, f, t) + `</g>`;
  const a = ease(ramp(t, WS(6, 0), WS(6, 1))) * (1 - ease(ramp(t, WS(6, 2), WS(6, 2) + .3)));
  s += `<g opacity="${a.toFixed(2)}">` + panel(170, 1010, 380, 150) + `<path d="M230,1085 l70,-22 l-10,22 l10,22Z M300,1076 l40,-30 M300,1094 l40,30" stroke="#dfe6ff" stroke-width="8" fill="#dfe6ff"/><path d="M214,1040 l110,90 M324,1040 l-110,90" stroke="#ff4a3a" stroke-width="9"/>` + lbl(440, 1100, 'المطارُ مغلق', 1, '#ffc2b8', 30) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 6: the dragon is real: the Komodo dragon, about 3 m long, with a venomous bite
function komodo(x, y, s, t) {
  const w = Math.sin(t * 5), tg = clamp(Math.sin(t * 4) * 2);
  const leg = (lx, ph) => { const a = Math.sin(t * 5 + ph) * 16; return `<path d="M${lx},10 L${lx + 14 + a},44 L${lx + 30 + a},56" stroke="#5a5444" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${lx + 30 + a},56 l16,2 M${lx + 30 + a},56 l14,-6" stroke="#2a2620" stroke-width="4" stroke-linecap="round"/>`; };
  return `<g transform="translate(${x.toFixed(1)},${y}) scale(${s})">` + `<ellipse cx="0" cy="62" rx="250" ry="14" fill="#000" opacity=".25"/>` + leg(-70, 0) + leg(80, 3.14) +
    `<path d="M-110,0 C-200,${6 + w * 6} -280,${20 - w * 10} -350,${44 + w * 8} C-270,${36 - w * 8} -190,34 -110,30Z" fill="#6a6450"/><ellipse cx="0" cy="8" rx="130" ry="40" fill="#7a745e"/><path d="M-120,22 Q0,56 120,20 Q0,40 -120,22Z" fill="#b8ae8a" opacity=".6"/>` +
    `<path d="M100,-14 C150,-30 190,-30 232,-22 L262,-8 C264,4 250,12 226,14 C180,18 140,20 104,30Z" fill="#7a745e"/><circle cx="214" cy="-10" r="5" fill="#1a1208"/><path d="M196,8 L258,2" stroke="#3a3428" stroke-width="3"/>` +
    `<path d="M262,-2 L${(262 + 44 * tg).toFixed(1)},-6 l${(12 * tg).toFixed(1)},-8 M${(262 + 44 * tg).toFixed(1)},-6 l${(12 * tg).toFixed(1)},6" stroke="#e86a7a" stroke-width="4" fill="none" stroke-linecap="round"/>` + `<ellipse cx="0" cy="8" rx="130" ry="40" fill="#000" filter="url(#grainR)" opacity=".4"/>` + leg(-40, 3.14) + leg(110, 0) + `</g>`;
}
function sceneKomodo(t) {
  const st = S0(7) - .2, T = t - st, x = 200 + T * 26, al = ease(ramp(t, WS(7, 6), WS(7, 8)));
  let s = skyBG('km', '#2a6aa8', '#8ac4e0', '#f4e0b0') + cumulus(200, 400, 220, 2, { a: .85 }) + `<rect y="760" width="720" height="120" fill="#2a7aa8"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M${pmod(i * 97 + T * 20, 780) - 30},${770 + (i % 5) * 20} q20,-5 40,0" stroke="#dff0ff" stroke-width="2.5" fill="none" stroke-opacity=".5"/>`).join('') +
    `<path d="M-20,800 Q200,760 380,790 T740,770 L740,880 L-20,880Z" fill="#3a6a3a"/>` + forestR(840, 12, 110, 190, 5, '#2a5a2a', {}) + `<path d="M-20,880 Q240,850 420,875 T740,865 L740,1300 L-20,1300Z" fill="#e8d4a0"/><rect y="880" width="720" height="400" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += komodo(x, 1060, .95, t) + `<g opacity="${al.toFixed(2)}"><path d="M${(x - 330).toFixed(0)},1180 H${(x + 250).toFixed(0)} M${(x - 330).toFixed(0)},1166 v28 M${(x + 250).toFixed(0)},1166 v28" stroke="#fff" stroke-width="4" fill="none"/>` + lbl(x - 40, 1232, '٣ أمتار', 1, '#f4c76b', 34) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(8)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSize }, { s: S0(2) - .2, f: sceneLimbs }, { s: S0(3) - .2, f: sceneFire }, { s: S0(4) - .2, f: sceneFly }, { s: S0(5) - .2, f: sceneFood }, { s: S0(6) - .2, f: sceneCity }, { s: S0(7) - .2, f: sceneKomodo }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSize, sceneLimbs, sceneFire, sceneFly, sceneFood, sceneKomodo]);
const XF = .5;
const TLI = [['ليس عملاقاً', S0(1)], ['أربعةُ أطراف', S0(2)], ['نارٌ حقيقيّة', S0(3)], ['عظامٌ خفيفة', S0(4)]];
const LIST_ON = new Set([sceneFire, sceneFly]);
const CHIPS = [
  ['c1', 'أكبرُ طائرٍ في التاريخ', 360, 330, 'big', WS(1, 5), S0(2) - .3], ['c2', 'الجناحُ = ذراع', 360, 330, 'big', WS(2, 11), S0(3) - .3], ['c3', 'النارُ ممكنة!', 360, 330, 'red', WS(3, 2), S0(4) - .3], ['c3b', 'خفيفٌ وقويّ', 360, 330, 'big', WS(4, 5), S0(5) - .3],
  ['c4', 'خروفٌ كلَّ يوم', 360, 330, 'big', WS(5, 6), S0(6) - .3], ['c5', 'أسقفٌ لا تحترق', 360, 330, 'big', WS(6, 4), S0(7) - .3], ['c6', 'تنّينُ كومودو', 360, 330, 'big', WS(7, 4), S0(8) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">تنانين</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
function sheep(x, y, s, graze) {
  const r = RS(Math.round(x)); let w = ''; for (let i = 0; i < 12; i++) w += `<circle cx="${(-30 + (i % 6) * 12 + r() * 4).toFixed(1)}" cy="${(-44 + Math.floor(i / 6) * 16 + r() * 4).toFixed(1)}" r="14" fill="#f4f0e6"/>`;
  return `<g transform="translate(${x},${y}) scale(${-s},${s})"><ellipse cx="0" cy="2" rx="44" ry="6" fill="#000" opacity=".25"/>` + [-22, -10, 14, 26].map(lx => `<rect x="${lx}" y="-22" width="7" height="24" fill="#2a2420"/>`).join('') + `<ellipse cx="0" cy="-36" rx="40" ry="24" fill="#e8e2d4"/>${w}<g transform="rotate(${graze ? 40 : 0},38,-40)"><ellipse cx="50" cy="-46" rx="15" ry="12" fill="#2a2420"/><ellipse cx="42" cy="-56" rx="6" ry="4" fill="#2a2420"/><circle cx="54" cy="-49" r="2" fill="#fff"/></g></g>`;
}
