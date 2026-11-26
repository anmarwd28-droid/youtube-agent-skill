// grav_a.js (#87): what if the Earth's gravity suddenly doubled for everyone at once? Built on the #86 chain (streetD, hero, glE, saturnV, jetOnGround, facade).
const g1 = v => (+v).toFixed(1);
const gvL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const GVD = `<radialGradient id="gvPop"><stop offset="0" stop-color="#fff4c8" stop-opacity=".8"/><stop offset=".45" stop-color="#f4c76b" stop-opacity=".3"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="gvRed"><stop offset="0" stop-color="#ff6a5a" stop-opacity=".75"/><stop offset=".5" stop-color="#e8382e" stop-opacity=".3"/><stop offset="1" stop-color="#c8281e" stop-opacity="0"/></radialGradient>
<radialGradient id="gvVig" cx=".5" cy=".5" r=".72"><stop offset=".25" stop-color="#05070c" stop-opacity="0"/><stop offset=".75" stop-color="#05070c" stop-opacity=".85"/><stop offset="1" stop-color="#05070c" stop-opacity="1"/></radialGradient>
<radialGradient id="gvIn" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#2a3450"/><stop offset="1" stop-color="#0e1222"/></radialGradient>
<linearGradient id="gvTile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4e8ea"/><stop offset="1" stop-color="#c4cacd"/></linearGradient>
<linearGradient id="gvFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a8a78"/><stop offset="1" stop-color="#6e604e"/></linearGradient>
<linearGradient id="gvStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdbb9a"/><stop offset="1" stop-color="#9a8466"/></linearGradient>
<linearGradient id="gvRiver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ab8"/><stop offset=".5" stop-color="#3e6e8e"/><stop offset="1" stop-color="#244a62"/></linearGradient>
<linearGradient id="gvSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e78bc"/><stop offset=".6" stop-color="#9cc4e6"/><stop offset="1" stop-color="#f2e2c8"/></linearGradient>
<linearGradient id="gvDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e2a56"/><stop offset=".55" stop-color="#6a5a8a"/><stop offset="1" stop-color="#f0a070"/></linearGradient>
<linearGradient id="gvRun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a6c70"/><stop offset="1" stop-color="#3e4044"/></linearGradient>
<linearGradient id="gvGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a9a4a"/><stop offset="1" stop-color="#4a6a2a"/></linearGradient>
<linearGradient id="gvSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8484a"/><stop offset="1" stop-color="#9a2a2c"/></linearGradient>
<linearGradient id="gvPot" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a4a2a"/><stop offset=".45" stop-color="#d0804a"/><stop offset="1" stop-color="#7a3a1e"/></linearGradient>
<linearGradient id="gvSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8ab0"/><stop offset="1" stop-color="#1e4a6a"/></linearGradient>
<linearGradient id="gvBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8902a"/><stop offset=".5" stop-color="#ffe08a"/><stop offset="1" stop-color="#c8902a"/></linearGradient>
<linearGradient id="gvBarR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8281e"/><stop offset=".5" stop-color="#ff7a5a"/><stop offset="1" stop-color="#a8281e"/></linearGradient>`;
const GVDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${HIDEF2}${CBDEF}${GVD}`;
const gvSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
function gvSubs(t, P, d = .35) {
  let i = 0; P.forEach((p, j) => { if (t >= p[0]) i = j; });
  const k = i > 0 ? ease(ramp(t, P[i][0], P[i][0] + d)) : 1;
  return k < 1 ? P[i - 1][1](t) + `<g opacity="${Math.round(k * 100) / 100}">${P[i][1](t)}</g>` : P[i][1](t);
}
function gvInset(x, y, inner, a, R = 100, id = 'i') {
  if (a <= 0) return ''; const k = .7 + .3 * Math.min(1, a * 1.3);
  return `<g opacity="${g1(Math.min(1, a))}" transform="translate(${x},${y}) scale(${Math.round(k * 100) / 100})"><defs><clipPath id="gvC${id}"><circle r="${R}"/></clipPath></defs><circle r="${R + 6}" fill="#0a0e1c" opacity=".55"/><g clip-path="url(#gvC${id})"><circle r="${R}" fill="url(#gvIn)"/>${inner}</g><circle r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
}
// a soft gold "gravity" chevron pointing down (or toward a centre)
const chev = (x, y, s, rot, a, col = '#f4c76b') => a <= 0 ? '' : `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(rot)}) scale(${s})" opacity="${g1(a)}"><path d="M-16,-8 L0,8 L16,-8" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
// a field of falling chevrons over the whole screen (gravity pulling down)
function downField(t, a, k = 1, seed = 5) { if (a <= 0) return ''; let s = ''; const r = RS(seed);
  for (let i = 0; i < 16; i++) { const x = 40 + r() * 640, sp = (90 + r() * 60) * (1 + k), ph = r(), y = 360 + pmod(ph * 900 + t * sp, 900), f = Math.sin(Math.PI * (y - 360) / 900);
    s += chev(x, y, .7 + .5 * k, 0, a * f * .4); }
  return s; }
// the "gravity x2" stamp
const x2Stamp = (x, y, a, sc = 1) => a <= 0 ? '' : `<g opacity="${g1(Math.min(1, a))}" transform="translate(${x},${y}) scale(${g1(sc * (.8 + .2 * Math.min(1, a)))})"><text x="0" y="0" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="120" fill="#f4c76b" style="paint-order:stroke" stroke="#1a1208" stroke-width="8">×٢</text></g>`;
// the house person bent under twice the weight (k 0..1); walking slowly when walk is given
function heavy(x, y, s, f, pal, k, o = {}) {
  const base = Object.assign({ s, face: f, shade: 1, lean: 16 * k + (o.lean0 || 0), lookUp: -.32 * k }, pal);
  if (o.walk != null) return hero(x, y, Object.assign(base, { walk: o.walk, amp: .6 - .28 * k }));
  // standing, knees a little bent, arms hanging heavy
  return hero(x, y, Object.assign(base, { lF: [.1 + .22 * k, .06 - .26 * k], lB: [-.1 + .18 * k, -.14 - .22 * k], aF: [.05 + .12 * k, .3 + .1 * k], aB: [-.05 + .1 * k, .25 + .1 * k] }, o.extra || {}));
}
// hands on the knees, bent over, catching the breath
function restP(x, y, s, f, pal, k = 1) {
  return hero(x, y, Object.assign({ s, face: f, shade: 1, lean: 40 * k, lookUp: -.1, lF: [.35 * k + .1, -.3 * k + .06], lB: [.2 * k - .1, -.42 * k - .14] }, pal, k > .3 ? { hF: [x + f * 52 * s, y - 92 * s], hB: [x + f * 40 * s, y - 96 * s] } : {}));
}
// ---------- a new street for this video ----------
const GVBLK = [[-12, 156, 470, '#a8927a', 871, 2], [144, 150, 420, '#c4a484', 872, 1], [294, 164, 520, '#6e7e8e', 873, 0], [458, 140, 450, '#9a7a6a', 874, 1], [598, 168, 400, '#b8b08a', 875, 2]];
const GVSHOP = [[-4, 140, 'مقهى', '#5a3a2a'], [152, 134, 'زهور', '#3a7a4a'], [302, 146, 'كتب', '#2a4a7a'], [462, 126, 'أحذية', '#7a3a3a'], [606, 146, 'بقالة', '#4a6a2a']];
const gvStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: GVBLK, shops: GVSHOP }, o));
// ---------- 0a: hook: the real Earth; gold arrows pull inward, x2 ----------
function sceneHookG(t) {
  const G = glE(t, { d: 9.6, el: .25, lon: 20 + t * 9, clouds: .42, lights: .3, tg: [0, -.1, 0] });
  const [cx, cy] = G.c0, R = G.R, hit = WS(0, 2) + .1, k = ease(ramp(t, hit, hit + .5));
  let ov = '';
  // twelve gold arrows streaming in toward the centre; after the hit they double (thicker, faster, more)
  for (let i = 0; i < 12; i++) { const an = i / 12 * Math.PI * 2 + .26, sp = .55 + .7 * k, n = k > .3 ? 2 : 1;
    for (let j = 0; j < n; j++) { const u = pmod(j / 2 + i * .13 - t * sp, 1), d = R + 40 + u * 200, a = Math.sin(Math.PI * u) * (.5 + .45 * k), x = cx + Math.cos(an) * d, y = cy + Math.sin(an) * d, w = 4 + 3 * k;
      if (y < 400 && y < cy) continue;
      ov += `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(an * 57.3 + 180)})" opacity="${g1(a)}"><path d="M-34,0 H6" stroke="#f4c76b" stroke-width="${g1(w)}" stroke-linecap="round"/><path d="M-4,-11 L12,0 L-4,11Z" fill="#f4c76b"/></g>`; } }
  const pr = ramp(t, hit, hit + .9); if (pr > 0 && pr < 1) ov += `<circle cx="${g1(cx)}" cy="${g1(cy)}" r="${g1(R + 30 + 200 * (1 - pr))}" fill="none" stroke="#f4c76b" stroke-width="${g1(6 * (1 - pr) + 2)}" opacity="${g1(.5 * (1 - pr))}"/>`;
  F.ov = ov;
  return space(t);
}
// ---------- 0b: the street: everyone suddenly sinks and bends ----------
function sceneSink(t) {
  const st = WS(0, 6) - .3, hit = WS(0, 8) - .15, k = ease(ramp(t, hit, hit + .45)), bob = Math.max(0, Math.sin(Math.PI * clamp((t - hit) / .35))) * 8, L = [];
  const pos = (x0, v, pr) => { const T = t - st, Th = Math.max(0, hit - st); return T < Th ? [x0 + v * T, T * pr] : [x0 + v * Th + v * .42 * (T - Th), Th * pr + (T - Th) * pr * .42]; };
  [[90, 1062, 1, 2, .86, .4, 38], [610, 1066, -1, 5, .88, 2.1, 38], [250, 1040, 1, 3, .82, 1.1, 36], [470, 1034, -1, 6, .8, .7, 34], [360, 1094, 1, 0, .92, 1.6, 40]].forEach(([x0, y, f, pi, s, ph, v], j) => {
    const [x, w] = pos(x0, f * v, 4.3); const pal = j === 4 ? YOU : gp(pi);
    L.push([y, heavy(x, y + bob * k * (j % 2 ? .6 : 1), s, f, pal, k, { walk: w + ph })]); });
  // a shopping bag slips from a hand and drops
  const dropT = hit + .1, du = clamp((t - dropT) / .35), bx = 520, by0 = 900, by = by0 + (1034 - 6 - by0) * du * du;
  L.push([1034.5, `<g transform="translate(${bx},${g1(by)}) rotate(${g1(14 * du)})"><path d="M-20,0 L20,0 L24,-44 L-24,-44Z" fill="#e8d8b8"/><path d="M-20,0 L20,0 L24,-44 L-24,-44Z" fill="#000" opacity=".08"/><path d="M-10,-44 q10,-18 20,0" stroke="#8a6a42" stroke-width="3" fill="none"/>${du >= 1 ? '<ellipse cx="0" cy="2" rx="26" ry="4" fill="#000" opacity=".25"/>' : ''}</g>`]);
  const Z = 'translate(360,1060) scale(1.18) translate(-360,-1060)';
  let s = `<defs>${GVDEFS()}</defs><g transform="${Z}">` + gvStreet(t, { id: 's0', top: gvSort(L) }) + `</g>`;
  s += downField(t, .6 * ease(ramp(t, hit - .1, hit + .3)), k, 11);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: the scale: 70 -> 140 kg ----------
function bigScale(x, y, kg, hot) {
  return `<ellipse cx="${x}" cy="${y + 6}" rx="150" ry="14" fill="#000" opacity=".4" filter="url(#blur2)"/><rect x="${x - 140}" y="${y - 40}" width="280" height="44" rx="20" fill="#5a606a"/><rect x="${x - 140}" y="${y - 48}" width="280" height="40" rx="20" fill="url(#helG)"/><rect x="${x - 140}" y="${y - 48}" width="280" height="40" rx="20" fill="#000" filter="url(#grainR)" opacity=".1"/>` +
    `<rect x="${x - 50}" y="${y - 40}" width="100" height="26" rx="6" fill="#16221c"/><text x="${x}" y="${y - 20}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="${hot ? '#ff9a7a' : '#9cf0b0'}">${kg}</text>`;
}
function sceneScale(t) {
  const st = S0(1) - .2, jump = WS(1, 4) - .1, u = ease(ramp(t, jump, jump + .6)), kg = Math.round(70 + 70 * u), k = ease(ramp(t, jump, jump + .5));
  const m = ease(ramp(t, WS(1, 7) - .2, WS(1, 8) + .2)), f2 = ease(ramp(t, WS(1, 11) - .2, WS(1, 12) + .1));
  let s = `<defs>${GVDEFS()}</defs><rect x="-20" y="-20" width="760" height="1060" fill="url(#gvTile)"/>`;
  for (let r = 0; r < 16; r++) for (let q = 0; q < 9; q++) s += `<rect x="${q * 90 - 40}" y="${330 + r * 46}" width="88" height="44" fill="none" stroke="#b4bcc0" stroke-width="2"/>`;
  s += `<rect x="-20" y="320" width="760" height="720" fill="#000" filter="url(#grainR)" opacity=".06"/><ellipse cx="420" cy="560" rx="320" ry="240" fill="#fff8e8" opacity=".35" filter="url(#blur16)"/>`;
  // a towel rail and a small window for depth
  s += `<rect x="70" y="520" width="150" height="190" rx="6" fill="#bcd8ec"/><rect x="70" y="520" width="150" height="190" rx="6" fill="none" stroke="#f2f2f0" stroke-width="10"/><path d="M145,520 V710 M70,615 H220" stroke="#f2f2f0" stroke-width="6"/><path d="M84,700 L150,560" stroke="#fff" stroke-width="10" opacity=".25"/>` +
    `<rect x="520" y="430" width="170" height="230" rx="10" fill="#cfe2ee"/><rect x="520" y="430" width="170" height="230" rx="10" fill="none" stroke="#9aa4ac" stroke-width="8"/><path d="M540,640 L640,450 M590,640 L680,470" stroke="#fff" stroke-width="12" opacity=".3"/>` +
    `<rect x="500" y="760" width="210" height="270" fill="#e8e2d6"/><rect x="500" y="760" width="210" height="270" fill="#000" filter="url(#grainR)" opacity=".08"/><rect x="510" y="800" width="90" height="210" rx="4" fill="none" stroke="#c8c0b0" stroke-width="3"/><rect x="610" y="800" width="90" height="210" rx="4" fill="none" stroke="#c8c0b0" stroke-width="3"/><circle cx="590" cy="900" r="5" fill="#8a8e94"/><circle cx="620" cy="900" r="5" fill="#8a8e94"/>` +
    `<rect x="490" y="744" width="230" height="18" rx="4" fill="#f4f2ee"/><ellipse cx="605" cy="748" rx="70" ry="10" fill="#c8ccd0"/><path d="M605,744 v-34 q0,-10 12,-10 h14" stroke="#9aa0a8" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<rect x="40" y="980" width="70" height="50" rx="8" fill="#5a8a5a"/><path d="M75,980 q-30,-60 -10,-110 M75,980 q10,-70 40,-100 M75,980 q-5,-50 -40,-70" stroke="#3a7a3a" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  s += `<rect x="-20" y="1030" width="760" height="300" fill="url(#gvFloor)"/><rect x="-20" y="1030" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1030" width="760" height="30" fill="url(#aoDn)" opacity=".8"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${-20 + i * 96},1030 L${-140 + i * 120},1300" stroke="#5a4e40" stroke-width="2" opacity=".5"/>`).join('');
  const SY = 1150;
  s += bigScale(360, SY, AR(kg) + ' كغ', u > .5);
  s += heavy(350, SY - 48, 1.5, 1, YOU, k, { extra: k > .2 ? { hF: [350 + 30 * 1.5, SY - 48 - 196 * 1.5 + 40 * k], hB: [350 - 2 * 1.5, SY - 48 - 190 * 1.5 + 40 * k] } : {} });
  s += downField(t, .8 * k, k, 13);
  // the display, big, above
  const dy = 470; s += `<g>${panel(200, dy - 70, 320, 120)}<text x="360" y="${dy + 22}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="76" fill="${u > .5 ? '#ff9a7a' : '#9cf0b0'}">${AR(kg)} كغ</text></g>`;
  if (m > 0) s += `<g opacity="${g1(m)}">${panel(36, 860, 240, 110)}${gvL(156, 904, 'كتلتُك', 1, '#cfd8e4', 26)}${gvL(156, 948, '٧٠ كغ', 1, '#9cf0b0', 34)}</g>`;
  if (f2 > 0) s += `<g opacity="${g1(f2)}">${panel(444, 860, 240, 110)}${gvL(564, 904, 'تشعرُ كأنّك', 1, '#cfd8e4', 26)}${gvL(564, 948, '١٤٠ كغ', 1, '#ff9a7a', 34)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: bent people, slow steps; the stairs like a mountain ----------
function shotSlow(t) {
  const T = t - (S0(2) - .2), L = [];
  [[60, 1060, 1, 2, .86, .4, 17], [650, 1064, -1, 5, .88, 2.1, 16], [240, 1042, 1, 3, .82, 1.1, 15], [470, 1036, -1, 6, .8, .7, 15]].forEach(([x0, y, f, pi, s, ph, v]) => {
    L.push([y, heavy(x0 + f * v * T, y, s, f, gp(pi), 1, { walk: T * 1.8 + ph })]); });
  L.push([1092, restP(356, 1092, .92, 1, YOU, 1)]);
  // someone sits on a bench, too tired to go on
  L.push([1020, `<rect x="560" y="${1020 - 60}" width="120" height="10" rx="3" fill="#6a4a2e"/><rect x="566" y="${1020 - 50}" width="8" height="50" fill="#3a2a1e"/><rect x="666" y="${1020 - 50}" width="8" height="50" fill="#3a2a1e"/><rect x="560" y="${1020 - 112}" width="120" height="8" rx="3" fill="#6a4a2e"/><rect x="560" y="${1020 - 92}" width="120" height="8" rx="3" fill="#6a4a2e"/>` +
    hero(610, 1020, Object.assign({}, SEAT, { s: .78, face: -1, shade: 1, lean: 22, lookUp: -.4, hF: [580, 1020 - 70 * .78], hB: [592, 1020 - 66 * .78] }, gp(1)))]);
  const Z = 'translate(360,1060) scale(1.18) translate(-360,-1060)';
  return `<g transform="${Z}">` + gvStreet(t, { id: 's2', top: gvSort(L) }) + `</g>` + downField(t, .5, 1, 17);
}
const STX = 70, STY = 1180, RUN = 66, RISE = 44, NST = 9;
function stairsBg() {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(600, 520, .8) + cumulus(220, 520, 220, 61, { a: .7 });
  s += farCity(57, 980, '#9aa4b8');
  // the tall building the stairs lead to
  s += `<rect x="${STX + NST * RUN - 40}" y="520" width="380" height="${STY - 520 - NST * RISE + 40}" fill="#b8a488"/><rect x="${STX + NST * RUN - 40}" y="520" width="380" height="${STY - 520 - NST * RISE + 40}" fill="#fff" filter="url(#wallI)" opacity=".3"/>` +
    Array.from({ length: 4 }, (_, i) => `<rect x="${STX + NST * RUN}" y="${560 + i * 50}" width="40" height="34" fill="#3a4a5e"/><rect x="${STX + NST * RUN + 70}" y="${560 + i * 50}" width="40" height="34" fill="#3a4a5e"/>`).join('');
  // the stair flight: lit treads, shaded risers, a stone side wall
  let side = `M${STX - 60},${STY}`; for (let i = 0; i < NST; i++) side += ` L${STX + i * RUN},${STY - i * RISE} L${STX + i * RUN},${STY - (i + 1) * RISE}`;
  side += ` L${STX + NST * RUN + 400},${STY - NST * RISE} L${STX + NST * RUN + 400},1320 L${STX - 60},1320Z`;
  s += `<path d="${side}" fill="url(#gvStone)"/><path d="${side}" fill="#000" filter="url(#grainR)" opacity=".14"/>`;
  for (let i = 0; i < NST; i++) { const x = STX + i * RUN, y = STY - (i + 1) * RISE;
    s += `<rect x="${x}" y="${y}" width="${RUN + 2}" height="9" fill="#e8dcc4"/><rect x="${x - 2}" y="${y + 9}" width="${RUN + 4}" height="${RISE - 9}" fill="#000" opacity=".1"/><path d="M${x},${y + RISE} H${x + RUN}" stroke="#7a6a54" stroke-width="2" opacity=".5"/>`; }
  s += `<rect x="-20" y="${STY}" width="760" height="${1320 - STY}" fill="#b0a690"/><rect x="-20" y="${STY}" width="760" height="${1320 - STY}" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  // the handrail
  s += `<path d="M${STX - 20},${STY - 110} L${STX + NST * RUN},${STY - NST * RISE - 110}" stroke="#4a4e56" stroke-width="7" stroke-linecap="round"/>` + Array.from({ length: 6 }, (_, i) => { const x = STX + i * 2 * RUN + 20; return `<path d="M${x},${STY - Math.floor((x - STX) / RUN + 1) * RISE} V${STY - 110 - (x - STX + 20) * RISE / RUN}" stroke="#5a5e66" stroke-width="4"/>`; }).join('');
  return s;
}
// one person climbing step by step: (n = current step, u = 0..1 inside the step cycle)
function climber(t, t0, cyc, n0, s, pal) {
  const q = Math.max(0, (t - t0) / cyc), n = n0 + Math.floor(q), u = q - Math.floor(q);
  const lift = ease(clamp(u / .45)), up = ease(clamp((u - .45) / .55));
  const x = STX + (n + .5 + up) * RUN, y = STY - (n + up) * RISE;
  const lF = [lerp(lerp(.05, .95, lift), .05, up), lerp(lerp(-.05, .2, lift), -.05, up)], lB = [lerp(-.12, -.32, up), lerp(-.16, -.5, up * (1 - up) * 4)];
  const hx = x + 50 * s, hy = STY - 110 - (hx - STX + 20) * RISE / RUN;
  return hero(x, y, Object.assign({ s, face: 1, shade: 1, lean: 22 - 6 * up, lookUp: -.25, lF, lB, hF: [hx, hy], aB: [-.2, .2] }, pal));
}
function shotStairs(t) {
  const t0 = WS(2, 4) - .25;
  let s = stairsBg();
  s += climber(t, t0 - .4, 1.5, 3, .72, YOU) + climber(t, t0, 1.7, 0, .7, gp(3));
  s += restP(STX + 6.5 * RUN, STY - 6 * RISE, .68, -1, gp(5), 1);
  // "like a mountain": a faint mountain outline grows behind the stairs
  const m = ease(ramp(t, WS(2, 8) - .2, WS(2, 9) + .2));
  if (m > 0) s += `<g opacity="${g1(m * .9)}">${panel(70, 400, 300, 64)}${gvL(220, 444, 'كصعودِ جبل', 1, '#f4c76b', 34)}</g>`;
  return s;
}
function sceneSlow(t) { let s = `<defs>${GVDEFS()}</defs>` + gvSubs(t, [[S0(2) - .2, shotSlow], [WS(2, 4) - .25, shotStairs]]); noEarth(); F.ov = ''; return s; }
// ---------- 3: the heart pumps blood up to the brain; standing up fast: grey-out ----------
function heartS(x, y, s, beat) { const k = 1 + .1 * beat;
  return `<g transform="translate(${g1(x)},${g1(y)}) scale(${(s * k).toFixed(3)}) rotate(-18)"><ellipse cx="0" cy="0" rx="60" ry="60" fill="url(#gvRed)" opacity="${g1(.5 + .5 * beat)}"/><path d="M-6,-30 Q-8,-52 8,-58 L12,-48 Q2,-44 4,-30Z" fill="#c84a44"/><path d="M8,-30 Q20,-60 40,-54 L36,-44 Q24,-48 18,-28Z" fill="#a83a3a"/>` +
    `<path d="M2,36 C-26,26 -40,4 -38,-14 C-36,-30 -22,-36 -10,-30 C0,-38 18,-38 28,-26 C38,-14 34,10 20,24 C14,30 8,34 2,36Z" fill="#b8403c"/><path d="M2,36 C8,34 14,30 20,24 C34,10 38,-14 28,-26 C30,-6 22,18 2,36Z" fill="#7a2226" opacity=".7"/><path d="M-30,-14 C-28,-26 -18,-32 -10,-28" stroke="#f0908a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/><path d="M-6,-12 q10,8 10,22" stroke="#7a2226" stroke-width="2" fill="none"/></g>`; }
function shotBody(t) {
  const T = t - (S0(3) - .2), ph = pmod(t * 1.6, 1), beat = ph < .18 ? Math.sin(ph / .18 * Math.PI) : 0;
  let s = studio('stH', '#2a3a52', '#080c16', 21);
  const x = 330, y = 1230, sc = 2.35;
  s += hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, lean: 6, lookUp: -.1 }, YOU));
  const [chx, chy] = HP.chest, [hx, hy] = HP.head;
  // darken the figure a little so the organs read (x-ray feel)
  s += `<ellipse cx="${g1(chx)}" cy="${g1(chy - 20)}" rx="120" ry="200" fill="#0a0e1c" opacity=".25" filter="url(#blur16)"/>`;
  const hX = chx + 16, hY = chy - 34;
  // the artery from the heart up the neck to the brain; blood drops crawl up slowly and slip back
  const path = `M${g1(hX + 4)},${g1(hY - 30)} C${g1(hX + 6)},${g1(hY - 100)} ${g1(hx - 6)},${g1(hy + 120)} ${g1(hx - 8)},${g1(hy - 10)}`;
  s += `<path d="${path}" stroke="#7a1a1a" stroke-width="12" fill="none" stroke-linecap="round" opacity=".85"/><path d="${path}" stroke="#e8483e" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const P0 = [hX + 4, hY - 30], P1 = [hX + 6, hY - 100], P2 = [hx - 6, hy + 120], P3 = [hx - 8, hy - 10];
  const bz = u => { const a = 1 - u; return [0, 1].map(i => a * a * a * P0[i] + 3 * a * a * u * P1[i] + 3 * a * u * u * P2[i] + u * u * u * P3[i]); };
  for (let i = 0; i < 7; i++) { const u = clamp(pmod(i / 7 + T * .22, 1) * .95 - .04 * Math.sin(T * 4 + i)), [bx, by] = bz(u); s += `<circle cx="${g1(bx)}" cy="${g1(by)}" r="5.5" fill="#ffb0a0" opacity="${g1(.9 * (1 - u * .6))}"/>`; }
  // the brain: a soft glow that dims
  const dim = ease(ramp(t, WS(3, 4) - .2, WS(3, 5) + .3));
  s += `<ellipse cx="${g1(hx - 2)}" cy="${g1(hy - 14)}" rx="${g1(30 * sc / 1.4)}" ry="${g1(22 * sc / 1.4)}" fill="#f4b0c0" opacity="${g1(.55 - .3 * dim)}" filter="url(#blur5)"/>`;
  s += heartS(hX, hY, 1.3, beat);
  // gravity pulls the blood down to the legs
  const ga = ease(ramp(t, S0(3), S0(3) + .5));
  s += `<g opacity="${g1(ga)}">` + [0, 1, 2].map(i => chev(hX + 120, hY + 120 + i * 60 + pmod(T * 60, 60), 1.4, 0, .9, '#ff8a6a')).join('') + gvL(hX + 120, hY + 340, 'الجاذبيّةُ تشدُّ الدمَ', 1, '#ff9a7a', 26) + `</g>`;
  s += `<g opacity="${g1(ga)}">${chev(hx + 70, hy + 120 - pmod(T * 30, 40), 1.2, 180, .9, '#ffd0a0')}${chev(hx + 70, hy + 160 - pmod(T * 30, 40), 1.2, 180, .6, '#ffd0a0')}</g>`;
  // a gauge: blood pressure at the brain going down
  const bp = 1 - .5 * dim; s += `${panel(440, 400, 250, 110)}${gvL(565, 440, 'دمٌ أقلُّ للدماغ', 1, '#cfd8e4', 24)}<rect x="470" y="462" width="190" height="20" rx="8" fill="#2a3040"/><rect x="${g1(660 - 190 * bp)}" y="462" width="${g1(190 * bp)}" height="20" rx="8" fill="${bp < .7 ? '#e8584a' : '#5ad88a'}"/>`;
  return s;
}
function shotStand(t) {
  const t0 = WS(3, 6) - .25, up = ease(ramp(t, WS(3, 7) - .1, WS(3, 8) + .3)), grey = ease(ramp(t, WS(3, 8), WS(3, 10) + .2)), sway = grey * Math.sin((t - WS(3, 8)) * 3.2) * 7;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(560, 470, .8) + cumulus(240, 500, 240, 71, { a: .8 }) + mountainsR(860, 120, 33, { rock: '#8a9aa8' }) + forestR(905, 26, 30, 70, 47, '#3f6b35', { haze: .3, hazeCol: '#c4d0c0' }) + meadow(900, 1300, t);
  // a park path
  s += `<path d="M-20,1100 Q360,1060 740,1110 L740,1190 Q360,1140 -20,1180Z" fill="#c8b89a"/><path d="M-20,1100 Q360,1060 740,1110 L740,1190 Q360,1140 -20,1180Z" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  [[120, 330, 41], [640, 300, 43]].forEach(([x, h, sd]) => { s += treeR(x, 1000, h, sd, t); });
  // the bench
  const BX = 360, BY = 1130, bs = 1.25;
  s += `<rect x="${BX - 160}" y="${BY - 60 * bs}" width="300" height="14" rx="4" fill="#7a5232"/><rect x="${BX - 160}" y="${BY - 60 * bs}" width="300" height="4" fill="#fff" opacity=".2"/><rect x="${BX - 150}" y="${BY - 46 * bs}" width="10" height="${46 * bs}" fill="#2a2a2e"/><rect x="${BX + 120}" y="${BY - 46 * bs}" width="10" height="${46 * bs}" fill="#2a2a2e"/>` +
    `<rect x="${BX - 160}" y="${BY - 140 * bs}" width="300" height="12" rx="4" fill="#7a5232"/><rect x="${BX - 160}" y="${BY - 112 * bs}" width="300" height="12" rx="4" fill="#7a5232"/><path d="M${BX - 148},${BY - 140 * bs} V${BY - 60 * bs} M${BX + 128},${BY - 140 * bs} V${BY - 60 * bs}" stroke="#2a2a2e" stroke-width="8"/><ellipse cx="${BX}" cy="${BY + 4}" rx="190" ry="12" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
  // the person: seated -> standing up fast; feet stay planted
  const s2 = bs, lF = [lerp(1.5708, .1, up), lerp(.05, .06, up)], lB = [lerp(1.42, -.1, up), lerp(-.02, -.14, up)];
  const fx = l => 76 * Math.sin(l[0]) + 74 * Math.sin(l[1]), x = BX - 40 + (fx([1.5708, .05]) - fx(lF)) * s2;
  const hipY = -lerp(60, 148, up);
  s += hero(x + sway, BY, Object.assign({ s: s2, face: 1, shade: 1, lF, lB, hipY, lean: 30 * Math.sin(Math.PI * up) * (1 - up * .5) + grey * 6, lookUp: -.1 + .2 * up - .3 * grey, closed: grey > .6 ? 1 : 0 }, YOU, grey > .3 ? { hF: [x + sway + 4 * s2, BY - 290 * s2], bendF: 1 } : {}));
  // tunnel vision: the edges go dark and grey
  if (grey > 0) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#8a8e96" opacity="${g1(.45 * grey)}" style="mix-blend-mode:saturation"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#gvVig)" opacity="${g1(.9 * grey)}"/>`;
  return s;
}
function sceneHeart(t) { let s = `<defs>${GVDEFS()}</defs>` + gvSubs(t, [[S0(3) - .2, shotBody], [WS(3, 6) - .25, shotStand]]); noEarth(); F.ov = ''; return s; }
// ---------- 4: falling from the same height: twice the energy; the ball goes half as far ----------
function pot(x, y, s, rot = 0) { return `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(rot)}) scale(${s})"><path d="M-22,-30 L22,-30 L16,10 L-16,10Z" fill="url(#gvPot)"/><rect x="-25" y="-36" width="50" height="9" rx="2" fill="#b86a3a"/>` +
  `<path d="M-2,-36 q-14,-30 -6,-56 M2,-36 q12,-26 20,-44 M0,-36 q2,-34 0,-60" stroke="#3a7a3a" stroke-width="4" fill="none"/><ellipse cx="-8" cy="-90" rx="10" ry="6" fill="#4a9a4a"/><ellipse cx="20" cy="-80" rx="10" ry="6" fill="#5aaa5a"/><circle cx="0" cy="-98" r="8" fill="#e84a6a"/><circle cx="0" cy="-98" r="3" fill="#f4d040"/></g>`; }
function shards(x, y, k, n, seed) { if (k <= 0) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const a = -Math.PI * (.1 + .8 * r()), v = 80 + r() * 170, px = x + Math.cos(a) * v * k * (1 + r()), py = y + Math.sin(a) * v * k * (1 - k) * 1.6 + 30 * k * k;
    s += `<path d="M${g1(px)},${g1(py)} l${g1(12 + r() * 12)},${g1(-6 + r() * 12)} l${g1(-6 - r() * 12)},${g1(9 + r() * 9)}Z" fill="${i % 3 ? '#b86a3a' : '#7a3a1e'}"/>`; }
  return s + `<ellipse cx="${x}" cy="${y - 20 * k}" rx="${g1(60 + 120 * k)}" ry="${g1(26 + 50 * k)}" fill="url(#dustG)" opacity="${g1(.9 * (1 - k * .6))}"/>`; }
function shotPots(t) {
  const t0 = WS(4, 3) - .5, LY = 600, GY = 1080, H = GY - LY - 10;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>`;
  [[0, 'اليوم', 1, '#cfe8ff'], [1, 'الجاذبيّة ×٢', 2, '#ff9a7a']].forEach(([side, tx, gk, col]) => {
    const x0 = side * 360, cx = x0 + 180;
    s += `<g><rect x="${x0}" y="380" width="360" height="${GY - 380}" fill="#c8a888"/><rect x="${x0}" y="380" width="360" height="${GY - 380}" fill="url(#brk)" opacity=".8"/><rect x="${x0}" y="380" width="360" height="${GY - 380}" fill="#fff" filter="url(#wallI)" opacity=".25"/>` +
      [[LY - 170, 1], [LY + 170, 0]].map(([wy, bal]) => `<rect x="${x0 + 90}" y="${wy}" width="180" height="150" fill="#3a4a5e"/><path d="M${x0 + 180},${wy} V${wy + 150} M${x0 + 90},${wy + 70} H${x0 + 270}" stroke="#e8e0d0" stroke-width="5"/><rect x="${x0 + 90}" y="${wy}" width="180" height="150" fill="none" stroke="#e8e0d0" stroke-width="8"/><path d="M${x0 + 110},${wy + 140} L${x0 + 170},${wy + 20}" stroke="#fff" stroke-width="10" opacity=".15"/>`).join('') +
      `<rect x="${x0 + 60}" y="${LY - 14}" width="240" height="14" fill="#e8e0d0"/><rect x="${x0 + 60}" y="${LY}" width="240" height="10" fill="#000" opacity=".2"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${x0 + 70 + i * 27},${LY - 14} V${LY - 70}" stroke="#2a2c30" stroke-width="4"/>`).join('') + `<path d="M${x0 + 64},${LY - 70} H${x0 + 296}" stroke="#2a2c30" stroke-width="6"/>` +
      `<rect x="${x0}" y="${GY}" width="360" height="220" fill="#b8ae98"/><rect x="${x0}" y="${GY}" width="360" height="220" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="${x0}" y="${GY}" width="360" height="20" fill="url(#aoDn)" opacity=".7"/></g>`;
    // the fall: y = LY + H (tau/T)^2; T = 1.0 s today, 0.71 s with double gravity (t = sqrt(2h/g))
    const Tf = gk === 1 ? 1.0 : .707, tau = Math.max(0, t - t0), fall = clamp(tau / Tf), py = LY - 72 + H * fall * fall, hitK = clamp((tau - Tf) / .8);
    if (fall < 1) s += pot(cx + 40, py, 1.15, 60 * fall); else s += shards(cx + 40, GY + 8, hitK, gk === 1 ? 10 : 22, 31 + side) + `<ellipse cx="${cx + 40}" cy="${GY + 12}" rx="${gk === 1 ? 40 : 58}" ry="9" fill="#5a3a22" opacity=".7"/>` + Array.from({ length: gk === 1 ? 4 : 7 }, (_, i) => `<path d="M${cx + 10 + i * 12},${GY + 12} l${8 + i % 3 * 4},-${6 + i % 2 * 5} l${6},${8}Z" fill="${i % 2 ? '#b86a3a' : '#8a4a2a'}"/>`).join('');
    if (fall > 0 && fall < 1) s += `<path d="M${cx + 40},${g1(py - 110)} V${g1(py - 110 - 160 * fall)}" stroke="#fff" stroke-width="7" opacity=".25" stroke-linecap="round"/>`;
    // the bottom panel: which world, and the impact energy
    const e = ease(ramp(t, t0 + Tf, t0 + Tf + .5));
    s += `${panel(x0 + 24, 1128, 312, 132)}${gvL(cx, 1170, tx, 1, col, 28)}${gvL(cx, 1206, 'طاقةُ الارتطام', .9, '#fff', 22)}<rect x="${x0 + 50}" y="1222" width="${g1(Math.max(1, 120 * gk * e))}" height="24" rx="8" fill="url(#${gk === 1 ? 'gvBar' : 'gvBarR'})"/>` + (e > 0 ? gvL(x0 + 50 + 120 * gk * e + 26, 1242, gk === 1 ? '×١' : '×٢', e, col, 24) : '');
  });
  s += `<rect x="358" y="380" width="4" height="920" fill="#0a0e1c" opacity=".8"/>`;
  // the same height on both sides
  const sh = ease(ramp(t, WS(4, 0) - .1, WS(4, 1) + .2)) * (1 - ease(ramp(t, t0 + .1, t0 + .5)));
  if (sh > 0) s += `<g opacity="${g1(sh)}"><path d="M360,${LY - 60} V${GY}" stroke="#f4c76b" stroke-width="5"/><path d="M344,${LY - 60} h32 M344,${GY} h32" stroke="#f4c76b" stroke-width="5"/>${panel(240, 790, 240, 56)}${gvL(360, 828, 'الارتفاعُ نفسُه', 1, '#f4c76b', 28)}</g>`;
  return s;
}
function shotBall(t) {
  const t0 = WS(4, 8) - .1, T = t - (WS(4, 6) - .25), GY = 1090, X0 = 150, R1 = 470, H1 = 300;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(600, 470, .8) + cumulus(300 + T * 3, 520, 240, 91, { a: .8 }) + mountainsR(880, 110, 51, { rock: '#8a98a6' }) + forestR(925, 26, 30, 70, 59, '#3f6b35', { haze: .3, hazeCol: '#c4d0c0' }) + meadow(920, 1300, t);
  // the ground line and distance ticks
  for (let i = 0; i <= 10; i++) s += `<path d="M${X0 + i * 50},${GY + 10} v12" stroke="#fff" stroke-width="3" opacity=".6"/>`;
  s += `<path d="M${X0},${GY + 16} H${X0 + 500}" stroke="#fff" stroke-width="2" opacity=".5"/>`;
  const arc = (R, H, k) => { let d = ''; for (let i = 0; i <= 40 * k; i++) { const u = i / 40, x = X0 + 60 + R * u, y = GY - 190 - H * 4 * u * (1 - u) + 190 * u * u; d += (i ? ' L' : 'M') + g1(x) + ',' + g1(y); } return d; };
  // release height ~190 px above the ground; landing point = ground for simplicity of the drawing
  const today = ease(ramp(t, t0 + .1, t0 + 1.6)), now = clamp((t - t0) / .9);
  if (today > 0) s += `<path d="${arc(R1, H1, today)}" stroke="#ffffff" stroke-width="5" stroke-dasharray="14 10" fill="none" opacity=".8"/>`;
  if (now > 0) s += `<path d="${arc(R1 / 2, H1 / 2, now)}" stroke="#f4c76b" stroke-width="6" fill="none"/>`;
  if (today >= 1) s += gvL(X0 + 60 + R1 - 34, GY + 60, 'اليوم', 1, '#ffffff', 28);
  if (now >= 1) s += gvL(X0 + 60 + R1 / 2, GY + 60, 'نصفُ المسافة', 1, '#f4c76b', 30);
  // the ball along the new arc
  const u = now, bx = X0 + 60 + R1 / 2 * u, by = GY - 190 - H1 / 2 * 4 * u * (1 - u) + 190 * u * u;
  const ball = (x, y) => `<circle cx="${g1(x)}" cy="${g1(y)}" r="13" fill="#e8e0c8"/><path d="M${g1(x - 12)},${g1(y - 3)} q12,8 24,0" stroke="#c83a2a" stroke-width="2.4" fill="none"/><circle cx="${g1(x - 4)}" cy="${g1(y - 5)}" r="4" fill="#fff" opacity=".6"/>`;
  // the thrower
  const th = clamp((t - (t0 - .5)) / .5), rel = t >= t0;
  const hF = rel ? [X0 + 66 + 30 * ease(clamp((t - t0) / .3)), GY - 196 + 30 * ease(clamp((t - t0) / .3))] : [X0 - 60 - 15 * th, GY - 205 - 15 * th];
  s += hero(X0, GY, Object.assign({ s: 1.0, face: 1, shade: 1, lean: rel ? 10 : -6, lookUp: .15, lF: [.32, .1], lB: [-.3, -.2], hF, aB: [-.6, -.2] }, YOU, rel ? {} : { bendF: 1 }));
  if (!rel) s += ball(HP.hand[0], HP.hand[1] - 6); else if (u < 1) s += ball(bx, by); else s += ball(X0 + 60 + R1 / 2 + 10, GY - 2);
  return s;
}
function sceneFall(t) { let s = `<defs>${GVDEFS()}</defs>` + gvSubs(t, [[S0(4) - .2, shotPots], [WS(4, 6) - .25, shotBall]]); noEarth(); F.ov = ''; return s; }
// ---------- 5: old bridges and buildings carry twice their weight: cracks, a collapse ----------
function crackL(x, y, len, ang, k, seed, w = 3) { if (k <= 0) return ''; const r = RS(seed); let d = `M${x},${y}`, px = x, py = y, a = ang; const n = Math.max(1, Math.round(12 * k));
  for (let i = 0; i < n; i++) { a += (r() - .5) * .9; px += Math.cos(a) * len / 12; py += Math.sin(a) * len / 12; d += ` L${g1(px)},${g1(py)}`; }
  return `<path d="${d}" stroke="#2a1e14" stroke-width="${w}" fill="none" stroke-linejoin="round"/><path d="${d}" stroke="#f4e8d0" stroke-width="1.2" fill="none" opacity=".4" transform="translate(1.5,1.5)"/>`; }
function sceneBridge(t) {
  const st = S0(5) - .2, T = t - st, ck = ease(ramp(t, WS(5, 3) - .2, WS(5, 9))), fall = ramp(t, WS(5, 9) + .1, WS(5, 9) + 1.6), DK = 760, WY = 900;
  let s = `<defs>${GVDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(140, 470, .75) + cumulus(420 + T * 2, 480, 260, 101, { a: .75 });
  // the old town behind: c. 1900 facades
  [[-30, 170, 300, '#d8c4a0', 3], [130, 150, 360, '#c4a888', 5], [270, 160, 280, '#e0d0b0', 7], [420, 150, 340, '#b8a488', 9], [560, 190, 300, '#d4bc98', 11]].forEach(([x, w, h, col, sd], i) => {
    let f = facade(x, WY - 40, w, h, { seed: sd, col });
    if (i === 3) { const c = ck; f += `<g>${crackL(x + 40, WY - 40 - h + 30, 160, 1.2, c, 301, 3)}${crackL(x + 110, WY - 40 - h + 60, 120, 1.9, c, 302, 2.5)}</g>`; }
    s += f; });
  // the old building at right loses its top corner
  const bk = ramp(t, WS(5, 10) - .1, WS(5, 10) + 1.2);
  if (bk > 0) { const r = RS(77); for (let i = 0; i < 10; i++) { const x = 600 + r() * 120, y0 = WY - 40 - 300 + r() * 50, y = y0 + 500 * bk * bk * (0.6 + r() * .4); if (y < WY + 40) s += `<rect x="${g1(x)}" y="${g1(y)}" width="${g1(10 + r() * 16)}" height="${g1(8 + r() * 10)}" fill="#a8906e" transform="rotate(${g1(bk * 200 * (r() - .5))},${g1(x)},${g1(y)})"/>`; }
    s += `<ellipse cx="660" cy="${WY - 120}" rx="${g1(80 + 120 * bk)}" ry="${g1(50 + 70 * bk)}" fill="url(#dustG)" opacity="${g1(.8 * (1 - bk * .4))}"/>`; }
  // the river
  s += `<rect x="-20" y="${WY - 40}" width="760" height="${1320 - WY + 40}" fill="url(#gvRiver)"/>` + Array.from({ length: 14 }, (_, i) => { const y = WY - 20 + i * 28 + i * i * 1.6, x = pmod(i * 97 + T * (12 + i * 3), 900) - 100; return `<path d="M${g1(x)},${g1(y)} q30,-5 60,0 t60,0" stroke="#d8ecf8" stroke-width="${g1(1.5 + i * .2)}" fill="none" opacity=".35"/>`; }).join('');
  // the stone arch bridge: deck, three arches, piers; the middle span sags and drops
  const sag = ease(clamp(fall * 1.4)) * 1, drop = Math.pow(clamp(fall - .15), 2) * 600;
  const arches = [[-40, 230], [230, 490], [490, 760]], PH = 1010;
  let br = `M-40,${DK - 30} H760 V${PH}`;
  arches.slice().reverse().forEach(([a, b]) => { const pa = 22; br += ` L${b - pa},${PH} L${b - pa},${DK + 70} Q${(a + b) / 2},${DK - 40} ${a + pa},${DK + 70} L${a + pa},${PH}`; });
  br += ` L-40,${PH}Z`;
  const mid = `M${230 + 22},${DK - 30} H${490 - 22} V${DK + 80} Q360,${DK - 20} ${230 + 22},${DK + 80}Z`;
  s += `<defs><clipPath id="gvBrC"><path d="${br}"/></clipPath><clipPath id="gvMidC"><path d="M${230 + 22},${DK - 70} H${490 - 22} V${WY - 34} H${230 + 22}Z"/></clipPath><clipPath id="gvSideC"><path d="M-60,-20 H${230 + 22} V1300 H-60Z M${490 - 22},-20 H780 V1300 H${490 - 22}Z" clip-rule="evenodd"/></clipPath></defs>`;
  const stones = (() => { let q = ''; for (let r = 0; r < 12; r++) { const y = DK - 30 + r * 22; for (let c = -1; c < 20; c++) q += `<rect x="${c * 44 - 40 + (r % 2) * 22}" y="${y}" width="42" height="20" fill="none" stroke="#7a6a52" stroke-width="1.6" opacity=".7"/>`; } return q; })();
  const bridgeArt = `<g clip-path="url(#gvBrC)"><rect x="-40" y="${DK - 30}" width="800" height="${PH - DK + 30}" fill="url(#gvStone)"/><rect x="-40" y="${DK - 30}" width="800" height="${PH - DK + 30}" fill="#000" filter="url(#grainR)" opacity=".18"/>${stones}<rect x="-40" y="${DK - 30}" width="800" height="8" fill="#fff" opacity=".25"/>` +
    arches.map(([a, b]) => `<path d="M${a + 22},${DK + 70} Q${(a + b) / 2},${DK - 40} ${b - 22},${DK + 70}" stroke="#000" stroke-width="22" fill="none" opacity=".18"/>`).join('') + `</g>` +
    `<rect x="-40" y="${DK - 58}" width="800" height="28" fill="#c8b490"/><rect x="-40" y="${DK - 58}" width="800" height="5" fill="#fff" opacity=".3"/>` + Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40 - 30}" y="${DK - 54}" width="10" height="24" fill="#a89070"/>`).join('');
  const cr = `${crackL(360, DK + 22, 120, 1.4, ck, 311)}${crackL(352, DK + 18, 110, 2.2, ck, 312)}${crackL(240, DK - 20, 90, 1.3, ck * .9, 313, 2.5)}${crackL(480, DK - 20, 90, 1.9, ck * .9, 314, 2.5)}${crackL(110, DK - 10, 80, 1.5, ck * .7, 315, 2)}`;
  s += `<g clip-path="url(#gvSideC)">${bridgeArt}${cr}</g>`;
  s += `<g clip-path="url(#gvMidC)"><g transform="translate(0,${g1(drop)}) rotate(${g1(6 * sag * (fall > .15 ? 1 : 0))},360,${DK})">${bridgeArt}${cr}</g></g>`;
  // splashes and dust when the span hits the water
  const sp = ramp(t, WS(5, 9) + .75, WS(5, 9) + 1.8);
  if (sp > 0) { const r = RS(919);
    for (let i = 0; i < 9; i++) { const x = 270 + i * 23 + r() * 10, h = (120 + r() * 160) * Math.sin(Math.PI * Math.min(1, sp * 1.3)), w = 14 + r() * 12; if (h > 2) s += `<path d="M${g1(x - w / 2)},${WY - 34} Q${g1(x)},${g1(WY - 34 - h * 1.3)} ${g1(x + w / 2)},${WY - 34}Z" fill="#eef6fa" opacity="${g1(.75 * (1 - sp))}" filter="url(#blur2)"/>`; }
    for (let i = 0; i < 18; i++) { const a = -Math.PI * (.12 + .76 * r()), v = (150 + r() * 160) * sp; s += `<circle cx="${g1(360 + Math.cos(a) * v * 1.2)}" cy="${g1(WY - 34 + Math.sin(a) * v * (1 - sp) * 1.5 + 60 * sp * sp)}" r="${g1(4 + r() * 4)}" fill="#e8f4fa" opacity="${g1(.85 * (1 - sp))}"/>`; }
    for (let i = 0; i < 3; i++) { const k = clamp(sp * 1.2 - i * .2); if (k > 0) s += `<ellipse cx="360" cy="${WY - 26}" rx="${g1(110 + 260 * k)}" ry="${g1(10 + 26 * k)}" fill="none" stroke="#e8f4fa" stroke-width="3" opacity="${g1(.6 * (1 - k))}"/>`; } }
  if (fall > .1) s += `<ellipse cx="360" cy="${DK + 40}" rx="${g1(120 + 200 * fall)}" ry="${g1(60 + 90 * fall)}" fill="url(#dustG)" opacity="${g1(.75 * (1 - fall * .5))}"/>`;
  // the load: a heavy down arrow on the bridge
  const la = ease(ramp(t, WS(5, 4) - .2, WS(5, 6))) * (1 - ease(ramp(t, WS(5, 9), WS(5, 9) + .4)));
  if (la > 0) s += `<g opacity="${g1(la)}">${[0, 1].map(i => chev(360, DK - 150 + i * 36 + pmod(T * 40, 36), 2, 0, .95, '#ff8a6a')).join('')}${panel(250, 520, 220, 60)}${gvL(360, 560, 'وزنٌ مضاعف', 1, '#ff9a7a', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: planes need a higher take-off speed; rockets need far more fuel ----------
function shotPlane(t) {
  const t0 = S0(6) - .3, T = Math.max(0, t - t0), HZ = 900, RY = 1060;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(580, 480, .8) + cumulus(200 + T * 6, 540, 260, 111, { a: .85 }) + cumulus(560 + T * 4, 640, 180, 113, { a: .7 });
  s += farCity(91, HZ, '#a4acbc') + `<rect x="-20" y="${HZ}" width="760" height="400" fill="url(#gvGrass)"/><rect x="-20" y="${HZ}" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<path d="M-20,${RY - 70} H740 V${RY + 80} H-20Z" fill="url(#gvRun)"/><rect x="-20" y="${RY - 70}" width="760" height="150" fill="#000" filter="url(#grainR)" opacity=".35"/>` + Array.from({ length: 8 }, (_, i) => `<rect x="${i * 110 - 40}" y="${RY + 4}" width="60" height="7" fill="#f2f2ee" opacity=".85"/>`).join('') +
    `<path d="M-20,${RY - 64} H740 M-20,${RY + 74} H740" stroke="#f2f2ee" stroke-width="3" opacity=".7"/>`;
  // the run: accelerate along the runway; today's lift-off point (ghost) vs the new one, much later
  const xAt = (tt, a) => -300 + .5 * a * tt * tt, aa = 270;
  const xg = xAt(T, aa), gl = clamp((xg - 300) / 300), xr = xAt(T, aa), rl = clamp((xr - 590) / 300);
  const ghost = `<g opacity=".38">${`<g transform="translate(${g1(xg)},${g1(RY - 40 - 220 * gl * gl)}) rotate(${g1(-9 * Math.min(1, gl * 3))})">` + jetOnGround(0, 0, .8, 1) + `</g>`}</g>`;
  s += `<path d="M300,${RY - 90} v40" stroke="#fff" stroke-width="4"/><path d="M300,${RY - 90} l30,8 l-30,8Z" fill="#cfe8ff"/>` + gvL(300, RY - 106, 'اليوم', 1, '#cfe8ff', 26);
  s += `<path d="M590,${RY - 90} v40" stroke="#fff" stroke-width="4"/><path d="M590,${RY - 90} l30,8 l-30,8Z" fill="#ff9a7a"/>` + gvL(590, RY - 106, 'الجاذبيّة ×٢', 1, '#ff9a7a', 26);
  if (xg < 900) s += ghost;
  s += `<g transform="translate(${g1(xr)},${g1(RY - 40 - 200 * rl * rl)}) rotate(${g1(-9 * Math.min(1, rl * 3))})">` + jetOnGround(0, 0, .8, 1) + `</g>`;
  const lb = ease(ramp(t, WS(6, 2) - .2, WS(6, 3)));
  if (lb > 0) s += `<g opacity="${g1(lb)}">${panel(160, 400, 400, 64)}${gvL(360, 444, 'سرعةُ إقلاعٍ أكبر', 1, '#f4c76b', 32)}</g>`;
  return s;
}
function shotRocket(t) {
  const t0 = WS(6, 5) - .25, lt = WS(6, 6), up = Math.pow(ramp(t, lt, lt + 3.5), 2.2), GY = 1080;
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#gvDusk)"/>` + stars2(50, 18, .5, 600);
  s += `<rect x="-20" y="${GY - 20}" width="760" height="40" fill="#e8a070" opacity=".6"/><path d="M-20,${GY} L740,${GY - 6} L740,1300 L-20,1300Z" fill="#4a4e44"/><rect x="-20" y="${GY}" width="760" height="240" fill="#000" filter="url(#grainR)" opacity=".25"/><path d="M120,${GY + 4} L620,${GY} L660,${GY + 70} L80,${GY + 76}Z" fill="#8a8680"/>`;
  s += gantry(180, GY, 380) + gantry(560, GY, 720);
  // today's rocket (left) and the one a double-gravity world would need (right): much taller and fatter
  s += saturnV(260, GY, .58);
  const ry = GY - 1400 * up;
  if (t > lt) { s += trail(450, ry + 10, GY + 40, 70, t, .9 * (1 - ramp(up, .6, 1))); s += `<g transform="translate(450,${g1(ry)}) scale(2,1.5)">${flame(0, -2, 1.2, t, ease(ramp(t, lt, lt + .25)))}</g>`; const sm = ease(ramp(t, lt, lt + 1.4)), fo = 1 - ramp(t, lt + 2.5, lt + 4.5), rr = RS(431); for (let i = 0; i < 22; i++) { const side = i % 2 ? 1 : -1, d = (40 + rr() * 260) * sm, x = 450 + side * d, y = GY - 20 - rr() * 70 * sm - Math.max(0, 60 - d * .2), r = (30 + rr() * 40) * (.4 + .6 * sm); s += `<circle cx="${g1(x)}" cy="${g1(y)}" r="${g1(r)}" fill="${i % 3 ? '#efe8e0' : '#d8d0c8'}" opacity="${g1(.8 * fo)}" filter="url(#blur5)"/>`; } }
  s += `<g transform="translate(450,${g1(ry)}) scale(1.95,1.2) translate(-450,${-ry})">${saturnV(450, ry, .58)}</g>`;
  s += gvL(260, GY + 46, 'اليوم', 1, '#cfe8ff', 26) + gvL(450, GY + 46, 'بجاذبيّةٍ مضاعفة', ease(ramp(t, t0, t0 + .4)) * (1 - up * 4 > 0 ? 1 : 0), '#ff9a7a', 26);
  const fa = ease(ramp(t, WS(6, 6) - .2, WS(6, 7)));
  if (fa > 0) s += `<g opacity="${g1(fa)}">${panel(150, 400, 420, 64)}${gvL(360, 444, 'وقودٌ أكثرُ بكثير', 1, '#f4c76b', 32)}</g>`;
  return s;
}
function sceneFly(t) { let s = `<defs>${GVDEFS()}</defs>` + gvSubs(t, [[S0(6) - .2, shotPlane], [WS(6, 5) - .25, shotRocket]]); noEarth(); F.ov = ''; return s; }
// ---------- 7: the air is pressed down: twice the pressure; trees grow shorter ----------
function sceneAir(t) {
  const st = S0(7) - .2, T = t - st, GY = 1040, sq = ease(ramp(t, WS(7, 2) - .1, WS(7, 4) + .3)), Hs = lerp(560, 280, sq), tr = ease(ramp(t, WS(7, 7) - .1, WS(7, 11) + .4));
  let s = `<defs>${GVDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(560, 480, .8) + mountainsR(900, 150, 63, { rock: '#8a96a6', snowAt: 820 }) + forestR(950, 26, 34, 80, 67, '#3f6b35', { haze: .3, hazeCol: '#c4d0c0' }) + meadow(950, 1300, t);
  // thicker air: a soft haze that gathers near the ground
  s += `<rect x="-20" y="${g1(GY - Hs * 1.2)}" width="760" height="${g1(Hs * 1.2 + 40)}" fill="#e8f0f8" opacity="${g1(.12 + .2 * sq)}" filter="url(#blur16)"/>`;
  // air molecules: heights follow an exponential with scale height Hs (it halves)
  const r = RS(717); for (let i = 0; i < 120; i++) { const z = -Math.log(1 - r() * .985), x = pmod(r() * 760 + T * (8 + r() * 14) * (r() > .5 ? 1 : -1), 760) - 20, y = GY - 30 - z * Hs + Math.sin(t * 2 + i) * 4;
    if (y < 380) continue; s += `<circle cx="${g1(x)}" cy="${g1(y)}" r="${g1(3 + r() * 1.6)}" fill="#bfe0ff" stroke="#3a6a9a" stroke-width="1.2" opacity="${g1(.75 + .2 * r())}"/>`; }
  // trees: they grow shorter over the years
  [[110, 330, 81], [300, 300, 83], [470, 340, 85]].forEach(([x, h, sd]) => { s += `<ellipse cx="${x + 10}" cy="${GY + 6}" rx="${g1(h * .22)}" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/>` + treeR(x, GY + 4, h * lerp(1, .58, tr), sd, t); });
  if (tr > 0) s += `<g opacity="${g1(Math.min(1, tr * 3))}"><path d="M380,${GY - 340} H560" stroke="#fff" stroke-width="3" stroke-dasharray="10 8" opacity=".8"/><path d="M560,${GY - 340} V${g1(GY - 340 + 143 * tr)}" stroke="#f4c76b" stroke-width="6"/>${chev(560, GY - 340 + 143 * tr + 8, 1.2, 0, 1)}${gvL(630, GY - 250, 'أقصر', 1, '#f4c76b', 32)}</g>`;
  // the barometer: 1 -> 2 atmospheres
  const pv = 1 + sq, an = -2.2 + (pv - 1) * 2.2, GX = 170, GYc = 560;
  s += `${panel(GX - 130, GYc - 140, 260, 290)}<circle cx="${GX}" cy="${GYc}" r="96" fill="#f2eee4"/><circle cx="${GX}" cy="${GYc}" r="96" fill="none" stroke="#b8903a" stroke-width="8"/>` +
    Array.from({ length: 11 }, (_, i) => { const a = -2.2 + i * .44, R1 = i % 5 ? 80 : 72; return `<path d="M${g1(GX + Math.sin(a) * R1)},${g1(GYc - Math.cos(a) * R1)} L${g1(GX + Math.sin(a) * 90)},${g1(GYc - Math.cos(a) * 90)}" stroke="#3a3a40" stroke-width="${i % 5 ? 2 : 4}"/>`; }).join('') +
    `<text x="${g1(GX + Math.sin(-2.2) * 52)}" y="${g1(GYc - Math.cos(-2.2) * 52 + 8)}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#3a3a40">١</text><text x="${GX}" y="${GYc - 44}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#3a3a40">٢</text>` +
    `<path d="M${GX},${GYc} L${g1(GX + Math.sin(an) * 78)},${g1(GYc - Math.cos(an) * 78)}" stroke="#c8382e" stroke-width="5" stroke-linecap="round"/><circle cx="${GX}" cy="${GYc}" r="9" fill="#2a2a30"/>` + gvL(GX, GYc + 130, 'ضغطُ الهواء', 1, '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: the Moon is pulled onto a new orbit: in to a third of its distance; higher tides ----------
function sceneMoon(t) {
  const st = S0(8) - .2, T = t - st, D = 23, el = 1.1, tg = [0, 0, -2.0];
  glE(t, { d: 9.8, el: .3, lon: 30 + T * 12, clouds: .42, lights: .35 });
  const cam = orbit(D, el, .0001, tg, 30); F.w.cam = cam; const Ld = [.85, .45, .3]; F.w.L = Ld;
  const r0 = 4.2, rp = r0 / 3, a = (r0 + rp) / 2, e = (r0 - rp) / (r0 + rp), b = a * Math.sqrt(1 - e * e);
  const go = ease(ramp(t, WS(8, 1) - .1, WS(8, 9) + .1)), E = Math.PI + Math.PI * go;
  const pre = Math.PI + (t - (WS(8, 1) - .1)) * .08;    // before the pull, a slow drift on today's circle
  let mp; if (t < WS(8, 1) - .1) mp = [r0 * Math.sin(pre - Math.PI) * -1, 0, r0 * Math.cos(pre)]; else mp = [b * Math.sin(E), 0, a * (Math.cos(E) - e)];
  F.w.moon = { pos: mp, L: Ld, shC: NOFAR, shR: .001, r: .27, rot: .3 + T * .04 };
  const PR = p => proj3(cam, p);
  let ov = '';
  const circ = () => { let d = ''; for (let i = 0; i <= 90; i++) { const q = i / 90 * Math.PI * 2, [x, y] = PR([r0 * Math.sin(q), 0, r0 * Math.cos(q)]); d += (i ? ' L' : 'M') + g1(x) + ',' + g1(y); } return d; };
  const ell = k => { let d = ''; for (let i = 0; i <= 120 * k; i++) { const q = Math.PI + i / 120 * Math.PI * 2, [x, y] = PR([b * Math.sin(q), 0, a * (Math.cos(q) - e)]); d += (i ? ' L' : 'M') + g1(x) + ',' + g1(y); } return d; };
  ov += `<path d="${circ()}" stroke="#bfd8ff" stroke-width="2.5" fill="none" stroke-dasharray="10 9" opacity=".6"/>`;
  const ea = ease(ramp(t, WS(8, 3) - .2, WS(8, 5) + .3));
  if (ea > 0) ov += `<path d="${ell(ea)}" stroke="#f4c76b" stroke-width="4" fill="none" opacity=".9"/>`;
  const [ax, ay] = PR([0, 0, -r0]); ov += gvL(ax, ay - 34, 'المدارُ اليوم', ease(ramp(t, st, st + .5)) * (1 - ea * .3), '#bfd8ff', 26);
  const [qx, qy] = PR([b, 0, -a * e]); if (ea > .5) ov += gvL(qx - 70, qy + 8, 'المدارُ الجديد', ease(ramp(ea, .5, 1)), '#f4c76b', 26);
  // a third of the distance: a bracket from the Earth to the perigee
  const th = ease(ramp(t, WS(8, 8) - .1, WS(8, 10) + .2));
  if (th > 0) { const [ex, ey] = PR([0, 0, 0]), [px, py] = PR([0, 0, rp]), [fx, fy] = PR([0, 0, -r0]);
    ov += `<g opacity="${g1(th)}"><path d="M${g1(ex + 150)},${g1(ey)} V${g1(py)}" stroke="#f4c76b" stroke-width="4"/><path d="M${g1(ex + 140)},${g1(ey)} h20 M${g1(ex + 140)},${g1(py)} h20" stroke="#f4c76b" stroke-width="4"/>${gvL(ex + 150, py + 44, 'ثلثُ المسافة', 1, '#f4c76b', 30)}</g>`; }
  // the tide: an inset of a harbour wall with the water rising
  const ti = ease(ramp(t, WS(8, 11) - .2, WS(8, 11) + .3)), lv = ease(ramp(t, WS(8, 11), WS(8, 13) + .6));
  if (ti > 0) { const wy = 40 - 80 * lv;
    let inner = `<rect x="-110" y="-110" width="220" height="220" fill="#9cc4e6"/><rect x="-110" y="-20" width="220" height="40" fill="#7a8a9a"/>` +
      `<rect x="-20" y="-60" width="130" height="170" fill="#a89a84"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M-20,${-60 + i * 24} H110" stroke="#7a6e5e" stroke-width="2"/>`).join('') +
      `<rect x="10" y="-96" width="60" height="36" fill="#d8c8a8"/><path d="M4,-96 L40,-118 L76,-96Z" fill="#a84a32"/>` +
      `<path d="M-110,${g1(wy)} Q-60,${g1(wy - 8 * Math.sin(t * 3))} 0,${g1(wy)} T110,${g1(wy)} V110 H-110Z" fill="url(#gvSea)" opacity=".92"/><path d="M-110,${g1(wy)} Q-60,${g1(wy - 8 * Math.sin(t * 3))} 0,${g1(wy)} T110,${g1(wy)}" stroke="#e8f4fa" stroke-width="4" fill="none"/>` +
      `<path d="M-90,40 H-30" stroke="#fff" stroke-width="3" stroke-dasharray="6 6" opacity=".8"/>`;
    ov += gvInset(140, 1110, inner, ti, 92, 'td') + gvL(150, 1246, 'مدٌّ أعلى بكثير', ti, '#f4c76b', 28); }
  F.ov = `<defs>${GVD}</defs>` + ov; return space(t);
}
// ---------- 9: the twist: you have felt it, at the bottom of a roller coaster, for seconds only ----------
const CPTS = [[-60, 940], [60, 790], [170, 650], [240, 590], [290, 600], [340, 690], [390, 860], [440, 990], [500, 1036], [560, 1010], [620, 920], [690, 780], [760, 650], [840, 560]];
const CPOLY = (() => { const P = CPTS, out = []; for (let i = 0; i < P.length - 1; i++) { const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(P.length - 1, i + 2)];
  for (let k = 0; k < 20; k++) { const u = k / 20, u2 = u * u, u3 = u2 * u; out.push([0, 1].map(j => .5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3))); } }
  out.push(P[P.length - 1]); const L = [0]; for (let i = 1; i < out.length; i++) L.push(L[i - 1] + Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1])); return { out, L }; })();
const CPT = u => { const { out, L } = CPOLY, tl = L[L.length - 1], d = clamp(u) * tl; let i = 1; while (i < L.length - 1 && L[i] < d) i++; const k = (d - L[i - 1]) / Math.max(1e-6, L[i] - L[i - 1]); return [lerp(out[i - 1][0], out[i][0], k), lerp(out[i - 1][1], out[i][1], k)]; };
const CU = x => { const { out, L } = CPOLY; let best = 0; out.forEach((p, i) => { if (Math.abs(p[0] - x) < Math.abs(out[best][0] - x)) best = i; }); return L[best] / L[L.length - 1]; };
function coasterTrack() { let d = '', d2 = ''; for (let i = 0; i <= 160; i++) { const [x, y] = CPT(i / 160); d += (i ? ' L' : 'M') + g1(x) + ',' + g1(y); d2 += (i ? ' L' : 'M') + g1(x) + ',' + g1(y + 14); }
  let s = ''; for (let i = 0; i <= 26; i++) { const [x, y] = CPT(i / 26); if (y > 1180 || x < -30 || x > 750) continue; s += `<path d="M${g1(x)},${g1(y + 14)} V1180" stroke="#8a9aa8" stroke-width="7"/>`; if (i % 2 === 0 && i < 26) { const [x2, y2] = CPT((i + 2) / 26); s += `<path d="M${g1(x)},${g1(Math.max(y, y2) + 60)} L${g1(x2)},1180 M${g1(x2)},${g1(Math.max(y, y2) + 60)} L${g1(x)},1180" stroke="#7a8a98" stroke-width="3" opacity=".8"/>`; } }
  return s + `<path d="${d2}" stroke="#7a2a2c" stroke-width="8" fill="none"/><path d="${d}" stroke="url(#gvSteel)" stroke-width="9" fill="none"/><path d="${d}" stroke="#fff" stroke-width="2" fill="none" opacity=".35"/>` +
    Array.from({ length: 60 }, (_, i) => { const [x, y] = CPT(i / 60); return `<path d="M${g1(x)},${g1(y)} v14" stroke="#5a1e20" stroke-width="3"/>`; }).join(''); }
function cart(x, y, ang, press, i) { // a coaster car with two riders: arms up, pressed down at the bottom
  const sk = ['#c89070', '#8d5a3b', '#e0b48a', '#a8744c', '#d8a888', '#6a4a32'][i % 6], hr = ['#2a1e18', '#17110d', '#5a3a22', '#1d1612', '#8a5a2a', '#0e0a08'][i % 6], top = ['#e85a2a', '#2e6aa8', '#4e8a3a', '#a83a5a', '#e8b84a', '#5a4a8a'][i % 6];
  const ry = 6 * press, armUp = 1 - press * .8;
  const rider = (dx, k) => `<g transform="translate(${dx},${g1(-30 + ry)})"><rect x="-11" y="-6" width="22" height="26" rx="8" fill="${top}"/><rect x="-11" y="-6" width="22" height="26" rx="8" fill="#000" opacity=".18"/>` +
    `<path d="M-8,0 L${g1(-14 - 4 * armUp)},${g1(-26 * armUp + 6)} M8,0 L${g1(14 + 4 * armUp)},${g1(-26 * armUp + 6)}" stroke="${top}" stroke-width="7" stroke-linecap="round"/><circle cx="${g1(-14 - 4 * armUp)}" cy="${g1(-26 * armUp + 6)}" r="4" fill="${sk}"/><circle cx="${g1(14 + 4 * armUp)}" cy="${g1(-26 * armUp + 6)}" r="4" fill="${sk}"/>` +
    `<rect x="-4" y="-14" width="8" height="9" fill="${sk}"/><ellipse cx="0" cy="-22" rx="10" ry="12" fill="${sk}"/><path d="M-10,-24 Q-10,-36 0,-35 Q10,-36 10,-24 Q4,-30 -2,-29 Q-8,-28 -10,-24Z" fill="${hr}"/><ellipse cx="-4" cy="-20" rx="5" ry="9" fill="#000" opacity=".1"/></g>`;
  return `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(ang)})">${rider(-14, 0)}${rider(16, 1)}<path d="M-34,-8 L34,-8 L30,10 L-30,10Z" fill="#2a5aa8"/><path d="M-34,-8 L34,-8 L32,-2 L-32,-2Z" fill="#fff" opacity=".3"/><rect x="-36" y="-24" width="8" height="18" rx="3" fill="#1e3e78"/><circle cx="-20" cy="12" r="6" fill="#1a1a1e"/><circle cx="20" cy="12" r="6" fill="#1a1a1e"/></g>`;
}
function sceneCoaster(t) {
  const st = S0(9) - .2, T = t - st, crest = WS(9, 8), bot = crest + 1.5, out = bot + 1.6;
  let s = `<defs>${GVDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#gvSky)"/>` + sun3(600, 470, .8) + cumulus(240 + T * 3, 470, 260, 121, { a: .8 }) + farCity(73, 1000, '#a4acbc') + forestR(1020, 26, 30, 60, 79, '#3f6b35', { haze: .3, hazeCol: '#c4d0c0' }) + meadow(1010, 1300, t);
  s += coasterTrack();
  // the lead car along the track: slow up the lift hill, fast down the drop, through the valley and away
  const uC = CU(262), uB = CU(500), sp = .045;
  let u; if (t < crest) u = lerp(CU(-20), uC + sp, clamp((t - st) / (crest - st))); else if (t < bot) u = lerp(uC + sp, uB + sp * 1.5, Math.pow(clamp((t - crest) / (bot - crest)), 1.7)); else u = lerp(uB + sp * 1.5, 1.25, clamp((t - bot) / (out - bot)));
  let cars = '';
  for (let i = 0; i < 4; i++) { const ui = u - i * sp; if (ui < .005 || ui > .995) continue; const [x, y] = CPT(ui), [x2, y2] = CPT(Math.min(.999, ui + .004)), ang = Math.atan2(y2 - y, x2 - x) * 57.3;
    const press = clamp(1 - Math.abs(ui - uB) / .06); cars = cart(x, y - 4, ang, press, i) + cars; }
  s += cars;
  // spectators on the ground, small and to true scale
  s += hero(250, 1236, Object.assign({ s: .62, face: 1, shade: 1, lookUp: .45 }, gp(2))) + hero(320, 1246, Object.assign({ s: .64, face: 1, shade: 1, lookUp: .4 }, gp(4)));
  // the weight meter
  const ma = ease(ramp(t, WS(9, 9) - .3, WS(9, 9) + .2)), gv = 1 + 1.75 * ease(ramp(t, bot - .5, bot)) * (1 - ease(ramp(t, WS(9, 15), WS(9, 16) + .3)));
  if (ma > 0) { const bw = 300 * clamp((gv - .5) / 2.5);
    s += `<g opacity="${g1(ma)}">${panel(60, 400, 360, 120)}${gvL(240, 440, 'ثقلُك', 1, '#cfd8e4', 26)}<rect x="90" y="462" width="300" height="26" rx="10" fill="#2a3040"/><rect x="${g1(390 - bw)}" y="462" width="${g1(bw)}" height="26" rx="10" fill="url(#gvBarR)"/>` +
      `<path d="M${g1(390 - 300 * (1.5 / 2.5))},456 v38" stroke="#fff" stroke-width="3"/>${gvL(390 - 300 * (1.5 / 2.5), 512, '×٢', 1, '#fff', 22)}<path d="M${g1(390 - 300 * (.5 / 2.5))},456 v38" stroke="#fff" stroke-width="2" opacity=".6"/>${gvL(390 - 300 * (.5 / 2.5), 512, '×١', 1, '#cfd8e4', 22)}</g>`; }
  // a stopwatch: seconds only
  const sw = ease(ramp(t, WS(9, 14) - .2, WS(9, 14) + .2));
  if (sw > 0) { const sec = Math.min(3, Math.max(0, t - WS(9, 14))), an = sec / 60 * Math.PI * 2 * 10;
    s += `<g opacity="${g1(sw)}" transform="translate(560,640)"><circle r="78" fill="#0a0e1c" opacity=".8"/><circle r="66" fill="#f2eee4"/><circle r="66" fill="none" stroke="#b8903a" stroke-width="6"/><rect x="-10" y="-96" width="20" height="18" rx="4" fill="#b8903a"/>` +
      Array.from({ length: 12 }, (_, i) => `<path d="M${g1(Math.sin(i * .5236) * 56)},${g1(-Math.cos(i * .5236) * 56)} L${g1(Math.sin(i * .5236) * 62)},${g1(-Math.cos(i * .5236) * 62)}" stroke="#3a3a40" stroke-width="3"/>`).join('') +
      `<path d="M0,0 L${g1(Math.sin(an) * 52)},${g1(-Math.cos(an) * 52)}" stroke="#c8382e" stroke-width="4" stroke-linecap="round"/><circle r="6" fill="#2a2a30"/></g>${gvL(560, 760, 'ثوانٍ فقط', sw, '#f4c76b', 32)}`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 40 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 7) - .3, WS(10, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHookG }, { s: WS(0, 6) - .3, f: sceneSink }, { s: S0(1) - .2, f: sceneScale }, { s: S0(2) - .2, f: sceneSlow }, { s: S0(3) - .2, f: sceneHeart }, { s: S0(4) - .2, f: sceneFall },
  { s: S0(5) - .2, f: sceneBridge }, { s: S0(6) - .2, f: sceneFly }, { s: S0(7) - .2, f: sceneAir }, { s: S0(8) - .2, f: sceneMoon }, { s: S0(9) - .2, f: sceneCoaster }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHookG, sceneScale, sceneHeart, sceneFall, sceneAir, sceneMoon, sceneCoaster]);
const XF = .5;
const TLI = [['وزنُك', S0(1)], ['السقوط', S0(4)], ['الجسور', S0(5)], ['الطيران', S0(6)], ['الهواء', S0(7)]];
const LIST_ON = new Set([sceneAir]);
const CHIPS = [
  ['c0', 'الجاذبيّةُ ×٢', 360, 330, 'red big', WS(0, 3), S0(1) - .3],
  ['c1', 'وزنُك ×٢', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'كلُّ خطوةٍ أثقل', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', 'خطرُ الإغماء', 360, 330, 'red big', WS(3, 9), S0(4) - .3],
  ['c4', 'طاقةُ الارتطام ×٢', 360, 330, 'big', WS(4, 5), WS(4, 6) - .3],
  ['c5', 'حِملٌ مضاعف', 360, 330, 'red big', WS(5, 5), S0(6) - .3],
  ['c7', 'ضغطُ الهواء ×٢', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c8', 'مدارٌ جديد للقمر', 360, 330, 'big', WS(8, 4), WS(8, 8)],
  ['c9', 'جرّبتَه من قبل!', 360, 330, 'red big', WS(9, 1), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 7) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">لو تضاعفَت الجاذبيّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
