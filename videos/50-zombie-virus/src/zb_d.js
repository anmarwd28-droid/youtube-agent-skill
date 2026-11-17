// zb_d.js: the twist (rabies patients fear water), hiding far away, the vaccine since 1885

// ---------- 8: a rabies patient fears water and cannot drink it, so a zombie like him lives only a few days ----------
function fountain(x, y, t, burst) {   // a stone drinking fountain on the square; burst = the jet jumps up
  const rw = 150, jh = 70 + 60 * burst;
  let s = `<ellipse cx="${x}" cy="${y + 6}" rx="${rw + 30}" ry="22" fill="#000" opacity=".28" filter="url(#blur5)"/>` +
    `<path d="M${x - rw},${y - 60} L${x - rw + 8},${y} L${x + rw - 8},${y} L${x + rw},${y - 60}Z" fill="#b8ae9c"/><path d="M${x - rw},${y - 60} L${x - rw + 8},${y} L${x + rw - 8},${y} L${x + rw},${y - 60}Z" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    `<path d="M${x + rw * .3},${y - 60} L${x + rw * .32},${y} L${x + rw - 8},${y} L${x + rw},${y - 60}Z" fill="#000" opacity=".14"/>` +
    `<ellipse cx="${x}" cy="${y - 60}" rx="${rw}" ry="26" fill="#cfc6b2"/><ellipse cx="${x}" cy="${y - 58}" rx="${rw - 14}" ry="18" fill="#4a6a7a"/><ellipse cx="${x}" cy="${y - 58}" rx="${rw - 14}" ry="18" fill="url(#sunW)" opacity=".25"/>`;
  for (let i = 0; i < 4; i++) { const p = pmod(t * .8 + i / 4, 1); s += `<ellipse cx="${x}" cy="${y - 58}" rx="${(10 + 110 * p).toFixed(1)}" ry="${(3 + 13 * p).toFixed(1)}" fill="none" stroke="#e8f4ff" stroke-width="1.6" opacity="${(.6 * (1 - p)).toFixed(2)}"/>`; }
  // the column and the spout
  s += `<rect x="${x - 16}" y="${y - 190}" width="32" height="136" fill="#bfb6a2"/><rect x="${x - 16}" y="${y - 190}" width="10" height="136" fill="#fff" opacity=".18"/><rect x="${x + 6}" y="${y - 190}" width="10" height="136" fill="#000" opacity=".16"/><rect x="${x - 24}" y="${y - 200}" width="48" height="14" rx="3" fill="#d2c8b4"/><path d="M${x - 12},${y - 176} l-24,4 l0,8 l24,-2Z" fill="#8a8a8a"/>`;
  // the jet: a falling arc of water, with drops; it jumps when burst
  const sx = x - 36, sy = y - 170, ex = sx - 46 - 40 * burst, ey = y - 62, cy = sy - jh;
  s += `<path d="M${sx},${sy} Q${(sx - 20 - 20 * burst).toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey}" stroke="#d8f0ff" stroke-width="${(5 + 3 * burst).toFixed(1)}" fill="none" opacity=".85" stroke-linecap="round"/><path d="M${sx},${sy} Q${(sx - 20 - 20 * burst).toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey}" stroke="#fff" stroke-width="1.6" fill="none" opacity=".9"/>`;
  const r = RS(41); for (let i = 0; i < 10 + 26 * burst; i++) { const p = pmod(t * 1.6 + r(), 1), dx = -(r() - .3) * (60 + 140 * burst), px = ex + dx * p, py = ey - (30 + 90 * burst) * Math.sin(p * Math.PI) * r(); s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1.6 + r() * 2.4).toFixed(1)}" fill="#e8f6ff" opacity="${(.8 * (1 - p)).toFixed(2)}"/>`; }
  return s;
}
function sceneWater(t) {
  const T = t - S0(8) + .2, tf = WS(8, 3), ti = WS(8, 6), tw = WS(8, 11), td = WS(8, 14);
  const walk = ease(ramp(t, S0(8) - .2, tf)), fear = ease(ramp(t, tf - .1, tf + .35)), thr = ease(ramp(t, ti - .2, ti + .3)), slump = ease(ramp(t, td - .2, td + .7));
  const y0 = PV + 104, zx = lerp(150, 290, walk) - 40 * fear, s8 = 1.08;
  let top = fountain(540, PV + 96, t, ease(ramp(t, tf - .25, tf + .1)) * (1 - .6 * thr));
  let z;
  if (slump > .02) {   // sits down against the fountain, head low, then slumps further
    z = zombie(zx, y0, s8, 1, 2, t, { still: 1, lean: lerp(-14, 16, slump), look: -.55, h: { lF: [lerp(.1, 2.0, slump), lerp(.06, .45, slump)], lB: [lerp(-.1, 1.85, slump), lerp(-.14, .32, slump)], hF: null, hB: null, aF: [lerp(.2, .9, slump), lerp(.4, 1.5, slump)], aB: [lerp(.1, .8, slump), lerp(.3, 1.4, slump)] }, reach: 0 });
  } else if (fear > .02) {   // recoils: steps back, raises an arm against the spray, a hand at the throat
    const H = [zx + 40 * s8, y0 - 216 * s8];
    z = zombie(zx, y0, s8, 1, 2, t, { still: 1, lean: -14 * fear, look: lerp(-.2, .25, fear) - .5 * thr, h: { hF: [lerp(zx + 96 * s8, zx + 54 * s8, fear), lerp(y0 - 222 * s8, y0 - 250 * s8, fear) + 40 * thr], hB: [lerp(zx + 84 * s8, H[0] - 16 * s8, thr), lerp(y0 - 210 * s8, H[1] + 10 * s8, thr)] } });
  } else z = zombie(zx, y0, s8, 1, 2, t, {});
  top += z;
  // three days with no water: the counter
  const ca = ease(ramp(t, tw - .2, tw + .3)), days = clamp((t - tw) / (TOTAL)) ; const nd = t < tw + .7 ? 1 : t < tw + 1.4 ? 2 : 3;
  let cnt = `<g opacity="${ca.toFixed(2)}">${panel(170, 410, 380, 120, 1)}`;
  for (let i = 0; i < 3; i++) { const on = i < nd, cx = 470 - i * 110; cnt += `<circle cx="${cx}" cy="460" r="22" fill="${on ? '#f4c76b' : '#3a4256'}"/>` + (on ? Array.from({ length: 8 }, (_, q) => { const a = q / 8 * 6.28; return `<path d="M${(cx + Math.cos(a) * 28).toFixed(1)},${(460 + Math.sin(a) * 28).toFixed(1)} L${(cx + Math.cos(a) * 36).toFixed(1)},${(460 + Math.sin(a) * 36).toFixed(1)}" stroke="#f4c76b" stroke-width="3"/>`; }).join('') : '') + lbl(cx, 516, 'يوم ' + AR(i + 1), 1, on ? '#fff' : '#7a86a0', 22); }
  cnt += `</g>`;
  const sky2 = `<circle cx="600" cy="440" r="80" fill="url(#sunW)" opacity=".3"/>`;
  let s = `<defs>${ZDEFS()}</defs>` + street10(t, { N: .12, id: 'wt', cars: 0, overcast: 1, sky: ['#7a8a96', '#b4bcb8', '#d8d2c0'], sky2, litB: [0, 0, 0, 0, 0], litS: [0, 0, 0, 0, 0], lampK: 0, top }) + cnt;
  noEarth(); F.ov = ''; return s;
}

// ---------- 9: whoever hides far away may watch the wave burn itself out ----------
function sceneHide(t) {
  const T = t - S0(9) + .2, hz = 760, fade = ease(ramp(t, WS(9, 8) - .2, WS(9, 9) + .6)), dawn = ease(ramp(t, S0(9) - .2, TOTAL));
  let s = `<defs>${LDEFS()}${ZDEFS()}<linearGradient id="dwS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6a9a"/><stop offset=".6" stop-color="#e8b48a"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dwS)"/>`;
  s += `<circle cx="180" cy="${hz - 60 - 20 * dawn}" r="260" fill="url(#sunW)"/>` + sun3(180, hz - 60 - 20 * dawn, 1, '#fff0c8') + cumulus(420 + T * 5, 480, 240, 151, { a: .7 }) + cumulus(640 + T * 4, 560, 170, 152, { a: .6 });
  s += mountainsR(hz - 40, 170, 561, { rock: '#8a8090', haze: .55, hazeCol: '#f2d0b0', snowAt: .55 }) + `<rect x="-20" y="${hz - 60}" width="760" height="80" fill="#b49a92"/>` + mountainsR(hz + 10, 90, 563, { rock: '#6a7a58', haze: .4, hazeCol: '#eccaa4' }) + `<rect x="-20" y="${hz}" width="760" height="60" fill="#7a8a5a"/>`;
  // the valley below, full of the green haze that thins out and is gone
  s += `<rect x="-20" y="${hz + 30}" width="760" height="200" fill="#6a7a5a"/>` + forestR(hz + 40, 30, 20, 44, 23, '#3a5a34', { haze: .35, hazeCol: '#e8c8a0', dy: 60 });
  s += zfogBand(hz - 10, 240, t, 1 - fade) + zfogBand(hz + 40, 200, t + 7, 1 - fade) + `<rect x="-20" y="${hz + 20}" width="760" height="180" fill="#8ad06a" opacity="${(.55 * (1 - fade)).toFixed(2)}" filter="url(#blur12)"/>` + Array.from({ length: 9 }, (_, i) => { const r = RS(i + 900), x = pmod(r() * 760 + t * 6, 800) - 40, y = hz + 40 + r() * 140; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(80 + r() * 90).toFixed(1)}" ry="${(20 + r() * 16).toFixed(1)}" fill="#b8f08a" opacity="${((.35 + .2 * r()) * (1 - fade)).toFixed(2)}" filter="url(#blur9)"/>`; }).join('');
  // our ridge with the cabin and the family on its porch
  const ridge = `M-20,1300 L-20,${hz + 300} C120,${hz + 250} 260,${hz + 240} 400,${hz + 200} C520,${hz + 170} 640,${hz + 180} 740,${hz + 150} L740,1300Z`;
  s += `<defs><clipPath id="hdC"><path d="${ridge}"/></clipPath></defs><path d="${ridge}" fill="#5a7038"/><g clip-path="url(#hdC)">` + meadow(hz + 140, 1300, t, { c0: '#8aa04c', c1: '#44602a' }) + `</g>`;
  s += forestR(hz + 150, 7, 70, 130, 27, '#2e4e26', { x0: 560, x1: 740, dy: 30 }) + cottage(470, 1080, 1.5, '#a88a68', '#5a3a2e', 11, { smoke: 1, t, lit: .8 });
  [[330, 1150, .5, -1, 3], [280, 1160, .54, -1, 6], [240, 1168, .36, -1, 9]].forEach(([x, y, sc, f, pi]) => { s += man(x, y, sc, f, pi, { lookUp: .05 }); });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#ffd8a0" opacity="${(.08 * fade).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: the rabies vaccine exists since 1885: science got there before the zombies ----------
function microscopeOld(x, y, s) {   // a brass microscope of the 1880s
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="90" ry="12" fill="#000" opacity=".35" filter="url(#blur5)"/>` +
    `<path d="M-70,0 Q-80,-20 -40,-24 L40,-24 Q80,-20 70,0Z" fill="url(#brassG)"/><path d="M-60,-6 L60,-6" stroke="#fff4c0" stroke-width="2" opacity=".4"/>` +
    `<rect x="-10" y="-120" width="20" height="98" fill="url(#brassG)"/><rect x="-56" y="-118" width="92" height="10" rx="3" fill="#3a2a1a"/>` +
    `<circle cx="-14" cy="-70" r="16" fill="#d8dce4" stroke="url(#brassG)" stroke-width="5"/><path d="M-26,-76 l20,-6" stroke="#fff" stroke-width="2" opacity=".6"/>` +
    `<path d="M4,-118 C40,-150 46,-200 20,-236" stroke="url(#brassG)" stroke-width="18" fill="none"/>` +
    `<g transform="rotate(-18,10,-180)"><rect x="-6" y="-300" width="30" height="170" rx="4" fill="url(#brassG)"/><rect x="-10" y="-312" width="38" height="18" rx="4" fill="#3a2a1a"/><rect x="0" y="-140" width="18" height="24" fill="#8a7a5a"/><path d="M0,-290 V-150" stroke="#fff4c0" stroke-width="3" opacity=".45"/></g></g>`;
}
function flask(x, y, s, liq, col) {
  const d = `M-12,-110 L-12,-60 L-52,0 Q-56,8 -46,8 L46,8 Q56,8 52,0 L12,-60 L12,-110Z`, ly = lerp(4, -60, liq);
  return `<g transform="translate(${x},${y}) scale(${s})"><defs><clipPath id="fk${x}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="#dfeaf0" opacity=".25"/><g clip-path="url(#fk${x})"><rect x="-60" y="${ly}" width="120" height="80" fill="${col}" opacity=".8"/><rect x="-60" y="${ly}" width="120" height="4" fill="#fff" opacity=".5"/></g><path d="${d}" fill="none" stroke="#e8f2f8" stroke-width="2.4" opacity=".8"/><path d="M-8,-100 L-8,-62 L-40,-8" stroke="#fff" stroke-width="3" opacity=".5" fill="none"/><rect x="-16" y="-116" width="32" height="8" rx="3" fill="#e8f2f8" opacity=".7"/></g>`;
}
function vialSyringe(x, y, s, a) {
  if (a <= 0) return '';
  let v = `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) scale(${s})"><ellipse cx="40" cy="8" rx="190" ry="16" fill="#000" opacity=".35" filter="url(#blur5)"/>`;
  // the vial
  v += `<rect x="-130" y="-150" width="90" height="156" rx="12" fill="#e8f2fa" opacity=".35"/><rect x="-126" y="-90" width="82" height="92" rx="8" fill="#f2e2b0" opacity=".85"/><rect x="-130" y="-110" width="90" height="60" fill="#fff"/><rect x="-130" y="-110" width="90" height="12" fill="#c0392b"/>` + `<text x="-85" y="-72" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#2a2a2a">لقاح</text>` +
    `<rect x="-118" y="-178" width="66" height="30" rx="4" fill="#b8bec8"/><rect x="-118" y="-178" width="66" height="8" fill="#fff" opacity=".4"/><rect x="-112" y="-150" width="54" height="8" fill="#6a7080"/><rect x="-122" y="-146" width="8" height="140" fill="#fff" opacity=".5"/>`;
  // the syringe, lying across
  v += `<g transform="translate(60,-30) rotate(-14)"><rect x="-70" y="-16" width="170" height="32" rx="6" fill="#eef6fc" opacity=".55"/><rect x="-60" y="-12" width="110" height="24" fill="#f2e2b0" opacity=".8"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${-60 + i * 15},-16 v${i % 2 ? 8 : 12}" stroke="#4a5a6a" stroke-width="1.5"/>`).join('') +
    `<rect x="-120" y="-6" width="52" height="12" fill="#c8ccd4"/><rect x="-132" y="-22" width="14" height="44" rx="3" fill="#c8ccd4"/><rect x="-72" y="-22" width="8" height="44" rx="2" fill="#dfe4ec"/><rect x="100" y="-6" width="18" height="12" fill="#c8ccd4"/><path d="M118,0 L210,0" stroke="#d8dce4" stroke-width="3"/><path d="M118,-1 L210,-1" stroke="#fff" stroke-width="1"/><path d="M-66,-12 L96,-12" stroke="#fff" stroke-width="3" opacity=".7"/></g></g>`;
  return v;
}
function sceneVaccine(t) {
  const T = t - S0(10) + .2, ya = ease(ramp(t, WS(10, 3) - .2, WS(10, 4) + .3)), md = ease(ramp(t, WS(10, 9) - .3, WS(10, 9) + .4)), zg = ease(ramp(t, WS(10, 11) - .2, WS(10, 11) + .5));
  let s = `<defs>${ZDEFS()}${DEFN()}<linearGradient id="brassG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a1a"/><stop offset=".45" stop-color="#e8c060"/><stop offset=".7" stop-color="#b08830"/><stop offset="1" stop-color="#5a3c14"/></linearGradient><linearGradient id="panW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3222"/><stop offset="1" stop-color="#2a1c12"/></linearGradient><radialGradient id="vxG"><stop offset="0" stop-color="#bfe8ff" stop-opacity=".55"/><stop offset="1" stop-color="#8ac8ff" stop-opacity="0"/></radialGradient></defs>`;
  // an old laboratory: panelled wall, a window, a shelf of bottles, the bench
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#panW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".3"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${-10 + i * 128}" y="760" width="110" height="220" fill="#3a2618" stroke="#5a3c26" stroke-width="3"/>`).join('');
  s += `<rect x="420" y="380" width="230" height="300" fill="#a8c4d8"/><rect x="420" y="380" width="230" height="300" fill="url(#sunW)" opacity=".5"/><path d="M535,380 V680 M420,530 H650" stroke="#3a2618" stroke-width="10"/><rect x="410" y="370" width="250" height="320" fill="none" stroke="#5a3c26" stroke-width="12"/>` +
    scr(`<path d="M420,680 L650,680 L560,1000 L250,1000Z" fill="#ffe8b0" opacity=".12"/>`);
  s += `<rect x="40" y="520" width="320" height="14" fill="#5a3c26"/>` + [[70, '#7a3a2a', 60], [110, '#2a5a3a', 70], [150, '#c8b070', 50], [190, '#3a4a7a', 64], [236, '#8a8a8a', 56], [280, '#6a2a2a', 72], [320, '#2a6a6a', 50]].map(([bx, c, h]) => `<rect x="${bx}" y="${520 - h}" width="28" height="${h}" rx="5" fill="${c}"/><rect x="${bx + 8}" y="${510 - h}" width="12" height="12" fill="#3a2a1a"/><rect x="${bx + 4}" y="${526 - h}" width="5" height="${h - 14}" fill="#fff" opacity=".3"/><rect x="${bx + 3}" y="${520 - h * .6}" width="22" height="16" fill="#e8dcc0"/>`).join('');
  s += `<rect x="-20" y="980" width="760" height="40" fill="#6a4628"/><rect x="-20" y="980" width="760" height="6" fill="#fff" opacity=".18"/><rect x="-20" y="1020" width="760" height="280" fill="#3a2618"/><rect x="-20" y="1020" width="760" height="280" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  s += microscopeOld(180, 984, 1.15) + flask(420, 984, .9, .5, '#c86a4a') + flask(530, 984, .7, .35, '#6aa86a') + `<path d="M590,984 l60,-8 l8,8 l-60,8Z" fill="#e8dcc0"/><path d="M600,980 l44,-6" stroke="#5a4a3a" stroke-width="1.5"/>` +
    `<rect x="642" y="900" width="14" height="80" fill="#f2ead8"/><path d="M649,900 q-6,-14 0,-26 q6,12 0,26Z" fill="#ffb84a"/>` + scr(`<circle cx="649" cy="884" r="60" fill="url(#lampW)" opacity=".7"/>`);
  // the year
  s += `<g opacity="${(ya * (1 - .7 * md)).toFixed(2)}">${panel(190, 600, 340, 140, 1)}<text x="360" y="700" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="96" fill="#f4c76b" style="filter:drop-shadow(0 4px 10px rgba(0,0,0,.7))">${AR(1885)}</text></g>`;
  // today: the vaccine and the syringe, front and centre
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0e18" opacity="${(.45 * md).toFixed(2)}"/>` + `<circle cx="340" cy="1060" r="${(260 * md).toFixed(1)}" fill="url(#vxG)" opacity="${md.toFixed(2)}"/>` + vialSyringe(330, 1170, 1.25, md) + sparkles(340, 1050, 420, 260, 22, t, md * zg, 5);
  noEarth(); F.ov = ''; return s;
}
