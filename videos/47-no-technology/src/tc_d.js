// 10: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(10)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8) - .3, WS(10, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneScreens }, { s: S0(2) - .2, f: sceneJam }, { s: WS(2, 4) - .25, f: sceneSea }, { s: WS(2, 8) - .25, f: sceneAir },
  { s: S0(3) - .2, f: sceneTap }, { s: WS(3, 7) - .25, f: sceneRiver }, { s: S0(4) - .2, f: sceneShop }]
  .concat(typeof sceneFarm === 'undefined' ? [] : [{ s: S0(5) - .2, f: sceneFarm }, { s: S0(6) - .2, f: sceneHosp }, { s: S0(7) - .2, f: sceneHorse }, { s: WS(7, 5) - .25, f: scenePlough }, { s: S0(8) - .2, f: sceneBillion }, { s: S0(9) - .2, f: sceneStone }])
  .concat([{ s: S0(10) - .2, f: sceneEarth }]);
const NOKB = new Set([sceneHook].concat(typeof sceneFarm === 'undefined' ? [] : [sceneBillion, sceneFarm, sceneStone]));
const XF = .5;
const TLI = [['الأجهزة', S0(1)], ['النقل', S0(2)], ['الماء', S0(3)], ['الطعام', S0(4)]];
const LIST_ON = new Set([sceneJam, sceneRiver]);
const CHIPS = [
  ['c0', 'كلُّ آلةٍ تتوقّف', 360, 330, 'big', WS(0, 9) - .1, S0(1) - .3],
  ['c1', 'الشاشاتُ تنطفئ', 360, 330, 'big', WS(1, 0), WS(1, 4) - .1],
  ['c1b', 'ملياراتُ الأجهزة', 360, 330, 'red big', WS(1, 4), S0(2) - .3],
  ['c2', 'السيّاراتُ تتوقّف', 360, 330, 'big', WS(2, 0), WS(2, 4) - .3],
  ['c2b', 'السفنُ تنجرف', 360, 330, 'big', WS(2, 4) + .05, WS(2, 8) - .3],
  ['c2c', 'لا رحلات', 360, 330, 'red big', WS(2, 8) + .05, S0(3) - .3],
  ['c3', 'المضخّاتُ تتوقّف', 360, 330, 'big', WS(3, 0), WS(3, 2)],
  ['c3b', 'الصنابيرُ تجفّ', 360, 330, 'red big', WS(3, 2) + .1, WS(3, 7) - .3],
  ['c3c', 'العودةُ إلى الأنهار', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c4', 'لا شاحنات', 360, 330, 'red big', S0(4), WS(4, 2)],
  ['c4b', 'المتاجرُ تفرغ', 360, 330, 'red big', WS(4, 2) + .1, S0(5) - .3],
  ['c5', 'نحوُ نصفِ البشر', 360, 330, 'big', WS(5, 1), WS(5, 5)],
  ['c5b', 'يأكلون بفضلِ الأسمدة', 360, 330, 'big', WS(5, 5) + .05, S0(6) - .3],
  ['c6', 'لا أجهزة', 360, 330, 'red big', WS(6, 2), WS(6, 4)],
  ['c6b', 'ولا أدويةَ جديدة', 360, 330, 'red big', WS(6, 4) + .05, S0(7) - .3],
  ['c7', 'العودةُ إلى الخيول', 360, 330, 'big', WS(7, 3), WS(7, 5) - .3],
  ['c7b', 'الزراعةُ باليد', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c9', 'والمفاجأة؟', 360, 330, 'big', S0(9), WS(9, 7) - .1],
  ['c9b', 'أقدمُ أدواتٍ حجريّة', 360, 330, 'big', WS(9, 7), WS(9, 11)],
  ['c9c', 'كينيا: ٣٫٣ مليون سنة', 360, 330, 'big', WS(9, 11) + .05, S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا تكنولوجيا</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
