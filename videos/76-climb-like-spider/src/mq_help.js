// mq_a.js (#75): what if every mosquito in the world vanished? Built on the #74 chain (room, bedK from kid_a.js, studio, streetO, uwBg, labRoom, gW/gAt, bird, reeds, mountainsR).
const MQL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arMQ = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const MQDF = `<radialGradient id="mqTh" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#5a4a40"/><stop offset=".55" stop-color="#241a16"/><stop offset="1" stop-color="#0c0806"/></radialGradient>
<linearGradient id="mqAb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2e28"/><stop offset=".5" stop-color="#1a1210"/><stop offset="1" stop-color="#0a0605"/></linearGradient>
<linearGradient id="mqW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#e8f0ff" stop-opacity=".55"/><stop offset="1" stop-color="#c8d8f0" stop-opacity=".25"/></linearGradient>
<radialGradient id="mqBk" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#4a6a3a"/><stop offset=".6" stop-color="#22341e"/><stop offset="1" stop-color="#0c140a"/></radialGradient>
<linearGradient id="pondW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a7a5a"/><stop offset=".4" stop-color="#2a4a36"/><stop offset="1" stop-color="#101e16"/></linearGradient>
<linearGradient id="tunS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8aa8c8"/><stop offset=".6" stop-color="#c8d4dc"/><stop offset="1" stop-color="#e8e4d8"/></linearGradient>
<linearGradient id="tunG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a7a4a"/><stop offset="1" stop-color="#4a4a2a"/></linearGradient>
<radialGradient id="biteR" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e05a4a"/><stop offset=".6" stop-color="#e88a72" stop-opacity=".7"/><stop offset="1" stop-color="#e8a088" stop-opacity="0"/></radialGradient>
<filter id="wBlur" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter>`;
const MQDEFS = () => `${LDEFS()}${MQDF}`;
// a mosquito (Aedes, black with white bands), side view, head to the LEFT; about 290 units long at s = 1. o.f = 1 faces right,
// o.t time (wing beat), o.fly wings blurred, o.male plumose antennae, o.a opacity, o.bob, o.red tint (dangerous species), o.feed proboscis down
function mosq(x, y, s, o = {}) {
  const f = o.f === 1 ? -1 : 1, t = o.t || 0, a = o.a ?? 1; if (a <= 0) return '';
  const wb = Math.sin(t * 90), band = o.red ? '#ff9a8a' : '#f2f2ea', body = o.red ? '#5a1a14' : null;
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(s * f).toFixed(3)},${s.toFixed(3)})" opacity="${a.toFixed(2)}">`;
  const leg = (pts, w = 2.6) => { const d = 'M' + pts.map(p => p.join(',')).join(' L'); return `<path d="${d}" stroke="${body || '#140e0c'}" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" stroke="${band}" stroke-width="${w * .9}" fill="none" stroke-dasharray="2 13" opacity=".7"/>`; };
  // far legs (darker), then body, then near legs
  const lp = o.perch ? 1 : 0;
  g += `<g opacity=".55">` + leg([[-8, 14], [-40, -18], [-96, 50 + lp * 10], [-116, 92]], 2.2) + leg([[4, 16], [10, -20], [36, 60], [46, 100]], 2.2) + leg([[14, 14], [70, -36], [150, -64], [190, -50]], 2.2) + `</g>`;
  // wings
  if (o.fly) { g += `<g filter="url(#wBlur)">` + [-1, 1].map(k => `<path d="M-4,-18 C30,${-60 * k - 8} 120,${-56 * k - 18} 150,${-30 * k - 20} C120,${-18 * k - 18} 40,${-12 * k - 14} -4,-12Z" fill="url(#mqW)" opacity=".45"/>`).join('') + `</g>`; }
  else { const lift = o.lift ?? 0; g += `<g transform="rotate(${-8 - lift * 30} -4 -16)"><path d="M-4,-18 C40,-34 130,-38 162,-18 C130,-8 40,-6 -4,-12Z" fill="url(#mqW)" stroke="#9ab0c8" stroke-width="1" stroke-opacity=".6"/>` +
    [[-2, -16, 150, -22], [10, -17, 140, -14], [30, -20, 120, -28], [50, -14, 150, -12]].map(v => `<path d="M${v[0]},${v[1]} Q${(v[0] + v[2]) / 2},${(v[1] + v[3]) / 2 - 4} ${v[2]},${v[3]}" stroke="#5a6a80" stroke-width=".9" fill="none" opacity=".6"/>`).join('') +
    `<path d="M20,-10 C70,-6 130,-8 160,-17" stroke="#3a3a44" stroke-width="2" stroke-dasharray="1.5 3" fill="none" opacity=".5"/></g>`; }
  // abdomen: long, slightly curved down, white bands at each segment
  g += `<path d="M14,-8 C50,-14 110,-6 150,14 C156,18 154,26 146,26 C104,22 52,22 12,14Z" fill="${body || 'url(#mqAb)'}"/>`;
  for (let i = 0; i < 7; i++) { const x0 = 26 + i * 18; g += `<path d="M${x0},${-11 + i * 3.2} q2,${12 + i * .4} 0,${24 - i * .6}" stroke="${band}" stroke-width="3.2" fill="none" opacity=".9"/>`; }
  g += `<path d="M20,-9 C60,-14 110,-6 146,12" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`;
  // thorax: a hump with one white stripe on top (Aedes albopictus)
  g += `<ellipse cx="-12" cy="-2" rx="34" ry="27" fill="${body || 'url(#mqTh)'}"/><path d="M-38,-14 Q-14,-34 12,-20" stroke="${band}" stroke-width="3.4" fill="none" opacity=".95"/>` +
    `<circle cx="22" cy="-16" r="4" fill="#2a2018"/><path d="M22,-16 l6,-9" stroke="#2a2018" stroke-width="1.6"/><circle cx="28" cy="-26" r="3" fill="#6a5a48"/>`;
  // head with a large compound eye, antennae, palps and the proboscis
  const pd = o.feed ? 30 : 0;
  g += `<path d="M-54,12 C-80,${18 + pd * .5} -120,${30 + pd} -168,${46 + pd * 1.6}" stroke="${body || '#140e0c'}" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M-96,${25 + pd * .7} l-14,${4 + pd * .3}" stroke="${band}" stroke-width="3.6" stroke-linecap="round"/>`;
  g += `<path d="M-52,14 C-62,${18 + pd * .3} -72,${22 + pd * .5} ${o.male ? -120 : -78},${o.male ? 36 + pd : 24 + pd * .5}" stroke="#1a1210" stroke-width="2.6" fill="none"/>`;
  g += `<circle cx="-48" cy="6" r="17" fill="#1a1210"/><circle cx="-50" cy="4" r="14" fill="#2a2a34"/>` + Array.from({ length: 14 }, (_, i) => { const an = i * 2.4, r = 3 + (i % 4) * 2.6; return `<circle cx="${(-50 + Math.cos(an) * r).toFixed(1)}" cy="${(4 + Math.sin(an) * r).toFixed(1)}" r="1.5" fill="#4a4a5a" opacity=".7"/>`; }).join('') + `<ellipse cx="-55" cy="-1" rx="4" ry="2.5" fill="#fff" opacity=".55"/>`;
  if (o.pollen) g += `<path d="M-54,-6 l-10,-14" stroke="#c8b050" stroke-width="1.6"/><ellipse cx="-66" cy="-23" rx="6" ry="4.4" fill="#f0d24a"/><ellipse cx="-68" cy="-25" rx="2" ry="1.4" fill="#fff" opacity=".7"/>`;
  { const ax = -60, ay = -4, ex = -104, ey = -40; g += `<path d="M${ax},${ay} Q${ax - 20},${ay - 22} ${ex},${ey}" stroke="#1a1210" stroke-width="1.8" fill="none"/>`;
    for (let i = 1; i < 9; i++) { const k = i / 9, px = lerp(ax, ex, k) - 6 * Math.sin(k * 3.1), py = lerp(ay, ey, k) - 8 * Math.sin(k * 3.1), L = o.male ? 20 - i * 1.2 : 4; g += `<path d="M${(px - L * .7).toFixed(1)},${(py + L * .5).toFixed(1)} L${(px + L * .7).toFixed(1)},${(py - L * .5).toFixed(1)} M${(px - L * .5).toFixed(1)},${(py - L * .7).toFixed(1)} L${(px + L * .5).toFixed(1)},${(py + L * .7).toFixed(1)}" stroke="#2a2018" stroke-width="${o.male ? 1.3 : .9}" opacity=".85"/>`; } }
  // near legs
  g += leg([[-16, 16], [-50, -10], [-110, 46 + lp * 14], [-132, 96]]) + leg([[-2, 20], [-6, -14], [16, 64], [24, 104]]) + leg([[10, 18], [60, -30], [140, -54], [182, -36]]);
  return g + `</g>`;
}
// a flying mosquito path (small, wings blurred) with a short buzz trace
function mqFly(t, cx, cy, rx, ry, s, ph = 0, a = 1, f) { const x = cx + Math.sin(t * 1.7 + ph) * rx + Math.sin(t * 4.3 + ph) * rx * .2, y = cy + Math.sin(t * 2.3 + ph * 1.3) * ry + Math.cos(t * 6 + ph) * ry * .15, dir = Math.cos(t * 1.7 + ph) > 0 ? 1 : -1; return { x, y, g: mosq(x, y, s, { fly: 1, t, a, f: f ?? (dir > 0 ? 1 : -1) }) }; }
// a magnifier: a ring with a handle-free lens, a thin line to the point it shows, and its content
function lens(cx, cy, r, px, py, a, inner, id) { if (a <= 0) return ''; return `<g opacity="${a.toFixed(2)}"><path d="M${px},${py} L${(cx + (px - cx) * r / Math.hypot(px - cx, py - cy)).toFixed(1)},${(cy + (py - cy) * r / Math.hypot(px - cx, py - cy)).toFixed(1)}" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="6 5"/><circle cx="${px}" cy="${py}" r="16" fill="none" stroke="#f4c76b" stroke-width="2.5"/>` +
  `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><g clip-path="url(#${id})">${inner}</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#f4c76b" stroke-width="7"/><circle cx="${cx}" cy="${cy}" r="${r - 6}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="5"/><path d="M${cx - r * .6},${cy - r * .55} a${r * .85},${r * .85} 0 0 1 ${r * .5},${-r * .3}" stroke="#fff" stroke-width="6" fill="none" opacity=".25"/></g>`; }
// particles flying off (the mosquito vanishing)
function puffQ(x, y, k, seed, col = '#2a2018', n = 26, R = 90) { if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const an = r() * 6.28, d = R * (.3 + r() * .7) * ease(k); s += `<circle cx="${(x + Math.cos(an) * d).toFixed(1)}" cy="${(y + Math.sin(an) * d - 20 * k).toFixed(1)}" r="${(1.5 + r() * 3) * (1 - k * .6)}" fill="${col}" opacity="${((1 - k) * .9).toFixed(2)}"/>`; }
  return s + `<circle cx="${x}" cy="${y}" r="${(10 + 80 * k).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(4 * (1 - k)).toFixed(1)}" opacity="${(1 - k).toFixed(2)}"/>`; }
// ---------- 0: hook: night, a child asleep; a mosquito circles near the head (seen in a lens), then vanishes ----------
function sceneHook(t) {
  const van = ramp(t, WS(0, 7), WS(0, 7) + .8), la = ease(ramp(t, .3, 1.0)) * (1 - ease(ramp(t, S0(1) - .5, S0(1) - .2)));
  let s = `<defs>${MQDEFS()}</defs>` + room(t, { N: 1, id: 'm0', hh: 2, mm: 40 + t * .2 });
  s += bedK(330, 1230, 1.35, { sleep: 1, skin: '#8d5a3b', hair: '#17110d' });
  const M = mqFly(t, 200, 930, 70, 40, .07, 0, 1 - ramp(t, WS(0, 7), WS(0, 7) + .15));
  s += M.g;
  if (van < 1) for (let i = 0; i < 3; i++) { const k = pmod(t * 1.6 + i / 3, 1); s += `<path d="M${(M.x - 20 - k * 30).toFixed(1)},${(M.y - 10).toFixed(1)} q-6,10 0,20" stroke="#fff" stroke-width="2" fill="none" opacity="${((1 - k) * .5 * (1 - van)).toFixed(2)}"/>`; }
  s += puffQ(M.x, M.y, van, 5, '#cfd6e0', 18, 40);
  const inner = `<rect x="300" y="520" width="440" height="440" fill="#141a2a"/><circle cx="520" cy="740" r="200" fill="#2a3450" opacity=".6" filter="url(#blur16)"/>` +
    (van < .2 ? mosq(520 + Math.sin(t * 2) * 10, 740 + Math.sin(t * 3) * 8, .95 * (1 - van * 2), { fly: 1, t, f: -1 }) : '') + puffQ(520, 740, van, 9, '#2a2018', 40, 160);
  s += lens(520, 740, 190, M.x, M.y, la, inner, 'lnM0');
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: no buzz at night, no bites: the sound wave goes flat, the bites on an arm fade ----------
function sceneQuiet(t) {
  const T = t - (S0(1) - .2), fl = ease(ramp(t, WS(1, 1), WS(1, 3) + .4)), bt = ease(ramp(t, WS(1, 5), WS(1, 7) + .4)), a = ease(ramp(t, S0(1), S0(1) + .4));
  let s = `<defs>${MQDEFS()}</defs>` + room(t, { N: 1, id: 'm1', hh: 2, mm: 41 + T * .2 });
  s += bedK(330, 1230, 1.35, { sleep: 1, skin: '#8d5a3b', hair: '#17110d' });
  for (let i = 0; i < 3; i++) { const k = pmod(T * .5 + i / 3, 1); s += `<text x="${(250 + k * 50).toFixed(1)}" y="${(1030 - k * 120).toFixed(1)}" font-family="Inter" font-weight="800" font-size="${(18 + k * 16).toFixed(1)}" fill="#cfd8ff" opacity="${(Math.sin(k * 3.14) * .8).toFixed(2)}">z</text>`; }
  // the buzz panel: a fast sine at about 500 beats a second, going flat
  let d = ''; for (let x = 0; x <= 240; x += 3) { const y = Math.sin(x * .55 + T * 40) * 34 * (1 - fl) * (.6 + .4 * Math.sin(x * .05)); d += (x ? ' L' : 'M') + (420 + x) + ',' + (590 + y).toFixed(1); }
  s += `<g opacity="${a.toFixed(2)}">${panel(400, 500, 280, 160)}<path d="${d}" stroke="${fl > .9 ? '#7ae08a' : '#ff8a6a'}" stroke-width="3.5" fill="none"/>${MQL(540, 640, fl > .9 ? 'صمت' : 'طنين', 1, '#fff', 24)}</g>`;
  // a forearm with three bites that fade
  const arm = `<rect x="300" y="700" width="440" height="440" fill="#2a3040"/><path d="M300,860 C420,830 560,820 740,850 L740,1010 C560,990 420,990 300,1020Z" fill="#b07a58"/><path d="M300,860 C420,830 560,820 740,850 L740,880 C560,850 420,856 300,890Z" fill="#fff" opacity=".12"/><path d="M300,990 C420,966 560,962 740,980 L740,1010 C560,990 420,990 300,1020Z" fill="#000" opacity=".2"/>` +
    [[430, 920], [540, 900], [620, 950]].map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${30 - i * 3}" fill="url(#biteR)" opacity="${(1 - bt).toFixed(2)}"/><circle cx="${x}" cy="${y}" r="3" fill="#8a2a1a" opacity="${(1 - bt).toFixed(2)}"/>`).join('');
  s += `<g opacity="${a.toFixed(2)}"><clipPath id="armC"><rect x="400" y="700" width="280" height="300" rx="18"/></clipPath><g clip-path="url(#armC)">${arm}</g><rect x="400" y="700" width="280" height="300" rx="18" fill="none" stroke="#f4c76b" stroke-width="4"/>${MQL(540, 1040, bt > .9 ? 'بلا لسعات' : 'لسعات', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the deadliest animal: the mosquito in close-up, then deaths per year by animal ----------
function sceneDanger(t) {
  const T = t - (S0(2) - .2), b = ease(ramp(t, WS(2, 3), WS(2, 5) + .5)), rise = ease(ramp(t, S0(2) - .2, S0(2) + .6));
  let s = `<defs>${MQDEFS()}</defs>` + studio('stM', '#3a2a2a', '#0c0808', 7);
  s += `<ellipse cx="360" cy="${700}" rx="300" ry="200" fill="#a04030" opacity=".18" filter="url(#blur16)"/>`;
  s += mosq(360 + 30, lerp(760, 650, rise) + Math.sin(T * 2.2) * 8 - b * 60, lerp(1.2, 1.35, rise) - b * .3, { fly: 1, t, f: -1 });
  const rows = [['البعوض', 600, '+٥٠٠ ألف', '#e04a3a'], ['الثعابين', 100, '≈ ١٠٠ ألف', '#c8a060'], ['الكلاب (داءُ الكَلَب)', 59, '≈ ٦٠ ألف', '#c8a060'], ['أسماك القرش', 0.01, '≈ ١٠', '#c8a060']];
  if (b > 0) { s += `<g opacity="${b.toFixed(2)}">${panel(30, 830, 660, 400)}${MQL(360, 880, 'وفياتُ البشرِ كلَّ عام', 1, '#f4c76b', 28)}`;
    rows.forEach(([n, v, tx, c], i) => { const y = 940 + i * 72, k = ease(ramp(t, WS(2, 4) + i * .2, WS(2, 6) + i * .2)), L = Math.max(4, 400 * v / 600) * k;
      s += lbl(680, y + 10, n, 1, '#fff', i === 2 ? 20 : 25, 'start') + `<rect x="${(480 - L).toFixed(1)}" y="${y - 16}" width="${L.toFixed(1)}" height="30" rx="6" fill="${c}"/>` + lbl(i ? 470 - L - 8 : 470, y + 9, tx, k.toFixed(2), '#fff', 22, 'start'); });
    s += `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: malaria and dengue across the warm belt of the world; over half a million deaths a year ----------
const MALQ = []; { const r = RS(77); const add = (n, la0, la1, lo0, lo1, w, kd) => { for (let i = 0; i < n; i++) MALQ.push([la0 + r() * (la1 - la0), lo0 + r() * (lo1 - lo0), w * (.6 + r() * .4), kd]); };
  add(70, -15, 14, -16, 42, 1, 0); add(10, -24, -12, 44, 50, .7, 0); add(14, 8, 28, 70, 92, .6, 1); add(16, -8, 20, 95, 125, .6, 1); add(10, -10, 6, 130, 150, .5, 0); add(14, -15, 5, -75, -45, .5, 1); add(8, 8, 20, -92, -75, .4, 1); }
function sceneMalaria(t) {
  const t0 = S0(3) - .2, T = t - t0, n = ease(ramp(t, WS(3, 2) - .3, WS(3, 4) + .6)), c = ease(ramp(t, WS(3, 6), WS(3, 12)));
  const G = gAt(t, 360, 720, { d: 8.6, el: .2, lon: 22 + T * 9, clouds: .35, lights: .35, off: -.75 });
  let ov = '';
  MALQ.forEach(([la, lo, w, kd], i) => { const k = clamp(n * 1.4 - (i / MALQ.length) * .4); if (k <= 0) return; const v = G.vis(la, lo); if (v < .1) return; const [x, y] = G.P(la, lo, 1.01), p = .75 + .25 * Math.sin(t * 3 + i * 1.7), a = k * clamp((v - .1) / .2) * w;
    const col = kd ? '#ff9a3a' : '#ff4a3a'; ov += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(15 * p).toFixed(1)}" fill="${col}" opacity="${(.32 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.2" fill="#ffe0d0" opacity="${a.toFixed(2)}"/>`; });
  ov += pin(G, 2, 20, 'الملاريا', ease(ramp(t, WS(3, 2), WS(3, 2) + .4)), '#ff8a7a', 32) + pin(G, 14, 98, 'حُمّى الضنك', ease(ramp(t, WS(3, 3), WS(3, 3) + .4)), '#ffb070', 30);
  if (c > 0) { const v = Math.round(500 * c); ov += `<g opacity="${ease(ramp(t, WS(3, 6) - .3, WS(3, 6))).toFixed(2)}">${panel(130, 1100, 460, 120)}${lbl(360, 1162, (c < .999 ? arMQ(v) + ' ألف' : '+ نصفُ مليون'), 1, '#ff9a8a', 44)}${lbl(360, 1202, 'وفاةٍ كلَّ عام', 1, '#fff', 24)}</g>`; }
  F.ov = `<defs>${MQDF}</defs>` + ov; return space(t);
}
// ---------- 4: millions of lives saved, most of them children: children walking to school in a street ----------
function sceneSaved(t) {
  const T = t - (S0(4) - .2);
  const K = [[120, .62, 1, 1, '#d8402a'], [250, .58, 1, 3, '#3a7ad8'], [-60, .6, 1, 5, '#e0a030'], [430, .64, 1, 2, '#4aa05a'], [600, .6, -1, 6, '#9a4ad8']];
  let top = '';
  K.forEach(([x0, sc, f, pi, bg], j) => { const xx = x0 + f * T * 52 * (1 + j * .06); top += kid(xx, 1082 + (j % 2) * 8, sc, f, pi, { walk: xx / (26 * sc) + j }, bg); });
  const mx = 340 + T * 40; top += woman(mx, 1090, 1.0, 1, { walk: mx / 26, aF: [.3, .5], aB: [-.2, .3] });
  let s = `<defs>${MQDEFS()}</defs>` + streetO(t, { id: 'm4', top });
  noEarth(); F.ov = ''; return s;
}
// a mosquito larva hanging head-down under the surface, breathing through its tail tube; w = wriggle
function larva(x, y, s, w, a = 1) { if (a <= 0) return ''; const b = Math.sin(w) * 10; return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M0,0 L-2,10 Q${(-4 + b * .3).toFixed(1)},30 ${(b * .6).toFixed(1)},50 Q${(b).toFixed(1)},64 ${(b * .8).toFixed(1)},76" stroke="#3a3a2a" stroke-width="7" fill="none" stroke-linecap="round"/>` +
  `<path d="M0,0 L-2,10 Q${(-4 + b * .3).toFixed(1)},30 ${(b * .6).toFixed(1)},50" stroke="#8a8a6a" stroke-width="2" fill="none" opacity=".6"/><ellipse cx="${(b * .8).toFixed(1)}" cy="82" rx="7" ry="6" fill="#2a2a1e"/><path d="M0,0 l10,-6 M0,0 l6,8" stroke="#3a3a2a" stroke-width="2"/>` +
  Array.from({ length: 5 }, (_, i) => `<path d="M${(b * i * .12 - 6).toFixed(1)},${14 + i * 12} l-8,-3 M${(b * i * .12 + 6).toFixed(1)},${14 + i * 12} l8,-3" stroke="#3a3a2a" stroke-width="1" opacity=".7"/>`).join('') + `</g>`; }
// a frog sitting, side view facing left; o.tg = tongue target [dx, dy] and length k (0..1)
function frog(x, y, s, o = {}) { const k = o.k || 0, tg = o.tg || [-120, -60];
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><ellipse cx="0" cy="6" rx="70" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
  g += `<path d="M40,0 C60,-10 70,-40 50,-56 C30,-70 0,-60 -20,-50 L-10,0Z" fill="#3a6a2a"/><path d="M48,-4 C70,-6 84,4 70,6 L20,6Z" fill="#2e5a22"/>`;
  g += `<path d="M-50,-36 C-60,-70 -10,-84 30,-70 C60,-60 64,-30 40,-10 C10,4 -40,0 -50,-36Z" fill="#4a8a34"/><path d="M-50,-36 C-40,-20 0,-8 40,-12 C10,0 -40,0 -50,-36Z" fill="#c8d89a"/>`;
  for (let i = 0; i < 8; i++) g += `<ellipse cx="${-20 + (i * 37) % 60}" cy="${-62 + (i * 23) % 34}" rx="5" ry="3.5" fill="#2a5a1e" opacity=".7"/>`;
  g += `<path d="M-30,-20 L-46,2 L-58,4 M-46,2 L-40,6" stroke="#4a8a34" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  g += `<circle cx="-38" cy="-70" r="13" fill="#4a8a34"/><circle cx="-38" cy="-71" r="9" fill="#c8a020"/><ellipse cx="-38" cy="-71" rx="6" ry="3" fill="#120c06"/><circle cx="-41" cy="-74" r="2.4" fill="#fff" opacity=".8"/>`;
  g += `<path d="M-58,-44 Q-40,-38 -20,-42" stroke="#2a4a1a" stroke-width="2" fill="none"/>`;
  if (k > 0) g += `<path d="M-56,-46 L${(-56 + tg[0] * k).toFixed(1)},${(-46 + tg[1] * k).toFixed(1)}" stroke="#e07a8a" stroke-width="6" stroke-linecap="round"/><circle cx="${(-56 + tg[0] * k).toFixed(1)}" cy="${(-46 + tg[1] * k).toFixed(1)}" r="7" fill="#e88a9a"/>`;
  return g + `</g>`; }
function lily(x, y, r, rot = 0) { return `<g transform="translate(${x},${y}) rotate(${rot})"><ellipse cx="0" cy="0" rx="${r}" ry="${r * .28}" fill="#3a7a3a"/><path d="M0,0 L${r},-${r * .06} L${r * .96},${r * .08}Z" fill="#2a4a36"/><ellipse cx="0" cy="-2" rx="${r * .9}" ry="${r * .22}" fill="#5a9a4a" opacity=".5"/></g>`; }
// ---------- 5: in ponds, mosquito larvae feed fish and frogs ----------
function scenePond(t) {
  const T = t - (S0(5) - .2), sy = 600, fa = ease(ramp(t, WS(5, 5), WS(5, 6) + .3)), fr = ease(ramp(t, WS(5, 7) - .1, WS(5, 7) + .5));
  let s = `<defs>${MQDEFS()}${UDEF}</defs><rect x="-20" y="-20" width="760" height="${sy + 30}" fill="url(#tunS)"/>`;
  s += `<path d="M-20,${sy - 120} Q120,${sy - 170} 260,${sy - 130} T560,${sy - 150} T760,${sy - 120} L760,${sy} L-20,${sy}Z" fill="#4a6a3a"/><path d="M-20,${sy - 70} Q200,${sy - 100} 400,${sy - 74} T760,${sy - 80} L760,${sy} L-20,${sy}Z" fill="#3a5a2e"/>`;
  s += reeds(60, sy + 4, 18, 3, t).split('stroke-width').join('stroke-width') + reeds(640, sy + 4, 16, 8, t);
  s += `<rect x="-20" y="${sy}" width="760" height="${1300 - sy}" fill="url(#pondW)"/>`;
  for (let i = 0; i < 6; i++) { const x = -40 + i * 140 + Math.sin(t * .4 + i) * 20; s += `<path d="M${x},${sy} L${x + 60},${sy} L${x + 180},1300 L${x - 40},1300Z" fill="#cfe8b0" opacity=".05"/>`; }
  s += `<path d="M-20,1170 Q200,1130 380,1160 T760,1150 L760,1300 L-20,1300Z" fill="#2a2418"/>` + Array.from({ length: 7 }, (_, i) => kelp(30 + i * 110, 1168, 160 + (i % 3) * 60, t, i, i % 2 ? '#3a5a2a' : '#4a6a30')).join('');
  // the surface line and larvae hanging under it
  s += `<rect x="-20" y="${sy - 2}" width="760" height="6" fill="#dff0e0" opacity=".45"/>`;
  const LV = [[110, .9], [170, .75], [240, 1], [300, .8], [520, .9], [580, 1], [640, .8], [380, .85]];
  const fx = lerp(820, 260, ease(ramp(t, S0(5) - .2, WS(5, 6) + .6))), fy = sy + 150 + Math.sin(T * 2) * 10;
  LV.forEach(([x, sc], i) => { const eaten = i === 2 && fx < 300 ? 1 : 0; s += larva(x + Math.sin(T * 1.3 + i) * 4, sy + 6, sc, T * 6 + i * 1.7, 1 - eaten); });
  s += fishA(fx, fy, 1.4, -1, '#8a9a6a', t, 0) + bubbles(t, 300, sy + 140, WS(5, 6), WS(5, 7) + 1, 6, 4, 30);
  // the frog on a lily pad catching an adult mosquito with its tongue
  s += lily(520, sy + 2, 90, 0) + lily(160, sy + 4, 60, 0);
  const M = mqFly(t, 360, 470, 30, 18, .16, 1, 1 - ramp(t, WS(5, 7) + .35, WS(5, 7) + .4));
  s += M.g + frog(560, sy - 4, 1.15, { k: Math.sin(Math.PI * fr), tg: [(M.x - 560) / 1.15 + 56, (M.y - sy + 4) / 1.15 + 46] });
  s += `<rect x="-20" y="${sy}" width="760" height="${1300 - sy}" fill="#0e2a1a" opacity=".12"/>`;
  s += MQL(200, 720, 'يرقاتُ البعوض', fa, '#f4c76b', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: in the Arctic summer, migrating birds feed on huge mosquito swarms over the tundra ponds ----------
function sceneArctic(t) {
  const T = t - (S0(6) - .2), bi = ease(ramp(t, WS(6, 3) - .4, WS(6, 4)));
  let s = `<defs>${MQDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#tunS)"/>`;
  s += `<path d="M-20,700 L60,610 L130,660 L220,560 L300,640 L380,590 L470,660 L560,580 L650,640 L740,600 L740,720 L-20,720Z" fill="#8a98a8"/><path d="M220,560 L250,590 L235,592 L262,618 L200,600Z M560,580 L590,612 L572,610 L600,640 L540,616Z" fill="#f4f6f8" opacity=".9"/>`;
  s += `<rect x="-20" y="700" width="760" height="620" fill="url(#tunG)"/><rect x="-20" y="700" width="760" height="620" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  [[180, 820, 150, 26], [520, 880, 190, 34], [300, 1000, 260, 50], [600, 1110, 200, 44]].forEach(([x, y, rx, ry]) => s += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#9ab4c8"/><ellipse cx="${x}" cy="${y - ry * .3}" rx="${rx * .8}" ry="${ry * .4}" fill="#dfe8ee" opacity=".5"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#5a5a34" stroke-width="5"/>`);
  for (let i = 0; i < 40; i++) s += tuft(-10 + (i * 97) % 740, 760 + (i * 53) % 520, 16 + (i % 4) * 6, i + 3);
  // far caribou herd
  for (let i = 0; i < 6; i++) s += deer(560 + i * 34 - T * 6, 728 + (i % 2) * 6, .18, -1, T * 3 + i, { col: '#7a6a5a' });
  // swarms: dark clouds of tiny dots over the ponds
  const SW = [[200, 700, 120], [480, 760, 150], [330, 900, 130]]; let sw = '';
  SW.forEach(([cx, cy, R], j) => { const r = RS(30 + j); for (let i = 0; i < 160; i++) { const an = r() * 6.28, d = Math.sqrt(r()) * R, x = cx + Math.cos(an + T * .6 * (r() - .5)) * d * 1.2 + Math.sin(T * 7 + i) * 4, y = cy + Math.sin(an) * d * .55 + Math.cos(T * 6 + i * 1.3) * 4; sw += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + r() * 1.2).toFixed(1)}" fill="#1a1612" opacity=".75"/>`; } sw += `<ellipse cx="${cx}" cy="${cy}" rx="${R * 1.1}" ry="${R * .55}" fill="#1a1612" opacity=".1" filter="url(#blur16)"/>`; });
  s += sw;
  // birds sweeping through the swarms
  for (let i = 0; i < 9; i++) { const p = pmod(T * .16 + i * .11, 1), x = lerp(800, -80, p), y = 640 + Math.sin(p * 9 + i) * 90 + i * 22, sc = (1.0 + (i % 3) * .35) * bi; if (sc > 0) s += bird(x.toFixed(1), y.toFixed(1), sc.toFixed(2), T * 14 + i, (Math.cos(p * 9 + i) * 14).toFixed(1)); }
  // a close one in front with an open bill
  { const x = lerp(760, 200, ease(ramp(t, WS(6, 3), WS(6, 7) + .4))), y = 960 + Math.sin(T * 2) * 20; s += bird(x.toFixed(1), y.toFixed(1), (3.2 * bi).toFixed(2), T * 12, -6); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: some flowers are pollinated by mosquitoes themselves (a small Arctic orchid) ----------
function orchid(x, y, h, t) { let s = `<path d="M${x},${y} C${x + 6},${y - h * .4} ${x - 6},${y - h * .7} ${x + 2},${y - h}" stroke="#4a7a2a" stroke-width="7" fill="none"/>`;
  s += `<path d="M${x},${y} C${x - 70},${y - 40} ${x - 110},${y - 120} ${x - 60},${y - 200} C${x - 50},${y - 120} ${x - 20},${y - 60} ${x},${y}Z" fill="#4a8a3a"/><path d="M${x},${y} C${x - 50},${y - 50} ${x - 80},${y - 120} ${x - 60},${y - 200}" stroke="#2a5a1e" stroke-width="2" fill="none"/>`;
  const F = (fx, fy, sc, an) => `<g transform="translate(${fx},${fy}) rotate(${an}) scale(${sc})"><path d="M0,0 C-10,-10 -26,-12 -34,-4 C-24,-2 -12,2 0,0Z" fill="#c8dca0"/><path d="M0,0 C10,-12 24,-14 30,-6 C22,-2 10,2 0,0Z" fill="#c8dca0"/><path d="M0,0 C-6,-16 -2,-30 6,-34 C8,-22 6,-10 0,0Z" fill="#dce8b8"/>` +
    `<path d="M0,0 C-2,12 -2,30 -6,44" stroke="#d8e4b0" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M0,2 C4,20 14,40 30,60" stroke="#b8cc88" stroke-width="3" fill="none"/><circle cx="0" cy="-2" r="5" fill="#e8d870"/></g>`;
  const P = [[0, 140, 1.4, 10], [14, 230, 1.6, -20], [-10, 320, 1.7, 15], [10, 410, 1.8, -10]];
  P.forEach(([dx, dy, sc, an]) => { const yy = y - h + dy * h / 460; s += `<path d="M${x + dx * .3},${yy + 8} q${dx},-6 ${dx * 2},-10" stroke="#4a7a2a" stroke-width="3"/>` + F(x + dx * 2, yy, sc * h / 460, an); });
  return s; }
function sceneOrchid(t) {
  const T = t - (S0(7) - .2), land = ease(ramp(t, S0(7) - .2, WS(7, 2) + .2)), sip = ease(ramp(t, WS(7, 2), WS(7, 3)));
  let s = `<defs>${MQDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mqBk)"/>`;
  const r = RS(12); for (let i = 0; i < 16; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(380 + r() * 880).toFixed(1)}" r="${(20 + r() * 50).toFixed(1)}" fill="${r() > .5 ? '#9ac87a' : '#e8e0a0'}" opacity="${(.06 + r() * .1).toFixed(2)}" filter="url(#blur16)"/>`;
  s += orchid(420, 1300, 900, t);
  // the male mosquito (bushy antennae) lands on a flower and sips nectar; a yellow pollen packet sticks to its eye
  const fx = 420 + 20, fy = 1300 - 900 + 230 * 900 / 460;
  const x = lerp(140, fx - 150, land), y = lerp(520, fy + 30, land) + (1 - land) * Math.sin(T * 5) * 20;
  s += mosq(x, y, .95, { male: 1, fly: land < .95, t, f: 1, perch: 1, feed: 0, pollen: sip > .5 });
  s += MQL(200, 1150, 'أوركيدُ الشمالِ البارد', ease(ramp(t, WS(7, 1), WS(7, 1) + .4)), '#f4c76b', 28) + MQL(fx - 210, fy - 60, 'حبوبُ اللقاح', ease(ramp(t, WS(7, 3), WS(7, 4))), '#ffe88a', 22);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: a food web; the mosquito drops out, other insects take its place ----------
function bat(x, y, s, t) { const f = Math.sin(t * 9) * .35; return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C-20,${-30 - f * 40} -60,${-34 - f * 50} -90,${-14 - f * 40} C-74,-10 -70,4 -60,4 C-50,-4 -40,6 -30,8 C-22,0 -12,6 0,8Z M0,0 C20,${-30 - f * 40} 60,${-34 - f * 50} 90,${-14 - f * 40} C74,-10 70,4 60,4 C50,-4 40,6 30,8 C22,0 12,6 0,8Z" fill="#9a8478"/><ellipse cx="0" cy="4" rx="11" ry="16" fill="#b89a88"/><circle cx="0" cy="-12" r="9" fill="#b89a88"/><path d="M-6,-18 l-3,-10 l7,6 M6,-18 l3,-10 l-7,6" fill="#b89a88"/></g>`; }
function midge(x, y, s, t, i) { return mosq(x + Math.sin(t * 3 + i) * 6, y + Math.cos(t * 4 + i) * 5, s, { fly: 1, t: t + i, f: i % 2 ? 1 : -1 }).replace(/url\(#mqAb\)/g, '#4a5a2a').replace(/url\(#mqTh\)/g, '#3a4a22'); }
function sceneWeb(t) {
  const T = t - (S0(8) - .2), a = ease(ramp(t, S0(8) - .2, S0(8) + .4)), shake = ramp(t, WS(8, 1), WS(8, 3) + .4) * (1 - ramp(t, WS(8, 6), WS(8, 7))), sw = ease(ramp(t, WS(8, 8), WS(8, 10) + .4));
  let s = `<defs>${MQDEFS()}</defs>` + studio('stW', '#24382a', '#08100a', 11);
  const C = [360, 790], N = [[150, 540, 'أسماك'], [570, 540, 'ضفادع'], [130, 1060, 'طيور'], [590, 1060, 'خفافيش']];
  N.forEach(([x, y], i) => { const red = shake > 0 ? .5 + .5 * Math.sin(t * 18 + i) : 0, col = sw > .5 ? '#7ae08a' : red > .5 ? '#ff6a5a' : '#f4c76b'; s += `<path d="M${C[0]},${C[1]} L${x},${y}" stroke="${col}" stroke-width="5" stroke-dasharray="${shake > .1 ? '10 8' : ''}" opacity="${(.8 * a).toFixed(2)}"/>`; });
  N.forEach(([x, y, n], i) => { s += `<circle cx="${x}" cy="${y}" r="92" fill="#0e1a12" opacity=".9"/><circle cx="${x}" cy="${y}" r="92" fill="none" stroke="#f4c76b" stroke-width="4" opacity=".8"/>`;
    s += i === 0 ? fishA(x, y - 6, 1.1, -1, '#9aa87a', t, 0) : i === 1 ? frog(x + 14, y + 40, .9, {}) : i === 2 ? bird(x, y - 6, 3.4, t * 10, 0).split('#2a2a30').join('#d8dce6').split('#3a3a42').join('#eef0f4') : bat(x, y - 4, .85, t);
    s += MQL(x, y + 130, n, a, '#fff', 26); });
  s += `<circle cx="${C[0]}" cy="${C[1]}" r="120" fill="#0e1a12" opacity=".95"/><circle cx="${C[0]}" cy="${C[1]}" r="120" fill="none" stroke="${sw > .5 ? '#7ae08a' : '#f4c76b'}" stroke-width="6"/>`;
  s += mosq(C[0] + 20 + Math.sin(t * 30) * shake * 4, C[1] + 10, .62, { t, f: -1, a: 1 - sw });
  [[-40, -40], [40, -30], [-30, 40], [44, 46]].forEach(([dx, dy], i) => { s += midge(C[0] + dx, C[1] + dy, .3 * sw, t, i); });
  s += MQL(C[0], C[1] + 170, sw > .5 ? 'حشراتٌ أخرى' : 'البعوض', 1, sw > .5 ? '#7ae08a' : '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the twist: of 3,500 species only a few hundred bite people, and only the females bite ----------
function sceneSpecies(t) {
  const T = t - (S0(9) - .2), g = ease(ramp(t, WS(9, 1), WS(9, 5))), hl = ease(ramp(t, WS(9, 6), WS(9, 9) + .3)), sx = ease(ramp(t, WS(9, 11) - .3, WS(9, 11) + .4));
  let s = `<defs>${MQDEFS()}</defs>` + studio('stS', '#2c3448', '#080b14', 13);
  const RED = new Set([7, 23, 38, 44, 61, 76, 92]);
  if (sx < 1) { let grid = ''; for (let i = 0; i < 100; i++) { const cx = 84 + (i % 10) * 62, cy = 450 + Math.floor(i / 10) * 66, k = clamp(g * 1.6 - i / 160), red = RED.has(i);
      if (k <= 0) continue; grid += mosq(cx, cy, (.2 + (red ? .06 * hl : 0)) * k, { t, f: -1, red: red && hl > .3, a: (red ? 1 : 1 - .6 * hl) * k }); }
    s += `<g opacity="${(1 - sx).toFixed(2)}">${grid}${MQL(360, 1160, 'كلُّ رمزٍ = ٣٥ نوعاً', g, '#fff', 24)}${MQL(360, 1210, hl > .5 ? 'بضعُ مئاتٍ فقط تلسعُ البشر' : '٣٥٠٠ نوعٍ من البعوض', 1, hl > .5 ? '#ff9a8a' : '#f4c76b', 32)}</g>`; }
  if (sx > 0) { s += `<g opacity="${sx.toFixed(2)}">`;
    s += `<path d="M-20,1070 C200,1048 460,1046 740,1062 L740,1130 C460,1118 200,1120 -20,1140Z" fill="#b07a58"/><path d="M-20,1070 C200,1048 460,1046 740,1062 L740,1074 C460,1060 200,1062 -20,1084Z" fill="#fff" opacity=".15"/><path d="M-20,1124 C200,1106 460,1104 740,1116 L740,1130 C460,1118 200,1120 -20,1140Z" fill="#000" opacity=".2"/><circle cx="389" cy="1052" r="10" fill="url(#biteR)"/>` + mosq(210, 720, .78, { male: 1, t, f: 1, lift: .2 }) + mosq(520, 974, .78, { t, f: -1, feed: 1, lift: .2 });
    s += MQL(210, 560, '♂ ذَكَر', 1, '#9ad4ff', 34) + MQL(210, 860, 'يشربُ رحيقَ الأزهار', 1, '#fff', 24) + MQL(520, 820, '♀ أنثى', 1, '#ff9a8a', 34) + MQL(470, 1190, 'تلسعُ لتضعَ البيض', 1, '#fff', 24) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: scientists today try to remove only the dangerous species (a lab with a mosquito cage) ----------
function cage(x, y, w, h, t, n) { let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#f2f4f2" opacity=".35"/>`;
  for (let i = 0; i <= w; i += 6) s += `<path d="M${x + i},${y} V${y + h}" stroke="#fff" stroke-width=".8" opacity=".5"/>`; for (let j = 0; j <= h; j += 6) s += `<path d="M${x},${y + j} H${x + w}" stroke="#fff" stroke-width=".8" opacity=".5"/>`;
  for (let i = 0; i < n; i++) { const r = RS(i + 50), cx = x + 20 + r() * (w - 40), cy = y + 20 + r() * (h - 40); s += mosq(cx + Math.sin(t * 2 + i) * 12, cy + Math.cos(t * 2.6 + i) * 8, .09, { fly: 1, t: t + i, f: i % 2 ? 1 : -1, red: 1 }); }
  return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#8a96a2" stroke-width="6"/><path d="M${x},${y + h} l14,-14 M${x + w},${y + h} l-14,-14" stroke="#6a7682" stroke-width="3"/>`; }
function sceneLab(t) {
  const T = t - (S0(10) - .2), a = ease(ramp(t, WS(10, 4), WS(10, 6) + .3));
  let s = `<defs>${MQDEFS()}</defs>` + labRoom(t, T);
  s += cage(-6, 800, 170, 210, t, 7);
  s += `<g opacity="${a.toFixed(2)}">${panel(380, 470, 320, 230)}${mosq(540, 590, .55, { t, f: -1, red: 1 })}${MQL(540, 670, 'الأنواعُ الخطيرةُ فقط', 1, '#ff9a8a', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: end: the Earth, the question, subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(11)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 9) - .3, WS(11, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
