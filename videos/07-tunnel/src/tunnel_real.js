// ===== realistic versions of shots 1, 2, 4–5 and the exit =====
const RS = s => { const r = R(s * 7919 + 13); r(); return r; };
const TEXDEFS = `<filter id="grassR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".04 .35" numOctaves="4" seed="6"/><feColorMatrix values="0 0 0 0 .14  0 0 0 0 .24  0 0 0 0 .06  0 0 0 -1.4 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="concR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".25" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .3  0 0 0 0 .3  0 0 0 -1.3 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="rockR" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .09" numOctaves="5" seed="14"/><feColorMatrix values="0 0 0 0 .06  0 0 0 0 .05  0 0 0 0 .04  0 0 0 -1.4 1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="magmaR" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".008 .012" numOctaves="5" seed="3"/><feColorMatrix values="0 0 0 0 .08  0 0 0 0 .02  0 0 0 0 0  0 0 0 -2.2 1.35"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="coreR" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="4" seed="9"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .85  0 0 0 0 .5  0 0 0 -1.6 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="heatR" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="turbulence" baseFrequency=".01 .04" numOctaves="2" seed="2"/><feDisplacementMap in="SourceGraphic" scale="14"/></filter>`;
// realistic concrete shaft collar with railings, safety stripes and lit rings descending into darkness
function shaftReal(cx, cy, rx, ry, t, night = 0) {
  let s = `<defs><radialGradient id="shR" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#000"/><stop offset=".45" stop-color="#030406"/><stop offset=".8" stop-color="#1e2226"/><stop offset="1" stop-color="#4a4e52"/></radialGradient>` +
    `<linearGradient id="collar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8b4ac"/><stop offset="1" stop-color="#6a6660"/></linearGradient></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy + 10}" rx="${rx * 1.32}" ry="${ry * 1.42}" fill="#000" opacity=".35" filter="url(#blur2)"/>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.28}" ry="${ry * 1.36}" fill="url(#collar)"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.28}" ry="${ry * 1.36}" fill="#fff" filter="url(#concR)" opacity=".5"/>`;
  for (let i = 0; i < 32; i++) { const a0 = i / 32 * 6.283, a1 = (i + .5) / 32 * 6.283, R1 = 1.2, R2 = 1.1;
    s += `<path d="M${cx + Math.cos(a0) * rx * R1},${cy + Math.sin(a0) * ry * R1 * 1.05} A${rx * R1},${ry * R1 * 1.05} 0 0 1 ${cx + Math.cos(a1) * rx * R1},${cy + Math.sin(a1) * ry * R1 * 1.05} L${cx + Math.cos(a1) * rx * R2},${cy + Math.sin(a1) * ry * R2 * 1.05} A${rx * R2},${ry * R2 * 1.05} 0 0 0 ${cx + Math.cos(a0) * rx * R2},${cy + Math.sin(a0) * ry * R2 * 1.05}Z" fill="#e8b818" opacity=".9"/>`; }
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shR)"/>`;
  // inner wall: lit rings with lamps, getting smaller and darker with depth
  for (let k = 1; k < 12; k++) { const u = Math.pow(.8, k), yy = cy + (1 - u) * ry * .32; s += `<ellipse cx="${cx}" cy="${yy}" rx="${rx * u}" ry="${ry * u}" fill="none" stroke="#7a8088" stroke-width="${2.6 * u + .4}" opacity="${.55 * u}"/>`;
    for (let j = 0; j < 10; j++) { const a = j / 10 * 6.283 + k * .3, lx = cx + Math.cos(a) * rx * u, ly = yy + Math.sin(a) * ry * u; if (Math.sin(a) < -.2) continue;
      s += `<circle cx="${lx}" cy="${ly}" r="${2.6 * u + .5}" fill="#cfeaff" opacity="${.95 * u}"/><circle cx="${lx}" cy="${ly}" r="${9 * u + 1}" fill="#bfe6ff" opacity="${.25 * u}" filter="url(#blur1)"/>`; } }
  // guard railing around the far half of the collar
  for (let i = 0; i <= 16; i++) { const a = Math.PI + i / 16 * Math.PI, px = cx + Math.cos(a) * rx * 1.34, py = cy + Math.sin(a) * ry * 1.44; s += `<line x1="${px}" y1="${py}" x2="${px}" y2="${py - 40}" stroke="#d8d4cc" stroke-width="3"/>`; }
  let rail = ''; for (let i = 0; i <= 32; i++) { const a = Math.PI + i / 32 * Math.PI; rail += (i ? ' L' : 'M') + `${cx + Math.cos(a) * rx * 1.34},${cy + Math.sin(a) * ry * 1.44 - 40}`; }
  s += `<path d="${rail}" stroke="#e8e4dc" stroke-width="4" fill="none"/><path d="${rail.replace(/,(\d+(\.\d+)?)/g, (m, y) => ',' + (Number(y) + 20))}" stroke="#c8c4bc" stroke-width="2.4" fill="none"/>`;
  return s;
}
function floodlight(x, y, h, on, flip = 1) {
  return `<g transform="translate(${x},${y})"><path d="M0,0 L-16,0 L-2,-${h} L2,-${h} L16,0Z" fill="#3a3e44"/><rect x="${-18 * flip}" y="${-h - 16}" width="36" height="20" rx="4" fill="#2a2e34" transform="rotate(${18 * flip},0,${-h})"/>` +
    `<circle cx="${4 * flip}" cy="${-h - 4}" r="${on ? 9 : 5}" fill="${on ? '#fffbe8' : '#8a8e94'}"/>` + (on ? `<polygon points="${4 * flip},${-h} ${flip * 260},${-h + 420} ${flip * 40},${-h + 460}" fill="#fff6d8" opacity=".1" filter="url(#blur2)"/><circle cx="${4 * flip}" cy="${-h - 4}" r="40" fill="#fff6d8" opacity=".35" filter="url(#blur2)"/>` : '') + `</g>`;
}
// shot 1: golden-hour grassland, a huge shaft; the person jumps in
function sceneHook(t) {
  const jump = W(0, 8)[1], jk = ease(ramp(t, jump - .1, jump + .7));
  let s = `<defs>${TEXDEFS}<linearGradient id="skH2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6aa8"/><stop offset=".5" stop-color="#9ab8d0"/><stop offset=".78" stop-color="#f0d0a0"/><stop offset="1" stop-color="#e8b880"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skH2)"/>`;
  s += `<circle cx="600" cy="560" r="300" fill="#fff0c8" opacity=".5" filter="url(#soft)"/>`;
  // soft stratus clouds
  s += `<g filter="url(#haze)" opacity=".8">` + Array.from({ length: 7 }, (_, i) => { const r = RS(i + 20), x = pmod(r() * 900 + t * 6, 900) - 90, y = 280 + r() * 220; return `<ellipse cx="${x}" cy="${y}" rx="${140 + r() * 120}" ry="${14 + r() * 14}" fill="#fff"/>`; }).join('') + `</g>`;
  // distant hills in haze
  s += `<path d="M-20,640 C100,600 200,620 300,598 C420,572 520,610 740,580 L740,700 L-20,700Z" fill="#7a96a8" opacity=".7"/><path d="M-20,680 C160,650 320,668 460,646 C580,630 660,650 740,640 L740,720 L-20,720Z" fill="#5a7a5a" opacity=".85"/>`;
  s += `<rect y="660" width="720" height="80" fill="#e8dcc0" opacity=".35" filter="url(#haze)"/>`;
  // field with texture and mown stripes
  s += `<path d="M-20,700 C200,690 500,700 740,688 L740,1300 L-20,1300Z" fill="#5a8a30"/><path d="M-20,700 C200,690 500,700 740,688 L740,1300 L-20,1300Z" fill="#fff" filter="url(#grassR)" opacity=".85"/>`;
  for (let k = 0; k < 9; k++) s += `<path d="M${-200 + k * 120},1300 L${300 + k * 16},700" stroke="#8ab040" stroke-width="${30 + k * 2}" opacity=".08"/>`;
  s += floodlight(110, 790, 170, 0, 1) + floodlight(620, 790, 170, 0, -1);
  s += shaftReal(360, 900, 230, 104, t);
  // the person: same character, at the rim, then a jump with arms up into the shaft
  const px = 360, py = lerp(800, 960, jk) - Math.sin(jk * Math.PI) * 90, sc = lerp(.62, .36, jk), op = 1 - ramp(t, jump + .45, jump + .8);
  s += `<ellipse cx="${px + 10}" cy="802" rx="${30 * (1 - jk)}" ry="6" fill="#000" opacity="${.3 * (1 - jk)}" filter="url(#blur2)"/>`;
  s += `<g opacity="${op}">` + person(px, py, { s: sc, face: 1, top: '#c8482a', pants: '#2a2e3a', skin: '#b07a55', hair: '#1d1612', moving: jk > 0 && jk < 1, phase: t * 6, amp: .5, phone: jk > .05 ? 1e-6 : 0, t }) + `</g>`;
  // grass blades in the foreground
  let gr = ''; const rg = RS(9); for (let i = 0; i < 140; i++) { const gx = rg() * 740 - 10, h = 26 + rg() * 60, sw = Math.sin(t * 1.4 + i) * 5; gr += `<path d="M${gx},1300 q${sw},-${h / 2} ${sw * 2 + 4},-${h}" stroke="${['#3a6a20', '#4a7a28', '#2e5a18'][i % 3]}" stroke-width="${2 + rg() * 2}" fill="none"/>`; }
  s += gr + `<rect width="720" height="1280" fill="#ffd8a0" opacity=".06"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// shot 2: the real Earth cut open: interior layers on the cut face, the tunnel through the centre
function sceneLine(t) {
  const st = S0(1) - .2, cut = ease(ramp(t, st + .2, st + 1.6)), k = ease(ramp(t, st + 1, st + 2.6));
  let s = space(t, '#02040c', '#0a0f2c');
  const ex = 360, ey = 720, er = 300;
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .3, rot: .3, tilt: 0 }; F.light = [-900, 200]; F.moon = null;
  // cut face drawn over the right half of the globe (ov layer, above the 3D Earth)
  const w = er * cut;
  let o = `<defs>${TEXDEFS}<clipPath id="cutC"><rect x="${ex}" y="${ey - er - 4}" width="${w + 4}" height="${2 * er + 8}"/></clipPath>` +
    `<radialGradient id="layG" gradientUnits="userSpaceOnUse" cx="${ex}" cy="${ey}" r="${er}"><stop offset="0" stop-color="#fffbe8"/><stop offset=".18" stop-color="#ffe08a"/><stop offset=".19" stop-color="#ffb040"/><stop offset=".53" stop-color="#e06a1a"/><stop offset=".55" stop-color="#c85a1e"/><stop offset=".965" stop-color="#7a2a10"/><stop offset=".97" stop-color="#6a5a48"/><stop offset="1" stop-color="#4a4034"/></radialGradient></defs>`;
  o += `<g clip-path="url(#cutC)"><circle cx="${ex}" cy="${ey}" r="${er}" fill="url(#layG)"/><g transform="translate(${-t * 6},0)"><rect x="${ex - 100}" y="${ey - er}" width="${er + 220}" height="${2 * er}" fill="#000" filter="url(#magmaR)" opacity=".55"/></g>` +
    `<circle cx="${ex}" cy="${ey}" r="${er * .19}" fill="#fff8e0" opacity=".85" filter="url(#blur2)"/><circle cx="${ex}" cy="${ey}" r="${er * .55}" fill="none" stroke="#3a1206" stroke-width="2" opacity=".5"/><circle cx="${ex}" cy="${ey}" r="${er * .97}" fill="none" stroke="#2a1a10" stroke-width="2" opacity=".6"/></g>`;
  o += `<line x1="${ex}" y1="${ey - er}" x2="${ex}" y2="${ey + er}" stroke="#000" stroke-width="5" opacity="${.6 * cut}"/>`;
  // tunnel line glowing through the centre
  o += `<line x1="${ex}" y1="${ey - er - 30}" x2="${ex}" y2="${ey - er - 30 + (2 * er + 60) * k}" stroke="#bfe6ff" stroke-width="5" stroke-dasharray="14 10" stroke-dashoffset="${-t * 40}"/><line x1="${ex}" y1="${ey - er - 30}" x2="${ex}" y2="${ey - er - 30 + (2 * er + 60) * k}" stroke="#bfe6ff" stroke-width="14" opacity=".25" filter="url(#blur2)"/>`;
  // layer labels
  const lab = (y, txt, a) => `<g opacity="${a}"><line x1="${ex + 6}" y1="${y}" x2="${ex + er + 30}" y2="${y}" stroke="#fff" stroke-width="1.6" opacity=".6"/><text x="${ex + er + 36}" y="${y + 7}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">${txt}</text></g>`;
  o += lab(ey - er * .985, 'القشرة', cut) + lab(ey - er * .75, 'الوشاح', cut) + lab(ey - er * .37, 'اللب الخارجي', cut) + lab(ey - er * .08, 'اللب الداخلي', cut);
  F.ov = o;
  return s;
}
// shots 4–5: falling through flowing, glowing mantle rock toward the white-hot metal core
function sceneLayers(t) {
  const st = S0(3) - .2, d = ease(ramp(t, st, S0(5) - .4)), core = ease(ramp(t, S0(4) - .3, S0(4) + .8));
  const temp = Math.round(d < .5 ? lerp(15, 3500, d * 2) : lerp(3500, 6000, (d - .5) * 2));
  let s = `<defs>${TEXDEFS}<linearGradient id="mnt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a22"/><stop offset=".08" stop-color="#6a2a12"/><stop offset=".4" stop-color="#d0501a"/><stop offset=".75" stop-color="#ff8a2a"/><stop offset="1" stop-color="#ffc060"/></linearGradient>` +
    `<radialGradient id="coreG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#fff4c8"/><stop offset=".85" stop-color="#ffd27a"/><stop offset="1" stop-color="#ffb040" stop-opacity="0"/></radialGradient></defs>`;
  // camera travels down a tall column of rock: crust strata -> mantle -> core
  const H = 5200, camY = lerp(0, H - 1280, d);
  s += `<g transform="translate(0,${-camY})"><rect width="720" height="${H}" fill="url(#mnt)"/>`;
  s += `<rect width="720" height="700" fill="#4a3e34"/><rect width="720" height="700" fill="#fff" filter="url(#rockR)" opacity=".85"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M-20,${60 + i * 70} ${Array.from({ length: 9 }, () => 'q45,-8 90,0').join(' ')}" stroke="#2a201a" stroke-width="3" fill="none" opacity=".4"/>`).join('');
  s += `<g filter="url(#heatR)"><g transform="translate(${Math.sin(t * .2) * 30},${-t * 8})"><rect x="-60" y="600" width="840" height="${H}" fill="#000" filter="url(#magmaR)" opacity=".7"/></g></g>`;
  // glowing fissures in the mantle
  const rf = RS(5); for (let i = 0; i < 26; i++) { let x = rf() * 720, y = 800 + rf() * (H - 1600), dd = `M${x},${y}`; for (let k = 0; k < 6; k++) { x += (rf() - .5) * 120; y += 20 + rf() * 60; dd += ` L${x},${y}`; }
    s += `<path d="${dd}" stroke="#ffe08a" stroke-width="${2 + rf() * 3}" fill="none" opacity=".55" filter="url(#blur1)"/>`; }
  // the core at the bottom
  const cy = H - 380; s += `<circle cx="360" cy="${cy}" r="520" fill="url(#coreG)"/><circle cx="360" cy="${cy}" r="300" fill="#fffbe8"/><circle cx="360" cy="${cy}" r="300" fill="#000" filter="url(#coreR)" opacity=".35"/>`;
  s += `<rect x="353" y="0" width="14" height="${H}" fill="#0a0806" opacity=".85"/><rect x="351" y="0" width="2" height="${H}" fill="#bfe6ff" opacity=".4"/><rect x="367" y="0" width="2" height="${H}" fill="#bfe6ff" opacity=".4"/></g>`;
  // the faller (fixed on screen while the world rushes up)
  const fy = 620; for (let k = 1; k < 8; k++) s += `<circle cx="360" cy="${fy - k * 14}" r="${9 - k}" fill="#bfe6ff" opacity="${.5 - k * .06}"/>`;
  s += `<circle cx="360" cy="${fy}" r="11" fill="#fff"/><circle cx="360" cy="${fy}" r="30" fill="#bfe6ff" opacity=".3" filter="url(#blur2)"/>`;
  s += `<rect width="720" height="1280" fill="#fff4d0" opacity="${.35 * core}"/>`;
  // sun comparison at the core
  if (core > 0) s += `<g opacity="${ease(ramp(t, WS(4, 11) - .2, WS(4, 11) + .4))}"><circle cx="600" cy="460" r="70" fill="url(#fireGlow)"/><circle cx="600" cy="460" r="36" fill="#fff4d0"/></g>`;
  F.ov = ''; F.temp = temp;
  return s;
}
// shot 12: the far side is at night: the person rises out of the lit shaft and stops right at the rim
function sceneRim(t) {
  const st = W(7, 9)[1] - .3, up = ease(ramp(t, st, W(7, 13)[1])), stop = ease(ramp(t, W(7, 12)[1], W(7, 13)[1]));
  let s = `<defs>${TEXDEFS}<linearGradient id="skN2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030a"/><stop offset=".7" stop-color="#0c1430"/><stop offset="1" stop-color="#1a2440"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skN2)"/>` + stars(1, t);
  s += `<g opacity=".5" transform="rotate(-28,360,420)"><ellipse cx="360" cy="420" rx="900" ry="90" fill="#7f8fd0" opacity=".2" filter="url(#haze)"/></g>`;
  s += `<path d="M-20,700 C160,670 320,690 460,668 C580,650 660,672 740,660 L740,760 L-20,760Z" fill="#0c1018"/>`;
  s += `<path d="M-20,740 C200,730 500,740 740,728 L740,1300 L-20,1300Z" fill="#1a2214"/><path d="M-20,740 C200,730 500,740 740,728 L740,1300 L-20,1300Z" fill="#fff" filter="url(#grassR)" opacity=".35"/>`;
  s += floodlight(110, 830, 170, 1, 1) + floodlight(620, 830, 170, 1, -1);
  s += `<ellipse cx="360" cy="920" rx="420" ry="200" fill="#fff6d8" opacity=".08" filter="url(#soft)"/>`;
  s += shaftReal(360, 920, 230, 104, t, 1);
  // the person rising from the shaft, lit from below by the shaft lamps
  const hy = lerp(1120, 930, up) + Math.sin(t * 3) * 2 * (1 - stop);
  s += `<defs><clipPath id="riseC"><path d="M0,0 L720,0 L720,920 L${360 + 230},920 A230,104 0 0 1 ${360 - 230},920 L0,920Z"/></clipPath></defs>`;
  s += `<g clip-path="url(#riseC)">` + person(360, hy + 150, { s: .78, face: 1, top: '#c8482a', pants: '#2a2e3a', skin: '#b07a55', hair: '#1d1612', lookUp: .25, t }) + `<ellipse cx="360" cy="${hy + 40}" rx="80" ry="140" fill="#bfe6ff" opacity=".12" filter="url(#soft)"/></g>`;
  // near part of the collar in front of the legs
  s += `<path d="M${360 - 230 * 1.28},920 A${230 * 1.28},${104 * 1.36} 0 0 0 ${360 + 230 * 1.28},920 L${360 + 230},920 A230,104 0 0 1 ${360 - 230},920Z" fill="#8a8680"/>` +
       `<path d="M${360 - 230 * 1.2},920 A${230 * 1.2},${104 * 1.26} 0 0 0 ${360 + 230 * 1.2},920" stroke="#e8b818" stroke-width="10" stroke-dasharray="26 22" fill="none"/>`;
  s += `<rect width="720" height="1280" fill="#0a1020" opacity=".15"/>`;
  s += speedDial(560, 400, 7.9 * (1 - up));
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
