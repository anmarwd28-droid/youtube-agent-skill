
// ===================== "what if Earth had a second moon (same size, half the distance)?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const lblL = (x, y, tx, a, col = '#fff', fs = 24) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
function container(x, y, w, h, col) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${y}" width="${w}" height="${h * .18}" fill="#fff" opacity=".18"/><rect x="${x + w * .82}" y="${y}" width="${w * .18}" height="${h}" fill="#000" opacity=".22"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1"/>`;
}
function ship(x, y, s, seed, dark = .4) {
  const r = RS(seed), cols = ['#c83a2a', '#2a6ac8', '#e8a020', '#3a8a4a', '#c8c8c8', '#2a8a8a'];
  let o = `<g transform="translate(${x},${y}) scale(${s})">`;
  o += `<path d="M-310,-30 L320,-30 L300,40 L-260,40 C-290,30 -312,10 -310,-30Z" fill="#1e2228"/><path d="M-300,22 L304,22 L300,40 L-260,40 C-280,34 -292,28 -300,22Z" fill="#7a2a1e"/>`;
  for (let b = 0; b < 9; b++) for (let tier = 0; tier < 3 + (b % 3 === 1 ? 1 : 0); tier++) o += container(-280 + b * 54, -58 - tier * 28, 52, 26, cols[Math.floor(r() * cols.length)]);
  o += `<rect x="210" y="-140" width="80" height="110" fill="#e2e2e0"/>` + Array.from({ length: 4 }, (_, k) => `<rect x="216" y="${-130 + k * 24}" width="68" height="8" fill="${k === 0 ? '#ffd890' : '#2a3442'}"/>`).join('') + `<rect x="270" y="-182" width="22" height="34" fill="#c83a2a"/>`;
  return `<g style="filter:brightness(${(1 - dark).toFixed(2)})">` + o + `</g></g>`;
}
// night sky colours that brighten with moonlight k (0 = one moon, 1 = two full moons)
const nightSky = k => [mix('#03060f', '#14284a', k), mix('#0a1430', '#2a4a78', k), mix('#1a2440', '#4a6890', k)];
function mDisc(x, y, r) { const q = RS(Math.round(r)); return `<circle cx="${x}" cy="${y}" r="${r}" fill="#c9c6c0"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#mdG)"/>` + Array.from({ length: 7 }, () => `<circle cx="${(x + (q() - .5) * r * 1.2).toFixed(1)}" cy="${(y + (q() - .5) * r * 1.2).toFixed(1)}" r="${(r * (.08 + q() * .16)).toFixed(1)}" fill="#8a8680" opacity=".45"/>`).join('') + `<defs><radialGradient id="mdG" cx=".38" cy=".35" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>`; }
const M1 = { x: 540, y: 360, r: 34 }, M2 = { x: 230, y: 470, r: 68 };
function moonsSky(t, a2, o = {}) {
  F.moon = { x: o.m1x ?? M1.x, y: o.m1y ?? M1.y, r: o.m1r ?? M1.r, a: 1, sunI: 1.25, full: 1, rot: 4.2 };
  F.moon2 = a2 > 0 ? { x: o.m2x ?? M2.x, y: o.m2y ?? M2.y, r: (o.m2r ?? M2.r), a: a2, sunI: 1.25, full: 1, rot: 1.3 } : null;
  F.earth = null; F.sun = null;
  const g = (m, a, R) => `<circle cx="${m.x}" cy="${m.y}" r="${R}" fill="#dfe8ff" opacity="${(.16 * a).toFixed(2)}" filter="url(#blur2)"/>`;
  return g(F.moon, .6, F.moon.r * 1.45) + (F.moon2 ? g(F.moon2, .6 * a2, F.moon2.r * 1.4) : '');
}
// 0: a night street anywhere in the world; our Moon, then a second, bigger moon rises – people stop and look up
function sceneHook(t) {
  const a2 = ease(ramp(t, WS(0, 4) - .3, WS(0, 5) + .4)), up = ease(ramp(t, WS(0, 4), WS(0, 6))), rise = lerp(620, M2.y, ease(ramp(t, WS(0, 4) - .3, WS(0, 7) + .6)));
  const glow = moonsSky(t, a2, { m2y: rise });
  let s = bareStreet(t, { id: 'h0', green: 1, sky: nightSky(.15 + .5 * a2), sunR: 0, glowR: 0, sunGlow: 0, lamps: 1, afterSky: stars(1 - .5 * a2, t) + glow });
  s += onWalk(150 + Math.min(t, WS(0, 5)) * 26, 1088, CROWD[0], .55, 1, t, { moving: t < WS(0, 5) ? 1 : 0, phase: t * 6, lookUp: .7 * up }) + onWalk(560, 1082, CROWD[1], .52, -1, t, { lookUp: .7 * up }) + onWalk(430, 1092, CROWD[3], .5, -1, t, { lookUp: .6 * up });
  F.ov = ''; return s;
}
// 1: the two orbits (not to scale): ours in 27 days, the new one in about 10 days; it looks twice as big
function sceneOrbit(t) {
  const st = S0(1) - .2, T = t - st, sz = ease(ramp(t, WS(1, 3) - .2, WS(1, 4) + .4)), pr = ramp(t, WS(1, 9) - .2, WS(1, 11) + .3);
  let s = space(t, '#03050f', '#0a1030') + `<defs>${DEFB()}</defs>`;
  const cx = 360, cy = 800, a1 = .9 + T * .18, a2 = .3 + T * .18 * 2.83;
  const m1 = [cx + Math.cos(a1) * 310, cy + Math.sin(a1) * 175], m2 = [cx + Math.cos(a2) * 175, cy + Math.sin(a2) * 100];
  F.earth = { x: cx, y: cy, r: 70, a: 1, sunI: 1.05, lights: .3, rot: 2.2, tilt: .41 }; F.light = [-300, 500]; F.sun = null;
  F.moon = { x: m1[0], y: m1[1], r: 22, a: 1, sunI: 1.15 }; F.moon2 = { x: m2[0], y: m2[1], r: 22, a: 1, sunI: 1.15 };
  let o = `<ellipse cx="${cx}" cy="${cy}" rx="310" ry="175" fill="none" stroke="#9ab0d8" stroke-width="2" stroke-dasharray="8 8" opacity=".6"/><ellipse cx="${cx}" cy="${cy}" rx="175" ry="100" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="8 8" opacity=".8"/>`;
  o += lbl(cx + 250, cy - 190, '٢٧ يوماً', pr, '#cfd8ff', 26) + lbl(cx - 150, cy - 118, '≈ ١٠ أيام', pr, '#f4c76b', 28) + lbl(360, 1150, 'ليس بمقياس الرسم', .55, '#9aa8c8', 20);
  // size in the sky: two discs side by side
  o += `<g opacity="${sz}" transform="translate(320,500)"><rect x="-200" y="-90" width="400" height="170" rx="18" fill="#0a0e1c" opacity=".85"/>${mDisc(-80, -10, 26)}${mDisc(80, -10, 52)}` +
    lbl(-80, 62, 'قمرنا', 1, '#cfd8ff', 22) + lbl(80, 66, 'القمر الجديد', 1, '#f4c76b', 22) + `</g>`;
  F.ov = o; return s;
}
// 2: nights under two full moons: 4 + 1 = 5 times our moonlight – blue light, long moon shadows, a light meter
function sceneNight(t) {
  const k = ease(ramp(t, WS(2, 3) - .2, WS(2, 6) + .4));
  const glow = moonsSky(t, 1);
  let s = bareStreet(t, { id: 'n2', green: 1, sky: nightSky(.35 + .65 * k), sunR: 0, glowR: 0, sunGlow: 0, lamps: 1 - .6 * k, afterSky: stars(.6 - .4 * k, t) + glow });
  s += `<rect y="600" width="720" height="680" fill="#9ab8ff" opacity="${(.12 * k).toFixed(2)}" style="mix-blend-mode:screen"/>`;
  [[180, 1088, 0, 1], [470, 1084, 1, -1]].forEach(([x, y, c, f]) => { s += `<ellipse cx="${x + 70}" cy="${y + 4}" rx="${60 + 40 * k}" ry="7" fill="#000" opacity="${(.15 + .35 * k).toFixed(2)}" transform="rotate(8,${x},${y})"/>` + onWalk(x, y, CROWD[c + 1], .54, f, t, { lookUp: .5 }); });
  const v = 1 + 4 * k;
  s += `<g transform="translate(40,560)"><rect width="280" height="120" rx="16" fill="#0a0e1c" opacity=".85"/>` + lbl(140, 38, 'ضوء الليل', 1, '#cfd8ff', 22) + `<rect x="24" y="62" width="232" height="16" rx="8" fill="#2a3048"/><rect x="24" y="62" width="${232 * v / 5}" height="16" rx="8" fill="#f4c76b"/>` + `<text x="140" y="110" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff">×${AR(v.toFixed(1)).replace('٫٠', '')}</text>` + `</g>`;
  F.ov = ''; return s;
}
// 3: the sea: tides several times higher – a coastal town on a slope; the flat sea surface climbs and floods the low streets and the beach
function sceneTide(t) {
  const hi = ease(ramp(t, WS(3, 4) - .2, WS(3, 12) + .4)), sea = lerp(1120, 975, hi), T = t - S0(3);
  const glow = moonsSky(t, 1, { m1x: 560, m1y: 330, m1r: 28, m2x: 200, m2y: 410, m2r: 56 });
  let s = `<defs>${DEFB()}<linearGradient id="skT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1630"/><stop offset=".7" stop-color="#22406a"/><stop offset="1" stop-color="#3a5a80"/></linearGradient>` +
    `<linearGradient id="seaT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#20406a"/><stop offset="1" stop-color="#0a1830"/></linearGradient><filter id="wavT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .07" numOctaves="3" seed="${3 + Math.floor(t * 8) % 20}"/><feColorMatrix values="0 0 0 0 .75  0 0 0 0 .85  0 0 0 0 1  0 0 0 1.6 -.8"/></filter></defs>`;
  s += `<rect width="720" height="1280" fill="url(#skT)"/>` + stars(.5, t) + glow;
  s += mountainsR(720, 140, 21, { rock: '#3a4458', base: '#1a2232', haze: .35, hazeCol: '#2a3a5a', shade: '#050810' });
  // open sea behind, to the horizon, with a moon path and a far ship
  s += `<rect y="720" width="720" height="560" fill="url(#seaT)"/><rect y="720" width="720" height="560" filter="url(#wavT)" opacity=".35"/><path d="M170,722 L250,722 L330,1280 L60,1280Z" fill="#e8ecff" opacity=".1" filter="url(#soft)"/>` + ship(560, 742 + Math.sin(T) * 2, .22, 7, .45);
  // the land: high on the left, sloping down to a beach on the right
  const land = 'M-20,800 C140,806 260,860 360,930 S600,1060 740,1090 L740,1280 L-20,1280Z';
  s += `<defs><linearGradient id="lnT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4e5a3e"/><stop offset="1" stop-color="#3a4630"/></linearGradient></defs><path d="${land}" fill="url(#lnT)"/><path d="${land}" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M-20,812 C140,818 260,872 360,942 S600,1072 740,1102" stroke="#6a6458" stroke-width="10" fill="none" opacity=".8"/><path d="M360,930 S600,1060 740,1090 L740,1130 S600,1100 360,975Z" fill="#c8b48a" opacity=".8"/>`;
  const r = RS(5); let town = '';
  [[10, 812], [70, 818], [130, 832], [190, 852], [250, 878], [310, 906], [372, 942], [436, 978], [500, 1010], [566, 1040]].forEach(([x, b], i) => { const w = 48 + r() * 8, h = 54 + r() * 46;
    town += `<rect x="${x}" y="${b - h}" width="${w}" height="${h + 30}" fill="${mix(['#d8c8b0', '#c8b8a0', '#e0d4c0', '#b8a890'][i % 4], '#1a2440', .5)}"/><rect x="${x + w * .75}" y="${b - h}" width="${w * .25}" height="${h + 30}" fill="#000" opacity=".25"/><path d="M${x - 3},${b - h} L${x + w / 2},${b - h - 18} L${x + w + 3},${b - h}Z" fill="#4a2e28"/>` +
      Array.from({ length: 4 }, (_, q) => `<rect x="${x + 7 + (q % 2) * 22}" y="${b - h + 12 + Math.floor(q / 2) * 22}" width="10" height="12" fill="${r() > .45 ? '#ffd890' : '#2a3448'}"/>`).join(''); });
  s += town + `<rect width="720" height="1280" fill="#0a1430" opacity=".28"/>`;
  [[40, 840, 46], [160, 900, 52], [640, 1110, 40]].forEach(([x, y, h]) => { s += treeR(x, y, h, x, t); });
  // the rising sea surface over the land (flat), foam line where it meets the slope
  s += `<path d="M-20,${sea} L740,${sea} L740,1290 L-20,1290Z" fill="url(#seaT)" opacity=".93"/><rect x="-20" y="${sea}" width="760" height="${1290 - sea}" filter="url(#wavT)" opacity=".4"/>`;
  for (let i = 0; i < 5; i++) { const y = sea + 4 + i * 5 + Math.sin(T * 2 + i) * 2; s += `<path d="M-20,${y} Q180,${y - 4} 360,${y} T740,${y}" stroke="#e8f0ff" stroke-width="2" fill="none" opacity="${(.4 - i * .07).toFixed(2)}"/>`; }
  [[600, 0], [680, 1.3]].forEach(([x, ph]) => { const y = sea - 4 + Math.sin(T * 1.6 + ph) * 3; s += `<g transform="translate(${x},${y}) rotate(${Math.sin(T * 1.3 + ph) * 3})"><path d="M-30,-6 L30,-6 L22,6 L-24,6Z" fill="#e8e4dc"/><path d="M-30,-6 L30,-6" stroke="#2a6ac8" stroke-width="3"/><rect x="-8" y="-18" width="16" height="12" fill="#d8d4cc"/></g>`; });
  s += `<g transform="translate(40,1130)"><rect width="250" height="110" rx="14" fill="#0a0e1c" opacity=".88"/>` + lbl(125, 34, 'ارتفاع المدّ', 1, '#cfd8ff', 20) + `<rect x="24" y="56" width="202" height="16" rx="8" fill="#2a3048"/><rect x="24" y="56" width="${202 * (.2 + .8 * hi)}" height="16" rx="8" fill="#4aa8ff"/>` + `</g>`;
  F.ov = ''; return s;
}
// 4: solar eclipses become common: the big moon slides over the Sun (corona), then a year strip with many eclipse marks
function sceneEclipse(t) {
  const cov = ease(ramp(t, S0(4) - .1, WS(4, 3) + .2)), yr = ease(ramp(t, WS(4, 5) - .3, WS(4, 8) + .4));
  let s = `<rect width="720" height="1280" fill="${mix('#3a6ab0', '#070a18', cov)}"/>` + stars(cov * .8, t);
  const sx = 360, sy = 600, mx = lerp(560, 360, cov);
  s += `<circle cx="${sx}" cy="${sy}" r="${150}" fill="#fff6e0" opacity="${(.45 * cov).toFixed(2)}" filter="url(#soft)"/><circle cx="${sx}" cy="${sy}" r="96" fill="#fff8e8" opacity="${(.5 * cov).toFixed(2)}" filter="url(#blur2)"/>` +
    Array.from({ length: 16 }, (_, i) => { const a = i / 16 * 6.283 + .2, L = 120 + 60 * Math.abs(Math.sin(i * 1.7)); return `<path d="M${sx + Math.cos(a) * 70},${sy + Math.sin(a) * 70} Q${sx + Math.cos(a + .08) * L * .8},${sy + Math.sin(a + .08) * L * .8} ${sx + Math.cos(a) * L},${sy + Math.sin(a) * L}" stroke="#fff0d0" stroke-width="5" fill="none" opacity="${(.35 * cov).toFixed(2)}" filter="url(#blur2)"/>`; }).join('');
  s += `<circle cx="${sx}" cy="${sy}" r="58" fill="#fffbe8"/><circle cx="${mx}" cy="${sy}" r="${66}" fill="#05060a"/>`;
  s += `<g opacity="${yr}" transform="translate(60,930)"><rect width="600" height="150" rx="16" fill="#0a0e1c" opacity=".88"/>` + lbl(300, 40, 'كسوفات خلال سنة واحدة', 1, '#cfd8ff', 22) + `<rect x="30" y="84" width="540" height="6" rx="3" fill="#3a4060"/>` +
    [70, 92, 114, 330, 352, 374].map((x, i) => `<circle cx="${30 + x * 540 / 600 + 40}" cy="87" r="13" fill="#05060a" stroke="#f4c76b" stroke-width="3" opacity="${ramp(yr, i / 7, i / 7 + .2)}"/>`).join('') + lbl(150, 132, 'اليوم: ٢–٥ في السنة', 1, '#9aa8c8', 18) + lbl(450, 132, 'مع قمرين: أكثر بكثير', 1, '#f4c76b', 18) + `</g>`;
  F.earth = null; F.moon = null; F.moon2 = null; F.sun = null; F.ov = ''; return s;
}
// 5: the two moons tug on each other: the orbits wobble and drift, then – over millions of years – they may collide
function sceneClash(t) {
  const st = S0(5) - .2, T = t - st, dr = ease(ramp(t, WS(5, 2), WS(5, 7))), hit = ramp(t, WS(5, 8) - .2, WS(5, 8) + .1), after = ramp(t, WS(5, 8), WS(5, 8) + 1.5);
  let s = space(t, '#03050f', '#0a1030');
  const cx = 360, cy = 760, a1 = .9 + T * .3, a2 = .3 + T * .3 * 2.4 + Math.sin(T * 3) * .1 * dr;
  const r2 = lerp(165, 250, dr) * (1 + .08 * Math.sin(T * 5) * dr), ry2 = r2 * .4;
  let m1 = [cx + Math.cos(a1) * 300, cy + Math.sin(a1) * 120], m2 = [cx + Math.cos(a2) * r2, cy + Math.sin(a2) * ry2];
  const meet = [cx + 250, cy + 70];
  if (hit > 0) { m1 = [lerp(m1[0], meet[0] + 18, hit), lerp(m1[1], meet[1], hit)]; m2 = [lerp(m2[0], meet[0] - 18, hit), lerp(m2[1], meet[1], hit)]; }
  F.earth = { x: cx, y: cy, r: 82, a: 1, sunI: 1.05, lights: .3, rot: 2.2, tilt: .41 }; F.light = [-300, 500]; F.sun = null;
  F.moon = { x: m1[0], y: m1[1], r: 24, a: 1 - after, sunI: 1.15 }; F.moon2 = { x: m2[0], y: m2[1], r: 24, a: 1 - after, sunI: 1.15 };
  let o = `<ellipse cx="${cx}" cy="${cy}" rx="300" ry="120" fill="none" stroke="#9ab0d8" stroke-width="2" stroke-dasharray="8 8" opacity="${.6 * (1 - hit)}"/><ellipse cx="${cx}" cy="${cy}" rx="${r2}" ry="${ry2}" fill="none" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="8 8" opacity="${.8 * (1 - hit)}"/>`;
  o += `<path d="M${m1[0]},${m1[1]} L${m2[0]},${m2[1]}" stroke="#ff9a6a" stroke-width="2" stroke-dasharray="4 6" opacity="${(.7 * ramp(t, WS(5, 1), WS(5, 2)) * (1 - hit)).toFixed(2)}"/>`;
  if (after > 0) { const r = RS(9); o += `<circle cx="${meet[0]}" cy="${meet[1]}" r="${30 + 80 * after}" fill="#ffd8a0" opacity="${(.8 * (1 - after)).toFixed(2)}" filter="url(#soft)"/>`;
    for (let i = 0; i < 60; i++) { const a = r() * 6.28, d = after * (30 + r() * 160); o += `<circle cx="${(meet[0] + Math.cos(a) * d).toFixed(1)}" cy="${(meet[1] + Math.sin(a) * d * .6).toFixed(1)}" r="${(1.5 + r() * 4).toFixed(1)}" fill="${r() > .5 ? '#a8a4a0' : '#d8c8b0'}" opacity="${(1 - after * .4).toFixed(2)}"/>`; }
    o += `<circle cx="${meet[0]}" cy="${meet[1]}" r="${30 * after}" fill="#b8b4ae"/>`; }
  o += lbl(360, 1110, 'على مدى ملايين السنين', ramp(t, WS(5, 4), WS(5, 5)), '#cfd8ff', 26);
  F.ov = o; return s;
}
// 6: a real hypothesis (Jutzi & Asphaug 2011): a smaller companion moon crashed slowly into ours and piled up the far-side highlands
function sceneMerge(t) {
  const ap = ease(ramp(t, WS(6, 5), WS(6, 12))), splat = ramp(t, WS(6, 12) - .1, WS(6, 14) + .4);
  let s = space(t, '#020308', '#070a18');
  const mx = 330, my = 780, R = 230, d = lerp(560, R + 30, ap);
  F.earth = null; F.sun = null; F.light = [-400, 300];
  F.moon = { x: mx, y: my, r: R, a: 1, sunI: 1.2, rot: 1.0 };
  F.moon2 = { x: mx + d * .78, y: my - d * .62, r: 66, a: 1 - splat, sunI: 1.2, rot: 3 };
  let o = '';
  if (splat > 0) { const r = RS(14); o += `<g opacity="${splat}">` + Array.from({ length: 14 }, () => { const a = -.9 + (r() - .5) * 1.2, rr = R * (.55 + r() * .4); return `<ellipse cx="${(mx + Math.cos(a) * rr).toFixed(1)}" cy="${(my + Math.sin(a) * rr).toFixed(1)}" rx="${(18 + r() * 30).toFixed(1)}" ry="${(10 + r() * 16).toFixed(1)}" fill="#e2ddd4" opacity=".22" filter="url(#soft)"/>`; }).join('') + `</g>`; }
  o += `<g opacity="${ramp(t, WS(6, 1), WS(6, 2))}"><rect x="200" y="1110" width="320" height="56" rx="14" fill="#0a0e1c" opacity=".85"/>` + lblL(360, 1148, 'Jutzi &amp; Asphaug · 2011', 1, '#cfd8ff', 22) + `</g>`;
  o += lbl(mx + 150, my + R + 50, 'مرتفعات الوجه البعيد', splat, '#f4c76b', 24);
  F.ov = o; return s;
}
// 7: Earth sometimes captures tiny temporary mini-moons: 2024 PT5, about 10 m wide, for about two months in 2024
function sceneMini(t) {
  const st = S0(7) - .2, T = t - st, show = ease(ramp(t, WS(7, 8) - .2, WS(7, 9) + .3));
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 150, a: 1, sunI: 1.05, lights: .3, rot: 2.4, tilt: .41 }; F.light = [-300, 450]; F.sun = null; F.moon = null; F.moon2 = null;
  // a looping temporary path: comes in, makes a loose arc around Earth, leaves
  const P = u => [360 + Math.cos(u * 4.2 - .6) * (250 + 120 * Math.abs(u - .5)), 760 + Math.sin(u * 4.2 - .6) * (170 + 80 * Math.abs(u - .5)) - (u - .5) * 200];
  let path = ''; for (let i = 0; i <= 60; i++) { const p = P(i / 60); path += (i ? ' L' : 'M') + p[0].toFixed(1) + ',' + p[1].toFixed(1); }
  const u = clamp(ramp(t, WS(7, 0), WS(7, 19))), p = P(u);
  let o = `<path d="${path}" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="8 8" fill="none" opacity=".65"/>`;
  o += `<g transform="translate(${p[0].toFixed(1)},${p[1].toFixed(1)}) rotate(${T * 40})"><path d="M-9,-5 L-2,-10 L8,-6 L10,3 L3,9 L-7,7Z" fill="#8a8078" stroke="#c8beb0" stroke-width="1.2"/></g><circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="22" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>`;
  o += `<g opacity="${show}" transform="translate(360,1110)"><rect x="-220" y="-40" width="440" height="110" rx="16" fill="#0a0e1c" opacity=".88"/>` + lblL(0, -4, '2024 PT5', 1, '#fff', 30) + lbl(0, 50, 'نحو ١٠ أمتار · شهران تقريباً', 1, '#f4c76b', 22) + `</g>`;
  F.ov = o; return s;
}
// 8: CTA – Earth with both moons, the question mark and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 220, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.sun = null;
  F.moon = { x: 610, y: 560, r: 30, a: 1, sunI: 1.15 }; F.moon2 = { x: 110, y: 980, r: 56, a: 1, sunI: 1.15 };
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneOrbit }, { s: S0(2) - .2, f: sceneNight }, { s: S0(3) - .2, f: sceneTide }, { s: S0(4) - .2, f: sceneEclipse },
  { s: S0(5) - .2, f: sceneClash }, { s: S0(6) - .2, f: sceneMerge }, { s: S0(7) - .2, f: sceneMini }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneOrbit, sceneEclipse, sceneClash, sceneMerge, sceneMini]);
const XF = .5;
const TLI = [['قمر ثانٍ', 0], ['ليالٍ أضوأ', S0(2)], ['مدّ أعلى', S0(3)], ['كسوف متكرّر', S0(4)]];
const LIST_ON = new Set([sceneOrbit, sceneNight, sceneTide, sceneEclipse]);
const CHIPS = [
  ['c1', 'أكبر بمرّتين', 360, 330, 'big', WS(1, 4), WS(1, 8)],
  ['c2', 'أضوأ ×٥', 360, 330, 'big', WS(2, 7), S0(3) - .3],
  ['c3', 'المدّ أعلى بعدّة مرّات', 360, 330, 'red', WS(3, 6), S0(4) - .3],
  ['c4', 'فرضية علمية', 360, 330, 'big', WS(6, 3), S0(7) - .3],
  ['c5', 'قمر صغير مؤقّت', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">قمران للأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
