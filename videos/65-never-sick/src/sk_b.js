// sk_b.js (#65): scenes 6-13 (money, deaths, long lives, crowding, cars, animals still sick, the end) + scene list and UI
// ---------- 6: the world spends about 10 trillion dollars a year on health; it goes to schools and science ----------
function coin(x, y, r, a = 1) { return `<g opacity="${a.toFixed(2)}"><ellipse cx="${x.toFixed(1)}" cy="${(y + r * .15).toFixed(1)}" rx="${r}" ry="${(r * .9).toFixed(1)}" fill="#a87a1a"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${r}" ry="${(r * .9).toFixed(1)}" fill="#f4c84a"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(r * .7).toFixed(1)}" ry="${(r * .62).toFixed(1)}" fill="none" stroke="#c89a2a" stroke-width="2"/><ellipse cx="${(x - r * .3).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" rx="${(r * .25).toFixed(1)}" ry="${(r * .15).toFixed(1)}" fill="#fff" opacity=".5"/></g>`; }
function iconSchool(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-90" y="-80" width="180" height="80" fill="#c8704a"/><path d="M-104,-80 L0,-140 L104,-80Z" fill="#8a3a2a"/><rect x="-16" y="-50" width="32" height="50" fill="#5a3a2a"/>${[-64, -36, 36, 64].map(xx => `<rect x="${xx - 9}" y="-62" width="18" height="22" fill="#cfe4f0"/>`).join('')}<circle cx="0" cy="-104" r="12" fill="#f4f4f0"/><path d="M0,-140 V-176" stroke="#5a5a5a" stroke-width="3"/><path d="M0,-176 h26 v14 h-26Z" fill="#3a8ad8"/></g>`; }
function sceneMoney(t) {
  const T = t - (S0(6) - .2), cnt = ease(ramp(t, WS(6, 3), WS(6, 6) + .4)), fl = ease(ramp(t, WS(6, 11) - .2, WS(6, 14)));
  glE(t, { d: lerp(10.4, 9.6, ease(ramp(t, S0(6) - .2, S0(7)))), el: .25, lon: -20 + T * 5, clouds: .45, lights: .3, off: -.4, tg: [0, -.55, 0] });
  let ov = `<defs>${SKD()}</defs>`;
  const v = (9.8 * cnt).toFixed(1).replace('.', '٫').replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  ov += `<g opacity="${clamp(cnt * 4).toFixed(2)}">${panel(150, 420, 420, 150)}<text x="360" y="508" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="#f4c76b" direction="rtl">${v} تريليون $</text>${SKL(360, 552, 'كلَّ عامٍ على الصحّة', 1, '#fff', 24)}</g>`;
  // coins stream from the globe to a school and a laboratory
  if (fl > 0) { ov += `<g opacity="${clamp(fl * 3).toFixed(2)}">${iconSchool(160, 1150, 1)}${microscope(560, 1150, 1.3)}${SKL(160, 1200, 'مدارس', 1, '#fff', 28)}${SKL(560, 1200, 'علوم', 1, '#fff', 28)}</g>`;
    for (let i = 0; i < 18; i++) { const side = i % 2, ph = pmod(t * .7 + i / 18 * 2, 1), x0 = 360, y0 = 760, x1 = side ? 560 : 160, y1 = 1040, x = lerp(x0, x1, ph), y = lerp(y0, y1, ph) - Math.sin(ph * Math.PI) * 120; ov += coin(x, y, 14, fl * Math.min(1, (1 - ph) * 4) * Math.min(1, ph * 6)); } }
  F.ov = ov; return space(t);
}

// ---------- 7: more than 80% of deaths in the world are caused by disease (WHO) ----------
function donutSeg(cx, cy, R, w, a0, a1, col) { const p = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r], [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, R - w), [x3, y3] = p(a0, R - w), lg = a1 - a0 > Math.PI ? 1 : 0;
  return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${lg} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${R - w},${R - w} 0 ${lg} 0 ${x3.toFixed(1)},${y3.toFixed(1)}Z" fill="${col}"/>`; }
function sceneDeaths(t) {
  const T = t - (S0(7) - .2), k = ease(ramp(t, WS(7, 1), WS(7, 5) + .3)), lab = ease(ramp(t, WS(7, 10), WS(7, 11)));
  glE(t, { d: 10.4, el: .25, lon: 40 + T * 4, clouds: .45, lights: .3, off: -.4, tg: [0, .9, 0] });
  const cx = 360, cy = 800, R = 230, w = 80, a0 = -Math.PI / 2, dis = .92 * k, inj = .08 * k;
  let ov = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#050812" opacity=".55"/>` + `<circle cx="${cx}" cy="${cy}" r="${R + 20}" fill="#0a0e1c" opacity=".85"/>`;
  ov += `<circle cx="${cx}" cy="${cy}" r="${R - w / 2}" fill="none" stroke="#2a3040" stroke-width="${w}"/>`;
  if (k > 0) ov += donutSeg(cx, cy, R, w, a0, a0 + dis * 6.2832, '#d8443a') + donutSeg(cx, cy, R, w, a0 + .92 * 6.2832, a0 + (.92 + inj) * 6.2832, '#f4c76b');
  ov += `<text x="${cx}" y="${cy + 10}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="84" fill="#fff" direction="rtl" opacity="${clamp(k * 2).toFixed(2)}">٨٠٪</text>` + SKL(cx, cy - 74, 'أكثرُ من', clamp(k * 2), '#fff', 30) + `` + SKL(cx, cy + 70, 'سببُها المرض', lab, '#ff9a8a', 32);
  ov += SKL(cx - 170, cy - R - 30, 'الحوادث', clamp(k * 3 - 2) * .9, '#f4c76b', 26) + SKL(cx, cy + R + 70, 'وفياتُ العالمِ كلَّ عام', clamp(k * 3), '#fff', 28);
  F.ov = ov; return space(t);
}

// ---------- 8: people live until their bodies slowly age; many pass 100 ----------
function cake(x, y, s, t, a) {
  if (a <= 0) return ''; let g = `<g transform="translate(${x},${y}) scale(${s})" opacity="${a.toFixed(2)}"><ellipse cx="0" cy="4" rx="110" ry="14" fill="#000" opacity=".3" filter="url(#blur5)"/><ellipse cx="0" cy="0" rx="100" ry="18" fill="#e8e8ec"/>` +
    `<rect x="-80" y="-90" width="160" height="88" fill="#f4e4d0"/><ellipse cx="0" cy="-2" rx="80" ry="14" fill="#f4e4d0"/><ellipse cx="0" cy="-90" rx="80" ry="14" fill="#fff4f0"/><path d="M-80,-86 q20,24 40,0 q20,24 40,0 q20,24 40,0 q20,24 40,0" fill="#f4a8b8"/><rect x="-80" y="-44" width="160" height="12" fill="#d8708a"/>`;
  [-50, -16, 18, 52].forEach((cx, i) => { g += `<rect x="${cx - 4}" y="-130" width="8" height="40" fill="${['#4a8ad8', '#e8c040', '#6ac08a', '#e85a4a'][i]}"/><ellipse cx="${cx + Math.sin(t * 9 + i) * 1.5}" cy="-140" rx="5" ry="10" fill="#ffd060"/>` + scr(`<circle cx="${cx}" cy="-140" r="22" fill="url(#lampG)" opacity=".7"/>`); });
  return g + `<text x="0" y="-52" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#8a3a4a">١٠٠</text></g>`;
}
function sceneAge(t) {
  const T = t - (S0(8) - .2), u = ease(ramp(t, S0(8), WS(8, 9))), age = Math.round(lerp(8, 102, u)), ck = ease(ramp(t, WS(8, 8), WS(8, 9) + .4));
  let s = `<defs>${SKD()}</defs>`;
  // a park path at golden hour
  s += `<linearGradient id="agS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa0c8"/><stop offset=".7" stop-color="#f0c8a0"/><stop offset="1" stop-color="#f8e0c0"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#agS)"/>`;
  s += sun3(560, 760, .8) + farCity(41, 900, '#b8a4a8') + forestR(930, 26, 60, 110, 47, '#5a7a4a') + `<rect x="-20" y="920" width="760" height="380" fill="#7a9a4a"/><rect x="-20" y="920" width="760" height="380" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<path d="M-20,1080 Q360,1030 740,1080 L740,1170 Q360,1120 -20,1170Z" fill="#d8c8a8"/><path d="M-20,1080 Q360,1030 740,1080" stroke="#b8a888" stroke-width="3" fill="none"/>`;
  s += treeR(110, 1000, 300, 71, t) + treeR(640, 990, 260, 73, t);
  // one person walks along the path and grows older: child → adult → grey → old with a cane
  const x = lerp(80, 470, u), st = u < .2 ? 0 : u < .55 ? 1 : u < .8 ? 2 : 3, hair = ['#2a1d16', '#2a1d16', '#9a9890', '#e8e8e4'][st];
  if (st === 0) s += kid(x, 1130, .78, 1, 1, { walk: T * 5 });
  else { const sc = .86 - (st === 3 ? .04 : 0); s += hero(x, 1130, Object.assign({ s: sc, face: 1, shade: 1, walk: T * (st === 3 ? 2.6 : 4), amp: st === 3 ? .25 : .42, lean: st === 3 ? 8 : 0 }, gp(2), { hair }));
    if (st === 3) s += `<path d="M${x + 44},${1130 - 120 * sc} L${x + 56},1130" stroke="#5a3a1e" stroke-width="7" stroke-linecap="round"/><path d="M${x + 44},${1130 - 120 * sc} q-4,-10 -16,-8" stroke="#5a3a1e" stroke-width="7" fill="none" stroke-linecap="round"/>`; }
  const ar = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  s += `${panel(250, 420, 220, 120)}<text x="360" y="500" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="${age >= 100 ? '#f4c76b' : '#fff'}" direction="rtl">${ar(age)}</text>${SKL(360, 580, 'عاماً', 1, '#fff', 28)}`;
  s += cake(625, 1190, .78, t, ck);
  noEarth(); F.ov = ''; return s;
}

// ---------- 9: the population jumps, cities crowd, food and water become the big challenge ----------
function wheatI(x, y, s) { let g = `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 V-120" stroke="#c8a040" stroke-width="5"/>`; for (let i = 0; i < 6; i++) g += `<ellipse cx="-10" cy="${-60 - i * 12}" rx="7" ry="13" fill="#e8c050" transform="rotate(-30,-10,${-60 - i * 12})"/><ellipse cx="10" cy="${-66 - i * 12}" rx="7" ry="13" fill="#e8c050" transform="rotate(30,10,${-66 - i * 12})"/>`; return g + `</g>`; }
function dropI(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-120 Q46,-50 46,-30 A46,46 0 0 1 -46,-30 Q-46,-50 0,-120Z" fill="#4a9ae8"/><ellipse cx="-16" cy="-40" rx="10" ry="18" fill="#fff" opacity=".45"/></g>`; }
function scenePop(t) {
  const T = t - (S0(9) - .2), cr = ease(ramp(t, WS(9, 4), WS(9, 5) + .6)), ch = ease(ramp(t, WS(9, 6), WS(9, 8)));
  let top = '';
  // a crowded square: rows of people that fill up
  const rows = [[1012, .5, 14], [1040, .54, 13], [1070, .59, 12], [1102, .64, 11]];
  rows.forEach(([y, sc, n], r) => { for (let i = 0; i < n; i++) { const k = clamp(cr * 1.5 + .6 - (i % 3) * .25 - r * .1); if (r > 1 && k <= 0) continue; const f = (i + r) % 2 ? 1 : -1, x = (i + .5) / n * 760 - 20 + (r % 2) * 20 + Math.sin(T * .5 + i) * 6;
    top += `<g opacity="${(r < 2 ? 1 : k).toFixed(2)}">` + hero(x, y, Object.assign({ s: sc, face: f, shade: 1, walk: (i % 4 === 0) ? T * 3 + i : null, amp: .35 }, gp(i + r))) + `</g>`; } });
  let s = `<defs>${SKD()}</defs>` + streetK(t, { id: 'pp', top });
  s += `<g opacity="${ch.toFixed(2)}">${panel(120, 380, 480, 250)}${wheatI(250, 560, 1)}${dropI(470, 560, 1)}${SKL(250, 600, 'الطعام', 1, '#fff', 28)}${SKL(470, 600, 'الماء', 1, '#fff', 28)}<path d="M360,420 L384,462 H336Z" fill="#e8b030" stroke="#3a2a0a" stroke-width="3"/><text x="360" y="458" text-anchor="middle" font-size="28" font-weight="700" fill="#3a2a0a">!</text></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10-11: the strangest part: cars become the biggest killer; road crashes kill more than a million a year (WHO) ----------
function sceneCars(t) {
  const T = t - (S0(10) - .2), wr = ease(ramp(t, WS(10, 6) - .2, WS(10, 6) + .3)), N = .55;
  let road = '';
  const LN = [[1180, 1, .95, 120], [1250, -1, 1.05, 140]];
  const cols = ['#c8302a', '#3a5a8a', '#e8e4dc', '#2a2a2e', '#7a8a9a', '#c8a02a', '#3a6a4a'];
  LN.forEach(([y, f, sc, sp], l) => { for (let i = 0; i < 5; i++) { const x = pmod(i * 230 + l * 90 + f * T * sp, 1150) - 200; road += car(f > 0 ? x : 740 - x, y, sc, cols[(i * 3 + l) % cols.length], f, 1); } });
  let s = `<defs>${SKD()}</defs>` + streetK(t, { N, id: 'cr', top: road });
  // the warning sign and a pulse of red over the road
  if (wr > 0) s += scr(`<rect x="-20" y="1120" width="760" height="180" fill="#ff3a2a" opacity="${(.12 * wr * (.6 + .4 * Math.sin(t * 6))).toFixed(2)}" filter="url(#blur9)"/>`) +
    `<g opacity="${wr.toFixed(2)}" transform="translate(360,${lerp(560, 600, wr).toFixed(1)})"><path d="M0,-110 L110,80 H-110Z" fill="#000" opacity=".4" transform="translate(4,6)"/><path d="M0,-110 L110,80 H-110Z" fill="#f4c040" stroke="#c0392b" stroke-width="14" stroke-linejoin="round"/>` +
    `<g transform="translate(0,26) scale(.55)">${car(0, 40, .9, '#2a2a2e', 1, 0)}</g><path d="M-6,-60 h12 l-3,60 h-6Z" fill="#2a2a2e"/></g>`;
  const big = ease(ramp(t, S0(11) - .2, WS(11, 7) + .3));
  if (big > 0) s += `<g opacity="${big.toFixed(2)}">${panel(110, 760, 500, 160)}<text x="360" y="850" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="50" fill="#ff8a7a" direction="rtl">أكثرُ من مليون</text>${SKL(360, 896, 'وفاة على الطرقِ كلَّ عام', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: germs do not vanish; animals and plants still get sick; only we are protected ----------
function sickLeaf(bx, by, L, ang, seed) { const r = RS(seed); let g = leafL(bx, by, L, ang, seed, {}); for (let i = 0; i < 6; i++) { const u = .25 + r() * .6, a = ang * Math.PI / 180, x = bx + Math.cos(a) * L * u + (r() - .5) * 18, y = by + Math.sin(a) * L * u + (r() - .5) * 14;
  g += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(4 + r() * 6).toFixed(1)}" fill="#8a6a2a" opacity=".85"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + r() * 3).toFixed(1)}" fill="#3a2a10" opacity=".7"/>`; } return g; }
function sceneAnimals(t) {
  const T = t - (S0(12) - .2), an = ease(ramp(t, WS(12, 4), WS(12, 6))), us = ease(ramp(t, WS(12, 8), WS(12, 10)));
  let s = `<defs>${SKD()}</defs><linearGradient id="fmS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ac8"/><stop offset=".7" stop-color="#c8dcec"/><stop offset="1" stop-color="#e8eedc"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#fmS)"/>`;
  s += cumulus(200 + T * 3, 500, 260, 91, { a: .8 }) + mountainsR(880, 90, 93, { snowAt: 0, rock: '#7a8a7a' }) + forestR(900, 26, 50, 90, 95, '#4a6a3a');
  s += `<rect x="-20" y="900" width="760" height="400" fill="#7aa04a"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // a wooden fence, a cow and a sheep-coloured cow, germs around them
  for (let i = 0; i < 9; i++) s += `<rect x="${i * 90 - 10}" y="930" width="12" height="80" fill="#8a6a44"/>`; s += `<path d="M-20,950 H740 M-20,985 H740" stroke="#9a7a54" stroke-width="8"/>`;
  s += quad(230, 1080, .95, { kind: 'cow', face: 1, moving: 0, phase: t, graze: 1 }) + quad(530, 1060, .72, { kind: 'horse', face: -1, moving: 0, col: '#8a5a3a' });
  for (let i = 0; i < 8; i++) { const r = RS(70 + i), x = 120 + r() * 520, y = 900 + r() * 140 + Math.sin(t * 2 + i) * 10; s += germ(x, y, 9, t, i, an * .9); }
  // a sick plant in the foreground: leaves with brown spots
  s += `<path d="M600,1300 Q585,1130 615,990" stroke="#3a6a2a" stroke-width="12" fill="none"/>` + sickLeaf(605, 1170, 170, -155, 3) + sickLeaf(612, 1060, 150, -35, 5) + sickLeaf(598, 1240, 180, -15, 7) + sickLeaf(610, 1000, 120, -120, 9);
  // a farmer with the gold shield
  const fx = 150; s += hero(fx, 1250, Object.assign({ s: .9, face: 1, shade: 1 }, gp(3))) + shieldP(fx, 1250, .9, us * (.85 + .15 * Math.sin(t * 3)));
  s += SKL(380, 760, 'الحيواناتُ والنباتاتُ تمرض', an, '#ff9a8a', 30) + SKL(fx + 30, 820, 'نحنُ فقط', us, '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}

// ---------- 13: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(13, 0) - .2, WS(13, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(13, 9) - .3, WS(13, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneNo }, { s: S0(2) - .2, f: sceneBact }, { s: S0(3) - .2, f: sceneAttack }, { s: S0(4) - .2, f: sceneWard },
  { s: S0(5) - .2, f: scenePharm }, { s: S0(6) - .2, f: sceneMoney }, { s: S0(7) - .2, f: sceneDeaths }, { s: S0(8) - .2, f: sceneAge }, { s: S0(9) - .2, f: scenePop },
  { s: S0(10) - .2, f: sceneCars }, { s: S0(12) - .2, f: sceneAnimals }, { s: S0(13) - .2, f: sceneEarth }];
const NOKB = new Set([sceneNo, sceneBact, sceneAttack, sceneMoney, sceneDeaths]);
const XF = .5;
const TLI = [['المستشفيات', S0(4)], ['الصيدليّات', S0(5)], ['المال', S0(6)], ['الأعمار', S0(8)], ['الزحام', S0(9)], ['الأغرب', S0(10)]];
const LIST_ON = new Set([sceneWard]);
const CHIPS = [
  ['c0', 'لا مرضَ بعدَ اليوم', 360, 330, 'big', WS(0, 8), S0(1) - .3],
  ['c1', 'المناعةُ تنتصرُ دائماً', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', '٣٨ تريليون بكتيريا', 360, 330, 'big', WS(2, 5), S0(3) - .3],
  ['c3', 'هجومٌ كلَّ يوم', 360, 330, 'red big', WS(3, 1), WS(3, 9) - .1],
  ['c4', 'المستشفياتُ تفرغ', 360, 330, 'big', WS(4, 3), S0(5) - .3],
  ['c5', 'ملايينُ الأطباءِ بلا عمل', 360, 330, 'big', WS(5, 2), S0(6) - .3],
  ['c6', 'إلى المدارسِ والعلوم', 360, 330, 'big', WS(6, 11), S0(7) - .3],
  ['c7', 'منظمةُ الصحةِ العالمية', 360, 330, 'big', WS(7, 1), S0(8) - .3],
  ['c8', 'يتجاوزونَ المئة', 360, 330, 'big', WS(8, 6), S0(9) - .3],
  ['c9', 'عددُ البشرِ يقفز', 360, 330, 'red big', WS(9, 0), S0(10) - .3],
  ['c10', 'والأغرب؟', 360, 330, 'big', WS(10, 0), WS(10, 6) - .1],
  ['c10b', 'السيّارات', 360, 330, 'red big', WS(10, 6), S0(11) - .3],
  ['c11', 'أخطرُ قاتلٍ للبشر', 360, 330, 'red big', WS(11, 0), S0(12) - .3],
  ['c12', 'الجراثيمُ لا تختفي', 360, 330, 'big', WS(12, 0), S0(13) - .3],
  ['c13', '@MadhaLawLab', 360, 1200, 'dark', WS(13, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">عالمٌ بلا مرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
