function sea(t, deep = 0, id = 'o') {
  const top = mix('#1a6a9a', '#06142a', deep), bot = mix('#0a2a4a', '#02060e', deep);
  let s = `<defs><linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sea${id})"/>`;
  // light shafts from the surface
  for (let i = 0; i < 6; i++) { const x = 60 + i * 120 + Math.sin(t * .4 + i) * 30; s += `<path d="M${x - 30},0 L${x + 30},0 L${x + 160},1100 L${x + 40},1100Z" fill="#bfe8ff" opacity="${(.06 + .03 * Math.sin(t + i)) * (1 - deep)}"/>`; }
  // drifting particles
  const r = RS(13); for (let i = 0; i < 60; i++) { const x = (r() * 720 + t * 6 * (r() - .5)) % 720, y = (r() * 1280 - t * 10 * r() + 1280) % 1280; s += `<circle cx="${x}" cy="${y}" r="${.8 + r() * 1.8}" fill="#dff4ff" opacity="${.15 + .25 * r()}"/>`; }
  // sea floor
  s += `<path d="M-20,1110 Q160,1070 360,1100 T740,1090 L740,1300 L-20,1300Z" fill="${mix('#6a5a3a', '#1a1a1e', deep)}"/><path d="M-20,1110 Q160,1070 360,1100 T740,1090 L740,1300 L-20,1300Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  [[90, 1105, 60], [560, 1095, 80], [660, 1112, 40]].forEach(([x, y, w]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * .45}" fill="${mix('#5a5a52', '#141418', deep)}"/><ellipse cx="${x - w * .3}" cy="${y - w * .15}" rx="${w * .4}" ry="${w * .16}" fill="#fff" opacity=".08"/>`; });
  return s;
}
// ===================== Weird Space Lab: What if humans could breathe underwater? =====================
// a realistic fish: tapered body with a darker back, silvery belly, scale pattern, a gill cover that opens and shows red gills
function fish(x, y, s, t, o = {}) {
  const g = o.gill ?? (.5 + .5 * Math.sin(t * 5)), tail = Math.sin(t * 6) * 8, id = 'fg' + Math.round(x) + Math.round(y);
  let f = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5a6a"/><stop offset=".55" stop-color="#9ab0b8"/><stop offset="1" stop-color="#e8eef0"/></linearGradient></defs>`;
  f += `<g transform="translate(${x},${y}) scale(${s})"><path d="M130,0 L170,${-40 + tail} L160,0 L170,${40 + tail}Z" fill="#4a6a7a"/>` +
    `<path d="M-140,0 C-120,-50 40,-62 140,-10 L140,10 C40,62 -120,50 -140,0Z" fill="url(#${id})"/>` +
    Array.from({ length: 40 }, (_, i) => { const cx = -90 + (i % 10) * 22, cy = -26 + Math.floor(i / 10) * 16; return `<path d="M${cx},${cy} a8,8 0 0,1 12,0" stroke="#2a4a5a" stroke-width="1" fill="none" opacity=".35"/>`; }).join('') +
    `<path d="M-40,-48 Q0,-80 50,-46" fill="#4a6a7a" opacity=".9"/><path d="M-10,30 Q10,56 40,34" fill="#7a9aa8"/>` +
    `<path d="M-78,-34 Q${-58 + g * 10},0 -78,34" fill="#c8384a" opacity="${.4 + .6 * g}"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M-80,${-24 + i * 12} q${10 + g * 8},4 0,8" stroke="#8a1a2a" stroke-width="2" fill="none" opacity="${g}"/>`).join('') +
    `<path d="M-84,-40 Q${-66 - g * 14},0 -84,40" stroke="#2a4a5a" stroke-width="5" fill="none"/>` +
    `<circle cx="-112" cy="-10" r="11" fill="#e8e0b0"/><circle cx="-112" cy="-10" r="6" fill="#111"/><circle cx="-115" cy="-13" r="2" fill="#fff"/><path d="M-140,4 q8,${2 + g * 6} 16,0" stroke="#2a3a40" stroke-width="2" fill="none"/></g>`;
  return f;
}
function bubbles(x, y, t, n = 8, seed = 2) { const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const q = (t * (.5 + r() * .5) + r()) % 1; s += `<circle cx="${x + Math.sin(t * 3 + i) * 8 + (r() - .5) * 20}" cy="${y - q * 260}" r="${3 + r() * 6}" fill="none" stroke="#dff4ff" stroke-width="2" opacity="${1 - q}"/>`; } return s; }
const swimmer = (x, y, s, t, rot = -70) => `<g transform="rotate(${rot},${x},${y})">` + onWalk(x, y + 150 * s, CROWD[2], s, 1, t, { moving: 1, phase: t * 3, amp: .3 }) + `</g>`;
// 0: a person swimming deep underwater with no mask – breathing water
function sceneHook(t) { let s = sea(t, .1, 'h') + swimmer(360, 760, 1.05, t); F.ov = bubbles(300, 620, t, 6, 4); return s; }
// 1: fish breathe with gills – but water holds about 30× less oxygen than air
function sceneGills(t) {
  const k = ease(ramp(t, WS(1, 5), WS(1, 14)));
  let s = sea(t, .2, 'g') + fish(380, 620, 1.7, t);
  F.ov = `<g opacity="${k}"><rect x="60" y="860" width="600" height="230" rx="20" fill="rgba(8,12,30,.6)"/>` + EN('oxygen in 1 litre of…', 90, 905, 22, '#fff', 'start', 500) +
    EN('air', 90, 958, 24, '#fff', 'start') + `<rect x="170" y="938" width="${460 * k}" height="26" rx="5" fill="#7ab4ff"/>` + EN('water', 90, 1028, 24, '#fff', 'start') + `<rect x="170" y="1008" width="${460 / 30 * k + 2}" height="26" rx="5" fill="#f4c76b"/>` + EN('≈ 30× less', 200, 1030, 24, '#f4c76b', 'start', 800) + `</g>`;
  return s;
}
// 2: water is ~800× denser – a litre of water vs a litre of air on a scale
function lungs(x, y, s, fill, col) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-8,-160 L-8,-100 M8,-160 L8,-100 M-8,-100 Q-40,-90 -60,-70 M8,-100 Q40,-90 60,-70" stroke="#d8c0b0" stroke-width="10" fill="none"/>` +
    [-1, 1].map(d => `<path d="M${d * 20},-90 C${d * 120},-110 ${d * 150},40 ${d * 110},110 C${d * 70},140 ${d * 30},120 ${d * 20},80Z" fill="#e8a0a8"/><clipPath id="lc${d}${Math.round(x)}"><path d="M${d * 20},-90 C${d * 120},-110 ${d * 150},40 ${d * 110},110 C${d * 70},140 ${d * 30},120 ${d * 20},80Z"/></clipPath><rect x="-160" y="${120 - 230 * fill}" width="320" height="${230 * fill}" fill="${col}" opacity=".75" clip-path="url(#lc${d}${Math.round(x)})"/>`).join('') + `</g>`;
}
function sceneDense(t) {
  const k = ease(ramp(t, WS(2, 4), WS(2, 9))), p = ease(ramp(t, WS(2, 11), WS(2, 21)));
  let s = sea(t, .35, 'd') + lungs(360, 760, 1.6, .2 + .6 * (.5 + .5 * Math.sin(t * 2.2)) * p, '#3a7ab0');
  F.ov = `<g opacity="${k}"><rect x="60" y="440" width="600" height="150" rx="18" fill="rgba(8,12,30,.6)"/>` + EN('1 litre of air ≈ 1.2 g', 90, 498, 26, '#fff', 'start', 700) + EN('1 litre of water ≈ 1,000 g', 90, 552, 26, '#f4c76b', 'start', 800) + `</g>`;
  return s;
}
// 3: fish don't breathe in and out – water flows one way across the gills
function sceneFlow(t) {
  const k = ease(ramp(t, WS(3, 8), WS(3, 11)));
  let s = sea(t, .25, 'f') + fish(380, 720, 2.1, t, { gill: .9 });
  let a = ''; for (let i = 0; i < 6; i++) { const q = (t * .6 + i / 6) % 1, x = lerp(20, 520, q), y = 720 + Math.sin(q * Math.PI) * -30 + (i % 3 - 1) * 26;
    a += `<circle cx="${x}" cy="${y}" r="7" fill="#bfe8ff" opacity="${k * (q < .45 || q > .55 ? 1 : .3)}"/>`; }
  F.ov = a + `<g opacity="${k}">` + wArrow(40, 720, 120, 720, '#fff', 5) + EN('in through the mouth', 150, 600, 22, '#fff', 'start') + wArrow(260, 790, 300, 860, '#fff', 5) + EN('out through the gills', 300, 900, 22, '#fff', 'start') + `</g>`;
  return s;
}
// 4: liquid breathing – a lab beaker of oxygen-rich perfluorocarbon
function sceneLab(t) {
  const k = ease(ramp(t, WS(4, 3), WS(4, 9))), m = ease(ramp(t, WS(4, 10), WS(4, 14)));
  let s = `<rect width="720" height="1280" fill="#3a4652"/><rect y="1000" width="720" height="280" fill="#2a323c"/><circle cx="360" cy="760" r="420" fill="#cfe2f0" opacity=".12" filter="url(#soft)"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  s += `<path d="M220,560 L220,980 Q220,1010 250,1010 L470,1010 Q500,1010 500,980 L500,560" fill="none" stroke="#9aa8b8" stroke-width="8"/><rect x="226" y="640" width="268" height="364" fill="#cfe6f4" opacity=".7"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="500" y="${640 + i * 45}" width="22" height="3" fill="#7a8898"/>`).join('') + `<path d="M440,520 L440,940" stroke="#9aa8b8" stroke-width="10"/>`;
  s += bubbles(440, 940, t, 10, 7);
  // a mouse floating calmly in the liquid
  s += `<g opacity="${m}" transform="translate(330,840) rotate(${Math.sin(t) * 5})"><ellipse rx="48" ry="26" fill="#d8d0c8"/><circle cx="44" cy="-6" r="20" fill="#d8d0c8"/><circle cx="46" cy="-24" r="10" fill="#e8b0b8"/><circle cx="56" cy="-8" r="3" fill="#111"/><path d="M-46,4 q-40,10 -70,-10" stroke="#e8b0b8" stroke-width="4" fill="none"/></g>`;
  F.ov = `<g opacity="${k}">` + EN('perfluorocarbon + oxygen', 360, 520, 26, '#ffffff', 'middle', 800) + `</g>`;
  return s;
}
// 5: trials with premature babies – a neonatal incubator
function sceneBaby(t) {
  let s = `<rect width="720" height="1280" fill="#34444e"/><rect y="1040" width="720" height="240" fill="#26323a"/><circle cx="360" cy="700" r="380" fill="#dff4ff" opacity=".12" filter="url(#soft)"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  s += `<rect x="140" y="760" width="440" height="40" rx="10" fill="#9aa8b8"/><rect x="200" y="800" width="20" height="240" fill="#7a8898"/><rect x="500" y="800" width="20" height="240" fill="#7a8898"/>` +
    `<path d="M150,760 L150,600 Q150,560 190,560 L530,560 Q570,560 570,600 L570,760" fill="#dff4ff" opacity=".55" stroke="#9ab8cc" stroke-width="4"/><circle cx="250" cy="680" r="26" fill="none" stroke="#9ab8cc" stroke-width="4"/><circle cx="470" cy="680" r="26" fill="none" stroke="#9ab8cc" stroke-width="4"/>` +
    `<rect x="230" y="725" width="260" height="30" rx="10" fill="#f4f0e8"/><ellipse cx="350" cy="722" rx="70" ry="22" fill="#e8b89a"/><circle cx="292" cy="715" r="20" fill="#e8b89a"/><rect x="260" y="726" width="190" height="24" rx="10" fill="#f8f4ec"/>`;
  let d = ''; for (let x = 0; x <= 200; x += 4) { const ph = ((t * 2 - x / 80) % 1 + 1) % 1; d += `${x ? 'L' : 'M'}${470 + x},${470 - (ph < .08 ? Math.sin(ph / .08 * Math.PI) * 30 : 0)}`; }
  F.ov = `<rect x="450" y="400" width="240" height="120" rx="12" fill="#1a2028"/><path d="${d}" stroke="#4ade80" stroke-width="3" fill="none"/>`;
  return s;
}
// 6: cold and pressure – +1 atmosphere for every 10 m of depth
function sceneDeep(t) {
  const d = ease(ramp(t, WS(6, 5), WS(6, 24) + .5)), depth = Math.round(lerp(0, 40, d)), atm = 1 + depth / 10;
  let s = sea(t, .2 + .7 * d, 'p') + swimmer(330, 700 + d * 80, .6, t, -150);
  F.ov = `<g transform="translate(560,640)"><rect x="-100" y="-70" width="200" height="320" rx="18" fill="rgba(8,12,30,.7)" stroke="rgba(255,255,255,.2)"/>` +
    EN(`${depth} m`, 0, -14, 40, '#fff', 'middle', 800) + EN('depth', 0, 14, 16, 'rgba(255,255,255,.6)', 'middle', 500) + EN(`${atm.toFixed(1)} atm`, 0, 90, 38, '#f4c76b', 'middle', 800) + EN('pressure', 0, 116, 16, 'rgba(255,255,255,.6)', 'middle', 500) +
    EN(`${Math.round(lerp(20, 8, d))} °C`, 0, 196, 32, '#7ab4ff', 'middle', 800) + `</g>`;
  return s;
}
function sceneEnd(t) { let s = sea(t, .4, 'e'); F.ov = fish(360 + Math.sin(t) * 40, 990, .8, t) + endCard(t, WS(7, 0), WS(7, 5), false); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneGills }, { s: S0(2) - .2, f: sceneDense }, { s: S0(3) - .2, f: sceneFlow }, { s: S0(4) - .2, f: sceneLab },
  { s: S0(5) - .2, f: sceneBaby }, { s: S0(6) - .2, f: sceneDeep }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Less oxygen', S0(1)], ['Heavy water', S0(2)], ['Liquid breathing', S0(4)], ['Pressure', S0(6)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', '≈ 30× less oxygen in water', 360, 330, 'big', WS(1, 9), S0(2) - .3],
  ['c2', '≈ 800× denser than air', 360, 330, 'red', WS(2, 7), S0(3) - .3],
  ['c3', 'One-way flow', 360, 330, 'big', WS(3, 10), S0(4) - .3],
  ['c4', 'Liquid breathing is real', 360, 330, 'big', WS(4, 10), S0(5) - .3],
  ['c5', 'Tested to help newborns', 360, 330, 'dark', WS(5, 6), S0(6) - .3],
  ['c6', '+1 atmosphere every 10 m', 360, 330, 'red', WS(6, 14), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 5), 999],
];
setupUI('UNDERWATER', TLI, CHIPS);
