// w2_a.js: #59 "what if World War II had never happened?": defs, war flashes on the globe, people of 1939, scenes 0-6
const W2DEF = `<linearGradient id="dawn39" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a78"/><stop offset=".45" stop-color="#9a8aa8"/><stop offset=".8" stop-color="#f0b48a"/><stop offset="1" stop-color="#ffd8a8"/></linearGradient>` +
  `<linearGradient id="goldS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac8"/><stop offset=".55" stop-color="#b8cce0"/><stop offset=".85" stop-color="#f4dcb0"/><stop offset="1" stop-color="#f8e4c0"/></linearGradient>` +
  `<linearGradient id="ashS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4646"/><stop offset=".55" stop-color="#7a6e66"/><stop offset="1" stop-color="#a89480"/></linearGradient>` +
  `<linearGradient id="morn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86c8"/><stop offset=".6" stop-color="#a8cce8"/><stop offset="1" stop-color="#e8eef0"/></linearGradient>` +
  `<linearGradient id="riverH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa4bc"/><stop offset=".5" stop-color="#4a7a94"/><stop offset="1" stop-color="#2e5670"/></linearGradient>` +
  `<linearGradient id="copperD" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3e7a6a"/><stop offset=".4" stop-color="#7ac0a8"/><stop offset="1" stop-color="#2a5a4e"/></linearGradient>` +
  `<radialGradient id="tubeG"><stop offset="0" stop-color="#fff0c0"/><stop offset=".35" stop-color="#ffb050" stop-opacity=".8"/><stop offset="1" stop-color="#ff7a20" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="agarG" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#e8d48a"/><stop offset=".8" stop-color="#d2b866"/><stop offset="1" stop-color="#b89a4a"/></radialGradient>` +
  `<radialGradient id="mouldG"><stop offset="0" stop-color="#f4f8f0"/><stop offset=".25" stop-color="#6aa48a"/><stop offset=".7" stop-color="#3a7a6a"/><stop offset="1" stop-color="#cfe4d0"/></radialGradient>` +
  `<linearGradient id="steelV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a7078"/><stop offset=".3" stop-color="#d8dde2"/><stop offset=".55" stop-color="#f2f4f6"/><stop offset="1" stop-color="#5a6068"/></linearGradient>` +
  `<linearGradient id="copperB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a3a1e"/><stop offset=".4" stop-color="#e09060"/><stop offset=".6" stop-color="#f4b080"/><stop offset="1" stop-color="#6a2e16"/></linearGradient>` +
  `<radialGradient id="mwG"><stop offset="0" stop-color="#fff2c0"/><stop offset=".6" stop-color="#ffc870" stop-opacity=".6"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient>`;
const W2D = () => WWD() + HIDEFS2() + W2DEF;

// hot spots of the war, 1939-1945, on every front (lat, lon)
const WAR = [[52.2, 21.0], [50.3, 2.6], [49.3, -.5], [51.5, -.1], [59.9, 30.3], [55.7, 37.6], [48.7, 44.5], [50.4, 30.5], [41.9, 12.5], [37.9, 23.7], [32.1, 23.9], [30.8, 28.9], [36.8, 10.2],
  [31.2, 121.5], [30.6, 114.3], [39.9, 116.4], [21.3, -157.9], [14.6, 121.0], [1.35, 103.8], [-9.4, 160.0], [-6.2, 147.0], [26.2, 127.7], [24.8, 141.3], [16.8, 96.2], [35.7, 139.7], [53.5, 9.9], [52.5, 13.4]];
function warFlash(G, list, k, t, seed = 5, n = 2) {
  if (k <= 0) return ''; let s = ''; const r = RS(seed);
  list.forEach(([la, lo], i) => { for (let j = 0; j < n; j++) { const ph = pmod(t * (.6 + r() * .5) + r(), 1), dl = r() * .6, a = clamp((k - dl * .5) * 2); if (a <= 0 || ph > .4) continue; const v = G.vis(la, lo); if (v < .15) continue;
    const [x, y] = G.P(la + (r() - .5) * 1.4, lo + (r() - .5) * 1.4, 1.006), q = ph / .4;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(10 + 26 * q).toFixed(1)}" fill="url(#flashG)" opacity="${(a * (1 - q) * clamp((v - .15) / .2)).toFixed(2)}"/>`; } });
  return s;
}
// a soft column of smoke rising from a point on the globe
function gSmoke(G, la, lo, a, t, i) { if (a <= 0 || G.vis(la, lo) < .25) return ''; const [x, y] = G.P(la, lo, 1.006); let s = '';
  for (let q = 0; q < 4; q++) { const ph = pmod(t * .25 + q / 4 + i * .17, 1); s += `<circle cx="${(x + ph * 14).toFixed(1)}" cy="${(y - ph * 40).toFixed(1)}" r="${(5 + ph * 14).toFixed(1)}" fill="#3a3432" opacity="${(a * .45 * Math.sin(ph * Math.PI)).toFixed(2)}" filter="url(#blur2)"/>`; }
  return s; }

// ---------- people of 1939: coats, fedoras, dresses ----------
function fedora(s, col = '#2a2624') { const [hx, hy] = HP.head;
  return `<ellipse cx="${hx.toFixed(1)}" cy="${(hy - 14 * s).toFixed(1)}" rx="${(30 * s).toFixed(1)}" ry="${(6 * s).toFixed(1)}" fill="${col}"/>` +
    `<path d="M${(hx - 17 * s).toFixed(1)},${(hy - 14 * s).toFixed(1)} Q${(hx - 18 * s).toFixed(1)},${(hy - 36 * s).toFixed(1)} ${(hx - 4 * s).toFixed(1)},${(hy - 34 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 30 * s).toFixed(1)} ${(hx + 4 * s).toFixed(1)},${(hy - 34 * s).toFixed(1)} Q${(hx + 18 * s).toFixed(1)},${(hy - 36 * s).toFixed(1)} ${(hx + 17 * s).toFixed(1)},${(hy - 14 * s).toFixed(1)}Z" fill="${col}"/>` +
    `<path d="M${(hx - 17 * s).toFixed(1)},${(hy - 18 * s).toFixed(1)} H${(hx + 17 * s).toFixed(1)}" stroke="#0e0c0c" stroke-width="${(4 * s).toFixed(1)}"/><path d="M${(hx - 12 * s).toFixed(1)},${(hy - 30 * s).toFixed(1)} Q${(hx - 8 * s).toFixed(1)},${(hy - 33 * s).toFixed(1)} ${(hx - 4 * s).toFixed(1)},${(hy - 32 * s).toFixed(1)}" stroke="#fff" stroke-width="${(2 * s).toFixed(1)}" opacity=".18" fill="none"/>`; }
function p39(x, y, s, f, k, t, o = {}) { const h = o.hat; const g = p14(x, y, s, f, k, t, Object.assign({}, o, { hat: h === 'fed' ? null : h })); return h === 'fed' ? g + fedora(s, o.hatC || '#2a2624') : g; }
// a twin-engine bomber of the 1930s seen from below/side, small in the sky
function bomber(x, y, s, a = 1) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M-60,0 C-50,-7 30,-8 54,-3 L64,0 L54,4 C30,8 -50,7 -60,0Z" fill="#2a2c32"/><path d="M-6,-1 L-30,-46 L-18,-46 L18,-1Z M-6,2 L-24,40 L-14,40 L16,2Z" fill="#33353c"/>` +
  `<path d="M-56,-1 L-70,-20 L-62,-20 L-48,-2Z" fill="#2a2c32"/><ellipse cx="-12" cy="-22" rx="10" ry="4" fill="#202228"/><ellipse cx="-14" cy="20" rx="9" ry="4" fill="#202228"/><path d="M-40,-3 L48,-4" stroke="#fff" stroke-width="1.6" opacity=".15"/></g>`; }

// ---------- 0: the hook: the war burns across the globe ----------
function sceneHook(t) {
  const k = ease(clamp(t / 3));
  const G = gAt(t, 360, 760, { d: lerp(3.9, 3.2, k), el: .78, lon: 18 + t * 1.2, clouds: .3, lights: .3, off: -.7, up: .6 });
  F.w.disc.inf = { o: [50, 16], r: lerp(.22, .4, k), a: 1, g: 0 };
  let o = `<defs>${W2D()}</defs>` + warFlash(G, WAR, ease(ramp(t, .1, 1.4)), t, 5, 3);
  WAR.slice(0, 12).forEach((p, i) => o += gSmoke(G, p[0], p[1], ease(ramp(t, .3 + i * .05, 1.2)), t, i));
  F.ov = o; return space(t);
}

// ---------- 1: dawn, 1 September 1939: people stop on the pavement, bombers pass overhead ----------
function sceneDawn(t) {
  const t0 = S0(1) - .2, T = t - t0, pl = ramp(t, WS(1, 2), WS(1, 9));
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dawn39)"/>` + sun3(560, 860, .85, '#ffe0b0');
  s += cumulus(170 + T * 3, 520, 240, 61, { a: .5 }) + cumulus(560 + T * 2, 620, 200, 63, { a: .4 });
  // far roofs and church spires in the haze
  let far = `<path d="M-20,900 L-20,760 L40,760 L40,720 L90,720 L90,770 L150,770 L170,700 L190,770 L260,770 L260,730 L330,730 L330,780 L420,780 L432,640 L444,780 L520,780 L520,740 L600,740 L600,760 L680,760 L680,720 L740,720 V900Z" fill="#8a7a8a"/>`;
  s += far + `<rect x="-20" y="640" width="760" height="300" fill="#f0c8a8" opacity=".28"/>`;
  // bombers in formation, high and small
  // the facades along the street
  [[-30, 170, 470, '#d4b894', 12, 1], [140, 190, 420, '#b8a28c', 14, 0], [330, 160, 500, '#cfc2a4', 16, 2], [490, 260, 440, '#c8a882', 18, 1]].forEach(([x, w, h, c, sd, rf]) => { s += facade(x, 990, w, h, { col: c, seed: sd, roof: rf, shops: 1, balc: sd % 4 === 0, shut: sd === 14 ? '#4a3a2a' : null }); });
  if (pl > 0) { const bx = lerp(-260, 940, pl); [[0, 0], [-70, 34], [-70, -34], [-140, 68], [-140, 0], [-140, -68]].forEach(([dx, dy], i) => s += bomber(bx + dx, 382 + dy * .32, .42, .85)); }
  s += `<rect x="-20" y="520" width="760" height="470" fill="#ffb880" opacity=".1"/><rect x="-20" y="520" width="760" height="470" fill="#1a1a3a" opacity=".12"/>`;
  // a radio in the shop window: warm light
  s += `<rect x="372" y="902" width="74" height="60" rx="6" fill="#5a3a22"/><rect x="380" y="910" width="40" height="44" rx="18" fill="#c8a062"/><circle cx="433" cy="932" r="7" fill="#e8d0a0"/><circle cx="433" cy="950" r="5" fill="#e8d0a0"/>` + scr(`<circle cx="409" cy="930" r="70" fill="url(#tubeG)" opacity=".35"/>`);
  s += `<rect x="-20" y="990" width="760" height="60" fill="#b0a696"/><rect x="-20" y="990" width="760" height="60" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1046" width="760" height="8" fill="#7a7266"/>` + cobbles(1054, 1300, '#5e5852', 9);
  // tram rails
  s += `<path d="M-20,1150 H740 M-20,1176 H740" stroke="#9a948a" stroke-width="4" opacity=".7"/>`;
  // people on the pavement: they stop and look up when the planes come
  const up = ease(ramp(t, WS(1, 6), WS(1, 8)));
  [[70, 1046, .64, 1, 0, 'fed'], [175, 1044, .62, -1, 4, 'lady', '#4a3a5a'], [290, 1046, .64, 1, 1, 'cap'], [520, 1046, .62, -1, 2, 'fed'], [628, 1046, .62, -1, 3, 'lady', '#5a4436']].forEach(([x, y, sc, f, k, h, sk], i) => {
    const wk = (1 - up) * T * 26 * f; s += p39(x + wk, y, sc, f, k, t, { hat: h, skirt: sk, hatC: h === 'lady' ? '#3a2a2a' : null, walk: up < .5 ? T * 3 + i : null, h: up >= .5 ? { lookUp: up, aF: [.15, .4] } : {} }); });
  // the newspaper boy with the morning paper held up
  const nb = 430; s += kid(nb, 1046, .5, -1, 0, { top: '#6a5a4a', pants: '#3a3430', skin: '#d0a07a', hair: '#4a2e1a', aF: [-2.2, -2.6], aB: [-2.0, -2.5], lookUp: up * .5 }, null);
  s += `<g transform="translate(${nb - 40},${1046 - 272 * .5 * 1.05}) rotate(-4)"><rect x="-6" y="-46" width="70" height="52" fill="#ece6d6"/><rect x="0" y="-40" width="58" height="9" fill="#2a2a2a"/>${[0, 1, 2, 3].map(i => `<rect x="0" y="${-26 + i * 7}" width="${i % 2 ? 40 : 58}" height="3" fill="#7a7468"/>`).join('')}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 2: the war spreads over the world for six years ----------
function sceneSpread(t) {
  const t0 = WS(1, 9) - .3, T = t - t0, n = ease(ramp(t, t0, S0(2) - .4));
  const G = gAt(t, 360, 700, { d: lerp(5.0, 8.6, ease(clamp(T / 4))), el: lerp(.7, .38, ease(clamp(T / 4))), lon: lerp(22, 92, ease(clamp(T / 5.2))), clouds: .4, lights: .3, off: -.7 });
  F.w.disc.inf = { o: [50, 16], r: lerp(.4, 1.25, Math.pow(n, .8)), a: 1, g: lerp(0, .24, n) };
  let o = `<defs>${W2D()}</defs>` + warFlash(G, WAR, 1, t, 7, 2);
  const yk = ramp(t, WS(1, 14), WS(1, 19) + .3), yr = Math.min(1945, 1939 + Math.floor(yk * 6.999)), pa = ease(ramp(t, WS(1, 13), WS(1, 14)));
  if (pa > 0) o += `<g opacity="${pa.toFixed(2)}">${panel(230, 1110, 260, 100)}${lbl(360, 1180, AR4(yr), 1, '#f4c76b', 58)}</g>`;
  F.ov = o; return space(t);
}

// ---------- 3: more than 70 million killed: about 3 of every 100 people on Earth ----------
const DEAD3 = [23, 57, 84];
function sceneDead(t) {
  const r = RS(41); let s = `<defs>${W2D()}</defs>` + studio('dd2', '#2a3048', '#080a14', 4), g = '';
  const mk = ease(ramp(t, WS(2, 8), WS(2, 10)));
  for (let i = 0; i < 100; i++) { const c = i % 10, rw = Math.floor(i / 10), P = PALS[Math.floor(r() * PALS.length)], a = ease(ramp(t, S0(2) - .15 + ((c * 7 + rw * 3) % 23) * .02, S0(2) + .5 + ((c * 7 + rw * 3) % 23) * .02));
    const x = 108 + c * 56, y = 486 + rw * 64 + 2 * Math.sin(t * 1.4 + i), dead = DEAD3.includes(i);
    if (dead && mk > 0) { g += icon(x, y, .9, mix(P.top, '#5a5a60', mk), a * (1 - .5 * mk), mix(P.skin, '#7a7a80', mk)) + `<circle cx="${x}" cy="${y + 8}" r="${(30 + 4 * Math.sin(t * 4 + i)).toFixed(1)}" fill="none" stroke="#ff5a4a" stroke-width="3" opacity="${(.85 * mk).toFixed(2)}"/>`; }
    else g += icon(x, y, .9, P.top, a, P.skin); }
  s += g;
  const ca = ease(ramp(t, WS(2, 2), WS(2, 4))), cn = ease(ramp(t, WS(2, 3), WS(2, 6)));
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}">${lbl(360, 1192, '+' + AR4(Math.round(70 * cn)) + ' مليون', 1, '#ff8a7a', 66)}${lbl(360, 1236, 'قتيلٍ في الحرب', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: they would have lived, and had children and grandchildren ----------
function sceneFamily(t) {
  const t0 = S0(3) - .2, T = t - t0;
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#goldS)"/>` + sun3(600, 560, .9, '#fff0c8');
  s += cumulus(200 + T * 3, 500, 230, 71, { a: .7 }) + `<g opacity=".8">${mountainsR(860, 90, 7, { rock: '#8a9ab0' })}</g>`;
  s += `<rect x="-20" y="840" width="760" height="460" fill="#7a9a5a"/><rect x="-20" y="840" width="760" height="460" fill="#000" filter="url(#grainR)" opacity=".14"/><rect x="-20" y="830" width="760" height="40" fill="#f4dcb0" opacity=".35" filter="url(#blur5)"/>`;
  // a row of houses at the edge of town, trees, a garden fence
  [[-30, 160, 260, '#e0c8a0', 21, 1], [150, 150, 240, '#d4b090', 23, 1], [520, 230, 250, '#e4d4b4', 25, 1]].forEach(([x, w, h, c, sd, rf]) => s += facade(x, 900, w, h, { col: c, seed: sd, roof: rf, fl: 2, nw: 2 }));
  s += `<rect x="-20" y="900" width="760" height="10" fill="#5a7040" opacity=".6"/>`;
  s += treeR(370, 920, 330, 31, t) + treeR(470, 930, 270, 33, t);
  let fence = ''; for (let x = -10; x < 740; x += 26) fence += `<rect x="${x}" y="944" width="10" height="50" fill="#f0ece0"/><path d="M${x},944 l5,-8 l5,8" fill="#f0ece0"/>`; s += fence + `<path d="M-20,958 H740 M-20,980 H740" stroke="#e4e0d4" stroke-width="5"/>`;
  // the path
  s += `<path d="M-20,1060 H740 V1150 H-20Z" fill="#c8b48e"/><path d="M-20,1060 H740 V1150 H-20Z" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="1056" width="760" height="10" fill="#5a7040" opacity=".5"/>`;
  // the couple walks in; then the children, then a baby in a pram
  const wx = T * 16; s += `<ellipse cx="${(330 + wx).toFixed(1)}" cy="1128" rx="140" ry="12" fill="#2a3a20" opacity=".22" filter="url(#blur5)"/>`;
  s += p39(300 + wx, 1126, .7, 1, 1, t, { hat: 'fed', walk: T * 3 }) + p39(380 + wx, 1126, .66, 1, 4, t, { hat: 'lady', skirt: '#7a3a4a', hatC: '#5a2a2a', walk: T * 3 + 1 });
  const k1 = ease(ramp(t, WS(3, 5) - .1, WS(3, 5) + .4)), k2 = ease(ramp(t, WS(3, 7) - .1, WS(3, 7) + .4));
  if (k1 > 0) { s += `<g opacity="${k1.toFixed(2)}">` + kid(220 + wx - 30 * (1 - k1), 1126, .46, 1, 1, { top: '#3a6a9a', pants: '#2a2a34', skin: '#d0a07a', hair: '#3a2416', walk: T * 3.6 }, null) + kid(470 + wx - 30 * (1 - k1), 1126, .42, 1, 2, { top: '#c8584a', pants: '#3a2a30', skin: '#d8aa84', hair: '#5a3418', walk: T * 3.6 + 2 }, null) + `</g>`; }
  if (k2 > 0) { const px = 140 + wx - 40 * (1 - k2); s += `<g opacity="${k2.toFixed(2)}">` + p39(px - 60, 1126, .64, 1, 2, t, { hat: 'lady', skirt: '#3a5a6a', hatC: '#2a3a4a', walk: T * 3 + 2, h: { hF: [px + 6, 1126 - 112] } }) +
    `<g transform="translate(${px.toFixed(1)},1126)"><circle cx="-10" cy="-14" r="14" fill="#1a1a1a"/><circle cx="46" cy="-14" r="14" fill="#1a1a1a"/><circle cx="-10" cy="-14" r="6" fill="#8a8a8a"/><circle cx="46" cy="-14" r="6" fill="#8a8a8a"/><path d="M-24,-36 C-24,-80 64,-80 64,-40 L58,-28 L-18,-28Z" fill="#2a3a5a"/><path d="M-24,-36 C-24,-80 18,-90 26,-56 Z" fill="#3a4a6a"/><path d="M-30,-60 L6,-112" stroke="#1a1a1a" stroke-width="4"/></g></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4b: millions of families that never existed: a family tree that keeps branching ----------
function sceneTree(t) {
  const t0 = WS(3, 8) - .3; let s = `<defs>${W2D()}</defs>` + studio('ft2', '#2e3452', '#080a14', 6);
  const gen = [[360, 1130, 2, 1.3], [0, 960, 4, 1.0], [0, 800, 8, .72], [0, 650, 16, .5], [0, 520, 32, .32]];
  let lines = '', ic = ''; const r = RS(17);
  gen.forEach(([x0, y, n, sc], gi) => { const a = ease(ramp(t, t0 + gi * .45, t0 + gi * .45 + .4)); if (a <= 0) return;
    for (let i = 0; i < n; i++) { const x = gi === 0 ? 316 + i * 88 : 60 + (i + .5) * 600 / n, P = PALS[Math.floor(r() * PALS.length)];
      if (gi > 0) { const px = gi === 1 ? 360 : 60 + (Math.floor(i / 2) + .5) * 600 / (n / 2), py = gen[gi - 1][1] - 30 * gen[gi - 1][3]; lines += `<path d="M${px.toFixed(1)},${py.toFixed(1)} C${px.toFixed(1)},${(py - 50).toFixed(1)} ${x.toFixed(1)},${(y + 70 * sc).toFixed(1)} ${x.toFixed(1)},${(y + 38 * sc).toFixed(1)}" stroke="#f4c76b" stroke-width="${(1.2 + 2 * sc).toFixed(1)}" fill="none" opacity="${(.8 * a).toFixed(2)}"/>`; }
      ic += icon(x, y - 6 * sc, sc, P.top, a, P.skin); } });
  s += lines + ic;
  // the top fades into countless small lights
  const fa = ease(ramp(t, t0 + 2.2, t0 + 2.8)); if (fa > 0) { let d = ''; for (let i = 0; i < 160; i++) { const x = 40 + r() * 640, y = 380 + r() * 110; d += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(1.5 + r() * 2).toFixed(1)}" fill="#f4c76b" opacity="${(fa * (.4 + .6 * r())).toFixed(2)}"/>`; } s += d; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: Warsaw, more than 80% destroyed, would have stayed as it was ----------
const WARS = [[-30, 130, 430, '#d9a35a', 31, 1], [96, 112, 470, '#c2584a', 33, 1], [204, 124, 420, '#e3c98a', 35, 0], [324, 118, 480, '#7fa38a', 37, 1], [438, 130, 440, '#d88a5a', 39, 1], [564, 186, 460, '#b8c4d0', 41, 0]];
function sceneWarsaw(t) {
  const t0 = S0(4) - .2, T = t - t0, wp = ease(ramp(t, WS(4, 11) - .3, WS(4, 13) + .1)), xw = lerp(-120, 860, wp);
  const id = 'wz' + Math.round(t * 30);
  let s = `<defs>${W2D()}<linearGradient id="${id}g" gradientUnits="userSpaceOnUse" x1="${xw - 90}" y1="0" x2="${xw + 90}" y2="0"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="${id}m"><rect x="-20" y="-20" width="760" height="1320" fill="url(#${id}g)"/></mask></defs>`;
  s += `<g transform="translate(360,900) scale(${(1 + .035 * ease(clamp(T / 6))).toFixed(3)}) translate(-360,-900)">`;
  // the ruined square (the whole frame)
  let ru = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#ashS)"/>`;
  WARS.forEach(([x, w, h, c, sd, rf], i) => { const r = RS(sd), cut = h * (.3 + r() * .4), pts = [], n = 6; for (let j = 0; j <= n; j++) pts.push([x - 6 + (w + 12) * j / n, 990 - h + cut * (i % 2 ? j / n : 1 - j / n) + (j % 2 ? 26 : -6) + r() * 22]);
    const cp = `M${x - 8},1000 L${pts.map(PT).join(' L')} L${x + w + 8},1000Z`;
    ru += `<defs><clipPath id="${id}c${i}"><path d="${cp}"/></clipPath></defs><g clip-path="url(#${id}c${i})">${facade(x, 990, w, h, { col: mix(c, '#5a524c', .5), seed: sd, roof: rf })}<rect x="${x - 10}" y="${990 - h - 80}" width="${w + 20}" height="${h + 90}" fill="#2a2420" opacity=".42"/>` +
      `<rect x="${x - 10}" y="${990 - h}" width="${w + 20}" height="${h * .5}" fill="#0e0a08" opacity=".35" filter="url(#blur5)"/></g>` + `<path d="M${pts.map(PT).join(' L')}" stroke="#1e1814" stroke-width="5" fill="none" stroke-linejoin="round"/>`; });
  ru += smokeCol(150, 760, 600, t, 3, .8) + smokeCol(520, 700, 640, t, 7, .7);
  // rubble heaps in front of the walls
  const rr = RS(91); let rub = ''; for (let i = 0; i < 9; i++) { const x = -20 + i * 92 + rr() * 30, w = 120 + rr() * 80, h = 40 + rr() * 50; rub += `<path d="M${x},1000 Q${x + w * .3},${1000 - h} ${x + w * .55},${1000 - h * .8} Q${x + w * .8},${1000 - h * .6} ${x + w},1000Z" fill="${['#6a5e54', '#7a6a5a', '#5a504a'][i % 3]}"/>`;
    for (let q = 0; q < 6; q++) rub += `<rect x="${(x + rr() * w).toFixed(0)}" y="${(1000 - rr() * h * .7).toFixed(0)}" width="${(8 + rr() * 16).toFixed(0)}" height="${(5 + rr() * 8).toFixed(0)}" fill="${rr() > .5 ? '#9a6a4a' : '#8a827a'}" transform="rotate(${(rr() * 40 - 20).toFixed(0)})" transform-origin="${x} 990"/>`; }
  ru += rub + `<rect x="-20" y="995" width="760" height="320" fill="#6a625a"/>` + cobbles(1010, 1300, '#5a544e', 13) + `<rect x="-20" y="995" width="760" height="320" fill="#3a342e" opacity=".35"/>`;
  // the living square (revealed by the wipe)
  let li = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#morn)"/>` + sun3(150, 470, .9) + cumulus(520 + T * 3, 540, 220, 81, { a: .8 });
  WARS.forEach(([x, w, h, c, sd, rf]) => li += facade(x, 990, w, h, { col: c, seed: sd, roof: rf, balc: sd % 3 === 0, shut: sd === 37 ? '#2a4a3a' : null }));
  li += `<rect x="-20" y="985" width="760" height="10" fill="#000" opacity=".18"/>` + cobbles(995, 1300, '#8a8074', 13);
  [[110, 1090, .62, 1, 0, 'fed'], [250, 1110, .64, -1, 4, 'lady', '#3a4a6a'], [470, 1100, .62, 1, 2, 'cap'], [600, 1120, .64, -1, 3, 'lady', '#6a3a3a']].forEach(([x, y, sc, f, k, h, sk], i) => li += p39(x + T * 14 * f, y, sc, f, k, t, { hat: h, skirt: sk, hatC: h === 'lady' ? '#3a2a2a' : null, walk: T * 3 + i }));
  for (let i = 0; i < 6; i++) li += bird(300 + i * 30 + Math.sin(t * 2 + i) * 10, 1180 - (i % 2) * 8, .4, Math.sin(t * 9 + i) * .3, 0);
  s += ru + `<g mask="url(#${id}m)">${li}</g>`;
  if (wp > 0 && wp < 1) s += `<rect x="${(xw - 30).toFixed(1)}" y="-20" width="60" height="1320" fill="#fff4d0" opacity="${(.35 * Math.sin(wp * Math.PI)).toFixed(2)}" filter="url(#blur9)"/>`;
  s += `</g>`; noEarth(); F.ov = ''; return s;
}

// ---------- 6: Hiroshima and Nagasaki would not have been struck: a calm river morning, the shadow of the cloud fades ----------
function domeHall(x, base, s) {   // the domed exhibition hall by the river: brick-and-stucco wings, a tower with an oval copper dome
  let g = `<rect x="-150" y="-120" width="300" height="120" fill="#c8b490"/><rect x="-150" y="-120" width="300" height="120" fill="#000" filter="url(#grainR)" opacity=".16"/><rect x="-150" y="-128" width="300" height="10" fill="#e4d4b0"/>`;
  for (let i = 0; i < 9; i++) for (let f = 0; f < 2; f++) g += `<rect x="${-138 + i * 32}" y="${-106 + f * 52}" width="14" height="30" fill="#3a4448"/>`;
  g += `<rect x="-44" y="-200" width="88" height="200" fill="#d4c098"/><rect x="-44" y="-200" width="30" height="200" fill="#fff" opacity=".1"/><rect x="14" y="-200" width="30" height="200" fill="#000" opacity=".12"/>`;
  for (let f = 0; f < 3; f++) for (let i = 0; i < 3; i++) g += `<rect x="${-32 + i * 24}" y="${-188 + f * 58}" width="12" height="34" rx="5" fill="#3a4448"/>`;
  g += `<rect x="-50" y="-206" width="100" height="8" fill="#e8dcc0"/><ellipse cx="0" cy="-206" rx="44" ry="8" fill="#2a5a4e"/><path d="M-44,-206 C-44,-262 44,-262 44,-206Z" fill="url(#copperD)"/>`;
  for (let i = -3; i <= 3; i++) g += `<path d="M${i * 12},-206 Q${i * 9},-246 0,-252" stroke="#2a4a40" stroke-width="2" fill="none" opacity=".6"/>`;
  g += `<path d="M0,-252 V-266" stroke="#2a4a40" stroke-width="3"/><rect x="-150" y="-12" width="300" height="12" fill="#000" opacity=".18"/>`;
  return `<g transform="translate(${x},${base}) scale(${s})">${g}</g>`; }
function lowHouse(x, base, w, h, c, seed) { const r = RS(seed); return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${c}"/><path d="M${x - 10},${base - h} L${x + w * .5},${base - h - 26 - r() * 10} L${x + w + 10},${base - h}Z" fill="#3a3e44"/><path d="M${x - 10},${base - h} H${x + w + 10}" stroke="#22262a" stroke-width="5"/>` +
  `<rect x="${x + w * .2}" y="${base - h * .7}" width="${w * .25}" height="${h * .4}" fill="#4a4036"/><rect x="${x + w * .6}" y="${base - h * .7}" width="${w * .25}" height="${h * .4}" fill="#e8dcc0" opacity=".8"/>`; }
function mushroomGhost(x, y, a) { if (a <= 0) return ''; return `<g opacity="${a.toFixed(2)}" filter="url(#blur2)"><path d="M${x - 26},${y} C${x - 30},${y - 220} ${x - 16},${y - 330} ${x - 30},${y - 400} L${x + 30},${y - 400} C${x + 16},${y - 330} ${x + 30},${y - 220} ${x + 26},${y}Z" fill="#c8c0b4"/>` +
  `<ellipse cx="${x}" cy="${y - 440}" rx="150" ry="80" fill="#d8d0c4"/><ellipse cx="${x - 60}" cy="${y - 470}" rx="80" ry="56" fill="#e4dcd0"/><ellipse cx="${x + 70}" cy="${y - 460}" rx="84" ry="54" fill="#cec6ba"/><ellipse cx="${x}" cy="${y - 400}" rx="120" ry="30" fill="#b8b0a4"/><ellipse cx="${x}" cy="${y - 250}" rx="70" ry="16" fill="#d0c8bc" opacity=".7"/></g>`; }
function sceneHiro(t) {
  const t0 = S0(5) - .2, T = t - t0, gh = .42 * (1 - ease(ramp(t, WS(5, 4) - .2, WS(5, 6) + .3)));
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#morn)"/>` + sun3(140, 500, .9) + cumulus(560 + T * 3, 520, 210, 91, { a: .75 });
  s += `<g opacity=".85">${mountainsR(820, 120, 11, { rock: '#7a94a8' })}</g>` + `<rect x="-20" y="700" width="760" height="140" fill="#dce8f0" opacity=".35"/>`;
  s += mushroomGhost(470, 820, gh);
  // the far bank: low tiled houses, the domed hall
  const r = RS(51); let fb = ''; for (let i = 0; i < 12; i++) { const x = -30 + i * 64 + r() * 10; if (x > 380 && x < 560) continue; fb += lowHouse(x, 880, 50 + r() * 14, 40 + r() * 20, ['#e0d4bc', '#d4c4a8', '#c8bca4'][i % 3], 60 + i); }
  s += fb + domeHall(470, 884, .82) + treeR(300, 884, 140, 53, t) + treeR(640, 884, 120, 55, t);
  s += `<rect x="-20" y="880" width="760" height="12" fill="#8a8a7a"/><rect x="-20" y="886" width="760" height="6" fill="#000" opacity=".2"/>`;
  // the river with the hall's reflection and ripples
  s += `<rect x="-20" y="892" width="760" height="180" fill="url(#riverH)"/><g opacity=".28" transform="translate(0,1776) scale(1,-1)">${domeHall(470, 884, .82)}</g><rect x="-20" y="892" width="760" height="180" fill="url(#riverH)" opacity=".55"/>`;
  for (let i = 0; i < 26; i++) { const y = 902 + (i % 13) * 13, x = pmod(i * 97 + T * (10 + i % 4 * 4), 820) - 60; s += `<path d="M${x.toFixed(1)},${y} h${(30 + (i % 5) * 12)}" stroke="#e8f4fa" stroke-width="2" opacity=".35"/>`; }
  // a small wooden boat drifting
  const bx = 120 + T * 12; s += `<g transform="translate(${bx.toFixed(1)},1040)"><path d="M-60,0 L60,0 L46,16 L-48,16Z" fill="#5a3e28"/><path d="M-60,0 L60,0" stroke="#8a6a48" stroke-width="3"/></g>` + p39(bx + 10, 1046, .46, 1, 1, t, { hat: 'cap', h: { aF: [.9, 1.3], aB: [.8, 1.2] } });
  // the near bank: a stone wall, a promenade with people
  s += `<rect x="-20" y="1070" width="760" height="40" fill="#9a968a"/>` + Array.from({ length: 16 }, (_, i) => `<path d="M${-20 + i * 50},1070 V1110" stroke="#6a665e" stroke-width="2"/>`).join('') + `<rect x="-20" y="1110" width="760" height="200" fill="#b8ac94"/><rect x="-20" y="1110" width="760" height="200" fill="#000" filter="url(#grainR)" opacity=".16"/>`;
  [[90, 1190, .64, 1, 1, 'cap'], [210, 1200, .62, 1, 4, null, '#8a6a8a'], [560, 1190, .64, -1, 0, 'fed']].forEach(([x, y, sc, f, k, h, sk], i) => s += p39(x + T * 14 * f, y, sc, f, k, t, { hat: h, skirt: sk, walk: T * 3 + i }));
  s += kid(320 + T * 18, 1196, .44, 1, 3, { top: '#e8e4dc', pants: '#2a2a3a', skin: '#e0b48c', hair: '#1a1410', walk: T * 4 }, '#6a4a2a');
  noEarth(); F.ov = ''; return s;
}
