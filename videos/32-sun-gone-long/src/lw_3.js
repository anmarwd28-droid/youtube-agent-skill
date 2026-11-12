// ===================== chapters 6-8: a year, a hundred years, a thousand years =====================
// ---------- chapter 6: after a year ----------
function sceneYear(t) {
  const v = lerp(-30, -73, ease(ramp(t, WS(33, 2), WS(33, 10)))), cam = g3(t, { d: 6.4, el: .2, az: 2.9, sunI: 0, lights: .5, amb: .42, ice: .55 + .25 * ramp(t, CS(6), S0(34)), tg: [-1.1, 0, 0], clouds: .25 });
  F.ov = thermo(190, 440, 230, v, -100, 20);
  return spaceW(t, { mw: .4, mwy: 620, mwa: -6 });
}
chip('العالمُ كلُّه قطبٌ جنوبيّ', 760, 650, 'ice', WS(33, 12), S0(34) - .4);
function suitP(x, y, s, face, t, o = {}) { const hx = x + 6 * s * face, hy = y - 296 * s;
  return `<rect x="${(x - (face > 0 ? 40 : -18) * s).toFixed(1)}" y="${(y - 262 * s).toFixed(1)}" width="${(22 * s).toFixed(1)}" height="${(88 * s).toFixed(1)}" rx="${(6 * s).toFixed(1)}" fill="#8a929e"/>` + person(x, y, Object.assign({ s, face, top: '#d8dde4', pants: '#b8bec8', skin: '#c08a66', hair: '#2a1d16', coat: 1, t }, o)) +
    `<circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${(31 * s).toFixed(1)}" fill="#e6ecf2"/><path d="M${(hx - 4 * s * face).toFixed(1)},${(hy - 16 * s).toFixed(1)} q${(30 * s * face).toFixed(1)},${(-4 * s).toFixed(1)} ${(30 * s * face).toFixed(1)},${(18 * s).toFixed(1)} q${(-6 * s * face).toFixed(1)},${(16 * s).toFixed(1)} ${(-30 * s * face).toFixed(1)},${(12 * s).toFixed(1)}Z" fill="#2a3a52"/><path d="M${(hx + 6 * s * face).toFixed(1)},${(hy - 12 * s).toFixed(1)} q${(14 * s * face).toFixed(1)},0 ${(16 * s * face).toFixed(1)},${(10 * s).toFixed(1)}" stroke="#9fd0ff" stroke-width="${(3 * s).toFixed(1)}" fill="none" opacity=".7"/>` +
    (o.lamp ? `<path d="M${(hx + 26 * s * face).toFixed(1)},${(hy - 20 * s).toFixed(1)} l${(420 * face).toFixed(0)},${-60} l0,170Z" fill="#fff6dc" opacity=".1"/><circle cx="${(hx + 22 * s * face).toFixed(1)}" cy="${(hy - 22 * s).toFixed(1)}" r="${(6 * s).toFixed(1)}" fill="#fff6dc"/>` : ''); }
function iceField(t, o = {}) { const x0 = -520, x1 = 1240, gy = o.gy || 1000;
  let s = skyR(o.id || 'if', o.sky || NSKY, x0 - 200, x1 + 200) + `<g opacity="${o.stars ?? 1}">` + milkyW(o.mw ?? .8, 380, 520, -20, 1.05) + starsWd(t, x0, x1, 150, gy - 60, 540, o.sseed || 31, o.tw ?? 1) + `</g>` + ridge(x0, x1, gy - 60, 110, 41, '#243248', { n0: 5, snow: .5 }) + ridge(x0, x1, gy - 20, 50, 43, '#34465e', { n0: 6, snow: .6 }) +
    `<path d="${hillP(x0, x1, gy, 14, 2.1)}" fill="${o.gc || '#7f95b4'}"/><path d="${hillP(x0, x1, gy, 14, 2.1)}" fill="#fff" filter="url(#wallI)" opacity=".5"/>`;
  const r = RS(o.sseed || 31); for (let i = 0; i < 28; i++) { const x = x0 + r() * (x1 - x0), y = gy + 30 + r() * 250, w = 60 + r() * 140; s += `<path d="M${x.toFixed(0)},${y.toFixed(0)} q${(w / 2).toFixed(0)},${(-10 - r() * 14).toFixed(0)} ${w.toFixed(0)},0" stroke="#dfeaff" stroke-width="3" fill="none" opacity=".35"/>`; }
  return s; }
function sceneOutside(t) {
  noW(); let w = ''; const r = RS(7); for (let i = 0; i < 70; i++) { const y = 560 + r() * 700, x = -520 + pmod(r() * 1760 - t * (500 + r() * 400), 1760), L = 40 + r() * 90; w += `<path d="M${x.toFixed(0)},${y.toFixed(0)} l${L.toFixed(0)},${(L * .12).toFixed(0)}" stroke="#fff" stroke-width="${(1.5 + r() * 2).toFixed(1)}" opacity="${(.25 + r() * .35).toFixed(2)}"/>`; }
  const px = 520 - (t - S0(34)) * 16, s = iceField(t, { id: 'os', mw: .4, stars: .6 }) + NB(person(px, 1080, { s: .62, face: -1, moving: 1, phase: px / 19, top: '#b84a2a', pants: '#2a2a34', skin: '#c08a66', hair: '#2a1d16', coat: 1, hat: '#7a2a2a', scarf: '#d8d8d8', breath: 1, t }), .7) + w;
  F.ov = thermo(1090, 440, 200, -73, -100, 20);
  return camMv(s, t, S0(34) - .2, S0(35), [1.35, 420, 950], [1.5, 400, 960]);
}
chip('دقائقُ فقط في الخارج', 560, 150, 'red', WS(34, 6), S0(35) - .4);
const fishS = (x, y, s, f, c = '#9ab8d0') => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * f).toFixed(2)},${s})"><path d="M-22,0 q16,-13 36,0 q-20,13 -36,0Z" fill="${c}"/><path d="M-22,0 l-13,-9 l3,9 l-3,9Z" fill="${c}"/><circle cx="7" cy="-2" r="1.8" fill="#0a1020"/></g>`;
function iceLid(t, o = {}) { const x0 = -520, x1 = 1240, top = o.top ?? 760, th = o.th ?? 90, bot = o.bot ?? 1500;
  let s = skyR(o.id || 'il', NSKY, x0 - 200, x1 + 200, 100, top + 10) + starsWd(t, x0, x1, 300, top - 20, 300, 44) + milkyW(.6, 380, 560, -14, .9) + ridge(x0, x1, top, 60, 47, '#2a3a52', { n0: 5, snow: .6 }) +
    `<defs><linearGradient id="wtr${o.id || ''}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a5a8a"/><stop offset=".4" stop-color="#0c2e52"/><stop offset="1" stop-color="#040c1c"/></linearGradient><linearGradient id="icg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef6ff"/><stop offset="1" stop-color="#8ab4d8"/></linearGradient></defs><rect x="${x0 - 200}" y="${top + th}" width="${x1 - x0 + 400}" height="${bot - top - th}" fill="url(#wtr${o.id || ''})"/>` +
    `<path d="M${x0 - 200},${top} H${x1 + 200} V${top + th} ${Array.from({ length: 30 }, (_, i) => `L${x1 + 200 - i * 66},${top + th + (i % 2 ? 12 : -4) + (i % 5) * 3}`).join(' ')} L${x0 - 200},${top + th}Z" fill="url(#icg)"/><rect x="${x0}" y="${top}" width="${x1 - x0}" height="${th}" fill="#4a7aa8" filter="url(#grainR)" opacity=".3"/><rect x="${x0 - 200}" y="${top - 3}" width="${x1 - x0 + 400}" height="10" fill="#fff"/>`;
  const r = RS(13); for (let i = 0; i < 16; i++) { const x = x0 + r() * (x1 - x0); s += `<path d="M${x.toFixed(0)},${top + 6} l${(r() * 30 - 15).toFixed(0)},${(th * .5).toFixed(0)} l${(r() * 30 - 15).toFixed(0)},${(th * .4).toFixed(0)}" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`; }
  for (let i = 0; i < 12; i++) { const k = pmod(t * .05 + i / 12, 1), x = x0 + r() * (x1 - x0); s += `<path d="M${x.toFixed(0)},${top + th + 4} l${(40 + r() * 30).toFixed(0)},${(300 + r() * 200).toFixed(0)} l${(40).toFixed(0)},0Z" fill="#9fd0ff" opacity="${(.03 + .02 * Math.sin(t + i)).toFixed(3)}"/>`; }
  return s; }
function sceneIceLid(t) {
  noW(); let f = ''; for (let i = 0; i < 9; i++) { const r = RS(i + 20), d = i % 2 ? 1 : -1, x = -400 + pmod(r() * 1500 + d * t * (18 + r() * 14), 1500), y = 950 + r() * 240 + Math.sin(t + i) * 6; f += fishS(x, y, 1 + r() * .7, d, ['#9ab8d0', '#c8a878', '#8ad0c0'][i % 3]); }
  for (let i = 0; i < 14; i++) { const r = RS(i + 50), k = pmod(t * .2 + r(), 1); f += `<circle cx="${(-300 + r() * 1300).toFixed(0)}" cy="${(1250 - k * 380).toFixed(0)}" r="${(2 + r() * 3).toFixed(1)}" fill="none" stroke="#cfe8ff" stroke-width="1.5" opacity="${(.5 * (1 - k)).toFixed(2)}"/>`; }
  F.ov = `<g opacity="${ramp(t, WS(35, 7), WS(35, 7) + .5).toFixed(2)}">` + txt(980, 246, 'الجليدُ: غطاءٌ عازل', 1, '#eef6ff', 28) + arrow(980, 262, 900, 316, 1, '#eef6ff', 4) + `</g><g opacity="${ramp(t, WS(35, 12), WS(35, 12) + .5).toFixed(2)}">` + txt(330, 566, 'ماءٌ سائل', 1, '#7ac0ff', 32) + `</g>`;
  return camMv(iceLid(t, {}) + f, t, S0(35) - .2, S0(36), [1.3, 360, 800], [1.3, 380, 1010]);
}
// ---------- the underground shelter (cross-section), used in chapters 6 and 7 ----------
function hallB(x, y, w, h, col = '#20242e') { let s = `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" rx="14" fill="#0e0f14"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${col}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#fff" filter="url(#wallI)" opacity=".2"/><rect x="${x}" y="${y + h - 12}" width="${w}" height="12" fill="#3a3e48"/>`;
  for (let i = 0; i < Math.floor(w / 110); i++) { const lx = x + 55 + i * 110; s += `<rect x="${lx - 16}" y="${y + 3}" width="32" height="5" rx="2" fill="#fff6dc"/><path d="M${lx - 16},${y + 8} l-30,${h - 20} l92,0 l-30,${-(h - 20)}Z" fill="#fff6dc" opacity=".07"/>`; }
  return s; }
function bunkerW(t, o = {}) { const x0 = -560, x1 = 1280, SY = 640, sn = o.deep || 0;
  let s = skyR('bk', NSKY, x0 - 200, x1 + 200, 100, 700) + starsWd(t, x0, x1, 200, SY - 30, 300, 61) + milkyW(.6, 380, 440, -12, .9) + NB(farCityW(61, SY + 6 + sn * 60, '#2a3448', x0, x1, .7), .8) + `<path d="${hillP(x0, x1, SY - sn * 24, 12, 1.4)}" fill="#7f95b4"/><path d="${hillP(x0, x1, SY - sn * 24, 12, 1.4)}" fill="#fff" filter="url(#wallI)" opacity=".5"/>` +
    `<defs><linearGradient id="rkg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a423c"/><stop offset=".7" stop-color="#2a2220"/><stop offset="1" stop-color="#3a1c14"/></linearGradient><linearGradient id="hot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff7a2a" stop-opacity="0"/><stop offset="1" stop-color="#ff9a3a" stop-opacity=".85"/></linearGradient></defs><rect x="${x0 - 200}" y="${SY + 30}" width="${x1 - x0 + 400}" height="1100" fill="url(#rkg)"/><rect x="${x0}" y="${SY + 30}" width="${x1 - x0}" height="900" fill="#000" filter="url(#rockTex)" opacity=".45"/>`;
  [700, 760, 930, 1120, 1190].forEach((y, i) => { s += `<path d="M${x0},${y} q300,${20 - i * 9} 600,${6 + i * 4} t600,${-10 + i * 5} t700,8" stroke="#000" stroke-opacity=".22" stroke-width="${3 + i % 2 * 2}" fill="none"/>`; });
  s += `<rect x="${x0 - 200}" y="1230" width="${x1 - x0 + 400}" height="300" fill="url(#hot)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${x0 + 60 + i * 200},1420 q30,-70 -10,-120 q-20,-40 20,-70" stroke="#ffb04a" stroke-width="5" fill="none" opacity="${(.35 + .2 * Math.sin(t * 1.3 + i)).toFixed(2)}"/>`).join('');
  // shaft and the surface hatch
  s += `<rect x="338" y="${SY - 8}" width="44" height="170" fill="#0e0f14"/><rect x="346" y="${SY - 8}" width="28" height="170" fill="#262a34"/><rect x="326" y="${SY - 30}" width="68" height="30" rx="5" fill="#5a626e"/><rect x="326" y="${SY - 30}" width="68" height="7" rx="3" fill="#eef4fa"/><circle cx="360" cy="${SY - 36}" r="4" fill="#ff5a4a" opacity="${(.5 + .5 * Math.sin(t * 3)).toFixed(2)}"/>`;
  // geothermal pipes
  [[230, '#c8582a'], [250, '#3a6ab0'], [620, '#c8582a'], [640, '#3a6ab0']].forEach(([px, c], i) => { s += `<rect x="${px}" y="1076" width="9" height="250" fill="${c}"/>` + [0, 1, 2].map(q => { const k = pmod(t * .5 + q / 3 + i * .2, 1); return `<circle cx="${px + 4.5}" cy="${(i % 2 ? 1076 + k * 250 : 1326 - k * 250).toFixed(1)}" r="4" fill="#fff" opacity=".7"/>`; }).join(''); });
  // halls: A living + school, D water and air, B farm, C reactor
  s += hallB(60, 790, 640, 112) + hallB(760, 790, 400, 112, '#1c2630') + hallB(-420, 960, 720, 116, '#241c2c') + hallB(360, 960, 460, 116, '#1c2228') + `<rect x="700" y="826" width="60" height="50" fill="#16181e"/><rect x="300" y="996" width="60" height="50" fill="#16181e"/><rect x="346" y="902" width="28" height="58" fill="#16181e"/>`;
  // A: beds, table, the school corner with a picture
  [430, 520, 610].forEach(bx => { s += `<rect x="${bx}" y="836" width="70" height="6" fill="#6a7078"/><rect x="${bx}" y="866" width="70" height="6" fill="#6a7078"/><rect x="${bx}" y="826" width="4" height="64" fill="#4a5058"/><rect x="${bx + 66}" y="826" width="4" height="64" fill="#4a5058"/><rect x="${bx + 4}" y="828" width="50" height="8" rx="3" fill="#a84a3a"/><rect x="${bx + 4}" y="858" width="50" height="8" rx="3" fill="#3a6a8a"/>`; });
  const pic = o.pic ?? 0; s += `<rect x="96" y="806" width="92" height="58" fill="#e8e2d0"/><rect x="96" y="806" width="92" height="58" fill="none" stroke="#6a5a40" stroke-width="4"/>` + (pic < .5 ? `<rect x="100" y="810" width="84" height="50" fill="#6ab0e8"/><circle cx="142" cy="832" r="15" fill="#ffd040"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${142 + Math.cos(i * .628) * 19},${832 + Math.sin(i * .628) * 19} l${Math.cos(i * .628) * 8},${Math.sin(i * .628) * 8}" stroke="#ffd040" stroke-width="3"/>`).join('') + `<path d="M100,860 q40,-16 84,0Z" fill="#5aa85a"/>` :
    `<rect x="100" y="810" width="84" height="50" fill="#c8d8b0"/><path d="M112,850 q4,-20 22,-22 q18,-2 30,-14 q6,-6 12,0 q-2,8 -10,10 q4,14 -8,22 l0,6 l-6,0 l0,-6 l-14,0 l0,6 l-6,0 l0,-8 q-14,-4 -20,6Z" fill="#4a6a3a"/>`) + glowC(142, 800, 70, .35);
  // D: water tanks, pipes, an air unit
  [800, 880, 960].forEach((tx, i) => { s += `<rect x="${tx}" y="812" width="58" height="78" rx="10" fill="#3a6a9a"/><rect x="${tx}" y="812" width="16" height="78" rx="8" fill="#fff" opacity=".2"/><rect x="${tx + 6}" y="${(852 + Math.sin(t * .8 + i) * 4).toFixed(1)}" width="46" height="34" rx="6" fill="#7ac0ff" opacity=".6"/><path d="M${tx + 29},812 v-12 h80" stroke="#8a929e" stroke-width="5" fill="none"/>`; });
  s += `<rect x="1060" y="820" width="76" height="70" rx="6" fill="#5a626e"/><circle cx="1098" cy="855" r="26" fill="#1a1c22"/><g transform="rotate(${(t * 140).toFixed(0)},1098,855)"><path d="M1098,855 l22,-8 l0,16Z M1098,855 l-22,8 l0,-16Z M1098,855 l8,22 l-16,0Z M1098,855 l-8,-22 l16,0Z" fill="#9aa2ae"/></g>`;
  // B: plant racks under pink grow lights
  for (let i = 0; i < 6; i++) { const rx = -390 + i * 112; s += `<rect x="${rx}" y="978" width="92" height="5" fill="#ff7ad8"/><path d="M${rx},983 l-8,74 l108,0 l-8,-74Z" fill="#ff5ac8" opacity=".12"/><rect x="${rx}" y="1022" width="92" height="5" fill="#ff7ad8"/><rect x="${rx}" y="1010" width="92" height="8" fill="#4a3a2a"/><rect x="${rx}" y="1052" width="92" height="10" fill="#4a3a2a"/>` +
      Array.from({ length: 6 }, (_, q) => `<path d="M${rx + 8 + q * 15},1010 q-5,-12 0,-${14 + (q * 7 + i * 3) % 9} M${rx + 8 + q * 15},1010 q6,-8 8,-${10 + q % 3 * 3}" stroke="${i % 2 ? '#5ac85a' : '#d8c050'}" stroke-width="3" fill="none"/><path d="M${rx + 8 + q * 15},1052 q-5,-10 0,-${12 + (q * 5 + i) % 8} M${rx + 8 + q * 15},1052 q6,-8 8,-${9 + q % 3 * 3}" stroke="#5ac85a" stroke-width="3" fill="none"/>`).join(''); }
  // C: the reactor
  s += `<circle cx="520" cy="1016" r="110" fill="#5ad0ff" opacity="${(.14 + .04 * Math.sin(t * 2)).toFixed(2)}" filter="url(#soft)"/><rect x="474" y="990" width="92" height="74" fill="#8a929e"/><path d="M474,990 q46,-38 92,0Z" fill="#a8b0bc"/><rect x="474" y="990" width="26" height="74" fill="#fff" opacity=".2"/><rect x="496" y="1010" width="48" height="34" rx="4" fill="#0a2a3a"/><rect x="500" y="1014" width="40" height="26" rx="3" fill="#5ad0ff" opacity="${(.7 + .2 * Math.sin(t * 3)).toFixed(2)}"/>` +
    `<path d="M566,1010 h70 v-20" stroke="#8a929e" stroke-width="7" fill="none"/><rect x="640" y="1006" width="110" height="58" rx="6" fill="#4a5a4a"/><rect x="650" y="1016" width="40" height="18" fill="#0a0e1c"/><path d="M654,1028 l6,-8 l6,6 l6,-10 l6,8 l6,-4" stroke="#5ad08a" stroke-width="2" fill="none"/><circle cx="724" cy="1026" r="10" fill="#f4c76b"/><path d="M400,1000 l14,24 l-28,0Z" fill="#f4c76b"/><text x="400" y="1021" text-anchor="middle" font-size="16" font-weight="700" fill="#1a1a1a">!</text>`;
  return s; }
const bunkPpl = (t, kids = 0) => NB(walker(470, 902, 9, 0, .3, t - S0(36), {}) + stander(590, 902, 1, .3, -1, t, {}) + stander(840, 902, 3, .3, 1, t, {}) + stander(1010, 902, 2, .3, -1, t, {}) + stander(-150, 1076, 1, .3, 1, t, {}) + stander(60, 1076, 0, .3, -1, t, {}) + stander(590, 1076, 2, .3, -1, t, {}) +
  (kids ? [210, 236, 262, 290].map((x, i) => stander(x, 902, i, .2, -1, t, { lookUp: .6, top: ['#e8c040', '#4a8ad0', '#e05a4a', '#5aa86a'][i] })).join('') + stander(84, 902, 3, .3, 1, t, {}) : stander(230, 902, 3, .3, -1, t, {})), .82);
function icePanel(t, a) { let st = ''; for (let i = 0; i < 5; i++) { const k = pmod(t * .5 + i / 5, 1); st += `<circle cx="${1000 + i * 28}" cy="${318 - k * 46}" r="${6 + k * 12}" fill="#eef6ff" opacity="${(.5 * (1 - k)).toFixed(2)}"/>`; }
  return `<g opacity="${a.toFixed(2)}">` + panel(850, 190, 330, 250) + `<rect x="870" y="340" width="290" height="6" fill="#8a929e"/>` + [880, 960, 1060].map((x, i) => `<rect x="${x}" y="${300 - i % 2 * 8}" width="64" height="${40 + i % 2 * 8}" fill="${['#c84a3a', '#e8e2d0', '#3a6ab0'][i]}"/><path d="M${x - 6},${300 - i % 2 * 8} l38,-26 l38,26Z" fill="#3a3a40"/><rect x="${x + 22}" y="316" width="16" height="16" fill="#ffd890"/>`).join('') + st + `<path d="M876,352 h280" stroke="#c8582a" stroke-width="8"/>` + txt(1015, 392, 'آيسلندا اليوم', 1, '#fff', 24) + txt(1015, 424, 'تدفئةٌ من باطنِ الأرض', 1, '#f4c76b', 20) + `</g>`; }
function sceneBunker(t) {
  noW(); F.ov = icePanel(t, ramp(t, WS(36, 12), WS(36, 12) + .5)) + txt(360, 652, 'حرارةُ باطنِ الأرض', ramp(t, WS(36, 8), WS(36, 8) + .5), '#ffb878', 28);
  return camMv(bunkerW(t) + bunkPpl(t), t, S0(36) - .2, S0(37), [1.05, 360, 700], [.92, 360, 960]);
}
chip('تحت الأرض', 400, 150, 'big', WS(36, 3), WS(36, 8));
function sceneReactor(t) {
  noW(); F.ov = txt(660, 236, 'مفاعلٌ نوويّ', ramp(t, WS(37, 0), WS(37, 0) + .5) * (1 - ramp(t, WS(37, 3), WS(37, 4))), '#7ad8ff', 30) + txt(640, 236, 'زراعةٌ تحت المصابيح', ramp(t, WS(37, 5), WS(37, 5) + .5), '#ff9ae0', 30);
  return camMv(bunkerW(t) + bunkPpl(t), t, S0(37) - .2, WS(37, 9), [2.0, 560, 1020], [1.5, 230, 1010]);
}
function subM(x, y, s, t) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><path d="M-260,60 l-200,40 l0,170 l520,0Z" fill="#fff6dc" opacity=".05"/><ellipse cx="0" cy="0" rx="230" ry="46" fill="#3a4654"/><ellipse cx="-20" cy="-14" rx="200" ry="24" fill="#fff" opacity=".1"/><path d="M-30,-44 l10,-50 l70,0 l14,50Z" fill="#2e3844"/><rect x="2" y="-120" width="6" height="30" fill="#2e3844"/><path d="M224,0 l44,-34 l0,68Z" fill="#2e3844"/><g transform="rotate(${(t * 300).toFixed(0)},272,0)"><path d="M272,0 l6,-30 l-12,0Z M272,0 l-6,30 l12,0Z" fill="#8a929e"/></g>` + [-140, -90, -40, 60, 110].map(q => `<circle cx="${q}" cy="-2" r="7" fill="#ffd890"/>`).join('') + `<circle cx="-226" cy="4" r="8" fill="#fff6dc"/></g>`; }
function sceneSub(t) {
  noW(); const x = 700 - (t - WS(37, 9)) * 26; let ping = ''; for (let i = 0; i < 3; i++) { const k = pmod(t * .5 + i / 3, 1); ping += `<circle cx="${(x - 300).toFixed(1)}" cy="1010" r="${(20 + k * 200).toFixed(1)}" fill="none" stroke="#7ad8ff" stroke-width="3" opacity="${(.4 * (1 - k)).toFixed(2)}"/>`; }
  F.ov = txt(330, 250, 'جليد', 1, '#eef6ff', 26);
  return camMv(iceLid(t, { id: 'sb' }) + ping + subM(x, 1010, 1.05, t), t, WS(37, 9) - .2, S0(38), [1.15, 380, 960], [1.25, 360, 980]);
}
chip('غوّاصةٌ نوويّة', 640, 650, '', WS(37, 9), S0(38) - .4);
function sceneFew(t) {
  noW(); const cl = ease(ramp(t, WS(38, 3), WS(38, 9))), s = bunkerW(t) + NB([250, 286, 318, 400, 436, 470, 510].map((x, i) => stander(x, 640, i, .22, x < 360 ? 1 : -1, t, WINT(i, .8))).join(''), .7) + `<rect x="${326 - 0}" y="${610 - 30 * (1 - cl)}" width="68" height="${30}" rx="5" fill="#6a727e"/>` + snowW(t, 90, .6, -300, 1000, 300, 660, 5);
  F.ov = txt(640, 170, 'الأماكنُ محدودة', ramp(t, WS(38, 3), WS(38, 3) + .5), '#ff8a7a', 34);
  return camMv(s, t, S0(38) - .2, S0(39), [2.3, 360, 600], [1.6, 360, 700]);
}
function sceneLifeDown(t) {
  noW(); return camMv(bunkerW(t) + bunkPpl(t), t, S0(39) - .2, CS(7) + .5, [2.3, 500, 850], [1.9, 380, 850]);
}
chip('إلى متى؟', 640, 150, 'red', WS(39, 4), CS(7));
// ---------- chapter 7: after a hundred years ----------
function buriedCity(t, o = {}) { const dp = o.deep ?? .5, x0 = -470, x1 = 1190, y = 1000 - dp * 190, air = o.air || 0; let d = `<path d="M${x0 - 100},1500 L${x0 - 100},${y}`; for (let x = x0 - 100; x <= x1 + 100; x += 40) d += ` L${x},${(y - 26 * Math.sin(x * .013 + 1) - 14 * Math.sin(x * .031)).toFixed(1)}`; d += ` L${x1 + 100},1500Z"`;
  return cityW(t, { id: o.id || 'bc', seed: o.seed || 21, dark: 1, lit: 0, clouds: 0, snow: 1, stars: 1, mw: .8, noTrees: 1, extra: d + ` fill="${air ? mix('#aebfd6', '#9fc4f0', air) : '#aebfd6'}"/>` + d + ` fill="#fff" filter="url(#wallI)" opacity=".5"/>` }); }
function sceneSurface100(t) {
  noW(); const v = lerp(-92, -112, ramp(t, WS(40, 9), CS(8))), a = ramp(t, WS(40, 9), WS(40, 9) + .5), zy = 440 - 6 - clamp((-89.2 + 150) / 170) * 216;
  F.ov = `<g opacity="${a.toFixed(2)}">` + thermo(1090, 440, 230, v, -150, 20) + `<path d="M1040,${zy.toFixed(1)} h84" stroke="#ff8a7a" stroke-width="3"/>` + txt(905, zy + 8, 'الرقمُ القياسيّ: ٨٩° تحت الصفر', 1, '#ff8a7a', 21) + `</g>`;
  return camMv(buriedCity(t, { deep: .45 }), t, CS(7), S0(41), [.9, 360, 780], [1.15, 300, 820]);
}
function sceneKids(t) {
  noW(); const pic = ramp(t, WS(41, 14), WS(41, 14) + .4);
  F.ov = txt(640, 640, pic > .5 ? 'كما نعرفُ نحن الديناصورات' : 'الشمس: صورةٌ على الجدار', ramp(t, WS(41, 10), WS(41, 10) + .5), '#f4c76b', 30);
  return camMv(bunkerW(t, { pic, deep: .5 }) + bunkPpl(t, 1), t, S0(41) - .2, S0(42), [2.6, 260, 850], [3.3, 200, 846]);
}
chip('جيلٌ بلا شمس', 760, 150, 'big', WS(41, 4), WS(41, 10));
function sceneTunnels(t) {
  noW(); F.ov = txt(300, 650, 'حقولٌ تحت المصابيح', ramp(t, WS(42, 9), WS(42, 9) + .5), '#ff9ae0', 28);
  const c = t < WS(42, 9) ? mv3(t, S0(42) - .2, WS(42, 9), [1.35, 760, 900], [1.2, 420, 960]) : mv3(t, WS(42, 9), S0(43), [1.2, 420, 960], [1.9, -40, 1016]);
  return camG(bunkerW(t, { deep: .5 }) + bunkPpl(t, 1), c[0], c[1], c[2]);
}
function sceneWater(t) {
  noW(); const a = ramp(t, S0(43), S0(43) + .5); let dr = ''; for (let i = 0; i < 6; i++) { const k = pmod(t * .6 + i / 6, 1), an = k * 6.283; dr += `<path d="M${(360 + Math.cos(an) * 74).toFixed(1)},${(400 + Math.sin(an) * 74 - 10).toFixed(1)} q8,12 0,18 q-8,-6 0,-18Z" fill="#7ac0ff"/>`; }
  F.ov = `<g opacity="${a.toFixed(2)}">` + panel(240, 290, 240, 230) + `<circle cx="360" cy="400" r="74" fill="none" stroke="#7ac0ff" stroke-width="5" stroke-dasharray="14 10" opacity=".7"/>` + dr + txt(360, 410, 'ماء', 1, '#fff', 26) + txt(360, 506, 'يُعادُ استعمالُه', 1, '#7ac0ff', 20) + `</g><g opacity="${ramp(t, WS(43, 5), WS(43, 5) + .5).toFixed(2)}">` + panel(820, 290, 250, 230) + txt(945, 340, 'هواء', 1, '#fff', 26) + `<rect x="850" y="370" width="190" height="34" rx="9" fill="#1a2436"/><rect x="850" y="370" width="${(190 * (.62 + .05 * Math.sin(t * 2))).toFixed(0)}" height="34" rx="9" fill="#5ad08a"/>` + txt(945, 452, 'O₂  ٢١٪', 1, '#5ad08a', 26) + txt(945, 496, 'كلُّ نفَسٍ محسوب', 1, 'rgba(255,255,255,.75)', 19) + `</g>`;
  return camMv(bunkerW(t, { deep: .5 }) + bunkPpl(t, 1), t, S0(43) - .2, S0(44), [2.5, 960, 850], [2.7, 990, 850]) + `<rect width="1280" height="720" fill="#04060f" opacity=".3"/>`;
}
function sceneSuit(t) {
  noW(); const px = 250 + (t - S0(44)) * 6, sy = x => 1000 - .55 * 190 - 26 * Math.sin(x * .013 + 1) - 14 * Math.sin(x * .031) + 4, y = sy(Math.min(px, 300));
  const s = buriedCity(t, { deep: .55, id: 'su' }) + NB(suitP(Math.min(px, 300), y, .5, 1, t, { lamp: 1, moving: px < 300, phase: px / 15, lookUp: px >= 300 ? .8 : 0 }), .9) + `<rect x="150" y="${sy(178) - 8}" width="56" height="14" rx="4" fill="#5a626e"/>`;
  const c = t < S0(45) ? mv3(t, S0(44) - .2, S0(45), [1.7, 330, 800], [1.15, 420, 760]) : mv3(t, S0(45), CS(8) + .5, [1.15, 420, 760], [.92, 380, 720]);
  return camG(s, c[0], c[1], c[2]);
}
chip('مدنُ الأجداد تحت الثلج', 640, 150, 'ice', WS(44, 8), S0(45) - .3);
// ---------- chapter 8: after a thousand years ----------
function sceneEarth1000(t) {
  const v = lerp(-150, -196, ease(ramp(t, WS(46, 7), S0(47)))), cam = g3(t, { d: 6.4, el: .2, az: .7, sunI: 0, lights: 0, amb: .6, ice: 1, tg: [-1.1, 0, 0], clouds: .12 * (1 - ramp(t, CS(8), S0(47))), atm: 1 - .5 * ramp(t, WS(46, 15), S0(47)) });
  F.ov = thermo(190, 440, 230, v, -250, 20);
  return spaceW(t, { mw: .45, mwy: 120, mwa: 6 });
}
chip('الهواءُ نفسُه يتجمّد', 760, 650, 'ice', WS(46, 15), S0(47) - .4);
function sceneAirRain(t) {
  noW(); const rn = ramp(t, WS(47, 8), WS(47, 12)) * (1 - ramp(t, WS(47, 14), WS(47, 16))), sn = ramp(t, WS(47, 14), WS(47, 16)); let d = ''; const r = RS(12);
  for (let i = 0; i < 120; i++) { const x = -500 + r() * 1700, y = 300 + pmod(r() * 1000 + t * (520 + r() * 200), 1000); d += `<path d="M${x.toFixed(0)},${y.toFixed(0)} l-4,26" stroke="#bfe4ff" stroke-width="2.5" opacity="${(rn * (.3 + r() * .4)).toFixed(2)}"/>`; }
  const s = buriedCity(t, { deep: .6, air: sn * .9, id: 'ar' }) + d + `<g style="filter:hue-rotate(0deg)">` + snowW(t, 260, sn, -500, 1220, 300, 1300, 14).replace(/#fff/g, '#bfdcff') + `</g>`;
  F.ov = thermo(1090, 440, 230, lerp(-178, -200, ramp(t, S0(47), S0(48))), -250, 20) + `<g opacity="${ramp(t, WS(47, 9), WS(47, 9) + .4).toFixed(2)}">` + panel(96, 250, 370, 150) + txt(281, 300, 'الأكسجين: ١٨٣° تحت الصفر', 1, '#9fd4ff', 23) + txt(281, 358, 'النيتروجين: ١٩٦° تحت الصفر', ramp(t, WS(47, 10), WS(47, 10) + .4), '#cfe0ff', 23) + `</g>`;
  return camMv(s, t, S0(47) - .2, S0(48), [1.0, 380, 760], [1.2, 400, 800]);
}
function sceneAirLayer(t) {
  noW(); const k = ease(ramp(t, WS(48, 3), WS(48, 8))), gy = 1000, bh = 140, lay = bh * k;
  let s = skyR('al2', ['#04060f', '#080e22', '#101a34'], -700, 1500) + starsWd(t, -500, 1220, 150, 960, 420, 71, .2) + `<rect x="-700" y="${gy}" width="2200" height="400" fill="#8a9cb8"/><rect x="-500" y="${gy}" width="1720" height="300" fill="#fff" filter="url(#wallI)" opacity=".5"/>` + aptBrick(240, gy, 150, bh, '#a8785a', 5, { rows: 3, ground: 0, fh: 44, roof: 0 }) +
    NB(stander(450, gy, 1, .075, 1, t, {}), .9) + `<rect x="-700" y="${gy - lay}" width="2200" height="${lay}" fill="#a8cdf6" opacity=".78"/><rect x="-500" y="${gy - lay}" width="1720" height="${lay}" fill="#fff" filter="url(#wallI)" opacity=".5"/><rect x="-700" y="${gy - lay - 2}" width="2200" height="4" fill="#eef6ff" opacity="${k}"/>` + `<g opacity="${(1 - k * .8).toFixed(2)}">` + snowW(t, 200, 1, -500, 1220, 400, gy, 3).replace(/#fff/g, '#bfdcff') + `</g>`;
  F.ov = `<g opacity="${ramp(t, WS(48, 11), WS(48, 11) + .5).toFixed(2)}"><path d="M880,672 V308 M866,308 h28 M866,672 h28" stroke="#f4c76b" stroke-width="4" fill="none"/>` + txt(990, 500, '١٠ أمتار', 1, '#f4c76b', 40) + txt(990, 546, 'هواءٌ متجمّد', 1, '#cfe0ff', 24) + `</g>` + txt(367, 640, 'مبنًى من ٣ طوابق', ramp(t, WS(48, 11), WS(48, 11) + .5), '#fff', 22);
  return camG(s, 2.6, 420, 880);
}
function sceneSilent(t) {
  noW(); const st = 1 - ramp(t, WS(49, 13), WS(49, 16)), sp = 1 - ease(ramp(t, WS(49, 3), WS(49, 6))), s = cityW(t, { id: 'si', seed: 21, dark: 1, lit: 0, clouds: 0, snow: 1, stars: 0, noTrees: 1 }) + `<rect x="-700" y="100" width="2200" height="900" fill="#020308" opacity=".55"/>` + `<g opacity="1">` + milkyW(.9, 360, 420, -16, 1) + starsWd(t, -500, 1220, 120, 760, 560, 77, st) + `</g>` + buriedOnly(.62, .9);
  F.ov = `<g opacity="${ramp(t, WS(49, 3), WS(49, 3) + .4).toFixed(2)}">` + panel(96, 250, 250, 170) + `<path d="M150,320 l26,0 l30,-26 l0,82 l-30,-26 l-26,0Z" fill="#fff"/>` + [0, 1, 2].map(i => `<path d="M${222 + i * 22},${306 - i * 10} q${14 + i * 4},${29 + i * 10} 0,${58 + i * 20}" stroke="#fff" stroke-width="4" fill="none" opacity="${(sp * (1 - i * .2)).toFixed(2)}"/>`).join('') + (sp < .4 ? `<path d="M214,292 l76,86 M290,292 l-76,86" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round"/>` : '') + txt(221, 400, 'لا صوت', 1, '#fff', 22) + `</g>`;
  return camMv(s, t, S0(49) - .2, S0(50), [1.0, 380, 700], [1.1, 420, 660]);
}
function buriedOnly(dp, air) { const x0 = -470, x1 = 1190, y = 1000 - dp * 190; let d = `<path d="M${x0 - 100},1500 L${x0 - 100},${y}`; for (let x = x0 - 100; x <= x1 + 100; x += 40) d += ` L${x},${(y - 26 * Math.sin(x * .013 + 1) - 14 * Math.sin(x * .031)).toFixed(1)}`; d += ` L${x1 + 100},1500Z"`; return d + ` fill="${mix('#6a7c98', '#6f9ad0', air)}"/>` + d + ` fill="#fff" filter="url(#wallI)" opacity=".4"/>`; }
chip('سماءٌ سوداء · نجومٌ ثابتة', 720, 150, 'dark', WS(49, 11), S0(50) - .3);
function sceneRays(t) {
  noW(); let ry = ''; const r = RS(19); for (let i = 0; i < 9; i++) { const ph = pmod(t * (.7 + r() * .5) + r(), 1), x = -300 + r() * 1300, gy = 880, k = clamp(ph * 3), hit = ph > .33 ? clamp(1 - (ph - .33) * 3) : 0;
    ry += `<path d="M${(x + 200 * (1 - k)).toFixed(0)},${(gy - 700 * (1 - k)).toFixed(0)} l${(-200 * Math.min(k, .5)).toFixed(0)},${(700 * Math.min(k, .5)).toFixed(0)}" stroke="#d8a8ff" stroke-width="3" opacity="${(ph < .33 ? .9 : hit * .5).toFixed(2)}"/>` + (hit > 0 ? `<circle cx="${x.toFixed(0)}" cy="${gy}" r="${(10 + (1 - hit) * 46).toFixed(0)}" fill="none" stroke="#e8c8ff" stroke-width="3" opacity="${hit.toFixed(2)}"/>` : ''); }
  const s = cityW(t, { id: 'ry', seed: 21, dark: 1, lit: 0, clouds: 0, snow: 1, stars: 0, noTrees: 1 }) + `<rect x="-700" y="100" width="2200" height="900" fill="#020308" opacity=".55"/>` + milkyW(.9, 360, 420, -16, 1) + starsWd(t, -500, 1220, 120, 760, 560, 77, 0) + buriedOnly(.62, .9) + ry;
  return camMv(s, t, S0(50) - .2, S0(51), [1.1, 420, 660], [1.2, 440, 700]);
}
chip('أشعّةٌ كونيّة', 640, 150, 'red', WS(50, 3), S0(51) - .3);
// the hydrothermal vents on the sea floor
function chimney(x, y, h, w, seed, t, glow = 1) { const r = RS(seed); let p = `M${x - w},${y}`; for (let i = 0; i <= 6; i++) p += ` L${(x - w * (1 - i / 6 * .62) + (r() - .5) * w * .3).toFixed(1)},${(y - h * i / 6).toFixed(1)}`; for (let i = 6; i >= 0; i--) p += ` L${(x + w * (1 - i / 6 * .62) + (r() - .5) * w * .3).toFixed(1)},${(y - h * i / 6).toFixed(1)}`;
  let sm = ''; for (let i = 0; i < 14; i++) { const k = pmod(t * .16 + i / 14 + r(), 1), sx = x + Math.sin(k * 5 + i) * (10 + k * 46) + k * 30, sy = y - h - k * 330, sr = 10 + k * 56; sm += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${sr.toFixed(1)}" fill="${i % 2 ? '#4a4640' : '#2e2c2a'}" opacity="${(.8 * (1 - k)).toFixed(2)}"/>`; }
  return `<circle cx="${x}" cy="${y - h * .3}" r="${h * .9}" fill="url(#fireGlow)" opacity="${(.22 * glow).toFixed(2)}"/><g filter="url(#blur2)">${sm}</g><path d="${p}Z" fill="#3a302a"/><path d="${p}Z" fill="#000" filter="url(#rockTex)" opacity=".6"/><ellipse cx="${x}" cy="${y - h}" rx="${w * .42}" ry="5" fill="#ff8a3a" opacity="${(.8 * glow).toFixed(2)}"/><path d="M${x - w * .5},${y} q${w * .5},-${h * .2} ${w},0Z" fill="#ffb04a" opacity="${(.25 * glow).toFixed(2)}"/>`; }
function worms(x, y, n, seed, t, sc = 1) { const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const dx = (i - n / 2) * 10 * sc + r() * 6, h = (50 + r() * 60) * sc, sw = Math.sin(t * 1.2 + i) * 4; s += `<path d="M${(x + dx).toFixed(1)},${y} q${(sw - 4).toFixed(1)},${(-h * .5).toFixed(1)} ${sw.toFixed(1)},${(-h).toFixed(1)}" stroke="#e8e2d6" stroke-width="${(7 * sc).toFixed(1)}" fill="none" stroke-linecap="round"/><path d="M${(x + dx + sw).toFixed(1)},${(y - h).toFixed(1)} q${(sw * .5).toFixed(1)},${(-14 * sc).toFixed(1)} ${(sw * .3).toFixed(1)},${(-20 * sc).toFixed(1)}" stroke="#d8382a" stroke-width="${(8 * sc).toFixed(1)}" fill="none" stroke-linecap="round"/>`; } return s; }
function ventW(t, o = {}) { const x0 = -560, x1 = 1280, gy = 1040, r = RS(5);
  let s = `<defs>${DEFB()}<linearGradient id="dp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040a"/><stop offset=".7" stop-color="#06101e"/><stop offset="1" stop-color="#0c1a2c"/></linearGradient></defs><rect x="${x0 - 200}" y="-200" width="${x1 - x0 + 400}" height="1800" fill="url(#dp)"/>` + ridge(x0, x1, gy - 30, 90, 81, '#10161e', { n0: 6 }) + chimney(-150, gy, 250, 44, 3, t) + chimney(950, gy + 10, 210, 40, 9, t) +
    `<path d="${hillP(x0, x1, gy, 16, .7, 300)}" fill="#1c2026"/><path d="${hillP(x0, x1, gy, 16, .7, 300)}" fill="#000" filter="url(#rockTex)" opacity=".55"/>` + chimney(240, gy + 16, 320, 56, 1, t) + chimney(390, gy + 20, 200, 40, 2, t) + chimney(640, gy + 24, 260, 48, 4, t);
  s += worms(300, gy + 20, 9, 1, t) + worms(470, gy + 24, 7, 2, t, .8) + worms(700, gy + 28, 10, 3, t) + worms(110, gy + 22, 6, 4, t, .7) + worms(840, gy + 20, 6, 6, t, .75);
  [[200, 1], [560, -1], [780, 1]].forEach(([cx, f], i) => { const x = cx + Math.sin(t * .4 + i) * 16; s += `<g transform="translate(${x.toFixed(1)},${gy + 40}) scale(${f},1)"><ellipse rx="15" ry="9" fill="#e8e0d4"/><path d="M-12,4 l-12,10 M-6,7 l-8,14 M6,7 l8,14 M12,4 l12,10 M14,-4 l12,-8 l5,5" stroke="#e8e0d4" stroke-width="3" fill="none"/></g>`; });
  for (let i = 0; i < 80; i++) { const x = x0 + r() * (x1 - x0), y = pmod(r() * 1200 + t * (6 + r() * 10), 1200) - 100; s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1 + r() * 1.6).toFixed(1)}" fill="#cfe0ff" opacity="${(.12 + r() * .25).toFixed(2)}"/>`; }
  return s; }
function sceneDeepDive(t) {
  noW(); const a = S0(51) - .2, dive = ease(ramp(t, WS(51, 7), S0(52)));
  if (dive < .5) { F.ov = `<g opacity="${(ramp(t, WS(51, 3), WS(51, 3) + .4) * (1 - dive * 2)).toFixed(2)}"><path d="M250,250 v236 M236,250 h28 M236,486 h28" stroke="#f4c76b" stroke-width="4" fill="none"/>` + txt(420, 380, 'مئاتُ الأمتار', 1, '#f4c76b', 32) + `</g>`; return camG(iceLid(t, { id: 'dd', top: 640, th: 260, bot: 2600 }), .9, 360, lerp(760, 1900, dive * 2)) + `<rect width="1280" height="720" fill="#02040a" opacity="${(dive * 2).toFixed(2)}"/>`; }
  F.ov = txt(1040, 250, 'العمق: ٣٬٠٠٠ متر', (dive - .5) * 2, '#7ac0ff', 26);
  return camG(ventW(t), 1.0, 380, lerp(300, 760, (dive - .5) * 2)) + `<rect width="1280" height="720" fill="#02040a" opacity="${(1 - (dive - .5) * 2).toFixed(2)}"/>`;
}
function sceneVents(t) {
  noW(); F.ov = `<g opacity="${ramp(t, WS(52, 11), WS(52, 11) + .5).toFixed(2)}">` + txt(760, 330, '٤٠٠°', 1, '#ffb04a', 56) + arrow(700, 340, 610, 400, 1, '#ffb04a', 4) + `</g>` + txt(300, 640, 'ينابيعُ حارّة في قاع المحيط', ramp(t, WS(52, 1), WS(52, 1) + .5), '#fff', 26);
  return camMv(ventW(t), t, S0(52) - .2, S0(53), [1.0, 380, 760], [1.5, 300, 830]);
}
function sceneWorms(t) {
  noW(); const a = ramp(t, WS(53, 7), WS(53, 7) + .5), r = RS(4); let b = ''; for (let i = 0; i < 30; i++) { const x = 960 + (r() - .5) * 190 + Math.sin(t + i) * 4, y = 370 + (r() - .5) * 150 + Math.cos(t * .8 + i) * 4; b += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="20" height="8" rx="4" fill="${['#f4c76b', '#ffb04a', '#e8e0a0'][i % 3]}" opacity=".9" transform="rotate(${(r() * 180).toFixed(0)},${x.toFixed(1)},${y.toFixed(1)})"/>`; }
  F.ov = `<g opacity="${a.toFixed(2)}"><circle cx="960" cy="370" r="128" fill="#101822" stroke="#c8ccd4" stroke-width="7"/>${b}` + txt(960, 540, 'بكتيريا: كيمياء ← غذاء', 1, '#f4c76b', 26) + `</g>` + txt(330, 250, 'ديدانٌ أنبوبيّة عملاقة', ramp(t, WS(53, 15), WS(53, 15) + .5), '#ff8a7a', 28);
  return camMv(ventW(t), t, S0(53) - .2, S0(54), [1.9, 330, 900], [2.3, 350, 960]);
}
function alvin(x, y, s, t) { return `<g transform="translate(${x.toFixed(1)},${(y + Math.sin(t * .8) * 6).toFixed(1)}) scale(${s})"><path d="M-70,10 l-330,60 l0,190 l330,-120Z" fill="#fff6dc" opacity=".09"/><rect x="-80" y="-44" width="170" height="80" rx="34" fill="#f2f2ee"/><rect x="-80" y="-44" width="170" height="30" rx="20" fill="#fff"/><rect x="-10" y="-70" width="60" height="30" rx="6" fill="#e0483a"/><circle cx="-50" cy="-2" r="20" fill="#1a2a3a"/><circle cx="-50" cy="-2" r="14" fill="#5ab0d8" opacity=".7"/><rect x="90" y="-16" width="26" height="30" fill="#c8ccd4"/><path d="M-60,36 l-30,34 l-18,-4" stroke="#8a929e" stroke-width="6" fill="none"/><circle cx="-84" cy="18" r="8" fill="#fff6dc"/><rect x="-60" y="38" width="130" height="8" fill="#8a929e"/></g>`; }
function sceneAlvin(t) {
  noW(); const x = lerp(1150, 720, ease(ramp(t, S0(54), S0(54) + 5)));
  return camMv(ventW(t) + alvin(x, 720, 1.1, t), t, S0(54) - .2, S0(55), [1.2, 520, 800], [1.3, 480, 820]);
}
chip('اكتشافُ عام ١٩٧٧', 640, 150, 'big', WS(54, 2), S0(55) - .4);
function sceneVentsFar(t) {
  noW(); return camMv(ventW(t), t, S0(55) - .2, CS(9) + .5, [1.5, 420, 880], [.95, 380, 740]);
}
chip('فهل تصمدُ إلى النهاية؟', 640, 150, 'red', WS(55, 7), CS(9));
