// ===================== Weird Space Lab: What if every insect on Earth disappeared? =====================
function flower(x, y, h, col, t, i = 0) {
  const sw = Math.sin(t * 1.4 + i) * 3, hx = x + sw;
  return `<path d="M${x},${y} Q${x + sw * .5},${y - h * .5} ${hx},${y - h}" stroke="#3a7a2a" stroke-width="4" fill="none"/><ellipse cx="${x + 8}" cy="${y - h * .4}" rx="12" ry="5" fill="#4a8a32" transform="rotate(-30,${x + 8},${y - h * .4})"/>` +
    Array.from({ length: 6 }, (_, k) => { const a = k / 6 * Math.PI * 2; return `<ellipse cx="${hx + Math.cos(a) * 11}" cy="${y - h + Math.sin(a) * 11}" rx="10" ry="7" fill="${col}" transform="rotate(${a * 57.3},${hx + Math.cos(a) * 11},${y - h + Math.sin(a) * 11})"/>`; }).join('') + `<circle cx="${hx}" cy="${y - h}" r="7" fill="#f4c74a"/>`;
}
function bee(x, y, s, t) {
  const f = Math.sin(t * 60) * .5 + .5;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="-4" cy="-12" rx="9" ry="${4 + 5 * f}" fill="#e8f4ff" opacity=".8"/><ellipse cx="6" cy="-12" rx="9" ry="${4 + 5 * f}" fill="#e8f4ff" opacity=".8"/>` +
    `<ellipse cx="0" cy="0" rx="16" ry="11" fill="#f4c03a"/><rect x="-6" y="-11" width="5" height="22" fill="#222"/><rect x="4" y="-10" width="5" height="20" fill="#222"/><circle cx="16" cy="-2" r="7" fill="#222"/><path d="M-16,0 L-23,2 L-16,4Z" fill="#222"/></g>`;
}
function fly(x, y, s, t, col = '#e0662a') {
  const f = Math.abs(Math.sin(t * 9));
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 Q-26,${-30 * f} -30,${-6 * f} Q-22,${10} 0,0Z" fill="${col}"/><path d="M0,0 Q26,${-30 * f} 30,${-6 * f} Q22,10 0,0Z" fill="${col}"/><path d="M0,0 Q-18,${18 * f} -14,22 Q-6,12 0,0Z" fill="${mix(col, '#000000', .3)}"/><path d="M0,0 Q18,${18 * f} 14,22 Q6,12 0,0Z" fill="${mix(col, '#000000', .3)}"/><rect x="-2" y="-12" width="4" height="26" rx="2" fill="#2a1a10"/></g>`;
}
function meadow(t, id, insects = 1) {
  let s = `<defs><linearGradient id="md${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset=".6" stop-color="${SKY[1]}"/><stop offset="1" stop-color="${SKY[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#md${id})"/>`;
  s += `<circle cx="150" cy="470" r="30" fill="#fffdf2"/><circle cx="150" cy="470" r="150" fill="#fff6d0" opacity=".28" filter="url(#soft)"/>`;
  s += `<path d="M-20,860 Q180,760 380,830 T760,800 L760,1300 L-20,1300Z" fill="#6aa04a"/><path d="M-20,940 Q220,880 420,930 T760,910 L760,1300 L-20,1300Z" fill="#5a9a3a"/><rect y="980" width="720" height="300" fill="#4a8a32"/><rect y="860" width="720" height="420" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  const r = RS(12); for (let i = 0; i < 26; i++) s += flower(20 + r() * 680, 1000 + r() * 260, 60 + r() * 80, ['#f4f4f0', '#e84a8a', '#a86ae0', '#f4a03a'][i % 4], t, i);
  if (insects > 0) { let b = ''; for (let i = 0; i < 6; i++) { const rr = RS(i + 50), cx = 100 + rr() * 520, cy = 820 + rr() * 300; b += bee(cx + Math.sin(t * (1 + rr()) + i) * 60, cy + Math.sin(t * 2.3 + i * 2) * 30, .9, t); }
    for (let i = 0; i < 3; i++) { const rr = RS(i + 70); b += fly(120 + rr() * 480 + Math.sin(t * .8 + i) * 80, 760 + rr() * 200 + Math.cos(t + i) * 40, .9, t + i, ['#e0662a', '#7a5ae0', '#f4c03a'][i]); }
    s += `<g opacity="${insects}">${b}</g>`; }
  return s;
}
// 0: a meadow full of bees and butterflies; on "disappeared" they vanish
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 6) - .1, WS(0, 6) + .4));
  let s = meadow(t, 0, 1 - k);
  F.ov = k > 0 && k < 1 ? Array.from({ length: 9 }, (_, i) => { const rr = RS(i + 50); return `<circle cx="${100 + rr() * 520}" cy="${820 + rr() * 300}" r="${10 + 30 * k}" fill="none" stroke="#fff" stroke-width="3" opacity="${1 - k}"/>`; }).join('') : '';
  return s;
}
// 1: three out of four of our main food crops depend partly on pollinators
function scenePollinate(t) {
  const k = ease(ramp(t, WS(1, 6) - .2, WS(1, 14)));
  let s = meadow(t, 1, 1) + `<rect width="720" height="1280" fill="#000" opacity="${.45 * k}"/>`;
  const cx = 360, cy = 760, R = 150, a = .75 * k * Math.PI * 2;
  F.ov = `<g opacity="${k}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="44"/>` +
    `<path d="M${cx},${cy - R} A${R},${R} 0 ${a > Math.PI ? 1 : 0},1 ${cx + Math.sin(a) * R},${cy - Math.cos(a) * R}" stroke="#f4c76b" stroke-width="44" fill="none"/>` + EN('3 of 4', cx, cy + 4, 56, '#fff') + EN('main food crops', cx, cy + 44, 22, 'rgba(255,255,255,.75)', 'middle', 500) + `</g>`;
  return s;
}
// 2: apples, almonds, coffee, chocolate – rare and expensive
function sceneMarket(t) {
  const p = ease(ramp(t, WS(2, 6), WS(2, 9) + .3));
  let s = `<rect width="720" height="1280" fill="#2a1e16"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  const items = [['Apples', 190, 640, WS(2, 0)], ['Almonds', 530, 640, WS(2, 1)], ['Coffee', 190, 960, WS(2, 2)], ['Chocolate', 530, 960, WS(2, 4)]];
  items.forEach(([n, x, y, ts], i) => { const a = ease(ramp(t, ts - .2, ts + .2));
    s += `<g opacity="${a}"><rect x="${x - 150}" y="${y - 130}" width="300" height="250" rx="18" fill="#3a2a1e" stroke="#5a4232" stroke-width="3"/><rect x="${x - 150}" y="${y + 80}" width="300" height="40" fill="#5a3e28"/>`;
    if (i === 0) s += [[-50, 10], [0, 30], [50, 10], [-25, -30], [25, -30]].map(([dx, dy]) => `<circle cx="${x + dx}" cy="${y + dy}" r="30" fill="#c62828"/><circle cx="${x + dx - 9}" cy="${y + dy - 10}" r="8" fill="#fff" opacity=".35"/><path d="M${x + dx},${y + dy - 28} q4,-14 14,-16" stroke="#4a8a32" stroke-width="5" fill="none"/>`).join('');
    if (i === 1) s += Array.from({ length: 12 }, (_, q) => { const rr = RS(q + 5); return `<ellipse cx="${x - 70 + rr() * 140}" cy="${y - 30 + rr() * 80}" rx="22" ry="12" fill="#b07a4a" transform="rotate(${rr() * 180},${x - 70 + rr() * 140},${y - 30 + rr() * 80})"/>`; }).join('');
    if (i === 2) s += `<path d="M${x - 50},${y - 20} L${x + 50},${y - 20} L${x + 40},${y + 60} L${x - 40},${y + 60}Z" fill="#f4f0e6"/><path d="M${x + 48},${y - 4} q30,6 0,40" stroke="#f4f0e6" stroke-width="8" fill="none"/><ellipse cx="${x}" cy="${y - 20}" rx="50" ry="10" fill="#4a2a14"/>` + [[-90, 40], [80, 50], [-80, -60], [90, -50]].map(([dx, dy]) => `<ellipse cx="${x + dx}" cy="${y + dy}" rx="12" ry="8" fill="#5a3218"/>`).join('');
    if (i === 3) s += `<rect x="${x - 80}" y="${y - 50}" width="160" height="110" rx="6" fill="#5a2e18"/>` + Array.from({ length: 6 }, (_, q) => `<rect x="${x - 72 + (q % 3) * 52}" y="${y - 42 + Math.floor(q / 3) * 52}" width="44" height="44" rx="4" fill="#6a3a20"/>`).join('');
    s += EN(n, x, y + 108, 24, '#fff');
    const price = ['$1', '$3', '$8', '$25'][Math.min(3, Math.floor(p * 3.99))];
    s += `<g transform="translate(${x + 110},${y - 120}) rotate(12)"><rect x="-40" y="-22" width="80" height="44" rx="8" fill="${mix('#f4f0e6', '#d64040', p)}"/>` + EN(price, 0, 10, 26, p > .5 ? '#fff' : '#222', 'middle', 800) + `</g></g>`; });
  F.ov = ''; return s;
}
// 3: wheat, rice and corn are pollinated by the wind
function wheat(x, y, h, t, i) { const sw = Math.sin(t * 2 + i) * 10; let s = `<path d="M${x},${y} Q${x + sw * .4},${y - h * .5} ${x + sw},${y - h}" stroke="#c8a24a" stroke-width="4" fill="none"/>`; for (let k = 0; k < 7; k++) s += `<ellipse cx="${x + sw + (k % 2 ? 6 : -6)}" cy="${y - h + k * 9}" rx="6" ry="10" fill="#e8c46a" transform="rotate(${k % 2 ? 25 : -25},${x + sw},${y - h + k * 9})"/>`; return s; }
function corn(x, y, h, t, i) { const sw = Math.sin(t * 2 + i) * 6; return `<path d="M${x},${y} L${x + sw},${y - h}" stroke="#5a9a3a" stroke-width="9"/><path d="M${x},${y - h * .5} q-50,-10 -70,30" stroke="#6aaa4a" stroke-width="10" fill="none"/><path d="M${x},${y - h * .65} q50,-10 70,30" stroke="#6aaa4a" stroke-width="10" fill="none"/><ellipse cx="${x + 14}" cy="${y - h * .45}" rx="12" ry="34" fill="#f4d04a"/><path d="M${x + sw},${y - h} l-10,-30 M${x + sw},${y - h} l10,-28 M${x + sw},${y - h} l0,-34" stroke="#c8a24a" stroke-width="3"/>`; }
function sceneWind(t) {
  let s = `<rect width="720" height="1280" fill="${SKY[1]}"/><rect y="1000" width="720" height="280" fill="#8a6a3a"/>` + wPanel(30, 470, 210, 560, 'WHEAT') + wPanel(255, 470, 210, 560, 'RICE') + wPanel(480, 470, 210, 560, 'CORN');
  for (let i = 0; i < 4; i++) s += wheat(80 + i * 36, 990, 260, t, i);
  for (let i = 0; i < 4; i++) { const x = 300 + i * 36, sw = Math.sin(t * 2 + i) * 8; s += `<path d="M${x},990 Q${x + sw},${850} ${x + sw * 2},${790}" stroke="#7aaa4a" stroke-width="4" fill="none"/>` + Array.from({ length: 8 }, (_, k) => `<circle cx="${x + sw * 2 + k * 3}" cy="${790 + k * 10}" r="4.5" fill="#e8d88a"/>`).join(''); }
  for (let i = 0; i < 2; i++) s += corn(540 + i * 80, 990, 330, t, i);
  let w = ''; const r = RS(4); for (let i = 0; i < 24; i++) { const y = 480 + r() * 520, x = ((t * 300 * (.6 + r()) + r() * 900) % 900) - 100; w += `<path d="M${x},${y} q30,-8 60,0" stroke="#fff" stroke-width="2.5" fill="none" opacity="${.5 * ramp(t, S0(3) - .2, WS(3, 9))}"/>`; }
  F.ov = w; return s;
}
// 4: insect-eaters starve
function animal(kind, x, y, t) {
  if (kind === 0) return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="46" ry="30" fill="#5a7aa0"/><circle cx="34" cy="-22" r="20" fill="#5a7aa0"/><path d="M52,-22 l18,6 l-18,4Z" fill="#f4a03a"/><circle cx="40" cy="-26" r="4" fill="#111"/><path d="M-10,-10 q-30,-40 -60,-10 q30,0 40,20Z" fill="#3a5a80"/><path d="M-40,8 l-30,10 l30,4Z" fill="#3a5a80"/></g>`;
  if (kind === 1) return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="10" rx="52" ry="32" fill="#5aa04a"/><circle cx="-24" cy="-22" r="16" fill="#5aa04a"/><circle cx="24" cy="-22" r="16" fill="#5aa04a"/><circle cx="-24" cy="-24" r="8" fill="#111"/><circle cx="24" cy="-24" r="8" fill="#111"/><path d="M-30,12 q30,18 60,0" stroke="#2a5a2a" stroke-width="4" fill="none"/></g>`;
  if (kind === 2) { const f = Math.sin(t * 8) * 10; return `<g transform="translate(${x},${y})"><path d="M0,0 Q-40,${-30 - f} -80,${-10 - f} Q-60,10 -50,20 Q-30,10 0,10 Q30,10 50,20 Q60,10 80,${-10 - f} Q40,${-30 - f} 0,0Z" fill="#2a2430"/><ellipse cx="0" cy="4" rx="14" ry="20" fill="#3a3440"/><path d="M-8,-12 l-4,-12 l8,6 M8,-12 l4,-12 l-8,6" fill="#3a3440" stroke="#3a3440" stroke-width="3"/></g>`; }
  return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="0" rx="50" ry="24" fill="#e0884a"/><path d="M-46,0 l-30,-24 l0,48Z" fill="#c86a2a"/><circle cx="30" cy="-6" r="5" fill="#111"/><path d="M0,-22 q10,-16 24,-6" stroke="#c86a2a" stroke-width="6" fill="none"/></g>`;
}
function sceneStarve(t) {
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t);
  const P = [[190, 620, WS(4, 0)], [530, 620, WS(4, 1)], [190, 960, WS(4, 2)], [530, 960, WS(4, 4)]];
  P.forEach(([x, y, ts], i) => { const a = ease(ramp(t, ts - .2, ts + .2)), x2 = ease(ramp(t, WS(4, 8), WS(4, 11) + .2));
    s += `<g opacity="${a}">` + wPanel(x - 150, y - 140, 300, 260, '') + animal(i, x, y - 10 + Math.sin(t * 2 + i) * 4, t) + `<g transform="translate(${x + 100},${y + 80})">${bee(0, 0, .8, t)}<path d="M-26,-26 L26,26 M26,-26 L-26,26" stroke="#d64040" stroke-width="7" opacity="${x2}"/></g>` + EN(['Birds', 'Frogs', 'Bats', 'Fish'][i], x - 120, y + 100, 22, '#fff', 'start') + `</g>`; });
  F.ov = ''; return s;
}
// 5: decomposers gone: dead leaves, dung and logs pile up; the soil fades
function sceneRot(t) {
  const st = S0(5) - .2, p = ease(ramp(t, WS(5, 10), L(5).end + .3)), soil = ease(ramp(t, WS(5, 18), WS(5, 22) + .3));
  let s = `<rect width="720" height="1280" fill="#5a7a5a"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${i * 130 - 20}" y="400" width="${40 + (i % 3) * 14}" height="560" fill="#3a2a1e"/>`;
  s += `<rect y="900" width="720" height="380" fill="${mix('#3a2614', '#8a8070', soil)}"/><rect y="900" width="720" height="380" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  if (soil < 1) s += Array.from({ length: 10 }, (_, i) => { const rr = RS(i + 3); return `<path d="M${rr() * 720},${980 + rr() * 260} q20,-10 40,0 t40,0" stroke="#c87a8a" stroke-width="6" fill="none" opacity="${1 - soil}"/>`; }).join('');
  s += `<rect x="80" y="860" width="320" height="56" rx="26" fill="#6a4a2e"/><circle cx="400" cy="888" r="28" fill="#8a6a4a"/><circle cx="400" cy="888" r="16" fill="none" stroke="#5a3a20" stroke-width="3"/>`;
  const n = Math.floor(30 + p * 220), r = RS(7); let lv = '';
  for (let i = 0; i < n; i++) { const x = r() * 720, h = Math.min(1, i / 250), y = 905 - r() * 30 - h * 90 * r(); lv += `<ellipse cx="${x}" cy="${y}" rx="14" ry="6" fill="${['#a8742a', '#8a5a2a', '#c8943a', '#6a4a2a'][i % 4]}" transform="rotate(${r() * 180},${x},${y})"/>`; }
  s += lv;
  F.ov = `<g opacity="${soil}">` + EN('poorer soil', 360, 1180, 30, '#fff') + `</g>`; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = bee(360 + Math.sin(t * 1.3) * 120, 560 + Math.sin(t * 2.1) * 30, 1.6, t) + endCard(t, WS(6, 0), WS(6, 7)); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePollinate }, { s: S0(2) - .2, f: sceneMarket }, { s: S0(3) - .2, f: sceneWind }, { s: S0(4) - .2, f: sceneStarve },
  { s: S0(5) - .2, f: sceneRot }, { s: S0(6) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Pollination', S0(1)], ['Food prices', S0(2)], ['Food chains', S0(4)], ['Soil', S0(5)]];
const LIST_ON = new Set([scenePollinate]);
const CHIPS = [
  ['c1', 'Rare and expensive', 360, 330, 'red', WS(2, 7), S0(3) - .3],
  ['c2', 'Pollinated by the wind', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c3', 'Insect-eaters starve', 360, 330, 'red', WS(4, 10), S0(5) - .3],
  ['c4', 'Waste rots much more slowly', 360, 330, 'big', WS(5, 12), S0(6) - .3],
  ['c5', 'Weird Space Lab', 360, 1200, 'dark', WS(6, 7), 999],
];
setupUI('NO INSECTS', TLI, CHIPS);
