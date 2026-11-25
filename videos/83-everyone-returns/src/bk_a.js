// bk_a.js (#83): what if every human who ever lived came back? Built on the #82 chain (streetD, hero, knight/robeP/spearman/archer, p14/p39, shelfE, wheatField, glE, CITY).
const b1 = v => (+v).toFixed(1);
const BL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const BKD = `<radialGradient id="bkPopG"><stop offset="0" stop-color="#fff4c8" stop-opacity=".85"/><stop offset=".4" stop-color="#f4c76b" stop-opacity=".35"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<linearGradient id="bkWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9dcc4"/><stop offset="1" stop-color="#cdb898"/></linearGradient>
<linearGradient id="bkFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6c44"/><stop offset="1" stop-color="#5e3e24"/></linearGradient>
<linearGradient id="bkBeam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4d0" stop-opacity=".5"/><stop offset="1" stop-color="#fff4d0" stop-opacity="0"/></linearGradient>
<linearGradient id="bkMus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4a3a"/><stop offset=".55" stop-color="#8a7458"/><stop offset="1" stop-color="#a88e6a"/></linearGradient>
<linearGradient id="bkMarb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bdb2a0"/><stop offset="1" stop-color="#8a8070"/></linearGradient>
<linearGradient id="bkClay" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8a878"/><stop offset="1" stop-color="#9a6a44"/></linearGradient>
<linearGradient id="bkGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
<linearGradient id="bkFarmSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86c8"/><stop offset=".6" stop-color="#a8cbe6"/><stop offset="1" stop-color="#f2e2be"/></linearGradient>
<linearGradient id="bkRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#55575c"/><stop offset="1" stop-color="#3a3c40"/></linearGradient>
<radialGradient id="bkLampG"><stop offset="0" stop-color="#fff6d8" stop-opacity=".95"/><stop offset=".25" stop-color="#ffe6a0" stop-opacity=".45"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
<radialGradient id="bkSpot" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#ffeac0" stop-opacity=".5"/><stop offset="1" stop-color="#ffeac0" stop-opacity="0"/></radialGradient>
<radialGradient id="bkDrop" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#d8f2ff"/><stop offset=".5" stop-color="#4aa8e8"/><stop offset="1" stop-color="#1a5a9a"/></radialGradient>
<radialGradient id="bkBread" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f0c27a"/><stop offset=".6" stop-color="#c8843a"/><stop offset="1" stop-color="#8a4e1e"/></radialGradient>
<radialGradient id="bkInset" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#2a3450"/><stop offset="1" stop-color="#0e1222"/></radialGradient>`;
const BKDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${BKD}`;
// a new street: different blocks and shops
const BKBLK = [[-14, 156, 420, '#b88a6a', 871, 2], [142, 150, 470, '#6e8496', 872, 0], [292, 166, 380, '#d0b894', 873, 1], [458, 146, 460, '#7e5e6a', 874, 2], [604, 160, 410, '#8a9a72', 875, 0]];
const BKSHOP = [[-4, 140, 'مخبز', '#8a4a2a'], [146, 150, 'ساعات', '#2a3a5a'], [306, 130, 'كتب', '#4a6a3a'], [456, 140, 'ملابس', '#7a2a4a'], [606, 140, 'صيدليّة', '#2a6a6a']];
const bkStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: BKBLK, shops: BKSHOP }, o));
const bkQ = (x, y, a, sc = 1) => a <= 0 ? '' : `<text x="${b1(x)}" y="${b1(y)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${b1(54 * sc * (.6 + .4 * Math.min(1, a * 1.4)))}" fill="#f4c76b" opacity="${b1(Math.min(1, a))}" style="paint-order:stroke" stroke="#2a1a08" stroke-width="4">؟</text>`;
// ---------- people of every age ----------
// a hunter-gatherer: fur tunic with a ragged hem, bare legs, long hair, a stone-tipped spear
function bkHunter(x, y, s, f, t, i, o = {}) {
  const skin = ['#a8744c', '#8a5a3a', '#c08a60'][i % 3], fur = ['#7a5636', '#6a4a30', '#8a6440'][i % 3];
  const hx0 = x + f * s * 40, hy0 = y - s * 210;
  const A = Object.assign({ s, face: f, shade: 1, top: fur, pants: skin, skin, hair: '#2a1c12', walk: o.walk ?? null, lookUp: o.lookUp || 0 }, o.spear === 0 ? {} : { hF: [hx0, hy0] });
  const mid = L => { const { hipY, ty, hx, hy } = L; let hem = '';
    for (let k = 0; k <= 8; k++) hem += ` L${b1(32 - k * 8)},${b1(hipY + 40 + (k % 2 ? 12 : 0))}`;
    return `<path d="M-26,${ty + 12} Q0,${ty + 2} 28,${ty + 12} L32,${hipY + 40}${hem} L-32,${hipY + 40}Z" fill="${fur}"/><path d="M-26,${ty + 12} L-12,${ty + 8} L-16,${hipY + 46} L-32,${hipY + 40}Z" fill="#000" opacity=".25"/>` +
      Array.from({ length: 7 }, (_, k) => `<path d="M${-18 + k * 7},${ty + 30 + (k % 3) * 22} l3,10" stroke="#000" stroke-width="2" opacity=".22"/>`).join('') +
      `<path d="M-24,${ty + 14} L26,${hipY - 30}" stroke="${mix(fur, '#000000', .35)}" stroke-width="7"/><ellipse cx="${hx - 13}" cy="${hy + 8}" rx="13" ry="27" fill="#2a1c12"/><path d="M${hx + 4},${hy + 18} q8,10 14,0 q-2,10 -8,12 q-6,-2 -6,-12Z" fill="#2a1c12"/>`; };
  let g = heroX(x, y, A, mid).split('#1d2028').join(mix(skin, '#000000', .3));
  if (o.spear !== 0) { const L1 = 280 * s, dx = f * Math.sin(.1), dy = -Math.cos(.1), [hx, hy] = HP.hand;
    g += `<path d="M${b1(hx - dx * 110 * s)},${b1(hy - dy * 110 * s)} L${b1(hx + dx * L1)},${b1(hy + dy * L1)}" stroke="#7a5a34" stroke-width="${b1(5 * s)}" stroke-linecap="round"/>` +
      `<path d="M${b1(hx + dx * L1 - 7 * s)},${b1(hy + dy * L1)} L${b1(hx + dx * (L1 + 40 * s))},${b1(hy + dy * (L1 + 40 * s))} L${b1(hx + dx * L1 + 7 * s)},${b1(hy + dy * L1)}Z" fill="#6a6660" stroke="#3a3632" stroke-width="1.2"/>`; }
  return g;
}
// a farmer of the old world: linen tunic, rope belt, straw hat, a sickle
function bkFarmer(x, y, s, f, t, i, o = {}) {
  const tun = ['#b8a07a', '#a88a62', '#c8b088'][i % 3], skin = ['#b07a52', '#c89a72', '#8a5a3a'][i % 3];
  const A = Object.assign({ s, face: f, shade: 1, top: tun, pants: '#6a5a44', skin, hair: '#2a1e14', walk: o.walk ?? null, lookUp: o.lookUp || 0, aF: o.aF || [.5, -.2] });
  const mid = L => { const { hipY, ty, hx, hy } = L;
    return `<path d="M-26,${ty + 12} Q0,${ty + 2} 28,${ty + 12} L36,${hipY + 58} Q2,${hipY + 66} -34,${hipY + 58}Z" fill="${tun}"/><path d="M-26,${ty + 12} L-12,${ty + 8} L-16,${hipY + 62} L-34,${hipY + 58}Z" fill="#000" opacity=".22"/>` +
      `<path d="M-28,${hipY - 6} Q2,${hipY + 2} 32,${hipY - 6}" stroke="#8a6a3a" stroke-width="5" fill="none"/><path d="M8,${hipY - 4} l-4,24 M12,${hipY - 4} l4,22" stroke="#8a6a3a" stroke-width="3"/>` +
      `<ellipse cx="${hx}" cy="${hy - 18}" rx="42" ry="8" fill="#d8b866"/><path d="M${hx - 20},${hy - 18} Q${hx - 18},${hy - 44} ${hx + 2},${hy - 44} Q${hx + 22},${hy - 44} ${hx + 20},${hy - 18}Z" fill="#e2c476"/><path d="M${hx - 20},${hy - 22} h40" stroke="#8a5a2a" stroke-width="4"/><ellipse cx="${hx}" cy="${hy - 16}" rx="40" ry="5" fill="#000" opacity=".12"/>`; };
  let g = heroX(x, y, A, mid);
  if (o.tool !== 0) { const [hx, hy] = HP.hand; g += `<path d="M${b1(hx)},${b1(hy)} l${b1(f * 4 * s)},${b1(-26 * s)}" stroke="#6a4a2a" stroke-width="${b1(5 * s)}" stroke-linecap="round"/><path d="M${b1(hx + f * 4 * s)},${b1(hy - 26 * s)} q${b1(f * 30 * s)},${b1(-30 * s)} ${b1(f * 6 * s)},${b1(-58 * s)} q${b1(f * 12 * s)},${b1(30 * s)} ${b1(-f * 6 * s)},${b1(58 * s)}Z" fill="#9aa0a6" stroke="#4a4e54" stroke-width="1.2"/>`; }
  return g;
}
// a woman of the old world: long skirt and a head scarf, sometimes a basket
function bkWoman(x, y, s, f, t, i, o = {}) {
  const top = ['#8a4a3a', '#4a6a5a', '#7a6a3a'][i % 3], sk = ['#6a3a2e', '#3a5248', '#5a4a2a'][i % 3], skin = ['#c89070', '#a87050', '#d8a882'][i % 3];
  let g = p14(x, y, s, f, 0, t, { skirt: sk, pal: { top, pants: sk, skin, hair: '#2a1a12' }, walk: o.walk, h: { lookUp: o.lookUp || 0, aB: o.basket ? [-.05, -1.2] : undefined } });
  const [hx, hy] = HP.head, d = HP.eye[0] > hx ? 1 : -1, sc = ['#d8c8a8', '#a8584a', '#5a6a8a'][i % 3];
  g += `<path d="M${b1(hx - d * 24 * s)},${b1(hy + 26 * s)} Q${b1(hx - d * 30 * s)},${b1(hy - 34 * s)} ${b1(hx + d * 4 * s)},${b1(hy - 30 * s)} Q${b1(hx + d * 24 * s)},${b1(hy - 26 * s)} ${b1(hx + d * 20 * s)},${b1(hy - 8 * s)} Q${b1(hx + d * 4 * s)},${b1(hy - 16 * s)} ${b1(hx - d * 6 * s)},${b1(hy - 6 * s)} Q${b1(hx - d * 10 * s)},${b1(hy + 14 * s)} ${b1(hx - d * 6 * s)},${b1(hy + 30 * s)}Z" fill="${sc}"/>`;
  if (o.basket) { const [bx, by] = HP.handB; g += `<path d="M${b1(bx - 26 * s)},${b1(by - 10 * s)} L${b1(bx + 26 * s)},${b1(by - 10 * s)} L${b1(bx + 20 * s)},${b1(by + 30 * s)} L${b1(bx - 20 * s)},${b1(by + 30 * s)}Z" fill="#a8803e"/>` +
    [0, 1, 2].map(k => `<path d="M${b1(bx - 24 * s)},${b1(by + (k * 12 - 2) * s)} h${b1(48 * s)}" stroke="#6a4a1e" stroke-width="${b1(2 * s)}"/>`).join('') + `<ellipse cx="${b1(bx - 6 * s)}" cy="${b1(by - 12 * s)}" rx="${b1(10 * s)}" ry="${b1(6 * s)}" fill="#c83a2a"/><ellipse cx="${b1(bx + 8 * s)}" cy="${b1(by - 13 * s)}" rx="${b1(9 * s)}" ry="${b1(6 * s)}" fill="#e8a83a"/>`; }
  return g;
}
const BKROBE = ['#5a2e3a', '#2e4a6a', '#6a5a2a', '#e8e0cc'];
// one person of an era: k knight, r robe, s spearman, a archer, h hunter, f farmer, w woman, b man of 1914, l lady of 1914, g man of 1939, m today
function bkEra(kind, x, y, s, f, t, i, o = {}) {
  switch (kind) {
    case 'k': return knight(x, y, s, f, t, { col: ['#7a1e22', '#1e3a6a', '#2a5a2a'][i % 3], walk: o.walk, shield: o.shield });
    case 'r': return robeP(x, y, s, f, t, { col: BKROBE[i % 4], h: { walk: o.walk ?? null, lookUp: o.lookUp || 0 } });
    case 's': return spearman(x, y, s, f, t, i, { walk: o.walk });
    case 'a': return archer(x, y, s, f, t, { draw: 0, loose: 1 });
    case 'h': return bkHunter(x, y, s, f, t, i, o);
    case 'f': return bkFarmer(x, y, s, f, t, i, o);
    case 'w': return bkWoman(x, y, s, f, t, i, o);
    case 'b': return p14(x, y, s, f, i, t, { hat: 'bowler', stache: '#2a1a10', walk: o.walk });
    case 'l': return p14(x, y, s, f, i + 2, t, { hat: 'lady', hatC: ['#5a2a3a', '#2a3a5a'][i % 2], skirt: ['#3a2a3a', '#2a2e3a'][i % 2], walk: o.walk });
    case 'g': return p39(x, y, s, f, i + 1, t, { hat: 'fed', walk: o.walk });
    default: return hero(x, y, Object.assign({ s, face: f, shade: 1, walk: o.walk ?? null, lookUp: o.lookUp || 0 }, gp(i)));
  }
}
// someone arriving: a soft gold flash and sparkles, then the person
function bkPop(svg, x, y, s, a, t, seed) {
  if (a <= 0) return ''; const fl = Math.sin(Math.min(1, a) * Math.PI);
  return (fl > .02 ? `<ellipse cx="${b1(x)}" cy="${b1(y - 165 * s)}" rx="${b1(110 * s)}" ry="${b1(230 * s)}" fill="url(#bkPopG)" opacity="${b1(fl * .9)}"/>` + sparkles(x, y - 170 * s, 180 * s, 330 * s, 10, t, fl, seed) : '') +
    (a >= 1 ? svg : `<g opacity="${b1(clamp(a * 1.6))}">${svg}</g>`);
}
const bkSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
// a car whose wheels turn (dist = distance travelled in px)
function bkCar(x, y, s, col, face, dist, lights = 0) {
  const a = dist / (20 * s) * 57.3 * face; let w = '';
  [-72, 76].forEach(cx => { w += `<g transform="rotate(${b1(a)},${cx},-18)">` + [0, 1, 2, 3, 4].map(k => { const q = k / 5 * 6.2832; return `<circle cx="${b1(cx + Math.cos(q) * 6)}" cy="${b1(-18 + Math.sin(q) * 6)}" r="1.8" fill="#4a4a50"/>`; }).join('') + `<path d="M${cx - 9},-18 h18" stroke="#6a6a70" stroke-width="2"/></g>`; });
  return car(x, y, s, col, face, lights).replace(/<\/g>$/, w + '</g>');
}
// ---------- 0: hook: the street suddenly fills with people from every age ----------
const BKH = [['k', 110, 1096, .84, 1], ['h', 250, 1050, .74, -1], ['l', 350, 1098, .84, 1], ['r', 480, 1046, .74, -1], ['s', 590, 1100, .84, -1], ['g', 660, 1044, .72, -1], ['f', 30, 1046, .72, 1], ['w', 190, 1100, .84, 1], ['a', 400, 1036, .7, -1]];
function sceneHook(t) {
  const L = [];
  BKH.forEach(([k, x, y, sc, f], j) => { const tA = -.4 + j * .3, a = ramp(t, tA, tA + .4);
    L.push([y, bkPop(bkEra(k, x, y, sc, f, t, j, { lookUp: .06 * Math.sin(t * 1.5 + j) }), x, y, sc, a, t, 300 + j)]); });
  // two people of today walk, stop and stare
  [[-40, 1074, 1, 2, .78, .4], [780, 1070, -1, 5, .76, 2.1]].forEach(([x0, y, f, pi, sc, ph], j) => { const stop = 1.1 + j * .3, T = Math.min(t, stop), x = x0 + f * 46 * T, w = t < stop;
    L.push([y + .5, hero(x, y, Object.assign({ s: sc, face: w ? f : -f, shade: 1, walk: w ? T * 4.2 + ph : null, lookUp: w ? 0 : .1, hF: !w ? [x - f * 4 * sc, y - 292 * sc] : undefined }, gp(pi))) + bkQ(x + 2, y - 380 * sc, ease(ramp(t, stop + .3, stop + .7)), 1.1)]); });
  let s = `<defs>${BKDEFS()}</defs>` + bkStreet(t, { id: 'k0', top: bkSort(L) });
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: about 117 billion were ever born; 8.2 billion live today ----------
const BKG = (() => { const r = RS(831), o = []; CITY.forEach(([la, lo]) => { for (let k = 0; k < 4; k++) o.push([la + (r() - .5) * 9, lo + (r() - .5) * 12, r() * .9]); }); return o; })();
const BKOVD = `<radialGradient id="bkDotG"><stop offset="0" stop-color="#fff2c0" stop-opacity=".95"/><stop offset=".35" stop-color="#f4c76b" stop-opacity=".45"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<linearGradient id="bkBarG" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f4c76b"/><stop offset="1" stop-color="#c8902a"/></linearGradient>
<linearGradient id="bkBarB" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#8ad0ff"/><stop offset="1" stop-color="#3a8ad8"/></linearGradient>`;
function sceneCount(t) {
  const st = S0(1) - .2, G = glE(t, { d: 9.4, el: .32, lon: -30 + (t - st) * 7, clouds: .4, lights: .55, tg: [0, -.32, 0] });
  const n = 117 * ease(ramp(t, WS(1, 3), WS(1, 8) + .3)), al = ease(ramp(t, WS(1, 10) - .1, WS(1, 12) + .2)), pa = ease(ramp(t, st + .3, st + .8));
  let ov = `<defs>${BKOVD}</defs>`;
  BKG.forEach(([la, lo, th], i) => { const v = G.vis(la, lo); if (v < .12 || n / 117 < th) return; const [x, y] = G.P(la, lo, 1.01), a = clamp((n / 117 - th) * 6) * clamp((v - .12) / .2);
    ov += `<circle cx="${b1(x)}" cy="${b1(y)}" r="${b1(9 + 3 * Math.sin(t * 3 + i))}" fill="url(#bkDotG)" opacity="${b1(a)}"/>`; });
  const W = 540, X1 = 630;
  ov += `<g opacity="${b1(pa)}">${panel(50, 930, 620, 270)}${BL(360, 982, 'وُلِدوا عبرَ التاريخ', 1, '#fff', 28)}${BL(360, 1040, AR(Math.round(n)) + ' مليار', 1, '#f4c76b', 52)}` +
    `<rect x="${X1 - W}" y="1058" width="${W}" height="18" rx="9" fill="#fff" opacity=".12"/><rect x="${b1(X1 - W * n / 117)}" y="1058" width="${b1(W * n / 117)}" height="18" rx="9" fill="url(#bkBarG)"/>` +
    `<g opacity="${b1(al)}">${BL(360, 1126, 'أحياءٌ اليوم: ٨٫٢ مليار', 1, '#9ad8ff', 32)}<rect x="${X1 - W}" y="1146" width="${W}" height="18" rx="9" fill="#fff" opacity=".12"/><rect x="${b1(X1 - W * 8.2 / 117 * al)}" y="1146" width="${b1(W * 8.2 / 117 * al)}" height="18" rx="9" fill="url(#bkBarB)"/></g></g>`;
  F.ov = ov; return space(t);
}
// ---------- 2: about 109 billion return: some 13 for every one of us ----------
function bkRoom(t, id) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#bkWall)"/>` + Array.from({ length: 16 }, (_, i) => `<rect x="${i * 48 - 10}" y="-20" width="22" height="940" fill="#fff" opacity=".05"/>`).join('') + `<rect x="-20" y="-20" width="760" height="960" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  s += `<g transform="translate(-40,0)"><rect x="40" y="420" width="250" height="330" rx="6" fill="#7a5a3a"/><rect x="54" y="434" width="222" height="302" fill="#b8daf2"/><path d="M54,640 Q120,600 180,630 T276,610 V736 H54Z" fill="#8aa87a" opacity=".7"/><rect x="54" y="434" width="222" height="302" fill="#fff4d0" opacity=".3"/><path d="M165,434 v302 M54,585 h222" stroke="#7a5a3a" stroke-width="8"/>` +
    `<path d="M22,410 Q90,560 36,770 L10,770 L10,410Z M308,410 Q240,560 294,770 L320,770 L320,410Z" fill="#6a7a4a"/><path d="M22,410 Q90,560 36,770" stroke="#000" stroke-width="6" opacity=".15" fill="none"/></g>`;
  s += `<g transform="translate(50,0)"><rect x="430" y="460" width="190" height="140" rx="4" fill="#5a3a22"/><rect x="442" y="472" width="166" height="116" fill="#c8b48a"/><path d="M442,560 L500,510 L540,545 L575,515 L608,560 V588 H442Z" fill="#6a8a5a"/><circle cx="580" cy="500" r="12" fill="#f4e0a0"/></g>`;
  s += `<rect x="-20" y="900" width="760" height="400" fill="url(#bkFloor)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M-20,${910 + i * i * 6} H740" stroke="#000" stroke-width="2" opacity=".18"/>`).join('') + `<rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="888" width="760" height="16" fill="#e8dcc4"/><rect x="-20" y="900" width="760" height="30" fill="url(#aoDn)" opacity=".5"/>`;
  s += `<path d="M0,${600} L250,${600} L660,1300 L-20,1300Z" fill="url(#bkBeam)" opacity=".5"/>`;
  return s;
}
const BKR = (() => { const K = ['k', 'h', 'l', 'r', 'f', 'g', 's', 'w', 'b', 'h', 'r', 'k', 'w']; const o = [];
  [70, 168, 264, 360, 456, 552, 650].forEach((x, i) => o.push([K[i], x, 1000, .7, x < 360 ? 1 : -1]));
  [74, 186, 292, 428, 534, 646].forEach((x, i) => o.push([K[7 + i], x, 1112, .78, x < 360 ? 1 : -1]));
  return o; })();
const BKRO = [6, 2, 9, 0, 11, 4, 7, 1, 12, 3, 10, 5, 8];
function sceneRoom(t) {
  const st = S0(2) - .2, T = t - st, t0 = WS(2, 5) - .1, t1 = WS(2, 8) + .2, L = [];
  let cnt = 0;
  BKR.forEach(([k, x, y, sc, f], j) => { const tA = lerp(t0, t1, BKRO.indexOf(j) / 12), a = ramp(t, tA, tA + .35); if (a > .5) cnt++;
    L.push([y, bkPop(bkEra(k, x, y, sc, f, t, j, { lookUp: .05 * Math.sin(t * 1.3 + j) }), x, y, sc, a, t, 320 + j)]); });
  const yx = 1238, ys = .86, ring = ease(ramp(t, st + .3, st + .8));
  L.push([yx, `<ellipse cx="364" cy="${yx + 4}" rx="74" ry="14" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${b1(ring)}"/>` + hero(360, yx, Object.assign({ s: ys, face: 1, shade: 1, lookUp: .05, hF: cnt > 3 ? [360 + 8 * ys, yx - 300 * ys] : undefined }, gp(0)))]);
  let s = `<defs>${BKDEFS()}</defs>` + bkRoom(t) + bkSort(L) + BL(364, yx + 40, 'أنت', ring, '#f4c76b', 28);
  if (cnt > 0) s += BL(375, 570, AR(cnt), 1, '#f4c76b', 96) + BL(375, 630, 'لكلِّ واحدٍ منّا', b1(ease(ramp(t, WS(2, 9) - .2, WS(2, 9) + .3))), '#fff', 34);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: streets and homes in every city fill within minutes ----------
const BKC = (() => { const r = RS(877), K = ['k', 'h', 'l', 'r', 'f', 'g', 's', 'w', 'b', 'm', 'h', 'r', 'w', 'f', 'm', 'a'], o = [];
  [[1020, .54, 0], [1054, .58, 26], [1090, .62, 10]].forEach(([y, sc, off], row) => { for (let x = -10 + off; x < 740; x += 52 + r() * 14) o.push([K[Math.floor(r() * K.length)], x, y + (r() - .5) * 6, sc, r() < .5 ? 1 : -1, r(), o.length]); });
  return o; })();
function sceneCrowd(t) {
  const st = S0(3) - .2, L = [];
  BKC.forEach(([k, x, y, sc, f, rr, j]) => { const tA = st + .1 + rr * 2.6, a = ramp(t, tA, tA + .35);
    L.push([y, bkPop(bkEra(k, x, y, sc, f, t, j, { lookUp: .06 * Math.sin(t * 1.7 + j) }), x, y, sc, a, t, 400 + j)]); });
  let top = bkSort(L);
  // the traffic has stopped
  [[110, 1182, '#c8402a', -1], [400, 1182, '#3a6a9a', -1], [690, 1182, '#e8c84a', -1], [30, 1264, '#4a8a5a', 1], [320, 1264, '#e8e4dc', 1], [610, 1264, '#6a4a8a', 1]].forEach(([x, y, c, f]) => { top += bkCar(x, y, .82, c, f, 0) + `<rect x="${f > 0 ? x + 92 : x - 100}" y="${y - 44}" width="8" height="7" rx="2" fill="#ff3a2a" opacity="${b1(.6 + .4 * Math.sin(t * 6 + x))}"/>`; });
  let s = `<defs>${BKDEFS()}</defs>` + bkStreet(t + 30, { id: 'k3', top });
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: the world's food is grown for about 8 billion: the shelves empty fast ----------
function sceneFood(t) {
  const st = S0(4) - .2, T = t - st, FL = 944, k = ease(ramp(t, WS(4, 7) - .3, S0(5) - .1));
  let s = `<defs>${BKDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#b8b0a0"/><rect x="-20" y="280" width="760" height="120" fill="#8e877a"/>`;
  for (let i = 0; i < 3; i++) s += `<rect x="${70 + i * 220}" y="330" width="140" height="16" rx="3" fill="#d2d0c8"/><rect x="${70 + i * 220}" y="342" width="140" height="5" fill="#000" opacity=".3"/>`;
  s += shelfE(k) + `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#b4ab98"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${i * 110 - 40},${FL} L${i * 150 - 200},1300" stroke="#8a8270" stroke-width="2" opacity=".5"/>`).join('') + `<rect x="-20" y="${FL}" width="760" height="356" fill="#000" filter="url(#grainR)" opacity=".15"/><rect x="-20" y="${FL}" width="760" height="40" fill="url(#aoDn)" opacity=".5"/>`;
  // shoppers of every age reach for what is left
  const P = [['k', 110, 1210, .78, 1], ['m', 250, 1236, .8, -1], ['h', 380, 1214, .78, 1], ['l', 500, 1238, .8, -1], ['r', 625, 1212, .78, -1]], L = [];
  P.forEach(([kd, x, y, sc, f], j) => { const reach = .5 + .5 * Math.sin(T * 2.6 + j * 1.7), hy = lerp(y - 300 * sc, 900 - (j % 2) * 90, reach * (1 - k * .5));
    let o = { lookUp: .25 };
    let g = kd === 'm' ? hero(x, y, Object.assign({ s: sc, face: f, shade: 1, lookUp: .2, hF: [x + f * 30, hy] }, gp(3))) : kd === 'h' ? bkHunter(x, y, sc, f, t, 1, { spear: 0, lookUp: .2 }) : bkEra(kd, x, y, sc, f, t, j, o);
    L.push([y, g]); });
  s += bkSort(L);
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: many lived before writing, and speak languages long gone ----------
const bkHier = (x, y, sc) => `<g transform="translate(${x},${y}) scale(${sc})" fill="#3a2a5a"><path d="M0,0 q8,-14 18,-8 l8,-6 l-2,8 q6,10 -8,14 l2,10 h-4 l-2,-9 q-10,0 -12,-9Z"/><path d="M34,-6 q10,-10 20,0 q-10,10 -20,0Z M44,-6 m-3,0 a3,3 0 1 0 6,0 a3,3 0 1 0 -6,0" fill-rule="evenodd"/><path d="M62,-12 q4,4 0,8 q-4,4 0,8 q4,4 0,8 M70,-12 q4,4 0,8 q-4,4 0,8 q4,4 0,8" stroke="#3a2a5a" stroke-width="2.4" fill="none"/><path d="M80,10 v-24 q6,4 0,10" stroke="#3a2a5a" stroke-width="2.4" fill="none"/></g>`;
const bkRune = (x, y, sc) => `<g transform="translate(${x},${y}) scale(${sc})" stroke="#4a2e18" stroke-width="3" fill="none" stroke-linecap="round"><path d="M0,-12 v24 M0,-12 l10,8 M0,0 l10,-6"/><path d="M22,12 l8,-24 l8,24 M25,4 h10"/><path d="M50,-12 v24 l10,-12 l10,12 v-24"/><path d="M82,-12 l12,24 M94,-12 l-12,24"/></g>`;
function bkBubble(x, y, w, h, tail, inner, a) {
  if (a <= 0) return ''; const k = .7 + .3 * Math.min(1, a * 1.5);
  return `<g opacity="${b1(clamp(a * 1.5))}" transform="translate(${x},${y}) scale(${b1(k)}) translate(${-x},${-y})"><g filter="url(#blur2)" opacity=".25" transform="translate(4,6)"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#000"/></g><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="#fbf6ea"/><path d="M${x + tail[0]},${y + h / 2 - 4} l${tail[1]},${tail[2]} l${tail[3]},${-tail[2] - 2}Z" fill="#fbf6ea"/>${inner}</g>`;
}
function sceneLang(t) {
  const st = S0(5) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), wr = ease(ramp(t, WS(5, 4) - .2, WS(5, 5) + .1)), b = [WS(5, 6), WS(5, 7) + .1, WS(5, 8) + .2, WS(5, 10)].map(w => ease(ramp(t, w - .15, w + .25)));
  let s = `<defs>${BKDEFS()}</defs><rect x="-20" y="-20" width="760" height="1100" fill="url(#bkMus)"/><rect x="-20" y="-20" width="760" height="1100" fill="#000" filter="url(#grainR)" opacity=".14"/>`;
  // columns and a stone frieze of old picture-signs
  [[60, 1], [660, 1]].forEach(([x]) => { s += `<rect x="${x - 34}" y="260" width="68" height="820" fill="#c8b898"/><rect x="${x - 34}" y="260" width="22" height="820" fill="#000" opacity=".14"/><rect x="${x + 16}" y="260" width="18" height="820" fill="#fff" opacity=".12"/><rect x="${x - 46}" y="246" width="92" height="24" fill="#d8c8a8"/><rect x="${x - 46}" y="1060" width="92" height="24" fill="#a8987a"/>`; });
  s += `<rect x="130" y="410" width="460" height="120" rx="4" fill="#cdbb94"/><rect x="130" y="410" width="460" height="120" fill="#000" filter="url(#grainR)" opacity=".22"/>` + bkHier(160, 454, 1.1) + bkHier(290, 454, 1.1) + bkHier(420, 454, 1.1) + `<path d="M140,480 H580" stroke="#8a7a5a" stroke-width="2"/>` + bkHier(180, 510, 1) + bkHier(320, 510, 1) + bkHier(450, 510, 1);
  for (let i = 0; i < 3; i++) s += `<ellipse cx="${200 + i * 160}" cy="300" rx="90" ry="160" fill="url(#bkSpot)" opacity=".7"/>`;
  s += `<rect x="-20" y="1080" width="760" height="220" fill="url(#bkMarb)"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M${i * 130 - 40},1080 L${i * 170 - 160},1300" stroke="#6a6250" stroke-width="2" opacity=".5"/>`).join('') + `<rect x="-20" y="1080" width="760" height="220" fill="#000" filter="url(#grainR)" opacity=".16"/><rect x="-20" y="1080" width="760" height="30" fill="url(#aoDn)" opacity=".6"/>`;
  // the glass case with a clay tablet
  s += `<rect x="290" y="900" width="150" height="200" fill="#4a3a2a"/><rect x="290" y="900" width="150" height="10" fill="#6a5a44"/><rect x="300" y="740" width="130" height="160" fill="url(#bkGlass)" stroke="#d8e4ea" stroke-width="2" opacity=".9"/>` +
    `<g transform="translate(365,830) rotate(-6)"><rect x="-38" y="-50" width="76" height="98" rx="12" fill="url(#bkClay)"/><rect x="-38" y="-50" width="76" height="98" rx="12" fill="#000" filter="url(#grainR)" opacity=".22"/>` + (() => { const r = RS(883); let g = ''; for (let i = 0; i < 8; i++) for (let j = 0; j < 6; j++) if (r() < .78) g += `<path d="M${-28 + j * 11},${-40 + i * 11} l6,0 l-3,4Z M${-25 + j * 11},${-36 + i * 11} v5" fill="#6a3e22" stroke="#6a3e22" stroke-width="1"/>`; return g; })() + `</g>` +
    `<path d="M300,740 L330,740 L304,860Z" fill="#fff" opacity=".14"/>`;
  // returning people talk; a museum guide does not understand
  const L = [[1150, bkHunter(110, 1150, .86, 1, t, 0, { lookUp: .05 })], [1176, robeP(220, 1176, .9, 1, t, { col: '#6a3a2a', h: { aF: [.6, -.9 + .2 * Math.sin(T * 5)] } })], [1146, bkWoman(500, 1146, .84, -1, t, 1, {})],
    [1180, hero(620, 1180, Object.assign({ s: .9, face: -1, shade: 1, hF: [620 - 8 * .9, 1180 - 300 * .9] }, { top: '#2a3a5a', pants: '#2a2c34', skin: '#c89a74', hair: '#3a2a1c' }))]];
  s += `<g opacity="${b1(a)}">` + bkSort(L) + `</g>`;
  s += bkBubble(250, 650, 210, 90, [-30, -20, 40, 0], (() => { const r = RS(884); let g = ''; for (let i = 0; i < 3; i++) for (let j = 0; j < 7; j++) if (r() < .85) g += wedge(172 + j * 24, 632 + i * 20, .9, (r() - .5) * 60); return g; })(), b[0]) +
    bkBubble(470, 700, 230, 84, [20, 30, 24, 0], bkHier(378, 704, 1.15) + `<g opacity=".8">${bkHier(470, 704, .6)}</g>`, b[1]) +
    bkBubble(150, 840, 190, 74, [-20, 36, 22, 0], bkRune(88, 840, .75) + `<g transform="translate(56,0)">${bkRune(88, 840, .5)}</g>`, b[2]) +
    bkBubble(600, 820, 110, 96, [10, 36, 20, 0], bkQ(600, 846, 1, 1.25), b[3]);
  if (wr > 0) s += `<g opacity="${b1(wr)}">${panel(120, 1200, 480, 64)}${BL(360, 1242, 'الكتابةُ عمرُها نحوُ ٥٢٠٠ سنة فقط', 1, '#f4c76b', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: most were farmers or hunters who never saw a car or an electric lamp ----------
function sceneFarm(t) {
  const st = S0(6) - .2, T = t - st, cx = lerp(-300, 1040, ramp(t, WS(6, 4), WS(6, 11) + .4)), cd = (cx + 260), lamp = ease(ramp(t, WS(6, 9) - .1, WS(6, 9) + .4));
  const HZ = 760, RD = 1180;
  let s = `<defs>${BKDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 40}" fill="url(#bkFarmSky)"/>` + sun3(130, 560, .8) + cumulus(360 + T * 3, 500, 260, 31, { a: .7 }) + cumulus(600 + T * 2, 600, 180, 33, { a: .55 });
  s += mountainsR(HZ, 120, 41, { rock: '#7a8494' }) + `<rect x="-20" y="${HZ - 20}" width="760" height="40" fill="#c8d4dc" opacity=".25"/>` + forestR(HZ + 6, 26, 30, 60, 43, '#3a5a34');
  s += wheatField(t, HZ + 10, .85, 47);
  // a dirt track along the field and a modern road in front
  s += `<rect x="-20" y="1070" width="760" height="${RD - 1070 + 20}" fill="#a88a5e"/><rect x="-20" y="1070" width="760" height="${RD - 1050}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1068" width="760" height="10" fill="#6a5a2e" opacity=".5"/>`;
  s += `<rect x="-20" y="${RD}" width="760" height="${1300 - RD}" fill="url(#bkRoad)"/><rect x="-20" y="${RD}" width="760" height="120" fill="#000" filter="url(#grainR)" opacity=".4"/><rect x="-20" y="${RD}" width="760" height="6" fill="#d8d2c0"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 140 - 20}" y="1244" width="70" height="6" fill="#e8e4d8" opacity=".8"/>`).join('');
  // the street lamp lights up
  s += lampD(560, RD + 4, 600).replace('#f4ead0', lamp > .5 ? '#fffbe8' : '#d8d4c8') + (lamp > 0 ? `<circle cx="625" cy="${RD + 4 - 602}" r="${b1(190 * lamp)}" fill="url(#bkLampG)" opacity="${b1(lamp)}"/><circle cx="625" cy="${RD + 4 - 602}" r="${b1(60 * lamp)}" fill="url(#bkLampG)" opacity="${b1(lamp)}"/>` : '');
  const lk = cx > 100 && cx < 900, Lp = [['f', 110, 1140, 1, 1], ['w', 290, 1122, .94, 1], ['h', 450, 1150, 1, -1]], L = [];
  Lp.forEach(([k, x, y, sc, f], j) => { const fc = cx > -100 && cx < 980 ? (cx > x ? 1 : -1) : f, la = lamp > .3 ? .4 : 0;
    L.push([y, bkEra(k, x, y, sc, fc, t, j, { lookUp: la, basket: k === 'w' ? 1 : 0 })]); });
  s += bkSort(L) + bkQ(110, 1140 - 370, ease(ramp(t, WS(6, 7), WS(6, 7) + .4)), 1.2) + bkQ(450, 1150 - 360, ease(ramp(t, WS(6, 7) + .2, WS(6, 7) + .6)), 1.2) + bkQ(290, 1122 - 360, ease(ramp(t, WS(6, 10), WS(6, 10) + .4)), 1.2);
  s += bkCar(cx, 1272, 1.9, '#c8382e', 1, cd);
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: the twist: shoulder to shoulder, all 117 billion fit in a place the size of Belgium ----------
const BKHEADS = (() => { const r = RS(889), C = ['#2e4a6e', '#8a3a2e', '#4e6a3a', '#6a5a7a', '#c89a3a', '#3a6a6a', '#7a4a5a', '#d8d0c0', '#5a4630'], H = ['#2a1d16', '#17110d', '#5a3a22', '#1d1612', '#8a8a8a', '#3a2a1c'], SK = ['#c89a74', '#8d5a3b', '#e0b48a', '#a46a46']; let g = '';
  const one = (x, y, c, h, sk, rot) => `<g transform="translate(${x},${y}) rotate(${rot})"><ellipse cx="2" cy="5" rx="45" ry="25" fill="#000" opacity=".25"/><path d="M-42,2 Q-44,-22 -22,-24 L22,-24 Q44,-22 42,2 Q40,22 22,22 L-22,22 Q-40,22 -42,2Z" fill="${c}"/><path d="M-42,2 Q-40,22 -22,22 L22,22 Q40,22 42,2" fill="#000" opacity=".2"/>` +
    `<ellipse cx="-38" cy="6" rx="9" ry="13" fill="${mix(c, '#000000', .25)}"/><ellipse cx="38" cy="6" rx="9" ry="13" fill="${mix(c, '#000000', .25)}"/><ellipse cx="0" cy="13" rx="9" ry="6" fill="${sk}"/><ellipse cx="0" cy="-1" rx="17" ry="19" fill="${h}"/><ellipse cx="-5" cy="-7" rx="7" ry="5" fill="#fff" opacity=".14"/></g>`;
  for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) { const x = i * 100 + (j % 2) * 50, y = j * 80 + 40, q = [C[Math.floor(r() * C.length)], H[Math.floor(r() * H.length)], SK[Math.floor(r() * SK.length)], Math.round((r() - .5) * 30)];
    g += one(x, y, ...q); if (x < 60) g += one(x + 400, y, ...q); if (j === 0) g += one(x, y + 320, ...q); if (j === 0 && x < 60) g += one(x + 400, y + 320, ...q); }
  return g; })();
function sceneFit(t) {
  const st = S0(7) - .2, z = ease(ramp(t, WS(7, 4) - .2, WS(7, 7) + .2)), pf = 1 - ease(ramp(t, WS(7, 7) - .1, WS(7, 7) + .5)), zi = ease(ramp(t, WS(7, 7) - .3, WS(7, 10) + .1)), sq = ease(ramp(t, WS(7, 9) - .1, WS(7, 10) + .2)), lb = ease(ramp(t, WS(7, 11) - .2, WS(7, 11) + .3));
  const G = glE(t, { d: lerp(8.6, 3.2, zi), el: lerp(.62, .86, zi), lon: lerp(18, 6.5, zi), clouds: lerp(.4, .15, zi), lights: .3, tg: [0, lerp(-.2, 0, zi), 0], off: -.2, up: .7 });
  let ov = `<defs>${BKOVD}<pattern id="bkHeadP" width="400" height="320" patternUnits="userSpaceOnUse" patternTransform="translate(360,720) scale(${b1(lerp(.9, .26, z) * 100) / 100})">${BKHEADS}</pattern><clipPath id="bkSqC"><rect x="120" y="470" width="480" height="480" rx="10"/></clipPath></defs>`;
  if (pf > 0) ov += `<g opacity="${b1(pf * ease(ramp(t, st, st + .4)))}"><rect x="108" y="458" width="504" height="504" rx="16" fill="#0a0e1c" opacity=".9"/><g clip-path="url(#bkSqC)"><rect x="120" y="470" width="480" height="480" fill="#4a4a48"/><rect x="120" y="470" width="480" height="480" fill="url(#bkHeadP)"/></g><rect x="120" y="470" width="480" height="480" rx="10" fill="none" stroke="#f4c76b" stroke-width="4"/>` +
    BL(360, 1010, 'كتفاً إلى كتف', 1, '#f4c76b', 40) + BL(360, 1058, 'نحوَ رُبعِ مترٍ مربّعٍ لكلِّ إنسان', 1, '#fff', 28) + `</g>`;
  if (sq > 0) { const la0 = 50.5, lo0 = 4.5, dl = .77, dn = 1.2, c = [[la0 + dl, lo0 - dn], [la0 + dl, lo0 + dn], [la0 - dl, lo0 + dn], [la0 - dl, lo0 - dn]].map(([a, o]) => G.P(a, o, 1.003)), [mx, my] = G.P(la0, lo0, 1.003), pu = 1 + .1 * Math.sin(t * 5);
    const d = 'M' + c.map(p => b1(p[0]) + ',' + b1(p[1])).join(' L') + 'Z';
    ov += `<g opacity="${b1(sq)}"><circle cx="${b1(mx)}" cy="${b1(my)}" r="${b1(90 * pu)}" fill="url(#bkDotG)" opacity=".55"/><path d="${d}" fill="#f4c76b" opacity=".55"/><path d="${d}" fill="none" stroke="#fff2c0" stroke-width="3"/>` +
      `<path d="M${b1(mx)},${b1(my + 30)} L360,${b1(Math.max(my + 90, 900))}" stroke="#f4c76b" stroke-width="3" opacity="${b1(lb)}"/></g>`;
    if (lb > 0) ov += `<g opacity="${b1(lb)}">${panel(90, Math.max(my + 90, 900), 540, 130)}${BL(360, Math.max(my + 90, 900) + 52, 'كلُّ البشرِ الذين عاشوا يوماً', 1, '#fff', 28)}${BL(360, Math.max(my + 90, 900) + 100, 'نحوَ ٢٩ ألف كم² ≈ مساحةُ بلجيكا', 1, '#f4c76b', 30)}</g>`; }
  F.ov = ov; return space(t);
}
// ---------- 8: the problem is not room, but food, water and work ----------
function bkIcon(x, y, kind, a, t) {
  if (a <= 0) return ''; const k = .75 + .25 * Math.min(1, a * 1.5), R = 92;
  let g = `<circle cx="0" cy="6" r="${R}" fill="#000" opacity=".3"/><circle cx="0" cy="0" r="${R}" fill="url(#bkInset)"/><circle cx="0" cy="0" r="${R}" fill="none" stroke="#f4c76b" stroke-width="4"/>`;
  if (kind === 0) g += `<path d="M-60,30 Q-62,-20 -20,-30 Q30,-40 58,-10 Q70,20 50,34Z" fill="url(#bkBread)"/><path d="M-30,-22 q8,14 4,30 M-4,-28 q8,14 4,32 M22,-26 q8,14 4,30" stroke="#8a4e1e" stroke-width="5" fill="none" opacity=".6"/><path d="M-60,30 Q0,44 50,34" stroke="#5a3010" stroke-width="3" fill="none" opacity=".5"/>` +
    [-1, 1].map(d => `<path d="M${d * 62},40 q${d * 6},-50 ${d * 2},-86" stroke="#c8a04a" stroke-width="3" fill="none"/>` + [0, 1, 2, 3].map(i => `<ellipse cx="${d * (64 + (i % 2 ? 6 : -4))}" cy="${-40 - i * 12}" rx="4" ry="9" fill="#e0b85a" transform="rotate(${d * (i % 2 ? 25 : -25)},${d * (64 + (i % 2 ? 6 : -4))},${-40 - i * 12})"/>`).join('')).join('');
  if (kind === 1) { const dy = pmod(t * .9, 1); g += `<path d="M-40,-60 h56 q22,0 22,22 v8 h-16 v-6 q0,-8 -8,-8 h-54Z" fill="#b8c0c8"/><rect x="-50" y="-66" width="14" height="30" rx="3" fill="#8a9298"/><rect x="2" y="-76" width="14" height="14" rx="3" fill="#c83a2a"/>` +
    `<path d="M30,${b1(-10 + dy * 60)} q-12,18 0,24 q12,-6 0,-24Z" fill="url(#bkDrop)" opacity="${b1(1 - dy)}"/><path d="M-50,68 h100" stroke="#4aa8e8" stroke-width="4" opacity=".5"/><path d="M-30,60 q30,-10 60,0" stroke="#4aa8e8" stroke-width="3" fill="none" opacity=".4"/>`; }
  if (kind === 2) g += `<g transform="rotate(${b1(t * 30)})">` + Array.from({ length: 10 }, (_, i) => `<rect x="-9" y="-62" width="18" height="20" rx="3" fill="#a8a08a" transform="rotate(${i * 36})"/>`).join('') + `<circle r="46" fill="#a8a08a"/><circle r="18" fill="#2a3450"/></g>` +
    `<g transform="rotate(-35)"><rect x="-6" y="-10" width="12" height="90" rx="4" fill="#8a5a32"/><rect x="-34" y="-30" width="68" height="24" rx="5" fill="#6a6e76"/><rect x="-34" y="-30" width="68" height="8" rx="4" fill="#fff" opacity=".25"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${b1(k)})" opacity="${b1(clamp(a * 1.5))}">${g}</g>`;
}
function sceneNeed(t) {
  const st = S0(8) - .2, T = t - st, ok = ease(ramp(t, WS(8, 1), WS(8, 2) + .2)) * (1 - ease(ramp(t, WS(8, 3) - .1, WS(8, 3) + .3))), ic = [WS(8, 4), WS(8, 5), WS(8, 6)].map(w => ease(ramp(t, w - .15, w + .25)));
  const L = [], K = ['r', 'm', 'h', 'l', 'k', 'w', 'f', 'g', 'm', 's', 'b'];
  K.forEach((k, j) => { const x = 20 + j * 68, y = j % 2 ? 1094 : 1050, sc = j % 2 ? .64 : .58; L.push([y, bkEra(k, x, y, sc, j % 3 ? -1 : 1, t, j + 2, { lookUp: .3 * Math.sin(T * 1.2 + j) * .4 + .1 })]); });
  let s = `<defs>${BKDEFS()}</defs>` + bkStreet(t + 60, { id: 'k8', N: .42, top: bkSort(L) });
  if (ok > 0) s += `<g opacity="${b1(ok)}">${panel(200, 520, 320, 130)}${BL(360, 600, 'المكانُ يكفي ✓', 1, '#7ae08a', 40)}</g>`;
  s += bkIcon(130, 590, 0, ic[0], t) + bkIcon(360, 590, 1, ic[1], t) + bkIcon(590, 590, 2, ic[2], t);
  [['الطعام', 130], ['الماء', 360], ['العمل', 590]].forEach(([tx, x], i) => { s += BL(x, 730, tx, b1(ic[i]), '#f4c76b', 34); });
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(9)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 9) - .3, WS(9, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneRoom }, { s: S0(3) - .2, f: sceneCrowd }, { s: S0(4) - .2, f: sceneFood },
  { s: S0(5) - .2, f: sceneLang }, { s: S0(6) - .2, f: sceneFarm }, { s: S0(7) - .2, f: sceneFit }, { s: S0(8) - .2, f: sceneNeed }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneRoom, sceneFood, sceneLang, sceneNeed]);
const XF = .5;
const TLI = [['١١٧ مليار', S0(1)], ['١٣ لكلٍّ منّا', S0(2)], ['المدن', S0(3)], ['الطعام', S0(4)], ['اللغات', S0(5)], ['المزارعون', S0(6)]];
const LIST_ON = new Set([sceneCrowd]);
const CHIPS = [
  ['c0', 'عادوا جميعاً', 360, 330, 'red big', WS(0, 4), S0(1) - .3],
  ['c2', '١٠٩ ملياراتٍ يعودون', 360, 330, 'big', WS(2, 4), S0(3) - .3],
  ['c3', 'الشوارعُ ممتلئة', 360, 330, 'big', WS(3, 1), S0(4) - .3],
  ['c4', 'طعامٌ لـ٨ ملياراتٍ فقط', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c5', 'لغاتٌ منقرضة', 360, 330, 'big', WS(5, 7), S0(6) - .3],
  ['c6', 'مزارعون وصيّادون', 360, 330, 'big', WS(6, 2), S0(7) - .3],
  ['c7', 'المفاجأة', 360, 330, 'red big', WS(7, 0), S0(8) - .3],
  ['c8', 'الطعامُ والماءُ والعمل', 360, 330, 'big', WS(8, 4), S0(9) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لو عادوا جميعاً</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
