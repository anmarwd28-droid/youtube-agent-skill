// ===================== chapter 4: the doctor; chapter 5: the market =====================
// a long bone (tibia) seen like an X-ray; brk 0..1 crack, heal 0..1 callus
function boneX(x, y, w, brk, heal) { const h = 34;
  let s = `<g transform="translate(${x},${y})"><path d="M${-w / 2},-${h} q-30,-6 -34,${h} q4,${h + 6} 34,${h} H${w / 2} q30,6 34,-${h} q-4,-${h + 6} -34,-${h}Z" fill="#e8eef4"/><path d="M${-w / 2},-${h - 8} H${w / 2}" stroke="#fff" stroke-width="4" opacity=".6"/><path d="M${-w / 2 + 10},${h - 10} H${w / 2 - 10}" stroke="#9ab0c8" stroke-width="6" opacity=".5"/>`;
  if (brk > 0) s += `<path d="M-8,-${h + 4} L6,-10 L-6,4 L8,${h + 4}" stroke="#14202e" stroke-width="${(6 * brk * (1 - heal)).toFixed(1)}" fill="none"/>`;
  if (heal > 0) s += `<ellipse cx="0" cy="0" rx="${(30 * heal).toFixed(1)}" ry="${(h + 12 * heal).toFixed(1)}" fill="#f4f8fc" opacity="${(.85 * heal).toFixed(2)}"/>`;
  return s + `</g>`; }
const xrayBg = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#0e1a2a"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a4a6a" opacity=".35" filter="url(#phSandT)"/>`;
// ---------- 43-45: the injured worker; no hospitals; the doctor comes ----------
function sceneInjury(t) { noW(); const a = CS(4), T = t - a, ins = ease(ramp(t, WS(43, 3), WS(43, 4) + .3)) * (1 - ease(ramp(t, S0(44) + .6, S0(44) + 1.2))), dc = ramp(t, S0(45) - .8, S0(46) - .3);
  let s = PHDF() + skyP('skJ', 'noon', { hz: 430, sun: [200, 170, 1, 22] }) + dunesBack(410, '#dcbc88') + pyrP(1040, 430, 340, { k: .86, id: 'ij' }) + desertP(430, { seed: 25 });
  s += sledgeP(160, 600, 230) + blockP(172, 484, 210, 110);
  // the hurt man sits holding his leg; a friend kneels beside him
  s += egy(520, 650, { s: .66, f: -1, i: 1, sit: 1, h: { hipY: -20, lF: [1.5, 1.5], lB: [1.1, -.6], noShadow: 1, lean: 14, hF: [440, 600], hB: [470, 594], lookUp: .3 } });
  s += `<ellipse cx="410" cy="624" rx="16" ry="10" fill="#c83a2a" opacity=".55"/>`;
  s += egy(600, 652, { s: .64, f: -1, i: 3, dl: 70, h: { hipY: -80, lF: [.1, -1.5], lB: [0, -1.55], lean: 24, hF: [540, 560], hB: [552, 572], noShadow: 1 } });
  // the doctor walks in from the right, bag of linen and pots
  if (dc > 0) { const x = lerp(1300, 820, ease(dc)); s += egy(x, 664, { s: .7, f: -1, kind: 'doc', i: 2, h: dc < 1 ? { walk: T * 2.6, amp: .45 } : { hF: [x - 50, 560] } }) + `<g transform="translate(${x + 30},590)"><rect x="-22" y="-20" width="44" height="36" rx="6" fill="#8a6a44"/><rect x="-22" y="-20" width="44" height="8" fill="#6a4a2a"/></g>`; }
  s = camMv(s, t, a, S0(46), [1.08, 560, 470], [1.0, 640, 380]);
  if (ins > 0) s += circP(860, 330, 150, xrayBg(710, 180, 300, 300) + boneX(860, 330, 190, 1, 0), 'bx', ins) + `<g opacity="${ins.toFixed(2)}">${txt(860, 520, 'العظمُ مكسور', 1, '#ff9a7a', 30)}</g>`;
  return s + grain(.1); }
chip('بلا مستشفيات', 640, 180, 'red', WS(44, 1), S0(45) - .2); chip('لكن يأتي الطبيب', 640, 180, '', WS(45, 1), S0(46) - .3);
// ---------- 46: the Edwin Smith papyrus, 48 injury cases ----------
function sceneSmith(t) { noW(); const a = S0(46) - .2, k = ease(ramp(t, a, WS(46, 9))), n = Math.round(48 * ease(ramp(t, WS(46, 11), WS(46, 15))));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#1a1410"/>` + papyrusSheet(90, 160, 640, 470, k, { red: 1, seed: 46, lh: 26 });
  for (let c = 1; c < 4; c++) s += `<path d="M${90 + c * 160},176 V616" stroke="#8a6a3a" stroke-width="1.5" opacity=".35"/>`;
  s += `<g opacity="${k.toFixed(2)}">${darkP(140, 560, 540, 60)}${goldT(410, 600, 'بَرْدِيّةُ «إدوين سميث»', 1, 30)}</g>`;
  s += darkP(790, 170, 400, 440) + txt(990, 236, 'حالاتُ إصابة', 1, '#fff', 26);
  for (let i = 0; i < 48; i++) { const c = i % 8, r = Math.floor(i / 8), on = i < n; s += `<rect x="${822 + c * 44}" y="${268 + r * 44}" width="34" height="34" rx="6" fill="${on ? '#f4c76b' : '#2a2e3a'}"/>` + (on ? `<path d="M${830 + c * 44},${286 + r * 44} l7,7 l13,-14" stroke="#1c140a" stroke-width="3" fill="none"/>` : ''); }
  s += txt(990, 570, `${AR(n)} حالة`, 1, '#f4c76b', 40);
  return s + grain(.08) + vign(.6); }
chip('من أقدمِ كتبِ الجراحة', 640, 140, '', WS(46, 2), S0(47) - .3);
// ---------- 47: splints of wood, wrapped in linen ----------
function sceneSplint(t) { noW(); const a = S0(47) - .2, pull = ease(ramp(t, WS(47, 1), WS(47, 2) + .3)), sp = ease(ramp(t, WS(47, 3), WS(47, 5))), wr = ramp(t, WS(47, 6), WS(47, 8) + .6);
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#b89468"/><rect x="-20" y="-20" width="1320" height="760" fill="#000" filter="url(#phSandT)" opacity=".25"/>`;
  s += `<rect x="60" y="330" width="1160" height="230" rx="16" fill="#d8bc7c"/>` + Array.from({ length: 58 }, (_, i) => `<path d="M${70 + i * 20},334 v222" stroke="#a88a4a" stroke-width="2" opacity=".6"/>`).join('');
  // the leg lying on the mat, side view: thigh (left, under the kilt) -> knee -> shin -> foot with toes up; straightened by pulling
  const sk = '#94603e', off = lerp(-14, 0, pull), sh = mix(sk, '#000000', .25);
  s += `<path d="M60,404 Q240,392 400,${414 + off * .3} Q470,${404 + off * .6} 520,${420 + off} L900,${432 + off} Q930,${420 + off} 948,${370 + off} Q958,${350 + off} 980,${356 + off} Q992,${366 + off} 984,${400 + off} Q980,${440 + off} 990,${462 + off} Q996,${488 + off} 960,${494 + off} L520,${486 + off} Q450,${494 + off} 400,${488 + off * .3} Q240,500 60,500Z" fill="${sk}"/>` +
    `<path d="M520,${486 + off} L960,${494 + off} Q996,${488 + off} 990,${462 + off}" stroke="${sh}" stroke-width="14" fill="none" opacity=".5"/><ellipse cx="455" cy="${446 + off * .6}" rx="34" ry="40" fill="${mix(sk, '#ffffff', .08)}"/><path d="M948,${370 + off} Q956,${340 + off} 972,${342 + off}" stroke="${sh}" stroke-width="4" fill="none"/>` +
    `<path d="M60,392 L300,386 L310,512 L60,516Z" fill="#efe8d8"/><path d="M60,392 L300,386 L304,420 L60,424Z" fill="#000" opacity=".08"/>`;
  // splints
  if (sp > 0) s += `<g opacity="${sp.toFixed(2)}"><rect x="540" y="${408 + off - (1 - sp) * 60}" width="380" height="20" rx="6" fill="url(#phWood)"/><rect x="540" y="${490 + off + (1 - sp) * 60}" width="380" height="20" rx="6" fill="url(#phWood)"/></g>`;
  // linen bands wrap one by one
  const nb = Math.floor(wr * 8); for (let i = 0; i < nb; i++) { const x = 556 + i * 44; s += `<path d="M${x},${396 + off} L${x + 30},${398 + off} L${x + 34},${532 + off} L${x + 4},${530 + off}Z" fill="#efe8d8"/><path d="M${x},${396 + off} L${x + 30},${398 + off}" stroke="#c8bca4" stroke-width="2"/>`; }
  // the doctor's hands
  s += `<g opacity="${sp.toFixed(2)}">${darkP(470, 600, 340, 56)}${goldT(640, 638, 'ألواحٌ من الخشب + كتّان', 1, 26)}</g>`;
  return camMv(s, t, a, S0(48), [1.0, 640, 400], [1.08, 640, 440]) + grain(.08) + vign(.6); }
// ---------- 48-49: honey on the wound; it kills many bacteria ----------
function sceneHoney(t) { noW(); const a = S0(48) - .2, T = t - a, dr = ramp(t, WS(48, 1), WS(48, 2) + .6), mic = ease(ramp(t, WS(49, 1), WS(49, 3))), kill = ramp(t, WS(49, 8), WS(49, 11) + .4);
  let s = PHDF(BCDEFS()) + `<rect x="-20" y="-20" width="1320" height="760" fill="#3a2a1a"/><rect x="-20" y="440" width="1320" height="320" fill="#b89468"/>`;
  s += `<g transform="translate(330,440)"><ellipse cx="0" cy="10" rx="110" ry="18" fill="#000" opacity=".3" filter="url(#phB4)"/><path d="M-80,0 Q-100,-120 -60,-160 H60 Q100,-120 80,0Z" fill="url(#phClay)"/><ellipse cx="0" cy="-160" rx="62" ry="14" fill="#7a4628"/><ellipse cx="0" cy="-158" rx="54" ry="10" fill="url(#phHoney)"/></g>`;
  const dx = 330 + 140 * ease(dr), dy = 270 - 40 * Math.sin(dr * Math.PI); s += `<path d="M330,282 Q${(330 + dx) / 2},${dy - 40} ${dx},${dy}" stroke="#6a4a2a" stroke-width="8" fill="none"/><ellipse cx="${dx}" cy="${dy}" rx="18" ry="12" fill="url(#phHoney)"/>`;
  if (dr > .6) { const u = pmod(T * 1.4, 1); s += `<path d="M${dx},${dy + 10} Q${dx + 4},${dy + 60} ${dx},${dy + 60 + u * 80}" stroke="#e09a1a" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>`; }
  s += `<rect x="440" y="440" width="520" height="70" rx="20" fill="#9c6844"/><rect x="560" y="430" width="200" height="90" rx="10" fill="#efe8d8"/><ellipse cx="660" cy="472" rx="${(70 * ramp(t, WS(48, 2), WS(48, 2) + 1.4)).toFixed(1)}" ry="26" fill="url(#phHoney)" opacity=".9"/>`;
  s += txt(330, 560, 'عسل', 1, '#f4c76b', 40);
  if (mic > 0) { let inner = `<rect x="740" y="120" width="440" height="440" fill="#e8f0e4"/>`; const r = RS(48);
    for (let i = 0; i < 16; i++) inner += bact(780 + r() * 360, 160 + r() * 360, 1.1, { k: i % 3 ? 'rod' : 'coc', bad: 1, rot: r() * 180 + t * 10, t, a: i % 4 === 0 ? 1 : clamp(1 - kill * 1.4 + r() * .3) });
    inner += `<rect x="740" y="120" width="440" height="440" fill="#f0b030" opacity="${(.25 * kill).toFixed(2)}"/>`;
    s += circP(960, 340, 210, inner, 'hm', mic) + `<g opacity="${mic.toFixed(2)}">${txt(960, 590, 'تحتَ المجهر', 1, '#fff', 24)}</g>`; }
  return s + grain(.08) + vign(.6); }
chip('يقتلُ كثيراً من البكتيريا', 640, 660, '', WS(49, 7), S0(50) - .3);
// ---------- 50: healed bones in the workers' skeletons ----------
function sceneHealed(t) { noW(); const a = S0(50) - .2, h = ease(ramp(t, WS(50, 7), WS(50, 9) + .4));
  let s = PHDF() + xrayBg(-20, -20, 1320, 760) + `<circle cx="640" cy="400" r="360" fill="#3a6a9a" opacity=".2" filter="url(#phSm)"/>`;
  s += `<g transform="translate(640,400) rotate(-8) scale(1.6) translate(-640,-400)">${boneX(640, 400, 380, 1, h)}</g>`;
  s += `<g opacity="${h.toFixed(2)}">${darkP(470, 590, 340, 64)}${goldT(640, 632, 'التأمَت من جديد', 1, 34, '#7ae08a')}</g>`;
  return s + grain(.1); }
chip('هياكلُ العمّال', 640, 170, 'dark', WS(50, 1), S0(51) - .3);
// ---------- 51: he may live, and go back to work ----------
function sceneBackWork(t) { noW(); const a = S0(51) - .2;
  let s = PHDF() + haulP(t, { t0: a, sx: 120 });
  return camMv(s, t, a, S0(52), [1.0, 640, 380], [1.06, 700, 420]) + grain(.1); }
chip('يعودُ إلى العمل', 640, 180, '', WS(51, 5), S0(52) - .3);
// ---------- 52-53: another remedy with animal dung; medicine = science + magic ----------
function sceneDung(t) { noW(); const a = S0(52) - .2, T = t - a, d = ease(ramp(t, WS(52, 7), WS(52, 9))), bal = ease(ramp(t, S0(53) - .1, WS(53, 5)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#2a2018"/><rect x="-20" y="470" width="1320" height="300" fill="url(#phWood)"/>`;
  s += `<g transform="translate(260,470)"><path d="M-60,0 Q-76,-90 -40,-110 H40 Q76,-90 60,0Z" fill="url(#phClay)"/><ellipse cx="0" cy="-110" rx="42" ry="10" fill="url(#phHoney)"/></g>${txt(260, 520, 'عسل', 1, '#f4c76b', 26)}`;
  s += `<g transform="translate(470,470)"><ellipse cx="0" cy="0" rx="70" ry="18" fill="#6a8a3a"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${-50 + i * 14},-4 q6,-30 ${i % 2 ? 10 : -6},-46" stroke="#7aa84a" stroke-width="4" fill="none"/>`).join('')}</g>${txt(470, 520, 'أعشاب', 1, '#fff', 24)}`;
  s += `<g opacity="${d.toFixed(2)}" transform="translate(700,470)"><path d="M-60,0 Q-76,-80 -40,-96 H40 Q76,-80 60,0Z" fill="url(#phClay)"/><ellipse cx="0" cy="-96" rx="42" ry="10" fill="#4a3220"/>` + Array.from({ length: 5 }, (_, i) => { const ang = T * 3 + i * 1.3; return `<g transform="translate(${(Math.cos(ang) * 50).toFixed(1)},${(-130 + Math.sin(ang * 1.4) * 20).toFixed(1)})"><ellipse rx="5" ry="3.5" fill="#111"/><ellipse cx="-3" cy="-4" rx="4" ry="2.4" fill="#cfd8e0" opacity=".7"/></g>`; }).join('') + `</g><g opacity="${d.toFixed(2)}">${txt(700, 520, 'روثُ حيوانات', 1, '#ff9a7a', 26)}</g>`;
  // eye of Horus amulet
  s += `<g transform="translate(960,400) scale(3)" opacity=".95">${hg('eye', -20, -20, 1, '#2a6aa8')}</g>${txt(960, 520, 'تميمة', 1, '#fff', 24)}`;
  if (bal > 0) { const tilt = 0; s += `<g opacity="${bal.toFixed(2)}">${darkP(390, 140, 500, 200)}<path d="M640,320 V200" stroke="#c8c8d0" stroke-width="6"/><path d="M480,200 H800" stroke="#c8c8d0" stroke-width="6" transform="rotate(${tilt},640,200)"/><path d="M480,200 l-40,60 h80Z M800,200 l-40,60 h80Z" stroke="#c8c8d0" stroke-width="2" fill="none"/>${txt(480, 300, 'علم', 1, '#7ae08a', 34)}${txt(800, 300, 'سحر', 1, '#c8a0ff', 34)}</g>`; }
  return s + grain(.1) + vign(.6); }
// ======== chapter 5: the market ========
function stallP(x, y, w, goods, sd) { return `<path d="M${x - 10},${y - 120} L${x + w + 10},${y - 120} L${x + w},${y - 100} L${x},${y - 100}Z" fill="${['#c8a060', '#b88a50', '#d8b070'][sd % 3]}"/><path d="M${x},${y - 100} V${y} M${x + w},${y - 100} V${y}" stroke="#6a4a2a" stroke-width="5"/><rect x="${x - 6}" y="${y - 14}" width="${w + 12}" height="14" rx="4" fill="#d8bc7c"/>` + goods; }
const fishP = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 Q-10,-18 26,-4 L42,-16 L40,0 L42,16 L26,4 Q-10,18 -40,0Z" fill="#9aa8b4"/><path d="M-30,-2 Q0,-12 24,-2" stroke="#d8e0e8" stroke-width="3" fill="none"/><circle cx="-28" cy="-3" r="2.6" fill="#1a1a1a"/></g>`;
const sandalP = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-36,0 Q-40,-18 -20,-20 H26 Q44,-16 40,0 Q0,6 -36,0Z" fill="#c8a858"/><path d="M-30,-8 H34" stroke="#8a6a2a" stroke-width="2"/><path d="M-6,-18 Q4,-34 16,-18" stroke="#8a6a2a" stroke-width="3" fill="none"/></g>`;
function sceneMarket(t) { noW(); const a = CS(5), T = t - a;
  let s = PHDF() + skyP('skM', 'noon', { hz: 420, sun: [640, 110, 1, 24] }) + `<rect x="-300" y="390" width="1880" height="40" fill="#7a9a4a"/>` + nileP(400, 450, t, { n: 12 }) + boatP(1000 + T * 6, 440, .3, 1, t, { sail: 1 }) + `<rect x="-300" y="450" width="1880" height="400" fill="url(#phSand)"/><rect x="-300" y="450" width="1880" height="400" fill="#000" filter="url(#phSandT)" opacity=".2"/>`;
  s += stallP(60, 560, 200, fishP(110, 540, .9) + fishP(200, 538, .9) + fishP(150, 524, .8), 0) + stallP(330, 550, 200, breadP(380, 534, .7) + breadP(440, 534, .7) + breadP(490, 532, .6, 'cone'), 1) + stallP(600, 556, 210, onionP(640, 540, .9) + onionP(680, 542, .9) + `<ellipse cx="760" cy="536" rx="34" ry="12" fill="#7aa84a"/>`, 2) + stallP(880, 552, 220, jarP(920, 538, .32) + jarP(960, 538, .3) + sandalP(1040, 536, .7), 0);
  s += egy(160, 600, { s: .5, f: 1, i: 2, h: { hipY: -18, lF: [1.5, 1.5], lB: [1.4, 1.4], noShadow: 1 }, sit: 1 }) + egy(700, 600, { s: .5, f: -1, kind: 'w', i: 4, dl: 70, h: { hipY: -80, lF: [.1, -1.5], lB: [0, -1.55], noShadow: 1 } });
  s += egy(420 + T * 10, 690, { s: .62, f: 1, kind: 'you', h: { walk: T * 2.4, amp: .45 } }) + egy(900, 690, { s: .6, f: -1, i: 5, h: { walk: T * 2.2, amp: .4 } }) + egy(1080, 700, { s: .62, f: -1, kind: 'w', i: 1 }) + egy(260, 700, { s: .6, f: 1, kind: 'rich', i: 3 });
  return camMv(s, t, a, S0(55), [1.0, 640, 380], [1.05, 560, 420]) + grain(.1); }
chip('ليس معك نقود', 640, 180, 'red', WS(54, 7), S0(55) - .3);
// ---------- 55: no money at all; the first coins come ~2,000 years later ----------
function sceneCoins(t) { noW(); const a = S0(55) - .2, k = ease(ramp(t, WS(55, 5), WS(55, 13)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#14161e"/>`;
  const x0 = 200, x1 = 1080, y = 420; s += `<path d="M${x0},${y} H${x1}" stroke="#3a3e4a" stroke-width="8" stroke-linecap="round"/><path d="M${x0},${y} H${lerp(x0, x1, k).toFixed(1)}" stroke="#f4c76b" stroke-width="8" stroke-linecap="round"/>`;
  s += pyrP(x0, y - 30, 90, { tip: 1, id: 'cn' }) + txt(x0, y + 60, 'الهرم', 1, '#fff', 26) + txt(x0, y + 92, 'نحوَ ٢٥٦٠ ق.م', 1, 'rgba(255,255,255,.7)', 20);
  s += `<g opacity="${k.toFixed(2)}"><circle cx="${x1}" cy="${y - 80}" r="56" fill="#d8b040"/><circle cx="${x1}" cy="${y - 80}" r="46" fill="none" stroke="#a8801a" stroke-width="3"/><path d="M${x1 - 26},${y - 70} q10,-34 30,-30 q20,4 18,20 q-6,-10 -16,-6 q-10,6 -4,16Z" fill="#a8801a"/>${txt(x1, y + 60, 'أوّلُ العملات', 1, '#f4c76b', 26)}${txt(x1, y + 92, 'نحوَ ٦٠٠ ق.م', 1, 'rgba(255,255,255,.7)', 20)}</g>`;
  s += `<g opacity="${k.toFixed(2)}">${txt((x0 + x1) / 2, y - 26, 'نحوَ ألفَي سنة', 1, '#f4c76b', 34)}</g>`;
  return s + grain(.08); }
chip('لا توجدُ نقودٌ أصلاً!', 640, 190, 'big', WS(55, 1), WS(55, 5));
// ---------- 56: barter: fish for bread, a jar of oil for papyrus sandals ----------
function sceneBarter(t) { noW(); const a = S0(56) - .2, k1 = ease(ramp(t, WS(56, 2), WS(56, 5))), k2 = ease(ramp(t, WS(56, 6), WS(56, 12)));
  let s = PHDF() + skyP('skB', 'noon', { hz: 470 }) + `<rect x="-300" y="450" width="1880" height="400" fill="url(#phSand)"/><rect x="-300" y="450" width="1880" height="400" fill="#000" filter="url(#phSandT)" opacity=".2"/>`;
  const ex = (cx, A, B, k, i) => { let g = egy(cx - 150, 680, { s: .62, f: 1, i, h: { hF: [cx - 90 + 50 * k, 560], hB: [cx - 110, 590] } }) + egy(cx + 150, 680, { s: .62, f: -1, kind: i % 2 ? 'w' : 'm', i: i + 2, h: { hF: [cx + 90 - 50 * k, 560], hB: [cx + 110, 590] } });
    g += `<g transform="translate(${(cx - 80 + 60 * k).toFixed(1)},555)">${A}</g><g transform="translate(${(cx + 80 - 60 * k).toFixed(1)},555)">${B}</g>`;
    g += `<g opacity="${Math.sin(k * Math.PI).toFixed(2)}"><path d="M${cx - 50},500 Q${cx},470 ${cx + 50},500" stroke="#f4c76b" stroke-width="4" fill="none"/><path d="M${cx + 50},500 l-14,-2 l6,-12Z" fill="#f4c76b"/><path d="M${cx + 50},620 Q${cx},650 ${cx - 50},620" stroke="#f4c76b" stroke-width="4" fill="none"/><path d="M${cx - 50},620 l14,2 l-6,12Z" fill="#f4c76b"/></g>`; return g; };
  s += ex(330, fishP(0, 0, 1.1), breadP(0, 10, 1), k1, 1) + ex(950, jarP(0, 30, .4, { seal: 1 }), sandalP(0, 0, 1), k2, 2);
  s += `<g opacity="${ramp(t, WS(56, 2), WS(56, 2) + .3).toFixed(2)}">${txt(330, 420, 'سمك ⇄ خبز', 1, '#f4c76b', 32)}</g><g opacity="${ramp(t, WS(56, 6), WS(56, 6) + .3).toFixed(2)}">${txt(950, 420, 'زيت ⇄ صندلٌ من البَرْدي', 1, '#f4c76b', 30)}</g>`;
  return s + grain(.08); }
chip('المقايضة', 640, 180, 'big', WS(56, 1), S0(57) - .3);
// ---------- 57: men and women all wear black kohl around the eyes ----------
function bigFace(x, y, s, o = {}) { const sk = o.sk || '#a8704a', f = o.f || 1;
  return `<g transform="translate(${x},${y}) scale(${f * s},${s})"><path d="M-90,120 Q-100,40 -80,-30 Q-60,-110 10,-120 Q80,-118 96,-50 Q104,-20 118,6 Q122,16 108,20 L102,40 Q110,50 100,58 Q106,70 94,80 Q90,110 50,116 L40,160 H-70Z" fill="${sk}"/>` +
    `<path d="M-96,-10 Q-110,-110 0,-132 Q${o.wig ? '90,-130 96,-40 L60,-60 Q20,-80 -10,-60 L-30,40 L-40,150 L-110,150Z' : '70,-128 96,-60 Q60,-90 10,-90 Q-40,-80 -70,-10Z'}" fill="${o.wig ? '#100c0a' : '#15100c'}"/>` +
    `<path d="M36,-30 Q60,-44 86,-30 Q60,-20 36,-30Z" fill="#fff"/><circle cx="62" cy="-31" r="9" fill="#2a1a0e"/><path d="M30,-32 Q60,-52 92,-34 L112,-38" stroke="#0a0806" stroke-width="${o.kohl ? 6 : 2}" fill="none"/><path d="M34,-26 Q62,-14 90,-28 L108,-30" stroke="#0a0806" stroke-width="${o.kohl ? 5 : 1.5}" fill="none"/>` +
    `<path d="M40,-58 Q64,-70 92,-56" stroke="#15100c" stroke-width="7" fill="none"/><path d="M60,74 Q80,80 96,72" stroke="#6a3020" stroke-width="5" fill="none"/>${o.ear !== 0 ? `<ellipse cx="-40" cy="-10" rx="16" ry="24" fill="${sk}"/>` : ''}</g>`; }
function sceneKohl(t) { noW(); const a = S0(57) - .2, k = ease(ramp(t, WS(57, 5), WS(57, 7)));
  let s = PHDF() + skyP('skK', 'noon', { hz: 900 }) + `<rect x="-20" y="-20" width="1320" height="760" fill="#e8d8b8" opacity=".6"/>`;
  s += bigFace(380, 420, 1.6, { kohl: k > .5, sk: '#9c6844' }) + bigFace(900, 420, 1.6, { kohl: k > .5, wig: 1, f: -1, sk: '#b47a52' });
  s += `<g transform="translate(640,560)"><rect x="-26" y="-70" width="52" height="80" rx="10" fill="#d8ccb0"/><rect x="-26" y="-70" width="52" height="80" rx="10" fill="#000" filter="url(#phStoneT)" opacity=".3"/><rect x="-18" y="-82" width="36" height="14" rx="4" fill="#a89878"/><path d="M8,-84 L30,-160" stroke="#3a2a1a" stroke-width="5" stroke-linecap="round"/></g>${txt(640, 600, 'الكُحل', 1, '#3a2410', 28)}`;
  return camMv(s, t, a, S0(58), [1.0, 640, 380], [1.05, 640, 360]) + grain(.08); }
chip('الرجالُ والنساء', 640, 160, '', WS(57, 2), S0(58) - .3);
// ---------- 58: a study suggests kohl may help the eye resist infections (harsh sun, many flies) ----------
function sceneKohlSci(t) { noW(); const a = S0(58) - .2, T = t - a, st = ease(ramp(t, WS(58, 4), WS(58, 6))), sh = ease(ramp(t, WS(58, 12), WS(58, 16))), fl = ramp(t, WS(58, 18), WS(58, 22));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#f0e0c0"/>` + `<circle cx="1120" cy="120" r="200" fill="url(#phGlow)"/><circle cx="1120" cy="120" r="40" fill="#fffdf2"/>`;
  // a big Egyptian eye with kohl
  s += `<g transform="translate(560,400)"><path d="M-300,0 Q0,-190 300,0 Q0,150 -300,0Z" fill="#fff"/><circle cx="0" cy="-10" r="110" fill="#5a3a20"/><circle cx="0" cy="-10" r="52" fill="#120a06"/><circle cx="30" cy="-44" r="18" fill="#fff" opacity=".7"/>` +
    `<path d="M-320,4 Q0,-210 320,0 L420,-10" stroke="#0a0806" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-300,8 Q0,160 300,4 L400,6" stroke="#0a0806" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M-260,-130 Q0,-270 300,-150" stroke="#15100c" stroke-width="20" fill="none"/></g>`;
  // the shield of protection appears; flies bounce off
  s += `<g opacity="${(sh * .8).toFixed(2)}"><path d="M560,190 Q860,250 900,400 Q860,560 560,610 Q260,560 220,400 Q260,250 560,190Z" fill="#7ae08a" opacity=".12" stroke="#7ae08a" stroke-width="4" stroke-dasharray="12 10"/></g>`;
  for (let i = 0; i < 6; i++) { const ang = T * (1.4 + i * .2) + i, R = 380 + Math.sin(T * 3 + i) * 20; s += `<g transform="translate(${(560 + Math.cos(ang) * R).toFixed(1)},${(400 + Math.sin(ang) * R * .55).toFixed(1)})" opacity="${(.4 + .6 * fl).toFixed(2)}"><ellipse rx="8" ry="5" fill="#111"/><ellipse cx="-4" cy="-6" rx="7" ry="4" fill="#cfd8e0" opacity=".7"/></g>`; }
  s += `<g opacity="${st.toFixed(2)}">${darkP(960, 520, 270, 110)}${goldT(1095, 566, 'دراسة (٢٠١٠)', 1, 26, '#fff')}${goldT(1095, 608, 'قد يساعدُ العين', 1, 28)}</g>`;
  return s + grain(.08) + vign(.5); }
chip('ليس للزينةِ فقط', 640, 150, '', WS(58, 0), WS(58, 4)); chip('مقاومةُ الالتهابات', 640, 150, '', WS(58, 12), S0(59) - .3);
// ---------- 59: shaved heads and wigs (against lice and heat) ----------
function sceneWig(t) { noW(); const a = S0(59) - .2, w = ease(ramp(t, WS(59, 4), WS(59, 6)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#3a2a1e"/><rect x="-20" y="-20" width="1320" height="760" fill="url(#phBrick)" opacity=".3"/>`;
  s += egy(560, 700, { s: 1.4, f: 1, kind: 'rich', bald: 1, wig: 0, collar: 1, i: 2 });
  s += `<g opacity="${w.toFixed(2)}">${egy(560, 700, { s: 1.4, f: 1, kind: 'rich', i: 2 })}</g>`;
  s += `<g opacity="${ramp(t, WS(59, 3), WS(59, 3) + .3).toFixed(2)}">${darkP(820, 260, 300, 60)}${goldT(970, 298, 'رأسٌ محلوق', 1, 28)}</g><g opacity="${w.toFixed(2)}">${darkP(820, 340, 300, 60)}${goldT(970, 378, '+ شعرٌ مستعار', 1, 28)}</g>`;
  s += `<g opacity="${ramp(t, WS(59, 7), WS(59, 9)).toFixed(2)}">${darkP(820, 430, 300, 110)}${txt(970, 474, 'لا قمل', 1, '#7ae08a', 26)}${txt(970, 516, 'وأقلُّ حرّاً', 1, '#7ae08a', 26)}</g>`;
  return s + grain(.08) + vign(.6); }
chip('الأغنياء', 360, 160, '', WS(59, 1), S0(60) - .3);
// ---------- 60: a man sits cross-legged, writing on yellow paper ----------
function scribeP(x, y, s, t, o = {}) { const sk = '#a8704a', wr = Math.sin(t * 6) * 4;
  let g = egy(x, y, { s, f: 1, kind: 'scribe', i: 2, sit: 1, h: { hipY: -16, lF: [1.5, -1.55], lB: [1.35, -1.6], noShadow: 1, hF: [x + 96 * s + wr * s, y - 70 * s], hB: [x + 70 * s, y - 60 * s], lookUp: -.5 } });
  g += `<rect x="${x + 30 * s}" y="${y - 64 * s}" width="${110 * s}" height="${14 * s}" fill="url(#phPap)" transform="rotate(-6,${x + 80 * s},${y - 58 * s})"/><path d="M${x + 96 * s + wr * s},${y - 70 * s} l${30 * s},${-34 * s}" stroke="#6a4a2a" stroke-width="${3 * s}"/>`;
  g += `<g transform="translate(${x + 150 * s},${y - 8 * s}) scale(${s})"><rect x="-30" y="-10" width="60" height="12" rx="3" fill="url(#phWood)"/><circle cx="-14" cy="-4" r="5" fill="#1a1a1a"/><circle cx="2" cy="-4" r="5" fill="#a8321e"/></g>`;
  return g; }
function sceneScribeSee(t) { noW(); const a = S0(60) - .2;
  let s = PHDF() + skyP('skC', 'noon', { hz: 420 }) + dunesBack(410, '#dcbc88') + desertP(420, { ripples: 0 }) + pyrP(640, 430, 160, { k: .86, id: 'sc' }) + houseP(-40, 560, 520, 220, { seed: 61, door: .7 }) + houseP(780, 560, 560, 200, { seed: 63, door: .2 }) + `<rect x="-300" y="540" width="1880" height="300" fill="url(#phSand)"/><rect x="-300" y="540" width="1880" height="300" fill="#000" filter="url(#phSandT)" opacity=".2"/>`;
  s += `<path d="M460,420 L900,420 L880,446 L480,446Z" fill="#d8bc7c"/><path d="M480,446 V560 M880,446 V560" stroke="#6a4a2a" stroke-width="5"/>`;
  s += scribeP(600, 640, 1.0, t) + egy(980, 690, { s: .62, f: -1, kind: 'you', h: { lookUp: -.2 } });
  return camMv(s, t, a, CS(6) + .6, [1.0, 640, 380], [1.18, 680, 480]) + grain(.1); }
chip('ورقةٌ صفراء', 640, 180, '', WS(60, 6), CS(6) - .2);
