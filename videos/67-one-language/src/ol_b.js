// ol_b.js (#67): scenes 6-11 (what is lost, medicinal plants, Latin splits, many languages again, the end) + scene list and UI
function donutSeg(cx, cy, R, w, a0, a1, col) { const p = (a, r) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r], [x0, y0] = p(a0, R), [x1, y1] = p(a1, R), [x2, y2] = p(a1, R - w), [x3, y3] = p(a0, R - w), lg = a1 - a0 > Math.PI ? 1 : 0;
  return `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${lg} 1 ${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} A${Math.max(.01, R - w)},${Math.max(.01, R - w)} 0 ${lg} 0 ${x3.toFixed(1)},${y3.toFixed(1)}Z" fill="${col}"/>`; }
// ---------- 6: a big loss: each language carries its own way of seeing the world; the dots go out one by one ----------
function sceneLoss(t) {
  const T = t - (S0(6) - .2), k = ease(ramp(t, WS(6, 2), S0(7) - .3));
  const G = glE(t, { d: 9.2, el: .25, lon: 80 + T * 6, clouds: .3, lights: .25, tg: [0, -.3, 0] });
  const n = Math.round(lerp(7000, 1, Math.pow(k, .5)));
  F.ov = `<defs>${LDEFS()}</defs>` + scr(langDots(G, 600, .95, 5, 1 - k * .985)) +
    `${panel(170, 1040, 380, 150)}<text x="360" y="1120" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="${k > .9 ? '#ff8a7a' : '#f4c76b'}">${fmtN(n)}</text>${OLL(360, 1168, 'لغة', 1, '#fff', 28)}`;
  return space(t);
}
// ---------- 7: in one study, three quarters of medicinal plant uses are known in only one language ----------
function herb(x, y, s, seed, t) { let g = `<path d="M${x},${y} Q${x - 6 * s},${y - 80 * s} ${x + 4 * s},${y - 150 * s}" stroke="#3a6a2a" stroke-width="${(6 * s).toFixed(1)}" fill="none"/>`; const r = RS(seed);
  for (let i = 0; i < 5; i++) { const u = .25 + i * .16, a = (i % 2 ? -30 : -150) + (r() - .5) * 20 + Math.sin(t + i) * 3; g += leafL(x + (i % 2 ? 2 : -2) * s, y - 150 * s * u, (60 - i * 6) * s, a, seed + i, {}); } return g; }
function sceneHerbs(t) {
  const T = t - (S0(7) - .2), k = ease(ramp(t, WS(7, 3), WS(7, 7) + .3)), one = ease(ramp(t, WS(7, 9), WS(7, 11) + .3));
  let s = `<defs>${LDEFS()}<linearGradient id="hbS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ab0a0"/><stop offset=".6" stop-color="#c8dcc4"/><stop offset="1" stop-color="#e4eedc"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hbS)"/>`;
  s += forestR(860, 40, 90, 170, 13, '#3e6a42') + `<rect x="-20" y="820" width="760" height="80" fill="#e8f0e4" opacity=".35" filter="url(#blur9)"/>` + forestR(930, 34, 110, 190, 17, '#2e5432') + `<rect x="-20" y="930" width="760" height="370" fill="#5a7a3a"/><rect x="-20" y="930" width="760" height="370" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // an old healer shows a plant; the plant's name in a script nobody else reads
  s += hero(230, 1200, Object.assign({ s: .95, face: 1, shade: 1, hF: [330, 1200 - 230] }, gp(5), { hair: '#e8e8e4' }));
  s += herb(340, 1210, 1.2, 3, t) + herb(520, 1240, 1.1, 9, t) + herb(640, 1220, 1.0, 15, t);
  s += `<g transform="translate(470,1010) rotate(-4)"><rect x="-70" y="-26" width="140" height="52" rx="6" fill="#f4ecd4"/><text x="0" y="10" text-anchor="middle" font-family="DejaVu Sans" font-weight="700" font-size="24" fill="#3a2a1a">ᓇᐱᐊᕐᓂᖅ</text></g>`;
  // the share: three of four leaves gold
  if (k > 0) { s += `<g opacity="${k.toFixed(2)}">${panel(110, 400, 500, 230)}`; for (let i = 0; i < 4; i++) { const x = 190 + i * 115, gold = i < 3 && one > i / 3; s += `<g transform="translate(${x},520)">${leafL(0, 40, 80, -90, 30 + i, {})}</g>` + (gold ? scr(`<circle cx="${x}" cy="500" r="44" fill="url(#lampG)" opacity=".6"/>`) : ''); }
    s += OLL(360, 600, '٣ من كلِّ ٤ لا تعرفُها إلّا لغةٌ واحدة', 1, '#f4c76b', 24) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 8-9: the strangest part: one language does not stay one. Latin split into Spanish, French, Italian, Portuguese and Romanian ----------
const LATB = [['الإسبانيّة', -1.0, 'Hola'], ['البرتغاليّة', -.55, 'Olá'], ['الفرنسيّة', -.1, 'Bonjour'], ['الإيطاليّة', .35, 'Ciao'], ['الرومانيّة', .8, 'Salut']];
function sceneLatin(t) {
  const T = t - (S0(8) - .2), g0 = ease(ramp(t, S0(9), WS(9, 6))), cent = ease(ramp(t, WS(9, 6), WS(9, 7) + .4));
  let s = `<defs>${LDEFS()}<radialGradient id="parch" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#f4e6c4"/><stop offset=".7" stop-color="#e0c890"/><stop offset="1" stop-color="#a8844a"/></radialGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#parch)"/><rect x="-20" y="-20" width="760" height="1320" fill="#5a3a1a" filter="url(#grainR)" opacity=".18"/>`;
  // the trunk: a Roman stone inscription
  const rx = 360, ry = 1110;
  s += `<rect x="${rx - 200}" y="${ry - 10}" width="400" height="120" fill="#d8d0c0"/><rect x="${rx - 200}" y="${ry - 10}" width="400" height="120" fill="#000" filter="url(#rockF)" opacity=".25"/><rect x="${rx - 200}" y="${ry - 10}" width="400" height="120" fill="none" stroke="#8a7a62" stroke-width="6"/>` +
    `<text x="${rx}" y="${ry + 48}" text-anchor="middle" font-family="DejaVu Serif" font-weight="700" font-size="40" letter-spacing="6" fill="#5a4a36">LINGVA LATINA</text>` + OLL(rx, ry + 92, 'اللاتينيّة', 1, '#3a2a14', 28);
  // the tree: a trunk that splits into five branches, each growing to a language
  const trunkTop = ry - 260;
  s += `<path d="M${rx - 34},${ry - 10} Q${rx - 20},${ry - 140} ${rx - 12},${trunkTop} L${rx + 12},${trunkTop} Q${rx + 20},${ry - 140} ${rx + 34},${ry - 10}Z" fill="#6a4a2a"/><path d="M${rx - 8},${ry - 20} Q${rx - 4},${ry - 150} ${rx},${trunkTop}" stroke="#8a6a44" stroke-width="5" fill="none"/>`;
  LATB.forEach(([nm, dx, hi], i) => { const u = clamp(g0 * 1.6 - i * .15); if (u <= 0) return; const ex = rx + dx * 300, ey = 560 + Math.abs(dx) * 120, mx = rx + dx * 80, my = trunkTop - 120;
    let d = ''; for (let j = 0; j <= 20; j++) { const v = j / 20 * u, x = (1 - v) * (1 - v) * rx + 2 * (1 - v) * v * mx + v * v * ex, y = (1 - v) * (1 - v) * trunkTop + 2 * (1 - v) * v * my + v * v * ey; d += (j ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
    s += `<path d="${d}" stroke="#6a4a2a" stroke-width="${(16 - 6 * u).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    if (u > .95) { const a = clamp((u - .95) * 20); s += `<g opacity="${a.toFixed(2)}"><circle cx="${ex}" cy="${ey}" r="56" fill="#5a8a3a"/><circle cx="${ex - 20}" cy="${ey - 18}" r="34" fill="#7aa84a"/><circle cx="${ex + 22}" cy="${ey - 6}" r="30" fill="#6a9a40"/>${OLL(ex, ey - 70, nm, 1, '#3a2a14', 26)}<text x="${ex}" y="${ey + 10}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="22" fill="#fff">${hi}</text></g>`; } });
  s += `<g opacity="${cent.toFixed(2)}">${panel(230, 400, 260, 70)}${OLL(360, 448, 'عبرَ القرون', 1, '#f4c76b', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: after a thousand years, many languages again that cannot understand each other ----------
function sceneAgain(t) {
  const T = t - (S0(10) - .2), k = 1 - ease(ramp(t, WS(10, 4), WS(10, 9) + .4)), yr = Math.round(lerp(0, 1000, ease(ramp(t, S0(10), WS(10, 2) + .4))));
  const top = streetTalk(t, k, { order: [13, 6, 9, 17, 12, 3] });
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'ag', N: .35, top });
  s += `${panel(220, 420, 280, 120)}<text x="360" y="500" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#f4c76b">+${fmtN(yr)}</text>${OLL(360, 572, 'عام', 1, '#fff', 26)}`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 8) - .3, WS(11, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWorld }, { s: S0(2) - .2, f: sceneMenu }, { s: S0(3) - .2, f: sceneWeb }, { s: S0(4) - .2, f: sceneTrans },
  { s: S0(5) - .2, f: sceneSci }, { s: S0(6) - .2, f: sceneLoss }, { s: S0(7) - .2, f: sceneHerbs }, { s: S0(8) - .2, f: sceneLatin }, { s: S0(10) - .2, f: sceneAgain }, { s: S0(11) - .2, f: sceneEarth }];
const NOKB = new Set([sceneWorld, sceneLoss, sceneWeb]);
const XF = .5;
const TLI = [['السفر', S0(2)], ['الإنترنت', S0(3)], ['الترجمة', S0(4)], ['العلوم', S0(5)], ['الخسارة', S0(6)], ['الأغرب', S0(8)]];
const LIST_ON = new Set([sceneTrans, sceneSci]);
const CHIPS = [
  ['c0', 'لغةٌ واحدةٌ للجميع', 360, 330, 'big', WS(0, 7), S0(1) - .3],
  ['c1', 'أكثرُ من ٧٬٠٠٠ لغة', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'كلُّ لافتةٍ مفهومة', 360, 330, 'big', WS(2, 3), S0(3) - .3],
  ['c3', 'الإنترنتُ للجميع', 360, 330, 'big', WS(3, 1), S0(4) - .3],
  ['c4', 'المترجمونَ بلا عمل', 360, 330, 'red big', WS(4, 0), S0(5) - .3],
  ['c5', 'علمٌ بلا حواجز', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c6', 'خسارةٌ كبيرة', 360, 330, 'red big', WS(6, 2), S0(7) - .3],
  ['c7', 'النباتاتُ الطبّيّة', 360, 330, 'big', WS(7, 3), S0(8) - .3],
  ['c8', 'والأغرب؟', 360, 330, 'big', WS(8, 0), S0(9) - .3],
  ['c9', 'اللاتينيّةُ تفرّقت', 360, 330, 'big', WS(9, 0), S0(10) - .3],
  ['c10', 'بعدَ ألفِ عام', 360, 330, 'red big', WS(10, 0), S0(11) - .3],
  ['c11', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لغةٌ واحدة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
