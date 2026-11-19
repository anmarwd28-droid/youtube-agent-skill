// ---------- #61 scenes 7-12: the corners in space, lighter weight, one sunrise for a whole face, the collapse, the end ----------
const AR4 = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// 7: the corners are ~3,760 km farther from the centre than the face middles
function sceneCorner(t) {
  const t0 = S0(7) - .2, T = t - t0, la = ease(ramp(t, WS(7, 2) - .2, WS(7, 4)));
  const G = cube3(t, { d: lerp(11.4, 10.6, ease(clamp(T / 5))), el: .5, lon: 45 + T * 1.5, clouds: .35, lights: .2, pool: 1, tg: [0, .18, 0] });
  const top = cbP(G, [35.2644, -135], CBHV), fc = cbP(G, [0, 180], CBH);
  let o = '';
  if (la > 0) { const k = ease(ramp(t, WS(7, 2) - .2, WS(7, 4) + .3)), ex = lerp(fc[0], top[0], k), ey = lerp(fc[1], top[1], k);
    o += `<g opacity="${la.toFixed(2)}"><circle cx="${fc[0].toFixed(1)}" cy="${fc[1].toFixed(1)}" r="8" fill="#7fd4ff"/><path d="M${fc[0].toFixed(1)},${fc[1].toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="10 8"/><circle cx="${top[0].toFixed(1)}" cy="${top[1].toFixed(1)}" r="9" fill="#f4c76b" opacity="${k.toFixed(2)}"/>` +
      `<g opacity="${k.toFixed(2)}">${panel(top[0] - 150, top[1] - 118, 300, 70)}${lbl(top[0], top[1] - 71, '+ ٣٬٧٦٠ كم', 1, '#f4c76b', 32)}</g></g>`; }
  F.ov = o; return space(t);
}
// 8: a frozen corner peak in black space; the twist: you weigh more than a third less there
function scaleW(x, y, kg, title, col) {
  let g = `<ellipse cx="${x}" cy="${y + 64}" rx="104" ry="12" fill="#000" opacity=".45" filter="url(#blur2)"/>` +
    `<rect x="${x - 100}" y="${y - 50}" width="200" height="112" rx="26" fill="#6a707a"/><rect x="${x - 100}" y="${y - 58}" width="200" height="112" rx="26" fill="url(#helG)"/>` +
    `<rect x="${x - 100}" y="${y - 58}" width="200" height="112" rx="26" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<rect x="${x - 58}" y="${y - 44}" width="116" height="46" rx="8" fill="#1a2a22"/><rect x="${x - 58}" y="${y - 44}" width="116" height="16" rx="8" fill="#fff" opacity=".07"/>` +
    `<text x="${x}" y="${y - 9}" text-anchor="middle" font-family="DejaVu Sans Mono,monospace" font-weight="700" font-size="34" fill="#9cf0b0">${kg}</text><text x="${x}" y="${y + 30}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#5a6270">كغ</text>` +
    `<ellipse cx="${x - 62}" cy="${y + 26}" rx="20" ry="11" fill="#000" opacity=".1"/><ellipse cx="${x + 62}" cy="${y + 26}" rx="20" ry="11" fill="#000" opacity=".1"/>`;
  return g + lbl(x, y + 112, title, 1, col, 26);
}
function sceneSummit(t) {
  const t0 = WS(7, 9) - .4, T = t - t0, wa = ease(ramp(t, WS(8, 1) - .3, WS(8, 1) + .3)), wk = ease(ramp(t, WS(8, 3), WS(8, 6)));
  let s = `<defs>${CBD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#020308"/>${starsK(320, 23)}`;
  s += `<ellipse cx="200" cy="1250" rx="420" ry="90" fill="#4a7ac8" opacity=".3" filter="url(#soft)"/>`;
  const P = a => a.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L');
  // three faces meet at the corner: a sharp three-sided peak, lit hard from the left
  const far = jag(-20, 990, 740, 920, 18, 50, 7);
  s += litRock(`M${P(far)} L740,1320 L-20,1320Z`, 'sf', '#5a5c66', '#1a1c22', 19, { fx: .02, fy: .03, sc: 5, az: 20, el: 25 });
  const pk = [380, 610];
  const eL = jag(pk[0], pk[1], 30, 1320, 14, 34, 61), eR = jag(pk[0], pk[1], 720, 1320, 14, 34, 62);
  s += litRock(`M${P(eL.slice().reverse())} L420,1320Z`, 'su', '#b0b2ba', '#3a3c44', 17, { fx: .014, fy: .022, sc: 7, az: 200, el: 34 });
  s += litRock(`M420,1320 L${P(eR)}Z`, 'sv', '#6a6c76', '#16181e', 18, { fx: .014, fy: .022, sc: 7, az: 200, el: 30 });
  s += `<path d="M420,1320 L${pk[0]},${pk[1]}" stroke="#e8eef6" stroke-width="3" opacity=".55"/><path d="M${P(eL.slice().reverse())} L${P(eR)}" stroke="#e8eef6" stroke-width="2.5" fill="none" opacity=".35"/>`;
  s += sun3(140, 500, .9);
  // the astronaut on the peak
  const A = astro(pk[0], pk[1] + 2, { s: .42, face: 1 });
  s += A.s;
  if (wa > 0) { const kg = Math.round(lerp(80, 50, wk));
    s += `<g opacity="${wa.toFixed(2)}">${panel(50, 930, 620, 300)}${scaleW(515, 1060, AR4(80), 'عندَ البحر', '#9fd0ff')}${scaleW(205, 1060, AR4(kg), 'عندَ الزاوية', '#f4c76b')}${lbl(360, 980, 'نفسُ الشخص', 1, '#cfd8e8', 24)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// 9: on a flat face every place has the same horizon: the Sun rises at the same moment over the whole face
function sceneSunrise(t) {
  const t0 = S0(9) - .2, T = t - t0, sr = ease(ramp(t, WS(9, 3), WS(9, 7))), pa = ease(ramp(t, WS(9, 5) - .3, WS(9, 5) + .2));
  cube3(t, { d: 10.2, el: .22, lon: -8 + T * .6, clouds: .35, lights: .5, pool: 1, tg: [0, .2, 0] });
  const a = lerp(-2.2, -.35, sr), L = [Math.sin(a) * .95, .28, Math.cos(a) * .95]; F.w.L = L;
  let o = '';
  if (pa > 0) { o += `<g opacity="${pa.toFixed(2)}">${panel(70, 1050, 580, 160)}`;
    [190, 360, 530].forEach((x, i) => { o += `<path d="M${x - 70},1150 H${x + 70}" stroke="#8a9ab8" stroke-width="2"/><g opacity="${sr.toFixed(2)}"><circle cx="${x}" cy="${(1150 - 26 * sr).toFixed(1)}" r="16" fill="#fff4cf"/><circle cx="${x}" cy="${(1150 - 26 * sr).toFixed(1)}" r="34" fill="#ffd890" opacity=".25" filter="url(#blur5)"/></g>` +
      `<rect x="${x - 72}" y="1150" width="144" height="10" fill="#0a0e1c"/><text x="${x}" y="1192" text-anchor="middle" direction="ltr" font-family="DejaVu Sans Mono,monospace" font-size="26" fill="#f4c76b">06:00</text>`; });
    o += `</g>`; }
  F.ov = o; return space(t);
}
// 10-11: gravity crushes the edges and corners, endless earthquakes, until it is a ball again; that is why the Earth is round
const LON10 = t => 30 + (t - (S0(10) - .2)) * 6;
function sceneCollapse(t) {
  const k = ease(ramp(t, WS(10, 8) - .2, WS(11, 4) + .3)), qa = ease(ramp(t, WS(10, 8) - .3, WS(10, 9))) * (1 - ease(ramp(t, WS(11, 3), WS(11, 5) + .3)));
  const sh = qa * .05, jx = Math.sin(t * 37) * sh + Math.sin(t * 53) * sh * .6, jy = Math.cos(t * 41) * sh;
  const G = cube3(t, { d: lerp(12.2, 9.6, k), el: .4, lon: LON10(t), clouds: .35 * k, lights: .3, tet: 1 - k, pool: 1 - k, quake: qa, tg: [jx, lerp(.12, .22, k) + jy, 0] });
  let o = ''; const aa = ease(ramp(t, WS(10, 8) - .2, WS(10, 8) + .3)) * (1 - ease(ramp(t, WS(10, 13), WS(11, 1))));
  if (aa > 0) { const [cx, cy] = G.c0; CBV.forEach((v, i) => { const vv = cornerV(G, v); if (vv <= 0) return; const [x, y] = cbP(G, v, lerp(CBHV, 1, k)), dx = cx - x, dy = cy - y, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
    for (let j = 0; j < 2; j++) { const p = pmod(t * .9 + j * .5 + i * .17, 1), d0 = -90 + p * 60; o += `<g opacity="${(aa * clamp(vv * 4) * Math.sin(p * Math.PI)).toFixed(2)}">${arrowT(x + ux * d0, y + uy * d0, x + ux * (d0 + 50), y + uy * (d0 + 50), '#fff', 4)}</g>`; } }); }
  F.ov = o; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  cube3(t, { d: lerp(9.6, 9.8, ease(ramp(t, S0(12) - .2, S0(12) + 1))), el: .4, tg: [0, lerp(.22, .64, ease(ramp(t, S0(12) - .2, S0(12) + 1.2))), 0], lon: LON10(t), clouds: .4, lights: .3, tet: 0 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 9) - .3, WS(12, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneShape }, { s: S0(2) - .2, f: sceneGrav }, { s: S0(3) - .2, f: scenePool }, { s: S0(4) - .2, f: sceneRing }, { s: S0(5) - .2, f: sceneSlope },
  { s: S0(6) - .2, f: sceneEdge }, { s: S0(7) - .2, f: sceneCorner }, { s: WS(7, 9) - .4, f: sceneSummit }, { s: S0(9) - .2, f: sceneSunrise }, { s: S0(10) - .2, f: sceneCollapse }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneGrav, sceneEdge]);
const XF = .5;
const TLI = [['الشكل', S0(1)], ['البحار', S0(3)], ['الحافّة', S0(6)], ['الزوايا', S0(7)], ['الانهيار', S0(10)]];
const LIST_ON = new Set([sceneSummit]);
const CHIPS = [
  ['c0', 'الأرضُ… مربّعة', 360, 1200, 'big', WS(0, 5), S0(1) - .3],
  ['c1', 'بنفسِ حجمِ الأرض', 360, 330, 'big', WS(1, 0), WS(1, 4) - .1],
  ['c1b', '٦ وجوهٍ مربّعة', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'الجاذبيّةُ نحوَ المركز', 360, 330, 'big', WS(2, 0), WS(2, 6) - .1],
  ['c2b', 'وسطُ الوجهِ هو الأقرب', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', '٦ بحارٍ مستديرة', 360, 330, 'big', WS(3, 6), WS(3, 9) - .1],
  ['c3b', 'أعمقُ من ٨٠ كم', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', 'الهواءُ يتجمّعُ أيضاً', 360, 330, 'big', WS(4, 0), WS(4, 5) - .1],
  ['c4b', 'الحياةُ في حلقةٍ ضيّقة', 360, 330, 'red big', WS(4, 5), S0(5) - .3],
  ['c5', 'أرضٌ مستوية… كجبل', 360, 330, 'red big', WS(5, 3), S0(6) - .3],
  ['c6', 'على الحافّة', 360, 330, 'big', WS(6, 0), WS(6, 6) - .1],
  ['c6b', 'منحدرانِ ٤٥°', 360, 330, 'red big', WS(6, 6), S0(7) - .3],
  ['c7', 'الزوايا أبعدُ عن المركز', 360, 330, 'big', WS(7, 0), WS(7, 9) - .5],
  ['c7b', 'في الفضاء', 360, 330, 'red big', WS(7, 9), WS(7, 12) - .1],
  ['c7c', 'بلا هواءٍ ولا ماء', 360, 330, 'red big', WS(7, 12), S0(8) - .3],
  ['c8', 'والغريب؟', 360, 330, 'big', WS(8, 0), WS(8, 4) - .1],
  ['c8b', 'أخفُّ بأكثرَ من الثلث', 360, 330, 'big', WS(8, 4), S0(9) - .3],
  ['c9', 'شروقٌ واحدٌ للوجهِ كلِّه', 360, 330, 'big', WS(9, 0), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', WS(10, 0), WS(10, 2) - .1],
  ['c10b', 'لا تبقى مكعّباً', 360, 330, 'big', WS(10, 2), WS(10, 6) - .1],
  ['c10c', 'الجاذبيّةُ تسحقُ الزوايا', 360, 330, 'red big', WS(10, 6), WS(10, 11) - .1],
  ['c10d', 'زلازلُ لا تتوقّف', 360, 330, 'red big', WS(10, 11), S0(11) - .3],
  ['c11', 'كرةٌ من جديد', 360, 330, 'big', WS(11, 0), WS(11, 5) - .1],
  ['c11b', 'لهذا… الأرضُ كرويّة', 360, 330, 'big', WS(11, 5), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">الأرضُ المربّعة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
