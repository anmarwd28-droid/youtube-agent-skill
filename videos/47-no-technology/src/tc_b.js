// ---------- 5: half of us eat thanks to factory-made fertiliser; the plant and the tractor stand still ----------
function tractor(x, y, s) {   // side view facing right; (x, y) = ground under the rear wheel
  const tyre = (cx, cy, R) => `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#1e1e22"/>` + Array.from({ length: 18 }, (_, i) => { const a = i / 18 * 6.2832; return `<path d="M${(cx + Math.cos(a) * (R - 2)).toFixed(1)},${(cy + Math.sin(a) * (R - 2)).toFixed(1)} L${(cx + Math.cos(a + .12) * (R + 4)).toFixed(1)},${(cy + Math.sin(a + .12) * (R + 4)).toFixed(1)}" stroke="#141418" stroke-width="7"/>`; }).join('') +
    `<circle cx="${cx}" cy="${cy}" r="${R * .58}" fill="#d8a82a"/><circle cx="${cx}" cy="${cy}" r="${R * .58}" fill="url(#frG)"/><circle cx="${cx}" cy="${cy}" r="${R * .18}" fill="#8a6a1a"/>` + [0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * 6.2832; return `<circle cx="${(cx + Math.cos(a) * R * .36).toFixed(1)}" cy="${(cy + Math.sin(a) * R * .36).toFixed(1)}" r="3" fill="#6a5010"/>`; }).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="80" cy="4" rx="190" ry="12" fill="#000" opacity=".3" filter="url(#blur5)"/>` +
    `<path d="M40,-120 L250,-120 Q268,-118 268,-100 L268,-62 L40,-62Z" fill="#2f7a3a"/><path d="M40,-120 L250,-120 Q268,-118 268,-100 L268,-108 L40,-108Z" fill="#fff" opacity=".2"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${200 + i * 10},-110 v36" stroke="#1a4a22" stroke-width="3"/>`).join('') +
    `<rect x="-30" y="-150" width="90" height="100" fill="#2a6a32"/><path d="M-38,-250 L72,-250 L66,-150 L-30,-150Z" fill="#9ab8c8" opacity=".55"/><path d="M-38,-250 L72,-250 L66,-150 L-30,-150Z" fill="none" stroke="#1e2a20" stroke-width="7"/><path d="M-44,-258 H80 V-248 H-44Z" fill="#2f7a3a"/>` +
    `<path d="M-30,-250 L10,-250 L-28,-170Z" fill="#fff" opacity=".22"/><path d="M150,-120 V-190" stroke="#3a3a40" stroke-width="9"/><path d="M146,-190 h8 v-10 h-8Z" fill="#2a2a30"/>` +
    `<path d="M-30,-60 L270,-60" stroke="#1e2420" stroke-width="10"/>` + tyre(0, -78, 78) + tyre(214, -42, 42) + `<path d="M-84,-108 A88,88 0 0 1 84,-108" stroke="#2f7a3a" stroke-width="16" fill="none"/></g>`;
}
function wheatField(t, HZ, ripe, seed) {   // rows of wheat in perspective down to the bottom of the screen
  let s = `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="${mix('#9aa84a', '#c8a85a', ripe)}"/><rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  const r = RS(seed);
  for (let row = 0; row < 26; row++) { const z = Math.pow(row / 25, 1.8), y = HZ + 8 + z * (1300 - HZ), h = 8 + 70 * z, n = Math.round(60 - 30 * z), sw = Math.sin(t * 1.4 + row * .5) * 3 * (.4 + z);
    let p = '', e = '';
    for (let i = 0; i < n; i++) { const x = (i + r() * .8) * 780 / n - 30, hh = h * (.8 + .35 * r()), lx = x + sw + (r() - .5) * 4;
      p += `M${x.toFixed(1)},${y.toFixed(1)} Q${(x + sw * .3).toFixed(1)},${(y - hh * .5).toFixed(1)} ${lx.toFixed(1)},${(y - hh).toFixed(1)} `;
      e += `<ellipse cx="${lx.toFixed(1)}" cy="${(y - hh - h * .1).toFixed(1)}" rx="${(1.2 + 2.4 * z).toFixed(1)}" ry="${(3 + 9 * z).toFixed(1)}" fill="${mix('#c8c060', '#e8c46a', ripe)}" transform="rotate(${(sw * 3).toFixed(1)},${lx.toFixed(1)},${(y - hh).toFixed(1)})"/>`; }
    s += `<path d="${p}" stroke="${mix('#7a8a3a', '#a88a3a', ripe)}" stroke-width="${(.6 + 1.6 * z).toFixed(1)}" fill="none"/>` + e;
    if (row % 3 === 0) s += `<rect x="-20" y="${(y - h * .3).toFixed(1)}" width="760" height="${(h * .3).toFixed(1)}" fill="#000" opacity=".06"/>`; }
  return s;
}
function fertPlant(x0, base, sc) {   // a fertiliser plant on the horizon: prilling tower, tanks, a hall, a cold stack
  let s = `<g transform="translate(${x0},${base}) scale(${sc})">`;
  s += `<rect x="0" y="-300" width="58" height="300" fill="#c8c4bc"/><rect x="0" y="-300" width="18" height="300" fill="#000" opacity=".12"/><rect x="-6" y="-316" width="70" height="20" fill="#9a968e"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M0,${-280 + i * 36} h58" stroke="#8a867e" stroke-width="2"/>`).join('');
  s += `<path d="M90,-240 L104,-240 L112,0 L82,0Z" fill="#a8a49c"/><path d="M90,-240 L104,-240 L104,-224 L90,-224Z" fill="#c8382e"/><path d="M90,-200 L104,-200 L105,-186 L89,-186Z" fill="#f2f2ee"/>`;
  [[150, 60], [230, 56], [304, 50]].forEach(([x, r]) => { s += `<path d="M${x - r},0 L${x - r},-${r * 1.1} A${r},${r * .34} 0 0 1 ${x + r},-${r * 1.1} L${x + r},0Z" fill="#e2dfd8"/><path d="M${x - r},0 L${x - r},-${r * 1.1} A${r},${r * .34} 0 0 1 ${x - r * .3},-${r * 1.4} L${x - r * .3},0Z" fill="#000" opacity=".1"/>` + [1, 2].map(q => `<path d="M${x - r},-${(r * .36 * q).toFixed(1)} h${2 * r}" stroke="#b8b4ac" stroke-width="2"/>`).join(''); });
  s += `<rect x="-60" y="-110" width="64" height="110" fill="#8a8e96"/><path d="M-60,-110 L-28,-140 L4,-110Z" fill="#6a6e76"/><path d="M58,-150 H140 M58,-130 H300" stroke="#7a7e86" stroke-width="7"/>`;
  return s + `</g>`;
}
function iconsHalf(t, a, x0, y0) {   // ten people, five of them lit gold: fed by factory fertiliser
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}">` + panel(x0, y0, 640, 190, 1);
  for (let i = 0; i < 10; i++) { const on = i < 5, k = ease(ramp(t, WS(5, 2) + i * .06, WS(5, 2) + i * .06 + .3)); s += icon(x0 + 610 - i * 62, y0 + 92, 1.15, on ? mix('#5a6270', '#f4c76b', k) : '#5a6270', 1, on ? mix('#6a7280', '#ffe0a0', k) : '#6a7280'); }
  s += lbl(x0 + 474, y0 + 168, 'نحوُ ٤ مليارات إنسان', ease(ramp(t, WS(5, 3), WS(5, 4))), '#f4c76b', 28) + lbl(x0 + 164, y0 + 168, '٨٫٢ مليار', 1, '#aab4c4', 24) + `</g>`;
  return s;
}
function sceneFarm(t) {
  const t0 = S0(5) - .2, T = t - t0, HZ = 760;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#goldS)"/>` + sun3(150, 520, .95) + cumulus(380 + T * 4, 470, 260, 101, { a: .85 }) + cumulus(640 + T * 3, 560, 180, 103, { a: .7 });
  s += fertPlant(400, HZ - 4, .62) + `<text x="${400 + 40 * .62}" y="${HZ - 214}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#5a5a60" opacity=".85">مصنعُ أسمدة</text>`;
  s += mountainsR(HZ, 30, 77, { rock: '#8a9a6a', haze: .55, hazeCol: '#e8dcc0' }) + `<rect x="-20" y="${HZ - 6}" width="760" height="20" fill="#9aa860"/>` + forestR(HZ + 4, 14, 18, 40, 5, '#5a7a3a', { haze: .4, hazeCol: '#e8dcc0' });
  s += `<rect x="-20" y="${HZ - 40}" width="760" height="60" fill="#f4e4c0" opacity=".35" filter="url(#blur9)"/>`;
  s += wheatField(t, HZ + 6, .8, 37);
  // a dirt track and the tractor that stopped on it
  s += `<path d="M-20,958 Q360,946 740,962 L740,1012 Q360,1000 -20,1010Z" fill="#a88a5a"/><path d="M-20,958 Q360,946 740,962 L740,1012 Q360,1000 -20,1010Z" fill="#000" filter="url(#grainR)" opacity=".3"/><path d="M-20,972 Q360,962 740,976 M-20,996 Q360,986 740,1000" stroke="#7a5e3a" stroke-width="3" fill="none" opacity=".6"/>`;
  s += tractor(250, 1000, .74) + wheatField(t, 1012, .8, 39).replace(/<rect[^>]*\/><rect[^>]*\/>/, '');
  s += iconsHalf(t, ease(ramp(t, WS(5, 1) - .1, WS(5, 1) + .3)), 40, 1080);
  noEarth(); F.ov = ''; return s;
}

// ---------- 6: hospitals with no machines and no new medicines ----------
function sceneHosp(t) {
  const t0 = S0(6) - .2, T = t - t0, off = flick(t, WS(6, 2)), dim = ease(ramp(t, WS(6, 2), WS(6, 2) + .6)), FL = 1040;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#cfe0d6"/><rect x="-20" y="-20" width="760" height="${FL + 20}" fill="#fff" filter="url(#wallI)" opacity=".2"/><rect x="-20" y="${FL - 90}" width="760" height="90" fill="#a8c4b6"/><rect x="-20" y="${FL - 92}" width="760" height="6" fill="#8aa898"/>`;
  // the window (overcast) and the dead ceiling light
  s += `<rect x="420" y="380" width="250" height="300" fill="#e8ece8"/><rect x="432" y="392" width="226" height="276" fill="url(#grayS)"/>` + `<g transform="translate(432,392) scale(.31)">${farCity(57, 860, '#8a929c')}</g><path d="M545,392 V668 M432,530 H658" stroke="#e8ece8" stroke-width="9"/>`;
  s += `<rect x="150" y="300" width="220" height="18" rx="4" fill="${mix('#fffbe8', '#c8ccc8', dim)}"/>` + (off > .02 ? scr(`<ellipse cx="260" cy="330" rx="260" ry="80" fill="#fff8e0" opacity="${(.4 * off).toFixed(2)}" filter="url(#soft)"/>`) : '');
  // the medicine cabinet on the wall: only a few boxes left
  s += `<rect x="40" y="420" width="250" height="220" rx="6" fill="#f2f2ee"/><rect x="52" y="432" width="226" height="196" fill="#dfe6e2"/><path d="M165,432 v196" stroke="#c8d0cc" stroke-width="4"/><rect x="40" y="530" width="250" height="6" fill="#c8d0cc"/>` +
    `<g transform="translate(90,526) scale(.75)">${medItem(0)}</g><g transform="translate(230,626) scale(.75)">${medItem(5)}</g><path d="M200,452 l30,0 l0,10Z" fill="#c8382e" opacity=".0"/>`;
  s += `<rect x="40" y="420" width="250" height="220" rx="6" fill="none" stroke="#b8c0bc" stroke-width="4"/><path d="M58,438 L120,438 L58,520Z" fill="#fff" opacity=".35"/>`;
  // floor
  s += `<rect x="-20" y="${FL}" width="760" height="${1300 - FL}" fill="#d8d4c8"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M-20,${FL + Math.pow(i / 8, 1.6) * 260} H740" stroke="#bab4a6" stroke-width="2"/>`).join('') + `<rect x="-20" y="${FL}" width="760" height="40" fill="url(#aoDn)" opacity=".6"/>`;
  // the bed with a patient
  const bx = 70, by = 980;
  s += `<ellipse cx="${bx + 230}" cy="${by + 128}" rx="260" ry="16" fill="#000" opacity=".25" filter="url(#blur5)"/><path d="M${bx},${by + 120} V${by - 40} M${bx + 460},${by + 120} V${by - 10}" stroke="#9aa4ae" stroke-width="10"/><rect x="${bx}" y="${by - 10}" width="460" height="40" rx="6" fill="#b8c2cc"/>` +
    `<rect x="${bx + 10}" y="${by - 40}" width="440" height="34" rx="12" fill="#f6f6f2"/><ellipse cx="${bx + 70}" cy="${by - 50}" rx="62" ry="22" fill="#fbfbf8"/><ellipse cx="${bx + 70}" cy="${by - 46}" rx="58" ry="12" fill="#000" opacity=".06"/>` +
    `<ellipse cx="${bx + 86}" cy="${by - 68}" rx="26" ry="22" fill="#b98262"/><path d="M${bx + 62},${by - 74} q4,-24 30,-20 q16,4 18,14 q-18,-6 -48,6Z" fill="#2a1e18"/><ellipse cx="${bx + 104}" cy="${by - 66}" rx="3" ry="2" fill="#2a1e18"/>` +
    `<path d="M${bx + 110},${by - 40} C${bx + 160},${by - 80} ${bx + 300},${by - 76} ${bx + 360},${by - 50} C${bx + 400},${by - 40} ${bx + 430},${by - 54} ${bx + 446},${by - 40}Z" fill="#7aa8c8"/><path d="M${bx + 110},${by - 40} C${bx + 160},${by - 80} ${bx + 300},${by - 76} ${bx + 360},${by - 50}" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/>` +
    `<path d="M${bx + 120},${by - 46} h40" stroke="#5a7a98" stroke-width="3" opacity=".5"/>` + [0, 1].map(i => `<circle cx="${bx + 60 + i * 340}" cy="${by + 124}" r="10" fill="#3a3e44"/>`).join('');
  // the monitor: a heartbeat trace that goes dark
  const mx = 530, my = 640;
  s += `<path d="M${mx + 60},${my + 120} V${FL + 30}" stroke="#8a929c" stroke-width="8"/><path d="M${mx + 20},${FL + 30} h80" stroke="#5a626c" stroke-width="8" stroke-linecap="round"/><rect x="${mx}" y="${my}" width="130" height="110" rx="8" fill="#3a3e46"/><rect x="${mx + 8}" y="${my + 8}" width="114" height="80" fill="#0a0e10"/>`;
  if (off > .02) { let p = ''; for (let i = 0; i <= 56; i++) { const u = i / 56, ph = pmod(u * 2 - T * .8, 1), yb = ph > .4 && ph < .45 ? -26 : ph > .45 && ph < .5 ? 16 : 0; p += (i ? ' L' : 'M') + (mx + 12 + u * 106).toFixed(1) + ',' + (my + 50 + yb).toFixed(1); }
    s += `<g opacity="${off.toFixed(2)}"><path d="${p}" stroke="#3aff8a" stroke-width="2.5" fill="none"/><text x="${mx + 112}" y="${my + 30}" text-anchor="end" font-family="Inter" font-weight="700" font-size="18" fill="#3aff8a">72</text></g>` + scr(`<rect x="${mx - 20}" y="${my - 20}" width="170" height="130" fill="#3aff8a" opacity="${(.12 * off).toFixed(2)}" filter="url(#blur9)"/>`); }
  s += `<path d="M${mx + 8},${my + 88} L${mx + 70},${my + 8} L${mx + 100},${my + 8} L${mx + 38},${my + 88}Z" fill="#fff" opacity=".05"/>` + [0, 1, 2].map(i => `<circle cx="${mx + 20 + i * 16}" cy="${my + 99}" r="4" fill="#6a707a"/>`).join('');
  // the drip stand
  s += `<path d="M640,${FL + 40} V560 M624,560 h32" stroke="#a8b0b8" stroke-width="5"/><rect x="628" y="568" width="26" height="44" rx="6" fill="#d8ecf4" opacity=".85"/><path d="M641,612 C641,700 560,720 ${bx + 400},${by - 52}" stroke="#d8e4ec" stroke-width="2" fill="none"/>`;
  // a nurse with an oil lamp
  const nx = 600, ny = 1210;
  s += hero(nx, ny, Object.assign({ s: .95, face: -1, shade: 1, lookUp: -.05, hF: [nx - 60, ny - 196], hB: [nx - 20, ny - 120] }, { top: '#4aa89a', pants: '#3a8a7e', skin: '#8a5a3a', hair: '#14100c' }));
  const L = HP.hand.slice(), lg = ease(ramp(t, WS(6, 2) + .2, WS(6, 3) + .4));
  s += `<g transform="translate(${L[0].toFixed(1)},${(L[1] + 8).toFixed(1)}) scale(1.6)"><path d="M0,0 v8" stroke="#3a3a40" stroke-width="2"/><path d="M-14,10 h28 v6 h-28Z" fill="#3a3a40"/><path d="M-11,16 C-14,40 14,40 11,16Z" fill="#e8d8b0" opacity=".55"/><path d="M-3,34 q3,-14 6,0 q-3,6 -6,0Z" fill="#ffd27a" opacity="${lg.toFixed(2)}"/><path d="M-16,40 h32 v10 h-32Z" fill="#5a4a2a"/></g>`;
  // the room dims when the light dies; the lamp gives a warm pool
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#18203a" opacity="${(.35 * dim).toFixed(2)}" style="mix-blend-mode:multiply"/>` + (lg > .02 ? scr(`<circle cx="${L[0].toFixed(1)}" cy="${(L[1] + 30).toFixed(1)}" r="340" fill="url(#lampW)" opacity="${lg.toFixed(2)}"/><ellipse cx="${(L[0] - 60).toFixed(1)}" cy="1180" rx="260" ry="50" fill="#ffc870" opacity="${(.22 * lg).toFixed(2)}" filter="url(#blur9)"/><ellipse cx="300" cy="930" rx="220" ry="40" fill="#ffc870" opacity="${(.12 * lg).toFixed(2)}" filter="url(#blur9)"/><circle cx="${L[0].toFixed(1)}" cy="${(L[1] + 34).toFixed(1)}" r="16" fill="#fff0c0" opacity="${(.9 * lg).toFixed(2)}" filter="url(#blur5)"/>`) : '');
  noEarth(); F.ov = ''; return s;
}

// ---------- 7a: back to horses: a horse cart on the street of stopped cars ----------
function horseCart(x, y, t, ph, mv) {
  const hs = quad(x + 200, y, 1, { kind: 'horse', face: 1, moving: mv, phase: ph });
  const cy = y - 70;
  let c = `<path d="M${x + 40},${cy - 6} L${x + 196},${y - 96}" stroke="#5a3a20" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M${x - 140},${cy - 26} L${x + 50},${cy - 26} L${x + 44},${cy + 8} L${x - 134},${cy + 8}Z" fill="#8a5a34"/><path d="M${x - 140},${cy - 26} L${x + 50},${cy - 26} L${x + 48},${cy - 18} L${x - 138},${cy - 18}Z" fill="#c89868" opacity=".6"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M${x - 130 + i * 32},${cy - 26} V${cy + 8}" stroke="#4a2e18" stroke-width="2" opacity=".6"/>`).join('') +
    [[-104, 0], [-60, 1], [-18, 2]].map(([dx, i]) => `<ellipse cx="${x + dx}" cy="${cy - 44}" rx="26" ry="20" fill="${['#d8c49a', '#cbb58a', '#e0cca4'][i]}"/><path d="M${x + dx - 10},${cy - 62} q10,-8 20,0" stroke="#8a7450" stroke-width="3" fill="none"/>`).join('');
  const wheel = (cx, R) => `<g transform="translate(${cx},${y - R}) rotate(${(ph * 40).toFixed(1)})"><circle r="${R}" fill="none" stroke="#3a2412" stroke-width="7"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M0,0 L${(Math.cos(i * .628) * R).toFixed(1)},${(Math.sin(i * .628) * R).toFixed(1)}" stroke="#5a3a20" stroke-width="4"/>`).join('') + `<circle r="7" fill="#2a1a0c"/></g>`;
  return hs + c + wheel(x - 50, 44);
}
function sceneHorse(t) {
  const t0 = S0(7) - .2, T = t - t0, hx = 140 + T * 60, ph = T * 3.2;
  let fg = '';
  // the dead cars have been pushed to the kerb; the cart takes the lane
  fg += car(40, 1160, .82, '#d8d8dc', -1, 0) + car(640, 1160, .82, '#2a5a8a', -1, 0) + `<g transform="translate(${(hx * .2).toFixed(1)},${(1236 * .2).toFixed(1)}) scale(.8)">${horseCart(hx, 1236, t, ph, 1)}</g>`;
  fg += hero(hx + 30, 1207, Object.assign({ s: .6, face: 1, shade: 1, noShadow: 1, lF: [1.5708, .1], lB: [1.45, .02], hF: [hx + 92, 1113], hB: [hx + 86, 1117], lean: Math.sin(ph * 2) * 1.2 }, { top: '#8a6a4a', pants: '#3a3a40', skin: '#c08a66', hair: '#2a1d16' }));
  const ped = hero(640 - T * 22, PV + 84, Object.assign({ s: .72, face: -1, shade: 1, walk: T * 3.6 }, palS(6))) + hero(260, PV + 74, Object.assign({ s: .7, face: 1, shade: 1, lookUp: .02 }, palS(3)));
  let s = `<defs>${TDEFS()}</defs>` + street10(t, { N: 0, id: 'hc', cars: 0, overcast: 1, back: sun3(600, 470), fg: ped + fg });
  noEarth(); F.ov = ''; return s;
}
// ---------- 7b: an ox pulls a plough, people sow by hand; the dead city on the horizon ----------
function ploughOx(x, y, t, ph) {
  const ox = recol(quad(x + 150, y, 1.05, { kind: 'cow', face: 1, moving: 1, phase: ph }), '#e8e2d6', '#8a5a3a').split('#f4f0ea').join('#c89a72');
  const beam = `<path d="M${x + 168},${y - 112} L${x - 10},${y - 18}" stroke="#6a4426" stroke-width="7" stroke-linecap="round"/><path d="M${x - 10},${y - 18} L${x + 24},${y + 2}" stroke="#4a4e54" stroke-width="7" stroke-linecap="round"/><path d="M${x - 4},${y - 22} L${x - 70},${y - 104} M${x + 6},${y - 26} L${x - 56},${y - 110}" stroke="#7a5030" stroke-width="5" stroke-linecap="round"/><path d="M${x + 150},${y - 120} q14,-10 28,0" stroke="#5a3a20" stroke-width="8" fill="none"/>`;
  return ox + beam;
}
function scenePlough(t) {
  const t0 = WS(7, 5) - .25, T = t - t0, HZ = 790;
  let s = `<defs>${TDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#dSky)"/>` + sun3(560, 440) + cumulus(170 + T * 5, 500, 260, 111, { a: .9 }) + cumulus(470 + T * 4, 600, 200, 113, { a: .75 });
  s += farCity(117, HZ - 6, '#8a96a6', { hk: 1.1 }) + `<rect x="-20" y="${HZ - 70}" width="760" height="80" fill="#e8ecf0" opacity=".4" filter="url(#blur9)"/>` + mountainsR(HZ + 6, 22, 119, { rock: '#7a9a5a', haze: .45, hazeCol: '#dfe6e0' }) + `<rect x="-20" y="${HZ}" width="760" height="20" fill="#7a9a5a"/>`;
  // the field: ploughed furrows in front, green rows behind
  s += `<rect x="-20" y="${HZ + 14}" width="760" height="${1300 - HZ}" fill="#8a6a44"/><rect x="-20" y="${HZ + 14}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = 0; i < 22; i++) { const z = Math.pow(i / 21, 1.6), y = HZ + 20 + z * (1300 - HZ); s += `<path d="M-20,${y.toFixed(1)} Q360,${(y - 6 - 10 * z).toFixed(1)} 740,${y.toFixed(1)}" stroke="${i % 2 ? '#5a4228' : '#b08a5a'}" stroke-width="${(1.5 + 7 * z).toFixed(1)}" fill="none" opacity=".75"/>`; }
  { const r = RS(121); for (let i = 0; i < 40; i++) { const z = .05 + .25 * r(), y = HZ + 20 + z * z * 500, x = r() * 740; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l-3,-${(6 + 10 * z).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} l3,-${(5 + 9 * z).toFixed(1)}" stroke="#5a8a3a" stroke-width="1.6"/>`; } }
  // the ox and plough with the farmer behind
  const ox = 210 + T * 28, ph = T * 2.6, oy = 1060;
  s += `<path d="M-20,${oy + 4} L${ox - 10},${oy + 4}" stroke="#4a3018" stroke-width="10" opacity=".6"/>` + ploughOx(ox, oy, t, ph);
  s += hero(ox - 96, oy + 6, Object.assign({ s: .74, face: 1, shade: 1, walk: ph * 1.3, amp: .4, lean: 8, hF: [ox - 64, oy - 104], hB: [ox - 72, oy - 100] }, { top: '#a85a3a', pants: '#4a3a2a', skin: '#a46a46', hair: '#1b1410' }));
  // a sower casting seed by hand
  const sx = 560 - T * 16, sw = .5 + .5 * Math.sin(T * 3.4);
  s += hero(sx, 1236, Object.assign({ s: .9, face: -1, shade: 1, walk: T * 2.4, amp: .35, hF: [sx - 70 * sw - 10, 1236 - 200 + 30 * sw], hB: [sx + 10, 1236 - 150] }, palS(1))) + `<ellipse cx="${sx + 6}" cy="${1236 - 120}" rx="22" ry="18" fill="#d8c49a"/>`;
  if (sw > .7) { const H = HP.hand, r = RS(Math.floor(T * 3.4 / 6.28 * 4)); for (let i = 0; i < 14; i++) { const u = (sw - .7) / .3; s += `<circle cx="${(H[0] - 20 - u * 60 * r()).toFixed(1)}" cy="${(H[1] + u * 80 * r()).toFixed(1)}" r="2" fill="#e8d8a8"/>`; } }
  for (let i = 0; i < 4; i++) s += bird(380 + i * 30 + T * 18, 600 - i * 10, .3, Math.sin(t * 9 + i), -4);
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: that way of life fed about one billion people 200 years ago; today we are more than eight billion ----------
function sceneBillion(t) {
  const t0 = S0(8) - .2, T = t - t0, a1 = ease(ramp(t, WS(8, 4), WS(8, 5))), a2 = ease(ramp(t, WS(8, 11) - .2, WS(8, 11) + .3));
  let s = scenePlough(t - T + 3.0).replace(/<rect x="-20" y="-20" width="760" height="1320"[^>]*\/>$/, '');
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a1020" opacity=".55"/>` + `<rect x="-20" y="-20" width="760" height="1320" fill="#000" opacity=".25" filter="url(#blur9)"/>`;
  // then: one billion = one big icon
  s += `<g opacity="${a1.toFixed(2)}">` + panel(40, 430, 640, 300, 1) + lbl(590, 486, 'قبلَ ٢٠٠ عام', 1, '#c8d0dc', 30) + icon(580, 610, 2.2, '#f4c76b', 1, '#ffe0a0') + lbl(330, 620, '≈ ١ مليار إنسان', 1, '#f4c76b', 40) + lbl(330, 668, 'زراعةٌ باليدِ والحيوانات', 1, '#aab4c4', 24) + `</g>`;
  // now: eight icons pop up one by one
  s += `<g opacity="${a2.toFixed(2)}">` + panel(40, 760, 640, 380, 1) + lbl(590, 816, 'اليوم', 1, '#c8d0dc', 30);
  for (let i = 0; i < 8; i++) { const k = ease(ramp(t, WS(8, 12) + i * .16, WS(8, 12) + i * .16 + .25)), x = 590 - (i % 4) * 130, y = 880 + Math.floor(i / 4) * 124, red = i > 0 ? ease(ramp(t, WS(8, 16) + .3, WS(8, 16) + .9)) : 0;
    s += icon(x, y, 1.3 * (.6 + .4 * k), mix('#f4c76b', '#6a7280', red), k, mix('#ffe0a0', '#8a92a0', red)); }
  s += lbl(360, 1110, 'أكثرُ من ٨ مليارات', ease(ramp(t, WS(8, 15), WS(8, 16))), '#fff', 34) + `</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 9: the surprise: our ancestors were never without technology: stone tools more than 3 million years old ----------
function acacia(x, y, h, seed) {
  const r = RS(seed); let s = `<path d="M${x},${y} C${x - 4},${y - h * .4} ${x + 6},${y - h * .6} ${x - 2},${y - h * .82}" stroke="#3a2a1e" stroke-width="${(h * .05).toFixed(1)}" fill="none"/><path d="M${x},${y - h * .5} L${x + h * .3},${y - h * .84} M${x},${y - h * .55} L${x - h * .32},${y - h * .82}" stroke="#3a2a1e" stroke-width="${(h * .03).toFixed(1)}"/>`;
  for (let i = 0; i < 9; i++) { const cx = x + (r() - .5) * h * .9, cy = y - h * (.86 + r() * .08); s += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(h * (.16 + r() * .12)).toFixed(1)}" ry="${(h * .055).toFixed(1)}" fill="${['#4a6a2a', '#5a7a32', '#3e5a24'][i % 3]}"/>`; }
  return s + `<ellipse cx="${x}" cy="${y - h * .84}" rx="${h * .5}" ry="${h * .04}" fill="#000" opacity=".15"/>`;
}
function flint(x, y, s, rot, col = '#8a7a66') {   // a knapped stone with flake scars
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${s})"><path d="M-40,8 L-30,-22 L-6,-34 L26,-28 L42,-4 L34,20 L4,30 L-26,26Z" fill="${col}"/><path d="M-30,-22 L-6,-34 L-2,-8 Z M26,-28 L42,-4 L14,-6Z M4,30 L34,20 L12,8Z" fill="#fff" opacity=".18"/><path d="M-40,8 L-26,26 L4,30 L-6,6Z" fill="#000" opacity=".22"/><path d="M-2,-8 L14,-6 L12,8 L-6,6Z" fill="#000" opacity=".08"/><path d="M-30,-22 L-2,-8 L26,-28 M-2,-8 L-6,6 L-40,8 M14,-6 L42,-4 M12,8 L34,20" stroke="#4a3e30" stroke-width="1.4" fill="none" opacity=".6"/></g>`;
}
function timeline(t, a) {
  if (a <= 0) return ''; const y = 1180, X = v => lerp(660, 70, Math.log10(v / 3.3e6) / Math.log10(1 / 3.3e6) * .9 + .0);   // log scale, oldest on the right
  const M = [[3.3e6, '٣٫٣ مليون سنة', 'stone'], [1e6, 'مليون سنة', 'fire'], [5500, '٥٥٠٠ سنة', 'wheel'], [200, '٢٠٠ سنة', 'gear'], [1, 'اليوم', 'phone']];
  let s = `<g opacity="${a.toFixed(2)}">` + panel(30, y - 100, 660, 190, 1) + `<path d="M670,${y} H60" stroke="#f4c76b" stroke-width="4"/><path d="M60,${y} l14,-8 v16Z" fill="#f4c76b"/>`;
  M.forEach(([v, tx, kd], i) => { const x = 606 - i * 128, k = ease(ramp(t, WS(9, 11) + i * .35, WS(9, 11) + i * .35 + .3));
    s += `<g opacity="${k.toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y}" r="8" fill="#f4c76b"/>` + lbl(x, y + 46, tx, 1, i === 0 ? '#f4c76b' : '#fff', 22);
    const ic = kd === 'stone' ? flint(x, y - 46, .55, -10) : kd === 'fire' ? `<path d="M${x - 12},${y - 26} C${x - 18},${y - 52} ${x - 2},${y - 58} ${x},${y - 76} C${x + 10},${y - 58} ${x + 18},${y - 48} ${x + 12},${y - 26}Z" fill="#ff8a2a"/><path d="M${x - 5},${y - 26} C${x - 8},${y - 40} ${x},${y - 46} ${x + 2},${y - 54} C${x + 6},${y - 44} ${x + 8},${y - 36} ${x + 5},${y - 26}Z" fill="#ffd86a"/>` :
      kd === 'wheel' ? woodWheel(x, y - 44, 24, 0, 1, 'tlw') : kd === 'gear' ? gear(x, y - 44, 22, 9, 0, '#9aa4ae') : `<rect x="${x - 12}" y="${y - 72}" width="24" height="44" rx="4" fill="#1a1c22"/><rect x="${x - 9}" y="${y - 68}" width="18" height="34" rx="2" fill="#5a9ad8"/>`;
    s += ic + `</g>`; });
  return s + `</g>`;
}
function sceneStone(t) {
  const t0 = S0(9) - .2, T = t - t0, HZ = 760;
  let s = `<defs>${TDEFS()}${SPDEF}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#duskS)"/>` + sun3(220, HZ - 40, .95, '#ffe0b0') + cumulus(480 + T * 4, 520, 240, 131, { a: .6 });
  s += `<path d="M-20,${HZ} L740,${HZ}" stroke="#f8d8a0" stroke-width="3" opacity=".6"/><rect x="-20" y="${HZ - 2}" width="760" height="34" fill="#d8b890"/><path d="M60,${HZ + 8} L420,${HZ + 8} L440,${HZ + 22} L40,${HZ + 22}Z" fill="#f4d8a8" opacity=".5"/>`;
  s += mountainsR(HZ - 10, 60, 133, { rock: '#9a7a6a', haze: .6, hazeCol: '#f0c8a0' });
  s += `<rect x="-20" y="${HZ + 26}" width="760" height="${1300 - HZ}" fill="#b8955e"/><rect x="-20" y="${HZ + 26}" width="760" height="${1300 - HZ}" fill="#000" filter="url(#grainR)" opacity=".25"/>` + meadow(HZ + 30, 1300, t, { c0: '#c8a868', c1: '#8a6a3a' });
  s += acacia(560, HZ + 40, 170, 41) + acacia(120, HZ + 34, 110, 43) + acacia(660, HZ + 30, 80, 45);
  // a flat rock to work on, close to us, with flakes piling up
    const per = .8, n = Math.floor(T / per), u = pmod(T / per, 1), hit = u > .55 && u < .62;
  { const r = RS(141); for (let i = 0; i < Math.min(n, 14); i++) s += flint(380 + r() * 120, 1030 + r() * 22, .28 + r() * .12, r() * 360, ['#8a7a66', '#9a8a72', '#7a6a58'][i % 3]); }
  // an ancestor sits on a rock and knaps: the core in one hand, the hammerstone in the other
  const px = 300, py = 1040, sc = 1.15, up = u < .55 ? ease(u / .55) : 1 - ease((u - .55) / .45);
  s += `<ellipse cx="${px - 20}" cy="${py - 30}" rx="96" ry="52" fill="#7a6a58"/><ellipse cx="${px - 30}" cy="${py - 52}" rx="80" ry="30" fill="#9a8a74"/><ellipse cx="${px - 20}" cy="${py - 30}" rx="96" ry="52" fill="#000" filter="url(#grainR)" opacity=".3"/><ellipse cx="${px + 40}" cy="${py + 6}" rx="190" ry="16" fill="#000" opacity=".25" filter="url(#blur5)"/>`;
  const CX = px + 96, CY = py - 112, HX = CX + lerp(14, 40, up), HY = CY - lerp(10, 120, up);
  s += hero(px, py, Object.assign({ s: sc, face: 1, shade: 1, noShadow: 1, lF: [1.5708, .25], lB: [1.4, .2], lookUp: -.25, lean: 6, hB: [CX - 6, CY + 12], hF: [HX, HY + 10] }, { top: '#8a5a34', pants: '#6a4428', skin: '#8a5a3a', hair: '#1a120c' }));
  s += flint(CX, CY, .72, -14, '#8e7e6a') + `<g transform="translate(${HX.toFixed(1)},${HY.toFixed(1)})"><ellipse cx="0" cy="0" rx="22" ry="17" fill="#6e665c"/><ellipse cx="-5" cy="-5" rx="11" ry="6" fill="#fff" opacity=".18"/></g><circle cx="${(HP.hand[0]).toFixed(1)}" cy="${(HP.hand[1]).toFixed(1)}" r="8" fill="#8a5a3a"/>`;
  if (u > .55 && u < .75) { const k = (u - .55) / .2, r = RS(n * 7 + 3); for (let i = 0; i < 7; i++) { const a = -2.6 + r() * 2, d = k * (40 + 90 * r()); s += `<g opacity="${(1 - k).toFixed(2)}">${flint(CX + 20 + Math.cos(a) * d, CY + Math.sin(a) * d + k * k * 60, .12 + r() * .08, r() * 360, '#a8987e')}</g>`; } s += `<ellipse cx="${CX + 16}" cy="${CY - 4}" rx="${(16 + 36 * k).toFixed(1)}" ry="${(10 + 18 * k).toFixed(1)}" fill="#f4e6c8" opacity="${(.5 * (1 - k)).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += timeline(t, ease(ramp(t, WS(9, 11) - .2, WS(9, 11) + .2)));
  noEarth(); F.ov = ''; return s;
}
