
// ===================== "what if all plants vanished?" =====================
const tVan = () => WS(0, 6) + .2;
function bareStreet(t, o = {}) {
  // the Baghdad street with (green = 1) or without (green = 0) its palms, trees and verges
  const g = o.green ?? 0, sky = o.sky || ['#4a86c6', '#92bce0', '#d2e4f0'];
  let s = `<defs>${RDEF}<linearGradient id="sk${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${o.id})"/>`;
  s += `<circle cx="150" cy="470" r="34" fill="#fffdf2"/><circle cx="150" cy="470" r="140" fill="#fff6d0" opacity=".3" filter="url(#soft)"/>`;
  const hz = mix(sky[2], '#5a6878', .35), r = RS(7); let x = -30;
  while (x < 740) { const w = 40 + r() * 70, h = 70 + r() * 200; s += `<rect x="${x}" y="${900 - h}" width="${w}" height="${h}" fill="${hz}" opacity=".75"/>`; x += w + 4; }
  s += shanasheel(-10, 1000, 170, 250, 11) + bldg(170, 1000, 110, 330, '#bca68a', 3, .15) + shanasheel(300, 1000, 150, 220, 12) + bldg(460, 1000, 100, 200, '#a8927a', 4, .15) + shanasheel(570, 1000, 160, 190, 13);
  if (g > 0) s += `<g opacity="${g}">` + treeB(250, 1010, 260, 3) + palmG(160, 1012, 260, t) + palmG(455, 1012, 240, t) + treeB(640, 1010, 230, 4) + `</g>`;
  s += `<rect y="1000" width="720" height="56" fill="#b8ab98"/>` + Array.from({ length: 13 }, (_, i) => `<rect x="${i * 60}" y="1000" width="2" height="56" fill="#000" opacity=".12"/>`).join('');
  [[120, 1028], [400, 1028], [600, 1028]].forEach(([px, py]) => { s += `<rect x="${px - 44}" y="${py - 14}" width="88" height="28" rx="4" fill="#8a7a62"/><rect x="${px - 40}" y="${py - 10}" width="80" height="20" fill="#6a4e32"/>` + (g > 0 ? `<g opacity="${g}">` + Array.from({ length: 9 }, (_, q) => `<path d="M${px - 36 + q * 9},${py - 8} q${(q % 2 ? 4 : -4)},-20 ${(q % 2 ? 2 : -2)},-34" stroke="#4a8a2a" stroke-width="4" fill="none"/><circle cx="${px - 36 + q * 9 + (q % 2 ? 2 : -2)}" cy="${py - 42}" r="4" fill="${['#e84a5a', '#f4c84a', '#fff'][q % 3]}"/>`).join('') + `</g>` : ''); });
  s += `<rect y="1054" width="720" height="12" fill="#8a8478"/><rect y="1066" width="720" height="220" fill="#55555a"/><rect y="1066" width="720" height="220" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1166" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  return s;
}
// 0: a green Baghdad street at dawn – then every tree, palm and flower dissolves into the air
function sceneHook(t) {
  const tv = tVan(), k = ramp(t, tv, tv + .7);
  let s = bareStreet(t, { id: 'h0', green: 1 - k, sky: ['#5a7ab0', '#d8a888', '#f4d0a0'] });
  if (k > 0 && k < 1) for (let i = 0; i < 60; i++) { const r = RS(i + 5), x = 60 + r() * 620, y = 760 + r() * 260 - k * 120 * r(); s += `<circle cx="${x}" cy="${y}" r="${2 + 3 * r()}" fill="${r() > .5 ? '#7ac850' : '#f4f8e8'}" opacity="${(1 - k) * .9}"/>`; }
  s += person(300, 1180, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, moving: t < tv ? 1 : 0, phase: t * 6, lookUp: k * .3 });
  F.ov = ''; return s;
}
// 1: the morning after: bare planters, holes where the palms stood, people staring
function sceneMorning(t) {
  let s = bareStreet(t, { id: 'm1', green: 0 });
  [[160, 1006], [455, 1006]].forEach(([x, y]) => { s += `<ellipse cx="${x}" cy="${y}" rx="34" ry="9" fill="#4a3a28"/><ellipse cx="${x}" cy="${y - 2}" rx="26" ry="6" fill="#2a2018"/>`; });
  s += `<ellipse cx="250" cy="1008" rx="40" ry="10" fill="#4a3a28"/><ellipse cx="640" cy="1008" rx="38" ry="10" fill="#4a3a28"/>`;
  s += person(220, 1180, { s: .55, face: 1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, t, lookUp: .2 }) + person(330, 1186, { s: .52, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .2 }) + person(520, 1176, { s: .5, face: -1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: .1 });
  s += car(600, 1250, .9, '#d8d8dc', -1, 0);
  F.ov = ''; return s;
}
// 2: no suffocation yet: the atmosphere already holds ~21% oxygen, enough for thousands of years
function sceneOxygen(t) {
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 700, r: 210, a: 1, sunI: 1.05, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-500, 300];
  const k = ease(ramp(t, WS(2, 5), WS(2, 8) + .3));
  let ov = `<circle cx="360" cy="700" r="236" fill="none" stroke="#7ab4ff" stroke-width="14" opacity=".25" filter="url(#blur2)"/>`;
  ov += `<g opacity="${k}"><rect x="130" y="980" width="460" height="150" rx="20" fill="#0a0e1c" opacity=".82" stroke="#9ccaff" stroke-opacity=".4"/><text x="560" y="1026" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#cfe4ff">أكسجين الهواء</text>` +
    `<rect x="160" y="1046" width="400" height="28" rx="10" fill="#2a3046"/><rect x="${560 - 400 * .21}" y="1046" width="${400 * .21}" height="28" rx="10" fill="#7ac8ff"/><text x="${560 - 400 * .21 - 12}" y="1069" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">٢١٪</text>` +
    `<text x="360" y="1112" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b">يكفي آلاف السنين</text></g>`;
  F.ov = ov; return s;
}
// 3: food: an Iraqi table of bread, rice, dates, tomatoes, kebab and laban – every item traces back to a plant, even the meat and the milk
function sceneFood(t) {
  const k2 = ramp(t, WS(3, 11) - .2, WS(3, 11) + .4);
  let s = `<defs>${RDEF}${RDEF2}<radialGradient id="plateG" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8d4cc"/></radialGradient></defs><rect width="720" height="1280" fill="#c8a678"/><rect width="720" height="1280" fill="#fff" filter="url(#wallI)" opacity=".5"/>`;
  s += `<rect y="760" width="720" height="520" fill="#8a3a2a"/><rect y="760" width="720" height="520" fill="#000" filter="url(#grainR)" opacity=".3"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M0,${790 + i * 60} L720,${790 + i * 60}" stroke="#e8c86a" stroke-width="3" opacity=".35"/>`).join('');
  const plate = (x, y, rx, inner) => `<ellipse cx="${x}" cy="${y + 6}" rx="${rx}" ry="${rx * .36}" fill="#000" opacity=".25"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .36}" fill="url(#plateG)"/>${inner}`;
  const items = [
    [170, 860, 'خبز', plate(170, 860, 90, `<path d="M110,860 Q170,820 230,860 Q170,880 110,860Z" fill="#d89a4a"/><path d="M125,848 Q170,826 215,848" stroke="#f4c88a" stroke-width="4" fill="none"/>`), 'حنطة'],
    [400, 860, 'تمن', plate(400, 860, 100, `<ellipse cx="400" cy="852" rx="70" ry="22" fill="#f4efe0"/>` + Array.from({ length: 40 }, (_, q) => { const r = RS(q + 9); return `<ellipse cx="${340 + r() * 120}" cy="${838 + r() * 26}" rx="3" ry="1.4" fill="#e0d8c4"/>`; }).join('')), 'رز'],
    [610, 870, 'تمر', plate(610, 870, 70, Array.from({ length: 7 }, (_, q) => `<ellipse cx="${575 + (q % 4) * 22}" cy="${860 + Math.floor(q / 4) * 12}" rx="11" ry="7" fill="#5a2a12"/><ellipse cx="${572 + (q % 4) * 22}" cy="${857 + Math.floor(q / 4) * 12}" rx="4" ry="2" fill="#a86a3a" opacity=".6"/>`).join('')), 'نخيل'],
    [230, 1030, 'طماطة', plate(230, 1030, 80, [0, 1, 2, 3].map(q => `<circle cx="${195 + q * 24}" cy="${1022 + (q % 2) * 6}" r="14" fill="#d8301c"/><circle cx="${190 + q * 24}" cy="${1016 + (q % 2) * 6}" r="4" fill="#fff" opacity=".4"/>`).join('')), 'نبات'],
    [480, 1030, 'كباب', plate(480, 1030, 110, `<rect x="390" y="1014" width="180" height="6" fill="#9a9a9a"/>` + [0, 1, 2, 3, 4].map(q => `<ellipse cx="${410 + q * 34}" cy="${1024}" rx="17" ry="11" fill="#6a3a1e"/>`).join('')), 'بقرة ← عشب'],
    [640, 1150, 'لبن', `<path d="M610,1100 L670,1100 L664,1180 L616,1180Z" fill="#f4f6f4" opacity=".95"/><path d="M612,1112 L668,1112" stroke="#d8dcd8" stroke-width="3"/>`, 'بقرة ← عشب'],
  ];
  items.forEach(([x, y, name, svg, src], i) => { const ap = ramp(t, S0(3) - .1 + i * .2, S0(3) + .2 + i * .2), tag = ramp(t, WS(3, 9) - .2 + i * .15, WS(3, 9) + .2 + i * .15);
    s += `<g opacity="${ap}">${svg}<text x="${x}" y="${y + (name === 'لبن' ? 0 : -50)}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${name}</text></g>` +
      `<g opacity="${tag}"><rect x="${x - 56}" y="${y + (name === 'لبن' ? 40 : 34)}" width="112" height="30" rx="10" fill="#3a8a3a"/><text x="${x}" y="${y + (name === 'لبن' ? 61 : 55)}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="18" fill="#fff">🌿 ${src}</text></g>`; });
  if (k2 > 0) s += `<g opacity="${k2}"><rect x="40" y="420" width="640" height="250" rx="20" fill="#0a0e1c" opacity=".78"/>` + `<g transform="translate(110,610)"><path d="M-30,0 h120" stroke="#6a9a3a" stroke-width="6"/>` + Array.from({ length: 12 }, (_, q) => `<path d="M${-28 + q * 10},0 q-3,-20 2,-32" stroke="#6aa83a" stroke-width="3" fill="none"/>`).join('') + `</g>` +
    `<path d="M240,560 h60" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/>` + quad(400, 630, 1.0, { kind: 'cow', graze: 1 }) + `<path d="M500,560 h60" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrW)"/><text x="600" y="555" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">لحم وحليب</text><text x="110" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#9ce0b0">عشب</text><text x="400" y="470" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">بقرة</text></g>`;
  F.ov = ''; return s;
}
// 4a: weeks later: a supermarket shelf wall, almost bare – price tags over empty spaces, a shopper with an empty trolley
function sceneMarket(t) {
  const k = ease(ramp(t, S0(4), WS(4, 4) + .3));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="shelfB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8eaee"/><stop offset="1" stop-color="#c8ccd2"/></linearGradient></defs><rect width="720" height="1280" fill="#f0eee8"/>`;
  s += `<rect x="0" y="380" width="720" height="40" fill="#c62828"/><text x="360" y="408" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">مواد غذائية</text>`;
  s += `<rect x="20" y="420" width="680" height="700" fill="#d8dce2"/><rect x="20" y="420" width="680" height="700" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  const types = [(x, y, c) => `<rect x="${x}" y="${y - 70}" width="40" height="70" rx="3" fill="${c}"/><rect x="${x + 4}" y="${y - 50}" width="32" height="22" fill="#fff" opacity=".8"/><rect x="${x}" y="${y - 70}" width="12" height="70" fill="#fff" opacity=".18"/>`,
    (x, y, c) => `<rect x="${x + 8}" y="${y - 60}" width="24" height="60" rx="8" fill="${c}"/><rect x="${x + 14}" y="${y - 72}" width="12" height="14" rx="3" fill="${c}"/><rect x="${x + 8}" y="${y - 40}" width="24" height="16" fill="#fff" opacity=".75"/>`,
    (x, y, c) => `<rect x="${x + 4}" y="${y - 42}" width="32" height="42" rx="4" fill="#b8bcc2"/><rect x="${x + 4}" y="${y - 34}" width="32" height="24" fill="${c}"/><ellipse cx="${x + 20}" cy="${y - 42}" rx="16" ry="4" fill="#d8dce2"/>`];
  for (let sh = 0; sh < 5; sh++) { const y = 540 + sh * 130; s += `<rect x="20" y="${y}" width="680" height="16" fill="url(#shelfB)"/><rect x="20" y="${y + 16}" width="680" height="4" fill="#9aa0a8"/>`;
    for (let q = 0; q < 15; q++) { const r = RS(sh * 30 + q), x = 34 + q * 44, keep = r() > .15 + .78 * k; if (keep) s += types[q % 3](x, y, ['#d84a3a', '#f4b84a', '#3a7ad0', '#4aa84a', '#8a4ab8'][(q + sh) % 5]); else if (r() > .7) s += `<rect x="${x + 6}" y="${y - 6}" width="26" height="6" fill="#b8b4ac" opacity=".6"/>`;
      if (q % 3 === 0) s += `<rect x="${x}" y="${y + 3}" width="34" height="12" fill="#fff59d"/><text x="${x + 17}" y="${y + 13}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="9" fill="#333">${(1 + (q * 7 + sh) % 9) * 250}</text>`; } }
  s += `<rect y="1120" width="720" height="170" fill="#c8c4bc"/><rect y="1120" width="720" height="170" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${i * 140},1120 L${i * 140 - 60},1290" stroke="#a8a49c" stroke-width="2"/>`).join('');
  s += person(250, 1250, { s: .66, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .05 }) + `<g transform="translate(290,1260)"><path d="M0,-110 L150,-110 L136,-36 L14,-36Z" fill="none" stroke="#8a8e94" stroke-width="5"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${10 + q * 24},-108 L${18 + q * 21},-38" stroke="#8a8e94" stroke-width="2"/>`).join('') + `<path d="M0,-110 L-24,-140" stroke="#8a8e94" stroke-width="6"/><circle cx="24" cy="-12" r="12" fill="#333"/><circle cx="126" cy="-12" r="12" fill="#333"/></g>`;
  s += person(560, 1240, { s: .6, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .1 });
  F.ov = ''; return s;
}
// 4b: grazers grow thin on bare ground; then the hunters follow
function sceneHerbivores(t) {
  const st = WS(4, 5) - .3, w = ramp(t, WS(4, 9) - .2, WS(4, 9) + .6);
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skHv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa0b8"/><stop offset="1" stop-color="#e8d8b8"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skHv)"/>`;
  s += `<path d="M-20,820 Q200,780 400,800 T740,790 L740,880 L-20,880Z" fill="#a88a6a"/><rect y="860" width="720" height="430" fill="#c4a478" filter="url(#reliefR)"/><rect y="860" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".35"/>` + cracks(880, 1290, .7, 21, -20, 740, '#6a4a2a');
  s += quad(200, 1080, 1.1, { kind: 'cow', graze: 1 }) + quad(470, 1120, 1.2, { kind: 'cow', moving: 1, phase: t * 2.5, face: -1, col: '#b8865a' }) + quad(110, 1210, 1.15, { kind: 'horse', col: '#c8b08a' });
  s += `<g opacity="${w}">` + quad(lerp(780, 600, w), 1230, 1.3, { kind: 'wolf', moving: 1, phase: t * 6, face: -1 }) + `</g>`;
  for (let i = 0; i < 3; i++) { const a = t * .6 + i * 2.1; s += pigeon(360 + Math.cos(a) * 120, 520 + Math.sin(a) * 40, 2.2, t, i, 1); }
  F.ov = ''; return s;
}
// 5: with no roots the soil goes: bare ridges cut by branching gullies, a wall of dust over the town, then a lobed mudflow into the houses
function sceneErosion(t) {
  const dust = ease(ramp(t, WS(5, 7) - .4, WS(5, 8) + .4)), mud = ease(ramp(t, WS(5, 10) - .3, L(5).end + .3));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#6a8ab0', '#8a5a3a', dust)}"/><stop offset="1" stop-color="${mix('#e0d4c0', '#c8905a', dust)}"/></linearGradient><linearGradient id="mudG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5a38"/><stop offset="1" stop-color="#4a3420"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skE)"/>`;
  const ridge = (base, amp, seed, col) => { let d = `M-20,${base}`; for (let x = -20; x <= 760; x += 10) d += ` L${x},${(base - amp * (.55 + .45 * Math.sin(x * .011 + seed)) * (.75 + .25 * Math.sin(x * .043 + seed * 3)) - 10 * Math.sin(x * .19 + seed)).toFixed(1)}`; return `<path d="${d} L760,1010 L-20,1010Z" fill="${col}" filter="url(#reliefR)"/>`; };
  s += ridge(820, 220, 2, '#b8a088') + ridge(900, 200, 5, '#a8866a');
  const gul = (x, y, len, ang, w, depth, r) => { if (depth > 3 || len < 12) return ''; const ex = x + Math.cos(ang) * len, ey = y + Math.sin(ang) * len; let o = `<path d="M${x},${y} Q${(x + ex) / 2 + (r() - .5) * 20},${(y + ey) / 2} ${ex},${ey}" stroke="#5a3e28" stroke-width="${w}" fill="none" stroke-linecap="round" opacity=".8"/>`;
    o += gul(ex, ey, len * .7, ang + .3 + r() * .2, w * .8, depth + 1, r) + gul(x + (ex - x) * .5, y + (ey - y) * .5, len * .5, ang - .5 - r() * .3, w * .6, depth + 1, r); return o; };
  { let d = `M-20,900`; for (let x = -20; x <= 760; x += 10) d += ` L${x},${(900 - 200 * (.55 + .45 * Math.sin(x * .011 + 5)) * (.75 + .25 * Math.sin(x * .043 + 15)) - 10 * Math.sin(x * .19 + 5)).toFixed(1)}`;
    s += `<defs><clipPath id="hillC"><path d="${d} L760,1010 L-20,1010Z"/></clipPath></defs><g clip-path="url(#hillC)">`;
    for (let i = 0; i < 16; i++) { const r = RS(i + 11), x0 = r() * 720, w = 6 + r() * 10, bend = (r() - .5) * 40; s += `<path d="M${x0},600 Q${x0 + bend},820 ${x0 + bend * 1.5},1010" stroke="#4a3220" stroke-width="${w}" fill="none" opacity=".35" stroke-linecap="round"/><path d="M${x0 + w * .6},600 Q${x0 + bend + w * .6},820 ${x0 + bend * 1.5 + w * .6},1010" stroke="#e0c8a8" stroke-width="1.6" fill="none" opacity=".4"/>`; }
    s += `</g>`; }
  for (let i = 0; i < 20; i++) { const r = RS(i + 30); s += `<ellipse cx="${r() * 720}" cy="${760 + r() * 230}" rx="${6 + r() * 12}" ry="${4 + r() * 6}" fill="#7a6a5a" opacity=".8"/>`; }
  s += `<rect y="1000" width="720" height="290" fill="#b89a74"/><rect y="1000" width="720" height="290" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  [[400, 120, 130], [530, 100, 160], [640, 110, 120]].forEach(([x, w, h], i) => { s += shanasheel(x, 1070, w, h, 20 + i); });
  if (mud > 0) { const front = lerp(80, 560, mud); let edge = `M-20,900 C60,920 120,960 180,${1000}`; const lobes = 6; for (let q = 0; q <= lobes; q++) { const x = lerp(180, front, q / lobes), y = 1010 + 50 * Math.sin(q * 1.3) + 20 * Math.sin(t * 2 + q); edge += ` Q${x + 20},${y + 30} ${x + 40},${y}`; }
    s += `<path d="${edge} L${front + 40},1140 Q${front / 2},1170 -20,1150Z" fill="url(#mudG)"/><path d="${edge}" stroke="#c8a070" stroke-width="4" fill="none" opacity=".7"/>` + Array.from({ length: 10 }, (_, q) => { const r = RS(q + 80), x = r() * front, y = 1020 + r() * 110; return `<rect x="${x}" y="${y}" width="${10 + r() * 20}" height="5" fill="#3a2a1a" transform="rotate(${r() * 60},${x},${y})"/>`; }).join('');
    s += `<path d="M180,1000 C150,900 140,820 160,740" stroke="#6a4a2e" stroke-width="${30 * mud}" fill="none" opacity=".8"/>`; }
  s += `<rect x="-40" y="-40" width="800" height="1360" fill="#fff" filter="url(#dustR)" opacity="${.55 * dust}"/><rect width="720" height="1280" fill="#b87a4a" opacity="${.3 * dust}"/>`;
  for (let i = 0; i < 50; i++) { const r = RS(i + 60), y = r() * 1280, x = pmod(r() * 900 + t * (600 + r() * 400), 900) - 90; s += `<path d="M${x},${y} l-${40 + r() * 60},2" stroke="#f0c890" stroke-width="1.6" opacity="${.5 * dust}"/>`; }
  F.ov = ''; return s;
}
// 6: forests used to pump water vapour into the sky; without them the clouds stop forming inland (before | after)
function sceneRain(t) {
  const k = ease(ramp(t, WS(6, 5) - .2, WS(6, 9) + .3));
  let s = `<defs>${RDEF}<linearGradient id="skRn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7a9a"/><stop offset="1" stop-color="#d8e2e8"/></linearGradient><linearGradient id="skDr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8ad0"/><stop offset="1" stop-color="#f0e4c8"/></linearGradient><clipPath id="cL6"><rect width="358" height="1280"/></clipPath><clipPath id="cR6"><rect x="362" width="358" height="1280"/></clipPath></defs>`;
  s += `<g clip-path="url(#cL6)"><rect width="360" height="1280" fill="url(#skRn)"/>`;
  for (let i = 0; i < 5; i++) s += `<ellipse cx="${40 + i * 70}" cy="${460 + (i % 2) * 30}" rx="90" ry="40" fill="#e8ecf0" opacity=".9" filter="url(#soft)"/>`;
  for (let i = 0; i < 40; i++) { const r = RS(i + 3), x = r() * 360, y = pmod(r() * 300 + t * 600, 300) + 520; s += `<line x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 18}" stroke="#cfe0f0" stroke-width="1.5" opacity=".6"/>`; }
  for (let i = 0; i < 14; i++) { const r = RS(i + 40); s += treeB(-10 + i * 28 + r() * 10, 1000 + r() * 40, 160 + r() * 80, i + 40); }
  for (let i = 0; i < 5; i++) { const x = 40 + i * 70, ph = pmod(t * .5 + i * .2, 1); s += `<path d="M${x},${880 - ph * 300} q12,-20 0,-40 q-12,-20 0,-40" stroke="#ffffff" stroke-width="4" fill="none" opacity="${.7 * (1 - ph)}"/>`; }
  s += `<rect y="1040" width="360" height="240" fill="#4a6a2e"/><text x="180" y="1220" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">مع الغابات</text></g>`;
  s += `<g clip-path="url(#cR6)"><rect x="360" width="360" height="1280" fill="url(#skDr)"/><circle cx="600" cy="460" r="30" fill="#fffdf2"/><circle cx="600" cy="460" r="120" fill="#fff6d0" opacity=".35" filter="url(#soft)"/>`;
  s += `<path d="M360,980 Q460,940 560,960 T720,950 L720,1290 L360,1290Z" fill="#c4a478" filter="url(#reliefR)"/>` + cracks(990, 1290, 1, 5, 220, 960, '#6a4a2a').replace(/<g /, '<g clip-path="url(#cR6)" ');
  s += `<text x="540" y="1220" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بدون غابات</text></g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  F.ov = ''; return s;
}
// 7: carbon dioxide climbs with nothing to absorb it – a gauge rises over a hot, hazy city
function sceneCO2(t) {
  const k = ease(ramp(t, WS(7, 0), L(7).end + .2));
  let s = bareStreet(t, { id: 'c7', green: 0, sky: [mix('#4a86c6', '#c89a6a', k), mix('#92bce0', '#e8c090', k), mix('#d2e4f0', '#f4dcb0', k)] });
  s += `<rect width="720" height="1280" fill="#ff9a4a" opacity="${.12 * k}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${940 + i * 20} q180,${Math.sin(t * 4 + i) * 6} 380,0 t380,0" stroke="#fff" stroke-width="2" fill="none" opacity="${.15 * k}"/>`).join('');
  const v = Math.round(lerp(420, 800, k));
  s += `<g><rect x="190" y="420" width="340" height="140" rx="20" fill="#0a0e1c" opacity=".82"/><text x="360" y="466" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#cfd8ff">ثاني أكسيد الكربون ↑</text><rect x="220" y="490" width="280" height="26" rx="10" fill="#2a3046"/><rect x="220" y="490" width="${280 * (.35 + .65 * k)}" height="26" rx="10" fill="${mix('#f4c76b', '#e53935', k)}"/></g>`;
  s += person(300, 1180, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .2 });
  F.ov = ''; return s;
}
// 8: from space: the green continents fade to a dull brown, like another planet
function sceneSpace(t) {
  const st = S0(8) - .2, k = ease(ramp(t, WS(8, 2) - .3, WS(8, 7) + .3)), rot = 4.7 + (t - st) * .08 - t * .03;
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 760, r: 260, a: 1 - k, sunI: 1.05, lights: .2, rot, tilt: .3 }; F.moon = { x: 360, y: 760, r: 260, a: k, sunI: 1.05, rot, tilt: .3 }; F.light = [250, 650];
  F.ov = `<circle cx="360" cy="760" r="268" fill="none" stroke="#7ab4ff" stroke-width="6" opacity="${.35 * k}" filter="url(#blur2)"/>`; return s;
}
// 9: CTA over the living Earth
function sceneEarth(t) {
  const st = S0(9), k = ease(ramp(t, WS(9, 8) - .2, WS(9, 8) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: 1, lights: .3, rot: 4.9, tilt: .41 }; F.light = [-600, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 9), WS(9, 9) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMorning }, { s: S0(2) - .2, f: sceneOxygen }, { s: S0(3) - .2, f: sceneFood }, { s: S0(4) - .2, f: sceneMarket },
  { s: WS(4, 5) - .3, f: sceneHerbivores }, { s: S0(5) - .2, f: sceneErosion }, { s: S0(6) - .2, f: sceneRain }, { s: S0(7) - .2, f: sceneCO2 }, { s: S0(8) - .2, f: sceneSpace }, { s: S0(9) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['اليوم الأول', S0(1)], ['الطعام', S0(3)], ['أسابيع', S0(4)], ['التربة', S0(5)], ['المطر', S0(6)], ['الحرارة', S0(7)]];
const LIST_ON = new Set([sceneMorning, sceneErosion]);
const CHIPS = [
  ['c1', 'لا أشجار… لا نخيل', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'لن نختنق فوراً', 360, 330, 'big', WS(2, 2), S0(3) - .3],
  ['c3', 'كل طعامنا من النبات', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'رفوف فارغة', 360, 330, 'red', WS(4, 2), WS(4, 5) - .3],
  ['c5', 'العاشبة… ثم المفترسة', 360, 330, 'big', WS(4, 6), S0(5) - .3],
  ['c6', 'عواصف غبار', 360, 330, 'big', WS(5, 7), WS(5, 10)],
  ['c7', 'سيول من الطين', 360, 330, 'red', WS(5, 10), S0(6) - .3],
  ['c8', 'مطر أقل', 360, 330, 'big', WS(6, 1), S0(7) - .3],
  ['c9', 'كوكب بنّي', 360, 330, 'big', WS(8, 6), S0(9) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 11), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:320px"><div class="hd">بلا نباتات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 42; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 42) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
