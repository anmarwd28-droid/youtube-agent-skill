// ===== realism pass for the rain Short: shots 3, 4, 5, 6, 8, 9, 10, 11, 13 =====
const RDEF2 = `<filter id="stainD" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".3 .006" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 .22  0 0 0 0 .2  0 0 0 0 .17  0 0 0 -1.2 .72"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="stalkT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .04" numOctaves="2" seed="13"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.8 1.0"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="cropT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="4" seed="23"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 .75"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="pebT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".18" numOctaves="2" seed="31"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .12  0 0 0 -3 1.6"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
const PT = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);

// ---------- 3 & 8: an arch dam wedged in a rocky gorge; the reservoir behind; real spill and mist ----------
function damView(t, level, o = {}) {
  const id = o.id || 'a', Lv = level, spill = ramp(Lv, .9, 1), gen = .3 + .7 * Lv;
  const qb = (a, c, b, u) => [(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * c[0] + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * c[1] + u * u * b[1]];
  const crest = u => qb([140, 640], [365, 616], [590, 640], u), base = u => qb([235, 1000], [360, 1018], [485, 1000], u);
  const face = (u, v) => { const a = crest(u), b = base(u); return [lerp(a[0], b[0], v), lerp(a[1], b[1], v)]; };
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skD${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8cd0"/><stop offset=".7" stop-color="#bcd6ea"/><stop offset="1" stop-color="#e2ecf2"/></linearGradient>` +
    `<linearGradient id="dF${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8e8a80"/><stop offset=".22" stop-color="#dcd8ce"/><stop offset=".55" stop-color="#c4bfb4"/><stop offset="1" stop-color="#76726a"/></linearGradient>` +
    `<linearGradient id="lk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a94ae"/><stop offset="1" stop-color="#2a5a74"/></linearGradient>` +
    `<linearGradient id="rw${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8a92"/><stop offset="1" stop-color="#21505a"/></linearGradient>` +
    `<linearGradient id="sp${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc0d2" stop-opacity=".9"/><stop offset=".16" stop-color="#e6f2f6"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
    `<linearGradient id="shR${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient>` +
    `<radialGradient id="mi${id}"><stop offset="0" stop-color="#fff" stop-opacity=".8"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
    `<clipPath id="dc${id}"><path d="M140,640 Q365,616 590,640 L485,1000 Q360,1018 235,1000Z"/></clipPath>` +
    `<clipPath id="wl${id}"><path d="M-20,380 L70,392 L120,428 L150,500 L140,640 L180,780 L235,1000 L200,1120 L140,1280 L-20,1280Z"/></clipPath>` +
    `<clipPath id="wr${id}"><path d="M740,380 L660,394 L612,440 L586,510 L590,640 L545,800 L485,1000 L520,1130 L585,1280 L740,1280Z"/></clipPath></defs>`;
  s += `<rect width="720" height="1280" fill="url(#skD${id})"/><circle cx="90" cy="380" r="260" fill="#fff8e0" opacity=".22" filter="url(#soft)"/>`;
  s += `<path d="M-20,500 L60,462 L140,480 L230,440 L330,470 L420,436 L520,468 L620,446 L740,476 L740,540 L-20,540Z" fill="#93a6b6"/><path d="M-20,522 L80,494 L180,506 L280,488 L380,500 L470,484 L580,500 L740,492 L740,560 L-20,560Z" fill="#7e9084"/>`;
  // upstream gorge walls around the reservoir
  s += `<path d="M-20,520 L120,500 L240,508 L300,515 L140,640 L-20,700Z" fill="#a8947a" filter="url(#reliefR)"/><path d="M740,515 L600,500 L480,508 L430,515 L590,640 L740,700Z" fill="#8e7c64" filter="url(#reliefR)"/>`;
  s += `<path d="M-20,520 L120,500 L240,508 L300,515 L430,515 L480,508 L600,500 L740,515" stroke="#7a8a56" stroke-width="5" fill="none" opacity=".7"/>`;
  // reservoir: the full outline bleaches where the water has gone (the "bathtub ring"), then the lake at its level
  const lake = l => { const fy = lerp(562, 515, l); return [[lerp(342, 300, l), fy], [lerp(388, 430, l), fy], [lerp(480, 590, l), 640], [lerp(250, 140, l), 640]]; };
  const lp = l => lake(l).map(PT).join(' ');
  if (Lv < .99) { s += `<polygon points="${lp(1)}" fill="#e4ddcb"/><polygon points="${lp(1)}" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
    for (let q = 1; q < 8; q++) { const z = lake(lerp(Lv, 1, q / 8)); s += `<path d="M${PT(z[0])} L${PT(z[3])} M${PT(z[1])} L${PT(z[2])}" stroke="#a89a80" stroke-width="2.2" opacity=".75"/>`; } }
  s += `<polygon points="${lp(Lv)}" fill="url(#lk${id})"/>`;
  { const z = lake(Lv); for (let q = 0; q < 9; q++) { const v = q / 9, y = lerp(z[0][1], 640, v * v), x0 = lerp(z[0][0], z[3][0], v * v), x1 = lerp(z[1][0], z[2][0], v * v); s += `<path d="M${x0 + 6},${y} L${x1 - 6},${y}" stroke="#dff0f4" stroke-width="1.2" opacity="${(.16 + .1 * Math.sin(t * 2 + q)).toFixed(2)}"/>`; }
    s += `<path d="M${PT(z[0])} L${PT(z[3])} M${PT(z[1])} L${PT(z[2])}" stroke="#eef6f4" stroke-width="2" opacity=".55"/>`; }
  // downstream gorge floor: river bed, then the water (narrower when the dam releases less)
  s += `<path d="M235,1000 Q360,1018 485,1000 L585,1280 L135,1280Z" fill="#8a7e68"/><path d="M235,1000 Q360,1018 485,1000 L585,1280 L135,1280Z" fill="#000" filter="url(#pebT)" opacity=".6"/>`;
  const wf = .3 + .7 * Math.max(Lv, spill);
  s += `<path d="M${lerp(360, 235, wf)},1006 L${lerp(360, 485, wf)},1006 L${lerp(360, 585, wf)},1280 L${lerp(360, 135, wf)},1280Z" fill="url(#rw${id})"/>`;
  if (Lv < .6) for (let i = 0; i < 9; i++) { const r = RS(i + 70), y = 1060 + r() * 210, side = r() > .5 ? 1 : -1, x = 360 + side * (lerp(130, 230, (y - 1000) / 280) * (wf + .1 + r() * .25)); s += `<ellipse cx="${x}" cy="${y}" rx="${8 + r() * 12}" ry="${5 + r() * 6}" fill="#7a7468"/><ellipse cx="${x - 3}" cy="${y - 3}" rx="${5 + r() * 6}" ry="${3 + r() * 3}" fill="#a8a294"/>`; }
  for (let i = 0; i < 16; i++) { const r = RS(i + 90), y = 1010 + pmod(r() * 270 + t * 110, 270), half = lerp(125, 225, (y - 1000) / 280) * wf, x = 360 + (r() - .5) * 2 * half * .85; s += `<path d="M${x},${y} l${(x - 360) * .02},${10 + 10 * (y - 1000) / 280}" stroke="#cfe6ea" stroke-width="2" opacity=".45"/>`; }
  const white = Math.min(1, spill + .35 * gen);
  for (let i = 0; i < 12; i++) { const r = RS(i + 110), ph = pmod(t * 1.3 + r(), 1); s += `<ellipse cx="${360 + (r() - .5) * 200 * wf}" cy="${1012 + r() * 50 + ph * 14}" rx="${16 + r() * 30}" ry="${4 + r() * 5}" fill="#fff" opacity="${(.7 * white * (1 - ph * .6)).toFixed(2)}"/>`; }
  // the dam face: curved concrete, joints, gallery lines, weathering streaks
  s += `<g clip-path="url(#dc${id})"><rect x="130" y="600" width="470" height="430" fill="url(#dF${id})"/><rect x="130" y="600" width="470" height="430" fill="#fff" filter="url(#stainD)" opacity=".6"/>`;
  for (let i = 1; i < 12; i++) { const u = i / 12; s += `<path d="M${PT(face(u, 0))} L${PT(face(u, 1))}" stroke="#000" stroke-width="1.2" opacity=".14"/>`; }
  for (let j = 1; j < 5; j++) { let d = ''; for (let i = 0; i <= 20; i++) d += (i ? ' L' : 'M') + PT(face(i / 20, j / 5)); s += `<path d="${d}" stroke="#000" stroke-width="1" opacity=".11"/>`; }
  if (Lv < .9) for (let g = 0; g < 3; g++) { const u = .375 + g * .1; s += `<path d="M${PT(face(u, 0))} L${PT(face(u + .07, 0))} L${PT(face(u + .075, 1))} L${PT(face(u - .005, 1))}Z" fill="#4a463e" opacity=".2"/>`; }
  s += `</g>`;
  // crest road, railing, spillway piers and gates
  let cr = ''; for (let i = 0; i <= 30; i++) cr += (i ? ' L' : 'M') + PT(crest(i / 30));
  s += `<path d="${cr}" stroke="#e6e2d8" stroke-width="12" fill="none"/><path d="${cr}" stroke="#6a665e" stroke-width="2" fill="none" transform="translate(0,6)"/>`;
  for (let i = 0; i <= 26; i++) { const p = crest(i / 26); s += `<rect x="${p[0] - 1}" y="${p[1] - 12}" width="2" height="7" fill="#555"/>`; }
  for (let g = 0; g <= 3; g++) { const p = crest(.36 + g * .1); s += `<rect x="${p[0] - 6}" y="${p[1] - 30}" width="12" height="30" fill="#c4bfb4"/><rect x="${p[0] - 6}" y="${p[1] - 30}" width="4" height="30" fill="#fff" opacity=".35"/><rect x="${p[0] - 8}" y="${p[1] - 34}" width="16" height="5" fill="#8a867c"/>`; }
  for (let g = 0; g < 3; g++) { const a = crest(.36 + g * .1), b = crest(.46 + g * .1); s += `<rect x="${a[0] + 6}" y="${a[1] - (spill > 0 ? 30 : 22)}" width="${b[0] - a[0] - 12}" height="${spill > 0 ? 7 : 19}" fill="#55534c"/>`; }
  // spilling water: glassy at the lip, white and aerated lower down, streaks moving down, spray mist at the foot
  if (spill > 0) for (let g = 0; g < 3; g++) { const u0 = .372 + g * .1, u1 = .448 + g * .1; let L1 = '', R1 = '';
    for (let q = 0; q <= 16; q++) { const v = q / 16, w = Math.sin(t * 9 + q * 1.7 + g) * 2.2 * v, a = face(u0, v), b = face(u1, v); L1 += (q ? ' L' : 'M') + `${(a[0] - 4 * v + w).toFixed(1)},${a[1].toFixed(1)}`; R1 = ` L${(b[0] + 4 * v - w).toFixed(1)},${b[1].toFixed(1)}` + R1; }
    s += `<path d="${L1}${R1}Z" fill="url(#sp${id})" opacity="${.95 * spill}"/>`;
    for (let q = 0; q < 7; q++) { const u = lerp(u0, u1, (q + .5) / 7), a = face(u, .1), b = face(u, 1); s += `<path d="M${PT(a)} L${PT(b)}" stroke="${q % 2 ? '#ffffff' : '#bcd8e2'}" stroke-width="2" stroke-dasharray="16 24" stroke-dashoffset="${(-t * 520 - q * 13).toFixed(1)}" opacity="${.8 * spill}"/>`; } }
  for (let i = 0; i < 10; i++) { const r = RS(i + 60), ph = pmod(t * .2 + r(), 1), x = 360 + (r() - .5) * 200 + ph * 50 * (r() - .5), y = 1008 - ph * 110, rr = 45 + r() * 55 + ph * 60;
    s += `<circle cx="${x}" cy="${y}" r="${rr}" fill="url(#mi${id})" opacity="${(.85 * spill * (1 - ph)).toFixed(2)}"/>`; }
  // power station at the foot and its outflow
  s += `<path d="M382,1046 L382,990 L508,982 L508,1042Z" fill="#bdb6aa"/><path d="M382,990 L508,982 L502,972 L388,980Z" fill="#8a857a"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${394 + i * 22}" y="${996 - i * .7}" width="13" height="22" fill="#3a4a5a"/><rect x="${394 + i * 22}" y="${996 - i * .7}" width="5" height="22" fill="#fff" opacity=".15"/>`).join('');
  for (let i = 0; i < 6; i++) { const r = RS(i + 130), ph = pmod(t * 1.6 + r(), 1); s += `<ellipse cx="${440 + (r() - .5) * 60}" cy="${1050 + ph * 20}" rx="${10 + r() * 16}" ry="4" fill="#fff" opacity="${(.7 * gen * (1 - ph)).toFixed(2)}"/>`; }
  // near gorge walls framing the dam: lit left wall, shaded right wall, strata, shrubs, rim
  s += `<path d="M-20,380 L70,392 L120,428 L150,500 L140,640 L180,780 L235,1000 L200,1120 L140,1280 L-20,1280Z" fill="#a8906e" filter="url(#reliefR)"/>`;
  s += `<path d="M740,380 L660,394 L612,440 L586,510 L590,640 L545,800 L485,1000 L520,1130 L585,1280 L740,1280Z" fill="#7a6650" filter="url(#reliefR)"/><path d="M740,380 L660,394 L612,440 L586,510 L590,640 L545,800 L485,1000 L520,1130 L585,1280 L740,1280Z" fill="url(#shR${id})"/>`;
  let strata = ''; for (let q = 0; q < 16; q++) { const y = 420 + q * 56; strata += `<path d="M-20,${y} Q200,${y - 30 + (q % 3) * 8} 760,${y - 70}" stroke="#3a2a1a" stroke-width="${1.5 + (q % 3)}" fill="none" opacity=".22"/>`; }
  s += `<g clip-path="url(#wl${id})">${strata}</g><g clip-path="url(#wr${id})">${strata}</g>`;
  for (let i = 0; i < 26; i++) { const r = RS(i + 150), lft = i % 2 === 0, y = 430 + r() * 820, x = lft ? lerp(-10, 120, r()) * (y < 640 ? .9 : 1) : lerp(620, 730, r()); s += `<ellipse cx="${x}" cy="${y}" rx="${7 + r() * 9}" ry="${4 + r() * 5}" fill="${mix('#3e5a26', '#5a6a32', r())}" opacity=".85"/>`; }
  s += `<path d="M-20,380 L70,392 L120,428 L150,500" stroke="#6e7e4a" stroke-width="7" fill="none"/><path d="M740,380 L660,394 L612,440 L586,510" stroke="#5e6e40" stroke-width="7" fill="none"/>`;
  s += `<path d="M140,640 Q90,646 40,666 Q10,678 -20,684" stroke="#8a857a" stroke-width="13" fill="none"/><path d="M140,640 Q90,646 40,666 Q10,678 -20,684" stroke="#e8e0c8" stroke-width="1.5" stroke-dasharray="10 10" fill="none"/>`;
  s += `<g stroke="#4a4a4a" stroke-width="2.4" fill="none"><path d="M676,392 L690,300 L704,392 M681,360 L699,360 M685,330 L695,330 M672,316 L708,316"/></g><path d="M672,316 Q560,300 430,318 M708,316 Q740,320 760,326" stroke="#333" stroke-width="1.2" fill="none"/>`;
  return s;
}

// ---------- 4: date-palm grove and broadleaf trees behind a real wheat field ----------
function palmG(x, y, h, t, haze = 0, dry = 0) {
  const k = h / 200, trunk = mix('#5a4a36', '#a4aeb6', haze), fr = mix(mix('#3a5a26', '#7a6a3a', dry), '#a2aeb6', haze), fr2 = mix(mix('#4e7a32', '#8a7a46', dry), '#b0bcc2', haze), leaf = h > 120 ? 8 : 5;
  const tx = x + h * .06, ty = y - h;
  let s = `<path d="M${x - 6 * k},${y} Q${x + h * .02},${y - h * .5} ${tx - 3.5 * k},${ty} L${tx + 3.5 * k},${ty} Q${x + h * .05},${y - h * .5} ${x + 6 * k},${y}Z" fill="${trunk}"/>`;
  for (let i = 0; i < 12; i++) { const u = i / 12; s += `<path d="M${x - 5 * k + (tx - x) * u},${y - h * u} l${10 * k},${-3 * k}" stroke="#000" stroke-opacity="${.25 * (1 - haze)}" stroke-width="${1.6 * k}"/>`; }
  for (let i = 0; i < 15; i++) { const ang = (-190 + i * 14.3 + Math.sin(t * 1.1 + i + x) * 1.2) * Math.PI / 180, Ln = h * (.42 + .08 * Math.sin(i * 2.3)), droop = Ln * (.5 + .2 * Math.cos(i));
    const ex = tx + Math.cos(ang) * Ln, ey = ty + Math.sin(ang) * Ln * .45 + droop * .7, cx = tx + Math.cos(ang) * Ln * .55, cy = ty + Math.sin(ang) * Ln * .5 - Ln * .1, col = i % 2 ? fr : fr2;
    const nx = -(ey - ty), ny = ex - tx, nl = Math.hypot(nx, ny) || 1, w = Ln * .1;
    s += `<path d="M${tx},${ty} Q${cx + nx / nl * w},${cy + ny / nl * w} ${ex},${ey} Q${cx - nx / nl * w},${cy - ny / nl * w} ${tx},${ty}Z" fill="${col}"/>`;
    for (let j = 1; j < leaf; j++) { const u = j / leaf, px = (1 - u) ** 2 * tx + 2 * (1 - u) * u * cx + u * u * ex, py = (1 - u) ** 2 * ty + 2 * (1 - u) * u * cy + u * u * ey, ll = w * 1.6 * (1 - u * .6);
      s += `<path d="M${px},${py} l${nx / nl * ll},${ny / nl * ll + 4 * k} M${px},${py} l${-nx / nl * ll},${-ny / nl * ll + 4 * k}" stroke="${col}" stroke-width="${1.5 * k}" stroke-linecap="round"/>`; } }
  return s + `<circle cx="${tx}" cy="${ty + 4 * k}" r="${6 * k}" fill="${mix('#7a4a22', '#a4aeb6', haze)}"/>`;
}
function treeB(x, y, h, seed, haze = 0, dry = 0) {
  const r = RS(seed), g0 = mix(mix('#2e4a1e', '#5a4a26', dry), '#8e9aa2', haze), g1 = mix(mix('#4a6e2e', '#8a7a3a', dry), '#a0acb4', haze), g2 = mix(mix('#6e9442', '#a8944a', dry), '#b6c0c6', haze);
  let s = `<path d="M${x - h * .025},${y} L${x - h * .01},${y - h * .5} L${x + h * .01},${y - h * .5} L${x + h * .025},${y}Z" fill="${mix('#4a3a2a', '#9aa4ac', haze)}"/>`;
  const bl = []; for (let i = 0; i < 14; i++) bl.push([x + (r() - .5) * h * .5, y - h * (.45 + r() * .5), h * (.11 + r() * .09)]);
  bl.forEach(b => { s += `<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="${g0}"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .2}" cy="${b[1] - b[2] * .25}" r="${b[2] * .78}" fill="${g1}"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .35}" cy="${b[1] - b[2] * .4}" r="${b[2] * .42}" fill="${g2}"/>`; });
  return s;
}
// a wheat plant: stem, long tapering leaves, an ear of stacked spikelets with awns; drought turns it straw-coloured, the leaves curl and the ear droops
function wheatR(x, y, h, dry, seed, t) {
  const r = RS(seed), lean = (r() - .5) * 8 + Math.sin(t * 1.4 + seed * .7) * 2.5 * (1 - dry), droop = dry * (18 + r() * 22) * (r() > .5 ? 1 : -1);
  const col = mix(mix('#4e8a2c', '#6e9e36', r()), mix('#b08a3c', '#9a7432', r()), dry), ear = mix('#8eae46', '#d2aa52', dry), awn = mix('#b8cc7a', '#e8cc80', dry);
  const tx = x + Math.sin(lean * Math.PI / 180) * h, ty = y - Math.cos(lean * Math.PI / 180) * h;
  let s = `<path d="M${x},${y} Q${x + (tx - x) * .3},${y - h * .55} ${tx},${ty}" stroke="${col}" stroke-width="${Math.max(1, h * .022)}" fill="none"/>`;
  for (let i = 0; i < 3; i++) { const yy = y - h * (.12 + i * .17), sd = i % 2 ? 1 : -1, Ln = h * (.4 - i * .05) * (1 - .3 * dry), ex = x + sd * Ln * (.8 - .3 * dry), ey = yy - Ln * (.45 - .85 * dry);
    s += `<path d="M${x},${yy} Q${x + sd * Ln * .45},${yy - Ln * .5} ${ex},${ey} Q${x + sd * Ln * .4},${yy - Ln * .36} ${x},${yy + h * .025}Z" fill="${col}"/>`; }
  const eh = h * .25; let e = `<path d="M0,0 L0,${-eh}" stroke="${mix(ear, '#000000', .25)}" stroke-width="1"/>`;
  for (let q = 0; q < 9; q++) { const v = q / 9, yy = -v * eh, sd = q % 2 ? 1 : -1, rw = h * .026 * (1 - v * .4); e += `<ellipse cx="${sd * rw * .6}" cy="${yy}" rx="${rw}" ry="${rw * 1.6}" fill="${ear}" transform="rotate(${sd * 18},${sd * rw * .6},${yy})"/><path d="M${sd * rw},${yy - rw} l${sd * h * .02},${-h * .13}" stroke="${awn}" stroke-width=".9"/>`; }
  return s + `<g transform="translate(${tx.toFixed(1)},${ty.toFixed(1)}) rotate(${(lean + droop).toFixed(1)})">${e}</g>`;
}
function sceneSoil(t) {
  const dry = ease(ramp(t, WS(2, 4), WS(2, 6) + .6)), crk = ease(ramp(t, WS(2, 3) - .2, WS(2, 4) + .6)), F0 = 806, FE = 1105;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8ad0"/><stop offset=".75" stop-color="#c8dcea"/><stop offset="1" stop-color="#e8e4d4"/></linearGradient><radialGradient id="sunS2"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".6"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="hzS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8e2e8" stop-opacity=".55"/><stop offset="1" stop-color="#d8e2e8" stop-opacity="0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skS2)"/><circle cx="150" cy="470" r="260" fill="url(#sunS2)"/><circle cx="150" cy="470" r="32" fill="#fffdf2"/>`;
  // far grove (hazy), then the nearer grove with broadleaf trees, a farmhouse
  for (let i = 0; i < 16; i++) { const r = RS(i + 30); s += palmG(-10 + i * 48 + r() * 20, 790, 70 + r() * 30, t, .55); }
  s += `<rect x="470" y="752" width="90" height="46" fill="#c8b08a"/><rect x="466" y="746" width="98" height="8" fill="#a8906a"/><rect x="500" y="770" width="16" height="28" fill="#6a4a2e"/><rect x="530" y="764" width="14" height="12" fill="#4a5a6a"/>`;
  const near = []; for (let i = 0; i < 11; i++) { const r = RS(i + 60); near.push([10 + i * 68 + r() * 30, 806 + r() * 6, 120 + r() * 60, r() > .7, i + 60]); }
  near.forEach(q => { s += q[3] ? treeB(q[0], q[1], q[2] * .9, q[4], .15, dry * .3) : palmG(q[0], q[1], q[2], t, .15, dry * .3); });
  // the crop mass: colour, stalk streaks, patchiness, perspective rows, ear speckle, far haze
  let top = `M-20,${F0}`; for (let x = -20; x <= 740; x += 20) top += ` L${x},${F0 - 4 - 3 * Math.sin(x * .07 + t * .8)}`;
  const cropC = mix('#5e8e34', '#c4a04c', dry);
  s += `<path d="${top} L740,${FE} L-20,${FE}Z" fill="${cropC}"/><path d="${top} L740,${FE} L-20,${FE}Z" fill="#000" filter="url(#stalkT)" opacity=".38"/><path d="${top} L740,${FE} L-20,${FE}Z" fill="#000" filter="url(#cropT)" opacity="${.22 + .2 * dry}"/>`;
  for (let q = 0; q < 26; q++) { const v = q / 25, y = F0 + (FE - F0) * Math.pow(v, 1.8); s += `<path d="M-20,${y} L740,${y}" stroke="#000" stroke-width="${(.6 + 3 * v).toFixed(1)}" opacity="${(.12 + .12 * v).toFixed(2)}"/>`; }
  const r0 = RS(81); for (let q = 0; q < 420; q++) { const v = Math.pow(r0(), .7), y = F0 + 6 + (FE - F0 - 10) * Math.pow(v, 1.8), x = r0() * 740, l = 2 + 9 * v; s += `<path d="M${x},${y} l${(r0() - .5) * l * .4},${-l}" stroke="${mix('#a8c058', '#e2c068', dry)}" stroke-width="${(.8 + 1.4 * v).toFixed(1)}" opacity=".85"/>`; }
  s += `<rect y="${F0 - 10}" width="720" height="90" fill="url(#hzS)"/>`;
  // field-edge soil: dries, pales and cracks
  s += `<rect y="${FE}" width="720" height="${1290 - FE}" fill="${mix('#5e4028', '#d6c29c', crk)}" filter="url(#reliefR)"/><rect y="${FE}" width="720" height="${1290 - FE}" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  s += cracks(FE + 4, 1290, crk, 31, -20, 740, '#3a2412');
  // the front rows of individual plants along the field edge
  for (let row = 0; row < 3; row++) { const y = FE - 8 + row * 14, h = 96 + row * 12; for (let i = 0; i < 34; i++) { const x = -10 + i * 22 + (row % 2) * 11; if (row === 2 && x > 400 && x < 540) continue; s += wheatR(x, y, h * (.9 + .2 * RS(row * 50 + i)()), clamp(dry * (.85 + .3 * RS(row * 70 + i)())), row * 100 + i, t); } }
  s += person(470, 1236, { s: .62, face: -1, top: '#e8e2d4', pants: '#4a4a52', skin: '#a46a46', hair: '#1b1410', t, lookUp: -.2 });
  F.ov = ''; return s;
}

// ---------- 5: realistic farmland from above: irregular plots, crop rows, a canal lined with palms, farm houses, tracks ----------
function sceneFields(t) {
  const k = ease(ramp(t, WS(3, 8), WS(3, 11) + .4));
  let s = `<defs>${RDEF}${RDEF2}<pattern id="rowA" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="3.5" fill="#000" opacity=".2"/></pattern><pattern id="rowB" width="9" height="9" patternUnits="userSpaceOnUse" patternTransform="rotate(90)"><rect width="9" height="3.5" fill="#000" opacity=".2"/></pattern>` +
    `<linearGradient id="canG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8aa8"/><stop offset="1" stop-color="#2a5a7a"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="#b8a07a"/><rect width="720" height="1280" fill="#000" filter="url(#cropT)" opacity=".25"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += `<g transform="translate(360,800) scale(1,.64) rotate(-6) translate(-330,-470)">`;
  const W_ = 300, H_ = 170, rr = RS(5), jit = () => (rr() - .5) * 16;
  for (let j = 0; j < 5; j++) for (let i = 0; i < 2; i++) { const x = i * (W_ + 60), y = j * (H_ + 24), irr = j === 4, rc = RS(j * 10 + i + 70);
    const pts = [[x + jit(), y + jit()], [x + W_ + jit(), y + jit()], [x + W_ + jit(), y + H_ + jit()], [x + jit(), y + H_ + jit()]].map(PT).join(' ');
    const g0 = mix('#3e7a26', '#5e9a34', rc()), dryC = mix('#b8985e', '#a07c48', rc());
    s += `<polygon points="${pts}" fill="${irr ? g0 : mix(g0, dryC, k)}"/>`;
    s += `<polygon points="${pts}" fill="url(#${(i + j) % 2 ? 'rowA' : 'rowB'})"/><polygon points="${pts}" fill="#000" filter="url(#cropT)" opacity="${irr ? .2 : .25 + .2 * k}"/>`;
    if (!irr && k > 0) { s += `<g stroke="#5a4020" stroke-width="2" fill="none" opacity="${.7 * k}">`; for (let q = 0; q < 14; q++) { let px = x + 10 + rc() * (W_ - 20), py = y + 10 + rc() * (H_ - 20), d = `M${px},${py}`; for (let m = 0; m < 4; m++) { px = clamp(px + (rc() - .5) * 60, x + 6, x + W_ - 6); py = clamp(py + (rc() - .5) * 40, y + 6, y + H_ - 6); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; } s += `<path d="${d}"/>`; } s += `</g>`; }
    s += `<polygon points="${pts}" fill="none" stroke="#6a5a3e" stroke-width="3" opacity=".6"/>`;
    s += `<text x="${x + W_ / 2}" y="${y + H_ / 2 + 14}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="36" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="5" opacity="${ramp(t, WS(3, 8), WS(3, 8) + .4)}">${irr ? 'مروية' : 'مطرية'}</text>`; }
  // dirt track between the columns with tyre ruts
  s += `<rect x="${W_ + 14}" y="-60" width="32" height="1060" fill="#d0bc94"/><path d="M${W_ + 22},-60 L${W_ + 22},1000 M${W_ + 38},-60 L${W_ + 38},1000" stroke="#a8946c" stroke-width="2.5"/>`;
  // canal with palms on both banks and a pump house
  const cy = 4 * (H_ + 24) + H_ + 30;
  s += `<rect x="-80" y="${cy}" width="820" height="30" fill="url(#canG)"/><rect x="-80" y="${cy + 4}" width="820" height="3" fill="#d8eef8" opacity=".5"/>`;
  const crown = (x, y, r_) => { let o = `<ellipse cx="${x + r_ * .5}" cy="${y + r_ * .4}" rx="${r_}" ry="${r_ * .8}" fill="#000" opacity=".25"/>`; for (let q = 0; q < 12; q++) { const a = q / 12 * 6.283; o += `<path d="M${x},${y} L${x + Math.cos(a) * r_},${y + Math.sin(a) * r_}" stroke="${q % 2 ? '#3a6a2a' : '#5a8a34'}" stroke-width="${r_ * .28}" stroke-linecap="round"/>`; } return o + `<circle cx="${x}" cy="${y}" r="${r_ * .2}" fill="#6a5a2a"/>`; };
  for (let q = 0; q < 12; q++) { s += crown(-40 + q * 66, cy - 14, 15) + crown(-10 + q * 66, cy + 46, 15); }
  s += `<rect x="590" y="${cy - 60}" width="40" height="30" fill="#d8cfbc"/><path d="M590,${cy - 60} L630,${cy - 60} L620,${cy - 72} L600,${cy - 72}Z" fill="#a8946c"/><rect x="630" y="${cy - 56}" width="12" height="28" fill="#000" opacity=".25"/>`;
  // farm houses and tree clumps with shadows near the track
  [[W_ + 70, 120], [W_ - 70, 520]].forEach(([hx, hy]) => { s += `<rect x="${hx + 8}" y="${hy + 8}" width="46" height="34" fill="#000" opacity=".25"/><rect x="${hx}" y="${hy}" width="46" height="34" fill="#e0d4bc"/><path d="M${hx},${hy} L${hx + 46},${hy} L${hx + 23},${hy + 17}Z" fill="#c8b898"/>`; });
  for (let q = 0; q < 8; q++) { const r = RS(q + 40), x = W_ + 30 + (r() > .5 ? 1 : -1) * (40 + r() * 30), y = 40 + r() * 860, r_ = 12 + r() * 10; s += `<circle cx="${x + r_ * .5}" cy="${y + r_ * .4}" r="${r_}" fill="#000" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r_}" fill="#3a5a26"/><circle cx="${x - r_ * .3}" cy="${y - r_ * .3}" r="${r_ * .55}" fill="#5a7e36"/>`; }
  s += `</g>`;
  F.ov = ''; return s;
}

// ---------- 6: a Baghdad souq stall at human scale: produce piles, a hanging balance, bread basket; half the goods vanish, the price is crossed out ----------
function sceneMarket(t) {
  const k = ease(ramp(t, WS(3, 14), WS(3, 16) + .3)), f = 1 - .55 * k;
  const rg = (id, a, b, c) => `<radialGradient id="${id}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`;
  let s = `<defs>${RDEF}${RDEF2}${rg('tmG', '#ff8a6a', '#d8301c', '#8a140a')}${rg('orG2', '#ffd27a', '#f08a1a', '#b05a0a')}${rg('onG', '#f0c890', '#c8803a', '#7a4a1e')}${rg('cuG', '#8ac860', '#3a7a2a', '#1e4a16')}${rg('egG', '#8a5a9a', '#4a1e52', '#22082a')}` +
    `<linearGradient id="skM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ab4dc"/><stop offset="1" stop-color="#e8e0cc"/></linearGradient></defs>`;
  // the alley in perspective: sky slot, facades, paving, tarps, distant stalls and shoppers
  s += `<rect width="720" height="1280" fill="#d4c09c"/><path d="M250,0 L470,0 L398,570 L322,570Z" fill="url(#skM)"/>`;
  s += `<path d="M0,0 L250,0 L322,570 L322,760 L0,1120Z" fill="#c8a678"/><path d="M0,0 L250,0 L322,570 L322,760 L0,1120Z" fill="#fff" filter="url(#wallI)" opacity=".55"/>`;
  s += `<path d="M720,0 L470,0 L398,570 L398,760 L720,1120Z" fill="#b2946a"/><path d="M720,0 L470,0 L398,570 L398,760 L720,1120Z" fill="#fff" filter="url(#wallI)" opacity=".45"/>`;
  const shop = (side, ua, ub, seed) => { const X = u => side < 0 ? lerp(0, 322, u) : lerp(720, 398, u), G = u => lerp(1120, 760, u), H = u => lerp(380, 70, u), rn = RS(seed);
    const q = [[X(ua), G(ua) - H(ua)], [X(ub), G(ub) - H(ub)], [X(ub), G(ub)], [X(ua), G(ua)]];
    let o = `<polygon points="${q.map(PT).join(' ')}" fill="#2e2018"/><path d="M${PT(q[0])} L${PT(q[1])}" stroke="#d8c8a8" stroke-width="${lerp(10, 3, ub)}"/>`;
    for (let i = 0; i < 18; i++) { const u = lerp(ua, ub, rn()), v = .45 + rn() * .5, x = X(u), y = G(u) - H(u) * (1 - v), r_ = lerp(7, 2, u); o += `<circle cx="${x}" cy="${y}" r="${r_}" fill="${['#d8321e', '#f08a1a', '#3a8a2a', '#e8d070', '#7a3a8a'][i % 5]}" opacity=".9"/>`; }
    return o + `<path d="M${PT(q[0])} L${PT([q[1][0], q[1][1] + 4])}" stroke="${['#c0392b', '#2a6a9a', '#3a8a4a'][seed % 3]}" stroke-width="${lerp(26, 6, ub)}" opacity=".85"/>`; };
  [[.06, .22], [.3, .44], [.52, .64], [.7, .8], [.86, .93]].forEach(([a, b], q) => { s += shop(-1, a, b, q) + shop(1, a + .02, b + .02, q + 7); });
  s += `<path d="M0,1120 L322,760 L398,760 L720,1120 L720,1280 L0,1280Z" fill="#8a8274"/><path d="M0,1120 L322,760 L398,760 L720,1120 L720,1280 L0,1280Z" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  [['#c0392b', 140], ['#2a6a9a', 300], ['#e8e0d0', 430], ['#3a8a4a', 520]].forEach(([c, y], q) => { const u = (y - 100) / 470, xl = lerp(0, 322, u) - 20, xr = lerp(720, 398, u) + 20, sag = lerp(60, 10, u); s += `<path d="M${xl},${y} Q360,${y + sag} ${xr},${y} L${xr},${y + 26 * (1 - u) + 6} Q360,${y + sag + 30 * (1 - u) + 6} ${xl},${y + 26 * (1 - u) + 6}Z" fill="${c}" opacity=".88"/>`; });
  for (let q = 0; q < 6; q++) { const r = RS(q + 20), u = .45 + r() * .5, x = q % 2 ? lerp(330, 300, 1 - u) : lerp(390, 420, 1 - u), y = lerp(760, 700, 1 - u); s += person(x + (r() - .5) * 30, y + 40 * (1 - u), { s: .12 + .12 * (1 - u), face: q % 2 ? 1 : -1, moving: 1, phase: t * 5 + q, top: CROWD[q % 4].top, pants: CROWD[q % 4].pants, skin: CROWD[q % 4].skin, hair: CROWD[q % 4].hair, t }); }
  for (let q = 0; q < 4; q++) { const x = 140 + q * 140; s += `<path d="M${x},440 L${x},${520 + (q % 2) * 20}" stroke="#333" stroke-width="1.2"/><circle cx="${x}" cy="${526 + (q % 2) * 20}" r="7" fill="#ffe2a0"/><circle cx="${x}" cy="${526 + (q % 2) * 20}" r="22" fill="#ffd27a" opacity=".3" filter="url(#blur2)"/>`; }
  // seller behind the stall, apron
  s += person(372, 1150, { s: .78, face: -1, top: '#e8e2d4', pants: '#3a3a42', skin: '#9a5e3e', hair: '#1b1410', t, lookUp: .05 });
  s += `<path d="M352,964 L392,964 L398,1060 L346,1060Z" fill="#2a5a8a"/><path d="M356,964 Q372,948 388,964" stroke="#2a5a8a" stroke-width="4" fill="none"/>`;
  // hanging balance scale
  s += `<path d="M250,560 L250,826" stroke="#555" stroke-width="2"/><rect x="200" y="826" width="100" height="5" fill="#8a7a5a"/><path d="M204,831 L194,880 M204,831 L214,880 M296,831 L286,880 M296,831 L306,880" stroke="#666" stroke-width="1.2"/><path d="M186,880 Q204,892 222,880Z M278,880 Q296,892 314,880Z" fill="#b8a888" stroke="#8a7a5a"/><rect x="288" y="870" width="10" height="10" fill="#555"/>`;
  // the tilted display table and its compartments
  s += `<path d="M60,980 L660,980 L700,1090 L20,1090Z" fill="#8a5a32"/><path d="M60,980 L660,980 L700,1090 L20,1090Z" fill="#000" filter="url(#wallI)" opacity=".3"/>` + [160, 280, 400, 520].map(x => `<path d="M${x},980 L${lerp(x, 360 + (x - 360) * 1.13, 1)},1090" stroke="#5a3a1a" stroke-width="4"/>`).join('');
  const items = {
    tom: (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#tmG)"/><path d="M${x - r * .4},${y - r * .8} l${r * .4},${r * .3} l${r * .4},${-r * .3}" stroke="#2a6a1a" stroke-width="${r * .25}" fill="none"/>`,
    cuc: (x, y, r, rn) => `<rect x="${x - r * 1.6}" y="${y - r * .55}" width="${r * 3.2}" height="${r * 1.1}" rx="${r * .55}" fill="url(#cuG)" transform="rotate(${(rn() - .5) * 40},${x},${y})"/>`,
    ora: (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r * 1.05}" fill="url(#orG2)"/><circle cx="${x + r * .1}" cy="${y - r * .7}" r="${r * .12}" fill="#5a4a1a"/>`,
    oni: (x, y, r) => `<path d="M${x},${y - r * 1.2} Q${x + r * 1.2},${y - r * .4} ${x + r * .9},${y + r * .5} Q${x},${y + r * 1.1} ${x - r * .9},${y + r * .5} Q${x - r * 1.2},${y - r * .4} ${x},${y - r * 1.2}Z" fill="url(#onG)"/><path d="M${x},${y - r} L${x},${y + r * .8}" stroke="#7a4a1e" stroke-width=".8" opacity=".6"/>`,
    egg: (x, y, r, rn) => `<g transform="rotate(${(rn() - .5) * 50},${x},${y})"><ellipse cx="${x}" cy="${y}" rx="${r * 1.5}" ry="${r * .85}" fill="url(#egG)"/><path d="M${x + r * 1.2},${y - r * .6} q${r * .5},${r * .2} ${r * .4},${r * .9}" stroke="#3a6a2a" stroke-width="${r * .45}" fill="none"/></g>`,
  };
  const comp = [['tom', 60, 160], ['cuc', 160, 280], ['ora', 280, 400], ['oni', 400, 520], ['egg', 520, 660]];
  comp.forEach(([key, a, b], ci) => { const rn = RS(ci + 300); for (let layer = 0; layer < 3; layer++) { if (layer >= Math.round(3 * f + .2)) break;
      for (let j = 0; j < 6; j++) { const v = j / 5, y = lerp(994, 1078, v) - layer * 9, rr_ = lerp(5.5, 8.5, v), xa = lerp(a, 360 + (a - 360) * 1.13, v) + 8 + layer * 10, xb = lerp(b, 360 + (b - 360) * 1.13, v) - 8 - layer * 10, n = Math.max(1, Math.floor((xb - xa) / (rr_ * (key === 'cuc' || key === 'egg' ? 3 : 2.1))));
        for (let i = 0; i < n; i++) { if (rn() > f * 1.25 - .15 * (1 - v)) continue; s += items[key](xa + (i + .5) * (xb - xa) / n + (rn() - .5) * 2, y + (rn() - .5) * 2, rr_, rn); } } } });
  s += `<path d="M20,1090 L700,1090 L700,1180 L20,1180Z" fill="#6a4426"/>` + Array.from({ length: 3 }, (_, q) => `<rect x="20" y="${1110 + q * 24}" width="680" height="2.5" fill="#3a2410" opacity=".6"/>`).join('') + `<rect x="40" y="1180" width="14" height="110" fill="#4a2e18"/><rect x="666" y="1180" width="14" height="110" fill="#4a2e18"/>`;
  [[90, '#2a6aa8'], [200, '#c0392b'], [560, '#2a6aa8']].forEach(([x, c]) => { s += `<rect x="${x}" y="1196" width="96" height="70" rx="4" fill="${c}"/><rect x="${x + 30}" y="1206" width="36" height="10" rx="5" fill="#000" opacity=".35"/>` + Array.from({ length: 4 }, (_, q) => `<rect x="${x + 8 + q * 22}" y="1226" width="12" height="30" fill="#000" opacity=".18"/>`).join(''); });
  // bread basket on a side stand
  s += `<rect x="560" y="900" width="140" height="10" fill="#6a4426"/><path d="M566,900 Q630,930 694,900 L688,872 L572,872Z" fill="#b89058"/>`;
  { const rn = RS(9); for (let q = 0; q < 10; q++) if (q / 10 < f) { const x = 584 + (q % 5) * 24, y = 880 - Math.floor(q / 5) * 10; s += `<path d="M${x - 16},${y} Q${x},${y - 12} ${x + 16},${y} Q${x},${y + 6} ${x - 16},${y}Z" fill="#d89a4a" transform="rotate(${(rn() - .5) * 20},${x},${y})"/>`; } }
  // cardboard price sign: the old price is crossed out and a higher one written
  s += `<g transform="translate(110,958) rotate(-6)"><rect x="-6" y="0" width="4" height="40" fill="#8a6a3a"/><rect x="-46" y="-46" width="92" height="50" fill="#d8c09a"/><text x="0" y="-12" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#1a1a1a">١٠٠٠</text>` +
    (k > .4 ? `<path d="M-34,-20 L34,-20" stroke="#c62828" stroke-width="4" opacity="${ramp(k, .4, .6)}"/><text x="0" y="-52" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#c62828" opacity="${ramp(k, .5, .8)}">٢٠٠٠</text>` : '') + `</g>`;
  // a shopper close to the camera with a plastic bag
  s += person(96, 1360, { s: 1.0, face: 1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .05 }) + `<path d="M150,1240 Q170,1290 140,1300 Q112,1296 120,1250Z" fill="#1a1a1a" opacity=".9"/>`;
  F.ov = ''; return s;
}

// ---------- 8: the same dam view as shot 3, now draining ----------
function sceneDam(t) {
  const k = ease(ramp(t, S0(5) - .1, WS(5, 2) + .3)), g = ease(ramp(t, WS(5, 2) - .2, WS(5, 4) + .4));
  let s = damView(t, lerp(.95, .18, k), { id: 'e' });
  s += gauge(610, 1160, 76, lerp(.9, .25, g), 'الكهرباء');
  F.ov = ''; return s;
}

// ---------- 9: a realistic well cross-section: soil layers, saturated aquifer, a cone of depression, cased wells with screens, pumps, a drilling rig ----------
function sceneWell(t) {
  const k = ease(ramp(t, S0(6), L(6).end + .2)), gy = 640, wt0 = 800, wt = lerp(800, 1040, k);
  const wtY = x => wt + 46 * (.4 + .6 * k) * Math.exp(-(((x - 540) / 120) ** 2));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skW2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#e4dcc8"/></linearGradient><linearGradient id="aqW2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e6e94"/><stop offset="1" stop-color="#1e3e5a"/></linearGradient>` +
    `<linearGradient id="caW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a6e74"/><stop offset=".4" stop-color="#c8ccd2"/><stop offset="1" stop-color="#5a5e64"/></linearGradient></defs><rect width="720" height="${gy}" fill="url(#skW2)"/>`;
  for (let i = 0; i < 12; i++) { const r = RS(i + 400); s += palmG(-20 + i * 66 + r() * 20, gy - 40, 60 + r() * 30, t, .5, .4); }
  s += `<rect y="${gy - 44}" width="720" height="44" fill="#c4ac80"/>` + Array.from({ length: 70 }, (_, i) => { const r = RS(i + 450), x = r() * 720, y = gy - 40 + r() * 38; return `<path d="M${x},${y} l${(r() - .5) * 4},-${4 + r() * 6}" stroke="#a08850" stroke-width="1.4"/>`; }).join('');
  s += `<rect x="40" y="${gy - 96}" width="120" height="96" fill="#c8b48a"/><rect x="40" y="${gy - 96}" width="120" height="96" fill="#fff" filter="url(#wallI)" opacity=".5"/><rect x="34" y="${gy - 104}" width="132" height="10" fill="#a8946a"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${44 + i * 22}" y="${gy - 108}" width="5" height="8" fill="#6a4a2a"/>`).join('') + `<rect x="86" y="${gy - 54}" width="26" height="54" fill="#5a3a1e"/><rect x="126" y="${gy - 76}" width="20" height="16" fill="#3a4a5a"/>`;
  // ground layers
  s += `<rect y="${gy}" width="720" height="50" fill="#6a4a30"/><rect y="${gy + 50}" width="720" height="110" fill="#9a6848"/><rect y="${gy + 160}" width="720" height="${1210 - gy - 160}" fill="#bc9c6a"/><rect y="1210" width="720" height="70" fill="#6a6460"/>`;
  s += `<rect y="${gy}" width="720" height="${1210 - gy}" fill="#000" filter="url(#grainR)" opacity=".45"/><rect y="${gy + 160}" width="720" height="${1210 - gy - 160}" fill="#000" filter="url(#pebT)" opacity=".5"/><rect y="${gy + 50}" width="720" height="110" fill="#000" filter="url(#cropT)" opacity=".2"/>`;
  for (let i = 0; i < 40; i++) { const r = RS(i + 470), x = r() * 720; s += `<path d="M${x},${gy} q${(r() - .5) * 10},${10 + r() * 14} ${(r() - .5) * 16},${20 + r() * 20}" stroke="#3a2416" stroke-width="1" fill="none" opacity=".6"/>`; }
  s += `<path d="M-20,1210 L120,1196 L260,1214 L420,1198 L560,1212 L740,1200 L740,1280 L-20,1280Z" fill="#6a6460"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${60 + i * 120},1212 l${10 + i * 3},40 l-8,30" stroke="#3a3632" stroke-width="2" fill="none"/>`).join('');
  // saturated zone below the (sinking) water table, with the cone of depression around the pumping well
  let wd = `M-20,${wtY(-20)}`; for (let x = 0; x <= 740; x += 20) wd += ` L${x},${wtY(x).toFixed(1)}`;
  s += `<path d="${wd} L740,1210 L-20,1210Z" fill="url(#aqW2)" opacity=".62"/><path d="${wd}" stroke="#bfe4ff" stroke-width="4" fill="none"/>`;
  for (let i = 0; i < 50; i++) { const r = RS(i + 500), x = r() * 720, y = wtY(x) + 10 + r() * (1200 - wtY(x) - 10); s += `<circle cx="${x}" cy="${y}" r="${1.2 + r() * 1.6}" fill="#cfeaff" opacity="${(.3 + .4 * Math.sin(t * 3 + i)).toFixed(2)}"/>`; }
  if (k > .1) s += `<path d="M-20,${wt0} L740,${wt0}" stroke="#ffffff" stroke-width="2.5" stroke-dasharray="12 10" opacity="${ramp(k, .1, .3) * .8}"/><text x="700" y="${wt0 - 10}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3" opacity="${ramp(k, .1, .3)}">المنسوب سابقاً</text>`;
  s += `<text x="700" y="${wt - 12}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#e8f6ff" style="paint-order:stroke" stroke="#0a2a4a" stroke-width="4">منسوب المياه الجوفية</text>`;
  if (k > .25) s += `<path d="M650,${wt0 + 8} L650,${wt - 34}" stroke="#ff8a80" stroke-width="5" marker-end="url(#arrW)" opacity="${ramp(k, .25, .45)}"/>`;
  // cased wells with slotted screens; a well is dry once its screen is above the water table
  const well = (x, bottom, pump) => { const dry = bottom < wtY(x) + 6; let o = `<rect x="${x - 8}" y="${gy}" width="16" height="${bottom - gy}" fill="url(#caW)"/>` + Array.from({ length: Math.floor((bottom - gy) / 34) }, (_, q) => `<rect x="${x - 9}" y="${gy + 30 + q * 34}" width="18" height="3" fill="#4a4e54"/>`).join('');
    o += `<rect x="${x - 8}" y="${bottom - 56}" width="16" height="56" fill="#8a8e94"/>` + Array.from({ length: 9 }, (_, q) => `<rect x="${x - 6}" y="${bottom - 52 + q * 6}" width="12" height="2" fill="#2a2e34"/>`).join('');
    if (!dry) o += `<rect x="${x - 4}" y="${wtY(x)}" width="8" height="${bottom - wtY(x)}" fill="#4a90c8" opacity=".85"/>`;
    o += `<rect x="${x - 18}" y="${gy - 34}" width="36" height="28" rx="3" fill="#2a5a8a"/><rect x="${x - 14}" y="${gy - 30}" width="10" height="20" fill="#1a3a5a"/><rect x="${x - 4}" y="${gy - 8}" width="8" height="8" fill="#555"/><path d="M${x + 18},${gy - 18} h22 v10" stroke="#777" stroke-width="5" fill="none"/>`;
    if (pump && !dry) for (let q = 0; q < 4; q++) { const ph = pmod(t * 2 + q / 4, 1); o += `<circle cx="${x + 40}" cy="${gy - 6 + ph * 10}" r="3" fill="#5ab0ff" opacity="${1 - ph}"/>`; }
    if (dry) o += `<text x="${x}" y="${gy - 44}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#c62828" style="paint-order:stroke" stroke="#fff" stroke-width="4">جاف</text>`;
    return o; };
  s += well(200, 880, 1) + well(290, 960, 1) + well(540, 1170, 1);
  // drilling rig: lattice mast, crown block, drill string going deeper
  const dd = Math.max(900, wt + 100), rx = 400;
  s += `<rect x="${rx - 50}" y="${gy - 24}" width="100" height="24" fill="#c0392b"/><rect x="${rx - 60}" y="${gy - 10}" width="120" height="10" fill="#555"/>`;
  s += `<g stroke="#d9822b" stroke-width="4" fill="none"><path d="M${rx - 24},${gy - 24} L${rx - 6},${gy - 220} L${rx + 6},${gy - 220} L${rx + 24},${gy - 24}"/>` + Array.from({ length: 6 }, (_, q) => { const y = gy - 40 - q * 30, w = lerp(22, 7, q / 6); return `<path d="M${rx - w},${y} L${rx + w},${y - 30} M${rx + w},${y} L${rx - w},${y - 30}"/>`; }).join('') + `</g><rect x="${rx - 10}" y="${gy - 232}" width="20" height="14" fill="#555"/>`;
  s += `<rect x="${rx - 3}" y="${gy - 218}" width="6" height="${dd - gy + 218}" fill="#9a9a9a"/><path d="M${rx - 9},${dd} L${rx + 9},${dd} L${rx},${dd + 16}Z" fill="#444"/>`;
  [[90, '٢٠ م'], [250, '٥٠ م'], [500, '١٠٠ م']].forEach(([d, lab]) => { const yy = gy + d * .62; s += `<path d="M14,${yy} h24" stroke="#fff" stroke-width="3"/><text x="44" y="${yy + 8}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${lab}</text>`; });
  s += person(250, gy, { s: .4, face: 1, top: '#e8e2d4', pants: '#4a4a52', skin: '#a46a46', hair: '#1b1410', t, lookUp: -.15 });
  F.ov = ''; return s;
}

// ---------- 10: a wildfire that ignites tree by tree and burns in place; charred trunks, smoke columns, embers ----------
function flameT(x, y, h, t, seed, a = 1) {
  if (h < 2 || a <= 0) return ''; let o = `<circle cx="${x}" cy="${y - h * .35}" r="${h * .9}" fill="url(#fireGlow)" opacity="${a}"/>`;
  for (let q = 0; q < 3; q++) { const off = (q - 1) * h * .22, hh = h * (q === 1 ? 1 : .72), w = hh * .3, f1 = Math.sin(t * 13 + seed + q * 2) * .12 * hh, f2 = Math.sin(t * 8.7 + seed * 1.3 + q) * .07 * hh, xx = x + off;
    const pth = sc => `M${xx - w * sc},${y} C${xx - w * sc},${y - hh * .45 * sc} ${xx - w * .2 + f2},${y - hh * .7 * sc} ${xx + f1},${y - hh * sc} C${xx + w * .25 + f2},${y - hh * .7 * sc} ${xx + w * sc},${y - hh * .45 * sc} ${xx + w * sc},${y}Z`;
    o += `<path d="${pth(1.25)}" fill="#b8261a" opacity="${.35 * a}"/><path d="${pth(1)}" fill="#e2431a" opacity="${.8 * a}"/><path d="${pth(.7)}" fill="#ff8c1a" opacity="${.9 * a}"/><path d="${pth(.4)}" fill="#ffe680" opacity="${a}"/>`; }
  return o;
}
function sceneFire(t) {
  const st = S0(7) - .2, T = t - st, k = clamp(T / 3.4), dryF = ease(clamp(T / 1.4)), T0 = WS(7, 2) - st - .5;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#6a7a90', '#2e2a2a', k)}"/><stop offset=".6" stop-color="${mix('#c8b490', '#b8603a', k)}"/><stop offset="1" stop-color="${mix('#e8c890', '#f0903a', k)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF2)"/>`;
  s += `<path d="M-20,770 Q160,712 360,738 T740,716 L740,900 L-20,900Z" fill="${mix('#8a7a5a', '#5a4a3a', k)}"/>`;
  for (let i = 0; i < 22; i++) { const r = RS(i + 300); s += pine(-10 + i * 36 + r() * 16, 800 + r() * 16, 110 + r() * 60, i + 300, mix(mix(mix('#3e6a32', '#557a3a', r()), mix('#7a6a3a', '#8a7040', r()), dryF), '#3a3028', clamp(T - T0) * .3)); }
  s += `<rect y="860" width="720" height="420" fill="${mix('#8aa058', '#c8a860', dryF)}" filter="url(#reliefR)"/><rect y="860" width="720" height="420" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // ground fire: fixed spots that ignite one after another from the left, burn, then leave ash and embers
  const ox = -60, oy = 1020, spot = [];
  for (let i = 0; i < 110; i++) { const r = RS(i + 600), x = r() * 760 - 20, y = 870 + Math.pow(r(), 1.2) * 400, ig = T0 + Math.hypot(x - ox, (y - oy) * 1.6) * .0034 + r() * .25; spot.push([x, y, ig, r()]); }
  spot.forEach(([x, y, ig]) => { const b = T - ig, sc = .4 + (y - 860) / 420; if (b > 0) s += `<ellipse cx="${x}" cy="${y + 4}" rx="${(26 + 30 * Math.min(1, b)) * sc}" ry="${(7 + 6 * Math.min(1, b)) * sc}" fill="#1a1210" opacity="${Math.min(.85, b * 1.2)}"/>`; });
  for (let i = 0; i < 160; i++) { const r = RS(i + 400), x = r() * 740, y = 870 + Math.pow(r(), 1.3) * 400, h = 10 + (y - 860) * .05, burnt = spot.some(([sx, sy, ig]) => T > ig + .5 && Math.abs(sx - x) < 30 && Math.abs(sy - y) < 14); if (burnt) continue; s += `<path d="M${x},${y} l${-3 + r() * 6},${-h} M${x + 3},${y} l${2 + r() * 4},${-h * .8}" stroke="${mix(mix('#6a8a3a', '#b8984a', dryF), '#8a6a3a', r())}" stroke-width="1.6"/>`; }
  // nearer trees: each catches fire when the ground fire reaches it, burns in its crown, then chars
  const trees = []; for (let i = 0; i < 8; i++) { const r = RS(i + 500), x = 20 + i * 98 + r() * 30, y = 1000 + r() * 170; trees.push([x, y, 290 + r() * 120, i + 500, T0 + .3 + Math.hypot(x - ox, (y - oy) * 1.6) * .0034 + r() * .25]); }
  trees.sort((a, b) => a[1] - b[1]).forEach(([x, y, h, sd, ig]) => { const b = T - ig, ch = clamp(b / 1.6);
    s += pine(x, y, h, sd, mix(mix(mix('#3e6a2e', '#4e7a34', RS(sd)()), mix('#6a6a3a', '#8a6a3a', RS(sd)()), dryF), '#1e1612', ch));
    if (b > 0) { const grow = clamp(b / .7), rr = RS(sd + 900); for (let q = 0; q < 7; q++) { const u = .2 + rr() * .7, fx = x + (rr() - .5) * h * .28 * (1 - u), fy = y - h * u; s += flameT(fx, fy + h * .08, h * (.16 + .1 * rr()) * grow, t, sd + q, 1 - clamp((b - 2.6) / .8)); } } });
  spot.forEach(([x, y, ig], i) => { const b = T - ig, sc = .4 + (y - 860) / 420; if (b > 0 && b < 2.2) s += flameT(x, y, (55 + 55 * RS(i + 700)()) * sc * Math.min(1, b * 2.2) * (b > 1.5 ? (2.2 - b) / .7 : 1), t, i);
    else if (b >= 2.2) s += `<circle cx="${x}" cy="${y}" r="${2.5 * sc}" fill="#ff5a1a" opacity="${(.5 + .5 * Math.sin(t * 6 + i)).toFixed(2)}"/>`; });
  // smoke columns rise from the burning places and lean with the wind
  for (let i = 0; i < 18; i++) { const r = RS(i + 800), src = trees[i % trees.length], b = T - src[4]; if (b <= 0) continue; const ph = pmod(t * .22 + r(), 1), x = src[0] + ph * 160 + (r() - .5) * 40, y = src[1] - src[2] * .7 - ph * 520;
    s += `<circle cx="${x}" cy="${y}" r="${50 + ph * 150}" fill="${mix('#2a2422', '#7a6e68', ph)}" opacity="${(.7 * (1 - ph) * Math.min(1, b)).toFixed(2)}" filter="url(#smokeF)"/>`; }
  for (let i = 0; i < 40; i++) { const r = RS(i + 850), src = trees[i % trees.length], b = T - src[4]; if (b <= 0) continue; const ph = pmod(t * .7 + r(), 1); s += `<circle cx="${src[0] + (r() - .5) * 80 + ph * 90}" cy="${src[1] - src[2] * .5 - ph * 420}" r="${1.4 + r() * 2}" fill="#ffc04a" opacity="${(1 - ph).toFixed(2)}"/>`; }
  s += `<rect y="900" width="720" height="380" fill="#ff7a2a" opacity="${.12 * k}"/>`;
  F.ov = ''; return s;
}

// ---------- 11: dust storm – the people and cars actually move through the street ----------
function sceneDust(t) {
  const st = WS(7, 5) - .3, T = t - st, k = ease(ramp(t, WS(7, 5) - .4, WS(7, 7) + .3));
  let s = street(t, { id: 'du', sky: ['#a8602a', '#c8823a', '#d89a52'], dry: .6 });
  s += car(600 - T * 70, 1210, .9, '#c8c8cc', -1, 1) + car(110 + T * 55, 1260, .95, '#2a4a7a', 1, 1);
  s += person(190 + T * 46, 1040, { s: .5, face: 1, moving: 1, phase: t * 6, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, scarf: '#e8e2d4', t }) +
       person(520 - T * 42, 1046, { s: .52, face: -1, moving: 1, phase: t * 6 + 1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, scarf: '#4a4a52', t });
  s += `<rect x="-40" y="-40" width="800" height="1360" fill="#fff" filter="url(#dustR)" opacity="${.35 + .45 * k}"/><rect width="720" height="1280" fill="#c07a3a" opacity="${.3 + .25 * k}"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 900), y = r() * 1280, x = pmod(r() * 900 + t * (500 + r() * 300), 900) - 90; s += `<path d="M${x},${y} l-${30 + r() * 40},2" stroke="#f0c890" stroke-width="1.5" opacity=".45"/>`; }
  F.ov = ''; return s;
}

// ---------- 13: soil profiles under the same rain: a hard crust sheds the water, moist soil drinks it ----------
function sceneSoak(t) {
  const st = WS(8, 7) - .3, k = ease(ramp(t, st + .2, L(8).end + .1)), gy = 760;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skK2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a414c"/><stop offset="1" stop-color="#8a929c"/></linearGradient><linearGradient id="wetG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a10" stop-opacity=".75"/><stop offset=".85" stop-color="#2a1a10" stop-opacity=".55"/><stop offset="1" stop-color="#2a1a10" stop-opacity="0"/></linearGradient>` +
    `<clipPath id="cpL2"><rect x="0" y="0" width="358" height="1280"/></clipPath><clipPath id="cpR2"><rect x="362" y="0" width="358" height="1280"/></clipPath></defs><rect width="720" height="1280" fill="url(#skK2)"/>`;
  s += `<path d="M-20,${gy - 30} Q160,${gy - 60} 360,${gy - 40} T740,${gy - 50} L740,${gy} L-20,${gy}Z" fill="#5a5e5a" opacity=".6"/>`;
  // left: dry, compacted, cracked
  s += `<g clip-path="url(#cpL2)"><rect y="${gy}" width="360" height="520" fill="#c8a87a"/><rect y="${gy}" width="360" height="40" fill="#dcc29a"/><rect y="${gy}" width="360" height="520" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  for (let i = 0; i < 9; i++) { const r = RS(i + 30), x = 20 + i * 40 + r() * 10; s += `<path d="M${x},${gy} l${(r() - .5) * 10},${30 + r() * 30} l${(r() - .5) * 8},${30 + r() * 50}" stroke="#4a3020" stroke-width="${3 - r() * 1.5}" fill="none"/>`; }
  for (let i = 0; i < 14; i++) { const r = RS(i + 50), x = r() * 350; s += `<path d="M${x},${gy} l-4,-${8 + r() * 10} M${x + 3},${gy} l3,-${6 + r() * 8}" stroke="#a88a4a" stroke-width="1.4"/>`; }
  s += `<rect y="${gy}" width="360" height="${10 * k}" fill="url(#wetG)"/>`;
  { let d = `M-20,${gy}`; for (let x = -20; x <= 380; x += 20) d += ` L${x},${(gy - 10 * k - 2 * Math.sin(x * .08 + t * 6)).toFixed(1)}`; s += `<path d="${d} L380,${gy} Z" fill="#6a8aa8" opacity="${.85 * k}"/><path d="${d}" stroke="#cfe4f2" stroke-width="2" fill="none" opacity="${k}"/>`; }
  for (let i = 0; i < 6; i++) { const x = pmod(i * 70 - t * 140, 420) - 30; s += `<path d="M${x + 40},${gy - 30} l-40,0" stroke="#e8f4fa" stroke-width="4" marker-end="url(#arrW)" opacity="${k}"/>`; }
  s += `</g>`;
  // right: moist, crumbly, rooted; the wetting front sinks
  const wf = gy + 30 + 300 * k;
  s += `<g clip-path="url(#cpR2)"><rect x="360" y="${gy}" width="360" height="520" fill="#7a5436"/><rect x="360" y="${gy}" width="360" height="520" fill="#000" filter="url(#pebT)" opacity=".45"/>`;
  for (let i = 0; i < 12; i++) { const r = RS(i + 70), x = 380 + r() * 330; s += `<path d="M${x},${gy} q${(r() - .5) * 20},${30 + r() * 30} ${(r() - .5) * 30},${70 + r() * 80}" stroke="#e8d8b8" stroke-width="1.2" fill="none" opacity=".55"/>`; }
  for (let i = 0; i < 16; i++) { const r = RS(i + 90), x = 370 + r() * 340; s += `<path d="M${x},${gy} q-6,-14 -2,-26 M${x},${gy} q6,-12 4,-22" stroke="#4a8a32" stroke-width="2.4" fill="none"/>`; }
  let wd = `M360,${gy}`; for (let x = 360; x <= 740; x += 20) wd += ` L${x},${gy}`; let wb = ''; for (let x = 740; x >= 360; x -= 20) wb += ` L${x},${(wf + 18 * Math.sin(x * .05) + 10 * Math.sin(x * .13 + 1)).toFixed(1)}`;
  s += `<path d="${wd}${wb}Z" fill="url(#wetG)"/>`;
  for (let i = 0; i < 18; i++) { const r = RS(i + 110), ph = pmod(t * .8 + r(), 1), x = 380 + r() * 320, y = gy + 10 + ph * (wf - gy - 10); s += `<circle cx="${x}" cy="${y}" r="2.2" fill="#9ccaf0" opacity="${(k * (1 - ph)).toFixed(2)}"/>`; }
  for (let i = 0; i < 4; i++) s += `<path d="M${420 + i * 80},${gy + 14} l0,${50 + 150 * k}" stroke="#cfe4f2" stroke-width="5" marker-end="url(#arrW)" opacity="${k}"/>`;
  s += `</g><rect x="358" y="380" width="4" height="900" fill="#f4c76b"/>`;
  s += `<defs><clipPath id="cpTop2"><rect x="0" y="360" width="720" height="${gy - 360}"/></clipPath></defs><g clip-path="url(#cpTop2)">` + rain(t, 1, 110, 11, gy - 6, gy) + `</g>`;
  s += `<g font-family="Noto Naskh Arabic" font-weight="700" font-size="30" text-anchor="middle" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4"><text x="180" y="1196">تربة جافة صلبة</text><text x="540" y="1196">تربة رطبة</text>` +
    `<text x="180" y="1236" font-size="24" fill="#ffcf87">الماء يجري فوقها</text><text x="540" y="1236" font-size="24" fill="#bfe4ff">الماء يتسرّب داخلها</text></g>`;
  F.ov = ''; return s;
}
