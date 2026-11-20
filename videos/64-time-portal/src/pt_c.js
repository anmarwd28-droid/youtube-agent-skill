// pt_c.js (#64): scenes 9-13 (the timeline wall, Hawking's party, the end) + scene list and UI
// ---------- 9-10: a timeline: the portal can only send you back to the day it was built; travellers from the future stop there ----------
function sceneLine(t) {
  const t0 = S0(9) - .2, T = t - t0, la = ease(ramp(t, WS(9, 7), WS(9, 10))), ar = ease(ramp(t, S0(10), S0(11) - .3));
  const y = 800, X0 = 50, X1 = 670, PD = 470, NOW = 300;
  let s = `<defs>${PTDEF}${CBDEF}<pattern id="hatchP" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0,0 V16" stroke="#8a94a8" stroke-width="3" opacity=".35"/></pattern></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(150, 71, .7);
  s += `<rect x="${X0}" y="${y - 10}" width="${X1 - X0}" height="20" rx="10" fill="#2a3450"/><rect x="${PD}" y="${y - 10}" width="${X1 - PD}" height="20" rx="10" fill="#f4c76b"/>`;
  s += `<path d="M${X1 - 6},${y - 24} L${X1 + 22},${y} L${X1 - 6},${y + 24}Z" fill="#f4c76b"/>`;
  // the locked past
  s += `<g opacity="${la.toFixed(2)}"><rect x="${X0}" y="${y - 200}" width="${PD - X0}" height="400" rx="16" fill="url(#hatchP)"/><rect x="${X0}" y="${y - 200}" width="${PD - X0}" height="400" rx="16" fill="#0a0e1c" opacity=".45"/>` +
    `<g transform="translate(${X0 + 70},${y - 120})"><rect x="-26" y="-6" width="52" height="42" rx="6" fill="#c8ccd4"/><path d="M-16,-6 V-20 Q0,-40 16,-20 V-6" stroke="#c8ccd4" stroke-width="7" fill="none"/><circle cx="0" cy="12" r="5" fill="#3a3e48"/><rect x="-2" y="12" width="4" height="12" fill="#3a3e48"/></g>` +
    PTL(X0 + 70, y - 40, 'مغلق', 1, '#c8ccd4', 28) + `</g>`;
  // markers
  s += PTL(X0 + 40, y + 60, 'الماضي', 1, '#9aa4b8', 24) + PTL(X1 - 40, y + 60, 'المستقبل', 1, '#f4c76b', 24);
  s += `<path d="M${NOW},${y - 26} V${y + 26}" stroke="#fff" stroke-width="4"/>` + PTL(NOW, y + 60, 'اليوم', 1, '#fff', 26);
  s += `<path d="M${PD},${y - 60} V${y + 26}" stroke="#7ac8ff" stroke-width="5"/>` + portal(PD, y - 110, 26, 44, t, 1, '', { id: 'pl', seed: 7 }) + PTL(PD, y + 60, 'يومُ صنعِ البوابة', 1, '#7ac8ff', 24);
  // arrows of travellers from the future: they arc back and stop at the portal day
  if (ar > 0) for (let i = 0; i < 6; i++) { const st = 590 + i * 14, u = clamp((ar * 1.6 - i * .12) * 1.4), h = 120 + i * 26; if (u <= 0) continue;
    let d = ''; for (let j = 0; j <= 20; j++) { const v = j / 20 * u, x = lerp(st, PD + 6, v), yy = y - 20 - Math.sin(v * Math.PI) * h; d += (j ? ' L' : 'M') + x.toFixed(1) + ',' + yy.toFixed(1); }
    s += `<path d="${d}" stroke="#f4c76b" stroke-width="4" fill="none" stroke-dasharray="10 7" opacity=".85"/>`;
    if (u >= 1) s += scr(`<circle cx="${PD + 6}" cy="${y - 20}" r="${(18 + 8 * Math.sin(t * 8 + i)).toFixed(1)}" fill="url(#ptGold)"/>`); }
  // a person standing at "today", waiting; nobody comes
  s += `<g transform="translate(0,0)">${hero(NOW, y - 30, Object.assign({ s: .42, face: 1, shade: 1, noShadow: 1, lookUp: .1 }, gp(3)))}</g>`;
  s += PTL(NOW, y - 210, 'لا زوّار', ease(ramp(t, WS(10, 2), WS(10, 4))), '#ff8a7a', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 11-12: Hawking's party for time travellers (June 2009): a party room, the invitation sent afterwards; nobody comes ----------
function flute(x, y, s, fill) { return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="14" ry="4" fill="#e8eef2" opacity=".6"/><path d="M0,0 V-40" stroke="#e8eef2" stroke-width="3" opacity=".7"/><path d="M-10,-40 Q-12,-80 -9,-96 H9 Q12,-80 10,-40Z" fill="#e8f2f6" opacity=".35" stroke="#fff" stroke-opacity=".5"/><path d="M-9,-46 Q-11,-${46 + 40 * fill} -8,-${46 + 44 * fill} H8 Q11,-${46 + 40 * fill} 9,-46Z" fill="#f4d880" opacity=".85"/><path d="M-6,-50 V-90" stroke="#fff" stroke-width="2" opacity=".5"/></g>`; }
function balloon(x, y, r, col, t, i) { const w = Math.sin(t * 1.2 + i) * 4; return `<path d="M${x},${y + r * 1.2} q${6 + w},40 ${-4 + w},${120}" stroke="#e8e0d0" stroke-width="1.4" fill="none" opacity=".6"/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.2}" fill="${col}"/><ellipse cx="${x - r * .35}" cy="${y - r * .45}" rx="${r * .22}" ry="${r * .32}" fill="#fff" opacity=".45"/><path d="M${x - 4},${y + r * 1.2} h8 l-4,6Z" fill="${col}"/>`; }
function sceneParty(t) {
  const t0 = S0(11) - .2, T = t - t0, inv = ease(ramp(t, WS(11, 9) - .2, WS(11, 10) + .3)), dim = ease(ramp(t, S0(12) - .1, S0(12) + 1.2));
  let s = `<defs>${PTDEF}${TMDEFS2()}${GNDEF}<pattern id="wallP" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M20,4 q8,16 0,32 q-8,-16 0,-32Z" fill="#c8a870" opacity=".25"/></pattern></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#6a2e36"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#wallP)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#4a2e1e"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#gnWood)" opacity=".45"/><rect x="-20" y="990" width="760" height="14" fill="#3a2214"/>`;
  // the banner
  s += `<path d="M60,420 Q360,470 660,420 L660,490 Q360,540 60,490Z" fill="#e8d8a8"/><path d="M60,420 Q360,470 660,420" stroke="#a88a4a" stroke-width="4" fill="none"/>` + `<text x="360" y="488" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="32" fill="#6a2a2a">مرحباً بالمسافرينَ عبرَ الزمن</text>`;
  // a wall clock
  s += dialF(600, 620, 56, 12, (T * 40) % 60, {});
  // balloons
  [[90, 620, 36, '#c8302a'], [150, 600, 32, '#e8c040'], [120, 680, 30, '#3a7ac8'], [640, 760, 34, '#e8c040'], [690, 720, 30, '#c8302a']].forEach(([x, y, r, c], i) => s += balloon(x, y + (i === 2 ? dim * 160 : 0), r, c, t, i));
  // the table with glasses and the invitation
  s += `<rect x="150" y="880" width="420" height="20" fill="#f4f2ec"/><path d="M150,900 L130,1040 H590 L570,900Z" fill="#eceae2"/><path d="M150,900 L130,1040" stroke="#c8c6be" stroke-width="3"/><rect x="130" y="1030" width="460" height="12" fill="#000" opacity=".2" filter="url(#blur5)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${170 + i * 46},902 Q${164 + i * 46},970 ${160 + i * 48},1040" stroke="#c8c4b8" stroke-width="3" fill="none" opacity=".6"/>`).join('');
  for (let i = 0; i < 6; i++) s += flute(200 + i * 60, 884, 1.25, .7);
  s += `<path d="M560,884 L556,800 Q556,770 566,760 V730 H578 V760 Q588,770 588,800 L584,884Z" fill="#1e3a24"/><rect x="565" y="724" width="14" height="10" fill="#d8b860"/><rect x="560" y="800" width="28" height="30" fill="#e8d8a8"/>`;
  // empty chairs
  [[80, 1160], [640, 1160]].forEach(([x, y], i) => s += `<rect x="${x - 34}" y="${y - 70}" width="68" height="10" fill="#7a4a2a"/><path d="M${x - 30},${y - 60} V${y} M${x + 30},${y - 60} V${y} M${(i ? x + 34 : x - 34)},${y - 70} V${y - 190}" stroke="#5a3418" stroke-width="7"/><rect x="${(i ? x + 24 : x - 44)}" y="${y - 190}" width="20" height="10" fill="#7a4a2a"/>`);
  // the invitation card
  if (inv > 0) s += `<g opacity="${inv.toFixed(2)}" transform="translate(360,${lerp(700, 660, inv).toFixed(1)}) rotate(-3)"><rect x="-170" y="-110" width="340" height="220" rx="8" fill="#f8f2e0"/><rect x="-160" y="-100" width="320" height="200" rx="6" fill="none" stroke="#c8a040" stroke-width="3"/>` +
    `<text x="0" y="-52" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#6a2a2a">دعوة</text><text x="0" y="-10" text-anchor="middle" font-family="Noto Naskh Arabic" font-size="20" fill="#3a2a1a">حفلةُ المسافرينَ عبرَ الزمن</text>` +
    `<text x="0" y="30" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#3a2a1a">٢٨ يونيو ٢٠٠٩</text><text x="0" y="66" text-anchor="middle" font-family="Noto Naskh Arabic" font-size="17" fill="#8a2a2a">أُرسلت بعدَ الحفلة</text></g>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0814" opacity="${(.5 * dim).toFixed(2)}"/>`;
  if (dim > 0) s += scr(`<ellipse cx="360" cy="880" rx="300" ry="200" fill="#ffd8a0" opacity="${(.12 * dim).toFixed(2)}" filter="url(#blur16)"/>`);
  noEarth(); F.ov = ''; return s;
}
// ---------- 13: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(13, 0) - .2, WS(13, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(13, 11) - .3, WS(13, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneDilation }, { s: S0(3) - .2, f: sceneWorm }, { s: S0(5) - .2, f: sceneQueue }, { s: S0(6) - .2, f: sceneParadox },
  { s: S0(7) - .2, f: sceneMarket }, { s: S0(8) - .2, f: sceneBoom }, { s: S0(9) - .2, f: sceneLine }, { s: S0(11) - .2, f: sceneParty }, { s: S0(13) - .2, f: sceneEarth }];
const NOKB = new Set([sceneDilation, sceneWorm]);
const XF = .5;
const TLI = [['المستقبل', S0(1)], ['الثقبُ الدوديّ', S0(3)], ['السيّاح', S0(5)], ['المفارقة', S0(6)], ['هوكينغ', S0(8)], ['الأغرب', S0(9)]];
const LIST_ON = new Set([sceneParadox]);
const CHIPS = [
  ['c0', 'بوابةٌ إلى أيِّ زمن؟', 360, 330, 'big', WS(0, 4), S0(1) - .3],
  ['c1', 'السفرُ إلى المستقبلِ حقيقيّ', 360, 330, 'big', WS(1, 2), WS(1, 7) - .1],
  ['c1b', 'أسرع ← زمنٌ أبطأ', 360, 330, 'big', WS(1, 7), S0(2) - .3],
  ['c2', '+٨٠٠ يوم في المدار', 360, 330, 'big', WS(2, 2), WS(2, 9) - .1],
  ['c2b', 'سافرَ ٠٫٠٢ ثانية إلى المستقبل', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c3', 'ثقبٌ دوديّ', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'يحتاجُ طاقةً سالبة', 360, 330, 'red big', WS(4, 6), S0(5) - .3],
  ['c5', 'الأهرامات وهي تُبنى', 360, 330, 'big', WS(5, 6), WS(5, 9) - .1],
  ['c5b', 'الديناصورات حيّة', 360, 330, 'big', WS(5, 9), S0(6) - .3],
  ['c6', 'مفارقةُ الجَدّ', 360, 330, 'red big', WS(6, 9), S0(7) - .3],
  ['c7', 'مَن يعرفُ المستقبلَ يربح', 360, 330, 'big', WS(7, 0), WS(7, 6) - .1],
  ['c7b', 'تنهارُ البورصات', 360, 330, 'red big', WS(7, 6), S0(8) - .3],
  ['c8', 'ستيفن هوكينغ: الطبيعةُ تمنعُ ذلك', 360, 330, 'big', WS(8, 1), S0(9) - .3],
  ['c9', 'والأغرب؟', 360, 330, 'big', WS(9, 0), WS(9, 1) - .1],
  ['c9b', 'لا عودةَ قبلَ يومِ صنعِها', 360, 330, 'big', WS(9, 4), S0(11) - .3],
  ['c11', 'حفلةُ هوكينغ ٢٠٠٩', 360, 330, 'big', WS(11, 3), S0(12) - .3],
  ['c12', 'ولم يأتِ أحد', 360, 330, 'red big', WS(12, 0), S0(13) - .3],
  ['c13', '@MadhaLawLab', 360, 1200, 'dark', WS(13, 11) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">بوابةٌ زمنيّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
