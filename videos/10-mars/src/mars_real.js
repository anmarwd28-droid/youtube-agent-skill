// ===== realism pass for the Mars Short: shots 4, 13, 14, 15 =====
const MDEF2 = `<filter id="wallM" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -1.4 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="grassT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .12" numOctaves="2" seed="17"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .2  0 0 0 0 .05  0 0 0 -2 1.1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<linearGradient id="metalG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8dade"/><stop offset=".5" stop-color="#a8acb2"/><stop offset="1" stop-color="#7a7e84"/></linearGradient>`;
const PT2 = p => p[0].toFixed(1) + ',' + p[1].toFixed(1);
function treeE(x, y, h, seed) {
  const r = RS(seed); let s = `<path d="M${x - h * .03},${y} L${x - h * .012},${y - h * .5} L${x + h * .012},${y - h * .5} L${x + h * .03},${y}Z" fill="#5a4636"/>`;
  const bl = []; for (let i = 0; i < 16; i++) bl.push([x + (r() - .5) * h * .55, y - h * (.45 + r() * .5), h * (.1 + r() * .09)]);
  bl.forEach(b => { s += `<circle cx="${b[0]}" cy="${b[1]}" r="${b[2]}" fill="#2e4a1e"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .2}" cy="${b[1] - b[2] * .25}" r="${b[2] * .78}" fill="#4a6e2e"/>`; });
  bl.forEach(b => { s += `<circle cx="${b[0] - b[2] * .35}" cy="${b[1] - b[2] * .4}" r="${b[2] * .42}" fill="#6e9442"/>`; });
  return s;
}
// a flat-roofed Baghdad house: plastered walls, framed windows, an AC unit, a rooftop water tank and dish
function houseE(x, base, w, h, col, seed) {
  const r = RS(seed); let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallM)" opacity=".5"/><rect x="${x - 3}" y="${base - h - 10}" width="${w + 6}" height="10" fill="${mix(col, '#000000', .15)}"/>`;
  const rows = h > 120 ? 2 : 1; for (let j = 0; j < rows; j++) for (let i = 0; i < Math.max(1, Math.floor(w / 46)); i++) { const wx = x + 12 + i * 46, wy = base - h + 22 + j * 64;
    s += `<rect x="${wx - 3}" y="${wy - 3}" width="30" height="36" fill="${mix(col, '#ffffff', .3)}"/><rect x="${wx}" y="${wy}" width="24" height="30" fill="#4a6a88"/><rect x="${wx}" y="${wy}" width="10" height="30" fill="#fff" opacity=".18"/><path d="M${wx + 12},${wy} v30" stroke="#ddd" stroke-width="1.5"/>`; }
  s += `<rect x="${x + w - 30}" y="${base - h + 40}" width="22" height="14" fill="#e8e8e8"/><rect x="${x + w - 28}" y="${base - h + 43}" width="18" height="2" fill="#999"/>`;
  s += `<rect x="${x + 10}" y="${base - h - 34}" width="26" height="24" rx="4" fill="${r() > .5 ? '#2a2a2a' : '#e8e8e8'}"/><rect x="${x + 8}" y="${base - h - 36}" width="30" height="4" fill="#666"/>`;
  if (w > 60) s += `<path d="M${x + w - 24},${base - h - 10} l0,-14" stroke="#777" stroke-width="2"/><ellipse cx="${x + w - 24}" cy="${base - h - 30}" rx="10" ry="7" fill="#d8d8d8" transform="rotate(-25,${x + w - 24},${base - h - 30})"/>`;
  return s;
}
// 4: Earth vs Mars – the Earth half is now a real Baghdad back yard; the Mars half and the physics are unchanged
function sceneJump(t) {
  const PPM = 112, gy = 1130;
  let s = `<defs>${MDEF}${MDEF2}<linearGradient id="eSkJ2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7cc2"/><stop offset=".7" stop-color="#a8cce8"/><stop offset="1" stop-color="#dcebf4"/></linearGradient><radialGradient id="eSun"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".1" stop-color="#fff6d0" stop-opacity=".6"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="lawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e9a3e"/><stop offset="1" stop-color="#3e6a26"/></linearGradient><linearGradient id="mSkJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a47862"/><stop offset="1" stop-color="#ecc8a2"/></linearGradient>` +
    `<clipPath id="cpE"><rect x="0" y="0" width="358" height="1280"/></clipPath><clipPath id="cpM"><rect x="362" y="0" width="358" height="1280"/></clipPath></defs>`;
  // Earth: sky, sun glow, houses with roof tanks, trees, the garden wall, lawn, a tiled patio
  s += `<g clip-path="url(#cpE)"><rect width="360" height="1280" fill="url(#eSkJ2)"/><circle cx="70" cy="470" r="230" fill="url(#eSun)"/><circle cx="70" cy="470" r="26" fill="#fffdf2"/>`;
  s += houseE(-20, 990, 130, 210, '#d8c8a8', 1) + houseE(118, 990, 100, 150, '#c8b494', 2) + houseE(226, 990, 150, 240, '#e0d2b4', 3);
  s += treeE(30, 1000, 230, 7) + palmR(300, 1010, 250, t);
  s += `<rect y="985" width="360" height="70" fill="#d6c6a6"/><rect y="985" width="360" height="70" fill="#fff" filter="url(#wallM)" opacity=".5"/><rect y="979" width="360" height="9" fill="#b8a888"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 64}" y="985" width="2" height="70" fill="#000" opacity=".1"/>`).join('');
  s += `<rect y="1055" width="360" height="230" fill="url(#lawn)"/><rect y="1055" width="360" height="230" fill="#000" filter="url(#grassT)" opacity=".55"/>`;
  for (let i = 0; i < 90; i++) { const r = RS(i + 40), x = r() * 360, y = 1056 + Math.pow(r(), 1.2) * 220, h = 5 + (y - 1055) * .04; s += `<path d="M${x},${y} l${(r() - .5) * 4},${-h} M${x + 2},${y} l${1 + r() * 3},${-h * .8}" stroke="${mix('#5a8a32', '#8ab84a', r())}" stroke-width="1.4"/>`; }
  s += `<path d="M120,${gy - 26} L300,${gy - 26} L330,${gy + 40} L90,${gy + 40}Z" fill="#b8b4ac"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${120 + i * 36},${gy - 26} L${90 + i * 48},${gy + 40}" stroke="#8a8680" stroke-width="2"/>`).join('') + `<path d="M105,${gy + 7} L315,${gy + 7}" stroke="#8a8680" stroke-width="2"/>`;
  for (let i = 0; i < 5; i++) s += `<path d="M${10 + i * 18},1062 q-4,-24 0,-40 q6,16 2,40" fill="${i % 2 ? '#c8443a' : '#e8c84a'}" opacity=".9"/><path d="M${12 + i * 18},1062 l0,-18" stroke="#3a6a2a" stroke-width="2"/>`;
  s += `</g>`;
  // Mars half (unchanged)
  s += `<g clip-path="url(#cpM)"><rect x="360" width="360" height="1280" fill="url(#mSkJ)"/><circle cx="650" cy="470" r="12" fill="#fffaf2"/><circle cx="650" cy="470" r="70" fill="#fff0dc" opacity=".3" filter="url(#soft)"/>` +
    `<path d="M360,930 Q450,880 540,915 T720,905 L720,${gy} L360,${gy}Z" fill="#b8785a" filter="url(#reliefM)"/>` + dome(660, 940, 40, .4, 5) + `<rect x="360" y="${gy - 6}" width="360" height="160" fill="#9a4e2a" filter="url(#reliefM)"/><rect x="360" y="${gy - 6}" width="360" height="160" fill="#000" filter="url(#grainM)" opacity=".4"/>` +
    mrock(420, gy + 60, 30, 18, 5, 1) + mrock(690, gy + 90, 24, 14, 6, 1) + `</g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  const ruler = x => { let r = `<rect x="${x - 4}" y="${gy - 1.6 * PPM}" width="8" height="${1.6 * PPM}" fill="#fff" opacity=".85"/>`;
    for (let m = 0; m <= 16; m++) { const yy = gy - m * PPM / 10; r += `<rect x="${x + 4}" y="${yy - 1}" width="${m % 5 ? 8 : 16}" height="2" fill="#fff"/>`; }
    [.5, 1, 1.5].forEach(m => { r += `<text x="${x + 26}" y="${gy - m * PPM + 7}" text-anchor="start" font-family="Noto Naskh Arabic" font-weight="700" font-size="18" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${AR(m)} م</text>`; }); return r; };
  s += ruler(40) + ruler(402);
  const j0 = WS(2, 13), sc = 1 - ramp(t, j0 - .3, j0), cnt = ease(ramp(t, WS(2, 6), WS(2, 6) + 1.1));
  const jumpH = (T, H, crouch) => { if (t < j0) return [0, 0]; const ph = (t - j0) % (T + crouch); if (ph < crouch) return [0, Math.sin(Math.PI * ph / crouch)]; const u = (ph - crouch) / T; return [4 * H * u * (1 - u), 0]; };
  const [hE, cE] = jumpH(.64, .5 * PPM, .26), [hM, cM] = jumpH(1.67, 1.3 * PPM, .26), lift = 14 * sc;
  s += scale(200, gy, AR(Math.round(70 * cnt)) + ' كغ', sc) + scale(560, gy, AR(Math.round(27 * cnt)) + ' كغ', sc);
  s += person(196, gy - lift - hE + 8 * cE, { s: .62, face: 1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: .1 });
  s += astro(556, gy - lift - hM + 8 * cM, { s: .62, face: 1, t });
  if (t > j0 + .3) { const a = ramp(t, j0 + .3, j0 + .7);
    s += `<g opacity="${a}"><path d="M44,${gy - .5 * PPM} h300" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/><path d="M406,${gy - 1.3 * PPM} h300" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/>` +
      `<rect x="246" y="${gy - .5 * PPM - 48}" width="100" height="40" rx="10" fill="#f4c76b"/><text x="296" y="${gy - .5 * PPM - 18}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#1c140a">٥٠ سم</text>` +
      `<rect x="604" y="${gy - 1.3 * PPM - 48}" width="104" height="40" rx="10" fill="#f4c76b"/><text x="656" y="${gy - 1.3 * PPM - 18}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#1c140a">١٫٣ م</text></g>`; }
  s += `<text x="180" y="1236" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">الأرض</text><text x="540" y="1236" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">المريخ</text>`;
  F.ov = ''; return s;
}

// 13: the buried home in cut-away at real scale (≈96 px per metre): layered shell, bunk beds, table, galley, screen, life support, plants, the hatch shaft; a ribbed habitat in a lava tube
function sceneUnder(t) {
  const gy = 560, hx = 24, hy = 790, hw = 470, hh = 262, fl = hy + hh - 26, PX = 96;
  let s = `<defs>${MDEF}${MDEF2}<linearGradient id="skU2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a47862"/><stop offset="1" stop-color="#ecc8a2"/></linearGradient><linearGradient id="soilU2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b86a40"/><stop offset=".3" stop-color="#8a4a2a"/><stop offset="1" stop-color="#4a2414"/></linearGradient>` +
    `<linearGradient id="inU" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6eee0"/><stop offset="1" stop-color="#e2d6c2"/></linearGradient><radialGradient id="ledU"><stop offset="0" stop-color="#fff8e8" stop-opacity=".8"/><stop offset="1" stop-color="#fff8e8" stop-opacity="0"/></radialGradient>` +
    `<clipPath id="modC"><rect x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="56"/></clipPath></defs>`;
  s += `<rect width="720" height="${gy}" fill="url(#skU2)"/><circle cx="600" cy="450" r="12" fill="#fffaf2"/><circle cx="600" cy="450" r="70" fill="#fff0dc" opacity=".3" filter="url(#soft)"/>`;
  s += `<path d="M-20,${gy} Q100,${gy - 26} 200,${gy - 40} Q320,${gy - 56} 440,${gy - 36} Q540,${gy - 16} 740,${gy}Z" fill="#b8784e" filter="url(#reliefM)"/>`;
  s += `<rect y="${gy - 2}" width="720" height="${1282 - gy}" fill="url(#soilU2)"/><rect y="${gy}" width="720" height="${1280 - gy}" fill="#000" filter="url(#soilX)" opacity=".8"/>`;
  for (let i = 0; i < 44; i++) { const r = RS(i + 2000); s += `<ellipse cx="${r() * 720}" cy="${gy + 30 + r() * 690}" rx="${4 + r() * 14}" ry="${3 + r() * 8}" fill="#3a1a0c" opacity=".5"/>`; }
  s += `<path d="M-20,${gy} L740,${gy}" stroke="#d89a70" stroke-width="3" opacity=".7"/>`;
  // shell: regolith-facing outer skin, insulation, inner wall
  s += `<rect x="${hx - 16}" y="${hy - 16}" width="${hw + 32}" height="${hh + 32}" rx="72" fill="#5e5c5a"/><rect x="${hx - 8}" y="${hy - 8}" width="${hw + 16}" height="${hh + 16}" rx="64" fill="#cfc4ae"/><rect x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="56" fill="url(#inU)"/>`;
  s += `<g clip-path="url(#modC)">`;
  for (let i = 1; i < 8; i++) s += `<path d="M${hx + i * hw / 8},${hy} v${hh}" stroke="#000" stroke-width="1" opacity=".07"/>`;
  s += `<rect x="${hx}" y="${hy + 8}" width="${hw}" height="16" fill="#b8b4ae"/><rect x="${hx}" y="${hy + 26}" width="${hw}" height="7" rx="3" fill="#9a9ea4"/>` + [90, 200, 310, 420].map(x => `<rect x="${x}" y="${hy + 24}" width="54" height="5" rx="2" fill="#fffaf0"/><ellipse cx="${x + 27}" cy="${hy + 60}" rx="70" ry="44" fill="url(#ledU)"/>`).join('');
  s += `<rect x="${hx}" y="${fl}" width="${hw}" height="${hh}" fill="#8a847a"/>` + Array.from({ length: 24 }, (_, i) => `<path d="M${hx + i * 20},${fl} v14" stroke="#6a645a" stroke-width="2"/>`).join('');
  // bunk bed, 2 m long, two tiers, pillows, blankets, ladder, a curtain, lockers above
  const bx = 46, bw = 2 * PX;
  s += `<rect x="${bx}" y="${hy + 44}" width="${bw}" height="34" fill="#c8c2b6"/>` + [0, 1, 2, 3].map(i => `<rect x="${bx + 4 + i * 48}" y="${hy + 48}" width="42" height="26" fill="#dcd6ca" stroke="#a8a294"/><circle cx="${bx + 40 + i * 48}" cy="${hy + 61}" r="2" fill="#777"/>`).join('');
  [fl - 30, fl - 30 - .95 * PX].forEach((y, j) => { s += `<rect x="${bx}" y="${y}" width="${bw}" height="8" fill="#7a7a80"/><rect x="${bx + 4}" y="${y - 16}" width="${bw - 8}" height="16" rx="5" fill="#f0ece4"/><rect x="${bx + 46}" y="${y - 20}" width="${bw - 52}" height="14" rx="6" fill="${j ? '#4a6a9a' : '#7a4a4a'}"/><ellipse cx="${bx + 24}" cy="${y - 20}" rx="18" ry="8" fill="#fbf8f2"/>`; });
  s += `<rect x="${bx - 4}" y="${fl - 30 - 1.25 * PX}" width="7" height="${1.25 * PX + 30}" fill="#6a6a70"/><rect x="${bx + bw - 3}" y="${fl - 30 - 1.25 * PX}" width="7" height="${1.25 * PX + 30}" fill="#6a6a70"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${bx + bw - 22}" y="${fl - 28 - i * 22}" width="22" height="3" fill="#6a6a70"/>`).join('') + `<path d="M${bx + bw - 26},${fl - 30 - 1.25 * PX} q-6,${.3 * PX} 0,${.3 * PX} q6,${.3 * PX} -2,${.28 * PX}" fill="#5a7a6a" opacity=".85"/>`;
  // table and stools (0.75 m), a wall screen with a video call from Earth, life-support panel
  const tx = 270; s += `<rect x="${tx}" y="${fl - .75 * PX}" width="90" height="7" fill="#d8d0c0"/><rect x="${tx + 40}" y="${fl - .75 * PX + 7}" width="8" height="${.75 * PX - 7}" fill="#8a8680"/><rect x="${tx - 20}" y="${fl - .45 * PX}" width="26" height="5" fill="#7a7a80"/><rect x="${tx - 9}" y="${fl - .45 * PX}" width="4" height="${.45 * PX}" fill="#7a7a80"/>`;
  s += `<rect x="${tx + 4}" y="${hy + 50}" width="84" height="54" rx="4" fill="#1a2430"/><circle cx="${tx + 30}" cy="${hy + 77}" r="17" fill="#3a7ad0"/><path d="M${tx + 22},${hy + 70} q8,-6 14,2 q4,8 -4,12" fill="#4a9a4a"/><rect x="${tx + 54}" y="${hy + 62}" width="26" height="32" rx="3" fill="#c8a68a"/><circle cx="${tx + 67}" cy="${hy + 72}" r="6" fill="#8a5a3a"/>`;
  s += person(tx + 60, fl, { s: .51, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .15 });
  // galley counter (0.9 m) with cabinets, a water dispenser; a plant shelf under pink LEDs; the second person
  const gx = 384; s += `<rect x="${gx}" y="${fl - .9 * PX}" width="96" height="${.9 * PX}" fill="#d0cabe"/><rect x="${gx}" y="${fl - .9 * PX}" width="96" height="6" fill="#9a9a9e"/>` + [0, 1].map(i => `<rect x="${gx + 6 + i * 46}" y="${fl - .9 * PX + 14}" width="40" height="${.9 * PX - 22}" fill="#e0dace" stroke="#aaa"/><rect x="${gx + 22 + i * 46}" y="${fl - .9 * PX + 20}" width="8" height="3" fill="#777"/>`).join('') +
    `<rect x="${gx + 60}" y="${fl - .9 * PX - 34}" width="22" height="34" rx="3" fill="#e8eef2"/><rect x="${gx + 64}" y="${fl - .9 * PX - 30}" width="14" height="14" fill="#9ccaf0"/>`;
  s += `<rect x="${gx}" y="${hy + 60}" width="96" height="8" fill="#9a9a9e"/><rect x="${gx + 4}" y="${hy + 54}" width="88" height="4" fill="#ff5fb0"/><ellipse cx="${gx + 48}" cy="${hy + 90}" rx="60" ry="30" fill="#ff7ac8" opacity=".18"/>` + Array.from({ length: 6 }, (_, i) => `<ellipse cx="${gx + 10 + i * 15}" cy="${hy + 56 + 14}" rx="7" ry="5" fill="${i % 2 ? '#5fae3a' : '#7cc84a'}" transform="translate(0,-4)"/>`).join('') + `<rect x="${gx}" y="${hy + 72}" width="96" height="8" fill="#9a9a9e"/>`;
  s += `<rect x="${gx - 40}" y="${hy + 54}" width="30" height="50" rx="3" fill="#2a3440"/>` + [0, 1, 2].map(i => `<circle cx="${gx - 32}" cy="${hy + 64 + i * 13}" r="3.5" fill="${['#4ade80', '#4ade80', '#f4c76b'][i]}"/><rect x="${gx - 26}" y="${hy + 62 + i * 13}" width="12" height="4" fill="#7a8a9a"/>`).join('');
  s += person(gx + 40, fl, { s: .5, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t });
  s += `</g>`;
  // the hatch and access shaft with ladder up to the surface airlock
  s += `<rect x="${hx + 368}" y="${gy}" width="40" height="${hy - gy}" fill="#9a948a"/><rect x="${hx + 372}" y="${gy}" width="32" height="${hy - gy}" fill="#5a5650"/>` + Array.from({ length: 8 }, (_, i) => `<rect x="${hx + 374}" y="${gy + 14 + i * 28}" width="28" height="3" fill="#b8b2a8"/>`).join('') + `<rect x="${hx + 362}" y="${hy - 14}" width="52" height="10" rx="4" fill="#7a7672"/>`;
  s += `<rect x="${hx + 344}" y="${gy - 74}" width="88" height="74" rx="12" fill="#cfc8bc"/><rect x="${hx + 366}" y="${gy - 58}" width="44" height="58" rx="6" fill="#4a4440"/><circle cx="${hx + 388}" cy="${gy - 34}" r="12" fill="none" stroke="#9a948a" stroke-width="3"/><rect x="${hx + 340}" y="${gy - 80}" width="96" height="8" rx="3" fill="#a8a296"/>`;
  s += astro(160, gy + 4, { s: .5, face: 1, t });
  s += `<g stroke="#f4c76b" stroke-width="3" fill="none"><path d="M${hx + hw + 30},${gy + 4} h12 v${hy - gy - 20} h-12"/></g><text x="${hx + hw + 50}" y="${(gy + hy) / 2 + 8}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#f4c76b" style="paint-order:stroke" stroke="#000" stroke-width="3">٢–٣ م تربة</text>`;
  // lava tube with a ribbed inflatable habitat and a pressurised link
  s += `<path d="M500,1110 C500,1050 560,1020 620,1022 C690,1024 730,1060 730,1110 C730,1180 680,1218 610,1216 C548,1214 500,1180 500,1110Z" fill="#1a0c06"/><path d="M506,1150 C540,1206 690,1206 726,1150" stroke="#3a1a0c" stroke-width="6" fill="none"/>`;
  s += `<rect x="528" y="1120" width="176" height="70" rx="35" fill="#efe8dc"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${552 + i * 26},1122 v66" stroke="#c8c0b0" stroke-width="3"/>`).join('') + [0, 1, 2].map(i => `<rect x="${560 + i * 44}" y="1140" width="20" height="16" rx="3" fill="#ffd89a"/>`).join('') + `<circle cx="616" cy="1150" r="110" fill="#ffc070" opacity=".1" filter="url(#soft)"/><rect x="500" y="1146" width="30" height="20" fill="#cfc8bc"/>`;
  s += `<text x="616" y="1252" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">كهف بركاني</text>`;
  const ra = ramp(t, WS(7, 13) - .6, WS(7, 13));
  for (let i = 0; i < 14; i++) { const r = RS(i + 2100), x = 30 + r() * 660, ph = pmod(t * .8 + r(), 1), y = 380 + ph * 290, stop = gy + 26 + r() * 70; if (y > stop + 20) continue;
    s += `<path d="M${x - 14},${y - 60} L${x},${Math.min(y, stop)}" stroke="#ffe04a" stroke-width="3" opacity="${.85 * (.3 + .7 * ra)}" stroke-linecap="round"/>` + (y > stop - 10 ? `<circle cx="${x}" cy="${stop}" r="8" fill="#fff6a0" opacity=".8" filter="url(#blur2)"/>` : ''); }
  F.ov = ''; return s;
}

// 14: inside a pressurised greenhouse tunnel, seen down its length: ribs, glass with dust, Mars outside, hydroponic racks under pink LEDs, a grated walkway, tanks and a hatch at the far end
function sceneFarm(t) {
  let s = marsLand(t, { id: 'fm2', hz: 770, sunX: 560, sunY: 470, seed: 10, rocks: 12 });
  const W = z => { const p = 1 / (1 + 3 * z); return (1 - p) / .75; };
  const arch = z => { const w = W(z); return { w, yf: lerp(1310, 850, w), hw: lerp(430, 96, w), ap: lerp(330, 650, w) }; };
  const ptA = (z, th) => { const a = arch(z); return [360 - a.hw * Math.cos(th), a.yf - (a.yf - a.ap) * Math.sin(th)]; };
  const pxm = z => { const a = arch(z); return (a.yf - a.ap) / 3.6; };
  const a0 = arch(0), a1 = arch(1);
  s += `<path d="M${360 - a0.hw},${a0.yf} A${a0.hw},${a0.yf - a0.ap} 0 0 1 ${360 + a0.hw},${a0.yf}Z" fill="#ffe4f2" opacity=".1"/>`;
  for (let i = 0; i < 70; i++) { const r = RS(i + 3000), z = r() * .9, th = .15 + r() * 2.8, p = ptA(z, th); s += `<circle cx="${p[0]}" cy="${p[1]}" r="${1 + 1.5 * (1 - W(z))}" fill="#c89070" opacity=".35"/>`; }
  s += `<path d="M${360 - a1.hw},${a1.yf} A${a1.hw},${a1.yf - a1.ap} 0 0 1 ${360 + a1.hw},${a1.yf}Z" fill="#d8d2c8"/><circle cx="360" cy="${a1.yf - 52}" r="34" fill="#a8a296"/><circle cx="360" cy="${a1.yf - 52}" r="27" fill="#5a5650"/><circle cx="360" cy="${a1.yf - 52}" r="12" fill="none" stroke="#c8c0b0" stroke-width="3"/>` +
    `<rect x="${360 - a1.hw + 10}" y="${a1.yf - 60}" width="26" height="58" rx="10" fill="#e8eef2"/><rect x="${360 + a1.hw - 36}" y="${a1.yf - 60}" width="26" height="58" rx="10" fill="#e8eef2"/>`;
  [.2, .45, .7, 1.0, 1.3, 1.57, 1.84, 2.1, 2.4, 2.7, 2.94].forEach(th => { const p = ptA(0, th), q = ptA(1, th); s += `<path d="M${PT2(p)} L${PT2(q)}" stroke="#d0ccc4" stroke-width="3" opacity=".8"/>`; });
  for (let i = 0; i <= 7; i++) { const z = i / 7, a = arch(z); s += `<path d="M${360 - a.hw},${a.yf} A${a.hw},${a.yf - a.ap} 0 0 1 ${360 + a.hw},${a.yf}" stroke="#e8e4dc" stroke-width="${lerp(18, 3, a.w)}" fill="none"/><path d="M${360 - a.hw},${a.yf} A${a.hw},${a.yf - a.ap} 0 0 1 ${360 + a.hw},${a.yf}" stroke="#8a867e" stroke-width="${lerp(4, 1, a.w)}" fill="none" transform="translate(${lerp(6, 1, a.w)},0)" opacity=".6"/>`; }
  { let d = ''; for (let i = 0; i <= 20; i++) d += (i ? ' L' : 'M') + PT2(ptA(i / 20, 1.57)); s += `<path d="${d}" stroke="#9aa0a8" stroke-width="10" fill="none"/>`; for (let i = 1; i < 7; i++) { const p = ptA(i / 7, 1.57), r_ = lerp(16, 4, W(i / 7)); s += `<circle cx="${p[0]}" cy="${p[1] + r_ + 6}" r="${r_}" fill="#7a7e84"/><path d="M${p[0] - r_},${p[1] + r_ + 6} h${2 * r_}" stroke="#c8ccd2" stroke-width="2" transform="rotate(${t * 400 % 360},${p[0]},${p[1] + r_ + 6})"/>`; } }
  // floor: grated walkway between the racks
  const fx = (z, side) => { const a = arch(z); return 360 + side * a.hw * .36; }, fy = z => arch(z).yf;
  s += `<path d="M${fx(0, -1)},${fy(0)} L${fx(1, -1)},${fy(1)} L${fx(1, 1)},${fy(1)} L${fx(0, 1)},${fy(0)}Z" fill="#7a7a80"/>`;
  for (let i = 0; i <= 14; i++) { const z = Math.pow(i / 14, 1.3); s += `<path d="M${fx(z, -1)},${fy(z)} L${fx(z, 1)},${fy(z)}" stroke="#4a4a50" stroke-width="${lerp(3, .8, W(z))}"/>`; }
  for (let i = -4; i <= 4; i++) s += `<path d="M${360 + i * a0.hw * .36 / 4.5},${fy(0)} L${360 + i * a1.hw * .36 / 4.5},${fy(1)}" stroke="#55555c" stroke-width="1.4"/>`;
  // racks on both sides: three lit tiers with plants (lettuce left, tomatoes and peppers right)
  const tiers = [.35, .9, 1.45];
  [-1, 1].forEach(side => {
    const inner = z => [fx(z, side), fy(z)], outer = z => { const a = arch(z); return [360 + side * a.hw * .8, a.yf]; };
    let rack = `M${PT2(inner(.04))} L${PT2(inner(.96))} L${PT2([outer(.96)[0], outer(.96)[1] - 1.8 * pxm(.96)])} L${PT2([outer(.04)[0], outer(.04)[1] - 1.8 * pxm(.04)])}Z`;
    s += `<path d="${rack}" fill="#3a3a44" opacity=".25"/>`;
    tiers.forEach((h, ti) => {
      const edge = z => { const p = inner(z); return [p[0], p[1] - h * pxm(z)]; }, back = z => { const p = outer(z); return [p[0], p[1] - h * pxm(z)]; };
      s += `<path d="M${PT2(edge(.04))} L${PT2(edge(.96))} L${PT2(back(.96))} L${PT2(back(.04))}Z" fill="#e8e8ea"/><path d="M${PT2(edge(.04))} L${PT2(edge(.96))}" stroke="#9a9aa0" stroke-width="${lerp(9, 2, W(.04))}"/>`;
      if (ti > 0) s += `<path d="M${PT2([edge(.04)[0], edge(.04)[1] - .48 * pxm(.04)])} L${PT2([edge(.96)[0], edge(.96)[1] - .48 * pxm(.96)])}" stroke="#ff5fb0" stroke-width="${lerp(6, 1.2, W(.04))}"/><path d="M${PT2([edge(.04)[0], edge(.04)[1] - .44 * pxm(.04)])} L${PT2([edge(.96)[0], edge(.96)[1] - .44 * pxm(.96)])}" stroke="#ff8ad0" stroke-width="${lerp(26, 4, W(.04))}" opacity=".18"/>`;
      for (let q = 13; q >= 0; q--) { const z = .06 + q / 14 * .88, m = pxm(z), e = edge(z), b = back(z), r = RS(side * 100 + ti * 20 + q);
        for (let c = 0; c < 2; c++) { const x = lerp(e[0], b[0], .25 + c * .45), y = lerp(e[1], b[1], .25 + c * .45);
          if (side < 0) s += Array.from({ length: 6 }, (_, k) => { const a = -Math.PI * (k / 5); return `<ellipse cx="${x + Math.cos(a) * .07 * m}" cy="${y - .04 * m + Math.sin(a) * .07 * m}" rx="${.09 * m}" ry="${.055 * m}" fill="${k % 2 ? '#5fae3a' : '#7cc84a'}" transform="rotate(${a * 57 + 90},${x + Math.cos(a) * .07 * m},${y - .04 * m + Math.sin(a) * .07 * m})"/>`; }).join('') + `<circle cx="${x}" cy="${y - .06 * m}" r="${.04 * m}" fill="#a8e070"/>`;
          else { s += `<path d="M${x},${y} q${.05 * m},${-.25 * m} 0,${-.45 * m}" stroke="#3e7a2a" stroke-width="${Math.max(1, .025 * m)}" fill="none"/><ellipse cx="${x - .08 * m}" cy="${y - .2 * m}" rx="${.1 * m}" ry="${.05 * m}" fill="#4a8e32"/><ellipse cx="${x + .08 * m}" cy="${y - .34 * m}" rx="${.1 * m}" ry="${.05 * m}" fill="#4a8e32"/>`;
            if (r() > .3) s += `<circle cx="${x + .05 * m}" cy="${y - .16 * m}" r="${.05 * m}" fill="${ti === 1 ? '#f08a24' : '#e53935'}"/>`; if (r() > .5) s += `<circle cx="${x - .04 * m}" cy="${y - .3 * m}" r="${.045 * m}" fill="#e53935"/>`; } } }
      s += `<path d="M${PT2([edge(.04)[0], edge(.04)[1] + .05 * pxm(.04)])} L${PT2([edge(.96)[0], edge(.96)[1] + .05 * pxm(.96)])}" stroke="#2a6aa8" stroke-width="${lerp(4, 1, W(.04))}"/>`; }); });
  // a grower in the walkway (1.75 m at this depth), checking the plants
  const zp = .32, mp = pxm(zp); s += person(330, fy(zp), { s: 1.72 * mp / 320, face: -1, top: '#4a7a9a', pants: '#3a3a42', skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: -.05 });
  s += `<rect width="720" height="1280" fill="#ff7ad0" opacity=".05"/>`;
  F.ov = ''; return s;
}

// 15: buried ice: a rover-mounted drill sends a heated probe into the ice sheet, melts a pocket of water and pumps it to a tank by the habitat
function sceneIce(t) {
  const gy = 760, dk = ease(ramp(t, S0(8) + 2.4, WS(8, 8) + .3)), melt = ease(ramp(t, WS(8, 8), L(8).end + .2));
  let s = marsLand(t, { id: 'ic2', hz: 640, sunX: 600, sunY: 470, seed: 11, rocks: 6, avoid: [[180, 520, 680, 770]] });
  s += `<defs>${MDEF2}<linearGradient id="iceL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4eef4"/><stop offset="1" stop-color="#b8cede"/></linearGradient><radialGradient id="meltG"><stop offset="0" stop-color="#5aa8e8"/><stop offset=".8" stop-color="#2a6aa8"/><stop offset="1" stop-color="#8ac0e8"/></radialGradient><radialGradient id="heatG"><stop offset="0" stop-color="#ffb060" stop-opacity=".7"/><stop offset="1" stop-color="#ff8040" stop-opacity="0"/></radialGradient></defs>`;
  s += dome(610, 700, 70, .7, 12);
  s += `<rect y="${gy}" width="720" height="70" fill="#9a5432"/><rect y="${gy + 70}" width="720" height="60" fill="#7e4428"/><rect y="${gy}" width="720" height="130" fill="#000" filter="url(#soilX)" opacity=".7"/>`;
  for (let i = 0; i < 30; i++) { const r = RS(i + 3100); s += `<ellipse cx="${r() * 720}" cy="${gy + 20 + r() * 100}" rx="${4 + r() * 10}" ry="${3 + r() * 6}" fill="#4a2010" opacity=".55"/>`; }
  s += `<path d="M-20,890 Q200,872 360,884 T740,874 L740,1080 Q520,1094 360,1082 T-20,1088Z" fill="url(#iceL)"/><path d="M-20,890 Q200,872 360,884 T740,874 L740,1080 Q520,1094 360,1082 T-20,1088Z" fill="#fff" filter="url(#iceX)" opacity=".85"/>`;
  for (let q = 0; q < 6; q++) s += `<path d="M-20,${910 + q * 30} Q200,${900 + q * 30} 360,${908 + q * 30} T740,${900 + q * 30}" stroke="#9a8a7a" stroke-width="${2 + (q % 2) * 2}" fill="none" opacity=".35"/>`;
  s += `<rect y="1086" width="720" height="200" fill="#6a3a24"/><rect y="1086" width="720" height="200" fill="#c8dcea" filter="url(#iceX)" opacity=".35"/>`;
  s += `<text x="30" y="1000" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#1e3a5a">جليد مائي</text>`;
  s += `<path d="M-20,${gy} L740,${gy}" stroke="#d89a70" stroke-width="3" opacity=".7"/>`;
  // rover with solar deck and drill mast
  const rx = 330, depth = lerp(gy, 990, dk);
  s += `<rect x="${rx - 120}" y="${gy - 96}" width="240" height="10" fill="#1c2a5a"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${rx - 120 + i * 30},${gy - 96} v10" stroke="#8aa" stroke-width="1"/>`).join('') + `<rect x="${rx - 90}" y="${gy - 86}" width="180" height="48" rx="6" fill="#e4e0d8"/><rect x="${rx - 90}" y="${gy - 86}" width="180" height="12" fill="#fff" opacity=".4"/><rect x="${rx - 70}" y="${gy - 70}" width="40" height="18" fill="#2a3440"/><circle cx="${rx - 62}" cy="${gy - 61}" r="3" fill="#4ade80"/>`;
  [-70, 0, 70].forEach(dx => { s += `<circle cx="${rx + dx}" cy="${gy - 18}" r="18" fill="#3a3a3e"/><circle cx="${rx + dx}" cy="${gy - 18}" r="8" fill="#9a9aa0"/><path d="M${rx + dx},${gy - 38} v-6" stroke="#777" stroke-width="5"/>`; });
  s += `<path d="M${rx + 40},${gy - 86} L${rx + 40},${gy - 230} M${rx + 64},${gy - 86} L${rx + 64},${gy - 230} M${rx + 40},${gy - 120} L${rx + 64},${gy - 150} M${rx + 64},${gy - 120} L${rx + 40},${gy - 150} M${rx + 40},${gy - 180} L${rx + 64},${gy - 210} M${rx + 64},${gy - 180} L${rx + 40},${gy - 210}" stroke="#d9822b" stroke-width="5"/><rect x="${rx + 34}" y="${gy - 240}" width="36" height="14" fill="#555"/>`;
  s += `<rect x="${rx + 49}" y="${gy - 226}" width="6" height="${depth - gy + 226}" fill="#a8a8ae"/><rect x="${rx + 46}" y="${depth - 20}" width="12" height="24" rx="4" fill="#c85a2a"/>`;
  if (dk > .9) { s += `<circle cx="${rx + 52}" cy="${depth}" r="${30 + 50 * melt}" fill="url(#heatG)"/><ellipse cx="${rx + 52}" cy="${depth + 8}" rx="${8 + 34 * melt}" ry="${10 + 30 * melt}" fill="url(#meltG)" opacity=".9"/>`; }
  // insulated hose from the rover to the tank, with water moving in it
  s += `<path d="M${rx + 90},${gy - 50} Q${rx + 170},${gy - 70} 520,${gy - 40}" stroke="#d9822b" stroke-width="10" fill="none"/><path d="M${rx + 90},${gy - 50} Q${rx + 170},${gy - 70} 520,${gy - 40}" stroke="#f4b86a" stroke-width="3" fill="none" stroke-dasharray="6 10"/>`;
  if (melt > .1) for (let i = 0; i < 6; i++) { const ph = pmod(t * 1.1 + i / 6, 1); s += `<circle cx="${lerp(rx + 90, 520, ph)}" cy="${gy - 50 - Math.sin(ph * 3.1) * 14 + 10 * ph}" r="4" fill="#5ab0ff"/>`; }
  s += `<rect x="520" y="${gy - 110}" width="96" height="110" rx="14" fill="#e8e8ec"/><rect x="520" y="${gy - 110 + 110 * (1 - .15 - .6 * melt)}" width="96" height="${110 * (.15 + .6 * melt)}" rx="10" fill="#4aa0e8" opacity=".6"/><rect x="524" y="${gy - 106}" width="10" height="100" rx="4" fill="#fff" opacity=".4"/><text x="568" y="${gy - 44}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#0d2a4a">ماء</text>`;
  s += astro(150, gy + 2, { s: .5, face: 1, t });
  F.ov = ''; return s;
}
