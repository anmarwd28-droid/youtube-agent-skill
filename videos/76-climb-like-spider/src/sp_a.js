// sp_a.js (#76): what if you could climb walls like a spider? Built on the #75 chain (room, studio, mosquito helpers not needed).
const SPL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const SPD = `<linearGradient id="spSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac8"/><stop offset=".7" stop-color="#a8c8e8"/><stop offset="1" stop-color="#dfe8f0"/></linearGradient>
<linearGradient id="spGl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a5a7a"/><stop offset=".5" stop-color="#5a82a8"/><stop offset="1" stop-color="#2a4460"/></linearGradient>
<linearGradient id="spSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22364c"/><stop offset="1" stop-color="#3a5470"/></linearGradient>
<radialGradient id="spAb" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#4a3a30"/><stop offset=".6" stop-color="#1e1612"/><stop offset="1" stop-color="#0a0706"/></radialGradient>
<radialGradient id="spEye" cx=".35" cy=".3" r=".7"><stop offset="0" stop-color="#6a7a8a"/><stop offset=".35" stop-color="#1a1e24"/><stop offset="1" stop-color="#050608"/></radialGradient>
<radialGradient id="gkB" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#d8c090"/><stop offset="1" stop-color="#9a8050"/></radialGradient>
<linearGradient id="spWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8d2c6"/><stop offset="1" stop-color="#b8b0a2"/></linearGradient>
<linearGradient id="lobG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8d4e4" stop-opacity=".55"/><stop offset=".5" stop-color="#e8f4fa" stop-opacity=".35"/><stop offset="1" stop-color="#a8c8dc" stop-opacity=".55"/></linearGradient>`;
const SPDEFS = () => `${LDEFS()}${SPD}`;
// a jumping spider seen from above, head up; o.rot, o.t (palps move), o.walk phase, o.a
function spiderT(x, y, s, o = {}) {
  const a = o.a ?? 1; if (a <= 0) return ''; const w = o.walk || 0, r = RS(o.seed || 5);
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${o.rot || 0}) scale(${s})" opacity="${a.toFixed(2)}"><ellipse cx="6" cy="14" rx="70" ry="90" fill="#000" opacity=".22" filter="url(#blur16)"/>`;
  // legs: 4 per side; [attach y, base angle deg (0 = sideways), segment lengths]
  const LG = [[-34, -50, [34, 40, 30], 13], [-22, -18, [32, 36, 28], 10], [-10, 18, [32, 38, 30], 10], [2, 48, [36, 44, 34], 10]];
  [-1, 1].forEach(sd => LG.forEach(([ay, an, L, wd], i) => { const sw = Math.sin(w + i * 1.6 + (sd > 0 ? Math.PI : 0)) * 8;
    let px = sd * 22, py = ay, ang = (an + sw) * Math.PI / 180, d = `M${px},${py}`; const pts = [[px, py]];
    L.forEach((l, k) => { const bend = (k === 0 ? -30 : k === 1 ? 40 : 30) * Math.PI / 180 * (an < 0 ? -1 : 1) * (i === 0 ? .6 : 1); ang += k ? bend * .5 : 0; px += sd * Math.cos(ang) * l; py += Math.sin(ang) * l; pts.push([px, py]); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; });
    g += `<path d="${d}" stroke="#1a1310" stroke-width="${wd}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#5a4a3e" stroke-width="${wd * .35}" fill="none" opacity=".5"/>`;
    pts.slice(1).forEach(([qx, qy], k) => { g += `<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="${(wd * .55).toFixed(1)}" fill="#2a2018" opacity="1"/>`; });
    for (let k = 0; k < 10; k++) { const j = Math.floor(r() * 3), f = r(), qx = lerp(pts[j][0], pts[j + 1][0], f), qy = lerp(pts[j][1], pts[j + 1][1], f); g += `<path d="M${qx.toFixed(1)},${qy.toFixed(1)} l${(sd * (3 + r() * 5)).toFixed(1)},${(-2 + r() * 4).toFixed(1)}" stroke="#8a7a6a" stroke-width="1" opacity=".6"/>`; }
    const [ex, ey] = pts[3]; g += `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="${wd * .7}" ry="${wd * .5}" fill="#3a2e26"/>`; }));
  // abdomen with a white band and spots
  g += `<ellipse cx="0" cy="58" rx="40" ry="52" fill="url(#spAb)"/><path d="M-6,10 Q0,6 6,10 L5,100 Q0,106 -5,100Z" fill="#e8dcc4" opacity=".75"/><path d="M-36,40 Q-40,70 -22,100" stroke="#d8c8a8" stroke-width="5" fill="none" opacity=".55"/><path d="M36,40 Q40,70 22,100" stroke="#d8c8a8" stroke-width="5" fill="none" opacity=".55"/><path d="M-12,30 L0,38 L12,30" stroke="#8a7458" stroke-width="2.4" fill="none" opacity=".6"/><path d="M-14,46 L0,54 L14,46" stroke="#8a7458" stroke-width="2.4" fill="none" opacity=".6"/><path d="M-16,62 L0,70 L16,62" stroke="#8a7458" stroke-width="2.4" fill="none" opacity=".6"/><path d="M-18,78 L0,86 L18,78" stroke="#8a7458" stroke-width="2.4" fill="none" opacity=".6"/>`;
  // cephalothorax with the eye row
  g += `<ellipse cx="0" cy="-22" rx="34" ry="36" fill="url(#spAb)"/><path d="M-30,-40 Q0,-58 30,-40" stroke="#f0d070" stroke-width="3" fill="none" opacity=".5"/><path d="M-5,-40 L-4,0 L4,0 L5,-40Z" fill="#e8dcc4" opacity=".55"/><path d="M-32,-30 Q-36,-10 -26,6 M32,-30 Q36,-10 26,6" stroke="#d8c8a8" stroke-width="4" fill="none" opacity=".45"/>`;
  for (let k = 0; k < 140; k++) { const an = r() * 6.28, rr = Math.sqrt(r()), cx = Math.cos(an) * rr * 34, cy = (k < 70 ? -22 : 58) + Math.sin(an) * rr * (k < 70 ? 36 : 52); g += `<path d="M${cx.toFixed(1)},${cy.toFixed(1)} l${(r() * 4 - 2).toFixed(1)},${(2 + r() * 3).toFixed(1)}" stroke="${r() > .7 ? '#c8b8a0' : '#4a3a30'}" stroke-width=".9" opacity=".7"/>`; }
  g += `<circle cx="-12" cy="-52" r="9" fill="url(#spEye)"/><circle cx="12" cy="-52" r="9" fill="url(#spEye)"/><circle cx="-26" cy="-44" r="4.5" fill="url(#spEye)"/><circle cx="26" cy="-44" r="4.5" fill="url(#spEye)"/><circle cx="-22" cy="-20" r="3.5" fill="url(#spEye)"/><circle cx="22" cy="-20" r="3.5" fill="url(#spEye)"/>` +
    `<circle cx="-14" cy="-55" r="2.4" fill="#fff" opacity=".8"/><circle cx="10" cy="-55" r="2.4" fill="#fff" opacity=".8"/>`;
  // pedipalps and green-gold fangs (chelicerae)
  const pm = Math.sin((o.t || 0) * 5) * 3; g += `<path d="M-8,-58 l-6,${-12 + pm} M8,-58 l6,${-12 - pm}" stroke="#2a2018" stroke-width="7" stroke-linecap="round"/><ellipse cx="-14" cy="${-71 + pm}" rx="5" ry="4" fill="#e8e0d0"/><ellipse cx="14" cy="${-71 - pm}" rx="5" ry="4" fill="#e8e0d0"/>` +
    `<path d="M-6,-56 q-2,8 2,12 M6,-56 q2,8 -2,12" stroke="#3a8a7a" stroke-width="5" fill="none"/>`;
  return g + `</g>`;
}
// a gecko seen from above, head up, with broad toe pads
function gecko(x, y, s, t = 0, a = 1) { if (a <= 0) return ''; const w = Math.sin(t * 2) * .2;
  let g = `<g transform="translate(${x},${y}) scale(${s})" opacity="${a.toFixed(2)}"><ellipse cx="4" cy="20" rx="50" ry="120" fill="#000" opacity=".18" filter="url(#blur16)"/>`;
  g += `<path d="M0,60 C10,110 ${30 + w * 60},150 ${10 + w * 100},210 C${0 + w * 100},230 ${-8 + w * 60},200 -4,150 C-10,110 -10,80 -8,60Z" fill="#b89a68"/>`;
  const leg = (sx, sy, dx, dy, k) => { const kx = sx + dx * .5 + sx * .3, ky = sy + dy * .3; let p = `<path d="M${sx},${sy} Q${kx},${ky - 20 * k} ${sx + dx},${sy + dy}" stroke="#b89a68" stroke-width="12" fill="none" stroke-linecap="round"/>`;
    for (let i = -2; i <= 2; i++) { const an = Math.atan2(dy, dx) + i * .45, tx = sx + dx + Math.cos(an) * 20, ty = sy + dy + Math.sin(an) * 20; p += `<path d="M${sx + dx},${sy + dy} L${tx.toFixed(1)},${ty.toFixed(1)}" stroke="#b89a68" stroke-width="4"/><ellipse cx="${tx.toFixed(1)}" cy="${ty.toFixed(1)}" rx="5" ry="4" fill="#d8c090"/>`; }
    return p; };
  g += leg(-16, -30, -50, -40, 1) + leg(16, -30, 50, -40, 1) + leg(-16, 50, -50, 36, -1) + leg(16, 50, 50, 36, -1);
  g += `<ellipse cx="0" cy="10" rx="26" ry="60" fill="url(#gkB)"/><ellipse cx="0" cy="-62" rx="24" ry="28" fill="url(#gkB)"/><circle cx="-16" cy="-70" r="7" fill="#3a2a1a"/><circle cx="16" cy="-70" r="7" fill="#3a2a1a"/><circle cx="-18" cy="-72" r="2" fill="#fff" opacity=".7"/><circle cx="14" cy="-72" r="2" fill="#fff" opacity=".7"/>`;
  const r = RS(8); for (let i = 0; i < 26; i++) g += `<circle cx="${(r() * 40 - 20).toFixed(1)}" cy="${(-80 + r() * 150).toFixed(1)}" r="${(2 + r() * 3).toFixed(1)}" fill="#7a5a3a" opacity=".55"/>`;
  return g + `</g>`; }
// a glass skyscraper from a high viewpoint: front face from x0 to the right, panes scrolling with off; o.rain wet streaks
function tower(t, x0, off, o = {}) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#spSky)"/>`;
  const r = RS(3); for (let i = 0; i < 5; i++) { const cx = pmod(r() * 900 - t * 6, 900) - 90, cy = 420 + r() * 300; s += `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${70 + r() * 60}" ry="${18 + r() * 10}" fill="#fff" opacity=".55" filter="url(#blur9)"/>`; }
  // far city far below
  const cy0 = 1090 + off * .05; let k = 0; for (let x = -20; x < x0; x += 34) { const h = 80 + RS(k + 9)() * 150; k++; s += `<rect x="${x}" y="${(cy0 - h).toFixed(1)}" width="30" height="${h + 300}" fill="#8aa0b8" opacity=".55"/>`; }
  s += `<rect x="-20" y="${(cy0 - 40).toFixed(1)}" width="760" height="400" fill="#dfe8f0" opacity=".35" filter="url(#blur16)"/>`;
  // the side of the tower (narrow, darker) and the front face of glass panes
  s += `<path d="M${x0 - 46},-20 L${x0},-20 L${x0},1300 L${x0 - 46},1300Z" fill="url(#spSide)"/>`;
  s += `<rect x="${x0}" y="-20" width="${760 - x0}" height="1320" fill="url(#spGl)"/>`;
  const ph = 150, o0 = pmod(off, ph);
  for (let y = -ph + o0; y < 1300; y += ph) { s += `<rect x="${x0}" y="${y.toFixed(1)}" width="${760 - x0}" height="10" fill="#c8d4de"/><rect x="${x0}" y="${(y + 10).toFixed(1)}" width="${760 - x0}" height="6" fill="#000" opacity=".2"/>`; }
  for (let x = x0; x < 760; x += 110) s += `<rect x="${x}" y="-20" width="8" height="1320" fill="#b8c4ce"/>`;
  s += `<path d="M${x0 + 40},-20 L${x0 + 200},-20 L${x0 + 60},1300 L${x0 - 100},1300Z" fill="#fff" opacity=".08"/><path d="M${x0 + 240},-20 L${x0 + 270},-20 L${x0 + 130},1300 L${x0 + 100},1300Z" fill="#fff" opacity=".1"/>`;
  s += `<rect x="${x0 - 6}" y="-20" width="12" height="1320" fill="#d8e0e8"/>`;
  if (o.rain) { const rr = RS(11); for (let i = 0; i < 90; i++) { const x = rr() * 760, y = pmod(rr() * 1400 + t * 900, 1400) - 60; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l-6,34" stroke="#e8f0ff" stroke-width="1.6" opacity="${(.35 * o.rain).toFixed(2)}"/>`; }
    for (let i = 0; i < 26; i++) { const x = x0 + 10 + rr() * (740 - x0), y = pmod(rr() * 1300 + t * 120 * (1 + rr()), 1300); s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q2,30 -1,60" stroke="#e8f4ff" stroke-width="2.4" fill="none" opacity="${(.4 * o.rain).toFixed(2)}"/>`; }
    s += `<rect x="-20" y="-20" width="760" height="1320" fill="#3a4a5a" opacity="${(.25 * o.rain).toFixed(2)}"/>`; }
  return s; }
// the climber on the edge at wall x WX (facing right), climbing phase p, s scale, cy = hip height on screen
function climber(WX, cy, s, p, o = {}) { const a = Math.sin(p), b = Math.cos(p);
  const lF = [1.25 + .25 * a, .3 - .2 * a], lB = [1.0 - .25 * a, .12 + .2 * a];
  const dyL = l => 76 * Math.cos(l[0]) + 74 * Math.cos(l[1]), hip = -Math.max(dyL(lF), dyL(lB));
  const x = WX - 96 * s, y = cy - hip * s;
  const hF = o.hF || [WX - 4, cy - (250 + 40 * a) * s], hB = o.hB || [WX - 4, cy - (200 - 40 * a) * s];
  return hero(x, y, Object.assign({ s, face: 1, shade: 1, noShadow: 1, lF, lB, hipY: hip, lean: -6, hF, hB, lookUp: .5 }, gp(1), { top: '#e85a2a' }, o.h || {})); }
// ---------- 0: hook: you climb a glass skyscraper with your bare hands ----------
function sceneHook(t) {
  const off = t * 110, p = t * 3.2;
  let s = `<defs>${SPDEFS()}</defs>` + tower(t, 430, off);
  s += climber(430, 860, 1.05, p);
  s += spiderT(560, 560 - t * 20, .5, { walk: t * 6, t, rot: 4 });
  noEarth(); F.ov = ''; return s;
}
// ---------- 1a: up the tower, past the clouds ----------
function sceneUp(t) {
  const T = t - (S0(1) - .2), off = (t) * 110 + T * 60;
  let s = `<defs>${SPDEFS()}</defs>` + tower(t, 430, off);
  s += climber(430, 860, 1.05, t * 3.6);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1b: walking on the ceiling of a room ----------
function sceneCeil(t) {
  const T = t - (WS(1, 4) - .2);
  let s = `<defs>${SPDEFS()}</defs>` + room(t, { N: .1, id: 's1', hh: 8, mm: 5 });
  s += `<rect x="-20" y="360" width="760" height="40" fill="#e8e0d2"/><rect x="-20" y="396" width="760" height="10" fill="#000" opacity=".15"/><rect x="-20" y="360" width="760" height="40" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  s += `<path d="M300,400 v30" stroke="#3a3a3a" stroke-width="3"/><path d="M276,430 h48 l-10,26 h-28Z" fill="#f2e6c8"/><ellipse cx="300" cy="458" rx="40" ry="20" fill="#fff4c8" opacity=".35" filter="url(#blur9)"/>`;
  const x = 600 - T * 60;
  s += hero(x, 400, Object.assign({ s: 1.15, face: 1, shade: 1, rot: 180, walk: x / 30, noShadow: 1 }, gp(1), { top: '#e85a2a' }));
  // a friend below looking up, surprised
  s += hero(170, 1150, Object.assign({ s: 1.2, face: 1, shade: 1, lookUp: 1, aF: [.6, 1.6], aB: [-.2, .3] }, gp(0)));
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: the secret: thousands of fine hairs at the tips of the legs ----------
function sceneSpider(t) {
  const T = t - (S0(2) - .2), z = ease(ramp(t, WS(2, 3), WS(2, 5) + .3)), h = ease(ramp(t, WS(2, 5), WS(2, 7)));
  let s = `<defs>${SPDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  s += spiderT(360, 760 + Math.sin(T * .8) * 6, 2.6 - z * .4, { t, walk: Math.sin(T) * .3, seed: 7 });
  // a lens on the tip of the front right leg showing the hair tuft
  const tipx = 360 + 2.2 * 100, tipy = 760 - 2.2 * 92;
  const inner = `<rect x="300" y="760" width="420" height="440" fill="#cfc8ba"/><rect x="300" y="760" width="420" height="440" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
    `<path d="M560,760 C560,860 540,920 520,960" stroke="#1a1310" stroke-width="56" fill="none" stroke-linecap="round"/><path d="M560,760 C560,860 540,920 520,960" stroke="#5a4a3e" stroke-width="16" fill="none" opacity=".4"/>` +
    Array.from({ length: 60 }, (_, i) => { const a = -1.1 + i / 59 * 2.2, L = 60 + (i % 5) * 8; return `<path d="M520,968 q${(Math.sin(a) * L * .5).toFixed(1)},${(L * .3).toFixed(1)} ${(Math.sin(a) * L).toFixed(1)},${(Math.cos(a) * L * .8).toFixed(1)}" stroke="#2a2018" stroke-width="2" fill="none" opacity="${h.toFixed(2)}"/>`; }).join('') +
    `<rect x="300" y="1050" width="420" height="160" fill="#a8a092"/>`;
  s += lens(520, 980, 180, tipx, tipy, z, inner, 'lnS2') + SPL(520, 1205, 'آلافُ الشُّعيرات', h, '#f4c76b', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: each hair branches into smaller tips that stick by a weak pull between molecules ----------
function sceneHairs(t) {
  const T = t - (S0(3) - .2), br = ease(ramp(t, WS(3, 0), WS(3, 4))), zm = ease(ramp(t, WS(3, 7), WS(3, 8) + .2)), vw = ease(ramp(t, WS(3, 8), WS(3, 12)));
  let s = `<defs>${SPDEFS()}</defs>` + studio('stH', '#2c3a4a', '#080c14', 9);
  const wallY = 1060;
  if (zm < 1) { let g = `<rect x="-20" y="${wallY}" width="760" height="240" fill="#8a8478"/><rect x="-20" y="${wallY}" width="760" height="6" fill="#c8c0b0"/>`;
    // one hair from the top, branching three times into fine spatula tips at the wall
    const tree = (x, y, L, an, d) => { const ex = x + Math.sin(an) * L, ey = y + Math.cos(an) * L; const k = clamp(br * 3.2 - (3 - d)); if (k <= 0) return '';
      let p = `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${lerp(x, ex, k).toFixed(1)},${lerp(y, ey, k).toFixed(1)}" stroke="#3a2e26" stroke-width="${(d * 5 + 2).toFixed(1)}" stroke-linecap="round"/>`;
      if (d > 0) [-.45, 0, .45].forEach(da => p += tree(ex, ey, L * .62, an + da * (d === 3 ? .9 : .7), d - 1)); else p += `<path d="M${(ex - 7).toFixed(1)},${(ey + 2).toFixed(1)} h14" stroke="#5a4a3e" stroke-width="4" opacity="${k.toFixed(2)}"/>`;
      return p; };
    g += `<path d="M360,380 L360,560" stroke="#3a2e26" stroke-width="22" stroke-linecap="round"/>` + tree(360, 560, 220, 0, 3).replace(/^/, '');
    s += `<g opacity="${(1 - zm).toFixed(2)}">${g}${SPL(560, 520, 'شُعيرةٌ واحدة', ease(ramp(t, WS(3, 1), WS(3, 1) + .4)), '#fff', 26)}${SPL(560, 1010, 'أطرافٌ أصغر', br, '#f4c76b', 26)}</g>`; }
  if (zm > 0) { let g = `<rect x="-20" y="${wallY - 40}" width="760" height="280" fill="#3a3630"/>`;
    for (let i = 0; i < 18; i++) for (let j = 0; j < 4; j++) g += `<circle cx="${(i * 42 + (j % 2) * 21).toFixed(1)}" cy="${wallY - 20 + j * 36}" r="16" fill="#8a8478"/><circle cx="${(i * 42 + (j % 2) * 21 - 5).toFixed(1)}" cy="${wallY - 25 + j * 36}" r="5" fill="#fff" opacity=".25"/>`;
    [140, 360, 580].forEach((x, i) => { g += `<path d="M${x},440 C${x},700 ${x + 10},860 ${x},${wallY - 80}" stroke="#3a2e26" stroke-width="22" fill="none"/><path d="M${x - 60},${wallY - 60} L${x + 60},${wallY - 60} L${x + 14},${wallY - 100} L${x - 14},${wallY - 100}Z" fill="#4a3a30"/>`;
      for (let k = 0; k < 4; k++) { const xx = x - 45 + k * 30, ph = pmod(T * 1.4 + k * .25 + i * .3, 1); g += `<path d="M${xx},${wallY - 56} L${xx},${wallY - 38}" stroke="#7ad8ff" stroke-width="3" stroke-dasharray="3 4" opacity="${(vw * (.4 + .6 * ph)).toFixed(2)}"/>`; } });
    s += `<g opacity="${zm.toFixed(2)}">${g}${SPL(360, 1220, 'جذبٌ ضعيفٌ بينَ الجزيئات', vw, '#7ad8ff', 30)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: together they hold 170 times the spider's weight ----------
function sceneHold(t) {
  const T = t - (S0(4) - .2), n = ease(ramp(t, WS(4, 3), WS(4, 9)));
  let s = `<defs>${SPDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  s += `<rect x="-20" y="380" width="760" height="60" fill="#e8e2d6"/><rect x="-20" y="436" width="760" height="8" fill="#000" opacity=".15"/>`;
  s += spiderT(360, 520, 1.0, { t, rot: 180, seed: 7 });
  // a thread down to a tray holding 170 spider-weights (small dark dots, each one spider)
  s += `<path d="M360,600 L360,720" stroke="#eee" stroke-width="2"/><path d="M200,730 L520,730 L500,760 L220,760Z" fill="#6a5a48"/><path d="M360,720 L200,730 M360,720 L520,730" stroke="#ddd" stroke-width="1.5"/>`;
  const N = Math.round(170 * n); for (let i = 0; i < N; i++) { const cx = 230 + (i % 17) * 16.5, cy = 722 - Math.floor(i / 17) * 16; s += `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="6" fill="#2a2018"/><ellipse cx="${cx - 2}" cy="${cy - 2}" rx="2" ry="1.5" fill="#fff" opacity=".3"/>`; }
  s += `<g opacity="${n.toFixed(2)}">${panel(150, 1060, 420, 130)}${SPL(360, 1130, '× ' + arMQ(Math.round(170 * n)), 1, '#f4c76b', 48)}${SPL(360, 1172, 'من وزنِ العنكبوت', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: but you are millions of times heavier: a balance ----------
function sceneScale(t) {
  const T = t - (S0(5) - .2), tip = ease(ramp(t, WS(5, 4), WS(5, 6) + .3)), lab = ease(ramp(t, WS(5, 8), WS(5, 9) + .3));
  let s = `<defs>${SPDEFS()}</defs>` + studio('stB', '#34405a', '#0a0e1a', 4);
  const ang = 14 * tip, cx = 360, cy = 760, L = 260, ca = Math.cos(ang * Math.PI / 180), sa = Math.sin(ang * Math.PI / 180);
  const P = d => [cx + d * L * ca, cy + d * L * sa];
  s += `<path d="M${cx},${cy} L${cx - 40},1100 L${cx + 40},1100Z" fill="#8a7a5a"/><rect x="${cx - 90}" y="1100" width="180" height="20" rx="6" fill="#6a5a40"/>`;
  s += `<path d="M${P(-1)[0]},${P(-1)[1]} L${P(1)[0]},${P(1)[1]}" stroke="#c8a860" stroke-width="12" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="14" fill="#e0c070"/>`;
  [-1, 1].forEach(d => { const [px, py] = P(d); s += `<path d="M${px},${py} L${px - 90},${py + 170} M${px},${py} L${px + 90},${py + 170}" stroke="#c8c0a8" stroke-width="2"/><path d="M${px - 100},${py + 170} L${px + 100},${py + 170} Q${px},${py + 210} ${px - 100},${py + 170}Z" fill="#b89850"/>`; });
  const [hx, hy] = P(1), [sx, sy] = P(-1);
  s += hero(hx, hy + 172, Object.assign({ s: .8, face: -1, shade: 1, noShadow: 1 }, gp(1), { top: '#e85a2a' }));
  s += spiderT(sx, sy + 162, .1, { t, seed: 7 });
  s += SPL(sx, sy + 240, '١٥ ملّيغراماً', 1, '#fff', 24) + SPL(hx, hy + 240, '٧٠ كيلوغراماً', 1, '#fff', 24);
  s += `<g opacity="${lab.toFixed(2)}">${panel(160, 440, 400, 110)}${SPL(360, 510, '≈ ٥ ملايين مرّة', 1, '#f4c76b', 40)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: square-cube: twice as tall → 4x the skin, 8x the weight ----------
function cubeI(x, y, e, col, a = 1) { const d = e * .45; return `<g opacity="${a.toFixed(2)}"><path d="M${x},${y} h${e} v${-e} h${-e}Z" fill="${col}"/><path d="M${x},${y - e} l${d},${-d * .7} h${e} l${-d},${d * .7}Z" fill="#fff" opacity=".35"/><path d="M${x},${y - e} l${d},${-d * .7} h${e} l${-d},${d * .7}Z" fill="${col}" opacity=".6"/><path d="M${x + e},${y} l${d},${-d * .7} v${-e} l${-d},${d * .7}Z" fill="#000" opacity=".3"/><path d="M${x + e},${y} l${d},${-d * .7} v${-e} l${-d},${d * .7}Z" fill="${col}" opacity=".55"/></g>`; }
function sceneCube(t) {
  const T = t - (S0(6) - .2), g2 = ease(ramp(t, WS(6, 1), WS(6, 2) + .4)), ws = ease(ramp(t, WS(6, 3), WS(6, 5))), sk = ease(ramp(t, WS(6, 7), WS(6, 9)));
  let s = `<defs>${SPDEFS()}</defs>` + studio('stC', '#2c3448', '#080b14', 6);
  s += cubeI(110, 900, 110, '#5a8ac8') + SPL(165, 960, '×١', 1, '#fff', 30);
  s += cubeI(330, 1000, 220 * (.5 + .5 * g2), '#e0a040', g2) + SPL(440, 1060, 'الطولُ ×٢', g2, '#fff', 30);
  s += `<g opacity="${ws.toFixed(2)}">${panel(380, 440, 300, 90)}${SPL(530, 500, 'الوزن ×٨', 1, '#ff9a8a', 36)}</g>`;
  s += `<g opacity="${sk.toFixed(2)}">${panel(40, 440, 300, 90)}${SPL(190, 500, 'الجلد ×٤ فقط', 1, '#7ad8ff', 36)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: you would need sticky pads over 40 % of your body… or shoes of size 145 ----------
function shoeB(x, y, Lp) { const h = Lp * .32; return `<g><ellipse cx="${x + Lp * .5}" cy="${y + 4}" rx="${Lp * .55}" ry="10" fill="#000" opacity=".3" filter="url(#blur2)"/><path d="M${x},${y} L${x + Lp},${y} Q${x + Lp + 10},${y - h * .5} ${x + Lp * .8},${y - h * .6} L${x + Lp * .45},${y - h * .7} L${x + Lp * .3},${y - h * 1.2} L${x + 10},${y - h * 1.2} Q${x - 6},${y - h * .5} ${x},${y}Z" fill="#c83a2a"/>` +
  `<path d="M${x},${y} L${x + Lp},${y}" stroke="#f2f2ea" stroke-width="${(h * .18).toFixed(1)}"/><path d="M${x + Lp * .3},${y - h * 1.16} L${x + 10},${y - h * 1.16}" stroke="#2a2a2a" stroke-width="6"/>` + [0, 1, 2, 3].map(i => `<path d="M${x + Lp * (.5 + i * .07)},${y - h * .66} l-10,-14" stroke="#fff" stroke-width="3"/>`).join('') + `</g>`; }
function scenePads(t) {
  const T = t - (S0(7) - .2), pd = ease(ramp(t, WS(7, 2), WS(7, 8) + .3)), sh = ease(ramp(t, WS(7, 9), WS(7, 11) + .3));
  let s = `<defs>${SPDEFS()}</defs>` + studio('stP', '#2c3a48', '#080c14', 12);
  const x = lerp(360, 200, sh), y = 1150, sc = 1.35;
  s += hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, aF: [.15, .3], aB: [-.1, .25] }, gp(1), { top: '#e85a2a' }));
  const H = Object.assign({}, HP);
  // gold sticky patches on the front of the body, arms and legs
  if (pd > 0) { const [chx, chy] = H.chest, [hpx, hpy] = H.hip;
    s += `<g opacity="${(pd * .8).toFixed(2)}">` + hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, aF: [.15, .3], aB: [-.1, .25], noShadow: 1 }, gp(1), { top: '#e8b84a', pants: '#d0a038' })) + `</g>`;
    HP = H; for (let i = 0; i < 60; i++) { const r = RS(i + 2), px = lerp(chx - 20, hpx + 20, r()), py = lerp(chy - 40, H.footF[1] - 20, r()); s += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="1.6" fill="#fff" opacity="${(pd * .7 * r()).toFixed(2)}"/>`; } }
  s += `<g opacity="${(pd * clamp(1 - sh * 2)).toFixed(2)}">${panel(380, 460, 300, 100)}${SPL(530, 526, '٤٠٪ من جسمِك', 1, '#f4c76b', 36)}</g>`;
  // size 145 shoe: about 97 cm long (Paris point 2/3 cm) next to a 1.75 m person
  if (sh > 0) { const ppm = 330 * sc / 1.75 / 100 * .985; s += `<g opacity="${sh.toFixed(2)}">${shoeB(330, y, 97 * ppm)}</g><g opacity="${clamp(sh * 2 - 1).toFixed(2)}">${panel(330, 460, 360, 120)}${SPL(510, 520, 'مقاس ١٤٥', 1, '#f4c76b', 40)}${SPL(510, 560, 'طولُه نحوَ متر', 1, '#fff', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: dust and water weaken the grip: you slip halfway up ----------
function sceneSlip(t) {
  const T = t - (S0(8) - .2), rn = ease(ramp(t, WS(8, 1) - .3, WS(8, 1) + .3)), sl = ramp(t, WS(8, 5), WS(8, 5) + .5), sle = ease(sl) * (1 - ease(ramp(t, WS(8, 8), WS(8, 8) + .6)) * .3);
  let s = `<defs>${SPDEFS()}</defs>` + tower(t, 430, 2000 + T * 30 - sle * 260, { rain: rn });
  const cy = 760 + sle * 140, p = 2 + T * (sl > 0 ? 0 : 2);
  s += climber(430, cy, 1.05, p, sl > 0 && sl < 1 ? { hF: [470, cy - 230], hB: [300, cy - 180] } : {});
  if (sl > 0 && sl < 1) for (let i = 0; i < 4; i++) s += `<path d="M${360 + i * 20},${cy - 300 - i * 10} v-60" stroke="#fff" stroke-width="3" opacity="${(.6 * (1 - sl)).toFixed(2)}"/>`;
  // dust on the palms
  { const dk = ease(ramp(t, WS(8, 0), WS(8, 0) + .4)) * (1 - rn * .5); const r = RS(4); for (let i = 0; i < 24; i++) s += `<circle cx="${(HP.hand[0] + r() * 30 - 15).toFixed(1)}" cy="${(HP.hand[1] + r() * 30 - 15).toFixed(1)}" r="${(1 + r() * 2).toFixed(1)}" fill="#c8b89a" opacity="${(dk * .8).toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the twist: gecko-like pads; a man climbed a glass wall with them (Stanford, 2014) ----------
function sceneGecko(t) {
  const T = t - (S0(9) - .2), gk = ease(ramp(t, WS(9, 1), WS(9, 2) + .4)) * (1 - ease(ramp(t, WS(9, 7) - .7, WS(9, 7) - .25))), cl = ease(ramp(t, WS(9, 7) - .25, WS(9, 7) + .2));
  let s = `<defs>${SPDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#dfe6ea"/>`;
  // a lobby: a tall glass wall in steel frames
  s += `<rect x="-20" y="380" width="760" height="760" fill="#b8c8d4"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${20 + i * 180}" y="380" width="170" height="760" fill="url(#lobG)"/><rect x="${14 + i * 180}" y="380" width="8" height="760" fill="#6a7682"/>`;
  s += `<path d="M60,380 L200,380 L90,1140 L-50,1140Z" fill="#fff" opacity=".18"/><path d="M420,380 L470,380 L360,1140 L310,1140Z" fill="#fff" opacity=".2"/><rect x="-20" y="1140" width="760" height="180" fill="#8a8e92"/><rect x="-20" y="1140" width="760" height="10" fill="#000" opacity=".2"/>`;
  s += `<g opacity="${gk.toFixed(2)}">${gecko(360, 760 - T * 18, 1.8, t)}${SPL(360, 1090, 'أقدامُ الوزَغ', 1, '#2a3a4a', 30).replace('stroke="#000"', 'stroke="#fff"')}</g>`;
  if (cl > 0) { const T2 = t - WS(9, 7), up = T2 * 34, cy = 900 - up, p = T2 * 2.4;
    // the climber faces the glass (seen from behind): a body against the wall, hands on two grey pads
    const hx1 = 300, hx2 = 420, hy1 = cy - 230 - 20 * Math.sin(p), hy2 = cy - 230 + 20 * Math.sin(p);
    let c = `<rect x="${hx1 - 34}" y="${hy1 - 34}" width="68" height="68" rx="8" fill="#5a6470"/><rect x="${hx2 - 34}" y="${hy2 - 34}" width="68" height="68" rx="8" fill="#5a6470"/><rect x="${hx1 - 30}" y="${hy1 - 30}" width="60" height="60" rx="6" fill="#8a96a2" opacity=".6"/><rect x="${hx2 - 30}" y="${hy2 - 30}" width="60" height="60" rx="6" fill="#8a96a2" opacity=".6"/>`;
    c += `<path d="M${hx1},${hy1 + 10} L330,${cy - 150} M${hx2},${hy2 + 10} L390,${cy - 150}" stroke="#e85a2a" stroke-width="26" stroke-linecap="round"/><circle cx="${hx1}" cy="${hy1 + 10}" r="12" fill="#c8906a"/><circle cx="${hx2}" cy="${hy2 + 10}" r="12" fill="#c8906a"/>`;
    c += `<path d="M320,${cy - 160} Q360,${cy - 176} 400,${cy - 160} L410,${cy - 10} L310,${cy - 10}Z" fill="#e85a2a"/><path d="M320,${cy - 160} Q360,${cy - 176} 400,${cy - 160} L410,${cy - 10} L310,${cy - 10}Z" fill="url(#torsoSh)" opacity=".6"/>`;
    c += `<ellipse cx="360" cy="${cy - 200}" rx="26" ry="30" fill="#2a1a12"/><path d="M336,${cy - 190} q24,14 48,0" stroke="#c8906a" stroke-width="10" fill="none"/>`;
    c += `<path d="M330,${cy - 14} L310,${cy + 120 + 20 * Math.sin(p)} M390,${cy - 14} L410,${cy + 120 - 20 * Math.sin(p)}" stroke="#2a3040" stroke-width="30" stroke-linecap="round"/><rect x="282" y="${cy + 116 + 20 * Math.sin(p)}" width="56" height="20" rx="4" fill="#5a6470"/><rect x="382" y="${cy + 116 - 20 * Math.sin(p)}" width="56" height="20" rx="4" fill="#5a6470"/>`;
    s += `<g opacity="${cl.toFixed(2)}">${c}${panel(450, 430, 250, 100)}${SPL(575, 474, 'ستانفورد ٢٠١٤', 1, '#f4c76b', 28)}${SPL(575, 510, 'جدارٌ من الزجاج', 1, '#fff', 22)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8) - .3, WS(10, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneUp }, { s: WS(1, 4) - .2, f: sceneCeil }, { s: S0(2) - .2, f: sceneSpider }, { s: S0(3) - .2, f: sceneHairs }, { s: S0(4) - .2, f: sceneHold },
  { s: S0(5) - .2, f: sceneScale }, { s: S0(6) - .2, f: sceneCube }, { s: S0(7) - .2, f: scenePads }, { s: S0(8) - .2, f: sceneSlip }, { s: S0(9) - .2, f: sceneGecko }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHairs, sceneScale, sceneCube, scenePads]);
const XF = .5;
const TLI = [['الشُّعيرات', S0(2)], ['الجزيئات', S0(3)], ['×١٧٠', S0(4)], ['وزنُك', S0(5)], ['الجلد', S0(6)], ['الوسائد', S0(7)]];
const LIST_ON = new Set([sceneHold]);
const CHIPS = [
  ['c0', 'مثلَ العنكبوت', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c1', 'بلا مصعد', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', 'شُعيراتٌ دقيقة', 360, 330, 'big', WS(2, 6), S0(3) - .3],
  ['c3', 'جذبٌ بينَ الجزيئات', 360, 330, 'big', WS(3, 8), S0(4) - .3],
  ['c4', '× ١٧٠ من وزنه', 360, 330, 'big', WS(4, 7), S0(5) - .3],
  ['c5', 'أثقلُ بملايينِ المرّات', 360, 330, 'red big', WS(5, 8), S0(6) - .3],
  ['c6', 'الوزنُ يسبقُ الجلد', 360, 330, 'big', WS(6, 3), S0(7) - .3],
  ['c7', '٤٠٪ من جسمِك', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c8', 'خطرُ الانزلاق', 360, 330, 'red big', WS(8, 5), S0(9) - .3],
  ['c9', 'حدثَ فعلاً!', 360, 330, 'big', WS(9, 7), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">مثلَ العنكبوت</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
