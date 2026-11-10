
// ===================== "what if all the glass in the world vanished for 5 seconds?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const lblL = (x, y, tx, a, col = '#fff', fs = 24) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function geoXY(lat, lon, e, t) {
  const phi = (lon + 180) * Math.PI / 180, th = (90 - lat) * Math.PI / 180;
  const x = -Math.cos(phi) * Math.sin(th), y = Math.cos(th), z = Math.sin(phi) * Math.sin(th);
  const a = (e.rot ?? .6) + t * (e.spin ?? .03), b = e.xr ?? 0;
  const x1 = x * Math.cos(a) + z * Math.sin(a), z1 = -x * Math.sin(a) + z * Math.cos(a);
  const y2 = y * Math.cos(b) - z1 * Math.sin(b), z2 = y * Math.sin(b) + z1 * Math.cos(b);
  return [e.x + e.r * x1, e.y - e.r * y2, z2];
}
const rotFor = lon => (-90 - lon) * Math.PI / 180;
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
// glass glare: soft diagonal reflections over a rectangle; a = 1 glass present, 0 gone
const glare = (x, y, w, h, a, id) => a <= 0 ? '' : `<defs><clipPath id="gc${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><linearGradient id="gg${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8f4ff" stop-opacity=".55"/><stop offset=".5" stop-color="#bcd8f0" stop-opacity=".18"/><stop offset="1" stop-color="#e8f4ff" stop-opacity=".35"/></linearGradient></defs>` +
  `<g clip-path="url(#gc${id})" opacity="${a.toFixed(2)}"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#gg${id})"/><path d="M${x + w * .15},${y + h} L${x + w * .45},${y} L${x + w * .58},${y} L${x + w * .28},${y + h}Z" fill="#fff" opacity=".28"/><path d="M${x + w * .62},${y + h} L${x + w * .82},${y} L${x + w * .86},${y} L${x + w * .66},${y + h}Z" fill="#fff" opacity=".2"/></g>`;
// tiny sparkles that pop when glass vanishes
function popSpark(x, y, w, h, k, seed) { if (k <= 0 || k >= 1) return ''; const r = RS(seed); let s = ''; for (let i = 0; i < 10; i++) { const px = x + r() * w, py = y + r() * h, d = k * 30; s += `<path d="M${px - d * .3},${py} L${px + d * .3},${py} M${px},${py - d * .3} L${px},${py + d * .3}" stroke="#fff" stroke-width="2" opacity="${(1 - k).toFixed(2)}"/>`; } return s; }
// 0: a street; glass sparkles on shop windows and building windows, then vanishes at "الزجاج"
function sceneHook(t) {
  const g = ease(ramp(t, WS(0, 4) - .1, WS(0, 4) + .5)), pk = ramp(t, WS(0, 4) - .1, WS(0, 4) + .6);
  let s = cityDay(t, { id: 'h0' });
  const PV = 1000;
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw], i) => { s += glare(sx + 6, PV - 80, sw - 12, 74, 1 - g, 'h' + i) + `<rect x="${sx + 6}" y="${PV - 80}" width="${sw - 12}" height="74" fill="#1a1410" opacity="${(.45 * g).toFixed(2)}"/>` + popSpark(sx + 6, PV - 80, sw - 12, 74, pk, i + 3); });
  s += onWalk(150 + Math.min(t, WS(0, 6)) * 26, 1088, CROWD[0], .55, 1, t, { moving: t < WS(0, 6) ? 1 : 0, phase: t * 6, lookUp: .2 * g }) + onWalk(560, 1082, CROWD[1], .52, -1, t, { lookUp: .1 });
  s += `<g opacity="${ease(ramp(t, WS(0, 7) - .2, WS(0, 7) + .3))}" transform="translate(360,560)"><circle r="68" fill="#0a0e1c" opacity=".85"/><circle r="54" fill="none" stroke="#9ad8ff" stroke-width="8" stroke-dasharray="340 400" transform="rotate(-90)"/>` + lbl(0, 16, '٥ ث', 1, '#fff', 40) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 1: inside a flat: the window glass vanishes – the curtains billow in, papers fly, street noise pours in
function sceneRoom(t) {
  const st = S0(1) - .2, T = t - st, g = ease(ramp(t, WS(1, 1) - .1, WS(1, 1) + .4)), w = ease(ramp(t, WS(1, 3) - .2, WS(1, 4) + .4));
  let s = `<defs>${DEFB()}<linearGradient id="skR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a82c8"/><stop offset="1" stop-color="#c8dcec"/></linearGradient><linearGradient id="flR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a32"/><stop offset="1" stop-color="#4a3222"/></linearGradient></defs>`;
  // the view outside: sky, clouds, a city skyline
  const WX = 150, WY = 330, WW = 420, WH = 560;
  s += `<rect x="${WX}" y="${WY}" width="${WW}" height="${WH}" fill="url(#skR)"/>` + cumulus(WX + 120, WY + 120, 160, 6, { a: .85 }) + cumulus(WX + 330, WY + 200, 120, 7, { a: .8 });
  const r = RS(8); let sk = ''; for (let x = WX - 10; x < WX + WW + 10;) { const bw = 30 + r() * 40, bh = 90 + r() * 220; sk += `<rect x="${x}" y="${WY + WH - bh}" width="${bw}" height="${bh}" fill="${mix('#8a96a8', '#c8d0dc', r() * .5)}"/>` + Array.from({ length: Math.floor(bh / 18) }, (_, q) => `<rect x="${x + 4}" y="${WY + WH - bh + 6 + q * 18}" width="${bw - 8}" height="5" fill="#5a6a80" opacity=".5"/>`).join(''); x += bw + 4; }
  s += sk;
  // the wall around the window, textured; frame and sill
  s += `<path d="M0,0 H720 V1280 H0Z M${WX},${WY} V${WY + WH} H${WX + WW} V${WY}Z" fill="#d8ccb8" fill-rule="evenodd"/><path d="M0,0 H720 V1280 H0Z M${WX},${WY} V${WY + WH} H${WX + WW} V${WY}Z" fill="#fff" filter="url(#wallI)" opacity=".3" fill-rule="evenodd"/>` +
    `<rect x="${WX - 14}" y="${WY - 14}" width="${WW + 28}" height="14" fill="#f2f0ec"/><rect x="${WX - 14}" y="${WY + WH}" width="${WW + 28}" height="22" fill="#e8e4dc"/><rect x="${WX - 14}" y="${WY}" width="14" height="${WH}" fill="#f2f0ec"/><rect x="${WX + WW}" y="${WY}" width="14" height="${WH}" fill="#f2f0ec"/><rect x="${WX + WW / 2 - 6}" y="${WY}" width="12" height="${WH}" fill="#f2f0ec"/><rect x="${WX}" y="${WY + WH * .45}" width="${WW}" height="10" fill="#f2f0ec"/>`;
  s += glare(WX, WY, WW, WH, 1 - g, 'R1') + popSpark(WX, WY, WW, WH, ramp(t, WS(1, 1) - .1, WS(1, 1) + .6), 5);
  // floor, a desk with papers
  s += `<rect y="1020" width="720" height="260" fill="url(#flR)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 90},1020 L${i * 90 - 60},1280" stroke="#3a2618" stroke-width="2" opacity=".5"/>`).join('') + `<rect y="1012" width="720" height="10" fill="#c8bca8"/>`;
  s += `<rect x="430" y="930" width="250" height="16" fill="#8a6a4a"/><rect x="445" y="946" width="12" height="90" fill="#6a4a32"/><rect x="655" y="946" width="12" height="90" fill="#6a4a32"/>`;
  // curtains: hang straight, then billow inward with the wind
  const cur = (x0, dir) => { let d = `M${x0},${WY - 30}`; const b = w * (60 + 25 * Math.sin(T * 5 + x0)); for (let y = WY - 30; y <= 1010; y += 40) { const k = (y - WY + 30) / (1040 - WY), off = dir * b * Math.sin(k * 3.1) + Math.sin(T * 7 + y * .03) * 8 * w; d += ` L${(x0 + off).toFixed(1)},${y}`; } d += ` L${x0 + dir * 70},1010 L${x0 + dir * 70},${WY - 30}Z`; return `<path d="${d}" fill="#c8a878" opacity=".95"/><path d="${d}" fill="#000" opacity=".12" transform="translate(${dir * 8},0)"/>`; };
  s += `<rect x="${WX - 60}" y="${WY - 40}" width="${WW + 120}" height="10" rx="4" fill="#6a5a4a"/>` + cur(WX - 40, 1) + cur(WX + WW + 40, -1);
  // papers lifting off the desk and flying across the room
  const rp = RS(31); for (let i = 0; i < 9; i++) { const ph = clamp((T - (WS(1, 3) - st) - i * .15) * .6), x = 470 + rp() * 180 + ph * (-300 - rp() * 200), y = 922 - ph * (200 + rp() * 300) + Math.sin(ph * 9 + i) * 30; s += `<rect x="${x}" y="${y}" width="34" height="44" fill="#f8f6f0" stroke="#c8c4bc" transform="rotate(${(ph * 400 + i * 40) % 360},${x + 17},${y + 22})"/>`; }
  // wind streaks
  for (let i = 0; i < 12; i++) { const ph = pmod(T * 1.3 + i / 12, 1), y = WY + 60 + (i * 47) % (WH - 80); s += `<path d="M${WX + WW * .5 + ph * 260},${y} q30,-8 70,0" stroke="#fff" stroke-width="2" fill="none" opacity="${(w * .5 * (1 - ph)).toFixed(2)}"/>`; }
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// a city seen from high up, looking down at a slant: asphalt streets, blocks of buildings with lit roofs and shaded faces, parks, haze to the horizon
function cityBelow(t) {
  const HY = 600; let s = `<rect y="${HY}" width="720" height="${1280 - HY}" fill="#55575a"/>`;
  const r = RS(41), P = (X, Z) => [360 + X * 300 / Z, HY + 760 / Z];
  for (let Z = 30; Z >= 1.05; Z /= 1.12) { const Z2 = Z / 1.12, haze = clamp((Z - 2) / 26);
    for (let X = -Z * 1.4; X < Z * 1.4; X += .95) { if (r() < .07) { const a = P(X + .1, Z), b = P(X + .85, Z), c = P(X + .85, Z2 * 1.02), d = P(X + .1, Z2 * 1.02); s += `<path d="M${PT(a)} L${PT(b)} L${PT(c)} L${PT(d)}Z" fill="${mix('#4a6a34', '#a8b8c8', haze * .8)}"/>`; continue; }
      const nb = 2 + Math.floor(r() * 3); for (let q = 0; q < nb; q++) { const x0 = X + .1 + q * .8 / nb + .02, x1 = x0 + .8 / nb - .05, h = (.15 + r() * .8) / Z * 80 * (r() < .08 ? 2.5 : 1);
        const a = P(x0, Z), b = P(x1, Z), c = P(x1, Z2 * 1.04), d = P(x0, Z2 * 1.04), col = mix(['#a89c88', '#8a8478', '#b8ac98', '#7a746a', '#9a8e7e', '#6a6a70'][Math.floor(r() * 5)], '#b8c6d4', haze * .75);
        s += `<path d="M${PT(d)} L${PT(c)} L${c[0].toFixed(1)},${(c[1] - h).toFixed(1)} L${d[0].toFixed(1)},${(d[1] - h).toFixed(1)}Z" fill="${mix(col, '#2a2a30', .35 * (1 - haze))}"/>` +
          `<path d="M${a[0].toFixed(1)},${(a[1] - h).toFixed(1)} L${b[0].toFixed(1)},${(b[1] - h).toFixed(1)} L${c[0].toFixed(1)},${(c[1] - h).toFixed(1)} L${d[0].toFixed(1)},${(d[1] - h).toFixed(1)}Z" fill="${mix(col, '#ffffff', .12)}"/>` +
          (x0 > 0 ? `<path d="M${b[0].toFixed(1)},${b[1].toFixed(1)} L${c[0].toFixed(1)},${c[1].toFixed(1)} L${c[0].toFixed(1)},${(c[1] - h).toFixed(1)} L${b[0].toFixed(1)},${(b[1] - h).toFixed(1)}Z" fill="${mix(col, '#1a1a20', .5 * (1 - haze))}"/>` : `<path d="M${a[0].toFixed(1)},${a[1].toFixed(1)} L${d[0].toFixed(1)},${d[1].toFixed(1)} L${d[0].toFixed(1)},${(d[1] - h).toFixed(1)} L${a[0].toFixed(1)},${(a[1] - h).toFixed(1)}Z" fill="${mix(col, '#1a1a20', .5 * (1 - haze))}"/>`); } } }
  s += `<rect y="${HY}" width="720" height="${1280 - HY}" fill="#000" filter="url(#grainR)" opacity=".15"/><rect y="${HY - 40}" width="720" height="220" fill="#d0dce8" opacity=".45" filter="url(#soft)"/>`;
  return s;
}
// 2: the top of a skyscraper: a man leans on the floor-to-ceiling glass; it vanishes – nothing between him and a 300 m drop
function sceneTower(t) {
  const st = S0(2) - .2, T = t - st, g = ease(ramp(t, WS(2, 5) - .1, WS(2, 5) + .4)), back = ease(ramp(t, WS(2, 6), WS(2, 8)));
  let s = `<defs>${DEFB()}<linearGradient id="skT2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a72b8"/><stop offset="1" stop-color="#d8e4ec"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skT2)"/>` + cumulus(560, 380, 180, 9, { a: .8 });
  s += cityBelow(t);
  // the glass wall: mullions + panes
  const GX = 0, GW = 720, GY = 260, GH = 900;
  s += glare(GX, GY, GW, GH, 1 - g, 'T2') + popSpark(0, GY, 720, GH, ramp(t, WS(2, 5) - .1, WS(2, 5) + .6), 11);
  s += `<g opacity="${(1 - g * .85).toFixed(2)}">` + [0, 240, 480, 720].map(x => `<rect x="${x - 7}" y="${GY}" width="14" height="${GH}" fill="#3a4048"/>`).join('') + `</g>`;
  // the office floor edge and ceiling
  s += `<path d="M-20,1150 L740,1150 L740,1290 L-20,1290Z" fill="#5a5450"/><path d="M-20,1150 L740,1150" stroke="#2a2624" stroke-width="6"/><rect y="0" width="720" height="${GY}" fill="#e8e4de"/><rect y="${GY - 18}" width="720" height="18" fill="#c8c4bc"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${60 + i * 170}" y="${GY - 70}" width="110" height="16" rx="4" fill="#fffbe8"/>`).join('');
  // the man: leaning with one hand on the glass, then pulling back
  const px = lerp(500, 400, back), lean = lerp(.18, -.08, back);
  s += `<g transform="rotate(${lean * 57},${px},1150)">` + person(px, 1150, { s: 1.15, face: 1, top: '#2a3a5a', pants: '#2a2a30', skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: -.3 }) + `</g>`;
  s += `<g opacity="${ramp(t, WS(2, 11), WS(2, 12))}"><path d="M60,600 L60,1100" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/>` + lbl(80, 860, '≈ ٣٠٠ م', 1, '#fff', 30, 'start') + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 3: a car on a motorway: the windscreen vanishes – wind hits the driver's face, hair and tie flying
function sceneCar(t) {
  const st = S0(3) - .2, T = t - st, g = ease(ramp(t, WS(3, 2) - .1, WS(3, 3) + .3)), w = ease(ramp(t, WS(3, 4) - .2, WS(3, 6) + .3));
  let s = `<defs>${DEFB()}<linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e72b8"/><stop offset="1" stop-color="#d8e0e4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skC)"/>` + cumulus(160, 420, 200, 12, { a: .85 });
  s += mountainsR(760, 160, 52, { rock: '#7a8088', haze: .45, hazeCol: '#b8c8d8' }) + forestR(800, 30, 40, 70, 9, '#3a5a2e', { haze: .3, hazeCol: '#a8b8c8' });
  s += `<path d="M-20,820 L740,820 L740,1290 L-20,1290Z" fill="#5a5c60"/><path d="M-20,820 L740,820 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let i = 0; i < 8; i++) { const ph = pmod(T * 2.2 + i / 8, 1), x = 740 - ph * 900; s += `<rect x="${x}" y="1180" width="90" height="10" fill="#f2f0e8" opacity=".85"/>`; }
  for (let i = 0; i < 6; i++) { const ph = pmod(T * 2.2 + i / 6, 1), x = 760 - ph * 900; s += `<rect x="${x}" y="822" width="6" height="40" fill="#c8ccd0"/>`; }
  // the car, close, side-on: body, windows, driver inside
  const cx = 360, cy = 1150 + Math.sin(T * 9) * 1.5, sc = 2.6;
  s += `<g transform="translate(${cx},${cy}) scale(${sc})"><ellipse cx="0" cy="2" rx="125" ry="8" fill="#000" opacity=".35"/>` +
    `<path d="M-115,-22 L-112,-52 Q-100,-60 -70,-62 L-40,-96 Q-30,-104 10,-104 L50,-104 Q66,-102 80,-64 L108,-58 Q120,-54 120,-36 L118,-22Z" fill="#b8282a"/><path d="M-115,-22 L118,-22 L118,-30 L-115,-30Z" fill="#000" opacity=".2"/>` +
    `<path d="M-34,-92 L-4,-92 L-4,-64 L-60,-64Z M4,-92 L46,-92 Q58,-90 68,-64 L4,-64Z" fill="#c8d8e4" opacity=".55"/>` +
    // driver: head and shoulders in the front window
    `<g transform="translate(26,-66)"><path d="M-14,2 Q-12,-14 0,-16 Q12,-14 14,2Z" fill="#2a3a5a"/><circle cx="2" cy="-22" r="9" fill="${CROWD[1].skin}"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${-6 + i * 2},-30 q${-6 - w * 10},${-2 - Math.sin(T * 30 + i) * 2 * w} ${-10 - w * 14},${-1 + Math.sin(T * 25 + i) * 3 * w}" stroke="#2a1e18" stroke-width="2.2" fill="none"/>`).join('') + `<circle cx="7" cy="-23" r="1.2" fill="#000"/></g>` +
    `<path d="M68,-64 L46,-92 L50,-104 Q66,-102 80,-64Z" fill="#c8d8e4" opacity="${(.6 * (1 - g)).toFixed(2)}"/><path d="M60,-66 L44,-96" stroke="#fff" stroke-width="2" opacity="${(.6 * (1 - g)).toFixed(2)}"/>` +
    `<circle cx="-72" cy="-18" r="20" fill="#1a1a1a"/><circle cx="-72" cy="-18" r="10" fill="#9a9aa0" transform="rotate(${T * 900},-72,-18)"/><circle cx="76" cy="-18" r="20" fill="#1a1a1a"/><circle cx="76" cy="-18" r="10" fill="#9a9aa0"/><rect x="110" y="-50" width="10" height="8" rx="2" fill="#e8e0c0"/></g>`;
  s += glare(cx + 4 * sc, cy - 92 * sc, 64 * sc, 28 * sc, 1 - g, 'C3') + popSpark(cx + 4 * sc, cy - 104 * sc, 76 * sc, 40 * sc, ramp(t, WS(3, 2) - .1, WS(3, 2) + .6), 13);
  for (let i = 0; i < 14; i++) { const ph = pmod(T * 3 + i / 14, 1), y = cy - 100 * sc + (i * 13) % 80; s += `<path d="M${720 - ph * 500},${y} l-80,0" stroke="#fff" stroke-width="2.5" opacity="${(.55 * w * (1 - ph)).toFixed(2)}"/>`; }
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 4-6: the hidden hit – undersea fibre-optic cables (night Earth); a cable cross-section; the pulses stop
const EC = { x: 360, y: 800, r: 300, a: 1, sunI: .25, lights: 1, rot: rotFor(-25), tilt: 0, xr: .5, spin: 0 };
const CABLES = [[[40.7, -74], [45, -45], [50.5, -20], [50.8, -4.5]], [[38.9, -77], [42, -50], [44, -25], [43.3, -2]], [[25.8, -80.2], [20, -55], [15, -35], [14.7, -17.4]], [[-23, -43.2], [-10, -30], [5, -20], [14.7, -17.4]], [[36.8, -1], [36, 12], [32, 30], [27, 34], [13, 43], [19, 72.8]], [[43.3, 5.4], [35, 18], [31.2, 32.3]], [[-33.9, 18.4], [-20, 5], [0, 0], [6.4, 3.4]], [[51, 1.5], [55, -10], [60, -30], [64, -22]]];
function cablePath(c, e, t) { let d = '', vis = 1; for (let i = 0; i < c.length - 1; i++) for (let q = 0; q <= 8; q++) { const u = q / 8, la = lerp(c[i][0], c[i + 1][0], u), lo = lerp(c[i][1], c[i + 1][1], u), p = geoXY(la, lo, e, t); if (p[2] < 0) vis = 0; d += (d ? ' L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); } return [d, vis]; }
function cablesOv(t, on, k) {
  let o = ''; CABLES.forEach((c, i) => { const [d] = cablePath(c, EC, t); o += `<path d="${d}" stroke="#4ad8ff" stroke-width="3" fill="none" opacity="${(.35 * k).toFixed(2)}" filter="url(#blur2)"/><path d="${d}" stroke="${on > .5 ? '#bff4ff' : '#506070'}" stroke-width="1.6" fill="none" opacity="${k.toFixed(2)}"/>`;
    if (on > 0) o += `<path d="${d}" stroke="#ffffff" stroke-width="3.2" fill="none" stroke-dasharray="6 60" stroke-dashoffset="${-t * 90 - i * 20}" opacity="${(k * on).toFixed(2)}"/>`; });
  return o;
}
function sceneNet(t) {
  const k = ease(ramp(t, WS(4, 3) - .2, WS(4, 4) + .4));
  let s = space(t, '#020308', '#060a18');
  F.earth = EC; F.light = [900, 300]; F.moon = null; F.sun = null;
  F.ov = cablesOv(t, 1, k) + lbl(360, 1180, 'كابلات الإنترنت تحت البحار', k, '#9ae8ff', 26);
  return s;
}
// 5: a cable cut open: armour, copper, and hair-thin glass fibres carrying pulses of light
function sceneFibre(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 8) - .3, WS(5, 10) + .3)), z = ease(ramp(t, WS(5, 11) - .3, WS(5, 12) + .4));
  let s = `<defs>${DEFB()}<radialGradient id="seaF" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#1a4a6a"/><stop offset="1" stop-color="#020a18"/></radialGradient><linearGradient id="armF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e44"/><stop offset=".5" stop-color="#1a1c20"/><stop offset="1" stop-color="#0a0a0c"/></linearGradient></defs><rect width="720" height="1280" fill="url(#seaF)"/>`;
  for (let i = 0; i < 8; i++) { const x = (i * 97 + T * 6) % 760 - 20; s += `<path d="M${x},300 L${x + 60},1280" stroke="#4a8ab8" stroke-width="30" opacity=".05" filter="url(#soft)"/>`; }
  s += `<path d="M-20,1150 Q360,1110 740,1160 L740,1290 L-20,1290Z" fill="#3a3428"/><path d="M-20,1150 Q360,1110 740,1160 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  // the cable lying on the seabed, receding
  s += `<path d="M-40,1080 Q300,1020 760,900" stroke="#1a1c20" stroke-width="58" fill="none"/><path d="M-40,1068 Q300,1008 760,888" stroke="#4a4e54" stroke-width="10" fill="none" opacity=".6"/>`;
  // cross-section, big
  const cx = 360, cy = 650, R = 230 * (1 + .1 * z);
  s += `<g opacity="${k}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#111316"/><circle cx="${cx}" cy="${cy}" r="${R * .96}" fill="none" stroke="#2a2c30" stroke-width="${R * .06}"/>` +
    Array.from({ length: 24 }, (_, i) => { const a = i / 24 * 6.283, rr = R * .8; return `<circle cx="${(cx + Math.cos(a) * rr).toFixed(1)}" cy="${(cy + Math.sin(a) * rr).toFixed(1)}" r="${R * .095}" fill="#7a7e84"/><circle cx="${(cx + Math.cos(a) * rr - R * .03).toFixed(1)}" cy="${(cy + Math.sin(a) * rr - R * .03).toFixed(1)}" r="${R * .035}" fill="#c8ccd0" opacity=".6"/>`; }).join('') +
    `<circle cx="${cx}" cy="${cy}" r="${R * .66}" fill="#d0d4d8"/><circle cx="${cx}" cy="${cy}" r="${R * .58}" fill="#c87a3a"/><circle cx="${cx}" cy="${cy}" r="${R * .52}" fill="#e8c890"/><circle cx="${cx}" cy="${cy}" r="${R * .42}" fill="#1a2028"/>` +
    Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 6.283, rr = R * (i % 2 ? .27 : .14), x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr, fl = .55 + .45 * Math.sin(T * 9 + i * 1.7); return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R * .05}" fill="#9ae8ff" opacity="${(.4 * fl).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${R * .022}" fill="#ffffff" opacity="${fl.toFixed(2)}"/>`; }).join('') +
    lbl(cx, cy + R + 50, 'ألياف زجاجية بسُمك شعرة', 1, '#9ae8ff', 26) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 6: five seconds: the cables go dark, calls drop, a 5-second counter
function sceneCut(t) {
  const st = S0(6) - .2, cut = ramp(t, S0(6) - .1, S0(6) + .3), cnt = clamp((t - S0(6)) / ((S0(7) - .4) - S0(6)) * 5, 0, 5);
  let s = space(t, '#020308', '#060a18');
  F.earth = Object.assign({}, EC, { lights: lerp(1, .35, cut) }); F.light = [900, 300]; F.moon = null; F.sun = null;
  let o = cablesOv(t, 1 - cut, 1);
  const icon = (x, y, tx, a) => `<g transform="translate(${x},${y})" opacity="${a}"><rect x="-80" y="-36" width="160" height="72" rx="16" fill="#0a0e1c" opacity=".88"/>` + lbl(0, 10, tx, 1, '#ff8a7a', 22) + `</g>`;
  o += icon(150, 440, 'مكالمات ✕', ramp(t, WS(6, 4) - .1, WS(6, 4) + .2)) + icon(360, 400, 'بثّ ✕', ramp(t, WS(6, 5) - .1, WS(6, 5) + .2)) + icon(570, 440, 'دفع ✕', ramp(t, WS(6, 6) - .1, WS(6, 6) + .2));
  o += `<g transform="translate(360,1170)"><rect x="-90" y="-40" width="180" height="70" rx="14" fill="#0a0e1c" opacity=".88"/><text x="0" y="12" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="40" fill="#ff8a7a">${(5 - cnt).toFixed(1)} s</text></g>`;
  F.ov = o; return s;
}
// 7: the surprise: most eyeglasses survive – their lenses are plastic today
function sceneGlasses(t) {
  const st = S0(7) - .2, T = t - st, k = ease(ramp(t, WS(7, 1) - .2, WS(7, 3) + .3)), lab = ramp(t, WS(7, 8) - .2, WS(7, 8) + .3);
  let s = cityDay(t, { id: 'g7' }) + `<rect width="720" height="1280" fill="#0a1028" opacity=".55"/><defs>${DEFB()}<radialGradient id="lnG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".6" stop-color="#cfe4f4" stop-opacity=".12"/><stop offset="1" stop-color="#9ac0e0" stop-opacity=".28"/></radialGradient></defs>`;
  const cx = 360, cy = 700, sc = 1 + .03 * Math.sin(T);
  s += `<g transform="translate(${cx},${cy}) scale(${sc}) rotate(-4)" opacity="${k}"><ellipse cx="0" cy="150" rx="300" ry="20" fill="#000" opacity=".35" filter="url(#blur2)"/>` +
    `<path d="M-300,-30 L-330,10 M300,-30 L330,10" stroke="#1a1a1e" stroke-width="12" stroke-linecap="round"/><path d="M-40,-20 Q0,-50 40,-20" stroke="#1a1a1e" stroke-width="12" fill="none"/>` +
    [-160, 160].map(x => `<rect x="${x - 118}" y="-84" width="236" height="168" rx="66" fill="#cfe4f4" opacity=".08"/><rect x="${x - 118}" y="-84" width="236" height="168" rx="66" fill="url(#lnG)" opacity=".7"/><rect x="${x - 118}" y="-84" width="236" height="168" rx="66" fill="none" stroke="#1a1a1e" stroke-width="12"/><path d="M${x - 70},-60 Q${x - 90},0 ${x - 60},50" stroke="#fff" stroke-width="8" fill="none" opacity=".45"/>`).join('') + `</g>`;
  s += `<g opacity="${lab}"><g transform="translate(360,1010)"><rect x="-200" y="-40" width="400" height="76" rx="18" fill="#0a0e1c" opacity=".88"/>` + lbl(0, 10, 'العدسات: بلاستيك ✓', 1, '#9af09a', 30) + `</g></g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
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
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneRoom }, { s: S0(2) - .2, f: sceneTower }, { s: S0(3) - .2, f: sceneCar }, { s: S0(4) - .2, f: sceneNet },
  { s: S0(5) - .2, f: sceneFibre }, { s: S0(6) - .2, f: sceneCut }, { s: S0(7) - .2, f: sceneGlasses }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneNet, sceneFibre, sceneCut]);
const XF = .5;
const TLI = [['النوافذ', S0(1)], ['ناطحات السحاب', S0(2)], ['السيارات', S0(3)], ['الإنترنت', S0(4)]];
const LIST_ON = new Set([sceneRoom, sceneTower, sceneCar]);
const CHIPS = [
  ['c1', 'بلا زجاج', 360, 330, 'big', WS(1, 1), WS(1, 8)],
  ['c2', 'فراغ!', 360, 330, 'red', WS(2, 9), S0(3) - .3],
  ['c3', '≈ ٩٩٪ من البيانات بين القارات', 360, 330, 'big', WS(5, 3), S0(6) - .3],
  ['c4', 'انقطاع ٥ ثوانٍ', 360, 330, 'red', WS(6, 2), S0(7) - .3],
  ['c5', 'المفاجأة', 360, 330, 'big', WS(7, 0), WS(7, 6)],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">عالم بلا زجاج</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
