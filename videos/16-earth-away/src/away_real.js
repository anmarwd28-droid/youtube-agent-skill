// ===== realism pass for the Earth-away Short: shots 3, 4, 6, 7 =====
// 2 (shot 3): 10% farther – the same Baghdad street, no date palms; the walker really walks along the pavement; light turns cool and thin, breath fogs, the thermometer falls
function sceneDim(t) {
  const st = S0(2) - .2, T = t - st, k = ease(ramp(t, WS(2, 6) - .2, WS(2, 16) + .3));
  let s = bareStreet(t, { id: 'd2', green: 1, sky: [mix('#4a86c6', '#5a6e88', k), mix('#92bce0', '#9aa8b8', k), mix('#d2e4f0', '#c8d0d8', k)], sunGlow: .28 * (1 - .6 * k) });
  s += `<rect width="720" height="1280" fill="#1a2a4a" opacity="${.22 * k}"/><rect y="980" width="720" height="300" fill="#dfe8f0" opacity="${.12 * k}"/>`;
  s += thermoC(80, 420, 900, lerp(30, 16, k));
  const wx = 150 + T * 26;
  s += onWalk(wx, 1088, CROWD[0], .55, 1, t, { coat: k > .5 ? 1 : 0, scarf: k > .5 ? '#c0392b' : null, moving: 1, phase: t * 6, breath: k }) + onWalk(560, 1082, CROWD[1], .52, -1, t, { coat: k > .5 ? 1 : 0, scarf: k > .5 ? '#2a4a7a' : null, breath: k, seed: .4 });
  F.ov = ''; return s;
}
// 3 (shot 4): the same street, now in a long winter: snow settles on the pavement, awnings, cars and trees; a tear-off calendar runs past day 365 to 421, with a bar showing today's year length
function sceneYear(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 1), WS(3, 6) + .3)), day = Math.round(lerp(1, 421, k)), snow = ease(ramp(t, S0(3) - .2, L(3).end));
  let s = bareStreet(t, { id: 'y3', green: 1, sky: ['#5a6a80', '#9aa6b4', '#c8d0d8'], sunGlow: .08 });
  s += `<rect width="720" height="1280" fill="#1a2a4a" opacity=".2"/>`;
  // snow cover: pavement, kerb, road edges, awnings, tree crowns, car roofs
  const sn = .4 + .6 * snow;
  s += `<path d="M0,1000 L720,1000 L720,1104 L0,1104Z" fill="#f2f6fa" opacity="${.85 * sn}"/><path d="M0,1000 L720,1000 L720,1104 L0,1104Z" fill="#000" filter="url(#grainR)" opacity="${.12 * sn}"/>` + Array.from({ length: 9 }, (_, q) => `<ellipse cx="${q * 90 + 40}" cy="${1060 + (q % 3) * 12}" rx="34" ry="5" fill="#c8d4e0" opacity="${.5 * sn}"/>`).join('');
  s += `<rect y="1104" width="720" height="14" fill="#f4f8fc" opacity="${.9 * sn}"/><path d="M0,1118 Q180,1124 360,1120 T720,1122 L720,1130 L0,1130Z" fill="#e8eef4" opacity="${.7 * sn}"/>`;
  [[6, 150], [178, 104], [306, 138], [468, 94], [586, 148]].forEach(([sx, sw]) => { s += `<path d="M${sx - 12},${1000 - 78} Q${sx + sw / 2},${1000 - 84} ${sx + sw + 12},${1000 - 78} L${sx + sw + 12},${1000 - 74} L${sx - 12},${1000 - 74}Z" fill="#f6f9fc" opacity="${.95 * sn}"/>`; });
  [[120, 300, 3], [420, 280, 4], [640, 260, 5]].forEach(([x, h, sd]) => { const r = RS(sd + 900); for (let i = 0; i < 9; i++) { const a = Math.PI * (1.1 + .8 * r()), d = .5 + .45 * r(); s += `<ellipse cx="${x + Math.cos(a) * d * h * .26}" cy="${1058 - h * .72 + Math.sin(a) * d * h * .2 - 6}" rx="${h * (.03 + .03 * r())}" ry="${h * .012 + 2}" fill="#f6f9fc" opacity="${.92 * sn}"/>`; } });
  [[520, 1170, .95, -1], [150, 1250, .9, 1]].forEach(([cx, cy, cs, fc]) => { s += `<path d="M${cx + fc * cs * -34},${cy - 104 * cs + 2} Q${cx + fc * cs * 8},${cy - 112 * cs} ${cx + fc * cs * 48},${cy - 104 * cs + 2}" stroke="#f6f9fc" stroke-width="${7 * sn}" fill="none" stroke-linecap="round"/><path d="M${cx + fc * cs * 70},${cy - 62 * cs} L${cx + fc * cs * 106},${cy - 57 * cs}" stroke="#f6f9fc" stroke-width="${4 * sn}" stroke-linecap="round"/>`; });
  // two passers-by in winter coats actually walking
  s += onWalk(90 + T * 24, 1090, CROWD[2], .55, 1, t, { coat: 1, scarf: '#5a5a5a', moving: 1, phase: t * 6, breath: 1 }) + onWalk(640 - T * 18, 1080, CROWD[3], .5, -1, t, { coat: 1, scarf: '#8a2a2a', moving: 1, phase: t * 5 + 1, breath: 1, seed: .3 });
  // falling snow in three depths
  for (let i = 0; i < 120; i++) { const r = RS(i + 3), z = r(), x = pmod(r() * 760 + Math.sin(t * .8 + i) * 22 * z, 760) - 20, y = pmod(r() * 1300 + t * (30 + 70 * z), 1300) - 20, rr = .8 + 3.4 * z; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="#fff" opacity="${((.35 + .55 * z) * (.3 + .7 * snow)).toFixed(2)}"${z > .85 ? ' filter="url(#blur2)"' : ''}/>`; }
  // the tear-off calendar: spiral rings, paper shading, flying pages, and the year-length bar
  s += `<g transform="translate(360,560)"><rect x="-176" y="-150" width="352" height="312" rx="14" fill="#000" opacity=".35" filter="url(#blur2)"/>` +
    `<rect x="-170" y="-150" width="340" height="300" rx="12" fill="#f8f6f0"/><rect x="-170" y="60" width="340" height="90" rx="12" fill="#ece8de"/><path d="M-170,140 L170,140" stroke="#d8d2c4" stroke-width="2"/><path d="M-170,146 L170,146" stroke="#d8d2c4" stroke-width="2"/>` +
    `<rect x="-170" y="-150" width="340" height="70" rx="12" fill="#b82828"/><rect x="-170" y="-96" width="340" height="16" fill="#b82828"/><rect x="-170" y="-150" width="340" height="18" rx="12" fill="#fff" opacity=".12"/><text x="0" y="-102" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#fff">اليوم</text>` +
    `<text x="0" y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="110" fill="${day > 365 ? '#b82828' : '#1a1a1a'}">${AR(day)}</text><text x="0" y="110" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="${day > 365 ? '#b82828' : '#555'}">${day > 365 ? 'السنة لم تنتهِ بعد!' : 'من السنة'}</text>` +
    [0, 1, 2, 3, 4].map(q => `<rect x="${-128 + q * 64}" y="-166" width="12" height="32" rx="6" fill="#6a6a6e"/><rect x="${-126 + q * 64}" y="-164" width="4" height="28" rx="2" fill="#d8d8dc"/><circle cx="${-122 + q * 64}" cy="-136" r="5" fill="#3a2a2a"/>`).join('');
  if (k > 0 && k < 1) for (let q = 0; q < 2; q++) { const ph = .3 + .7 * pmod(t * 2.4 + q / 2, 1); s += `<g transform="translate(${-ph * 260},${-80 - ph * 220}) rotate(${-ph * 70})" opacity="${(1 - ph).toFixed(2)}"><path d="M-150,0 L150,0 L140,${150 - ph * 80} Q0,${170 - ph * 60} -150,${150 - ph * 80}Z" fill="#f8f6f0"/><path d="M-150,0 L150,0 L150,10 L-150,10Z" fill="#000" opacity=".08"/></g>`; }
  s += `</g>`;
  const B0 = 160, B1 = 560, mark = B0 + (B1 - B0) * 365 / 421, fill = B0 + (B1 - B0) * day / 421;
  s += `<g><rect x="${B0 - 30}" y="760" width="${B1 - B0 + 60}" height="118" rx="16" fill="#0a0e1c" opacity=".78"/><text x="${B0 + 4}" y="796" text-anchor="start" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#cfd8ff">طول السنة</text>` +
    `<rect x="${B0}" y="808" width="${B1 - B0}" height="20" rx="10" fill="#2a3046"/><rect x="${B0}" y="808" width="${fill - B0}" height="20" rx="10" fill="${day > 365 ? '#e53935' : '#f4c76b'}"/>` +
    `<rect x="${mark - 2}" y="800" width="4" height="36" fill="#fff"/><text x="${mark}" y="862" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#fff">${AR(365)} الآن</text><text x="${B1 - 10}" y="800" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="19" fill="#ff8a80" opacity="${ramp(t, WS(3, 5), WS(3, 5) + .4)}">${AR(421)}</text></g>`;
  F.ov = ''; return s;
}
// ---------- shot 6: a frozen harbour ----------
function cargoShip(x, y, sc, t, ice) {
  const bob = Math.sin(t * 1.3) * 2 * (1 - ice);
  let s = `<g transform="translate(${x},${y + bob}) scale(${sc})">`;
  s += `<path d="M-230,-40 L210,-40 Q250,-40 262,-62 L250,-2 Q240,30 200,34 L-200,34 Q-222,30 -226,0Z" fill="#1e2228"/><path d="M-226,0 L250,-2 Q240,30 200,34 L-200,34 Q-222,30 -226,0Z" fill="#8a2a22"/><path d="M-228,-6 L252,-8" stroke="#e8e4dc" stroke-width="2" opacity=".6"/>` +
    `<path d="M-230,-40 L210,-40 Q250,-40 262,-62" stroke="#c8ccd0" stroke-width="2" fill="none"/><text x="160" y="-16" font-family="Space Grotesk" font-weight="700" font-size="13" fill="#e8e4dc" opacity=".8">TIGRIS STAR</text>`;
  const cols = ['#b83a2a', '#2a5a9a', '#d8a030', '#3a7a4a', '#7a7a80', '#c85a2a', '#1a4a6a'], r = RS(41);
  for (let c = 0; c < 9; c++) for (let h = 0; h < 3; h++) { if (h === 2 && r() < .35) continue; const cx = -150 + c * 36, cy = -40 - 22 * (h + 1), col = cols[Math.floor(r() * cols.length)];
    s += `<rect x="${cx}" y="${cy}" width="34" height="21" fill="${col}"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${cx + 4 + q * 6.5},${cy + 2} v17" stroke="#000" stroke-opacity=".22" stroke-width="1.4"/>`).join('') + `<rect x="${cx}" y="${cy}" width="34" height="3" fill="#fff" opacity=".18"/>`;
    if (h === 2 || (h === 1 && r() < .2)) s += `<rect x="${cx - 1}" y="${cy - 4}" width="36" height="5" rx="2" fill="#f6f9fc"/>`; }
  s += `<rect x="-222" y="-112" width="62" height="72" fill="#eceae4"/><rect x="-226" y="-126" width="74" height="16" fill="#e4e2dc"/><rect x="-232" y="-130" width="86" height="6" fill="#f6f9fc"/>` + Array.from({ length: 3 }, (_, q) => Array.from({ length: 5 }, (_, p) => `<rect x="${-216 + p * 11}" y="${-104 + q * 20}" width="7" height="9" fill="${(p + q) % 4 ? '#2a3440' : '#f4d080'}"/>`).join('')).join('') +
    `<rect x="-200" y="-160" width="20" height="34" fill="#2a2a2e"/><rect x="-200" y="-150" width="20" height="8" fill="#b83a2a"/><rect x="-204" y="-164" width="28" height="6" fill="#f6f9fc"/><path d="M-190,-170 L-190,-200 M-196,-196 L-184,-196" stroke="#555" stroke-width="2"/>` +
    `<path d="M240,-62 L240,-90" stroke="#555" stroke-width="3"/><path d="M240,-90 L-150,-100" stroke="#555" stroke-width="1" opacity=".6"/>` +
    Array.from({ length: 12 }, (_, q) => `<path d="M${-220 + q * 38},-41 l2,${6 + (q % 3) * 5}" stroke="#e8f4fc" stroke-width="2" opacity="${ice}"/>`).join('');
  return s + `</g>`;
}
function trawler(x, y, sc, t, ice) {
  const bob = Math.sin(t * 1.7 + 1) * 3 * (1 - ice), roll = Math.sin(t * 1.1) * 2 * (1 - ice);
  return `<g transform="translate(${x},${y + bob}) rotate(${roll}) scale(${sc})"><path d="M-120,-30 L110,-30 Q140,-34 150,-56 L140,0 Q128,26 100,28 L-110,28 Q-124,20 -126,0Z" fill="#1e4a7a"/><path d="M-126,0 L140,0 Q128,26 100,28 L-110,28 Q-124,20 -126,0Z" fill="#7a1e1a"/><path d="M-120,-30 L110,-30 Q140,-34 150,-56" stroke="#e8eef4" stroke-width="3" fill="none"/>` +
    `<rect x="10" y="-86" width="70" height="56" fill="#eceae4"/><rect x="6" y="-92" width="78" height="8" fill="#f6f9fc"/>` + [0, 1, 2, 3].map(q => `<rect x="${16 + q * 16}" y="-76" width="11" height="13" fill="#2a3440"/>`).join('') +
    `<path d="M-60,-30 L-60,-150 M-60,-140 L-118,-60 M-60,-140 L20,-96" stroke="#3a3a3e" stroke-width="3" fill="none"/><path d="M-118,-60 Q-100,-20 -84,-30" stroke="#3a3a3e" stroke-width="1.5" fill="none"/><path d="M-110,-56 Q-96,-36 -80,-34 L-80,-30 L-112,-30Z" fill="#4a7a5a" opacity=".8"/>` +
    `<path d="M-60,-150 L-60,-160" stroke="#f6f9fc" stroke-width="4" opacity="${ice}"/>` + Array.from({ length: 8 }, (_, q) => `<path d="M${-110 + q * 30},-29 l1.5,${5 + (q % 3) * 4}" stroke="#e8f4fc" stroke-width="2" opacity="${ice}"/>`).join('') + `</g>`;
}
function sceneFrozen(t) {
  const k = ease(ramp(t, S0(5), L(5).end + .2)), HY = 878, SX = 470, SY = 600;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skF5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141c34"/><stop offset=".6" stop-color="#4a5872"/><stop offset=".9" stop-color="#9a9ca4"/><stop offset="1" stop-color="#c8b8a8"/></linearGradient>` +
    `<linearGradient id="seaF5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a5c"/><stop offset="1" stop-color="#0e1a26"/></linearGradient><linearGradient id="iceS5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#aebccc"/><stop offset="1" stop-color="#dfe8f0"/></linearGradient>` +
    `<filter id="wavyF" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .08" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="16" xChannelSelector="R" yChannelSelector="G"/></filter>` +
    `<clipPath id="seaC5"><rect y="${HY}" width="720" height="${1290 - HY}"/></clipPath><clipPath id="iceC5"><rect y="${HY - 2}" width="720" height="${k * (1300 - HY)}"/></clipPath></defs><rect width="720" height="1280" fill="url(#skF5)"/>` + stars(.3, t);
  s += `<circle cx="${SX}" cy="${SY}" r="15" fill="#fff6e8"/><circle cx="${SX}" cy="${SY}" r="70" fill="#fff0d8" opacity=".22" filter="url(#soft)"/><circle cx="${SX}" cy="${SY}" r="26" fill="#fff8f0" opacity=".3" filter="url(#blur2)"/>`;
  // the port city: far blocks, nearer buildings with windows (a few lit), snow on every roof, harbour cranes
  let city = ''; const r0 = RS(9); let x = -20;
  while (x < 740) { const w = 26 + r0() * 40, h = 60 + r0() * 140; city += `<rect x="${x}" y="${830 - h}" width="${w}" height="${h + 30}" fill="#5a6474"/><rect x="${x}" y="${830 - h}" width="${w}" height="5" fill="#e8eef4"/>`; x += w + 3; }
  x = -10; const r1 = RS(19);
  while (x < 740) { const w = 44 + r1() * 70, h = 50 + r1() * 110, c = mix('#3a3e48', '#5a5048', r1()); city += `<rect x="${x}" y="${862 - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x + w * .72}" y="${862 - h}" width="${w * .28}" height="${h}" fill="#000" opacity=".25"/><path d="M${x - 2},${862 - h} L${x + w + 2},${862 - h} L${x + w},${862 - h + 7} L${x},${862 - h + 7}Z" fill="#f2f6fa"/>`;
    for (let q = 0; q < Math.floor((h - 16) / 18); q++) for (let p = 0; p < Math.floor((w - 8) / 14); p++) { const lit = r1() < .22; city += `<rect x="${x + 6 + p * 14}" y="${862 - h + 14 + q * 18}" width="7" height="9" fill="${lit ? '#f4c870' : '#1e2430'}" opacity="${lit ? .9 : .8}"/>`; }
    x += w + 2; }
  [[90, 1], [620, -1]].forEach(([cx, d]) => { city += `<g transform="translate(${cx},862)"><path d="M-18,0 L-14,-130 M18,0 L14,-130 M-14,-130 L14,-130 M-16,-60 L16,-60 M-16,-60 L14,-130 M16,-60 L-14,-130" stroke="#b8442a" stroke-width="5" fill="none"/><path d="M${-60 * d},-130 L${120 * d},-130 L${120 * d},-118 L${-60 * d},-118Z" fill="#c8502e"/><path d="M${-60 * d},-131 L${120 * d},-131" stroke="#f2f6fa" stroke-width="4"/><path d="M${80 * d},-118 L${80 * d},-70" stroke="#333" stroke-width="1.5"/><rect x="${80 * d - 6}" y="-72" width="12" height="8" fill="#333"/></g>`; });
  s += city;
  // quay with snow and bollards
  s += `<rect y="860" width="720" height="${HY - 860 + 4}" fill="#6a6e74"/><rect y="856" width="720" height="8" fill="#f2f6fa"/>` + Array.from({ length: 8 }, (_, q) => `<rect x="${30 + q * 92}" y="850" width="10" height="10" rx="3" fill="#2a2a2e"/><rect x="${29 + q * 92}" y="848" width="12" height="4" rx="2" fill="#f2f6fa"/>`).join('');
  // open water: dark, with the skyline's wavy reflection, waves and the pale sun's glitter path
  s += `<rect y="${HY}" width="720" height="${1290 - HY}" fill="url(#seaF5)"/><g clip-path="url(#seaC5)"><g opacity=".3" filter="url(#wavyF)" transform="translate(0,${2 * HY}) scale(1,-1)">${city}</g></g>`;
  for (let q = 0; q < 56; q++) { const u = Math.pow(q / 55, 1.8), y = HY + 4 + u * (1290 - HY), r = RS(q + 500), n = 8 + Math.floor(7 * (1 - u));
    for (let i = 0; i < n; i++) { const len = (30 + 200 * u) * (.4 + r()), xx = r() * 820 - 60 + Math.sin(t * .7 + i + q) * (3 + 8 * u), a = .6 + 3 * u; s += `<path d="M${xx.toFixed(1)},${(y + 1.5 + 2 * u).toFixed(1)} q${len * .25},${a} ${len * .5},0 t${len * .5},0" stroke="#050c14" stroke-width="${(.8 + 2.2 * u).toFixed(2)}" fill="none" opacity=".5"/><path d="M${xx.toFixed(1)},${y.toFixed(1)} q${len * .25},${-a} ${len * .5},0 t${len * .5},0" stroke="#6a7a8c" stroke-width="${(.6 + 1.4 * u).toFixed(2)}" fill="none" opacity=".3"/>`; } }
  for (let q = 0; q < 34; q++) { const u = Math.pow(q / 33, 1.6), y = HY + 4 + u * (1290 - HY), r = RS(q + 700), sp = 8 + 90 * u; for (let i = 0; i < 3 + Math.floor(4 * u); i++) { const g = (r() + r() + r()) / 1.5 - 1, fl = .5 + .5 * Math.sin(t * (4 + 3 * r()) + i * 2 + q), w = 3 + 16 * u * r(); s += `<rect x="${(SX + g * sp - w / 2).toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${(1 + 1.6 * u).toFixed(1)}" fill="#ffe8c8" opacity="${(fl * .7).toFixed(2)}"/>`; } }
  // ice spreading out from the quay: frosted sheet, pressure ridges with blue shadows, snow drifts, cracks, sparkles
  s += `<g clip-path="url(#iceC5)"><rect y="${HY}" width="720" height="${1290 - HY}" fill="url(#iceS5)"/><rect y="${HY}" width="720" height="${1290 - HY}" fill="#fff" filter="url(#stainD)" opacity=".4"/><rect y="${HY}" width="720" height="${1290 - HY}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    `<ellipse cx="${SX}" cy="${HY + 200}" rx="110" ry="220" fill="#fff4e4" opacity=".25" filter="url(#soft)"/>` + cracks(HY + 8, 1290, 1, 57, -20, 740, '#7a90a8');
  for (let i = 0; i < 9; i++) { const r = RS(i + 30), u = Math.pow((i + .5) / 9, 1.4), y = HY + 20 + u * 380, hh = 4 + 14 * u; let d = `M-20,${y}`; for (let xx = 0; xx <= 760; xx += 40) d += ` L${xx},${(y - hh * (.4 + .8 * Math.abs(Math.sin(xx * .05 + i * 2)))).toFixed(1)}`; d += ` L740,${y + 4} L-20,${y + 4}Z`; s += `<path d="${d}" fill="#f4f8fc"/><path d="M-20,${y} L740,${y} L740,${y + hh * .7} L-20,${y + hh * .7}Z" fill="#6a84a0" opacity=".45"/>`; }
  s += Array.from({ length: 40 }, (_, q) => { const r = RS(q + 1200); return `<circle cx="${(r() * 720).toFixed(1)}" cy="${(HY + Math.pow(r(), 1.3) * 400).toFixed(1)}" r="${(1 + r() * 1.5).toFixed(1)}" fill="#fff" opacity="${(.4 + .6 * Math.abs(Math.sin(t * 4 + q))).toFixed(2)}"/>`; }).join('') + `</g>`;
  if (k < 1) s += `<rect y="${HY - 2 + k * (1300 - HY) - 3}" width="720" height="6" fill="#eef6fa" opacity=".8" filter="url(#blur2)"/>`;
  // ships, held fast once the ice reaches them, with an ice collar at the waterline
  const shipIce = (y0) => ease(ramp(HY - 2 + k * (1300 - HY), y0 - 10, y0 + 20));
  const i1 = shipIce(968), i2 = shipIce(1128);
  s += cargoShip(300, 968, .78, t, i1) + `<path d="M${300 - 190},${968 + 26} Q300,${968 + 18} ${300 + 210},${968 + 24} L${300 + 220},${968 + 34} L${300 - 196},${968 + 36}Z" fill="#f4f8fc" opacity="${i1}"/>`;
  s += trawler(560, 1128, .95, t, i2) + `<path d="M${560 - 130},${1128 + 22} Q560,${1128 + 14} ${560 + 150},${1128 + 18} L${560 + 160},${1128 + 32} L${560 - 136},${1128 + 34}Z" fill="#f4f8fc" opacity="${i2}"/>`;
  // drifting snow haze in the cold air
  for (let i = 0; i < 50; i++) { const r = RS(i + 60), xx = pmod(r() * 760 + t * 40, 760) - 20, yy = pmod(r() * 1300 + t * 30, 1300); s += `<circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${(.8 + 2 * r()).toFixed(1)}" fill="#fff" opacity=".55"/>`; }
  s += `<rect width="720" height="1280" fill="#0a1430" opacity=".16"/>`;
  F.ov = ''; return s;
}
// ---------- shot 7: life at hydrothermal vents, lit by a submersible's lamps ----------
function chimney(x, y, h, seed, t) {
  const r = RS(seed); let s = '';
  const base = `M${x - 46},${y} C${x - 40},${y - h * .4} ${x - 30},${y - h * .7} ${x - 16},${y - h} L${x + 14},${y - h} C${x + 28},${y - h * .65} ${x + 40},${y - h * .35} ${x + 48},${y}Z`;
  s += `<path d="${base}" fill="#24201c"/><path d="${base}" fill="#6a6052" filter="url(#reliefR)" opacity=".45"/>`;
  for (let i = 0; i < 16; i++) { const u = r(), w = 46 - 30 * u, cy = y - h * u, cx = x + (r() - .5) * w * 1.2; s += `<ellipse cx="${cx}" cy="${cy}" rx="${8 + 12 * r() * (1 - u * .6)}" ry="${5 + 6 * r()}" fill="${r() > .75 ? '#5a4628' : '#2e2a24'}"/>`; }
  for (let i = 0; i < 4; i++) { const xs = x - 20 + i * 12 + (r() - .5) * 8; s += `<path d="M${xs},${y - h * .9} q${(r() - .5) * 10},${h * .3} ${(r() - .5) * 6},${h * .8}" stroke="${['#c88a2a', '#a8642a', '#d8b04a'][i % 3]}" stroke-width="${2 + r() * 3}" fill="none" opacity=".28"/>`; }
  s += `<path d="M${x - 46},${y} C${x - 40},${y - h * .4} ${x - 30},${y - h * .7} ${x - 16},${y - h} L${x - 4},${y - h} C${x - 14},${y - h * .6} ${x - 22},${y - h * .3} ${x - 18},${y}Z" fill="#fff" opacity=".1"/>`;
  // shimmering, billowing black smoke: dark mineral-laden water at ~350 °C
  for (let q = 0; q < 16; q++) { const ph = pmod(t * .32 + q / 16 + seed * .17, 1), sw = Math.sin(ph * 7 + q + seed) * (10 + 30 * ph); s += `<ellipse cx="${(x + sw + ph * 30).toFixed(1)}" cy="${(y - h - 8 - ph * 360).toFixed(1)}" rx="${(10 + ph * 70).toFixed(1)}" ry="${(12 + ph * 54).toFixed(1)}" fill="${q % 3 ? '#0c0a0a' : '#2a2420'}" opacity="${(.92 * Math.pow(1 - ph, .7) * (ph < .05 ? ph / .05 : 1)).toFixed(2)}" filter="url(#soft)"/>`; }
  
  for (let q = 0; q < 5; q++) { const ph = pmod(t * 1.4 + q / 5, 1); s += `<path d="M${x - 12 + q * 6},${y - h - ph * 60} q4,-6 0,-12 q-4,-6 0,-12" stroke="#a8c8d8" stroke-width="1.2" fill="none" opacity="${(.3 * (1 - ph)).toFixed(2)}"/>`; }
  return s;
}
function tubeWorms(x, y, n, seed, t) {
  const r = RS(seed); let s = '';
  const w = []; for (let i = 0; i < n; i++) w.push([x + (r() - .5) * n * 7, y + r() * 10, 40 + r() * 70, r() * 6.28, r()]);
  w.sort((a, b) => a[1] - b[1]);
  w.forEach(([wx, wy, h, ph, z]) => { const sw = Math.sin(t * 1.3 + ph) * 4, tx = wx + sw * .6, ty = wy - h, pl = .85 + .15 * Math.sin(t * 2 + ph);
    s += `<path d="M${wx},${wy} q${sw},${-h * .5} ${sw * .6},${-h}" stroke="#d8d0c0" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${wx - 2},${wy} q${sw},${-h * .5} ${sw * .6 - 2},${-h}" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/>` + Array.from({ length: 4 }, (_, q) => `<path d="M${wx - 3.5 + sw * .3 * q / 4},${wy - h * (q + 1) / 5} h7" stroke="#a89c88" stroke-width="1.2"/>`).join('');
    s += `<g transform="translate(${tx},${ty}) scale(${pl})">` + `<path d="M-4,2 Q-12,-10 -6,-24 Q0,-30 6,-24 Q12,-10 4,2Z" fill="#b81a22"/>` + Array.from({ length: 13 }, (_, q) => { const a = -Math.PI / 2 + (q - 6) * .16, L = 16 + 6 * Math.cos((q - 6) * .3); return `<path d="M0,0 Q${(Math.cos(a) * L * .5).toFixed(1)},${(Math.sin(a) * L * .6).toFixed(1)} ${(Math.cos(a) * L).toFixed(1)},${(Math.sin(a) * L - 2).toFixed(1)}" stroke="${['#e8222a', '#ff4a4a', '#c81a22'][q % 3]}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`; }).join('') + `</g>`; });
  return s;
}
function ventCrab(x, y, sc, t, ph, face = 1) {
  const g = t * 5 + ph, legs = [-1, 1].map(sd => [0, 1, 2, 3].map(q => { const a = Math.sin(g + q * 1.6 + (sd > 0 ? Math.PI : 0)), hx = sd * (20 + q * 3), hy = 0 + q * 3, kx = sd * (34 + q * 5), ky = -8 + q * 3 - Math.max(0, a) * 5, fx = sd * (42 + q * 5) + a * 3, fy = 12 + q;
    return `<path d="M${hx},${hy} L${kx},${ky} L${fx},${fy}" stroke="#cfc8b8" stroke-width="${6.5 - q * .6}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${hx},${hy - 1.5} L${kx},${ky - 1.5}" stroke="#fff" stroke-width="1.5" opacity=".45"/><path d="M${kx},${ky} L${fx},${fy}" stroke="#a8a090" stroke-width="1.2" opacity=".6"/>`; }).join('')).join('');
  const cl = sd => { const o = .5 + .5 * Math.sin(t * 2.4 + ph + sd); return `<path d="M${sd * 20},-8 Q${sd * 34},-20 ${sd * 38},-22" stroke="#e4ded0" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M${sd * 32},-34 Q${sd * 56},-36 ${sd * 60},-24 Q${sd * 54},-14 ${sd * 34},-14 Q${sd * 26},-24 ${sd * 32},-34Z" fill="#ece6d8"/><path d="M${sd * 34},-30 Q${sd * 48},-32 ${sd * 54},-26" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/><path d="M${sd * 56},-22 Q${sd * 66},${-20 + o * 6} ${sd * 62},${-12 + o * 6}" stroke="#d8d0c0" stroke-width="5" fill="none" stroke-linecap="round"/>`; };
  return `<g transform="translate(${x},${y}) scale(${sc * face},${sc})"><ellipse cx="0" cy="16" rx="50" ry="6" fill="#000" opacity=".4"/>${legs}${cl(-1)}${cl(1)}` +
    `<path d="M-34,0 Q-36,-22 0,-24 Q36,-22 34,0 Q28,12 0,12 Q-28,12 -34,0Z" fill="#e8e2d4"/><path d="M-30,-6 Q-30,-20 0,-22 Q30,-20 30,-6" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><path d="M-32,2 Q0,14 32,2 Q28,12 0,12 Q-28,12 -32,2Z" fill="#a8a090"/>` +
    `<path d="M-14,-12 Q0,-6 14,-12 M-8,-18 Q0,-14 8,-18" stroke="#c0b8a8" stroke-width="1.6" fill="none"/><path d="M-8,-22 l-2,-6 M8,-22 l2,-6" stroke="#d8d0c0" stroke-width="2.5"/><circle cx="-10" cy="-28" r="2.4" fill="#d8d0c0"/><circle cx="10" cy="-28" r="2.4" fill="#d8d0c0"/></g>`;
}
function eelpout(x, y, sc, t, ph, face = 1) {
  const pts = []; for (let i = 0; i <= 10; i++) { const u = i / 10; pts.push([60 - u * 120, Math.sin(t * 4 + ph - u * 4) * 5 * u]); }
  const top = pts.map((p, i) => [p[0], p[1] - 13 * Math.sin(Math.PI * Math.min(1, (i + 1) / 10 * 1.1)) * (1 - i / 14)]), bot = pts.map((p, i) => [p[0], p[1] + 11 * Math.sin(Math.PI * Math.min(1, (i + 1) / 10 * 1.1)) * (1 - i / 14)]);
  const d = `M${PT(pts[0])} ${top.map(p => 'L' + PT(p)).join(' ')} L${PT(pts[10])} ${bot.slice().reverse().map(p => 'L' + PT(p)).join(' ')}Z`;
  return `<g transform="translate(${x},${y}) scale(${sc * face},${sc})"><path d="${d}" fill="#e8c8b8"/><path d="M${top.slice(2).map(PT).join(' L')}" stroke="#d8a898" stroke-width="3" fill="none"/><path d="M${bot.slice(1).map(PT).join(' L')}" stroke="#fff" stroke-width="1.5" fill="none" opacity=".5"/>` +
    `<path d="M${PT(pts[10])} l-10,-8 l2,16Z" fill="#d8b0a0"/><circle cx="46" cy="-3" r="3" fill="#1a1a1a"/><circle cx="45" cy="-4" r="1" fill="#fff"/><path d="M58,2 Q54,5 50,4" stroke="#b88878" stroke-width="1.5" fill="none"/><path d="M34,2 q-6,8 -14,6" stroke="#d8b0a0" stroke-width="3" fill="none" opacity=".8"/></g>`;
}
function sceneVents(t) {
  let s = `<defs>${RDEF}${RDEF2}<filter id="iceX" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .06" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .5  0 0 0 0 .65  0 0 0 -1.5 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<linearGradient id="deep7" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16324c"/><stop offset=".28" stop-color="#081626"/><stop offset="1" stop-color="#020408"/></linearGradient><radialGradient id="lamp7" cx=".5" cy=".55" r=".55"><stop offset="0" stop-color="#9ac8d8" stop-opacity=".28"/><stop offset=".6" stop-color="#4a7a90" stop-opacity=".1"/><stop offset="1" stop-color="#4a7a90" stop-opacity="0"/></radialGradient><radialGradient id="ventG"><stop offset="0" stop-color="#ffb060" stop-opacity=".5"/><stop offset="1" stop-color="#ff6a2a" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#deep7)"/>`;
  // the sea ice far above, its underside lit faintly blue
  s += `<path d="M-20,-20 L740,-20 L740,330 Q620,352 520,338 Q420,360 320,342 Q200,362 100,344 Q40,352 -20,340Z" fill="#a8c8dc"/><rect x="-20" y="-20" width="760" height="380" fill="#fff" filter="url(#iceX)" opacity=".5"/><path d="M-20,340 Q40,352 100,344 Q200,362 320,342 Q420,360 520,338 Q620,352 740,330" stroke="#5a88a8" stroke-width="8" fill="none"/>` +
    Array.from({ length: 7 }, (_, q) => `<path d="M${40 + q * 110},350 L${10 + q * 110},760 L${90 + q * 110},760Z" fill="#6a9ab8" opacity=".045"/>`).join('') + `<rect y="360" width="720" height="260" fill="#04101c" opacity=".55"/>`;
  // the submersible's light pool over the vent field
  s += `<ellipse cx="380" cy="1000" rx="460" ry="420" fill="url(#lamp7)"/>`;
  // marine snow drifting down through the beams
  for (let i = 0; i < 70; i++) { const r = RS(i + 10), z = r(), y = pmod(r() * 900 + t * (8 + 18 * z), 900) + 380, xx = pmod(r() * 720 + Math.sin(t * .5 + i) * 10, 720); s += `<circle cx="${xx.toFixed(1)}" cy="${y.toFixed(1)}" r="${(.6 + 1.8 * z).toFixed(1)}" fill="#c8dce8" opacity="${(.15 + .4 * z).toFixed(2)}"/>`; }
  // basalt sea floor with sediment
  const fl = `M-20,1100 Q80,1070 180,1088 Q280,1062 380,1080 Q480,1060 560,1078 Q640,1066 740,1086 L740,1290 L-20,1290Z`;
  s += `<path d="${fl}" fill="#3a342e"/><path d="${fl}" fill="#7a6e60" filter="url(#reliefR)" opacity=".8"/><path d="${fl}" fill="#000" filter="url(#pebT)" opacity=".5"/>`;
  for (let i = 0; i < 14; i++) { const r = RS(i + 700), xx = r() * 760 - 20, yy = 1110 + r() * 150, w = 20 + r() * 50; s += `<path d="M${xx - w},${yy} Q${xx - w * .6},${yy - w * .5} ${xx},${yy - w * .55} Q${xx + w * .7},${yy - w * .4} ${xx + w},${yy}Z" fill="#2a2622"/><path d="M${xx - w},${yy} Q${xx - w * .6},${yy - w * .5} ${xx},${yy - w * .55}" stroke="#8a8070" stroke-width="2" fill="none" opacity=".5"/>`; }
  // three black smokers with their glow
  [[230, 1084, 270, 1], [480, 1072, 210, 2], [620, 1084, 150, 3]].forEach(([x, y, h, sd]) => { s += chimney(x, y, h, sd, t); });
  // tube-worm thickets at the chimney feet, white crabs walking, eelpout fish hovering, shrimp swarming on the chimney
  s += tubeWorms(160, 1104, 12, 51, t) + tubeWorms(330, 1096, 10, 52, t) + tubeWorms(560, 1090, 9, 53, t);
  for (let i = 0; i < 26; i++) { const r = RS(i + 90), a = t * (.5 + r()) + r() * 6.28, xx = 480 + Math.cos(a) * (20 + 30 * r()), yy = 1072 - 40 - r() * 140 + Math.sin(a * 1.3) * 10; s += `<g transform="translate(${xx.toFixed(1)},${yy.toFixed(1)}) rotate(${(Math.cos(a) > 0 ? 0 : 180)})"><path d="M-7,0 Q0,-4 7,0 Q0,3 -7,0Z" fill="#f4dcc8" opacity=".85"/><path d="M7,0 l5,-3 M7,0 l5,2" stroke="#f4dcc8" stroke-width=".8" opacity=".7"/></g>`; }
  const cx1 = 80 + pmod(t * 22, 260), cx2 = 690 - pmod(t * 16 + 40, 240);
  s += ventCrab(cx1, 1150, .9, t, 0, 1) + ventCrab(cx2, 1200, 1.05, t, 2, -1) + ventCrab(420, 1240, 1.2, t * .4, 4, 1);
  s += eelpout(250 + Math.sin(t * .4) * 40, 960, 1.3, t, 0, 1) + eelpout(560 - Math.sin(t * .35) * 30, 1000, 1.15, t, 2, -1) + eelpout(380 + (t * 8) % 80, 1160, 1.0, t, 4, 1);
  s += `<rect width="720" height="1280" fill="#06243a" opacity=".1"/>`;
  F.ov = ''; return s;
}
