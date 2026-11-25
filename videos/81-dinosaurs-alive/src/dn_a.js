// dn_a.js (#81): what if the dinosaurs were still alive? Built on the #80 chain (streetD, hero, quad, glE, studio).
const g1 = v => (+v).toFixed(1);
const arD = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const arDC = n => arD(String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));
const DL = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const DND = `<linearGradient id="dnRex" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e6440"/><stop offset=".55" stop-color="#7a7c50"/><stop offset="1" stop-color="#b4a878"/></linearGradient>
<linearGradient id="dnSau" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6e7466"/><stop offset=".6" stop-color="#8a8a76"/><stop offset="1" stop-color="#b0a890"/></linearGradient>
<radialGradient id="dnRock" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9a8a78"/><stop offset=".6" stop-color="#5a4c40"/><stop offset="1" stop-color="#2a221c"/></radialGradient>
<linearGradient id="dnTrail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd27a" stop-opacity="0"/><stop offset=".7" stop-color="#ff9a3a" stop-opacity=".7"/><stop offset="1" stop-color="#fff4d0" stop-opacity="1"/></linearGradient>
<radialGradient id="dnFlash"><stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#fff0b0" stop-opacity=".9"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
<radialGradient id="dnDust"><stop offset="0" stop-color="#5a4434" stop-opacity=".9"/><stop offset=".7" stop-color="#6a5442" stop-opacity=".55"/><stop offset="1" stop-color="#6a5442" stop-opacity="0"/></radialGradient>
<linearGradient id="dnHen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8743a"/><stop offset="1" stop-color="#8a4420"/></linearGradient>
<linearGradient id="dnNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1428"/><stop offset=".7" stop-color="#16263a"/><stop offset="1" stop-color="#1a2a22"/></linearGradient>
<linearGradient id="dnMeadow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa04a"/><stop offset="1" stop-color="#4a6a2a"/></linearGradient>
<linearGradient id="dnSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a82c0"/><stop offset=".65" stop-color="#a6cce8"/><stop offset="1" stop-color="#f2e4c8"/></linearGradient>
<linearGradient id="dnLeg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#14170f"/><stop offset=".55" stop-color="#363a2c"/><stop offset=".88" stop-color="#262a1e"/><stop offset="1" stop-color="#6a7060"/></linearGradient>
<linearGradient id="dnWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8b4aa"/><stop offset="1" stop-color="#7a766c"/></linearGradient>`;
const DNDEFS = () => `${LDEFS()}${DND}`;
const DNBLK = [[-14, 160, 420, '#9a7a66', 831, 2], [146, 150, 470, '#6a8090', 832, 0], [296, 160, 380, '#c8b090', 833, 1], [456, 150, 450, '#86626a', 834, 2], [606, 150, 400, '#6a8a76', 835, 0]];
const DNSHOP = [[-4, 150, 'مطعم', '#8a3a2a'], [156, 130, 'هدايا', '#3a5a8a'], [306, 140, 'فواكه', '#4a7a3a'], [456, 140, 'مخبز', '#a8602a'], [606, 130, 'كتب', '#2a4a7a']];
const dnStreet = (t, o = {}) => streetD(t, Object.assign({ blocks: DNBLK, shops: DNSHOP }, o));
// ---------- the T. rex head (facing right; origin = where the neck meets the skull) ----------
function rexHead(jaw = 0, o = {}) {
  const ja = 8 + 34 * jaw, R = (px, py) => { const a = ja * Math.PI / 180; return [px * Math.cos(a) - (py - 12) * Math.sin(a), px * Math.sin(a) + (py - 12) * Math.cos(a) + 12]; };
  const l0 = R(0, 14), l1 = R(168, 2);
  let s = `<path d="M-2,8 L170,-3 L${g1(l1[0])},${g1(l1[1])} L${g1(l0[0])},${g1(l0[1])}Z" fill="#5a1418"/><path d="M20,10 L160,0 L${g1(R(150, 6)[0])},${g1(R(150, 6)[1])} L${g1(R(20, 14)[0])},${g1(R(20, 14)[1])}Z" fill="#a83a3e" opacity=".7"/>`;
  // lower jaw with its teeth
  let lt = ''; for (let i = 0; i < 9; i++) { const x = 34 + i * 14, y = 14 - x * (12 / 168), a = R(x, y), b = R(x + 5, y - 10), c = R(x + 10, y); lt += `<path d="M${g1(a[0])},${g1(a[1])} L${g1(b[0])},${g1(b[1])} L${g1(c[0])},${g1(c[1])}Z" fill="#f4eee0"/>`; }
  s += lt + `<g transform="rotate(${g1(ja)},0,12)"><path d="M-6,14 L168,2 C170,14 162,22 140,27 C100,35 40,40 -4,36 Z" fill="url(#dnRex)"/><path d="M-4,30 C40,36 100,32 150,22" stroke="#d8c8a0" stroke-width="5" fill="none" opacity=".55"/><path d="M-6,14 L168,2 C170,14 162,22 140,27 C100,35 40,40 -4,36 Z" fill="#000" filter="url(#grainR)" opacity=".25"/></g>`;
  // upper teeth and skull
  let ut = ''; for (let i = 0; i < 10; i++) { const x = 40 + i * 13, y = 6 - (x - 40) * (10 / 132); ut += `<path d="M${x},${g1(y - 1)} L${x + 5},${g1(y + 11 - i * .3)} L${x + 10},${g1(y - 1)}Z" fill="#f6f0e2"/>`; }
  s += ut + `<path d="M-12,-30 C26,-56 108,-54 160,-32 C173,-26 178,-14 174,-4 L40,6 L-12,22 Z" fill="url(#dnRex)"/><path d="M-12,-30 C26,-56 108,-54 160,-32 C173,-26 178,-14 174,-4 L40,6 L-12,22 Z" fill="#000" filter="url(#grainR)" opacity=".28"/>` +
    `<path d="M-8,-30 C30,-52 108,-50 158,-30" stroke="#3a3c24" stroke-width="7" fill="none" opacity=".45"/><path d="M40,2 C80,-2 130,-6 172,-6" stroke="#2a2a1a" stroke-width="2.4" fill="none" opacity=".6"/>` +
    `<path d="M70,-30 Q100,-24 130,-28 Q110,-12 80,-14Z" fill="#000" opacity=".16"/><path d="M38,-34 Q56,-46 74,-36" stroke="#2e3020" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="56" cy="-24" rx="8" ry="7" fill="#e0a22a"/><ellipse cx="57" cy="-24" rx="2.2" ry="6" fill="#140e06"/><circle cx="54" cy="-27" r="1.6" fill="#fff" opacity=".8"/><ellipse cx="163" cy="-21" rx="5" ry="3" fill="#1e1c12"/>` +
    [0, 1, 2, 3].map(i => `<path d="M${90 + i * 14},-40 q5,6 0,12" stroke="#3a3c24" stroke-width="2" fill="none" opacity=".35"/>`).join('');
  return s;
}
// ---------- a T. rex (side view, facing right when f = 1); (x, y) = ground under the hips; ph = walk phase ----------
function trex(x, y, sc, f, ph, o = {}) {
  const jaw = o.jaw || 0, ha = o.head || 0, bob = Math.abs(Math.cos(ph)) * 6, dk = '#4a4c30';
  const leg = (p, far) => { const a = Math.sin(p) * .42, lift = Math.max(0, -Math.cos(p)) * .45, hx = 0, hy = -258 + bob;
    const kx = hx + Math.sin(a + .45) * 125, ky = hy + Math.cos(a + .45) * 125, ax = kx + Math.sin(a - .8 - lift) * 108, ay = ky + Math.cos(a - .8 - lift) * 108, tx = ax + Math.sin(a + .3 + lift * .6) * 70, ty = ay + Math.cos(a + .3 + lift * .6) * 70;
    const c = far ? mix('#6a6c44', '#000000', .35) : '#6e7046';
    return `<path d="M${hx - 10},${hy - 20} L${g1(kx)},${g1(ky)}" stroke="${c}" stroke-width="84" stroke-linecap="round"/><path d="M${g1(kx)},${g1(ky)} L${g1(ax)},${g1(ay)}" stroke="${c}" stroke-width="44" stroke-linecap="round"/><path d="M${g1(ax)},${g1(ay)} L${g1(tx)},${g1(ty)}" stroke="${c}" stroke-width="28" stroke-linecap="round"/>` +
      `<path d="M${g1(tx - 10)},${g1(ty)} L${g1(tx + 44)},${g1(ty + 2)} M${g1(tx - 6)},${g1(ty - 3)} L${g1(tx + 38)},${g1(ty - 8)}" stroke="${c}" stroke-width="15" stroke-linecap="round"/><path d="M${g1(tx + 44)},${g1(ty - 4)} l12,6 l-12,4Z M${g1(tx + 38)},${g1(ty - 13)} l11,5 l-12,4Z" fill="#2a261c"/>` +
      (far ? '' : `<path d="M${hx - 30},${hy - 40} Q${g1(kx - 10)},${g1(ky - 70)} ${g1(kx + 18)},${g1(ky - 10)}" stroke="#000" stroke-width="10" fill="none" opacity=".12" stroke-linecap="round"/>`); };
  const B = `M-470,${-266 + bob} Q-300,${-300 + bob} -120,${-320 + bob} C0,${-334 + bob} 100,${-334 + bob} 170,${-324 + bob} C200,${-330 + bob} 222,${-356 + bob} 238,${-378 + bob} L270,${-338 + bob} C244,${-302 + bob} 214,${-258 + bob} 160,${-236 + bob} C100,${-214 + bob} 20,${-208 + bob} -40,${-222 + bob} C-120,${-238 + bob} -300,${-252 + bob} -470,${-262 + bob} Z`;
  let s = `<g transform="translate(${g1(x)},${g1(y)}) scale(${(f * sc).toFixed(4)},${sc})"><ellipse cx="-20" cy="4" rx="320" ry="20" fill="#000" opacity=".3" filter="url(#blur5)"/>`;
  s += leg(ph + Math.PI, 1) + `<path d="${B}" fill="url(#dnRex)"/><path d="${B}" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    `<path d="M-460,${-266 + bob} Q-300,${-298 + bob} -120,${-318 + bob} C0,${-332 + bob} 100,${-332 + bob} 168,${-322 + bob}" stroke="#3a3c24" stroke-width="12" fill="none" opacity=".4"/>` +
    [-300, -230, -160, -90, -20, 50].map((sx, i) => `<path d="M${sx},${-306 + bob - i * 3} q14,26 6,52" stroke="#3a3c24" stroke-width="9" fill="none" opacity=".22" stroke-linecap="round"/>`).join('') +
    `<path d="M-60,${-224 + bob} C20,${-212 + bob} 110,${-222 + bob} 175,${-250 + bob}" stroke="#d8c89a" stroke-width="16" fill="none" opacity=".35" stroke-linecap="round"/>`;
  s += leg(ph, 0);
  // the small arm
  s += `<path d="M178,${-262 + bob} L200,${-236 + bob} L222,${-242 + bob}" stroke="#666840" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M222,${-242 + bob} l9,-2 M221,${-240 + bob} l7,6" stroke="#2a261c" stroke-width="3.5" stroke-linecap="round"/>`;
  s += `<g transform="translate(250,${-366 + bob}) rotate(${g1(ha)})">${rexHead(jaw)}</g></g>`;
  return s;
}
// ---------- a sauropod (side view, facing right when f = 1); (x, y) = ground; o.neck = neck tilt (deg, + = down) ----------
function saur(x, y, sc, f, ph, o = {}) {
  const nk = o.neck || 0, chew = o.chew || 0;
  const legP = (bx, p, far) => { const a = Math.sin(p) * .16, kx = bx + Math.sin(a) * 112, ky = -212 + Math.cos(a) * 112, fx = kx + Math.sin(a * .4 - .04) * 104, fy = ky + Math.cos(a * .4 - .04) * 104, c = far ? '#5a5e50' : '#787a66';
    return `<path d="M${bx},-222 L${g1(kx)},${g1(ky)}" stroke="${c}" stroke-width="56" stroke-linecap="round"/><path d="M${g1(kx)},${g1(ky)} L${g1(fx)},${g1(fy - 6)}" stroke="${c}" stroke-width="48" stroke-linecap="round"/><ellipse cx="${g1(fx + 6)}" cy="${g1(fy - 2)}" rx="34" ry="12" fill="${mix(c, '#000000', .2)}"/>` +
      (far ? '' : `<path d="M${g1(fx - 20)},${g1(fy - 30)} v26 M${g1(fx - 4)},${g1(fy - 32)} v28 M${g1(fx + 12)},${g1(fy - 30)} v26" stroke="#000" stroke-width="2" opacity=".2"/>`); };
  const body = `M-180,-262 C-120,-348 90,-352 160,-282 C192,-250 182,-190 140,-170 C60,-140 -80,-140 -150,-170 C-186,-192 -192,-232 -180,-262 Z`;
  const tail = `M-170,-262 C-300,-250 -460,-190 -640,-112 C-600,-124 -460,-168 -300,-196 C-240,-206 -190,-206 -160,-196 Z`;
  const neck = `M130,-300 C210,-360 262,-460 300,-560 L346,-548 C306,-440 254,-320 176,-218 Z`;
  let s = `<g transform="translate(${g1(x)},${g1(y)}) scale(${(f * sc).toFixed(4)},${sc})"><ellipse cx="-40" cy="4" rx="360" ry="22" fill="#000" opacity=".3" filter="url(#blur5)"/>`;
  s += legP(120, ph + Math.PI, 1) + legP(-110, ph, 1) + `<path d="${tail}" fill="url(#dnSau)"/>` +
    `<g transform="rotate(${g1(nk)},160,-270)"><path d="${neck}" fill="url(#dnSau)"/><path d="${neck}" fill="#000" filter="url(#grainR)" opacity=".25"/><path d="M136,-296 C212,-354 264,-456 302,-556" stroke="#4e5244" stroke-width="8" fill="none" opacity=".4"/>` +
    `<g transform="translate(322,${-566 + chew * 3}) rotate(-18)"><path d="M-22,-14 C0,-24 34,-20 44,-6 C48,4 40,12 26,13 C10,15 -12,14 -24,8 Z" fill="url(#dnSau)"/><path d="M0,${g1(6 + chew * 3)} L40,4" stroke="#2a2a22" stroke-width="2.2"/><circle cx="8" cy="-6" r="3.4" fill="#141410"/><circle cx="7" cy="-7" r="1" fill="#fff" opacity=".7"/></g></g>` +
    `<path d="${body}" fill="url(#dnSau)"/><path d="${body}" fill="#000" filter="url(#grainR)" opacity=".28"/><path d="M-170,-270 C-100,-344 90,-346 156,-284" stroke="#4e5244" stroke-width="10" fill="none" opacity=".4"/><path d="M-130,-178 C-40,-150 60,-152 130,-180" stroke="#cec6a8" stroke-width="16" fill="none" opacity=".3" stroke-linecap="round"/>` +
    legP(140, ph, 0) + legP(-90, ph + Math.PI, 0) + `</g>`;
  return s;
}
// an elephant (side view, facing right), for the weight comparison
function eleph(x, y, s, f = 1) {
  return `<g transform="translate(${g1(x)},${g1(y)}) scale(${f * s},${s})"><path d="M-46,-40 v40 h16 v-36 M26,-40 v40 h16 v-36" stroke="#6a6a70" stroke-width="2" fill="#6a6a70"/><ellipse cx="0" cy="-62" rx="60" ry="40" fill="#8a8a92"/><path d="M-38,-40 v40 h16 v-40 M34,-40 v40 h16 v-40" fill="#7e7e86"/>` +
    `<circle cx="58" cy="-74" r="28" fill="#8a8a92"/><path d="M78,-70 C96,-58 94,-30 98,-6 L88,-6 C84,-28 80,-48 66,-56Z" fill="#8a8a92"/><ellipse cx="44" cy="-74" rx="18" ry="26" fill="#74747c"/><path d="M74,-58 q16,2 22,-8" stroke="#f4eee0" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="68" cy="-82" r="3" fill="#1a1a1a"/></g>`;
}
// a hen (side view, facing right); (x, y) = ground
function hen(x, y, s, f, ph = 0, o = {}) {
  const st = Math.sin(ph) * 12, pk = o.peck || 0;
  const legs = [[-4, st], [6, -st]].map(([lx, sw], i) => `<path d="M${lx},-48 L${g1(lx + sw * .4)},-4" stroke="${i ? '#e8a838' : '#c88a28'}" stroke-width="6" stroke-linecap="round"/><path d="M${g1(lx + sw * .4 - 12)},0 L${g1(lx + sw * .4 + 16)},0 M${g1(lx + sw * .4)},-1 L${g1(lx + sw * .4 + 14)},-8 M${g1(lx + sw * .4)},-1 L${g1(lx + sw * .4 - 10)},-6" stroke="${i ? '#e8a838' : '#c88a28'}" stroke-width="4" stroke-linecap="round"/>`).join('');
  const body = `M-58,-96 C-44,-132 14,-128 34,-108 C46,-94 50,-70 40,-56 C24,-36 -22,-34 -46,-48 C-62,-58 -66,-82 -58,-96 Z`;
  return `<g transform="translate(${g1(x)},${g1(y)}) scale(${f * s},${s})"><ellipse cx="0" cy="2" rx="50" ry="6" fill="#000" opacity=".25" filter="url(#blur2)"/>${legs}` +
    `<path d="M-52,-92 C-86,-120 -98,-150 -86,-160 C-72,-140 -58,-118 -44,-104Z" fill="#2a1e16"/><path d="M-50,-86 C-92,-104 -110,-128 -104,-140 C-84,-118 -66,-104 -46,-96Z" fill="#3a2a1a"/><path d="M-50,-80 C-84,-88 -100,-104 -98,-116 C-80,-100 -62,-94 -46,-90Z" fill="#4a3220"/>` +
    `<path d="${body}" fill="url(#dnHen)"/><path d="${body}" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M-34,-92 C-10,-104 16,-96 24,-78 C12,-66 -14,-62 -36,-72 Z" fill="#9a5226"/>` + [0, 1, 2, 3].map(i => `<path d="M${-30 + i * 12},-88 q6,10 2,18" stroke="#6a3416" stroke-width="2" fill="none" opacity=".5"/>`).join('') +
    `<g transform="rotate(${g1(pk * 40)},30,-104)"><path d="M18,-110 C26,-128 38,-142 50,-150 L66,-140 C58,-130 50,-114 40,-100Z" fill="#b8642a"/><circle cx="56" cy="-150" r="16" fill="#c06a2c"/>` +
    `<path d="M44,-163 q3,-12 8,-4 q4,-12 9,-2 q5,-10 8,2 q2,6 -6,8 L46,-160Z" fill="#d82a2a"/><path d="M68,-154 L86,-148 L68,-142Z" fill="#e8b040"/><ellipse cx="66" cy="-134" rx="5" ry="8" fill="#d82a2a"/><circle cx="61" cy="-154" r="2.8" fill="#140c06"/><circle cx="60.2" cy="-155" r=".9" fill="#fff"/></g></g>`;
}
// a small early mammal, shrew-like (side view, facing right)
function shrew(x, y, s, f, t) {
  const sn = Math.sin(t * 14) * 1.5;
  return `<g transform="translate(${g1(x)},${g1(y)}) scale(${f * s},${s})"><ellipse cx="0" cy="2" rx="34" ry="5" fill="#000" opacity=".3" filter="url(#blur2)"/><path d="M-30,-10 C-60,-8 -76,-22 -86,-36" stroke="#5a4636" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    `<path d="M-14,-6 l-4,8 M18,-6 l4,8" stroke="#5a4636" stroke-width="4" stroke-linecap="round"/><ellipse cx="0" cy="-18" rx="34" ry="17" fill="#6a5240"/><path d="M-30,-22 C-10,-36 20,-36 32,-24" stroke="#4a382a" stroke-width="5" fill="none" opacity=".6"/>` +
    `<path d="M24,-28 C40,-32 52,-24 ${58 + sn},-16 C46,-12 34,-10 24,-10Z" fill="#7a6250"/><circle cx="${58 + sn}" cy="-16" r="2.4" fill="#2a1a14"/><circle cx="36" cy="-24" r="2.6" fill="#0a0604"/><circle cx="35.3" cy="-24.8" r=".8" fill="#fff"/><ellipse cx="26" cy="-31" rx="5" ry="6" fill="#8a6a58"/>` +
    `<path d="M52,-18 l12,-6 M52,-16 l13,0 M52,-14 l12,5" stroke="#d8c8b8" stroke-width=".8" opacity=".8"/></g>`;
}
// an asteroid: an irregular rock with craters, lit from the upper left
function rockA(x, y, r, rot, seed) {
  const R = RS(seed); let p = '';
  for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, rr = r * (.8 + R() * .3); p += (i ? 'L' : 'M') + g1(Math.cos(a) * rr) + ',' + g1(Math.sin(a) * rr); }
  let c = ''; for (let i = 0; i < 6; i++) { const a = R() * 6.28, d = R() * r * .55, cr = r * (.08 + R() * .12); c += `<circle cx="${g1(Math.cos(a) * d)}" cy="${g1(Math.sin(a) * d)}" r="${g1(cr)}" fill="#2a221c" opacity=".55"/><circle cx="${g1(Math.cos(a) * d - cr * .2)}" cy="${g1(Math.sin(a) * d - cr * .2)}" r="${g1(cr * .7)}" fill="#7a6a5a" opacity=".35"/>`; }
  return `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(rot)})"><path d="${p}Z" fill="url(#dnRock)"/>${c}</g>`;
}
// the asteroid in flight: a long hot trail, a glowing front and the rock
const dnAst = (x, y, ang, L, t) => `<g transform="translate(${g1(x)},${g1(y)}) rotate(${g1(ang)})"><path d="M${g1(-L)},-3 L0,-24 L0,24 L${g1(-L)},3Z" fill="url(#dnTrail)" opacity=".55" filter="url(#blur9)"/><path d="M${g1(-L * .5)},-2 L0,-12 L0,12 L${g1(-L * .5)},2Z" fill="#ffd890" opacity=".5" filter="url(#blur2)"/><ellipse cx="6" cy="0" rx="40" ry="34" fill="#ff9a40" opacity=".4" filter="url(#blur9)"/></g>` + rockA(x, y, 26, t * 40, 7);
// ---------- 0: hook: a T. rex walks into a city street; people run ----------
const DNRUN = [[300, 1062, 0, .64, 0], [420, 1092, 2, .7, 1.3], [520, 1050, 4, .62, 2.1], [200, 1088, 5, .68, .7], [80, 1056, 7, .64, 2.6]];
function sceneHook(t) {
  const rx = lerp(1020, 690, ease(ramp(t, 0, 2.6))), ph = t * 3.2, jaw = ease(ramp(t, WS(0, 5), WS(0, 6))) * (1 - ease(ramp(t, WS(0, 8) + .2, WS(0, 8) + .8)));
  let top = ''; DNRUN.forEach(([x0, y, pi, sc, p0], j) => { const run = ease(ramp(t, .5 + j * .12, 1.1 + j * .12)), x = x0 - run * 150 * Math.max(0, t - .5 - j * .12);
    top += hero(x, y, Object.assign({ s: sc, face: run > .5 ? -1 : 1, shade: 1, walk: t * (4 + 5 * run) + p0, amp: .5 + .4 * run, lean: run * 10, lookUp: run > .5 ? 0 : .3 }, gp(pi))); });
  const fg = trex(rx, 1262, 1.6, -1, ph, { jaw, head: -4 * jaw });
  let s = `<defs>${DNDEFS()}</defs>` + dnStreet(t, { id: 'd0', top: top + fg });
  noEarth(); F.ov = ''; return s;
}
// ---------- 1-2: the asteroid 66 million years ago; then the rewind: it misses ----------
function sceneAst(t) {
  const G = glE(t, { d: 9.4, el: .22, lon: -78, lat: 10, clouds: .45, lights: .3, tg: [0, .2, 0] }), I = G.P(21.3, -89.5), ix = I[0], iy = I[1];
  const tI = WS(1, 5) + .15, rw0 = S0(2) - .1, rw1 = WS(2, 4) - .15;
  // impact progress before the rewind, and the same run backwards during it
  const fwd = tt => ({ ap: ramp(tt, tI - 1.7, tI), e: ease(ramp(tt, tI, WS(1, 12))) });
  let st = fwd(t); if (t > rw0) { const q = ease(ramp(t, rw0, rw1)); st = fwd(lerp(rw0, tI - 1.0, q)); }
  const miss = ramp(t, rw1, S0(3) + .3), sx = 860, sy = -160;
  let ov = '';
  if (miss <= 0 && st.ap > 0 && st.ap < 1) { const x = lerp(sx, ix, st.ap), y = lerp(sy, iy, st.ap), ang = Math.atan2(iy - sy, ix - sx) * 57.3, L = 260 * Math.min(1, st.ap * 3);
    ov += dnAst(x, y, ang, L * 1.4, t); }
  if (miss > 0) { const p0 = [lerp(sx, ix, .5), lerp(sy, iy, .5)], p1 = [G.c0[0] + G.R * 1.45, G.c0[1] - G.R * .2], p2 = [G.c0[0] + G.R * .4, 1600], q = miss, B = u => [0, 1].map(k => (1 - u) * (1 - u) * p0[k] + 2 * u * (1 - u) * p1[k] + u * u * p2[k]), P = B(q), P2 = B(Math.max(0, q - .02));
    ov += dnAst(P[0], P[1], Math.atan2(P[1] - P2[1], P[0] - P2[0]) * 57.3, 360, t); }
  if (st.e > 0) { const e = st.e, fl = Math.max(0, 1 - ramp(t > rw0 ? lerp(rw0, tI - 1.0, ease(ramp(t, rw0, rw1))) : t, tI, tI + .8));
    ov += `<circle cx="${g1(ix)}" cy="${g1(iy)}" r="${g1(60 + 260 * (1 - fl))}" fill="url(#dnFlash)" opacity="${g1(fl)}"/><clipPath id="dnGc"><circle cx="${g1(G.c0[0])}" cy="${g1(G.c0[1])}" r="${g1(G.R - 1)}"/></clipPath><g clip-path="url(#dnGc)"><ellipse cx="${g1(ix)}" cy="${g1(iy)}" rx="${g1(30 + G.R * 1.1 * e)}" ry="${g1(20 + G.R * .8 * e)}" fill="url(#dnDust)" opacity="${g1(Math.min(1, 1.4 * e))}" filter="url(#blur9)"/><circle cx="${g1(ix)}" cy="${g1(iy)}" r="${g1(20 + G.R * .9 * e)}" fill="none" stroke="#ffcf8a" stroke-width="${g1(10 * (1 - e) + 2)}" opacity="${g1(.8 * (1 - e))}"/></g><circle cx="${g1(ix)}" cy="${g1(iy)}" r="${g1(16 + 30 * e)}" fill="#ff7a2a" opacity="${g1(.8 * (1 - e * .7))}" filter="url(#blur5)"/>` +
      `<circle cx="${g1(G.c0[0])}" cy="${g1(G.c0[1])}" r="${g1(G.R)}" fill="#2a1e14" opacity="${g1(.5 * ease(ramp(e, .4, 1)))}"/>`; }
  if (t > rw0 && t < rw1 + .2) { const a = ease(ramp(t, rw0, rw0 + .2)) * (1 - ease(ramp(t, rw1, rw1 + .2)));
    ov += `<g opacity="${g1(a)}"><text x="360" y="1150" text-anchor="middle" font-family="Inter" font-weight="700" font-size="90" fill="#fff" opacity=".85">◀◀</text>` + Array.from({ length: 40 }, (_, i) => `<rect x="-20" y="${i * 33 + (t * 400) % 33}" width="760" height="2" fill="#fff" opacity=".06"/>`).join('') + `</g>`; }
  ov += pin(G, 21.3, -89.5, 'تشيكشولوب', ease(ramp(t, tI + .6, tI + 1.2)) * (1 - ease(ramp(t, rw0, rw0 + .3))), '#ffd7a0', 26);
  F.ov = `<defs>${DND}</defs>` + ov; return space(t);
}
// ---------- 3: a sauropod walks past behind the buildings; a balance against ten elephants ----------
function sceneGiant(t) {
  const st = S0(3) - .2, T = t - st, sx = 860 - T * 35, dm = ease(ramp(t, WS(3, 6), WS(3, 7) + .3)) * (1 - ease(ramp(t, WS(3, 9) - .2, WS(3, 9) + .2))), bl = ease(ramp(t, WS(3, 9), WS(3, 10) + .2));
  const back = saur(sx, PV + 10, 1.5, -1, T * 1.6, { neck: 16 + Math.sin(T) * 2 });
  let top = ''; [[90, 1062, 1, 0, .64], [250, 1092, 1, 2, .7], [430, 1056, -1, 4, .62], [590, 1090, -1, 5, .68]].forEach(([x, y, f, pi, sc], j) => { const lk = ease(ramp(t, WS(3, 2) + j * .15, WS(3, 3) + j * .15));
    top += hero(x, y, Object.assign({ s: sc, face: f, shade: 1, lookUp: .55 * lk, aF: j % 2 ? [lerp(.05, 2.4, lk), lerp(.3, 2.6, lk)] : undefined }, gp(pi))); });
  let s = `<defs>${DNDEFS()}</defs>` + dnStreet(t + 40, { id: 'd3', back, top });
  // the length: head to tail tip
  if (dm > 0) { const hx = Math.max(10, sx - 1.5 * 400), tx = sx + 1.5 * 640, y = 420; s += `<g opacity="${g1(dm)}"><path d="M${g1(hx)},${y} H${g1(tx)}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="14 8"/><path d="M${g1(hx)},${y - 16} v32 M${g1(Math.min(tx, 740))},${y - 16} v32" stroke="#f4c76b" stroke-width="4"/>${DL(360, y - 26, 'أكثرُ من ٣٠ متراً', 1, '#f4c76b', 34)}</g>`; }
  // the balance: one sauropod against ten elephants
  if (bl > 0) { const Y = 520; s += `<g opacity="${g1(bl)}">${panel(60, 250, 600, 420)}<path d="M360,${Y - 170} L360,${Y + 110} M300,${Y + 110} H420" stroke="#c8ccd4" stroke-width="10" stroke-linecap="round"/><path d="M160,${Y - 160} H560" stroke="#e8ecf2" stroke-width="9" stroke-linecap="round"/><circle cx="360" cy="${Y - 160}" r="10" fill="#f4c76b"/>` +
    [[200, 1], [520, 0]].map(([px]) => `<path d="M${px},${Y - 160} L${px - 90},${Y + 10} M${px},${Y - 160} L${px + 90},${Y + 10}" stroke="#a8acb4" stroke-width="2.5"/><path d="M${px - 100},${Y + 10} H${px + 100} L${px + 84},${Y + 26} H${px - 84}Z" fill="#c8ccd4"/>`).join('') +
    saur(214, Y + 10, .12, 1, 0) + Array.from({ length: 10 }, (_, i) => eleph(452 + (i % 5) * 34, Y + 10 - Math.floor(i / 5) * 42, .3)).join('') +
    DL(200, Y + 80, '≈ ٧٠ طنّاً', 1, '#fff', 30) + DL(520, Y + 80, '١٠ فِيَلة', 1, '#fff', 30) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: it eats hundreds of kilograms of plants a day: the park goes bare ----------
function treeK(x, y, h, k, seed) {
  const R = RS(seed); let s = `<path d="M${x},${y} C${x - 6},${y - h * .4} ${x + 4},${y - h * .6} ${x},${y - h * .72}" stroke="#5a3e28" stroke-width="${g1(h * .07)}" fill="none" stroke-linecap="round"/><path d="M${x},${y - h * .55} L${x - h * .2},${y - h * .8} M${x},${y - h * .6} L${x + h * .22},${y - h * .84} M${x},${y - h * .7} L${x + 4},${y - h * .95}" stroke="#5a3e28" stroke-width="${g1(h * .03)}" stroke-linecap="round"/>`;
  for (let i = 0; i < 26; i++) { const a = R() * 6.28, d = R(), cx = x + Math.cos(a) * h * .3 * d, cy = y - h * .82 + Math.sin(a) * h * .2 * d, r = h * (.07 + R() * .06), keep = R() > k; if (!keep) continue;
    s += `<circle cx="${g1(cx)}" cy="${g1(cy)}" r="${g1(r)}" fill="${['#4a7a32', '#5a8a3a', '#3e6a2a', '#6a9a44'][i % 4]}"/>`; }
  return s;
}
function sceneEat(t) {
  const st = S0(4) - .2, T = t - st, k1 = ease(ramp(t, WS(4, 0), WS(4, 7))), k2 = ease(ramp(t, WS(4, 7), WS(4, 9) + .4));
  let s = `<defs>${DNDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dnSky)"/>` + cumulus(240 + T * 6, 420, 220, 31, { a: .7 }) + mountainsR(840, 90, 33, { snowAt: 0, rock: '#7a8a8a' });
  // fields on the horizon turn brown
  s += `<rect x="-20" y="830" width="760" height="70" fill="${mix('#7aa04a', '#a8865a', k2)}"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 90 - 20},900 L${i * 90 + 20},830" stroke="${mix('#5a8a3a', '#8a6a44', k2)}" stroke-width="3" opacity=".6"/>`).join('');
  s += `<rect x="-20" y="900" width="760" height="420" fill="url(#dnMeadow)"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M-20,1140 Q360,1090 740,1150 L740,1300 L-20,1300Z" fill="#c8b48a" opacity=".55"/>`;
  s += treeK(110, 1010, 360, k2 * .9, 41) + treeK(560, 990, 330, k2 * .95, 43) + treeK(300, 1080, 470, Math.max(k1 * .75, k2 * .98), 45);
  // a bench and a lamp in the park
  s += `<rect x="440" y="1110" width="120" height="10" fill="#6a4a2a"/><rect x="446" y="1120" width="8" height="30" fill="#3a3a3a"/><rect x="546" y="1120" width="8" height="30" fill="#3a3a3a"/><rect x="440" y="1086" width="120" height="8" fill="#6a4a2a"/>`;
  s += saur(1010, 1240, 1.7, -1, T * .8, { neck: 40 + Math.sin(T * 2.2) * 3, chew: (Math.sin(T * 9) + 1) * .5 });
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: the T. rex bite crushes bone; bite forces compared ----------
function sceneBite(t) {
  const st = S0(5) - .2, T = t - st, a = ease(ramp(t, st, st + .5)), op = ease(ramp(t, WS(5, 1), WS(5, 2))), cl = ease(ramp(t, WS(5, 8) - .1, WS(5, 8) + .25)), jaw = op * (1 - cl), cr = ramp(t, WS(5, 8) + .2, WS(5, 8) + 1.4), b = ease(ramp(t, WS(5, 2), WS(5, 7)));
  let s = `<defs>${DNDEFS()}</defs>` + studio('stD5', '#3a3020', '#0a0804', 31);
  s += `<g opacity="${g1(a)}"><path d="M-60,760 C40,700 80,640 150,600 L220,700 C160,760 60,820 -60,880Z" fill="url(#dnRex)"/><path d="M-60,760 C40,700 80,640 150,600 L220,700 C160,760 60,820 -60,880Z" fill="#000" filter="url(#grainR)" opacity=".3"/>` +
    `<g transform="translate(130,600) scale(2.7) rotate(${g1(4 - 6 * jaw)})">${rexHead(jaw)}</g>`;
  // the bone between the jaws: whole, then cracked and flying apart
  const bx = 470, by = 640;
  if (cr <= 0) s += `<g transform="rotate(-6,${bx},${by})"><rect x="${bx - 120}" y="${by - 12}" width="240" height="24" rx="10" fill="#efe4cc"/><circle cx="${bx - 124}" cy="${by - 12}" r="18" fill="#efe4cc"/><circle cx="${bx - 124}" cy="${by + 12}" r="18" fill="#efe4cc"/><circle cx="${bx + 124}" cy="${by - 12}" r="18" fill="#efe4cc"/><circle cx="${bx + 124}" cy="${by + 12}" r="18" fill="#efe4cc"/><rect x="${bx - 110}" y="${by + 4}" width="220" height="6" fill="#c8b898" opacity=".6"/></g>`;
  else { const R = RS(77); for (let i = 0; i < 14; i++) { const ang = R() * 6.28, sp = 120 + R() * 260, x = bx + (R() - .5) * 200 + Math.cos(ang) * sp * cr, y = by + Math.sin(ang) * sp * cr + 400 * cr * cr, w = 18 + R() * 30;
      s += `<rect x="${g1(x - w / 2)}" y="${g1(y - 7)}" width="${g1(w)}" height="14" rx="5" fill="#efe4cc" opacity="${g1(1 - cr * .6)}" transform="rotate(${g1(R() * 180 + cr * 300)},${g1(x)},${g1(y)})"/>`; }
    s += `<circle cx="${bx}" cy="${by}" r="${g1(40 + 120 * cr)}" fill="#fff" opacity="${g1(.5 * (1 - cr))}" filter="url(#blur9)"/>`; }
  s += `</g>`;
  // bite force bars
  if (b > 0) { const bar = (y, v, col, tx, k) => `<g opacity="${g1(clamp(k * 3))}">${DL(600, y + 28, tx, 1, '#fff', 26)}<rect x="90" y="${y}" width="${g1(Math.max(8, 390 * v / 35000 * k))}" height="38" rx="12" fill="${col}"/>${DL(g1(Math.max(150, 90 + 390 * v / 35000 * k - 70)), y + 28, arDC(v * k), 1, '#141414', 22)}</g>`;
    s += `<g opacity="${g1(b > 0 ? 1 : 0)}">${panel(60, 860, 600, 330)}${DL(360, 905, 'قوّةُ العضّة (نيوتن)', 1, '#f4c76b', 28)}` + bar(935, 1300, '#9ad8ff', 'إنسان', clamp(b * 3)) + bar(1010, 16000, '#7ae08a', 'تمساح', clamp(b * 3 - 1)) + bar(1085, 35000, '#ff8a5a', 'تيرانوصور', clamp(b * 3 - 2)) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: it runs at about 20 km/h: a fast runner gets away ----------
function speedo(x, y, v, vmax, tx, col, a) {
  const ang = -120 + 240 * v / vmax;
  return `<g opacity="${g1(a)}">${panel(x - 120, y - 110, 240, 220)}<path d="M${g1(x + Math.cos(-210 * Math.PI / 180) * 80)},${g1(y + Math.sin(-210 * Math.PI / 180) * 80)} A80,80 0 1 1 ${g1(x + Math.cos(30 * Math.PI / 180) * 80)},${g1(y + Math.sin(30 * Math.PI / 180) * 80)}" stroke="#2a3040" stroke-width="14" fill="none"/>` +
    `<path d="M${x},${y} L${g1(x + Math.sin(ang * Math.PI / 180) * 70)},${g1(y - Math.cos(ang * Math.PI / 180) * 70)}" stroke="${col}" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="8" fill="${col}"/>${DL(x, y + 50, arD(Math.round(v)) + ' كم/س', 1, col, 30)}${DL(x, y + 88, tx, 1, '#fff', 22)}</g>`;
}
function sceneChase(t) {
  const st = S0(6) - .2, T = t - st, gp2 = ease(ramp(t, WS(6, 9), S0(7))), off = T * 300;
  let s = `<defs>${DNDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dnSky)"/>` + cumulus(300 - T * 10, 380, 220, 51, { a: .6 });
  s += `<g transform="translate(${g1(-pmod(off * .15, 720))},0)">${mountainsR(860, 110, 61, { snowAt: 0, rock: '#8a9a9a' })}</g><g transform="translate(${g1(720 - pmod(off * .15, 720))},0)">${mountainsR(860, 110, 61, { snowAt: 0, rock: '#8a9a9a' })}</g>`;
  s += `<rect x="-20" y="880" width="760" height="440" fill="url(#dnMeadow)"/><rect x="-20" y="1150" width="760" height="90" fill="#8a7a62"/><rect x="-20" y="1150" width="760" height="90" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  for (let i = -1; i < 9; i++) { const x = pmod(i * 110 - off * .6, 990) - 140; s += `<rect x="${g1(x)}" y="1040" width="10" height="80" fill="#6a4a2a"/><path d="M${g1(x)},1060 h110 M${g1(x)},1090 h110" stroke="#7a5a3a" stroke-width="5"/>`; }
  for (let i = 0; i < 12; i++) { const x = pmod(i * 70 - off, 840) - 60; s += `<path d="M${g1(x)},1250 l14,-14" stroke="#3a5a22" stroke-width="4"/>`; }
  const rx = -60 - gp2 * 200, ux = 590 + gp2 * 120;
  s += trex(rx, 1210, 1.6, 1, T * 4.6, { jaw: .5 + .3 * Math.sin(T * 3), head: 6 });
  s += hero(ux, 1215, Object.assign({ s: .78, face: 1, shade: 1, walk: T * 11, amp: .95, lean: 14 }, gp(3))) + `<path d="M${g1(ux - 70)},1120 h-90 M${g1(ux - 70)},1150 h-60" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>`;
  s += speedo(190, 370, 20 * ease(ramp(t, WS(6, 4), WS(6, 6))), 40, 'التيرانوصور', '#ff8a5a', ease(ramp(t, WS(6, 4) - .2, WS(6, 4) + .2))) + speedo(530, 370, 30 * ease(ramp(t, WS(6, 10), WS(6, 12))), 40, 'عدّاءٌ سريع', '#7ae08a', ease(ramp(t, WS(6, 10) - .2, WS(6, 10) + .2)));
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: cities need high walls; cattle become easy prey ----------
function sceneWall(t) {
  const st = S0(7) - .2, T = t - st, sw = ease(ramp(t, WS(7, 5) - .3, WS(7, 5) + .3));
  let a = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#dnSky)"/>` + cumulus(200 + T * 5, 420, 220, 61, { a: .6 }) + farCity(63, 760, '#8a96a8') + `<rect x="-20" y="740" width="760" height="40" fill="#f2e4c8" opacity=".3"/>`;
  a += `<rect x="-20" y="600" width="760" height="330" fill="url(#dnWall)"/><rect x="-20" y="600" width="760" height="330" fill="#000" filter="url(#grainR)" opacity=".25"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${i * 90 - 20},600 v330" stroke="#6a665c" stroke-width="3" opacity=".6"/>`).join('') + Array.from({ length: 4 }, (_, i) => `<path d="M-20,${640 + i * 80} H740" stroke="#6a665c" stroke-width="2" opacity=".35"/>`).join('') +
    `<rect x="-20" y="590" width="760" height="14" fill="#5a564c"/><rect x="520" y="440" width="90" height="170" fill="#8a867c"/><rect x="506" y="420" width="118" height="30" fill="#5a564c"/><rect x="540" y="470" width="50" height="34" fill="#2a3040"/>` +
    `<path d="M565,470 L340,${g1(560 + 40 * Math.sin(T))} L420,${g1(600 + 40 * Math.sin(T))}Z" fill="#fff4c0" opacity=".18"/>` +
    `<rect x="-20" y="930" width="760" height="390" fill="url(#dnMeadow)"/><rect x="-20" y="930" width="760" height="20" fill="#000" opacity=".2"/>` + trex(250 + Math.sin(T * .6) * 40, 1160, .85, Math.cos(T * .6) > 0 ? 1 : -1, T * 3.4, { head: 4 });
  let b = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#dnSky)"/>` + cumulus(400 + T * 5, 440, 200, 63, { a: .6 }) + mountainsR(860, 80, 65, { snowAt: 0, rock: '#8a9a8a' }) + `<rect x="-20" y="860" width="760" height="460" fill="url(#dnMeadow)"/><rect x="-20" y="860" width="760" height="460" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  for (let i = 0; i < 9; i++) b += `<rect x="${i * 90 - 10}" y="930" width="8" height="70" fill="#6a4a2a"/>`; b += `<path d="M-20,950 H740 M-20,975 H740" stroke="#7a5a3a" stroke-width="4"/>`;
  const run = ease(ramp(t, WS(7, 6), WS(7, 8)));
  [[300, 1130, .62], [440, 1170, .7], [560, 1110, .58], [380, 1230, .74]].forEach(([x, y, sc], i) => { b += quad(x + run * 220 * (T - (WS(7, 6) - st)) * .35, y, sc, { kind: 'cow', face: 1, moving: run > .1, phase: T * 8 + i, graze: run < .1 }); });
  b += trex(lerp(-200, 120, ease(ramp(t, WS(7, 5) - .3, WS(7, 9)))), 1240, 1.05, 1, T * 4, { jaw: .4, head: 8 });
  noEarth(); F.ov = ''; return `<defs>${DNDEFS()}</defs>` + a + `<g opacity="${g1(sw)}">${b}</g>`;
}
// ---------- 8: maybe we would not be here: mammals stayed small in their shadow ----------
function sceneMammal(t) {
  const st = S0(8) - .2, T = t - st, fam = 1 - ease(ramp(t, WS(8, 3), WS(8, 5))), sm = ease(ramp(t, WS(8, 4), WS(8, 6))), stomp = ramp(t, WS(8, 7), WS(8, 9)), fy = lerp(-200, 980, ease(clamp(stomp * 1.6))), shake = stomp > .6 && stomp < .8 ? Math.sin(T * 60) * 6 : 0;
  let s = `<defs>${DNDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dnNight)"/>` + Array.from({ length: 40 }, (_, i) => { const R = RS(i + 900); return `<circle cx="${g1(R() * 740)}" cy="${g1(R() * 600)}" r="${g1(.8 + R() * 1.6)}" fill="#fff" opacity="${g1(.3 + R() * .6)}"/>`; }).join('');
  s += `<circle cx="560" cy="300" r="46" fill="#f4f0dc" opacity=".9"/><circle cx="560" cy="300" r="90" fill="#f4f0dc" opacity=".12" filter="url(#blur9)"/>`;
  s += `<g transform="translate(${g1(shake)},0)"><rect x="-20" y="980" width="760" height="340" fill="#1e2a1a"/>`;
  // ferns in silhouette
  for (let i = 0; i < 7; i++) { const x = i * 120 - 20, h = 160 + (i % 3) * 60; s += `<path d="M${x},1000 Q${x + 20},${1000 - h * .6} ${x + 60},${1000 - h}" stroke="#14201a" stroke-width="6" fill="none"/>` + Array.from({ length: 8 }, (_, j) => { const q = j / 8, px = x + 60 * q * q + 20 * q, py = 1000 - h * q; return `<path d="M${g1(px)},${g1(py)} q${-30 + j * 2},-10 ${-50 + j * 4},6 M${g1(px)},${g1(py)} q${30 - j * 2},-14 ${50 - j * 4},0" stroke="#1a2a1e" stroke-width="7" fill="none" stroke-linecap="round"/>`; }).join(''); }
  // the giant foot comes down
  s += `<g transform="translate(150,${g1(fy)})"><path d="M-110,-1500 L-104,-60 Q-120,-10 -96,0 L104,0 Q124,-10 104,-60 L110,-1500Z" fill="url(#dnLeg)"/><path d="M-110,-1500 L-104,-60 Q-120,-10 -96,0 L104,0 Q124,-10 104,-60 L110,-1500Z" fill="#000" filter="url(#grainR)" opacity=".45"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M-100,${-860 + i * 60} q100,${14 + (i % 3) * 4} 206,0" stroke="#10120c" stroke-width="3" fill="none" opacity=".45"/>`).join('') + `` +
    `<path d="M-96,0 q-6,-26 14,-30 q22,4 18,30Z M-46,0 q-6,-30 16,-34 q22,4 18,34Z M6,0 q-6,-30 16,-34 q22,4 18,34Z M58,0 q-6,-26 16,-30 q20,4 16,30Z" fill="#3a3e30"/><path d="M-104,-120 Q0,-100 104,-120 M-106,-260 Q0,-240 106,-260" stroke="#1e2018" stroke-width="5" fill="none" opacity=".5"/></g>`;
  if (stomp > .6) { const q = ramp(stomp, .6, 1); s += `<ellipse cx="150" cy="985" rx="${g1(140 + 160 * q)}" ry="${g1(20 + 20 * q)}" fill="#8a7a62" opacity="${g1(.5 * (1 - q))}" filter="url(#blur5)"/>`; }
  s += `<g opacity="${g1(sm)}">${shrew(470, 1060, 2.6, stomp > .6 ? -1 : 1, t)}${DL(470, 1150, 'ثدييٌّ صغير', 1, '#f4c76b', 28)}</g></g>`;
  // the family that might never have existed
  if (fam > 0) { s += `<g opacity="${g1(fam)}">` + hero(260, 1100, Object.assign({ s: .9, face: 1, shade: 1 }, gp(1))) + hero(420, 1100, Object.assign({ s: .86, face: -1, shade: 1 }, gp(4))) + hero(340, 1100, Object.assign({ s: .55, face: 1, shade: 1 }, gp(6))) + `</g>`;
    if (fam < 1) s += sparkles(340, 900, 320, 400, 40, t, Math.sin(fam * Math.PI), 95); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the surprise: birds are living dinosaurs; the hen is a close relative of T. rex ----------
function sceneBird(t) {
  const st = S0(9) - .2, T = t - st, rx = ease(ramp(t, st, WS(9, 1))), bd = ease(ramp(t, WS(9, 5), WS(9, 6) + .3)), hn = ease(ramp(t, WS(9, 9), WS(9, 11))), arc = ease(ramp(t, WS(9, 10), WS(9, 12)));
  let s = `<defs>${DNDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dnSky)"/>` + cumulus(260 + T * 5, 440, 240, 71, { a: .65 }) + mountainsR(880, 80, 73, { snowAt: 0, rock: '#8a9a9a' }) + `<rect x="-20" y="880" width="760" height="440" fill="url(#dnMeadow)"/><rect x="-20" y="880" width="760" height="440" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  if (bd > 0) for (let i = 0; i < 9; i++) { const R = RS(i + 600), x = pmod(R() * 800 + T * (40 + R() * 30), 900) - 80, y = 480 + R() * 260, fl = Math.sin(T * 9 + i) * .8; s += `<g opacity="${g1(bd)}"><path d="M${g1(x - 18)},${g1(y - 8 * fl)} Q${g1(x - 8)},${g1(y - 4)} ${g1(x)},${g1(y)} Q${g1(x + 8)},${g1(y - 4)} ${g1(x + 18)},${g1(y - 8 * fl)}" stroke="#2a2a30" stroke-width="4" fill="none" stroke-linecap="round"/></g>`; }
  s += `<g opacity="${g1(rx)}">${trex(lerp(-160, 0, rx), 1180, .85, 1, 0, { head: 6 })}</g>`;
  s += `<g opacity="${g1(hn)}" transform="translate(0,${g1((1 - hn) * 40)})">${hen(530, 1180, 1.9, -1, T * 2, { peck: Math.max(0, Math.sin(T * 2.2)) * .3 })}</g>`;
  if (arc > 0) s += `<path d="M300,800 Q370,${g1(660)} 430,860" stroke="#f4c76b" stroke-width="5" fill="none" stroke-dasharray="${g1(320 * arc)} 999"/>` + DL(370, 690, 'أقارب', arc, '#f4c76b', 32);
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 11) - .3, WS(10, 11) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneAst }, { s: S0(3) - .2, f: sceneGiant }, { s: S0(4) - .2, f: sceneEat }, { s: S0(5) - .2, f: sceneBite },
  { s: S0(6) - .2, f: sceneChase }, { s: S0(7) - .2, f: sceneWall }, { s: S0(8) - .2, f: sceneMammal }, { s: S0(9) - .2, f: sceneBird }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneBite, sceneChase, sceneMammal]);
const XF = .5;
const TLI = [['الكويكب', S0(1)], ['العملاق', S0(3)], ['التيرانوصور', S0(5)], ['المدن', S0(7)], ['الثدييّات', S0(8)], ['الطيور', S0(9)]];
const LIST_ON = new Set([sceneMammal]);
const CHIPS = [
  ['c0', 'ما زالت حيّة!', 360, 330, 'red big', WS(0, 6), S0(1) - .3],
  ['c1', '٦٦ مليون سنة', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c4', 'مئاتُ الكيلوغرامات يوميّاً', 360, 330, 'big', WS(4, 1), S0(5) - .3],
  ['c7', 'أسوارٌ عالية', 360, 330, 'big', WS(7, 3), WS(7, 5) - .1],
  ['c9', 'الطيورُ ديناصوراتٌ حيّة', 360, 330, 'big', WS(9, 6), WS(9, 12) - .1],
  ['c9b', 'الدجاجة!', 360, 330, 'big', WS(9, 12), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 11) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لو عاشت الديناصورات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
