// sd_a.js: #60 "what if Saddam Hussein had not fallen in 2003?": defs, scenes 0-4 (globe hook, Firdos Square statue, Baghdad street, the displaced, Mosul)
const SDDEF = `<linearGradient id="duskB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3a6a"/><stop offset=".4" stop-color="#8a6a8a"/><stop offset=".72" stop-color="#e8946a"/><stop offset="1" stop-color="#ffc888"/></linearGradient>` +
  `<linearGradient id="mornB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ec8"/><stop offset=".6" stop-color="#b8d0e4"/><stop offset="1" stop-color="#f2e4c8"/></linearGradient>` +
  `<linearGradient id="dustB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a7aa0"/><stop offset=".5" stop-color="#d8a880"/><stop offset="1" stop-color="#f4cc98"/></linearGradient>` +
  `<linearGradient id="bronzeV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1e1812"/><stop offset=".35" stop-color="#5a4a36"/><stop offset=".55" stop-color="#8a7254"/><stop offset="1" stop-color="#16120e"/></linearGradient>` +
  `<linearGradient id="stoneV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a7a64"/><stop offset=".3" stop-color="#e0d0b4"/><stop offset=".6" stop-color="#cfbc9c"/><stop offset="1" stop-color="#6a5c4a"/></linearGradient>` +
  `<linearGradient id="tileB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#16466a"/><stop offset=".4" stop-color="#3a8ab8"/><stop offset=".6" stop-color="#5aa8d0"/><stop offset="1" stop-color="#123a5a"/></linearGradient>` +
  `<linearGradient id="brickV" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a3a"/><stop offset=".35" stop-color="#d49a6a"/><stop offset=".6" stop-color="#c88a5a"/><stop offset="1" stop-color="#6a422a"/></linearGradient>` +
  `<linearGradient id="riverT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab4b8"/><stop offset=".5" stop-color="#5a8088"/><stop offset="1" stop-color="#3a5a62"/></linearGradient>` +
  `<radialGradient id="smokeG"><stop offset="0" stop-color="#2a2624" stop-opacity=".9"/><stop offset=".6" stop-color="#3a3430" stop-opacity=".5"/><stop offset="1" stop-color="#4a4440" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="goldF"><stop offset="0" stop-color="#fff6d0" stop-opacity="1"/><stop offset=".3" stop-color="#ffd27a" stop-opacity=".7"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="lampY"><stop offset="0" stop-color="#fff0c0" stop-opacity=".9"/><stop offset=".4" stop-color="#ffc870" stop-opacity=".35"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="hazeY"><stop offset="0" stop-color="#e8e4b0" stop-opacity=".85"/><stop offset=".6" stop-color="#d8d4a0" stop-opacity=".45"/><stop offset="1" stop-color="#c8c490" stop-opacity="0"/></radialGradient>` +
  `<pattern id="brickP" width="28" height="14" patternUnits="userSpaceOnUse"><rect width="28" height="14" fill="none"/><path d="M0,13.5 H28 M14,0 V7 M0,7 H28 M0,7 V14" stroke="#5a3a22" stroke-width="1.2" opacity=".35"/></pattern>` +
  `<pattern id="latP" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0,0 L12,12 M12,0 L0,12" stroke="#3a2212" stroke-width="2.2"/></pattern>` +
  `<filter id="smokeF" x="-50%" y="-50%" width="200%" height="200%"><feTurbulence type="fractalNoise" baseFrequency=".012" numOctaves="3" seed="7"/><feDisplacementMap in="SourceGraphic" scale="60"/><feGaussianBlur stdDeviation="6"/></filter>`;
const SDD = () => W2D() + SDDEF;

// a soft smoke column (drawn): blobs that rise, spread and drift
function smokeS(x, y, h, t, a, seed = 3, w = 1) { if (a <= 0) return ''; let s = ''; const r = RS(seed);
  for (let i = 0; i < 14; i++) { const ph = pmod(t * .08 + i / 14 + r() * .05, 1), rr = (26 + ph * 120) * w; s += `<circle cx="${(x + ph * 160 * w + Math.sin(i * 1.7 + t * .3) * 14).toFixed(1)}" cy="${(y - ph * h).toFixed(1)}" r="${rr.toFixed(1)}" fill="url(#smokeG)" opacity="${(a * .55 * Math.sin(Math.min(1, ph * 1.4) * Math.PI * .5 + .3) * (1 - ph * .6)).toFixed(2)}"/>`; }
  return `<g filter="url(#smokeF)">${s}</g>`; }

// ---------- 0: the hook: the globe turns to Iraq, Baghdad lights up, 2003 ----------
function sceneHook(t) {
  const k = ease(clamp(t / 3.2));
  const G = gAt(t, 360, 760, { d: lerp(4.4, 2.75, k), el: .56, lon: lerp(30, 43.6, k), clouds: .25, lights: .4, off: -.75, up: .6 });
  const a = ease(ramp(t, .3, 1.2)), p = .8 + .2 * Math.sin(t * 4);
  let o = `<defs>${SDD()}</defs><path d="${areaD(G, MAND.iq)}" fill="#f4c76b" opacity="${(.22 * a).toFixed(2)}"/><path d="${areaD(G, MAND.iq)}" fill="none" stroke="#2a1a04" stroke-width="7" opacity="${(.5 * a).toFixed(2)}"/><path d="${areaD(G, MAND.iq)}" fill="none" stroke="#f4c76b" stroke-width="3.4" opacity="${a.toFixed(2)}"/>`;
  const [bx, by] = G.P(33.31, 44.37, 1.006), b = ease(ramp(t, 1.0, 1.8));
  if (b > 0) o += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(34 * p).toFixed(1)}" fill="url(#goldF)" opacity="${(.8 * b).toFixed(2)}"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="6" fill="#fff8e0" opacity="${b.toFixed(2)}"/>` + lbl(bx.toFixed(1), (by - 34).toFixed(1), 'بغداد', b.toFixed(2), '#fff', 34);
  F.ov = o; return space(t);
}

// ---------- 1: Firdos Square, 9 April 2003: the statue falls... then rewinds and stays standing ----------
function statue(x, y, s, t) {   // a bronze statue on a cylinder: a figure in a long coat, the right arm raised; no face detail
  let g = hero(x, y, { s, face: -1, shade: 1, top: '#4a3c2c', pants: '#3a2e22', skin: '#4a3c2c', hair: '#2a2018', aF: [-2.55, -2.75], aB: [-.08, .12], noShadow: 1 });
  const H = HP.head, hip = HP.hip; g += `<path d="M${(hip[0] - 26 * s).toFixed(1)},${(hip[1] - 70 * s).toFixed(1)} L${(hip[0] + 28 * s).toFixed(1)},${(hip[1] - 70 * s).toFixed(1)} L${(hip[0] + 38 * s).toFixed(1)},${(hip[1] + 110 * s).toFixed(1)} L${(hip[0] - 36 * s).toFixed(1)},${(hip[1] + 110 * s).toFixed(1)}Z" fill="#3e3226"/><path d="M${(hip[0] + 6 * s).toFixed(1)},${(hip[1] - 70 * s).toFixed(1)} L${(hip[0] + 38 * s).toFixed(1)},${(hip[1] + 110 * s).toFixed(1)} L${(hip[0] + 14 * s).toFixed(1)},${(hip[1] + 110 * s).toFixed(1)}Z" fill="#000" opacity=".3"/>`;
  g += `<ellipse cx="${H[0].toFixed(1)}" cy="${H[1].toFixed(1)}" rx="${(21 * s).toFixed(1)}" ry="${(25 * s).toFixed(1)}" fill="#3a2e22"/><path d="M${(H[0] - 20 * s).toFixed(1)},${(H[1] - 6 * s).toFixed(1)} Q${H[0].toFixed(1)},${(H[1] - 34 * s).toFixed(1)} ${(H[0] + 20 * s).toFixed(1)},${(H[1] - 8 * s).toFixed(1)}" stroke="#a88a60" stroke-width="${(3 * s).toFixed(1)}" fill="none" opacity=".5"/>`;
  return `<g>${g}</g>`;
}
function hotelT(x, base, w, h, col, seed) { const r = RS(seed); let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".16"/><rect x="${x + w * .7}" y="${base - h}" width="${w * .3}" height="${h}" fill="#000" opacity=".16"/>`;
  for (let y = base - h + 18; y < base - 30; y += 22) for (let xx = x + 8; xx < x + w - 10; xx += 18) { const lit = r() < .3; s += `<rect x="${xx}" y="${y}" width="11" height="13" fill="${lit ? '#ffd890' : '#3a3440'}" opacity="${lit ? .9 : .7}"/>`; }
  for (let y = base - h + 34; y < base - 30; y += 22) s += `<rect x="${x + 4}" y="${y}" width="${w - 8}" height="3" fill="#fff" opacity=".12"/>`;
  return s; }
function domeM(cx, base, R, t) {   // a blue-tiled dome on a drum, gold finial, with a slim minaret
  let s = `<rect x="${cx - R * 1.05}" y="${base - R * .9}" width="${R * 2.1}" height="${R * .9}" fill="#d8c8a8"/><rect x="${cx - R * 1.05}" y="${base - R * .9}" width="${R * 2.1}" height="${R * .9}" fill="#000" filter="url(#grainR)" opacity=".15"/>` +
    Array.from({ length: 7 }, (_, i) => `<path d="M${cx - R * .9 + i * R * .3},${base - 8} V${base - R * .55} a${R * .1},${R * .1} 0 0 1 ${R * .2},0 V${base - 8}Z" fill="#2a3a4a" opacity=".7"/>`).join('');
  s += `<path d="M${cx - R},${base - R * .9} C${cx - R},${base - R * 2.3} ${cx + R},${base - R * 2.3} ${cx + R},${base - R * .9}Z" fill="url(#tileB)"/>` + Array.from({ length: 9 }, (_, i) => { const q = -1 + i / 4; return `<path d="M${(cx + q * R).toFixed(1)},${base - R * .9} Q${(cx + q * R * .6).toFixed(1)},${base - R * 1.9} ${cx},${(base - R * 1.95).toFixed(1)}" stroke="#a8d8f0" stroke-width="1.4" fill="none" opacity=".35"/>`; }).join('') +
    `<path d="M${cx - R},${base - R * .9} C${cx - R},${base - R * 1.6} ${cx - R * .3},${base - R * 2} ${cx},${base - R * 1.95}" stroke="#fff" stroke-width="4" fill="none" opacity=".25"/><path d="M${cx},${base - R * 1.95} v${-R * .4}" stroke="#d8b050" stroke-width="5"/><circle cx="${cx}" cy="${base - R * 2.2}" r="6" fill="#e8c060"/>`;
  return s; }
function minaret(x, base, h, w = 22) { return `<rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="url(#stoneV)"/><rect x="${x - w * .9}" y="${base - h * .72}" width="${w * 1.8}" height="12" fill="#c8b898"/><rect x="${x - w * .9}" y="${base - h * .72 + 12}" width="${w * 1.8}" height="6" fill="#000" opacity=".2"/><path d="M${x - w / 2},${base - h} L${x},${base - h - 40} L${x + w / 2},${base - h}Z" fill="url(#tileB)"/><rect x="${x - w / 2}" y="${base - h * .5}" width="${w}" height="${h * .08}" fill="url(#tileB)" opacity=".8"/>`; }
function sceneSquare(t) {
  const t0 = S0(1) - .2, T = t - t0, fall = ease(ramp(t, WS(1, 4) - .1, WS(1, 9) + .2)), back = ease(ramp(t, WS(1, 10), WS(1, 14) + .2)), ang = -32 * fall * (1 - back);
  const rew = ramp(t, WS(1, 10) - .05, WS(1, 14) + .3), rw = rew > 0 && rew < 1 ? 1 : 0;
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#duskB)"/>` + sun3(150, 820, .8, '#ffe0b0') + cumulus(470 + T * 3, 520, 240, 91, { a: .45 }) + cumulus(140 + T * 2, 620, 200, 93, { a: .35 });
  // far skyline: hotel towers and the mosque behind the square
  s += `<rect x="-20" y="860" width="760" height="80" fill="#9a8478" opacity=".6"/>` + hotelT(10, 930, 170, 360, '#b8a088', 3) + hotelT(520, 930, 190, 420, '#c8b49a', 5) + `<g opacity=".95">${domeM(355, 930, 92, t)}</g>` + minaret(250, 930, 300) + minaret(460, 930, 300);
  s += `<rect x="-20" y="560" width="760" height="380" fill="#f0b088" opacity=".16"/>`;
  // the square: paving, a low round planter around the pedestal
  s += `<rect x="-20" y="930" width="760" height="370" fill="#a8968a"/><rect x="-20" y="930" width="760" height="370" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M-20,${940 + i * i * 6 + i * 10} H740" stroke="#000" stroke-width="1.4" opacity=".1"/>`).join('') + Array.from({ length: 13 }, (_, i) => `<path d="M${360 + (i - 6) * 30},930 L${360 + (i - 6) * 150},1300" stroke="#000" stroke-width="1.4" opacity=".08"/>`).join('');
  s += `<ellipse cx="360" cy="1020" rx="230" ry="46" fill="#5a6a3a"/><ellipse cx="360" cy="1012" rx="230" ry="40" fill="#6a7a44"/><ellipse cx="360" cy="1012" rx="230" ry="40" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M130,1014 Q360,1070 590,1014 V1032 Q360,1088 130,1032Z" fill="#c8b8a0"/>`;
  // the pedestal: a tall column of stone with rings
  s += `<rect x="318" y="660" width="84" height="350" fill="url(#stoneV)"/><rect x="300" y="980" width="120" height="30" fill="url(#stoneV)"/><rect x="306" y="648" width="108" height="20" fill="url(#stoneV)"/>` + [740, 820, 900].map(y => `<rect x="314" y="${y}" width="92" height="8" fill="#000" opacity=".14"/>`).join('') + `<rect x="318" y="660" width="84" height="350" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  // the statue: tips over (as it did), then rewinds and stands again
  s += `<g transform="rotate(${ang.toFixed(2)},360,650)">${statue(360, 650, .78, t)}</g>`;
  if (fall > 0 && back < 1) { const a = fall * (1 - back); s += `<path d="M360,560 Q${(360 - 160 * a).toFixed(1)},${(760 + 60 * a).toFixed(1)} ${(250 - 120 * a).toFixed(1)},1110" stroke="#2a2420" stroke-width="3" fill="none" opacity="${(.7 * a).toFixed(2)}"/>`; }
  // people on the square, small, watching
  const P = [[90, 1180, .5, 1, 1], [170, 1210, .54, 1, 3], [560, 1190, .52, -1, 5], [640, 1230, .58, -1, 7], [470, 1250, .6, -1, 2], [250, 1250, .6, 1, 8], [30, 1240, .58, 1, 4]];
  P.forEach(([x, y, sc, f, pi]) => s += hero(x, y, Object.assign({ s: sc, face: f, shade: 1, lookUp: .35 }, palS(pi))));
  s += treeR(-30, 1010, 330, 41, t) + treeR(700, 1020, 300, 43, t);
  // the rewind: scan lines, a soft magenta shift and the ⏪ sign
  if (rw) { let ln = ''; const r = RS(Math.floor(t * 24)); for (let i = 0; i < 9; i++) { const y = r() * 1280; ln += `<rect x="-20" y="${y.toFixed(0)}" width="760" height="${(3 + r() * 10).toFixed(0)}" fill="#fff" opacity="${(.08 + r() * .12).toFixed(2)}"/>`; }
    s += ln + `<rect x="-20" y="-20" width="760" height="1320" fill="#6a3a8a" opacity=".08"/><g transform="translate(560,470)" opacity=".85"><path d="M-70,0 L-36,-24 V24Z M-34,0 L0,-24 V24Z" fill="#fff"/></g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 2: no war that year, no tanks in Baghdad's streets: an old street with shanasheel balconies, a ghost tank that dissolves ----------
function shanB(x, base, w, h, seed, o = {}) {   // a brick house with a projecting wooden bay window (shanasheel) and a shop below
  const r = RS(seed), top = base - h, gf = h * .42, wood = o.wood || ['#6a3e22', '#7a4a2a', '#5a3420'][seed % 3];
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#brickV)"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="url(#brickP)"/><rect x="${x}" y="${top}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".16"/>`;
  s += `<rect x="${x - 4}" y="${top - 12}" width="${w + 8}" height="14" fill="#b88a5a"/><rect x="${x - 4}" y="${top}" width="${w + 8}" height="4" fill="#000" opacity=".2"/>` + Array.from({ length: Math.floor(w / 22) }, (_, i) => `<rect x="${x + 6 + i * 22}" y="${top - 26}" width="12" height="14" fill="#c8945e"/>`).join('');
  // the shanasheel: a wooden bay with lattice panels and small windows, on corbels
  const bx = x + w * .1, bw = w * .8, by = top + h * .1, bh = h - gf - h * .14;
  s += `<rect x="${bx + 6}" y="${by + bh}" width="${bw}" height="14" fill="#000" opacity=".25" filter="url(#blur2)"/><rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="${wood}"/>`;
  const n = Math.max(2, Math.round(bw / 46)), pw = bw / n;
  for (let i = 0; i < n; i++) { const px = bx + i * pw; s += `<rect x="${px + 5}" y="${by + 8}" width="${pw - 10}" height="${bh * .55}" fill="#2a2018"/><rect x="${px + 5}" y="${by + 8}" width="${pw - 10}" height="${bh * .55}" fill="url(#latP)" opacity=".9"/>` +
    `<rect x="${px + 5}" y="${by + bh * .62}" width="${pw - 10}" height="${bh * .3}" fill="${mix(wood, '#ffffff', .12)}"/><path d="M${px + 5},${by + bh * .62} l${pw - 10},${bh * .3} M${px + pw - 5},${by + bh * .62} l${-(pw - 10)},${bh * .3}" stroke="${mix(wood, '#000000', .3)}" stroke-width="2"/>` +
    `<rect x="${px + 8}" y="${by + 12}" width="${pw - 16}" height="${bh * .2}" fill="#9ac0d0" opacity="${RS(seed + i)() < .4 ? .55 : .2}"/>`; }
  s += `<rect x="${bx - 6}" y="${by - 8}" width="${bw + 12}" height="10" fill="${mix(wood, '#000000', .25)}"/><rect x="${bx - 6}" y="${by + bh}" width="${bw + 12}" height="10" fill="${mix(wood, '#000000', .25)}"/>` + Array.from({ length: n + 1 }, (_, i) => `<path d="M${bx + i * pw},${by + bh + 10} l-6,22 h12Z" fill="${mix(wood, '#000000', .3)}"/>`).join('') + `<rect x="${bx}" y="${by}" width="7" height="${bh}" fill="#fff" opacity=".14"/><rect x="${bx + bw - 7}" y="${by}" width="7" height="${bh}" fill="#000" opacity=".2"/>`;
  // the ground floor: arched door and a shop with a striped awning
  const dy = base - gf; s += `<rect x="${x}" y="${dy}" width="${w}" height="6" fill="#000" opacity=".18"/>`;
  s += `<path d="M${x + w * .12},${base} V${dy + gf * .42} A${w * .12},${w * .12} 0 0 1 ${x + w * .36},${dy + gf * .42} V${base}Z" fill="${mix(wood, '#000000', .2)}"/><path d="M${x + w * .24},${dy + gf * .3} V${base}" stroke="#000" stroke-width="2" opacity=".3"/><circle cx="${x + w * .31}" cy="${dy + gf * .68}" r="3" fill="#d8b060"/>`;
  if (o.shop) { const sx = x + w * .46, sw = w * .48; s += `<rect x="${sx}" y="${dy + gf * .3}" width="${sw}" height="${gf * .7}" fill="#2a2420"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${sx + 8 + i * (sw - 16) / 4}" y="${dy + gf * .45}" width="${(sw - 16) / 4 - 6}" height="${gf * .34}" fill="${['#c8402a', '#e8c040', '#4a8a3a', '#3a6aaa'][(i + seed) % 4]}" opacity=".85"/>`).join('') +
    `<path d="M${sx - 8},${dy + gf * .3} h${sw + 16} l-14,${gf * .16} h${-sw + 12}Z" fill="${o.shop}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${sx - 2 + i * (sw + 4) / 6},${dy + gf * .3} l-3,${gf * .16}" stroke="#fff" stroke-width="7" opacity=".3"/>`).join(''); }
  return s; }
function tankM(x, y, s, a = 1) {   // a generic modern battle tank, side view, facing left
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><path d="M-180,-34 L-150,-74 L170,-74 L196,-40 L180,-6 L-160,-6Z" fill="#7a7458"/><path d="M-170,-40 H190" stroke="#000" stroke-width="3" opacity=".3"/>` +
    `<path d="M-160,-6 Q-196,-6 -196,-30 Q-196,-50 -170,-50 L180,-50 Q204,-50 204,-28 Q204,-6 180,-6Z" fill="#2a2a24"/>` + Array.from({ length: 7 }, (_, i) => `<circle cx="${-150 + i * 50}" cy="-26" r="19" fill="#4a4a40"/><circle cx="${-150 + i * 50}" cy="-26" r="7" fill="#2a2a24"/>`).join('') +
    `<path d="M-90,-74 L-60,-118 L110,-118 L130,-74Z" fill="#8a8466"/><path d="M-60,-118 L110,-118" stroke="#fff" stroke-width="2" opacity=".25"/><rect x="-330" y="-104" width="270" height="12" rx="4" fill="#6a6450"/><rect x="40" y="-136" width="40" height="18" fill="#6a6450"/></g>`; }
function sceneStreet(t) {
  const t0 = S0(2) - .2, T = t - t0, gh = ease(ramp(t, WS(2, 6) - .4, WS(2, 6) + .2)) * (1 - ease(ramp(t, WS(2, 8), WS(2, 9) + .5)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mornB)"/>` + sun3(600, 560, .85, '#fff0c8') + cumulus(220 + T * 4, 480, 230, 101, { a: .65 });
  s += `<g opacity=".5">${domeM(560, 820, 70, t)}</g>` + `<rect x="-20" y="700" width="760" height="160" fill="#e8dcc8" opacity=".35"/>`;
  s += shanB(-40, 1000, 260, 400, 1, { shop: '#2a6a4a' }) + shanB(220, 990, 230, 360, 2, { shop: '#a8402a' }) + shanB(450, 1000, 290, 420, 3, { shop: '#3a5a8a' });
  s += treeR(205, 1010, 300, 107, t);
  // the pavement and the street
  s += `<rect x="-20" y="1000" width="760" height="56" fill="#b8aa96"/><rect x="-20" y="1000" width="760" height="56" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="1052" width="760" height="10" fill="#8a7e70"/><rect x="-20" y="1062" width="760" height="240" fill="#4a4a4e"/><rect x="-20" y="1062" width="760" height="240" fill="#000" filter="url(#grainR)" opacity=".22"/>` +
    Array.from({ length: 6 }, (_, i) => `<rect x="${(i * 150 - pmod(T * 30, 150) - 20).toFixed(1)}" y="1176" width="70" height="7" fill="#e8e0c8" opacity=".7"/>`).join('');
  // daily life: a car passes, people on the pavement
  s += car(pmod(T * 120, 1100) - 200, 1250, .62, '#d8d4c8', 1);
  s += hero(80 + T * 10, 1046, Object.assign({ s: .5, face: 1, shade: 1, walk: T * 3 }, palS(2))) + hero(640 - T * 12, 1048, Object.assign({ s: .52, face: -1, shade: 1, walk: T * 3 + 1 }, palS(5))) + kid(420 - T * 6, 1046, .34, -1, 4, { walk: T * 3.4 }, '#3a6aaa');
  // the tank that never came: a pale ghost, then it dissolves
  if (gh > 0) { const dis = ramp(t, WS(2, 8), WS(2, 9) + .5); s += `<g opacity="${(.55 * gh).toFixed(2)}" style="mix-blend-mode:luminosity">${tankM(470 - T * 10, 1210, .62)}</g>`;
    if (dis > 0) { const r = RS(9); let d = ''; for (let i = 0; i < 40; i++) { const x = 300 + r() * 320 - T * 10, y = 1110 + r() * 100; d += `<circle cx="${(x + dis * 60 * (r() - .3)).toFixed(1)}" cy="${(y - dis * 140 * r()).toFixed(1)}" r="${(2 + r() * 4).toFixed(1)}" fill="#e8e4d8" opacity="${(.6 * (1 - dis)).toFixed(2)}"/>`; } s += d; } }
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: the war and what followed: about 200,000 civilians killed, more than 4 million displaced ----------
function sceneRoad(t) {
  const t0 = S0(3) - .2, T = t - t0, c1 = ease(ramp(t, WS(3, 5) - .1, WS(3, 8))), c2 = ease(ramp(t, WS(3, 9) - .1, WS(3, 14)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dustB)"/>` + sun3(560, 820, .75, '#ffe0b0') + cumulus(250 + T * 2, 560, 260, 111, { a: .35 });
  s += `<g opacity=".7">${mountainsR(880, 60, 113, { rock: '#a8908a' })}</g><rect x="-20" y="860" width="760" height="440" fill="#c8a47a"/><rect x="-20" y="860" width="760" height="440" fill="#000" filter="url(#grainR)" opacity=".16"/><rect x="-20" y="850" width="760" height="40" fill="#f4d0a0" opacity=".4" filter="url(#blur5)"/>`;
  // the road towards the horizon
  s += `<path d="M330,880 L390,880 L640,1300 L80,1300Z" fill="#5a524c"/><path d="M330,880 L390,880 L640,1300 L80,1300Z" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 8 }, (_, i) => { const f = pmod(i / 8 + T * .05, 1), y0 = 880 + f * f * 420, y1 = 880 + Math.pow(Math.min(1, f + .04), 2) * 420; return `<path d="M360,${y0.toFixed(1)} L360,${y1.toFixed(1)}" stroke="#e8dcc0" stroke-width="${(1 + f * 6).toFixed(1)}" opacity=".7"/>`; }).join('');
  // a loaded car and families walking with bags, away from the camera's side
  s += `<g transform="translate(470,1010) scale(.42)">${car(0, 0, 1, '#e8e2d2', -1)}<rect x="-80" y="-136" width="150" height="40" rx="6" fill="#6a4a3a"/><rect x="-60" y="-160" width="90" height="26" rx="5" fill="#3a5a7a"/><path d="M-90,-100 H80" stroke="#2a2a2a" stroke-width="4"/></g>`;
  const W = [[150, 1080, .5, 0], [215, 1092, .48, 3], [100, 1150, .58, 6], [520, 1150, .6, 1], [590, 1190, .64, 8], [250, 1230, .68, 4]];
  W.forEach(([x, y, sc, pi], i) => s += traveller(x - T * 6 * (i % 2 ? -1 : 1) * 0, y, sc, pi, t + i * .3, 0, 1));
  s += kid(300, 1240, .42, 1, 3, { walk: T * 3.2 }, '#8a3a3a') + kid(650, 1210, .4, 1, 5, { walk: T * 3.2 + 1 }, '#3a6a4a');
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ffb070" opacity=".06"/>`;
  // the two numbers
  if (c1 > 0) s += `<g opacity="${c1.toFixed(2)}">${panel(40, 380, 300, 150)}${lbl(190, 462, '≈ ' + AR(fmtN(Math.round(200000 * ease(ramp(t, WS(3, 5), WS(3, 8)))))), 1, '#ff8a7a', 50)}${lbl(190, 506, 'مدنيّ قُتِل', 1, '#fff', 26)}</g>`;
  if (c2 > 0) s += `<g opacity="${c2.toFixed(2)}">${panel(380, 380, 300, 150)}${lbl(530, 462, '+' + AR(Math.max(1, Math.round(4 * ease(ramp(t, WS(3, 9), WS(3, 14)))))) + ' ملايين', 1, '#f4c76b', 46)}${lbl(530, 506, 'نزحوا من بيوتهم', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: maybe no ISIS chaos, and Mosul's leaning al-Hadba minaret would still stand ----------
function hadba(x, base, h, t) {   // the leaning brick minaret: a plinth, a banded cylindrical shaft with brick patterns, a small dome; it leans to the east
  const lean = 5.5, w = 54; let g = `<rect x="${x - 50}" y="${base - h * .14}" width="100" height="${h * .14}" fill="url(#brickV)"/><rect x="${x - 50}" y="${base - h * .14}" width="100" height="${h * .14}" fill="url(#brickP)"/>`;
  g += `<g transform="rotate(${lean},${x},${base - h * .14})"><rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h * .86}" fill="url(#brickV)"/>`;
  for (let i = 0; i < 7; i++) { const y = base - h * .2 - i * h * .1; g += `<rect x="${x - w / 2}" y="${(y - h * .05).toFixed(1)}" width="${w}" height="${(h * .05).toFixed(1)}" fill="url(#latP)" opacity=".55"/><rect x="${x - w / 2}" y="${y.toFixed(1)}" width="${w}" height="4" fill="#5a3a22" opacity=".45"/>`; }
  g += `<rect x="${x - w / 2 - 8}" y="${base - h + 26}" width="${w + 16}" height="14" fill="#b07a4a"/><rect x="${x - w / 2 + 4}" y="${base - h - 30}" width="${w - 8}" height="30" fill="url(#brickV)"/><path d="M${x - w / 2 + 4},${base - h - 30} Q${x},${base - h - 74} ${x + w / 2 - 4},${base - h - 30}Z" fill="#d8c8a8"/><path d="M${x},${base - h - 60} v-16" stroke="#8a7a5a" stroke-width="3"/>`;
  g += `<rect x="${x + w * .2}" y="${base - h}" width="${w * .3}" height="${h * .86}" fill="#000" opacity=".18"/><rect x="${x - w / 2}" y="${base - h}" width="6" height="${h * .86}" fill="#fff" opacity=".14"/></g>`;
  return g; }
function stoneHouse(x, base, w, h, seed) { const r = RS(seed), col = ['#c8c0b0', '#b8b0a2', '#d4ccbc'][seed % 3]; let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${x + w * .75}" y="${base - h}" width="${w * .25}" height="${h}" fill="#000" opacity=".14"/><rect x="${x - 3}" y="${base - h - 8}" width="${w + 6}" height="10" fill="${mix(col, '#ffffff', .25)}"/>`;
  const n = Math.max(1, Math.floor(w / 40)); for (let i = 0; i < n; i++) { const cx = x + (i + .5) * w / n; s += `<path d="M${cx - 9},${base - h * .3} V${base - h * .55} a9,9 0 0 1 18,0 V${base - h * .3}Z" fill="#3a3a3c"/>`; if (r() < .5) s += `<path d="M${cx - 9},${base} V${base - h * .2} a9,9 0 0 1 18,0 V${base}Z" fill="#4a3a2a"/>`; }
  return s; }
function sceneMosul(t) {
  const t0 = S0(4) - .2, T = t - t0, sm = ease(ramp(t, WS(4, 3) - .3, WS(4, 4) + .3)) * (1 - ease(ramp(t, WS(4, 8), WS(4, 11)))), cl = ease(ramp(t, WS(4, 8), WS(4, 12)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mornB)"/><rect x="-20" y="-20" width="760" height="1320" fill="#5a5048" opacity="${(.4 * sm).toFixed(2)}"/>` + sun3(560, 520, .8 + .1 * cl, '#fff0c8') + cumulus(170 + T * 3, 460, 220, 121, { a: .6 });
  // the old city on the hill: stone houses, the ribbed dome, the leaning minaret
  s += `<path d="M-20,900 L-20,820 Q200,780 360,790 Q560,800 740,830 V900Z" fill="#b0a898"/>`;
  [[-20, 70, 90], [40, 80, 110], [110, 60, 80], [470, 90, 100], [550, 70, 120], [610, 110, 90], [170, 70, 70]].forEach(([x, w, h], i) => s += stoneHouse(x, 890, w, h, 120 + i));
  s += `<g transform="translate(0,0)">${domeM(460, 860, 50, t).replace(/url\(#tileB\)/g, '#7aa48a')}</g>` + hadba(330, 900, 470, t);
  [[230, 60, 70], [390, 70, 64], [520, 64, 60], [640, 90, 80]].forEach(([x, w, h], i) => s += stoneHouse(x, 920, w, h, 130 + i));
  s += `<rect x="-20" y="915" width="760" height="20" fill="#8a8274"/>`;
  // the Tigris below, the reflection of the minaret
  s += `<rect x="-20" y="935" width="760" height="370" fill="url(#riverT)"/>` + Array.from({ length: 16 }, (_, i) => `<path d="M${(pmod(i * 97 + T * 18, 800) - 60).toFixed(1)},${950 + i * 20} h${40 + (i % 4) * 22}" stroke="#e8f0f0" stroke-width="2" opacity=".35"/>`).join('') +
    `<g opacity=".25" transform="translate(0,1870) scale(1,-1)">${hadba(330, 935, 300, t)}</g><rect x="-20" y="935" width="760" height="370" fill="url(#riverT)" opacity=".5"/>`;
  s += `<path d="M-20,1230 Q200,1200 400,1220 T740,1210 V1300 H-20Z" fill="#8a9a5a"/><path d="M-20,1230 Q200,1200 400,1220 T740,1210 V1300 H-20Z" fill="#000" filter="url(#grainR)" opacity=".2"/>` + treeR(60, 1250, 220, 125, t) + treeR(660, 1250, 200, 127, t);
  // the chaos that never was: dark smoke over the city, then clear sky
  s += smokeS(260, 880, 560, t, sm, 4, 1.2) + smokeS(520, 900, 500, t + 3, sm * .8, 6, 1);
  noEarth(); F.ov = ''; return s;
}
