// rflx_a.js (#72): what if your reaction time were 10 times faster? Uses nt_a.js (stadium, runner), iq_a.js (brainSide), room/bigEye/car from the chain.
const RXL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arR = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace('.', '٫');
// a cup (side view) at (x, y) = bottom centre, tilted by rot degrees
function cupR(x, y, s, rot) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s})"><path d="M-26,-62 L26,-62 L21,0 L-21,0Z" fill="#f4f2ec"/><path d="M-26,-62 L26,-62 L21,0 L-21,0Z" fill="url(#canSh)" opacity=".35"/><path d="M26,-50 q22,4 18,24 q-4,14 -20,12" stroke="#e8e4da" stroke-width="7" fill="none"/><rect x="-26" y="-64" width="52" height="6" rx="3" fill="#d8d4ca"/><path d="M-18,-40 h36" stroke="#c8382e" stroke-width="6"/></g>`; }
function tableR(x0, x1, y) { return `<ellipse cx="${(x0 + x1) / 2}" cy="1292" rx="${(x1 - x0) / 2 + 20}" ry="14" fill="#000" opacity=".3"/><rect x="${x0 + 20}" y="${y + 26}" width="16" height="${1290 - y}" fill="#3a3a42"/><rect x="${x1 - 36}" y="${y + 26}" width="16" height="${1290 - y}" fill="#3a3a42"/><rect x="${x0}" y="${y}" width="${x1 - x0}" height="26" rx="4" fill="#e4e0d6"/><rect x="${x0}" y="${y + 18}" width="${x1 - x0}" height="8" fill="#a8a49a"/><rect x="${x0}" y="${y}" width="${x1 - x0}" height="4" fill="#fff" opacity=".6"/>`; }
// speed lines behind something moving fast
function zipR(x, y, n, len, a, dir = -1) { if (a <= 0) return ''; let s = ''; for (let i = 0; i < n; i++) s += `<path d="M${x},${y + (i - n / 2) * 16} h${dir * len * (.5 + .5 * Math.sin(i * 2.1) ** 2)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(a * .6).toFixed(2)}"/>`; return s; }
// the cup falls off the table and you catch it: c = catch moment (s); returns {cup, hand target}
function cupFall(t, t0, tc, x0, y0) { const T = Math.max(0, t - t0), Tc = tc - t0, tt = Math.min(T, Tc), y = y0 + 420 * tt * tt, x = x0 + 70 * tt, rot = 60 * tt; return { x, y, rot, caught: T >= Tc }; }
// ---------- 0: hook: 10x faster reaction; a cup falls and you snatch it ----------
function sceneHook(t) {
  const c = cupFall(t, .6, 1.0, 380, 1040), go = ease(clamp((t - .7) / .3)), hx = c.caught ? c.x + 8 : lerp(640, c.x + 8, go);
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: 0, id: 'r0' }) + tableR(90, 400, 1040);
  s += hero(590, 1240, Object.assign({ s: 1.0, face: -1, shade: 1, lean: c.caught ? 6 : 0, hF: t > .7 ? [hx, lerp(1110, c.y - 30, go)] : undefined, hB: [610, 1240 - 200] }, gp(1), { top: '#e85a2a' }));
  s += cupR(c.x, c.y, 1, c.caught ? 8 : c.rot) + zipR(c.x + 40, c.y - 40, 5, 90, t > .7 && t < 1.2 ? 1 : 0);
  const k = ease(ramp(t, 1.2, 1.6)); s += `<g opacity="${k.toFixed(2)}" transform="translate(210,640) scale(${(1.3 - .3 * k).toFixed(3)})"><text x="0" y="0" text-anchor="middle" font-family="Inter" font-weight="800" font-size="120" fill="#f4c76b" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,.6))">×10</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// eye → brain → hand: the signal path, with a pulse at u (0..1)
function hand2(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,40 L-44,-20 Q-46,-34 -36,-34 Q-28,-34 -28,-22 L-26,-60 Q-26,-74 -15,-74 Q-5,-74 -5,-60 L-4,-70 Q-4,-84 7,-84 Q18,-84 18,-70 L18,-62 Q19,-74 30,-73 Q40,-72 40,-60 L40,-40 Q41,-50 50,-49 Q60,-48 59,-36 L54,20 Q50,48 30,56 L-20,56 Q-38,52 -40,40Z" fill="#c89070" stroke="#8a5a40" stroke-width="3"/><path d="M-26,-22 v20 M-5,-58 v26 M18,-62 v30 M40,-40 v20" stroke="#8a5a40" stroke-width="2" opacity=".6"/></g>`; }
const PATHR = 'M190,610 C250,560 280,520 330,520 C420,520 460,600 470,700 C480,800 520,880 540,960';
function pathDiagram(t, u, col, show = 1) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="#121a28"/>` + scr(`<ellipse cx="360" cy="760" rx="360" ry="460" fill="#6aa8ff" opacity=".08" filter="url(#blur16)"/>`);
  s += `<g transform="translate(150,610) scale(.55)">${bigEye(0, 0, 150, 1, 0)}</g>` + brainSide(380, 540, .62, 4, { noShadow: 1, glow: .3 }) + hand2(560, 990, 1.3);
  s += `<path d="${PATHR}" stroke="#2a3a5a" stroke-width="14" fill="none" stroke-linecap="round"/><path d="${PATHR}" stroke="${col}" stroke-width="5" fill="none" stroke-dasharray="10 12" opacity=".6"/>`;
  if (u >= 0 && u <= 1) s += `<circle r="18" fill="${col}"><animateMotion dur="1s" path="${PATHR}" keyPoints="${u.toFixed(3)};${u.toFixed(3)}" keyTimes="0;1" calcMode="linear" fill="freeze"/></circle>`;
  s += RXL(150, 700, 'العين', show, '#bcd4ff', 24) + RXL(380, 450, 'الدماغ', show, '#f4b0c0', 24) + RXL(560, 1080, 'اليد', show, '#f4d0b0', 24);
  return s;
}
// pulse position along the path, done by geometry (no SMIL in screenshots): sample the cubic segments
function pathPt(u) { const S = [[[190, 610], [250, 560], [280, 520], [330, 520]], [[330, 520], [420, 520], [460, 600], [470, 700]], [[470, 700], [480, 800], [520, 880], [540, 960]]]; const v = clamp(u) * 3, i = Math.min(2, Math.floor(v)), q = v - i, [a, b, c, d] = S[i], f = (p0, p1, p2, p3) => (1 - q) ** 3 * p0 + 3 * (1 - q) ** 2 * q * p1 + 3 * (1 - q) * q * q * p2 + q ** 3 * p3; return [f(a[0], b[0], c[0], d[0]), f(a[1], b[1], c[1], d[1])]; }
function pulseAt(u, col, r = 18) { if (u < 0 || u > 1) return ''; const [x, y] = pathPt(u); return scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r * 2.4}" fill="${col}" opacity=".35" filter="url(#blur9)"/>`) + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${col}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r * .45}" fill="#fff"/>`; }
// ---------- 1: today your brain needs about a quarter of a second to see and move ----------
function sceneSlowPath(t) {
  const T = t - (S0(1) - .2), u = clamp((t - WS(1, 3)) / 2.6), sec = .25 * u;
  let s = `<defs>${LDEFS()}</defs>` + pathDiagram(t, -1, '#8ac0e8').replace(/<circle r="18"[\s\S]*?<\/circle>/, '') + pulseAt(u, '#8ac0e8');
  s += `${panel(60, 1120, 300, 120)}${RXL(210, 1166, 'اليوم', 1, '#fff', 24)}<text x="210" y="1218" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#8ac0e8">${arR(sec.toFixed(2))} ث</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: ten times faster: less than 30 thousandths of a second ----------
function sceneFastPath(t) {
  const T = t - (S0(2) - .2), u = pmod(T / .45, 1), b2 = ease(ramp(t, WS(2, 3), WS(2, 7)));
  let s = `<defs>${LDEFS()}</defs>` + pathDiagram(t, -1, '#f4c76b') + pulseAt(u, '#f4c76b') + pulseAt(u - .12, '#f4c76b', 10);
  const bar = (y, w, col, lab, val, a) => `<g opacity="${a.toFixed(2)}">${panel(40, y - 50, 640, 110)}${RXL(130, y + 12, lab, 1, '#fff', 24)}<rect x="230" y="${y - 12}" width="${(400 * w).toFixed(1)}" height="30" rx="10" fill="${col}"/><text x="${230 + 400 * w + 14}" y="${y + 12}" text-anchor="start" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="${col}">${val}</text></g>`;
  s += bar(1110, .9, '#8ac0e8', 'اليوم', '٠٫٢٥ ث', 1) + bar(1220, .09 * b2 + .001, '#f4c76b', 'أنت', '٠٫٠٢٥ ث', ease(ramp(t, WS(2, 1), WS(2, 2))));
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: a cup falls off the table? you catch it before it leaves your hand ----------
function sceneCup(t) {
  const tc = WS(3, 4) + .1, t0 = tc - .4, c = cupFall(t, t0, tc, 380, 1000), go = ease(clamp((t - (tc - .35)) / .3)), hx = lerp(560, c.x + 6, go);
  const wob = t < t0 ? Math.sin(t * 9) * 4 * clamp((t - WS(3, 0)) / 1.2) : 0;
  let s = `<defs>${LDEFS()}</defs><g transform="translate(420,900) scale(1.15) translate(-420,-900)">` + room(t, { N: 0, id: 'r3' }) + tableR(90, 400, 1000);
  s += hero(570, 1240, Object.assign({ s: 1.05, face: -1, shade: 1, lean: 4 * go, hF: go > 0 ? [hx, lerp(1090, c.y - 28, go)] : undefined, hB: [590, 1240 - 210] }, gp(1), { top: '#e85a2a' }));
  // ghost trail of the falling cup (slow-motion frames)
  for (let k = 1; k <= 3; k++) { const g = cupFall(t - k * .08, t0, tc, 380, 1000); if (!c.caught && t - k * .08 > t0) s += `<g opacity="${(.3 / k).toFixed(2)}">${cupR(g.x, g.y, 1, g.rot)}</g>`; }
  s += cupR(c.x, c.y, 1, c.caught ? 6 : t < t0 ? wob : c.rot) + `</g>`;
  s += `<g opacity="${ease(ramp(t, tc, tc + .3)).toFixed(2)}">${panel(380, 1120, 300, 100)}${RXL(530, 1182, 'سقطَ سنتيمتراتٍ فقط', 1, '#f4c76b', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: at 100 km/h a driver covers 20+ m before braking; you, about 2 m ----------
function sceneCar(t) {
  const T = t - (S0(4) - .2), b1 = ease(ramp(t, WS(4, 7), WS(4, 13) + .3)), b2 = ease(ramp(t, WS(4, 18), WS(4, 21) + .3));
  const cx = lerp(-200, 260, ease(clamp(T / 3.4)));
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'r4', fg: `<g transform="translate(${cx.toFixed(1)},0)">${car(0, 1230, 1.0, '#e85a2a', 1)}</g>` + zipR(cx - 130, 1190, 4, 120, T < 3.4 ? 1 : 0) + `<g transform="translate(600,1230)"><path d="M-18,0 L0,-50 L18,0Z" fill="#f47a2a"/><rect x="-22" y="-4" width="44" height="8" fill="#2a2a2a"/><path d="M-10,-20 h20" stroke="#fff" stroke-width="6"/></g>` });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0e1c" opacity="${(.35 * Math.max(b1, b2)).toFixed(2)}"/>`;
  const row = (y, len, col, lab, val, a) => { if (a <= 0) return ''; const L = 560 * len; return `<g opacity="${a.toFixed(2)}">${panel(30, y - 70, 660, 140)}${RXL(600, y - 26, lab, 1, '#fff', 24)}<path d="M80,${y + 20} H${80 + L}" stroke="${col}" stroke-width="16" stroke-linecap="round"/><path d="M80,${y + 4} v32 M${80 + L},${y + 4} v32" stroke="#fff" stroke-width="4"/><text x="${(80 + L / 2).toFixed(1)}" y="${y - 2}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="${col}">${val}</text></g>`; };
  s += row(560, b1, '#ff7a6a', 'السائقُ العاديّ', '٢١ م', b1) + row(760, .1 * b2 + .001, '#f4c76b', 'أنت', '٢ م', b2);
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: in the 100 m you leave before any champion moves ----------
function sceneSprint(t) {
  const T = t - (S0(5) - .2), you = Math.max(0, t - WS(5, 4)), oth = Math.max(0, t - WS(5, 8));
  let s = `<defs>${LDEFS()}</defs>` + stadium(t, 0) + `<path d="M90,880 V1180" stroke="#fff" stroke-width="6"/>`;
  [[985, .54, 2], [1075, .6, 4]].forEach(([y, sc, pi]) => { const x = 70 + oth * 150; s += oth > 0 ? runner(x, y, sc, 1, oth * 7, pi) : hero(70, y, Object.assign({ s: sc, face: 1, shade: 1, lean: 22, hF: [70 + 40 * sc, y - 120 * sc], hB: [70 + 20 * sc, y - 110 * sc] }, gp(pi))); });
  const xy = 70 + you * 150; s += you > 0 ? runner(xy, 1160, .78, 1, you * 7, 1, { top: '#e85a2a' }) : hero(70, 1160, Object.assign({ s: .78, face: 1, shade: 1, lean: 22, hF: [70 + 40 * .78, 1160 - 94], hB: [70 + 16, 1160 - 86] }, gp(1), { top: '#e85a2a' }));
  if (you > 0 && you < 1.2) s += zipR(xy - 60, 1080, 4, 100, 1);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: but the judge disqualifies you: any start within 0.1 s of the gun is a false start ----------
function sceneFalse(t) {
  const T = t - (S0(6) - .2), k = ease(ramp(t, WS(6, 3), WS(6, 9) + .3)), fl = Math.sin(t * 9) * 6;
  let s = `<defs>${LDEFS()}</defs>` + stadium(t, 0);
  s += hero(560, 1150, Object.assign({ s: .8, face: -1, shade: 1, hF: [520, 1150 - 330], hB: [590, 1150 - 160] }, { top: '#2a2a34', pants: '#2a2a34', skin: '#a8785a', hair: '#1a1410' })) + `<path d="M520,${1150 - 330} V${1150 - 420}" stroke="#3a3a3a" stroke-width="5"/><path d="M520,${1150 - 420} q-40,${-6 + fl} -80,0 l0,46 q40,${-6 - fl} 80,0Z" fill="#d83a30"/>`;
  s += hero(240, 1150, Object.assign({ s: .78, face: 1, shade: 1, lean: -4, aF: [.1, .4], aB: [-.1, .35] }, gp(1), { top: '#e85a2a' }));
  s += `<g opacity="${k.toFixed(2)}">${panel(60, 410, 600, 210)}${RXL(360, 462, 'بعدَ الطلقة', 1, '#fff', 26)}<rect x="110" y="490" width="500" height="34" rx="10" fill="#2a3040"/><rect x="110" y="490" width="200" height="34" rx="10" fill="#d83a30" opacity=".75"/><path d="M310,480 v54" stroke="#fff" stroke-width="4"/>${RXL(310, 572, '٠٫١٠ ث', 1, '#ff8a7a', 26)}<circle cx="${(110 + 200 * .25).toFixed(1)}" cy="507" r="16" fill="#f4c76b"/>${RXL(160, 606, 'أنت', 1, '#f4c76b', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: can your body do it? nerve signals travel only about 100 m/s ----------
function sceneNerve(t) {
  const T = t - (S0(7) - .2), k = ease(ramp(t, WS(7, 5), WS(7, 7) + .3)), x = 300, y = 1250, sc = 1.8;
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141c2a"/>` + scr(`<ellipse cx="320" cy="760" rx="300" ry="480" fill="#7ac8ff" opacity=".1" filter="url(#blur16)"/>`);
  const hand = [x + 250, y - 470];
  s += `<g opacity=".55">${hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, noShadow: 1, hF: hand, hB: [x + 40, y - 300] }, gp(1), { top: '#e85a2a' }))}</g>`;
  const P = [[x + 16, y - 560], [x + 10, y - 500], [x + 14, y - 455], [x + 90, y - 455], [x + 170, y - 465], hand];
  const d = 'M' + P.map(p => p.join(',')).join(' L');
  s += `<path d="${d}" stroke="#ffe08a" stroke-width="6" fill="none" opacity="${(.8 * k).toFixed(2)}" stroke-linejoin="round"/>`;
  if (k > 0) { const u = pmod(T * .55, 1), seg = u * (P.length - 1), i = Math.min(P.length - 2, Math.floor(seg)), q = seg - i, px = lerp(P[i][0], P[i + 1][0], q), py = lerp(P[i][1], P[i + 1][1], q); s += scr(`<circle cx="${px}" cy="${py}" r="34" fill="#ffd060" opacity=".5" filter="url(#blur9)"/>`) + `<circle cx="${px}" cy="${py}" r="12" fill="#fff4c0"/>`; }
  s += `<g opacity="${k.toFixed(2)}">${panel(430, 900, 260, 130)}${RXL(560, 946, 'سرعةُ الإشارة', 1, '#fff', 22)}<text x="560" y="1004" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#ffd060">١٠٠ م/ث</text></g>`;
  s += RXL(470, y - 600, 'الأعصاب', k, '#ffe08a', 24);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: you'd need faster nerves, stronger muscles and much more energy ----------
function iconBolt(x, y) { return `<path d="M${x + 8},${y - 60} L${x - 26},${y + 6} L${x - 2},${y + 6} L${x - 12},${y + 60} L${x + 28},${y - 10} L${x + 4},${y - 10}Z" fill="#ffd060"/>`; }
function iconMuscle(x, y) { return `<g transform="translate(${x},${y})"><rect x="-56" y="-12" width="112" height="24" rx="8" fill="#9aa4b0"/><rect x="-74" y="-40" width="22" height="80" rx="8" fill="#5a6470"/><rect x="52" y="-40" width="22" height="80" rx="8" fill="#5a6470"/><rect x="-90" y="-28" width="18" height="56" rx="7" fill="#3a424c"/><rect x="72" y="-28" width="18" height="56" rx="7" fill="#3a424c"/></g>`; }
function iconBattery(x, y, k) { return `<g transform="translate(${x},${y})"><rect x="-56" y="-34" width="104" height="68" rx="10" fill="none" stroke="#e8eef4" stroke-width="6"/><rect x="48" y="-14" width="12" height="28" rx="4" fill="#e8eef4"/><rect x="-48" y="-26" width="${(88 * k).toFixed(1)}" height="52" rx="6" fill="#4ac87a"/></g>`; }
function sceneNeeds(t) {
  const a = [WS(8, 6), WS(8, 8), WS(8, 10)].map(w => ease(ramp(t, w - .1, w + .3)));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141c2a"/>` + scr(`<ellipse cx="360" cy="800" rx="360" ry="420" fill="#f4c76b" opacity=".06" filter="url(#blur16)"/>`);
  s += hero(170, 1262, Object.assign({ s: 1.7, face: 1, shade: 1, aF: [.25, .9], aB: [-.25, .9] }, gp(1), { top: '#e85a2a' }));
  const kx = ease(ramp(t, S0(8) - .2, S0(8) + .5)) * (1 - a[0]);
  s += `<g opacity="${kx.toFixed(2)}"><text x="500" y="700" text-anchor="middle" font-family="Inter" font-weight="900" font-size="190" fill="#f4c76b">×10</text>${RXL(500, 790, 'أسرع', 1, '#fff', 44)}</g>`;
  [[iconBolt(0, 0), 'أعصابٌ أسرع', '#ffd060'], [iconMuscle(0, 0), 'عضلاتٌ أقوى', '#c8d0dc'], [iconBattery(0, 0, .3 + .7 * a[2]), 'طاقةٌ أكبر', '#4ac87a']].forEach(([ic, lab, col], i) => {
    const y = 500 + i * 150; s += `<g opacity="${a[i].toFixed(2)}" transform="translate(0,${((1 - a[i]) * 30).toFixed(1)})">${panel(300, y - 60, 390, 120)}<g transform="translate(395,${y}) scale(.85)">${ic}</g>${RXL(565, y + 12, lab, 1, col, 32)}</g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: if your brain also took in images faster, the world would look slow-motion ----------
function sceneSlow(t) {
  const T = t - (S0(9) - .2), sl = ease(ramp(t, WS(9, 8), WS(9, 10))), tt = (S0(9) - .2) + T * lerp(1, .1, sl);
  let top = hero(160 + tt * 34 - (S0(9) - .2) * 34, 1086, Object.assign({ s: .7, face: 1, shade: 1, walk: tt * 4.4, amp: .4 }, gp(2))) + hero(600 - (tt - (S0(9) - .2)) * 30, 1096, Object.assign({ s: .72, face: -1, shade: 1, walk: tt * 4 + 1, amp: .4 }, gp(4)));
  top += [[200, 560, 0], [320, 520, 2], [460, 600, 4]].map(([x, y, p]) => bird(x + tt * 50 - (S0(9) - .2) * 50, y, .9, tt * 14 + p, 0)).join('');
  let s = `<defs>${LDEFS()}</defs>` + streetO(tt, { id: 'r9', top }) + rain(tt, .9, 120, 3, 1000, 1280);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#5a8ad8" opacity="${(.16 * sl).toFixed(2)}"/>`;
  s += `<g opacity="${sl.toFixed(2)}">${panel(470, 410, 210, 90)}<text x="575" y="468" text-anchor="middle" font-family="Inter" font-weight="800" font-size="36" fill="#bcd4ff">×0.1 ▶</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: like a fly: its eyes take in about 4x more images per second, so it is hard to swat ----------
function flyR(x, y, s, t) { const w = Math.sin(t * 60) * 18; return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><ellipse cx="-6" cy="30" rx="70" ry="12" fill="#000" opacity=".25"/>` +
  `<g opacity=".55"><path d="M-10,-26 C-60,${-120 - w} -150,${-110 - w} -150,${-60 - w} C-150,-20 -60,-20 -10,-16Z" fill="#dfe8f0" stroke="#8a9aa8" stroke-width="2"/><path d="M10,-26 C60,${-120 + w} 150,${-110 + w} 150,${-60 + w} C150,-20 60,-20 10,-16Z" fill="#dfe8f0" stroke="#8a9aa8" stroke-width="2"/><path d="M-30,-30 Q-90,-80 -130,-70 M30,-30 Q90,-80 130,-70" stroke="#8a9aa8" stroke-width="2" fill="none"/></g>` +
  `<ellipse cx="0" cy="0" rx="40" ry="34" fill="#2a2a2e"/><ellipse cx="0" cy="54" rx="34" ry="44" fill="#3a3a30"/>` + [36, 50, 64, 78].map(yy => `<path d="M-30,${yy} Q0,${yy + 8} 30,${yy}" stroke="#5a5a4a" stroke-width="3" fill="none"/>`).join('') +
  [-1, 1].map(sd => `<path d="M${sd * 30},10 l${sd * 50},40 l${sd * 10},50 M${sd * 34},20 l${sd * 60},10 l${sd * 20},40 M${sd * 30},-6 l${sd * 50},-10 l${sd * 30},30" stroke="#1a1a1a" stroke-width="5" fill="none" stroke-linejoin="round"/>`).join('') +
  `<ellipse cx="0" cy="-44" rx="40" ry="26" fill="#2a2a2e"/>` + [-1, 1].map(sd => `<ellipse cx="${sd * 30}" cy="-50" rx="28" ry="30" fill="#8a1a14"/><ellipse cx="${sd * 30}" cy="-50" rx="28" ry="30" fill="url(#irisG)" opacity=".25"/>` + Array.from({ length: 12 }, (_, i) => `<circle cx="${(sd * 30 + Math.cos(i) * 14 * ((i % 3) / 2)).toFixed(1)}" cy="${(-50 + Math.sin(i * 1.7) * 16 * ((i % 3) / 2)).toFixed(1)}" r="3" fill="#c84030" opacity=".7"/>`).join('') + `<ellipse cx="${sd * 30 - 8}" cy="-62" rx="7" ry="5" fill="#fff" opacity=".5"/>`).join('') + `</g>`; }
function sceneFly(t) {
  const T = t - (S0(10) - .2), sw = ease(ramp(t, WS(10, 12), WS(10, 14) + .2)), dodge = ease(ramp(t, WS(10, 13) + .1, WS(10, 14) + .3)), b = ease(ramp(t, WS(10, 4), WS(10, 8) + .3));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#d8ccb8"/><rect x="-20" y="960" width="760" height="340" fill="#8a6a4a"/><rect x="-20" y="960" width="760" height="10" fill="#a8845a"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  s += flyR(lerp(360, 560, dodge), lerp(880, 640, dodge), 1.25, t);
  const sy = lerp(300, 820, sw) - dodge * 30; s += `<g transform="translate(${(360 - 40 * dodge).toFixed(1)},${sy.toFixed(1)}) rotate(${(-10 + 10 * sw).toFixed(1)})"><rect x="-8" y="-360" width="16" height="300" rx="6" fill="#3a6ab8"/><rect x="-80" y="-70" width="160" height="110" rx="16" fill="#4a8ad8" opacity=".9"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-70 + i * 28},-64 v98" stroke="#2a5a98" stroke-width="3"/>`).join('') + `</g>`;
  const bar = (y, w, col, lab, val) => `${panel(40, y - 44, 640, 96)}${RXL(120, y + 12, lab, 1, '#fff', 24)}<rect x="210" y="${y - 10}" width="${(380 * w).toFixed(1)}" height="28" rx="10" fill="${col}"/><text x="${(210 + 380 * w + 12).toFixed(1)}" y="${y + 12}" text-anchor="start" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="${col}">${val}</text>`;
  s += `<g opacity="${b.toFixed(2)}">${bar(1090, .24, '#8ac0e8', 'عينُك', '≈ ٦٠ صورة/ث')}${bar(1200, .24 + .7 * b, '#f4c76b', 'الذبابة', '≈ ٢٥٠ صورة/ث')}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 13) - .3, WS(11, 13) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSlowPath }, { s: S0(2) - .2, f: sceneFastPath }, { s: S0(3) - .2, f: sceneCup }, { s: S0(4) - .2, f: sceneCar }, { s: S0(5) - .2, f: sceneSprint },
  { s: S0(6) - .2, f: sceneFalse }, { s: S0(7) - .2, f: sceneNerve }, { s: S0(8) - .2, f: sceneNeeds }, { s: S0(9) - .2, f: sceneSlow }, { s: S0(10) - .2, f: sceneFly }, { s: S0(11) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSlowPath, sceneFastPath, sceneNerve, sceneNeeds, sceneFly]);
const XF = .5;
const TLI = [['الدماغ', S0(1)], ['الكوب', S0(3)], ['السيّارة', S0(4)], ['السباق', S0(5)], ['الأعصاب', S0(7)], ['الحركةُ البطيئة', S0(9)]];
const LIST_ON = new Set([sceneSprint]);
const CHIPS = [
  ['c0', 'أسرعُ بعشرِ مرّات', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c1', 'ربعُ ثانية', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'أقلُّ من ٠٫٠٣ ثانية', 360, 330, 'big', WS(2, 4), S0(3) - .3],
  ['c3', 'تلتقطُه فوراً', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'الفرامل', 360, 330, 'big', WS(4, 16), S0(5) - .3],
  ['c5', 'سباقُ ١٠٠ متر', 360, 330, 'big', WS(5, 1), S0(6) - .3],
  ['c6', 'بدايةٌ خاطئة!', 360, 330, 'red big', WS(6, 12), S0(7) - .3],
  ['c7', 'هل يستطيعُ جسمُك؟', 360, 330, 'big', WS(7, 0), S0(8) - .3],
  ['c9', 'والأغرب؟', 360, 330, 'big', WS(9, 0), S0(10) - .3],
  ['c10', 'عينُ الذبابة', 360, 330, 'big', WS(10, 3), S0(11) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 13) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">ردُّ الفعل</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
