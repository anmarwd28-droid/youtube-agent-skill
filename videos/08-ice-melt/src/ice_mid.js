// ---------- scenes ----------
let F = {};
const RS = s => { const r = R(s * 7919 + 13); r(); return r; };
const iceDefs = `<linearGradient id="iceW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#9fd0ec"/><stop offset=".5" stop-color="#e8f6ff"/><stop offset="1" stop-color="#7ab4d8"/></linearGradient>` +
  `<linearGradient id="seaI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7aa0"/><stop offset="1" stop-color="#0c2a44"/></linearGradient>` +
  `<filter id="iceT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .12" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .45  0 0 0 0 .65  0 0 0 -1.6 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
function water(y, t, col = 'url(#seaI)', amp = 6, a = .95) {
  let d = `M-20,${y}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${-amp + Math.sin(t * 2 + x * .05) * 3} 40,0`;
  return `<path d="${d} L760,1300 L-20,1300Z" fill="${col}" opacity="${a}"/><path d="${d}" stroke="#e8f6ff" stroke-width="3" fill="none" opacity=".7"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${pmod(i * 140 + t * 30, 760) - 20},${y + 30 + i * 24} q20,-6 40,0" stroke="#cfe8f8" stroke-width="2" fill="none" opacity=".35"/>`).join('');
}
// L0: an Antarctic ice cliff calves a huge block into the sea
function sceneCalve(t) {
  const ct = W(0, 4)[1] - .3, k = ease(ramp(t, ct, ct + 1.4));
  let s = `<defs>${iceDefs}<linearGradient id="skA2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8ab0"/><stop offset="1" stop-color="#dce8f0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skA2)"/>`;
  s += `<g filter="url(#haze)" opacity=".7">` + Array.from({ length: 5 }, (_, i) => `<ellipse cx="${pmod(i * 200 + t * 8, 900) - 90}" cy="${300 + i * 60}" rx="180" ry="16" fill="#fff"/>`).join('') + `</g>`;
  const top = 520, base = 900;
  const cliff = `M-20,${top} L120,${top - 10} L230,${top + 6} L330,${top - 4} L760,${top + 10} L760,${base} L-20,${base}Z`;
  s += `<path d="${cliff}" fill="url(#iceW)"/><path d="${cliff}" fill="#fff" filter="url(#iceT)" opacity=".8"/>` + Array.from({ length: 12 }, (_, i) => `<line x1="${i * 64}" y1="${top + 10}" x2="${i * 64 + 20}" y2="${base}" stroke="#5a9ac0" stroke-width="2" opacity=".45"/>`).join('') + `<rect x="-20" y="${top - 6}" width="780" height="16" fill="#fff"/>`;
  // the calving block: separates, tilts and falls
  const bx = 400, bw = 240, ang = k * 28, dy = k * k * 380;
  s += `<g transform="translate(${bx + bw / 2 + k * 60},${base + dy}) rotate(${ang}) translate(${-bw / 2},${-(base - top)})"><path d="M0,0 L${bw},4 L${bw - 10},${base - top} L4,${base - top}Z" fill="url(#iceW)"/><path d="M0,0 L${bw},4 L${bw - 10},${base - top} L4,${base - top}Z" fill="#fff" filter="url(#iceT)" opacity=".8"/><rect x="0" y="-6" width="${bw}" height="14" fill="#fff"/></g>`;
  if (k > 0) s += `<path d="M${bx - 4},${top} l-14,60 l18,50 l-10,70 l16,90 l-8,${base - top - 270}" stroke="#2a6a9a" stroke-width="4" fill="none" opacity="${1 - k}"/>`;
  s += water(base, t);
  const sp = ramp(t, ct + .9, ct + 2.2); if (sp > 0 && sp < 1) { const r = RS(9); let p = ''; for (let i = 0; i < 70; i++) { const a = -Math.PI / 2 + (r() - .5) * 2.4, d = sp * (60 + r() * 260); p += `<circle cx="${560 + Math.cos(a) * d}" cy="${base + Math.sin(a) * d * 1.2 + sp * sp * 200}" r="${3 + r() * 6}" fill="#f4fbff" opacity="${1 - sp}"/>`; } s += p; }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L1: a mountain glacier retreats, meltwater pours away
function sceneGlacier(t) {
  const st = S0(1) - .2, k = ease(ramp(t, st, S0(2) - .3));
  let s = `<defs>${iceDefs}<linearGradient id="skG2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86c8"/><stop offset="1" stop-color="#cfe4f4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skG2)"/>`;
  s += `<path d="M-20,900 L120,420 L220,560 L360,300 L500,560 L600,440 L740,900Z" fill="#5a5e66"/><path d="M-20,900 L120,420 L220,560 L360,300 L500,560 L600,440 L740,900Z" fill="#000" filter="url(#iceT)" opacity=".25"/>` +
       `<path d="M90,520 L120,420 L160,480Z M320,380 L360,300 L400,380Z M570,500 L600,440 L630,500Z" fill="#fff"/>`;
  // glacier filling the valley between the peaks, its snout retreating uphill and leaving bare moraine
  const tip = lerp(1080, 680, k), gl = `M150,640 C230,470 490,470 570,640 C540,760 500,${tip - 90} 470,${tip} C430,${tip + 34} 290,${tip + 34} 250,${tip} C220,${tip - 90} 180,760 150,640Z`;
  s += `<path d="M230,${tip} C260,${tip + 220} 330,1040 330,1300 L430,1300 C430,1040 470,${tip + 220} 490,${tip}Z" fill="#8a8274"/>` + Array.from({ length: 40 }, (_, i) => { const rr = RS(i + 30); return `<ellipse cx="${250 + rr() * 220}" cy="${tip + 30 + rr() * (1260 - tip)}" rx="${4 + rr() * 9}" ry="${3 + rr() * 5}" fill="${rr() > .5 ? '#6a645a' : '#9a9284'}"/>`; }).join('');
  s += `<path d="${gl}" fill="url(#iceW)"/><path d="${gl}" fill="#fff" filter="url(#iceT)" opacity=".75"/>`;
  for (let i = 0; i < 9; i++) { const y = 560 + i * (tip - 560) / 9, w = 120 + 60 * Math.sin(i / 9 * Math.PI); s += `<path d="M${360 - w},${y} Q360,${y + 26} ${360 + w},${y}" stroke="#3a8ac0" stroke-width="2.4" fill="none" opacity=".55"/>`; }
  s += `<path d="M150,640 C230,470 490,470 570,640" stroke="#fff" stroke-width="6" fill="none" opacity=".8"/><path d="M250,${tip} C290,${tip + 34} 430,${tip + 34} 470,${tip}" stroke="#7ab4d8" stroke-width="5" fill="none"/>`;
  // meltwater stream with moving highlights
  s += `<path d="M360,${tip + 30} C350,${tip + 200} 400,1000 390,1300" stroke="#6ab8e8" stroke-width="18" fill="none"/>` + `<path d="M360,${tip + 30} C350,${tip + 200} 400,1000 390,1300" stroke="#e8f6ff" stroke-width="5" fill="none" stroke-dasharray="20 30" stroke-dashoffset="${-t * 120}" opacity=".8"/>`;
  // a waterfall off the ice
  s += `<path d="M540,700 C548,760 544,820 552,900" stroke="#cfe8f8" stroke-width="10" fill="none" stroke-dasharray="14 10" stroke-dashoffset="${-t * 160}" opacity=".8"/>`;
  s += `<path d="M-20,1000 C200,980 500,990 740,970 L740,1300 L-20,1300Z" fill="#4a5a3a"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L2: a giant ruler by a coastal tower: the sea climbs 70 m
function sceneRuler(t) {
  const st = S0(2) - .2, k = ease(ramp(t, W(2, 4)[1] - .3, S0(3) - .2));
  let s = `<defs>${iceDefs}<linearGradient id="skR3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a86b8"/><stop offset="1" stop-color="#dce8f0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR3)"/>`;
  const ground = 1120, m = 9; // 1 m = 9 px  -> 70 m = 630 px
  s += `<rect y="${ground}" width="720" height="160" fill="#c8b890"/>`;
  s += `<rect x="420" y="${ground - 72 * m}" width="150" height="${72 * m}" fill="#8a96a4"/>` + Array.from({ length: 24 }, (_, i) => `<rect x="432" y="${ground - (i + 1) * 3 * m + 6}" width="126" height="${3 * m - 12}" fill="#2a3442"/><rect x="432" y="${ground - (i + 1) * 3 * m + 6}" width="126" height="${3 * m - 12}" fill="#9fd0ec" opacity=".25"/>`).join('');
  s += `<rect x="220" y="${ground - 75 * m}" width="40" height="${75 * m}" fill="#f4efe4"/>` + Array.from({ length: 75 }, (_, i) => `<line x1="${i % 5 ? 248 : 236}" y1="${ground - i * m}" x2="260" y2="${ground - i * m}" stroke="#1a1e26" stroke-width="${i % 10 ? 1.4 : 3}"/>`).join('') +
       Array.from({ length: 8 }, (_, i) => `<text x="212" y="${ground - i * 10 * m + 6}" text-anchor="end" font-family="Space Grotesk" font-weight="700" font-size="18" fill="#1a1e26">${'٠١٢٣٤٥٦٧٨٩'[i]}٠</text>`).join('');
  s += person(330, ground + 2, { s: .34, face: 1, top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d', lookUp: .8, t });
  s += water(ground - 70 * m * k, t, 'url(#seaI)', 6, .85);
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L3: Baghdad on the Tigris: the water rises over the streets, then the domes, until only minaret tops remain
function sceneBaghdad(t) {
  const st = S0(3) - .2, k = ease(ramp(t, W(3, 10)[1] - 1.2, S0(4) - .3));
  let s = `<defs>${iceDefs}<linearGradient id="skB2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8905a"/><stop offset=".6" stop-color="#f8c890"/><stop offset="1" stop-color="#f0d8b0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skB2)"/>`;
  s += `<circle cx="180" cy="560" r="60" fill="#fff0c8" opacity=".9"/><circle cx="180" cy="560" r="200" fill="#ffd090" opacity=".35" filter="url(#soft)"/>`;
  s += skyline(5, 860, '#a07a5a', 0, .1) + skyline(8, 930, '#7a5a42', 0, .15);
  // a big mosque dome and twin minarets, palms
  s += `<g fill="#6a4a34"><rect x="470" y="560" width="18" height="380"/><rect x="612" y="560" width="18" height="380"/><polygon points="466,560 492,560 479,520"/><polygon points="608,560 634,560 621,520"/><rect x="462" y="640" width="34" height="10"/><rect x="604" y="640" width="34" height="10"/>` +
       `<path d="M490,760 C490,660 610,660 610,760Z"/><rect x="480" y="760" width="140" height="180"/></g><path d="M500,740 C506,686 560,676 582,700" stroke="#c8a070" stroke-width="5" fill="none" opacity=".7"/><circle cx="550" cy="652" r="6" fill="#e8c060"/>`;
  s += palm(120, 960, 220, '#3a3a2a', t) + palm(330, 960, 260, '#3a3a2a', t) + palm(680, 960, 200, '#3a3a2a', t);
  // the Tigris, a bridge, riverbank walkway with people
  s += `<rect y="940" width="720" height="60" fill="#b89a74"/><rect y="1000" width="720" height="280" fill="#4a7a8a"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${i * 160},1040 q40,-8 80,0" stroke="#cfe8f0" stroke-width="2" fill="none" opacity=".5"/>`).join('');
  s += `<rect x="-20" y="1010" width="760" height="14" fill="#7a6a5a"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 140 + 30}" y="1024" width="16" height="120" fill="#6a5a4a"/>`).join('');
  s += person(200, 944, { s: .5, face: 1, top: '#8a3b3b', pants: '#2a2533', skin: '#a46a46', hair: '#1b1410', lookUp: k * .6, t }) + person(250, 944, { s: .52, face: -1, top: '#3f6b5a', pants: '#24262e', skin: '#c08a66', hair: '#2a1d16', lookUp: k * .6, t });
  // the rising sea
  s += water(lerp(1010, 545, k), t, 'url(#seaI)', 6, .9);
  // a lone boat on the new sea
  if (k > .7) { const by = lerp(1010, 545, k); s += `<g transform="translate(${300 + (t - st) * 10},${by - 4})"><path d="M-50,0 L50,0 L36,20 L-36,20Z" fill="#7a4a2a"/><rect x="-2" y="-60" width="4" height="60" fill="#3a2a1a"/><path d="M2,-58 L40,-10 L2,-10Z" fill="#f4efe4"/></g>`; }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L4: the Gulf creeps north: Basra, Kuwait and Doha skylines go under, left to right
function sceneGulf(t) {
  const st = S0(4) - .2, k = ease(ramp(t, st, S0(5) - .4)), pan = lerp(0, -1440, ease(ramp(t, WS(4, 4) - .3, WS(4, 7) + .6)));
  let s = `<defs>${iceDefs}<linearGradient id="skGf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ac8"/><stop offset="1" stop-color="#f0dcc0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skGf)"/>`;
  s += `<g transform="translate(${pan},0)">`;
  // Basra: palms along the Shatt al-Arab, low houses
  s += Array.from({ length: 10 }, (_, i) => `<rect x="${40 + i * 64}" y="${860 - 60 - (i % 3) * 20}" width="56" height="${120 + (i % 3) * 20}" fill="#b8987a"/>`).join('') + palm(60, 940, 200, '#3a4a2a', t) + palm(300, 940, 240, '#3a4a2a', t) + palm(560, 940, 210, '#3a4a2a', t);
  // Kuwait: the towers with spheres
  s += `<g transform="translate(720,0)"><rect x="300" y="420" width="16" height="520" fill="#4a5060"/><circle cx="308" cy="560" r="56" fill="#2a5a8a"/><circle cx="308" cy="470" r="26" fill="#2a5a8a"/><rect x="420" y="560" width="12" height="380" fill="#4a5060"/><circle cx="426" cy="660" r="40" fill="#2a5a8a"/>` +
       Array.from({ length: 6 }, (_, i) => `<rect x="${40 + i * 60 + (i > 3 ? 280 : 0)}" y="${640 + (i % 3) * 40}" width="50" height="${300 - (i % 3) * 40}" fill="#8a96a4"/>`).join('') + `</g>`;
  // Doha: modern towers
  s += `<g transform="translate(1440,0)">` + [[60, 520, 70], [150, 440, 60], [230, 380, 80], [330, 500, 60], [420, 420, 90], [530, 560, 70], [610, 470, 60]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${940 - y}" fill="#7a8ca0"/><rect x="${x}" y="${y}" width="${w * .3}" height="${940 - y}" fill="#fff" opacity=".2"/>`).join('') + `<path d="M410,420 Q465,320 520,420Z" fill="#7a8ca0"/></g>`;
  s += `<rect y="940" width="2160" height="340" fill="#c8b48a"/></g>`;
  s += water(lerp(1000, 700, k), t, 'url(#seaI)', 6, .88);
  F.ov = ''; F.earth = null; F.moon = null; F.pan = pan;
  return s;
}
// L5: four landmark silhouettes half under the waves (a 2x2 grid)
function sceneWorld(t) {
  const st = S0(5) - .2, ws = [WS(5, 2), WS(5, 3), WS(5, 4), WS(5, 5)];
  const panels = [
    (x, y) => `<rect x="${x + 140}" y="${y + 40}" width="44" height="300" fill="#3a3430"/><polygon points="${x + 136},${y + 40} ${x + 188},${y + 40} ${x + 162},${y - 10}" fill="#3a3430"/><circle cx="${x + 162}" cy="${y + 90}" r="18" fill="#f0e0b0"/><circle cx="${x + 162}" cy="${y + 90}" r="18" fill="none" stroke="#3a3430" stroke-width="3"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${x + 30 + i * 30}" y="${y + 200 + i * 6}" width="26" height="${140 - i * 6}" fill="#4a4440"/>`).join(''),
    (x, y) => `<rect x="${x + 160}" y="${y + 20}" width="34" height="320" fill="#8a5a3a"/><polygon points="${x + 156},${y + 20} ${x + 198},${y + 20} ${x + 177},${y - 40}" fill="#5a7a6a"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${x + 20 + i * 34}" y="${y + 220}" width="30" height="120" fill="#c88a5a"/><rect x="${x + 26 + i * 34}" y="${y + 240}" width="10" height="16" fill="#5a3a2a"/>`).join('') + `<path d="M${x + 30},${y + 304} Q${x + 110},${y + 318} ${x + 200},${y + 300} L${x + 212},${y + 284} Q${x + 110},${y + 306} ${x + 36},${y + 292}Z" fill="#141414"/><path d="M${x + 168},${y + 300} l-4,-44 M${x + 160},${y + 262} l24,-6" stroke="#141414" stroke-width="4"/><circle cx="${x + 166}" cy="${y + 250}" r="6" fill="#141414"/>`,
    (x, y) => `<rect x="${x + 166}" y="${y - 20}" width="10" height="360" fill="#7a5a8a"/><circle cx="${x + 171}" cy="${y + 220}" r="42" fill="#c84a8a"/><circle cx="${x + 171}" cy="${y + 90}" r="28" fill="#c84a8a"/><circle cx="${x + 171}" cy="${y + 20}" r="12" fill="#c84a8a"/>` + [[30, 80], [80, 140], [240, 100], [290, 60]].map(([dx, h]) => `<rect x="${x + dx}" y="${y + 340 - h * 2}" width="40" height="${h * 2}" fill="#6a7484"/>`).join(''),
    (x, y) => `<path d="M${x + 150},${y + 340} L${x + 156},${y + 160} L${x + 190},${y + 160} L${x + 196},${y + 340}Z" fill="#5a8a7a"/><path d="M${x + 160},${y + 160} C${x + 150},${y + 120} ${x + 190},${y + 100} ${x + 186},${y + 160}Z" fill="#5a8a7a"/><path d="M${x + 186},${y + 130} L${x + 214},${y + 40}" stroke="#5a8a7a" stroke-width="10" stroke-linecap="round"/><path d="M${x + 206},${y + 44} l16,-20 l6,8 l-8,20Z" fill="#e8c060"/><path d="M${x + 160},${y + 112} l6,-12 l6,10 l6,-12 l6,12" stroke="#5a8a7a" stroke-width="4" fill="none"/>`,
  ];
  let s = `<defs>${iceDefs}</defs><rect width="720" height="1280" fill="#0c1424"/>`;
  [[0, 260], [360, 260], [0, 760], [360, 760]].forEach(([x, y], i) => { const a = ease(ramp(t, ws[i] - .2, ws[i] + .3)), lvl = lerp(y + 470, y + 300, ease(ramp(t, ws[i], ws[i] + 2)));
    s += `<g opacity="${a}"><defs><clipPath id="pc${i}"><rect x="${x + 10}" y="${y}" width="340" height="480" rx="16"/></clipPath><linearGradient id="ps${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${['#7a8ca8', '#e8a87a', '#8a9ab8', '#6a8ab8'][i]}"/><stop offset="1" stop-color="${['#d8dce0', '#f8dcc0', '#d8d0dc', '#d8e4f0'][i]}"/></linearGradient></defs>` +
      `<g clip-path="url(#pc${i})"><rect x="${x + 10}" y="${y}" width="340" height="480" fill="url(#ps${i})"/>${panels[i](x, y + 80)}` +
      `<path d="M${x},${lvl} ${Array.from({ length: 9 }, (_, k) => `q20,${-5 + Math.sin(t * 2 + k + i) * 3} 40,0`).join(' ')} L${x + 360},${y + 480} L${x},${y + 480}Z" fill="#2a6a9a" opacity=".9"/><path d="M${x},${lvl} ${Array.from({ length: 9 }, (_, k) => `q20,${-5 + Math.sin(t * 2 + k + i) * 3} 40,0`).join(' ')}" stroke="#e8f6ff" stroke-width="3" fill="none"/></g>` +
      `<rect x="${x + 10}" y="${y}" width="340" height="480" rx="16" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/></g>`; });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L6: fresh water: an ice block melts into the salty sea
function sceneFresh(t) {
  const st = S0(6) - .2, k = ease(ramp(t, st, S0(7) - .3));
  let s = `<defs>${iceDefs}<linearGradient id="skF3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac0"/><stop offset="1" stop-color="#e0ecf4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF3)"/>`;
  const sz = lerp(300, 60, k), cy = 760;
  s += `<rect x="${360 - sz / 2}" y="${cy - sz * .8}" width="${sz}" height="${sz}" rx="${sz * .12}" fill="url(#iceW)" opacity=".95"/><rect x="${360 - sz / 2}" y="${cy - sz * .8}" width="${sz}" height="${sz}" rx="${sz * .12}" fill="#fff" filter="url(#iceT)" opacity=".7"/><rect x="${360 - sz * .4}" y="${cy - sz * .7}" width="${sz * .2}" height="${sz * .6}" rx="6" fill="#fff" opacity=".6"/>`;
  for (let i = 0; i < 8; i++) { const p = pmod(t * .8 + i / 8, 1), x = 360 - sz / 2 + (i / 7) * sz; s += `<ellipse cx="${x}" cy="${cy + sz * .2 + p * 80}" rx="5" ry="8" fill="#bfe6ff" opacity="${(1 - p) * .9}"/>`; }
  s += water(cy + sz * .2, t, 'url(#seaI)', 6, .9);
  // fresh water drop that turns salty
  s += `<g transform="translate(560,460)"><path d="M0,-60 C30,-20 40,10 0,40 C-40,10 -30,-20 0,-60Z" fill="${mix('#7ad0ff', '#3a6a8a', k)}"/><circle cx="-10" cy="0" r="8" fill="#fff" opacity=".6"/></g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L7: it takes thousands of years: an hourglass by a calm sea; people relax
function sceneTime(t) {
  const st = S0(7) - .2, k = ramp(t, st, S0(8));
  let s = `<defs>${iceDefs}<linearGradient id="skT3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8905a"/><stop offset="1" stop-color="#f8d8b0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skT3)"/>` + water(900, t);
  s += `<g transform="translate(360,620)"><path d="M-120,-220 L120,-220 L20,0 L120,220 L-120,220 L-20,0Z" fill="#fff" opacity=".3" stroke="#f4efe4" stroke-width="6"/><rect x="-140" y="-240" width="280" height="22" rx="8" fill="#8a5a3a"/><rect x="-140" y="218" width="280" height="22" rx="8" fill="#8a5a3a"/>` +
    `<path d="M${-100 + k * 80},-200 L${100 - k * 80},-200 L0,${-10 - k * 40}Z" fill="#e8c070"/><path d="M-100,200 L100,200 L${20 + 60 * (1 - k)},${200 - 120 * k} L${-20 - 60 * (1 - k)},${200 - 120 * k}Z" fill="#e8c070"/><line x1="0" y1="0" x2="0" y2="200" stroke="#e8c070" stroke-width="3" stroke-dasharray="4 6" stroke-dashoffset="${-t * 40}"/></g>`;
  s += person(150, 905, { s: .8, face: 1, top: '#8a3b3b', pants: '#2a2533', skin: '#a46a46', hair: '#1b1410', t }) + person(600, 905, { s: .82, face: -1, top: '#3f6b5a', pants: '#24262e', skin: '#c08a66', hair: '#2a1d16', t });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L8: CTA over the blue planet
function sceneEarth(t) {
  const st = S0(8), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 720, r: 250, a: 1, sunI: 1, lights: .4, rot: .8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1080 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneCalve }, { s: S0(1) - .2, f: sceneGlacier }, { s: S0(2) - .2, f: sceneRuler }, { s: S0(3) - .2, f: sceneBaghdad }, { s: S0(4) - .2, f: sceneGulf },
  { s: S0(5) - .2, f: sceneWorld }, { s: S0(6) - .2, f: sceneFresh }, { s: S0(7) - .2, f: sceneTime }, { s: S0(8) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['القطبان', S0(1)], ['+٧٠ م', S0(2)], ['المدن', S0(3)]];
const CHIPS = [
  ['c1', 'القطبان', 160, 330, 'ice', WS(1, 1), S0(2)], ['c2', 'غرينلاند', 360, 330, 'ice', WS(1, 2), S0(2)], ['c3', 'الأنهار الجليدية', 560, 330, 'ice', WS(1, 4), S0(2)],
  ['c4', '+٧٠ متراً', 470, 330, 'big', WS(2, 4), S0(3)],
  ['c5', 'بغداد ≈ ٣٤ م فوق البحر', 360, 330, 'big', WS(3, 7), S0(4)],
  ['c6', 'البصرة', 360, 600, 'dark', WS(4, 5), WS(4, 6)], ['c7', 'الكويت', 360, 600, 'dark', WS(4, 6), WS(4, 7)], ['c8', 'الدوحة', 360, 600, 'dark', WS(4, 7), S0(5)],
  ['c9', 'لندن', 180, 290, 'dark', WS(5, 2), S0(6)], ['c10', 'البندقية', 540, 290, 'dark', WS(5, 3), S0(6)], ['c11', 'شنغهاي', 180, 790, 'dark', WS(5, 4), S0(6)], ['c12', 'نيويورك', 540, 790, 'dark', WS(5, 5), S0(6)],
  ['c13', '⅔ الماء العذب في الجليد', 360, 330, 'big', WS(6, 8), S0(7)],
  ['c14', 'آلاف السنين', 360, 330, 'big', WS(7, 8), S0(8)],
  ['c15', '@MadhaLawLab', 360, 1180, 'dark', WS(8, 6), 999],
];
$('ui').innerHTML = `<div class="list" id="tl"><div class="hd">لو ذاب الجليد</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 88; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  const vis = ease(ramp(t, S0(1), S0(1) + .4)) * (1 - ease(ramp(t, S0(5) - .4, S0(5) - .1)));
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, i) => { if (t >= x[1]) act = i; });
  $('tlf').style.height = (act * 88) + 'px';
  TLI.forEach((x, i) => { const on = i <= act, cur = i === act;
    $('tli' + i).style.color = cur ? '#fff' : on ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + i).style.background = on ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + i).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}

