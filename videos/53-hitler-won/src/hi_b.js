// hi_b.js: scenes 5-8 (the V-2 reaches space in 1944, von Braun's Saturn V to the Moon, rockets kept as weapons, the bomb begun out of fear of Hitler)
const HIDEF2 = `<linearGradient id="bSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e74b8"/><stop offset=".7" stop-color="#8ab8e0"/><stop offset="1" stop-color="#d4e6f2"/></linearGradient>` +
  `<linearGradient id="dawnS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".5" stop-color="#8a7aa0"/><stop offset=".8" stop-color="#f0a87a"/><stop offset="1" stop-color="#ffd09a"/></linearGradient>` +
  `<linearGradient id="nightS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070e"/><stop offset=".7" stop-color="#141826"/><stop offset="1" stop-color="#262a36"/></linearGradient>` +
  `<linearGradient id="desS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e4270"/><stop offset=".55" stop-color="#b48a8a"/><stop offset=".85" stop-color="#f4b47a"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient>` +
  `<linearGradient id="cylW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a8e96"/><stop offset=".3" stop-color="#f6f7f9"/><stop offset=".55" stop-color="#ffffff"/><stop offset="1" stop-color="#9a9ea6"/></linearGradient>` +
  `<linearGradient id="cylK" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050506"/><stop offset=".35" stop-color="#3a3c42"/><stop offset="1" stop-color="#08080a"/></linearGradient>` +
  `<linearGradient id="cylG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3e30"/><stop offset=".35" stop-color="#7a7e66"/><stop offset="1" stop-color="#2a2c22"/></linearGradient>` +
  `<linearGradient id="flmG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".2" stop-color="#fff2b0"/><stop offset=".55" stop-color="#ffa840"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="beamG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e8f0ff" stop-opacity=".45"/><stop offset="1" stop-color="#e8f0ff" stop-opacity="0"/></linearGradient>` +
  `<radialGradient id="limbG" cx=".5" cy=".5" r=".5"><stop offset=".93" stop-color="#7ab8ff" stop-opacity="0"/><stop offset=".97" stop-color="#9ad0ff" stop-opacity=".9"/><stop offset="1" stop-color="#9ad0ff" stop-opacity="0"/></radialGradient>`;
const HIDEFS2 = () => HIDEFS() + HIDEF2;
// a 2D starfield
function stars2(n, seed, a, y1 = 1280) { if (a <= 0) return ''; const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * y1).toFixed(1)}" r="${(.6 + r() * 1.5).toFixed(1)}" fill="#fff" opacity="${(a * (.35 + .6 * r())).toFixed(2)}"/>`; return s; }
// the V-2: ogive nose, long body, tapered tail, four fins; black-and-white test paint
function v2R(x, y, s, o = {}) {
  const H = 250, W = 34, nose = 70, tail = 200;
  const body = `M0,${-H} C${W * .55},${-H + 18} ${W / 2},${-H + nose * .7} ${W / 2},${-H + nose} L${W / 2},${-H + tail} L${W * .36},-8 L${-W * .36},-8 L${-W / 2},${-H + tail} L${-W / 2},${-H + nose} C${-W / 2},${-H + nose * .7} ${-W * .55},${-H + 18} 0,${-H}Z`;
  const id = 'v2c' + (o.id || 0), mil = o.mil;
  let g = `<defs><clipPath id="${id}"><path d="${body}"/></clipPath></defs><path d="M${W * .3},-50 L${W * 1.25},-6 L${W * 1.25},4 L${W * .32},-4Z" fill="${mil ? '#3a3e30' : '#141416'}"/><path d="M${-W * .3},-50 L${-W * 1.25},-6 L${-W * 1.25},4 L${-W * .32},-4Z" fill="${mil ? '#4a4e3e' : '#f0f0f2'}"/>`;
  g += `<path d="${body}" fill="url(#${mil ? 'cylG' : 'cylW'})"/><g clip-path="url(#${id})">`;
  if (!mil) { g += `<rect x="0" y="${-H + nose}" width="${W}" height="${(tail - nose) / 2}" fill="url(#cylK)"/><rect x="${-W}" y="${-H + nose + (tail - nose) / 2}" width="${W}" height="${(tail - nose) / 2}" fill="url(#cylK)"/><rect x="${-W}" y="${-H + tail}" width="${W}" height="${H - tail}" fill="url(#cylK)"/><rect x="${-W}" y="${-H}" width="${W}" height="${nose}" fill="url(#cylK)" opacity=".9"/>`; }
  g += `<rect x="${-W}" y="${-H}" width="${W * .3}" height="${H}" fill="#000" opacity=".22"/><path d="M${W * .12},${-H + 10} V-10" stroke="#fff" stroke-width="3" opacity=".25"/>` + [nose, (nose + tail) / 2, tail].map(q => `<path d="M${-W},${-H + q} H${W}" stroke="#000" stroke-width="1.4" opacity=".35"/>`).join('') + `</g>`;
  g += `<path d="M-3,-60 L3,-60 L4,10 L-4,10Z" fill="${mil ? '#2a2c22' : '#1a1a1c'}"/>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s}) rotate(${(o.rot || 0).toFixed(2)})">${g}</g>`;
}
function flame(x, y, s, t, k = 1) { if (k <= 0) return ''; const f = 1 + .12 * Math.sin(t * 40) + .06 * Math.sin(t * 67); return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * k).toFixed(3)})"><ellipse cx="0" cy="${(60 * f).toFixed(1)}" rx="${(46 * f).toFixed(1)}" ry="${(120 * f).toFixed(1)}" fill="#ff9a3a" opacity=".35" filter="url(#blur5)"/><path d="M-14,0 C-22,${(60 * f).toFixed(1)} -8,${(120 * f).toFixed(1)} 0,${(170 * f).toFixed(1)} C8,${(120 * f).toFixed(1)} 22,${(60 * f).toFixed(1)} 14,0Z" fill="url(#flmG)"/><path d="M-7,0 C-10,30 -4,60 0,${(84 * f).toFixed(1)} C4,60 10,30 7,0Z" fill="#fff" opacity=".9"/></g>`; }
function trail(x, y0, y1, w, t, a, seed = 3) { if (a <= 0 || y1 <= y0) return ''; const L = [], Rr = [], n = 30;
  for (let i = 0; i <= n; i++) { const k = i / n, y = lerp(y0, y1, k), ww = w * (.35 + 1.6 * Math.pow(k, .8)) * (1 + .18 * Math.sin(k * 23 + seed + t * 2)), dx = Math.sin(k * 4 + seed + t * .4) * w * .5 * k; L.push([x + dx - ww, y]); Rr.push([x + dx + ww * (1 + .1 * Math.sin(k * 17 + t)), y]); }
  const d = `M${L.map(PT).join(' L')} L${Rr.reverse().map(PT).join(' L')}Z`;
  return `<g opacity="${a.toFixed(2)}"><path d="${d}" fill="#d8d4cc" filter="url(#blur5)"/><path d="${d}" fill="#f6f4f0" transform="translate(${(w * .25).toFixed(1)},0) scale(1,1)" opacity=".7" filter="url(#blur2)"/><path d="${d}" fill="#8a8680" opacity=".18" transform="translate(${(-w * .4).toFixed(1)},0)" filter="url(#blur5)"/></g>`; }

// ---------- 5: the first rocket to reach space was German (V-2, June 1944, 176 km) ----------
function sceneV2(t) {
  const t0 = S0(5) - .2, T = t - t0, lt = WS(5, 2) + .1, lift = ease(ramp(t, lt, lt + 1.4)), A = Math.pow(ramp(t, lt + .4, WS(5, 8) + .4), 1.15), alt = 176 * A;
  const gy = 1500 * ease(A), rb = lerp(1010, 720, lift);
  let s = `<defs>${HIDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#03050c"/>` + stars2(140, 5, ramp(A, .4, .8));
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#bSky)" opacity="${(1 - ramp(A, .2, .75)).toFixed(2)}"/>`;
  if (A > .55) { const k = ease(ramp(A, .55, 1)); s += `<g opacity="${k.toFixed(2)}"><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2200" fill="#2a5a9a"/><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2200" fill="#fff" opacity=".12" filter="url(#grainS)"/><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2290" fill="url(#limbG)"/></g>`; }
  s += `<g transform="translate(0,${gy.toFixed(1)})">${cumulus(150 + T * 4, 460, 260, 4, { a: .85 })}`;
  s += `<rect x="-20" y="880" width="760" height="40" fill="#5a8ab0"/><path d="M-20,880 L740,880" stroke="#fff" stroke-width="2" opacity=".5"/>`;
  let fr = ''; const r = RS(33); for (let i = 0; i < 46; i++) { const x = -20 + i * 17 + r() * 8; if (x > 300 && x < 430) continue; fr += pine(x, 1010 + r() * 20, 110 + r() * 130, 700 + i, '#2a4030'); } s += fr;
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#5a6a48"/><path d="M290,1012 L440,1012 L470,1300 L260,1300Z" fill="#9a968a"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<path d="M330,1012 L340,980 L388,980 L398,1012" stroke="#3a3a3e" stroke-width="8" fill="none"/><rect x="326" y="972" width="76" height="10" fill="#4a4a4e"/>`;
  s += `<g transform="translate(500,1010)">` + Array.from({ length: 3 }, (_, i) => hero(i * 46, 0, { s: .32, top: ['#4a4e56', '#6a5a48', '#3a3e48'][i], pants: '#2a2a30', skin: '#e2b896', hair: '#3a2a20', face: -1, lookUp: lift, shade: 1 })).join('') + `</g>`;
  if (t > lt - .1 && lift < 1) { const k = 1 - lift; s += `<ellipse cx="364" cy="990" rx="${(160 * k + 60).toFixed(1)}" ry="40" fill="#e8e4dc" opacity="${(.8 * k).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += `</g>`;
  if (t > lt) s += trail(364, rb + 20, 1010 + gy, 26, t, .9 * (1 - .5 * ramp(A, .5, 1)));
  if (t > lt) s += flame(364, rb - 4, .7, t, ease(ramp(t, lt, lt + .2)));
  s += v2R(364, rb, .9, { id: 1 });
  // altitude scale on the right
  const ga = ease(ramp(t, lt + .6, lt + 1.1)); if (ga > 0) { const yA = v => 1150 - v * 4.1; let g = `<g opacity="${ga.toFixed(2)}">` + panel(560, 360, 140, 840, 1) + `<path d="M630,${yA(0)} V${yA(190)}" stroke="#fff" stroke-width="4" opacity=".5"/>`;
    [0, 50, 150].forEach(v => g += `<path d="M618,${yA(v)} H642" stroke="#fff" stroke-width="2" opacity=".6"/>` + lbl(668, yA(v) + 8, AR(v), 1, '#cfd6e0', 20));
    g += `<path d="M574,${yA(100)} H690" stroke="#9fd0ff" stroke-width="3" stroke-dasharray="8 6"/>` + lbl(630, yA(100) + 30, 'حدُّ الفضاء', 1, '#9fd0ff', 20) + lbl(630, yA(100) + 54, '١٠٠ كم', 1, '#9fd0ff', 18);
    g += `<path d="M630,${yA(0)} V${yA(alt).toFixed(1)}" stroke="#f4c76b" stroke-width="8" stroke-linecap="round"/><circle cx="630" cy="${yA(alt).toFixed(1)}" r="10" fill="#f4c76b"/>` + lbl(630, yA(alt) - 22, AR(Math.round(alt)) + ' كم', 1, '#fff', 26);
    s += g + lbl(630, 1188, 'الارتفاع', 1, '#cfd6e0', 22) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 6: von Braun designed it as a weapon; after the war, in America, the rocket that took people to the Moon ----------
function saturnV(x, y, s) {
  const W = 52, H = 640; let g = `<rect x="${-W / 2}" y="${-H * .42}" width="${W}" height="${H * .42}" fill="url(#cylW)"/>`;
  g += [0, 1, 2, 3].map(i => `<rect x="${(i % 2 ? 0 : -W / 2)}" y="${-H * .42 + i * 18 + 40}" width="${W / 2}" height="18" fill="url(#cylK)" opacity="${i < 2 ? 1 : 0}"/>`).join('');
  g += `<rect x="${-W / 2}" y="-60" width="${W / 2}" height="60" fill="url(#cylK)"/><rect x="${-W / 2}" y="${-H * .42 - 20}" width="${W}" height="20" fill="#2a2a2e"/><path d="M${-W / 2},0 L${-W / 2 - 16},14 L${-W / 2 - 16},-34Z M${W / 2},0 L${W / 2 + 16},14 L${W / 2 + 16},-34Z" fill="#1a1a1c"/>`;
  g += `<rect x="${-W / 2}" y="${-H * .7}" width="${W}" height="${H * .27}" fill="url(#cylW)"/><rect x="${-W / 2}" y="${-H * .7 + 10}" width="${W / 2}" height="24" fill="url(#cylK)"/><rect x="${-W / 2}" y="${-H * .43 - 30}" width="${W}" height="12" fill="#3a3a3e"/>`;
  g += `<path d="M${-W / 2},${-H * .7} L${-W * .4},${-H * .74} L${-W * .4},${-H * .86} L${W * .4},${-H * .86} L${W * .4},${-H * .74} L${W / 2},${-H * .7}Z" fill="url(#cylW)"/><rect x="${-W * .4}" y="${-H * .78}" width="${W * .4}" height="22" fill="url(#cylK)"/>`;
  g += `<path d="M${-W * .4},${-H * .86} L${-W * .18},${-H * .93} L${W * .18},${-H * .93} L${W * .4},${-H * .86}Z" fill="#e8e8ec"/><path d="M${-W * .18},${-H * .93} L0,${-H * .97} L${W * .18},${-H * .93}Z" fill="#d8d8dc"/><path d="M0,${-H * .97} V${-H * 1.03} M-6,${-H * .99} L6,${-H * .99}" stroke="#c84a3a" stroke-width="3"/>`;
  g += `<rect x="${-W / 2}" y="${-H}" width="${W * .28}" height="${H}" fill="#000" opacity=".12"/>`;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})">${g}</g>`;
}
function gantry(x, y, h) { let g = `<rect x="${x - 34}" y="${y - h}" width="68" height="${h}" fill="none" stroke="#b83a2a" stroke-width="6"/>`;
  for (let i = 0; i < h / 34; i++) { const yy = y - i * 34; g += `<path d="M${x - 34},${yy} L${x + 34},${yy - 34} M${x + 34},${yy} L${x - 34},${yy - 34} M${x - 34},${yy} H${x + 34}" stroke="#a83020" stroke-width="2.5"/>`; }
  for (let i = 0; i < 6; i++) g += `<path d="M${x + 34},${y - 120 - i * 80} H${x + 74}" stroke="#a83020" stroke-width="7"/>`;
  return g + `<rect x="${x - 40}" y="${y - h - 30}" width="80" height="30" fill="#8a2a1e"/>`; }
function sceneSaturn(t) {
  const t0 = S0(6) - .2, T = t - t0, lt = WS(6, 9) - .3, up = Math.pow(ramp(t, lt, lt + 2.2), 1.8), pan = ease(ramp(t, lt + .8, WS(6, 14) + .2)), gy = 900 * pan;
  let s = `<defs>${HIDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dawnS)"/>` + stars2(60, 8, .5 * (1 - ramp(T, 0, 6)), 600);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#141a34" opacity="${(.55 * pan).toFixed(2)}"/>` + stars2(80, 12, pan * .8, 900);
  s += `<g transform="translate(0,${gy.toFixed(1)})"><circle cx="560" cy="1000" r="300" fill="url(#sunW)" opacity=".5"/><rect x="-20" y="1000" width="760" height="40" fill="#e8a070"/><rect x="-20" y="1012" width="760" height="40" fill="#5a6a8a"/>`;
  s += `<path d="M-20,1060 L740,1052 L740,1300 L-20,1300Z" fill="#4a5a3e"/><path d="M200,1062 L520,1058 L560,1130 L160,1136Z" fill="#8a8680"/><rect x="-20" y="1060" width="760" height="240" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += gantry(440, 1062, 700);
  const ry = 1062 - 1500 * up; s += `</g>`;
  if (t > lt) { s += trail(330, ry + gy + 10, 1062 + gy + 40, 34, t, .9 * (1 - ramp(up, .6, 1))); s += flame(330, ry + gy - 2, 1.1, t, ease(ramp(t, lt, lt + .25))); s += `<ellipse cx="330" cy="${1050 + gy}" rx="${(260 * ease(ramp(t, lt, lt + 1))).toFixed(1)}" ry="60" fill="#f2ece4" opacity="${(.85 * (1 - ramp(t, lt + 2, lt + 4))).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += saturnV(330, ry + gy, 1);
  s += `<g transform="translate(0,${gy.toFixed(1)})">${hero(110, 1150, { s: .55, top: '#cfd2d8', pants: '#3a3e48', skin: '#e8c4a4', hair: '#2a2420', shade: 1, lookUp: ease(ramp(t, lt, lt + 1)) * 1.2, face: 1 })}${lbl(110, 1215, 'فون براون', ease(ramp(t, WS(6, 1) - .2, WS(6, 1) + .2)) * (1 - pan), '#fff', 24)}</g>`;
  const ma = ease(ramp(t, WS(6, 13), WS(6, 14) + .3)), mx = 500, my = lerp(380, 520, pan), mr = 120;
  const cam = { pos: [0, 0, 10], look: [0, 0, 0], fov: 30 }, wz = Math.tan(15 * Math.PI / 180) * 10 / 640;
  F.w = { set: 'space', cam, L: [-.6, .5, .6], disc: null, moon: { pos: [(mx - 360) * wz, -(my - 640) * wz, 0], r: mr * wz * Math.max(.002, ma), L: [-.7, .35, .55], shC: NOFAR, shR: .001, rot: 1.2 } };
  F.ov = ''; return s;
}

// ---------- 7: in a world ruled by Hitler, rockets might have stayed weapons only ----------
function sceneWeapons(t) {
  const t0 = S0(7) - .2, T = t - t0;
  let s = `<defs>${HIDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#nightS)"/>` + stars2(120, 21, .7, 800);
  [[120, -.4, 1.3], [600, .35, .9]].forEach(([x, a0, sp], i) => { const q = a0 + Math.sin(T * sp * .6 + i) * .25; s += `<path d="M${x},1000 L${(x + Math.sin(q - .05) * 1400).toFixed(0)},${(1000 - Math.cos(q - .05) * 1400).toFixed(0)} L${(x + Math.sin(q + .05) * 1400).toFixed(0)},${(1000 - Math.cos(q + .05) * 1400).toFixed(0)}Z" fill="url(#beamG)"/>`; });
  s += `<rect x="-20" y="880" width="760" height="420" fill="#1e2228"/><rect x="-20" y="880" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += farRuinsH(14, 900, '#121418', 12);
  const R = [[110, 1000, .62], [250, 990, .58], [390, 1000, .62], [530, 990, .58], [650, 1000, .6], [60, 1150, .8], [220, 1140, .78], [380, 1160, .82], [540, 1140, .78], [680, 1160, .8]];
  R.forEach(([x, y, k], i) => { s += `<path d="M${x - 40 * k},${y} L${x - 26 * k},${y - 26 * k} L${x + 26 * k},${y - 26 * k} L${x + 40 * k},${y}" stroke="#3a3c40" stroke-width="${6 * k}" fill="none"/>` + v2R(x, y - 24 * k, k, { id: 10 + i, mil: 1 }); });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#3a4050" opacity=".12"/>`;
  const ma = ease(ramp(t, t0 + .2, t0 + .9)), mx = 230, my = 520, mr = 70, cam = { pos: [0, 0, 10], look: [0, 0, 0], fov: 30 }, wz = Math.tan(15 * Math.PI / 180) * 10 / 640;
  F.w = { set: 'space', cam, L: [-.6, .5, .6], disc: null, moon: { pos: [(mx - 360) * wz, -(my - 640) * wz, 0], r: mr * wz * Math.max(.002, ma), L: [.5, .3, .8], shC: NOFAR, shR: .001, rot: 1.2 } };
  F.ov = lbl(mx, my + 112, 'لا أحدَ يصلُ إليه', ease(ramp(t, WS(7, 4), WS(7, 5))), '#cfd6e0', 26); return s;
}

// ---------- 8: the atomic bomb: America began it for fear that Hitler would build it first ----------
function letterP(x, y, a, rot) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) rotate(${rot})"><rect x="-200" y="-270" width="400" height="540" fill="url(#paperG)"/><rect x="-200" y="-270" width="400" height="540" fill="#c8b48a" filter="url(#paperF)" opacity=".45"/>`;
  s += `<text x="-160" y="-210" font-family="Georgia, serif" font-size="17" fill="#2a2420">Albert Einstein</text><text x="-160" y="-188" font-family="Georgia, serif" font-size="13" fill="#4a4038">Old Grove Rd., Long Island</text><text x="-160" y="-150" font-family="Georgia, serif" font-size="14" fill="#2a2420">August 2nd, 1939</text>`;
  const r = RS(91); for (let i = 0; i < 14; i++) { const w = 240 + r() * 80; s += `<path d="M-160,${-110 + i * 22} h${(i % 5 === 4 ? w * .5 : w).toFixed(0)}" stroke="#4a4038" stroke-width="4" stroke-dasharray="${(6 + r() * 20).toFixed(0)} 5 ${(10 + r() * 30).toFixed(0)} 5" opacity=".55"/>`; }
  s += `<path d="M-40,210 c10,-30 30,-28 26,-4 c-4,20 14,-24 30,-16 c12,6 -6,22 10,18 c20,-6 30,-28 46,-20 c10,6 0,18 18,10" stroke="#1a2a5a" stroke-width="3" fill="none"/>`;
  return s + `</g>`; }
function trinityT(x, y, h) { let g = ''; for (let i = 0; i < h / 30; i++) { const yy = y - i * 30, w = lerp(70, 30, i * 30 / h); g += `<path d="M${x - w},${yy} L${x + lerp(70, 30, (i + 1) * 30 / h)},${yy - 30} M${x + w},${yy} L${x - lerp(70, 30, (i + 1) * 30 / h)},${yy - 30} M${x - w},${yy} H${x + w}" stroke="#2a2018" stroke-width="2.4"/>`; }
  return `<path d="M${x - 70},${y} L${x - 30},${y - h} M${x + 70},${y} L${x + 30},${y - h}" stroke="#1e1610" stroke-width="5"/>` + g + `<rect x="${x - 40}" y="${y - h - 40}" width="80" height="40" fill="#3a2e24"/><path d="M${x - 40},${y - h - 40} L${x},${y - h - 62} L${x + 40},${y - h - 40}Z" fill="#2a2018"/>`; }
function sceneManhattan(t) {
  const t0 = S0(8) - .2, T = t - t0, sw = ease(ramp(t, WS(8, 3) - .3, WS(8, 3) + .5));
  let s = `<defs>${HIDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#desS)"/><circle cx="210" cy="900" r="330" fill="url(#sunW)" opacity=".7"/>`;
  s += mesas(900, 17, '#b0623a', 230, { haze: .35, hazeCol: '#e4a888' }) + `<rect x="-20" y="896" width="760" height="410" fill="#c89a6a"/><rect x="-20" y="896" width="760" height="410" fill="#5a3418" filter="url(#grainR)" opacity=".25"/>`;
  const r = RS(5); for (let i = 0; i < 26; i++) { const x = r() * 740, y = 930 + r() * 340, k = .4 + (y - 900) / 400; s += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(18 * k).toFixed(1)}" ry="${(8 * k).toFixed(1)}" fill="#6a6a3a"/><ellipse cx="${(x - 3).toFixed(0)}" cy="${(y - 2).toFixed(0)}" rx="${(12 * k).toFixed(1)}" ry="${(5 * k).toFixed(1)}" fill="#8a8a4a"/>`; }
  s += trinityT(470, 960, 420) + `<path d="M470,960 L640,1290 M470,960 L120,1290" stroke="#3a2a1e" stroke-width="2" opacity=".5"/>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a1028" opacity=".15"/>`;
  s += `<g opacity="${(1 - sw).toFixed(2)}"><rect x="-20" y="-20" width="760" height="1320" fill="#3a2a1e"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#barkF)" opacity=".25"/>${letterP(320, 820, 1, -2 + T * .2)}<circle cx="560" cy="460" r="200" fill="url(#candH)" opacity=".5"/></g>`;
  s += lbl(360, 1120, 'رسالةُ أينشتاين إلى الرئيس الأمريكيّ ١٩٣٩', ease(ramp(t, t0 + .4, t0 + .8)) * (1 - sw), '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
