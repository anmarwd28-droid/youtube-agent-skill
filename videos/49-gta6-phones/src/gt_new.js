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
  let g = farCity(57, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
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
const SHOPB = [[-4, 140, 'صيدليّة', '#2a8a6a'], [148, 140, 'كتب', '#7a4a2a'], [300, 146, 'ساعات', '#3a4a7a'], [458, 132, 'حلويات', '#b0506a'], [602, 134, 'ملابس', '#6a5a2a']];
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
  let g = farCity(61, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-10, 150, 440, '#8a6a7a', 741, 1], [140, 166, 372, '#d0c0a0', 742, 2], [306, 150, 488, '#6a7a6a', 743, 0], [456, 160, 400, '#b88a5a', 744, 1], [616, 130, 456, '#9aa8b8', 745, 2]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowB(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  [[100, 290, 151], [604, 300, 153]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = o.lamps === 0 ? [] : [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// ===================== scenes =====================
// ===================== "what if all humans had only one eye?" (Short #37) =====================
const OEDEF = `<radialGradient id="skF" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#e2ad8a"/><stop offset=".55" stop-color="#c89070"/><stop offset="1" stop-color="#9a6448"/></radialGradient>` +
  `<linearGradient id="skSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3a1a10" stop-opacity=".38"/></linearGradient>` +
  `<radialGradient id="scF" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#fbf7f0"/><stop offset=".7" stop-color="#ece2d6"/><stop offset="1" stop-color="#c8a89c"/></radialGradient>` +
  `<radialGradient id="irF"><stop offset="0" stop-color="#1a0c04"/><stop offset=".3" stop-color="#4a2a12"/><stop offset=".75" stop-color="#8a5c2c"/><stop offset=".92" stop-color="#5a3a1c"/><stop offset="1" stop-color="#2a1608"/></radialGradient>` +
  `<radialGradient id="stuG" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#3a4258"/><stop offset=".6" stop-color="#1c2236"/><stop offset="1" stop-color="#0a0e1a"/></radialGradient>` +
  `<radialGradient id="boneG" cx=".42" cy=".3" r=".85"><stop offset="0" stop-color="#f2e8d2"/><stop offset=".55" stop-color="#d4c4a2"/><stop offset="1" stop-color="#8a7a5c"/></radialGradient>` +
  `<linearGradient id="pmSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3a2a14" stop-opacity=".35"/></linearGradient><radialGradient id="holeG" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#050302"/><stop offset=".7" stop-color="#1e1408"/><stop offset="1" stop-color="#5a4628"/></radialGradient>` +
  `<radialGradient id="micG" cx=".46" cy=".42" r=".6"><stop offset="0" stop-color="#f2fbe8"/><stop offset=".6" stop-color="#cfe8c8"/><stop offset=".92" stop-color="#9cc4a4"/><stop offset="1" stop-color="#5a8a72"/></radialGradient>` +
  `<radialGradient id="ballG" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ffd27a"/><stop offset=".6" stop-color="#e8782a"/><stop offset="1" stop-color="#8a3a12"/></radialGradient>` +
  `<radialGradient id="spotG" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff2d0" stop-opacity=".55"/><stop offset=".6" stop-color="#ffe2a8" stop-opacity=".12"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="fovG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".55"/><stop offset="1" stop-color="#f4c76b" stop-opacity=".05"/></linearGradient>` +
  `<linearGradient id="shirtF" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>` +
  `<filter id="blur16" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>`;
const DEFO = () => `${DEFN()}${OEDEF}`;
// studio background with soft bokeh
function studio(id, c0 = '#2c3650', c1 = '#0a0e1a', seed = 3) {
  let s = `<defs><radialGradient id="${id}" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#${id})"/>`;
  const r = RS(seed); for (let i = 0; i < 22; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(14 + r() * 46).toFixed(1)}" fill="${r() < .5 ? '#ffd9a0' : '#8aa8ff'}" opacity="${(.03 + .05 * r()).toFixed(3)}" filter="url(#blur9)"/>`;
  return s + `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
}
// one eye of the front face: almond opening, sclera, iris, catch-light; op = how open (0..1)
function eyeF(id, x, y, w, op, look = 0) {
  const h = w * .36 * Math.max(op, .02);
  const lid = `M${x - w / 2},${y} Q${x - w * .06},${y - h * 1.5} ${x + w / 2},${y - h * .1} Q${x + w * .04},${y + h * 1.15} ${x - w / 2},${y}Z`;
  let s = `<path d="M${x - w * .62},${y - w * .02} Q${x},${y - w * .5} ${x + w * .62},${y - w * .06}" stroke="#7a4a32" stroke-width="${(w * .03).toFixed(1)}" fill="none" opacity=".45"/>` + // the crease above the lid
    `<ellipse cx="${x}" cy="${y + w * .2}" rx="${w * .46}" ry="${w * .1}" fill="#6a3a2a" opacity=".16" filter="url(#blur5)"/>`;
  if (op > .04) { const ix = x + look * w * .14 + w * .02, iy = y - h * .12, ir = w * .2;
    s += `<defs><clipPath id="${id}"><path d="${lid}"/></clipPath></defs><g clip-path="url(#${id})"><rect x="${x - w}" y="${y - w}" width="${2 * w}" height="${2 * w}" fill="url(#scF)"/>` +
      `<circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${ir.toFixed(1)}" fill="url(#irF)"/><circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${(ir * .44).toFixed(1)}" fill="#060302"/>` +
      Array.from({ length: 16 }, (_, i) => { const a = i / 16 * 6.283; return `<path d="M${(ix + Math.cos(a) * ir * .5).toFixed(1)},${(iy + Math.sin(a) * ir * .5).toFixed(1)} L${(ix + Math.cos(a) * ir * .95).toFixed(1)},${(iy + Math.sin(a) * ir * .95).toFixed(1)}" stroke="#d8a860" stroke-width="${(w * .008).toFixed(2)}" opacity=".35"/>`; }).join('') +
      `<circle cx="${(ix + ir * .35).toFixed(1)}" cy="${(iy - ir * .38).toFixed(1)}" r="${(ir * .2).toFixed(1)}" fill="#fff" opacity=".92"/><circle cx="${(ix - ir * .3).toFixed(1)}" cy="${(iy + ir * .35).toFixed(1)}" r="${(ir * .08).toFixed(1)}" fill="#fff" opacity=".5"/>` +
      `<path d="M${x - w},${y - h * .55} Q${x},${y - h * 1.5} ${x + w},${y - h * .6} L${x + w},${y - w} L${x - w},${y - w}Z" fill="#3a1a0c" opacity=".28"/></g>` +
      `<path d="M${x - w / 2},${y} Q${x - w * .06},${y - h * 1.5} ${x + w / 2},${y - h * .1}" stroke="#2a140a" stroke-width="${(w * .045).toFixed(1)}" fill="none" stroke-linecap="round"/>` +
      `<path d="M${x - w * .44},${y + h * .25} Q${x},${y + h * 1.2} ${x + w * .46},${y + h * .05}" stroke="#8a4a3a" stroke-width="${(w * .02).toFixed(1)}" fill="none" opacity=".6"/>`;
  } else s += `<path d="M${x - w / 2},${y} Q${x},${y + w * .1} ${x + w / 2},${y - w * .02}" stroke="#2a140a" stroke-width="${(w * .045).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  return s;
}
// the front face portrait. o: {m: 0 two eyes .. 1 one central eye (with a blink between), patch: {L, R, C}, top, hair, look, glasses, skinMul}
function faceF(id, cx, cy, S, o = {}) {
  const m = o.m || 0, blink = m > 0 && m < 1 ? Math.sin(Math.PI * Math.min(1, m)) : 0, op = (o.open ?? 1) * (1 - blink * .98), one = m >= .5;
  const top = o.top || '#2a5a8a', hair = o.hair || '#2a1a12';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})">`;
  // shoulders and shirt
  s += `<path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="${top}"/><path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="url(#shirtF)"/>` +
    `<path d="M-48,214 Q0,276 48,214" fill="#000" opacity=".22"/><path d="M-70,236 Q0,300 70,236" stroke="#000" stroke-width="5" fill="none" opacity=".18"/>`;
  // neck
  s += `<path d="M-50,110 L-52,236 Q0,268 52,236 L50,110Z" fill="#b47c5a"/><path d="M-50,140 Q0,190 50,140 L50,110 L-50,110Z" fill="#000" opacity=".18"/>`;
  // ears
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 128}" cy="8" rx="22" ry="38" fill="${k < 0 ? '#c08868' : '#a87050'}"/><path d="M${k * 132},-14 Q${k * 142},8 ${k * 130},34" stroke="#7a4a32" stroke-width="4" fill="none" opacity=".5"/>`; });
  // the head
  const HD = 'M-126,-20 C-128,-122 -72,-168 0,-168 C72,-168 128,-122 126,-20 C124,64 92,132 0,164 C-92,132 -124,64 -126,-20Z';
  s += `<path d="${HD}" fill="url(#skF)"/><path d="${HD}" fill="url(#skSide)"/><path d="${HD}" fill="#000" filter="url(#grainR)" opacity=".1"/>` +
    `<ellipse cx="-62" cy="52" rx="34" ry="18" fill="#e07a6a" opacity=".16" filter="url(#blur5)"/><ellipse cx="62" cy="52" rx="34" ry="18" fill="#c0604a" opacity=".14" filter="url(#blur5)"/>` +
    `<path d="M-60,120 Q0,170 60,120" stroke="#000" stroke-width="10" fill="none" opacity=".08" filter="url(#blur5)"/>`;
  // hair
  s += `<path d="M-134,-6 C-146,-136 -72,-196 0,-194 C82,-196 146,-136 134,-6 C126,-58 108,-98 66,-112 C18,-128 -36,-124 -78,-104 C-108,-84 -126,-50 -134,-6Z" fill="${hair}"/>` +
    `<path d="M-110,-110 C-70,-160 20,-176 90,-130" stroke="#fff" stroke-width="5" fill="none" opacity=".08"/>` +
    `<path d="M-6,80 L-6,96 M6,80 L6,96" stroke="#8a5a40" stroke-width="2.4" opacity=".35"/><ellipse cx="0" cy="146" rx="30" ry="8" fill="#000" opacity=".1" filter="url(#blur5)"/>` +
    (o.wild ? `<path d="M-120,30 C-126,120 -70,196 0,204 C70,196 126,120 120,30 C104,90 70,112 40,120 Q0,128 -40,120 C-70,112 -104,90 -120,30Z" fill="${hair}"/>` + Array.from({ length: 22 }, (_, i) => { const x0 = -100 + i * 9.5; return `<path d="M${x0},${120 + Math.abs(x0) * -.2} q${(i % 2 ? 4 : -4)},30 ${(i % 3 - 1) * 6},${50 - Math.abs(x0) * .25}" stroke="${mix(hair, '#ffffff', .2)}" stroke-width="2" fill="none" opacity=".18"/>`; }).join('') : '');
  // brows and eyes
  if (!one) {
    s += `<path d="M-84,-56 Q-52,-74 -18,-58" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M18,-58 Q52,-74 84,-56" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    const d = 50 * (1 - Math.min(1, m * 2) * .55);
    s += eyeF(id + 'L', -d, -14, 58, op * (o.patch && o.patch.L > .5 ? 0 : 1), o.look) + eyeF(id + 'R', d, -14, 58, op, o.look);
  } else {
    s += `<path d="M-58,-92 Q0,-118 58,-92" stroke="${hair}" stroke-width="11" fill="none" stroke-linecap="round"/>`;
    s += eyeF(id + 'C', 0, -40, 84, op * (o.patch && o.patch.C > .5 ? 0 : 1), o.look);
  }
  // nose and mouth
  s += `<path d="M-4,${one ? 14 : -12} C-8,30 -22,50 -20,62 C-14,74 14,74 20,62 C22,50 8,30 4,${one ? 6 : -12}" fill="#b47858" opacity=".55"/><path d="M8,${one ? 18 : -6} C14,34 26,52 20,64" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>` +
    `<ellipse cx="-11" cy="66" rx="7" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="11" cy="66" rx="7" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="-4" cy="54" rx="6" ry="3" fill="#fff" opacity=".18"/>` +
    `<path d="M-36,104 Q-14,96 0,100 Q14,96 36,104 Q16,114 0,113 Q-16,114 -36,104Z" fill="#a4504a"/><path d="M-36,104 Q0,108 36,104" stroke="#5a2420" stroke-width="2.5" fill="none"/><path d="M-20,112 Q0,120 20,112" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`;
  // eye patches
  const P = o.patch || {};
  const patch = (x, y, w, k) => k > 0 ? `<g opacity="${k.toFixed(2)}"><path d="M${x - w * .55},${y - w * .5} L-134,-40 M${x + w * .55},${y - w * .5} L134,-40" stroke="#1a1612" stroke-width="7" fill="none"/><ellipse cx="${x}" cy="${y + 2}" rx="${w * .66}" ry="${w * .5}" fill="#1a1612"/><ellipse cx="${x - w * .16}" cy="${y - w * .14}" rx="${w * .3}" ry="${w * .16}" fill="#fff" opacity=".1"/></g>` : '';
  if (!one) s += patch(-50 * (1 - Math.min(1, m * 2) * .55), -14, 58, P.L || 0); else s += patch(0, -40, 84, P.C || 0);
  // 3D glasses made for two eyes (red and cyan); the single eye sits under the bridge
  if (o.glasses) { const g = o.glasses;
    s += `<g opacity="${g.toFixed(2)}"><path d="M-134,-22 L-118,-26 M134,-22 L118,-26" stroke="#f2f2f2" stroke-width="7"/><rect x="-120" y="-50" width="72" height="54" rx="12" fill="#e02a2a" opacity=".55"/><rect x="48" y="-50" width="72" height="54" rx="12" fill="#2ad4e8" opacity=".55"/>` +
      `<rect x="-120" y="-50" width="72" height="54" rx="12" fill="none" stroke="#f4f4f4" stroke-width="7"/><rect x="48" y="-50" width="72" height="54" rx="12" fill="none" stroke="#f4f4f4" stroke-width="7"/><path d="M-48,-40 Q0,-110 48,-40" stroke="#f4f4f4" stroke-width="8" fill="none"/></g>`; }
  return s + `</g>`;
}
// profile hero with one big central eye (replaces the side-view eye)
function heroC(x, y, o = {}) {
  let s = hero(x, y, o);
  s = s.replace(/<ellipse cx="([-\d.]+)" cy="([-\d.]+)" rx="2.4" ry="3" fill="#1a120d"\/>/, (_, ex, ey) => { const X = +ex + 3, Y = +ey - 3.4;
    return `<ellipse cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" rx="4.6" ry="5" fill="#f6f0e6"/><circle cx="${(X + 1.4).toFixed(1)}" cy="${Y.toFixed(1)}" r="2.8" fill="#3a2010"/><circle cx="${(X + 2.2).toFixed(1)}" cy="${(Y - 1).toFixed(1)}" r=".9" fill="#fff"/>`; });
  s = s.replace(/<path d="M([-\d.]+),([-\d.]+) q6,-3 11,0"/, (_, bx, by) => `<path d="M${(+bx + 2).toFixed(1)},${(+by - 4.5).toFixed(1)} q7,-3 13,1"`);
  return s.replace(/<circle cx="[-\d.]+" cy="[-\d.]+" r="\.8" fill="#fff" opacity="[.\d]+"\/>/, '');
}
const CYC = { top: '#3a7a5a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };

// 0: a face; the two eyes blink and open again as one eye in the middle
function sceneHook(t) {
  const m = clamp((t - WS(0, 5) + .1) / (WS(0, 8) - WS(0, 5) + .3)), z = 1 + .06 * ease(clamp(t / 4.2));
  let s = `<defs>${DEFO()}</defs>` + studio('stH', '#3a4664', '#0a0e1a', 5);
  s += `<ellipse cx="360" cy="1180" rx="320" ry="60" fill="#000" opacity=".35" filter="url(#blur16)"/>`;
  s += `<g transform="translate(360,760) scale(${z.toFixed(4)}) translate(-360,-760)">` + faceF('fh', 360, 700, 1.55, { m, top: '#2a5a8a', look: .2 * Math.sin(t * .9) }) + `</g>`;
  // a soft gold ring around the new eye
  const k = ease(ramp(t, WS(0, 8) - .1, WS(0, 10) + .2)); if (k > 0) s += `<circle cx="360" cy="${(760 + (700 - 40 * 1.55 - 760) * z).toFixed(1)}" r="${(92 + 8 * Math.sin(t * 4)).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="12 9" opacity="${(.85 * k).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 1: two eyes see two slightly different pictures; the brain compares them to measure distance
function miniView(x, y, w, h, dx, id, a = 1) {
  const cupX = x + w / 2 + dx, trX = x + w * .3 + dx * .12;
  return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa0d8"/><stop offset="1" stop-color="#d8e6ee"/></linearGradient></defs>` +
    `<g opacity="${a.toFixed(2)}" clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}s)"/>` +
    `<path d="M${x},${y + h * .62} Q${x + w * .3},${y + h * .5} ${x + w * .6},${y + h * .58} T${x + w},${y + h * .55} L${x + w},${y + h} L${x},${y + h}Z" fill="#7a9a6a"/>` +
    `<rect x="${(trX - 3).toFixed(1)}" y="${y + h * .36}" width="6" height="${h * .26}" fill="#5a4030"/><circle cx="${trX.toFixed(1)}" cy="${y + h * .32}" r="${h * .14}" fill="#3e6a3a"/><circle cx="${(trX - 6).toFixed(1)}" cy="${y + h * .28}" r="${h * .08}" fill="#5a8a4a"/>` +
    `<rect x="${x}" y="${y + h * .74}" width="${w}" height="${h * .26}" fill="#8a6244"/><rect x="${x}" y="${y + h * .74}" width="${w}" height="4" fill="#fff" opacity=".2"/>` +
    `<path d="M${(cupX - 22).toFixed(1)},${y + h * .46} L${(cupX + 22).toFixed(1)},${y + h * .46} L${(cupX + 17).toFixed(1)},${y + h * .78} L${(cupX - 17).toFixed(1)},${y + h * .78}Z" fill="#d8402a"/><path d="M${(cupX - 22).toFixed(1)},${y + h * .46} L${(cupX - 12).toFixed(1)},${y + h * .46} L${(cupX - 9).toFixed(1)},${y + h * .78} L${(cupX - 17).toFixed(1)},${y + h * .78}Z" fill="#fff" opacity=".25"/>` +
    `<path d="M${(cupX + 22).toFixed(1)},${y + h * .52} q16,4 0,18" stroke="#b0301e" stroke-width="5" fill="none"/><ellipse cx="${cupX.toFixed(1)}" cy="${y + h * .46}" rx="22" ry="5" fill="#7a1a10"/></g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${(.8 * a).toFixed(2)}"/>`;
}
function headTop(x, y, S, one) {
  return `<g transform="translate(${x},${y}) scale(${S})"><ellipse cx="0" cy="40" rx="130" ry="50" fill="#2a5a8a"/><ellipse cx="0" cy="40" rx="130" ry="50" fill="url(#shirtF)"/><ellipse cx="0" cy="10" rx="62" ry="66" fill="#c89070"/>` +
    `<path d="M-60,22 C-66,-40 -30,-64 0,-62 C30,-64 66,-40 60,22 C40,4 -40,4 -60,22Z" fill="#2a1e18" transform="rotate(180,0,0) translate(0,-24)"/><ellipse cx="0" cy="20" rx="52" ry="50" fill="#2a1e18"/>` +
    `<ellipse cx="0" cy="-58" rx="13" ry="10" fill="#c08868"/>` + (one ? `<circle cx="0" cy="-48" r="9" fill="#fff"/><circle cx="0" cy="-50" r="4" fill="#3a2010"/>` : `<circle cx="-26" cy="-44" r="8" fill="#fff"/><circle cx="26" cy="-44" r="8" fill="#fff"/><circle cx="-26" cy="-46" r="3.6" fill="#3a2010"/><circle cx="26" cy="-46" r="3.6" fill="#3a2010"/>`) + `</g>`;
}
function sceneStereo(t) {
  const a = ease(ramp(t, S0(1) - .1, S0(1) + .5)), fu = ease(ramp(t, WS(1, 6) - .2, WS(1, 7) + .3)), ms = ease(ramp(t, WS(1, 8) - .2, WS(1, 9) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stS', '#24304a', '#080b16', 7);
  // a table seen from above with the red cup, the head at the bottom
  s += `<rect x="150" y="610" width="420" height="190" rx="14" fill="#6a4a30"/><rect x="150" y="610" width="420" height="190" rx="14" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="150" y="610" width="420" height="10" rx="5" fill="#fff" opacity=".12"/>` +
    `<ellipse cx="372" cy="712" rx="40" ry="36" fill="#000" opacity=".3" filter="url(#blur5)"/><circle cx="360" cy="700" r="34" fill="#d8402a"/><circle cx="360" cy="700" r="24" fill="#7a1a10"/><circle cx="348" cy="688" r="8" fill="#fff" opacity=".25"/>`;
  s += headTop(360, 1070, 1, false);
  // sight lines from each eye to the cup
  const L = [334, 1026], Rr = [386, 1026];
  [[L, '#f4c76b'], [Rr, '#8ad8ff']].forEach(([e, c]) => { s += `<path d="M${e[0]},${e[1]} L360,700" stroke="${c}" stroke-width="4" stroke-dasharray="12 8" stroke-dashoffset="${(-t * 40).toFixed(1)}" opacity="${(.9 * a).toFixed(2)}"/>`; });
  // the two pictures, then laid over each other
  const w = 240, h = 170, y0 = 384, xl = lerp(70, 240, fu), xr = lerp(410, 240, fu);
  s += miniView(xl, y0, w, h, -26, 'mvL', a * (1 - .45 * fu)) + miniView(xr, y0, w, h, 26, 'mvR', a * (1 - .45 * fu));
  if (fu < .5) s += lbl(xl + w / 2, y0 + h + 34, 'العينُ اليسرى', a * (1 - fu * 2), '#ffe7a8', 24) + lbl(xr + w / 2, y0 + h + 34, 'العينُ اليمنى', a * (1 - fu * 2), '#bfe8ff', 24);
  // the measured distance
  if (ms > 0) s += arrow(560, 1010, 560, 720, ms, '#f4c76b', 5) + arrow(560, 720, 560, 1010, ms, '#f4c76b', 5) + lbl(620, 870, 'المسافة', ms, '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}

// 2: with one eye the world loses depth: catching a ball, pouring water
function pourInset(cx, cy, R, t, a) {
  if (a <= 0) return '';
  const T = t - WS(2, 8) + .4, fl = clamp(T / .5), pool = clamp((T - .3) / 1.6);
  let g = `<rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#e8dcc8"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<rect x="${cx - R}" y="${cy + 40}" width="${2 * R}" height="${R}" fill="#8a6244"/><rect x="${cx - R}" y="${cy + 40}" width="${2 * R}" height="6" fill="#fff" opacity=".18"/>`;
  // the glass (empty) and the puddle beside it
  const gx = cx - 40;
  g += `<ellipse cx="${cx + 6}" cy="${cy + 62}" rx="${(10 + 70 * pool).toFixed(1)}" ry="${(3 + 12 * pool).toFixed(1)}" fill="#9cc8e8" opacity=".75"/><ellipse cx="${cx}" cy="${cy + 60}" rx="${(6 + 40 * pool).toFixed(1)}" ry="${(2 + 6 * pool).toFixed(1)}" fill="#fff" opacity=".35"/>` +
    `<path d="M${gx - 26},${cy - 30} L${gx + 26},${cy - 30} L${gx + 21},${cy + 58} L${gx - 21},${cy + 58}Z" fill="#dff0fa" opacity=".35"/><path d="M${gx - 26},${cy - 30} L${gx - 21},${cy + 58} M${gx + 26},${cy - 30} L${gx + 21},${cy + 58}" stroke="#fff" stroke-width="3" opacity=".8"/><ellipse cx="${gx}" cy="${cy - 30}" rx="26" ry="6" fill="none" stroke="#fff" stroke-width="2.5" opacity=".8"/><ellipse cx="${gx}" cy="${cy + 58}" rx="21" ry="5" fill="#a8c8d8" opacity=".5"/>`;
  // the jug, tilted, and the stream landing beside the glass
  const jx = cx + 60, jy = cy - 70;
  g += `<g transform="rotate(-38,${jx},${jy})"><path d="M${jx - 30},${jy - 50} L${jx + 30},${jy - 50} L${jx + 36},${jy + 50} L${jx - 36},${jy + 50}Z" fill="#cfe4f0" opacity=".75"/><path d="M${jx - 30},${jy - 50} L${jx - 36},${jy + 50}" stroke="#fff" stroke-width="4" opacity=".7"/><path d="M${jx - 30},${jy - 50} L${jx - 44},${jy - 58}" stroke="#cfe4f0" stroke-width="6"/><path d="M${jx + 34},${jy - 30} q26,14 4,50" stroke="#b8d0de" stroke-width="7" fill="none"/>` +
    `<rect x="${jx - 33}" y="${jy - 10}" width="66" height="58" fill="#7ab8e0" opacity=".6"/></g>`;
  if (fl > 0) { const sx = jx - 64, sy = jy - 20, ex = cx + 4, ey = cy + 58; g += `<path d="M${sx},${sy} Q${sx - 14},${sy + 60} ${ex},${lerp(sy, ey, fl).toFixed(1)}" stroke="#7ab8e0" stroke-width="7" fill="none" opacity=".85"/><path d="M${sx},${sy} Q${sx - 14},${sy + 60} ${ex},${lerp(sy, ey, fl).toFixed(1)}" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
    if (fl >= 1) for (let i = 0; i < 6; i++) { const p = pmod(t * 2.2 + i / 6, 1); g += `<circle cx="${(ex + Math.cos(i * 2.1) * 26 * p).toFixed(1)}" cy="${(ey - 18 * Math.sin(p * 3.14)).toFixed(1)}" r="3" fill="#9cd0f0" opacity="${(1 - p).toFixed(2)}"/>`; } }
  g += `<path d="M${gx - 20},${cy - 76} l40,40 M${gx + 20},${cy - 76} l-40,40" stroke="#e0483a" stroke-width="7" stroke-linecap="round" opacity="${clamp((T - 1.2) * 3).toFixed(2)}"/>`;
  return `<defs><clipPath id="poC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#poC)">${g}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
}
function sceneCatch(t) {
  const tt = WS(2, 5) - .25, u = (t - tt) / 1.0, y0 = PV + 74;
  // the thrower (two eyes) at the left, the catcher (one eye) at the right
  const throwK = clamp((t - tt + .5) / .5), relK = clamp((t - tt) / .2);
  const th = hero(150, y0, Object.assign({ s: .64, face: 1, shade: 1, hF: [150 + lerp(-10, 70, relK), y0 - lerp(150, 230, throwK) + 60 * relK], hB: [150 - 30, y0 - 110] }, pal(1)));
  const ballStart = [214, y0 - 190], H = [548, y0 - 182];
  let bx, by, hit = 0;
  if (u < 0) { bx = HP.hand[0]; by = HP.hand[1] - 6; }
  else if (u < 1) { bx = lerp(ballStart[0], H[0], u); by = lerp(ballStart[1], H[1], u) - 120 * 4 * u * (1 - u); }
  else { const d = u - 1; hit = 1; bx = H[0] - 150 * d; const g = H[1] - 210 * d + 620 * d * d; by = Math.min(PV + 66, g); if (g > PV + 66) { const d2 = d - .42; bx = H[0] - 150 * .42 - 60 * Math.min(d2, .6); by = PV + 66 - 36 * Math.abs(Math.sin(Math.min(d2, .6) * 6)) * Math.exp(-d2 * 3); } }
  // the catcher reaches too early and too low
  const rk = ease(ramp(t, tt + .35, tt + .7)), flinch = hit ? Math.exp(-(u - 1) * 4) : 0;
  const cx = 560, ct = heroC(cx, y0, Object.assign({ s: .66, face: -1, shade: 1, lean: -6 * flinch, hF: [cx - lerp(20, 70, rk), y0 - lerp(120, 150, rk)], hB: [cx - lerp(10, 62, rk), y0 - lerp(110, 132, rk)] }, CYC));
  const head = HP.head;
  let fg = th + ct;
  fg += `<ellipse cx="${bx.toFixed(1)}" cy="${(PV + 70).toFixed(1)}" rx="13" ry="4" fill="#000" opacity="${(.3 * clamp(1 - (PV + 70 - by) / 300)).toFixed(2)}"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="13" fill="url(#ballG)"/><path d="M${(bx - 12).toFixed(1)},${by.toFixed(1)} Q${bx.toFixed(1)},${(by - 6).toFixed(1)} ${(bx + 12).toFixed(1)},${by.toFixed(1)}" stroke="#7a2a0a" stroke-width="1.6" fill="none"/>`;
  if (hit && u < 1.5) { const k = 1 - (u - 1) / .5; fg += lbl(head[0] + 4, head[1] - 46, 'طَق!', k, '#fff', 30) + [0, 1, 2, 3].map(i => { const a = i * 1.57 + t * 3; return `<circle cx="${(head[0] + Math.cos(a) * 30).toFixed(1)}" cy="${(head[1] - 26 + Math.sin(a) * 8).toFixed(1)}" r="4" fill="#f4c76b" opacity="${k.toFixed(2)}"/>`; }).join(''); }
  let s = `<defs>${OEDEF}</defs>` + street3(t, { N: 0, id: 'k', fg, cars: 1, carX: 620 });
  s += pourInset(320, 560, 150, t, ease(ramp(t, WS(2, 8) - .45, WS(2, 8) - .05)));
  noEarth(); F.ov = ''; return s;
}

// 3: the field of view shrinks from about 200° to about 150°; a car at your side is not seen
function carTop(x, y, ang, col) {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang})"><rect x="-80" y="-38" width="160" height="76" rx="22" fill="#000" opacity=".35" filter="url(#blur5)" transform="translate(6,8)"/>` +
    [[-48, -38], [48, -38], [-48, 32], [48, 32]].map(([a, b]) => `<rect x="${a - 15}" y="${b}" width="30" height="6" rx="2" fill="#111"/>`).join('') +
    `<rect x="-78" y="-36" width="156" height="72" rx="22" fill="${col}"/><rect x="-78" y="-36" width="156" height="20" rx="10" fill="#fff" opacity=".12"/>` +
    `<path d="M-46,-28 L-18,-30 L-18,30 L-46,28 Q-54,0 -46,-28Z" fill="#1a2430"/><path d="M30,-28 L48,-26 Q56,0 48,26 L30,28Z" fill="#1a2430"/><rect x="-18" y="-30" width="48" height="60" rx="6" fill="${mix(col, '#ffffff', .12)}"/>` +
    `<path d="M-40,-24 L-24,-26 L-24,-8Z" fill="#fff" opacity=".25"/><rect x="-80" y="-30" width="6" height="14" rx="3" fill="#fff6d8"/><rect x="-80" y="16" width="6" height="14" rx="3" fill="#fff6d8"/><rect x="74" y="-30" width="5" height="12" rx="2" fill="#c02a2a"/><rect x="74" y="18" width="5" height="12" rx="2" fill="#c02a2a"/></g>`;
}
function bikeTop(x, y, t) {
  const p = Math.sin(t * 8) * 6;
  return `<g transform="translate(${x.toFixed(1)},${y})"><ellipse cx="6" cy="10" rx="70" ry="18" fill="#000" opacity=".3" filter="url(#blur5)"/><rect x="-62" y="-4" width="34" height="8" rx="4" fill="#1a1a1a"/><rect x="26" y="-4" width="34" height="8" rx="4" fill="#1a1a1a"/><path d="M-40,0 L40,0" stroke="#2a6ab0" stroke-width="5"/><path d="M-34,-16 L-34,16" stroke="#333" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-10,-14 Q-26,-12 -32,-14 M-10,14 Q-26,12 -32,14" stroke="#e0a070" stroke-width="7" stroke-linecap="round" fill="none"/><ellipse cx="0" cy="0" rx="16" ry="26" fill="#d8402a"/><ellipse cx="0" cy="${(-12 + p * .3).toFixed(1)}" rx="9" ry="6" fill="#1a1a1a" opacity=".5"/><ellipse cx="${(8 + p * .2).toFixed(1)}" cy="${(-14 - p).toFixed(1)}" rx="8" ry="5" fill="#2a2a34"/><ellipse cx="${(8 - p * .2).toFixed(1)}" cy="${(14 + p).toFixed(1)}" rx="8" ry="5" fill="#2a2a34"/><circle cx="-6" cy="0" r="13" fill="#f2f2f2"/><circle cx="-6" cy="0" r="13" fill="none" stroke="#999" stroke-width="2"/><path d="M-14,-6 L2,-6" stroke="#666" stroke-width="2"/></g>`;
}
function canopy(x, y, r, seed) {
  const q = RS(seed); let s = `<circle cx="${x + 14}" cy="${y + 16}" r="${r}" fill="#000" opacity=".35" filter="url(#blur9)"/>`;
  for (let i = 0; i < 14; i++) { const a = q() * 6.28, d = q() * r * .6, rr = r * (.35 + q() * .3); s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${rr.toFixed(1)}" fill="${['#3e6a34', '#4a7a3a', '#2e5a2a', '#5a8a44'][Math.floor(q() * 4)]}"/>`; }
  for (let i = 0; i < 8; i++) { const a = q() * 6.28, d = q() * r * .5; s += `<circle cx="${(x - r * .2 + Math.cos(a) * d).toFixed(1)}" cy="${(y - r * .2 + Math.sin(a) * d).toFixed(1)}" r="${(r * .18).toFixed(1)}" fill="#8ab85a" opacity=".45"/>`; }
  return s;
}
function sceneFOV(t) {
  const sh = ease(ramp(t, WS(3, 6) - .1, WS(3, 9) + .3)), A = lerp(200, 150, sh), a = ease(ramp(t, S0(3) - .2, S0(3) + .5));
  const hx = 360, hy = 1000, Rf = 620;
  let s = `<defs>${DEFO()}</defs>`;
  // the street from above: asphalt, lane marks, a zebra crossing, the pavement with tiles, two trees
  s += `<rect x="-200" y="-200" width="1120" height="1700" fill="#4c4c54"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".45"/>` +
    Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 - 40}" y="806" width="70" height="8" fill="#e8e4d8" opacity=".8"/>`).join('') +
    Array.from({ length: 6 }, (_, i) => `<rect x="${250 + i * 40}" y="610" width="24" height="150" fill="#e8e4d8" opacity=".85"/>`).join('') +
    `<rect x="-20" y="900" width="760" height="400" fill="#bfb3a0"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="892" width="760" height="12" fill="#e2ddd0"/>` +
    Array.from({ length: 16 }, (_, i) => `<path d="M${i * 50},904 L${i * 50},1300" stroke="#a0947e" stroke-width="1.5"/>`).join('') + Array.from({ length: 8 }, (_, i) => `<path d="M-20,${940 + i * 50} L740,${940 + i * 50}" stroke="#a0947e" stroke-width="1.5"/>`).join('') +
    `<rect x="-20" y="-20" width="760" height="560" fill="#5a5a62"/><rect x="-20" y="520" width="760" height="12" fill="#e2ddd0"/><rect x="-20" y="-20" width="760" height="540" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += canopy(80, 1150, 90, 51) + canopy(650, 1190, 80, 52) + canopy(620, 400, 100, 53);
  // the car coming from the right at the side
  const T = t - S0(3), cxp = lerp(820, 540, ease(clamp(T / 6.6))), cyp = 1016;
  s += carTop(lerp(900, 420, clamp(T / 7.5)), 840, 180, '#c8322a') + carTop(lerp(-200, 300, clamp(T / 7.5)), 700, 0, '#e2e2e6') + bikeTop(cxp, cyp, t);
  // the field of view fan (gold) and the blind sides (dark)
  const fan = (deg, r) => { const h = deg / 2 * Math.PI / 180, x1 = hx + Math.sin(-h) * r, y1 = hy - Math.cos(-h) * r, x2 = hx + Math.sin(h) * r, y2 = hy - Math.cos(h) * r; return `M${hx},${hy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${deg > 180 ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)}Z`; };
  s += `<defs><mask id="fovM"><rect x="-20" y="-20" width="760" height="1320" fill="#fff"/><path d="${fan(A, 2000)}" fill="#000"/></mask></defs>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0814" opacity="${(.62 * a).toFixed(2)}" mask="url(#fovM)"/><rect x="-20" y="-20" width="760" height="1320" fill="#c0302a" opacity="${(.12 * a * sh).toFixed(2)}" mask="url(#fovM)"/>` +
    `<path d="${fan(A, Rf)}" fill="url(#fovG)" opacity="${(.55 * a).toFixed(2)}"/><path d="${fan(A, Rf)}" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${(.9 * a).toFixed(2)}"/>`;
  s += headTop(hx, hy, .62, sh > .5);
  // the angle label
  s += `<g opacity="${a.toFixed(2)}">` + panel(250, 1170, 220, 74) + lbl(360, 1222, sh < .5 ? '٢٠٠ درجة' : '١٥٠ درجة', 1, sh < .5 ? '#ffe7a8' : '#ff9a8a', 40) + `</g>`;
  // the car in the blind side
  const ang = Math.atan2(cxp - hx, -(cyp - hy)) * 180 / Math.PI, inV = Math.abs(ang) < A / 2;
  if (cxp < 740 && !inV) { const fl = .6 + .4 * Math.sin(t * 10); s += `<circle cx="${cxp.toFixed(1)}" cy="${cyp}" r="80" fill="none" stroke="#ff5a4a" stroke-width="5" opacity="${fl.toFixed(2)}"/>` + lbl(cxp - 4, cyp - 96, 'لا تراه!', ease(ramp(t, WS(3, 14) - .2, WS(3, 14) + .2)), '#ff8a7a', 34); }
  noEarth(); F.ov = ''; return s;
}

// 4: no spare eye: one injury and you are blind
function viewBox(x, y, w, h, dark, id) {
  return miniView(x, y, w, h, 0, id, 1) + (dark > 0 ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#000" opacity="${(.97 * dark).toFixed(2)}"/>` : '');
}
function sceneSpare(t) {
  const inj = ease(ramp(t, WS(4, 4) - .15, WS(4, 4) + .2)), dk = ease(ramp(t, WS(4, 6) - .2, WS(4, 7) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stP', '#2a3450', '#090c18', 11);
  s += faceF('fa', 192, 660, .66, { m: 0, top: '#2a5a8a', patch: { L: inj }, look: .3 }) + faceF('fb', 528, 660, .66, { m: 1, top: '#3a7a5a', patch: { C: inj }, hair: '#3a2416', look: -.3 });
  s += lbl(192, 470, 'عينان', 1, '#ffe7a8', 34) + lbl(528, 470, 'عينٌ واحدة', 1, '#ffe7a8', 34);
  // what each one sees after the injury
  s += viewBox(72, 960, 240, 160, 0, 'vbA') + viewBox(408, 960, 240, 160, dk, 'vbB');
  if (inj > 0) s += lbl(192, 1168, 'ما زالَ يرى', inj, '#f4c76b', 30) + lbl(528, 1168, 'ظلامٌ تامّ', dk, '#ff8a7a', 30);
  // the hit: a small flash at the moment of injury
  const fl = Math.exp(-Math.max(0, t - WS(4, 4)) * 6) * (t > WS(4, 4) - .05 ? 1 : 0); if (fl > .02) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#fff" opacity="${(.35 * fl).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 5: the brain copes: moving the head (near things slide faster), sizes and shadows
function sceneCues(t) {
  const T = t - S0(5), sw = 46 * Math.sin(T * 1.7) * ease(ramp(t, WS(5, 3) - .3, WS(5, 3) + .3));
  const L = (k, inner) => `<g transform="translate(${(sw * k).toFixed(2)},0)">${inner}</g>`;
  let s = `<defs>${DEFO()}<linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a74bc"/><stop offset=".6" stop-color="#94bee4"/><stop offset="1" stop-color="#e8e0c8"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skC)"/>`;
  s += L(.04, `<circle cx="590" cy="300" r="150" fill="#fff6d8" opacity=".25" filter="url(#soft)"/><circle cx="590" cy="300" r="48" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="590" cy="300" r="22" fill="#fffef6"/>` + cumulus(220, 420, 240, 61, { a: .9 }) + cumulus(560, 520, 170, 63, { a: .8 }));
  s += L(.1, mountainsR(760, 90, 77, { rock: '#7e8aa0' }) + `<rect x="-200" y="740" width="1120" height="80" fill="#7e8aa0"/>` + mountainsR(800, 50, 79, { rock: '#6a7a68' }) + `<rect x="-200" y="790" width="1120" height="60" fill="#6a7a68"/><rect x="-200" y="700" width="1120" height="120" fill="#e8e0c8" opacity=".3" filter="url(#soft)"/>`);
  s += L(.3, forestR(840, 40, 20, 46, 81, '#4a6a3a', { dy: 8 }) + `<rect x="-200" y="830" width="1120" height="480" fill="#8aa060"/>`);
  s += meadow(840, 1300, t, { c0: '#94a868', c1: '#5e7240' });
  // a path across the meadow; two people of the same height: one near, one far
  s += L(.45, `<path d="M-200,930 Q300,900 920,940 L920,980 Q300,940 -200,972Z" fill="#c8b48a"/>` + `<ellipse cx="300" cy="934" rx="40" ry="6" fill="#000" opacity=".25" filter="url(#blur2)"/>` + hero(282, 930, Object.assign({ s: .34, face: -1, shade: 1, walk: T * 3, amp: .4 }, pal(2))));
  s += L(.62, treeR(150, 1010, 260, 91, t));
  s += L(.9, `<path d="M450,1122 L640,1160 L652,1146 L470,1112Z" fill="#1a2a10" opacity=".45" filter="url(#blur2)"/>` + hero(470, 1120, Object.assign({ s: .74, face: -1, shade: 1 }, pal(2))));
  s += L(1.6, treeR(700, 1290, 520, 93, t) + `<path d="M-60,1300 Q40,1180 120,1210 Q200,1240 260,1300Z" fill="#3a5a2a"/><path d="M-60,1300 Q40,1200 120,1226" stroke="#6a8a4a" stroke-width="5" fill="none" opacity=".5"/>`);
  // labels
  const k1 = ease(ramp(t, WS(5, 3), WS(5, 4) + .2)), k2 = ease(ramp(t, WS(5, 7) - .1, WS(5, 7) + .3)), k3 = ease(ramp(t, WS(5, 8) - .1, WS(5, 8) + .3));
  if (k1 > 0) s += `<g opacity="${k1.toFixed(2)}">` + panel(452, 560, 236, 110) + lbl(570, 604, 'القريبُ يتحرّك', 1, '#fff', 26) + lbl(570, 646, 'أسرعَ من البعيد', 1, '#f4c76b', 26) + `</g>` + arrow(600 + sw * 1.6 - 60, 1000, 600 + sw * 1.6 + 60, 1000, k1, '#f4c76b', 5);
  if (k2 > 0) s += `<g opacity="${k2.toFixed(2)}"><path d="M${(282 + sw * .45).toFixed(1)},${(930 - 70).toFixed(1)} L${(470 + sw * .9).toFixed(1)},${(1120 - 210).toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 7"/>` + panel(40, 700, 200, 60) + lbl(140, 740, 'الحجم', 1, '#f4c76b', 30) + `</g>`;
  if (k3 > 0) s += `<g opacity="${k3.toFixed(2)}">` + panel(470, 1180, 200, 60) + lbl(570, 1220, 'الظلّ', 1, '#f4c76b', 30) + `<path d="M${(600 + sw * .9).toFixed(1)},1180 L${(590 + sw * .9).toFixed(1)},1158" stroke="#f4c76b" stroke-width="3"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// 6: no 3D films: they trick two eyes, not one
function sceneCinema(t) {
  const x3 = ease(ramp(t, WS(6, 6) - .3, WS(6, 6) + .2)), no = ease(ramp(t, WS(6, 9) - .2, WS(6, 10) + .1)), T = t - S0(6);
  let s = `<defs>${DEFO()}<linearGradient id="hallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1018"/><stop offset="1" stop-color="#0a0608"/></linearGradient><clipPath id="scrC"><rect x="50" y="390" width="620" height="350"/></clipPath></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#hallG)"/>`;
  // the side curtains and the screen
  s += `<rect x="-20" y="340" width="70" height="460" fill="#5a1418"/><rect x="670" y="340" width="70" height="460" fill="#5a1418"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-10 + i * 12},340 v460 M${680 + i * 12},340 v460" stroke="#000" stroke-width="4" opacity=".3"/>`).join('') +
    `<rect x="40" y="380" width="640" height="370" fill="#ddd8d0" opacity=".08" filter="url(#blur16)"/><g clip-path="url(#scrC)"><rect x="50" y="390" width="620" height="350" fill="#0e1428"/>`;
  const r = RS(71); for (let i = 0; i < 40; i++) { const x = 50 + r() * 620, y = 390 + r() * 350; s += `<circle cx="${(x - 5).toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#ff5a5a" opacity=".8"/><circle cx="${(x + 5).toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#5af0ff" opacity=".8"/>`; }
  // a ringed planet in red and cyan (anaglyph), coming out of the screen
  const px = 360 + 20 * Math.sin(T * .6), py = 566, pr = 92 + T * 3;
  const planet = (dx, col) => `<g transform="translate(${dx},0)" style="mix-blend-mode:screen"><circle cx="${px}" cy="${py}" r="${pr}" fill="${col}" opacity=".7"/><ellipse cx="${px}" cy="${py}" rx="${pr * 1.8}" ry="${pr * .36}" fill="none" stroke="${col}" stroke-width="12" opacity=".65" transform="rotate(-14,${px},${py})"/></g>`;
  s += planet(-16, '#ff3a3a') + planet(16, '#2ae8ff') + `<circle cx="${px - pr * .3}" cy="${py - pr * .35}" r="${pr * .25}" fill="#fff" opacity=".12" filter="url(#blur9)"/></g>`;
  s += `<path d="M360,140 L50,390 L670,390Z" fill="#fff6e0" opacity=".05"/>`;
  // rows of seats with heads seen from behind
  [[860, .8, 0], [990, .9, 1], [1130, 1, 2]].forEach(([y, k, rw]) => { for (let i = -1; i < 8; i++) { const x = 40 + i * 100 * k + (rw % 2) * 46, rr = RS(rw * 20 + i + 50);
    s += `<ellipse cx="${x}" cy="${y - 54 * k}" rx="${30 * k}" ry="${36 * k}" fill="${['#2a1e18', '#1a120c', '#3a2a1e', '#4a3a2a'][Math.floor(rr() * 4)]}"/><rect x="${x - 46 * k}" y="${y - 30 * k}" width="${92 * k}" height="${110 * k}" rx="${18 * k}" fill="#6a1a20"/><rect x="${x - 46 * k}" y="${y - 30 * k}" width="${92 * k}" height="${12 * k}" rx="${6 * k}" fill="#fff" opacity=".1"/>` +
      `<path d="M${x - 30 * k},${y - 60 * k} L${x + 30 * k},${y - 60 * k}" stroke="#f2f2f2" stroke-width="${3 * k}" opacity=".5"/>`; } });
  s += `<rect x="-20" y="780" width="760" height="520" fill="#000" opacity=".25"/>`;
  // the inset: a one-eyed face behind 3D glasses
  if (x3 > 0) { const cx = 360, cy = 1040, R = 170;
    s += `<defs><clipPath id="g3C"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g opacity="${x3.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".5" filter="url(#blur9)"/><g clip-path="url(#g3C)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#20182a"/>` +
      faceF('fc', cx, cy + 10, .62, { m: 1, top: '#3a7a5a', glasses: 1, look: .2 * Math.sin(t * 2) }) + `</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
    if (no > 0) s += `<path d="M${cx - 120},${cy - 120} L${cx + 120},${cy + 120} M${cx + 120},${cy - 120} L${cx - 120},${cy + 120}" stroke="#e0483a" stroke-width="14" stroke-linecap="round" opacity="${(.85 * no).toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}

// 7: the twist: the one-eyed giant myth may come from dwarf elephant skulls (the big nasal opening looks like one eye)
function skull(cx, cy, S, a) {
  if (a <= 0) return '';
  // front view of a dwarf elephant skull: a wide domed cranium, the big nasal opening high in the middle,
  // small eye sockets low at the sides behind the cheek arches, and the broad tusk sheaths below
  const CR = 'M-210,30 C-220,-110 -128,-200 0,-204 C128,-200 220,-110 210,30 C206,80 186,112 160,126 L120,130 C110,150 100,160 92,170 L-92,170 C-100,160 -110,150 -120,130 L-160,126 C-186,112 -206,80 -210,30Z';
  const PM = 'M-120,110 C-118,190 -110,250 -96,300 L-40,312 L0,300 L40,312 L96,300 C110,250 118,190 120,110Z';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})" opacity="${a.toFixed(2)}"><ellipse cx="0" cy="350" rx="240" ry="26" fill="#000" opacity=".5" filter="url(#blur9)"/>`;
  s += `<path d="${PM}" fill="url(#boneG)"/><path d="${PM}" fill="url(#pmSh)"/><path d="${PM}" fill="#000" filter="url(#grainR)" opacity=".18"/><path d="M0,140 L0,300" stroke="#6a5a40" stroke-width="4" opacity=".5"/>`;
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 66}" cy="300" rx="30" ry="14" fill="#2a1e10"/><path d="M${k * 56},300 C${k * 60},336 ${k * 78},366 ${k * 108},372 C${k * 100},352 ${k * 92},326 ${k * 90},300Z" fill="#efe4c8"/><path d="M${k * 60},304 C${k * 64},334 ${k * 78},356 ${k * 100},366" stroke="#fff" stroke-width="3" fill="none" opacity=".4"/>` +
    `<path d="M${k * 100},150 C${k * 104},210 ${k * 98},260 ${k * 90},296" stroke="#7a6a4c" stroke-width="5" fill="none" opacity=".45"/>`; });
  s += `<path d="${CR}" fill="url(#boneG)"/><path d="${CR}" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  // cheek arches and the side eye sockets
  [-1, 1].forEach(k => { s += `<path d="M${k * 150},70 C${k * 186},74 ${k * 214},96 ${k * 222},140 C${k * 206},132 ${k * 186},118 ${k * 156},110Z" fill="#cdbd98"/><path d="M${k * 156},110 C${k * 186},118 ${k * 206},132 ${k * 222},140" stroke="#6a5a40" stroke-width="3" fill="none" opacity=".6"/>` +
    `<ellipse cx="${k * 160}" cy="74" rx="26" ry="30" fill="url(#holeG)"/><path d="M${k * 136},56 C${k * 150},40 ${k * 176},42 ${k * 186},62" stroke="#f6eedc" stroke-width="3" fill="none" opacity=".45"/>`; });
  // the big nasal opening
  s += `<path d="M-80,-50 C-86,-118 -40,-146 0,-146 C40,-146 86,-118 80,-50 C76,0 40,26 0,26 C-40,26 -76,0 -80,-50Z" fill="url(#holeG)"/><path d="M-80,-50 C-86,-118 -40,-146 0,-146 C40,-146 86,-118 80,-50" stroke="#f6eedc" stroke-width="4" fill="none" opacity=".45"/>` +
    `<path d="M-84,-40 C-88,10 -50,44 0,46 C50,44 88,10 84,-40" stroke="#7a6a4c" stroke-width="5" fill="none" opacity=".45"/><path d="M-8,-30 C-4,-8 -2,10 0,22" stroke="#3a2a18" stroke-width="5" fill="none" opacity=".6"/>`;
  // wear, cracks and light from the upper left
  s += `<path d="M-130,-150 l20,26 l-6,22 l18,18 M106,-168 l-14,30 l10,20 M-180,60 l20,10 l8,22 M150,10 l-18,14" stroke="#5a4a32" stroke-width="2.4" fill="none" opacity=".55"/>` +
    `<path d="${CR}" fill="none" stroke="#5a4a32" stroke-width="4" opacity=".4"/><path d="M-160,-110 C-110,-180 40,-196 120,-156" stroke="#fff" stroke-width="12" fill="none" opacity=".2" filter="url(#blur5)"/><path d="M120,-120 C190,-60 200,40 170,110" stroke="#000" stroke-width="24" fill="none" opacity=".16" filter="url(#blur9)"/>`;
  return s + `</g>`;
}
function sceneSkull(t) {
  const my = ease(ramp(t, S0(7) - .3, S0(7) + .5)) * (1 - ease(ramp(t, WS(7, 5) - .2, WS(7, 7)))), sk = ease(ramp(t, WS(7, 6) - .3, WS(7, 9) + .1)), ns = ease(ramp(t, WS(7, 12) - .2, WS(7, 13) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stK', '#2e2620', '#080604', 17);
  s += `<path d="M300,-40 L420,-40 L640,1240 L80,1240Z" fill="url(#spotG)"/>`;
  // the legendary giant, in the shadows
  if (my > 0) s += `<g opacity="${my.toFixed(2)}" style="filter:brightness(.55) sepia(.5)">` + faceF('fk', 360, 660, 1.45, { m: 1, top: '#5a4a36', hair: '#1a120c', wild: 1, look: .3 * Math.sin(t) }) + `</g>`;
  // the skull on a stone base
  s += `<g opacity="${sk.toFixed(2)}"><path d="M130,1110 L590,1110 L620,1240 L100,1240Z" fill="#4a4038"/><rect x="150" y="1104" width="420" height="12" fill="#6a5e52"/><rect x="120" y="1110" width="480" height="140" fill="#000" filter="url(#grainR)" opacity=".3"/></g>` + skull(360, 730, 1.0, sk);
  if (sk > 0) s += `<g opacity="${sk.toFixed(2)}">` + panel(230, 1150, 260, 56) + lbl(360, 1188, 'جمجمةُ فيلٍ قزم', 1, '#f2e8d2', 26) + `</g>`;
  if (ns > 0) { const r = 100 + 6 * Math.sin(t * 4); s += `<ellipse cx="360" cy="${(730 - 60).toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * .95).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="5" stroke-dasharray="14 10" opacity="${ns.toFixed(2)}"/>` +
    arrow(560, 520, 460, 640, ns, '#f4c76b', 5) + lbl(560, 500, 'فتحةُ الأنف', ns, '#f4c76b', 32) + arrow(110, 900, 180, 818, ns, '#c8ccd6', 4) + lbl(110, 940, 'العينان هنا', ns, '#d8dce6', 26); }
  noEarth(); F.ov = ''; return s;
}

// 8: a real one-eyed animal: the tiny copepod Cyclops, under a microscope
function copepod(x, y, S, ang, t) {
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${S})">`;
  // the long first antennae with fine hairs
  [-1, 1].forEach(k => { const w = Math.sin(t * 3 + k) * 4; let d = `M${k * 14},-96`; const pts = []; for (let i = 1; i <= 8; i++) { const u = i / 8, px = k * (14 + 150 * u), py = -96 - 50 * Math.sin(u * 1.6) + 60 * u * u + w * u; pts.push([px, py]); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; }
    s += `<path d="${d}" stroke="#a8784a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#e8c898" stroke-width="1.6" fill="none" opacity=".6"/>` + pts.map(([px, py], i) => `<path d="M${px.toFixed(1)},${py.toFixed(1)} l${(k * 6).toFixed(1)},${-14 + i}" stroke="#a8784a" stroke-width="1.2" opacity=".7"/>`).join(''); });
  // egg sacs at the sides of the tail
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 36}" cy="96" rx="24" ry="44" fill="#4a5a2a" opacity=".85"/>` + Array.from({ length: 14 }, (_, i) => `<circle cx="${(k * 36 + ((i % 3) - 1) * 12).toFixed(1)}" cy="${(64 + Math.floor(i / 3) * 14).toFixed(1)}" r="6" fill="#6a7a3a" stroke="#2a3418" stroke-width="1"/>`).join(''); });
  // the tail with its fork
  s += `<path d="M-14,40 L14,40 L10,150 L-10,150Z" fill="#c8a070" opacity=".85"/>` + [70, 96, 122].map(yy => `<path d="M-12,${yy} L12,${yy}" stroke="#8a6a44" stroke-width="2"/>`).join('') +
    `<path d="M-8,150 L-18,184 M8,150 L18,184" stroke="#c8a070" stroke-width="6" stroke-linecap="round"/><path d="M-18,184 l-10,40 M-18,184 l2,44 M18,184 l10,40 M18,184 l-2,44" stroke="#a8784a" stroke-width="1.6"/>`;
  // the body: translucent amber with segments and the gut
  s += `<path d="M0,-120 C44,-120 54,-60 50,-10 C46,30 30,50 0,52 C-30,50 -46,30 -50,-10 C-54,-60 -44,-120 0,-120Z" fill="#d8b07a" opacity=".85"/><path d="M0,-120 C44,-120 54,-60 50,-10 C46,30 30,50 0,52 C-30,50 -46,30 -50,-10 C-54,-60 -44,-120 0,-120Z" fill="none" stroke="#8a6a44" stroke-width="3"/>` +
    [-40, -12, 14, 34].map(yy => `<path d="M-48,${yy} Q0,${yy + 10} 48,${yy}" stroke="#8a6a44" stroke-width="2" fill="none" opacity=".7"/>`).join('') +
    `<path d="M0,-90 C-8,-40 8,0 0,46" stroke="#7a4a20" stroke-width="10" fill="none" opacity=".55"/><ellipse cx="-14" cy="-80" rx="12" ry="20" fill="#fff" opacity=".25"/>`;
  // the single eye: a red spot in the middle of the head
  s += `<circle cx="0" cy="-98" r="16" fill="#ff3a2a" opacity=".35" filter="url(#blur5)"/><circle cx="0" cy="-98" r="9" fill="#c81a12"/><circle cx="-2.5" cy="-101" r="3" fill="#ffb0a0"/>`;
  return s + `</g>`;
}
function sceneCopepod(t) {
  const T = t - S0(8), a = ease(ramp(t, S0(8) - .2, S0(8) + .5)), ek = ease(ramp(t, WS(8, 9) - .2, WS(8, 10) + .2));
  let s = `<defs>${DEFO()}<clipPath id="micC"><circle cx="360" cy="760" r="320"/></clipPath><radialGradient id="micV" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="#050607"/>`;
  s += `<g clip-path="url(#micC)"><rect x="40" y="440" width="640" height="640" fill="url(#micG)"/>`;
  const r = RS(41); for (let i = 0; i < 46; i++) { const x = 40 + r() * 640 + Math.sin(T * .5 + i) * 6, y = 440 + r() * 640 + T * (4 + r() * 6), rr = 2 + r() * 7; s += `<circle cx="${x.toFixed(1)}" cy="${pmod(y - 440, 640) + 440}" r="${rr.toFixed(1)}" fill="${r() < .5 ? '#7aa860' : '#a8c890'}" opacity="${(.25 + .35 * r()).toFixed(2)}"/>`; }
  for (let i = 0; i < 5; i++) { const x = 90 + r() * 540, y = 500 + r() * 520, an = r() * 180; s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${an.toFixed(0)})"><rect x="-22" y="-5" width="44" height="10" rx="5" fill="#b8c87a" opacity=".55"/><path d="M-18,0 L18,0" stroke="#7a8a4a" stroke-width="1.2" opacity=".6"/></g>`; }
  // the copepod hops in short jerks
  const hop = T * 1.3, ph = hop - Math.floor(hop), jump = Math.floor(hop) * 18 + 18 * (1 - Math.exp(-ph * 9)), cx = 360 + Math.sin(T * .7) * 20, cy = 800 - jump * .5;
  s += copepod(cx, cy, 1.12, -6 + 4 * Math.sin(T * 1.1), t);
  if (ek > 0) s += `<circle cx="${(cx - 12).toFixed(1)}" cy="${(cy - 110).toFixed(1)}" r="${(34 + 4 * Math.sin(t * 5)).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${ek.toFixed(2)}"/>`;
  s += `<rect x="40" y="440" width="640" height="640" fill="url(#micV)"/></g><circle cx="360" cy="760" r="320" fill="none" stroke="#1a1c20" stroke-width="18"/><circle cx="360" cy="760" r="330" fill="none" stroke="#3a3e46" stroke-width="4"/>`;
  // the scale bar
  s += `<g opacity="${a.toFixed(2)}"><path d="M150,950 L250,950" stroke="#1a2a1a" stroke-width="5"/><path d="M150,940 v20 M250,940 v20" stroke="#1a2a1a" stroke-width="4"/>` + lbl(200, 928, 'نصفُ ملّيمتر', 1, '#fff', 24) + `</g>`;
  noEarth(); F.ov = ''; return s;
}

const SPDEF = `<linearGradient id="skinP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8704e"/><stop offset=".45" stop-color="#d4a080"/><stop offset="1" stop-color="#b07a58"/></linearGradient>` +
  `<linearGradient id="skinP2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a3c"/><stop offset=".45" stop-color="#b8845e"/><stop offset="1" stop-color="#94603e"/></linearGradient>` +
  `<linearGradient id="phG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a44"/><stop offset="1" stop-color="#0c1220"/></linearGradient>` +
  `<linearGradient id="radG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3e"/><stop offset=".5" stop-color="#7a4e2a"/><stop offset="1" stop-color="#4a2e18"/></linearGradient>` +
  `<radialGradient id="grillG" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#e8dcc0"/><stop offset="1" stop-color="#a8987a"/></radialGradient>` +
  `<radialGradient id="scrGl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9ad0ff" stop-opacity=".55"/><stop offset="1" stop-color="#9ad0ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="warmG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd59a" stop-opacity=".75"/><stop offset=".5" stop-color="#ffb35c" stop-opacity=".22"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="boardG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e4a3a"/><stop offset="1" stop-color="#1c3226"/></linearGradient>` +
  `<linearGradient id="wallC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6d6b4"/><stop offset="1" stop-color="#c8b48e"/></linearGradient>` +
  `<linearGradient id="floorC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6c44"/><stop offset="1" stop-color="#6a4426"/></linearGradient>` +
  `<linearGradient id="winL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ff"/><stop offset="1" stop-color="#eaf4ff"/></linearGradient>`;
const glB = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * (o.sp ?? .03), Ld = sunFor((o.az ?? .25) + t * .02, o.off ?? -.6, o.up ?? .5), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]);
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; F.earth = null; F.moon = null; F.sun = null;
  return { cam, spin, cN, c0, R: c0[2] / Math.sqrt(1 - 1 / (cN * cN)) }; };
const DEFS = () => `${DEFO()}${SPDEF}`;
const PALS = [{ top: '#8a3b3b', pants: '#2a2533', skin: '#a46a46', hair: '#1b1410' }, { top: '#3f6b5a', pants: '#24262e', skin: '#c08a66', hair: '#2a1d16' }, { top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d' }, { top: '#7a6a4a', pants: '#2b2a30', skin: '#b07a55', hair: '#1d1612' },
  { top: '#b8742a', pants: '#2a2a34', skin: '#e0b090', hair: '#3a2416' }, { top: '#5a5a6a', pants: '#1c1c24', skin: '#c89070', hair: '#1a120c' }, { top: '#9a4a6a', pants: '#2a2230', skin: '#6a4028', hair: '#120c08' }, { top: '#2a6a8a', pants: '#3a3a44', skin: '#f0c8a8', hair: '#6a4a2a' },
  { top: '#6a8a3a', pants: '#2a2a34', skin: '#a87050', hair: '#2a1e18' }, { top: '#c04a3a', pants: '#24262e', skin: '#8a5a3c', hair: '#17110d' }];
const palS = i => Object.assign({}, PALS[i % PALS.length]);
const ARK = n => AR(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')).replace(/,/g, '٬');

// ---------- the front face with expressions (replaces faceF of #37) ----------
// o: {m, patch, top, hair, look, glasses, wild, open, talk (0..1 mouth open), mood: 'joy' | 'fear' | 'anger', k (mood strength)}
function faceF(id, cx, cy, S, o = {}) {
  const m = o.m || 0, blink = m > 0 && m < 1 ? Math.sin(Math.PI * Math.min(1, m)) : 0, one = m >= .5;
  const mood = o.mood || '', k = o.k ?? (mood ? 1 : 0), J = mood === 'joy' ? k : 0, Fe = mood === 'fear' ? k : 0, An = mood === 'anger' ? k : 0;
  const op = (o.open ?? 1) * (1 - blink * .98) * (1 + .38 * Fe - .3 * An - .3 * J);
  const top = o.top || '#2a5a8a', hair = o.hair || '#2a1a12';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})">`;
  s += `<path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="${top}"/><path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="url(#shirtF)"/>` +
    `<path d="M-48,214 Q0,276 48,214" fill="#000" opacity=".22"/><path d="M-70,236 Q0,300 70,236" stroke="#000" stroke-width="5" fill="none" opacity=".18"/>`;
  s += `<path d="M-50,110 L-52,236 Q0,268 52,236 L50,110Z" fill="#b47c5a"/><path d="M-50,140 Q0,190 50,140 L50,110 L-50,110Z" fill="#000" opacity=".18"/>`;
  [-1, 1].forEach(q => { s += `<ellipse cx="${q * 128}" cy="8" rx="22" ry="38" fill="${q < 0 ? '#c08868' : '#a87050'}"/><path d="M${q * 132},-14 Q${q * 142},8 ${q * 130},34" stroke="#7a4a32" stroke-width="4" fill="none" opacity=".5"/>`; });
  const HD = 'M-126,-20 C-128,-122 -72,-168 0,-168 C72,-168 128,-122 126,-20 C124,64 92,132 0,164 C-92,132 -124,64 -126,-20Z';
  s += `<path d="${HD}" fill="url(#skF)"/><path d="${HD}" fill="url(#skSide)"/><path d="${HD}" fill="#000" filter="url(#grainR)" opacity=".1"/>` +
    `<ellipse cx="-62" cy="${52 - 10 * J}" rx="34" ry="18" fill="#e07a6a" opacity="${(.16 + .14 * J + .1 * An).toFixed(2)}" filter="url(#blur5)"/><ellipse cx="62" cy="${52 - 10 * J}" rx="34" ry="18" fill="#c0604a" opacity="${(.14 + .14 * J + .1 * An).toFixed(2)}" filter="url(#blur5)"/>` +
    `<path d="M-60,120 Q0,170 60,120" stroke="#000" stroke-width="10" fill="none" opacity=".08" filter="url(#blur5)"/>` +
    (Fe > 0 ? `<path d="${HD}" fill="#9ab0c8" opacity="${(.14 * Fe).toFixed(2)}"/>` : '');
  s += `<path d="M-134,-6 C-146,-136 -72,-196 0,-194 C82,-196 146,-136 134,-6 C126,-58 108,-98 66,-112 C18,-128 -36,-124 -78,-104 C-108,-84 -126,-50 -134,-6Z" fill="${hair}"/>` +
    `<path d="M-110,-110 C-70,-160 20,-176 90,-130" stroke="#fff" stroke-width="5" fill="none" opacity=".08"/>`;
  // forehead lines for fear, a frown crease for anger
  if (Fe > .05) s += `<path d="M-52,-96 Q0,-108 52,-96 M-44,-82 Q0,-92 44,-82" stroke="#8a5a40" stroke-width="3" fill="none" opacity="${(.45 * Fe).toFixed(2)}"/>`;
  if (An > .05) s += `<path d="M-8,-58 L-4,-40 M8,-58 L4,-40" stroke="#7a4a32" stroke-width="3.4" fill="none" opacity="${(.6 * An).toFixed(2)}"/>`;
  // brows: anger pulls the inner ends down, fear lifts and pinches them up
  const bi = 16 * An - 22 * Fe - 6 * J, bo = -10 * An - 16 * Fe - 6 * J;
  s += `<path d="M-84,${-56 + bo} Q-52,${-74 + (bo + bi) / 2 - 2 * Fe} -18,${-58 + bi}" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M18,${-58 + bi} Q52,${-74 + (bo + bi) / 2 - 2 * Fe} 84,${-56 + bo}" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  s += eyeF(id + 'L', -50, -14, 58, op, o.look) + eyeF(id + 'R', 50, -14, 58, op, o.look);
  // joy: raised cheeks under the eyes
  if (J > .05) s += `<path d="M-78,4 Q-50,16 -22,4 M22,4 Q50,16 78,4" stroke="#8a5a40" stroke-width="3" fill="none" opacity="${(.5 * J).toFixed(2)}"/>`;
  // nose
  s += `<path d="M-4,-12 C-8,30 -22,50 -20,62 C-14,74 14,74 20,62 C22,50 8,30 4,-12" fill="#b47858" opacity=".55"/><path d="M8,-6 C14,34 26,52 20,64" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>` +
    `<ellipse cx="-11" cy="66" rx="${7 + 2 * An}" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="11" cy="66" rx="${7 + 2 * An}" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="-4" cy="54" rx="6" ry="3" fill="#fff" opacity=".18"/>`;
  // mouth
  const tk = o.talk || 0, op2 = Math.max(tk, Fe * .75);
  if (J > .05) { const w = 36 + 14 * J, d = 22 * J;
    s += `<path d="M${-w},${100 - 6 * J} Q0,${104 + d * 1.8} ${w},${100 - 6 * J} Q0,${108 + d * .5} ${-w},${100 - 6 * J}Z" fill="#5a1a18"/><path d="M${-w + 8},${101 - 6 * J} Q0,${106 + d * .7} ${w - 8},${101 - 6 * J} L${w - 12},${104 - 4 * J} Q0,${110 + d * .7} ${-w + 12},${104 - 4 * J}Z" fill="#f4eee4"/>` +
      `<path d="M${-w},${100 - 6 * J} Q0,${104 + d * 1.8} ${w},${100 - 6 * J}" stroke="#a4504a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${-w - 6},${96 - 8 * J} q-6,6 -2,14 M${w + 6},${96 - 8 * J} q6,6 2,14" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>`;
  } else if (op2 > .05) { const h = 6 + 34 * op2, w = 26 - 6 * op2 + 8 * Fe;
    s += `<ellipse cx="0" cy="${106 + h * .3}" rx="${w}" ry="${h / 2 + 4}" fill="#3a0e0c"/><path d="M${-w + 4},${106 + h * .3 - h / 2} Q0,${106 + h * .3 - h / 2 - 6} ${w - 4},${106 + h * .3 - h / 2}" stroke="#f4eee4" stroke-width="${(4 + 3 * op2).toFixed(1)}" fill="none" opacity=".85"/>` +
      `<ellipse cx="0" cy="${106 + h * .3 + h / 2 - 4}" rx="${w * .55}" ry="${h * .18 + 2}" fill="#b0484a" opacity=".85"/><ellipse cx="0" cy="${106 + h * .3}" rx="${w + 4}" ry="${h / 2 + 7}" fill="none" stroke="#a4504a" stroke-width="7"/>`;
  } else if (An > .05) {
    s += `<path d="M-32,${108 + 4 * An} Q0,${98} 32,${108 + 4 * An}" stroke="#7a2a26" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-30,${112 + 4 * An} Q0,${104} 30,${112 + 4 * An}" stroke="#a4504a" stroke-width="4" fill="none" opacity=".6"/><path d="M-38,${112 + 6 * An} q-4,8 2,14 M38,${112 + 6 * An} q4,8 -2,14" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>`;
  } else s += `<path d="M-36,104 Q-14,96 0,100 Q14,96 36,104 Q16,114 0,113 Q-16,114 -36,104Z" fill="#a4504a"/><path d="M-36,104 Q0,108 36,104" stroke="#5a2420" stroke-width="2.5" fill="none"/><path d="M-20,112 Q0,120 20,112" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`;
  return s + `</g>`;
}

// ---------- a hand seen from the front (wrist at 0,0, fingers up); c = curl of [thumb, index, middle, ring, little] (0 straight .. 1 folded) ----------
function palm(x, y, S, rot, c = [0, 0, 0, 0, 0], o = {}) {
  const sk = o.dark ? 'url(#skinP2)' : 'url(#skinP)', base = o.dark ? '#94603e' : '#b8805e', lit = o.dark ? '#c8946c' : '#e2b294', crease = o.dark ? '#5a3420' : '#7a4a32', mir = o.mir ? -1 : 1;
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(S * mir).toFixed(3)},${S.toFixed(3)})">`;
  s += `<ellipse cx="6" cy="-60" rx="74" ry="96" fill="#000" opacity=".22" filter="url(#blur9)" transform="translate(10,12)"/>`;
  // forearm and wrist
  s += `<path d="M-34,60 C-36,30 -38,10 -40,-8 L40,-8 C38,10 36,30 34,60Z" fill="${base}"/><path d="M-34,60 C-36,30 -38,10 -40,-8 L-24,-8 L-20,60Z" fill="#000" opacity=".14"/>` + (o.sleeve ? `<path d="M-42,64 L-38,24 L38,24 L42,64Z" fill="${o.sleeve}"/><path d="M-40,26 L40,26" stroke="#000" stroke-width="4" opacity=".2"/>` : '');
  // fingers: knuckle x, y, length, width, angle; straight parts behind the palm, folded parts over it
  const F = [[-33, -102, 84, 20, -7], [-11, -108, 94, 21, -2], [11, -106, 88, 20, 3], [32, -97, 68, 17, 9]], over = [];
  F.forEach(([bx, by, L, w, ang], i) => { const cu = clamp(c[i + 1] || 0), a = ang * Math.PI / 180, Ls = L * (1 - cu), ux = Math.sin(a), uy = -Math.cos(a);
    if (Ls > 4) { const ex = bx + ux * Ls, ey = by + uy * Ls, j1 = [bx + ux * Ls * .45, by + uy * Ls * .45], j2 = [bx + ux * Ls * .75, by + uy * Ls * .75];
      s += `<path d="M${bx},${by + 10} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${bx},${by + 10} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${sk}" stroke-width="${w - 3}" fill="none" stroke-linecap="round"/>` +
        `<path d="M${(bx - w * .25).toFixed(1)},${by + 6} L${(ex - w * .25).toFixed(1)},${(ey + 4).toFixed(1)}" stroke="${lit}" stroke-width="${(w * .22).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".55"/>` +
        [j1, j2].map(j => `<path d="M${(j[0] - w * .38).toFixed(1)},${j[1].toFixed(1)} q${(w * .38).toFixed(1)},3 ${(w * .76).toFixed(1)},0" stroke="${crease}" stroke-width="1.6" fill="none" opacity=".55"/>`).join('') +
        (cu < .3 ? `<ellipse cx="${ex.toFixed(1)}" cy="${(ey + 6).toFixed(1)}" rx="${(w * .3).toFixed(1)}" ry="${(w * .38).toFixed(1)}" fill="#f2cdb6" opacity=".9"/>` : ''); }
    if (cu > .25) { const Lf = L * .52 * cu; over.push(`<path d="M${bx},${by + 2} L${(bx - ux * 4).toFixed(1)},${(by + Lf).toFixed(1)}" stroke="${crease}" stroke-width="${w + 2}" fill="none" stroke-linecap="round" opacity=".55"/><path d="M${bx},${by + 2} L${(bx - ux * 4).toFixed(1)},${(by + Lf).toFixed(1)}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round"/>` +
      `<path d="M${(bx - w * .2).toFixed(1)},${by} L${(bx - w * .2 - ux * 4).toFixed(1)},${(by + Lf - 4).toFixed(1)}" stroke="${lit}" stroke-width="${(w * .24).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".5"/><circle cx="${bx}" cy="${by + 1}" r="${(w * .42).toFixed(1)}" fill="${lit}" opacity=".45"/>`); } });
  // the palm
  s += `<path d="M-46,-6 C-52,-40 -50,-82 -44,-106 C-24,-118 22,-116 44,-100 C50,-70 50,-36 44,-6 C20,4 -22,4 -46,-6Z" fill="${sk}"/>` +
    `<path d="M-36,-62 Q-6,-50 32,-72 M-40,-40 Q-4,-30 36,-48 M-8,-6 Q-24,-42 -20,-94" stroke="${crease}" stroke-width="2.2" fill="none" opacity=".4"/><path d="M-42,-102 C-22,-114 22,-112 40,-98" stroke="${lit}" stroke-width="4" fill="none" opacity=".35"/>` + over.join('');
  // the thumb
  const ct = c[0] || 0, tb = [-40, -40], tm = [lerp(-74, -40, ct), lerp(-74, -70, ct)], tt = [lerp(-92, -18, ct), lerp(-110, -80, ct)];
  s += `<path d="M${tb[0]},${tb[1]} L${tm[0].toFixed(1)},${tm[1].toFixed(1)} L${tt[0].toFixed(1)},${tt[1].toFixed(1)}" stroke="${base}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${tb[0] + 4},${tb[1] - 4} L${(tm[0] + 4).toFixed(1)},${(tm[1] - 2).toFixed(1)} L${(tt[0] + 3).toFixed(1)},${(tt[1] + 2).toFixed(1)}" stroke="${lit}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".5"/>` +
    `<ellipse cx="${tt[0].toFixed(1)}" cy="${(tt[1] + 4).toFixed(1)}" rx="6" ry="7" fill="#f0c8b0" opacity=".8"/>`;
  return s + `</g>`;
}
// hand shapes used as "signs"
const HS = [[0, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 1, 1], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [.6, .5, .5, .5, .5]];
const hsMix = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));
// smooth cycle through hand shapes
function hsAt(t, rate, seed) { const p = t * rate + seed, i = Math.floor(p), u = ease(clamp((p - i - .55) / .45)); return hsMix(HS[i % HS.length], HS[(i + 1) % HS.length], u); }
// signing arm targets for a side-view hero at (x, y) with scale s and facing f
function signT(t, x, y, s, f, seed, k = 1) {
  const a = t * 3.4 + seed, b = t * 2.7 + seed * 1.7;
  return { hF: [x + f * s * (34 + 22 * Math.sin(a) * k), y - s * (236 + 34 * Math.sin(b) * k)], hB: [x + f * s * (18 + 24 * Math.cos(a * .8) * k), y - s * (214 + 30 * Math.cos(b * 1.2) * k)] };
}
// a small open hand at a hero's hand point (side view), so signing is visible
const miniHand = (P, s, f, ang, cu) => palm(P[0], P[1], s * .16, ang, cu || [0, 0, 0, 0, 0], { mir: f < 0 });

// a speech bubble with scribbled "words"; a = opacity, pop = 0..1 bursts it
function bubble(x, y, w, h, a, pop = 0, tailDx = -20, col = '#fff', seed = 1) {
  if (a <= .01) return '';
  const sc = 1 + .5 * pop, op = a * (1 - pop), r = RS(seed);
  let s = `<g opacity="${op.toFixed(2)}" transform="translate(${x},${y}) scale(${sc.toFixed(3)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 5}" width="${w}" height="${h}" rx="${h * .42}" fill="#000" opacity=".25"/>` +
    `<path d="M${tailDx - 10},${h / 2 - 4} L${tailDx - 22},${h / 2 + 22} L${tailDx + 12},${h / 2 - 4}Z" fill="${col}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .42}" fill="${col}"/>`;
  const rows = h > 50 ? 2 : 1; for (let q = 0; q < rows; q++) { let xx = w / 2 - 18; const yy = -h / 2 + h * (q + 1) / (rows + 1); while (xx > -w / 2 + 26) { const ww = 14 + r() * 26; s += `<path d="M${xx.toFixed(1)},${yy.toFixed(1)} L${Math.max(xx - ww, -w / 2 + 18).toFixed(1)},${yy.toFixed(1)}" stroke="#5a6070" stroke-width="5" stroke-linecap="round"/>`; xx -= ww + 9; } }
  s += `</g>`;
  if (pop > 0 && pop < 1) for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283, d = w * .5 + 40 * pop; s += `<path d="M${(x + Math.cos(an) * d * .7).toFixed(1)},${(y + Math.sin(an) * d * .5).toFixed(1)} L${(x + Math.cos(an) * d).toFixed(1)},${(y + Math.sin(an) * d * .7).toFixed(1)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(a * (1 - pop)).toFixed(2)}"/>`; }
  return s;
}
// a mouth drawn on the last side-view hero (HP), open by k
const sideMouth = (s, f, k) => { const h = HP.head; if (k <= .02) return ''; const mx = h[0] + f * 15 * s, my = h[1] + 13 * s; return `<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="${(3.4 * s).toFixed(1)}" ry="${(1 + 4.6 * k * s).toFixed(1)}" fill="#3a0e0c"/>`; };
// a phone in the hand (side view)
const phoneIn = (P, s, f, glow = 1) => `<g transform="translate(${P[0].toFixed(1)},${P[1].toFixed(1)}) rotate(${-f * 18}) scale(${s})"><rect x="-7" y="-13" width="14" height="24" rx="3" fill="#15181e"/><rect x="-5.6" y="-11" width="11.2" height="19" rx="2" fill="#8ac4ff" opacity="${(.9 * glow).toFixed(2)}"/></g>` + (glow > 0 ? `<circle cx="${P[0].toFixed(1)}" cy="${P[1].toFixed(1)}" r="${(22 * s).toFixed(1)}" fill="url(#scrGl)" opacity="${glow.toFixed(2)}"/>` : '');

// 0: a face tries to speak; the sound waves die and the speech bubble is empty
// ===================== "what if land and oceans swapped places?" (Short #41) =====================
// The Earth is the gl3d_world disc-globe (m = 1) with gl3d_sw.js: `swap` sweeps the swapped texture (tex/swap_tex.py) in from the north pole,
// `ridgeA` lights the mid-ocean ridge in gold, `trenchA` the Mariana trench, `heat` tints the equator red and the poles blue.
const WDEF = `<linearGradient id="rockW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b88a60"/><stop offset="1" stop-color="#7a5236"/></linearGradient>` +
  `<linearGradient id="rockE" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#5a3c28"/><stop offset="1" stop-color="#3a2618"/></linearGradient>` +
  `<linearGradient id="deepH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab4cc" stop-opacity="0"/><stop offset="1" stop-color="#4a5e78" stop-opacity=".55"/></linearGradient>` +
  `<linearGradient id="hotSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f86c4"/><stop offset=".55" stop-color="#a9c6de"/><stop offset="1" stop-color="#f2e4c4"/></linearGradient>` +
  `<linearGradient id="redSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a94c2"/><stop offset=".5" stop-color="#d8c8a8"/><stop offset="1" stop-color="#f4d6a0"/></linearGradient>` +
  `<linearGradient id="evS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8dee8"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="#9aa6b8"/></linearGradient>` +
  `<linearGradient id="evR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8076"/><stop offset=".5" stop-color="#6a625a"/><stop offset="1" stop-color="#3e3832"/></linearGradient>` +
  `<linearGradient id="waterB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8ac8"/><stop offset="1" stop-color="#14467a"/></linearGradient>` +
  `<linearGradient id="landB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2bf86"/><stop offset="1" stop-color="#a87a48"/></linearGradient>` +
  `<radialGradient id="sunW"><stop offset="0" stop-color="#fffbe8" stop-opacity=".9"/><stop offset=".3" stop-color="#ffe9b0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>` +
  `<filter id="grainS" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .5 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="hazeW" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".006 .03" numOctaves="2" seed="9"/><feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>`;
const WDEFS = () => `${DEFS()}${WDEF}`;

// ---------- the globe: o.lon = the longitude facing the camera, o.el = camera elevation (rad), o.d = distance ----------
function gW(t, o = {}) {
  const az = o.az ?? .3, el = o.el ?? .28, d = o.d ?? 10.4, tg = o.tg || [0, .09, 0];
  const cam = orbit(d, el, az, tg, o.fov ?? 30), spin = az - ((o.lon ?? 0) + 180) * Math.PI / 180;
  const L = sunFor(az, o.off ?? -.6, o.up ?? .5);
  F.w = { set: 'space', cam, L, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .3, swap: o.swap || 0, ridgeA: o.ridgeA || 0, trenchA: o.trenchA || 0, heat: o.heat || 0 } };
  F.earth = null; F.moon = null; F.sun = null;
  const P = (la, lo, h = 1) => proj3(cam, geo3(la, lo + 180, spin, h)), vis = (la, lo) => { const n = geo3(la, lo + 180, spin, 1), v = [cam.pos[0] - n[0], cam.pos[1] - n[1], cam.pos[2] - n[2]], l = Math.hypot(...v); return (n[0] * v[0] + n[1] * v[1] + n[2] * v[2]) / l; };
  const c0 = proj3(cam, [0, 0, 0]), cN = Math.hypot(...cam.pos.map((x, i) => x)), R = c0[2] / Math.sqrt(1 - 1 / (cN * cN));
  return { cam, spin, P, vis, c0, R };
}
// a label pinned to a place on the globe, hidden on the far side
const pin = (G, la, lo, tx, a, col = '#fff', fs = 30) => { const v = G.vis(la, lo); if (v < .15 || a <= 0) return ''; const [x, y] = G.P(la, lo); return lbl(x, y, tx, (a * clamp((v - .15) / .2)).toFixed(2), col, fs); };
// a path along lat/lon points on the globe (only the visible part), with a moving dash
function gPath(G, pts, o = {}) {
  let d = '', on = false, last = null;
  for (let i = 0; i < pts.length - 1; i++) for (let k = 0; k < 8; k++) { const f = k / 8, la = lerp(pts[i][0], pts[i + 1][0], f), lo = lerp(pts[i][1], pts[i + 1][1], f);
    if (G.vis(la, lo) < .05) { on = false; continue; } const [x, y] = G.P(la, lo, 1.012); d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; last = [x, y]; }
  return { d, last };
}

// ---------- bars: water vs land share ----------
function shareBar(y, pW, a) {
  if (a <= 0) return ''; const x0 = 70, w = 580, h = 70, wW = w * pW;
  return `<g opacity="${a.toFixed(2)}">` + panel(40, y - 70, 640, 190, a) +
    `<clipPath id="barC"><rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="18"/></clipPath><g clip-path="url(#barC)">` +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h}" fill="url(#landB)"/><rect x="${x0}" y="${y}" width="${w}" height="${h}" fill="#000" filter="url(#grainS)" opacity=".35"/>` +
    `<rect x="${x0 + w - wW}" y="${y}" width="${wW.toFixed(1)}" height="${h}" fill="url(#waterB)"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x0 + w - wW},${y + 12 + i * 10} q12,-5 24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0 t24,0" stroke="#fff" stroke-width="1.4" fill="none" opacity=".16"/>`).join('') +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h * .45}" fill="#fff" opacity=".12"/></g>` +
    `<rect x="${x0}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="#f4c76b" stroke-width="3"/>` +
    lbl(x0 + w - wW / 2, y - 18, `ماء ${AR(Math.round(pW * 100))}٪`, 1, '#9fd0ff', 32) + lbl(x0 + (w - wW) / 2, y - 18, `يابسة ${AR(Math.round((1 - pW) * 100))}٪`, 1, '#f4d29a', 32) + `</g>`;
}

// ---------- a path filled with lit rock (fractal noise through a diffuse light, like mountainsR) ----------
function litRock(d, id, c1, c2, seed, o = {}) {
  const fx = o.fx ?? .018, fy = o.fy ?? .006, sc = o.sc ?? 5;
  return `<defs><clipPath id="lc${id}"><path d="${d}"/></clipPath><linearGradient id="lg${id}" x1="0" y1="0" x2="${o.gx ?? 0}" y2="${o.gy ?? 1}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>` +
    `<filter id="lf${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="6" seed="${seed}" result="n"/><feDiffuseLighting in="n" surfaceScale="${sc}" lighting-color="#ffffff" result="l"><feDistantLight azimuth="${o.az ?? 205}" elevation="${o.el ?? 36}"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="${o.k1 ?? 1.4}" k2="0" k3="0" k4="0"/></filter></defs>` +
    `<g clip-path="url(#lc${id})"><rect x="${o.x ?? -40}" y="${o.y ?? -40}" width="${o.w ?? 800}" height="${o.h ?? 1360}" fill="url(#lg${id})" filter="url(#lf${id})"/></g>`;
}
// a jagged line between two points (ledges and notches), as an array of points
function jag(x0, y0, x1, y1, n, amp, seed, bow = 0) { const r = RS(seed), p = []; for (let i = 0; i <= n; i++) { const f = i / n, e = i === 0 || i === n ? 0 : 1; p.push([lerp(x0, x1, f) + bow * Math.sin(f * Math.PI) + e * (r() - .5) * amp, lerp(y0, y1, f) + e * (r() - .5) * amp * .4]); } return p; }
// ---------- the Mariana valley in cross-section, with Everest dropped inside ----------
// rim at y = 470, valley floor at 1170 (11 km -> 700 px, 63.6 px/km); Everest 8.85 km -> 563 px
function valleyX(t, a, ev, gap) {
  if (a <= 0) return ''; const RIM = 470, BOT = 1170, k = 700 / 11;
  let s = `<g opacity="${a.toFixed(2)}"><rect x="-20" y="-20" width="760" height="1320" fill="url(#redSky)"/>`;
  s += `<circle cx="560" cy="300" r="140" fill="url(#sunW)"/><circle cx="560" cy="300" r="46" fill="#fff4cf" opacity=".45" filter="url(#blur9)"/><circle cx="560" cy="300" r="22" fill="#fffdf2"/>`;
  // the far rim of the valley (back wall, hazy) and the plains beyond
  s += `<path d="M-20,${RIM - 30} C120,${RIM - 44} 260,${RIM - 26} 380,${RIM - 38} C500,${RIM - 50} 620,${RIM - 30} 740,${RIM - 40} L740,${RIM + 10} L-20,${RIM + 10}Z" fill="#c8a47a"/>` + mountainsR(RIM - 36, 40, 412, { rock: '#b89a7c', haze: .5, hazeCol: '#e0cdb4' });
  // back wall of the valley (far side, in haze), lit rock with strata
  const back = `M40,${RIM} C120,${RIM + 200} 200,${RIM + 470} 270,${BOT} L450,${BOT} C520,${RIM + 470} 600,${RIM + 200} 680,${RIM}Z`;
  s += litRock(back, 'vb', '#a88466', '#6a5446', 31, { fx: .012, fy: .03, sc: 4 });
  for (let i = 0; i < 16; i++) { const y = RIM + 20 + i * 44, w0 = 640 - (y - RIM) / (BOT - RIM) * 450; s += `<path d="M${360 - w0 / 2},${y} q${w0 / 4},${(-8 + (i % 3) * 5)} ${w0 / 2},0 t${w0 / 2},0" stroke="${i % 2 ? '#5a3c28' : '#c8a07a'}" stroke-width="${5 + (i % 4) * 3}" fill="none" opacity=".22"/>`; }
  s += `<path d="${back}" fill="url(#deepH)"/>`;
  // Everest, lowered in from above: lit rock, a shaded east face, snow fields with streaks down the gullies
  const ey = BOT - (1 - ev) * 800 - 6, H = 8.85 * k, top = ey - H;
  if (ev > 0) { const ex = 360, r = RS(88), pts = [];
    const sil = [[-310, 0], [-250, .12], [-200, .2], [-160, .34], [-120, .4], [-80, .58], [-50, .66], [-22, .86], [0, 1], [26, .9], [48, .8], [70, .82], [110, .66], [150, .55], [190, .5], [230, .32], [270, .16], [310, 0]];
    sil.forEach(([dx, f], i) => { pts.push([ex + dx, ey - H * f]); if (i < sil.length - 1) { const [dx2, f2] = sil[i + 1]; for (let q = 1; q < 4; q++) pts.push([ex + lerp(dx, dx2, q / 4) + (r() - .5) * 6, ey - H * lerp(f, f2, q / 4) + (r() - .5) * H * .02]); } });
    const body = `M${pts.map(PT).join(' L')}Z`, si = pts.findIndex(p => p[1] === top);
    s += `<ellipse cx="${ex}" cy="${ey + 8}" rx="330" ry="22" fill="#000" opacity=".35" filter="url(#blur9)"/>` + litRock(body, 'ev' + Math.round(ey), '#9a9288', '#4e4842', 41, { fx: .03, fy: .012, sc: 7, x: ex - 320, y: top - 10, w: 640, h: H + 30 });
    // the east face in shade: from the summit down a ridge to the base
    const spine = jag(ex, top, ex + 30, ey, 10, 18, 42);
    s += `<path d="M${pts.slice(si).map(PT).join(' L')} L${spine.slice().reverse().map(PT).join(' L')}Z" fill="#1a1e2a" opacity=".42"/>`;
    // snow: above about 55% of the height, with a jagged snow line and tongues down the gullies
    const snowY = f => ey - H * f; let sn = `M${pts.filter(p => p[1] < snowY(.52)).map(PT).join(' L')}`; const sl = jag(ex + 150, snowY(.52), ex - 150, snowY(.52), 16, 40, 43);
    sl.forEach((p, i) => { sn += ` L${PT(p)}`; if (i % 3 === 1) sn += ` L${(p[0] - 6).toFixed(1)},${(p[1] + 40 + r() * 70).toFixed(1)} L${(p[0] - 14).toFixed(1)},${(p[1] + 4).toFixed(1)}`; });
    s += `<defs><clipPath id="evc"><path d="${body}"/></clipPath></defs><g clip-path="url(#evc)">` + litRock(sn + 'Z', 'evs' + Math.round(ey), '#ffffff', '#c6d0de', 44, { fx: .05, fy: .02, sc: 3, k1: 1.15, x: ex - 320, y: top - 10, w: 640, h: H * .6 }) +
      `<path d="M${pts.slice(si).map(PT).join(' L')} L${spine.slice().reverse().map(PT).join(' L')}Z" fill="#30405a" opacity=".3"/>` +
      Array.from({ length: 9 }, (_, i) => { const x0 = ex - 200 + i * 48 + r() * 20, y0 = snowY(.5 - r() * .1); return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} l${(-4 + r() * 8).toFixed(1)},${(30 + r() * 80).toFixed(1)}" stroke="#eef2f8" stroke-width="${(1 + r() * 1.5).toFixed(1)}" opacity=".28"/>`; }).join('') + `</g>`;
    s += `<path d="M${spine.map(PT).join(' L')}" stroke="#d8dee8" stroke-width="2" fill="none" opacity=".35"/>`; }
  // front walls (cut faces of the section): jagged edges, lit left, shaded right, strata
  const eL = jag(40, RIM, 270, BOT, 14, 26, 5, 30), eR = jag(680, RIM, 450, BOT, 14, 26, 6, -30);
  const wallL = `M-30,${RIM - 2} L${eL.map(PT).join(' L')} L-30,${BOT + 140}Z`, wallR = `M750,${RIM - 2} L${eR.map(PT).join(' L')} L750,${BOT + 140}Z`;
  s += litRock(wallL, 'wl', '#d2a274', '#7a5034', 32, { fx: .02, fy: .05, sc: 6 }) + litRock(wallR, 'wr', '#7a5a42', '#2e1e14', 33, { fx: .02, fy: .05, sc: 6, k1: 1.25 });
  s += `<g clip-path="url(#lcwl)">` + Array.from({ length: 18 }, (_, i) => { const y = RIM + 14 + i * 42 + (i % 3) * 6; return `<path d="M-20,${y} q60,${(i % 2 ? 6 : -6)} 120,0 t120,0 t120,0" stroke="${i % 2 ? '#5a3a24' : '#f0c898'}" stroke-width="${3 + (i % 3) * 3}" fill="none" opacity=".28"/>`; }).join('') + `</g>`;
  s += `<g clip-path="url(#lcwr)">` + Array.from({ length: 18 }, (_, i) => { const y = RIM + 14 + i * 42 + (i % 3) * 6; return `<path d="M740,${y} q-60,${(i % 2 ? -6 : 6)} -120,0 t-120,0 t-120,0" stroke="${i % 2 ? '#1a100a' : '#8a6a50'}" stroke-width="${3 + (i % 3) * 3}" fill="none" opacity=".3"/>`; }).join('') + `</g>`;
  s += `<path d="M${eL.map(PT).join(' L')}" stroke="#f6d8b0" stroke-width="3" fill="none" opacity=".5"/><path d="M${eR.map(PT).join(' L')}" stroke="#000" stroke-width="4" fill="none" opacity=".35"/>`;
  s += `<path d="M-20,${BOT} L740,${BOT} L740,1300 L-20,1300Z" fill="#4a3424"/>` + litRock(`M240,${BOT + 4} C300,${BOT - 26} 420,${BOT - 24} 480,${BOT + 4}Z`, 'vt', '#8a6a50', '#5a4030', 34, { fx: .05, fy: .08, sc: 3 });
  // the surface on both sides (the old ocean floor, now dry land)
  s += `<path d="M-20,${RIM - 6} L40,${RIM - 4} L40,${RIM + 4} L-20,${RIM + 4}Z" fill="#e2c08e"/><path d="M680,${RIM - 4} L740,${RIM - 6} L740,${RIM + 4} L680,${RIM + 4}Z" fill="#a88a62"/>`;
  // dimension lines
  const d1 = ease(ramp(t, WS(4, 5) - .2, WS(4, 7))), d2 = ease(ramp(t, WS(4, 13), WS(4, 15)));
  if (d1 > 0) s += `<g opacity="${d1.toFixed(2)}"><path d="M640,${RIM} L640,${RIM + (BOT - RIM) * d1}" stroke="#f4c76b" stroke-width="4"/><path d="M620,${RIM} L660,${RIM} M620,${BOT} L660,${BOT}" stroke="#f4c76b" stroke-width="4" opacity="${d1 > .98 ? 1 : 0}"/>` + lbl(620, (RIM + BOT) / 2, '١١ كم', 1, '#f4c76b', 40, 'end') + `</g>`;
  if (ev > .98) { const q = ease(ramp(t, WS(4, 11) + .5, WS(4, 12) + .2)); s += `<g opacity="${q.toFixed(2)}"><path d="M120,${top} L120,${BOT}" stroke="#fff" stroke-width="3"/><path d="M104,${top} L136,${top} M104,${BOT} L136,${BOT}" stroke="#fff" stroke-width="3"/>` + lbl(140, (top + BOT) / 2 + 60, 'إيفرست ٨٫٨ كم', 1, '#fff', 30, 'start') + `</g>`; }
  if (d2 > 0) s += `<g opacity="${d2.toFixed(2)}"><path d="M200,${RIM} L520,${RIM}" stroke="#ff6a4a" stroke-width="4" stroke-dasharray="14 10"/><path d="M360,${RIM + 6} L360,${top - 6}" stroke="#ff6a4a" stroke-width="3"/>` + lbl(380, (RIM + top) / 2 + 12, 'أكثرُ من ٢ كم', 1, '#ff8a6a', 30, 'start') + `</g>`;
  s += lbl(110, RIM - 22, 'السطح', 1, '#fff', 26);
  return s + `</g>`;
}

// ---------- desert dunes: layered, a gradient on each, soft slip faces in shade below the crests, ripples, haze ----------
function dunes(t, o = {}) {
  const sd = o.seed || 1, y0 = o.y0 ?? 700, n = o.n ?? 6, id = 'd' + sd;
  let s = '', defs = '';
  for (let i = 0; i < n; i++) { const r = RS(sd * 31 + i), k = i / (n - 1), base = y0 + Math.pow(k, 1.5) * 560, amp = 14 + k * 60, fr = .006 + r() * .004, ph = r() * 9, ph2 = r() * 9;
    const cy = x => base - amp * (.55 * Math.sin(x * fr + ph) + .3 * Math.sin(x * fr * 2.3 + ph2) + .15 * Math.sin(x * fr * 5.1 + ph * 2));
    const xs = []; for (let x = -30; x <= 750; x += 6) xs.push(x);
    const crest = xs.map(x => [x, cy(x)]), d = `M-30,1300 L${crest.map(PT).join(' L')} L750,1300Z`;
    const lit = mix(o.lit || '#e8c48a', o.haze || '#e9d8bc', (1 - k) * .75), low = mix(o.low || '#cf9a5e', o.haze || '#e9d8bc', (1 - k) * .7), dark = mix(o.dark || '#a86e3c', o.haze || '#e9d8bc', (1 - k) * .65);
    defs += `<linearGradient id="${id}g${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${lit}"/><stop offset="1" stop-color="${low}"/></linearGradient>`;
    s += `<path d="${d}" fill="url(#${id}g${i})"/>`;
    // slip face: a continuous band under the crest, as deep as the crest falls away from the sun (sun on the left)
    const dep = xs.map(x => { const sl = (cy(x + 4) - cy(x - 4)) / 8; return clamp(sl * 2.2, 0, 1) * (16 + amp * 1.1); });
    for (let q = 2; q < dep.length - 2; q++) dep[q] = (dep[q - 2] + dep[q - 1] + dep[q] + dep[q + 1] + dep[q + 2]) / 5;
    s += `<path d="M${crest.map(PT).join(' L')} L${xs.map((x, q) => [x, cy(x) + dep[q]]).reverse().map(PT).join(' L')}Z" fill="${dark}" opacity=".62" filter="url(#blur2)"/>`;
    s += `<path d="M${crest.map(PT).join(' L')}" stroke="#fff6e0" stroke-width="${(1 + k * 1.4).toFixed(1)}" fill="none" opacity="${(.3 + .3 * k).toFixed(2)}"/>`;
    if (k > .45) for (let q = 0; q < 8; q++) { const yy = 22 + q * (9 + k * 9); let rp = ''; for (let x = -30; x <= 750; x += 14) rp += (x === -30 ? 'M' : ' L') + x + ',' + (cy(x) + yy + 3 * Math.sin(x * .06 + q * 1.7)).toFixed(1); s += `<path d="${rp}" stroke="${dark}" stroke-width="1.2" fill="none" opacity="${(.16 * k).toFixed(2)}"/>`; }
    s += `<path d="${d}" fill="#000" filter="url(#grainS)" opacity="${(.1 + .16 * k).toFixed(2)}"/>`;
  }
  return `<defs>${defs}</defs>` + s;
}
// mesas and buttes: lit red rock with strata, a shaded side, erosion streaks and a talus apron at the foot
function mesas(yb, seed, rock, hmax, o = {}) {
  const r = RS(seed); let s = '', x = -60 + r() * 40, n = 0;
  while (x < 760) { const w = 80 + r() * 170, h = hmax * (.45 + r() * .55), sl = 8 + r() * 16, tal = h * (.25 + r() * .15), id = 'm' + seed + '_' + (n++);
    const top = yb - h, P = jag(x + sl, top, x + w - sl, top, 6, 5, seed + n);
    const body = `M${x - tal * .6},${yb} L${x + sl * .3},${yb - tal} L${x + sl * .5},${top + h * .3} L${PT(P[0])} L${P.slice(1).map(PT).join(' L')} L${x + w - sl * .4},${top + h * .35} L${x + w - sl * .2},${yb - tal} L${x + w + tal * .7},${yb}Z`;
    s += litRock(body, id, mix(rock, '#ffffff', .12), mix(rock, '#3a1408', .35), seed * 7 + n, { fx: .03, fy: .006, sc: 4, x: x - tal, y: top - 6, w: w + tal * 2, h: h + 12 });
    s += `<defs><clipPath id="c${id}"><path d="${body}"/></clipPath></defs><g clip-path="url(#c${id})">` +
      Array.from({ length: 9 }, (_, i) => `<path d="M${x - tal},${(top + (i + .5) * h / 9).toFixed(1)} L${x + w + tal},${(top + (i + .5) * h / 9 + (i % 2 ? 2 : -2)).toFixed(1)}" stroke="${i % 3 ? '#5a1e0a' : '#f4c090'}" stroke-width="${(1.5 + (i % 3) * 1.8).toFixed(1)}" opacity=".3"/>`).join('') +
      Array.from({ length: Math.floor(w / 14) }, () => { const sx = x + sl + r() * (w - 2 * sl); return `<path d="M${sx.toFixed(1)},${(top + 4).toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(h * (.3 + r() * .5)).toFixed(1)}" stroke="#3a1408" stroke-width="${(1 + r() * 2).toFixed(1)}" opacity=".25"/>`; }).join('') +
      `<path d="M${x + w * .62},${top - 4} L${x + w + tal},${top - 4} L${x + w + tal},${yb + 2} L${x + w * .7},${yb + 2}Z" fill="#2a0e04" opacity=".32"/>` +
      `<path d="M${x - tal},${yb - tal} Q${x + w / 2},${yb - tal * 1.25} ${x + w + tal},${yb - tal} L${x + w + tal},${yb + 2} L${x - tal},${yb + 2}Z" fill="${mix(rock, '#f0c898', .45)}" opacity=".45"/>` +
      `<path d="M${PT(P[0])} L${P.slice(1).map(PT).join(' L')}" stroke="#ffe0b8" stroke-width="2.5" fill="none" opacity=".45"/></g>`;
    if (o.haze) s += `<path d="${body}" fill="${o.hazeCol || '#f2d2aa'}" opacity="${o.haze}"/>`;
    x += w + 30 + r() * 120; }
  return s;
}
function thermo(x, y, v, a, lab) {
  if (a <= 0) return ''; const top = y - 330, bot = y, k = clamp((v + 20) / 70), lev = bot - 30 - k * (bot - 60 - top), hot = mix('#3a8ae0', '#e8402a', k);
  let s = `<g opacity="${a.toFixed(2)}">` + panel(x - 70, top - 30, 140, 470, a);
  s += `<rect x="${x - 14}" y="${top}" width="28" height="${bot - top - 10}" rx="14" fill="#e8eef4" opacity=".9"/><circle cx="${x}" cy="${bot - 10}" r="30" fill="${hot}"/><rect x="${x - 7}" y="${lev}" width="14" height="${bot - 10 - lev}" fill="${hot}"/>` +
    `<rect x="${x - 10}" y="${top + 6}" width="5" height="${bot - top - 30}" rx="2" fill="#fff" opacity=".6"/>`;
  [-10, 0, 20, 45].forEach(q => { const yy = bot - 30 - clamp((q + 20) / 70) * (bot - 60 - top); s += `<path d="M${x + 16},${yy} L${x + 28},${yy}" stroke="#fff" stroke-width="2"/>`; });
  return s + lbl(x, top - 46, lab, 1, v > 15 ? '#ffb08a' : '#a8d4ff', 34) + `</g>`;
}
// snow on the street (under the people): white pavement and road with tracks, drifts at the walls, caps on the awnings
function snowGround(t, k) {
  if (k <= 0) return ''; const r = RS(5);
  let s = `<g opacity="${k.toFixed(2)}"><rect x="-200" y="${PV - 6}" width="1120" height="${KB - PV + 8}" fill="#eef2f7"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#9ab0c8" filter="url(#grainR)" opacity=".18"/>`;
  let dr = `M-20,${PV + 4}`; for (let x = -20; x <= 740; x += 20) dr += ` L${x},${(PV - 8 - 12 * Math.abs(Math.sin(x * .021 + 1)) - 6 * r()).toFixed(1)}`; s += `<path d="${dr} L740,${PV + 8} L-20,${PV + 8}Z" fill="#f6f8fb"/><path d="${dr}" stroke="#b8c8dc" stroke-width="3" fill="none" opacity=".6"/>`;
  SHOPW.forEach(([sx, sw]) => { s += `<path d="M${sx - 6},${PV - 97} q${sw / 2 + 6},-14 ${sw + 12},0 Z" fill="#f8fafc"/><path d="M${sx - 6},${PV - 97} q${sw / 2 + 6},-14 ${sw + 12},0" stroke="#b8c8dc" stroke-width="2" fill="none"/>`; });
  for (let i = 0; i < 26; i++) { const x = r() * 720, y = PV + 14 + r() * 80; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="7" ry="3" fill="#8aa0b8" opacity=".35"/>`; }
  s += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#e6ebf2"/><rect x="-20" y="1160" width="760" height="20" fill="#9aa6b6" opacity=".55" filter="url(#blur2)"/><rect x="-20" y="1236" width="760" height="18" fill="#9aa6b6" opacity=".55" filter="url(#blur2)"/>`;
  return s + `</g>`;
}
function snowTrees() { let s = ''; [[100, 280], [604, 296]].forEach(([x, h]) => { const r = RS(x), cy = PV + 60 - h * .72;
  for (let i = 0; i < 16; i++) { const a = r() * 6.28, d = r() * h * .3; s += `<ellipse cx="${(x + Math.cos(a) * d * 1.1).toFixed(1)}" cy="${(cy + Math.sin(a) * d * .8 - 10).toFixed(1)}" rx="${(10 + r() * 16).toFixed(1)}" ry="${(5 + r() * 6).toFixed(1)}" fill="#f6f9fc" opacity="${(.55 + .35 * r()).toFixed(2)}" filter="url(#blur2)"/>`; } });
  return s; }
function snowFall(t, k, n = 170) {
  if (k <= 0) return ''; const r = RS(77); let s = '';
  for (let i = 0; i < n; i++) { const z = .4 + r() * .9, x = pmod(r() * 760 + Math.sin(t * .8 + i) * 14 * z, 760) - 20, y = pmod(r() * 1300 + t * 90 * z, 1300) - 10; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 * z + .6).toFixed(1)}" fill="#fff" opacity="${(k * (.45 + .4 * z)).toFixed(2)}"/>`; }
  return s;
}

// street of #46 (99 people left): street9. Based on #45: new buildings, shops and tree seeds; o.litB (5 values, the lit windows of each block), o.litS (shop lights), o.lampK (street lamps), o.back, o.cl, o.dead, o.noTrees, o.noMoon, o.sky2, o.sky, o.ground, o.fg, o.top
const SHOPL = [[-4, 150, 'بقالة', '#3f7a3a'], [152, 146, 'مخبز', '#b8642a'], [304, 152, 'هواتف', '#2a5a9a'], [462, 146, 'أحذية', '#7a4a2a'], [614, 130, 'ألعاب', '#a8456a']];
const BLK9 = [[-10, 160, 460, '#a8b0a0', 991, 0], [152, 150, 540, '#b0846a', 992, 1], [304, 156, 400, '#8c98a8', 993, 2], [462, 150, 500, '#d8c8a4', 994, 0], [614, 132, 450, '#9a6e5a', 995, 1]];
function shopRowL(PV, lit) {
  let s = '', e = '';
  SHOPL.forEach(([sx, sw, name, c], i) => { const r = RS(i + 911), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      Array.from({ length: Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`;
    e += `<g opacity="${(lit ? lit[i] : 1).toFixed(2)}"><rect x="${gx}" y="${PV - 72}" width="${gw}" height="66" fill="#ffd9a0" opacity=".42"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${mix(c, '#ffffff', .2)}" opacity=".7"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${gx},${PV} L${gx + gw},${PV} L${gx + gw + 30},${PV + 90} L${gx - 30},${PV + 90}Z" fill="#ffcf8a" opacity=".16" filter="url(#soft)"/></g>`; });
  return { s, e };
}
function street9(t, o = {}) {
  const N = o.N || 0, id = o.id || 's';
  const sky = o.sky || [mix('#3a6fb8', '#060c24', N), mix('#93bbe2', '#16224a', N), mix('#ebe3d0', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .92)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>` +
    (o.warp ? `<filter id="wp${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${(.008 + .002 * Math.sin(t * 1.3)).toFixed(4)} ${(.016 + .003 * Math.cos(t * 1.1)).toFixed(4)}" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${o.warp.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>` : '') +
    `</defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(12); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 760).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    if (!o.noMoon) s += `<circle cx="560" cy="430" r="90" fill="#fff8e0" opacity="${(.14 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(560, 430, 30, N); s += o.sky2 || ''; }
  const sx = o.sunX ?? 560, sy = o.sunY ?? 330, gC = o.glowC || '#fff6d0', cC = o.sunC || '#fffdf2', gR = o.glowR || 150;
  if (N < .98 && !o.overcast) s += `<circle cx="${sx}" cy="${sy}" r="${gR * 2.2}" fill="${gC}" opacity="${(.16 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${sx}" cy="${sy}" r="${gR}" fill="${gC}" opacity="${(.32 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${sx}" cy="${sy}" r="48" fill="${gC}" opacity=".5" filter="url(#blur9)"/><circle cx="${sx}" cy="${sy}" r="24" fill="${cC}" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(150 + t * 1.2, 500, 210, 33, { a: .9 * (1 - N) * (o.cl ?? 1) }) + cumulus(440 + t * .8, 610, 150, 35, { a: .75 * (1 - N) * (o.cl ?? 1) });
  s += o.back || '';
  let g = farCity(83, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  BLK9.forEach(([x, w, h, c, sd, k], i) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += `<g opacity="${(o.litB ? o.litB[i] : 1).toFixed(2)}">${b.e}</g>`; });
  const sh = shopRowL(PV, o.litS); g += sh.s; e += sh.e; g += o.wall || '';
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  (o.noTrees ? [] : [[102, 280, 331], [600, 292, 337]]).forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + (o.dead ? deadTree(px, py - 2, h, sd) : treeR(px, py - 2, h, sd, t)); });
  const lamps = o.lamps === 0 ? [] : [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.ground || ''; g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + `<g opacity="${(o.lampK ?? 1).toFixed(2)}">` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g></g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}
const PPL99 = [[15.0,20.0],[31.3,-89.6],[57.3,-122.1],[75.0,159.8],[-25.1,30.8],[-6.4,-67.9],[-22.3,134.7],[26.2,-101.3],[38.2,62.7],[47.1,-96.8],[3.6,43.1],[32.5,-107.9],[-15.2,20.6],[63.7,31.7],[44.5,72.7],[-0.7,-59.1],[27.9,25.1],[26.7,117.0],[31.2,52.8],[25.7,41.4],[31.4,40.0],[-18.4,45.0],[69.0,83.0],[36.1,-95.3],[42.6,98.7],[-14.7,-67.2],[62.5,137.1],[-19.3,-62.3],[38.9,39.7],[-36.6,144.2],[-39.8,-71.8],[78.1,-88.3],[-32.3,26.2],[-45.7,-70.2],[-14.4,13.8],[48.8,96.4],[54.0,-85.4],[25.1,111.0],[59.4,-100.9],[48.8,43.7],[53.5,73.4],[18.4,28.3],[-25.2,121.6],[76.8,-123.0],[51.0,35.2],[15.6,-14.6],[13.1,36.7],[-23.9,-59.5],[-17.5,-54.7],[55.6,159.6],[55.9,126.3],[12.1,78.6],[43.6,12.2],[41.9,-117.7],[22.2,81.6],[5.5,12.6],[-7.6,-41.8],[52.4,-97.7],[17.6,-0.1],[68.5,153.7],[41.0,80.8],[5.7,-76.1],[66.4,-70.8],[42.7,46.7],[66.1,-103.7],[76.1,98.3],[33.9,-5.8],[65.4,97.7],[-29.5,-55.5],[-17.8,144.1],[65.5,115.9],[-27.4,-64.8],[-22.5,148.1],[36.5,114.6],[34.0,-117.3],[-31.0,119.9],[30.3,90.3],[30.2,7.8],[-2.1,38.2],[9.7,7.1],[20.8,51.6],[51.3,118.2],[54.5,57.0],[23.2,30.6],[8.3,-7.5],[35.0,86.7],[54.5,-65.7],[44.9,85.8],[-29.5,150.2],[31.6,111.4],[-18.7,124.2],[27.5,71.4],[65.8,62.3],[-32.5,-69.4],[21.8,72.9],[46.2,2.8],[-20.6,-41.8],[-28.6,129.2],[-6.1,31.5]];
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
// 4: about 400 reactors shut themselves down, but the used fuel still needs cooling
function coolTower(cx, base, H, bw, id) {
  const u0 = .72, wt = .3 * bw, c2 = (bw * bw / 4 - wt * wt) / (u0 * u0), w = u => Math.sqrt(wt * wt + c2 * (u - u0) * (u - u0)), L = [], Rr = [];
  for (let i = 0; i <= 24; i++) { const u = i / 24, y = base - H * u; L.push([cx - w(u), y]); Rr.push([cx + w(u), y]); }
  const d = `M${L.map(PT).join(' L')} L${Rr.slice().reverse().map(PT).join(' L')}Z`, wt1 = w(1), top = base - H, r = RS(id * 7 + 3);
  let s = `<defs><clipPath id="ctw${id}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="url(#twrG)"/><g clip-path="url(#ctw${id})">`;
  for (let i = 0; i < 16; i++) { const x = cx - bw / 2 + r() * bw; s += `<path d="M${x.toFixed(1)},${top} q${(r() * 10 - 5).toFixed(1)},${(H * .3).toFixed(1)} ${((x - cx) * .25).toFixed(1)},${(H * (.4 + .5 * r())).toFixed(1)}" stroke="#3a3436" stroke-width="${(2 + r() * 7).toFixed(1)}" fill="none" opacity="${(.08 + .1 * r()).toFixed(2)}"/>`; }
  for (let i = 1; i < 9; i++) { const u = i / 9, y = base - H * u, ww = w(u); s += `<path d="M${(cx - ww).toFixed(1)},${y.toFixed(1)} Q${cx},${(y + ww * .16).toFixed(1)} ${(cx + ww).toFixed(1)},${y.toFixed(1)}" stroke="#2a2428" stroke-width="1.4" fill="none" opacity=".2"/>`; }
  s += `<rect x="${cx - bw}" y="${top - 10}" width="${bw * 2}" height="${H + 20}" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="${cx - bw}" y="${base - H * .07}" width="${bw * 2}" height="${H * .08}" fill="#1c1a20" opacity=".85"/>`;
  for (let i = 0; i < 14; i++) { const x = cx - bw / 2 + i * bw / 13; s += `<path d="M${x.toFixed(1)},${base} l${(bw / 26).toFixed(1)},${(-H * .07).toFixed(1)} l${(bw / 26).toFixed(1)},${(H * .07).toFixed(1)}" stroke="#b8a898" stroke-width="2.4" fill="none" opacity=".8"/>`; }
  s += `</g><ellipse cx="${cx}" cy="${top}" rx="${wt1.toFixed(1)}" ry="${(wt1 * .15).toFixed(1)}" fill="#2a2630"/><ellipse cx="${cx}" cy="${top}" rx="${wt1.toFixed(1)}" ry="${(wt1 * .15).toFixed(1)}" fill="none" stroke="#f0dcc0" stroke-width="2.5" opacity=".8"/>`;
  return { s, top, wt1 };
}
function plume(cx, top, a, t, seed, big = 1) {
  if (a <= .01) return ''; let s = '';
  for (let i = 0; i < 13; i++) { const p = pmod(i / 13 + t * .045 + seed * .13, 1), x = cx + 110 * p * p * big + 12 * Math.sin(t * .7 + i * 2.1), y = top - 6 - p * 330 * big, r = (30 + 96 * p) * big;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${mix('#fff4ea', '#e8a898', p * .7)}" opacity="${(Math.min(1, p * 6) * (1 - p) * 1.25).toFixed(2)}"/>`; }
  return `<g opacity="${a.toFixed(2)}" filter="url(#steamF)">${s}</g>`;
}
function radSym(x, y, R, a) {
  if (a <= 0) return ''; let bl = '';
  for (let i = 0; i < 3; i++) { const a0 = (-120 + i * 120) * Math.PI / 180, a1 = a0 + Math.PI / 3, P = (r, an) => `${(Math.cos(an) * r).toFixed(1)},${(Math.sin(an) * r).toFixed(1)}`;
    bl += `<path d="M${P(R * .28, a0)} L${P(R * .82, a0)} A${R * .82},${R * .82} 0 0 1 ${P(R * .82, a1)} L${P(R * .28, a1)} A${R * .28},${R * .28} 0 0 0 ${P(R * .28, a0)}Z" fill="#14100c"/>`; }
  return `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})"><circle r="${R * 1.5}" fill="#ffd23a" opacity=".25" filter="url(#blur9)"/><circle r="${R}" fill="#f6c81e"/><circle r="${R}" fill="none" stroke="#14100c" stroke-width="${R * .07}"/><circle r="${R * .16}" fill="#14100c"/>${bl}</g>`;
}
function poolInset(a, kd, dg, t) {
  if (a <= 0) return ''; const X0 = 60, Y0 = 876, Wd = 600, Hh = 326, px0 = X0 + 76, px1 = X0 + Wd - 76, fl = Y0 + Hh - 34, rk = 96, yw = lerp(Y0 + 92, fl - rk + 34, kd), boil = clamp(.12 + kd * 1.4), r = RS(41);
  let s = `<g opacity="${a.toFixed(2)}">` + panel(X0, Y0, Wd, Hh, 1) + `<defs><clipPath id="piC"><rect x="${X0 + 8}" y="${Y0 + 8}" width="${Wd - 16}" height="${Hh - 16}" rx="12"/></clipPath><clipPath id="piW"><rect x="${px0}" y="${yw.toFixed(1)}" width="${px1 - px0}" height="${(fl - yw).toFixed(1)}"/></clipPath></defs><g clip-path="url(#piC)">`;
  s += `<rect x="${X0}" y="${Y0}" width="${Wd}" height="${Hh}" fill="#2a3040"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="${Hh}" fill="#8a8c90"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="${Hh}" fill="#000" filter="url(#grainR)" opacity=".4"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="8" fill="#c2c4c8"/>`;
  s += `<rect x="${px0}" y="${Y0 + 60}" width="${px1 - px0}" height="${fl - Y0 - 60}" fill="#161c2c"/>`;
  // steam over the pool once the water boils
  for (let i = 0; i < 9; i++) { const p = pmod(i / 9 + t * .22, 1), x = px0 + 30 + ((i * 97) % (px1 - px0 - 60)) + 14 * Math.sin(t + i); s += `<ellipse cx="${x.toFixed(1)}" cy="${(yw - 8 - p * 90).toFixed(1)}" rx="${(22 + 30 * p).toFixed(1)}" ry="${(12 + 16 * p).toFixed(1)}" fill="#fff" opacity="${(.5 * boil * (1 - p)).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += `<rect x="${px0}" y="${yw.toFixed(1)}" width="${px1 - px0}" height="${(fl - yw).toFixed(1)}" fill="url(#poolG)"/><ellipse cx="${(px0 + px1) / 2}" cy="${fl - rk * .6}" rx="${(px1 - px0) * .46}" ry="${rk * .9}" fill="#6ae0ff" opacity="${(.5 * (1 - .5 * dg)).toFixed(2)}" filter="url(#blur9)" clip-path="url(#piW)"/>`;
  // the racks of used fuel: blue glow under water, red-hot where the water is gone
  for (let i = 0; i < 8; i++) { const x = px0 + 18 + i * 52, top = fl - rk + (i % 2) * 6, hot = clamp((yw - top) / 30) * dg;
    s += `<rect x="${x}" y="${top}" width="42" height="${fl - top}" fill="${mix('#5a6c80', '#d8482a', hot)}"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${x + 5 + q * 6.4},${top + 4} V${fl - 2}" stroke="${mix('#b6d8ee', '#ffc27a', hot)}" stroke-width="2.2" opacity=".85"/>`).join('') + `<rect x="${x - 2}" y="${top - 5}" width="46" height="8" rx="2" fill="${mix('#8a9cb0', '#ff8a4a', hot)}"/><rect x="${x}" y="${top}" width="42" height="${fl - top}" fill="url(#canSh)" opacity=".6"/>` +
      (hot > .05 ? `<ellipse cx="${x + 21}" cy="${top + 6}" rx="34" ry="22" fill="#ff6a2a" opacity="${(.6 * hot).toFixed(2)}" filter="url(#blur5)"/>` : ''); }
  // bubbles
  for (let i = 0; i < 26; i++) { const sp = .35 + r() * .5, p = pmod(r() + t * sp, 1), x = px0 + 14 + r() * (px1 - px0 - 28) + 5 * Math.sin(t * 3 + i), y = lerp(fl - rk * .5, yw + 4, p), rr = 2.5 + r() * 5; if (i / 26 > boil || y < yw) continue;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="#fff" opacity=".2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="#e8f8ff" stroke-width="1.4" opacity=".85"/>`; }
  let wv = `M${px0},${yw.toFixed(1)}`; for (let x = px0; x <= px1; x += 12) wv += ` L${x},${(yw + (2 + 3 * boil) * Math.sin(x * .09 + t * 4)).toFixed(1)}`;
  s += `<path d="${wv}" stroke="#eaf8ff" stroke-width="3" fill="none" opacity=".9"/>`;
  // the pool walls and floor
  s += `<rect x="${px0 - 16}" y="${Y0 + 60}" width="16" height="${fl - Y0 - 44}" fill="#6e7076"/><rect x="${px1}" y="${Y0 + 60}" width="16" height="${fl - Y0 - 44}" fill="#6e7076"/><rect x="${px0 - 16}" y="${fl}" width="${px1 - px0 + 32}" height="16" fill="#6e7076"/>`;
  s += `<rect x="${X0}" y="${Y0}" width="${Wd}" height="${Hh}" fill="#ff2a1a" opacity="${(.12 * dg * (.6 + .4 * Math.sin(t * 7))).toFixed(2)}"/></g>`;
  // the old water level
  s += `<path d="M${px0 - 30},${Y0 + 92} H${px1 + 30}" stroke="#a8d8ff" stroke-width="2.5" stroke-dasharray="10 8" opacity="${(.9 * clamp(kd * 4)).toFixed(2)}"/>`;
  s += lbl(X0 + Wd / 2, Y0 + 42, 'حوضُ تبريدِ الوقودِ المستعمَل', 1, '#fff', 27) + radSym(X0 + Wd - 44, Y0 + 104, 30, dg * (.8 + .2 * Math.sin(t * 7)));
  return s + `</g>`;
}
function sceneNuke(t) {
  const T = t - S0(4) + .2, hz = 838, shut = ease(ramp(t, WS(4, 4) - .1, WS(4, 6) + .5)), tl = WS(4, 11) - .1, lt = t < tl ? 1 : t < tl + .5 ? (Math.sin((t - tl) * 50) > 0 ? .9 : .2) * (1 - (t - tl) * 2) : 0;
  let s = `<defs>${LDEFS()}<linearGradient id="rvN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a878"/><stop offset=".3" stop-color="#8a6a8a"/><stop offset="1" stop-color="#1c2646"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#duskS)"/>`;
  { const r = RS(15); for (let i = 0; i < 60; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 520).toFixed(1)}" r="${(.6 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(.2 + .5 * r()).toFixed(2)}"/>`; }
  s += `<circle cx="640" cy="${hz - 16}" r="230" fill="url(#sunW)" opacity=".9"/><circle cx="640" cy="${hz - 16}" r="30" fill="#fff0d0" filter="url(#blur5)"/>`;
  s += cumulus(120 + T * 4, 560, 230, 71, { a: .5 }) + cumulus(560 + T * 3, 610, 180, 72, { a: .4 });
  s += mountainsR(hz - 6, 84, 521, { rock: '#56506e', haze: .55, hazeCol: '#d89a80' }) + `<rect x="-20" y="${hz - 16}" width="760" height="30" fill="#6a5a6c"/>`;
  s += `<rect x="-20" y="${hz}" width="760" height="${1020 - hz}" fill="#3a4636"/><rect x="-20" y="${hz}" width="760" height="${1020 - hz}" fill="#000" filter="url(#grainR)" opacity=".4"/>` + meadow(hz + 4, 1022, t, { c0: '#4a5a3c', c1: '#28362a' }) + `<rect x="-20" y="${hz - 6}" width="760" height="40" fill="#f2b078" opacity=".28" filter="url(#blur9)"/>`;
  // the plant: two cooling towers, the reactor dome, the turbine hall, the stack, a pylon
  const base = 866, T2 = coolTower(318, base - 6, 290, 196, 2), T1 = coolTower(150, base, 350, 240, 1);
  let plant = plume(318, T2.top, 1 - shut, t, 2, .85) + T2.s + plume(150, T1.top, 1 - shut, t, 1) + T1.s;
  // pylon and wires
  const pyl = (x, b, h) => { let p = `<path d="M${x - h * .16},${b} L${x - h * .04},${b - h} L${x + h * .04},${b - h} L${x + h * .16},${b}" stroke="#2a2630" stroke-width="3" fill="none"/>`; for (let i = 0; i < 6; i++) { const u0 = i / 6, u1 = (i + 1) / 6, w0 = h * (.16 - .12 * u0), w1 = h * (.16 - .12 * u1); p += `<path d="M${x - w0},${b - h * u0} L${x + w1},${b - h * u1} M${x + w0},${b - h * u0} L${x - w1},${b - h * u1}" stroke="#2a2630" stroke-width="1.6"/>`; }
    [.74, .88, 1].forEach(u => { p += `<path d="M${x - h * .2},${b - h * u} H${x + h * .2}" stroke="#2a2630" stroke-width="3"/>`; }); return p; };
  plant += pyl(676, base, 230) + `<path d="M${676 - 46},${base - 230} Q600,${base - 150} 560,${base - 96} M${676 - 46},${base - 202} Q600,${base - 130} 566,${base - 90} M${676 + 46},${base - 230} Q720,${base - 200} 760,${base - 190}" stroke="#1e1a24" stroke-width="1.8" fill="none"/>`;
  // the reactor containment: a cylinder with a dome
  const rx = 470;
  plant += `<path d="M${rx - 56},${base} V${base - 120} A56,50 0 0 1 ${rx + 56},${base - 120} V${base}Z" fill="url(#twrG)"/><path d="M${rx - 56},${base} V${base - 120} A56,50 0 0 1 ${rx + 56},${base - 120} V${base}Z" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    Array.from({ length: 4 }, (_, i) => `<path d="M${rx - 56},${base - 24 - i * 30} Q${rx},${base - 16 - i * 30} ${rx + 56},${base - 24 - i * 30}" stroke="#2a2428" stroke-width="1.6" fill="none" opacity=".3"/>`).join('') + `<rect x="${rx - 10}" y="${base - 186}" width="20" height="20" fill="#8a8690"/>`;
  // the turbine hall and the stack
  plant += `<rect x="532" y="${base - 92}" width="130" height="92" fill="#8e8a96"/><rect x="532" y="${base - 92}" width="130" height="92" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="528" y="${base - 100}" width="138" height="10" fill="#b8b2b8"/><rect x="632" y="${base - 92}" width="30" height="92" fill="#000" opacity=".25"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${542 + i * 19}" y="${base - 74}" width="12" height="22" fill="${mix('#2a3040', '#ffd88a', lt)}"/>`).join('') + Array.from({ length: 6 }, (_, i) => `<rect x="${542 + i * 19}" y="${base - 40}" width="12" height="16" fill="${mix('#2a3040', '#ffcf7a', lt * (i % 2 ? 1 : .4))}"/>`).join('');
  plant += `<path d="M584,${base - 100} L588,${base - 300} L596,${base - 300} L600,${base - 100}Z" fill="#c8c0bc"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${586 + i * .3}" y="${base - 290 + i * 46}" width="${12 - i * .5}" height="20" fill="#c8483a"/>`).join('') + `<path d="M584,${base - 100} L588,${base - 300} L591,${base - 300} L590,${base - 100}Z" fill="#000" opacity=".25"/>`;
  plant += `<rect x="388" y="${base - 46}" width="60" height="46" fill="#7a7684"/><rect x="384" y="${base - 52}" width="68" height="8" fill="#a8a2a8"/>` + Array.from({ length: 3 }, (_, i) => `<rect x="${396 + i * 17}" y="${base - 34}" width="10" height="14" fill="${mix('#2a3040', '#ffd88a', lt)}"/>`).join('');
  s += plant + forestR(base + 2, 18, 22, 50, 17, '#243428', { haze: .1, hazeCol: '#6a5a6c' });
  // fence
  s += `<path d="M-20,${base + 16} H740 M-20,${base + 30} H740" stroke="#1c1e22" stroke-width="1.6" opacity=".7"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M${i * 26},${base + 8} v30" stroke="#1c1e22" stroke-width="2.4" opacity=".8"/>`).join('');
  // lights of the plant: red beacons, floodlights
  const bl = .5 + .5 * Math.sin(t * 4);
  s += scr([[150 - T1.wt1, T1.top], [150 + T1.wt1, T1.top], [318 + T2.wt1, T2.top], [592, base - 302], [676, base - 232]].map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="#ff3a2a" opacity="${(.7 * bl * lt).toFixed(2)}" filter="url(#blur5)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#ffb0a0" opacity="${(bl * lt).toFixed(2)}"/>`).join('') +
    [[60, base - 60], [250, base - 66], [420, base - 70], [520, base - 110], [640, base - 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="#ffe2a0" opacity="${(.5 * lt).toFixed(2)}" filter="url(#blur9)"/><circle cx="${x}" cy="${y}" r="4" fill="#fff6d8" opacity="${lt.toFixed(2)}"/>`).join(''));
  // the river in front
  s += `<rect x="-20" y="1020" width="760" height="280" fill="url(#rvN)"/><rect x="-20" y="1014" width="760" height="10" fill="#2a3226"/>`;
  s += `<defs><clipPath id="rvClip"><rect x="-20" y="1024" width="760" height="280"/></clipPath></defs><g clip-path="url(#rvClip)"><g opacity=".3" filter="url(#blur2)" transform="translate(0,1890) scale(1,-1)">${T2.s}${T1.s}</g></g>`;
  for (let i = 0; i < 22; i++) { const r = RS(i + 90), y = 1030 + Math.pow(r(), 1.4) * 250, x = r() * 720 + 10 * Math.sin(t * 1.2 + i), w = 30 + (y - 1020) * .4; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},-3 ${w.toFixed(1)},0" stroke="#ffd8b0" stroke-width="${(1 + (y - 1020) * .008).toFixed(1)}" fill="none" opacity=".4"/>`; }
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a1838" opacity="${(.3 * (1 - lt) * ease(ramp(t, tl, tl + 1))).toFixed(2)}"/>`;
  s += poolInset(ease(ramp(t, WS(4, 7) - .25, WS(4, 7) + .35)), ease(ramp(t, WS(4, 11), WS(4, 14) + .3)), ease(ramp(t, WS(4, 14), WS(4, 15) + .3)), t);
  noEarth(); F.ov = ''; return s;
}

// 5: years later: plants split the streets and the animals come back to the cities
const ivyM = (id, seed, col, k4, fx = .034, fy = .03, k3 = 6) => `<filter id="${id}" filterUnits="userSpaceOnUse" x="-20" y="380" width="760" height="920" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="5" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="na"/><feComposite in="na" in2="SourceGraphic" operator="arithmetic" k1="0" k2="11" k3="${k3}" k4="${k4}" result="m"/><feFlood flood-color="${col}"/><feComposite in2="m" operator="in"/></filter>`;
function tuft(x, y, h, seed) { const r = RS(seed); let s = ''; const n = 5 + Math.floor(r() * 4);
  for (let i = 0; i < n; i++) { const dx = (r() - .5) * h * .9, tip = dx * 1.6 + (r() - .5) * h * .5, hh = h * (.55 + .5 * r()); s += `<path d="M${(x + dx * .4).toFixed(1)},${y.toFixed(1)} Q${(x + dx).toFixed(1)},${(y - hh * .6).toFixed(1)} ${(x + tip).toFixed(1)},${(y - hh).toFixed(1)}" stroke="${['#4a7a2e', '#6a9a3a', '#3a6a28', '#86a84a'][Math.floor(r() * 4)]}" stroke-width="${(1.4 + h * .035).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  return s; }
function deer(x, y, sc, f, ph, o = {}) {
  let s = quad(x, y, sc, { kind: 'horse', face: f, moving: o.still ? 0 : 1, phase: ph, col: o.col || '#a8743e', graze: o.graze });
  s = s.replace(/<path [^>]*stroke-width="18\.[12]\d*"[^>]*\/>/, `<path d="M-75,-142 q-12,4 -10,22" stroke="#f4ecdc" stroke-width="9" fill="none" stroke-linecap="round"/>`).replace(/<path [^>]*stroke-width="9\.[56]\d*"[^>]*\/>/, '').split('stroke-width="13"').join('stroke-width="8"');
  let ex = `<ellipse cx="-68" cy="-124" rx="12" ry="18" fill="#f4ecdc" opacity=".8"/>`;
  if (o.spots) for (let i = 0; i < 9; i++) ex += `<circle cx="${-46 + (i % 5) * 20}" cy="${-150 + Math.floor(i / 5) * 16 + (i % 2) * 5}" r="3.2" fill="#f4ecdc" opacity=".8"/>`;
  if (o.antlers) [0, 9].forEach(dx => { ex += `<path d="M${101 + dx},-208 q-16,-30 -2,-66 M${96 + dx},-226 l-20,-12 M${94 + dx},-248 l-18,-14 M${98 + dx},-266 l14,-14" stroke="${dx ? '#b8a888' : '#e2d4b4'}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`; });
  return s.replace(/<\/g>$/, ex + '</g>');
}
function sceneNature(t) {
  const T = t - S0(5) + .2, k = ease(ramp(t, S0(5) - .1, WS(5, 4) + .4)), an = ramp(t, WS(5, 5) - .7, S0(6) + .6);
  let def = ivyM('ivA', 3, '#2c5424', -9.15) + ivyM('ivB', 11, '#5c8c3c', -10.05, .05, .045) + ivyM('ivC', 23, '#4a6a30', -11.3, .016, .05, 5) + ivyM('ivD', 31, '#6a8a3c', -11.9, .03, .08, 5), src = '';
  BLK9.forEach(([x, w, h], i) => { const hh = (h + 30) * clamp(k * (.8 + .3 * ((i * 7) % 5) / 4)), gid = 'ivG' + i;
    def += `<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="${PV}" x2="0" y2="${(PV - hh).toFixed(1)}"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff" stop-opacity=".62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
    src += `<rect x="${x - 4}" y="${(PV - hh).toFixed(1)}" width="${w + 22}" height="${hh.toFixed(1)}" fill="url(#${gid})"/>`; });
  const wall = k > .01 ? `<rect x="-20" y="${PV - 126}" width="760" height="126" fill="#6e6c58" opacity="${(.4 * k).toFixed(2)}"/><rect x="-20" y="420" width="760" height="${PV - 420}" fill="#5a5a3a" opacity="${(.14 * k).toFixed(2)}"/><g filter="url(#ivA)">${src}</g><g filter="url(#ivB)" transform="translate(-3,-4)">${src}</g>` : '';
  // the road and the pavement: cracks, moss, grass, young trees
  let gr = cracks(KB + 14, 1300, k, 31, -20, 740, '#1c1c20') + cracks(PV + 4, KB, k * .8, 32, -20, 740, '#6a5e4a');
  if (k > .01) gr += `<g filter="url(#ivC)"><rect x="-20" y="${PV + 6}" width="760" height="${1300 - PV}" fill="#fff" opacity="${k.toFixed(2)}"/></g><g filter="url(#ivD)"><rect x="-20" y="${KB - 6}" width="760" height="${1300 - KB + 6}" fill="#fff" opacity="${(.92 * k).toFixed(2)}"/></g>`;
  const r = RS(57); let tf = [];
  for (let i = 0; i < 46; i++) { const band = i % 3, y = band === 0 ? KB + 10 + r() * 8 : band === 1 ? PV + 2 + r() * 6 : KB + 30 + r() * (1290 - KB - 30), x = r() * 720, g = clamp(k * 1.5 - r() * .5); if (g > 0) tf.push([y, tuft(x, y, (band === 2 ? 20 + (y - KB) * .2 : 22) * g, i + 300)]); }
  tf.sort((a, b) => a[0] - b[0]); gr += tf.map(q => q[1]).join('');
  gr += car(470, 1170, .95, '#7e6250', -1, 0) + [[400, 1118, 30, 14], [470, 1104, 44, 10], [540, 1126, 26, 12], [436, 1140, 22, 9]].map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#8a4a22" opacity="${(.5 * k).toFixed(2)}" filter="url(#blur2)"/>`).join('') + (k > .2 ? tuft(392, 1172, 34 * k, 401) + tuft(548, 1172, 30 * k, 402) + tuft(470, 1174, 26 * k, 403) : '');
  if (k > .08) gr += treeR(44, 1236, 170 * k, 341, t) + treeR(676, 1150, 120 * k, 342, t);
  // the animals
  let fg = '';
  if (an > 0) { const dx = lerp(860, 236, ease(Math.min(1, an * 1.15))), wk = an < .87;
    fg += deer(dx + 214, 1196, .5, -1, t * 6, { col: '#b08250', still: !wk, graze: !wk }) + deer(dx + 110, 1212, .34, -1, t * 8 + 1, { col: '#b88a58', spots: 1, still: !wk }) + deer(dx, 1218, .62, -1, t * 6 + 2, { antlers: 1, still: !wk });
    const fx = lerp(-80, 210, an); fg += quad(fx, PV + 84, .62, { kind: 'fox', face: 1, moving: 1, phase: t * 11 });
    for (let i = 0; i < 6; i++) fg += bird(120 + i * 70 + T * 30, 560 + (i % 3) * 40 - T * 6, .42, t * 9 + i * 1.3, -6); }
  fg += pigeon(330, PV + 40, 1.1, t, 1) + pigeon(366, PV + 52, 1, t, 3);
  let s = `<defs>${LDEFS()}${def}</defs>` + street9(t, { N: 0, id: 'nt', cars: 0, overcast: 1, back: sun3(560, 330) + cumulus(150 + T * 3, 500, 210, 33, { a: .9 }) + cumulus(440 + T * 2, 610, 150, 35, { a: .75 }), wall, ground: gr, fg });
  noEarth(); F.ov = ''; return s;
}

// 6: of 7,000 languages only a few stay alive
const GREET = [['مرحباً', 'Noto Naskh Arabic'], ['Hello', 'Inter'], ['你好', 'WenQuanYi Zen Hei'], ['Hola', 'Inter'], ['Привет', 'Inter'], ['नमस्ते', 'FreeSans'], ['Bonjour', 'Inter'], ['こんにちは', 'IPAGothic'], ['Jambo', 'Inter'], ['안녕', 'WenQuanYi Zen Hei'], ['Olá', 'Inter'], ['สวัสดี', 'Loma'], ['Γειά', 'Inter'], ['שלום', 'DejaVu Sans'], ['Merhaba', 'Inter'], ['Ciao', 'Inter'], ['Hallo', 'Inter'], ['Xin chào', 'Inter'], ['Sawubona', 'Inter'], ['Aloha', 'Inter'], ['Kia ora', 'Inter']];
const GCOL = ['#fff4d6', '#d6ecff', '#e2f6d8', '#ffe0e0', '#eee2ff', '#fff', '#d8f4f0'];
const GKEEP = new Set([0, 10, 19]);   // the few that survive
function sceneLang(t) {
  const tA = S0(6) + .55, tB = WS(6, 7) + .5, ord = RS(66), ords = GREET.map((_, i) => i).filter(i => !GKEEP.has(i)).map(i => [ord(), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);
  let s = `<defs>${LDEFS()}</defs>` + studio('lgS', '#2c3a5c', '#090c1a', 6), left = GREET.length;
  GREET.forEach(([tx, font], i) => { const col = i % 3, row = Math.floor(i / 3), x = 138 + col * 222 + ((row % 2) ? 14 : -14), y = 440 + row * 100 + (col === 1 ? 48 : 0) + 6 * Math.sin(t * 1.2 + i), w = Math.max(132, 48 + tx.length * (font === 'Inter' ? 21 : 30)), h = 68;
    const a = ramp(t, S0(6) - .2 + i * .02, S0(6) + .1 + i * .02), q = ords.indexOf(i), tp = q < 0 ? 1e9 : lerp(tA, tB, q / (ords.length - 1)), pop = ramp(t, tp, tp + .3); if (pop >= 1) { left--; return; } if (pop > 0) left -= pop;
    const sc = 1 + .45 * pop, op = a * (1 - pop), keep = GKEEP.has(i) && t > tB;
    s += `<g opacity="${op.toFixed(2)}" transform="translate(${x},${y.toFixed(1)}) scale(${sc.toFixed(3)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 6}" width="${w}" height="${h}" rx="28" fill="#000" opacity=".3"/><path d="M${-26},${h / 2 - 4} L${-36},${h / 2 + 20} L${-4},${h / 2 - 4}Z" fill="${GCOL[i % 7]}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="28" fill="${GCOL[i % 7]}"${keep ? ' stroke="#f4c76b" stroke-width="5"' : ''}/><rect x="${-w / 2 + 8}" y="${-h / 2 + 5}" width="${w - 16}" height="${h * .36}" rx="16" fill="#fff" opacity=".35"/>` +
      `<text x="0" y="12" text-anchor="middle" font-family="${font}" font-weight="700" font-size="34" fill="#1c2230">${tx}</text></g>`;
    if (pop > 0) for (let j = 0; j < 8; j++) { const an = j / 8 * 6.283, d = w * .5 + 40 * pop; s += `<path d="M${(x + Math.cos(an) * d * .7).toFixed(1)},${(y + Math.sin(an) * d * .5).toFixed(1)} L${(x + Math.cos(an) * d).toFixed(1)},${(y + Math.sin(an) * d * .7).toFixed(1)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(1 - pop).toFixed(2)}"/>`; } });
  const n = lerp(99, 7000, clamp((left - 3) / (GREET.length - 3)));
  s += `<text x="420" y="1206" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="84" fill="${n < 120 ? '#ff7a6a' : '#f4c76b'}" style="filter:drop-shadow(0 4px 12px rgba(0,0,0,.8))">${fmtN(n)}</text>` + lbl(230, 1200, 'لغة', 1, '#fff', 44);
  noEarth(); F.ov = ''; return s;
}

// 6b: much knowledge is lost: no factories, no medicine
function medItem(kind) {
  if (kind === 0) return `<rect x="-22" y="-62" width="44" height="62" rx="7" fill="#e88a2a"/><rect x="-22" y="-44" width="44" height="30" fill="#f6f2e6"/><path d="M0,-38 v18 M-9,-29 h18" stroke="#d8382e" stroke-width="5"/><rect x="-18" y="-76" width="36" height="16" rx="3" fill="#f2f2ee"/><rect x="-22" y="-62" width="44" height="62" rx="7" fill="url(#canSh)" opacity=".7"/>`;
  if (kind === 1) return `<rect x="-34" y="-50" width="68" height="50" rx="3" fill="#f2f2ee"/><rect x="-34" y="-50" width="68" height="14" fill="#2a8a5a"/><path d="M0,-30 v20 M-10,-20 h20" stroke="#2a8a5a" stroke-width="5"/><rect x="-34" y="-50" width="14" height="50" fill="#000" opacity=".14"/>`;
  if (kind === 2) return `<rect x="-36" y="-44" width="72" height="44" rx="6" fill="#c8ccd4"/>` + Array.from({ length: 8 }, (_, i) => `<ellipse cx="${-25 + (i % 4) * 16.6}" cy="${-32 + Math.floor(i / 4) * 20}" rx="6.5" ry="6.5" fill="${i % 2 ? '#f6f2e6' : '#e86a5a'}"/><ellipse cx="${-27 + (i % 4) * 16.6}" cy="${-34 + Math.floor(i / 4) * 20}" rx="2.4" ry="2" fill="#fff" opacity=".7"/>`).join('');
  if (kind === 3) return `<path d="M-16,0 V-40 Q-16,-50 -8,-52 V-66 H8 V-52 Q16,-50 16,-40 V0Z" fill="#7a4a2a"/><rect x="-16" y="-36" width="32" height="24" fill="#f6f2e6"/><rect x="-10" y="-76" width="20" height="12" rx="2" fill="#f2f2ee"/><path d="M-16,0 V-40 Q-16,-50 -8,-52 V-66 H8 V-52 Q16,-50 16,-40 V0Z" fill="url(#canSh)" opacity=".7"/>`;
  if (kind === 4) return `<g transform="rotate(-24)"><rect x="-13" y="-58" width="26" height="58" rx="13" fill="#f2f2ee"/><rect x="-13" y="-58" width="26" height="29" rx="13" fill="#d8382e"/><rect x="-13" y="-42" width="26" height="14" fill="#d8382e"/><rect x="-13" y="-58" width="26" height="58" rx="13" fill="url(#canSh)" opacity=".7"/></g>`;
  return `<rect x="-11" y="-54" width="22" height="54" rx="4" fill="#bfe0f4" opacity=".9"/><rect x="-11" y="-30" width="22" height="30" rx="4" fill="#7ac0e8"/><rect x="-8" y="-66" width="16" height="14" rx="2" fill="#8a9098"/><rect x="-11" y="-54" width="22" height="54" rx="4" fill="url(#canSh)" opacity=".6"/>`;
}
function sceneKnow(t) {
  const T = t - (WS(6, 8) - .3), base = 986, sm = 1 - ease(ramp(t, WS(6, 8), WS(6, 10) + .5)), ma = ease(ramp(t, WS(6, 13) - .25, WS(6, 13) + .3));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#grayS)"/><g filter="url(#darkC)" opacity=".85">${cumulus(140 + T * 5, 470, 320, 81)}${cumulus(500 + T * 4, 540, 300, 82)}${cumulus(330 + T * 6, 640, 260, 83)}</g>`;
  s += farCity(87, base - 30, '#8a949c', { hk: .8 }) + `<rect x="-20" y="${base - 240}" width="760" height="240" fill="#c4c8c8" opacity=".5"/>`;
  // two brick chimneys with the last smoke
  [[590, 500, 2], [654, 420, 3]].forEach(([x, h, sd]) => { const wb = 26, wt = 17;
    if (sm > .01) { let p = ''; for (let i = 0; i < 9; i++) { const q = pmod(i / 9 + T * .07, 1); p += `<circle cx="${(x + 90 * q * q + 10 * Math.sin(T + i)).toFixed(1)}" cy="${(base - h - 10 - q * 200).toFixed(1)}" r="${(20 + 60 * q).toFixed(1)}" fill="#6a6a70" opacity="${((1 - q) * .8).toFixed(2)}"/>`; } s += `<g opacity="${sm.toFixed(2)}" filter="url(#steamF)">${p}</g>`; }
    s += `<path d="M${x - wb},${base} L${x - wt},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="#8a5644"/><path d="M${x - wb},${base} L${x - wt},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="url(#brk)"/><path d="M${x + 4},${base} L${x + 3},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="#000" opacity=".28"/><rect x="${x - wt - 3}" y="${base - h - 6}" width="${wt * 2 + 6}" height="12" fill="#5a3a30"/><rect x="${x - wt - 2}" y="${base - h + 50}" width="${wt * 2 + 4}" height="7" fill="#5a3a30" opacity=".8"/>` +
      Array.from({ length: 5 }, (_, i) => { const r = RS(sd * 9 + i); return `<path d="M${(x - wt + r() * wt * 2).toFixed(1)},${base - h + 8} l${(r() * 6 - 3).toFixed(1)},${(60 + r() * 220).toFixed(1)}" stroke="#2a1c18" stroke-width="${(2 + r() * 5).toFixed(1)}" opacity=".25" stroke-linecap="round"/>`; }).join(''); });
  // the hall with a saw-tooth roof
  const x0 = 26, x1 = 536, top = base - 196, tw = (x1 - x0) / 5;
  for (let i = 0; i < 5; i++) { const x = x0 + i * tw; s += `<path d="M${x},${top} V${top - 64} L${x + tw},${top}Z" fill="#5c6068"/><path d="M${x},${top} V${top - 64} L${x + tw},${top}Z" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="${x}" y="${top - 64}" width="9" height="64" fill="#2e3a48"/><path d="M${x + 9},${top - 58} L${x + tw - 6},${top - 3}" stroke="#8a8e96" stroke-width="2" opacity=".6"/>` + Array.from({ length: 4 }, (_, q) => `<path d="M${x + 14 + q * 20},${top - 50 + q * 13} l8,${52 - q * 13 - 4}" stroke="#3a3e46" stroke-width="1.4" opacity=".6"/>`).join(''); }
  s += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="#8f5e4c"/><rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="url(#brk)"/><rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="${x0 - 4}" y="${top - 4}" width="${x1 - x0 + 8}" height="12" fill="#5a3e34"/><rect x="${x0}" y="${top + 8}" width="${x1 - x0}" height="14" fill="url(#aoDn)" opacity=".7"/>`;
  { const r = RS(93); for (let w = 0; w < 4; w++) { const wx = x0 + 22 + w * 92, wy = top + 40; s += `<rect x="${wx - 4}" y="${wy - 4}" width="80" height="96" fill="#4a342c"/>`;
      for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { const br = r(); s += `<rect x="${wx + a * 18.4}" y="${wy + b * 22.4}" width="16.4" height="20.4" fill="${br < .32 ? '#14181e' : br < .5 ? '#7a8a94' : '#56686e'}"/>` + (br < .32 && br > .16 ? `<path d="M${wx + a * 18.4},${wy + b * 22.4 + 20} l8,-12 l4,6 l4,-9 v15Z" fill="#7a8a94" opacity=".8"/>` : ''); }
      s += `<path d="M${wx + 30 + r() * 20},${wy + 94} l${(r() * 6 - 3).toFixed(1)},${(30 + r() * 50).toFixed(1)}" stroke="#4a2a1a" stroke-width="${(4 + r() * 5).toFixed(1)}" opacity=".3" stroke-linecap="round"/>`; } }
  s += `<rect x="${x0 + 396}" y="${base - 138}" width="102" height="138" fill="#2a2a2e"/><rect x="${x0 + 396}" y="${base - 138}" width="62" height="138" fill="#6a4a3a"/><rect x="${x0 + 396}" y="${base - 138}" width="62" height="138" fill="#000" filter="url(#grainR)" opacity=".4"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${x0 + 400 + i * 13},${base - 138} v138" stroke="#3a2a22" stroke-width="2"/>`).join('') + `<rect x="${x0 + 392}" y="${base - 146}" width="110" height="10" fill="#4a4a50"/>`;
  s += `<g transform="rotate(-3,${x0 + 200},${top - 80})"><rect x="${x0 + 120}" y="${top - 112}" width="160" height="46" fill="#3a4a5a"/><rect x="${x0 + 120}" y="${top - 112}" width="160" height="46" fill="#8a6a4a" opacity=".3"/><text x="${x0 + 200}" y="${top - 78}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="32" fill="#d8d2c0" opacity=".85">مصنع</text><path d="M${x0 + 140},${top - 66} v20 M${x0 + 260},${top - 66} v20" stroke="#3a3a40" stroke-width="5"/></g>`;
  s += `<path d="M${x0},${top + 150} H${x0 + 380}" stroke="#6a7078" stroke-width="9"/><path d="M${x0},${top + 147} H${x0 + 380}" stroke="#fff" stroke-width="2" opacity=".25"/><path d="M${x0 + 380},${top + 150} V${base}" stroke="#6a7078" stroke-width="9"/>`;
  // the yard: cracked concrete, barrels, weeds, a puddle
  s += `<rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="#8e8a80"/><rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="#000" filter="url(#grainR)" opacity=".4"/><rect x="-20" y="${base}" width="760" height="30" fill="url(#aoDn)" opacity=".8"/>` + cracks(base + 6, 1300, .9, 61, -20, 740, '#3a3630');
  s += `<ellipse cx="250" cy="1150" rx="150" ry="26" fill="#a8b4be" opacity=".75"/><ellipse cx="230" cy="1146" rx="90" ry="12" fill="#dfe6ea" opacity=".5"/>`;
  [[590, 1076, '#3a6a8a'], [640, 1084, '#8a4a2a'], [614, 1112, '#5a6a3a']].forEach(([x, y, c], i) => { s += `<ellipse cx="${x + 6}" cy="${y + 2}" rx="34" ry="7" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="${x - 24}" y="${y - 70}" width="48" height="70" rx="5" fill="${c}"/><rect x="${x - 24}" y="${y - 50}" width="48" height="5" fill="#000" opacity=".25"/><rect x="${x - 24}" y="${y - 26}" width="48" height="5" fill="#000" opacity=".25"/><ellipse cx="${x}" cy="${y - 70}" rx="24" ry="6" fill="${mix(c, '#ffffff', .3)}"/><rect x="${x - 24}" y="${y - 70}" width="48" height="70" rx="5" fill="url(#canSh)"/><ellipse cx="${x - 6}" cy="${y - 30}" rx="12" ry="18" fill="#8a4a22" opacity=".45" filter="url(#blur2)"/>`; });
  { const r = RS(58); for (let i = 0; i < 30; i++) { const y = i < 14 ? base + 4 + r() * 8 : base + 40 + r() * 250, x = r() * 720; s += tuft(x, y, i < 14 ? 24 + r() * 16 : 16 + (y - base) * .12, i + 500); } }
  s += `<rect x="-20" y="380" width="760" height="920" fill="#5a6470" opacity=".16"/>`;
  // the medicine shelf empties
  if (ma > 0) { const X0 = 60, Y0 = 1010, t0 = WS(6, 13) + .35, t1 = S0(7) - .5; s += `<g opacity="${ma.toFixed(2)}">` + panel(X0, Y0, 600, 196, 1) + `<rect x="${X0 + 24}" y="${Y0 + 150}" width="552" height="12" rx="3" fill="#8a8478"/><rect x="${X0 + 24}" y="${Y0 + 162}" width="552" height="6" fill="#000" opacity=".4"/>`;
    [2, 0, 4, 1, 5, 3].forEach((kd, i) => { const x = X0 + 76 + i * 90, g = ramp(t, lerp(t0, t1, [3, 0, 4, 1, 5, 2][i] / 5), lerp(t0, t1, [3, 0, 4, 1, 5, 2][i] / 5) + .3);
      s += `<rect x="${x - 36}" y="${Y0 + 68}" width="72" height="82" rx="8" fill="none" stroke="#8a94a6" stroke-width="2.5" stroke-dasharray="7 6" opacity="${g.toFixed(2)}"/><g transform="translate(${x},${Y0 + 150 - 18 * g}) scale(${(1 + .2 * g).toFixed(2)})" opacity="${(1 - g).toFixed(2)}">${medItem(kd)}</g>`; });
    s += lbl(360, Y0 + 44, 'رفُّ الأدوية', 1, '#fff', 28) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 7: if they gather, they make one small village living on farming and fishing
function cottage(x, y, s, wall, roof, seed, o = {}) {
  const r = RS(seed), dk = mix(wall, '#000000', .34), rd = mix(roof, '#000000', .3), lit = o.lit ?? .8;
  let g = `<ellipse cx="34" cy="2" rx="130" ry="10" fill="#1c2410" opacity=".35" filter="url(#blur2)"/>`;
  g += `<path d="M75,0 L135,-16 L135,-100 L75,-84Z" fill="${dk}"/><path d="M-75,0 H75 V-84 L0,-140 L-75,-84Z" fill="${wall}"/><path d="M-75,0 H75 V-84 L0,-140 L-75,-84Z" fill="#fff" filter="url(#wallI)" opacity=".3"/>`;
  for (let i = 1; i < 7; i++) g += `<path d="M-75,${-i * 13} H75" stroke="#000" stroke-width="1" opacity=".12"/>`;
  g += `<path d="M0,-140 L60,-156 L146,-96 L84,-78Z" fill="${roof}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${14 * (i + 1) - 2},${-140 + (i + 1) * 9.6} l60,-16" stroke="#000" stroke-width="1.2" opacity=".22"/>`).join('') + `<path d="M0,-140 L60,-156 L146,-96 L84,-78Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  g += `<path d="M-86,-76 L0,-146 L86,-76" stroke="${rd}" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="M-86,-79 L0,-149" stroke="#fff" stroke-width="2" opacity=".2"/>`;
  g += `<rect x="78" y="-150" width="18" height="34" fill="#7a6a5e"/><rect x="76" y="-154" width="22" height="6" fill="#5a4a40"/>`;
  g += `<rect x="-16" y="-52" width="32" height="52" rx="2" fill="#5a3e28"/><rect x="-16" y="-52" width="12" height="52" fill="#000" opacity=".18"/><circle cx="9" cy="-26" r="2.4" fill="#d8b060"/>`;
  [[-56, -64], [30, -64]].forEach(([wx, wy]) => { g += `<rect x="${wx - 3}" y="${wy - 3}" width="32" height="32" fill="${mix(wall, '#ffffff', .5)}"/><rect x="${wx}" y="${wy}" width="26" height="26" fill="${mix('#3a4a5a', '#ffd88a', lit)}"/><path d="M${wx + 13},${wy} v26 M${wx},${wy + 13} h26" stroke="${mix(wall, '#ffffff', .5)}" stroke-width="2"/>`; });
  g += `<circle cx="0" cy="-104" r="9" fill="${mix('#3a4a5a', '#ffd88a', lit * .6)}" stroke="${mix(wall, '#ffffff', .5)}" stroke-width="2.5"/><rect x="100" y="-62" width="18" height="24" fill="${mix('#2a3644', '#e8b870', lit * .7)}" transform="skewY(-15) translate(0,27)"/>`;
  let sm = ''; if (o.smoke) for (let i = 0; i < 6; i++) { const p = pmod(i / 6 + o.t * .08 + seed * .1, 1); sm += `<circle cx="${(87 + 50 * p * p + 5 * Math.sin(o.t + i)).toFixed(1)}" cy="${(-160 - p * 130).toFixed(1)}" r="${(8 + 26 * p).toFixed(1)}" fill="#f2e6d6" opacity="${((1 - p) * .55).toFixed(2)}" filter="url(#blur5)"/>`; }
  return `<g transform="translate(${x},${y}) scale(${s})">${g}${sm}</g>`;
}
function sceneVillage(t) {
  const T = t - S0(7) + .2, hz = 716;
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#goldS)"/><circle cx="130" cy="${hz - 70}" r="250" fill="url(#sunW)"/>` + sun3(130, hz - 70, 1, '#ffe6b0') + cumulus(420 + T * 5, 500, 260, 91, { a: .8 }) + cumulus(650 + T * 4, 600, 180, 92, { a: .7 });
  s += mountainsR(hz - 30, 140, 531, { rock: '#8c8088', haze: .6, hazeCol: '#f2d6b0', snowAt: .6 }) + `<rect x="-20" y="${hz - 44}" width="760" height="70" fill="#b09e90"/>` + mountainsR(hz - 6, 76, 533, { rock: '#7e8a5c', haze: .42, hazeCol: '#e8d49c' }) + `<rect x="-20" y="${hz - 12}" width="760" height="40" fill="#98a466"/>` + mountainsR(hz + 12, 52, 532, { rock: '#6c7c50', haze: .3, hazeCol: '#e6cfa2' }) + `<rect x="-20" y="${hz + 6}" width="760" height="50" fill="#7e9258"/>`;
  s += meadow(hz + 26, 1300, t, { c0: '#9cae5c', c1: '#5c7830' }) + forestR(hz + 44, 24, 36, 84, 13, '#3e6630', { haze: .22, hazeCol: '#e2cfa6' });
  s += `<rect x="-20" y="${hz - 20}" width="760" height="100" fill="#ffe2b0" opacity=".4" filter="url(#blur9)"/>`;
  // the river on the right
  const L = [], Rr = []; for (let i = 0; i <= 26; i++) { const v = i / 26, y = hz + 44 + Math.pow(v, 1.5) * (1310 - hz - 44), cx = 590 + 50 * Math.sin(v * 3.6 + .4) * (.3 + .7 * v) + 70 * v, w = 4 + 120 * Math.pow(v, 1.5); L.push([cx - w, y]); Rr.push([cx + w, y]); }
  const rv = `M${L.map(PT).join(' L')} L${Rr.slice().reverse().map(PT).join(' L')}Z`;
  s += `<defs><clipPath id="rvV"><path d="${rv}"/></clipPath><linearGradient id="rvWarm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6b4" stop-opacity=".7"/><stop offset="1" stop-color="#ffe6b4" stop-opacity="0"/></linearGradient></defs><path d="${rv}" fill="url(#rivG)"/><g clip-path="url(#rvV)"><rect x="300" y="${hz}" width="460" height="460" fill="url(#rvWarm)"/>` + Array.from({ length: 22 }, (_, i) => { const r = RS(i + 60), v = Math.pow(r(), .7), y = hz + 50 + Math.pow(v, 1.5) * 520, x = 480 + r() * 260 + 10 * Math.sin(t * 1.4 + i); return `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(12 + 28 * v).toFixed(1)},-4 ${(24 + 56 * v).toFixed(1)},0" stroke="#fff" stroke-width="${(1 + 2.2 * v).toFixed(1)}" fill="none" opacity=".55"/>`; }).join('') + `</g><path d="M${L.map(PT).join(' L')}" stroke="#4a3a22" stroke-width="5" fill="none" opacity=".35"/><path d="M${Rr.map(PT).join(' L')}" stroke="#4a3a22" stroke-width="4" fill="none" opacity=".25"/>`;
  // the ploughed field on the left, the path
  s += `<defs><clipPath id="fldC"><path d="M-20,1300 L-20,1060 L250,1040 L330,1300Z"/></clipPath></defs><g clip-path="url(#fldC)"><rect x="-20" y="1030" width="380" height="280" fill="#7a5a3a"/><rect x="-20" y="1030" width="380" height="280" fill="#000" filter="url(#grainR)" opacity=".4"/>` + Array.from({ length: 12 }, (_, i) => { const xb = -170 + i * 46, xt = 80 + i * 16; let rw = `<path d="M${xb},1300 L${xt},1036" stroke="#4e3824" stroke-width="${10}" opacity=".5"/>`; for (let q = 0; q < 12; q++) { const u = q / 12, x = lerp(xb, xt, u) + 18 * (1 - u), y = lerp(1300, 1036, u); rw += tuft(x, y, 26 * (1 - u * .6), i * 20 + q + 700); } return rw; }).join('') + `</g>`;
  s += `<path d="M330,1300 Q350,1180 400,1090 Q430,1030 400,980 L440,980 Q486,1030 462,1100 Q430,1180 470,1300Z" fill="#c8a878" opacity=".85"/>`;
  // the houses, far to near
  const HS = [[236, 876, 1, '#d8c8a8', '#8a4a3a', 2], [442, 890, 1.08, '#c8b090', '#5a5a62', 4], [76, 936, 1.36, '#b89a78', '#6a4a3a', 1], [318, 972, 1.5, '#e2d6bc', '#9a5240', 3]];
  const smallP = (x, y, sc, f, pi, wk) => man(x, y, sc, f, pi, { walk: wk ? (x * f) / (30 * sc) : null, noShadow: 1 });
  let ppl = [];
  HS.forEach(([x, y, sc, w, rf, sd], i) => ppl.push([y, cottage(x, y, sc, w, rf, sd, { smoke: i % 2 === 0, t, lit: .75 })]));
  // the fire and the people round it
  const fx = 488, fy = 1058, fk = .8 + .2 * Math.sin(t * 13);
  ppl.push([fy, `<ellipse cx="${fx}" cy="${fy + 4}" rx="40" ry="8" fill="#2a2010" opacity=".4"/><path d="M${fx - 22},${fy + 2} l44,-6 M${fx - 20},${fy - 6} l42,8" stroke="#4a3220" stroke-width="7" stroke-linecap="round"/><path d="M${fx - 13},${fy - 2} Q${fx - 18},${fy - 24} ${fx - 4},${fy - 34 * fk} Q${fx},${fy - 52 * fk} ${fx + 5},${fy - 30 * fk} Q${fx + 17},${fy - 20} ${fx + 13},${fy - 2}Z" fill="url(#flameG)"/>` + scr(`<circle cx="${fx}" cy="${fy - 14}" r="${70 * fk}" fill="url(#fireGlow)" opacity=".8"/>`)]);
  [[430, 1064, .34, 1, 2], [546, 1068, .34, -1, 6], [470, 1034, .31, 1, 9], [512, 1090, .36, -1, 4]].forEach(([x, y, sc, f, pi]) => ppl.push([y, smallP(x, y, sc, f, pi, 0)]));
  [[150 + T * 5, 950, .23, 1, 1, 1], [548 - T * 4, 912, .19, -1, 8, 1], [196, 988, .27, 1, 0, 0], [222, 990, .26, -1, 7, 0], [560, 986, .26, -1, 3, 0]].forEach(([x, y, sc, f, pi, wk]) => ppl.push([y, smallP(x, y, sc, f, pi, wk)]));
  { const x = 380 + T * 7, y = 1160, sc = .43; ppl.push([y, man(x, y, sc, 1, 5, { walk: x / 15, hF: [x + 14, y - 96] }) + `<path d="M${x + 6},${y - 94} l16,0 l-3,26 l-10,0Z" fill="#8a6a44"/><path d="M${x + 4},${y - 96} q10,-12 20,0" stroke="#5a4028" stroke-width="2.5" fill="none"/>`]); }
  // the farmers
  { const x = 110, y = 1206, sc = .5, sw = .5 + .5 * Math.sin(t * 4), hx = x + 64 * sc + 10 * sw, hy = y - 150 * sc + 40 * sw * sc; ppl.push([y, `<path d="M${(hx - 34 * sc).toFixed(1)},${(hy - 70 * sc).toFixed(1)} L${(hx + 46 * sc).toFixed(1)},${(hy + 120 * sc).toFixed(1)}" stroke="#6a4a2a" stroke-width="5" stroke-linecap="round"/><path d="M${(hx + 46 * sc).toFixed(1)},${(hy + 120 * sc).toFixed(1)} l-16,6 l4,-16Z" fill="#5a5e66"/>` + man(x, y, sc, 1, 3, { lean: 14 + 8 * sw, hF: [hx, hy], hB: [hx - 14 * sc, hy - 34 * sc] })]); }
  ppl.push([1128, man(240, 1128, .4, -1, 6, { lean: 22, hF: [212, 1104], hB: [220, 1100], lookUp: -.3 })]);
  // fishing on the bank
  { const x = 574, y = 1232, sc = .5; let g = man(x, y, sc, 1, 8, { hF: [x + 44 * sc, y - 170 * sc], hB: [x + 30 * sc, y - 150 * sc] }); const H = HP.hand, tip = [H[0] + 124, H[1] - 96], bob = [tip[0] + 6, 1236 + 2 * Math.sin(t * 2.4)];
    g += `<path d="M${(H[0] - 12).toFixed(1)},${(H[1] + 10).toFixed(1)} L${tip[0].toFixed(1)},${tip[1].toFixed(1)}" stroke="#5a4028" stroke-width="3.5" stroke-linecap="round"/><path d="M${tip[0].toFixed(1)},${tip[1].toFixed(1)} Q${(tip[0] + 14).toFixed(1)},${((tip[1] + bob[1]) / 2).toFixed(1)} ${bob[0].toFixed(1)},${bob[1].toFixed(1)}" stroke="#f4f0e4" stroke-width="1.2" fill="none" opacity=".9"/><circle cx="${bob[0].toFixed(1)}" cy="${bob[1].toFixed(1)}" r="4" fill="#e8483a"/><ellipse cx="${bob[0].toFixed(1)}" cy="${(bob[1] + 3).toFixed(1)}" rx="${(10 + 8 * pmod(t * .6, 1)).toFixed(1)}" ry="3" fill="none" stroke="#fff" stroke-width="1.4" opacity="${(.7 * (1 - pmod(t * .6, 1))).toFixed(2)}"/>`; ppl.push([y, g]); }
  ppl.sort((a, b) => a[0] - b[0]); s += ppl.map(q => q[1]).join('');
  s += `<rect x="-20" y="380" width="760" height="920" fill="#ffb060" opacity=".1"/>`;
  noEarth(); F.ov = ''; return s;
}
// 8: is this number enough for humanity to go on? The danger is inbreeding
const icon = (x, y, s, c, a = 1, hc = null) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M-20,34 C-20,6 -14,-10 0,-10 C14,-10 20,6 20,34Z" fill="${c}"/><path d="M-20,34 C-20,6 -14,-10 0,-10 L0,34Z" fill="#000" opacity=".16"/><circle cx="0" cy="-26" r="13" fill="${hc || c}"/><circle cx="-4" cy="-30" r="5" fill="#fff" opacity=".22"/></g>`;
function helix(x, y0, y1, t, kb) {
  const A = 44, ph = y => (y - y0) * .021 + t * 1.1, pa = [], pb = []; let back = '', front = '', rungs = '';
  for (let y = y0; y <= y1; y += 4) { const p = ph(y); pa.push([x + A * Math.sin(p), y, Math.cos(p)]); pb.push([x - A * Math.sin(p), y, -Math.cos(p)]); }
  const seg = (P, col) => { for (let i = 0; i < P.length - 1; i++) { const d = `<path d="M${P[i][0].toFixed(1)},${P[i][1]} L${P[i + 1][0].toFixed(1)},${P[i + 1][1]}" stroke="${P[i][2] > 0 ? col : mix(col, '#0a0e1c', .55)}" stroke-width="${P[i][2] > 0 ? 10 : 7}" stroke-linecap="round"/>`; if (P[i][2] > 0) front += d; else back += d; } };
  seg(pa, '#6ab4ff'); seg(pb, '#c79aff');
  const r = RS(19), PC = [['#ff9a6a', '#5ad0ff'], ['#f4c76b', '#8ae08a']]; let n = 0;
  for (let y = y0 + 10; y <= y1 - 6; y += 23) { const p = ph(y), xa = x + A * Math.sin(p), xb = x - A * Math.sin(p), bad = r() < .55 && r() < kb * 1.4, [c1, c2] = PC[n++ % 2], mx = (xa + xb) / 2, op = (.55 + .45 * Math.abs(Math.sin(p))).toFixed(2);
    if (bad) rungs += `<path d="M${xa.toFixed(1)},${y} L${(mx + (xa - mx) * .35).toFixed(1)},${y - 3} M${xb.toFixed(1)},${y} L${(mx + (xb - mx) * .35).toFixed(1)},${y + 3}" stroke="#ff4a3a" stroke-width="6" stroke-linecap="round" opacity="${op}"/><circle cx="${mx.toFixed(1)}" cy="${y}" r="${(9 + 3 * Math.sin(t * 6 + y)).toFixed(1)}" fill="#ff4a3a" opacity=".35" filter="url(#blur2)"/>`;
    else rungs += `<path d="M${xa.toFixed(1)},${y} L${mx.toFixed(1)},${y}" stroke="${c1}" stroke-width="5" opacity="${op}"/><path d="M${mx.toFixed(1)},${y} L${xb.toFixed(1)},${y}" stroke="${c2}" stroke-width="5" opacity="${op}"/>`; }
  return `<g>${back}${rungs}${front}</g>`;
}
function sceneGenes(t) {
  const tB = WS(8, 7) - .25, q = ease(ramp(t, tB, tB + .5)), r = RS(8);
  let s = `<defs>${LDEFS()}</defs>` + studio('gnS', '#2a3654', '#080b18', 9);
  // all of humanity in one frame: 99 people
  if (q < 1) { let g = ''; for (let i = 0; i < 99; i++) { const c = i % 11, rw = Math.floor(i / 11), P = PALS[Math.floor(r() * PALS.length)], a = ramp(t, S0(8) - .15 + ((c * 7 + rw * 3) % 23) * .02, S0(8) + .1 + ((c * 7 + rw * 3) % 23) * .02), pop = 1 + .25 * Math.sin(Math.PI * a) * (1 - a);
      g += icon(80 + c * 56, 474 + rw * 68 + 2 * Math.sin(t * 1.4 + i), .9 * pop, P.top, a, P.skin); }
    s += `<g opacity="${(1 - q).toFixed(2)}">${g}<text x="360" y="1190" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="130" fill="#f4c76b" opacity="${ease(ramp(t, WS(8, 6), WS(8, 6) + .4)).toFixed(2)}" style="filter:drop-shadow(0 6px 16px rgba(0,0,0,.7))">؟</text></g>`; }
  // a family tree: two cousins marry, and the damage shows in their children
  if (q > 0) { const kb = ease(ramp(t, WS(8, 12) - .1, S0(9) - .4)), g1 = q, g2 = ease(ramp(t, WS(8, 8), WS(8, 8) + .4)), g3 = ease(ramp(t, WS(8, 9), WS(8, 9) + .4)), lk = ease(ramp(t, WS(8, 10) - .1, WS(8, 10) + .4)), g4 = ease(ramp(t, WS(8, 12) - .1, WS(8, 12) + .4));
    const Y = [500, 680, 860, 1050], ln = (d, a, c = '#f4c76b', w = 3.5) => `<path d="${d}" stroke="${c}" stroke-width="${w}" fill="none" opacity="${a.toFixed(2)}" stroke-linecap="round"/>`;
    const hxS = helix(112, 430, 1170, t, kb); let g = '';
    g += ln(`M436,${Y[0]} H516`, g1) + ln(`M476,${Y[0]} V${Y[0] + 84} M350,${Y[0] + 84} H602 M350,${Y[0] + 84} V${Y[1] - 46} M602,${Y[0] + 84} V${Y[1] - 46}`, g2);
    g += ln(`M286,${Y[1]} H350 M602,${Y[1]} H666`, g2) + ln(`M318,${Y[1]} V${Y[2] - 46} M634,${Y[1]} V${Y[2] - 46}`, g3);
    g += ln(`M350,${Y[2] - 5} H602 M350,${Y[2] + 5} H602`, lk, '#ff5a4a', 4) + ln(`M476,${Y[2] + 5} V${Y[2] + 96} M410,${Y[2] + 96} H542 M410,${Y[2] + 96} V${Y[3] - 46} M542,${Y[2] + 96} V${Y[3] - 46}`, g4, '#ff5a4a');
    g += icon(410, Y[0], 1.25, '#e8eef6', g1) + icon(542, Y[0], 1.25, '#e8eef6', g1);
    g += icon(350, Y[1], 1.25, '#e8eef6', g2) + icon(602, Y[1], 1.25, '#e8eef6', g2) + icon(254, Y[1], 1.25, '#7c8aa2', g2) + icon(698, Y[1], 1.25, '#7c8aa2', g2);
    g += icon(318, Y[2], 1.25, mix('#e8eef6', '#ffb0a0', lk), g3) + icon(634, Y[2], 1.25, mix('#e8eef6', '#ffb0a0', lk), g3);
    g += icon(410, Y[3], 1.25, '#e5564c', g4) + icon(542, Y[3], 1.25, '#e5564c', g4);
    g += lbl(476, Y[2] - 24, 'أقارب', lk, '#ff8a7a', 34) + lbl(476, Y[3] + 100, 'أجيالٌ أضعف', g4, '#ff8a7a', 32);
    if (g4 > 0) [410, 542].forEach((x, i) => { g += `<circle cx="${x}" cy="${Y[3] - 6}" r="${(52 + 6 * Math.sin(t * 5 + i)).toFixed(1)}" fill="none" stroke="#ff5a4a" stroke-width="3" opacity="${(.6 * g4).toFixed(2)}" stroke-dasharray="8 7"/>`; });
    s += `<g opacity="${q.toFixed(2)}">${hxS}<g transform="translate(-24,0)">${g}</g></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 9: the surprise: a study worked out that 98 people are enough for a 6,300-year voyage to Proxima b, if the couples are chosen with care
function starship(t) {
  const fk = .85 + .15 * Math.sin(t * 31); let s = '', far = '', near = '';
  const ring = (cx, RX, RY, w, ph, n) => {
    far += `<path d="M${cx},${-RY} A${RX},${RY} 0 0 0 ${cx},${RY}" stroke="#2a3040" stroke-width="${w + 4}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 0 ${cx},${RY}" stroke="#6e7888" stroke-width="${w}" fill="none"/>`;
    near += `<path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#1e2430" stroke-width="${w + 4}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#c4ccd8" stroke-width="${w}" fill="none"/><path d="M${cx},${-RY} A${RX},${RY} 0 0 1 ${cx},${RY}" stroke="#fff" stroke-width="${w * .25}" fill="none" opacity=".5" transform="translate(${w * .25},0)"/>`;
    for (let i = 0; i < 4; i++) { const a = ph + i * Math.PI / 2, x = cx + RX * Math.cos(a), y = RY * Math.sin(a), d = `<path d="M${cx},0 L${x.toFixed(1)},${y.toFixed(1)}" stroke="${Math.cos(a) > 0 ? '#aab4c2' : '#5a6474'}" stroke-width="5"/>`; if (Math.cos(a) > 0) near += d; else far += d; }
    for (let i = 0; i < n; i++) { const a = ph * 1 + i / n * 6.2832, x = cx + RX * Math.cos(a), y = RY * Math.sin(a), d = `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(w * .2).toFixed(1)}" fill="#ffe8a0" opacity="${(Math.cos(a) > 0 ? .95 : .45).toFixed(2)}"/>`; if (Math.cos(a) > 0) near += d; else far += d; }
  };
  ring(64, 30, 150, 20, t * .5, 26); ring(-44, 24, 116, 16, -t * .62 + 1, 20);
  // exhaust
  s += `<ellipse cx="-372" cy="0" rx="${(130 * fk).toFixed(1)}" ry="${(17 * fk).toFixed(1)}" fill="url(#exhG)" opacity=".95" filter="url(#blur5)"/><ellipse cx="-286" cy="0" rx="40" ry="7" fill="#fff" opacity=".95" filter="url(#blur2)"/>`;
  // radiators
  [-1, 1].forEach(sg => { s += `<path d="M-196,${sg * 10} L-118,${sg * 10} L-106,${sg * 118} L-208,${sg * 118}Z" fill="#4a2c34"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-196 - i * 2},${sg * (10 + (i + 1) * 15.4)} H${-118 + i * 2}" stroke="#ff8a6a" stroke-width="1.6" opacity=".55"/>`).join('') + `<path d="M-196,${sg * 10} L-118,${sg * 10} L-106,${sg * 118} L-208,${sg * 118}Z" fill="none" stroke="#8a94a6" stroke-width="2.5"/>`; });
  s += far;
  // spine truss
  s += `<rect x="-226" y="-8" width="412" height="16" fill="url(#hullM)"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${-222 + i * 20},8 l10,-16 l10,16" stroke="#3a4252" stroke-width="1.6" fill="none"/>`).join('');
  // fuel tanks
  [[-150, -24], [-150, 24], [-96, -24], [-96, 24]].forEach(([x, y]) => { s += `<rect x="${x - 24}" y="${y - 13}" width="48" height="26" rx="13" fill="url(#foilG)"/><rect x="${x - 24}" y="${y - 13}" width="48" height="8" rx="4" fill="#fff" opacity=".3"/>`; });
  // engine
  s += `<rect x="-250" y="-24" width="40" height="48" rx="5" fill="url(#hullM)"/><path d="M-250,-16 L-278,-30 L-278,30 L-250,16Z" fill="#3a4252"/><path d="M-278,-30 L-278,30" stroke="#9ad8ff" stroke-width="5"/><ellipse cx="-280" cy="0" rx="8" ry="26" fill="#cfeaff" opacity=".9" filter="url(#blur2)"/>`;
  // hubs, the command module, the shield
  s += `<rect x="44" y="-20" width="40" height="40" rx="6" fill="url(#hullM)"/><rect x="-60" y="-17" width="34" height="34" rx="5" fill="url(#hullM)"/>`;
  s += `<rect x="140" y="-22" width="92" height="44" rx="22" fill="url(#hullM)"/><rect x="150" y="-16" width="70" height="9" rx="4" fill="#fff" opacity=".35"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${158 + i * 12}" y="-3" width="7" height="8" rx="2" fill="#ffe8a0"/>`).join('') + `<ellipse cx="244" cy="0" rx="10" ry="48" fill="#aeb6c4"/><ellipse cx="247" cy="0" rx="6" ry="44" fill="#e6eaf0"/><path d="M186,-22 L176,-74 M176,-74 l-9,-3 M176,-74 l9,-3" stroke="#c4ccd8" stroke-width="3" fill="none"/><circle cx="176" cy="-78" r="5" fill="#e6eaf0"/>`;
  return s + near;
}
function sceneShip(t) {
  const T = t - S0(9) + .2, mv = ease(ramp(t, S0(9) - .2, WS(9, 13)));
  gAt(t, lerp(214, 58, mv), lerp(968, 940, mv), { d: lerp(9.2, 34, mv), el: .2, lon: 30 + T * 2.5, clouds: .4, lights: .3 });
  const sx = lerp(330, 414, mv), sy = lerp(650, 706, mv) + 5 * Math.sin(t * .9), sc = lerp(.82, .98, mv), stA = ease(ramp(t, WS(9, 8) - .2, WS(9, 9))), STX = 632, STY = 470, pa = ease(ramp(t, WS(9, 14) - .2, WS(9, 14) + .35));
  let o = `<defs>${LDEFS()}</defs>`;
  // Proxima Centauri (a red dwarf) and the way there
  if (stA > 0) { const nx = sx + Math.cos(-.384) * 250 * sc, ny = sy + Math.sin(-.384) * 250 * sc;
    o += `<g opacity="${stA.toFixed(2)}"><circle cx="${STX}" cy="${STY}" r="${(54 + 5 * Math.sin(t * 3)).toFixed(1)}" fill="url(#redSt)"/><circle cx="${STX}" cy="${STY}" r="6" fill="#fff2e0"/><circle cx="${STX + 22}" cy="${STY + 9}" r="3.2" fill="#8ac8ff"/><path d="M${nx.toFixed(1)},${ny.toFixed(1)} Q${(nx + STX) / 2 + 30},${(ny + STY) / 2} ${STX - 6},${STY + 40}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="3 11" fill="none" stroke-linecap="round" stroke-dashoffset="${(-t * 26).toFixed(1)}"/></g>` +
      lbl(STX - 128, STY - 2, 'بروكسيما ب', stA, '#ffc8a8', 30) + lbl(STX - 128, STY + 32, '٤٫٢ سنة ضوئيّة', stA * ease(ramp(t, WS(9, 10), WS(9, 11))), '#fff', 23); }
  o += `<g transform="translate(${sx.toFixed(1)},${sy.toFixed(1)}) rotate(-22) scale(${sc.toFixed(3)})">${starship(t)}</g>`;
  // the couples, chosen so that they are not related
  if (pa > 0) { const X0 = 50, Y0 = 1004, CP = ['#8ac8ff', '#f4a8c0', '#a8e0a0', '#f4c76b', '#c8a8f4', '#ffb08a', '#8ae0d8'];
    o += `<g opacity="${pa.toFixed(2)}">` + panel(X0, Y0, 620, 190, 1) + lbl(360, Y0 + 44, 'أزواجٌ من عائلاتٍ مختلفة', 1, '#fff', 28);
    for (let i = 0; i < 7; i++) { const x = X0 + 62 + i * 82.6, a = ease(ramp(t, WS(9, 15) - .1 + i * .13, WS(9, 15) + .2 + i * .13)), y = Y0 + 124;
      o += icon(x - 15, y, .82, CP[i], a) + icon(x + 15, y, .82, mix(CP[(i + 3) % 7], '#ffffff', .25), a) + `<path d="M${x - 8},${y - 52} q8,-12 16,0" stroke="#f4c76b" stroke-width="3.5" fill="none" opacity="${a.toFixed(2)}" stroke-linecap="round"/><circle cx="${x}" cy="${y - 60}" r="4" fill="#f4c76b" opacity="${a.toFixed(2)}"/>`; }
    o += `</g>`; }
  F.ov = o; return space(t) + `<g opacity=".8">${milkyW(t, { rot: -26, seed: 12 })}</g>`;
}
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
// street of #47 (no technology): street10. Based on #46 street9: new buildings, shops (an electronics shop with TVs in the window) and tree seeds; o.tv (0-1, the TVs lit), o.emit (light-emitting things drawn after the night tint); o.litB (5 values, the lit windows of each block), o.litS (shop lights), o.lampK (street lamps), o.back, o.cl, o.dead, o.noTrees, o.noMoon, o.sky2, o.sky, o.ground, o.fg, o.top
const SHOP10 = [[-4, 150, 'مقهى', '#6a3a2a'], [152, 146, 'إلكترونيّات', '#1f4f8a'], [304, 152, 'صيدليّة', '#2a8a6a'], [462, 146, 'ملابس', '#8a3a5a'], [614, 130, 'كتب', '#7a5a2a']];
const BLK10 = [[-10, 160, 520, '#c8b49a', 1001, 1], [152, 150, 430, '#7e8c9a', 1002, 0], [304, 156, 560, '#b07a5e', 1003, 2], [462, 150, 470, '#a8a49a', 1004, 1], [614, 132, 520, '#8a9a8a', 1005, 0]];
function shopRow10(PV, lit, tv) {
  let s = '', e = '';
  SHOP10.forEach(([sx, sw, name, c], i) => { const r = RS(i + 911), gx = sx + 6, gw = sw - 12, dw = 30;
    s += `<rect x="${sx}" y="${PV - 98}" width="${sw}" height="98" fill="#2a2420"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="#3d4f62"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="74" fill="url(#glsG)" opacity=".28"/>` +
      (i === 1 ? tvWin(gx, PV, tv ?? 0) : '') + Array.from({ length: i === 1 ? 0 : Math.floor((gw - dw - 14) / 17) }, (_, q) => { const bx = gx + 8 + q * 17, bh = 12 + r() * 20; return `<rect x="${bx}" y="${PV - 14 - bh}" width="12" height="${bh.toFixed(1)}" rx="2" fill="${['#e8c890', '#c86a4a', '#8ab0d0', '#e8e0d0', '#7aa86a'][Math.floor(r() * 5)]}" opacity=".85"/>`; }).join('') +
      `<rect x="${gx}" y="${PV - 14}" width="${gw - dw - 4}" height="8" fill="#1c1814"/><rect x="${gx + gw - dw}" y="${PV - 80}" width="${dw}" height="80" fill="#22303e"/><rect x="${gx + gw - dw + 3}" y="${PV - 76}" width="${dw - 6}" height="70" fill="#5a7890" opacity=".7"/>` +
      `<path d="M${gx},${PV - 6} L${gx},${PV - 60} L${gx + gw * .3},${PV - 80} L${gx + gw * .46},${PV - 80} L${gx},${PV - 30}Z" fill="#fff" opacity=".13"/><rect x="${gx}" y="${PV - 80}" width="${gw}" height="22" fill="url(#aoDn)"/>` +
      `<rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${c}"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="5" fill="#fff" opacity=".22"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${name.length > 8 ? 14 : 17}" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 97} L${sx + sw + 4},${PV - 97} L${sx + sw + 13},${PV - 75} L${sx - 13},${PV - 75}Z" fill="${mix(c, '#ffffff', .25)}"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<path d="M${sx - 2 + q * 18},${PV - 97} l-1.6,22 l9,0 l1.6,-22Z" fill="#fff" opacity=".3"/>`).join('') +
      `<path d="M${sx - 13},${PV - 75} L${sx + sw + 13},${PV - 75} l0,4 L${sx - 13},${PV - 71}Z" fill="#000" opacity=".25"/>`;
    e += `<g opacity="${(lit ? lit[i] : 1).toFixed(2)}"><rect x="${gx}" y="${PV - 72}" width="${gw}" height="66" fill="#ffd9a0" opacity=".42"/><rect x="${sx - 2}" y="${PV - 124}" width="${sw + 4}" height="27" fill="${mix(c, '#ffffff', .2)}" opacity=".7"/><text x="${sx + sw / 2}" y="${PV - 104}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${gx},${PV} L${gx + gw},${PV} L${gx + gw + 30},${PV + 90} L${gx - 30},${PV + 90}Z" fill="#ffcf8a" opacity=".16" filter="url(#soft)"/></g>`; });
  return { s, e };
}
function street10(t, o = {}) {
  const N = o.N || 0, id = o.id || 's';
  const sky = o.sky || [mix('#3a6fb8', '#060c24', N), mix('#93bbe2', '#16224a', N), mix('#ebe3d0', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .92)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient>` +
    (o.warp ? `<filter id="wp${id}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${(.008 + .002 * Math.sin(t * 1.3)).toFixed(4)} ${(.016 + .003 * Math.cos(t * 1.1)).toFixed(4)}" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="${o.warp.toFixed(1)}" xChannelSelector="R" yChannelSelector="G"/></filter>` : '') +
    `</defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(12); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 760).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    if (!o.noMoon) s += `<circle cx="560" cy="430" r="90" fill="#fff8e0" opacity="${(.14 * N).toFixed(2)}" filter="url(#soft)"/>` + moon(560, 430, 30, N); s += o.sky2 || ''; }
  const sx = o.sunX ?? 560, sy = o.sunY ?? 330, gC = o.glowC || '#fff6d0', cC = o.sunC || '#fffdf2', gR = o.glowR || 150;
  if (N < .98 && !o.overcast) s += `<circle cx="${sx}" cy="${sy}" r="${gR * 2.2}" fill="${gC}" opacity="${(.16 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${sx}" cy="${sy}" r="${gR}" fill="${gC}" opacity="${(.32 * (1 - N)).toFixed(2)}" filter="url(#soft)"/><circle cx="${sx}" cy="${sy}" r="48" fill="${gC}" opacity=".5" filter="url(#blur9)"/><circle cx="${sx}" cy="${sy}" r="24" fill="${cC}" opacity="${(1 - N).toFixed(2)}"/>` + cumulus(150 + t * 1.2, 500, 210, 33, { a: .9 * (1 - N) * (o.cl ?? 1) }) + cumulus(440 + t * .8, 610, 150, 35, { a: .75 * (1 - N) * (o.cl ?? 1) });
  s += o.back || '';
  let g = farCity(83, 905, mix(sky[2], '#55657a', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  BLK10.forEach(([x, w, h, c, sd, k], i) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += `<g opacity="${(o.litB ? o.litB[i] : 1).toFixed(2)}">${b.e}</g>`; });
  const sh = shopRow10(PV, o.litS, o.tv); g += sh.s; e += sh.e; g += o.wall || '';
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#a0947e" stroke-width="1.5"/>`;
  for (let q = -1; q < 17; q++) g += `<path d="M${q * 52 + 10},${PV} L${q * 52},${KB}" stroke="#a0947e" stroke-width="1.5"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#4a4a52"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 60}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `<rect x="120" y="${KB + 6}" width="34" height="9" rx="2" fill="#1e1e22"/>`;
  let trS = ''; (o.noTrees ? [] : [[102, 276, 341], [600, 300, 347]]).forEach(([px, h, sd]) => { const py = PV + 60; const q0 = g.length; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` +
    `<path d="M${px - 20},${py} Q${px + 40},${py - 10} ${px + 120},${py + 4} Q${px + 150},${py + 22} ${px + 90},${py + 32} Q${px + 20},${py + 36} ${px - 18},${py + 10}Z" fill="#000" opacity="${(.22 * (1 - N)).toFixed(2)}" filter="url(#blur2)"/>` + (o.dead ? deadTree(px, py - 2, h, sd) : treeR(px, py - 2, h, sd, t)); trS += g.slice(q0); });
  const lamps = o.lamps === 0 ? [] : [[24, 0], [380, 1]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  if (o.cars !== 0) g += car(o.carX || 470, 1170, .95, '#d8d8dc', -1, 0) + (N > .5 ? '' : car(pmod(-160 + t * 70, 1100) - 180, 1258, .9, '#2a5a8a', 1, 0));
  g += o.ground || ''; g += o.fg || '';
  s += `<g filter="url(#sf${id})"${o.warp ? '' : ''}>${o.warp ? `<g filter="url(#wp${id})">${g}</g>` : g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${o.warp ? `<g filter="url(#wp${id})">${e}</g>` : e}` + `<g opacity="${(o.lampK ?? 1).toFixed(2)}">` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><path d="M${lx + 54},${PV - 166} L${lx + 76},${PV - 166} L${lx + 210},${PV + 104} L${lx - 80},${PV + 104}Z" fill="#ffd59a" opacity=".16" filter="url(#soft)"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g></g>`;
  if (N > .02 && trS) s += `<g filter="url(#sf${id})">${trS}</g>`;   // the trees again, over the lit windows behind them
  s += o.emit || '';
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// six small TVs in the electronics shop window; lit = 0..1 (their pictures), dark glass when off
function tvWin(gx, PV, lit) {
  let s = '';
  for (let q = 0; q < 6; q++) { const x = gx + 6 + (q % 3) * 32, y = PV - 74 + Math.floor(q / 3) * 30;
    s += `<rect x="${x - 2}" y="${y - 2}" width="30" height="22" rx="2" fill="#0e1014"/><rect x="${x}" y="${y}" width="26" height="18" fill="#161a20"/><path d="M${x},${y + 18} L${x + 9},${y} L${x + 14},${y} L${x + 5},${y + 18}Z" fill="#fff" opacity=".08"/>`;
    if (lit > 0) s += `<g opacity="${lit.toFixed(2)}"><rect x="${x}" y="${y}" width="26" height="18" fill="${['#3a8ad8', '#e8783a', '#4ab07a', '#d84a6a', '#e8c84a', '#7a5ad8'][q]}"/><circle cx="${x + 8}" cy="${y + 7}" r="4" fill="#fff" opacity=".7"/><rect x="${x + 4}" y="${y + 12}" width="18" height="3" fill="#fff" opacity=".5"/></g>`;
    s += `<rect x="${x + 10}" y="${y + 20}" width="6" height="4" fill="#2a2a30"/>`; }
  return s;
}
// ===================== "what if there were no technology?" (Short #47) =====================
// everything that runs on electricity or fuel stops at once. gl3d_tc.js = gl3d_ln.js (the house Earth with the mirror and 3D-fade fixes).
const TDEF = `<linearGradient id="chrG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a626c"/><stop offset=".22" stop-color="#e8eef4"/><stop offset=".4" stop-color="#9aa4ae"/><stop offset=".62" stop-color="#f6f8fa"/><stop offset=".85" stop-color="#7a828c"/><stop offset="1" stop-color="#3a4048"/></linearGradient>` +
  `<linearGradient id="chrV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f8fa"/><stop offset=".45" stop-color="#a8b2bc"/><stop offset=".7" stop-color="#e2e8ee"/><stop offset="1" stop-color="#5a626c"/></linearGradient>` +
  `<linearGradient id="steelS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a727c"/><stop offset=".5" stop-color="#b8c0c8"/><stop offset="1" stop-color="#d8dee4"/></linearGradient>` +
  `<linearGradient id="watS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe2f6" stop-opacity=".55"/><stop offset=".4" stop-color="#ffffff" stop-opacity=".9"/><stop offset="1" stop-color="#8ac4e8" stop-opacity=".55"/></linearGradient>` +
  `<linearGradient id="tileW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dcd4"/><stop offset="1" stop-color="#bfc6bc"/></linearGradient>` +
  `<linearGradient id="bbG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5a8a"/><stop offset=".5" stop-color="#7a4ae8"/><stop offset="1" stop-color="#2ab0f0"/></linearGradient>` +
  `<radialGradient id="bbGl"><stop offset="0" stop-color="#b48aff" stop-opacity=".5"/><stop offset="1" stop-color="#b48aff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="satGl"><stop offset="0" stop-color="#fff8e0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffd890" stop-opacity=".45"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="apronG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8a49a"/><stop offset="1" stop-color="#7e7a72"/></linearGradient>` +
  `<linearGradient id="seaD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9eb0"/><stop offset=".06" stop-color="#4a6a88"/><stop offset=".5" stop-color="#2a4a6a"/><stop offset="1" stop-color="#16304c"/></linearGradient>` +
  `<linearGradient id="skyO" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6e8a"/><stop offset=".6" stop-color="#a8b4c0"/><stop offset="1" stop-color="#e2d8c8"/></linearGradient>`;
const TDEFS = () => `${LDEFS()}${WHDEF}${TDEF}`;
const flick = (t, ti) => t < ti ? 1 : t < ti + .4 ? (Math.sin((t - ti) * 55) > -.2 ? .95 : .2) * (1 - (t - ti) / .4) : 0;
// distance travelled (in seconds at full speed) from t0 to t, braking between ts and te
function travel(t, t0, ts, te) { let d = 0; for (let u = t0; u < t; u += 1 / 30) d += (1 - ease(ramp(u, ts, te))) / 30; return d; }

// ---------- 0: the Earth at night with its satellites; then every light and every machine stops ----------
const SATS = [[53, 20, 1.12, .62, 0], [97.6, 130, 1.1, .7, 1.3], [28.5, 250, 1.15, .5, 2.2], [63, 300, 1.22, .4, 4.1], [8, 60, 1.3, .3, 3.2]];
function satXY(G, inc, node, h, u) { const i = inc * Math.PI / 180, la = Math.asin(Math.sin(i) * Math.sin(u)) * 180 / Math.PI, lo = node + Math.atan2(Math.cos(i) * Math.sin(u), Math.cos(u)) * 180 / Math.PI;
  const p = geo3(la, lo + 180, G.spin, h), cl = Math.hypot(...G.cam.pos), front = (p[0] * G.cam.pos[0] + p[1] * G.cam.pos[1] + p[2] * G.cam.pos[2]) / (h * cl), [x, y] = G.P(la, lo, h), out = Math.hypot(x - G.c0[0], y - G.c0[1]) > G.R;
  return [x, y, front > 0 || out, front]; }
function sats(G, t, live) {
  let s = '';
  SATS.forEach(([inc, node, h, sp, ph], k) => { let d = '', on = false;
    for (let j = 0; j <= 120; j++) { const [x, y, v] = satXY(G, inc, node, h, j / 120 * 6.2832); if (!v) { on = false; continue; } d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; }
    s += `<path d="${d}" stroke="#f4c76b" stroke-width="1.6" fill="none" opacity="${(.12 + .3 * live).toFixed(2)}" stroke-dasharray="5 7"/>`;
    for (let q = 0; q < 3; q++) { const u = ph + q * 2.1 + t * sp * .35, [x, y, v, fr] = satXY(G, inc, node, h, u); if (!v) continue; const sc = 1.15 + .4 * clamp(fr), bl = live * (.75 + .25 * Math.sin(t * 7 + k * 3 + q));
      s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(k * 40 + q * 25).toFixed(0)}) scale(${sc.toFixed(2)})"><rect x="-15" y="-3" width="10" height="6" fill="#4a6aa8"/><rect x="5" y="-3" width="10" height="6" fill="#4a6aa8"/><path d="M-15,0 h30" stroke="#c8ccd2" stroke-width=".8"/><rect x="-4" y="-4" width="8" height="8" rx="1" fill="${mix('#7a7e86', '#e8d8a8', live)}"/></g>` +
        (bl > .02 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(16 * sc).toFixed(1)}" fill="url(#satGl)" opacity="${bl.toFixed(2)}"/>` : ''); } });
  return s;
}
function sceneHook(t) {
  const t0 = WS(0, 9) - .15, k = ease(ramp(t, t0, t0 + 1.3)), fl = k > 0 && k < 1 ? .8 + .2 * Math.sin(t * 46) : 1, live = 1 - ease(ramp(t, t0 + .3, t0 + 1.1));
  const G = gAt(t, 360, 700, { d: lerp(8.2, 7.4, ease(ramp(t, 0, 6))), el: .2, lon: 34 + t * 1.4, clouds: .3, lights: 1.75 * (1 - k) * fl, off: 2.75 });
  F.ov = `<defs>${TDEFS()}</defs>` + sats(G, t, live);
  return space(t);
}

// ---------- 1: the screens go out, the phones die, the street goes dark ----------
function billboard(t, lit) {   // a big LED screen on the facade of block 3
  const x = 318, y = 478, w = 128, h = 168;
  let base = `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="#2a2c32"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0c0e12"/><path d="M${x},${y + h} L${x + w * .55},${y} L${x + w * .75},${y} L${x + w * .2},${y + h}Z" fill="#fff" opacity=".05"/>` +
    `<path d="M${x + 20},${y + h + 6} v34 M${x + w - 20},${y + h + 6} v34" stroke="#3a3c42" stroke-width="6"/>`;
  let em = '';
  if (lit > .01) { const p = t * .9;
    em = `<g opacity="${lit.toFixed(2)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#bbG)"/>` +
      [0, 1, 2].map(i => `<circle cx="${(x + w / 2 + Math.cos(p + i * 2.1) * 34).toFixed(1)}" cy="${(y + 64 + Math.sin(p * 1.3 + i * 2.1) * 26).toFixed(1)}" r="${18 - i * 4}" fill="#fff" opacity="${(.35 + i * .1).toFixed(2)}"/>`).join('') +
      `<rect x="${x + 14}" y="${y + 116}" width="${w - 28}" height="14" rx="3" fill="#fff" opacity=".85"/><rect x="${x + 30}" y="${y + 140}" width="${w - 60}" height="9" rx="3" fill="#fff" opacity=".55"/>` +
      `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000" opacity=".12" filter="url(#grainR)"/></g>` +
      scr(`<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${w * 1.5}" fill="url(#bbGl)" opacity="${lit.toFixed(2)}"/>`); }
  return { base, em };
}
function sceneScreens(t) {
  const T = t - S0(1) + .2, y0 = PV + 78, tvL = flick(t, WS(1, 1) - .1), bbL = flick(t, WS(1, 1) + .2), dk = ease(ramp(t, WS(1, 4), WS(1, 8)));
  const ord = [2, 0, 4, 1, 3], litB = ord.map(q => flick(t, WS(1, 4) + q * .3)), litS = [1, 3, 0, 4, 2].map(q => flick(t, WS(1, 4) + .15 + q * .3)), lampK = flick(t, WS(1, 6));
  const N = lerp(.8, .95, ease(ramp(t, WS(1, 4), WS(1, 9)))), bb = billboard(t, bbL);
  const PP = [[112, 1, .8, 3], [318, -1, .78, 6], [548, 1, .82, 1]];
  let top = '', emit = bb.em;
  PP.forEach(([x, f, s, pi], i) => { const ph = flick(t, WS(1, 2) + .05 + i * .22), up = ease(ramp(t, WS(1, 2) + .5 + i * .22, WS(1, 3) + .6 + i * .22)), sway = Math.sin(T * 1.1 + i) * .8;
    const A = { s, face: f, shade: 1, lean: sway, lookUp: lerp(-.22, .16, up), hF: [x + f * s * lerp(40, 30, up), y0 - s * lerp(236, 170, up)], hB: [x + f * s * lerp(30, 12, up), y0 - s * lerp(224, 130, up)] };
    top += hero(x, y0 + i % 2 * 8, Object.assign(A, palS(pi))); const H = HP.hand.slice();
    top += phoneIn(H, s * 2, f, ph);
    if (ph > .02) emit += scr(`<ellipse cx="${(HP.head[0] + f * 10).toFixed(1)}" cy="${(HP.head[1] + 8).toFixed(1)}" rx="30" ry="34" fill="#8ac4ff" opacity="${(.4 * ph).toFixed(2)}" filter="url(#blur5)"/>`); });
  emit += `<rect x="-20" y="-20" width="760" height="1320" fill="#0c1430" opacity="${(.12 + .42 * dk).toFixed(2)}" style="mix-blend-mode:multiply"/>`;
  const sky2 = `<circle cx="590" cy="420" r="70" fill="url(#sunW)" opacity=".25"/><circle cx="590" cy="420" r="20" fill="#eef2ff" opacity=".9"/><circle cx="584" cy="414" r="6" fill="#c8d0e0" opacity=".5"/>`;
  let s = `<defs>${TDEFS()}</defs>` + street10(t, { N, id: 'sc', cars: 0, overcast: 1, noMoon: 1, sky2, litB, litS, lampK, tv: tvL, wall: bb.base, emit, top, ground: car(430, 1258, .9, '#8a2a2a', -1, 0) });
  noEarth(); F.ov = ''; return s;
}

// ---------- 2a: the cars stop in their lanes; the traffic light goes dark ----------
function trafficL(x, base, red) {
  return `<rect x="${x - 4}" y="${base - 330}" width="8" height="330" fill="#3a3e44"/><rect x="${x - 3}" y="${base - 330}" width="2" height="330" fill="#fff" opacity=".2"/><rect x="${x - 17}" y="${base - 420}" width="34" height="96" rx="6" fill="#22252a"/>` +
    [0, 1, 2].map(i => `<circle cx="${x}" cy="${base - 402 + i * 30}" r="10" fill="${i === 0 ? mix('#3a1a1a', '#ff3a2a', red) : i === 1 ? '#3a321a' : '#1a3022'}"/><path d="M${x - 12},${base - 412 + i * 30} q12,-6 24,0" stroke="#22252a" stroke-width="5" fill="none"/>`).join('') +
    (red > .02 ? scr(`<circle cx="${x}" cy="${base - 402}" r="40" fill="#ff5a3a" opacity="${(.45 * red).toFixed(2)}" filter="url(#blur9)"/>`) : '');
}
function sceneJam(t) {
  const t0 = S0(2) - .2, ts = WS(2, 0) - .2, te = WS(2, 1) + .25, d = travel(t, t0 - .6, ts, te), T = t - t0, red = flick(t, WS(2, 0));
  let fg = '';
  // lane near the kerb: going left; far lane: going right; all stop where they are
  [[840, '#d8d8dc'], [570, '#2a5a8a'], [300, '#b8a24a']].forEach(([x0, c]) => { fg += car(x0 - 150 * d, 1162, .8, c, -1, 0); });
  fg += `<path d="M-20,1200 H740" stroke="#e8e4d8" stroke-width="5" stroke-dasharray="40 30" opacity=".75"/>`;
  [[-150, '#b8322a'], [130, '#e8e6e0'], [410, '#3a6a4a']].forEach(([x0, c]) => { fg += car(x0 + 170 * d, 1224, .84, c, 1, 0); });
  // people on the pavement stop and look at the road
  const st = ease(ramp(t, WS(2, 1), WS(2, 2)));
  const pA = 140 + Math.min(T, WS(2, 1) - t0) * 30, pB = 470 - Math.min(T, WS(2, 1) + .2 - t0) * 26;
  let ped = hero(pA, PV + 72, Object.assign({ s: .7, face: 1, shade: 1, walk: t < WS(2, 1) ? pA / 24 : null, lookUp: -.06 * st }, palS(2)));
  ped += hero(pB, PV + 86, Object.assign({ s: .74, face: -1, shade: 1, walk: t < WS(2, 1) + .2 ? pB / 24 : null }, palS(9)));
  let s = `<defs>${TDEFS()}</defs>` + street10(t, { N: 0, id: 'jm', cars: 0, overcast: 1, back: sun3(600, 470), fg: ped + trafficL(668, PV + 96, red) + fg });
  noEarth(); F.ov = ''; return s;
}

// ---------- 2b: the ships drift: no engine, no wake, no smoke ----------
function cargoShip(dir = 1, seed = 5) {   // drawn at the origin, waterline y=0, ~380 px long, facing +x (from #27)
  const pal = ['#c0392b', '#2a6ab0', '#e8a23a', '#3a8a5a', '#8a8a8a', '#2a4a7a', '#d8d8d8'], r = RS(seed); let c = '';
  for (let tr = 0; tr < 3; tr++) for (let i = 0; i < 12; i++) { const x = -120 + i * 23, y = -58 - tr * 17, col = pal[Math.floor(r() * pal.length)]; if (tr === 2 && (i < 2 || i > 9)) continue;
    c += `<rect x="${x}" y="${y}" width="22" height="16.5" fill="${col}"/><rect x="${x}" y="${y}" width="22" height="3" fill="#fff" opacity=".18"/><rect x="${x + 15}" y="${y}" width="7" height="16.5" fill="#000" opacity=".22"/>` + [5, 10].map(q => `<path d="M${x + q},${y + 2} v13" stroke="#000" stroke-width=".8" opacity=".25"/>`).join(''); }
  return `<g transform="scale(${dir},1)"><defs><linearGradient id="hlG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3440"/><stop offset="1" stop-color="#141a22"/></linearGradient></defs>` +
    `<path d="M-185,-40 L175,-40 Q205,-36 196,-18 L182,0 L-170,0 Q-186,-18 -185,-40Z" fill="url(#hlG)"/><path d="M-170,0 L182,0 L176,14 L-164,14Z" fill="#8a2a22"/><path d="M-185,-42 L178,-42 L176,-38 L-185,-38Z" fill="#e8e8e8"/>` +
    `<path d="M-185,-40 L175,-40 Q205,-36 196,-18 L182,0 L-170,0Z" fill="#fff" opacity=".07"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-160 + i * 40},-40 v40" stroke="#000" stroke-width="1" opacity=".18"/>`).join('') + c +
    `<rect x="-178" y="-104" width="44" height="62" fill="#f2f2ee"/><rect x="-178" y="-104" width="14" height="62" fill="#000" opacity=".12"/>` + [0, 1, 2, 3].map(q => `<rect x="-174" y="${-98 + q * 14}" width="36" height="5" fill="#2a3a4a"/>`).join('') +
    `<rect x="-184" y="-112" width="56" height="9" fill="#e8e8e4"/><rect x="-170" y="-138" width="13" height="27" fill="#2a2a2a"/><rect x="-170" y="-132" width="13" height="6" fill="#2a6ab0"/><path d="M-152,-112 v-22 M-156,-128 h8" stroke="#ddd" stroke-width="2"/></g>`;
}
function seaRows(T, HZ, gx, seed) {
  let s = ''; const r = RS(seed);
  for (let row = 0; row < 34; row++) { const z = Math.pow(row / 33, 1.7), y = HZ + 3 + z * (1280 - HZ - 10), n = Math.round(26 - 18 * z), w = 8 + 70 * z, ph = T * (.18 + z * .35);
    for (let i = 0; i < n; i++) { const x = pmod(i * 760 / n + r() * 40 + ph * 40 * (row % 2 ? 1 : -1), 780) - 30, gl = Math.abs(x - gx - (y - HZ) * .15) < 50 + z * 70;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-2 - 6 * z).toFixed(1)} ${w.toFixed(1)},0" stroke="${gl ? '#fff0d0' : r() < .55 ? '#c8d8e4' : '#0e2840'}" stroke-width="${(1 + 2.4 * z).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${((gl ? .6 : .34) * (.4 + .6 * z)).toFixed(2)}"/>`; } }
  return s;
}
function sceneSea(t) {
  const t0 = WS(2, 4) - .25, T = t - t0, HZ = 700;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#skyO)"/>` + sun3(470, 560, .75, '#ffe8c0') +
    cumulus(140 + T * 6, 420, 300, 71, { a: .9 }) + cumulus(560 + T * 4, 500, 240, 73, { a: .8 }) + cumulus(330 + T * 5, 600, 200, 75, { a: .7 });
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#seaD)"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<path d="M455,${HZ} L485,${HZ} L600,1300 L360,1300Z" fill="#fff0d0" opacity=".1"/>` + seaRows(T, HZ, 470, 23);
  // a far ship, also dead in the water
  s += `<g transform="translate(150,${HZ + 14}) scale(.22)" opacity=".75">${cargoShip(-1, 9)}</g>`;
  // the near ship: no wake, no smoke; it drifts sideways with the wind and rolls slowly
  const sx = 330 + T * 16, sy = 990, roll = Math.sin(t * .9) * 2.4 + 1.5, bob = Math.sin(t * 1.3) * 4;
  s += `<g transform="translate(${sx.toFixed(1)},${(sy + bob).toFixed(1)}) scale(1.05,-.5)" opacity=".26" filter="url(#blur2)">${cargoShip(1)}</g>` +
    `<g transform="translate(${sx.toFixed(1)},${(sy + bob).toFixed(1)}) scale(1.05) rotate(${roll.toFixed(2)})">${cargoShip(1)}</g>` +
    `<path d="M${(sx - 210).toFixed(1)},${(sy + bob + 6).toFixed(1)} q210,10 420,0" stroke="#e8f0f4" stroke-width="3" fill="none" opacity=".35"/>`;
  for (let i = 0; i < 4; i++) s += bird(560 - i * 40 - T * 30, 520 + i * 14 + (i % 2) * 12, .32, Math.sin(t * 8 + i), 4);
  noEarth(); F.ov = ''; return s;
}

// ---------- 2c: no plane takes off: the airliners stay at the gates ----------
function jetOnGround(x, y, s, dir = 1) {   // airliner with its landing gear; (x, y) = the ground under the main wheels
  const gear = `<path d="M150,14 L150,56 M-24,16 L-24,54 M-4,16 L-4,54" stroke="#8a929c" stroke-width="5"/><circle cx="150" cy="60" r="9" fill="#1e2026"/><circle cx="-24" cy="58" r="11" fill="#1e2026"/><circle cx="-4" cy="58" r="11" fill="#1e2026"/><circle cx="-24" cy="58" r="4" fill="#8a929c"/><circle cx="-4" cy="58" r="4" fill="#8a929c"/>`;
  return `<g transform="translate(${x},${y}) scale(${(s * dir).toFixed(3)},${s})"><ellipse cx="20" cy="70" rx="220" ry="10" fill="#000" opacity=".3" filter="url(#blur5)"/><g transform="translate(0,-69)">${gear}${airliner()}</g></g>`;
}
function sceneAir(t) {
  const t0 = WS(2, 8) - .25, T = t - t0, HZ = 820;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#dSky)"/>` + sun3(560, 420) + cumulus(170 + T * 5, 520, 260, 81, { a: .9 }) + cumulus(520 + T * 4, 610, 200, 83, { a: .75 });
  // the terminal: a long glass hall with a curved roof, the control tower behind
  s += `<rect x="560" y="${HZ - 250}" width="34" height="250" fill="#c8ccd0"/><rect x="560" y="${HZ - 250}" width="10" height="250" fill="#000" opacity=".12"/><path d="M540,${HZ - 250} L614,${HZ - 250} L604,${HZ - 296} L550,${HZ - 296}Z" fill="#2a3a4a"/><path d="M546,${HZ - 300} h62 l-8,-12 h-46Z" fill="#d8dce0"/><path d="M577,${HZ - 312} v-24" stroke="#8a929c" stroke-width="3"/>`;
  s += `<path d="M-20,${HZ - 120} Q360,${HZ - 168} 740,${HZ - 120} L740,${HZ} L-20,${HZ}Z" fill="#dfe3e6"/><path d="M-20,${HZ - 110} Q360,${HZ - 156} 740,${HZ - 110} L740,${HZ - 4} L-20,${HZ - 4}Z" fill="#4a6a88"/>` +
    Array.from({ length: 24 }, (_, i) => `<path d="M${-20 + i * 33},${HZ - 4} V${(HZ - 110 - 46 * Math.sin(Math.PI * (i * 33) / 760)).toFixed(1)}" stroke="#c8ced4" stroke-width="3"/>`).join('') +
    `<path d="M-20,${HZ - 110} Q360,${HZ - 156} 740,${HZ - 110} L740,${HZ - 60} Q360,${HZ - 100} -20,${HZ - 60}Z" fill="#fff" opacity=".14"/><rect x="-20" y="${HZ - 10}" width="760" height="10" fill="#8a8e94"/>`;
  // the jet bridges
  [[150, 1], [470, 1]].forEach(([x]) => { s += `<path d="M${x},${HZ - 60} L${x + 120},${HZ + 30} L${x + 120},${HZ + 66} L${x},${HZ - 24}Z" fill="#b8bcc2"/><path d="M${x},${HZ - 60} L${x + 120},${HZ + 30}" stroke="#fff" stroke-width="2" opacity=".5"/><path d="M${x + 100},${HZ + 64} v70" stroke="#5a5e66" stroke-width="7"/>`; });
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#apronG)"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${-60 + i * 140},${HZ} L${-260 + i * 200},1300" stroke="#6e6a62" stroke-width="2" opacity=".5"/>`).join('') +
    `<path d="M-20,1150 Q360,1120 740,1160" stroke="#e8c84a" stroke-width="7" fill="none" opacity=".85"/><path d="M-20,${HZ + 70} H740" stroke="#e8c84a" stroke-width="4" opacity=".6"/>`;
  // a far plane at the next gate, the near one at its gate; no engines running
  s += jetOnGround(600, HZ + 100, .48, -1) + jetOnGround(330, 1100, 1.5, 1);
  // a baggage tug and a departures board gone dark
  s += `<g transform="translate(640,1150) scale(.5)"><ellipse cx="0" cy="4" rx="70" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-60" y="-46" width="80" height="34" rx="4" fill="#e8b82a"/><rect x="-10" y="-80" width="40" height="40" rx="4" fill="#d8a81a"/><rect x="-6" y="-76" width="30" height="20" fill="#3a5a7a"/><circle cx="-40" cy="-8" r="13" fill="#1e2026"/><circle cx="10" cy="-8" r="13" fill="#1e2026"/><rect x="30" y="-36" width="70" height="26" rx="3" fill="#8a929c"/><circle cx="80" cy="-6" r="9" fill="#1e2026"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 3a: no pumps: the tap runs dry ----------
function sceneTap(t) {
  const t0 = S0(3) - .2, T = t - t0, flow = 1 - ease(ramp(t, WS(3, 1), WS(3, 3) + .4)), drip = ramp(t, WS(3, 3) + .4, WS(3, 6) + 1), CT = 820;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${CT + 20}" fill="url(#tileW)"/>`;
  for (let r = 0; r < 12; r++) s += `<path d="M-20,${300 + r * 46} H740" stroke="#a8b0a4" stroke-width="2"/>`;
  for (let c = 0; c < 14; c++) for (let r = 0; r < 12; r++) s += `<path d="M${(r % 2 ? 26 : 0) + c * 52},${300 + r * 46} v46" stroke="#a8b0a4" stroke-width="2"/>`;
  s += `<rect x="-20" y="280" width="760" height="${CT - 280}" fill="#fff" filter="url(#wallI)" opacity=".18"/>`;
  // the window: a sunny street outside, pipes on the wall
  s += `<rect x="30" y="380" width="250" height="300" fill="#e8e4d8"/><rect x="42" y="392" width="226" height="276" fill="url(#dSky)"/>` + `<g transform="translate(42,392) scale(.31)">${farCity(91, 860, '#9aa8b4')}</g>` +
    `<rect x="42" y="600" width="226" height="68" fill="#a8b4a8"/><path d="M155,392 V668 M42,530 H268" stroke="#e8e4d8" stroke-width="10"/><rect x="24" y="676" width="262" height="14" fill="#d8d2c4"/><path d="M42,392 L130,392 L42,520Z" fill="#fff" opacity=".18"/>`;
  s += `<path d="M640,280 V${CT}" stroke="url(#chrG)" stroke-width="18"/><path d="M600,280 V${CT}" stroke="#8a929c" stroke-width="10"/><rect x="590" y="560" width="62" height="20" rx="4" fill="#5a626c"/><circle cx="620" cy="570" r="16" fill="#c8382e"/><path d="M609,570 h22" stroke="#fff" stroke-width="4"/>`;
  // the counter and the sink
  s += `<rect x="-20" y="${CT}" width="760" height="40" fill="#5a4a3e"/><rect x="-20" y="${CT}" width="760" height="40" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="${CT}" width="760" height="6" fill="#fff" opacity=".2"/>` +
    `<rect x="-20" y="${CT + 40}" width="760" height="${1300 - CT - 40}" fill="#e8e2d6"/><rect x="-20" y="${CT + 40}" width="760" height="24" fill="url(#aoDn)" opacity=".7"/>` +
    [0, 1, 2].map(i => `<rect x="${10 + i * 240}" y="${CT + 70}" width="220" height="${1300 - CT - 70}" rx="6" fill="#dcd4c6" stroke="#b8ae9c" stroke-width="3"/><rect x="${90 + i * 240}" y="${CT + 100}" width="60" height="10" rx="5" fill="url(#chrG)"/>`).join('');
  s += `<path d="M190,${CT + 4} L550,${CT + 4} L534,${CT + 34} L206,${CT + 34}Z" fill="#8a929c"/><path d="M196,${CT + 6} L544,${CT + 6} L532,${CT + 30} L208,${CT + 30}Z" fill="#3e444c"/><ellipse cx="430" cy="${CT + 26}" rx="14" ry="4" fill="#1a1c20"/>`;
  // the tap: chrome column and spout
  s += `<rect x="290" y="${CT - 18}" width="70" height="20" rx="6" fill="url(#chrG)"/><rect x="306" y="${CT - 230}" width="38" height="216" fill="url(#chrG)"/>` +
    `<path d="M306,${CT - 226} C306,${CT - 300} 330,${CT - 318} 380,${CT - 318} C420,${CT - 318} 444,${CT - 290} 444,${CT - 240} L426,${CT - 240} C426,${CT - 278} 408,${CT - 298} 380,${CT - 298} C344,${CT - 298} 344,${CT - 270} 344,${CT - 226}Z" fill="url(#chrV)"/>` +
    `<rect x="424" y="${CT - 244}" width="22" height="12" rx="3" fill="#5a626c"/><g transform="rotate(${(-28 * ease(ramp(t, WS(3, 3), WS(3, 6)))).toFixed(1)},306,${CT - 196})"><path d="M306,${CT - 200} L278,${CT - 236} L268,${CT - 230} L298,${CT - 186}Z" fill="url(#chrG)"/><circle cx="273" cy="${CT - 234}" r="10" fill="url(#chrV)"/></g>` +
    `<path d="M312,${CT - 228} V${CT - 30}" stroke="#fff" stroke-width="4" opacity=".7"/>`;
  // a glass in the sink: it fills while the water runs, then stops half full
  const lvl = .15 + .45 * clamp((t - t0) / (WS(3, 3) - t0)), gx = 435, gb = CT + 22, gh = 78, wl = gb - 4 - (gh - 8) * lvl;
  s += `<path d="M${gx - 26},${gb - gh} L${gx + 26},${gb - gh} L${gx + 21},${gb} L${gx - 21},${gb}Z" fill="#dff0f8" opacity=".25"/><path d="M${gx - 25 + 5 * (1 - (gb - wl) / gh)},${wl.toFixed(1)} L${gx + 25 - 5 * (1 - (gb - wl) / gh)},${wl.toFixed(1)} L${gx + 21},${gb - 3} L${gx - 21},${gb - 3}Z" fill="#7ac0e8" opacity=".55"/><ellipse cx="${gx}" cy="${wl.toFixed(1)}" rx="23" ry="3" fill="#d8f0ff" opacity=".7"/>` +
    `<path d="M${gx - 26},${gb - gh} L${gx - 21},${gb} M${gx + 26},${gb - gh} L${gx + 21},${gb}" stroke="#fff" stroke-width="2.5" opacity=".7"/><path d="M${gx - 18},${gb - gh + 8} L${gx - 15},${gb - 8}" stroke="#fff" stroke-width="4" opacity=".45"/>`;
  // the water: a stream that thins out, then a few drops, then nothing
  const sx = 435, sy = CT - 232, ey = wl;
  if (flow > .02) { const w = 4 + 12 * flow; s += `<rect x="${(sx - w / 2).toFixed(1)}" y="${sy}" width="${w.toFixed(1)}" height="${(ey - sy).toFixed(1)}" fill="url(#watS)" opacity="${(.5 + .5 * flow).toFixed(2)}"/>` + Array.from({ length: 6 }, (_, i) => { const y = sy + pmod(T * 900 + i * 60, ey - sy); return `<ellipse cx="${sx}" cy="${y.toFixed(1)}" rx="${(w * .4).toFixed(1)}" ry="6" fill="#fff" opacity=".5"/>`; }).join('') + `<ellipse cx="${sx}" cy="${(ey - 1).toFixed(1)}" rx="${(8 + 12 * flow).toFixed(1)}" ry="4" fill="#fff" opacity=".7"/>`; }
  else if (drip < 1) { const ph = pmod(T * 1.6, 1), y = sy + ph * ph * (ey - sy); s += `<ellipse cx="${sx}" cy="${(sy + 2).toFixed(1)}" rx="4" ry="${(4 + 3 * pmod(T * 1.6 + .5, 1)).toFixed(1)}" fill="#cfeaff" opacity="${(.85 * (1 - drip)).toFixed(2)}"/>` + (ph > .08 ? `<ellipse cx="${sx}" cy="${y.toFixed(1)}" rx="3.5" ry="5" fill="#cfeaff" opacity="${(.85 * (1 - drip)).toFixed(2)}"/>` : ''); }
  // inset: the city's water pump stops and the pressure falls to zero
  const pa = ease(ramp(t, t0 + .2, t0 + .6)), pr = 1 - ease(ramp(t, WS(3, 0) + .2, WS(3, 2) + .6)), rot = T < 1 ? T * 900 : 900 + (T - 1) * 900 * pr;
  if (pa > 0) { const cx = 548, cy = 476, Rr = 96;
    s += `<g opacity="${pa.toFixed(2)}"><defs><clipPath id="pmpC"><circle cx="${cx}" cy="${cy}" r="${Rr}"/></clipPath></defs><circle cx="${cx}" cy="${cy}" r="${Rr + 6}" fill="#f4c76b"/><g clip-path="url(#pmpC)"><rect x="${cx - Rr}" y="${cy - Rr}" width="${2 * Rr}" height="${2 * Rr}" fill="#c8ccc8"/><rect x="${cx - Rr}" y="${cy + 46}" width="${2 * Rr}" height="80" fill="#8a8e88"/>` +
      `<path d="M${cx - Rr},${cy + 20} H${cx - 40} M${cx + 40},${cy - 10} H${cx + 74} V${cy - Rr}" stroke="#2a6ab0" stroke-width="22" fill="none"/><path d="M${cx - Rr},${cy + 14} H${cx - 40}" stroke="#fff" stroke-width="4" opacity=".3"/>` +
      `<circle cx="${cx}" cy="${cy + 10}" r="46" fill="#2a6ab0"/><circle cx="${cx}" cy="${cy + 10}" r="46" fill="url(#frG)"/><circle cx="${cx}" cy="${cy + 10}" r="20" fill="#1a3a6a"/>` +
      `<g transform="translate(${cx},${cy + 10}) rotate(${(rot % 360).toFixed(1)})">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M0,0 L14,-4 L16,4Z" fill="#8ab0d8" transform="rotate(${i * 60})"/>`).join('')}</g>` +
      `<rect x="${cx - 40}" y="${cy - 54}" width="80" height="30" rx="5" fill="#5a626c"/><rect x="${cx - 40}" y="${cy - 54}" width="80" height="8" rx="4" fill="#fff" opacity=".2"/></g>` +
      `<g transform="translate(${cx - 60},${cy - 62})"><circle r="30" fill="#f6f2e6" stroke="#3a3e44" stroke-width="5"/><path d="M-20,12 A23,23 0 1 1 20,12" stroke="#c8382e" stroke-width="3" fill="none" stroke-dasharray="4 3"/><path d="M0,0 L${(Math.cos(Math.PI * (1.15 + .7 * pr)) * 22).toFixed(1)},${(Math.sin(Math.PI * (1.15 + .7 * pr)) * 22).toFixed(1)}" stroke="#1a1c20" stroke-width="3" stroke-linecap="round"/><circle r="4" fill="#1a1c20"/></g>` +
      lbl(cx, cy + 86, 'مضخّةُ المياه', 1, '#f6f2e6', 21) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 3b: people go back to the river with buckets ----------
function bucket(x, y, s, full = 1, col = '#5a7a9a') {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><path d="M-16,-8 Q0,-34 16,-8" stroke="#3a3e44" stroke-width="2.4" fill="none"/><path d="M-17,-8 L17,-8 L13,22 L-13,22Z" fill="${col}"/><path d="M-17,-8 L17,-8 L13,22 L-13,22Z" fill="url(#canSh)" opacity=".6"/><ellipse cx="0" cy="-8" rx="17" ry="4" fill="${full ? '#5a8ab0' : '#2a2e34'}"/><ellipse cx="-4" cy="-9" rx="7" ry="1.4" fill="#fff" opacity="${full ? .5 : 0}"/></g>`;
}
function sceneRiver(t) {
  const t0 = WS(3, 7) - .25, T = t - t0, HZ = 690;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#goldS)"/>` + sun3(170, 470, .9) + cumulus(420 + T * 5, 450, 260, 91, { a: .85 }) + cumulus(650 + T * 4, 560, 180, 93, { a: .7 });
  // the city across the river: dead, no smoke, no lights
  s += farCity(97, HZ + 40, '#8a92a0', { hk: 1.25 }) + `<rect x="-20" y="${HZ - 60}" width="760" height="100" fill="#e8d8c0" opacity=".35" filter="url(#blur9)"/>` + `<rect x="-20" y="${HZ + 30}" width="760" height="22" fill="#7a8a6a"/>` + forestR(HZ + 50, 22, 26, 60, 7, '#4a6a3a', { haze: .3, hazeCol: '#d8d0b8' });
  // the river with ripples and the sun's glitter
  s += `<rect x="-20" y="${HZ + 52}" width="760" height="${1300 - HZ - 52}" fill="url(#rivG)"/>` + `<g transform="translate(0,${2 * (HZ + 52)}) scale(1,-1)" opacity=".16">${farCity(97, HZ + 40, '#8a92a0', { hk: 1.25 })}</g>` + `<path d="M150,${HZ + 52} L190,${HZ + 52} L290,1300 L60,1300Z" fill="#fff4d0" opacity=".14"/>`;
  { const r = RS(31); for (let i = 0; i < 70; i++) { const z = r(), y = HZ + 60 + z * z * 380, w = 10 + z * 60, x = pmod(r() * 760 + T * (10 + z * 30), 780) - 30, g = Math.abs(x - 170 - (y - HZ) * .2) < 70;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},-4 ${w.toFixed(1)},0" stroke="${g ? '#fff6d8' : '#d8ecf8'}" stroke-width="${(1.2 + z * 2).toFixed(1)}" fill="none" opacity="${(g ? .7 : .35).toFixed(2)}"/>`; } }
  // the near bank: stone steps down to the water, grass at the top
  const st = [[1300, 0], [1250, 1], [1196, 2], [1150, 3], [1110, 4]];
  s += `<path d="M-20,1010 L740,1060 L740,1300 L-20,1300Z" fill="#9a907e"/><path d="M-20,1010 L740,1060 L740,1300 L-20,1300Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 7; i++) { const y = 1030 + i * 38 + i * i * 2; s += `<path d="M-20,${y} L740,${y + 50}" stroke="#6e6658" stroke-width="3"/><path d="M-20,${y + 3} L740,${y + 53}" stroke="#d8ccb4" stroke-width="2" opacity=".5"/>`; }
  s += `<path d="M-20,1012 L740,1062" stroke="#d8ccb4" stroke-width="4"/><ellipse cx="300" cy="1036" rx="220" ry="10" fill="#1a3a5a" opacity=".35" filter="url(#blur5)"/>`;
  // people: one fills a bucket at the water, two carry water up the steps, one waits with jerrycans
  const k = ease(ramp(t, t0, t0 + 1.4));
  s += hero(250, 1044, Object.assign({ s: .7, face: -1, shade: 1, lean: 24, hF: [192, 1020 + 6 * Math.sin(T * 2)], hB: [204, 992] }, palS(4))) + bucket(192, 1030 + 6 * Math.sin(T * 2), 1.05, 1);
  const wx = 400 + T * 30;
  s += hero(wx, 1130, Object.assign({ s: .8, face: 1, shade: 1, walk: wx / 26, amp: .4, hF: [wx + 20, 1032], hB: [wx - 6, 1036] }, palS(1))) + bucket(HP.hand[0], HP.hand[1] + 24, 1.25, 1, '#c8642a');
  const w2 = 540 + T * 24;
  s += hero(w2, 1206, Object.assign({ s: .86, face: 1, shade: 1, walk: w2 / 26 + 2, amp: .4, hF: [w2 + 22, 1094] }, palS(8))) + bucket(HP.hand[0], HP.hand[1] + 24, 1.3, 1, '#4a7a4a');
  s += hero(84, 1170, Object.assign({ s: .84, face: 1, shade: 1, lookUp: -.05, hF: [104, 1080], hB: [76, 1082] }, palS(5))) + `<g transform="translate(118,1166)"><rect x="-18" y="-60" width="36" height="58" rx="5" fill="#d8b82a"/><rect x="-6" y="-70" width="12" height="12" fill="#a8901a"/><rect x="-18" y="-60" width="36" height="58" rx="5" fill="url(#canSh)" opacity=".6"/></g><g transform="translate(40,1174)"><rect x="-18" y="-60" width="36" height="58" rx="5" fill="#2a6ab0"/><rect x="-6" y="-70" width="12" height="12" fill="#1a4a80"/><rect x="-18" y="-60" width="36" height="58" rx="5" fill="url(#canSh)" opacity=".6"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: no trucks: the shops are empty in three days ----------
const SHELFP = (() => { const r = RS(463), o = []; const X0 = 34, X1 = 686;
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; let x = X0 + 4 + r() * 8;
    while (x < X1 - 50) { const kd = Math.floor(r() * PRODS.length), [c1, c2] = PCOL[Math.floor(r() * PCOL.length)], w = PRODS[kd][1], n = 2 + Math.floor(r() * 4);
      for (let i = 0; i < n && x < X1 - w - 4; i++) { o.push([x, by, kd, c1, c2, r()]); x += w + 3; } x += 7 + r() * 9; } }
  return o; })();
function shelfE(k) {
  const X0 = 34, X1 = 686; let s = `<rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#4e463e"/><rect x="${X0 - 12}" y="404" width="${X1 - X0 + 24}" height="540" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; s += `<rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="96" fill="#3a332c"/><rect x="${X0}" y="${by - 96}" width="${X1 - X0}" height="40" fill="url(#aoDn)" opacity=".8"/>`; }
  SHELFP.forEach(([x, by, kd, c1, c2, rr]) => { if (rr < k * 1.04 - .02) return; const fl = PRODS[kd][0] === 'flat'; s += prod(x, by, kd, c1, c2) + (fl && rr > k * 1.04 + .2 ? prod(x, by - 26, kd, c1, c2) : ''); });
  for (let q = 0; q < 5; q++) { const by = 520 + q * 104; s += `<rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="10" fill="#8c8478"/><rect x="${X0 - 12}" y="${by}" width="${X1 - X0 + 24}" height="3" fill="#fff" opacity=".25"/><rect x="${X0 - 12}" y="${by + 10}" width="${X1 - X0 + 24}" height="6" fill="#000" opacity=".3"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${X0 + 40 + i * 108}" y="${by + 1}" width="34" height="8" fill="#f4eed8"/><path d="M${X0 + 45 + i * 108},${by + 5} h18" stroke="#c8382e" stroke-width="2"/>`).join(''); }
  s += `<rect x="${X0 - 12}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X1}" y="404" width="12" height="540" fill="#6a6258"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="26" fill="#8a3a2a"/><rect x="${X0 - 12}" y="396" width="${X1 - X0 + 24}" height="5" fill="#fff" opacity=".2"/>` +
    `<text x="360" y="416" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#f6f2e4">موادّ غذائيّة</text>`;
  return s;
}
function basket(x, y, s, n) {
  let c = ''; for (let i = 0; i < n; i++) c += prod(-34 + i * 24, -18, [0, 1, 0, 5][i % 4], ...PCOL[(i * 3) % PCOL.length]);
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><g transform="scale(.7)">${c}</g><path d="M-30,-14 L30,-14 L24,18 L-24,18Z" fill="#c8382e" opacity=".9"/><path d="M-30,-14 L30,-14 L24,18 L-24,18Z" fill="url(#canSh)" opacity=".6"/>` + [0, 1, 2, 3].map(i => `<path d="M${-22 + i * 14},-8 v20" stroke="#8a1a12" stroke-width="2"/>`).join('') + `<path d="M-22,-14 Q0,-50 22,-14" stroke="#2a2e34" stroke-width="3" fill="none"/></g>`;
}
function sceneShop(t) {
  const t0 = S0(4) - .2, T = t - t0, FL = 944, k = ease(ramp(t, WS(4, 1), WS(4, 6) + .5)), day = 1 + Math.min(2, Math.floor(ramp(t, WS(4, 2), WS(4, 6) + .2) * 2.999));
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#b8b0a0"/><rect x="-20" y="280" width="760" height="120" fill="#8e877a"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${70 + i * 220}" y="330" width="140" height="16" rx="3" fill="#d2d0c8"/><rect x="${70 + i * 220}" y="342" width="140" height="5" fill="#000" opacity=".3"/>`;
  s += shelfE(k);
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#b4ab98"/>`;
  for (let i = 1; i < 9; i++) { const y = FL + Math.pow(i / 9, 1.7) * (1300 - FL); s += `<path d="M-20,${y.toFixed(1)} H740" stroke="#8c8472" stroke-width="${(1 + i * .25).toFixed(1)}" opacity=".7"/>`; }
  for (let i = -9; i <= 9; i++) s += `<path d="M${360 + i * 46},${FL} L${360 + i * 150},1300" stroke="#8c8472" stroke-width="1.6" opacity=".7"/>`;
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="${FL}" width="760" height="60" fill="url(#aoDn)" opacity=".8"/>`;
  // things dropped on the floor as the shelves empty
  [[120, 1010, 0, 1], [210, 1060, 3, 4], [470, 1000, 5, 2], [640, 1080, 1, 6]].forEach(([x, y, kd, ci], i) => { const a = ease(ramp(t, WS(4, 3) + i * .3, WS(4, 3) + i * .3 + .3)); if (a > 0) s += `<g opacity="${a.toFixed(2)}" transform="rotate(${[-70, 15, 80, -12][i]},${x},${y})">${prod(x, y, kd, ...PCOL[ci])}</g>`; });
  // two shoppers grab the last things
  const ax = lerp(760, 470, ease(ramp(t, t0, WS(4, 3)))), wkA = t < WS(4, 3);
  const A = { s: .9, face: -1, shade: 1, walk: wkA ? ax / 30 : null }; if (!wkA) { const u = .5 + .5 * Math.sin((t - WS(4, 3)) * 5); A.hF = [ax - 70, 830 + 60 * u]; A.hB = [ax - 30, 1040]; A.lookUp = .15; }
  s += hero(ax, 1170, Object.assign(A, palS(7))); if (!wkA) s += basket(ax - 30, 1056, 1, 3);
  const bx = 150 + ease(ramp(t, t0 + .6, WS(4, 4))) * 30;
  s += trolley(bx + 110, 1236, .9) + hero(bx, 1226, Object.assign({ s: .95, face: 1, shade: 1, hF: [bx + 200, 1076], hB: [bx + 196, 1080], lean: 4 }, palS(2)));
  // dim: no ceiling lights, only the window light
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a2238" opacity=".22" style="mix-blend-mode:multiply"/>` + scr(`<path d="M-60,330 L420,470 L760,1300 L-60,1300Z" fill="url(#winLt)" opacity=".55" filter="url(#soft)"/>`);
  // the day counter
  const da = ease(ramp(t, WS(4, 2) - .2, WS(4, 2) + .2)), pop = 1 + .25 * Math.exp(-pmod((t - WS(4, 2)) * 1.5, 1) * 6) * (da > 0 ? 1 : 0);
  if (da > 0) s += `<g opacity="${da.toFixed(2)}">${panel(500, 1050, 190, 110, 1)}${lbl(595, 1092, 'اليوم', 1, '#c8d0dc', 26)}<text x="595" y="1146" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${(52 * pop).toFixed(1)}" fill="${day === 3 ? '#ff7a5a' : '#f4c76b'}">${AR(day)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ===================== "what if GTA 6 ran on every phone?" (Short #49) =====================
// The game on the screens is a generic drawn open-world city drive (no logos, no characters, no copied art).
const GDEF = `<linearGradient id="gSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a6a"/><stop offset=".45" stop-color="#e86a7a"/><stop offset=".8" stop-color="#ffb070"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient>` +
  `<linearGradient id="gRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a52"/><stop offset="1" stop-color="#1e1a24"/></linearGradient>` +
  `<linearGradient id="carR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a6a"/><stop offset=".55" stop-color="#c81e3a"/><stop offset="1" stop-color="#5a0a1a"/></linearGradient>` +
  `<radialGradient id="scrGlow"><stop offset="0" stop-color="#ffb08a" stop-opacity=".55"/><stop offset="1" stop-color="#ff8a6a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="phB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3e46"/><stop offset=".5" stop-color="#14161a"/><stop offset="1" stop-color="#2a2e34"/></linearGradient>` +
  `<linearGradient id="techBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c1430"/><stop offset="1" stop-color="#1a1036"/></linearGradient>` +
  `<radialGradient id="hotG"><stop offset="0" stop-color="#ff5a2a" stop-opacity=".75"/><stop offset=".5" stop-color="#ff7a3a" stop-opacity=".3"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="wallR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8b8a4"/><stop offset="1" stop-color="#a89880"/></linearGradient>`;
const GDEFS = () => `${TDEFS()}${GDEF}`;

// ---------- the game seen on a screen: a sports car speeding down a sunset avenue ----------
function gameView(x, y, w, h, t, id, o = {}) {
  const sp = o.sp ?? 1, ph = t * 2.2 * sp, hz = h * .46, vx = w * .5;
  let s = `<defs><clipPath id="gv${id}"><rect x="0" y="0" width="${w}" height="${h}" rx="${o.rx ?? 6}"/></clipPath></defs><g transform="translate(${x.toFixed(1)},${y.toFixed(1)})" clip-path="url(#gv${id})">`;
  s += `<rect width="${w}" height="${h}" fill="url(#gSky)"/><circle cx="${w * .72}" cy="${hz - h * .08}" r="${h * .1}" fill="#ffe2a8" opacity=".9"/>`;
  // skyline, sliding slowly
  const r = RS(91); let sk = ''; for (let i = 0; i < 18; i++) { const bw = w * (.05 + r() * .06), bh = h * (.1 + r() * .32), bx = pmod(i * w * .085 - t * 6 * sp, w * 1.5) - w * .2; sk += `<rect x="${bx.toFixed(1)}" y="${(hz - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" fill="${['#3a2a52', '#4a3462', '#2e2446'][i % 3]}"/>` + (r() > .4 ? `<rect x="${(bx + bw * .2).toFixed(1)}" y="${(hz - bh * .8).toFixed(1)}" width="${(bw * .6).toFixed(1)}" height="${(bh * .08).toFixed(1)}" fill="${['#ff4ab0', '#3ae8e0', '#ffd84a'][i % 3]}" opacity=".8"/>` : ''); }
  s += sk;
  // the road in perspective with moving dashes and side lights
  s += `<path d="M${vx - w * .02},${hz} L${vx + w * .02},${hz} L${w * 1.1},${h} L${-w * .1},${h}Z" fill="url(#gRoad)"/>`;
  for (let i = 0; i < 7; i++) { const z = pmod(i / 7 + ph * .25, 1), y0 = hz + (h - hz) * z * z, y1 = hz + (h - hz) * Math.min(1, (z + .06) * (z + .06)), ww = .006 * w + .02 * w * z; s += `<path d="M${(vx - ww / 2).toFixed(1)},${y0.toFixed(1)} L${(vx + ww / 2).toFixed(1)},${y0.toFixed(1)} L${(vx + ww).toFixed(1)},${y1.toFixed(1)} L${(vx - ww).toFixed(1)},${y1.toFixed(1)}Z" fill="#ffe8a0" opacity=".85"/>`;
    [-1, 1].forEach(sd => { const lx = vx + sd * (w * .03 + w * .6 * z), ly = hz + (h - hz) * z * z - h * .3 * z; s += `<path d="M${lx.toFixed(1)},${(hz + (h - hz) * z * z).toFixed(1)} V${ly.toFixed(1)}" stroke="#2a2232" stroke-width="${(1 + 3 * z).toFixed(1)}"/><circle cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="${(1 + 4 * z).toFixed(1)}" fill="#ffe2b0"/>`; }); }
  // an oncoming car far ahead and our car from behind, swaying in the lane
  const fz = pmod(ph * .18, 1), fy = hz + (h - hz) * fz * fz * .5, fsc = .2 + .5 * fz;
  s += `<rect x="${(vx + w * .06 * fz - w * .04 * fsc).toFixed(1)}" y="${(fy - h * .05 * fsc).toFixed(1)}" width="${(w * .08 * fsc).toFixed(1)}" height="${(h * .05 * fsc).toFixed(1)}" rx="2" fill="#3a6ab0"/><circle cx="${(vx + w * .06 * fz - w * .025 * fsc).toFixed(1)}" cy="${(fy - h * .02 * fsc).toFixed(1)}" r="${(1.5 + 3 * fsc).toFixed(1)}" fill="#fff8d8"/>`;
  const cx = vx + Math.sin(t * 1.3 * sp) * w * .06, cy = h * .82, cw = w * .26, chh = h * .2, tilt = Math.cos(t * 1.3 * sp) * 3;
  s += `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${tilt.toFixed(1)})"><ellipse cx="0" cy="${chh * .55}" rx="${cw * .6}" ry="${chh * .12}" fill="#000" opacity=".45"/>` +
    `<path d="M${-cw * .5},${chh * .45} L${-cw * .46},${-chh * .05} L${-cw * .3},${-chh * .45} L${cw * .3},${-chh * .45} L${cw * .46},${-chh * .05} L${cw * .5},${chh * .45}Z" fill="url(#carR)"/>` +
    `<path d="M${-cw * .26},${-chh * .4} L${cw * .26},${-chh * .4} L${cw * .34},${-chh * .08} L${-cw * .34},${-chh * .08}Z" fill="#1a2030" opacity=".9"/><path d="M${-cw * .2},${-chh * .38} L${-cw * .05},${-chh * .38} L${-cw * .2},${-chh * .12}Z" fill="#fff" opacity=".25"/>` +
    `<rect x="${-cw * .46}" y="${chh * .02}" width="${cw * .22}" height="${chh * .1}" rx="2" fill="#ff2a3a"/><rect x="${cw * .24}" y="${chh * .02}" width="${cw * .22}" height="${chh * .1}" rx="2" fill="#ff2a3a"/><rect x="${-cw * .5}" y="${chh * .32}" width="${cw}" height="${chh * .13}" fill="#1a1a1e"/>` +
    `<rect x="${-cw * .5}" y="${chh * .35}" width="${cw * .14}" height="${chh * .22}" rx="3" fill="#0e0e10"/><rect x="${cw * .36}" y="${chh * .35}" width="${cw * .14}" height="${chh * .22}" rx="3" fill="#0e0e10"/>` +
    `<circle cx="${-cw * .35}" cy="${chh * .07}" r="${chh * .18}" fill="#ff3a3a" opacity=".25" filter="url(#blur2)"/><circle cx="${cw * .35}" cy="${chh * .07}" r="${chh * .18}" fill="#ff3a3a" opacity=".25" filter="url(#blur2)"/></g>`;
  // speed lines and a simple HUD: minimap, speed
  for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + 1, k = pmod(ph * .7 + i * .37, 1); s += `<path d="M${(vx + Math.cos(a) * w * (.2 + .3 * k)).toFixed(1)},${(hz + Math.sin(a) * h * (.2 + .3 * k)).toFixed(1)} l${(Math.cos(a) * w * .06).toFixed(1)},${(Math.sin(a) * h * .06).toFixed(1)}" stroke="#fff" stroke-width="1.5" opacity="${(.35 * k).toFixed(2)}"/>`; }
  s += `<circle cx="${h * .17}" cy="${h * .8}" r="${h * .13}" fill="#1a2a3a" opacity=".8" stroke="#fff" stroke-width="1.5"/><path d="M${h * .1},${h * .86} l${h * .06},${-h * .1} l${h * .05},${h * .06}" stroke="#ffd84a" stroke-width="2" fill="none"/><circle cx="${h * .17}" cy="${h * .8}" r="2.5" fill="#fff"/>` +
    `<text x="${w - h * .1}" y="${h * .9}" text-anchor="end" font-family="Inter" font-weight="800" font-size="${(h * .11).toFixed(1)}" fill="#fff" opacity=".9">${Math.round(160 + 20 * Math.sin(t * .9))}</text>`;
  return s + `</g>`;
}
// a phone in landscape with the game on it
function phoneL(x, y, w, h, t, id, o = {}) {
  const b = Math.max(4, h * .07);
  return `<g transform="rotate(${(o.rot || 0).toFixed(1)},${x + w / 2},${y + h / 2})">` + (o.glow === 0 ? '' : `<ellipse cx="${x + w / 2}" cy="${y + h / 2}" rx="${w * .8}" ry="${h * .9}" fill="url(#scrGlow)" opacity="${(o.glow ?? .7).toFixed(2)}"/>`) +
    `<rect x="${x - b}" y="${y - b}" width="${w + 2 * b}" height="${h + 2 * b}" rx="${b * 2.4}" fill="url(#phB)"/>` + (o.off ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${b}" fill="#0c0e12"/>` : gameView(x, y, w, h, t, id, { rx: b })) +
    `<path d="M${x},${y + h} L${x + w * .45},${y} L${x + w * .6},${y} L${x + w * .15},${y + h}Z" fill="#fff" opacity=".06"/></g>`;
}
// a person playing with the phone held sideways in both hands; returns svg (sets HP)
function player(x, y, s, f, pi, t, o = {}) {
  const px = x + f * s * 46, py = y - s * (o.sit ? 150 : 214), bob = Math.sin(t * 2.3 + x) * 1.5;
  const base = o.sit ? { lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1 } : {};
  let g = hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: -.32, hF: [px + f * s * 16, py + bob], hB: [px - f * s * 14, py + 2 + bob] }, base, palS(pi), o.h || {}));
  const w = 44 * s, h = 22 * s;
  g += `<g transform="translate(${px.toFixed(1)},${(py + bob - 4 * s).toFixed(1)}) rotate(${(f * -12).toFixed(1)})"><rect x="${-w / 2 - 2}" y="${-h / 2 - 2}" width="${w + 4}" height="${h + 4}" rx="4" fill="#15171c"/>` + (o.off ? '' : gameView(-w / 2, -h / 2, w, h, t, 'p' + pi + Math.round(x), { rx: 2 })) + `</g>` +
    (o.off ? '' : `<ellipse cx="${(HP.head[0] + f * 8).toFixed(1)}" cy="${(HP.head[1] + 6).toFixed(1)}" rx="${(24 * s).toFixed(1)}" ry="${(28 * s).toFixed(1)}" fill="#ff9a7a" opacity=".14" filter="url(#blur5)"/>`);
  return g;
}

// ---------- 0a: everyone plays it, everywhere: the street ----------
function sceneHook(t) {
  const y0 = PV + 78;
  const top = player(96, y0 + 4, .78, 1, 3, t) + player(300, y0 - 4, .74, -1, 6, t) + player(470, y0 + 10, .8, 1, 1, t) + player(640, y0, .76, -1, 8, t);
  let s = `<defs>${GDEFS()}</defs>` + street10(t, { N: 0, id: 'hk', cars: 0, overcast: 1, back: sun3(600, 470), top, ground: car(400, 1250, .9, '#2a5a8a', 1, 0) });
  // the big screen: what they are all playing
  const k = ease(ramp(t, .1, .6));
  s += `<g opacity="${k.toFixed(2)}" transform="translate(360,560) scale(${(.9 + .1 * k).toFixed(3)}) translate(-360,-560)">${phoneL(110, 450, 500, 236, t, 'big', { glow: .5 })}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 0b: on the bus ----------
function sceneBus(t) {
  const t0 = WS(0, 16) - .2, T = t - t0;
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#d8d2c4"/>`;
  // windows with the city sliding past
  s += `<rect x="-20" y="420" width="760" height="300" fill="#8ab4d8"/>` + `<g transform="translate(${(-pmod(T * 260, 400)).toFixed(1)},0)">${farCity(41, 720, '#6a7a8a', { hk: 1.2 })}<g transform="translate(400,0)">${farCity(41, 720, '#6a7a8a', { hk: 1.2 })}</g></g>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${-20 + i * 190}" y="410" width="22" height="320" fill="#b8b2a4"/>`;
  s += `<rect x="-20" y="400" width="760" height="20" fill="#a8a294"/><rect x="-20" y="720" width="760" height="40" fill="#a8a294"/><path d="M-20,360 H740" stroke="#c8ccd2" stroke-width="10"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${30 + i * 130},360 v40" stroke="#c8ccd2" stroke-width="3"/><ellipse cx="${30 + i * 130}" cy="408" rx="10" ry="12" fill="none" stroke="#e8e4dc" stroke-width="4"/>`).join('');
  // seats and seated players
  s += `<rect x="-20" y="1180" width="760" height="140" fill="#5a5e66"/>`;
  [[110, 3], [340, 7], [570, 2]].forEach(([x, pi], i) => { s += `<rect x="${x - 64}" y="900" width="28" height="220" rx="10" fill="#2a5a8a"/><rect x="${x - 64}" y="1104" width="130" height="30" rx="10" fill="#2a5a8a"/><rect x="${x - 64}" y="1104" width="130" height="8" rx="4" fill="#fff" opacity=".15"/><path d="M${x - 50},1134 V1180 M${x + 50},1134 V1180" stroke="#3a3e46" stroke-width="6"/>` + player(x, 1170, .82, 1, pi, t, { sit: 1 }); });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity=".08"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 0c: in the café ----------
function sceneCafe(t) {
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#wallR)"/><rect x="-20" y="-20" width="760" height="1320" fill="#fff" filter="url(#wallI)" opacity=".2"/>`;
  s += `<rect x="60" y="420" width="600" height="280" fill="#3a2a22"/><rect x="72" y="432" width="576" height="256" fill="#8ab4d8"/><g transform="translate(72,432) scale(.8)">${farCity(53, 320, '#6a7a8a', { hk: 1 })}</g><rect x="72" y="640" width="576" height="48" fill="#9aa49a"/><path d="M360,432 V688" stroke="#3a2a22" stroke-width="10"/>` + [0, 1, 2].map(i => `<circle cx="${180 + i * 180}" cy="380" r="18" fill="#ffe0a0" opacity=".9"/><path d="M${180 + i * 180},300 V362" stroke="#2a2a2a" stroke-width="2"/>`).join('');
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#8a6a4a"/>`;
  [[200, 4], [520, 9]].forEach(([x, pi], i) => { s += chair(x, 1180, .9, i ? -1 : 1) + player(x, 1180, .9, i ? -1 : 1, pi, t, { sit: 1 }); });
  s += `<rect x="250" y="1010" width="220" height="16" rx="4" fill="#5a3a24"/><path d="M360,1026 V1180" stroke="#3a2a1a" stroke-width="10"/><path d="M300,1010 h22 v-20 h-22Z M400,1010 h22 v-20 h-22Z" fill="#f2efe8"/><path d="M308,980 q4,-10 0,-18 M410,980 q4,-10 0,-18" stroke="#fff" stroke-width="2" opacity=".6" fill="none"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 1: it comes out on 19 November, on PlayStation and Xbox only ----------
function consoleBox(x, y, s, kind) {   // generic consoles: a tall white tower, a black box (no logos)
  if (kind === 0) return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="40" ry="6" fill="#000" opacity=".3" filter="url(#blur2)"/><path d="M-30,0 C-36,-120 -30,-230 -16,-260 L16,-260 C30,-230 36,-120 30,0Z" fill="#f2f2f0"/><rect x="-10" y="-262" width="20" height="262" fill="#14161a"/><path d="M-30,0 C-36,-120 -30,-230 -16,-260 L-10,-260 L-10,0Z" fill="#000" opacity=".08"/><circle cx="0" cy="-120" r="2.5" fill="#6ab0ff"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="46" ry="6" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-38" y="-200" width="76" height="200" rx="6" fill="#1a1c20"/><rect x="-38" y="-200" width="76" height="16" fill="#2a2e34"/><circle cx="0" cy="-192" r="22" fill="#14161a"/><circle cx="0" cy="-192" r="18" fill="#2a8a4a" opacity=".5"/><rect x="-38" y="-200" width="20" height="200" fill="#fff" opacity=".05"/></g>`;
}
function sceneConsole(t) {
  const t0 = S0(1) - .2, T = t - t0, FL = 1000, ca = ease(ramp(t, WS(1, 3) - .2, WS(1, 3) + .3)), oa = ease(ramp(t, WS(1, 8) - .2, WS(1, 8) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#3a3a52"/><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#fff" filter="url(#wallI)" opacity=".12"/>`;
  // the TV with the game
  s += `<rect x="120" y="500" width="480" height="285" rx="10" fill="#0e0f12"/>` + gameView(132, 512, 456, 261, t, 'tv', { rx: 4 }) + `<rect x="330" y="785" width="60" height="30" fill="#1a1c20"/><ellipse cx="360" cy="460" rx="420" ry="200" fill="url(#scrGlow)" opacity=".25"/>`;
  s += `<rect x="40" y="815" width="640" height="70" rx="6" fill="#5a3a2a"/><rect x="40" y="815" width="640" height="10" fill="#fff" opacity=".12"/>`;
  s += consoleBox(78, 815, .5, 0) + consoleBox(648, 815, .48, 1);
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#6a5a4a"/><rect x="-20" y="${FL}" width="760" height="40" fill="url(#aoDn)" opacity=".6"/>`;
  // a player on the sofa with a controller
  s += `<rect x="120" y="1040" width="480" height="160" rx="30" fill="#7a3a3a"/><rect x="100" y="980" width="520" height="90" rx="30" fill="#8a4444"/>`;
  s += hero(360, 1210, Object.assign({ s: .95, face: -1, shade: 1, lF: [1.5708, .02], lB: [1.45, -.05], noShadow: 1, lookUp: .05, hF: [300, 1080], hB: [316, 1086] }, palS(5))) + `<path d="M276,1072 q20,-12 44,0 q8,14 -4,20 h-36 q-12,-6 -4,-20Z" fill="#1a1c20"/>`;
  // the date and "only on"
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}" transform="translate(560,600) rotate(4)"><rect x="-70" y="-90" width="140" height="160" rx="10" fill="#f6f2e6"/><rect x="-70" y="-90" width="140" height="44" rx="10" fill="#c8382e"/>${lbl(0, -58, 'نوفمبر', 1, '#fff', 26)}<text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="74" fill="#2a2e34">${AR(19)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: more than 200 GB, while many phones have 128 GB ----------
function bigPhone(x, y, w, h, inner) {   // a portrait phone, screen content passed in (local coords 0..w, 0..h)
  return `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="46" fill="url(#phB)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="#0e1018"/><g transform="translate(${x},${y})">${inner}</g><rect x="${x + w / 2 - 40}" y="${y + 10}" width="80" height="22" rx="11" fill="#000"/><path d="M${x},${y + h * .6} L${x + w * .7},${y} L${x + w * .85},${y} L${x},${y + h * .75}Z" fill="#fff" opacity=".05"/>`;
}
function sceneStorage(t) {
  const t0 = S0(2) - .2, T = t - t0, g = ease(ramp(t, WS(2, 1), WS(2, 4) + .3)), pa = ease(ramp(t, WS(2, 7), WS(2, 12))), warn = ease(ramp(t, WS(2, 12), WS(2, 13) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  const W = 420, H = 760, X = 150, Y = 420;
  let in1 = `<rect x="0" y="0" width="${W}" height="${H}" rx="34" fill="#141826"/>` + lbl(W / 2, 90, 'التخزين', 1, '#fff', 34);
  // the phone's storage bar and the game's size bar
  const bw = W - 80, phoneG = 128, gameG = 210, sc = bw / 128;
  in1 += lbl(W - 40, 170, 'مساحةُ الهاتف: ١٢٨ غيغابايت', pa, '#aab4c4', 22, 'start') + `<rect x="40" y="186" width="${bw}" height="34" rx="17" fill="#2a3044" opacity="${pa.toFixed(2)}"/>`;
  const gw = gameG * sc * g; in1 += lbl(W - 40, 290, 'اللعبة: أكثرُ من ٢٠٠ غيغابايت', g, '#ffd86a', 22, 'start') + `<rect x="${(40 + bw - Math.min(gw, bw)).toFixed(1)}" y="306" width="${Math.min(gw, bw).toFixed(1)}" height="34" rx="17" fill="#f4c76b" opacity="${g.toFixed(2)}"/>`;
  if (gw > bw) in1 += `<rect x="${(40 + bw - gw).toFixed(1)}" y="306" width="${(gw - bw).toFixed(1)}" height="34" rx="0" fill="#e8584a"/>`;
  in1 += `<g opacity="${warn.toFixed(2)}"><rect x="30" y="420" width="${W - 60}" height="160" rx="22" fill="#2a1418" stroke="#e8584a" stroke-width="3"/><circle cx="${W / 2}" cy="470" r="22" fill="#e8584a"/><path d="M${W / 2},456 v18 M${W / 2},480 v2" stroke="#fff" stroke-width="5" stroke-linecap="round"/>${lbl(W / 2, 540, 'لا توجدُ مساحةٌ كافية', 1, '#fff', 28)}</g>`;
  s += `<g transform="translate(0,${(10 * Math.sin(T * .8)).toFixed(1)})">` + bigPhone(X, Y, W, H, in1) + `</g>`;
  // the overflowing part spills past the phone's edge
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: the console's graphics chip is several times stronger than the best phones ----------
function chipDie(cx, cy, S, col, lab, a) {
  if (a <= 0) return ''; let p = ''; for (let i = 0; i < 8; i++) { const q = -S / 2 + S * (i + .5) / 8; p += `<path d="M${q},${-S / 2 - 12} v12 M${q},${S / 2} v12 M${-S / 2 - 12},${q} h12 M${S / 2},${q} h12" stroke="#c8a24a" stroke-width="3"/>`; }
  let g = ''; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) g += `<rect x="${-S * .38 + i * S * .13}" y="${-S * .38 + j * S * .13}" width="${S * .1}" height="${S * .1}" fill="${col}" opacity="${(.35 + .4 * ((i * 7 + j * 3) % 5) / 5).toFixed(2)}"/>`;
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy})">${p}<rect x="${-S / 2}" y="${-S / 2}" width="${S}" height="${S}" rx="6" fill="#2a2e38"/>${g}<rect x="${-S / 2}" y="${-S / 2}" width="${S}" height="${S}" rx="6" fill="none" stroke="#5a6070" stroke-width="2"/>${lbl(0, S / 2 + 50, lab, 1, '#fff', 26)}</g>`;
}
function sceneGpu(t) {
  const t0 = S0(3) - .2, a1 = ease(ramp(t, t0 + .2, t0 + .7)), a2 = ease(ramp(t, WS(3, 8) - .3, WS(3, 9))), b = ease(ramp(t, WS(3, 5), WS(3, 7) + .4));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  { const r = RS(201); for (let i = 0; i < 40; i++) { const y = 420 + r() * 860; s += `<path d="M${(r() * 720).toFixed(0)},${y.toFixed(0)} h${(40 + r() * 120).toFixed(0)} v${(r() > .5 ? 30 : -30)}" stroke="#3a4a7a" stroke-width="2" fill="none" opacity=".4"/>`; } }
  s += chipDie(220, 560, 200, '#6a9aff', 'بلايستيشن ٥', a1) + chipDie(540, 600, 110, '#6affc8', 'أقوى هاتف', a2);
  // bars: about 10 TFLOPS vs about 2-3
  const bx = 90, bw = 540;
  s += `<g opacity="${a1.toFixed(2)}">${panel(60, 900, 600, 280, 1)}${lbl(630, 950, 'قوّةُ الرسوم (تيرافلوبس)', 1, '#c8d4e8', 24, 'start')}<rect x="${bx + bw - bw * b}" y="990" width="${bw * b}" height="44" rx="10" fill="#6a9aff"/>${lbl(bx + bw - 10, 1022, '≈ ١٠', b, '#0c1430', 26, 'start')}</g>`;
  s += `<g opacity="${a2.toFixed(2)}"><rect x="${bx + bw - bw * .28 * a2}" y="1070" width="${bw * .28 * a2}" height="44" rx="10" fill="#6affc8"/>${lbl(bx + bw - bw * .28 - 14, 1102, '≈ ٢ إلى ٣', 1, '#6affc8', 26, 'start')}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: the phone heats up fast and slows itself down to protect its parts ----------
function sceneHeat(t) {
  const t0 = S0(4) - .2, T = t - t0, h = ease(ramp(t, WS(4, 3), WS(4, 6) + .4)), sl = ease(ramp(t, WS(4, 6), WS(4, 9) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // close-up: the phone in two hands, the game stuttering as it slows down
  const fs = 1 - .7 * sl, tt = sl > .5 ? Math.floor(t * 8) / 8 : t;
  s += `<ellipse cx="360" cy="660" rx="${(260 + 60 * h).toFixed(1)}" ry="${(200 + 50 * h).toFixed(1)}" fill="url(#hotG)" opacity="${(h * .9).toFixed(2)}"/>`;
  s += `<g transform="translate(${(Math.sin(t * 40) * 2 * h).toFixed(1)},0)">${phoneL(100, 530, 520, 246, tt, 'heat', { sp: fs, glow: .3 })}</g>`;
  // heat shimmer over the phone
  for (let i = 0; i < 6; i++) { const x = 160 + i * 80, ph = pmod(T * .8 + i * .17, 1); s += `<path d="M${x},${(520 - ph * 160).toFixed(1)} q12,-20 0,-40 q-12,-20 0,-40" stroke="#ff9a6a" stroke-width="4" fill="none" opacity="${(h * .5 * Math.sin(ph * Math.PI)).toFixed(2)}" filter="url(#blur2)"/>`; }
  // the thermometer and the frame rate
  const temp = Math.round(lerp(34, 47, h)), fps = Math.round(lerp(30, 12, sl));
  s += `<g opacity="${ease(ramp(t, t0 + .3, t0 + .8)).toFixed(2)}">${panel(70, 1010, 270, 170, 1)}${lbl(205, 1060, 'الحرارة', 1, '#c8d4e8', 24)}<text x="205" y="1140" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="${mix('#ffffff', '#ff5a3a', h)}">${AR(temp)}°</text>` +
    `${panel(380, 1010, 270, 170, 1)}${lbl(515, 1060, 'الإطارات/ثانية', 1, '#c8d4e8', 24)}<text x="515" y="1140" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="${mix('#6affc8', '#ff5a3a', sl)}">${AR(fps)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: the console draws about 200 W while playing; at that power a phone battery empties in about six minutes ----------
function battery(cx, cy, k, a) {
  const w = 300, h = 140, c = k > .5 ? '#4ad87a' : k > .2 ? '#f4c74a' : '#e8584a';
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="20" fill="none" stroke="#e8eef6" stroke-width="10"/><rect x="${w / 2 + 4}" y="-28" width="18" height="56" rx="6" fill="#e8eef6"/><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${((w - 28) * k).toFixed(1)}" height="${h - 28}" rx="10" fill="${c}"/>${lbl(0, 18, AR(Math.round(k * 100)) + '٪', 1, '#fff', 48)}</g>`;
}
function sceneBattery(t) {
  const t0 = S0(5) - .2, a1 = ease(ramp(t, t0 + .2, t0 + .7)), a2 = ease(ramp(t, WS(5, 7) - .3, WS(5, 7) + .2)), dr = ease(ramp(t, WS(5, 9), WS(5, 15) + .3)), m = dr * 6;
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // the console with its power cord and a meter reading 200 W
  s += `<g opacity="${(a1 * (1 - .65 * a2)).toFixed(2)}">${consoleBox(220, 760, 1, 0)}<path d="M240,750 C300,760 330,800 360,800 C420,800 440,740 520,740" stroke="#2a2e34" stroke-width="7" fill="none"/>${panel(470, 630, 200, 120, 1)}<text x="570" y="712" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="56" fill="#f4c76b">${AR(200)}</text>${lbl(570, 735, 'واط', 1, '#c8d4e8', 20)}</g>`;
  // the phone battery draining while a timer runs to six minutes
  s += battery(360, 980, 1 - dr, a2);
  const tm = `${AR(Math.floor(m))}:${AR(String(Math.floor((m % 1) * 60)).padStart(2, '0'))}`;
  s += `<g opacity="${a2.toFixed(2)}">${lbl(360, 1130, 'بطاريةُ هاتف (~٢٠ واط·ساعة)', 1, '#aab4c4', 22)}<text x="360" y="1220" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="62" fill="#fff">${tm}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: if millions download it at once, the world's networks jam ----------
const NETP = [[0, 3], [1, 5], [2, 7], [3, 9], [4, 10], [5, 0], [6, 2], [7, 11], [8, 1], [9, 4], [10, 6], [11, 8], [0, 7], [2, 9], [5, 11]];
function sceneNet(t) {
  const t0 = S0(6) - .2, T = t - t0, jam = ease(ramp(t, WS(6, 4) - .2, WS(6, 6)));
  const G = gW(t, { d: 8.6, el: .25, lon: 35 + T * 3, clouds: .25, lights: 1.4, off: 2.6 });
  let o = `<defs>${GDEFS()}</defs>`;
  NETP.forEach(([a, b], i) => { const A = CITIES[a % CITIES.length], B = CITIES[b % CITIES.length]; if (!A || !B) return;
    const pts = []; for (let k = 0; k <= 12; k++) { const f = k / 12; pts.push([lerp(A[0], B[0], f) + Math.sin(f * Math.PI) * 8, lerp(A[1], B[1], f)]); }
    const P = gPath(G, pts); if (!P.d) return; const col = mix('#5ad8ff', '#ff4a3a', jam);
    o += `<path d="${P.d}" stroke="${col}" stroke-width="${(2 + 2.5 * jam).toFixed(1)}" fill="none" opacity="${(.55 + .35 * jam).toFixed(2)}" stroke-dasharray="${jam > .5 ? '3 3' : '10 8'}" stroke-dashoffset="${(-(T * (60 - 50 * jam)) - i * 7).toFixed(1)}" filter="url(#blur2)"/>` +
      `<path d="${P.d}" stroke="#fff" stroke-width="1.2" fill="none" opacity="${(.6 * (1 - jam) + .2).toFixed(2)}" stroke-dasharray="4 14" stroke-dashoffset="${(-(T * (80 - 70 * jam)) - i * 5).toFixed(1)}"/>`; });
  // download arrows piling up over the cities
  CITIES.slice(0, 12).forEach(([la, lo], i) => { const v = G.vis(la, lo); if (v < .2) return; const [x, y] = G.P(la, lo, 1.01), k = pmod(T * .9 + i * .23, 1);
    o += `<g opacity="${(Math.min(1, (v - .2) * 4) * (1 - k) * (.4 + .6 * jam)).toFixed(2)}"><path d="M${x},${(y - 40 + 30 * k).toFixed(1)} v14 m-6,-6 l6,6 l6,-6" stroke="${mix('#ffffff', '#ff6a5a', jam)}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`; });
  F.ov = o; return space(t);
}

// ---------- 7: cloud gaming: the game runs on a distant computer and the phone only receives the picture ----------
function rack(x, y, w, h, t, seed) {
  const r = RS(seed); let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#16181e"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="#3a3e48" stroke-width="2"/>`;
  for (let i = 0; i < Math.floor(h / 22); i++) { const yy = y + 8 + i * 22; s += `<rect x="${x + 6}" y="${yy}" width="${w - 12}" height="16" rx="2" fill="#262a34"/>`;
    for (let k = 0; k < 3; k++) { const on = Math.sin(t * (3 + r() * 9) + r() * 9) > .2; s += `<circle cx="${x + 14 + k * 9}" cy="${yy + 8}" r="2.4" fill="${on ? ['#4ad87a', '#5ad8ff', '#f4c74a'][k] : '#2a3a2a'}"/>`; } s += `<path d="M${x + w * .5},${yy + 8} h${w * .38}" stroke="#3a3e48" stroke-width="2" stroke-dasharray="3 3"/>`; }
  return s;
}
function sceneCloud(t) {
  const t0 = S0(7) - .2, T = t - t0, ca = ease(ramp(t, WS(7, 3) - .2, WS(7, 4))), dc = ease(ramp(t, WS(7, 5) - .2, WS(7, 8))), st = ease(ramp(t, WS(7, 10) - .2, WS(7, 12)));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // the data centre: rows of racks, blue light
  s += `<g opacity="${dc.toFixed(2)}"><rect x="40" y="420" width="640" height="300" rx="16" fill="#0e1424"/>` + Array.from({ length: 6 }, (_, i) => rack(60 + i * 104, 440, 92, 260, t, 300 + i)).join('') + `<rect x="40" y="420" width="640" height="300" rx="16" fill="#3a6aff" opacity=".08"/>${lbl(360, 760, 'حاسوبٌ بعيد', 1, '#9ab8ff', 26)}</g>`;
  // the cloud above the link
  s += `<g opacity="${ca.toFixed(2)}" transform="translate(360,${(860).toFixed(1)})"><path d="M-80,30 C-120,30 -120,-24 -80,-26 C-76,-66 -14,-74 4,-38 C26,-66 86,-56 82,-16 C118,-12 116,30 84,30Z" fill="#e8eef8"/><path d="M-80,30 C-120,30 -120,-24 -80,-26" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/></g>`;
  // packets of picture streaming down to the player
  if (st > 0) for (let i = 0; i < 9; i++) { const k = pmod(T * 1.4 + i / 9, 1), y = 900 + k * 170, x = 360 + Math.sin(k * 3 + i) * 6; s += `<rect x="${(x - 9).toFixed(1)}" y="${y.toFixed(1)}" width="18" height="12" rx="2" fill="#5ad8ff" opacity="${(st * Math.sin(k * Math.PI)).toFixed(2)}"/>`; }
  // the player at the bottom, playing on the phone
  s += player(300, 1180, .78, 1, 4, t, { off: st < .05 });
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: the twist: your phone is several times stronger than the PlayStation 3 that ran GTA 5 in 2013 ----------
function oldConsole(x, y, s) {   // a generic glossy black console from the 2000s (no logo)
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="150" ry="12" fill="#000" opacity=".35" filter="url(#blur5)"/><path d="M-140,0 L-140,-60 Q-140,-96 -100,-100 L100,-100 Q140,-96 140,-60 L140,0Z" fill="#14161a"/><path d="M-140,-60 Q-140,-96 -100,-100 L100,-100 Q140,-96 140,-60 L140,-52 L-140,-52Z" fill="#2a2e34"/><path d="M-120,-92 L60,-92" stroke="#fff" stroke-width="4" opacity=".18" stroke-linecap="round"/><rect x="-110" y="-36" width="150" height="6" rx="3" fill="#0a0a0c"/><circle cx="110" cy="-30" r="5" fill="#4ad87a"/></g>`;
}
function sceneTwist(t) {
  const t0 = S0(8) - .2, T = t - t0, a1 = ease(ramp(t, WS(8, 6) - .3, WS(8, 8))), a2 = ease(ramp(t, WS(8, 1) - .2, WS(8, 2))), b = ease(ramp(t, WS(8, 3), WS(8, 5) + .3)), g5 = ease(ramp(t, WS(8, 11) - .2, WS(8, 15)));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  s += `<g opacity="${a2.toFixed(2)}">${phoneL(400, 470, 250, 118, t, 'tw', { glow: .5, rot: -6 })}${lbl(525, 640, 'هاتفُك اليوم', 1, '#fff', 26)}</g>`;
  s += `<g opacity="${a1.toFixed(2)}">${oldConsole(200, 640, .9)}${lbl(200, 690, 'بلايستيشن ٣', 1, '#c8d4e8', 26)}</g>`;
  s += `<g opacity="${g5.toFixed(2)}">${panel(60, 720, 290, 74, 1)}${lbl(205, 768, 'شغّل GTA 5 عام ٢٠١٣', 1, '#f4c76b', 22)}</g>`;
  // the bars: about 0.2 vs about 2 TFLOPS
  const bx = 90, bw = 540;
  s += `<g opacity="${Math.max(a1, a2).toFixed(2)}">${panel(60, 850, 600, 300, 1)}${lbl(630, 900, 'قوّةُ الرسوم (تقريباً)', 1, '#c8d4e8', 24, 'start')}` +
    `<rect x="${bx + bw - bw * b}" y="935" width="${bw * b}" height="44" rx="10" fill="#6affc8"/>${lbl(bx + bw - 12, 966, 'الهاتف ≈ ٢', b, '#0c1430', 24, 'start')}` +
    `<rect x="${bx + bw - bw * .1 * a1}" y="1010" width="${bw * .1 * a1}" height="44" rx="10" fill="#8a929c"/>${lbl(bx + bw - bw * .1 - 14, 1042, 'بلايستيشن ٣ ≈ ٠٫٢', a1, '#c8d4e8', 24, 'start')}${lbl(360, 1120, 'تيرافلوبس', 1, '#7a86a0', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// 9: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(9)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7) - .3, WS(9, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: WS(0, 16) - .2, f: sceneBus }, { s: WS(0, 19) - .2, f: sceneCafe }, { s: S0(1) - .2, f: sceneConsole }, { s: S0(2) - .2, f: sceneStorage }, { s: S0(3) - .2, f: sceneGpu },
  { s: S0(4) - .2, f: sceneHeat }, { s: S0(5) - .2, f: sceneBattery }, { s: S0(6) - .2, f: sceneNet }, { s: S0(7) - .2, f: sceneCloud }, { s: S0(8) - .2, f: sceneTwist }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneStorage, sceneGpu, sceneHeat, sceneBattery, sceneNet, sceneCloud, sceneTwist]);
const XF = .5;
const TLI = [['المساحة', S0(2)], ['القوّة', S0(3)], ['الحرارة', S0(4)], ['البطارية', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c0', 'الجميعُ يلعب', 360, 330, 'big', WS(0, 11), S0(1) - .3],
  ['c1', '١٩ نوفمبر ٢٠٢٦', 360, 330, 'big', WS(1, 3), WS(1, 7) - .1],
  ['c1b', 'بلايستيشن ٥ وإكسبوكس فقط', 360, 330, 'red big', WS(1, 7), S0(2) - .3],
  ['c2', 'أكثرُ من ٢٠٠ غيغابايت', 360, 330, 'big', WS(2, 1), WS(2, 7) - .1],
  ['c2b', 'هاتفٌ بـ١٢٨ غيغابايت', 360, 330, 'red big', WS(2, 7), S0(3) - .3],
  ['c3', 'أقوى بعدّةِ مرّات', 360, 330, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'الهاتفُ يسخن', 360, 330, 'red big', WS(4, 4), WS(4, 6) - .1],
  ['c4b', 'يبطئُ نفسَه', 360, 330, 'red big', WS(4, 6), S0(5) - .3],
  ['c5', 'نحوَ ٢٠٠ واط', 360, 330, 'big', WS(5, 2), WS(5, 7) - .1],
  ['c5b', 'تفرغُ في ٦ دقائق', 360, 330, 'red big', WS(5, 9), S0(6) - .3],
  ['c6', 'الشبكاتُ تزدحم', 360, 330, 'red big', WS(6, 4), S0(7) - .3],
  ['c7', 'الألعابُ السحابيّة', 360, 330, 'big', WS(7, 3), WS(7, 10) - .1],
  ['c7b', 'الهاتفُ يستقبلُ الصورةَ فقط', 360, 330, 'big', WS(7, 10), S0(8) - .3],
  ['c8', 'والمفاجأة؟', 360, 330, 'big', S0(8), WS(8, 3) - .1],
  ['c8b', 'هاتفُك أقوى بعدّةِ مرّات', 360, 330, 'big', WS(8, 3), S0(9) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">على الهاتف</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
