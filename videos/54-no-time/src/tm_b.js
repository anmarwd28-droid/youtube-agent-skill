// ---------- #54 scenes 5-7: the lost ships, Harrison's sea clock, the railways and Greenwich ----------
const TMDEF2 = `<linearGradient id="sailG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#cfc6b0"/><stop offset=".45" stop-color="#f4eedc"/><stop offset="1" stop-color="#bcb29a"/></linearGradient>` +
  `<linearGradient id="hullG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a22"/><stop offset="1" stop-color="#2a180c"/></linearGradient>` +
  `<linearGradient id="seaN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a52"/><stop offset=".3" stop-color="#16243a"/><stop offset="1" stop-color="#0a1424"/></linearGradient>` +
  `<linearGradient id="skyNF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset=".7" stop-color="#2a3448"/><stop offset="1" stop-color="#4a5468"/></linearGradient>` +
  `<linearGradient id="chartP" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ecdcb4"/><stop offset="1" stop-color="#d4bc8a"/></linearGradient>` +
  `<radialGradient id="silvR" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#d8dde2"/><stop offset=".75" stop-color="#9aa2aa"/><stop offset="1" stop-color="#5a626a"/></radialGradient>` +
  `<linearGradient id="boilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a3428"/><stop offset=".3" stop-color="#3a6a50"/><stop offset=".55" stop-color="#2a5040"/><stop offset="1" stop-color="#10201a"/></linearGradient>` +
  `<linearGradient id="carrG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a2a24"/><stop offset="1" stop-color="#4a1612"/></linearGradient>` +
  `<linearGradient id="seaDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7aa0bc"/><stop offset=".08" stop-color="#3a6a90"/><stop offset="1" stop-color="#16385a"/></linearGradient>` +
  `<radialGradient id="lanG"><stop offset="0" stop-color="#ffd890" stop-opacity=".8"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>`;
const TMDEFS2 = () => TMDEFS() + TMDEF2;
// an 18th-century sailing warship, waterline y=0, ~430 px long, facing +x
function tallShip(x, y, s, o = {}) {
  const rot = o.rot || 0, lit = o.lit ?? 0, wind = o.wind ?? 1;
  let g = '';
  // rigging behind the sails
  const M = [[-120, 300], [0, 360], [120, 290]];
  M.forEach(([mx, h]) => { g += `<path d="M${mx},${-h - 30} L-205,-62 M${mx},${-h - 30} L205,-48" stroke="#2a2018" stroke-width="1" opacity=".6"/>`; });
  g += `<path d="M120,-320 L300,-112 M0,-390 L120,-320" stroke="#2a2018" stroke-width="1.2" opacity=".7"/>`;
  // hull
  g += `<path d="M-215,-78 L-150,-72 L-140,-52 L150,-46 L212,-58 L232,-34 L196,26 L-186,26 L-212,-20Z" fill="url(#hullG)"/>` +
    `<path d="M-212,-40 L-150,-38 L150,-30 L222,-40" stroke="#c8a050" stroke-width="13" fill="none"/>` +
    Array.from({ length: 13 }, (_, i) => `<rect x="${-170 + i * 26}" y="${-42 + i * .6}" width="11" height="9" fill="#120a04"/>`).join('') +
    `<path d="M-212,-6 L200,4" stroke="#1a0e06" stroke-width="3" opacity=".7"/><path d="M-215,-78 L-150,-72 L-140,-52 L150,-46 L212,-58" stroke="#8a6a3a" stroke-width="3" fill="none"/>` +
    `<path d="M-215,-78 L-232,-72 L-226,-20 L-212,-20Z" fill="#3a2414"/>` +
    Array.from({ length: 4 }, (_, i) => `<rect x="${-208 + i * 15}" y="-70" width="9" height="12" fill="${lit ? '#ffd890' : '#8a7a5a'}" opacity="${lit ? .9 : .7}"/>`).join('');
  // bowsprit and jibs
  g += `<path d="M205,-50 L310,-118" stroke="#3a2414" stroke-width="7" stroke-linecap="round"/>`;
  g += `<path d="M300,-112 L132,-300 L170,-96Z" fill="url(#sailG)" opacity=".95"/><path d="M262,-86 L126,-250 L148,-80Z" fill="url(#sailG)" opacity=".9"/>`;
  // masts, yards and square sails (billowing with the wind)
  M.forEach(([mx, h], j) => {
    g += `<path d="M${mx},-50 L${mx},${-h - 40}" stroke="#4a2e18" stroke-width="${8 - j}" stroke-linecap="round"/>`;
    [[-70, -150, 74], [-160, -240, 64], [-250, -h + 20, 48]].forEach(([y1, y2, hw], k) => {
      if (y2 < -h - 20) return; const b = 14 * wind * (1 - k * .2);
      g += `<path d="M${mx - hw - 4},${y2} H${mx + hw + 4}" stroke="#3a2414" stroke-width="4"/>` +
        `<path d="M${mx - hw},${y2} Q${mx},${y2 + 8 + b * .4} ${mx + hw},${y2} Q${mx + hw + b * .9},${(y1 + y2) / 2} ${mx + hw * 1.04},${y1} Q${mx},${y1 + b} ${mx - hw * 1.04},${y1} Q${mx - hw + b * .3},${(y1 + y2) / 2} ${mx - hw},${y2}Z" fill="url(#sailG)"/>` +
        `<path d="M${mx - hw * .5},${y2 + 4} Q${mx - hw * .45 + b * .2},${(y1 + y2) / 2} ${mx - hw * .52},${y1 - 2} M${mx + hw * .5},${y2 + 4} Q${mx + hw * .55 + b * .3},${(y1 + y2) / 2} ${mx + hw * .52},${y1 - 2}" stroke="#a89a7e" stroke-width="1.4" fill="none" opacity=".6"/>`; });
    g += `<path d="M${mx},${-h - 40} l26,7 l-26,7Z" fill="#a8302a"/>`; });
  if (lit) g += `<circle cx="-222" cy="-92" r="40" fill="url(#lanG)" opacity="${lit}"/><rect x="-226" y="-100" width="8" height="12" rx="2" fill="#ffe8b0"/>`;
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">${g}</g>`;
}
function rocksF(x, y, s, seed) { const r = RS(seed); const P = []; for (let i = 0; i <= 12; i++) P.push([x - 140 * s + i * 23 * s, y - (i === 0 || i === 12 ? 0 : (50 + r() * 45) * s * Math.pow(Math.sin(i / 12 * Math.PI), .45))]);
  const d = 'M' + P.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' L') + 'Z';
  let e = ''; for (let i = 1; i < 12; i++) if (P[i][1] < P[i + 1][1]) e += `<path d="M${P[i][0].toFixed(1)},${P[i][1].toFixed(1)} L${P[i + 1][0].toFixed(1)},${P[i + 1][1].toFixed(1)} L${(P[i + 1][0] - 8 * s).toFixed(1)},${y} L${(P[i][0] - 4 * s).toFixed(1)},${y}Z" fill="#8a9ab4" opacity=".35"/>`;
  return `<path d="${d}" fill="#1e2632"/><path d="${d}" fill="#000" filter="url(#grainR)" opacity=".4"/>${e}<path d="${d.replace('Z', '')}" stroke="#a8b8d0" stroke-width="2" fill="none" opacity=".55"/>`; }
function foam(x, y, w, t, a) { let s = ''; for (let i = 0; i < 6; i++) { const p = (t * .8 + i / 6) % 1; s += `<ellipse cx="${(x + (i - 2.5) * w / 6).toFixed(1)}" cy="${(y - p * 12).toFixed(1)}" rx="${(w / 8 + p * 20).toFixed(1)}" ry="${(5 + p * 6).toFixed(1)}" fill="#e8f0f6" opacity="${(a * (1 - p) * .7).toFixed(2)}" filter="url(#blur2)"/>`; } return s; }
function fogB(y, t, a, sp, seed) { const r = RS(seed); let s = ''; for (let i = 0; i < 5; i++) s += `<ellipse cx="${(pmod(r() * 900 + t * sp, 1100) - 190).toFixed(1)}" cy="${(y + r() * 40).toFixed(1)}" rx="${(220 + r() * 120).toFixed(0)}" ry="${(30 + r() * 20).toFixed(0)}" fill="#c8d0dc" opacity="${(a * (.18 + r() * .12)).toFixed(2)}" filter="url(#soft)"/>`; return s; }
function nightSea(t, HZ) {
  let s = `<rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#skyNF)"/>`; const r = RS(41);
  for (let i = 0; i < 80; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * (HZ - 200)).toFixed(1)}" r="${(.5 + r()).toFixed(1)}" fill="#fff" opacity="${(.2 + r() * .4).toFixed(2)}"/>`;
  s += `<rect x="-20" y="${HZ}" width="760" height="${1300 - HZ}" fill="url(#seaN)"/>`;
  for (let row = 0; row < 26; row++) { const z = Math.pow(row / 25, 1.6), y = HZ + 4 + z * (1280 - HZ), w = 10 + 60 * z; for (let i = 0; i < 10; i++) { const x = pmod(i * 83 + row * 37 + t * (8 + z * 20) * (row % 2 ? 1 : -1), 800) - 40; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-3 - z * 4).toFixed(1)} ${w.toFixed(1)},0" stroke="#6a84a4" stroke-width="${(1 + z * 1.6).toFixed(1)}" fill="none" opacity="${(.18 + z * .2).toFixed(2)}"/>`; } }
  return s;
}
// ---------- 5: night, fog: the ship doesn't know where it is; it runs onto the rocks ----------
function sceneWreck(t) {
  const t0 = S0(5) - .2, T = t - t0, HZ = 760, hit = WS(5, 12), sk = ease(ramp(t, hit, hit + 2.4)), rk = ease(ramp(t, WS(5, 9) - .5, WS(5, 11)));
  const mk = ease(ramp(t, WS(5, 18) - .3, WS(5, 18) + .3));
  let s = `<defs>${TMDEFS2()}</defs>` + nightSea(t, HZ);
  s += `<circle cx="150" cy="440" r="120" fill="url(#lanG)" opacity=".18"/>` + moonPh(150, 440, 24, .45, 1);
  s += fogB(HZ - 20, t, 1, 10, 3);
  // the ship drifts right; then strikes the reef and rolls over, sinking
  const sx = 250 + T * 9 - sk * 10, sy = 1010 + sk * 150, rot = sk * 28;
  s += `<g opacity="${rk.toFixed(2)}">${rocksF(580, 1012, 1.15, 5)}${rocksF(720, 1020, .7, 7)}${foam(580, 1012, 300, t, 1.3)}${foam(720, 1020, 160, t + .4, 1)}</g>`;
  s += `<g opacity="${(1 - sk * .35).toFixed(2)}">${tallShip(sx, sy, .78, { rot, lit: 1 - sk, wind: 1 })}</g>`;
  s += `<rect x="-20" y="${(1010 + sk * 20).toFixed(1)}" width="760" height="400" fill="url(#seaN)" opacity="${(.2 + sk * .75).toFixed(2)}"/>`;
  s += foam(sx + 120, 1010, 260, t * 1.3, sk * (1 - ramp(t, hit + 3, hit + 4.5)));
  s += fogB(1060, t, .9, -14, 5) + fogB(880, t, .8, 12, 9);
  // where am I? a chart: where they thought they were, and where they really were
  const qa = ease(ramp(t, WS(5, 5) - .2, WS(5, 5) + .2)) * (1 - ease(ramp(t, WS(5, 9) - .3, WS(5, 9))));
  if (qa > 0) s += `<g opacity="${qa.toFixed(2)}">${[[-70, -40], [80, -70], [10, 60], [-120, 40]].map(([dx, dy], i) => lbl(sx + dx, 700 + dy, '؟', ease(ramp(t, WS(5, 5) + i * .15, WS(5, 5) + i * .15 + .2)), '#f4c76b', 60)).join('')}</g>`;
  if (mk > 0) { const px = 40, py = 400;
    s += `<g opacity="${mk.toFixed(2)}"><rect x="${px - 10}" y="${py - 10}" width="460" height="320" rx="14" fill="#0a0e1c" opacity=".85"/><rect x="${px}" y="${py}" width="440" height="300" rx="8" fill="url(#chartP)"/><rect x="${px}" y="${py}" width="440" height="300" rx="8" fill="#000" filter="url(#grainR)" opacity=".15"/>` +
      Array.from({ length: 5 }, (_, i) => `<path d="M${px + 20 + i * 100},${py} v300 M${px},${py + 30 + i * 60} h440" stroke="#a88a5a" stroke-width="1" opacity=".5"/>`).join('') +
      `<path d="M${px + 300},${py + 300} q10,-80 60,-110 q50,-20 80,-10 v120Z" fill="#b8a070" stroke="#6a5030" stroke-width="2"/>` + [[px + 236, py + 210], [px + 216, py + 236], [px + 250, py + 244]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#6a5030"/>`).join('');
    const ga = ease(ramp(t, WS(5, 19) - .1, WS(5, 19) + .3)), ra = ease(ramp(t, WS(5, 21) - .2, WS(5, 21) + .2));
    s += `<g opacity="${ga.toFixed(2)}"><circle cx="${px + 110}" cy="${py + 90}" r="26" fill="none" stroke="#2a6a3a" stroke-width="4" stroke-dasharray="7 5"/><circle cx="${px + 110}" cy="${py + 90}" r="6" fill="#2a6a3a"/>${lbl(px + 110, py + 150, 'حيثُ ظنّوا', 1, '#fff', 22)}</g>` +
      `<g opacity="${ra.toFixed(2)}"><path d="M${px + 132},${py + 108} L${px + 214},${py + 206}" stroke="#b0281a" stroke-width="3" stroke-dasharray="8 6"/><path d="M${px + 214},${py + 212} l-14,-14 M${px + 214},${py + 212} l-18,0" stroke="#b0281a" stroke-width="3"/><path d="M${px + 222},${py + 214} l20,20 M${px + 242},${py + 214} l-20,20" stroke="#b0281a" stroke-width="6" stroke-linecap="round"/>${lbl(px + 330, py + 160, 'مكانُهم الحقيقيّ', 1, '#ff8a7a', 22)}</g></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: John Harrison's sea clock: now the ship knows where it is ----------
function chronometer(cx, cy, R, t) {
  const sec = (t * 5) % 60;   // H4 beats five times a second
  let s = `<circle cx="${cx}" cy="${cy + 10}" r="${R + 26}" fill="#000" opacity=".35" filter="url(#blur9)"/>` +
    `<rect x="${cx - 16}" y="${cy - R - 44}" width="32" height="30" rx="6" fill="url(#chrG)"/><path d="M${cx - 34},${cy - R - 40} a34,34 0 0 1 68,0" stroke="url(#chrG)" stroke-width="9" fill="none"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${R + 22}" fill="url(#silvR)"/><circle cx="${cx}" cy="${cy}" r="${R + 22}" fill="none" stroke="#5a626a" stroke-width="2"/>` +
    Array.from({ length: 48 }, (_, i) => { const q = i / 48 * 6.2832; return `<path d="M${(cx + Math.cos(q) * (R + 14)).toFixed(1)},${(cy + Math.sin(q) * (R + 14)).toFixed(1)} L${(cx + Math.cos(q) * (R + 20)).toFixed(1)},${(cy + Math.sin(q) * (R + 20)).toFixed(1)}" stroke="#7a828a" stroke-width="2"/>`; }).join('') +
    `<circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="#c8ccd0"/>` + dialF(cx, cy, R, 10, 9 + sec / 60, { blue: 1, sec });
  // ornate centre decoration of the H4 dial
  s += `<g opacity=".55">${Array.from({ length: 8 }, (_, i) => { const q = i / 8 * 6.2832; return `<path d="M${cx},${cy} q${(Math.cos(q + .4) * R * .25).toFixed(1)},${(Math.sin(q + .4) * R * .25).toFixed(1)} ${(Math.cos(q) * R * .38).toFixed(1)},${(Math.sin(q) * R * .38).toFixed(1)}" stroke="#8a7a5a" stroke-width="2" fill="none"/>`; }).join('')}</g>`;
  return s;
}
function sceneH4(t) {
  const t0 = S0(6) - .2, T = t - t0, HZ = 820, ca = ease(ramp(t, WS(6, 3) - .3, WS(6, 3) + .3));
  let s = `<defs>${TMDEFS2()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#skyO)"/>` + sun3(560, 600, .8, '#ffe8c0') + cumulus(160 + T * 8, 480, 280, 91, { a: .85 }) + cumulus(560 + T * 6, 560, 200, 93, { a: .7 });
  s += `<rect x="-20" y="${HZ}" width="760" height="480" fill="url(#seaDay)"/>`;
  for (let row = 0; row < 26; row++) { const z = Math.pow(row / 25, 1.6), y = HZ + 4 + z * (1280 - HZ), w = 10 + 60 * z; for (let i = 0; i < 10; i++) { const x = pmod(i * 83 + row * 37 + T * (8 + z * 20) * (row % 2 ? 1 : -1), 800) - 40; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} q${(w / 2).toFixed(1)},${(-3 - z * 4).toFixed(1)} ${w.toFixed(1)},0" stroke="#d8eaf4" stroke-width="${(1 + z * 1.6).toFixed(1)}" fill="none" opacity="${(.22 + z * .25).toFixed(2)}"/>`; } }
  s += `<path d="M560,${HZ} L520,1290 L640,1290Z" fill="#fff4d8" opacity=".12" filter="url(#soft)"/>`;
  const bob = Math.sin(t * 1.6) * 3;
  s += tallShip(200 + T * 14, 1090 + bob, .8, { rot: Math.sin(t * 1.2) * 1.5, wind: 1.2 });
  s += `<path d="M${(110 + T * 14).toFixed(1)},1100 q120,14 320,6" stroke="#fff" stroke-width="4" fill="none" opacity=".35" filter="url(#blur2)"/>`;
  s += `<g opacity="${ca.toFixed(2)}">${chronometer(470, 560, 112, t)}${panel(330, 730, 280, 70)}${lbl(470, 774, 'ساعةُ هاريسون ١٧٦١', 1, '#f4c76b', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7a: the railways: every town on its own time ----------
function loco(x, y, t, s = 1) {   // a steam engine + tender, front at +x, rail at y=0; ~360 px long
  let g = `<rect x="-170" y="-150" width="110" height="120" rx="6" fill="#2a4a3a"/><rect x="-162" y="-140" width="94" height="10" fill="#c8a050"/><rect x="-160" y="-110" width="90" height="70" rx="4" fill="#1a2a22"/>`;   // tender
  g += `<rect x="-50" y="-190" width="90" height="150" rx="6" fill="#2a4a3a"/><rect x="-36" y="-174" width="62" height="54" rx="6" fill="#d8e0e4" opacity=".75"/><rect x="-58" y="-200" width="106" height="14" rx="5" fill="#1a1e1c"/>`;   // cab
  g += `<rect x="40" y="-150" width="190" height="88" rx="40" fill="url(#boilG)"/>` + [80, 130, 180].map(bx => `<rect x="${bx}" y="-151" width="6" height="90" fill="#c8a050"/>`).join('');
  g += `<rect x="220" y="-160" width="56" height="110" rx="10" fill="#141816"/><rect x="236" y="-218" width="26" height="62" fill="#141816"/><rect x="230" y="-226" width="38" height="12" rx="3" fill="#141816"/>`;   // smokebox and chimney
  g += `<path d="M120,-150 q0,-36 26,-36 q26,0 26,36Z" fill="#c8a050"/><path d="M128,-160 q6,-18 18,-20" stroke="#fff" stroke-width="3" opacity=".4" fill="none"/>`;   // brass dome
  g += `<circle cx="282" cy="-110" r="12" fill="#fff4c8"/><path d="M270,-40 L300,-4 L250,-4Z" fill="#141816"/><rect x="40" y="-62" width="240" height="20" fill="#1a1e1c"/>`;
  const wr = (t * 260) % 360;
  [[-140, 22], [-90, 22], [70, 38], [150, 38], [240, 24]].forEach(([wx, r]) => { g += `<circle cx="${wx}" cy="${-r}" r="${r}" fill="#8a1a14"/><circle cx="${wx}" cy="${-r}" r="${r - 4}" fill="none" stroke="#1a0a08" stroke-width="3"/><g transform="rotate(${wr.toFixed(0)},${wx},${-r})">${Array.from({ length: 8 }, (_, i) => { const q = i / 8 * 6.2832; return `<path d="M${wx},${-r} L${(wx + Math.cos(q) * (r - 4)).toFixed(1)},${(-r + Math.sin(q) * (r - 4)).toFixed(1)}" stroke="#1a0a08" stroke-width="2.4"/>`; }).join('')}</g><circle cx="${wx}" cy="${-r}" r="5" fill="#c8a050"/>`; });
  const a = wr * Math.PI / 180, p1 = [70 + Math.cos(a) * 18, -38 + Math.sin(a) * 18], p2 = [150 + Math.cos(a) * 18, -38 + Math.sin(a) * 18];
  g += `<path d="M${p1[0].toFixed(1)},${p1[1].toFixed(1)} L${p2[0].toFixed(1)},${p2[1].toFixed(1)}" stroke="#b8bcc0" stroke-width="7" stroke-linecap="round"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function carriage(x, y, s = 1) { let g = `<rect x="-180" y="-150" width="350" height="116" rx="8" fill="url(#carrG)"/><rect x="-186" y="-162" width="362" height="18" rx="9" fill="#2a2420"/><rect x="-180" y="-60" width="350" height="8" fill="#c8a050" opacity=".7"/>`;
  for (let i = 0; i < 6; i++) g += `<rect x="${-166 + i * 56}" y="-132" width="40" height="50" rx="5" fill="#cfd8de" opacity=".7"/>`;
  [-130, -90, 90, 130].forEach(wx => g += `<circle cx="${wx}" cy="-18" r="18" fill="#2a2420"/><circle cx="${wx}" cy="-18" r="6" fill="#8a8a8a"/>`);
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`; }
function stationClock(x, y, R, hh, mm, name, a) {
  return `<g opacity="${a.toFixed(2)}"><path d="M${x},${y - R - 70} v${70 - 6}" stroke="#2a2a2e" stroke-width="5"/><circle cx="${x}" cy="${y}" r="${R + 8}" fill="#1a1c20"/>${dialF(x, y, R, hh, mm, { num: 0 })}${panel(x - 82, y + R + 18, 164, 46)}${lbl(x, y + R + 50, name, 1, '#fff', 24)}</g>`; }
function sceneRail(t) {
  const t0 = S0(7) - .2, T = t - t0, arr = ease(ramp(t, t0, WS(7, 3) + .2)), lx = lerp(-320, 380, arr), ca = ease(ramp(t, WS(7, 3) - .2, WS(7, 4) + .2));
  let s = `<defs>${TMDEFS2()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skyO)"/>` + farCity(77, 880, '#8a94a4');
  // the iron and glass train shed
  s += `<path d="M-40,560 Q360,330 760,560 L760,600 Q360,380 -40,600Z" fill="#3a3e46"/>` + Array.from({ length: 9 }, (_, i) => { const x = -20 + i * 95; return `<path d="M${x},${560 - Math.sin((i / 8) * Math.PI) * 220} L${x},${600 - Math.sin((i / 8) * Math.PI) * 200}" stroke="#2a2e34" stroke-width="3"/>`; }).join('') +
    `<path d="M-40,600 Q360,380 760,600" stroke="#5a5e66" stroke-width="3" fill="none"/>` + [40, 680].map(x => `<rect x="${x - 10}" y="580" width="20" height="440" fill="#3a3e46"/><rect x="${x - 16}" y="1010" width="32" height="14" fill="#2a2e34"/>`).join('');
  // track and the train arriving from the left (the engine brakes to a stop)
  s += `<rect x="-20" y="${940}" width="760" height="80" fill="#5a544c"/><path d="M-20,1000 H740" stroke="#8a8a8e" stroke-width="5"/><path d="M-20,988 H740" stroke="#6a6a6e" stroke-width="3"/>` + Array.from({ length: 20 }, (_, i) => `<rect x="${i * 40 - 10}" y="996" width="26" height="8" fill="#3a2a1e"/>`).join('');
  s += carriage(lx - 640, 1000, 1) + loco(lx, 1000, travel(t, t0, WS(7, 2), WS(7, 3) + .2), 1);
  for (let i = 0; i < 6; i++) { const p = (T * .45 + i / 6) % 1, px = lx + 249 - p * 160 * (1 - arr * .7) - (1 - arr) * 40, py = 772 - p * 130; s += cumulus(px, py, 70 + p * 140, 101 + i, { a: (1 - p) * .75 }); }
  // the platform
  s += `<rect x="-20" y="1020" width="760" height="280" fill="#9a948a"/><rect x="-20" y="1020" width="760" height="14" fill="#e2ddd0"/><rect x="-20" y="1020" width="760" height="280" fill="#000" filter="url(#grainR)" opacity=".25"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M-20,${1060 + i * 40} H740" stroke="#7a746a" stroke-width="1.5" opacity=".6"/>`).join('');
  s += man(120, 1220, .95, 1, 2) + man(600, 1236, .92, -1, 7, { lookUp: 1 }) + man(470, 1250, .9, -1, 0);
  // two station clocks that disagree (towns kept their own local solar time)
  s += stationClock(200, 680, 58, 12, 0, 'لندن', ca) + stationClock(520, 680, 58, 11, 50, 'بريستول', ease(ramp(t, WS(7, 4), WS(7, 4) + .3)));
  s += `<g opacity="${ease(ramp(t, WS(7, 5) - .1, WS(7, 5) + .3)).toFixed(2)}">${lbl(360, 700, '≠', 1, '#ff6a5a', 64)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7b: the world agrees on one line: Greenwich ----------
function sceneGreenwich(t) {
  const t0 = WS(7, 7) - .25, T = t - t0, ma = ease(ramp(t, WS(7, 9) - .2, WS(7, 11) + .2));
  const G = gAt(t, 360, 720, { d: lerp(5.4, 5.0, ease(clamp(T / 2.4))), el: .55, lon: 4 - T * 1.2, clouds: .3, lights: .2, off: -.6, up: .5 });
  let o = `<defs>${TMDEFS2()}</defs>`;
  for (let lo = -165; lo <= 180; lo += 15) { if (lo === 0) continue; const p = gPath(G, [[-80, lo], [-40, lo], [0, lo], [40, lo], [80, lo]]); if (p.d) o += `<path d="${p.d}" stroke="#fff" stroke-width="1.4" fill="none" opacity="${(.3 * ease(ramp(t, t0, t0 + .6))).toFixed(2)}"/>`; }
  const pts = [[-80, 0], [-60, 0], [-40, 0], [-20, 0], [0, 0], [20, 0], [40, 0], [51.48, 0], [60, 0], [80, 0]], gp = gPath(G, pts);
  if (gp.d) o += `<path d="${partD(gp.d.trim(), ma)}" stroke="#2a1a00" stroke-width="9" fill="none" opacity=".5"/><path d="${partD(gp.d.trim(), ma)}" stroke="#f4c76b" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  const [gx, gy] = G.P(51.48, 0); o += `<circle cx="${gx.toFixed(1)}" cy="${gy.toFixed(1)}" r="7" fill="#fff" opacity="${ma.toFixed(2)}"/>` + lbl(gx - 70, gy - 14, 'غرينتش', ma, '#f4c76b', 28);
  F.ov = o; return space(t);
}
