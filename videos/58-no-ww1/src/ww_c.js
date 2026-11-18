// ww_c.js: #58 scenes 9-12: the corporal wounded in the trenches, Versailles, the Second World War on the globe, the poor painter, the ending; the scene list, chips and side list

// ---------- 9: the twist: in its trenches a simple soldier was wounded: Adolf Hitler ----------
function flare(x, y, k, t) { return scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(260 * k).toFixed(1)}" fill="url(#flareG)" opacity=".8"/>`) + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6" fill="#fffbe8"/><path d="M${x.toFixed(1)},${(y - 8).toFixed(1)} q-6,-30 4,-70" stroke="#c8c4bc" stroke-width="3" fill="none" opacity=".4"/>`; }
function sceneCorporal(t) {
  const t0 = S0(9) - .2, T = t - t0, la = ease(ramp(t, WS(9, 7) - .2, WS(9, 8) + .3));
  let s = `<defs>${WWD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#nightW)"/>` + space(t).replace(/<rect[^>]*\/>/, '');
  s += `<g transform="translate(360,1120) scale(${(1.32 + .06 * ease(clamp(T / 5))).toFixed(3)}) translate(-360,-1120)">`;
  const fy = 380 + pmod(T * 30, 300), fx = 520 - T * 6; s += flare(fx, fy, 1, t);
  s += `<path d="M-20,742 Q180,728 380,738 Q560,730 740,740 V830 H-20Z" fill="#2a2420"/>` + deadTree(200, 744, 120, 6, '#141210') + deadTree(600, 740, 90, 11, '#141210') + wireLine(-20, 740, 800, .8, 4).replace(/#2a2018|#1e1a16/g, '#0e0c0a');
  s += `<rect x="-20" y="820" width="760" height="360" fill="#3a2c22"/>`;
  for (let x = -20; x < 740; x += 30) s += `<rect x="${x}" y="860" width="28" height="270" fill="url(#plankG)"/><path d="M${x + 4},860 v270" stroke="#000" stroke-width="2" opacity=".25"/>`;
  s += `<rect x="-20" y="860" width="760" height="270" fill="#000" filter="url(#grainR)" opacity=".3"/>` + sandbags(-30, 760, 860, 3, '#8a7a5a') + `<rect x="-20" y="860" width="760" height="30" fill="url(#aoDn)" opacity=".7"/>`;
  s += `<rect x="-20" y="1140" width="760" height="160" fill="#2a2018"/>`; for (let x = -20; x < 740; x += 26) s += `<rect x="${x}" y="1150" width="22" height="12" fill="#5a4430"/>`;
  // the wounded corporal sits against the wall; a medic kneels and binds his head
  const hx0 = 330; s += p14(hx0, 1152, 1.08, 1, 1, t, { pal: { top: '#5e5a40', pants: '#4e4a32', skin: '#c89a74', hair: '#1a120c' }, stache: '#1a120c', h: { lF: [1.45, 1.5], lB: [2.0, .45], lean: -8, aF: [.5, 1.1], aB: [.3, 1.0], lookUp: -.1 } });
  { const [hx, hy] = HP.head, s1 = 1.08; s += `<path d="M${(hx - 21 * s1).toFixed(1)},${(hy - 10 * s1).toFixed(1)} Q${hx.toFixed(1)},${(hy - 22 * s1).toFixed(1)} ${(hx + 21 * s1).toFixed(1)},${(hy - 10 * s1).toFixed(1)} L${(hx + 21 * s1).toFixed(1)},${(hy - 1 * s1).toFixed(1)} Q${hx.toFixed(1)},${(hy - 12 * s1).toFixed(1)} ${(hx - 21 * s1).toFixed(1)},${(hy - 1 * s1).toFixed(1)}Z" fill="#eeeae0"/><path d="M${(hx - 18 * s1).toFixed(1)},${(hy - 6 * s1).toFixed(1)} Q${hx.toFixed(1)},${(hy - 16 * s1).toFixed(1)} ${(hx + 18 * s1).toFixed(1)},${(hy - 6 * s1).toFixed(1)}" stroke="#c8c0b0" stroke-width="2" fill="none"/>`;
    const fF = HP.footF; s += `<rect x="${(fF[0] - 64 * s1).toFixed(1)}" y="${(fF[1] - 20 * s1).toFixed(1)}" width="${(34 * s1).toFixed(1)}" height="${(20 * s1).toFixed(1)}" rx="6" fill="#eeeae0"/>`; }
  const HH = HP.head; s += soldier1(440, 1152, 1.0, -1, 2, t, { h: { lF: [1.5708, 0], lB: [.1, -1.5708], lean: 14, hF: [HH[0] + 26, HH[1] - 4], hB: [HH[0] + 30, HH[1] + 14] } }) + `<rect x="${(HP.chest[0] - 4).toFixed(1)}" y="${(HP.chest[1] - 40).toFixed(1)}" width="14" height="18" fill="#eeeae0" opacity=".9"/>`;
  s += `</g>` + scr(`<rect x="-20" y="-20" width="760" height="1320" fill="#ffe8b0" opacity="${(.06 + .03 * Math.sin(t * 7)).toFixed(3)}"/>`);
  if (la > 0) s += `<g opacity="${la.toFixed(2)}"><path d="M300,790 L300,720" stroke="#fff" stroke-width="3"/>${panel(120, 600, 360, 120)}${lbl(300, 660, 'أدولف هتلر', 1, '#f4c76b', 40)}${lbl(300, 700, 'جنديٌّ جُرِحَ عام ١٩١٦', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: Germany's defeat and the Treaty of Versailles angered him; twenty years later, a war that killed more than seventy million ----------
function chand(x, y, s, t) { let g = `<path d="M${x},${y - 160 * s} V${y - 60 * s}" stroke="#8a6a2a" stroke-width="${2 * s}"/>`; for (let r = 0; r < 3; r++) { const n = 6 + r * 3, R = (30 + r * 22) * s, yy = y - (40 - r * 26) * s; for (let i = 0; i < n; i++) { const a = i / n * 6.283, cx = x + Math.cos(a) * R; g += `<circle cx="${cx.toFixed(1)}" cy="${(yy + Math.sin(a) * R * .2).toFixed(1)}" r="${(4 * s).toFixed(1)}" fill="#fff8e0"/>`; } }
  return g + scr(`<circle cx="${x}" cy="${y - 10 * s}" r="${150 * s}" fill="url(#flareG)" opacity=".7"/>`); }
function sceneVers(t) {
  const t0 = S0(10) - .2, T = t - t0, sg = ease(ramp(t, WS(10, 2), WS(10, 4) + .4));
  let s = `<defs>${WWD()}<linearGradient id="mirG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8d0d4"/><stop offset=".4" stop-color="#8a9aa4"/><stop offset=".7" stop-color="#b8c4c8"/><stop offset="1" stop-color="#6a7a84"/></linearGradient><linearGradient id="gildG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6420"/><stop offset=".5" stop-color="#f0cc70"/><stop offset="1" stop-color="#9a7428"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#5a3e26"/>`;
  s += `<g transform="translate(360,900) scale(${(1 + .05 * ease(clamp(T / 4))).toFixed(3)}) translate(-360,-900)">`;
  // the vault with painted panels, the mirror arches between gilded pilasters
  s += `<rect x="-20" y="380" width="760" height="150" fill="#a8743a"/>` + [0, 1, 2, 3].map(i => `<rect x="${i * 190 + 10}" y="400" width="160" height="104" rx="8" fill="#c89a5a" stroke="url(#gildG)" stroke-width="6"/><path d="M${i * 190 + 30},480 Q${i * 190 + 90},420 ${i * 190 + 150},470" stroke="#8a5a3a" stroke-width="10" fill="none" opacity=".4"/><circle cx="${i * 190 + 70}" cy="450" r="16" fill="#e8c8a0" opacity=".5"/>`).join('') + `<rect x="-20" y="526" width="760" height="16" fill="url(#gildG)"/>`;
  for (let i = 0; i < 4; i++) { const x = i * 190 + 20; s += `<rect x="${x - 26}" y="542" width="22" height="430" fill="url(#gildG)"/><path d="M${x + 10},972 V640 A70,70 0 0 1 ${x + 150},640 V972Z" fill="#3a2a1a"/>`;
    for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) s += `<rect x="${x + 14 + c * 45}" y="${600 + r * 92}" width="42" height="88" fill="url(#mirG)" opacity=".9"/><path d="M${x + 20 + c * 45},${684 + r * 92} L${x + 50 + c * 45},${606 + r * 92}" stroke="#fff" stroke-width="5" opacity=".2"/>`;
    s += `<path d="M${x + 10},640 A70,70 0 0 1 ${x + 150},640" stroke="url(#gildG)" stroke-width="8" fill="none"/>`; }
  s += `<rect x="740" y="542" width="20" height="430" fill="url(#gildG)"/>` + chand(170, 640, .9, t) + chand(550, 640, .9, t);
  // the parquet floor
  s += `<rect x="-20" y="970" width="760" height="330" fill="#7a5232"/>`; for (let i = -10; i < 20; i++) s += `<path d="M${i * 60},970 L${i * 60 + 200},1300 M${i * 60},970 L${i * 60 - 200},1300" stroke="#4a3018" stroke-width="2" opacity=".5"/>`;
  s += `<rect x="-20" y="970" width="760" height="330" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="970" width="760" height="60" fill="#fff" opacity=".06"/>`;
  // the delegates behind the long table
  [[150, 1, 0], [300, 1, 2], [460, -1, 4], [600, -1, 1]].forEach(([x, f, k]) => { s += p14(x, 1150, .82, f, k, t, { stache: k % 2 ? '#d8d8d8' : '#3a2a1a', h: Object.assign({}, SEAT, { lean: 6, aF: [.7, 1.4] }), pal: { top: ['#1e1e22', '#2a2a30', '#262428', '#1c1c20', '#2e2a2a'][k] } }) + `<rect x="${x - 26}" y="1076" width="56" height="10" fill="#4a3020"/>`; });
  s += `<rect x="20" y="1030" width="680" height="30" fill="#2a5a3a"/><rect x="20" y="1030" width="680" height="6" fill="#fff" opacity=".15"/><rect x="20" y="1060" width="680" height="120" fill="#22503a"/><rect x="20" y="1060" width="680" height="120" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="40" y="1180" width="14" height="100" fill="#3a2414"/><rect x="666" y="1180" width="14" height="100" fill="#3a2414"/>`;
  // the treaty on the table, a pen signs it
  s += `<g transform="translate(360,1000) rotate(-3)"><rect x="-110" y="-120" width="220" height="150" fill="#f4ecd8"/><rect x="-110" y="-120" width="220" height="150" fill="#000" filter="url(#grainR)" opacity=".08"/>${lbl(0, -80, 'معاهدةُ فرساي', 1, '#3a2a1a', 24).replace(/stroke="#000"/, 'stroke="#f4ecd8"')}` + Array.from({ length: 5 }, (_, i) => `<path d="M-86,${-56 + i * 14} H86" stroke="#8a7a60" stroke-width="2"/>`).join('') +
    `<path d="M-60,14 ${Array.from({ length: 12 }, (_, i) => `l10,${i % 2 ? -8 : 8}`).join(' ')}" stroke="#1a1a3a" stroke-width="2.4" fill="none" stroke-dasharray="160" stroke-dashoffset="${(160 * (1 - sg)).toFixed(1)}"/><path d="M${(-60 + 120 * sg).toFixed(1)},14 l34,-60" stroke="#1a1a1a" stroke-width="5" stroke-linecap="round"/><path d="M${(-60 + 120 * sg).toFixed(1)},14 l6,-10" stroke="url(#brassG)" stroke-width="5"/></g>`;
  s += `</g>`;
  noEarth(); F.ov = ''; return s;
}
function sceneWW2(t) {
  const t0 = WS(10, 5) - .3, T = t - t0, n = ease(ramp(t, WS(10, 10) - .3, WS(10, 16) + .3)), cnt = ease(ramp(t, WS(10, 13), WS(10, 16) + .3)), pa = ease(ramp(t, WS(10, 13) - .3, WS(10, 13)));
  const G = gAt(t, 360, 640, { d: lerp(6.2, 9.2, ease(clamp(T / 4))), el: .45, lon: 16 + T * 11, clouds: .4, lights: .3, off: -.7 });
  F.w.disc.inf = { o: [50, 14], r: lerp(.02, 1.5, Math.pow(n, .8)), a: 1, g: lerp(0, .32, n) };
  const ya = ease(ramp(t, WS(10, 7) - .2, WS(10, 9))); let o = `<defs>${WWD()}</defs>`;
  if (ya > 0 && n < .2) o += `<g opacity="${(ya * (1 - n * 5)).toFixed(2)}">${panel(210, 1080, 300, 90)}${lbl(360, 1140, '١٩١٩ ← ١٩٣٩', 1, '#fff', 38)}</g>`;
  if (pa > 0) o += `<g opacity="${pa.toFixed(2)}">${panel(150, 1100, 420, 110)}${lbl(360, 1162, '+' + AR4(Math.round(70 * cnt)) + ' مليوناً', 1, '#ff8a7a', 44)}${lbl(360, 1196, 'قتلى الحربِ العالميّةِ الثانية', 1, '#fff', 22)}</g>`;
  F.ov = o; return space(t);
}

// ---------- 11: without the first war, Hitler might have stayed a poor painter selling small pictures ----------
function churchD(x, base, s) {   // a baroque church with a green dome and two bell towers (background)
  return `<g transform="translate(${x},${base}) scale(${s})"><rect x="-150" y="-200" width="300" height="200" fill="#e8dcc4"/><rect x="-150" y="-200" width="300" height="200" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    [-1, 1].map(d => `<rect x="${d * 150 - 30}" y="-330" width="60" height="330" fill="#ede2cc"/><path d="M${d * 150 - 34},-330 Q${d * 150},-400 ${d * 150 + 34},-330Z" fill="#5a9a84"/><path d="M${d * 150},-400 v-30" stroke="#8a7a3a" stroke-width="4"/><rect x="${d * 150 - 12}" y="-300" width="24" height="44" rx="12" fill="#3a3a3a"/>`).join('') +
    `<rect x="-70" y="-290" width="140" height="90" fill="#ede2cc"/><path d="M-80,-290 Q-80,-420 0,-430 Q80,-420 80,-290Z" fill="#5a9a84"/><path d="M-80,-290 Q-80,-420 0,-430" stroke="#fff" stroke-width="5" fill="none" opacity=".25"/><path d="M20,-428 Q70,-410 80,-290" stroke="#000" stroke-width="14" fill="none" opacity=".12"/><rect x="-12" y="-470" width="24" height="42" fill="#ede2cc"/><path d="M0,-470 v-30 M-10,-488 h20" stroke="#8a7a3a" stroke-width="4"/>` +
    `<path d="M-100,-200 L0,-250 L100,-200Z" fill="#f2e8d4"/>` + [-80, -40, 40, 80].map(cx => `<rect x="${cx - 6}" y="-196" width="12" height="196" fill="#fff" opacity=".5"/>`).join('') + `<path d="M-24,0 V-80 Q0,-110 24,-80 V0Z" fill="#3a2a1e"/></g>`; }
function easelP(x, y, s, k) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 L-6,-220 M40,0 L6,-220 M0,-200 L18,0" stroke="#7a5432" stroke-width="7" stroke-linecap="round"/><rect x="-66" y="-196" width="132" height="104" fill="#f2ecdc"/><rect x="-66" y="-196" width="132" height="104" fill="none" stroke="#6a4a2a" stroke-width="4"/>` +
  `<rect x="-60" y="-190" width="120" height="${(60).toFixed(0)}" fill="#9ac0dc" opacity="${(.85 * k).toFixed(2)}"/><path d="M-26,-112 V-140 Q0,-172 26,-140 V-112Z" fill="#6aa08a" opacity="${k.toFixed(2)}"/><rect x="-46" y="-130" width="92" height="34" fill="#e0d0b0" opacity="${k.toFixed(2)}"/><path d="M-60,-98 H60" stroke="#8a7a5a" stroke-width="3" opacity="${k.toFixed(2)}"/><rect x="-70" y="-94" width="140" height="8" fill="#6a4a2a"/></g>`; }
function scenePainter(t) {
  const t0 = S0(11) - .2, T = t - t0;
  let s = `<defs>${WWD()}${CUDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#oldSky)"/>` + cumulus(560, 520, 220, 5);
  s += `<g transform="translate(360,900) scale(${(1 + .04 * ease(clamp(T / 5))).toFixed(3)}) translate(-360,-900)">`;
  s += churchD(380, 880, .95) + `<rect x="-20" y="560" width="760" height="330" fill="#d8e4ec" opacity=".18"/>`;
  [[-40, 200, 380, '#e2c89a', 13, 0], [560, 200, 420, '#d4b8a4', 15, 2]].forEach(([x, w, h, c, sd, rf]) => { s += facade(x, 1000, w, h, { col: c, seed: sd, roof: rf, shops: 1, shut: sd === 13 ? '#5a3a2a' : null }); });
  s += `<rect x="-20" y="1000" width="760" height="70" fill="#b8ae9c"/><rect x="-20" y="1000" width="760" height="70" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1066" width="760" height="8" fill="#8a8274"/>` + cobbles(1074, 1300, '#6e665c', 9);
  // small watercolours leaning on a box
  [[470, 1062, '#9ac0dc'], [540, 1066, '#c8a070'], [606, 1062, '#8ab08a']].forEach(([x, y, c], i) => { s += `<g transform="rotate(${-6 + i * 4},${x},${y})"><rect x="${x - 28}" y="${y - 70}" width="56" height="70" fill="#f2ecdc" stroke="#6a4a2a" stroke-width="3"/><rect x="${x - 22}" y="${y - 64}" width="44" height="30" fill="${c}"/><path d="M${x - 22},${y - 34} q22,-14 44,0 V${y - 10} H${x - 22}Z" fill="#b8a888"/></g>`; });
  // passers-by
  s += p14(pmod(700 - T * 46, 900) - 60, 1046, .62, -1, 4, t, { walk: T * 2.6, hat: 'lady', skirt: '#4a3a5a', hatC: '#3a2a2a' }) + p14(pmod(40 + T * 40, 900) - 120, 1050, .64, 1, 3, t, { walk: T * 2.4 + 1, hat: 'bowler' });
  // the young painter at his easel, dabbing with the brush
  const bx = 250, dab = Math.sin(t * 3.4) * 8;
  s += easelP(bx + 120, 1066, .95, ease(clamp(T / 3) * .7 + .3)) + p14(bx, 1066, .92, 1, 0, t, { pal: { top: '#3a3430', pants: '#2a2622', skin: '#d0a07a', hair: '#1a120c' }, stache: '#1a120c', h: { hF: [bx + 70 + dab, 900 + dab * .5], aB: [.4, 1.3] } });
  { const H = HP.hand; s += `<path d="M${H[0].toFixed(1)},${H[1].toFixed(1)} l22,-14" stroke="#6a4a2a" stroke-width="4" stroke-linecap="round"/><circle cx="${(H[0] + 22).toFixed(1)}" cy="${(H[1] - 14).toFixed(1)}" r="3" fill="#3a6a9a"/>`; }
  s += `</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: would the world have been better? Comment, subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, T = t - (S0(12) - .2);
  gAt(t, 360, 760, { d: lerp(9.4, 9.0, ease(clamp(T / 3))), el: .3, lon: 20 + T * 7, clouds: .45, lights: .4, off: -.6 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 9) - .3, WS(12, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}

const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneShot }, { s: WS(1, 10) - .3, f: sceneWar }, { s: S0(2) - .2, f: sceneTrench }, { s: S0(3) - .2, f: sceneFlu }, { s: WS(3, 9) - .3, f: sceneFluG }, { s: S0(4) - .2, f: sceneEmp },
  { s: S0(5) - .2, f: sceneRussia }, { s: S0(6) - .2, f: sceneSykes }, { s: S0(7) - .2, f: sceneAlt }, { s: S0(8) - .2, f: scenePlanes }, { s: WS(8, 12) - .3, f: sceneTank }, { s: S0(9) - .2, f: sceneCorporal },
  { s: S0(10) - .2, f: sceneVers }, { s: WS(10, 5) - .3, f: sceneWW2 }, { s: S0(11) - .2, f: scenePainter }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneWar, sceneFluG, sceneEmp, sceneSykes, sceneAlt, sceneWW2]);
const XF = .5;
const TLI = [['الإنفلونزا', S0(3)], ['الإمبراطوريّات', S0(4)], ['الحدود', S0(6)], ['العلم', S0(8)]];
const LIST_ON = new Set([scenePlanes]);
const CHIPS = [
  ['c0', '١٩١٤ – ١٩١٨', 360, 1200, 'big', WS(0, 4), S0(1) - .3],
  ['c1', 'صيفَ ١٩١٤', 360, 330, 'big', WS(1, 0), WS(1, 7) - .1],
  ['c1a', 'سَراييفو', 360, 330, 'red big', WS(1, 7), WS(1, 10) - .1],
  ['c1b', 'أكثرُ من ٣٠ دولة', 360, 330, 'big', WS(1, 12), S0(2) - .3],
  ['c2', 'الخنادق', 360, 330, 'big', WS(2, 2), WS(2, 5) - .1],
  ['c2b', 'الغازُ السامّ', 360, 330, 'red big', WS(2, 5), S0(3) - .3],
  ['c3', 'إنفلونزا ١٩١٨', 360, 330, 'red big', WS(3, 3), WS(3, 13) - .1],
  ['c3b', 'أكثرُ من الحربِ نفسِها', 360, 330, 'red big', WS(3, 13), S0(4) - .3],
  ['c4', 'سقوطُ أربعِ إمبراطوريّات', 360, 330, 'big', WS(4, 2), S0(5) - .3],
  ['c5', 'روسيا ١٩١٧', 360, 330, 'big', WS(5, 1), WS(5, 6) - .1],
  ['c5b', 'الاتّحادُ السوفيتيّ', 360, 330, 'red big', WS(5, 6), S0(6) - .3],
  ['c6', 'سايكس – بيكو ١٩١٦', 360, 330, 'big', WS(6, 0), WS(6, 6) - .1],
  ['c6b', 'حدودٌ ما زالت قائمة', 360, 330, 'big', WS(6, 6), S0(7) - .3],
  ['c7', 'لو لم تقُم الحرب…', 360, 330, 'ice', WS(7, 0), WS(7, 7) - .1],
  ['c7b', 'خريطةٌ أخرى للعالم', 360, 330, 'big', WS(7, 7), S0(8) - .3],
  ['c8', 'الحربُ سرّعت العلم', 360, 330, 'big', WS(8, 1), WS(8, 12) - .1],
  ['c8b', 'أوّلُ دبّابة — ١٩١٦', 360, 330, 'big', WS(8, 13), WS(8, 15) - .1],
  ['c9', 'والمفاجأة؟', 360, 330, 'big', WS(9, 0), S0(10) - .3],
  ['c10', 'معاهدةُ فرساي ١٩١٩', 360, 330, 'big', WS(10, 2), WS(10, 5) - .1],
  ['c10b', 'الحربُ العالميّةُ الثانية', 360, 330, 'red big', WS(10, 10), S0(11) - .3],
  ['c11', 'ربّما… رسّامٌ فقير', 360, 330, 'big', WS(11, 3), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ما غيّرته الحرب</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
