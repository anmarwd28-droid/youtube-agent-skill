// ===== #57 «ماذا لو لم يُكتشف لقاح كورونا؟» — part A: helpers, scenes 0–4 =====
const CVDEF = `<radialGradient id="cvBody" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#ece6e0"/><stop offset=".45" stop-color="#b9aca6"/><stop offset=".82" stop-color="#6c5c5a"/><stop offset="1" stop-color="#3a2c2c"/></radialGradient>` +
  `<radialGradient id="cvShade" cx=".36" cy=".32" r=".78"><stop offset="0" stop-color="#fff" stop-opacity=".25"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset=".9" stop-color="#1a0e0e" stop-opacity=".55"/><stop offset="1" stop-color="#0a0404" stop-opacity=".8"/></radialGradient>` +
  `<radialGradient id="cvHead" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9a7a"/><stop offset=".45" stop-color="#e0442c"/><stop offset="1" stop-color="#7a1810"/></radialGradient>` +
  `<radialGradient id="cvHeadB" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c8604a"/><stop offset=".5" stop-color="#8a2a1c"/><stop offset="1" stop-color="#3a0c08"/></radialGradient>` +
  `<radialGradient id="cvDot" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffe08a"/><stop offset=".6" stop-color="#e09a2a"/><stop offset="1" stop-color="#8a4a10"/></radialGradient>` +
  `<radialGradient id="bokeh"><stop offset="0" stop-color="#9ad0ff" stop-opacity=".5"/><stop offset=".6" stop-color="#5a90d0" stop-opacity=".18"/><stop offset="1" stop-color="#2a4a80" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="micBg" cx=".5" cy=".55" r=".75"><stop offset="0" stop-color="#1e3448"/><stop offset=".6" stop-color="#0c1824"/><stop offset="1" stop-color="#04080e"/></radialGradient>` +
  `<radialGradient id="tubeL"><stop offset="0" stop-color="#fffbe8" stop-opacity=".95"/><stop offset=".35" stop-color="#eaf4ff" stop-opacity=".35"/><stop offset="1" stop-color="#cfe6ff" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="o2G" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e5a3a"/><stop offset=".35" stop-color="#4aa06a"/><stop offset=".55" stop-color="#2e7a4e"/><stop offset="1" stop-color="#123a24"/></linearGradient>` +
  `<linearGradient id="chromeV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a727c"/><stop offset=".3" stop-color="#eef2f6"/><stop offset=".6" stop-color="#9aa2ac"/><stop offset="1" stop-color="#4a525c"/></linearGradient>` +
  `<linearGradient id="goldM" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".35" stop-color="#e8b840"/><stop offset=".7" stop-color="#b0801c"/><stop offset="1" stop-color="#6a4a0c"/></linearGradient>`;
const CVD = () => SCD() + CVDEF;
// points spread evenly on a sphere (for the spikes and the small proteins)
const FIBP = n => { const p = []; for (let i = 0; i < n; i++) { const yv = 1 - 2 * (i + .5) / n, r = Math.sqrt(1 - yv * yv), th = i * 2.39996; p.push([Math.cos(th) * r, yv, Math.sin(th) * r]); } return p; };
const FIB44 = FIBP(44), FIB120 = FIBP(120);
const rot3 = (p, ry, rx) => { const c = Math.cos(ry), s = Math.sin(ry), X = p[0] * c + p[2] * s, Z0 = -p[0] * s + p[2] * c, c2 = Math.cos(rx), s2 = Math.sin(rx); return [X, p[1] * c2 - Z0 * s2, p[1] * s2 + Z0 * c2]; };
// the coronavirus: a grey shaded sphere with a fine bumpy coat, red club-shaped spikes in 3D (back ones behind, front ones foreshortened), small orange proteins
function covV(x, y, R, t, o = {}) {
  const a = o.a ?? 1; if (a <= .005) return '';
  const id = o.id || 'v', ry = (o.rot ?? .22) * t + (o.ph || 0), rx = o.rx ?? .4, hd = o.head || 'cvHead', hdB = o.headB || 'cvHeadB';
  const P = FIB44.map(p => rot3(p, ry, rx)), F2 = FIB120.map(p => rot3(p, ry * 1.0 + .13, rx));
  const spike = ([X, Y, Z], back) => {
    const bx = x + X * R * .97, by = y + Y * R * .97, L = 1.31, tx = x + X * R * L, ty = y + Y * R * L, sd = Math.hypot(X, Y) || 1e-3, ang = Math.atan2(Y, X) * 57.2958;
    const hl = R * (.085 + .07 * sd), hw = R * .095, sw = R * .034;
    return `<path d="M${bx.toFixed(1)},${by.toFixed(1)} L${(x + X * R * (L - .06)).toFixed(1)},${(y + Y * R * (L - .06)).toFixed(1)}" stroke="${back ? '#5a2018' : '#a8382a'}" stroke-width="${sw.toFixed(1)}" stroke-linecap="round"/>` +
      `<ellipse cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" rx="${hl.toFixed(1)}" ry="${hw.toFixed(1)}" transform="rotate(${ang.toFixed(1)},${tx.toFixed(1)},${ty.toFixed(1)})" fill="url(#${back ? hdB : hd})"/>` +
      (back ? '' : `<ellipse cx="${(tx - hw * .25).toFixed(1)}" cy="${(ty - hw * .3).toFixed(1)}" rx="${(hw * .35).toFixed(1)}" ry="${(hw * .22).toFixed(1)}" fill="#fff" opacity=".35"/>`);
  };
  let s = `<g opacity="${a.toFixed(2)}"${o.blur ? ` filter="url(#${o.blur})"` : ''}>`;
  P.filter(p => p[2] < 0).sort((p, q) => p[2] - q[2]).forEach(p => s += spike(p, 1));
  const d = `M${x - R},${y} a${R},${R} 0 1 0 ${2 * R},0 a${R},${R} 0 1 0 ${-2 * R},0Z`;
  s += `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#cvBody)"/>`;
  if (!o.simple) s += `<g opacity=".55">${litRock(d, 'cv' + id, '#efe2dc', '#6a5452', 31 + (o.seed || 0), { fx: 9 / R, fy: 9 / R, sc: 2.6, x: x - R, y: y - R, w: 2 * R, h: 2 * R, az: 225, el: 40 })}</g>`;
  F2.forEach(([X, Y, Z], i) => { if (Z < .12) return; const r0 = R * (.03 + (i % 3) * .008); s += `<circle cx="${(x + X * R * .99).toFixed(1)}" cy="${(y + Y * R * .99).toFixed(1)}" r="${r0.toFixed(1)}" fill="url(#cvDot)" opacity="${(.35 + .6 * Z).toFixed(2)}"/>`; });
  s += `<circle cx="${x}" cy="${y}" r="${R}" fill="url(#cvShade)"/>`;
  P.filter(p => p[2] >= 0).sort((p, q) => p[2] - q[2]).forEach(p => s += `<circle cx="${(x + p[0] * R * .97).toFixed(1)}" cy="${(y + p[1] * R * .97).toFixed(1)}" r="${(R * .05).toFixed(1)}" fill="#000" opacity="${(.22 * p[2]).toFixed(2)}"/>` + spike(p, 0));
  s += `<circle cx="${x}" cy="${y}" r="${(R * 1.01).toFixed(1)}" fill="none" stroke="#a8d4ff" stroke-width="${(R * .025).toFixed(1)}" opacity=".22"/>`;
  return s + `</g>`;
}
// a surgical mask on the house person (put in the head group, so it turns with the head)
function maskP(svg, col = '#cfe2ee') {
  const m = svg.match(/<ellipse cx="(-?[\d.]+)" cy="(-?[\d.]+)" rx="4" ry="6\.5"/); if (!m) return svg;
  const hx = +m[1] + 14, hy = +m[2] - 1, i1 = svg.indexOf('</g>', svg.indexOf(m[0]));
  const mk = `<path d="M${hx - 12},${hy + 4} L${hx - 15},${hy - 1} M${hx - 10},${hy + 15} L${hx - 15},${hy + 5}" stroke="#eef4f8" stroke-width="1.6" fill="none"/>` +
    `<path d="M${hx - 9},${hy + 3} Q${hx + 6},${hy - 1} ${hx + 20},${hy + 2} Q${hx + 25},${hy + 12} ${hx + 18},${hy + 21} Q${hx + 5},${hy + 27} ${hx - 8},${hy + 18}Z" fill="${col}"/>` +
    `<path d="M${hx - 8},${hy + 8} Q${hx + 7},${hy + 5} ${hx + 22},${hy + 8} M${hx - 8},${hy + 13} Q${hx + 7},${hy + 11} ${hx + 21},${hy + 14}" stroke="#8aa8bc" stroke-width="1.1" fill="none" opacity=".7"/>` +
    `<path d="M${hx - 8},${hy + 15} Q${hx + 6},${hy + 25} ${hx + 18},${hy + 21} Q${hx + 5},${hy + 27} ${hx - 8},${hy + 18}Z" fill="#000" opacity=".12"/>`;
  return svg.slice(0, i1) + mk + svg.slice(i1);
}
// long hair down the back of the head (for women), drawn after the person
function hairL(s, f, col) { const [hx, hy] = HP.head; return `<path d="M${(hx - f * 4 * s).toFixed(1)},${(hy - 22 * s).toFixed(1)} Q${(hx - f * 26 * s).toFixed(1)},${(hy - 16 * s).toFixed(1)} ${(hx - f * 24 * s).toFixed(1)},${(hy + 14 * s).toFixed(1)} Q${(hx - f * 26 * s).toFixed(1)},${(hy + 44 * s).toFixed(1)} ${(hx - f * 12 * s).toFixed(1)},${(hy + 52 * s).toFixed(1)} Q${(hx - f * 8 * s).toFixed(1)},${(hy + 30 * s).toFixed(1)} ${(hx - f * 10 * s).toFixed(1)},${(hy + 4 * s).toFixed(1)} Q${(hx - f * 6 * s).toFixed(1)},${(hy - 12 * s).toFixed(1)} ${(hx + f * 4 * s).toFixed(1)},${(hy - 20 * s).toFixed(1)}Z" fill="${col}"/>`; }
// a few soft out-of-focus particles (depth in micro views)
function bokehF(t, n, seed, a = 1) { const r = RS(seed); let s = ''; for (let i = 0; i < n; i++) { const x = r() * 760 - 20 + Math.sin(t * .3 + i) * 14, y = 380 + r() * 900 + Math.cos(t * .25 + i * 2) * 12, rr = 14 + r() * 46; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#bokeh)" opacity="${((.3 + r() * .5) * a).toFixed(2)}"/>`; } return s; }

// ---------- 0: the Earth with red patches spreading; the virus in front ----------
function sceneHook(t) {
  const k = ease(ramp(t, 0, 2.9));
  gAt(t, 360, 650, { d: lerp(10.2, 8.8, k), el: .3, lon: 25 + t * 6, clouds: .45, lights: .55, off: -1.0 });
  F.w.disc.inf = { o: [-90, 0], r: -1, a: 1, g: lerp(.12, .62, k) };
  const vy = lerp(1110, 1000, ease(ramp(t, 0, 1.6)));
  F.ov = covV(140, 470, 34, t, { id: 'h1', a: .55, blur: 'blur2', simple: 1, ph: 1 }) + covV(620, 520, 26, t, { id: 'h2', a: .5, blur: 'blur2', simple: 1, ph: 2 }) + covV(560, vy, 128, t, { id: 'h0', rot: .18 });
  return `<defs>${CVD()}</defs>` + space(t);
}

// ---------- 1: the fastest vaccine in history: under a year (the record before: four years) ----------
function tubesR(x, y, s) {   // a rack of test tubes with coloured liquids
  const C = ['#e85a4a', '#f4c84a', '#4ab0e8', '#8ad86a', '#e85a4a', '#c88ae8'];
  let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="60" cy="4" rx="90" ry="9" fill="#000" opacity=".3" filter="url(#blur2)"/>`;
  C.forEach((c, i) => { const tx = i * 24; g += `<rect x="${tx}" y="-96" width="15" height="90" rx="7" fill="#eaf4fa" opacity=".4"/><rect x="${tx + 1.5}" y="-50" width="12" height="42" rx="6" fill="${c}" opacity=".85"/><rect x="${tx + 3}" y="-92" width="3" height="80" fill="#fff" opacity=".55"/>`; });
  return g + `<rect x="-12" y="-46" width="150" height="12" rx="3" fill="#dfe4ea"/><rect x="-12" y="-12" width="150" height="14" rx="3" fill="#c8ced6"/><rect x="-12" y="-34" width="150" height="3" fill="#000" opacity=".15"/></g>`;
}
function sceneSpeed(t) {
  const t0 = S0(1) - .2, T = t - t0, pg = ease(ramp(t, WS(1, 1), WS(1, 9))), cmp = ease(ramp(t, WS(1, 15) - .3, WS(1, 15) + .3)), b4 = ease(ramp(t, WS(1, 15), WS(1, 20) + .2));
  let s = `<defs>${CVD()}<linearGradient id="labW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe8ee"/><stop offset="1" stop-color="#c2d0d8"/></linearGradient><linearGradient id="benchT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset="1" stop-color="#c8d0d6"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#labW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".07"/>`;
  // wall tiles, a big window with the city, shelves with glassware
  for (let i = 0; i < 16; i++) s += `<path d="M${i * 48 - 10},560 V980" stroke="#aebcc6" stroke-width="1.2" opacity=".6"/>`;
  for (let j = 0; j < 9; j++) s += `<path d="M-20,${560 + j * 48} H740" stroke="#aebcc6" stroke-width="1.2" opacity=".6"/>`;
  s += `<rect x="28" y="330" width="330" height="210" fill="#f2f6f8"/><clipPath id="lwC"><rect x="40" y="342" width="306" height="186"/></clipPath><g clip-path="url(#lwC)"><rect x="40" y="342" width="306" height="186" fill="url(#skyDay)"/>${farCity(57, 520, '#8a9cae')}${cumulus(150 + T * 3, 400, 140, 41, { a: .8 })}</g>` +
    `<path d="M193,342 V528 M40,435 H346" stroke="#f2f6f8" stroke-width="7"/><path d="M60,500 L150,350" stroke="#fff" stroke-width="16" opacity=".18"/>`;
  s += `<rect x="400" y="440" width="300" height="12" fill="#e8ecef"/><rect x="400" y="452" width="300" height="5" fill="#000" opacity=".18"/><rect x="400" y="600" width="300" height="12" fill="#e8ecef"/><rect x="400" y="612" width="300" height="5" fill="#000" opacity=".18"/>`;
  s += flask(440, 432, .5, .5, '#4ab0e8') + flask(520, 432, .4, .6, '#e8c84a') + `<rect x="580" y="370" width="40" height="70" rx="6" fill="#8a5a3a" opacity=".85"/><rect x="580" y="390" width="40" height="22" fill="#f4ecd8"/><rect x="640" y="380" width="34" height="60" rx="5" fill="#3a6a9a" opacity=".85"/>` +
    flask(450, 592, .42, .4, '#8ad86a') + `<rect x="500" y="540" width="70" height="60" rx="4" fill="#f4f6f8"/><rect x="506" y="546" width="58" height="34" fill="#2a3a48"/><path d="M510,566 l10,-6 l10,8 l10,-12 l10,6 l10,-4" stroke="#4af08a" stroke-width="2" fill="none"/>` + flask(630, 592, .48, .55, '#e85a4a');
  // the scientist behind the bench, holding a vial up to the light
  const hx = 450, hy = 820;
  s += maskP(man(520, 1060, .95, -1, 2, { top: '#f6f8fa', pants: '#2a3a5a', hF: [hx, hy], aB: [.15, .5] }), '#bcd8ea');
  { const [ex, ey] = HP.eye; s += `<path d="M${ex - 14},${ey - 6} h20 v9 h-20Z" fill="#cfe8ff" opacity=".35" stroke="#5a6a78" stroke-width="1.5"/>`; }
  s += `<g transform="translate(${hx - 6},${hy - 56})"><rect x="-10" y="0" width="20" height="44" rx="4" fill="#eef6fc" opacity=".6"/><rect x="-8" y="16" width="16" height="26" rx="3" fill="#f2e2b0" opacity=".9"/><rect x="-9" y="-8" width="18" height="10" rx="2" fill="#4a8ad8"/><rect x="-6" y="4" width="3" height="34" fill="#fff" opacity=".6"/></g>`;
  // the bench
  s += `<rect x="-20" y="980" width="760" height="22" fill="url(#benchT)"/><rect x="-20" y="1002" width="760" height="300" fill="#4a5a68"/><rect x="-20" y="1002" width="760" height="300" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="1002" width="760" height="14" fill="#000" opacity=".3"/>` +
    [0, 1, 2, 3].map(i => `<rect x="${i * 190 - 6}" y="1030" width="176" height="250" rx="6" fill="#55687a"/><rect x="${i * 190 + 70}" y="1060" width="30" height="8" rx="4" fill="#c8d0d8"/>`).join('');
  s += vialSyringe(210, 978, .82, 1) + tubesR(560, 978, .9);
  // the year 2020: a bar of 12 months filling, then the comparison with the old record
  let g = '';
  const pa = ease(ramp(t, WS(1, 1) - .3, WS(1, 1))) * (1 - cmp);
  if (pa > 0) { g += `<g opacity="${pa.toFixed(2)}">${panel(40, 1110, 640, 140)}`; const M = ['يناير', 'أبريل', 'يوليو', 'ديسمبر'];
    g += `<rect x="70" y="1150" width="580" height="22" rx="11" fill="#2a3040"/><rect x="${(650 - 580 * pg).toFixed(1)}" y="1150" width="${(580 * pg).toFixed(1)}" height="22" rx="11" fill="#f4c76b"/>`;
    M.forEach((m, i) => { const x = 640 - i * 190; g += lbl(x, 1214, m, 1, i === 3 ? '#f4c76b' : '#cfd8e8', 22); });
    g += lbl(360, 1240, '٢٠٢٠', 1, '#fff', 20) + `</g>`; }
  if (cmp > 0) { g += `<g opacity="${cmp.toFixed(2)}">${panel(40, 1100, 640, 160)}`;
    g += lbl(600, 1150, 'قبلَه', 1, '#cfd8e8', 24) + `<rect x="${(540 - 380 * b4).toFixed(1)}" y="1128" width="${(380 * b4).toFixed(1)}" height="30" rx="8" fill="#8a9098"/>` + lbl(60, 1152, '٤ سنوات', b4 > .9 ? 1 : 0, '#fff', 22, 'end');
    g += lbl(600, 1220, 'كورونا', 1, '#f4c76b', 24) + `<rect x="${(540 - 110 * ease(ramp(t, WS(1, 15) - .2, WS(1, 16)))).toFixed(1)}" y="1198" width="${(110 * ease(ramp(t, WS(1, 15) - .2, WS(1, 16)))).toFixed(1)}" height="30" rx="8" fill="#f4c76b"/>` + lbl(418, 1222, 'أقلُّ من سنة', 1, '#f4c76b', 22, 'start') + `</g>`; }
  noEarth(); F.ov = ''; return s + g;
}

// ---------- 2: the lockdown: 4 billion people asked to stay at home ----------
function winP(x, y, w, h, i, t, N, o = {}) {   // a lit apartment window with a person (or two) looking out, curtains, maybe a balcony
  const id = 'wp' + i; let s = `<rect x="${x - 8}" y="${y - 8}" width="${w + 16}" height="${h + 16}" fill="#ece2cc"/><rect x="${x - 8}" y="${y + h + 4}" width="${w + 16}" height="8" fill="#000" opacity=".2"/>`;
  s += `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.room || '#e8b86a'}"/>` +
    `<circle cx="${x + w * (o.lx ?? .7)}" cy="${y + h * .2}" r="${w * .9}" fill="url(#lampW)" opacity=".9"/><rect x="${x}" y="${y + h * .72}" width="${w}" height="${h * .28}" fill="#000" opacity=".18"/>` +
    (o.pic ? `<rect x="${x + w * .58}" y="${y + h * .18}" width="${w * .22}" height="${h * .2}" fill="#5a4030"/><rect x="${x + w * .6}" y="${y + h * .2}" width="${w * .18}" height="${h * .16}" fill="#8ab0c8"/>` : '');
  (o.ppl || []).forEach(([px, pi, f, sc, extra]) => { let p = man(x + px * w, y + 36 + 320 * sc, sc, f, pi, Object.assign({ noShadow: 1 }, extra || {})); if (o.mask) p = maskP(p); s += p; });
  s += `</g><rect x="${x}" y="${y}" width="${w * .16}" height="${h}" fill="${o.cur || '#a84a3a'}" opacity=".9"/><rect x="${x + w * .84}" y="${y}" width="${w * .16}" height="${h}" fill="${o.cur || '#a84a3a'}" opacity=".9"/>` +
    `<path d="M${x + w * .08},${y} v${h} M${x + w * .92},${y} v${h}" stroke="#000" stroke-width="3" opacity=".18"/><path d="M${x + w / 2},${y} V${y + h}" stroke="#ece2cc" stroke-width="5"/><path d="M${x + 6},${y + h * .7} L${x + w * .45},${y + 6}" stroke="#fff" stroke-width="10" opacity=".1"/>`;
  if (o.bal) s += `<rect x="${x - 22}" y="${y + h + 10}" width="${w + 44}" height="14" fill="#d8ccb4"/><rect x="${x - 22}" y="${y + h + 24}" width="${w + 44}" height="6" fill="#000" opacity=".3"/>` +
    `<path d="M${x - 20},${y + h - 40} H${x + w + 20}" stroke="#2a2a30" stroke-width="4"/>` + Array.from({ length: Math.floor((w + 40) / 13) + 1 }, (_, k) => `<path d="M${x - 20 + k * 13},${y + h - 40} V${y + h + 10}" stroke="#2a2a30" stroke-width="2.4"/>`).join('');
  return s;
}
function shutter(x, y, w, h) { let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8a929a"/>`; for (let i = 0; i < h / 9; i++) s += `<path d="M${x},${y + i * 9 + 4} H${x + w}" stroke="#5a626a" stroke-width="2"/><path d="M${x},${y + i * 9 + 6} H${x + w}" stroke="#c8ced4" stroke-width="1" opacity=".6"/>`; return s + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${x + w / 2 - 14}" y="${y + h - 14}" width="28" height="8" fill="#3a3e44"/>`; }
function sceneLock(t) {
  const t0 = S0(2) - .2, T = t - t0, N = .62, nk = ease(ramp(t, WS(2, 10) - .2, WS(2, 13) + .3)), pa = ease(ramp(t, WS(2, 10) - .4, WS(2, 10)));
  let s = `<defs>${CVD()}${mulF('lkN', N)}<linearGradient id="lkSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101a3a"/><stop offset=".6" stop-color="#3a3a6a"/><stop offset="1" stop-color="#c8785a"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="420" fill="url(#lkSky)"/>` + (() => { const r = RS(71); let st = ''; for (let i = 0; i < 40; i++) st += `<circle cx="${(r() * 740).toFixed(0)}" cy="${(r() * 280).toFixed(0)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(.3 + r() * .5).toFixed(2)}"/>`; return st; })();
  let g = '';
  // the facade: textured plaster, four floors of windows
  g += litRock('M-20,300 H740 V1010 H-20Z', 'lkF', '#e2cfae', '#b49a78', 13, { fx: .02, fy: .02, sc: 2.2, y: 290, h: 730 });
  g += `<rect x="-20" y="286" width="760" height="20" fill="#efe4cc"/><rect x="-20" y="306" width="760" height="6" fill="#000" opacity=".3"/>`;
  for (let f = 0; f < 4; f++) g += `<rect x="-20" y="${470 + f * 160}" width="760" height="8" fill="#d6c6a6"/><rect x="-20" y="${478 + f * 160}" width="760" height="3" fill="#000" opacity=".15"/>`;
  const W = [
    [60, 330, { ppl: [[.42, 3, 1, .52]], cur: '#7a3a4a' }], [295, 330, { ppl: [[.5, 6, -1, .5]], bal: 1, cur: '#3a5a7a' }], [530, 330, { ppl: [[.36, 9, 1, .5], [.66, 2, -1, .34]], cur: '#6a7a3a' }],
    [60, 490, { ppl: [[.5, 1, 1, .5, { hF: [125, 495], aB: [.1, .3] }]], bal: 1, cur: '#a84a3a' }], [295, 490, { ppl: [], pic: 1, cur: '#5a4a6a', room: '#d8a860' }], [530, 490, { ppl: [[.5, 5, -1, .5]], mask: 1, cur: '#3a6a6a' }],
    [60, 650, { ppl: [[.44, 7, 1, .52]], cur: '#4a5a8a' }], [295, 650, { ppl: [[.36, 4, 1, .5], [.62, 8, -1, .5]], bal: 1, cur: '#8a5a2a' }], [530, 650, { ppl: [[.55, 0, -1, .52]], cur: '#7a3a4a' }],
    [60, 810, { ppl: [[.5, 10, 1, .5]], cur: '#3a5a7a', room: '#e0aa60' }], [295, 810, { ppl: [], pic: 1, cur: '#6a7a3a' }], [530, 810, { ppl: [[.4, 11, 1, .36], [.62, 3, -1, .5]], bal: 1, cur: '#a84a3a' }]];
  W.forEach(([x, y, o], i) => g += winP(x, y, 130, 112, i, t, N, o));
  // the ground floor: shops with shutters down; an empty pavement and road
  g += `<rect x="-20" y="1000" width="760" height="110" fill="#c8b48e"/><rect x="-20" y="1000" width="760" height="110" fill="#000" filter="url(#grainR)" opacity=".2"/>` + [0, 240, 480, 720].map(x => `<rect x="${x - 20}" y="1000" width="20" height="104" fill="#000" opacity=".18"/>`).join('') + `<rect x="-20" y="1000" width="760" height="10" fill="#efe4cc"/>` + shutter(20, 1010, 200, 92) + shutter(260, 1010, 200, 92) + shutter(500, 1010, 200, 92);
  g += `<rect x="-20" y="1102" width="760" height="40" fill="#b8ae9c"/><rect x="-20" y="1102" width="760" height="40" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="1140" width="760" height="8" fill="#e2ddd0"/><rect x="-20" y="1148" width="760" height="160" fill="#45454c"/><rect x="-20" y="1148" width="760" height="160" fill="#000" filter="url(#grainR)" opacity=".4"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${i * 140 - 40},1226 h70" stroke="#d8d4c8" stroke-width="5" opacity=".6"/>`).join('');
  // one masked person walks home with a shopping bag
  const wx = 760 - T * 24; let p = maskP(man(wx, 1136, .5, -1, 6, { walk: T * 1.9, hB: [wx - 4, 1080] })); p += `<path d="M${wx - 8},1078 h16 l3,24 h-22Z" fill="#e8dcc0"/><path d="M${wx - 5},1078 q5,-8 10,0" stroke="#a89878" stroke-width="1.5" fill="none"/>`;
  g += p;
  s += `<g filter="url(#lkN)">${g}</g>`;
  // street lamp glow
  // the number
  if (pa > 0) { const v = 3.9 * nk; s += `<g opacity="${pa.toFixed(2)}">${panel(130, 1150, 460, 98)}${lbl(360, 1198, (nk < .999 ? AR4(v.toFixed(1)).replace('.', '٫') : '≈ ٤') + ' مليارات', 1, '#f4c76b', 40)}${lbl(360, 1232, 'إنسانٍ في البيوت', 1, '#fff', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: hospitals full again and again; oxygen runs out; patients in the corridors ----------
function bedP(x, y, s, o = {}) {   // a hospital bed (side view, head on the left) with a patient under a blanket and an oxygen mask; (x, y) = floor under the bed centre
  const sk = o.skin || '#b07a55', hr = o.hair || '#2a1d16', bl = o.blanket || '#7aa8c8';
  let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="190" ry="12" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-180,0 V-160 M180,0 V-110" stroke="url(#chromeV)" stroke-width="8"/><path d="M-180,-150 h20 M160,-104 h20" stroke="#8a929a" stroke-width="5"/><rect x="-176" y="-92" width="352" height="16" rx="3" fill="#9aa2aa"/>` +
    [-150, 150].map(wx => `<circle cx="${wx}" cy="-8" r="8" fill="#2a2e34"/><path d="M${wx},-16 V-76" stroke="#7a828a" stroke-width="5"/>`).join('') +
    `<rect x="-172" y="-116" width="344" height="28" rx="6" fill="#eef2f4"/><rect x="-162" y="-140" width="100" height="32" rx="14" fill="#fff"/>` +
    `<ellipse cx="-110" cy="-150" rx="24" ry="20" fill="${sk}"/><ellipse cx="-114" cy="-146" rx="18" ry="16" fill="#000" opacity=".1"/><path d="M-134,-156 q18,-24 46,-4 q-22,-8 -46,4Z" fill="${hr}"/>` +
    `<path d="M-96,-150 q4,3 8,0" stroke="#3a2418" stroke-width="2" fill="none"/>` +
    `<path d="M-98,-112 Q-20,-160 70,-138 Q150,-126 172,-110 L172,-88 L-98,-88Z" fill="${bl}"/><path d="M-90,-116 Q-10,-150 70,-132" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/><path d="M-30,-118 q30,8 50,30 M60,-130 q20,14 30,40" stroke="#000" stroke-width="3" fill="none" opacity=".12"/>`;
  if (o.o2 !== 0) g += `<path d="M-100,-158 q18,-4 22,10 q-2,14 -20,12 q-6,-12 -2,-22Z" fill="#c8f0dc" opacity=".7" stroke="#8ac8a8" stroke-width="1.5"/><path d="M-84,-142 C-60,-120 -150,-60 -200,-70" stroke="#c8e8dc" stroke-width="3" fill="none" opacity=".8"/>` +
    `<rect x="-236" y="-170" width="34" height="170" rx="14" fill="url(#o2G)"/><rect x="-232" y="-170" width="26" height="22" rx="8" fill="#f4f6f8"/><circle cx="-219" cy="-180" r="10" fill="#d8dce2" stroke="#6a727a" stroke-width="2"/><path d="M-219,-180 l${(Math.cos(o.g ?? -.6) * 7).toFixed(1)},${(Math.sin(o.g ?? -.6) * 7).toFixed(1)}" stroke="#c0392b" stroke-width="2"/>`;
  return g + `</g>`;
}
function gauge(x, y, R, v, a) {   // a round oxygen gauge; v 1 → 0
  if (a <= 0) return ''; const an = lerp(-200, 20, v) * Math.PI / 180;
  let s = `<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="${R + 14}" fill="#0a0e1c" opacity=".85"/><circle cx="${x}" cy="${y}" r="${R}" fill="#f4f6f8"/><circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="url(#chromeV)" stroke-width="8"/>`;
  for (let i = 0; i <= 10; i++) { const q = lerp(-200, 20, i / 10) * Math.PI / 180; s += `<path d="M${(x + Math.cos(q) * R * .78).toFixed(1)},${(y + Math.sin(q) * R * .78).toFixed(1)} L${(x + Math.cos(q) * R * .9).toFixed(1)},${(y + Math.sin(q) * R * .9).toFixed(1)}" stroke="${i < 2 ? '#c0392b' : '#3a3e48'}" stroke-width="${i % 5 ? 2 : 4}"/>`; }
  s += `<path d="M${x + Math.cos(-200 * Math.PI / 180) * R * .7},${y + Math.sin(-200 * Math.PI / 180) * R * .7} A${R * .7},${R * .7} 0 0 1 ${x + Math.cos(-178 * Math.PI / 180) * R * .7},${y + Math.sin(-178 * Math.PI / 180) * R * .7}" stroke="#c0392b" stroke-width="8" fill="none"/>`;
  s += `<path d="M${x},${y} L${(x + Math.cos(an) * R * .74).toFixed(1)},${(y + Math.sin(an) * R * .74).toFixed(1)}" stroke="#c0392b" stroke-width="5" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="9" fill="#2a2e34"/>` + `<text x="${x}" y="${y + R * .55}" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#2a3a4a">O2</text>`;
  return s + `</g>`;
}
function sceneHosp(t) {
  const t0 = S0(3) - .2, T = t - t0, more = ease(ramp(t, WS(3, 2), WS(3, 4) + .3)), ga = ease(ramp(t, WS(3, 6) - .3, WS(3, 6))), gv = 1 - ease(ramp(t, WS(3, 6), WS(3, 7) + .6)), cor = ease(ramp(t, WS(3, 8) - .2, WS(3, 9) + .3));
  let s = `<defs>${CVD()}<linearGradient id="hwW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d4e2dc"/><stop offset="1" stop-color="#aec4bc"/></linearGradient><linearGradient id="hfl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9aa8a4"/><stop offset="1" stop-color="#6a7a76"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#hwW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  // the ceiling with light panels, the wall with doors and a handrail
  s += `<rect x="-20" y="300" width="760" height="70" fill="#e8eeec"/><rect x="-20" y="370" width="760" height="8" fill="#000" opacity=".15"/>` + [60, 300, 540].map(x => `<rect x="${x}" y="318" width="140" height="26" rx="4" fill="#fffef4"/>` + scr(`<ellipse cx="${x + 70}" cy="360" rx="150" ry="90" fill="url(#tubeL)" opacity=".8"/>`)).join('');
  [[90, '#7a6a5a'], [470, '#7a6a5a']].forEach(([x, c]) => { s += `<rect x="${x - 8}" y="560" width="156" height="400" fill="#e8eeec"/><rect x="${x}" y="568" width="140" height="392" fill="${c}"/><rect x="${x}" y="568" width="140" height="392" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${x + 40}" y="610" width="60" height="80" fill="#cfe4ee"/><rect x="${x + 40}" y="610" width="60" height="80" fill="none" stroke="#5a4a3a" stroke-width="4"/><rect x="${x + 112}" y="760" width="18" height="6" rx="3" fill="#d8dce2"/>`; });
  s += `<rect x="-20" y="842" width="760" height="10" rx="4" fill="#c8d0cc"/><rect x="-20" y="852" width="760" height="4" fill="#000" opacity=".2"/><rect x="-20" y="900" width="760" height="60" fill="#8aa49a" opacity=".5"/>`;
  // the floor: glossy, with the light reflected
  s += `<rect x="-20" y="960" width="760" height="340" fill="url(#hfl)"/><rect x="-20" y="960" width="760" height="340" fill="#000" filter="url(#grainR)" opacity=".15"/><rect x="-20" y="956" width="760" height="8" fill="#5a6a66"/>` +
    [130, 370, 610].map(x => `<rect x="${x - 40}" y="970" width="80" height="320" fill="#fff" opacity=".07" filter="url(#blur5)"/>`).join('');
  // the beds along the wall, more and more of them, then in the corridor too
  const PB = [[150, 1010, .8, { skin: '#c08a66', blanket: '#7aa8c8' }], [420, 1010, .8, { skin: '#8d5a3b', blanket: '#8ab8a0', hair: '#d8d8d8' }], [690, 1010, .8, { skin: '#b07a55', blanket: '#9a9ac8' }]];
  s += `<rect x="262" y="420" width="196" height="54" rx="8" fill="#f4f8f6"/><rect x="262" y="420" width="196" height="54" rx="8" fill="none" stroke="#2a7a5a" stroke-width="3"/>` + lbl(360, 457, 'قسمُ الطوارئ', 1, '#1a5a3a', 26);
  PB.forEach(([x, y, sc, o], i) => { const a = i === 0 ? 1 : clamp(more * 2 - (i - 1) * .8); if (a > 0) s += `<g opacity="${a.toFixed(2)}">${bedP(x, y, sc, Object.assign({ g: lerp(-2.4, -.6, gv) }, o))}</g>`; });
  // a nurse in protective gear walks past
  const nx = 800 - T * 40; s += `<g opacity="${clamp((nx + 40) / 80).toFixed(2)}">` + maskP(man(nx, 1140, .86, -1, 4, { walk: T * 2.2, top: '#7ab6d8', pants: '#5a96bc', hair: '#e8eef2' })) + `</g>`;
  { const [ex, ey] = HP.eye; s += `<path d="M${ex - 18},${ey - 10} q14,-4 26,2 v12 q-14,4 -26,0Z" fill="#dff0ff" opacity=".35" stroke="#a8c8dc" stroke-width="1.2"/>`; }
  if (cor > 0) s += `<g opacity="${cor.toFixed(2)}">${bedP(400, 1250, 1.1, { skin: '#a46a46', blanket: '#c8a07a', hair: '#1b1410', g: -2.4 })}</g>`;
  s += gauge(150, 520, 80, gv, ga);
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: every new infection is a chance to mutate; Omicron: more than 30 changes in the spike ----------
function spikeT(x, y, s, n, t, a) {   // a spike protein (three twisted lobes on a stem), with n mutation spots glowing
  if (a <= 0) return ''; const C = [['#e05a3a', '#7a1a10'], ['#e8803a', '#8a3a10'], ['#c83a4a', '#6a1020']];
  let g = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) scale(${s})">`;
  g += `<path d="M-14,0 C-18,-60 -6,-120 -10,-170 M0,0 C4,-60 -4,-120 2,-172 M14,0 C18,-60 8,-120 12,-170" stroke="#8a2a1c" stroke-width="12" fill="none"/><path d="M0,0 C4,-60 -4,-120 2,-172" stroke="#c8503a" stroke-width="5" fill="none" opacity=".6"/>`;
  const LB = [[-1, 0], [1, 1], [0, 2]].map(([sd]) => { const ox = sd * 42; return `M${ox - 10},-160 C${ox - 70 * (sd || .6)},-200 ${ox - 60},-330 ${ox - 10},-370 C${ox + 40},-400 ${ox + 70},-330 ${ox + 50},-260 C${ox + 40},-210 ${ox + 30},-170 ${ox - 10},-160Z`; });
  [[-1, 0], [1, 1], [0, 2]].forEach(([sd, ci]) => { const c = C[ci], ox = sd * 42; g += `<path d="M${ox - 10},-160 C${ox - 70 * (sd || .6)},-200 ${ox - 60},-330 ${ox - 10},-370 C${ox + 40},-400 ${ox + 70},-330 ${ox + 50},-260 C${ox + 40},-210 ${ox + 30},-170 ${ox - 10},-160Z" fill="url(#sp${ci})"/>`; });
  g += `<defs>${C.map((c, i) => `<radialGradient id="sp${i}" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffb08a"/><stop offset=".45" stop-color="${c[0]}"/><stop offset="1" stop-color="${c[1]}"/></radialGradient>`).join('')}</defs>`;
  g += `<g opacity=".4">${litRock(LB.join(' '), 'spT', '#ffd0b8', '#6a1a10', 23, { fx: .05, fy: .05, sc: 3, x: -120, y: -420, w: 240, h: 270 })}</g>`;
  const r = RS(77); for (let i = 0; i < n; i++) { const u = r(), v = r(), px = (u - .5) * 130 * (1 - Math.abs(v - .45) * .8), py = -175 - v * 220, p = .7 + .3 * Math.sin(t * 5 + i);
    g += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="11" fill="#fff6a0" opacity="${(.35 * p).toFixed(2)}" filter="url(#blur2)"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="5" fill="#fffbe0"/>`; }
  return g + `</g>`;
}
function sceneMut(t) {
  const t0 = S0(4) - .2, T = t - t0, sp = ease(ramp(t, WS(4, 1), WS(4, 6) + .2)), om = ease(ramp(t, WS(4, 7) - .2, WS(4, 9))), sk = ease(ramp(t, WS(4, 14) - .4, WS(4, 15))), nm = Math.floor(clamp(ramp(t, WS(4, 11), WS(4, 14))) * 32.99);
  let s = `<defs>${CVD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#micBg)"/>` + bokehF(t, 16, 5);
  // the copies fly out from the first virus, each one a little different
  const V = [[-150, -210, '#e0442c'], [160, -230, '#e8803a'], [190, 40, '#c83a4a'], [-200, 60, '#d8602c'], [-40, 250, '#e8603a'], [170, 250, '#b8304a']], cx = 360, cy = 760;
  let ov = '';
  V.forEach(([dx, dy], i) => { const k = ease(clamp(sp * 1.6 - i * .12)), last = i === 2, ax = cx + dx * k, ay = cy + dy * k, z = last ? om : 0;
    const x = lerp(ax, 360, z), y = lerp(ay, 780, z), R = lerp(lerp(150, 62, k), 150, z), a = (k > .02 ? 1 : 0) * (last ? 1 - sk : 1 - om * .85);
    s += covV(x, y, R, t, { id: 'm' + i, a, ph: i * 1.3, simple: R < 90 ? 1 : 0, seed: i }); });
  s += covV(cx, cy, 150, t, { id: 'm0c', a: 1 - om, simple: sp > .3 ? 1 : 0 });
  // the names of three variants
  const la = ease(ramp(t, WS(4, 5), WS(4, 6))) * (1 - om);
  if (la > 0) [['ألفا', 0], ['دلتا', 1], ['أوميكرون', 2]].forEach(([n, i]) => { const [dx, dy] = V[i]; s += lbl(cx + dx, cy + dy + 102, n, la, i === 2 ? '#f4c76b' : '#fff', 28); });
  if (om > .5) s += lbl(360, 1010, 'أوميكرون', ease(ramp(t, WS(4, 8), WS(4, 9))) * (1 - sk), '#f4c76b', 34);
  // the spike protein, with the mutations lighting up
  s += spikeT(360, 1180, 1.45, nm, t, sk);
  if (sk > 0) s += lbl(360, 1235, 'بروتينُ الشوكة', sk, '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
