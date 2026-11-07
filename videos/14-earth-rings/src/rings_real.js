// ===== realism pass for the rings Short: shots 3, 4, 5, 7, 8, 9 =====
// a smooth ring arch with fine ringlets; it fades into the haze near the horizon; at night Earth's shadow is a soft gap on the ring itself
function skyRing(t, hz, o = {}) {
  const night = o.night || 0, apexOut = hz - 36 * 15, apexIn = hz - 10 * 15, cy = hz + 700, id = o.id || 'r', hzc = o.hzc || (night ? '#1a2440' : '#dcebf4');
  let arcs = '', band = '';
  BANDS.forEach(([r0, r1, op], bi) => { const n = 12; for (let q = 0; q < n; q++) { const u = (lerp(r0, r1, (q + .5) / n) - 1.35) / .9, apex = lerp(apexIn, apexOut, u), ry = cy - apex, w = (apexIn - apexOut) * (r1 - r0) / .9 / n + 1.6;
      const col = night ? mix('#fffaf0', '#f0e4cc', ((q * 7 + bi) % 5) / 5) : mix('#ffffff', '#dfe8f2', ((q * 7 + bi) % 5) / 5), oo = op * (night ? .92 : .48) * (.93 + .07 * Math.sin(q * 1.7 + bi * 2));
      arcs += `<path d="M-400,${cy} A760,${ry} 0 0 1 1120,${cy}" stroke="${col}" stroke-width="${w.toFixed(2)}" fill="none" opacity="${oo.toFixed(2)}"/>`; } });
  const mid = cy - lerp(apexIn, apexOut, .5), bw = apexIn - apexOut + 8;
  band = `<path d="M-400,${cy} A760,${mid} 0 0 1 1120,${cy}" stroke="#fff" stroke-width="${bw}" fill="none"/>`;
  let s = `<defs><mask id="rm${id}"><rect x="-50" y="-50" width="820" height="1400" fill="#000"/>${band}</mask><linearGradient id="rh${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hzc}" stop-opacity="0"/><stop offset="1" stop-color="${hzc}" stop-opacity="${night ? .55 : .9}"/></linearGradient></defs>`;
  s += `<g opacity="${o.a ?? 1}">` + (night ? `<path d="M-400,${cy} A760,${mid} 0 0 1 1120,${cy}" stroke="#fff4dc" stroke-width="${bw * 1.6}" fill="none" opacity=".1" filter="url(#haze)"/>` : '') + arcs;
  if (night && o.shadow) s += `<g mask="url(#rm${id})"><ellipse cx="360" cy="${lerp(apexIn, apexOut, .5)}" rx="${90 + 10 * Math.sin(t)}" ry="${bw}" fill="#04060c" opacity="${.92 * o.shadow}" filter="url(#soft)"/></g>`;
  s += `</g><rect x="-20" y="${hz - 300}" width="760" height="300" fill="url(#rh${id})"/>`;
  return s;
}
// Baghdad at night lit by the rings: lit windows, street lamps, a silvery wash on the ground, long soft shadows
function ringStreet(t, o = {}) {
  const night = o.night || 0, sky = night ? ['#02040c', '#0c1428', '#1a2440'] : ['#3a7cc4', '#9cc4e6', '#dcebf4'];
  let s = street(t, { id: 'rs' + (o.id || ''), sky, sun: night ? 0 : 1, sunX: 80, sunY: 420, afterSky: (night ? stars(.8, t) : '') + skyRing(t, 1000, { night, shadow: o.shadow || 0, id: o.id || 'a', hzc: sky[2] }) });
  if (night) { 
    for (let i = 0; i < 30; i++) { const r = RS(i + 200); s += `<rect x="${r() * 700}" y="${760 + r() * 220}" width="8" height="11" fill="#ffd27a" opacity="${.5 + .4 * r()}"/>`; }
    [60, 300, 560].forEach(x => { s += lampPost(x, 1056, 190, 1); });
    s += `<rect y="1000" width="720" height="290" fill="#cfd8ff" opacity=".12"/><rect y="1000" width="720" height="290" fill="#05070f" opacity=".35"/>`; }
  return s;
}
function sceneDay(t) {
  let s = ringStreet(t, { night: 0, id: 'd' }) + car(560, 1240, .9, '#c83a2a', -1, 0);
  s += person(260, 1180, { s: .55, face: 1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t, lookUp: .8 }) + person(330, 1190, { s: .5, face: -1, top: CROWD[3].top, pants: CROWD[3].pants, skin: CROWD[3].skin, hair: CROWD[3].hair, t, lookUp: .8 });
  s += `<text x="40" y="975" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">← الشرق</text><text x="680" y="975" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">الغرب →</text><text x="360" y="975" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">الجنوب</text>`;
  F.ov = ''; return s;
}
function sceneNight(t) {
  let s = ringStreet(t, { night: 1, shadow: ease(ramp(t, WS(3, 10) - .3, WS(3, 10) + .5)), id: 'n' }) + car(560, 1240, .9, '#5a5a62', -1, 1);
  const sh = (x, y) => `<ellipse cx="${x}" cy="${y + 40}" rx="16" ry="70" fill="#000" opacity=".35" transform="rotate(10,${x},${y})" filter="url(#blur2)"/>`;
  s += sh(260, 1180) + sh(380, 1190) + person(260, 1180, { s: .55, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t, lookUp: .8 }) + person(380, 1190, { s: .52, face: -1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, t, lookUp: .8 });
  F.ov = ''; return s;
}
// 7: meteors from ring debris: thin hot streaks with green/orange tints and fading trains, one fireball breaking up
function sceneMeteors(t) {
  let s = ringStreet(t, { night: 1, shadow: 1, id: 'm' });
  let m = '';
  for (let i = 0; i < 12; i++) { const r = RS(i + 10), per = 1.4 + r() * 1.2, ph = pmod(t / per + r(), 1); if (ph > .45) continue; const k = ph / .45, x0 = 60 + r() * 640, y0 = 260 + r() * 300, L_ = 140 + r() * 220, ang = (200 + r() * 25) * Math.PI / 180;
    const hx = x0 + Math.cos(ang) * L_ * k, hy = y0 - Math.sin(ang) * L_ * k, tx = x0 + Math.cos(ang) * L_ * Math.max(0, k - .35), ty = y0 - Math.sin(ang) * L_ * Math.max(0, k - .35), col = ['#c8ffd8', '#ffd8a8', '#ffffff'][i % 3], a = Math.sin(Math.PI * k);
    m += `<defs><linearGradient id="mg${i}" gradientUnits="userSpaceOnUse" x1="${tx}" y1="${ty}" x2="${hx}" y2="${hy}"><stop offset="0" stop-color="${col}" stop-opacity="0"/><stop offset="1" stop-color="${col}"/></linearGradient></defs><path d="M${tx},${ty} L${hx},${hy}" stroke="url(#mg${i})" stroke-width="${1.5 + r() * 2}" stroke-linecap="round" opacity="${a.toFixed(2)}"/><circle cx="${hx}" cy="${hy}" r="${2 + r() * 2}" fill="#fff" opacity="${a.toFixed(2)}" filter="url(#blur2)"/>`; }
  { const ph = pmod(t / 3.2, 1), k = ph; if (ph < .6) { const hx = 600 - 380 * k, hy = 300 + 260 * k, a = Math.sin(Math.PI * k / .6); m += `<path d="M${600},300 L${hx},${hy}" stroke="#ffb860" stroke-width="5" opacity="${.5 * a}" stroke-linecap="round" filter="url(#blur2)"/><circle cx="${hx}" cy="${hy}" r="10" fill="#fff6d8" opacity="${a}"/><circle cx="${hx}" cy="${hy}" r="40" fill="#ffc870" opacity="${.35 * a}" filter="url(#soft)"/>` + (k > .35 ? [0, 1, 2].map(q => `<circle cx="${hx + 14 + q * 10}" cy="${hy - 8 - q * 6}" r="3" fill="#ffd8a0" opacity="${a}"/>`).join('') : ''); } }
  s = s.replace('<rect x="-20" y="', m + '<rect x="-20" y="');
  s += person(330, 1180, { s: .55, face: -1, top: CROWD[1].top, pants: CROWD[1].pants, skin: CROWD[1].skin, hair: CROWD[1].hair, t, lookUp: .9 });
  F.ov = ''; return s;
}
// 8: a real coastal launch site: a lattice service tower with arms, a flame trench, a two-stage rocket on a pillar of fire, steam and exhaust rolling out; the ring plane ahead full of debris
function sceneRocket(t) {
  const st = S0(6) - .2, T = t - st, lift = Math.max(0, T - .5), ry = 1010 - lift * lift * 40, gy = 1030;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skR8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a5a9a"/><stop offset="1" stop-color="#d4e4f0"/></linearGradient><linearGradient id="rkB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8bcc2"/><stop offset=".35" stop-color="#ffffff"/><stop offset=".7" stop-color="#e4e6ea"/><stop offset="1" stop-color="#9aa0a8"/></linearGradient>` +
    `<linearGradient id="plume" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".2" stop-color="#ffe7a0"/><stop offset=".6" stop-color="#ff9a3a" stop-opacity=".8"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR8)"/>`;
  s += skyRing(t, 980, { night: 0, id: 'k', hzc: '#d4e4f0' });
  for (let i = 0; i < 26; i++) { const r = RS(i + 50), x = r() * 720, y = 470 + r() * 330; s += `<circle cx="${x}" cy="${y}" r="${1.5 + r() * 2.5}" fill="#5a4a3a" opacity=".85"/><circle cx="${x - .8}" cy="${y - .8}" r="${.8 + r()}" fill="#fff" opacity="${.5 + .5 * Math.sin(t * 5 + i)}"/>`; }
  s += riverW(980, 1040, t, { id: 'k8', col: ['#4a7a9a', '#2a5470'], sunX: 600 });
  s += `<rect y="${gy}" width="720" height="260" fill="#9a968a"/><rect y="${gy}" width="720" height="260" fill="#000" filter="url(#grainR)" opacity=".4"/><path d="M60,${gy + 20} L660,${gy + 20} L700,${gy + 70} L20,${gy + 70}Z" fill="#b8b4aa"/><path d="M220,${gy + 20} L330,${gy + 20} L336,${gy + 70} L214,${gy + 70}Z" fill="#3a3632"/>`;
  // service tower: lattice, arms, crane, lightning mast
  const tx = 100, tw = 60, ttop = 520;
  s += `<rect x="${tx}" y="${ttop}" width="${tw}" height="${gy + 20 - ttop}" fill="none" stroke="#c84a2a" stroke-width="4"/>` + Array.from({ length: 16 }, (_, q) => { const y = ttop + q * (gy + 20 - ttop) / 16; return `<path d="M${tx},${y} L${tx + tw},${y + (gy + 20 - ttop) / 16} M${tx + tw},${y} L${tx},${y + (gy + 20 - ttop) / 16} M${tx},${y} h${tw}" stroke="#c84a2a" stroke-width="2.4"/>`; }).join('');
  s += `<path d="M${tx + tw / 2},${ttop} L${tx + tw / 2},${ttop - 80}" stroke="#8a8a8a" stroke-width="3"/><path d="M${tx},${ttop + 10} L${tx + 160},${ttop + 10}" stroke="#c84a2a" stroke-width="6"/>`;
  const armOpen = ramp(T, 0, .4);
  [[640, 1], [780, 1], [900, 0]].forEach(([y, sw]) => { s += `<path d="M${tx + tw},${y} L${tx + tw + lerp(110, 40, armOpen)},${y + lerp(0, -30, armOpen)}" stroke="#7a7a7a" stroke-width="8"/>`; });
  // the rocket: two stages, interstage, grid fins, engines; plume and shock diamonds when lit
  const rx = 270, H = 440, W = 46, top = ry - H;
  if (T > .2) { const pl = 300 + 120 * Math.sin(t * 30) * .1; s += `<path d="M${rx - 24},${ry + 6} C${rx - 40},${ry + pl * .5} ${rx - 70},${ry + pl} ${rx},${ry + pl * 1.2} C${rx + 70},${ry + pl} ${rx + 40},${ry + pl * .5} ${rx + 24},${ry + 6}Z" fill="url(#plume)"/>` + [0, 1, 2, 3].map(q => `<ellipse cx="${rx}" cy="${ry + 30 + q * 34}" rx="${10 - q * 1.5}" ry="6" fill="#fff6e0" opacity="${.8 - q * .15}"/>`).join('') + `<circle cx="${rx}" cy="${ry + 20}" r="60" fill="#ffd27a" opacity=".35" filter="url(#soft)"/>`; }
  s += `<rect x="${rx - W / 2}" y="${top + 90}" width="${W}" height="${H - 90}" fill="url(#rkB)"/><path d="M${rx - W / 2},${top + 90} Q${rx - W / 2},${top + 20} ${rx},${top} Q${rx + W / 2},${top + 20} ${rx + W / 2},${top + 90}Z" fill="url(#rkB)"/><rect x="${rx - W / 2}" y="${top + 170}" width="${W}" height="22" fill="#1e2024"/>` +
    `<rect x="${rx - W / 2 - 6}" y="${top + 196}" width="8" height="14" fill="#3a3a3e"/><rect x="${rx + W / 2 - 2}" y="${top + 196}" width="8" height="14" fill="#3a3a3e"/><path d="M${rx - W / 2},${ry - 40} L${rx - W / 2 - 14},${ry} L${rx - W / 2},${ry}Z M${rx + W / 2},${ry - 40} L${rx + W / 2 + 14},${ry} L${rx + W / 2},${ry}Z" fill="#2a2a2e"/>` +
    `<path d="M${rx - 18},${ry} L${rx - 22},${ry + 14} L${rx - 6},${ry + 14} L${rx - 8},${ry}Z M${rx + 8},${ry} L${rx + 6},${ry + 14} L${rx + 22},${ry + 14} L${rx + 18},${ry}Z" fill="#3a3632"/><rect x="${rx - 4}" y="${top + 260}" width="8" height="90" fill="#000" opacity=".08"/>`;
  // exhaust and steam pouring out of the flame trench on both sides
  if (T > .2) for (let i = 0; i < 26; i++) { const r = RS(i + 70), ph = pmod(t * .35 + r(), 1), side = i % 2 ? 1 : -1, x = rx + side * (40 + ph * (260 + r() * 200)), y = gy + 30 - ph * (60 + r() * 120), rr = 40 + ph * 120 + r() * 30;
    s += `<circle cx="${x}" cy="${y}" r="${rr}" fill="${mix('#ffffff', '#c8c4bc', r())}" opacity="${(.85 * (1 - ph * .7) * ramp(T, .2, .8)).toFixed(2)}" filter="url(#soft)"/>`; }
  s += `<g opacity="${ramp(t, WS(6, 4) - .2, WS(6, 4) + .3)}"><path d="M${rx},${top - 20} L560,640" stroke="#ff5a3a" stroke-width="3" stroke-dasharray="10 8"/><circle cx="560" cy="640" r="26" fill="none" stroke="#ff5a3a" stroke-width="4"/><path d="M548,628 L572,652 M572,628 L548,652" stroke="#ff5a3a" stroke-width="4"/></g>`;
  F.ov = ''; return s;
}
// 9: 466 million years ago: layered bare mountains in haze, a sea with breaking waves on a rocky platform, tide pools; no land plants yet
function sceneAncient(t) {
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skA9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7aa0"/><stop offset=".7" stop-color="#c0ccd4"/><stop offset="1" stop-color="#e8e2d4"/></linearGradient><linearGradient id="seaA9" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a8a98"/><stop offset=".5" stop-color="#2a6a7a"/><stop offset="1" stop-color="#17485a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skA9)"/>`;
  for (let i = 0; i < 7; i++) { const r = RS(i + 5), cx = pmod(r() * 900 + t * 6, 1000) - 140; s += `<ellipse cx="${cx}" cy="${380 + r() * 200}" rx="${160 + r() * 120}" ry="${30 + r() * 20}" fill="#fff" opacity=".35" filter="url(#haze)"/>`; }
  s += skyRing(t, 900, { night: 0, a: .9, id: 'an', hzc: '#e0dcd0' });
  const ridge = (base, amp, seed, col, hz2) => { const r = RS(seed); let d = `M-20,${base}`; for (let x = -20; x <= 760; x += 12) { d += ` L${x},${(base - amp * (.5 + .5 * Math.sin(x * .009 + seed)) * (.7 + .3 * Math.sin(x * .05 + seed * 2)) - r() * amp * .12).toFixed(1)}`; } return `<path d="${d} L760,${hz2} L-20,${hz2}Z" fill="${col}" filter="url(#reliefR)"/>`; };
  s += ridge(860, 170, 3, '#a8a4a0', 920) + `<rect y="660" width="720" height="260" fill="#d8dcdc" opacity=".35"/>` + ridge(890, 120, 7, '#8a7a6c', 930) + ridge(915, 70, 11, '#6e5e50', 940);
  s += `<rect y="930" width="720" height="170" fill="url(#seaA9)"/>`;
  for (let k = 0; k < 9; k++) { const y = 936 + Math.pow(k / 8, 1.4) * 150; let d = `M-20,${y}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${-2 - k * .5} 40,0`; s += `<path d="${d}" stroke="${k % 2 ? '#d8eef0' : '#0e3a48'}" stroke-width="${1 + k * .2}" fill="none" opacity="${.2 + .02 * k}" transform="translate(${Math.sin(t * .8 + k) * 12},0)"/>`; }
  for (let i = 0; i < 30; i++) { const r = RS(i + 40), u = r(); s += `<rect x="${520 + (r() - .5) * 240 * (.3 + u)}" y="${934 + u * 140}" width="${6 + u * 18}" height="2" fill="#fff6d8" opacity="${((.3 + .5 * r()) * (.5 + .5 * Math.sin(t * 5 + i))).toFixed(2)}"/>`; }
  const br = pmod(t * .5, 1); let fo = `M-20,${1090 - br * 20}`; for (let x = -20; x <= 740; x += 24) fo += ` L${x},${(1090 - br * 20 + Math.sin(x * .05 + t * 3) * 5).toFixed(1)}`;
  s += `<path d="${fo}" stroke="#ffffff" stroke-width="${10 - br * 6}" fill="none" opacity="${.85 * (1 - br * .6)}"/><path d="${fo} L740,1110 L-20,1110Z" fill="#e8f4f4" opacity="${.35 * (1 - br)}"/>`;
  s += `<path d="M-20,1095 Q200,1080 400,1100 T740,1092 L740,1290 L-20,1290Z" fill="#6e6458" filter="url(#reliefR)"/><path d="M-20,1095 Q200,1080 400,1100 T740,1092 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".45"/><path d="M-20,1095 Q200,1080 400,1100 T740,1092 L740,1112 Q400,1120 -20,1112Z" fill="#2a2a2a" opacity=".35"/>`;
  [[150, 1180, 70, 18], [460, 1150, 90, 22], [600, 1230, 60, 16], [320, 1250, 80, 20]].forEach(([x, y, rx_, ry_], i) => { s += `<ellipse cx="${x}" cy="${y}" rx="${rx_ + 6}" ry="${ry_ + 4}" fill="#4a4238"/><ellipse cx="${x}" cy="${y}" rx="${rx_}" ry="${ry_}" fill="#5a8a9a"/><ellipse cx="${x - rx_ * .3}" cy="${y - ry_ * .3}" rx="${rx_ * .5}" ry="${ry_ * .3}" fill="#c8dce4" opacity=".5"/>`; });
  const tri = (x, y, sc) => `<g transform="translate(${x},${y}) scale(${sc})" opacity=".85"><ellipse cx="0" cy="0" rx="20" ry="12" fill="#6a5a44"/>` + Array.from({ length: 5 }, (_, q) => `<path d="M${-12 + q * 6},-11 L${-12 + q * 6},11" stroke="#3a2e22" stroke-width="1.4"/>`).join('') + `<path d="M-20,0 Q0,-16 20,0" stroke="#3a2e22" stroke-width="1.6" fill="none"/></g>`;
  s += tri(150, 1182, .9) + tri(470, 1152, 1) + tri(330, 1252, 1.1);
  s += `<g opacity="${ramp(t, WS(7, 12) - .2, WS(7, 12) + .3)}"><rect x="160" y="440" width="400" height="64" rx="16" fill="#0a0e1c" opacity=".8"/><text x="360" y="484" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#f4c76b">قبل ٤٦٦ مليون سنة</text></g>`;
  F.ov = ''; return s;
}
