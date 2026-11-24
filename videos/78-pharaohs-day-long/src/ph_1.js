// ===================== intro + chapter 1 (dawn) =====================
// the globe turned to a longitude, with lat/lon -> screen (1280x720)
function gEg(t, o = {}) { const az = o.az ?? .3, el = o.el ?? .45, d = o.d ?? 8, tg = o.tg || [0, 0, 0], cam = orbit(d, el, az, tg, o.fov ?? 30), spin = az + (181 - (o.lon ?? 31)) * Math.PI / 180;  // calibrated on gl3d_ph.js (un-mirrored)
  F.w = { set: 'space', cam, L: o.L || sunFor(az, o.off ?? -.5, o.up ?? .45), disc: { m: 1, spin, clouds: o.clouds ?? .4, sunI: o.sunI ?? 1, lights: o.lights ?? .3, ice: 0, amb: o.amb || 0, atm: 1 } };
  // the facing longitude sits at the camera's azimuth; a place on that meridian at latitude la:
  const P = (la, lo, h = 1) => { const f = la * Math.PI / 180, b = az + ((o.lon ?? 31) - lo) * Math.PI / 180 * -1; return proj3w(cam, [h * Math.cos(f) * Math.sin(b), h * Math.sin(f), h * Math.cos(f) * Math.cos(b)]); }; return { cam, P }; }
// a golden pin with a label at a screen point
const pinP = (x, y, tx, a = 1, fs = 26) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="16" fill="#f4c76b" opacity=".3"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="#f4c76b" stroke="#fff" stroke-width="2"/>` + txt(x + 0, y - 26, tx, 1, '#fff', fs) + `</g>`;
// the build site, wide (used in the hook and chapter 3)
function siteP(t, o = {}) { const k = o.k ?? .84, px = o.px ?? 760, pb = o.pb ?? 470, pw = o.pw ?? 560;
  let s = skyP('skS', o.sky || 'noon', { sun: o.sun || [1080, 200, 1, 30], hz: 520 }) + dunesBack(440, '#dfc18c', .9) + pyrP(px - 520, pb - 6, 150, { k: .35, id: 's2' }) + pyrP(px, pb, pw, { k, id: 's1' }) + rampP(px, pb, pw, k);
  const h = pw * .636 * k, hw = pw / 2, x0 = px - hw - pw * .38, x1 = px - hw * (1 - k) - 4;
  for (let i = 0; i < 26; i++) { const u = pmod(i / 26 + t * .012, 1); s += antP(lerp(x0, x1, u), lerp(pb, pb - h + 6, u), .9, 1, t, i); }
  for (let i = 0; i < 7; i++) s += antP(px - hw * (1 - k) * .75 + i * hw * (1 - k) * .25, pb - h - 4, .75, i % 2 ? 1 : -1, t, i + 3);
  s += desertP(pb, { seed: 4 }) + heatP(pb + 6, .22);
  // groups of tiny pullers with blocks on the plain
  [[150, 548, .8], [520, 556, .9]].forEach(([x, y, sc], g) => { s += `<g transform="translate(${x},${y}) scale(${sc})">${sledgeP(-34, 0, 40)}${blockP(-32, -22, 34, 20)}<path d="M8,-6 L90,-12" stroke="#c8a878" stroke-width="1.2"/>`;
    for (let i = 0; i < 6; i++) s += antP(22 + i * 12, -2 - i * .9, .85, 1, t * .4, i + g * 7); s += `</g>`; });
  return s; }
// ---------- 0-1: you open your eyes; the white mountain and the haulers ----------
function sceneHook(t) { noW();
  const lid = 1 - ease(ramp(t, .15, 1.5)), blur = 1 - ramp(t, .6, 2.2);
  let s = PHDF() + siteP(t) + dustP(t, .35);
  // near team: a block on a sledge with pullers and the water man
  const T = t, sx = 300 + T * 4;
  s += wetP(sx + 236, 668, 70, 1) + sledgeP(sx, 666, 190) + blockP(sx + 10, 572, 170, 92);
  const hands = []; for (let i = 0; i < 6; i++) { const x = sx + 400 + i * 74, y = 690 - i; hands.push([x + 62 * .52, y - 160 * .52]); }
  s += `<path d="M${sx + 196},648 L${hands[0][0]},${hands[0][1]}` + hands.map(h => ` L${h[0].toFixed(1)},${h[1].toFixed(1)}`).join('') + ` l40,-2" stroke="#c8a070" stroke-width="3.4" fill="none"/>`;
  for (let i = 5; i >= 0; i--) { const x = sx + 400 + i * 74, y = 690 - i; s += egy(x, y, { s: .52, f: 1, i, h: { walk: T * 2.2 + i * 1.3, amp: .34, lean: 18, hF: hands[i], hB: [hands[i][0] - 18, hands[i][1] + 2], bendF: 1, bendB: 1 } }); }
  s += egy(sx + 300, 688, { s: .54, f: -1, i: 4, h: { hF: [sx + 268, 600], hB: [sx + 284, 628], lean: 8 } }) + `<g transform="translate(${sx + 262},${604}) rotate(-62)">${jarP(0, 0, .36)}</g>` + pourP(sx + 238, 606, sx + 236, 664, t);
  s = camMv(s, t, 0, S0(2), [1.28, 700, 470], [1.0, 640, 360]);
  s += `<rect x="-20" y="-20" width="1320" height="760" fill="#fff6e0" opacity="${(.4 * blur).toFixed(2)}"/>` + grain(.1);
  if (lid > 0) s += `<rect x="-20" y="-20" width="1320" height="${(380 * lid).toFixed(1)}" fill="#000"/><rect x="-20" y="${(740 - 380 * lid).toFixed(1)}" width="1320" height="400" fill="#000"/>`;
  // the shine of the white face
  const g = ease(ramp(t, WS(1, 2), WS(1, 4))) * (1 - ramp(t, WS(1, 6), WS(1, 8)));
  if (g > 0) s += `<g opacity="${g.toFixed(2)}"><circle cx="700" cy="380" r="160" fill="url(#phGlow)"/><path d="M700,300 V460 M620,380 H780" stroke="#fff" stroke-width="3" opacity=".8"/></g>`;
  return s; }
chip('حجرٌ أثقلُ من سيارة', 640, 640, '', WS(1, 9), S0(2) - .3);
// ---------- 2: Egypt, 4,500 years ago (the globe) ----------
function sceneGlobe(t) { const a = S0(2) - .2, k = ease(ramp(t, a, a + 3.2));
  const G = gEg(t, { d: lerp(9.5, 5.2, k), el: .5, az: .3 + t * .01, lon: 31 - 40 * (1 - k), clouds: .3 }), p = G.P(29.98, 31.13, 1.004), q = ease(ramp(t, WS(2, 3), WS(2, 3) + .5));
  F.ov = pinP(p[0], p[1], 'مصر', q, 30);
  return spaceW(t, { mw: .25 }); }
chip('قبلَ ٤٥٠٠ سنة', 640, 610, 'big', WS(2, 4), S0(3) - .3);
// ---------- 3: one day only (the sun crosses the sky over the plateau) ----------
function sceneOneDay(t) { noW(); const a = S0(3) - .2, u = ramp(t, a, S0(4) + .6), ang = Math.PI * (1 - u), sx = 640 + Math.cos(ang) * 520, sy = 560 - Math.sin(ang) * 380;
  const night = clamp(1 - Math.sin(ang) * 2.2);
  const sk = [mix('#3f7fc0', '#0a1230', night), mix('#9cc4e4', '#c8704a', night), mix('#efe0c0', '#f4b060', night)];
  let s = PHDF() + skyP('skD', sk, { sun: [sx, sy, 1, 26], hz: 560 }) + starsP(t, night * .6, 520);
  s += `<path d="M${640 - 520},560 A520,380 0 0 1 ${640 + 520},560" stroke="#f4c76b" stroke-width="2" stroke-dasharray="8 8" fill="none" opacity=".55"/>`;
  s += dunesBack(520, mix('#dcbc88', '#6a5040', night)) + pyrP(640, 560, 420, { k: .84, id: 'od', lit: 1 - night }) + rampP(640, 560, 420, .84) + desertP(560, { col: mix('#d8b47c', '#5a4030', night) });
  s += `<rect x="-20" y="-20" width="1320" height="760" fill="#100a20" opacity="${(night * .35).toFixed(2)}"/>`;
  return s + grain(.1); }
chip('يومٌ واحدٌ فقط', 640, 640, 'big', WS(3, 0), S0(4) - .3);
// ---------- 4: a secret about this white mountain ----------
function sceneSecret(t) { noW(); const a = S0(4) - .2, q = ease(ramp(t, WS(4, 5), WS(4, 8)));
  let s = PHDF() + skyP('skQ', ['#1a1430', '#7a4a5a', '#e8a070'], { sun: [1040, 560, 1, 30, '#ffe8b8'], hz: 560 }) + dunesBack(520, '#9a7050') + pyrP(560, 580, 600, { tip: 1, id: 'q', lit: .6 }) + desertP(580, { col: '#8a6444' });
  s += `<rect x="-20" y="-20" width="1320" height="760" fill="#1a0e20" opacity=".25"/>`;
  s = camMv(s, t, a, S0(5), [1, 640, 360], [1.12, 600, 380]);
  s += `<g opacity="${q.toFixed(2)}"><circle cx="560" cy="300" r="230" fill="url(#phGlow)" opacity=".55"/><text x="560" y="390" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${(200 + 30 * q).toFixed(0)}" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>`;
  return s + grain(.1); }
chip('سرٌّ لا يعرفُه أكثرُ الناس', 640, 640, '', WS(4, 9), CS(1) - .2);
// ======== chapter 1: dawn ========
// the village roofs at dawn; you wake up on a reed mat
function roofs(t, wake, o = {}) { const sk = o.sky || 'dawn';
  let s = skyP('skR', sk, { sun: o.sun || [260, 452, .95, 26, '#fff0c8'], hz: 470 }) + starsP(t, o.st || 0, 400) + dunesBack(452, '#c8a070', .85) + pyrP(1060, 470, 300, { k: .84, id: 'rf', lit: .6 }) + palmP(80, 520, 240, t) + palmP(150, 520, 200, t);
  s += desertP(500, { col: '#c8a070', ripples: 0 }) + houseP(-40, 560, 280, 130, { seed: 7, door: 0 }) + houseP(980, 560, 360, 150, { seed: 8, door: 0 });
  // two neighbours asleep on their roofs
  s += `<rect x="60" y="420" width="160" height="12" rx="4" fill="#c8a868"/>` + egy(170, 426, { s: .3, f: 1, i: 3, h: { rot: -90, lF: [0, 0], lB: [0, 0], noShadow: 1, closed: 1 } }) + `<rect x="1040" y="400" width="170" height="12" rx="4" fill="#c8a868"/>` + egy(1080, 406, { s: .32, f: 1, i: 5, kind: 'w', h: { rot: -90, lF: [0, 0], lB: [0, 0], noShadow: 1, closed: 1 } });
  // lower roofs of the village, then our roof (front)
  s += `<rect x="-300" y="556" width="1880" height="300" fill="#9a7650"/>` + houseP(250, 610, 300, 70, { seed: 11, door: 0 }) + houseP(700, 606, 260, 60, { seed: 12, door: 0 });
  s += `<rect x="-300" y="600" width="1880" height="200" fill="url(#phMud)"/><rect x="-300" y="600" width="1880" height="200" fill="url(#phBrick)"/><rect x="-300" y="588" width="1880" height="16" fill="#c49a6c"/><rect x="-300" y="602" width="1880" height="6" fill="#000" opacity=".2"/>`;
  s += `<rect x="360" y="560" width="400" height="34" rx="6" fill="#d8bc7c"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${370 + i * 19.5},562 v30" stroke="#a88a4a" stroke-width="2"/>`).join('') + headrestP(410, 568, .22);
  // you: lying, then sitting up and looking at the horizon
  const lay = 1 - wake;
  s += egy(lerp(470, 520, wake), 580, { s: .62, f: 1, kind: 'you', sit: wake > .5 ? 1 : 0, h: { rot: -90 * lay, pv: -60 * lay, noShadow: 1, closed: wake < .5 ? 1 : 0, hipY: lerp(-150, -18, wake), lF: [lerp(0, 1.5, wake), lerp(0, 1.45, wake)], lB: [lerp(0, 1.42, wake), lerp(0, 1.4, wake)], lookUp: .1 * wake, aF: [.3, .9], aB: [.2, .6] } });
  s += jarP(820, 590, .5) + `<ellipse cx="900" cy="590" rx="40" ry="8" fill="#9a6a3a"/>` + breadP(900, 586, .5);
  return s; }
function sceneRoof(t) { noW(); const w = ease(ramp(t, WS(5, 1), WS(5, 4)));
  let s = PHDF() + roofs(t, w) + `<rect x="-20" y="-20" width="1320" height="760" fill="#ffb070" opacity=".06"/>`;
  return camMv(s, t, CS(1), S0(6), [1.08, 640, 400], [1.0, 640, 360]) + grain(.1); }
chip('النومُ فوقَ السطح', 640, 660, '', WS(5, 9), S0(6) - .3);
// 6: the wooden headrest
function sceneHeadrest(t) { noW(); const a = S0(6) - .2, lift = ease(ramp(t, WS(6, 6), WS(6, 9)));
  let s = PHDF() + skyP('skH', 'dawn', { hz: 900 }) + `<rect x="-20" y="440" width="1320" height="400" fill="#b88c5c"/><rect x="-20" y="440" width="1320" height="400" fill="url(#phBrick)"/>`;
  s += `<rect x="120" y="470" width="1040" height="60" rx="10" fill="#d8bc7c"/>` + Array.from({ length: 52 }, (_, i) => `<path d="M${130 + i * 20},472 v56" stroke="#a88a4a" stroke-width="2.4"/>`).join('');
  s += `<rect x="200" y="452" width="300" height="30" rx="12" fill="#efe6d0"/><path d="M210,470 Q350,456 490,470" stroke="#c8bca0" stroke-width="2" fill="none"/>`;
  s += headrestP(700, 500, 1.15);
  // the head rises from the rest
  s += goldT(700, 640, 'مِسنَدٌ من الخشب', ramp(t, WS(6, 6), WS(6, 6) + .4), 34);
  return camMv(s, t, a, S0(7), [1, 640, 360], [1.08, 700, 400]) + grain(.1); }
chip('لا وسادة', 640, 180, 'red', WS(6, 3), S0(7) - .3);
// 7: inside the mud-brick house (cut-away): small rooms, mud brick, high narrow windows
function sceneHouse(t) { noW(); const a = S0(7) - .2, T = t - a, l1 = ramp(t, WS(7, 4), WS(7, 4) + .4), l2 = ramp(t, WS(7, 8), WS(7, 8) + .4);
  let s = PHDF() + skyP('skI', 'day', { hz: 300 }) + `<rect x="-20" y="280" width="1320" height="460" fill="#c8a070"/>`;
  // outer walls and two rooms
  s += `<rect x="90" y="170" width="1100" height="440" fill="#5a4028"/><rect x="110" y="190" width="1060" height="400" fill="#c49a6c"/><rect x="110" y="190" width="1060" height="400" fill="url(#phBrick)"/><rect x="110" y="190" width="1060" height="400" fill="#fff" filter="url(#wallI)" opacity=".3"/>`;
  s += `<rect x="560" y="190" width="26" height="400" fill="#8a6440"/><rect x="560" y="420" width="26" height="170" fill="#3a2414"/>`; // inner wall with a doorway
  s += `<rect x="110" y="190" width="1060" height="60" fill="#000" opacity=".22"/>`; // ceiling shadow
  // ceiling beams and palm-rib roof
  s += Array.from({ length: 14 }, (_, i) => `<rect x="${110 + i * 78}" y="172" width="16" height="22" fill="#6a4426"/>`).join('') + `<rect x="90" y="150" width="1100" height="24" fill="#8a6a44"/>`;
  // high windows with light shafts
  [[300, 220], [860, 220]].forEach(([wx, wy], i) => { s += `<rect x="${wx}" y="${wy}" width="64" height="30" fill="#ffe8b0"/><path d="M${wx + 20},${wy} v30 M${wx + 42},${wy} v30" stroke="#6a4426" stroke-width="5"/>` +
    `<path d="M${wx},${wy + 30} L${wx + 64},${wy + 30} L${wx + 230},590 L${wx + 120},590Z" fill="#fff2c0" opacity="${(.22 + .04 * Math.sin(T + i)).toFixed(2)}"/><ellipse cx="${wx + 175}" cy="590" rx="70" ry="10" fill="#fff2c0" opacity=".35"/>`; });
  // stairs to the roof (right room)
  s += Array.from({ length: 9 }, (_, i) => `<rect x="${1010 + i * 0}" y="${590 - (i + 1) * 40}" width="${160 - i * 16}" height="40" fill="${mix('#b08458', '#7a5434', i / 12)}"/>`).join('');
  // things in the rooms: jars, a mat, a hearth, a stool
  s += jarP(170, 590, .7) + jarP(230, 590, .6, { seal: 1 }) + `<rect x="320" y="572" width="180" height="16" rx="4" fill="#d8bc7c"/>` + `<ellipse cx="760" cy="586" rx="56" ry="10" fill="#3a2a1a"/>` + fireP(760, 584, t, .5) + smokeP(760, 560, t, 300, .35);
  s += egy(660, 590, { s: .66, f: 1, kind: 'w', i: 1, h: { hF: [730, 520], hB: [712, 528], lean: 10 } }) + egy(440, 590, { s: .66, f: 1, kind: 'you', h: { walk: T * 2.4, amp: .5 } }).replace(/^/, '');
  s += `<g opacity="${l1.toFixed(2)}">${darkP(150, 620, 300, 56)}${goldT(300, 657, 'جدرانٌ من الطوبِ اللَّبِن', 1, 24)}</g><g opacity="${l2.toFixed(2)}">${darkP(820, 620, 300, 56)}${goldT(970, 657, 'نوافذُ ضيّقةٌ عالية', 1, 24)}</g>`;
  return camMv(s, t, a, S0(8), [1.0, 640, 380], [1.05, 600, 380]) + grain(.1); }
// 8-9: breakfast: bread, onions and beer
function sceneBreakfast(t) { noW(); const a = S0(8) - .2, k1 = ramp(t, WS(8, 1), WS(8, 1) + .4), k2 = ramp(t, WS(8, 2), WS(8, 2) + .4), k3 = ramp(t, WS(8, 4), WS(8, 4) + .4), th = ease(ramp(t, WS(9, 4), WS(9, 6)));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#6a4a30"/><rect x="-20" y="-20" width="1320" height="760" fill="url(#phBrick)" opacity=".7"/><rect x="-20" y="430" width="1320" height="320" fill="#a88058"/>`;
  s += `<ellipse cx="640" cy="560" rx="470" ry="96" fill="#000" opacity=".25" filter="url(#phB4)"/><ellipse cx="640" cy="540" rx="460" ry="92" fill="#d8bc7c"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M${200 + i * 30},${470 + Math.abs(i - 15) * 2} v${130 - Math.abs(i - 15) * 4}" stroke="#a88a4a" stroke-width="2" opacity=".6"/>`).join('');
  s += `<g opacity="${k1.toFixed(2)}">${breadP(300, 550, 2.3)}${breadP(440, 580, 2)}${breadP(380, 500, 1.8, 'cone')}</g>`;
  s += `<g opacity="${k2.toFixed(2)}">${onionP(580, 560, 2.2)}${onionP(660, 540, 1.8)}${onionP(640, 600, 1.7)}</g>`;
  s += `<g opacity="${k3.toFixed(2)}">${jarP(860, 590, 1.6)}<ellipse cx="1010" cy="575" rx="70" ry="22" fill="#8a5232"/><ellipse cx="1010" cy="566" rx="62" ry="16" fill="${mix('#c8a050', '#9a7a3a', th)}"/>` +
    Array.from({ length: 9 }, (_, i) => `<circle cx="${980 + (i * 37) % 60}" cy="${560 + (i * 13) % 12}" r="${2 + (i % 3)}" fill="#e8d098" opacity="${(.4 + th * .5).toFixed(2)}"/>`).join('') + `<path d="M1040,566 L1110,470" stroke="#c8a860" stroke-width="6" stroke-linecap="round"/></g>`;
  s += `<g opacity="${(k1 * ramp(t, WS(8, 1), WS(8, 1) + .3)).toFixed(2)}">${txt(370, 650, 'خبز', 1, '#f4c76b', 34)}</g><g opacity="${k2.toFixed(2)}">${txt(620, 660, 'بصل', 1, '#f4c76b', 34)}</g><g opacity="${k3.toFixed(2)}">${txt(940, 660, 'جِعة', 1, '#f4c76b', 34)}</g>`;
  return camMv(s, t, a, S0(10), [1.0, 640, 380], [1.06, 700, 420]) + grain(.1) + vign(.8); }
chip('شرابٌ يوميّ', 330, 220, '', WS(9, 2), S0(10) - .3); chip('كثيفةٌ كالحَساء', 640, 220, '', WS(9, 4), S0(10) - .3); chip('قليلةُ الكحول', 950, 220, '', WS(9, 6), S0(10) - .3);
// 10-11: biting the bread: sand! and the grinding stone
function sceneBite(t) { noW(); const a = S0(10) - .2, crunch = ramp(t, WS(10, 2), WS(10, 3)), q = ease(ramp(t, S0(11) - .2, S0(11) + .6));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#3a2818"/>`;
  // the loaf with a bite and glinting grains
  s += `<g transform="translate(${lerp(640, 330, q)},${lerp(400, 420, q)}) scale(${lerp(4.2, 2.6, q)})">${breadP(0, 30, 1)}<path d="M18,-18 q6,8 14,6 q-2,10 4,14 L32,4 Q24,6 18,-18Z" fill="#3a2818"/></g>`;
  const r = RS(12); for (let i = 0; i < 26; i++) { const x = lerp(700, 380, q) + (r() - .5) * 120, y = lerp(370, 400, q) + (r() - .5) * 90, f = Math.sin(t * 9 + i) > .6 ? 1 : .4; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.6 + r() * 2).toFixed(1)}" fill="#fff3c8" opacity="${(crunch * f).toFixed(2)}"/>`; }
  if (crunch > 0 && crunch < 1) s += `<g opacity="${(Math.sin(crunch * Math.PI)).toFixed(2)}">${txt(840, 300, 'كَرْش!', 1, '#fff', 54)}</g>`;
  // the saddle quern with a woman grinding: grit flies into the flour
  if (q > 0) { const T = t - S0(11), push = Math.sin(T * 3.2) * 30;
    let g = `<rect x="0" y="0" width="560" height="420" fill="#c8a070"/><rect x="0" y="0" width="560" height="240" fill="#a07850"/><rect x="0" y="0" width="560" height="240" fill="url(#phBrick)"/>` +
      `<path d="M150,330 Q300,290 470,320 L480,360 Q300,380 140,370Z" fill="#8a8078"/><path d="M150,330 Q300,290 470,320" stroke="#b8b0a6" stroke-width="5" fill="none"/>` +
      `<rect x="${(250 + push).toFixed(1)}" y="298" width="110" height="34" rx="16" fill="#9a9088"/><ellipse cx="${(305 + push).toFixed(1)}" cy="302" rx="50" ry="8" fill="#c8c0b6" opacity=".5"/><ellipse cx="460" cy="372" rx="60" ry="14" fill="#efe6d4"/>` +
      egy(150, 372, { s: .8, f: 1, kind: 'w', i: 2, dl: 74, h: { hipY: -80, lF: [.15, -1.5], lB: [.05, -1.55], lean: 30 + push * .2, hF: [270 + push, 304], hB: [256 + push, 310], noShadow: 1 } });
    for (let i = 0; i < 14; i++) { const u = pmod(T * 1.3 + i / 14, 1); g += `<circle cx="${(360 + push * .5 + u * 90 + (i % 4) * 6).toFixed(1)}" cy="${(320 - Math.sin(u * Math.PI) * 50 + u * 40).toFixed(1)}" r="${(1.5 + (i % 3)).toFixed(1)}" fill="${i % 3 ? '#6a5a4a' : '#d8c8a8'}"/>`; }
    s += frameP(640, 170, 560, 420, `<g transform="translate(640,170)">${g}</g>`, 'qn', q) + `<g opacity="${q.toFixed(2)}">${darkP(680, 600, 480, 56)}${goldT(920, 638, 'رملٌ وحجرٌ يدخلانِ الدقيق', 1, 26)}</g>`; }
  return s + grain(.12) + vign(.8); }
chip('رمل!', 330, 200, 'red', WS(11, 0), S0(12) - .3);
// 12-13: the teeth of mummies, worn flat
function molar(x, y, s, worn) { const top = lerp(-60, -20, worn);
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-46,${top} Q-50,10 -40,40 Q-36,90 -24,120 Q-16,128 -10,100 Q-4,60 0,58 Q4,60 10,100 Q16,128 24,120 Q36,90 40,40 Q50,10 46,${top}Z" fill="#efe6d0"/>` +
    (worn < .5 ? `<path d="M-46,-60 Q-30,-84 -16,-62 Q0,-82 16,-62 Q30,-84 46,-60" fill="#efe6d0"/><path d="M-30,-66 q14,10 28,0 q14,10 28,0" stroke="#c8b898" stroke-width="3" fill="none"/>` : `<path d="M-46,${top} H46" stroke="#a89070" stroke-width="5"/><ellipse cx="0" cy="${top + 8}" rx="30" ry="9" fill="#c8a870"/><ellipse cx="0" cy="${top + 8}" rx="14" ry="5" fill="#a87a4a"/>`) +
    `<path d="M-38,0 Q-40,60 -24,110" stroke="#000" stroke-width="10" fill="none" opacity=".08"/></g>`; }
function sceneTeeth(t) { noW(); const a = S0(12) - .2, w = ease(ramp(t, WS(12, 3), WS(12, 5))), d = ease(ramp(t, S0(13) - .1, S0(13) + .6));
  let s = PHDF() + `<rect x="-20" y="-20" width="1320" height="760" fill="#121826"/><circle cx="640" cy="400" r="360" fill="#2a3448" opacity=".6" filter="url(#phSm)"/>`;
  s += darkP(220, 180, 360, 470) + darkP(700, 180, 360, 470) + molar(400, 380, 1.5, 0) + molar(880, 380, 1.5, w);
  s += txt(400, 622, 'سنٌّ سليمة', 1, '#fff', 30) + txt(880, 622, 'سنُّ مومياء', 1, '#f4c76b', 30) + `<g opacity="${w.toFixed(2)}">${txt(880, 236, 'ممسوحةٌ ومتآكلة', 1, '#ff9a7a', 28)}</g>`;
  if (d > 0) s += `<rect x="-20" y="-20" width="1320" height="760" fill="#04070c" opacity="${(d * .9).toFixed(2)}"/><g opacity="${d.toFixed(2)}"><ellipse cx="640" cy="430" rx="260" ry="40" fill="#1a3a4a" opacity=".8" filter="url(#phB4)"/><ellipse cx="580" cy="412" rx="22" ry="14" fill="#3a4826"/><ellipse cx="700" cy="412" rx="22" ry="14" fill="#3a4826"/><circle cx="584" cy="406" r="9" fill="#e8c040"/><circle cx="704" cy="406" r="9" fill="#e8c040"/><path d="M584,398 v16 M704,398 v16" stroke="#000" stroke-width="3.4"/><path d="M440,432 Q640,446 840,432" stroke="#9ac8d8" stroke-width="2" fill="none" opacity=".6"/></g>`;
  return s + grain(.1); }
chip('حتى عندَ الشباب', 880, 168, 'red', WS(12, 8), S0(13) - .3);
chip('ليست أسوأَ مفاجأة', 640, 620, 'red', WS(13, 1), CS(2) - .2);
