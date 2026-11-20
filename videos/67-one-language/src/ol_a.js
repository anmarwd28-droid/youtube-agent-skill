// ol_a.js (#67): what if everyone spoke one language? A new street, speech bubbles, the language dots + scenes 0-5
const OLL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const SHOPO = [[-4, 150, 'سفر', '#2a6a9a'], [154, 136, 'مطعم', '#a8402a'], [298, 150, 'هواتف', '#3a3a4a'], [456, 132, 'خرائط', '#4a7a3a'], [596, 140, 'عطور', '#8a3a7a']];
function shopRowO(PV) { const keep = SHOPB.slice(); SHOPB.splice(0, SHOPB.length, ...SHOPO); const r = shopRowB(PV); SHOPB.splice(0, SHOPB.length, ...keep); return r; }
function streetO(t, o = {}) {
  const N = o.N || 0, id = o.id || 'o';
  const sky = [mix('#3e78bc', '#060c24', N), mix('#9cc4e6', '#16224a', N), mix('#f4e2c4', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  s += sun3(120, 600, .7 * (1 - N)) + cumulus(300 + t * 1.5, 470, 250, 21, { a: .7 * (1 - N) }) + cumulus(640 + t, 530, 170, 23, { a: .6 * (1 - N) });
  let g = farCity(31, 905, mix(sky[2], '#58607a', .45)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-12, 166, 400, '#c4a07a', 961, 1], [154, 144, 480, '#6a7e92', 962, 2], [298, 158, 360, '#d8c4a4', 963, 0], [456, 140, 440, '#9a6a5a', 964, 1], [596, 160, 500, '#7a8a7a', 965, 2]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = shopRowO(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 6; q++) for (let r = 0; r < 16; r++) g += `<rect x="${r * 48 - 20 + (q % 2) * 24}" y="${PV + q * 17 + 2}" width="46" height="15" fill="none" stroke="#a89c88" stroke-width="1.2"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#484a50"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 30}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  [[130, 280, 51], [600, 300, 53]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[300, 0]]; lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/>`)).join('') + `</g>`;
  if (o.top) s += o.top;
  return s;
}
// a speech bubble with a greeting; tail points down-left (f = 1) or down-right (f = -1)
function sayB(x, y, tx, font, col, a, f = 1, gold = 0) {
  if (a <= 0) return ''; const w = Math.max(120, 44 + tx.length * (font === 'Inter' ? 19 : 28)), h = 60;
  return `<g opacity="${a.toFixed(2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 5}" width="${w}" height="${h}" rx="26" fill="#000" opacity=".3"/><path d="M${-f * 16},${h / 2 - 4} L${-f * 30},${h / 2 + 22} L${f * 4},${h / 2 - 4}Z" fill="${col}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="26" fill="${col}"${gold ? ' stroke="#f4c76b" stroke-width="5"' : ''}/><rect x="${-w / 2 + 8}" y="${-h / 2 + 5}" width="${w - 16}" height="${h * .34}" rx="14" fill="#fff" opacity=".35"/>` +
    `<text x="0" y="11" text-anchor="middle" font-family="${font}" font-weight="700" font-size="30" fill="#1c2230">${tx}</text></g>`;
}
// people on the street, each with a bubble; k = 0 all different languages, 1 = all the same («مرحباً»)
const PPLO = [[80, 1070, 1, 0, .64], [215, 1095, -1, 2, .7], [345, 1062, 1, 1, .62], [470, 1092, -1, 3, .7], [600, 1068, -1, 4, .64]];
const GPICK = [1, 2, 4, 5, 7, 11];
function streetTalk(t, k, o = {}) {
  let top = '';
  PPLO.forEach(([x0, y, f, i, s], j) => { const x = x0 + (o.walk ? f * 12 * Math.sin(t * .3 + j) : 0); top += hero(x, y, Object.assign({ s, face: f, shade: 1, aF: [.2, .9 + .2 * Math.sin(t * 3 + j)] }, gp(i)));
    const bx = [110, 240, 370, 490, 610][j], by = [720, 620, 720, 620, 720][j], gi = (o.order || GPICK)[j], sw = clamp(k * 2.2 - j * .22);
    top += `<path d="M${bx},${by + 34} L${x + f * 6},${y - 300 * s}" stroke="#fff" stroke-width="2" opacity=".35"/>` + sayB(bx, by, GREET[gi][0], GREET[gi][1], GCOL[j % 7], 1 - sw, f) + sayB(bx, by, 'مرحباً', 'Noto Naskh Arabic', '#fff4d6', sw, f, sw > .9 ? 1 : 0); });
  return top;
}
// ---------- 0: hook: a busy street; people greet each other in many languages, then all at once in the same one ----------
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 6), WS(0, 8) + .3));
  noEarth(); F.ov = '';
  return `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'h0', top: streetTalk(t, k) });
}
// ---------- 1: today: more than 7,000 languages: coloured dots all over the globe ----------
function langDots(G, n, a, seed, keep = 1) { const r = RS(seed); let s = ''; const cols = ['#ff7a6a', '#7ac8ff', '#f4c76b', '#9ae07a', '#d08aff', '#ffffff', '#ff9ad8'];
  for (let i = 0; i < n; i++) { const c = CITY[Math.floor(r() * CITY.length)], la = c[0] + (r() - .5) * 26, lo = c[1] + (r() - .5) * 34, col = cols[i % 7], lv = r() < keep; if (!lv || G.vis(la, lo) < .1) continue; const [x, y] = G.P(la, lo, 1.01);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.2" fill="${col}" opacity="${(a * clamp((G.vis(la, lo) - .1) * 4)).toFixed(2)}"/>`; } return s; }
function sceneWorld(t) {
  const T = t - (S0(1) - .2), k = ease(ramp(t, S0(1), WS(1, 7) + .3));
  const G = glE(t, { d: 9.2, el: .25, lon: 20 + T * 7, clouds: .3, lights: .25, tg: [0, -.3, 0] });
  const n = Math.round(lerp(0, 7000, k));
  F.ov = `<defs>${LDEFS()}</defs>` + scr(langDots(G, Math.round(600 * k), .95, 5)) +
    `<g opacity="${clamp(k * 4).toFixed(2)}">${panel(170, 1040, 380, 150)}<text x="360" y="1120" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="#f4c76b">+${fmtN(n)}</text>${OLL(360, 1168, 'لغة', 1, '#fff', 28)}</g>`;
  return space(t);
}
// ---------- 2: every traveller understands every sign and every menu ----------
const FOREIGN = [['メニュー', 'IPAGothic'], ['Меню', 'Inter'], ['เมนู', 'Loma'], ['菜单', 'WenQuanYi Zen Hei'], ['मेनू', 'FreeSans']];
const DISHES = [['ラーメン', 'IPAGothic', 'حساء'], ['Борщ', 'Inter', 'خضار'], ['ผัดไทย', 'Loma', 'أرز'], ['饺子', 'WenQuanYi Zen Hei', 'فطائر'], ['समोसा', 'FreeSans', 'معجّنات']];
function sceneMenu(t) {
  const T = t - (S0(2) - .2), tr = ease(ramp(t, WS(2, 1), WS(2, 3) + .4)), tr2 = ease(ramp(t, WS(2, 5), WS(2, 8) + .3));
  let s = `<defs>${LDEFS()}</defs>`;
  // a café front: a chalk menu board on an easel, a sign above the door
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#8a6a4e"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#gnWood)" opacity=".25"/>` +
    `<rect x="-20" y="380" width="760" height="70" fill="#3a2a20"/><rect x="40" y="470" width="300" height="520" fill="#6a4a30"/><rect x="40" y="470" width="300" height="300" fill="#e8c890"/>` + [80, 160, 240].map(x => `<rect x="${x}" y="560" width="60" height="6" fill="#5a3a20"/>` + [0, 1, 2].map(i => `<rect x="${x + 6 + i * 18}" y="534" width="12" height="26" rx="3" fill="${['#a8402a', '#2a6a4a', '#d8b860'][i]}"/>`).join('')).join('') + `<circle cx="190" cy="520" r="20" fill="#fff4c8"/><path d="M190,470 V500" stroke="#3a2a20" stroke-width="3"/><rect x="80" y="800" width="80" height="10" fill="#3a2a20"/><rect x="220" y="800" width="80" height="10" fill="#3a2a20"/><circle cx="120" cy="760" r="18" fill="#3a2a20" opacity=".7"/><path d="M100,800 Q120,770 140,800Z" fill="#3a2a20" opacity=".7"/><circle cx="262" cy="764" r="17" fill="#3a2a20" opacity=".7"/><path d="M244,800 Q262,772 280,800Z" fill="#3a2a20" opacity=".7"/><rect x="40" y="470" width="300" height="520" fill="#fff" opacity=".12"/><rect x="40" y="470" width="300" height="520" fill="none" stroke="#3a2a20" stroke-width="12"/>` +
    scr(`<ellipse cx="190" cy="700" rx="150" ry="200" fill="#ffd8a0" opacity=".25" filter="url(#blur16)"/>`);
  // the sign: foreign script → Arabic
  const fi = Math.floor(T * .9) % FOREIGN.length;
  s += `<g opacity="${(1 - tr).toFixed(2)}"><text x="360" y="430" text-anchor="middle" font-family="${FOREIGN[fi][1]}" font-weight="700" font-size="44" fill="#f4e4c0">${FOREIGN[fi][0]}</text></g><g opacity="${tr.toFixed(2)}"><text x="360" y="432" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4e4c0">قائمةُ الطعام</text></g>`;
  // the board
  const bx = 400, by = 560;
  s += `<path d="M${bx + 20},${by + 520} L${bx + 70},${by - 20} M${bx + 280},${by + 520} L${bx + 230},${by - 20}" stroke="#5a3a20" stroke-width="12"/><rect x="${bx}" y="${by}" width="300" height="420" rx="8" fill="#1e2a26"/><rect x="${bx}" y="${by}" width="300" height="420" rx="8" fill="none" stroke="#7a5030" stroke-width="12"/><rect x="${bx}" y="${by}" width="300" height="420" fill="#fff" filter="url(#chalkF)" opacity=".12"/>`;
  DISHES.forEach(([fx, ff, ar], i) => { const y = by + 70 + i * 72, a2 = clamp(tr2 * 2.2 - i * .3);
    s += `<g opacity="${(1 - a2).toFixed(2)}"><text x="${bx + 150}" y="${y}" text-anchor="middle" font-family="${ff}" font-weight="700" font-size="32" fill="#f4f2ea">${fx}</text></g><g opacity="${a2.toFixed(2)}"><text x="${bx + 150}" y="${y}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="32" fill="#f4f2ea">${ar}</text></g>` +
      `<path d="M${bx + 40},${y + 18} H${bx + 260}" stroke="#f4f2ea" stroke-width="1.5" opacity=".25"/>`; });
  s += `<rect x="-20" y="1080" width="760" height="220" fill="#a89c88"/><rect x="-20" y="1080" width="760" height="220" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  // the traveller with a suitcase stops and reads; a smile when it becomes clear
  s += traveller(lerp(-60, 250, ease(clamp(T / 2.4))), 1210, .9, 3, t, 0, 1);
  s += OLL(250, 1260, 'يفهمُ كلَّ شيء', tr2, '#f4c76b', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: the internet opens to everyone: about half of all websites are in one language ----------
function sceneWeb(t) {
  const T = t - (S0(3) - .2), k = ease(ramp(t, WS(3, 3), WS(3, 8) + .4)), op = ease(ramp(t, WS(3, 1), WS(3, 3)));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1a2232"/>` + scr(`<ellipse cx="360" cy="760" rx="380" ry="420" fill="#4a8ad8" opacity=".15" filter="url(#blur16)"/>`);
  // a laptop with a browser
  s += `<path d="M90,1060 L630,1060 L690,1110 L30,1110Z" fill="#9aa2ac"/><rect x="30" y="1106" width="660" height="10" rx="4" fill="#6a727c"/><rect x="110" y="700" width="500" height="360" rx="14" fill="#2a2e36"/><rect x="126" y="716" width="468" height="328" fill="#f4f6f8"/>` +
    `<rect x="126" y="716" width="468" height="34" fill="#dde2e8"/>${[150, 170, 190].map((x, i) => `<circle cx="${x}" cy="733" r="6" fill="${['#e85a4a', '#f4c040', '#6ac08a'][i]}"/>`).join('')}<rect x="220" y="724" width="340" height="18" rx="9" fill="#fff"/>`;
  // the page: lines that turn from grey blocks (unreadable) to readable Arabic headings
  for (let i = 0; i < 6; i++) { const y = 790 + i * 40, w = 380 - (i % 3) * 70; s += `<rect x="${590 - w - 20}" y="${y}" width="${w}" height="14" rx="7" fill="#c8ced6" opacity="${(1 - op).toFixed(2)}"/>`; }
  s += `<g opacity="${op.toFixed(2)}"><text x="360" y="804" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#1a2a4a">علوم • أخبار • دروس</text>` + [0, 1, 2, 3, 4].map(i => `<rect x="${170 + (i % 2) * 40}" y="${830 + i * 40}" width="${380 - (i % 2) * 40}" height="12" rx="6" fill="#8a9ab0"/>`).join('') + `</g>`;
  // the share of websites: a half-gold disc
  const cx = 360, cy = 470, R = 150;
  s += `<g opacity="${clamp(k * 3).toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#3a4258"/>` + donutSeg(cx, cy, R, R, -Math.PI / 2, -Math.PI / 2 + k * Math.PI * .98 + .001, '#f4c76b') +
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#0a0e1c" stroke-width="4"/>${OLL(cx + 80, cy + 10, '≈ ٥٠٪', k, '#1c2230', 34)}${OLL(cx - 80, cy + 10, 'كلُّ اللغاتِ الأخرى', clamp(k * 2 - 1), '#fff', 20)}${OLL(cx, cy + R + 50, 'المواقعُ بلغةٍ واحدة', k, '#f4c76b', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: translators lose their jobs; an industry worth tens of billions of dollars disappears ----------
function sceneTrans(t) {
  const T = t - (S0(4) - .2), k = ease(ramp(t, WS(4, 2), WS(4, 3) + .6)), m = ease(ramp(t, WS(4, 5), WS(4, 7) + .3));
  let s = `<defs>${LDEFS()}</defs>` + room(t, {});
  // a translator's desk: dictionaries pile, a lamp; the books slide into a box
  s += `<rect x="440" y="920" width="220" height="22" fill="#7a5034"/><path d="M456,942 V1150 M644,942 V1150" stroke="#5a3824" stroke-width="14"/>`;
  const bk = [['#8a2a2a', 'قاموس'], ['#2a4a8a', 'DICT'], ['#2a6a3a', '辞書'], ['#7a5a1a', 'Словарь']];
  bk.forEach(([c, tx], i) => { const y = 888 - i * 34 + k * (i * 34 + 140), x = 470 + i * 4; s += `<rect x="${x}" y="${y}" width="150" height="32" rx="3" fill="${c}"/><rect x="${x}" y="${y + 3}" width="150" height="5" fill="#fff" opacity=".2"/><text x="${x + 75}" y="${y + 23}" text-anchor="middle" font-family="${i === 2 ? 'IPAGothic' : i === 0 ? 'Noto Naskh Arabic' : 'Inter'}" font-weight="700" font-size="17" fill="#f4e4c0">${tx}</text>`; });
  if (k > 0) s += `<g opacity="${k.toFixed(2)}"><rect x="450" y="1030" width="200" height="130" fill="#c89a5a"/><path d="M450,1030 L470,1000 H630 L650,1030Z" fill="#dab070"/><rect x="450" y="1030" width="200" height="130" fill="#000" filter="url(#grainR)" opacity=".15"/></g>`;
  s += deskP(170, 1200, 1.1, 2, t);
  if (m > 0) s += `<g opacity="${m.toFixed(2)}">${panel(40, 430, 400, 150)}<text x="240" y="512" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="56" fill="#ff8a7a">+$٦٠ مليار</text>${OLL(240, 556, 'صناعةُ الترجمة كلَّ عام', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: scientists from every country work together without barriers ----------
function sceneSci(t) {
  const T = t - (S0(5) - .2), b = ease(ramp(t, WS(5, 6), WS(5, 8))), idea = ease(ramp(t, WS(5, 9), WS(5, 10) + .3));
  let s = `<defs>${LDEFS()}</defs>` + labRoom(t, T);
  // four scientists around a bench, all talking the same language
  [[100, 1160, 1, 0], [250, 1180, 1, 1], [470, 1180, -1, 2], [620, 1160, -1, 3]].forEach(([x, y, f, i], j) => { s += coatP(x, y, .82, f, i + 1, t, { h: { aF: [.5 + .2 * Math.sin(t * 2 + j), 1.2] } });
    s += sayB([120, 270, 450, 600][j], [720, 640, 640, 720][j], ['مرحباً', 'فكرة!', 'جرّب هذا', 'نعم'][j], 'Noto Naskh Arabic', '#fff4d6', b * (Math.sin(t * 1.5 + j * 1.6) > -.3 ? 1 : .2), f); });
  if (idea > 0) s += scr(`<circle cx="360" cy="560" r="${(60 + 40 * idea).toFixed(1)}" fill="url(#lampG)" opacity="${idea.toFixed(2)}"/>`) + `<g opacity="${idea.toFixed(2)}" transform="translate(360,560)"><path d="M-30,10 Q-44,-44 0,-50 Q44,-44 30,10 L18,30 H-18Z" fill="#fff6c8"/><rect x="-18" y="30" width="36" height="22" rx="4" fill="#9aa2ac"/></g>`;
  noEarth(); F.ov = ''; return s;
}
