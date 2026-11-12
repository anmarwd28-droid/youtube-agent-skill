// ===================== intro + chapter 1 (the first 8 minutes) =====================
const SUNP = [-5.4, .35, -1.6];
const ring3 = (cam, C, r, a0 = 0, a1 = 6.2832, n = 90) => { let d = ''; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * i / n, p = proj3w(cam, [C[0] + r * Math.cos(a), C[1], C[2] + r * Math.sin(a)]); d += (i ? 'L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); } return d; };
function sceneHook(t) {
  const tv = 1.95, gone = t >= tv, dk = ease(ramp(t, tv, tv + .35));
  const d = lerp(8.8, 7.2, ease(ramp(t, 0, 9))) + 4.2 * ease(ramp(t, 9.2, 13.5)), tgx = lerp(-2.1, -.25, ease(ramp(t, 2.6, 8)));
  const cam = orbit(d, .12, .02 + t * .008, [tgx, 0, 0]);
  F.w = { set: 'space', cam, L: [-1, .2, .7], disc: { m: 1, spin: 3.9 + t * .03, clouds: .5, sunI: 1 - dk, lights: .25 + .75 * dk, amb: .17 * dk }, sun: gone ? null : { pos: SUNP, r: 1.35, a: 1 } };
  F.flash = gone ? .55 * (1 - ramp(t, tv, tv + .35)) : 0;
  const R0 = Math.hypot(SUNP[0], SUNP[2]), th = Math.atan2(-SUNP[2], -SUNP[0]), oa = (1 - ease(ramp(t, WS(1, 6), WS(1, 6) + 1.2))) * ramp(t, .2, .8) * .8, e = proj3w(cam, [0, 0, 0]);
  const q = ease(ramp(t, WS(2, 11), WS(2, 11) + .6));
  F.ov = `<path d="${ring3(cam, [SUNP[0], 0, SUNP[2]], R0, th - .9, th - .2)}M${ring3(cam, [SUNP[0], 0, SUNP[2]], R0, th + .2, th + .9).slice(1)}" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="9 8" fill="none" opacity="${oa.toFixed(2)}"/>` +
    (q > 0 ? `<g opacity="${q.toFixed(2)}"><text x="${(e[0] + 250).toFixed(0)}" y="${(e[1] + 60).toFixed(0)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` : '');
  return spaceW(t, { mw: .35 * dk, mwy: 560, mwa: -8 });
}
chip('لا ضوء', 400, 640, '', WS(1, 1), S0(2) - .3); chip('لا دفء', 640, 640, 'ice', WS(1, 3), S0(2) - .3); chip('لا جاذبيّة', 880, 640, 'red', WS(1, 6), S0(2) - .3);
chip('مَن ينجو بعد مليونِ سنة؟', 560, 640, 'big', WS(2, 12), S0(3) - 2.3);
// ---- the 8:20 countdown (shown through chapter 1) ----
const CD0 = S0(3), CD1 = WS(7, 4);
function cdPill(t, a = 1) { const rem = Math.max(0, 500 * (1 - ramp(t, CD0, CD1))), m = Math.floor(rem / 60), sc = Math.floor(rem % 60), z = rem <= 0;
  return `<g opacity="${a.toFixed(2)}"><rect x="440" y="640" width="400" height="56" rx="18" fill="${z ? '#a82626' : '#0a0e1c'}" opacity=".88"/><rect x="440" y="640" width="400" height="56" rx="18" fill="none" stroke="#f4c76b" stroke-opacity=".6" stroke-width="1.5"/>` +
    txt(720, 677, z ? 'وصلَ آخرُ ضوء' : 'آخرُ ضوءٍ يصلُ بعد', 1, '#fff', 23) + `<text x="520" y="680" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#f4c76b">${AR(m)}:${AR(String(sc).padStart(2, '0'))}</text></g>`; }
const CITY1 = { id: 'a', seed: 3, cars: [[240, 0, '#d8d8dc', -1, 0], [900, 0, '#3a5a8a', 1, 0], [0, 1, '#a83a2a', 1, 70], [500, 1, '#e8e4d0', 1, 55]] };
const crowd1 = (t, tStop = 1e9, cold = 0) => { const tt = Math.min(t, tStop), up = t > tStop + .3 ? 1 : 0, o = i => Object.assign({ lookUp: up }, cold ? WINT(i, cold) : {});
  return walker(-260, 1066, 34, 0, .5, tt, o(0)) + walker(820, 1052, -30, 1, .5, tt, o(1)) + walker(40, 1082, 38, 2, .52, tt, o(2)) + walker(520, 1060, -36, 3, .5, tt, o(3)) + walker(1000, 1078, -28, 0, .52, tt, o(4)) + walker(-420, 1048, 30, 3, .48, tt, o(5)); };
function sceneStreetDay(t) {
  noW(); const a = S0(3) - 2;
  F.ov = cdPill(t, ramp(t, S0(3) + .2, S0(3) + .8));
  return camMv(cityW(t, Object.assign({ sun: [200, 530, 1] }, CITY1)) + crowd1(t), t, a, S0(4), [.88, 380, 780], [1.42, 330, 905]);
}
chip('الثانيةُ الأولى: كلُّ شيءٍ طبيعيّ', 640, 150, 'dark', WS(3, 3), S0(4) - .4);
function sceneLight(t) {
  const cam = orbit(9, .1, 0, [-2.7, 0, 0]); F.w = { set: 'space', cam, L: [-1, .12, .25], disc: { m: 1, spin: 3.9 + t * .03, clouds: .5, sunI: 1, lights: .3 } };
  const p = lerp(.13, .58, ramp(t, CD0, S0(5))), sx = 215, sy = 360, ex = 1043 - 150, fx = lerp(sx + 95, ex, p), a = ramp(t, S0(4), S0(4) + .5);
  F.ov = `<defs><linearGradient id="bm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".55"/><stop offset="1" stop-color="#ffe9a8" stop-opacity=".12"/></linearGradient></defs>` +
    `<path d="M${fx.toFixed(1)},${sy - 46} L${ex},${sy - 120} L${ex},${sy + 120} L${fx.toFixed(1)},${sy + 46}Z" fill="url(#bm)"/><path d="M${fx.toFixed(1)},${sy - 52} Q${(fx + 16).toFixed(1)},${sy} ${fx.toFixed(1)},${sy + 52}" stroke="#fff3c8" stroke-width="5" fill="none"/>` +
    `<circle cx="${sx}" cy="${sy}" r="92" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 9" opacity=".85"/><circle cx="${sx}" cy="${sy}" r="92" fill="#f4c76b" opacity=".05"/>` + txt(sx, sy + 10, 'مكانُ الشمس', 1, '#f4c76b', 25) +
    `<g opacity="${a.toFixed(2)}"><path d="M${sx + 100},${sy + 170} H${ex - 8} M${sx + 100},${sy + 158} v24 M${ex - 8},${sy + 158} v24" stroke="#fff" stroke-width="3" fill="none"/>` + txt((sx + ex) / 2 + 40, sy + 214, '١٥٠ مليون كيلومتر', 1, '#fff', 27) + txt(fx + 6, sy - 70, 'آخرُ ضوء', 1, '#ffe9a8', 23) + `</g>` + cdPill(t);
  return spaceW(t);
}
chip('٨ دقائق و٢٠ ثانية', 640, 150, 'big', WS(4, 5), S0(5) - .4);
function sceneAirport(t) {
  noW(); const T = t - (S0(5) - .2), px = -420 + T * 170, py = 640 - T * 26 - T * T * 2.5;
  F.ov = cdPill(t);
  const plane = `<g transform="translate(${px.toFixed(1)},${py.toFixed(1)}) rotate(-11) scale(.8)">${airliner()}</g>`;
  return camMv(cityW(t, { id: 'p', seed: 11, sun: [760, 470, 1], x0: -700, x1: 1500, noTrees: 1 }) + plane, t, S0(5) - .2, WS(5, 8), [.88, 300, 770], [.95, 520, 730]);
}
function sceneSchool(t) {
  noW(); F.ov = cdPill(t); const gx = 380;
  const gate = `<rect x="${gx - 150}" y="868" width="300" height="34" rx="6" fill="#2a5a9a"/><rect x="${gx - 150}" y="868" width="300" height="6" rx="3" fill="#fff" opacity=".25"/><text x="${gx}" y="893" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">مدرسة</text>`;
  const kid = (x0, v, i, sc) => { const c = CROWD[i % 4], x = x0 + v * t, f = v > 0 ? 1 : -1, y = 1064 + (i % 3) * 10; return person(x, y, { s: sc, face: f, moving: 1, phase: x * f / (sc * 30), top: ['#e8c040', '#4a8ad0', '#e05a4a', '#5aa86a', '#d07ab0'][i % 5], pants: c.pants, skin: c.skin, hair: c.hair, t }) + `<rect x="${(x - f * 15 * sc - 9 * sc).toFixed(1)}" y="${(y - 258 * sc).toFixed(1)}" width="${(18 * sc).toFixed(1)}" height="${(70 * sc).toFixed(1)}" rx="5" fill="${['#b83a3a', '#2a4a8a', '#3a7a4a'][i % 3]}"/>`; };
  return camMv(cityW(t, Object.assign({ sun: [150, 505, 1], extra: gate }, CITY1, { id: 'sc', seed: 6 })) + kid(-1500, 36, 0, .34) + kid(-1440, 36, 1, .31) + kid(-1560, 35, 2, .36) + kid(-1340, 37, 3, .32) + kid(-1260, 35, 4, .33) + walker(-1640, 1074, 35, 1, .5, t), t, WS(5, 8) - .2, S0(6), [1.5, 330, 935], [1.7, 400, 950]);
}
chip('العالمُ لا يعرفُ بعد', 640, 150, 'dark', WS(5, 11), S0(6) - .4);
// ---- the orbit diagram: the Earth stays at the 3D origin, the diagram moves around it ----
const RO = 4.4, TH0 = 2.25, OM = .028, T8 = WS(8, 3);
function orbitDiag(t, dark) {
  const tt = Math.min(t, T8), th = TH0 + (tt - S0(6)) * OM, away = Math.max(0, t - T8), E = [RO * Math.cos(th) - Math.sin(th) * away * RO * OM * 3.2, 0, RO * Math.sin(th) + Math.cos(th) * away * RO * OM * 3.2], S = [-E[0], 0, -E[2]];
  const cam = orbit(15.5, .95, .0, [S[0] * .55 + .2, 0, S[2] * .55 - .45]);
  F.w = { set: 'space', cam, L: dark ? [0, 1, 0] : S, disc: { m: 1, spin: 3.9 + t * .03, clouds: .5, sunI: dark ? 0 : 1, lights: dark ? 1 : .3, amb: dark ? .2 : 0 } };
  return { cam, S, E, th, away };
}
function sceneOrbit(t) {
  const g = orbitDiag(t, 0), s = proj3w(g.cam, g.S), e = proj3w(g.cam, [0, 0, 0]), p = ramp(t, CD0, CD1), rr = RO * p, k = pmod((t - S0(6)) * .45, 1);
  F.ov = `<path d="${ring3(g.cam, g.S, RO)}" stroke="#fff" stroke-opacity=".5" stroke-width="2.2" stroke-dasharray="8 8" fill="none"/>` +
    `<path d="${ring3(g.cam, g.S, rr)}" stroke="#ffe9a8" stroke-width="5" fill="none" opacity=".9"/><path d="${ring3(g.cam, g.S, rr * .93)}" stroke="#9fd0ff" stroke-width="3" fill="none" opacity=".8"/>` +
    `<path d="${ring3(g.cam, g.S, .42)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="7 6" fill="#f4c76b" fill-opacity=".06"/>` + txt(s[0], s[1] + 8, 'فراغ', 1, '#f4c76b', 24) +
    txt(e[0] - 150, e[1] - 70, 'ما زالت تدور', ramp(t, WS(6, 3), WS(6, 3) + .5), '#fff', 23) +
    `<g opacity="${ramp(t, WS(6, 8), WS(6, 8) + .5).toFixed(2)}">` + txt(s[0] + 250, s[1] - 110, 'آخرُ ضوء', 1, '#ffe9a8', 24) + txt(s[0] + 250, s[1] - 78, 'وآخرُ جاذبيّة', 1, '#9fd0ff', 24) + `</g>` + cdPill(t);
  return spaceW(t);
}
chip('الجاذبيّةُ = سرعةُ الضوء', 640, 150, 'big', WS(6, 10), S0(7) - .4);
function sceneLightsOut(t) {
  noW(); const t0 = CD1, dk = ramp(t, t0, t0 + .12), fl = t > t0 + 1.3 ? clamp(.25 + .75 * ramp(t, t0 + 1.3, t0 + 2.6) + (t < t0 + 2.2 ? .3 * Math.sin(t * 40) : 0)) : 0;
  F.ov = cdPill(t);
  return camMv(cityW(t, Object.assign({}, CITY1, { sun: [200, 530, 1 - dk], dark: dk, lit: fl, clouds: 1 - dk * .75, cars: CITY1.cars.map(c => [c[0] + (c[4] ? c[4] * Math.min(t, t0 + .8) : 0), c[1], c[2], c[3], 0]) })) + (dk > 0 ? `<g style="filter:brightness(${(1 - dk * .55).toFixed(2)})">${crowd1(t, t0 + .4)}</g>` : crowd1(t)), t, S0(7) - .2, t0 + 2.5, [1.42, 330, 905], [.95, 360, 800]);
}
chip('الظلامُ في لحظة', 640, 150, 'red', WS(7, 4) + .3, WS(7, 12) - .3);
function sceneHalf(t) {
  const cam = g3(t, { d: 6.3, el: .2, az: 2.2, spin: 3.2, sunI: 0, lights: 1, amb: .16, tg: [0, -.1, 0] }), e = proj3w(cam, [0, 0, 0]);
  F.ov = txt(e[0], 610, 'مدنُ الليل: لم يتغيّرْ شيء', ramp(t, WS(7, 14), WS(7, 14) + .5), '#f4c76b', 30);
  return spaceW(t, { mw: .4, mwy: 150, mwa: 12 });
}
function sceneAway(t) {
  const g = orbitDiag(t, 1), s = proj3w(g.cam, g.S), e = proj3w(g.cam, [0, 0, 0]), a = ramp(t, T8, T8 + .5), th = g.th, tx = -Math.sin(th), tz = Math.cos(th);
  const P0 = [g.S[0] + RO * Math.cos(th), 0, g.S[2] + RO * Math.sin(th)], q0 = proj3w(g.cam, P0), q1 = proj3w(g.cam, [P0[0] + tx * 7, 0, P0[2] + tz * 7]);
  F.ov = `<path d="${ring3(g.cam, g.S, RO)}" stroke="#fff" stroke-opacity="${(.5 - .25 * a).toFixed(2)}" stroke-width="2.2" stroke-dasharray="8 8" fill="none"/><path d="${ring3(g.cam, g.S, .42)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="7 6" fill="none" opacity=".7"/>` + txt(s[0], s[1] + 8, 'فراغ', .8, '#f4c76b', 24) +
    arrow(q0[0], q0[1], q1[0], q1[1], a * .95, '#f4c76b', 5) + txt(e[0] + 130, e[1] - 60, 'خطٌّ مستقيم', ramp(t, WS(8, 8), WS(8, 8) + .5), '#f4c76b', 26);
  return spaceW(t, { mw: .3, mwy: 600, mwa: -6 });
}
chip('١٠٧٬٠٠٠ كم في الساعة', 640, 150, 'big', WS(8, 12), S0(9) - .4);
function sceneNoShake(t) {
  noW(); const tb = `<rect x="296" y="1000" width="8" height="58" fill="#2a2a2e"/><ellipse cx="300" cy="1000" rx="46" ry="9" fill="#e8e0d0"/><ellipse cx="300" cy="1061" rx="26" ry="5" fill="#000" opacity=".3"/><rect x="290" y="978" width="20" height="20" rx="3" fill="#fff"/><path d="M310,984 q9,2 0,10" stroke="#fff" stroke-width="3" fill="none"/>` +
    [0, 1, 2].map(i => { const k = pmod(t * .4 + i / 3, 1); return `<path d="M${296 + i * 4},${972 - k * 30} q5,-8 0,-16" stroke="#fff" stroke-width="2.5" fill="none" opacity="${(.5 * (1 - k)).toFixed(2)}"/>`; }).join('');
  const ppl = `<g style="filter:brightness(.62)">${stander(236, 1066, 2, .52, 1, t, { lookUp: 1 }) + stander(372, 1066, 1, .5, -1, t, { phone: .8 }) + stander(560, 1072, 3, .52, -1, t, { lookUp: 1 }) + stander(70, 1058, 0, .5, 1, t, { lookUp: 1 })}</g>`;
  return camMv(cityW(t, Object.assign({}, CITY1, { dark: 1, lit: 1, clouds: .2, cars: [[240, 0, '#d8d8dc', -1, 0], [900, 0, '#3a5a8a', 1, 0]], extra: tb, mw: .5 })) + ppl, t, S0(9) - .2, WS(9, 10), [1.5, 330, 930], [1.72, 310, 960]);
}
chip('لا اهتزاز', 640, 150, 'dark', WS(9, 3), WS(9, 10) - .4);
const moonAt = (t, r = 3.5, w = .1, ph = .6) => [r * Math.cos(ph + t * w), .25 * Math.sin(ph + t * w), r * Math.sin(ph + t * w)];
function sceneMoon(t) {
  const off = ease(ramp(t, WS(10, 2), WS(10, 5))), cam = g3(t, { d: 12.5, el: .26, az: .5, daz: .004, sunI: 0, lights: 1, amb: .18, tg: [.6, 0, 0] }), mp = moonAt(t), m = proj3w(cam, mp);
  F.w.moon = { pos: mp, r: .29, L: [-.6, .2, .75], i: 1 - off, amb: .045 * off };
  F.ov = `<path d="${ring3(cam, [0, 0, 0], 3.5)}" stroke="#fff" stroke-opacity=".3" stroke-width="2" stroke-dasharray="6 8" fill="none"/>` + txt(m[0], m[1] - 52, 'القمر', 1 - off * .6, '#fff', 24) +
    (off > 0 ? txt(m[0], m[1] + 70, 'يعكسُ ولا يضيء', ramp(t, WS(10, 8), WS(10, 8) + .5), '#f4c76b', 24) : '');
  return spaceW(t, { mw: .45, mwy: 610, mwa: -5 });
}
