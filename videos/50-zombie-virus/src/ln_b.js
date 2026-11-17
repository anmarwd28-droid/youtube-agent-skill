// 4: about 400 reactors shut themselves down, but the used fuel still needs cooling
function coolTower(cx, base, H, bw, id) {
  const u0 = .72, wt = .3 * bw, c2 = (bw * bw / 4 - wt * wt) / (u0 * u0), w = u => Math.sqrt(wt * wt + c2 * (u - u0) * (u - u0)), L = [], Rr = [];
  for (let i = 0; i <= 24; i++) { const u = i / 24, y = base - H * u; L.push([cx - w(u), y]); Rr.push([cx + w(u), y]); }
  const d = `M${L.map(PT).join(' L')} L${Rr.slice().reverse().map(PT).join(' L')}Z`, wt1 = w(1), top = base - H, r = RS(id * 7 + 3);
  let s = `<defs><clipPath id="ctw${id}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="url(#twrG)"/><g clip-path="url(#ctw${id})">`;
  for (let i = 0; i < 16; i++) { const x = cx - bw / 2 + r() * bw; s += `<path d="M${x.toFixed(1)},${top} q${(r() * 10 - 5).toFixed(1)},${(H * .3).toFixed(1)} ${((x - cx) * .25).toFixed(1)},${(H * (.4 + .5 * r())).toFixed(1)}" stroke="#3a3436" stroke-width="${(2 + r() * 7).toFixed(1)}" fill="none" opacity="${(.08 + .1 * r()).toFixed(2)}"/>`; }
  for (let i = 1; i < 9; i++) { const u = i / 9, y = base - H * u, ww = w(u); s += `<path d="M${(cx - ww).toFixed(1)},${y.toFixed(1)} Q${cx},${(y + ww * .16).toFixed(1)} ${(cx + ww).toFixed(1)},${y.toFixed(1)}" stroke="#2a2428" stroke-width="1.4" fill="none" opacity=".2"/>`; }
  s += `<rect x="${cx - bw}" y="${top - 10}" width="${bw * 2}" height="${H + 20}" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="${cx - bw}" y="${base - H * .07}" width="${bw * 2}" height="${H * .08}" fill="#1c1a20" opacity=".85"/>`;
  for (let i = 0; i < 14; i++) { const x = cx - bw / 2 + i * bw / 13; s += `<path d="M${x.toFixed(1)},${base} l${(bw / 26).toFixed(1)},${(-H * .07).toFixed(1)} l${(bw / 26).toFixed(1)},${(H * .07).toFixed(1)}" stroke="#b8a898" stroke-width="2.4" fill="none" opacity=".8"/>`; }
  s += `</g><ellipse cx="${cx}" cy="${top}" rx="${wt1.toFixed(1)}" ry="${(wt1 * .15).toFixed(1)}" fill="#2a2630"/><ellipse cx="${cx}" cy="${top}" rx="${wt1.toFixed(1)}" ry="${(wt1 * .15).toFixed(1)}" fill="none" stroke="#f0dcc0" stroke-width="2.5" opacity=".8"/>`;
  return { s, top, wt1 };
}
function plume(cx, top, a, t, seed, big = 1) {
  if (a <= .01) return ''; let s = '';
  for (let i = 0; i < 13; i++) { const p = pmod(i / 13 + t * .045 + seed * .13, 1), x = cx + 110 * p * p * big + 12 * Math.sin(t * .7 + i * 2.1), y = top - 6 - p * 330 * big, r = (30 + 96 * p) * big;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${mix('#fff4ea', '#e8a898', p * .7)}" opacity="${(Math.min(1, p * 6) * (1 - p) * 1.25).toFixed(2)}"/>`; }
  return `<g opacity="${a.toFixed(2)}" filter="url(#steamF)">${s}</g>`;
}
function radSym(x, y, R, a) {
  if (a <= 0) return ''; let bl = '';
  for (let i = 0; i < 3; i++) { const a0 = (-120 + i * 120) * Math.PI / 180, a1 = a0 + Math.PI / 3, P = (r, an) => `${(Math.cos(an) * r).toFixed(1)},${(Math.sin(an) * r).toFixed(1)}`;
    bl += `<path d="M${P(R * .28, a0)} L${P(R * .82, a0)} A${R * .82},${R * .82} 0 0 1 ${P(R * .82, a1)} L${P(R * .28, a1)} A${R * .28},${R * .28} 0 0 0 ${P(R * .28, a0)}Z" fill="#14100c"/>`; }
  return `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y})"><circle r="${R * 1.5}" fill="#ffd23a" opacity=".25" filter="url(#blur9)"/><circle r="${R}" fill="#f6c81e"/><circle r="${R}" fill="none" stroke="#14100c" stroke-width="${R * .07}"/><circle r="${R * .16}" fill="#14100c"/>${bl}</g>`;
}
function poolInset(a, kd, dg, t) {
  if (a <= 0) return ''; const X0 = 60, Y0 = 876, Wd = 600, Hh = 326, px0 = X0 + 76, px1 = X0 + Wd - 76, fl = Y0 + Hh - 34, rk = 96, yw = lerp(Y0 + 92, fl - rk + 34, kd), boil = clamp(.12 + kd * 1.4), r = RS(41);
  let s = `<g opacity="${a.toFixed(2)}">` + panel(X0, Y0, Wd, Hh, 1) + `<defs><clipPath id="piC"><rect x="${X0 + 8}" y="${Y0 + 8}" width="${Wd - 16}" height="${Hh - 16}" rx="12"/></clipPath><clipPath id="piW"><rect x="${px0}" y="${yw.toFixed(1)}" width="${px1 - px0}" height="${(fl - yw).toFixed(1)}"/></clipPath></defs><g clip-path="url(#piC)">`;
  s += `<rect x="${X0}" y="${Y0}" width="${Wd}" height="${Hh}" fill="#2a3040"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="${Hh}" fill="#8a8c90"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="${Hh}" fill="#000" filter="url(#grainR)" opacity=".4"/><rect x="${X0}" y="${Y0 + 60}" width="${Wd}" height="8" fill="#c2c4c8"/>`;
  s += `<rect x="${px0}" y="${Y0 + 60}" width="${px1 - px0}" height="${fl - Y0 - 60}" fill="#161c2c"/>`;
  // steam over the pool once the water boils
  for (let i = 0; i < 9; i++) { const p = pmod(i / 9 + t * .22, 1), x = px0 + 30 + ((i * 97) % (px1 - px0 - 60)) + 14 * Math.sin(t + i); s += `<ellipse cx="${x.toFixed(1)}" cy="${(yw - 8 - p * 90).toFixed(1)}" rx="${(22 + 30 * p).toFixed(1)}" ry="${(12 + 16 * p).toFixed(1)}" fill="#fff" opacity="${(.5 * boil * (1 - p)).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += `<rect x="${px0}" y="${yw.toFixed(1)}" width="${px1 - px0}" height="${(fl - yw).toFixed(1)}" fill="url(#poolG)"/><ellipse cx="${(px0 + px1) / 2}" cy="${fl - rk * .6}" rx="${(px1 - px0) * .46}" ry="${rk * .9}" fill="#6ae0ff" opacity="${(.5 * (1 - .5 * dg)).toFixed(2)}" filter="url(#blur9)" clip-path="url(#piW)"/>`;
  // the racks of used fuel: blue glow under water, red-hot where the water is gone
  for (let i = 0; i < 8; i++) { const x = px0 + 18 + i * 52, top = fl - rk + (i % 2) * 6, hot = clamp((yw - top) / 30) * dg;
    s += `<rect x="${x}" y="${top}" width="42" height="${fl - top}" fill="${mix('#5a6c80', '#d8482a', hot)}"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${x + 5 + q * 6.4},${top + 4} V${fl - 2}" stroke="${mix('#b6d8ee', '#ffc27a', hot)}" stroke-width="2.2" opacity=".85"/>`).join('') + `<rect x="${x - 2}" y="${top - 5}" width="46" height="8" rx="2" fill="${mix('#8a9cb0', '#ff8a4a', hot)}"/><rect x="${x}" y="${top}" width="42" height="${fl - top}" fill="url(#canSh)" opacity=".6"/>` +
      (hot > .05 ? `<ellipse cx="${x + 21}" cy="${top + 6}" rx="34" ry="22" fill="#ff6a2a" opacity="${(.6 * hot).toFixed(2)}" filter="url(#blur5)"/>` : ''); }
  // bubbles
  for (let i = 0; i < 26; i++) { const sp = .35 + r() * .5, p = pmod(r() + t * sp, 1), x = px0 + 14 + r() * (px1 - px0 - 28) + 5 * Math.sin(t * 3 + i), y = lerp(fl - rk * .5, yw + 4, p), rr = 2.5 + r() * 5; if (i / 26 > boil || y < yw) continue;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="#fff" opacity=".2"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="none" stroke="#e8f8ff" stroke-width="1.4" opacity=".85"/>`; }
  let wv = `M${px0},${yw.toFixed(1)}`; for (let x = px0; x <= px1; x += 12) wv += ` L${x},${(yw + (2 + 3 * boil) * Math.sin(x * .09 + t * 4)).toFixed(1)}`;
  s += `<path d="${wv}" stroke="#eaf8ff" stroke-width="3" fill="none" opacity=".9"/>`;
  // the pool walls and floor
  s += `<rect x="${px0 - 16}" y="${Y0 + 60}" width="16" height="${fl - Y0 - 44}" fill="#6e7076"/><rect x="${px1}" y="${Y0 + 60}" width="16" height="${fl - Y0 - 44}" fill="#6e7076"/><rect x="${px0 - 16}" y="${fl}" width="${px1 - px0 + 32}" height="16" fill="#6e7076"/>`;
  s += `<rect x="${X0}" y="${Y0}" width="${Wd}" height="${Hh}" fill="#ff2a1a" opacity="${(.12 * dg * (.6 + .4 * Math.sin(t * 7))).toFixed(2)}"/></g>`;
  // the old water level
  s += `<path d="M${px0 - 30},${Y0 + 92} H${px1 + 30}" stroke="#a8d8ff" stroke-width="2.5" stroke-dasharray="10 8" opacity="${(.9 * clamp(kd * 4)).toFixed(2)}"/>`;
  s += lbl(X0 + Wd / 2, Y0 + 42, 'حوضُ تبريدِ الوقودِ المستعمَل', 1, '#fff', 27) + radSym(X0 + Wd - 44, Y0 + 104, 30, dg * (.8 + .2 * Math.sin(t * 7)));
  return s + `</g>`;
}
function sceneNuke(t) {
  const T = t - S0(4) + .2, hz = 838, shut = ease(ramp(t, WS(4, 4) - .1, WS(4, 6) + .5)), tl = WS(4, 11) - .1, lt = t < tl ? 1 : t < tl + .5 ? (Math.sin((t - tl) * 50) > 0 ? .9 : .2) * (1 - (t - tl) * 2) : 0;
  let s = `<defs>${LDEFS()}<linearGradient id="rvN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a878"/><stop offset=".3" stop-color="#8a6a8a"/><stop offset="1" stop-color="#1c2646"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#duskS)"/>`;
  { const r = RS(15); for (let i = 0; i < 60; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 520).toFixed(1)}" r="${(.6 + r() * 1.1).toFixed(1)}" fill="#fff" opacity="${(.2 + .5 * r()).toFixed(2)}"/>`; }
  s += `<circle cx="640" cy="${hz - 16}" r="230" fill="url(#sunW)" opacity=".9"/><circle cx="640" cy="${hz - 16}" r="30" fill="#fff0d0" filter="url(#blur5)"/>`;
  s += cumulus(120 + T * 4, 560, 230, 71, { a: .5 }) + cumulus(560 + T * 3, 610, 180, 72, { a: .4 });
  s += mountainsR(hz - 6, 84, 521, { rock: '#56506e', haze: .55, hazeCol: '#d89a80' }) + `<rect x="-20" y="${hz - 16}" width="760" height="30" fill="#6a5a6c"/>`;
  s += `<rect x="-20" y="${hz}" width="760" height="${1020 - hz}" fill="#3a4636"/><rect x="-20" y="${hz}" width="760" height="${1020 - hz}" fill="#000" filter="url(#grainR)" opacity=".4"/>` + meadow(hz + 4, 1022, t, { c0: '#4a5a3c', c1: '#28362a' }) + `<rect x="-20" y="${hz - 6}" width="760" height="40" fill="#f2b078" opacity=".28" filter="url(#blur9)"/>`;
  // the plant: two cooling towers, the reactor dome, the turbine hall, the stack, a pylon
  const base = 866, T2 = coolTower(318, base - 6, 290, 196, 2), T1 = coolTower(150, base, 350, 240, 1);
  let plant = plume(318, T2.top, 1 - shut, t, 2, .85) + T2.s + plume(150, T1.top, 1 - shut, t, 1) + T1.s;
  // pylon and wires
  const pyl = (x, b, h) => { let p = `<path d="M${x - h * .16},${b} L${x - h * .04},${b - h} L${x + h * .04},${b - h} L${x + h * .16},${b}" stroke="#2a2630" stroke-width="3" fill="none"/>`; for (let i = 0; i < 6; i++) { const u0 = i / 6, u1 = (i + 1) / 6, w0 = h * (.16 - .12 * u0), w1 = h * (.16 - .12 * u1); p += `<path d="M${x - w0},${b - h * u0} L${x + w1},${b - h * u1} M${x + w0},${b - h * u0} L${x - w1},${b - h * u1}" stroke="#2a2630" stroke-width="1.6"/>`; }
    [.74, .88, 1].forEach(u => { p += `<path d="M${x - h * .2},${b - h * u} H${x + h * .2}" stroke="#2a2630" stroke-width="3"/>`; }); return p; };
  plant += pyl(676, base, 230) + `<path d="M${676 - 46},${base - 230} Q600,${base - 150} 560,${base - 96} M${676 - 46},${base - 202} Q600,${base - 130} 566,${base - 90} M${676 + 46},${base - 230} Q720,${base - 200} 760,${base - 190}" stroke="#1e1a24" stroke-width="1.8" fill="none"/>`;
  // the reactor containment: a cylinder with a dome
  const rx = 470;
  plant += `<path d="M${rx - 56},${base} V${base - 120} A56,50 0 0 1 ${rx + 56},${base - 120} V${base}Z" fill="url(#twrG)"/><path d="M${rx - 56},${base} V${base - 120} A56,50 0 0 1 ${rx + 56},${base - 120} V${base}Z" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    Array.from({ length: 4 }, (_, i) => `<path d="M${rx - 56},${base - 24 - i * 30} Q${rx},${base - 16 - i * 30} ${rx + 56},${base - 24 - i * 30}" stroke="#2a2428" stroke-width="1.6" fill="none" opacity=".3"/>`).join('') + `<rect x="${rx - 10}" y="${base - 186}" width="20" height="20" fill="#8a8690"/>`;
  // the turbine hall and the stack
  plant += `<rect x="532" y="${base - 92}" width="130" height="92" fill="#8e8a96"/><rect x="532" y="${base - 92}" width="130" height="92" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="528" y="${base - 100}" width="138" height="10" fill="#b8b2b8"/><rect x="632" y="${base - 92}" width="30" height="92" fill="#000" opacity=".25"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${542 + i * 19}" y="${base - 74}" width="12" height="22" fill="${mix('#2a3040', '#ffd88a', lt)}"/>`).join('') + Array.from({ length: 6 }, (_, i) => `<rect x="${542 + i * 19}" y="${base - 40}" width="12" height="16" fill="${mix('#2a3040', '#ffcf7a', lt * (i % 2 ? 1 : .4))}"/>`).join('');
  plant += `<path d="M584,${base - 100} L588,${base - 300} L596,${base - 300} L600,${base - 100}Z" fill="#c8c0bc"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${586 + i * .3}" y="${base - 290 + i * 46}" width="${12 - i * .5}" height="20" fill="#c8483a"/>`).join('') + `<path d="M584,${base - 100} L588,${base - 300} L591,${base - 300} L590,${base - 100}Z" fill="#000" opacity=".25"/>`;
  plant += `<rect x="388" y="${base - 46}" width="60" height="46" fill="#7a7684"/><rect x="384" y="${base - 52}" width="68" height="8" fill="#a8a2a8"/>` + Array.from({ length: 3 }, (_, i) => `<rect x="${396 + i * 17}" y="${base - 34}" width="10" height="14" fill="${mix('#2a3040', '#ffd88a', lt)}"/>`).join('');
  s += plant + forestR(base + 2, 18, 22, 50, 17, '#243428', { haze: .1, hazeCol: '#6a5a6c' });
  // fence
  s += `<path d="M-20,${base + 16} H740 M-20,${base + 30} H740" stroke="#1c1e22" stroke-width="1.6" opacity=".7"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M${i * 26},${base + 8} v30" stroke="#1c1e22" stroke-width="2.4" opacity=".8"/>`).join('');
  // lights of the plant: red beacons, floodlights
  const bl = .5 + .5 * Math.sin(t * 4);
  s += scr([[150 - T1.wt1, T1.top], [150 + T1.wt1, T1.top], [318 + T2.wt1, T2.top], [592, base - 302], [676, base - 232]].map(([x, y]) => `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="14" fill="#ff3a2a" opacity="${(.7 * bl * lt).toFixed(2)}" filter="url(#blur5)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#ffb0a0" opacity="${(bl * lt).toFixed(2)}"/>`).join('') +
    [[60, base - 60], [250, base - 66], [420, base - 70], [520, base - 110], [640, base - 60]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="30" fill="#ffe2a0" opacity="${(.5 * lt).toFixed(2)}" filter="url(#blur9)"/><circle cx="${x}" cy="${y}" r="4" fill="#fff6d8" opacity="${lt.toFixed(2)}"/>`).join(''));
  // the river in front
  s += `<rect x="-20" y="1020" width="760" height="280" fill="url(#rvN)"/><rect x="-20" y="1014" width="760" height="10" fill="#2a3226"/>`;
  s += `<defs><clipPath id="rvClip"><rect x="-20" y="1024" width="760" height="280"/></clipPath></defs><g clip-path="url(#rvClip)"><g opacity=".3" filter="url(#blur2)" transform="translate(0,1890) scale(1,-1)">${T2.s}${T1.s}</g></g>`;
  for (let i = 0; i < 22; i++) { const r = RS(i + 90), y = 1030 + Math.pow(r(), 1.4) * 250, x = r() * 720 + 10 * Math.sin(t * 1.2 + i), w = 30 + (y - 1020) * .4; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},-3 ${w.toFixed(1)},0" stroke="#ffd8b0" stroke-width="${(1 + (y - 1020) * .008).toFixed(1)}" fill="none" opacity=".4"/>`; }
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a1838" opacity="${(.3 * (1 - lt) * ease(ramp(t, tl, tl + 1))).toFixed(2)}"/>`;
  s += poolInset(ease(ramp(t, WS(4, 7) - .25, WS(4, 7) + .35)), ease(ramp(t, WS(4, 11), WS(4, 14) + .3)), ease(ramp(t, WS(4, 14), WS(4, 15) + .3)), t);
  noEarth(); F.ov = ''; return s;
}

// 5: years later: plants split the streets and the animals come back to the cities
const ivyM = (id, seed, col, k4, fx = .034, fy = .03, k3 = 6) => `<filter id="${id}" filterUnits="userSpaceOnUse" x="-20" y="380" width="760" height="920" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="5" seed="${seed}" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1 0 0 0 0" result="na"/><feComposite in="na" in2="SourceGraphic" operator="arithmetic" k1="0" k2="11" k3="${k3}" k4="${k4}" result="m"/><feFlood flood-color="${col}"/><feComposite in2="m" operator="in"/></filter>`;
function tuft(x, y, h, seed) { const r = RS(seed); let s = ''; const n = 5 + Math.floor(r() * 4);
  for (let i = 0; i < n; i++) { const dx = (r() - .5) * h * .9, tip = dx * 1.6 + (r() - .5) * h * .5, hh = h * (.55 + .5 * r()); s += `<path d="M${(x + dx * .4).toFixed(1)},${y.toFixed(1)} Q${(x + dx).toFixed(1)},${(y - hh * .6).toFixed(1)} ${(x + tip).toFixed(1)},${(y - hh).toFixed(1)}" stroke="${['#4a7a2e', '#6a9a3a', '#3a6a28', '#86a84a'][Math.floor(r() * 4)]}" stroke-width="${(1.4 + h * .035).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  return s; }
function deer(x, y, sc, f, ph, o = {}) {
  let s = quad(x, y, sc, { kind: 'horse', face: f, moving: o.still ? 0 : 1, phase: ph, col: o.col || '#a8743e', graze: o.graze });
  s = s.replace(/<path [^>]*stroke-width="18\.[12]\d*"[^>]*\/>/, `<path d="M-75,-142 q-12,4 -10,22" stroke="#f4ecdc" stroke-width="9" fill="none" stroke-linecap="round"/>`).replace(/<path [^>]*stroke-width="9\.[56]\d*"[^>]*\/>/, '').split('stroke-width="13"').join('stroke-width="8"');
  let ex = `<ellipse cx="-68" cy="-124" rx="12" ry="18" fill="#f4ecdc" opacity=".8"/>`;
  if (o.spots) for (let i = 0; i < 9; i++) ex += `<circle cx="${-46 + (i % 5) * 20}" cy="${-150 + Math.floor(i / 5) * 16 + (i % 2) * 5}" r="3.2" fill="#f4ecdc" opacity=".8"/>`;
  if (o.antlers) [0, 9].forEach(dx => { ex += `<path d="M${101 + dx},-208 q-16,-30 -2,-66 M${96 + dx},-226 l-20,-12 M${94 + dx},-248 l-18,-14 M${98 + dx},-266 l14,-14" stroke="${dx ? '#b8a888' : '#e2d4b4'}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`; });
  return s.replace(/<\/g>$/, ex + '</g>');
}
function sceneNature(t) {
  const T = t - S0(5) + .2, k = ease(ramp(t, S0(5) - .1, WS(5, 4) + .4)), an = ramp(t, WS(5, 5) - .7, S0(6) + .6);
  let def = ivyM('ivA', 3, '#2c5424', -9.15) + ivyM('ivB', 11, '#5c8c3c', -10.05, .05, .045) + ivyM('ivC', 23, '#4a6a30', -11.3, .016, .05, 5) + ivyM('ivD', 31, '#6a8a3c', -11.9, .03, .08, 5), src = '';
  BLK9.forEach(([x, w, h], i) => { const hh = (h + 30) * clamp(k * (.8 + .3 * ((i * 7) % 5) / 4)), gid = 'ivG' + i;
    def += `<linearGradient id="${gid}" gradientUnits="userSpaceOnUse" x1="0" y1="${PV}" x2="0" y2="${(PV - hh).toFixed(1)}"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff" stop-opacity=".62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>`;
    src += `<rect x="${x - 4}" y="${(PV - hh).toFixed(1)}" width="${w + 22}" height="${hh.toFixed(1)}" fill="url(#${gid})"/>`; });
  const wall = k > .01 ? `<rect x="-20" y="${PV - 126}" width="760" height="126" fill="#6e6c58" opacity="${(.4 * k).toFixed(2)}"/><rect x="-20" y="420" width="760" height="${PV - 420}" fill="#5a5a3a" opacity="${(.14 * k).toFixed(2)}"/><g filter="url(#ivA)">${src}</g><g filter="url(#ivB)" transform="translate(-3,-4)">${src}</g>` : '';
  // the road and the pavement: cracks, moss, grass, young trees
  let gr = cracks(KB + 14, 1300, k, 31, -20, 740, '#1c1c20') + cracks(PV + 4, KB, k * .8, 32, -20, 740, '#6a5e4a');
  if (k > .01) gr += `<g filter="url(#ivC)"><rect x="-20" y="${PV + 6}" width="760" height="${1300 - PV}" fill="#fff" opacity="${k.toFixed(2)}"/></g><g filter="url(#ivD)"><rect x="-20" y="${KB - 6}" width="760" height="${1300 - KB + 6}" fill="#fff" opacity="${(.92 * k).toFixed(2)}"/></g>`;
  const r = RS(57); let tf = [];
  for (let i = 0; i < 46; i++) { const band = i % 3, y = band === 0 ? KB + 10 + r() * 8 : band === 1 ? PV + 2 + r() * 6 : KB + 30 + r() * (1290 - KB - 30), x = r() * 720, g = clamp(k * 1.5 - r() * .5); if (g > 0) tf.push([y, tuft(x, y, (band === 2 ? 20 + (y - KB) * .2 : 22) * g, i + 300)]); }
  tf.sort((a, b) => a[0] - b[0]); gr += tf.map(q => q[1]).join('');
  gr += car(470, 1170, .95, '#7e6250', -1, 0) + [[400, 1118, 30, 14], [470, 1104, 44, 10], [540, 1126, 26, 12], [436, 1140, 22, 9]].map(([x, y, a, b]) => `<ellipse cx="${x}" cy="${y}" rx="${a}" ry="${b}" fill="#8a4a22" opacity="${(.5 * k).toFixed(2)}" filter="url(#blur2)"/>`).join('') + (k > .2 ? tuft(392, 1172, 34 * k, 401) + tuft(548, 1172, 30 * k, 402) + tuft(470, 1174, 26 * k, 403) : '');
  if (k > .08) gr += treeR(44, 1236, 170 * k, 341, t) + treeR(676, 1150, 120 * k, 342, t);
  // the animals
  let fg = '';
  if (an > 0) { const dx = lerp(860, 236, ease(Math.min(1, an * 1.15))), wk = an < .87;
    fg += deer(dx + 214, 1196, .5, -1, t * 6, { col: '#b08250', still: !wk, graze: !wk }) + deer(dx + 110, 1212, .34, -1, t * 8 + 1, { col: '#b88a58', spots: 1, still: !wk }) + deer(dx, 1218, .62, -1, t * 6 + 2, { antlers: 1, still: !wk });
    const fx = lerp(-80, 210, an); fg += quad(fx, PV + 84, .62, { kind: 'fox', face: 1, moving: 1, phase: t * 11 });
    for (let i = 0; i < 6; i++) fg += bird(120 + i * 70 + T * 30, 560 + (i % 3) * 40 - T * 6, .42, t * 9 + i * 1.3, -6); }
  fg += pigeon(330, PV + 40, 1.1, t, 1) + pigeon(366, PV + 52, 1, t, 3);
  let s = `<defs>${LDEFS()}${def}</defs>` + street9(t, { N: 0, id: 'nt', cars: 0, overcast: 1, back: sun3(560, 330) + cumulus(150 + T * 3, 500, 210, 33, { a: .9 }) + cumulus(440 + T * 2, 610, 150, 35, { a: .75 }), wall, ground: gr, fg });
  noEarth(); F.ov = ''; return s;
}

// 6: of 7,000 languages only a few stay alive
const GREET = [['مرحباً', 'Noto Naskh Arabic'], ['Hello', 'Inter'], ['你好', 'WenQuanYi Zen Hei'], ['Hola', 'Inter'], ['Привет', 'Inter'], ['नमस्ते', 'FreeSans'], ['Bonjour', 'Inter'], ['こんにちは', 'IPAGothic'], ['Jambo', 'Inter'], ['안녕', 'WenQuanYi Zen Hei'], ['Olá', 'Inter'], ['สวัสดี', 'Loma'], ['Γειά', 'Inter'], ['שלום', 'DejaVu Sans'], ['Merhaba', 'Inter'], ['Ciao', 'Inter'], ['Hallo', 'Inter'], ['Xin chào', 'Inter'], ['Sawubona', 'Inter'], ['Aloha', 'Inter'], ['Kia ora', 'Inter']];
const GCOL = ['#fff4d6', '#d6ecff', '#e2f6d8', '#ffe0e0', '#eee2ff', '#fff', '#d8f4f0'];
const GKEEP = new Set([0, 10, 19]);   // the few that survive
function sceneLang(t) {
  const tA = S0(6) + .55, tB = WS(6, 7) + .5, ord = RS(66), ords = GREET.map((_, i) => i).filter(i => !GKEEP.has(i)).map(i => [ord(), i]).sort((a, b) => a[0] - b[0]).map(q => q[1]);
  let s = `<defs>${LDEFS()}</defs>` + studio('lgS', '#2c3a5c', '#090c1a', 6), left = GREET.length;
  GREET.forEach(([tx, font], i) => { const col = i % 3, row = Math.floor(i / 3), x = 138 + col * 222 + ((row % 2) ? 14 : -14), y = 440 + row * 100 + (col === 1 ? 48 : 0) + 6 * Math.sin(t * 1.2 + i), w = Math.max(132, 48 + tx.length * (font === 'Inter' ? 21 : 30)), h = 68;
    const a = ramp(t, S0(6) - .2 + i * .02, S0(6) + .1 + i * .02), q = ords.indexOf(i), tp = q < 0 ? 1e9 : lerp(tA, tB, q / (ords.length - 1)), pop = ramp(t, tp, tp + .3); if (pop >= 1) { left--; return; } if (pop > 0) left -= pop;
    const sc = 1 + .45 * pop, op = a * (1 - pop), keep = GKEEP.has(i) && t > tB;
    s += `<g opacity="${op.toFixed(2)}" transform="translate(${x},${y.toFixed(1)}) scale(${sc.toFixed(3)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 6}" width="${w}" height="${h}" rx="28" fill="#000" opacity=".3"/><path d="M${-26},${h / 2 - 4} L${-36},${h / 2 + 20} L${-4},${h / 2 - 4}Z" fill="${GCOL[i % 7]}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="28" fill="${GCOL[i % 7]}"${keep ? ' stroke="#f4c76b" stroke-width="5"' : ''}/><rect x="${-w / 2 + 8}" y="${-h / 2 + 5}" width="${w - 16}" height="${h * .36}" rx="16" fill="#fff" opacity=".35"/>` +
      `<text x="0" y="12" text-anchor="middle" font-family="${font}" font-weight="700" font-size="34" fill="#1c2230">${tx}</text></g>`;
    if (pop > 0) for (let j = 0; j < 8; j++) { const an = j / 8 * 6.283, d = w * .5 + 40 * pop; s += `<path d="M${(x + Math.cos(an) * d * .7).toFixed(1)},${(y + Math.sin(an) * d * .5).toFixed(1)} L${(x + Math.cos(an) * d).toFixed(1)},${(y + Math.sin(an) * d * .7).toFixed(1)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(1 - pop).toFixed(2)}"/>`; } });
  const n = lerp(99, 7000, clamp((left - 3) / (GREET.length - 3)));
  s += `<text x="420" y="1206" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="84" fill="${n < 120 ? '#ff7a6a' : '#f4c76b'}" style="filter:drop-shadow(0 4px 12px rgba(0,0,0,.8))">${fmtN(n)}</text>` + lbl(230, 1200, 'لغة', 1, '#fff', 44);
  noEarth(); F.ov = ''; return s;
}

// 6b: much knowledge is lost: no factories, no medicine
function medItem(kind) {
  if (kind === 0) return `<rect x="-22" y="-62" width="44" height="62" rx="7" fill="#e88a2a"/><rect x="-22" y="-44" width="44" height="30" fill="#f6f2e6"/><path d="M0,-38 v18 M-9,-29 h18" stroke="#d8382e" stroke-width="5"/><rect x="-18" y="-76" width="36" height="16" rx="3" fill="#f2f2ee"/><rect x="-22" y="-62" width="44" height="62" rx="7" fill="url(#canSh)" opacity=".7"/>`;
  if (kind === 1) return `<rect x="-34" y="-50" width="68" height="50" rx="3" fill="#f2f2ee"/><rect x="-34" y="-50" width="68" height="14" fill="#2a8a5a"/><path d="M0,-30 v20 M-10,-20 h20" stroke="#2a8a5a" stroke-width="5"/><rect x="-34" y="-50" width="14" height="50" fill="#000" opacity=".14"/>`;
  if (kind === 2) return `<rect x="-36" y="-44" width="72" height="44" rx="6" fill="#c8ccd4"/>` + Array.from({ length: 8 }, (_, i) => `<ellipse cx="${-25 + (i % 4) * 16.6}" cy="${-32 + Math.floor(i / 4) * 20}" rx="6.5" ry="6.5" fill="${i % 2 ? '#f6f2e6' : '#e86a5a'}"/><ellipse cx="${-27 + (i % 4) * 16.6}" cy="${-34 + Math.floor(i / 4) * 20}" rx="2.4" ry="2" fill="#fff" opacity=".7"/>`).join('');
  if (kind === 3) return `<path d="M-16,0 V-40 Q-16,-50 -8,-52 V-66 H8 V-52 Q16,-50 16,-40 V0Z" fill="#7a4a2a"/><rect x="-16" y="-36" width="32" height="24" fill="#f6f2e6"/><rect x="-10" y="-76" width="20" height="12" rx="2" fill="#f2f2ee"/><path d="M-16,0 V-40 Q-16,-50 -8,-52 V-66 H8 V-52 Q16,-50 16,-40 V0Z" fill="url(#canSh)" opacity=".7"/>`;
  if (kind === 4) return `<g transform="rotate(-24)"><rect x="-13" y="-58" width="26" height="58" rx="13" fill="#f2f2ee"/><rect x="-13" y="-58" width="26" height="29" rx="13" fill="#d8382e"/><rect x="-13" y="-42" width="26" height="14" fill="#d8382e"/><rect x="-13" y="-58" width="26" height="58" rx="13" fill="url(#canSh)" opacity=".7"/></g>`;
  return `<rect x="-11" y="-54" width="22" height="54" rx="4" fill="#bfe0f4" opacity=".9"/><rect x="-11" y="-30" width="22" height="30" rx="4" fill="#7ac0e8"/><rect x="-8" y="-66" width="16" height="14" rx="2" fill="#8a9098"/><rect x="-11" y="-54" width="22" height="54" rx="4" fill="url(#canSh)" opacity=".6"/>`;
}
function sceneKnow(t) {
  const T = t - (WS(6, 8) - .3), base = 986, sm = 1 - ease(ramp(t, WS(6, 8), WS(6, 10) + .5)), ma = ease(ramp(t, WS(6, 13) - .25, WS(6, 13) + .3));
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#grayS)"/><g filter="url(#darkC)" opacity=".85">${cumulus(140 + T * 5, 470, 320, 81)}${cumulus(500 + T * 4, 540, 300, 82)}${cumulus(330 + T * 6, 640, 260, 83)}</g>`;
  s += farCity(87, base - 30, '#8a949c', { hk: .8 }) + `<rect x="-20" y="${base - 240}" width="760" height="240" fill="#c4c8c8" opacity=".5"/>`;
  // two brick chimneys with the last smoke
  [[590, 500, 2], [654, 420, 3]].forEach(([x, h, sd]) => { const wb = 26, wt = 17;
    if (sm > .01) { let p = ''; for (let i = 0; i < 9; i++) { const q = pmod(i / 9 + T * .07, 1); p += `<circle cx="${(x + 90 * q * q + 10 * Math.sin(T + i)).toFixed(1)}" cy="${(base - h - 10 - q * 200).toFixed(1)}" r="${(20 + 60 * q).toFixed(1)}" fill="#6a6a70" opacity="${((1 - q) * .8).toFixed(2)}"/>`; } s += `<g opacity="${sm.toFixed(2)}" filter="url(#steamF)">${p}</g>`; }
    s += `<path d="M${x - wb},${base} L${x - wt},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="#8a5644"/><path d="M${x - wb},${base} L${x - wt},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="url(#brk)"/><path d="M${x + 4},${base} L${x + 3},${base - h} L${x + wt},${base - h} L${x + wb},${base}Z" fill="#000" opacity=".28"/><rect x="${x - wt - 3}" y="${base - h - 6}" width="${wt * 2 + 6}" height="12" fill="#5a3a30"/><rect x="${x - wt - 2}" y="${base - h + 50}" width="${wt * 2 + 4}" height="7" fill="#5a3a30" opacity=".8"/>` +
      Array.from({ length: 5 }, (_, i) => { const r = RS(sd * 9 + i); return `<path d="M${(x - wt + r() * wt * 2).toFixed(1)},${base - h + 8} l${(r() * 6 - 3).toFixed(1)},${(60 + r() * 220).toFixed(1)}" stroke="#2a1c18" stroke-width="${(2 + r() * 5).toFixed(1)}" opacity=".25" stroke-linecap="round"/>`; }).join(''); });
  // the hall with a saw-tooth roof
  const x0 = 26, x1 = 536, top = base - 196, tw = (x1 - x0) / 5;
  for (let i = 0; i < 5; i++) { const x = x0 + i * tw; s += `<path d="M${x},${top} V${top - 64} L${x + tw},${top}Z" fill="#5c6068"/><path d="M${x},${top} V${top - 64} L${x + tw},${top}Z" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="${x}" y="${top - 64}" width="9" height="64" fill="#2e3a48"/><path d="M${x + 9},${top - 58} L${x + tw - 6},${top - 3}" stroke="#8a8e96" stroke-width="2" opacity=".6"/>` + Array.from({ length: 4 }, (_, q) => `<path d="M${x + 14 + q * 20},${top - 50 + q * 13} l8,${52 - q * 13 - 4}" stroke="#3a3e46" stroke-width="1.4" opacity=".6"/>`).join(''); }
  s += `<rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="#8f5e4c"/><rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="url(#brk)"/><rect x="${x0}" y="${top}" width="${x1 - x0}" height="196" fill="#fff" filter="url(#wallI)" opacity=".3"/><rect x="${x0 - 4}" y="${top - 4}" width="${x1 - x0 + 8}" height="12" fill="#5a3e34"/><rect x="${x0}" y="${top + 8}" width="${x1 - x0}" height="14" fill="url(#aoDn)" opacity=".7"/>`;
  { const r = RS(93); for (let w = 0; w < 4; w++) { const wx = x0 + 22 + w * 92, wy = top + 40; s += `<rect x="${wx - 4}" y="${wy - 4}" width="80" height="96" fill="#4a342c"/>`;
      for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) { const br = r(); s += `<rect x="${wx + a * 18.4}" y="${wy + b * 22.4}" width="16.4" height="20.4" fill="${br < .32 ? '#14181e' : br < .5 ? '#7a8a94' : '#56686e'}"/>` + (br < .32 && br > .16 ? `<path d="M${wx + a * 18.4},${wy + b * 22.4 + 20} l8,-12 l4,6 l4,-9 v15Z" fill="#7a8a94" opacity=".8"/>` : ''); }
      s += `<path d="M${wx + 30 + r() * 20},${wy + 94} l${(r() * 6 - 3).toFixed(1)},${(30 + r() * 50).toFixed(1)}" stroke="#4a2a1a" stroke-width="${(4 + r() * 5).toFixed(1)}" opacity=".3" stroke-linecap="round"/>`; } }
  s += `<rect x="${x0 + 396}" y="${base - 138}" width="102" height="138" fill="#2a2a2e"/><rect x="${x0 + 396}" y="${base - 138}" width="62" height="138" fill="#6a4a3a"/><rect x="${x0 + 396}" y="${base - 138}" width="62" height="138" fill="#000" filter="url(#grainR)" opacity=".4"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${x0 + 400 + i * 13},${base - 138} v138" stroke="#3a2a22" stroke-width="2"/>`).join('') + `<rect x="${x0 + 392}" y="${base - 146}" width="110" height="10" fill="#4a4a50"/>`;
  s += `<g transform="rotate(-3,${x0 + 200},${top - 80})"><rect x="${x0 + 120}" y="${top - 112}" width="160" height="46" fill="#3a4a5a"/><rect x="${x0 + 120}" y="${top - 112}" width="160" height="46" fill="#8a6a4a" opacity=".3"/><text x="${x0 + 200}" y="${top - 78}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="32" fill="#d8d2c0" opacity=".85">مصنع</text><path d="M${x0 + 140},${top - 66} v20 M${x0 + 260},${top - 66} v20" stroke="#3a3a40" stroke-width="5"/></g>`;
  s += `<path d="M${x0},${top + 150} H${x0 + 380}" stroke="#6a7078" stroke-width="9"/><path d="M${x0},${top + 147} H${x0 + 380}" stroke="#fff" stroke-width="2" opacity=".25"/><path d="M${x0 + 380},${top + 150} V${base}" stroke="#6a7078" stroke-width="9"/>`;
  // the yard: cracked concrete, barrels, weeds, a puddle
  s += `<rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="#8e8a80"/><rect x="-20" y="${base}" width="760" height="${1300 - base}" fill="#000" filter="url(#grainR)" opacity=".4"/><rect x="-20" y="${base}" width="760" height="30" fill="url(#aoDn)" opacity=".8"/>` + cracks(base + 6, 1300, .9, 61, -20, 740, '#3a3630');
  s += `<ellipse cx="250" cy="1150" rx="150" ry="26" fill="#a8b4be" opacity=".75"/><ellipse cx="230" cy="1146" rx="90" ry="12" fill="#dfe6ea" opacity=".5"/>`;
  [[590, 1076, '#3a6a8a'], [640, 1084, '#8a4a2a'], [614, 1112, '#5a6a3a']].forEach(([x, y, c], i) => { s += `<ellipse cx="${x + 6}" cy="${y + 2}" rx="34" ry="7" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="${x - 24}" y="${y - 70}" width="48" height="70" rx="5" fill="${c}"/><rect x="${x - 24}" y="${y - 50}" width="48" height="5" fill="#000" opacity=".25"/><rect x="${x - 24}" y="${y - 26}" width="48" height="5" fill="#000" opacity=".25"/><ellipse cx="${x}" cy="${y - 70}" rx="24" ry="6" fill="${mix(c, '#ffffff', .3)}"/><rect x="${x - 24}" y="${y - 70}" width="48" height="70" rx="5" fill="url(#canSh)"/><ellipse cx="${x - 6}" cy="${y - 30}" rx="12" ry="18" fill="#8a4a22" opacity=".45" filter="url(#blur2)"/>`; });
  { const r = RS(58); for (let i = 0; i < 30; i++) { const y = i < 14 ? base + 4 + r() * 8 : base + 40 + r() * 250, x = r() * 720; s += tuft(x, y, i < 14 ? 24 + r() * 16 : 16 + (y - base) * .12, i + 500); } }
  s += `<rect x="-20" y="380" width="760" height="920" fill="#5a6470" opacity=".16"/>`;
  // the medicine shelf empties
  if (ma > 0) { const X0 = 60, Y0 = 1010, t0 = WS(6, 13) + .35, t1 = S0(7) - .5; s += `<g opacity="${ma.toFixed(2)}">` + panel(X0, Y0, 600, 196, 1) + `<rect x="${X0 + 24}" y="${Y0 + 150}" width="552" height="12" rx="3" fill="#8a8478"/><rect x="${X0 + 24}" y="${Y0 + 162}" width="552" height="6" fill="#000" opacity=".4"/>`;
    [2, 0, 4, 1, 5, 3].forEach((kd, i) => { const x = X0 + 76 + i * 90, g = ramp(t, lerp(t0, t1, [3, 0, 4, 1, 5, 2][i] / 5), lerp(t0, t1, [3, 0, 4, 1, 5, 2][i] / 5) + .3);
      s += `<rect x="${x - 36}" y="${Y0 + 68}" width="72" height="82" rx="8" fill="none" stroke="#8a94a6" stroke-width="2.5" stroke-dasharray="7 6" opacity="${g.toFixed(2)}"/><g transform="translate(${x},${Y0 + 150 - 18 * g}) scale(${(1 + .2 * g).toFixed(2)})" opacity="${(1 - g).toFixed(2)}">${medItem(kd)}</g>`; });
    s += lbl(360, Y0 + 44, 'رفُّ الأدوية', 1, '#fff', 28) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 7: if they gather, they make one small village living on farming and fishing
function cottage(x, y, s, wall, roof, seed, o = {}) {
  const r = RS(seed), dk = mix(wall, '#000000', .34), rd = mix(roof, '#000000', .3), lit = o.lit ?? .8;
  let g = `<ellipse cx="34" cy="2" rx="130" ry="10" fill="#1c2410" opacity=".35" filter="url(#blur2)"/>`;
  g += `<path d="M75,0 L135,-16 L135,-100 L75,-84Z" fill="${dk}"/><path d="M-75,0 H75 V-84 L0,-140 L-75,-84Z" fill="${wall}"/><path d="M-75,0 H75 V-84 L0,-140 L-75,-84Z" fill="#fff" filter="url(#wallI)" opacity=".3"/>`;
  for (let i = 1; i < 7; i++) g += `<path d="M-75,${-i * 13} H75" stroke="#000" stroke-width="1" opacity=".12"/>`;
  g += `<path d="M0,-140 L60,-156 L146,-96 L84,-78Z" fill="${roof}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${14 * (i + 1) - 2},${-140 + (i + 1) * 9.6} l60,-16" stroke="#000" stroke-width="1.2" opacity=".22"/>`).join('') + `<path d="M0,-140 L60,-156 L146,-96 L84,-78Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  g += `<path d="M-86,-76 L0,-146 L86,-76" stroke="${rd}" stroke-width="9" fill="none" stroke-linejoin="round"/><path d="M-86,-79 L0,-149" stroke="#fff" stroke-width="2" opacity=".2"/>`;
  g += `<rect x="78" y="-150" width="18" height="34" fill="#7a6a5e"/><rect x="76" y="-154" width="22" height="6" fill="#5a4a40"/>`;
  g += `<rect x="-16" y="-52" width="32" height="52" rx="2" fill="#5a3e28"/><rect x="-16" y="-52" width="12" height="52" fill="#000" opacity=".18"/><circle cx="9" cy="-26" r="2.4" fill="#d8b060"/>`;
  [[-56, -64], [30, -64]].forEach(([wx, wy]) => { g += `<rect x="${wx - 3}" y="${wy - 3}" width="32" height="32" fill="${mix(wall, '#ffffff', .5)}"/><rect x="${wx}" y="${wy}" width="26" height="26" fill="${mix('#3a4a5a', '#ffd88a', lit)}"/><path d="M${wx + 13},${wy} v26 M${wx},${wy + 13} h26" stroke="${mix(wall, '#ffffff', .5)}" stroke-width="2"/>`; });
  g += `<circle cx="0" cy="-104" r="9" fill="${mix('#3a4a5a', '#ffd88a', lit * .6)}" stroke="${mix(wall, '#ffffff', .5)}" stroke-width="2.5"/><rect x="100" y="-62" width="18" height="24" fill="${mix('#2a3644', '#e8b870', lit * .7)}" transform="skewY(-15) translate(0,27)"/>`;
  let sm = ''; if (o.smoke) for (let i = 0; i < 6; i++) { const p = pmod(i / 6 + o.t * .08 + seed * .1, 1); sm += `<circle cx="${(87 + 50 * p * p + 5 * Math.sin(o.t + i)).toFixed(1)}" cy="${(-160 - p * 130).toFixed(1)}" r="${(8 + 26 * p).toFixed(1)}" fill="#f2e6d6" opacity="${((1 - p) * .55).toFixed(2)}" filter="url(#blur5)"/>`; }
  return `<g transform="translate(${x},${y}) scale(${s})">${g}${sm}</g>`;
}
function sceneVillage(t) {
  const T = t - S0(7) + .2, hz = 716;
  let s = `<defs>${LDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#goldS)"/><circle cx="130" cy="${hz - 70}" r="250" fill="url(#sunW)"/>` + sun3(130, hz - 70, 1, '#ffe6b0') + cumulus(420 + T * 5, 500, 260, 91, { a: .8 }) + cumulus(650 + T * 4, 600, 180, 92, { a: .7 });
  s += mountainsR(hz - 30, 140, 531, { rock: '#8c8088', haze: .6, hazeCol: '#f2d6b0', snowAt: .6 }) + `<rect x="-20" y="${hz - 44}" width="760" height="70" fill="#b09e90"/>` + mountainsR(hz - 6, 76, 533, { rock: '#7e8a5c', haze: .42, hazeCol: '#e8d49c' }) + `<rect x="-20" y="${hz - 12}" width="760" height="40" fill="#98a466"/>` + mountainsR(hz + 12, 52, 532, { rock: '#6c7c50', haze: .3, hazeCol: '#e6cfa2' }) + `<rect x="-20" y="${hz + 6}" width="760" height="50" fill="#7e9258"/>`;
  s += meadow(hz + 26, 1300, t, { c0: '#9cae5c', c1: '#5c7830' }) + forestR(hz + 44, 24, 36, 84, 13, '#3e6630', { haze: .22, hazeCol: '#e2cfa6' });
  s += `<rect x="-20" y="${hz - 20}" width="760" height="100" fill="#ffe2b0" opacity=".4" filter="url(#blur9)"/>`;
  // the river on the right
  const L = [], Rr = []; for (let i = 0; i <= 26; i++) { const v = i / 26, y = hz + 44 + Math.pow(v, 1.5) * (1310 - hz - 44), cx = 590 + 50 * Math.sin(v * 3.6 + .4) * (.3 + .7 * v) + 70 * v, w = 4 + 120 * Math.pow(v, 1.5); L.push([cx - w, y]); Rr.push([cx + w, y]); }
  const rv = `M${L.map(PT).join(' L')} L${Rr.slice().reverse().map(PT).join(' L')}Z`;
  s += `<defs><clipPath id="rvV"><path d="${rv}"/></clipPath><linearGradient id="rvWarm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6b4" stop-opacity=".7"/><stop offset="1" stop-color="#ffe6b4" stop-opacity="0"/></linearGradient></defs><path d="${rv}" fill="url(#rivG)"/><g clip-path="url(#rvV)"><rect x="300" y="${hz}" width="460" height="460" fill="url(#rvWarm)"/>` + Array.from({ length: 22 }, (_, i) => { const r = RS(i + 60), v = Math.pow(r(), .7), y = hz + 50 + Math.pow(v, 1.5) * 520, x = 480 + r() * 260 + 10 * Math.sin(t * 1.4 + i); return `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(12 + 28 * v).toFixed(1)},-4 ${(24 + 56 * v).toFixed(1)},0" stroke="#fff" stroke-width="${(1 + 2.2 * v).toFixed(1)}" fill="none" opacity=".55"/>`; }).join('') + `</g><path d="M${L.map(PT).join(' L')}" stroke="#4a3a22" stroke-width="5" fill="none" opacity=".35"/><path d="M${Rr.map(PT).join(' L')}" stroke="#4a3a22" stroke-width="4" fill="none" opacity=".25"/>`;
  // the ploughed field on the left, the path
  s += `<defs><clipPath id="fldC"><path d="M-20,1300 L-20,1060 L250,1040 L330,1300Z"/></clipPath></defs><g clip-path="url(#fldC)"><rect x="-20" y="1030" width="380" height="280" fill="#7a5a3a"/><rect x="-20" y="1030" width="380" height="280" fill="#000" filter="url(#grainR)" opacity=".4"/>` + Array.from({ length: 12 }, (_, i) => { const xb = -170 + i * 46, xt = 80 + i * 16; let rw = `<path d="M${xb},1300 L${xt},1036" stroke="#4e3824" stroke-width="${10}" opacity=".5"/>`; for (let q = 0; q < 12; q++) { const u = q / 12, x = lerp(xb, xt, u) + 18 * (1 - u), y = lerp(1300, 1036, u); rw += tuft(x, y, 26 * (1 - u * .6), i * 20 + q + 700); } return rw; }).join('') + `</g>`;
  s += `<path d="M330,1300 Q350,1180 400,1090 Q430,1030 400,980 L440,980 Q486,1030 462,1100 Q430,1180 470,1300Z" fill="#c8a878" opacity=".85"/>`;
  // the houses, far to near
  const HS = [[236, 876, 1, '#d8c8a8', '#8a4a3a', 2], [442, 890, 1.08, '#c8b090', '#5a5a62', 4], [76, 936, 1.36, '#b89a78', '#6a4a3a', 1], [318, 972, 1.5, '#e2d6bc', '#9a5240', 3]];
  const smallP = (x, y, sc, f, pi, wk) => man(x, y, sc, f, pi, { walk: wk ? (x * f) / (30 * sc) : null, noShadow: 1 });
  let ppl = [];
  HS.forEach(([x, y, sc, w, rf, sd], i) => ppl.push([y, cottage(x, y, sc, w, rf, sd, { smoke: i % 2 === 0, t, lit: .75 })]));
  // the fire and the people round it
  const fx = 488, fy = 1058, fk = .8 + .2 * Math.sin(t * 13);
  ppl.push([fy, `<ellipse cx="${fx}" cy="${fy + 4}" rx="40" ry="8" fill="#2a2010" opacity=".4"/><path d="M${fx - 22},${fy + 2} l44,-6 M${fx - 20},${fy - 6} l42,8" stroke="#4a3220" stroke-width="7" stroke-linecap="round"/><path d="M${fx - 13},${fy - 2} Q${fx - 18},${fy - 24} ${fx - 4},${fy - 34 * fk} Q${fx},${fy - 52 * fk} ${fx + 5},${fy - 30 * fk} Q${fx + 17},${fy - 20} ${fx + 13},${fy - 2}Z" fill="url(#flameG)"/>` + scr(`<circle cx="${fx}" cy="${fy - 14}" r="${70 * fk}" fill="url(#fireGlow)" opacity=".8"/>`)]);
  [[430, 1064, .34, 1, 2], [546, 1068, .34, -1, 6], [470, 1034, .31, 1, 9], [512, 1090, .36, -1, 4]].forEach(([x, y, sc, f, pi]) => ppl.push([y, smallP(x, y, sc, f, pi, 0)]));
  [[150 + T * 5, 950, .23, 1, 1, 1], [548 - T * 4, 912, .19, -1, 8, 1], [196, 988, .27, 1, 0, 0], [222, 990, .26, -1, 7, 0], [560, 986, .26, -1, 3, 0]].forEach(([x, y, sc, f, pi, wk]) => ppl.push([y, smallP(x, y, sc, f, pi, wk)]));
  { const x = 380 + T * 7, y = 1160, sc = .43; ppl.push([y, man(x, y, sc, 1, 5, { walk: x / 15, hF: [x + 14, y - 96] }) + `<path d="M${x + 6},${y - 94} l16,0 l-3,26 l-10,0Z" fill="#8a6a44"/><path d="M${x + 4},${y - 96} q10,-12 20,0" stroke="#5a4028" stroke-width="2.5" fill="none"/>`]); }
  // the farmers
  { const x = 110, y = 1206, sc = .5, sw = .5 + .5 * Math.sin(t * 4), hx = x + 64 * sc + 10 * sw, hy = y - 150 * sc + 40 * sw * sc; ppl.push([y, `<path d="M${(hx - 34 * sc).toFixed(1)},${(hy - 70 * sc).toFixed(1)} L${(hx + 46 * sc).toFixed(1)},${(hy + 120 * sc).toFixed(1)}" stroke="#6a4a2a" stroke-width="5" stroke-linecap="round"/><path d="M${(hx + 46 * sc).toFixed(1)},${(hy + 120 * sc).toFixed(1)} l-16,6 l4,-16Z" fill="#5a5e66"/>` + man(x, y, sc, 1, 3, { lean: 14 + 8 * sw, hF: [hx, hy], hB: [hx - 14 * sc, hy - 34 * sc] })]); }
  ppl.push([1128, man(240, 1128, .4, -1, 6, { lean: 22, hF: [212, 1104], hB: [220, 1100], lookUp: -.3 })]);
  // fishing on the bank
  { const x = 574, y = 1232, sc = .5; let g = man(x, y, sc, 1, 8, { hF: [x + 44 * sc, y - 170 * sc], hB: [x + 30 * sc, y - 150 * sc] }); const H = HP.hand, tip = [H[0] + 124, H[1] - 96], bob = [tip[0] + 6, 1236 + 2 * Math.sin(t * 2.4)];
    g += `<path d="M${(H[0] - 12).toFixed(1)},${(H[1] + 10).toFixed(1)} L${tip[0].toFixed(1)},${tip[1].toFixed(1)}" stroke="#5a4028" stroke-width="3.5" stroke-linecap="round"/><path d="M${tip[0].toFixed(1)},${tip[1].toFixed(1)} Q${(tip[0] + 14).toFixed(1)},${((tip[1] + bob[1]) / 2).toFixed(1)} ${bob[0].toFixed(1)},${bob[1].toFixed(1)}" stroke="#f4f0e4" stroke-width="1.2" fill="none" opacity=".9"/><circle cx="${bob[0].toFixed(1)}" cy="${bob[1].toFixed(1)}" r="4" fill="#e8483a"/><ellipse cx="${bob[0].toFixed(1)}" cy="${(bob[1] + 3).toFixed(1)}" rx="${(10 + 8 * pmod(t * .6, 1)).toFixed(1)}" ry="3" fill="none" stroke="#fff" stroke-width="1.4" opacity="${(.7 * (1 - pmod(t * .6, 1))).toFixed(2)}"/>`; ppl.push([y, g]); }
  ppl.sort((a, b) => a[0] - b[0]); s += ppl.map(q => q[1]).join('');
  s += `<rect x="-20" y="380" width="760" height="920" fill="#ffb060" opacity=".1"/>`;
  noEarth(); F.ov = ''; return s;
}
