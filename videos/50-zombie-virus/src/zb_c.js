// 11: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(11)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 7) - .3, WS(11, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneAnt }, { s: S0(2) - .2, f: sceneRabies }, { s: S0(3) - .2, f: sceneDouble }, { s: S0(4) - .2, f: sceneBillion }, { s: S0(5) - .2, f: sceneFlights },
  { s: S0(6) - .2, f: sceneCities }, { s: S0(7) - .2, f: sceneDark }, { s: S0(8) - .2, f: sceneWater }, { s: S0(9) - .2, f: sceneHide }, { s: S0(10) - .2, f: sceneVaccine }, { s: S0(11) - .2, f: sceneEarth }];
const NOKB = new Set([sceneAnt, sceneRabies, sceneDouble, sceneBillion, sceneFlights, sceneVaccine]);
const XF = .5;
const TLI = [['اليوم ١', S0(3)], ['اليوم ٣٣', S0(4)], ['أيّام', S0(6)], ['شهور', WS(6, 6)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'فطرٌ يتحكّمُ بالنمل', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', 'داءُ الكَلَب', 360, 330, 'red big', WS(2, 4), S0(3) - .3],
  ['c3', 'يتضاعفُ كلَّ يوم', 360, 330, 'big', WS(3, 12), S0(4) - .3],
  ['c4', 'كلُّ البشر', 360, 330, 'red big', WS(4, 10), S0(5) - .3],
  ['c5', 'نحوَ ١٠٠ ألفِ رحلةٍ يوميّاً', 360, 330, 'big', WS(5, 2), WS(5, 8) - .1],
  ['c5b', 'بلا أعراض… بعد', 360, 330, 'red big', WS(5, 10), S0(6) - .3],
  ['c7', 'لا كهرباء… لا إنترنت', 360, 330, 'red big', WS(7, 3), S0(8) - .3],
  ['c8', 'والمفاجأة؟', 360, 330, 'big', S0(8), WS(8, 3) - .1],
  ['c8b', 'يخافُ الماء', 360, 330, 'red big', WS(8, 3), WS(8, 8) - .1],
  ['c8c', 'أيّامٌ قليلة فقط', 360, 330, 'big', WS(8, 10), S0(9) - .3],
  ['c9', 'الموجةُ تنطفئ', 360, 330, 'big', WS(9, 7), S0(10) - .3],
  ['c10', 'لقاحٌ منذُ ١٨٨٥', 360, 330, 'big', WS(10, 3), S0(11) - .3],
  ['c11', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">سرعةُ السقوط</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
