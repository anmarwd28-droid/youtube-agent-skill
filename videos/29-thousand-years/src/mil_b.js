// ===================== "what if humans lived a thousand years?" (Short #29) =====================
const dimSt = (t, id, op = .6, o = {}) => streetS(t, Object.assign({ id, cars: 0 }, o)) + `<rect width="720" height="1280" fill="#0a1028" opacity="${op}"/>`;
const OLD = { top: '#6a5a8a', pants: '#2a2a34', skin: '#c89070', hair: '#dcdcdc' };
// 0: a street; your age counter races to 1000
function sceneHook(t) {
  const k = ease(ramp(t, .15, WS(0, 5) + .3)), age = Math.round(1000 * k * k);
  let s = streetS(t, { id: 'h' });
  s += castSh(250 + t * 26, 1098, .62) + hero(250 + t * 26, 1098, { s: .62, face: 1, walk: t * 6, amp: .6, noShadow: 1 });
  [[90, 0, 1], [600, 1, -1], [470, 3, -1]].forEach(([x0, c, f], i) => { const x = x0 + f * 24 * t; s += castSh(x, 1086 + i * 3, .52) + onWalk(x, 1086 + i * 3, CROWD[c], .52, f, t, { moving: 1, phase: t * 6 + i * 2, amp: .7 }); });
  s += panel(210, 470, 300, 170) + lbl(360, 520, 'العمر', 1, '#cfd8ff', 26) + lbl(360, 606, `${AR(age)} سنة`, 1, '#f4c76b', 64);
  noEarth(); F.ov = ''; return s;
}
// 1: the record (122 years) against 1000 years
function sceneRecord(t) {
  const st = S0(1) - .2, a0 = ease(ramp(t, st + .2, st + .6)), k1 = ease(ramp(t, WS(1, 5) - .1, WS(1, 8) + .2)), k2 = ease(ramp(t, WS(1, 9), WS(1, 10) + .6)), ax = ease(ramp(t, WS(1, 12), WS(1, 12) + .3)), BX = 630, BW = 520;
  let s = streetS(t, { id: 'r', cars: 0 }) + `<rect width="720" height="1280" fill="#0a1028" opacity=".35"/>`;
  s += castSh(170, 1098, .62) + hero(170, 1098, Object.assign({ s: .62, face: 1, lean: 14, aF: [.7, 1.0], noShadow: 1 }, OLD)) + `<path d="M${HP.hand[0]},${HP.hand[1]} L${HP.hand[0] + 6},1098" stroke="#5a3a1e" stroke-width="5"/>` + lbl(170, 880, '١٢٢ سنة', k1, '#fff', 26);
  s += castSh(520, 1098, .62) + hero(520, 1098, { s: .62, face: -1, noShadow: 1 }) + lbl(520, 880, '١٠٠٠ سنة', k2, '#f4c76b', 26);
  s += `<g opacity="${a0}">` + panel(60, 440, 600, 300) + lbl(360, 492, 'أطولُ عمرٍ مسجَّل', 1, '#cfd8ff', 24) + `<rect x="${BX - BW}" y="510" width="${BW}" height="38" rx="8" fill="#1c2440"/><rect x="${BX - BW * .122 * k1}" y="510" width="${BW * .122 * k1}" height="38" rx="8" fill="#dfe6ff"/>` + lbl(BX - BW * .122 - 70, 538, '١٢٢', k1, '#fff', 26) +
    lbl(360, 622, 'ألفُ سنة', k2, '#ffe4a0', 24) + `<rect x="${BX - BW}" y="640" width="${BW}" height="38" rx="8" fill="#1c2440"/><rect x="${BX - BW * k2}" y="640" width="${BW * k2}" height="38" rx="8" fill="#f4c76b"/><rect x="${BX - BW * k2}" y="640" width="${BW * k2}" height="10" rx="5" fill="#fff" opacity=".3"/>` + lbl(BX - BW / 2, 668, '١٠٠٠', k2 > .7 ? 1 : 0, '#1c140a', 26) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 2: about 37 billion heartbeats instead of about 3 billion
const heartP = (x, y, s) => `<path transform="translate(${x},${y}) scale(${s})" d="M0,18 C-34,-8 -24,-40 0,-22 C24,-40 34,-8 0,18Z"`;
function sceneHeart(t) {
  const st = S0(2) - .2, T = t - st, bt = pmod(T * 1.17, 1), pulse = 1 + .16 * Math.exp(-bt * 9) + .08 * Math.exp(-Math.pow((bt - .22) * 14, 2)), k = ease(ramp(t, WS(2, 2), WS(2, 6) + .3)), a3 = ease(ramp(t, WS(2, 7), WS(2, 9)));
  let s = dimSt(t, 'q') + hero(250, 1634, { s: 2.88, face: 1, noShadow: 1, shade: 1 });
  const cx = 258, cy = 1010;
  s += `<circle cx="${cx}" cy="${cy}" r="${90 * pulse}" fill="url(#redG)" opacity=".35"/>` + heartP(cx, cy, 2.3 * pulse) + ` fill="#d8262e"/>` + heartP(cx - 8, cy - 8, 1.1 * pulse) + ` fill="#ff7a7a" opacity=".5"/>`;
  let d = 'M0,1250'; for (let x = 0; x <= 720; x += 6) { const ph = pmod((x / 720 * 3) - T * 1.17, 1), y = 1250 - (ph > .46 && ph < .5 ? 60 : ph >= .5 && ph < .54 ? -30 : ph > .3 && ph < .38 ? 8 : 0); d += ` L${x},${y}`; }
  s += `<path d="${d}" stroke="#ff5a5a" stroke-width="3" fill="none" opacity=".8"/>`;
  s += panel(376, 1020, 330, 200) + lbl(541, 1066, 'دقّاتُ القلب', 1, '#cfd8ff', 24) + lbl(541, 1130, `${AR(Math.round(37 * k))} مليار`, 1, '#f4c76b', 50) + lbl(541, 1190, 'العمرُ العاديّ: ٣ مليارات', a3, '#fff', 22);
  noEarth(); F.ov = ''; return s;
}
// 3: only two sets of teeth, and enamel never grows back
function toothS(x, y, sc, wear, o = {}) {
  const w = 12 * wear;
  return `<g transform="translate(${x},${y}) scale(${sc})"><defs><clipPath id="tw${o.id || ''}"><rect x="-80" y="${-100 + w * 3}" width="160" height="320"/></clipPath><linearGradient id="enG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe4ea"/></linearGradient></defs>` +
    `<g clip-path="url(#tw${o.id || ''})"><path d="M-50,-40 C-54,-84 -30,-96 -14,-84 C-4,-78 4,-78 14,-84 C30,-96 54,-84 50,-40 C48,-10 40,10 36,60 C34,100 26,150 18,150 C10,150 8,70 0,60 C-8,70 -10,150 -18,150 C-26,150 -34,100 -36,60 C-40,10 -48,-10 -50,-40Z" fill="#f0e2c0"/>` +
    `<path d="M-50,-40 C-54,-84 -30,-96 -14,-84 C-4,-78 4,-78 14,-84 C30,-96 54,-84 50,-40 C49,-20 44,-6 41,10 C30,-20 20,-56 0,-58 C-20,-56 -30,-20 -41,10 C-44,-6 -49,-20 -50,-40Z" fill="url(#enG)" opacity="${1 - .85 * wear}"/>` +
    `<path d="M-20,-30 C-22,-50 22,-50 20,-30 C18,0 14,30 12,90 C11,110 8,110 6,60 C4,40 -4,40 -6,60 C-8,110 -11,110 -12,90 C-14,30 -18,0 -20,-30Z" fill="#e8848a"/><path d="M-44,-70 Q-30,-88 -16,-78" stroke="#fff" stroke-width="5" fill="none" opacity="${.8 * (1 - wear)}"/></g>` +
    (wear > .05 ? `<path d="M-40,${-100 + w * 3} l12,5 l10,-6 l12,6 l12,-5 l14,5 l14,-4" stroke="#b89a6a" stroke-width="3" fill="none" opacity="${wear}"/>` : '') + `</g>`;
}
function sceneTeeth(t) {
  const st = S0(3) - .2, wear = ease(ramp(t, WS(3, 4), WS(3, 7) + 1.2)), a1 = ease(ramp(t, WS(3, 1), WS(3, 1) + .3)), a2 = ease(ramp(t, WS(3, 2), WS(3, 2) + .3)), a3 = ease(ramp(t, WS(3, 3), WS(3, 3) + .3)), ae = ease(ramp(t, WS(3, 4) - .1, WS(3, 4) + .3));
  let s = dimSt(t, 'e', .8);
  s += `<path d="M110,870 Q330,800 550,870 L550,1280 L110,1280Z" fill="#e58a92"/><path d="M110,870 Q330,800 550,870 L550,900 Q330,830 110,900Z" fill="#f4a8ae"/>` + toothS(330, 820, 1.9, wear, { id: 'a' }) + toothS(150, 850, 1.25, wear * .7, { id: 'b' }) + toothS(510, 850, 1.25, wear * .8, { id: 'c' });
  s += `<path d="M110,880 Q330,812 550,880 L550,1280 L110,1280Z" fill="#e58a92" opacity=".0"/>`;
  s += `<path d="M350,655 L440,606" stroke="#f4c76b" stroke-width="3" opacity="${ae}"/>` + lbl(480, 600, 'المينا', ae, '#ffe4a0', 28);
  s += panel(40, 400, 500, 120) + toothS(450, 462, .28, 0, { id: 'd' }) + lbl(450, 508, '١ لبنيّة', a1, '#fff', 20) + toothS(290, 462, .34, 0, { id: 'f' }) + lbl(290, 508, '٢ دائمة', a2, '#fff', 20) + `<g opacity="${a3}"><path d="M110,440 l40,40 M150,440 l-40,40" stroke="#ff5a4a" stroke-width="8"/></g>` + lbl(130, 508, 'لا ثالثة', a3, '#ffc2b8', 20);
  noEarth(); F.ov = ''; return s;
}
// 4: about thirty generations alive together
function sceneGen(t) {
  const st = S0(4) - .2, T = t - st; let s = streetS(t, { id: 'n', cars: 0, trees: [[664, 250, 5]], lamps: [694] }), ps = [];
  for (let i = 0; i < 30; i++) { const row = i % 3, col = Math.floor(i / 3), x = 590 - col * 56 - row * 18, y = 1098 - row * 22, sc = .56 - row * .07 - col * .008, a = ease(ramp(t, WS(4, 1) + i * .075, WS(4, 1) + i * .075 + .25)); ps.push([y, i, x, sc, a]); }
  ps.sort((a, b) => a[0] - b[0]).forEach(([y, i, x, sc, a]) => { if (a <= 0) return; s += `<g opacity="${a.toFixed(2)}">` + castSh(x, y, sc) + (i === 0 ? hero(x, y, Object.assign({ s: sc, face: -1, noShadow: 1 }, OLD)) : onWalk(x, y, CROWD[i % 4], sc * (i > 24 ? .7 : 1), -1, t, { lookUp: 0 })) + `</g>`; });
  const n = Math.min(30, Math.max(1, Math.round((t - WS(4, 1)) / .075)));
  s += panel(230, 440, 260, 130) + lbl(360, 488, 'الأجيال', 1, '#cfd8ff', 24) + lbl(360, 548, AR(n), 1, '#f4c76b', 50);
  noEarth(); F.ov = ''; return s;
}
// 5: with ~130 million births a year and no deaths, 8 billion doubles in about 60 years
function scenePop(t) {
  const st = S0(5) - .2, cam = globeCam(t), spin = 4.2 + t * .03, Ld = sunFor(.25 + t * .02), k = ease(ramp(t, WS(5, 4), WS(5, 10) + .4));
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: .45 } };
  const cN = Math.hypot(...cam.pos); let o = `<defs>${SDEF}</defs>`, dots = '';
  const r = RS(5); for (let rep = 0; rep < 3; rep++) SPK.forEach(([la, lo, sz, rr], i) => { const jl = rep ? (r() - .5) * 12 : 0, jo = rep ? (r() - .5) * 14 : 0, ap = rep ? ease(ramp(k, rr * .8, rr * .8 + .2)) : 1; if (ap <= 0) return; const P = geo3(la + jl, lo + jo, spin), fr = (P[0] * cam.pos[0] + P[1] * cam.pos[1] + P[2] * cam.pos[2]) / cN, vis = clamp((fr - .12) / .25); if (vis <= 0) return; const a = proj3(cam, P);
    dots += `<circle cx="${a[0].toFixed(1)}" cy="${a[1].toFixed(1)}" r="${(2.3 * sz).toFixed(1)}" fill="#ffe9a8" opacity="${(vis * ap * .9).toFixed(2)}"/>`; });
  o += `<g filter="url(#blur2)" opacity=".8">${dots}</g>` + dots;
  o += panel(110, 1000, 500, 190) + lbl(360, 1052, 'سكّانُ الأرض', 1, '#cfd8ff', 24) + lbl(360, 1120, `${AR((8 + 8 * k).toFixed(1))} مليار`, 1, '#f4c76b', 52) + lbl(360, 1170, `بعد ${AR(Math.round(60 * k))} سنة`, 1, '#fff', 24);
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// 6: no ageing, but a 1-in-1000 yearly risk: e^-1 = 37% reach 1000
function sceneRisk(t) {
  const st = S0(6) - .2, k = ease(ramp(t, WS(6, 6), WS(6, 14) + .3)), a0 = ease(ramp(t, st + .2, st + .6)), X0 = 130, X1 = 620, Y0 = 800, Y1 = 500;
  let s = dimSt(t, 'k', .55), d = '', px = X0, py = Y1;
  for (let i = 0; i <= 60 * k; i++) { const u = i / 60; px = X0 + (X1 - X0) * u; py = Y0 - (Y0 - Y1) * Math.exp(-u); d += (i ? ' L' : 'M') + px.toFixed(1) + ',' + py.toFixed(1); }
  s += `<g opacity="${a0}">` + panel(50, 420, 620, 470) + `<path d="M${X0},${Y1 - 20} V${Y0} H${X1 + 20}" stroke="#8a93b8" stroke-width="3" fill="none"/>` + [0, .5, 1].map(u => `<path d="M${X0 + (X1 - X0) * u},${Y0} v10" stroke="#8a93b8" stroke-width="3"/>` + lbl(X0 + (X1 - X0) * u, Y0 + 44, AR(Math.round(u * 1000)), 1, '#cfd8ff', 22)).join('') + lbl(X0 - 40, Y1 + 8, '١٠٠٪', 1, '#cfd8ff', 20) + lbl(375, 876, 'العمرُ بالسنوات', 1, '#8a93b8', 20) + lbl(360, 468, 'من يبقى حيّاً؟', 1, '#fff', 26) +
    (d ? `<path d="${d} L${px.toFixed(1)},${Y0} L${X0},${Y0}Z" fill="#f4c76b" opacity=".16"/><path d="${d}" stroke="#f4c76b" stroke-width="5" fill="none" stroke-linejoin="round"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="8" fill="#fff"/>` : '') + lbl(px - 10, py - 22, `${AR(Math.round(100 * Math.exp(-k)))}٪`, k > .02 ? 1 : 0, '#fff', 30) + `</g>`;
  for (let i = 0; i < 9; i++) { const x = 80 + i * 70, gone = [1, 2, 4, 5, 7, 8].indexOf(i), a = gone < 0 ? 1 : 1 - .85 * ease(ramp(k, gone * .15, gone * .15 + .15)); s += `<g opacity="${a.toFixed(2)}">` + person(x, 1130, Object.assign({ s: .42, face: i % 2 ? -1 : 1, t }, pal(i % 4))) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// 7: the Greenland shark lives about 400 years
function sceneShark(t) {
  const st = S0(7) - .2, T = t - st, x = 470 - T * 22, y = 760 + Math.sin(T * .9) * 14, tail = Math.sin(T * 2.4) * 10;
  let s = `<defs>${DEFB()}<linearGradient id="seaD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a6a94"/><stop offset=".45" stop-color="#103a5c"/><stop offset="1" stop-color="#041424"/></linearGradient><linearGradient id="shG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5c6670"/><stop offset=".55" stop-color="#7a8690"/><stop offset="1" stop-color="#b8c0c6"/></linearGradient></defs><rect width="720" height="1280" fill="url(#seaD)"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${60 + i * 120 + Math.sin(T * .4 + i) * 20},-20 L${-40 + i * 130},1000 L${40 + i * 130},1000 L${120 + i * 120 + Math.sin(T * .4 + i) * 20},-20Z" fill="#bfe4ff" opacity=".05"/>`;
  s += `<path d="M-20,1180 Q180,1110 360,1160 T740,1140 L740,1300 L-20,1300Z" fill="#06182a"/><path d="M-20,1220 Q200,1170 420,1210 T740,1190 L740,1300 L-20,1300Z" fill="#030d18"/>`;
  const r = RS(9); for (let i = 0; i < 40; i++) { const px = r() * 720, py = pmod(r() * 1280 - T * (8 + r() * 14), 1280); s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1 + r() * 2).toFixed(1)}" fill="#dff2ff" opacity="${(.15 + r() * .3).toFixed(2)}"/>`; }
  s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(1.25)"><ellipse cx="0" cy="130" rx="250" ry="16" fill="#000" opacity=".25" filter="url(#blur5)"/>` +
    `<path d="M250,0 L${340 + tail * .5},${-70 + tail} L${318},${4 + tail * .6} L${330 + tail * .5},${56 + tail} Z" fill="#5c6670"/>` +
    `<path d="M-270,6 C-250,-44 -120,-66 20,-56 C140,-48 220,-22 262,0 C220,26 120,56 -20,60 C-150,62 -250,44 -270,6Z" fill="url(#shG)"/><path d="M-270,6 C-250,-44 -120,-66 20,-56 C140,-48 220,-22 262,0 C220,26 120,56 -20,60 C-150,62 -250,44 -270,6Z" fill="#000" filter="url(#grainR)" opacity=".35"/>` +
    `<path d="M30,-56 L70,-92 L104,-50Z" fill="#59636d"/><path d="M170,-30 L192,-50 L206,-24Z" fill="#59636d"/><path d="M-110,44 L-60,112 L-30,56Z" fill="#59636d"/><path d="M120,40 L150,70 L164,34Z" fill="#59636d"/>` +
    `<circle cx="-222" cy="-6" r="7" fill="#c8d4dc"/><circle cx="-223" cy="-6" r="3.5" fill="#0a0f14"/><path d="M-268,18 Q-240,30 -214,22" stroke="#2c343c" stroke-width="3" fill="none"/>` + [0, 1, 2, 3, 4].map(i => `<path d="M${-170 + i * 12},-16 q-6,16 0,34" stroke="#3a444e" stroke-width="2.5" fill="none"/>`).join('') + `</g>`;
  s += lbl(360, 470, 'قرشُ غرينلاند', ease(ramp(t, WS(7, 1), WS(7, 2) + .3)), '#fff', 34);
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(8)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 6), WS(8, 6) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneRecord }, { s: S0(2) - .2, f: sceneHeart }, { s: S0(3) - .2, f: sceneTeeth }, { s: S0(4) - .2, f: sceneGen }, { s: S0(5) - .2, f: scenePop }, { s: S0(6) - .2, f: sceneRisk }, { s: S0(7) - .2, f: sceneShark }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneRecord, sceneHeart, sceneTeeth, scenePop, sceneRisk]);
const XF = .5;
const TLI = [['قلبٌ لا يرتاح', S0(2)], ['أسنانٌ تبلى', S0(3)], ['ثلاثون جيلاً', S0(4)], ['أرضٌ مزدحمة', S0(5)]];
const LIST_ON = new Set([sceneHeart, sceneTeeth, sceneGen]);
const CHIPS = [
  ['c1', '٨ أضعافِ الرقمِ القياسيّ', 360, 330, 'big', WS(1, 12), S0(2) - .3], ['c2', '٣٧ مليار دقّة', 360, 330, 'big', WS(2, 5), S0(3) - .3], ['c3', 'المينا لا يتجدّد', 360, 330, 'big', WS(3, 6), S0(4) - .3],
  ['c4', 'ثلاثون جيلاً معاً', 360, 330, 'big', WS(4, 5), S0(5) - .3], ['c5', 'الضِّعفُ في ٦٠ سنة', 360, 330, 'big', WS(5, 9), S0(6) - .3], ['c6', 'ثلثُ الناسِ فقط', 360, 330, 'red', WS(6, 16), S0(7) - .3],
  ['c7', '≈ ٤٠٠ سنة', 360, 330, 'big', WS(7, 5), S0(8) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 6), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ألفُ سنة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
