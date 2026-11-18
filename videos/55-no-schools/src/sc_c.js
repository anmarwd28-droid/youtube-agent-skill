// ---------- #55 scenes 9-12: knowledge dies with its owner, the Greek word for leisure, a classroom for every child, the end ----------
function scroll(x, y, w, rot, c = '#e8d6a8') { return `<g transform="translate(${x},${y}) rotate(${rot})"><rect x="${-w / 2}" y="-9" width="${w}" height="18" rx="9" fill="${c}"/><rect x="${-w / 2}" y="-9" width="${w}" height="6" rx="3" fill="#fff" opacity=".25"/><ellipse cx="${w / 2}" cy="0" rx="5" ry="9" fill="#b89a64"/><circle cx="${w / 2}" cy="0" r="3" fill="#7a5a34"/></g>`; }
function sceneLost(t) {
  const t0 = S0(9) - .2, T = t - t0, out = ease(ramp(t, WS(9, 6) - .1, WS(9, 6) + .5)), gone = ease(ramp(t, WS(9, 7), WS(9, 10) + .3));
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#3a322c"/>`;
  // a stone wall with a shelf of scrolls, an arched window with the moon
  s += `<rect x="-20" y="380" width="760" height="660" fill="#5a5048"/><rect x="-20" y="380" width="760" height="660" fill="url(#brkL)" opacity=".5"/><rect x="-20" y="380" width="760" height="660" fill="#fff" filter="url(#wallI)" opacity=".15"/>`;
  s += `<path d="M90,760 V560 a70,70 0 0 1 140,0 V760Z" fill="#c8bca8"/><path d="M104,760 V566 a56,56 0 0 1 112,0 V760Z" fill="#141c3a"/>` + moonPh(180, 600, 22, .5, 1) + `<path d="M160,566 V760 M104,660 H216" stroke="#c8bca8" stroke-width="6"/>`;
  s += `<rect x="400" y="560" width="300" height="14" fill="#4a3020"/><rect x="400" y="700" width="300" height="14" fill="#4a3020"/>` + [0, 1, 2, 3, 4, 5].map(i => scroll(430 + i * 46, 548, 44, 90 + (i % 2) * 6) + scroll(430 + i * 46, 688, 44, 86 + (i % 3) * 4, '#dcc890')).join('');
  s += `<rect x="-20" y="1040" width="760" height="280" fill="#3a3028"/><rect x="-20" y="1040" width="760" height="280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // the desk, an old scholar writing, a pile of scrolls and the candle burning down
  const by = 1200, sc = 1.05, dy = by - 132 * sc;
  let D = `<rect x="300" y="${dy}" width="380" height="16" fill="#6a4426"/><path d="M320,${dy + 16} V${by} M660,${dy + 16} V${by}" stroke="#4a2e1a" stroke-width="12"/>`;
  D += man(230, by, sc, 1, 7, Object.assign({}, SEAT, { top: '#5a4a6a', hair: '#e0dcd4', lean: 18, hF: [400, dy - 4], hB: [370, dy] })) + beard({ f: 1, s: sc, c: '#e0dcd4' }) + `<rect x="${230 - 70}" y="${by - 76 * sc}" width="100" height="10" fill="#4a2e1a"/><path d="M${230 - 60},${by - 66 * sc} V${by}" stroke="#3a2214" stroke-width="8"/>`;
  D += `<path d="M360,${dy} l90,-8 l40,8 l-90,6Z" fill="#e8d6a8"/>` + [0, 1, 2].map(i => `<path d="M372,${dy - 2 - i * 2} l60,-5" stroke="#5a4a3a" stroke-width="1.2" opacity=".6"/>`).join('') + `<path d="M404,${dy - 4} l26,-40" stroke="#e8e4d8" stroke-width="3"/>`;
  const pile = [[530, dy - 10, 70, 4], [580, dy - 10, 64, -6], [550, dy - 28, 70, 8], [600, dy - 30, 60, -3], [575, dy - 46, 66, 2]].map(([x, y, w, r]) => scroll(x, y, w, r)).join('');
  D += `<g opacity="${(1 - gone).toFixed(2)}">${pile}</g>` + dissolveR(500, dy - 60, 140, 60, gone, 13, ['#e8d6a8', '#b89a64', '#5a4a3a']);
  const ch = lerp(70, 22, ease(ramp(t, t0, WS(9, 6))));
  D += out < 1 ? `<g opacity="${(1 - out).toFixed(2)}">${candle(470, dy, ch, t, 2)}</g>` : '';
  D += `<rect x="459" y="${dy - ch}" width="22" height="${ch}" rx="3" fill="url(#waxG)" opacity="${out.toFixed(2)}"/>`;
  if (out > 0) D += Array.from({ length: 5 }, (_, i) => { const q = pmod((t - WS(9, 6)) * .5 + i / 5, 1); return `<ellipse cx="${(470 + Math.sin(q * 6 + i) * 12 * q).toFixed(1)}" cy="${(dy - ch - 8 - q * 160).toFixed(1)}" rx="${(4 + q * 16).toFixed(1)}" ry="${(6 + q * 12).toFixed(1)}" fill="#9a9aa4" opacity="${(out * .3 * (1 - q)).toFixed(2)}" filter="url(#blur2)"/>`; }).join('');
  s += D;
  s += scr(`<circle cx="470" cy="${dy - ch - 30}" r="360" fill="url(#lampW)" opacity="${(.95 * (1 - out)).toFixed(2)}"/>`) + `<rect x="-20" y="-20" width="760" height="1320" fill="#050816" opacity="${(.05 + .35 * out).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: the twist: "school" comes from the Greek scholē, which means free time ----------
function column(x, top, base, w) { let s = `<rect x="${x - w / 2}" y="${top}" width="${w}" height="${base - top}" fill="#eee6d6"/>`;
  for (let i = 1; i < 6; i++) s += `<path d="M${(x - w / 2 + i * w / 6).toFixed(1)},${top} V${base}" stroke="#c8bca4" stroke-width="2"/>`;
  s += `<rect x="${x - w / 2}" y="${top}" width="${w * .3}" height="${base - top}" fill="#fff" opacity=".25"/><rect x="${x + w * .2}" y="${top}" width="${w * .3}" height="${base - top}" fill="#000" opacity=".16"/>` +
    `<rect x="${x - w / 2 - 10}" y="${top - 18}" width="${w + 20}" height="18" fill="#e8dfcc"/><rect x="${x - w / 2 - 6}" y="${top - 4}" width="${w + 12}" height="6" fill="#000" opacity=".15"/><rect x="${x - w / 2 - 8}" y="${base - 12}" width="${w + 16}" height="12" fill="#e2d8c4"/>`;
  return s; }
function sceneGreek(t) {
  const t0 = S0(10) - .2, T = t - t0, la = ease(ramp(t, WS(10, 5) - .3, WS(10, 5) + .2)), ga = ease(ramp(t, WS(10, 9) - .2, WS(10, 9) + .3)), ma = ease(ramp(t, WS(10, 12) - .2, WS(10, 12) + .3));
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyDay)"/>${sun3(130, 700, .9)}` + cumulus(560 + T * 4, 700, 220, 71, { a: .55 });
  s += mountainsR(880, 90, 23, { rock: '#8a9aa8' }) + `<rect x="-20" y="860" width="760" height="460" fill="#c8b48a"/><rect x="-20" y="860" width="760" height="460" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // the stoa: a shaded back wall, columns, the entablature and roof, three steps
  s += `<rect x="40" y="700" width="700" height="300" fill="#a89a84"/><rect x="40" y="700" width="700" height="300" fill="#000" opacity=".25"/>`;
  s += `<path d="M20,660 L760,660 L760,700 L20,700Z" fill="#e8dfcc"/><path d="M20,700 H760" stroke="#000" stroke-width="5" opacity=".2"/><path d="M10,660 L760,640 L760,660 L10,660Z" fill="#b8604a"/>` + Array.from({ length: 18 }, (_, i) => `<rect x="${30 + i * 42}" y="672" width="18" height="18" fill="#c8bca4"/>`).join('');
  [100, 230, 360, 490, 620].forEach(x => s += column(x, 718, 1000, 46));
  s += [0, 1, 2].map(i => `<rect x="${-20 - i * 10}" y="${1000 + i * 22}" width="${780 + i * 20}" height="22" fill="${['#e4dac6', '#dcd2bc', '#d2c8b0'][i]}"/><rect x="-40" y="${1018 + i * 22}" width="820" height="4" fill="#000" opacity=".15"/>`).join('');
  s += treeR(680, 1080, 260, 47, t);
  // three men at leisure, talking
  const W = { top: '#efe8d8', pants: '#e4dccb' };
  s += man(190, 1044, .86, 1, 3, Object.assign({}, SEAT, W, { hipY: -50, aF: [1.2 + .3 * Math.sin(T * 2), 2.1], hB: [160, 990] }));
  s += man(330, 1066, .9, -1, 7, Object.assign({}, W, { hair: '#b8b4ac', aF: [.6 + .2 * Math.sin(T * 1.6 + 1), 1.4] })) + beard({ f: -1, s: .9, c: '#b8b4ac' });
  s += man(470, 1044, .86, -1, 1, Object.assign({}, SEAT, W, { hipY: -50, hF: [420, 980], hB: [440, 990] }));
  // the words
  if (la > 0) { let g = panel(80, 420, 560, 210) + `<text x="360" y="478" text-anchor="middle" font-family="Georgia,serif" font-size="32" fill="#fff" direction="ltr">school · école · Schule · scuola</text>`;
    g += `<g opacity="${ga.toFixed(2)}"><text x="360" y="560" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="64" fill="#f4c76b" direction="ltr">σχολή</text></g>`;
    g += `<g opacity="${ma.toFixed(2)}">${lbl(360, 612, '= وقتُ الفراغ', 1, '#fff', 32)}</g>`;
    s += `<g opacity="${la.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: today: learning became a right for every child ----------
function sceneClass(t) {
  const t0 = S0(11) - .2, T = t - t0;
  let s = `<defs>${SCD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#clsWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  [[40, 440], [220, 440]].forEach(([wx, wy]) => s += `<rect x="${wx - 8}" y="${wy - 8}" width="156" height="226" fill="#f4ecd8"/><rect x="${wx}" y="${wy}" width="140" height="210" fill="url(#winL)"/><path d="M${wx + 70},${wy} V${wy + 210} M${wx},${wy + 105} H${wx + 140}" stroke="#f4ecd8" stroke-width="7"/><path d="M${wx + 12},${wy + 180} L${wx + 62},${wy + 20}" stroke="#fff" stroke-width="10" opacity=".3"/>`);
  s += `<rect x="420" y="440" width="290" height="230" rx="6" fill="#6a4a2e"/><rect x="432" y="452" width="266" height="206" fill="url(#boardG)"/><rect x="424" y="666" width="282" height="10" fill="#8a6a4a"/>` +
    `<text x="565" y="530" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4f2e8" opacity=".85" direction="rtl">أ ب ت</text><text x="565" y="610" text-anchor="middle" font-family="Noto Naskh Arabic" font-size="38" fill="#f4f2e8" opacity=".8">١ + ٢ = ٣</text>`;
  // a small globe on the teacher's desk
  s += `<rect x="-20" y="900" width="760" height="420" fill="url(#clsFloor)"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="896" width="760" height="10" fill="#6a4a2a"/>`;
  s += scr(`<path d="M40,450 L360,450 L620,1240 L-100,1240Z" fill="url(#beamC)" opacity=".45"/>`);
  // the children at their desks, all facing the teacher; hands go up one by one
  const K = [[60, 1030, .62, 0], [230, 1030, .62, 1], [400, 1030, .62, 2], [30, 1215, .8, 3], [240, 1215, .8, 4], [450, 1215, .8, 5]];
  const PALK = [['#e85a2a', '#c89070'], ['#2a8a6a', '#8a5a3c'], ['#6a4a9a', '#e0b090'], ['#d8a02a', '#6a4028'], ['#2a5a9a', '#b47c5a'], ['#b04a6a', '#9a6448']];
  K.forEach(([x, y, sc, i]) => { const up = [1, 0, 1, 0, 1, 1][i] ? ease(ramp(t, t0 + .6 + [0, 0, 1.2, 0, 2.4, 3.4][i], t0 + 1 + [0, 0, 1.2, 0, 2.4, 3.4][i])) : 0;
    const dx = x + 70 * sc, dyy = y - 112 * sc;
    s += `<rect x="${x - 30 * sc}" y="${y - 76 * sc}" width="${56 * sc}" height="${8 * sc}" fill="#3a5a8a"/><path d="M${x - 26 * sc},${y - 68 * sc} V${y} M${x + 22 * sc},${y - 68 * sc} V${y}" stroke="#5a5a62" stroke-width="${5 * sc}"/><path d="M${x - 30 * sc},${y - 76 * sc} V${y - 170 * sc}" stroke="#5a5a62" stroke-width="${5 * sc}"/><rect x="${x - 34 * sc}" y="${y - 176 * sc}" width="${12 * sc}" height="${60 * sc}" rx="${3 * sc}" fill="#3a5a8a"/>`;
    const hF = up > 0 ? [lerp(dx, x + 70 * sc, up), lerp(dyy, y - 310 * sc, up)] : [dx, dyy];
    s += kid(x, y, sc, 1, i, Object.assign({}, SEAT, { top: PALK[i][0], skin: PALK[i][1], lean: 6, hF, hB: [dx - 10 * sc, dyy + 4 * sc] }), '');
    s += `<path d="M${x + 40 * sc},${y - 116 * sc} L${x + 150 * sc},${y - 116 * sc} L${x + 146 * sc},${y - 106 * sc} L${x + 44 * sc},${y - 106 * sc}Z" fill="url(#deskT)"/><path d="M${x + 50 * sc},${y - 106 * sc} V${y} M${x + 140 * sc},${y - 106 * sc} V${y}" stroke="#5a5a62" stroke-width="${6 * sc}"/>` +
      `<rect x="${x + 70 * sc}" y="${y - 122 * sc}" width="${40 * sc}" height="${6 * sc}" fill="#f4ecd8"/>`; });
  // the teacher at the board, pointing
  s += man(640, 1150, .92, -1, 9, { top: '#3a6a5a', hF: [575 + 6 * Math.sin(T * 2), 975], aB: [.1, .35] });
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 20 - (t - S0(12)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 9) - .3, WS(12, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneHome }, { s: S0(2) - .2, f: sceneClosed }, { s: S0(3) - .2, f: sceneBack }, { s: S0(4) - .2, f: sceneFire }, { s: S0(5) - .2, f: sceneSumer },
  { s: S0(6) - .2, f: sceneRead }, { s: S0(7) - .2, f: sceneDoctor }, { s: S0(8) - .2, f: sceneMothers }, { s: S0(9) - .2, f: sceneLost }, { s: S0(10) - .2, f: sceneGreek }, { s: S0(11) - .2, f: sceneClass }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneRead, sceneMothers, sceneGreek]);
const XF = .5;
const TLI = [['التقليد', S0(4)], ['بيتُ الألواح', S0(5)], ['القراءة', S0(6)], ['اليوم', S0(11)]];
const LIST_ON = new Set([sceneFire]);
const CHIPS = [
  ['c0', 'كلُّ المدارس… اختفت', 360, 1200, 'red big', WS(0, 4), S0(1) - .3],
  ['c1', 'صباحٌ بلا مدارس', 360, 330, 'big', WS(1, 0), S0(2) - .3],
  ['c2', 'أُغلقت المدارسُ عامَ ٢٠٢٠', 360, 330, 'red big', WS(2, 3), S0(3) - .3],
  ['c3', 'قبلَ أوّلِ مدرسة', 360, 330, 'big', WS(3, 8), S0(4) - .3],
  ['c4', 'التعلّمُ بالتقليد', 360, 330, 'big', WS(4, 2), S0(5) - .3],
  ['c5', 'بيتُ الألواح — سومر', 360, 330, 'big', WS(5, 4), S0(6) - .3],
  ['c6', 'القراءةُ سرّ', 360, 330, 'red big', WS(6, 3), S0(7) - .3],
  ['c7', 'لا أطبّاءَ ولا مهندسين', 360, 330, 'red big', WS(7, 2), S0(8) - .3],
  ['c8', 'والأخطر؟', 360, 330, 'red big', WS(8, 0), WS(8, 12) - .1],
  ['c8b', 'نصفُها بفضلِ تعليمِ الأمّهات', 360, 330, 'big', WS(8, 12), S0(9) - .3],
  ['c9', 'المعرفةُ تموتُ مع صاحبِها', 360, 330, 'red big', WS(9, 6), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', WS(10, 0), S0(11) - .3],
  ['c11', 'حقٌّ لكلِّ طفل', 360, 330, 'big', WS(11, 8), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">كيف تعلّمنا؟</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
