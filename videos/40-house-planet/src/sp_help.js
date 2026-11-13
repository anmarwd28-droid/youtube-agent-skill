const SPDEF = `<linearGradient id="skinP" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8704e"/><stop offset=".45" stop-color="#d4a080"/><stop offset="1" stop-color="#b07a58"/></linearGradient>` +
  `<linearGradient id="skinP2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a3c"/><stop offset=".45" stop-color="#b8845e"/><stop offset="1" stop-color="#94603e"/></linearGradient>` +
  `<linearGradient id="phG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a44"/><stop offset="1" stop-color="#0c1220"/></linearGradient>` +
  `<linearGradient id="radG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3e"/><stop offset=".5" stop-color="#7a4e2a"/><stop offset="1" stop-color="#4a2e18"/></linearGradient>` +
  `<radialGradient id="grillG" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#e8dcc0"/><stop offset="1" stop-color="#a8987a"/></radialGradient>` +
  `<radialGradient id="scrGl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#9ad0ff" stop-opacity=".55"/><stop offset="1" stop-color="#9ad0ff" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="warmG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd59a" stop-opacity=".75"/><stop offset=".5" stop-color="#ffb35c" stop-opacity=".22"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="boardG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2e4a3a"/><stop offset="1" stop-color="#1c3226"/></linearGradient>` +
  `<linearGradient id="wallC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6d6b4"/><stop offset="1" stop-color="#c8b48e"/></linearGradient>` +
  `<linearGradient id="floorC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6c44"/><stop offset="1" stop-color="#6a4426"/></linearGradient>` +
  `<linearGradient id="winL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfe0ff"/><stop offset="1" stop-color="#eaf4ff"/></linearGradient>`;
const glB = (t, o = {}) => { const cam = globeCam(t, o), spin = (o.spin ?? 4.2) + t * (o.sp ?? .03), Ld = sunFor((o.az ?? .25) + t * .02, o.off ?? -.6, o.up ?? .5), cN = Math.hypot(...cam.pos), c0 = proj3(cam, [0, 0, 0]);
  F.w = { set: 'space', cam, L: Ld, disc: { m: 1, spin, clouds: o.clouds ?? .45, sunI: o.sunI ?? 1, lights: o.lights ?? .35 } }; F.earth = null; F.moon = null; F.sun = null;
  return { cam, spin, cN, c0, R: c0[2] / Math.sqrt(1 - 1 / (cN * cN)) }; };
const DEFS = () => `${DEFO()}${SPDEF}`;
const PALS = [{ top: '#8a3b3b', pants: '#2a2533', skin: '#a46a46', hair: '#1b1410' }, { top: '#3f6b5a', pants: '#24262e', skin: '#c08a66', hair: '#2a1d16' }, { top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d' }, { top: '#7a6a4a', pants: '#2b2a30', skin: '#b07a55', hair: '#1d1612' },
  { top: '#b8742a', pants: '#2a2a34', skin: '#e0b090', hair: '#3a2416' }, { top: '#5a5a6a', pants: '#1c1c24', skin: '#c89070', hair: '#1a120c' }, { top: '#9a4a6a', pants: '#2a2230', skin: '#6a4028', hair: '#120c08' }, { top: '#2a6a8a', pants: '#3a3a44', skin: '#f0c8a8', hair: '#6a4a2a' },
  { top: '#6a8a3a', pants: '#2a2a34', skin: '#a87050', hair: '#2a1e18' }, { top: '#c04a3a', pants: '#24262e', skin: '#8a5a3c', hair: '#17110d' }];
const palS = i => Object.assign({}, PALS[i % PALS.length]);
const ARK = n => AR(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',')).replace(/,/g, '٬');

// ---------- the front face with expressions (replaces faceF of #37) ----------
// o: {m, patch, top, hair, look, glasses, wild, open, talk (0..1 mouth open), mood: 'joy' | 'fear' | 'anger', k (mood strength)}
function faceF(id, cx, cy, S, o = {}) {
  const m = o.m || 0, blink = m > 0 && m < 1 ? Math.sin(Math.PI * Math.min(1, m)) : 0, one = m >= .5;
  const mood = o.mood || '', k = o.k ?? (mood ? 1 : 0), J = mood === 'joy' ? k : 0, Fe = mood === 'fear' ? k : 0, An = mood === 'anger' ? k : 0;
  const op = (o.open ?? 1) * (1 - blink * .98) * (1 + .38 * Fe - .3 * An - .3 * J);
  const top = o.top || '#2a5a8a', hair = o.hair || '#2a1a12';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})">`;
  s += `<path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="${top}"/><path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="url(#shirtF)"/>` +
    `<path d="M-48,214 Q0,276 48,214" fill="#000" opacity=".22"/><path d="M-70,236 Q0,300 70,236" stroke="#000" stroke-width="5" fill="none" opacity=".18"/>`;
  s += `<path d="M-50,110 L-52,236 Q0,268 52,236 L50,110Z" fill="#b47c5a"/><path d="M-50,140 Q0,190 50,140 L50,110 L-50,110Z" fill="#000" opacity=".18"/>`;
  [-1, 1].forEach(q => { s += `<ellipse cx="${q * 128}" cy="8" rx="22" ry="38" fill="${q < 0 ? '#c08868' : '#a87050'}"/><path d="M${q * 132},-14 Q${q * 142},8 ${q * 130},34" stroke="#7a4a32" stroke-width="4" fill="none" opacity=".5"/>`; });
  const HD = 'M-126,-20 C-128,-122 -72,-168 0,-168 C72,-168 128,-122 126,-20 C124,64 92,132 0,164 C-92,132 -124,64 -126,-20Z';
  s += `<path d="${HD}" fill="url(#skF)"/><path d="${HD}" fill="url(#skSide)"/><path d="${HD}" fill="#000" filter="url(#grainR)" opacity=".1"/>` +
    `<ellipse cx="-62" cy="${52 - 10 * J}" rx="34" ry="18" fill="#e07a6a" opacity="${(.16 + .14 * J + .1 * An).toFixed(2)}" filter="url(#blur5)"/><ellipse cx="62" cy="${52 - 10 * J}" rx="34" ry="18" fill="#c0604a" opacity="${(.14 + .14 * J + .1 * An).toFixed(2)}" filter="url(#blur5)"/>` +
    `<path d="M-60,120 Q0,170 60,120" stroke="#000" stroke-width="10" fill="none" opacity=".08" filter="url(#blur5)"/>` +
    (Fe > 0 ? `<path d="${HD}" fill="#9ab0c8" opacity="${(.14 * Fe).toFixed(2)}"/>` : '');
  s += `<path d="M-134,-6 C-146,-136 -72,-196 0,-194 C82,-196 146,-136 134,-6 C126,-58 108,-98 66,-112 C18,-128 -36,-124 -78,-104 C-108,-84 -126,-50 -134,-6Z" fill="${hair}"/>` +
    `<path d="M-110,-110 C-70,-160 20,-176 90,-130" stroke="#fff" stroke-width="5" fill="none" opacity=".08"/>`;
  // forehead lines for fear, a frown crease for anger
  if (Fe > .05) s += `<path d="M-52,-96 Q0,-108 52,-96 M-44,-82 Q0,-92 44,-82" stroke="#8a5a40" stroke-width="3" fill="none" opacity="${(.45 * Fe).toFixed(2)}"/>`;
  if (An > .05) s += `<path d="M-8,-58 L-4,-40 M8,-58 L4,-40" stroke="#7a4a32" stroke-width="3.4" fill="none" opacity="${(.6 * An).toFixed(2)}"/>`;
  // brows: anger pulls the inner ends down, fear lifts and pinches them up
  const bi = 16 * An - 22 * Fe - 6 * J, bo = -10 * An - 16 * Fe - 6 * J;
  s += `<path d="M-84,${-56 + bo} Q-52,${-74 + (bo + bi) / 2 - 2 * Fe} -18,${-58 + bi}" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M18,${-58 + bi} Q52,${-74 + (bo + bi) / 2 - 2 * Fe} 84,${-56 + bo}" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  s += eyeF(id + 'L', -50, -14, 58, op, o.look) + eyeF(id + 'R', 50, -14, 58, op, o.look);
  // joy: raised cheeks under the eyes
  if (J > .05) s += `<path d="M-78,4 Q-50,16 -22,4 M22,4 Q50,16 78,4" stroke="#8a5a40" stroke-width="3" fill="none" opacity="${(.5 * J).toFixed(2)}"/>`;
  // nose
  s += `<path d="M-4,-12 C-8,30 -22,50 -20,62 C-14,74 14,74 20,62 C22,50 8,30 4,-12" fill="#b47858" opacity=".55"/><path d="M8,-6 C14,34 26,52 20,64" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>` +
    `<ellipse cx="-11" cy="66" rx="${7 + 2 * An}" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="11" cy="66" rx="${7 + 2 * An}" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="-4" cy="54" rx="6" ry="3" fill="#fff" opacity=".18"/>`;
  // mouth
  const tk = o.talk || 0, op2 = Math.max(tk, Fe * .75);
  if (J > .05) { const w = 36 + 14 * J, d = 22 * J;
    s += `<path d="M${-w},${100 - 6 * J} Q0,${104 + d * 1.8} ${w},${100 - 6 * J} Q0,${108 + d * .5} ${-w},${100 - 6 * J}Z" fill="#5a1a18"/><path d="M${-w + 8},${101 - 6 * J} Q0,${106 + d * .7} ${w - 8},${101 - 6 * J} L${w - 12},${104 - 4 * J} Q0,${110 + d * .7} ${-w + 12},${104 - 4 * J}Z" fill="#f4eee4"/>` +
      `<path d="M${-w},${100 - 6 * J} Q0,${104 + d * 1.8} ${w},${100 - 6 * J}" stroke="#a4504a" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M${-w - 6},${96 - 8 * J} q-6,6 -2,14 M${w + 6},${96 - 8 * J} q6,6 2,14" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>`;
  } else if (op2 > .05) { const h = 6 + 34 * op2, w = 26 - 6 * op2 + 8 * Fe;
    s += `<ellipse cx="0" cy="${106 + h * .3}" rx="${w}" ry="${h / 2 + 4}" fill="#3a0e0c"/><path d="M${-w + 4},${106 + h * .3 - h / 2} Q0,${106 + h * .3 - h / 2 - 6} ${w - 4},${106 + h * .3 - h / 2}" stroke="#f4eee4" stroke-width="${(4 + 3 * op2).toFixed(1)}" fill="none" opacity=".85"/>` +
      `<ellipse cx="0" cy="${106 + h * .3 + h / 2 - 4}" rx="${w * .55}" ry="${h * .18 + 2}" fill="#b0484a" opacity=".85"/><ellipse cx="0" cy="${106 + h * .3}" rx="${w + 4}" ry="${h / 2 + 7}" fill="none" stroke="#a4504a" stroke-width="7"/>`;
  } else if (An > .05) {
    s += `<path d="M-32,${108 + 4 * An} Q0,${98} 32,${108 + 4 * An}" stroke="#7a2a26" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-30,${112 + 4 * An} Q0,${104} 30,${112 + 4 * An}" stroke="#a4504a" stroke-width="4" fill="none" opacity=".6"/><path d="M-38,${112 + 6 * An} q-4,8 2,14 M38,${112 + 6 * An} q4,8 -2,14" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>`;
  } else s += `<path d="M-36,104 Q-14,96 0,100 Q14,96 36,104 Q16,114 0,113 Q-16,114 -36,104Z" fill="#a4504a"/><path d="M-36,104 Q0,108 36,104" stroke="#5a2420" stroke-width="2.5" fill="none"/><path d="M-20,112 Q0,120 20,112" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`;
  return s + `</g>`;
}

// ---------- a hand seen from the front (wrist at 0,0, fingers up); c = curl of [thumb, index, middle, ring, little] (0 straight .. 1 folded) ----------
function palm(x, y, S, rot, c = [0, 0, 0, 0, 0], o = {}) {
  const sk = o.dark ? 'url(#skinP2)' : 'url(#skinP)', base = o.dark ? '#94603e' : '#b8805e', lit = o.dark ? '#c8946c' : '#e2b294', crease = o.dark ? '#5a3420' : '#7a4a32', mir = o.mir ? -1 : 1;
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(S * mir).toFixed(3)},${S.toFixed(3)})">`;
  s += `<ellipse cx="6" cy="-60" rx="74" ry="96" fill="#000" opacity=".22" filter="url(#blur9)" transform="translate(10,12)"/>`;
  // forearm and wrist
  s += `<path d="M-34,60 C-36,30 -38,10 -40,-8 L40,-8 C38,10 36,30 34,60Z" fill="${base}"/><path d="M-34,60 C-36,30 -38,10 -40,-8 L-24,-8 L-20,60Z" fill="#000" opacity=".14"/>` + (o.sleeve ? `<path d="M-42,64 L-38,24 L38,24 L42,64Z" fill="${o.sleeve}"/><path d="M-40,26 L40,26" stroke="#000" stroke-width="4" opacity=".2"/>` : '');
  // fingers: knuckle x, y, length, width, angle; straight parts behind the palm, folded parts over it
  const F = [[-33, -102, 84, 20, -7], [-11, -108, 94, 21, -2], [11, -106, 88, 20, 3], [32, -97, 68, 17, 9]], over = [];
  F.forEach(([bx, by, L, w, ang], i) => { const cu = clamp(c[i + 1] || 0), a = ang * Math.PI / 180, Ls = L * (1 - cu), ux = Math.sin(a), uy = -Math.cos(a);
    if (Ls > 4) { const ex = bx + ux * Ls, ey = by + uy * Ls, j1 = [bx + ux * Ls * .45, by + uy * Ls * .45], j2 = [bx + ux * Ls * .75, by + uy * Ls * .75];
      s += `<path d="M${bx},${by + 10} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M${bx},${by + 10} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${sk}" stroke-width="${w - 3}" fill="none" stroke-linecap="round"/>` +
        `<path d="M${(bx - w * .25).toFixed(1)},${by + 6} L${(ex - w * .25).toFixed(1)},${(ey + 4).toFixed(1)}" stroke="${lit}" stroke-width="${(w * .22).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".55"/>` +
        [j1, j2].map(j => `<path d="M${(j[0] - w * .38).toFixed(1)},${j[1].toFixed(1)} q${(w * .38).toFixed(1)},3 ${(w * .76).toFixed(1)},0" stroke="${crease}" stroke-width="1.6" fill="none" opacity=".55"/>`).join('') +
        (cu < .3 ? `<ellipse cx="${ex.toFixed(1)}" cy="${(ey + 6).toFixed(1)}" rx="${(w * .3).toFixed(1)}" ry="${(w * .38).toFixed(1)}" fill="#f2cdb6" opacity=".9"/>` : ''); }
    if (cu > .25) { const Lf = L * .52 * cu; over.push(`<path d="M${bx},${by + 2} L${(bx - ux * 4).toFixed(1)},${(by + Lf).toFixed(1)}" stroke="${crease}" stroke-width="${w + 2}" fill="none" stroke-linecap="round" opacity=".55"/><path d="M${bx},${by + 2} L${(bx - ux * 4).toFixed(1)},${(by + Lf).toFixed(1)}" stroke="${base}" stroke-width="${w}" fill="none" stroke-linecap="round"/>` +
      `<path d="M${(bx - w * .2).toFixed(1)},${by} L${(bx - w * .2 - ux * 4).toFixed(1)},${(by + Lf - 4).toFixed(1)}" stroke="${lit}" stroke-width="${(w * .24).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".5"/><circle cx="${bx}" cy="${by + 1}" r="${(w * .42).toFixed(1)}" fill="${lit}" opacity=".45"/>`); } });
  // the palm
  s += `<path d="M-46,-6 C-52,-40 -50,-82 -44,-106 C-24,-118 22,-116 44,-100 C50,-70 50,-36 44,-6 C20,4 -22,4 -46,-6Z" fill="${sk}"/>` +
    `<path d="M-36,-62 Q-6,-50 32,-72 M-40,-40 Q-4,-30 36,-48 M-8,-6 Q-24,-42 -20,-94" stroke="${crease}" stroke-width="2.2" fill="none" opacity=".4"/><path d="M-42,-102 C-22,-114 22,-112 40,-98" stroke="${lit}" stroke-width="4" fill="none" opacity=".35"/>` + over.join('');
  // the thumb
  const ct = c[0] || 0, tb = [-40, -40], tm = [lerp(-74, -40, ct), lerp(-74, -70, ct)], tt = [lerp(-92, -18, ct), lerp(-110, -80, ct)];
  s += `<path d="M${tb[0]},${tb[1]} L${tm[0].toFixed(1)},${tm[1].toFixed(1)} L${tt[0].toFixed(1)},${tt[1].toFixed(1)}" stroke="${base}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${tb[0] + 4},${tb[1] - 4} L${(tm[0] + 4).toFixed(1)},${(tm[1] - 2).toFixed(1)} L${(tt[0] + 3).toFixed(1)},${(tt[1] + 2).toFixed(1)}" stroke="${lit}" stroke-width="6" fill="none" stroke-linecap="round" opacity=".5"/>` +
    `<ellipse cx="${tt[0].toFixed(1)}" cy="${(tt[1] + 4).toFixed(1)}" rx="6" ry="7" fill="#f0c8b0" opacity=".8"/>`;
  return s + `</g>`;
}
// hand shapes used as "signs"
const HS = [[0, 0, 0, 0, 0], [1, 0, 1, 1, 1], [1, 0, 0, 1, 1], [0, 1, 1, 1, 0], [1, 1, 1, 1, 1], [0, 1, 1, 1, 1], [.6, .5, .5, .5, .5]];
const hsMix = (a, b, u) => a.map((v, i) => lerp(v, b[i], u));
// smooth cycle through hand shapes
function hsAt(t, rate, seed) { const p = t * rate + seed, i = Math.floor(p), u = ease(clamp((p - i - .55) / .45)); return hsMix(HS[i % HS.length], HS[(i + 1) % HS.length], u); }
// signing arm targets for a side-view hero at (x, y) with scale s and facing f
function signT(t, x, y, s, f, seed, k = 1) {
  const a = t * 3.4 + seed, b = t * 2.7 + seed * 1.7;
  return { hF: [x + f * s * (34 + 22 * Math.sin(a) * k), y - s * (236 + 34 * Math.sin(b) * k)], hB: [x + f * s * (18 + 24 * Math.cos(a * .8) * k), y - s * (214 + 30 * Math.cos(b * 1.2) * k)] };
}
// a small open hand at a hero's hand point (side view), so signing is visible
const miniHand = (P, s, f, ang, cu) => palm(P[0], P[1], s * .16, ang, cu || [0, 0, 0, 0, 0], { mir: f < 0 });

// a speech bubble with scribbled "words"; a = opacity, pop = 0..1 bursts it
function bubble(x, y, w, h, a, pop = 0, tailDx = -20, col = '#fff', seed = 1) {
  if (a <= .01) return '';
  const sc = 1 + .5 * pop, op = a * (1 - pop), r = RS(seed);
  let s = `<g opacity="${op.toFixed(2)}" transform="translate(${x},${y}) scale(${sc.toFixed(3)})"><rect x="${-w / 2 + 3}" y="${-h / 2 + 5}" width="${w}" height="${h}" rx="${h * .42}" fill="#000" opacity=".25"/>` +
    `<path d="M${tailDx - 10},${h / 2 - 4} L${tailDx - 22},${h / 2 + 22} L${tailDx + 12},${h / 2 - 4}Z" fill="${col}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h * .42}" fill="${col}"/>`;
  const rows = h > 50 ? 2 : 1; for (let q = 0; q < rows; q++) { let xx = w / 2 - 18; const yy = -h / 2 + h * (q + 1) / (rows + 1); while (xx > -w / 2 + 26) { const ww = 14 + r() * 26; s += `<path d="M${xx.toFixed(1)},${yy.toFixed(1)} L${Math.max(xx - ww, -w / 2 + 18).toFixed(1)},${yy.toFixed(1)}" stroke="#5a6070" stroke-width="5" stroke-linecap="round"/>`; xx -= ww + 9; } }
  s += `</g>`;
  if (pop > 0 && pop < 1) for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283, d = w * .5 + 40 * pop; s += `<path d="M${(x + Math.cos(an) * d * .7).toFixed(1)},${(y + Math.sin(an) * d * .5).toFixed(1)} L${(x + Math.cos(an) * d).toFixed(1)},${(y + Math.sin(an) * d * .7).toFixed(1)}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity="${(a * (1 - pop)).toFixed(2)}"/>`; }
  return s;
}
// a mouth drawn on the last side-view hero (HP), open by k
const sideMouth = (s, f, k) => { const h = HP.head; if (k <= .02) return ''; const mx = h[0] + f * 15 * s, my = h[1] + 13 * s; return `<ellipse cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" rx="${(3.4 * s).toFixed(1)}" ry="${(1 + 4.6 * k * s).toFixed(1)}" fill="#3a0e0c"/>`; };
// a phone in the hand (side view)
const phoneIn = (P, s, f, glow = 1) => `<g transform="translate(${P[0].toFixed(1)},${P[1].toFixed(1)}) rotate(${-f * 18}) scale(${s})"><rect x="-7" y="-13" width="14" height="24" rx="3" fill="#15181e"/><rect x="-5.6" y="-11" width="11.2" height="19" rx="2" fill="#8ac4ff" opacity="${(.9 * glow).toFixed(2)}"/></g>` + (glow > 0 ? `<circle cx="${P[0].toFixed(1)}" cy="${P[1].toFixed(1)}" r="${(22 * s).toFixed(1)}" fill="url(#scrGl)" opacity="${glow.toFixed(2)}"/>` : '');

// 0: a face tries to speak; the sound waves die and the speech bubble is empty
