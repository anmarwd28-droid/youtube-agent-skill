// 10: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 20 - (t - S0(10)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 5) - .3, WS(10, 5) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const _ph = typeof sceneNuke === 'undefined';
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneScatter }, { s: WS(1, 14) - .3, f: sceneAlone }, { s: S0(2) - .2, f: scenePower }, { s: S0(3) - .2, f: sceneFood }]
  .concat(typeof sceneNuke === 'undefined' ? [] : [{ s: S0(4) - .2, f: sceneNuke }, { s: S0(5) - .2, f: sceneNature }, { s: S0(6) - .2, f: sceneLang }, { s: WS(6, 8) - .3, f: sceneKnow }, { s: S0(7) - .2, f: sceneVillage }])
  .concat(typeof sceneGenes === 'undefined' ? [] : [{ s: S0(8) - .2, f: sceneGenes }, { s: S0(9) - .2, f: sceneShip }])
  .concat([{ s: S0(10) - .2, f: sceneEarth }]);
const NOKB = new Set([sceneHook, sceneScatter, sceneFood].concat(typeof sceneNuke === 'undefined' ? [] : [sceneNuke, sceneLang]).concat(typeof sceneGenes === 'undefined' ? [] : [sceneGenes, sceneShip]));
const XF = .5;
const TLI = [['الكهرباءُ تنقطع', S0(2)], ['المفاعلاتُ تتوقّف', S0(4)], ['الطبيعةُ تعود', S0(5)], ['قريةٌ واحدة', S0(7)]];
const LIST_ON = new Set([scenePower].concat(typeof sceneNuke === 'undefined' ? [] : [sceneNature]));
const CHIPS = [
  ['c1', '١٫٥ مليون كم² لكلِّ شخص', 360, 330, 'big', WS(1, 9), WS(1, 14) - .4],
  ['c1b', 'أقربُ إنسان: نحو ٦٠٠ كم', 360, 330, 'red big', WS(1, 15), S0(2) - .3],
  ['c2', 'انقطاعُ الكهرباء', 360, 330, 'big', WS(2, 2), WS(2, 7)],
  ['c2b', 'لا إنترنت', 360, 330, 'red big', WS(2, 7) + .1, S0(3) - .3],
  ['c3', 'يفسُدُ في أيام', 360, 330, 'red big', WS(3, 2), WS(3, 4)],
  ['c3b', 'المعلّبات: صالحةٌ لسنوات', 360, 330, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'نحوُ ٤٠٠ مفاعل', 360, 330, 'big', WS(4, 1), WS(4, 4)],
  ['c4b', 'إطفاءٌ تلقائيّ', 360, 330, 'big', WS(4, 4) + .1, WS(4, 7)],
  ['c4c', 'خطرُ تسرّبِ الإشعاع', 360, 330, 'red big', WS(4, 13), S0(5) - .3],
  ['c5', 'بعدَ سنوات', 360, 330, 'big', S0(5) + .2, WS(5, 5)],
  ['c5b', 'الحيواناتُ تعود', 360, 330, 'big', WS(5, 5) + .1, S0(6) - .3],
  ['c6', 'أكثرُ من ٧٠٠٠ لغة', 360, 330, 'big', S0(6) + .1, WS(6, 4)],
  ['c6b', 'يبقى أقلُّ من ٩٩', 360, 330, 'red big', WS(6, 4) + .1, WS(6, 8) - .4],
  ['c6c', 'لا مصانعَ ولا أدوية', 360, 330, 'red big', WS(6, 11), S0(7) - .3],
  ['c7', 'قريةٌ واحدة: ٩٩ شخصاً', 360, 330, 'big', WS(7, 3), S0(8) - .3],
  ['c8', 'كلُّ البشر: ٩٩', 360, 330, 'big', S0(8) + .2, WS(8, 7) - .2],
  ['c8b', 'الخطر: أمراضٌ وراثيّة', 360, 330, 'red big', WS(8, 9), S0(9) - .3],
  ['c9', '٩٨ شخصاً يكفون', 360, 330, 'big', WS(9, 4), WS(9, 10)],
  ['c9b', 'رحلةٌ تدومُ ٦٣٠٠ سنة', 360, 330, 'big', WS(9, 10) + .1, WS(9, 14)],
  ['c9c', '٤٩ زوجاً بلا قرابة', 360, 330, 'big', WS(9, 15), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 5), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">٩٩ شخصاً</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
