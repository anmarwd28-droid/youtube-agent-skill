
// ===================== "what if you could run at the speed of sound?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const num = (x, y, tx, a, col = '#fff', fs = 40) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".6">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
const YOU = { top: '#e85a2a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };
// the runner: a person in a running pose; blur = 0..1 turns him into a motion streak with a white vapour cone
function runner(x, y, s, t, blur = 0, face = 1) {
  let o = '';
  if (blur > 0) { for (let i = 1; i <= 6; i++) o += `<path d="M${x - face * 30 * s},${y - (60 + i * 30) * s} l${-face * 320 * s * blur},0" stroke="#fff" stroke-width="${3 * s}" opacity="${(.6 * blur).toFixed(2)}"/><g opacity="${(.22 * blur * (1 - i / 7)).toFixed(2)}" transform="translate(${-face * i * 26 * blur},0)">` + person(x, y, Object.assign({ s, face, moving: 1, phase: t * 30, amp: .8, t }, YOU)) + `</g>`;
    o += `<path d="M${x + face * 40 * s},${y - 150 * s} Q${x - face * 60 * s},${y - 280 * s} ${x - face * 260 * s},${y - 200 * s} L${x - face * 260 * s},${y - 60 * s} Q${x - face * 60 * s},${y - 10 * s} ${x + face * 40 * s},${y - 120 * s}Z" fill="#ffffff" opacity="${(.45 * blur).toFixed(2)}" filter="url(#soft)"/>`; }
  return o + person(x, y, Object.assign({ s, face, moving: 1, phase: t * (8 + 22 * blur), amp: .75, t }, YOU));
}
// 0: a street; "you" start running and in a moment hit the speed of sound – a streak and a vapour cone
function sceneHook(t) {
  const go = ease(ramp(t, WS(0, 4) - .4, WS(0, 6) + .5)), x = 160 + 760 * go * go;
  let s = cityDay(t, { id: 'h0' });
  if (x < 900) s += runner(Math.min(x, 820), 1090, .62, t, go);
  for (let i = 0; i < 18; i++) { const r = RS(i + 3), y = 1040 + r() * 60, x0 = 100 + r() * 600; s += `<path d="M${x0},${y} l${-90 * go},0" stroke="#fff" stroke-width="2" opacity="${(.6 * go * (x < 900 ? 1 : 1 - ramp(t, WS(0, 6), WS(0, 6) + .6))).toFixed(2)}"/>`; }
  const r2 = RS(9); for (let i = 0; i < 14; i++) { const ph = clamp((t - WS(0, 5)) * 1.2 - i * .03), lx = 300 + r2() * 300 + ph * 260, ly = 1080 - ph * (120 + r2() * 200) + ph * ph * 160; if (ph > 0 && ph < 1) s += `<ellipse cx="${lx}" cy="${ly}" rx="7" ry="4" fill="${['#6a8a3a', '#8a7a3a', '#5a7a2a'][i % 3]}" transform="rotate(${ph * 600 + i * 30},${lx},${ly})"/>`; }
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// an athletics stadium: red track with lanes, stands with a crowd, lights
function stadium(t) {
  let s = `<defs>${DEFB()}<linearGradient id="skS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e5e9e"/><stop offset="1" stop-color="#c8d8e8"/></linearGradient><linearGradient id="trS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8402a"/><stop offset="1" stop-color="#c8543a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skS)"/>` + cumulus(520, 360, 170, 21, { a: .8 });
  // stands with crowd
  s += `<path d="M-20,560 L740,520 L740,860 L-20,860Z" fill="#3a4250"/>`;
  const r = RS(5); for (let row = 0; row < 14; row++) { const y = 575 + row * 20 - row * 0; for (let x = -10; x < 740; x += 9) { if (r() < .12) continue; s += `<circle cx="${(x + r() * 4).toFixed(1)}" cy="${(y - x * .05 + r() * 4).toFixed(1)}" r="3.6" fill="${['#e8d8c0', '#c89070', '#8a5a3a', '#f2e0c8', '#d84a3a', '#2a6ac8', '#f2c84a', '#ffffff'][Math.floor(r() * 8)]}"/>`; } }
  s += `<rect y="855" width="720" height="22" fill="#1a1e26"/>` + [120, 600].map(x => `<rect x="${x - 4}" y="380" width="8" height="180" fill="#5a6070"/><rect x="${x - 40}" y="360" width="80" height="30" rx="4" fill="#e8ecf2"/>`).join('');
  // the track in perspective
  s += `<path d="M-20,877 L740,877 L740,1290 L-20,1290Z" fill="url(#trS)"/><path d="M-20,877 L740,877 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 9 }, (_, i) => { const y = 880 + Math.pow(i / 8, 1.5) * 400; return `<path d="M-20,${y.toFixed(1)} L740,${y.toFixed(1)}" stroke="#f2ece4" stroke-width="${1 + i * .4}" opacity=".85"/>`; }).join('');
  return s;
}
// 1: the fastest man ever (~44.7 km/h) vs the speed of sound (~1,235 km/h): ~28 times
function sceneTrack(t) {
  const st = S0(1) - .2, T = t - st, k = ease(ramp(t, WS(1, 2) - .2, WS(1, 4) + .3)), kk = ease(ramp(t, WS(1, 7) - .2, WS(1, 10) + .3));
  let s = stadium(t);
  s += person(220 + T * 40, 1100, { s: .75, face: 1, moving: 1, phase: T * 13, amp: .8, t, top: '#f2d23a', pants: '#2a8a4a', skin: '#5a3a28', hair: '#1a1210' });
  s += `<g transform="translate(40,400)"><rect width="640" height="200" rx="18" fill="#0a0e1c" opacity=".88"/>` + lbl(610, 50, 'أسرع إنسان', k, '#cfd8ff', 22, 'end') + `<rect x="30" y="66" width="${580 * k / 27.6}" height="20" rx="6" fill="#f2d23a"/>` + num(110, 90, '44.7 km/h', k, '#f2d23a', 22) +
    lbl(610, 136, 'سرعة الصوت', kk, '#cfd8ff', 22, 'end') + `<rect x="30" y="152" width="${580 * kk}" height="20" rx="6" fill="#e85a2a"/>` + num(320, 192, '≈ 1,235 km/h', kk, '#fff', 24) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 2: the sonic boom: a shock cone behind the streak; shop windows crack and shatter
function sceneBoom(t) {
  const st = S0(2) - .2, T = t - st, pass = clamp((t - WS(2, 1)) / 1.0), boom = ramp(t, WS(2, 4) - .1, WS(2, 5) + .3), crack = ramp(t, WS(2, 7) - .2, WS(2, 7) + .2), fall = clamp((t - WS(2, 7)) / 1.6);
  let s = cityDay(t, { id: 'b2' });
  const PV = 1000, x = -100 + pass * 1000;
  if (pass > 0 && pass < 1) s += runner(x, 1090, .62, t, 1);
  // Mach cone: two lines trailing from the runner, plus a pressure ring reaching the buildings
  const cx = Math.min(x, 900), cy = 1000;
  s += `<path d="M${cx},${cy} L${cx - 900},${cy - 500} M${cx},${cy} L${cx - 900},${cy + 500}" stroke="#fff" stroke-width="5" opacity="${(.5 * boom * (1 - fall)).toFixed(2)}" filter="url(#blur2)"/>`;
  s += `<circle cx="${cx - 200}" cy="${cy}" r="${100 + boom * 500}" fill="none" stroke="#fff" stroke-width="${6 * (1 - boom) + 2}" opacity="${(.5 * (1 - boom)).toFixed(2)}"/>`;
  // cracks and shards on the shop windows
  const r = RS(7);
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw], i) => { if (crack <= 0) return; const gx = sx + 6, gy = PV - 80, gw = sw - 12, gh = 74, ox = gx + gw * (.3 + r() * .4), oy = gy + gh * (.3 + r() * .4);
    let c = ''; for (let q = 0; q < 9; q++) { const a = q / 9 * 6.283 + r(), L = 20 + r() * 60; let px = ox, py = oy, d = `M${px.toFixed(1)},${py.toFixed(1)}`; for (let k = 0; k < 3; k++) { px += Math.cos(a + (r() - .5) * .6) * L / 3; py += Math.sin(a + (r() - .5) * .6) * L / 3; d += ` L${px.toFixed(1)},${py.toFixed(1)}`; } c += `<path d="${d}" stroke="#f2f8ff" stroke-width="1.6" fill="none"/>`; }
    s += `<g clip-path="url(#sc${i})"><defs><clipPath id="sc${i}"><rect x="${gx}" y="${gy}" width="${gw}" height="${gh}"/></clipPath></defs><g opacity="${crack}">${c}</g></g>`;
    for (let q = 0; q < 8; q++) { const fx = gx + r() * gw, fy = gy + gh * .5 + fall * fall * 140 + r() * 20, rot = fall * 300 * (r() - .5); if (fall > 0 && fall < 1) s += `<path d="M${fx},${fy} l8,-6 l6,10Z" fill="#dff0ff" opacity=".8" transform="rotate(${rot},${fx},${fy})"/>`; } });
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 3: air slams into your face and heats up by about 60 °C (stagnation heating at Mach 1)
function sceneHeat(t) {
  const st = S0(3) - .2, T = t - st, h = ease(ramp(t, WS(3, 3) - .2, WS(3, 6) + .3));
  let s = `<defs>${DEFB()}<radialGradient id="hotH" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb060" stop-opacity=".9"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient></defs>` + cityDay(t, { id: 'q3' }) + `<rect width="720" height="1280" fill="#0a1028" opacity=".55"/>`;
  // close-up: head and shoulders, in profile, facing right
  s += `<g transform="translate(250,1250) scale(3.2)">` + person(0, 120, Object.assign({ s: .9, face: 1, t }, YOU)) + `</g>`;
  s += `<ellipse cx="470" cy="760" rx="${60 + 50 * h}" ry="${90 + 40 * h}" fill="url(#hotH)" opacity="${h.toFixed(2)}"/>`;
  // streamlines bending around the face
  for (let i = 0; i < 12; i++) { const y = 580 + i * 34, ph = pmod(T * 2.4 + i * .13, 1), x0 = 720 - ph * 520; s += `<path d="M${x0 + 120},${y} Q${x0 + 40},${y} ${x0},${y + (y < 760 ? -40 : 40) * clamp(1 - Math.abs(y - 760) / 220)}" stroke="#fff" stroke-width="2.5" fill="none" opacity="${(.6 * (1 - ph)).toFixed(2)}"/>`; }
  s += `<g transform="translate(540,1000)"><rect x="-120" y="-60" width="240" height="120" rx="18" fill="#0a0e1c" opacity=".88"/>` + num(0, 20, `+${Math.round(58 * h)}°C`, 1, h > .9 ? '#ff8a5a' : '#fff', 46) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 4: pushing through the air needs ~20 MW – like a small power station
function scenePower(t) {
  const st = S0(4) - .2, T = t - st, k = ease(ramp(t, WS(4, 5) - .2, WS(4, 7) + .3));
  let s = `<defs>${DEFB()}<linearGradient id="skP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a6a"/><stop offset=".6" stop-color="#c88a6a"/><stop offset="1" stop-color="#f2c89a"/></linearGradient><linearGradient id="ctP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8a49c"/><stop offset=".55" stop-color="#d8d4cc"/><stop offset="1" stop-color="#8a867e"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skP)"/>`;
  s += mountainsR(860, 160, 61, { rock: '#6a5a58', haze: .5, hazeCol: '#c89a80' });
  // cooling towers (hyperboloid outline) with steam
  [[200, 980, 1], [420, 1000, .85]].forEach(([x, y, sc]) => { const w = 110 * sc, h = 300 * sc; s += `<path d="M${x - w},${y} Q${x - w * .55},${y - h * .55} ${x - w * .62},${y - h} L${x + w * .62},${y - h} Q${x + w * .55},${y - h * .55} ${x + w},${y}Z" fill="url(#ctP)"/><path d="M${x - w},${y} Q${x - w * .55},${y - h * .55} ${x - w * .62},${y - h} L${x + w * .62},${y - h} Q${x + w * .55},${y - h * .55} ${x + w},${y}Z" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
    for (let i = 0; i < 6; i++) { const ph = pmod(T * .25 + i / 6, 1); s += `<ellipse cx="${x + ph * 80}" cy="${y - h - 30 - ph * 360}" rx="${w * .7 + ph * 140}" ry="${50 + ph * 70}" fill="#f2eee8" opacity="${(.55 * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; } });
  s += `<rect x="520" y="860" width="160" height="140" fill="#7a7068"/><rect x="590" y="640" width="26" height="220" fill="#8a7e74"/><rect x="590" y="640" width="26" height="12" fill="#c83a2a"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${532 + i * 24}" y="890" width="14" height="22" fill="#ffd890" opacity=".8"/>`).join('');
  s += `<path d="M-20,990 L740,1000 L740,1290 L-20,1290Z" fill="#4a4a3a"/><path d="M-20,990 L740,1000 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // a pylon and wires
  s += `<path d="M90,1180 L120,700 L150,1180 M100,1020 L140,1020 M105,880 L135,880 M70,760 L170,760" stroke="#2a2a30" stroke-width="5" fill="none"/><path d="M70,760 Q400,830 740,760 M170,760 Q450,850 740,800" stroke="#2a2a30" stroke-width="2" fill="none"/>`;
  s += `<g transform="translate(360,1150)"><rect x="-170" y="-56" width="340" height="104" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 10, `≈ ${Math.round(20 * k)} MW`, 1, '#f4c76b', 50) + lbl(0, 40, 'قوّة لدفع الهواء', 1, '#cfd8ff', 18) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 5: one minute of running burns as much energy as more than four months of food: a table filling with meals and a day counter
function sceneFood(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 4) - .2, WS(5, 11) + .3));
  let s = `<defs>${DEFB()}<linearGradient id="wdF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a34"/><stop offset="1" stop-color="#5a3a22"/></linearGradient><radialGradient id="plF" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d8d4cc"/></radialGradient></defs><rect width="720" height="1280" fill="url(#wdF)"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    Array.from({ length: 8 }, (_, i) => `<path d="M0,${i * 170 + 40} Q360,${i * 170 + 60} 720,${i * 170 + 30}" stroke="#3a2414" stroke-width="2" fill="none" opacity=".35"/>`).join('');
  const r = RS(17), n = Math.round(k * 40); let food = '';
  for (let i = 0; i < n; i++) { const col = i % 5, row = Math.floor(i / 5), x = 75 + col * 100 + (row % 2) * 20, y = 330 + row * 95, c = ['#d89a3a', '#6a9a3a', '#c8543a', '#e8c86a', '#8a5a2a'][Math.floor(r() * 5)];
    food += `<ellipse cx="${x + 4}" cy="${y + 8}" rx="50" ry="22" fill="#000" opacity=".3"/><ellipse cx="${x}" cy="${y}" rx="50" ry="22" fill="url(#plF)"/><ellipse cx="${x}" cy="${y - 3}" rx="34" ry="13" fill="${c}"/>` + Array.from({ length: 4 }, () => `<circle cx="${(x + (r() - .5) * 40).toFixed(1)}" cy="${(y - 3 + (r() - .5) * 14).toFixed(1)}" r="${(3 + r() * 4).toFixed(1)}" fill="${mix(c, r() > .5 ? '#ffffff' : '#2a1a10', .35)}"/>`).join(''); }
  s += food;
  const days = Math.round(139 * k);
  s += `<g transform="translate(360,1170)"><rect x="-200" y="-60" width="400" height="110" rx="18" fill="#0a0e1c" opacity=".9"/>` + lbl(0, 0, `${AR(days)} يوماً من الطعام`, 1, '#f4c76b', 34) + lbl(0, 36, 'لدقيقة ركض واحدة', 1, '#cfd8ff', 18) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 6: stopping safely (≤ 5 g) takes more than 1.2 km: a long desert road in perspective, markers, a g-meter
function sceneStop(t) {
  const st = S0(6) - .2, T = t - st, k = ease(ramp(t, WS(6, 2) - .2, WS(6, 8) + .3));
  let s = `<defs>${DEFB()}<linearGradient id="skD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e72b8"/><stop offset="1" stop-color="#f0d8b0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skD)"/>`;
  s += mountainsR(640, 140, 71, { rock: '#a88a6a', haze: .45, hazeCol: '#e8c8a0' });
  s += `<rect y="640" width="720" height="640" fill="#d8b888"/><rect y="640" width="720" height="640" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  const P = (u, z) => [360 + u * 200 / z, 640 + 640 / z];
  const a = P(-1, 1), b = P(1, 1), c = P(1, 60), d = P(-1, 60);
  s += `<path d="M${PT(a)} L${PT(b)} L${PT(c)} L${PT(d)}Z" fill="#4a4a4e"/><path d="M${PT(a)} L${PT(b)} L${PT(c)} L${PT(d)}Z" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  for (let z = 1.2; z < 50; z *= 1.35) { const p = P(0, z), q = P(0, z * 1.12); s += `<path d="M${PT(p)} L${PT(q)}" stroke="#f2ece0" stroke-width="${(10 / z).toFixed(2)}"/>`; }
  // distance markers 200 m … 1200 m appear progressively; the runner (streak) braking from near
  [[200, 1.6], [400, 2.6], [600, 4], [800, 6], [1000, 9], [1200, 13]].forEach(([m, z], i) => { const p = P(1.25, z), a2 = ramp(k, i / 7, i / 7 + .15); s += `<g opacity="${a2}"><rect x="${p[0] - 2}" y="${p[1] - 70 / z * 2}" width="${Math.max(2, 8 / z * 2)}" height="${70 / z * 2}" fill="#f2f2f2"/></g>` + num(p[0] + 30 / z * 2 + 20, p[1] - 40 / z * 2, `${m} m`, a2, i === 5 ? '#ff8a5a' : '#fff', Math.max(14, 34 / Math.sqrt(z))); });
  const rz = lerp(1.15, 13, k), rp = P(-.35, rz);
  s += `<g transform="translate(${rp[0]},${rp[1]}) scale(${(1.2 / rz).toFixed(3)})">` + runner(0, 0, 1, t, 1 - k * .7, -1) + `</g>`;
  s += `<g transform="translate(150,460)"><rect x="-110" y="-56" width="220" height="104" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 10, '≤ 5 g', 1, '#f4c76b', 44) + lbl(0, 38, 'تباطؤ آمن', 1, '#cfd8ff', 18) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 7: at ~7.9 km/s (no air) you'd be in orbit like a satellite
function sceneOrbit(t) {
  const st = S0(7) - .2, T = t - st, k = ease(ramp(t, WS(7, 4) - .2, WS(7, 7) + .3)), orb = ramp(t, WS(7, 8) - .2, WS(7, 9) + .2);
  let s = space(t, '#02030a', '#070a1c');
  F.earth = { x: 360, y: 760, r: 230, a: 1, sunI: 1.05, lights: .4, rot: 2.3 + t * .02, tilt: .41 }; F.light = [-300, 400]; F.moon = null; F.sun = null;
  const a = -1.2 + T * 1.3 * orb, x = 360 + Math.cos(a) * 300, y = 760 + Math.sin(a) * 110;
  let o = `<ellipse cx="360" cy="760" rx="300" ry="110" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="8 8" opacity="${(.8 * orb).toFixed(2)}"/>`;
  const front = Math.sin(a) > -.2;
  o += `<g opacity="${(front ? 1 : .0).toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="18" fill="#e85a2a" opacity=".45" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="#ffd8b0"/></g>`;
  o += `<g transform="translate(360,1120)"><rect x="-160" y="-50" width="320" height="94" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 12, '≈ 7.9 km/s', k, '#f4c76b', 44) + `</g>` + lbl(360, 1200, 'بلا هواء يعيقك', k, '#9aa8c8', 20);
  F.ov = o; return s;
}
// 8: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneTrack }, { s: S0(2) - .2, f: sceneBoom }, { s: S0(3) - .2, f: sceneHeat }, { s: S0(4) - .2, f: scenePower },
  { s: S0(5) - .2, f: sceneFood }, { s: S0(6) - .2, f: sceneStop }, { s: S0(7) - .2, f: sceneOrbit }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneFood, sceneStop, sceneOrbit]);
const XF = .5;
const TLI = [['دويّ صوتي', S0(2)], ['حرارة', S0(3)], ['طاقة هائلة', S0(4)], ['التوقّف', S0(6)]];
const LIST_ON = new Set([sceneBoom, sceneHeat, scenePower, sceneFood, sceneStop]);
const CHIPS = [
  ['c1', '× ٢٨ تقريباً', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', 'دويّ صوتي', 360, 330, 'red', WS(2, 4), S0(3) - .3],
  ['c3', 'محطة كهرباء صغيرة', 360, 330, 'big', WS(4, 9), S0(5) - .3],
  ['c4', 'أكثر من ١ كم', 360, 330, 'red', WS(6, 7), S0(7) - .3],
  ['c5', 'سرعة المدار', 360, 330, 'big', WS(7, 12), S0(8) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بسرعة الصوت</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
