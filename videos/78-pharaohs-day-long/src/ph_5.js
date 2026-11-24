// ===================== chapter 6: the scribe; chapter 7: evening; ending: the secret =====================
// ---------- 61: a scribe, one of the most important people ----------
function sceneScribe(t) { noW(); const a = CS(6);
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#c49a6c"/><rect x="-20" y="-20" width="1320" height="760" fill="url(#phBrick)"/><rect x="-20" y="-20" width="1320" height="760" fill="#fff" filter="url(#wallI)" opacity=".25"/><rect x="-20" y="560" width="1320" height="200" fill="#b8946a"/><rect x="-20" y="556" width="1320" height="8" fill="#000" opacity=".15"/>`;
  s += `<path d="M120,-20 L520,-20 L760,760 L80,760Z" fill="#fff2c0" opacity=".12"/>` + `<rect x="190" y="600" width="560" height="40" rx="8" fill="#d8bc7c"/>`;
  s += scribeP(380, 640, 1.65, t) + papyrusSheet(800, 200, 380, 260, ramp(t, a, S0(62)), { seed: 61, lh: 26, red: 1 });
  return camMv(s, t, a, S0(62), [1.0, 640, 380], [1.06, 560, 420]) + grain(.08) + vign(.6); }
chip('كاتب', 640, 170, 'big', WS(61, 1), S0(62) - .3); chip('من أهمِّ الناسِ في مصر', 990, 520, '', WS(61, 3), S0(62) - .3);
// ---------- 62: very few people could read and write ----------
function sceneLiteracy(t) { noW(); const a = S0(62) - .2, k = ease(ramp(t, a, a + 1.2)), g = ease(ramp(t, WS(62, 6), WS(62, 8)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 20; c++) { const i = r * 20 + c, x = 170 + c * 47, y = 250 + r * 76, on = i === 47, a2 = clamp(k * 1.6 - i / 100); const col = on ? mix('#8a8e9a', '#f4c76b', g) : '#8a8e9a';
    s += `<g opacity="${a2.toFixed(2)}" transform="translate(${x},${y})"><circle cx="0" cy="-22" r="9" fill="${col}"/><path d="M-10,-10 Q0,-14 10,-10 L12,22 H-12Z" fill="${col}"/>${on && g > .3 ? `<rect x="10" y="-6" width="16" height="10" fill="#e2cc96" opacity="${g.toFixed(2)}"/>` : ''}</g>`; }
  s += `<g opacity="${g.toFixed(2)}"><circle cx="${170 + 7 * 47}" cy="${250 + 2 * 76 - 6}" r="34" fill="none" stroke="#f4c76b" stroke-width="3"/>${darkP(440, 640, 400, 56)}${goldT(640, 678, 'قليلٌ جداً يقرأُ ويكتب', 1, 28)}</g>`;
  return s + grain(.06); }
// ---------- 63: hieroglyphs: hundreds of signs; some are letters, some are whole words ----------
function sceneHiero(t) { noW(); const a = S0(63) - .2, k = ramp(t, a, WS(63, 3) + .5), l1 = ease(ramp(t, WS(63, 9), WS(63, 10) + .3)), l2 = ease(ramp(t, WS(63, 11), WS(63, 13)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#d8ccb2"/><rect x="-20" y="-20" width="1320" height="760" fill="#000" filter="url(#phStoneT)" opacity=".35"/>`;
  const keys = ['owl', 'vult', 'eye', 'hand', 'water', 'reed', 'mouth', 'loaf', 'snake', 'sun', 'foot', 'ankh', 'bee', 'chick', 'viper', 'plac'], cols = ['#1e140c', '#2a5a7a', '#a8321e'];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 14; c++) { const i = r * 14 + c, sh = clamp(k * 1.4 - i / 70); if (sh <= 0) continue; const kk = keys[(i * 7 + r) % keys.length], hl1 = (kk === 'owl' || kk === 'hand' || kk === 'mouth') && l1 > 0, hl2 = (kk === 'eye' || kk === 'sun') && l2 > 0;
    s += hg(kk, 120 + c * 76, 196 + r * 80, 1.3, hl1 ? mix(cols[(i) % 3], '#d8901a', l1) : hl2 ? mix(cols[(i) % 3], '#2a8a4a', l2) : cols[i % 3], sh * (1 - .55 * Math.max(l1 && !hl1 ? l1 : 0, l2 && !hl2 ? l2 : 0))); }
  s += `<g opacity="${l1.toFixed(2)}">${darkP(130, 610, 420, 70)}${hg('owl', 160, 625, 1, '#f4c76b')}${txt(400, 656, 'حرف: «م»', 1, '#f4c76b', 30)}</g><g opacity="${l2.toFixed(2)}">${darkP(730, 610, 420, 70)}${hg('sun', 760, 625, 1, '#7ae08a')}${txt(1000, 656, 'كلمة: «شمس»', 1, '#7ae08a', 30)}</g>`;
  return s + grain(.08) + vign(.5); }
chip('مئاتُ العلامات', 640, 140, '', WS(63, 3), WS(63, 9) - .1);
// ---------- 64: the scribe counts everything: loaves, stones, tax ----------
const egN = (n, x, y, col = '#1e140c') => { let s = '', xx = x; const c = Math.floor(n / 100), d = Math.floor(n % 100 / 10), u = n % 10;
  for (let i = 0; i < c; i++) { s += `<path d="M${xx},${y} q-2,-26 10,-28 q12,2 8,16 q-4,8 -10,4" stroke="${col}" stroke-width="3" fill="none"/>`; xx -= 26; }
  for (let i = 0; i < d; i++) { s += `<path d="M${xx - 10},${y} V${y - 18} Q${xx},${y - 32} ${xx + 10},${y - 18} V${y}" stroke="${col}" stroke-width="3" fill="none"/>`; xx -= 24; }
  for (let i = 0; i < u; i++) { s += `<path d="M${xx},${y} V${y - 24}" stroke="${col}" stroke-width="3"/>`; xx -= 9; }
  return s; };
function sceneAccounts(t) { noW(); const a = S0(64) - .2, r1 = ease(ramp(t, WS(64, 1), WS(64, 4))), r2 = ease(ramp(t, WS(64, 8), WS(64, 10))), r3 = ease(ramp(t, WS(64, 12), WS(64, 16)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#20160e"/>` + `<rect x="170" y="150" width="940" height="500" rx="8" fill="url(#phPap)"/><rect x="170" y="150" width="940" height="500" fill="#000" filter="url(#phPaperT)" opacity=".3"/>`;
  const row = (y, k, icon, n, lab, col) => `<g opacity="${k.toFixed(2)}">${icon}<g transform="translate(0,0)">${egN(n, 880, y + 16, col)}</g>${txt(470, y + 12, lab, 1, '#3a2410', 30)}${txt(1040, y + 12, AR(n), 1, '#9a2a1a', 28)}<path d="M230,${y + 40} H1060" stroke="#a88a50" stroke-width="1.5" opacity=".5"/></g>`;
  s += row(230, r1, breadP(260, 236, .8), 238, 'أرغفةٌ للعمّال', '#1e140c') + row(370, r2, `<g transform="translate(234,326) scale(.5)">${blockP(0, 30, 80, 50)}</g>`, 46, 'حجارةٌ وصلت', '#1e140c') + row(510, r3, `<g transform="translate(262,520)"><path d="M-24,0 Q-30,-40 0,-44 Q30,-40 24,0Z" fill="#c8a860"/><path d="M-10,-44 q10,-10 20,0" stroke="#8a6a2a" stroke-width="3" fill="none"/></g>`, 120, 'ضريبةٌ من المحصول', '#9a2a1a');
  return camMv(s, t, a, S0(65), [1.0, 640, 400], [1.04, 640, 400]) + grain(.08) + vign(.6); }
chip('الكاتبُ يحسبُ كلَّ شيء', 640, 690, '', WS(64, 1), S0(65) - .3);
// ---------- 65: if you could read and count, you would be rich ----------
function sceneRich(t) { noW(); const a = S0(65) - .2;
  let s = PHDF() + skyP('skRi', 'day', { hz: 470, sun: [1100, 180, 1, 24] }) + desertP(470, { ripples: 0 }) + `<rect x="-300" y="470" width="1880" height="400" fill="#7a9a4a"/>`;
  s += `<rect x="100" y="340" width="1080" height="240" fill="#e8dcc0"/><rect x="100" y="340" width="1080" height="240" fill="url(#phBrick)" opacity=".4"/><rect x="90" y="326" width="1100" height="18" fill="#c8b890"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${200 + i * 160}" y="344" width="26" height="236" fill="#d8c8a0"/><rect x="${196 + i * 160}" y="340" width="34" height="14" fill="#2a8a6a"/>`).join('');
  s += `<rect x="-300" y="580" width="1880" height="300" fill="#6f8a3c"/><rect x="420" y="600" width="440" height="70" rx="6" fill="#3f7186"/>` + palmP(80, 620, 260, t) + palmP(1200, 620, 240, t) + papyrusP(400, 640, 4, 3, t, 80);
  s += egy(640, 690, { s: .8, f: 1, kind: 'rich', h: { hF: [700, 560] } }) + `<g transform="translate(700,560)"><rect x="-6" y="-10" width="80" height="18" rx="6" fill="url(#phPap)"/></g>` + egy(820, 690, { s: .7, f: -1, kind: 'w', i: 4 });
  return camMv(s, t, a, S0(66), [1.0, 640, 380], [1.06, 680, 440]) + grain(.08); }
chip('من الأغنياء', 640, 180, 'big', WS(65, 7), S0(66) - .2);
// ---------- 66: the sun sets ----------
function sceneSunset(t) { noW(); const a = S0(66) - .2, u = ramp(t, a, CS(7) + .5);
  let s = PHDF() + skyP('skSu', 'dusk', { hz: 470, sun: [880, 380 + u * 110, 1, 30, '#ffd890'] }) + dunesBack(440, '#7a5040') + pyrP(560, 470, 420, { k: .86, id: 'su', lit: .4 }) + pyrP(260, 470, 160, { tip: 1, id: 'su2', lit: .4 }) + `<rect x="-300" y="460" width="1880" height="400" fill="#4a3020"/>` + nileP(500, 620, t, { col: '#5a4a58', glint: [880, 200], n: 30 });
  for (let i = 0; i < 6; i++) s += palmR(60 + i * 230, 630, 120 + (i % 2) * 40, t, '#1a1014', '#1a1014');
  return s + `<rect x="-20" y="-20" width="1320" height="760" fill="#2a1020" opacity="${(u * .3).toFixed(2)}"/>` + grain(.1); }
// ======== chapter 7: evening ========
function sceneEvening(t) { noW(); const a = CS(7), T = t - a;
  let s = PHDF() + skyP('skE', ['#1e2450', '#8a4a5a', '#e08a5a'], { hz: 430, sun: [1100, 440, .8, 26, '#ffc890'] }) + dunesBack(420, '#6a4a40') + pyrP(1000, 440, 300, { k: .86, id: 'ev', lit: .3 });
  s += `<rect x="-300" y="430" width="1880" height="400" fill="#7a5a40"/>` + houseP(-40, 600, 360, 170, { seed: 71, door: .6 }) + houseP(760, 590, 320, 150, { seed: 73, door: .3 }) + houseP(1100, 600, 260, 170, { seed: 75, door: .4 });
  s += `<rect x="-300" y="430" width="1880" height="400" fill="#1a0e20" opacity=".25"/>`;
  s += fireP(500, 640, t, .9) + `<path d="M440,600 H560" stroke="#3a2412" stroke-width="3"/>` + fishP(470, 596, .6) + fishP(530, 598, .6) + smokeP(500, 590, t, 300, .45);
  s += crowdP(-100, 600, 640, .4, T, 5, 3, 14) + egy(620, 690, { s: .6, f: -1, kind: 'w', i: 2, h: { hipY: -80, lF: [.1, -1.5], lB: [0, -1.55], noShadow: 1, hF: [560, 610], lean: 10 }, dl: 70 });
  s += `<circle cx="500" cy="620" r="260" fill="#ff9a3a" opacity=".12" filter="url(#phSm)"/>`;
  return camMv(s, t, a, S0(68), [1.0, 640, 380], [1.06, 560, 440]) + grain(.1); }
chip('سمكٌ مشويّ • بصل • خبزٌ ساخن', 640, 180, '', WS(67, 5), S0(68) - .3);
// ---------- 68: senet, a 30-square board game ----------
function senetP(x, y, s, t) { let g = `<g transform="translate(${x},${y}) scale(${s})"><rect x="-210" y="-70" width="420" height="140" rx="8" fill="url(#phWood)"/><rect x="-200" y="-62" width="400" height="124" fill="#e2cc96"/>`;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) g += `<rect x="${-200 + c * 40}" y="${-62 + r * 41.3}" width="40" height="41.3" fill="none" stroke="#5a3a1c" stroke-width="2"/>`;
  g += [[1, 0], [3, 0], [5, 1], [8, 2]].map(([c, r]) => `<path d="M${-180 + c * 40},${-26 + r * 41.3} l-10,0 l10,-26 l10,26Z" fill="#1e140c"/>`).join('') + [[2, 1], [6, 0], [9, 1]].map(([c, r]) => `<rect x="${-190 + c * 40}" y="${-52 + r * 41.3}" width="20" height="24" rx="5" fill="#f4eee0" stroke="#5a3a1c"/>`).join('');
  g += hg('ankh', 145, -55, .7, '#9a2a1a') + hg('water', 145, 30, .7, '#2a5a7a');
  return g + `</g>`; }
function sceneSenet(t) { noW(); const a = S0(68) - .2, z = ease(ramp(t, WS(68, 4), WS(68, 9))), c = ease(ramp(t, WS(68, 7), WS(68, 9)));
  let s = PHDF() + skyP('skSn', ['#1e2450', '#7a4a5a', '#c87a5a'], { hz: 480 }) + dunesBack(470, '#6a4a40') + `<rect x="-300" y="500" width="1880" height="120" fill="#7a5a40"/>` + houseP(260, 600, 760, 300, { seed: 81, door: .45 }) + `<rect x="-300" y="580" width="1880" height="300" fill="#7a5a40"/><rect x="-300" y="430" width="1880" height="400" fill="#1a0e20" opacity=".2"/>`;
  s += senetP(640, 620, .5, t);
  s += egy(470, 668, { s: .7, f: 1, i: 1, sit: 1, h: { hipY: -18, lF: [1.45, -1.7], lB: [1.3, -1.6], noShadow: 1, hF: [536, 612], lookUp: -.4 } }) + egy(810, 668, { s: .7, f: -1, i: 4, sit: 1, h: { hipY: -18, lF: [1.45, -1.7], lB: [1.3, -1.6], noShadow: 1, hF: [744, 610], lookUp: -.4 } });
  s = camMv(s, t, a, S0(69), [1.0, 640, 400], [1.0 + 1.3 * z, 640, lerp(400, 620, z)]);
  s += `<g opacity="${c.toFixed(2)}">${darkP(470, 150, 340, 60)}${goldT(640, 190, '٣٠ مربّعاً', 1, 32)}</g>`;
  return s + grain(.1) + vign(.6); }
chip('لعبةُ «سِنِت»', 640, 660, '', WS(68, 11), S0(69) - .3);
// ---------- 69: sleeping on the roof under thousands of stars ----------
function sceneNightRoof(t) { noW(); const a = S0(69) - .2;
  let s = PHDF() + skyP('skNR', 'night', { hz: 560 }) + starsP(t, 1, 540, { mw: .6, mwy: 220 });
  s += pyrP(1040, 520, 300, { k: .86, id: 'nr', lit: .2 }) + `<rect x="-300" y="510" width="1880" height="400" fill="#2a2030"/>` + houseP(-40, 560, 300, 80, { seed: 91, door: 0, col: '#3a2a24' }) + houseP(900, 560, 400, 90, { seed: 92, door: 0, col: '#3a2a24' });
  s += `<rect x="-300" y="600" width="1880" height="200" fill="#4a3428"/><rect x="-300" y="600" width="1880" height="200" fill="url(#phBrick)" opacity=".5"/><rect x="-300" y="588" width="1880" height="16" fill="#5a4232"/>`;
  s += `<rect x="380" y="566" width="420" height="26" rx="6" fill="#6a5a3a"/>` + egy(460, 576, { s: .6, f: 1, kind: 'you', h: { rot: -90, pv: -60, noShadow: 1, lookUp: 1, lF: [0, 0], lB: [0, 0] } });
  s += `<rect x="-20" y="-20" width="1320" height="760" fill="#0a1030" opacity=".25"/>`;
  return camMv(s, t, a, S0(70), [1.0, 640, 400], [1.08, 640, 330]) + grain(.08); }
chip('لا ضوءٌ صناعيّ', 400, 650, 'dark', WS(69, 3), S0(70) - .3); chip('النجومُ بالآلاف', 880, 650, 'dark', WS(69, 8), S0(70) - .3);
// ---------- 70: late at night Sirius rises ----------
function sceneSiriusNight(t) { noW(); const a = S0(70) - .2, rise = ease(ramp(t, a, WS(70, 4))), lab = ease(ramp(t, WS(70, 4), WS(70, 5)));
  const six = 700, siy = lerp(520, 330, rise);
  let s = PHDF() + skyP('skSN', ['#03060f', '#0a1230', '#1e2a50'], { hz: 560 }) + starsP(t, 1, 540, { sir: [six, siy, 1], ori: [six - 210, siy - 150, 1], mw: .3 });
  s += `<g opacity="${lab.toFixed(2)}">${txt(six + 34, siy + 10, 'الشِّعْرى', 1, '#f4c76b', 34, 'end')}</g>`;
  s += `<path d="M-300,560 Q100,540 400,556 T900,548 T1580,560 V900 H-300Z" fill="#0a070c"/>` + [[150, 560, 160], [1120, 556, 150]].map(([x, y, h]) => palmR(x, y, h, t, '#06040a', '#06040a')).join('');
  return s + grain(.08); }
chip('نجمُ فيضانِ النيل', 640, 650, '', WS(70, 6), S0(71) - .3);
// ---------- 71-72: life is hard: average life about 30, because many children do not grow up ----------
function sceneLife(t) { noW(); const a = S0(71) - .2, k = ease(ramp(t, S0(71) + .3, WS(71, 11))), c = ease(ramp(t, WS(71, 13), WS(71, 18))), q = ease(ramp(t, S0(72), WS(72, 6)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  s += `<g opacity="${(k * (1 - q * .85)).toFixed(2)}">${darkP(140, 180, 400, 260)}${txt(340, 250, 'متوسّطُ العمر', 1, '#fff', 30)}${txt(340, 350, 'نحوَ ٣٠ سنة', 1, '#f4c76b', 60)}</g>`;
  // children: many do not grow up (faded icons)
  let g = ''; for (let i = 0; i < 10; i++) { const x = 650 + i * 52, gone = i % 2 === 0 || i === 7, al = gone ? lerp(1, .18, c) : 1; g += `<g transform="translate(${x},330)" opacity="${al.toFixed(2)}"><circle cx="0" cy="-16" r="8" fill="#cfd4e0"/><path d="M-8,-6 Q0,-9 8,-6 L9,16 H-9Z" fill="#cfd4e0"/></g>`; }
  s += `<g opacity="${(c * (1 - q * .85)).toFixed(2)}">${darkP(610, 220, 560, 200)}${g}${txt(890, 400, 'كثيرٌ من الأطفالِ لا يكبرون', 1, '#ff9a7a', 26)}</g>`;
  // adults who survive childhood: 40, 50, or more
  if (q > 0) { let h = ''; [[40, '#cfd4e0'], [50, '#f4c76b'], [60, '#7ae08a']].forEach(([y, col], i) => { const w = 560 * (y / 70) * q; h += `<rect x="360" y="${470 + i * 60}" width="${w.toFixed(1)}" height="40" rx="10" fill="${col}" opacity=".85"/>` + txt(340, 500 + i * 60, i === 2 ? 'أو أكثر' : `${AR(y)} سنة`, 1, '#fff', 26, 'start'); });
    s += `<g opacity="${q.toFixed(2)}">${darkP(130, 440, 1020, 230)}${h}${txt(1120, 470 + 20, 'مَن يتجاوزُ طفولتَه', 1, '#fff', 24, 'start')}</g>`; }
  return s + grain(.06); }
chip('الحياةُ هنا قاسية', 640, 150, 'red', WS(71, 4), S0(72) - .3);
// ======== ending: the secret ========
function sceneSecret2(t) { noW(); const a = CS(8), q = ease(ramp(t, WS(73, 1), WS(73, 2) + .4));
  let s = PHDF() + skyP('skS3', 'dawn', { hz: 520, sun: [200, 500, 1, 28, '#fff0c8'] }) + dunesBack(500, '#c8a070') + pyrP(700, 540, 640, { tip: 1, id: 's3', lit: .8 }) + desertP(540, { col: '#c8a070' });
  s = camMv(s, t, a, S0(74), [1.0, 640, 380], [1.08, 700, 340]);
  s += `<g opacity="${q.toFixed(2)}"><circle cx="700" cy="160" r="120" fill="url(#phGlow)" opacity=".7"/></g>`;
  return s + grain(.08); }
chip('السرّ', 640, 640, 'big', WS(73, 1), S0(74) - .3);
// ---------- 74: the tallest building on Earth for about 3,800 years ----------
function sceneTallest(t) { noW(); const a = S0(74) - .2, k = ease(ramp(t, WS(74, 5), WS(74, 15))), c = ease(ramp(t, WS(74, 15), WS(74, 17)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  const x0 = 200, x1 = 1060, y = 560; s += `<path d="M${x0},${y} H${x1}" stroke="#3a3e4a" stroke-width="10" stroke-linecap="round"/><path d="M${x0},${y} H${lerp(x0, x1, k).toFixed(1)}" stroke="#f4c76b" stroke-width="10" stroke-linecap="round"/>`;
  s += pyrP(x0, y - 20, 240, { tip: 1, id: 'tl' }) + txt(x0, y + 50, 'نحوَ ٢٥٦٠ ق.م', 1, '#fff', 22) + `<path d="M${x0 - 30},${y - 200} l12,-22 l18,14 l18,-14 l12,22Z" fill="#f4c76b" opacity="${(1 - c * .7).toFixed(2)}"/>`;
  s += `<g opacity="${c.toFixed(2)}"><path d="M${x1 - 70},${y - 20} V${y - 150} H${x1 - 20} V${y - 280} L${x1},${y - 340} L${x1 + 20},${y - 280} V${y - 150} H${x1 + 70} V${y - 20}Z" fill="#8a8e9a"/><path d="M${x1 - 10},${y - 120} q10,-20 20,0 v40 h-20Z" fill="#2a2e3a"/>${txt(x1, y + 50, 'سنة ١٣١١م', 1, '#fff', 22)}${txt(x1, y - 360, 'كاتدرائيةُ لينكولن', 1, '#cfd4e0', 22)}</g>`;
  s += `<g opacity="${k.toFixed(2)}">${txt((x0 + x1) / 2, y - 40, `${fmtN(Math.round(3800 * k))} سنة`, 1, '#f4c76b', 46)}</g>`;
  return s + grain(.06); }
chip('أطولُ بناءٍ صنعَه الإنسان', 640, 150, '', WS(74, 7), S0(75) - .3);
// ---------- 75: Cleopatra lived closer to the Moon landing than to the pyramid ----------
function lmP(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,-10 L-44,20 M30,-10 L44,20 M-20,-10 L-26,20 M20,-10 L26,20" stroke="#c8c8d0" stroke-width="3"/><rect x="-32" y="-30" width="64" height="24" fill="#d8b040"/><path d="M-22,-30 L-18,-62 H18 L22,-30Z" fill="#d8d8e0"/><rect x="-8" y="-54" width="16" height="12" fill="#2a2e3a"/><path d="M-54,20 h20 M34,20 h20" stroke="#c8c8d0" stroke-width="3"/></g>`; }
function cleoP(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-30,40 Q-34,-10 -20,-30 Q0,-44 20,-30 Q34,-10 30,40Z" fill="#100c0a"/><ellipse cx="2" cy="-6" rx="18" ry="24" fill="#b47a52"/><path d="M-22,-26 Q2,-46 26,-26" stroke="#d8b040" stroke-width="6" fill="none"/><path d="M2,-46 q-6,-10 0,-16 q6,6 0,16Z" fill="#d8b040"/><path d="M8,-10 q6,-2 10,0" stroke="#0a0806" stroke-width="2.4" fill="none"/><path d="M-30,40 Q0,30 30,40 L34,60 H-34Z" fill="#efe8d8"/><path d="M-24,40 Q0,52 24,40" stroke="#2a6aa8" stroke-width="5" fill="none"/></g>`; }
function sceneCleo(t) { noW(); const a = S0(75) - .2, k1 = ease(ramp(t, WS(75, 4), WS(75, 8))), k2 = ease(ramp(t, WS(75, 13), WS(75, 18))), k3 = ease(ramp(t, WS(75, 19), WS(75, 23)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  const X = yr => lerp(160, 1120, (yr + 2560) / 4530), y = 470;  // -2560 .. 1970
  s += `<path d="M${X(-2560)},${y} H${X(1970)}" stroke="#3a3e4a" stroke-width="8" stroke-linecap="round"/>`;
  s += pyrP(X(-2560), y - 24, 120, { tip: 1, id: 'cl' }) + txt(X(-2560), y + 50, 'بناءُ الهرم', 1, '#fff', 22) + txt(X(-2560), y + 78, 'نحوَ ٢٥٦٠ ق.م', 1, 'rgba(255,255,255,.65)', 18);
  s += `<g opacity="${k1.toFixed(2)}">${cleoP(X(-30), y - 80, 1.4)}${txt(X(-30), y + 50, 'كليوباترا', 1, '#f4c76b', 24)}${txt(X(-30), y + 78, 'نحوَ ٣٠ ق.م', 1, 'rgba(255,255,255,.65)', 18)}</g>`;
  s += `<g opacity="${k2.toFixed(2)}">${lmP(X(1969), y - 50, 1.1)}${txt(X(1969), y + 50, 'الهبوطُ على القمر', 1, '#fff', 22)}${txt(X(1969), y + 78, '١٩٦٩م', 1, 'rgba(255,255,255,.65)', 18)}</g>`;
  // brackets
  s += `<g opacity="${(k3).toFixed(2)}"><path d="M${X(-2560)},${y - 170} V${y - 190} H${X(-30)} V${y - 170}" stroke="#ff9a7a" stroke-width="4" fill="none"/>${txt((X(-2560) + X(-30)) / 2, y - 205, 'نحوَ ٢٥٠٠ سنة', 1, '#ff9a7a', 32)}` +
    `<path d="M${X(-30)},${y - 170} V${y - 190} H${X(1969)} V${y - 170}" stroke="#7ae08a" stroke-width="4" fill="none"/>${txt((X(-30) + X(1969)) / 2, y - 205, 'نحوَ ٢٠٠٠ سنة', 1, '#7ae08a', 32)}</g>`;
  return s + grain(.06); }
// ---------- 76: even the pharaohs saw it as an ancient monument ----------
function sceneOldEven(t) { noW(); const a = S0(76) - .2;
  let s = PHDF() + skyP('skOE', 'day', { hz: 520, sun: [1120, 200, 1, 24] }) + dunesBack(500, '#d8b47e') + pyrP(700, 540, 560, { old: .0, tip: 1, id: 'oe' }) + desertP(540, { seed: 33 }) + `<rect x="-300" y="300" width="1880" height="300" fill="#e8d2a8" opacity=".12"/>`;
  // a later king with a blue crown and attendants, looking up at it
  const crown = L => `<path d="M${L.hx - 22},${L.hy - 4} Q${L.hx - 30},${L.hy - 60} ${L.hx + 4},${L.hy - 66} Q${L.hx + 34},${L.hy - 60} ${L.hx + 22},${L.hy - 6}Z" fill="#2a4a9a"/><path d="M${L.hx + 18},${L.hy - 30} q10,-4 8,8" stroke="#d8b040" stroke-width="4" fill="none"/>` + Array.from({ length: 8 }, (_, i) => `<circle cx="${L.hx - 14 + (i % 4) * 8}" cy="${L.hy - 24 - Math.floor(i / 4) * 14}" r="2" fill="#d8b040"/>`).join('');
  s += egy(260, 690, { s: .8, f: 1, kind: 'rich', i: 0, h: { lookUp: .8 }, end: crown }) + egy(160, 696, { s: .7, f: 1, kind: 'm', i: 3, h: { lookUp: .6 } }) + egy(360, 700, { s: .7, f: 1, kind: 'w', i: 5, h: { lookUp: .7 } });
  return camMv(s, t, a, S0(77), [1.0, 640, 380], [1.05, 600, 360]) + grain(.08); }
chip('أثرٌ قديمٌ حتى عندَ الفراعنة', 640, 180, '', WS(76, 2), S0(77) - .3);
// ---------- 77: would you survive? ----------
function sceneSurvive(t) { noW(); const a = S0(77) - .2, q = ease(ramp(t, WS(77, 5), WS(77, 7)));
  let s = PHDF() + roofs(t, 1, { sky: 'dusk', sun: [1000, 440, 1, 28, '#ffd890'] });
  s = camMv(s, t, a, S0(78), [1.0, 640, 380], [1.12, 560, 420]);
  s += `<g opacity="${q.toFixed(2)}"><text x="980" y="380" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="220" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>`;
  return s + grain(.1); }
chip('هل كنتَ ستنجو؟', 640, 650, 'big', WS(77, 5), S0(78) - .3);
// ---------- 78-79: comments, next era, subscribe ----------
function sceneEnd(t) { const a = S0(78) - .2, b = Math.abs(Math.sin(t * 3)) * 6, G = gEg(t, { d: 6.2, el: .45, az: .3 + t * .01, lon: 31, clouds: .3, tg: [0, .22, 0] }), p = G.P(29.98, 31.13, 1.004), q = ease(ramp(t, a, a + .6));
  F.ov = pinP(p[0], p[1], 'مصر', q, 26) + `<g opacity="${ramp(t, WS(79, 0), WS(79, 0) + .4).toFixed(2)}" transform="translate(250,${420 - b})"><rect x="-140" y="-42" width="280" height="84" rx="20" fill="#e53935"/><text x="0" y="16" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="42" fill="#fff">اشترك</text></g>` +
    `<g opacity="${q.toFixed(2)}"><text x="1030" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="230" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>`;
  return spaceW(t, { mw: .3, mwy: 620, mwa: -5 }); }
chip('اكتبْ جوابَك في التعليقات', 640, 150, '', WS(78, 0), 999); chip('أيُّ زمنٍ نزورُ في الفيديو القادم؟', 640, 650, 'dark', WS(78, 4), 999); chip('@MadhaLawLab', 250, 520, 'dark', WS(79, 0), 999);
