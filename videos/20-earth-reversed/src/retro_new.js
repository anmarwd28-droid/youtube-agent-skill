
// ===================== "what if Earth spun the other way?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFT = () => `${RDEF}${RDEF2}${CUDEF}`;
function geoXY(lat, lon, e, t) {
  const phi = (lon + 180) * Math.PI / 180, th = (90 - lat) * Math.PI / 180;
  const x = -Math.cos(phi) * Math.sin(th), y = Math.cos(th), z = Math.sin(phi) * Math.sin(th);
  const a = (e.rot ?? .6) + t * (e.spin ?? .03), b = e.xr ?? 0;
  const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a);
  const y2 = y * Math.cos(b) - z1 * Math.sin(b), z2 = y * Math.sin(b) + z1 * Math.cos(b);
  return [e.x + e.r * x1, e.y - e.r * y2, z2];
}
const rotFor = lon => (-90 - lon) * Math.PI / 180;
// the planet slows, stops and turns the other way (angle of spin as a function of time)
function spinAng(t) { if (t <= .9) return .6 * t; if (t <= 1.6) { const d = t - .9; return .54 + .6 * d - .6 * d * d / .7; } return .54 - .6 * (t - 1.6); }
function spinArrow(cx, cy, R, dir, a = 1, col = '#f4c76b') {
  const y = cy - R * .2, x0 = cx - R * .75, x1 = cx + R * .75, ah = dir > 0 ? [x1, y + R * .06] : [x0, y + R * .06];
  const d = `M${x0},${y} Q${cx},${y + R * .3} ${x1},${y}`;
  return `<g opacity="${a}"><path d="${d}" stroke="#000" stroke-width="12" fill="none" opacity=".35"/><path d="${d}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<path d="M${ah[0] - dir * 26},${ah[1] - 18} L${ah[0] + dir * 4},${ah[1] - 2} L${ah[0] - dir * 30},${ah[1] + 14}" stroke="${col}" stroke-width="7" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g>`;
}
// 0–1: the real Earth turns, slows, stops and spins the other way – and has always done so
function sceneSpin(t) {
  const ang = spinAng(t), dir = t < 1.25 ? 1 : -1, rv = ease(ramp(t, 1.0, 1.5));
  let s = space(t, '#03050f', '#0a1030');
  const E = { x: 360, y: 770, r: 290, a: 1, sunI: 1, lights: .4, rot: rotFor(20) + ang, spin: 0, tilt: .41 };
  F.earth = E; F.light = [-300, 500]; F.moon = null; F.sun = null;
  F.ov = spinArrow(360, 770 - 290 - 70, 300, dir, 1, dir > 0 ? '#9ac8ff' : '#f4c76b') + lbl(360, 1130, dir > 0 ? 'الاتجاه الحقيقي' : 'بالعكس', 1, dir > 0 ? '#cfe4ff' : '#f4c76b', 30) + `<circle cx="360" cy="770" r="296" fill="none" stroke="#f4c76b" stroke-width="${6 * (1 - Math.abs(rv - .5) * 2)}" opacity=".6"/>`;
  return s;
}
// 2: sunrise in the WEST over a city: dawn sky, real mountains, a lit skyline, a meadow; the sun's path arcs over to set in the east
function sceneSunrise(t) {
  const st = S0(2) - .2, k = ease(ramp(t, st, WS(2, 6) + .8)), arc = ramp(t, WS(2, 7) - .2, WS(2, 9) + .4), sy = lerp(960, 730, k);
  let s = `<defs>${DEFT()}<linearGradient id="skS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#0e1a3a', '#3a6ab0', k)}"/><stop offset=".6" stop-color="${mix('#4a3a5a', '#e8a070', k)}"/><stop offset="1" stop-color="${mix('#c8705a', '#ffd8a0', k)}"/></linearGradient><radialGradient id="dawnG" cx="0" cy="1" r="1"><stop offset="0" stop-color="#ffb070" stop-opacity=".75"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skS)"/>` + stars(.6 * (1 - k), t);
  s += `<ellipse cx="150" cy="940" rx="520" ry="420" fill="url(#dawnG)" opacity="${.4 + .5 * k}"/>` + cumulus(470, 620, 230, 4, { a: .75 }) + cumulus(180, 520, 180, 5, { a: .6 });
  s += `<circle cx="150" cy="${sy}" r="34" fill="#fff4d8"/><circle cx="150" cy="${sy}" r="110" fill="#ffd8a0" opacity=".45" filter="url(#soft)"/>` + Array.from({ length: 10 }, (_, i) => { const a = -Math.PI * (.08 + i * .085); return `<path d="M${150 + Math.cos(a) * 60},${sy + Math.sin(a) * 60} L${150 + Math.cos(a) * 260},${sy + Math.sin(a) * 260}" stroke="#ffe8c0" stroke-width="6" opacity="${.1 * k}" filter="url(#blur2)"/>`; }).join('');
  s += mountainsR(905, 180, 211, { rock: mix('#4a4a62', '#8a7a78', k), snowAt: .6, haze: .35, hazeCol: mix('#4a4a6a', '#e8b090', k), n0: 6, az: 160, el: 15 });
  let city = ''; const r0 = RS(19); let x = -10;
  while (x < 740) { const w = 34 + r0() * 60, h = 40 + r0() * 110; city += `<rect x="${x}" y="${960 - h}" width="${w}" height="${h}" fill="${mix('#1e2234', '#3a3448', r0())}"/><rect x="${x}" y="${960 - h}" width="${w * .25}" height="${h}" fill="#ffb070" opacity="${.18 * k}"/>`;
    for (let q = 0; q < Math.floor(h / 16); q++) for (let p = 0; p < Math.floor((w - 6) / 11); p++) if (r0() < .3) city += `<rect x="${x + 4 + p * 11}" y="${960 - h + 6 + q * 16}" width="5" height="7" fill="#ffd890" opacity="${(.8 - .5 * k).toFixed(2)}"/>`;
    x += w + 3; }
  s += city + meadow(955, 1290, t, { c0: mix('#3a4a2a', '#8a9a50', k), c1: mix('#1e2a14', '#4a5a2a', k), seed: 31, n: 300 });
  s += onWalk(420, 1180, CROWD[1], .7, -1, t, { lookUp: .2 }) + `<ellipse cx="${420 + 70}" cy="1182" rx="70" ry="6" fill="#000" opacity="${.3 * k}"/>`;
  s += lbl(150, 1010, 'الغرب', 1, '#ffd890', 34) + lbl(600, 1010, 'الشرق', 1, '#cfe4ff', 34);
  s += `<path d="M150,${sy} Q360,${sy - 560} 600,930" stroke="#ffe0a0" stroke-width="4" fill="none" stroke-dasharray="14 12" opacity="${arc}"/><circle cx="600" cy="930" r="18" fill="#ff9a5a" opacity="${arc}"/>`;
  F.ov = ''; return s;
}
// 3: winds reverse, and a northern-hemisphere hurricane turns clockwise (satellite view)
function hurricane(cx, cy, R, t, dir) {
  const r = RS(81); let bands = '';
  for (let a = 0; a < 9; a++) { const ph = a / 9 * Math.PI * 2 + r() * .3, w0 = 18 + r() * 22; for (let seg = 0; seg < 26; seg++) { const u0 = seg / 26, u1 = (seg + 1) / 26, th0 = ph + dir * u0 * 3.8, th1 = ph + dir * u1 * 3.8, r0 = R * (.22 + .9 * u0), r1 = R * (.22 + .9 * u1);
      bands += `<path d="M${(cx + Math.cos(th0) * r0).toFixed(1)},${(cy + Math.sin(th0) * r0).toFixed(1)} L${(cx + Math.cos(th1) * r1).toFixed(1)},${(cy + Math.sin(th1) * r1).toFixed(1)}" stroke="#f4f6f8" stroke-width="${(w0 * (1 - u0 * .75)).toFixed(1)}" stroke-linecap="round" opacity="${(.55 * Math.pow(1 - u0, 1.3)).toFixed(2)}"/>`; } }
  return `<defs><radialGradient id="cdoG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef2f6"/><stop offset="1" stop-color="#e8eef4" stop-opacity="0"/></radialGradient></defs><circle cx="${cx}" cy="${cy}" r="${R * 1.25}" fill="#dfe8f0" opacity=".18" filter="url(#soft)"/>` +
    `<g transform="rotate(${(dir * t * 12).toFixed(1)},${cx},${cy})"><g filter="url(#cloudF)">${bands}<circle cx="${cx}" cy="${cy}" r="${R * .42}" fill="url(#cdoG)"/></g><circle cx="${cx}" cy="${cy}" r="${R * .4}" fill="#000" filter="url(#grainR)" opacity=".16"/><circle cx="${cx}" cy="${cy}" r="${R * .4}" fill="#9aa8b8" filter="url(#cropT)" opacity=".25"/></g>` +
    `<circle cx="${cx}" cy="${cy}" r="${R * .065}" fill="#24486a"/><circle cx="${cx}" cy="${cy}" r="${R * .1}" fill="none" stroke="#c8d4e0" stroke-width="${R * .04}" opacity=".7" filter="url(#blur2)"/>`;
}
function sceneStorm(t) {
  const w = ramp(t, S0(3) - .2, WS(3, 1) + .3), hk = ease(ramp(t, WS(3, 3) - .4, WS(3, 3) + .4));
  let s = `<defs>${DEFT()}<radialGradient id="oceanH" cx=".5" cy=".5" r=".75"><stop offset="0" stop-color="#1e4a7a"/><stop offset="1" stop-color="#08203e"/></radialGradient></defs><rect width="720" height="1280" fill="url(#oceanH)"/><rect width="720" height="1280" fill="#2a6a9a" filter="url(#cropT)" opacity=".35"/>`;
  const cst = `M-20,1150 L40,1140 L90,1158 L130,1150 L170,1176 L200,1210 L230,1240 L250,1290 L-20,1290Z`; s += `<path d="${cst}" fill="#4e6a34"/><path d="${cst}" fill="#8a7a50" filter="url(#reliefR)" opacity=".55"/><path d="M-20,1150 L40,1140 L90,1158 L130,1150 L170,1176 L200,1210 L230,1240 L250,1290" stroke="#d8d0a8" stroke-width="3" fill="none" opacity=".7"/>`;
  for (let i = 0; i < 8; i++) { const r = RS(i + 70), x = pmod(r() * 760 - t * 30, 760) - 20, y = 380 + r() * 760; s += `<ellipse cx="${x}" cy="${y}" rx="${40 + r() * 60}" ry="${12 + r() * 10}" fill="#fff" opacity=".35" filter="url(#soft)"/>`; }
  for (let i = 0; i < 14; i++) { const y = 420 + i * 55, ph = pmod(t * .8 + i * .37, 1); s += `<path d="M${720 - ph * 900},${y} h120" stroke="#cfe4ff" stroke-width="3" opacity="${(.5 * w * (1 - hk)).toFixed(2)}" stroke-linecap="round"/><path d="M${720 - ph * 900},${y} l14,-8 M${720 - ph * 900},${y} l14,8" stroke="#cfe4ff" stroke-width="3" opacity="${(.5 * w * (1 - hk)).toFixed(2)}"/>`; }
  s += `<g opacity="${hk}">` + hurricane(380, 760, 300, t, 1) + `</g>`;
  s += `<g opacity="${hk}" transform="translate(620,430)"><circle r="44" fill="#0a0e1c" opacity=".7"/><path d="M0,-30 L10,0 L0,-8 L-10,0Z" fill="#ff5a4a"/><path d="M0,30 L10,0 L0,8 L-10,0Z" fill="#cfd8ff"/>` + lbl(0, -52, 'شمال', 1, '#fff', 18) + `</g>`;
  const ca = ramp(t, WS(3, 9) - .2, WS(3, 9) + .3); s += `<g opacity="${ca}"><path d="M${380 + 340},760 A340,340 0 0 1 380,${760 + 340}" stroke="#f4c76b" stroke-width="7" fill="none"/><path d="M${380 + 20},${760 + 362} L380,${760 + 340} L${380 + 22},${760 + 318}" stroke="#f4c76b" stroke-width="7" fill="none" stroke-linejoin="round"/></g>`;
  F.ov = ''; return s;
}
// 4: the Max Planck simulation: the 3D Earth under a model grid, a year counter running to 7,000
function gridOv(E, t, a) {
  let o = '';
  for (let lat = -60; lat <= 60; lat += 30) { let d = '', on = false; for (let lon = -180; lon <= 180; lon += 6) { const [x, y, z] = geoXY(lat, lon, E, t); if (z > .02) { d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; } else on = false; } o += `<path d="${d}" stroke="#7ad0ff" stroke-width="1.4" fill="none" opacity="${a}"/>`; }
  for (let lon = -180; lon < 180; lon += 30) { let d = '', on = false; for (let lat = -84; lat <= 84; lat += 6) { const [x, y, z] = geoXY(lat, lon, E, t); if (z > .02) { d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; } else on = false; } o += `<path d="${d}" stroke="#7ad0ff" stroke-width="1.4" fill="none" opacity="${a}"/>`; }
  return o;
}
function sceneSim(t) {
  const g = ramp(t, S0(4), S0(4) + .8), yr = Math.round(7000 * ease(ramp(t, WS(4, 7) - .4, WS(4, 10) + .4)));
  let s = space(t, '#03050f', '#0a1030');
  const E = { x: 360, y: 820, r: 270, a: 1, sunI: 1, lights: .3, rot: rotFor(10) + spinAng(t), spin: 0, tilt: 0, xr: .25 };
  F.earth = E; F.light = [200, 600]; F.moon = null; F.sun = null;
  F.ov = gridOv(E, t, .55 * g) + `<g opacity="${g}" transform="translate(110,420)"><rect width="500" height="130" rx="16" fill="#0a0e1c" opacity=".85" stroke="#7ad0ff" stroke-opacity=".4"/>` + lbl(250, 40, 'محاكاة مناخية — معهد ماكس بلانك', 1, '#cfe4ff', 22) + `<rect x="30" y="62" width="440" height="16" rx="8" fill="#1e2a40"/><rect x="30" y="62" width="${440 * yr / 7000}" height="16" rx="8" fill="#7ad0ff"/>` + lbl(250, 112, `السنة ${AR(yr)}`, 1, '#fff', 26) + `</g>`;
  return s;
}
// 5: the Sahara and Arabia turn green (3D Earth crossfading to the retrograde climate), then the globe turns to the Americas where new deserts appear
function sceneGreen(t) {
  const st = S0(5) - .2, gk = ease(ramp(t, WS(5, 2), WS(5, 3) + .7)), turn = ease(ramp(t, WS(5, 10) - .3, WS(5, 12) + .3));
  const E = { x: 360, y: 820, r: 300, sunI: 1.05, lights: .1, rot: lerp(rotFor(25), rotFor(-78), turn), spin: 0, tilt: 0, xr: lerp(.32, .12, turn) };
  let s = space(t, '#03050f', '#0a1030');
  F.earth = Object.assign({ a: 1 - gk }, E); F.moon = Object.assign({ a: gk }, E); F.light = [300, 700]; F.sun = null;
  const [sx, sy, sz] = geoXY(23, 12, E, 0), [mx, my, mz] = geoXY(26, 45, E, 0), [ax, ay, az] = geoXY(32, -98, E, 0), [bx, by, bz] = geoXY(-20, -52, E, 0);
  F.ov = `<g opacity="${ramp(t, WS(5, 3), WS(5, 3) + .3) * (1 - turn) * (sz > 0 ? 1 : 0)}"><circle cx="${sx}" cy="${sy}" r="7" fill="#7ae07a"/><path d="M${sx},${sy} L${sx - 40},${sy - 110}" stroke="#fff" stroke-width="2"/>` + lbl(sx - 40, sy - 122, 'الصحراء الكبرى تخضرّ', 1, '#9af09a', 26) + `</g>` +
    `<g opacity="${ramp(t, WS(5, 5), WS(5, 5) + .3) * (1 - turn) * (mz > 0 ? 1 : 0)}"><circle cx="${mx}" cy="${my}" r="7" fill="#7ac8ff"/><path d="M${mx},${my} L${mx + 30},${my + 120}" stroke="#fff" stroke-width="2"/>` + lbl(mx + 30, my + 150, 'مطر أكثر على الشرق الأوسط', 1, '#9ad8ff', 24) + `</g>` +
    `<g opacity="${ramp(t, WS(5, 14), WS(5, 14) + .3) * (az > 0 ? 1 : 0)}"><circle cx="${ax}" cy="${ay}" r="7" fill="#e8b060"/>` + lbl(ax, ay - 20, 'صحراء جديدة', 1, '#ffd08a', 24) + `</g><g opacity="${ramp(t, WS(5, 15), WS(5, 15) + .3) * (bz > 0 ? 1 : 0)}"><circle cx="${bx}" cy="${by}" r="7" fill="#e8b060"/>` + lbl(bx, by + 40, 'صحراء جديدة', 1, '#ffd08a', 24) + `</g>`;
  return s;
}
// 6: currents seen from above the North Pole: the warm Atlantic current fades, a matching one switches on in the North Pacific
function curPath(pts, E, t) { let d = '', on = false, last = null; pts.forEach(([la, lo]) => { const [x, y, z] = geoXY(la, lo, E, t); if (z > .05) { d += (on ? ' L' : ' M') + x.toFixed(1) + ',' + y.toFixed(1); on = true; last = [x, y]; } else on = false; }); return [d, last]; }
function sceneCurrents(t) {
  const fa = 1 - ease(ramp(t, WS(6, 5) - .3, WS(6, 5) + .6)), fp = ease(ramp(t, WS(6, 6) - .2, WS(6, 7) + .5));
  const E = { x: 360, y: 800, r: 300, sunI: 1.05, lights: .2, rot: rotFor(-100), spin: 0, tilt: 0, xr: 1.05 };
  let s = space(t, '#03050f', '#0a1030');
  F.earth = Object.assign({ a: 1 }, E); F.light = [360, 700]; F.moon = null; F.sun = null;
  const interp = (a, n = 24) => { const o = []; for (let i = 0; i < a.length - 1; i++) for (let k = 0; k < n; k++) { const u = k / n; o.push([lerp(a[i][0], a[i + 1][0], u), lerp(a[i][1], a[i + 1][1], u)]); } o.push(a[a.length - 1]); return o; };
  const atl = interp([[25, -80], [35, -72], [42, -55], [52, -35], [62, -15], [70, 5]]), pac = interp([[32, 135], [38, 150], [44, 170], [50, -170], [56, -155], [62, -150]]);
  const [da, la] = curPath(atl, E, 0), [dp, lp] = curPath(pac, E, 0), dash = -t * 60;
  let o = `<g opacity="${fa}"><path d="${da}" stroke="#ff5a2a" stroke-width="16" fill="none" opacity=".35" filter="url(#blur2)"/><path d="${da}" stroke="#ff7a3a" stroke-width="7" fill="none" stroke-dasharray="22 12" stroke-dashoffset="${dash}" stroke-linecap="round"/></g>`;
  o += `<g opacity="${fp}"><path d="${dp}" stroke="#ff5a2a" stroke-width="16" fill="none" opacity=".35" filter="url(#blur2)"/><path d="${dp}" stroke="#ff7a3a" stroke-width="7" fill="none" stroke-dasharray="22 12" stroke-dashoffset="${dash}" stroke-linecap="round"/></g>`;
  const [ax, ay] = geoXY(45, -45, E, 0), [px, py] = geoXY(46, 175, E, 0);
  o += lbl(ax, ay + 50, 'الأطلسي: يتلاشى', fa, '#ffb090', 24) + lbl(px, py - 30, 'الهادئ: تيّار جديد', fp, '#ffb090', 24);
  F.ov = o; return s;
}
// 7: a western-European city street in a brutal winter: an icy easterly from Russia drives the snow sideways
function sceneWinter(t) {
  const k = ease(ramp(t, S0(7) - .2, WS(7, 5) + .5));
  let s = bareStreet(t, { id: 'w7', green: 1, sky: ['#5a6474', '#9aa2ac', '#c8ccd0'], sunR: 0, glowR: 0, sunGlow: 0, lamps: .6 });
  s += `<rect width="720" height="1280" fill="#1a2a3a" opacity=".22"/>`;
  s += `<path d="M0,1000 L720,1000 L720,1104 L0,1104Z" fill="#f2f6fa" opacity="${.85 * k}"/><rect y="1104" width="720" height="16" fill="#f4f8fc" opacity="${.9 * k}"/><path d="M0,1120 Q180,1128 360,1122 T720,1126 L720,1140 L0,1140Z" fill="#e8eef4" opacity="${.75 * k}"/>`;
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw]) => { s += `<path d="M${sx - 12},922 Q${sx + sw / 2},916 ${sx + sw + 12},922 L${sx + sw + 12},927 L${sx - 12},927Z" fill="#f6f9fc" opacity="${k}"/>`; });
  [[120, 300, 3], [420, 280, 4], [640, 260, 5]].forEach(([x, h, sd]) => { const r = RS(sd + 900); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.1 + .8 * r()), d = .5 + .45 * r(); s += `<ellipse cx="${x + Math.cos(a) * d * h * .26}" cy="${1058 - h * .72 + Math.sin(a) * d * h * .2 - 6}" rx="${h * (.03 + .03 * r())}" ry="${h * .012 + 2}" fill="#f6f9fc" opacity="${.92 * k}"/>`; } });
  s += onWalk(260, 1090, CROWD[2], .55, -1, t, { coat: 1, scarf: '#8a2a2a', moving: 1, phase: t * 4, breath: 1 }) + onWalk(470, 1084, CROWD[0], .53, 1, t, { coat: 1, scarf: '#2a4a7a', lookUp: -.1, breath: 1, seed: .3 });
  for (let i = 0; i < 170; i++) { const r = RS(i + 3), z = r(), y = pmod(r() * 1300 + t * (20 + 40 * z), 1300) - 10, x = pmod(r() * 900 - t * (180 + 380 * z), 900) - 90; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(14 + 30 * z).toFixed(1)},${(-2 - 3 * z).toFixed(1)}" stroke="#fff" stroke-width="${(1 + 2.2 * z).toFixed(1)}" stroke-linecap="round" opacity="${((.35 + .55 * z) * (.3 + .7 * k)).toFixed(2)}"/>`; }
  s += `<g opacity="${ramp(t, WS(7, 2), WS(7, 2) + .3)}"><path d="M690,770 L470,770" stroke="#9ad0ff" stroke-width="10" stroke-linecap="round"/><path d="M500,746 L466,770 L500,794" stroke="#9ad0ff" stroke-width="10" fill="none" stroke-linejoin="round" stroke-linecap="round"/>` + lbl(580, 740, 'رياح شرقية من روسيا', 1, '#cfe4ff', 26) + `</g>`;
  F.ov = ''; return s;
}
// 8: the northern Indian Ocean from orbit: green-turquoise swirls of a cyanobacteria bloom; a microscope view of their bead-like filaments
function sceneBloom(t) {
  const mi = ramp(t, WS(8, 4) - .2, WS(8, 4) + .4) * (1 - ramp(t, S0(9) - .6, S0(9) - .2));
  let s = `<defs>${DEFT()}<filter id="bloomF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".0035" numOctaves="2" seed="2" result="w"/><feTurbulence type="fractalNoise" baseFrequency=".01 .028" numOctaves="4" seed="7" result="n"/><feDisplacementMap in="n" in2="w" scale="220" xChannelSelector="R" yChannelSelector="G" result="sw"/><feColorMatrix in="sw" values="0 0 0 0 .2  0 0 0 0 .78  0 0 0 0 .66  0 0 0 5 -2.5"/></filter><filter id="bloomG" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".005" numOctaves="2" seed="11" result="w"/><feTurbulence type="fractalNoise" baseFrequency=".016 .04" numOctaves="3" seed="13" result="n"/><feDisplacementMap in="n" in2="w" scale="160" xChannelSelector="R" yChannelSelector="G" result="sw"/><feColorMatrix in="sw" values="0 0 0 0 .55  0 0 0 0 .88  0 0 0 0 .4  0 0 0 5 -2.7"/></filter></defs>`;
  s += `<rect width="720" height="1280" fill="#06203e"/><rect width="720" height="1280" fill="#1a4a7a" filter="url(#cropT)" opacity=".3"/>`;
  s += `<g transform="translate(${-t * 6},${t * 2})"><rect x="-40" y="300" width="840" height="1000" filter="url(#bloomF)" opacity=".9"/><rect x="-40" y="300" width="840" height="1000" filter="url(#bloomG)" opacity=".55"/></g>`;
  const land = `M-20,-20 L740,-20 L740,330 L700,340 L660,360 L610,372 L580,400 L548,450 L520,500 L500,548 L474,600 L452,650 L430,700 L410,742 L392,760 L376,744 L362,700 L350,650 L338,600 L322,548 L300,505 L276,470 L250,446 L226,430 L196,428 L170,410 L140,398 L100,392 L60,396 L20,388 L-20,392Z`;
  s += `<path d="${land}" fill="#5a6632"/><path d="${land}" fill="#a89060" filter="url(#reliefR)" opacity=".75"/><path d="${land}" fill="#3a5a2a" filter="url(#cropT)" opacity=".45"/><path d="${land}" fill="none" stroke="#d8d0a8" stroke-width="3" opacity=".6"/>` + lbl(410, 520, 'الهند', 1, '#fff', 30) + lbl(150, 540, 'بحر العرب', .8, '#cfe4ff', 22) + lbl(600, 780, 'خليج البنغال', .8, '#cfe4ff', 22);
  for (let i = 0; i < 6; i++) { const r = RS(i + 120), x = pmod(r() * 760 + t * 10, 760), y = 720 + r() * 500; s += `<ellipse cx="${x}" cy="${y}" rx="${50 + r() * 70}" ry="${14 + r() * 10}" fill="#fff" opacity=".3" filter="url(#soft)"/>`; }
  if (mi > 0) { s += `<g opacity="${mi}" transform="translate(500,1000)"><circle r="150" fill="#e8f0e0"/>`; for (let f = 0; f < 6; f++) { const r = RS(f + 600), a = r() * 6.28, cx = (r() - .5) * 160, cy = (r() - .5) * 160; for (let q = 0; q < 12; q++) { const u = q - 6, x = cx + Math.cos(a) * u * 13 + Math.sin(q * .6 + f) * 6, y = cy + Math.sin(a) * u * 13; if (Math.hypot(x, y) < 140) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="#3a9a6a" stroke="#1e5a3a" stroke-width="1.5"/>`; } }
    s += `<circle r="150" fill="none" stroke="#2a2a2e" stroke-width="10"/>` + lbl(0, 186, 'سيانوبكتيريا تحت المجهر', 1, '#fff', 22) + `</g>`; }
  F.ov = ''; return s;
}
// 9: the surprise: 11 million km² less desert worldwide – more than the whole area of the United States
function sceneSurprise(t) {
  const E = { x: 360, y: 820, r: 270, a: 1, sunI: 1.05, lights: .1, rot: rotFor(20) - .15 * (t - S0(9)), spin: 0, tilt: 0, xr: .25 };
  let s = space(t, '#03050f', '#0a1030');
  F.moon = E; F.earth = null; F.light = [300, 700]; F.sun = null;
  const b = ease(ramp(t, WS(9, 6) - .2, WS(9, 11) + .3));
  F.ov = `<g transform="translate(70,1110)"><rect width="580" height="130" rx="16" fill="#0a0e1c" opacity=".85"/>` + lbl(560, 40, 'مساحة الصحارى', 1, '#cfd8ff', 22, 'end') + `<rect x="20" y="60" width="540" height="22" rx="10" fill="#c8a060"/><rect x="${20 + 540 * (1 - .22 * b)}" y="60" width="${540 * .22 * b}" height="22" rx="10" fill="#5ac87a"/>` + lbl(290, 118, `−${AR(11)} مليون كم²`, b, '#9af09a', 24) + `</g>`;
  return s;
}
// 10: CTA – Earth spinning the other way
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 9) - .2, WS(10, 9) + .6)), bb = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: rotFor(20) + spinAng(t), spin: 0, tilt: .41 }; F.light = [-300, 500]; F.moon = null; F.sun = null;
  F.ov = spinArrow(360, 560, 260, -1, 1) + `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 13), WS(10, 13) + .4)}" transform="translate(360,${1100 - bb})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneSpin }, { s: S0(2) - .2, f: sceneSunrise }, { s: S0(3) - .2, f: sceneStorm }, { s: S0(4) - .2, f: sceneSim }, { s: S0(5) - .2, f: sceneGreen },
  { s: S0(6) - .2, f: sceneCurrents }, { s: S0(7) - .2, f: sceneWinter }, { s: S0(8) - .2, f: sceneBloom }, { s: S0(9) - .2, f: sceneSurprise }, { s: S0(10) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneSpin, sceneSim, sceneGreen, sceneCurrents, sceneSurprise]);
const XF = .5;
const TLI = [['الصحراء الكبرى', S0(5)], ['التيّارات', S0(6)], ['شتاء أوروبا', S0(7)], ['المحيط الهندي', S0(8)]];
const LIST_ON = new Set([sceneGreen, sceneCurrents, sceneWinter, sceneBloom]);
const CHIPS = [
  ['c1', 'منذ ٤٫٥ مليار سنة', 360, 330, 'big', WS(1, 7), S0(2) - .3],
  ['c2', 'الشمس تشرق من الغرب', 360, 330, 'big', WS(2, 3), S0(3) - .3],
  ['c3', 'مع عقارب الساعة', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', 'محاكاة لـ ٧٠٠٠ سنة', 360, 330, 'big', WS(4, 8), S0(5) - .3],
  ['c5', 'تقل الصحارى ١١ مليون كم²', 360, 330, 'red', WS(9, 3), S0(10) - .3],
  ['c6', 'أكبر من مساحة الولايات المتحدة كلها', 360, 410, '', WS(9, 11), S0(10) - .3],
  ['c7', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 13), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">نتائج المحاكاة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
