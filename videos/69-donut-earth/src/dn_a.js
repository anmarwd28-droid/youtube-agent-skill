// dn_a.js (#69): what if the Earth were shaped like a doughnut? Scenes, chips, list.
// 3D: gl3d_dn.js draws w.torus (major radius 1, tube .5) with the real Earth texture; rx = -PI/2 puts the hole's axis upright.
const DNL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arD = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// a point on the torus surface (u around the ring, v around the tube; v = 0 outer equator, PI/2 top) after rx = -PI/2
const torP = (u, v, h = 1) => { const r = 1 + .5 * h * Math.cos(v); return [r * Math.cos(u), .5 * h * Math.sin(v), -r * Math.sin(u)]; };
function torW(t, o = {}) {
  const cam = orbit((o.d ?? 6.4) * 2.0, o.el ?? .5, o.az ?? .2, o.tg || [0, -.15, 0], 30);
  F.w = { set: 'space', cam, L: o.L || [-.6, .55, .7], torus: { rx: -Math.PI / 2 + (o.tilt || 0), spin: o.spin ?? t * .02, lights: o.lights ?? .5, crack: o.crack || 0, hot: o.hot || 0 } };
  if (o.sun) F.w.sun = o.sun;
  F.earth = F.moon = F.sun = null; return cam;
}
// ---------- 0: hook: the round Earth turns into a doughnut in a flash ----------
function sceneHook(t) {
  const sw = WS(0, 3) - .1, fl = clamp(1 - Math.abs(t - sw) / .35);
  if (t < sw) glE(t, { d: 9.8, el: .3, lon: 20 + t * 8, clouds: .45, lights: .3, tg: [0, -.3, 0] });
  else torW(t, { d: lerp(8.4, 6.6, ease(clamp((t - sw) / 2))), spin: t * .03 });
  F.ov = scr(`<defs><radialGradient id="flG"><stop offset="0" stop-color="#fff8e8" stop-opacity="1"/><stop offset=".45" stop-color="#fff0d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff0d0" stop-opacity="0"/></radialGradient></defs><circle cx="360" cy="${t < sw ? 760 : 740}" r="${(170 + 190 * fl).toFixed(1)}" fill="url(#flG)" opacity="${(.9 * fl).toFixed(2)}"/>`);
  return space(t);
}
// ---------- 1: a planet with a big hole in the middle; to keep this shape it must spin very fast ----------
function spinArrow(cam, a0, a1, rad, y, a) { let d = ''; for (let i = 0; i <= 30; i++) { const u = lerp(a0, a1, i / 30), [x, yy] = proj3(cam, [Math.cos(u) * rad, y, -Math.sin(u) * rad]); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + yy.toFixed(1); }
  const [xe, ye] = proj3(cam, [Math.cos(a1) * rad, y, -Math.sin(a1) * rad]), [xp, yp] = proj3(cam, [Math.cos(a1 - .08) * rad, y, -Math.sin(a1 - .08) * rad]), an = Math.atan2(ye - yp, xe - xp);
  return `<g opacity="${a.toFixed(2)}"><path d="${d}" stroke="#f4c76b" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${(xe + Math.cos(an) * 18).toFixed(1)},${(ye + Math.sin(an) * 18).toFixed(1)} L${(xe + Math.cos(an + 2.5) * 18).toFixed(1)},${(ye + Math.sin(an + 2.5) * 18).toFixed(1)} L${(xe + Math.cos(an - 2.5) * 18).toFixed(1)},${(ye + Math.sin(an - 2.5) * 18).toFixed(1)}Z" fill="#f4c76b"/></g>`; }
function sceneSpin(t) {
  const T = t - (S0(1) - .2), sp = ease(ramp(t, WS(1, 9), WS(1, 12) + .3)), hl = ease(ramp(t, WS(1, 1), WS(1, 3)));
  const cam = torW(t, { d: 6.6, el: .62, spin: .1 + T * (.02 + .12 * sp) });
  const [hx, hy] = proj3(cam, [0, 0, 0]);
  let ov = DNL(hx, hy + 10, 'الثقب', hl, '#fff', 30);
  ov += spinArrow(cam, -.4 + T * .9 * sp, .9 + T * .9 * sp, 1.8, 0, sp) + spinArrow(cam, 2.8 + T * .9 * sp, 4.1 + T * .9 * sp, 1.8, 0, sp);
  F.ov = ov; return space(t);
}
// ---------- 2: a whole day is under 3 hours; the sun rises and sets more than 8 times in one of our days ----------
function sceneDay(t) {
  const T = t - (S0(2) - .2), k = ease(ramp(t, WS(2, 2), WS(2, 5))), n = Math.min(8, Math.floor(clamp((t - WS(2, 8)) / (S0(3) - .6 - WS(2, 8))) * 8.99));
  torW(t, { d: 7.2, el: .3, spin: T * .35, L: [-1, .25, .35], lights: .8 });
  let ov = `<g opacity="${k.toFixed(2)}">${panel(200, 960, 320, 230)}${dialF(300, 1070, 70, 12, (T * 6 * 60) % 60, {})}<text x="455" y="1086" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4c76b">٢٫٨</text>${DNL(455, 1124, 'ساعة', 1, '#fff', 22)}${DNL(360, 1172, 'يومٌ كامل', 1, '#fff', 24)}</g>`;
  if (t > WS(2, 8)) { let s = ''; for (let i = 0; i < 8; i++) s += `<g opacity="${i < n ? 1 : .2}"><circle cx="${126 + i * 67}" cy="480" r="20" fill="#f4c040"/><path d="M${100 + i * 67},486 h52" stroke="#0a0e1c" stroke-width="12"/></g>`; ov += `${panel(90, 430, 540, 110)}${s}${DNL(360, 530, `${arD(n)} شروق`, 1, '#fff', 24)}`; }
  F.ov = ov; return space(t);
}
// ---------- 3: gravity changes: about two thirds of ours at the poles, under a third at the equator ----------
function sceneGrav(t) {
  const T = t - (S0(3) - .2), p = ease(ramp(t, WS(3, 5), WS(3, 7))), e = ease(ramp(t, WS(3, 10), WS(3, 13)));
  const cam = torW(t, { d: 6.6, el: .42, spin: .4 + T * .05 });
  const pin = (P, tx, a, col) => { if (a <= 0) return ''; const [x, y] = proj3(cam, P); return `<g opacity="${a.toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="${col}" stroke="#0a0e1c" stroke-width="3"/><path d="M${x.toFixed(1)},${(y - 10).toFixed(1)} V${(y - 70).toFixed(1)}" stroke="${col}" stroke-width="3"/>${DNL(x, y - 84, tx, 1, col, 26)}</g>`; };
  // the top ring = "pole", the outer rim = "equator"; a glowing line marks each
  let ln = ''; [[Math.PI / 2, '#7ac8ff', p], [0, '#ffb07a', e]].forEach(([v, col, a]) => { if (a <= 0) return; let d = ''; for (let i = 0; i <= 80; i++) { const u = i / 80 * 6.283, P = torP(u, v, 1.01), [x, y] = proj3(cam, P), back = Math.sin(u) > .05 && v === 0; d += (i && !back ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); } ln += `<path d="${d}" stroke="${col}" stroke-width="4" fill="none" opacity="${(.85 * a).toFixed(2)}" stroke-dasharray="10 8"/>`; });
  let ov = ln + pin(torP(-.9, Math.PI / 2, 1.01), 'القطب: ٠٫٦٥ ج', p, '#7ac8ff') + pin(torP(-.5, 0, 1.01), 'الاستواء: أقلّ من ٠٫٣ ج', e, '#ffb07a');
  ov += `${panel(240, 1060, 240, 110)}<text x="360" y="1130" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#fff">الأرض: ١ ج</text>`;
  F.ov = ov; return space(t);
}
// ---------- 4: jump there and you rise more than three times as high ----------
function sceneJump(t) {
  const T = t - (S0(4) - .2), ph = pmod(T * .55, 1), up = Math.sin(ph * Math.PI);
  let s = `<defs>${LDEFS()}</defs><linearGradient id="jmS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset="1" stop-color="#c8dcec"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#jmS)"/>`;
  // the arch of the far side of the ring in the sky (faint), grass, two people
  s += `<path d="M-40,1000 Q360,-200 760,1000" stroke="#d8e4f0" stroke-width="70" fill="none" opacity=".35"/><path d="M-40,1000 Q360,-200 760,1000" stroke="#8aa8c8" stroke-width="30" fill="none" opacity=".3"/>`;
  s += mountainsR(1000, 110, 33, { snowAt: .7, rock: '#6a7a8a' }) + `<rect x="-20" y="1000" width="760" height="300" fill="#6a9a4a"/><rect x="-20" y="1000" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  const h1 = 60 * up, h2 = 200 * up;
  s += `<ellipse cx="170" cy="1132" rx="${(50 - 20 * up).toFixed(1)}" ry="8" fill="#000" opacity=".3"/>` + hero(170, 1130 - h1, Object.assign({ s: .8, face: 1, shade: 1, noShadow: 1, air: 1, aF: [-1.3 * up, .5], aB: [-1.1 * up, .5] }, gp(1)));
  s += `<ellipse cx="430" cy="1132" rx="${(50 - 30 * up).toFixed(1)}" ry="8" fill="#000" opacity=".3"/>` + hero(430, 1130 - h2, Object.assign({ s: .8, face: -1, shade: 1, noShadow: 1, air: 1, aF: [-1.3 * up, .5], aB: [-1.1 * up, .5] }, gp(3)));
  s += `<path d="M80,1130 V${1130 - 60}" stroke="#fff" stroke-width="4"/><path d="M530,1130 V${1130 - 200}" stroke="#f4c76b" stroke-width="4"/>` + DNL(170, 1200, 'الأرض اليوم', 1, '#fff', 24) + DNL(430, 1200, 'الأرض الدونات', 1, '#f4c76b', 24) + DNL(530, 900, '×٣+', 1, '#f4c76b', 38);
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: from inside the hole, the far side of the planet hangs above you: a giant arch of mountains and seas ----------
function sceneArch(t) {
  const T = t - (S0(5) - .2), k = ease(ramp(t, S0(5), WS(5, 6))), N = .25;
  let s = `<defs>${LDEFS()}<clipPath id="archC"><path d="M-80,1060 Q360,-500 800,1060 L700,1060 Q360,-300 20,1060Z"/></clipPath><linearGradient id="arS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0e1a3a"/><stop offset=".6" stop-color="#3a5a90"/><stop offset="1" stop-color="#e8b88a"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#arS)"/>` + starsK(120, 41, .5);
  // the arch: the real Earth texture seen along a curved band, darker toward its feet (more air in between)
  s += `<g opacity="${k.toFixed(2)}" clip-path="url(#archC)"><image href="tex/earth_atmos_2048.jpg" x="${(-900 + T * 6).toFixed(1)}" y="-120" width="2400" height="1200" preserveAspectRatio="none" transform="rotate(-8,360,500)"/><rect x="-80" y="-200" width="880" height="1300" fill="#8ab0e0" opacity=".25"/><rect x="-80" y="700" width="880" height="400" fill="#e8c8a8" opacity=".45" filter="url(#blur16)"/></g>`;
  s += `<path d="M-80,1060 Q360,-500 800,1060" stroke="#bfe0ff" stroke-width="6" fill="none" opacity="${(.5 * k).toFixed(2)}" filter="url(#blur5)"/><path d="M20,1060 Q360,-300 700,1060" stroke="#bfe0ff" stroke-width="6" fill="none" opacity="${(.35 * k).toFixed(2)}" filter="url(#blur5)"/>`;
  // the ground: a hill with a person looking up
  s += `<path d="M-20,1060 Q200,1020 400,1050 T740,1040 V1300 H-20Z" fill="#3a5a32"/><rect x="-20" y="1040" width="760" height="260" fill="#000" filter="url(#grainR)" opacity=".2"/>` + hero(300, 1150, Object.assign({ s: .9, face: 1, shade: 1, lookUp: .5 }, gp(2)));
  s += DNL(360, 520, 'الجانبُ الآخرُ من الكوكب', ease(ramp(t, WS(5, 6), WS(5, 9))), '#fff', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the fast spin may make winds and storms far stronger ----------
function swirl(x, y, R, t, a) { let s = ''; for (let i = 0; i < 4; i++) { let d = ''; for (let j = 0; j <= 30; j++) { const u = j / 30, an = t * 2 + i * 1.57 + u * 4.5, r = R * (1 - u * .9); d += (j ? ' L' : 'M') + (x + Math.cos(an) * r).toFixed(1) + ',' + (y + Math.sin(an) * r * .7).toFixed(1); } s += `<path d="${d}" stroke="#fff" stroke-width="${(R * .14).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(.75 * a).toFixed(2)}"/>`; } return `<g filter="url(#blur2)">${s}</g><circle cx="${x}" cy="${y}" r="${(R * .12).toFixed(1)}" fill="#1a2a4a" opacity="${a.toFixed(2)}"/>`; }
function sceneStorm(t) {
  const T = t - (S0(6) - .2), k = ease(ramp(t, WS(6, 3), WS(6, 6)));
  const cam = torW(t, { d: 5.6, el: .38, spin: .9 + T * .08, az: .5 });
  let ov = ''; [[-1.1, .25], [-.4, -.3], [-.7, .7], [.2, .1]].forEach(([u, v], i) => { const P = torP(u, v, 1.02), [x, y] = proj3(cam, P); ov += swirl(x, y, 64 + i * 10, t + i, k); });
  F.ov = ov; return space(t);
}
// ---------- 7: no known natural way to make it: gravity pulls big bodies into spheres ----------
function rockLump(x, y, R, seed) { let d = ''; for (let i = 0; i <= 30; i++) { const a = i / 30 * 6.283, k = 1 + .22 * Math.sin(a * 2 + seed) + .1 * Math.sin(a * 5 + seed * 2); d += (i ? ' L' : 'M') + (x + Math.cos(a) * R * k * 1.3).toFixed(1) + ',' + (y + Math.sin(a) * R * k * .8).toFixed(1); } d += 'Z';
  return `<path d="${d}" fill="#7a6a5a"/><g opacity=".7">${litRock(d, 'lr' + seed, '#d8c8b0', '#2a2018', 50 + seed, { fx: .06, fy: .06, sc: 4, x: x - R * 1.5, y: y - R, w: R * 3, h: R * 2 })}</g>`; }
function sceneSphere(t) {
  const T = t - (S0(7) - .2), a = [WS(7, 3), WS(7, 9), WS(7, 11)].map(w => ease(ramp(t, w, w + .5)));
  let s = `<defs>${LDEFS()}${STDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(160, 77, .7);
  // small → big: a lumpy asteroid, a round moon, the round Earth
  s += `<g opacity="${a[1].toFixed(2)}">${rockLump(140, 700, 50, 3)}${DNL(140, 790, 'صغير: غيرُ منتظم', 1, '#c8c0b0', 22)}</g>`;
  s += `<g opacity="${a[1].toFixed(2)}"><circle cx="330" cy="700" r="80" fill="url(#nG)"/><circle cx="305" cy="680" r="14" fill="#5a6270" opacity=".5"/><circle cx="356" cy="728" r="9" fill="#5a6270" opacity=".5"/><circle cx="340" cy="660" r="6" fill="#5a6270" opacity=".5"/>${DNL(330, 820, 'أكبر: كُرة', 1, '#c8d0dc', 22)}</g>`;
  s += `<g opacity="${a[2].toFixed(2)}">${eIco(550, 700, 120, 0)}<circle cx="550" cy="700" r="120" fill="url(#sphSh)" opacity=".5"/>${DNL(550, 870, 'الأرض: كُرة', 1, '#bfe6ff', 24)}</g>`;
  // the doughnut with a question mark
  const a0 = ease(ramp(t, S0(7) - .2, S0(7) + .4)), mv = ease(ramp(t, WS(7, 8), WS(7, 9) + .5)), rs = lerp(1.9, 1, mv), ry0 = lerp(720, 1060, mv);
  s += `<g opacity="${(a0 * (1 - a[1] * .4)).toFixed(2)}" transform="translate(360,${ry0.toFixed(1)}) scale(${rs.toFixed(3)}) translate(-360,-1060)"><ellipse cx="360" cy="1060" rx="140" ry="60" fill="none" stroke="#5a8ad8" stroke-width="44"/><ellipse cx="360" cy="1060" rx="140" ry="60" fill="none" stroke="#7aa84a" stroke-width="18" stroke-dasharray="40 30" opacity=".7"/><text x="360" y="1086" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="90" fill="#f4c76b">؟</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: even if it existed, it might crack or collapse with any big impact ----------
function sceneCrack(t) {
  const T = t - (S0(8) - .2), hit = WS(8, 7), c = ease(ramp(t, hit, S0(9) - .3)), m = clamp((t - (hit - 1.2)) / 1.2);
  const cam = torW(t, { d: 6.4, el: .45, spin: 1.4 + T * .04, crack: c, hot: .3 * c });
  let ov = '';
  if (m < 1) { const P0 = [3.2, 2.4, 1.2], P1 = torP(-.6, .4, 1), P = [lerp(P0[0], P1[0], m), lerp(P0[1], P1[1], m), lerp(P0[2], P1[2], m)], [x, y] = proj3(cam, P), [xa, ya] = proj3(cam, P0);
    ov += `<path d="M${xa.toFixed(1)},${ya.toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}" stroke="#ffd08a" stroke-width="6" opacity=".6" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="#fff4d0"/>`; }
  else { const [x, y] = proj3(cam, torP(-.6, .4, 1)), f = clamp(1 - (t - hit) / 1); ov += scr(`<defs><radialGradient id="flG"><stop offset="0" stop-color="#fff8e8" stop-opacity="1"/><stop offset=".45" stop-color="#fff0d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff0d0" stop-opacity="0"/></radialGradient></defs><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(90 + 260 * (1 - f)).toFixed(1)}" fill="url(#flG)" opacity="${(.95 * f).toFixed(2)}"/>`); }
  F.ov = ov; return space(t);
}
// ---------- 9: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  const u = ease(ramp(t, S0(9) + .3, S0(9) + 1.8));   // starts exactly where the cracked shot ends, then the cracks fade and the camera settles
  torW(t, { d: lerp(6.4, 6.8, u), el: .45, spin: 1.4 + (t - (S0(8) - .2)) * .04, tg: [0, .45 * u, 0], crack: 1 - u, hot: .3 * (1 - u) });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 11) - .3, WS(9, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpin }, { s: S0(2) - .2, f: sceneDay }, { s: S0(3) - .2, f: sceneGrav }, { s: S0(4) - .2, f: sceneJump },
  { s: S0(5) - .2, f: sceneArch }, { s: S0(6) - .2, f: sceneStorm }, { s: S0(7) - .2, f: sceneSphere }, { s: S0(8) - .2, f: sceneCrack }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSpin, sceneDay, sceneGrav, sceneStorm, sceneCrack]);
const XF = .5;
const TLI = [['الدوران', S0(1)], ['اليوم', S0(2)], ['الجاذبيّة', S0(3)], ['السماء', S0(5)], ['العواصف', S0(6)], ['الأغرب', S0(7)]];
const LIST_ON = new Set([sceneJump]);
const CHIPS = [
  ['c0', 'أرضٌ على شكلِ دونات', 360, 330, 'big', WS(0, 3), S0(1) - .3],
  ['c1', 'تدورُ بسرعةٍ هائلة', 360, 330, 'big', WS(1, 9), S0(2) - .3],
  ['c2', 'اليوم < ٣ ساعات', 360, 330, 'big', WS(2, 2), S0(3) - .3],
  ['c3', 'جاذبيّةٌ مختلفة', 360, 330, 'big', WS(3, 0), S0(4) - .3],
  ['c4', 'قفزةٌ أعلى ٣ مرّات', 360, 330, 'big', WS(4, 1), S0(5) - .3],
  ['c5', 'قوسٌ في السماء', 360, 330, 'big', WS(5, 10), S0(6) - .3],
  ['c6', 'عواصفُ أعنف', 360, 330, 'red big', WS(6, 3), S0(7) - .3],
  ['c7', 'الجاذبيّةُ تصنعُ الكُرات', 360, 330, 'big', WS(7, 9), S0(8) - .3],
  ['c8', 'قد يتشقّق', 360, 330, 'red big', WS(8, 3), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 11) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">أرضٌ دونات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
