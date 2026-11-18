// ww_b.js: #58 scenes 2-8: the trenches and the gas, the 1918 flu (ward and globe), four empires fall, Russia 1917, the borders of the Middle East, the other map, the planes, the first tank and the first blood bank

// ---------- the trench pieces ----------
function burst(x, y, s, p) {   // a shell burst at phase p (0-1): flash, a fountain of earth, smoke that rises and spreads
  if (p <= 0 || p >= 1) return ''; let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})">`;
  if (p < .18) g += `<circle cx="0" cy="-20" r="${(40 + 260 * p).toFixed(1)}" fill="url(#flashG)" opacity="${(1 - p / .18).toFixed(2)}"/>`;
  const e = clamp(p / .35), r = RS(Math.round(x * 3 + y));
  for (let i = 0; i < 9; i++) { const an = -Math.PI / 2 + (r() - .5) * 1.5, L = (90 + r() * 90) * e, w = 10 + r() * 14; g += `<path d="M${(-w / 2).toFixed(1)},0 L${(Math.cos(an) * L).toFixed(1)},${(Math.sin(an) * L).toFixed(1)} L${(w / 2).toFixed(1)},0Z" fill="#3a2a1e" opacity="${(1 - clamp((p - .3) / .3)).toFixed(2)}"/>`; }
  for (let i = 0; i < 6; i++) { const q = clamp((p - .05 - i * .03) / .9), sx = (r() - .5) * 90 * q, sy = -60 - q * (120 + r() * 80), R = 30 + q * 90; g += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#smkG)" opacity="${(.9 * (1 - q)).toFixed(2)}"/>`; }
  return g + `</g>`;
}
function sandbags(x0, x1, y, rows = 3, col = '#a8946a') { let s = ''; for (let rw = 0; rw < rows; rw++) { const yy = y - rw * 22, off = (rw % 2) * 26; for (let x = x0 - off; x < x1; x += 52) { const c = mix(col, RS(Math.round(x + rw * 99))() > .5 ? '#000000' : '#ffffff', .08);
  s += `<path d="M${x + 3},${yy} Q${x},${yy - 12} ${x + 6},${yy - 21} Q${x + 26},${yy - 26} ${x + 46},${yy - 21} Q${x + 53},${yy - 12} ${x + 49},${yy}Z" fill="${c}"/><path d="M${x + 6},${yy - 19} Q${x + 26},${yy - 24} ${x + 44},${yy - 19}" stroke="#fff" stroke-width="2.4" fill="none" opacity=".25"/><path d="M${x + 4},${yy} H${x + 48}" stroke="#000" stroke-width="3" opacity=".3"/><path d="M${x + 26},${yy - 22} v20" stroke="#000" stroke-width="1.2" opacity=".2"/>`; } }
  return s + `<rect x="${x0}" y="${y - rows * 22}" width="${x1 - x0}" height="${rows * 22}" fill="#000" filter="url(#grainR)" opacity=".18"/>`; }
function wireLine(x0, x1, y, s = 1, seed = 2) { let g = ''; const r = RS(seed);
  for (let x = x0; x < x1; x += 120 * s) g += `<path d="M${x},${y} L${x + 14 * s},${y - 64 * s} M${x + 14 * s},${y} L${x},${y - 64 * s}" stroke="#2a2018" stroke-width="${(4 * s).toFixed(1)}"/>`;
  let d = ''; for (let x = x0; x < x1; x += 9 * s) { const a = x * .21 / s; d += (d ? ' L' : 'M') + (x + Math.cos(a) * 10 * s).toFixed(1) + ',' + (y - 34 * s + Math.sin(a) * 22 * s + (r() - .5) * 4).toFixed(1); }
  return g + `<path d="${d}" stroke="#1e1a16" stroke-width="${(1.6 * s).toFixed(1)}" fill="none" opacity=".85"/>`; }
function crater(x, y, w, col = '#3e2e22') { return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * .22}" fill="${col}"/><ellipse cx="${x}" cy="${y + w * .04}" rx="${w * .78}" ry="${w * .15}" fill="#5a6a72" opacity=".55"/><path d="M${x - w},${y} Q${x},${y - w * .38} ${x + w},${y}" stroke="#8a7458" stroke-width="5" fill="none" opacity=".6"/>`; }
// a soldier of 1914-1918: khaki, a steel helmet with a wide brim, a rifle; o.mask = a gas mask (0-1), o.rifle 'shoulder' | 'port' | null
function soldier1(x, y, s, f, i, t, o = {}) {
  const P = [{ top: '#6a6440', pants: '#5a5436', skin: '#c08a66', hair: '#2a1d16' }, { top: '#5e5a3a', pants: '#4e4a30', skin: '#a87050', hair: '#1b1410' }, { top: '#727048', pants: '#5e5a3a', skin: '#d0a07a', hair: '#4a3020' }][i % 3];
  const A = Object.assign({ s, face: f, shade: 1, lean: o.lean ?? 2, walk: o.walk ?? null }, P, o.h || {});
  if (o.rifle === 'port') { A.hF = [x + f * 40 * s, y - 150 * s]; A.hB = [x + f * 8 * s, y - 120 * s]; }
  let g0 = ''; if (o.rifle === 'shoulder') g0 = `<path d="M${(x - f * 22 * s).toFixed(1)},${(y - 120 * s).toFixed(1)} L${(x - f * 4 * s).toFixed(1)},${(y - 262 * s).toFixed(1)}" stroke="#4a2e16" stroke-width="${(7 * s).toFixed(1)}" stroke-linecap="round"/><path d="M${(x - f * 7 * s).toFixed(1)},${(y - 236 * s).toFixed(1)} L${(x - f * 1 * s).toFixed(1)},${(y - 290 * s).toFixed(1)}" stroke="#2a2a2e" stroke-width="${(3.4 * s).toFixed(1)}"/><path d="M${(x - f * 30 * s).toFixed(1)},${(y - 90 * s).toFixed(1)} L${(x + f * 18 * s).toFixed(1)},${(y - 190 * s).toFixed(1)}" stroke="#3a2a1a" stroke-width="${(2.4 * s).toFixed(1)}" opacity=".8"/>`;
  let g = g0 + hero(x, y, A); const [hx, hy] = HP.head, HF = HP.hand, HB = HP.handB;
  // puttees on the shins
  // rifle
  if (o.rifle === 'port') { const ax = HF[0] + f * 30 * s, ay = HF[1] - 70 * s, bx = HB[0] - f * 26 * s, by = HB[1] + 50 * s; g += `<path d="M${bx.toFixed(1)},${by.toFixed(1)} L${ax.toFixed(1)},${ay.toFixed(1)}" stroke="#5a3a1e" stroke-width="${(7 * s).toFixed(1)}" stroke-linecap="round"/><path d="M${lerp(bx, ax, .55).toFixed(1)},${lerp(by, ay, .55).toFixed(1)} L${(ax + (ax - bx) * .08).toFixed(1)},${(ay + (ay - by) * .08).toFixed(1)}" stroke="#2a2a2e" stroke-width="${(3.4 * s).toFixed(1)}"/><path d="M${(ax + (ax - bx) * .08).toFixed(1)},${(ay + (ay - by) * .08).toFixed(1)} L${(ax + (ax - bx) * .3).toFixed(1)},${(ay + (ay - by) * .3).toFixed(1)}" stroke="#c8ccd4" stroke-width="${(2 * s).toFixed(1)}"/>` + `<circle cx="${HF[0].toFixed(1)}" cy="${HF[1].toFixed(1)}" r="${(7.5 * s).toFixed(1)}" fill="${P.skin}"/>`; }
  if (o.rifle === 'shoulderX') { g += `<path d="M${(HF[0] + f * 4 * s).toFixed(1)},${(HF[1] + 6 * s).toFixed(1)} L${(HF[0] - f * 20 * s).toFixed(1)},${(HF[1] - 150 * s).toFixed(1)}" stroke="#5a3a1e" stroke-width="${(6 * s).toFixed(1)}" stroke-linecap="round"/><path d="M${(HF[0] - f * 14 * s).toFixed(1)},${(HF[1] - 110 * s).toFixed(1)} L${(HF[0] - f * 23 * s).toFixed(1)},${(HF[1] - 180 * s).toFixed(1)}" stroke="#2a2a2e" stroke-width="${(3 * s).toFixed(1)}"/><circle cx="${HF[0].toFixed(1)}" cy="${HF[1].toFixed(1)}" r="${(7.5 * s).toFixed(1)}" fill="${P.skin}"/>`; }
  // the gas mask: a hood over the face with a round glass eye and a hose to the bag on the chest
  const m = o.mask || 0;
  if (m > 0) { const ex = hx + f * 11 * s, ey = hy - 2 * s, C = HP.chest; g += `<g opacity="${m.toFixed(2)}"><ellipse cx="${(hx + f * 6 * s).toFixed(1)}" cy="${(hy + 3 * s).toFixed(1)}" rx="${(21 * s).toFixed(1)}" ry="${(24 * s).toFixed(1)}" fill="#6a6a52"/><ellipse cx="${(hx + f * 2 * s).toFixed(1)}" cy="${(hy + 5 * s).toFixed(1)}" rx="${(13 * s).toFixed(1)}" ry="${(19 * s).toFixed(1)}" fill="#000" opacity=".18"/>` +
    `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="${(7 * s).toFixed(1)}" fill="#3a4a52" stroke="#2a2a22" stroke-width="${(2.4 * s).toFixed(1)}"/><circle cx="${(ex - f * 2 * s).toFixed(1)}" cy="${(ey - 2 * s).toFixed(1)}" r="${(2.4 * s).toFixed(1)}" fill="#c8dce4" opacity=".7"/>` +
    `<path d="M${(hx + f * 18 * s).toFixed(1)},${(hy + 14 * s).toFixed(1)} q${(f * 8 * s).toFixed(1)},${(6 * s).toFixed(1)} ${(f * 4 * s).toFixed(1)},${(16 * s).toFixed(1)} Q${(C[0] + f * 16 * s).toFixed(1)},${(C[1] - 10 * s).toFixed(1)} ${(C[0] + f * 6 * s).toFixed(1)},${(C[1] + 14 * s).toFixed(1)}" stroke="#3a3a2e" stroke-width="${(5 * s).toFixed(1)}" fill="none"/><rect x="${(C[0] - 14 * s).toFixed(1)}" y="${(C[1] + 8 * s).toFixed(1)}" width="${(28 * s).toFixed(1)}" height="${(26 * s).toFixed(1)}" rx="${(5 * s).toFixed(1)}" fill="#5a5638"/></g>`; }
  // the steel helmet: a shallow dome with a wide brim
  g += `<path d="M${(hx - 19 * s).toFixed(1)},${(hy - 13 * s).toFixed(1)} Q${(hx - 18 * s).toFixed(1)},${(hy - 38 * s).toFixed(1)} ${hx.toFixed(1)},${(hy - 38 * s).toFixed(1)} Q${(hx + 18 * s).toFixed(1)},${(hy - 38 * s).toFixed(1)} ${(hx + 19 * s).toFixed(1)},${(hy - 13 * s).toFixed(1)}Z" fill="#4e5034"/><path d="M${(hx - 34 * s).toFixed(1)},${(hy - 11 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 19 * s).toFixed(1)} ${(hx + 34 * s).toFixed(1)},${(hy - 11 * s).toFixed(1)}" stroke="#3a3c26" stroke-width="${(5 * s).toFixed(1)}" fill="none" stroke-linecap="round"/><path d="M${(hx - 10 * s).toFixed(1)},${(hy - 32 * s).toFixed(1)} q${(9 * s).toFixed(1)},${(-4 * s).toFixed(1)} ${(18 * s).toFixed(1)},0" stroke="#fff" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".25"/>`;
  return g;
}
const gasCloud = (x, y, R, a) => a > 0 ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R * 1.5).toFixed(1)}" ry="${R.toFixed(1)}" fill="url(#gasG)" opacity="${a.toFixed(2)}"/>` : '';

// the trench wall: planks of different shades and tilts, mud smeared over them, wet at the bottom
function trenchWall(y0, y1, seed, dark = 0) { const r = RS(seed); let s = `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="${dark ? '#2e2218' : '#4a3828'}"/>`;
  for (let x = -24; x < 744;) { const w = 22 + r() * 14, tl = (r() - .5) * 3, top = y0 + r() * 14, c = mix(dark ? '#4a3826' : '#7a5c3c', '#000000', r() * .35);
    s += `<g transform="rotate(${tl.toFixed(2)},${(x + w / 2).toFixed(1)},${y1})"><rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${(w - 2).toFixed(1)}" height="${(y1 - top).toFixed(1)}" fill="${c}"/><rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="3" height="${(y1 - top).toFixed(1)}" fill="#fff" opacity=".1"/><path d="M${(x + w * .4).toFixed(1)},${(top + 30 + r() * 60).toFixed(1)} q3,40 -1,${(60 + r() * 80).toFixed(0)}" stroke="#000" stroke-width="1.4" opacity=".25" fill="none"/></g>`; x += w; }
  s += `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  for (let i = 0; i < 9; i++) { const x = r() * 760 - 20, w = 60 + r() * 120, h = 40 + r() * 120, y = y1 - h + r() * 30; s += `<path d="M${x.toFixed(0)},${y1} Q${(x + w * .2).toFixed(0)},${y.toFixed(0)} ${(x + w / 2).toFixed(0)},${(y + 10).toFixed(0)} Q${(x + w * .8).toFixed(0)},${(y - 10).toFixed(0)} ${(x + w).toFixed(0)},${y1}Z" fill="${dark ? '#24180f' : '#4e3a26'}" opacity=".85"/>`; }
  s += `<rect x="-20" y="${y1 - 70}" width="760" height="70" fill="#1a120a" opacity=".35"/>` + [y0 + 70, y0 + 210].map(y => `<rect x="-20" y="${y}" width="760" height="9" fill="${dark ? '#1e140c' : '#3a2a1c'}"/><rect x="-20" y="${y}" width="760" height="2" fill="#fff" opacity=".1"/>`).join('');
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 64 - 10}" y="${y0 - 10}" width="12" height="${y1 - y0 + 14}" fill="${dark ? '#2a1e14' : '#3e2c1c'}"/><rect x="${i * 64 - 10}" y="${y0 - 10}" width="3" height="${y1 - y0 + 14}" fill="#fff" opacity=".1"/>`;
  return s; }
function duckFloor(y0, t, dark = 0) { let s = `<rect x="-20" y="${y0}" width="760" height="${1300 - y0}" fill="${dark ? '#1e1610' : '#2e2218'}"/><rect x="-20" y="${y0}" width="760" height="${1300 - y0}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<path d="M-20,${y0 + 60} Q200,${y0 + 46} 420,${y0 + 64} T740,${y0 + 56} V1300 H-20Z" fill="${dark ? '#2a3040' : '#5a5a58'}" opacity=".55"/><path d="M60,${y0 + 80} h220 M400,${y0 + 96} h160" stroke="#fff" stroke-width="3" opacity=".12"/>`;
  for (let x = -20; x < 740; x += 28) s += `<rect x="${x}" y="${y0 + 4}" width="24" height="14" rx="2" fill="${dark ? '#4a3626' : '#7a5a3a'}"/><rect x="${x}" y="${y0 + 4}" width="24" height="3" fill="#fff" opacity=".15"/>`;
  return s + `<rect x="-20" y="${y0 + 16}" width="760" height="8" fill="#1a120a" opacity=".6"/>`; }
function crate(x, y, w, h) { return `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="#7a6040"/><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".25"/><path d="M${x - w / 2},${y - h / 2} h${w} M${x - w / 2 + 6},${y - h} v${h} M${x + w / 2 - 6},${y - h} v${h}" stroke="#4a3624" stroke-width="3"/><rect x="${x - w / 2}" y="${y - h}" width="${w}" height="4" fill="#fff" opacity=".2"/><rect x="${x + w / 2 - 10}" y="${y - h}" width="10" height="${h}" fill="#000" opacity=".2"/>`; }

// ---------- 2: four years in the trenches, mud and gas; about twenty million dead ----------
function sceneTrench(t) {
  const t0 = S0(2) - .2, T = t - t0, gas = ease(ramp(t, WS(2, 5) - .4, WS(2, 5) + 1.4)), msk = ease(ramp(t, WS(2, 5) + .3, WS(2, 6))), cnt = ease(ramp(t, WS(2, 8), WS(2, 11) + .3)), pa = ease(ramp(t, WS(2, 6) - .3, WS(2, 6)));
  let s = `<defs>${WWD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#warSky)"/>`;
  s += `<g transform="translate(360,900) scale(${(1 + .045 * ease(clamp(T / 6))).toFixed(3)}) translate(-360,-900)">`;
  // the far battlefield: low smoke, bursts on the horizon, dead trees, craters with water, wire
  s += `<ellipse cx="200" cy="600" rx="300" ry="60" fill="url(#smkG)" opacity=".5"/><ellipse cx="580" cy="590" rx="260" ry="50" fill="url(#smkG)" opacity=".45"/>`;
  s += `<path d="M-20,622 Q180,606 380,618 Q560,608 740,620 V760 H-20Z" fill="#5a4636"/><path d="M-20,622 Q180,606 380,618 Q560,608 740,620 V760 H-20Z" fill="#000" filter="url(#grainR)" opacity=".25"/><path d="M-20,622 Q180,606 380,618 Q560,608 740,620" stroke="#8a7058" stroke-width="3" fill="none" opacity=".6"/>`;
  [[90, 626, 120, 3], [250, 620, 80, 8], [470, 622, 140, 12], [650, 618, 100, 5]].forEach(([x, y, h, sd]) => { s += deadTree(x, y, h, sd, '#2e241c'); });
  s += crater(170, 650, 70) + crater(430, 662, 90) + crater(650, 652, 60) + wireLine(-20, 740, 690, .8, 4);
  [[180, 615, .65, 1.6, .3], [520, 612, .75, 2.1, .7], [330, 618, .5, 1.3, .1], [80, 616, .55, 2.6, .5]].forEach(([x, y, sc, per, ph]) => { s += burst(x, y, sc, pmod(t / per + ph, 1) * 1.15); });
  // the parapet of sandbags, the plank wall, the fire-step, the duckboards over mud and water
  s += trenchWall(760, 1130, 21) + sandbags(-30, 760, 770, 3, '#a8946a') + `<rect x="-20" y="770" width="760" height="40" fill="url(#aoDn)" opacity=".7"/>`;
  s += `<rect x="-20" y="1040" width="290" height="96" fill="#5a4432"/><rect x="-20" y="1040" width="290" height="96" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="1040" width="290" height="7" fill="#8a7050"/>` + duckFloor(1130, t);
  s += crate(640, 1140, 90, 56) + `<path d="M470,960 q30,-10 60,0" stroke="#3a2a1a" stroke-width="3" fill="none"/><rect x="482" y="960" width="36" height="46" rx="6" fill="#4a4a3e"/>`;
  // the soldiers: one on the fire-step watching over the parapet, two waiting, one sitting on a crate
  s += soldier1(150, 1042, .92, 1, 0, t, { rifle: 'port', lean: 8, mask: msk, h: { lookUp: .1 } }) + soldier1(360, 1142, .96, -1, 1, t, { rifle: 'shoulder', mask: msk, lean: Math.sin(t * 1.3) }) +
    soldier1(520, 1144, .96, 1, 2, t, { rifle: 'shoulder', mask: clamp(msk * 1.4 - .3) }) + soldier1(640, 1144, .9, -1, 0, t, { mask: msk, h: Object.assign({}, SEAT, { lean: 10, aF: [.7, 1.5], aB: [.6, 1.4] }) });
  // the gas rolls in over the parapet from the left and sinks into the trench
  if (gas > 0) { for (let i = 0; i < 9; i++) { const x = -260 + gas * (420 + i * 70) + Math.sin(t * .8 + i) * 12, y = 720 + (i % 3) * 140 + gas * 90 * (i % 2), R = 90 + i * 12; s += gasCloud(x, y, R, gas * .7); } s += `<rect x="-20" y="-20" width="760" height="1320" fill="#b8c45a" opacity="${(.08 * gas).toFixed(2)}"/>`; }
  s += `</g>`;
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}">${panel(150, 420, 420, 112)}${lbl(360, 482, 'نحوُ ' + AR4(Math.round(20 * cnt)) + ' مليونَ قتيل', 1, '#ff8a7a', 40)}${lbl(360, 518, 'جنودٌ ومدنيّون', 1, '#fff', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: the flu of 1918 spreads with the soldiers ----------
function cot(x, y, s, o = {}) { const sk = o.skin || '#c08a66', bl = o.blanket || '#7a7a6e';
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="150" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-140,0 V-150 Q-140,-170 -120,-170 L-112,-170 Q-100,-170 -100,-150 V-70 M140,0 V-110 Q140,-124 126,-124 L110,-124 Q100,-124 100,-110 V-70" stroke="#e8ecec" stroke-width="7" fill="none"/>` + [-128, -114, 118, 128].map(px => `<path d="M${px},-${px < 0 ? 160 : 116} V-74" stroke="#d8dcdc" stroke-width="3"/>`).join('') +
    `<rect x="-140" y="-76" width="280" height="10" fill="#c8ccce"/><rect x="-136" y="-98" width="272" height="24" rx="5" fill="#f2efe6"/><rect x="-130" y="-118" width="64" height="24" rx="10" fill="#fff"/>` +
    `<ellipse cx="-96" cy="-122" rx="20" ry="17" fill="${sk}"/><ellipse cx="-99" cy="-119" rx="15" ry="13" fill="#000" opacity=".1"/><path d="M-116,-128 q14,-20 38,-4 q-18,-6 -38,4Z" fill="${o.hair || '#2a1d16'}"/><path d="M-84,-122 q4,3 8,0" stroke="#3a2418" stroke-width="2" fill="none"/>` +
    `<path d="M-84,-94 Q-10,-130 60,-112 Q120,-104 136,-94 L136,-74 L-84,-74Z" fill="${bl}"/><path d="M-76,-98 Q-6,-124 60,-108" stroke="#fff" stroke-width="3" fill="none" opacity=".25"/><rect x="-84" y="-100" width="40" height="10" rx="4" fill="#f2efe6"/></g>`; }
function nurse(x, y, s, f, t, o = {}) { let g = p14(x, y, s, f, 2, t, Object.assign({ pal: { top: '#eef0ee', pants: '#e4e6e4', skin: o.skin || '#d0a07a', hair: '#e8ecec' }, skirt: '#e8eae6' }, o)); const [hx, hy] = HP.head;
  g += `<path d="M${(hx - 22 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)} Q${(hx - 20 * s).toFixed(1)},${(hy - 32 * s).toFixed(1)} ${(hx + 4 * s).toFixed(1)},${(hy - 30 * s).toFixed(1)} Q${(hx + 22 * s).toFixed(1)},${(hy - 28 * s).toFixed(1)} ${(hx + 18 * s).toFixed(1)},${(hy - 14 * s).toFixed(1)} L${(hx - 30 * s).toFixed(1)},${(hy + 30 * s).toFixed(1)} Q${(hx - 30 * s).toFixed(1)},${(hy + 4 * s).toFixed(1)} ${(hx - 22 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)}Z" fill="#f6f6f2"/><path d="M${(hx - 16 * s).toFixed(1)},${(hy - 26 * s).toFixed(1)} h${(30 * s).toFixed(1)}" stroke="#c0392b" stroke-width="${(3 * s).toFixed(1)}" opacity=".0"/>`;
  return maskP(g, '#f4f4ee'); }
function sceneFlu(t) {
  const t0 = S0(3) - .2, T = t - t0;
  let s = `<defs>${WWD()}<linearGradient id="wardW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcd8cc"/><stop offset="1" stop-color="#bab4a4"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#wardW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  // tall windows with soft daylight, wooden beams
  [40, 290, 540].forEach(x => { s += `<rect x="${x}" y="430" width="140" height="330" fill="#e8e4d8"/><rect x="${x + 10}" y="440" width="120" height="310" fill="url(#oldSky)"/><path d="M${x + 70},440 V750 M${x + 10},545 H${x + 130} M${x + 10},650 H${x + 130}" stroke="#e8e4d8" stroke-width="6"/>` + scr(`<path d="M${x + 10},750 L${x - 60},1150 L${x + 230},1150 L${x + 130},750Z" fill="#fff4dc" opacity=".14"/>`); });
  s += `<rect x="-20" y="380" width="760" height="24" fill="#6a5440"/><rect x="-20" y="404" width="760" height="6" fill="#000" opacity=".2"/>` + [120, 360, 600].map(x => `<path d="M${x},410 v40" stroke="#2a2a2a" stroke-width="2"/><path d="M${x - 16},464 Q${x},446 ${x + 16},464Z" fill="#3a4a3a"/>` + scr(`<circle cx="${x}" cy="470" r="70" fill="url(#lampW)" opacity=".5"/>`)).join('');
  s += `<rect x="-20" y="900" width="760" height="400" fill="#8a6e50"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".22"/>` + Array.from({ length: 12 }, (_, i) => `<path d="M-20,${910 + i * i * 3.2} H740" stroke="#5a4430" stroke-width="2" opacity=".5"/>`).join('') + `<rect x="-20" y="896" width="760" height="8" fill="#5a4430"/>`;
  // two rows of cots, more patients come in
  [[100, 960, .52], [300, 960, .52], [500, 960, .52], [700, 960, .52]].forEach(([x, y, sc], i) => { s += cot(x, y, sc, { skin: ['#c08a66', '#8d5a3b', '#d0a07a', '#b07a55'][i], blanket: '#7a7a6e' }); });
  [[150, 1150, .82], [520, 1150, .82]].forEach(([x, y, sc], i) => { s += cot(x, y, sc, { skin: ['#b07a55', '#d0a07a'][i], blanket: ['#6e6e64', '#7a7468'][i], hair: i ? '#5a3a22' : '#1b1410' }); });
  const nx = 340 + Math.sin(T * .5) * 10; s += nurse(nx, 1170, .9, -1, t, { h: { hF: [nx - 70, 1060], aB: [-.1, .3] } });
  s += nurse(lerp(780, 620, ease(clamp(T / 4))), 1000, .62, -1, t, { walk: T * 2.2 });
  noEarth(); F.ov = ''; return s;
}
function sceneFluG(t) {
  const n = ease(ramp(t, WS(3, 9) - .3, WS(3, 12) + .3)), cmp = ease(ramp(t, WS(3, 13) - .2, WS(3, 13) + .4));
  const G = gAt(t, 360, 640, { d: 9.2, el: .32, lon: 30 + (t - WS(3, 9)) * 8, clouds: .4, lights: .35, off: -.7 });
  F.w.disc.inf = { o: [48, 5], r: lerp(.05, 3.2, Math.pow(n, .7)), a: 1, g: lerp(.05, .55, n) };
  let o = `<defs>${WWD()}</defs>`;
  o += `<g opacity="${clamp(n * 3).toFixed(2)}">${panel(130, 1010, 460, 230)}${lbl(360, 1062, 'عددُ الوفيات', 1, '#fff', 28)}</g>`;
  const bar = (y, v, txt, col, a) => { const bw = Math.max(4, 270 * v / 50); return `<g opacity="${a.toFixed(2)}"><rect x="170" y="${y}" width="${bw.toFixed(1)}" height="36" rx="6" fill="${col}"/>${bw > 90 ? lbl(170 + bw - 8, y + 27, AR4(Math.round(v)) + ' مليون', 1, '#fff', 22, 'start') : ''}${lbl(575, y + 27, txt, 1, col === '#8a8a8a' ? '#ddd' : '#ff9a8a', 24, 'start')}</g>`; };
  o += bar(1150, 50 * n, 'الإنفلونزا', '#d83a2a', clamp(n * 3)) + bar(1094, 20 * cmp, 'الحرب', '#8a8a8a', cmp);
  F.ov = o; return space(t);
}

// ---------- 4: four empires fall; 7: without the war, they might have stayed ----------
const EK = ['ru', 'de', 'at', 'ot'];
function empView(t, lon) { return gAt(t, 360, 700, { d: 5.0, el: .74, lon, clouds: .25, lights: .2, off: -.7, up: .6 }); }
function sceneEmp(t) {
  const t0 = S0(4) - .2, T = t - t0, G = empView(t, 34 + T * .5);
  let o = `<defs>${WWD()}</defs>`;
  EK.forEach((k, i) => { const w = WS(4, 5 + i), hi = ease(ramp(t, w - .2, w + .1)) * (1 - ease(ramp(t, w + .4, w + .8))), br = ease(ramp(t, w + .35, w + 1.5)); o += empL(G, k, 1, br, hi, t); });
  EK.forEach((k, i) => { const w = WS(4, 5 + i), E = EMP[k], a = ease(ramp(t, w - .2, w + .15)) * (1 - .6 * ease(ramp(t, w + .9, w + 1.5))); o += pin(G, E.at[0], E.at[1], E.n, a, '#fff', 26); });
  F.ov = o; return space(t);
}
function sceneAlt(t) {
  const t0 = S0(7) - .2, T = t - t0, G = empView(t, 36 + T * .6), back = ease(ramp(t, WS(7, 3), WS(7, 6) + .6));
  let o = `<defs>${WWD()}</defs>`;
  EK.forEach((k, i) => { o += empL(G, k, clamp(back * 1.5), 1 - clamp(back * 1.2 - i * .06), ease(ramp(t, WS(7, 7), WS(7, 9))) * .5, t); });
  EK.forEach((k, i) => { const E = EMP[k]; o += pin(G, E.at[0], E.at[1], E.n, ease(ramp(t, WS(7, 6) - .1 + i * .15, WS(7, 6) + .3 + i * .15)), '#fff', 26); });
  const q = ease(ramp(t, WS(7, 9), WS(7, 11))); if (q > 0) o += `<text x="610" y="560" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="120" fill="#f4c76b" opacity="${q.toFixed(2)}" style="filter:drop-shadow(0 4px 14px rgba(0,0,0,.7))">؟</text>`;
  F.ov = o; return space(t);
}

// ---------- 5: in Russia, a revolution in the middle of the war gave birth to the Soviet Union ----------
function palaceF(x0, base, w, h) {   // a long baroque palace: pale green, paired white columns, arched ground-floor windows, tall windows with ornate frames, a balustrade with statues and vases, snow on the ledges
  const g1 = base - h * .42, at = base - h; let s = `<rect x="${x0}" y="${at}" width="${w}" height="${h}" fill="#86b49a"/><rect x="${x0}" y="${at}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".16"/>`;
  const bw = 74, n = Math.ceil(w / bw);
  for (let i = 0; i < n; i++) { const x = x0 + i * bw, cx = x + bw / 2;
    // ground floor: arched window with a keystone
    s += `<path d="M${cx - 15},${base - 26} V${g1 + 52} A15,15 0 0 1 ${cx + 15},${g1 + 52} V${base - 26}Z" fill="#2e3c44"/><path d="M${cx - 19},${g1 + 52} A19,19 0 0 1 ${cx + 19},${g1 + 52}" stroke="#f0eee6" stroke-width="5" fill="none"/><rect x="${cx - 4}" y="${g1 + 28}" width="8" height="10" fill="#f0eee6"/><path d="M${cx - 12},${base - 30} L${cx - 3},${g1 + 46}" stroke="#a8c4d4" stroke-width="3" opacity=".2"/>`;
    // main floor: tall window with a frame, a pediment and a little balcony
    s += `<rect x="${cx - 18}" y="${at + 46}" width="36" height="${h * .36}" fill="#f0eee6"/><rect x="${cx - 13}" y="${at + 52}" width="26" height="${h * .36 - 10}" fill="#2e3c44"/><path d="M${cx},${at + 52} V${at + 42 + h * .36} M${cx - 13},${at + 52 + h * .14} H${cx + 13}" stroke="#f0eee6" stroke-width="2"/><path d="M${cx - 10},${at + h * .36 + 30} L${cx - 2},${at + 60}" stroke="#a8c4d4" stroke-width="3" opacity=".2"/>` +
      (i % 2 ? `<path d="M${cx - 24},${at + 44} Q${cx},${at + 22} ${cx + 24},${at + 44}Z" fill="#f0eee6"/>` : `<path d="M${cx - 24},${at + 44} L${cx},${at + 26} L${cx + 24},${at + 44}Z" fill="#f0eee6"/>`) + `<path d="M${cx - 26},${at + 44} h52" stroke="#fff" stroke-width="3"/>`;
    // paired columns with capitals
    [x + 2, x + 12].forEach(px => { s += `<rect x="${px}" y="${at + 14}" width="8" height="${g1 - at - 14}" fill="#f4f2ea"/><rect x="${px + 5}" y="${at + 14}" width="3" height="${g1 - at - 14}" fill="#000" opacity=".12"/><rect x="${px - 2}" y="${at + 10}" width="12" height="7" fill="#f4f2ea"/>`; });
    // the roof line: a statue or a vase on each bay
    s += i % 2 ? `<path d="M${x + 7},${at - 10} q-5,-12 0,-30 q6,-8 3,-16 h4 q-3,8 3,16 q5,18 0,30Z" fill="#3a3c36"/><circle cx="${x + 9}" cy="${at - 60}" r="6" fill="#3a3c36"/><path d="M${x + 6},${at - 52} l-8,18 M${x + 12},${at - 52} l6,-14" stroke="#3a3c36" stroke-width="4"/>` : `<path d="M${x + 1},${at - 10} h16 l-4,-6 q8,-10 0,-20 h-8 q-8,10 0,20Z" fill="#3a3c36"/>`;
  }
  s += `<rect x="${x0 - 6}" y="${at - 10}" width="${w + 12}" height="12" fill="#f0eee6"/>` + Array.from({ length: Math.floor(w / 14) }, (_, i) => `<rect x="${x0 + i * 14}" y="${at - 2}" width="6" height="0" fill="#fff"/>`).join('') +
    `<rect x="${x0 - 6}" y="${at + 2}" width="${w + 12}" height="12" fill="#f0eee6"/><rect x="${x0 - 6}" y="${g1 - 8}" width="${w + 12}" height="14" fill="#f0eee6"/><rect x="${x0 - 6}" y="${g1 + 6}" width="${w + 12}" height="4" fill="#000" opacity=".18"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${x0},${g1 + 20 + i * 22} H${x0 + w}" stroke="#000" stroke-width="1.4" opacity=".12"/>`;
  // snow on the ledges and roof
  s += [at - 12, at + 1, g1 - 10].map(y => `<path d="M${x0 - 6},${y} ${Array.from({ length: 40 }, (_, i) => `L${(x0 - 6 + i * (w + 12) / 39).toFixed(1)},${(y - 2 - Math.abs(Math.sin(i * 1.7)) * 4).toFixed(1)}`).join(' ')} L${x0 + w + 6},${y + 3} L${x0 - 6},${y + 3}Z" fill="#f8fafc"/>`).join('');
  s += `<rect x="${x0}" y="${at}" width="${w}" height="${h}" fill="url(#aoDn)" opacity=".25"/><rect x="${x0}" y="${base - 30}" width="${w}" height="30" fill="#5a6a64" opacity=".5"/>`;
  return s; }
function flagR(x, y, h, t, i, w = 90, ch = 40) { const p = t * 4 + i; let d = `M${x},${y - h}`; for (let k = 0; k <= 8; k++) d += ` L${(x + w * k / 8).toFixed(1)},${(y - h + Math.sin(p + k * .7) * 5 * k / 8).toFixed(1)}`; for (let k = 8; k >= 0; k--) d += ` L${(x + w * k / 8).toFixed(1)},${(y - h + ch + Math.sin(p + k * .7 + .4) * 5 * k / 8).toFixed(1)}`;
  return `<path d="M${x},${y + 20} V${y - h - 4}" stroke="#3a2a1a" stroke-width="5"/><path d="${d}Z" fill="#c8241e"/><path d="${d}Z" fill="url(#aoDn)" opacity=".3"/><path d="M${x},${y - h} ${Array.from({ length: 8 }, (_, k) => `L${(x + w * (k + 1) / 8).toFixed(1)},${(y - h + Math.sin(p + (k + 1) * .7) * 5 * (k + 1) / 8).toFixed(1)}`).join(' ')}" stroke="#fff" stroke-width="2" fill="none" opacity=".25"/>`; }
function sceneRussia(t) {
  const t0 = S0(5) - .2, T = t - t0, ma = T * 22;
  let s = `<defs>${WWD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#winterSky)"/>`;
  s += `<g transform="translate(360,900) scale(${(1 + .04 * ease(clamp(T / 5))).toFixed(3)}) translate(-360,-900)">`;
  s += smokeCol(640, 640, 300, t, 4, .35) + palaceF(-40, 940, 820, 360) + `<rect x="-20" y="560" width="760" height="400" fill="#c8ccd4" opacity=".16"/>`;
  // the snowy square, trampled
  s += `<rect x="-20" y="940" width="760" height="360" fill="#e4e8ee"/><rect x="-20" y="940" width="760" height="360" fill="#7a8698" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="936" width="760" height="10" fill="#b8c0cc"/>` +
    `<path d="M-20,1010 Q300,990 740,1020 V1080 Q300,1050 -20,1070Z" fill="#b8bec8" opacity=".5"/><path d="M-20,1180 Q300,1150 740,1190 V1240 Q300,1210 -20,1230Z" fill="#c0c6d0" opacity=".45"/>`;
  // a dense crowd far back, then two marching rows with red flags held high and a long banner
  for (let i = 0; i < 26; i++) { const x = pmod(i * 31 + ma * .6, 800) - 40, y = 978 + (i % 3) * 6; s += `<g opacity=".9">${p14(x, y, .36, 1, i % 5, t, { walk: t * 2.4 + i, hat: i % 2 ? 'fur' : 'cap', hatC: '#2a2420', h: { amp: .35 } })}</g>`; if (i % 6 === 2) s += flagR(x + 6, y - 60, 70, t, i, 34, 18); }
  const crowd = (y, sc, n, off, k0) => { let g = ''; for (let i = 0; i < n; i++) { const x = pmod(off + i * (800 / n) + ma, 900) - 90, k = (i + k0) % 5, fl = i % 3 === 1;
      g += p14(x, y, sc, 1, k, t, { walk: t * 2.6 + i * 1.7, hat: ['fur', 'cap', 'fur', 'bowler', 'fur'][k], hatC: ['#3a2e26', '#2a2a2a', '#5a4a3a', '#1c1a1a', '#2e2620'][k], pal: { top: ['#3a3430', '#4a3e30', '#2e3238', '#5a4434', '#3a2e2e'][k] }, h: Object.assign({ amp: .38 }, fl ? { hF: [x + 18 * sc, y - 200 * sc] } : {}) });
      if (fl) g += flagR(HP.hand[0], HP.hand[1], 150 * sc, t, i, 84 * sc, 44 * sc) + `<circle cx="${HP.hand[0].toFixed(1)}" cy="${HP.hand[1].toFixed(1)}" r="${(7.5 * sc).toFixed(1)}" fill="${P14[k].skin}"/>`; } return g; };
  s += crowd(1060, .62, 9, 20, 0);
  { const bx = pmod(140 + ma, 900) - 90, by = 1060 - 230 * .62; s += `<path d="M${bx},1060 V${by - 30} M${bx + 220},1060 V${by - 30}" stroke="#3a2a1a" stroke-width="5"/><path d="M${bx},${by - 26} Q${bx + 110},${by - 14 + Math.sin(t * 3) * 5} ${bx + 220},${by - 26} V${by + 10} Q${bx + 110},${by + 22 + Math.sin(t * 3 + .5) * 5} ${bx},${by + 10}Z" fill="#c8241e"/><path d="M${bx},${by - 26} Q${bx + 110},${by - 14 + Math.sin(t * 3) * 5} ${bx + 220},${by - 26}" stroke="#fff" stroke-width="2" fill="none" opacity=".25"/>`; }
  s += crowd(1220, .86, 6, 60, 2);
  s += `</g>` + snowFall(t, 1, 150);
  noEarth(); F.ov = ''; return s;
}

// ---------- 6: Britain and France share out the Ottoman lands and draw borders that still stand ----------
const MAND = { fr: [[35.9, 35.9], [36.6, 36.6], [36.8, 37.5], [36.8, 38.0], [36.7, 39.5], [37.0, 41.0], [37.1, 42.3], [36.4, 41.3], [34.5, 41.0], [33.4, 38.8], [32.3, 36.8], [32.7, 35.8], [33.1, 35.6], [33.1, 35.1], [34.0, 35.6], [34.65, 35.95]],
  iq: [[37.1, 42.3], [37.3, 43.5], [37.3, 44.4], [36.0, 45.4], [35.1, 45.9], [33.6, 45.7], [32.4, 46.1], [31.0, 47.7], [30.0, 48.5], [30.1, 47.9], [29.1, 46.5], [29.1, 44.7], [31.0, 41.5], [32.2, 39.3], [33.4, 38.8], [34.5, 41.0], [36.4, 41.3]],
  jo: [[33.4, 38.8], [32.2, 39.3], [31.5, 37.0], [30.3, 38.0], [29.2, 36.1], [29.35, 34.95], [29.5, 34.9], [31.3, 34.2], [31.6, 34.5], [32.5, 34.9], [33.1, 35.1], [33.1, 35.6], [32.7, 35.8], [32.3, 36.8]] };
const BORD = [[[35.9, 35.9], [36.6, 36.6], [36.8, 37.5], [36.8, 38.0], [36.7, 39.5], [37.0, 41.0], [37.1, 42.3], [37.3, 43.5], [37.3, 44.4]], [[37.1, 42.3], [36.4, 41.3], [34.5, 41.0], [33.4, 38.8], [32.3, 36.8], [32.7, 35.8]], [[33.4, 38.8], [32.2, 39.3], [31.0, 41.5], [29.1, 44.7], [29.1, 46.5], [30.1, 47.9]],
  [[32.2, 39.3], [31.5, 37.0], [30.3, 38.0], [29.2, 36.1], [29.35, 34.95]], [[34.65, 35.95], [34.6, 36.4], [34.0, 36.3], [33.3, 35.8], [33.1, 35.6], [33.1, 35.1]], [[32.7, 35.6], [31.8, 35.55], [31.0, 35.4], [29.5, 35.0]], [[31.3, 34.2], [29.5, 34.9]]];
function areaD(G, pts) { return polyD(G, pts, 3); }
function sceneSykes(t) {
  const t0 = S0(6) - .2, T = t - t0, G = gAt(t, 360, 760, { d: lerp(2.9, 2.55, ease(clamp(T / 6))), el: .56, lon: 39.5 + T * .15, clouds: .2, lights: .2, off: -.7, up: .6 });
  const br = ease(ramp(t, WS(6, 1) - .2, WS(6, 1) + .4)), fr = ease(ramp(t, WS(6, 2) - .2, WS(6, 2) + .4)), bd = ease(ramp(t, WS(6, 5), WS(6, 8) + .3)), lb = ease(ramp(t, WS(6, 7), WS(6, 9)));
  let o = `<defs>${WWD()}</defs>` + empL(G, 'ot', 1 - .6 * fr, 0, 0, t);
  const ar = (pts, c, a) => a > 0 ? `<path d="${areaD(G, pts)}" fill="${c}" opacity="${(.5 * a).toFixed(2)}"/><path d="${areaD(G, pts)}" fill="url(#hatchR)" opacity="${(.25 * a).toFixed(2)}"/>` : '';
  o += ar(MAND.iq, '#e04a5a', br) + ar(MAND.jo, '#e04a5a', br) + ar(MAND.fr, '#3a7ae0', fr);
  o += pin(G, 32.6, 43.8, 'بريطانيا', br * (1 - lb), '#ffd0d4', 32) + pin(G, 35.0, 38.4, 'فرنسا', fr * (1 - lb), '#d0e0ff', 32);
  BORD.forEach((B, i) => { const d = partD(linePath(G, B, 1.008), clamp(bd * 1.6 - i * .1)); if (clamp(bd * 1.6 - i * .1) > 0) o += `<path d="${d}" stroke="#2a1a04" stroke-width="7" fill="none" opacity=".5" stroke-linecap="round"/><path d="${d}" stroke="#f4c76b" stroke-width="3.4" fill="none" stroke-linecap="round"/>`; });
  o += pin(G, 33.0, 43.4, 'العراق', lb, '#fff', 34) + pin(G, 35.3, 38.8, 'سوريا', lb, '#fff', 32) + pin(G, 30.7, 37.0, 'الأردن', lb, '#fff', 30) + pin(G, 34.6, 34.6, 'لبنان', lb, '#fff', 24) + pin(G, 31.6, 33.8, 'فلسطين', lb, '#fff', 24);
  F.ov = o; return space(t);
}

// ---------- 8: the war sped up science: more than 200,000 planes, the first tank, the first blood bank ----------
function biplane(x, y, s, f, t, o = {}) {
  const pr = Math.cos(t * 60 + (o.ph || 0)), c = o.col || '#5a6640', wing = o.wing || '#d8cca4';
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(o.rot || 0).toFixed(1)}) scale(${(f * s).toFixed(3)},${s})">`;
  g += `<path d="M-120,-56 L-104,-56 L-92,-12 L-120,-10Z" fill="${c}"/><path d="M-130,-14 L-70,-16 L-70,-10 L-130,-8Z" fill="${wing}"/>`;   // tail fin and stabiliser
  g += `<path d="M-40,-64 L74,-64 Q86,-62 84,-58 L-40,-56Z" fill="${wing}"/><path d="M-40,-64 L74,-64" stroke="#fff" stroke-width="2" opacity=".35"/><path d="M-40,-56 L84,-58" stroke="#000" stroke-width="2" opacity=".2"/>`;   // upper wing
  g += `<path d="M-10,-62 L-14,6 M50,-62 L46,6" stroke="#4a3a2a" stroke-width="3.2"/><path d="M-10,-62 L46,6 M50,-62 L-14,6" stroke="#2a2a2a" stroke-width="1" opacity=".6"/><path d="M14,-58 L8,-30 M34,-58 L40,-30" stroke="#4a3a2a" stroke-width="3"/>`;
  g += `<path d="M-118,-16 Q-60,-26 0,-34 L80,-36 Q96,-34 96,-16 Q96,0 80,0 L0,-6 Q-60,-6 -118,-10Z" fill="${c}"/><path d="M-110,-16 Q-50,-24 0,-31 L80,-33" stroke="#fff" stroke-width="2.4" fill="none" opacity=".25"/><path d="M0,-6 L80,0 Q96,0 96,-16" stroke="#000" stroke-width="5" fill="none" opacity=".22"/>`;   // fuselage
  g += `<path d="M-36,-2 L86,0 Q90,4 84,8 L-36,8Z" fill="${wing}"/><path d="M-36,8 L84,8" stroke="#000" stroke-width="2" opacity=".2"/>`;   // lower wing
  g += `<rect x="86" y="-34" width="14" height="34" rx="5" fill="#6a6a6a"/><rect x="88" y="-32" width="4" height="30" fill="#fff" opacity=".3"/><circle cx="104" cy="-17" r="5" fill="#3a2a1a"/>`;
  g += `<ellipse cx="106" cy="-17" rx="5" ry="50" fill="#c8c0b0" opacity=".18"/><path d="M106,-17 L106,${(-17 - 48 * pr).toFixed(1)} M106,-17 L106,${(-17 + 48 * pr).toFixed(1)}" stroke="#4a3220" stroke-width="5" stroke-linecap="round"/>`;
  g += `<path d="M40,0 L30,30 M40,0 L54,30" stroke="#3a3a3a" stroke-width="3"/><circle cx="42" cy="32" r="12" fill="#1a1a1a"/><circle cx="42" cy="32" r="5" fill="#8a8a8a"/>`;
  g += `<ellipse cx="14" cy="-40" rx="11" ry="12" fill="#5a3a22"/><rect x="12" y="-44" width="14" height="6" rx="3" fill="#a8c4d4"/><path d="M-2,-34 L30,-36" stroke="#2a2a2a" stroke-width="4"/>`;
  return g + `</g>`;
}
function fieldsL(y0, y1) { let s = `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#8aa060"/>`; const r = RS(31); const cols = ['#9ab068', '#c8b870', '#7a9a58', '#a8a864', '#b8a060', '#6e8a50'];
  for (let row = 0; row < 7; row++) { const yA = lerp(y0, y1, Math.pow(row / 7, 1.6)), yB = lerp(y0, y1, Math.pow((row + 1) / 7, 1.6)); let x = -40; while (x < 760) { const w = 80 + r() * 160 * (1 + row * .3); s += `<path d="M${x.toFixed(0)},${yA.toFixed(0)} L${(x + w).toFixed(0)},${yA.toFixed(0)} L${(x + w * (1.05 + row * .02)).toFixed(0)},${yB.toFixed(0)} L${(x - w * .05).toFixed(0)},${yB.toFixed(0)}Z" fill="${cols[Math.floor(r() * cols.length)]}" stroke="#5a7040" stroke-width="2"/>`; x += w; } }
  for (let i = 0; i < 26; i++) { const yy = lerp(y0 + 8, y1, Math.pow(r(), 1.3)), k = (yy - y0) / (y1 - y0), xx = r() * 760 - 20, R = 6 + 22 * k; s += `<ellipse cx="${xx.toFixed(0)}" cy="${(yy + R * .5).toFixed(0)}" rx="${(R * 1.2).toFixed(1)}" ry="${(R * .35).toFixed(1)}" fill="#000" opacity=".2"/><circle cx="${xx.toFixed(0)}" cy="${yy.toFixed(0)}" r="${R.toFixed(1)}" fill="#4a6a34"/><circle cx="${(xx - R * .3).toFixed(0)}" cy="${(yy - R * .3).toFixed(0)}" r="${(R * .55).toFixed(1)}" fill="#6a8a44"/>`; }
  [[560, y0 + 40, .5], [140, y0 + 110, .8]].forEach(([fx, fy, k]) => { s += `<rect x="${fx}" y="${fy - 30 * k}" width="${60 * k}" height="${30 * k}" fill="#e8dcc4"/><path d="M${fx - 6 * k},${fy - 30 * k} L${fx + 30 * k},${fy - 52 * k} L${fx + 66 * k},${fy - 30 * k}Z" fill="#a8583a"/><rect x="${fx + 12 * k}" y="${fy - 22 * k}" width="${10 * k}" height="${10 * k}" fill="#3a3a3a"/>`; });
  return s + `<rect x="-20" y="${y0}" width="760" height="${y1 - y0}" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="${y0}" width="760" height="${(y1 - y0) * .25}" fill="#c8d8e4" opacity=".3"/>`; }
function scenePlanes(t) {
  const t0 = S0(8) - .2, T = t - t0, cnt = ease(ramp(t, WS(8, 7), WS(8, 11) + .2)), pa = ease(ramp(t, WS(8, 7) - .3, WS(8, 7)));
  let s = `<defs>${WWD()}${CUDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#oldSky)"/>` + fieldsL(900, 1300);
  s += cumulus(140, 620, 260, 3) + cumulus(560, 760, 220, 7);
  // more and more planes appear in the sky
  const n = Math.round(lerp(2, 14, ease(ramp(t, WS(8, 5), WS(8, 11))))), r = RS(12);
  for (let i = 0; i < 14; i++) { const sx = r() * 900, sy = 470 + r() * 380, sp = 40 + r() * 50, sc = .14 + r() * .16; if (i >= n) continue; const x = pmod(sx + T * sp, 1000) - 140; s += biplane(x, sy + Math.sin(t + i) * 6, sc, 1, t, { ph: i, col: ['#5a6640', '#6a4a36', '#4a5a6a'][i % 3] }); }
  s += biplane(lerp(-200, 520, ease(clamp(T / 5.5))), 900 + Math.sin(t * 1.4) * 14, .95, 1, t, { rot: -4 + Math.sin(t) * 2 }) + cumulus(380, 1010, 300, 11);
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}">${panel(150, 1110, 420, 110)}${lbl(360, 1170, '+' + AR4(Math.round(200 * cnt)) + ' ألفِ طائرة', 1, '#f4c76b', 42)}${lbl(360, 1206, 'صُنِعت في سنواتِ الحرب', 1, '#fff', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}
function tankMk(x, y, s, t) {
  const loop = 'M-176,-34 Q-182,-96 -126,-110 L120,-110 Q196,-110 216,-44 L178,0 L-146,0 Q-176,0 -176,-34Z';
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><ellipse cx="10" cy="4" rx="220" ry="14" fill="#000" opacity=".35" filter="url(#blur2)"/>`;
  g += `<path d="M-176,-30 L-226,-18" stroke="#3a3a30" stroke-width="8"/><circle cx="-226" cy="-14" r="20" fill="#2a2a24"/><circle cx="-226" cy="-14" r="8" fill="#6a6a5a"/>`;   // the tail wheels
  g += `<path d="${loop}" fill="#6a6448"/><path d="${loop}" fill="none" stroke="#2a261c" stroke-width="20" stroke-linejoin="round"/><path d="${loop}" fill="none" stroke="#5a5240" stroke-width="12" stroke-dasharray="7 9" stroke-dashoffset="${(-t * 40).toFixed(1)}"/>`;
  g += `<path d="M-150,-34 Q-152,-80 -116,-88 L110,-88 Q160,-88 176,-44 L156,-18 L-130,-18Z" fill="#7a7454"/><path d="M-150,-34 Q-152,-80 -116,-88 L110,-88" stroke="#fff" stroke-width="2.4" fill="none" opacity=".2"/>` + Array.from({ length: 12 }, (_, i) => `<circle cx="${-120 + i * 24}" cy="-80" r="2.4" fill="#3a3828"/><circle cx="${-120 + i * 24}" cy="-26" r="2.4" fill="#3a3828"/>`).join('');
  g += `<path d="M-44,-86 L52,-86 L62,-36 L-54,-36Z" fill="#5e5a40"/><path d="M-44,-86 L52,-86" stroke="#fff" stroke-width="2" opacity=".2"/><rect x="58" y="-72" width="60" height="9" rx="3" fill="#2a2a24"/><rect x="-24" y="-74" width="20" height="14" fill="#1a1a14"/><rect x="18" y="-74" width="20" height="14" fill="#1a1a14"/>`;
  g += `<path d="M-176,-34 Q-182,-96 -126,-110" stroke="#8a7a5a" stroke-width="6" fill="none" opacity=".4"/><path d="M-140,-4 Q-60,-14 40,-6 Q120,-14 170,-4" stroke="#4a3624" stroke-width="10" fill="none" opacity=".7"/>`;   // mud on the tracks
  return g + `</g>`;
}
function bloodInset(x, y, R, a) { if (a <= 0) return '';
  return `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="${R + 8}" fill="#f4c76b"/><circle cx="${x}" cy="${y}" r="${R}" fill="#e8ece8"/><circle cx="${x}" cy="${y}" r="${R}" fill="#000" filter="url(#grainR)" opacity=".08"/>` +
    `<path d="M${x - 30},${y - 50} h60 v14 q22,10 22,40 v66 q0,16 -16,16 h-72 q-16,0 -16,-16 v-66 q0,-30 22,-40Z" fill="#dfe8ec" opacity=".8" stroke="#a8b8c0" stroke-width="3"/><path d="M${x - 48},${y + 6} q48,-8 96,0 v64 q0,12 -12,12 h-72 q-12,0 -12,-12Z" fill="url(#bloodG)"/><rect x="${x - 26}" y="${y - 70}" width="52" height="24" rx="6" fill="#5a4a4a"/>` +
    `<path d="M${x - 38},${y - 30} q-4,30 0,90" stroke="#fff" stroke-width="5" opacity=".5" fill="none"/><rect x="${x - 30}" y="${y + 20}" width="60" height="30" rx="4" fill="#f4efe0"/>${lbl(x, y + 44, 'O', 1, '#7a0e18', 24)}</g>`; }
function sceneTank(t) {
  const t0 = WS(8, 12) - .3, T = t - t0, ins = ease(ramp(t, WS(8, 15) - .3, WS(8, 16)));
  let s = `<defs>${WWD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#warSky)"/>` + smokeCol(560, 760, 400, t, 6, .5);
  s += `<path d="M-20,760 Q200,744 400,756 Q600,746 740,758 V1300 H-20Z" fill="#5a4636"/><path d="M-20,760 Q200,744 400,756 Q600,746 740,758 V1300 H-20Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  [[80, 762, 110, 4], [620, 756, 140, 9]].forEach(([x, y, h, sd]) => { s += deadTree(x, y, h, sd, '#2e241c'); });
  s += crater(200, 860, 110) + crater(560, 900, 90) + wireLine(-20, 740, 1010, 1, 7) + crater(380, 1220, 160);
  s += tankMk(lerp(60, 340, clamp(T / 3)), 1100, 1.15, t) + `<ellipse cx="${lerp(-150, 130, clamp(T / 3))}" cy="1010" rx="90" ry="40" fill="url(#smkG)" opacity=".5"/>`;
  s += burst(600, 820, .7, pmod(T / 1.8 + .3, 1) * 1.1);
  s += bloodInset(530, 560, 120, ins) + lbl(530, 730, 'أوّلُ بنكٍ للدم — ١٩١٧', ins, '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
