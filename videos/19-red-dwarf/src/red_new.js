
// ===================== "what if the Sun suddenly became a red dwarf?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFR = () => `${RDEF}${RDEF2}${CUDEF}`;
const tShrink = () => WS(0, 6);
// a red dwarf drawn in 2D: limb-darkened orange-red disc with starspots and a soft glow
function rdDisc(x, y, r, a = 1, id = 'rd') {
  return `<defs><radialGradient id="${id}G" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd8a8"/><stop offset=".55" stop-color="#ff8a3a"/><stop offset=".9" stop-color="#d8461a"/><stop offset="1" stop-color="#a02a0a"/></radialGradient></defs><g opacity="${a}"><circle cx="${x}" cy="${y}" r="${r * 4.5}" fill="#ff5a1a" opacity=".12" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r * 2}" fill="#ff7a2a" opacity=".3" filter="url(#soft)"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}G)"/>` +
    (r > 20 ? [[-.3, -.2, .16], [.25, .3, .12], [.1, -.45, .09]].map(([dx, dy, s]) => `<ellipse cx="${x + dx * r}" cy="${y + dy * r}" rx="${s * r}" ry="${s * r * .7}" fill="#8a1e06" opacity=".45"/>`).join('') : '') + `</g>`;
}
function ballP(x, y, r, c0, c1, id, extra = '') {
  return `<defs><radialGradient id="${id}" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></radialGradient></defs><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id})"/>${extra}`;
}
function thermo2(x, top, bot, v, vmin = -220, vmax = 20) {
  const yOf = c => lerp(bot - 50, top + 30, (c - vmin) / (vmax - vmin));
  let s = `<rect x="${x - 30}" y="${top}" width="60" height="${bot - top}" rx="30" fill="#f4f6f8" opacity=".94"/><rect x="${x - 11}" y="${top + 16}" width="22" height="${bot - top - 50}" rx="11" fill="#d8dee4"/><circle cx="${x}" cy="${bot - 32}" r="24" fill="#2a7ad8"/><rect x="${x - 7}" y="${yOf(v)}" width="14" height="${bot - 32 - yOf(v)}" fill="#2a7ad8"/>`;
  for (let c = vmin; c <= vmax; c += 40) s += `<rect x="${x + 13}" y="${yOf(c) - 1}" width="12" height="2" fill="#333"/><text x="${x + 32}" y="${yOf(c) + 6}" font-family="Space Grotesk" font-weight="700" font-size="17" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${c}°</text>`;
  return s + lbl(x + 20, top - 14, v < 0 ? `${AR(Math.abs(Math.round(v)))}° تحت الصفر` : `${AR(Math.round(v))}°م`, 1, '#cfe4ff', 26);
}
function milkyWay(t, o = {}) {
  const r = RS(o.seed || 71); let s = `<g transform="rotate(${o.rot ?? -28},360,640)"><ellipse cx="360" cy="640" rx="900" ry="150" fill="#3a3a6a" opacity=".35" filter="url(#soft)"/><ellipse cx="360" cy="640" rx="700" ry="80" fill="#c8b89a" opacity=".22" filter="url(#soft)"/><ellipse cx="420" cy="640" rx="260" ry="60" fill="#f4e0c0" opacity=".25" filter="url(#soft)"/>`;
  for (let i = 0; i < 6; i++) { const x0 = -200 + i * 200; s += `<path d="M${x0},${640 + (r() - .5) * 30} q60,${-20 + r() * 40} 120,${(r() - .5) * 20} t140,${(r() - .5) * 30}" stroke="#0a0a14" stroke-width="${10 + r() * 18}" fill="none" opacity=".55" filter="url(#blur2)"/>`; }
  for (let i = 0; i < 700; i++) { const g = (r() + r() + r() + r()) / 2 - 1, x = -300 + r() * 1320, y = 640 + g * 220, z = r(); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.4 + z * z * 1.4).toFixed(2)}" fill="${z > .9 ? (r() > .5 ? '#ffd8b0' : '#cfe0ff') : '#ffffff'}" opacity="${(.35 + .5 * z * (.7 + .3 * Math.sin(t * 2 + i))).toFixed(2)}"/>`; }
  return s + `</g>`;
}
// 0: a city street at midday – then the Sun collapses into a small orange-red dot and the light drains away
function sceneHook(t) {
  const ts = tShrink(), k = ease(ramp(t, ts, ts + .9));
  const sky = [mix('#3e72b8', '#3a2a2a', k), mix('#96bce0', '#7a4a32', k), mix('#e8e2d0', '#c8784a', k)];
  let s = bareStreet(t, { id: 'r0', green: 1, sky, sunR: lerp(30, 4.5, k), sunCol: mix('#fffdf2', '#ffd8a8', k), glowR: lerp(150, 22, k), glowCol: mix('#fff6d0', '#ff8a4a', k), sunGlow: lerp(.28, .45, k), afterSky: `<defs>${CUDEF}</defs>` + cumulus(380 + t * 6, 420, 240, 1, { a: .95 * (1 - .5 * k) }) + cumulus(600, 560, 180, 2, { a: .9 * (1 - .5 * k) }), lamps: k * .8 });
  s += `<rect width="720" height="1280" fill="#2a1408" opacity="${.42 * k}"/><rect width="720" height="1280" fill="#ff7a2a" opacity="${.1 * k}"/>`;
  s += onWalk(200 + Math.min(t, ts) * 28, 1088, CROWD[0], .55, 1, t, { moving: t < ts ? 1 : 0, phase: t * 6, lookUp: k * .55 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { lookUp: k * .55 });
  F.ov = ''; F.flash = 0; return s;
}
// 1: what a red dwarf is: the real Sun beside a red dwarf (to scale in size), surface temperatures; then 3 in 4 stars of the galaxy are red dwarfs
function sceneWhat(t) {
  const q = ease(ramp(t, WS(1, 6) - .3, WS(1, 6) + .5));
  let s = space(t, '#04040c', '#0a0a1a');
  F.sun = { x: 230, y: 760, r: 200, a: 1 - q, hue: 0 }; F.earth = null; F.moon = null;
  let o = `<g opacity="${1 - q}">` + rdDisc(560, 760, 200 / 6.5, 1, 'rw') + lbl(230, 1010, 'الشمس', 1, '#fff', 30) + lbl(230, 1046, 'نحو ٥٥٠٠°م على السطح', 1, '#ffd890', 22) + lbl(560, 830, 'قزم أحمر', 1, '#fff', 30) + lbl(560, 866, 'نحو ٢٨٠٠°م', 1, '#ffb080', 22) + `</g>`;
  if (q > 0) { const r = RS(9); o += `<g opacity="${q}">` + milkyWay(t, { rot: -20 }); for (let i = 0; i < 100; i++) { const x = 160 + (i % 10) * 44, y = 560 + Math.floor(i / 10) * 44, red = i % 4 !== 3; o += `<circle cx="${x}" cy="${y}" r="${red ? 7 : 9}" fill="${red ? '#ff6a2a' : ['#fff4d8', '#cfe0ff', '#ffe8a0'][i % 3]}" opacity="${ramp(t, WS(1, 7) + i * .012, WS(1, 7) + i * .012 + .2)}"/><circle cx="${x}" cy="${y}" r="${red ? 13 : 15}" fill="${red ? '#ff6a2a' : '#ffffff'}" opacity="${.15 * ramp(t, WS(1, 7) + i * .012, WS(1, 7) + i * .012 + .2)}"/>`; } o += `</g>`; }
  F.ov = o; return s;
}
// 2: the same street at "noon": a tiny orange sun, the sky a dim rust-brown, street lamps and shop lights on, everyone looking up; a light meter dropping
function sceneDim(t) {
  const k = ease(ramp(t, WS(2, 6) - .3, WS(2, 9) + .3)), lm = ramp(t, WS(2, 10) - .2, WS(2, 12) + .3);
  let s = bareStreet(t, { id: 'r2', green: 1, sky: ['#1e1418', '#5a3424', '#a85a32'], sunR: 4.5, sunCol: '#ffd8a8', glowR: 22, glowCol: '#ff8a4a', sunGlow: .45, lamps: 1, afterSky: stars(.25, t) });
  s += `<rect width="720" height="1280" fill="#1a0c06" opacity="${.35 + .2 * k}"/><rect width="720" height="1280" fill="#ff6a1a" opacity=".08"/>`;
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw]) => { s += `<rect x="${sx + 6}" y="920" width="${sw - 12}" height="74" fill="#ffd890" opacity=".35"/><ellipse cx="${sx + sw / 2}" cy="1010" rx="${sw * .6}" ry="16" fill="#ffd890" opacity=".18" filter="url(#soft)"/>`; });
  s += onWalk(250, 1088, CROWD[0], .55, 1, t, { lookUp: .6, phone: .8 }) + onWalk(430, 1084, CROWD[2], .53, -1, t, { lookUp: .7 }) + onWalk(560, 1080, CROWD[1], .5, -1, t, { lookUp: .5, phone: .6 });
  s += `<g opacity="${lm}" transform="translate(470,420)"><rect width="220" height="120" rx="14" fill="#0a0e1c" opacity=".82"/>` + lbl(110, 36, 'ضوء النهار', 1, '#cfd8ff', 20) + `<rect x="20" y="56" width="180" height="18" rx="9" fill="#2a3046"/><rect x="20" y="56" width="${180 * lerp(1, .02, lm)}" height="18" rx="9" fill="${mix('#f4c76b', '#ff5a2a', lm)}"/>` + lbl(110, 106, 'أخفت بآلاف المرّات', 1, '#ffb080', 18) + `</g>`;
  F.ov = ''; return s;
}
// 3: gravity: the red dwarf at the centre (3D), Earth on its orbit; the star's mass gauge falls to ~1/8 – the pull arrow shrinks, the speed arrow stays
function sceneGrav(t) {
  const m = ease(ramp(t, WS(3, 4) - .2, WS(3, 9) + .3)), go = ease(ramp(t, WS(3, 10), S0(4) + .4));
  let s = space(t, '#04040c', '#0a0a1a');
  const cx = 360, cy = 760, R = 250, a0 = -1.0 + t * .05, ex = cx + Math.cos(a0) * R + go * 160 * Math.sin(a0) * -1, ey = cy + Math.sin(a0) * R + go * 160 * Math.cos(a0);
  F.sun = { x: cx, y: cy, r: lerp(70, 40, m), a: 1, hue: 1 }; F.earth = { x: ex, y: ey, r: 34, a: 1, sunI: .5, lights: .5, rot: 2 }; F.light = [cx, cy]; F.moon = null;
  const gl = 120 * lerp(1, .35, m), tx = -Math.sin(a0), ty = Math.cos(a0), gx = (cx - ex) / R, gy = (cy - ey) / R;
  let o = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#9ab0d8" stroke-width="2" stroke-dasharray="8 8" opacity="${.6 * (1 - go)}"/>`;
  o += `<path d="M${ex + gx * 44},${ey + gy * 44} L${ex + gx * (44 + gl)},${ey + gy * (44 + gl)}" stroke="#ff7a4a" stroke-width="8" stroke-linecap="round"/><path d="M${ex + gx * (44 + gl) - gy * 12 - gx * 18},${ey + gy * (44 + gl) + gx * 12 - gy * 18} L${ex + gx * (44 + gl)},${ey + gy * (44 + gl)} L${ex + gx * (44 + gl) + gy * 12 - gx * 18},${ey + gy * (44 + gl) - gx * 12 - gy * 18}" stroke="#ff7a4a" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
  o += `<path d="M${ex + tx * 44},${ey + ty * 44} L${ex + tx * 170},${ey + ty * 170}" stroke="#6ad0ff" stroke-width="8" stroke-linecap="round"/><path d="M${ex + tx * 170 - ty * 12 - tx * 18},${ey + ty * 170 + tx * 12 - ty * 18} L${ex + tx * 170},${ey + ty * 170} L${ex + tx * 170 + ty * 12 - tx * 18},${ey + ty * 170 - tx * 12 - ty * 18}" stroke="#6ad0ff" stroke-width="7" fill="none" stroke-linejoin="round"/>`;
  o += lbl(ex + gx * (60 + gl) + 10, ey + gy * (60 + gl) + 40, 'الجاذبية', 1, '#ffb090', 22) + lbl(ex + tx * 190, ey + ty * 190 + 34, 'سرعة الأرض', 1, '#9ae0ff', 22);
  o += `<g transform="translate(40,420)"><rect width="250" height="110" rx="14" fill="#0a0e1c" opacity=".82"/>` + lbl(125, 34, 'كتلة النجم', 1, '#cfd8ff', 20) + `<rect x="20" y="52" width="210" height="20" rx="10" fill="#2a3046"/><rect x="20" y="52" width="${210 * lerp(1, .122, m)}" height="20" rx="10" fill="${mix('#f4c76b', '#ff5a2a', m)}"/>` + lbl(125, 98, `${AR(Math.round(lerp(100, 12, m)))}٪ من كتلة الشمس`, 1, '#fff', 18) + `</g>`;
  F.ov = o; return s;
}
// 4: every planet flies off along its path (top-down, not to scale): Mercury to Neptune escaping the weakened star
function sceneFly(t) {
  const st = S0(4) - .2, T = Math.max(0, t - st), k = ease(ramp(t, st, st + 1));
  let s = space(t, '#03030a', '#08081a');
  const cx = 360, cy = 760, P = [['عطارد', 52, '#c8c0b8', '#5a5450', 5, 4.1], ['الزهرة', 82, '#f4e4c0', '#a88a5a', 8, 3.2], ['الأرض', 116, '#8ac8ff', '#1a4a8a', 9, 2.7], ['المريخ', 152, '#f0905a', '#7a2a12', 7, 2.2], ['المشتري', 206, '#f0d8b0', '#8a6a4a', 18, 1.2], ['زحل', 258, '#f4e4b8', '#9a8458', 15, .9], ['أورانوس', 300, '#c8f0f4', '#4a9aa8', 11, .63], ['نبتون', 336, '#9ab8ff', '#1a3a9a', 11, .5]];
  let o = rdDisc(cx, cy, 16, 1, 'rf');
  P.forEach(([nm, R, c0, c1, r, w], i) => { const a0 = i * 2.1 + .4, ang = a0 + w * .25, px0 = cx + Math.cos(ang) * R, py0 = cy + Math.sin(ang) * R * .9, tx = -Math.sin(ang), ty = Math.cos(ang) * .9, sp = 30 * Math.sqrt(116 / R) * 1.4;
    const d = sp * T * 1.5, px = px0 + tx * d + (px0 - cx) / R * d * .25, py = py0 + ty * d + (py0 - cy) / R * d * .25;
    o += `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${R * .9}" fill="none" stroke="#5a6a8a" stroke-width="1.5" opacity="${(.5 * (1 - k * .7)).toFixed(2)}"/>`;
    o += `<path d="M${px0.toFixed(1)},${py0.toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)}" stroke="${c0}" stroke-width="${Math.max(2, r * .5)}" stroke-linecap="round" opacity=".35"/>`;
    o += ballP(px, py, r, c0, c1, 'pl' + i, i === 5 ? `<ellipse cx="${px}" cy="${py}" rx="${r * 2.2}" ry="${r * .55}" fill="none" stroke="#e8d8a8" stroke-width="3" opacity=".8"/>` : i === 4 ? `<path d="M${px - r * .9},${py - r * .25} h${r * 1.8} M${px - r * .95},${py + r * .2} h${r * 1.9}" stroke="#a8784a" stroke-width="2.5" opacity=".7"/>` : '');
    if (px > 30 && px < 690 && py > 280 && py < 1240) o += lbl(px, py - r - 10, nm, .9, '#fff', 17); });
  o += lbl(360, 1230, '* الأحجام والمسافات ليست بمقياسها الحقيقي', .55, '#fff', 16);
  F.sun = null; F.earth = null; F.moon = null; F.ov = o; return s;
}
// 5: Earth drifting off (3D), the red dwarf shrinking to a dim dot behind; distance and year counters
function sceneFar(t) {
  const st = S0(5) - .2, T = t - st, yrs = Math.max(0, T / 1.3), dist = 150 + 820 * yrs;
  let s = space(t, '#020208', '#05050f');
  const sr = 26 / (1 + yrs * 1.1);
  F.earth = { x: 410, y: 820, r: 270, a: 1, sunI: Math.max(.08, .55 / (1 + yrs * .8)), lights: .9, rot: 1.6 + T * .02, tilt: .41 }; F.light = [120, 520]; F.sun = null; F.moon = null;
  let o = rdDisc(120, 520, sr, Math.max(.35, 1 / (1 + yrs * .5)), 'rr');
  o += `<g transform="translate(40,330)"><rect width="300" height="120" rx="14" fill="#0a0e1c" opacity=".8"/>` + lbl(150, 36, `السنة ${AR(Math.min(5, Math.floor(yrs) + 1))}`, 1, '#cfd8ff', 22) + lbl(150, 86, `${AR(Math.round(dist))} مليون كم`, 1, '#ffb080', 30) + `</g>`;
  F.ov = o; return s;
}
// 6: the city street buried in ice under a black sky, no lights; the thermometer sinks below −200 °C
function sceneIce(t) {
  const k = ease(ramp(t, S0(6) - .2, WS(6, 9) + .5));
  let s = bareStreet(t, { id: 'r6', green: 0, sky: ['#000003', '#04050c', '#0a0c18'], sunR: 1.2, sunCol: '#ff9a60', glowR: 8, glowCol: '#ff7a3a', sunGlow: .5, afterSky: stars(1, t) });
  s += `<rect width="720" height="1280" fill="#081020" opacity=".55"/>`;
  const drift = `M-20,1004 Q90,990 180,1002 T380,996 T560,1004 T740,996 L740,1290 L-20,1290Z`; s += `<path d="${drift}" fill="#cfdcea" opacity=".9"/><path d="${drift}" fill="#5a7aa0" filter="url(#stainD)" opacity=".4"/><path d="${drift}" fill="#000" filter="url(#grainR)" opacity=".12"/>` + [[520, 1170, .95], [150, 1250, .9]].map(([cx, cy, sc]) => `<path d="M${cx - 140 * sc},${cy + 4} Q${cx - 120 * sc},${cy - 70 * sc} ${cx - 40 * sc},${cy - 112 * sc} Q${cx + 30 * sc},${cy - 126 * sc} ${cx + 100 * sc},${cy - 80 * sc} Q${cx + 140 * sc},${cy - 50 * sc} ${cx + 150 * sc},${cy + 4}Z" fill="#e4ecf6"/><path d="M${cx - 120 * sc},${cy - 70 * sc} Q${cx - 40 * sc},${cy - 120 * sc} ${cx + 100 * sc},${cy - 80 * sc}" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`).join('') + Array.from({ length: 10 }, (_, q) => `<ellipse cx="${q * 80 + 20}" cy="${1030 + (q % 3) * 22}" rx="60" ry="8" fill="#8aa4c4" opacity=".35"/>`).join('');
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw]) => { s += `<path d="M${sx - 12},922 Q${sx + sw / 2},914 ${sx + sw + 12},922 L${sx + sw + 12},928 L${sx - 12},928Z" fill="#eef4fa"/>` + Array.from({ length: Math.floor(sw / 14) }, (_, q) => `<path d="M${sx - 8 + q * 14},928 l3,${10 + (q % 3) * 8} l3,${-10 - (q % 3) * 8}" fill="#cfe4f4"/>`).join(''); });
  s += `<rect y="700" width="720" height="300" fill="#cfe0f4" filter="url(#stainD)" opacity=".25"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 3), x = pmod(r() * 760 + t * 8, 760) - 20, y = pmod(r() * 1300 + t * 20, 1300); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.8 + r() * 1.8).toFixed(1)}" fill="#fff" opacity=".6"/>`; }
  s += `<rect width="720" height="1280" fill="#1a3a6a" opacity=".18"/>` + thermo2(110, 470, 960, lerp(15, -215, k));
  F.ov = ''; return s;
}
// 7: millennia later: under a black, airless sky the air itself freezes – nitrogen and oxygen snow drifting onto a dead, frosted mountain landscape
function sceneAir(t) {
  const k = ease(ramp(t, WS(7, 3) - .2, WS(7, 7) + .4));
  let s = `<defs>${DEFR()}</defs><rect width="720" height="1280" fill="#010104"/>` + milkyWay(t, { rot: -32, seed: 5 }) + rdDisc(560, 360, 1.6, .8, 'ra');
  s += mountainsR(860, 300, 151, { rock: '#4a5468', snowAt: .9, snow: '#cfdcf0', n0: 5, el: 25, k1: 1.1, shadeA: .6 }) + mountainsR(920, 160, 152, { rock: '#3a4458', snowAt: .7, snow: '#c8d6ec', n0: 8, k1: 1.05, shadeA: .6 });
  s += `<rect x="-20" y="915" width="760" height="40" fill="#1a2030"/>` + forestR(930, 34, 50, 90, 16, '#2a3040', { snow: 1, lightCol: '#9ab0d0', lit: .2 }) + forestR(970, 24, 90, 150, 17, '#222a38', { snow: 1, lightCol: '#9ab0d0', lit: .2 });
  s += `<path d="M-20,975 Q200,960 360,970 T740,965 L740,1290 L-20,1290Z" fill="#b8c8de"/><path d="M-20,975 Q200,960 360,970 T740,965 L740,1290 L-20,1290Z" fill="#fff" filter="url(#stainD)" opacity=".4"/><path d="M-20,975 Q200,960 360,970 T740,965 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<rect y="975" width="720" height="${315 * k}" fill="#e4eefa" opacity="${.45 * k}"/>`;
  for (let i = 0; i < 160; i++) { const r = RS(i + 41), z = r(), x = pmod(r() * 760 + Math.sin(t * .6 + i) * 18 * z, 760) - 20, y = pmod(r() * 1300 + t * (24 + 46 * z), 1300) - 20; s += `<path d="M${x.toFixed(1)},${(y - 3 * z - 1).toFixed(1)} v${(6 * z + 2).toFixed(1)} M${(x - 3 * z - 1).toFixed(1)},${y.toFixed(1)} h${(6 * z + 2).toFixed(1)}" stroke="#dfeaff" stroke-width="${(.6 + z).toFixed(1)}" opacity="${((.35 + .6 * z) * k).toFixed(2)}"/>`; }
  s += lbl(360, 1180, 'النيتروجين يتجمّد عند −٢١٠°م', ramp(t, WS(7, 6) - .2, WS(7, 6) + .3), '#cfe4ff', 28);
  F.ov = ''; return s;
}
// 8: the Milky Way: rogue planets drifting dark between the stars
function sceneRogue(t) {
  let s = `<defs>${DEFR()}</defs><rect width="720" height="1280" fill="#020208"/>` + milkyWay(t, { rot: -24, seed: 8 });
  const r = RS(301); for (let i = 0; i < 9; i++) { const x = 60 + r() * 600 + t * (3 + r() * 6), y = 400 + r() * 760, rr = 8 + r() * 30, a = ramp(t, S0(8) + .4 + i * .25, S0(8) + .8 + i * .25);
    s += `<g opacity="${a}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="#0a0c14"/><path d="M${(x - rr * .7).toFixed(1)},${(y - rr * .7).toFixed(1)} A${rr},${rr} 0 0 1 ${(x + rr * .2).toFixed(1)},${(y - rr).toFixed(1)}" stroke="#7a8ab0" stroke-width="${(1 + rr * .06).toFixed(1)}" fill="none" opacity=".7"/></g>`; }
  F.ov = ''; return s;
}
// 9: red dwarfs live for trillions of years (bars), then Proxima b: tidally locked, an open ocean facing a huge red star, ice on the night side; a flare
function sceneDwarfs(t) {
  const q = ease(ramp(t, WS(9, 6) - .3, WS(9, 6) + .4)), bars = ramp(t, WS(9, 3) - .2, WS(9, 4) + .4);
  let s = space(t, '#04030a', '#0c0612');
  if (q < 1) { s += `<g opacity="${1 - q}"><rect x="40" y="560" width="640" height="260" rx="18" fill="#0a0e1c" opacity=".8"/>` + lbl(660, 618, 'عمر الشمس: نحو ١٠ مليارات سنة', 1, '#ffd890', 24, 'end') + `<rect x="60" y="640" width="${60 * bars}" height="26" rx="8" fill="#f4c76b"/>` +
      lbl(660, 718, 'عمر القزم الأحمر: تريليونات السنين', 1, '#ffb080', 24, 'end') + `<rect x="60" y="740" width="${640 * bars}" height="26" rx="8" fill="#ff5a2a"/><path d="M${60 + 640 * bars},740 l20,13 l-20,13Z" fill="#ff5a2a" opacity="${bars}"/></g>`; F.sun = null; F.moon = null; }
  if (q > 0) { F.sun = { x: 40, y: 640, r: 300, a: q, hue: 1 }; F.moon = { x: 520, y: 800, r: 150, a: q, sunI: 1.1, rot: Math.PI + .5, spin: 0, tilt: 0 }; F.light = [40, 640];
    const fl = pmod(t * .5, 1); s += `<g opacity="${q}"><path d="M300,${560 - fl * 40} q${60 + fl * 80},${-60 - fl * 50} ${30 + fl * 40},${-140 - fl * 60}" stroke="#ffb060" stroke-width="${10 * (1 - fl)}" fill="none" opacity="${.7 * (1 - fl)}" filter="url(#blur2)"/></g>`; }
  F.earth = null;
  F.ov = `<g opacity="${q}">` + lbl(520, 1000, 'بروكسيما بي', 1, '#fff', 32) + lbl(520, 1040, 'على بُعد ٤٫٢ سنة ضوئية', 1, '#ffb080', 22) + `</g>`;
  return s;
}
// 10: reassurance + CTA: our real Sun and Earth; the Sun's actual fate in a chip
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 8) - .2, WS(10, 8) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.sun = { x: -80, y: 520, r: 260, a: 1, hue: 0 }; F.earth = { x: 420, y: 780, r: 230, a: 1, sunI: 1, lights: .3, rot: 4.8, tilt: .41 }; F.light = [-80, 520]; F.moon = null;
  F.ov = `<g opacity="${q}"><text x="420" y="430" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 12), WS(10, 12) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWhat }, { s: S0(2) - .2, f: sceneDim }, { s: S0(3) - .2, f: sceneGrav }, { s: S0(4) - .2, f: sceneFly },
  { s: S0(5) - .2, f: sceneFar }, { s: S0(6) - .2, f: sceneIce }, { s: S0(7) - .2, f: sceneAir }, { s: S0(8) - .2, f: sceneRogue }, { s: S0(9) - .2, f: sceneDwarfs }, { s: S0(10) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneWhat, sceneGrav, sceneFly, sceneFar, sceneDwarfs]);
const XF = .5;
const TLI = [['الانطلاق', S0(4)], ['التجمّد', S0(6)], ['تجمّد الهواء', S0(7)]];
const LIST_ON = new Set([sceneFly, sceneFar, sceneIce, sceneAir]);
const CHIPS = [
  ['c1', 'أصغر وأبرد', 360, 330, 'big', WS(1, 3), WS(1, 6)],
  ['c2', 'نحو ٣ من كل ٤ نجوم', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c3', 'أعتم من الغسق', 360, 330, 'big', WS(2, 10), S0(3) - .3],
  ['c4', 'نحو ثُمن كتلة الشمس', 360, 330, 'red', WS(3, 7), S0(4) - .3],
  ['c5', 'تتحرر كل الكواكب', 360, 330, 'big', WS(4, 2), S0(5) - .3],
  ['c6', '+٨٠٠ مليون كم كل سنة', 470, 1180, 'big', WS(5, 5), S0(6) - .3],
  ['c7', 'مليارات الكواكب التائهة', 360, 330, 'big', WS(8, 5), S0(9) - .3],
  ['c8', 'مصيرها: عملاق أحمر بعد ~٥ مليارات سنة', 360, 330, '', WS(10, 2), WS(10, 8)],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 12), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:200px"><div class="hd">رحلة الأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
