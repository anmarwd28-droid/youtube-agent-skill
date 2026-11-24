// fr_a.js (#79): what if friction vanished for five seconds? Built on the #77 chain (streetO, hero, carTop, studio, glE).
const FRL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const FRD = `<linearGradient id="frWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8925a"/><stop offset=".5" stop-color="#a8723e"/><stop offset="1" stop-color="#7a4e28"/></linearGradient>
<linearGradient id="frSteel" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef2f6"/><stop offset=".45" stop-color="#a8b2bc"/><stop offset="1" stop-color="#5a6470"/></linearGradient>
<linearGradient id="frRope" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0dcae"/><stop offset=".5" stop-color="#c8a66a"/><stop offset="1" stop-color="#8a6a3a"/></linearGradient>
<linearGradient id="frAsph" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3c42"/><stop offset=".5" stop-color="#4a4c52"/><stop offset="1" stop-color="#3a3c42"/></linearGradient>
<radialGradient id="frHeat" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff4c0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffb040" stop-opacity=".7"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient>
<radialGradient id="frBone" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fbf4e6"/><stop offset=".6" stop-color="#e6d6b8"/><stop offset="1" stop-color="#b8a280"/></radialGradient>
<linearGradient id="frCart" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dff4ff"/><stop offset="1" stop-color="#8ec8e8"/></linearGradient>
<linearGradient id="frIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4fbff"/><stop offset=".5" stop-color="#bfe2f4"/><stop offset="1" stop-color="#7ab4d4"/></linearGradient>
<linearGradient id="frSoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a6a44"/><stop offset="1" stop-color="#4a3420"/></linearGradient>`;
const FRDEFS = () => `${LDEFS()}${FRD}`;
// this video's street: new buildings and shops
const FRBLK = [[-14, 158, 430, '#b88a6a', 791, 2], [144, 150, 360, '#5e7488', 792, 0], [294, 162, 470, '#d2c09a', 793, 1], [456, 138, 400, '#8a5e52', 794, 2], [594, 166, 450, '#6e8a80', 795, 0]];
const FRSHOP = [[-4, 150, 'مخبز', '#a8602a'], [154, 136, 'كتب', '#2a4a7a'], [298, 150, 'أحذية', '#5a3a2a'], [456, 132, 'زهور', '#3a7a4a'], [596, 140, 'مقهى', '#7a3a3a']];
const frStreet = (t, o = {}) => streetO(t, Object.assign({ blocks: FRBLK, shops: FRSHOP }, o));
// a person whose feet lost their grip: k 0 = walking, 1 = slipped (legs out front, leaning back, arms up); fall 0..1 = down on the back
function slipper(x, y, s, f, t, ph, k, fall, pal, o = {}) {
  const w = 1 - k, wl = Math.sin(ph) * .5 * w, sk = Math.sin(t * 9 + ph) * .25 * k;
  const lF = [lerp(wl, .95, k), lerp(wl - .2, .55, k)], lB = [lerp(-wl, .25, k), lerp(-wl - .2, .1, k)];
  const aF = [lerp(.1, 2.1 + sk, k), lerp(.35, 2.5 + sk, k)], aB = [lerp(-.1, 2.6 - sk, k), lerp(.25, 3.0 - sk, k)];
  return hero(x, y, Object.assign({ s, face: f, shade: 1, lF, lB, aF, aB, lean: lerp(0, -22, k) + lerp(0, -8, fall), rot: -f * 78 * ease(fall), pv: 0 }, pal, o));
}
// a motion streak behind a gliding thing
const frZip = (x, y, f, a, n = 3, len = 90) => a <= 0 ? '' : Array.from({ length: n }, (_, i) => `<path d="M${x - f * 20},${y - i * 26} h${-f * (len - i * 18)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(a * (.55 - i * .12)).toFixed(2)}"/>`).join('');
// ---------- 0: hook: a busy street; the grip goes and everyone glides on ----------
const FRWALK = [[-40, 1058, 1, 1, .66, 0], [180, 1088, -1, 2, .7, 1.7], [330, 1046, 1, 3, .62, 3.1], [560, 1080, -1, 5, .7, .6], [700, 1052, -1, 7, .64, 2.4]];
function frWalkers(t, k, fall, spd = 40) {
  let s = '';
  FRWALK.forEach(([x0, y, f, pi, sc, ph0], j) => { const x = x0 + f * spd * t, ph = t * 4.2 + ph0;
    s += slipper(x, y, sc, f, t, ph, k, fall * (j % 2 ? 1 : .0), gp(pi)) + frZip(x - f * 10, y - 60, f, k * .8, 2, 70); });
  return s;
}
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 3), WS(0, 3) + .5)), fl = ease(ramp(t, WS(0, 3), WS(0, 6)));
  let s = `<defs>${FRDEFS()}</defs>` + frStreet(t, { id: 'f0', top: frWalkers(t, k, 0) });
  // a cold blue pulse across the ground when friction goes
  s += `<rect x="-20" y="${PV}" width="760" height="${1300 - PV}" fill="#9ad8ff" opacity="${(.25 * fl * (1 - ramp(t, WS(0, 6), WS(0, 8) + .5))).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: friction holds everything: a crate on a floor, then the rough surfaces under a lens ----------
function sceneMicro(t) {
  const T = t - (S0(1) - .2), b = ease(ramp(t, S0(1) - .2, WS(1, 2))), z = ease(ramp(t, WS(1, 3), WS(1, 5) + .3)), g = ease(ramp(t, WS(1, 8), WS(1, 11)));
  let s = `<defs>${FRDEFS()}</defs>` + studio('stF1', '#3a3428', '#0c0a08', 4);
  // floor (wood planks) and a crate being pushed
  s += `<rect x="-20" y="900" width="760" height="420" fill="url(#frWood)"/>` + Array.from({ length: 7 }, (_, i) => `<path d="M-20,${910 + i * 56} H740" stroke="#5a3a1e" stroke-width="2" opacity=".5"/>`).join('') + `<rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="900" width="760" height="30" fill="#000" opacity=".25"/>`;
  const cx = 300 + Math.sin(T * 2) * 4;
  s += `<ellipse cx="${cx}" cy="905" rx="150" ry="14" fill="#000" opacity=".45" filter="url(#blur5)"/><rect x="${cx - 140}" y="680" width="280" height="222" rx="6" fill="#b07a3e"/><rect x="${cx - 140}" y="680" width="280" height="222" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
    [0, 1, 2, 3].map(i => `<rect x="${cx - 140}" y="${686 + i * 55}" width="280" height="6" fill="#7a4e24" opacity=".6"/>`).join('') + `<path d="M${cx - 132},688 L${cx + 132},894 M${cx + 132},688 L${cx - 132},894" stroke="#7a4e24" stroke-width="16" opacity=".75"/><rect x="${cx - 140}" y="680" width="280" height="222" fill="none" stroke="#5a3818" stroke-width="10"/>`;
  s += hero(cx - 230, 1000, Object.assign({ s: 1.05, face: 1, shade: 1, lean: 18, lF: [.55, .3], lB: [-.6, -.7], hF: [cx - 146, 760], hB: [cx - 146, 800] }, gp(2)));
  // arrows: the push and the friction that holds back
  s += `<g opacity="${b.toFixed(2)}"><path d="M${cx + 160},790 h120" stroke="#7ae08a" stroke-width="14" stroke-linecap="round"/><path d="M${cx + 300},790 l-30,-24 v48Z" fill="#7ae08a"/>${FRL(cx + 230, 830, 'دفع', 1, '#7ae08a', 28)}</g>`;
  s += `<g opacity="${b.toFixed(2)}"><path d="M${cx + 120},880 h-170" stroke="#f4c76b" stroke-width="12" stroke-linecap="round"/><path d="M${cx - 70},880 l30,-22 v44Z" fill="#f4c76b"/></g>`;
  // the lens: two rough surfaces with interlocking bumps
  if (z > 0) { const R = 150 * z, X = 490, Y = 520, rr = RS(7); let top = `M${X - 200},${Y - 220} H${X + 200} V${Y - 6}`, bot = `M${X + 200},${Y + 220} H${X - 200} V${Y + 6}`;
    for (let i = 0; i <= 20; i++) { const x = X + 200 - i * 20, h = 22 + rr() * 30; top += ` L${x - 10},${Y - 6 + h * (i % 2 ? 1 : -.3)}`; } top += ` L${X - 200},${Y - 6}Z`;
    for (let i = 0; i <= 20; i++) { const x = X - 200 + i * 20, h = 22 + rr() * 30; bot += ` L${x + 10},${Y + 6 - h * (i % 2 ? 1 : -.3)}`; } bot += ` L${X + 200},${Y + 6}Z`;
    s += `<clipPath id="frLens"><circle cx="${X}" cy="${Y}" r="${R.toFixed(1)}"/></clipPath><path d="M${cx + 120},880 L${X - R * .6},${Y + R * .8}" stroke="#fff" stroke-width="2" opacity="${(.5 * z).toFixed(2)}"/><circle cx="${X}" cy="${Y}" r="${(R + 10).toFixed(1)}" fill="#0a0e12"/>` +
      `<g clip-path="url(#frLens)"><rect x="${X - 200}" y="${Y - 200}" width="400" height="400" fill="#2a2420"/><path d="${top}" fill="#b07a3e"/><path d="${bot}" fill="#8a6a4a"/><rect x="${X - 200}" y="${Y - 200}" width="400" height="400" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
      `<circle cx="${X}" cy="${Y}" r="${R.toFixed(1)}" fill="none" stroke="#fff" stroke-width="6" opacity=".2"/></g>` + FRL(185, 500, 'نتوءاتٌ صغيرةٌ', z, '#fff', 30) + FRL(185, 545, 'تتشابك', z, '#fff', 30); }
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0e1c" opacity="${(.0 * g).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: your foot slides forward: walking needs friction ----------
function sceneFoot(t) {
  const T = t - (S0(2) - .2), k = ease(ramp(t, WS(2, 3), WS(2, 3) + .5)), fall = ease(ramp(t, WS(2, 5), WS(2, 7))), ar = ease(ramp(t, WS(2, 7), WS(2, 9)));
  // the camera follows the walker: the pavement slides past; after the slip the body keeps its speed and the camera keeps up
  const off = T * 120;
  let g = `<rect x="-20" y="-20" width="760" height="1320" fill="#9cc4e6"/>`;
  g += `<rect x="-20" y="700" width="760" height="620" fill="#c4b8a4"/><rect x="-20" y="700" width="760" height="620" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  for (let q = 0; q < 12; q++) for (let r = -1; r < 10; r++) { const x = pmod(r * 96 - off + (q % 2) * 48, 960) - 120; g += `<rect x="${x.toFixed(1)}" y="${700 + q * 50}" width="94" height="48" fill="none" stroke="#a89c88" stroke-width="2"/>`; }
  // a wall of shops behind, sliding past
  for (let i = -1; i < 6; i++) { const x = pmod(i * 180 - off * .9, 1080) - 180, c = ['#b88a6a', '#5e7488', '#d2c09a', '#8a5e52', '#6e8a80', '#a07a5a'][((i % 6) + 6) % 6]; g += `<rect x="${x.toFixed(1)}" y="120" width="182" height="582" fill="${c}"/><rect x="${x.toFixed(1)}" y="120" width="182" height="582" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="${(x + 24).toFixed(1)}" y="420" width="134" height="230" fill="#2a3440"/><rect x="${(x + 30).toFixed(1)}" y="426" width="122" height="218" fill="#8ab0c8" opacity=".55"/><rect x="${(x + 24).toFixed(1)}" y="180" width="54" height="80" fill="#2a3440"/><rect x="${(x + 104).toFixed(1)}" y="180" width="54" height="80" fill="#2a3440"/>`; }
  g += `<rect x="-20" y="690" width="760" height="16" fill="#000" opacity=".25"/>`;
  g += slipper(400, 1090, 1.5, 1, t, T * 6.2, k, fall * .42, { top: '#e85a2a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' });
  g += frZip(250, 900, 1, k * (1 - fall * .5), 3, 140);
  // the explanation inset: your foot pushes the ground back, friction pushes you forward
  if (ar > 0) { const Y = 390; g += `<g opacity="${ar.toFixed(2)}">${panel(60, 250, 600, 300)}${FRL(360, Y - 90, 'قدمُك تدفعُ الأرضَ للخلف', 1, '#ff9a7a', 28)}` +
    `<rect x="100" y="${Y + 40}" width="520" height="46" fill="#c4b8a4"/><rect x="100" y="${Y + 40}" width="520" height="46" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    `<path d="M250,${Y + 40} C250,${Y - 10} 300,${Y - 30} 360,${Y - 24} C420,${Y - 18} 470,${Y + 4} 470,${Y + 40}Z" fill="#4a443c"/><path d="M250,${Y + 40} H470" stroke="#1a1814" stroke-width="8"/>` +
    `<path d="M330,${Y + 8} h-150" stroke="#ff9a7a" stroke-width="12" stroke-linecap="round"/><path d="M164,${Y + 8} l28,-20 v40Z" fill="#ff9a7a"/>` +
    `<path d="M300,${Y + 112} h170" stroke="#7ae08a" stroke-width="12" stroke-linecap="round"/><path d="M488,${Y + 112} l-28,-20 v40Z" fill="#7ae08a"/>${FRL(360, Y + 160, 'والاحتكاكُ يدفعُك للأمام', 1, '#7ae08a', 28)}</g>`; }
  noEarth(); F.ov = ''; return `<defs>${FRDEFS()}</defs>` + g;
}
// ---------- 3: in every street of the world, the walkers fall at once ----------
function sceneFall(t) {
  const T = t - (S0(3) - .2), fall = ease(ramp(t, WS(3, 4), WS(3, 6)));
  let top = ''; FRWALK.forEach(([x0, y, f, pi, sc, ph0], j) => { const x = x0 + 160 * f + f * 40 * T; top += slipper(x, y, sc, f, t, t * 4.2 + ph0, 1, fall * (j === 2 ? .0 : 1), gp(pi + 1)); });
  let s = `<defs>${FRDEFS()}</defs>` + frStreet(t + 20, { id: 'f3', top });
  // small views of other places at once: three round insets of the same moment
  const q = ease(ramp(t, WS(3, 1), WS(3, 3)));
  if (q > 0) { [[130, 560, '#d8c4a4', '#6a8aa0', 2], [360, 500, '#a8b8c8', '#c08060', 4], [590, 560, '#e0c8a0', '#5a8a6a', 6]].forEach(([X, Y, c1, c2, pi], i) => { const a = clamp(q * 2 - i * .4);
    s += `<g opacity="${a.toFixed(2)}"><clipPath id="frIn${i}"><circle cx="${X}" cy="${Y}" r="92"/></clipPath><circle cx="${X}" cy="${Y}" r="100" fill="#fff"/><g clip-path="url(#frIn${i})"><rect x="${X - 100}" y="${Y - 100}" width="200" height="200" fill="${c2}"/>` +
      `<rect x="${X - 90}" y="${Y - 70}" width="60" height="110" fill="${c1}"/><rect x="${X - 20}" y="${Y - 90}" width="54" height="130" fill="${mix(c1, '#000000', .2)}"/><rect x="${X + 40}" y="${Y - 60}" width="60" height="100" fill="${mix(c1, '#ffffff', .2)}"/><rect x="${X - 100}" y="${Y + 40}" width="200" height="70" fill="#b8ae9c"/>` +
      slipper(X - 10, Y + 78, .36, i % 2 ? -1 : 1, t, t * 4 + i, 1, fall, gp(pi)) + slipper(X + 44, Y + 84, .36, i % 2 ? 1 : -1, t, t * 4 + i + 2, 1, fall, gp(pi + 1)) + `</g></g>`; }); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: cars can neither stop nor turn ----------
function sceneCars(t) {
  const T = t - (S0(4) - .2), br = ease(ramp(t, WS(4, 4), WS(4, 4) + .3)), ins = ease(ramp(t, WS(4, 7), WS(4, 8) + .3));
  let s = `<defs>${FRDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#5a7a44"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  // grass texture and a few trees from above
  const r = RS(41); for (let i = 0; i < 60; i++) s += `<circle cx="${(r() * 740).toFixed(1)}" cy="${(r() * 1300).toFixed(1)}" r="${(10 + r() * 30).toFixed(1)}" fill="${r() < .5 ? '#4a6a3a' : '#6a8a4e'}" opacity=".5"/>`;
  // the road: up from the bottom, then a curve to the right at the top
  const road = `M250,1320 L250,640 Q250,380 520,380 L760,380`;
  s += `<path d="${road}" stroke="#2a2c30" stroke-width="250" fill="none"/><path d="${road}" stroke="url(#frAsph)" stroke-width="230" fill="none"/><path d="${road}" stroke="#e8e4d8" stroke-width="4" stroke-dasharray="44 36" fill="none" opacity=".8"/>` +
    `<path d="M135,1320 L135,640 Q135,265 520,265 L760,265" stroke="#e8e4d8" stroke-width="5" fill="none" opacity=".7"/><path d="M365,1320 L365,640 Q365,495 520,495 L760,495" stroke="#e8e4d8" stroke-width="5" fill="none" opacity=".7"/>`;
  r(); for (let i = 0; i < 9; i++) s += canopy(40 + r() * 680, i < 5 ? 600 + r() * 600 : 80 + r() * 140, 40 + r() * 20, 50 + i);
  // car 1 (left lane, going up): should turn right at the curve but goes straight on
  const y1 = 1180 - T * 150, y2 = 1400 - T * 150;
  s += carTop(190, y1, -90, '#c83a2a') + frZip(190, y1 + 40, 1, 0, 0) + carTop(310, y2, -90, '#2a5a9a');
  if (br > 0) s += [[190, y1], [310, y2]].map(([x, y]) => `<circle cx="${x - 30}" cy="${y + 84}" r="16" fill="url(#frHeat)" opacity="${(.0).toFixed(2)}"/><ellipse cx="${x - 24}" cy="${y + 82}" rx="10" ry="6" fill="#ff2a2a" opacity="${(br * .9).toFixed(2)}" filter="url(#blur2)"/><ellipse cx="${x + 24}" cy="${y + 82}" rx="10" ry="6" fill="#ff2a2a" opacity="${(br * .9).toFixed(2)}" filter="url(#blur2)"/>`).join('');
  // a dashed path showing where they should have turned
  s += `<path d="M190,700 Q190,440 520,440" stroke="#7ae08a" stroke-width="6" stroke-dasharray="14 12" fill="none" opacity="${(.8 * ease(ramp(t, WS(4, 5), WS(4, 6)))).toFixed(2)}"/><path d="M190,700 V180" stroke="#ff5a4a" stroke-width="6" stroke-dasharray="14 12" fill="none" opacity="${(.8 * ease(ramp(t, WS(4, 5), WS(4, 6)))).toFixed(2)}"/>`;
  // inset: a brake disc with its pad, the wheel spinning free
  if (ins > 0) { const X = 540, Y = 900, rot = T * 400; s += `<g opacity="${ins.toFixed(2)}"><circle cx="${X}" cy="${Y}" r="150" fill="#0a0e12"/><circle cx="${X}" cy="${Y}" r="140" fill="#1e2228"/>` +
    `<g transform="rotate(${rot.toFixed(1)},${X},${Y})"><circle cx="${X}" cy="${Y}" r="104" fill="url(#frSteel)"/>` + Array.from({ length: 10 }, (_, i) => { const a = i / 10 * 6.28; return `<circle cx="${(X + Math.cos(a) * 80).toFixed(1)}" cy="${(Y + Math.sin(a) * 80).toFixed(1)}" r="6" fill="#4a525c"/>`; }).join('') + `<circle cx="${X}" cy="${Y}" r="44" fill="#6a727c"/>` +
    Array.from({ length: 5 }, (_, i) => { const a = i / 5 * 6.28; return `<circle cx="${(X + Math.cos(a) * 26).toFixed(1)}" cy="${(Y + Math.sin(a) * 26).toFixed(1)}" r="7" fill="#2a2e34"/>`; }).join('') + `</g>` +
    `<path d="M${X + 60},${Y - 120} q60,40 60,120 q0,80 -60,120 l-20,-30 q40,-30 40,-90 q0,-60 -40,-90Z" fill="#c8302a"/><rect x="${X + 96}" y="${Y - 50}" width="18" height="100" rx="4" fill="#4a3a30"/>` +
    `<path d="M${X - 40},${Y - 150} a160,160 0 0,1 120,0" stroke="#f4c76b" stroke-width="5" fill="none" opacity=".8"/>${FRL(X, Y + 196, 'الفرامل تضغط… ولا تُمسك', 1, '#fff', 24)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: knots untie, nails slide out of the wood, furniture comes apart ----------
function sceneKnot(t) {
  const k1 = ease(ramp(t, WS(5, 1) - .1, WS(5, 1) + .9)), k2 = ease(ramp(t, WS(5, 2), WS(5, 5))), k3 = ease(ramp(t, WS(5, 6), WS(5, 8) + .4));
  let s = `<defs>${FRDEFS()}</defs>` + studio('stF5', '#3a3020', '#0a0806', 9);
  const pane = (y, h) => `<rect x="40" y="${y}" width="640" height="${h}" rx="22" fill="#000" opacity=".35"/><rect x="40" y="${y}" width="640" height="${h}" rx="22" fill="none" stroke="#f4c76b" stroke-width="2" opacity=".4"/>`;
  // (a) a knot under tension slips open
  s += pane(400, 250);
  const rope = (d, w = 26) => `<path d="${d}" stroke="#6a4a24" stroke-width="${w + 6}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="url(#frRope)" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#8a6a3a" stroke-width="${w}" stroke-dasharray="6 10" fill="none" opacity=".55"/>`;
  const sp = k1 * 120, lp = 1 - k1;
  s += rope(`M80,525 L${300 - sp},525`) + rope(`M${420 + sp},525 L640,525`);
  if (lp > 0) s += `<g opacity="${lp.toFixed(2)}">${rope(`M${300 - sp},525 C${330 - sp},${470 - 30 * k1} ${400 + sp},${470 - 30 * k1} ${380 + sp},525 C${360 + sp},${580 + 20 * k1} ${300 - sp},${580 + 20 * k1} ${330 - sp},520 L${420 + sp},525`)}</g>`;
  s += `<path d="M70,525 l-26,-18 v36Z M650,525 l26,-18 v36Z" fill="#f4c76b" opacity=".9"/>` + FRL(360, 625, k1 > .6 ? 'العقدةُ انحلّت' : 'عقدة', 1, k1 > .6 ? '#ff9a7a' : '#fff', 26);
  // (b) a nail slides out of a plank
  s += pane(680, 250);
  s += `<rect x="90" y="770" width="540" height="90" fill="url(#frWood)"/><rect x="90" y="770" width="540" height="90" fill="#000" filter="url(#grainR)" opacity=".2"/>` + [0, 1, 2].map(i => `<path d="M90,${790 + i * 26} C250,${780 + i * 26} 420,${800 + i * 26} 630,${788 + i * 26}" stroke="#7a4e28" stroke-width="2" fill="none" opacity=".6"/>`).join('');
  const ny = 760 - k2 * 70;
  s += `<rect x="352" y="${ny}" width="16" height="120" fill="url(#frSteel)"/><path d="M352,${ny + 120} l8,22 l8,-22Z" fill="#8a929c"/><rect x="336" y="${ny - 10}" width="48" height="12" rx="4" fill="url(#frSteel)"/><rect x="90" y="770" width="540" height="90" fill="none"/>` +
    `<rect x="352" y="770" width="16" height="${Math.max(0, ny + 120 - 770).toFixed(1)}" fill="#3a2410" opacity=".0"/>` + FRL(530, 900, k2 > .5 ? 'المسمارُ انزلق' : 'مسمار', 1, k2 > .5 ? '#ff9a7a' : '#fff', 26);
  // (c) a chair: its legs splay and the seat drops
  s += pane(960, 260);
  const cx = 360, sy = 1060 + k3 * 70, sp2 = k3 * 70;
  s += `<ellipse cx="${cx}" cy="1196" rx="140" ry="10" fill="#000" opacity=".4" filter="url(#blur5)"/>` +
    `<path d="M${cx - 80},${sy + 10} L${cx - 90 - sp2},1192 M${cx + 80},${sy + 10} L${cx + 90 + sp2},1192" stroke="#7a4e28" stroke-width="16" stroke-linecap="round"/>` +
    `<path d="M${cx - 60},${sy + 10} L${cx - 66 - sp2 * .6},1186 M${cx + 60},${sy + 10} L${cx + 66 + sp2 * .6},1186" stroke="#5a3818" stroke-width="12" stroke-linecap="round"/>` +
    `<rect x="${cx - 100}" y="${sy - 10}" width="200" height="22" rx="5" fill="url(#frWood)" transform="rotate(${(k3 * 6).toFixed(1)},${cx},${sy})"/>` +
    `<path d="M${cx + 80 + k3 * 30},${sy - 6 - k3 * 10} L${cx + 92 + k3 * 70},${sy - 150 + k3 * 40}" stroke="#7a4e28" stroke-width="14" stroke-linecap="round"/>` + FRL(560, 1010, k3 > .5 ? 'الأثاثُ يتفكّك' : 'كرسيّ', 1, k3 > .5 ? '#ff9a7a' : '#fff', 26);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: no air friction: raindrops speed up to about 200 km/h ----------
function sceneRain(t) {
  const T = t - (S0(6) - .2), v = ease(ramp(t, WS(6, 5), WS(6, 13))), g = ease(ramp(t, WS(6, 5) - .3, WS(6, 5) + .2));
  let s = `<defs>${FRDEFS()}</defs>` + frStreet(t + 40, { id: 'f6', N: .35, top: umb(520, 1080, gp(4), .7, -1, 1, t, '#2a3a5a') + umb(150, 1060, gp(1), .66, 1, 1, t, '#7a2a2a') });
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1e2638" opacity=".42"/>`;
  // rain streaks: length grows with the speed
  const r = RS(66), L = 26 + v * 120; let d = '';
  for (let i = 0; i < 170; i++) { const x = r() * 760, sp = 900 + v * 3600, y = pmod(r() * 1400 + T * sp, 1400) - 60; d += `M${x.toFixed(1)},${y.toFixed(1)} l${(-L * .12).toFixed(1)},${L.toFixed(1)} `; }
  s += `<path d="${d}" stroke="#d8e8f8" stroke-width="2.2" opacity=".6" stroke-linecap="round"/>`;
  // splashes on the ground, harder as they speed up
  for (let i = 0; i < 18; i++) { const x = 20 + r() * 700, y = 1120 + r() * 140, p = pmod(T * 2.2 + r(), 1); s += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(4 + p * (10 + 16 * v)).toFixed(1)}" ry="${(1.5 + p * (3 + 4 * v)).toFixed(1)}" fill="none" stroke="#e8f2ff" stroke-width="2" opacity="${((1 - p) * .7).toFixed(2)}"/>`; }
  // the speed dial of one drop
  if (g > 0) { const X = 360, Y = 700, ang = lerp(-120, 110, v) * Math.PI / 180, kmh = Math.round(lerp(30, 200, v));
    s += `<g opacity="${g.toFixed(2)}"><circle cx="${X}" cy="${Y}" r="150" fill="#0a0e1c" opacity=".85"/><path d="M${X + 130 * Math.cos(-210 * Math.PI / 180)},${Y + 130 * Math.sin(-210 * Math.PI / 180)} A130,130 0 1,1 ${X + 130 * Math.cos(30 * Math.PI / 180)},${Y + 130 * Math.sin(30 * Math.PI / 180)}" stroke="#3a4458" stroke-width="16" fill="none"/>` +
      `<path d="M${X + 130 * Math.cos(-210 * Math.PI / 180)},${Y + 130 * Math.sin(-210 * Math.PI / 180)} A130,130 0 ${v > .55 ? 1 : 0},1 ${(X + 130 * Math.cos(ang - Math.PI / 2)).toFixed(1)},${(Y + 130 * Math.sin(ang - Math.PI / 2)).toFixed(1)}" stroke="${mix('#7ac8ff', '#ff5a4a', v)}" stroke-width="16" fill="none"/>` +
      `<path d="M${X},${Y} L${(X + 110 * Math.sin(ang)).toFixed(1)},${(Y - 110 * Math.cos(ang)).toFixed(1)}" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="${X}" cy="${Y}" r="12" fill="#fff"/>` +
      `<path d="M${X},${Y + 40} q-14,22 0,36 q14,-14 0,-36Z" fill="#9ad8ff"/>${FRL(X, Y + 112, `${AR(kmh)} كم/ساعة`, 1, '#fff', 30)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: on mountain slopes, rocks and soil start to slide ----------
function sceneSlope(t) {
  const T = t - (S0(7) - .2), k = ease(ramp(t, WS(7, 3), WS(7, 6) + .5)), m = Math.max(0, t - WS(7, 3));
  let s = `<defs>${FRDEFS()}<linearGradient id="frSkM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#d8e6f0"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#frSkM)"/>`;
  s += sun3(600, 200, .8) + cumulus(220 + t * 2, 320, 220, 31, { a: .75 });
  s += `<rect x="-20" y="640" width="760" height="700" fill="#5e7044"/>` + mountainsR(700, 210, 77, { snow: .7 }) + `<rect x="-20" y="700" width="760" height="640" fill="#5e7044"/><rect x="-20" y="700" width="760" height="640" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="690" width="760" height="40" fill="#cfdbe4" opacity=".3"/>`;
  // the near slope: a steep hillside from upper left to lower right
  const slope = `M-40,560 L760,1150 L760,1320 L-40,1320Z`;
  s += `<path d="${slope}" fill="url(#frSoil)"/><path d="${slope}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  // grass on top of the slope that slides as a sheet
  const sh = 140 * k * k + m * 26 * k; const dx = sh * .8, dy = sh * .59;
  s += `<g transform="translate(${dx.toFixed(1)},${dy.toFixed(1)})"><path d="M-40,560 L760,1150 L760,1190 L-40,600Z" fill="#5a8a3a"/><path d="M-40,560 L760,1150" stroke="#7aaa4a" stroke-width="10"/>` + Array.from({ length: 30 }, (_, i) => { const x = -40 + i * 27, y = 560 + (x + 40) * .7375; return `<path d="M${x},${y.toFixed(1)} l-4,-16 M${x + 6},${y.toFixed(1)} l3,-14" stroke="#4a7a2a" stroke-width="3"/>`; }).join('') + `</g>`;
  // the bare soil left behind where the sheet has slid off
  if (k > 0) s += `<path d="M-40,560 L${(-40 + dx).toFixed(1)},${(560 + dy).toFixed(1)} L${(-40 + dx).toFixed(1)},${(600 + dy).toFixed(1)} L-40,600Z" fill="#6a4a2a"/>`;
  // rocks tumbling down the slope, with dust
  const r = RS(73); for (let i = 0; i < 9; i++) { const x0 = -20 + r() * 520, y0 = 560 + (x0 + 40) * .7375 - 20, d = (m * (60 + r() * 60) + m * m * 30) * k, x = x0 + d * .8, y = y0 + d * .59, sc = 1.1 + r() * 1.1;
    if (x > 780) continue; s += `<g transform="rotate(${(d * 1.4).toFixed(1)},${x.toFixed(1)},${(y - 18 * sc).toFixed(1)})">${rockS(x, y, sc, 80 + i)}</g>` + (k > .1 ? puffQ(x - 30, y, clamp(.15 + .7 * k), 90 + i, '#c8b08a', 10, 50) : ''); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: friction returns: everything sliding is braked hard, the motion turns into heat ----------
function sceneBack(t) {
  const T = t - (S0(8) - .2), b = ramp(t, WS(8, 3), WS(8, 4)), h = ease(ramp(t, WS(8, 4), WS(8, 9))), th = ease(ramp(t, WS(8, 9), WS(8, 12)));
  // people and a car sliding until friction bites, then they stop with heat at the contact points
  const stop = (x0, v, tb) => { const tt = Math.max(0, t - (S0(8) - .2)), tc = Math.max(0, tb - (S0(8) - .2)); if (tt < tc) return x0 + v * tt; const dt = Math.min(tt - tc, Math.abs(v) / 260); return x0 + v * tc + v * dt - Math.sign(v) * 130 * dt * dt; };
  const tb = WS(8, 3) + .1, cx = stop(40, 150, tb);
  let top = car(cx, 1230, .95, '#2a6ab0', 1) + `<circle cx="${(cx - 60).toFixed(1)}" cy="1228" r="${(30 + 30 * h).toFixed(1)}" fill="url(#frHeat)" opacity="${(h * (1 - th * .5)).toFixed(2)}"/><circle cx="${(cx + 70).toFixed(1)}" cy="1228" r="${(30 + 30 * h).toFixed(1)}" fill="url(#frHeat)" opacity="${(h * (1 - th * .5)).toFixed(2)}"/>`;
  [[90, 1066, 1, 2, .66], [520, 1078, -1, 4, .7]].forEach(([x0, y, f, pi, sc], j) => { const x = stop(x0, f * 70, tb); top += slipper(x, y, sc, f, t, j, 1, 1, gp(pi)) + `<ellipse cx="${(x - f * 40).toFixed(1)}" cy="${y}" rx="${(40 + 30 * h).toFixed(1)}" ry="14" fill="url(#frHeat)" opacity="${(h * .8 * (1 - th * .5)).toFixed(2)}"/>`; });
  // sparks when the grip comes back
  const r = RS(88); if (h > 0 && h < 1) for (let i = 0; i < 26; i++) { const a = -Math.PI * (.1 + r() * .8), d = 30 + r() * 120 * h; top += `<circle cx="${(cx + 80 + Math.cos(a) * d).toFixed(1)}" cy="${(1228 + Math.sin(a) * d * .6).toFixed(1)}" r="${(2 + r() * 3).toFixed(1)}" fill="#ffd870" opacity="${(1 - h).toFixed(2)}"/>`; }
  let s = `<defs>${FRDEFS()}</defs>` + frStreet(t + 60, { id: 'f8', top });
  // a heat gauge
  if (th > 0) s += `<g opacity="${th.toFixed(2)}">${panel(470, 470, 200, 360)}<rect x="552" y="520" width="36" height="240" rx="18" fill="#2a3040"/><rect x="558" y="${(756 - 220 * th).toFixed(1)}" width="24" height="${(220 * th).toFixed(1)}" rx="12" fill="#ff7a3a"/><circle cx="570" cy="780" r="30" fill="#ff7a3a"/>${FRL(570, 816, 'حرارة', 1, '#fff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the surprise: the friction inside your knee is lower than ice on ice ----------
function sceneKnee(t) {
  const T = t - (S0(9) - .2), a = ease(ramp(t, S0(9) - .2, WS(9, 3))), b1 = ease(ramp(t, WS(9, 5), WS(9, 6) + .4)), b2 = ease(ramp(t, WS(9, 7), WS(9, 10) + .3));
  let s = `<defs>${FRDEFS()}</defs>` + studio('stF9', '#26344a', '#070a12', 12);
  // the knee: femur above, tibia below, blue cartilage caps, a soft joint capsule; bends slowly
  const X = 230, Y = 590, bend = Math.sin(T * 1.6) * 12;
  s += `<g opacity="${a.toFixed(2)}"><ellipse cx="${X}" cy="${Y}" rx="150" ry="120" fill="#c86a6a" opacity=".18"/>` +
    `<path d="M${X - 30},${Y - 230} Q${X - 40},${Y - 140} ${X - 36},${Y - 70} Q${X - 90},${Y - 40} ${X - 70},${Y - 6} Q${X},${Y + 14} ${X + 70},${Y - 6} Q${X + 90},${Y - 40} ${X + 36},${Y - 70} Q${X + 30},${Y - 140} ${X + 34},${Y - 230}Z" fill="url(#frBone)"/>` +
    `<path d="M${X - 74},${Y - 10} Q${X},${Y + 12} ${X + 74},${Y - 10}" stroke="url(#frCart)" stroke-width="14" fill="none"/>` +
    `<g transform="rotate(${bend.toFixed(1)},${X},${Y})"><path d="M${X - 80},${Y + 22} Q${X},${Y + 6} ${X + 80},${Y + 22} L${X + 60},${Y + 70} Q${X + 34},${Y + 150} ${X + 36},${Y + 230} L${X - 36},${Y + 230} Q${X - 34},${Y + 150} ${X - 60},${Y + 70}Z" fill="url(#frBone)"/><path d="M${X - 78},${Y + 20} Q${X},${Y + 4} ${X + 78},${Y + 20}" stroke="url(#frCart)" stroke-width="12" fill="none"/></g>` +
    `<ellipse cx="${X + 96}" cy="${Y - 30}" rx="24" ry="34" fill="url(#frBone)"/>${FRL(X, Y + 280, 'غضروفُ الركبة', 1, '#9ad8ff', 28)}</g>`;
  // ice on ice: a block of ice sliding on ice
  const ix = 520 + Math.sin(T * 1.2) * 30;
  s += `<g opacity="${a.toFixed(2)}"><rect x="420" y="660" width="260" height="60" rx="6" fill="url(#frIce)"/><rect x="${(ix - 60).toFixed(1)}" y="560" width="120" height="100" rx="10" fill="url(#frIce)" opacity=".95"/><path d="M${(ix - 50).toFixed(1)},572 l30,0 l-24,40Z" fill="#fff" opacity=".5"/>${FRL(550, 770, 'جليدٌ على جليد', 1, '#cfe8f8', 28)}</g>`;
  // the bars: how hard each one rubs (lower = smoother)
  const bar = (y, w, col, tx, k) => `<g opacity="${clamp(k * 3).toFixed(2)}">${FRL(600, y + 30, tx, 1, '#fff', 26)}<rect x="110" y="${y}" width="${Math.max(8, 360 * w * k).toFixed(1)}" height="40" rx="12" fill="${col}"/></g>`, pa = ease(ramp(t, WS(9, 1), WS(9, 2) + .3));
  if (pa > 0) s += panel(60, 890, 600, 290, pa) + FRL(360, 940, 'كم يحتكّ؟', pa, '#f4c76b', 28) + bar(990, .2, '#7ae08a', 'الركبة', b1) + bar(1090, 1, '#9ad8ff', 'جليد/جليد', b2);
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 12) - .3, WS(10, 12) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneMicro }, { s: S0(2) - .2, f: sceneFoot }, { s: S0(3) - .2, f: sceneFall }, { s: S0(4) - .2, f: sceneCars }, { s: S0(5) - .2, f: sceneKnot },
  { s: S0(6) - .2, f: sceneRain }, { s: S0(7) - .2, f: sceneSlope }, { s: S0(8) - .2, f: sceneBack }, { s: S0(9) - .2, f: sceneKnee }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneMicro, sceneFoot, sceneCars, sceneKnot, sceneKnee]);
const XF = .5;
const TLI = [['المشي', S0(2)], ['السيّارات', S0(4)], ['العُقَد', S0(5)], ['المطر', S0(6)], ['الجبال', S0(7)], ['العودة', S0(8)]];
const LIST_ON = new Set([sceneSlope]);
const CHIPS = [
  ['c0', '٥ ثوانٍ بلا احتكاك', 360, 330, 'big', WS(0, 6), S0(1) - .3],
  ['c1', 'قوّةٌ خفيّة', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c2', 'الثانيةُ الأولى', 360, 330, 'big', WS(2, 1), WS(2, 7) - .1],
  ['c3', 'في كلِّ مكان', 360, 330, 'red big', WS(3, 1), S0(4) - .3],
  ['c4', 'لا توقّف… لا انعطاف', 360, 330, 'red big', WS(4, 4), S0(5) - .3],
  ['c6', '≈ ٢٠٠ كم/ساعة', 360, 330, 'red big', WS(6, 10), S0(7) - .3],
  ['c7', 'انهياراتٌ أرضيّة', 360, 330, 'big', WS(7, 4), S0(8) - .3],
  ['c8', 'عادَ الاحتكاك', 360, 330, 'big', WS(8, 1), S0(9) - .3],
  ['c9', 'أنعمُ من الجليد', 360, 330, 'big', WS(9, 5), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 12) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">٥ ثوانٍ بلا احتكاك</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
