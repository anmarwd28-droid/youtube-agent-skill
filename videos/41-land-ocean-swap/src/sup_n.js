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
