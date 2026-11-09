// ===================== Weird Space Lab: What if every mosquito vanished? =====================
// a mosquito seen from the side: thin striped abdomen, humped thorax, long legs, proboscis and see-through wings
function mosq(x, y, s, t, rot = 0, col = '#3a3430') {
  const f = Math.sin(t * 70) * .5 + .5;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">` +
    [[-6, 2, -40, 34], [0, 4, -10, 40], [6, 4, 26, 38], [-4, 2, -52, 20], [4, 3, 44, 22], [8, 2, 58, 30]].map(([a, b, c, d]) => `<path d="M${a},${b} Q${(a + c) / 2},${b + d * .3 - 14} ${c},${d}" stroke="${col}" stroke-width="1.6" fill="none"/>`).join('') +
    `<ellipse cx="-4" cy="-14" rx="${26}" ry="${6 + 4 * f}" fill="#dfe8f0" opacity=".55" transform="rotate(${-20 + f * 20},-4,-4)"/>` +
    `<ellipse cx="-30" cy="2" rx="26" ry="5.5" fill="${col}" transform="rotate(10,-30,2)"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${-48 + i * 8}" y="-1" width="3" height="9" fill="#d8d0c0" opacity=".7" transform="rotate(10,-30,2)"/>`).join('') +
    `<ellipse cx="2" cy="-2" rx="11" ry="9" fill="${col}"/><circle cx="14" cy="-2" r="6" fill="${col}"/><circle cx="16" cy="-4" r="3" fill="#6a2a2a"/><path d="M19,0 L42,8" stroke="${col}" stroke-width="1.8"/><path d="M17,-6 l12,-10 M17,-5 l14,-6" stroke="${col}" stroke-width="1.2"/></g>`;
}
function swarm(t, n, cx, cy, R, k = 1, seed = 3, s = .9) {
  if (k <= .01) return ''; const r = RS(seed); let o = '';
  for (let i = 0; i < n; i++) { const a = t * (.8 + r()) + r() * 6.28, rr = R * (.3 + .7 * r()); o += mosq(cx + Math.cos(a) * rr, cy + Math.sin(a * 1.3) * rr * .6, s * (.7 + .5 * r()), t + i, Math.sin(t * 3 + i) * 15); }
  return `<g opacity="${k}">${o}</g>`;
}
// 0: a warm evening street with mosquitoes buzzing around a person; on "vanished" they're gone
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 6) - .1, WS(0, 6) + .4));
  let s = wStreet(t, { id: 'm0', sky: ['#2a3a6a', '#c87a5a', '#f4c08a'], sunGlow: .1, lamps: 1 }) + `<rect width="720" height="1280" fill="#1a1030" opacity=".25"/>`;
  s += castSh(360, 1090, .6) + onWalk(360, 1090, CROWD[1], .6, 1, t, { lookUp: .3 });
  F.ov = swarm(t, 9, 380, 840, 150, 1 - k, 3, 1.1) + (k > 0 && k < 1 ? Array.from({ length: 9 }, (_, i) => { const r = RS(i + 30); return `<circle cx="${250 + r() * 260}" cy="${760 + r() * 160}" r="${8 + 26 * k}" fill="none" stroke="#fff" stroke-width="2" opacity="${1 - k}"/>`; }).join('') : '');
  F.flash = 0; return s;
}
// 1: the deadliest animal for humans – malaria alone kills about 600,000 people a year
function sceneDeadly(t) {
  const k = ease(ramp(t, WS(1, 11) - .2, WS(1, 18))), n = Math.round(597000 * k);
  let s = space(t, '#03050f', '#0a1030'); F.earth = { x: 360, y: 1170, r: 300, a: 1, sunI: 1, lights: .3, rot: 2.6 + t * .03, tilt: .3 }; F.light = [-600, 700]; F.moon = null;
  F.ov = mosq(360, 560, 4.2, t, 0) + `<g opacity="${ease(ramp(t, WS(1, 6), WS(1, 8)))}">` + EN(n.toLocaleString('en-US'), 360, 770, 64, '#fff', 'middle', 800) + EN('deaths from malaria, every year', 360, 812, 24, 'rgba(255,255,255,.75)', 'middle', 500) + `</g>`;
  F.flash = 0; return s;
}
// 2: dengue, Zika, yellow fever – hundreds of millions of people sick each year
function sceneDiseases(t) {
  const items = [['Malaria', WS(2, 0), '#c62828'], ['Dengue', WS(2, 1), '#d9822b'], ['Zika', WS(2, 2), '#8a4ac0'], ['Yellow fever', WS(2, 4), '#c8a02a']];
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t);
  items.forEach(([n, ts, c], i) => { const a = ease(ramp(t, ts - .2, ts + .2)), x = 190 + (i % 2) * 340, y = 600 + Math.floor(i / 2) * 230;
    s += `<g opacity="${a}"><rect x="${x - 150}" y="${y - 90}" width="300" height="180" rx="20" fill="${c}" opacity=".85"/>` + Array.from({ length: 7 }, (_, q) => { const r = RS(q + i * 9); return `<circle cx="${x - 110 + r() * 220}" cy="${y - 50 + r() * 60}" r="${6 + r() * 10}" fill="#fff" opacity=".18"/>`; }).join('') + EN(n, x, y + 56, 34, '#fff', 'middle', 800) + `</g>`; });
  F.ov = `<g opacity="${ease(ramp(t, WS(2, 9), WS(2, 11)))}">` + EN('hundreds of millions sick / year', 360, 1110, 30, '#f4c76b', 'middle', 800) + `</g>`; F.flash = 0; return s;
}
// 3: 3,500+ kinds of mosquito – only a small fraction bite people
function sceneKinds(t) {
  const k = ease(ramp(t, WS(3, 3), WS(3, 11))), h = ease(ramp(t, WS(3, 13), WS(3, 18)));
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t);
  let g = ''; const N = 140, r = RS(9); for (let i = 0; i < N; i++) { const col = i % 14, row = Math.floor(i / 14), x = 70 + col * 44, y = 520 + row * 58; if (i / N > k) continue;
    const bite = r() < .06; g += `<g opacity="${bite ? 1 : 1 - .65 * h}">${mosq(x, y, .55, t + i * .1, 0, bite && h > .1 ? '#c62828' : '#cfc8bc')}</g>`; }
  F.ov = g + `<g opacity="${k}">` + EN('3,500+ species', 360, 1150, 40, '#fff', 'middle', 800) + `</g><g opacity="${h}">` + EN('red = the ones that bite people', 360, 1195, 22, '#ff8a8a', 'middle', 500) + `</g>`; F.flash = 0; return s;
}
// 4: larvae feed fish and frogs, and some adults pollinate flowers
function scenePond(t) {
  const p = ease(ramp(t, WS(4, 6), WS(4, 11)));
  let s = `<defs><linearGradient id="pnd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ab8e0"/><stop offset=".45" stop-color="#cfe0d0"/><stop offset=".46" stop-color="#3a7a8a"/><stop offset="1" stop-color="#0a2a3a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#pnd)"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M${i * 100 - 20},590 q30,-120 ${20 + (i % 3) * 10},-200" stroke="#4a8a3a" stroke-width="6" fill="none"/>`;
  // larvae wriggling just under the surface
  const r = RS(4); for (let i = 0; i < 14; i++) { const x = 60 + r() * 600, y = 640 + r() * 140, w = Math.sin(t * 6 + i) * 6; s += `<path d="M${x},${y} q${w},12 0,24 q${-w},12 0,24" stroke="#d8d0b0" stroke-width="3" fill="none"/>`; }
  // a fish nosing toward them
  const fx = 760 - ((t * 60) % 900); s += `<g transform="translate(${fx},860)"><ellipse rx="60" ry="26" fill="#e0884a"/><path d="M56,0 l34,-24 l0,48Z" fill="#c86a2a"/><circle cx="-36" cy="-6" r="5" fill="#111"/></g>`;
  s += `<ellipse cx="160" cy="600" rx="90" ry="20" fill="#3a8a3a"/><g transform="translate(160,580) scale(.8)"><ellipse rx="54" ry="34" fill="#5aa04a"/><circle cx="-22" cy="-30" r="14" fill="#5aa04a"/><circle cx="22" cy="-30" r="14" fill="#5aa04a"/><circle cx="-22" cy="-32" r="7" fill="#111"/><circle cx="22" cy="-32" r="7" fill="#111"/></g>`;
  // a flower above the water with a mosquito on it
  F.ov = `<g opacity="${p}"><path d="M560,590 q10,-90 0,-170" stroke="#4a8a3a" stroke-width="6" fill="none"/>` + Array.from({ length: 6 }, (_, q) => { const a = q / 6 * Math.PI * 2; return `<ellipse cx="${560 + Math.cos(a) * 24}" cy="${420 + Math.sin(a) * 24}" rx="20" ry="13" fill="#f4f4f0" transform="rotate(${a * 57.3},${560 + Math.cos(a) * 24},${420 + Math.sin(a) * 24})"/>`; }).join('') + `<circle cx="560" cy="420" r="14" fill="#f4c74a"/>` + mosq(560, 400, 1.6, t, -10) + `</g>`;
  F.flash = 0; return s;
}
// 5: nature would mostly adapt – other insects fill the gap
function dragonfly(x, y, s, t) { const f = Math.sin(t * 40) * 6; return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-60" y="-3" width="80" height="6" rx="3" fill="#2a8a9a"/><circle cx="26" cy="0" r="9" fill="#2a6a7a"/><ellipse cx="0" cy="${-14 - f}" rx="30" ry="8" fill="#dff4ff" opacity=".7"/><ellipse cx="0" cy="${14 + f}" rx="30" ry="8" fill="#dff4ff" opacity=".7"/><ellipse cx="-10" cy="${-12 - f}" rx="26" ry="7" fill="#dff4ff" opacity=".6"/><ellipse cx="-10" cy="${12 + f}" rx="26" ry="7" fill="#dff4ff" opacity=".6"/></g>`; }
function sceneAdapt(t) {
  let s = `<defs><linearGradient id="mdw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset="1" stop-color="${SKY[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#mdw)"/>` +
    `<path d="M-20,900 Q200,820 400,880 T760,860 L760,1300 L-20,1300Z" fill="#5a9a3a"/><rect y="960" width="720" height="320" fill="#4a8a32"/>`;
  const k = ease(ramp(t, WS(5, 7), WS(5, 13)));
  let o = ''; for (let i = 0; i < 5; i++) { const r = RS(i + 60); o += dragonfly(120 + r() * 480 + Math.sin(t * (1 + r()) + i) * 60, 600 + r() * 300 + Math.cos(t * 1.4 + i) * 30, 1.6, t + i); }
  for (let i = 0; i < 6; i++) { const r = RS(i + 80), x = 100 + r() * 520 + Math.sin(t * 1.7 + i * 2) * 50, y = 700 + r() * 300; o += `<g transform="translate(${x},${y}) scale(2.2)"><ellipse rx="9" ry="6" fill="#f4c03a"/><rect x="-3" y="-6" width="3" height="12" fill="#222"/><ellipse cx="-2" cy="-8" rx="6" ry="4" fill="#fff" opacity=".7"/></g>`; }
  F.ov = `<g opacity="${.3 + .7 * k}">${o}</g>`; F.flash = 0; return s;
}
// 6: researchers test ways to remove only the species that spread disease
function sceneLab(t) {
  const k = ease(ramp(t, WS(6, 7), WS(6, 13)));
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.2, t) + wPanel(40, 470, 640, 700, 'LAB');
  let helix = ''; for (let i = 0; i < 24; i++) { const y = 540 + i * 22, ph = t * 2 + i * .45, x1 = 360 + Math.sin(ph) * 80, x2 = 360 - Math.sin(ph) * 80;
    helix += `<path d="M${x1},${y} L${x2},${y}" stroke="rgba(255,255,255,.25)" stroke-width="2"/><circle cx="${x1}" cy="${y}" r="6" fill="#7ab4ff"/><circle cx="${x2}" cy="${y}" r="6" fill="#f4c76b"/>`; }
  s += helix;
  F.ov = `<g opacity="${k}">` + mosq(170, 1080, 1.6, t, 0, '#c62828') + `<path d="M120,1040 L220,1120 M220,1040 L120,1120" stroke="#e53935" stroke-width="8"/>` + EN('disease carriers', 170, 1160, 20, '#fff') +
    mosq(550, 1080, 1.6, t + 1, 0, '#cfc8bc') + `<path d="M520,1080 l20,22 l40,-46" stroke="#4ade80" stroke-width="8" fill="none"/>` + EN('the rest', 550, 1160, 20, '#fff') + `</g>`;
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = mosq(360 + Math.sin(t * 1.3) * 140, 560 + Math.sin(t * 2.3) * 30, 2.2, t) + endCard(t, WS(7, 0), WS(7, 6)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneDeadly }, { s: S0(2) - .2, f: sceneDiseases }, { s: S0(3) - .2, f: sceneKinds }, { s: S0(4) - .2, f: scenePond },
  { s: S0(5) - .2, f: sceneAdapt }, { s: S0(6) - .2, f: sceneLab }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Diseases', S0(1)], ['3,500 species', S0(3)], ['Food chains', S0(4)], ['Nature adapts', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'Deadliest animal for humans', 360, 330, 'red', WS(1, 2), S0(2) - .3],
  ['c2', 'Hundreds of millions sick', 360, 330, 'red', WS(2, 9), S0(3) - .3],
  ['c3', 'Only a few bite people', 360, 330, 'big', WS(3, 15), S0(4) - .3],
  ['c4', 'Food for fish & frogs', 360, 330, 'big', WS(4, 3), WS(4, 9) - .2],
  ['c4b', 'Some pollinate flowers', 360, 330, 'big', WS(4, 9), S0(5) - .3],
  ['c5', 'Nature would mostly adapt', 360, 330, 'big', WS(5, 5), S0(6) - .3],
  ['c6', 'Remove only the dangerous ones', 360, 330, 'dark', WS(6, 7), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 6), 999],
];
setupUI('NO MOSQUITOES', TLI, CHIPS);
