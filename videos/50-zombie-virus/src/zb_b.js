// zb_b.js: doubling every day, 33 days to everyone, flights, cities vs mountains, the lights go out

// ---------- 3: one person, each infected bites one a day: the number doubles every day ----------
const CROWDZ = (() => { const r = RS(512), o = []; for (let row = 0; row < 6; row++) { const y = 840 + row * 72 + row * row * 3, sc = .27 + row * .05, n = 6; for (let c = 0; c < n; c++) { const x = 30 + (c + .5) * 660 / n + (r() - .5) * 60 + (row % 2 ? 26 : -26); o.push({ x, y: y + (r() - .5) * 14, sc, f: r() > .5 ? 1 : -1, pi: Math.floor(r() * 10), zi: Math.floor(r() * 6) }); } }
  const P0 = [340, 1160]; o.forEach(p => { p.d = Math.hypot(p.x - P0[0], (p.y - P0[1]) * 1.6) + RS(Math.round(p.x * 7 + p.y))() * 60; }); o.sort((a, b) => a.d - b.d); o.forEach((p, i) => p.k = i); return o; })();
function plaza(t, id) {
  let s = `<defs><linearGradient id="pzS${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8a94"/><stop offset=".7" stop-color="#b8c0ba"/><stop offset="1" stop-color="#d8d4c4"/></linearGradient><linearGradient id="pzG${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8a090"/><stop offset="1" stop-color="#c8bea8"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#pzS${id})"/>`;
  s += cumulus(200 + t * 3, 420, 260, 31, { a: .7 }) + cumulus(560 + t * 2, 500, 200, 32, { a: .6 }) + farCity(53, 730, '#7a8694', { hk: 1.1 });
  [[-10, 150, 300, '#b89a7a', 601, 1], [140, 170, 360, '#8a9aa8', 602, 0], [310, 130, 280, '#c8b494', 603, 0], [440, 150, 330, '#a87a62', 604, 1], [590, 150, 300, '#9aa49a', 605, 0]].forEach(([x, w, h, c, sd, k]) => { s += blockN(x, 762, w, h, c, sd, k).s; });
  s += `<rect x="-20" y="740" width="760" height="40" fill="#000" opacity=".12" filter="url(#blur9)"/>`;
  s += `<rect x="-20" y="762" width="760" height="560" fill="url(#pzG${id})"/><rect x="-20" y="762" width="760" height="560" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  for (let i = 0; i < 9; i++) { const y = 762 + Math.pow(i / 8, 1.6) * 540; s += `<path d="M-20,${y.toFixed(1)} H740" stroke="#8a8272" stroke-width="${(1 + i * .25).toFixed(1)}" opacity=".5"/>`; }
  for (let i = -8; i <= 8; i++) s += `<path d="M${360 + i * 40},762 L${360 + i * 150},1300" stroke="#8a8272" stroke-width="1.4" opacity=".45"/>`;
  s += treeR(30, 800, 220, 7, t) + treeR(694, 806, 230, 9, t);
  return s;
}
function sceneDouble(t) {
  const T = t - S0(3) + .2, d0 = WS(3, 3), d1 = WS(3, 5), d2 = WS(3, 10), dd = [d0, d1, d2, WS(3, 12), WS(3, 13), WS(3, 13) + .6, WS(3, 14) + .1];
  let day = -1; dd.forEach((x, i) => { if (t >= x) day = i; });
  const nZ = day < 0 ? 0 : Math.min(36, Math.pow(2, day));
  let s = `<defs>${ZDEFS()}</defs>` + plaza(t, 'd');
  let ppl = '';
  CROWDZ.slice().sort((a, b) => a.y - b.y).forEach(p => {
    const z = p.k < nZ, sw = Math.sin(t * 1.3 + p.x) * .6;
    if (z) { const tz = dd[Math.max(0, Math.ceil(Math.log2(p.k + 1)))] || 0, born = ease(ramp(t, tz, tz + .4)); ppl += zombie(p.x, p.y, p.sc, p.f, p.zi, t, { still: 1, reach: born, lean: 6 * born });
      if (t - tz < .6) ppl += `<circle cx="${p.x.toFixed(1)}" cy="${(p.y - 120 * p.sc).toFixed(1)}" r="${(30 + 90 * (t - tz)).toFixed(1)}" fill="none" stroke="#9aff6a" stroke-width="3" opacity="${(.8 * (1 - (t - tz) / .6)).toFixed(2)}"/>`; }
    else ppl += man(p.x, p.y, p.sc, p.f, p.pi, { lean: sw });
  });
  s += ppl;
  // the counter
  const a = ease(ramp(t, d0 - .3, d0 + .2)), dn = Math.max(1, day + 1);
  s += `<g opacity="${a.toFixed(2)}">${panel(150, 420, 420, 150, 1)}${lbl(460, 480, 'اليوم ' + AR(dn), 1, '#c8d4e8', 30)}<text x="250" y="535" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="76" fill="#9aff6a" style="filter:drop-shadow(0 3px 8px rgba(0,0,0,.6))">${AR(day < 0 ? 1 : Math.pow(2, day))}</text>${lbl(460, 540, 'مصاب', 1, '#fff', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: in theory, after 33 days more than 8 billion: everyone ----------
function sceneBillion(t) {
  const T = t - S0(4) + .2, k = ramp(t, S0(4) - .2, WS(4, 9) + .5), g = ease(ramp(t, S0(4), WS(4, 10)));
  const G = gAt(t, 360, 700, { d: 8.3, el: .22, lon: 30 + T * 6, clouds: .3, lights: .9, off: -.4 });
  const day = Math.max(1, Math.min(33, Math.round(1 + 32 * k))), n = Math.pow(2, day), all = n > 8.2e9;
  F.w.disc.inf = { o: [-90, 0], r: -1, a: 1, g: Math.min(1.02, Math.pow(Math.min(n, 8.2e9) / 8.2e9, .22) * 1.02) };
  F.ov = `<defs>${ZDEFS()}</defs><g opacity="${ease(ramp(t, S0(4) - .2, S0(4) + .3)).toFixed(2)}">` + panel(110, 1010, 500, 200, 1) + lbl(360, 1066, 'اليوم ' + AR(day), 1, '#c8d4e8', 32) +
    `<text x="360" y="1150" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="${all ? 70 : 64}" fill="${all ? '#ff6a5a' : '#9aff6a'}" style="filter:drop-shadow(0 3px 10px rgba(0,0,0,.8))">${fmtN(Math.min(n, 8.59e9))}</text>` +
    lbl(360, 1196, all ? 'أكثرُ من سكّانِ الأرض' : 'مصاب', 1, '#fff', 26) + `</g>`;
  return space(t);
}

// ---------- 5: planes speed it up: about 100,000 flights a day, carrying people with no symptoms yet ----------
function flightZ(G, A, B, k, a, col = '#9aff6a') {
  if (a <= 0 || k <= 0) return ''; const va = vec(...A), vb = vec(...B); let d = '', on = false, head = null;
  for (let i = 0; i <= 40 * Math.min(1, k); i++) { const f = i / 40, [la, lo] = toLL(slerp(va, vb, f)), h = 1.012 + .14 * Math.sin(Math.PI * f); if (G.vis(la, lo) < .02) { on = false; continue; } const [x, y] = G.P(la, lo, h); d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; head = [x, y]; }
  let s = d ? `<path d="${d}" stroke="#000" stroke-opacity=".3" stroke-width="5" fill="none" opacity="${a.toFixed(2)}"/><path d="${d}" stroke="${col}" stroke-width="2.4" fill="none" opacity="${(a * .85).toFixed(2)}"/>` : '';
  if (head && k < 1) s += `<circle cx="${head[0].toFixed(1)}" cy="${head[1].toFixed(1)}" r="4.5" fill="#fff" opacity="${a.toFixed(2)}"/>`;
  return s;
}
const HUBS = [[51.5, -.1], [40.6, -73.8], [25.3, 55.4], [1.35, 103.8], [35.7, 139.7], [-33.9, 151.2], [-23.5, -46.6], [6.5, 3.4], [19.1, 72.9], [55.8, 37.6], [-1.3, 36.8], [33.9, -118.4], [30.1, 31.4], [39.9, 116.4], [19.4, -99.1], [41, 29], [-26.1, 28.2], [48.9, 2.3], [13.7, 100.7], [43.7, -79.6]];
const ROUTES = (() => { const r = RS(919), o = []; for (let i = 0; i < 46; i++) { const a = Math.floor(r() * HUBS.length); let b = Math.floor(r() * HUBS.length); if (b === a) b = (b + 3) % HUBS.length; o.push([a, b, r()]); } return o; })();
function traveller(x, y, s, pi, t, inf, a) {   // a person walking with a suitcase; the infected one has a faint green aura
  let g = man(x, y, s, 1, pi, { walk: x / (30 * s), hB: [x - 6 * s, y - 112 * s] }); const H = HP.handB;
  g += `<rect x="${(H[0] - 34 * s).toFixed(1)}" y="${(H[1] - 6 * s).toFixed(1)}" width="${(40 * s).toFixed(1)}" height="${(62 * s).toFixed(1)}" rx="${(6 * s).toFixed(1)}" fill="#2a3a5a"/><rect x="${(H[0] - 34 * s).toFixed(1)}" y="${(H[1] - 6 * s).toFixed(1)}" width="${(40 * s).toFixed(1)}" height="${(8 * s).toFixed(1)}" fill="#fff" opacity=".18"/><circle cx="${(H[0] - 26 * s).toFixed(1)}" cy="${(H[1] + 58 * s).toFixed(1)}" r="${(4 * s).toFixed(1)}" fill="#111"/><circle cx="${(H[0] - 2 * s).toFixed(1)}" cy="${(H[1] + 58 * s).toFixed(1)}" r="${(4 * s).toFixed(1)}" fill="#111"/>`;
  if (inf > 0) { const C = HP.chest; g = `<ellipse cx="${C[0].toFixed(1)}" cy="${(C[1] + 10 * s).toFixed(1)}" rx="${(70 * s).toFixed(1)}" ry="${(150 * s).toFixed(1)}" fill="#7aff4a" opacity="${(.28 * inf * (.8 + .2 * Math.sin(t * 4))).toFixed(2)}" filter="url(#blur9)"/>` + g; }
  return `<g opacity="${a.toFixed(2)}">${g}</g>`;
}
function sceneFlights(t) {
  const T = t - S0(5) + .2, ka = ease(ramp(t, S0(5) - .2, S0(5) + .9)), sy = ease(ramp(t, WS(5, 8) - .3, WS(5, 9)));
  const G = gAt(t, 360, lerp(640, 600, sy), { d: lerp(7.4, 8.6, sy), el: .3, lon: 20 + T * 5, clouds: .25, lights: 1.6, off: 2.75 });
  F.w.disc.inf = { o: [-90, 0], r: -1, a: 1, g: lerp(.28, .5, ease(ramp(t, S0(5), S0(6)))) };
  let o = `<defs>${ZDEFS()}</defs>`;
  ROUTES.forEach(([a, b, ph], i) => { const k = pmod(T * .35 + ph, 1.25) / 1; o += flightZ(G, HUBS[a], HUBS[b], k * ka, ka * (k > 1 ? 1 - (k - 1) * 4 : 1)); });
  const fl = Math.round(lerp(0, 100000, ease(ramp(t, S0(5), WS(5, 5) + .2))));
  o += `<g opacity="${(ka * (1 - sy)).toFixed(2)}">` + panel(170, 1040, 380, 140, 1) + `<text x="360" y="1118" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#f4c76b">${fmtN(fl)}</text>` + lbl(360, 1160, 'رحلة في اليوم', 1, '#fff', 24) + `</g>`;
  // travellers in a terminal: one carries the virus without symptoms
  if (sy > 0) { o += `<g opacity="${sy.toFixed(2)}">${panel(40, 920, 640, 330, 1)}<rect x="56" y="936" width="608" height="298" rx="14" fill="#c8ccd2" opacity=".16"/>` + [0, 1, 2].map(q => `<rect x="${86 + q * 196}" y="990" width="160" height="110" fill="#3a4a66"/><rect x="${86 + q * 196}" y="990" width="160" height="110" fill="url(#sunW)" opacity=".25"/>`).join('') + `<path d="M110,1060 l60,-8 l40,-14 l14,2 l-24,18 l30,4 l-6,6 l-40,-2 l-50,8Z" fill="#d8dce4" opacity=".8"/><path d="M56,1214 H664" stroke="#8a94a6" stroke-width="2" opacity=".5"/>`;
    o += hazmat(600, 1206, .48, -1, t, { gun: [470, 1112] }) + `<g>${panel(500, 1112, 92, 40, 1)}<text x="546" y="1140" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#6aff8a">٣٦٫٨°</text></g>`;
    [[150 + T * 24, 2, 0], [330 + T * 22, 7, 1], [520 + T * 25, 4, 0]].forEach(([x, pi, inf]) => { o += traveller(pmod(x - 60, 640) + 60, 1222, .5, pi, t, inf * ease(ramp(t, WS(5, 9), WS(5, 11))), clamp(Math.min(pmod(x - 60, 640) - 10, 650 - pmod(x - 60, 640)) / 40)); });
    o += lbl(360, 966, 'مصابٌ… ولا يبدو عليه شيء', ease(ramp(t, WS(5, 10), WS(5, 12))), '#b4ff8a', 26) + `</g>`; }
  F.ov = o; return space(t);
}

// ---------- 6: crowded cities fall first, in days; villages and far mountains may last for months ----------
function sceneCities(t) {
  const T = t - S0(6) + .2, hz = 690, cf = ease(ramp(t, WS(6, 2), WS(6, 5) + .3)), vf = ease(ramp(t, WS(6, 6) - .2, WS(6, 9)));
  let s = `<defs>${LDEFS()}${ZDEFS()}<linearGradient id="dkS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a6a"/><stop offset=".55" stop-color="#c88a6a"/><stop offset="1" stop-color="#f2c08a"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dkS)"/><circle cx="600" cy="${hz - 50}" r="230" fill="url(#sunW)" opacity=".8"/>` + sun3(600, hz - 50, 1, '#ffe0b0') + cumulus(300 + T * 4, 470, 240, 141, { a: .55 });
  s += mountainsR(hz - 10, 110, 541, { rock: '#7a6a7a', haze: .72, hazeCol: '#f0c8a0', snowAt: .62 }) + `<rect x="-20" y="${hz - 22}" width="760" height="60" fill="#c09a80"/>`;
  // the city far away on the plain: small, smoke, a sick green haze, its lights failing
  let city = farCity(77, hz + 40, '#6a6274', { hk: .55 }); const r = RS(78);
  for (let i = 0; i < 70; i++) { const x = r() * 720, y = hz + 36 - r() * 70; city += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="2.4" height="3" fill="#ffd27e" opacity="${(r() < .55 * (1 - cf) + .08 ? .85 : 0).toFixed(2)}"/>`; }
  s += `<g transform="translate(80,${hz + 40}) scale(.62,.7) translate(0,${-hz - 40})">${city}</g>` + `<ellipse cx="300" cy="${hz + 20}" rx="300" ry="50" fill="#9ad87a" opacity="${(.1 + .3 * cf).toFixed(2)}" filter="url(#blur12)"/>` +
    plume(150, hz + 30, .4 + .5 * cf, t, 2, .4) + plume(300, hz + 34, .3 + .6 * cf, t, 5, .5) + plume(430, hz + 36, .5 * cf, t, 8, .35);
  s += `<rect x="-20" y="${hz + 38}" width="760" height="40" fill="#a88e74"/><rect x="-20" y="${hz + 30}" width="760" height="30" fill="#f0c8a0" opacity=".4" filter="url(#blur9)"/>`;
  // our hillside in front with the village
  const ridge = `M-20,1300 L-20,${hz + 150} C150,${hz + 110} 330,${hz + 150} 470,${hz + 120} C580,${hz + 96} 680,${hz + 104} 740,${hz + 92} L740,1300Z`;
  s += `<defs><clipPath id="rdgC"><path d="${ridge}"/></clipPath></defs><path d="${ridge}" fill="#6a8040"/><g clip-path="url(#rdgC)">` + meadow(hz + 90, 1300, t, { c0: '#8aa452', c1: '#4a6428' }) + `</g>` + forestR(hz + 104, 18, 34, 80, 17, '#34562a', { haze: .2, hazeCol: '#e2c8a0', x0: 420, x1: 740, dy: 30 }) + forestR(hz + 140, 8, 30, 60, 19, '#3a5a2c', { haze: .2, hazeCol: '#e2c8a0', x0: -20, x1: 200, dy: 20 });
  const HS = [[200, 960, .95, '#d8c8a8', '#7a3a2e', 3], [440, 990, 1.05, '#c8b494', '#4a4e58', 5], [600, 1080, 1.25, '#e0d2b4', '#8a4a38', 6], [250, 1130, 1.45, '#bca282', '#5a3a2e', 7]];
  const ppl = []; HS.forEach(([x, y, sc, w, rf, sd], i) => ppl.push([y, cottage(x, y, sc, w, rf, sd, { smoke: i % 2 === 0, t, lit: .6 })]));
  [[350, 1030, .3, 1, 2], [376, 1034, .3, -1, 6], [520, 1150, .36, 1, 4], [90, 1220, .42, 1, 8]].forEach(([x, y, sc, f, pi]) => ppl.push([y, man(x, y, sc, f, pi, { noShadow: 1 })]));
  ppl.push([1220, deer(620, 1236, .5, -1, t * 2)]);
  ppl.sort((a, b) => a[0] - b[0]); s += ppl.map(q => q[1]).join('');
  s += `<g opacity="${cf.toFixed(2)}">${panel(170, hz - 150, 240, 70, 1)}${lbl(290, hz - 104, 'المدن: أيّام', 1, '#ff8a7a', 30)}</g>` + `<g opacity="${vf.toFixed(2)}">${panel(330, 880, 320, 70, 1)}${lbl(490, 926, 'القرى والجبال: شهور', 1, '#b4ff8a', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 7: with no workers, power and internet go out within days ----------
function sceneDark(t) {
  const T = t - S0(7) + .2, y0 = PV + 78, t0 = WS(7, 3) - .1, ord = [2, 0, 4, 1, 3]; F.beams = '';
  const litB = ord.map(q => flick(t, t0 + q * .3)), litS = [1, 3, 0, 4, 2].map(q => flick(t, t0 + .15 + q * .3)), lampK = flick(t, t0 + .5), dk = ease(ramp(t, t0, t0 + 2));
  const N = lerp(.82, .95, dk), pR = Math.max(0, Math.sin(t * 3));
  let emit = `<rect x="-20" y="-20" width="760" height="1320" fill="#0c1430" opacity="${(.12 + .42 * dk).toFixed(2)}" style="mix-blend-mode:multiply"/>`;
  const ppl = [[y0 + 2, zombie(Math.min(80 + T * 16, 270), y0 + 2, .8, 1, 2, t)], [1240, zombie(Math.min(80 + T * 24, 280 - 20 * pR), 1240, .98, 1, 4, t, { lean: 9 - 12 * pR })], [y0 - 6, zombie(Math.min(-40 + T * 18, 170), y0 - 6, .74, 1, 0, t)],
    [1246, soldier(420, 1246, 1.0, -1, 3, t, { shield: 1, push: pR })], [y0 + 6, soldier(500, y0 + 6, .82, -1, 0, t, { torch: 10 })], [1200, hazmat(588, 1200, .94, -1, t, { torch: 4 })]];
  ppl.sort((a, b) => a[0] - b[0]); const top = ppl.map(q => q[1]).join('');
  emit += F.beams;
  const sky2 = `<circle cx="150" cy="430" r="70" fill="url(#sunW)" opacity=".22"/><circle cx="150" cy="430" r="20" fill="#eef2ff" opacity=".9"/>`;
  let s = `<defs>${ZDEFS()}</defs>` + street10(t, { N, id: 'dk', cars: 0, overcast: 1, noMoon: 1, sky2, litB, litS, lampK, tv: litB[1], emit, top });
  s += noSignal(360, 560, ease(ramp(t, WS(7, 5), WS(7, 6))));
  noEarth(); F.ov = ''; return s;
}
