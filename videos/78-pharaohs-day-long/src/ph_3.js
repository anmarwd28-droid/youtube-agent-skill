// ===================== chapter 3: the pyramid =====================
// Khufu's name signs: placenta (kh), quail chick (w), horned viper (f)
HG.plac = `<circle cx="20" cy="20" r="14"/><path d="M8,14 H32 M6,20 H34 M8,26 H32" stroke="#f4e6c4" stroke-width="2.2" fill="none"/>`;
HG.chick = `<path d="M10,36 Q6,22 14,16 Q14,6 22,6 Q30,6 30,14 L36,16 L30,20 Q32,30 26,36Z"/><path d="M16,36 l-2,4 M24,36 l2,4" stroke-width="2"/>`;
HG.viper = `<path d="M2,32 Q10,24 20,28 Q30,32 34,22 Q36,14 30,12 L26,8 L28,14 Q24,16 26,22 Q22,28 12,24 Q4,22 2,32Z"/>`;
const KHUFU = ['plac', 'chick', 'viper', 'chick'];
// ---------- 26: the Great Pyramid of King Khufu ----------
function scenePyrBig(t) { noW(); const a = CS(3), q = ease(ramp(t, WS(26, 3), WS(26, 4) + .3));
  let s = PHDF() + siteP(t, { px: 640, pb: 600, pw: 980, k: .86, sun: [1120, 210, 1, 28] }) + dustP(t, .2);
  s = camMv(s, t, a, S0(27), [1.0, 640, 360], [1.1, 640, 330]);
  s += `<g opacity="${q.toFixed(2)}">${darkP(440, 520, 400, 150)}${cartP(500, 540, 260, 66, KHUFU, '#f4c76b')}${goldT(640, 650, 'خوفو', 1, 34)}</g>`;
  return s + grain(.1); }
chip('الهرمُ الأكبر', 640, 180, 'big', WS(26, 0), S0(27) - .3);
// ---------- 27: 146 metres, like a 45-storey tower ----------
function sceneHeight(t) { noW(); const a = S0(27) - .2, k = ease(ramp(t, WS(27, 1), WS(27, 4))), k2 = ease(ramp(t, WS(27, 6), WS(27, 9)));
  let s = PHDF() + skyP('skH2', 'day', { hz: 640, sun: [160, 220, 1, 24] }) + desertP(620, { ripples: 0 });
  const base = 620, H = 440;  // 146 m = 440 px
  s += pyrP(470, base, H / .636, { tip: 1, id: 'ht' });
  // the tower: 45 floors
  s += `<g opacity="${k2.toFixed(2)}"><rect x="930" y="${base - H}" width="130" height="${H}" fill="#7a96b4"/><rect x="1040" y="${base - H}" width="20" height="${H}" fill="#506a84"/>` + Array.from({ length: 45 }, (_, i) => `<path d="M930,${(base - H + i * H / 45).toFixed(1)} H1060" stroke="#cfe0ee" stroke-width="1.1" opacity=".7"/>`).join('') + Array.from({ length: 6 }, (_, i) => `<path d="M${944 + i * 20},${base - H} V${base}" stroke="#3a5470" stroke-width="1.4" opacity=".6"/>`).join('') + `<rect x="930" y="${base - H}" width="130" height="${H}" fill="url(#glsG)" opacity=".2"/></g>`;
  s += `<g opacity="${k.toFixed(2)}"><path d="M790,${base} V${(base - H * k).toFixed(1)} M776,${base} h28 M776,${(base - H * k).toFixed(1)} h28" stroke="#f4c76b" stroke-width="3"/>` + `<path d="M470,${base - H} H790" stroke="#f4c76b" stroke-width="1.5" stroke-dasharray="6 6"/>` + txt(800, base - H / 2, `${AR(Math.round(146 * k))} متراً`, 1, '#f4c76b', 34, 'end') + `</g>`;
  s += `<g opacity="${k2.toFixed(2)}">${txt(995, base + 50, '٤٥ طابقاً', 1, '#fff', 28)}</g>`;
  return s + grain(.08); }
// ---------- 28: 2.3 million stones, each over two tonnes ----------
function sceneBlocks(t) { noW(); const a = S0(28) - .2, n = ease(ramp(t, WS(28, 1), WS(28, 5))), w = ease(ramp(t, WS(28, 7), WS(28, 10)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  // a growing wall of tiny blocks
  const cols = 46, rows = 22, shown = Math.round(n * cols * rows); let g = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const i = r * cols + c; if (i >= shown) break; const x = 80 + c * 12.4 + (r % 2) * 6, y = 620 - r * 9.5; g += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="11.4" height="8.5" fill="${(i * 37) % 7 ? '#e8dfc8' : '#d4c8ac'}"/>`; }
  s += `<g opacity="${(1 - w * .75).toFixed(2)}">${g}</g>` + `<g opacity="${(1 - w).toFixed(2)}">${darkP(720, 300, 470, 150)}${txt(955, 380, fmtN(2300000 * n), 1, '#f4c76b', 64)}${txt(955, 425, 'حجر', 1, '#fff', 28)}</g>`;
  // one block against a car on a balance
  if (w > 0) { s += `<g opacity="${w.toFixed(2)}">${darkP(150, 200, 980, 450)}<path d="M640,560 L620,600 H660Z" fill="#8a8a92"/><path d="M380,${560 - 14} H900" stroke="#c8c8d0" stroke-width="8" transform="rotate(${(-4 * w).toFixed(1)},640,546)"/>` +
      `<g transform="rotate(${(-4 * w).toFixed(1)},640,546)">${blockP(320, 420, 150, 118, {})}${car(830, 540, .55, '#a83a2a', -1, 0)}</g>` + txt(400, 630, 'حجرٌ واحد: أكثرُ من طنَّين', 1, '#f4c76b', 26) + txt(860, 630, 'سيارة: نحوَ طنٍّ ونصف', 1, '#fff', 24) + `</g>`; }
  return s + grain(.08); }
// ---------- 29: not yellow: polished white limestone that shines ----------
function sceneCasing(t) { noW(); const a = S0(29) - .2, sp = ease(ramp(t, WS(29, 6), WS(29, 9))), gl = ease(ramp(t, WS(29, 12), WS(29, 14)));
  let L = skyP('skC1', 'day', { hz: 600, sun: [100, 230, 1, 20] }) + desertP(560, { ripples: 0 }) + pyrP(320, 560, 520, { old: 1, id: 'old' }), R = skyP('skC2', 'day', { hz: 600, sun: [1180, 230, 1, 20] }) + desertP(560, { ripples: 0 }) + pyrP(960, 560, 520, { tip: 1, id: 'new', lit: 1 + gl });
  let s = PHDF() + `<clipPath id="lC"><rect x="-20" y="-20" width="660" height="760"/></clipPath><clipPath id="rC"><rect x="640" y="-20" width="660" height="760"/></clipPath><g clip-path="url(#lC)">${L}</g><g clip-path="url(#rC)" opacity="${(.25 + .75 * sp).toFixed(2)}">${R}` +
    `<g opacity="${gl.toFixed(2)}"><circle cx="880" cy="330" r="${(130 + 20 * Math.sin(t * 3)).toFixed(1)}" fill="url(#phGlow)"/><path d="M880,250 V410 M800,330 H960" stroke="#fff" stroke-width="3"/></g></g>`;
  s += `<rect x="636" y="-20" width="8" height="760" fill="#0a0e1c"/>` + `<g>${darkP(230, 600, 180, 56)}${goldT(320, 637, 'اليوم', 1, 28, '#fff')}</g><g opacity="${sp.toFixed(2)}">${darkP(870, 600, 180, 56)}${goldT(960, 637, 'آنذاك', 1, 28)}</g>`;
  return s + grain(.08); }
chip('حجرٌ جيريٌّ أبيضُ مصقول', 960, 180, '', WS(29, 6), S0(30) - .3);
// ---------- 30: the common picture: slaves under whips? ----------
function sceneMyth(t) { noW(); const a = S0(30) - .2, T = t - a, q = ease(ramp(t, WS(30, 4), WS(30, 5)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#0c0a08"/>`;
  let g = `<rect x="0" y="0" width="900" height="420" fill="#c8a878"/><rect x="0" y="0" width="900" height="420" fill="#5a3a1a" filter="url(#phPaperT)" opacity=".5"/>`;
  for (let i = 0; i < 6; i++) g += `<g opacity=".85">${egy(120 + i * 90, 360, { s: .62, f: 1, i, skin: '#3a2414', lin: '#3a2414', h: { walk: T * 1.6 + i, amp: .3, lean: 26 } })}</g>`;
  g += egy(760, 360, { s: .7, f: -1, i: 2, skin: '#2a1a0c', lin: '#2a1a0c', h: { hF: [800, 160], lean: -4 } }) + `<path d="M800,160 Q860,100 900,150" stroke="#2a1a0c" stroke-width="4" fill="none"/>`;
  s += `<rect x="170" y="130" width="940" height="460" fill="#1a1410"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${186 + i * 66}" y="140" width="34" height="16" rx="3" fill="#3a3028"/><rect x="${186 + i * 66}" y="564" width="34" height="16" rx="3" fill="#3a3028"/>`).join('') + `<g transform="translate(190,165)">${g}</g>` + `<rect x="190" y="165" width="900" height="420" fill="#000" opacity="${(.2 + .05 * Math.sin(T * 20)).toFixed(2)}"/>`;
  s += `<g opacity="${q.toFixed(2)}"><text x="640" y="470" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="300" fill="#e04040" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>`;
  return s + grain(.15) + vign(.9); }
chip('الصورةُ الشائعة', 640, 640, 'dark', WS(30, 1), S0(31) - .3);
// ---------- 31: paid workers: bread, beer and meat ----------
function meatP(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,-10 Q-44,-40 -10,-44 Q30,-46 40,-20 Q44,0 20,6 Q-30,10 -40,-10Z" fill="#b8483a"/><path d="M-30,-14 Q-20,-34 10,-36" stroke="#e8a898" stroke-width="5" fill="none" opacity=".6"/><path d="M36,-14 L62,-22" stroke="#efe6d0" stroke-width="9" stroke-linecap="round"/><circle cx="64" cy="-26" r="7" fill="#efe6d0"/><circle cx="66" cy="-17" r="7" fill="#efe6d0"/></g>`; }
function sceneWages(t) { noW(); const a = S0(31) - .2, T = t - a, k1 = ramp(t, a + .3, a + .7), k2 = ramp(t, a + .6, a + 1), k3 = ramp(t, a + .9, a + 1.3);
  let s = PHDF() + skyP('skW2', 'noon', { hz: 470, sun: [1100, 160, 1, 22] }) + dunesBack(440, '#dcbc88') + pyrP(1000, 470, 260, { k: .86, id: 'wg' }) + desertP(470, { seed: 9 });
  // the ration table with a scribe; a line of workers
  s += `<rect x="560" y="560" width="300" height="20" fill="url(#phWood)"/><rect x="580" y="580" width="12" height="70" fill="#5a3a1e"/><rect x="830" y="580" width="12" height="70" fill="#5a3a1e"/>`;
  s += `<g opacity="${k1.toFixed(2)}">${breadP(610, 556, 1)}${breadP(660, 552, .9, 'cone')}${breadP(700, 556, .9)}</g><g opacity="${k2.toFixed(2)}">${jarP(760, 556, .38, { seal: 1 })}${jarP(800, 556, .36, { seal: 1 })}</g><g opacity="${k3.toFixed(2)}">${meatP(880, 640, .9)}</g>`;
  s += egy(920, 660, { s: .62, f: -1, kind: 'scribe', i: 4, h: { hF: [860, 560], hB: [870, 572] } });
  for (let i = 4; i >= 0; i--) { const x = 480 - i * 90 + Math.min(T, 3) * 6; s += egy(x, 680 - (i % 2) * 6, { s: .6, f: 1, i: i + 1, h: i === 0 ? { hF: [610, 560], hB: [600, 572] } : { walk: i % 2 ? .4 : 2.2, amp: .25 } }); }
  return camMv(s, t, a, S0(32), [1.0, 640, 380], [1.06, 640, 420]) + grain(.1); }
chip('خبز', 380, 200, '', WS(31, 12), S0(32) - .3); chip('جِعة', 640, 200, '', WS(31, 13), S0(32) - .3); chip('لحم', 900, 200, '', WS(31, 14), S0(32) - .3);
chip('عمّالٌ بأجر، لا عبيد', 640, 640, 'big', WS(31, 7), S0(32) - .3);
// ---------- 32: the workers' village: bakeries and the bones of many cattle and sheep ----------
function bonesP(x, y, n, sd) { const r = RS(sd); let s = '';
  for (let i = 0; i < n; i++) { const xx = x + (r() - .5) * 140, yy = y - r() * 40 * (1 - Math.abs(xx - x) / 80), a = r() * 180, L = 18 + r() * 22; s += `<g transform="translate(${xx.toFixed(1)},${yy.toFixed(1)}) rotate(${a.toFixed(0)})"><path d="M${-L / 2},0 H${L / 2}" stroke="#e8dfca" stroke-width="5"/><circle cx="${-L / 2}" cy="-3" r="4" fill="#e8dfca"/><circle cx="${-L / 2}" cy="3" r="4" fill="#e8dfca"/><circle cx="${L / 2}" cy="-3" r="4" fill="#e8dfca"/><circle cx="${L / 2}" cy="3" r="4" fill="#e8dfca"/></g>`; }
  return s + `<path d="M${x - 40},${y - 30} q10,-26 30,-16 q20,-18 30,6 q10,4 4,14" stroke="#e8dfca" stroke-width="6" fill="none"/><circle cx="${x - 30}" cy="${y - 50}" r="4" fill="#3a2a1a"/>`; }
function sceneVillage(t) { noW(); const a = S0(32) - .2, T = t - a, l1 = ramp(t, WS(32, 6), WS(32, 6) + .4), l2 = ramp(t, WS(32, 8), WS(32, 8) + .4);
  let s = PHDF() + skyP('skV', 'noon', { hz: 420, sun: [200, 150, 1, 22] }) + dunesBack(400, '#dcbc88') + pyrP(980, 420, 240, { k: .86, id: 'vg' }) + desertP(420, { seed: 12 });
  s += houseP(-40, 560, 360, 150, { seed: 31, door: .7 }) + houseP(760, 540, 300, 130, { seed: 33, door: .2 }) + houseP(1080, 560, 260, 150, { seed: 35, door: .5 });
  // the bakery: bell-shaped bread pots in a fire pit
  s += `<rect x="330" y="470" width="400" height="200" fill="#a07850"/><rect x="330" y="470" width="400" height="200" fill="url(#phBrick)"/><rect x="330" y="470" width="400" height="22" fill="#000" opacity=".18"/>`;
  s += `<ellipse cx="530" cy="620" rx="170" ry="26" fill="#2a1a10"/>` + fireP(470, 616, t, .6) + fireP(590, 618, t + 1, .55);
  for (let i = 0; i < 7; i++) { const x = 400 + i * 42; s += `<path d="M${x - 16},614 Q${x - 18},580 ${x},572 Q${x + 18},580 ${x + 16},614Z" fill="#9a5a34"/><path d="M${x - 10},590 Q${x},582 ${x + 10},590" stroke="#d8905a" stroke-width="3" fill="none" opacity=".6"/>`; }
  s += smokeP(520, 560, t, 340, .55) + egy(700, 680, { s: .62, f: -1, kind: 'w', i: 5, h: { hF: [640, 600], hB: [650, 610], lean: 18 } });
  s += bonesP(960, 660, 26, 7) + bonesP(1120, 670, 18, 9);
  s += `<g opacity="${l1.toFixed(2)}">${darkP(410, 396, 240, 54)}${goldT(530, 432, 'مخابز', 1, 28)}</g><g opacity="${l2.toFixed(2)}">${darkP(880, 560, 320, 50)}${goldT(1040, 594, 'عظامُ أبقارٍ وأغنام', 1, 24)}</g>`;
  return camMv(s, t, a, S0(33), [1.0, 640, 380], [1.05, 640, 400]) + grain(.1); }
chip('قريةُ العمّال', 640, 180, 'big', WS(32, 3), S0(33) - .3);
// ---------- 33: their tombs beside their king's pyramid ----------
function tombP(x, base, w, h, sd) { return `<path d="M${x},${base} L${x + w * .12},${base - h} L${x + w * .88},${base - h} L${x + w},${base}Z" fill="#b89068"/><path d="M${x},${base} L${x + w * .12},${base - h} L${x + w * .88},${base - h} L${x + w},${base}Z" fill="url(#phBrick)"/><path d="M${x + w * .88},${base - h} L${x + w},${base} L${x + w * .8},${base}Z" fill="#000" opacity=".18"/><rect x="${x + w * .42}" y="${base - h * .6}" width="${w * .16}" height="${h * .6}" fill="#3a2414"/>`; }
function sceneTombs(t) { noW(); const a = S0(33) - .2;
  let s = PHDF() + skyP('skT', ['#3f78b8', '#e8c890', '#f4d8a8'], { hz: 470, sun: [1150, 300, 1, 26, '#fff4d8'] }) + dunesBack(450, '#d8b47e') + pyrP(820, 470, 520, { k: .86, id: 'tb', lit: .8 }) + desertP(470, { seed: 15 });
  [[60, 600, 140, 60], [230, 620, 120, 50], [370, 590, 110, 48], [520, 630, 150, 66], [130, 680, 170, 70], [400, 690, 130, 56], [700, 680, 120, 50]].forEach(([x, b, w, h], i) => { s += tombP(x, b, w, h, i) + `<path d="M${x + w * .12 + 6},${b - h + 8} V${b - 12}" stroke="#fff" stroke-width="2" opacity=".2"/>`; });
  for (let i = 0; i < 3; i++) s += `<path d="M${200 + i * 260},${560 + i * 30} q4,-30 0,-60" stroke="#c8b8a0" stroke-width="2" opacity=".0"/>`;
  return camMv(s, t, a, S0(34), [1.08, 420, 520], [1.0, 640, 380]) + grain(.1); }
chip('مقابرُ العمّال', 640, 180, 'big', WS(33, 1), S0(34) - .3); chip('شرفٌ لا يُعطى للعبيد', 640, 650, '', WS(33, 6), S0(34) - .3);
// ---------- 34: crew names painted on the stones ----------
function sceneGangs(t) { noW(); const a = S0(34) - .2, k1 = ease(ramp(t, S0(34), WS(34, 4))), k2 = ease(ramp(t, WS(34, 10), WS(34, 12))), k3 = ease(ramp(t, WS(34, 15), WS(34, 17)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#2a2218"/>`;
  // a huge stone face
  s += `<rect x="80" y="150" width="${lerp(1120, 560, k2)}" height="480" fill="#d8ccb2"/><rect x="80" y="150" width="1120" height="480" fill="#000" filter="url(#phStoneT)" opacity=".5"/><path d="M80,630 H1200 M80,150 H1200" stroke="#000" stroke-width="6" opacity=".3"/>`;
  s += `<g opacity="${k1.toFixed(2)}" transform="translate(${lerp(0, -170, k2).toFixed(1)},0)">${cartP(460, 300, 300, 90, KHUFU, '#a8321e')}${txt(610, 470, '«أصدقاءُ خوفو»', 1, '#a8321e', 46)}<path d="M430,520 q180,-24 360,0" stroke="#a8321e" stroke-width="4" fill="none" opacity=".7"/></g>`;
  if (k2 > 0) { s += `<g opacity="${k2.toFixed(2)}"><rect x="660" y="150" width="540" height="480" fill="#1e2430"/><rect x="660" y="150" width="540" height="330" fill="#9cc4e4"/><rect x="660" y="450" width="540" height="180" fill="url(#phSand)"/>` + pyrP(930, 470, 200, { tip: 1, id: 'mk' }) + pyrP(800, 470, 70, { id: 'mk2' }) + txt(930, 500, 'هرمُ مَنكاورع', 1, '#3a2410', 24) + `</g>`;
    s += `<g opacity="${k3.toFixed(2)}">${darkP(700, 552, 460, 66)}${goldT(930, 597, '«سُكارى مَنكاورع»', 1, 38, '#ff9a7a')}</g>`; }
  return s + grain(.1) + vign(.7); }
chip('فِرَقٌ لها أسماء', 640, 680, '', WS(34, 1), WS(34, 7) - .1);
// ---------- 35-36: hauling a block: the man pours water on the sand ----------
function haulP(t, o = {}) { const sx = o.sx ?? 200, T = t, mv = (o.mv ?? 1) * (t - (o.t0 ?? t)) * 6, X = sx + mv;
  let s = skyP('skHl', 'noon', { hz: 430, sun: [160, 170, 1, 24] }) + dunesBack(410, '#dcbc88') + pyrP(1060, 430, 380, { k: .86, id: 'hl' }) + rampP(1060, 430, 380, .86) + desertP(430, { seed: 21 });
  // wet track behind and in front of the sledge
  s += `<path d="M-300,664 H${X + 250}" stroke="#a07848" stroke-width="22" opacity=".45"/>` + wetP(X + 300, 668, 90, 1);
  s += sledgeP(X, 664, 230) + blockP(X + 12, 548, 210, 110);
  const hands = []; for (let i = 0; i < 6; i++) { const x = X + 470 + i * 92, y = 694 - i * 2; hands.push([x + 62 * .6, y - 160 * .6]); }
  s += `<path d="M${X + 236},640 L${hands[0][0]},${hands[0][1]}` + hands.map(h => ` L${h[0].toFixed(1)},${h[1].toFixed(1)}`).join('') + ` l40,-2" stroke="#c8a070" stroke-width="4" fill="none"/><path d="M${X + 236},${652} L${hands[0][0]},${hands[0][1] + 12}" stroke="#b8905a" stroke-width="4"/>`;
  for (let i = 5; i >= 0; i--) { const x = X + 470 + i * 92, y = 694 - i * 2; s += egy(x, y, { s: .6, f: 1, i, h: { walk: T * 2 + i * 1.3, amp: .32, lean: 18, hF: hands[i], hB: [hands[i][0] - 20, hands[i][1] + 2], bendF: 1, bendB: 1 } }); }
  // the water man walks in front of the sledge and pours
  const wx = X + 370; s += egy(wx, 690, { s: .62, f: -1, i: 4, h: { hF: [wx - 52, 562], hB: [wx - 30, 590], lean: 10 } }) + `<g transform="translate(${wx - 58},564) rotate(-70)">${jarP(0, 0, .44)}</g>` + pourP(wx - 90, 566, X + 300, 664, t);
  // a man on the block marks time
  s += egy(X + 120, 548, { s: .5, f: 1, i: 2, h: { hF: [X + 150, 440 + Math.sin(t * 5) * 6], hB: [X + 100, 470] } });
  return s; }
function sceneSledge(t) { noW(); const a = S0(35) - .2, z = ease(ramp(t, WS(36, 0), WS(36, 4)));
  let s = PHDF() + haulP(t, { t0: a }) + dustP(t, .2);
  return camMv(s, t, a, S0(37), [1.0, 640, 380], [1.0 + .55 * z, lerp(640, 560 + (t - a) * 6, z), lerp(380, 600, z)]) + grain(.1); }
chip('بوزنِ سيارتَين؟', 640, 180, '', WS(35, 4), S0(36) - .3); chip('يصبُّ الماءَ على الرمل', 640, 180, '', WS(36, 6), S0(37) - .3);
// ---------- 37: wet sand halves the pulling force (2014) ----------
function sceneFriction(t) { noW(); const a = S0(37) - .2, k = ease(ramp(t, WS(37, 8), WS(37, 14))), q = ease(ramp(t, WS(37, 16), WS(37, 18)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  const panelS = (x, wet, f, lab) => { let g = darkP(x, 170, 520, 440) + `<rect x="${x + 20}" y="430" width="480" height="140" fill="${wet ? '#a07040' : '#e0c088'}"/><rect x="${x + 20}" y="430" width="480" height="140" fill="#000" filter="url(#phSandT)" opacity=".3"/>`;
    g += sledgeP(x + 110, 432, 140) + blockP(x + 118, 352, 126, 72);
    if (!wet) g += `<path d="M${x + 268},432 q24,-40 54,-22 q10,10 12,22Z" fill="#d8b47c"/><path d="M${x + 268},432 q24,-40 54,-22" stroke="#b08850" stroke-width="2" fill="none"/>`;
    else g += Array.from({ length: 6 }, (_, i) => `<circle cx="${x + 300 + i * 22}" cy="${436 + (i % 2) * 4}" r="3" fill="#cfe6ee" opacity=".6"/>`).join('');
    const L = 160 * f * k; g += `<path d="M${x + 290},388 h${L.toFixed(1)}" stroke="${wet ? '#7ae08a' : '#ff7a5a'}" stroke-width="12" stroke-linecap="round"/><path d="M${(x + 290 + L + 6).toFixed(1)},376 l22,12 l-22,12Z" fill="${wet ? '#7ae08a' : '#ff7a5a'}" opacity="${k.toFixed(2)}"/>` + txt(x + 370, 350, `قوّةُ السحب: ${AR(Math.round(100 * f * k))}٪`, k, '#fff', 24) + txt(x + 260, 600, lab, 1, wet ? '#7ae08a' : '#ffb08a', 30);
    return g; };
  s += panelS(90, 0, 1, 'رملٌ جافّ') + panelS(670, 1, .5, 'رملٌ مبلّلٌ بالقدرِ المناسب');
  s += `<g opacity="${q.toFixed(2)}">${darkP(470, 630, 340, 64)}${goldT(640, 672, 'النصفُ تقريباً', 1, 34)}</g>`;
  return s + grain(.08); }
chip('٢٠١٤', 640, 130, '', WS(37, 0), S0(38) - .3);
// ---------- 38: the same scene painted on an old tomb wall ----------
function sceneTombArt(t) { noW(); const a = S0(38) - .2, k = ease(ramp(t, a + .1, a + 1.2));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#cbb48a"/><rect x="-20" y="-20" width="1320" height="760" fill="#000" filter="url(#phStoneT)" opacity=".4"/><rect x="-20" y="-20" width="1320" height="760" fill="#fff" filter="url(#phPaperT)" opacity=".15"/>`;
  // flat profile painting: a colossal seated statue on a sledge, men pulling ropes, a man pouring water at the front
  const ochre = '#a8542a', blue = '#2a5a7a', black = '#1e140c', white = '#efe6d0';
  let g = `<path d="M100,560 H1180" stroke="${black}" stroke-width="4"/><path d="M110,580 H1180" stroke="${blue}" stroke-width="6"/>`;
  g += `<path d="M120,550 H420 Q450,550 456,520 L444,520 Q440,538 420,538 H120Z" fill="${ochre}"/>`;
  // seated statue in profile, facing right: throne, shins, thighs, torso, head with a striped headcloth
  g += `<rect x="150" y="330" width="90" height="208" fill="${white}" stroke="${black}" stroke-width="3"/><rect x="236" y="400" width="140" height="44" fill="${ochre}" stroke="${black}" stroke-width="3"/><rect x="336" y="440" width="40" height="98" fill="${ochre}" stroke="${black}" stroke-width="3"/><path d="M336,538 h56 v-10 h-56Z" fill="${ochre}" stroke="${black}" stroke-width="2"/>` +
    `<path d="M230,400 L232,250 Q236,232 262,230 L300,230 Q312,240 308,260 L300,400Z" fill="${ochre}" stroke="${black}" stroke-width="3"/><path d="M300,300 Q340,330 350,400" stroke="${ochre}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M300,300 Q340,330 350,400" stroke="${black}" stroke-width="2" fill="none"/>` +
    `<rect x="266" y="206" width="26" height="30" fill="${ochre}"/><path d="M246,150 Q270,128 300,146 L306,200 Q300,214 292,214 L286,236 L244,250 L236,214Z" fill="${white}" stroke="${black}" stroke-width="3"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${240 + i * 2},${168 + i * 13} L${300 - i},${160 + i * 12}" stroke="${blue}" stroke-width="5"/>`).join('') +
    `<path d="M290,164 Q314,168 318,190 L304,204 Q298,214 290,212Z" fill="${ochre}" stroke="${black}" stroke-width="2"/><circle cx="304" cy="182" r="3" fill="${black}"/><path d="M306,210 l6,22 l-8,0Z" fill="${blue}"/>`;
  g += `<path d="M440,516 L1150,470" stroke="${ochre}" stroke-width="4"/><path d="M440,528 L1150,500" stroke="${ochre}" stroke-width="4"/>`;
  const fig = (x, y, s, lean) => `<g transform="translate(${x},${y}) scale(${s}) rotate(${lean})"><circle cx="0" cy="-118" r="12" fill="${black}"/><path d="M-10,-104 L12,-104 L14,-56 L-12,-56Z" fill="${ochre}"/><path d="M-14,-58 H16 L18,-30 H-16Z" fill="${white}" stroke="${black}" stroke-width="1.5"/><path d="M-8,-30 L-20,0 M8,-30 L22,0" stroke="${ochre}" stroke-width="7"/><path d="M8,-96 L34,-80" stroke="${ochre}" stroke-width="6"/></g>`;
  for (let i = 0; i < 10; i++) g += fig(560 + i * 60, 520 - i * 4.4, .9, 14) + fig(580 + i * 60, 546 - i * 3.6, .9, 14);
  g += fig(470, 530, .9, -6) + `<path d="M490,440 q10,-14 24,-6 l-6,30Z" fill="${blue}"/><path d="M492,450 Q470,480 456,520" stroke="${blue}" stroke-width="3" fill="none" stroke-dasharray="4 4"/>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 13; i++) g += hg(['owl', 'reed', 'water', 'loaf', 'eye', 'hand', 'snake', 'mouth', 'foot'][(i + r * 4) % 9], 440 + i * 56, 200 + r * 50, .9, r ? blue : black, .85);
  s += `<g opacity="${k.toFixed(2)}" transform="translate(0,46)">${g}</g><rect x="-20" y="-20" width="1320" height="760" fill="#000" filter="url(#phSandT)" opacity=".15"/>`;
  s += `<g opacity="${ramp(t, WS(38, 4), WS(38, 4) + .4).toFixed(2)}">${darkP(380, 646, 520, 60)}${goldT(640, 686, 'رسمٌ في مقبرةِ «جحوتي حتب»', 1, 30)}</g>`;
  return camMv(s, t, a, S0(39), [1.0, 640, 380], [1.06, 600, 420]) + vign(.6); }
// ---------- 39: the King's Chamber granite came from Aswan, more than 800 km by river ----------
function sceneGranite(t) { noW(); const a = S0(39) - .2, p1 = ease(ramp(t, a, a + .5)) * (1 - ease(ramp(t, WS(39, 6) - .2, WS(39, 6) + .3))), p2 = ease(ramp(t, WS(39, 6) - .2, WS(39, 6) + .3)) * (1 - ease(ramp(t, WS(39, 17) - .2, WS(39, 17) + .3))), p3 = ease(ramp(t, WS(39, 17) - .2, WS(39, 17) + .3));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  if (p1 > 0) { let g = pyrP(640, 640, 700, { tip: 1, id: 'gr' }) + `<path d="M640,640 L640,400" stroke="#000" stroke-width="2" opacity=".0"/><rect x="596" y="488" width="96" height="34" fill="url(#phGran)" stroke="#f4c76b" stroke-width="2.5"/>`;
    s += `<g opacity="${p1.toFixed(2)}">${g}${darkP(760, 420, 250, 60)}${goldT(885, 458, 'غرفةُ الملك', 1, 28)}<path d="M760,452 L700,500" stroke="#f4c76b" stroke-width="2"/></g>`; }
  if (p2 > 0) { const k = ease(ramp(t, WS(39, 7), WS(39, 16)));
    let g = `<rect x="360" y="150" width="560" height="540" rx="14" fill="url(#phPap)"/><rect x="360" y="150" width="560" height="540" fill="#000" filter="url(#phPaperT)" opacity=".3"/>` +
      `<path d="M610,180 C600,260 640,320 620,400 C600,480 680,560 690,660" stroke="#9ab060" stroke-width="60" fill="none" opacity=".6"/><path d="M610,180 C600,260 640,320 620,400 C600,480 680,560 690,660" stroke="#3f7186" stroke-width="12" fill="none"/>`;
    g += `<path d="M690,660 C680,560 600,480 620,400 C640,320 600,260 610,180" stroke="#9a2a1a" stroke-width="5" fill="none" stroke-dasharray="${(k * 560).toFixed(0)} 2000"/>` + pyrP(560, 200, 50, { id: 'g2' }) + txt(520, 240, 'الجيزة', 1, '#3a2410', 26) + `<circle cx="690" cy="660" r="8" fill="#9a2a1a"/>` + txt(780, 650, 'أسوان', 1, '#3a2410', 26) + `<rect x="700" y="620" width="34" height="22" fill="url(#phGran)"/>`;
    g += `<path d="M860,190 v-26 M850,176 l10,-12 l10,12" stroke="#3a2410" stroke-width="3" fill="none"/>` + txt(860, 214, 'شمال', 1, '#3a2410', 16) + `<g opacity="${ramp(t, WS(39, 11), WS(39, 11) + .4).toFixed(2)}">${darkP(390, 420, 220, 60)}${goldT(500, 458, '+٨٠٠ كم', 1, 32)}</g>`;
    s += `<g opacity="${p2.toFixed(2)}">${g}</g>`; }
  if (p3 > 0) s += `<g opacity="${p3.toFixed(2)}">${blockP(420, 330, 360, 220, { col: '#a07a76' })}<rect x="420" y="330" width="360" height="220" fill="url(#phGran)" opacity=".8"/><rect x="420" y="330" width="360" height="220" fill="#000" filter="url(#phSandT)" opacity=".5"/>${egy(860, 560, { s: .62, f: -1, i: 3 })}${darkP(410, 590, 400, 64)}${goldT(610, 632, 'عشراتُ الأطنان', 1, 34)}</g>`;
  return s + grain(.08); }
chip('غرانيت', 640, 140, '', WS(39, 3), WS(39, 6) - .3); chip('من أسوان', 1080, 420, '', WS(39, 7), WS(39, 17) - .3);
// ---------- 40: the tools: copper chisels and hard-stone hammers ----------
function sceneTools(t) { noW(); const a = S0(40) - .2, k1 = ease(ramp(t, WS(40, 1), WS(40, 2) + .3)), k2 = ease(ramp(t, WS(40, 4), WS(40, 5) + .3)), hit = Math.max(0, Math.sin((t - a) * 5));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#1a1612"/><rect x="-20" y="430" width="1320" height="320" fill="#d8ccb2"/><rect x="-20" y="430" width="1320" height="320" fill="#000" filter="url(#phStoneT)" opacity=".5"/>`;
  s += `<g opacity="${k1.toFixed(2)}" transform="translate(380,${(400 - hit * 6).toFixed(1)}) rotate(-20)"><rect x="-16" y="-160" width="32" height="200" rx="4" fill="url(#phCopper)"/><path d="M-16,40 L-16,58 L16,76 L16,40Z" fill="#a85e30"/><path d="M-16,58 L16,76" stroke="#f0b080" stroke-width="2"/><rect x="-16" y="-160" width="10" height="200" fill="#fff" opacity=".18"/><ellipse cx="0" cy="-160" rx="18" ry="6" fill="#c07a48"/></g>`;
  s += `<g opacity="${k2.toFixed(2)}" transform="translate(${(820 + hit * 10).toFixed(1)},${(320 - hit * 20).toFixed(1)})"><ellipse cx="0" cy="0" rx="90" ry="70" fill="#3a3a40"/><ellipse cx="-20" cy="-20" rx="50" ry="30" fill="#5a5a62" opacity=".6"/><ellipse cx="0" cy="0" rx="90" ry="70" fill="#000" filter="url(#phStoneT)" opacity=".6"/></g>`;
  s += `<g opacity="${k1.toFixed(2)}">${darkP(250, 560, 260, 60)}${goldT(380, 598, 'إزميلٌ من النحاس', 1, 26)}</g><g opacity="${k2.toFixed(2)}">${darkP(690, 560, 260, 60)}${goldT(820, 598, 'مطرقةٌ من حجرٍ صلب', 1, 26)}</g>`;
  if (hit > .9) s += `<g opacity="${((hit - .9) * 10).toFixed(2)}">${Array.from({ length: 8 }, (_, i) => `<circle cx="${400 + Math.cos(i) * 40}" cy="${470 - Math.abs(Math.sin(i * 2)) * 40}" r="3" fill="#efe6d0"/>`).join('')}</g>`;
  return s + grain(.08) + vign(.7); }
// ---------- 41: aligned to true north within a tenth of a degree ----------
function sceneNorth(t) { noW(); const a = S0(41) - .2, k = ease(ramp(t, WS(41, 3), WS(41, 6))), q = ease(ramp(t, WS(41, 8), WS(41, 11)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="url(#phSand)"/><rect x="-20" y="-20" width="1320" height="760" fill="#000" filter="url(#phSandT)" opacity=".2"/>`;
  const C = [560, 420], R = 220, rot = -.06;  // the pyramid seen from above, turned by 0.06 deg (invisible)
  s += `<g transform="rotate(${rot},${C[0]},${C[1]})"><path d="M${C[0] - R},${C[1] - R} L${C[0]},${C[1]} L${C[0] + R},${C[1] - R}Z" fill="#f4efe2"/><path d="M${C[0] + R},${C[1] - R} L${C[0]},${C[1]} L${C[0] + R},${C[1] + R}Z" fill="#cfc3a8"/><path d="M${C[0] + R},${C[1] + R} L${C[0]},${C[1]} L${C[0] - R},${C[1] + R}Z" fill="#b8ac92"/><path d="M${C[0] - R},${C[1] + R} L${C[0]},${C[1]} L${C[0] - R},${C[1] - R}Z" fill="#e2d8c2"/></g>`;
  s += `<g opacity="${k.toFixed(2)}"><path d="M${C[0]},${C[1] + 260} V${C[1] - 236}" stroke="#2a6aa8" stroke-width="4"/><path d="M${C[0] - 14},${C[1] - 216} L${C[0]},${C[1] - 242} L${C[0] + 14},${C[1] - 216}Z" fill="#2a6aa8"/>${txt(C[0] + 24, C[1] - 210, 'الشمالُ الحقيقيّ', 1, '#1a3a6a', 28, 'end')}</g>`;
  s += `<g opacity="${q.toFixed(2)}">${darkP(860, 330, 340, 160)}${goldT(1030, 390, 'الخطأ', 1, 26, '#fff')}${goldT(1030, 448, 'أقلُّ من ١/١٠ درجة', 1, 34)}</g>`;
  // the star gazers' sighting at night (small inset): a plumb line and a star
  return camMv(s, t, a, S0(42), [1.0, 640, 380], [1.04, 600, 380]) + grain(.08); }
chip('أدواتٌ بسيطة… ودقّةٌ مذهلة', 640, 668, '', WS(41, 0), S0(42) - .3);
// ---------- 42: suddenly a worker screams ----------
function sceneScream(t) { noW(); const a = S0(42) - .2, f = ease(ramp(t, WS(42, 2), WS(42, 3))), fl = Math.max(0, 1 - Math.abs(t - WS(42, 3)) * 2);
  let s = PHDF() + haulP(Math.min(t, WS(42, 2)), { sx: 60, mv: 0 });
  s += egy(280, 700, { s: .62, f: 1, i: 1, h: f > .5 ? { rot: -70 * f, pv: -40, lF: [1.2, .3], lB: [.6, .4], noShadow: 1 } : { walk: t * 3, amp: .5 } });
  s = camMv(s, t, a, CS(4), [1.15, 420, 520], [1.3, 380, 560]);
  s += `<rect x="-20" y="-20" width="1320" height="760" fill="#c81e1e" opacity="${(fl * .35).toFixed(2)}"/>` + `<g opacity="${f.toFixed(2)}"><text x="620" y="300" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="160" fill="#ff5a4a" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">!</text></g>`;
  return s + grain(.1) + vign(.9); }
