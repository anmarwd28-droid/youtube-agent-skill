// ===== realistic versions of the ice-melt shots 1–9 =====
const IDEF = `<linearGradient id="seaR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a86a8"/><stop offset=".25" stop-color="#2a5a7a"/><stop offset="1" stop-color="#0a2236"/></linearGradient>` +
  `<linearGradient id="iceF" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#bfe0f2"/><stop offset=".35" stop-color="#eef8ff"/><stop offset=".7" stop-color="#a8d4ee"/><stop offset="1" stop-color="#6aa8d0"/></linearGradient>` +
  `<linearGradient id="scar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a8ac8"/><stop offset="1" stop-color="#7ac8f0"/></linearGradient>` +
  `<filter id="iceT2" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".015 .09" numOctaves="4" seed="7"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .5  0 0 0 0 .7  0 0 0 -1.6 .95"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="rockI" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .05" numOctaves="5" seed="17"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .05  0 0 0 0 .06  0 0 0 -1.5 1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="wallI" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="3"/><feColorMatrix values="0 0 0 0 .2  0 0 0 0 .16  0 0 0 0 .1  0 0 0 -1.4 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
// realistic water surface: body, perspective swell lines, sparkle, a foam line
function seaR(y, t, opts = {}) {
  const tint = opts.tint || 'url(#seaR)', sun = opts.sunX;
  let s = `<rect x="-20" y="${y}" width="760" height="${1300 - y}" fill="${tint}"/>`;
  for (let k = 1; k < 18; k++) { const yy = y + Math.pow(k / 17, 1.6) * (1300 - y); let d = `M-20,${yy}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${-1.5 - k * .15} 40,0`;
    s += `<path d="${d}" stroke="${k % 2 ? '#d8eef8' : '#0a2236'}" stroke-width="${1 + k * .1}" fill="none" opacity="${.12 + .012 * k}" transform="translate(${Math.sin(t * .8 + k) * 10},0)"/>`; }
  if (sun !== undefined) { const r = RS(71); for (let i = 0; i < 50; i++) { const u = r(), yy = y + 6 + u * u * 300, w = 4 + u * 26, x = sun + (r() - .5) * (16 + u * 200); s += `<rect x="${x}" y="${yy}" width="${w}" height="${1.4 + u * 2}" fill="#fff4d8" opacity="${(.3 + .6 * r()) * (.5 + .5 * Math.sin(t * 6 + i))}"/>`; } }
  let d = `M-20,${y}`; for (let x = -20; x <= 740; x += 30) d += ` L${x},${y + Math.sin(x * .05 + t * 2) * 3}`;
  return s + `<path d="${d}" stroke="#eaf6ff" stroke-width="3" fill="none" opacity=".75"/>`;
}
// a swimmer: head and shoulders above the water, arms stroking, ripples
function swimmer(x, y, s, t, c, seed = 0) {
  const ph = t * 4 + seed, a1 = Math.sin(ph), a2 = Math.sin(ph + Math.PI), bob = Math.sin(ph * .5) * 2;
  return `<g transform="translate(${x},${y + bob}) scale(${s})">` +
    `<ellipse cx="0" cy="18" rx="44" ry="10" fill="none" stroke="#e8f6ff" stroke-width="2" opacity=".6"/><ellipse cx="0" cy="18" rx="${60 + 10 * Math.abs(a1)}" ry="14" fill="none" stroke="#e8f6ff" stroke-width="1.4" opacity=".35"/>` +
    `<path d="M-24,14 C-24,-4 24,-4 24,14Z" fill="${c.top}"/><path d="M-24,14 C-24,-4 24,-4 24,14Z" fill="#0a2236" opacity=".35"/>` +
    `<path d="M-20,4 Q${-40 - 10 * a1},${-20 * Math.max(0, a1)} ${-56},${10 - 26 * Math.max(0, a1)}" stroke="${c.top}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="-56" cy="${10 - 26 * Math.max(0, a1)}" r="6" fill="${c.skin}"/>` +
    `<path d="M20,4 Q${40 + 10 * a2},${-20 * Math.max(0, a2)} ${56},${10 - 26 * Math.max(0, a2)}" stroke="${c.top}" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="56" cy="${10 - 26 * Math.max(0, a2)}" r="6" fill="${c.skin}"/>` +
    `<ellipse cx="0" cy="-14" rx="15" ry="17" fill="${c.skin}"/><path d="M-15,-18 C-14,-34 14,-36 15,-18 C8,-26 -8,-26 -15,-18Z" fill="${c.hair}"/><ellipse cx="5" cy="-15" rx="2" ry="2.4" fill="#1a120d"/><ellipse cx="-5" cy="-15" rx="2" ry="2.4" fill="#1a120d"/>` +
    `<path d="M-30,16 q8,-6 16,0 q8,6 16,0 q8,-6 16,0 q8,6 16,0" stroke="#fff" stroke-width="2.4" fill="none" opacity=".8"/>` +
    `<circle cx="${-56}" cy="18" r="${3 + 3 * Math.max(0, -a1)}" fill="#fff" opacity="${.6 * Math.max(0, -a1)}"/><circle cx="${56}" cy="18" r="${3 + 3 * Math.max(0, -a2)}" fill="#fff" opacity="${.6 * Math.max(0, -a2)}"/></g>`;
}
function palmR(x, y, h, t, col = '#3a3424', fr = '#2e4a22') {
  const tx = x + h * .1, ty = y - h; let s = `<path d="M${x - 7},${y} Q${x + h * .02},${y - h * .55} ${tx - 4},${ty} L${tx + 4},${ty} Q${x + h * .04},${y - h * .55} ${x + 7},${y}Z" fill="${col}"/>`;
  for (let i = 0; i < 16; i++) { const u = i / 16; s += `<path d="M${x - 6 + (tx - x) * u},${y - h * u} l12,-4" stroke="#000" stroke-opacity=".3" stroke-width="2"/>`; }
  [-170, -145, -120, -95, -70, -45, -20, 5, 25].forEach((a, i) => { const ang = (a + Math.sin(t * 1.1 + i) * 1.5) * Math.PI / 180, Ln = h * .5, ex = tx + Math.cos(ang) * Ln, ey = ty + Math.sin(ang) * Ln * .45 + Ln * .4, cx = tx + Math.cos(ang) * Ln * .5, cy = ty + Math.sin(ang) * Ln * .5 - Ln * .12;
    s += `<path d="M${tx},${ty} Q${cx},${cy} ${ex},${ey}" stroke="${fr}" stroke-width="4" fill="none"/>`;
    for (let j = 1; j < 12; j++) { const u = j / 12, px = (1 - u) * (1 - u) * tx + 2 * (1 - u) * u * cx + u * u * ex, py = (1 - u) * (1 - u) * ty + 2 * (1 - u) * u * cy + u * u * ey, ll = 22 * (1 - u * .7);
      s += `<path d="M${px},${py} l${-ll * .5},${ll} M${px},${py} l${ll * .5},${ll}" stroke="${fr}" stroke-width="2.2" stroke-linecap="round"/>`; } });
  return s + `<circle cx="${tx}" cy="${ty + 6}" r="7" fill="#8a5a2a"/>`;
}
// a building with two visible faces, window grid with sky reflections
function bldg(x, base, w, h, col, seed, side = .25) {
  const r = RS(seed), sw = w * side; let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><path d="M${x + w},${base - h} l${sw},-${sw * .4} l0,${h} l-${sw},${sw * .4}Z" fill="${mix(col, '#000000', .35)}"/><path d="M${x},${base - h} l${sw},-${sw * .4} l${w},0 l-${sw},${sw * .4}Z" fill="${mix(col, '#ffffff', .25)}"/>`;
  const cols = Math.max(2, Math.floor(w / 22)), rows = Math.floor(h / 30);
  for (let i = 0; i < rows; i++) for (let j = 0; j < cols; j++) { const wx = x + 6 + j * (w - 12) / cols, wy = base - h + 10 + i * 30; s += `<rect x="${wx}" y="${wy}" width="${(w - 12) / cols - 6}" height="16" fill="${r() > .8 ? '#ffd890' : '#6a8aa8'}" opacity="${.75}"/><rect x="${wx}" y="${wy}" width="${((w - 12) / cols - 6) * .4}" height="16" fill="#fff" opacity=".15"/>`; }
  return s;
}
// 1: the crack opens in the cliff face itself; the slab between crack and edge topples into the sea leaving a fresh blue scar
function sceneCalve(t) {
  const ct = W(0, 4)[1] - .4, crack = ease(ramp(t, ct - .6, ct)), k = ease(ramp(t, ct, ct + 1.4)), sp = ramp(t, ct + .8, ct + 2.4);
  let s = `<defs>${IDEF}<linearGradient id="skP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7ea8"/><stop offset=".7" stop-color="#cfdce8"/><stop offset="1" stop-color="#e8eef2"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skP)"/>`;
  s += `<g filter="url(#haze)" opacity=".75">` + Array.from({ length: 6 }, (_, i) => `<ellipse cx="${pmod(i * 180 + t * 8, 900) - 90}" cy="${280 + i * 50}" rx="200" ry="14" fill="#fff"/>`).join('') + `</g>`;
  const top = 520, base = 920, bx0 = 330, bx1 = 600;
  // far ice shelf
  s += `<path d="M-20,${top + 40} L740,${top + 30} L740,${top + 80} L-20,${top + 90}Z" fill="#cfe4f2" opacity=".7"/>`;
  // the cliff: left part stays, the slab [bx0,bx1] calves; the scar is exposed behind it
  s += `<rect x="${bx0}" y="${top + 4}" width="${bx1 - bx0 + 140}" height="${base - top}" fill="url(#scar)"/><rect x="${bx0}" y="${top + 4}" width="${bx1 - bx0 + 140}" height="${base - top}" fill="#fff" filter="url(#iceT2)" opacity=".5"/>`;
  const cliffL = `M-20,${top} L120,${top - 8} L230,${top + 4} L${bx0},${top - 2} L${bx0 - 8 + 10 * crack},${top + 160} L${bx0 + 6},${top + 300} L${bx0 - 4},${base} L-20,${base}Z`;
  s += `<path d="${cliffL}" fill="url(#iceF)"/><path d="${cliffL}" fill="#fff" filter="url(#iceT2)" opacity=".85"/>` + Array.from({ length: 6 }, (_, i) => `<line x1="${i * 60}" y1="${top + 10}" x2="${i * 60 + 18}" y2="${base}" stroke="#4a8ab8" stroke-width="2" opacity=".4"/>`).join('') + `<path d="M-20,${top} L120,${top - 8} L230,${top + 4} L${bx0},${top - 2}" stroke="#fff" stroke-width="12" fill="none"/>`;
  // right part beyond the slab stays too
  const cliffR = `M${bx1 + 4},${top + 2} L760,${top + 8} L760,${base} L${bx1 + 10},${base} L${bx1 - 2},${top + 260} L${bx1 + 8},${top + 120}Z`;
  s += `<path d="${cliffR}" fill="url(#iceF)"/><path d="${cliffR}" fill="#fff" filter="url(#iceT2)" opacity=".85"/><path d="M${bx1 + 4},${top + 2} L760,${top + 8}" stroke="#fff" stroke-width="12"/>`;
  // the slab: same texture, attached at first, then tilts outward around its foot and drops
  const ang = k * 34, dy = k * k * 420, dx = k * 70;
  s += `<g transform="translate(${bx0 + dx},${base + dy}) rotate(${ang},${(bx1 - bx0) / 2},0)"><path d="M0,${-(base - top) + 4} L${bx1 - bx0},${-(base - top) + 2} L${bx1 - bx0 - 6},0 L6,0Z" fill="url(#iceF)"/><path d="M0,${-(base - top) + 4} L${bx1 - bx0},${-(base - top) + 2} L${bx1 - bx0 - 6},0 L6,0Z" fill="#fff" filter="url(#iceT2)" opacity=".85"/>` +
       `<rect x="0" y="${-(base - top) - 4}" width="${bx1 - bx0}" height="14" fill="#fff"/>` + Array.from({ length: 4 }, (_, i) => `<line x1="${30 + i * 60}" y1="${-(base - top) + 10}" x2="${44 + i * 60}" y2="0" stroke="#4a8ab8" stroke-width="2" opacity=".4"/>`).join('') + `</g>`;
  // the crack line before the fall
  if (crack > 0 && k < .2) s += `<path d="M${bx0 + 2},${top} l-10,70 l14,60 l-8,80 l12,90 l-6,${base - top - 300}" stroke="#0e3a5e" stroke-width="${2 + 3 * crack}" fill="none" opacity="${crack}"/><path d="M${bx1},${top} l8,80 l-12,90 l10,${base - top - 170}" stroke="#0e3a5e" stroke-width="${2 + 3 * crack}" fill="none" opacity="${crack}"/>`;
  s += seaR(base, t);
  // splash, spreading rings and floating brash ice
  if (sp > 0 && sp < 1) { const r = RS(9); let p = ''; for (let i = 0; i < 90; i++) { const a = -Math.PI / 2 + (r() - .5) * 2.6, d = sp * (80 + r() * 320); p += `<circle cx="${470 + Math.cos(a) * d}" cy="${base + Math.sin(a) * d * 1.1 + sp * sp * 260}" r="${3 + r() * 8}" fill="#f4fbff" opacity="${(1 - sp) * .9}"/>`; }
    s += p + `<ellipse cx="470" cy="${base + 20}" rx="${100 + sp * 320}" ry="${16 + sp * 30}" fill="none" stroke="#fff" stroke-width="5" opacity="${1 - sp}"/>`; }
  for (let i = 0; i < 14; i++) { const r = RS(i + 300), x = pmod(r() * 760 + t * 6, 760) - 20, y = base + 30 + r() * 300; s += `<path d="M${x},${y} l${10 + r() * 20},-${4 + r() * 6} l${8 + r() * 14},${6} l-${20 + r() * 20},${4}Z" fill="#eef8ff" opacity=".9"/>`; }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// 2: three clear places as they are named: the polar ice shelf, Greenland's meltwater lakes, a mountain glacier pouring water to the sea
function sceneGlacier(t) {
  const c1 = WS(1, 2) - .25, c2 = WS(1, 3) - .25; let s = `<defs>${IDEF}</defs>`;
  if (t < c1) { // polar ice shelf edge with meltwater ponds
    s += `<rect width="720" height="1280" fill="#8ab0d0"/><rect width="720" height="600" fill="#cfe0ee"/>` + `<path d="M-20,620 C200,600 500,612 740,596 L740,860 L-20,880Z" fill="url(#iceF)"/><path d="M-20,620 C200,600 500,612 740,596 L740,860 L-20,880Z" fill="#fff" filter="url(#iceT2)" opacity=".8"/>`;
    for (let i = 0; i < 9; i++) { const r = RS(i + 40); s += `<ellipse cx="${r() * 700}" cy="${640 + r() * 200}" rx="${20 + r() * 40}" ry="${6 + r() * 8}" fill="#3a9ad8" opacity=".85"/>`; }
    for (let i = 0; i < 6; i++) s += `<path d="M${60 + i * 120},${860 - i * 3} l0,${40 + (i % 3) * 20}" stroke="#bfe6ff" stroke-width="6" stroke-dasharray="10 8" stroke-dashoffset="${-t * 80}"/>`;
    s += seaR(900, t) + `<g transform="translate(560,650)"><ellipse cx="0" cy="8" rx="20" ry="4" fill="#000" opacity=".2"/><ellipse cx="0" cy="-10" rx="9" ry="16" fill="#1a1a1a"/><ellipse cx="0" cy="-8" rx="6" ry="12" fill="#f4f4f0"/><circle cx="0" cy="-28" r="7" fill="#1a1a1a"/><path d="M5,-28 l6,2 l-6,2Z" fill="#e8a020"/></g>`;
  } else if (t < c2) { // Greenland: an ice sheet seen from the air, with turquoise melt lakes and rivers
    s += `<rect width="720" height="1280" fill="#e8f2f8"/><rect width="720" height="1280" fill="#fff" filter="url(#iceT2)" opacity=".7"/>`;
    const r = RS(77); for (let i = 0; i < 7; i++) { const cx = 80 + r() * 560, cy = 340 + r() * 760, rx = 40 + r() * 70; s += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * .6}" fill="#2ab0e0"/><ellipse cx="${cx}" cy="${cy}" rx="${rx * .7}" ry="${rx * .4}" fill="#7ad8f8" opacity=".7"/>`;
      let d = `M${cx},${cy}`; let x = cx, y = cy; for (let k = 0; k < 8; k++) { x += (r() - .5) * 60; y += 40 + r() * 30; d += ` L${x},${y}`; } s += `<path d="${d}" stroke="#2ab0e0" stroke-width="5" fill="none"/><path d="${d}" stroke="#bff0ff" stroke-width="2" fill="none" stroke-dasharray="8 12" stroke-dashoffset="${-t * 60}"/>`; }
  } else { // mountain glacier shrinking, meltwater river runs down to the sea
    const k = ease(ramp(t, c2, S0(2) - .3));
    s += `<rect width="720" height="1280" fill="#7aa8d8"/><rect y="0" width="720" height="500" fill="#a8c8e8"/>`;
    const mt = `M-20,820 L90,420 L190,560 L360,280 L520,560 L620,430 L740,820Z`;
    s += `<path d="${mt}" fill="#5a5e68"/><path d="${mt}" fill="#000" filter="url(#rockI)" opacity=".6"/><path d="M60,520 L90,420 L130,500Z M320,360 L360,280 L410,380Z M590,500 L620,430 L650,500Z" fill="#f4f8fc"/>`;
    const tip = lerp(980, 640, k), gl = `M170,620 C250,470 470,470 550,620 C520,740 480,${tip - 90} 460,${tip} C420,${tip + 30} 300,${tip + 30} 260,${tip} C240,${tip - 90} 200,740 170,620Z`;
    s += `<path d="M230,${tip} C260,${tip + 200} 320,1000 320,1100 L420,1100 C420,1000 460,${tip + 200} 490,${tip}Z" fill="#8a8274"/>` + Array.from({ length: 30 }, (_, i) => { const rr = RS(i + 30); return `<ellipse cx="${250 + rr() * 220}" cy="${tip + 30 + rr() * (1080 - tip)}" rx="${4 + rr() * 9}" ry="${3 + rr() * 5}" fill="#6a645a"/>`; }).join('');
    s += `<path d="${gl}" fill="url(#iceF)"/><path d="${gl}" fill="#fff" filter="url(#iceT2)" opacity=".75"/>` + Array.from({ length: 8 }, (_, i) => { const y = 560 + i * (tip - 560) / 8, w = 110 + 50 * Math.sin(i / 8 * Math.PI); return `<path d="M${360 - w},${y} Q360,${y + 22} ${360 + w},${y}" stroke="#3a8ac0" stroke-width="2.4" fill="none" opacity=".55"/>`; }).join('');
    s += `<path d="M360,${tip + 24} C350,${tip + 200} 400,1000 380,1110" stroke="#4aa8e0" stroke-width="20" fill="none"/><path d="M360,${tip + 24} C350,${tip + 200} 400,1000 380,1110" stroke="#e8f6ff" stroke-width="5" fill="none" stroke-dasharray="20 30" stroke-dashoffset="${-t * 120}"/>`;
    s += seaR(1100, t) + `<path d="M330,1100 q50,30 100,0" stroke="#bfe6ff" stroke-width="6" fill="none" opacity=".7"/>`;
  }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// 3: a coastal tower with numbered floors and a tide-gauge ruler; a big counter reads the rise up to +70 m; a swimmer rides the surface
function sceneRuler(t) {
  const st = S0(2) - .2, k = ease(ramp(t, W(2, 1)[1], S0(3) - .3));
  const G = 1150, m = 9, lvl = G - 70 * m * k;
  let s = `<defs>${IDEF}<linearGradient id="skR4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a86b8"/><stop offset="1" stop-color="#dce8f0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR4)"/>`;
  s += `<path d="M-20,${G - 120} C200,${G - 140} 500,${G - 130} 740,${G - 150} L740,${G} L-20,${G}Z" fill="#9aa8b0" opacity=".6"/>`;
  s += bldg(400, G, 170, 75 * m, '#9aa4b0', 5, .2);
  for (let f = 0; f <= 24; f += 2) s += `<text x="${396}" y="${G - f * 3 * m + 4}" text-anchor="end" font-family="Space Grotesk" font-size="14" fill="#2a2e36" opacity=".7">${'٠١٢٣٤٥٦٧٨٩'[Math.floor(f / 10)] + '٠١٢٣٤٥٦٧٨٩'[f % 10]}</text>`;
  s += `<rect x="210" y="${G - 76 * m}" width="40" height="${76 * m}" fill="#f4efe4"/><rect x="210" y="${G - 76 * m}" width="40" height="${76 * m}" fill="none" stroke="#8a8478" stroke-width="2"/>` + Array.from({ length: 76 }, (_, i) => `<line x1="${i % 5 ? 238 : 226}" y1="${G - i * m}" x2="250" y2="${G - i * m}" stroke="#1a1e26" stroke-width="${i % 10 ? 1.4 : 3}"/>`).join('') +
       Array.from({ length: 8 }, (_, i) => `<text x="204" y="${G - i * 10 * m + 6}" text-anchor="end" font-family="Space Grotesk" font-weight="700" font-size="18" fill="#1a1e26">${'٠١٢٣٤٥٦٧٨٩'[i]}٠</text>`).join('');
  s += `<rect y="${G}" width="720" height="${1280 - G}" fill="#c8b890"/>`;
  s += seaR(lvl, t);
  s += `<line x1="200" y1="${lvl}" x2="580" y2="${lvl}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 6"/>`;
  s += swimmer(320, lvl - 2, .7, t, CROWD[2], 1);
  const val = Math.round(70 * k); s += `<g transform="translate(560,${Math.max(380, lvl - 70)})"><rect x="-90" y="-40" width="180" height="70" rx="14" fill="rgba(8,12,30,.78)"/><text x="0" y="12" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="38" fill="#f4c76b">+${String(val).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d])} م</text></g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// Baghdadi house with shanasheel (wooden bay windows)
function shanasheel(x, base, w, h, seed) {
  const r = RS(seed); let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#c8a678"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".6"/><rect x="${x - 4}" y="${base - h - 8}" width="${w + 8}" height="10" fill="#a8865a"/>`;
  const bw = w * .6, bx = x + w * .2, by = base - h * .78, bh = h * .32;
  s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#6a3e1e"/><rect x="${bx - 6}" y="${by + bh}" width="${bw + 12}" height="8" fill="#4a2a12"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${bx + 6 + i * (bw - 12) / 5}" y="${by + 6}" width="${(bw - 12) / 5 - 6}" height="${bh - 12}" fill="#3a2410"/><path d="M${bx + 6 + i * (bw - 12) / 5},${by + 6} l${((bw - 12) / 5 - 6) / 2},-6 l${((bw - 12) / 5 - 6) / 2},6" fill="#8a5a2a"/>` +
    Array.from({ length: 3 }, (_, j) => `<line x1="${bx + 6 + i * (bw - 12) / 5}" y1="${by + 10 + j * (bh - 20) / 3}" x2="${bx + i * (bw - 12) / 5 + (bw - 12) / 5}" y2="${by + 10 + j * (bh - 20) / 3}" stroke="#a87a4a" stroke-width="1.4"/>`).join('')).join('');
  s += `<path d="M${x + w * .38},${base} L${x + w * .38},${base - 70} Q${x + w * .5},${base - 92} ${x + w * .62},${base - 70} L${x + w * .62},${base}Z" fill="#5a3a1e"/>`;
  return s;
}
// 4–5: Baghdad on the Tigris: shanasheel houses, a golden-domed mosque, palms; the water rises, people swim, fronds float
function sceneBaghdad(t) {
  const st = S0(3) - .2, k = ease(ramp(t, W(3, 10)[1] - 1.4, S0(4) - .3)), lvl = lerp(1010, 520, k);
  let s = `<defs>${IDEF}<linearGradient id="skB5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8784a"/><stop offset=".55" stop-color="#f4b878"/><stop offset="1" stop-color="#f8dcb0"/></linearGradient>` +
    `<radialGradient id="goldD" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff2a0"/><stop offset=".5" stop-color="#e8b020"/><stop offset="1" stop-color="#8a5a00"/></radialGradient>` +
    `<linearGradient id="tilB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3aa8b8"/><stop offset="1" stop-color="#1a6a7a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skB5)"/>`;
  s += `<circle cx="160" cy="600" r="64" fill="#fff0c8"/><circle cx="160" cy="600" r="240" fill="#ffd090" opacity=".35" filter="url(#soft)"/>`;
  s += `<g opacity=".7">` + bldg(-10, 900, 90, 260, '#b08a6a', 1, .15) + bldg(120, 900, 70, 200, '#a8826a', 2, .15) + bldg(600, 900, 100, 280, '#a0806a', 3, .15) + `</g>`;
  // mosque with golden dome and tiled minarets
  s += `<g><rect x="460" y="520" width="20" height="420" fill="url(#tilB)"/><rect x="640" y="520" width="20" height="420" fill="url(#tilB)"/><path d="M456,520 L484,520 L470,470Z M636,520 L664,520 L650,470Z" fill="url(#goldD)"/><rect x="452" y="620" width="36" height="12" fill="#e8b020"/><rect x="632" y="620" width="36" height="12" fill="#e8b020"/>` +
       `<rect x="490" y="760" width="140" height="180" fill="#d8c8a8"/><rect x="490" y="760" width="140" height="180" fill="#fff" filter="url(#wallI)" opacity=".5"/><path d="M490,760 C490,640 630,640 630,760Z" fill="url(#goldD)"/><path d="M506,740 C512,684 560,670 590,690" stroke="#fff8c8" stroke-width="6" fill="none" opacity=".7"/><rect x="556" y="620" width="8" height="24" fill="#e8b020"/>` +
       Array.from({ length: 4 }, (_, i) => `<path d="M${500 + i * 32},940 L${500 + i * 32},880 Q${514 + i * 32},860 ${528 + i * 32},880 L${528 + i * 32},940Z" fill="url(#tilB)"/>`).join('') + `</g>`;
  s += shanasheel(20, 960, 170, 220, 11) + shanasheel(200, 960, 140, 190, 12) + shanasheel(340, 960, 120, 240, 13);
  s += palmR(130, 990, 240, t) + palmR(420, 990, 270, t) + palmR(690, 990, 230, t);
  // riverbank promenade and the Tigris
  s += `<rect y="960" width="720" height="40" fill="#b8a07a"/><rect y="1000" width="720" height="280" fill="#5a8a9a"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 130 + 20}" y="975" width="10" height="26" fill="#6a5a4a"/>`).join('') + `<rect x="0" y="972" width="720" height="5" fill="#6a5a4a"/>`;
  // the rising sea with the sunset path
  s += seaR(lvl, t, { sunX: 160 });
  // floating palm fronds and debris
  for (let i = 0; i < 6; i++) { const r = RS(i + 500), x = pmod(r() * 760 + t * (6 + r() * 6), 760) - 20, y = lvl + 30 + r() * 200; s += `<path d="M${x},${y} q30,-6 60,0" stroke="#3a4a22" stroke-width="4" fill="none" opacity="${k}"/>`; }
  // people: standing on the bank at first, then swimming at the surface as it rises
  const swim = k > .08;
  if (!swim) s += person(250, 962, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, lookUp: .2, t }) + person(300, 962, { s: .57, face: -1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, lookUp: .2, t });
  else s += swimmer(250 + Math.sin(t * .6) * 20, lvl - 2, .8, t, CROWD[0], 0) + swimmer(380 + Math.sin(t * .5 + 1) * 20, lvl + 30, .7, t, CROWD[1], 2);
  if (k > .7) { const by = lvl; s += `<g transform="translate(${560 - (t - st) * 6},${by - 4})"><path d="M-60,0 L60,0 L44,22 L-44,22Z" fill="#7a4a2a"/><rect x="-2" y="-70" width="4" height="70" fill="#3a2a1a"/><path d="M2,-68 L48,-12 L2,-12Z" fill="#f4efe4"/></g>`; }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// green road sign
function roadSign(x, y, txt, sub) { return `<g transform="translate(${x},${y})"><rect x="-6" y="0" width="12" height="400" fill="#8a8e94"/><rect x="-110" y="-70" width="220" height="80" rx="8" fill="#1a6a3a"/><rect x="-104" y="-64" width="208" height="68" rx="6" fill="none" stroke="#fff" stroke-width="3"/><text x="0" y="-18" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff" direction="rtl">${txt}</text><text x="0" y="2" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="14" fill="#cfe8d8">${sub}</text></g>`; }
// 6: the Gulf creeps north: Basra corniche, Kuwait Towers, Doha towers; green road signs go under
function sceneGulf(t) {
  const st = S0(4) - .2, k = ease(ramp(t, st, S0(5) - .4)), pan = lerp(0, -1440, ease(ramp(t, WS(4, 4) - .3, WS(4, 7) + .6)));
  let s = `<defs>${IDEF}<linearGradient id="skGf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac0"/><stop offset="1" stop-color="#f0dcc0"/></linearGradient>` +
    `<radialGradient id="kwS" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#7ab8d8"/><stop offset=".6" stop-color="#2a6a9a"/><stop offset="1" stop-color="#0e3a5a"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skGf2)"/>`;
  s += `<g transform="translate(${pan},0)">`;
  // Basra: corniche with palms and low buildings
  s += bldg(20, 940, 120, 200, '#c8a888', 21, .15) + bldg(170, 940, 100, 160, '#b89878', 22, .15) + bldg(300, 940, 140, 240, '#c0a080', 23, .15) + bldg(480, 940, 110, 180, '#b8987a', 24, .15) +
       palmR(90, 960, 220, t) + palmR(270, 960, 250, t) + palmR(460, 960, 230, t) + palmR(640, 960, 260, t) + roadSign(360, 760, 'البصرة', 'BASRA');
  // Kuwait: the three towers with their spheres
  s += `<g transform="translate(720,0)">` + bldg(30, 940, 110, 300, '#9aa8b8', 31, .2) + bldg(560, 940, 120, 340, '#a8b4c0', 32, .2) +
       `<path d="M300,940 L306,360 L314,360 L320,940Z" fill="#d8dce2"/><circle cx="310" cy="560" r="70" fill="url(#kwS)"/><circle cx="310" cy="450" r="34" fill="url(#kwS)"/>` + Array.from({ length: 30 }, (_, i) => { const r = RS(i + 60), a = r() * 6.28, d = Math.sqrt(r()) * 62; return `<circle cx="${310 + Math.cos(a) * d}" cy="${560 + Math.sin(a) * d}" r="4" fill="#cfe8f8" opacity=".7"/>`; }).join('') +
       `<path d="M410,940 L414,520 L420,520 L424,940Z" fill="#d8dce2"/><circle cx="417" cy="660" r="46" fill="url(#kwS)"/><path d="M220,940 L222,640 L226,640 L228,940Z" fill="#d8dce2"/>` + roadSign(140, 760, 'الكويت', 'KUWAIT') + `</g>`;
  // Doha: curved modern towers
  s += `<g transform="translate(1440,0)">` + [[60, 520, 70, '#7a90a8'], [150, 440, 60, '#8aa0b8'], [240, 380, 80, '#6a8098'], [340, 500, 60, '#7a90a8'], [430, 400, 90, '#8a9cb0'], [540, 560, 70, '#7a8ca0'], [620, 470, 60, '#6a8098']].map(([x, y, w, c], i) => bldg(x, 940, w, 940 - y, c, 40 + i, .18)).join('') +
       `<path d="M430,400 Q475,300 520,400Z" fill="#8a9cb0"/>` + roadSign(560, 760, 'الدوحة', 'DOHA') + `</g>`;
  s += `<rect y="940" width="2160" height="340" fill="#c8b48a"/></g>`;
  s += seaR(lerp(1000, 690, k), t);
  F.ov = ''; F.earth = null; F.moon = null; F.pan = pan;
  return s;
}
// 7: four landmarks in more detail, half under the water with reflections
function sceneWorld(t) {
  const ws = [WS(5, 2), WS(5, 3), WS(5, 4), WS(5, 5)];
  const P = [
    (x, y) => { let s = `<rect x="${x + 135}" y="${y + 10}" width="56" height="340" fill="#b89a68"/><rect x="${x + 135}" y="${y + 10}" width="56" height="340" fill="#fff" filter="url(#wallI)" opacity=".5"/>` + Array.from({ length: 10 }, (_, i) => `<line x1="${x + 140 + (i % 5) * 11}" y1="${y + 130}" x2="${x + 140 + (i % 5) * 11}" y2="${y + 340}" stroke="#8a6a3a" stroke-width="2"/>`).join('');
      s += `<rect x="${x + 129}" y="${y + 40}" width="68" height="70" fill="#a8885a"/><circle cx="${x + 163}" cy="${y + 75}" r="26" fill="#f4ecd0" stroke="#3a2a1a" stroke-width="4"/><line x1="${x + 163}" y1="${y + 75}" x2="${x + 163}" y2="${y + 58}" stroke="#111" stroke-width="3"/><line x1="${x + 163}" y1="${y + 75}" x2="${x + 176}" y2="${y + 80}" stroke="#111" stroke-width="3"/>`;
      return s + `<path d="M${x + 129},${y + 10} L${x + 197},${y + 10} L${x + 182},${y - 50} L${x + 163},${y - 90} L${x + 144},${y - 50}Z" fill="#5a6a5a"/>` + bldg(x + 20, y + 350, 90, 130, '#8a7a6a', 81, .1) + bldg(x + 230, y + 350, 100, 110, '#7a6a5a', 82, .1); },
    (x, y) => { let s = `<rect x="${x + 190}" y="${y + 20}" width="40" height="330" fill="#a8583a"/><rect x="${x + 186}" y="${y}" width="48" height="30" fill="#e8e0d0"/><path d="M${x + 186},${y} L${x + 210},${y - 60} L${x + 234},${y}Z" fill="#4a8a6a"/>`;
      for (let i = 0; i < 4; i++) { const bx = x + 20 + i * 42, h = 140 + (i % 2) * 30; s += `<rect x="${bx}" y="${y + 350 - h}" width="40" height="${h}" fill="${['#d89a6a', '#e8b880', '#c88a5a', '#e0c090'][i]}"/>` + Array.from({ length: 3 }, (_, j) => `<path d="M${bx + 8},${y + 350 - h + 26 + j * 40} l0,-12 q6,-8 12,0 l0,12Z" fill="#5a3a2a"/>`).join(''); }
      return s + `<path d="M${x + 40},${y + 320} Q${x + 120},${y + 334} ${x + 200},${y + 316} L${x + 212},${y + 300} Q${x + 120},${y + 322} ${x + 46},${y + 306}Z" fill="#141414"/>`; },
    (x, y) => `<rect x="${x + 166}" y="${y - 30}" width="10" height="380" fill="#9a7aa8"/><circle cx="${x + 171}" cy="${y + 230}" r="44" fill="#d84a8a"/><circle cx="${x + 160}" cy="${y + 220}" r="14" fill="#f8a8c8" opacity=".6"/><circle cx="${x + 171}" cy="${y + 100}" r="30" fill="#d84a8a"/><circle cx="${x + 171}" cy="${y + 20}" r="12" fill="#d84a8a"/>` +
      `<path d="M${x + 260},${y + 350} L${x + 266},${y - 60} Q${x + 290},${y - 80} ${x + 300},${y - 50} L${x + 310},${y + 350}Z" fill="#7a9ab8"/><path d="M${x + 266},${y - 60} Q${x + 284},${y + 140} ${x + 300},${y + 350}" stroke="#bcd0e4" stroke-width="3" fill="none"/>` + bldg(x + 30, y + 350, 80, 220, '#6a7484', 91, .12),
    (x, y) => `<rect x="${x + 150}" y="${y + 230}" width="60" height="120" fill="#8a8a7a"/><path d="M${x + 156},${y + 230} L${x + 162},${y + 70} L${x + 198},${y + 70} L${x + 204},${y + 230}Z" fill="#5a9a8a"/><path d="M${x + 164},${y + 70} C${x + 156},${y + 30} ${x + 196},${y + 14} ${x + 194},${y + 70}Z" fill="#5a9a8a"/>` +
      `<path d="M${x + 168},${y + 26} l4,-14 l4,12 l4,-14 l4,14 l4,-12 l2,12" stroke="#5a9a8a" stroke-width="4" fill="none"/><path d="M${x + 194},${y + 44} L${x + 222},${y - 50}" stroke="#5a9a8a" stroke-width="11" stroke-linecap="round"/><path d="M${x + 214},${y - 46} l16,-24 l8,8 l-10,24Z" fill="#f0c040"/><circle cx="${x + 226}" cy="${y - 64}" r="12" fill="#ffd060" opacity=".5" filter="url(#blur2)"/>` +
      bldg(x + 20, y + 350, 60, 260, '#7a8494', 101, .12) + bldg(x + 260, y + 350, 70, 300, '#6a7484', 102, .12),
  ];
  let s = `<defs>${IDEF}</defs><rect width="720" height="1280" fill="#0c1424"/>`;
  [[0, 260], [360, 260], [0, 760], [360, 760]].forEach(([x, y], i) => { const a = ease(ramp(t, ws[i] - .2, ws[i] + .3)), lvl = lerp(y + 470, y + 300, ease(ramp(t, ws[i], ws[i] + 2)));
    s += `<g opacity="${a}"><defs><clipPath id="pc${i}"><rect x="${x + 10}" y="${y}" width="340" height="480" rx="16"/></clipPath><linearGradient id="ps${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${['#7a8ca8', '#e8a87a', '#8a9ab8', '#6a8ab8'][i]}"/><stop offset="1" stop-color="${['#d8dce0', '#f8dcc0', '#d8d0dc', '#d8e4f0'][i]}"/></linearGradient></defs>` +
      `<g clip-path="url(#pc${i})"><rect x="${x + 10}" y="${y}" width="340" height="480" fill="url(#ps${i})"/>${P[i](x, y + 80)}` +
      `<g transform="translate(0,${2 * lvl}) scale(1,-1)" opacity=".18">${P[i](x, y + 80)}</g>` +
      `<rect x="${x}" y="${lvl}" width="360" height="${y + 480 - lvl}" fill="#2a6a9a" opacity=".82"/>` + Array.from({ length: 5 }, (_, k) => `<path d="M${x},${lvl + 14 + k * 20} ${Array.from({ length: 9 }, () => 'q20,-3 40,0').join(' ')}" stroke="#cfe8f8" stroke-width="1.6" fill="none" opacity="${.3 - k * .04}" transform="translate(${Math.sin(t + k) * 8},0)"/>`).join('') +
      `<path d="M${x},${lvl} ${Array.from({ length: 9 }, (_, k) => `q20,${-5 + Math.sin(t * 2 + k + i) * 3} 40,0`).join(' ')}" stroke="#e8f6ff" stroke-width="3" fill="none"/></g>` +
      `<rect x="${x + 10}" y="${y}" width="340" height="480" rx="16" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/></g>`; });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// 8: an iceberg melts: its fresh meltwater (lighter plume) spreads and mixes into the darker salt sea
function sceneFresh(t) {
  const st = S0(6) - .2, k = ease(ramp(t, st, S0(7) - .3)), mixK = ease(ramp(t, WS(6, 4), WS(6, 7) + 1));
  let s = `<defs>${IDEF}<linearGradient id="skF4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac0"/><stop offset="1" stop-color="#e0ecf4"/></linearGradient><radialGradient id="plume" cx=".5" cy=".2" r=".7"><stop offset="0" stop-color="#bfeaff" stop-opacity=".85"/><stop offset="1" stop-color="#bfeaff" stop-opacity="0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skF4)"/>`;
  const WL = 640, sc = lerp(1, .45, k);
  s += `<rect y="${WL}" width="720" height="640" fill="#1e4a6a"/>`;
  // underwater part of the berg (much bigger), with bubbles, and the above-water peak
  s += `<g transform="translate(360,${WL}) scale(${sc})"><path d="M-260,0 L-200,260 L-80,380 L60,360 L200,240 L250,0Z" fill="#7ab8d8" opacity=".55"/>` +
       `<path d="M-180,0 L-120,-170 L-40,-120 L20,-240 L110,-110 L180,0Z" fill="url(#iceF)"/><path d="M-180,0 L-120,-170 L-40,-120 L20,-240 L110,-110 L180,0Z" fill="#fff" filter="url(#iceT2)" opacity=".8"/>` +
       Array.from({ length: 30 }, (_, i) => { const r = RS(i + 700); return `<circle cx="${(r() - .5) * 300}" cy="${-r() * 200 + 20}" r="${1 + r() * 3}" fill="#fff" opacity=".7"/>`; }).join('') + `</g>`;
  // meltwater plume spreading into the salt sea
  s += `<ellipse cx="360" cy="${WL + 60 + mixK * 80}" rx="${120 + mixK * 380}" ry="${50 + mixK * 140}" fill="url(#plume)" opacity="${.9 - mixK * .4}"/>`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * .1, d = 80 + mixK * 260; s += `<path d="M${360 + Math.cos(a) * d * .5},${WL + 60 + Math.sin(a) * 40} q${Math.cos(a) * 60},${30} ${Math.cos(a) * d},${60 + Math.sin(a) * 40}" stroke="#bfeaff" stroke-width="4" fill="none" opacity="${.35 * (1 - mixK * .5)}"/>`; }
  s += `<path d="M-20,${WL} ${Array.from({ length: 19 }, (_, i) => `q20,${-4 + Math.sin(t * 2 + i) * 3} 40,0`).join(' ')}" stroke="#eaf6ff" stroke-width="3" fill="none"/>`;
  s += `<g transform="translate(150,${WL + 300})"><rect x="-70" y="-26" width="140" height="52" rx="12" fill="rgba(8,12,30,.65)"/><text x="0" y="8" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#bfeaff" direction="rtl">ماء عذب</text></g><g transform="translate(570,${WL + 500})"><rect x="-70" y="-26" width="140" height="52" rx="12" fill="rgba(8,12,30,.65)"/><text x="0" y="8" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" direction="rtl">ماء مالح</text></g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// 9: a real-looking hourglass on the shore; no people
function sceneTime(t) {
  const st = S0(7) - .2, k = ramp(t, st, S0(8));
  let s = `<defs>${IDEF}<linearGradient id="skT4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8784a"/><stop offset="1" stop-color="#f8d8b0"/></linearGradient>` +
    `<linearGradient id="wood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a3418"/><stop offset=".5" stop-color="#a8703a"/><stop offset="1" stop-color="#4a2a12"/></linearGradient>` +
    `<linearGradient id="glassH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".2" stop-color="#fff" stop-opacity=".08"/><stop offset=".8" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity=".3"/></linearGradient>` +
    `<linearGradient id="sandG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0d090"/><stop offset="1" stop-color="#c8a058"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skT4)"/>`;
  s += `<circle cx="560" cy="700" r="70" fill="#fff0c8" opacity=".9"/><circle cx="560" cy="700" r="260" fill="#ffd090" opacity=".3" filter="url(#soft)"/>`;
  s += seaR(820, t, { sunX: 560 }) + `<path d="M-20,1100 C200,1080 500,1090 740,1070 L740,1300 L-20,1300Z" fill="#d8b47a"/><path d="M-20,1100 C200,1080 500,1090 740,1070" stroke="#f4e0b0" stroke-width="6" fill="none"/>`;
  s += `<g transform="translate(360,760)"><ellipse cx="0" cy="335" rx="190" ry="20" fill="#000" opacity=".3" filter="url(#blur2)"/>` +
       `<rect x="-170" y="-330" width="340" height="30" rx="10" fill="url(#wood)"/><rect x="-170" y="300" width="340" height="30" rx="10" fill="url(#wood)"/>` +
       [-150, 150].map(px => `<rect x="${px - 9}" y="-300" width="18" height="600" fill="url(#wood)"/>` + [-200, 0, 200].map(py => `<ellipse cx="${px}" cy="${py}" rx="13" ry="8" fill="#6a4020"/>`).join('')).join('') +
       `<path d="M-120,-296 C-120,-100 -18,-40 -12,0 C-18,40 -120,100 -120,296 L120,296 C120,100 18,40 12,0 C18,-40 120,-100 120,-296Z" fill="#cfe8f4" opacity=".18"/>` +
       `<clipPath id="hgT"><path d="M-120,-296 C-120,-100 -18,-40 -12,0 L12,0 C18,-40 120,-100 120,-296Z"/></clipPath><clipPath id="hgB"><path d="M-12,0 C-18,40 -120,100 -120,296 L120,296 C120,100 18,40 12,0Z"/></clipPath>` +
       `<g clip-path="url(#hgT)"><path d="M-130,${-296 + 260 * k} Q0,${-296 + 260 * k + 40} 130,${-296 + 260 * k} L130,0 L-130,0Z" fill="url(#sandG)"/></g>` +
       `<g clip-path="url(#hgB)"><path d="M-130,296 L-130,${296 - 40 * k} Q0,${296 - 200 * k} 130,${296 - 40 * k} L130,296Z" fill="url(#sandG)"/></g>` +
       `<line x1="0" y1="0" x2="0" y2="${296 - 200 * k}" stroke="#e8c070" stroke-width="3" stroke-dasharray="3 4" stroke-dashoffset="${-t * 60}"/>` +
       `<path d="M-120,-296 C-120,-100 -18,-40 -12,0 C-18,40 -120,100 -120,296 L120,296 C120,100 18,40 12,0 C18,-40 120,-100 120,-296Z" fill="url(#glassH)" stroke="#fff" stroke-opacity=".45" stroke-width="3"/>` +
       `<path d="M-96,-270 C-96,-130 -40,-70 -24,-20" stroke="#fff" stroke-width="6" fill="none" opacity=".35"/></g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
