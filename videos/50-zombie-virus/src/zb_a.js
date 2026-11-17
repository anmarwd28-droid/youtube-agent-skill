// ===================== "what if a zombie virus spread?" (Short #50) =====================
// zb_a.js: the zombie person, the jungle leaf with the zombie ant, the rabies head
const ZDEF = `<linearGradient id="jgG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c2418"/><stop offset=".45" stop-color="#1e4628"/><stop offset="1" stop-color="#0a1810"/></linearGradient>` +
  `<radialGradient id="bkG"><stop offset="0" stop-color="#eaf6b4" stop-opacity=".55"/><stop offset=".7" stop-color="#d4ec9a" stop-opacity=".18"/><stop offset="1" stop-color="#c8e890" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="lfG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e9e3a"/><stop offset=".5" stop-color="#3f7e2c"/><stop offset="1" stop-color="#2a5a20"/></linearGradient>` +
  `<linearGradient id="lfD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e5a26"/><stop offset="1" stop-color="#173a16"/></linearGradient>` +
  `<linearGradient id="zStG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3018"/><stop offset=".45" stop-color="#7a6a3a"/><stop offset="1" stop-color="#4a3e20"/></linearGradient>` +
  `<radialGradient id="antG" cx=".38" cy=".3" r=".75"><stop offset="0" stop-color="#5a3626"/><stop offset=".4" stop-color="#1c100c"/><stop offset="1" stop-color="#050303"/></radialGradient>` +
  `<linearGradient id="fgG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a3e"/><stop offset=".5" stop-color="#e2cc9c"/><stop offset="1" stop-color="#9a7a48"/></linearGradient>` +
  `<radialGradient id="cushG" cx=".4" cy=".35"><stop offset="0" stop-color="#e8d2a2"/><stop offset=".7" stop-color="#a8804a"/><stop offset="1" stop-color="#6a4a2a"/></radialGradient>` +
  `<linearGradient id="shaftG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f2c4" stop-opacity=".3"/><stop offset="1" stop-color="#f4f2c4" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="zfog" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8d08a" stop-opacity="0"/><stop offset=".55" stop-color="#a8d08a" stop-opacity=".32"/><stop offset="1" stop-color="#a8d08a" stop-opacity=".08"/></linearGradient>` +
  `<radialGradient id="emG" cx=".5" cy=".5"><stop offset="0" stop-color="#3a3c48"/><stop offset=".8" stop-color="#1c1e26"/><stop offset="1" stop-color="#0c0d12"/></radialGradient>` +
  `<linearGradient id="virB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dfe6f0"/><stop offset=".5" stop-color="#a4b0c4"/><stop offset="1" stop-color="#5a6478"/></linearGradient>` +
  `<radialGradient id="infG"><stop offset="0" stop-color="#ff3a2a" stop-opacity=".85"/><stop offset=".6" stop-color="#d8202a" stop-opacity=".45"/><stop offset="1" stop-color="#b01020" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="hazG"><stop offset="0" stop-color="#ffb04a" stop-opacity=".9"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="labBg" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="#26324a"/><stop offset="1" stop-color="#080c16"/></radialGradient>`;
const ZDEFS = () => `${TDEFS()}${PDEF}${ZDEF}${ZDEF2}`;

// ---------- the zombie: the house person, grey-green skin, pale eyes, torn and dirty clothes, arms reaching, a slow lurching walk ----------
const ZPAL = [{ top: '#4a4c40', pants: '#2a2a2e', skin: '#8e9a78', hair: '#2a241e' }, { top: '#5e3c34', pants: '#26262c', skin: '#9aa282', hair: '#1a1612' }, { top: '#394656', pants: '#2e2a26', skin: '#86927a', hair: '#3a2e24' },
  { top: '#6a6252', pants: '#22242a', skin: '#a0a688', hair: '#16120e' }, { top: '#3e4a3a', pants: '#2a2630', skin: '#8a9474', hair: '#2a1e16' }, { top: '#7a7068', pants: '#30343a', skin: '#96a084', hair: '#4a3a2a' }];
function zombie(x, y, s, f, i, t, o = {}) {
  const P = ZPAL[i % ZPAL.length], ph = o.ph ?? (x * f / (24 * s)) + i, sh = y - s * 226, R = o.reach ?? 1;
  const A = { s, face: f, shade: 1, walk: o.still ? null : ph, amp: .36, lean: (o.lean ?? 9) + 3 * Math.sin(ph * 2), lookUp: o.look ?? -.2, bags: 1, glow: .34, glowCol: '#eef4c8',
    hF: [x + f * s * lerp(30, 96 + 6 * Math.sin(ph), R), y - s * lerp(120, 222 - 8 * Math.sin(ph + 1), R)], hB: [x + f * s * lerp(18, 82 + 6 * Math.cos(ph), R), y - s * lerp(124, 210 - 8 * Math.cos(ph), R)] };
  let g = hero(x, y, Object.assign(A, P, o.h || {}));
  // torn hem, stains and a rip on the sleeve
  const [cx, cy] = HP.chest, H = HP.head, r = RS(i * 13 + 5);
  g += `<path d="M${(cx - 20 * s * f).toFixed(1)},${(cy + 44 * s).toFixed(1)} l${(6 * s * f).toFixed(1)},${(10 * s).toFixed(1)} l${(6 * s * f).toFixed(1)},${(-7 * s).toFixed(1)} l${(7 * s * f).toFixed(1)},${(12 * s).toFixed(1)} l${(6 * s * f).toFixed(1)},${(-9 * s).toFixed(1)} l${(8 * s * f).toFixed(1)},${(8 * s).toFixed(1)}" stroke="#1a1a16" stroke-width="${(2.4 * s).toFixed(1)}" fill="none" opacity=".55"/>` +
    `<ellipse cx="${(cx + (r() - .5) * 18 * s).toFixed(1)}" cy="${(cy + (r() - .2) * 30 * s).toFixed(1)}" rx="${(9 * s).toFixed(1)}" ry="${(6 * s).toFixed(1)}" fill="#2a2416" opacity=".35"/>` +
    `<ellipse cx="${(H[0] - 6 * s * f).toFixed(1)}" cy="${(H[1] + 4 * s).toFixed(1)}" rx="${(12 * s).toFixed(1)}" ry="${(15 * s).toFixed(1)}" fill="#3a4a2a" opacity=".22"/>`;
  return g;
}
const zfogBand = (y, h, t, a = 1) => `<g opacity="${a.toFixed(2)}"><rect x="-40" y="${y}" width="800" height="${h}" fill="url(#zfog)"/>` + Array.from({ length: 7 }, (_, i) => { const r = RS(i + 400), x = pmod(r() * 900 + t * (8 + r() * 10), 1000) - 140; return `<ellipse cx="${x.toFixed(1)}" cy="${(y + h * (.45 + r() * .4)).toFixed(1)}" rx="${(120 + r() * 120).toFixed(1)}" ry="${(18 + r() * 16).toFixed(1)}" fill="#b4d898" opacity="${(.12 + r() * .1).toFixed(2)}" filter="url(#blur9)"/>`; }).join('') + `</g>`;
// an abandoned car: door open, hazard lights blinking
function carHaz(x, y, s, col, f, t) {
  const on = Math.sin(t * 6.5) > 0 ? 1 : 0;
  return car(x, y, s, col, f, 0) + (on ? scr(`<circle cx="${(x + f * 104 * s).toFixed(1)}" cy="${(y - 40 * s).toFixed(1)}" r="${(26 * s).toFixed(1)}" fill="url(#hazG)"/><circle cx="${(x - f * 108 * s).toFixed(1)}" cy="${(y - 42 * s).toFixed(1)}" r="${(26 * s).toFixed(1)}" fill="url(#hazG)"/>`) : '');
}

// ---------- 0: the hook: a city street at dusk, the dead walk ----------
function sceneHook(t) {
  const y0 = PV + 78, N = .74; F.beams = '';
  const pR = Math.max(0, Math.sin(t * 3.2)), pP = Math.max(0, Math.sin(t * 3.2 + 1.7));
  // zombies come from the left; they pile up against the shields
  const Z = [[Math.min(180 + t * 60, 300 - 22 * pR), 1236, 1.0, 1, 2], [Math.min(60 + t * 50, 200), 1192, .95, 1, 1], [Math.min(250 + t * 40, 352 - 18 * pP), y0 + 4, .82, 1, 0], [Math.min(120 + t * 40, 250), y0 - 6, .76, 1, 3], [Math.min(-10 + t * 30, 120), y0 - 2, .74, 1, 5]];
  let ppl = Z.map(([x, y, s, f, i]) => [y, zombie(x, y, s, f, i, t, { lean: 9 - 12 * (i === 2 ? pR : i === 0 ? pP : 0) })]);
  ppl.push([1238, soldier(440, 1238, 1.0, -1, 0, t, { shield: 1, push: pR })], [1196, soldier(545, 1196, .95, -1, 1, t, { baton: 1 })],
    [y0 + 6, soldier(470, y0 + 6, .82, -1, 2, t, { shield: 1, push: pP })], [y0 - 12, hazmat(575, y0 - 12, .74, -1, t, { torch: 6 })]);
  ppl.sort((a, b) => a[0] - b[0]);
  let top = zfogBand(940, 300, t, .9) + carHaz(650, 1150, .82, '#6a7a8a', -1, t) + ppl.map(q => q[1]).join('');
  const sky2 = `<circle cx="560" cy="470" r="90" fill="url(#sunW)" opacity=".18"/><circle cx="560" cy="470" r="26" fill="#f2f0d8" opacity=".85"/><circle cx="552" cy="462" r="8" fill="#c8ccbc" opacity=".45"/>`;
  const emit = `<rect x="-20" y="-20" width="760" height="1320" fill="#1a2a20" opacity=".3" style="mix-blend-mode:multiply"/>` + plume(140, 560, .55, t, 3, .7) + F.beams;
  let s = `<defs>${ZDEFS()}</defs>` + street10(t, { N, id: 'zh', cars: 0, overcast: 1, noMoon: 1, sky: ['#141c22', '#36443a', '#8a8a62'], sky2, litB: [0, 1, 0, 0, .6], litS: [0, 0, 1, 0, 0], lampK: .0, emit, top });
  noEarth(); F.ov = ''; return s;
}

// ---------- 1: in the forest a fungus takes over an ant: it climbs, bites a leaf and dies there ----------
function leafL(bx, by, L, ang, seed, o = {}) {
  const r = RS(seed), W = L * (o.w || .36), n = 22, up = [], dn = [];
  for (let i = 0; i <= n; i++) { const u = i / n, w = W * Math.pow(Math.sin(Math.PI * Math.min(1, u * 1.08)), .85) * (u > .9 ? (1 - u) * 6 : 1) * .5, bend = (o.bend || 0) * L * u * u; up.push([u * L, -w + bend]); dn.push([u * L, w * .92 + bend]); }
  const P = p => p[0].toFixed(1) + ',' + p[1].toFixed(1), d = `M0,0 L${up.map(P).join(' L')} L${dn.slice().reverse().map(P).join(' L')}Z`, id = 'lf' + seed;
  let s = `<g transform="translate(${bx},${by}) rotate(${ang})"${o.op != null ? ` opacity="${o.op}"` : ''}><defs><clipPath id="${id}"><path d="${d}"/></clipPath></defs><path d="${d}" fill="url(#${o.dark ? 'lfD' : 'lfG'})"/>`;
  if (!o.flat) {
    s += `<g clip-path="url(#${id})"><rect x="0" y="${-W}" width="${L}" height="${2 * W}" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="0" y="${-W}" width="${L}" height="${W * .9}" fill="#d8f0a0" opacity=".12"/>`;
    const mid = u => (o.bend || 0) * L * u * u;
    for (let k = 1; k < 11; k++) { const u = k / 11.5, x0 = u * L, y0 = mid(u); [-1, 1].forEach(sd => { const ww = W * .5 * Math.sin(Math.PI * Math.min(1, u * 1.08)); s += `<path d="M${x0.toFixed(1)},${y0.toFixed(1)} Q${(x0 + L * .06).toFixed(1)},${(y0 + sd * ww * .5).toFixed(1)} ${(x0 + L * .13).toFixed(1)},${(y0 + sd * ww * .92).toFixed(1)}" stroke="#bfe08a" stroke-width="${(1.6 + 1.4 * (1 - u)).toFixed(1)}" fill="none" opacity=".5"/>`; }); }
    for (let k = 0; k < 4; k++) s += `<circle cx="${(L * (.25 + r() * .6)).toFixed(1)}" cy="${((r() - .5) * W * .6).toFixed(1)}" r="${(2 + r() * 4).toFixed(1)}" fill="#6a5a2a" opacity=".5"/>`;
    s += `</g><path d="M0,0 ${Array.from({ length: 12 }, (_, i) => { const u = (i + 1) / 12; return `L${(u * L).toFixed(1)},${mid(u).toFixed(1)}`; }).join(' ')}" stroke="#d6eca0" stroke-width="${(L * .012).toFixed(1)}" fill="none" opacity=".8" stroke-linecap="round"/>` +
      `<path d="M${up.map(P).join(' L')}" stroke="#a8d070" stroke-width="2" fill="none" opacity=".45"/><path d="${d}" fill="none" stroke="#1a3a12" stroke-width="1.6" opacity=".6"/>`;
  }
  return s + `</g>`;
}
// the ant, side view, head to +x, feet at +30 (local); o: ph (gait), clamp, dead, stalk 0-1, fuzz 0-1, blur
function antS(x, y, sc, rot, o = {}) {
  const ph = o.ph || 0, dead = o.dead || 0, cl = o.clamp || 0;
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${sc})"${o.blur ? ` filter="url(#blur2)"` : ''}>`;
  const leg = (hx, hy, dx, p, far) => { const lift = Math.max(0, Math.sin(ph + p)) * 7 * (1 - dead), sw = Math.cos(ph + p) * 9 * (1 - dead), fx = hx + dx + sw + dead * dx * .15, fy = 30 - lift - dead * 10, kx = hx + (fx - hx) * .42 + dx * .12, ky = hy - 20 - dead * 6, c = far ? '#0a0605' : '#1e110c';
    return `<path d="M${hx},${hy} L${kx.toFixed(1)},${ky.toFixed(1)}" stroke="${c}" stroke-width="${far ? 4 : 5.2}" fill="none" stroke-linecap="round"/><path d="M${kx.toFixed(1)},${ky.toFixed(1)} L${fx.toFixed(1)},${fy.toFixed(1)}" stroke="${c}" stroke-width="${far ? 2.6 : 3.2}" fill="none" stroke-linecap="round"/>${far ? '' : `<path d="M${hx},${hy} L${kx.toFixed(1)},${ky.toFixed(1)}" stroke="#8a6a54" stroke-width="1.2" opacity=".35" transform="translate(-1,-1.5)"/>`}<path d="M${fx.toFixed(1)},${fy.toFixed(1)} l${dx > 0 ? 6 : -6},1.5" stroke="${c}" stroke-width="2" stroke-linecap="round"/>`; };
  // far legs, then the body, then the near legs
  s += leg(14, 6, 24, Math.PI, 1) + leg(4, 7, 3, 0, 1) + leg(-6, 6, -26, Math.PI, 1);
  // gaster with segment bands, petiole node, mesosoma, head
  s += `<g transform="rotate(${(-10 + dead * 6).toFixed(1)},-30,0)"><ellipse cx="-48" cy="2" rx="28" ry="19" fill="url(#antG)"/>` + [0, 1, 2].map(q => `<path d="M${-60 + q * 11},${-15 + q * 1.5} q-5,17 0,34" stroke="#5a3424" stroke-width="1.6" fill="none" opacity=".7"/>`).join('') +
    `<ellipse cx="-52" cy="-7" rx="13" ry="5" fill="#fff" opacity=".22"/>` + Array.from({ length: 9 }, (_, q) => `<path d="M${-70 + q * 5.5},${(-14 + Math.abs(q - 4) * 1.6).toFixed(1)} l-2,-5" stroke="#8a6a4a" stroke-width=".9" opacity=".6"/>`).join('') + `</g>`;
  s += `<ellipse cx="-19" cy="1" rx="5.5" ry="8.5" fill="url(#antG)"/><path d="M-13,5 C-12,-7 -2,-13 10,-13 C21,-13 27,-7 27,1 C22,9 -2,11 -13,5Z" fill="url(#antG)"/><path d="M-4,-9 C4,-12 14,-12 22,-8" stroke="#fff" stroke-width="2" fill="none" opacity=".2" stroke-linecap="round"/>`;
  s += `<ellipse cx="41" cy="-6" rx="16" ry="13" fill="url(#antG)"/><ellipse cx="46" cy="-10" rx="4" ry="3.2" fill="#0a0504"/><circle cx="47" cy="-11" r="1.1" fill="#fff" opacity=".8"/><ellipse cx="37" cy="-14" rx="7" ry="3" fill="#fff" opacity=".18"/>`;
  // mandibles: open, or closed on the vein
  const ma = lerp(16, 2, cl); s += `<path d="M54,-2 q10,${(-3 - ma * .2).toFixed(1)} 15,${(ma * .3).toFixed(1)} q-6,0 -13,4Z" fill="#3a1c12"/><path d="M53,2 q10,${(ma * .25 + 2).toFixed(1)} 14,${(-ma * .2 + 3).toFixed(1)} q-6,-1 -12,-6Z" fill="#2a120c"/>`;
  // elbowed antennae
  const aw = Math.sin((o.t || 0) * 5) * 4 * (1 - dead);
  s += `<path d="M47,-17 L58,${(-36 + aw).toFixed(1)} Q70,${(-38 + aw).toFixed(1)} ${(80 + dead * -6).toFixed(1)},${(-22 + aw + dead * 14).toFixed(1)}" stroke="#2c1610" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M45,-16 L52,${(-38 - aw).toFixed(1)} Q62,${(-44 - aw).toFixed(1)} ${(72 + dead * -8).toFixed(1)},${(-32 - aw + dead * 16).toFixed(1)}" stroke="#140a07" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  s += leg(16, 6, 26, 0, 0) + leg(6, 7, 4, Math.PI, 0) + leg(-4, 6, -28, 0, 0);
  // white fungal fuzz at the joints, then the stalk out of the back of the head
  const fz = o.fuzz || 0; if (fz > 0) { const r = RS(9); for (let q = 0; q < 26; q++) { const px = [-34, -14, 4, 26, 40][q % 5] + (r() - .5) * 14, py = (r() - .5) * 18; s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(1.5 + r() * 3 * fz).toFixed(1)}" fill="#f2efe4" opacity="${(fz * (.4 + .5 * r())).toFixed(2)}"/>`; } }
  const g = o.stalk || 0; if (g > 0) { const L = 150 * g, bx = 33, by = -15, tx = bx - 30 * g, ty = by - L, c1 = [bx + 8, by - L * .4], c2 = [tx + 12, ty + L * .25];
    s += `<path d="M${bx - 3},${by} C${c1[0] - 3},${c1[1]} ${c2[0] - 2},${c2[1]} ${tx - 1.5},${ty}" stroke="#5a4226" stroke-width="${(6 * Math.min(1, g * 2)).toFixed(1)}" fill="none" stroke-linecap="round"/><path d="M${bx},${by} C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${tx},${ty}" stroke="url(#fgG)" stroke-width="${(4.5 * Math.min(1, g * 2)).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
    if (g > .5) { const k = (g - .5) * 2, cx = lerp(bx, tx, .62) + 8, cy = lerp(by, ty, .62); s += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${(7 * k).toFixed(1)}" ry="${(13 * k).toFixed(1)}" fill="url(#cushG)"/><ellipse cx="${(cx - 2).toFixed(1)}" cy="${(cy - 4).toFixed(1)}" rx="${(2.5 * k).toFixed(1)}" ry="${(5 * k).toFixed(1)}" fill="#fff" opacity=".3"/>`; } }
  return s + `</g>`;
}
const STEM = [[312, 1300], [318, 1180], [330, 1060], [344, 940], [352, 830], [362, 742], [372, 704]];
function stemAt(u) { const n = STEM.length - 1, f = clamp(u, 0, 1) * n, i = Math.min(n - 1, Math.floor(f)), k = f - i, a = STEM[i], b = STEM[i + 1]; return [lerp(a[0], b[0], k), lerp(a[1], b[1], k), Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI]; }
function sceneAnt(t) {
  const T = t - S0(1) + .2, t1 = WS(1, 10), t2 = WS(1, 13) - .35, tb = WS(1, 13), td = WS(1, 14);
  const u = t < t1 ? lerp(0, .5, clamp((t - S0(1) + .2) / (t1 - S0(1) + .2))) : lerp(.5, .9, ease(ramp(t, t1, t2)));
  const turn = ease(ramp(t, t2, tb + .2)), cl = ease(ramp(t, tb, tb + .35)), dead = ease(ramp(t, td - .2, td + .3)), stalk = ease(ramp(t, td, td + .95)), fuzz = ease(ramp(t, td - .1, td + .8));
  let s = `<defs>${ZDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#jgG)"/>`;
  // far forest: soft leaves and bokeh, light shafts
  let far = ''; { const r = RS(71); for (let i = 0; i < 16; i++) far += leafL(r() * 760 - 20, 380 + r() * 900, 160 + r() * 200, r() * 360, 300 + i, { dark: 1, flat: 1, op: (.4 + r() * .4).toFixed(2), bend: (r() - .5) * .3 }); }
  s += `<g filter="url(#blur9)">${far}</g>`;
  { const r = RS(72); for (let i = 0; i < 16; i++) s += `<circle cx="${(r() * 740).toFixed(1)}" cy="${(400 + r() * 880).toFixed(1)}" r="${(16 + r() * 46).toFixed(1)}" fill="url(#bkG)" opacity="${(.35 + .4 * r()).toFixed(2)}"/>`; }
  s += scr(`<path d="M520,300 L620,300 L360,1300 L160,1300Z" fill="url(#shaftG)" opacity=".7"/><path d="M660,300 L720,300 L600,1300 L470,1300Z" fill="url(#shaftG)" opacity=".5"/>`);
  // mid leaves with old dead ants on them, slightly soft
  s += `<g filter="url(#blur2)" opacity=".85">` + leafL(560, 1060, 190, -150, 41, { bend: .12 }) + antS(468, 1018, .55, 200, { dead: 1, clamp: 1, stalk: 1, fuzz: .8 }) + leafL(110, 560, 170, 30, 42, { bend: -.1 }) + antS(170, 590, .5, 10, { dead: 1, clamp: 1, stalk: .8, fuzz: .7 }) + `</g>`;
  // the camera creeps in on the ant
  const [ax, ay, aa] = stemAt(u), zm = 1 + .16 * ease(ramp(t, S0(1), td + 1)), fx = lerp(360, ax, .5), fy = lerp(800, ay, .5);
  s += `<g transform="translate(${fx.toFixed(1)},${fy.toFixed(1)}) scale(${zm.toFixed(3)}) translate(${(-fx).toFixed(1)},${(-fy).toFixed(1)})">`;
  // the stem and the big leaves
  const sd = `M${STEM.map(p => p[0] + ',' + p[1]).join(' L')}`;
  s += `<path d="${sd}" stroke="#2a2210" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${sd}" stroke="url(#zStG)" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${sd}" stroke="#c8b878" stroke-width="2.5" fill="none" opacity=".4" transform="translate(-3,0)"/>` +
    [1, 3].map(i => `<ellipse cx="${STEM[i][0]}" cy="${STEM[i][1]}" rx="11" ry="5" fill="#4a3e20"/>`).join('');
  s += leafL(338, 900, 300, 196, 43, { bend: .1 }) + leafL(372, 704, 340, -42, 44, { bend: -.06, w: .4 });
  // the ant: climbs the stem, turns to the leaf's vein, bites, dies; the stalk grows
  const nx = Math.cos((aa + 90) * Math.PI / 180), ny = Math.sin((aa + 90) * Math.PI / 180), side = -1;
  let px = ax + side * nx * 44, py = ay + side * ny * 44, rot = aa;
  const vx = 404, vy = 676; px = lerp(px, vx - 54, turn); py = lerp(py, vy + 46, turn); rot = lerp(rot, -48, turn);
  s += `<ellipse cx="${(px + 6).toFixed(1)}" cy="${(py + 10).toFixed(1)}" rx="70" ry="22" fill="#000" opacity=".25" filter="url(#blur5)" transform="rotate(${rot.toFixed(1)},${px.toFixed(1)},${py.toFixed(1)})"/>`;
  s += antS(px, py, 1.2, rot, { ph: u * 70, clamp: cl, dead, stalk, fuzz, t });
  // spores drift down from the stalk
  if (stalk > .7) { const r = RS(77); for (let i = 0; i < 26; i++) { const p = pmod(T * .25 + r(), 1), sx = px - 40 + r() * 60 + Math.sin(T + i) * 20, sy = py - 150 + p * 360; s += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="${(1.2 + r() * 1.8).toFixed(1)}" fill="#f2e8c8" opacity="${((stalk - .7) * 3 * (1 - p) * .8).toFixed(2)}"/>`; } }
  s += `</g>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#vigB)" opacity=".45"/>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 2: rabies: it attacks the brain, brings rage, and spreads by bites ----------
function rabV(x, y, L, rot, a = 1) {   // a rabies virion: a bullet, flat at one end, with spikes and coil bands
  const W = L * .4;
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})" opacity="${a.toFixed(2)}">`;
  const d = `M${-L / 2},${-W / 2} L${L / 2 - W / 2},${-W / 2} A${W / 2},${W / 2} 0 0 1 ${L / 2 - W / 2},${W / 2} L${-L / 2},${W / 2}Z`;
  for (let i = 0; i < 16; i++) { const u = i / 15, px = -L / 2 + u * (L - W / 2); s += `<path d="M${px.toFixed(1)},${(-W / 2).toFixed(1)} v-5 M${px.toFixed(1)},${(W / 2).toFixed(1)} v5" stroke="#c8d2e2" stroke-width="1.6" opacity=".8"/>`; }
  for (let i = 0; i < 6; i++) { const q = -.9 + i * .36, px = L / 2 - W / 2 + Math.cos(q) * (W / 2 + 5), py = Math.sin(q) * (W / 2 + 5); s += `<path d="M${(L / 2 - W / 2 + Math.cos(q) * W / 2).toFixed(1)},${(Math.sin(q) * W / 2).toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)}" stroke="#c8d2e2" stroke-width="1.6" opacity=".8"/>`; }
  s += `<path d="${d}" fill="url(#virB)"/>` + Array.from({ length: 9 }, (_, i) => { const px = -L / 2 + 4 + i * (L - W / 2 - 6) / 8; return `<path d="M${px.toFixed(1)},${(-W / 2 + 2).toFixed(1)} q-3,${(W / 2 - 2).toFixed(1)} 0,${(W - 4).toFixed(1)}" stroke="#4a5468" stroke-width="1.4" fill="none" opacity=".7"/>`; }).join('');
  return s + `<path d="M${-L / 2 + 3},${-W / 2 + 3} L${L / 2 - W / 2},${-W / 2 + 3}" stroke="#fff" stroke-width="2" opacity=".4"/></g>`;
}
function emInset(cx, cy, R, t, a) {
  if (a <= 0) return ''; const r = RS(23);
  let s = `<g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#22252c"/><circle cx="${cx}" cy="${cy}" r="${R + 5}" fill="#4a4e58"/><defs><clipPath id="emc"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g clip-path="url(#emc)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#emG)"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#fff" filter="url(#grainR)" opacity=".08"/>`;
  for (let i = 0; i < 9; i++) { const an = r() * 6.28, rr = Math.sqrt(r()) * R * .8; s += rabV(cx + Math.cos(an) * rr + Math.sin(t * .6 + i) * 3, cy + Math.sin(an) * rr + Math.cos(t * .5 + i) * 3, 46 + r() * 10, r() * 360); }
  return s + `</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-opacity=".5" stroke-width="10" filter="url(#blur2)"/></g>`;
}
function sceneRabies(t) {
  const T = t - S0(2) + .2, vA = ease(ramp(t, WS(2, 2) - .2, WS(2, 2) + .4)), up = ramp(t, WS(2, 2), WS(2, 6) + .3), br = ease(ramp(t, WS(2, 6), WS(2, 8))), rage = ease(ramp(t, WS(2, 9) - .2, WS(2, 10) + .2)), bite = ease(ramp(t, WS(2, 11) - .2, WS(2, 12)));
  let s = `<defs>${ZDEFS()}${DEFN()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#labBg)"/>`;
  { const r = RS(5); for (let i = 0; i < 26; i++) s += `<circle cx="${(r() * 720).toFixed(0)}" cy="${(380 + r() * 900).toFixed(0)}" r="${(20 + r() * 50).toFixed(0)}" fill="#3a5a8a" opacity="${(.05 + .06 * r()).toFixed(2)}" filter="url(#blur9)"/>`; }
  // the head: the house brain head, a little smaller; the skin pales as the rage comes
  s += `<g transform="translate(120,96) scale(.86)">` + brainSVG(0, 1e-4, t, 1);
  s += `<path d="${HEADP}" fill="#6a8a5a" opacity="${(.42 * rage).toFixed(2)}" style="mix-blend-mode:color"/><path d="${HEADP}" fill="#2a3a20" opacity="${(.16 * rage).toFixed(2)}"/>`;
  // the infection: up the spinal cord, then over the brain
  s += `<g clip-path="url(#brC)"><circle cx="390" cy="690" r="${(40 + 260 * br).toFixed(1)}" fill="url(#infG)" opacity="${(.95 * br).toFixed(2)}"/>` + (br > 0 ? SULCI.map((d, i) => `<path d="${d}" stroke="#ff5a3a" stroke-width="3" fill="none" stroke-linecap="round" opacity="${(br * (.4 + .4 * Math.sin(t * 6 + i))).toFixed(2)}"/>`).join('') : '') + `</g>`;
  for (let i = 0; i < 12; i++) { const p = pmod(up * 1.6 + i / 12, 1), k = up > 0 && up < 1.2 ? 1 : 0, y = lerp(1120, 700, p), x = lerp(400, 388, p) + Math.sin(p * 10 + i) * 6; if (vA > 0 && k) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#ff4a3a" opacity="${(vA * Math.sin(p * Math.PI)).toFixed(2)}"/>`; }
  // rage: the eye turns red, the brow drops, the teeth show
  s += `<g opacity="${rage.toFixed(2)}"><path d="M514,602 L552,616" stroke="#1a120c" stroke-width="9" stroke-linecap="round"/><path d="M518,628 q16,-12 32,0 q-16,10 -32,0Z" fill="#f0c4b8"/><circle cx="536" cy="628" r="6" fill="#8a1010"/><circle cx="536" cy="628" r="12" fill="#ff2a1a" opacity=".3" filter="url(#blur2)"/>` +
    `<path d="M548,800 q14,4 26,-2 l-2,8 q-12,5 -24,0Z" fill="#f4eee0"/><path d="M552,800 v6 M558,801 v6 M564,801 v6" stroke="#b8b0a0" stroke-width="1"/></g></g>`;
  // the microscope view of the virus: bullet shapes
  s += emInset(190, 1020, 140, t, vA) + lbl(190, 1218, 'فيروسُ الكَلَب', vA, '#e8eef6', 28);
  // bites: teeth marks on an arm
  if (bite > 0) { const bx = 500, by = 1110; s += `<g opacity="${bite.toFixed(2)}">${panel(380, 990, 290, 230, 1)}<path d="M396,1150 C460,1120 560,1110 656,1124 L656,1186 C560,1178 470,1186 396,1206Z" fill="#c89070"/><path d="M396,1150 C460,1120 560,1110 656,1124" stroke="#fff" stroke-width="2" opacity=".2" fill="none"/>` +
    [0, 1, 2, 3, 4].map(q => `<ellipse cx="${bx + q * 16}" cy="${by + 30 - Math.abs(q - 2) * 4}" rx="4.5" ry="3" fill="#8a2a24"/><ellipse cx="${bx + q * 16 + 2}" cy="${by + 58 + Math.abs(q - 2) * 3}" rx="4.5" ry="3" fill="#8a2a24"/>`).join('') + lbl(525, 1060, 'ينتقلُ بالعَضّ', 1, '#ffd0a0', 26) + `</g>`; }
  noEarth(); F.ov = ''; return s;
}
