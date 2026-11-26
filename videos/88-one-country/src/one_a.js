// one_a.js (#88): what if the whole world became one country? Built on the #87 chain (streetD, hero, glE/gW, schoolB, jetOnGround, sun3).
const o1 = v => (+v).toFixed(1);
const oL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const OND = `<linearGradient id="onSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a74ba"/><stop offset=".6" stop-color="#9cc4e6"/><stop offset="1" stop-color="#f2e2c8"/></linearGradient>
<linearGradient id="onRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5c62"/><stop offset="1" stop-color="#3c3e44"/></linearGradient>
<linearGradient id="onGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9cc8"/><stop offset=".7" stop-color="#b8d4ea"/><stop offset="1" stop-color="#d8e4ea"/></linearGradient>
<linearGradient id="onFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfd2d4"/><stop offset="1" stop-color="#9ea2a6"/></linearGradient>
<linearGradient id="onBooth" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8ecee"/><stop offset=".6" stop-color="#c8ced2"/><stop offset="1" stop-color="#9aa2a8"/></linearGradient>
<linearGradient id="onStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6dcc8"/><stop offset="1" stop-color="#b8aa90"/></linearGradient>
<linearGradient id="onCol" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfb49e"/><stop offset=".45" stop-color="#f4eee0"/><stop offset="1" stop-color="#a89c84"/></linearGradient>
<linearGradient id="onCoin" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8782a"/><stop offset=".4" stop-color="#ffe08a"/><stop offset=".7" stop-color="#e8b44a"/><stop offset="1" stop-color="#9a6a22"/></linearGradient>
<linearGradient id="onOlive" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e7a4a"/><stop offset="1" stop-color="#4a5432"/></linearGradient>
<linearGradient id="onWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc6"/><stop offset="1" stop-color="#cbbca2"/></linearGradient>
<linearGradient id="onPlate" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d6d8da"/></linearGradient>
<linearGradient id="onBarG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8902a"/><stop offset=".5" stop-color="#ffe08a"/><stop offset="1" stop-color="#c8902a"/></linearGradient>
<linearGradient id="onBarB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a5a9a"/><stop offset=".5" stop-color="#7ab8f0"/><stop offset="1" stop-color="#2a5a9a"/></linearGradient>
<linearGradient id="onHsh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
<radialGradient id="onGlow"><stop offset="0" stop-color="#fff4c8" stop-opacity=".85"/><stop offset=".45" stop-color="#f4c76b" stop-opacity=".3"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="onIn" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#9cc4e6"/><stop offset="1" stop-color="#5a8ab8"/></radialGradient>
<radialGradient id="onLamp"><stop offset="0" stop-color="#fff6d0" stop-opacity=".9"/><stop offset=".4" stop-color="#ffe9a0" stop-opacity=".35"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>`;
const ONDEFS = () => `${TDEFS()}${GNDEF}${IQDEF}${HIDEF2}${CBDEF}${SCDEF}${OND}`;
const onSort = L => L.sort((p, q) => p[0] - q[0]).map(p => p[1]).join('');
function onSubs(t, P, d = .35) {
  let i = 0; P.forEach((p, j) => { if (t >= p[0]) i = j; });
  const k = i > 0 ? ease(ramp(t, P[i][0], P[i][0] + d)) : 1;
  return k < 1 ? P[i - 1][1](t) + `<g opacity="${Math.round(k * 100) / 100}">${P[i][1](t)}</g>` : P[i][1](t);
}
function onInset(x, y, inner, a, R = 100, id = 'i') {
  if (a <= 0) return ''; const k = .7 + .3 * Math.min(1, a * 1.3);
  return `<g opacity="${o1(Math.min(1, a))}" transform="translate(${x},${y}) scale(${Math.round(k * 100) / 100})"><defs><clipPath id="onC${id}"><circle r="${R}"/></clipPath></defs><circle r="${R + 6}" fill="#0a0e1c" opacity=".55"/><g clip-path="url(#onC${id})"><circle r="${R}" fill="url(#onIn)"/>${inner}</g><circle r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
}
// hands on the knees, bent over (from #87)
function onRest(x, y, s, f, pal, k = 1) {
  return hero(x, y, Object.assign({ s, face: f, shade: 1, lean: 40 * k, lookUp: -.1, lF: [.35 * k + .1, -.3 * k + .06], lB: [.2 * k - .1, -.42 * k - .14] }, pal, k > .3 ? { hF: [x + f * 52 * s, y - 92 * s], hB: [x + f * 40 * s, y - 96 * s] } : {}));
}
// a side-view car (people_helpers car) whose wheels turn with the distance driven
function onCar(x, y, s, col, f, dist) {
  const a = (dist / (20 * s)) * 57.3;
  const spk = cx => `<g transform="translate(${cx},-18) rotate(${o1(a * f)})"><path d="M-9,0 H9 M0,-9 V9" stroke="#5a5a60" stroke-width="3"/></g>`;
  return car(x, y, s, col, f) + `<g transform="translate(${x},${y}) scale(${f * s},${s})">${spk(-72)}${spk(76)}</g>`;
}
// ---------- 0: hook: a border post on a road; the barrier lifts, the fence dissolves into gold dust ----------
const ONFEN = (u) => [lerp(352, 236, Math.pow(u, .8)), lerp(1036, 905, Math.pow(u, .7))]; // the fence line receding to the horizon (u 0 near -> 1 far)
function sceneHook(t) {
  const lift = WS(0, 2) - .05, open = ease(ramp(t, lift, lift + .7)), go = Math.max(0, t - lift - .5), dis = ramp(t, WS(0, 6) - .2, WS(0, 10) + .3);
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#onSky)"/>` + sun3(590, 520, .85) + cumulus(220 + t * 4, 520, 240, 31, { a: .8 }) + cumulus(560 + t * 3, 610, 170, 33, { a: .65 });
  s += `<g transform="translate(360,1240) scale(1.45) translate(-360,-1240)">` + mountainsR(870, 150, 41, { rock: '#8a96a6', snowAt: 790 }) + forestR(905, 30, 26, 60, 43, '#41703a', { haze: .35, hazeCol: '#c4d0c0' }) + meadow(905, 1300, t);
  // the fence: posts and a mesh band, receding over the meadow; it dissolves from the road outward
  let fen = '', dust = '';
  for (let i = 0; i < 26; i++) { const u = i / 25, [x, y] = ONFEN(u), h = lerp(96, 12, Math.pow(u, .6)), w = lerp(6, 1.2, u), keep = clamp((u - dis * 1.25 + .05) / .08);
    if (i < 25) { const [x2, y2] = ONFEN((i + 1) / 25), h2 = lerp(96, 12, Math.pow((i + 1) / 25, .6));
      if (keep > 0) fen += `<path d="M${o1(x)},${o1(y - h * .92)} L${o1(x2)},${o1(y2 - h2 * .92)} L${o1(x2)},${o1(y2 - h2 * .15)} L${o1(x)},${o1(y - h * .15)}Z" fill="#c8ccd0" opacity="${o1(.28 * keep)}"/><path d="M${o1(x)},${o1(y - h * .92)} L${o1(x2)},${o1(y2 - h2 * .92)} M${o1(x)},${o1(y - h * .5)} L${o1(x2)},${o1(y2 - h2 * .5)} M${o1(x)},${o1(y - h * .15)} L${o1(x2)},${o1(y2 - h2 * .15)}" stroke="#5a6066" stroke-width="${o1(w * .45)}" opacity="${o1(keep)}"/>`; }
    if (keep > 0) fen += `<rect x="${o1(x - w / 2)}" y="${o1(y - h)}" width="${o1(w)}" height="${o1(h)}" fill="#4a5056" opacity="${o1(keep)}"/><rect x="${o1(x - w / 2)}" y="${o1(y - h)}" width="${o1(w * .35)}" height="${o1(h)}" fill="#fff" opacity="${o1(.3 * keep)}"/>`;
    if (keep < 1 && keep > -6) { const r = RS(700 + i), q = clamp(-keep / 6); for (let j = 0; j < 4; j++) { const px = x + (r() - .5) * 20 + q * 30 * (r() - .3), py = y - h * r() - q * 90 * r(); dust += `<circle cx="${o1(px)}" cy="${o1(py)}" r="${o1(lerp(3.5, 1.2, u))}" fill="#ffe08a" opacity="${o1((1 - q) * .9)}"/>`; } } }
  s += fen + dust;
  // the road across the screen (two lanes)
  const RT = 1036, RB = 1176;
  s += `<rect x="-20" y="${RT - 8}" width="760" height="8" fill="#a89a80"/><rect x="-20" y="${RT}" width="760" height="${RB - RT}" fill="url(#onRoad)"/><rect x="-20" y="${RT}" width="760" height="${RB - RT}" fill="#000" filter="url(#grainR)" opacity=".35"/>` +
    Array.from({ length: 9 }, (_, i) => `<rect x="${i * 96 - 20}" y="${(RT + RB) / 2 - 3}" width="54" height="6" fill="#e8e4d4" opacity=".85"/>`).join('') + `<rect x="-20" y="${RB}" width="760" height="8" fill="#b8aa8e"/>`;
  // the border post: a booth behind the road with a sign, and the stop line
  const pa = 1 - ease(dis);
  if (pa > 0) s += `<g opacity="${o1(pa)}"><rect x="402" y="${RT - 150}" width="96" height="150" fill="url(#onBooth)"/><rect x="402" y="${RT - 150}" width="96" height="150" fill="#000" filter="url(#grainR)" opacity=".08"/><rect x="412" y="${RT - 128}" width="76" height="56" fill="#5a86a8"/><path d="M416,${RT - 76} L440,${RT - 126}" stroke="#fff" stroke-width="8" opacity=".25"/><rect x="394" y="${RT - 162}" width="112" height="16" fill="#8a9298"/><rect x="380" y="${RT - 220}" width="140" height="50" rx="6" fill="#2a4a7a"/><text x="450" y="${RT - 186}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">نقطةُ الحدود</text><rect x="448" y="${RT - 170}" width="4" height="10" fill="#555"/>` +
    `<rect x="326" y="${RT + 4}" width="8" height="${RB - RT - 8}" fill="#f2f2ee" opacity=".8"/></g>`;
  // queued cars: far lane drives left, near lane drives right; they wait, then go
  const v = 0;
  const far = [[580, '#3a6a9a'], [740, '#a8a8ae'], [900, '#7a3a4a'], [1080, '#d8d0b8'], [1260, '#3a5a3a'], [1450, '#8a8e94'], [1640, '#c0392b']], near = [[-780, '#5a3a6a'], [-610, '#d8d0b8'], [-430, '#e8b43a'], [-260, '#4a6a9a'], [-90, '#c0392b'], [70, '#e8e4dc'], [232, '#2e5e3e']];
  const dist = g => g < 1.5 ? 120 * g * g : 270 + 360 * (g - 1.5);
  far.forEach(([x0, c], i) => { const d = dist(go); const x = x0 - d; if (x > -120 && x < 860) s += onCar(x, RT + 52, .55, c, -1, d); });
  // the barrier: a red-white boom in 3/4 view, pivot near the kerb; it swings up
  const PX = 312, PY = RB - 6, ang = lerp(-66, -90, open) * Math.PI / 180, L = 150 - 0 * open, ex = PX + Math.cos(ang) * L * (1 - open * .62) + 0, ey = PY + Math.sin(ang) * L;
  const boom = `<path d="M${PX},${PY} L${o1(ex)},${o1(ey)}" stroke="#f2f2ee" stroke-width="9" stroke-linecap="round"/><path d="M${PX},${PY} L${o1(ex)},${o1(ey)}" stroke="#d0302a" stroke-width="9" stroke-dasharray="16 16"/>`;
  near.forEach(([x0, c], i) => { const d = dist(go); const x = x0 + d; if (x > -120 && x < 860) s += onCar(x, RB - 8, .58, c, 1, d); });
  if (pa > 0) s += `<g opacity="${o1(pa)}"><rect x="${PX - 9}" y="${PY - 46}" width="18" height="52" rx="3" fill="#8a9298"/><rect x="${PX - 9}" y="${PY - 46}" width="6" height="52" fill="#fff" opacity=".3"/>${boom}</g>`;
  s += `<rect x="-200" y="${RB + 8}" width="1120" height="140" fill="#7a8a4a"/><rect x="-200" y="${RB + 8}" width="1120" height="140" fill="#000" filter="url(#grainR)" opacity=".25"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: the globe: gold points at about 195 capitals link into one network; 195 -> 1; one capital ----------
const ONCAPS = [[45.4, -75.7], [38.9, -77], [19.4, -99.1], [14.6, -90.5], [23.1, -82.4], [4.7, -74.1], [10.5, -66.9], [-.2, -78.5], [-12, -77], [-16.5, -68.1], [-15.8, -47.9], [-33.4, -70.7], [-34.6, -58.4], [-25.3, -57.6], [64.1, -21.9], [53.3, -6.3], [51.5, -.1], [38.7, -9.1], [40.4, -3.7], [48.9, 2.35], [52.5, 13.4], [41.9, 12.5], [59.9, 10.75], [59.3, 18.1], [60.2, 24.9], [52.2, 21], [50.45, 30.5], [55.75, 37.6], [37.98, 23.7], [39.9, 32.9], [30, 31.2], [34, -6.8], [36.75, 3.06], [36.8, 10.2], [32.9, 13.2], [15.5, 32.5], [9, 38.75], [-1.3, 36.8], [14.7, -17.4], [9.07, 7.4], [5.6, -.2], [-4.3, 15.3], [-8.8, 13.2], [-25.75, 28.2], [-18.9, 47.5], [24.7, 46.7], [33.3, 44.4], [35.7, 51.4], [34.5, 69.2], [33.7, 73.1], [28.6, 77.2], [23.8, 90.4], [27.7, 85.3], [39.9, 116.4], [47.9, 106.9], [37.6, 127], [35.7, 139.7], [13.75, 100.5], [21, 105.85], [-6.2, 106.8], [14.6, 121], [-35.3, 149.1], [-41.3, 174.8], [51.2, 71.4], [41.3, 69.3], [23.6, 58.4], [15.4, 44.2], [2.05, 45.3], [-6.2, 35.7], [-15.4, 28.3], [-17.8, 31.05], [12.6, -8], [13.5, 2.1], [12.1, 15.05], [44.4, 26.1], [47.5, 19.05], [50.1, 14.4], [48.2, 16.4], [46.9, 7.45], [52.4, 4.9], [42.7, 23.3], [44.8, 20.5], [40.4, 49.9], [41.7, 44.8], [31.95, 35.9], [33.9, 35.5], [25.3, 51.5], [3.1, 101.7], [1.35, 103.8], [16.8, 96.2], [11.55, 104.9], [6.9, 79.9], [-9.4, 147.2], [-18.1, 178.4], [17.97, -76.8], [18.5, -69.9], [9, -79.5], [6.8, -58.2], [-4.4, 15.3], [0.4, 9.45], [-24.65, 25.9], [-22.6, 17.1], [-26.3, 31.1], [-13.97, 33.8], [-25.97, 32.6], [0.35, 32.6], [-1.95, 30.06], [4.85, 31.6], [6.3, -10.8], [8.5, -13.2], [12.37, -1.5], [6.8, -5.3], [18.1, -15.97]];
const ONNET = (() => { const d = (a, b) => { const r = Math.PI / 180, c = Math.sin(a[0] * r) * Math.sin(b[0] * r) + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.cos((a[1] - b[1]) * r); return Math.acos(Math.max(-1, Math.min(1, c))); };
  const E = [], seen = new Set(); ONCAPS.forEach((p, i) => { ONCAPS.map((q, j) => [d(p, q), j]).filter(x => x[1] !== i).sort((a, b) => a[0] - b[0]).slice(0, 2).forEach(([dd, j]) => { const k = i < j ? i + '_' + j : j + '_' + i; if (!seen.has(k) && dd < .5) { seen.add(k); E.push([i, j]); } }); }); return E; })();
function capitol(x, y, s) {   // a generic classical government hall (no flags, no symbols)
  let g = `<g transform="translate(${x},${y}) scale(${s})"><rect x="-150" y="-12" width="300" height="12" fill="#cfc4ae"/><rect x="-140" y="-24" width="280" height="12" fill="#ddd2bc"/><rect x="-130" y="-36" width="260" height="12" fill="#e8dfcc"/>` +
    `<rect x="-120" y="-150" width="240" height="114" fill="url(#onStone)"/><rect x="-120" y="-150" width="240" height="114" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  for (let i = 0; i < 6; i++) { const cx = -100 + i * 40; g += `<rect x="${cx - 10}" y="-146" width="20" height="110" fill="url(#onCol)"/><rect x="${cx - 13}" y="-150" width="26" height="7" fill="#efe8d8"/><rect x="${cx - 13}" y="-42" width="26" height="6" fill="#d8ccb4"/>`;
    if (i < 5) g += `<rect x="${cx + 12}" y="-138" width="16" height="96" fill="#5a5448" opacity=".55"/>`; }
  g += `<rect x="-130" y="-164" width="260" height="16" fill="#efe8d8"/><rect x="-130" y="-150" width="260" height="4" fill="#000" opacity=".2"/><path d="M-136,-164 L0,-222 L136,-164Z" fill="#f2ecdc"/><path d="M-112,-170 L0,-212 L112,-170Z" fill="#d8ceb8"/><path d="M0,-222 L136,-164 L0,-164Z" fill="#000" opacity=".08"/>` +
    `<rect x="-26" y="-284" width="52" height="66" fill="url(#onStone)"/><circle cx="0" cy="-254" r="17" fill="#f8f4ea"/><circle cx="0" cy="-254" r="17" fill="none" stroke="#8a7a5a" stroke-width="3"/><path d="M0,-254 V-266 M0,-254 L8,-250" stroke="#3a3428" stroke-width="2.5"/><path d="M-32,-284 L0,-306 L32,-284Z" fill="#8a9aa8"/></g>`;
  return g;
}
function sceneCount(t) {
  const st = S0(1) - .2, T = t - st;
  const G = glE(t, { d: 9.4, el: .32, lon: 25 + T * 6, clouds: .35, lights: .25, tg: [0, -.05, 0] });
  const da = ease(ramp(t, st + .1, S0(1) + .8)), lk = ease(ramp(t, WS(1, 5) - .2, WS(1, 7) + .3));
  let ov = '';
  // links between neighbouring capitals, drawn in as the count falls
  ONNET.forEach(([i, j], n) => { const k = clamp(lk * 1.6 - (n % 11) * .06); if (k <= 0) return; const a = ONCAPS[i], b = ONCAPS[j], m = [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
    const { d } = gPath(G, [a, m]); if (d) ov += `<path d="${d}" stroke="#f4c76b" stroke-width="2.2" fill="none" opacity="${o1(.75)}" stroke-linecap="round"/>`; });
  ONCAPS.forEach(([la, lo], i) => { const v = G.vis(la, lo); if (v < .12) return; const [x, y] = G.P(la, lo, 1.01), a = da * clamp((v - .12) / .2) * clamp(da * 3 - (i % 9) * .25), pu = 1 + .25 * Math.sin(t * 4 + i);
    if (a > 0) ov += `<circle cx="${o1(x)}" cy="${o1(y)}" r="${o1(9 * pu)}" fill="url(#onGlow)" opacity="${o1(a)}"/><circle cx="${o1(x)}" cy="${o1(y)}" r="3.4" fill="#fff4c8" opacity="${o1(a)}"/>`; });
  // the counter 195 -> 1
  const n = Math.max(1, Math.round(195 - 194 * ease(ramp(t, WS(1, 5) - .1, WS(1, 7) + .2)))), ca = ease(ramp(t, S0(1) - .1, S0(1) + .3));
  ov += `<g opacity="${o1(ca)}">${panel(400, 1060, 280, 150)}<text x="540" y="1150" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="72" fill="${n === 1 ? '#f4c76b' : '#fff'}">${AR(n)}</text>${oL(540, 1192, n === 1 ? 'بلدٌ واحد' : 'دولة', 1, '#cfd8e4', 26)}</g>`;
  // one capital: a generic hall in a round inset
  const ia = ease(ramp(t, WS(1, 8) - .2, WS(1, 8) + .3));
  if (ia > 0) ov += onInset(190, 1110, `<rect x="-110" y="40" width="220" height="80" fill="#8a9a6a"/>${capitol(0, 52, .5)}`, ia, 96, 'cap') + oL(190, 1240, 'عاصمةٌ واحدة', ia, '#f4c76b', 26);
  F.ov = `<defs>${OND}</defs>` + ov; return space(t);
}
// ---------- 2: the airport: passport control disappears, everyone walks through; the board turns international -> domestic ----------
const ONDEP = [['طوكيو', '٠٨:١٥'], ['نيروبي', '٠٩:٤٠'], ['ليما', '١٠:٠٥'], ['أوسلو', '١١:٣٠'], ['سيدني', '١٢:٥٠']];
function onTrav(x, y, s, f, pal, walk, cases = 1) {   // a traveller pulling a suitcase behind
  const hb = [x - f * 30 * s, y - 108 * s];
  let g = hero(x, y, Object.assign({ s, face: f, shade: 1, hB: hb }, pal, walk != null ? { walk, amp: .45 } : {})); const H = HP.handB;
  if (cases) { const bx = H[0] - f * 44 * s, by = y - 70 * s, w = 46 * s, h = 70 * s;
    g = `<g><path d="M${o1(H[0])},${o1(H[1])} L${o1(bx + f * w * .3)},${o1(by)}" stroke="#2a2a30" stroke-width="${o1(3 * s)}"/><rect x="${o1(bx - w / 2)}" y="${o1(by)}" width="${o1(w)}" height="${o1(h)}" rx="${o1(7 * s)}" fill="${pal.bag || '#2a3a5a'}"/><rect x="${o1(bx - w / 2)}" y="${o1(by)}" width="${o1(w * .3)}" height="${o1(h)}" rx="${o1(6 * s)}" fill="#fff" opacity=".14"/><path d="M${o1(bx - w * .2)},${o1(by + 6 * s)} V${o1(by + h - 6 * s)} M${o1(bx + w * .2)},${o1(by + 6 * s)} V${o1(by + h - 6 * s)}" stroke="#000" stroke-opacity=".25" stroke-width="${o1(2 * s)}"/><circle cx="${o1(bx - w * .3)}" cy="${o1(y - 3 * s)}" r="${o1(4 * s)}" fill="#111"/><circle cx="${o1(bx + w * .3)}" cy="${o1(y - 3 * s)}" r="${o1(4 * s)}" fill="#111"/></g>` + g; }
  return `<ellipse cx="${o1(x)}" cy="${o1(y + 2)}" rx="${o1(34 * s)}" ry="${o1(6 * s)}" fill="#000" opacity=".18"/>` + g;
}
function sceneAirport(t) {
  const st = S0(2) - .2, T = t - st, no = ease(ramp(t, WS(2, 0), WS(2, 0) + .4)), gone = ease(ramp(t, WS(2, 4) - .3, WS(2, 4) + .5)), walk0 = WS(2, 5) - .6, flip = WS(2, 5);
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a3442"/>`;
  // the glass wall: sky, the apron and a parked airliner
  s += `<rect x="-20" y="380" width="760" height="520" fill="url(#onGlass)"/>` + cumulus(240 + T * 3, 520, 220, 51, { a: .7 }) + farCity(57, 800, '#a4b0c0', { hk: .5 }) +
    `<rect x="-20" y="800" width="760" height="100" fill="#8a8e92"/><rect x="-20" y="800" width="760" height="100" fill="#000" filter="url(#grainR)" opacity=".25"/>` + jetOnGround(470 + T * 4, 852, .62, -1);
  s += Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 - 24}" y="380" width="14" height="520" fill="#3a4452"/>`).join('') + `<rect x="-20" y="620" width="760" height="10" fill="#3a4452"/><rect x="-20" y="372" width="760" height="22" fill="#4a5462"/><rect x="-20" y="890" width="760" height="14" fill="#3a4452"/>`;
  // the floor: polished tiles with reflections
  s += `<rect x="-20" y="900" width="760" height="400" fill="url(#onFloor)"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${i * 90 - 60},900 L${(i * 90 - 60 - 360) * 1.8 + 360},1300" stroke="#8a8e92" stroke-width="1.5" opacity=".5"/>`).join('') +
    [940, 1000, 1080, 1180].map(y => `<path d="M-20,${y} H740" stroke="#8a8e92" stroke-width="1.5" opacity=".5"/>`).join('') + `<rect x="-20" y="900" width="760" height="120" fill="#cfe2f2" opacity=".18"/><rect x="-20" y="900" width="760" height="18" fill="url(#aoDn)" opacity=".5"/>`;
  // the departures board
  s += `<rect x="40" y="430" width="380" height="250" rx="8" fill="#0e1420"/><rect x="40" y="430" width="380" height="250" rx="8" fill="none" stroke="#5a6272" stroke-width="5"/><rect x="40" y="430" width="380" height="44" rx="6" fill="#1e2a40"/>` + oL(230, 462, 'المغادرة', 1, '#f4c76b', 26);
  ONDEP.forEach(([c, h], i) => { const y = 506 + i * 36, f = ease(ramp(t, flip + i * .15, flip + i * .15 + .25)), sq = Math.abs(Math.cos(Math.PI * f));
    s += `<text x="404" y="${y}" text-anchor="start" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#e8eef8">${c}</text><text x="250" y="${y}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#9aa6b8">${h}</text>` +
      `<g transform="translate(118,${y - 7}) scale(1,${o1(Math.max(.05, sq))})"><rect x="-62" y="-16" width="124" height="30" rx="4" fill="${f < .5 ? '#1e3a6a' : '#5a4210'}"/><text x="0" y="8" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="${f < .5 ? '#9cc8ff' : '#ffe08a'}">${f < .5 ? 'دوليّة' : 'داخليّة'}</text></g>`; });
  // passport control: sign and three booths, struck out, then gone
  const pa = 1 - gone;
  if (pa > 0) { let b = `<rect x="440" y="664" width="250" height="56" rx="8" fill="#16304e"/><text x="590" y="702" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">الجوازات</text><rect x="462" y="676" width="26" height="34" rx="4" fill="#7a2a2a"/><circle cx="475" cy="690" r="6" fill="none" stroke="#f4c76b" stroke-width="2"/><path d="M560,720 V664 M600,720 V664" stroke="#5a6272" stroke-width="0" />`;
    if (no > 0) b += `<path d="M450,712 L680,672" stroke="#e53935" stroke-width="8" stroke-linecap="round" opacity="${o1(no)}"/>`;
    [[440, 1040], [560, 1040]].forEach(([bx, by]) => { b += `<rect x="${bx}" y="${by - 150}" width="100" height="150" fill="url(#onBooth)"/><rect x="${bx}" y="${by - 150}" width="100" height="150" fill="#000" filter="url(#grainR)" opacity=".06"/><rect x="${bx + 6}" y="${by - 238}" width="88" height="90" fill="#cfe4f4" opacity=".55"/><rect x="${bx + 6}" y="${by - 238}" width="88" height="90" fill="none" stroke="#8a9298" stroke-width="4"/><rect x="${bx - 6}" y="${by - 152}" width="112" height="10" fill="#8a9298"/><rect x="${bx + 30}" y="${by - 140}" width="40" height="24" rx="3" fill="#2a3440"/>` +
      `<ellipse cx="${bx + 50}" cy="${by + 4}" rx="66" ry="8" fill="#000" opacity=".15"/>`; });
    b += `<path d="M300,1040 H436 M300,1000 V1040 M368,1000 V1040" stroke="#3a3a40" stroke-width="5"/><path d="M300,1006 H436" stroke="#2a5a9a" stroke-width="6"/>`;
    s += `<g opacity="${o1(pa)}">${b}</g>`; }
  // the queue: they wait, then walk straight through (40 px/s at s .78)
  const PAL = [Object.assign(gp(0), { bag: '#7a2a2a' }), Object.assign(gp(2), { bag: '#2a4a6a' }), Object.assign({}, YOU, { bag: '#3a3a44' }), Object.assign(gp(5), { bag: '#5a4a2a' }), Object.assign(gp(3), { bag: '#2a5a4a' })];
  const L = [];
  [[250, 1110, .8], [160, 1140, .82], [70, 1166, .86], [-30, 1120, .8], [-120, 1150, .84]].forEach(([x0, y, sc], i) => { const w = Math.max(0, t - walk0 - i * .15), x = x0 + 44 * w;
    L.push([y, onTrav(x, y, sc, 1, PAL[i], w > 0 ? w * 2.1 + i : null)]); });
  s += onSort(L);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: the exchange office: many currencies on the rates board become one ----------
const ONCUR = [['$', '٣٫٦٧'], ['€', '٤٫٠١'], ['¥', '٠٫٠٢'], ['£', '٤٫٦٢'], ['₹', '٠٫٠٤'], ['₦', '٠٫٠٠٢']];
function sceneMoney(t) {
  const st = S0(3) - .2, one = ease(ramp(t, WS(3, 2) - .1, WS(3, 3) + .1)), fee = ease(ramp(t, WS(3, 3) - .2, WS(3, 3) + .3)), zero = ease(ramp(t, WS(3, 6) - .1, WS(3, 7)));
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#onSky)"/>` + farCity(77, 600, '#9aa4b8');
  // the shop front: stone wall, sign, the big window with the board, a counter window
  s += `<rect x="-20" y="380" width="760" height="760" fill="url(#onWall)"/><rect x="-20" y="380" width="760" height="760" fill="#000" filter="url(#grainR)" opacity=".1"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M-20,${400 + i * 52} H740" stroke="#b0a288" stroke-width="2" opacity=".5"/>`).join('');
  s += `<rect x="60" y="402" width="600" height="70" rx="6" fill="#1e4a3a"/><rect x="60" y="402" width="600" height="70" rx="6" fill="none" stroke="#c8a050" stroke-width="4"/><text x="360" y="450" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="38" fill="#ffe08a">صرافة</text>` +
    `<rect x="70" y="490" width="580" height="420" fill="#cfe2f0"/><rect x="70" y="490" width="580" height="420" fill="#2a3a4a" opacity=".55"/><rect x="70" y="490" width="580" height="420" fill="none" stroke="#5a5048" stroke-width="12"/>`;
  // the LED rates board
  s += `<rect x="130" y="520" width="460" height="330" rx="10" fill="#0a0e16"/><rect x="130" y="520" width="460" height="330" rx="10" fill="none" stroke="#3a4250" stroke-width="5"/>` + oL(470, 556, 'العملة', 1, '#9aa6b8', 22) + oL(260, 556, 'السعر', 1, '#9aa6b8', 22);
  ONCUR.forEach(([c, r], i) => { const y = 600 + i * 42, k = clamp(one * 1.6 - i * .12), yy = lerp(y, 690, ease(k)), a = 1 - ease(k);
    if (a > 0) s += `<g opacity="${o1(a)}"><text x="470" y="${o1(yy)}" text-anchor="middle" direction="ltr" font-family="Inter Display, sans-serif" font-weight="700" font-size="30" fill="#ff9a3a">${c}</text><text x="260" y="${o1(yy)}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#ff9a3a">${r}</text></g>`; });
  if (one > .6) { const a = ease(ramp(one, .6, 1)), sp = Math.cos(t * 3.2);
    s += `<g opacity="${o1(a)}"><g transform="translate(360,700) scale(${o1(Math.abs(sp) * .9 + .1)},1)"><circle r="62" fill="url(#onCoin)"/><circle r="50" fill="none" stroke="#a8782a" stroke-width="4"/><text x="0" y="22" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="#7a5418">١</text></g>${oL(360, 815, 'عملةٌ واحدة', 1, '#ffe08a', 32)}</g>`; }
  // the counter ledge, the pavement, and you at the window
  s += `<rect x="40" y="908" width="640" height="22" fill="#8a7a62"/><rect x="40" y="926" width="640" height="8" fill="#000" opacity=".25"/><rect x="-20" y="1140" width="760" height="160" fill="#c4b8a4"/><rect x="-20" y="1140" width="760" height="160" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1140" width="760" height="20" fill="url(#aoDn)" opacity=".6"/>` +
    `<rect x="-20" y="1130" width="760" height="12" fill="#9a8e7a"/>`;
  s += `<ellipse cx="500" cy="1226" rx="60" ry="9" fill="#000" opacity=".2"/>` + hero(500, 1224, Object.assign({ s: 1.12, face: -1, shade: 1, lookUp: .25, hF: [404, 930], hB: [430, 950] }, YOU));
  // the receipt: exchange fees -> 0
  if (fee > 0) s += `<g opacity="${o1(fee)}">${panel(60, 980, 290, 130)}${oL(205, 1022, 'رسومُ التحويل', 1, '#cfd8e4', 26)}<text x="205" y="1082" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${zero > .5 ? 44 : 32}" fill="${zero > .5 ? '#9cf0b0' : '#ff9a7a'}">${zero > .5 ? 'صفر' : 'تخسرُ جزءاً'}</text>${zero > 0 && zero < 1 ? `<path d="M120,1078 L290,1062" stroke="#e53935" stroke-width="6" opacity="${o1(1 - zero)}"/>` : ''}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: one interest rate for two very different places: a booming city and a struggling one ----------
const ONBLKL = [[-12, 150, 560, '#8aa4b8', 881, 2], [130, 160, 640, '#c8b48a', 882, 0], [282, 150, 520, '#7a8a9a', 883, 1], [430, 160, 600, '#a88a6a', 884, 2], [586, 150, 540, '#9a9a8a', 885, 0]];
const ONBLKR = [[-12, 150, 420, '#a89a8a', 886, 1], [130, 160, 380, '#8a7a6a', 887, 0], [282, 150, 440, '#9aa0a4', 888, 2], [430, 160, 400, '#b0a08a', 889, 1], [586, 150, 420, '#8a8a7a', 890, 0]];
const ONSHL = [[-4, 140, 'مخبز', '#7a4a2a'], [152, 134, 'أثاث', '#2a5a7a'], [302, 146, 'هواتف', '#3a3a6a'], [462, 126, 'ملابس', '#7a3a5a'], [606, 146, 'مطعم', '#5a6a2a']];
function crane(x, base, h, a, t) { const ang = Math.sin(t * .4 + x) * 4;
  return `<g opacity="${o1(a)}"><path d="M${x - 8},${base} V${base - h} M${x + 8},${base} V${base - h}" stroke="#e8b43a" stroke-width="5"/>` + Array.from({ length: Math.floor(h / 24) }, (_, i) => `<path d="M${x - 8},${base - i * 24} L${x + 8},${base - i * 24 - 24}" stroke="#e8b43a" stroke-width="2.5"/>`).join('') +
    `<g transform="rotate(${o1(ang)},${x},${base - h})"><path d="M${x - 60},${base - h} H${x + 150}" stroke="#e8b43a" stroke-width="7"/><rect x="${x - 70}" y="${base - h - 6}" width="30" height="20" fill="#5a5a60"/><path d="M${x + 110},${base - h} V${base - h + 120 + 30 * Math.sin(t)}" stroke="#2a2a30" stroke-width="2"/><rect x="${x + 98}" y="${o1(base - h + 120 + 30 * Math.sin(t))}" width="24" height="14" fill="#8a6a4a"/></g></g>`; }
function sceneRate(t) {
  const st = S0(4) - .2, T = t - st, up = ease(ramp(t, WS(4, 2) - .2, WS(4, 3) + .2)) - ease(ramp(t, WS(4, 6) - .1, WS(4, 7) + .2)) * 1.6, eu = ease(ramp(t, WS(4, 10) - .2, WS(4, 11) + .2));
  // left: booming (people hurry, cranes, a price tag climbing); right: struggling (shutters down, rain, someone waits)
  const Lp = [], Rp = [];
  [[40, 1068, 1, 2, .86, .4], [250, 1080, -1, 4, .88, 1.6]].forEach(([x0, y, f, pi, sc, ph]) => { Lp.push([y, hero(x0 + f * 52 * T, y, Object.assign({ s: sc, face: f, shade: 1, walk: T * 2.6 + ph, amp: .55 }, gp(pi)))]); });
  Rp.push([1074, onRest(500, 1074, .86, 1, gp(6), .6)]); Rp.push([1090, hero(640, 1090, Object.assign({ s: .88, face: -1, shade: 1, lookUp: -.3 }, gp(1)))]);
  const Z = 'translate(360,1060) scale(1.12) translate(-360,-1060)';
  const left = `<g transform="${Z}">` + streetD(t, { id: 'rl', blocks: ONBLKL, shops: ONSHL, back: crane(150, 905, 330, 1, t) + crane(470, 905, 280, 1, t + 2), top: onSort(Lp) }) + `</g>`;
  const right = `<g transform="${Z}">` + streetD(t, { id: 'rr', N: .32, blocks: ONBLKR, shops: ONSHL, top: onSort(Rp),
    fg: Array.from({ length: 5 }, (_, i) => { const x = -4 + i * 152; return `<rect x="${x + 6}" y="${PV - 122}" width="128" height="116" fill="#8a8e94"/>` + Array.from({ length: 12 }, (_, j) => `<path d="M${x + 6},${PV - 118 + j * 10} H${x + 134}" stroke="#6a6e74" stroke-width="2"/>`).join(''); }).join('') }) + `</g>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#3a4250" opacity=".28"/>` + rain(t, .7, 110, 7);
  let s = `<defs>${ONDEFS()}<clipPath id="onLc"><rect x="-20" y="-20" width="380" height="1320"/></clipPath><clipPath id="onRc"><rect x="360" y="-20" width="380" height="1320"/></clipPath></defs>`;
  s += `<g clip-path="url(#onLc)">${left}</g><g clip-path="url(#onRc)">${right}</g><rect x="356" y="380" width="8" height="920" fill="#f4c76b"/>`;
  s += panel(30, 420, 300, 92) + oL(180, 458, 'اقتصادٌ سريع', 1, '#ffd27a', 28) + oL(180, 494, 'الأسعارُ ترتفع ↑', 1, '#ff9a7a', 22);
  s += panel(390, 420, 300, 92) + oL(540, 458, 'اقتصادٌ بطيء', 1, '#9cc8ff', 28) + oL(540, 494, 'البطالةُ ترتفع ↑', 1, '#ff9a7a', 22);
  // one dial for both: when it suits one side, it hurts the other
  const v = clamp(.5 + .42 * up, .05, .95), an = (-1.3 + 2.6 * v), DX = 360, DY = 1170;
  s += `${panel(200, 1040, 320, 200)}<path d="M${DX - 110},${DY} A110,110 0 0 1 ${DX + 110},${DY}" stroke="#3a4250" stroke-width="18" fill="none"/><path d="M${DX - 110},${DY} A110,110 0 0 1 ${DX},${DY - 110}" stroke="#5a9a6a" stroke-width="18" fill="none" opacity=".8"/><path d="M${DX},${DY - 110} A110,110 0 0 1 ${DX + 110},${DY}" stroke="#c84a3a" stroke-width="18" fill="none" opacity=".8"/>` +
    `<path d="M${DX},${DY} L${o1(DX + Math.sin(an) * 96)},${o1(DY - Math.cos(an) * 96)}" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="${DX}" cy="${DY}" r="12" fill="#f4c76b"/>` + oL(DX, 1076, 'سعرُ فائدةٍ واحد', 1, '#f4c76b', 26);
  const lk = up > .3 ? 1 : up < -.3 ? -1 : 0, ma = Math.min(1, Math.abs(up) * 2);
  if (lk) { const good = '#9cf0b0', bad = '#ff7a6a';
    s += `<g opacity="${o1(ma)}">${panel(70, 528, 220, 56)}${panel(430, 528, 220, 56)}</g>` + oL(180, 566, lk > 0 ? 'يناسبُها ✓' : 'يضرُّها ✗', ma, lk > 0 ? good : bad, 30) + oL(540, 566, lk > 0 ? 'يضرُّها ✗' : 'يناسبُها ✓', ma, lk > 0 ? bad : good, 30); }
  if (eu > 0) s += `<g opacity="${o1(eu)}" transform="translate(360,700) scale(${o1(.8 + .2 * eu)})"><circle r="78" fill="url(#onCoin)"/><circle r="64" fill="none" stroke="#a8782a" stroke-width="4"/><text x="0" y="30" text-anchor="middle" font-family="Inter Display, sans-serif" font-weight="700" font-size="88" fill="#7a5418">€</text></g>` + oL(360, 820, 'أزمةُ اليورو ٢٠١٠–٢٠١٢', eu, '#ffe08a', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: world military spending, about 2.7 trillion dollars a year; much of it could go to schools and hospitals ----------
function truckM(x, y, s, f, dist) {   // a plain olive army truck, side view, wheels turn
  const a = dist / (16 * s) * 57.3, wh = cx => `<circle cx="${cx}" cy="-16" r="17" fill="#1a1a1a"/><circle cx="${cx}" cy="-16" r="8" fill="#6a6e60"/><g transform="translate(${cx},-16) rotate(${o1(a * f)})"><path d="M-7,0 H7 M0,-7 V7" stroke="#3a3a30" stroke-width="3"/></g>`;
  return `<g transform="translate(${o1(x)},${y}) scale(${f * s},${s})"><ellipse cx="0" cy="2" rx="125" ry="8" fill="#000" opacity=".3"/><path d="M-120,-30 L-120,-110 Q-118,-116 -110,-116 L40,-116 L40,-30Z" fill="url(#onOlive)"/><path d="M-120,-30 L-120,-110 Q-118,-116 -110,-116 L40,-116 L40,-30Z" fill="url(#onHsh)"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${-100 + i * 30},-116 V-30" stroke="#3e4628" stroke-width="2" opacity=".6"/>`).join('') +
    `<path d="M46,-30 L46,-96 L86,-96 L112,-62 L118,-30Z" fill="#5e6a3e"/><path d="M54,-90 L82,-90 L102,-64 L54,-64Z" fill="#2a3a3a"/><path d="M58,-88 L68,-88 L60,-66 L56,-66Z" fill="#fff" opacity=".2"/><rect x="-124" y="-34" width="246" height="12" fill="#3a4228"/>${wh(-80)}${wh(-40)}${wh(80)}</g>`;
}
function hospitalB(x0, base, w, h) {
  const top = base - h, cx = x0 + w / 2;
  let s = `<rect x="${x0}" y="${top}" width="${w}" height="${h}" fill="#eef0f0"/><rect x="${x0}" y="${top}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".06"/><rect x="${x0 + w - 16}" y="${top}" width="16" height="${h}" fill="#000" opacity=".14"/><rect x="${x0 - 6}" y="${top - 12}" width="${w + 12}" height="14" fill="#d8dcdc"/>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) { const wx = x0 + 16 + c * (w - 32) / 4, wy = top + 70 + r * (h - 130) / 4; s += `<rect x="${o1(wx)}" y="${o1(wy)}" width="${o1((w - 32) / 4 - 14)}" height="${o1((h - 130) / 4 - 16)}" fill="#6a9ac0"/><rect x="${o1(wx)}" y="${o1(wy)}" width="${o1(((w - 32) / 4 - 14) * .4)}" height="${o1((h - 130) / 4 - 16)}" fill="#fff" opacity=".2"/>`; }
  s += `<rect x="${x0}" y="${top + 6}" width="${w}" height="44" fill="#2a6aa8"/><text x="${cx + 18}" y="${top + 38}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">مستشفى</text><path d="M${cx - 58},${top + 16} v24 M${cx - 70},${top + 28} h24" stroke="#fff" stroke-width="8"/>` +
    `<rect x="${cx - 40}" y="${base - 64}" width="80" height="64" fill="#9ac0d8"/><path d="M${cx},${base - 64} V${base}" stroke="#eef0f0" stroke-width="4"/><rect x="${cx - 54}" y="${base - 74}" width="108" height="12" fill="#2a6aa8"/>`;
  return s;
}
function sceneArmy(t) {
  const st = S0(5) - .2, T = t - st, grow = ease(ramp(t, S0(5) + .2, WS(5, 9))), to = ramp(t, WS(5, 10) - .1, WS(5, 15) + .4), bl = ease(ramp(t, WS(5, 14) - .3, WS(5, 15) + .2)), GY = 1130;
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#onSky)"/>` + sun3(600, 470, .8) + cumulus(200 + T * 3, 480, 220, 71, { a: .75 }) + mountainsR(900, 120, 73, { rock: '#8a96a6', snowAt: 0 }) + forestR(930, 26, 26, 56, 75, '#41703a', { haze: .3, hazeCol: '#c4d0c0' }) + meadow(930, 1300, t);
  // school (left) and hospital (right) rise from the ground as the money moves
  if (bl > 0) s += `<g opacity="${o1(Math.min(1, bl * 1.5))}" transform="translate(0,${o1(GY * (1 - bl))}) scale(1,${o1(bl)})">${schoolB(-10, GY, 250, 300, t)}</g><g opacity="${o1(Math.min(1, bl * 1.5))}" transform="translate(0,${o1(GY * (1 - bl))}) scale(1,${o1(bl)})">${hospitalB(470, GY, 240, 360)}</g>`;
  // the army trucks drive off when the money starts to move
  const dv = Math.max(0, t - WS(5, 10) + .2), dd = .5 * 220 * dv * dv;
  const ha = 1 - ease(ramp(t, WS(5, 12), WS(5, 14)));
  if (ha > 0) s += `<g opacity="${o1(ha)}">` + [[20, 180], [520, 170]].map(([hx, hw]) => `<path d="M${hx},${GY - 60} V${GY - 100} Q${hx + hw / 2},${GY - 170} ${hx + hw},${GY - 100} V${GY - 60}Z" fill="url(#onOlive)"/><path d="M${hx},${GY - 60} V${GY - 100} Q${hx + hw / 2},${GY - 170} ${hx + hw},${GY - 100} V${GY - 60}Z" fill="url(#onHsh)"/><ellipse cx="${hx + hw / 2}" cy="${GY - 58}" rx="${hw * .55}" ry="8" fill="#000" opacity=".25"/><path d="M${hx},${GY - 100} Q${hx + hw / 2},${GY - 170} ${hx + hw},${GY - 100}" stroke="#fff" stroke-width="3" fill="none" opacity=".25"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M${hx + (i + 1) * hw / 8},${GY - 60} V${o1(GY - 100 - 70 * Math.sin(Math.PI * (i + 1) / 8))}" stroke="#3e4628" stroke-width="2" opacity=".5"/>`).join('') + `<rect x="${hx + hw / 2 - 30}" y="${GY - 104}" width="60" height="44" fill="#2e3420"/>`).join('') +
    `<path d="M-20,${GY - 30} H740" stroke="#7a7e80" stroke-width="3"/>` + Array.from({ length: 19 }, (_, i) => `<path d="M${i * 40 - 10},${GY - 64} V${GY - 26}" stroke="#6a6e70" stroke-width="4"/>`).join('') + `<rect x="-20" y="${GY - 62}" width="760" height="32" fill="#9aa0a4" opacity=".18"/></g>`;
  [[150, -1], [560, 1]].forEach(([x, f], i) => { const a = 1 - ramp(dv, 1.2, 2); if (a > 0) s += `<g opacity="${o1(a)}">${truckM(x + f * dd, GY + 96, .8, f, dd)}</g>`; });
  // the stack of gold coins: about 2.7 trillion dollars a year
  const H = 470 * grow * (1 - .45 * ease(to)), n = Math.floor(H / 9), CX = 360;
  s += `<ellipse cx="${CX}" cy="${GY + 8}" rx="${o1(80)}" ry="12" fill="#000" opacity="${o1(.3 * Math.min(1, grow * 3))}"/>`;
  for (let i = 0; i < n; i++) { const y = GY - i * 9, wob = Math.sin(i * 1.7) * 2; s += `<ellipse cx="${o1(CX + wob)}" cy="${y}" rx="64" ry="12" fill="#9a6a22"/><rect x="${o1(CX + wob - 64)}" y="${y - 9}" width="128" height="9" fill="url(#onCoin)"/><ellipse cx="${o1(CX + wob)}" cy="${y - 9}" rx="64" ry="12" fill="#f4cf6a"/>`; }
  if (n > 0) { const y = GY - n * 9; s += `<ellipse cx="${CX}" cy="${y}" rx="44" ry="7" fill="#e8b84a"/>`; }
  // coins fly in arcs to the school and the hospital
  if (to > 0 && to < 1) { const r = RS(77); for (let i = 0; i < 16; i++) { const ph = pmod(to * 3 + r(), 1), side = i % 2 ? 1 : -1, x0 = CX, y0 = GY - H, x1 = CX + side * 230, y1 = GY - 200, x = lerp(x0, x1, ph), y = lerp(y0, y1, ph) - Math.sin(Math.PI * ph) * 150;
    s += `<g transform="translate(${o1(x)},${o1(y)}) scale(${o1(Math.abs(Math.cos(ph * 9 + i)) * .8 + .2)},1)"><circle r="13" fill="url(#onCoin)"/><circle r="9" fill="none" stroke="#a8782a" stroke-width="2"/></g>`; } }
  const la = ease(ramp(t, WS(5, 4) - .2, WS(5, 5)));
  if (la > 0) s += `<g opacity="${o1(la)}">${panel(150, 420, 420, 116)}${oL(360, 464, 'الإنفاقُ العسكريّ في العالم', 1, '#cfd8e4', 26)}<text x="360" y="518" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4c76b">≈ ٢٫٧ تريليون $ سنويّاً</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: how do you govern 8 billion people from one place? 7,000+ languages; the biggest country today has about 1.45 billion ----------
const ONCROWD = (() => { const r = RS(6061), P = []; for (let row = 0; row < 34; row++) { const u = row / 33, y = 760 + Math.pow(u, 1.6) * 520, sc = .05 + .95 * Math.pow(u, 1.6) * .62, n = Math.round(lerp(60, 13, u)); for (let i = 0; i < n; i++) P.push([(i + r() * .8) / n * 800 - 40, y + r() * 8, sc, Math.floor(r() * 7), r()]); } return P; })();
function sceneGovern(t) {
  const st = S0(6) - .2, T = t - st, hz = 740, lg = ease(ramp(t, WS(6, 6) - .2, WS(6, 10) + .2)), bars = ease(ramp(t, WS(6, 11) - .2, WS(6, 12) + .3)), b2 = ease(ramp(t, WS(6, 15) - .1, WS(6, 17) + .3));
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#onSky)"/>` + sun3(560, 470, .8) + cumulus(180 + T * 3, 470, 220, 91, { a: .7 }) + farCity(93, hz, '#a8b0c0', { hk: .8 });
  s += `<rect x="-20" y="${hz}" width="760" height="560" fill="#c8bca6"/><rect x="-20" y="${hz}" width="760" height="560" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += capitol(250, hz + 18, .55);
  // the crowd that fills the square to the horizon
  let c = ''; ONCROWD.forEach(([x, y, sc, pi, ph]) => { const p = GPAL[pi], sw = Math.sin(t * 2 + ph * 9) * 1.5 * sc, h = 150 * sc;
    c += `<path d="M${o1(x - 16 * sc + sw)},${o1(y)} L${o1(x - 14 * sc + sw)},${o1(y - h * .62)} Q${o1(x + sw)},${o1(y - h * .72)} ${o1(x + 14 * sc + sw)},${o1(y - h * .62)} L${o1(x + 16 * sc + sw)},${o1(y)}Z" fill="${p.top}"/><circle cx="${o1(x + sw)}" cy="${o1(y - h * .8)}" r="${o1(11 * sc + .6)}" fill="${p.skin}"/><path d="M${o1(x - 11 * sc + sw)},${o1(y - h * .82)} a${o1(11 * sc + .6)},${o1(10 * sc + .5)} 0 0 1 ${o1(22 * sc + 1.2)},0Z" fill="${p.hair}"/>`; });
  s += c + `<rect x="-20" y="${hz}" width="760" height="60" fill="#d8dce4" opacity=".35"/>`;
  // speech bubbles over the crowd: many languages
  if (lg > 0) { const r = RS(616), cols = ['#ffffff', '#ffe8b0', '#cfe8ff', '#e0ffd8', '#ffd8e0']; for (let i = 0; i < 18; i++) { const x = 40 + r() * 640, y = 820 + r() * 340, k = clamp(lg * 2 - i * .07), ph = pmod(t * .6 + r(), 1), a = k * (ph < .7 ? 1 : 1 - (ph - .7) / .3); if (a <= 0) continue; const w = 54 + r() * 30;
    s += `<g opacity="${o1(a)}"><rect x="${o1(x - w / 2)}" y="${o1(y - 34)}" width="${o1(w)}" height="30" rx="14" fill="${cols[i % 5]}"/><path d="M${o1(x - 6)},${o1(y - 5)} l6,10 l6,-10Z" fill="${cols[i % 5]}"/>${[0, 1, 2].map(j => `<circle cx="${o1(x - 12 + j * 12)}" cy="${o1(y - 19)}" r="3.4" fill="#5a6070"/>`).join('')}</g>`; } }
  // the counter
  const ca = ease(ramp(t, WS(6, 2) - .2, WS(6, 3)));
  if (ca > 0) s += `<g opacity="${o1(ca)}">${panel(40, 420, 400, 110)}<text x="240" y="484" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="46" fill="#f4c76b">٨٫٢ مليار إنسان</text>${oL(240, 516, 'من مكانٍ واحد؟', 1, '#cfd8e4', 22)}</g>`;
  // bars: the world vs the biggest country today
  if (bars > 0) { const W = 520;
    s += `<g opacity="${o1(bars)}">${panel(40, 1010, 640, 220)}${oL(360, 1050, 'عددُ السكّان', 1, '#cfd8e4', 24)}<rect x="100" y="1070" width="${W}" height="40" rx="10" fill="#2a3040"/><rect x="${o1(100 + W * (1 - bars))}" y="1070" width="${o1(W * bars)}" height="40" rx="10" fill="url(#onBarG)"/>${oL(360, 1100, 'العالمُ: ٨٫٢ مليار', 1, '#1a1208', 24).replace('stroke="#000"', 'stroke="none"')}` +
      `<rect x="100" y="1150" width="${W}" height="40" rx="10" fill="#2a3040"/><rect x="${o1(100 + W - W * .177 * b2)}" y="1150" width="${o1(W * .177 * b2)}" height="40" rx="10" fill="url(#onBarB)"/>${oL(320, 1180, 'أكبرُ دولةٍ اليوم: ≈ ١٫٤٥ مليار', b2, '#fff', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: one standard: 15 kinds of plug and socket become one ----------
const ONSOCK = ['A', 'C', 'G', 'I', 'D', 'B'];
function sockFace(k) {   // the holes of a socket type, centred at 0,0
  const sl = (x, y, w, h, r = 0) => `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="2" fill="#2a2a2e" transform="rotate(${r},${x},${y})"/>`, ho = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#2a2a2e"/>`;
  switch (k) {
    case 'A': return sl(-14, -4, 6, 22) + sl(14, -4, 6, 22);
    case 'B': return sl(-14, -10, 6, 22) + sl(14, -10, 6, 22) + `<path d="M-6,18 a6,6 0 0 1 12,0 v6 h-12Z" fill="#2a2a2e"/>`;
    case 'C': return ho(-16, 0, 6) + ho(16, 0, 6);
    case 'D': return ho(0, -18, 8) + ho(-16, 12, 6) + ho(16, 12, 6);
    case 'G': return sl(0, -18, 8, 20) + sl(-20, 12, 20, 8) + sl(20, 12, 20, 8);
    case 'I': return sl(-14, -6, 6, 22, 30) + sl(14, -6, 6, 22, -30) + sl(0, 18, 6, 18);
  } return ''; }
function socket(x, y, k, a = 1, one = 0, glow = 0) {
  let g = `<g transform="translate(${x},${y})"><rect x="-70" y="-70" width="140" height="140" rx="16" fill="#000" opacity=".18" transform="translate(4,8)" filter="url(#blur5)"/><rect x="-70" y="-70" width="140" height="140" rx="16" fill="url(#onPlate)"/><rect x="-70" y="-70" width="140" height="140" rx="16" fill="none" stroke="#b8bcc0" stroke-width="2"/>` +
    `<circle r="46" fill="#f4f4f2"/><circle r="46" fill="none" stroke="#c8cccf" stroke-width="2"/><path d="M-30,-34 A46,46 0 0 1 30,-34" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`;
  g += `<g opacity="${o1(1 - one)}">${sockFace(k)}</g><g opacity="${o1(one)}">${sockFace('C')}</g>`;
  if (glow > 0) g += `<rect x="-74" y="-74" width="148" height="148" rx="18" fill="none" stroke="#f4c76b" stroke-width="5" opacity="${o1(glow)}"/>`;
  return g + `</g>`;
}
function scenePlug(t) {
  const st = S0(7) - .2, T = t - st, ap = ease(ramp(t, st, st + .5)), n15 = ease(ramp(t, WS(7, 3) - .2, WS(7, 5))), one = ease(ramp(t, WS(7, 9) - .1, WS(7, 10) + .3)), gl = Math.sin(Math.PI * clamp((t - WS(7, 9)) / 1.2)), plug = ease(ramp(t, WS(7, 11) - .2, WS(7, 12) + .2));
  let s = `<defs>${ONDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#onWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<ellipse cx="460" cy="560" rx="420" ry="300" fill="#fff8e8" opacity=".3" filter="url(#blur16)"/><rect x="-20" y="1150" width="760" height="40" fill="#f2ece0"/><rect x="-20" y="1186" width="760" height="6" fill="#000" opacity=".2"/><rect x="-20" y="1192" width="760" height="120" fill="#8a6a4a"/><rect x="-20" y="1192" width="760" height="120" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // a small table with a lamp at the right edge
  s += `<rect x="560" y="980" width="170" height="14" rx="3" fill="#7a5a3a"/><rect x="572" y="994" width="10" height="160" fill="#5a3e28"/><rect x="706" y="994" width="10" height="160" fill="#5a3e28"/><path d="M640,980 V880" stroke="#3a3a40" stroke-width="6"/><path d="M600,880 L680,880 L664,820 L616,820Z" fill="#e8d8b0"/><ellipse cx="640" cy="980" rx="30" ry="6" fill="#3a3a40"/>`;
  const lit = ease(ramp(t, WS(7, 12) + .2, WS(7, 12) + .5));
  if (lit > 0) s += `<circle cx="640" cy="900" r="160" fill="url(#onLamp)" opacity="${o1(lit)}"/><path d="M600,880 L680,880 L664,820 L616,820Z" fill="#fff6d0" opacity="${o1(lit * .8)}"/>`;
  [[150, 520], [360, 520], [570, 520], [150, 740], [360, 740], [570, 740]].forEach(([x, y], i) => { if (i === 5) y += 0; s += `<g opacity="${o1(clamp(ap * 2 - i * .15))}">${socket(x, y, ONSOCK[i], 1, clamp(one * 1.6 - i * .12), gl * .9)}</g>`; });
  // the cable and plug coming up from below into the lower middle socket
  if (plug > 0) { const py = lerp(1300, 760, plug);
    s += `<path d="M640,980 C640,1060 520,1100 430,1120 C380,1130 360,1180 360,1300" stroke="#1e1e22" stroke-width="9" fill="none" opacity="${o1(Math.min(1, plug * 2))}"/>` +
      `<path d="M360,${o1(py + 40)} V1300" stroke="#1e1e22" stroke-width="12"/><g transform="translate(360,${o1(py)})"><rect x="-34" y="-8" width="68" height="62" rx="18" fill="#2a2a30"/><rect x="-30" y="-6" width="18" height="56" rx="8" fill="#fff" opacity=".12"/><rect x="-22" y="-20" width="8" height="14" fill="#c8ccd0"/><rect x="14" y="-20" width="8" height="14" fill="#c8ccd0"/></g>`; }
  if (n15 > 0) s += `<g opacity="${o1(n15 * (1 - one))}">${panel(190, 900, 340, 90)}<text x="360" y="960" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="40" fill="#f4c76b">١٥ نوعاً من القوابس</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: the twist: time cannot be one: noon here is midnight on the other side ----------
function onClock(x, y, a, day, lab) {
  if (a <= 0) return '';
  return `<g opacity="${o1(a)}" transform="translate(${x},${y})"><circle r="70" fill="#0a0e1c" opacity=".85"/><circle r="58" fill="${day ? '#fffaf0' : '#1e2a44'}"/><circle r="58" fill="none" stroke="#f4c76b" stroke-width="5"/>` +
    Array.from({ length: 12 }, (_, i) => `<path d="M${o1(Math.sin(i * .5236) * 48)},${o1(-Math.cos(i * .5236) * 48)} L${o1(Math.sin(i * .5236) * 54)},${o1(-Math.cos(i * .5236) * 54)}" stroke="${day ? '#3a3a40' : '#cfd8e4'}" stroke-width="3"/>`).join('') +
    `<path d="M0,0 V-34 M0,0 V-46" stroke="${day ? '#2a2a30' : '#fff'}" stroke-width="5" stroke-linecap="round"/><circle r="5" fill="#f4c76b"/>` +
    (day ? `<g transform="translate(52,-52)"><circle r="20" fill="url(#onGlow)"/><circle r="11" fill="#ffd84a"/></g>` : `<g transform="translate(52,-52)"><circle r="13" fill="#e8ecf4"/><circle cx="6" cy="-4" r="11" fill="#1e2a44"/></g>`) + `</g>` + oL(x, y + 104, lab, a, day ? '#ffe08a' : '#cfe0ff', 28);
}
function sceneTime(t) {
  const st = S0(8) - .2, T = t - st;
  const G = glE(t, { d: 7.6, el: .2, lon: 30 + T * 3, clouds: .4, lights: 1.2, off: 1.55, up: .15, tg: [0, -.25, 0] });
  const dA = ease(ramp(t, WS(8, 4) - .2, WS(8, 6) + .2)), nA = ease(ramp(t, WS(8, 8) - .2, WS(8, 10) + .2));
  F.ov = `<defs>${OND}</defs>` + onClock(ONDAYX, 1060, dA, 1, 'الظهرُ عندَك') + onClock(ONNIGHTX, 1060, nA, 0, 'منتصفُ الليل');
  return space(t);
}
let ONDAYX = 560, ONNIGHTX = 160;
// ---------- 9: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  // start exactly where the time shot ends (same camera, light and spin), then ease to the end view: no double Earth in the crossfade
  const k = ease(ramp(t, S0(9) - .2, S0(9) + 1.6)), lonT = 30 + (t - (S0(8) - .2)) * 3;
  glE(t, { d: lerp(7.6, 9.8, k), el: lerp(.2, .32, k), lon: lerp(lonT, 40 + (t - S0(9)) * 2, k), clouds: lerp(.4, .45, k), lights: lerp(1.2, .4, k), off: lerp(1.55, -.6, k), up: lerp(.15, .5, k), tg: [0, lerp(-.25, .64, k), 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 8) - .3, WS(9, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneAirport }, { s: S0(3) - .2, f: sceneMoney }, { s: S0(4) - .2, f: sceneRate },
  { s: S0(5) - .2, f: sceneArmy }, { s: S0(6) - .2, f: sceneGovern }, { s: S0(7) - .2, f: scenePlug }, { s: S0(8) - .2, f: sceneTime }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneCount, sceneMoney, sceneRate, sceneGovern, scenePlug, sceneTime]);
const XF = .5;
const TLI = [['السفر', S0(2)], ['العملة', S0(3)], ['الجيوش', S0(5)], ['الحُكم', S0(6)], ['المعايير', S0(7)]];
const LIST_ON = new Set([sceneArmy]);
const CHIPS = [
  ['c0', 'بلا حدود', 360, 330, 'red big', WS(0, 2), WS(0, 6)],
  ['c0b', 'دولةٌ واحدة', 360, 330, 'big', WS(0, 9), S0(1) - .3],
  ['c1', '١٩٥ دولة ← ١', 360, 330, 'big', WS(1, 0), S0(2) - .3],
  ['c2', 'بلا جوازاتٍ ولا تأشيرات', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', 'عملةٌ واحدة', 360, 330, 'big', WS(3, 0), S0(4) - .3],
  ['c4', 'فائدةٌ واحدة للجميع؟', 360, 330, 'red big', WS(4, 2), S0(5) - .3],
  ['c5', 'للمدارسِ والمستشفيات', 360, 330, 'big', WS(5, 13), S0(6) - .3],
  ['c6', '+٧٬٠٠٠ لغة', 360, 330, 'red big', WS(6, 8), S0(7) - .3],
  ['c7', 'قابسٌ واحد', 360, 330, 'big', WS(7, 9), S0(8) - .3],
  ['c8', 'الشمسُ لا تعرفُ الحدود', 360, 330, 'red big', WS(8, 14), S0(9) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">دولةٌ واحدة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
