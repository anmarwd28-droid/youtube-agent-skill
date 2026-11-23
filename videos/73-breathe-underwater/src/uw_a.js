// uw_a.js (#73): what if you could breathe underwater? Uses mx_help.js (corals, deepG/rayG), pl_help.js (lungs), oe_help.js (studio), gn_a.js (glE).
const UL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arN = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace('.', '٫');
const UDEF = `<linearGradient id="uwS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#46b4c8"/><stop offset=".45" stop-color="#1c739a"/><stop offset="1" stop-color="#0c3c5e"/></linearGradient>` +
  `<linearGradient id="uwD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#155478"/><stop offset=".55" stop-color="#0a2c4a"/><stop offset="1" stop-color="#030c18"/></linearGradient>` +
  `<linearGradient id="skyU" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f8fd0"/><stop offset=".7" stop-color="#a6cde8"/><stop offset="1" stop-color="#e4eef2"/></linearGradient>` +
  `<linearGradient id="fishSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".38"/><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset=".75" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#fff" stop-opacity=".45"/></linearGradient>` +
  `<linearGradient id="sandU" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b48c"/><stop offset="1" stop-color="#7e6c50"/></linearGradient>` +
  `<linearGradient id="jarG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".18" stop-color="#fff" stop-opacity=".06"/><stop offset=".8" stop-color="#fff" stop-opacity=".04"/><stop offset="1" stop-color="#fff" stop-opacity=".22"/></linearGradient>` +
  `<linearGradient id="waterJ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4aa8d8" stop-opacity=".75"/><stop offset="1" stop-color="#155a8a" stop-opacity=".9"/></linearGradient>` +
  `<radialGradient id="warmG"><stop offset="0" stop-color="#ffb060" stop-opacity=".55"/><stop offset=".6" stop-color="#ff7a30" stop-opacity=".18"/><stop offset="1" stop-color="#ff7a30" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="bioG"><stop offset="0" stop-color="#c8fff6" stop-opacity=".95"/><stop offset=".35" stop-color="#5ae8e0" stop-opacity=".45"/><stop offset="1" stop-color="#2ab0d8" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="embG" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#f8d2c4"/><stop offset=".65" stop-color="#e8a898"/><stop offset="1" stop-color="#c07868"/></radialGradient>` +
  `<radialGradient id="sacG" cx=".5" cy=".45" r=".55"><stop offset="0" stop-color="#ffd8d0" stop-opacity=".14"/><stop offset=".85" stop-color="#ff9a9a" stop-opacity=".08"/><stop offset="1" stop-color="#ffc0c0" stop-opacity=".3"/></radialGradient>` +
  `<linearGradient id="wLung" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ac8f0"/><stop offset="1" stop-color="#1a6aa8"/></linearGradient>`;
const UDEFS = () => `${LDEFS()}${MDEF}${PDEF}${UDEF}`;

// ---------- underwater background: water gradient, light shafts from the surface, sand, corals, kelp, marine snow ----------
function kelp(x, y, h, t, ph, col = '#3e7a48') {
  let d = `M${x},${y}`, lv = ''; const n = 9;
  for (let i = 1; i <= n; i++) { const yy = y - h * i / n, xx = x + Math.sin(t * 1.1 + ph + i * .55) * i * 3.4; d += ` L${xx.toFixed(1)},${yy.toFixed(1)}`;
    if (i > 1) lv += `<ellipse cx="${(xx + (i % 2 ? 14 : -14)).toFixed(1)}" cy="${yy.toFixed(1)}" rx="18" ry="6" fill="${col}" transform="rotate(${i % 2 ? -30 : 30},${(xx + (i % 2 ? 14 : -14)).toFixed(1)},${yy.toFixed(1)})"/>`; }
  return `<path d="${d}" stroke="${mix(col, '#000000', .3)}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="${col}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + lv;
}
function snow(t, n, a, seed = 3, sp = 10) { if (a <= 0) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = pmod(r() * 760 + Math.sin(t * .3 + i) * 14, 760) - 20, y = pmod(r() * 1320 + t * sp * (.6 + r() * .8), 1320) - 20; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.2 + r() * 2).toFixed(1)}" fill="#e8f6ff" opacity="${(a * (.15 + r() * .3)).toFixed(2)}"/>`; }
  return s; }
function uwBg(t, o = {}) {
  const g = o.g || 'uwS', fl = o.floor ?? 1110, ry = o.rays ?? 1;
  let s = `<rect x="-200" y="-200" width="1120" height="1700" fill="url(#${g})"/>`;
  if (ry > 0) for (let i = 0; i < 7; i++) { const x = -60 + i * 125 + Math.sin(t * .45 + i * 1.7) * 26; s += `<path d="M${x.toFixed(1)},-20 L${(x + 64).toFixed(1)},-20 L${(x + 240).toFixed(1)},${fl} L${(x - 70).toFixed(1)},${fl}Z" fill="url(#rayG)" opacity="${(ry * (.55 + .45 * Math.sin(t * .7 + i * 2.3) ** 2)).toFixed(2)}"/>`; }
  if (fl < 1300) {
    s += `<path d="M-20,${fl - 40} Q120,${fl - 110} 260,${fl - 50} T560,${fl - 70} T760,${fl - 40} L760,${fl + 20} L-20,${fl + 20}Z" fill="#0e3a5a" opacity=".55"/>`;
    s += `<path d="M-20,${fl} Q200,${fl - 34} 380,${fl - 8} T740,${fl - 18} L740,1300 L-20,1300Z" fill="url(#sandU)"/><path d="M-20,${fl} Q200,${fl - 34} 380,${fl - 8} T740,${fl - 18} L740,1300 L-20,1300Z" fill="#000" filter="url(#grainS)" opacity=".3"/>`;
    for (let i = 0; i < 9; i++) { const y = fl + 30 + i * 24, ph = t * .9 + i; let p = `M-20,${y}`; for (let x = 0; x <= 760; x += 40) p += ` Q${x - 20},${(y + Math.sin(ph + x * .03) * 8).toFixed(1)} ${x},${(y + Math.sin(ph + x * .02 + 1) * 5).toFixed(1)}`; s += `<path d="${p}" stroke="#fff6d8" stroke-width="2" fill="none" opacity="${(.16 * ry).toFixed(2)}"/>`; }
    if (o.coral !== 0) s += kelp(40, fl + 6, 300, t, 0) + kelp(84, fl + 10, 220, t, 2, '#4a8a50') + seaFan(170, fl + 4, 190, 3, '#b0486a') + brainC(300, fl + 16, 90, 64, 7, '#c89a5a', '#7a5a2a') + branchC(470, fl + 12, 250, 11, '#d88aa0', '#7a3a4a') +
      brainC(590, fl + 26, 80, 54, 19, '#9a8ab8', '#4a3a6a') + kelp(680, fl + 8, 330, t, 4) + branchC(640, fl + 20, 180, 13, '#e0a86a', '#7a4a1a');
  }
  s += snow(t, o.snowN ?? 70, o.snow ?? .9, o.seed || 3);
  if (o.dk) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#020a16" opacity="${o.dk.toFixed(2)}"/>`;
  return s;
}
// ---------- a fish (side view), facing +x when f = 1; tail wags ----------
function fishA(x, y, s, f, col, t, ph = 0, stripe) {
  const w = Math.sin(t * 9 + ph) * 8, B = 'M42,0 C40,-20 10,-26 -10,-22 C-30,-18 -40,-6 -42,0 C-40,6 -30,18 -10,22 C10,26 40,20 42,0Z';
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(f * s).toFixed(3)},${s})"><path d="M-36,0 L-62,${(-19 + w).toFixed(1)} L-55,0 L-62,${(19 + w).toFixed(1)}Z" fill="${mix(col, '#000000', .15)}"/>` +
    `<path d="M-14,-20 Q-2,-38 16,-22Z" fill="${mix(col, '#000000', .2)}"/><path d="M-10,20 Q0,32 10,21Z" fill="${mix(col, '#000000', .2)}"/><path d="${B}" fill="${col}"/>` +
    (stripe ? `<path d="M2,-24 Q-6,0 2,24" stroke="${stripe}" stroke-width="7" fill="none" opacity=".85"/><path d="M-22,-19 Q-28,0 -22,19" stroke="${stripe}" stroke-width="5" fill="none" opacity=".8"/>` : '') +
    `<path d="${B}" fill="url(#fishSh)"/><path d="M22,-13 q-7,13 0,26" stroke="#000" stroke-opacity=".3" stroke-width="2" fill="none"/><path d="M12,6 q-14,10 -22,5 q8,-7 22,-5Z" fill="#fff" opacity=".3"/>` +
    `<circle cx="30" cy="-5" r="4.6" fill="#fff"/><circle cx="31.2" cy="-5" r="2.7" fill="#111"/><circle cx="32" cy="-6" r=".9" fill="#fff"/></g>`;
}
// a school crossing the frame: centre moves at v px/s from x0 (wraps), each fish keeps its own offset
function school(t, o) { const r = RS(o.seed || 1); let s = '';
  for (let i = 0; i < o.n; i++) { const ox = (r() - .5) * o.w, oy = (r() - .5) * o.h, x = pmod(o.x0 + o.v * t + ox + 400, 1300) - 400, y = o.y + oy + Math.sin(t * 1.6 + i) * 6;
    s += fishA(x, y, o.s * (.8 + r() * .4), o.v > 0 ? 1 : -1, o.col, t, i * 1.3, o.stripe); }
  return s; }
// ---------- you swimming: the house person turned horizontal around the hip (hip at x, y), kicking, arms reaching forward ----------
function swimmer(x, y, s, t, o = {}) {
  const f = o.face || 1, p = t * (o.kr || 7), k = o.kick ?? .24, gl = Math.sin(p * .5);
  const lF = [k * Math.sin(p), k * Math.sin(p) - .14], lB = [-k * Math.sin(p), -k * Math.sin(p) - .14];
  const aF = o.aF || [Math.PI - .25 + .22 * gl, Math.PI - .12 + .18 * gl], aB = o.aB || [Math.PI - .2 - .22 * gl, Math.PI - .1 - .16 * gl];
  return hero(x, y + 150 * s, Object.assign({ s, face: f, rot: (o.rot ?? 84) * f, pv: -150 * s, noShadow: 1, shade: 1, lF, lB, aF, aB, lookUp: o.look ?? .3 }, gp(1), { top: '#e85a2a' }, o.h || {}));
}
const tintU = (y0, a, col = '#0a4a7a') => `<rect x="-20" y="${y0}" width="760" height="${1320 - y0}" fill="${col}" opacity="${a.toFixed(2)}"/>`;
// small bubbles rising from (x, y) between t0 and t1
function bubbles(t, x, y, t0, t1, n, seed = 1, spread = 60) { if (t < t0 || t > t1 + 2) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const st = t0 + r() * (t1 - t0), k = t - st; if (k < 0 || k > 2.2) continue; const rr = 3 + r() * 7, bx = x + (r() - .5) * spread + Math.sin(k * 6 + i) * 6, by = y - k * (120 + r() * 120);
    s += `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${rr.toFixed(1)}" fill="#dff4ff" fill-opacity=".18" stroke="#eaf8ff" stroke-width="1.6" opacity="${(1 - k / 2.2).toFixed(2)}"/><circle cx="${(bx - rr * .35).toFixed(1)}" cy="${(by - rr * .35).toFixed(1)}" r="${(rr * .25).toFixed(1)}" fill="#fff" opacity="${(.8 * (1 - k / 2.2)).toFixed(2)}"/>`; }
  return s; }

// ---------- 0: hook: you glide over a reef with no mask and no tank ----------
function sceneHook(t) {
  let s = `<defs>${UDEFS()}</defs>` + uwBg(t, { floor: 1120, rays: 1 });
  s += school(t, { n: 9, x0: 820, v: -60, y: 560, w: 260, h: 120, s: .7, col: '#f2c440', stripe: '#1a2a3a', seed: 4 });
  s += school(t, { n: 14, x0: 900, v: -95, y: 700, w: 420, h: 220, s: .55, col: '#c8d8e0', seed: 15 });
  s += swimmer(270 + t * 42, 790, 1.15, t, { look: .35 }) + tintU(-20, .14);
  s += school(t, { n: 4, x0: 300, v: 34, y: 1010, w: 220, h: 50, s: .9, col: '#4aa0d8', seed: 9 });
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: you jump from a jetty and stay down for hours, no snorkel, no tank ----------
function jetty() { let s = '';
  [40, 130, 210].forEach(x => { s += `<rect x="${x - 9}" y="540" width="18" height="300" fill="#5a3e28"/><rect x="${x - 9}" y="540" width="6" height="300" fill="#000" opacity=".25"/><rect x="${x - 9}" y="610" width="18" height="230" fill="#2a5a5a" opacity=".45"/>`; });
  s += `<rect x="-20" y="526" width="252" height="20" fill="#8a6440"/><rect x="-20" y="526" width="252" height="4" fill="#c8a070"/><rect x="-20" y="542" width="252" height="6" fill="#000" opacity=".3"/>`;
  for (let x = 10; x < 232; x += 34) s += `<path d="M${x},527 v18" stroke="#5a3e28" stroke-width="2"/>`;
  return s; }
function sceneDive(t) {
  const SY = 600, tj = WS(1, 0), sc = .85, u = clamp((t - tj) / .62), tu = t - tj - .62;
  let s = `<defs>${UDEFS()}</defs>` + uwBg(t, { floor: 1210, rays: .8, snowN: 50 });
  s += `<rect x="-20" y="-20" width="760" height="${SY + 20}" fill="url(#skyU)"/><circle cx="560" cy="300" r="120" fill="#fff6d8" opacity=".25" filter="url(#blur16)"/><circle cx="560" cy="300" r="34" fill="#fffbe8"/>`;
  s += `<path d="M380,${SY} Q440,${SY - 34} 520,${SY - 26} Q600,${SY - 48} 690,${SY - 12} L700,${SY}Z" fill="#5a7a6a" opacity=".7"/><path d="M-20,${SY} Q60,${SY - 14} 140,${SY - 6} L160,${SY}Z" fill="#6a8a78" opacity=".5"/>`;
  s += jetty();
  let hx, hy, rot = 0, h = {}, sw = 0;
  if (t < tj) { const cr = ease(ramp(t, tj - .45, tj)); hx = 180; hy = 526 - 150 * sc; h = { lF: [.35 * cr, -.25 * cr], lB: [-.05 + .3 * cr, -.4 * cr], aF: [-.5 * cr, -.2 * cr], aB: [-.6 * cr, -.3 * cr], lean: 12 * cr }; }
  else if (u < 1) { hx = 180 + 170 * u; hy = lerp(526, SY + 60, u) - 150 * sc - 150 * 4 * u * (1 - u); h = { lF: [.02, 0], lB: [-.02, 0], aF: [Math.PI - .12, Math.PI - .05], aB: [Math.PI - .08, Math.PI - .02], air: 1 }; }
  else { const sink = 1 - Math.exp(-tu * 1.4); sw = ease(clamp((tu - .5) / 1.3)); hx = 350 + 34 * Math.max(0, tu - .4); hy = SY + 60 - 150 * sc + 250 * sink; rot = 84 * sw; }
  const you = sw > 0 ? swimmer(hx, hy, sc, t, { rot, kick: .24 * sw, look: .3 * sw }) : hero(hx, hy + 150 * sc, Object.assign({ s: sc, face: 1, shade: 1, noShadow: t >= tj ? 1 : 0, pv: -150 * sc }, gp(1), { top: '#e85a2a' }, h));
  s += you + bubbles(t, hx, hy + 60, tj + .62, tj + 1.5, 46, 7, 90);
  s += tintU(SY, .22);
  // surface: wavy line, bright underside band, splash
  let wv = `M-20,${SY}`; for (let x = -20; x <= 740; x += 20) wv += ` L${x},${(SY + Math.sin(t * 2.2 + x * .03) * 4).toFixed(1)}`;
  s += `<path d="${wv} L740,${SY + 40} L-20,${SY + 40}Z" fill="#bfe8f4" opacity=".25"/><path d="${wv}" stroke="#f4fbff" stroke-width="3" fill="none" opacity=".85"/>`;
  const sp = clamp((t - tj - .62) / .9); if (sp > 0 && sp < 1) { const r = RS(12); let d = ''; for (let i = 0; i < 26; i++) { const an = -Math.PI / 2 + (r() - .5) * 2.2, v = 160 + r() * 200, x = 350 + Math.cos(an) * v * sp, y = SY - Math.sin(-an) * v * sp + 380 * sp * sp; if (y < SY + 4) d += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + r() * 5).toFixed(1)}" fill="#f4fbff" opacity="${(1 - sp).toFixed(2)}"/>`; }
    s += d + `<ellipse cx="350" cy="${SY}" rx="${(40 + 120 * sp).toFixed(1)}" ry="${(10 + 8 * sp).toFixed(1)}" fill="none" stroke="#fff" stroke-width="5" opacity="${(1 - sp).toFixed(2)}"/>`; }
  // hours pass: a clock in a panel
  const ca = ease(ramp(t, WS(1, 3), WS(1, 4) + .3)), hr = 3 * ease(ramp(t, WS(1, 4), S0(2) - .6));
  if (ca > 0) s += `<g opacity="${ca.toFixed(2)}">${panel(40, 1080, 330, 150)}<g transform="translate(120,1155)"><circle r="48" fill="#f4f2ec"/><circle r="48" fill="none" stroke="#2a3040" stroke-width="5"/>` +
    Array.from({ length: 12 }, (_, i) => `<path d="M0,-40 v8" stroke="#2a3040" stroke-width="3" transform="rotate(${i * 30})"/>`).join('') +
    `<path d="M0,0 v-26" stroke="#1a1a22" stroke-width="6" stroke-linecap="round" transform="rotate(${(hr * 30).toFixed(1)})"/><path d="M0,0 v-38" stroke="#c8382e" stroke-width="3.5" stroke-linecap="round" transform="rotate(${(hr * 360).toFixed(1)})"/><circle r="5" fill="#1a1a22"/></g>` +
    `<text x="265" y="1172" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="46" fill="#f4c76b">${arN(Math.floor(hr))} س</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: oceans cover over 70% of the Earth, and over 80% of them is unexplored ----------
function donut(cx, cy, R, p, col, bg, w = 22) { const C = 2 * Math.PI * R; return `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${bg}" stroke-width="${w}"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${col}" stroke-width="${w}" stroke-dasharray="${(C * p).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 ${cx} ${cy})"/>`; }
function sceneOcean(t) {
  const T = t - (S0(2) - .2), a1 = ease(ramp(t, WS(2, 2), WS(2, 4) + .4)), a2 = ease(ramp(t, WS(2, 9), WS(2, 11) + .4));
  glE(t, { d: 10.2 - T * .08, el: .12, lon: -165 + T * 2.2, clouds: .4, lights: 0, tg: [0, .5, 0] });
  const card = (x, p, a, col, bg, big, lab) => `<g opacity="${a.toFixed(2)}">${panel(x, 990, 300, 230)}${donut(x + 80, 1105, 52, p, col, bg, 20)}<text x="${x + 215}" y="1102" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="46" fill="${col}">${big}</text>${UL(x + 215, 1160, lab, 1, '#fff', 25)}</g>`;
  F.ov = card(380, .71 * a1, a1, '#4ab0f0', '#3a4a3a', '٧١٪', 'محيطات') + card(40, .8 * a2, a2, '#9aa4b4', '#1e3a5a', '+٨٠٪', 'لم يُستكشَف');
  return space(t);
}
// ---------- 3: a litre of water holds about 30 times less oxygen than a litre of air ----------
function o2(x, y, a = 1, s = 1) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}"><circle cx="-8" cy="0" r="10" fill="#e8463a"/><circle cx="8" cy="0" r="10" fill="#e8463a"/><circle cx="-11" cy="-3" r="3.4" fill="#fff" opacity=".6"/><circle cx="5" cy="-3" r="3.4" fill="#fff" opacity=".6"/></g>`; }
function jar(x, y, w, h, water) { return `<ellipse cx="${x + w / 2}" cy="${y + h + 6}" rx="${w / 2 + 16}" ry="10" fill="#000" opacity=".35" filter="url(#blur2)"/>` +
  (water ? `<rect x="${x + 6}" y="${y + 40}" width="${w - 12}" height="${h - 46}" rx="14" fill="url(#waterJ)"/><path d="M${x + 6},${y + 40} h${w - 12}" stroke="#bfe8ff" stroke-width="3" opacity=".7"/>` : '') +
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="20" fill="url(#jarG)" stroke="#dfeaf4" stroke-opacity=".7" stroke-width="3"/><rect x="${x + 14}" y="${y + 18}" width="10" height="${h - 50}" rx="5" fill="#fff" opacity=".25"/><rect x="${x - 6}" y="${y - 12}" width="${w + 12}" height="18" rx="6" fill="#c8d0d8" opacity=".85"/>`; }
function sceneJars(t) {
  const T = t - (S0(3) - .2), a = ease(ramp(t, WS(3, 3), WS(3, 4) + .3)), b = ease(ramp(t, WS(3, 11) - .2, WS(3, 12)));
  let s = `<defs>${UDEFS()}</defs>` + studio('stJ', '#24405a', '#060c18', 5);
  s += jar(80, 640, 240, 400, 0) + jar(400, 640, 240, 400, 1);
  const r = RS(21); let m = '';
  for (let i = 0; i < 60; i++) { const x0 = 110 + r() * 180, y0 = 690 + r() * 320, ph = r() * 7; m += o2(x0 + Math.sin(T * (1.2 + r()) + ph) * 14, y0 + Math.cos(T * (1.1 + r()) + ph) * 14, a, .9); }
  [[480, 860], [560, 960]].forEach(([x, y], i) => { m += o2(x + Math.sin(T * 1.3 + i * 2) * 10, y + Math.cos(T * 1.1 + i) * 10, a, .9); });
  s += m + UL(200, 610, 'لترُ هواء', 1, '#fff', 30) + UL(520, 610, 'لترُ ماء', 1, '#9ad4ff', 30);
  s += `<g opacity="${a.toFixed(2)}">${o2(260, 1112, 1, .8)}${UL(400, 1122, '= جزيءُ أكسجين', 1, '#ffb0a8', 24)}</g>`;
  s += `<g opacity="${b.toFixed(2)}">${panel(180, 1160, 360, 90)}<text x="360" y="1222" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="40" fill="#f4c76b">أقلُّ ×٣٠</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: over 50 litres of water a minute through your chest ----------
function bottle(x, y, k) { return `<path d="M${x - 11},${y} h22 v-34 q0,-8 -6,-12 v-8 h-10 v8 q-6,4 -6,12Z" fill="#0e2a44" stroke="#9ac8e8" stroke-width="2"/>` + (k > 0 ? `<rect x="${x - 10}" y="${(y - 33 * k).toFixed(1)}" width="20" height="${(33 * k).toFixed(1)}" fill="#3a9ae0"/>` : ''); }
function sceneFlow(t) {
  const T = t - (S0(4) - .2), bob = Math.sin(T * 1.4) * 6, f0 = WS(4, 4), f1 = S0(5) - .5, n = 50 * clamp((t - f0) / (f1 - f0));
  let s = `<defs>${UDEFS()}</defs>` + uwBg(t, { floor: 1190, rays: .6, dk: .12 });
  s += hero(170, 1075 + bob, Object.assign({ s: 1.25, face: 1, shade: 1, noShadow: 1, lF: [.12, .02], lB: [-.08, -.2], aF: [.5, .7], aB: [-.35, -.1] }, gp(1), { top: '#e85a2a' })) + tintU(-20, .12);
  const ch = HP.chest; let ar = '';
  for (let i = 0; i < 6; i++) { const k = pmod(T * 1.6 + i / 6, 1), x = ch[0] + 140 - k * 150, y = ch[1] - 50 + (i % 3) * 30; ar += `<path d="M${x.toFixed(1)},${y} l16,-10 M${x.toFixed(1)},${y} l16,10" stroke="#bfe8ff" stroke-width="4" stroke-linecap="round" opacity="${(Math.sin(k * Math.PI) * .9).toFixed(2)}"/>`; }
  s += ar;
  const pa = ease(ramp(t, S0(4), S0(4) + .5));
  let g = `<g opacity="${pa.toFixed(2)}">${panel(330, 560, 360, 470)}`;
  for (let i = 0; i < 50; i++) { const cx = 370 + (i % 10) * 32, cy = 700 + Math.floor(i / 10) * 66; g += bottle(cx, cy, clamp(n - i)); }
  const tm = clamp((t - f0) / (f1 - f0)); g += `<g transform="translate(420,622)">${donut(0, 0, 26, tm, '#f4c76b', '#2a3448', 9)}</g>${UL(560, 632, 'دقيقةٌ واحدة', 1, '#fff', 26)}`;
  g += `<text x="510" y="1012" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="38" fill="#7ac8ff">${arN(Math.round(n))} لتراً</text></g>`;
  s += g + `<g opacity="${ease(ramp(t, WS(4, 13), WS(4, 14) + .3)).toFixed(2)}">${panel(330, 1050, 360, 80)}${UL(510, 1100, 'الهواء: ≈ ٦ لتراتٍ فقط', 1, '#d8e4f0', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: water is ~800x heavier than air; lungs can't pump it; you'd need gills ----------
function lungPath(sx = 1) { return `<path d="M-12,-70 C-50,-74 -96,-30 -100,40 C-102,90 -70,110 -36,96 C-16,88 -10,40 -12,-20Z" transform="scale(${sx},1)"/>`; }
function waterLungs(x, y, s, fill = 'url(#wLung)', a = 1) { return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><path d="M0,-120 L0,-60 M0,-60 L-30,-30 M0,-60 L30,-30" stroke="#d8e8f0" stroke-width="12" stroke-linecap="round" fill="none"/><g fill="${fill}">${lungPath(1)}${lungPath(-1)}</g>` +
  `<path d="M-30,-30 L-56,10 M-44,-10 L-70,0 M-56,10 L-60,50 M30,-30 L56,10 M44,-10 L70,0 M56,10 L60,50" stroke="#0a3a6a" stroke-width="3" fill="none" opacity=".5"/></g>`; }
function bigFishGills(x, y, s, t, a) {
  if (a <= 0) return ''; let fl = '';
  for (let i = 0; i < 5; i++) { const k = pmod(t * .9 + i / 5, 1), px = 60 - k * 130, py = -6 + (i % 2 ? 8 : -8) + (k > .55 ? (k - .55) * 50 : 0); fl += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="#bfe8ff" opacity="${(Math.sin(k * Math.PI)).toFixed(2)}"/>`; }
  return `<g opacity="${a.toFixed(2)}">${fishA(x, y, s, 1, '#6a9ab8', t * .4, 0)}<g transform="translate(${x},${y}) scale(${s})"><path d="M20,-12 q-6,12 0,24" stroke="#e85a5a" stroke-width="3.4" fill="none"/><path d="M16,-11 q-6,11 0,22 M12,-10 q-5,10 0,20" stroke="#c83a3a" stroke-width="2" fill="none"/>${fl}</g></g>`;
}
function sceneGills(t) {
  const T = t - (S0(5) - .2), pA = 1 - ease(ramp(t, WS(5, 6) - .3, WS(5, 6) + .1)), pB = ease(ramp(t, WS(5, 6) - .2, WS(5, 6) + .2)) * (1 - ease(ramp(t, WS(5, 10) - .3, WS(5, 10) + .1))), pC = ease(ramp(t, WS(5, 10) - .2, WS(5, 10) + .2));
  let s = `<defs>${UDEFS()}</defs>` + uwBg(t, { g: 'uwD', floor: 1400, rays: .5, dk: .25 });
  if (pA > 0) { const tl = ease(ramp(t, WS(5, 1), WS(5, 3))) * 14, c = Math.cos(tl * Math.PI / 180), sn = Math.sin(tl * Math.PI / 180), L = [360 - 210 * c, 760 - 210 * sn], R = [360 + 210 * c, 760 + 210 * sn].map((v, i) => i ? 760 - 210 * sn : v);
    const Lp = [360 - 210 * c, 760 + 210 * sn], Rp = [360 + 210 * c, 760 - 210 * sn];
    const pan = (p, inner) => `<path d="M${p[0]},${p[1]} L${p[0] - 70},${p[1] + 150} M${p[0]},${p[1]} L${p[0] + 70},${p[1] + 150}" stroke="#c8d0d8" stroke-width="3"/><path d="M${p[0] - 90},${p[1] + 150} h180 q-10,30 -90,30 q-80,0 -90,-30Z" fill="#9aa4b0"/>` + inner(p[0], p[1] + 150);
    s += `<g opacity="${pA.toFixed(2)}"><rect x="350" y="760" width="20" height="440" fill="#8a929c"/><path d="M300,1200 h120 l-20,-30 h-80Z" fill="#6a727c"/><path d="M${Lp[0]},${Lp[1]} L${Rp[0]},${Rp[1]}" stroke="#c8d0d8" stroke-width="12" stroke-linecap="round"/><circle cx="360" cy="760" r="14" fill="#f4c76b"/>` +
      pan(Lp, (x, y) => `<rect x="${x - 60}" y="${y - 120}" width="120" height="120" rx="10" fill="#2a7ab8" stroke="#9ad4ff" stroke-width="3"/>` + UL(x, y - 50, 'لترُ ماء', 1, '#fff', 24)) +
      pan(Rp, (x, y) => `<rect x="${x - 60}" y="${y - 120}" width="120" height="120" rx="10" fill="#fff" fill-opacity=".08" stroke="#dfeaf4" stroke-width="3" stroke-dasharray="8 6"/>` + UL(x, y - 50, 'لترُ هواء', 1, '#fff', 24)) +
      `<g opacity="${ease(ramp(t, WS(5, 4), WS(5, 5))).toFixed(2)}">${panel(230, 450, 260, 110)}<text x="360" y="528" text-anchor="middle" font-family="Inter" font-weight="900" font-size="64" fill="#f4c76b">×800</text></g></g>`; }
  if (pB > 0) { const lab = ease(ramp(t, WS(5, 7), WS(5, 8))), sh = Math.sin(T * 30) * 2 * lab;
    s += `<g opacity="${pB.toFixed(2)}" transform="translate(${sh.toFixed(1)},0)">${waterLungs(360, 780, 2.6)}</g><g opacity="${(pB * lab).toFixed(2)}"><path d="M200,620 L520,940 M520,620 L200,940" stroke="#e53935" stroke-width="22" stroke-linecap="round" opacity=".85"/>${panel(220, 1040, 280, 90)}${UL(360, 1098, 'رئتاك', 1, '#ffb0a8', 34)}</g>`; }
  if (pC > 0) s += bigFishGills(360, 800, 4.6, t, pC) + `<g opacity="${pC.toFixed(2)}">${panel(240, 1040, 240, 90)}${UL(360, 1098, 'خياشيم', 1, '#ff9a8a', 36)}<path d="M430,750 L460,690" stroke="#f4c76b" stroke-width="4"/><circle cx="455" cy="772" r="40" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="10 7"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: water draws heat from your body about 25 times faster than air ----------
function sceneCold(t) {
  const T = t - (S0(6) - .2), k = ease(ramp(t, WS(6, 3), S0(7) - .4)), sh = Math.sin(T * 70) * 2 * k, cb = ease(ramp(t, WS(6, 9), WS(6, 13)));
  let s = `<defs>${UDEFS()}</defs>` + uwBg(t, { g: 'uwD', floor: 1400, rays: .45, dk: .2 });
  s += `<ellipse cx="${190 + sh}" cy="830" rx="${190 - 60 * k}" ry="${300 - 90 * k}" fill="url(#warmG)" opacity="${(1 - .8 * k).toFixed(2)}"/>`;
  const r = RS(31); let hp = '';
  for (let i = 0; i < 34; i++) { const st = r() * 3, ph = pmod(T * (.7 + 1.6 * k) + st, 1), an = r() * Math.PI * 2, d = 90 + ph * 230, x = 190 + Math.cos(an) * d * .7, y = 830 + Math.sin(an) * d;
    hp += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + r() * 4).toFixed(1)}" fill="#ffa050" opacity="${(Math.sin(ph * Math.PI) * .6 * (.3 + .7 * k)).toFixed(2)}"/>`; }
  s += hp + hero(190 + sh, 1110, Object.assign({ s: 1.25, face: 1, shade: 1, noShadow: 1, lF: [.08, .02], lB: [-.06, -.18], hF: [222 + sh, 872], hB: [212 + sh, 892], bendF: 1, bendB: 1 }, gp(1), { top: '#e85a2a' }));
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#5ab0ff" opacity="${(.12 * k).toFixed(2)}"/>`;
  const bar = (y, w, col, lab, val) => `${UL(470, y - 18, lab, 1, '#fff', 24)}<rect x="400" y="${y}" width="${(260 * w).toFixed(1)}" height="28" rx="10" fill="${col}"/><text x="${(400 + 260 * w + 10).toFixed(1)}" y="${y + 22}" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="${col}">${val}</text>`;
  s += `<g opacity="${cb.toFixed(2)}">${panel(380, 650, 320, 300)}${UL(540, 700, 'فقدانُ الحرارة', 1, '#ffb070', 28)}${bar(770, .04, '#c8d4e0', 'في الهواء', '×١')}${bar(870, .04 + .76 * cb, '#5ab0ff', 'في الماء', '×٢٥')}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: every 10 m down adds the pressure of the whole atmosphere above your head ----------
function sceneDepth(t) {
  const T = t - (S0(7) - .2), d = 1 + 34 * ease(ramp(t, S0(7), WS(7, 7))), PX = 52, YH = 690, k = clamp(d / 45);
  const top = mix('#3aa8c8', '#08304e', k), bot = mix('#1c6a90', '#041a30', k);
  let s = `<defs>${UDEFS()}<linearGradient id="dpG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#dpG)"/>`;
  const sy = YH - d * PX; if (sy > -20) s += `<rect x="-20" y="-20" width="760" height="${(sy + 20).toFixed(1)}" fill="url(#skyU)"/><path d="M-20,${sy.toFixed(1)} H740" stroke="#f4fbff" stroke-width="3"/>`;
  for (let i = 0; i < 5; i++) { const x = 60 + i * 150; s += `<path d="M${x},${Math.max(sy, -20)} l60,0 l180,${900 - sy} l-300,0Z" fill="url(#rayG)" opacity="${(.8 * (1 - k)).toFixed(2)}"/>`; }
  s += snow(t, 70, .8, 5, -70);
  for (let m = 0; m <= 60; m += 2) { const y = YH + (m - d) * PX; if (y < -10 || y > 1300 || m === 0) continue; const big = m % 10 === 0; s += `<path d="M40,${y.toFixed(1)} h${big ? 46 : 20}" stroke="#e8f4ff" stroke-width="${big ? 4 : 2}" opacity=".8"/>` + (big ? `<text x="96" y="${(y + 10).toFixed(1)}" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#e8f4ff" direction="rtl" text-anchor="end" style="paint-order:stroke" stroke="#000" stroke-width="4" stroke-opacity=".5">${arN(m)} م</text>` : ''); }
  s += `<path d="M40,-20 V1300" stroke="#e8f4ff" stroke-width="3" opacity=".6"/>`;
  s += swimmer(360, YH, 1.0, t, { rot: 172, kick: .26, kr: 6.5, look: 0, aF: [Math.PI - .15, Math.PI - .08], aB: [Math.PI - .1, Math.PI - .05] }) + tintU(-20, .1 + .25 * k);
  const P = 1 + d / 10; s += `${panel(420, 1050, 270, 180)}${UL(555, 1092, 'الضغطُ عليك', 1, '#fff', 24)}<text x="555" y="1162" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="52" fill="#f4c76b">${arN(P.toFixed(1))}</text>${UL(555, 1208, 'ضغطٍ جوّي', 1, '#d8e4f0', 22)}`;
  const ia = ease(ramp(t, WS(7, 7) - .1, WS(7, 8) + .2));
  if (ia > 0) s += `<g opacity="${ia.toFixed(2)}">${panel(440, 440, 250, 330)}<rect x="480" y="470" width="70" height="230" rx="8" fill="#a6d0f0" opacity=".55"/><rect x="590" y="620" width="70" height="80" rx="8" fill="#2a7ab8"/>${UL(515, 740, 'كلُّ الهواء', 1, '#d8ecff', 21)}${UL(625, 740, '١٠ م ماء', 1, '#9ad4ff', 21)}<text x="570" y="600" text-anchor="middle" font-family="Inter" font-weight="900" font-size="44" fill="#f4c76b">=</text></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: the surprise: water-filled lungs don't squeeze, so you could go deeper than any diver ----------
function airLungs(x, y, s, sc) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,-120 L0,-60" stroke="#e8d0c8" stroke-width="12" stroke-linecap="round"/><g transform="translate(0,-20) scale(${sc.toFixed(3)}) translate(0,20)" fill="url(#lungG)">${lungPath(1)}${lungPath(-1)}</g></g>`; }
function sceneDeep(t) {
  const T = t - (S0(8) - .2), tb = WS(8, 9), d = t < tb ? 1 + 99 * ease(ramp(t, WS(8, 3), tb - .2)) : 100 + 560 * ease(ramp(t, tb, S0(9) - .3)), k = clamp(.4 + d / 500), sq = Math.pow(1 / (1 + Math.min(d, 100) / 10), 1 / 3);
  let s = `<defs>${UDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="${mix('#0a3a5e', '#01060e', k)}"/>` + snow(t, 90, .7, 8, -50 - (t > tb ? 260 : 0));
  // bioluminescent drifting lights (deep water)
  const r = RS(41); for (let i = 0; i < 16; i++) { const x = r() * 720, y = pmod(r() * 1300 - T * (t > tb ? 220 : 40), 1300), a = .3 + .7 * Math.sin(t * (1 + r()) + i) ** 2; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(10 + r() * 16).toFixed(1)}" fill="url(#bioG)" opacity="${(a * k).toFixed(2)}"/>`; }
  // the free diver stays at his limit; you sink on
  const dy = t < tb ? 0 : (100 - d) * 3, bob = Math.sin(T * 1.3) * 5;
  s += hero(200, 1080 + dy + bob, Object.assign({ s: 1.0, face: 1, shade: 1, noShadow: 1, lF: [.1, 0], lB: [-.1, -.15], aF: [.3, .5], aB: [-.3, -.1] }, gp(2)));
  const E = HP.eye, F1 = HP.footF, F2 = HP.footB;
  s += `<rect x="${(E[0] - 14).toFixed(1)}" y="${(E[1] - 12).toFixed(1)}" width="26" height="20" rx="6" fill="#1a2a3a" stroke="#9ab" stroke-width="2"/><rect x="${(E[0] - 10).toFixed(1)}" y="${(E[1] - 8).toFixed(1)}" width="18" height="12" rx="4" fill="#7ac8e8" opacity=".6"/>` +
    [F1, F2].map(p => `<path d="M${(p[0] - 6).toFixed(1)},${(p[1] - 4).toFixed(1)} l44,10 l-6,14 l-40,-10Z" fill="#1e2a36"/>`).join('');
  s += hero(500, 1080 + bob * .8, Object.assign({ s: 1.0, face: -1, shade: 1, noShadow: 1, lF: [.1, 0], lB: [-.1, -.15], aF: [.3, .5], aB: [-.3, -.1] }, gp(1), { top: '#e85a2a' })) + tintU(-20, .18 + .2 * k);
  const la = ease(ramp(t, WS(8, 3) - .2, WS(8, 4))) * (1 - ease(ramp(t, tb - .3, tb + .2)));
  s += `<g opacity="${la.toFixed(2)}">${panel(70, 430, 260, 300)}${airLungs(200, 600, .85, sq)}${UL(200, 708, 'هواءٌ يُضغَط', 1, '#ffb0a8', 24)}${panel(390, 430, 260, 300)}${waterLungs(520, 600, .85)}${UL(520, 708, 'ماءٌ لا يُضغَط', 1, '#9ad4ff', 24)}</g>`;
  const ly = 1080 + (534 - d) * 3; if (t >= tb && ly > 380 && ly < 1300) s += `<path d="M-20,${ly.toFixed(1)} H740" stroke="#f4c76b" stroke-width="3" stroke-dasharray="14 10" opacity=".8"/>${UL(240, ly - 14, 'أعمقُ غوّاصٍ في البحر ≈ ٥٣٤ م', 1, '#f4c76b', 24)}`;
  s += `${panel(230, 1120, 260, 110)}<text x="360" y="1196" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="46" fill="#9ad4ff">${arN(Math.round(d))} م</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: in your first weeks in the womb you had folds in your neck that look like fish gills ----------
function embryo(x, y, s, g) {
  const B = 'M20,-200 C120,-212 192,-140 182,-62 C176,-24 152,4 126,18 C156,58 154,118 112,150 C84,174 44,176 22,160 C4,176 -16,196 -8,216 C-2,236 -40,238 -46,212 C-50,192 -42,178 -62,160 C-122,120 -152,40 -142,-40 C-132,-130 -72,-194 20,-200Z';
  let s0 = `<g transform="translate(${x},${y}) scale(${s})"><path d="${B}" fill="url(#embG)"/><path d="${B}" fill="none" stroke="#b86a5a" stroke-width="3" opacity=".6"/>`;
  for (let i = 0; i < 9; i++) { const a = 2.2 + i * .22, rx = -100 + Math.cos(a) * 18, ry = -40 + i * 22; s0 += `<ellipse cx="${(-128 + i * 3 + Math.abs(i - 4) * 2).toFixed(1)}" cy="${ry}" rx="9" ry="7" fill="#d88a7a" opacity=".55"/>`; }
  s0 += `<circle cx="112" cy="-96" r="18" fill="#3a2a30" opacity=".75"/><circle cx="112" cy="-96" r="26" fill="none" stroke="#c88a7a" stroke-width="3" opacity=".6"/>` +
    `<path d="M60,70 q30,10 36,40 q-20,6 -40,-14Z" fill="#e8a898" stroke="#b86a5a" stroke-width="2"/><path d="M-70,150 q-10,30 6,46 q16,-14 8,-40Z" fill="#e8a898" stroke="#b86a5a" stroke-width="2"/>` +
    `<ellipse cx="96" cy="90" rx="38" ry="44" fill="#d0706a" opacity=".55"/>`;
  for (let i = 0; i < 4; i++) { const yy = -20 + i * 22, xx = 150 - i * 12; s0 += `<path d="M${xx - 34},${yy} Q${xx},${yy - 14} ${xx + 4},${yy + 8}" stroke="${g > 0 ? mix('#c87a6a', '#f4c76b', g) : '#c87a6a'}" stroke-width="${(7 + 2 * g).toFixed(1)}" fill="none" stroke-linecap="round"/>`; }
  return s0 + `</g>`;
}
function sceneEmbryo(t) {
  const T = t - (S0(9) - .2), g = ease(ramp(t, WS(9, 10) - .2, WS(9, 11))), fa = ease(ramp(t, WS(9, 11), WS(9, 12) + .3));
  let s = `<defs>${UDEFS()}</defs>` + studio('stE', '#4a2834', '#100609', 9);
  const es = .95 + T * .01, ey = 720 + Math.sin(T * 1.2) * 4;
  s += `<circle cx="300" cy="730" r="270" fill="url(#sacG)"/><circle cx="300" cy="730" r="270" fill="none" stroke="#ffc8c0" stroke-width="3" opacity=".25"/>`;
  s += `<path d="M${300 + 70 * es},${ey + 120 * es} C${300 + 120 * es},${ey + 230 * es} ${300 + 200 * es},${ey + 230 * es} ${300 + 215 * es},${ey + 190 * es}" stroke="#d89080" stroke-width="${(22 * es).toFixed(1)}" fill="none" stroke-linecap="round"/><circle cx="${300 + 220 * es}" cy="${ey + 170 * es}" r="${(44 * es).toFixed(1)}" fill="#f0c880"/><circle cx="${300 + 208 * es}" cy="${ey + 158 * es}" r="${(14 * es).toFixed(1)}" fill="#fff" opacity=".35"/>`;
  s += embryo(300, ey, es, g);
  s += `<g opacity="${g.toFixed(2)}"><circle cx="${(300 + 128 * es).toFixed(1)}" cy="${(ey + 12 * es).toFixed(1)}" r="${(62 * es).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="10 8"/></g>`;
  s += UL(300, 1080, 'أنتَ في الأسبوعِ الخامس', ease(ramp(t, WS(9, 2), WS(9, 3) + .3)), '#ffd0c8', 28);
  s += `<g opacity="${fa.toFixed(2)}">${panel(470, 960, 230, 200)}${bigFishGills(585, 1050, 1.45, t, 1)}${UL(585, 1138, 'خياشيمُ السمكة', 1, '#ff9a8a', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: -150 + (t - S0(10)) * 2, clouds: .45, lights: .3, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8) - .3, WS(10, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneDive }, { s: S0(2) - .2, f: sceneOcean }, { s: S0(3) - .2, f: sceneJars }, { s: S0(4) - .2, f: sceneFlow }, { s: S0(5) - .2, f: sceneGills },
  { s: S0(6) - .2, f: sceneCold }, { s: S0(7) - .2, f: sceneDepth }, { s: S0(8) - .2, f: sceneDeep }, { s: S0(9) - .2, f: sceneEmbryo }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneOcean, sceneJars, sceneGills, sceneDepth, sceneDeep, sceneEmbryo]);
const XF = .5;
const TLI = [['الأكسجين', S0(3)], ['الخياشيم', S0(5)], ['البرد', S0(6)], ['الضغط', S0(7)], ['الأعماق', S0(8)]];
const LIST_ON = new Set([sceneCold]);
const CHIPS = [
  ['c0', 'تتنفّسُ تحتَ الماء', 360, 330, 'big', WS(0, 3), S0(1) - .3],
  ['c1', 'بلا خزّانِ أكسجين', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', 'عالَمٌ مجهول', 360, 330, 'big', WS(2, 15), S0(3) - .3],
  ['c4', 'كلَّ دقيقة!', 360, 330, 'big', WS(4, 13), S0(5) - .3],
  ['c5', 'تحتاجُ خياشيم', 360, 330, 'big', WS(5, 10), S0(6) - .3],
  ['c7', 'كلَّ ١٠ أمتار', 360, 330, 'big', WS(7, 2), S0(8) - .3],
  ['c8', 'مفاجأة!', 360, 330, 'big', WS(8, 2), S0(9) - .3],
  ['c9', 'والأغرب؟', 360, 330, 'big', WS(9, 0), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">تحتَ الماء</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
