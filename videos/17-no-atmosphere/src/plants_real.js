
// ===== realism pass for the plants Short: shots 1, 2, 3, 5, 6, 7, 10, 11 =====
// a fuller Baghdad street: shopfronts with signs and awnings, AC units, dishes, overhead wires, lamps, a wide tiled pavement with a kerb, trees in grates, parked cars
function bareStreet(t, o = {}) {
  const g = o.green ?? 0, sky = o.sky || ['#4a86c6', '#92bce0', '#d2e4f0'], PV = 1000, KB = 1104;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="sk${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${o.id})"/>`;
  s += `<circle cx="150" cy="470" r="30" fill="#fffdf2"/><circle cx="150" cy="470" r="150" fill="#fff6d0" opacity="${o.sunGlow ?? .28}" filter="url(#soft)"/>${o.afterSky || ''}`;
  const hz = mix(sky[2], '#5a6878', .35), r = RS(7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".7"/>`; x += w + 4; }
  s += shanasheel(-10, PV, 170, 260, 11) + bldg(170, PV, 120, 340, '#bca68a', 3, .15) + shanasheel(300, PV, 150, 230, 12) + bldg(460, PV, 110, 220, '#a8927a', 4, .15) + shanasheel(580, PV, 160, 210, 13);
  // shopfronts on the ground floor
  [[6, 150, 'مخبز', '#c0392b'], [178, 104, 'صيدلية', '#2a8a4a'], [306, 138, 'سوبرماركت', '#2a5a9a'], [468, 94, 'حلويات', '#d9822b'], [586, 148, 'أقمشة', '#6a3a8a']].forEach(([sx, sw, name, c]) => {
    s += `<rect x="${sx}" y="${PV - 96}" width="${sw}" height="96" fill="#2a2420"/><rect x="${sx + 6}" y="${PV - 80}" width="${sw - 12}" height="74" fill="#3a4a5a" opacity=".8"/><rect x="${sx + 6}" y="${PV - 80}" width="${(sw - 12) * .35}" height="74" fill="#fff" opacity=".12"/>` +
      `<rect x="${sx - 2}" y="${PV - 122}" width="${sw + 4}" height="26" fill="${c}"/><text x="${sx + sw / 2}" y="${PV - 103}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">${name}</text>` +
      `<path d="M${sx - 4},${PV - 96} L${sx + sw + 4},${PV - 96} L${sx + sw + 12},${PV - 76} L${sx - 12},${PV - 76}Z" fill="${mix(c, '#ffffff', .25)}" opacity=".9"/>` + Array.from({ length: Math.floor(sw / 18) }, (_, q) => `<rect x="${sx - 8 + q * 18}" y="${PV - 96}" width="9" height="20" fill="#fff" opacity=".25"/>`).join(''); });
  [[60, 780], [240, 720], [390, 820], [520, 840], [660, 850]].forEach(([ax, ay]) => { s += `<rect x="${ax}" y="${ay}" width="30" height="20" fill="#e8e8e8"/><rect x="${ax + 3}" y="${ay + 4}" width="24" height="2" fill="#999"/><rect x="${ax + 3}" y="${ay + 9}" width="24" height="2" fill="#999"/>`; });
  s += `<path d="M-20,760 Q180,800 360,770 T740,780" stroke="#1e1e1e" stroke-width="2" fill="none"/><path d="M-20,775 Q180,820 360,790 T740,800" stroke="#1e1e1e" stroke-width="1.5" fill="none"/>`;
  // the wide pavement: tiles, kerb, then the road
  s += `<rect y="${PV}" width="720" height="${KB - PV}" fill="#c8bca6"/><rect y="${PV}" width="720" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let q = 0; q < 4; q++) s += `<path d="M0,${PV + 26 * (q + 1)} L720,${PV + 26 * (q + 1)}" stroke="#a89c86" stroke-width="1.5"/>`;
  for (let q = 0; q < 16; q++) s += `<path d="M${q * 48},${PV} L${q * 48 - 10},${KB}" stroke="#a89c86" stroke-width="1.5"/>`;
  s += `<rect y="${KB}" width="720" height="12" fill="#e8e4d8"/><rect y="${KB + 8}" width="720" height="4" fill="#8a8478"/>` + Array.from({ length: 9 }, (_, q) => `<rect x="${q * 80}" y="${KB}" width="40" height="12" fill="#2a2a2a" opacity=".85"/>`).join('');
  s += `<rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#4e4e54"/><rect y="${KB + 12}" width="720" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  // tree grates and planters on the pavement (with or without their plants)
  [[120, PV + 60], [420, PV + 60], [640, PV + 60]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${px - 26 + q * 10},${py - 5} v10" stroke="#7a7068" stroke-width="2"/>`).join(''); });
  if (g > 0) s += `<g opacity="${g}">` + treeB(120, PV + 58, 300, 3) + palmG(270, PV + 40, 300, t) + treeB(420, PV + 58, 280, 4) + palmG(530, PV + 40, 280, t) + treeB(640, PV + 58, 260, 5) +
    [[200, PV + 18], [360, PV + 18], [580, PV + 18]].map(([px, py]) => `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${px - 24 + q * 8},${py - 12} q${q % 2 ? 4 : -4},-18 ${q % 2 ? 2 : -2},-30" stroke="#4a8a2a" stroke-width="3.5" fill="none"/><circle cx="${px - 24 + q * 8 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#e84a5a', '#f4c84a', '#fff'][q % 3]}"/>`).join('')).join('') + `</g>`;
  else [[200, PV + 18], [360, PV + 18], [580, PV + 18]].forEach(([px, py]) => { s += `<rect x="${px - 30}" y="${py - 14}" width="60" height="22" rx="3" fill="#8a7a62"/><rect x="${px - 26}" y="${py - 10}" width="52" height="8" fill="#6a4e32"/>`; });
  [40, 340, 690].forEach(lx => { s += lampPost(lx, PV + 80, 250, o.lamps || 0); });
  s += car(520, 1170, .95, '#d8d8dc', -1, 0) + car(150, 1250, .9, '#a83a2a', 1, 0);
  return s;
}
const onWalk = (x, y, c, sc, face, t, o = {}) => person(x, y, Object.assign({ s: sc, face, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, t }, o));
// 1–2: dawn on a green street; then the plants dissolve. The walker is on the pavement
function sceneHook(t) {
  const tv = tVan(), k = ramp(t, tv, tv + .7);
  let s = bareStreet(t, { id: 'h0', green: 1 - k, sky: ['#5a7ab0', '#d8a888', '#f4d0a0'], lamps: .6 });
  if (k > 0 && k < 1) for (let i = 0; i < 70; i++) { const r = RS(i + 5), x = 40 + r() * 660, y = 720 + r() * 380 - k * 140 * r(); s += `<circle cx="${x}" cy="${y}" r="${2 + 3 * r()}" fill="${r() > .5 ? '#7ac850' : '#f4f8e8'}" opacity="${((1 - k) * .9).toFixed(2)}"/>`; }
  s += onWalk(300 + Math.min(t, tv) * 30, 1086, CROWD[0], .55, 1, t, { moving: t < tv ? 1 : 0, phase: t * 6, lookUp: k * .3 }) + onWalk(560, 1080, CROWD[1], .5, -1, t, { lookUp: k * .3 });
  F.ov = ''; return s;
}
// 3: the morning after: empty grates and planters, people standing on the pavement looking around
function sceneMorning(t) {
  let s = bareStreet(t, { id: 'm1', green: 0 });
  s += onWalk(230, 1090, CROWD[1], .55, 1, t, { lookUp: .2 }) + onWalk(330, 1084, CROWD[3], .52, -1, t, { lookUp: .25 }) + onWalk(500, 1078, CROWD[2], .5, -1, t, { lookUp: .1 });
  F.ov = ''; return s;
}
// 5: a real Iraqi table seen from above at an angle: samoon, steaming rice, glossy dates, salad, kebab on bread, laban, istikan tea
function sceneFood(t) {
  const k2 = ramp(t, WS(3, 11) - .2, WS(3, 11) + .4);
  let s = `<defs>${RDEF}${RDEF2}<radialGradient id="plateG" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".8" stop-color="#ecebe6"/><stop offset="1" stop-color="#c8c4bc"/></radialGradient><radialGradient id="tomG" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a6a"/><stop offset=".5" stop-color="#d8301c"/><stop offset="1" stop-color="#8a140a"/></radialGradient><radialGradient id="dateG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b8723a"/><stop offset=".5" stop-color="#6a2e12"/><stop offset="1" stop-color="#2a1006"/></radialGradient><radialGradient id="kebG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#9a5a2e"/><stop offset="1" stop-color="#4a2410"/></radialGradient></defs>`;
  s += `<rect width="720" height="1280" fill="#c8a678"/><rect width="720" height="1280" fill="#fff" filter="url(#wallI)" opacity=".5"/><rect y="0" width="720" height="760" fill="#b8925e" opacity=".5"/>`;
  s += `<path d="M-40,760 L760,760 L760,1290 L-40,1290Z" fill="#e8e0cc"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M${-40 + i * 60},760 L${-120 + i * 70},1290" stroke="#c0392b" stroke-width="5" opacity=".35"/>`).join('') + Array.from({ length: 9 }, (_, i) => `<path d="M-40,${780 + i * 60} L760,${780 + i * 60}" stroke="#c0392b" stroke-width="5" opacity=".35"/>`).join('');
  const plate = (x, y, rx, inner) => `<ellipse cx="${x}" cy="${y + 8}" rx="${rx}" ry="${rx * .4}" fill="#000" opacity=".22" filter="url(#blur2)"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .4}" fill="url(#plateG)"/><ellipse cx="${x}" cy="${y}" rx="${rx * .78}" ry="${rx * .31}" fill="none" stroke="#d8d4cc" stroke-width="2"/>${inner}`;
  const samoon = (x, y) => `<path d="M${x - 46},${y} Q${x - 30},${y - 26} ${x},${y - 24} Q${x + 30},${y - 26} ${x + 46},${y} Q${x + 20},${y + 14} ${x},${y + 12} Q${x - 20},${y + 14} ${x - 46},${y}Z" fill="#d89a4a"/><path d="M${x - 34},${y - 8} Q${x},${y - 30} ${x + 34},${y - 8}" stroke="#f4c88a" stroke-width="4" fill="none"/><path d="M${x - 20},${y - 4} l40,0" stroke="#a86a2a" stroke-width="2" opacity=".6"/>`;
  const steam = (x, y) => Array.from({ length: 3 }, (_, q) => { const ph = pmod(t * .5 + q / 3, 1); return `<path d="M${x - 20 + q * 20},${y - ph * 60} q10,-15 0,-30" stroke="#fff" stroke-width="5" fill="none" opacity="${(.5 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }).join('');
  const items = [
    [170, 860, 'صمون', plate(170, 860, 92, samoon(150, 860) + samoon(196, 872)), 'حنطة'],
    [400, 860, 'تمن', plate(400, 860, 104, `<ellipse cx="400" cy="852" rx="76" ry="26" fill="#f6f2e4"/>` + Array.from({ length: 70 }, (_, q) => { const r = RS(q + 9); return `<ellipse cx="${330 + r() * 140}" cy="${834 + r() * 34}" rx="3.4" ry="1.5" fill="${r() > .5 ? '#e4dcc8' : '#fffcf2'}" transform="rotate(${r() * 180},${330 + r() * 140},${834 + r() * 34})"/>`; }).join('') + steam(400, 830)), 'رز'],
    [612, 872, 'تمر', plate(612, 872, 74, Array.from({ length: 8 }, (_, q) => `<ellipse cx="${574 + (q % 4) * 24}" cy="${862 + Math.floor(q / 4) * 13}" rx="12" ry="7.5" fill="url(#dateG)"/><ellipse cx="${570 + (q % 4) * 24}" cy="${858 + Math.floor(q / 4) * 13}" rx="4" ry="1.8" fill="#fff" opacity=".45"/>`).join('')), 'نخيل'],
    [228, 1036, 'زلاطة', plate(228, 1036, 84, [0, 1, 2, 3, 4].map(q => `<path d="M${190 + q * 18},${1030 + (q % 2) * 6} a12,9 0 1,0 0.1,0" fill="url(#tomG)"/>`).join('') + [0, 1, 2].map(q => `<ellipse cx="${200 + q * 28}" cy="${1042}" rx="11" ry="7" fill="#5a9a3a"/><ellipse cx="${200 + q * 28}" cy="${1042}" rx="7" ry="4" fill="#cfe8a8"/>`).join('') + `<path d="M182,1030 q10,-10 20,-2" stroke="#3a8a2a" stroke-width="3" fill="none"/>`), 'نبات'],
    [482, 1036, 'كباب', plate(482, 1036, 112, `<path d="M396,1046 Q482,1020 568,1046 Q482,1062 396,1046Z" fill="#e8c890"/>` + `<rect x="398" y="1022" width="176" height="5" fill="#9a9a9a"/>` + [0, 1, 2, 3, 4].map(q => `<ellipse cx="${416 + q * 34}" cy="${1030}" rx="18" ry="11" fill="url(#kebG)"/><path d="M${404 + q * 34},${1026} l10,8 M${412 + q * 34},${1024} l10,8" stroke="#2a1006" stroke-width="2" opacity=".7"/>`).join('') + `<ellipse cx="540" cy="1050" rx="14" ry="7" fill="#d8301c" opacity=".9"/><ellipse cx="440" cy="1052" rx="12" ry="6" fill="#f4f0e8" opacity=".9"/>`), 'بقرة ← عشب'],
    [636, 1150, 'لبن', `<ellipse cx="640" cy="1186" rx="34" ry="8" fill="#000" opacity=".2"/><path d="M612,1100 L668,1100 L662,1184 L618,1184Z" fill="#f8faf8" opacity=".95"/><path d="M612,1100 L668,1100" stroke="#e0e4e0" stroke-width="3"/>` + Array.from({ length: 6 }, (_, q) => `<circle cx="${620 + q * 8}" cy="${1124 + (q % 3) * 14}" r="1.8" fill="#fff" opacity=".9"/>`).join(''), 'بقرة ← عشب'],
    [90, 1150, 'چاي', `<ellipse cx="90" cy="1186" rx="40" ry="10" fill="#d8d4cc"/><path d="M74,1120 Q66,1150 78,1180 L102,1180 Q114,1150 106,1120Z" fill="#8a2a0e" opacity=".85"/><path d="M74,1120 L106,1120" stroke="#e8e0d0" stroke-width="3"/>` + steam(90, 1110), 'نبات الشاي'],
  ];
  items.forEach(([x, y, name, svg, src], i) => { const ap = ramp(t, S0(3) - .1 + i * .18, S0(3) + .2 + i * .18), tag = ramp(t, WS(3, 9) - .2 + i * .13, WS(3, 9) + .2 + i * .13), ly = (name === 'لبن' || name === 'چاي') ? y - 60 : y - 52;
    s += `<g opacity="${ap}">${svg}<text x="${x}" y="${ly}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${name}</text></g>` +
      `<g opacity="${tag}"><rect x="${x - 60}" y="${y + 40}" width="120" height="30" rx="10" fill="#3a8a3a"/><text x="${x}" y="${y + 61}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#fff">🌿 ${src}</text></g>`; });
  if (k2 > 0) s += `<g opacity="${k2}"><rect x="40" y="420" width="640" height="260" rx="20" fill="#0a0e1c" opacity=".8"/><g transform="translate(110,620)">` + Array.from({ length: 26 }, (_, q) => `<path d="M${-40 + q * 6},0 q${(q % 2 ? 3 : -3)},-22 ${(q % 2 ? 1 : -1) * 2},-${30 + (q % 4) * 6}" stroke="${q % 3 ? '#6aa83a' : '#8ac850'}" stroke-width="2.5" fill="none"/>`).join('') + `</g>` +
    `<path d="M220,570 h70" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/>` + quad(400, 640, 1.0, { kind: 'cow', graze: 1 }) + `<path d="M500,570 h60" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/><text x="610" y="566" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">لحم وحليب</text><text x="110" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#9ce0b0">عشب</text><text x="400" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">بقرة</text></g>`;
  F.ov = ''; return s;
}
// 6: the supermarket: strip lights, aisle signs, an end-cap, empty shelves with a few leftovers, "sold out" cards, flattened boxes on the floor
function sceneMarket(t) {
  const k = ease(ramp(t, S0(4), WS(4, 4) + .3));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="shelfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0f2"/><stop offset="1" stop-color="#c8ccd2"/></linearGradient><linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dade"/><stop offset="1" stop-color="#f4f2ec"/></linearGradient></defs><rect width="720" height="1280" fill="url(#ceil)"/>`;
  for (let q = 0; q < 3; q++) s += `<rect x="${60 + q * 220}" y="${380 + q * 4}" width="160" height="10" rx="4" fill="#ffffff"/><ellipse cx="${140 + q * 220}" cy="${400}" rx="120" ry="30" fill="#fff" opacity=".5" filter="url(#soft)"/>`;
  s += `<rect x="250" y="404" width="220" height="40" rx="6" fill="#c62828"/><text x="360" y="432" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">ممر ٤ — مواد غذائية</text>`;
  s += `<rect x="20" y="450" width="680" height="670" fill="#d8dce2"/><rect x="20" y="450" width="680" height="670" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  const types = [(x, y, c) => `<rect x="${x}" y="${y - 70}" width="40" height="70" rx="3" fill="${c}"/><rect x="${x + 4}" y="${y - 50}" width="32" height="22" fill="#fff" opacity=".85"/><rect x="${x + 8}" y="${y - 44}" width="24" height="4" fill="${c}"/><rect x="${x}" y="${y - 70}" width="12" height="70" fill="#fff" opacity=".18"/>`,
    (x, y, c) => `<rect x="${x + 8}" y="${y - 60}" width="24" height="60" rx="8" fill="${c}"/><rect x="${x + 14}" y="${y - 72}" width="12" height="14" rx="3" fill="${mix(c, '#000000', .3)}"/><rect x="${x + 8}" y="${y - 40}" width="24" height="16" fill="#fff" opacity=".8"/><rect x="${x + 10}" y="${y - 58}" width="5" height="50" fill="#fff" opacity=".25"/>`,
    (x, y, c) => `<rect x="${x + 4}" y="${y - 42}" width="32" height="42" rx="4" fill="#b8bcc2"/><rect x="${x + 4}" y="${y - 34}" width="32" height="24" fill="${c}"/><ellipse cx="${x + 20}" cy="${y - 42}" rx="16" ry="4" fill="#e0e4e8"/><rect x="${x + 6}" y="${y - 40}" width="6" height="36" fill="#fff" opacity=".3"/>`];
  for (let sh = 0; sh < 5; sh++) { const y = 570 + sh * 125; s += `<rect x="20" y="${y}" width="680" height="16" fill="url(#shelfB)"/><rect x="20" y="${y + 16}" width="680" height="4" fill="#9aa0a8"/>`;
    for (let q = 0; q < 15; q++) { const r = RS(sh * 30 + q), x = 34 + q * 44, keep = r() > .15 + .8 * k; if (keep) s += types[q % 3](x, y, ['#d84a3a', '#f4b84a', '#3a7ad0', '#4aa84a', '#8a4ab8'][(q + sh) % 5]); else if (r() > .6) s += `<rect x="${x + 6}" y="${y - 5}" width="26" height="5" fill="#b8b4ac" opacity=".6"/>`;
      if (q % 3 === 0) s += `<rect x="${x}" y="${y + 3}" width="34" height="12" fill="#fff59d"/><text x="${x + 17}" y="${y + 13}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="9" fill="#333">${(1 + (q * 7 + sh) % 9) * 250}</text>`; }
    if (k > .6 && sh % 2 === 0) s += `<g transform="translate(${140 + sh * 120},${y - 46}) rotate(-4)"><rect x="-50" y="-16" width="100" height="32" fill="#fff" stroke="#c62828" stroke-width="2"/><text x="0" y="7" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#c62828">نفدت الكمية</text></g>`; }
  s += `<rect y="1120" width="720" height="170" fill="#d0ccc4"/><rect y="1120" width="720" height="170" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${i * 140},1120 L${i * 140 - 60},1290" stroke="#b0aca4" stroke-width="2"/>`).join('') + `<path d="M0,1180 L720,1180" stroke="#b0aca4" stroke-width="2"/>`;
  s += `<g opacity="${k}"><path d="M470,1150 L560,1140 L572,1160 L482,1172Z" fill="#c8a070"/><path d="M590,1200 L680,1186 L690,1206 L600,1222Z" fill="#b8905e"/></g>`;
  s += person(250, 1250, { s: .66, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .05 }) + `<g transform="translate(290,1260)"><path d="M0,-110 L150,-110 L136,-36 L14,-36Z" fill="none" stroke="#8a8e94" stroke-width="5"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${10 + q * 24},-108 L${18 + q * 21},-38" stroke="#8a8e94" stroke-width="2"/>`).join('') + `<path d="M0,-110 L-24,-140" stroke="#8a8e94" stroke-width="6"/><circle cx="24" cy="-12" r="12" fill="#333"/><circle cx="126" cy="-12" r="12" fill="#333"/></g>`;
  s += person(560, 1240, { s: .6, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .1 });
  F.ov = ''; return s;
}
// 7: a farm with nothing growing: cracked bare fields, a dry trough and fence, a farmhouse; thin cattle with ribs showing, heads low; a wolf arrives
function sceneHerbivores(t) {
  const w = ramp(t, WS(4, 9) - .2, WS(4, 9) + .6);
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skHv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9cb0"/><stop offset="1" stop-color="#ecd8b4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skHv)"/><circle cx="560" cy="480" r="30" fill="#fff6e0"/><circle cx="560" cy="480" r="140" fill="#fff0d0" opacity=".3" filter="url(#soft)"/>`;
  s += `<path d="M-20,830 Q160,790 340,810 T740,796 L740,880 L-20,880Z" fill="#b09070" filter="url(#reliefR)"/>`;
  s += `<rect x="520" y="790" width="110" height="60" fill="#c8b48a"/><rect x="515" y="784" width="120" height="10" fill="#a8946a"/><rect x="560" y="814" width="18" height="36" fill="#6a4a2e"/><rect x="592" y="806" width="16" height="14" fill="#4a5a6a"/><rect x="636" y="760" width="6" height="90" fill="#7a7a7a"/><path d="M620,762 L660,756" stroke="#9a9a9a" stroke-width="10"/>`;
  s += `<rect y="860" width="720" height="430" fill="#c8a87a" filter="url(#reliefR)"/><rect y="860" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".35"/>` + cracks(890, 1290, .75, 21, -20, 740, '#6a4a2a');
  for (let i = 0; i < 12; i++) { const x = -10 + i * 64; s += `<rect x="${x}" y="${920}" width="6" height="54" fill="#6a5040"/>`; } s += `<path d="M-20,934 L740,934 M-20,956 L740,956" stroke="#6a5040" stroke-width="3"/>`;
  s += `<rect x="300" y="1150" width="160" height="34" rx="6" fill="#7a7a80"/><rect x="306" y="1154" width="148" height="14" rx="4" fill="#4a4038"/><path d="M308,1162 q70,-6 144,0" stroke="#8a7a5a" stroke-width="2" fill="none"/>`;
  const thin = (x, y, sc, face, col, graze, mv) => { let c = quad(x, y, sc, { kind: 'cow', graze, face, col, moving: mv, phase: t * 2.2 }); const rb = Array.from({ length: 5 }, (_, q) => `<path d="M${x + face * (-14 + q * 9) * sc},${y - 88 * sc} q${face * 3 * sc},${16 * sc} 0,${30 * sc}" stroke="#000" stroke-width="${1.6 * sc}" fill="none" opacity=".35"/>`).join(''); return c + rb; };
  s += thin(210, 1080, 1.05, 1, '#d8ccb8', 1, 0) + thin(500, 1120, 1.15, -1, '#a87850', 0, 1) + thin(110, 1220, 1.2, 1, '#e4dccc', 1, 0);
  s += `<g opacity="${w}">` + quad(lerp(800, 620, w), 1240, 1.3, { kind: 'wolf', moving: 1, phase: t * 6, face: -1 }) + `</g>`;
  for (let i = 0; i < 3; i++) { const a = t * .6 + i * 2.1; s += pigeon(360 + Math.cos(a) * 120, 520 + Math.sin(a) * 40, 2.2, t, i, 1); }
  F.ov = ''; return s;
}
// 10: (left) a layered forest breathing vapour that becomes clouds and rain over a river; (right) bare cracked land under an empty sky
function sceneRain(t) {
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skRn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7090"/><stop offset="1" stop-color="#cfdae0"/></linearGradient><linearGradient id="skDr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7cc8"/><stop offset="1" stop-color="#f0e4c8"/></linearGradient><clipPath id="cL6"><rect width="358" height="1280"/></clipPath><clipPath id="cR6"><rect x="362" width="358" height="1280"/></clipPath></defs>`;
  s += `<g clip-path="url(#cL6)"><rect width="360" height="1280" fill="url(#skRn)"/>`;
  for (let i = 0; i < 6; i++) s += `<ellipse cx="${20 + i * 65}" cy="${450 + (i % 2) * 34}" rx="100" ry="48" fill="${i % 2 ? '#dfe4ea' : '#c8d0d8'}" opacity=".95" filter="url(#soft)"/><ellipse cx="${30 + i * 65}" cy="${480 + (i % 2) * 34}" rx="70" ry="22" fill="#9aa4b0" opacity=".7" filter="url(#soft)"/>`;
  for (let q = 0; q < 4; q++) s += `<rect x="${40 + q * 90}" y="500" width="40" height="300" fill="#b8c4d0" opacity=".25" filter="url(#blur2)"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 3), x = r() * 360, y = pmod(r() * 320 + t * 640, 320) + 500; s += `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 18}" stroke="#dde8f2" stroke-width="1.5" opacity=".55"/>`; }
  for (let i = 0; i < 12; i++) { const r = RS(i + 90); s += pine(-10 + i * 32 + r() * 10, 900 + r() * 20, 140 + r() * 60, i + 90, mix('#3e5e3a', '#5a7a4a', .5 + .3 * r())); }
  s += `<rect y="800" width="360" height="140" fill="#cfdae0" opacity=".35" filter="url(#haze)"/>`;
  for (let i = 0; i < 12; i++) { const r = RS(i + 40); s += treeB(-10 + i * 32 + r() * 10, 1010 + r() * 40, 180 + r() * 90, i + 40); }
  for (let i = 0; i < 7; i++) { const x = 20 + i * 50, ph = pmod(t * .45 + i * .17, 1); s += `<path d="M${x},${900 - ph * 330} q14,-22 0,-44 q-14,-22 0,-44" stroke="#ffffff" stroke-width="5" fill="none" opacity="${(.65 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }
  s += `<rect y="1050" width="360" height="240" fill="#3e5e26"/><rect y="1050" width="360" height="240" fill="#000" filter="url(#grainR)" opacity=".3"/>` + riverW(1120, 1170, t, { id: 'r10', col: ['#5a8aa0', '#3a6a80'] });
  for (let i = 0; i < 20; i++) { const r = RS(i + 70); s += `<path d="M${r() * 360},${1180 + r() * 60} q-6,-20 0,-34 q6,14 2,34" fill="#4a8a32"/>`; }
  s += `<text x="180" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">مع الغابات</text></g>`;
  s += `<g clip-path="url(#cR6)"><rect x="360" width="360" height="1280" fill="url(#skDr)"/><circle cx="600" cy="460" r="30" fill="#fffdf2"/><circle cx="600" cy="460" r="130" fill="#fff6d0" opacity=".35" filter="url(#soft)"/>`;
  s += `<path d="M360,940 L420,880 L500,910 L580,860 L660,900 L720,880 L720,1000 L360,1000Z" fill="#b89a78" filter="url(#reliefR)"/><path d="M360,990 Q460,950 560,970 T720,960 L720,1290 L360,1290Z" fill="#c8a478" filter="url(#reliefR)"/>` + cracks(1000, 1290, 1, 5, 220, 960, '#6a4a2a').replace(/<g /, '<g clip-path="url(#cR6)" ');
  for (let q = 0; q < 5; q++) s += `<path d="M360,${960 + q * 14} q180,${Math.sin(t * 4 + q) * 5} 360,0" stroke="#fff" stroke-width="2" fill="none" opacity=".15"/>`;
  s += `<path d="M400,1140 Q520,1120 640,1150" stroke="#9a7a58" stroke-width="18" fill="none" opacity=".6"/>`;
  s += `<text x="540" y="1240" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بدون غابات</text></g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  F.ov = ''; return s;
}
// 11: CO2 climbs over the hot, hazy city; the man stands on the pavement
function sceneCO2(t) {
  const k = ease(ramp(t, WS(7, 0), L(7).end + .2));
  let s = bareStreet(t, { id: 'c7', green: 0, sky: [mix('#4a86c6', '#c89a6a', k), mix('#92bce0', '#e8c090', k), mix('#d2e4f0', '#f4dcb0', k)] });
  s += `<rect width="720" height="1280" fill="#ff9a4a" opacity="${.12 * k}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${940 + i * 20} q180,${Math.sin(t * 4 + i) * 6} 380,0 t380,0" stroke="#fff" stroke-width="2" fill="none" opacity="${.15 * k}"/>`).join('');
  s += `<g><rect x="190" y="420" width="340" height="140" rx="20" fill="#0a0e1c" opacity=".82"/><text x="360" y="466" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#cfd8ff">ثاني أكسيد الكربون ↑</text><rect x="220" y="490" width="280" height="26" rx="10" fill="#2a3046"/><rect x="220" y="490" width="${280 * (.35 + .65 * k)}" height="26" rx="10" fill="${mix('#f4c76b', '#e53935', k)}"/></g>`;
  s += onWalk(300, 1088, CROWD[0], .55, 1, t, { lookUp: .2 });
  F.ov = ''; return s;
}
