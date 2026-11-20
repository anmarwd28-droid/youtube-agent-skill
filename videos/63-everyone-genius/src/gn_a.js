// gn_a.js (#62): a world without firearms. Shared pieces (people in armour, archers, robes, fireworks, cannon) + scenes 0-4
const GNDEF = `<linearGradient id="stG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5c646e"/><stop offset=".38" stop-color="#c8d0d8"/><stop offset=".55" stop-color="#eef2f6"/><stop offset=".72" stop-color="#9aa4ae"/><stop offset="1" stop-color="#4e565e"/></linearGradient>` +
  `<linearGradient id="stV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4eaf0"/><stop offset=".45" stop-color="#9aa4ae"/><stop offset="1" stop-color="#4a525a"/></linearGradient>` +
  `<linearGradient id="blG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8e98a2"/><stop offset=".5" stop-color="#f4f8fc"/><stop offset="1" stop-color="#7a848e"/></linearGradient>` +
  `<radialGradient id="lnG"><stop offset="0" stop-color="#ffd890" stop-opacity=".9"/><stop offset=".35" stop-color="#ffb050" stop-opacity=".35"/><stop offset="1" stop-color="#ff9030" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="fwG"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".3" stop-color="#fff" stop-opacity=".3"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="brzG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c27a"/><stop offset=".35" stop-color="#b8863e"/><stop offset=".7" stop-color="#6e4a1e"/><stop offset="1" stop-color="#3a2610"/></linearGradient>` +
  `<linearGradient id="irG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8088"/><stop offset=".3" stop-color="#4a5058"/><stop offset=".75" stop-color="#22262c"/><stop offset="1" stop-color="#121418"/></linearGradient>` +
  `<linearGradient id="wdG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#4a2e16"/></linearGradient>` +
  `<filter id="gnWood" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .09" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .18  0 0 0 0 .1  0 0 0 0 .04  0 0 0 .55 -.1"/></filter>` +
  `<filter id="smB" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter><filter id="gnMail" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="2"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .1  0 0 0 0 .12  0 0 0 .9 -.25"/></filter>`;
const GNL = (x, y, tx, a, col = '#fff', fs = 24) => lbl(x, y, tx, a, col, fs);
// the 3D Earth (gl3d_cb.js with the cube morph off)
function glE(t, o) { const G = gW(t, o); Object.assign(F.w.disc, { tet: 0, pool: 0, quake: 0 }); return G; }
// hero() with extra drawing put INSIDE its local frame: mid (after the torso and head, before the front arm) and end (over everything)
function heroX(x, y, o, mid, end) {
  let g = hero(x, y, o); const i = g.lastIndexOf('<g transform="rotate('), m = g.slice(i).match(/rotate\(([-\d.]+),0,([-\d.]+)\)/);
  const hipY = m ? +m[2] : -150, ty = hipY - 112, L = { hipY, ty, hx: 6, hy: ty - 34, shX: 2, shY: ty + 14 }, up = m ? `<g transform="rotate(${m[1]},0,${hipY})">` : '<g>';
  if (mid) g = g.slice(0, i) + up + mid(L) + '</g>' + g.slice(i);
  if (end) { const j = g.lastIndexOf('</g>'); g = g.slice(0, j) + up + end(L) + '</g>' + g.slice(j); }
  return g;
}
// a knight in plate armour with a cloth surcoat, a bascinet helmet, a sword in the front hand and a shield. o: sword (angle deg), shield, col, walk, s, f
function knight(x, y, s, f, t, o = {}) {
  const col = o.col || '#7a1e22', dk = mix(col, '#000000', .45), sw = (o.sword ?? -60) * Math.PI / 180;
  const A = { s, face: f, shade: 1, top: '#8e98a2', pants: '#7a838d', skin: '#59616a', hair: '#59616a', walk: o.walk ?? null, amp: o.amp ?? .4, lean: o.lean || 0 };
  if (o.shield) A.hB = [x + f * s * 58, y - s * 238];
  if (o.hF) A.hF = o.hF;
  const mid = L => { const { hipY, ty, hx, hy } = L;
    let g = `<path d="M-27,${ty + 12} Q0,${ty + 2} 29,${ty + 12} L35,${hipY + 58} Q2,${hipY + 70} -32,${hipY + 58}Z" fill="${col}"/>` +
      `<path d="M-27,${ty + 12} L-14,${ty + 8} L-18,${hipY + 62} L-32,${hipY + 58}Z" fill="#000" opacity=".25"/><path d="M8,${hipY - 20} L10,${hipY + 66} M20,${hipY - 10} L24,${hipY + 62}" stroke="${dk}" stroke-width="3" opacity=".6"/>` +
      `<path d="M-30,${hipY + 54} Q2,${hipY + 66} 34,${hipY + 54}" stroke="#d8b25a" stroke-width="3" fill="none"/><rect x="-28" y="${hipY - 10}" width="60" height="9" rx="3" fill="#3a2614"/><rect x="0" y="${hipY - 11}" width="9" height="11" rx="2" fill="#c8a050"/>`;
    // mail collar and the helmet
    const av = `M${hx - 22},${hy + 6} Q${hx},${hy + 30} ${hx + 24},${hy + 4} L${hx + 30},${ty + 22} Q${hx + 2},${ty + 34} ${hx - 32},${ty + 24}Z`;
    g += `<path d="${av}" fill="#737b84"/><path d="${av}" fill="#000" filter="url(#gnMail)" opacity=".75"/><path d="M${hx - 32},${ty + 24} Q${hx + 2},${ty + 34} ${hx + 30},${ty + 22}" stroke="#3a4048" stroke-width="2" fill="none"/>` +
      `<path d="M${hx - 26},${hy + 16} C${hx - 32},${hy - 28} ${hx - 6},${hy - 50} ${hx + 6},${hy - 52} C${hx + 18},${hy - 34} ${hx + 27},${hy - 20} ${hx + 28},${hy + 16} Q${hx},${hy + 25} ${hx - 26},${hy + 16}Z" fill="url(#stG)"/>` +
      `<path d="M${hx + 6},${hy - 14} Q${hx + 34},${hy - 6} ${hx + 38},${hy + 4} Q${hx + 30},${hy + 14} ${hx + 12},${hy + 20} Z" fill="url(#stV)" stroke="#3a4048" stroke-width="1.4"/>` +
      `<path d="M${hx + 12},${hy - 4} L${hx + 34},${hy + 1}" stroke="#0e1014" stroke-width="3.2" stroke-linecap="round"/>` + [0, 1, 2].map(k => `<circle cx="${hx + 20 + k * 5}" cy="${hy + 10}" r="1.3" fill="#0e1014"/>`).join('') +
      `<path d="M${hx - 10},${hy - 38} Q${hx - 18},${hy - 10} ${hx - 14},${hy + 10}" stroke="#fff" stroke-width="3" fill="none" opacity=".35"/><circle cx="${hx - 6}" cy="${hy - 2}" r="2.2" fill="#3a4048"/>`;
    if (o.shield) { const sx = 26, sy = ty + 30, sc = o.shc || '#1e3a6a';
      g += `<path d="M${sx},${sy} h64 v58 Q${sx + 64},${sy + 128} ${sx + 32},${sy + 156} Q${sx},${sy + 128} ${sx},${sy + 58}Z" fill="${sc}" stroke="#8e98a2" stroke-width="5"/>` +
        `<path d="M${sx},${sy} h64 v58 Q${sx + 64},${sy + 128} ${sx + 32},${sy + 156} Q${sx},${sy + 128} ${sx},${sy + 58}Z" fill="#000" filter="url(#gnWood)" opacity=".5"/>` +
        `<path d="M${sx + 2},${sy + 40} L${sx + 62},${sy + 92} L${sx + 62},${sy + 112} L${sx + 2},${sy + 60}Z" fill="#d8b25a" opacity=".9"/>` +
        `<path d="M${sx + 8},${sy + 6} v50 Q${sx + 10},${sy + 110} ${sx + 30},${sy + 142}" stroke="#fff" stroke-width="3" fill="none" opacity=".25"/><path d="M${sx + 58},${sy + 6} v54 Q${sx + 56},${sy + 116} ${sx + 34},${sy + 146}" stroke="#000" stroke-width="5" fill="none" opacity=".3"/>`; }
    return g; };
  const end = L => { const { shX, shY, hipY } = L;
    return `<ellipse cx="${shX + 2}" cy="${shY + 6}" rx="21" ry="17" fill="url(#stV)" stroke="#3a4048" stroke-width="1.4"/><path d="M${shX - 16},${shY + 12} Q${shX + 2},${shY + 26} ${shX + 20},${shY + 12}" stroke="#3a4048" stroke-width="1.6" fill="none"/>` +
      `<ellipse cx="${shX - 4}" cy="${shY - 1}" rx="7" ry="4" fill="#fff" opacity=".45"/>`; };
  let g = heroX(x, y, A, mid, end).split('#1d2028').join('#5a626b');
  if (o.sword != null) { const [hx, hy] = HP.hand, L = 160 * s, ex = hx + f * Math.cos(sw) * L, ey = hy + Math.sin(sw) * L, px = -Math.sin(sw) * f, py = Math.cos(sw);
    g += `<path d="M${(hx - f * Math.cos(sw) * 26 * s).toFixed(1)},${(hy - Math.sin(sw) * 26 * s).toFixed(1)} L${hx.toFixed(1)},${hy.toFixed(1)}" stroke="#3a2614" stroke-width="${(7 * s).toFixed(1)}" stroke-linecap="round"/>` +
      `<circle cx="${(hx - f * Math.cos(sw) * 28 * s).toFixed(1)}" cy="${(hy - Math.sin(sw) * 28 * s).toFixed(1)}" r="${(6 * s).toFixed(1)}" fill="#c8a050"/>` +
      `<path d="M${(hx + px * 22 * s + f * Math.cos(sw) * 8 * s).toFixed(1)},${(hy + py * 22 * s + Math.sin(sw) * 8 * s).toFixed(1)} L${(hx - px * 22 * s + f * Math.cos(sw) * 8 * s).toFixed(1)},${(hy - py * 22 * s + Math.sin(sw) * 8 * s).toFixed(1)}" stroke="#c8a050" stroke-width="${(6 * s).toFixed(1)}" stroke-linecap="round"/>` +
      `<path d="M${(hx + f * Math.cos(sw) * 10 * s + px * 5 * s).toFixed(1)},${(hy + Math.sin(sw) * 10 * s + py * 5 * s).toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)} L${(hx + f * Math.cos(sw) * 10 * s - px * 5 * s).toFixed(1)},${(hy + Math.sin(sw) * 10 * s - py * 5 * s).toFixed(1)}Z" fill="url(#blG)" stroke="#5a626a" stroke-width="1"/>` +
      `<path d="M${(hx + f * Math.cos(sw) * 14 * s).toFixed(1)},${(hy + Math.sin(sw) * 14 * s).toFixed(1)} L${(hx + f * Math.cos(sw) * L * .8).toFixed(1)},${(hy + Math.sin(sw) * L * .8).toFixed(1)}" stroke="#6a727a" stroke-width="${(1.4 * s).toFixed(1)}"/>`; }
  return g;
}
// an archer with a longbow: draw k 0..1 (string pulled back), loose (arrow gone)
function archer(x, y, s, f, t, o = {}) {
  const k = o.draw ?? 1, P = o.pal || { top: '#4a5a32', pants: '#5a4630', skin: '#c08a62', hair: '#3a2a1c' };
  const sh = y - s * 236, gx = x + f * s * 74, gy = sh + s * 4, dx = x + f * s * lerp(56, 6, k), dy = sh + s * lerp(4, -14, k);
  const A = Object.assign({ s, face: f, shade: 1, hB: [gx, gy], hF: [dx, dy], bendF: 1, lookUp: .05 }, P);
  const mid = L => { const { hipY, ty, hx, hy } = L;
    return `<path d="M-25,${ty + 10} Q0,${ty} 27,${ty + 10} L31,${hipY + 40} Q2,${hipY + 50} -28,${hipY + 40}Z" fill="${mix(P.top, '#000000', .1)}"/><rect x="-26" y="${hipY - 8}" width="56" height="8" rx="3" fill="#2a1a0e"/>` +
      `<path d="M${hx + 18},${hy - 16} C${hx + 6},${hy - 42} ${hx - 34},${hy - 36} ${hx - 26},${hy + 8} L${hx - 20},${ty + 20} L${hx - 2},${ty + 20} C${hx - 12},${hy + 12} ${hx - 10},${hy - 14} ${hx + 18},${hy - 16}Z" fill="${mix(P.top, '#2a2010', .35)}"/>` +
      `<rect x="-36" y="${ty + 24}" width="14" height="76" rx="5" fill="#5a3a20" transform="rotate(-14,-30,${ty + 60})"/>` + [0, 1, 2].map(q => `<path d="M${-34 + q * 4},${ty + 24} l${-8 + q * 3},-24" stroke="#e8e0cc" stroke-width="3"/>`).join(''); };
  let g = heroX(x, y, A, mid);
  const top = [gx + f * 22 * s, gy - 96 * s], bot = [gx + f * 22 * s, gy + 96 * s], bend = 36 * s + 18 * s * k;
  g += `<path d="M${top[0].toFixed(1)},${top[1].toFixed(1)} Q${(gx + f * (22 * s + bend)).toFixed(1)},${gy.toFixed(1)} ${bot[0].toFixed(1)},${bot[1].toFixed(1)}" stroke="#6a4424" stroke-width="${(6 * s).toFixed(1)}" fill="none" stroke-linecap="round"/>` +
    `<path d="M${top[0].toFixed(1)},${top[1].toFixed(1)} L${dx.toFixed(1)},${dy.toFixed(1)} L${bot[0].toFixed(1)},${bot[1].toFixed(1)}" stroke="#e8e2d0" stroke-width="${(1.4 * s).toFixed(1)}" fill="none"/>`;
  if (!o.loose) g += `<path d="M${dx.toFixed(1)},${dy.toFixed(1)} L${(gx + f * 70 * s).toFixed(1)},${(gy - 2 * s).toFixed(1)}" stroke="#9a7040" stroke-width="${(2.6 * s).toFixed(1)}"/><path d="M${(gx + f * 70 * s).toFixed(1)},${(gy - 6 * s).toFixed(1)} l${(f * 12 * s).toFixed(1)},${(4 * s).toFixed(1)} l${(-f * 12 * s).toFixed(1)},${(4 * s).toFixed(1)}Z" fill="#5a626a"/>` +
    `<path d="M${dx.toFixed(1)},${dy.toFixed(1)} l${(-f * 4 * s).toFixed(1)},${(-6 * s).toFixed(1)} l${(f * 16 * s).toFixed(1)},${(5 * s).toFixed(1)} M${dx.toFixed(1)},${dy.toFixed(1)} l${(-f * 4 * s).toFixed(1)},${(6 * s).toFixed(1)} l${(f * 16 * s).toFixed(1)},${(-3 * s).toFixed(1)}" stroke="#c83a2a" stroke-width="${(2 * s).toFixed(1)}" fill="none"/>`;
  return g;
}
// a foot soldier with a long spear (and a round shield), o: ang (spear angle from vertical, deg)
function spearman(x, y, s, f, t, i, o = {}) {
  const P = [{ top: '#6a4a2e', pants: '#4a3a28', skin: '#b07a52', hair: '#2a1c12' }, { top: '#5a5e3a', pants: '#3e3a2a', skin: '#9a6a46', hair: '#1e1610' }, { top: '#7a3a2a', pants: '#4a3426', skin: '#c49068', hair: '#3a2a1a' }][i % 3];
  const ang = (o.ang ?? 8) * Math.PI / 180, hx = x + f * s * 40, hy = y - s * 210;
  const A = Object.assign({ s, face: f, shade: 1, hF: [hx, hy], walk: o.walk ?? null }, P);
  const mid = L => { const { hipY, ty, hx: qx, hy: qy } = L;
    const ms = `M-23,${ty + 12} Q2,${ty + 2} 25,${ty + 12} C30,${ty + 50} 28,${hipY - 20} 29,${hipY + 30} Q2,${hipY + 38} -26,${hipY + 30} C-27,${hipY - 20} -29,${ty + 50} -23,${ty + 12}Z`;
    return `<path d="${ms}" fill="#8a8e88"/><path d="${ms}" fill="#000" filter="url(#gnMail)" opacity=".6"/><path d="M-23,${ty + 12} L-8,${ty + 8} L-10,${hipY + 34} L-26,${hipY + 30}Z" fill="#000" opacity=".2"/><rect x="-25" y="${hipY - 6}" width="54" height="8" rx="3" fill="#3a2614"/>` +
      `<path d="M${qx - 24},${qy + 2} Q${qx - 22},${qy - 36} ${qx + 2},${qy - 36} Q${qx + 26},${qy - 34} ${qx + 24},${qy + 2} Z" fill="url(#stG)"/><path d="M${qx - 28},${qy + 2} h56" stroke="#4a525a" stroke-width="4" stroke-linecap="round"/>` +
      (o.shield !== 0 ? `<ellipse cx="34" cy="${ty + 80}" rx="30" ry="46" fill="${['#7a2a1e', '#2e4a6a', '#6a5a24'][i % 3]}" stroke="#8a6a3a" stroke-width="5"/><ellipse cx="34" cy="${ty + 80}" rx="30" ry="46" fill="#000" filter="url(#gnWood)" opacity=".45"/><circle cx="36" cy="${ty + 80}" r="9" fill="url(#stV)"/>` : ''); };
  let g = heroX(x, y, A, mid);
  const L1 = 300 * s, dx = f * Math.sin(ang), dy = -Math.cos(ang);
  g += `<path d="M${(hx - dx * 120 * s).toFixed(1)},${(hy - dy * 120 * s).toFixed(1)} L${(hx + dx * L1).toFixed(1)},${(hy + dy * L1).toFixed(1)}" stroke="#6a4a2a" stroke-width="${(5 * s).toFixed(1)}" stroke-linecap="round"/>` +
    `<path d="M${(hx + dx * L1 - dy * f * 0).toFixed(1)},${(hy + dy * L1).toFixed(1)} l${(dx * 34 * s - 6 * s * Math.cos(ang) * f).toFixed(1)},${(dy * 34 * s - 6 * s * Math.sin(ang)).toFixed(1)} l${(12 * s * Math.cos(ang) * f).toFixed(1)},${(12 * s * Math.sin(ang)).toFixed(1)}Z" fill="url(#blG)"/>`;
  return g;
}
// an alchemist in a long robe with a top-knot, o: hF hand target, col
function robeP(x, y, s, f, t, o = {}) {
  const col = o.col || '#5a2e3a', A = Object.assign({ s, face: f, shade: 1, top: col, pants: mix(col, '#000000', .3), skin: '#e0b48a', hair: '#1a1410', lean: o.lean || 0 }, o.h || {});
  const mid = L => { const { hipY, ty, hx, hy } = L;
    return `<path d="M-26,${ty + 14} Q0,${ty + 4} 28,${ty + 14} L44,${hipY + 150} Q4,${hipY + 160} -40,${hipY + 150}Z" fill="${col}"/><path d="M-26,${ty + 14} L-10,${ty + 10} L-14,${hipY + 156} L-40,${hipY + 150}Z" fill="#000" opacity=".22"/>` +
      `<path d="M2,${ty + 6} L14,${hipY - 10}" stroke="#d8b25a" stroke-width="5"/><rect x="-28" y="${hipY - 14}" width="62" height="12" rx="4" fill="#d8b25a"/>` +
      `<path d="M12,${hipY + 10} L18,${hipY + 150} M-4,${hipY + 20} L-6,${hipY + 154}" stroke="#000" stroke-width="3" opacity=".18"/>` +
      `<ellipse cx="${hx - 4}" cy="${hy - 30}" rx="10" ry="8" fill="#1a1410"/><rect x="${hx - 7}" y="${hy - 40}" width="6" height="6" fill="#c8a050"/>` +
      `<path d="M${hx + 16},${hy + 12} q4,16 -6,26 q-4,-12 -2,-24Z" fill="#2a2420"/>`; };
  return heroX(x, y, A, mid);
}
// fireworks: a burst at (cx, cy) starting at t0
function fwBurst(cx, cy, t0, t, col, seed, R = 150) {
  const T = t - t0; if (T < 0 || T > 2.6) return ''; const r = RS(seed), a = clamp(1 - (T - 1.2) / 1.4), n = 46;
  let s = '';
  if (T < .5) { const k = T / .5, y0 = cy + 520; return `<path d="M${cx},${y0} L${cx + 6 * Math.sin(T * 9)},${lerp(y0, cy, ease(k))}" stroke="#ffe4a0" stroke-width="3" opacity=".7" stroke-linecap="round"/><circle cx="${cx}" cy="${lerp(y0, cy, ease(k)).toFixed(1)}" r="4" fill="#fff"/>`; }
  const U = T - .5, ex = 1 - Math.exp(-U * 2.6);
  for (let i = 0; i < n; i++) { const an = i / n * Math.PI * 2 + r() * .2, sp = R * (.75 + r() * .35), px = cx + Math.cos(an) * sp * ex, py = cy + Math.sin(an) * sp * ex + 40 * U * U, tx = cx + Math.cos(an) * sp * ex * .55, ty = cy + Math.sin(an) * sp * ex * .55 + 30 * U * U;
    const tw = .6 + .4 * Math.sin(t * 30 + i);
    s += `<path d="M${tx.toFixed(1)},${ty.toFixed(1)} L${px.toFixed(1)},${py.toFixed(1)}" stroke="${col}" stroke-width="2.2" opacity="${(a * .55).toFixed(2)}" stroke-linecap="round"/><circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${(2.6 * tw).toFixed(1)}" fill="#fff" opacity="${(a * tw).toFixed(2)}"/>`; }
  return scr(`<circle cx="${cx}" cy="${cy + 20 * U * U}" r="${(R * 1.5 * ex).toFixed(1)}" fill="${col}" opacity="${(a * .16).toFixed(2)}" filter="url(#blur16)"/>` + s);
}
// a bronze cannon on a wooden carriage, muzzle to +x
function cannonG(x, y, s, o = {}) {
  const el = (o.el ?? -8);
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="10" cy="4" rx="190" ry="14" fill="#000" opacity=".35" filter="url(#blur5)"/>` +
    `<path d="M-150,-20 L60,-60 L90,-60 L90,-40 L-130,0 Z" fill="url(#wdG)"/><path d="M-150,-20 L60,-60 L90,-60 L90,-40 L-130,0 Z" fill="#000" filter="url(#gnWood)" opacity=".5"/>` +
    `<g transform="rotate(${el},0,-70)"><path d="M-110,-98 Q-128,-70 -110,-42 L170,-56 L172,-84 Z" fill="url(#brzG)"/><rect x="166" y="-90" width="16" height="40" rx="4" fill="url(#brzG)"/><ellipse cx="182" cy="-70" rx="4" ry="13" fill="#140c06"/>` +
    [-60, 20, 110].map(q => `<rect x="${q}" y="${-96 + q * .05}" width="9" height="${54 - q * .1}" rx="2" fill="#6e4a1e" opacity=".8"/>`).join('') + `<circle cx="-124" cy="-70" r="12" fill="url(#brzG)"/><path d="M-100,-92 L160,-82" stroke="#fff2c8" stroke-width="3" opacity=".45"/></g>` +
    `<circle cx="20" cy="-34" r="44" fill="none" stroke="#3a2412" stroke-width="12"/><circle cx="20" cy="-34" r="44" fill="none" stroke="#7a5a3a" stroke-width="4"/>` + [0, 1, 2, 3, 4, 5].map(k => `<path d="M20,-34 L${20 + 44 * Math.cos(k * Math.PI / 3 + .3)},${-34 + 44 * Math.sin(k * Math.PI / 3 + .3)}" stroke="#5a3a1e" stroke-width="7"/>`).join('') +
    `<circle cx="20" cy="-34" r="9" fill="#2a1a0c"/></g>`;
}

// the #62 street: the #54 street (street11) with other buildings and no clock tower
function street12(t, o = {}) {
  const N = o.N || 0, id = o.id || 'q';
  const sky = [mix('#3a72b8', '#060c24', N), mix('#9cc0e2', '#16224a', N), mix('#efe2c8', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  if (N > .02) { const r = RS(14); for (let i = 0; i < 90; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 700).toFixed(1)}" r="${(.6 + r() * 1.2).toFixed(1)}" fill="#fff" opacity="${(N * (.25 + .6 * r()) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`;
    s += moon(120, 440, 28, N); }
  if (N < .98) s += sun3(590, 420, 1 - N) + cumulus(160 + t * 1.5, 470, 240, 21, { a: .85 * (1 - N) }) + cumulus(600 + t, 560, 190, 23, { a: .7 * (1 - N) });
  let g = farCity(64, 905, mix(sky[2], '#5a6478', .4)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  [[-14, 150, 400, '#b8a48a', 921, 2], [130, 140, 340, '#8a5a4a', 922, 1], [266, 170, 450, '#d4cab4', 923, 0], [432, 140, 380, '#a07a5a', 924, 1], [568, 170, 420, '#6e7e8e', 925, 2]].forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
    const sh = shopRowB(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#bcb2a2"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 4; q++) g += `<path d="M-20,${PV + 26 * (q + 1)} L740,${PV + 26 * (q + 1)}" stroke="#9a907e" stroke-width="1.5"/>`;
  for (let q = -1; q < 24; q++) g += `<path d="M${q * 34 + 8},${PV} L${q * 34},${KB}" stroke="#9a907e" stroke-width="1.2"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  // cobbled road
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#56524e"/>`;
  { const r = RS(97); for (let row = 0; row < 9; row++) { const y = KB + 18 + row * 20, h = 12 + row * .8; for (let i = -1; i < 26; i++) g += `<rect x="${(i * 30 + (row % 2) * 15 + r() * 4).toFixed(1)}" y="${y}" width="26" height="${h.toFixed(1)}" rx="5" fill="${mix('#6a6660', '#4a4642', r())}"/>`; } }
  g += `<rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".35"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>`;
  [[96, 280, 171], [610, 300, 173]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[300, 0]];
  lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  g += o.mid || '';
  if (o.cars !== 0) g += car(o.carX || 520, 1180, .95, '#8a2a2a', -1, 0);
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/><ellipse cx="${lx + 65}" cy="${PV + 70}" rx="140" ry="26" fill="#ffd59a" opacity=".22" filter="url(#soft)"/>`) + `<rect x="${lx + 56}" y="${PV - 174}" width="18" height="6" rx="2" fill="#fff4d8"/>`).join('') + `</g>`;
  if (o.top) s += `<defs>${mulF('tf' + id, N * .45)}</defs><g filter="url(#tf${id})">${o.top}</g>`;
  return s;
}

// ---------- 0: hook. A knight in armour walks down a modern city street ----------
function sceneHook(t) {
  const k = ease(ramp(t, 0, 3.4));
  const kx = lerp(170, 300, t / 3.6), ph = t * 4.6;
  const top = `<defs>${GNDEF}</defs>` + knight(kx, 1080, .92, 1, t, { walk: ph, shield: 1, sword: 20, col: '#6a1a20', shc: '#1e3a6a' });
  noEarth(); F.ov = '';
  return street12(t, { N: .08, id: 'h0', top, carX: 560 });
}
// ---------- 1: more than a billion firearms in the world today ----------
function sceneBillion(t) {
  const t0 = S0(1) - .2, T = t - t0, n = ease(ramp(t, WS(1, 3), WS(1, 7) + .2));
  glE(t, { d: 10.6, el: .25, lon: 20 + T * 5, clouds: .45, lights: .55, off: -.3, tg: [0, .05, 0] });
  const pa = ease(ramp(t, WS(1, 3) - .3, WS(1, 3)));
  F.ov = pa > 0 ? `<g opacity="${pa.toFixed(2)}">${panel(130, 1010, 460, 130)}${GNL(360, 1080, ARK(Math.round(1e9 * n)), 1, '#f4c76b', 56)}${GNL(360, 1122, 'سلاحٍ ناريّ في العالم اليوم', 1, '#fff', 24)}</g>` : '';
  return space(t);
}
// ---------- 2: an alchemist's room, about 850 CE: saltpetre, charcoal, sulphur... a flash ----------
function sceneAlchemy(t) {
  const t0 = S0(2) - .2, T = t - t0, fl = WS(2, 13), bang = clamp(1 - Math.abs(t - fl - .15) / .5), sm = ease(ramp(t, fl, fl + 1.6));
  let s = `<defs>${GNDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#2a1a12"/>`;
  // the back wall: plaster with a lattice window and the moon
  s += `<rect x="-20" y="-20" width="760" height="900" fill="#5a3e2a"/><rect x="-20" y="-20" width="760" height="900" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += `<rect x="380" y="430" width="250" height="300" fill="#16223e"/><circle cx="520" cy="520" r="34" fill="#f4ecd0"/><circle cx="520" cy="520" r="70" fill="#f4ecd0" opacity=".12" filter="url(#blur9)"/>`;
  for (let i = 0; i <= 5; i++) s += `<path d="M${380 + i * 50},430 V730" stroke="#3a2214" stroke-width="7"/>`;
  for (let i = 0; i <= 6; i++) s += `<path d="M380,${430 + i * 50} H630" stroke="#3a2214" stroke-width="7"/>`;
  s += `<rect x="370" y="420" width="270" height="320" fill="none" stroke="#2a180c" stroke-width="16"/>`;
  // wooden beams and shelves with jars
  s += `<rect x="-20" y="400" width="760" height="22" fill="url(#wdG)"/><rect x="40" y="600" width="260" height="14" fill="url(#wdG)"/>`;
  [[70, 560, '#8a6a4a'], [120, 570, '#5a6a7a'], [175, 556, '#7a4a2a'], [230, 566, '#6a6a5a']].forEach(([x, y, c]) => s += `<path d="M${x - 18},600 Q${x - 24},${y + 10} ${x - 12},${y} h24 Q${x + 24},${y + 10} ${x + 18},600Z" fill="${c}"/><rect x="${x - 10}" y="${y - 8}" width="20" height="10" fill="${mix(c, '#000000', .3)}"/><path d="M${x - 14},${y + 14} q4,20 2,30" stroke="#fff" stroke-width="3" opacity=".25" fill="none"/>`);
  // the lantern light
  const fk = 1 + .05 * Math.sin(t * 13) + .03 * Math.sin(t * 29);
  s += `<path d="M120,250 V330" stroke="#1a1008" stroke-width="3"/><rect x="100" y="330" width="40" height="56" rx="10" fill="#ffcf7a"/><circle cx="120" cy="358" r="${(300 * fk).toFixed(0)}" fill="url(#lnG)" opacity=".55"/>`;
  // the table, the robe man, the mortar
  s += `<rect x="-20" y="900" width="760" height="420" fill="#3a2414"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#gnWood)" opacity=".5"/>`;
  s += robeP(220, 1040, 1.02, 1, t, { col: '#4a2a3a', h: { hF: [360 + 6 * Math.sin(T * 6), 905 + 4 * Math.cos(T * 6)], aB: [.5, 1.2], lookUp: -.25 + .4 * ease(ramp(t, fl, fl + .3)), lean: -4 * bang } });
  s += `<rect x="150" y="910" width="560" height="26" fill="#6a4426"/><rect x="170" y="936" width="520" height="300" fill="url(#wdG)"/><rect x="170" y="936" width="520" height="300" fill="#000" filter="url(#gnWood)" opacity=".5"/><path d="M150,910 h560" stroke="#a87a4a" stroke-width="3"/>`;
  // three heaps: saltpetre (white), charcoal (black), sulphur (yellow)
  const hp = (x, c, w, lab, pc) => `<ellipse cx="${x}" cy="906" rx="${w}" ry="12" fill="#2a1a0e" opacity=".4"/><path d="M${x - w},906 Q${x},${906 - w * .9} ${x + w},906Z" fill="${c}"/><path d="M${x - w * .5},${906 - w * .3} Q${x - w * .1},${906 - w * .8} ${x + w * .2},${906 - w * .6}" stroke="#fff" stroke-width="3" opacity=".3" fill="none"/>` +
    GNL(x, 976, lab, ease(ramp(t, WS(2, 5), WS(2, 6))), '#fff', 22) + GNL(x, 1004, pc, ease(ramp(t, WS(2, 5), WS(2, 6))), '#f4c76b', 24);
  s += hp(470, '#ece8de', 44, 'ملحُ البارود', '٧٥٪') + hp(570, '#1c1a1a', 30, 'فحم', '١٥٪') + hp(650, '#e8cc3a', 24, 'كبريت', '١٠٪');
  s += `<path d="M330,906 Q336,870 344,866 h40 Q392,870 398,906Z" fill="#8a7a66"/><ellipse cx="364" cy="868" rx="30" ry="6" fill="#2a2420"/>`;
  // the flash and the smoke
  if (bang > 0) s += scr(`<circle cx="364" cy="850" r="${(60 + 200 * bang).toFixed(0)}" fill="#ffe8b0" opacity="${(.8 * bang).toFixed(2)}" filter="url(#blur16)"/><circle cx="364" cy="856" r="${(30 * bang).toFixed(0)}" fill="#fff"/>`) + `<rect x="-20" y="-20" width="760" height="1320" fill="#fff4d8" opacity="${(.35 * bang).toFixed(2)}"/>`;
  if (sm > 0) { let w = ''; for (let i = 0; i < 22; i++) { const r = RS(i + 5), k = clamp(sm * 1.3 - i * .025), y = 850 - k * (160 + r() * 260), x = 364 + (r() - .5) * 160 * k + Math.sin(t * 1.3 + i) * 16 * k; w += `<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(22 + 60 * k).toFixed(0)}" ry="${(14 + 34 * k).toFixed(0)}" fill="${i % 2 ? '#9a948a' : '#b8b2a6'}" opacity="${(.32 * (1 - k * .7)).toFixed(2)}"/>`; } s += `<g filter="url(#smB)">${w}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: our world: cannons and guns. Here: only fireworks ----------
function sceneFireworks(t) {
  const sw = WS(3, 6) - .2, k = ease(ramp(t, sw, sw + .6));
  let s = `<defs>${GNDEF}</defs>`;
  if (k < 1) { // a dark museum wall: an old cannon and long guns behind glass (our world)
    let m = `<rect x="-20" y="-20" width="760" height="1320" fill="#1e1a18"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
    m += scr(`<path d="M360,380 L120,1100 L600,1100Z" fill="#fff0d0" opacity=".1" filter="url(#blur9)"/>`) + `<rect x="-20" y="1000" width="760" height="320" fill="#2a2420"/><path d="M-20,1000 h760" stroke="#4a4038" stroke-width="4"/>`;
    m += cannonG(330, 1060, 1.25, { el: -6 });
    [[560, 'M0,0 L-300,40'], [600, 'M0,0 L-300,40']].forEach(([y], i) => { const x = 120 + i * 0, yy = 560 + i * 120;
      m += `<g transform="translate(${170},${yy}) rotate(${-4})"><path d="M0,0 L330,0 L330,10 L60,12 L40,34 L0,40 Z" fill="#3a2414"/><path d="M60,2 L340,-2 L340,6 L60,8Z" fill="#4a5058"/><rect x="70" y="10" width="18" height="10" fill="#6a6e74"/><path d="M0,0 L60,2 L40,34 L0,40Z" fill="#000" filter="url(#gnWood)" opacity=".4"/></g>`; });
    s += `<g opacity="${(1 - k).toFixed(2)}">${m}</g>`;
  }
  if (k > 0) { // here: a night city, the sky full of fireworks, people watching
    let n = street12(t, { N: .92, id: 'h3', cars: 0, top: watchers(t) });
    const b = [[200, 330, WS(3, 7) - .3, '#ff6a4a', 1], [520, 280, WS(3, 8) - .2, '#7adcff', 2], [360, 220, WS(3, 9) - .2, '#ffd25a', 3], [150, 260, WS(3, 10), '#b48aff', 4], [560, 380, WS(3, 11) - .1, '#7aff9a', 5], [330, 330, WS(3, 11) + .4, '#ff8ad0', 6]];
    let fw = ''; b.forEach(([x, y, t0, c, sd]) => fw += fwBurst(x, y + 120, t0, t, c, sd, 140));
    s += `<g opacity="${k.toFixed(2)}">${n}${fw}</g>`;
  }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: wars stay with swords, spears and bows. The knight rules the field ----------
function battle(t, o = {}) {
  const sun = o.sunset || 0, r = RS(9);
  let s = `<defs>${GNDEF}<linearGradient id="btS${sun}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a8ac8', '#3a2a5a', sun)}"/><stop offset=".55" stop-color="${mix('#a8c8e4', '#e0784a', sun)}"/><stop offset="1" stop-color="${mix('#e8e4d4', '#ffc070', sun)}"/></linearGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="url(#btS${sun})"/>`;
  if (sun) s += `<circle cx="200" cy="690" r="170" fill="url(#sunW)" opacity=".8"/><circle cx="200" cy="690" r="44" fill="#fff0c8" opacity=".5" filter="url(#blur9)"/><circle cx="200" cy="690" r="24" fill="#fff8e0"/>`;
  else s += cumulus(200 + t * 3, 460, 260, 21, { a: .8 }) + cumulus(560 - t * 2, 400, 200, 22, { a: .7 });
  s += mountainsR(800, 110, 44, { rock: mix('#8a8a7a', '#4a3040', sun), snowAt: 0 });
  s += `<rect x="-20" y="790" width="760" height="520" fill="${mix('#7a8a4a', '#5a3a28', sun)}"/><rect x="-20" y="790" width="760" height="40" fill="${mix('#e8e4d4', '#f0a060', sun)}" opacity=".5" filter="url(#soft)"/>`;
  s += meadow(800, 1300, t);
  if (sun) s += `<rect x="-20" y="790" width="760" height="520" fill="#2a1420" opacity=".45"/>`;
  // banners and far ranks
  const far = (y, n, sc, sd, col) => { const q = RS(sd); let g = ''; for (let i = 0; i < n; i++) { const x = -10 + i * (760 / n) + q() * 10, k = sc * (.9 + q() * .2), lt = mix(col, '#c8ccd0', .35), sh = mix(col, ['#6a2a24', '#2a4a6a', '#6a5a2a'][i % 3], .5);
    g += `<path d="M${x - 4 * k},${y} L${x - 3 * k},${y - 22 * k} M${x + 4 * k},${y} L${x + 3 * k},${y - 22 * k}" stroke="${col}" stroke-width="${3.4 * k}"/><path d="M${x - 8 * k},${y - 20 * k} L${x - 7 * k},${y - 50 * k} Q${x},${y - 55 * k} ${x + 7 * k},${y - 50 * k} L${x + 8 * k},${y - 20 * k}Z" fill="${col}"/>` +
      `<circle cx="${x}" cy="${y - 60 * k}" r="${6 * k}" fill="${col}"/><path d="M${x - 7 * k},${y - 61 * k} Q${x},${y - 72 * k} ${x + 7 * k},${y - 61 * k}Z" fill="${lt}"/><path d="M${x + 9 * k},${y + 2 * k} L${x + 12 * k},${y - 110 * k}" stroke="${col}" stroke-width="${1.6 * k}"/><path d="M${x + 12 * k},${y - 110 * k} l-2,${8 * k} l4,0Z" fill="${lt}"/>` +
      `<ellipse cx="${x + 9 * k}" cy="${y - 34 * k}" rx="${8 * k}" ry="${12 * k}" fill="${sh}"/>`; } return g; };
  s += far(860, 46, .55, 3, sun ? '#2a1a20' : '#3a3a34') + far(900, 34, .75, 4, sun ? '#24161c' : '#2e2e2a');
  [[90, 760, '#8a2a24'], [300, 740, '#2a4a7a'], [620, 770, '#c8a040']].forEach(([x, y, c]) => { const w = Math.sin(t * 3 + x) * 6;
    s += `<path d="M${x},${y + 120} V${y}" stroke="#2a1a10" stroke-width="4"/><path d="M${x},${y} q30,${w} 60,0 q-10,22 0,46 q-30,${-w} -60,0Z" fill="${sun ? mix(c, '#000000', .5) : c}"/>`; });
  // flying arrows in the sky
  for (let i = 0; i < 9; i++) { const ph = pmod(t * .32 + i / 9, 1), x = lerp(-60, 800, ph) + r() * 40, y = 640 - Math.sin(ph * Math.PI) * 170 + r() * 110, an = Math.atan2(-Math.cos(ph * Math.PI) * 170 * Math.PI, 860) * 57.3;
    s += `<g transform="translate(${x.toFixed(0)},${y.toFixed(0)}) rotate(${an.toFixed(1)})" opacity=".85"><path d="M-22,0 H16" stroke="#3a2a1a" stroke-width="2.2"/><path d="M16,-3 l8,3 l-8,3Z" fill="#3a3e44"/><path d="M-22,0 l-6,-4 h8Z M-22,0 l-6,4 h8Z" fill="#e8e0d0"/></g>`; }
  // the front: spearmen, archers and the knight
  const ink = sun ? 1 : 0;
  let fr = spearman(80, 1080, .66, 1, t, 0, { ang: 4 }) + spearman(160, 1100, .7, 1, t, 1, { ang: 10 }) + archer(600, 1090, .7, -1, t, { draw: .5 + .5 * Math.sin(t * 2) }) + spearman(680, 1110, .7, -1, t, 2, { ang: -6 });
  fr += knight(360, 1160, 1.02, 1, t, { shield: 1, sword: -55 + 8 * Math.sin(t * 2), col: '#6a1a20', shc: '#1e3a6a' });
  if (ink) fr = `<g filter="url(#silF)">${fr}</g>`;
  s += fr;
  if (ink) s += `<defs><filter id="silF"><feFlood flood-color="#1c1018"/><feComposite in2="SourceAlpha" operator="in"/></filter></defs>`;
  return s;
}
function sceneBattle(t) { noEarth(); F.ov = ''; return battle(t); }
// people on the pavement watching the fireworks
function watchers(t) { let g = ''; [[80, 1066, 1, 0, .6], [150, 1092, -1, 1, .64], [455, 1072, 1, 2, .6], [540, 1096, -1, 3, .66], [640, 1068, -1, 4, .6]].forEach(([x, y, f, i, s]) => { g += hero(x, y, Object.assign({ s, face: f, shade: 1, lookUp: .9, aF: [.1, .3] }, gp(i))); }); return g; }
const GPAL = [{ top: '#2e4a6e', pants: '#2a2c34', skin: '#c89a74', hair: '#2a1d16' }, { top: '#8a3a2e', pants: '#3a3430', skin: '#8d5a3b', hair: '#17110d' }, { top: '#4e6a3a', pants: '#34302a', skin: '#e0b48a', hair: '#5a3a22' }, { top: '#6a5a7a', pants: '#2a2a30', skin: '#b07a55', hair: '#1d1612' },
  { top: '#c89a3a', pants: '#3a3a40', skin: '#a46a46', hair: '#1b1410' }, { top: '#3a6a6a', pants: '#2e2a26', skin: '#d8a882', hair: '#3a2a1c' }, { top: '#7a4a5a', pants: '#2a2c30', skin: '#c08a66', hair: '#241a12' }];
const gp = i => Object.assign({}, GPAL[i % GPAL.length]);
