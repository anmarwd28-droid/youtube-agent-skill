// last_a.js (#71): what if you were the last human on Earth? Scenes, chips, list.
const LHL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arL = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const LSH = [[-4, 146, 'مخبز', '#b8743a'], [150, 140, 'مقهى', '#5a3a2a'], [298, 150, 'صيدليّة', '#1e8a5a'], [456, 132, 'بقالة', '#3a6a9a'], [596, 140, 'كتب', '#8a3a4a']];
const LBL = [[-12, 158, 420, '#b8a48a', 981, 1], [146, 150, 470, '#7a8a9a', 982, 2], [296, 160, 380, '#c89a7a', 983, 0], [456, 140, 450, '#8a7a6a', 984, 1], [596, 160, 400, '#9a8a6a', 985, 2]];
const darkL = a => `<rect x="-20" y="-20" width="760" height="1320" fill="#060a1c" opacity="${a.toFixed(2)}"/>`;
// a still, empty street (no people), parked cars at the kerb; o.fg/o.top passed through
function emptyStreet(t, o = {}) {
  const cars = (o.cars || [[120, '#8a2a2a'], [520, '#3a5a8a']]).map(([x, c]) => car(x, 1176, .78, c, 1)).join('');
  return streetO(t, Object.assign({ id: 'ls', blocks: LBL, shops: LSH, fg: cars + (o.fg || '') }, o));
}
// a tuft of grass / weeds on the pavement
function weed(x, y, h, k, seed) { if (k <= 0) return ''; const r = RS(seed); let s = ''; for (let i = 0; i < 9; i++) { const a = (r() - .5) * .9, L = h * k * (.6 + r() * .6); s += `<path d="M${x + (r() - .5) * 20},${y} q${(a * L * .5).toFixed(1)},${(-L * .6).toFixed(1)} ${(a * L).toFixed(1)},${(-L).toFixed(1)}" stroke="${['#4a7a2e', '#6a9a3a', '#3a5a22'][i % 3]}" stroke-width="3" fill="none" stroke-linecap="round"/>`; } return s; }
// ---------- 0: you wake up and you are the last human on Earth ----------
function sceneHook(t) {
  const look = t < 1.3 ? 1 : t < 2.4 ? -1 : 1, P = gp(1);
  const top = hero(440, 1080, Object.assign({ s: .78, face: look, shade: 1, lean: 0, aF: [.15, .5], aB: [-.1, .35] }, P, { top: '#e85a2a' }));
  noEarth(); F.ov = '';
  return `<defs>${LDEFS()}</defs>` + emptyStreet(t, { id: 'l0', N: .15, top }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#ffd8a0" opacity=".08"/>`;
}
// ---------- 1: empty streets, silent phones, nobody answers anywhere ----------
function sceneSilent(t) {
  const T = t - (S0(1) - .2), a = ease(ramp(t, WS(1, 2) - .3, WS(1, 3))), x = 210, y = 420, w = 300, h = 600;
  let s = `<defs>${LDEFS()}</defs>` + emptyStreet(t, { id: 'l1', N: .15 }) + darkL(.45 * a);
  const rows = [['أمّي', WS(1, 4)], ['صديقي', WS(1, 6)], ['الطوارئ ١١٢', WS(1, 9)], ['رقمٌ في اليابان', WS(1, 11) - .2]];
  let ph = `<rect x="${x + 8}" y="${y + 14}" width="${w}" height="${h}" rx="42" fill="#000" opacity=".35"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="42" fill="#1a1c22"/><rect x="${x + 14}" y="${y + 16}" width="${w - 28}" height="${h - 32}" rx="30" fill="#0e1620"/><rect x="${x + w / 2 - 40}" y="${y + 28}" width="80" height="18" rx="9" fill="#000"/>`;
  ph += `<text x="${x + w / 2}" y="${y + 110}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#e8eef4">جارٍ الاتصال…</text>`;
  rows.forEach(([n, at], i) => { const k = ease(ramp(t, at, at + .3)), no = ease(ramp(t, at + .7, at + 1)), yy = y + 170 + i * 96; if (k <= 0) return;
    ph += `<g opacity="${k.toFixed(2)}"><rect x="${x + 30}" y="${yy}" width="${w - 60}" height="76" rx="16" fill="#1e2a38"/><circle cx="${x + w - 70}" cy="${yy + 38}" r="22" fill="#3a8a5a"/><path d="M${x + w - 80},${yy + 30} q10,18 20,16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><text x="${x + w - 104}" y="${yy + 47}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">${n}</text>` +
      `<text x="${x + 52}" y="${yy + 47}" text-anchor="start" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#ff6a5a" opacity="${no.toFixed(2)}">لا ردّ</text></g>`; });
  const rr = pmod(T * .9, 1); ph += `<circle cx="${x + w / 2}" cy="${y + h - 70}" r="${(26 + rr * 30).toFixed(1)}" fill="none" stroke="#4ac87a" stroke-width="3" opacity="${(1 - rr).toFixed(2)}"/><circle cx="${x + w / 2}" cy="${y + h - 70}" r="26" fill="#d83a30"/><path d="M${x + w / 2 - 12},${y + h - 66} h24" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`;
  s += `<g opacity="${a.toFixed(2)}" transform="translate(0,${((1 - a) * 60).toFixed(1)})">${ph}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: within a day or two the power plants stop; cities go dark one after another ----------
function sceneLights(t) {
  const k = ease(ramp(t, WS(2, 6), S0(3) - .5));
  glE(t, { d: 9.4, el: .34, lon: 28 + (t - S0(2)) * 1.2, clouds: .3, lights: lerp(1.15, .0, k), sunI: .1, tg: [0, .2, 0] });
  const hrs = Math.round(lerp(0, 48, ease(ramp(t, WS(2, 0), WS(2, 4)))));
  F.ov = `<g opacity="${ease(ramp(t, WS(2, 0), WS(2, 0) + .4)).toFixed(2)}">${panel(250, 1110, 220, 100)}<text x="360" y="1176" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4c76b">+${arL(hrs)} س</text></g>`;
  return space(t);
}
// ---------- 3: food everywhere: cans enough for your whole life ----------
function sceneCans(t) {
  const T = t - (S0(3) - .2), x = lerp(120, 330, ease(clamp(T / 2.5)));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#b8b0a0"/><rect x="-20" y="944" width="760" height="360" fill="#8a8478"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${i * 100 - 60},944 L${i * 150 - 300},1300" stroke="#6e6a60" stroke-width="2"/>`).join('') + shelfE(0);
  s += hero(x, 1200, Object.assign({ s: .82, face: 1, shade: 1, walk: T < 2.5 ? T * 5 : null, amp: .4, hF: T < 2.5 ? undefined : [x + 64, 1200 - 220], hB: [x + 30, 1200 - 150] }, gp(1), { top: '#e85a2a' })) + basket(x + 34, 1200 - 128, 1.1, 4);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0e1c" opacity=".18"/>` + scr(`<ellipse cx="560" cy="380" rx="300" ry="160" fill="#fff4d8" opacity=".15" filter="url(#blur16)"/>`);
  const k = ease(ramp(t, WS(3, 5), WS(3, 7)));
  s += `<g opacity="${k.toFixed(2)}">${panel(430, 990, 260, 110)}${LHL(560, 1040, 'تكفيكَ', 1, '#fff', 24)}${LHL(560, 1082, 'طوالَ حياتِك', 1, '#f4c76b', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: but bread goes mouldy in days, milk goes bad after a week ----------
function loafL(x, y, s, m) { const r = RS(8); let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="150" ry="16" fill="#000" opacity=".3"/><path d="M-140,0 Q-150,-70 -90,-86 Q0,-110 90,-86 Q150,-70 140,0Z" fill="${mix('#c8843a', '#8a7a52', m * .5)}"/><path d="M-120,-40 Q-60,-90 0,-92 Q70,-90 120,-40" stroke="#e8b06a" stroke-width="10" fill="none" opacity="${(.6 * (1 - m)).toFixed(2)}"/>` + [-80, -30, 20, 70].map(dx => `<path d="M${dx},-92 q20,22 10,48" stroke="#8a4a1a" stroke-width="5" fill="none" opacity=".5"/>`).join('');
  for (let i = 0; i < 26; i++) { const px = (r() - .5) * 240, py = -10 - r() * 80, rr = (6 + r() * 16) * clamp(m * 1.6 - r() * .6); if (rr <= .5) continue; g += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${rr.toFixed(1)}" fill="${['#6a8a5a', '#8aa89a', '#4a6a4a', '#dcdcc8'][i % 4]}" opacity=".85"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(rr * .5).toFixed(1)}" fill="#e8ecd8" opacity=".45"/>`; }
  return g + `</g>`; }
function milkL(x, y, s, m) { const b = m * 10; return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="70" ry="10" fill="#000" opacity=".3"/><path d="M-${50 + b},0 L-${50 + b},-170 L-50,-200 L0,-240 L50,-200 L${50 + b},-170 L${50 + b},0Z" fill="#f4f4ee"/><path d="M-50,-200 L0,-240 L50,-200Z" fill="#dcdcd4"/><rect x="-${50 + b}" y="-150" width="${100 + 2 * b}" height="70" fill="#3a7ac8"/><text x="0" y="-104" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff">حليب</text>` +
  (m > .5 ? `<g opacity="${clamp((m - .5) * 3).toFixed(2)}"><path d="M-30,-60 L30,-10 M30,-60 L-30,-10" stroke="#d83a30" stroke-width="12" stroke-linecap="round"/></g>` : '') + `</g>`; }
function sceneRot(t) {
  const m1 = ease(ramp(t, WS(4, 1), WS(4, 4) + .6)), m2 = ease(ramp(t, WS(4, 5), WS(4, 8) + .4)), day = Math.max(1, Math.round(lerp(1, 7, ease(ramp(t, WS(4, 1), WS(4, 8) + .4)))));
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: .1, id: 'l4' });
  s += `<rect x="40" y="900" width="640" height="34" fill="#7a5034"/><rect x="40" y="900" width="640" height="8" fill="#a87048"/><rect x="70" y="934" width="26" height="360" fill="#5a3a24"/><rect x="624" y="934" width="26" height="360" fill="#5a3a24"/>`;
  s += loafL(260, 900, 1, m1) + milkL(530, 900, .95, m2);
  s += `${panel(470, 410, 210, 110)}<text x="575" y="456" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">اليوم</text><text x="575" y="502" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4c76b">${arL(day)}</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: to live: collect rain water, make fire, learn to farm ----------
function sceneSurvive(t) {
  const T = t - (S0(5) - .2), a1 = ease(ramp(t, WS(5, 4), WS(5, 4) + .5)), a2 = ease(ramp(t, WS(5, 7), WS(5, 7) + .5)), a3 = ease(ramp(t, WS(5, 9), S0(6) - .3));
  let s = `<defs>${LDEFS()}<linearGradient id="lsS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac0"/><stop offset="1" stop-color="#e8d8b8"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#lsS)"/>`;
  s += cumulus(180 + T * 3, 560, 260, 5, { a: .9 }) + farCity(44, 840, '#a8b0bc');
  s += `<path d="M-20,840 Q200,800 420,836 T740,826 V1300 H-20Z" fill="#6a8a3e"/><rect x="-20" y="840" width="760" height="460" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M-20,960 Q360,930 740,970 V1300 H-20Z" fill="#7a6a44"/>`;
  // left: rain into a bucket
  s += `<g opacity="${a1.toFixed(2)}"><path d="M40,620 q40,-50 90,-20 q40,-40 80,0 q30,10 10,40 H40Z" fill="#7a8898"/>` + Array.from({ length: 14 }, (_, i) => { const x0 = 60 + (i * 37) % 140, y0 = 660 + pmod(T * 700 + i * 83, 360); return `<path d="M${x0},${y0} l-3,22" stroke="#d8e8f4" stroke-width="3" stroke-linecap="round" opacity=".8"/>`; }).join('') + bucket(130, 1060, 2.4, clamp(T / 6)) + LHL(130, 1150, 'ماءُ المطر', 1, '#fff', 24) + `</g>`;
  // centre: you and a fire
  s += hero(330, 1160, Object.assign({ s: .78, face: 1, shade: 1, lean: 8, hF: [400, 1160 - 120], hB: [380, 1160 - 110] }, gp(1), { top: '#e85a2a' }));
  s += `<g opacity="${a2.toFixed(2)}">${campfire(440, 1170, t, a2)}${LHL(440, 1240, 'النار', 1, '#fff', 24)}</g>`;
  // right: sprouts growing in rows
  s += `<g opacity="${clamp(a3 * 3).toFixed(2)}">` + Array.from({ length: 3 }, (_, rI) => `<path d="M520,${1000 + rI * 60} H700" stroke="#5a4a2a" stroke-width="10" stroke-linecap="round"/>` + Array.from({ length: 5 }, (_, i) => { const x = 530 + i * 40, y = 996 + rI * 60, h = 34 * a3 * (.7 + .3 * Math.sin(i + rI)); return `<path d="M${x},${y} v${-h}" stroke="#4a8a2e" stroke-width="3"/><path d="M${x},${y - h * .6} q-12,-8 -16,-2 q8,8 16,2 M${x},${y - h} q12,-8 16,-2 q-8,8 -16,2" fill="#6aaa3a"/>`; }).join('')).join('') + LHL(610, 1190, 'الزراعة', 1, '#fff', 24) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: after months, animals walk into the cities: deer, foxes, wolves ----------
function sceneAnimals(t) {
  const T = t - (S0(6) - .2);
  let top = deer(lerp(-80, 260, clamp(T / 4.8)), 1086, .55, 1, T * 4) + quad(lerp(780, 470, clamp((T - .6) / 4)), 1100, .9, { kind: 'fox', face: -1, moving: 1, phase: T * 6 }) + quad(lerp(-120, 150, clamp((T - 1.6) / 3.4)), 1098, .75, { kind: 'wolf', face: 1, moving: 1, phase: T * 5 });
  const fg = [[60, 1006, 30, 71], [250, 1010, 40, 72], [420, 1004, 26, 73], [640, 1012, 36, 74], [330, 1100, 30, 75]].map(([x, y, h, sd]) => weed(x, y, h, 1, sd)).join('');
  noEarth(); F.ov = '';
  return `<defs>${LDEFS()}</defs>` + emptyStreet(t, { id: 'l6', N: 0, top, fg, cars: [[120, '#7a3a2a'], [560, '#4a5a6a']] });
}
// ---------- 7: hungry dogs become one of the worst dangers ----------
function sceneDogs(t) {
  const T = t - (S0(7) - .2), go = clamp(T / 3.2);
  let top = hero(lerp(600, 640, go), 1090, Object.assign({ s: .74, face: -1, shade: 1, lean: -6, hF: [560, 1090 - 190], hB: [610, 1090 - 150] }, gp(1), { top: '#e85a2a' }));
  [[-160, 1080, .9, '#5a4e40'], [-260, 1096, 1, '#3a3632'], [-60, 1100, .8, '#8a6a44']].forEach(([x0, y, s, c], i) => { const x = x0 + lerp(0, 540, ease(go)) - i * 10; top += quad(x, y, s, { kind: 'wolf', face: 1, moving: go < 1 ? 1 : 0, phase: T * 7 + i, col: c }); });
  noEarth(); F.ov = '';
  return `<defs>${LDEFS()}</defs>` + emptyStreet(t, { id: 'l7', N: .45, top, cars: [[150, '#5a2a2a']] }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#3a0a0a" opacity=".12"/>`;
}
// ---------- 8: after a few years the roads crack and trees grow between the cars ----------
function sceneDecay(t) {
  const k = ease(ramp(t, WS(8, 2), WS(8, 4) + .3)), g = ease(ramp(t, WS(8, 5), S0(9) - .3)), yrs = Math.round(lerp(1, 8, ease(ramp(t, S0(8), S0(9) - .4))));
  const fg = cracks(1120, 1290, k, 9, -20, 740, '#1e1e22') + [[-40, '#6a4a3a'], [330, '#5a5a4a'], [650, '#6a5a4a']].map(([x, c]) => car(x, 1176, .78, c, 1)).join('') + treeB(170, 1180, lerp(30, 330, g), 41) + treeB(500, 1186, lerp(20, 280, g), 42) +
    [[40, 1006, 50, 81], [210, 1010, 60, 82], [420, 1004, 44, 83], [620, 1008, 56, 84]].map(([x, y, h, sd]) => weed(x, y, h, .4 + .6 * g, sd)).join('');
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'l8', blocks: LBL, shops: LSH, fg, N: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#6a5a3a" opacity="${(.12 * g).toFixed(2)}"/>`;
  s += `${panel(40, 410, 220, 110)}<text x="150" y="456" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">بعدَ</text><text x="150" y="504" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4c76b">${arL(yrs)} سنوات</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: but the biggest danger is not hunger or animals... it is loneliness ----------
function sceneLonely(t) {
  const T = t - (S0(9) - .2), z = 1 + .12 * ease(clamp(T / 4.5));
  const top = hero(360, 1086, Object.assign({ s: .7, face: 1, shade: 1, lean: 10, aF: [.05, .2], aB: [-.05, .18] }, gp(1), { top: '#e85a2a' }));
  let s = `<defs>${LDEFS()}<radialGradient id="lnG" cx=".5" cy=".75" r=".6"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient></defs><g transform="translate(360,1000) scale(${z.toFixed(3)}) translate(-360,-1000)">` + emptyStreet(t, { id: 'l9', N: 0, top, cars: [[90, '#5a4a4a'], [600, '#3a4a5a']] }) + `</g>`;
  s += darkL(.62) + scr(`<ellipse cx="360" cy="1060" rx="140" ry="200" fill="#bcd0ff" opacity=".12" filter="url(#blur16)"/>`) + `<rect x="-20" y="-20" width="760" height="1320" fill="url(#lnG)"/>` + scr(`<circle cx="580" cy="470" r="170" fill="url(#lampG)" opacity=".35"/>`) + `<circle cx="580" cy="470" r="40" fill="#eeeadc"/><circle cx="566" cy="460" r="8" fill="#d4d0c2"/><circle cx="592" cy="484" r="6" fill="#d4d0c2"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: long isolation harms the body like smoking 15 cigarettes a day ----------
function cigL(x, y, a, t, i) { if (a <= 0) return ''; const w = Math.sin(t * 2 + i) * 6; return `<g opacity="${a.toFixed(2)}"><rect x="${x - 60}" y="${y - 9}" width="120" height="18" rx="4" fill="#f4f0e8"/><rect x="${x - 60}" y="${y - 9}" width="34" height="18" rx="4" fill="#d8904a"/><rect x="${x + 56}" y="${y - 9}" width="8" height="18" rx="3" fill="#ff7a3a"/>` + scr(`<circle cx="${x + 62}" cy="${y}" r="10" fill="#ff8a3a" opacity=".6" filter="url(#blur5)"/>`) + `<path d="M${x + 64},${y - 10} q${12 + w},-20 0,-40 q${-12 - w},-20 4,-46" stroke="#c8ccd4" stroke-width="5" fill="none" opacity=".45" stroke-linecap="round"/></g>`; }
function sceneCig(t) {
  const n0 = WS(10, 8), n1 = WS(10, 11) + .3; let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141a26"/>` + scr(`<ellipse cx="360" cy="800" rx="340" ry="440" fill="#ff9a5a" opacity=".07" filter="url(#blur16)"/>`);
  const hb = ease(ramp(t, WS(10, 3), WS(10, 6) + .4));
  s += scr(`<ellipse cx="180" cy="1110" rx="160" ry="200" fill="#bcd0ff" opacity=".1" filter="url(#blur16)"/>`) + hero(180, 1250, Object.assign({ s: .85, face: 1, shade: 1, lean: 10, aF: [.05, .2], aB: [-.05, .18] }, gp(1), { top: '#e85a2a' }));
  s += `${panel(330, 1040, 360, 130)}${LHL(510, 1086, 'صحّةُ الجسم', 1, '#fff', 24)}<rect x="360" y="1112" width="300" height="30" rx="10" fill="#2a3040"/><rect x="360" y="1112" width="${(300 * (1 - .55 * hb)).toFixed(1)}" height="30" rx="10" fill="${mix('#4ac87a', '#e8503a', hb)}"/>`;
  for (let i = 0; i < 15; i++) { const c = i % 3, r = Math.floor(i / 3), at = lerp(n0, n1, i / 14); s += cigL(150 + c * 210, 440 + r * 92, ease(ramp(t, at, at + .25)), t, i); }
  const cnt = Math.round(15 * clamp((t - n0) / (n1 - n0))); if (t > n0) s += `${panel(250, 860, 220, 110)}<text x="360" y="934" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="52" fill="#ff8a6a">${arL(Math.max(1, cnt))}</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: solar panels may keep some lamps lit for years... just for you ----------
function sceneSolar(t) {
  const T = t - (S0(11) - .2), p = ease(ramp(t, WS(11, 1), WS(11, 3) + .3)), on = ease(ramp(t, WS(11, 7), WS(11, 8) + .3));
  let s = `<defs>${LDEFS()}<linearGradient id="slS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04081a"/><stop offset="1" stop-color="#1a2448"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#slS)"/>`;
  const r = RS(3); for (let i = 0; i < 120; i++) s += `<circle cx="${(r() * 740).toFixed(0)}" cy="${(r() * 760).toFixed(0)}" r="${(r() * 1.6 + .3).toFixed(1)}" fill="#fff" opacity="${(.3 + .6 * r() * (.7 + .3 * Math.sin(t * 2 + i))).toFixed(2)}"/>`;
  s += farCity(52, 900, '#0a1022') + `<rect x="-20" y="900" width="760" height="400" fill="#0c1220"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // the house with solar panels
  const hx = 360, hy = 1080;
  s += `<path d="M${hx - 220},${hy - 230} L${hx},${hy - 400} L${hx + 220},${hy - 230}Z" fill="#2a2020"/><rect x="${hx - 200}" y="${hy - 232}" width="400" height="232" fill="#3a3430"/>`;
  for (let i = 0; i < 4; i++) { const u = i / 4, x0 = lerp(hx - 190, hx - 10, u), y0 = lerp(hy - 245, hy - 385, u), x1 = lerp(hx - 190, hx - 10, u + .22), y1 = lerp(hy - 245, hy - 385, u + .22); s += `<path d="M${x0},${y0} L${x1},${y1} L${x1 + 26},${y1 + 20} L${x0 + 26},${y0 + 20}Z" fill="${mix('#1a2a4a', '#3a6ab8', .4 + .4 * p)}" stroke="#8aa8d8" stroke-width="2"/>`; }
  s += `<rect x="${hx - 150}" y="${hy - 180}" width="110" height="100" fill="${mix('#141820', '#ffd88a', on)}"/><rect x="${hx + 40}" y="${hy - 180}" width="110" height="100" fill="#141820"/><path d="M${hx - 95},${hy - 180} v100 M${hx - 150},${hy - 130} h110 M${hx + 95},${hy - 180} v100 M${hx + 40},${hy - 130} h110" stroke="#2a2420" stroke-width="6"/><rect x="${hx - 30}" y="${hy - 150}" width="60" height="150" fill="#2a1e16"/>`;
  s += scr(`<ellipse cx="${hx - 95}" cy="${hy - 60}" rx="260" ry="200" fill="url(#lampG)" opacity="${(.75 * on).toFixed(2)}"/>`);
  s += `<g opacity="${(.4 + .6 * on).toFixed(2)}">${hero(hx + 110, 1200, Object.assign({ s: .62, face: -1, shade: 1 }, gp(1), { top: '#e85a2a' }))}</g>`;
  s += `<g opacity="${p.toFixed(2)}">${LHL(hx + 150, hy - 330, 'ألواحٌ شمسيّة', 1, '#bcd4ff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 12: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  const G = glE(t, { d: 9.8, el: .32, lon: 30 + t * 1.5, clouds: .35, lights: 0, sunI: .12, tg: [0, .64, 0] });
  const lo0 = 34 + S0(12) * 1.5; let dot = ''; const v = G.vis(26, lo0); if (v > .2) { const [x, y] = G.P(26, lo0); dot = scr(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(34 + 6 * Math.sin(t * 4)).toFixed(1)}" fill="url(#lampG)" opacity="1"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#fff4c8"/>`); }
  F.ov = dot + `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 12) - .3, WS(12, 12) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSilent }, { s: S0(2) - .2, f: sceneLights }, { s: S0(3) - .2, f: sceneCans }, { s: S0(4) - .2, f: sceneRot }, { s: S0(5) - .2, f: sceneSurvive },
  { s: S0(6) - .2, f: sceneAnimals }, { s: S0(7) - .2, f: sceneDogs }, { s: S0(8) - .2, f: sceneDecay }, { s: S0(9) - .2, f: sceneLonely }, { s: S0(10) - .2, f: sceneCig }, { s: S0(11) - .2, f: sceneSolar }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneCig, sceneSolar]);
const XF = .5;
const TLI = [['اليومُ الأوّل', S0(1)], ['الكهرباء', S0(2)], ['الطعام', S0(3)], ['البقاء', S0(5)], ['الحيوانات', S0(6)], ['المدن', S0(8)], ['الوحدة', S0(9)]];
const LIST_ON = new Set([sceneAnimals, sceneDecay]);
const CHIPS = [
  ['c0', 'آخرُ إنسانٍ على الأرض', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c1', 'لا أحدَ يجيب', 360, 330, 'red big', WS(1, 4), S0(2) - .3],
  ['c2', 'تنطفئُ المدن', 360, 330, 'big', WS(2, 7), S0(3) - .3],
  ['c3', 'معلّباتٌ في كلِّ مكان', 360, 330, 'big', WS(3, 4), S0(4) - .3],
  ['c4', 'يتعفّنُ ويفسد', 360, 330, 'red big', WS(4, 2), S0(5) - .3],
  ['c5', 'تعلّمِ البقاء', 360, 330, 'big', WS(5, 1), S0(6) - .3],
  ['c6', 'الحيواناتُ في المدن', 360, 330, 'big', WS(6, 2), S0(7) - .3],
  ['c7', 'كلابٌ جائعة', 360, 330, 'red big', WS(7, 1), S0(8) - .3],
  ['c8', 'الطبيعةُ تعود', 360, 330, 'big', WS(8, 5), S0(9) - .3],
  ['c9', 'الوحدة', 360, 330, 'red big', WS(9, 8), S0(10) - .3],
  ['c10', '١٥ سيجارةً يوميّاً', 360, 330, 'red big', WS(10, 9), S0(11) - .3],
  ['c11', 'والغريب؟', 360, 330, 'big', WS(11, 0), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 12) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:380px"><div class="hd">آخرُ إنسان</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 44; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 44) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
