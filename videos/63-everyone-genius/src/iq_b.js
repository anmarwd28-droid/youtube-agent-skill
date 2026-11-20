// iq_b.js (#63): scenes 5-9 (researchers, faster science, machines, longer lives, clever arguments)
// tractor and wheatField from #47 (tc_b.js)
function tractor(x, y, s) {   // side view facing right; (x, y) = ground under the rear wheel
  const tyre = (cx, cy, R) => `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#1e1e22"/>` + Array.from({ length: 18 }, (_, i) => { const a = i / 18 * 6.2832; return `<path d="M${(cx + Math.cos(a) * (R - 2)).toFixed(1)},${(cy + Math.sin(a) * (R - 2)).toFixed(1)} L${(cx + Math.cos(a + .12) * (R + 4)).toFixed(1)},${(cy + Math.sin(a + .12) * (R + 4)).toFixed(1)}" stroke="#141418" stroke-width="7"/>`; }).join('') +
    `<circle cx="${cx}" cy="${cy}" r="${R * .58}" fill="#d8a82a"/><circle cx="${cx}" cy="${cy}" r="${R * .18}" fill="#8a6a1a"/>` + [0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * 6.2832; return `<circle cx="${(cx + Math.cos(a) * R * .36).toFixed(1)}" cy="${(cy + Math.sin(a) * R * .36).toFixed(1)}" r="${(R * .05).toFixed(1)}" fill="#6a5010"/>`; }).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="80" cy="4" rx="190" ry="12" fill="#000" opacity=".3" filter="url(#blur5)"/>` +
    `<path d="M40,-120 L250,-120 Q268,-118 268,-100 L268,-62 L40,-62Z" fill="#2f7a3a"/><path d="M40,-120 L250,-120 Q268,-118 268,-100 L268,-108 L40,-108Z" fill="#fff" opacity=".2"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${200 + i * 10},-110 v36" stroke="#1a4a22" stroke-width="3"/>`).join('') +
    `<rect x="-30" y="-150" width="90" height="100" fill="#2a6a32"/><path d="M-38,-250 L72,-250 L66,-150 L-30,-150Z" fill="#9ab8c8" opacity=".55"/><path d="M-38,-250 L72,-250 L66,-150 L-30,-150Z" fill="none" stroke="#1e2a20" stroke-width="7"/><path d="M-44,-258 H80 V-248 H-44Z" fill="#2f7a3a"/>` +
    `<path d="M-30,-250 L10,-250 L-28,-170Z" fill="#fff" opacity=".22"/><path d="M150,-120 V-190" stroke="#3a3a40" stroke-width="9"/><path d="M146,-190 h8 v-10 h-8Z" fill="#2a2a30"/>` +
    `<path d="M-30,-60 L270,-60" stroke="#1e2420" stroke-width="10"/>` + tyre(0, -78, 78) + tyre(214, -42, 42) + `<path d="M-84,-108 A88,88 0 0 1 84,-108" stroke="#2f7a3a" stroke-width="16" fill="none"/></g>`;
}
function wheatField(t, HZ, ripe, seed) {
  let s = `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="${mix('#9aa84a', '#c8a85a', ripe)}"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  const r = RS(seed);
  for (let row = 0; row < 26; row++) { const z = Math.pow(row / 25, 1.8), y = HZ + 8 + z * (1300 - HZ), h = 8 + 70 * z, n = Math.round(60 - 30 * z), sw = Math.sin(t * 1.4 + row * .5) * 3 * (.4 + z);
    let p = '', e = '';
    for (let i = 0; i < n; i++) { const x = (i + r() * .8) * 780 / n - 30, hh = h * (.8 + .35 * r()), lx = x + sw + (r() - .5) * 4;
      p += `M${x.toFixed(1)},${y.toFixed(1)} Q${(x + sw * .3).toFixed(1)},${(y - hh * .5).toFixed(1)} ${lx.toFixed(1)},${(y - hh).toFixed(1)} `;
      e += `<ellipse cx="${lx.toFixed(1)}" cy="${(y - hh - h * .1).toFixed(1)}" rx="${(1.2 + 2.4 * z).toFixed(1)}" ry="${(3 + 9 * z).toFixed(1)}" fill="${mix('#c8c060', '#e8c46a', ripe)}" transform="rotate(${(sw * 3).toFixed(1)},${lx.toFixed(1)},${(y - hh).toFixed(1)})"/>`; }
    s += `<path d="${p}" stroke="${mix('#7a8a3a', '#a88a3a', ripe)}" stroke-width="${(.6 + 1.6 * z).toFixed(1)}" fill="none"/>` + e;
    if (row % 3 === 0) s += `<rect x="-20" y="${(y - h * .3).toFixed(1)}" width="760" height="${(h * .3).toFixed(1)}" fill="#000" opacity=".06"/>`; }
  return s;
}
// ---------- 5: a lab today (about nine million researchers) -> a night city where every window becomes a lab ----------
function microscope(x, y, s) { return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="60" ry="8" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-50" y="-14" width="100" height="16" rx="5" fill="#2a2e36"/><path d="M14,-14 C40,-60 40,-120 10,-150" stroke="#3a3e48" stroke-width="22" fill="none" stroke-linecap="round"/>` +
  `<rect x="-36" y="-74" width="70" height="8" rx="2" fill="#3a3e48"/><rect x="-6" y="-70" width="14" height="10" fill="#c8ccd4"/><g transform="rotate(-24,-8,-150)"><rect x="-22" y="-176" width="28" height="70" rx="6" fill="#e8eaee"/><rect x="-18" y="-206" width="18" height="34" rx="4" fill="#2a2e36"/><rect x="-18" y="-112" width="20" height="26" fill="#9aa0aa"/></g><circle cx="34" cy="-60" r="10" fill="#5a5e68"/></g>`; }
function labRoom(t, T) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="#dfe6ea"/>`;
  for (let i = 0; i < 18; i++) s += `<path d="M${i * 42},380 V960" stroke="#b8c4cc" stroke-width="1.6"/>`;
  for (let i = 0; i < 15; i++) s += `<path d="M-20,${380 + i * 42} H740" stroke="#b8c4cc" stroke-width="1.6"/>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/><rect x="-20" y="360" width="760" height="40" fill="url(#aoDn)" opacity=".5"/>`;
  // shelf with bottles and a fume hood
  s += `<rect x="40" y="600" width="300" height="12" fill="#8a96a2"/><rect x="40" y="612" width="300" height="10" fill="#000" opacity=".15" filter="url(#blur2)"/>`;
  [[70, '#3a7ab0', 60], [110, '#c8a040', 44], [150, '#7a4a8a', 70], [196, '#e8eef2', 52], [236, '#3a8a5a', 40], [276, '#a03a2a', 62], [312, '#e8eef2', 48]].forEach(([x, c, h]) => s += `<rect x="${x - 14}" y="${600 - h}" width="28" height="${h}" rx="5" fill="${c}" opacity=".85"/><rect x="${x - 9}" y="${600 - h - 12}" width="18" height="14" rx="2" fill="#2a2e36"/><rect x="${x - 10}" y="${600 - h + 6}" width="5" height="${h - 14}" fill="#fff" opacity=".3"/>`);
  s += `<rect x="440" y="440" width="270" height="400" fill="#c8d0d6"/><rect x="456" y="470" width="238" height="250" fill="#2a3a48" opacity=".55"/><rect x="456" y="470" width="238" height="250" fill="url(#glsG)" opacity=".35"/><path d="M466,700 L560,480" stroke="#fff" stroke-width="10" opacity=".15"/><rect x="440" y="430" width="270" height="20" fill="#9aa4ac"/>`;
  // two researchers behind the bench
  s += coatP(220, 1170, .98, 1, 2, t, { h: { lean: 14, hF: [304, 900], hB: [280, 960] } });
  s += coatP(560, 1170, .98, -1, 3, t, { hat: null, h: { hF: [lerp(456, 470, .5 + .5 * Math.sin(T * 2.4)), 930 + 8 * Math.sin(T * 2.4)], hB: [500, 1000], lookUp: -.25 } }) + hairL(.98, -1, '#2a1a12');
  // the bench, items on it
  s += `<rect x="-20" y="1010" width="760" height="22" fill="#2a3038"/><rect x="-20" y="1010" width="760" height="4" fill="#fff" opacity=".25"/><rect x="-20" y="1032" width="760" height="160" fill="#eef1f3"/><rect x="-20" y="1032" width="760" height="20" fill="url(#aoDn)" opacity=".5"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${-10 + i * 128}" y="1046" width="118" height="134" rx="4" fill="none" stroke="#b8c2ca" stroke-width="3"/><rect x="${44 + i * 128}" y="1100" width="10" height="30" rx="4" fill="#8a96a2"/>`;
  s += `<rect x="-20" y="1190" width="760" height="130" fill="#8a949c"/><rect x="-20" y="1190" width="760" height="18" fill="url(#aoDn)" opacity=".6"/>`;
  s += microscope(318, 1010, .95) + flask(462, 1010, 1.0, '#3aa0d8') + flask(520, 1010, .8, '#e0a030') + `<rect x="586" y="970" width="90" height="40" rx="4" fill="#d8dce0"/>` + Array.from({ length: 5 }, (_, i) => vial(598 + i * 17, 978, .7)).join('') + petri(130, 998, 36, .5, t).replace(/filter="url\(#blur9\)"/, '');
  return s;
}
function nightLabs(t, n) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="#0c1430"/><rect x="-20" y="600" width="760" height="600" fill="#1e2a52" opacity=".6" filter="url(#blur16)"/>`;
  const r = RS(41); for (let i = 0; i < 80; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(380 + r() * 300).toFixed(1)}" r="${(.6 + r()).toFixed(1)}" fill="#fff" opacity="${(.3 + .5 * r()).toFixed(2)}"/>`;
  s += farCity(77, 960, '#1a2446');
  const TW = [[-10, 120, 560, '#2a3450'], [118, 110, 700, '#323c58'], [236, 130, 480, '#28324c'], [374, 120, 640, '#30384e'], [502, 110, 520, '#2a3248'], [618, 120, 600, '#343e58']];
  TW.forEach(([x, w, h, c], ti) => { const top = 1180 - h; s += `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + w - 14}" y="${top}" width="14" height="${h}" fill="#000" opacity=".25"/><rect x="${x}" y="${top}" width="${w}" height="6" fill="#5a6480"/>`;
    const q = RS(ti * 17 + 3), cols = 4, rows = Math.floor((h - 40) / 38);
    for (let rr = 0; rr < rows; rr++) for (let cc = 0; cc < cols; cc++) { const wx = x + 10 + cc * (w - 20) / cols, wy = top + 24 + rr * 38, ww = (w - 20) / cols - 8, z = q(), on = clamp((n * 1.5 - (wx / 720) * .5 - z * .4) * 3), base = z < .3;
      s += `<rect x="${wx.toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="24" fill="#1a2238"/>`;
      if (base) s += `<rect x="${wx.toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="24" fill="#ffe3b0" opacity=".55"/>`;
      if (on > 0) { s += `<rect x="${wx.toFixed(1)}" y="${wy}" width="${ww.toFixed(1)}" height="24" fill="#ffd27e" opacity="${on.toFixed(2)}"/>`; if (z > .55) s += `<path d="M${(wx + ww * .3).toFixed(1)},${wy + 24} v-8 q${(ww * .2).toFixed(1)},-6 ${(ww * .4).toFixed(1)},0 v8Z" fill="#5a3a22" opacity="${(.7 * on).toFixed(2)}"/><circle cx="${(wx + ww * .5).toFixed(1)}" cy="${wy + 10}" r="4" fill="#5a3a22" opacity="${(.7 * on).toFixed(2)}"/>`; } } });
  s += scr(`<rect x="-20" y="380" width="760" height="800" fill="#f4c76b" opacity="${(.12 * n).toFixed(2)}" filter="url(#blur16)"/>`);
  s += `<rect x="-20" y="1180" width="760" height="140" fill="#14182a"/><rect x="-20" y="1180" width="760" height="6" fill="#ffd27e" opacity="${(.3 * n).toFixed(2)}"/>`;
  return s;
}
function sceneLabs(t) {
  const t0 = S0(5) - .2, T = t - t0, k = ease(ramp(t, WS(5, 7) - .4, WS(5, 7) + .3)), n = ease(ramp(t, WS(5, 8), WS(5, 11) + .2));
  let s = `<defs>${IQDEF}${W2D()}</defs>`;
  if (k < 1) s += `<g opacity="${(1 - k).toFixed(2)}">${labRoom(t, T)}</g>`;
  if (k > 0) s += `<g opacity="${k.toFixed(2)}">${nightLabs(t, n)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: cures in years, clean energy, space: wind turbines, a solar farm, a rocket rising; a culture dish in an inset ----------
function turbine(x, base, h, t, ph) {
  const hub = [x, base - h], L = h * .46, rot = t * 70 + ph;
  let g = `<path d="M${x - h * .028},${base} L${x - h * .012},${base - h} L${x + h * .012},${base - h} L${x + h * .028},${base}Z" fill="#eef0f2"/><path d="M${x + h * .006},${base} L${x + h * .002},${base - h} L${x + h * .012},${base - h} L${x + h * .028},${base}Z" fill="#000" opacity=".15"/>`;
  g += `<rect x="${x - h * .05}" y="${base - h - h * .025}" width="${h * .1}" height="${h * .05}" rx="${h * .02}" fill="#e2e6ea"/>`;
  for (let i = 0; i < 3; i++) { const a = (rot + i * 120) * Math.PI / 180, bx = hub[0] + Math.cos(a) * L, by = hub[1] + Math.sin(a) * L, nx = -Math.sin(a) * h * .022, ny = Math.cos(a) * h * .022;
    g += `<path d="M${hub[0].toFixed(1)},${hub[1].toFixed(1)} L${(hub[0] + Math.cos(a) * L * .2 + nx).toFixed(1)},${(hub[1] + Math.sin(a) * L * .2 + ny).toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)} L${(hub[0] + Math.cos(a) * L * .2 - nx * .3).toFixed(1)},${(hub[1] + Math.sin(a) * L * .2 - ny * .3).toFixed(1)}Z" fill="#f4f6f8" stroke="#b8c0c8" stroke-width="1"/>`; }
  return g + `<circle cx="${hub[0]}" cy="${hub[1]}" r="${h * .018}" fill="#c8ced4"/><circle cx="${hub[0] - h * .006}" cy="${hub[1] - h * .006}" r="${h * .006}" fill="#fff"/>`;
}
function solarRows(y0, y1, n) { let s = '';
  for (let i = 0; i < n; i++) { const z = i / (n - 1), y = lerp(y0, y1, z * z), k = .35 + .65 * z * z, h = 34 * k, pw = 90 * k, gap = 8 * k, off = (i % 2) * pw * .5;
    s += `<rect x="-20" y="${(y + h * .9).toFixed(1)}" width="760" height="${(h * .5).toFixed(1)}" fill="#3a4a2a" opacity=".45" filter="url(#blur2)"/>`;
    for (let x = -60 + off; x < 760; x += pw + gap) { const x0 = x, x1 = x + pw, sk = 10 * k;
      s += `<path d="M${(x0 + pw * .2).toFixed(1)},${(y + h * .7).toFixed(1)} v${(h * .5).toFixed(1)} M${(x1 - pw * .2).toFixed(1)},${(y + h * .7).toFixed(1)} v${(h * .5).toFixed(1)}" stroke="#7a7e86" stroke-width="${(2.4 * k).toFixed(1)}"/>` +
        `<path d="M${x0.toFixed(1)},${(y + h).toFixed(1)} L${(x0 + sk).toFixed(1)},${y.toFixed(1)} L${(x1 + sk).toFixed(1)},${y.toFixed(1)} L${x1.toFixed(1)},${(y + h).toFixed(1)}Z" fill="#1c2c4c" stroke="#c8ccd4" stroke-width="${(1.6 * k).toFixed(1)}"/>` +
        `<path d="M${x0.toFixed(1)},${(y + h).toFixed(1)} L${(x0 + sk).toFixed(1)},${y.toFixed(1)} L${(x0 + sk + pw * .45).toFixed(1)},${y.toFixed(1)} L${(x0 + pw * .25).toFixed(1)},${(y + h).toFixed(1)}Z" fill="#8ab4e0" opacity=".28"/>`;
      for (let q = 1; q < 6; q++) s += `<path d="M${(x0 + q * pw / 6).toFixed(1)},${(y + h).toFixed(1)} l${sk.toFixed(1)},${(-h).toFixed(1)}" stroke="#5a7aa8" stroke-width=".8" opacity=".6"/>`;
      s += `<path d="M${(x0 + sk / 2).toFixed(1)},${(y + h / 2).toFixed(1)} H${(x1 + sk / 2).toFixed(1)}" stroke="#5a7aa8" stroke-width=".8" opacity=".6"/>`; } }
  return s; }
function sceneFuture(t) {
  const t0 = S0(6) - .2, T = t - t0, ins = ease(ramp(t, S0(6), S0(6) + .4)) * (1 - ease(ramp(t, WS(6, 8) - .4, WS(6, 8)))), lr = WS(6, 8) + .3, u = clamp((t - lr) / 3.6);
  let s = `<defs>${IQDEF2}${W2D()}${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)"/>` + sun3(150, 470, 1) + cumulus(420 + T * 3, 470, 240, 41, { a: .8 }) + cumulus(640 + T * 2, 560, 170, 43, { a: .6 });
  s += mountainsR(800, 90, 51, { snowAt: 0 }) + `<rect x="-20" y="790" width="760" height="520" fill="#7a9a4a"/>` + meadow(800, 1300, t);
  s += turbine(520, 860, 200, t, 10) + turbine(300, 880, 250, t, 50) + turbine(640, 900, 280, t, 80);
  // the rocket on the far right
  if (u > 0) { const ry = 800 - 560 * u * u, rx = 560 + 30 * u * u; let sm = '';
    for (let i = 0; i < 26; i++) { const v = i / 25, yy = lerp(800, ry + 60, v), w = 22 + 60 * (1 - v) * u + 10 * Math.sin(i * 1.7); sm += `<ellipse cx="${(lerp(560, rx, v) + Math.sin(i * 2.3) * 8).toFixed(1)}" cy="${yy.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .7).toFixed(1)}" fill="${i % 2 ? '#e8e4dc' : '#f8f6f0'}" opacity=".7"/>`; }
    s += `<g filter="url(#smB)">${sm}</g><g transform="translate(${rx.toFixed(1)},${ry.toFixed(1)}) scale(1.5)"><path d="M-7,0 L-7,-56 Q0,-76 7,-56 L7,0Z" fill="#f4f4f2"/><path d="M2,0 L2,-60 Q6,-66 7,-56 L7,0Z" fill="#000" opacity=".15"/><path d="M-7,0 l-6,10 h26 l-6,-10Z" fill="#3a3e48"/>` +
      scr(`<ellipse cx="0" cy="22" rx="${(10 + 3 * Math.sin(t * 30)).toFixed(1)}" ry="22" fill="#ffd27a"/><ellipse cx="0" cy="16" rx="5" ry="12" fill="#fff"/><circle cx="0" cy="30" r="44" fill="url(#iqG)"/>`) + `</g>`; }
  s += solarRows(930, 1150, 7) + `<rect x="-20" y="1150" width="760" height="170" fill="#6a8a3e"/>` + meadow(1150, 1300, t);
  // the culture dish (cures)
  if (ins > 0) s += `<g opacity="${ins.toFixed(2)}"><circle cx="250" cy="600" r="150" fill="#0a0e1c" opacity=".85"/>${petri(250, 600, 118, ease(ramp(t, S0(6), WS(6, 7))), t)}<circle cx="250" cy="600" r="150" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: who drives the buses and grows the wheat? Machines: a driverless tractor, a spraying drone, a farmer with a tablet ----------
function drone(x, y, s, t) {
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><path d="M-70,-4 L70,-4" stroke="#2a2e36" stroke-width="7"/><path d="M-50,8 L50,8" stroke="#3a3e48" stroke-width="5"/>`;
  [-70, 70].forEach(dx => g += `<rect x="${dx - 3}" y="-14" width="6" height="12" fill="#2a2e36"/><ellipse cx="${dx}" cy="-16" rx="40" ry="5" fill="#c8ccd4" opacity="${(.35 + .1 * Math.sin(t * 60 + dx)).toFixed(2)}"/><path d="M${dx - 38},-16 h76" stroke="#5a5e68" stroke-width="1.6" opacity=".5"/>`);
  g += `<rect x="-34" y="-14" width="68" height="26" rx="10" fill="#e8eaee"/><rect x="-34" y="2" width="68" height="10" rx="4" fill="#a8b0ba"/><rect x="-14" y="12" width="28" height="18" rx="4" fill="#3a6aa0"/><circle cx="20" cy="-4" r="4" fill="#3ad86a"/>`;
  return g + `<path d="M-40,30 L-90,170 L90,170 L40,30Z" fill="#e8f2f8" opacity=".22" filter="url(#blur9)"/></g>`;
}
function sceneMachines(t) {
  const t0 = S0(7) - .2, T = t - t0, HZ = 800;
  let s = `<defs>${IQDEF2}${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)"/>` + sun3(560, 480, 1) + cumulus(200 + T * 3, 500, 240, 61, { a: .85 }) + cumulus(560 + T * 2, 600, 160, 63, { a: .6 });
  s += mountainsR(HZ, 60, 57, { snowAt: 0 }) + forestR(HZ, 40, 24, 50, 59, '#4a6a3a') + wheatField(t, HZ, .9, 5);
  const tx = 40 + T * 52, ty = 1080, ts = .66;
  s += `<path d="M-20,${ty + 4} L740,${ty + 4}" stroke="#8a6a3a" stroke-width="40" opacity=".5" filter="url(#blur5)"/>` + tractor(tx, ty, ts);
  // the sensor dome on the cab roof (no driver)
  const dx = tx + 18 * ts, dy = ty - 262 * ts;
  s += `<path d="M${dx - 18},${dy} Q${dx},${dy - 26} ${dx + 18},${dy}Z" fill="#2a2e36"/><ellipse cx="${dx + 6 * Math.sin(t * 6)}" cy="${dy - 10}" rx="4" ry="3" fill="#7ad0ff" opacity=".9"/>` + scr(`<circle cx="${dx}" cy="${dy - 10}" r="${(30 + 20 * pmod(t, 1)).toFixed(1)}" fill="none" stroke="#7ad0ff" stroke-width="2" opacity="${(.6 * (1 - pmod(t, 1))).toFixed(2)}"/>`);
  s += `<ellipse cx="${(tx - 120).toFixed(1)}" cy="${ty - 30}" rx="90" ry="40" fill="#e8d8a8" opacity=".35" filter="url(#blur9)"/>`;
  s += drone(760 - T * 64, 640 + 10 * Math.sin(T * 2), .9, t);
  // the farmer at the field edge, reading a tablet
  s += `<rect x="-20" y="1190" width="760" height="130" fill="#8a6a44"/><rect x="-20" y="1190" width="760" height="130" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="1186" width="760" height="10" fill="#6a5030" opacity=".6"/>`;
  s += hero(590, 1252, Object.assign({ s: .96, face: -1, shade: 1, hF: [540, 1060], hB: [552, 1076], lookUp: -.35 }, gp(2)));
  const [hx, hy] = HP.hand; s += `<g transform="rotate(-18,${hx},${hy})"><rect x="${hx - 34}" y="${hy - 26}" width="56" height="40" rx="5" fill="#1a1c22"/><rect x="${hx - 30}" y="${hy - 22}" width="48" height="32" rx="3" fill="#3a8a5a"/><path d="M${hx - 26},${hy} q12,-12 24,-2 t18,-8" stroke="#f4c76b" stroke-width="2.4" fill="none"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: longer lives: an old couple walking in a park, an old man reading on a bench ----------
function sceneOld(t) {
  const t0 = S0(8) - .2, T = t - t0, HZ = 840;
  let s = `<defs>${IQDEF2}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#hotSky)"/>` + sun3(600, 470, 1) + cumulus(220 + T * 3, 500, 240, 71, { a: .85 });
  s += farCity(83, HZ - 10, '#9ab0c4') + forestR(HZ, 46, 60, 120, 73, '#4a6a3a') + `<rect x="-20" y="${HZ}" width="760" height="480" fill="#6e9a48"/>` + meadow(HZ, 1300, t);
  s += `<path d="M-20,1080 Q360,1030 740,1070 L740,1160 Q360,1120 -20,1170Z" fill="#d8c8a4"/><path d="M-20,1080 Q360,1030 740,1070 L740,1160 Q360,1120 -20,1170Z" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += treeR(90, 1000, 360, 75, t) + treeR(640, 990, 320, 77, t);
  // the bench and the reader
  const bx = 560, by = 1010;
  s += `<rect x="${bx - 80}" y="${by - 120}" width="160" height="12" rx="3" fill="#7a5232"/><rect x="${bx - 80}" y="${by - 100}" width="160" height="12" rx="3" fill="#7a5232"/><rect x="${bx - 86}" y="${by - 78}" width="172" height="14" rx="3" fill="#8a5e3a"/><path d="M${bx - 70},${by - 64} V${by} M${bx + 70},${by - 64} V${by}" stroke="#2a2a2e" stroke-width="7"/>`;
  s += hero(bx - 10, by, Object.assign({}, SEAT, { s: .8, face: -1, shade: 1, top: '#5a6a7a', pants: '#3a3a40', skin: '#c89a74', hair: '#e8e4dc', hF: [bx - 60, by - 128], hB: [bx - 44, by - 118], lookUp: -.4 }));
  const [ax, ay] = HP.hand; s += `<path d="M${ax - 22},${ay - 14} L${ax + 4},${ay - 4} L${ax + 4},${ay + 22} L${ax - 22},${ay + 10}Z" fill="#f2ece0"/><path d="M${ax + 4},${ay - 4} L${ax + 28},${ay - 14} L${ax + 28},${ay + 10} L${ax + 4},${ay + 22}Z" fill="#e4dccc"/>`;
  // the old couple walking slowly along the path
  const cx = 120 + T * 20;
  s += hero(cx, 1128, { s: .92, face: 1, shade: 1, walk: T * 3.2, amp: .3, lean: 5, top: '#7a6a5a', pants: '#3a3a40', skin: '#c08a66', hair: '#e4e0d8' });
  const [hx, hy] = HP.hand; s += `<path d="M${hx},${hy} L${hx + 14},1128" stroke="#4a3020" stroke-width="5" stroke-linecap="round"/><path d="M${hx - 6},${hy} q6,-8 14,-2" stroke="#4a3020" stroke-width="5" fill="none"/>`;
  s += hero(cx - 70, 1140, { s: .88, face: 1, shade: 1, walk: T * 3.2 + 2, amp: .3, lean: 4, top: '#8a4a5a', pants: '#4a3a40', skin: '#d0a07a', hair: '#dcd8d0' }) + hairL(.88, 1, '#dcd8d0');
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: clever people still argue: two experts at a whiteboard, each with his own chart ----------
function bubble(x, y, w, h, a, inner, tail) { if (a <= 0) return ''; return `<g opacity="${a.toFixed(2)}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="22" fill="#fff"/><path d="M${x + tail[0]},${y + h / 2 - 2} L${x + tail[1]},${y + h / 2 + 40} L${x + tail[0] + 30},${y + h / 2 - 2}Z" fill="#fff"/>${inner}</g>`; }
function sceneArgue(t) {
  const t0 = S0(9) - .2, T = t - t0;
  let s = `<defs>${IQDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#c8c0b0"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  s += `<rect x="40" y="420" width="640" height="420" rx="6" fill="#f6f6f2"/><rect x="40" y="420" width="640" height="420" rx="6" fill="none" stroke="#9aa0a8" stroke-width="10"/><rect x="40" y="420" width="640" height="420" fill="#c8ccd0" filter="url(#smudge)" opacity=".25"/>`;
  [['E = mc²', 130, 500, 30], ['∑ xᵢ / n', 520, 490, 28], ['∫ f(x) dx', 300, 560, 30], ['P(A|B)', 560, 600, 26], ['x² + y² = r²', 180, 650, 26], ['Δt → 0', 470, 700, 26], ['√2 ≈ 1.414', 250, 760, 26], ['p < 0.05', 560, 780, 26]].forEach(([tx, x, y, fs], i) =>
    s += `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" font-family="Inter Display, sans-serif" font-weight="500" font-size="${fs}" fill="${['#1a3a8a', '#a82a2a', '#1a6a3a'][i % 3]}" opacity=".75">${tx}</text>`);
  s += `<rect x="30" y="840" width="660" height="12" fill="#9aa0a8"/><rect x="-20" y="1050" width="760" height="270" fill="#6a5a4a"/><rect x="-20" y="1050" width="760" height="270" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="1050" width="760" height="18" fill="url(#aoDn)" opacity=".6"/>`;
  const a1 = Math.sin(T * 2.6), a2 = Math.sin(T * 2.6 + 2);
  s += hero(170, 1230, Object.assign({ s: 1.04, face: 1, shade: 1, hF: [250 + 30 * a1, 900 - 70 * Math.max(0, a1)], aB: [.2, .9], lookUp: .05 }, gp(0)));
  s += hero(560, 1230, Object.assign({ s: 1.04, face: -1, shade: 1, hF: [480 - 30 * a2, 910 - 60 * Math.max(0, a2)], hB: [600, 1010], lookUp: .05 }, gp(6))) + hairL(1.04, -1, '#241a12');
  const sw = Math.floor(T / 1.1) % 2, pop = 1 - Math.abs(pmod(T, 1.1) / 1.1 - .5) * .2;
  const up = `<path d="M-60,30 L-20,6 L10,14 L60,-30" stroke="#2a8a4a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M60,-30 l-16,2 l10,12Z" fill="#2a8a4a"/>`, dn = `<path d="M-60,-30 L-20,-4 L10,-12 L60,30" stroke="#c8302a" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M60,30 l-16,-2 l10,-12Z" fill="#c8302a"/>`;
  s += bubble(200, 700, 170, 110, sw === 0 ? 1 : .35, `<g transform="translate(200,700)">${up}</g>`, [-30, -50]);
  s += bubble(520, 700, 170, 110, sw === 1 ? 1 : .35, `<g transform="translate(520,700)">${dn}</g>`, [10, 40]);
  noEarth(); F.ov = ''; return s;
}
