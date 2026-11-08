
// ===================== "what if Yellowstone's supervolcano erupted?" =====================
const YL = [44.43, -110.67];
// screen position of a lat/lon on the 3D globe (same maths as the WebGL layer: sphere UV, then Y spin, then X tilt)
function geoXY(lat, lon, e, t) {
  const phi = (lon + 180) * Math.PI / 180, th = (90 - lat) * Math.PI / 180;
  const x = -Math.cos(phi) * Math.sin(th), y = Math.cos(th), z = Math.sin(phi) * Math.sin(th);
  const a = (e.rot ?? .6) + t * (e.spin ?? .03), b = e.xr ?? 0;
  const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a);
  const y2 = y * Math.cos(b) - z1 * Math.sin(b), z2 = y * Math.sin(b) + z1 * Math.cos(b);
  return [e.x + e.r * x1, e.y - e.r * y2, z2];
}
const pin = (x, y, t, col = '#e53935') => { const p = pmod(t * .8, 1); return `<circle cx="${x}" cy="${y}" r="${8 + p * 30}" fill="none" stroke="${col}" stroke-width="3" opacity="${(1 - p).toFixed(2)}"/><circle cx="${x}" cy="${y}" r="8" fill="${col}" stroke="#fff" stroke-width="3"/>`; };
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const CFDEF = `<radialGradient id="cfL" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#e2dbd0"/><stop offset=".45" stop-color="#9a9288"/><stop offset="1" stop-color="#3a3430"/></radialGradient><radialGradient id="cfD" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#8a8278"/><stop offset=".5" stop-color="#4a443e"/><stop offset="1" stop-color="#1e1a18"/></radialGradient><filter id="billow" x="-15%" y="-10%" width="130%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="3" seed="4"/><feDisplacementMap in="SourceGraphic" scale="22" xChannelSelector="R" yChannelSelector="G"/></filter><radialGradient id="pfG" cx=".5" cy=".9" r=".7"><stop offset="0" stop-color="#ff9a3a" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>`;
// a billowing Plinian column: cauliflower lumps lit from the upper left, widening as it rises, spreading into an umbrella cloud; lightning inside; glowing pyroclastic flows at the foot
function ashColumn(x0, yg, H, W, t, k, seed, um = 0) {
  const r = RS(seed); let s = `<g filter="url(#billow)">`; const n = 84;
  for (let i = 0; i < n; i++) { const u = i / (n - 1), a = r(), b = r(), c = r(); if (u > k) continue; const y = yg - H * u * (.92 + .08 * a), w = W * (.3 + .7 * Math.pow(u, .8)), cx = x0 + Math.sin(u * 7 + t * .5 + seed) * w * .1 + (b - .5) * w * .5, rr = w * (.24 + .2 * c) * (1 + .05 * Math.sin(t * 1.3 + i));
    s += `<circle cx="${cx.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#${u < .35 ? 'cfD' : 'cfL'})"/>`; }
  if (um > 0) { const uy = yg - H, uw = W * (1.4 + 3.6 * um); for (let i = 0; i < 40; i++) { const a = r(), b = r(), c = r(), cx = x0 + (a - .5) * 2 * uw * (.4 + .6 * b), cy = uy + (b - .5) * H * .12 + Math.abs(cx - x0) / uw * H * .05, rr = W * (.35 + .35 * c) * (1 - .4 * Math.abs(cx - x0) / uw);
      s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${Math.max(6, rr).toFixed(1)}" fill="url(#cfL)"/>`; }
    s += `<ellipse cx="${x0}" cy="${uy + H * .06}" rx="${uw * 1.02}" ry="${H * .05}" fill="#2a2420" opacity=".35" filter="url(#soft)"/>`; }
  s += `</g>`;
  s += `<rect x="${x0 - W}" y="${yg - H * k}" width="${2 * W}" height="${H * k}" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  const fl = Math.floor(t * 3.1 + seed) % 5 === 0 && pmod(t * 3.1, 1) < .35;
  if (fl && k > .5) { const rl = RS(Math.floor(t * 3.1) + seed); let x = x0 + (rl() - .5) * W * .8, y = yg - H * (.35 + .4 * rl()), d = `M${x.toFixed(1)},${y.toFixed(1)}`; for (let q = 0; q < 6; q++) { x += (rl() - .5) * 40; y += 18 + rl() * 22; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } s += `<path d="${d}" stroke="#e8e0ff" stroke-width="3" fill="none"/><path d="${d}" stroke="#b8a0ff" stroke-width="9" fill="none" opacity=".35" filter="url(#blur2)"/>`; }
  return s;
}
function pyroFlow(x0, yg, t, k, seed, span = 300) {
  const r = RS(seed); let s = `<ellipse cx="${x0}" cy="${yg}" rx="${span * k + 40}" ry="${40 + 30 * k}" fill="url(#pfG)" opacity="${.8 * k}"/>`;
  for (let i = 0; i < 26; i++) { const a = r(), b = r(), sd = a > .5 ? 1 : -1, d = (.2 + .8 * b) * span * k, cx = x0 + sd * d, rr = 18 + 34 * (1 - b) * k + 10 * r(); s += `<circle cx="${cx.toFixed(1)}" cy="${(yg - rr * .6).toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#cfD)" opacity=".95"/>`; }
  return s;
}
function bison(x, y, sc, face, t, ph) {
  const g = Math.sin(t * 1.1 + ph) * 2;
  return `<g transform="translate(${x},${y}) scale(${sc * face},${sc})"><ellipse cx="2" cy="1" rx="50" ry="6" fill="#000" opacity=".28"/>` +
    [[-30, 0], [-18, 1], [20, 1], [30, 0]].map(([lx, o]) => `<path d="M${lx - 4},-24 L${lx - 3 + o},0 L${lx + 3 + o},0 L${lx + 5},-24Z" fill="#2a1a10"/>`).join('') +
    `<path d="M-42,-24 Q-48,-50 -22,-52 Q0,-54 14,-64 Q36,-70 44,-50 Q50,-34 46,-22 Q20,-14 -42,-24Z" fill="#4a2e1c"/><path d="M8,-64 Q36,-72 44,-50 Q52,-30 44,-20 L22,-22 Q12,-42 8,-64Z" fill="#33200f"/>` +
    `<path d="M-38,-40 Q-10,-52 10,-62" stroke="#6e4a2e" stroke-width="5" fill="none" opacity=".6"/><path d="M-42,-30 q-8,6 -6,16" stroke="#2a1a10" stroke-width="3" fill="none"/>` +
    `<g transform="translate(50,${-24 + g})"><ellipse cx="0" cy="0" rx="12" ry="15" fill="#2a1a0e"/><path d="M-6,-12 q-6,-8 0,-12 M6,-12 q6,-8 2,-13" stroke="#d8d0c0" stroke-width="2.5" fill="none"/><path d="M-6,10 q6,10 12,0" fill="#2a1a0e"/><circle cx="5" cy="-3" r="1.6" fill="#000"/></g></g>`;
}
function forestRow(y0, n, h0, h1, seed, col, haze, x0 = -20, x1 = 740) {
  const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const x = x0 + (x1 - x0) * (i + r() * .8) / n, h = h0 + (h1 - h0) * r(); s += pine(x, y0 + r() * 10, h, seed * 50 + i, mix(col, '#9aa8b8', haze)); } return s;
}
// Grand Prismatic Spring seen from a low hill: orange bacterial mats with radial run-off streaks, yellow and green rims, a turquoise ring, a deep blue centre, drifting steam
function prism(cx, cy, rx, ry, t, burst = 0) {
  let s = `<defs><radialGradient id="gpsG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#083e86"/><stop offset=".42" stop-color="#0d62b0"/><stop offset=".6" stop-color="#22a2c4"/><stop offset=".68" stop-color="#6ab89a"/><stop offset=".74" stop-color="#d6c650"/><stop offset=".82" stop-color="#e8962a"/><stop offset=".92" stop-color="#c45e28"/><stop offset="1" stop-color="#a04a24"/></radialGradient></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.45}" ry="${ry * 1.45}" fill="#c08048" opacity=".55" filter="url(#soft)"/>`;
  const r = RS(77); for (let i = 0; i < 60; i++) { const a = r() * Math.PI * 2, r0 = .95, r1 = 1.2 + .35 * r(); s += `<path d="M${cx + Math.cos(a) * rx * r0},${cy + Math.sin(a) * ry * r0} Q${cx + Math.cos(a + .05) * rx * (r0 + r1) / 2},${cy + Math.sin(a + .05) * ry * (r0 + r1) / 2} ${cx + Math.cos(a + .02) * rx * r1},${cy + Math.sin(a + .02) * ry * r1}" stroke="${['#b85a24', '#d8822a', '#8a4a22', '#e8a040'][i % 4]}" stroke-width="${2 + r() * 6}" fill="none" opacity=".55"/>`; }
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gpsG)"/>` + [.62, .7, .78, .88].map(q => `<ellipse cx="${cx}" cy="${cy}" rx="${rx * q}" ry="${ry * q}" fill="none" stroke="#000" stroke-width="1.2" opacity=".12"/>`).join('') +
    `<ellipse cx="${cx - rx * .12}" cy="${cy - ry * .18}" rx="${rx * .32}" ry="${ry * .2}" fill="#bfe4ff" opacity=".22"/>`;
  for (let i = 0; i < 14; i++) { const q = RS(i + 30), ph = pmod(t * (.12 + .05 * q()) + q(), 1), x = cx + (q() - .5) * rx * 1.4 + ph * 120, y = cy - ph * 330 * (1 + burst); s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(50 + ph * 150).toFixed(1)}" ry="${(18 + ph * 50).toFixed(1)}" fill="${mix('#cfe8f0', '#ffffff', ph)}" opacity="${(.32 * (1 - ph) * (ph < .1 ? ph * 10 : 1) * (1 + burst)).toFixed(2)}" filter="url(#soft)"/>`; }
  return s;
}
function geyser(x, y, h, t, k = 1) {
  let s = `<path d="M${x - 46},${y} Q${x - 30},${y - 16} ${x},${y - 18} Q${x + 30},${y - 16} ${x + 46},${y}Z" fill="#d8d2c4"/><path d="M${x - 46},${y} Q${x - 30},${y - 16} ${x},${y - 18}" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
  if (k <= 0) return s;
  for (let i = 0; i < 16; i++) { const u = i / 15, hh = h * k * (.9 + .1 * Math.sin(t * 7 + i)), yy = y - 18 - u * hh, w = 7 + u * 30 + Math.sin(t * 9 + i * 2) * 3; s += `<ellipse cx="${x + Math.sin(t * 3 + i) * 4 + u * u * 20}" cy="${yy}" rx="${w}" ry="${12 + u * 18}" fill="#fff" opacity="${(.85 - .45 * u).toFixed(2)}" filter="url(#blur2)"/>`; }
  for (let i = 0; i < 30; i++) { const q = RS(i + 60), ph = pmod(t * (.8 + q()) + q(), 1), sd = q() > .5 ? 1 : -1; s += `<circle cx="${x + sd * ph * (20 + 40 * q())}" cy="${y - 18 - h * k * (.9 - ph * ph * .9) * q()}" r="${1.5 + q() * 2}" fill="#fff" opacity="${(.8 * (1 - ph)).toFixed(2)}"/>`; }
  for (let i = 0; i < 6; i++) { const ph = pmod(t * .2 + i / 6, 1); s += `<ellipse cx="${x + 30 + ph * 220}" cy="${y - h * k - ph * 80}" rx="${60 + ph * 120}" ry="${26 + ph * 40}" fill="#f4f8fa" opacity="${(.45 * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; }
  return s;
}
function parkScene(t, o = {}) {
  const sky = o.sky || ['#5a8ed0', '#a8c8e8', '#f0e2cc'];
  let s = `<defs>${RDEF}${RDEF2}${CFDEF}<linearGradient id="skY${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".65" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient><linearGradient id="basY${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8aa8a"/><stop offset="1" stop-color="#d8ccb0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skY${o.id})"/>`;
  s += `<circle cx="590" cy="430" r="140" fill="#fff4d8" opacity="${o.sunGlow ?? .3}" filter="url(#soft)"/>`;
  for (let i = 0; i < 4; i++) { const r = RS(i + 13), cx = pmod(r() * 760 + t * 6, 900) - 90, cy = 380 + r() * 160; s += `<ellipse cx="${cx}" cy="${cy}" rx="${90 + r() * 60}" ry="${22 + r() * 10}" fill="#fff" opacity="${.7 * (o.clouds ?? 1)}" filter="url(#soft)"/>`; }
  s += (o.afterSky || '');
  s += mountains(770, 230, 81, '#8a92a0', '#2e3440', 5, .62) + mountains(800, 110, 82, '#5e6a62', '#1e2620', 8);
  s += forestRow(810, 46, 40, 70, 3, '#2e4a32', .35) + forestRow(845, 40, 60, 100, 4, '#2a4428', .15) + forestRow(890, 34, 80, 130, 5, '#24401f', 0);
  s += `<path d="M-20,900 Q200,884 360,892 T740,888 L740,1290 L-20,1290Z" fill="url(#basY${o.id})"/><path d="M-20,900 Q200,884 360,892 T740,888 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".35"/><path d="M-20,900 Q200,884 360,892 T740,888 L740,1290 L-20,1290Z" fill="#fff" filter="url(#stainD)" opacity=".18"/>`;
  s += geyser(130, 928, 230, t, o.geyser ?? 1) + prism(410, 1070, 250, 78, t, o.burst || 0);
  s += bison(600, 955, .7, -1, t, 0) + bison(660, 975, .8, -1, t, 2) + bison(250, 960, .6, 1, t, 4);
  // boardwalk with visitors
  s += `<path d="M-20,1210 L300,1170 L320,1180 L-20,1226Z" fill="#8a6a48"/><path d="M-20,1210 L300,1170" stroke="#5a4028" stroke-width="2"/>` + Array.from({ length: 10 }, (_, q) => `<path d="M${q * 32},${1206 - q * 4} v-18" stroke="#5a4028" stroke-width="2"/>`).join('') + `<path d="M-20,1190 L300,1150" stroke="#5a4028" stroke-width="2"/>`;
  s += onWalk(90 + (t * 6) % 40, 1200, CROWD[0], .3, 1, t, { moving: 1, phase: t * 5 }) + onWalk(200, 1186, CROWD[3], .28, -1, t, { lookUp: .2 });
  return s;
}
// 0: Yellowstone today – the Grand Prismatic Spring, Old Faithful, bison, pines and snowy peaks; then the ground starts to shake
function sceneHook(t) {
  const sh = ramp(t, WS(0, 4), WS(0, 6) + .3), dx = Math.sin(t * 61) * 3 * sh, dy = Math.cos(t * 47) * 2 * sh;
  let s = `<g transform="translate(${dx},${dy})">` + parkScene(t, { id: 'h', burst: sh * .6 }) + `</g>`;
  F.ov = ''; return s;
}
// the crust in section, with a depth ruler: the shallow rhyolite reservoir (5–17 km, a crystal mush with pockets of melt), the deeper basalt reservoir, hot water plumbing up to the geysers
function crossSection(t, o = {}) {
  const Y0 = 470, kmY = d => Y0 + d * 25, solid = o.solid || 0;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7a66"/><stop offset=".4" stop-color="#5a4c40"/><stop offset="1" stop-color="#2a201c"/></linearGradient><radialGradient id="magG" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="${mix('#ffb040', '#a87a5a', solid)}"/><stop offset=".55" stop-color="${mix('#e8541a', '#7a5a48', solid)}"/><stop offset="1" stop-color="${mix('#8a1a0a', '#4a3a32', solid)}"/></radialGradient><radialGradient id="basG" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#d83a1a"/><stop offset="1" stop-color="#5a0a0a"/></radialGradient></defs>`;
  s += `<rect width="720" height="${Y0}" fill="#6a9ad0"/><rect y="${Y0 - 200}" width="720" height="200" fill="#c8dcec" opacity=".6"/>`;
  s += mountains(Y0 - 10, 120, 81, '#8a92a0', '#2e3440', 5, .6) + forestRow(Y0 - 4, 50, 26, 44, 6, '#2a4428', .1);
  s += `<rect y="${Y0}" width="720" height="${1290 - Y0}" fill="url(#crust)"/>`;
  for (let q = 0; q < 9; q++) { const y = Y0 + 14 + q * 22 + q * q * 2; s += `<path d="M-20,${y} Q180,${y - 6 + q} 360,${y + 4} T740,${y - 2}" stroke="${q % 2 ? '#9a8a74' : '#3a3028'}" stroke-width="${2 + q * .4}" fill="none" opacity=".45"/>`; }
  s += `<rect y="${Y0}" width="720" height="${1290 - Y0}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // deep basalt reservoir and plume
  s += `<path d="M20,1290 C40,${kmY(24)} 200,${kmY(20)} 360,${kmY(20.5)} C540,${kmY(19.6)} 700,${kmY(24)} 720,1290Z" fill="url(#basG)" opacity=".8"/><path d="M20,1290 C40,${kmY(24)} 200,${kmY(20)} 360,${kmY(20.5)} C540,${kmY(19.6)} 700,${kmY(24)} 720,1290Z" fill="#000" filter="url(#grainR)" opacity=".35"/>` + lbl(360, kmY(26), 'خزّان أعمق', .8, '#ffd0a0', 22);
  // feeder dikes from the deep reservoir
  for (let q = 0; q < 4; q++) { const x = 240 + q * 80; s += `<path d="M${x},${kmY(20)} q${(q % 2 ? 10 : -10)},-60 0,${-(kmY(20) - kmY(17)) - 10}" stroke="#e8541a" stroke-width="5" fill="none" opacity="${.7 * (1 - solid * .5)}"/>`; }
  // the shallow reservoir: an irregular lens
  const lens = `M70,${kmY(11)} C80,${kmY(5.5)} 220,${kmY(4.6)} 360,${kmY(5)} C520,${kmY(4.4)} 650,${kmY(6)} 660,${kmY(11)} C650,${kmY(16)} 520,${kmY(17.4)} 360,${kmY(17)} C200,${kmY(17.6)} 80,${kmY(16)} 70,${kmY(11)}Z`;
  s += `<path d="${lens}" fill="#ff5a1a" opacity="${.35 * (1 - solid)}" filter="url(#soft)"/><path d="${lens}" fill="url(#magG)"/>`;
  const r = RS(5); let cr = ''; for (let i = 0; i < 260; i++) { const x = 90 + r() * 560, y = kmY(5.4 + r() * 11.2), a = r() * 180, w = 4 + r() * 10; cr += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(w * .5).toFixed(1)}" fill="${['#d8d0c4', '#8a8478', '#5a524a', '#b8b0a4'][i % 4]}" transform="rotate(${a.toFixed(0)},${x.toFixed(1)},${y.toFixed(1)})" opacity="${(.35 + .5 * solid).toFixed(2)}"/>`; }
  s += `<defs><clipPath id="lensC"><path d="${lens}"/></clipPath></defs><g clip-path="url(#lensC)">${cr}` + Array.from({ length: 14 }, (_, i) => { const q = RS(i + 400), x = 110 + q() * 500, y = kmY(6 + q() * 10); return `<ellipse cx="${x}" cy="${y}" rx="${10 + q() * 26}" ry="${5 + q() * 9}" fill="#ffc050" opacity="${((.55 + .25 * Math.sin(t * 2 + i)) * (1 - solid * .55)).toFixed(2)}" filter="url(#blur2)"/>`; }).join('') + `</g>`;
  s += `<path d="${lens}" fill="none" stroke="#ffd080" stroke-width="2" opacity="${.5 * (1 - solid)}"/>`;
  // hot water rising to the geysers
  [[150, 4], [400, 5], [560, 4.4]].forEach(([x, d], i) => { s += `<path d="M${x},${kmY(d)} q-14,-${(kmY(d) - Y0) * .4} 6,-${(kmY(d) - Y0) * .7} t-4,-${(kmY(d) - Y0) * .3}" stroke="#7ac8f0" stroke-width="3" fill="none" stroke-dasharray="10 8" stroke-dashoffset="${-t * 40}" opacity=".75"/>`; });
  s += geyser(150, Y0 + 2, 110, t, 1) + `<ellipse cx="400" cy="${Y0 + 2}" rx="60" ry="8" fill="#22a2c4"/><ellipse cx="400" cy="${Y0 + 2}" rx="70" ry="11" fill="none" stroke="#e8962a" stroke-width="5"/>`;
  // depth ruler
  s += `<path d="M30,${Y0} L30,${kmY(30)}" stroke="#fff" stroke-width="2" opacity=".7"/>` + [0, 5, 17, 30].map(d => `<path d="M24,${kmY(d)} h14" stroke="#fff" stroke-width="2"/>` + lbl(46, kmY(d) + 8, `${AR(d)} كم`, .9, '#fff', 20, 'start')).join('');
  return s;
}
// 1: under the park: the magma reservoir; three past super-eruptions in the side list
function sceneCross(t) { let s = crossSection(t); F.ov = ''; return s; }
// 2: 640,000 years ago: the eruption, then the scale – 1,000 km³ is a cube 10 km on a side, taller than Everest
function cubeIso(x, yb, sz, hk, t) {
  const h = sz * hk, dx = sz * .3, dy = sz * .2;
  return `<path d="M${x},${yb} L${x + sz},${yb} L${x + sz},${yb - h} L${x},${yb - h}Z" fill="#6a645c"/><path d="M${x},${yb} L${x + sz},${yb} L${x + sz},${yb - h} L${x},${yb - h}Z" fill="#000" filter="url(#grainR)" opacity=".5"/>` +
    `<path d="M${x + sz},${yb} L${x + sz + dx},${yb - dy} L${x + sz + dx},${yb - dy - h} L${x + sz},${yb - h}Z" fill="#3e3a34"/><path d="M${x},${yb - h} L${x + sz},${yb - h} L${x + sz + dx},${yb - h - dy} L${x + dx},${yb - h - dy}Z" fill="#9a948a"/>` +
    `<path d="M${x},${yb - h} L${x + sz},${yb - h} L${x + sz + dx},${yb - h - dy}" stroke="#d8d2c8" stroke-width="2" fill="none" opacity=".7"/>`;
}
function sceneLava(t) {
  const st = S0(2) - .2, kc = ease(ramp(t, WS(2, 6) - .3, WS(2, 6) + .3)), boom = ease(ramp(t, st, st + 2.2)), hk = ease(ramp(t, WS(2, 8) - .2, WS(2, 10) + .3));
  let s = `<defs>${RDEF}${RDEF2}${CFDEF}<linearGradient id="skL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a3a"/><stop offset=".7" stop-color="#7a5a4a"/><stop offset="1" stop-color="#c88a5a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skL)"/>`;
  s += `<g opacity="${1 - kc}">` + ashColumn(360, 900, 560, 120, t, boom, 7, ease(ramp(t, st + 1.2, st + 3.5))) + `</g>`;
  s += mountains(910, 140, 91, '#6a5a4c', '#1e1612', 6) + `<path d="M-20,930 Q200,910 360,920 T740,915 L740,1290 L-20,1290Z" fill="#7a6a52"/><path d="M-20,930 Q200,910 360,920 T740,915 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".45"/>`;
  s += `<g opacity="${1 - kc}">` + pyroFlow(360, 930, t, boom, 3, 360) + `</g>`;
  // the scale: Everest (8.8 km) beside a cube of 10 km
  if (kc > 0) { const yb = 1100, px = 33, sz = 10 * px, ev = 8.85 * px;
    s += `<g opacity="${kc}"><rect width="720" height="1280" fill="#1a1a24" opacity=".55"/>` +
      `<path d="M470,${yb} L560,${yb - ev * .62} L600,${yb - ev} L640,${yb - ev * .8} L700,${yb - ev * .45} L740,${yb}Z" fill="#7a8290"/><path d="M600,${yb - ev} L640,${yb - ev * .8} L700,${yb - ev * .45} L740,${yb} L620,${yb}Z" fill="#2e3440" opacity=".8"/><path d="M566,${yb - ev * .66} L600,${yb - ev} L630,${yb - ev * .84} L612,${yb - ev * .7} L592,${yb - ev * .76}Z" fill="#f2f5fa"/>` +
      `<path d="M470,${yb} L560,${yb - ev * .62} L600,${yb - ev} L640,${yb - ev * .8} L700,${yb - ev * .45} L740,${yb}Z" fill="#000" filter="url(#grainR)" opacity=".3"/>` + `<path d="M604,${yb - ev} h40" stroke="#cfe0ff" stroke-width="2" stroke-dasharray="4 4"/>` +
      cubeIso(30, yb, sz, hk, t) + `<rect y="${yb}" width="720" height="${1290 - yb}" fill="#4a4038"/>` +
      lbl(30 + sz / 2, yb - sz * hk / 2 + 12, `${AR(1000)} كم³`, hk, '#fff', 40) + lbl(30 + sz / 2, yb + 44, `${AR(10)} كم`, hk) + `<path d="M30,${yb + 14} h${sz}" stroke="#fff" stroke-width="2" opacity="${hk}"/>` +
      `<path d="M${26},${yb} v${-sz * hk}" stroke="#f4c76b" stroke-width="3"/>` + lbl(605, yb + 44, 'إيفرست ٨٫٨ كم', 1, '#cfe0ff', 22) + `</g>`; }
  F.ov = ''; return s;
}
// 3: today, seen from a hilltop road ~100 km away: the column punches past 30 km – three times airliner height; umbrella cloud, lightning, pyroclastic flows
function sceneErupt(t) {
  const b = WS(3, 1), k = ease(ramp(t, b, b + 3.4)), um = ease(ramp(t, b + 2.6, b + 7)), dk = ease(ramp(t, b + 1.5, b + 7)), kmPx = 18, yg = 900;
  let s = `<defs>${RDEF}${RDEF2}${CFDEF}<linearGradient id="skE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#4a7ac0', '#3a3430', dk)}"/><stop offset=".7" stop-color="${mix('#9ac0e0', '#7a6a5a', dk)}"/><stop offset="1" stop-color="${mix('#e8dcc8', '#c89a6a', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skE)"/>`;
  s += ashColumn(330, yg, 32 * kmPx, 110, t, k, 11, um);
  s += pyroFlow(330, yg - 6, t, ease(ramp(t, b + 1, b + 5)), 5, 340);
  s += mountains(yg + 10, 90, 92, mix('#7a8a96', '#5a5a5e', dk), '#2a2e34', 7, .4) + forestRow(yg + 40, 40, 50, 80, 8, mix('#2e4a32', '#3a3a34', dk), .1) + forestRow(yg + 90, 30, 80, 120, 9, mix('#24401f', '#2e2e28', dk), 0);
  s += `<path d="M-20,1010 Q200,980 360,1000 T740,990 L740,1290 L-20,1290Z" fill="${mix('#8a8a5a', '#6a6252', dk)}"/><path d="M-20,1010 Q200,980 360,1000 T740,990 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".4"/>`;
  s += `<path d="M120,1290 L330,1010 L370,1010 L640,1290Z" fill="#3a3a3e"/><path d="M350,1012 L350,1040 M352,1070 L356,1120 M360,1160 L368,1240" stroke="#e8e0c8" stroke-width="4"/>` + car(470, 1180, .75, '#c8c8cc', -1, 0) + onWalk(560, 1200, CROWD[1], .6, -1, t, { lookUp: .7 });
  // altitude ruler on the right with an airliner at ~10 km
  const al = ramp(t, b + 1.6, b + 2.2), ya = km => yg - km * kmPx;
  s += `<g opacity="${al}"><path d="M690,${yg} L690,${ya(34)}" stroke="#fff" stroke-width="2"/>` + [10, 20, 30].map(km => `<path d="M682,${ya(km)} h16" stroke="#fff" stroke-width="2"/>` + lbl(676, ya(km) + 8, `${AR(km)} كم`, 1, '#fff', 20, 'end')).join('') +
    `<g transform="translate(${560 + Math.sin(t * .3) * 10},${ya(10)}) scale(.28)">${airliner()}</g>` + lbl(560, ya(10) + 46, 'الطائرات', ramp(t, WS(3, 12) - .2, WS(3, 12) + .2), '#f4c76b', 22) + `</g>`;
  F.ov = ''; F.flash = t > b && t < b + .5 ? .5 * (1 - (t - b) / .5) : 0; return s;
}
// 4: the 3D Earth over North America: an ash blanket spreads from the pin; >1 m near the volcano, centimetres in the middle of the continent
const EA = { x: 360, y: 790, r: 330, sunI: 1.05, lights: .1, rot: .3 - 30 * .004, xr: .66, tilt: 0, spin: .004 };
function sceneAshMap(t) {
  const ka = ease(ramp(t, WS(4, 0), WS(4, 4) + .6));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = Object.assign({ a: 1 - ka }, EA); F.moon = Object.assign({ a: ka }, EA); F.light = [300, 700];
  const [px, py] = geoXY(YL[0], YL[1], EA, t), [mx, my] = geoXY(39.5, -92, EA, t), p = ease(ramp(t, S0(4), S0(4) + 3.5));
  F.ov = pin(px, py, t) + `<ellipse cx="${px + 60 * p}" cy="${py + 10 * p}" rx="${30 + 300 * p}" ry="${20 + 180 * p}" fill="none" stroke="#e8e4dc" stroke-width="3" opacity="${(.7 * (1 - p)).toFixed(2)}"/>` +
    `<g opacity="${ramp(t, WS(4, 6) - .2, WS(4, 6) + .2)}"><path d="M${px},${py} L${px - 40},${py - 90}" stroke="#fff" stroke-width="2"/>` + lbl(px - 40, py - 100, 'أكثر من متر', 1, '#fff', 28) + `</g>` +
    `<g opacity="${ramp(t, WS(4, 11) - .2, WS(4, 11) + .2)}"><circle cx="${mx}" cy="${my}" r="6" fill="#fff"/><path d="M${mx},${my} L${mx + 30},${my + 90}" stroke="#fff" stroke-width="2"/>` + lbl(mx + 30, my + 122, 'بضعة سنتيمترات', 1, '#fff', 28) + `</g>`;
  return s;
}
// 5: volcanic ash is pulverised rock and glass: a microscope view of jagged shards; then an airport under falling ash – flights cancelled – and grey, flattened crops
function sceneGlass(t) {
  const ins = 1 - ease(ramp(t, WS(5, 3) - .4, WS(5, 3) + .1)), brd = ramp(t, WS(5, 3), WS(5, 3) + .3), crp = ramp(t, WS(5, 5) - .2, WS(5, 5) + .3);
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a645c"/><stop offset="1" stop-color="#b8b0a2"/></linearGradient><radialGradient id="micG"><stop offset="0" stop-color="#2a3038"/><stop offset="1" stop-color="#0a0c10"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skG)"/>`;
  // terminal and tower
  s += `<rect x="-20" y="720" width="760" height="140" fill="#8a8a8e"/><rect x="-20" y="740" width="760" height="70" fill="#3a4a5a" opacity=".85"/>` + Array.from({ length: 24 }, (_, q) => `<path d="M${q * 32},740 v70" stroke="#6a6a70" stroke-width="3"/>`).join('') + `<rect x="-20" y="716" width="760" height="8" fill="#c8c4bc"/>`;
  s += `<rect x="580" y="520" width="34" height="200" fill="#9a9aa0"/><path d="M560,520 L634,520 L624,470 L570,470Z" fill="#3a4a5a"/><rect x="556" y="462" width="82" height="10" fill="#c8c4bc"/>`;
  s += `<rect y="860" width="720" height="430" fill="#8e8a84"/><rect y="860" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M-20,1010 L740,980" stroke="#d8d0a0" stroke-width="4" stroke-dasharray="30 20" opacity=".4"/>`;
  s += `<g transform="translate(330,960) scale(1.15)"><path d="M140,14 L140,40 M-30,14 L-30,40 M-50,14 L-50,40" stroke="#5a5a60" stroke-width="4"/><circle cx="140" cy="44" r="6" fill="#1a1a1a"/><circle cx="-30" cy="44" r="8" fill="#1a1a1a"/><circle cx="-50" cy="44" r="8" fill="#1a1a1a"/><ellipse cx="0" cy="52" rx="220" ry="8" fill="#000" opacity=".3"/>${airliner()}</g><path d="M${330 - 225},${960 - 30} L${330 + 175},${960 - 30}" stroke="#c8c4bc" stroke-width="7" stroke-linecap="round"/><path d="M${330 - 228},${960 - 27} Q${330 - 120},${960 - 36} ${330 + 60},${960 - 30}" stroke="#d8d4cc" stroke-width="5" fill="none"/>`;
  // departures board
  s += `<g opacity="${brd}" transform="translate(40,380)"><rect width="300" height="230" rx="10" fill="#101418"/><text x="150" y="36" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b">المغادرة</text>` +
    ['لندن', 'طوكيو', 'دبي', 'باريس', 'نيويورك'].map((c, q) => `<text x="280" y="${76 + q * 34}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">${c}</text><text x="20" y="${76 + q * 34}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#ff5a4a">ملغاة</text>`).join('') + `</g>`;
  // crops in the foreground, grey and bent under the ash
  s += `<g opacity="${.3 + .7 * crp}">`; for (let i = 0; i < 26; i++) { const x = -10 + i * 29, h = 150 + (i % 3) * 20, bend = 20 + 18 * Math.sin(i); s += `<path d="M${x},1290 q${bend * .3},-${h * .5} ${bend},-${h}" stroke="#7a786c" stroke-width="6" fill="none"/>` + [.35, .55, .75].map((u, q) => `<path d="M${x + bend * u * u},${1290 - h * u} q${q % 2 ? 30 : -30},10 ${q % 2 ? 50 : -46},44" stroke="#8a887c" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${x + bend * u * u},${1290 - h * u} q${q % 2 ? 30 : -30},10 ${q % 2 ? 50 : -46},44" stroke="#c8c4b8" stroke-width="2" fill="none" opacity=".6"/>`).join(''); } s += `</g>`;
  // falling ash
  for (let i = 0; i < 140; i++) { const r = RS(i + 3), z = r(), x = pmod(r() * 760 + t * 12 * z, 760) - 20, y = pmod(r() * 1300 + t * (25 + 50 * z), 1300) - 20; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.6 + 2.4 * z).toFixed(1)}" fill="${z > .5 ? '#d8d4cc' : '#9a968e'}" opacity="${(.4 + .5 * z).toFixed(2)}"/>`; }
  s += `<rect width="720" height="1280" fill="#8a8478" opacity=".18"/>`;
  // microscope inset
  if (ins > 0) { const sc = .6 + .4 * ins; s += `<g opacity="${ins}" transform="translate(360,650) scale(${sc})"><circle r="230" fill="url(#micG)"/>`; const r = RS(901);
    for (let i = 0; i < 14; i++) { const cx = (r() - .5) * 300, cy = (r() - .5) * 300, n = 5 + Math.floor(r() * 3), R = 26 + r() * 46, rot = r() * 6; let d = ''; for (let q = 0; q < n; q++) { const a = rot + q / n * Math.PI * 2 + (r() - .5) * .6, rr = R * (.4 + .8 * r()); d += (q ? ' L' : 'M') + (cx + Math.cos(a) * rr).toFixed(1) + ',' + (cy + Math.sin(a) * rr * .8).toFixed(1); }
      if (Math.hypot(cx, cy) < 190) s += `<path d="${d}Z" fill="#c8d4dc" opacity=".55" stroke="#f4faff" stroke-width="2"/><path d="${d}Z" fill="#fff" opacity=".15" transform="translate(-3,-3)"/>`; }
    for (let i = 0; i < 4; i++) { const cx = (r() - .5) * 220, cy = (r() - .5) * 220; s += `<circle cx="${cx}" cy="${cy}" r="${10 + r() * 14}" fill="none" stroke="#e8f0f4" stroke-width="2" opacity=".6"/>`; }
    s += `<circle r="230" fill="none" stroke="#d8d4cc" stroke-width="12"/><circle r="236" fill="none" stroke="#2a2a2e" stroke-width="4"/>` + lbl(0, 270, 'رماد بركاني تحت المجهر', 1, '#fff', 26) + `</g>`; }
  F.ov = ''; return s;
}
// 6: sulphur gases reach the stratosphere and wrap the whole planet in a thin veil that bounces sunlight back to space
const EV = { x: 440, y: 800, r: 260, sunI: 1, lights: .2, rot: .9, tilt: .41 };
function sceneVeil(t) {
  const v = ease(ramp(t, WS(6, 2) - .2, WS(6, 9) + .3)), rf = ease(ramp(t, WS(6, 10) - .2, WS(6, 10) + .4));
  let s = space(t, '#03050f', '#0a1030');
  F.sun = { x: -40, y: 470, r: 150, a: 1 }; F.earth = Object.assign({ a: 1 }, EV); F.light = [-40, 470];
  let o = `<defs><radialGradient id="veilG" cx=".5" cy=".5" r=".5"><stop offset=".86" stop-color="#fff8e0" stop-opacity="0"/><stop offset=".95" stop-color="#fff4d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff4d0" stop-opacity="0"/></radialGradient></defs>`;
  o += `<circle cx="${EV.x}" cy="${EV.y}" r="${EV.r * 1.1}" fill="url(#veilG)" opacity="${v}"/><circle cx="${EV.x}" cy="${EV.y}" r="${EV.r}" fill="#f4ecd8" opacity="${.22 * v}"/>`;
  for (let q = 0; q < 6; q++) { const lat = -.7 + q * .28, ry = EV.r * Math.cos(lat) * .32, cy = EV.y - EV.r * Math.sin(lat) * .9; o += `<ellipse cx="${EV.x}" cy="${cy}" rx="${EV.r * Math.cos(lat)}" ry="${ry}" fill="none" stroke="#fff6e0" stroke-width="${3 + 2 * Math.cos(lat)}" stroke-dasharray="${40 + q * 6} ${30 + q * 4}" stroke-dashoffset="${-t * (30 + q * 6)}" opacity="${(.35 * v * ramp(t, WS(6, 2) + q * .4, WS(6, 2) + q * .4 + .6)).toFixed(2)}"/>`; }
  // sunbeams: some reach the ground, some are bounced back by the veil
  for (let q = 0; q < 5; q++) { const yy = EV.y - 170 + q * 85, hx = EV.x - Math.sqrt(Math.max(0, (EV.r * 1.08) ** 2 - (yy - EV.y) ** 2)), bounce = q % 2 === 0;
    o += `<path d="M110,${470 + (yy - 470) * .3} L${hx},${yy}" stroke="#ffd060" stroke-width="4" opacity=".8" stroke-dasharray="16 10" stroke-dashoffset="${-t * 60}"/>`;
    if (bounce) o += `<path d="M${hx},${yy} L${hx - 120},${yy - 110}" stroke="#ffd060" stroke-width="4" opacity="${.85 * rf}" marker-end="url(#arrW)"/><path d="M${hx - 104},${yy - 108} L${hx - 120},${yy - 110} L${hx - 116},${yy - 94}" stroke="#ffd060" stroke-width="4" fill="none" opacity="${.85 * rf}"/>`; }
  F.ov = o; return s;
}
// 7: volcanic winter: frost on farms on every continent – wheat in North America, rice terraces in Asia, maize in Africa
function farmStrip(y0, h, kind, name, t, fr) {
  let s = `<g><defs><clipPath id="fs${kind}"><rect y="${y0}" width="720" height="${h}"/></clipPath></defs><g clip-path="url(#fs${kind})">`;
  s += `<rect y="${y0}" width="720" height="${h * .42}" fill="${mix('#8aa8c8', '#9a9a9c', fr)}"/><circle cx="560" cy="${y0 + 50}" r="16" fill="#fff8e8" opacity="${1 - .5 * fr}"/><circle cx="560" cy="${y0 + 50}" r="60" fill="#fff4e0" opacity="${.25 * (1 - fr)}" filter="url(#soft)"/>`;
  const gy = y0 + h * .42, col = kind === 'w' ? ['#c8a84a', '#a88a3a'] : kind === 'r' ? ['#6aa83a', '#4a8a2a'] : ['#5a8a32', '#3a6a22'];
  s += mountains(gy + 4, h * .18, 100 + y0, mix('#7a8aa0', '#8a8a8e', fr), '#2e3440', 6, fr * .5);
  s += `<rect y="${gy}" width="720" height="${h * .58}" fill="${mix(mix(col[1], '#2a2418', .45), '#6a6458', fr * .5)}"/>`;
  for (let q = 0; q < 16; q++) { const u = q / 15, yy = gy + 6 + Math.pow(u, 1.6) * (h * .58 - 6), sp = 10 + 40 * u; for (let x = -10; x < 740; x += sp) { const hh = (8 + 60 * u * u) * (kind === 'r' ? .55 : 1), bend = fr * hh * .4;
      s += kind === 'r' ? `<path d="M${x},${yy} l${2 + bend * .3},-${hh}" stroke="${mix(col[0], '#a89a7a', fr)}" stroke-width="${1 + 1.4 * u}"/>` : `<path d="M${x},${yy} q${bend * .4},-${hh * .6} ${bend},-${hh}" stroke="${mix(col[0], '#8a8270', fr * .8)}" stroke-width="${1.6 + 3 * u}" fill="none"/>${kind === 'w' ? `<ellipse cx="${x + bend}" cy="${yy - hh}" rx="${1 + 1.4 * u}" ry="${2.5 + 4 * u}" fill="${mix('#e8c860', '#a89a7a', fr)}"/>` : ''}`; } }
  if (kind === 'r') for (let q = 0; q < 5; q++) { const yy = gy + 20 + q * (h * .11); s += `<path d="M-20,${yy} Q360,${yy - 10} 740,${yy}" stroke="${mix('#8ac8e8', '#e8f0f4', fr)}" stroke-width="${3 + q}" fill="none" opacity=".7"/>`; }
  s += `<rect y="${gy}" width="720" height="${h * .58}" fill="#fff" filter="url(#stainD)" opacity="${.35 * fr}"/><rect y="${gy}" width="720" height="${h * .58}" fill="#f4f8fc" opacity="${.1 * fr}"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + y0), x = pmod(r() * 760 + t * 10, 760), yy = y0 + pmod(r() * h + t * 30, h); s += `<circle cx="${x}" cy="${yy}" r="${1 + r() * 2}" fill="#fff" opacity="${.8 * fr}"/>`; }
  s += `</g><rect y="${y0}" width="720" height="${h}" fill="none" stroke="#000" stroke-width="4"/>` + `<rect x="16" y="${y0 + 14}" width="${name.length * 13 + 34}" height="40" rx="10" fill="#0a0e1c" opacity=".7"/>` + lbl(33 + name.length * 6.5, y0 + 42, name, 1, '#fff', 22) + `</g>`;
  return s;
}
function sceneWinter(t) {
  const fr = ease(ramp(t, S0(7), WS(7, 4) + .5));
  let s = `<defs>${RDEF}${RDEF2}</defs><rect width="720" height="1280" fill="#1a1e26"/>`;
  s += farmStrip(380, 290, 'w', 'أمريكا الشمالية', t, fr) + farmStrip(670, 290, 'r', 'آسيا', t, ease(ramp(t, S0(7) + .5, WS(7, 4) + 1))) + farmStrip(960, 300, 'm', 'أفريقيا', t, ease(ramp(t, S0(7) + 1, WS(7, 4) + 1.5)));
  F.ov = ''; return s;
}
// 8: Tambora, 1815 (an old-engraving look), then the summer of 1816: snow on a European village in June
function sceneTambora(t) {
  const k2 = ease(ramp(t, WS(8, 13) - .5, WS(8, 13) + .1));
  let s = `<defs>${RDEF}${RDEF2}${CFDEF}<filter id="sepia" x="0" y="0" width="100%" height="100%"><feColorMatrix type="matrix" values=".39 .77 .19 0 0  .35 .69 .17 0 0  .27 .53 .13 0 0  0 0 0 1 0"/></filter></defs>`;
  // A: the island volcano erupting over the sea, a sailing ship
  if (k2 < 1) { const b = ease(ramp(t, WS(8, 6) - .3, WS(8, 6) + 2.5)); s += `<g opacity="${1 - k2}" filter="url(#sepia)"><rect width="720" height="1280" fill="#b8c8d8"/>` + ashColumn(380, 818, 480, 120, t, .3 + .7 * b, 21, ease(ramp(t, WS(8, 6) + 1, WS(8, 6) + 4))) +
      `<path d="M150,900 L330,820 L380,812 L430,822 L600,900Z" fill="#5a5048"/><path d="M380,812 L430,822 L600,900 L420,900Z" fill="#2a241e" opacity=".6"/><rect y="890" width="720" height="400" fill="#4a6a7a"/>` + Array.from({ length: 30 }, (_, q) => { const yy = 900 + Math.pow(q / 29, 1.6) * 380; return `<path d="M-20,${yy} q90,-4 180,0 t180,0 t180,0 t180,0" stroke="#2a3a44" stroke-width="${1 + q * .08}" fill="none" opacity=".5"/>`; }).join('') +
      `<g transform="translate(${170 + t * 4},1060)"><path d="M-70,0 L70,0 L56,22 L-56,22Z" fill="#3a2a1e"/><path d="M-10,0 L-10,-130 M30,0 L30,-110" stroke="#2a1e14" stroke-width="4"/><path d="M-10,-124 Q30,-80 -8,-30Z M30,-104 Q62,-70 32,-28Z" fill="#e8e0cc"/></g>` +
      `<rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".25"/></g>` + lbl(360, 1200, 'تامبورا، إندونيسيا — ١٨١٥', 1 - k2, '#fff', 30); }
  // B: 1816 – the year without a summer
  if (k2 > 0) { let v = `<rect width="720" height="1280" fill="#9aa4ae"/>` + mountains(860, 120, 111, '#8a92a0', '#3a404c', 6, .2);
    v += `<rect y="860" width="720" height="430" fill="#eef2f6"/><rect y="860" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
    [[60, 930, 130, 110], [230, 950, 110, 95], [520, 940, 140, 105]].forEach(([x, y, w, h], q) => { v += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#e8dcc4"/>` + [0, 1, 2].map(p => `<path d="M${x + p * w / 3},${y - h} L${x + p * w / 3},${y}" stroke="#5a3a22" stroke-width="5"/>`).join('') + `<path d="M${x},${y - h * .5} L${x + w},${y - h * .5}" stroke="#5a3a22" stroke-width="5"/><path d="M${x - 14},${y - h} L${x + w / 2},${y - h - 70} L${x + w + 14},${y - h}Z" fill="#6a3a2a"/><path d="M${x - 14},${y - h} L${x + w / 2},${y - h - 70} L${x + w + 14},${y - h} L${x + w + 8},${y - h + 8} L${x + w / 2},${y - h - 58} L${x - 8},${y - h + 8}Z" fill="#f6f8fa"/><rect x="${x + w * .4}" y="${y - h * .4}" width="${w * .22}" height="${h * .4}" fill="#3a2a1e"/>`; });
    v += `<rect x="420" y="780" width="60" height="170" fill="#d8ccb4"/><path d="M414,780 L450,660 L486,780Z" fill="#4a4a52"/><path d="M414,780 L450,660 L486,780 L476,780 L450,690 L424,780Z" fill="#f4f6f8"/><rect x="440" y="700" width="18" height="18" fill="#2a2a2e"/><path d="M450,660 v-24 M440,646 h20" stroke="#4a4a52" stroke-width="4"/>`;
    for (let q = 0; q < 14; q++) { const x = -10 + q * 54; v += `<path d="M${x},1080 l6,-50 M${x + 10},1080 l-2,-46 M${x + 20},1080 l8,-40" stroke="#6a7a4a" stroke-width="3"/><path d="M${x},1052 l20,0" stroke="#fff" stroke-width="5"/>`; }
    v += onWalk(300, 1150, CROWD[2], .62, 1, t, { coat: 1, hat: 1, scarf: '#5a3a2a', lookUp: .3, breath: 1 });
    for (let i = 0; i < 110; i++) { const r = RS(i + 3), z = r(), x = pmod(r() * 760 + Math.sin(t + i) * 15, 760) - 20, y = pmod(r() * 1300 + t * (30 + 60 * z), 1300) - 20; v += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + 3 * z).toFixed(1)}" fill="#fff" opacity="${(.5 + .5 * z).toFixed(2)}"/>`; }
    v += `<g transform="translate(360,470)"><rect x="-130" y="-110" width="260" height="210" rx="10" fill="#f6f2e8"/><rect x="-130" y="-110" width="260" height="56" rx="10" fill="#8a2a22"/><rect x="-130" y="-70" width="260" height="16" fill="#8a2a22"/><text x="0" y="-72" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">يونيو</text><text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="76" fill="#1a1a1a">${AR(1816)}</text><text x="0" y="86" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#8a2a22">❄ سنة بلا صيف</text></g>`;
    s += `<g opacity="${k2}" filter="url(#sepia)">${v}</g><rect width="720" height="1280" fill="#7a9ab8" opacity="${.12 * k2}"/>`; }
  F.ov = ''; return s;
}
// 9: the good news: the reservoir is mostly crystal mush (only a small fraction molten); the yearly odds of a super-eruption are below 1 in 700,000
function sceneGood(t) { const sd = ease(ramp(t, WS(9, 2) - .3, WS(9, 7) + .3)); let s = crossSection(t, { solid: sd }); F.ov = ''; return s; }
// 10: scientists watch it every day: a GPS station and a seismometer in the park, a live seismogram
function sceneWatch(t) {
  let s = parkScene(t, { id: 'w', geyser: .7 });
  s += `<rect width="720" height="1280" fill="#000" opacity=".15"/>`;
  s += `<g transform="translate(470,1150)"><path d="M-40,0 L0,-150 L40,0 M0,-150 L0,0" stroke="#d8d8dc" stroke-width="5" fill="none"/><ellipse cx="0" cy="-160" rx="34" ry="10" fill="#f4f4f4"/><rect x="-6" y="-176" width="12" height="16" fill="#e8e8e8"/><rect x="50" y="-90" width="90" height="56" fill="#1e3a6a" transform="rotate(-20,95,-62)"/><path d="M60,-40 L60,0 M130,-60 L130,0" stroke="#9a9aa0" stroke-width="4"/><rect x="-80" y="-36" width="50" height="36" fill="#e8e0c8"/><text x="-55" y="-12" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="14" fill="#333">GPS</text></g>`;
  s += onWalk(330, 1180, CROWD[0], .62, 1, t, { lookUp: .1 }) + `<g transform="translate(64,960)"><rect width="300" height="150" rx="14" fill="#0a0e1c" opacity=".85"/><path d="M20,75 ` + Array.from({ length: 60 }, (_, q) => `L${20 + q * 4.4},${75 + Math.sin(q * 1.7 + t * 9) * (q > 30 && q < 38 ? 26 : 6) * (0.6 + .4 * Math.sin(q))}`).join(' ') + `" stroke="#5ae07a" stroke-width="2.5" fill="none"/>` + lbl(150, 140, 'رصد الزلازل', 1, '#cfd8ff', 18) + `</g>`;
  F.ov = ''; return s;
}
// 11: CTA – the 3D Earth with the pin on Yellowstone
const EC = { x: 360, y: 760, r: 250, sunI: 1, lights: .3, rot: .45 - 74.5 * .02, xr: .55, tilt: 0, spin: .02 };
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 4) - .2, WS(10, 4) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = Object.assign({ a: 1 }, EC); F.light = [200, 600]; F.moon = null;
  const [px, py, pz] = geoXY(YL[0], YL[1], EC, t);
  F.ov = (pz > 0 ? pin(px, py, t) : '') + `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8), WS(10, 8) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCross }, { s: S0(2) - .2, f: sceneLava }, { s: S0(3) - .2, f: sceneErupt }, { s: S0(4) - .2, f: sceneAshMap },
  { s: S0(5) - .2, f: sceneGlass }, { s: S0(6) - .2, f: sceneVeil }, { s: S0(7) - .2, f: sceneWinter }, { s: S0(8) - .2, f: sceneTambora },
  { s: S0(9) - .2, f: sceneGood }, { s: S0(10) - .2, f: sceneWatch }, { s: WS(10, 4) - .3, f: sceneEarth },
];
const NOKB = new Set([sceneAshMap, sceneVeil]);
const XF = .5;
const TLI = [['٢٫١ مليون سنة', WS(1, 11)], ['١٫٣ مليون سنة', WS(1, 12)], ['٦٤٠ ألف سنة', WS(1, 14)]];
const LIST_ON = new Set([sceneCross, sceneLava]), LIST_T0 = WS(1, 9) - .2;
const CHIPS = [
  ['c1', 'يلوستون — أمريكا', 360, 330, '', WS(1, 2), WS(1, 5) + .2],
  ['c2', 'خزّان الصهارة', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c3', 'قبل ٦٤٠ ألف سنة', 360, 1190, 'big', WS(2, 2), WS(2, 7)],
  ['c4', 'ثلاثة أضعاف ارتفاع الطائرات', 300, 1075, 'big', WS(3, 10), S0(4) - .3],
  ['c5', 'ستار من الكبريت', 360, 330, 'big', WS(6, 9), S0(7) - .3],
  ['c6', 'شتاء بركاني', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c7', 'معظمها شبه صلب', 360, 330, 'big', WS(9, 6), WS(9, 8)],
  ['c8', 'أقل من ١ في ٧٠٠ ألف سنوياً', 360, 330, 'red', WS(9, 14), S0(10) - .3],
  ['c9', 'العلماء يراقبونه يومياً', 360, 330, 'big', WS(10, 0), WS(10, 4) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:200px"><div class="hd">انفجارات سابقة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, LIST_T0, LIST_T0 + .4)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
