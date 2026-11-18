// ===== #57 part C: scenes 9–11, the scene list, chips and UI =====
// ---------- 9: the twist: the vaccine came from an idea everyone rejected for decades; Katalin Karikó was demoted, then won the Nobel Prize ----------
function crt(x, y, s, t) {   // a 1990s beige computer with a green-text screen
  let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="120" ry="10" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-110" y="-24" width="220" height="24" rx="4" fill="#d8ceb4"/><rect x="-90" y="-180" width="180" height="150" rx="12" fill="#e0d6bc"/><rect x="-90" y="-180" width="180" height="150" rx="12" fill="#000" opacity=".06"/>` +
    `<rect x="-74" y="-166" width="148" height="112" rx="14" fill="#0e1a12"/>`;
  for (let i = 0; i < 6; i++) g += `<rect x="-62" y="${-154 + i * 16}" width="${(40 + ((i * 37) % 70)) * (i === 5 ? (pmod(t * 1.5, 1) > .5 ? 1 : 0) : 1)}" height="6" fill="#5af08a" opacity=".75"/>`;
  return g + `<rect x="-74" y="-166" width="148" height="112" rx="14" fill="#fff" opacity=".05"/><path d="M-66,-150 L-30,-162" stroke="#fff" stroke-width="8" opacity=".08"/><rect x="-60" y="-20" width="120" height="10" rx="2" fill="#bcb29a"/></g>`;
}
function letterR(x, y, rot, k, st) {   // a letter falling onto the bench, then the red stamp «مرفوض»
  if (k <= 0) return ''; const yy = lerp(y - 160, y, ease(k));
  let g = `<g transform="translate(${x},${yy.toFixed(1)}) rotate(${rot})" opacity="${clamp(k * 3).toFixed(2)}"><rect x="-66" y="-86" width="132" height="172" fill="#000" opacity=".25" transform="translate(5,6)" filter="url(#blur2)"/><rect x="-66" y="-86" width="132" height="172" fill="#fbf8ee"/>` +
    [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M-50,${-62 + i * 16} h${i % 3 === 2 ? 70 : 100}" stroke="#8a8a90" stroke-width="3" opacity=".6"/>`).join('');
  if (st > 0) { const sc = lerp(1.6, 1, ease(st)); g += `<g opacity="${clamp(st * 2).toFixed(2)}" transform="rotate(-14) scale(${sc.toFixed(2)})"><rect x="-56" y="-22" width="112" height="44" rx="6" fill="none" stroke="#c8202a" stroke-width="5"/><text x="0" y="12" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#c8202a">مرفوض</text></g>`; }
  return g + `</g>`;
}
function medal(x, y, R, a, t) {   // a gold prize medal with a laurel ring, on a ribbon
  if (a <= 0) return ''; const sh = (pmod(t * .35, 1) * 2.6 - .8) * R;
  let g = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) scale(${lerp(.7, 1, ease(a)).toFixed(3)})"><path d="M-40,${-R - 150} L-14,${-R + 10} L14,${-R + 10} L40,${-R - 150}Z" fill="#2a4a8a"/><path d="M-14,${-R - 150} L-2,${-R + 10} L2,${-R + 10} L14,${-R - 150}Z" fill="#f4c76b"/>` +
    `<circle cx="0" cy="0" r="${R + 60}" fill="url(#lampW)" opacity=".5"/><circle cx="4" cy="6" r="${R}" fill="#000" opacity=".35" filter="url(#blur5)"/><circle r="${R}" fill="url(#goldM)"/><circle r="${R * .86}" fill="none" stroke="#8a6010" stroke-width="3" opacity=".6"/>`;
  for (let i = 0; i < 20; i++) { const an = (i / 20) * 6.283, lx = Math.cos(an) * R * .76, ly = Math.sin(an) * R * .76; g += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${(R * .09).toFixed(1)}" ry="${(R * .04).toFixed(1)}" transform="rotate(${(an * 57.3 + 60).toFixed(0)},${lx.toFixed(1)},${ly.toFixed(1)})" fill="#a8780c" opacity=".7"/>`; }
  g += `<text x="0" y="${-R * .05}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${(R * .36).toFixed(0)}" fill="#6a4a0c">نوبل</text><text x="0" y="${R * .4}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${(R * .26).toFixed(0)}" fill="#6a4a0c">${AR4(2023)}</text>`;
  g += `<clipPath id="mdC"><circle r="${R}"/></clipPath><g clip-path="url(#mdC)"><rect x="${(sh - 20).toFixed(1)}" y="${-R}" width="40" height="${2 * R}" fill="#fff" opacity=".35" transform="rotate(25)"/></g>`;
  return g + `</g>`;
}
function sceneKariko(t) {
  const t0 = S0(9) - .2, T = t - t0, nm = ease(ramp(t, WS(9, 9) - .2, WS(9, 10) + .2)), md = ease(ramp(t, WS(9, 16) - .3, WS(9, 17) + .3)), dn = ease(ramp(t, WS(9, 12) - .2, WS(9, 13) + .2));
  let s = `<defs>${CVD()}<linearGradient id="lab9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ccb0"/><stop offset="1" stop-color="#b4a88c"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#lab9)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  // shelves with bottles, a wall clock, a corkboard of notes
  s += `<rect x="30" y="420" width="290" height="10" fill="#8a6a4a"/><rect x="30" y="560" width="290" height="10" fill="#8a6a4a"/>` + flask(70, 418, .38, .5, '#4ab0e8') + flask(130, 418, .32, .7, '#e8c84a') +
    [190, 230, 270].map((x, i) => `<rect x="${x}" y="${352 + i * 4}" width="30" height="${66 - i * 4}" rx="5" fill="${['#7a4a2a', '#3a5a3a', '#5a3a6a'][i]}" opacity=".85"/><rect x="${x + 4}" y="372" width="22" height="16" fill="#f4ecd8"/>`).join('') +
    flask(80, 558, .36, .4, '#8ad86a') + `<rect x="140" y="500" width="160" height="58" rx="4" fill="#7a5a3a"/>` + [0, 1, 2, 3, 4, 5].map(i => `<rect x="${146 + i * 26}" y="${506 + (i % 2) * 4}" width="20" height="${48 - (i % 2) * 4}" fill="${['#c84a3a', '#3a6aa8', '#e8c84a', '#4a8a5a', '#8a4a8a', '#d8d0c0'][i]}"/>`).join('');
  s += `<rect x="430" y="380" width="250" height="180" fill="#b8865a"/><rect x="440" y="390" width="230" height="160" fill="#c8a070"/><rect x="440" y="390" width="230" height="160" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
    [[470, 410, '#fff8c8', -4], [540, 420, '#fff', 3], [610, 404, '#c8e8ff', -2], [480, 480, '#fff', 2], [570, 476, '#ffd8c8', -5]].map(([x, y, c, r]) => `<rect x="${x}" y="${y}" width="56" height="50" fill="${c}" transform="rotate(${r},${x + 28},${y + 25})"/><circle cx="${x + 28}" cy="${y + 6}" r="4" fill="#c0392b"/>`).join('');
  // the bench: the scientist with a pipette over a rack of tubes; the old computer
  s += man(310, 1060, .95, 1, 6, { top: '#f6f8fa', pants: '#3a3a4a', skin: '#e0b090', hair: '#c8a060', hF: [400, 880], hB: [380, 940], lean: 6, lookUp: -.3 });
  s += hairL(.95, 1, '#c8a060');
  { const [hx, hy] = HP.head; s += `<path d="M${hx + 4},${hy - 2} h22" stroke="#4a4a4a" stroke-width="2"/><circle cx="${hx + 17}" cy="${hy - 2}" r="7" fill="none" stroke="#4a4a4a" stroke-width="2"/>`; }
  s += `<g transform="translate(400,880) rotate(8)"><rect x="-6" y="-60" width="12" height="60" rx="4" fill="#e8ecf0"/><rect x="-8" y="-74" width="16" height="16" rx="3" fill="#4a8ad8"/><path d="M0,0 L0,40" stroke="#dfe6ec" stroke-width="5"/><path d="M0,40 L0,58" stroke="#f4c76b" stroke-width="2.5"/></g>`;
  s += `<rect x="-20" y="980" width="760" height="20" fill="#e8e2d0"/><rect x="-20" y="1000" width="760" height="300" fill="#6a5a48"/><rect x="-20" y="1000" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1000" width="760" height="12" fill="#000" opacity=".3"/>`;
  s += tubesR(360, 978, .8) + crt(590, 980, .9, t);
  // the letters: rejected, rejected, rejected
  [[150, 1040, -8, 0], [210, 1050, 6, 1], [130, 1060, 14, 2]].forEach(([x, y, r, i]) => { const tk = WS(9, 6) + i * .45; s += letterR(x, y, r, ramp(t, tk - .5, tk), ramp(t, tk + .05, tk + .3)); });
  if (nm > 0) s += `<g opacity="${(nm * (1 - md * .6)).toFixed(2)}">${panel(180, 1140, 360, 96)}${lbl(360, 1188, 'كاتالين كاريكو', 1, '#f4c76b', 36)}${lbl(360, 1224, 'عالمةُ الكيمياءِ الحيويّة', 1, '#fff', 20)}</g>`;
  if (dn > 0) { const y = lerp(660, 720, dn); s += `<g opacity="${(dn * (1 - md)).toFixed(2)}"><path d="M380,${y - 70} V${y + 20} M350,${y - 10} L380,${y + 30} L410,${y - 10}" stroke="#c8202a" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  s += medal(560, 760, 90, md, t);
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: today the same technology is being tested against cancer ----------
function cellT(x, y, R, seed, t, col) {   // an immune cell: a pale sphere with short bumps
  const r = RS(seed); let d = '';
  for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283, k = 1 + .05 * Math.sin(a * 9 + seed) + .03 * Math.sin(a * 17 + t * 2 + seed); d += (i ? ' L' : 'M') + (x + Math.cos(a) * R * k).toFixed(1) + ',' + (y + Math.sin(a) * R * k).toFixed(1); }
  return `<path d="${d}Z" fill="url(#tc${col})"/>` + Array.from({ length: 14 }, (_, i) => { const a = i / 14 * 6.283 + seed, bx = x + Math.cos(a) * R * .98, by = y + Math.sin(a) * R * .98; return `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(R * .08).toFixed(1)}" fill="#e8f4ff" opacity=".7"/>`; }).join('') +
    `<ellipse cx="${(x - R * .3).toFixed(1)}" cy="${(y - R * .35).toFixed(1)}" rx="${(R * .35).toFixed(1)}" ry="${(R * .22).toFixed(1)}" fill="#fff" opacity=".3"/>`;
}
function sceneCancer(t) {
  const t0 = S0(10) - .2, T = t - t0, rn = ease(ramp(t, WS(10, 1) - .4, WS(10, 2) + .4)), at = ease(ramp(t, WS(10, 3), WS(10, 5) + .4));
  let s = `<defs>${CVD()}<radialGradient id="tcA" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e8f6ff"/><stop offset=".55" stop-color="#8ac0e8"/><stop offset="1" stop-color="#2a5a8a"/></radialGradient><radialGradient id="tmG" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#d8a0d8"/><stop offset=".55" stop-color="#8a3a8a"/><stop offset="1" stop-color="#3a0e3a"/></radialGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#micBg)"/>` + bokehF(t, 14, 9, .8);
  // the tumour: a cluster of lumpy, shaded cancer cells with a rough surface
  const tx = 470, ty = 820;
  [[400, 760, 78, 1], [540, 740, 72, 2], [610, 860, 64, 3], [470, 900, 84, 4], [370, 880, 60, 5], [500, 820, 70, 6], [560, 960, 56, 7]].forEach(([x, y, R, sd]) => {
    let d = ''; for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283, k = 1 + .08 * Math.sin(a * 4 + sd) + .05 * Math.sin(a * 9 + sd * 2) + .025 * Math.sin(a * 19 + sd); d += (i ? ' L' : 'M') + (x + Math.cos(a) * R * k).toFixed(1) + ',' + (y + Math.sin(a) * R * k).toFixed(1); } d += 'Z';
    s += `<path d="${d}" fill="#000" opacity=".35" transform="translate(6,8)" filter="url(#blur5)"/><path d="${d}" fill="url(#tmG)"/><g opacity=".5">${litRock(d, 'tm' + sd, '#f4d0f4', '#4a1048', 40 + sd, { fx: .05, fy: .05, sc: 3.5, x: x - R * 1.2, y: y - R * 1.2, w: R * 2.4, h: R * 2.4 })}</g>` +
      `<ellipse cx="${x - R * .3}" cy="${y - R * .38}" rx="${R * .32}" ry="${R * .2}" fill="#fff" opacity=".22"/><circle cx="${x + R * .1}" cy="${y + R * .05}" r="${R * .3}" fill="#5a1a5a" opacity=".35" filter="url(#blur2)"/>`; });
  // the immune cells, trained by the mRNA, move in and grab the tumour
  [[120, 640, 58, 3], [90, 920, 64, 7], [260, 1120, 54, 11], [250, 700, 46, 13]].forEach(([x, y, R, sd], i) => { const k = clamp(at * 1.3 - i * .1), ax = lerp(x, lerp(x, tx, .42), k), ay = lerp(y, lerp(y, ty, .42), k) + Math.sin(t * 2 + i) * 6; s += cellT(ax, ay, R, sd, t, 'A'); });
  // the mRNA strand: a gold ribbon with its letters, sliding in across the top
  if (rn > 0) { let a1 = '', a2 = '', tk = ''; for (let i = 0; i <= 60; i++) { const x = -20 + i * 13, ph = i * .35 - T * 2.4, y = 500 + Math.sin(ph) * 22 - i * 1.6, y2 = 500 - Math.sin(ph) * 22 - i * 1.6;
      if (x > 760 * rn) break; a1 += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); if (i % 2 === 0) tk += `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${x.toFixed(1)},${(y + 18).toFixed(1)}" stroke="${['#4ab0e8', '#e85a4a', '#8ad86a', '#f4c84a'][(i / 2) % 4]}" stroke-width="5" stroke-linecap="round"/>`; }
    s += `<g opacity="${rn.toFixed(2)}">${tk}<path d="${a1}" stroke="#f4c76b" stroke-width="7" fill="none"/><path d="${a1}" stroke="#fff6c8" stroke-width="2" fill="none"/></g>` + `<text x="620" y="560" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#f4c76b" opacity="${rn.toFixed(2)}">mRNA</text>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 11: which discovery changed the world most? Comment, subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, T = t - (S0(11) - .2);
  gAt(t, 360, 760, { d: lerp(9.4, 9.0, ease(clamp(T / 3))), el: .3, lon: 10 + T * 7, clouds: .45, lights: .4, off: -.6 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 10) - .3, WS(11, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpeed }, { s: S0(2) - .2, f: sceneLock }, { s: S0(3) - .2, f: sceneHosp }, { s: S0(4) - .2, f: sceneMut }, { s: S0(5) - .2, f: sceneLives },
  { s: S0(6) - .2, f: sceneClosed2 }, { s: S0(7) - .2, f: sceneImm }, { s: S0(8) - .2, f: sceneDrug }, { s: S0(9) - .2, f: sceneKariko }, { s: S0(10) - .2, f: sceneCancer }, { s: S0(11) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneLives, sceneImm, sceneMut]);
const XF = .5;
const TLI = [['اللقاح', S0(1)], ['الإغلاق', S0(2)], ['المستشفيات', S0(3)], ['المتحوّرات', S0(4)]];
const LIST_ON = new Set([sceneHosp]);
const CHIPS = [
  ['c0', 'كورونا… بلا لقاح', 360, 1200, 'big', WS(0, 4), S0(1) - .3],
  ['c1', 'أقلُّ من سنة', 360, 330, 'big', WS(1, 7), WS(1, 10) - .1],
  ['c1b', 'أسرعُ لقاحٍ في التاريخ', 360, 330, 'big', WS(1, 10), S0(2) - .3],
  ['c2', 'الإغلاق', 360, 330, 'red big', WS(2, 2), S0(3) - .3],
  ['c3', 'المستشفياتُ ممتلئة', 360, 330, 'red big', WS(3, 0), WS(3, 6) - .1],
  ['c3b', 'نفدَ الأكسجين', 360, 330, 'red big', WS(3, 6), S0(4) - .3],
  ['c4', 'كلُّ إصابةٍ… فرصةُ تحوّر', 360, 330, 'big', WS(4, 1), WS(4, 11) - .1],
  ['c4b', 'أكثرُ من ٣٠ طفرة', 360, 330, 'red big', WS(4, 11), S0(5) - .3],
  ['c5', 'دراسة: مجلّة لانسيت', 360, 330, 'dark', WS(5, 1), WS(5, 16) - .1],
  ['c5b', 'أغلبُهم من كبارِ السنّ', 360, 330, 'big', WS(5, 16), S0(6) - .3],
  ['c6', 'المدارسُ مغلقة', 360, 330, 'red big', WS(6, 3), WS(6, 10) - .1],
  ['c6b', 'أغلبُ الرحلاتِ توقّفت', 360, 330, 'red big', WS(6, 10), WS(6, 13) - .1],
  ['c6c', 'بلا لقاح: سنوات', 360, 330, 'red big', WS(6, 13), S0(7) - .3],
  ['c7', 'مناعةٌ بالعدوى', 360, 330, 'ice', WS(7, 6), WS(7, 10) - .1],
  ['c7b', 'تضعفُ مع الوقت', 360, 330, 'ice', WS(7, 10), WS(7, 13) - .1],
  ['c7c', 'ثمنُها ملايينُ الأرواح', 360, 330, 'red big', WS(7, 13), S0(8) - .3],
  ['c8', 'علاجٌ، لا وقاية', 360, 330, 'big', WS(8, 0), WS(8, 17) - .1],
  ['c8b', 'لا يمنعُ العدوى', 360, 330, 'red big', WS(8, 17), S0(9) - .3],
  ['c9', 'والغريب؟', 360, 330, 'big', WS(9, 0), WS(9, 6) - .1],
  ['c9b', 'فكرةٌ مرفوضة… لعقود', 360, 330, 'red big', WS(9, 6), WS(9, 12) - .1],
  ['c9c', 'خُفِّضتْ رتبتُها', 360, 330, 'red big', WS(9, 12), WS(9, 16) - .1],
  ['c9d', 'جائزةُ نوبل ٢٠٢٣', 360, 330, 'big', WS(9, 16), S0(10) - .3],
  ['c10', 'لقاحاتُ السرطان… قيدَ التجربة', 360, 330, 'big', WS(10, 1), S0(11) - .3],
  ['c11', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">عالمٌ بلا لقاح</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
