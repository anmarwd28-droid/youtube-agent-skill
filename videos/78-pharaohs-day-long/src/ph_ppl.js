// ===================== Pharaohs: the house people dressed as ancient Egyptians =====================
const ESK = ['#a8704a', '#94603e', '#b47a52', '#86563a', '#bc8660', '#9c6844'];
// kinds: m (worker: short kilt, cropped hair), you (kilt + orange shoulder cloth), w (woman: white sheath dress, long wig), rich (long kilt, wig, broad collar),
//        doc (long kilt + shawl, shaved head), scribe (kilt, shaved head), kid (short, side lock)
function egy(x, y, o = {}) {
  const k = o.kind || 'm', i = o.i || 0, sk = o.skin || ESK[i % ESK.length], dk = mix(sk, '#000000', .3), lin = o.lin || '#efe8d8';
  const bald = k === 'doc' || k === 'scribe' || o.bald, wig = (k === 'w' || k === 'rich' || o.wig) && !o.bald;
  const A = Object.assign({ s: o.s || 1, face: o.f || 1, shade: 1, top: sk, pants: sk, skin: sk, hair: bald ? mix(sk, '#000000', .12) : '#15100c' }, o.h || {});
  const mid = L => { const { hipY, ty, hx, hy } = L, DL = o.dl ?? 150; let g = '';
    if (k === 'w') { g += `<path d="M-22,${ty + 26} Q2,${ty + 20} 26,${ty + 26} L34,${hipY + DL} Q4,${hipY + DL + 8} -30,${hipY + DL}Z" fill="${lin}"/><path d="M-22,${ty + 26} L-6,${ty + 24} L-10,${hipY + DL + 4} L-30,${hipY + DL}Z" fill="#000" opacity=".14"/>` +
        `<path d="M-14,${ty + 26} L-8,${ty + 2} M18,${ty + 26} L12,${ty + 2}" stroke="${lin}" stroke-width="5"/><path d="M8,${hipY + 20} L12,${hipY + DL}" stroke="#000" stroke-width="2" opacity=".12"/>`; }
    else if (o.sit) { g += `<path d="M-25,${hipY - 14} L28,${hipY - 14} L82,${hipY - 8} L84,${hipY + 18} L-26,${hipY + 16}Z" fill="${lin}"/><path d="M-25,${hipY + 4} L84,${hipY + 10} L84,${hipY + 18} L-26,${hipY + 16}Z" fill="#000" opacity=".12"/><rect x="-26" y="${hipY - 18}" width="56" height="8" rx="3" fill="${o.belt || '#d8ccb0'}"/>`; }
    else { const long = k === 'rich' || k === 'doc', bot = long ? hipY + 128 : hipY + 62;
      g += `<path d="M-25,${hipY - 12} L28,${hipY - 12} L${long ? 32 : 36},${bot} Q4,${bot + 8} -29,${bot - 2}Z" fill="${lin}"/><path d="M-25,${hipY - 12} L-8,${hipY - 12} L-12,${bot + 3} L-29,${bot - 2}Z" fill="#000" opacity=".14"/>` +
        `<path d="M24,${hipY - 10} L${long ? 10 : 4},${bot + 4}" stroke="#c8bca4" stroke-width="2.4"/>` + Array.from({ length: 4 }, (_, q) => `<path d="M${30 - q * 5},${hipY - 4 + q * 3} L${(long ? 22 : 30) - q * 7},${bot - 2}" stroke="#bfb29a" stroke-width="1.2" opacity=".7"/>`).join('') +
        `<rect x="-26" y="${hipY - 16}" width="56" height="8" rx="3" fill="${o.belt || '#d8ccb0'}"/>`; }
    if (k === 'you') g += `<path d="M-20,${ty + 8} Q4,${ty + 2} 24,${ty + 10} L26,${ty + 24} L-4,${hipY - 30} L-20,${hipY - 34}Z" fill="#e8642a"/><path d="M-20,${ty + 8} L-4,${hipY - 30} L-20,${hipY - 34}Z" fill="#000" opacity=".18"/>`;
    if (k === 'doc') g += `<path d="M-24,${ty + 6} Q4,${ty} 26,${ty + 8} L30,${ty + 70} L-6,${ty + 40} L-24,${ty + 60}Z" fill="${lin}"/><path d="M-24,${ty + 6} L-6,${ty + 40} L-24,${ty + 60}Z" fill="#000" opacity=".12"/>`;
    if (k === 'rich' || k === 'w' || o.collar) { const cy = ty + 8; g += [['#2a6aa8', 0], ['#e8c050', 7], ['#c8402a', 13], ['#2a8a6a', 19]].map(([c, d]) => `<path d="M-20,${cy + d} Q3,${cy + 22 + d * 1.3} 26,${cy + d}" stroke="${c}" stroke-width="6" fill="none"/>`).join(''); }
    if (wig) g += `<path d="M${hx + 17},${hy - 16} C${hx + 8},${hy - 34} ${hx - 28},${hy - 34} ${hx - 28},${hy - 2} L${hx - 26},${hy + (k === 'w' ? 58 : 30)} L${hx - 6},${hy + (k === 'w' ? 58 : 30)} C${hx - 10},${hy + 6} ${hx - 6},${hy - 12} ${hx + 17},${hy - 16}Z" fill="#100c0a"/>` +
      Array.from({ length: 4 }, (_, q) => `<path d="M${hx - 24 + q * 5},${hy - 6} V${hy + (k === 'w' ? 54 : 26)}" stroke="#2e2620" stroke-width="1.2"/>`).join('') + `<path d="M${hx + 17},${hy - 16} C${hx + 8},${hy - 34} ${hx - 28},${hy - 34} ${hx - 28},${hy - 2}" stroke="#3a302a" stroke-width="2" fill="none"/>`;
    if (o.kohl || wig || k === 'rich') g += `<path d="M${hx + 8},${hy - 3} Q${hx + 12},${hy - 6} ${hx + 18},${hy - 2}" stroke="#0a0806" stroke-width="2.2" fill="none"/>`;
    if (k === 'kid') g += `<path d="M${hx - 18},${hy - 6} q-10,20 -2,36" stroke="#15100c" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    return g + (o.mid ? o.mid(L) : ''); };
  let g = heroX(x, y, A, mid, o.end);
  return g.replace(/#1d2028/g, dk).replace(/fill="#3a3530"/g, `fill="${dk}"`).replace(/fill="#4a443c"/g, `fill="${sk}"`);
}
// a puller leaning into a rope, walking slowly (rope at hand height, going to +x)
const puller = (x, y, s, t, i, o = {}) => egy(x, y, Object.assign({ s, f: 1, i, h: { walk: t * 2.4 + i * 1.1, amp: .38, lean: 16, hF: [x + 40 * s, y - 196 * s], hB: [x + 22 * s, y - 192 * s] } }, o));
// a small crowd of distant workers walking (scale s), with kilts
function crowdP(x0, x1, y, s, t, n, sd = 1, v = 18) { const r = RS(sd); let g = '';
  for (let i = 0; i < n; i++) { const x = x0 + r() * (x1 - x0), f = r() > .5 ? 1 : -1, ph = r() * 9, yy = y + r() * 30 * s * 4, sc = s * (.9 + r() * .2);
    g += egy(x + f * v * t * sc * 3, yy, { s: sc, f, i: i + sd, h: { walk: t * 4 + ph, amp: .5 } }); }
  return g; }
