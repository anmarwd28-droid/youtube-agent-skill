// zb_e.js: people who fight back: soldiers (helmet, vest, riot shield, baton, torch) and hazmat teams (yellow suit, hood, visor, mask)
const ZDEF2 = `<linearGradient id="tbG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6d8" stop-opacity=".75"/><stop offset=".5" stop-color="#ffeec0" stop-opacity=".25"/><stop offset="1" stop-color="#ffeec0" stop-opacity="0"/></linearGradient>` +
  `<linearGradient id="shG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8dcec" stop-opacity=".55"/><stop offset=".5" stop-color="#e8f4ff" stop-opacity=".3"/><stop offset="1" stop-color="#9ab4c8" stop-opacity=".6"/></linearGradient>` +
  `<linearGradient id="hzG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c89a1a"/><stop offset=".5" stop-color="#f2cc3a"/><stop offset="1" stop-color="#d8a822"/></linearGradient>` +
  `<radialGradient id="visG" cx=".35" cy=".3"><stop offset="0" stop-color="#8ab0c8"/><stop offset=".6" stop-color="#2a3a4a"/><stop offset="1" stop-color="#121a24"/></radialGradient>`;
const SPAL = [{ top: '#4e5a3a', pants: '#3e4830', skin: '#a46a46', hair: '#1b1410' }, { top: '#2e3644', pants: '#262c38', skin: '#c08a66', hair: '#2a1d16' }, { top: '#55603e', pants: '#424a32', skin: '#8d5a3b', hair: '#17110d' }, { top: '#323a48', pants: '#2a303c', skin: '#b07a55', hair: '#1d1612' }];
// a soldier. o: shield (riot shield in the front hand), baton (raised in the back hand), torch (beam angle in degrees, or null), push (0-1 shove), walk, h (extra hero options)
function soldier(x, y, s, f, i, t, o = {}) {
  const P = SPAL[i % SPAL.length], sh = y - s * 214, push = o.push || 0;
  const A = { s, face: f, shade: 1, lean: (o.lean ?? 6) + 8 * push, walk: o.walk ?? null, lookUp: o.look ?? -.05 };
  if (o.shield) A.hF = [x + f * s * (52 + 26 * push), sh + s * 26];
  if (o.baton) A.hB = [x + f * s * (24 + 20 * Math.max(0, Math.sin(t * 5 + i))), sh - s * (50 + 20 * Math.sin(t * 5 + i))];
  if (o.torch != null) A.hF = [x + f * s * 66, sh + s * 10];
  let g = hero(x, y, Object.assign(A, P, o.h || {}));
  const H = HP.head, C = HP.chest, hx = H[0], hy = H[1], HF = HP.hand, HB = HP.handB;
  // helmet with a visor
  g += `<path d="M${(hx - 25 * s).toFixed(1)},${(hy - 8 * s).toFixed(1)} Q${(hx - 27 * s).toFixed(1)},${(hy - 36 * s).toFixed(1)} ${hx.toFixed(1)},${(hy - 36 * s).toFixed(1)} Q${(hx + 27 * s).toFixed(1)},${(hy - 36 * s).toFixed(1)} ${(hx + 25 * s).toFixed(1)},${(hy - 8 * s).toFixed(1)} Z" fill="#3a4430"/><path d="M${(hx - 18 * s).toFixed(1)},${(hy - 28 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 35 * s).toFixed(1)} ${(hx + 14 * s).toFixed(1)},${(hy - 30 * s).toFixed(1)}" stroke="#fff" stroke-width="${(2.4 * s).toFixed(1)}" fill="none" opacity=".25"/>` +
    `<path d="M${(hx - 27 * s).toFixed(1)},${(hy - 8 * s).toFixed(1)} h${(54 * s).toFixed(1)}" stroke="#262c22" stroke-width="${(4 * s).toFixed(1)}"/><path d="M${(hx + f * 4 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)} L${(hx + f * 26 * s).toFixed(1)},${(hy - 6 * s).toFixed(1)} L${(hx + f * 24 * s).toFixed(1)},${(hy + 16 * s).toFixed(1)} L${(hx + f * 6 * s).toFixed(1)},${(hy + 14 * s).toFixed(1)}Z" fill="#9ab8cc" opacity=".16" stroke="#c8dce8" stroke-opacity=".5" stroke-width="${(1.4 * s).toFixed(1)}"/>`;
  if (o.baton) g += `<path d="M${HB[0].toFixed(1)},${HB[1].toFixed(1)} L${(HB[0] - f * 34 * s).toFixed(1)},${(HB[1] - 56 * s).toFixed(1)}" stroke="#141414" stroke-width="${(6 * s).toFixed(1)}" stroke-linecap="round"/>`;
  if (o.shield) { const sx = HF[0] + f * 10 * s, top = HF[1] - 130 * s, bot = HF[1] + 92 * s, w = 34 * s;
    g += `<path d="M${sx.toFixed(1)},${top.toFixed(1)} Q${(sx + f * w).toFixed(1)},${((top + bot) / 2).toFixed(1)} ${sx.toFixed(1)},${bot.toFixed(1)} L${(sx + f * 16 * s).toFixed(1)},${bot.toFixed(1)} Q${(sx + f * (w + 16 * s)).toFixed(1)},${((top + bot) / 2).toFixed(1)} ${(sx + f * 16 * s).toFixed(1)},${top.toFixed(1)}Z" fill="url(#shG)" stroke="#20262c" stroke-width="${(3.4 * s).toFixed(1)}"/><path d="M${(sx + f * 4 * s).toFixed(1)},${(top + 14 * s).toFixed(1)} Q${(sx + f * (w * .9)).toFixed(1)},${((top + bot) / 2).toFixed(1)} ${(sx + f * 4 * s).toFixed(1)},${(bot - 30 * s).toFixed(1)}" stroke="#fff" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".55"/>`; }
  if (o.torch != null) { const a = o.torch * Math.PI / 180, L = 420 * s, ex = HF[0] + Math.cos(a) * L, ey = HF[1] + Math.sin(a) * L, px = -Math.sin(a) * 70 * s, py = Math.cos(a) * 70 * s;
    g += `<rect x="${(HF[0] - 4 * s).toFixed(1)}" y="${(HF[1] - 5 * s).toFixed(1)}" width="${(18 * s).toFixed(1)}" height="${(10 * s).toFixed(1)}" rx="${(3 * s).toFixed(1)}" fill="#1a1a1a" transform="rotate(${(f > 0 ? o.torch : 180 - o.torch).toFixed(1)},${HF[0].toFixed(1)},${HF[1].toFixed(1)})"/>`;
    F.beams = (F.beams || '') + scr(`<path d="M${HF[0].toFixed(1)},${HF[1].toFixed(1)} L${(ex + px).toFixed(1)},${(ey + py).toFixed(1)} L${(ex - px).toFixed(1)},${(ey - py).toFixed(1)}Z" fill="url(#tbG)" transform="${f < 0 ? `translate(${(2 * HF[0]).toFixed(1)},0) scale(-1,1)` : ''}" opacity=".9"/><circle cx="${HF[0].toFixed(1)}" cy="${HF[1].toFixed(1)}" r="${(10 * s).toFixed(1)}" fill="#fff8e0"/>`); }
  return g;
}
// a hazmat worker: yellow suit, hood with a dark visor, a mask filter, black gloves and boots. o: gun (thermometer gun aimed at [x,y]), spray, torch, walk, h
function hazmat(x, y, s, f, t, o = {}) {
  const A = { s, face: f, shade: 1, lean: o.lean ?? 4, walk: o.walk ?? null, top: '#e6bc2e', pants: '#d8ae26', skin: '#1c1c1c', hair: '#e6bc2e', lookUp: o.look ?? 0 };
  if (o.gun) A.hF = [x + f * s * 70, y - s * 236];
  if (o.torch != null) A.hF = [x + f * s * 66, y - s * 204];
  let g = hero(x, y, Object.assign(A, o.h || {}));
  const H = HP.head, C = HP.chest, HF = HP.hand, hx = H[0], hy = H[1];
  g += `<path d="M${(C[0] - 4 * s).toFixed(1)},${(C[1] - 40 * s).toFixed(1)} q${(6 * s).toFixed(1)},${(30 * s).toFixed(1)} ${(-2 * s).toFixed(1)},${(70 * s).toFixed(1)} M${(C[0] + 10 * s).toFixed(1)},${(C[1] - 20 * s).toFixed(1)} q${(-6 * s).toFixed(1)},${(20 * s).toFixed(1)} ${(4 * s).toFixed(1)},${(40 * s).toFixed(1)}" stroke="#8a6a10" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".45"/>`;
  // the hood, visor and mask filter
  g += `<ellipse cx="${hx.toFixed(1)}" cy="${(hy + 4 * s).toFixed(1)}" rx="${(29 * s).toFixed(1)}" ry="${(34 * s).toFixed(1)}" fill="url(#hzG)"/><path d="M${(hx - 20 * s).toFixed(1)},${(hy - 24 * s).toFixed(1)} Q${hx.toFixed(1)},${(hy - 34 * s).toFixed(1)} ${(hx + 18 * s).toFixed(1)},${(hy - 26 * s).toFixed(1)}" stroke="#fff4b0" stroke-width="${(2.4 * s).toFixed(1)}" fill="none" opacity=".5"/>` +
    `<path d="M${(hx + f * 2 * s).toFixed(1)},${(hy - 16 * s).toFixed(1)} Q${(hx + f * 30 * s).toFixed(1)},${(hy - 14 * s).toFixed(1)} ${(hx + f * 28 * s).toFixed(1)},${(hy + 8 * s).toFixed(1)} Q${(hx + f * 14 * s).toFixed(1)},${(hy + 14 * s).toFixed(1)} ${(hx + f * 2 * s).toFixed(1)},${(hy + 8 * s).toFixed(1)}Z" fill="url(#visG)"/><path d="M${(hx + f * 8 * s).toFixed(1)},${(hy - 11 * s).toFixed(1)} q${(f * 10 * s).toFixed(1)},${(-2 * s).toFixed(1)} ${(f * 16 * s).toFixed(1)},${(3 * s).toFixed(1)}" stroke="#fff" stroke-width="${(2 * s).toFixed(1)}" fill="none" opacity=".7"/>` +
    `<rect x="${(hx + f * 14 * s - 7 * s).toFixed(1)}" y="${(hy + 12 * s).toFixed(1)}" width="${(14 * s).toFixed(1)}" height="${(14 * s).toFixed(1)}" rx="${(4 * s).toFixed(1)}" fill="#3a3c40"/><rect x="${(hx + f * 14 * s - 5 * s).toFixed(1)}" y="${(hy + 14 * s).toFixed(1)}" width="${(10 * s).toFixed(1)}" height="${(3 * s).toFixed(1)}" fill="#6a6c72"/>`;
  if (o.gun) { const [tx, ty] = o.gun; g += `<path d="M${HF[0].toFixed(1)},${(HF[1] - 6 * s).toFixed(1)} h${(f * 22 * s).toFixed(1)} v${(8 * s).toFixed(1)} h${(-f * 12 * s).toFixed(1)} l${(-f * 4 * s).toFixed(1)},${(12 * s).toFixed(1)} h${(-f * 6 * s).toFixed(1)}Z" fill="#e8ecf0" stroke="#5a5e66" stroke-width="${(1.2 * s).toFixed(1)}"/>` +
    `<path d="M${(HF[0] + f * 22 * s).toFixed(1)},${(HF[1] - 2 * s).toFixed(1)} L${tx.toFixed(1)},${ty.toFixed(1)}" stroke="#ff3a2a" stroke-width="1.4" opacity=".8"/><circle cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" r="3" fill="#ff3a2a"/>`; }
  if (o.torch != null) { const a = o.torch * Math.PI / 180, L = 380 * s, ex = HF[0] + Math.cos(a) * L, ey = HF[1] + Math.sin(a) * L, px = -Math.sin(a) * 64 * s, py = Math.cos(a) * 64 * s;
    F.beams = (F.beams || '') + scr(`<path d="M${HF[0].toFixed(1)},${HF[1].toFixed(1)} L${(ex + px).toFixed(1)},${(ey + py).toFixed(1)} L${(ex - px).toFixed(1)},${(ey - py).toFixed(1)}Z" fill="url(#tbG)" opacity=".85" transform="${f < 0 ? `translate(${(2 * HF[0]).toFixed(1)},0) scale(-1,1)` : ''}"/><circle cx="${HF[0].toFixed(1)}" cy="${HF[1].toFixed(1)}" r="${(9 * s).toFixed(1)}" fill="#fff8e0"/>`); }
  return g;
}
