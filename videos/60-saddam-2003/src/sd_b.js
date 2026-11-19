// sd_b.js: #60 scenes 5-13: sanctions, the dinar, oil, banned satellite dishes, one ruler and Halabja, the Arab Spring, 89 years old, no weapons found, the end; scene list, chips, list

// ---------- 5: the other side: Iraq under sanctions since 1990 ----------
function sceneSanction(t) {
  const t0 = S0(5) - .2, T = t - t0, a = ease(ramp(t, WS(5, 6) - .3, WS(5, 7) + .2));
  const G = gAt(t, 360, 760, { d: lerp(2.9, 2.6, ease(clamp(T / 6))), el: .56, lon: 44 + T * .15, clouds: .2, lights: .25, off: -.75, up: .6 });
  let o = `<defs>${SDD()}</defs><path d="${areaD(G, MAND.iq)}" fill="#d84a4a" opacity="${(.35 * a).toFixed(2)}"/><path d="${areaD(G, MAND.iq)}" fill="url(#hatchR)" opacity="${(.4 * a).toFixed(2)}"/><path d="${areaD(G, MAND.iq)}" fill="none" stroke="#ff8a7a" stroke-width="3.4" opacity="${a.toFixed(2)}"/>`;
  // the ring of the embargo: a dashed red circle around the country, closing
  const [cx, cy] = G.P(33.2, 43.6, 1.01), R = 190 + 30 * (1 - a), da = pmod(T * 30, 40);
  if (a > 0) o += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="none" stroke="#ff5a4a" stroke-width="6" stroke-dasharray="22 18" stroke-dashoffset="${da.toFixed(1)}" opacity="${(.85 * a).toFixed(2)}"/>`;
  // tankers waiting outside the Gulf, not moving
  if (a > 0) [[27.2, 51.6], [26.4, 52.6], [25.6, 54.0]].forEach(([la, lo], i) => { if (G.vis(la, lo) < .2) return; const [x, y] = G.P(la, lo, 1.008); o += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(.5)" opacity="${a.toFixed(2)}"><path d="M-30,0 L28,0 L36,-8 L-34,-8Z" fill="#2a2a30"/><rect x="14" y="-18" width="12" height="10" fill="#e8e8e8"/><path d="M-26,-4 H24" stroke="#d84a4a" stroke-width="2"/></g>`; });
  o += pin(G, 33.0, 43.4, 'العراق', ease(ramp(t, S0(5), S0(5) + .6)), '#fff', 34);
  F.ov = o; return space(t);
}

// ---------- 6: the dinar: more than $3 in the 1980s, 3,000 dinars to the dollar in the 1990s ----------
function note(x, y, w, col, txt, rot = 0) {   // a generic banknote: no portrait, a geometric medallion and the value
  const h = w * .46; return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 4}" width="${w}" height="${h}" rx="4" fill="#000" opacity=".25"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="4" fill="${col}"/><rect x="${-w / 2 + 6}" y="${-h / 2 + 6}" width="${w - 12}" height="${h - 12}" rx="3" fill="none" stroke="${mix(col, '#000000', .35)}" stroke-width="2"/>` +
    `<circle cx="${w * .22}" cy="0" r="${h * .3}" fill="${mix(col, '#ffffff', .3)}"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${w * .22},0 l${(h * .28 * Math.cos(i * .785)).toFixed(1)},${(h * .28 * Math.sin(i * .785)).toFixed(1)}" stroke="${mix(col, '#000000', .3)}" stroke-width="1.6"/>`).join('') +
    `<text x="${-w * .18}" y="${h * .12}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="${(h * .34).toFixed(1)}" fill="${mix(col, '#000000', .5)}">${txt}</text></g>`; }
function sceneDinar(t) {
  const t0 = S0(6) - .2, T = t - t0, k90 = ease(ramp(t, WS(6, 9) - .2, WS(6, 10) + .3)), yr = Math.round(lerp(1985, 1995, ease(ramp(t, WS(6, 9), WS(6, 13))))), pile = ease(ramp(t, WS(6, 11), WS(6, 15) + .3));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#5a4a3e"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  // a money changer's shop: the rate board on the wall, a lamp, the counter
  s += `<rect x="40" y="390" width="470" height="330" rx="10" fill="#1a1c1e"/><rect x="40" y="390" width="470" height="330" rx="10" fill="none" stroke="#8a7a5a" stroke-width="8"/>` + lbl(275, 450, 'سعر الصرف', 1, '#f4c76b', 34) + lbl(275, 520, AR4(yr), 1, '#fff', 54);
  const a80 = 1 - k90; s += `<g opacity="${a80.toFixed(2)}">${lbl(275, 620, '١ دينار = ٣٫٢ دولار', 1, '#7aff9a', 40)}</g><g opacity="${k90.toFixed(2)}">${lbl(275, 620, `١ دولار = ${AR(fmtN(Math.round(lerp(3, 3000, ease(ramp(t, WS(6, 11), WS(6, 15)))))))} دينار`, 1, '#ff8a7a', 40)}</g>` + lbl(275, 680, k90 > .5 ? 'السوق، ١٩٩٥' : 'الثمانينيّات', 1, '#cfd6e0', 24);
  s += `<ellipse cx="360" cy="380" rx="260" ry="120" fill="url(#lampY)" opacity=".5"/><path d="M360,300 v60" stroke="#2a2a2a" stroke-width="3"/><path d="M330,360 h60 l-10,24 h-40Z" fill="#3a3a34"/>`;
  s += hero(600, 1010, Object.assign({ s: .95, face: -1, shade: 1, lookUp: -.25, aF: [.9, 1.7], aB: [.5, 1.3] }, palS(3)));
  s += `<path d="M-20,860 H740 V960 H-20Z" fill="#9a7a56"/><path d="M-20,860 H740 V960 H-20Z" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="856" width="760" height="8" fill="#c8a47a"/><rect x="-20" y="960" width="760" height="14" fill="#5a3e28"/><rect x="-20" y="974" width="760" height="340" fill="#6a4e36"/><rect x="-20" y="974" width="760" height="340" fill="#000" filter="url(#grainR)" opacity=".2"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${10 + i * 180}" y="994" width="160" height="230" rx="6" fill="#7a5a40"/><rect x="${10 + i * 180}" y="994" width="160" height="10" fill="#fff" opacity=".1"/>`).join('');
  // before: one note buys more than three dollars; after: a growing pile of notes for one dollar
  s += `<g opacity="${a80.toFixed(2)}">${note(200, 915, 180, '#7aa47a', '١ دينار', -4)}${note(400, 920, 150, '#9ab0c0', '$', 3)}${note(450, 906, 150, '#9ab0c0', '$', -2)}${note(500, 926, 150, '#9ab0c0', '$', 6)}</g>`;
  if (k90 > 0) { let p = ''; const n = Math.round(4 + 46 * pile), r = RS(31); for (let i = 0; i < n; i++) { const c = i % 3; p += note(130 + (c * 70) + (r() - .5) * 30, 930 - Math.floor(i / 3) * 9 - r() * 4, 170, ['#c8a07a', '#a8b47a', '#d8b48a'][i % 3], '٢٥٠', (r() - .5) * 14); }
    s += `<g opacity="${k90.toFixed(2)}">${p}${note(470, 926, 150, '#9ab0c0', '$', 2)}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 7: oil: today more than 4 million barrels a day, about twice the output under sanctions ----------
function pumpjack(x, y, s, t, ph = 0) { const a = Math.sin(t * 1.6 + ph) * .28;
  const beam = `<g transform="rotate(${(a * 57.3).toFixed(1)},0,-150)"><rect x="-130" y="-160" width="240" height="18" rx="4" fill="#3a3e44"/><path d="M110,-176 Q160,-150 110,-124 Z" fill="#4a4e54"/><path d="M-130,-150 L-150,-70" stroke="#2a2a2a" stroke-width="5"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="130" ry="12" fill="#000" opacity=".25"/><path d="M-40,0 L0,-150 L40,0" stroke="#5a5e64" stroke-width="10" fill="none"/><rect x="-150" y="-12" width="300" height="12" fill="#4a4a4a"/><circle cx="-110" cy="-50" r="26" fill="#d8a020"/><circle cx="-110" cy="-50" r="8" fill="#3a3a3a"/>` + beam + `<rect x="128" y="-60" width="12" height="60" fill="#3a3a3a"/></g>`; }
function sceneOil(t) {
  const t0 = S0(7) - .2, T = t - t0, b1 = ease(ramp(t, WS(7, 3) - .2, WS(7, 9))), b2 = ease(ramp(t, WS(7, 10), WS(7, 16)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#duskB)"/>` + sun3(520, 840, .85, '#ffd8a0') + cumulus(200 + T * 3, 560, 230, 141, { a: .4 });
  s += `<rect x="-20" y="880" width="760" height="420" fill="#c09468"/><rect x="-20" y="880" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".18"/><rect x="-20" y="868" width="760" height="30" fill="#ffd0a0" opacity=".4" filter="url(#blur5)"/>`;
  // a gas flare on a tall stack, pipelines, tanks far away
  s += `<rect x="466" y="660" width="10" height="230" fill="#3a3a3a"/>` + flame(471, 660, .55, t).replace('scale(', 'scale(1,-1) scale(') + `<ellipse cx="471" cy="630" rx="90" ry="70" fill="url(#lampY)" opacity=".6"/>` + smokeS(480, 580, 260, t, .5, 9, .5);
  s += [[100, 880, 70, 40], [190, 884, 90, 50], [620, 882, 80, 44]].map(([x, y, w, h]) => `<rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" fill="#d8d4cc"/><ellipse cx="${x}" cy="${y - h}" rx="${w / 2}" ry="8" fill="#e8e4dc"/><rect x="${x + w * .2}" y="${y - h}" width="${w * .3}" height="${h}" fill="#000" opacity=".15"/>`).join('');
  s += `<path d="M-20,960 H740" stroke="#5a5a5a" stroke-width="8"/><path d="M-20,956 H740" stroke="#fff" stroke-width="2" opacity=".2"/>`;
  s += pumpjack(400, 1010, .5, t, 2.1) + pumpjack(590, 1130, .78, t, 1.3);
  // the bars: 2002 vs today
  const bar = (x, v, k, lab, col) => { const h = 260 * v / 4.4 * k; return `<rect x="${x}" y="${1180 - h}" width="110" height="${h.toFixed(1)}" rx="6" fill="${col}"/><rect x="${x}" y="${1180 - h}" width="110" height="${(h * .3).toFixed(1)}" rx="6" fill="#fff" opacity=".18"/>` + lbl(x + 55, (1180 - h - 14).toFixed(1), AR((v * k).toFixed(1)), k > .02 ? 1 : 0, '#fff', 34) + lbl(x + 55, 1214, lab, 1, '#fff', 22); };
  if (b1 > 0) s += `<g opacity="${clamp(b1 * 3).toFixed(2)}">${panel(30, 830, 320, 410)}${lbl(190, 872, 'مليون برميل يوميّاً', 1, '#f4c76b', 26)}${bar(205, 2.0, b2, '٢٠٠٢ (الحصار)', '#8a8a90')}${bar(55, 4.4, b1, 'اليوم', '#f4c76b')}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: satellite dishes were banned, the internet limited and watched ----------
function dish(x, y, s, a) { if (a <= 0) return '';   // an offset satellite dish on a short mast, the feed arm and the LNB
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s.toFixed(3)})" opacity="${a.toFixed(2)}"><path d="M0,0 V-44" stroke="#4a4a4a" stroke-width="5"/><path d="M-14,0 L0,-20 L14,0" stroke="#4a4a4a" stroke-width="3" fill="none"/>` +
    `<g transform="rotate(-28,0,-58)"><ellipse cx="0" cy="-58" rx="34" ry="40" fill="#b8b8b4"/><ellipse cx="3" cy="-58" rx="31" ry="37" fill="#eeeeea"/><ellipse cx="8" cy="-56" rx="20" ry="25" fill="#d8d8d4"/><path d="M-26,-76 Q-8,-96 18,-88" stroke="#fff" stroke-width="3" fill="none" opacity=".7"/></g>` +
    `<path d="M2,-48 L40,-80" stroke="#5a5a5a" stroke-width="3.4"/><rect x="36" y="-90" width="12" height="16" rx="3" fill="#3a3a3a" transform="rotate(-40,42,-82)"/></g>`; }
function roofB(x, base, w, h, sc, col, r, gone, t) {   // a flat-roofed concrete/brick house: parapet, framed windows, a balcony, rooftop water tank, AC unit, maybe a dish
  let s = `<rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 400).toFixed(1)}" fill="${col}"/><rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 400).toFixed(1)}" fill="#000" filter="url(#grainR)" opacity=".18"/>` +
    `<rect x="${(x + w * .78).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(w * .22).toFixed(1)}" height="${(h + 400).toFixed(1)}" fill="#000" opacity=".16"/><rect x="${x.toFixed(1)}" y="${(base - h).toFixed(1)}" width="${w.toFixed(1)}" height="${(h + 400).toFixed(1)}" fill="url(#aoDn)" opacity=".25"/>`;
  const pt = base - h - 16 * sc; s += `<rect x="${(x - 3).toFixed(1)}" y="${pt.toFixed(1)}" width="${(w + 6).toFixed(1)}" height="${(16 * sc).toFixed(1)}" fill="${mix(col, '#ffffff', .22)}"/><rect x="${(x - 3).toFixed(1)}" y="${(base - h).toFixed(1)}" width="${(w + 6).toFixed(1)}" height="${(4 * sc).toFixed(1)}" fill="#000" opacity=".22"/>`;
  // windows with frames and shutters, lit or dark
  const nw = Math.max(1, Math.floor(w / (70 * sc))); for (let f = 0; f < 3; f++) for (let i = 0; i < nw; i++) { const wx = x + (i + .5) * w / nw - 13 * sc, wy = base - h + 28 * sc + f * 70 * sc, lit = r() < .45;
    s += `<rect x="${(wx - 4 * sc).toFixed(1)}" y="${(wy - 4 * sc).toFixed(1)}" width="${(34 * sc).toFixed(1)}" height="${(46 * sc).toFixed(1)}" fill="${mix(col, '#ffffff', .3)}"/><rect x="${wx.toFixed(1)}" y="${wy.toFixed(1)}" width="${(26 * sc).toFixed(1)}" height="${(38 * sc).toFixed(1)}" fill="${lit ? '#ffd890' : '#3a3440'}"/><path d="M${(wx + 13 * sc).toFixed(1)},${wy.toFixed(1)} v${(38 * sc).toFixed(1)}" stroke="${mix(col, '#ffffff', .4)}" stroke-width="${(2 * sc).toFixed(1)}"/>` + (lit ? scr(`<rect x="${(wx - 8 * sc).toFixed(1)}" y="${(wy - 8 * sc).toFixed(1)}" width="${(42 * sc).toFixed(1)}" height="${(54 * sc).toFixed(1)}" fill="#ffc870" opacity=".18" filter="url(#blur5)"/>`) : '');
    if (f === 1 && i === 0 && r() < .5) s += `<rect x="${(wx - 12 * sc).toFixed(1)}" y="${(wy + 38 * sc).toFixed(1)}" width="${(50 * sc).toFixed(1)}" height="${(5 * sc).toFixed(1)}" fill="#3a3a3a"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M${(wx - 10 * sc + q * 9 * sc).toFixed(1)},${(wy + 22 * sc).toFixed(1)} v${(16 * sc).toFixed(1)}" stroke="#3a3a3a" stroke-width="${(1.6 * sc).toFixed(1)}"/>`).join(''); }
  // on the roof: a water tank on a stand, an AC box
  if (r() < .6) { const tx = x + w * (.15 + r() * .3), tw = 34 * sc, th = 30 * sc; s += `<path d="M${(tx + 4 * sc).toFixed(1)},${pt.toFixed(1)} v${(-12 * sc).toFixed(1)} M${(tx + tw - 4 * sc).toFixed(1)},${pt.toFixed(1)} v${(-12 * sc).toFixed(1)}" stroke="#4a4a4a" stroke-width="${(3 * sc).toFixed(1)}"/><rect x="${tx.toFixed(1)}" y="${(pt - 12 * sc - th).toFixed(1)}" width="${tw.toFixed(1)}" height="${th.toFixed(1)}" rx="${(6 * sc).toFixed(1)}" fill="${r() < .5 ? '#2a2c30' : '#e8e6e0'}"/><rect x="${(tx + tw * .65).toFixed(1)}" y="${(pt - 12 * sc - th).toFixed(1)}" width="${(tw * .35).toFixed(1)}" height="${th.toFixed(1)}" fill="#000" opacity=".2"/>`; }
  if (r() < .5) { const ax = x + w * .7; s += `<rect x="${ax.toFixed(1)}" y="${(pt - 18 * sc).toFixed(1)}" width="${(30 * sc).toFixed(1)}" height="${(18 * sc).toFixed(1)}" fill="#cfcfc8"/><circle cx="${(ax + 15 * sc).toFixed(1)}" cy="${(pt - 9 * sc).toFixed(1)}" r="${(6 * sc).toFixed(1)}" fill="#8a8a84"/>`; }
  if (r() < .8) s += dish(x + w * (.45 + r() * .2), pt, sc * 1.1, 1 - gone);
  return s; }
function sceneRoofs(t) {
  const t0 = S0(8) - .2, T = t - t0, gone = ease(ramp(t, WS(8, 1), WS(8, 3) + .2)), net = ease(ramp(t, WS(8, 4) - .2, WS(8, 4) + .4));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#duskB)"/>` + sun3(600, 800, .7, '#ffd8a0') + cumulus(300 + T * 3, 560, 220, 157, { a: .35 });
  s += `<g opacity=".55">${domeM(140, 830, 56, t)}${minaret(240, 830, 190, 16)}</g><rect x="-20" y="740" width="760" height="120" fill="#e8a888" opacity=".25"/>`;
  const rows = [[860, .55, 151], [990, .78, 153], [1150, 1.05, 155]];
  rows.forEach(([base, sc, sd], ri) => { const r = RS(sd); let x = -40 - r() * 40; while (x < 740) { const w = (170 + r() * 110) * sc, h = (110 + r() * 90) * sc, col = mix(mix('#d8b88a', '#c8a888', r()), '#8a6e58', ri * .12 + r() * .15);
    s += roofB(x, base, w, h, sc, col, r, gone, t); x += w + (r() < .4 ? 14 * sc : 2); }
    if (ri < 2) s += `<rect x="-20" y="${base - 300}" width="760" height="320" fill="#d8a08a" opacity=".08"/>`; });
  if (gone > 0) s += `<g opacity="${(gone * (1 - net * .4)).toFixed(2)}" transform="translate(140,470)"><circle r="54" fill="none" stroke="#ff5a4a" stroke-width="8"/><path d="M-38,38 L38,-38" stroke="#ff5a4a" stroke-width="8"/>${dish(10, 34, .9, 1)}</g>`;
  // the internet: an old computer with a slow page and an eye watching
  if (net > 0) { const cx = 230, cy = 640, R = 150; s += `<g opacity="${net.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#f4c76b"/><defs><clipPath id="netI"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#netI)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#4a5058"/>` +
    `<rect x="${cx - 100}" y="${cy - 90}" width="200" height="150" rx="10" fill="#d8d4c8"/><rect x="${cx - 84}" y="${cy - 76}" width="168" height="118" fill="#1a2a3a"/><rect x="${cx - 76}" y="${cy - 66}" width="${(152 * pmod(T * .12, 1)).toFixed(1)}" height="10" fill="#4a8ac8"/>` + [0, 1, 2, 3].map(i => `<rect x="${cx - 76}" y="${cy - 44 + i * 18}" width="${100 - i * 14}" height="8" fill="#5a6a7a"/>`).join('') +
    `<rect x="${cx - 40}" y="${cy + 60}" width="80" height="24" fill="#c8c4b8"/><rect x="${cx - 110}" y="${cy + 84}" width="220" height="20" rx="4" fill="#c8c4b8"/>` +
    `<g transform="translate(${cx + 60},${cy - 20})"><path d="M-36,0 Q0,-28 36,0 Q0,28 -36,0Z" fill="#fff"/><circle r="13" fill="#c83a3a"/><circle r="6" fill="#1a1a1a"/></g></g></g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 9: the same ruler since 1979 (a palace at night, years counting) ----------
function scenePalace(t) {
  const t0 = S0(9) - .2, T = t - t0, yr = Math.round(lerp(1979, 2003, ease(ramp(t, WS(9, 2), WS(9, 7) + .3))));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#141a36"/><rect x="-20" y="600" width="760" height="400" fill="#3a3a5a" opacity=".5" filter="url(#blur9)"/>`;
  s += Array.from({ length: 40 }, (_, i) => { const r = RS(i * 7 + 3); return `<circle cx="${(r() * 740).toFixed(0)}" cy="${(380 + r() * 300).toFixed(0)}" r="${(.8 + r() * 1.4).toFixed(1)}" fill="#fff" opacity="${(.4 + r() * .5).toFixed(2)}"/>`; }).join('');
  // a long sandstone palace, arcades, a big central dome, floodlit from below
  s += `<rect x="-20" y="860" width="760" height="160" fill="#c8a878"/><rect x="-20" y="860" width="760" height="160" fill="#000" filter="url(#grainR)" opacity=".18"/>` + Array.from({ length: 13 }, (_, i) => `<path d="M${-10 + i * 58},1020 V930 a22,22 0 0 1 44,0 V1020Z" fill="#3a2e24"/><path d="M${-10 + i * 58},1020 V930 a22,22 0 0 1 44,0" stroke="#f4dcb0" stroke-width="3" fill="none" opacity=".5"/>`).join('') +
    `<rect x="-20" y="846" width="760" height="16" fill="#e0c8a0"/>` + Array.from({ length: 24 }, (_, i) => `<rect x="${-14 + i * 32}" y="826" width="18" height="22" fill="#d8bc90"/>`).join('');
  s += `<rect x="250" y="700" width="220" height="150" fill="#d4b484"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${266 + i * 40},850 V760 a12,12 0 0 1 24,0 V850Z" fill="#3a2e24"/>`).join('') + `<path d="M240,700 C240,540 480,540 480,700Z" fill="#c8a870"/><path d="M240,700 C240,600 330,560 360,560" stroke="#fff" stroke-width="5" fill="none" opacity=".3"/><path d="M360,560 v-40" stroke="#d8b050" stroke-width="6"/><circle cx="360" cy="516" r="8" fill="#e8c060"/>`;
  s += `<rect x="-20" y="700" width="760" height="320" fill="url(#lampY)" opacity=".25"/><rect x="-20" y="1020" width="760" height="290" fill="#2a2e24"/><rect x="-20" y="1020" width="760" height="290" fill="#000" filter="url(#grainR)" opacity=".2"/>` + [80, 640].map(x => `<ellipse cx="${x}" cy="1010" rx="120" ry="200" fill="url(#lampY)" opacity=".55"/>`).join('');
  s += treeR(-20, 1080, 280, 161, t) + treeR(720, 1080, 260, 163, t);
  s += `<g>${panel(210, 1110, 300, 120)}${lbl(360, 1192, AR4(yr), 1, '#f4c76b', 66)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9b: Halabja, 16 March 1988: a gas cloud over the mountain town, about 5,000 killed; then candles ----------
function sceneHalab(t) {
  const t0 = S0(9) + 3.6, T = t - t0, gz = ease(ramp(t, WS(9, 10), WS(9, 12) + .4)), cd = ease(ramp(t, WS(9, 13) - .2, WS(9, 15)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mornB)"/><rect x="-20" y="-20" width="760" height="1320" fill="#3a4050" opacity="${(.4 * cd).toFixed(2)}"/>` + sun3(150, 520, .7, '#fff0c8');
  s += mountainsR(770, 150, 171, { rock: '#9a96a0', snowAt: .82, haze: .28, hazeCol: '#c8d4e4' }) + `<rect x="-20" y="805" width="760" height="70" fill="#7a7a6a"/>` + mountainsR(860, 80, 173, { rock: '#7a8460', haze: .12 }) + `<rect x="-20" y="840" width="760" height="40" fill="#c8d4e0" opacity=".3" filter="url(#blur5)"/>`;
  s += `<rect x="-20" y="860" width="760" height="440" fill="#7a8a5a"/><rect x="-20" y="860" width="760" height="440" fill="#000" filter="url(#grainR)" opacity=".16"/>`;
  // the town: low flat-roofed houses on the slope
  const r = RS(177); for (let row = 0; row < 3; row++) for (let i = 0; i < 9; i++) { const x = -30 + i * 86 + (row % 2) * 40 + r() * 20, y = 900 + row * 70, w = 60 + r() * 30 + row * 10, h = 40 + r() * 24 + row * 8, c = mix('#e0d4bc', '#b8a88a', r());
    s += `<rect x="${x.toFixed(0)}" y="${(y - h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" fill="${c}"/><rect x="${(x + w * .75).toFixed(0)}" y="${(y - h).toFixed(0)}" width="${(w * .25).toFixed(0)}" height="${h.toFixed(0)}" fill="#000" opacity=".14"/><rect x="${(x + 10).toFixed(0)}" y="${(y - h + 12).toFixed(0)}" width="12" height="14" fill="#3a3a3a"/><rect x="${(x + w - 26).toFixed(0)}" y="${(y - h + 12).toFixed(0)}" width="12" height="14" fill="#3a3a3a"/>`; }
  s += treeR(80, 1080, 220, 179, t) + treeR(640, 1100, 240, 181, t);
  // the pale yellow-white cloud that rolls down over the town (no people shown)
  if (gz > 0) { let g = ''; for (let i = 0; i < 16; i++) { const rr = RS(i * 31 + 5), x = -60 + i * 55 + Math.sin(t * .4 + i) * 20 + T * 6, y = 900 + rr() * 140 - 80 * gz; g += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(120 + rr() * 70).toFixed(1)}" ry="${(80 + rr() * 40).toFixed(1)}" fill="url(#hazeY)" opacity="${(gz * (1 - .5 * cd)).toFixed(2)}"/>`; } g += `<rect x="-20" y="760" width="760" height="420" fill="#e4e0a8" opacity="${(.35 * gz * (1 - .5 * cd)).toFixed(2)}"/>`; s += `<g filter="url(#smokeF)">${g}</g>`; }
  // in memory: a row of candles at the front
  if (cd > 0) { s += `<rect x="-20" y="1090" width="760" height="220" fill="#2a2420" opacity="${(.85 * cd).toFixed(2)}"/><g opacity="${cd.toFixed(2)}">` + Array.from({ length: 9 }, (_, i) => candle(60 + i * 75, 1200 - (i % 2) * 18, 50 + (i % 3) * 14, t, i)).join('') + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: 2011: the Arab Spring from Tunisia to Syria... would it have reached Baghdad? ----------
const SPRING = [[36.8, 10.2, 'تونس', 1], [30.05, 31.25, 'مصر', 1], [32.9, 13.2, 'ليبيا', 1], [15.35, 44.2, 'اليمن', -1], [33.5, 36.3, 'سوريا', -1]];
function sceneSpring(t) {
  const t0 = S0(10) - .2, T = t - t0, q = ease(ramp(t, WS(10, 11) - .2, WS(10, 15)));
  const G = gAt(t, 360, 780, { d: lerp(4.4, 4.1, ease(clamp(T / 7))), el: .5, lon: lerp(24, 30, ease(clamp(T / 7))), clouds: .25, lights: .3, off: -.75, up: .6 });
  let o = `<defs>${SDD()}</defs>`;
  SPRING.forEach(([la, lo, tx, sd], i) => { const ti = WS(10, 4) + i * .35, k = ease(ramp(t, ti, ti + .5)); if (k <= 0 || G.vis(la, lo) < .15) return; const [x, y] = G.P(la, lo, 1.008), p = .8 + .2 * Math.sin(t * 5 + i);
    o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(30 * p).toFixed(1)}" fill="url(#flashG)" opacity="${(.75 * k).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#fff" opacity="${k.toFixed(2)}"/>` + lbl((x + sd * 40).toFixed(1), (y + 8).toFixed(1), tx, k.toFixed(2), '#fff', 28, sd > 0 ? 'end' : 'start'); });
  if (q > 0 && G.vis(33.31, 44.37) > .15) { const [x, y] = G.P(33.31, 44.37, 1.008); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="26" fill="url(#goldF)" opacity="${q.toFixed(2)}"/><text x="${x.toFixed(1)}" y="${(y - 24).toFixed(1)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${(70 + 20 * q).toFixed(0)}" fill="#f4c76b" opacity="${q.toFixed(2)}" style="filter:drop-shadow(0 4px 12px rgba(0,0,0,.7))">؟</text>` + lbl((x + 30).toFixed(1), (y + 36).toFixed(1), 'بغداد', q.toFixed(2), '#fff', 28, 'end'); }
  F.ov = o; return space(t);
}

// ---------- 11: today he would be 89... who would rule after him? An empty chair in a palace hall ----------
function sceneChair(t) {
  const t0 = S0(11) - .2, T = t - t0, age = Math.round(lerp(66, 89, ease(ramp(t, WS(11, 2), WS(11, 6))))), q = ease(ramp(t, WS(11, 7) - .2, WS(11, 9)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#4a3a30"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  // marble columns, arches, a long red carpet to a raised empty chair
  [60, 220, 500, 660].forEach(x => s += `<rect x="${x - 30}" y="380" width="60" height="640" fill="url(#stoneV)"/><rect x="${x - 40}" y="370" width="80" height="24" fill="#e0d0b0"/><rect x="${x - 40}" y="1000" width="80" height="24" fill="#c8b898"/>`);
  s += `<path d="M190,380 Q360,260 530,380" stroke="#d8c8a8" stroke-width="22" fill="none"/><rect x="250" y="420" width="220" height="420" fill="#2a2020" opacity=".6"/><ellipse cx="360" cy="560" rx="220" ry="260" fill="url(#lampY)" opacity=".35"/>`;
  s += `<rect x="-20" y="1020" width="760" height="290" fill="#c8b8a0"/><rect x="-20" y="1020" width="760" height="290" fill="#000" filter="url(#grainR)" opacity=".18"/><path d="M300,1020 L420,1020 L560,1300 L160,1300Z" fill="#8a2a2a"/><path d="M300,1020 L420,1020 L560,1300 L160,1300Z" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += `<rect x="230" y="960" width="260" height="60" fill="#d8c8a8"/><rect x="250" y="920" width="220" height="44" fill="#e0d0b4"/>`;
  s += `<path d="M300,920 V690 Q360,620 420,690 V920Z" fill="#8a2a2a"/><path d="M300,920 V690 Q360,620 420,690 V920" stroke="#d8b050" stroke-width="10" fill="none"/><rect x="286" y="840" width="148" height="30" rx="8" fill="#d8b050"/><rect x="292" y="860" width="12" height="62" fill="#c8a040"/><rect x="416" y="860" width="12" height="62" fill="#c8a040"/><path d="M300,700 Q360,650 420,700" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/>`;
  // dust motes in the light
  for (let i = 0; i < 26; i++) { const r = RS(i * 13 + 1), ph = pmod(T * .05 + r(), 1); s += `<circle cx="${(260 + r() * 200 + Math.sin(T * .5 + i) * 10).toFixed(1)}" cy="${(900 - ph * 480).toFixed(1)}" r="${(1 + r() * 1.8).toFixed(1)}" fill="#fff4d0" opacity="${(.5 * Math.sin(ph * Math.PI)).toFixed(2)}"/>`; }
  s += `<g>${panel(200, 1110, 320, 120)}${lbl(360, 1190, AR(age) + ' عاماً', 1, '#f4c76b', 60)}</g>`;
  if (q > 0) s += `<text x="360" y="820" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="150" fill="#f4c76b" opacity="${q.toFixed(2)}" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: the strange part: the weapons of mass destruction, the reason for the war, were never found (2004 report) ----------
function insp(x, y, s, f, t, o = {}) {   // an inspector in white coveralls with a hard hat and a torch
  const A = Object.assign({ s, face: f, shade: 1, top: '#e8ecee', pants: '#d8dde0', skin: o.skin || '#c89a74', hair: '#2a1a12', walk: o.walk ?? null, hF: [x + f * s * 70, y - s * 210] }, o.h || {});
  let g = hero(x, y, A); const [hx, hy] = HP.head, H = HP.hand;
  g += `<path d="M${(hx - 23 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 42 * s).toFixed(1)} ${(hx + 23 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)}Z" fill="#f4f4f0"/><rect x="${(hx - 27 * s).toFixed(1)}" y="${(hy - 9 * s).toFixed(1)}" width="${(54 * s).toFixed(1)}" height="${(6 * s).toFixed(1)}" rx="${(3 * s).toFixed(1)}" fill="#e0e0dc"/>`;
  g += `<rect x="${(H[0] - 8 * s).toFixed(1)}" y="${(H[1] - 5 * s).toFixed(1)}" width="${(24 * s).toFixed(1)}" height="${(10 * s).toFixed(1)}" rx="${(3 * s).toFixed(1)}" fill="#2a2a2a" transform="rotate(${f > 0 ? 20 : 160},${H[0].toFixed(1)},${H[1].toFixed(1)})"/>`;
  return g; }
function sceneWMD(t) {
  const t0 = S0(12) - .2, T = t - t0, op = ease(ramp(t, WS(12, 1), WS(12, 4))), em = ease(ramp(t, WS(12, 9) - .2, WS(12, 12)));
  let s = `<defs>${SDD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a2622"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  // a big empty warehouse: steel roof trusses, light shafts from high windows
  s += `<path d="M-20,380 L360,300 L740,380 V900 H-20Z" fill="#3a342e"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-20 + i * 152},${380 - (i < 3 ? i : 5 - i) * 27} L${-20 + i * 152},900" stroke="#4a443c" stroke-width="10"/>`).join('') + `<path d="M-20,380 L360,300 L740,380" stroke="#5a544a" stroke-width="12" fill="none"/>`;
  [[120, 440], [360, 400], [600, 440]].forEach(([x, y]) => s += `<rect x="${x - 50}" y="${y}" width="100" height="40" fill="#c8d4e0" opacity=".7"/>` + scr(`<path d="M${x - 50},${y + 40} L${x + 50},${y + 40} L${x + 180},${1100} L${x - 80},${1100}Z" fill="#fff4d8" opacity=".09"/>`));
  s += `<rect x="-20" y="900" width="760" height="410" fill="#5a5248"/><rect x="-20" y="900" width="760" height="410" fill="#000" filter="url(#grainR)" opacity=".22"/>`;
  // crates, lids lifted: empty inside
  const C = [[150, 1060, 160, 110], [380, 1030, 150, 100], [560, 1090, 170, 120], [270, 1180, 170, 120]];
  C.forEach(([x, y, w, h], i) => { s += crate(x, y, w, h); const lk = clamp(op * 2 - i * .3); if (lk > 0) s += `<path d="M${x - w / 2},${y - h} L${x - w / 2 + 14},${y - h - 16} L${x + w / 2 + 14},${y - h - 16} L${x + w / 2},${y - h}Z" fill="#1a1612" opacity="${lk.toFixed(2)}"/><path d="M${x - w / 2 + 6},${y - h} L${x - w / 2 + 18},${y - h - 12}" stroke="#3a2e22" stroke-width="3" opacity="${lk.toFixed(2)}"/><g opacity="${lk.toFixed(2)}" transform="translate(${x + w / 2 + 6},${y}) rotate(-14)"><rect x="0" y="${-h - 10}" width="14" height="${h + 10}" fill="#8a6a46"/><rect x="0" y="${-h - 10}" width="14" height="${h + 10}" fill="#000" filter="url(#grainR)" opacity=".25"/></g>`; });
  // inspectors with torches, the beams search the crates
  s += insp(470, 1250, .7, -1, t) + insp(90, 1230, .66, 1, t, { skin: '#a87050' });
  const bm = (x, y, tx, ty) => scr(`<path d="M${x},${y} L${tx - 50},${ty} L${tx + 50},${ty}Z" fill="#fff8d0" opacity=".14"/>`);
  s += bm(420, 1110, 380 + Math.sin(t * .8) * 60, 960) + bm(140, 1090, 160 + Math.sin(t * .7 + 1) * 50, 980);
  // the report: no stockpiles
  if (em > 0) s += `<g opacity="${em.toFixed(2)}" transform="translate(360,620) rotate(-4)"><rect x="-170" y="-110" width="340" height="220" rx="6" fill="#f4f0e4"/>` + [0, 1, 2, 3].map(i => `<rect x="-140" y="${-60 + i * 26}" width="${280 - i * 30}" height="8" fill="#8a8a8a"/>`).join('') + lbl(0, -74, 'تقرير ٢٠٠٤', 1, '#1a1a1a', 30).replace('stroke="#000"', 'stroke="#f4f0e4"') + `<g transform="rotate(-12)"><rect x="-130" y="30" width="260" height="66" rx="8" fill="none" stroke="#c83a3a" stroke-width="6"/>${lbl(0, 76, 'لا مخزون', 1, '#c83a3a', 40).replace('stroke="#000"', 'stroke="#f4f0e4"')}</g></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 13: how would Iraq be today? Comment, subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(13, 0) - .2, WS(13, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, T = t - (S0(13) - .2);
  const G = gAt(t, 360, 760, { d: lerp(4.2, 4.8, ease(clamp(T / 5))), el: .56, lon: 44 + T * 2, clouds: .35, lights: .4, off: -.7, up: .6 });
  F.ov = `<defs>${SDD()}</defs><path d="${areaD(G, MAND.iq)}" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${(.8 * q).toFixed(2)}"/><g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(13, 10) - .3, WS(13, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}

const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSquare }, { s: S0(2) - .2, f: sceneStreet }, { s: S0(3) - .2, f: sceneRoad }, { s: S0(4) - .2, f: sceneMosul }, { s: S0(5) - .2, f: sceneSanction },
  { s: S0(6) - .2, f: sceneDinar }, { s: S0(7) - .2, f: sceneOil }, { s: S0(8) - .2, f: sceneRoofs }, { s: S0(9) - .2, f: scenePalace }, { s: WS(9, 8) - .3, f: sceneHalab }, { s: S0(10) - .2, f: sceneSpring },
  { s: S0(11) - .2, f: sceneChair }, { s: S0(12) - .2, f: sceneWMD }, { s: S0(13) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneSanction, sceneSpring]);
const XF = .5;
const TLI = [['الحصار', S0(5)], ['الدينار', S0(6)], ['النفط', S0(7)], ['الصحون', S0(8)], ['حلبجة', WS(9, 8)]];
const LIST_ON = new Set([sceneSanction, sceneDinar, sceneOil, sceneRoofs, scenePalace, sceneHalab]);
const CHIPS = [
  ['c0', '٢٠٠٣', 360, 1200, 'big', WS(0, 6), S0(1) - .3],
  ['c1', '٩ أبريل ٢٠٠٣', 360, 330, 'big', WS(1, 0), WS(1, 10) - .1],
  ['c1b', 'في هذا العالم… يبقى واقفاً', 360, 330, 'ice', WS(1, 10), S0(2) - .3],
  ['c2', 'لا حرب', 360, 330, 'big', WS(2, 0), S0(3) - .3],
  ['c3', 'الحربُ وما تلاها', 360, 330, 'red big', WS(3, 0), S0(4) - .3],
  ['c4', 'ربّما… لا فوضى', 360, 330, 'ice', WS(4, 0), WS(4, 9) - .1],
  ['c4b', 'منارةُ الحدباء — الموصل', 360, 330, 'big', WS(4, 9), S0(5) - .3],
  ['c5', 'الوجهُ الآخر', 360, 330, 'ice', WS(5, 0), WS(5, 6) - .1],
  ['c5b', 'الحصار ١٩٩٠ – ٢٠٠٣', 300, 330, 'red big', WS(5, 6), S0(6) - .3],
  ['c6', 'الدينار', 300, 330, 'big', WS(6, 0), S0(7) - .3],
  ['c7', 'ضِعفُ الإنتاج', 300, 330, 'big', WS(7, 9), S0(8) - .3],
  ['c8', 'الصحونُ ممنوعة', 300, 330, 'red big', WS(8, 1), WS(8, 4) - .1],
  ['c8b', 'إنترنت محدود ومراقَب', 300, 330, 'big', WS(8, 4), S0(9) - .3],
  ['c9', 'الحاكمُ نفسُه منذ ١٩٧٩', 300, 330, 'big', WS(9, 0), WS(9, 8) - .4],
  ['c9b', 'حلبجة ١٩٨٨', 300, 330, 'big', WS(9, 8), WS(9, 13) - .1],
  ['c9c', 'نحوُ ٥٠٠٠ قتيل في يوم', 300, 330, 'red big', WS(9, 13), S0(10) - .3],
  ['c10', 'الربيعُ العربيّ ٢٠١١', 360, 330, 'big', WS(10, 0), S0(11) - .3],
  ['c11', 'مَن بعدَه؟', 360, 330, 'ice', WS(11, 7), S0(12) - .3],
  ['c12', 'والغريب؟', 360, 330, 'big', WS(12, 0), WS(12, 1) + .6],
  ['c12b', 'أسلحةُ الدمار الشامل', 360, 330, 'big', WS(12, 1) + .6, WS(12, 9) - .1],
  ['c12c', 'لم يُعثَر عليها', 360, 330, 'red big', WS(12, 9), S0(13) - .3],
  ['c13', '@MadhaLawLab', 360, 1200, 'dark', WS(13, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:300px"><div class="hd">الوجهُ الآخر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
