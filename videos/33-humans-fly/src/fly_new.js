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
// ===================== "what if all humans could fly?" (Short #33) =====================
const WCOL = [['#f1ece0', '#6a5a48'], ['#9a7652', '#3a2a1e'], ['#cdd2da', '#3e4654'], ['#4a4a56', '#17171c'], ['#e4cfa6', '#6a4a2a']];
const FDEF = `<linearGradient id="fSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa6c8"/><stop offset=".3" stop-color="#2f6f9c"/><stop offset="1" stop-color="#123a5c"/></linearGradient>` +
  `<linearGradient id="busG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#eef1f4"/><stop offset="1" stop-color="#bfc6cf"/></linearGradient>` +
  `<radialGradient id="plG" cx=".4" cy=".35"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#ebe7df"/><stop offset="1" stop-color="#c4beb0"/></radialGradient>` +
  `<radialGradient id="mscG"><stop offset="0" stop-color="#ff7a66"/><stop offset=".75" stop-color="#d8362a"/><stop offset="1" stop-color="#a01c14"/></radialGradient>` +
  `<radialGradient id="sunF"><stop offset="0" stop-color="#fffdf0" stop-opacity=".95"/><stop offset=".3" stop-color="#ffe9b0" stop-opacity=".45"/><stop offset="1" stop-color="#ffe0a0" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="podG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".85"/><stop offset=".5" stop-color="#dfeaf6" stop-opacity=".5"/><stop offset="1" stop-color="#9fb6cc" stop-opacity=".6"/></linearGradient>` +
  `<linearGradient id="wngG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f3cfd6"/></linearGradient>`;
const skyF = (id, a = '#3a6fb8', b = '#93bbe2', c = '#ebe3d0') => `<defs>${DEFB()}${FDEF}<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#${id})"/>`;
// ---------- feathers and wings ----------
function leaf(bx, by, dx, dy, len, hw, col) {
  const mx = bx + dx * len * .5, my = by + dy * len * .5, tx = bx + dx * len, ty = by + dy * len, nx = -dy * hw, ny = dx * hw;
  return `<path d="M${bx.toFixed(1)},${by.toFixed(1)} Q${(mx + nx).toFixed(1)},${(my + ny).toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)} Q${(mx - nx).toFixed(1)},${(my - ny).toFixed(1)} ${bx.toFixed(1)},${by.toFixed(1)}Z" fill="${col}"/>`;
}
// a feathered wing: root (rx,ry), spar unit (ux,uy), trailing unit (vx,vy), length Ls (root to tip). o: {col, tip, n, back, bend}
function wingUV(rx, ry, ux, uy, vx, vy, Ls, o = {}) {
  const n = o.n || 13, col = o.col || WCOL[0][0], tip = o.tip || WCOL[0][1], C = c => o.back ? mix(c, '#141a26', .3) : c, det = Ls > 120, bend = o.bend ?? .34, W = .42;
  const cb = Math.cos(bend), sb = Math.sin(bend), hx = ux * cb + vx * sb, hy = uy * cb + vy * sb, wx = rx + ux * Ls * W, wy = ry + uy * Ls * W;
  const SP = q => q <= W ? [rx + ux * Ls * q, ry + uy * Ls * q] : [wx + hx * Ls * (q - W), wy + hy * Ls * (q - W)];
  const nrm = (x, y) => { const k = Math.hypot(x, y) || 1; return [x / k, y / k]; };
  let s = '';
  for (let i = n - 1; i >= 0; i--) { const p = i / (n - 1), prim = p > .5, e = prim ? (p - .5) / .5 : 0, [bx, by] = SP(prim ? W + e * .2 : p / .5 * W), k = Math.pow(e, 1.15) * .96;
    const [dx, dy] = nrm(lerp(vx, hx, k) + ux * .12 * (1 - e), lerp(vy, hy, k) + uy * .12 * (1 - e)), len = Ls * (.27 + .15 * e + .015 * Math.sin(i * 2.1)), hw = len * (prim ? lerp(.2, .13, e) : .22);
    s += leaf(bx, by, dx, dy, len, hw * .9, C(mix(col, tip, prim ? .92 : .5))) + leaf(bx, by, dx, dy, len * (prim ? lerp(.8, .6, e) : .85), hw, C(mix(col, tip, .05 + .09 * (i % 2))));
    if (det) s += `<path d="M${bx.toFixed(1)},${by.toFixed(1)} L${(bx + dx * len * .9).toFixed(1)},${(by + dy * len * .9).toFixed(1)}" stroke="${C(mix(col, '#ffffff', .5))}" stroke-width="1" opacity=".4"/>`; }
  const m = n + 2, Q = W + .21;
  for (let i = m - 1; i >= 0; i--) { const q = Q * i / (m - 1), [bx, by] = SP(q), al = q <= W ? [ux, uy] : [hx, hy], [dx, dy] = nrm(vx + al[0] * .4, vy + al[1] * .4), len = Ls * (.15 + .015 * Math.sin(i * 1.7)); s += leaf(bx, by, dx, dy, len, len * .36, C(mix(col, tip, i % 2 ? .2 : .13))); }
  for (let i = m - 1; i >= 0; i--) { const q = Q * i / (m - 1), [bx, by] = SP(q), al = q <= W ? [ux, uy] : [hx, hy], [dx, dy] = nrm(vx + al[0] * .5, vy + al[1] * .5), len = Ls * .085; s += leaf(bx, by, dx, dy, len, len * .5, C(mix(col, '#ffffff', i % 2 ? .2 : .4))); }
  const [ex, ey] = SP(Q + .02), lw = Math.max(2, Ls * .036), d = `M${rx.toFixed(1)},${ry.toFixed(1)} L${wx.toFixed(1)},${wy.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}`;
  return s + `<path d="${d}" stroke="${C(mix(col, '#ffffff', .3))}" stroke-width="${lw.toFixed(1)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="${d}" stroke="${C(mix(col, '#000000', .25))}" stroke-width="1" fill="none" opacity=".35" transform="translate(${(vx * lw * .5).toFixed(1)},${(vy * lw * .5).toFixed(1)})"/>`;
}
function wingDir(th, f, back) {
  const c = Math.cos(th), sn = Math.sin(th), z = back ? -1 : 1, x = (-.2 - .16 * c * z) * f, y = -sn - .2 * c * z, k = Math.hypot(x, y) || 1;
  const ux = x / k, uy = y / k, b = .17 - clamp(uy * 2.2, -1, 1) * .8 * Math.abs(ux), n = Math.hypot(1, b);
  return [ux, uy, -f / n, b / n, Math.max(k, back ? .5 : .64)];
}
// a flying person: hip at (hx,hy), body prone, arms inside the wings. o: {face, pitch(deg), flap(phase), th, w(wing colours), c(palette), n, L}
function flyer(hx, hy, s, o = {}) {
  const f = o.face || 1, pitch = o.pitch ?? 8, rotD = f * (90 - pitch), a = rotD * Math.PI / 180, c = o.c || YOU, wc = WCOL[o.w ?? 0];
  const th = o.th ?? (.55 + .55 * Math.sin(o.flap || 0)), L = (o.L || 590) * s;
  const px = 2 * f * s, py = -98 * s, sx = hx + px * Math.cos(a) - py * Math.sin(a), sy = hy + px * Math.sin(a) + py * Math.cos(a);
  const [ux, uy, vx, vy, k] = wingDir(th, f, 0), [bx, by, cx, cy, kb] = wingDir(th * .9 + .1, f, 1), kick = Math.sin((o.flap || 0) * .5) * .05;
  const body = hero(hx, hy + 150 * s, Object.assign({ s, face: f, rot: rotD, pv: -150 * s, hipY: -150, lF: [.07 + kick, .16 + kick], lB: [-.05 - kick, .05 - kick], hF: [sx + ux * 112 * s, sy + uy * 112 * s], hB: [hx + (sx - hx) * .35, hy + (sy - hy) * .35], noShadow: 1, air: 1, shade: 1, lookUp: 1.6 }, { top: c.top, pants: c.pants, skin: c.skin, hair: c.hair }));
  return wingUV(sx + 8 * f * s, sy - 4 * s, bx, by, cx, cy, L * kb, { col: wc[0], tip: wc[1], back: 1, n: o.n }) + body + wingUV(sx, sy, ux, uy, vx, vy, L * k, { col: wc[0], tip: wc[1], n: o.n });
}
// the house person on the ground: the folded wings are the arms
function wperson(x, y, c, s, face, t, o = {}) {
  const wc = WCOL[o.w ?? 0], f = face, sx = x + 2 * f * s, sy = y - 246 * s, L = 232 * s;
  const fw = (dx, back) => wingUV(sx + dx * f * s, sy, -.1 * f, .995, -.45 * f, .89, L, { col: wc[0], tip: wc[1], back, n: 9, bend: .05 });
  return fw(-14, 1) + onWalk(x, y, c, s, face, t, o) + fw(0, 0);
}
// ---------- the street of this video: new front row, new shops, roofs that can take doors ----------
const ROOFS = [[-12, 150, 390], [138, 150, 290], [288, 130, 350], [418, 150, 420], [568, 166, 262]];
const SHOPF = [[-4, 146, 'مخبز', '#b0502a'], [154, 124, 'أزهار', '#9a3a6a'], [290, 152, 'مطعم', '#2a6a5a'], [452, 116, 'هواتف', '#3a4a8a'], [580, 148, 'ملابس', '#7a5a2a']];
function shopRowF(PV) {
  let s = '';
  SHOPF.forEach(([sx, sw, name, c], i) => { const r = RS(i + 161), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${(PV - 14 - bh).toFixed(1)}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/><rect x="${gx + gw - dw + 5}" y="${PV - 42}" width="3" height="14" fill="#d8d8d8"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`; });
  return s;
}
// a door on the roof with a landing deck and a windsock
function roofDoor(x, top, w, k, t, i) {
  if (k <= 0) return ''; const cx = x + w * (i % 2 ? .3 : .68), px = x + w * (i % 2 ? .72 : .26), sw = Math.sin(t * 3 + i) * 4;
  return `<g opacity="${k.toFixed(2)}"><rect x="${x + 4}" y="${top - 13}" width="${w - 8}" height="7" fill="#4a5058"/><rect x="${x + 4}" y="${top - 13}" width="${w - 8}" height="2.5" fill="#f4c76b"/>` + Array.from({ length: Math.floor((w - 8) / 22) }, (_, q) => `<rect x="${x + 8 + q * 22}" y="${top - 13}" width="10" height="2.5" fill="#22262c"/>`).join('') +
    `<rect x="${cx - 24}" y="${top - 74}" width="48" height="62" fill="#ddd6c6"/><rect x="${cx + 12}" y="${top - 74}" width="12" height="62" fill="#000" opacity=".18"/><rect x="${cx - 28}" y="${top - 80}" width="56" height="8" fill="#8a4a3a"/><rect x="${cx - 28}" y="${top - 72}" width="56" height="3" fill="#000" opacity=".25"/>` +
    `<rect x="${cx - 12}" y="${top - 60}" width="24" height="47" rx="2" fill="#2f6f9a"/><rect x="${cx - 9}" y="${top - 56}" width="18" height="16" fill="#bfe0f4" opacity=".7"/><circle cx="${cx + 7}" cy="${top - 34}" r="2" fill="#f4e0a0"/>` +
    `<path d="M${px},${top - 13} v-56" stroke="#3a3e46" stroke-width="2.6"/><path d="M${px},${top - 68} l${26 + sw},${4 + sw * .4} l0,9 l${-26 - sw},${3 - sw * .4}Z" fill="#f08a2a"/><path d="M${px + 9},${top - 66} v13 M${px + 18},${top - 64.5} v11" stroke="#fff" stroke-width="3" opacity=".8"/></g>`;
}
// o: {id, sky, cars, storm, roof (0..1 roof doors)}
function streetF(t, o = {}) {
  const sky = o.sky || ['#346cb8', '#8fbbe4', '#ece4d2'], PV = 1000, KB = 1104, id = o.id || 'q';
  let s = skyF('sk' + id, sky[0], sky[1], sky[2]);
  if (!o.storm) s += `<circle cx="560" cy="455" r="150" fill="#fff6d0" opacity=".28" filter="url(#soft)"/><circle cx="560" cy="455" r="30" fill="#fffdf2"/>` + cumulus(170 + t * 1.2, 440, 230, 13, { a: .9 }) + cumulus(420 + t * .8, 560, 170, 15, { a: .85 }) + cumulus(640 + t, 350, 120, 19, { a: .6 });
  s += farCity(47, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`;
  s += officeGlass(ROOFS[0][0], PV, ROOFS[0][1], ROOFS[0][2], 311) + aptBrick(ROOFS[1][0], PV, ROOFS[1][1], ROOFS[1][2], '#c2a078', 312, { bands: 1, roof: o.roof ? 0 : 1 }) + bldg(ROOFS[2][0], PV, ROOFS[2][1], ROOFS[2][2], '#d6cdbb', 9, .12) + (o.roof ? '' : roofKit(ROOFS[2][0], PV - ROOFS[2][2], ROOFS[2][1], 5)) +
    aptBrick(ROOFS[3][0], PV, ROOFS[3][1], ROOFS[3][2], '#9a5a48', 315, { balShift: 1, roof: o.roof ? 0 : 1 }) + bldg(ROOFS[4][0], PV, ROOFS[4][1], ROOFS[4][2], '#b9c4cc', 14, .12) + (o.roof ? '' : roofKit(ROOFS[4][0], PV - ROOFS[4][2], ROOFS[4][1], 8));
  if (o.roof) ROOFS.forEach(([x, w, h], i) => { s += roofDoor(x, PV - h, w, o.roof, t, i); });
  s += shopRowF(PV) + `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  s += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#cdc2ae"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e8e4d8"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  s += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4e4e54"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 100}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<ellipse cx="420" cy="1238" rx="26" ry="7" fill="#3c3c42"/><ellipse cx="420" cy="1238" rx="26" ry="7" fill="none" stroke="#2a2a2e" stroke-width="2"/>`;
  [[250, PV + 18], [540, PV + 18]].forEach(([px, py], i) => { s += `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#7a8088"/><rect x="${px - 30}" y="${py - 14}" width="60" height="5" rx="2" fill="#fff" opacity=".2"/><rect x="${px - 26}" y="${py + 8}" width="62" height="5" fill="#000" opacity=".22"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${px - 24 + q * 8},${py - 12} q${q % 2 ? 4 : -4},-18 ${q % 2 ? 2 : -2},-30" stroke="#4a8a2a" stroke-width="3.5" fill="none"/><circle cx="${px - 24 + q * 8 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#f08a3a', '#fff', '#c84a8a'][(q + i) % 3]}"/>`).join(''); });
  [[40, 280, 23], [366, 250, 27], [668, 290, 29]].forEach(([px, h, sd]) => { const py = PV + 60; s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + (o.storm ? '' : `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity=".22" filter="url(#blur2)"/>`) + treeR(px, py - 2, h, sd, t * (o.storm ? 5 : 1)); });
  [150, 470].forEach(lx => { s += lampPost(lx, PV + 80, 250, o.storm ? 1 : 0); });
  if (o.cars !== 0) s += car(150, 1168, .95, '#3a6a9a', 1, 0) + car(pmod(900 - t * 70, 1100) - 180, 1256, .9, '#d8d8dc', -1, 0);
  return s;
}
// a 7-metre minibus seen from the side, facing right. (x, y) = rear end, where the tyres touch
function minibus(x, y, L, roll = 0) {
  const H = L * .33, r = L * .056, by = y - r * .8, top = by - H, wy = top + H * .15, wh = H * .37, n = 5, wx0 = x + L * .05, ww = L * .74 / n;
  const wheel = cx => `<path d="M${cx - r * 1.35},${by} A${r * 1.35},${r * 1.35} 0 0 1 ${cx + r * 1.35},${by}Z" fill="#23262c"/><circle cx="${cx}" cy="${y - r}" r="${r}" fill="#1a1a1c"/><circle cx="${cx}" cy="${y - r}" r="${r * .56}" fill="#a4aab2"/><circle cx="${cx}" cy="${y - r}" r="${r * .2}" fill="#4a4e56"/>` + [0, 1, 2, 3, 4].map(q => { const a = roll + q * 1.2566; return `<path d="M${cx},${y - r} l${(Math.cos(a) * r * .5).toFixed(1)},${(Math.sin(a) * r * .5).toFixed(1)}" stroke="#5a5e66" stroke-width="3"/>`; }).join('');
  let s = `<ellipse cx="${x + L / 2}" cy="${y + 2}" rx="${L * .53}" ry="11" fill="#000" opacity=".32" filter="url(#blur2)"/>`;
  const body = `M${x + 16},${top} H${x + L * .86} Q${x + L * .945},${top + 2} ${x + L * .972},${top + H * .5} L${x + L},${top + H * .63} V${by - 12} Q${x + L},${by} ${x + L - 12},${by} H${x + 10} Q${x},${by} ${x},${by - 10} V${top + 16} Q${x},${top} ${x + 16},${top}Z`;
  s += `<path d="${body}" fill="url(#busG)"/><rect x="${x + L * .2}" y="${top - 12}" width="${L * .3}" height="13" rx="4" fill="#cfd4da"/><rect x="${x + L * .2}" y="${top - 3}" width="${L * .3}" height="4" fill="#000" opacity=".2"/>`;
  s += `<rect x="${x}" y="${top + H * .64}" width="${L}" height="${H * .09}" fill="#2a6ab0"/><rect x="${x}" y="${top + H * .73}" width="${L}" height="${H * .025}" fill="#f4c76b"/><path d="M${x + 4},${by - H * .12} H${x + L - 4} V${by - 4} H${x + 4}Z" fill="#000" opacity=".12"/>`;
  for (let i = 0; i < n; i++) { const wx = wx0 + i * ww; s += `<rect x="${(wx + 3).toFixed(1)}" y="${wy}" width="${(ww - 6).toFixed(1)}" height="${wh}" rx="6" fill="#3a5068"/><path d="M${(wx + 3).toFixed(1)},${wy + wh * .8} L${(wx + 3).toFixed(1)},${wy + 4} L${(wx + ww * .45).toFixed(1)},${wy + 1} L${(wx + ww * .2).toFixed(1)},${wy + wh * .8}Z" fill="#cfe6f8" opacity=".22"/>` + (i % 2 ? `<ellipse cx="${(wx + ww * .55).toFixed(1)}" cy="${wy + wh * .74}" rx="${ww * .13}" ry="${wh * .24}" fill="#1c2836"/><rect x="${(wx + ww * .36).toFixed(1)}" y="${wy + wh * .78}" width="${ww * .4}" height="${wh * .22}" rx="3" fill="#24384c"/>` : ''); }
  s += `<path d="M${x + L * .81},${wy} H${x + L * .9} Q${x + L * .935},${wy + 3} ${x + L * .955},${wy + wh * 1.05} H${x + L * .81}Z" fill="#46627c"/><path d="M${x + L * .83},${wy + 4} L${x + L * .88},${wy + 4} L${x + L * .86},${wy + wh * .9} L${x + L * .825},${wy + wh * .9}Z" fill="#cfe6f8" opacity=".25"/>`;
  s += `<rect x="${x + L * .685}" y="${wy - 4}" width="${L * .095}" height="${by - wy - 2}" rx="4" fill="none" stroke="#7d8792" stroke-width="2.4"/><path d="M${x + L * .7325},${wy - 4} V${by - 6}" stroke="#7d8792" stroke-width="2"/>`;
  s += `<rect x="${x + L - 12}" y="${top + H * .66}" width="12" height="${H * .1}" rx="3" fill="#fff6c8"/><rect x="${x}" y="${top + H * .66}" width="8" height="${H * .1}" rx="2" fill="#c8322a"/><rect x="${x + L - 6}" y="${by - 16}" width="10" height="9" rx="2" fill="#3a3e46"/><rect x="${x - 4}" y="${by - 16}" width="10" height="9" rx="2" fill="#3a3e46"/>`;
  return s + wheel(x + L * .19) + wheel(x + L * .77) + `<path d="${body}" fill="url(#sunSide)" opacity=".7"/>`;
}
// a plate of food seen at an angle
function plate(cx, cy, r, kind, fa = 1) {
  const ry = r * .56; let s = `<ellipse cx="${cx + 4}" cy="${cy + ry * .28}" rx="${r * 1.04}" ry="${ry * 1.02}" fill="#000" opacity=".4" filter="url(#blur2)"/><ellipse cx="${cx}" cy="${cy}" rx="${r}" ry="${ry}" fill="url(#plG)"/><ellipse cx="${cx}" cy="${cy + 2}" rx="${r * .74}" ry="${ry * .72}" fill="#d9d4c8"/><ellipse cx="${cx}" cy="${cy}" rx="${r * .74}" ry="${ry * .72}" fill="#f6f3ec"/><ellipse cx="${cx}" cy="${cy}" rx="${r * .74}" ry="${ry * .72}" fill="none" stroke="#b9b2a2" stroke-width="2" opacity=".8"/>`;
  const q = RS(kind * 17 + 3); s += `<g opacity="${fa.toFixed(2)}">`;
  // rice
  s += `<ellipse cx="${cx - r * .2}" cy="${cy - ry * .06}" rx="${r * .42}" ry="${ry * .46}" fill="#efe6c8"/><ellipse cx="${cx - r * .24}" cy="${cy - ry * .16}" rx="${r * .3}" ry="${ry * .3}" fill="#fbf5df"/>`;
  for (let i = 0; i < 46; i++) { const a = q() * 6.283, d = Math.sqrt(q()); s += `<ellipse cx="${(cx - r * .2 + Math.cos(a) * d * r * .38).toFixed(1)}" cy="${(cy - ry * .08 + Math.sin(a) * d * ry * .4).toFixed(1)}" rx="2.6" ry="1.2" fill="${q() > .5 ? '#fffdf2' : '#d8cca0'}" transform="rotate(${(q() * 180).toFixed(0)},${(cx - r * .2 + Math.cos(a) * d * r * .38).toFixed(1)},${(cy - ry * .08 + Math.sin(a) * d * ry * .4).toFixed(1)})"/>`; }
  if (kind) { // grilled fish + lemon
    s += `<path d="M${cx + r * .02},${cy + ry * .22} Q${cx + r * .3},${cy - ry * .2} ${cx + r * .62},${cy + ry * .12} Q${cx + r * .3},${cy + ry * .52} ${cx + r * .02},${cy + ry * .22}Z" fill="#b8763a"/><path d="M${cx + r * .1},${cy + ry * .2} Q${cx + r * .3},${cy - ry * .06} ${cx + r * .54},${cy + ry * .12}" stroke="#f0c888" stroke-width="3" fill="none" opacity=".7"/>` + [0, 1, 2, 3].map(i => `<path d="M${cx + r * (.16 + i * .1)},${cy + ry * .02} l${r * .05},${ry * .34}" stroke="#5a3418" stroke-width="2.4" opacity=".7"/>`).join('') + `<circle cx="${cx + r * .4}" cy="${cy - ry * .34}" r="${r * .11}" fill="#f4d84a"/><circle cx="${cx + r * .4}" cy="${cy - ry * .34}" r="${r * .07}" fill="#fbeea0"/>`;
  } else { // chicken leg + salad
    s += `<path d="M${cx + r * .08},${cy + ry * .3} Q${cx + r * .12},${cy - ry * .2} ${cx + r * .42},${cy - ry * .14} Q${cx + r * .6},${cy + ry * .1} ${cx + r * .4},${cy + ry * .38} Q${cx + r * .2},${cy + ry * .5} ${cx + r * .08},${cy + ry * .3}Z" fill="#a8622a"/><path d="M${cx + r * .16},${cy + ry * .18} Q${cx + r * .26},${cy - ry * .08} ${cx + r * .44},${cy - ry * .02}" stroke="#e8b070" stroke-width="4" fill="none" opacity=".7"/><rect x="${cx + r * .46}" y="${cy + ry * .2}" width="${r * .22}" height="6" rx="3" fill="#f2ead8" transform="rotate(24,${cx + r * .46},${cy + ry * .2})"/>` + [[-.02, -.5, '#4a9a3a'], [.14, -.56, '#6ab44a'], [.28, -.48, '#d8423a'], [.06, -.4, '#3f8a34']].map(([a, b, c]) => `<circle cx="${cx + r * a}" cy="${cy + ry * b}" r="${r * .09}" fill="${c}"/>`).join(''); }
  return s + `</g><path d="M${cx - r * .92},${cy - ry * .2} A${r},${ry} 0 0 1 ${cx + r * .3},${cy - ry * .95}" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/>`;
}
const bracket = (x0, x1, y, a, up = 1) => `<g opacity="${a.toFixed(2)}"><path d="M${x0},${y} H${x1} M${x0},${y - 14} v28 M${x1},${y - 14} v28" stroke="#000" stroke-opacity=".5" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${x0},${y} H${x1} M${x0},${y - 14} v28 M${x1},${y - 14} v28" stroke="#f4c76b" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
// 0: everyone flies over the city
function sceneHook(t) {
  let s = streetF(t, { id: 'h' });
  [[-90, 480, .15, 150, 1, 2, 0], [840, 600, .19, -170, -1, 3, 1.3], [-260, 800, .22, 200, 1, 4, 2.2], [980, 870, .2, -150, -1, 1, .7]].forEach(([x0, y0, sc, v, f, w, ph], i) => { s += flyer(x0 + v * (t + 1.3), y0 + Math.sin(t * 2 + i) * 10, sc, { face: f, flap: t * 10 + ph, w, c: pal(i % 4), n: 9 }); });
  s += wperson(96, 1088, CROWD[1], .5, 1, t, { w: 1, lookUp: 1 });
  // one person takes off from the pavement
  const j = ease(ramp(t, .35, 2.2)), jx = 520 + 150 * j * j, jy = 1088 - 75 - 470 * j;
  if (t < .35) s += wperson(520, 1088, CROWD[2], .5, 1, t, { w: 4 });
  else s += `<ellipse cx="${(jx + 30).toFixed(1)}" cy="1092" rx="${(40 * (1 - j * .6)).toFixed(1)}" ry="7" fill="#000" opacity="${(.3 * (1 - j)).toFixed(2)}" filter="url(#blur2)"/>` + flyer(jx, jy, .5, { pitch: lerp(72, 30, j), flap: t * 13, w: 4, c: pal(2) });
  const x = 150 + t * 150, y = 650 + Math.sin(t * 2.4) * 16;
  s += `<ellipse cx="${(x + 110).toFixed(1)}" cy="1190" rx="120" ry="16" fill="#000" opacity=".2" filter="url(#blur9)"/>` + flyer(x, y, .46, { flap: t * 9 + .6, w: 0, c: YOU, pitch: 10 });
  noEarth(); F.ov = ''; return s;
}
// 1: a 7 m wingspan: as long as a minibus
function sceneSpan(t) {
  const op = ease(ramp(t, WS(1, 2) - .3, WS(1, 2) + .55)), z = ease(ramp(t, WS(1, 2) - .1, WS(1, 2) + .75)), am = ease(ramp(t, WS(1, 4) - .1, WS(1, 5))), bx = ease(ramp(t, WS(1, 6) - .7, WS(1, 7) + .25)), ab = ease(ramp(t, WS(1, 8) - .1, WS(1, 8) + .4));
  let s = `<circle cx="150" cy="470" r="140" fill="url(#sunF)"/>` + cumulus(470 + t * 1.5, 450, 230, 33, { a: .9 }) + cumulus(180, 600, 170, 35, { a: .8 }) + farCity(71, 880, '#93a5bb', { hk: .9 });
  s += `<rect x="-200" y="770" width="1120" height="112" fill="#ebe3d0" opacity=".25"/>` + [[60, 150, 41], [215, 170, 43], [520, 160, 45], [668, 150, 47]].map(([px, h, sd]) => treeR(px, 884, h, sd, t)).join('');
  s += `<rect x="-200" y="876" width="1120" height="520" fill="#cbc0aa"/><rect x="-20" y="876" width="760" height="410" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-200" y="876" width="1120" height="30" fill="url(#aoDn)" opacity=".5"/>`;
  for (let q = 1; q < 8; q++) { const yy = 876 + q * q * 7.4; s += `<path d="M-200,${yy.toFixed(1)} H920" stroke="#a89c86" stroke-width="${(1 + q * .2).toFixed(1)}" opacity=".8"/>`; }
  for (let q = -8; q < 9; q++) s += `<path d="M${360 + q * 62},876 L${360 + q * 150},1290" stroke="#a89c86" stroke-width="1.6" opacity=".8"/>`;
  const X0 = 60, X1 = 660, busX = lerp(-720, X0, bx);
  s += minibus(busX, 968, X1 - X0, (busX - X0) / 34) + bracket(X0, X1, 716, ab) + lbl(300, 700, 'حافلةٌ صغيرة: ٧ أمتار', ab, '#fff', 32);
  // the person: profile, one arm forward and one back, the wings hang from the arms
  const S = .45, px = 360, py = 1216, rx = px + 2 * S, ry = py - 248 * S, a = lerp(1.38, -.04, op), half = (X1 - X0) / 2 - 2 * S, Ls = half * lerp(.36, 1, op);
  const uR = [Math.cos(a), Math.sin(a)], uL = [-Math.cos(a), Math.sin(a)], bl = (v, u) => { const k = (1 - op) * .9, x = v[0] * (.3 + .7 * op) + u[0] * k, y = v[1] * (.3 + .7 * op) + u[1] * k, n = Math.hypot(x, y); return [x / n, y / n]; };
  const vR = bl([-uR[1], uR[0]], uR), vL = bl([uL[1], -uL[0]], uL), wo = { col: WCOL[0][0], tip: WCOL[0][1], n: 17, bend: .16 * op };
  s += `<ellipse cx="${px}" cy="${py + 4}" rx="${(60 + 240 * op).toFixed(1)}" ry="${(9 + 5 * op).toFixed(1)}" fill="#000" opacity=".22" filter="url(#blur9)"/>`;
  s += hero(px, py, Object.assign({ s: S, face: 1, shade: 1, hF: [rx + uR[0] * 115.4 * S, ry + uR[1] * 115.4 * S], hB: [rx - 4 * S + uL[0] * 115.4 * S, ry + uL[1] * 115.4 * S] }, YOU));
  s += wingUV(rx - 30 * S, ry, uL[0], uL[1], vL[0], vL[1], Ls - 28 * S, wo) + wingUV(rx + 26 * S, ry, uR[0], uR[1], vR[0], vR[1], Ls - 26 * S, wo);
  s += bracket(X0, X1, 1060, am) + lbl(196, 1046, '٧ أمتار', am, '#f4c76b', 34) + `<g opacity="${(ab * .8).toFixed(2)}"><path d="M${X0},740 V1040 M${X1},740 V1040" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="7 9"/></g>`;
  noEarth(); F.ov = ''; return skyF('sp') + zoomG(s, lerp(1.55, 1, z), 360, 1130, 360, lerp(930, 1130, z));
}
// a bird of prey from the side, facing right, built with the same feathers
function raptor(x, y, S, flap) {
  const th = .5 + .5 * Math.sin(flap), [ux, uy, vx, vy, k] = wingDir(th, 1, 0), [bx, by, cx, cy, kb] = wingDir(th * .9 + .1, 1, 1), L = 280, col = '#8a6238', tip = '#2e2018';
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${S})">` + wingUV(24, -16, bx, by, cx, cy, L * kb, { col, tip, back: 1, n: 13 });
  s += [-.34, -.17, 0, .17, .34].map(a => leaf(-62, 4, -Math.cos(a), Math.sin(a) + .1, 92, 15, a * a > .05 ? '#3a2a1e' : '#4a3626')).join('') + [-.2, 0, .2].map(a => leaf(-62, 4, -Math.cos(a), Math.sin(a) + .1, 60, 15, '#6a4a2c')).join('');
  s += `<path d="M-74,-4 C-40,-34 40,-36 76,-14 C92,-2 82,20 56,28 C10,40 -50,30 -74,8Z" fill="#6f4e2c"/><path d="M-66,6 C-30,30 30,36 64,22 C30,30 -30,22 -66,6Z" fill="#c9a878" opacity=".6"/><path d="M-74,-4 C-40,-34 40,-36 76,-14 C40,-26 -30,-22 -74,-4Z" fill="#fff" opacity=".12"/>` + Array.from({ length: 16 }, (_, i) => `<path d="M${-56 + (i % 8) * 15 + (i > 7 ? 7 : 0)},${-8 + (i > 7 ? 12 : 0)} q7,7 14,0" stroke="#3a2614" stroke-width="1.6" fill="none" opacity=".5"/>`).join('');
  s += `<path d="M-6,28 l-10,16 M8,28 l-6,17" stroke="#e8b030" stroke-width="5" stroke-linecap="round"/><path d="M-16,44 l-12,2 M-16,44 l-8,8 M2,45 l-12,3 M2,45 l-7,8" stroke="#2a2018" stroke-width="3" stroke-linecap="round"/>`;
  s += `<path d="M60,-18 C66,-40 92,-46 108,-32 C116,-24 112,-10 100,-4 C86,2 68,0 60,-18Z" fill="#efe6d4"/><path d="M60,-18 C70,-8 88,-2 100,-4 C86,2 68,0 60,-18Z" fill="#000" opacity=".15"/><path d="M106,-30 C120,-30 128,-22 126,-10 C122,-16 114,-18 106,-18Z" fill="#f0b428"/><path d="M106,-22 h14" stroke="#8a5a10" stroke-width="1.5"/><circle cx="96" cy="-27" r="4.6" fill="#f4d23a"/><circle cx="97" cy="-27" r="2.4" fill="#1a1208"/><path d="M88,-34 q8,-3 14,2" stroke="#5a4a36" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  return s + wingUV(20, -18, ux, uy, vx, vy, L * k, { col, tip, n: 13 }) + `</g>`;
}
const pec = (cx, cy, rx, ry, rot, a, pu = 1) => `<g opacity="${a.toFixed(2)}" transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot})"><ellipse rx="${(rx * 1.3 * pu).toFixed(1)}" ry="${(ry * 1.5 * pu).toFixed(1)}" fill="#ff5a4a" opacity=".4" filter="url(#blur5)"/><ellipse rx="${(rx * pu).toFixed(1)}" ry="${(ry * pu).toFixed(1)}" fill="url(#mscG)"/>` + [-.6, -.3, 0, .3, .6].map(q => `<path d="M${(q * rx).toFixed(1)},${(-ry * .8).toFixed(1)} q${(rx * .14).toFixed(1)},${(ry * .8).toFixed(1)} 0,${(ry * 1.6).toFixed(1)}" stroke="#7a140e" stroke-width="1.8" fill="none" opacity=".7"/>`).join('') + `<path d="M${(-rx * .75).toFixed(1)},${(-ry * .5).toFixed(1)} Q0,${(-ry * 1.05).toFixed(1)} ${(rx * .75).toFixed(1)},${(-ry * .5).toFixed(1)}" stroke="#ffc8c0" stroke-width="2.2" fill="none" opacity=".7"/></g>`;
// 2: flight muscles must be a fifth of the body weight, as in birds
function sceneMuscle(t) {
  const am = ease(ramp(t, WS(2, 0) - .1, WS(2, 1) + .3)), ab = ease(ramp(t, WS(2, 5) - .2, WS(2, 6) + .2)), ah = ease(ramp(t, WS(2, 7), WS(2, 9) + .2)), abd = ease(ramp(t, WS(2, 5) - .3, WS(2, 6))), a0 = ease(ramp(t, S0(2), S0(2) + .5));
  let s = skyF('ms', '#2f6fb4', '#8cbfe6', '#e8ecd8') + `<circle cx="590" cy="840" r="170" fill="url(#sunF)"/>` + cumulus(560 + t * 2, 800, 240, 21, { a: .85 }) + cumulus(110 + t * 3, 930, 170, 23, { a: .7 }) + cumulus(330 + t * 1.5, 470, 150, 25, { a: .6 }) + mountainsR(1050, 150, 31, { snow: .35 }) + meadow(1040, 1280, t);
  const T = t - S0(2), bx = 205 + T * 5, by = 610 + Math.sin(t * 1.9) * 10, pu = 1 + .06 * Math.sin(t * 6.5);
  s += raptor(bx, by, 1.2, t * 6.5 + 1) + pec(bx + 34, by + 14, 44, 19, 8, abd, pu) + lbl(bx + 20, by + 96, 'طائر', abd, '#fff', 26);
  const x = 410, y = 892 + Math.sin(t * 1.6) * 9, S = .56, a = 78 * Math.PI / 180;
  s += flyer(x, y, S, { th: .62 + .14 * Math.sin(t * 3), flap: t * 3, pitch: 12, w: 0, c: YOU });
  const [cx, cy] = HP.chest, mx = cx + (12 * Math.cos(a) + 26 * Math.sin(a)) * S, my = cy + (12 * Math.sin(a) - 26 * Math.cos(a)) * S;
  s += pec(mx, my, 40 * S, 17 * S, -12, am, pu) + `<g opacity="${am.toFixed(2)}"><path d="M${(mx + 4).toFixed(1)},${(my + 16).toFixed(1)} L${(mx + 60).toFixed(1)},${(my + 62).toFixed(1)}" stroke="#ffc2b8" stroke-width="3"/>` + lbl(mx + 110, my + 96, 'عضلاتُ الطيران', 1, '#ffc2b8', 30) + `</g>`;
  s += `<g opacity="${a0.toFixed(2)}">` + panel(40, 1030, 640, 180) + lbl(652, 1090, 'الطيور', 1, '#fff', 30, 'start') + lbl(652, 1168, 'الإنسان', 1, '#fff', 30, 'start') + `</g><g opacity="${ab.toFixed(2)}"><rect x="${(540 - 330 * ab).toFixed(1)}" y="1064" width="${(330 * ab).toFixed(1)}" height="34" rx="8" fill="#f4c76b"/>` + lbl(140, 1092, '≈ ٢٠٪', 1, '#f4c76b', 32) +
    `<g opacity="${ah.toFixed(2)}"><rect x="514" y="1142" width="26" height="34" rx="6" fill="#e0483a"/>` + lbl(300, 1170, 'أقلّ من ٢٪ اليوم', 1, '#ffc2b8', 30) + `</g></g>`;
  noEarth(); F.ov = ''; return s;
}
// 3: one hour of flying burns about 1,500 kcal: two full meals
function sceneEnergy(t) {
  const T = t - S0(3), k = ramp(t, WS(3, 3) - .2, WS(3, 6) + .3), cal = Math.round(1500 * k / 10) * 10, a0 = ease(ramp(t, S0(3), S0(3) + .5)), ap = ease(ramp(t, WS(3, 7) - .2, WS(3, 8))), ap2 = ease(ramp(t, WS(3, 8), WS(3, 9)));
  let s = skyF('en', '#3a6aae', '#f2c9a0', '#ffe6b8') + `<circle cx="150" cy="880" r="200" fill="url(#sunF)"/><circle cx="150" cy="880" r="34" fill="#fff8e0"/>` + cumulus(190 + T * 3, 640, 220, 51, { a: .8 }) + cumulus(600 + T * 2, 600, 150, 53, { a: .7 }) + mountainsR(1010, 200, 57, { snow: .15 }) + `<rect x="-20" y="780" width="760" height="240" fill="#ffd9a8" opacity=".3"/>` + forestR(1012, 12, 50, 90, 28, '#2c5a2c', {}) + meadow(1004, 1280, t);
  const x = 390, y = 800 + Math.sin(t * 2.2) * 10;
  s += flyer(x, y, .52, { flap: t * 11, pitch: 14, w: 1, c: YOU });
  const [hx, hy] = HP.head; for (let i = 0; i < 5; i++) { const p = pmod(T * 1.4 + i / 5, 1); s += `<path d="M${(hx - 14 - p * 90).toFixed(1)},${(hy - 6 + p * p * 50 + i * 4).toFixed(1)} q-5,5 0,10 q5,-5 0,-10Z" fill="#bfe4ff" opacity="${(.9 * (1 - p)).toFixed(2)}"/>`; }
  // clock + calorie counter
  const ca = -Math.PI / 2 + k * Math.PI * 2;
  s += `<g opacity="${a0.toFixed(2)}">` + panel(30, 410, 260, 150) + `<circle cx="92" cy="472" r="38" fill="#f4f1e8"/><circle cx="92" cy="472" r="38" fill="none" stroke="#f4c76b" stroke-width="5"/><path d="M92,472 L${(92 + 38 * Math.cos(ca)).toFixed(1)},${(472 + 38 * Math.sin(ca)).toFixed(1)} A38,38 0 ${k > .5 ? 1 : 0} 0 92,434Z" fill="#e0483a" opacity="${k > .01 && k < .999 ? .35 : k >= .999 ? .35 : 0}"/>` + (k >= .999 ? `<circle cx="92" cy="472" r="36" fill="#e0483a" opacity=".35"/>` : '') +
    [0, 1, 2, 3].map(q => `<path d="M${92 + Math.cos(q * 1.5708) * 30},${472 + Math.sin(q * 1.5708) * 30} l${Math.cos(q * 1.5708) * 6},${Math.sin(q * 1.5708) * 6}" stroke="#333" stroke-width="3"/>`).join('') + `<path d="M92,472 L${(92 + 28 * Math.cos(ca)).toFixed(1)},${(472 + 28 * Math.sin(ca)).toFixed(1)}" stroke="#1a1a1a" stroke-width="4" stroke-linecap="round"/><circle cx="92" cy="472" r="4" fill="#1a1a1a"/>` +
    lbl(205, 478, AR(cal), 1, '#f4c76b', 50) + lbl(205, 534, 'سعرة', 1, '#fff', 28) + lbl(92, 544, 'ساعة', 1, '#cfd8ff', 22) + `</g>`;
  s += `<g opacity="${a0.toFixed(2)}">` + panel(40, 1004, 640, 206) + plate(190, 1100, 104, 0, ap) + plate(530, 1100, 104, 1, ap2) + lbl(360, 1118, '+', ap2, '#f4c76b', 60) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 4: every kilometre up is 6.5 degrees colder, with less oxygen
function sceneAlt(t) {
  const st = S0(4) - .2, T = t - st, h = 3 * ease(ramp(t, S0(4) + .1, WS(4, 9) + .5)), temp = Math.round((20 - 6.5 * h) * 2) / 2, o2 = Math.round(100 * Math.exp(-h / 8.4)), a0 = ease(ramp(t, st + .2, st + .7)), at = ease(ramp(t, WS(4, 3) - .2, WS(4, 4))), ao = ease(ramp(t, WS(4, 8) - .2, WS(4, 9)));
  const K = 520, hk = h / 3; let s = skyF('al', mix('#3a78c0', '#173a7c', hk), mix('#9cc4e6', '#4f8fd0', hk), mix('#e6e8dc', '#a8cdea', hk));
  if (h < 1) s += `<g transform="translate(0,${(h * K).toFixed(1)})">` + mountainsR(1010, 230, 61, { snow: .4 }) + forestR(1014, 12, 60, 110, 18, '#2c5a2c', {}) + meadow(1006, 1500, t) + `</g>`;
  [[.75, 520, 300, 71], [1.05, 150, 360, 73], [1.5, 600, 320, 75], [1.9, 220, 420, 77], [2.25, 560, 380, 79], [2.5, 100, 460, 81], [2.62, 420, 520, 83], [2.74, 700, 440, 85], [2.8, 250, 500, 87]].forEach(([a, cx, w, sd], i) => { const yy = 790 + (h - a) * K; if (yy > 300 && yy < 1500) s += cumulus(cx + T * (3 + i), yy, w, sd, { a: .92 * clamp((yy - 300) / 170) }); });
  if (h > 2.2) s += `<rect x="-20" y="${(790 + (h - 2.45) * K).toFixed(1)}" width="760" height="700" fill="#eef4fa" opacity="${(.5 * clamp((h - 2.2) / .5)).toFixed(2)}" filter="url(#soft)"/>`;
  const x = 300, y = 800 + Math.sin(t * 2) * 8, cold = clamp((h - 1) / 1.6);
  s += flyer(x, y, .46, { flap: t * 9, pitch: 36, w: 2, c: YOU });
  const [hx, hy] = HP.head; for (let i = 0; i < 4; i++) { const p = pmod(T * .8 + i / 4, 1); s += `<circle cx="${(hx + 26 + p * 40).toFixed(1)}" cy="${(hy + 10 + p * 46).toFixed(1)}" r="${(6 + p * 20).toFixed(1)}" fill="#f2f8ff" opacity="${((1 - p) * .55 * cold).toFixed(2)}" filter="url(#blur2)"/>`; }
  const r = RS(91); for (let i = 0; i < 26; i++) { const yy = pmod(r() * 1400 + T * (500 + r() * 300), 1400) - 60, xx = r() * 720; s += `<path d="M${xx.toFixed(1)},${yy.toFixed(1)} l-3,${(30 + r() * 40).toFixed(1)}" stroke="#fff" stroke-width="1.6" opacity="${(.08 + .14 * hk).toFixed(2)}"/>`; }
  s += `<rect width="720" height="1280" fill="#bfe0ff" opacity="${(.1 * cold).toFixed(2)}"/>`;
  // altitude
  s += `<g opacity="${a0.toFixed(2)}">` + panel(30, 410, 240, 132) + lbl(150, 452, 'الارتفاع', 1, '#cfd8ff', 24) + lbl(150, 516, AR(h.toFixed(1)) + ' كم', 1, '#f4c76b', 48) + `</g>`;
  // thermometer
  const mk = clamp((temp + 5) / 30), mc = mix('#4aa8ff', '#ff5a3a', clamp((temp - 2) / 16));
  s += `<g opacity="${at.toFixed(2)}">` + panel(486, 410, 204, 300) + lbl(588, 452, 'الحرارة', 1, '#cfd8ff', 24) + `<rect x="528" y="472" width="22" height="170" rx="11" fill="#e8ecf2"/><circle cx="539" cy="660" r="24" fill="#e8ecf2"/><circle cx="539" cy="660" r="17" fill="${mc}"/><rect x="533" y="${(640 - 150 * mk).toFixed(1)}" width="10" height="${(150 * mk + 14).toFixed(1)}" rx="5" fill="${mc}"/>` + [0, 1, 2, 3, 4, 5].map(q => `<path d="M554,${490 + q * 30} h10" stroke="#cfd8ff" stroke-width="2"/>`).join('') + lbl(630, 580, AR(String(temp)) + '°', 1, '#fff', 44) + `</g>`;
  s += `<g opacity="${ao.toFixed(2)}">` + panel(486, 726, 204, 124) + lbl(588, 766, 'الأكسجين', 1, '#cfd8ff', 24) + `<rect x="506" y="786" width="164" height="16" rx="8" fill="#2a3350"/><rect x="${(670 - 164 * o2 / 100).toFixed(1)}" y="786" width="${(164 * o2 / 100).toFixed(1)}" height="16" rx="8" fill="#7ad0ff"/>` + lbl(588, 840, AR(o2) + '٪', 1, '#7ad0ff', 32) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 5: the streets empty, the doors move to the roofs
function sceneCity(t) {
  const st = S0(5) - .2, T = t - st, go = Math.pow(ramp(t, WS(5, 2) - .1, WS(5, 5) + .5), 2), rk = ease(ramp(t, WS(5, 6) - .3, WS(5, 7) + .2));
  let s = streetF(t, { id: 'c', cars: 0, roof: rk });
  // standing on roofs / landing / taking off
  const la = ease(ramp(t, WS(5, 6) - .6, WS(5, 8) + .2)), R3 = ROOFS[3], rx3 = R3[0] + R3[1] * .34, top3 = 1000 - R3[2] - 13, S = .25;
  if (la < 1) s += flyer(lerp(790, rx3, la), lerp(430, top3 - 150 * S, la), S, { face: -1, pitch: lerp(10, 74, la * la), flap: t * 12, w: 2, c: pal(1), n: 9 });
  else s += wperson(rx3, top3, CROWD[1], S, -1, t, { w: 2 });
  const tk = ease(ramp(t, WS(5, 7), WS(5, 9) + .6)), R1 = ROOFS[1], rx1 = R1[0] + R1[1] * .6, top1 = 1000 - R1[2] - 13;
  if (rk > .5) s += tk <= 0 ? wperson(rx1, top1, CROWD[0], S, -1, t, { w: 3 }) : flyer(rx1 - 300 * tk * tk, top1 - 150 * S - 190 * tk, S, { face: -1, pitch: lerp(70, 16, tk), flap: t * 12, w: 3, c: pal(0), n: 9 });
  if (rk > .5) s += `<g opacity="${rk.toFixed(2)}">` + wperson(ROOFS[4][0] + 120, 1000 - ROOFS[4][2] - 13, CROWD[3], S, -1, t, { w: 1 }) + wperson(ROOFS[0][0] + 60, 1000 - ROOFS[0][2] - 13, CROWD[2], S, 1, t, { w: 0 }) + `</g>`;
  [[-120, 470, .16, 120, 1, 0, 0], [860, 520, .2, -150, -1, 4, 1.1], [-320, 860, .22, 170, 1, 1, 2.2]].forEach(([x0, y0, sc, v, f, w, ph], i) => { s += flyer(x0 + v * (T + 1), y0 + Math.sin(t * 2 + i) * 9, sc, { face: f, flap: t * 10 + ph, w, c: pal((i + 1) % 4), n: 9 }); });
  // the jam drives away, nobody comes after it
  [[130, '#a83a2a'], [372, '#d8d8dc'], [612, '#3a6a9a']].forEach(([cx, col], i) => { s += car(cx - go * (900 + i * 80), 1180, .82, col, -1, 0); });
  [[100, '#e0c060'], [344, '#2f7a5a'], [590, '#56565e']].forEach(([cx, col], i) => { s += car(cx + go * (900 + (2 - i) * 80), 1262, .86, col, 1, 0); });
  s += wperson(250 + T * 16, 1090, CROWD[2], .5, 1, t, { w: 4, moving: 1, phase: T * 5 }) + wperson(600 - T * 14, 1074, CROWD[3], .46, -1, t, { w: 2, moving: 1, phase: T * 5 + 1 });
  noEarth(); F.ov = ''; return s;
}
// 6a: traffic lights in the sky
function tLight(x, y, s, g) {
  const lamp = (cy, col, on) => `<circle cx="0" cy="${cy}" r="15" fill="#15171c"/><circle cx="0" cy="${cy}" r="12" fill="${on ? col : mix(col, '#101216', .78)}"/>` + (on ? `<circle cx="0" cy="${cy}" r="34" fill="${col}" opacity=".4" filter="url(#blur5)"/><circle cx="-4" cy="${cy - 4}" r="4" fill="#fff" opacity=".7"/>` : '');
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-40 V0" stroke="#22252b" stroke-width="5"/><rect x="-26" y="0" width="52" height="132" rx="12" fill="#2a2d34"/><rect x="-26" y="0" width="16" height="132" rx="8" fill="#fff" opacity=".1"/><rect x="-30" y="-6" width="60" height="10" rx="4" fill="#f4c76b"/>` + lamp(26, '#ff3b30', !g) + lamp(66, '#ffb020', 0) + lamp(106, '#34d058', g) + `</g>`;
}
function sceneLights(t) {
  const st = S0(6) - .2, T = t - st, tg = WS(6, 4) + .15, g = t > tg ? 1 : 0, u = Math.max(0, t - tg);
  let s = skyF('lt', '#2c66b0', '#86b6e2', '#dfe8ee') + cumulus(250 + T * 3, 470, 260, 91, { a: .9 }) + cumulus(520 + T * 2, 760, 200, 93, { a: .75 }) + cumulus(160, 960, 240, 95, { a: .7 }) + farCity(53, 1300, '#8ea2ba', { hk: 2.6 }) + `<rect x="-20" y="900" width="760" height="400" fill="#dfe8ee" opacity=".3"/>`;
  s += officeGlass(-84, 1500, 190, 1260, 61) + aptBrick(612, 1500, 190, 1040, '#b98a6a', 63, { bands: 1 });
  // cross traffic (far) passes while the light is red
  [[0, 660, 4], [1, 760, 1], [2, 880, 3], [3, 1010, 2]].forEach(([i, y0, w]) => { s += flyer(820 - (T + .2 + i * .22) * 330, y0 + Math.sin(t * 2 + i) * 6, .13, { face: -1, flap: t * 11 + i, w, c: pal(i), n: 7 }); });
  s += `<path d="M106,512 Q360,566 612,520" stroke="#22252b" stroke-width="4" fill="none"/><path d="M106,512 Q360,566 612,520" stroke="#fff" stroke-width="1" fill="none" opacity=".3"/>` + tLight(430, 580, 1, g) + tLight(250, 566, .7, g) + `<path d="M116,1010 Q360,1050 606,1016" stroke="#22252b" stroke-width="3" fill="none" opacity=".7"/>` + tLight(330, 1056, .5, g);
  // the queue hovers at the red light, then goes
  [[330, 850, 0, 0], [215, 740, 2, 1.4], [120, 930, 4, 2.6]].forEach(([x0, y0, w, ph], i) => { const dx = 520 * u * u * (1 + .2 * (2 - i)), hov = 1 - clamp(u * 2); s += flyer(x0 + dx + Math.sin(t * 3 + i) * 5 * hov, y0 + Math.sin(t * 4 + i * 2) * 8 * hov - 60 * clamp(u), .3, { pitch: lerp(14, 52, hov), flap: t * lerp(10, 15, hov) + ph, w, c: i ? pal(i) : YOU, n: 11 }); });
  noEarth(); F.ov = ''; return s;
}
// 6b: one storm keeps a whole city on the ground
function bolt(x0, y0, y1, seed) { const r = RS(seed); let x = x0, y = y0, d = `M${x},${y}`; while (y < y1) { y += 26 + r() * 40; x += (r() - .5) * 70; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } return d; }
function sceneStorm(t) {
  const st = WS(6, 5) - .2, T = t - st, f1 = Math.max(0, 1 - Math.abs(T - .75) / .16), f2 = Math.max(0, 1 - Math.abs(T - 2.5) / .18), fl = Math.max(f1, f2, .5 * Math.max(0, 1 - Math.abs(T - .98) / .1));
  let s = streetF(t, { id: 'st', sky: ['#1c2430', '#414b59', '#757d88'], storm: 1, cars: 0 });
  const r = RS(131); let cl = ''; for (let i = 0; i < 16; i++) { const cx = pmod(r() * 900 + T * (30 + r() * 30), 960) - 120, cy = 300 + r() * 330, w = 150 + r() * 170; cl += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .42).toFixed(1)}" fill="${r() > .5 ? '#232a36' : '#39424f'}" opacity=".8" filter="url(#blur9)"/>`; }
  s += cl + `<rect width="720" height="1280" fill="#0c1424" opacity=".34"/>`;
  // lit shop windows, wet road
  SHOPF.forEach(([sx, sw]) => { s += `<rect x="${sx + 6}" y="920" width="${sw - 12}" height="74" fill="#ffd890" opacity=".3"/><path d="M${sx + 6},1000 h${sw - 12} l14,100 h${-sw - 16}Z" fill="#ffd890" opacity=".1"/>`; });
  s += `<rect x="-20" y="1116" width="760" height="170" fill="#9fb4cc" opacity=".14"/>` + [[120, 1190, 90], [420, 1240, 130], [610, 1170, 70]].map(([px, py, w]) => `<ellipse cx="${px}" cy="${py}" rx="${w}" ry="${w * .12}" fill="#a8bcd4" opacity=".3"/><ellipse cx="${px - w * .2}" cy="${py - 2}" rx="${w * .4}" ry="${w * .04}" fill="#fff" opacity=".2"/>`).join('');
  // everybody waits under the awnings, wings folded
  [[70, 1, 0, 1], [176, -1, 1, 2], [330, 1, 2, 0], [404, -1, 3, 4], [520, 1, 1, 3], [636, -1, 0, 2]].forEach(([px, f, c, w], i) => { s += wperson(px, 1036 + (i % 2) * 8, Object.assign({}, CROWD[c]), .44, f, t, { w, lookUp: i % 3 === 0 ? 1 : 0 }); });
  s += `<rect width="720" height="1280" fill="#0c1424" opacity=".16"/>` + rain(t, .95, 230, 5, 1000, 1280);
  if (fl > 0) s += `<g opacity="${fl.toFixed(2)}"><path d="${bolt(T < 1.6 ? 470 : 210, 300, 800, T < 1.6 ? 7 : 9)}" stroke="#bcd8ff" stroke-width="14" fill="none" opacity=".5" filter="url(#blur5)"/><path d="${bolt(T < 1.6 ? 470 : 210, 300, 800, T < 1.6 ? 7 : 9)}" stroke="#fff" stroke-width="4" fill="none" stroke-linejoin="round"/></g><rect width="720" height="1280" fill="#cfe0ff" opacity="${(.3 * fl).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// 7: humans did fly on muscle power: Daedalus, 115 km over the sea on pedals (1988)
function daedalus(x, y, S, t) {
  const P = (u, top) => { const a = Math.abs(u), yy = -6 - 58 * Math.pow(a, 1.9) + u * 14, ch = lerp(30, 12, Math.pow(a, 1.3)); return [u * 318, top ? yy - ch * .5 : yy + ch * .5]; };
  const N = 28; let up = [], dn = [], ribs = '';
  for (let i = 0; i <= N; i++) { const u = -1 + 2 * i / N, a = P(u, 1), b = P(u, 0); up.push(a[0].toFixed(1) + ',' + a[1].toFixed(1)); dn.unshift(b[0].toFixed(1) + ',' + b[1].toFixed(1)); if (i % 1 === 0) ribs += `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} L${b[0].toFixed(1)},${b[1].toFixed(1)}" stroke="#d88a9a" stroke-width="1.3" opacity=".55"/>`; }
  const ph = t * 5.2, hub = [96, 58], crank = [46, 84];
  const leg = (p, col) => { const fx = crank[0] + Math.cos(p) * 9, fy = crank[1] + Math.sin(p) * 9, hx = 2, hy = 80, [a1, a2] = ik(hx, hy, fx, fy, 24, 24, -1); const kx = hx + Math.sin(a1) * 24, ky = hy + Math.cos(a1) * 24; return `<path d="M${hx},${hy} L${kx.toFixed(1)},${ky.toFixed(1)} L${fx.toFixed(1)},${fy.toFixed(1)}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${S})">`;
  // tail boom, tail surfaces
  s += `<path d="M96,58 L-214,-2" stroke="#d9d4cc" stroke-width="5" stroke-linecap="round"/><path d="M96,56 L-214,-4" stroke="#fff" stroke-width="1.5" opacity=".7"/>` + `<path d="M-250,-10 L-172,-2 L-176,8 L-246,2Z" fill="url(#wngG)" opacity=".92"/><path d="M-214,-2 L-226,-58 L-200,-52 L-196,-2Z" fill="#fbe4e8" opacity=".95"/><path d="M-214,-2 L-226,-58" stroke="#d88a9a" stroke-width="2"/>`;
  // far half of the wires, the king post
  s += `<path d="M2,-74 L-190,-20 M2,-74 L200,-28 M10,96 L-170,-10 M10,96 L190,-16" stroke="#3a4250" stroke-width="1" opacity=".55"/><path d="M4,-74 V30" stroke="#c8ccd2" stroke-width="4"/>`;
  // the pod: pilot pedalling inside a clear fairing
  const podP = 'M-40,68 C-36,30 20,20 64,40 C94,52 106,60 102,66 C94,94 50,110 4,106 C-26,104 -42,90 -40,68Z';
  s += `<path d="${podP}" fill="#dfeaf6" opacity=".35"/><path d="M-22,92 L-14,50" stroke="#3a4250" stroke-width="5" stroke-linecap="round"/><path d="M-22,92 H40" stroke="#8a8f98" stroke-width="3"/>` + leg(ph + Math.PI, '#1c2a44') +
    `<path d="M2,80 L-8,52" stroke="#e85a2a" stroke-width="17" stroke-linecap="round"/><path d="M-1,78 L-10,54" stroke="#000" stroke-width="5" opacity=".15" stroke-linecap="round"/><rect x="-10" y="42" width="8" height="10" rx="3" fill="#c89070"/><circle cx="-3" cy="38" r="9.5" fill="#c89070"/><path d="M-16,36 C-14,22 8,22 9,35 L-2,36 L-14,42Z" fill="#f6f6f8"/><path d="M-14,33 C-6,29 2,29 8,32" stroke="#2a6ab0" stroke-width="2.6" fill="none"/><circle cx="2.5" cy="38" r="1.3" fill="#1a120d"/>` +
    `<path d="M-6,56 L14,66 L32,60" stroke="#e85a2a" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="33" cy="60" r="4" fill="#c89070"/><path d="M33,54 v14" stroke="#3a4250" stroke-width="3" stroke-linecap="round"/>` + leg(ph, '#2a3a5c') +
    [0, Math.PI].map(q => `<ellipse cx="${(crank[0] + Math.cos(ph + q) * 9 + 3).toFixed(1)}" cy="${(crank[1] + Math.sin(ph + q) * 9).toFixed(1)}" rx="7" ry="3.4" fill="#16181c"/>`).join('') +
    `<circle cx="${crank[0]}" cy="${crank[1]}" r="7" fill="none" stroke="#8a8f98" stroke-width="2.5"/>` + [0, 1, 2].map(q => `<path d="M${crank[0]},${crank[1]} l${(Math.cos(ph + q * 2.094) * 7).toFixed(1)},${(Math.sin(ph + q * 2.094) * 7).toFixed(1)}" stroke="#8a8f98" stroke-width="1.6"/>`).join('') + `<path d="M${crank[0]},${crank[1] - 7} L${hub[0]},${hub[1] - 3} M${crank[0]},${crank[1] + 7} L${hub[0]},${hub[1] + 3}" stroke="#6a6f78" stroke-width="1.3"/>` +
    `<path d="${podP}" fill="url(#podG)" opacity=".5"/><path d="${podP}" fill="none" stroke="#fff" stroke-width="2" opacity=".8"/><path d="M-28,50 C-4,34 30,32 58,42" stroke="#fff" stroke-width="4" fill="none" opacity=".55" stroke-linecap="round"/>`;
  // the wing: 34 m of clear film over ribs
  s += `<polygon points="${up.join(' ')} ${dn.join(' ')}" fill="url(#wngG)" opacity=".93"/>` + ribs + `<polyline points="${up.join(' ')}" fill="none" stroke="#fff" stroke-width="3"/><polyline points="${dn.join(' ')}" fill="none" stroke="#b86a7c" stroke-width="1.6" opacity=".7"/><path d="M-316,-52 l-8,-10 M318,-24 l8,-10" stroke="#e0483a" stroke-width="5" stroke-linecap="round"/>`;
  // propeller at the nose (seen almost edge-on)
  s += `<ellipse cx="${hub[0] + 6}" cy="${hub[1]}" rx="13" ry="70" fill="#fff" opacity=".13"/>` + [0, Math.PI].map(q => { const a = ph * 1.5 + q, ex = hub[0] + 6 + Math.cos(a) * 11, ey = hub[1] + Math.sin(a) * 68; return `<path d="M${hub[0] + 6},${hub[1]} Q${(hub[0] + 6 + Math.cos(a + .5) * 9).toFixed(1)},${(hub[1] + Math.sin(a + .5) * 40).toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#f2f2f4" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${hub[0] + 6},${hub[1]} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#9aa0aa" stroke-width="1.5" opacity=".6"/>`; }).join('') + `<circle cx="${hub[0] + 6}" cy="${hub[1]}" r="6" fill="#e0483a"/>`;
  return s + `</g>`;
}
function sceneDaed(t) {
  const st = S0(7) - .2, T = t - st, dk = ease(ramp(t, WS(7, 9) - .2, WS(7, 13) + .4)), d = Math.round(115 * dk), ap = ease(ramp(t, WS(7, 7) - .2, WS(7, 8))), am = ease(ramp(t, WS(7, 5) - .1, WS(7, 6) + .3)), ad = ease(ramp(t, WS(7, 9) - .3, WS(7, 10)));
  let s = `<circle cx="560" cy="560" r="230" fill="url(#sunF)"/><circle cx="560" cy="560" r="32" fill="#fffdf0"/>` + cumulus(600 - T * 2, 470, 230, 111, { a: .9 }) + cumulus(120 - T * 3, 610, 170, 113, { a: .75 });
  // far island with cliffs, then the sea
  s += `<g opacity=".8">` + mountainsR(846, 96, 117, { snow: 0 }) + `</g><rect x="-20" y="740" width="760" height="110" fill="#cfe2f0" opacity=".45"/><rect x="-200" y="842" width="1120" height="560" fill="url(#fSea)"/>`;
  const r = RS(119); for (let i = 0; i < 70; i++) { const u = r(), yy = 848 + u * u * 430, len = 14 + u * 70, xx = pmod(r() * 900 - T * (26 + u * 120), 900) - 90; s += `<path d="M${xx.toFixed(1)},${yy.toFixed(1)} q${(len / 2).toFixed(1)},${(-2 - u * 6).toFixed(1)} ${len.toFixed(1)},0" stroke="#e8f6ff" stroke-width="${(1 + u * 2.6).toFixed(1)}" opacity="${(.2 + .4 * u).toFixed(2)}" fill="none" stroke-linecap="round"/>`; }
  for (let i = 0; i < 26; i++) { const u = r(), yy = 850 + u * 300, w = 10 + u * 60; s += `<ellipse cx="${(560 + Math.sin(T * 3 + i * 1.7) * (8 + u * 26)).toFixed(1)}" cy="${yy.toFixed(1)}" rx="${(w / 2).toFixed(1)}" ry="${(1.2 + u * 1.6).toFixed(1)}" fill="#fff6d8" opacity="${(.55 - u * .3).toFixed(2)}"/>`; }
  s += `<ellipse cx="560" cy="930" rx="70" ry="110" fill="#fff2c8" opacity=".14" filter="url(#blur9)"/>`;
  // chase boat far away
  const bxx = 120 + T * 7; s += `<path d="M${bxx - 60},866 q30,-6 60,0" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/><path d="M${bxx},866 l34,0 l8,-8 l-46,0Z" fill="#e8e4dc"/><rect x="${bxx + 10}" y="850" width="14" height="8" fill="#c8423a"/>`;
  // escort boat with its wake
  const ex = 470 + T * 9, ey = 1010 + Math.sin(T * 2.2) * 2;
  s += `<path d="M${ex - 20},${ey + 6} Q${ex - 150},${ey + 2} ${ex - 300},${ey + 22} Q${ex - 150},${ey + 14} ${ex - 20},${ey + 12}Z" fill="#eaf6ff" opacity=".5"/><path d="M${ex - 40},${ey + 10} q-60,2 -130,14 M${ex - 30},${ey + 4} q-70,-4 -150,2" stroke="#fff" stroke-width="2" opacity=".5" fill="none"/>` +
    `<path d="M${ex - 50},${ey - 8} L${ex + 62},${ey - 8} Q${ex + 84},${ey - 8} ${ex + 92},${ey - 20} L${ex + 70},${ey + 8} L${ex - 44},${ey + 8}Z" fill="#e8662a"/><path d="M${ex - 50},${ey - 8} L${ex + 62},${ey - 8} Q${ex + 84},${ey - 8} ${ex + 92},${ey - 20}" stroke="#ffb07a" stroke-width="3" fill="none"/><path d="M${ex - 44},${ey + 8} L${ex + 70},${ey + 8}" stroke="#7a2c10" stroke-width="3"/><rect x="${ex - 58}" y="${ey - 14}" width="10" height="20" rx="2" fill="#2a2e36"/>` +
    `<rect x="${ex + 4}" y="${ey - 30}" width="26" height="22" rx="3" fill="#f2f2f4"/><rect x="${ex + 8}" y="${ey - 26}" width="18" height="9" fill="#3a5068"/><circle cx="${ex - 20}" cy="${ey - 22}" r="6" fill="#c89070"/><rect x="${ex - 26}" y="${ey - 16}" width="12" height="12" rx="3" fill="#2a6ab0"/><ellipse cx="${ex + 10}" cy="${ey + 14}" rx="70" ry="5" fill="#0c2a44" opacity=".35"/>`;
  const ax = 330 + Math.sin(T * .5) * 16, ay = 700 + Math.sin(T * .9) * 9, zz = ease(ramp(t, WS(7, 5) - .5, WS(7, 6) + .5));
  s += `<ellipse cx="${ax.toFixed(1)}" cy="968" rx="250" ry="9" fill="#0c2a44" opacity=".3" filter="url(#blur5)"/><ellipse cx="${(ax + 20).toFixed(1)}" cy="972" rx="36" ry="6" fill="#0c2a44" opacity=".35" filter="url(#blur2)"/>` + daedalus(ax, ay, .98, t);
  [[540, 770, .8], [590, 794, .6], [650, 750, .7]].forEach(([bx, by, sc], i) => { s += bird(bx + T * 10, by + Math.sin(t * 2 + i) * 5, sc, t * 9 + i, 0); });
    s = skyF('dd', '#2a6cb4', '#8fc4ea', '#f6ecd0') + zoomG(s, lerp(2.3, 1, zz), ax + 26, ay + 66, lerp(360, ax + 26, zz), lerp(800, ay + 66, zz));
  s += `<g opacity="${ap.toFixed(2)}"><path d="M${(ax + 50).toFixed(1)},${(ay + 98).toFixed(1)} L${(ax + 130).toFixed(1)},${(ay + 150).toFixed(1)}" stroke="#ffe4a0" stroke-width="3"/>` + lbl(ax + 200, ay + 190, 'دوّاساتٌ فقط', 1, '#ffe4a0', 30) + `</g>` + `<g opacity="${(am * zz).toFixed(2)}">` + lbl(ax - 150, ay - 100, 'جناحٌ بعرضِ ٣٤ متراً', 1, '#fff', 26) + `</g>`;
  // map: Crete to Santorini, the distance counter
  s += `<g opacity="${ad.toFixed(2)}">` + panel(40, 1000, 250, 214) + `<rect x="52" y="1012" width="226" height="190" rx="12" fill="#2f6f9c"/><path d="M64,1176 Q100,1160 150,1166 Q210,1158 266,1172 L266,1190 Q200,1196 150,1190 Q100,1196 64,1188Z" fill="#c9b98a"/><path d="M64,1176 Q100,1160 150,1166 Q210,1158 266,1172" stroke="#8aa06a" stroke-width="5" fill="none"/><path d="M158,1040 q14,-10 22,2 q-4,14 -16,12 q4,-8 -6,-14Z" fill="#c9b98a"/>` +
    `<path d="M168,1162 L168,${(1162 - 104 * dk).toFixed(1)}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="7 6"/><circle cx="168" cy="1162" r="5" fill="#fff"/><circle cx="168" cy="${(1162 - 104 * dk).toFixed(1)}" r="6" fill="#e0483a" stroke="#fff" stroke-width="2"/>` + lbl(106, 1160, 'كريت', 1, '#fff', 20) + lbl(110, 1050, 'سانتوريني', 1, '#fff', 20) +
    panel(310, 1050, 370, 164) + lbl(495, 1112, AR(d) + ' كم', 1, '#f4c76b', 56) + lbl(495, 1178, 'عام ١٩٨٨ · نحو ٤ ساعات', 1, '#fff', 26) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(8)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpan }, { s: S0(2) - .2, f: sceneMuscle }, { s: S0(3) - .2, f: sceneEnergy }, { s: S0(4) - .2, f: sceneAlt }, { s: S0(5) - .2, f: sceneCity }, { s: S0(6) - .2, f: sceneLights }, { s: WS(6, 5) - .2, f: sceneStorm }, { s: S0(7) - .2, f: sceneDaed }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSpan, sceneMuscle, sceneEnergy, sceneAlt, sceneLights, sceneDaed]);
const XF = .5;
const TLI = [['جناحان ٧ م', S0(1)], ['عضلاتُ صدر', S0(2)], ['طاقةٌ كبيرة', S0(3)], ['بردٌ في الأعلى', S0(4)]];
const LIST_ON = new Set([sceneEnergy]);
const CHIPS = [
  ['c1', 'جناحان بطولِ حافلة', 360, 330, 'big', WS(1, 6), S0(2) - .3], ['c2', 'خُمسُ وزنِك عضلات', 360, 330, 'big', WS(2, 5), S0(3) - .3], ['c3', 'طاقةُ وجبتَين كاملتَين', 360, 330, 'big', WS(3, 7), S0(4) - .3], ['c4', 'أبردُ… وهواءٌ أقلّ', 360, 330, 'ice big', WS(4, 3), S0(5) - .3],
  ['c5', 'الأبوابُ على الأسطح', 360, 330, 'big', WS(5, 7), S0(6) - .3], ['c6', 'إشاراتُ مرورٍ في السماء', 360, 330, 'big', WS(6, 2), WS(6, 5) - .45], ['c6b', 'عاصفة: لا طيران', 360, 330, 'red big', WS(6, 6), S0(7) - .3],
  ['c7', 'طارَ بعضلاتِه فعلاً', 360, 330, 'big', WS(7, 2), WS(7, 9) - .3], ['c7b', '١١٥ كم بالدوّاسات', 360, 330, 'big', WS(7, 10), S0(8) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الطيران</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
