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
    `<ellipse cx="${hx + 11}" cy="${hy - 2}" rx="2.4" ry="3" fill="${g > .3 ? '#fff' : '#1a120d'}"/>` + (o.lid || o.closed ? `<rect x="${hx + 7.6}" y="${hy - 6.2}" width="7" height="${(o.closed ? 6.4 : o.lid * 4.4).toFixed(2)}" fill="${c.skin}"/><path d="M${hx + 7.6},${(hy - 6.2 + (o.closed ? 5.2 : o.lid * 4.4)).toFixed(2)} q3.5,${o.closed ? 1.8 : .6} 7,0" stroke="#3a2418" stroke-width="1.2" fill="none" opacity=".85"/>` : '') +
    (o.bags ? `<path d="M${hx + 7.4},${hy + 2.4} q3.8,2.8 7.6,0" stroke="#6a3448" stroke-width="1.8" fill="none" opacity="${(.55 * o.bags).toFixed(2)}"/><ellipse cx="${hx + 11}" cy="${hy + 3.6}" rx="4.4" ry="1.8" fill="#5a2a3a" opacity="${(.22 * o.bags).toFixed(2)}"/>` : '') + `<path d="M${hx + 6},${hy - 9} q6,-3 11,0" stroke="${c.hair}" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
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
// ===================== "what if you did not sleep for ten days?" (Short #34) =====================
const NDEF = `<radialGradient id="lampG"><stop offset="0" stop-color="#ffd59a" stop-opacity=".9"/><stop offset=".35" stop-color="#ffb35c" stop-opacity=".3"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="lampW"><stop offset="0" stop-color="#ffc874" stop-opacity=".75"/><stop offset=".4" stop-color="#ff9e48" stop-opacity=".28"/><stop offset="1" stop-color="#ff8a30" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="scrG"><stop offset="0" stop-color="#9fd0ff" stop-opacity=".55"/><stop offset="1" stop-color="#6aa8ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="brainG" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#f6c6c4"/><stop offset=".6" stop-color="#e09a9c"/><stop offset="1" stop-color="#b86a72"/></radialGradient>` +
  `<radialGradient id="cereG" cx=".4" cy=".3"><stop offset="0" stop-color="#eab0b0"/><stop offset="1" stop-color="#a85c66"/></radialGradient>` +
  `<linearGradient id="headG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8704e"/><stop offset=".55" stop-color="#c89070"/><stop offset="1" stop-color="#d9a584"/></linearGradient>` +
  `<radialGradient id="irisG"><stop offset="0" stop-color="#2a1608"/><stop offset=".35" stop-color="#5a3216"/><stop offset=".8" stop-color="#8a5a2a"/><stop offset="1" stop-color="#3a2210"/></radialGradient>` +
  `<radialGradient id="scleraG" cx=".5" cy=".4"><stop offset="0" stop-color="#fbf6ee"/><stop offset=".75" stop-color="#eadfd2"/><stop offset="1" stop-color="#c9a8a0"/></radialGradient>` +
  `<radialGradient id="virG" cx=".38" cy=".35"><stop offset="0" stop-color="#d6f0a8"/><stop offset=".6" stop-color="#7ab05a"/><stop offset="1" stop-color="#3c6a30"/></radialGradient>` +
  `<radialGradient id="vigB" cx=".5" cy=".5" r=".72"><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="1"/></radialGradient>` +
  `<linearGradient id="beamG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c8" stop-opacity=".5"/><stop offset="1" stop-color="#fff2c8" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="woodG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5236"/><stop offset="1" stop-color="#a87650"/></linearGradient>` +
  `<linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8774c"/><stop offset="1" stop-color="#7a5232"/></linearGradient>` +
  `<linearGradient id="curG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#244c52"/><stop offset=".25" stop-color="#3a6e74"/><stop offset=".5" stop-color="#2a5a60"/><stop offset=".75" stop-color="#40767c"/><stop offset="1" stop-color="#22484e"/></linearGradient>` +
  `<radialGradient id="dropG"><stop offset="0" stop-color="#e8f4ff" stop-opacity=".8"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="clumpG" cx=".4" cy=".35"><stop offset="0" stop-color="#d8a860"/><stop offset=".7" stop-color="#8a5a2a"/><stop offset="1" stop-color="#5a3414"/></radialGradient>` +
  `<filter id="blur12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="12"/></filter>`;
const DEFN = () => `${DEFB()}${NDEF}`;
const mulF = (id, N) => { const r = lerp(1, .34, N), g = lerp(1, .38, N), b = lerp(1, .56, N); return `<filter id="${id}" x="-200" y="-200" width="1120" height="1700" filterUnits="userSpaceOnUse"><feColorMatrix type="matrix" values="${r.toFixed(3)} 0 0 0 0  0 ${g.toFixed(3)} 0 0 0  0 0 ${b.toFixed(3)} 0 ${(.015 * N).toFixed(3)}  0 0 0 1 0"/></filter>`; };
const scr = (inner) => `<g style="mix-blend-mode:screen">${inner}</g>`;

// ---------- the room: wall, window to the city, desk, lamp, chair, wooden floor. o: {N, day, mess, id, cyc}
function outside(t, N, id, x0, y0, w, h) {
  const sky = [mix('#6aa4dc', '#0a1430', N), mix('#a9cdec', '#1c2a58', N), mix('#f4e2c0', '#3a3a6a', N)];
  let s = `<defs><linearGradient id="os${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient><clipPath id="oc${id}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}"/></clipPath></defs>`;
  s += `<g clip-path="url(#oc${id})"><rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="url(#os${id})"/>`;
  if (N > .02) { const r = RS(77); for (let i = 0; i < 40; i++) s += `<circle cx="${(x0 + r() * w).toFixed(1)}" cy="${(y0 + r() * h * .6).toFixed(1)}" r="${(.6 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(N * (.3 + .6 * r())).toFixed(2)}"/>`;
    s += `<circle cx="${x0 + w * .72}" cy="${y0 + 70}" r="60" fill="#fff8e0" opacity="${(.16 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(x0 + w * .72, y0 + 70, 22, N); }
  if (N < .98) s += `<circle cx="${x0 + w * .25}" cy="${y0 + 90}" r="80" fill="#fff6d0" opacity="${(.35 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${x0 + w * .25}" cy="${y0 + 90}" r="18" fill="#fffdf0" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(x0 + w * .6 + t * 2, y0 + 150, 150, 61, { a: .8 * (1 - N) });
  const hz = mix('#7a8ea8', '#141c38', N);
  s += farCity(97, y0 + h - 20, hz, { hk: .75 });
  // lit city windows at night
  if (N > .02) { const r = RS(91); for (let i = 0; i < 90; i++) { const wx = x0 + r() * w, wy = y0 + h - 30 - r() * 200, k = r(); s += `<rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="3.4" height="4.6" fill="${k < .7 ? '#ffd27e' : '#cfe4ff'}" opacity="${(N * (.5 + .5 * r())).toFixed(2)}"/>`; } }
  s += `<rect x="${x0}" y="${y0 + h - 22}" width="${w}" height="22" fill="${mix('#6a7480', '#0c1020', N)}"/></g>`;
  return s;
}
const WX = 372, WY = 410, WWd = 270, WHt = 380;
function deskItems(t, N, mess, o = {}) {
  let s = '';
  // desk: top, front edge, drawer unit, legs
  s += `<rect x="20" y="866" width="470" height="18" rx="3" fill="url(#deskG)"/><rect x="20" y="866" width="470" height="4" fill="#fff" opacity=".22"/><rect x="20" y="884" width="470" height="8" fill="#000" opacity=".25"/>` +
    `<rect x="36" y="884" width="140" height="134" fill="#8a5c38"/><rect x="36" y="884" width="140" height="134" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    [0, 1, 2].map(i => `<rect x="44" y="${894 + i * 42}" width="124" height="36" rx="3" fill="#9a6a42"/><rect x="44" y="${894 + i * 42}" width="124" height="4" fill="#fff" opacity=".14"/><rect x="92" y="${909 + i * 42}" width="28" height="5" rx="2" fill="#d8c8a8"/>`).join('') +
    `<rect x="456" y="884" width="16" height="134" fill="#6a4428"/><rect x="456" y="884" width="5" height="134" fill="#fff" opacity=".12"/>`;
  // lamp: base, two arms, shade
  s += `<ellipse cx="80" cy="864" rx="34" ry="7" fill="#2a2a30"/><path d="M80,862 L104,760 L170,742" stroke="#2e2e36" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="104" cy="760" r="6" fill="#4a4a52"/>` +
    `<path d="M150,728 L206,742 L196,780 L136,764Z" fill="#c8a040"/><path d="M150,728 L206,742 L203,752 L146,738Z" fill="#fff" opacity=".25"/><ellipse cx="166" cy="772" rx="30" ry="9" fill="#fff4cc" opacity="${(.4 + .6 * N).toFixed(2)}" transform="rotate(15,166,772)"/>`;
  // books, mug(s), papers, laptop back
  s += `<rect x="226" y="842" width="96" height="12" fill="#2e5a8a"/><rect x="232" y="830" width="86" height="12" fill="#a83a3a"/><rect x="222" y="854" width="104" height="12" fill="#3a7a4a"/><rect x="226" y="842" width="96" height="3" fill="#fff" opacity=".3"/><rect x="232" y="830" width="86" height="3" fill="#fff" opacity=".3"/>` +
    `<path d="M342,862 L344,770 L352,768 L356,862Z" fill="#4a4e56"/><path d="M344,770 L352,768 L354,780 L345,782Z" fill="#fff" opacity=".2"/><rect x="330" y="860" width="96" height="6" rx="2" fill="#8a8e96"/>`;
  const mugs = mess ? [[196, 1], [300, 0], [420, 1]] : [[196, 1]];
  mugs.forEach(([mx, st], i) => { s += `<path d="M${mx - 14},${866} L${mx - 16},${830} L${mx + 16},${830} L${mx + 14},${866}Z" fill="${['#e8e2d6', '#c84a3a', '#3a6a9a'][i]}"/><path d="M${mx + 15},838 q14,2 12,14 q-2,8 -12,6" stroke="${['#e8e2d6', '#c84a3a', '#3a6a9a'][i]}" stroke-width="5" fill="none"/><ellipse cx="${mx}" cy="830" rx="16" ry="4" fill="#3a2214"/><path d="M${mx - 14},834 L${mx - 13},862" stroke="#fff" stroke-opacity=".3" stroke-width="3"/>` +
    (st && !mess ? Array.from({ length: 3 }, (_, q) => { const p = pmod(t * .45 + q / 3, 1); return `<path d="M${mx - 6 + q * 6},${826 - p * 50} q${6 * Math.sin(t * 2 + q)},-10 0,-20" stroke="#fff" stroke-width="3" fill="none" opacity="${(.35 * Math.sin(p * Math.PI)).toFixed(2)}" stroke-linecap="round"/>`; }).join('') : ''); });
  if (!o.noBook) s += `<path d="M370,860 L410,848 L448,860 L448,866 L370,866Z" fill="#f4efe2"/><path d="M410,848 L410,864" stroke="#b8ae98" stroke-width="1.5"/>` + [0, 1, 2, 3].map(q => `<path d="M${378 + q * 2},${858 - q * 2.2} l26,-7 M${416 + q * 2},${851 + q * 2.2} l24,6" stroke="#9a9488" stroke-width="1"/>`).join('');
  if (mess) { const r = RS(5); for (let i = 0; i < 7; i++) { const px = 40 + r() * 600, py = 1050 + r() * 190, a = r() * 50 - 25, w = 46 + r() * 16, k = (py - 1000) / 280;
    s += `<g transform="translate(${px.toFixed(1)},${py.toFixed(1)}) scale(${(.8 + .5 * k).toFixed(2)},${(.36 + .2 * k).toFixed(2)}) rotate(${a.toFixed(1)})"><rect x="${(-w / 2 + 3).toFixed(1)}" y="-29" width="${w.toFixed(1)}" height="62" fill="#000" opacity=".22"/><rect x="${(-w / 2).toFixed(1)}" y="-32" width="${w.toFixed(1)}" height="62" fill="#f4f0e6"/>` + [0, 1, 2, 3, 4, 5].map(q => `<path d="M${(-w / 2 + 6).toFixed(1)},${-22 + q * 9} h${(w - 14 - (q % 3) * 6).toFixed(1)}" stroke="#8a90a8" stroke-width="2" opacity=".6"/>`).join('') + `</g>`; }
    for (let i = 0; i < 5; i++) { const px = 60 + r() * 520, py = 1100 + r() * 140; s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="11" fill="#e8e4da"/><path d="M${(px - 7).toFixed(1)},${(py - 3).toFixed(1)} l6,4 l5,-6 M${(px - 3).toFixed(1)},${(py + 5).toFixed(1)} l7,-2" stroke="#a8a294" stroke-width="1.4" fill="none"/>`; } }
  return s;
}
function clockW(cx, cy, R, hh, mm) {
  const ha = (hh % 12 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, ma = mm / 60 * Math.PI * 2 - Math.PI / 2;
  return `<circle cx="${cx + 3}" cy="${cy + 4}" r="${R + 2}" fill="#000" opacity=".25" filter="url(#blur2)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a2a30"/><circle cx="${cx}" cy="${cy}" r="${R - 5}" fill="#f6f2e8"/>` +
    Array.from({ length: 12 }, (_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M${(cx + Math.cos(a) * (R - 9)).toFixed(1)},${(cy + Math.sin(a) * (R - 9)).toFixed(1)} L${(cx + Math.cos(a) * (R - 15)).toFixed(1)},${(cy + Math.sin(a) * (R - 15)).toFixed(1)}" stroke="#333" stroke-width="${i % 3 ? 1.5 : 3}"/>`; }).join('') +
    `<path d="M${cx},${cy} L${(cx + Math.cos(ha) * R * .48).toFixed(1)},${(cy + Math.sin(ha) * R * .48).toFixed(1)}" stroke="#1a1a1a" stroke-width="4.5" stroke-linecap="round"/><path d="M${cx},${cy} L${(cx + Math.cos(ma) * R * .72).toFixed(1)},${(cy + Math.sin(ma) * R * .72).toFixed(1)}" stroke="#1a1a1a" stroke-width="2.6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="3.5" fill="#c0392b"/>` +
    `<path d="M${cx - R * .6},${cy - R * .55} A${R * .8},${R * .8} 0 0 1 ${cx + R * .2},${cy - R * .78}" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>`;
}
function calendar(x, y, n, flip = 0) {
  return `<rect x="${x + 3}" y="${y + 4}" width="92" height="112" fill="#000" opacity=".22" filter="url(#blur2)"/><rect x="${x}" y="${y}" width="92" height="112" fill="#f8f4ea"/><rect x="${x}" y="${y}" width="92" height="28" fill="#c0392b"/>` +
    [0, 1, 2, 3, 4].map(i => `<circle cx="${x + 14 + i * 16}" cy="${y + 2}" r="3" fill="#555"/>`).join('') +
    `<text x="${x + 46}" y="${y + 21}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="16" fill="#fff">اليوم</text>` +
    `<text x="${x + 46}" y="${y + 92}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${n >= 10 ? 52 : 60}" fill="#2a2a2a">${AR(n)}</text>` +
    (flip > 0 && flip < 1 ? `<path d="M${x},${y + 28} L${x + 92},${y + 28} L${x + 92 - flip * 30},${y + 28 + 84 * (1 - flip)} L${x + flip * 30},${y + 28 + 84 * (1 - flip)}Z" fill="#fff" opacity="${(1 - flip).toFixed(2)}"/>` : '');
}
function picture(x, y) {
  return `<rect x="${x + 4}" y="${y + 6}" width="200" height="140" fill="#000" opacity=".25" filter="url(#blur2)"/><rect x="${x}" y="${y}" width="200" height="140" fill="#3a2a1e"/><rect x="${x + 10}" y="${y + 10}" width="180" height="120" fill="#efe6d4"/>` +
    `<defs><clipPath id="pic"><rect x="${x + 22}" y="${y + 22}" width="156" height="96"/></clipPath><linearGradient id="picS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a868"/><stop offset="1" stop-color="#f8dcb0"/></linearGradient></defs>` +
    `<g clip-path="url(#pic)"><rect x="${x + 22}" y="${y + 22}" width="156" height="96" fill="url(#picS)"/><circle cx="${x + 130}" cy="${y + 56}" r="13" fill="#fff4d8"/><path d="M${x + 22},${y + 118} L${x + 22},${y + 84} L${x + 60},${y + 52} L${x + 92},${y + 80} L${x + 120},${y + 62} L${x + 178},${y + 98} L${x + 178},${y + 118}Z" fill="#6a5a7a"/><path d="M${x + 60},${y + 52} L${x + 70},${y + 62} L${x + 64},${y + 60} L${x + 54},${y + 58}Z" fill="#fff" opacity=".8"/><path d="M${x + 22},${y + 118} L${x + 22},${y + 100} Q${x + 90},${y + 86} ${x + 178},${y + 106} L${x + 178},${y + 118}Z" fill="#3a4a3a"/></g>` +
    `<path d="M${x + 10},${y + 10} L${x + 70},${y + 10} L${x + 10},${y + 70}Z" fill="#fff" opacity=".12"/>`;
}
const hlab = n => n === 1 ? 'ساعة واحدة' : n === 2 ? 'ساعتان' : AR(n) + ' ' + hrs(n);
const hrs = n => n === 1 ? 'ساعة' : n === 2 ? 'ساعتان' : n >= 3 && n <= 10 ? 'ساعات' : 'ساعة';
function lampD(x, base, h) {
  return `<ellipse cx="${x + 6}" cy="${base + 2}" rx="18" ry="5" fill="#000" opacity=".3"/><rect x="${x - 9}" y="${base - 26}" width="18" height="26" rx="3" fill="#3e444c"/><rect x="${x - 4}" y="${base - h}" width="8" height="${h - 24}" fill="#4a525c"/><rect x="${x - 4}" y="${base - h}" width="3" height="${h - 24}" fill="#fff" opacity=".18"/>` +
    `<path d="M${x},${base - h + 4} q0,-24 34,-22 l30,0" stroke="#4a525c" stroke-width="6" fill="none"/><path d="M${x + 50},${base - h - 18} l30,0 l-6,14 l-18,0Z" fill="#3a4048"/><rect x="${x + 56}" y="${base - h - 4}" width="18" height="5" rx="2" fill="#f4ead0"/>`;
}
function room(t, o = {}) {
  const N = o.N ?? 1, id = o.id || 'r';
  let s = `<defs>${DEFN()}${mulF('nf' + id, N * .92)}</defs>` + outside(t, N, id, WX, WY, WWd, WHt);
  // wall with the window hole, then frame, curtains, clock, calendar
  let g = `<path d="M-200,-200 H920 V1012 H-200Z M${WX},${WY} V${WY + WHt} H${WX + WWd} V${WY}Z" fill-rule="evenodd" fill="#d6c4a2"/>` +
    `<path d="M-200,-200 H920 V1012 H-200Z M${WX},${WY} V${WY + WHt} H${WX + WWd} V${WY}Z" fill-rule="evenodd" fill="#fff" filter="url(#wallI)" opacity=".35"/>` +
    `<rect x="-20" y="-20" width="760" height="1032" fill="url(#aoUp)" opacity=".25"/>` +
    `<rect x="-20" y="992" width="760" height="22" fill="#efe6d2"/><rect x="-20" y="992" width="760" height="4" fill="#fff" opacity=".5"/>`;
  g += `<rect x="${WX - 14}" y="${WY - 14}" width="${WWd + 28}" height="${WHt + 28}" fill="none" stroke="#f2ece0" stroke-width="14"/><path d="M${WX + WWd / 2},${WY} V${WY + WHt} M${WX},${WY + WHt * .42} H${WX + WWd}" stroke="#f2ece0" stroke-width="9"/>` +
    `<path d="M${WX + 8},${WY + WHt - 8} L${WX + WWd * .45},${WY + 8}" stroke="#fff" stroke-width="22" opacity=".06"/><rect x="${WX - 30}" y="${WY + WHt + 12}" width="${WWd + 60}" height="14" fill="#f6f0e4"/><rect x="${WX - 30}" y="${WY + WHt + 26}" width="${WWd + 60}" height="6" fill="#000" opacity=".2"/>`;
  [[WX - 64, 70], [WX + WWd - 6, 70]].forEach(([cx, cw]) => { g += `<rect x="${cx}" y="${WY - 40}" width="${cw}" height="${WHt + 110}" fill="url(#curG)"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${cx + 7 + q * 14},${WY - 40} V${WY + WHt + 70}" stroke="#000" stroke-opacity=".16" stroke-width="3"/>`).join('') + `<rect x="${cx}" y="${WY - 40}" width="${cw}" height="${WHt + 110}" fill="#000" filter="url(#grainR)" opacity=".2"/>`; });
  g += `<rect x="${WX - 90}" y="${WY - 50}" width="${WWd + 180}" height="8" rx="4" fill="#5a4a3a"/>`;
  g += picture(56, 404) + clockW(104, 676, 46, o.hh ?? 2, o.mm ?? 40) + calendar(214, 618, o.day || 1, o.flip || 0);
  // floor: planks in perspective, rug
  g += `<rect x="-200" y="1014" width="1120" height="300" fill="url(#woodG)"/><rect x="-20" y="1014" width="760" height="280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let q = 0; q < 9; q++) { const yy = 1014 + q * q * 3.4 + q * 6; g += `<path d="M-20,${yy.toFixed(1)} H740" stroke="#4a3020" stroke-width="${(1 + q * .15).toFixed(1)}" opacity=".55"/>`; }
  for (let q = -6; q < 14; q++) g += `<path d="M${360 + q * 70},1014 L${360 + q * 150},1290" stroke="#4a3020" stroke-width="1.2" opacity=".35"/>`;
  g += `<rect x="-20" y="1014" width="760" height="20" fill="url(#aoDn)" opacity=".6"/><ellipse cx="420" cy="1150" rx="300" ry="70" fill="#6a2e34"/><ellipse cx="420" cy="1150" rx="282" ry="60" fill="none" stroke="#d8b878" stroke-width="5" stroke-dasharray="14 8"/><ellipse cx="420" cy="1150" rx="300" ry="70" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<g filter="url(#nf${id})">${g}${o.mid ? o.mid : ''}</g>`;
  return s;
}
// light layers drawn over the filtered room: lamp pool, window light (day), screen glow
const lampLight = (N, a = 1) => N > .02 ? scr(`<circle cx="170" cy="840" r="330" fill="url(#lampW)" opacity="${(N * a * .9).toFixed(2)}"/><path d="M146,770 L206,782 L330,868 L40,868Z" fill="#ffd89a" opacity="${(N * a * .14).toFixed(2)}" filter="url(#soft)"/>`) + `<ellipse cx="166" cy="772" rx="24" ry="6" fill="#fff8e0" opacity="${(N * a).toFixed(2)}" transform="rotate(15,166,772)"/>` : '';
const sunBeam = (D) => D > .02 ? scr(`<path d="M${WX},${WY + WHt} L${WX + WWd},${WY + WHt} L${WX + WWd - 120},1280 L${WX - 330},1280Z" fill="url(#beamG)" opacity="${(.45 * D).toFixed(2)}"/>`) : '';
function chair(x, y, s, f = -1) { // back on the far side from the face
  const bx = x - f * 44 * s;
  return `<rect x="${bx - 6 * s}" y="${y - 250 * s}" width="${12 * s}" height="${250 * s}" fill="#3a2c22"/><rect x="${bx - 12 * s}" y="${y - 250 * s}" width="${24 * s}" height="${70 * s}" rx="${6 * s}" fill="#4a382a"/>` +
    `<rect x="${x - 54 * s}" y="${y - 82 * s}" width="${108 * s}" height="${12 * s}" rx="${3 * s}" fill="#5a4432"/><rect x="${x - 50 * s}" y="${y - 70 * s}" width="${8 * s}" height="${70 * s}" fill="#3a2c22"/><rect x="${x + 42 * s}" y="${y - 70 * s}" width="${8 * s}" height="${70 * s}" fill="#3a2c22"/>`;
}
// the seated, tired person (YOU) at the desk, facing left
const SIT = (x, y, s, o = {}) => hero(x, y, Object.assign({ s, face: -1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1 }, YOU, o));

// ---------- the brain in a head profile ----------
const HEADP = 'M250,1130 C245,1010 230,930 222,860 C190,700 200,520 300,440 C380,375 500,395 545,470 C568,515 572,570 562,610 C566,640 580,670 606,712 C612,724 600,736 576,742 C582,752 584,764 578,774 C572,782 566,788 570,796 C578,806 576,820 566,836 C562,856 556,872 540,884 C512,900 482,904 462,915 L456,1130 Z';
const BRAINP = 'M246,604 C232,512 296,450 386,446 C474,442 538,490 540,560 C543,620 508,650 468,656 C430,662 410,690 378,690 C338,690 318,666 290,662 C258,656 248,632 246,604Z';
const SULCI = (() => { const r = RS(404), o = []; for (let i = 0; i < 26; i++) { let x = 260 + r() * 270, y = 462 + r() * 190, a = r() * 6.28, d = `M${x.toFixed(1)},${y.toFixed(1)}`;
  for (let k = 0; k < 6; k++) { a += (r() - .5) * 2.2; const nx = x + Math.cos(a) * 16, ny = y + Math.sin(a) * 12; d += ` Q${(x + Math.cos(a + 1.2) * 9).toFixed(1)},${(y + Math.sin(a + 1.2) * 9).toFixed(1)} ${nx.toFixed(1)},${ny.toFixed(1)}`; x = nx; y = ny; } o.push(d); } return o; })();
const WASTE = (() => { const r = RS(405), o = []; for (let i = 0; i < 46; i++) { const a = r() * 6.28, d = Math.sqrt(r()); o.push([392 + Math.cos(a) * d * 130, 560 + Math.sin(a) * d * 85, 2.5 + r() * 3.5, r()]); } return o; })();
function brainSVG(clean, clog, t, glowEye) {
  let s = `<defs><clipPath id="brC"><path d="${BRAINP}"/></clipPath></defs>`;
  s += `<path d="${HEADP}" fill="url(#headG)"/><path d="${HEADP}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    // ear, eye, brow, lips line, the hair cap
    `<path d="M300,440 C380,375 500,395 545,470 C520,440 470,420 410,420 C350,422 300,460 262,520 C258,490 270,460 300,440Z" fill="#2a1e18"/>` +
    `<path d="M520,606 q18,-8 34,2" stroke="#2a1e18" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    (glowEye ? `<path d="M518,628 q16,-12 32,0 q-16,10 -32,0Z" fill="#f4eee6"/><circle cx="536" cy="628" r="6" fill="#3a2210"/><circle cx="538" cy="626" r="1.6" fill="#fff"/>` : `<path d="M518,630 q16,8 32,0" stroke="#3a2418" stroke-width="3.5" fill="none" stroke-linecap="round"/>`) +
    `<path d="M566,786 q8,3 12,-1" stroke="#7a3a2a" stroke-width="3" fill="none"/>`;
  // skull cavity and brain
  s += `<path d="M232,604 C214,500 290,428 388,428 C486,426 556,482 556,562 C558,630 520,668 472,672 C432,676 412,706 376,706 C330,706 306,682 280,676 C246,668 234,640 232,604Z" fill="#3a1a1e" opacity=".55"/>`;
  s += `<path d="M360,684 C356,730 368,780 390,830 L426,824 C408,780 398,730 402,684Z" fill="#c88a8c"/><ellipse cx="300" cy="676" rx="54" ry="30" fill="url(#cereG)"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${256 + q * 3},${662 + q * 6} q44,-6 88,${2 + q}" stroke="#7a3a44" stroke-width="1.6" fill="none" opacity=".6"/>`).join('');
  s += `<path d="${BRAINP}" fill="url(#brainG)"/><g clip-path="url(#brC)">` + SULCI.map(d => `<path d="${d}" stroke="#9a4a56" stroke-width="3.2" fill="none" stroke-linecap="round" opacity=".75"/><path d="${d}" stroke="#ffe4e2" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".45" transform="translate(-2,-2)"/>`).join('') +
    `<path d="M300,530 C350,560 420,548 470,600" stroke="#8a3a48" stroke-width="5" fill="none" opacity=".7"/>`;
  // night: the brain's washing fluid flows along the folds and carries the waste out
  if (clean > 0) { s += `<g opacity="${clean.toFixed(2)}">` + SULCI.map((d, i) => `<path d="${d}" stroke="#7fd4ff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-dasharray="10 16" stroke-dashoffset="${(-t * 40 - i * 7).toFixed(1)}" opacity=".85"/>`).join('') + `</g>`; }
  s += `</g><path d="${BRAINP}" fill="none" stroke="#8a3a48" stroke-width="3"/>`;
  // waste: gold specks leave at night; brown clumps grow when awake
  WASTE.forEach(([x, y, r, k], i) => {
    const out = clamp((clean * 1.6 - k * .6)), tx = lerp(x, 404, out), ty = lerp(y, 840, out * out), a = (1 - out) * (clog > 0 ? 0 : 1);
    if (a > .02) s += `<circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="${r.toFixed(1)}" fill="#f4c76b" opacity="${(a * .95).toFixed(2)}"/>`;
    const g = clamp(clog * 1.5 - k * .5); if (g > 0) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * (.6 + 1.6 * g)).toFixed(1)}" fill="url(#clumpG)" opacity="${(.95 * Math.min(1, g * 2)).toFixed(2)}"/><circle cx="${(x - r * .4).toFixed(1)}" cy="${(y - r * .4).toFixed(1)}" r="${(r * .5 * g).toFixed(1)}" fill="#f0d090" opacity=".5"/>`; });
  if (clean > 0) for (let i = 0; i < 8; i++) { const p = pmod(t * .5 + i / 8, 1); s += `<circle cx="${(404 + Math.sin(p * 9 + i) * 6).toFixed(1)}" cy="${(700 + p * 260).toFixed(1)}" r="4" fill="#f4c76b" opacity="${(clean * (1 - p)).toFixed(2)}"/>`; }
  return s;
}

// ---------- a big, tired, open eye (the microsleep) ----------
function bigEye(cx, cy, w, open, red) {
  const h = w * .4 * open, r = RS(31);
  let s = `<defs><clipPath id="eyC"><path d="M${cx - w / 2},${cy} Q${cx - w * .1},${cy - h * 1.35} ${cx + w / 2},${cy - h * .1} Q${cx},${cy + h * 1.15} ${cx - w / 2},${cy}Z"/></clipPath></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${w * .9}" ry="${w * .62}" fill="#c89070"/><ellipse cx="${cx}" cy="${cy + w * .2}" rx="${w * .6}" ry="${w * .22}" fill="#6a3448" opacity="${(.35 * red).toFixed(2)}" filter="url(#blur12)"/>` +
    `<path d="M${cx - w * .7},${cy - w * .38} Q${cx},${cy - w * .62} ${cx + w * .7},${cy - w * .36}" stroke="#2a1e18" stroke-width="${w * .08}" fill="none" stroke-linecap="round"/>`;
  s += `<g clip-path="url(#eyC)"><rect x="${cx - w}" y="${cy - w}" width="${w * 2}" height="${w * 2}" fill="url(#scleraG)"/>` +
    Array.from({ length: 14 }, (_, i) => { const sd = i < 7 ? -1 : 1, y0 = cy + (r() - .5) * h, x0 = cx + sd * w * .5; let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`, x = x0, y = y0; for (let k = 0; k < 4; k++) { x -= sd * w * (.05 + r() * .05); y += (r() - .5) * w * .06; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } return `<path d="${d}" stroke="#c0303a" stroke-width="${(1 + r() * 1.2).toFixed(1)}" fill="none" opacity="${(red * .7).toFixed(2)}"/>`; }).join('') +
    `<circle cx="${cx + w * .04}" cy="${cy - h * .1}" r="${w * .21}" fill="url(#irisG)"/><circle cx="${cx + w * .04}" cy="${cy - h * .1}" r="${w * .095}" fill="#080402"/>` +
    Array.from({ length: 18 }, (_, i) => { const a = i / 18 * 6.28; return `<path d="M${(cx + w * .04 + Math.cos(a) * w * .1).toFixed(1)},${(cy - h * .1 + Math.sin(a) * w * .1).toFixed(1)} L${(cx + w * .04 + Math.cos(a) * w * .2).toFixed(1)},${(cy - h * .1 + Math.sin(a) * w * .2).toFixed(1)}" stroke="#c89a50" stroke-width="1.2" opacity=".35"/>`; }).join('') +
    `<circle cx="${cx + w * .1}" cy="${cy - h * .3}" r="${w * .04}" fill="#fff" opacity=".9"/><path d="M${cx - w / 2},${cy - h * .6} Q${cx},${cy - h * 1.4} ${cx + w / 2},${cy - h * .6} L${cx + w / 2},${cy - h * 2} L${cx - w / 2},${cy - h * 2}Z" fill="#000" opacity=".22"/></g>` +
    `<path d="M${cx - w / 2},${cy} Q${cx - w * .1},${cy - h * 1.35} ${cx + w / 2},${cy - h * .1}" stroke="#3a2418" stroke-width="${w * .035}" fill="none"/>` +
    Array.from({ length: 9 }, (_, i) => { const k = (i + 1) / 10, x = lerp(cx - w * .45, cx + w * .45, k), y = cy - h * 1.2 * Math.sin(k * Math.PI) * .9; return `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w * .02).toFixed(1)},${(-w * .06).toFixed(1)} ${(w * .05).toFixed(1)},${(-w * .08).toFixed(1)}" stroke="#1a0e08" stroke-width="2" fill="none"/>`; }).join('') +
    `<path d="M${cx - w * .48},${cy + h * .2} Q${cx},${cy + h * 1.3} ${cx + w * .48},${cy}" stroke="#8a4a3a" stroke-width="${w * .02}" fill="none" opacity=".6"/>`;
  return s;
}
function virus(x, y, R, rot, a) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="rotate(${rot.toFixed(1)},${x.toFixed(1)},${y.toFixed(1)})">`;
  for (let i = 0; i < 12; i++) { const q = i / 12 * 6.28; s += `<path d="M${(x + Math.cos(q) * R).toFixed(1)},${(y + Math.sin(q) * R).toFixed(1)} L${(x + Math.cos(q) * R * 1.45).toFixed(1)},${(y + Math.sin(q) * R * 1.45).toFixed(1)}" stroke="#4a7a3a" stroke-width="${(R * .14).toFixed(1)}"/><circle cx="${(x + Math.cos(q) * R * 1.5).toFixed(1)}" cy="${(y + Math.sin(q) * R * 1.5).toFixed(1)}" r="${(R * .16).toFixed(1)}" fill="#c84a3a"/>`; }
  return s + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#virG)"/><circle cx="${(x - R * .3).toFixed(1)}" cy="${(y - R * .3).toFixed(1)}" r="${(R * .25).toFixed(1)}" fill="#fff" opacity=".35"/></g>`;
}

// ---------- the street of this video: five new buildings, new shops; day or night ----------
function blockN(x, base, w, h, col, seed, kind = 0) {
  const r = RS(seed), top = base - h, sw = w * .12, trim = mix(col, '#ffffff', .45), dk = mix(col, '#000000', .42);
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${col}"/>` + (kind === 1 ? `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#brk)"/>` : '') +
    `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".32"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#sunSide)"/>` +
    `<path d="M${x + w},${top} l${sw},${-sw * .4} l0,${h} l${-sw},${sw * .4}Z" fill="${dk}"/><path d="M${x},${top} l${sw},${-sw * .4} l${w},0 l${-sw},${sw * .4}Z" fill="${mix(col, '#ffffff', .3)}"/>` +
    `<rect x="${x - 4}" y="${top - 8}" width="${w + 8}" height="12" fill="${trim}"/><rect x="${x - 4}" y="${top + 4}" width="${w + 8}" height="5" fill="#000" opacity=".26"/>`;
  let e = '';
  const fh = kind === 2 ? 44 : 54, rows = Math.floor((h - 128) / fh), cols = Math.max(2, Math.round(w / (kind === 2 ? 75 : 46))), cw = w / cols;
  for (let i = 0; i < rows; i++) { const wy = top + 22 + i * fh;
    if (kind === 0) s += `<rect x="${x}" y="${wy + 40}" width="${w}" height="4" fill="${trim}" opacity=".6"/><rect x="${x}" y="${wy + 44}" width="${w}" height="2" fill="#000" opacity=".18"/>`;
    if (kind === 2) { s += `<rect x="${x + 6}" y="${wy}" width="${w - 12}" height="26" fill="#4a6a88"/><path d="M${x + 6},${wy + 22} L${x + w * .5},${wy} L${x + w * .62},${wy} L${x + 6},${wy + 26}Z" fill="#cfe6f8" opacity=".3"/><rect x="${x + 4}" y="${wy + 26}" width="${w - 8}" height="5" fill="${trim}"/>`; }
    for (let j = 0; j < cols; j++) { const wx = x + j * cw + cw / 2, lit = r() < .45, cur = r(), ww = kind === 2 ? cw - 6 : Math.min(24, cw * .52), wh = kind === 2 ? 26 : 32;
      if (kind === 2) { s += `<path d="M${wx + cw / 2},${wy} v26" stroke="${trim}" stroke-width="2"/>`; if (lit) e += `<rect x="${(wx - ww / 2).toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="26" fill="#ffd590" opacity="${(.75 + .25 * cur).toFixed(2)}"/>`; continue; }
      const arch = kind === 1 ? `<path d="M${wx - ww / 2},${wy + 8} A${ww / 2},${ww / 2 * .7} 0 0 1 ${wx + ww / 2},${wy + 8} Z" fill="#48688a"/>` : '';
      s += `<rect x="${wx - ww / 2 - 3}" y="${wy - 3}" width="${ww + 6}" height="${wh + 6}" fill="${trim}"/><rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" fill="#48688a"/>${arch}<path d="M${wx - ww / 2},${wy + wh * .7} L${wx - ww / 2},${wy} L${wx + ww * .2},${wy}Z" fill="#cfe6f8" opacity=".35"/><path d="M${wx},${wy} v${wh}" stroke="${trim}" stroke-width="1.6"/>` +
        `<rect x="${wx - ww / 2 - 5}" y="${wy + wh + 2}" width="${ww + 10}" height="4" fill="${trim}"/><rect x="${wx - ww / 2 - 4}" y="${wy + wh + 6}" width="${ww + 8}" height="3" fill="#000" opacity=".22"/>` +
        (cur < .3 ? `<rect x="${wx - ww / 2}" y="${wy}" width="${ww * .35}" height="${wh}" fill="#e8dcc0" opacity=".85"/>` : '') + (kind === 0 && cur > .82 ? `<rect x="${wx + ww / 2 + 3}" y="${wy + wh - 14}" width="16" height="12" fill="#e4e4e0"/><path d="M${wx + ww / 2 + 5},${wy + wh - 8} h12" stroke="#999" stroke-width="1"/>` : '');
      if (lit) e += `<rect x="${wx - ww / 2}" y="${wy}" width="${ww}" height="${wh}" fill="${cur < .5 ? '#ffd27e' : '#ffe3b0'}" opacity="${(.8 + .2 * cur).toFixed(2)}"/>` + (cur < .3 ? `<rect x="${wx - ww / 2}" y="${wy}" width="${ww * .35}" height="${wh}" fill="#c87a3a" opacity=".55"/>` : '') + (cur > .9 ? `<ellipse cx="${wx + 3}" cy="${wy + wh - 6}" rx="5" ry="9" fill="#5a3a20" opacity=".7"/><circle cx="${wx + 3}" cy="${wy + wh - 18}" r="4" fill="#5a3a20" opacity=".7"/>` : ''); } }
  if (kind !== 2) s += roofKit(x, top - 8, w, seed);
  else s += `<rect x="${x + w * .2}" y="${top - 30}" width="${w * .5}" height="22" fill="#a8b0b8"/><rect x="${x + w * .2}" y="${top - 30}" width="${w * .5}" height="4" fill="#fff" opacity=".3"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${x + w * .24 + q * w * .1},${top - 26} v16" stroke="#7a828a" stroke-width="2"/>`).join('');
  return { s, e };
}
const SHOPN = [[-4, 150, 'حلويات', '#a8456a'], [158, 128, 'عطور', '#6a4a9a'], [298, 146, 'خضار', '#3f8a3a'], [456, 118, 'كتب', '#2a6a9a'], [586, 150, 'ملابس', '#b8642a']];
function shopRowN(PV) {
  let s = '', e = '';
  SHOPN.forEach(([sx, sw, name, c], i) => { const r = RS(i + 161), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`;
    e += `<rect x="${gx}" y="${PV - 72}" width="${gw}" height="66" fill="#ffd9a0" opacity=".42"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${mix(c, '#ffffff', .2)}" opacity=".7"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${gx},${PV} L${gx + gw},${PV} L${gx + gw + 30},${PV + 90} L${gx - 30},${PV + 90}Z" fill="#ffcf8a" opacity=".16" filter="url(#soft)"/>`; });
  return { s, e };
}
const PV = 1000, KB = 1104;
// o: {N (0 day..1 night), id, cars, fg: extra svg inside the filtered group, warp: displacement scale}
function street2(t, o = {}) {
  const N = o.N || 0, id = o.id || 's';
  const sky = [mix('#3a6fb8', '#060c24', N), mix('#93bbe2', '#16224a', N), mix('#ebe3d0', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .92)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>` +
    (o.warp ? `<filter id="wp${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${(.008 + .002 * Math.sin(t * 1.3)).toFixed(4)} ${(.016 + .003 * Math.cos(t * 1.1)).toFixed(4)}" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${o.warp.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>` : '') +
    `</defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(12); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 760).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    s += `<circle cx="560" cy="430" r="90" fill="#fff8e0" opacity="${(.14 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(560, 430, 30, N); }
  if (N < .98) s += `<circle cx="150" cy="470" r="150" fill="#fff6d0" opacity="${(.28 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="150" cy="470" r="30" fill="#fffdf2" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(230 + t * 1.2, 430, 230, 13, { a: .9 * (1 - N) }) + cumulus(560 + t * .8, 560, 170, 15, { a: .8 * (1 - N) });
  let g = farCity(34, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-10, 168, 330, '#d9c39c', 341, 0], [158, 142, 430, '#8e5a44', 342, 1], [300, 154, 372, '#a7aeb4', 343, 2], [454, 132, 300, '#c98f6a', 344, 0], [586, 150, 398, '#6f8a7c', 345, 1]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowN(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  [[110, 290, 7], [600, 262, 9]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// ===================== scenes =====================
const SHOPB = [[-4, 150, 'خضار', '#3f8a3a'], [158, 128, 'دراجات', '#c86a2a'], [298, 146, 'مطعم', '#9a2a2a'], [456, 118, 'ساعات', '#5a4a8a'], [586, 150, 'أحذية', '#2a6a8a']];
function shopRowB(PV) {
  let s = '', e = '';
  SHOPB.forEach(([sx, sw, name, c], i) => { const r = RS(i + 361), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`;
    e += `<rect x="${gx}" y="${PV - 72}" width="${gw}" height="66" fill="#ffd9a0" opacity=".42"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${mix(c, '#ffffff', .2)}" opacity=".7"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${gx},${PV} L${gx + gw},${PV} L${gx + gw + 30},${PV + 90} L${gx - 30},${PV + 90}Z" fill="#ffcf8a" opacity=".16" filter="url(#soft)"/>`; });
  return { s, e };
}
function street3(t, o = {}) {
  const N = o.N || 0, id = o.id || 's';
  const sky = [mix('#3a6fb8', '#060c24', N), mix('#93bbe2', '#16224a', N), mix('#ebe3d0', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .92)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>` +
    (o.warp ? `<filter id="wp${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${(.008 + .002 * Math.sin(t * 1.3)).toFixed(4)} ${(.016 + .003 * Math.cos(t * 1.1)).toFixed(4)}" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${o.warp.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>` : '') +
    `</defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(12); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 760).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    s += `<circle cx="560" cy="430" r="90" fill="#fff8e0" opacity="${(.14 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(560, 430, 30, N); }
  if (N < .98) s += `<circle cx="150" cy="470" r="150" fill="#fff6d0" opacity="${(.28 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="150" cy="470" r="30" fill="#fffdf2" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(230 + t * 1.2, 430, 230, 13, { a: .9 * (1 - N) }) + cumulus(560 + t * .8, 560, 170, 15, { a: .8 * (1 - N) });
  let g = farCity(34, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-10, 160, 340, '#c7a77e', 611, 1], [150, 150, 440, '#8aa0b4', 612, 2], [300, 150, 300, '#b48a6a', 613, 0], [450, 140, 420, '#d0c4ae', 614, 1], [590, 150, 360, '#7e9a86', 615, 2]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowB(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  [[110, 280, 31], [600, 300, 33]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// ===================== scenes =====================
// ===================== "what if the wheel was never invented?" (Short #36) =====================
const glB = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * (o.sp ?? .03), Ld = sunFor((o.az ?? .25) + t * .02, o.off ?? -.6, o.up ?? .5), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]);
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; F.earth = null; F.moon = null; F.sun = null;
  return { cam, spin, cN, c0 }; };
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

// a solid wooden wheel of three planks with battens and a hub (the oldest kind)
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
// a bladed wheel seen from the front (jet fan or turbine runner), spinning
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

// 0: the Earth, and the first wheel crumbles to dust
function sceneHook(t) {
  glB(t, { d: 8.4, az: .1, spin: 3.7, sp: .05, lights: .5, el: .3 });
  const k = ramp(t, WS(0, 5) - .1, WS(0, 5) + 1.1), a = 1 - ease(clamp(k * 1.6));
  F.ov = `<defs>${WHDEF}</defs>` + woodWheel(360, 1010, 150, -t * 70, a, 'wh0') + `<defs>${SDEF}</defs>` + dust(360, 1010, k, 3, 40, 260);
  return space(t);
}

// 1: 5,500 years ago: an ox pulls a cart on solid wheels; then the wheels vanish and the cart drops
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
function scenePast(t) {
  const T = t - S0(1) + .2, gone = ramp(t, WS(1, 11) - .2, WS(1, 14) + .4), wa = 1 - ease(clamp(gone * 1.5)), drop = ease(ramp(t, WS(1, 12), WS(1, 14) + .2));
  const x = 170 + Math.min(T, WS(1, 12) - S0(1) + .2) * 26, ph = Math.min(T, WS(1, 12) - S0(1) + .2) * 3;
  let s = plain(t) + oxCart(x, 1110, t, wa, drop, ph) + dust(x - 50, 1064, gone, 7, 26, 120);
  // the driver walking beside, stick in hand
  s += hero(x + 355, 1150, Object.assign({ s: .62, face: 1, shade: 1, walk: drop < .5 ? ph * 1.6 : null, amp: .45 }, { top: '#c8b48a', pants: '#8a7454', skin: '#b07a55', hair: '#2a1e18' }));
  noEarth(); F.ov = ''; return s;
}

// 2: no cars, no bikes, no trains: they all vanish from the street
function bike(x, y, s, col) {
  return `<g transform="translate(${x},${y}) scale(${s})"><circle cx="-40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="40" cy="-24" r="24" fill="none" stroke="#1a1a1e" stroke-width="5"/><circle cx="-40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/><circle cx="40" cy="-24" r="20" fill="none" stroke="#9aa0a8" stroke-width="1"/>` +
    `<path d="M-40,-24 L-10,-24 L20,-58 L-20,-58 Z M-10,-24 L-22,-64 M20,-58 L40,-24 M18,-58 L22,-72" stroke="${col}" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M-30,-66 h18" stroke="#1a1a1e" stroke-width="6" stroke-linecap="round"/><path d="M14,-72 h16" stroke="#1a1a1e" stroke-width="4" stroke-linecap="round"/><circle cx="-10" cy="-24" r="5" fill="#3a3a40"/></g>`;
}
function tramCar(x, y, len) {
  return `<rect x="${x}" y="${y - 70}" width="${len}" height="62" rx="12" fill="#e8e4dc"/><rect x="${x}" y="${y - 30}" width="${len}" height="10" fill="#c83a2a"/><rect x="${x}" y="${y - 70}" width="${len}" height="8" rx="4" fill="#fff" opacity=".5"/>` +
    Array.from({ length: Math.floor(len / 34) }, (_, i) => `<rect x="${x + 10 + i * 34}" y="${y - 60}" width="24" height="24" rx="3" fill="#3a5a7a"/><path d="M${x + 12 + i * 34},${y - 40} L${x + 26 + i * 34},${y - 60}" stroke="#fff" stroke-width="3" opacity=".25"/>`).join('') +
    `<rect x="${x}" y="${y - 8}" width="${len}" height="6" fill="#3a3a40"/>`;
}
function sceneCars(t) {
  const T = t - S0(2) + .2, vc = ramp(t, WS(2, 1), WS(2, 1) + 1), vb = ramp(t, WS(2, 3), WS(2, 3) + 1), vt = ramp(t, WS(2, 5), WS(2, 5) + 1.1);
  const ac = 1 - ease(clamp(vc * 1.6)), ab = 1 - ease(clamp(vb * 1.6)), at = 1 - ease(clamp(vt * 1.6));
  const trX = 420 - T * 110;
  let top = '';
  let fg = '';
  const p1x = 160 + T * 22; fg += hero(p1x, PV + 74, Object.assign({ s: .62, face: 1, shade: 1, walk: T * 4.4 }, YOU));
  fg += hero(610 - T * 18, PV + 84, Object.assign({ s: .6, face: -1, shade: 1, walk: T * 4.2 + 1 }, pal(1)));
  // a parked bike at the kerb
  if (ab > 0) fg += `<g opacity="${ab.toFixed(2)}">${bike(470, KB - 4, .9, '#2a7a5a')}</g>`; fg += dust(470, KB - 40, vb, 13);
  // cars moving in their lanes
  const xa = pmod(860 - T * 140, 1300) - 200, xb = pmod(-120 + T * 120, 1300) - 200, xc = 560;
  fg += `<path d="M-20,1184 H740 M-20,1170 H740" stroke="#8a8e94" stroke-width="3" opacity=".7"/>`;
  if (at > 0) fg += `<g opacity="${at.toFixed(2)}">${tramCar(trX, 1184, 200)}${tramCar(trX + 206, 1184, 200)}<path d="M${trX + 100},1114 l-30,-40 h60 M${trX + 306},1114 l-30,-40 h60" stroke="#3a3a40" stroke-width="3" fill="none"/></g>`;
  fg += dust(Math.max(60, Math.min(660, trX + 200)), 1130, vt, 11, 30, 200);
  if (ac > 0) fg += `<g opacity="${ac.toFixed(2)}">${car(xb, 1262, .9, '#2a5a8a', 1, 0)}${car(xc - T * 40, 1262, .9, '#b8322a', 1, 0)}</g>`;
  fg += dust(xb, 1226, vc, 17) + dust(xc - T * 40 + 40, 1226, vc, 19);
  let s = street3(t, { N: 0, id: 'c', fg, cars: 0 }) + top;
  noEarth(); F.ov = ''; return s;
}

// 3: planes won't fly: the heart of a jet engine is bladed wheels that turn
function sceneJet(t) {
  const T = t - S0(3) + .2, ins = ease(ramp(t, WS(3, 4) - .2, WS(3, 4) + .4)), no = ease(ramp(t, WS(3, 2) - .1, WS(3, 3) + .3));
  let s = `<defs>${DEFW()}<linearGradient id="skyJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f62a8"/><stop offset=".6" stop-color="#7fa9d6"/><stop offset="1" stop-color="#d9d6c8"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyJ)"/>` +
    `<circle cx="140" cy="250" r="120" fill="#fff6d8" opacity=".22" filter="url(#soft)"/><circle cx="140" cy="250" r="46" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="140" cy="250" r="22" fill="#fffef6"/>`;
  s += cumulus(pmod(160 - T * 30, 1000) - 150, 980, 360, 61, { a: .95 }) + cumulus(pmod(620 - T * 24, 1000) - 150, 1060, 300, 63, { a: .9 }) + cumulus(pmod(400 - T * 20, 1000) - 150, 1180, 380, 65, { a: .95 });
  const px = 360, py = 560 + Math.sin(T * .9) * 6;
  s += `<g transform="translate(${px},${py}) scale(1.15) rotate(-2)" opacity="${(1 - .35 * no).toFixed(2)}">${airliner()}</g>`;
  // the engine under the wing, circled, then the cutaway fan
  if (ins > 0) { const ex = px + 12, ey = py + 50;
    s += `<circle cx="${ex}" cy="${ey}" r="34" fill="none" stroke="#f4c76b" stroke-width="5" opacity="${ins.toFixed(2)}"/><path d="M${ex},${ey + 34} L${360},${790}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="10 8" opacity="${ins.toFixed(2)}"/>` +
      `<g opacity="${ins.toFixed(2)}">${bladeWheel(360, 960, 150 * (.6 + .4 * ins), t * 900, 22, 'url(#bladeG)')}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 4: about 90% of the world's electricity comes from giant turning wheels: turbines
function windT(x, base, h, rot, s = 1) {
  let o = `<path d="M${x - 6 * s},${base} L${x - 3 * s},${base - h} L${x + 3 * s},${base - h} L${x + 6 * s},${base}Z" fill="#e8ecf0"/><path d="M${x + 1 * s},${base} L${x + 2 * s},${base - h} L${x + 3 * s},${base - h} L${x + 6 * s},${base}Z" fill="#000" opacity=".15"/><rect x="${x - 10 * s}" y="${base - h - 8 * s}" width="${22 * s}" height="12" rx="4" fill="#e0e4e8"/>`;
  for (let k = 0; k < 3; k++) { const a = rot + k * 2.094; o += `<path d="M${x},${base - h} L${(x + Math.cos(a) * h * .55 - Math.sin(a) * 4).toFixed(1)},${(base - h + Math.sin(a) * h * .55 + Math.cos(a) * 4).toFixed(1)} L${(x + Math.cos(a) * h * .55).toFixed(1)},${(base - h + Math.sin(a) * h * .55).toFixed(1)}Z" fill="#f4f6f8" stroke="#b0b8c0" stroke-width="1.5"/>`; }
  return o + `<circle cx="${x}" cy="${base - h}" r="${5 * s}" fill="#c8ccd0"/>`;
}
function scenePower(t) {
  const T = t - S0(4), pa = ease(ramp(t, WS(4, 2) - .1, WS(4, 3) + .4)), lab = ease(ramp(t, WS(4, 13) - .2, WS(4, 13) + .3));
  let s = `<defs>${DEFW()}<radialGradient id="pwB" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#1e2a50"/><stop offset="1" stop-color="#070b1a"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#pwB)"/>`;
  // a dam with a turbine inside, a wind farm, and a steam plant (stacks) – all feeding the city by wires
  s += `<path d="M-20,1000 L740,1000 L740,1300 L-20,1300Z" fill="#1a2030"/>`;
  s += windT(90, 1000, 230, t * 1.6) + windT(190, 1000, 180, t * 1.6 + 1, .8);
  s += `<rect x="560" y="860" width="44" height="140" fill="#8a8e94"/><rect x="620" y="890" width="40" height="110" fill="#7a7e84"/><rect x="470" y="930" width="220" height="70" fill="#6a6e74"/>` +
    Array.from({ length: 5 }, (_, i) => { const p = pmod(t * .3 + i / 5, 1); return `<circle cx="${(582 + p * 30).toFixed(1)}" cy="${(850 - p * 160).toFixed(1)}" r="${(16 + p * 40).toFixed(1)}" fill="#e8ecf0" opacity="${(.35 * (1 - p)).toFixed(2)}" filter="url(#blur5)"/>`; }).join('');
  // the big turbine wheel in the middle, spinning, with sparks of electricity running to the city
  s += bladeWheel(360, 700, 210, t * 260, 16, 'url(#bronzeG)', '#e0b060');
  const wires = ['M360,920 C360,980 300,1040 250,1100', 'M360,920 C380,1000 470,1050 520,1100', 'M90,1000 C140,1050 200,1080 250,1100', 'M600,1000 C600,1050 560,1080 520,1100'];
  wires.forEach((d, i) => { s += `<path d="${d}" stroke="#3a4060" stroke-width="4" fill="none"/><path d="${d}" stroke="#ffe08a" stroke-width="4" fill="none" stroke-dasharray="6 30" stroke-dashoffset="${(-t * 120 - i * 9).toFixed(1)}"/>`; });
  // the lit city
  const r = RS(5); let city = ''; for (let i = 0; i < 9; i++) { const bx = 130 + i * 52, bh = 70 + r() * 90; city += `<rect x="${bx}" y="${1180 - bh}" width="46" height="${bh.toFixed(0)}" fill="#202842"/>` + Array.from({ length: Math.floor(bh / 18) * 3 }, (_, q) => r() > .45 ? `<rect x="${bx + 6 + (q % 3) * 13}" y="${(1180 - bh + 8 + Math.floor(q / 3) * 18).toFixed(0)}" width="8" height="10" fill="#ffd27e"/>` : '').join(''); }
  s += city + `<rect x="-20" y="1180" width="760" height="120" fill="#10141e"/>`;
  s += `<g opacity="${pa.toFixed(2)}">` + panel(80, 1192, 560, 76) + pie3(140, 1230, 30, pa * .9, '#f4c76b') + lbl(420, 1243, '٩٠٪ تقريباً من كهرباءِ العالم', 1, '#f4c76b', 28) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function pie3(cx, cy, R, k, col) { // k = fraction of a full turn (0..1)
  k = clamp(k); const a1 = -Math.PI / 2 + k * 2 * Math.PI, x1 = cx + Math.cos(a1) * R, y1 = cy + Math.sin(a1) * R;
  return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a3048"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>` + (k > .01 ? `<path d="M${cx},${cy} L${cx},${cy - R} A${R},${R} 0 ${k > .5 ? 1 : 0} 1 ${x1.toFixed(1)},${y1.toFixed(1)}Z" fill="${col}"/>` : '');
}

// 5: dark cities, stopped factories, no geared clocks
function sceneDarkCity(t) {
  const off = ease(ramp(t, WS(5, 2) - .1, WS(5, 3) + .3)), fl = off > 0 && off < 1 && Math.floor(t * 20) % 3 === 0 ? .3 : 0, gs = ramp(t, WS(5, 6) - .2, WS(5, 8) + .2);
  let s = street3(t, { N: .98, id: 'n', cars: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#02040c" opacity="${(Math.min(.82, off * .78 + fl)).toFixed(2)}"/>`;
  // the clock face with gears showing, which stops
  const ga = ease(ramp(t, WS(5, 6) - .3, WS(5, 6) + .1)), sp = (1 - ease(gs)) * 1.6, rot = t * sp + (gs > 0 ? 0 : 0);
  if (ga > 0) { const cx = 360, cy = 760;
    s += `<g opacity="${ga.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="190" fill="#000" opacity=".5" filter="url(#blur9)"/><circle cx="${cx}" cy="${cy}" r="180" fill="#1a1612"/><circle cx="${cx}" cy="${cy}" r="180" fill="none" stroke="url(#bronzeG)" stroke-width="12"/>` +
      gear(cx - 50, cy - 20, 82, 14, rot, '#c89a48') + gear(cx + 72, cy + 40, 56, 10, -rot * 1.4 + .2, '#b08038') + gear(cx + 30, cy - 110, 40, 8, -rot * 2.05, '#d8aa58') + gear(cx - 40, cy + 110, 46, 9, -rot * 1.78, '#a87830') +
      `<circle cx="${cx}" cy="${cy}" r="180" fill="#fff" opacity="${(.06 * gs).toFixed(2)}"/></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 6: goods carried on animals' backs, or dragged on wooden sledges – very slowly
function sceneGoods(t) {
  const T = t - S0(6) + .2, ph = T * 2.4;
  let s = plain(t, { seed: 83 });
  // a donkey with packs
  const dx = 380 + T * 14;
  s += recol(quad(dx, 1060, .85, { kind: 'horse', face: 1, moving: 1, phase: ph }), '#c0a06a', '#8e8678').split('#e6d4ae').join('#c8c0b4') +
    `<rect x="${dx - 70}" y="${1060 - 132}" width="56" height="40" rx="10" fill="#a8743a"/><rect x="${dx - 10}" y="${1060 - 130}" width="50" height="38" rx="10" fill="#8a5a2a"/><path d="M${dx - 66},${1060 - 118} h102" stroke="#5a3a1a" stroke-width="3"/>`;
  s += hero(dx + 160, 1072, Object.assign({ s: .6, face: 1, shade: 1, walk: ph * 1.1, amp: .4, hB: [dx + 120, 1072 - 120] }, { top: '#6a7a4a', pants: '#3a3428', skin: '#b07a55', hair: '#2a1e18' }));
  // two people dragging a stone block on a sledge, leaning hard
  const sx = 150 + T * 9, sy = 1150;
  s += `<path d="M${sx - 120},${sy} L${sx + 70},${sy} q16,0 22,-14" stroke="#6a4426" stroke-width="9" fill="none" stroke-linecap="round"/><rect x="${sx - 110}" y="${sy - 22}" width="170" height="16" fill="#8a5a34"/>` +
    `<rect x="${sx - 100}" y="${sy - 112}" width="150" height="92" fill="#a8a094"/><rect x="${sx - 100}" y="${sy - 112}" width="150" height="92" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M${sx - 100},${sy - 112} l10,-10 h150 l-10,10Z" fill="#c8c0b4"/><path d="M${sx + 50},${sy - 112} l10,-10 v92 l-10,10Z" fill="#7a746a"/>` +
    puff(sx - 110, sy - 4, 18 + Math.sin(t * 4) * 4, .5);
  const rope = [sx + 90, sy - 14];
  [[sx + 170, 0], [sx + 240, 1.4]].forEach(([hx, pp]) => { s += `<path d="M${rope[0]},${rope[1]} L${hx + 14},${sy - 100}" stroke="#c8a878" stroke-width="3"/>` + hero(hx, sy + 4, Object.assign({ s: .64, face: 1, shade: 1, walk: ph * .8 + pp, amp: .5, lean: 22, hF: [hx + 4, sy - 92], hB: [hx - 6, sy - 96] }, pp ? pal(3) : pal(0))); });
  noEarth(); F.ov = ''; return s;
}

// 7: the strange part: ancient peoples in the Americas made toys with wheels – but never used wheels to carry anything
function clayDog(cx, cy, s) {
  return `<g transform="translate(${cx},${cy}) scale(${s})"><ellipse cx="0" cy="56" rx="110" ry="10" fill="#000" opacity=".35" filter="url(#blur5)"/>` +
    `<path d="M-30,32 L-30,46 M50,32 L50,46" stroke="#5a3a24" stroke-width="5"/>` +
    `<path d="M-80,-10 C-84,-40 -40,-50 10,-46 C50,-44 72,-36 78,-12 C82,12 60,28 10,30 C-40,32 -76,22 -80,-10Z" fill="url(#clayG)"/>` +
    `<path d="M60,-26 C70,-60 100,-70 116,-56 C128,-44 124,-20 104,-12 C92,-6 74,-10 66,-16Z" fill="url(#clayG)"/><path d="M98,-64 L106,-86 L112,-60Z M80,-60 L82,-82 L92,-62Z" fill="#a8683e"/><circle cx="104" cy="-42" r="4" fill="#2a1a10"/><path d="M118,-28 q6,4 4,10" stroke="#5a3424" stroke-width="2" fill="none"/>` +
    `<path d="M-78,-14 C-100,-26 -108,-40 -100,-50" stroke="#b0704a" stroke-width="9" fill="none" stroke-linecap="round"/>` +
    `<path d="M-40,-40 q20,-6 40,0 M-20,-20 q16,-4 30,2" stroke="#7a4a2e" stroke-width="2.5" fill="none" opacity=".6"/><path d="M-60,-30 C-40,-46 20,-48 50,-36" stroke="#fff" stroke-width="4" fill="none" opacity=".18"/>` +
    [[-50, 40], [-10, 40], [30, 40], [70, 40]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="17" fill="url(#clayG)" stroke="#5a3424" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="4" fill="#3a2414"/>`).join('') + `</g>`;
}
function sceneToy(t) {
  const T = t - S0(7) + .2, no = ease(ramp(t, WS(7, 9) - .2, WS(7, 13) + .3));
  let s = `<defs>${DEFW()}<linearGradient id="musW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1410"/><stop offset="1" stop-color="#3a2c22"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#musW)"/>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M200,-20 L520,-20 L680,1100 L40,1100Z" fill="url(#spotG)"/>`;
  // pedestal and glass case, the toy rolling a little
  s += `<rect x="170" y="960" width="380" height="340" fill="#3a3430"/><rect x="170" y="960" width="380" height="16" fill="#5a524a"/><rect x="170" y="976" width="380" height="20" fill="#000" opacity=".3"/>` +
    `<rect x="160" y="560" width="400" height="400" fill="#bfe0ff" opacity=".07"/><rect x="160" y="560" width="400" height="400" fill="none" stroke="#dfefff" stroke-width="3" opacity=".35"/><path d="M190,580 L260,580 L190,700Z" fill="#fff" opacity=".1"/>`;
  s += clayDog(360 + Math.sin(T * 1.2) * 8, 880, 1.5);
  s += `<rect x="250" y="1030" width="220" height="50" rx="6" fill="#d8ccb0"/>` + lbl(360, 1064, 'لعبةٌ قديمة بعجلات', 1, '#2a1e12', 22).replace('stroke="#000"', 'stroke="#d8ccb0"');
  // a cart on wheels that never was: drawn faint, crossed out
  if (no > 0) s += `<g opacity="${no.toFixed(2)}"><g opacity=".55">${woodWheel(300, 480, 46, 0, 1, 'wt1')}${woodWheel(420, 480, 46, 0, 1, 'wt2')}<rect x="260" y="410" width="200" height="40" fill="#8a5a34"/></g><path d="M240,380 L480,530 M480,380 L240,530" stroke="#e0483a" stroke-width="10" stroke-linecap="round"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// 8: and they built mountain roads tens of thousands of kilometres long – walked only by people and animals
function sceneRoad(t) {
  const T = t - S0(8) + .2, ph = T * 2.6, dr = ease(ramp(t, WS(8, 1) - .2, WS(8, 6) + .3));
  let s = `<defs>${DEFW()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skyW)"/>` + cumulus(500 + t * 3, 420, 240, 71, { a: .8 }) +
    mountainsR(780, 320, 91, { rock: '#8a8478', snowAt: .55 }) + `<rect x="-20" y="790" width="760" height="200" fill="#7a7468"/><rect x="-20" y="770" width="760" height="90" fill="#d8dcd8" opacity=".45" filter="url(#soft)"/>` + mountainsR(880, 120, 97, { rock: '#8a8270' }) + `<rect x="-20" y="860" width="760" height="60" fill="#d8dcd8" opacity=".3" filter="url(#soft)"/>` + mountainsR(920, 110, 95, { rock: '#6a7a44' }) + `<rect x="-20" y="940" width="760" height="360" fill="#5e6e3a"/>` + meadow(960, 1300, t, { c0: '#8a9a5a', c1: '#4e5e30' });
  // the stone road zig-zagging up the slope (drawn on)
  const road = 'M760,1250 C520,1220 300,1180 120,1120 C60,1100 80,1070 160,1060 C320,1040 460,1010 560,970 C620,948 600,925 520,920 C400,912 300,900 240,880';
  s += `<path d="${road}" stroke="#7a6a58" stroke-width="40" fill="none" stroke-linecap="round" stroke-dasharray="2400" stroke-dashoffset="${(2400 * (1 - dr)).toFixed(0)}"/><path d="${road}" stroke="#a89a84" stroke-width="30" fill="none" stroke-linecap="round" stroke-dasharray="2400" stroke-dashoffset="${(2400 * (1 - dr)).toFixed(0)}"/>` +
    `<path d="${road}" stroke="#6a5a48" stroke-width="2" fill="none" stroke-dasharray="6 10" stroke-dashoffset="0" opacity="${(.6 * dr).toFixed(2)}"/>`;
  // terraces on the slope
  for (let i = 0; i < 5; i++) s += `<path d="M${380 + i * 20},${1000 + i * 26} C${470 + i * 20},${990 + i * 26} ${580 + i * 20},${996 + i * 26} ${680},${1010 + i * 24}" stroke="#5a6a34" stroke-width="5" fill="none" opacity=".6"/>`;
  // a llama caravan and a runner on the road
  [[0, 0], [1, 110], [2, 220]].forEach(([i, dx]) => { const x = 620 - dx - T * 14, y = 1225 - dx * .1; s += recol(quad(x, y, .55, { kind: 'horse', face: -1, moving: 1, phase: ph + i }), '#c0a06a', ['#efe6d6', '#a8784a', '#e0d4c0'][i]) + `<rect x="${x - 22}" y="${y - 86}" width="40" height="22" rx="6" fill="${['#c83a3a', '#2a7a8a', '#d8a030'][i]}"/>`; });
  s += hero(260 - T * 4, 1118, Object.assign({ s: .5, face: -1, shade: 1, walk: ph * 1.6, amp: .7, lean: 8 }, { top: '#b83a2a', pants: '#3a2a20', skin: '#a06a46', hair: '#1a1410' }));
  noEarth(); F.ov = ''; return s;
}

function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(9)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(9)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 11) - .3, WS(9, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePast }, { s: S0(2) - .2, f: sceneCars }, { s: S0(3) - .2, f: sceneJet }, { s: S0(4) - .2, f: scenePower }, { s: S0(5) - .2, f: sceneDarkCity }, { s: S0(6) - .2, f: sceneGoods }, { s: S0(7) - .2, f: sceneToy }, { s: S0(8) - .2, f: sceneRoad }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, scenePower, sceneJet, sceneToy]);
const XF = .5;
const TLI = [['السيّارات', S0(2)], ['الطائرات', S0(3)], ['الكهرباء', S0(4)], ['النقل', S0(6)]];
const LIST_ON = new Set([sceneCars, sceneDarkCity]);
const CHIPS = [
  ['c1', 'قبلَ ٥٥٠٠ سنة: أوّلُ عجلة', 360, 330, 'big', WS(1, 2), WS(1, 10) - .2], ['c1b', 'لم توجدْ قطّ', 360, 330, 'red big', WS(1, 11), S0(2) - .3],
  ['c2', 'أكثرُ من مليارِ مركبة', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'لا طيران', 360, 330, 'red big', WS(3, 2), WS(3, 4) - .1], ['c3b', 'المحرّكُ النفّاث: عجلاتٌ بشفرات', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'التوربينات', 360, 330, 'big', WS(4, 13), S0(5) - .3],
  ['c5', 'مدنٌ مظلمة', 360, 330, 'red big', WS(5, 2), WS(5, 6) - .2], ['c5b', 'لا ساعاتٍ بتروس', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c6', 'على ظهورِ الحيوانات', 360, 330, 'big', WS(6, 2), WS(6, 5) - .1], ['c6b', 'أو على زلّاجاتٍ خشبيّة', 360, 330, 'big', WS(6, 5), WS(6, 10) - .1], ['c6c', 'ببطءٍ شديد', 360, 330, 'red big', WS(6, 10), S0(7) - .3],
  ['c7', 'ألعابٌ بعجلات', 360, 330, 'big', WS(7, 6), WS(7, 9) - .2], ['c7b', 'لكن لا عرباتٍ أبداً', 360, 330, 'red big', WS(7, 9), S0(8) - .3],
  ['c8', 'عشراتُ آلافِ الكيلومترات', 360, 330, 'big', WS(8, 3), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 11), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا عجلة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
