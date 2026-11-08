// ===== Yellowstone realism pass: shots 1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14 =====
const DEF2 = () => `${RDEF}${RDEF2}${CFDEF}${CUDEF}`;
// --- the ash column: many billowing lumps, a shadow side away from the light and a darker, dirtier base; umbrella cloud; lightning
function ashColumn(x0, yg, H, W, t, k, seed, um = 0) {
  const r = RS(seed), cid = 'ac' + seed; let L = '';
  for (let i = 0; i < 120; i++) { const u = i / 119, a = r(), b = r(), c = r(); if (u > k) continue; const y = yg - H * u * (.93 + .07 * a), w = W * (.28 + .72 * Math.pow(u, .75)), cx = x0 + Math.sin(u * 7 + t * .45 + seed) * w * .1 + (b - .5) * w * .55, rr = w * (.2 + .18 * c) * (1 + .05 * Math.sin(t * 1.2 + i));
    L += `<circle cx="${cx.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}"/>`; }
  const uw = W * (1.4 + 3.4 * um), uy = yg - H;
  if (um > 0) for (let i = 0; i < 70; i++) { const a = r(), b = r(), c = r(), cx = x0 + (a - .5) * 2 * uw * (.35 + .65 * b), cy = uy + (b - .5) * H * .11 + Math.abs(cx - x0) / uw * H * .05, rr = W * (.26 + .26 * c) * (1 - .45 * Math.abs(cx - x0) / uw);
    L += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${Math.max(5, rr).toFixed(1)}"/>`; }
  const span = Math.max(W * 1.3, um > 0 ? uw : 0);
  let s = `<defs><clipPath id="${cid}">${L}</clipPath><linearGradient id="${cid}h" gradientUnits="userSpaceOnUse" x1="${x0 - span}" y1="0" x2="${x0 + span}" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".5" stop-color="#000" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".62"/></linearGradient>` +
    `<linearGradient id="${cid}v" gradientUnits="userSpaceOnUse" x1="0" y1="${yg}" x2="0" y2="${yg - H}"><stop offset="0" stop-color="#1e1612" stop-opacity=".75"/><stop offset=".4" stop-color="#2a2420" stop-opacity=".25"/><stop offset=".85" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".12"/></linearGradient></defs>`;
  s += `<g filter="url(#billow)"><g fill="url(#cfL)">${L}</g><g clip-path="url(#${cid})"><rect x="${x0 - span - 60}" y="${yg - H * 1.15}" width="${2 * span + 120}" height="${H * 1.2}" fill="url(#${cid}h)"/><rect x="${x0 - span - 60}" y="${yg - H * 1.15}" width="${2 * span + 120}" height="${H * 1.2}" fill="url(#${cid}v)"/><rect x="${x0 - span - 60}" y="${yg - H * 1.15}" width="${2 * span + 120}" height="${H * 1.2}" fill="#000" filter="url(#grainR)" opacity=".18"/></g></g>`;
  const fl = Math.floor(t * 3.1 + seed) % 5 === 0 && pmod(t * 3.1, 1) < .35;
  if (fl && k > .5) { const rl = RS(Math.floor(t * 3.1) + seed); let x = x0 + (rl() - .5) * W * .8, y = yg - H * (.35 + .4 * rl()), d = `M${x.toFixed(1)},${y.toFixed(1)}`; for (let q = 0; q < 6; q++) { x += (rl() - .5) * 40; y += 18 + rl() * 22; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } s += `<path d="${d}" stroke="#e8e0ff" stroke-width="3" fill="none"/><path d="${d}" stroke="#b8a0ff" stroke-width="9" fill="none" opacity=".35" filter="url(#blur2)"/>`; }
  return s;
}
// --- pyroclastic density currents: ground-hugging, billowing ash clouds racing outwards, glowing underneath
function pyroFlow(x0, yg, t, k, seed, span = 300) {
  const r = RS(seed); let L = '';
  for (let i = 0; i < (span < 250 ? 70 : 46); i++) { const a = r(), b = r(), sd = a > .5 ? 1 : -1, d = Math.pow(b, .8) * span * k, cx = x0 + sd * d, rr = (10 + 46 * (1 - b) + 8 * r()) * (.4 + .6 * k) * Math.min(1, span / 320); L += `<circle cx="${cx.toFixed(1)}" cy="${(yg - rr * .55).toFixed(1)}" r="${rr.toFixed(1)}"/>`; }
  return `<ellipse cx="${x0}" cy="${yg}" rx="${span * k + 40}" ry="${36 + 26 * k}" fill="url(#pfG)" opacity="${.75 * k}"/><g filter="url(#billow)"><g fill="url(#cfD)">${L}</g></g><ellipse cx="${x0}" cy="${yg - 20}" rx="${span * k * 1.05 + 30}" ry="${30 + 30 * k}" fill="#6a5a4e" opacity="${.35 * k}" filter="url(#soft)"/>`;
}
// --- a more lifelike bison: shaggy pale-brown cape over the hump, dark hindquarters, beard and curved horns
function bison(x, y, sc, face, t, ph) {
  const g = Math.sin(t * 1.1 + ph) * 2, r = RS(Math.round(x));
  let fur = ''; for (let i = 0; i < 26; i++) { const fx = 4 + r() * 40, fy = -66 + r() * 44; fur += `<path d="M${fx},${fy} q${2 + r() * 3},${5 + r() * 4} ${-1 + r() * 2},${9 + r() * 6}" stroke="${r() > .5 ? '#7a5634' : '#2a180c'}" stroke-width="1.6" fill="none" opacity=".8"/>`; }
  return `<g transform="translate(${x},${y}) scale(${sc * face},${sc})"><ellipse cx="2" cy="1" rx="52" ry="6" fill="#000" opacity=".3"/>` +
    [[-32, 0, '#24160c'], [-20, 1, '#2a1a0e'], [18, 1, '#2a1a0e'], [30, 0, '#24160c']].map(([lx, o, c]) => `<path d="M${lx - 5},-26 Q${lx - 4 + o},-12 ${lx - 3 + o},0 L${lx + 3 + o},0 Q${lx + 4},-12 ${lx + 6},-26Z" fill="${c}"/>`).join('') +
    `<path d="M-44,-26 Q-50,-48 -26,-52 Q-4,-56 10,-66 Q34,-74 46,-54 Q54,-36 48,-22 Q20,-14 -44,-26Z" fill="#3a2414"/><path d="M-44,-26 Q-50,-48 -26,-52 Q-10,-54 0,-58 L-4,-24Z" fill="#2a1a0e"/><path d="M6,-66 Q34,-76 46,-54 Q56,-32 46,-18 L18,-22 Q8,-44 6,-66Z" fill="#5a3a20"/>${fur}` +
    `<path d="M-40,-44 Q-14,-54 8,-64" stroke="#5a3a20" stroke-width="5" fill="none" opacity=".5"/><path d="M-44,-30 q-9,6 -7,18" stroke="#2a1a10" stroke-width="3" fill="none"/>` +
    `<g transform="translate(52,${-24 + g})"><path d="M-10,-14 Q2,-20 12,-10 Q16,4 6,14 Q-6,18 -12,6Z" fill="#24160a"/><path d="M-6,8 q4,16 12,4 q-4,10 -12,-4Z" fill="#2a1a0e"/><path d="M-6,-14 q-9,-6 -4,-14 M8,-14 q8,-8 3,-15" stroke="#d8d0c0" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="6" cy="-4" r="1.8" fill="#000"/><ellipse cx="11" cy="6" rx="3" ry="2" fill="#1a0e06"/></g></g>`;
}
// --- Grand Prismatic Spring: wobbly growth rings and micro-terraces, fine run-off channels, colour-tinted steam
function prismR(cx, cy, rx, ry, t, burst = 0) {
  let s = `<defs><radialGradient id="gpsG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#063a80"/><stop offset=".4" stop-color="#0c60ae"/><stop offset=".58" stop-color="#20a0c2"/><stop offset=".66" stop-color="#66b898"/><stop offset=".72" stop-color="#d4c64e"/><stop offset=".8" stop-color="#e8942a"/><stop offset=".9" stop-color="#c25c26"/><stop offset="1" stop-color="#9a4822"/></radialGradient><filter id="runF" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".03 .06" numOctaves="3" seed="5"/><feDisplacementMap in="SourceGraphic" scale="18" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx * 1.5}" ry="${ry * 1.5}" fill="#c88a50" opacity=".5" filter="url(#soft)"/>`;
  const r = RS(77); let ch = ''; for (let i = 0; i < 110; i++) { const a = r() * Math.PI * 2, r0 = .95, r1 = 1.15 + .45 * r(); ch += `<path d="M${(cx + Math.cos(a) * rx * r0).toFixed(1)},${(cy + Math.sin(a) * ry * r0).toFixed(1)} L${(cx + Math.cos(a + .03) * rx * r1).toFixed(1)},${(cy + Math.sin(a + .03) * ry * r1).toFixed(1)}" stroke="${['#b85a24', '#d8822a', '#8a4a22', '#e8a040', '#6a3a1a'][i % 5]}" stroke-width="${(1 + r() * 4).toFixed(1)}" opacity=".6"/>`; }
  s += `<g filter="url(#runF)">${ch}</g><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#gpsG)"/>`;
  for (let q = 0; q < 16; q++) { const f = .6 + q * .026; let d = ''; for (let k = 0; k <= 48; k++) { const a = k / 48 * Math.PI * 2, w = 1 + .012 * Math.sin(a * 9 + q * 1.7) + .008 * Math.sin(a * 23 + q); d += (k ? ' L' : 'M') + (cx + Math.cos(a) * rx * f * w).toFixed(1) + ',' + (cy + Math.sin(a) * ry * f * w).toFixed(1); } s += `<path d="${d}Z" fill="none" stroke="${q % 2 ? '#000' : '#fff'}" stroke-width=".9" opacity="${q % 2 ? .1 : .14}"/>`; }
  s += `<ellipse cx="${cx - rx * .1}" cy="${cy - ry * .15}" rx="${rx * .3}" ry="${ry * .18}" fill="#cfe8ff" opacity=".2"/>`;
  for (let i = 0; i < 16; i++) { const q = RS(i + 30), ph = pmod(t * (.12 + .05 * q()) + q(), 1), x = cx + (q() - .5) * rx * 1.4 + ph * 120, y = cy - ph * 330 * (1 + burst), tint = q() > .5 ? '#c8e4f4' : '#f4d0b0';
    s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(50 + ph * 150).toFixed(1)}" ry="${(18 + ph * 50).toFixed(1)}" fill="${mix(tint, '#ffffff', ph)}" opacity="${(.3 * (1 - ph) * (ph < .1 ? ph * 10 : 1) * (1 + burst)).toFixed(2)}" filter="url(#soft)"/>`; }
  return s;
}
// --- the park (shots 1 and 14)
function parkScene(t, o = {}) {
  const sky = o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'];
  let s = `<defs>${DEF2()}<linearGradient id="skY${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".65" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient><linearGradient id="basY${o.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b4a888"/><stop offset="1" stop-color="#ddd2bc"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skY${o.id})"/>`;
  s += `<circle cx="590" cy="420" r="150" fill="#fff4d8" opacity=".3" filter="url(#soft)"/>` + cumulus(170 + pmod(t * 4, 60), 410, 250, 1, { a: .95 }) + cumulus(560 + pmod(t * 3, 40), 480, 190, 2, { a: .9 });
  s += mountainsR(772, 280, 81, { rock: '#8e8a86', snowAt: .6, haze: .22, n0: 5 }) + mountainsR(815, 120, 82, { rock: '#5e6a52', haze: .1, n0: 8 });
  s += `<rect x="-20" y="812" width="760" height="110" fill="#1e3020"/>`;
  s += forestR(824, 46, 34, 60, 3, '#2e4a32', { haze: .32 }) + forestR(862, 38, 56, 96, 4, '#2a4428', { haze: .14 }) + forestR(905, 30, 92, 150, 5, '#24401f');
  const bp = `M-20,912 Q200,900 360,906 T740,902 L740,1290 L-20,1290Z`;
  s += `<path d="${bp}" fill="url(#basY${o.id})"/><path d="${bp}" fill="#000" filter="url(#pebT)" opacity=".3"/><path d="${bp}" fill="#fff" filter="url(#stainD)" opacity=".22"/><path d="${bp}" fill="#c8783a" filter="url(#cropT)" opacity=".22"/>`;
  for (let i = 0; i < 7; i++) { const r = RS(i + 210), vx = r() * 720, vy = 930 + r() * 60; for (let q = 0; q < 3; q++) { const ph = pmod(t * .25 + q / 3 + r(), 1); s += `<ellipse cx="${(vx + ph * 40).toFixed(1)}" cy="${(vy - ph * 90).toFixed(1)}" rx="${(10 + ph * 34).toFixed(1)}" ry="${(6 + ph * 14).toFixed(1)}" fill="#fff" opacity="${(.35 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; } }
  s += geyser(130, 938, 240, t, o.geyser ?? 1) + prismR(410, 1078, 255, 80, t, o.burst || 0);
  s += bison(600, 960, .7, -1, t, 0) + bison(665, 982, .8, -1, t, 2) + bison(250, 966, .6, 1, t, 4);
  // boardwalk in perspective
  const bw = (u, side) => [-20 + u * 340, 1236 - u * 66 + side * (20 - u * 8)];
  let planks = ''; for (let q = 0; q < 26; q++) { const u = q / 25, a = bw(u, -1), b = bw(u, 1); planks += `<path d="M${PT(a)} L${PT(b)}" stroke="#6a4c32" stroke-width="${2.2 - u}"/>`; }
  s += `<path d="M${PT(bw(0, -1))} L${PT(bw(1, -1))} L${PT(bw(1, 1))} L${PT(bw(0, 1))}Z" fill="#9a7650"/>${planks}<path d="M${PT(bw(0, -1))} L${PT(bw(1, -1))}" stroke="#4a3220" stroke-width="2"/>` + Array.from({ length: 9 }, (_, q) => { const p = bw(q / 8, 1); return `<path d="M${PT(p)} v${-22 + q * 1.6}" stroke="#4a3220" stroke-width="${3 - q * .2}"/>`; }).join('') + `<path d="M${PT([bw(0, 1)[0], bw(0, 1)[1] - 22])} L${PT([bw(1, 1)[0], bw(1, 1)[1] - 9])}" stroke="#4a3220" stroke-width="2.5"/>`;
  s += onWalk(70 + pmod(t * 9, 90), 1214 - pmod(t * 9, 90) * .19, CROWD[0], .32, 1, t, { moving: 1, phase: t * 5 }) + onWalk(230, 1188, CROWD[3], .29, -1, t, { lookUp: .2 });
  return s;
}
// --- the crust in section (shots 2 and 13): volcanic layers on top, crystalline crust below, a crystal-mush reservoir with melt between the crystals
function crossSection(t, o = {}) {
  const Y0 = 470, kmY = d => Y0 + d * 25, solid = o.solid || 0;
  let s = `<defs>${DEF2()}<linearGradient id="crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a6a58"/><stop offset=".35" stop-color="#5a4c42"/><stop offset="1" stop-color="#2a2220"/></linearGradient><radialGradient id="melt" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="${mix('#ffc050', '#c88a50', solid)}"/><stop offset=".6" stop-color="${mix('#f0601a', '#8a5a40', solid)}"/><stop offset="1" stop-color="${mix('#a01e0a', '#4a3a32', solid)}"/></radialGradient><radialGradient id="basG" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#d83a1a"/><stop offset="1" stop-color="#5a0a0a"/></radialGradient><linearGradient id="skX" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e72b8"/><stop offset="1" stop-color="#c8dcec"/></linearGradient></defs>`;
  s += `<rect width="720" height="${Y0}" fill="url(#skX)"/>` + cumulus(560, 330, 200, 3, { a: .9 });
  s += mountainsR(Y0 - 6, 150, 81, { rock: '#8e8a86', snowAt: .55, haze: .15, n0: 5 }) + `<rect x="-20" y="${Y0 - 30}" width="760" height="30" fill="#1e3020"/>` + forestR(Y0 - 2, 52, 22, 40, 6, '#2a4428');
  s += `<rect y="${Y0}" width="720" height="${1290 - Y0}" fill="url(#crust)"/>`;
  // volcanic tuffs and lava flows near the surface, each layer with its own texture
  const lay = ['#b8a080', '#8a7a62', '#a89070', '#6a5a48', '#9a8466', '#5e5040'], r = RS(31);
  let yA = Y0; for (let q = 0; q < 6; q++) { const th = 10 + q * 5, yB = yA + th; let top = `M-20,${yA}`, bot = ''; for (let x = -20; x <= 740; x += 40) { top += ` L${x},${(yA + Math.sin(x * .012 + q) * 3).toFixed(1)}`; } for (let x = 740; x >= -20; x -= 40) bot += ` L${x},${(yB + Math.sin(x * .014 + q * 2) * 4).toFixed(1)}`; s += `<path d="${top}${bot}Z" fill="${lay[q]}"/>`; yA = yB; }
  s += `<rect y="${Y0}" width="720" height="${yA - Y0}" fill="#fff" filter="url(#reliefR)" opacity=".25"/>`;
  s += `<rect y="${yA}" width="720" height="${1290 - yA}" fill="#000" filter="url(#pebT)" opacity=".45"/><rect y="${yA}" width="720" height="${1290 - yA}" fill="#d8c8b0" filter="url(#grainR)" opacity=".25"/>`;
  [[90, 240], [610, 520]].forEach(([fx, fy]) => { s += `<path d="M${fx},${Y0} L${fx + 60},${Y0 + fy}" stroke="#1a1410" stroke-width="2.5" opacity=".7"/>`; });
  // deep basalt reservoir
  const deep = `M20,1290 C40,${kmY(24)} 200,${kmY(20)} 360,${kmY(20.5)} C540,${kmY(19.6)} 700,${kmY(24)} 720,1290Z`;
  s += `<path d="${deep}" fill="url(#basG)" opacity=".85"/><path d="${deep}" fill="#000" filter="url(#pebT)" opacity=".35"/>` + lbl(360, kmY(26), 'خزّان أعمق', .8, '#ffd0a0', 22);
  for (let q = 0; q < 5; q++) { const x = 200 + q * 80; s += `<path d="M${x},${kmY(20.2)} q${q % 2 ? 12 : -12},-50 ${q % 2 ? -4 : 4},${-(kmY(20.2) - kmY(16.6))}" stroke="#ff6a1a" stroke-width="${4 - solid * 1.5}" fill="none" opacity="${.75 * (1 - solid * .5)}"/>`; }
  // the upper reservoir: melt (glowing) with crystals packed in; when "solid", the crystals dominate
  const lens = `M70,${kmY(11)} C80,${kmY(5.5)} 220,${kmY(4.6)} 360,${kmY(5)} C520,${kmY(4.4)} 650,${kmY(6)} 660,${kmY(11)} C650,${kmY(16)} 520,${kmY(17.4)} 360,${kmY(17)} C200,${kmY(17.6)} 80,${kmY(16)} 70,${kmY(11)}Z`;
  s += `<path d="${lens}" fill="#ff5a1a" opacity="${.4 * (1 - solid)}" filter="url(#soft)"/><path d="${lens}" fill="url(#melt)"/>`;
  const rc = RS(5); let cr = ''; const nC = 420 + Math.round(260 * solid);
  for (let i = 0; i < nC; i++) { const x = 80 + rc() * 570, y = kmY(5.2 + rc() * 11.6), a = rc() * 180, w = 5 + rc() * 13, h = w * (.35 + .4 * rc()), c = ['#ece4d8', '#b8b0a4', '#5a524a', '#8a8278', '#2e2a26'][Math.floor(rc() * 5)], vis = i < 420 ? .5 + .45 * solid : solid;
    cr += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a.toFixed(0)})" opacity="${vis.toFixed(2)}"><path d="M${-w / 2},0 L${-w / 2 + h * .5},${-h / 2} L${w / 2 - h * .5},${-h / 2} L${w / 2},0 L${w / 2 - h * .5},${h / 2} L${-w / 2 + h * .5},${h / 2}Z" fill="${c}"/><path d="M${-w / 2},0 L${-w / 2 + h * .5},${-h / 2} L${w / 2 - h * .5},${-h / 2} L${w / 2},0Z" fill="#fff" opacity=".22"/></g>`; }
  s += `<defs><clipPath id="lensC"><path d="${lens}"/></clipPath></defs><g clip-path="url(#lensC)">${cr}` + Array.from({ length: 16 }, (_, i) => { const q = RS(i + 400), x = 110 + q() * 500, y = kmY(6 + q() * 10); return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(10 + q() * 26).toFixed(1)}" ry="${(5 + q() * 9).toFixed(1)}" fill="#ffc050" opacity="${((.5 + .25 * Math.sin(t * 2 + i)) * (1 - solid * .7)).toFixed(2)}" filter="url(#blur2)"/>`; }).join('') + `<path d="${lens}" fill="#000" filter="url(#grainR)" opacity=".3"/></g>`;
  s += `<path d="${lens}" fill="none" stroke="${mix('#ffd080', '#8a7a6a', solid)}" stroke-width="2" opacity=".6"/>`;
  // hot groundwater rising to the surface features
  [[150, 4], [400, 5], [560, 4.4]].forEach(([x, d]) => { s += `<path d="M${x},${kmY(d)} q-14,-${(kmY(d) - Y0) * .4} 6,-${(kmY(d) - Y0) * .7} t-4,-${(kmY(d) - Y0) * .3}" stroke="#7ac8f0" stroke-width="3" fill="none" stroke-dasharray="10 8" stroke-dashoffset="${-t * 40}" opacity=".75"/>`; });
  s += geyser(150, Y0 + 2, 110, t, 1) + `<ellipse cx="400" cy="${Y0 + 2}" rx="60" ry="8" fill="#22a2c4"/><ellipse cx="400" cy="${Y0 + 2}" rx="70" ry="11" fill="none" stroke="#e8962a" stroke-width="5"/>`;
  s += `<path d="M30,${Y0} L30,${kmY(30)}" stroke="#fff" stroke-width="2" opacity=".7"/>` + [0, 5, 17, 30].map(d => `<path d="M24,${kmY(d)} h14" stroke="#fff" stroke-width="2"/>` + lbl(46, kmY(d) + 8, `${AR(d)} كم`, .9, '#fff', 20, 'start')).join('');
  return s;
}
// --- shot 3 + 4: the eruption 640,000 years ago from a ring-fracture vent in a volcanic plateau, then the scale beside Everest
function sceneLava(t) {
  const st = S0(2) - .2, kc = ease(ramp(t, WS(2, 6) - .3, WS(2, 6) + .3)), boom = ease(ramp(t, st, st + 2.2)), hk = ease(ramp(t, WS(2, 8) - .2, WS(2, 10) + .3)), cmp = ramp(t, WS(2, 12) - .2, WS(2, 12) + .3);
  let s = `<defs>${DEF2()}<linearGradient id="skL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a38"/><stop offset=".6" stop-color="#6a4e44"/><stop offset="1" stop-color="#c8865a"/></linearGradient></defs>`;
  if (kc < 1) { let a = `<rect width="720" height="1280" fill="url(#skL)"/>` + mountainsR(860, 200, 93, { rock: '#5a4e48', haze: .3, hazeCol: '#7a5a4a', n0: 5 });
    a += ashColumn(360, 905, 560, 130, t, boom, 7, ease(ramp(t, st + 1.2, st + 3.5)));
    a += mountainsR(915, 70, 94, { rock: '#4a3e36', n0: 10, shadeA: .55 }) + `<path d="M120,912 Q240,898 360,904 T600,910" stroke="#ff8a2a" stroke-width="6" fill="none" opacity="${.8 * boom}" filter="url(#blur2)"/>`;
    a += meadow(915, 1290, t, { c0: '#8a7a50', c1: '#4e4430', patch: '#6a5a3a', seed: 7, n: 260 }) + `<rect y="915" width="720" height="375" fill="#ff7a2a" opacity="${.14 * boom}"/>`;
    a += pyroFlow(360, 935, t, boom, 3, 380);
    s += `<g opacity="${1 - kc}">${a}</g>`; }
  if (kc > 0) { const yb = 1110, px = 30, sz = 10 * px, ev = 8.85 * px, ex = 585, ey = yb - ev;
    let b = `<defs><linearGradient id="skH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e4a90"/><stop offset=".7" stop-color="#7aa8d8"/><stop offset="1" stop-color="#d8e4ee"/></linearGradient><linearGradient id="cubeF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8278"/><stop offset="1" stop-color="#4a443e"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skH)"/>` + cumulus(150, 560, 200, 6, { a: .7 });
    b += mountainsR(980, 170, 121, { rock: '#8a8a90', snowAt: .5, haze: .35, n0: 6 });
    const evP = profileP([[390, yb + 30], [440, yb - ev * .45], [500, yb - ev * .66], [545, yb - ev * .85], [ex, ey], [622, ey + 22], [670, yb - ev * .75], [720, yb - ev * .6], [780, yb - ev * .3], [800, yb + 30]], 5, .05);
    b += mountainsR(yb, ev, 125, { points: evP, rock: '#7a7472', snowAt: .38, n0: 5, el: 30, shadeA: .5 });
    b += `<path d="M-20,${yb - 8} Q200,${yb - 20} 360,${yb - 6} T740,${yb - 14} L740,1290 L-20,1290Z" fill="#8a8680"/><path d="M-20,${yb - 8} Q200,${yb - 20} 360,${yb - 6} T740,${yb - 14} L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".5"/><path d="M-20,${yb - 8} Q200,${yb - 20} 360,${yb - 6} T740,${yb - 14} L740,1290 L-20,1290Z" fill="#fff" filter="url(#stainD)" opacity=".5"/>`;
    // the 10-km block of ash and rock with its shadow
    const x = 24, h = sz * hk, dx = sz * .3, dy = sz * .2;
    b += `<path d="M${x + sz},${yb} L${x + sz + h * .55},${yb + 28} L${x + h * .2},${yb + 28}Z" fill="#000" opacity="${.35 * hk}"/>`;
    b += `<path d="M${x},${yb} L${x + sz},${yb} L${x + sz},${yb - h} L${x},${yb - h}Z" fill="url(#cubeF)"/><path d="M${x},${yb} L${x + sz},${yb} L${x + sz},${yb - h} L${x},${yb - h}Z" fill="#9a9288" filter="url(#reliefR)" opacity=".6"/>` +
      `<path d="M${x + sz},${yb} L${x + sz + dx},${yb - dy} L${x + sz + dx},${yb - dy - h} L${x + sz},${yb - h}Z" fill="#3a3530"/><path d="M${x + sz},${yb} L${x + sz + dx},${yb - dy} L${x + sz + dx},${yb - dy - h} L${x + sz},${yb - h}Z" fill="#6a625a" filter="url(#reliefR)" opacity=".5"/>` +
      `<path d="M${x},${yb - h} L${x + sz},${yb - h} L${x + sz + dx},${yb - h - dy} L${x + dx},${yb - h - dy}Z" fill="#a8a096"/><path d="M${x},${yb - h} L${x + sz},${yb - h} L${x + sz + dx},${yb - h - dy}" stroke="#e0dad0" stroke-width="2" fill="none" opacity=".7"/>`;
    b += lbl(x + sz / 2, yb - h / 2 + 14, `${AR(1000)} كم³`, hk, '#fff', 44) + lbl(x + sz / 2, yb + 48, `${AR(10)} كم`, hk, '#fff', 24) + `<path d="M${x},${yb + 18} h${sz}" stroke="#fff" stroke-width="2" opacity="${hk}"/>`;
    // the comparison: Everest's summit line against the block
    b += `<g opacity="${cmp}"><path d="M${x + sz + dx},${ey} L${ex},${ey}" stroke="#fff" stroke-width="2.5" stroke-dasharray="8 6"/><path d="M${x + sz + 18},${yb - sz} L${x + sz + 18},${ey}" stroke="#f4c76b" stroke-width="4"/><path d="M${x + sz + 10},${yb - sz} h16 M${x + sz + 10},${ey} h16" stroke="#f4c76b" stroke-width="3"/>` +
      lbl(ex + 20, ey - 26, 'قمة إيفرست ٨٫٨ كم', 1, '#fff', 24) + lbl(x + sz / 2 + dx / 2, yb - sz - dy - 26, 'أعلى من إيفرست بنحو ١٫٢ كم', 1, '#f4c76b', 28) + `</g>`;
    s += `<g opacity="${kc}">${b}</g>`; }
  F.ov = ''; return s;
}
// --- shot 5: seen from a highway ~100 km away; the column rises from behind forested volcanic ridges; the car is pulled onto the shoulder with hazards on
function sceneErupt(t) {
  const b = WS(3, 1), k = ease(ramp(t, b, b + 3.4)), um = ease(ramp(t, b + 2.6, b + 7)), dk = ease(ramp(t, b + 1.5, b + 7)), kmPx = 18, yg = 900;
  let s = `<defs>${DEF2()}<linearGradient id="skE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#3e6eb8', '#3a3430', dk)}"/><stop offset=".7" stop-color="${mix('#96bce0', '#7a6a5a', dk)}"/><stop offset="1" stop-color="${mix('#e8e0cc', '#c89a6a', dk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skE)"/>`;
  s += cumulus(600, 560, 200, 9, { a: .8 * (1 - dk) });
  s += ashColumn(330, yg, 32 * kmPx, 115, t, k, 11, um);
  s += mountainsR(yg + 12, 150, 92, { rock: mix('#8a8680', '#6a625a', dk), snowAt: .55, haze: .18, hazeCol: mix('#9ab0c8', '#8a7a6a', dk), n0: 6 });
  s += pyroFlow(330, yg + 4, t, ease(ramp(t, b + 1, b + 5)), 5, 330);
  s += `<rect x="-20" y="${yg + 4}" width="760" height="110" fill="${mix('#1e3020', '#2a2a24', dk)}"/>` + forestR(yg + 18, 46, 36, 60, 8, mix('#2e4a32', '#3a3a32', dk), { haze: .25 }) + forestR(yg + 60, 34, 60, 100, 9, mix('#2a4428', '#323228', dk), { haze: .1 }) + forestR(yg + 105, 26, 90, 140, 10, mix('#24401f', '#2a2a22', dk));
  s += meadow(yg + 108, 1290, t, { c0: mix('#8a9a50', '#7a7660', dk), c1: mix('#5a6a32', '#4a4a3a', dk), seed: 12, n: 300 });
  // the highway in perspective: asphalt texture, gravel shoulders, edge lines, centre dashes
  const vx = 360, vy = yg + 112, R = (y, e) => vx + (y - vy) / (1290 - vy) * e;
  s += `<path d="M${R(1290, -260)},1290 L${vx - 6},${vy} L${vx + 6},${vy} L${R(1290, 260)},1290Z" fill="#9a8e7a"/><path d="M${R(1290, -260)},1290 L${vx - 6},${vy} L${vx + 6},${vy} L${R(1290, 260)},1290Z" fill="#000" filter="url(#pebT)" opacity=".5"/>`;
  s += `<path d="M${R(1290, -200)},1290 L${vx - 4},${vy} L${vx + 4},${vy} L${R(1290, 200)},1290Z" fill="#3a3a3e"/><path d="M${R(1290, -200)},1290 L${vx - 4},${vy} L${vx + 4},${vy} L${R(1290, 200)},1290Z" fill="#000" filter="url(#grainR)" opacity=".6"/>`;
  s += `<path d="M${R(1290, -186)},1290 L${vx - 3},${vy}" stroke="#e8e4d8" stroke-width="3"/><path d="M${R(1290, 186)},1290 L${vx + 3},${vy}" stroke="#e8e4d8" stroke-width="3"/>`;
  for (let q = 0; q < 9; q++) { const u0 = Math.pow(q / 9, 1.8), u1 = Math.pow((q + .45) / 9, 1.8), y0 = vy + u0 * (1290 - vy), y1 = vy + u1 * (1290 - vy); s += `<path d="M${vx},${y0} L${vx},${y1}" stroke="#e8c84a" stroke-width="${1 + 6 * u1}"/>`; }
  const hz = Math.floor(t * 2.4) % 2 === 0;
  s += car(612, 1196, .72, '#c8c8cc', -1, 0) + (hz ? `<circle cx="${612 - 86 * .72}" cy="${1196 - 46 * .72}" r="7" fill="#ffb020"/><circle cx="${612 - 86 * .72}" cy="${1196 - 46 * .72}" r="18" fill="#ffb020" opacity=".35" filter="url(#blur2)"/><circle cx="${612 + 84 * .72}" cy="${1196 - 44 * .72}" r="6" fill="#ffb020"/>` : '');
  s += onWalk(548, 1252, CROWD[1], .62, -1, t, { lookUp: .7 });
  const al = ramp(t, b + 1.6, b + 2.2), ya = km => yg - km * kmPx;
  s += `<g opacity="${al}"><path d="M690,${yg} L690,${ya(34)}" stroke="#fff" stroke-width="2"/>` + [10, 20, 30].map(km => `<path d="M682,${ya(km)} h16" stroke="#fff" stroke-width="2"/>` + lbl(676, ya(km) + 8, `${AR(km)} كم`, 1, '#fff', 20, 'end')).join('') +
    `<g transform="translate(${560 + Math.sin(t * .3) * 10},${ya(10)}) scale(.28)">${airliner()}</g>` + lbl(560, ya(10) + 46, 'الطائرات', ramp(t, WS(3, 12) - .2, WS(3, 12) + .2), '#f4c76b', 22) + `</g>`;
  F.ov = ''; F.flash = t > b && t < b + .5 ? .5 * (1 - (t - b) / .5) : 0; return s;
}
// --- shots 7 + 8: a microscope view of volcanic glass shards, then a real airport under ash: terminal glass facade, jet bridge, tower, apron markings, a baggage tug, the grounded airliner, crops beyond the perimeter fence
function sceneGlass(t) {
  const ins = 1 - ease(ramp(t, WS(5, 3) - .4, WS(5, 3) + .1)), brd = ramp(t, WS(5, 3), WS(5, 3) + .3), crp = ramp(t, WS(5, 5) - .2, WS(5, 5) + .3);
  let s = `<defs>${DEF2()}<linearGradient id="skG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e5a54"/><stop offset="1" stop-color="#b0a898"/></linearGradient><linearGradient id="glassT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6a7a"/><stop offset="1" stop-color="#2a3440"/></linearGradient><radialGradient id="micB" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#f4f2ea"/><stop offset="1" stop-color="#c8c4b8"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skG)"/>`;
  s += `<path d="M-20,700 L80,690 L140,700 L220,680 L320,695 L420,676 L520,692 L620,682 L740,696 L740,720 L-20,720Z" fill="#7a766e" opacity=".6"/>`;
  // terminal: roof canopy, glass curtain wall with mullions and reflections, gates
  s += `<path d="M-20,706 L740,690 L740,712 L-20,728Z" fill="#c8c4bc"/><rect x="-20" y="722" width="760" height="140" fill="url(#glassT)"/>` + Array.from({ length: 30 }, (_, q) => `<path d="M${-20 + q * 26},722 v140" stroke="#8a929a" stroke-width="2.4"/>`).join('') + `<path d="M-20,770 H740 M-20,818 H740" stroke="#8a929a" stroke-width="2"/>` +
    `<path d="M40,722 L120,862 M260,722 L340,862 M480,722 L560,862" stroke="#fff" stroke-width="18" opacity=".06"/><rect x="-20" y="856" width="760" height="10" fill="#6a6a6e"/>` + lbl(160, 760, 'البوابة ١٢', .8, '#fff', 18);
  // control tower
  s += `<path d="M600,700 L604,450 L630,450 L634,700Z" fill="#a8a8ac"/><path d="M604,450 L630,450 L634,700 L620,700Z" fill="#000" opacity=".15"/><path d="M584,450 L650,450 L644,412 L590,412Z" fill="#2a3a4a"/><path d="M584,450 L650,450 L644,412 L590,412Z" fill="#fff" opacity=".1"/><rect x="580" y="404" width="74" height="10" fill="#c8c4bc"/><rect x="580" y="450" width="74" height="10" fill="#c8c4bc"/><path d="M617,404 v-30 M607,384 h20" stroke="#6a6a6e" stroke-width="2.5"/>`;
  // apron: concrete slabs, ash cover, lead-in line and tyre tracks
  s += `<rect y="862" width="720" height="430" fill="#9a968e"/><rect y="862" width="720" height="430" fill="#000" filter="url(#grainR)" opacity=".28"/>` + Array.from({ length: 7 }, (_, q) => `<path d="M${-60 + q * 140},862 L${-300 + q * 200},1290" stroke="#7a766e" stroke-width="1.5"/>`).join('') + [900, 960, 1050, 1180].map(y => `<path d="M-20,${y} H740" stroke="#7a766e" stroke-width="1.5"/>`).join('') +
    `<path d="M560,862 Q470,930 400,1010" stroke="#c8a838" stroke-width="5" fill="none" opacity=".45"/><rect y="862" width="720" height="430" fill="#c8c2b6" filter="url(#stainD)" opacity=".45"/><path d="M60,1290 Q200,1100 330,1000 M110,1290 Q240,1110 360,1006" stroke="#6a665e" stroke-width="7" fill="none" opacity=".35"/>`;
  // jet bridge to the front door
  s += `<path d="M590,800 L470,925 L470,955 L600,830Z" fill="#b8b8bc"/><path d="M590,800 L470,925 L470,935 L594,808Z" fill="#fff" opacity=".35"/>` + Array.from({ length: 6 }, (_, q) => `<rect x="${575 - q * 18}" y="${822 + q * 19}" width="9" height="11" fill="#2a3440" transform="skewY(-46)" opacity="0"/>`).join('') + `<path d="M520,890 L520,990" stroke="#6a6a6e" stroke-width="7"/><rect x="505" y="985" width="30" height="12" fill="#3a3a3e"/><circle cx="511" cy="1000" r="6" fill="#1a1a1a"/><circle cx="530" cy="1000" r="6" fill="#1a1a1a"/><rect x="575" y="790" width="40" height="60" fill="#a0a0a4"/>`;
  // the grounded airliner, ash on its upper surfaces, engine covers on
  s += `<g transform="translate(300,962) scale(1.12)"><path d="M140,14 L140,40 M-30,14 L-30,40 M-50,14 L-50,40" stroke="#5a5a60" stroke-width="4"/><circle cx="140" cy="44" r="6" fill="#1a1a1a"/><circle cx="-30" cy="44" r="8" fill="#1a1a1a"/><circle cx="-50" cy="44" r="8" fill="#1a1a1a"/><ellipse cx="0" cy="52" rx="220" ry="8" fill="#000" opacity=".3"/>${airliner()}` +
    `<path d="M-196,-19 L-150,-26 L150,-26 C168,-26 180,-20 186,-12" stroke="#cfcac0" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M44,6 L-44,10 L-114,64" stroke="#cfcac0" stroke-width="4" fill="none"/><path d="M-200,-104 L-178,-104" stroke="#cfcac0" stroke-width="4"/><ellipse cx="40" cy="31" rx="6" ry="11.5" fill="#c62828"/></g>`;
  // baggage tug with carts
  s += `<g transform="translate(70,1110)"><rect x="0" y="-34" width="60" height="30" rx="4" fill="#e8c020"/><rect x="34" y="-56" width="24" height="24" rx="3" fill="#2a3440"/><circle cx="12" cy="-2" r="9" fill="#1a1a1a"/><circle cx="48" cy="-2" r="9" fill="#1a1a1a"/>` + [0, 1, 2].map(q => `<g transform="translate(${-70 - q * 76},0)"><rect x="0" y="-42" width="62" height="36" fill="#6a7a8a"/><rect x="4" y="-38" width="54" height="26" fill="#3a4a5a"/><rect x="8" y="-34" width="20" height="16" fill="#8a5a3a"/><rect x="32" y="-30" width="22" height="14" fill="#2a4a6a"/><circle cx="10" cy="-2" r="7" fill="#1a1a1a"/><circle cx="52" cy="-2" r="7" fill="#1a1a1a"/><path d="M0,-44 h62" stroke="#cfcac0" stroke-width="3"/></g>`).join('') + `</g>`;
  // departures board
  s += `<g opacity="${brd}" transform="translate(30,380)"><rect width="330" height="250" rx="10" fill="#0a1430"/><rect width="330" height="44" rx="10" fill="#14244a"/><text x="165" y="31" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b">المغادرة</text>` +
    [['لندن', '٠٨:٤٥'], ['طوكيو', '٠٩:١٠'], ['دبي', '٠٩:٣٠'], ['باريس', '١٠:٠٥'], ['نيويورك', '١٠:٤٠']].map(([c, tm], q) => `<rect x="8" y="${54 + q * 38}" width="314" height="32" rx="4" fill="${q % 2 ? '#0e1a3a' : '#12204a'}"/><text x="314" y="${78 + q * 38}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="#fff">${c}</text><text x="190" y="${78 + q * 38}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#f4d870">${tm}</text><text x="20" y="${78 + q * 38}" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="#ff5a4a">ملغاة</text>`).join('') + `</g>`;
  // perimeter fence and maize beyond it, grey with ash and bent
  s += `<g opacity="${.35 + .65 * crp}"><path d="M-20,1150 H740" stroke="#6a6a6e" stroke-width="3"/>` + Array.from({ length: 13 }, (_, q) => `<path d="M${q * 60},1150 v-60" stroke="#5a5a5e" stroke-width="4"/>`).join('') + `<path d="M-20,1090 H740" stroke="#6a6a6e" stroke-width="2"/><rect x="-20" y="1090" width="760" height="60" fill="none" stroke="#8a8a8e" stroke-width="1" opacity=".5"/>`;
  for (let i = 0; i < 24; i++) { const x = -10 + i * 32, h = 160 + (i % 3) * 22, bend = 18 + 16 * Math.sin(i * 1.7); s += `<path d="M${x},1292 q${bend * .3},-${h * .5} ${bend},-${h}" stroke="#6e6c60" stroke-width="7" fill="none"/>` + [.3, .5, .7, .85].map((u, q) => { const sx = x + bend * u * u, sy = 1292 - h * u, d = q % 2 ? 1 : -1; return `<path d="M${sx},${sy} q${d * 30},6 ${d * 56},40" stroke="#8a887a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M${sx},${sy} q${d * 30},4 ${d * 56},38" stroke="#d0ccc0" stroke-width="3" fill="none" opacity=".75"/>`; }).join(''); }
  s += `</g>`;
  for (let i = 0; i < 150; i++) { const r = RS(i + 3), z = r(), x = pmod(r() * 760 + t * 12 * z, 760) - 20, y = pmod(r() * 1300 + t * (25 + 50 * z), 1300) - 20; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.6 + 2.4 * z).toFixed(1)}" fill="${z > .5 ? '#d8d4cc' : '#9a968e'}" opacity="${(.4 + .5 * z).toFixed(2)}"/>`; }
  s += `<rect width="720" height="1280" fill="#8a8478" opacity=".16"/>`;
  // microscope (bright-field): curved, cuspate glass shards with bubble walls, a pumice grain, scale bar
  if (ins > 0) { const sc = .6 + .4 * ins; s += `<g opacity="${ins}" transform="translate(360,650) scale(${sc})"><circle r="230" fill="url(#micB)"/>`; const r = RS(901);
    for (let i = 0; i < 12; i++) { const cx = (r() - .5) * 290, cy = (r() - .5) * 290; if (Math.hypot(cx, cy) > 185) continue; const R = 26 + r() * 34, rot = r() * 360, ty = i % 3; let d;
      if (ty === 0) d = `M${-R},${-R * .25} Q0,${-R * .7} ${R},${-R * .2} L${R * .9},${R * .02} Q0,${-R * .42} ${-R * .95},${R * .02}Z`;
      else if (ty === 1) d = `M0,${-R} Q${R * .08},${-R * .3} ${R * .85},${R * .45} Q${R * .15},${R * .12} ${-R * .8},${R * .5} Q${-R * .1},${-R * .3} 0,${-R}Z`;
      else d = `M${-R * .7},${-R * .4} L${R * .1},${-R * .6} L${R * .75},${-R * .15} L${R * .5},${R * .5} L${-R * .3},${R * .55} L${-R * .8},${R * .1}Z`;
      s += `<g transform="translate(${cx.toFixed(1)},${cy.toFixed(1)}) rotate(${rot.toFixed(0)})"><path d="${d}" fill="#dfe6e8" opacity=".5" stroke="#4a5458" stroke-width="2.2"/><path d="${d}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".8" transform="translate(-1.5,-1.5)"/></g>`; }
    s += `<g transform="translate(70,90)"><ellipse rx="56" ry="40" fill="#cfc8b8" stroke="#5a5448" stroke-width="2"/>` + Array.from({ length: 12 }, (_, q) => { const a = q * 2.4, d = (q % 4) * 9; return `<ellipse cx="${(Math.cos(a) * d * 1.3).toFixed(1)}" cy="${(Math.sin(a) * d).toFixed(1)}" rx="${5 + (q % 3) * 2}" ry="${4 + (q % 2) * 2}" fill="#9a9284" stroke="#5a5448" stroke-width="1"/>`; }).join('') + `</g>`;
    s += `<path d="M-160,170 h80" stroke="#1a1a1a" stroke-width="5"/>` + lbl(-120, 158, '٠٫١ مم', 1, '#fff', 18) + `<circle r="230" fill="none" stroke="#2a2a2e" stroke-width="14"/><circle r="230" fill="none" stroke="#000" stroke-width="40" opacity=".25" filter="url(#blur2)"/>` + lbl(0, 272, 'رماد بركاني تحت المجهر', 1, '#fff', 26) + `</g>`; }
  F.ov = ''; return s;
}
// --- shot 10: three farms on three continents, real mountains behind each, crops frosted
function farmStrip(y0, h, kind, name, t, fr) {
  let s = `<g><defs><clipPath id="fs${kind}"><rect y="${y0}" width="720" height="${h}"/></clipPath><linearGradient id="fsk${kind}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a86c0', '#7a7e86', fr)}"/><stop offset="1" stop-color="${mix('#c8dcec', '#b8b8b8', fr)}"/></linearGradient></defs><g clip-path="url(#fs${kind})">`;
  const gy = y0 + h * .45;
  s += `<rect y="${y0}" width="720" height="${h * .46}" fill="url(#fsk${kind})"/><circle cx="560" cy="${y0 + 48}" r="15" fill="#fff8e8" opacity="${1 - .55 * fr}"/><circle cx="560" cy="${y0 + 48}" r="60" fill="#fff4e0" opacity="${.22 * (1 - fr)}" filter="url(#soft)"/>`;
  const mt = kind === 'w' ? { rock: '#8a8478', n0: 5 } : kind === 'r' ? { rock: '#5a6a52', n0: 7 } : { rock: '#9a7a5a', n0: 4 };
  s += mountainsR(gy + 2, h * .3, 100 + y0, Object.assign(mt, { snowAt: kind === 'm' ? .9 * fr : .55 - .2 * fr, haze: .28 + .15 * fr, hazeCol: mix('#9ab0c8', '#a8a8a8', fr) }));
  if (kind === 'w') s += forestR(gy + 4, 40, 14, 26, 41, mix('#2e4a32', '#3a4436', fr), { haze: .2, snow: fr * .9 });
  if (kind === 'm') for (let q = 0; q < 5; q++) { const x = 60 + q * 150; s += `<path d="M${x},${gy + 4} l2,-26" stroke="#4a3a2a" stroke-width="3"/><ellipse cx="${x + 2}" cy="${gy - 24}" rx="34" ry="9" fill="${mix('#4a6a2a', '#7a7a6a', fr)}"/>`; }
  const col = kind === 'w' ? ['#d8b850', '#a88a3a'] : kind === 'r' ? ['#7ab840', '#4a7a2a'] : ['#5a8a32', '#3a6a22'];
  s += `<rect y="${gy}" width="720" height="${h * .56}" fill="${mix(mix(col[1], '#2a2418', .4), '#6a6458', fr * .5)}"/><rect y="${gy}" width="720" height="${h * .56}" fill="#000" filter="url(#stalkT)" opacity=".25"/>`;
  if (kind === 'r') for (let q = 0; q < 6; q++) { const yy = gy + 8 + Math.pow(q / 5, 1.5) * (h * .5); s += `<path d="M-20,${yy} Q360,${yy - 8} 740,${yy}" stroke="${mix('#9ac8e8', '#e8f0f4', fr)}" stroke-width="${2 + q * 1.4}" fill="none" opacity=".75"/><path d="M-20,${yy + 3 + q} Q360,${yy - 5 + q} 740,${yy + 3 + q}" stroke="#3a4a2a" stroke-width="${1 + q * .5}" fill="none" opacity=".5"/>`; }
  for (let q = 0; q < 16; q++) { const u = q / 15, yy = gy + 6 + Math.pow(u, 1.6) * (h * .55 - 6), sp = 8 + 34 * u; for (let x = -10 + (q % 2) * sp / 2; x < 740; x += sp) { const hh = (6 + 64 * u * u) * (kind === 'r' ? .5 : kind === 'm' ? 1.25 : 1), bend = fr * hh * .4, cS = mix(col[0], '#8a8270', fr * .7);
      if (kind === 'm') s += `<path d="M${x},${yy} q${bend * .3},-${hh * .6} ${bend},-${hh}" stroke="${cS}" stroke-width="${1.4 + 2.4 * u}" fill="none"/><path d="M${x + bend * .3},${yy - hh * .5} q${10 + 14 * u},-2 ${18 + 26 * u},${10 + 12 * u} M${x + bend * .5},${yy - hh * .75} q${-10 - 14 * u},-2 ${-18 - 24 * u},${8 + 10 * u}" stroke="${cS}" stroke-width="${1.2 + 2 * u}" fill="none"/>`;
      else s += `<path d="M${x},${yy} q${bend * .4},-${hh * .6} ${bend},-${hh}" stroke="${cS}" stroke-width="${1.4 + 2.6 * u}" fill="none"/>` + (kind === 'w' ? `<ellipse cx="${x + bend}" cy="${yy - hh}" rx="${1.2 + 1.6 * u}" ry="${3 + 5 * u}" fill="${mix('#e8c860', '#a89a7a', fr)}"/>` : '');
      if (fr > .3) s += `<circle cx="${x + bend}" cy="${yy - hh}" r="${1 + 1.6 * u}" fill="#f4f8fc" opacity="${fr}"/>`; } }
  s += `<rect y="${gy}" width="720" height="${h * .56}" fill="#fff" filter="url(#stainD)" opacity="${.3 * fr}"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + y0), x = pmod(r() * 760 + t * 10, 760), yy = y0 + pmod(r() * h + t * 30, h); s += `<circle cx="${x}" cy="${yy}" r="${1 + r() * 2}" fill="#fff" opacity="${.8 * fr}"/>`; }
  s += `</g><rect y="${y0}" width="720" height="${h}" fill="none" stroke="#000" stroke-width="4"/><rect x="16" y="${y0 + 14}" width="${name.length * 13 + 34}" height="40" rx="10" fill="#0a0e1c" opacity=".7"/>` + lbl(33 + name.length * 6.5, y0 + 42, name, 1, '#fff', 22) + `</g>`;
  return s;
}
// --- shot 11 + 12: Tambora 1815 as an old engraving (a real cone, pyroclastic flows into the sea, a brig under sail), then June 1816 in a snowed-in alpine village
function brig(x, y, sc, t) {
  const bob = Math.sin(t * 1.4) * 3, roll = Math.sin(t * 1.1) * 2;
  const sail = (mx, top, w, hgt) => `<path d="M${mx - w / 2},${top} Q${mx},${top + 6} ${mx + w / 2},${top} Q${mx + w / 2 + 8},${top + hgt / 2} ${mx + w / 2 - 2},${top + hgt} Q${mx},${top + hgt + 10} ${mx - w / 2 + 2},${top + hgt} Q${mx - w / 2 + 6},${top + hgt / 2} ${mx - w / 2},${top}Z" fill="#ece4d0"/><path d="M${mx - w / 2 + 4},${top + hgt * .3} Q${mx},${top + hgt * .35} ${mx + w / 2 - 4},${top + hgt * .3}" stroke="#b8ac90" stroke-width="1.2" fill="none"/><path d="M${mx + w * .1},${top + 4} Q${mx + w * .25},${top + hgt / 2} ${mx + w * .1},${top + hgt + 4}" stroke="#c8bca0" stroke-width="2" fill="none" opacity=".7"/>`;
  return `<g transform="translate(${x},${y + bob}) rotate(${roll}) scale(${sc})"><path d="M-100,0 L104,0 Q120,-4 130,-14 L118,16 Q104,28 80,30 L-84,30 Q-100,24 -104,10Z" fill="#3a2a1c"/><path d="M-100,6 L118,6" stroke="#c8a040" stroke-width="5"/>` + Array.from({ length: 8 }, (_, q) => `<rect x="${-82 + q * 24}" y="3" width="8" height="7" fill="#1a120a"/>`).join('') +
    `<path d="M130,-14 L190,-34" stroke="#3a2a1c" stroke-width="4"/><path d="M-40,0 L-40,-170 M50,0 L50,-190" stroke="#3a2a1c" stroke-width="5"/>` + sail(-40, -160, 92, 46) + sail(-40, -108, 104, 50) + sail(-40, -52, 112, 44) + sail(50, -180, 100, 48) + sail(50, -124, 112, 54) + sail(50, -64, 120, 54) +
    `<path d="M50,-190 L188,-34 M-40,-170 L50,-190 M-40,-170 L-110,-10 M50,-190 L130,-14" stroke="#2a1e14" stroke-width="1.2" fill="none"/><path d="M60,-180 L150,-36 L66,-40Z" fill="#e4dcc8"/><path d="M-40,-170 l16,6 l-16,6" fill="#8a2a22"/><path d="M-110,30 Q0,40 120,30" stroke="#f4f0e8" stroke-width="4" fill="none" opacity=".6"/></g>`;
}
function sceneTambora(t) {
  const k2 = ease(ramp(t, WS(8, 13) - .5, WS(8, 13) + .1));
  let s = `<defs>${DEF2()}<filter id="sepia" x="0" y="0" width="100%" height="100%"><feColorMatrix type="matrix" values=".39 .77 .19 0 0  .35 .69 .17 0 0  .27 .53 .13 0 0  0 0 0 1 0"/></filter><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><path d="M0,0 V6" stroke="#000" stroke-width="1"/></pattern></defs>`;
  if (k2 < 1) { const b = ease(ramp(t, WS(8, 6) - .3, WS(8, 6) + 2.5)), HY = 900;
    let a = `<rect width="720" height="1280" fill="#c8d0d8"/>` + cumulus(130, 640, 220, 21, { a: .6 });
    const cone = profileP([[-40, HY + 40], [120, 830], [250, 740], [330, 690], [360, 684], [410, 686], [450, 696], [540, 770], [660, 850], [780, HY + 40]], 9, .05);
    a += ashColumn(385, 692, 520, 120, t, .3 + .7 * b, 21, ease(ramp(t, WS(8, 6) + 1, WS(8, 6) + 4)));
    a += mountainsR(HY, 220, 131, { points: cone, rock: '#6a6258', n0: 5, shadeA: .55, el: 30 });
    a += `<path d="M${385 - 30},690 Q385,676 ${385 + 34},692" stroke="#ff8a2a" stroke-width="5" fill="none" opacity="${.7 * b}" filter="url(#blur2)"/>` + pyroFlow(250, 875, t, b, 31, 200) + pyroFlow(530, 880, t, b, 32, 210);
    // the sea: perspective swell, the volcano's broken reflection
    a += `<rect y="${HY}" width="720" height="${1290 - HY}" fill="#4a5e6a"/><defs><clipPath id="seaT"><rect y="${HY}" width="720" height="${1290 - HY}"/></clipPath><filter id="wavT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .09" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="G"/></filter></defs><g clip-path="url(#seaT)"><g opacity=".3" filter="url(#wavT)" transform="translate(0,${2 * HY}) scale(1,-1)"><path d="M-40,${HY + 40} L${cone.map(PT).join(' L')} Z" fill="#2a2620"/></g></g>`;
    for (let q = 0; q < 50; q++) { const u = Math.pow(q / 49, 1.7), y = HY + 4 + u * (1290 - HY), r = RS(q + 520); for (let i = 0; i < 8 + Math.floor(5 * (1 - u)); i++) { const len = (30 + 190 * u) * (.4 + r()), xx = r() * 820 - 60 + Math.sin(t * .8 + i + q) * (2 + 8 * u), am = .8 + 3.5 * u; a += `<path d="M${xx.toFixed(1)},${(y + 1.5 + 2 * u).toFixed(1)} q${len * .25},${am} ${len * .5},0 t${len * .5},0" stroke="#1e2a30" stroke-width="${(.8 + 2.2 * u).toFixed(2)}" fill="none" opacity=".55"/><path d="M${xx.toFixed(1)},${y.toFixed(1)} q${len * .25},${-am} ${len * .5},0 t${len * .5},0" stroke="#a8b8c0" stroke-width="${(.6 + 1.5 * u).toFixed(2)}" fill="none" opacity=".35"/>`; } }
    a += `<ellipse cx="260" cy="${HY + 6}" rx="120" ry="16" fill="#e8e4dc" opacity="${.5 * b}" filter="url(#soft)"/><ellipse cx="520" cy="${HY + 8}" rx="130" ry="18" fill="#e8e4dc" opacity="${.5 * b}" filter="url(#soft)"/>`;
    a += brig(170 + t * 3, 1110, 1.05, t);
    a += `<rect width="720" height="1280" fill="url(#hatch)" opacity=".07"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
    s += `<g opacity="${1 - k2}" filter="url(#sepia)">${a}</g>` + lbl(360, 1220, 'تامبورا، إندونيسيا — ١٨١٥', 1 - k2, '#fff', 30); }
  if (k2 > 0) { let v = `<defs><linearGradient id="sk16" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8490"/><stop offset="1" stop-color="#c8ccd0"/></linearGradient><linearGradient id="snowG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4eaf0"/><stop offset="1" stop-color="#f8fafc"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk16)"/>`;
    v += mountainsR(820, 300, 141, { rock: '#7a7c84', snowAt: .62, haze: .3, hazeCol: '#aab2bc', n0: 5 }) + mountainsR(880, 140, 142, { rock: '#5a5e66', snowAt: .4, haze: .15, hazeCol: '#aab2bc', n0: 8 });
    v += `<rect x="-20" y="876" width="760" height="40" fill="#2a3428"/>` + forestR(888, 40, 36, 70, 14, '#1e3420', { snow: .9, haze: .15, hazeCol: '#aab2bc' }) + forestR(925, 22, 70, 120, 15, '#1a2e1c', { snow: .9 });
    v += `<path d="M-20,930 Q200,915 360,925 T740,920 L740,1290 L-20,1290Z" fill="url(#snowG)"/><path d="M-20,930 Q200,915 360,925 T740,920 L740,1290 L-20,1290Z" fill="#9aaec8" filter="url(#stainD)" opacity=".25"/><path d="M-20,1290 Q200,1150 300,1050 Q330,1000 340,960" stroke="#c8d4e2" stroke-width="22" fill="none" opacity=".6"/>`;
    const house = (x, y, w, h, q) => { let o = `<path d="M${x - 8},${y + 6} Q${x + w / 2},${y + 18} ${x + w + 10},${y + 6} L${x + w + 10},${y + 12} L${x - 8},${y + 12}Z" fill="#dfe6ee"/>`;
      o += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#e4d8c0"/><rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".5"/>`;
      const tb = '#4a2e1a'; o += `<path d="M${x},${y - h} H${x + w} M${x},${y - h * .5} H${x + w} M${x},${y} H${x + w}" stroke="${tb}" stroke-width="6"/>` + [0, .33, .66, 1].map(f => `<path d="M${x + w * f},${y - h} V${y}" stroke="${tb}" stroke-width="6"/>`).join('') + `<path d="M${x},${y - h * .5} L${x + w * .33},${y} M${x + w * .66},${y - h * .5} L${x + w},${y} M${x + w * .33},${y - h} L${x},${y - h * .5}" stroke="${tb}" stroke-width="4"/>`;
      [[.12, .62], [.72, .62], [.4, .15], [.72, .15]].forEach(([fx, fy], i) => { if (i === 2 && q === 1) return; const wx = x + w * fx, wy = y - h + h * fy * 1.0 + (fy > .5 ? -h * .05 : h * .04); o += `<rect x="${wx}" y="${wy}" width="${w * .16}" height="${h * .2}" fill="#f4c870"/><path d="M${wx + w * .08},${wy} v${h * .2} M${wx},${wy + h * .1} h${w * .16}" stroke="#4a2e1a" stroke-width="2"/><rect x="${wx - w * .07}" y="${wy}" width="${w * .06}" height="${h * .2}" fill="#3a5a3a"/>`; });
      o += `<rect x="${x + w * .4}" y="${y - h * .42}" width="${w * .2}" height="${h * .42}" fill="#3a2414"/>`;
      o += `<path d="M${x - 16},${y - h} L${x + w / 2},${y - h - h * .75} L${x + w + 16},${y - h}Z" fill="#5a3a2a"/><rect x="${x + w * .7}" y="${y - h - h * .6}" width="${w * .1}" height="${h * .3}" fill="#6a5a50"/>`;
      o += `<path d="M${x - 22},${y - h + 4} Q${x - 18},${y - h - 14} ${x + w / 2},${y - h - h * .75 - 10} Q${x + w + 18},${y - h - 14} ${x + w + 22},${y - h + 4} Q${x + w / 2},${y - h - h * .3} ${x - 22},${y - h + 4}Z" fill="#f6f9fc"/><path d="M${x - 22},${y - h + 4} Q${x + w / 2},${y - h - h * .3} ${x + w + 22},${y - h + 4}" stroke="#b8c8d8" stroke-width="3" fill="none"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${x - 12 + i * (w + 24) / 8},${y - h + 2} l2,${8 + (i % 3) * 6} l2,${-8 - (i % 3) * 6}" fill="#e8f2fa"/>`).join('') +
        `<path d="M${x + w * .7 - 2},${y - h - h * .6} h${w * .1 + 4}" stroke="#f6f9fc" stroke-width="5"/>`;
      for (let i = 0; i < 4; i++) { const ph = pmod(t * .3 + i / 4 + q * .2, 1); o += `<ellipse cx="${x + w * .75 + ph * 40}" cy="${y - h - h * .62 - ph * 90}" rx="${8 + ph * 24}" ry="${6 + ph * 14}" fill="#9aa0a8" opacity="${(.45 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }
      return o; };
    v += house(40, 1000, 150, 120, 0) + house(240, 1010, 120, 100, 1);
    v += `<rect x="440" y="770" width="90" height="230" fill="#b8b0a4"/><rect x="440" y="770" width="90" height="230" fill="#000" filter="url(#pebT)" opacity=".4"/><path d="M432,770 L485,640 L538,770Z" fill="#4a4a52"/><path d="M432,770 L485,640 L538,770 L526,770 L485,670 L444,770Z" fill="#f4f6f8"/><circle cx="485" cy="820" r="18" fill="#e8e0cc" stroke="#3a3a3e" stroke-width="3"/><path d="M485,820 v-12 M485,820 h9" stroke="#1a1a1a" stroke-width="2.4"/><path d="M465,900 Q485,870 505,900 V1000 H465Z" fill="#3a2a1e"/><path d="M485,640 v-26 M474,624 h22" stroke="#4a4a52" stroke-width="4"/>` + house(560, 1012, 140, 108, 2);
    for (let q = 0; q < 14; q++) { const x = -10 + q * 54; v += `<path d="M${x},1110 v-48" stroke="#5a3a22" stroke-width="5"/><path d="M${x - 4},1062 h8" stroke="#f6f9fc" stroke-width="6" stroke-linecap="round"/>`; } v += `<path d="M-20,1076 H740 M-20,1094 H740" stroke="#5a3a22" stroke-width="3"/><path d="M-20,1074 H740" stroke="#f6f9fc" stroke-width="3"/>`;
    v += onWalk(330, 1190, CROWD[2], .7, 1, t, { coat: 1, hat: 1, scarf: '#5a3a2a', lookUp: .3, breath: 1 });
    for (let i = 0; i < 130; i++) { const r = RS(i + 3), z = r(), x = pmod(r() * 760 + Math.sin(t + i) * 15, 760) - 20, y = pmod(r() * 1300 + t * (30 + 60 * z), 1300) - 20; v += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1 + 3 * z).toFixed(1)}" fill="#fff" opacity="${(.5 + .5 * z).toFixed(2)}"${z > .9 ? ' filter="url(#blur2)"' : ''}/>`; }
    v += `<g transform="translate(360,470)"><rect x="-136" y="-116" width="272" height="222" rx="12" fill="#000" opacity=".3" filter="url(#blur2)"/><rect x="-130" y="-110" width="260" height="210" rx="10" fill="#f6f2e8"/><rect x="-130" y="-110" width="260" height="56" rx="10" fill="#8a2a22"/><rect x="-130" y="-70" width="260" height="16" fill="#8a2a22"/><text x="0" y="-72" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">يونيو</text><text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="76" fill="#1a1a1a">${AR(1816)}</text><text x="0" y="86" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#8a2a22">❄ سنة بلا صيف</text></g>`;
    s += `<g opacity="${k2}"><g filter="url(#sepia)" opacity=".55">${v}</g><g opacity=".45">${v}</g></g>`; }
  F.ov = ''; return s;
}
// --- shot 14: the monitoring station: a GPS monument with its dome antenna, solar panel and electronics box; a scientist with a rugged laptop showing the live seismogram
function sceneWatch(t) {
  let s = parkScene(t, { id: 'w', geyser: .7 });
  s += `<rect width="720" height="1280" fill="#000" opacity=".12"/>`;
  s += `<g transform="translate(500,1160)"><ellipse cx="20" cy="4" rx="120" ry="12" fill="#000" opacity=".25"/><path d="M-40,0 L-6,-120 M40,0 L6,-120 M0,0 L0,-120" stroke="#c8ccd0" stroke-width="5"/><path d="M-40,0 L-6,-120 M40,0 L6,-120" stroke="#fff" stroke-width="1.5" opacity=".6"/><rect x="-14" y="-130" width="28" height="12" fill="#9aa0a6"/><path d="M-30,-130 Q0,-170 30,-130Z" fill="#f4f4f2"/><path d="M-30,-130 Q-10,-160 4,-162" stroke="#fff" stroke-width="3" fill="none"/>` +
    `<path d="M80,0 V-110" stroke="#8a8e94" stroke-width="5"/><g transform="translate(80,-110) rotate(-28)"><rect x="-46" y="-34" width="92" height="64" fill="#1a2c4a"/>` + [-23, 0, 23].map(gx => `<path d="M${gx},-34 v64" stroke="#5a7aa8" stroke-width="1"/>`).join('') + `<path d="M-46,-2 h92" stroke="#5a7aa8" stroke-width="1"/><rect x="-46" y="-34" width="92" height="64" fill="none" stroke="#c8ccd0" stroke-width="3"/></g>` +
    `<rect x="54" y="-56" width="54" height="50" rx="4" fill="#d8d2c0"/><path d="M60,-44 h42 M60,-34 h30" stroke="#8a8478" stroke-width="2"/><path d="M100,-56 v-40" stroke="#3a3a3e" stroke-width="3"/><text x="81" y="-14" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="11" fill="#5a5448">USGS</text></g>`;
  s += onWalk(330, 1190, CROWD[0], .66, 1, t, { lookUp: .1, coat: 1 });
  s += `<g transform="translate(60,940)"><rect x="-6" y="-6" width="312" height="190" rx="12" fill="#2a2a2e"/><rect width="300" height="160" rx="6" fill="#0a1218"/>` + [40, 80, 120].map(gy => `<path d="M10,${gy} H290" stroke="#1e3a2a" stroke-width="1"/>`).join('') + `<path d="M10,80 ` + Array.from({ length: 70 }, (_, q) => `L${10 + q * 4},${(80 + Math.sin(q * 1.7 + t * 9) * (q > 36 && q < 46 ? 30 : 5) * (.6 + .4 * Math.sin(q * .7))).toFixed(1)}`).join(' ') + `" stroke="#5ae07a" stroke-width="2.2" fill="none"/>` + lbl(150, 150, 'رصد الزلازل — مباشر', 1, '#cfd8ff', 17) + `<rect x="-20" y="178" width="340" height="16" rx="5" fill="#3a3a3e"/></g>`;
  F.ov = ''; return s;
}
