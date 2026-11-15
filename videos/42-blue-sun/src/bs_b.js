// ===================== "what if the Sun turned blue?" (Short #42) =====================
// The Earth is the gl3d_world disc-globe with gl3d_bs.js (mirror fix kept): `lc` colours the sunlight, `scorch` dries the land,
// `boil` lifts steam off the oceans, `venus` wraps the globe in a thick cream cloud deck. The 3D Sun takes `hue` (0 yellow → 1 blue-white)
// and `ts` (granulation speed). The moon slot carries a Venus cloud texture (tex/venus_tex.py).
const BDEF2 = `<linearGradient id="tBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7aa8ff"/><stop offset=".35" stop-color="#e8f0ff"/><stop offset=".6" stop-color="#ffe9a8"/><stop offset=".8" stop-color="#ffa040"/><stop offset="1" stop-color="#e2452a"/></linearGradient>` +
  `<radialGradient id="glareB"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".18" stop-color="#e6f0ff" stop-opacity=".55"/><stop offset=".55" stop-color="#bcd4ff" stop-opacity=".14"/><stop offset="1" stop-color="#bcd4ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="snR"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset=".55" stop-color="#9ac0ff" stop-opacity=".0"/><stop offset=".78" stop-color="#8ab4ff" stop-opacity=".55"/><stop offset=".9" stop-color="#ff8ab8" stop-opacity=".35"/><stop offset="1" stop-color="#ff6aa0" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="snC"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".3" stop-color="#cfe0ff" stop-opacity=".45"/><stop offset="1" stop-color="#6a8aff" stop-opacity="0"/></radialGradient>` +
  `<filter id="nebF" x="-30%" y="-30%" width="160%" height="160%"><feTurbulence type="fractalNoise" baseFrequency=".018" numOctaves="4" seed="21"/><feDisplacementMap in="SourceGraphic" scale="60" xChannelSelector="R" yChannelSelector="G"/><feGaussianBlur stdDeviation="3"/></filter>`;
const BDEFS = () => `${DEFS()}${WDEF}${BDEF2}`;
const LC = k => [lerp(1, .8, k), lerp(1, .93, k), lerp(1, 1.32, k)];          // sunlight colour: white → blue-white
// a point in front of the camera: screen (x, y) at depth z
function camPt(c, x, y, z) {
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], nrm = a => { const l = Math.hypot(...a); return a.map(v => v / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), fp = 640 / Math.tan(c.fov * Math.PI / 360), a = (x - 360) / fp * z, b = -(y - 640) / fp * z;
  return [0, 1, 2].map(i => c.pos[i] + f[i] * z + r[i] * a + u[i] * b);
}
const fpx = c => 640 / Math.tan(c.fov * Math.PI / 360);
const nrm3 = p => { const l = Math.hypot(...p); return p.map(v => v / l); };

// ---------- an SVG star (for the colour row): limb-darkened disc, granulation, corona ----------
function starD(id, x, y, r, c, a, t) {
  if (a <= 0) return ''; const [c0, c1, c2] = c;
  return `<defs><radialGradient id="sd${id}" cx=".46" cy=".44"><stop offset="0" stop-color="${c0}"/><stop offset=".62" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>` +
    `<radialGradient id="sg${id}"><stop offset="0" stop-color="${c1}" stop-opacity=".7"/><stop offset=".3" stop-color="${c1}" stop-opacity=".22"/><stop offset=".6" stop-color="${c2}" stop-opacity=".07"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></radialGradient>` +
    `<filter id="gf${id}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="${(5.5 / r).toFixed(3)}" numOctaves="3" seed="${id.length * 7 + 3}"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -1.4 0 0 0 .95"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<clipPath id="sc${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath></defs>` +
    `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="${(r * 3.2).toFixed(1)}" fill="url(#sg${id})"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#sd${id})"/>` +
    `<g clip-path="url(#sc${id})"><rect x="${x - r}" y="${y - r}" width="${2 * r}" height="${2 * r}" fill="#000" filter="url(#gf${id})" opacity=".2" transform="rotate(${(t * 4).toFixed(1)},${x},${y})"/></g>` +
    `<circle cx="${x}" cy="${y}" r="${r - 1}" fill="none" stroke="${c1}" stroke-width="5" opacity=".5" filter="url(#blur2)"/></g>`;
}
// ---------- energy beams from the Sun to the Earth ----------
function beams(x0, y0, x1, y1, n, a, t, col) {
  if (a <= 0) return ''; const dx = x1 - x0, dy = y1 - y0, L = Math.hypot(dx, dy), nx = -dy / L, ny = dx / L; let s = `<g opacity="${a.toFixed(2)}">`;
  for (let i = 0; i < n; i++) { const o = n === 1 ? 0 : (i - (n - 1) / 2) * 11, sp = o * 1.1;
    const ax = x0 + nx * o * .35, ay = y0 + ny * o * .35, bx = x1 + nx * sp, by = y1 + ny * sp;
    s += `<path d="M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)}" stroke="${col}" stroke-width="9" opacity=".22" filter="url(#blur2)"/>` +
      `<path d="M${ax.toFixed(1)},${ay.toFixed(1)} L${bx.toFixed(1)},${by.toFixed(1)}" stroke="${col}" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="34 22" stroke-dashoffset="${(-t * 240 - i * 13).toFixed(1)}" opacity=".9"/>`; }
  return s + `</g>`;
}
// ---------- the UV gauge (UV index scale, 0..14 over half a turn) ----------
function uvGauge(x, y, R, v, a, t) {
  if (a <= 0) return ''; const ang = k => Math.PI * (1 - clamp(k / 14, 0, 1.06)), P = (k, r) => [x + Math.cos(ang(k)) * r, y - Math.sin(ang(k)) * r];
  const arc = (k0, k1, col) => { const [ax, ay] = P(k0, R), [bx, by] = P(k1, R); return `<path d="M${ax.toFixed(1)},${ay.toFixed(1)} A${R},${R} 0 0 1 ${bx.toFixed(1)},${by.toFixed(1)}" stroke="${col}" stroke-width="44" fill="none"/>`; };
  let s = `<g opacity="${a.toFixed(2)}">` + panel(x - R - 60, y - R - 120, 2 * R + 120, R + 330, 1) + lbl(x, y - R - 70, 'مؤشّرُ الأشعّة فوقَ البنفسجيّة', 1, '#d8c8ff', 28) +
    arc(0, 2.5, '#4caf50') + arc(2.5, 5.5, '#f2d13a') + arc(5.5, 7.5, '#f39a2a') + arc(7.5, 10.5, '#e2452a') + arc(10.5, 14, '#8a4ad0') +
    `<path d="M${P(0, R + 22).map(v => v.toFixed(1)).join(',')} A${R + 22},${R + 22} 0 0 1 ${P(14, R + 22).map(v => v.toFixed(1)).join(',')}" stroke="#fff" stroke-opacity=".25" stroke-width="2" fill="none"/>`;
  [0, 3, 6, 8, 11, 14].forEach(k => { const [ax, ay] = P(k, R - 30); s += lbl(ax, ay + 9, AR(k), 1, '#fff', 22); });
  const [tx, ty] = P(11, R + 40); s += lbl(tx, ty, 'أقصى اليوم', 1, '#c8b0ff', 20);
  const sh = v > 14 ? Math.sin(t * 40) * .25 : 0, vv = Math.min(v, 14.6) + sh, [nx, ny] = P(vv, R - 50);
  s += `<path d="M${x},${y} L${nx.toFixed(1)},${ny.toFixed(1)}" stroke="#000" stroke-opacity=".5" stroke-width="12" stroke-linecap="round"/><path d="M${x},${y} L${nx.toFixed(1)},${ny.toFixed(1)}" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="20" fill="#e8e8f0"/><circle cx="${x}" cy="${y}" r="9" fill="#333"/>`;
  s += lbl(x, y + 110, AR(Math.round(v)), 1, v > 14 ? '#e0b0ff' : '#fff', 96);
  return s + `</g>`;
}
// ---------- a stopwatch ----------
function stopw(x, y, r, sec, a) {
  if (a <= 0) return ''; const k = (sec % 60) / 60, an = k * Math.PI * 2 - Math.PI / 2;
  let s = `<g opacity="${a.toFixed(2)}"><rect x="${x - 12}" y="${y - r - 26}" width="24" height="18" rx="4" fill="#c8ccd4"/><circle cx="${x}" cy="${y}" r="${r + 8}" fill="#c8ccd4"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f6f7fa"/><circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="6"/>`;
  for (let i = 0; i < 12; i++) { const q = i / 12 * Math.PI * 2; s += `<path d="M${(x + Math.cos(q) * r * .8).toFixed(1)},${(y + Math.sin(q) * r * .8).toFixed(1)} L${(x + Math.cos(q) * r * .92).toFixed(1)},${(y + Math.sin(q) * r * .92).toFixed(1)}" stroke="#333" stroke-width="3"/>`; }
  s += `<path d="M${x},${y} L${x},${y - r * .92} A${r * .92},${r * .92} 0 ${k > .5 ? 1 : 0} 1 ${(x + Math.cos(an) * r * .92).toFixed(1)},${(y + Math.sin(an) * r * .92).toFixed(1)}Z" fill="#e2452a" opacity=".28"/>` +
    `<path d="M${x},${y} L${(x + Math.cos(an) * r * .86).toFixed(1)},${(y + Math.sin(an) * r * .86).toFixed(1)}" stroke="#e2452a" stroke-width="4" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="6" fill="#333"/>`;
  return s + lbl(x, y + r + 52, `${AR(Math.floor(sec))} ثانية`, 1, '#fff', 34) + `</g>`;
}
// ---------- a thermometer from 0 to 250 °C ----------
function thermoH(x, y, v, a) {
  if (a <= 0) return ''; const top = y - 300, bot = y, k = clamp(v / 250), lev = bot - 30 - k * (bot - 60 - top), hot = mix('#f0a030', '#ff3a1a', clamp(v / 200));
  let s = `<g opacity="${a.toFixed(2)}">` + panel(x - 62, top - 74, 124, 440, a);
  s += `<rect x="${x - 14}" y="${top}" width="28" height="${bot - top - 10}" rx="14" fill="#e8eef4" opacity=".9"/><circle cx="${x}" cy="${bot - 10}" r="30" fill="${hot}"/><rect x="${x - 7}" y="${lev}" width="14" height="${bot - 10 - lev}" fill="${hot}"/>` +
    `<rect x="${x - 10}" y="${top + 6}" width="5" height="${bot - top - 30}" rx="2" fill="#fff" opacity=".6"/>`;
  [0, 100, 200].forEach(q => { const yy = bot - 30 - q / 250 * (bot - 60 - top); s += `<path d="M${x + 16},${yy} L${x + 30},${yy}" stroke="#fff" stroke-width="2"/>`; });
  return s + lbl(x, top - 26, `${AR(Math.round(v))}°`, 1, v > 60 ? '#ffb08a' : '#fff', 40) + `</g>`;
}

// ===================== scenes =====================
// 0: the Earth with the Sun beside it; the Sun turns blue-white and its light on the Earth turns cold
function sceneHook(t) {
  const hu = ease(ramp(t, WS(0, 3) - .1, WS(0, 5) + .2));
  const G = gW(t, { d: 7.6, el: .22, lon: 40 - t * 3, tg: [0, .62, 0], clouds: .45, lights: .3 });
  const sp = camPt(G.cam, 548, 360, 4.2), fp = fpx(G.cam);
  F.w.sun = { pos: sp, r: 96 * 4.2 / fp, a: 1, hue: hu, g: 8, ts: 1 + hu }; F.w.L = nrm3(sp); F.w.disc.lc = LC(hu);
  F.flash = .35 * Math.sin(Math.PI * clamp((t - WS(0, 4) + .1) / .5)) * (t > WS(0, 4) - .1 && t < WS(0, 4) + .4 ? 1 : 0);
  F.ov = ''; return space(t);
}
// 1: a star's colour gives its temperature: red is the coolest, yellow like our Sun, blue the hottest
function sceneColors(t) {
  noEarth(); const ar = ease(ramp(t, WS(1, 4) - .2, WS(1, 4) + .4)), ay = ease(ramp(t, WS(1, 7) - .2, WS(1, 7) + .4)), ab = ease(ramp(t, WS(1, 10) - .2, WS(1, 10) + .4)), ah = ease(ramp(t, WS(1, 12) - .2, WS(1, 13)));
  const y = 610 + Math.sin(t * .6) * 4;
  let s = space(t) + `<defs>${BDEFS()}</defs>` +
    starD('r', 572, y, 58 * (.6 + .4 * ar), ['#ffb27a', '#e2572a', '#8a1e0a'], ar, t) +
    starD('y', 360, y, 80 * (.6 + .4 * ay), ['#fffbe6', '#ffd25a', '#e07a1a'], ay, t) +
    starD('b', 150, y, 100 * (.6 + .4 * ab), ['#ffffff', '#b8d2ff', '#4a7aff'], ab, t);
  s += lbl(572, 760, 'أحمر', ar, '#ff9a7a', 34) + lbl(572, 800, '٣٠٠٠ كلفن', ar, '#fff', 26) +
    lbl(360, 760, 'أصفر', ay, '#ffd86a', 34) + lbl(360, 800, '٥٨٠٠ كلفن', ay, '#fff', 26) +
    lbl(150, 760, 'أزرق', ab, '#a8c8ff', 34) + lbl(150, 800, 'فوقَ ١٠٠٠٠ كلفن', ab, '#fff', 26);
  if (ah > 0) s += `<g opacity="${ah.toFixed(2)}"><rect x="70" y="880" width="580" height="26" rx="13" fill="url(#tBar)"/><rect x="70" y="880" width="580" height="10" rx="5" fill="#fff" opacity=".25"/>` +
    arrow(560, 950, 160, 950, 1, '#f4c76b', 5) + lbl(360, 1000, 'أشدُّ حرارة', 1, '#f4c76b', 34) + `</g>`;
  F.ov = ''; return s;
}
// 2: to turn blue its surface jumps from about 6,000 to 10,000 degrees (kelvin)
function sceneTemp(t) {
  const T = t - S0(2) + .2, hu = ease(ramp(t, WS(2, 3), WS(2, 12) + .2)), cam = orbit(7.2 - T * .08, 0, 0, [0, 0, 0], 30);
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: [0, .28, 0], r: .86, a: 1, hue: hu, g: 6, ts: 1 + hu } }; F.earth = F.moon = F.sun = null;
  const a = ease(ramp(t, S0(2), S0(2) + .5)), v = Math.round(lerp(5800, 10000, hu) / 100) * 100;
  F.ov = `<g opacity="${a.toFixed(2)}">` + panel(170, 1010, 380, 150, 1) + lbl(360, 1056, 'حرارةُ السطح', 1, '#c8d4e8', 28) + lbl(360, 1124, `${AR(v)} كلفن`, 1, mix('#ffd86a', '#bcd8ff', hu), 54) + `</g>`;
  return space(t);
}
// 3: the same size, nine times the energy
function sceneEnergy(t) {
  const T = t - S0(3) + .2, az = .3, rt = [Math.cos(az), 0, -Math.sin(az)];
  const G = gW(t, { d: 12, el: .1, az, lon: -10 - T * 3, tg: [-rt[0] * .78, 1.3, -rt[2] * .78], clouds: .4 });
  const fp = fpx(G.cam), sp = camPt(G.cam, 180, 470, 12), sr = 92;
  F.w.sun = { pos: sp, r: sr * 12 / fp, a: 1, hue: 1, g: 7, ts: 2 }; F.w.L = nrm3(sp); F.w.disc.lc = LC(1);
  const ring = ease(ramp(t, S0(3), WS(3, 1))) * (1 - ease(ramp(t, WS(3, 3), WS(3, 4))));
  const n9 = t > WS(3, 5) ? 9 : 1, ba = ease(ramp(t, WS(3, 2) - .1, WS(3, 3))), [ex, ey] = G.c0;
  let o = `<defs>${BDEFS()}</defs>`;
  if (ring > 0) o += `<circle cx="180" cy="470" r="${sr}" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="14 10" opacity="${ring.toFixed(2)}"/>` + lbl(180, 470 + sr + 50, 'الحجمُ نفسُه', ring, '#f4c76b', 30);
  o += beams(180 + 70, 470 + 50, ex - G.R * .55, ey - G.R * .5, n9, ba, t, '#d8e8ff');
  const k9 = ease(ramp(t, WS(3, 5), WS(3, 5) + .35));
  if (k9 > 0) o += `<g opacity="${k9.toFixed(2)}" transform="translate(${ex - G.R * 1.3},${ey + G.R * .55}) scale(${(.6 + .4 * k9).toFixed(3)})">` + lbl(0, 30, '×٩', 1, '#f4c76b', 110) + `</g>`;
  F.ov = o; return space(t);
}
// 4: in the street: blinding blue-white daylight, a deeper blue sky
function sceneStreet(t) {
  const T = t - S0(4) + .2, deep = ease(ramp(t, WS(4, 9) - .2, WS(4, 11) + .2)), gl = ease(ramp(t, WS(4, 6), WS(4, 8))), y0 = PV + 74;
  const sky = [mix('#2a68c8', '#0b2f96', deep), mix('#86b4ea', '#3f7fe0', deep), mix('#e2ecf6', '#c4d8f4', deep)];
  const shadeT = WS(4, 7) - .3;
  let fg = '';
  // person 1 walks left and stops to shade the eyes; person 2 walks right; person 3 stands squinting up
  { const s = .78, f = -1, xs = 560 - Math.min(T, shadeT - S0(4) + .2) * 26, st = t > shadeT, hk = ease(ramp(t, shadeT, shadeT + .5)), P = palS(2);
    const hf = [xs + f * s * 22, y0 - s * 304]; fg += hero(xs, y0 + 8, Object.assign({ s, face: f, shade: 1, walk: st ? null : xs / 30, lid: .55 * hk, lookUp: .4 * hk, hF: st ? [lerp(xs + f * s * 30, hf[0], hk), lerp(y0 - s * 150, hf[1], hk)] : undefined }, P)); }
  { const s = .72, f = 1, x = 40 + T * 34, P = palS(6); fg += hero(x, y0 - 6, Object.assign({ s, face: f, shade: 1, walk: x / 30, lid: .5 }, P)); }
  { const s = .8, f = 1, x = 250, hk = ease(ramp(t, WS(4, 7) - .1, WS(4, 7) + .5)), P = palS(4); fg += hero(x, y0 + 16, Object.assign({ s, face: f, shade: 1, lookUp: .7 * hk, lid: .7 * hk, hF: [x + f * s * 24, y0 + 16 - s * 300 * hk - s * 150 * (1 - hk)] }, P)); }
  let s = `<defs>${BDEFS()}</defs>` + street5(t, { N: 0, id: 'bs', sky, sunX: 150, sunY: 470, sunC: '#f8fbff', glowC: '#c4dcff', glowR: 170, fg });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#a8c4ff" opacity=".2" style="mix-blend-mode:multiply"/><rect x="-20" y="-20" width="760" height="1320" fill="#e8f0ff" opacity="${(.1 + .16 * gl).toFixed(2)}" style="mix-blend-mode:screen"/>`;
  s += `<circle cx="150" cy="470" r="${(460 + 220 * gl).toFixed(0)}" fill="url(#glareB)" opacity="${(.4 + .45 * gl * (1 - .45 * ramp(t, WS(4, 9), WS(4, 11)))).toFixed(2)}"/>` +
    Array.from({ length: 8 }, (_, i) => { const an = i / 8 * Math.PI * 2 + .3, L = 240 + 120 * gl; return `<path d="M150,470 L${(150 + Math.cos(an) * L).toFixed(1)},${(470 + Math.sin(an) * L).toFixed(1)}" stroke="#eef4ff" stroke-width="${i % 2 ? 3 : 6}" opacity="${(.12 + .18 * gl).toFixed(2)}" filter="url(#blur2)"/>`; }).join('');
  noEarth(); F.ov = ''; return s;
}
// 5: ultraviolet up more than thirty times: skin burns in under a minute
function sceneUV(t) {
  const gA = ease(ramp(t, S0(5), S0(5) + .4)) * (1 - ease(ramp(t, WS(5, 9) - .3, WS(5, 9) + .1))), up = ease(ramp(t, WS(5, 4), WS(5, 8)));
  const v = lerp(11, 385, up * up), fA = ease(ramp(t, WS(5, 9) - .2, WS(5, 9) + .3)), burn = ease(ramp(t, WS(5, 10), WS(5, 14) + .4)), sec = 25 * ramp(t, WS(5, 10), WS(5, 14) + .2);
  let s = `<defs>${BDEFS()}</defs><g filter="url(#blur5)">` + street5(t, { N: 0, id: 'bu', sky: ['#0b2f96', '#3f7fe0', '#c4d8f4'], sunX: 150, sunY: 470, sunC: '#f8fbff', glowC: '#c4dcff', glowR: 170, cars: 0 }) + `</g><rect x="-20" y="-20" width="760" height="1320" fill="#0a1030" opacity=".5"/>` +
    `<circle cx="150" cy="470" r="380" fill="url(#glareB)" opacity=".3"/>`;
  s += uvGauge(360, 820, 230, v, gA, t);
  if (fA > 0) { s += `<g opacity="${fA.toFixed(2)}">` + faceF('uv', 360, 820, 1.02, { top: '#2a5a8a', hair: '#2a1a12', open: .45 }) +
      `<defs><clipPath id="fcl"><path d="M-126,-20 C-128,-122 -72,-168 0,-168 C72,-168 128,-122 126,-20 C124,64 92,132 0,164 C-92,132 -124,64 -126,-20Z"/><path d="M-50,110 L-52,236 Q0,268 52,236 L50,110Z"/><ellipse cx="-128" cy="8" rx="22" ry="38"/><ellipse cx="128" cy="8" rx="22" ry="38"/></clipPath></defs>` +
      `<g transform="translate(360,820) scale(1.02)" clip-path="url(#fcl)"><rect x="-160" y="-180" width="320" height="460" fill="#d8402e" opacity="${(burn * .3).toFixed(2)}"/><g opacity="${(burn * .5).toFixed(2)}" filter="url(#blur9)"><ellipse cx="0" cy="-62" rx="100" ry="52" fill="#d8302a" opacity=".7"/><ellipse cx="0" cy="22" rx="34" ry="56" fill="#d8302a"/><ellipse cx="-66" cy="52" rx="52" ry="36" fill="#d8302a"/><ellipse cx="66" cy="52" rx="52" ry="36" fill="#d8302a"/></g></g>` +
      `<rect x="-20" y="560" width="760" height="720" fill="#bcd4ff" opacity=".1"/></g>` + stopw(600, 520, 62, sec, fA); }
  noEarth(); F.ov = ''; return s;
}
// 6: the Earth heats past 200 degrees and the oceans start to boil
function sceneHeat(t) {
  const T = t - S0(6) + .2, h = ease(ramp(t, WS(6, 1), WS(6, 8))), b = ease(ramp(t, WS(6, 9) - .2, WS(6, 11) + .8));
  const G = gW(t, { d: 9.2 - T * .12, el: .12, lon: 128 - T * 3, tg: [.2, .1, -.06], clouds: .4, off: -.4, up: .35 });
  F.w.disc.lc = LC(1); F.w.disc.scorch = .9 * h; F.w.disc.boil = b; F.w.disc.heat = .25 * h;
  F.ov = thermoH(620, 1170, lerp(15, 230, h), ease(ramp(t, S0(6), S0(6) + .5))); return space(t);
}
// 7: the steam traps more heat: the Earth becomes a hell like Venus
function sceneVenus(t) {
  const T = t - S0(7) + .2, vk = ease(ramp(t, WS(7, 1), WS(7, 6))), pull = ease(ramp(t, WS(7, 6), WS(7, 9) + .3)), az = .3, rt = [Math.cos(az), 0, -Math.sin(az)];
  const G = gW(t, { d: lerp(8.8, 16, pull), el: .12, az, lon: 150 - T * 3, tg: [rt[0] * 1.2 * pull, .05, rt[2] * 1.2 * pull], clouds: .6 * (1 - vk), off: -.35, up: .35 });
  F.w.disc.lc = LC(1 - .75 * vk); F.w.disc.scorch = .9; F.w.disc.boil = 1; F.w.disc.venus = vk;
  const vp = [rt[0] * 2.4, 0, rt[2] * 2.4];
  F.w.moon = { pos: vp, L: F.w.L, shC: [-99, -99, -99], shR: .001, r: .95, rot: t * .02 };
  const la = ease(ramp(t, WS(7, 8), WS(7, 9) + .2)), [ex, ey] = G.c0, [vx, vy] = proj3(G.cam, vp), vr = G.R * .95;
  F.ov = la > 0 ? lbl(ex, ey + G.R + 56, 'الأرض', la, '#fff', 34) + lbl(vx, vy + vr + 56, 'الزُّهرة', la, '#ffe0a0', 34) + lbl(vx, vy + vr + 100, 'سطحُها ٤٦٤°', la, '#ffb08a', 28) : '';
  return space(t);
}
// 8: the surprise: real blue stars burn their fuel fast and live only millions of years, not billions
function sceneTwist(t) {
  const T = t - S0(8) + .2, cam = orbit(7.4 - T * .1, 0, 0, [0, 0, 0], 30);
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: [0, .36, 0], r: .66, a: 1, hue: 1, g: 6.5, ts: 1 + 3 * ease(ramp(t, WS(8, 4), WS(8, 6))) } }; F.earth = F.moon = F.sun = null;
  const ba = ease(ramp(t, WS(8, 8) - .2, WS(8, 8) + .3)), gs = ease(ramp(t, WS(8, 8), WS(8, 12))), gb = ease(ramp(t, WS(8, 9), WS(8, 10)));
  let o = '';
  if (ba > 0) { o += `<g opacity="${ba.toFixed(2)}">` + panel(40, 900, 640, 300, 1) +
    lbl(650, 960, 'نجمٌ أزرقُ كبير', 1, '#a8c8ff', 30, 'start') + `<rect x="${640 - 12 * gb}" y="980" width="${(12 * gb).toFixed(1)}" height="34" rx="6" fill="#8ab4ff"/>` + lbl(612, 1008, 'ملايينُ السنين فقط', gb, '#fff', 26, 'start') +
    lbl(650, 1080, 'شمسُنا', 1, '#ffd86a', 30, 'start') + `<rect x="${(640 - 560 * gs).toFixed(1)}" y="1100" width="${(560 * gs).toFixed(1)}" height="34" rx="6" fill="#f4c76b"/><rect x="${(640 - 560 * gs).toFixed(1)}" y="1100" width="${(560 * gs).toFixed(1)}" height="12" rx="6" fill="#fff" opacity=".25"/>` +
    lbl(360, 1176, '١٠ مليارات سنة', gs, '#ffd86a', 30) + `</g>`; }
  F.ov = o; return space(t);
}
// 9: had our Sun been a blue star from the start, it would have died billions of years before we appeared
function sceneLife(t) {
  const die = WS(9, 7) - .1, T = t - S0(9) + .2, cam = orbit(7.6, 0, 0, [0, 0, 0], 30), ex = ease(ramp(t, die, die + 2.6));
  F.w = { set: 'space', cam, L: [0, 0, 1] }; F.earth = F.moon = F.sun = null;
  if (t < die + .12) F.w.sun = { pos: [0, .9, 0], r: .42 * (1 + .25 * ease(ramp(t, die - .6, die))), a: 1, hue: 1, g: 7, ts: 4 };
  F.flash = t > die - .05 && t < die + .45 ? .8 * Math.pow(1 - ramp(t, die, die + .45), 2) : 0;
  const [sx, sy] = proj3(cam, [0, .9, 0]);
  let o = `<defs>${BDEFS()}</defs>`;
  if (t > die) { const R = 60 + 300 * ex, a = 1 - .55 * ex;
    o += `<g opacity="${a.toFixed(2)}"><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${(R * 1.25).toFixed(1)}" fill="url(#snR)" filter="url(#nebF)"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${(R * .55).toFixed(1)}" fill="url(#snC)" opacity="${(1 - ex * .8).toFixed(2)}"/></g>` +
      `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="3" fill="#dfe8ff" opacity="${(.4 + .4 * ex).toFixed(2)}"/>`; }
  // the timeline: right = the star is born, left = today (4.5 billion years)
  const ta = ease(ramp(t, S0(9), S0(9) + .5)), x0 = 620, x1 = 100, yy = 1060, run = ease(ramp(t, WS(9, 9), WS(9, 12) + .2)), xm = lerp(x0, x1, run);
  if (ta > 0) { o += `<g opacity="${ta.toFixed(2)}">` + panel(40, 930, 640, 260, 1) + `<path d="M${x0},${yy} L${x1},${yy}" stroke="#fff" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M${x0},${yy} L${xm.toFixed(1)},${yy}" stroke="#f4c76b" stroke-width="6" stroke-linecap="round"/><circle cx="${x0}" cy="${yy}" r="12" fill="#8ab4ff"/>` + lbl(x0, yy - 34, 'وُلِد النجم', 1, '#a8c8ff', 24) +
    (t > die ? `<circle cx="${x0 - 8}" cy="${yy}" r="${(16 - 6 * ex).toFixed(1)}" fill="#ff8ab8" opacity=".9"/>` + lbl(520, yy + 52, 'ماتَ بعدَ ملايين السنين', ease(ramp(t, die, die + .4)), '#ff9ac4', 24) : '') +
    (run > 0 ? `<circle cx="${xm.toFixed(1)}" cy="${yy}" r="10" fill="#fff"/>` : '') + lbl(x1, yy - 34, 'نحن', ease(ramp(t, WS(9, 11) - .2, WS(9, 11) + .3)), '#fff', 30) +
    lbl(360, yy + 100, '٤٫٥ مليار سنة', ease(ramp(t, WS(9, 12) - .2, WS(9, 12) + .3)), '#f4c76b', 32) + `</g>`; }
  F.ov = o; return space(t);
}
// 10: our real Sun and Earth, three star colours to choose from, the question mark and the subscribe button
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, sa = ease(ramp(t, WS(10, 1), WS(10, 3)));
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: -20 - (t - S0(10)) * 4, clouds: .4 });
  F.ov = `<defs>${BDEFS()}</defs><g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="170" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    starD('e1', 560, 360, 30, ['#ffb27a', '#e2572a', '#8a1e0a'], sa, t) + starD('e2', 160, 360, 30, ['#ffffff', '#b8d2ff', '#4a7aff'], sa, t) +
    `<g opacity="${ramp(t, WS(10, 7) - .3, WS(10, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneColors }, { s: S0(2) - .2, f: sceneTemp }, { s: S0(3) - .2, f: sceneEnergy }, { s: S0(4) - .2, f: sceneStreet }, { s: S0(5) - .2, f: sceneUV }, { s: S0(6) - .2, f: sceneHeat }, { s: S0(7) - .2, f: sceneVenus }, { s: S0(8) - .2, f: sceneTwist }, { s: S0(9) - .2, f: sceneLife }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneColors, sceneTemp, sceneEnergy, sceneUV, sceneHeat, sceneVenus, sceneTwist, sceneLife]);
const XF = .5;
const TLI = [['١٠٠٠٠ كلفن', S0(2)], ['طاقةٌ ×٩', S0(3)], ['ضوءٌ يُعمي', S0(4)], ['أشعّةٌ ×٣٠', S0(5)]];
const LIST_ON = new Set([sceneStreet]);
const CHIPS = [
  ['c3', 'طاقةٌ أكبرُ بتسعِ مرّات', 360, 330, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'ضوءٌ أبيضُ مُزرقّ', 360, 330, 'big', WS(4, 5), S0(5) - .3],
  ['c5', 'أكثرُ من ٣٠ مرّة', 360, 330, 'red big', WS(5, 7), WS(5, 9) - .2], ['c5b', 'حروقٌ في أقلَّ من دقيقة', 360, 330, 'red big', WS(5, 11), S0(6) - .3],
  ['c6', 'المحيطاتُ تغلي', 360, 330, 'red big', WS(6, 9), S0(7) - .3],
  ['c7', 'جحيمٌ مثلَ الزُّهرة', 360, 330, 'red big', WS(7, 7), S0(8) - .3],
  ['c9', 'ماتت قبلَ ظهورِنا', 360, 800, 'big', WS(9, 8), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">شمسٌ زرقاء</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
