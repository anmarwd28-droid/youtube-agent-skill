// fg_a.js (#70): what if people could never pass gas? Scenes, chips, list. Uses sk_a.js (gutView, rodB, SKD) and cv_a.js (bedP).
const FGL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arG = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
function bubbleS(x, y, r, a = 1) { return `<g opacity="${a.toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="#bfe6ff" opacity=".25"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="none" stroke="#e8f6ff" stroke-width="1.6" opacity=".8"/><circle cx="${(x - r * .35).toFixed(1)}" cy="${(y - r * .35).toFixed(1)}" r="${(r * .22).toFixed(1)}" fill="#fff" opacity=".8"/></g>`; }
// a belly that swells: drawn over a person standing at (x, y) of scale s, facing f
function belly(x, y, s, f, k, col) { if (k <= 0) return ''; const cx = x + f * 14 * s, cy = y - 190 * s, rx = (26 + 30 * k) * s, ry = (40 + 22 * k) * s; return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${ry.toFixed(1)}" fill="${col}"/><ellipse cx="${(cx + f * rx * .3).toFixed(1)}" cy="${(cy - ry * .35).toFixed(1)}" rx="${(rx * .35).toFixed(1)}" ry="${(ry * .25).toFixed(1)}" fill="#fff" opacity=".18"/><ellipse cx="${(cx - f * rx * .2).toFixed(1)}" cy="${(cy + ry * .3).toFixed(1)}" rx="${(rx * .7).toFixed(1)}" ry="${(ry * .4).toFixed(1)}" fill="#000" opacity=".15"/>`; }
// ---------- 0: hook: a street; one man's belly slowly puffs up like a balloon ----------
function sceneHook(t) {
  const k = ease(ramp(t, .8, S0(1) - .2)), P = gp(3);
  let top = hero(110 + t * 40, 1080, Object.assign({ s: .66, face: 1, shade: 1, walk: t * 4.2, amp: .4 }, gp(0))) + hero(650 - t * 40, 1090, Object.assign({ s: .7, face: -1, shade: 1, walk: t * 4 + 1, amp: .4 }, gp(4)));
  top += hero(380, 1150, Object.assign({ s: .95, face: 1, shade: 1, hF: [400 + 40 * k, 1150 - 190], hB: [392 + 30 * k, 1150 - 170] }, P)) + belly(380, 1150, .95, 1, k, P.top);
  noEarth(); F.ov = '';
  return `<defs>${SKD()}</defs>` + streetO(t, { id: 'g0', top, blocks: [[-12, 150, 440, '#a89a8a', 971, 2], [138, 160, 380, '#6a8296', 972, 0], [298, 150, 500, '#c8b494', 973, 1], [448, 148, 420, '#8a6a6a', 974, 2], [596, 160, 360, '#9aa48a', 975, 0]], shops: [[-4, 146, 'حلويات', '#c8603a'], [150, 140, 'مقهى', '#5a3a2a'], [298, 150, 'صيدليّة', '#1e8a5a'], [456, 132, 'ملابس', '#3a4a8a'], [596, 140, 'خضار', '#5a8a2a']] });
}
// ---------- 1: your body makes about a full litre of gas every day ----------
function sceneLitre(t) {
  const T = t - (S0(1) - .2), k = ease(ramp(t, WS(1, 4), WS(1, 9) + .4));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1e2836"/>` + scr(`<ellipse cx="360" cy="760" rx="360" ry="440" fill="#7ac8ff" opacity=".12" filter="url(#blur16)"/>`);
  // a one-litre lab flask filling with bubbly gas
  const cx = 360, by = 1120, top = 560, nh = 600, W = 230;
  s += `<rect x="-20" y="1120" width="760" height="180" fill="#3a3028"/><rect x="-20" y="1116" width="760" height="8" fill="#5a4a3a"/>`;
  const flask = `M${cx - 40},${top} V${nh} L${cx - W},${by - 20} Q${cx - W - 6},${by} ${cx - W + 20},${by} H${cx + W - 20} Q${cx + W + 6},${by} ${cx + W},${by - 20} L${cx + 40},${nh} V${top}Z`;
  s += `<defs><clipPath id="flC"><path d="${flask}"/></clipPath></defs><g clip-path="url(#flC)"><rect x="${cx - W}" y="${lerp(by, nh + 20, k).toFixed(1)}" width="${2 * W}" height="${by}" fill="#9ad0f0" opacity=".25"/>`;
  const r = RS(5); for (let i = 0; i < 70; i++) { const x = cx - W + r() * 2 * W, y0 = by - r() * (by - nh), ph = pmod(T * (.2 + r() * .3) + r(), 1), y = lerp(by, nh - 40, ph); if (y < lerp(by, nh + 20, k)) continue; s += bubbleS(x + Math.sin(T * 2 + i) * 4, y, 5 + r() * 12, .9); }
  s += `</g><path d="${flask}" fill="#dff0fa" opacity=".08"/><path d="${flask}" fill="none" stroke="#e8f4fa" stroke-width="5" opacity=".85"/><path d="M${cx - 60},${top} H${cx + 60}" stroke="#e8f4fa" stroke-width="8" stroke-linecap="round"/><path d="M${cx - W + 30},${by - 40} L${cx - 30},${nh + 30}" stroke="#fff" stroke-width="6" opacity=".25"/>`;
  for (let i = 1; i <= 4; i++) { const y = lerp(by, nh + 30, i / 4); s += `<path d="M${cx + 60},${y} h40" stroke="#e8f4fa" stroke-width="3" opacity=".7"/>`; }
  s += FGL(cx, 520, `${arG((k * 1000).toFixed(0))} مل`, 1, '#f4c76b', 44) + FGL(cx, 1200, 'كلَّ يوم', k, '#fff', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: trillions of gut bacteria make it while digesting your food ----------
function sceneGut(t) {
  const T = t - (S0(2) - .2);
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1c2430"/>` + gutView(360, 760, 300, t);
  const r = RS(9); for (let i = 0; i < 26; i++) { const x = 120 + r() * 480, ph = pmod(T * (.25 + r() * .25) + r(), 1), y = lerp(1000, 500, ph), d = Math.hypot(x - 360, y - 760); if (d > 290) continue; s += bubbleS(x + Math.sin(T * 3 + i) * 5, y, 6 + r() * 10, Math.min(1, (1 - ph) * 3)); }
  s += FGL(360, 1140, 'بكتيريا الأمعاء تصنعُ الغاز', ease(ramp(t, WS(2, 4), WS(2, 6))), '#f4c76b', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: people normally pass gas about 15 times a day ----------
function sceneDay(t) {
  const T = t - (S0(3) - .2), k = ease(ramp(t, WS(3, 3), S0(4) - .4)), n = Math.floor(k * 15);
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#202a3a"/>`;
  // a 24-hour dial with 15 small puffs placed around it
  const cx = 360, cy = 760, R = 230;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 30}" fill="#0a0e1c" opacity=".85"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a3448" stroke="#8aa0c8" stroke-width="4"/>`;
  for (let h = 0; h < 24; h++) { const a = h / 24 * 6.283 - 1.5708; s += `<path d="M${(cx + Math.cos(a) * R * .9).toFixed(1)},${(cy + Math.sin(a) * R * .9).toFixed(1)} L${(cx + Math.cos(a) * R).toFixed(1)},${(cy + Math.sin(a) * R).toFixed(1)}" stroke="#c8d4e8" stroke-width="${h % 6 ? 2 : 5}"/>`; }
  [[0, 'منتصف الليل'], [12, 'الظهر']].forEach(([h, tx]) => { const a = h / 24 * 6.283 - 1.5708; s += FGL(cx + Math.cos(a) * (R - 50), cy + Math.sin(a) * (R - 50) + 10, tx, 1, '#8aa0c8', 20); });
  const hs = [7.2, 8.1, 9.5, 10.8, 12.3, 13.1, 14.6, 15.4, 16.9, 17.8, 19.2, 20.1, 21.4, 22.6, 23.4];
  hs.forEach((h, i) => { if (i >= n) return; const a = h / 24 * 6.283 - 1.5708; s += bubbleS(cx + Math.cos(a) * (R - 18), cy + Math.sin(a) * (R - 18), 13); });
  const ha = (T * .9) % 1 * 6.283 - 1.5708; s += `<path d="M${cx},${cy} L${(cx + Math.cos(ha) * R * .7).toFixed(1)},${(cy + Math.sin(ha) * R * .7).toFixed(1)}" stroke="#f4c76b" stroke-width="6" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="12" fill="#f4c76b"/>`;
  s += `<text x="${cx}" y="${cy + 120}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="60" fill="#fff">${arG(n)}</text>` + FGL(cx, 1100, 'مرّةً في اليوم', k, '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: with no way out the gas builds up: the belly swells, pain and cramps ----------
function scenePain(t) {
  const T = t - (S0(4) - .2), k = ease(ramp(t, WS(4, 2), WS(4, 4) + .4)), p = ease(ramp(t, WS(4, 5), WS(4, 7) + .3)), P = gp(2);
  let s = `<defs>${SKD()}</defs>` + room(t, {});
  const x = 360, y = 1180, sc = 1.15;
  s += hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, lean: 10 * p, hF: [x + 40 * sc + 30 * k, y - 190 * sc], hB: [x + 30 * sc + 24 * k, y - 160 * sc] }, P)) + belly(x, y, sc, 1, .3 + .9 * k, P.top);
  if (p > 0) for (let i = 0; i < 5; i++) { const a = -1.2 + i * .6, cx = x + 30 + Math.cos(a) * 130, cy = y - 220 + Math.sin(a) * 110, j = Math.sin(t * 14 + i) * 4; s += `<path d="M${cx},${cy + j} l12,-14 l8,16 l12,-14" stroke="#ff4a3a" stroke-width="5" fill="none" stroke-linecap="round" opacity="${p.toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: part of the gas passes into the blood and leaves with your breath ----------
function sceneBreath(t) {
  const T = t - (S0(5) - .2), k = ease(ramp(t, WS(5, 4), WS(5, 9) + .3)), ex = ease(ramp(t, WS(5, 9), WS(5, 11) + .3)), P = gp(1);
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#1a2232"/>` + scr(`<ellipse cx="300" cy="760" rx="300" ry="480" fill="#7ac8ff" opacity=".1" filter="url(#blur16)"/>`);
  const x = 300, y = 1230, sc = 1.8;
  s += `<g opacity=".55">${hero(x, y, Object.assign({ s: sc, face: 1, shade: 1, noShadow: 1 }, P))}</g>`;
  // organs: the gut (coils), the lungs, a blood vessel between them
  const gx = x + 20, gy = 920, lx = 305, ly = 815, mx = 300, my = 718;   // chest, belly and mouth of the hero at s 1.8 (measured on the still)
  s += `<path d="M${gx - 44},${gy - 24} q18,-20 44,0 q26,20 44,0 M${gx - 44},${gy} q18,-20 44,0 q26,20 44,0 M${gx - 44},${gy + 24} q18,-20 44,0 q26,20 44,0" stroke="#e8a08a" stroke-width="12" fill="none" stroke-linecap="round"/>`;
  s += `<path d="M${lx},${ly - 40} V${my + 22}" stroke="#e8b0b8" stroke-width="8"/><ellipse cx="${lx - 22}" cy="${ly}" rx="22" ry="40" fill="#e88a9a" opacity=".9"/><ellipse cx="${lx + 22}" cy="${ly}" rx="22" ry="40" fill="#e88a9a" opacity=".9"/><path d="M${lx - 30},${ly - 20} q-8,22 2,44 M${lx + 30},${ly - 20} q8,22 -2,44" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/>`;
  const vessel = `M${gx + 60},${gy} C${gx + 130},${gy - 60} ${lx + 120},${ly + 40} ${lx + 60},${ly}`;
  s += `<path d="${vessel}" stroke="#c83030" stroke-width="12" fill="none" opacity="${clamp(k * 3).toFixed(2)}"/>`;
  // bubbles travel: gut → vessel → lungs → out of the mouth
  for (let i = 0; i < 8; i++) { const u = pmod(T * .35 + i / 8, 1) * k; let px, py; if (u < .6) { const v = u / .6, a = [gx + 60, gy], b = [gx + 130, gy - 60], c = [lx + 120, ly + 40], d = [lx + 60, ly]; const q = (p0, p1, p2, p3) => (1 - v) ** 3 * p0 + 3 * (1 - v) ** 2 * v * p1 + 3 * (1 - v) * v * v * p2 + v ** 3 * p3; px = q(a[0], b[0], c[0], d[0]); py = q(a[1], b[1], c[1], d[1]); } else { const v = (u - .6) / .4; px = lerp(lx, mx + 40 + 120 * v, v); py = lerp(ly - 40, my, Math.min(1, v * 1.4)); }
    s += bubbleS(px, py, 9, k); }
  if (ex > 0) for (let i = 0; i < 4; i++) { const ph = pmod(T * .6 + i / 4, 1); s += `<ellipse cx="${(mx + 40 + ph * 220).toFixed(1)}" cy="${(my - 10 - ph * 30).toFixed(1)}" rx="${(20 + ph * 60).toFixed(1)}" ry="${(12 + ph * 26).toFixed(1)}" fill="#e8f4ff" opacity="${(.35 * (1 - ph) * ex).toFixed(2)}" filter="url(#blur5)"/>`; }
  s += FGL(gx + 140, gy + 90, 'الأمعاء', 1, '#e8a08a', 24) + FGL(lx - 110, ly, 'الرئتان', 1, '#e88a9a', 24) + FGL(gx + 200, gy - 110, 'الدم', k, '#ff7a7a', 24) + FGL(560, my - 80, 'النَّفَس', ex, '#bfe6ff', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: doctors detect some digestive diseases by measuring hydrogen in the breath ----------
function sceneTest(t) {
  const T = t - (S0(6) - .2), bl = ease(ramp(t, WS(6, 1), WS(6, 3) + .4)), rd = ease(ramp(t, WS(6, 7), WS(6, 9) + .4));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skWall)"/><rect x="-20" y="960" width="760" height="340" fill="url(#skFloor)"/><rect x="-20" y="956" width="760" height="8" fill="#5a6a66"/>`;
  // a patient seated, blowing into a mouthpiece connected to a handheld analyser; a doctor reads it
    s += hero(190, 1180, Object.assign({ s: 1.0, face: 1, shade: 1, hF: [300, 880], hB: [290, 890] }, gp(4)));
  const [ex2, ey2] = HP.eye;
  s += `<path d="M${ex2 + 22},${ey2 + 18} L300,880" stroke="#e8eef2" stroke-width="10" stroke-linecap="round"/>` + `<g transform="translate(304,884)"><rect x="-10" y="-60" width="90" height="140" rx="14" fill="#eef2f6" stroke="#9aa4ac" stroke-width="3"/><rect x="2" y="-46" width="66" height="44" rx="5" fill="#1a2a22"/><text x="35" y="-16" text-anchor="middle" font-family="DejaVu Sans Mono,monospace" font-weight="700" font-size="20" fill="#9cf0b0">${rd > 0 ? Math.round(42 * rd) : '--'}</text><text x="35" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#3a4a5a" font-family="Inter">H₂ ppm</text><circle cx="35" cy="50" r="10" fill="#3a8ad8"/></g>`;
  if (bl > 0) for (let i = 0; i < 4; i++) { const ph = pmod(T * 1.2 + i / 4, 1); s += `<circle cx="${(270 + ph * 30).toFixed(1)}" cy="${(880 - ph * 6).toFixed(1)}" r="${(4 + ph * 6).toFixed(1)}" fill="#e8f4ff" opacity="${(.6 * (1 - ph) * bl).toFixed(2)}"/>`; }
  s += coatP(560, 1180, 1, -1, 2, t, { h: { hF: [500, 960], hB: [520, 980] } }) + `<rect x="476" y="930" width="44" height="60" rx="4" fill="#f4f4ec" stroke="#8a8a80" stroke-width="2"/>`;
  s += FGL(360, 1240, 'اختبارُ هيدروجينِ النَّفَس', rd, '#1a5a3a', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: but in this world some smells might come out of your mouth too ----------
function sceneSmell(t) {
  const T = t - (S0(7) - .2), k = ease(ramp(t, WS(7, 6), WS(7, 8) + .3)), back = ease(ramp(t, WS(7, 8), WS(7, 9) + .4));
  let s = `<defs>${SKD()}</defs>` + streetO(t, { id: 'g7', top: '', blocks: [[-12, 150, 440, '#a89a8a', 971, 2], [138, 160, 380, '#6a8296', 972, 0], [298, 150, 500, '#c8b494', 973, 1], [448, 148, 420, '#8a6a6a', 974, 2], [596, 160, 360, '#9aa48a', 975, 0]], shops: [[-4, 146, 'حلويات', '#c8603a'], [150, 140, 'مقهى', '#5a3a2a'], [298, 150, 'صيدليّة', '#1e8a5a'], [456, 132, 'ملابس', '#3a4a8a'], [596, 140, 'خضار', '#5a8a2a']] });
  s += hero(250, 1160, Object.assign({ s: 1, face: 1, shade: 1, aF: [.6 + .2 * Math.sin(t * 5), 1.1] }, gp(2)));
  const [mx, my] = HP.eye;
  for (let i = 0; i < 3; i++) { let d = ''; for (let j = 0; j <= 20; j++) { const u = j / 20; d += (j ? ' L' : 'M') + (mx + 20 + u * 150 * k).toFixed(1) + ',' + (my + 22 - i * 16 + Math.sin(u * 9 + t * 5 + i) * 8).toFixed(1); } s += `<path d="${d}" stroke="#8ac04a" stroke-width="5" fill="none" opacity="${(.8 * k).toFixed(2)}" stroke-linecap="round"/>`; }
  s += hero(500 + 30 * back, 1160, Object.assign({ s: 1, face: -1, shade: 1, lean: -14 * back, hF: [460 + 30 * back, 1160 - 330], bendF: 1 }, gp(5)));
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: in hospitals, after surgery, doctors wait for the patient to pass gas: a sign the gut works again ----------
function sceneSurgery(t) {
  const T = t - (S0(8) - .2), ok = ease(ramp(t, WS(8, 12), WS(8, 15) + .3));
  let s = `<defs>${SKD()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skWall)"/><rect x="-20" y="960" width="760" height="340" fill="url(#skFloor)"/><rect x="-20" y="956" width="760" height="8" fill="#5a6a66"/>`;
  s += `<rect x="40" y="520" width="240" height="280" fill="#cfe4f0"/><path d="M160,520 V800 M40,660 H280" stroke="#e8eef0" stroke-width="10"/><rect x="40" y="520" width="240" height="280" fill="none" stroke="#e8eef0" stroke-width="12"/>`;
  s += bedP(290, 1150, 1.05, { skin: '#c08a66', blanket: '#8ab0d0', o2: 0 });
  // a monitor and a drip
  s += `<rect x="540" y="560" width="140" height="110" rx="8" fill="#2a2e34"/><rect x="552" y="572" width="116" height="80" fill="#0a1a12"/>` + `<g transform="translate(0,0)">${ecg(556, 664, 620, t, 1).replace('stroke-width="4"', 'stroke-width="2"')}</g><path d="M610,670 V1150" stroke="#8a929a" stroke-width="6"/>`;
  s += coatP(560, 1190, 1, -1, 1, t, { h: { hF: [490, 980], hB: [510, 1000] } }) + `<rect x="466" y="950" width="44" height="60" rx="4" fill="#f4f4ec" stroke="#8a8a80" stroke-width="2"/>`;
  if (ok > 0) s += `<g opacity="${ok.toFixed(2)}">${panel(120, 420, 480, 130)}<path d="M180,490 l24,24 l44,-50" stroke="#4af09a" stroke-width="12" fill="none" stroke-linecap="round"/>${FGL(400, 500, 'الأمعاءُ تعملُ من جديد', 1, '#fff', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: herring talk in the dark sea with bubbles they release from behind, making a ticking sound ----------
function fishH(x, y, s, f, t, i) { const w = Math.sin(t * 8 + i) * 4; return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(f * s).toFixed(3)},${s})"><path d="M-40,0 Q-10,-18 30,-6 Q44,0 30,6 Q-10,18 -40,0Z" fill="#9ab4c8"/><path d="M-40,0 Q-20,-8 30,-4" stroke="#d8e8f4" stroke-width="3" fill="none"/><path d="M-38,0 L-58,${-12 + w} L-54,0 L-58,${12 + w}Z" fill="#7a94a8"/><circle cx="22" cy="-2" r="3" fill="#1a2a3a"/><path d="M-10,-10 Q0,-4 -6,6" stroke="#5a7488" stroke-width="2" fill="none"/></g>`; }
function sceneHerring(t) {
  const T = t - (S0(9) - .2), b = ease(ramp(t, WS(9, 7), WS(9, 9) + .3)), snd = ease(ramp(t, WS(9, 12), WS(9, 14)));
  let s = `<defs>${SKD()}<linearGradient id="seaD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a4a6a"/><stop offset="1" stop-color="#02080e"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#seaD)"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${i * 140 - 40},-20 L${i * 140 + 40},900" stroke="#bfe6ff" stroke-width="40" opacity=".05" filter="url(#blur9)"/>`;
  const r = RS(13); let fish = '';
  for (let i = 0; i < 26; i++) { const x0 = r() * 900 - 100, y = 520 + r() * 640, sp = 20 + r() * 20, x = pmod(x0 + T * sp, 900) - 100, sc = .6 + r() * .6; fish += fishH(x, y + Math.sin(T + i) * 6, sc, 1, t, i);
    if (b > 0 && i % 3 === 0) for (let j = 0; j < 4; j++) { const ph = pmod(T * .9 + j / 4 + i * .1, 1); fish += bubbleS(x - 56 * sc - ph * 20, y - ph * 90, 3 + ph * 4, b * (1 - ph)); } }
  s += fish;
  if (snd > 0) s += `<g opacity="${snd.toFixed(2)}">${panel(200, 400, 320, 100)}${FGL(360, 466, 'تك… تك… تك', 1, '#bfe6ff', 34)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 5) - .3, WS(10, 5) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneLitre }, { s: S0(2) - .2, f: sceneGut }, { s: S0(3) - .2, f: sceneDay }, { s: S0(4) - .2, f: scenePain },
  { s: S0(5) - .2, f: sceneBreath }, { s: S0(6) - .2, f: sceneTest }, { s: S0(7) - .2, f: sceneSmell }, { s: S0(8) - .2, f: sceneSurgery }, { s: S0(9) - .2, f: sceneHerring }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneLitre, sceneGut, sceneDay, sceneBreath]);
const XF = .5;
const TLI = [['الغازات', S0(1)], ['الانتفاخ', S0(4)], ['النَّفَس', S0(5)], ['الأطباء', S0(6)], ['المستشفى', S0(8)], ['الأغرب', S0(9)]];
const LIST_ON = new Set([scenePain]);
const CHIPS = [
  ['c0', 'بلا ريحٍ أبداً', 360, 330, 'big', WS(0, 3), S0(1) - .3],
  ['c1', 'نحوَ لترٍ كلَّ يوم', 360, 330, 'big', WS(1, 5), S0(2) - .3],
  ['c2', 'تريليوناتُ البكتيريا', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', 'نحوَ ١٥ مرّة يومياً', 360, 330, 'big', WS(3, 3), S0(4) - .3],
  ['c4', 'انتفاخٌ وألم', 360, 330, 'red big', WS(4, 4), S0(5) - .3],
  ['c5', 'تخرجُ مع النَّفَس', 360, 330, 'big', WS(5, 9), S0(6) - .3],
  ['c6', 'فحصُ الهيدروجين', 360, 330, 'big', WS(6, 7), S0(7) - .3],
  ['c7', 'روائحُ من الفم', 360, 330, 'red big', WS(7, 6), S0(8) - .3],
  ['c8', 'علامةُ الشفاء', 360, 330, 'big', WS(8, 12), S0(9) - .3],
  ['c9', 'أسماكُ الرَّنْكة', 360, 330, 'big', WS(9, 1), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 5) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">بلا ريح</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
