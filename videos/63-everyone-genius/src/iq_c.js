// iq_c.js (#63): scenes 10-14 (the test is relative, the Flynn effect, 1900, slowly, the end) + scene list and UI
// ---------- 10: the twist on the chalkboard: everyone shifts to 160, the test is re-normed, everyone is average again ----------
const BX2 = v => 230 + (v - 70) * 50 / 15;
function sceneRenorm(t) {
  const sh = ease(ramp(t, WS(10, 6) - .2, WS(10, 7) + .5)), er = clamp((t - WS(10, 8) + .1) / 1.1), dr = ease(ramp(t, WS(10, 10), WS(10, 12) + .3));
  const m = lerp(BX2(100), BX2(160), sh), ex = lerp(160, 720, er);
  let inn = `<g filter="url(#chalkF)"><path d="M70,860 H660" stroke="#f4f2ea" stroke-width="4"/></g>`;
  // gold: at first the tail above 130; while everyone moves up, the whole curve; after re-norming, the tail only again
  const cut = er < 1 ? lerp(BX2(130), m - 200, sh) : lerp(m - 200, BX2(190), dr);
  inn += bell(m, 50, 860, 300, 1, { cut, ca: 1 });
  const oldL = [[70, '٧٠'], [100, '١٠٠'], [130, '١٣٠'], [160, '١٦٠'], [190, '١٩٠']], newL = [[100, '٤٠'], [130, '٧٠'], [160, '١٠٠'], [190, '١٣٠']];
  oldL.forEach(([v, s]) => { const x = BX2(v); if (er > 0 && x < ex) return; inn += `<g filter="url(#chalkF)"><path d="M${x},852 v16" stroke="#f4f2ea" stroke-width="4"/></g>` + chalkT(x, 904, s, 1, v === 160 && sh > .5 ? '#f4c76b' : '#f4f2ea', 30); });
  newL.forEach(([v, s]) => { const x = BX2(v); if (er <= 0 || x > ex - 30) return; inn += `<g filter="url(#chalkF)"><path d="M${x},852 v16" stroke="#f4f2ea" stroke-width="4"/></g>` + chalkT(x, 904, s, 1, s === '١٠٠' ? '#f4c76b' : '#f4f2ea', 30); });
  if (er > 0 && er < 1) inn += `<g transform="translate(${ex.toFixed(1)},900) rotate(-6)"><rect x="-40" y="-26" width="80" height="44" rx="6" fill="#3a3a44"/><rect x="-40" y="6" width="80" height="12" fill="#c8c0a8"/></g><rect x="${(ex - 260).toFixed(1)}" y="870" width="260" height="60" fill="#fff" opacity=".05" filter="url(#blur9)"/>`;
  inn += chalkT(360, 500, 'الاختبارُ نِسبيّ', ease(ramp(t, WS(10, 1), WS(10, 2) + .3)), '#f4f2ea', 38);
  inn += chalkT(300, 600, 'الكلُّ متوسّط!', dr, '#ff8a7a', 40);
  let s = boardRoom(t, inn);
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: the Flynn effect: an exam hall, the projector shows scores rising about 3 points a decade ----------
function deskP(x, y, s, i, t) {   // a person seated at a desk, facing right, writing; (x, y) = floor under the hips
  let g = `<path d="M${x - 34 * s},${y - 76 * s} h${54 * s} M${x - 30 * s},${y - 76 * s} V${y} M${x + 16 * s},${y - 76 * s} V${y} M${x - 34 * s},${y - 80 * s} V${y - 190 * s}" stroke="#3a3a42" stroke-width="${6 * s}"/><rect x="${x - 36 * s}" y="${y - 84 * s}" width="${58 * s}" height="${10 * s}" rx="${3 * s}" fill="#5a4a3a"/>`;
  const wr = Math.sin(t * 9 + i * 2) * 4 * s;
  g += hero(x - 4 * s, y, Object.assign({}, SEAT, { s, face: 1, shade: 1, lean: 14, hF: [x + 74 * s + wr, y - 150 * s], hB: [x + 60 * s, y - 146 * s], lookUp: -.45, noShadow: 1 }, gp(i)));
  g += `<rect x="${x + 36 * s}" y="${y - 148 * s}" width="${110 * s}" height="${10 * s}" fill="#b08a5a"/><path d="M${x + 44 * s},${y - 138 * s} V${y} M${x + 138 * s},${y - 138 * s} V${y}" stroke="#4a3a2a" stroke-width="${6 * s}"/><rect x="${x + 56 * s}" y="${y - 152 * s}" width="${50 * s}" height="${4 * s}" fill="#f6f4ee"/>`;
  return g;
}
function sceneFlynn(t) {
  const g = ease(ramp(t, WS(11, 4), WS(11, 15) + .3)), ga = ease(ramp(t, S0(11) - .2, S0(11) + .4));
  let s = `<defs>${IQDEF}${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#cfd4d2"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  s += `<rect x="-20" y="960" width="760" height="360" fill="#9a8a72"/><rect x="-20" y="960" width="760" height="360" fill="#000" filter="url(#gnWood)" opacity=".3"/><rect x="-20" y="960" width="760" height="16" fill="url(#aoDn)" opacity=".5"/>`;
  // the projector screen
  s += `<rect x="60" y="410" width="600" height="420" fill="#000" opacity=".2" filter="url(#blur9)"/><rect x="60" y="400" width="600" height="420" fill="#fbfbf8"/><rect x="52" y="390" width="616" height="14" rx="6" fill="#5a5e66"/>`;
  const X = y => 130 + (y - 1900) / 100 * 470, Y = v => 760 - (v - 65) / 40 * 300;
  s += `<path d="M120,${Y(65)} H620 M120,${Y(65)} V430" stroke="#4a4e56" stroke-width="3"/>`;
  [[1900, '١٩٠٠'], [1950, '١٩٥٠'], [2000, '٢٠٠٠']].forEach(([y, l]) => s += `<path d="M${X(y)},${Y(65)} v10" stroke="#4a4e56" stroke-width="3"/>` + `<text x="${X(y)}" y="${Y(65) + 40}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#2a2e36">${l}</text>`);
  [[70, '٧٠'], [85, '٨٥'], [100, '١٠٠']].forEach(([v, l]) => s += `<path d="M120,${Y(v)} H620" stroke="#c8ccd2" stroke-width="1.6"/><text x="104" y="${Y(v) + 8}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#2a2e36">${l}</text>`);
  let d = ''; const n = 10 * g; for (let i = 0; i <= Math.floor(n); i++) { const yr = 1900 + i * 10, v = 70 + i * 3; d += (i ? ' L' : 'M') + X(yr).toFixed(1) + ',' + Y(v).toFixed(1); }
  if (n % 1 > 0 && n < 10) { const yr = 1900 + n * 10, v = 70 + n * 3; d += ' L' + X(yr).toFixed(1) + ',' + Y(v).toFixed(1); }
  s += `<g opacity="${ga.toFixed(2)}"><path d="${d}" stroke="#c8902a" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  for (let i = 0; i <= Math.floor(n); i++) s += `<circle cx="${X(1900 + i * 10).toFixed(1)}" cy="${Y(70 + i * 3).toFixed(1)}" r="7" fill="#c8902a" stroke="#fff" stroke-width="2"/>`;
  s += `</g>` + `<text x="360" y="455" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#2a2e36" opacity="${ga.toFixed(2)}">متوسّطُ درجاتِ الذكاء (بمقياسِ اليوم)</text>`;
  // two rows of people taking a test
  [[30, 1010, .58, 0], [230, 1010, .58, 1], [430, 1010, .58, 2], [630, 1010, .58, 3]].forEach(([x, y, sc, i]) => s += deskP(x, y, sc, i, t));
  s += `<rect x="-20" y="1010" width="760" height="10" fill="#000" opacity=".12" filter="url(#blur5)"/>`;
  [[60, 1250, .8, 4], [340, 1250, .8, 5], [620, 1250, .8, 6]].forEach(([x, y, sc, i]) => s += deskP(x, y, sc, i, t));
  noEarth(); F.ov = ''; return s;
}
// ---------- 12: a street of 1900 in sepia; the average person then would score about 70 on today's tests ----------
function sceneOld1900(t) {
  const t0 = S0(12) - .2, T = t - t0, ca = ease(ramp(t, WS(12, 7), WS(12, 10) + .2)), nw = ease(ramp(t, WS(12, 10) + .3, WS(12, 10) + .9));
  let o = `<rect x="-20" y="-20" width="760" height="1320" fill="#c8d4dc"/>`;
  o += facade(-20, 1000, 200, 560, { seed: 3, col: '#d8c8a8', balc: 1 }) + facade(180, 1000, 180, 480, { seed: 4, col: '#c8b08a', shops: 1 }) + facade(360, 1000, 190, 600, { seed: 5, col: '#e0d4b8', balc: 1 }) + facade(550, 1000, 190, 500, { seed: 6, col: '#b8a07a', shut: '#4a5a4a' });
  o += `<rect x="-20" y="1000" width="760" height="70" fill="#b8ac98"/><rect x="-20" y="1000" width="760" height="70" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1066" width="760" height="8" fill="#8a8070"/>` + cobbles(1074, 1320, '#6a645c', 7);
  o += p14(80 + T * 26, 1046, .62, 1, 1, t, { walk: T * 4.4, hat: 'bowler' }) + p14(470 - T * 22, 1052, .6, -1, 4, t, { walk: T * 4.4 + 1, hat: 'lady', skirt: '#4a3a3a', pal: { pants: '#4a3a3a' } }) + p14(640 - T * 18, 1040, .56, -1, 2, t, { walk: T * 4.2 + 2, hat: 'cap' });
  o += p14(250, 1230, 1.02, 1, 0, t, { hat: 'bowler', stache: '#2a1d16' });
  let s = `<defs>${IQDEF}${WWD()}</defs><g filter="url(#iqSep)">${o}</g><rect x="-20" y="-20" width="760" height="1320" fill="#3a2410" opacity=".12"/>`;
  s += `<radialGradient id="vig1900" cx=".5" cy=".55" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1a0e04" stop-opacity=".55"/></radialGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#vig1900)"/>`;
  // score card beside the man of 1900
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}">${panel(340, 730, 240, 150)}${IQL(460, 826, "≈ ٧٠", 1, "#f4c76b", 64)}${IQL(460, 862, "بمقاييسِ اليوم", 1, "#fff", 22)}<path d="M340,820 L300,870" stroke="#f4c76b" stroke-width="4"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 13: it is happening slowly, without us noticing: the street again, the glow very faint ----------
function sceneSlowly(t) {
  const t0 = S0(13) - .2, T = t - t0, k = .15 + .35 * ease(ramp(t, S0(13), S0(14)));
  noEarth(); F.ov = '';
  return `<defs>${IQDEF}</defs>` + streetQ(t, { N: .42, id: 'h13', top: crowdQ(t, T + 3, 1, { gk: k, pal: 3 }) });
}
// ---------- 14: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(14, 0) - .2, WS(14, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .55, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(14, 9) - .3, WS(14, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCurve }, { s: S0(2) - .2, f: sceneBillions }, { s: S0(3) - .2, f: sceneBrains }, { s: S0(4) - .2, f: sceneEnergy },
  { s: S0(5) - .2, f: sceneLabs }, { s: S0(6) - .2, f: sceneFuture }, { s: S0(7) - .2, f: sceneMachines }, { s: S0(8) - .2, f: sceneOld }, { s: S0(9) - .2, f: sceneArgue },
  { s: S0(10) - .2, f: sceneRenorm }, { s: S0(11) - .2, f: sceneFlynn }, { s: S0(12) - .2, f: sceneOld1900 }, { s: S0(13) - .2, f: sceneSlowly }, { s: S0(14) - .2, f: sceneEarth }];
const NOKB = new Set([sceneBillions]);
const XF = .5;
const TLI = [['٢٪ فقط', S0(1)], ['الدماغ', S0(3)], ['العلم', S0(5)], ['الآلات', S0(7)], ['الخلافات', S0(9)], ['المفاجأة', S0(10)]];
const LIST_ON = new Set([sceneOld]);
const CHIPS = [
  ['c0', 'كلُّ البشرِ… عباقرة؟', 360, 330, 'big', WS(0, 6), S0(1) - .3],
  ['c1', 'فوقَ ١٣٠: نحو ٢٪ فقط', 360, 330, 'big', WS(1, 10), S0(2) - .3],
  ['c2', '٨ مليارات عبقري', 360, 330, 'big', WS(2, 2), S0(3) - .3],
  ['c3', 'ليسَ دماغاً أكبر', 360, 330, 'big', WS(3, 1), WS(3, 6) - .1],
  ['c3b', 'أينشتاين: أخفُّ من المتوسّط', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c4', '٢٪ من الوزن… ٢٠٪ من الطاقة', 360, 330, 'big', WS(4, 2), S0(5) - .3],
  ['c5', '≈ ٩ ملايين باحث', 360, 330, 'big', WS(5, 3), WS(5, 7) - .1],
  ['c5b', 'مليارات يعملونَ معاً', 360, 330, 'big', WS(5, 8), S0(6) - .3],
  ['c6', 'علاجٌ في سنوات', 360, 330, 'big', WS(6, 3), WS(6, 8) - .1],
  ['c6b', 'طاقةٌ نظيفة', 360, 330, 'big', WS(6, 8), WS(6, 11) - .1],
  ['c6c', 'والفضاء', 360, 330, 'big', WS(6, 11), S0(7) - .3],
  ['c7', 'مَن يزرعُ القمح؟', 360, 330, 'big', WS(7, 0), WS(7, 6) - .1],
  ['c7b', 'آلاتٌ ذاتيّةُ القيادة', 360, 330, 'big', WS(7, 6), S0(8) - .3],
  ['c8', 'الأذكى يعيشونَ أطول', 360, 330, 'big', WS(8, 4), S0(9) - .3],
  ['c9', 'تنتهي الحروب؟', 360, 330, 'big', WS(9, 0), WS(9, 6) - .1],
  ['c9b', 'الذكاءُ ليس حكمة', 360, 330, 'red big', WS(9, 6), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', WS(10, 0), WS(10, 1) - .1],
  ['c10b', 'لو صارَ الجميعُ عباقرة', 360, 330, 'big', WS(10, 4), WS(10, 8) - .1],
  ['c10c', 'يُعادُ ضبطُ الاختبار', 360, 330, 'red big', WS(10, 8), S0(11) - .3],
  ['c11', 'هذا حدثَ فعلاً', 360, 330, 'big', WS(11, 0), WS(11, 7) - .1],
  ['c11b', '+٣ نقاط كلَّ ١٠ سنوات', 360, 330, 'big', WS(11, 7), S0(12) - .3],
  ['c12', 'الإنسانُ العاديّ عامَ ١٩٠٠', 360, 330, 'big', WS(12, 0), S0(13) - .3],
  ['c13', 'ببطء… دونَ أن نلاحظ', 360, 330, 'big', WS(13, 4), S0(14) - .3],
  ['c14', '@MadhaLawLab', 360, 1200, 'dark', WS(14, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لو صارَ الجميعُ عباقرة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
