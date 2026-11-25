// mm_a.js (#82): what if every human suddenly lost their memory? Built on the #81 chain (streetD, hero, brainSide, books, bike, gear, glE, CITY).
const h1 = v => (+v).toFixed(1);
const ML = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const MMD = `<linearGradient id="mmWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d8bc"/><stop offset="1" stop-color="#c8b494"/></linearGradient>
<linearGradient id="mmFloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a87a52"/><stop offset="1" stop-color="#6a4a2e"/></linearGradient>
<linearGradient id="mmBeam" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff4d0" stop-opacity=".55"/><stop offset="1" stop-color="#fff4d0" stop-opacity="0"/></linearGradient>
<linearGradient id="mmPhone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a4e58"/><stop offset=".5" stop-color="#1c1e24"/><stop offset="1" stop-color="#3a3c44"/></linearGradient>
<linearGradient id="mmScr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a6a"/><stop offset=".6" stop-color="#4a3a6a"/><stop offset="1" stop-color="#1a1a3a"/></linearGradient>
<linearGradient id="mmLib" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2618"/><stop offset="1" stop-color="#1a1008"/></linearGradient>
<radialGradient id="mmSpot" cx=".5" cy=".3" r=".7"><stop offset="0" stop-color="#ffe8b0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe8b0" stop-opacity="0"/></radialGradient>
<radialGradient id="mmGlowG"><stop offset="0" stop-color="#7ae08a" stop-opacity=".9"/><stop offset="1" stop-color="#7ae08a" stop-opacity="0"/></radialGradient>
<radialGradient id="mmGlowR"><stop offset="0" stop-color="#ff6a5a" stop-opacity=".9"/><stop offset="1" stop-color="#ff6a5a" stop-opacity="0"/></radialGradient>`;
const MMDEFS = () => `${LDEFS()}${IQDEF}${MMD}`;
const MMBLK = [[-14, 150, 440, '#a8866a', 851, 0], [136, 160, 400, '#5e7a8e', 852, 1], [296, 150, 470, '#c0a888', 853, 2], [446, 160, 390, '#8a6a74', 854, 0], [606, 150, 450, '#6a8a7a', 855, 1]];
const MMSHOP = [[-4, 140, 'زهور', '#3a7a4a'], [146, 150, 'مقهى', '#6a3a2a'], [306, 130, 'نظّارات', '#2a4a7a'], [456, 140, 'ألعاب', '#a8602a'], [606, 140, 'هواتف', '#3a3a5a']];
const mmStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: MMBLK, shops: MMSHOP }, o));
// a gold question mark that pops in
const qm = (x, y, a, s = 1) => a <= 0 ? '' : `<text x="${h1(x)}" y="${h1(y)}" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${h1(54 * s * (.6 + .4 * Math.min(1, a * 1.4)))}" fill="#f4c76b" opacity="${h1(Math.min(1, a))}" style="paint-order:stroke" stroke="#2a1a08" stroke-width="4">؟</text>`;
// a thought cloud with tiny memories (home, a heart, two faces); k = 1 whole, it bursts as k -> 0
function memCloud(x, y, s, k, seed) {
  if (k <= 0) return '';
  const R = RS(seed), j = (1 - k) * 60;
  let c = ''; [[-34, 0, 30], [0, -16, 36], [36, 0, 30], [0, 14, 30], [-20, 16, 22], [22, 16, 22]].forEach(([cx, cy, r]) => { c += `<circle cx="${h1(cx + (R() - .5) * j)}" cy="${h1(cy + (R() - .5) * j)}" r="${r}" fill="#fff"/>`; });
  const ic = `<path d="M-46,4 l12,-12 l12,12 v12 h-24Z" fill="#c8643a"/><rect x="-38" y="8" width="7" height="8" fill="#6a3a1a"/><path d="M0,-8 c-6,-8 -16,-2 -10,6 l10,10 l10,-10 c6,-8 -4,-14 -10,-6Z" fill="#e04a5a"/><circle cx="30" cy="-2" r="7" fill="#e0a878"/><circle cx="44" cy="2" r="6" fill="#c8906a"/><path d="M22,14 q8,-10 16,0 M38,16 q6,-8 12,0" stroke="#3a5a8a" stroke-width="5" fill="none"/>`;
  return `<g opacity="${h1(Math.min(1, k * 1.5))}" transform="translate(${h1(x)},${h1(y)}) scale(${s})"><circle cx="-6" cy="58" r="7" fill="#fff"/><circle cx="-12" cy="76" r="4.5" fill="#fff"/><g filter="url(#blur2)" opacity=".25" transform="translate(4,6)">${c.replace(/#fff/g, '#000')}</g>${c}<g transform="scale(.9)">${ic}</g></g>`;
}
// ---------- 0: hook: people lose their memories at once ----------
const MMP = [[70, 1062, 1, 1, .64, 0], [230, 1092, -1, 2, .7, 1.7], [390, 1050, 1, 3, .62, 3.1], [540, 1084, -1, 5, .7, .6], [680, 1056, -1, 7, .64, 2.4]];
function sceneHook(t) {
  const tb = WS(0, 6), burst = 1 - ease(ramp(t, tb - .1, tb + .5)), stop = tb + .1, q = ramp(t, tb + .4, tb + 1);
  let top = '', fx = '';
  MMP.forEach(([x0, y, f, pi, sc, ph0], j) => { const T = Math.min(t, stop), x = x0 + f * 32 * T, w = t < stop, look = !w && Math.sin(t * 2.2 + j) > .3, fc = look ? -f : f;
    top += hero(x, y, Object.assign({ s: sc, face: fc, shade: 1, walk: w ? T * 4.2 + ph0 : null, lookUp: w ? 0 : .15, hF: !w && j % 2 ? [x + fc * 6 * sc, y - 300 * sc] : undefined }, gp(pi)));
    const hy = y - 330 * sc; fx += memCloud(x + f * 10, hy - 160 * sc, sc * 1.6, burst, 40 + j) + (burst > 0 && burst < 1 ? sparkles(x, hy - 60 * sc, 160 * sc, 140 * sc, 14, t, 1 - burst, 50 + j) : '') + qm(x + 4, hy - 20 * sc, q * (1 + .08 * Math.sin(t * 6 + j)), sc * 1.9); });
  let s = `<defs>${MMDEFS()}</defs>` + mmStreet(t, { id: 'm0', top: top + fx });
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: you wake up and know no one, not even yourself ----------
function sceneWake(t) {
  const st = S0(1) - .2, T = t - st, ph = ease(ramp(t, WS(1, 3), WS(1, 4) + .3)), fam = ease(ramp(t, WS(1, 6), WS(1, 7) + .3)), nm = ease(ramp(t, WS(1, 3), WS(1, 4)));
  let s = `<defs>${MMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mmWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  // window with morning light
  s += `<rect x="80" y="300" width="230" height="300" rx="6" fill="#8a6a4a"/><rect x="92" y="312" width="206" height="276" fill="#bfe2f8"/><rect x="92" y="312" width="206" height="276" fill="#fff4d0" opacity=".35"/><path d="M195,312 v276 M92,450 h206" stroke="#8a6a4a" stroke-width="8"/>` +
    `<path d="M92,588 L298,588 L640,1180 L-20,1180Z" fill="url(#mmBeam)"/><path d="M60,290 Q120,420 70,620 L40,620 L40,290Z M330,290 Q270,420 320,620 L350,620 L350,290Z" fill="#b84a3a"/>`;
  // a family photo whose faces fade to question marks
  s += `<rect x="440" y="330" width="170" height="130" rx="4" fill="#5a3a22"/><rect x="452" y="342" width="146" height="106" fill="#d8e4ec"/>` + [[490, 400, '#e0a878'], [525, 392, '#c8906a'], [560, 410, '#e8b890']].map(([x, y, c], i) => `<g opacity="${h1(1 - ph)}"><circle cx="${x}" cy="${y - 16}" r="12" fill="${c}"/><path d="M${x - 16},${y + 30} q16,-30 32,0Z" fill="${['#3a6a9a', '#9a3a4a', '#4a8a5a'][i]}"/></g>`).join('') + qm(525, 418, ph, .9);
  s += `<rect x="-20" y="1000" width="760" height="320" fill="url(#mmFloor)"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-20" y="992" width="760" height="12" fill="#6a4a2e"/>`;
  // the bed
  s += `<rect x="-60" y="820" width="300" height="200" rx="10" fill="#7a5232"/><rect x="-60" y="860" width="300" height="70" rx="14" fill="#f2efe8"/><path d="M-60,880 Q60,850 140,880 Q200,900 250,940 L250,990 L-60,990Z" fill="#5a7aa8"/><path d="M-50,900 Q60,872 160,904" stroke="#4a6a98" stroke-width="6" fill="none" opacity=".6"/><ellipse cx="0" cy="862" rx="60" ry="22" fill="#fff"/>`;
  // the door with the family
  s += `<rect x="520" y="560" width="190" height="450" fill="#6a4a2e"/><rect x="532" y="572" width="166" height="430" fill="${mix('#3a2a1e', '#e8d8bc', fam * .6)}"/>`;
  if (fam > 0) s += `<g opacity="${h1(fam)}">` + hero(580, 1000, Object.assign({ s: 1.15, face: -1, shade: 1, aF: [.3, .9] }, gp(2))) + hero(650, 1000, Object.assign({ s: .7, face: -1, shade: 1 }, gp(6))) + qm(580, 560, fam, 1.1) + qm(650, 740, fam, .9) + `</g>`;
  // you, hand on your head
  s += hero(330, 1080, Object.assign({ s: 1.4, face: 1, shade: 1, hF: [330 + 30 * 1.4, 1080 - 300 * 1.4], aB: [-.1, .3], lookUp: -.1 * Math.sin(T) }, { top: '#6a8ab8', pants: '#4a5a7a', skin: '#c89070', hair: '#2a1e18' }));
  s += qm(360, 1080 - 400 * 1.4, ease(ramp(t, WS(1, 2), WS(1, 3))) * (1 + .05 * Math.sin(T * 5)), 1.4);
  if (nm > 0) s += `<g opacity="${h1(nm)}"><rect x="200" y="${h1(470 - 10 * nm)}" width="190" height="64" rx="28" fill="#fff"/><path d="M290,${h1(532 - 10 * nm)} l14,26 l10,-26Z" fill="#fff"/>${ML(295, 512 - 10 * nm, 'اسمي…؟', 1, '#1c2230', 32)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: eight billion strangers: question marks over the cities of the night Earth ----------
function sceneGlobe(t) {
  const st = S0(2) - .2, G = glE(t, { d: 9.6, el: .3, lon: 30 + (t - st) * 4, clouds: .3, lights: .95, tg: [0, .2, 0], off: 1.6 });
  let ov = '';
  CITY.forEach(([la, lo], i) => { const v = G.vis(la, lo); if (v < .2) return; const [x, y] = G.P(la, lo), a = ease(ramp(t, WS(2, 4) + (i % 14) * .12, WS(2, 4) + (i % 14) * .12 + .4)) * clamp((v - .2) / .2);
    if (a > 0) ov += qm(x, y - 6, a * (1 + .06 * Math.sin(t * 5 + i)), .6); });
  F.ov = ov; return space(t);
}
// ---------- 3: forgotten passwords: phones and bank accounts lock ----------
function scenePhone(t) {
  const st = S0(3) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), lk = ease(ramp(t, WS(3, 3), WS(3, 4))), bk = ease(ramp(t, WS(3, 5) - .1, WS(3, 5) + .4));
  let s = `<defs>${MMDEFS()}</defs>` + studio('stM3', '#1e2a44', '#04060e', 7);
  const X = 180, Y = 300, W = 360, H = 700, sh = lk > 0 && lk < 1 ? Math.sin(T * 60) * 10 * (1 - lk) : 0;
  // the entered code: dots fill, fail, refill, fail
  const cyc = pmod(T * 1.2, 1), dots = lk > 0 ? 0 : Math.floor(cyc * 5);
  let scr = `<rect x="0" y="0" width="${W}" height="${H}" rx="34" fill="url(#mmScr)"/><text x="${W / 2}" y="110" text-anchor="middle" font-family="Inter" font-weight="300" font-size="78" fill="#fff">8:30</text>`;
  scr += ML(W / 2, 190, lk > 0 ? 'الهاتفُ مقفل' : 'أدخل رمزَ المرور', 1, lk > 0 ? '#ff7a6a' : '#fff', 28);
  for (let i = 0; i < 4; i++) scr += `<circle cx="${W / 2 - 54 + i * 36}" cy="235" r="9" fill="${i < dots ? '#fff' : 'none'}" stroke="#fff" stroke-width="2"/>`;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) { const n = r === 3 ? (c === 1 ? '0' : '') : String(r * 3 + c + 1); if (!n) continue; scr += `<circle cx="${80 + c * 100}" cy="${320 + r * 92}" r="38" fill="#fff" opacity=".14"/><text x="${80 + c * 100}" y="${334 + r * 92}" text-anchor="middle" font-family="Inter" font-size="38" fill="#fff">${n}</text>`; }
  if (lk > 0) scr += `<g opacity="${h1(lk)}"><rect x="0" y="0" width="${W}" height="${H}" rx="34" fill="#0a0e1a" opacity=".6"/><rect x="${W / 2 - 50}" y="380" width="100" height="80" rx="12" fill="#ff7a6a"/><path d="M${W / 2 - 32},380 v-30 a32,32 0 0 1 64,0 v30" stroke="#ff7a6a" stroke-width="14" fill="none"/></g>`;
  s += `<g opacity="${h1(a)}" transform="translate(${h1(sh)},0)"><rect x="${X - 14}" y="${Y - 14}" width="${W + 28}" height="${H + 28}" rx="46" fill="url(#mmPhone)"/><g transform="translate(${X},${Y})">${scr}</g><rect x="${X + W / 2 - 40}" y="${Y + 10}" width="80" height="22" rx="11" fill="#000"/></g>`;
  // the bank card, refused
  if (bk > 0) s += `<g opacity="${h1(bk)}" transform="translate(${h1(40 * (1 - bk))},0)">${panel(300, 930, 380, 250)}<rect x="330" y="960" width="200" height="126" rx="12" fill="#2a6a5a"/><rect x="350" y="990" width="40" height="30" rx="5" fill="#e8c86a"/><path d="M350,1056 h150" stroke="#fff" stroke-width="5" opacity=".6"/>` +
    `<circle cx="610" cy="1020" r="42" fill="none" stroke="#ff7a6a" stroke-width="8"/><path d="M580,1050 L640,990" stroke="#ff7a6a" stroke-width="8"/>${ML(490, 1140, 'الحسابُ مقفل', 1, '#ff7a6a', 30)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: the doctor forgets medicine; the engineer forgets the machines ----------
function sceneWork(t) {
  const st = S0(4) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), b = ease(ramp(t, WS(4, 5) - .2, WS(4, 5) + .3));
  let s = `<defs>${MMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#0c1018"/>`;
  // top: a hospital room
  s += `<g opacity="${h1(a)}"><clipPath id="mmTop"><rect x="20" y="240" width="680" height="470" rx="18"/></clipPath><g clip-path="url(#mmTop)"><rect x="20" y="240" width="680" height="470" fill="#d8e8e8"/><rect x="20" y="600" width="680" height="110" fill="#a8b8b8"/>` +
    `<rect x="470" y="300" width="170" height="120" rx="8" fill="#1a2a2a"/><path d="M480,370 h40 l10,-30 l14,60 l12,-40 l8,10 h66" stroke="#7ae08a" stroke-width="4" fill="none"/><rect x="540" y="420" width="10" height="190" fill="#8a9a9a"/>` +
    `<rect x="40" y="520" width="240" height="40" rx="8" fill="#f2f2ee"/><rect x="40" y="556" width="240" height="14" fill="#8a9aa0"/><path d="M60,570 v40 M260,570 v40" stroke="#6a7a80" stroke-width="6"/>` +
    hero(380, 690, Object.assign({ s: 1.05, face: -1, shade: 1, hF: [380 - 50, 690 - 230], hB: [380 + 6, 690 - 340] }, { top: '#f2f4f0', pants: '#3a4a5a', skin: '#c89070', hair: '#3a2a1e' })) +
    `<path d="M${380 - 10},${690 - 232} q-14,30 -4,60 q10,20 24,4" stroke="#2a2a30" stroke-width="3" fill="none"/><rect x="${380 - 74}" y="${690 - 262}" width="34" height="46" rx="3" fill="#fff" stroke="#8a8a8a"/>` + qm(380, 690 - 360, a * (1 + .05 * Math.sin(T * 5)), 1.1) + `</g></g>`;
  // bottom: a factory floor with gears
  s += `<g opacity="${h1(b)}"><clipPath id="mmBot"><rect x="20" y="730" width="680" height="470" rx="18"/></clipPath><g clip-path="url(#mmBot)"><rect x="20" y="730" width="680" height="470" fill="#3a3e46"/><rect x="20" y="1100" width="680" height="100" fill="#2a2c30"/>` +
    gear(520, 900, 90, 14, T * .3, '#8a7a5a') + gear(640, 1000, 60, 10, -T * .45, '#7a6a4a') + gear(430, 1030, 50, 9, -T * .5, '#9a8a6a') + `<rect x="560" y="1040" width="120" height="60" fill="#5a5e66"/>` +
    hero(220, 1180, Object.assign({ s: 1.05, face: 1, shade: 1, hF: [220 + 8, 1180 - 350], aB: [-.1, .3] }, { top: '#e8a838', pants: '#2a3a5a', skin: '#b8805a', hair: '#2a1e18' })) +
    `<path d="M${220 - 18},${1180 - 362} q22,-24 46,0 v6 h-46Z" fill="#f4c020"/>` + qm(230, 1180 - 400, b * (1 + .05 * Math.sin(T * 5 + 1)), 1.1) + `</g></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: but knowledge is kept in millions of books and on the internet ----------
function sceneLib(t) {
  const st = S0(5) - .2, T = t - st, g = ease(ramp(t, WS(5, 6), WS(5, 8))), net = ease(ramp(t, WS(5, 10) - .2, WS(5, 11) + .2));
  let s = `<defs>${MMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#mmLib)"/>`;
  for (let r = 0; r < 7; r++) { const y = 360 + r * 120; s += `<rect x="-20" y="${y}" width="760" height="12" fill="#5a3a20"/>` + books(-10, y, 740, 96, 300 + r); }
  s += `<rect x="-20" y="250" width="40" height="1000" fill="#4a2e18"/><rect x="700" y="250" width="40" height="1000" fill="#4a2e18"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#mmSpot)"/>`;
  if (g > 0) s += `<rect x="-20" y="340" width="760" height="860" fill="#ffd36a" opacity="${h1(.18 * g)}"/>` + sparkles(360, 760, 680, 820, 40, t, g, 66);
  // the laptop with a glowing network
  if (net > 0) { s += `<g opacity="${h1(net)}">${panel(150, 830, 420, 330)}<path d="M200,1120 h320 l30,26 h-380Z" fill="#9aa0a8"/><rect x="215" y="870" width="290" height="240" rx="8" fill="#1a1e28"/><rect x="225" y="880" width="270" height="220" fill="#0e2240"/>`;
    const N = [[260, 920], [330, 960], [420, 910], [460, 990], [300, 1040], [390, 1060], [250, 1000], [470, 1060]];
    [[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [3, 5], [0, 6], [6, 4], [5, 7], [3, 7]].forEach(([i, j]) => { s += `<path d="M${N[i][0]},${N[i][1]} L${N[j][0]},${N[j][1]}" stroke="#4aa8ff" stroke-width="2" opacity=".7"/>`; });
    N.forEach(([x, y], i) => { s += `<circle cx="${x}" cy="${y}" r="${h1(6 + 2 * Math.sin(t * 4 + i))}" fill="#9ad8ff"/>`; }); s += `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the surprise: you still walk, talk, read and maybe ride your bike ----------
function sceneSkills(t) {
  const st = S0(6) - .2, T = t - st, k = [WS(6, 2), WS(6, 3), WS(6, 4), WS(6, 6)].map(w => ease(ramp(t, w - .15, w + .25)));
  // the cyclist: hips on the saddle, feet on turning pedals (inverse kinematics), hands on the bar
  const bx = lerp(-160, 860, ramp(t, WS(6, 5), S0(7) + .5)), by = 1230, bs = 1.75, sh = .72, cr = T * 7;
  const seat = [bx - 20 * bs, by - 66 * bs], hp = [seat[0], seat[1] - 4];
  const pedal = ph => [bx - 10 * bs + Math.cos(ph) * 13 * bs, by - 24 * bs + Math.sin(ph) * 13 * bs];
  const legTo = p => ik(0, -150, (p[0] - hp[0]) / sh, (p[1] - hp[1]) / sh - 150, 76, 74, 1);
  const rider = k[3] > 0 ? bike(bx, by, bs, '#c83a2a') + hero(hp[0], hp[1] + 150 * sh, Object.assign({ s: sh, face: 1, shade: 1, hipY: -150, lean: 18, lF: legTo(pedal(cr)), lB: legTo(pedal(cr + Math.PI)), hF: [bx + 26 * bs, by - 72 * bs], hB: [bx + 24 * bs, by - 70 * bs] }, gp(5))) : '';
  let top = hero(lerp(60, 200, ramp(t, st, WS(6, 4))), 1070, Object.assign({ s: .66, face: 1, shade: 1, walk: T * 4.2, amp: .5 }, gp(1))) +
    hero(380, 1094, Object.assign({ s: .7, face: 1, shade: 1, aF: [.5, -.6 + .3 * Math.sin(T * 4)] }, gp(3))) + hero(470, 1094, Object.assign({ s: .7, face: -1, shade: 1 }, gp(4))) +
    `<rect x="560" y="1062" width="130" height="10" fill="#6a4a2a"/><rect x="566" y="1072" width="8" height="24" fill="#3a3a3a"/><rect x="676" y="1072" width="8" height="24" fill="#3a3a3a"/>` +
    hero(620, 1094, Object.assign({ s: .64, face: -1, shade: 1, hipY: -96, lF: [1.5, .05], lB: [1.4, .1], hF: [600, 1094 - 150], hB: [596, 1094 - 146] }, gp(7))) + `<path d="M586,${1094 - 158} l-22,-10 l0,28 l22,8Z M586,${1094 - 158} l18,-12 l0,28 l-18,10Z" fill="#f4eee0" stroke="#8a6a3a" stroke-width="1.5"/>`;
  const tag = (x, y, tx, a) => a <= 0 ? '' : `<g opacity="${h1(a)}"><ellipse cx="${x}" cy="${y + 6}" rx="70" ry="12" fill="none" stroke="#f4c76b" stroke-width="4"/>${ML(x, y + 52, tx, 1, '#f4c76b', 28)}</g>`;
  top += tag(lerp(60, 200, ramp(t, st, WS(6, 4))), 1070, 'تمشي', k[0]) + `<g opacity="${h1(k[1])}"><rect x="330" y="760" width="150" height="58" rx="26" fill="#fff"/><path d="M390,816 l-6,22 l20,-22Z" fill="#fff"/>${ML(405, 800, 'مرحباً!', 1, '#1c2230', 28)}</g>` + tag(620, 1094, 'تقرأ', k[2]) + rider;
  let s = `<defs>${MMDEFS()}</defs>` + mmStreet(t + 20, { id: 'm6', top });
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: your brain keeps skills in other places than your life memories ----------
function sceneBrain(t) {
  const st = S0(7) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), sk = ease(ramp(t, WS(7, 2) - .2, WS(7, 2) + .3)), mm = ease(ramp(t, WS(7, 9) - .2, WS(7, 9) + .3)), off = ease(ramp(t, WS(7, 10), WS(7, 10) + .8));
  const X = 360, Y = 640, S = 1.6, P = (lx, ly) => [X + lx * S, Y + ly * S];
  let s = `<defs>${MMDEFS()}</defs>` + studio('stM7', '#2a2440', '#06040e', 19) + `<g opacity="${h1(a)}">${brainSide(X, Y, S, 9)}<g transform="translate(${X},${Y}) scale(${S})"><path d="${BRP}" fill="#f2b6be" opacity=".42"/></g>`;
  const cb = P(-96, 70), bg = P(10, -14), hc = P(-12, 38), pul = .85 + .15 * Math.sin(T * 5);
  if (sk > 0) s += `<circle cx="${h1(cb[0])}" cy="${h1(cb[1])}" r="${h1(100 * pul)}" fill="url(#mmGlowG)" opacity="${h1(sk * .85)}"/><circle cx="${h1(bg[0])}" cy="${h1(bg[1])}" r="${h1(70 * pul)}" fill="url(#mmGlowG)" opacity="${h1(sk * .75)}"/>` +
    `<g opacity="${h1(sk)}"><path d="M${h1(cb[0])},${h1(cb[1] + 40)} L150,960" stroke="#7ae08a" stroke-width="3"/><path d="M${h1(bg[0])},${h1(bg[1] - 40)} L470,380" stroke="#7ae08a" stroke-width="3"/>${ML(150, 1000, 'المهارات', 1, '#7ae08a', 34)}${ML(470, 360, 'المهارات', 1, '#7ae08a', 30)}</g>`;
  if (mm > 0) { const r = (1 - off * .85); s += `<path d="M${h1(hc[0] - 50)},${h1(hc[1] + 10)} q20,-30 50,-14 q30,14 30,40 q-6,20 -24,14" stroke="#ff8a7a" stroke-width="14" fill="none" stroke-linecap="round" opacity="${h1(mm * r)}"/><circle cx="${h1(hc[0])}" cy="${h1(hc[1])}" r="${h1(80 * pul)}" fill="url(#mmGlowR)" opacity="${h1(mm * .8 * r)}"/>` +
    `<g opacity="${h1(mm)}"><path d="M${h1(hc[0] + 30)},${h1(hc[1] + 40)} L520,980" stroke="#ff8a7a" stroke-width="3"/>${ML(540, 1020, 'ذكرياتُ حياتِك', 1, '#ff8a7a', 32)}</g>`;
    if (off > 0 && off < 1) s += sparkles(hc[0], hc[1], 160, 120, 20, t, 1 - off, 77); }
  s += `</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: Clive Wearing forgot his whole life but still played the piano ----------
function scenePiano(t) {
  const st = S0(8) - .2, T = t - st, a = ease(ramp(t, st, st + .6)), fg = ease(ramp(t, WS(8, 6), WS(8, 8) + .3)), nm = ease(ramp(t, WS(8, 4) - .2, WS(8, 5) + .2));
  let s = `<defs>${MMDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#140e0a"/><ellipse cx="380" cy="700" rx="420" ry="520" fill="url(#mmSpot)"/><rect x="-20" y="1060" width="760" height="260" fill="#2a1a10"/><ellipse cx="400" cy="1070" rx="330" ry="40" fill="#ffe8b0" opacity=".12"/>`;
  // the old photos around him, dissolving as his memories go
  [[120, 360, -8], [560, 330, 7], [610, 560, -5], [90, 600, 6]].forEach(([x, y, r], i) => { const o = 1 - fg; if (o <= 0) return; s += `<g opacity="${h1(o * .9)}" transform="rotate(${r},${x},${y})"><rect x="${x - 60}" y="${y - 46}" width="120" height="92" fill="#f2ead8"/><rect x="${x - 52}" y="${y - 38}" width="104" height="64" fill="${['#8aa8c0', '#c0a080', '#9ab88a', '#b890a0'][i]}"/><circle cx="${x - 10}" cy="${y - 10}" r="10" fill="#e0a878"/><path d="M${x - 26},${y + 24} q16,-26 32,0Z" fill="#4a5a7a"/></g>`; });
  if (fg > 0 && fg < 1) s += sparkles(360, 460, 640, 380, 40, t, 1 - fg, 88);
  // a grand piano (side view) and the pianist
  s += `<g opacity="${h1(a)}"><path d="M260,840 L640,840 C690,840 700,800 670,780 C600,740 560,770 520,760 L260,760Z" fill="#0c0c0e"/><path d="M270,760 L640,700 L646,712 L276,770Z" fill="#1a1a1e"/><path d="M262,770 L640,770" stroke="#3a3a40" stroke-width="3"/>` +
    `<rect x="230" y="800" width="60" height="22" fill="#f4f0e8"/><rect x="230" y="800" width="60" height="6" fill="#1a1a1a"/><rect x="290" y="840" width="16" height="200" fill="#0c0c0e"/><rect x="600" y="840" width="16" height="200" fill="#0c0c0e"/><path d="M262,774 Q440,760 640,778" stroke="#fff" stroke-width="2" opacity=".15"/>` +
    `<rect x="60" y="930" width="130" height="16" rx="4" fill="#3a2414"/><rect x="70" y="946" width="12" height="100" fill="#2a1a10"/><rect x="170" y="946" width="12" height="100" fill="#2a1a10"/>`;
  const hand = T * 8;
  s += hero(140, 1060, Object.assign({ s: 1.05, face: 1, shade: 1, hipY: -108, lF: [1.45, .05], lB: [1.35, .12], lean: 8, hF: [236 + 8 * Math.sin(hand), 800 - 3 * Math.abs(Math.cos(hand))], hB: [256 + 10 * Math.sin(hand + 1.3), 802 - 3 * Math.abs(Math.cos(hand + 1.3))] }, { top: '#3a3a44', pants: '#2a2a30', skin: '#e0b090', hair: '#8a8a8a' })) + `</g>`;
  // notes rising
  for (let i = 0; i < 8; i++) { const p = pmod(T * .35 + i / 8, 1), x = 320 + i * 40 + Math.sin(p * 6 + i) * 20, y = 760 - p * 520; s += `<text x="${h1(x)}" y="${h1(y)}" font-family="serif" font-size="${30 + (i % 3) * 8}" fill="#f4c76b" opacity="${h1(Math.sin(p * Math.PI) * .9 * a)}">${i % 2 ? '♪' : '♫'}</text>`; }
  if (nm > 0) s += `<g opacity="${h1(nm)}">${panel(150, 1110, 420, 110)}${ML(360, 1160, 'كلايف ويرينغ', 1, '#f4c76b', 32)}${ML(360, 1200, 'موسيقيٌّ بريطانيّ — فقدَ ذاكرتَه عام ١٩٨٥', 1, '#fff', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(9)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 13) - .3, WS(9, 13) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWake }, { s: S0(2) - .2, f: sceneGlobe }, { s: S0(3) - .2, f: scenePhone }, { s: S0(4) - .2, f: sceneWork },
  { s: S0(5) - .2, f: sceneLib }, { s: S0(6) - .2, f: sceneSkills }, { s: S0(7) - .2, f: sceneBrain }, { s: S0(8) - .2, f: scenePiano }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([scenePhone, sceneWork, sceneBrain]);
const XF = .5;
const TLI = [['الاستيقاظ', S0(1)], ['الغرباء', S0(2)], ['كلماتُ السرّ', S0(3)], ['المعرفة', S0(5)], ['المهارات', S0(6)], ['الدماغ', S0(7)]];
const LIST_ON = new Set([sceneLib]);
const CHIPS = [
  ['c0', 'نسيانٌ تامّ', 360, 330, 'red big', WS(0, 7), S0(1) - .3],
  ['c2', '٨ ملياراتِ غريب', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c5', 'المعرفةُ محفوظة', 360, 330, 'big', WS(5, 6), S0(6) - .3],
  ['c6', 'المهاراتُ باقية', 360, 330, 'big', WS(6, 1), S0(7) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 13) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لو نسينا كلَّ شيء</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
