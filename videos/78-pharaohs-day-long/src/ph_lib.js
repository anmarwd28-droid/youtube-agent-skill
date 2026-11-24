// ===================== Pharaohs long video: shared drawing library (1280x720 world) =====================
const PHD = `<linearGradient id="phSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6c690"/><stop offset="1" stop-color="#c89a60"/></linearGradient>` +
  `<linearGradient id="phSandN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b47c"/><stop offset="1" stop-color="#b08250"/></linearGradient>` +
  `<linearGradient id="phLimeL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fbf8ef"/><stop offset=".55" stop-color="#ece4d2"/><stop offset="1" stop-color="#dcd0b6"/></linearGradient>` +
  `<linearGradient id="phLimeS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfc3a8"/><stop offset="1" stop-color="#a89a7e"/></linearGradient>` +
  `<linearGradient id="phOldL" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2c48c"/><stop offset="1" stop-color="#c8a064"/></linearGradient>` +
  `<linearGradient id="phOldS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b08854"/><stop offset="1" stop-color="#8a6840"/></linearGradient>` +
  `<linearGradient id="phNile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d8fa2"/><stop offset=".45" stop-color="#3f7186"/><stop offset="1" stop-color="#2a5266"/></linearGradient>` +
  `<linearGradient id="phNileD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7c70"/><stop offset="1" stop-color="#4a5a4c"/></linearGradient>` +
  `<linearGradient id="phMud" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b48c62"/><stop offset=".6" stop-color="#a88058"/><stop offset="1" stop-color="#94704c"/></linearGradient>` +
  `<linearGradient id="phWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#5a3a1e"/></linearGradient>` +
  `<linearGradient id="phPap" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#efdfb2"/><stop offset=".5" stop-color="#e2cc96"/><stop offset="1" stop-color="#cdb07a"/></linearGradient>` +
  `<linearGradient id="phGran" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b08a84"/><stop offset=".5" stop-color="#94706c"/><stop offset="1" stop-color="#6a5050"/></linearGradient>` +
  `<linearGradient id="phLinen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ddd4c0"/><stop offset=".45" stop-color="#f6f1e4"/><stop offset="1" stop-color="#e6dcc8"/></linearGradient>` +
  `<radialGradient id="phGlow"><stop offset="0" stop-color="#fff6d8" stop-opacity=".9"/><stop offset=".35" stop-color="#ffe9a8" stop-opacity=".35"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="phFire"><stop offset="0" stop-color="#ffb040" stop-opacity=".65"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="phVig" cx=".5" cy=".5" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>` +
  `<radialGradient id="phHoney" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffd76a"/><stop offset=".6" stop-color="#e09a1a"/><stop offset="1" stop-color="#a8620a"/></radialGradient>` +
  `<linearGradient id="phCopper" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e0a070"/><stop offset=".5" stop-color="#b86a3a"/><stop offset="1" stop-color="#8a4a24"/></linearGradient>` +
  `<linearGradient id="phClay" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5232"/><stop offset=".4" stop-color="#c07a4a"/><stop offset="1" stop-color="#7a4628"/></linearGradient>` +
  `<pattern id="phBrick" width="30" height="14" patternUnits="userSpaceOnUse"><rect width="30" height="14" fill="none"/><path d="M0,13.5 H30 M15,0 V7 M0,7 H30 M0,7 V13.5 M30,7 V13.5" stroke="#6a4a2c" stroke-width="1.1" opacity=".42"/></pattern>` +
  `<pattern id="phCourse" width="46" height="18" patternUnits="userSpaceOnUse"><path d="M0,17.5 H46 M23,0 V9 M0,9 H46 M8,9 V17.5 M38,9 V17.5" stroke="#5a4428" stroke-width="1.2" opacity=".38"/></pattern>` +
  `<filter id="phSandT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .5" numOctaves="2" seed="17"/><feColorMatrix values="0 0 0 0 .35  0 0 0 0 .24  0 0 0 0 .12  0 0 0 -1.9 1.05"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="phStoneT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05 .09" numOctaves="4" seed="27"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .2  0 0 0 0 .12  0 0 0 -1.5 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="phPaperT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .5" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .4  0 0 0 0 .3  0 0 0 0 .15  0 0 0 -1.6 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="phHeat" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".004 .04" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 .95  0 0 0 0 .85  0 0 0 1.2 -.4"/><feComposite in2="SourceGraphic" operator="in"/><feGaussianBlur stdDeviation="3"/></filter>` +
  `<filter id="phSm" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="14"/></filter><filter id="phB4" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>`;
const PHDF = (x = '') => `<defs>${DEFB()}${PHD}${x}</defs>`;
const grain = (a = .1) => `<rect x="-300" y="-300" width="1880" height="1320" fill="#000" filter="url(#grainR)" opacity="${a}"/>`;
const vign = (a = 1) => `<rect x="-300" y="-300" width="1880" height="1320" fill="url(#phVig)" opacity="${a}"/>`;
const ttl = (t, a, b) => ease(ramp(t, a, b));
// ---------- skies: mode dawn | day | noon | dusk | night. Draws -300..1580 x -300..1020 ----------
const SKY = { dawn: ['#3a4a7a', '#c88a7a', '#f6c890'], day: ['#3f7fc0', '#9cc4e4', '#efe0c0'], noon: ['#5a94cc', '#b8d4e8', '#f4ead2'], dusk: ['#2e3a6a', '#c8704a', '#f4b060'], night: ['#03060f', '#0a1230', '#16224a'], pre: ['#060a1c', '#1a2450', '#5a4a6a'] };
function skyP(id, m, o = {}) { const c = Array.isArray(m) ? m : SKY[m]; let s = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c[0]}"/><stop offset=".62" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></linearGradient></defs><rect x="-300" y="-300" width="1880" height="${(o.hz ?? 520) + 300}" fill="url(#${id})"/>`;
  if (o.sun) { const [x, y, a = 1, r = 34, col = '#fffdf2'] = o.sun; s += `<g opacity="${a}"><circle cx="${x}" cy="${y}" r="${r * 9}" fill="url(#phGlow)" opacity=".7"/><circle cx="${x}" cy="${y}" r="${r * 2.2}" fill="#fff4cf" opacity=".4" filter="url(#phB4)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${col}"/></g>`; }
  return s; }
// stars with the Milky Way; Sirius optional {six, siy, sia}
const STP = (() => { const r = RS(909); return Array.from({ length: 520 }, () => [r() * 1880 - 300, r() * 760 - 280, Math.pow(r(), 3.2) * 1.8 + .35, r() * 6, r()]); })();
function starsP(t, a = 1, hz = 600, o = {}) { if (a <= 0) return ''; let s = STP.map(p => p[1] > hz - 10 ? '' : `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${p[2].toFixed(2)}" fill="${p[4] < .12 ? '#ffe2c0' : p[4] > .88 ? '#cfe0ff' : '#fff'}" opacity="${(a * clamp((hz - p[1]) / 120) * (.55 + .4 * Math.sin(t * 1.3 + p[3]))).toFixed(2)}"/>`).join('');
  if (o.mw) s += milkyP(o.mw * a, o.mwx ?? 640, o.mwy ?? 200, o.mwa ?? -28, 1.1);
  if (o.sir) { const [x, y, k] = o.sir; s += `<g opacity="${(a * k).toFixed(2)}"><circle cx="${x}" cy="${y}" r="26" fill="#cfe4ff" opacity=".28" filter="url(#phB4)"/><path d="M${x - 22},${y} H${x + 22} M${x},${y - 22} V${y + 22}" stroke="#e8f2ff" stroke-width="1.6" opacity=".7"/><circle cx="${x}" cy="${y}" r="4.6" fill="#fff"/></g>`; }
  if (o.ori) { const [x, y, k] = o.ori; [[0, 0], [22, -8], [44, -16], [-40, -88], [70, -96], [-30, 80], [82, 64]].forEach(([dx, dy], i) => { s += `<circle cx="${x + dx}" cy="${y + dy}" r="${i < 3 ? 2.8 : 3.2}" fill="${i === 3 ? '#ffc8a0' : '#e8f0ff'}" opacity="${(a * k).toFixed(2)}"/>`; }); }
  return s; }
// ---------- ground ----------
function desertP(y, o = {}) { const c = o.col || 'url(#phSand)'; let s = `<path d="M-300,${y + 10} Q100,${y - 18} 420,${y + 4} T1000,${y - 6} T1580,${y + 6} V1100 H-300Z" fill="${c}"/><rect x="-300" y="${y - 20}" width="1880" height="1100" fill="#000" filter="url(#phSandT)" opacity="${o.gr ?? .22}" clip-path="none"/>`;
  if (o.ripples !== 0) { const r = RS(o.seed || 3); for (let i = 0; i < 40; i++) { const x = r() * 1880 - 300, yy = y + 20 + Math.pow(r(), 1.6) * 600, w = 40 + r() * 120; s += `<path d="M${x.toFixed(0)},${yy.toFixed(0)} q${w / 2},-6 ${w},0" stroke="#9a7040" stroke-width="1.5" fill="none" opacity=".28"/>`; } }
  return s; }
const dunesBack = (y, col = '#d8b47e', a = 1) => `<path d="M-300,${y} C-100,${y - 60} 120,${y - 70} 300,${y - 20} C460,${y + 20} 620,${y - 80} 860,${y - 40} C1060,${y - 10} 1220,${y - 70} 1580,${y - 30} V${y + 60} H-300Z" fill="${col}" opacity="${a}"/><path d="M-300,${y + 20} C0,${y - 10} 300,${y + 30} 640,${y + 6} C900,${y - 12} 1200,${y + 24} 1580,${y + 4} V${y + 70} H-300Z" fill="${mix(col, '#b88a58', .4)}" opacity="${a}"/>`;
// ---------- palms, papyrus, reeds ----------
const palmP = (x, y, h, t, o = {}) => palmR(x, y, h, t, o.col || '#4a3a26', o.fr || '#3e5a26');
function papyrusP(x, y, n, sd, t, h = 120) { const r = RS(sd); let s = '';
  for (let i = 0; i < n; i++) { const xx = x + (r() - .5) * 90, hh = h * (.6 + r() * .5), b = Math.sin(t * 1.2 + i * 1.7) * 5, tx = xx + b + (r() - .5) * 26, ty = y - hh;
    s += `<path d="M${xx.toFixed(1)},${y} Q${(xx + b / 2).toFixed(1)},${(y - hh / 2).toFixed(1)} ${tx.toFixed(1)},${ty.toFixed(1)}" stroke="#5a7a2e" stroke-width="2.6" fill="none"/>`;
    let u = ''; for (let k = 0; k < 13; k++) { const a = -Math.PI * .95 + k * Math.PI * .9 / 12; u += `M${tx.toFixed(1)},${ty.toFixed(1)} l${(Math.cos(a) * 22).toFixed(1)},${(Math.sin(a) * 18).toFixed(1)} `; }
    s += `<path d="${u}" stroke="${mix('#6a8a34', '#9ab04a', r())}" stroke-width="1.6" fill="none"/><ellipse cx="${tx.toFixed(1)}" cy="${(ty - 8).toFixed(1)}" rx="20" ry="9" fill="#7a9a3a" opacity=".45"/>`; }
  return s; }
// ---------- the Great Pyramid. k = built fraction of height (1 = complete); old = today's stepped look; tip = gold capstone ----------
function pyrP(x, base, w, o = {}) {
  const h = w * .636, k = o.k ?? 1, old = o.old || 0, top = base - h * k, hw = w / 2, tw = hw * (1 - k), id = o.id || 'p', lit = o.lit ?? 1;
  const L = `M${x - hw},${base} L${x - tw},${top} L${x + tw * .25},${top} L${x + hw * .25},${base}Z`, R = `M${x + hw * .25},${base} L${x + tw * .25},${top} L${x + tw},${top} L${x + hw},${base}Z`;
  let s = `<path d="M${x - hw * 1.08},${base + 4} L${x + hw * 1.6},${base + 4} L${x + hw * 1.1},${base - 8} L${x - hw},${base}Z" fill="#000" opacity=".18" filter="url(#phB4)"/>`;
  s += `<path d="${L}" fill="${old ? 'url(#phOldL)' : 'url(#phLimeL)'}"/><path d="${R}" fill="${old ? 'url(#phOldS)' : 'url(#phLimeS)'}"/>`;
  s += `<clipPath id="pc${id}"><path d="${L} ${R}"/></clipPath><g clip-path="url(#pc${id})">`;
  if (old) { const n = Math.max(12, Math.round(h / 7)); for (let i = 0; i < n; i++) { const y = base - h * i / n; s += `<path d="M${x - hw},${y.toFixed(1)} H${x + hw}" stroke="#6a4a28" stroke-width="${(h / n * .26).toFixed(2)}" opacity=".45"/>`; }
    s += `<rect x="${x - hw}" y="${base - h}" width="${w}" height="${h}" fill="#000" filter="url(#phStoneT)" opacity=".55"/>`; }
  else { const n = Math.max(10, Math.round(h / 12)); for (let i = 1; i < n; i++) { const y = base - h * i / n; if (y < top) break; s += `<path d="M${x - hw},${y.toFixed(1)} H${x + hw}" stroke="#a89878" stroke-width=".7" opacity=".3"/>`; }
    s += `<rect x="${x - hw}" y="${base - h}" width="${w}" height="${h}" fill="#000" filter="url(#phStoneT)" opacity=".12"/>` +
      `<path d="M${x - hw * .55},${base} L${x - tw * .2},${top} L${x - tw * .05 + hw * .05},${top} L${x - hw * .25},${base}Z" fill="#fff" opacity="${(.28 * lit).toFixed(2)}"/>`; }
  s += `</g>`;
  if (old) { let st = ''; const n = 26; for (let i = 0; i < n; i++) { const y0 = base - h * i / n, y1 = base - h * (i + 1) / n, x0 = x - hw * (1 - i / n), x1 = x - hw * (1 - (i + 1) / n); st += `L${x0.toFixed(1)},${y1.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)} `; }
    s += `<path d="M${x - hw},${base} ${st}" stroke="#c8a468" stroke-width="2" fill="none" opacity=".8"/>`; }
  if (k < 1) { s += `<path d="M${x - tw},${top} L${x + tw},${top} L${x + tw * .9},${top - 5} L${x - tw * .9},${top - 5}Z" fill="#c8b898"/>`; const r = RS(41); for (let i = 0; i < Math.min(40, tw / 6); i++) { const bx = x - tw * .9 + r() * tw * 1.8; s += `<rect x="${bx.toFixed(1)}" y="${(top - 9).toFixed(1)}" width="${(5 + r() * 6).toFixed(1)}" height="4.5" fill="${r() > .3 ? '#d8ccb0' : '#b8a888'}"/>`; } }
  else if (o.tip) s += `<path d="M${x},${base - h} L${x - w * .03},${base - h + w * .019} L${x + w * .03 * .25},${base - h + w * .019}Z" fill="#f4d27a"/><path d="M${x},${base - h} L${x + w * .03 * .25},${base - h + w * .019} L${x + w * .03},${base - h + w * .019}Z" fill="#b8902a"/>`;
  return s; }
// a mud-brick construction ramp against the left face
function rampP(x, base, w, k, a = 1) { const h = w * .636 * k, hw = w / 2, tw = hw * (1 - k);
  return `<g opacity="${a}"><path d="M${x - hw - w * .42},${base} L${x - tw - 6},${base - h + 4} L${x - tw + 22},${base - h + 4} L${x - hw - w * .3},${base}Z" fill="#b89064"/><path d="M${x - hw - w * .42},${base} L${x - tw - 6},${base - h + 4} L${x - tw - 2},${base - h + 10} L${x - hw - w * .36},${base}Z" fill="#8a6440"/><path d="M${x - hw - w * .42},${base} L${x - tw - 6},${base - h + 4} L${x - tw + 22},${base - h + 4} L${x - hw - w * .3},${base}Z" fill="url(#phBrick)" opacity=".6"/></g>`; }
// tiny far figures (dots of people) along a path
function antP(x, y, s, f, t, ph = 0, col = '#efe8d8', sk = '#7a4e30') { const w = Math.sin(t * 7 + ph) * 3 * s;
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(f * s).toFixed(3)},${s.toFixed(3)})"><path d="M-2,-6 L${(-3 + w).toFixed(1)},0 M2,-6 L${(3 - w).toFixed(1)},0" stroke="${sk}" stroke-width="2.2"/><rect x="-3.4" y="-11" width="7" height="6" fill="${col}"/><path d="M-2.5,-11 L-1.5,-19 L2.5,-19 L3,-11Z" fill="${sk}"/><circle cx="0.6" cy="-22" r="3" fill="${sk}"/><circle cx="-0.4" cy="-23" r="3" fill="#1a120c" opacity=".8"/></g>`; }
// ---------- a stone block and the sledge team ----------
function blockP(x, y, w, h, o = {}) { const top = o.col || '#ece4d0', side = mix(top, '#7a6a50', .32), d = h * .32;
  return `<path d="M${x},${y} h${w} l${d},${-d} h${-w} Z" fill="${mix(top, '#ffffff', .25)}"/><path d="M${x + w},${y} v${h} l${d},${-d} v${-h}Z" fill="${side}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${top}"/><rect x="${x}" y="${y - d}" width="${w + d}" height="${h + d}" fill="#000" filter="url(#phStoneT)" opacity=".35"/>` +
    (o.mark ? o.mark : ''); }
function sledgeP(x, y, w, o = {}) { // runners curved up at the front (+x)
  return `<path d="M${x - 8},${y} H${x + w - 10} Q${x + w + 14},${y} ${x + w + 18},${y - 26} L${x + w + 8},${y - 26} Q${x + w + 4},${y - 10} ${x + w - 12},${y - 10} H${x - 8}Z" fill="url(#phWood)"/>` +
    Array.from({ length: Math.floor(w / 34) + 1 }, (_, i) => `<rect x="${x + i * 34}" y="${y - 18}" width="12" height="9" fill="#6a4426"/>`).join('') + `<path d="M${x - 8},${y - 12} H${x + w}" stroke="#4a2e16" stroke-width="2"/>`; }
// water poured from a jar: stream from (x,y) to the ground (gx, gy), wet patch growing with k
function pourP(x, y, gx, gy, t, k = 1) { const r = RS(3); let d = `M${x},${y} Q${(x + gx) / 2 + 10},${y + 6} ${gx},${gy}`; let s = `<path d="${d}" stroke="#bfe0ee" stroke-width="5" fill="none" opacity=".8"/><path d="${d}" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7" stroke-dasharray="6 10" stroke-dashoffset="${(-t * 60).toFixed(1)}"/>`;
  for (let i = 0; i < 6; i++) { const a = pmod(t * 2 + i / 6, 1); s += `<circle cx="${(gx + (r() - .5) * 26 * a).toFixed(1)}" cy="${(gy - 10 * Math.sin(a * Math.PI)).toFixed(1)}" r="2" fill="#dff2fa" opacity="${(1 - a).toFixed(2)}"/>`; }
  return s; }
const wetP = (x, y, w, k) => k > 0 ? `<ellipse cx="${x}" cy="${y}" rx="${(w * k).toFixed(1)}" ry="${(w * .12 * k + 4).toFixed(1)}" fill="#8a6234" opacity=".55"/><ellipse cx="${x}" cy="${y - 1}" rx="${(w * k * .7).toFixed(1)}" ry="${(w * .07 * k + 2).toFixed(1)}" fill="#a0d0e0" opacity=".18"/>` : '';
// ---------- boats ----------
function boatP(x, y, s, f, t, o = {}) { const L = 260, bob = Math.sin(t * 1.4 + x * .01) * 2;
  let g = `<g transform="translate(${x},${(y + bob).toFixed(1)}) scale(${f * s},${s})">`;
  g += `<path d="M${-L / 2 - 40},-46 Q${-L / 2 + 10},4 0,6 Q${L / 2 - 10},4 ${L / 2 + 40},-50 Q${L / 2 + 20},-26 ${L / 2 - 20},-24 L${-L / 2 + 20},-24 Q${-L / 2 - 20},-24 ${-L / 2 - 40},-46Z" fill="url(#phWood)"/>` +
    `<path d="M${-L / 2 + 20},-24 H${L / 2 - 20}" stroke="#c89a62" stroke-width="3"/><path d="M${-L / 2 - 10},-14 Q0,2 ${L / 2 + 8},-14" stroke="#3a2412" stroke-width="2" fill="none" opacity=".5"/>`;
  if (o.cargo) g += blockP(-70, -64, 60, 40) + blockP(4, -60, 50, 36, { col: '#f2ecdc' }) + blockP(-20, -96, 52, 32);
  if (o.sail) g += `<path d="M10,-24 V-230" stroke="#4a2e16" stroke-width="5"/><path d="M-70,-216 Q12,-226 92,-214 L84,-60 Q10,-68 -62,-58Z" fill="#efe6cc"/><path d="M-70,-216 Q12,-226 92,-214 L84,-60 Q10,-68 -62,-58Z" fill="#000" filter="url(#phPaperT)" opacity=".25"/><path d="M-74,-218 H96 M-66,-58 H88" stroke="#5a3a1c" stroke-width="4"/>`;
  g += `<path d="M${L / 2 - 30},-30 L${L / 2 + 30},18" stroke="#5a3a1c" stroke-width="5"/><path d="M${L / 2 + 22},8 l14,22 l8,-4Z" fill="#5a3a1c"/>`;
  if (o.rowers) for (let i = 0; i < o.rowers; i++) { const rx = -L / 2 + 40 + i * 44, ph = t * 2.2 + i * .2, a = Math.sin(ph) * 16;
    g += `<path d="M${rx},-40 L${rx + a - 14},18" stroke="#6a4a2a" stroke-width="3"/><circle cx="${rx}" cy="-62" r="8" fill="#8a5a3a"/><rect x="${rx - 7}" y="-56" width="14" height="22" rx="4" fill="#8a5a3a"/><rect x="${rx - 8}" y="-38" width="16" height="10" fill="#efe8d8"/><circle cx="${rx - 1}" cy="-65" r="7" fill="#1a120c" opacity=".7"/>`; }
  return g + `</g>` + `<ellipse cx="${x}" cy="${y + 10}" rx="${L * s * .62}" ry="${7 * s}" fill="#fff" opacity=".12"/>`; }
// ---------- animals ----------
function crocP(x, y, s, f, t) { const sw = Math.sin(t * 2) * 6;
  return `<g transform="translate(${x},${y}) scale(${f * s},${s})"><path d="M-220,${2 + sw} Q-150,${-6 - sw} -90,-8 Q-20,-16 40,-14 Q90,-14 130,-10 Q170,-8 186,-2 Q160,4 120,4 Q40,8 -60,6 Q-150,8 -220,${2 + sw}Z" fill="#4a5a32"/>` +
    Array.from({ length: 14 }, (_, i) => `<path d="M${-160 + i * 18},${(-6 - (i < 9 ? 4 : 2)).toFixed(1)} l6,-7 l6,7" fill="#3a4826"/>`).join('') + `<ellipse cx="96" cy="-16" rx="12" ry="7" fill="#4a5a32"/><circle cx="99" cy="-18" r="3.4" fill="#e8c040"/><path d="M99,-21 v6" stroke="#000" stroke-width="1.4"/><circle cx="178" cy="-8" r="2.5" fill="#2a3018"/>` +
    `<path d="M-230,6 Q0,16 200,4" stroke="#cfe6ee" stroke-width="2" fill="none" opacity=".5"/></g>`; }
function hippoP(x, y, s, f, t, open = 0) { const o = open, jaw = o * 1.1;  // a hippo low in the water, head to +x; open = 0..1 gapes the jaws
  const body = '#6e5e62', lit = '#8a787a', dark = '#4e4044';
  let g = `<g transform="translate(${x},${y}) scale(${f * s},${s})"><ellipse cx="-120" cy="6" rx="150" ry="40" fill="${body}"/><ellipse cx="-130" cy="-12" rx="120" ry="16" fill="${lit}" opacity=".5"/>`;
  // head: skull + broad muzzle; the lower jaw swings down when it gapes
  g += `<g transform="rotate(${(-28 * jaw).toFixed(1)},20,-30)"><path d="M-10,-44 Q20,-74 70,-66 Q120,-62 150,-46 Q176,-36 172,-12 Q164,4 130,4 Q80,2 30,-6 Q-6,-12 -10,-44Z" fill="${body}"/><path d="M-6,-44 Q20,-70 70,-62 Q118,-58 148,-44" stroke="${lit}" stroke-width="6" fill="none" opacity=".6"/>` +
    `<ellipse cx="150" cy="-40" rx="7" ry="4" fill="#2a1e22"/><ellipse cx="132" cy="-46" rx="6" ry="3.5" fill="#2a1e22"/><path d="M30,-70 q-6,-20 8,-18 q4,8 -2,16Z" fill="${dark}"/><ellipse cx="48" cy="-66" rx="10" ry="7" fill="${body}"/><circle cx="51" cy="-68" r="3.6" fill="#140c0e"/>` +
    (o > 0 ? `<path d="M40,-4 Q100,0 168,-10 L166,-2 Q100,10 40,4Z" fill="#c85a6a"/><path d="M150,-8 l5,-16 l6,15Z M120,-4 l4,-12 l5,11Z" fill="#f4eee0"/>` : '') + `</g>`;
  if (o > 0) g += `<path d="M24,-10 Q100,-14 166,-16 L168,-8 Q100,0 26,0Z" fill="#b84a5c"/><path d="M28,-4 Q100,-2 168,-10 Q174,4 150,12 Q80,16 20,10Z" fill="${body}"/><path d="M150,-14 l5,-18 l7,17Z M118,-12 l4,-12 l5,11Z" fill="#f4eee0"/>`;
  else g += `<path d="M30,-6 Q90,8 160,2 Q172,12 150,18 Q80,22 20,12Z" fill="${dark}"/>`;
  g += `<path d="M-280,18 Q-60,34 200,16" stroke="#cfe6ee" stroke-width="2.6" fill="none" opacity=".55"/><ellipse cx="-40" cy="22" rx="250" ry="10" fill="#2a5266" opacity=".45"/></g>`;
  return g; }
// ---------- water band (Nile) between y0 (far bank) and y1 ----------
function nileP(y0, y1, t, o = {}) { let s = `<rect x="-300" y="${y0}" width="1880" height="${y1 - y0}" fill="${o.col || 'url(#phNile)'}"/>`;
  const r = RS(o.seed || 7); for (let i = 0; i < (o.n || 46); i++) { const yy = y0 + 6 + Math.pow(r(), 1.3) * (y1 - y0 - 10), w = 20 + r() * 70 * (1 + (yy - y0) / (y1 - y0)), x = pmod(r() * 1900 + t * (12 + r() * 10) * (o.flow ?? 1), 1900) - 310;
    s += `<path d="M${x.toFixed(1)},${yy.toFixed(1)} h${w.toFixed(1)}" stroke="#e4f2f6" stroke-width="${(1 + (yy - y0) / (y1 - y0) * 1.6).toFixed(1)}" opacity="${(.18 + r() * .25).toFixed(2)}" stroke-linecap="round"/>`; }
  if (o.glint) s += `<ellipse cx="${o.glint[0]}" cy="${(y0 + y1) / 2}" rx="${o.glint[1]}" ry="${(y1 - y0) * .3}" fill="#fff8e0" opacity=".1" filter="url(#phSm)"/>`;
  return s; }
// ---------- a mud-brick house: front wall, high small windows, door, roof parapet ----------
function houseP(x, base, w, h, o = {}) { const c = o.col || 'url(#phMud)', sd = o.seed || 1, r = RS(sd);
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${c}"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="url(#phBrick)"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#fff" filter="url(#wallI)" opacity=".35"/>` +
    `<rect x="${x - 4}" y="${base - h - 10}" width="${w + 8}" height="12" fill="${mix('#b89068', '#ffffff', .1)}"/><path d="M${x - 4},${base - h + 2} H${x + w + 4}" stroke="#000" stroke-width="4" opacity=".15"/>` +
    `<rect x="${x + w - 26}" y="${base - h}" width="26" height="${h}" fill="#000" opacity=".12"/>`;
  const nw = Math.max(1, Math.floor(w / 80)); for (let i = 0; i < nw; i++) { const wx = x + 22 + i * (w - 40) / nw + (r() - .5) * 10; s += `<rect x="${wx.toFixed(1)}" y="${base - h + 18}" width="18" height="12" fill="#2a1a0e"/><path d="M${(wx + 6).toFixed(1)},${base - h + 18} v12 M${(wx + 12).toFixed(1)},${base - h + 18} v12" stroke="#8a6a44" stroke-width="2"/>`; }
  if (o.door !== 0) { const dx = x + (o.door ?? .3) * w; s += `<rect x="${dx}" y="${base - 74}" width="34" height="74" fill="#3a2414"/><rect x="${dx - 5}" y="${base - 80}" width="44" height="8" fill="#8a6a44"/><rect x="${dx + 2}" y="${base - 72}" width="30" height="72" fill="#5a3a20" opacity=".5"/>`; }
  if (o.stair) s += Array.from({ length: 8 }, (_, i) => `<rect x="${x + w + i * 9}" y="${base - h + 12 + i * (h - 12) / 8}" width="${(8 - i) * 9 + 6}" height="${(h - 12) / 8 + 1}" fill="${mix('#a88058', '#000000', i * .02)}"/>`).reverse().join('');
  return s + `<rect x="${x}" y="${base - 10}" width="${w}" height="10" fill="#000" opacity=".12"/>`; }
// ---------- props ----------
function jarP(x, y, s = 1, o = {}) { const c = o.col || 'url(#phClay)';  // a tall beer jar with a pointed base on a ring stand (y = ground)
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="6" fill="#000" opacity=".3" filter="url(#blur2)"/><path d="M-16,0 L16,0 L12,-14 L-12,-14Z" fill="#7a4a2a"/>` +
    `<path d="M-10,-12 Q-34,-40 -30,-80 Q-26,-108 -14,-118 L14,-118 Q26,-108 30,-80 Q34,-40 10,-12Z" fill="${c}"/><path d="M-10,-12 Q-34,-40 -30,-80 Q-26,-108 -14,-118 L-6,-118 Q-20,-80 -4,-12Z" fill="#000" opacity=".18"/>` +
    `<rect x="-16" y="-126" width="32" height="9" rx="3" fill="#9a6038"/>${o.seal ? `<ellipse cx="0" cy="-128" rx="16" ry="6" fill="#5a4a3a"/>` : `<ellipse cx="0" cy="-126" rx="13" ry="4" fill="#2a160a"/>`}<path d="M-22,-66 Q0,-60 22,-66" stroke="#5a2e14" stroke-width="2" fill="none" opacity=".5"/><ellipse cx="14" cy="-84" rx="5" ry="16" fill="#fff" opacity=".14"/></g>`; }
function breadP(x, y, s = 1, k = 'round') { if (k === 'cone') return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-16,0 Q-14,-40 0,-56 Q14,-40 16,0Z" fill="#c88a4a"/><path d="M-16,0 Q-14,-40 0,-56 Q-4,-30 -4,0Z" fill="#000" opacity=".12"/><path d="M-6,-40 q6,-6 10,0" stroke="#8a5a2a" fill="none" opacity=".5"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="34" ry="8" fill="#000" opacity=".25" filter="url(#blur2)"/><path d="M-32,0 Q-30,-22 0,-24 Q30,-22 32,0 Q0,8 -32,0Z" fill="#c88a48"/><path d="M-26,-6 Q-10,-20 20,-14" stroke="#e8b070" stroke-width="5" fill="none" opacity=".6"/><path d="M-12,-16 l6,4 M2,-18 l6,4 M14,-14 l5,4" stroke="#8a5222" stroke-width="2"/></g>`; }
const onionP = (x, y, s = 1) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-34 Q-4,-28 -16,-18 Q-24,-6 -14,2 Q0,8 14,2 Q24,-6 16,-18 Q4,-28 0,-34Z" fill="#d8a8b8"/><path d="M0,-34 Q-8,-16 -4,4 M0,-34 Q8,-16 4,4" stroke="#a86878" stroke-width="1.4" fill="none"/><path d="M0,-34 q-2,-12 4,-20" stroke="#7a9a4a" stroke-width="2.4" fill="none"/><path d="M-6,6 l-2,5 M0,8 v5 M6,6 l2,5" stroke="#c8b8a0" stroke-width="1.2"/></g>`;
function headrestP(x, y, s = 1) { // a wooden crescent headrest on a pillar and foot
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="120" ry="14" fill="#000" opacity=".3" filter="url(#phB4)"/><path d="M-90,0 H90 Q96,-16 70,-18 H-70 Q-96,-16 -90,0Z" fill="url(#phWood)"/>` +
    `<path d="M-26,-18 Q-34,-60 -22,-96 H22 Q34,-60 26,-18Z" fill="url(#phWood)"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M-28,${-30 - i * 14} H28" stroke="#3a2210" stroke-width="2" opacity=".5"/>`).join('') +
    `<path d="M-120,-150 Q-100,-96 0,-92 Q100,-96 120,-150 Q126,-150 128,-140 Q110,-78 0,-74 Q-110,-78 -128,-140 Q-126,-150 -120,-150Z" fill="url(#phWood)"/><path d="M-118,-146 Q-96,-100 0,-96 Q96,-100 118,-146" stroke="#c8925a" stroke-width="3" fill="none" opacity=".7"/>` +
    `<rect x="-130" y="-160" width="260" height="140" fill="#000" filter="url(#wallI)" opacity=".25"/></g>`; }
function papyrusSheet(x, y, w, h, k = 1, o = {}) { // a sheet of papyrus with writing (hieratic-looking strokes); k reveals writing
  const r = RS(o.seed || 5); let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#phPap)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000" filter="url(#phPaperT)" opacity=".35"/>` +
    Array.from({ length: Math.floor(w / 46) }, (_, i) => `<path d="M${x + 23 + i * 46},${y} V${y + h}" stroke="#a88a50" stroke-width="1" opacity=".25"/>`).join('');
  const rows = Math.floor((h - 30) / (o.lh || 22)), lh = o.lh || 22;
  for (let i = 0; i < rows; i++) { const yy = y + 24 + i * lh; let xx = x + w - 18; while (xx > x + 20) { const ww = 6 + r() * 16; if ((x + w - 18 - xx) / (w - 40) + i / rows * .02 > k * 1.02) break;
      const red = i === 0 && o.red, col = red ? '#9a2a1a' : '#2a1a10'; s += `<path d="M${xx.toFixed(1)},${(yy - r() * 6).toFixed(1)} q${(-ww / 2).toFixed(1)},${(6 - r() * 12).toFixed(1)} ${(-ww).toFixed(1)},${(r() * 4).toFixed(1)}" stroke="${col}" stroke-width="${(1.6 + r() * 1.4).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
      if (r() < .3) s += `<circle cx="${(xx - ww / 2).toFixed(1)}" cy="${(yy - 12).toFixed(1)}" r="1.5" fill="${col}"/>`; xx -= ww + 4 + (r() < .12 ? 10 : 0); } }
  return s; }
// simple hieroglyph signs, drawn in a 40x40 box at (x,y) (top-left)
const HG = {
  owl: `<path d="M10,40 Q6,18 14,8 Q20,2 26,8 Q30,14 30,26 L36,40Z"/><circle cx="17" cy="12" r="2.6" fill="#f4e6c4"/><circle cx="24" cy="12" r="2.6" fill="#f4e6c4"/>`,
  vult: `<path d="M4,40 L10,22 Q12,10 22,10 Q30,10 30,16 L26,18 Q36,26 38,40Z"/><path d="M22,10 q8,-6 10,0" stroke-width="2"/>`,
  eye: `<path d="M2,20 Q20,4 38,20 Q20,32 2,20Z"/><circle cx="20" cy="19" r="5" fill="#f4e6c4"/><path d="M14,28 q-2,8 -8,10 M22,28 q6,4 10,0" fill="none" stroke-width="2.4"/>`,
  hand: `<path d="M2,26 Q2,18 12,18 H34 Q38,20 34,24 H22 Q26,26 22,30 H8 Q2,30 2,26Z"/>`,
  water: `<path d="M2,20 l4,-4 l4,4 l4,-4 l4,4 l4,-4 l4,4 l4,-4 l4,4 l4,-4" fill="none" stroke-width="3"/>`,
  reed: `<path d="M18,40 Q16,20 22,4 Q30,18 22,40Z"/><path d="M20,40 V28" stroke-width="2"/>`,
  mouth: `<path d="M2,20 Q20,8 38,20 Q20,30 2,20Z"/>`,
  loaf: `<path d="M8,30 Q20,14 32,30Z"/>`,
  snake: `<path d="M4,30 Q10,22 16,30 T28,30 Q34,28 36,22" fill="none" stroke-width="3.4"/>`,
  sun: `<circle cx="20" cy="20" r="12" fill="none" stroke-width="3"/><circle cx="20" cy="20" r="3"/>`,
  foot: `<path d="M8,10 V30 Q8,34 14,34 H34 Q36,30 30,28 H14 V10Z"/>`,
  ankh: `<ellipse cx="20" cy="10" rx="6" ry="8" fill="none" stroke-width="3.4"/><path d="M8,20 H32 M20,18 V40" fill="none" stroke-width="3.4"/>`,
  bee: `<ellipse cx="22" cy="24" rx="12" ry="7"/><path d="M14,18 q4,-12 10,-2 M20,18 q8,-12 12,0" fill="none" stroke-width="2"/>` };
const hg = (k, x, y, s = 1, col = '#1e140c', a = 1) => `<g transform="translate(${x},${y}) scale(${s})" fill="${col}" stroke="${col}" opacity="${a}">${HG[k]}</g>`;
// a gold cartouche with signs inside
function cartP(x, y, w, h, signs, col = '#9a2a1a', a = 1) { let s = `<g opacity="${a}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="none" stroke="${col}" stroke-width="4"/><path d="M${x + w + 6},${y + 6} V${y + h - 6}" stroke="${col}" stroke-width="5"/>`;
  signs.forEach((k, i) => { s += hg(k, x + 14 + i * (w - 28) / signs.length, y + (h - 34) / 2, .85, col); }); return s + `</g>`; }
// fire with flames and a glow; smoke column
function fireP(x, y, t, k = 1) { let s = `<circle cx="${x}" cy="${y - 20}" r="${120 * k}" fill="url(#phFire)"/>`;
  for (let i = 0; i < 5; i++) { const ph = t * 6 + i * 1.3, h = (34 + 16 * Math.sin(ph)) * k, dx = (i - 2) * 9 * k; s += `<path d="M${x + dx - 10 * k},${y} Q${x + dx - 8 * k},${y - h * .5} ${x + dx + 3 * Math.sin(ph * 1.3)},${y - h} Q${x + dx + 9 * k},${y - h * .45} ${x + dx + 10 * k},${y}Z" fill="url(#flameG)" opacity=".92"/>`; }
  return s + `<path d="M${x - 24 * k},${y + 2} l48,-8 M${x - 22 * k},${y - 6} l46,8" stroke="#3a2412" stroke-width="${6 * k}" stroke-linecap="round"/>`; }
function smokeP(x, y, t, h = 260, a = .5) { let s = ''; for (let i = 0; i < 9; i++) { const u = pmod(t * .12 + i / 9, 1), yy = y - u * h, xx = x + Math.sin(u * 5 + i) * 18 + u * 50; s += `<circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${(10 + u * 40).toFixed(1)}" fill="#c8c0b8" opacity="${(a * Math.sin(u * Math.PI) * .6).toFixed(2)}"/>`; } return `<g filter="url(#phSm)">${s}</g>`; }
// a heat shimmer band over the desert
const heatP = (y, a = .25) => `<rect x="-300" y="${y - 40}" width="1880" height="80" fill="#fff" filter="url(#phHeat)" opacity="${a}"/>`;
// dust haze in the air
const dustP = (t, a = .3) => `<g opacity="${a}"><ellipse cx="${300 + Math.sin(t * .2) * 80}" cy="430" rx="700" ry="160" fill="#e8d2a8" filter="url(#phSm)" opacity=".5"/><ellipse cx="${1000 - Math.sin(t * .17) * 60}" cy="520" rx="600" ry="120" fill="#e8d2a8" filter="url(#phSm)" opacity=".4"/></g>`;
// a picture panel with a gold frame (for insets)
const frameP = (x, y, w, h, inner, id, a = 1) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}"><rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="14" fill="#0a0e1c" opacity=".9"/><clipPath id="fr${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath><g clip-path="url(#fr${id})">${inner}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="#f4c76b" stroke-width="2.5"/></g>`;
const circP = (cx, cy, R, inner, id, a = 1) => a <= 0 ? '' : `<g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 7}" fill="#0a0e1c" opacity=".9"/><clipPath id="cr${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><g clip-path="url(#cr${id})">${inner}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="3"/></g>`;
const darkP = (x, y, w, h, a = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#0a0e1c" opacity="${(.86 * a).toFixed(2)}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="none" stroke="#fff" stroke-opacity="${(.14 * a).toFixed(2)}"/>`;
const goldT = (x, y, tx, a = 1, fs = 30, col = '#f4c76b', anc = 'middle') => txt(x, y, tx, a, col, fs, anc);
