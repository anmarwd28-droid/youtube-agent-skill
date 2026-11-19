// gn_c.js (#62): scenes 10-14: the twist (gun-making built the modern world), the cannon-boring machine and the steam engine, identical parts, a slower world, the end
// a foundry / engine-house interior: brick walls, a high window with light rays, a stone floor
function hall(t, o = {}) {
  let s = `<defs>${GNDEF}<pattern id="brkH" width="44" height="22" patternUnits="userSpaceOnUse"><rect width="44" height="22" fill="#7a4a34"/><path d="M0,0 H44 M0,11 H44 M11,0 V11 M33,11 V22" stroke="#4a2a1c" stroke-width="2"/></pattern></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#brkH)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="-20" width="760" height="1320" fill="#1a0e08" opacity="${o.dark ?? .35}"/>`;
  s += `<path d="M470,420 h170 v260 h-170Z" fill="#d8e0e4"/><path d="M555,420 V680 M470,550 H640" stroke="#3a2a20" stroke-width="7"/><rect x="462" y="412" width="186" height="276" fill="none" stroke="#3a2416" stroke-width="12"/>`;
  s += scr(`<path d="M470,420 L640,420 L420,1180 L60,1180Z" fill="#fff4dc" opacity=".08" filter="url(#blur9)"/>`);
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#5a4e44"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="-20" y="1000" width="760" height="18" fill="#000" opacity=".3"/>`;
  return s;
}
// ---------- 10: the twist: guns helped make our modern world (a foundry casting a cannon) ----------
function sceneTwist(t) {
  const t0 = S0(10) - .2, T = t - t0;
  let s = hall(t, { dark: .55 });
  // the furnace glow and a ladle pouring molten metal into a mould
  s += scr(`<circle cx="120" cy="820" r="360" fill="url(#lnG)" opacity=".7"/>`) + `<path d="M-20,600 h230 v420 h-230Z" fill="url(#brkH)"/><path d="M-20,600 h230 v420 h-230Z" fill="#000" opacity=".35"/><path d="M-20,590 h240 v24 h-240Z" fill="#3a2a22"/>` +
    `<path d="M30,960 V820 Q100,740 170,820 V960Z" fill="#2a120a"/><path d="M42,960 V826 Q100,758 158,826 V960Z" fill="#ff8a2a"/><path d="M60,960 V850 Q100,800 140,850 V960Z" fill="#ffd26a" opacity="${(.6 + .25 * Math.sin(t * 9)).toFixed(2)}"/>` +
    scr(`<ellipse cx="100" cy="900" rx="${(40 + 6 * Math.sin(t * 7)).toFixed(1)}" ry="50" fill="#fff4c0" opacity=".5" filter="url(#blur9)"/>`) + `<path d="M30,960 h140 v60 h-140Z" fill="#3a2a22"/>`;
  const lx = 300, ly = 760;
  s += `<path d="M${lx - 60},${ly - 200} V${ly - 50}" stroke="#2a2420" stroke-width="5"/><path d="M${lx - 70},${ly - 50} h120 l-14,70 h-92Z" fill="url(#irG)"/><path d="M${lx + 50},${ly - 46} q30,0 40,20" stroke="#ffb040" stroke-width="10" fill="none"/>` +
    `<path d="M${lx + 90},${ly - 26} Q${lx + 96},${ly + 80} ${lx + 92},${ly + 170}" stroke="#ffcf5a" stroke-width="${(9 + 2 * Math.sin(t * 20)).toFixed(1)}" fill="none"/>` + scr(`<circle cx="${lx + 92}" cy="${ly + 170}" r="90" fill="url(#lnG)"/>`);
  s += `<path d="M${lx + 20},${ly + 170} h170 v60 h-170Z" fill="#3a3430"/><ellipse cx="${lx + 92}" cy="${ly + 172}" rx="22" ry="6" fill="#ffd27a"/>`;
  // a finished cannon barrel on a stand
  s += cannonG(480, 1120, 1.05, { el: -3 });
  // workers
  s += heroX(150, 1100, Object.assign({ s: .84, face: 1, shade: 1, hF: [lx - 40, ly - 30], aB: [.6, 1.5] }, gp(1)), L => `<path d="M-22,${L.ty + 30} Q2,${L.ty + 24} 26,${L.ty + 30} L30,${L.hipY + 60} L-26,${L.hipY + 60}Z" fill="#5a3a22"/><path d="M-22,${L.ty + 30} L-8,${L.ty + 28} L-10,${L.hipY + 60} L-26,${L.hipY + 60}Z" fill="#000" opacity=".25"/><path d="M${L.hx - 22},${L.hy - 12} Q${L.hx},${L.hy - 34} ${L.hx + 22},${L.hy - 12} Q${L.hx + 30},${L.hy - 10} ${L.hx + 32},${L.hy - 6} L${L.hx - 22},${L.hy - 8}Z" fill="#3a3632"/>`);
  s += `<path d="M${HP.hand[0].toFixed(1)},${HP.hand[1].toFixed(1)} L${lx - 60},${ly - 40}" stroke="#2a2420" stroke-width="6" stroke-linecap="round"/>`;
  for (let i = 0; i < 14; i++) { const r = RS(i + 40), ph = pmod(t * (.6 + r() * .4) + r(), 1), x = 380 + (r() - .5) * 60 + ph * (r() - .5) * 160, y = 940 - ph * 240; s += scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.4 * (1 - ph)).toFixed(1)}" fill="#ffd27a" opacity="${(1 - ph).toFixed(2)}"/>`); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: a machine to bore cannons precisely bored the cylinders of the first strong steam engines ----------
function borer(t, T) {
  let s = '';
  const adv = ease(clamp(T / 4)), rot = T * 6;
  // the drive: a big gear and a pinion
  s += gear(110, 700, 110, 18, rot * .3, '#5a5e64') + gear(250, 830, 46, 8, -rot * .72, '#6a6e74');
  s += `<rect x="70" y="820" width="70" height="200" fill="#3a2a1a"/><rect x="200" y="880" width="110" height="140" fill="#3a2a1a"/>`;
  // the bar: rotating stripes, entering the cannon blank
  const bx0 = 250, bx1 = 320 + adv * 250;
  s += `<rect x="${bx0}" y="816" width="${bx1 - bx0}" height="28" fill="url(#stV)"/>`;
  for (let x = bx0 - 30 + pmod(rot * 12, 30); x < bx1; x += 30) s += `<path d="M${x.toFixed(1)},816 l14,28" stroke="#4a525a" stroke-width="4" opacity=".6"/>`;
  // the blank: an iron cylinder on a wooden cradle
  s += `<path d="M320,770 h330 v120 h-330Z" fill="url(#irG)"/><path d="M320,780 h330" stroke="#a8b0b8" stroke-width="4" opacity=".5"/><ellipse cx="320" cy="830" rx="14" ry="60" fill="#2a2e34"/><ellipse cx="320" cy="830" rx="7" ry="20" fill="#0a0c10"/>`;
  s += `<path d="M300,890 h370 l-20,130 h-330Z" fill="url(#wdG)"/><path d="M300,890 h370 l-20,130 h-330Z" fill="#000" filter="url(#gnWood)" opacity=".5"/>`;
  // the cutting point glows inside, curls of iron fall out of the mouth
  s += scr(`<circle cx="${bx1}" cy="830" r="40" fill="url(#lnG)" opacity=".7"/>`);
  for (let i = 0; i < 8; i++) { const r = RS(i + 11), ph = pmod(T * .8 + i / 8, 1), x = 316 - ph * 20, y = 850 + ph * 150; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} c-8,-6 -8,-16 0,-18 c8,-2 10,8 2,12 c-6,3 -10,-2 -6,-6" stroke="#c0c4c8" stroke-width="2.4" fill="none" opacity="${(1 - ph).toFixed(2)}" transform="rotate(${(ph * 300 + i * 40).toFixed(0)},${x.toFixed(1)},${(y - 8).toFixed(1)})"/>`; }
  s += `<path d="M250,1010 Q300,990 340,1012" fill="#9aa0a6"/>`;
  return s;
}
function beamEngine(t, T) {
  const th = T * 2.6, R = 42, cx = 500, cy = 880, a = Math.asin(clamp(R * Math.sin(th) / 180, -1, 1)), px = 320, py = 540;
  const lx = px - 170 * Math.cos(a), ly = py - 170 * Math.sin(a), rx = px + 180 * Math.cos(a), ry = py + 180 * Math.sin(a), kx = cx + R * Math.cos(th), ky = cy + R * Math.sin(th);
  let s = '';
  // the stone pillar and the flywheel
  s += `<rect x="${px - 30}" y="${py}" width="60" height="${1010 - py}" fill="#8a7a66"/><rect x="${px - 30}" y="${py}" width="60" height="${1010 - py}" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="${px + 16}" y="${py}" width="14" height="${1010 - py}" fill="#000" opacity=".2"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="135" fill="none" stroke="#2a2e34" stroke-width="24"/><circle cx="${cx}" cy="${cy}" r="135" fill="none" stroke="#5a6068" stroke-width="6"/><path d="M${cx - 120},${cy - 50} A130,130 0 0 1 ${cx + 40},${cy - 128}" stroke="#a8b0b8" stroke-width="3" fill="none" opacity=".5"/>` +
    [0, 1, 2, 3, 4, 5].map(k => `<path d="M${cx},${cy} L${(cx + 125 * Math.cos(th + k * Math.PI / 3)).toFixed(1)},${(cy + 125 * Math.sin(th + k * Math.PI / 3)).toFixed(1)}" stroke="#3a3e44" stroke-width="12"/>`).join('') + `<circle cx="${cx}" cy="${cy}" r="22" fill="#4a4e54"/>`;
  s += `<rect x="${cx - 60}" y="${cy + 40}" width="30" height="${1010 - cy - 40}" fill="#3a2a1a"/>`;
  // the cylinder, the piston rod, the beam, the connecting rod
  const cylX = lx - 55;
  s += `<rect x="${cylX}" y="700" width="110" height="300" fill="url(#irG)"/><rect x="${cylX - 8}" y="694" width="126" height="16" rx="4" fill="#4a5058"/><rect x="${cylX - 8}" y="990" width="126" height="16" rx="4" fill="#4a5058"/>` +
    [0, 1, 2, 3].map(q => `<circle cx="${cylX + 8 + q * 31}" cy="702" r="3" fill="#a8b0b8"/>`).join('') + `<path d="M${cylX + 14},710 V990" stroke="#a8b0b8" stroke-width="4" opacity=".4"/>`;
  s += `<path d="M${lx.toFixed(1)},${ly.toFixed(1)} V694" stroke="#c8d0d8" stroke-width="10"/>`;
  s += `<path d="M${lx.toFixed(1)},${(ly - 14).toFixed(1)} L${rx.toFixed(1)},${(ry - 14).toFixed(1)} L${rx.toFixed(1)},${(ry + 14).toFixed(1)} L${lx.toFixed(1)},${(ly + 14).toFixed(1)}Z" fill="url(#wdG)"/><path d="M${lx.toFixed(1)},${(ly - 14).toFixed(1)} L${rx.toFixed(1)},${(ry - 14).toFixed(1)}" stroke="#b08050" stroke-width="3"/><circle cx="${px}" cy="${py}" r="14" fill="#2a2e34"/>`;
  s += `<path d="M${rx.toFixed(1)},${ry.toFixed(1)} L${kx.toFixed(1)},${ky.toFixed(1)}" stroke="#5a6068" stroke-width="12" stroke-linecap="round"/><circle cx="${kx.toFixed(1)}" cy="${ky.toFixed(1)}" r="9" fill="#a8b0b8"/>`;
  // steam puffs from the valve
  { let w = ''; for (let i = 0; i < 12; i++) { const ph = pmod(T * .6 + i / 12, 1); w += `<ellipse cx="${(cylX + 120 + ph * 70 + Math.sin(i * 2 + T) * 8).toFixed(1)}" cy="${(700 - ph * 220).toFixed(1)}" rx="${(14 + 46 * ph).toFixed(1)}" ry="${(10 + 30 * ph).toFixed(1)}" fill="#e8ecf0" opacity="${(.3 * (1 - ph)).toFixed(2)}"/>`; } s += `<g filter="url(#smB)">${w}</g>`; }
  return s;
}
function sceneBoring(t) {
  const t0 = S0(11) - .2, T = t - t0, sw = WS(11, 5) - .2, k = ease(ramp(t, sw, sw + .7));
  let s = hall(t, { dark: .4 });
  if (k < 1) s += `<g opacity="${(1 - k).toFixed(2)}">${borer(t, T)}${panel(150, 1080, 420, 100)}${GNL(360, 1128, 'آلةٌ لثقبِ المدافع', 1, '#fff', 28)}${GNL(360, 1164, '١٧٧٤م', 1, '#f4c76b', 26)}</g>`;
  if (k > 0) s += `<g opacity="${k.toFixed(2)}">${beamEngine(t, T)}${panel(110, 1080, 500, 100)}${GNL(360, 1128, 'أسطوانةُ المحرّكِ البخاريّ', 1, '#fff', 28)}${GNL(360, 1164, '١٧٧٦م', 1, '#f4c76b', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 12: gun factories taught the world identical parts; from them came factories and cars ----------
function lockPlate(x, y, s, ok) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><path d="M-40,-12 Q-44,0 -40,12 L30,14 Q44,8 44,0 Q44,-10 30,-14Z" fill="url(#stV)" stroke="#3a4048" stroke-width="1.6"/>` +
  `<circle cx="-18" cy="0" r="5" fill="#3a4048"/><circle cx="16" cy="2" r="4" fill="#3a4048"/><path d="M-6,-12 q10,-18 24,-14" stroke="#6a727a" stroke-width="5" fill="none"/>` + (ok ? `<circle cx="34" cy="-22" r="10" fill="#2e9a4a"/><path d="M29,-22 l4,4 l7,-8" stroke="#fff" stroke-width="2.6" fill="none"/>` : '') + `</g>`; }
function sceneParts(t) {
  const t0 = S0(12) - .2, T = t - t0, sw = WS(12, 8) - .2, k = ease(ramp(t, sw, sw + .7));
  let s = hall(t, { dark: .25 });
  if (k < 1) { let g = `<path d="M-20,900 h760 v30 h-760Z" fill="#6a4426"/><path d="M-20,930 h760 v90 h-760Z" fill="url(#wdG)"/><path d="M-20,930 h760 v90 h-760Z" fill="#000" filter="url(#gnWood)" opacity=".5"/>`;
    // rows of identical lock plates and gears; a gauge slides along and ticks each one
    const gx = 40 + 620 * ease(ramp(t, WS(12, 4), WS(12, 7) + .2));
    for (let row = 0; row < 2; row++) for (let i = 0; i < 6; i++) { const x = 90 + i * 108, y = 720 + row * 110; g += lockPlate(x, y, 1.05, x < gx); }
    for (let i = 0; i < 6; i++) g += gear(90 + i * 108, 880, 22, 10, i * .2, '#8a9098');
    g += `<g transform="translate(${gx.toFixed(1)},660)"><rect x="-8" y="0" width="16" height="250" fill="#c8a050"/><rect x="-40" y="-8" width="80" height="16" rx="4" fill="#c8a050"/></g>`;
    s += `<g opacity="${(1 - k).toFixed(2)}">${g}${panel(170, 1080, 380, 100)}${GNL(360, 1128, 'كلُّ قطعةٍ تُركَّبُ في أيِّ بندقيّة', 1, '#fff', 24)}${GNL(360, 1162, 'نحوَ ١٨٠٠م', 1, '#f4c76b', 24)}</g>`; }
  if (k > 0) { let g = `<rect x="-20" y="930" width="760" height="40" fill="#2a2c30"/><rect x="-20" y="970" width="760" height="30" fill="#3a3c42"/>` + Array.from({ length: 12 }, (_, i) => `<circle cx="${pmod(i * 70 + T * 50, 840) - 50}" cy="985" r="10" fill="#1a1a1e"/>`).join('') +
      Array.from({ length: 5 }, (_, i) => `<path d="M${pmod(i * 200 + T * 50, 1000) - 100},560 V700" stroke="#2a2a2e" stroke-width="3"/><path d="M${pmod(i * 200 + T * 50, 1000) - 110},700 h20 v14 h-20Z" fill="#3a3a40"/>`).join('') + `<rect x="-20" y="548" width="760" height="14" fill="#2a2a2e"/>`;
    const cols = ['#1a1a1c', '#2a2a2e', '#1c1c20', '#26262a'];
    for (let i = 0; i < 4; i++) { const x = pmod(i * 300 + T * 50, 1200) - 200; g += car(x, 930, 1.0, cols[i], 1, 0); }
    g += hero(170, 1200, Object.assign({ s: .74, face: 1, shade: 1, hF: [236, 1010], lookUp: -.3 }, gp(3))) + hero(580, 1210, Object.assign({ s: .76, face: -1, shade: 1, hF: [512, 1016], lookUp: -.3 }, gp(5)));
    s += `<g opacity="${k.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 13: a world without guns might be a little calmer... but slower to progress ----------
function sceneSlow(t) {
  const t0 = S0(13) - .2, T = t - t0, HZ = 760;
  let s = `<defs>${APDEFS()}${GNDEF}</defs>` + orchardBack(t, HZ, { house: [540, HZ + 22, .42], seed: 7 });
  s += `<path d="M-20,1040 Q360,1010 740,1046 L740,1130 Q360,1100 -20,1130Z" fill="#b89a6a"/><path d="M-20,1040 Q360,1010 740,1046 L740,1130 Q360,1100 -20,1130Z" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += oxCart(120 + T * 22, 1110, t, 1, 0, T * 1.6);
  s += hero(430 + T * 16, 1236, Object.assign({ s: .84, face: 1, shade: 1, walk: T * 4, amp: .42 }, gp(2))) + hero(520 + T * 16, 1226, Object.assign({ s: .8, face: 1, shade: 1, walk: T * 4 + 1.4, amp: .42 }, gp(6)));
  const ev = ease(ramp(t, WS(13, 7) - .2, WS(13, 9)));
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ff9a40" opacity="${(.12 * ev).toFixed(2)}" style="mix-blend-mode:multiply"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 14: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(14, 0) - .2, WS(14, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .35, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(14, 11) - .3, WS(14, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneBillion }, { s: S0(2) - .2, f: sceneAlchemy }, { s: S0(3) - .2, f: sceneFireworks }, { s: S0(4) - .2, f: sceneBattle },
  { s: S0(5) - .2, f: sceneWalls }, { s: S0(6) - .2, f: sceneSpeed }, { s: S0(7) - .2, f: sceneTrain }, { s: S0(8) - .2, f: sceneMap }, { s: S0(9) - .2, f: sceneWars },
  { s: S0(10) - .2, f: sceneTwist }, { s: S0(11) - .2, f: sceneBoring }, { s: S0(12) - .2, f: sceneParts }, { s: S0(13) - .2, f: sceneSlow }, { s: S0(14) - .2, f: sceneEarth }];
const NOKB = new Set([sceneBillion, sceneSpeed, sceneMap]);
const XF = .5;
const TLI = [['البارود', S0(2)], ['السيوف', S0(4)], ['القلاع', S0(5)], ['الجيوش', S0(7)], ['المفاجأة', S0(10)]];
const LIST_ON = new Set([sceneWars]);
const CHIPS = [
  ['c0', 'عالمٌ بلا أسلحةٍ ناريّة', 360, 1200, 'big', WS(0, 3), S0(1) - .3],
  ['c1', 'بدأت بصدفة', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', 'البارود ~ ٨٥٠م', 360, 330, 'big', WS(2, 0), WS(2, 13) - .1],
  ['c2b', 'اكتشافٌ بالصدفة', 360, 330, 'red big', WS(2, 13), S0(3) - .3],
  ['c3', 'عالمُنا: مدافعُ وبنادق', 360, 330, 'big', WS(3, 0), WS(3, 6) - .3],
  ['c3b', 'هنا: ألعابٌ ناريّةٌ فقط', 360, 330, 'big', WS(3, 6), S0(4) - .3],
  ['c4', 'سيوفٌ ورماحٌ وأقواس', 360, 330, 'big', WS(4, 0), WS(4, 5) - .1],
  ['c4b', 'الفارسُ سيّدُ المعركة', 360, 330, 'big', WS(4, 5), S0(5) - .3],
  ['c5', 'القلاعُ لا تسقط', 360, 330, 'big', WS(5, 0), WS(5, 8) - .1],
  ['c5b', 'المدافعُ هدمتها', 360, 330, 'red big', WS(5, 8), S0(6) - .3],
  ['c6', 'السهمُ ضدَّ الرصاصة', 360, 330, 'big', WS(6, 0), WS(6, 11) - .1],
  ['c6b', 'أسرعُ ١٥ مرّة', 360, 330, 'red big', WS(6, 11), S0(7) - .3],
  ['c7', 'جيوشٌ صغيرة', 360, 330, 'red big', WS(7, 12), S0(8) - .3],
  ['c8', 'لا حكمَ لقارّاتٍ بعيدة', 360, 330, 'big', WS(8, 0), WS(8, 8) - .1],
  ['c8b', 'خريطةٌ أخرى للعالم', 360, 330, 'big', WS(8, 8), S0(9) - .3],
  ['c9', 'الحروبُ لا تختفي', 360, 330, 'red big', WS(9, 0), WS(9, 4) - .1],
  ['c9b', 'آلافُ السنين قبلَ البارود', 360, 330, 'big', WS(9, 4), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', WS(10, 0), WS(10, 1) - .1],
  ['c10b', 'البنادقُ صنعت عالمَنا الحديث', 360, 330, 'big', WS(10, 1), S0(11) - .3],
  ['c11', 'آلةٌ لثقبِ المدافع', 360, 330, 'big', WS(11, 0), WS(11, 5) - .1],
  ['c11b', 'ومنها: المحرّكُ البخاريّ', 360, 330, 'big', WS(11, 5), S0(12) - .3],
  ['c12', 'قطعٌ متطابقةٌ تماماً', 360, 330, 'big', WS(12, 4), WS(12, 8) - .1],
  ['c12b', 'ومنها: المصانعُ والسيّارات', 360, 330, 'big', WS(12, 8), S0(13) - .3],
  ['c13', 'أهدأُ قليلاً', 360, 330, 'big', WS(13, 0), WS(13, 7) - .1],
  ['c13b', 'لكنْ أبطأ', 360, 330, 'red big', WS(13, 7), S0(14) - .3],
  ['c14', '@MadhaLawLab', 360, 1200, 'dark', WS(14, 11) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">عالمٌ بلا بنادق</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
