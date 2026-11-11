// ===================== "what if a global nuclear war broke out?" (Short #30) =====================
const gl = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * .03, Ld = sunFor((o.az ?? .25) + t * .02), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]); F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; return { cam, spin, cN, c0, R: c0[2] / Math.sqrt(1 - 1 / (cN * cN)) }; };
const vis3 = (g, P) => clamp(((P[0] * g.cam.pos[0] + P[1] * g.cam.pos[1] + P[2] * g.cam.pos[2]) / g.cN - .1) / .25);
const ARCS = (() => { const r = RS(12), o = []; for (let i = 0; i < 26; i++) { const a = Math.floor(r() * 60), b = (a + 7 + Math.floor(r() * 40)) % 70; o.push([a, b, r()]); } return o; })();
function arcs(g, t, t0, dur) {
  let s = '';
  ARCS.forEach(([a, b, rr], i) => { const st = t0 + rr * dur, k = clamp((t - st) / 1.3); if (k <= 0) return; const A = geo3(CITIES[a][0], CITIES[a][1], g.spin), B = geo3(CITIES[b][0], CITIES[b][1], g.spin); let d = '', last = null, n = 0;
    for (let j = 0; j <= 24 * k; j++) { const u = j / 24, h = 1 + .22 * Math.sin(Math.PI * u), P = [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u, A[2] + (B[2] - A[2]) * u], L = Math.hypot(...P), Q = P.map(x => x / L * h); if (vis3(g, Q) <= 0) { d += ' '; n = 0; continue; } const p = proj3(g.cam, Q); d += (n ? ' L' : ' M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); n++; last = p; }
    if (d.trim()) s += `<path d="${d}" stroke="#ffb24a" stroke-width="2.2" fill="none" stroke-opacity="${(.85 * (1 - clamp((t - st - 1.6) / 1.2))).toFixed(2)}"/>`;
    if (k < 1 && last) s += `<circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3.5" fill="#fff"/>`;
    if (k >= 1 && vis3(g, B) > 0) { const p = proj3(g.cam, B), f = clamp((t - st - 1.3) / 1.6); s += `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(6 + 22 * f).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - f * .7).toFixed(2)}"/><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${(3 + 3 * (1 - f)).toFixed(1)}" fill="#fff" opacity="${(1 - f * .5).toFixed(2)}"/>`; } });
  return s;
}
function sceneHook(t) { const g = gl(t); F.ov = `<defs>${SDEF}</defs>` + arcs(g, t, .1, 1.6); F.earth = null; F.moon = null; F.sun = null; return space(t); }
// 1: more than 12,000 warheads
function sceneCount(t) {
  const g = gl(t), k = ease(ramp(t, WS(1, 3), WS(1, 9) + .2)); let o = `<defs>${SDEF}</defs>` + arcs(g, t, .1, 1.6), r = RS(3);
  o += panel(150, 1010, 420, 180) + lbl(360, 1062, 'رؤوسٌ نوويّة في العالم', 1, '#cfd8ff', 24) + lbl(360, 1146, `+${AR(Math.round(12000 * k))}`, 1, '#ff7a5a', 60);
  for (let i = 0; i < 120 * k; i++) { const x = 60 + (i % 20) * 31.5, y = 1220 + Math.floor(i / 20) * 9; o += `<rect x="${x}" y="${y}" width="20" height="5" rx="2" fill="#ff7a5a" opacity=".8"/>`; }
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
function mushroom(x, y, k, t) {
  const h = 360 * k, cw = 110 + 80 * k, cy = y - h;
  return `<g filter="url(#cloudF)"><path d="M${x - 36 - 20 * k},${y} C${x - 20},${y - h * .4} ${x - 46},${y - h * .7} ${x - 30},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#8a6a52"/><path d="M${x - 10},${y} C${x},${y - h * .5} ${x - 14},${y - h * .8} ${x},${cy} L${x + 30},${cy} C${x + 46},${y - h * .7} ${x + 20},${y - h * .4} ${x + 36 + 20 * k},${y}Z" fill="#4a3a30" opacity=".6"/>` +
    `<ellipse cx="${x}" cy="${y - 10}" rx="${120 + 160 * k}" ry="${26 + 20 * k}" fill="#9a8672"/>` +
    [[0, 0, 1, '#b08060'], [-.5, .12, .62, '#96705a'], [.5, .12, .62, '#7a5a4a'], [-.2, -.2, .7, '#e0a060'], [.15, -.26, .55, '#ffcf80']].map(([dx, dy, s, c]) => `<ellipse cx="${x + dx * cw}" cy="${cy + dy * cw}" rx="${cw * s}" ry="${cw * s * .52}" fill="${c}"/>`).join('') + `<ellipse cx="${x}" cy="${cy + cw * .28}" rx="${cw * .8}" ry="${cw * .16}" fill="#3a2a24" opacity=".5"/></g>`;
}
// different places around the world (same drawn style): 0 street by day, 1 street at night, 2 coast, 3 snowy mountain city, 4 desert city, 5 river city at dusk
function place(t, v, dk = 0) {
  const sk = (a, b, c) => `<defs>${DEFB()}${BDEF}<linearGradient id="pk${v}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix(a, '#1a1412', dk)}"/><stop offset=".6" stop-color="${mix(b, '#5a3a2a', dk)}"/><stop offset="1" stop-color="${mix(c, '#c8643a', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#pk${v})"/>`;
  if (v === 0) return { s: streetS(t, { id: 'p0', sky: [mix('#3a6fb8', '#1a1412', dk), mix('#93bbe2', '#5a3a2a', dk), mix('#ebe3d0', '#c8643a', dk)] }), gy: 900, sc: 1 };
  if (v === 1) return { s: streetS(t, { id: 'p1', cars: 0, sky: [mix('#070b24', '#1a1412', dk), mix('#1a2450', '#5a3a2a', dk), mix('#3a3a66', '#c8643a', dk)] }) + `<rect width="720" height="1280" fill="#060a20" opacity=".5"/>` + stars(.8 * (1 - dk), t) + [28, 250, 694].map(x => `<circle cx="${x + 18}" cy="838" r="110" fill="url(#lampG)" opacity=".7"/>`).join(''), gy: 900, sc: 1 };
  if (v === 2) { let s = sk('#2a5a9a', '#8ab4d8', '#f0d8b0') + cumulus(180, 420, 220, 4, { a: .85 }) + farCity(41, 850, '#7a8aa0', { hk: 1.3 }) + `<rect y="850" width="720" height="430" fill="${mix('#2a6a9a', '#3a2a24', dk)}"/><rect y="850" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
    for (let i = 0; i < 26; i++) { const z = i / 25, y = 862 + z * z * 400; s += `<path d="M${pmod(i * 173 + t * 20 * (i % 2 ? 1 : -1), 760) - 30},${y} q${20 + 40 * z},${-3 - 5 * z} ${40 + 80 * z},0" stroke="#dff0ff" stroke-width="${1 + 2.5 * z}" fill="none" stroke-opacity="${.25 + .3 * z}"/>`; } return { s, gy: 850, sc: .8 }; }
  if (v === 3) return { s: sk('#5a7a9a', '#a8bcd0', '#e8eef2') + mountainsR(880, 330, 7, { snow: .5 }) + farCity(52, 930, '#8a94a4', { hk: .8 }) + `<rect y="930" width="720" height="350" fill="#eef2f6"/><rect y="930" width="720" height="350" fill="#000" filter="url(#grainR)" opacity=".12"/>` + forestR(960, 9, 90, 150, 3, '#2a4a3a', {}) + snow(t, 60, .8), gy: 930, sc: .7 };
  if (v === 4) return { s: sk('#c8843a', '#e8b878', '#f8e0b0') + `<circle cx="540" cy="420" r="40" fill="#fff6dc"/>` + mountainsR(900, 120, 9, {}) + farCity(63, 930, '#b89a78', { hk: .9 }) + `<path d="M-20,930 Q200,900 380,935 T740,925 L740,1280 L-20,1280Z" fill="#d8b070"/><path d="M-20,1040 Q260,990 460,1050 T740,1030 L740,1280 L-20,1280Z" fill="#c89858"/><rect y="930" width="720" height="350" fill="#000" filter="url(#grainR)" opacity=".2"/>`, gy: 930, sc: .75 };
  let s = sk('#3a3a7a', '#c86a6a', '#f8c080') + farCity(74, 880, '#4a4466', { hk: 1.5 }) + `<rect y="880" width="720" height="60" fill="#2a2840"/><rect y="940" width="720" height="340" fill="${mix('#6a5a8a', '#3a2a24', dk)}"/>` + [120, 300, 480, 660].map(x => `<rect x="${x - 8}" y="900" width="16" height="70" fill="#1e1c30"/>`).join('') + `<rect y="892" width="720" height="14" fill="#1e1c30"/><rect y="940" width="720" height="340" fill="#f8c080" opacity=".18"/>`;
  return { s, gy: 880, sc: .85 };
}
// 2: explosions in city after city around the world: flash, fireball, blast ring, mushroom cloud
function boom(x, gy, sc, u, t) {
  const fb = ease(ramp(u, 0, .18)), k = ease(ramp(u, .12, 1.05)), w = clamp((u - .05) / .9); if (u <= 0) return '';
  let s = `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.35 * fb).toFixed(2)}"/><defs><radialGradient id="fbG"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#fff3c0"/><stop offset=".8" stop-color="#ffb04a" stop-opacity=".8"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient></defs>`;
  s += `<g transform="translate(${x},${gy}) scale(${sc}) translate(${-x},${-gy})">` + (k > 0 ? mushroom(x, gy, k, t) : '') + `<circle cx="${x}" cy="${gy - 20 - 360 * k}" r="${(170 * fb * (1 - .75 * k)).toFixed(1)}" fill="url(#fbG)" opacity="${(1 - k * .9).toFixed(2)}"/><circle cx="${x}" cy="${gy - 20 - 360 * k}" r="${(300 * fb * (1 - .6 * k)).toFixed(1)}" fill="url(#goldG)" opacity="${(1 - k).toFixed(2)}"/>` +
    (w > 0 && w < 1 ? `<ellipse cx="${x}" cy="${gy}" rx="${(80 + w * 760).toFixed(1)}" ry="${(30 + w * 400).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(14 * (1 - w) + 2).toFixed(1)}" stroke-opacity="${(.7 * (1 - w)).toFixed(2)}"/>` : '') + `</g>`;
  return s;
}
const SHOTS2 = [[0, 360], [2, 420], [3, 300], [1, 380], [4, 330], [5, 400]];
function sceneBlast(t) {
  const st = S0(2) - .2, t0 = WS(2, 1), en = S0(3) - .2, n = SHOTS2.length, dur = (en - t0) / n, i = t < t0 ? 0 : Math.min(n - 1, Math.floor((t - t0) / dur)), u = t - (t0 + i * dur), [v, x] = SHOTS2[i], P = place(t, v);
  const s = P.s + boom(x, P.gy, P.sc, t < t0 ? 0 : u + .001, t);
  F.flash = t < t0 ? 0 : .95 * clamp(1 - Math.abs(u - .06) / .22);
  noEarth(); F.ov = ''; return s;
}
// 3: cities burn everywhere and send black smoke into the stratosphere: ~150 million tonnes
const SHOTS3 = [1, 2, 5, 0];
function sceneSoot(t) {
  const st = S0(3) - .2, T = t - st, en = S0(4) - .2, n = SHOTS3.length, dur = (en - st) / n, i = Math.min(n - 1, Math.floor(T / dur)), k = ease(ramp(t, WS(3, 9), WS(3, 13) + .2)), dk = .75, P = place(t, SHOTS3[i], dk), gy = P.gy + 30;
  let s = P.s + `<rect width="720" height="1280" fill="#1a0c06" opacity=".4"/>`;
  [70, 190, 330, 470, 610].forEach((x, q) => { for (let j = 0; j < 9; j++) { const ph = pmod(T * (.16 + .03 * q) + j / 9, 1), y = gy - ph * 950, w = 40 + ph * 150; s += `<ellipse cx="${(x + Math.sin(ph * 5 + q + j + i) * 30 + ph * 60).toFixed(1)}" cy="${y.toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .7).toFixed(1)}" fill="#0c0a0a" opacity="${(.5 * Math.sin(Math.min(1, ph * 4) * 1.57)).toFixed(2)}" filter="url(#blur9)"/>`; }
    for (let j = 0; j < 4; j++) { const fl = (40 + 30 * Math.sin(T * 9 + q * 2 + j * 1.7)) * P.sc; s += `<path d="M${x - 26 + j * 16},${gy} q8,${-fl} 4,${-fl * 1.6} q10,${fl * .6} 12,${fl * 1.6}Z" fill="url(#flameG)"/>`; }
    s += `<circle cx="${x}" cy="${gy - 20}" r="110" fill="url(#fireGlow)" opacity=".5"/>`; });
  s += panel(160, 1030, 400, 170) + lbl(360, 1082, 'دخانٌ يصعدُ إلى الجوّ', 1, '#cfd8ff', 24) + lbl(360, 1158, `${AR(Math.round(150 * k))} مليون طنّ`, 1, '#f4c76b', 46);
  F.flash = .5 * clamp(1 - Math.abs(T - i * dur - .05) / .15) * (i > 0 ? 1 : 0);
  noEarth(); F.ov = ''; return s;
}
// 4: nuclear winter: the smoke veils the planet and it cools by about 9 degrees
function veil(g, k) { return `<defs><radialGradient id="vlG"><stop offset="0" stop-color="#3a3a3e" stop-opacity=".82"/><stop offset=".8" stop-color="#2a2a2e" stop-opacity=".9"/><stop offset="1" stop-color="#1a1a1e" stop-opacity=".95"/></radialGradient><filter id="vlF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .2  0 0 0 0 .22  0 0 0 2.2 -.75"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs><circle cx="${g.c0[0].toFixed(1)}" cy="${g.c0[1].toFixed(1)}" r="${(g.R + 3).toFixed(1)}" fill="url(#vlG)" opacity="${(k * .8).toFixed(2)}"/><circle cx="${g.c0[0].toFixed(1)}" cy="${g.c0[1].toFixed(1)}" r="${(g.R + 3).toFixed(1)}" fill="#fff" filter="url(#vlF)" opacity="${(k * .5).toFixed(2)}"/>`; }
function sceneWinter(t) {
  const k = ease(ramp(t, WS(4, 0), WS(4, 4) + .4)), kt = ease(ramp(t, WS(4, 5), WS(4, 10) + .2)), g = gl(t, { sunI: 1 - .45 * k });
  let o = `<defs>${SDEF}</defs>` + veil(g, k);
  o += panel(110, 1010, 500, 190) + `<rect x="150" y="1040" width="26" height="110" rx="13" fill="#1c2440" stroke="#dfe6ff" stroke-width="2.5"/><rect x="156" y="${1050 + 60 * kt}" width="14" height="${94 - 60 * kt}" rx="7" fill="${mix('#ff6a4a', '#6ab4ff', kt)}"/><circle cx="163" cy="1160" r="20" fill="${mix('#ff6a4a', '#6ab4ff', kt)}" stroke="#dfe6ff" stroke-width="2.5"/>` + lbl(400, 1070, 'حرارةُ الأرض', 1, '#cfd8ff', 24) + lbl(400, 1150, `${AR(Math.round(9 * kt))} درجات أقلّ`, 1, '#9ad0ff', 46);
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
// 5: crops die in the fields under a dim sun
function sceneCrops(t) {
  const st = S0(5) - .2, T = t - st, dk = ease(ramp(T, 0, 2.2));
  let s = `<defs>${DEFB()}<linearGradient id="skc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a7a9a', '#2a2c32', dk)}"/><stop offset="1" stop-color="${mix('#c8d0c8', '#6a6a6c', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skc)"/><circle cx="520" cy="470" r="120" fill="#fff6d0" opacity="${(.25 - .15 * dk).toFixed(2)}" filter="url(#soft)"/><circle cx="520" cy="470" r="26" fill="${mix('#fffdf2', '#b8a898', dk)}"/>`;
  s += mountainsR(820, 150, 5, {}) + `<rect y="800" width="720" height="480" fill="${mix('#b89a4a', '#8e8a84', dk)}"/><rect y="800" width="720" height="480" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<rect x="90" y="740" width="110" height="64" fill="#5a4a40"/><path d="M80,742 L145,700 L210,742Z" fill="#3a2e28"/><rect x="130" y="768" width="22" height="36" fill="#2a201a"/>`;
  const r = RS(4); for (let row = 0; row < 11; row++) { const z = row / 10, y = 830 + Math.pow(z, 1.5) * 420, n = Math.round(30 - 14 * z), h = 26 + 90 * z;
    for (let i = 0; i < n; i++) { const x = (i + r() * .6) * 760 / n - 20, droop = dk * (30 + r() * 50) * (r() > .5 ? 1 : -1) * z, col = mix('#c8a23a', '#5a4e3a', dk); s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(droop * .2).toFixed(1)},${(-h * .6).toFixed(1)} ${droop.toFixed(1)},${(-h * (1 - .45 * dk)).toFixed(1)}" stroke="${col}" stroke-width="${(1.5 + 3 * z).toFixed(1)}" fill="none"/><ellipse cx="${(x + droop).toFixed(1)}" cy="${(y - h * (1 - .45 * dk)).toFixed(1)}" rx="${(2 + 4 * z).toFixed(1)}" ry="${(5 + 9 * z).toFixed(1)}" fill="${col}"/>`; } }
  s += `<rect y="800" width="720" height="480" fill="#eef2f6" opacity="${(.22 * dk).toFixed(2)}"/>` + snow(t, 90, dk * .9);
  noEarth(); F.ov = ''; return s;
}
// 6: most victims die of famine, not of the bombs: more than 5 billion
function sceneFamine(t) {
  const g = gl(t, { sunI: .55 }), k1 = ease(ramp(t, WS(6, 3), WS(6, 5) + .3)), k2 = ease(ramp(t, WS(6, 6), WS(6, 11) + .3)), BX = 640, BW = 430;
  let o = `<defs>${SDEF}</defs>` + veil(g, 1);
  o += panel(50, 990, 620, 230) + lbl(BX - 44, 1052, 'القنابل', 1, '#ffc2b8', 24) + `<rect x="${BX - 100 - BW * .07 * k1}" y="1026" width="${BW * .07 * k1}" height="36" rx="6" fill="#e5483a"/>` + lbl(BX - 100 - BW * .07 - 110, 1052, 'مئاتُ الملايين', k1, '#fff', 22) +
    lbl(BX - 40, 1162, 'الجوع', 1, '#ffe4a0', 24) + `<rect x="${BX - 100 - BW * k2}" y="1136" width="${BW * k2}" height="36" rx="6" fill="#f4c76b"/>` + lbl(BX - 100 - BW / 2, 1162, '+٥ مليارات', k2 > .6 ? 1 : 0, '#1c140a', 24);
  F.ov = o; F.earth = null; F.moon = null; F.sun = null; return space(t);
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(7, 7) - .2, WS(7, 7) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(7)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(7)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(7, 9), WS(7, 9) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneBlast }, { s: S0(3) - .2, f: sceneSoot }, { s: S0(4) - .2, f: sceneWinter }, { s: S0(5) - .2, f: sceneCrops }, { s: S0(6) - .2, f: sceneFamine }, { s: S0(7) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneCount, sceneWinter, sceneFamine]);
const XF = .5;
const TLI = [['كرةُ نار', S0(2)], ['دخانٌ أسود', S0(3)], ['شتاءٌ نوويّ', S0(4)], ['مجاعة', S0(5)]];
const LIST_ON = new Set([sceneBlast, sceneSoot, sceneCrops]);
const CHIPS = [
  ['c1', '+١٢٬٠٠٠ رأسٍ نوويّ', 360, 330, 'red', WS(1, 6), S0(2) - .3], ['c3', '١٥٠ مليون طنّ', 360, 330, 'big', WS(3, 11), S0(4) - .3], ['c4', 'الشتاءُ النوويّ', 360, 330, 'ice', WS(4, 12), S0(5) - .3],
  ['c5', 'العالمُ كلُّه يجوع', 360, 330, 'big', WS(5, 4), S0(6) - .3], ['c6', 'الجوعُ أخطرُ من القنابل', 360, 330, 'red', WS(6, 7), S0(7) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(7, 9), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">حربٌ نوويّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
