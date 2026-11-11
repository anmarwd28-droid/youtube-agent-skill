// ===================== chapter 9 (a million years) and the ending =====================
function sceneIceBall(t) {
  const v = lerp(-200, -240, ease(ramp(t, WS(56, 8), WS(56, 16)))), cam = g3(t, { d: 6.4, el: .2, az: 5.2, sunI: 0, lights: 0, amb: .75, ice: 1, tg: [-1.1, 0, 0], clouds: 0, atm: .12 });
  F.ov = thermo(190, 440, 230, v, -273, 20) + txt(880, 640, 'محيطاتٌ متجمّدة حتى الأعماق', ramp(t, WS(56, 3), WS(56, 3) + .5) * (1 - ramp(t, WS(56, 8), WS(56, 8) + .4)), '#cfe0ff', 28);
  return spaceW(t, { mw: .5, mwy: 620, mwa: -6 });
}
chip('٢٤٠° تحت الصفر', 880, 650, 'ice', WS(56, 12), S0(57) - .4);
function sceneFar(t) {
  const cam = g3(t, { d: 17, el: .12, az: 2.2, sunI: 0, lights: 0, amb: .75, ice: 1, tg: [-4.6, 0, 0], clouds: 0, atm: .1, daz: .003 }), e = proj3w(cam, [0, 0, 0]), p = ease(ramp(t, WS(57, 1), WS(57, 9))), x0 = 190, x1 = e[0] - 110, xe = lerp(x0 + 70, x1, p);
  F.ov = `<circle cx="${x0}" cy="${e[1]}" r="52" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="9 8"/>` + txt(x0, e[1] + 96, 'مكانُ الشمسِ القديم', 1, '#f4c76b', 22) + `<path d="M${x0 + 62},${e[1]} H${xe.toFixed(1)}" stroke="#fff" stroke-width="3" stroke-dasharray="4 10" opacity=".8"/>` +
    `<g opacity="${ramp(t, WS(57, 6), WS(57, 6) + .5).toFixed(2)}">` + txt((x0 + x1) / 2 + 20, e[1] - 34, '١٠٠ سنة ضوئيّة', 1, '#fff', 40) + txt((x0 + x1) / 2 + 20, e[1] + 50, '٣٠ كيلومتراً في الثانية × مليون سنة', 1, 'rgba(255,255,255,.7)', 21) + `</g>` + txt(e[0], e[1] + 130, 'الأرض', 1, '#cfe0ff', 24);
  return spaceW(t, { mw: .7, mwy: 170, mwa: 10 });
}
function probeS(x, y, s, t) { return `<g transform="translate(${x.toFixed(1)},${(y + Math.sin(t * 1.1) * 6).toFixed(1)}) scale(${s})"><path d="M-40,14 L-420,150 L-380,-90Z" fill="#7affd8" opacity="${(.08 + .04 * Math.sin(t * 5)).toFixed(2)}"/><ellipse rx="120" ry="30" fill="#8a94a8"/><ellipse cy="-6" rx="118" ry="22" fill="#b8c2d4"/><path d="M-50,-22 q50,-56 100,0Z" fill="#5ad8c8" opacity=".8"/><path d="M-36,-24 q36,-36 60,-6" stroke="#fff" stroke-width="3" fill="none" opacity=".5"/>` + [-84, -42, 0, 42, 84].map((q, i) => `<circle cx="${q}" cy="10" r="6" fill="${Math.floor(t * 4 + i) % 5 === 0 ? '#fff' : '#f4c76b'}"/>`).join('') + `<ellipse cy="26" rx="60" ry="7" fill="#000" opacity=".3"/></g>`; }
function sceneProbe(t) {
  const cam = g3(t, { d: 7.4, el: .16, az: 3.4, sunI: 0, lights: 0, amb: .75, ice: 1, tg: [1.7, 0, 0], clouds: 0, atm: .1 }), px = lerp(1420, 880, ease(ramp(t, S0(58), WS(58, 7)))), a = ramp(t, WS(58, 11), WS(58, 11) + .5), X = 800, Y = 250;
  const lay = [['مدن', '#8a94a8', WS(58, 15)], ['محيطات', '#3a7ac0', WS(58, 16)], ['حياة', '#ff9a4a', WS(58, 17)]];
  F.ov = probeS(px, 300 - 40 * a, 1 - .25 * a, t) + `<g opacity="${a.toFixed(2)}">` + panel(X, Y, 400, 330) + `<rect x="${X + 24}" y="${Y + 24}" width="352" height="46" rx="8" fill="#e4eefa"/>` + txt(X + 200, Y + 56, 'جليد', 1, '#0d2238', 24) +
    lay.map((l, i) => { const k = ramp(t, l[2], l[2] + .4); return `<g opacity="${(.15 + .85 * k).toFixed(2)}"><rect x="${X + 24}" y="${Y + 82 + i * 76}" width="352" height="64" rx="8" fill="${l[1]}"/>` + (i === 0 ? Array.from({ length: 9 }, (_, q) => `<rect x="${X + 40 + q * 26}" y="${Y + 146 - 20 - (q * 7) % 30}" width="18" height="${20 + (q * 7) % 30}" fill="#2a3040"/>`).join('') : i === 1 ? fishS(X + 90, Y + 190, 1.2, 1) + fishS(X + 160, Y + 200, .9, -1) : worms(X + 90, Y + 296, 5, 3, t, .5) + `<path d="M${X + 150},${Y + 296} l10,-40 l14,0 l10,40Z" fill="#3a302a"/>`) + txt(X + 300, Y + 124 + i * 76, l[0], 1, '#fff', 28) + `</g>`; }).join('') + `</g>`;
  return spaceW(t, { mw: .5, mwy: 620, mwa: -4 });
}
const GAL = (() => { const r = RS(123), o = []; for (let i = 0; i < 1500; i++) { const arm = i % 4, d = Math.pow(r(), .7) * 300, a = arm * 1.5708 + d * .0125 + (r() - .5) * (.9 - d * .0016), sp = (r() - .5) * 26; o.push([Math.cos(a) * d + sp, Math.sin(a) * d + sp, Math.pow(r(), 3) * 1.6 + .5, r()]); } return o; })();
const ROG = (() => { const r = RS(321); return Array.from({ length: 90 }, () => { const d = 40 + Math.sqrt(r()) * 290, a = r() * 6.283; return [Math.cos(a) * d, Math.sin(a) * d, r()]; }); })();
function sceneRogue(t) {
  noW(); const rot = t * 1.2, n = Math.floor(ramp(t, WS(59, 4), WS(59, 9) + .8) * 90);
  let g = `<circle r="330" fill="#6a7ae8" opacity=".1" filter="url(#haze)"/><circle r="90" fill="#ffe8c0" opacity=".5" filter="url(#haze)"/><circle r="34" fill="#fff4dc" opacity=".8" filter="url(#soft)"/>` + GAL.map(s => `<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="${s[2].toFixed(2)}" fill="${s[3] < .2 ? '#ffe2c0' : s[3] > .8 ? '#bcd0ff' : '#fff'}" opacity="${(.4 + .5 * s[3]).toFixed(2)}"/>`).join('');
  ROG.slice(0, n).forEach((p, i) => { const k = i === n - 1 ? 1 : 0; g += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(4 + k * 3).toFixed(1)}" fill="#f4c76b"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="9" fill="none" stroke="#f4c76b" stroke-width="1.5" opacity=".5"/>`; });
  const er = [160 * Math.cos(.8), 160 * Math.sin(.8)];
  return spaceW(t, { st: .6 }) + `<g transform="translate(600,400) scale(1.25,.62) rotate(${rot.toFixed(2)})">${g}<circle cx="${er[0]}" cy="${er[1]}" r="7" fill="#9fd0ff"/></g>` + txt(600 + 250, 400 + 150, '', 0);
}
chip('ملياراتُ الكواكبِ الشاردة', 640, 650, 'big', WS(59, 7), S0(60) - .4);
function sceneSurprise(t) {
  noW(); return camMv(ventW(t), t, S0(60) - .2, S0(61), [1.25, 380, 820], [1.6, 330, 900]);
}
chip('الحياةُ لم تنتهِ', 640, 170, 'big', WS(60, 5), S0(61) - .3);
function sceneRockLife(t) {
  noW(); const r = RS(77); let s = `<defs>${DEFB()}<linearGradient id="rl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a342e"/><stop offset="1" stop-color="#1c1614"/></linearGradient></defs><rect width="1280" height="720" fill="url(#rl)"/><rect width="1280" height="720" fill="#000" filter="url(#rockTex)" opacity=".5"/>`;
  for (let i = 0; i < 9; i++) { let x = 80 + i * 140 + r() * 60, y = 90 + r() * 80, d = `M${x.toFixed(0)},${y.toFixed(0)}`, pts = []; for (let q = 0; q < 7; q++) { x += (r() - .5) * 110; y += 50 + r() * 50; d += ` L${x.toFixed(0)},${y.toFixed(0)}`; pts.push([x, y]); }
    s += `<path d="${d}" stroke="#0a0806" stroke-width="${(7 + r() * 6).toFixed(0)}" fill="none" stroke-linejoin="round"/><path d="${d}" stroke="#2a4a5a" stroke-width="3" fill="none" opacity=".5"/>`;
    pts.forEach((p, q) => { for (let z = 0; z < 3; z++) { const gx = p[0] + (r() - .5) * 26, gy = p[1] + (r() - .5) * 26, pu = .5 + .5 * Math.sin(t * 2 + i + q + z); s += `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="${(9 + pu * 5).toFixed(1)}" fill="#7affb0" opacity="${(.1 + .1 * pu).toFixed(2)}"/><rect x="${(gx - 5).toFixed(1)}" y="${(gy - 2).toFixed(1)}" width="10" height="4" rx="2" fill="#aaffc8" transform="rotate(${(r() * 180).toFixed(0)},${gx.toFixed(1)},${gy.toFixed(1)})"/>`; } }); }
  F.ov = `<g opacity="${ramp(t, WS(61, 6), WS(61, 6) + .5).toFixed(2)}">` + panel(380, 300, 520, 110) + txt(640, 352, 'كائناتٌ مجهريّة في شقوقِ الصخور', 1, '#aaffc8', 30) + txt(640, 390, 'على عمقِ كيلومتراتٍ تحت السطح', 1, 'rgba(255,255,255,.75)', 21) + `</g>`;
  return s;
}
function sceneCore(t) {
  noW(); const cx = 640, cy = 390, R = 250, p = 1 + .03 * Math.sin(t * 2.2), a = ramp(t, WS(61, 16), WS(61, 16) + .5);
  let s = spaceW(t, { mw: .5, mwy: 130, mwa: 8 }) + `<defs><radialGradient id="mant"><stop offset="0" stop-color="#ffb04a"/><stop offset=".55" stop-color="#d8582a"/><stop offset="1" stop-color="#7a2a1a"/></radialGradient><radialGradient id="icore"><stop offset="0" stop-color="#fffbe0"/><stop offset=".6" stop-color="#ffe070"/><stop offset="1" stop-color="#ffb030"/></radialGradient><clipPath id="cut"><path d="M${cx},${cy} L${cx + R + 10},${cy} L${cx + R + 10},${cy + R + 10} L${cx - R - 10},${cy + R + 10} L${cx - R - 10},${cy - R - 10} L${cx},${cy - R - 10}Z"/></clipPath></defs>` +
    `<circle cx="${cx}" cy="${cy}" r="${(R * 1.5 * p).toFixed(1)}" fill="#ff9a3a" opacity=".1" filter="url(#haze)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#mant)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#000" filter="url(#rockTex)" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${R * .55}" fill="#ff9a2a"/><circle cx="${cx}" cy="${cy}" r="${(R * .55 * p).toFixed(1)}" fill="#ffc24a" opacity=".5" filter="url(#soft)"/><circle cx="${cx}" cy="${cy}" r="${(R * .22 * p).toFixed(1)}" fill="url(#icore)"/><circle cx="${cx}" cy="${cy}" r="${(R * .4).toFixed(1)}" fill="#fff6c8" opacity="${(.2 + .1 * Math.sin(t * 2.2)).toFixed(2)}" filter="url(#haze)"/>` +
    `<g clip-path="url(#cut)"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#dfeaf6"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#6a8ab0" filter="url(#wallI)" opacity=".5"/><circle cx="${cx - 60}" cy="${cy - 40}" r="${R}" fill="#000" opacity=".12"/></g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#eef6ff" stroke-width="7"/><path d="M${cx},${cy} L${cx},${cy - R} M${cx},${cy} L${cx + R},${cy}" stroke="#2a1410" stroke-width="3" opacity=".5"/>`;
  for (let i = 0; i < 5; i++) { const an = -1.4 + i * .3, k = pmod(t * .4 + i / 5, 1), r0 = R * .26 + k * R * .6; s += `<path d="M${(cx + Math.cos(an) * r0).toFixed(1)},${(cy + Math.sin(an) * r0).toFixed(1)} l${(Math.cos(an) * 26).toFixed(1)},${(Math.sin(an) * 26).toFixed(1)}" stroke="#fff3c8" stroke-width="5" stroke-linecap="butt" opacity="${Math.sin(k * 3.14).toFixed(2)}"/>`; }
  F.ov = `<g opacity="${ramp(t, WS(61, 11), WS(61, 11) + .5).toFixed(2)}">` + txt(1010, 300, 'حرارةُ باطنِ الأرض', 1, '#ffb04a', 30) + arrow(960, 316, 800, 330, 1, '#ffb04a', 4) + `</g><g opacity="${a.toFixed(2)}">` + txt(1010, 470, 'تكفي ملياراتِ السنين', 1, '#f4c76b', 30) + `</g>` + txt(250, 300, 'قشرةٌ من جليد', ramp(t, WS(61, 12), WS(61, 12) + .5), '#eef6ff', 24);
  return s;
}
chip('نارٌ في قلبِ الأرض', 640, 660, 'big', WS(62, 5), CS(10));
// ---------- the ending ----------
function sceneSunBack(t) {
  const T = t - CS(10), cam = orbit(8.8 - T * .08, .12, .02 + T * .008, [-2.1, 0, 0]);
  F.w = { set: 'space', cam, L: [-1, .2, .7], disc: { m: 1, spin: 3.9 + t * .03, clouds: .5, sunI: 1, lights: .3 }, sun: { pos: SUNP, r: 1.35, a: 1 } }; F.ov = '';
  return spaceW(t);
}
chip('الشمسُ باقية: ٥ مليارات سنة', 700, 650, 'big', WS(63, 5), S0(64) - .4);
function sceneChoice(t) {
  noW(); const L = camG(bunkerW(t) + bunkPpl(t), 1.5, 380, 880), Rr = camG(iceLid(t, { id: 'ch' }) + subM(420 - (t - S0(64)) * 10, 1000, .8, t), 1.2, 380, 950), aL = ramp(t, WS(64, 6), WS(64, 6) + .4), aR = ramp(t, WS(64, 11), WS(64, 11) + .4);
  F.ov = `<rect x="637" y="0" width="6" height="720" fill="#f4c76b"/>` + `<g opacity="${aL.toFixed(2)}"><rect x="170" y="590" width="300" height="64" rx="16" fill="#f4c76b"/>` + lbl(320, 633, 'ملجأٌ تحت الأرض', 1, '#1c140a', 30).replace('stroke="#000"', 'stroke="none"') + `</g><g opacity="${aR.toFixed(2)}"><rect x="800" y="590" width="320" height="64" rx="16" fill="#e1f2ff"/>` + lbl(960, 633, 'غوّاصةٌ تحت الجليد', 1, '#0d2238', 30).replace('stroke="#000"', 'stroke="none"') + `</g>` +
    `<circle cx="640" cy="360" r="46" fill="#0a0e1c" stroke="#f4c76b" stroke-width="4"/>` + lbl(640, 374, 'أم', 1, '#f4c76b', 36);
  return `<defs><clipPath id="hL"><rect x="0" y="0" width="640" height="720"/></clipPath><clipPath id="hR"><rect x="640" y="0" width="640" height="720"/></clipPath></defs><g clip-path="url(#hL)"><g transform="translate(-320,0)">${L}</g></g><g clip-path="url(#hR)"><g transform="translate(320,0)">${Rr}</g></g>`;
}
function sceneEarth(t) {
  const q = ease(ramp(t, S0(65), S0(65) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, cam = g3(t, { d: 6.6, el: .2, az: .9, sunI: 1, lights: .4, tg: [0, .3, 0], daz: .03 });
  F.ov = `<g opacity="${q.toFixed(2)}"><text x="1000" y="400" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="230" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(65, 4), WS(65, 4) + .4).toFixed(2)}" transform="translate(250,${420 - b})"><rect x="-140" y="-42" width="280" height="84" rx="20" fill="#e53935"/><text x="0" y="16" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="42" fill="#fff">اشترك</text></g>`;
  return spaceW(t, { mw: .3, mwy: 620, mwa: -5 });
}
chip('اكتبْ جوابَك في التعليقات', 640, 128, '', WS(65, 0), 999); chip('@MadhaLawLab', 250, 520, 'dark', WS(65, 4), 999);
