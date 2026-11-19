// w2_b.js: #59 scenes 7-12: the war sped up science (lab), penicillin (dish, factory), the first electronic computers, the first reactor, the first rocket in space
// a 1940s lab coat person: white coat over the house person
function coatP(x, y, s, f, k, t, o = {}) { return p39(x, y, s, f, k, t, Object.assign({ pal: { top: '#eceee8', pants: '#3a3a40' } }, o)); }
// a vacuum tube glowing
const vtube = (x, y, s, gl, a = 1) => `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><rect x="-9" y="-4" width="18" height="10" fill="#2a2a2a"/><path d="M-8,-4 V-30 Q-8,-40 0,-40 Q8,-40 8,-30 V-4Z" fill="#c8d4dc" opacity=".35"/><rect x="-4" y="-26" width="8" height="18" fill="#6a6a70"/>` +
  `<circle cx="0" cy="-18" r="${(14 * gl).toFixed(1)}" fill="url(#tubeG)" opacity="${(.9 * gl).toFixed(2)}"/><path d="M-5,-34 Q-7,-24 -6,-8" stroke="#fff" stroke-width="1.6" opacity=".4" fill="none"/></g>`;
function flask(x, y, s, c) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-8,-70 V-40 L-34,0 H34 L8,-40 V-70Z" fill="#dfeaf0" opacity=".45" stroke="#c8d8e0" stroke-width="2"/><path d="M-22,-18 L-34,0 H34 L22,-18Z" fill="${c}" opacity=".8"/><rect x="-10" y="-76" width="20" height="8" fill="#a8b0b4"/><path d="M-4,-64 V-44" stroke="#fff" stroke-width="2.5" opacity=".5"/></g>`; }

// ---------- 7: but the war sped up science enormously: a wartime lab ----------
function sceneLab(t) {
  const t0 = S0(6) - .2, T = t - t0;
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#4a4640"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // the back wall: a blackboard with formulas, a window of night light
  s += `<rect x="60" y="430" width="600" height="330" fill="#20302a"/><rect x="52" y="422" width="616" height="346" fill="none" stroke="#6a4a2e" stroke-width="12"/><rect x="60" y="430" width="600" height="330" fill="#fff" filter="url(#grainR)" opacity=".06"/>`;
  const ch = ease(ramp(t, t0 + .2, WS(6, 5)));
  s += `<g opacity="${(.85 * ch).toFixed(2)}" font-family="Times New Roman" font-style="italic" fill="#e8ece4" direction="ltr"><text x="100" y="500" font-size="40">E = mc²</text><text x="380" y="520" font-size="30">λ = h / p</text><text x="110" y="600" font-size="28">ν = c / λ</text></g>`;
  s += `<path d="M310,720 Q410,${(580 - 30 * Math.sin(T)).toFixed(0)} 520,720" stroke="#e8ece4" stroke-width="3" fill="none" stroke-dasharray="${(320 * ch).toFixed(0)} 400" opacity=".8"/><path d="M300,730 H530 M310,740 V590" stroke="#e8ece4" stroke-width="2" opacity=".5"/>`;
  s += `<circle cx="230" cy="680" r="40" stroke="#e8ece4" stroke-width="2" fill="none" opacity=".6"/><ellipse cx="230" cy="680" rx="62" ry="20" stroke="#e8ece4" stroke-width="2" fill="none" opacity=".5" transform="rotate(30 230 680)"/><ellipse cx="230" cy="680" rx="62" ry="20" stroke="#e8ece4" stroke-width="2" fill="none" opacity=".5" transform="rotate(-30 230 680)"/><circle cx="230" cy="680" r="7" fill="#e8ece4" opacity=".7"/>`;
  // a rack of glowing tubes on the right
  s += `<rect x="560" y="780" width="160" height="230" fill="#2a2a2e"/><rect x="560" y="780" width="160" height="230" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  for (let r = 0; r < 3; r++) for (let i = 0; i < 4; i++) s += vtube(580 + i * 36, 830 + r * 70, .9, .6 + .4 * Math.sin(t * 5 + i * 1.7 + r * 2.3));
  // the bench with flasks and a microscope, the scientist writing
  s += `<rect x="-20" y="1010" width="760" height="300" fill="#3a2e24"/><rect x="-20" y="1000" width="760" height="22" fill="#6a5038"/><rect x="-20" y="1000" width="760" height="6" fill="#fff" opacity=".12"/>`;
  s += flask(120, 1000, 1, '#5aa0c8') + flask(190, 1000, .8, '#c8a03a') + flask(450, 1000, .9, '#8ac86a');
  s += coatP(330, 1000, .78, -1, 0, t, { h: { hF: [252, 640 + 10 * Math.sin(T * 3)], aB: [.1, .4] }, stache: '#3a2a1e' });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#aoDn)" opacity=".25"/>` + scr(`<circle cx="640" cy="890" r="200" fill="url(#tubeG)" opacity=".18"/>`);
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: penicillin, discovered in 1928: a mould kills the bacteria around it ----------
function petri(cx, cy, R, k, t) {
  let s = `<ellipse cx="${cx}" cy="${cy + 18}" rx="${R + 10}" ry="${(R + 10) * .92}" fill="#000" opacity=".45" filter="url(#blur9)"/><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#d8e4e8" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#agarG)"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  // bacteria colonies everywhere, dying near the mould
  const mx = cx - R * .18, my = cy - R * .1, halo = R * (.18 + .3 * k), r = RS(23);
  for (let i = 0; i < 260; i++) { const a = r() * 6.283, d = Math.sqrt(r()) * R * .93, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d, dm = Math.hypot(x - mx, y - my), sz = 3 + r() * 6;
    const fade = clamp((dm - halo) / (R * .08)); if (fade <= 0) continue;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${sz.toFixed(1)}" fill="#f4ecd0" opacity="${(.85 * fade).toFixed(2)}"/><circle cx="${(x - sz * .3).toFixed(1)}" cy="${(y - sz * .3).toFixed(1)}" r="${(sz * .35).toFixed(1)}" fill="#fff" opacity="${(.6 * fade).toFixed(2)}"/>`; }
  // the clear halo and the fuzzy mould colony
  s += `<circle cx="${mx}" cy="${my}" r="${halo.toFixed(1)}" fill="#e8dca0" opacity=".25"/><circle cx="${mx}" cy="${my}" r="${(R * .17).toFixed(1)}" fill="url(#mouldG)"/>`;
  for (let i = 0; i < 70; i++) { const a = r() * 6.283, d = R * (.1 + r() * .09); s += `<circle cx="${(mx + Math.cos(a) * d).toFixed(1)}" cy="${(my + Math.sin(a) * d).toFixed(1)}" r="${(2 + r() * 4).toFixed(1)}" fill="${r() > .5 ? '#e8f0e4' : '#4a8a74'}" opacity=".8"/>`; }
  s += `<path d="M${cx - R * .7},${cy - R * .55} A${R},${R} 0 0 1 ${cx + R * .55},${cy - R * .72}" stroke="#fff" stroke-width="7" fill="none" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="none" stroke="#eef4f6" stroke-width="4" opacity=".6"/>`;
  return s; }
function scenePetri(t) {
  const t0 = S0(7) - .2, T = t - t0, k = ease(ramp(t, WS(7, 1), WS(7, 6)));
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a2420"/><rect x="-20" y="-20" width="760" height="1320" fill="#5a4a3a" opacity=".5" filter="url(#grainR)"/>` + scr(`<circle cx="360" cy="560" r="560" fill="url(#mwG)" opacity=".22"/>`);
  s += `<g transform="translate(360,800) scale(${(1 + .05 * ease(clamp(T / 4))).toFixed(3)}) translate(-360,-800)">` + petri(360, 800, 290, k, t) + `</g>`;
  const la = ease(ramp(t, WS(7, 3), WS(7, 4)));
  if (la > 0) s += `<g opacity="${la.toFixed(2)}">${lbl(250, 610, 'العَفَن', 1, '#cfe8d8', 28)}<path d="M268,622 L290,680" stroke="#cfe8d8" stroke-width="3"/>${lbl(530, 1140, 'بكتيريا', 1, '#f4ecd0', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 9: the war made factories produce millions of doses ----------
function tank(x, base, w, h, i, t) { let g = `<rect x="${x - w / 2}" y="${base - h}" width="${w}" height="${h}" fill="url(#steelV)"/><ellipse cx="${x}" cy="${base - h}" rx="${w / 2}" ry="${w * .16}" fill="#c8ced4"/><ellipse cx="${x}" cy="${base - h}" rx="${w * .3}" ry="${w * .09}" fill="#8a9096"/>`;
  [.25, .5, .75].forEach(q => g += `<path d="M${x - w / 2},${base - h * q} Q${x},${base - h * q + w * .12} ${x + w / 2},${base - h * q}" stroke="#5a6068" stroke-width="3" fill="none" opacity=".6"/>`);
  g += `<circle cx="${x - w * .15}" cy="${base - h * .4}" r="${w * .08}" fill="#e8eef2" stroke="#3a4048" stroke-width="3"/><path d="M${x - w * .15},${base - h * .4} l${(w * .05 * Math.cos(t * 2 + i)).toFixed(1)},${(-w * .05).toFixed(1)}" stroke="#c83a2a" stroke-width="2"/>`;
  g += `<path d="M${x},${base - h - w * .16} V${base - h - 120} H${x + w * .8}" stroke="#8a9096" stroke-width="9" fill="none"/><rect x="${x - w / 2 - 6}" y="${base - 18}" width="${w + 12}" height="18" fill="#4a4e54"/>`;
  return g; }
function vial(x, y, s) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})"><rect x="-7" y="-30" width="14" height="30" rx="3" fill="#e8f0f4" opacity=".7"/><rect x="-6" y="-16" width="12" height="15" rx="2" fill="#f0d46a" opacity=".85"/><rect x="-8" y="-36" width="16" height="7" fill="#b84a3a"/><path d="M-3,-27 V-5" stroke="#fff" stroke-width="2" opacity=".6"/></g>`; }
function sceneFactory(t) {
  const t0 = WS(7, 7) - .3, T = t - t0;
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#7a8088"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  // high factory windows with light coming in
  for (let i = 0; i < 5; i++) s += `<rect x="${-10 + i * 150}" y="380" width="120" height="230" fill="#d8e4ec"/>` + [1, 2].map(q => `<path d="M${-10 + i * 150 + q * 40},380 V610" stroke="#4a4e54" stroke-width="5"/>`).join('') + `<path d="M${-10 + i * 150},495 h120" stroke="#4a4e54" stroke-width="5"/>`;
  s += scr(`<path d="M80,610 L-20,1100 L200,1100 L200,610Z M380,610 L300,1100 L520,1100 L500,610Z" fill="#fff4d8" opacity=".1" filter="url(#blur9)"/>`);
  s += `<rect x="-20" y="640" width="760" height="20" fill="#4a4e54"/>`;
  // a row of fermentation tanks, people in white between them
  [[70, 140, 340], [250, 150, 360], [440, 140, 340], [630, 150, 360]].forEach(([x, w, h], i) => s += tank(x, 1040, w, h, i, t));
  s += coatP(160, 1050, .56, 1, 2, t, { h: { hF: [190, 860] } }) + coatP(530, 1050, .56, -1, 1, t, { hat: 'cap', hatC: '#e8e8e4', h: { aF: [.6, 1.6] } });
  s += `<rect x="-20" y="1040" width="760" height="270" fill="#5a5e64"/><rect x="-20" y="1040" width="760" height="270" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // the conveyor with vials moving
  s += `<rect x="-20" y="1120" width="760" height="22" fill="#2a2c30"/><rect x="-20" y="1142" width="760" height="40" fill="#3a3c42"/>` + Array.from({ length: 9 }, (_, i) => `<circle cx="${pmod(i * 90 + T * 60, 800) - 40}" cy="1162" r="10" fill="#1a1a1e"/>`).join('');
  for (let i = 0; i < 26; i++) s += vial(pmod(i * 30 + T * 60, 800) - 40, 1120, 1);
  // the doses counter
  const pa = ease(ramp(t, WS(7, 13) - .4, WS(7, 13))), n = ease(ramp(t, WS(7, 13), WS(7, 15) + .4));
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}">${panel(150, 1060, 420, 90)}${lbl(360, 1110, AR((2.3 * n).toFixed(1)) + ' مليون جرعة', 1, '#f4c76b', 40)}${lbl(360, 1140, 'جاهزةٌ في يونيو ١٩٤٤', 1, '#fff', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: the first electronic computers: to break codes and compute shell paths ----------
function cabinet(x, y, w, h, t, seed) { const r = RS(seed); let g = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1a1c20"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" filter="url(#grainR)" opacity=".05"/><rect x="${x}" y="${y}" width="6" height="${h}" fill="#fff" opacity=".1"/>`;
  for (let rr = 0; rr < 8; rr++) for (let c = 0; c < Math.floor(w / 16); c++) { const on = pmod(r() + t * (.8 + r() * 2), 1) < .45; g += `<circle cx="${x + 10 + c * 16}" cy="${y + 20 + rr * 15}" r="3.2" fill="${on ? '#ffd27a' : '#4a3a2a'}"/>` + (on ? `<circle cx="${x + 10 + c * 16}" cy="${y + 20 + rr * 15}" r="7" fill="#ffb84a" opacity=".3"/>` : ''); }
  for (let rr = 0; rr < 4; rr++) for (let c = 0; c < Math.floor(w / 22); c++) g += `<circle cx="${x + 12 + c * 22}" cy="${y + 160 + rr * 26}" r="6" fill="#2e3036" stroke="#6a6e76" stroke-width="2"/>`;
  g += `<rect x="${x + 6}" y="${y + 370}" width="${w - 12}" height="70" fill="#2a2c32"/>`; for (let c = 0; c < Math.floor((w - 20) / 18); c++) for (let rr = 0; rr < 2; rr++) g += `<circle cx="${x + 16 + c * 18}" cy="${y + 390 + rr * 28}" r="5" fill="#121316" stroke="#8a8e96" stroke-width="1.6"/>`;
  return g; }
function sceneComp(t) {
  const t0 = S0(8) - .2, T = t - t0;
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#c8c0b0"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/><rect x="-20" y="-20" width="760" height="560" fill="#e0d8c8"/>`;
  s += `<rect x="-20" y="470" width="760" height="10" fill="#8a8274"/>`;
  // a long row of cabinets with lamps and plug sockets, cables hanging between them
  for (let i = 0; i < 5; i++) s += cabinet(-10 + i * 150, 500, 136, 520, t, 40 + i);
  const r = RS(5); let cab = ''; for (let i = 0; i < 9; i++) { const x0 = 10 + r() * 680, x1 = x0 + (r() - .5) * 200, y0 = 680 + r() * 60; cab += `<path d="M${x0.toFixed(0)},${y0.toFixed(0)} Q${((x0 + x1) / 2).toFixed(0)},${(y0 + 150 + r() * 90).toFixed(0)} ${x1.toFixed(0)},${(y0 + 20).toFixed(0)}" stroke="${['#1a1a1a', '#6a2a1a', '#2a3a5a'][i % 3]}" stroke-width="5" fill="none"/>`; } s += cab;
  s += `<rect x="-20" y="1020" width="760" height="290" fill="#8a7a64"/><rect x="-20" y="1020" width="760" height="290" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="1016" width="760" height="10" fill="#000" opacity=".25"/>`;
  // two women operators plugging cables, a man with a clipboard
  s += p39(200, 1100, .72, 1, 4, t, { skirt: '#3a4a6a', hair: '#3a2416', h: { hF: [262, 905 + 6 * Math.sin(T * 2)], aB: [.1, .3] } }) + p39(470, 1104, .72, -1, 2, t, { skirt: '#6a3a3a', h: { hF: [420, 905], aB: [-.1, .3] } }) + p39(610, 1110, .74, -1, 0, t, { stache: '#2a1e14' });
  // insets: a coded message being broken; then a shell's path
  const c1 = ease(ramp(t, WS(8, 4) - .2, WS(8, 4) + .2)) * (1 - ease(ramp(t, WS(8, 6) - .3, WS(8, 6)))), c2 = ease(ramp(t, WS(8, 6) - .2, WS(8, 6) + .2));
  if (c1 > 0) { const msg = 'QXJRM TVKLA', dec = 'ATTACK DAWN', n = Math.floor(clamp((t - WS(8, 4)) / .9) * msg.length); let tx = ''; for (let i = 0; i < msg.length; i++) tx += i < n ? dec[i] : msg[i];
    s += `<g opacity="${c1.toFixed(2)}">${panel(40, 400, 500, 92)}<text x="290" y="462" text-anchor="middle" direction="ltr" font-family="Courier New" font-weight="700" font-size="44" fill="#9fffb0" letter-spacing="4">${tx}</text></g>`; }
  if (c2 > 0) { const q = ease(ramp(t, WS(8, 6), WS(8, 8) + .3)); let d = ''; for (let i = 0; i <= 40; i++) { const u = i / 40 * q; d += (i ? ' L' : 'M') + (80 + u * 420).toFixed(1) + ',' + (470 - 300 * u * (1 - u) * 1.2).toFixed(1); }
    s += `<g opacity="${c2.toFixed(2)}">${panel(40, 360, 500, 140)}<path d="M70,470 H520" stroke="#fff" stroke-width="2" opacity=".4"/><path d="${d}" stroke="#ffb06a" stroke-width="4" fill="none" stroke-dasharray="10 6"/>${q > .02 ? `<circle cx="${(80 + q * 420).toFixed(1)}" cy="${(470 - 300 * q * (1 - q) * 1.2).toFixed(1)}" r="7" fill="#ffd27a"/>` : ''}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 11: the first nuclear reactor (Chicago, December 1942): a pile of graphite bricks ----------
function sceneReactor(t) {
  const t0 = S0(9) - .2, T = t - t0, nd = ease(ramp(t, WS(9, 1), WS(9, 2) + .4));
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#6a5e50"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // the balcony behind with watchers, the court walls
  s += `<rect x="-20" y="420" width="760" height="140" fill="#4a4036"/><rect x="-20" y="552" width="760" height="14" fill="#2a241e"/>` + Array.from({ length: 20 }, (_, i) => `<path d="M${-10 + i * 40},566 V520" stroke="#2a241e" stroke-width="4"/>`).join('') + `<path d="M-20,520 H740" stroke="#2a241e" stroke-width="5"/>`;
  [120, 240, 520, 620].forEach((x, i) => s += p39(x, 552, .44, i % 2 ? -1 : 1, i, t, { hat: i === 2 ? 'fed' : null, stache: i === 1 ? '#2a1e14' : null }));
  // the pile: layers of black graphite bricks in a flattened dome inside a wooden frame
  const cx = 360, base = 1060, R = 300, H = 380; let pile = '';
  for (let L = 0; L < 26; L++) { const y = base - L * (H / 26), u = (L + .5) / 26, w = R * Math.sqrt(Math.max(0, 1 - Math.pow(u * 1.04, 2))) * 1.0; if (w < 20) continue;
    pile += `<rect x="${(cx - w).toFixed(1)}" y="${(y - H / 26).toFixed(1)}" width="${(2 * w).toFixed(1)}" height="${(H / 26).toFixed(1)}" fill="${L % 2 ? '#202224' : '#2a2c30'}"/>`;
    for (let b = -w + (L % 2) * 18; b < w; b += 36) pile += `<path d="M${(cx + b).toFixed(1)},${(y - H / 26).toFixed(1)} V${y.toFixed(1)}" stroke="#0e0f10" stroke-width="1.5"/>`; }
  s += `<ellipse cx="${cx}" cy="${base + 10}" rx="${R + 60}" ry="30" fill="#000" opacity=".35" filter="url(#blur5)"/>` + pile + `<path d="M${cx - R * .8},${base - 60} Q${cx - R * .5},${base - H * .9} ${cx - 40},${base - H}" stroke="#fff" stroke-width="10" opacity=".06" fill="none"/>`;
  s += `<rect x="${cx - R - 20}" y="${base - H - 20}" width="${2 * R + 40}" height="${H + 20}" fill="none" stroke="#9a7a4e" stroke-width="10"/><path d="M${cx - R - 20},${base - H / 2} H${cx + R + 20}" stroke="#9a7a4e" stroke-width="6" opacity=".7"/>`;
  // the control rod being pulled out
  const rod = ease(ramp(t, t0 + .3, WS(9, 2))); s += `<rect x="${cx + 160}" y="${base - 160}" width="${(260 * rod + 40).toFixed(1)}" height="14" fill="#c8c0b0"/><rect x="${cx + 160}" y="${base - 160}" width="${(260 * rod + 40).toFixed(1)}" height="4" fill="#fff" opacity=".4"/>`;
  s += `<rect x="-20" y="1060" width="760" height="250" fill="#8a7a62"/><rect x="-20" y="1060" width="760" height="250" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += coatP(120, 1150, .66, 1, 1, t, { pal: { top: '#3a3e48' }, hat: 'fed' }) + coatP(640, 1160, .66, -1, 2, t, { h: { lookUp: .3 } });
  // a neutron counter with its needle climbing
  s += `<g transform="translate(150,830)">${panel(-90, -80, 180, 150, 1)}<path d="M-60,30 A70,70 0 0 1 60,30" stroke="#e8e4d8" stroke-width="6" fill="none"/><path d="M0,30 L${(-60 * Math.cos(nd * 2.5 + .3)).toFixed(1)},${(30 - 62 * Math.sin(nd * 2.5 + .3)).toFixed(1)}" stroke="#ff5a3a" stroke-width="5" stroke-linecap="round"/><circle cx="0" cy="30" r="7" fill="#e8e4d8"/>${lbl(0, 62, 'نيوترونات', 1, '#e8e4d8', 18)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: the first rocket to reach space (the V-2, June 1944, 176 km) ----------
function sceneRocket(t) {
  const t0 = WS(9, 3) - .3, T = t - t0, lt = t0 + .5, lift = ease(ramp(t, lt, lt + 1.2)), A = Math.pow(ramp(t, lt + .3, S0(10) - .5), 1.15), alt = 176 * A;
  const gy = 1500 * ease(A), rb = lerp(1010, 720, lift);
  let s = `<defs>${W2D()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#03050c"/>` + stars2(140, 5, ramp(A, .4, .8));
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#bSky)" opacity="${(1 - ramp(A, .2, .75)).toFixed(2)}"/>`;
  if (A > .55) { const k = ease(ramp(A, .55, 1)); s += `<g opacity="${k.toFixed(2)}"><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2200" fill="#2a5a9a"/><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2200" fill="#fff" opacity=".12" filter="url(#grainS)"/><circle cx="360" cy="${(3400 - 500 * k).toFixed(0)}" r="2290" fill="url(#limbG)"/></g>`; }
  s += `<g transform="translate(0,${gy.toFixed(1)})">${cumulus(160 + T * 4, 470, 250, 14, { a: .85 })}`;
  s += `<rect x="-20" y="880" width="760" height="40" fill="#5a8ab0"/><path d="M-20,880 L740,880" stroke="#fff" stroke-width="2" opacity=".5"/>`;
  let fr = ''; const r = RS(43); for (let i = 0; i < 46; i++) { const x = -20 + i * 17 + r() * 8; if (x > 300 && x < 430) continue; fr += pine(x, 1010 + r() * 20, 110 + r() * 130, 760 + i, '#2a4030'); } s += fr;
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#5a6a48"/><path d="M290,1012 L440,1012 L470,1300 L260,1300Z" fill="#9a968a"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<path d="M330,1012 L340,980 L388,980 L398,1012" stroke="#3a3a3e" stroke-width="8" fill="none"/><rect x="326" y="972" width="76" height="10" fill="#4a4a4e"/>`;
  if (t > lt - .1 && lift < 1) { const k = 1 - lift; s += `<ellipse cx="364" cy="990" rx="${(160 * k + 60).toFixed(1)}" ry="40" fill="#e8e4dc" opacity="${(.8 * k).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += `</g>`;
  if (t > lt) s += trail(364, rb + 20, 1010 + gy, 26, t, .9 * (1 - .5 * ramp(A, .5, 1))) + flame(364, rb - 4, .7, t, ease(ramp(t, lt, lt + .2)));
  s += v2R(364, rb, .9, { id: 2 });
  const ga = ease(ramp(t, lt + .5, lt + 1)); if (ga > 0) { const yA = v => 1150 - v * 4.1; let g = `<g opacity="${ga.toFixed(2)}">` + panel(560, 360, 140, 840, 1) + `<path d="M630,${yA(0)} V${yA(190)}" stroke="#fff" stroke-width="4" opacity=".5"/>`;
    [0, 50, 150].forEach(v => g += `<path d="M618,${yA(v)} H642" stroke="#fff" stroke-width="2" opacity=".6"/>` + lbl(668, yA(v) + 8, AR(v), 1, '#cfd6e0', 20));
    g += `<path d="M574,${yA(100)} H690" stroke="#9fd0ff" stroke-width="3" stroke-dasharray="8 6"/>` + lbl(630, yA(100) + 30, 'حدُّ الفضاء', 1, '#9fd0ff', 20) + lbl(630, yA(100) + 54, '١٠٠ كم', 1, '#9fd0ff', 18);
    g += `<path d="M630,${yA(0)} V${yA(alt).toFixed(1)}" stroke="#f4c76b" stroke-width="8" stroke-linecap="round"/><circle cx="630" cy="${yA(alt).toFixed(1)}" r="10" fill="#f4c76b"/>` + lbl(630, yA(alt) - 22, AR(Math.round(alt)) + ' كم', 1, '#fff', 26);
    s += g + lbl(630, 1188, 'الارتفاع', 1, '#cfd6e0', 22) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
