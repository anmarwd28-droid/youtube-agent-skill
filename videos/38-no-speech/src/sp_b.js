// ===================== "what if all humans lost the ability to speak?" (Short #38) =====================
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
function sceneHook(t) {
  const z = 1 + .06 * ease(clamp(t / 4.2)), stop = ease(ramp(t, WS(0, 7) - .2, WS(0, 8) + .1)), sh = ease(ramp(t, WS(0, 8) - .1, WS(0, 8) + .4));
  const talk = (1 - stop) * clamp(t * 3) * (.45 + .45 * Math.abs(Math.sin(t * 9.5))) + stop * .25 * sh;
  let s = `<defs>${DEFS()}</defs>` + studio('stH', '#3a4664', '#0a0e1a', 25);
  s += `<ellipse cx="360" cy="1180" rx="320" ry="60" fill="#000" opacity=".35" filter="url(#blur16)"/>`;
  s += `<g transform="translate(360,760) scale(${z.toFixed(4)}) translate(-360,-760)">` + faceF('fh', 360, 760, 1.35, { top: '#7a3a3a', talk, mood: sh > .02 ? 'fear' : '', k: sh * .9, look: .15 * Math.sin(t * .9) }) + `</g>`;
  // sound waves from the mouth, then they die
  const my = 760 + (760 + 112 * 1.35 - 760) * z;
  for (let i = 0; i < 5; i++) { const p = pmod(t * 1.4 + i / 5, 1), A = (1 - p) * (1 - stop) * clamp(t * 2); if (A > .02) [-1, 1].forEach(q => { const r = 310 + p * 110; s += `<path d="M${(360 + q * r * .62).toFixed(1)},${(my - r * .45).toFixed(1)} Q${(360 + q * r * .9).toFixed(1)},${my.toFixed(1)} ${(360 + q * r * .62).toFixed(1)},${(my + r * .45).toFixed(1)}" stroke="#f4c76b" stroke-width="${(7 - 4 * p).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(.85 * A).toFixed(2)}"/>`; }); }
  // the empty bubble with a red bar
  const eb = ease(ramp(t, WS(0, 7), WS(0, 8)));
  if (eb > 0) { s += `<g opacity="${eb.toFixed(2)}" transform="translate(590,430)"><path d="M-40,40 L-80,84 L-6,40Z" fill="#fff"/><rect x="-104" y="-52" width="208" height="104" rx="46" fill="#fff"/>` + [-42, 0, 42].map(x => `<circle cx="${x}" cy="0" r="11" fill="#c8ccd6"/>`).join('') + `</g>`;
    s += `<path d="M494,500 L686,360" stroke="#e0483a" stroke-width="14" stroke-linecap="round" opacity="${(eb * .9).toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}

// 1: a busy street full of talk; 16,000 words a day each; then silence
function sceneWords(t) {
  const T = t - S0(1), cnt = ease(ramp(t, WS(1, 3) - .2, WS(1, 9))), sil = ramp(t, WS(1, 10) - .1, WS(1, 10) + .35), silK = ease(ramp(t, WS(1, 10), WS(1, 11)));
  const y0 = PV + 74;
  let fg = '';
  const people = [[120, 1, 0, 0], [250, -1, 1, 1.3], [470, 1, 2, 2.1], [600, -1, 3, .7]];
  people.forEach(([x, f, pi, ph], i) => { const ges = (1 - silK) * (.5 + .5 * Math.sin(T * 2 + ph));
    fg += hero(x, y0 - (i % 2) * 6, Object.assign({ s: .62, face: f, shade: 1, hF: [x + f * 40, y0 - 150 - 30 * ges], lookUp: silK * .15 * (i % 2 ? 1 : -1) }, palS(pi)));
    fg += sideMouth(.62, f, (1 - silK) * (.4 + .6 * Math.abs(Math.sin(T * 8 + ph * 3))));
    const H = HP.head, on = clamp((pmod(T * .55 + i * .27, 1) < .62 ? 1 : 0));
    const a = (i % 2 === 0 ? 1 : 1) * on * (1 - (sil >= 1 ? 1 : 0)) * ease(ramp(t, S0(1) - .2 + i * .25, S0(1) + .2 + i * .25));
    fg += bubble(H[0] + f * 40, H[1] - 96, 130, 60, a, sil > 0 && sil < 1 ? sil : 0, -f * 22, ['#ffffff', '#fff6dc', '#e8f4ff', '#fff'][i], 31 + i + Math.floor(T * .55 + i * .27)); });
  // a man walking past, talking on the phone
  const wx = pmod(-80 + T * 46, 900) - 60; fg += onWalk(wx, y0 + 8, PALS[4], .6, 1, t, { moving: 1 });
  let s = `<defs>${SPDEF}${OEDEF}</defs>` + street3(t, { N: 0, id: 'w', fg, cars: 1, carX: 600 });
  // the word counter
  const n = sil > 0 ? Math.round(16000 * (1 - ease(sil))) : Math.round(16000 * cnt);
  const ca = ease(ramp(t, WS(1, 3) - .3, WS(1, 3)));
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}">` + panel(190, 410, 340, 150) + lbl(360, 490, ARK(n), 1, sil > 0 ? '#ff8a7a' : '#f4c76b', 64) + lbl(360, 536, 'كلمة كلَّ يوم', 1, '#fff', 28) + `</g>`;
  if (silK > 0) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#0a1020" opacity="${(.18 * silK).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 2: about 7,000 languages around the Earth fall silent at once
const HELLO = [['مرحباً', 'ar'], ['Hello', 'la'], ['你好', 'cj'], ['Hola', 'la'], ['Привет', 'la'], ['Bonjour', 'la'], ['こんにちは', 'cj'], ['Olá', 'la'], ['Jambo', 'la'], ['Merhaba', 'la'], ['안녕하세요', 'cj'], ['Γειά σου', 'la'], ['Hallo', 'la'], ['Ciao', 'la'], ['สวัสดี', 'th'], ['Sawubona', 'la'], ['Salam', 'la'], ['Kia ora', 'la']];
const FONT = { ar: 'Noto Naskh Arabic', la: 'Inter', cj: 'WenQuanYi Zen Hei', th: 'Loma' };
function sceneLangs(t) {
  const T = t - S0(2), g = glB(t, { d: 12.2, az: .2, spin: 3.4, sp: .05, lights: .55, el: .3, tg: [0, .5, 0] }), off = ease(ramp(t, WS(2, 6) - .2, WS(2, 7) + .2));
  const cx = g.c0[0], cy = g.c0[1], R = g.R;
  let s = space(t);
  const SLOT = [[200, 450], [360, 418], [520, 450], [92, 560], [78, 680], [92, 800], [116, 920], [628, 560], [642, 680], [628, 800], [604, 920], [214, 1010], [506, 1010], [360, 1078]];
  SLOT.forEach(([x0, y0], i) => { const [w, fnt] = HELLO[i], a = ease(ramp(t, S0(2) - .2 + i * .1, S0(2) + .3 + i * .1)) * (1 - off), fall = off * 90, x = x0 + 4 * Math.sin(T * 1.1 + i), y = y0 + 6 * Math.sin(T * 1.4 + i * 2) + fall;
    if (a > .01) { const fs = fnt === 'cj' ? 24 : 26, wpx = Math.min(150, (fnt === 'cj' ? w.length * 25 : fnt === 'th' ? w.length * 11 : w.length * 14.5) + 30), sc = .85 + .15 * a;
      s += `<g opacity="${a.toFixed(2)}" transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${sc.toFixed(3)})"><rect x="${(-wpx / 2).toFixed(1)}" y="-24" width="${wpx.toFixed(1)}" height="44" rx="20" fill="#0a0e1c" opacity=".78"/><rect x="${(-wpx / 2).toFixed(1)}" y="-24" width="${wpx.toFixed(1)}" height="44" rx="20" fill="none" stroke="#f4c76b" stroke-width="2" opacity=".7"/>` +
        `<text x="0" y="8" text-anchor="middle" font-family="${FONT[fnt]}" font-weight="700" font-size="${fs}" fill="${i % 3 === 0 ? '#ffe7a8' : '#fff'}"${fnt === 'ar' ? ' direction="rtl"' : ''}>${w}</text></g>`; } });
  // a silence ring that sweeps over the globe
  if (off > 0 && off < 1) s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(R * (1 + off * 1.4)).toFixed(1)}" fill="none" stroke="#c8d4ff" stroke-width="${(10 * (1 - off)).toFixed(1)}" opacity="${(.7 * (1 - off)).toFixed(2)}"/>`;
  F.ov = ''; return s;
}

// 3: no calls, silent radio, songs without words
function phoneBig(x, y, S, t, st) {
  // st: 0 ringing, 1 answered with a flat voice line and a muted mic
  let s = `<g transform="translate(${x},${y}) scale(${S})"><rect x="-118" y="-232" width="236" height="464" rx="36" fill="#000" opacity=".45" filter="url(#blur9)" transform="translate(12,16)"/>` +
    `<rect x="-118" y="-232" width="236" height="464" rx="36" fill="#1a1c22"/><rect x="-110" y="-224" width="220" height="448" rx="30" fill="url(#phG)"/><rect x="-30" y="-216" width="60" height="12" rx="6" fill="#05070c"/>` +
    `<path d="M-110,-150 L-30,-224 L10,-224 L-110,-110Z" fill="#fff" opacity=".06"/>`;
  s += `<circle cx="0" cy="-110" r="46" fill="#3a5a8a"/><circle cx="0" cy="-124" r="18" fill="#c8d4e8"/><path d="M-30,-82 Q0,-108 30,-82" fill="#c8d4e8"/>` + lbl(0, -36, st < .5 ? 'مكالمةٌ واردة' : 'المكالمة جارية', 1, '#fff', 22);
  if (st < .5) { const pulse = .5 + .5 * Math.sin(t * 10); [[-56, '#2ab05a'], [56, '#e0483a']].forEach(([bx, c], i) => { s += `<circle cx="${bx}" cy="150" r="${30 + (i ? 0 : 6 * pulse)}" fill="${c}" opacity="${i ? 1 : .35}"/><circle cx="${bx}" cy="150" r="28" fill="${c}"/><path d="M${bx - 12},${150 - 4} q12,-12 24,0" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" transform="rotate(${i ? 135 : 0},${bx},150)"/>`; }); }
  else { s += `<path d="M-90,40 L90,40" stroke="#5af0a0" stroke-width="4" opacity=".9"/>` + Array.from({ length: 10 }, (_, i) => `<circle cx="${-81 + i * 18}" cy="40" r="2" fill="#5af0a0"/>`).join('') +
      `<circle cx="0" cy="140" r="34" fill="#2a2e3a"/><rect x="-9" y="116" width="18" height="30" rx="9" fill="#fff"/><path d="M-16,138 q16,18 32,0 M0,156 v8" stroke="#fff" stroke-width="4" fill="none"/><path d="M-26,112 L26,170" stroke="#e0483a" stroke-width="7" stroke-linecap="round"/>`; }
  return s + `</g>`;
}
function radio(x, y, S, t, on) {
  let s = `<g transform="translate(${x},${y}) scale(${S})"><ellipse cx="0" cy="104" rx="170" ry="16" fill="#000" opacity=".45" filter="url(#blur9)"/>` +
    `<path d="M40,-96 L120,-210" stroke="#c8ccd6" stroke-width="5" stroke-linecap="round"/><circle cx="120" cy="-210" r="6" fill="#e8ecf2"/>` +
    `<rect x="-160" y="-100" width="320" height="200" rx="28" fill="url(#radG)"/><rect x="-160" y="-100" width="320" height="200" rx="28" fill="#000" filter="url(#grainR)" opacity=".2"/><rect x="-150" y="-92" width="300" height="12" rx="6" fill="#fff" opacity=".14"/>` +
    `<circle cx="-62" cy="6" r="72" fill="#3a2614"/><circle cx="-62" cy="6" r="64" fill="url(#grillG)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-122 + i * 15},${6 - Math.sqrt(Math.max(0, 64 * 64 - Math.pow(-60 + i * 15, 2))) * .92} V${6 + Math.sqrt(Math.max(0, 64 * 64 - Math.pow(-60 + i * 15, 2))) * .92}" stroke="#6a5a40" stroke-width="3"/>`).join('') +
    `<rect x="30" y="-62" width="108" height="46" rx="8" fill="#e8d8a8"/><rect x="30" y="-62" width="108" height="46" rx="8" fill="#ffd27a" opacity="${(.5 * on).toFixed(2)}"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M${40 + i * 12},-56 v${i % 2 ? 10 : 16}" stroke="#5a4a30" stroke-width="2"/>`).join('') + `<path d="M${74 + 20 * Math.sin(t * .4)},-60 v40" stroke="#d0302a" stroke-width="3"/>` +
    [[56, 40], [112, 40]].map(([kx, ky]) => `<circle cx="${kx}" cy="${ky}" r="20" fill="#2a1a10"/><circle cx="${kx}" cy="${ky}" r="15" fill="#c8b48a"/><path d="M${kx},${ky - 13} v10" stroke="#3a2a18" stroke-width="3"/>`).join('') + `</g>`;
  return s;
}
function sceneCalls(t) {
  const T = t - S0(3), ans = ease(ramp(t, WS(3, 1) - .1, WS(3, 1) + .3)), ra = ease(ramp(t, WS(3, 4) - .3, WS(3, 4) + .1)), off = ease(ramp(t, WS(3, 5) - .2, WS(3, 5) + .3)), so = ease(ramp(t, WS(3, 6) - .3, WS(3, 6) + .2));
  let s = `<defs>${DEFS()}<linearGradient id="deskG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5236"/><stop offset="1" stop-color="#4a301c"/></linearGradient></defs>` + studio('stC', '#3a3040', '#0c0a12', 33);
  // a desk top with soft lamp light
  s += `<path d="M-20,900 L740,900 L740,1300 L-20,1300Z" fill="url(#deskG)"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="896" width="760" height="8" fill="#a07a56"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M-20,${940 + i * 60} C200,${930 + i * 60} 500,${954 + i * 60} 740,${936 + i * 60}" stroke="#2a1a10" stroke-width="2" fill="none" opacity=".35"/>`).join('') + scr(`<circle cx="560" cy="700" r="380" fill="url(#warmG)" opacity=".55"/>`);
  // the phone (left), shaking while it rings
  const shake = ans < 1 ? Math.sin(t * 40) * 3 * (1 - ans) : 0;
  s += `<g transform="rotate(${(-6 + shake).toFixed(2)},210,760)">` + phoneBig(210, 760, .92, t, ans) + `</g>`;
  if (ans < .5) for (let i = 0; i < 3; i++) { const p = pmod(t * 1.6 + i / 3, 1); s += `<path d="M${(330 + p * 40).toFixed(1)},${(560 - p * 20).toFixed(1)} q${(16 + 20 * p).toFixed(1)},30 0,60" stroke="#fff" stroke-width="4" fill="none" opacity="${((1 - p) * .7 * (1 - ans * 2)).toFixed(2)}"/>`; }
  // the radio (right) with its on-air light
  s += `<g opacity="${ra.toFixed(2)}">` + radio(510, 800, .74, t, 1 - off) + `</g>`;
  if (ra > 0) { const la = ra * (1 - off * .85); s += `<g opacity="${ra.toFixed(2)}"><rect x="430" y="500" width="180" height="56" rx="12" fill="#2a0a0a"/><rect x="436" y="506" width="168" height="44" rx="9" fill="#e0302a" opacity="${(.25 + .75 * la).toFixed(2)}"/>` + lbl(520, 538, 'على الهواء', 1, la > .5 ? '#fff' : '#a88', 26) + `</g>` + (la > .5 ? `<circle cx="520" cy="528" r="120" fill="#ff3a2a" opacity="${(.15 * la).toFixed(2)}" filter="url(#blur16)"/>` : '');
    for (let i = 0; i < 3; i++) { const p = pmod(t * 1.3 + i / 3, 1), A = (1 - p) * (1 - off); if (A > .02) s += `<path d="M${(370 - p * 50).toFixed(1)},${(770 - p * 30).toFixed(1)} q${(-20 - 26 * p).toFixed(1)},${(30 + p * 30).toFixed(1)} 0,${(60 + p * 60).toFixed(1)}" stroke="#f4c76b" stroke-width="5" fill="none" opacity="${(.8 * A * ra).toFixed(2)}"/>`; } }
  // songs: notes still float, but the lyric line is empty
  if (so > 0) { for (let i = 0; i < 5; i++) { const p = pmod(T * .35 + i / 5, 1), nx = 380 + i * 34 + 24 * Math.sin(T * 1.5 + i), ny = 820 - p * 200; s += `<g opacity="${(so * Math.sin(p * 3.14)).toFixed(2)}"><ellipse cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" rx="11" ry="8" fill="#f4c76b" transform="rotate(-20,${nx.toFixed(1)},${ny.toFixed(1)})"/><path d="M${(nx + 9).toFixed(1)},${ny.toFixed(1)} v-40 q14,6 16,18" stroke="#f4c76b" stroke-width="4" fill="none"/></g>`; }
    s += `<g opacity="${so.toFixed(2)}">` + panel(140, 1040, 440, 110) + lbl(360, 1084, '♪  ـــــ  ـــ  ـــــــ  ♪', 1, '#c8ccd6', 30) + lbl(360, 1128, 'لحنٌ… بلا كلمات', 1, '#f4c76b', 26) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 4: emergencies: nobody can shout "watch out!" or call for help with a voice
function sceneDanger(t) {
  const T = t - S0(4), y0 = PV + 74;
  const step = ease(ramp(t, WS(4, 2), WS(4, 5))), see = ease(ramp(t, WS(4, 5) - .3, WS(4, 6))), brake = clamp((t - (WS(4, 7) + .2)) / 1.1);
  // the car comes from the right and stops just in time
  const cx0 = 1000, cStop = 600, tc0 = S0(4) + .3, tcS = WS(4, 7) + .2; let carX;
  if (t < tcS) carX = lerp(cx0, cStop + 150, clamp((t - tc0) / (tcS - tc0))); else carX = cStop + 150 - 150 * (1 - Math.pow(1 - brake, 2));
  let fg = '';
  // the man with the phone, stepping off the kerb
  const px = 420 + 50 * step, py = y0 + 72 * step;
  fg += hero(px, py, Object.assign({ s: .64, face: 1, shade: 1, walk: step < 1 && step > 0 ? T * 5 : null, amp: .35, hF: [px + 30, py - 168], hB: [px + 18, py - 150] }, palS(5)));
  fg += phoneIn(HP.hand, .9, 1, .9);
  // the woman behind who sees the car: arms up, mouth wide, no sound
  const wx = 200, wy = y0 - 4;
  fg += hero(wx, wy, Object.assign({ s: .62, face: 1, shade: 1, hF: [wx + lerp(30, 70, see), wy - lerp(140, 300, see)], hB: [wx + lerp(10, 40, see), wy - lerp(130, 280, see)], lean: 8 * see }, palS(6), { top: '#3a6a8a' }));
  fg += sideMouth(.62, 1, see * (.7 + .3 * Math.sin(t * 12)));
  const WH = Object.assign({}, HP);
  const skid = t > tcS ? clamp((t - tcS) / .6) : 0;
  if (skid > 0) fg += `<path d="M${carX + 60},1196 L${carX + 60 + 160 * skid},1196 M${carX + 60},1150 L${carX + 60 + 160 * skid},1150" stroke="#1a1a1e" stroke-width="7" opacity=".55"/>`;
  fg += car(carX, 1186, .95, '#c8322a', -1, 0);
  if (brake > 0 && brake < 1) fg += `<g opacity="${(1 - brake).toFixed(2)}"><rect x="${carX + 96}" y="1132" width="12" height="18" rx="3" fill="#ff3a2a"/><circle cx="${carX + 102}" cy="1141" r="26" fill="#ff3a2a" opacity=".35" filter="url(#blur9)"/></g>`;
  let s = `<defs>${SPDEF}${OEDEF}</defs>` + street3(t, { N: 0, id: 'd', fg, cars: 0 });
  // her empty shout: the bubble "انتبه!" crossed out
  const sb = ease(ramp(t, WS(4, 6) - .1, WS(4, 7)));
  if (sb > 0) { const bx = WH.head[0] + 70, by = WH.head[1] - 130;
    s += `<g opacity="${sb.toFixed(2)}"><path d="M${bx - 60},${by + 36} L${bx - 96},${by + 76} L${bx - 26},${by + 40}Z" fill="#fff"/><rect x="${bx - 110}" y="${by - 44}" width="220" height="88" rx="38" fill="#fff"/>` + lbl(bx, by + 14, 'انتبهْ!', 1, '#c0302a', 40) +
      `<path d="M${bx - 110},${by + 40} L${bx + 110},${by - 40}" stroke="#e0483a" stroke-width="10" stroke-linecap="round" opacity=".9"/></g>`; }
  // the ambulance call: an inset with a muted call
  const am = ease(ramp(t, WS(4, 10) - .3, WS(4, 10) + .2));
  if (am > 0) { const ix = 520, iy = 560, R = 136;
    s += `<defs><clipPath id="amC"><circle cx="${ix}" cy="${iy}" r="${R}"/></clipPath></defs><g opacity="${am.toFixed(2)}"><circle cx="${ix}" cy="${iy}" r="${R + 8}" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#amC)"><rect x="${ix - R}" y="${iy - R}" width="${2 * R}" height="${2 * R}" fill="#e8eef4"/>` +
      // a simple ambulance from the side
      `<g transform="translate(${ix - 110},${iy - 30})"><rect x="0" y="0" width="150" height="90" rx="10" fill="#fff"/><path d="M150,26 L196,26 L218,58 L218,90 L150,90Z" fill="#fff"/><path d="M158,32 L192,32 L208,56 L158,56Z" fill="#7aa8cc"/><rect x="0" y="52" width="218" height="10" fill="#e0302a"/>` +
      `<rect x="56" y="16" width="36" height="12" fill="#e0302a"/><rect x="68" y="4" width="12" height="36" fill="#e0302a"/><rect x="60" y="-10" width="26" height="10" rx="3" fill="#2a6ae0" opacity="${(.5 + .5 * Math.sin(t * 16)).toFixed(2)}"/><circle cx="44" cy="92" r="17" fill="#222"/><circle cx="44" cy="92" r="7" fill="#999"/><circle cx="178" cy="92" r="17" fill="#222"/><circle cx="178" cy="92" r="7" fill="#999"/></g>` +
      `<rect x="${ix - R}" y="${iy + 82}" width="${2 * R}" height="80" fill="#5a6070"/></g><circle cx="${ix}" cy="${iy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/>` +
      `<g transform="translate(${ix + 92},${iy - 92})"><circle r="40" fill="#2a2e3a"/><rect x="-9" y="-24" width="18" height="30" rx="9" fill="#fff"/><path d="M-16,-2 q16,18 32,0 M0,16 v8" stroke="#fff" stroke-width="4" fill="none"/><path d="M-26,-28 L26,30" stroke="#e0483a" stroke-width="7" stroke-linecap="round"/></g></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 5: messages and writing become our voice
function sceneText(t) {
  const T = t - S0(5), y0 = PV + 74, wr = ease(ramp(t, WS(5, 5) - .2, WS(5, 6) + .2));
  let fg = '';
  const P = [[110, 1, 7], [330, -1, 8], [470, 1, 2], [630, -1, 9]];
  const hands = [];
  P.forEach(([x, f, pi], i) => { fg += hero(x, y0 - (i % 2) * 8, Object.assign({ s: .62, face: f, shade: 1, hF: [x + f * 26, y0 - 170], hB: [x + f * 14, y0 - 156], lookUp: -.25 }, palS(pi)));
    hands.push(HP.hand.slice()); fg += phoneIn(HP.hand, .9, f, .95); });
  // a woman holding up a written sign
  let s = `<defs>${SPDEF}${OEDEF}</defs>` + street3(t, { N: 0, id: 'x', fg, cars: 1, carX: 640 });
  // message bubbles flying between the phones
  const MSG = ['أينَ أنت؟', 'قادم!', 'شكراً', 'موافق 👍'];
  for (let i = 0; i < 4; i++) { const pr = i % 2, back = i >= 2, p = pmod(T * .5 + (pr ? .5 : 0) + (back ? .25 : 0), 1) * (1) , a = hands[pr * 2 + (back ? 1 : 0)], b = hands[pr * 2 + (back ? 0 : 1)]; if (pmod(T * .25 + (back ? .5 : 0), 1) > .5) continue;
    const x = lerp(a[0], b[0], p), y = lerp(a[1], b[1], p) - 110 * Math.sin(p * Math.PI) - 40, A = Math.sin(p * Math.PI) * ease(ramp(t, S0(5) + i * .2, S0(5) + .4 + i * .2));
    if (A > .03) { const w = MSG[i].length * 17 + 40; s += `<g opacity="${A.toFixed(2)}"><rect x="${(x - w / 2).toFixed(1)}" y="${(y - 24).toFixed(1)}" width="${w}" height="46" rx="20" fill="${i % 2 ? '#dcf8c6' : '#ffffff'}"/><rect x="${(x - w / 2).toFixed(1)}" y="${(y - 24).toFixed(1)}" width="${w}" height="46" rx="20" fill="none" stroke="#000" stroke-opacity=".15" stroke-width="2"/>` +
      `<text x="${x.toFixed(1)}" y="${(y + 8).toFixed(1)}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#1c2a1c">${MSG[i]}</text></g>`; } }
  // a notebook inset: handwriting appears
  if (wr > 0) { const nx = 290, ny = 560;
    s += `<g opacity="${wr.toFixed(2)}" transform="rotate(-4,${nx},${ny})"><rect x="${nx - 170}" y="${ny - 96}" width="340" height="200" rx="8" fill="#000" opacity=".4" filter="url(#blur9)"/><rect x="${nx - 176}" y="${ny - 104}" width="340" height="200" rx="8" fill="#f6efe0"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${nx - 160},${ny - 60 + i * 34} L${nx + 150},${ny - 60 + i * 34}" stroke="#8ab0d0" stroke-width="1.6" opacity=".6"/>`).join('') +
      `<path d="M${nx - 120},${ny - 104} V${ny + 96}" stroke="#e08a8a" stroke-width="2" opacity=".7"/>` +
      `<defs><clipPath id="wrC"><rect x="${nx + 160 - 320 * ease(ramp(t, WS(5, 5), WS(5, 8) + .3))}" y="${ny - 100}" width="330" height="200"/></clipPath></defs><g clip-path="url(#wrC)"><text x="${nx + 130}" y="${ny - 4}" text-anchor="start" direction="rtl" font-family="Amiri" font-size="46" fill="#1a2a5a">سأكتبُ لك…</text></g></g>`; }
  noEarth(); F.ov = ''; return s;
}

// 6: faces speak: joy, fear and anger are understood almost everywhere
function sceneFaces(t) {
  const kJ = ease(ramp(t, WS(6, 2) - .2, WS(6, 2) + .3)), kF = ease(ramp(t, WS(6, 3) - .2, WS(6, 3) + .3)), kA = ease(ramp(t, WS(6, 4) - .2, WS(6, 4) + .3)), a = ease(ramp(t, S0(6) - .2, S0(6) + .4));
  let s = `<defs>${DEFS()}</defs>` + studio('stF', '#2e3a54', '#090c18', 37);
  const C = [[125, 'joy', kJ, '#c8742a', '#2a1a12', 'الفرح', 0, '#ffe7a8'], [360, 'fear', kF, '#3a6a9a', '#3a2416', 'الخوف', .1, '#bfe0ff'], [595, 'anger', kA, '#8a2a2a', '#1a120c', 'الغضب', -.1, '#ff9a8a']];
  C.forEach(([x, mood, k, top, hair, name, look, lc], i) => { const y = 520, w = 214, h = 330, pop = 1 + .04 * Math.sin(Math.PI * clamp(k));
    s += `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y + h / 2}) scale(${pop.toFixed(3)}) translate(${-x},${-(y + h / 2)})"><defs><clipPath id="fc${i}"><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath><radialGradient id="fcb${i}" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="${mix(top, '#ffffff', .35)}"/><stop offset="1" stop-color="${mix(top, '#000000', .55)}"/></radialGradient></defs>` +
      `<rect x="${x - w / 2 + 6}" y="${y + 10}" width="${w}" height="${h}" rx="22" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#fc${i})"><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" fill="url(#fcb${i})"/>` +
      faceF('fe' + i, x, y + 175, .58, { mood, k, top: mix(top, '#202020', .3), hair, look: look + .1 * Math.sin(t * 1.3 + i) }) + `</g><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="22" fill="none" stroke="${k > .5 ? '#f4c76b' : '#ffffff'}" stroke-opacity="${k > .5 ? .95 : .25}" stroke-width="${k > .5 ? 5 : 2}"/></g>`;
    if (k > 0) s += lbl(x, y + h + 56, name, k, lc, 40); });
  // the whole world understands: a row of small figures of many peoples under the cards
  const wk = ease(ramp(t, WS(6, 5) - .2, WS(6, 6) + .2));
  if (wk > 0) { let row = ''; for (let i = 0; i < 6; i++) { const x = 75 + i * 114, c = PALS[(i * 3) % PALS.length]; row += hero(x, 1262, Object.assign({ s: .58, face: i % 2 ? -1 : 1, shade: 1 }, { top: c.top, pants: c.pants, skin: ['#e0b090', '#c89070', '#8a5a3c', '#a87050', '#f0c8a8', '#6a4028'][i % 6], hair: c.hair })); }
    s += `<g opacity="${wk.toFixed(2)}">${row}</g>`; }
  noEarth(); F.ov = ''; return s;
}

// 7: sign languages: more than 300, used today by millions of deaf people
function sceneSign(t) {
  const T = t - S0(7), y0 = PV + 74, cards = ease(ramp(t, WS(7, 3) - .2, WS(7, 4)));
  let fg = '';
  const A = signT(t, 230, y0, .9, 1, 0), B = signT(t + .7, 490, y0, .9, -1, 2.2);
  fg += hero(230, y0, Object.assign({ s: .9, face: 1, shade: 1 }, A, palS(2), { top: '#2a7a6a' }));
  fg += miniHand(HP.hand, .9, 1, -20 + 20 * Math.sin(t * 3), hsAt(t, 1.4, 0)) + miniHand(HP.handB, .9, 1, 10 + 15 * Math.cos(t * 2.4), hsAt(t, 1.1, 3));
  fg += hero(490, y0, Object.assign({ s: .9, face: -1, shade: 1 }, B, palS(1), { top: '#a8562a' }));
  fg += miniHand(HP.hand, .9, -1, 20 - 20 * Math.sin(t * 2.8), hsAt(t, 1.3, 2)) + miniHand(HP.handB, .9, -1, -10 - 15 * Math.cos(t * 2.1), hsAt(t, 1.2, 5));
  let s = `<defs>${SPDEF}${OEDEF}</defs>` + street3(t, { N: 0, id: 'g', fg, cars: 0 });
  // hand-shape cards: each a different sign
  if (cards > 0) { const W = 170, H = 190, y = 400;
    [[150, 0], [360, 2], [570, 3]].forEach(([x, i], q) => { const lit = .5 + .5 * Math.max(0, Math.sin(T * 2.2 - q * 1.2)), k = ease(clamp(cards * 3 - q));
      s += `<g opacity="${k.toFixed(2)}"><rect x="${x - W / 2 + 5}" y="${y + 8}" width="${W}" height="${H}" rx="18" fill="#000" opacity=".35" filter="url(#blur5)"/><rect x="${x - W / 2}" y="${y}" width="${W}" height="${H}" rx="18" fill="#f6efe0"/><rect x="${x - W / 2}" y="${y}" width="${W}" height="${H}" rx="18" fill="none" stroke="#f4c76b" stroke-width="${(2 + 3 * lit).toFixed(1)}" opacity="${(.5 + .5 * lit).toFixed(2)}"/>` +
        palm(x, y + H - 14, .72, 0, hsAt(T + q * 1.7, .5, q * 2), { sleeve: ['#2a7a6a', '#a8562a', '#3a5a9a'][q] }) + `</g>`; }); }
  // a sign-language motion trail around the first signer's hand
  noEarth(); F.ov = ''; return s;
}

// 8: the twist: deaf children in Nicaragua invented a full sign language by themselves
function sceneSchool(t) {
  const T = t - S0(8), a = ease(ramp(t, S0(8) - .2, S0(8) + .4)), bd = ease(ramp(t, WS(8, 5) - .2, WS(8, 9)));
  let s = `<defs>${DEFS()}</defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#wallC)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
  // windows with daylight on the left wall, the chalkboard
  [[40, 380], [40, 700]].forEach(([wx, wy]) => { s += `<rect x="${wx - 8}" y="${wy - 8}" width="156" height="236" fill="#8a6a4a"/><rect x="${wx}" y="${wy}" width="140" height="220" fill="url(#winL)"/><path d="M${wx + 70},${wy} V${wy + 220} M${wx},${wy + 110} H${wx + 140}" stroke="#8a6a4a" stroke-width="8"/>` +
    `<path d="M${wx + 10},${wy + 210} L${wx + 60},${wy + 20}" stroke="#fff" stroke-width="10" opacity=".35"/><rect x="${wx}" y="${wy + 214}" width="140" height="8" fill="#000" opacity=".2"/>`; });
  s += scr(`<path d="M180,600 L420,700 L420,1260 L120,1260Z" fill="#fff4d0" opacity=".14" filter="url(#soft)"/>`);
  s += `<rect x="232" y="400" width="456" height="280" rx="6" fill="#5a3e26"/><rect x="246" y="414" width="428" height="252" fill="url(#boardG)"/><rect x="246" y="414" width="428" height="252" fill="#fff" filter="url(#grainR)" opacity=".07"/><rect x="236" y="676" width="448" height="12" fill="#8a6a4a"/>`;
  // chalk drawings of hand shapes appear on the board
  [[330, 0], [460, 2], [590, 3]].forEach(([x, i], q) => { const k = ease(ramp(t, S0(8) + .4 + q * .5, S0(8) + 1 + q * .5)) * a;
    s += `<g opacity="${(k * .85).toFixed(2)}" style="filter:grayscale(1) brightness(2.2) contrast(.6)">` + palm(x, 640, .44, 0, HS[i]) + `</g>`; });
  s += `<g opacity="${bd.toFixed(2)}">` + lbl(460, 470, 'لغةٌ جديدة', 1, '#f2f2e8', 36) + `</g>`;
  // the floor and the children in a circle, signing
  s += `<rect x="-200" y="940" width="1120" height="400" fill="url(#floorC)"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-40 + i * 100},940 L${-200 + i * 140},1300" stroke="#4a2e18" stroke-width="2" opacity=".4"/>`).join('') + `<rect x="-20" y="936" width="760" height="10" fill="#6a4a2a"/>`;
  const KIDS = [[150, 1050, 1, 0], [300, 1010, 1, 1], [440, 1012, -1, 2], [590, 1052, -1, 3], [250, 1180, 1, 4], [480, 1184, -1, 5]];
  KIDS.forEach(([x, y, f, i]) => { const S = .5 + (y - 1000) * .0009, g = signT(t + i * .37, x, y, S, f, i * 1.3, .9);
    s += hero(x, y, Object.assign({ s: S, face: f, shade: 1 }, g, { top: ['#e85a2a', '#2a8a6a', '#6a4a9a', '#d8a02a', '#2a5a9a', '#b04a6a'][i], pants: '#2a2a34', skin: ['#c89070', '#a87050', '#8a5a3c', '#c08868', '#b47c5a', '#9a6448'][i], hair: '#1a120c' }));
    s += miniHand(HP.hand, S * 1.1, f, -10 + 18 * Math.sin(t * 3 + i), hsAt(t, 1.5, i)); });
  // a teacher at the back, surprised
  noEarth(); F.ov = ''; return s;
}

// 9: in the dark we will talk by touch, as deafblind people do
function sceneTouch(t) {
  const sw = ease(ramp(t, WS(9, 2) - .3, WS(9, 2) + .2)), T = t - S0(9);
  let s = `<defs>${DEFS()}</defs>`;
  if (sw < 1) { let fg = ''; const y0 = PV + 74, A = signT(t, 260, y0, .8, 1, 0), B = signT(t + .6, 460, y0, .8, -1, 2);
    fg += hero(260, y0, Object.assign({ s: .8, face: 1, shade: 1 }, A, palS(2))) + hero(460, y0, Object.assign({ s: .8, face: -1, shade: 1 }, B, palS(1)));
    s += `<g opacity="${(1 - sw).toFixed(2)}">` + street3(t, { N: .96, id: 'n', fg, cars: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="#02040c" opacity="${(.35 + .45 * ease(ramp(t, S0(9), WS(9, 2)))).toFixed(2)}"/></g>`; }
  if (sw > 0) { s += `<g opacity="${sw.toFixed(2)}">` + studio('stT', '#2a2236', '#050308', 41) + scr(`<circle cx="360" cy="980" r="340" fill="url(#warmG)" opacity="${(.5 + .1 * Math.sin(t * 2)).toFixed(2)}"/>`);
    // the signer's hand (from below) makes signs; the deafblind listener rests a hand on it from above
    const p = T * 1.6;
    s += `<rect x="-20" y="1080" width="760" height="220" fill="#1a1218"/><rect x="-20" y="1076" width="760" height="6" fill="#3a2a30"/>`;
    const SH = [HS[0], HS[2], HS[3], HS[5]], ph = T * .9 + 1, hi = Math.floor(ph), hu = ease(clamp((ph - hi - .55) / .45));
    s += palm(352 + 8 * Math.sin(p), 1200, 1.3, -6 + 5 * Math.sin(p * 1.3), hsMix(SH[hi % 4], SH[(hi + 1) % 4], hu), { sleeve: '#8a3a2a' });
    s += palm(392 + 8 * Math.sin(p), 740 + 8 * Math.sin(p * 1.3), 1.15, 176 + 4 * Math.sin(p), [.15, .25, .25, .3, .35], { dark: 1, sleeve: '#4a4a6a' });
    for (let i = 0; i < 2; i++) { const q = pmod(T * 1.2 + i / 2, 1); s += `<circle cx="365" cy="990" r="${(30 + 140 * q).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${(.6 * (1 - q)).toFixed(2)}"/>`; }
    s += `</g>`; }
  noEarth(); F.ov = ''; return s;
}

function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(10)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 4.6 + (t - S0(10)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 7) - .3, WS(10, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWords }, { s: S0(2) - .2, f: sceneLangs }, { s: S0(3) - .2, f: sceneCalls }, { s: S0(4) - .2, f: sceneDanger }, { s: S0(5) - .2, f: sceneText }, { s: S0(6) - .2, f: sceneFaces }, { s: S0(7) - .2, f: sceneSign }, { s: S0(8) - .2, f: sceneSchool }, { s: S0(9) - .2, f: sceneTouch }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneLangs, sceneCalls, sceneFaces, sceneSchool, sceneTouch]);
const XF = .5;
const TLI = [['الصمت', S0(1)], ['الرسائل', S0(5)], ['الوجوه', S0(6)], ['الإشارة', S0(7)]];
const LIST_ON = new Set([sceneText]);
const CHIPS = [
  ['c0', '٨ مليارات إنسان… بلا كلام', 360, 1180, 'big', WS(0, 8), S0(1) - .3],
  ['c1', 'صمتٌ تامّ', 360, 330, 'red big', WS(1, 11), S0(2) - .3],
  ['c2', 'نحو ٧٬٠٠٠ لغة', 360, 330, 'big', WS(2, 2), WS(2, 6) - .2], ['c2b', 'تسكتُ معاً', 360, 330, 'red big', WS(2, 6), S0(3) - .3],
  ['c3', 'لا مكالمات', 360, 330, 'red big', WS(3, 1), WS(3, 4) - .2], ['c3b', 'الإذاعاتُ صامتة', 360, 330, 'red big', WS(3, 4), WS(3, 6) - .2], ['c3c', 'أغانٍ بلا كلمات', 360, 330, 'big', WS(3, 6), S0(4) - .3],
  ['c4', 'الطوارئ', 360, 330, 'red big', WS(4, 1), WS(4, 10) - .2], ['c4b', 'لا صوتَ لطلبِ الإسعاف', 360, 330, 'red big', WS(4, 10), S0(5) - .3],
  ['c5', 'الكتابةُ صوتُنا', 360, 330, 'big', WS(5, 5), S0(6) - .3],
  ['c6', 'تفهمُها معظمُ الشعوب', 360, 330, 'big', WS(6, 5), S0(7) - .3],
  ['c7', 'لغاتُ الإشارة', 360, 330, 'big', WS(7, 1), WS(7, 3) - .2], ['c7b', 'أكثرُ من ٣٠٠ لغة', 360, 330, 'big', WS(7, 3), WS(7, 9) - .2], ['c7c', 'نحو ٧٠ مليونَ أصمّ', 360, 330, 'big', WS(7, 9), S0(8) - .3],
  ['c8', 'نيكاراغوا، الثمانينيّات', 360, 330, 'big', WS(8, 2), WS(8, 9) - .2], ['c8b', 'اخترعها الأطفالُ وحدَهم', 360, 330, 'big', WS(8, 9), S0(9) - .3],
  ['c9', 'لا ترى يداً في الظلام', 360, 330, 'red big', WS(9, 1), WS(9, 3) - .2], ['c9b', 'الإشارةُ باللمس', 360, 330, 'big', WS(9, 3), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 7), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">بلا كلام</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
