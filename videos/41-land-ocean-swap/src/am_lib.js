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
