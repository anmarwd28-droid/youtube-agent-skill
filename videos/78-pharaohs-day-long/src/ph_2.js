// ===================== chapter 2: the Nile =====================
// the river seen from the near bank: far bank with palms and the plateau, water, near bank with papyrus
function nileView(t, o = {}) { const wy = o.wy ?? 430, ny = o.ny ?? 600;
  let s = skyP('skN' + (o.id || ''), o.sky || 'day', { sun: o.sun || [1060, 220, 1, 26], hz: wy }) + dunesBack(wy - 40, '#dcbc88', .9);
  if (o.pyr !== 0) s += pyrP(o.px ?? 980, wy - 18, o.pw ?? 150, { k: .84, id: 'nv' + (o.id || '') });
  s += `<rect x="-300" y="${wy - 22}" width="1880" height="26" fill="#7a9a4a"/>`;
  for (let i = 0; i < 12; i++) s += palmP(-120 + i * 130 + (i % 3) * 20, wy - 2, 70 + (i * 37) % 40, t);
  s += nileP(wy, ny, t, { glint: [900, 300] });
  (o.boats || []).forEach(b => { s += boatP(b[0] + (b[4] || 0) * t, b[1], b[2], b[3], t, b[5] || {}); });
  s += `<path d="M-300,${ny} Q200,${ny - 14} 640,${ny + 4} T1580,${ny - 6} V900 H-300Z" fill="#8a9a4a"/><path d="M-300,${ny + 30} Q300,${ny + 20} 700,${ny + 34} T1580,${ny + 26} V900 H-300Z" fill="#6f8a3c"/><rect x="-300" y="${ny}" width="1880" height="300" fill="#000" filter="url(#phSandT)" opacity=".18"/>`;
  s += papyrusP(80, ny + 20, 9, 3, t, 150) + papyrusP(1180, ny + 24, 10, 8, t, 170);
  return s; }
// ---------- 14: the Nile is everything ----------
function sceneNileWide(t) { noW(); const a = CS(2), T = t - a;
  let s = PHDF() + nileView(t, { boats: [[300, 520, .55, 1, 8, { sail: 1 }], [760, 470, .32, -1, -5, { sail: 1 }], [1050, 560, .5, -1, -6, { rowers: 4 }]] });
  s += egy(200 + T * 22, 676, { s: .62, f: 1, kind: 'you', h: { walk: T * 2.6, amp: .5 } }) + egy(900, 690, { s: .6, f: -1, kind: 'w', i: 3, h: { hF: [880, 560], hB: [872, 600] } }) + `<g transform="translate(884,560)">${jarP(0, 0, .42)}</g>`;
  return camMv(s, t, a, S0(15), [1.0, 640, 360], [1.07, 640, 400]) + grain(.1); }
chip('الماء', 400, 230, '', WS(14, 8), S0(15) - .3); chip('الطعام', 640, 230, '', WS(14, 9), S0(15) - .3); chip('الطريق', 880, 230, '', WS(14, 10), S0(15) - .3);
// ---------- 15: the flood covers the fields ----------
function sceneFlood(t) { noW(); const a = S0(15) - .2, fl = ease(ramp(t, WS(15, 5), WS(15, 9) + .4)), T = t - a;
  let s = PHDF() + skyP('skF', 'day', { sun: [200, 200, 1, 26], hz: 380 }) + dunesBack(350, '#dcbc88') + `<rect x="-300" y="350" width="1880" height="40" fill="#c8a870"/>` + nileP(380, 420, t, { n: 14 });
  // fields in strips with canals; villages on mounds
  s += `<rect x="-300" y="420" width="1880" height="400" fill="#6f8f3c"/>`;
  for (let r = 0; r < 7; r++) { const y = 430 + r * 44 + r * r * 3; s += `<path d="M-300,${y} H1580" stroke="#5a7a2e" stroke-width="${2 + r}"/>`; for (let i = 0; i < 26; i++) { const x = -260 + i * 72 + (r % 2) * 36; s += `<path d="M${x},${y + 30 + r * 3} q3,-${10 + r * 2} 1,-${16 + r * 3} M${x + 8},${y + 30 + r * 3} q-3,-${9 + r * 2} 0,-${14 + r * 3}" stroke="#4a6a24" stroke-width="${1.6 + r * .3}" fill="none"/>`; } }
  const mound = (x, y, w, sd) => `<ellipse cx="${x + w / 2}" cy="${y + 6}" rx="${w * .7}" ry="16" fill="#a88a5a"/>` + houseP(x, y, w * .45, 46, { seed: sd, door: .3 }) + houseP(x + w * .5, y + 2, w * .4, 38, { seed: sd + 1, door: 0 }) + palmP(x + w * .95, y + 4, 90, t);
  const water = `<rect x="-300" y="${(820 - fl * 400).toFixed(1)}" width="1880" height="${(fl * 400 + 10).toFixed(1)}" fill="#5f7f78" opacity=".93"/><rect x="-300" y="${(820 - fl * 400).toFixed(1)}" width="1880" height="${(fl * 400).toFixed(1)}" fill="#8a6a44" opacity=".25"/>`;
  s += water + nileP(820 - fl * 400, 820, t, { n: Math.round(40 * fl), col: 'none', seed: 5, flow: .4 });
  s += mound(240, 520, 220, 21) + mound(820, 560, 260, 23) + mound(-60, 640, 200, 25);
  s += `<g opacity="${fl.toFixed(2)}">${boatP(560 + T * 6, 640, .34, 1, t, { rowers: 3 })}</g>`;
  return camMv(s, t, a, S0(16), [1.04, 640, 380], [1.0, 640, 360]) + grain(.1); }
chip('الفيضان', 640, 640, 'big', WS(15, 6), S0(16) - .3);
// ---------- 16-17: Sirius, the star of the flood ----------
function sceneSirius(t) { noW(); const a = S0(16) - .2, lab = ease(ramp(t, WS(16, 7), WS(16, 7) + .5)), dawn = ease(ramp(t, S0(17), WS(17, 4))), rise = ease(ramp(t, S0(17) - .4, WS(17, 3)));
  const sk = [mix('#03060f', '#1a2450', dawn * .6), mix('#0a1230', '#4a4a7a', dawn), mix('#16224a', '#e8a070', dawn)];
  const six = 760, siy = lerp(470, 300, rise);
  let s = PHDF() + skyP('skS2', sk, { hz: 560 }) + starsP(t, 1 - dawn * .5, 540, { sir: [six, siy, 1], ori: [six - 210, siy - 150, 1 - dawn * .3], mw: .25 });
  s += `<path d="M${six - 166},${siy - 166} L${six - 12},${siy - 10}" stroke="#f4c76b" stroke-width="1.6" stroke-dasharray="5 7" opacity="${(lab * .7).toFixed(2)}"/>`;
  s += `<g opacity="${lab.toFixed(2)}">${txt(six + 34, siy + 10, 'الشِّعْرى', 1, '#f4c76b', 32, 'end')}${txt(six - 150, siy - 150, 'حزامُ الجبّار', 1, 'rgba(255,255,255,.75)', 20, 'end')}</g>`;
  s += `<ellipse cx="760" cy="580" rx="700" ry="${(60 + 80 * dawn).toFixed(0)}" fill="#ffb070" opacity="${(dawn * .45).toFixed(2)}" filter="url(#phSm)"/>`;
  s += `<path d="M-300,560 Q100,540 400,556 T900,548 T1580,560 V900 H-300Z" fill="#120c14"/>` + [[120, 560, 170], [210, 562, 140], [1100, 556, 160], [1180, 560, 120]].map(([x, y, h]) => palmR(x, y, h, t, '#0c080c', '#0c080c')).join('') + `<path d="M480,556 L560,500 L640,556Z" fill="#0c080c"/>`;
  s += `<g opacity="${(dawn).toFixed(2)}">${txt(1040, 600, 'قبلَ الفجر', 1, '#ffd8a0', 26)}</g>`;
  return s + grain(.08); }
chip('ألمعُ نجمٍ في السماء', 640, 650, '', WS(16, 8), S0(17) - .3); chip('الماءُ قادم', 640, 650, '', WS(17, 7), S0(18) - .3);
// ---------- 18: the 365-day calendar ----------
function sceneCalendar(t) { noW(); const a = S0(18) - .2, n = Math.round(365 * ease(ramp(t, WS(18, 2), WS(18, 20) + .4))), ex = ease(ramp(t, WS(18, 17), WS(18, 17) + .5));
  let s = PHDF(TMDEF) + `<rect x="-20" y="-20" width="1320" height="760" fill="#1a1410"/><rect x="-20" y="-20" width="1320" height="760" fill="url(#phBrick)" opacity=".25"/>`;
  s += `<g transform="translate(300,170) scale(1.7)">${calPanel(0, 0, 1, n)}</g>`;
  for (let m = 0; m < 12; m++) s += txt(300 + (380 - m * 31) * 1.7, 160, AR(m + 1), ramp(t, WS(18, 9), WS(18, 11)), '#f4c76b', 18);
  s += `<g opacity="${ex.toFixed(2)}"><rect x="${300 + 22 * 1.7}" y="${170 + 270 * 1.7}" width="${100 * 1.7}" height="${24 * 1.7}" rx="10" fill="none" stroke="#f4c76b" stroke-width="3"/></g>`;
  s += darkP(1000, 300, 220, 120) + txt(1110, 362, fmtN(n), 1, '#f4c76b', 50) + txt(1110, 400, 'يوماً', 1, '#fff', 24);
  return s + grain(.1); }
chip('١٢ شهراً × ٣٠ يوماً', 640, 140, '', WS(18, 9), S0(19) - .3); chip('+ ٥ أيامٍ للأعياد', 1110, 520, '', WS(18, 17), S0(19) - .3);
// ---------- 19-20: danger in the water: crocodiles, and the hippo ----------
function sceneDanger(t) { noW(); const a = S0(19) - .2, T = t - a, back = ease(ramp(t, WS(19, 2), WS(19, 4))), cr = ramp(t, a, WS(20, 6)), hp = ease(ramp(t, WS(20, 7), WS(20, 9))), op = ease(ramp(t, WS(20, 15), WS(20, 16))) * (.6 + .4 * Math.sin(t * 3));
  let s = PHDF() + skyP('skW', 'day', { hz: 230, sun: [1100, 120, 1, 22] }) + `<rect x="-300" y="200" width="1880" height="34" fill="#7a9a4a"/>` + nileP(230, 760, t, { n: 70, glint: [900, 400] });
  s += crocP(lerp(1200, 520, cr), 420, .9, -1, t);
  if (hp > 0) s += `<g transform="translate(0,${((1 - hp) * 70).toFixed(1)})" opacity="${hp.toFixed(2)}">${hippoP(820, 600, .95, -1, t, op)}</g><path d="M600,640 Q820,${(660 - 30 * hp).toFixed(0)} 1040,640" stroke="#e8f4f8" stroke-width="4" fill="none" opacity="${(hp * .6).toFixed(2)}"/>`;
  s += `<g opacity="${(hp * .9).toFixed(2)}">${boatP(380 + Math.sin(t * 4) * 6 * op, 640, .4, 1, t, { rowers: 2 })}</g>`;
  // the near bank with you stepping back
  s += `<path d="M-300,700 Q0,660 260,690 L240,900 H-300Z" fill="#6f8a3c"/>` + papyrusP(40, 700, 6, 13, t, 160) + egy(lerp(270, 180, back), 712, { s: .6, f: 1, kind: 'you', h: { lean: -6 * back, aF: [-.5 * back + .1, -.2], walk: back < 1 && back > 0 ? T * 3 : null } });
  return camMv(s, t, a, S0(21), [1.0, 640, 360], [1.05, 700, 400]) + grain(.1); }
chip('تماسيح', 520, 330, 'red', WS(20, 1), S0(21) - .3); chip('فرسُ النهر: أكثرُ من طنٍّ ونصف', 820, 180, 'red', WS(20, 11), S0(21) - .3);
// ---------- 21: boats loaded with huge white stones ----------
function sceneCargo(t) { noW(); const a = S0(21) - .2, T = t - a;
  let s = PHDF() + nileView(t, { id: 'c', wy: 380, ny: 640, pw: 120, boats: [[120 + T * 10, 470, .5, 1, 0, { cargo: 1, rowers: 4 }], [900 + T * 8, 420, .34, 1, 0, { cargo: 1, sail: 1 }], [560 + T * 12, 590, .95, 1, 0, { cargo: 1, rowers: 5 }]] });
  return camMv(s, t, a, S0(22), [1.0, 640, 380], [1.06, 700, 420]) + grain(.1); }
chip('حجارةٌ بيضاءُ ضخمة', 640, 170, '', WS(21, 4), S0(22) - .3);
// ---------- 22: Merer's diary on papyrus ----------
function sceneDiary(t) { noW(); const a = S0(22) - .2, k = ease(ramp(t, a + .2, S0(23))), nm = ease(ramp(t, WS(22, 6), WS(22, 7)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#20160e"/><ellipse cx="640" cy="400" rx="620" ry="300" fill="#4a3424" opacity=".6" filter="url(#phSm)"/>`;
  s += `<g transform="translate(0,0)">${papyrusSheet(190, 180, 900, 420, k, { red: 1, seed: 22, lh: 30 })}</g><rect x="176" y="170" width="28" height="440" rx="12" fill="#c8ac74"/><rect x="1076" y="170" width="28" height="440" rx="12" fill="#c8ac74"/>`;
  s += `<g opacity="${nm.toFixed(2)}">${darkP(470, 610, 340, 70)}${goldT(640, 658, 'يومياتُ «مِرِر»', 1, 36)}</g>`;
  // the boat captain writing at the edge
  return camMv(s, t, a, S0(23), [1.0, 640, 380], [1.06, 640, 400]) + grain(.1) + vign(.7); }
chip('على ورقِ البَرْدي', 640, 150, '', WS(22, 10), S0(23) - .3);
// ---------- 23: the route: Tura quarry -> across the Nile and canals -> Giza ----------
function sceneMap(t) { noW(); const a = S0(23) - .2, k = ease(ramp(t, WS(23, 6), WS(23, 14) + .3)), l1 = ramp(t, WS(23, 8), WS(23, 8) + .4), l2 = ramp(t, WS(23, 14), WS(23, 14) + .4);
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#2a2016"/>` + `<rect x="150" y="150" width="980" height="540" rx="14" fill="url(#phPap)"/><rect x="150" y="150" width="980" height="540" fill="#000" filter="url(#phPaperT)" opacity=".3"/>`;
  // desert (yellow) both sides, green strip, the Nile flowing north (up)
  s += `<path d="M560,150 C580,300 540,420 600,560 C630,630 620,690 620,690 H760 C760,690 770,620 740,560 C690,420 720,300 700,150Z" fill="#9ab060" opacity=".75"/>` +
    `<path d="M640,150 C660,300 610,420 664,560 C686,630 690,690 690,690" stroke="#3f7186" stroke-width="22" fill="none"/>`;
  s += `<path d="M380,240 l60,-30 l40,40 l-60,30Z" fill="#c8a468"/>` + pyrP(330, 300, 70, { id: 'mp1' }) + pyrP(410, 312, 56, { id: 'mp2' }) + txt(380, 352, 'الجيزة', 1, '#3a2410', 30);
  s += `<path d="M880,540 l50,0 l20,-26 l-60,-14Z" fill="#e8e2d2"/><rect x="842" y="500" width="120" height="60" fill="none" stroke="#5a3a1c" stroke-width="2" stroke-dasharray="6 5"/>` + txt(902, 600, 'مقالعُ طُرّة', 1, '#3a2410', 28) + txt(650, 470, 'النيل', 1, '#1a3a4a', 24);
  // the canal to the plateau and the boat route
  s += `<path d="M640,320 C560,320 500,300 450,290" stroke="#3f7186" stroke-width="10" fill="none"/>` + txt(530, 284, 'قناة', 1, '#1a3a4a', 20);
  const path = [[880, 520], [700, 500], [660, 420], [640, 330], [520, 312], [450, 294]], seg = (() => { let L = [0]; for (let i = 1; i < path.length; i++) L.push(L[i - 1] + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1])); return L; })();
  const tot = seg[seg.length - 1], d = k * tot; let j = 1; while (j < path.length - 1 && seg[j] < d) j++; const u = (d - seg[j - 1]) / (seg[j] - seg[j - 1]), bx = lerp(path[j - 1][0], path[j][0], clamp(u)), by = lerp(path[j - 1][1], path[j][1], clamp(u));
  s += `<path d="M${path.map(p => p.join(',')).join(' L')}" stroke="#9a2a1a" stroke-width="4" stroke-dasharray="10 8" fill="none" opacity=".35"/><path d="M${path.map(p => p.join(',')).join(' L')}" stroke="#9a2a1a" stroke-width="5" fill="none" stroke-dasharray="${d.toFixed(1)} 2000"/>`;
  s += `<g transform="translate(${bx.toFixed(1)},${by.toFixed(1)}) scale(.16)">${boatP(0, 0, 1, -1, t, { cargo: 1 })}</g>`;
  s += `<path d="M1060,200 v-34 M1048,180 l12,-14 l12,14" stroke="#3a2410" stroke-width="3" fill="none"/>` + txt(1060, 222, 'شمال', 1, '#3a2410', 18);
  s += `<g opacity="${l1.toFixed(2)}">${txt(1000, 450, 'حجرٌ جيريٌّ أبيض', 1, '#3a2410', 22)}</g><g opacity="${l2.toFixed(2)}">${txt(300, 420, 'موقعُ البناء', 1, '#9a2a1a', 24)}</g>`;
  return s + grain(.08) + vign(.6); }
// ---------- 24: the oldest written papyri ever found ----------
function sceneOldest(t) { noW(); const a = S0(24) - .2, k = ease(ramp(t, WS(24, 2), WS(24, 4)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#0e1018"/><path d="M340,120 L940,120 L1100,760 L180,760Z" fill="#fff6d8" opacity=".05"/>`;
  s += `<rect x="300" y="200" width="680" height="340" rx="10" fill="#1a1c24" stroke="#3a3e4a" stroke-width="3"/><g transform="translate(340,230)"><path d="M0,0 L560,10 L590,140 L540,280 L20,270 L-10,150Z" fill="url(#phPap)"/><path d="M0,0 L560,10 L590,140 L540,280 L20,270 L-10,150Z" fill="#000" filter="url(#phPaperT)" opacity=".4"/></g>`;
  s += `<clipPath id="olC"><path d="M340,230 L900,240 L930,370 L880,510 L360,500 L330,380Z"/></clipPath><g clip-path="url(#olC)">${papyrusSheet(340, 230, 590, 280, 1, { seed: 31, lh: 26 })}</g>`;
  s += `<rect x="300" y="200" width="680" height="340" rx="10" fill="#cfe6ff" opacity=".06"/><path d="M320,210 L520,210 L420,530 L320,530Z" fill="#fff" opacity=".05"/>`;
  s += `<g opacity="${k.toFixed(2)}">${darkP(390, 570, 500, 70)}${goldT(640, 616, 'أقدمُ أوراقِ برديٍّ مكتوبة', 1, 32)}</g>`;
  return camMv(s, t, a, S0(25), [1.0, 640, 380], [1.05, 640, 380]) + grain(.08) + vign(.8); }
chip('حتى الآن', 640, 150, '', WS(24, 9), S0(25) - .3);
// ---------- 25: all the boats head to one place ----------
function sceneToward(t) { noW(); const a = S0(25) - .2, T = t - a;
  let s = PHDF() + nileView(t, { id: 't', wy: 380, ny: 660, px: 860, pw: 330, boats: [[200 + T * 14, 560, .7, 1, 0, { cargo: 1, rowers: 4 }], [520 + T * 10, 470, .42, 1, 0, { cargo: 1, sail: 1 }], [40 + T * 9, 440, .3, 1, 0, { cargo: 1, sail: 1 }]] });
  s += `<circle cx="860" cy="300" r="150" fill="url(#phGlow)" opacity="${(.4 + .2 * Math.sin(t * 2)).toFixed(2)}"/>`;
  return camMv(s, t, a, CS(3) + 1, [1.0, 640, 360], [1.25, 820, 320]) + grain(.1); }
