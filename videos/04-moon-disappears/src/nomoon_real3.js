// 2: night forest (realistic): a great horned owl that hunts in the dark, a cottontail that hides from it
function barkTrunk(x, w, y0, y1, id, tone = 1) {
  return `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${mix('#07090d', '#000000', 1 - tone)}"/><stop offset=".35" stop-color="${mix('#2a2e36', '#000000', 1 - tone)}"/>` +
    `<stop offset=".6" stop-color="${mix('#1a1d24', '#000000', 1 - tone)}"/><stop offset="1" stop-color="${mix('#05070a', '#000000', 1 - tone)}"/></linearGradient></defs>` +
    `<rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" fill="url(#${id})"/><rect x="${x}" y="${y0}" width="${w}" height="${y1 - y0}" fill="#000" filter="url(#barkTex)" opacity="${.85 * tone}"/>`;
}
function owlReal(x, y, s, t, look) {
  const turn = Math.sin(t * .9) * look, bl = (pmod(t + .7, 3.4) < .14) ? .12 : 1, hx = turn * 9;
  const body = `M-58,-20 C-76,-92 -64,-172 -30,-196 C-10,-206 10,-206 30,-196 C64,-172 76,-92 58,-20 C40,12 -40,12 -58,-20Z`;
  let o = `<g transform="translate(${x},${y}) scale(${s})"><defs>` +
    `<radialGradient id="owB" cx=".42" cy=".3" r=".8"><stop offset="0" stop-color="#a08058"/><stop offset=".55" stop-color="#6e5234"/><stop offset="1" stop-color="#2a1c10"/></radialGradient>` +
    `<radialGradient id="owBel" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#d8c094"/><stop offset="1" stop-color="#a08458" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="owF" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#ecdcb6"/><stop offset=".65" stop-color="#c4a274"/><stop offset="1" stop-color="#7a5632"/></radialGradient>` +
    `<radialGradient id="owI" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff080"/><stop offset=".55" stop-color="#ffb21a"/><stop offset="1" stop-color="#9a5200"/></radialGradient>` +
    `<linearGradient id="owW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4e30"/><stop offset="1" stop-color="#22160c"/></linearGradient>` +
    `<clipPath id="owBC"><path d="${body}"/></clipPath><clipPath id="owHC"><ellipse cx="${hx * .3}" cy="-206" rx="64" ry="54"/></clipPath></defs>`;
  // tail under the branch
  o += `<path d="M-26,-8 L-20,50 L0,58 L20,50 L26,-8Z" fill="#3a2818"/>` + [-12, 0, 12].map(k => `<line x1="${k}" y1="0" x2="${k * 1.2}" y2="52" stroke="#1e140a" stroke-width="2"/>`).join('');
  // body + belly + barring
  o += `<path d="${body}" fill="url(#owB)"/><g clip-path="url(#owBC)"><ellipse cx="0" cy="-80" rx="44" ry="80" fill="url(#owBel)"/>`;
  const r = R(31); for (let i = 0; i < 16; i++) for (let j = 0; j < 9; j++) { const fx = -44 + j * 11 + (i % 2) * 5.5, fy = -160 + i * 10, w = 4 + r() * 2;
    o += `<path d="M${fx - w},${fy} q${w},${3 + r() * 2} ${w * 2},0" stroke="${r() > .5 ? '#3a2614' : '#5a3e22'}" stroke-width="${1.2 + r()}" fill="none" opacity="${.55 + r() * .35}"/>`; }
  for (let i = 0; i < 10; i++) { const fx = -30 + i * 6.5; o += `<path d="M${fx},-176 l${(r() - .5) * 4},${14 + r() * 10}" stroke="#2a1a0c" stroke-width="2.4" opacity=".6"/>`; }
  o += `</g>`;
  // folded wings with primaries
  [-1, 1].forEach(sd => {
    o += `<path d="M${sd * 56},-156 C${sd * 82},-112 ${sd * 80},-40 ${sd * 52},12 L${sd * 30},16 C${sd * 46},-40 ${sd * 48},-112 ${sd * 40},-164Z" fill="url(#owW)"/>`;
    for (let k = 0; k < 6; k++) { const yy = -120 + k * 22; o += `<path d="M${sd * (46 + k * 2)},${yy} q${sd * 12},${14} ${sd * 4},${30}" stroke="#a88a62" stroke-width="1.6" fill="none" opacity=".55"/>`; }
    for (let k = 0; k < 4; k++) o += `<path d="M${sd * (36 + k * 5)},4 l${sd * 4},18" stroke="#120c06" stroke-width="5" stroke-linecap="round"/>`;
  });
  // head, ear tufts, facial disc
  o += `<path d="M-46,-238 C-62,-270 -60,-294 -50,-304 C-40,-284 -30,-262 -24,-246Z" fill="#4a3420"/><path d="M46,-238 C62,-270 60,-294 50,-304 C40,-284 30,-262 24,-246Z" fill="#4a3420"/>`;
  o += `<ellipse cx="${hx * .3}" cy="-206" rx="64" ry="54" fill="url(#owB)"/><g clip-path="url(#owHC)">`;
  for (let i = 0; i < 6; i++) for (let j = 0; j < 12; j++) { const fx = -60 + j * 11 + (i % 2) * 5, fy = -254 + i * 9;
    o += `<path d="M${fx - 4},${fy} q4,4 8,0" stroke="#2e1e10" stroke-width="1.4" fill="none" opacity=".5"/>`; }
  o += `</g>`;
  [-1, 1].forEach(sd => { o += `<ellipse cx="${hx + sd * 25}" cy="-204" rx="32" ry="31" fill="url(#owF)"/>`;
    o += `<path d="M${hx + sd * 25 - 30},-196 A31,31 0 0 0 ${hx + sd * 25 + 30},-196" stroke="#3a2412" stroke-width="3.4" fill="none" opacity=".75" transform="rotate(${sd * 10},${hx + sd * 25},-204)"/>`;
    for (let k = 0; k < 10; k++) { const a = k / 10 * 6.28; o += `<line x1="${hx + sd * 25 + Math.cos(a) * 18}" y1="${-206 + Math.sin(a) * 18}" x2="${hx + sd * 25 + Math.cos(a) * 29}" y2="${-206 + Math.sin(a) * 29}" stroke="#a8865a" stroke-width="1" opacity=".5"/>`; } });
  o += `<path d="M${hx - 8},-232 L${hx},-206 L${hx + 8},-232Z" fill="#5a3e22" opacity=".8"/>`;
  // eyes with lids, pupils and highlights
  [-1, 1].forEach(sd => { const ex = hx * 1.15 + sd * 24, ey = -210;
    o += `<circle cx="${ex}" cy="${ey}" r="17" fill="#1a1008"/><ellipse cx="${ex}" cy="${ey}" rx="15" ry="${15 * bl}" fill="url(#owI)"/>` +
      `<ellipse cx="${ex + turn * 2}" cy="${ey}" rx="7.5" ry="${7.5 * bl}" fill="#050302"/>` +
      `<path d="M${ex - 17},${ey - 4} Q${ex},${ey - 20 + 14 * (1 - bl)} ${ex + 17},${ey - 4} L${ex + 17},${ey - 18} L${ex - 17},${ey - 18}Z" fill="#4a3220"/>` +
      (bl > .5 ? `<circle cx="${ex - 4}" cy="${ey - 5}" r="3.2" fill="#fff" opacity=".95"/><circle cx="${ex + 5}" cy="${ey + 4}" r="1.4" fill="#fff" opacity=".6"/>` : ''); });
  // beak + bristles
  o += `<path d="M${hx - 7},-196 Q${hx},-172 ${hx + 6},-196 Q${hx},-201 ${hx - 7},-196Z" fill="#2a2622"/><path d="M${hx - 3},-194 Q${hx},-182 ${hx + 1},-193" stroke="#7a746a" stroke-width="1.4" fill="none"/>`;
  for (let k = 0; k < 8; k++) o += `<line x1="${hx}" y1="-198" x2="${hx + (k - 3.5) * 5}" y2="${-188 + Math.abs(k - 3.5) * 2}" stroke="#e8d8b8" stroke-width="1" opacity=".45"/>`;
  // feathered legs and talons around the branch
  [-1, 1].forEach(sd => { o += `<ellipse cx="${sd * 18}" cy="-10" rx="14" ry="12" fill="#9a7a52"/>`;
    for (let k = 0; k < 3; k++) o += `<path d="M${sd * 18 + (k - 1) * 8},-4 q${(k - 1) * 4},14 ${(k - 1) * 6},20" stroke="#6a6458" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="${sd * 18 + (k - 1) * 14}" cy="17" r="2.6" fill="#111"/>`; });
  // starlight rim
  o += `<path d="${body}" fill="none" stroke="#9fb6d8" stroke-width="2.5" opacity=".18"/><ellipse cx="${hx * .3}" cy="-206" rx="64" ry="54" fill="none" stroke="#9fb6d8" stroke-width="2" opacity=".16"/></g>`;
  return o;
}
function rabbitReal(x, y, s, t, hide) {
  const nose = Math.sin(t * 9) * 1.4, earA = Math.sin(t * .8) * 4 + (1 - hide) * 0;
  const haunch = `M-72,0 C-98,-12 -102,-72 -72,-98 C-42,-122 10,-112 30,-82 C46,-58 48,-20 36,0Z`;
  let o = `<g transform="translate(${x},${y}) scale(${s})"><defs>` +
    `<radialGradient id="rbF" cx=".45" cy=".35" r=".75"><stop offset="0" stop-color="#b8a68c"/><stop offset=".6" stop-color="#806c56"/><stop offset="1" stop-color="#3a2e24"/></radialGradient>` +
    `<linearGradient id="rbE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b07a6a"/><stop offset="1" stop-color="#e0b0a0"/></linearGradient>` +
    `<radialGradient id="rbEy" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#4a3420"/><stop offset=".6" stop-color="#140c06"/><stop offset="1" stop-color="#000"/></radialGradient>` +
    `<clipPath id="rbC"><path d="${haunch}"/></clipPath></defs>`;
  o += `<ellipse cx="-10" cy="2" rx="90" ry="10" fill="#000" opacity=".45" filter="url(#blur2)"/>`;
  // back ear
  o += `<g transform="rotate(${-8 + earA},56,-132)"><path d="M48,-132 C30,-190 34,-232 48,-238 C60,-232 66,-190 62,-132Z" fill="#7a6650"/></g>`;
  o += `<path d="${haunch}" fill="url(#rbF)"/><g clip-path="url(#rbC)">`;
  const r = R(12); for (let i = 0; i < 160; i++) { const fx = -100 + r() * 140, fy = -120 + r() * 120;
    o += `<line x1="${fx}" y1="${fy}" x2="${fx + 5 + r() * 4}" y2="${fy - 4 - r() * 4}" stroke="${r() > .5 ? '#cbb89c' : '#4a3a2c'}" stroke-width="1" opacity=".45"/>`; }
  o += `</g>`;
  o += `<path d="M20,-82 C48,-88 62,-60 58,-30 C56,-12 50,0 42,0 L24,0 C28,-24 24,-52 10,-68Z" fill="#9a8670"/><path d="M28,-70 C44,-70 50,-48 46,-26" stroke="#d8ccb8" stroke-width="6" opacity=".35" fill="none"/>`;
  o += `<ellipse cx="46" cy="-4" rx="11" ry="6" fill="#a8947c"/><ellipse cx="58" cy="-3" rx="10" ry="5.5" fill="#b4a088"/>`;
  // head
  o += `<path d="M30,-98 C26,-128 50,-148 78,-142 C100,-138 114,-120 112,-106 C110,-94 98,-88 84,-86 C66,-82 40,-82 30,-98Z" fill="url(#rbF)"/>` +
       `<ellipse cx="96" cy="-104" rx="16" ry="11" fill="#d4c6ae" opacity=".8"/><path d="M${109 + nose * .3},-110 q4,3 1,7 q-4,1 -6,-3Z" fill="#7a4a42"/><path d="M104,-100 q2,6 -4,9" stroke="#3a2a22" stroke-width="1.4" fill="none"/>`;
  for (let k = 0; k < 4; k++) o += `<path d="M104,${-104 + k * 3} q${22 + k * 4},${-6 + k * 5 + nose} ${40 + k * 6},${-4 + k * 8}" stroke="#e8e2d6" stroke-width=".9" fill="none" opacity=".55"/>`;
  o += `<ellipse cx="78" cy="-120" rx="10" ry="11" fill="#e8dcc8" opacity=".7"/><ellipse cx="78" cy="-120" rx="8" ry="9" fill="url(#rbEy)"/><circle cx="81" cy="-123" r="2.6" fill="#fff" opacity=".9"/>`;
  // front ear with pink inner
  o += `<g transform="rotate(${-14 - earA},60,-134)"><path d="M52,-134 C40,-196 48,-238 64,-242 C78,-236 82,-192 72,-134Z" fill="#8c7860"/><path d="M58,-140 C50,-190 56,-226 64,-230 C72,-224 74,-190 68,-140Z" fill="url(#rbE)" opacity=".85"/></g>`;
  // tail puff
  o += `<circle cx="-94" cy="-34" r="16" fill="#f2ede4" filter="url(#blur1)"/><circle cx="-92" cy="-36" r="11" fill="#fff"/>`;
  o += `<path d="${haunch}" fill="none" stroke="#9fb6d8" stroke-width="2" opacity=".15"/></g>`;
  return o;
}
function fern(x, y, s, flip, t, col) {
  let o = `<g transform="translate(${x},${y}) scale(${flip * s},${s})">`;
  for (let f = 0; f < 4; f++) { const a = -1.9 + f * .42 + Math.sin(t * .8 + f) * .02, len = 220 - f * 20;
    const ex = Math.cos(a) * len, ey = Math.sin(a) * len, cx = Math.cos(a + .3) * len * .6, cy = Math.sin(a + .3) * len * .6;
    o += `<path d="M0,0 Q${cx},${cy} ${ex},${ey}" stroke="${col}" stroke-width="3" fill="none"/>`;
    for (let k = 1; k < 16; k++) { const u = k / 16, px = 2 * (1 - u) * u * cx + u * u * ex, py = 2 * (1 - u) * u * cy + u * u * ey, ll = 30 * (1 - u * .8);
      o += `<path d="M${px},${py} q${-ll * .4},${-ll * .2} ${-ll},${ll * .3} M${px},${py} q${ll * .5},${-ll * .4} ${ll},${-ll * .1}" stroke="${col}" stroke-width="${3.5 * (1 - u * .6)}" fill="none" stroke-linecap="round"/>`; } }
  return o + `</g>`;
}
function sceneForest(t) {
  const st = S0(2), hide = ease(ramp(t, WS(2, 10), WS(2, 10) + .7)), owlOn = ease(ramp(t, WS(2, 5) - .3, WS(2, 5) + .3));
  let s = `<defs><linearGradient id="skF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02040a"/><stop offset=".55" stop-color="#0a1422"/><stop offset="1" stop-color="#121c26"/></linearGradient>` +
    `<filter id="barkTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .45" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .02  0 0 0 0 .02  0 0 0 0 .03  0 0 0 -2.2 1.25"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<filter id="soilTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05 .12" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .18  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -1.8 1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<radialGradient id="starL" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#9fb6d8" stop-opacity=".16"/><stop offset="1" stop-color="#9fb6d8" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="720" height="1280" fill="url(#skF)"/>` + stars(.75, t);
  // far, hazy trunks
  const r = R(4); for (let i = 0; i < 16; i++) { const x = i * 48 + r() * 30 - 30, w = 8 + r() * 14; s += `<rect x="${x}" y="260" width="${w}" height="800" fill="#1c2a3a" opacity="${.35 + r() * .25}"/>`; }
  s += `<rect y="760" width="720" height="260" fill="#2a3a52" opacity=".35" filter="url(#haze)"/>`;
  // mid trunks with bark
  [[150, 34], [250, 22], [420, 30], [530, 26]].forEach(([x, w], i) => { s += `<g opacity=".8">${barkTrunk(x, w, 200, 1060, 'tm' + i, .7)}</g>`; });
  s += `<ellipse cx="360" cy="940" rx="520" ry="70" fill="#34465e" opacity=".3" filter="url(#haze)"/>`;
  // canopy silhouette at the top
  const rc = R(15); let can = ''; for (let i = 0; i < 70; i++) { const x = rc() * 760 - 20, y = rc() * 230 - 30, rx = 30 + rc() * 50; can += `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .5}" fill="#03050a"/>`; }
  s += can;
  // big near trunks with moss
  s += barkTrunk(-50, 170, 0, 1280, 'tnL', 1) + barkTrunk(600, 170, 0, 1280, 'tnR', 1);
  for (let i = 0; i < 26; i++) { const rm = R(i + 300), side = i % 2, x = side ? 600 + rm() * 20 : 100 + rm() * 20, y = 500 + rm() * 700; s += `<ellipse cx="${x}" cy="${y}" rx="${6 + rm() * 10}" ry="${10 + rm() * 18}" fill="#1e2e18" opacity=".8" filter="url(#blur1)"/>`; }
  // branch with bark texture, twigs and leaves
  s += `<path d="M100,628 C240,610 380,640 540,600 L542,622 C380,662 240,636 100,656Z" fill="#1a1a1e"/><path d="M100,628 C240,610 380,640 540,600 L542,622 C380,662 240,636 100,656Z" fill="#000" filter="url(#barkTex)" opacity=".9"/>` +
       `<path d="M100,630 C240,612 380,642 540,602" stroke="#5a6a80" stroke-width="2" opacity=".35" fill="none"/>` +
       `<path d="M430,630 C460,590 480,570 520,548" stroke="#121216" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 9; i++) { const rl = R(i + 77), lx = 470 + rl() * 70, ly = 540 + rl() * 50; s += `<ellipse cx="${lx}" cy="${ly}" rx="14" ry="6" transform="rotate(${rl() * 80 - 40},${lx},${ly})" fill="#0e1a10"/>`; }
  s += `<g opacity="${.45 + .55 * owlOn}">${owlReal(300, 632, 1.05, t, owlOn)}</g>`;
  s += `<circle cx="${300}" cy="${632 - 221}" r="${80 * owlOn}" fill="#ffb21a" opacity="${.07 * owlOn}" filter="url(#soft)"/>`;
  // forest floor: soil, leaf litter, burrow
  s += `<path d="M-20,1040 C200,1015 420,1035 740,1005 L740,1300 L-20,1300Z" fill="#1a1812"/><path d="M-20,1040 C200,1015 420,1035 740,1005 L740,1300 L-20,1300Z" fill="#fff" filter="url(#soilTex)" opacity=".8"/>`;
  const rl = R(41); for (let i = 0; i < 220; i++) { const lx = rl() * 740 - 10, ly = 1030 + rl() * 250, c = ['#3a2a18', '#4a3820', '#2a2414', '#5a4426'][Math.floor(rl() * 4)];
    s += `<ellipse cx="${lx}" cy="${ly}" rx="${5 + rl() * 7}" ry="${2 + rl() * 3}" transform="rotate(${rl() * 180},${lx},${ly})" fill="${c}" opacity="${.6 + rl() * .4}"/>`; }
  s += `<ellipse cx="520" cy="1074" rx="74" ry="24" fill="#0a0806"/><ellipse cx="520" cy="1068" rx="62" ry="16" fill="#000"/><path d="M446,1074 Q520,1046 594,1074" stroke="#2e261a" stroke-width="6" fill="none"/>`;
  const hx = lerp(420, 512, hide), hy = 1066 + hide * 70 - Math.sin(hide * Math.PI) * 40;
  s += `<defs><clipPath id="grd"><rect x="0" y="0" width="720" height="${hide > 0 ? 1068 : 1300}"/></clipPath></defs><g clip-path="url(#grd)">${rabbitReal(hx, hy, .95 - hide * .15, t, hide)}</g>`;
  // foreground ferns + grass
  s += fern(40, 1290, 1.3, 1, t, '#122016') + fern(700, 1300, 1.2, -1, t, '#0f1c12') + fern(250, 1300, .8, 1, t, '#16261a');
  let gr = ''; const rg = R(9); for (let i = 0; i < 70; i++) { const gx = rg() * 740 - 10, h = 20 + rg() * 46, sw = Math.sin(t * 1.5 + i) * 4; gr += `<path d="M${gx},1110 q${sw},-${h / 2} ${sw * 2 + 4},-${h}" stroke="#1c2e1e" stroke-width="2.6" fill="none"/>`; }
  s += gr;
  // fireflies + starlight from above
  for (let i = 0; i < 16; i++) { const rf = R(i + 70); const fx = 120 + rf() * 480 + Math.sin(t * .7 + i) * 30, fy = 760 + rf() * 300 + Math.cos(t * .9 + i) * 20, b = .5 + .5 * Math.sin(t * 3 + i * 2);
    s += `<circle cx="${fx}" cy="${fy}" r="12" fill="#d8ff7a" opacity="${.14 * b}" filter="url(#blur2)"/><circle cx="${fx}" cy="${fy}" r="2.4" fill="#eaff9a" opacity="${b}"/>`; }
  s += `<rect width="720" height="1280" fill="url(#starL)"/>`;
  F.ov = '';
  return s;
}
// 3: coral reef at night (realistic): moonlight shafts, caustics, branching coral, brain coral, sea fan, anemone with clownfish
//@@FISH@@
function staghorn(x, y, sc, col, tip, seed, t) {
  const r = R(seed), id = 'sg' + seed; let o = `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="${y}" x2="0" y2="${y - 190 * sc}"><stop offset="0" stop-color="${mix(col, '#000000', .45)}"/><stop offset=".6" stop-color="${col}"/><stop offset="1" stop-color="${tip}"/></linearGradient></defs><g fill="url(#${id})">`;
  const br = (bx, by, a, len, w, d) => { const sw = Math.sin(t * 1.1 + seed + d) * .015; a += sw; const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len, nx = -Math.sin(a), ny = Math.cos(a), w2 = w * .7;
    o += `<polygon points="${bx + nx * w},${by + ny * w} ${ex + nx * w2},${ey + ny * w2} ${ex - nx * w2},${ey - ny * w2} ${bx - nx * w},${by - ny * w}"/><circle cx="${ex}" cy="${ey}" r="${w2}"/>`;
    if (d < 4) { const n = r() > .4 ? 2 : 3; for (let k = 0; k < n; k++) br(ex, ey, a + (k - (n - 1) / 2) * (.45 + r() * .25), len * (.68 + r() * .12), w2, d + 1); } };
  br(x, y, -Math.PI / 2, 52 * sc, 9 * sc, 0);
  o += `</g>`;
  for (let i = 0; i < 40; i++) { const px = x + (r() - .5) * 220 * sc, py = y - r() * 180 * sc; o += `<circle cx="${px}" cy="${py}" r="${1 + r()}" fill="${tip}" opacity=".35"/>`; }
  return o;
}
function brainCoral(x, y, rx, ry, seed) {
  const id = 'bc' + seed; let o = `<defs><radialGradient id="${id}" cx=".4" cy=".25" r=".9"><stop offset="0" stop-color="#e0cf96"/><stop offset=".6" stop-color="#a8945a"/><stop offset="1" stop-color="#4a3e22"/></radialGradient>` +
    `<clipPath id="${id}c"><path d="M${x - rx},${y} A${rx},${ry} 0 0 1 ${x + rx},${y}Z"/></clipPath></defs><path d="M${x - rx},${y} A${rx},${ry} 0 0 1 ${x + rx},${y}Z" fill="url(#${id})"/><g clip-path="url(#${id}c)">`;
  for (let i = 0; i < 11; i++) { const yy = y - ry + i * ry / 10; let d = `M${x - rx},${yy}`; for (let xx = x - rx; xx <= x + rx; xx += 8) d += ` L${xx},${yy + Math.sin(xx * .09 + i * 1.7) * 5 + Math.sin(xx * .031 + i) * 3}`;
    o += `<path d="${d}" stroke="#4a3a1e" stroke-width="3" fill="none" opacity=".55"/><path d="${d}" stroke="#f0e2b0" stroke-width="1.2" fill="none" opacity=".4" transform="translate(0,-2.5)"/>`; }
  return o + `</g>`;
}
function seaFan(x, y, sc, t) {
  const sw = Math.sin(t * .9) * 2.5; let o = `<g transform="translate(${x},${y}) rotate(${sw}) scale(${sc})">`; const r = R(88);
  const ends = []; for (let i = 0; i < 11; i++) { const a = -Math.PI / 2 + (i - 5) * .14, L = 160 + r() * 30; ends.push([Math.cos(a) * L, Math.sin(a) * L]);
    o += `<path d="M0,0 Q${Math.cos(a) * L * .4},${Math.sin(a) * L * .55} ${ends[i][0]},${ends[i][1]}" stroke="#7a3a9a" stroke-width="${4 - Math.abs(i - 5) * .25}" fill="none"/>`; }
  for (let k = 1; k < 9; k++) { const u = k / 9; o += `<path d="M${ends.map(e => `${e[0] * u},${e[1] * u}`).join(' L')}" stroke="#a060c0" stroke-width="1.4" fill="none" opacity=".75"/>`; }
  for (let i = 0; i < 60; i++) { const e = ends[Math.floor(r() * 11)], u = .2 + r() * .8; o += `<circle cx="${e[0] * u + (r() - .5) * 10}" cy="${e[1] * u}" r="1.3" fill="#e0b0ff" opacity=".6"/>`; }
  return o + `<rect x="-4" y="0" width="8" height="26" fill="#4a2a5a"/></g>`;
}
function anemone(x, y, sc, t) {
  let o = `<g transform="translate(${x},${y}) scale(${sc})"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#7a2a3a"/>`; const r = R(66);
  for (let i = 0; i < 46; i++) { const a = -Math.PI + (i / 45) * Math.PI, L = 50 + r() * 30, sw = Math.sin(t * 1.6 + i * .5) * 12;
    const ex = Math.cos(a) * 40 + Math.cos(a) * L * .4 + sw, ey = -Math.abs(Math.sin(a)) * L - 10, cx = Math.cos(a) * 30 + sw * .5, cy = -L * .5;
    o += `<path d="M${Math.cos(a) * 30},-4 Q${cx},${cy} ${ex},${ey}" stroke="#e07890" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M${lerp(Math.cos(a) * 30, ex, .6)},${lerp(-4, ey, .6)} L${ex},${ey}" stroke="#ffd0dc" stroke-width="6" stroke-linecap="round"/>`; }
  return o + `</g>`;
}
function clownfish(x, y, dir, t) {
  const w = Math.sin(t * 9) * 3;
  return `<g transform="translate(${x},${y}) scale(${dir},1)"><path d="M-30,0 C-20,-16 18,-18 30,-2 C18,14 -20,14 -30,0Z" fill="#ff7a1a"/><path d="M-30,0 l-14,${-10 + w} l0,${20} Z" fill="#ff7a1a"/>` +
    [-14, 4, 20].map(k => `<path d="M${k},-14 C${k + 5},-6 ${k + 5},6 ${k},14" stroke="#fff" stroke-width="6" fill="none"/><path d="M${k - 4},-13 C${k + 1},-5 ${k + 1},5 ${k - 4},13" stroke="#111" stroke-width="1.6" fill="none"/>`).join('') +
    `<circle cx="22" cy="-3" r="3" fill="#111"/><circle cx="23" cy="-4" r="1" fill="#fff"/></g>`;
}
function sceneReef(t) {
  const st = S0(3), beams = 1 - ease(ramp(t, WS(3, 9), WS(3, 12) + .4)), spawn = ease(ramp(t, WS(3, 7) - .2, WS(3, 7) + .6));
  let s = `<defs><linearGradient id="rfW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#0e2c48', '#1d5a86', beams)}"/><stop offset=".45" stop-color="#0a2a46"/><stop offset="1" stop-color="#03101c"/></linearGradient>` +
    `<linearGradient id="rfRay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ecff" stop-opacity=".35"/><stop offset="1" stop-color="#d8ecff" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="rfSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5a64"/><stop offset="1" stop-color="#1a2228"/></linearGradient>` +
    `<filter id="sandTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .9  0 0 0 0 .95  0 0 0 0 1  0 0 0 -1.6 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>` +
    `<rect width="720" height="1280" fill="url(#rfW)"/>`;
  // surface seen from below: Snell's window, ripples, blurred moon
  s += `<ellipse cx="360" cy="230" rx="420" ry="90" fill="#6aa8d8" opacity="${.18 + .22 * beams}" filter="url(#haze)"/><circle cx="360" cy="220" r="50" fill="#fff6dc" opacity="${.55 * beams}" filter="url(#soft)"/>`;
  for (let i = 0; i < 9; i++) { let d = `M-20,${190 + i * 16}`; for (let x = -20; x <= 740; x += 30) d += ` L${x},${190 + i * 16 + Math.sin(x * .03 + t * 1.6 + i) * 6}`;
    s += `<path d="${d}" stroke="#bfe0ff" stroke-width="2" fill="none" opacity="${(.12 + .18 * beams) * (1 - i / 10)}"/>`; }
  // light shafts
  s += `<g opacity="${beams}">` + [-1.1, -.55, -.1, .35, .8, 1.2].map((u, i) => { const sw = Math.sin(t * .4 + i) * 18; return `<polygon points="${360 + u * 120 + sw},230 ${360 + u * 120 + 34 + sw},230 ${360 + u * 300 + 90},1280 ${360 + u * 300 - 50},1280" fill="url(#rfRay)" opacity="${.5 + .25 * Math.sin(t * .9 + i * 2)}"/>`; }).join('') + `</g>`;
  // distant reef silhouettes in the blue haze
  const rd = R(8); let far = ''; for (let i = 0; i < 12; i++) { const x = rd() * 760 - 20, h = 60 + rd() * 120; far += `<ellipse cx="${x}" cy="${960}" rx="${40 + rd() * 60}" ry="${h}" fill="#123a5a"/>`; }
  s += `<g opacity=".6" filter="url(#blur2)">${far}</g><rect y="820" width="720" height="200" fill="#0c3050" opacity=".5" filter="url(#haze)"/>`;
  // marine snow
  const rm = R(19); for (let i = 0; i < 120; i++) { const x = rm() * 720, y = pmod(rm() * 1280 + t * (6 + rm() * 10), 1280), z = rm(); s += `<circle cx="${x + Math.sin(t * .5 + i) * 6}" cy="${y}" r="${.5 + z * 1.5}" fill="#cfe2ee" opacity="${.15 + z * .3}"/>`; }
  // seabed: sand with texture, ripples, caustic net
  s += `<path d="M-20,1080 C120,1050 260,1075 380,1060 C520,1044 620,1068 740,1052 L740,1300 L-20,1300Z" fill="url(#rfSand)"/><path d="M-20,1080 C120,1050 260,1075 380,1060 C520,1044 620,1068 740,1052 L740,1300 L-20,1300Z" fill="#fff" filter="url(#sandTex)" opacity=".35"/>`;
  for (let i = 0; i < 7; i++) s += `<path d="M-20,${1110 + i * 26} ${Array.from({ length: 12 }, (_, k) => `q30,-8 60,0`).join(' ')}" stroke="#7a8a94" stroke-width="2" fill="none" opacity=".25"/>`;
  let ca = ''; const rcs = R(55); for (let i = 0; i < 26; i++) { const cx = pmod(rcs() * 760 + t * 14, 760) - 20, cy = 1080 + rcs() * 200; ca += `<path d="M${cx},${cy} q14,-10 28,0 t28,0 q-6,14 -20,18 t-26,-4" stroke="#d8f0ff" stroke-width="2.4" fill="none"/>`; }
  s += `<g opacity="${.35 * beams}" filter="url(#blur1)">${ca}</g>`;
  // rocks + corals
  s += `<path d="M-20,1110 C20,1040 110,1030 170,1070 C200,1090 190,1120 160,1130 L-20,1140Z" fill="#2a3036"/><path d="M560,1100 C590,1050 680,1040 740,1060 L740,1130 L560,1130Z" fill="#262c32"/>`;
  s += staghorn(120, 1080, 1.25, '#c46a6a', '#ffc2b0', 3, t) + staghorn(640, 1070, 1.1, '#d8a050', '#ffe6a8', 7, t);
  s += `<g transform="translate(470,980)"><rect x="-6" y="0" width="12" height="90" fill="#4a6a5a"/><ellipse cx="0" cy="0" rx="110" ry="20" fill="#6a9a84"/><ellipse cx="0" cy="-4" rx="104" ry="15" fill="#8ab8a2"/>` +
       Array.from({ length: 40 }, (_, i) => { const rr = R(i + 500); return `<circle cx="${(rr() - .5) * 190}" cy="${-4 + (rr() - .5) * 20}" r="1.6" fill="#cfe8dc" opacity=".6"/>`; }).join('') + `</g>`;
  s += brainCoral(330, 1090, 92, 62, 1) + seaFan(560, 1060, .95, t);
  s += [0, 1, 2].map(i => `<g transform="translate(${240 + i * 22},1100)"><rect x="-9" y="${-90 + i * 20}" width="18" height="${90 - i * 20}" rx="8" fill="#6a4a8a"/><rect x="-9" y="${-90 + i * 20}" width="6" height="${90 - i * 20}" fill="#8a6aaa" opacity=".6"/><ellipse cx="0" cy="${-90 + i * 20}" rx="9" ry="4" fill="#1a0e24"/></g>`).join('');
  s += anemone(170, 1150, 1.1, t) + clownfish(170 + Math.sin(t * .8) * 40, 1080 + Math.cos(t * 1.1) * 12, Math.cos(t * .8) > 0 ? -1 : 1, t);
  // spawn rising with a glow
  let sp = ''; const r = R(23); for (let i = 0; i < 150; i++) { const x0 = 80 + r() * 560, sp0 = r(), y = 1060 - pmod((t - st) * (40 + r() * 50) + sp0 * 760, 800), sz = 2 + r() * 2.5;
    sp += `<circle cx="${x0 + Math.sin(t + i) * 10}" cy="${y}" r="${sz * 2.2}" fill="#ff9ab8" opacity="${spawn * beams * .18}"/><circle cx="${x0 + Math.sin(t + i) * 10}" cy="${y}" r="${sz}" fill="#ffc2d2" opacity="${spawn * beams * (.6 + .3 * r())}"/>`; }
  s += sp;
  // fish
  s += fishSVG(pmod(t * 22, 900) - 90, 720, 90, 1, t, '#9fb3c0', 31) + fishSVG(760 - pmod(t * 16 + 300, 900), 840, 70, -1, t, '#b8a890', 32);
  for (let i = 0; i < 14; i++) { const x = pmod(t * 30 + i * 18 + (i % 3) * 30, 900) - 90, y = 560 + (i % 5) * 18 + Math.sin(t + i) * 6; s += `<path d="M${x},${y} q8,-5 16,0 q-8,5 -16,0 M${x},${y} l-6,-4 l0,8Z" fill="#c8d8e2" opacity=".55"/>`; }
  s += `<rect width="720" height="1280" fill="#06213a" opacity=".12"/>`;
  F.ov = '';
  return s;
}
// 4: tides on a real beach at sunset: shoreline sweeps up and down, tide staff in the water, rocks, tide pool, crab
function sceneTide(t) {
  const st = S0(4), shrink = ease(ramp(t, WS(4, 10), WS(4, 14) + .6)), amp = lerp(95, 32, shrink), ph = Math.sin((t - st) * 1.1);
  const lvl = 965 + ph * amp, HZ = 690;
  let s = `<defs><linearGradient id="tdS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2850"/><stop offset=".45" stop-color="#5a4a7c"/><stop offset=".78" stop-color="#e07a5a"/><stop offset="1" stop-color="#ffc890"/></linearGradient>` +
    `<linearGradient id="tdW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a47a"/><stop offset=".25" stop-color="#7a6a8a"/><stop offset="1" stop-color="#1e4a68"/></linearGradient>` +
    `<linearGradient id="tdSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b07a"/><stop offset="1" stop-color="#b48a5a"/></linearGradient>` +
    `<linearGradient id="tdWet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5a4a"/><stop offset="1" stop-color="#a07a5a"/></linearGradient>` +
    `<linearGradient id="tdRock" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6a5c58"/><stop offset="1" stop-color="#2a2428"/></linearGradient>` +
    `<radialGradient id="tdSun"><stop offset="0" stop-color="#fff2c8"/><stop offset=".4" stop-color="#ffd08a"/><stop offset="1" stop-color="#ff9a5a" stop-opacity="0"/></radialGradient>` +
    `<filter id="sandT2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="9"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .25  0 0 0 0 .15  0 0 0 -1.7 .95"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<clipPath id="aboveHz"><rect width="720" height="${HZ}"/></clipPath></defs>`;
  s += `<rect width="720" height="${HZ + 2}" fill="url(#tdS)"/>`;
  // sunset clouds lit from below
  const rcl = R(5); for (let i = 0; i < 7; i++) { const cx = rcl() * 760 - 20, cy = 300 + rcl() * 300, rx = 120 + rcl() * 160;
    s += `<ellipse cx="${cx + t * 3}" cy="${cy}" rx="${rx}" ry="${16 + rcl() * 14}" fill="#5a3a5a" opacity=".55" filter="url(#blur2)"/><ellipse cx="${cx + t * 3}" cy="${cy + 8}" rx="${rx * .8}" ry="6" fill="#ffb07a" opacity=".6" filter="url(#blur1)"/>`; }
  s += `<g clip-path="url(#aboveHz)"><circle cx="230" cy="${HZ + 6}" r="260" fill="url(#tdSun)" opacity=".7"/><circle cx="230" cy="${HZ + 6}" r="56" fill="#fff0c0"/></g>`;
  // headland + lighthouse
  s += `<path d="M430,${HZ} C500,${HZ - 26} 600,${HZ - 44} 740,${HZ - 36} L740,${HZ + 2} L430,${HZ + 2}Z" fill="#2a2038"/><rect x="664" y="${HZ - 92}" width="12" height="54" fill="#d8d0c8"/><rect x="662" y="${HZ - 100}" width="16" height="10" fill="#3a3040"/>` +
       `<circle cx="670" cy="${HZ - 96}" r="${8 + 4 * Math.max(0, Math.sin(t * 2))}" fill="#fff6c8" opacity="${.5 + .5 * Math.max(0, Math.sin(t * 2))}" filter="url(#blur2)"/>`;
  // sea with perspective wave lines and the sun's glitter path
  s += `<rect y="${HZ}" width="720" height="${1280 - HZ}" fill="url(#tdW)"/>`;
  for (let k = 1; k < 26; k++) { const y = HZ + Math.pow(k / 25, 1.8) * 420, a = .1 + .2 * (k / 25); let d = `M-20,${y}`;
    for (let x = -20; x <= 740; x += 40) d += ` q20,${-2 - k * .25} 40,0`; s += `<path d="${d}" stroke="${k % 2 ? '#ffd8b0' : '#16384e'}" stroke-width="${1 + k * .08}" fill="none" opacity="${a}" transform="translate(${Math.sin(t * .8 + k) * 8},0)"/>`; }
  const rg = R(71); for (let i = 0; i < 90; i++) { const u = rg(), y = HZ + 4 + u * u * 360, w = 4 + u * 26, x = 230 + (rg() - .5) * (20 + u * 220);
    s += `<rect x="${x}" y="${y}" width="${w}" height="${1.4 + u * 2}" fill="#fff4d8" opacity="${(.3 + .6 * rg()) * (.5 + .5 * Math.sin(t * 6 + i))}"/>`; }
  // breaking wave line out beyond the shore
  const bw = lvl - 70 - 20 * ph; s += `<path d="M-20,${bw} ${Array.from({ length: 19 }, (_, i) => `q20,${-4 + Math.sin(t * 3 + i) * 3} 40,0`).join(' ')}" stroke="#fff" stroke-width="4" fill="none" opacity=".55"/>`;
  // tide staff standing in the water
  const sx = 545, base = 900, top = 640, wy = base - 40 - (lvl - 870) * .75;
  s += `<rect x="${sx - 13}" y="${top}" width="26" height="${base - top}" fill="#f4efe4"/>` + Array.from({ length: 11 }, (_, i) => `<rect x="${sx - 13}" y="${top + 10 + i * 24}" width="26" height="12" fill="#c83a3a"/>`).join('') +
       Array.from({ length: 6 }, (_, i) => `<text x="${sx + 20}" y="${base - 34 - i * 48}" font-family="Space Grotesk" font-size="16" font-weight="700" fill="#fff" opacity=".8">${'٠١٢٣٤٥'[i]}</text>`).join('') +
       `<rect x="${sx - 16}" y="${top - 8}" width="32" height="10" fill="#3a3a40"/>`;
  s += `<rect x="${sx - 13}" y="${wy}" width="26" height="${base - wy}" fill="#1e4a68" opacity=".72"/><path d="M${sx - 26},${wy} q13,-4 26,0 q13,4 26,0" stroke="#fff" stroke-width="2.4" fill="none" opacity=".85"/>`;
  const hiY = base - 40 - (965 + 95 - 870) * .75, loY = base - 40 - (965 - 95 - 870) * .75;
  s += `<line x1="${sx - 36}" y1="${hiY}" x2="${sx + 36}" y2="${hiY}" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5"/><line x1="${sx - 36}" y1="${loY}" x2="${sx + 36}" y2="${loY}" stroke="#fff" stroke-width="2.4" stroke-dasharray="6 5"/>`;
  // beach: wet band that the sea just left, then dry textured sand with ripples
  const shore = (y0) => { let d = `M-20,${y0}`; for (let x = -20; x <= 740; x += 40) d += ` Q${x + 20},${y0 + 6 + Math.sin(x * .05 + t * 1.5) * 5} ${x + 40},${y0 + Math.sin(x * .07) * 4}`; return d; };
  s += `<path d="${shore(lvl)} L740,1300 L-20,1300Z" fill="url(#tdWet)"/>`;
  const dryY = 965 + amp + 18; s += `<path d="${shore(Math.max(dryY, lvl + 6))} L740,1300 L-20,1300Z" fill="url(#tdSand)"/><path d="${shore(Math.max(dryY, lvl + 6))} L740,1300 L-20,1300Z" fill="#fff" filter="url(#sandT2)" opacity=".55"/>`;
  for (let i = 0; i < 9; i++) { const y = Math.max(dryY, lvl) + 30 + i * 26; s += `<path d="M-20,${y} ${Array.from({ length: 13 }, () => `q28,-6 56,0`).join(' ')}" stroke="#a07a4a" stroke-width="2" fill="none" opacity=".3"/>`; }
  // sky sheen on the wet sand and the swash sheet with lacy foam
  s += `<path d="${shore(lvl)} L740,${lvl + 40} L-20,${lvl + 40}Z" fill="#ffb890" opacity=".22"/>`;
  s += `<path d="${shore(lvl)}" stroke="#ffffff" stroke-width="7" fill="none" opacity=".9"/><path d="${shore(lvl - 10)}" stroke="#e8f6ff" stroke-width="3" fill="none" opacity=".6"/>`;
  const rf = R(13); for (let i = 0; i < 40; i++) { const fx = rf() * 740, fy = lvl - 4 - rf() * 26; s += `<ellipse cx="${fx}" cy="${fy}" rx="${6 + rf() * 12}" ry="2" fill="#fff" opacity="${.35 + rf() * .4}"/>`; }
  // rocks bottom-left with barnacles, seaweed, tide pool with a starfish, and a crab
  s += `<path d="M-20,1110 C40,1060 140,1050 200,1090 C240,1120 250,1170 230,1210 L-20,1230Z" fill="url(#tdRock)"/><path d="M-20,1200 C80,1170 200,1180 300,1220 C340,1240 340,1290 300,1300 L-20,1300Z" fill="url(#tdRock)"/>`;
  const rb = R(91); for (let i = 0; i < 50; i++) s += `<circle cx="${rb() * 240}" cy="${1080 + rb() * 200}" r="${1.4 + rb() * 2}" fill="#d8d0c4" opacity=".55"/>`;
  for (let i = 0; i < 8; i++) s += `<path d="M${20 + i * 26},${1100 + (i % 3) * 8} q${6 + Math.sin(t + i) * 3},26 -2,50" stroke="#3a4a24" stroke-width="5" fill="none" stroke-linecap="round" opacity=".85"/>`;
  s += `<ellipse cx="150" cy="1186" rx="70" ry="18" fill="#7a6a8a"/><ellipse cx="150" cy="1186" rx="64" ry="14" fill="#c89a8a" opacity=".55"/>` +
       `<g transform="translate(140,1186) scale(1,.5)"><path d="M0,-22 L6,-7 L22,-6 L10,4 L14,20 L0,11 L-14,20 L-10,4 L-22,-6 L-6,-7Z" fill="#e25a30"/>${Array.from({ length: 10 }, (_, i) => `<circle cx="${Math.cos(i * .63) * 8}" cy="${Math.sin(i * .63) * 8}" r="1.6" fill="#ffb080"/>`).join('')}</g>`;
  const cx = 360 + Math.sin(t * .7) * 30, legs = Math.sin(t * 8);
  s += `<g transform="translate(${cx},1150)"><ellipse cx="0" cy="8" rx="30" ry="6" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
       [-1, 1].map(sd => [0, 1, 2].map(k => `<path d="M${sd * 14},${2 + k * 3} l${sd * (16 + k * 3)},${-6 + k * 5 + legs * (k % 2 ? 2 : -2)} l${sd * 6},${10}" stroke="#a83a1e" stroke-width="3" fill="none"/>`).join('')).join('') +
       `<ellipse cx="0" cy="0" rx="22" ry="13" fill="#c8482a"/><ellipse cx="-4" cy="-3" rx="14" ry="6" fill="#e86a40" opacity=".7"/>` +
       `<path d="M-14,-8 l-12,-10 q-8,-2 -6,6 q4,4 10,2 M14,-8 l12,-10 q8,-2 6,6 q-4,4 -10,2" stroke="#c8482a" stroke-width="4" fill="#c8482a"/><circle cx="-6" cy="-13" r="2.4" fill="#111"/><circle cx="6" cy="-13" r="2.4" fill="#111"/></g>`;
  // gulls
  for (let i = 0; i < 3; i++) { const gx = pmod(t * (40 + i * 12) + i * 260, 900) - 90, gy = 420 + i * 60 + Math.sin(t + i) * 10, f = Math.sin(t * 6 + i * 2) * 8;
    s += `<path d="M${gx - 16},${gy} Q${gx - 8},${gy - 6 - f} ${gx},${gy} Q${gx + 8},${gy - 6 - f} ${gx + 16},${gy}" stroke="#2a2030" stroke-width="2.6" fill="none"/>`; }
  s += `<rect width="720" height="1280" fill="#ff9a5a" opacity=".05"/>`;
  F.ov = '';
  return s;
}
