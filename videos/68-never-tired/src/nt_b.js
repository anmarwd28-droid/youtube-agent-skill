// nt_b.js (#68): scenes 5-12 (torn muscle and heat, fuel for 2 hours, the sudden fall, overwork, the heart that never tires, the end) + UI
// ---------- 5: it stops you before your muscles tear or your body heat climbs to a dangerous level ----------
function muscleF(cx, cy, w, h, tear, t) {   // a bundle of striated muscle fibres, seen magnified; tear 0..1 opens a gap with frayed ends
  let s = `<defs><clipPath id="mfC"><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="30"/></clipPath></defs><g clip-path="url(#mfC)"><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" fill="#5a1a1a"/>`;
  const n = 9, fh = h / n;
  for (let i = 0; i < n; i++) { const y = cy - h / 2 + i * fh + fh / 2, gap = tear * (i % 3 === 1 ? 70 : 30 + (i % 2) * 20), off = Math.sin(i * 2.3) * 30;
    [[-1, cx - w / 2, cx + off - gap / 2], [1, cx + off + gap / 2, cx + w / 2]].forEach(([sd, x0, x1]) => { if (x1 - x0 < 2) return;
      s += `<rect x="${x0.toFixed(1)}" y="${(y - fh * .42).toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(fh * .84).toFixed(1)}" rx="${(fh * .4).toFixed(1)}" fill="#c84a44"/><rect x="${x0.toFixed(1)}" y="${(y - fh * .36).toFixed(1)}" width="${(x1 - x0).toFixed(1)}" height="${(fh * .18).toFixed(1)}" rx="4" fill="#f4a09a" opacity=".5"/>`;
      for (let x = x0 + 6; x < x1 - 4; x += 9) s += `<path d="M${x.toFixed(1)},${(y - fh * .4).toFixed(1)} v${(fh * .8).toFixed(1)}" stroke="#8a2a2a" stroke-width="2" opacity=".55"/>`; });
    if (tear > .05) for (let k = 0; k < 4; k++) { const fx = cx + off + (k % 2 ? 1 : -1) * gap / 2, fy = y - fh * .3 + k * fh * .2; s += `<path d="M${fx.toFixed(1)},${fy.toFixed(1)} l${((k % 2 ? 1 : -1) * -14 * tear).toFixed(1)},${(Math.sin(k + i) * 4).toFixed(1)}" stroke="#e86a5a" stroke-width="2"/>`; } }
  return s + `</g><rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="30" fill="none" stroke="#e8d0c8" stroke-width="5"/>`;
}
function sceneTear(t) {
  const T = t - (S0(5) - .2), te = ease(ramp(t, WS(5, 3), WS(5, 4) + .6)), hot = ease(ramp(t, WS(5, 6), WS(5, 11) + .3)), temp = lerp(37, 41.5, hot);
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1a1e2a"/>` + scr(`<ellipse cx="360" cy="700" rx="380" ry="460" fill="#ff6a4a" opacity="${(.08 + .15 * hot).toFixed(2)}" filter="url(#blur16)"/>`);
  s += muscleF(360, 600, 560, 300, te, t) + NTL(360, 800, 'أليافُ العضلة', 1, '#f4a09a', 26);
  // the body thermometer
  const tx = 360, ty = 1120, L = 420, v = (temp - 35) / 8;
  s += `<g opacity="${clamp(hot * 4 + .3).toFixed(2)}"><rect x="${tx - L / 2 - 30}" y="${ty - 40}" width="${L + 60}" height="80" rx="40" fill="#eef2f6"/><circle cx="${tx - L / 2}" cy="${ty}" r="44" fill="#d8302a"/><rect x="${tx - L / 2}" y="${ty - 12}" width="${(L * v).toFixed(1)}" height="24" rx="12" fill="#d8302a"/>` +
    [36, 38, 40, 42].map(c => `<path d="M${(tx - L / 2 + L * (c - 35) / 8).toFixed(1)},${ty + 18} v18" stroke="#3a3e48" stroke-width="3"/><text x="${(tx - L / 2 + L * (c - 35) / 8).toFixed(1)}" y="${ty + 66}" text-anchor="middle" font-size="22" font-weight="700" fill="#fff">${arN2(c)}°</text>`).join('') +
    `<rect x="${(tx - L / 2 + L * 5 / 8).toFixed(1)}" y="${ty - 40}" width="${(L * 3 / 8 + 30).toFixed(1)}" height="80" rx="20" fill="#ff3a2a" opacity=".18"/></g>` + NTL(tx, ty - 70, `${arN2(temp.toFixed(1)).replace('.', '٫')}°`, clamp(hot * 4), temp > 40 ? '#ff7a6a' : '#fff', 40);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: muscles store fuel for only about 2 hours of hard effort: a gauge drains ----------
function sceneFuel(t) {
  const T = t - (S0(6) - .2), k = ease(ramp(t, WS(6, 2), S0(7) - .2)), lvl = 1 - k;
  let s = `<defs>${LDEFS()}${CVD()}</defs>` + stadium(t, .15);
  s += runner(200, 1130, .82, 1, t * 11, 1);
  // a big fuel gauge
  const cx = 470, cy = 560, R = 150, an = lerp(-200, 20, lvl) * Math.PI / 180;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 20}" fill="#0a0e1c" opacity=".88"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#1c2232" stroke="url(#chromeV)" stroke-width="8"/>`;
  for (let i = 0; i <= 8; i++) { const q = lerp(-200, 20, i / 8) * Math.PI / 180; s += `<path d="M${(cx + Math.cos(q) * R * .72).toFixed(1)},${(cy + Math.sin(q) * R * .72).toFixed(1)} L${(cx + Math.cos(q) * R * .9).toFixed(1)},${(cy + Math.sin(q) * R * .9).toFixed(1)}" stroke="${i < 2 ? '#ff4a3a' : '#f4f0e8'}" stroke-width="${i % 4 ? 3 : 6}"/>`; }
  s += `<text x="${cx - R * .62}" y="${cy + 40}" font-size="30" font-weight="700" fill="#ff4a3a" font-family="Inter">E</text><text x="${cx + R * .5}" y="${cy + 40}" font-size="30" font-weight="700" fill="#f4f0e8" font-family="Inter">F</text>`;
  s += `<path d="M${cx},${cy} L${(cx + Math.cos(an) * R * .8).toFixed(1)},${(cy + Math.sin(an) * R * .8).toFixed(1)}" stroke="#ff7a3a" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="14" fill="#3a3e48"/>`;
  s += NTL(cx, cy + R + 60, `${arN2(Math.max(0, Math.round(120 * lvl)))} دقيقة`, 1, lvl < .2 ? '#ff7a6a' : '#f4c76b', 34) + NTL(cx, cy - R - 40, 'وقودُ العضلات', 1, '#fff', 24);
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: without tiredness people run until the fuel suddenly runs out, and they drop without warning ----------
function sceneFall(t) {
  const T = t - (S0(7) - .2), drop = ease(ramp(t, WS(7, 9), WS(7, 10) + .5)), x = 200 + Math.min(T, WS(7, 9) - S0(7) + .2) * 40;
  let s = `<defs>${LDEFS()}</defs>` + stadium(t, .3);
  if (drop < .02) s += runner(x, 1110, .9, 1, t * 11, 1);
  else s += `<ellipse cx="${x + 110 * drop}" cy="1112" rx="${40 + 70 * drop}" ry="10" fill="#000" opacity=".3" filter="url(#blur5)"/><g transform="rotate(${(84 * drop).toFixed(1)},${x},1104)">` + hero(x, 1110, Object.assign({ s: .9, face: 1, shade: 1, noShadow: 1, aF: [-.6 * drop - .1, .4], aB: [-.3 * drop, .3] }, gp(1))) + `</g>`;
  if (drop > .6) s += `<g opacity="${clamp((drop - .6) * 3).toFixed(2)}">${panel(180, 420, 360, 110)}${NTL(360, 490, 'دونَ أيِّ إنذار', 1, '#ff8a7a', 36)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8-9: even with tiredness, long working hours killed about 745,000 people in one year (WHO/ILO); without it, people might work until their bodies break ----------
function sceneOffice(t) {
  const T = t - (S0(8) - .2), c = ease(ramp(t, WS(8, 8), WS(8, 12) + .3)), sl = ease(ramp(t, S0(9), WS(9, 6) + .4));
  let s = `<defs>${LDEFS()}${CVD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1e2632"/>`;
  // a night window wall with the city, ceiling lights
  s += `<rect x="-20" y="380" width="760" height="420" fill="#0a1024"/>` + farCity(77, 800, '#1a2440') + Array.from({ length: 40 }, (_, i) => { const r = RS(i + 3); return `<rect x="${(r() * 720).toFixed(0)}" y="${(600 + r() * 190).toFixed(0)}" width="5" height="7" fill="#ffd88a" opacity="${(.4 + r() * .5).toFixed(2)}"/>`; }).join('') +
    [0, 1, 2, 3].map(i => `<path d="M${i * 190},380 V800" stroke="#2a3242" stroke-width="10"/>`).join('') + `<rect x="-20" y="800" width="760" height="500" fill="#3a4250"/><rect x="-20" y="800" width="760" height="500" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += [120, 360, 600].map(x => `<rect x="${x - 60}" y="360" width="120" height="12" fill="#f4f6f8"/>` + scr(`<ellipse cx="${x}" cy="420" rx="160" ry="90" fill="url(#tubeL)" opacity=".5"/>`)).join('');
  // a clock that spins fast
  s += dialF(600, 470, 50, 12, (T * 120) % 60, {});
  // three people at desks, working; later they slump
  [[110, 1150, 0], [340, 1180, 3], [560, 1150, 5]].forEach(([x, y, i], j) => { s += `<g transform="rotate(${(sl * (8 + j * 4)).toFixed(1)},${x},${y - 60})">${deskP(x, y, .9, i, t)}</g>` + scr(`<rect x="${x + 40}" y="${y - 210}" width="80" height="50" fill="#bfe6ff" opacity=".25" filter="url(#blur5)"/>`); });
  if (c > 0) s += `<g opacity="${c.toFixed(2)}">${panel(60, 420, 420, 160)}<text x="270" y="510" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="#ff8a7a">${fmtN(745000 * c)}</text>${NTL(270, 556, 'وفاة في عامٍ واحد (٢٠١٦)', 1, '#fff', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10-11: the strangest part: one muscle never tires: the heart; about 3 billion beats in a life ----------
function heartA(cx, cy, s, beat) {   // an anatomical heart: ventricles, atria, aorta and vessels; beat 0..1 squeezes it
  const k = 1 - .06 * beat;
  return `<g transform="translate(${cx},${cy}) scale(${(s * k).toFixed(3)},${(s * (1 - .03 * beat)).toFixed(3)})">` +
    `<path d="M-30,-150 Q-34,-210 10,-226 Q60,-236 70,-196 L58,-180 Q30,-206 14,-190 Q4,-170 6,-140Z" fill="#c84a44"/><path d="M20,-150 Q30,-250 -10,-268 L-6,-246 Q20,-232 6,-150Z" fill="#a83a3a"/>` +
    `<path d="M50,-150 Q100,-200 120,-180 L110,-160 Q90,-176 70,-140Z" fill="#4a6ab0"/><path d="M-60,-130 Q-110,-170 -130,-150 L-120,-130 Q-100,-150 -76,-110Z" fill="#4a6ab0"/>` +
    `<g transform="rotate(-22)"><path d="M10,170 C-70,140 -150,60 -150,-30 C-150,-100 -100,-140 -40,-130 C0,-150 60,-150 100,-110 C140,-70 130,20 90,80 C70,120 40,160 10,170Z" fill="#b8403c"/><path d="M10,170 C40,160 70,120 90,80 C130,20 140,-70 100,-110 C120,-40 100,60 10,170Z" fill="#8a2a2c" opacity=".55"/>` + `<path d="M-30,-128 C-10,-60 -20,60 10,168" stroke="#e8c87a" stroke-width="16" fill="none" opacity=".55"/><path d="M-30,-128 C-10,-60 -20,60 10,168" stroke="#a8282a" stroke-width="6" fill="none"/><path d="M-18,-40 q-40,30 -70,30 M-14,30 q-40,20 -80,10 M-20,-90 q50,10 80,40 M-8,40 q40,10 70,-10" stroke="#a8282a" stroke-width="4" fill="none"/></g>` +
    `<path d="M-120,-60 C-110,-110 -60,-130 -26,-104" stroke="#e8807a" stroke-width="14" fill="none" stroke-linecap="round" opacity=".55"/><path d="M10,-110 C0,-40 -10,40 0,160" stroke="#7a2224" stroke-width="5" fill="none" opacity=".6"/>` +
    `<path d="M-60,-60 q-14,40 -8,90 M60,-80 q20,50 6,110 M-20,-20 q30,20 40,60" stroke="#8a2a2a" stroke-width="4" fill="none" opacity=".55"/><path d="M-100,0 q20,60 70,110" stroke="#f4c8a0" stroke-width="10" fill="none" opacity=".3"/></g>`;
}
function ecg(x0, x1, y, t, a) { let d = ''; for (let x = x0; x <= x1; x += 3) { const ph = pmod((x - x0) / 160 - t * 1.2, 1); let v = 0; if (ph > .4 && ph < .44) v = -(ph - .4) * 1500; else if (ph >= .44 && ph < .48) v = -60 + (ph - .44) * 3000; else if (ph >= .48 && ph < .52) v = 60 - (ph - .48) * 1500; else if (ph > .62 && ph < .74) v = -16 * Math.sin((ph - .62) / .12 * Math.PI); d += (x === x0 ? 'M' : ' L') + x + ',' + (y + v).toFixed(1); }
  return `<path d="${d}" stroke="#4af09a" stroke-width="4" fill="none" opacity="${a.toFixed(2)}"/>`; }
function sceneHeart(t) {
  const T = t - (S0(10) - .2), ph = pmod(t * 1.2, 1), beat = ph < .15 ? Math.sin(ph / .15 * Math.PI) : 0, cnt = ease(ramp(t, S0(11), WS(11, 4) + .3));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#140e18"/>` + scr(`<circle cx="360" cy="680" r="${(300 + 30 * beat).toFixed(1)}" fill="#ff3a4a" opacity="${(.12 + .12 * beat).toFixed(2)}" filter="url(#blur16)"/>`);
  s += heartA(360, 680, 1.25, beat) + ecg(40, 680, 1020, t, 1);
  if (cnt > 0) s += `<g opacity="${clamp(cnt * 4).toFixed(2)}">${panel(90, 1070, 540, 150)}<text x="360" y="1156" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#f4c76b">${fmtN(3e9 * cnt)}</text>${NTL(360, 1200, 'نبضة في العمر', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 12: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 7) - .3, WS(12, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSite }, { s: S0(2) - .2, f: sceneMarathon }, { s: S0(3) - .2, f: sceneFarm }, { s: S0(4) - .2, f: sceneAlarm },
  { s: S0(5) - .2, f: sceneTear }, { s: S0(6) - .2, f: sceneFuel }, { s: S0(7) - .2, f: sceneFall }, { s: S0(8) - .2, f: sceneOffice }, { s: S0(10) - .2, f: sceneHeart }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneTear, sceneHeart]);
const XF = .5;
const TLI = [['الرياضة', S0(1)], ['الإنتاج', S0(3)], ['الإنذار', S0(4)], ['الوقود', S0(6)], ['العمل', S0(8)], ['القلب', S0(10)]];
const LIST_ON = new Set([sceneFarm, sceneAlarm]);
const CHIPS = [
  ['c0', 'لا تعبَ أبداً', 360, 330, 'big', WS(0, 4), S0(1) - .3],
  ['c1', 'بلا توقّف', 360, 330, 'big', WS(1, 3), S0(2) - .3],
  ['c2', 'الماراثون', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', 'عملٌ ليلاً ونهاراً', 360, 330, 'big', WS(3, 3), S0(4) - .3],
  ['c4', 'التعبُ جرسُ إنذار', 360, 330, 'big', WS(4, 5), S0(5) - .3],
  ['c5', 'تمزّقُ العضلات', 360, 330, 'red big', WS(5, 3), WS(5, 6) - .1],
  ['c5b', 'حرارةٌ خطيرة', 360, 330, 'red big', WS(5, 6), S0(6) - .3],
  ['c6', 'وقودٌ لساعتينِ فقط', 360, 330, 'big', WS(6, 2), S0(7) - .3],
  ['c7', 'السقوطُ فجأة', 360, 330, 'red big', WS(7, 8), S0(8) - .3],
  ['c8', 'منظمة الصحة والعمل الدوليّة', 360, 330, 'big', WS(8, 4), S0(9) - .3],
  ['c9', 'حتّى تنهارَ الأجساد', 360, 330, 'red big', WS(9, 1), S0(10) - .3],
  ['c10', 'والأغرب؟', 360, 330, 'big', WS(10, 0), WS(10, 7) - .1],
  ['c10b', 'القلبُ لا يتعب', 360, 330, 'big', WS(10, 7), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">بلا تعب</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
