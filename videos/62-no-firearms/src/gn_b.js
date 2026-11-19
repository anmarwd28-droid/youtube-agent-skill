// gn_b.js (#62): scenes 5-9: the walls that do not fall, arrow vs bullet, years of training, the world map, wars before gunpowder
// a stone wall shape lit by fractal noise, with courses, joints and merlons. pts: outline path d; box [x, y, w, h] for the courses
function stoneWall(d, id, box, seed, o = {}) {
  const [x, y, w, h] = box, cs = o.course || 22, r = RS(seed);
  let g = litRock(d, id, o.c1 || '#d8c6a0', o.c2 || '#a88e68', seed, { fx: .03, fy: .06, sc: 3, az: 200, el: 40 });
  let j = '';
  for (let yy = y + cs; yy < y + h; yy += cs) { j += `M${x},${yy} H${x + w} `; const off = ((yy - y) / cs) % 2 ? 0 : 24; for (let xx = x + off; xx < x + w; xx += 48 + r() * 8) j += `M${xx.toFixed(1)},${yy - cs} V${yy} `; }
  g += `<g clip-path="url(#lc${id})"><path d="${j}" stroke="#5a4a36" stroke-width="1.6" opacity=".45"/><path d="${j}" stroke="#fff4dc" stroke-width="1" opacity=".18" transform="translate(1,1.5)"/></g>`;
  return g;
}
function merlons(x0, x1, y, h, w = 18, gap = 12) { let d = ''; for (let x = x0; x < x1 - w * .5; x += w + gap) d += `M${x},${y} h${w} v${-h} h${-w}Z `; return d; }
// ---------- 5: the walls stand: Constantinople's walls held 1,000 years, until the cannons of 1453 ----------
function sceneWalls(t) {
  const t0 = S0(5) - .2, T = t - t0;
  let s = `<defs>${GNDEF}<linearGradient id="wlS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4e7ab0"/><stop offset=".6" stop-color="#a8c4dc"/><stop offset="1" stop-color="#f0e2c4"/></linearGradient>` +
    `<linearGradient id="wlW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7a7a"/><stop offset="1" stop-color="#2a4048"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#wlS)"/>` + sun3(230, 420, 1) + cumulus(520 + T * 3, 470, 230, 31, { a: .8 });
  // far city behind the walls: domes and roofs
  let far = ''; const r = RS(5);
  for (let i = 0; i < 16; i++) { const x = i * 48 - 10 + r() * 20, h = 40 + r() * 60; far += `<rect x="${x.toFixed(0)}" y="${(600 - h).toFixed(0)}" width="${(36 + r() * 20).toFixed(0)}" height="${(h + 40).toFixed(0)}" fill="${mix('#c8b8a0', '#a89880', r())}"/>`; }
  far += `<path d="M320,560 Q360,470 400,560Z" fill="#b8a888"/><rect x="316" y="556" width="88" height="60" fill="#c0b090"/><path d="M180,590 Q206,540 232,590Z" fill="#b0a080"/>`;
  s += `<g opacity=".75">${far}</g><rect x="-20" y="520" width="760" height="120" fill="#f0e2c4" opacity=".35"/>`;
  // the inner wall with big towers
  const iy = 620, ib = 900, TW = [[40, 120], [300, 120], [560, 120]];
  let dI = `M-20,${iy} H740 V${ib} H-20Z ` + TW.map(([x, w]) => `M${x},${iy - 110} h${w} V${ib} h${-w}Z`).join(' ') + merlons(-20, 740, iy, 20) + TW.map(([x, w]) => merlons(x - 4, x + w + 4, iy - 110, 22, 20, 10)).join('');
  s += stoneWall(dI, 'wI', [-20, iy - 130, 760, ib - iy + 130], 11, { c1: '#e2d0a8', c2: '#b09670' });
  TW.forEach(([x, w]) => { s += `<rect x="${x + w - 26}" y="${iy - 110}" width="26" height="${ib - iy + 110}" fill="#3a2a1a" opacity=".22"/>` + [0, 1].map(q => `<rect x="${x + w / 2 - 5}" y="${iy - 70 + q * 100}" width="10" height="34" rx="5" fill="#2a2016"/>`).join(''); });
  // the outer wall, lower, with smaller towers
  const oy = 790, ob = 980, TO = [[160, 90], [420, 90], [660, 90]];
  let dO = `M-20,${oy} H740 V${ob} H-20Z ` + TO.map(([x, w]) => `M${x},${oy - 70} h${w} V${ob} h${-w}Z`).join(' ') + merlons(-20, 740, oy, 16, 16, 10) + TO.map(([x, w]) => merlons(x - 2, x + w + 2, oy - 70, 18, 16, 9)).join('');
  s += `<rect x="-20" y="${oy - 30}" width="760" height="40" fill="#000" opacity=".18" filter="url(#blur9)"/>` + stoneWall(dO, 'wO', [-20, oy - 90, 760, ob - oy + 90], 12, { c1: '#e8d8b4', c2: '#b8a07a', course: 18 });
  TO.forEach(([x, w]) => { s += `<rect x="${x + w - 20}" y="${oy - 70}" width="20" height="${ob - oy + 70}" fill="#3a2a1a" opacity=".22"/><rect x="${x + w / 2 - 4}" y="${oy - 40}" width="8" height="26" rx="4" fill="#2a2016"/>`; });
  // the moat and the bank
  s += `<path d="M-20,980 L740,980 L740,1010 L-20,1010Z" fill="#8a7454"/><rect x="-20" y="1010" width="760" height="70" fill="url(#wlW)"/>` +
    Array.from({ length: 9 }, (_, i) => `<path d="M${pmod(i * 90 + T * 14, 800) - 40},${1030 + (i % 3) * 14} h40" stroke="#c8e0e8" stroke-width="2" opacity=".35"/>`).join('') +
    `<rect x="-20" y="1080" width="760" height="230" fill="#7a8a4a"/>` + meadow(1080, 1300, t);
  // the timeline: 413 → 1453
  const pa = ease(ramp(t, WS(5, 3) - .3, WS(5, 3))), k = ease(ramp(t, WS(5, 3), WS(5, 7)));
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}">${panel(70, 1110, 580, 130)}<path d="M120,1170 H600" stroke="#ffffff" stroke-opacity=".3" stroke-width="8" stroke-linecap="round"/><path d="M600,1170 H${(600 - 480 * k).toFixed(1)}" stroke="#f4c76b" stroke-width="8" stroke-linecap="round"/>` +
    `<circle cx="600" cy="1170" r="9" fill="#f4c76b"/><circle cx="${(600 - 480 * k).toFixed(1)}" cy="1170" r="9" fill="#f4c76b"/>${GNL(600, 1215, '٤١٣م', 1, '#fff', 24)}${GNL(120, 1215, '١٤٥٣م', k > .98 ? 1 : .35, '#fff', 24)}${GNL(360, 1150, AR(Math.round(1040 * k)) + ' سنة', 1, '#f4c76b', 32)}</g>`;
  // our world: the cannons broke them (an inset)
  const ia = ease(ramp(t, WS(5, 9) - .3, WS(5, 9) + .2)) * (1 - ease(ramp(t, S0(6) - .6, S0(6) - .3)));
  if (ia > 0) { const cx = 360, cy = 700, R = 150, bl = ease(ramp(t, WS(5, 10), WS(5, 10) + .3));
    let g = `<defs><clipPath id="inC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#inC)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#c8b48a"/>` +
      stoneWall(`M${cx - R},${cy - R} H${cx + R} V${cy + 40} H${cx - R}Z`, 'wB', [cx - R, cy - R, 2 * R, R + 40], 13, { course: 16 }) +
      `<g opacity="${bl.toFixed(2)}"><path d="M${cx - 64},${cy - R} L${cx - 58},${cy - 96} L${cx - 76},${cy - 60} L${cx - 54},${cy - 20} L${cx - 66},${cy + 20} L${cx - 30},${cy + 42} L${cx + 34},${cy + 42} L${cx + 62},${cy + 6} L${cx + 50},${cy - 34} L${cx + 74},${cy - 80} L${cx + 56},${cy - R}Z" fill="#b8d0e4"/>` +
      `<path d="M${cx - 64},${cy - R} L${cx - 58},${cy - 96} L${cx - 76},${cy - 60} L${cx - 54},${cy - 20} L${cx - 66},${cy + 20} L${cx - 30},${cy + 42} M${cx + 34},${cy + 42} L${cx + 62},${cy + 6} L${cx + 50},${cy - 34} L${cx + 74},${cy - 80} L${cx + 56},${cy - R}" fill="none" stroke="#5a4a36" stroke-width="7"/>` +
      `<path d="M${cx - 64},${cy - R} L${cx - 58},${cy - 96} L${cx - 76},${cy - 60} L${cx - 54},${cy - 20}" fill="none" stroke="#fff4dc" stroke-width="2" opacity=".5" transform="translate(-4,0)"/></g>` +
      `<rect x="${cx - R}" y="${cy + 40}" width="${2 * R}" height="${R}" fill="#8a7a5a"/>` + `<path d="M${cx - 110},${cy + 60} Q${cx - 40},${cy + 10} ${cx + 10},${cy + 20} Q${cx + 70},${cy + 14} ${cx + 120},${cy + 60}Z" fill="#a89470" opacity="${bl.toFixed(2)}"/>` + [0, 1, 2, 3, 4, 5, 6, 7].map(q => { const rr = RS(q + 70); return `<path d="M${(cx - 80 + q * 22 + rr() * 8).toFixed(0)},${(cy + 40 + rr() * 16).toFixed(0)} l${(12 + rr() * 8).toFixed(0)},${(-6 - rr() * 8).toFixed(0)} l${(10 + rr() * 6).toFixed(0)},${(8 + rr() * 6).toFixed(0)} l-8,6Z" fill="${mix('#c8b48a', '#8a7454', rr())}" opacity="${bl.toFixed(2)}"/>`; }).join('') +
      `<g filter="url(#smB)" opacity="${(.8 * bl).toFixed(2)}">` + [0, 1, 2, 3, 4].map(q => `<ellipse cx="${(cx - 10 + q * 14 + Math.sin(t + q) * 10).toFixed(0)}" cy="${(cy + 10 - q * 46 - pmod(t * 20, 46)).toFixed(0)}" rx="${40 + q * 12}" ry="${26 + q * 8}" fill="${q % 2 ? '#8a8680' : '#a8a49c'}" opacity=".6"/>`).join('') + `</g>` + cannonG(cx - 30, cy + 130, .55, { el: -12 }) + `</g>`;
    s += `<g opacity="${ia.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#0a0e1c"/>${g}<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/>${GNL(cx, cy + R + 44, 'عالمُنا: ١٤٥٣م', 1, '#f4c76b', 28)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: an arrow flies about 60 m/s; a modern rifle bullet is 15 times faster ----------
function sceneSpeed(t) {
  const t0 = S0(6) - .2, T = t - t0, X = d => 60 + d * .66;
  let s = `<defs>${GNDEF}<linearGradient id="spS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a88c0"/><stop offset=".6" stop-color="#b0cce4"/><stop offset="1" stop-color="#ece6d2"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#spS)"/>` + sun3(130, 470, 1) + cumulus(330 + T * 4, 520, 220, 41, { a: .75 });
  s += mountainsR(700, 90, 52, { rock: '#8a9a8a', snowAt: 0 }) + `<rect x="-20" y="690" width="760" height="620" fill="#8a9a52"/>` + meadow(700, 1300, t);
  s += `<rect x="-20" y="690" width="760" height="30" fill="#ece6d2" opacity=".45" filter="url(#soft)"/>`;
  // two lanes, distance posts every 300 m
  const LA = 860, LB = 1060;
  s += [LA, LB].map(y => `<rect x="-20" y="${y - 8}" width="760" height="22" fill="#b8a478" opacity=".7"/><path d="M-20,${y + 2} H740" stroke="#fff" stroke-width="2" stroke-dasharray="14 12" opacity=".55"/>`).join('');
  [0, 300, 600, 900].forEach(d => { const x = X(d); s += `<rect x="${x - 3}" y="${LA - 90}" width="6" height="${LB - LA + 110}" fill="#fff" opacity=".35"/><rect x="${x - 34}" y="${LA - 128}" width="68" height="36" rx="6" fill="#0a0e1c" opacity=".85"/>` + GNL(x, LA - 101, AR(d) + ' م', 1, '#fff', 20); });
  // the timer
  const a1 = ramp(t, WS(6, 2), WS(6, 7) + .2), a2 = ramp(t, WS(6, 8), WS(6, 10) + .4), tau = a2 > 0 ? a2 : a1;
  s += `${panel(500, 470, 170, 70)}${GNL(585, 518, AR(tau.toFixed(1)) + ' ث', 1, '#f4c76b', 34)}`;
  // the arrow (both runs) and the bullet (second run)
  const ax = X(60 * tau), aa = ease(ramp(t, WS(6, 0), WS(6, 0) + .3));
  s += `<g opacity="${aa.toFixed(2)}"><path d="M${(ax - 70).toFixed(1)},${LA} L${ax.toFixed(1)},${LA}" stroke="#8a6034" stroke-width="4"/><path d="M${ax.toFixed(1)},${LA - 6} l16,6 l-16,6Z" fill="#5a626a"/>` +
    `<path d="M${(ax - 70).toFixed(1)},${LA} l-8,-9 l18,0Z M${(ax - 70).toFixed(1)},${LA} l-8,9 l18,0Z" fill="#c83a2a"/>${GNL(160, LA + 64, 'سهمُ القوس ~ ٦٠ م/ث', 1, '#fff', 24)}</g>`;
  const ba = ease(ramp(t, WS(6, 8) - .3, WS(6, 8)));
  if (ba > 0) { const bx = X(900 * a2);
    s += `<g opacity="${ba.toFixed(2)}">` + (a2 > 0 && a2 < 1 ? `<path d="M${Math.max(X(0), bx - 260).toFixed(1)},${LB} L${bx.toFixed(1)},${LB}" stroke="#fff" stroke-width="3" opacity=".55"/>` : '') +
      `<path d="M${(bx - 20).toFixed(1)},${LB - 5} h14 q10,0 14,5 q-4,5 -14,5 h-14Z" fill="#c8843a" stroke="#6a3a14" stroke-width="1"/><path d="M${(bx - 18).toFixed(1)},${LB - 3} h12" stroke="#ffd8a0" stroke-width="1.5"/>${GNL(560, LB + 64, 'رصاصةٌ حديثة ~ ٩٠٠ م/ث', 1, '#fff', 24)}</g>`; }
  // where each one is after one second
  const ea = ease(ramp(t, WS(6, 11), WS(6, 11) + .3));
  if (ea > 0) s += `<g opacity="${ea.toFixed(2)}">${GNL(X(60) + 30, LA - 26, '٦٠ م', 1, '#f4c76b', 26)}${GNL(X(900) - 20, LB - 26, '٩٠٠ م', 1, '#f4c76b', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: a skilled archer needs years; a rifle is learned in weeks. Armies stay small ----------
function target(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 L-10,-140 M40,0 L10,-140 M0,-140 L30,0" stroke="#5a3a1e" stroke-width="8"/><ellipse cx="0" cy="-170" rx="86" ry="90" fill="#d8c07a"/><ellipse cx="0" cy="-170" rx="86" ry="90" fill="#000" filter="url(#gnWood)" opacity=".35"/>` +
  [[70, '#f4f0e4'], [54, '#2a2a2a'], [38, '#3a6aa8'], [22, '#c83a2a'], [9, '#f4c74a']].map(([r, c]) => `<ellipse cx="0" cy="-170" rx="${r}" ry="${r * 1.04}" fill="${c}"/>`).join('') + `<ellipse cx="-20" cy="-196" rx="40" ry="30" fill="#fff" opacity=".12"/></g>`; }
function sceneTrain(t) {
  const t0 = S0(7) - .2, T = t - t0;
  let s = `<defs>${GNDEF}<linearGradient id="trS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a94c4"/><stop offset=".6" stop-color="#bcd2e6"/><stop offset="1" stop-color="#eee4cc"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#trS)"/>` + sun3(130, 520, 1) + cumulus(520 - T * 3, 560, 210, 61, { a: .8 });
  s += mountainsR(790, 80, 63, { rock: '#8a9a7a', snowAt: 0 }) + `<rect x="-20" y="780" width="760" height="540" fill="#7e9a4c"/>` + meadow(790, 1300, t) + `<rect x="-20" y="780" width="760" height="30" fill="#eee4cc" opacity=".45" filter="url(#soft)"/>`;
  [[40, 820, 150, 3], [690, 830, 170, 4]].forEach(([x, y, h, sd]) => s += treeR(x, y, h, sd, t));
  s += target(590, 1100, .95);
  // shots: every 1.4 s an arrow flies and stays in the target
  const per = 1.4, n = Math.floor(Math.max(0, T - .3) / per), ph = pmod(Math.max(0, T - .3), per) / per, hits = [[-14, -10], [10, 8], [-4, 18], [16, -16], [2, -2], [-18, 12], [8, 22]];
  for (let i = 0; i < Math.min(n, hits.length); i++) { const [dx, dy] = hits[i], hx = 590 + dx * .95, hy = 1100 - 170 * .95 + dy * .95; s += `<path d="M${hx - 50},${hy - 4} L${hx},${hy}" stroke="#8a6034" stroke-width="3"/><path d="M${hx - 50},${hy - 4} l-8,-7 l14,1Z M${hx - 50},${hy - 4} l-8,7 l14,-1Z" fill="#c83a2a"/>`; }
  const draw = ph < .65 ? ease(ph / .65) : 0, fly = ph >= .65 ? (ph - .65) / .35 : -1;
  s += archer(190, 1120, 1.04, 1, t, { draw, loose: fly >= 0 });
  if (fly >= 0) { const [dx, dy] = hits[Math.min(n, hits.length - 1)], tx = 590 + dx * .95, ty = 1100 - 170 * .95 + dy * .95, sx = 270, sy = 880, x = lerp(sx, tx, fly), y = lerp(sy, ty, fly) - Math.sin(fly * Math.PI) * 30;
    s += `<path d="M${(x - 50).toFixed(1)},${(y - 3).toFixed(1)} L${x.toFixed(1)},${y.toFixed(1)}" stroke="#8a6034" stroke-width="3"/>`; }
  // the two cards: years for the bow, weeks for the rifle
  const ca = ease(ramp(t, WS(7, 2) - .3, WS(7, 2))), yr = Math.min(10, 1 + Math.floor(9 * ramp(t, WS(7, 3), WS(7, 5) + .3)));
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}">${panel(380, 450, 290, 120)}${GNL(525, 505, AR(yr) + ' سنوات', 1, '#f4c76b', 40)}${GNL(525, 548, 'لتصبحَ رامياً ماهراً', 1, '#fff', 22)}</g>`;
  const cb = ease(ramp(t, WS(7, 7) - .3, WS(7, 7)));
  if (cb > 0) s += `<g opacity="${cb.toFixed(2)}">${panel(50, 450, 290, 120)}${GNL(195, 505, 'أسابيع', 1, '#7fd4ff', 40)}${GNL(195, 548, 'لتتعلّمَ البندقيّة', 1, '#fff', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: small armies cannot rule far continents: another world map ----------
function arc3(G, a, b, h, k) { // a raised great-circle arc from a to b, drawn up to fraction k
  const v = ([la, lo]) => { const p = la * Math.PI / 180, q = lo * Math.PI / 180; return [Math.cos(p) * Math.cos(q), Math.cos(p) * Math.sin(q), Math.sin(p)]; }, A = v(a), B = v(b), om = Math.acos(clamp(A[0] * B[0] + A[1] * B[1] + A[2] * B[2], -1, 1));
  let d = '', on = false, last = null; const N = 40;
  for (let i = 0; i <= N * k; i++) { const f = i / N, s1 = Math.sin((1 - f) * om) / Math.sin(om), s2 = Math.sin(f * om) / Math.sin(om), p = [0, 1, 2].map(j => A[j] * s1 + B[j] * s2), la = Math.asin(clamp(p[2], -1, 1)) * 180 / Math.PI, lo = Math.atan2(p[1], p[0]) * 180 / Math.PI, hh = 1 + h * Math.sin(f * Math.PI);
    if (G.vis(la, lo) < -.15 * Math.sin(f * Math.PI)) { on = false; continue; } const [x, y] = G.P(la, lo, hh); d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; last = [x, y]; }
  return { d, last };
}
function sceneMap(t) {
  const t0 = S0(8) - .2, T = t - t0;
  const G = glE(t, { d: 10.2, el: .42, lon: -14 + T * 1.4, clouds: .35, lights: .25, tg: [0, .02, 0] });
  const routes = [[[48, 2], [-12, -48]], [[48, 2], [38, -78]], [[48, 2], [-2, 22]], [[45, -4], [-28, 26]], [[50, 4], [20, -98]]];
  const gr = ease(ramp(t, WS(8, 0), WS(8, 6))), cut = ease(ramp(t, WS(8, 6) - .3, WS(8, 8)));
  let o = '';
  routes.forEach((rt, i) => { const k = clamp(gr * 1.4 - i * .1), P = arc3(G, rt[0], rt[1], .14, k * (1 - .5 * cut)); if (!P.d) return;
    o += `<path d="${P.d}" fill="none" stroke="#ffffff" stroke-width="3.4" stroke-dasharray="12 9" stroke-dashoffset="${(-T * 30).toFixed(1)}" opacity="${(.85 * (1 - cut)).toFixed(2)}"/>`;
    if (cut > 0 && G.vis(rt[1][0], rt[1][1]) > .1) { const [x, y] = G.P(rt[1][0], rt[1][1], 1.01); o += `<g opacity="${cut.toFixed(2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)})"><circle r="18" fill="#0a0e1c" opacity=".7"/><path d="M-9,-9 L9,9 M9,-9 L-9,9" stroke="#ff5a4a" stroke-width="5" stroke-linecap="round"/></g>`; } });
  F.ov = o; return space(t);
}
// ---------- 9: wars do not disappear: people fought for thousands of years before gunpowder ----------
function sceneWars(t) { noEarth(); F.ov = ''; return battle(t + 20, { sunset: 1 }); }
