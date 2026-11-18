// ---------- #56 scenes 7-12: one sunrise for a quarter of the world, four civilisations, why the shape cannot last, the collapse, the end ----------
// 7: on a flat face every place has the same horizon: the Sun rises at the same moment over the whole face
function sceneSunrise(t) {
  const t0 = S0(7) - .2, T = t - t0, sr = ease(ramp(t, WS(7, 2) - .4, WS(7, 5) + .2)), pa = ease(ramp(t, WS(7, 6) - .3, WS(7, 6) + .2));
  tri3(t, { d: 12.5, el: .3, lon: 90, clouds: .35, lights: .5, pool: 1, tg: [0, .15, 0] });
  // the light swings from behind the face to in front of it
  const a = lerp(-2.3, -.5, sr), L = [Math.sin(a) * .9, .45, Math.cos(a) * .9]; F.w.L = L;
  let o = '';
  if (pa > 0) { o += `<g opacity="${pa.toFixed(2)}">${panel(70, 1060, 580, 150)}`;
    [190, 360, 530].forEach((x, i) => { o += `<path d="M${x - 70},1150 H${x + 70}" stroke="#8a9ab8" stroke-width="2"/><g opacity="${sr.toFixed(2)}"><circle cx="${x}" cy="${(1150 - 26 * sr).toFixed(1)}" r="16" fill="#fff4cf"/><circle cx="${x}" cy="${(1150 - 26 * sr).toFixed(1)}" r="34" fill="#ffd890" opacity=".25" filter="url(#blur5)"/></g>` +
      `<text x="${x}" y="1192" text-anchor="middle" direction="ltr" font-family="DejaVu Sans Mono,monospace" font-size="26" fill="#f4c76b">06:00</text>` + `<rect x="${x - 72}" y="1150" width="144" height="10" fill="#0a0e1c"/>`; });
    o += `</g>`; }
  F.ov = o; return space(t);
}
// 8: four separate civilisations on the shores of four seas, walled off by "mountains" that reach space
function netInset(x, y, s, a) {   // the tetrahedron unfolded: four triangles, a round sea in each
  if (a <= 0) return ''; const h = s * Math.sqrt(3) / 2, A = [x, y - h], B = [x - s / 2, y], C = [x + s / 2, y], mAB = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], mAC = [(A[0] + C[0]) / 2, (A[1] + C[1]) / 2], mBC = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2];
  const T4 = [[A, mAB, mAC], [mAB, B, mBC], [mAC, mBC, C], [mAB, mBC, mAC]];
  let g = panel(x - s / 2 - 30, y - h - 30, s + 60, h + 60);
  T4.forEach((p, i) => { const cx = (p[0][0] + p[1][0] + p[2][0]) / 3, cy = (p[0][1] + p[1][1] + p[2][1]) / 3;
    g += `<path d="M${p.map(q => q[0].toFixed(1) + ',' + q[1].toFixed(1)).join(' L')}Z" fill="#6a5e52" stroke="#d8c8a8" stroke-width="2"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(s * .085).toFixed(1)}" fill="#3a8a3a"/><circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(s * .07).toFixed(1)}" fill="#2a6ab0"/>` +
      `<text x="${cx.toFixed(1)}" y="${(cy + 8).toFixed(1)}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">${AR4(i + 1)}</text>`; });
  return `<g opacity="${a.toFixed(2)}">${g}</g>`;
}
function sceneCiv(t) {
  const t0 = S0(8) - .2, T = t - t0, na = ease(ramp(t, WS(8, 1) - .2, WS(8, 2) + .2));
  let s = `<defs>${TRD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyT)"/>${starsK(90, 41, .5)}`;
  // behind the town the ground rises for thousands of km: a vast rock wall fading into dark sky
  s += litRock(`M-20,980 L-20,700 Q200,640 360,520 Q520,400 740,300 L740,980Z`, 'cw', '#8a7a66', '#4a4036', 21, { fx: .012, fy: .02, sc: 5 });
  s += `<path d="M-20,700 Q200,640 360,520 Q520,400 740,300 L740,520 Q520,600 360,700 Q200,800 -20,860Z" fill="#dfe8f4" opacity=".18" filter="url(#soft)"/>`;
  s += `<rect x="-20" y="880" width="760" height="110" fill="#5a7a3a"/><rect x="-20" y="880" width="760" height="110" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  // a shore town
  [[60, .7, '#e8dcc4', '#9a4a3a'], [170, .62, '#d8c8a8', '#7a3a2a'], [280, .74, '#efe4cc', '#8a4a34'], [400, .66, '#e0d4bc', '#6a3a2a'], [520, .72, '#e8dcc4', '#9a5a3a'], [630, .64, '#d4c8b0', '#7a3a2a']].forEach(([x, sc, w, r], i) => s += cottage(x, 960, sc, w, r, i + 5));
  s += `<rect x="-20" y="990" width="760" height="40" fill="#d8c8a0"/><rect x="-20" y="1020" width="760" height="300" fill="url(#seaT)"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M${pmod(i * 67 + T * 15, 760) - 20},${1040 + (i % 6) * 36} h${30 + i * 3}" stroke="#cfe6f4" stroke-width="2" opacity=".35"/>`).join('');
  s += man(150, 1012, .5, 1, 2, { walk: T * 2.2 + 1, amp: .5 }) + man(470, 1014, .5, -1, 6, {}) + man(510, 1014, .48, -1, 4, { lookUp: .5 });
  s += netInset(360, 760, 330, na);
  noEarth(); F.ov = ''; return s;
}
// 9: the twist: this shape cannot last: gravity makes anything bigger than a few hundred km round
function potato(x, y, R, seed) { const r = RS(seed); let d = ''; for (let i = 0; i <= 24; i++) { const a = i / 24 * 6.2832, k = 1 + .22 * Math.sin(a * 2 + 1) + .12 * Math.sin(a * 3 + 2) + (r() - .5) * .08; d += (i ? ' L' : 'M') + (x + Math.cos(a) * R * k * 1.25).toFixed(1) + ',' + (y + Math.sin(a) * R * k * .8).toFixed(1); }
  let s = `<path d="${d}Z" fill="url(#rockB)"/>` + litRock(d + 'Z', 'po' + seed, '#a89888', '#3a3028', seed, { fx: .03, fy: .03, sc: 4, k1: 1.2 });
  s += `<path d="${d}Z" fill="url(#rockB)" opacity=".55"/>`; for (let i = 0; i < 6; i++) { const cx = x + (r() - .5) * R * 1.4, cy = y + (r() - .5) * R * .8, cr = R * (.06 + r() * .1); s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${cr.toFixed(1)}" fill="#000" opacity=".25"/><path d="M${(cx - cr).toFixed(1)},${cy.toFixed(1)} a${cr.toFixed(1)},${cr.toFixed(1)} 0 0 0 ${(2 * cr).toFixed(1)},0" stroke="#fff" stroke-width="1.5" opacity=".25" fill="none"/>`; }
  return s; }
function mimas(x, y, R) { return `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#mimG)"/>` + litRock(`M${x - R},${y} a${R},${R} 0 1 0 ${2 * R},0 a${R},${R} 0 1 0 ${-2 * R},0Z`, 'mi', '#d8d6d2', '#6a6a6c', 7, { fx: .04, fy: .04, sc: 2, k1: 1.0 }) + `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#mimG)" opacity=".6"/>` +
  `<circle cx="${x - R * .3}" cy="${y - R * .05}" r="${R * .32}" fill="#000" opacity=".22"/><path d="M${x - R * .62},${y - R * .05} a${R * .32},${R * .32} 0 0 0 ${R * .64},0" stroke="#fff" stroke-width="2.5" opacity=".35" fill="none"/><circle cx="${x - R * .3}" cy="${y - R * .05}" r="${R * .06}" fill="#fff" opacity=".25"/>`; }
function sceneRound(t) {
  const t0 = S0(9) - .2, T = t - t0, aP = ease(ramp(t, t0 + .3, t0 + .9)), aM = ease(ramp(t, WS(9, 8) - .2, WS(9, 10) + .2)), sq = ease(ramp(t, WS(9, 13), WS(9, 15) + .4));
  let s = `<defs>${TRD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>${starsK(220, 51)}`;
  s += `<g opacity="${aP.toFixed(2)}">${potato(190, 640, 80, 13)}${lbl(190, 790, 'صغير', 1, '#cfd8e8', 30)}${lbl(190, 830, 'شكلٌ غيرُ منتظم', 1, '#a8b4c8', 26)}</g>`;
  s += `<g opacity="${aM.toFixed(2)}">${mimas(500, 640, 120)}${lbl(500, 830, 'كرة', 1, '#f4c76b', 34)}${lbl(360, 910, 'أكبرُ من بضعِ مئاتِ الكيلومترات', 1, '#f4c76b', 28)}</g>`;
  if (sq > 0) for (let i = 0; i < 10; i++) { const a = i / 10 * 6.2832, p = pmod(T * .9 + i * .1, 1); s += `<g opacity="${(sq * Math.sin(p * Math.PI)).toFixed(2)}">${arrowT(500 + Math.cos(a) * (210 - p * 50), 640 + Math.sin(a) * (210 - p * 50), 500 + Math.cos(a) * (160 - p * 50), 640 + Math.sin(a) * (160 - p * 50), '#fff', 3)}</g>`; }
  // a tetrahedron sketch that rounds off under the arrows
  const tk = ease(ramp(t, WS(9, 14), WS(9, 15) + .6));
  if (tk > 0) { let d = ''; for (let i = 0; i <= 90; i++) { const a = i / 90 * 6.2832 - 1.5708, sec = (a + 1.5708) % (6.2832 / 3) - 6.2832 / 6, rt = .5 / Math.cos(sec), rr = lerp(rt, .62, tk) * 1.0; d += (i ? ' L' : 'M') + (360 + Math.cos(a) * rr * 150).toFixed(1) + ',' + (1080 + Math.sin(a) * rr * 150).toFixed(1); }
    s += `<g opacity="${ease(ramp(t, WS(9, 14), WS(9, 14) + .3)).toFixed(2)}"><path d="${d}Z" fill="none" stroke="#f4c76b" stroke-width="4"/></g>`; }
  noEarth(); F.ov = ''; return s;
}
// 10: the corners collapse, huge earthquakes, until it is a ball again
function sceneCollapse(t) {
  const t0 = S0(10) - .2, T = t - t0, k = ease(ramp(t, WS(10, 0), WS(10, 8) + .3)), qa = ease(ramp(t, WS(10, 0) - .2, WS(10, 1))) * (1 - ease(ramp(t, WS(10, 8), WS(10, 10) + .4)));
  const sh = qa * .06, jx = Math.sin(t * 37) * sh + Math.sin(t * 53) * sh * .6, jy = Math.cos(t * 41) * sh;
  tri3(t, { d: lerp(12.5, 9.6, k), el: .3, lon: 90 + T * 6, clouds: .35 * k, lights: .3, tet: 1 - k, pool: 1 - k, quake: qa, tg: [jx, lerp(.15, 0, k) + jy, 0] });
  F.ov = ''; return space(t);
}
// 11: that is why every planet is round
function sceneAllRound(t) {
  const T = t - (S0(11) - .2);
  tri3(t, { d: 9.6, el: .3, lon: 90 + (S0(11) - .2 - (S0(10) - .2)) * 6 + T * 6, clouds: .35, lights: .3, tet: 0 });
  F.ov = ''; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, T = t - (S0(11) - .2);
  tri3(t, { d: lerp(9.6, 9.8, ease(ramp(t, S0(12) - .2, S0(12) + 1))), el: .3, tg: [0, lerp(0, .64, ease(ramp(t, S0(12) - .2, S0(12) + 1.2))), 0], lon: 90 + (S0(11) - .2 - (S0(10) - .2)) * 6 + T * 6, clouds: .4, lights: .3, tet: 0 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 11) - .3, WS(12, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const AR4 = n => String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneShape }, { s: S0(2) - .2, f: sceneGrav }, { s: S0(3) - .2, f: scenePool }, { s: S0(4) - .2, f: sceneSlope }, { s: S0(5) - .2, f: sceneVertex },
  { s: S0(6) - .2, f: sceneSummit }, { s: S0(7) - .2, f: sceneSunrise }, { s: S0(8) - .2, f: sceneCiv }, { s: S0(9) - .2, f: sceneRound }, { s: S0(10) - .2, f: sceneCollapse }, { s: S0(11) - .2, f: sceneAllRound }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneGrav, sceneRound, sceneCiv]);
const XF = .5;
const TLI = [['الشكل', S0(1)], ['البحار', S0(3)], ['الزوايا', S0(5)], ['الانهيار', S0(9)]];
const LIST_ON = new Set([sceneSummit]);
const CHIPS = [
  ['c0', 'الأرضُ… مثلّثة', 360, 1200, 'big', WS(0, 6), S0(1) - .3],
  ['c1', '٤ وجوهٍ مثلّثة', 360, 330, 'big', WS(1, 2), WS(1, 5) - .1],
  ['c1b', 'بنفسِ الحجم', 360, 330, 'big', WS(1, 5), S0(2) - .3],
  ['c2', 'الجاذبيّةُ نحوَ المركز', 360, 330, 'big', WS(2, 1), WS(2, 6) - .1],
  ['c2b', 'وسطُ الوجهِ هو الأقرب', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', '٤ بحارٍ فقط', 360, 330, 'big', WS(3, 7), S0(4) - .3],
  ['c4', 'الأرضُ المستويةُ… جبل', 360, 330, 'red big', WS(4, 5), WS(4, 10) - .1],
  ['c4b', 'ميلٌ ≈ ٥٥°', 360, 330, 'red big', WS(4, 11), S0(5) - .3],
  ['c5', 'أكثرُ من ٨٬٠٠٠ كم', 360, 330, 'big', WS(5, 3), WS(5, 11) - .1],
  ['c5b', 'في الفضاء', 360, 330, 'red big', WS(5, 11), S0(6) - .3],
  ['c6', 'بلا هواءٍ ولا ماء', 360, 330, 'red big', WS(6, 0), S0(7) - .3],
  ['c7', 'والغريب؟', 360, 330, 'big', WS(7, 0), WS(7, 6) - .1],
  ['c7b', 'شروقٌ واحدٌ لربعِ العالم', 360, 330, 'big', WS(7, 6), S0(8) - .3],
  ['c8', '٤ حضاراتٍ منفصلة', 360, 330, 'big', WS(8, 1), S0(9) - .3],
  ['c9', 'والمفاجأة؟', 360, 330, 'big', WS(9, 0), WS(9, 13) - .1],
  ['c9b', 'الجاذبيّةُ تصنعُ الكرة', 360, 330, 'big', WS(9, 13), S0(10) - .3],
  ['c10', 'زلازلُ هائلة', 360, 330, 'red big', WS(10, 2), S0(11) - .3],
  ['c11', 'كلُّ الكواكبِ مستديرة', 360, 330, 'big', WS(11, 0), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 11) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الأرضُ المثلّثة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
