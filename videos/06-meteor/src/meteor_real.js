// ===== realistic shots 2 (entry), 3 (impact) and 4 (crater) =====
const RS = s => { const r = R(s * 7919 + 13); r(); return r; };
function pine(x, y, h, seed, col, rim = null, bend = 0, strip = 0) {
  const r = RS(seed); let o = `<g transform="translate(${x},${y}) rotate(${bend})">`;
  o += `<path d="M${-h * .018},0 L${-h * .008},${-h * .95} L${h * .008},${-h * .95} L${h * .018},0Z" fill="${col}"/>`;
  const tiers = 9;
  for (let i = 0; i < tiers; i++) { const u = i / tiers, yb = -h * (.12 + u * .8), w = h * (.3 * Math.pow(1 - u, 1.1) + .035) * (1 - strip * (.6 + .4 * r())), ht = h * .16;
    if (w < 1) continue;
    let pts = [`${(r() - .5) * 3},${yb - ht}`]; const n = 9;
    for (let k = 0; k <= n; k++) { const v = k / n, px = -w + v * 2 * w, droop = (k % 2 ? ht * .16 : -ht * .02) + r() * ht * .1; pts.push(`${px + (r() - .5) * w * .12},${yb + droop}`); }
    o += `<polygon points="${pts.join(' ')}" fill="${col}"/>`;
    if (rim) o += `<path d="M${(r() - .5) * 3},${yb - ht} L${w * .95},${yb + ht * .1}" stroke="${rim}" stroke-width="1.6" opacity=".55"/>`; }
  return o + `</g>`;
}
function fireballReal(hx, hy, dx, dy, len, w, t, a = 1, frag = 1) {
  const n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, nx = -uy, ny = ux, fl = 1 + .12 * Math.sin(t * 37) + .07 * Math.sin(t * 23), tx = hx - ux * len, ty = hy - uy * len;
  const id = 'fr' + Math.round(len) + Math.round(w);
  let o = `<g opacity="${a}"><defs><linearGradient id="${id}a" gradientUnits="userSpaceOnUse" x1="${hx}" y1="${hy}" x2="${tx}" y2="${ty}"><stop offset="0" stop-color="#fffef4"/><stop offset=".08" stop-color="#fff0b0"/><stop offset=".3" stop-color="#ff9a30"/><stop offset=".7" stop-color="#b0300a" stop-opacity=".6"/><stop offset="1" stop-color="#5a1004" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="${id}g"><stop offset="0" stop-color="#ffffff"/><stop offset=".12" stop-color="#fff6d0" stop-opacity=".95"/><stop offset=".35" stop-color="#ffc060" stop-opacity=".55"/><stop offset=".7" stop-color="#ff7020" stop-opacity=".18"/><stop offset="1" stop-color="#ff4010" stop-opacity="0"/></radialGradient></defs>`;
  // billowing smoke trail lit from inside
  const r = RS(Math.round(len)); let sm = '';
  for (let i = 0; i < 40; i++) { const u = i / 40, px = hx - ux * len * u * 1.15 + nx * Math.sin(u * 9 + t * .6) * w * 4 * u, py = hy - uy * len * u * 1.15 + ny * Math.sin(u * 9 + t * .6) * w * 4 * u, rr = w * (1.5 + u * 9) * (.8 + .4 * r());
    sm += `<circle cx="${px}" cy="${py}" r="${rr}" fill="${mix('#c86a3a', '#3a3030', Math.min(1, u * 1.6))}" opacity="${(1 - u) * .55}"/>`; }
  o += `<g filter="url(#soft)">${sm}</g>`;
  // plasma trail
  o += `<polygon points="${hx + nx * w * 1.2},${hy + ny * w * 1.2} ${tx + nx * w * 3},${ty + ny * w * 3} ${tx - nx * w * 3},${ty - ny * w * 3} ${hx - nx * w * 1.2},${hy - ny * w * 1.2}" fill="url(#${id}a)" filter="url(#blur2)"/>` +
    `<line x1="${hx}" y1="${hy}" x2="${hx - ux * len * .5}" y2="${hy - uy * len * .5}" stroke="#fffbe8" stroke-width="${w * .7}" opacity=".8" filter="url(#blur1)" stroke-linecap="round"/>`;
  // fragments breaking off
  if (frag) for (let i = 0; i < 6; i++) { const u = .12 + i * .07 + pmod(t * .3 + i * .17, .05), ox = (r() - .5) * w * 6, fx = hx - ux * len * u + nx * ox, fy = hy - uy * len * u + ny * ox;
    o += `<line x1="${fx}" y1="${fy}" x2="${fx - ux * w * 6}" y2="${fy - uy * w * 6}" stroke="#ffd080" stroke-width="${w * .3}" opacity=".9" stroke-linecap="round"/><circle cx="${fx}" cy="${fy}" r="${w * .35}" fill="#fff8e0"/>`; }
  // head: blinding core and layered glow
  o += `<circle cx="${hx}" cy="${hy}" r="${w * 14 * fl}" fill="url(#${id}g)"/><circle cx="${hx}" cy="${hy}" r="${w * 2.2 * fl}" fill="#fffef6" filter="url(#blur1)"/><circle cx="${hx}" cy="${hy}" r="${w * 1.2}" fill="#ffffff"/>`;
  // lens streak
  o += `<line x1="${hx - 260}" y1="${hy}" x2="${hx + 260}" y2="${hy}" stroke="#fff4d8" stroke-width="2" opacity="${.35 * fl}" filter="url(#blur1)"/>`;
  return o + `</g>`;
}
// shot 2: the fireball tears across a dusk sky over a valley town and a pine forest; shadows swing
function sceneEntry(t) {
  const st = S0(2) - .2, u = ease(ramp(t, st, S0(3) + .4)), br = ease(ramp(t, WS(2, 7) - .6, WS(2, 9) + .3));
  const hx = lerp(820, 300, u), hy = lerp(140, 640, u);
  let s = `<defs><linearGradient id="skE2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#141c3a', '#f8e8d0', br * .85)}"/><stop offset=".45" stop-color="${mix('#5a3a5a', '#fff0d8', br * .85)}"/><stop offset=".75" stop-color="${mix('#d8704a', '#fff6e8', br * .9)}"/><stop offset="1" stop-color="${mix('#f0a868', '#ffffff', br)}"/></linearGradient>` +
    `<filter id="hillT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .08" numOctaves="4" seed="21"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>` +
    `<rect width="720" height="1280" fill="url(#skE2)"/>` + stars(.6 * (1 - br), t);
  s += `<g filter="url(#blur2)" opacity="${.6 - .3 * br}">` + Array.from({ length: 6 }, (_, i) => { const r = RS(i + 70); return `<ellipse cx="${r() * 760}" cy="${300 + r() * 300}" rx="${120 + r() * 140}" ry="${10 + r() * 10}" fill="${mix('#c8706a', '#fff8f0', br)}"/>`; }).join('') + `</g>`;
  s += fireballReal(hx, hy, -520, 500, 820, 12 + 10 * u, t);
  // distant mountains, valley haze, a small town with lit windows
  s += `<path d="M-20,760 L80,700 L160,740 L260,660 L360,730 L460,680 L560,740 L660,690 L740,720 L740,840 L-20,840Z" fill="${mix('#2a2438', '#a89888', br)}"/><path d="M-20,760 L80,700 L160,740 L260,660 L360,730 L460,680 L560,740 L660,690 L740,720 L740,840 L-20,840Z" fill="#000" filter="url(#hillT)" opacity=".5"/>`;
  s += `<rect y="780" width="720" height="90" fill="${mix('#4a3a4a', '#fff0e0', br)}" opacity=".45" filter="url(#haze)"/>`;
  s += `<path d="M-20,830 C200,815 500,830 740,815 L740,1300 L-20,1300Z" fill="${mix('#1e1c18', '#6a5a48', br)}"/>`;
  [[400, 50, 46], [456, 40, 62], [502, 64, 38], [572, 44, 54], [622, 56, 40]].forEach(([x, w, h], i) => { s += `<rect x="${x}" y="${838 - h}" width="${w}" height="${h}" fill="${mix('#16161c', '#4a4038', br)}"/><polygon points="${x - 4},${838 - h} ${x + w / 2},${838 - h - 18} ${x + w + 4},${838 - h}" fill="${mix('#121218', '#3a3028', br)}"/>` +
    `<rect x="${x + 10}" y="${838 - h + 14}" width="9" height="11" fill="#ffcf87" opacity="${.9 * (1 - br)}"/>` + (i % 2 ? `<rect x="${x + w - 20}" y="${838 - h + 14}" width="9" height="11" fill="#ffcf87" opacity="${.8 * (1 - br)}"/>` : ''); });
  // forest band with depth: far small pines, then a big near row with rim light from the fireball
  for (let i = 0; i < 40; i++) s += pine(i * 19 - 10, 846, 50 + (i * 37) % 26, i + 10, mix('#14161a', '#3a3428', br * .7));
  const rim = mix('#ff9a5a', '#fff2c8', br), sa = Math.atan2(1040 - hy, 300 - hx);
  for (let i = 0; i < 9; i++) { const x = 40 + i * 82, h = 230 + (i * 53) % 110;
    s += `<path d="M${x},1060 L${x + Math.cos(sa) * 380 * br},${1060 + Math.sin(sa) * 50 * br}" stroke="#000" stroke-width="30" opacity="${.35 * br}" stroke-linecap="round" filter="url(#blur2)"/>` + pine(x, 1062, h, i + 200, '#0a0c0e', rim); }
  s += `<path d="M-20,1060 C200,1050 500,1066 740,1052 L740,1300 L-20,1300Z" fill="#0c0e10"/>`;
  s += `<rect width="720" height="1280" fill="#fff6e0" opacity="${.3 * br}"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// shot 3: impact: white flash, a rising, cooling fireball that becomes a mushroom, an ejecta curtain, a shock ring, trees bending and stripped
function sceneImpact(t) {
  const it = W(3, 1)[1] + .1, k = clamp((t - it) / 6.5), flash = Math.max(0, 1 - (t - it) / .7) * (t > it ? 1 : 0);
  let s = `<defs><linearGradient id="skI2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#6a3a2a', '#2a1810', k)}"/><stop offset=".65" stop-color="${mix('#ffb060', '#8a3a1a', k)}"/><stop offset="1" stop-color="${mix('#fff0c8', '#c86a2a', k)}"/></linearGradient>` +
    `<filter id="billow" x="-20%" y="-20%" width="140%" height="140%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="3" seed="${5 + Math.floor(t * 6) % 30}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="40"/></filter>` +
    `<filter id="groundT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .1" numOctaves="4" seed="5"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.5 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>` +
    `<rect width="720" height="1280" fill="url(#skI2)"/>`;
  const HX = 360, HY = 760;
  if (t > it) {
    // ejecta curtain: an inverted cone of debris
    const r = RS(17); let ej = ''; for (let i = 0; i < 160; i++) { const a = -Math.PI / 2 + (r() - .5) * 1.5, d = (k * 900 + 40) * (.3 + .7 * r()), px = HX + Math.cos(a) * d, py = HY + Math.sin(a) * d * .9 + k * k * 300 * r();
      ej += `<circle cx="${px}" cy="${py}" r="${1.5 + r() * 4}" fill="${r() > .3 ? '#2a1a12' : '#ffb060'}" opacity="${.85 * (1 - k * .5)}"/>`; }
    s += ej;
    // the fireball / mushroom: puffs that rise, expand and cool from white to orange to dark smoke
    const rise = k * 520, R0 = 140 + k * 300; let pf = '';
    for (let i = 0; i < 46; i++) { const a = r() * 6.283, d = Math.sqrt(r()), stem = i < 14, cx = HX + (stem ? (r() - .5) * 80 * (.4 + k) : Math.cos(a) * d * R0), cy = stem ? HY - r() * rise : HY - rise + Math.sin(a) * d * R0 * .55, rr = (stem ? 50 : 70) * (.6 + .8 * r()) * (.5 + k);
      const heat = clamp(1 - k * 1.3 - d * .3); const c = heat > .6 ? mix('#ffd890', '#ffffff', (heat - .6) / .4) : heat > .2 ? mix('#c8501a', '#ffd890', (heat - .2) / .4) : mix('#2a201c', '#c8501a', heat / .2);
      pf += `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${c}" opacity="${.92}"/>`; }
    s += `<g filter="url(#billow)">${pf}</g>`;
    s += `<circle cx="${HX}" cy="${HY - rise * .9}" r="${R0 * 1.4}" fill="url(#fireGlow)" opacity="${.7 * (1 - k)}"/>`;
    // condensation shock ring racing outward
    const sr = 60 + Math.min(1, k * 3) * 900; if (k < .5) s += `<ellipse cx="${HX}" cy="${HY - 40}" rx="${sr}" ry="${sr * .2}" fill="none" stroke="#fff" stroke-width="${8 * (1 - k * 2)}" opacity="${.7 * (1 - k * 2)}" filter="url(#blur2)"/>`;
  }
  // ground + horizon forest blown flat
  s += `<path d="M-20,${HY} L740,${HY} L740,1300 L-20,1300Z" fill="#4a3826"/><path d="M-20,${HY} L740,${HY} L740,1300 L-20,1300Z" fill="#000" filter="url(#groundT)" opacity=".7"/>`;
  const blown = t > it + .25;
  for (let i = 0; i < 46; i++) { const x = i * 16 - 10; s += pine(x, HY + 4, 30 + (i * 37) % 16, i + 600, '#140e0a', null, blown ? (x < HX ? -78 : 78) : 0, blown ? .7 : 0); }
  const wave = t > it ? HY + Math.min(1, Math.pow(k * 1.35, .9)) * 620 : -1;
  if (wave > 0) { s += `<rect x="-20" y="${wave - 160}" width="760" height="190" fill="#c8a070" opacity="${.6 * (1 - k * .4)}" filter="url(#haze)"/><path d="M-20,${wave} Q360,${wave - 30} 740,${wave}" stroke="#fff0d0" stroke-width="10" fill="none" opacity="${.7 * (1 - k * .6)}" filter="url(#blur2)"/>`;
    const r2 = RS(4242); for (let i = 0; i < 60; i++) s += `<circle cx="${r2() * 720}" cy="${wave - r2() * 180}" r="${2 + r2() * 5}" fill="#5a3a22" opacity=".75"/>`; }
  [[80, 1240, 400], [250, 1270, 320], [480, 1255, 440], [650, 1275, 350]].forEach(([x, y, h], i) => { const hit = wave > y - 80 ? Math.min(1, (wave - y + 80) / 140) : 0, ang = hit * 58 + Math.sin(t * 22 + i) * 3 * hit;
    s += pine(x, y, h, i + 900, '#0c0a08', mix('#ff9a5a', '#fff0c8', 1 - k), ang, hit * .8); });
  F.flash = flash * .95;
  F.ov = '';
  return s;
}
// shot 4: aerial view: relief-lit terrain, a 180 km crater with lit and shadowed walls, central peak, glowing melt, fires and smoke
function sceneCrater(t) {
  const st = S0(4) - .2, z = ease(ramp(t, st, st + 6)), blast = ease(ramp(t, WS(4, 6), WS(4, 10) + .5));
  const cx = 360, cy = 720, R0 = lerp(220, 255, z);
  let s = `<defs><filter id="relief" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".006 .007" numOctaves="6" seed="12" result="n"/><feDiffuseLighting in="n" surfaceScale="9" lighting-color="#ffffff" result="l"><feDistantLight azimuth="225" elevation="38"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1.25" k2="0" k3="0" k4="0"/></filter>` +
    `<filter id="reliefB" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="5" seed="31" result="n"/><feDiffuseLighting in="n" surfaceScale="5" lighting-color="#ffffff" result="l"><feDistantLight azimuth="225" elevation="40"/></feDiffuseLighting><feComposite in="l" in2="SourceGraphic" operator="arithmetic" k1="1.2" k2="0" k3="0" k4="0"/></filter>` +
    `<radialGradient id="flr" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a3a"/><stop offset=".14" stop-color="#9a3a14"/><stop offset=".4" stop-color="#4a3424"/><stop offset="1" stop-color="#5a4632"/></radialGradient>` +
    `<linearGradient id="rimG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d8c4a0"/><stop offset=".5" stop-color="#8a7456"/><stop offset="1" stop-color="#3a2c1e"/></linearGradient>` +
    `<clipPath id="crC"><ellipse cx="${cx}" cy="${cy}" rx="${R0}" ry="${R0 * .9}"/></clipPath></defs>`;
  // terrain
  s += `<rect width="720" height="1280" fill="#5e6e3e" filter="url(#relief)"/>`;
  // flattened forest: radial streaks reach outward with the blast, fires scattered
  const rr = RS(901); let fs = ''; for (let i = 0; i < 700; i++) { const a = rr() * 6.28, d = R0 * (1.25 + rr() * 2.4), reach = R0 * (1.2 + blast * 2.6), hit = d < reach, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * .9;
    fs += hit ? `<line x1="${x}" y1="${y}" x2="${x + Math.cos(a) * 9}" y2="${y + Math.sin(a) * 8}" stroke="#3a2a18" stroke-width="2" opacity=".7"/>` : `<circle cx="${x}" cy="${y}" r="2.6" fill="#2e4a1e" opacity=".8"/>`; }
  s += fs;
  for (let i = 0; i < 26; i++) { const r2 = RS(i + 50), a = r2() * 6.28, d = R0 * (1.3 + r2() * 1.6 * blast), x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * .9, f = .6 + .4 * Math.sin(t * 7 + i);
    s += `<circle cx="${x}" cy="${y}" r="${7 * f}" fill="#ffb040" opacity="${.85 * blast}"/><circle cx="${x}" cy="${y}" r="20" fill="#ff7a20" opacity="${.25 * blast}" filter="url(#blur2)"/>`; }
  if (blast > 0 && blast < 1) s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * (1.2 + blast * 2.6)}" ry="${R0 * (1.2 + blast * 2.6) * .9}" fill="none" stroke="#e8d0a0" stroke-width="12" opacity="${.6 * (1 - blast)}" filter="url(#blur2)"/>`;
  // ejecta blanket with rays
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * 1.45}" ry="${R0 * 1.32}" fill="#7a6248" opacity=".75" filter="url(#blur2)"/>`;
  for (let i = 0; i < 18; i++) { const a = i / 18 * 6.283 + .2; s += `<path d="M${cx + Math.cos(a) * R0 * 1.1},${cy + Math.sin(a) * R0} L${cx + Math.cos(a + .05) * R0 * 2.1},${cy + Math.sin(a + .05) * R0 * 1.9} L${cx + Math.cos(a - .05) * R0 * 2.1},${cy + Math.sin(a - .05) * R0 * 1.9}Z" fill="#8a7458" opacity=".35"/>`; }
  // raised rim lit from the upper-left
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * 1.12}" ry="${R0 * 1.01}" fill="url(#rimG)"/><ellipse cx="${cx}" cy="${cy}" rx="${R0 * 1.12}" ry="${R0 * 1.01}" fill="#8a7456" filter="url(#reliefB)" opacity=".6"/>`;
  // crater bowl: floor, inner shadow on the upper-left wall, light on the lower-right wall, terraces
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0}" ry="${R0 * .9}" fill="url(#flr)"/><g clip-path="url(#crC)">` +
    `<ellipse cx="${cx + R0 * .28}" cy="${cy + R0 * .26}" rx="${R0 * 1.05}" ry="${R0 * .95}" fill="none" stroke="#0e0a06" stroke-width="${R0 * .5}" opacity=".55" filter="url(#soft)"/>` +
    `<ellipse cx="${cx - R0 * .22}" cy="${cy - R0 * .2}" rx="${R0 * 1.02}" ry="${R0 * .92}" fill="none" stroke="#c8b08a" stroke-width="${R0 * .22}" opacity=".35" filter="url(#soft)"/>` +
    [.82, .66, .5].map(f => `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * f}" ry="${R0 * .9 * f}" fill="none" stroke="#2a1e14" stroke-width="3" opacity=".5"/><ellipse cx="${cx - 2}" cy="${cy - 2}" rx="${R0 * f}" ry="${R0 * .9 * f}" fill="none" stroke="#b89a74" stroke-width="1.6" opacity=".4"/>`).join('') + `</g>`;
  // glowing melt and the central peak ring
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * .34}" ry="${R0 * .3}" fill="#ff8a2a" opacity="${.55 + .15 * Math.sin(t * 3)}" filter="url(#soft)"/><ellipse cx="${cx}" cy="${cy}" rx="${R0 * .16}" ry="${R0 * .14}" fill="#ffe08a" opacity=".8" filter="url(#blur2)"/>`;
  for (let i = 0; i < 9; i++) { const a = i / 9 * 6.283, px = cx + Math.cos(a) * R0 * .2, py = cy + Math.sin(a) * R0 * .18; s += `<path d="M${px - 14},${py + 8} L${px - 2},${py - 14} L${px + 14},${py + 8}Z" fill="#6a5440"/><path d="M${px - 14},${py + 8} L${px - 2},${py - 14} L${px},${py + 8}Z" fill="#a8906c"/>`; }
  // smoke plumes drifting with the wind
  let sm = ''; for (let i = 0; i < 22; i++) { const p = pmod(t * .07 + i / 22, 1), a = i * 2.3; sm += `<circle cx="${cx + Math.cos(a) * R0 * .4 + p * 160}" cy="${cy + Math.sin(a) * R0 * .35 - p * 120}" r="${34 + p * 80}" fill="${i % 3 ? '#3a3634' : '#5a524c'}" opacity="${(1 - p) * .38}"/>`; }
  s += `<g filter="url(#soft)">${sm}</g>`;
  // high thin cloud for depth
  s += `<g opacity=".35" filter="url(#haze)">` + Array.from({ length: 4 }, (_, i) => `<ellipse cx="${pmod(i * 230 + t * 10, 900) - 90}" cy="${300 + i * 260}" rx="200" ry="40" fill="#fff"/>`).join('') + `</g>`;
  s += `<g transform="translate(${cx},${cy + R0 * .9 + 90})"><line x1="${-R0}" y1="0" x2="${R0}" y2="0" stroke="#fff" stroke-width="4"/><line x1="${-R0}" y1="-12" x2="${-R0}" y2="12" stroke="#fff" stroke-width="4"/><line x1="${R0}" y1="-12" x2="${R0}" y2="12" stroke="#fff" stroke-width="4"/></g>`;
  F.ov = ''; F.crater = { y: cy + R0 * .9 + 90 };
  return s;
}
