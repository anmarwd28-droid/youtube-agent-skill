// ---------- scenes ----------
let F = {};
function rock(x, y, r, rot, lx = .6, ly = -.5, seed = 3) {
  const id = 'rk' + seed, rr = R(seed * 7919 + 101); rr();
  const ph = [rr() * 6, rr() * 6, rr() * 6];
  let pts = []; for (let i = 0; i < 64; i++) { const a = i / 64 * 6.283 + rot; const k = 1 + .12 * Math.sin(3 * a + ph[0]) + .07 * Math.sin(5 * a + ph[1]) + .04 * Math.sin(11 * a + ph[2]); pts.push(`${x + Math.cos(a) * r * k * 1.12},${y + Math.sin(a) * r * k * .92}`); }
  const poly = pts.join(' ');
  let o = `<defs><radialGradient id="${id}" cx="${.5 + lx * .3}" cy="${.5 + ly * .3}" r=".85"><stop offset="0" stop-color="#b8ae9c"/><stop offset=".45" stop-color="#6e665a"/><stop offset="1" stop-color="#14120f"/></radialGradient>` +
    `<clipPath id="${id}c"><polygon points="${poly}"/></clipPath></defs><polygon points="${poly}" fill="url(#${id})"/><g clip-path="url(#${id}c)">` +
    `<rect x="${x - r * 1.4}" y="${y - r * 1.4}" width="${r * 2.8}" height="${r * 2.8}" fill="#000" filter="url(#rockTex)" opacity=".7"/>`;
  for (let i = 0; i < 14; i++) { const a = rr() * 6.28, d = Math.sqrt(rr()) * r * .8, cr = r * (.05 + rr() * .14), cx = x + Math.cos(a + rot) * d, cy = y + Math.sin(a + rot) * d * .85;
    o += `<ellipse cx="${cx}" cy="${cy}" rx="${cr}" ry="${cr * .8}" fill="#1e1b16" opacity=".55"/><path d="M${cx - cr * lx},${cy - cr * ly} A${cr},${cr * .8} 0 0 0 ${cx + cr * .9},${cy + cr * .3}" stroke="#d8cfbc" stroke-width="${Math.max(1, cr * .18)}" fill="none" opacity=".5"/>`; }
  o += `<circle cx="${x - lx * r * 1.4}" cy="${y - ly * r * 1.4}" r="${r * 1.5}" fill="#000" opacity=".55" filter="url(#soft)"/></g>`;
  return o + `<polygon points="${poly}" fill="none" stroke="#e8dcc4" stroke-width="2" opacity=".25"/>`;
}
function fireball(hx, hy, dx, dy, len, w, t, a = 1) {
  const n = Math.hypot(dx, dy), ux = dx / n, uy = dy / n, nx = -uy, ny = ux;
  const tx = hx - ux * len, ty = hy - uy * len;
  const id = 'fb' + Math.round(len);
  return `<g opacity="${a}"><defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${hx}" y1="${hy}" x2="${tx}" y2="${ty}"><stop offset="0" stop-color="#fffbe8"/><stop offset=".12" stop-color="#ffd27a"/><stop offset=".45" stop-color="#ff6a1a"/><stop offset="1" stop-color="#8a1a0a" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="${id}s" gradientUnits="userSpaceOnUse" x1="${hx}" y1="${hy}" x2="${tx}" y2="${ty}"><stop offset="0" stop-color="#4a3a34" stop-opacity=".0"/><stop offset=".3" stop-color="#5a4a44" stop-opacity=".7"/><stop offset="1" stop-color="#3a3434" stop-opacity="0"/></linearGradient></defs>` +
    `<polygon points="${hx + nx * w * 1.8},${hy + ny * w * 1.8} ${tx + nx * w * 5},${ty + ny * w * 5} ${tx - nx * w * 5},${ty - ny * w * 5} ${hx - nx * w * 1.8},${hy - ny * w * 1.8}" fill="url(#${id}s)" filter="url(#soft)"/>` +
    `<polygon points="${hx + nx * w},${hy + ny * w} ${tx + nx * w * 2.2},${ty + ny * w * 2.2} ${tx - nx * w * 2.2},${ty - ny * w * 2.2} ${hx - nx * w},${hy - ny * w}" fill="url(#${id})" filter="url(#blur2)"/>` +
    `<circle cx="${hx}" cy="${hy}" r="${w * 7}" fill="url(#fireGlow)"/><circle cx="${hx}" cy="${hy}" r="${w * 1.3}" fill="#fffdf2"/></g>`;
}
// 0: space: a city-sized asteroid heading for Earth
function sceneSpace(t) {
  const st = 0, u = ease(ramp(t, 0, S0(2)));
  let s = space(t, '#02030a', '#070b22');
  const ax = lerp(560, 420, u), ay = lerp(330, 520, u), ar = lerp(80, 150, u);
  for (let i = 0; i < 40; i++) { const rr = R(i * 131 + 7); rr(); const a = rr() * 6.28, d = ar * (1.3 + rr() * 2); s += `<circle cx="${ax + Math.cos(a) * d + t * 4}" cy="${ay + Math.sin(a) * d}" r="${.8 + rr() * 2}" fill="#b8ae9c" opacity="${.4 * rr()}"/>`; }
  s += rock(ax, ay, ar, t * .12, .7, -.4, 3);
  F.earth = { x: 180, y: 1120, r: 420, a: 1, sunI: 1, lights: .4, rot: 1.2, tilt: .41 }; F.light = [1400, 300]; F.moon = null;
  F.ov = '';
  return s;
}
// 1: from the ground: the fireball tears across a dusk sky and gets brighter than the Sun
function treeSil(x, y, h, col) { return `<path d="M${x},${y} l-${h * .22},0 l${h * .22},-${h} l${h * .22},${h}Z" fill="${col}"/><path d="M${x},${y - h * .35} l-${h * .3},0 l${h * .3},-${h * .55} l${h * .3},${h * .55}Z" fill="${col}"/>`; }
function sceneEntry(t) {
  const st = S0(2) - .2, u = ease(ramp(t, st, S0(3) + .4)), br = ease(ramp(t, WS(2, 7) - .6, WS(2, 9) + .3));
  const hx = lerp(820, 300, u), hy = lerp(160, 640, u);
  let s = `<defs><linearGradient id="skE" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#1a2448', '#fff2d8', br * .8)}"/><stop offset=".6" stop-color="${mix('#c86a4a', '#fff6e8', br * .9)}"/><stop offset="1" stop-color="${mix('#f0a060', '#ffffff', br)}"/></linearGradient></defs>` +
    `<rect width="720" height="1280" fill="url(#skE)"/>` + stars(.5 * (1 - br), t);
  s += fireball(hx, hy, -520, 480, 760, 16 + 10 * u, t);
  // land, a small town and forest; shadows swing as the fireball crosses
  s += `<path d="M-20,820 C200,800 500,815 740,800 L740,1300 L-20,1300Z" fill="${mix('#2a2a26', '#8a7a60', br)}"/>`;
  for (let i = 0; i < 26; i++) s += treeSil(i * 30 - 10, 830, 60 + (i * 37) % 40, mix('#14161a', '#3a3428', br));
  [[420, 60, 50], [480, 40, 70], [540, 70, 40], [600, 50, 60]].forEach(([x, w, h]) => { s += `<rect x="${x}" y="${830 - h}" width="${w}" height="${h}" fill="${mix('#1a1c22', '#5a5040', br)}"/><rect x="${x + 10}" y="${830 - h + 12}" width="8" height="10" fill="#ffcf87" opacity="${.8 * (1 - br)}"/>`; });
  const sa = Math.atan2(830 - hy, 300 - hx);
  for (let i = 0; i < 9; i++) { const x = 60 + i * 80, h = 140 + (i * 53) % 80; s += `<path d="M${x},1040 L${x + Math.cos(sa) * 300 * br},${1040 + Math.sin(sa) * 40 * br}" stroke="#000" stroke-width="18" opacity="${.35 * br}" stroke-linecap="round"/>` + treeSil(x, 1040, h, '#0c0e10'); }
  s += `<rect width="720" height="1280" fill="#fff6e0" opacity="${.35 * br}"/>`;
  F.ov = '';
  return s;
}
// 2: impact on the horizon: flash, fireball dome, shockwave racing across the plain, trees flattened
function sceneImpact(t) {
  const it = W(3, 1)[1] + .1, k = clamp((t - it) / 6.5), flash = Math.max(0, 1 - (t - it) / .6) * (t > it ? 1 : 0);
  let s = `<defs><linearGradient id="skI" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#5a3a2a', '#2a1a14', k)}"/><stop offset=".7" stop-color="${mix('#ffb060', '#8a3a1a', k)}"/><stop offset="1" stop-color="#ffd8a0"/></linearGradient>` +
    `<radialGradient id="domeG" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="#ffc060"/><stop offset=".7" stop-color="#e0501a"/><stop offset="1" stop-color="#5a1a0a" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="720" height="1280" fill="url(#skI)"/>`;
  const HX = 360, HY = 760;
  if (t > it) {
    const dr = 120 + k * 520;
    // debris column + mushroom
    let pl = ''; const r = R(17); for (let i = 0; i < 60; i++) { const p = pmod(i / 60 + (t - it) * .05, 1), a = (r() - .5) * 1.2, rad = 40 + p * 260 * (.4 + k);
      pl += `<circle cx="${HX + Math.sin(a) * rad * .9 + Math.sin(t + i) * 10}" cy="${HY - p * (380 + 260 * k)}" r="${30 + p * 90}" fill="${i % 3 ? '#4a3026' : '#7a4a2a'}" opacity="${(1 - p * .7) * .8}"/>`; }
    s += `<g filter="url(#soft)">${pl}</g>`;
    s += `<path d="M${HX - dr},${HY} A${dr},${dr * .75} 0 0 1 ${HX + dr},${HY}Z" fill="url(#domeG)" opacity="${1 - k * .5}"/>`;
  }
  // plain, flattened forest after the shockwave passes
  s += `<path d="M-20,${HY} L740,${HY} L740,1300 L-20,1300Z" fill="#3a3024"/>`;
  const wave = t > it ? (HY + Math.pow(k, .8) * 700) : -1;
  for (let row = 0; row < 7; row++) { const y = HY + 30 + row * row * 14, n = 14 + row * 2, h = 26 + row * 18;
    for (let i = 0; i < n; i++) { const x = (i + .5) * 760 / n - 20 + (row % 2) * 20, hit = wave > y; const ang = hit ? 70 + row * 2 : 0;
      s += `<g transform="translate(${x},${y}) rotate(${ang})"><path d="M0,0 l-${h * .2},0 l${h * .2},-${h} l${h * .2},${h}Z" fill="${hit ? '#2a1a10' : '#1a2018'}"/></g>`; } }
  if (wave > 0) s += `<path d="M-20,${wave} Q360,${wave - 40} 740,${wave}" stroke="#fff2d8" stroke-width="${14 * (1 - k * .5)}" fill="none" opacity="${.8 * (1 - k)}" filter="url(#blur2)"/><rect x="-20" y="${wave - 60}" width="760" height="60" fill="#d8b890" opacity="${.35 * (1 - k)}" filter="url(#haze)"/>`;
  F.flash = flash * .9;
  F.ov = '';
  return s;
}
// 3: aerial view of the 180 km crater, the forest blown flat in rings
function sceneCrater(t) {
  const st = S0(4) - .2, z = ease(ramp(t, st, st + 6)), blast = ease(ramp(t, WS(4, 6), WS(4, 10) + .5));
  const cx = 360, cy = 720, R0 = lerp(210, 250, z);
  let s = `<defs><radialGradient id="crG" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a3a"/><stop offset=".18" stop-color="#8a2a10"/><stop offset=".5" stop-color="#3a2618"/><stop offset=".86" stop-color="#5a4430"/><stop offset=".95" stop-color="#a08a68"/><stop offset="1" stop-color="#3a2e20"/></radialGradient>` +
    `<filter id="landT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="4" seed="12"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .14  0 0 0 0 .06  0 0 0 -1.4 1"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`;
  s += `<rect width="720" height="1280" fill="#3a4a2a"/><rect width="720" height="1280" fill="#fff" filter="url(#landT)" opacity=".9"/>`;
  // radial flattened forest streaks (appear as the blast ring expands)
  const rr = R(901); rr(); let st2 = ''; for (let i = 0; i < 520; i++) { const a = rr() * 6.28, d = R0 * (1.05 + rr() * 2.4), reach = R0 * (1 + blast * 2.6), hit = d < reach;
    const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * .9; st2 += hit ? `<line x1="${x}" y1="${y}" x2="${x + Math.cos(a) * 10}" y2="${y + Math.sin(a) * 9}" stroke="#2a2014" stroke-width="2.4" opacity=".8"/>` : `<circle cx="${x}" cy="${y}" r="3.4" fill="#1e3a18"/>`; }
  s += st2;
  if (blast > 0 && blast < 1) s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * (1 + blast * 2.6)}" ry="${R0 * (1 + blast * 2.6) * .9}" fill="none" stroke="#e8d0a0" stroke-width="10" opacity="${.7 * (1 - blast)}" filter="url(#blur2)"/>`;
  // ejecta blanket, crater, terraces, central peak, glowing melt, smoke
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * 1.35}" ry="${R0 * 1.22}" fill="#6a5440" opacity=".7" filter="url(#blur2)"/><ellipse cx="${cx}" cy="${cy}" rx="${R0}" ry="${R0 * .9}" fill="url(#crG)"/>`;
  for (let i = 1; i < 4; i++) s += `<ellipse cx="${cx}" cy="${cy}" rx="${R0 * (1 - i * .16)}" ry="${R0 * .9 * (1 - i * .16)}" fill="none" stroke="#7a6248" stroke-width="3" opacity=".6"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${R0 * .18}" fill="#ffd27a" opacity="${.6 + .2 * Math.sin(t * 3)}" filter="url(#soft)"/><path d="M${cx - 20},${cy + 10} L${cx},${cy - 20} L${cx + 24},${cy + 8}Z" fill="#4a3424"/>`;
  let sm = ''; for (let i = 0; i < 16; i++) { const p = pmod(t * .08 + i / 16, 1), a = i * 2.3; sm += `<circle cx="${cx + Math.cos(a) * R0 * .5 + p * 60}" cy="${cy + Math.sin(a) * R0 * .4 - p * 80}" r="${30 + p * 60}" fill="#3a3a3a" opacity="${(1 - p) * .35}"/>`; }
  s += `<g filter="url(#soft)">${sm}</g>`;
  // scale bar
  s += `<g transform="translate(${cx},${cy + R0 * .9 + 70})"><line x1="${-R0}" y1="0" x2="${R0}" y2="0" stroke="#fff" stroke-width="4"/><line x1="${-R0}" y1="-12" x2="${-R0}" y2="12" stroke="#fff" stroke-width="4"/><line x1="${R0}" y1="-12" x2="${R0}" y2="12" stroke="#fff" stroke-width="4"/></g>`;
  F.ov = ''; F.crater = { y: cy + R0 * .9 + 70 };
  return s;
}
// 4: tsunami taller than the towers rolling at a coastal city
function sceneTsunami(t) {
  const st = S0(5) - .2, recede = ease(ramp(t, st, st + 1.6)), rise = ease(ramp(t, st + 1, S0(6) - .2));
  const HZ = 700, crest = lerp(HZ - 10, 260, rise), wx = lerp(0, 1, rise);
  let s = `<defs><linearGradient id="skT2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a4a"/><stop offset="1" stop-color="#c89a7a"/></linearGradient>` +
    `<linearGradient id="wvG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe8f0"/><stop offset=".12" stop-color="#4a8aa0"/><stop offset=".6" stop-color="#1e4a60"/><stop offset="1" stop-color="#0c2232"/></linearGradient></defs>` +
    `<rect width="720" height="${HZ + 4}" fill="url(#skT2)"/>`;
  // the wave wall
  let d = `M-20,${HZ}`; for (let x = -20; x <= 740; x += 40) d += ` L${x},${crest + Math.sin(x * .02 + t * 2) * 14 + (x - 360) * (x - 360) * .0004 * (1 - rise * .6)}`; d += ` L740,${HZ + 40} L-20,${HZ + 40}Z`;
  s += `<path d="${d}" fill="url(#wvG)"/>`;
  let fo = ''; const rf = R(77); rf(); for (let i = 0; i < 70; i++) { const x = rf() * 760 - 20, y = crest + Math.sin(x * .02 + t * 2) * 14 + (x - 360) * (x - 360) * .0004 * (1 - rise * .6) + rf() * 20 - 10;
    fo += `<circle cx="${x}" cy="${y}" r="${8 + rf() * 18}" fill="#f4fbff" opacity="${.5 + rf() * .4}"/>`; }
  s += `<g filter="url(#blur2)">${fo}</g>`;
  for (let i = 0; i < 8; i++) { const x = 40 + i * 90; s += `<path d="M${x},${crest + 40} q20,${(HZ - crest) * .4} 0,${(HZ - crest) * .9}" stroke="#bfe0ec" stroke-width="3" fill="none" opacity=".35"/>`; }
  // city skyline + port cranes in front of the wave
  const r = R(5); r(); let x = -10; let city = '';
  while (x < 740) { const w = 34 + r() * 50, h = 80 + r() * 230; city += `<rect x="${x}" y="${HZ + 120 - h}" width="${w}" height="${h}" fill="#1a1c24"/>`;
    for (let j = 0; j < Math.floor(h / 24); j++) if (r() > .4) city += `<rect x="${x + 6}" y="${HZ + 120 - h + 8 + j * 24}" width="${w - 12}" height="8" fill="#ffcf87" opacity=".55"/>`; x += w + 4; }
  s += city + [120, 600].map(cx => `<path d="M${cx},${HZ + 130} L${cx},${HZ - 120} L${cx + 120},${HZ - 120} M${cx},${HZ - 100} L${cx + 120},${HZ - 120}" stroke="#2a2a30" stroke-width="7" fill="none"/>`).join('');
  // beach where the sea pulled back
  s += `<rect y="${HZ + 120}" width="720" height="${1280 - HZ - 120}" fill="#6a5a44"/><rect y="${HZ + 120}" width="720" height="${60 * (1 - recede)}" fill="#2a5a7a" opacity=".8"/>`;
  for (let i = 0; i < 6; i++) s += `<path d="M${i * 130},${HZ + 200 + i * 30} q40,-8 80,0" stroke="#4a3e30" stroke-width="4" fill="none"/>`;
  s += palm(80, 1200, 300, '#14161c', t) + palm(640, 1220, 340, '#14161c', t);
  s += `<rect width="720" height="1280" fill="#0a1420" opacity="${.3 * rise}"/>`;
  F.ov = '';
  return s;
}
// 5: rain of burning rocks over a forest at night
function sceneFireRain(t) {
  const st = S0(6) - .2, k = ease(ramp(t, st, st + 1.5)), fire = ease(ramp(t, WS(6, 11) - .3, WS(6, 11) + 1));
  let s = `<defs><linearGradient id="skF2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0a0a"/><stop offset=".7" stop-color="#6a1a0a"/><stop offset="1" stop-color="#c84a1a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF2)"/>`;
  const r = R(333); r(); let rain = '';
  for (let i = 0; i < 46; i++) { const x0 = r() * 1100 - 100, sp = 260 + r() * 320, ph = r(), len = 60 + r() * 120, y = pmod(ph * 1400 + t * sp, 1400) - 200, x = x0 - (y + 200) * .45;
    rain += `<line x1="${x}" y1="${y}" x2="${x + len * .45}" y2="${y - len}" stroke="#ffb060" stroke-width="${2 + r() * 3}" opacity="${k * (.5 + .5 * r())}" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${3 + r() * 3}" fill="#fff2c8" opacity="${k}"/>`; }
  s += `<g filter="url(#blur1)">${rain}</g>`;
  s += `<path d="M-20,900 C200,880 500,900 740,870 L740,1300 L-20,1300Z" fill="#140806"/>`;
  for (let i = 0; i < 24; i++) { const x = i * 32 - 10, h = 120 + (i * 71) % 140, burning = fire > ((i * 37) % 10) / 10;
    s += treeSil(x, 930, h, '#0a0404');
    if (burning) { const fh = h * (.5 + .3 * Math.sin(t * 9 + i)); s += `<path d="M${x - 16},930 C${x - 22},${930 - fh * .5} ${x - 4},${930 - fh * .7} ${x},${930 - fh} C${x + 4},${930 - fh * .7} ${x + 22},${930 - fh * .5} ${x + 16},930Z" fill="#ff7a1a" opacity=".85"/><circle cx="${x}" cy="${930 - h * .4}" r="${h * .6}" fill="url(#fireGlow)" opacity=".4"/>`; } }
  let sm = ''; for (let i = 0; i < 12; i++) { const p = pmod(t * .1 + i / 12, 1); sm += `<circle cx="${i * 64 + p * 40}" cy="${900 - p * 600}" r="${40 + p * 90}" fill="#2a1a16" opacity="${fire * (1 - p) * .55}"/>`; }
  s += `<g filter="url(#soft)">${sm}</g><rect y="900" width="720" height="400" fill="#ff6a1a" opacity="${.12 * fire}"/>`;
  F.ov = '';
  return s;
}
// 6: dust and soot wrap the planet; then a cold, dim world where plants die
function sceneDust(t) {
  const st = S0(7) - .2, d = ease(ramp(t, st, WS(7, 7) + .5));
  let s = space(t, '#04050c', '#0a0c18');
  s += `<circle cx="-40" cy="380" r="260" fill="url(#fireGlow)" opacity="${.9 - .7 * d}"/><circle cx="-40" cy="380" r="70" fill="#fff6d8" opacity="${1 - .8 * d}"/>`;
  F.earth = { x: 400, y: 700, r: 250, a: 1, sunI: 1 - .75 * d, lights: 0, rot: 1.0, tilt: .41 }; F.light = [-400, 380]; F.moon = null;
  F.ov = `<defs><clipPath id="dcl"><circle cx="400" cy="700" r="${250 * 1.05}"/></clipPath><radialGradient id="dG" cx=".35" cy=".4" r=".7"><stop offset="0" stop-color="#8a7a66"/><stop offset="1" stop-color="#2a2420"/></radialGradient></defs>` +
    `<g clip-path="url(#dcl)" opacity="${.85 * d}"><circle cx="400" cy="700" r="263" fill="url(#dG)"/><rect x="140" y="440" width="520" height="520" fill="#000" filter="url(#rockTex)" opacity=".5" transform="rotate(${t * 3},400,700)"/></g>` +
    `<circle cx="400" cy="700" r="${262 + d * 20}" fill="none" stroke="#6a5a48" stroke-width="${10 + d * 24}" opacity="${.5 * d}" filter="url(#soft)"/>`;
  return s;
}
function sceneCold(t) {
  const st = WS(7, 8) - .3, k = ease(ramp(t, st, st + 3));
  let s = `<defs><linearGradient id="skCo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2a2e"/><stop offset="1" stop-color="#6a6660"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skCo)"/>`;
  s += `<circle cx="480" cy="420" r="46" fill="#c8b8a0" opacity=".35"/><circle cx="480" cy="420" r="140" fill="#a89880" opacity=".15" filter="url(#soft)"/>`;
  s += `<rect y="300" width="720" height="400" fill="#4a4640" opacity=".4" filter="url(#haze)"/>`;
  s += `<path d="M-20,860 C200,840 500,860 740,840 L740,1300 L-20,1300Z" fill="#4a4842"/><path d="M-20,860 C200,840 500,860 740,840 L740,1300 L-20,1300Z" fill="#e8eef2" opacity="${.35 * k}"/>`;
  // dying plants: green to brown, drooping, frost tips
  for (let i = 0; i < 16; i++) { const x = 20 + i * 46, h = 80 + (i * 41) % 90, col = mix('#3a6a2a', '#6a5a3a', k);
    for (let j = 0; j < 5; j++) { const a = -Math.PI / 2 + (j - 2) * .35, droop = k * (40 + j * 6); s += `<path d="M${x},1000 Q${x + Math.cos(a) * h * .5},${1000 + Math.sin(a) * h * .6} ${x + Math.cos(a) * h * .8},${1000 + Math.sin(a) * h + droop}" stroke="${col}" stroke-width="4" fill="none"/><circle cx="${x + Math.cos(a) * h * .8}" cy="${1000 + Math.sin(a) * h + droop}" r="3" fill="#eef4f8" opacity="${k}"/>`; } }
  s += `<g opacity="${.9 * k}">` + Array.from({ length: 60 }, (_, i) => { const rr = R(i * 97 + 5); rr(); return `<circle cx="${rr() * 720}" cy="${pmod(rr() * 1280 + t * 20, 1280)}" r="${1 + rr() * 2}" fill="#dcd6cc" opacity=".6"/>`; }).join('') + `</g>`;
  F.ov = '';
  return s;
}
// 7: 66 million years ago: dinosaurs at dusk as the fireball streaks in
function trex(x, y, s, t) {
  const br = Math.sin(t * 2) * 2;
  return `<g transform="translate(${x},${y}) scale(${s})"><defs><linearGradient id="trG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3428"/><stop offset="1" stop-color="#0e0c0a"/></linearGradient></defs>` +
    `<path d="M-260,-150 C-200,-170 -120,-190 -60,-200 C-20,-230 30,-250 70,-250 C110,-252 140,-236 150,-214 C156,-200 140,-190 120,-188 L100,-182 C110,-176 116,-168 112,-160 C90,-156 70,-160 54,-168 C40,-150 20,-130 0,-118 C10,-90 14,-60 6,-30 L18,0 L-14,0 L-20,-40 C-40,-60 -60,-70 -80,-74 L-70,-30 L-58,0 L-90,0 L-104,-60 C-150,-80 -210,-110 -260,-150Z" fill="url(#trG)"/>` +
    `<path d="M24,-150 l16,22 l-4,10 M34,-160 l18,18" stroke="#0e0c0a" stroke-width="6" stroke-linecap="round"/>` +
    `<path d="M70,-250 C110,-252 140,-236 150,-214" stroke="#ff9a5a" stroke-width="3" opacity=".7" fill="none"/><path d="M-60,-200 C-20,-230 30,-250 70,-250" stroke="#ff9a5a" stroke-width="3" opacity=".6" fill="none"/>` +
    `<circle cx="104" cy="-222" r="4" fill="#ffcf5a"/><path d="M102,-190 l6,8 l6,-8 l6,8 l6,-8" stroke="#e8e0c8" stroke-width="2" fill="none" transform="translate(0,${br})"/></g>`;
}
function sauropod(x, y, s, col) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-200,-60 C-150,-70 -100,-110 -40,-110 C20,-110 60,-90 80,-80 C110,-140 130,-230 160,-250 C176,-260 194,-254 196,-244 C190,-240 180,-238 172,-232 C150,-200 132,-130 116,-70 C120,-40 110,-20 100,0 L80,0 L76,-30 L20,-36 L16,0 L-6,0 L-14,-40 L-60,-40 L-66,0 L-90,0 L-96,-44 C-130,-46 -170,-50 -200,-60Z" fill="${col}"/></g>`;
}
function sceneDino(t) {
  const st = S0(8) - .2, u = ease(ramp(t, st, S0(9) + .2));
  let s = `<defs><linearGradient id="skD2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1e3a"/><stop offset=".55" stop-color="#c8603a"/><stop offset="1" stop-color="#f8b070"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skD2)"/>`;
  s += fireball(lerp(600, 380, u), lerp(260, 560, u), -260, 340, 520, 10 + 6 * u, t);
  s += `<path d="M-20,820 C140,780 300,800 420,780 C560,760 640,790 740,770 L740,900 L-20,900Z" fill="#3a2a2a" opacity=".8"/>`;
  s += sauropod(200, 860, .7, '#3a2a2a') + sauropod(470, 880, .55, '#3a2a2a');
  // pterosaurs
  for (let i = 0; i < 3; i++) { const px = pmod(t * 40 + i * 240, 900) - 90, py = 520 + i * 50, f = Math.sin(t * 4 + i) * 10; s += `<path d="M${px - 40},${py} Q${px - 20},${py - 14 - f} ${px},${py} Q${px + 20},${py - 14 - f} ${px + 40},${py} M${px},${py} l14,-6" stroke="#1a1218" stroke-width="4" fill="none"/>`; }
  // foreground: cycads, ferns, ground
  s += `<path d="M-20,940 C200,920 500,950 740,920 L740,1300 L-20,1300Z" fill="#1a1410"/>`;
  [[90, 1000, 1.2], [640, 1020, 1.4], [520, 1100, .9]].forEach(([x, y, sc]) => { s += `<rect x="${x - 10 * sc}" y="${y - 140 * sc}" width="${20 * sc}" height="${140 * sc}" fill="#2a1e14"/>` +
    Array.from({ length: 9 }, (_, k) => { const a = -Math.PI / 2 + (k - 4) * .38; return `<path d="M${x},${y - 140 * sc} Q${x + Math.cos(a) * 80 * sc},${y - 140 * sc + Math.sin(a) * 80 * sc} ${x + Math.cos(a) * 150 * sc},${y - 110 * sc + Math.sin(a) * 90 * sc + 40 * sc}" stroke="#1e2a14" stroke-width="${8 * sc}" fill="none"/>`; }).join(''); });
  s += trex(360, 1120, 1.25, t);
  s += `<rect width="720" height="1280" fill="#ffb070" opacity="${.15 * u}"/>`;
  F.ov = '';
  return s;
}
// 8: scientists watch the sky; DART hits Dimorphos and shortens its orbit
function sceneDart(t) {
  const st = S0(9) - .2, obsEnd = WS(9, 6) - .3, hitT = WS(9, 16), ob = 1 - ease(ramp(t, obsEnd - .3, obsEnd + .3));
  let s = space(t, '#02030a', '#080b20');
  // observatory dome (first part)
  s += `<g opacity="${ob}"><path d="M-20,1050 C200,1030 500,1050 740,1030 L740,1300 L-20,1300Z" fill="#0c0e14"/><path d="M220,1040 L220,900 A140,140 0 0 1 500,900 L500,1040Z" fill="#d8dce4"/><path d="M220,900 A140,140 0 0 1 500,900" fill="#b8bec8"/>` +
    `<path d="M330,780 L390,780 L400,900 L320,900Z" fill="#0a0c14"/><polygon points="360,800 520,380 600,420" fill="#cfe0ff" opacity=".08"/><rect x="230" y="960" width="260" height="10" fill="#8a909a"/></g>`;
  // DART encounter (second part)
  const da = 1 - ob;
  if (da > 0) {
    const cx = 360, cy = 700, orbR = t > hitT ? lerp(230, 205, ease(ramp(t, hitT, hitT + 1.5))) : 230, oa = (t - st) * .35;
    s += `<g opacity="${da}"><ellipse cx="${cx}" cy="${cy}" rx="230" ry="80" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="8 8" opacity="${t > hitT ? .3 : .6}"/>` +
      (t > hitT ? `<ellipse cx="${cx}" cy="${cy}" rx="${orbR}" ry="${orbR * .35}" fill="none" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 8"/>` : '') +
      rock(cx, cy, 95, t * .05, .6, -.4, 11);
    const mx = cx + Math.cos(oa) * orbR, my = cy + Math.sin(oa) * orbR * .35;
    s += rock(mx, my, 26, t * .2, .6, -.4, 12);
    // spacecraft flying in until impact
    if (t < hitT) { const p = ease(ramp(t, obsEnd, hitT)), sx = lerp(760, mx, p), sy = lerp(260, my, p);
      s += `<g transform="translate(${sx},${sy}) rotate(-28)"><rect x="-12" y="-10" width="24" height="20" fill="#d8c070"/><rect x="-80" y="-5" width="62" height="10" fill="#2a3a7a"/><rect x="18" y="-5" width="62" height="10" fill="#2a3a7a"/>` +
        Array.from({ length: 6 }, (_, k) => `<line x1="${-80 + k * 10}" y1="-5" x2="${-80 + k * 10}" y2="5" stroke="#5a6aa8" stroke-width="1"/><line x1="${18 + k * 10}" y1="-5" x2="${18 + k * 10}" y2="5" stroke="#5a6aa8" stroke-width="1"/>`).join('') + `<circle cx="0" cy="12" r="3" fill="#bfe6ff"/></g>`; }
    const fl = Math.max(0, 1 - Math.abs(t - hitT) * 2.2);
    if (fl > 0) s += `<circle cx="${mx}" cy="${my}" r="${30 + 120 * (1 - fl)}" fill="url(#fireGlow)" opacity="${fl}"/><circle cx="${mx}" cy="${my}" r="10" fill="#fff" opacity="${fl}"/>`;
    s += `</g>`;
  }
  F.ov = '';
  return s;
}
// 9: CTA: stars that join into a question mark
function sceneCTA(t) {
  const st = S0(10), k = ease(ramp(t, st - .2, st + 1.2)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03040e', '#0e1030');
  const Q = [[300, 520], [330, 470], [380, 450], [430, 470], [450, 520], [430, 570], [380, 610], [370, 660], [370, 720]];
  let ln = ''; for (let i = 0; i < Q.length - 1; i++) { const p = clamp(k * (Q.length - 1) - i); if (p > 0) ln += `<line x1="${Q[i][0]}" y1="${Q[i][1]}" x2="${lerp(Q[i][0], Q[i + 1][0], p)}" y2="${lerp(Q[i][1], Q[i + 1][1], p)}" stroke="#bcd0ff" stroke-width="2.4" opacity=".8"/>`; }
  s += ln + Q.map(([x, y], i) => `<circle cx="${x}" cy="${y}" r="${5 + (i % 3)}" fill="#fff"/><circle cx="${x}" cy="${y}" r="16" fill="#bcd0ff" opacity=".3" filter="url(#blur2)"/>`).join('') +
    `<circle cx="370" cy="790" r="9" fill="#fff6c8" opacity="${k}"/><circle cx="370" cy="790" r="30" fill="#fff2a0" opacity="${.35 * k}" filter="url(#blur2)"/>`;
  s += fireball(lerp(700, 560, pmod((t - st) * .25, 1)), lerp(160, 300, pmod((t - st) * .25, 1)), -140, 140, 200, 3, t, .8);
  F.ov = `<g opacity="${ramp(t, WS(10, 4), WS(10, 4) + .4)}" transform="translate(360,${1000 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null;
  return s;
}
const SCENES = [
  { s: 0, f: sceneSpace }, { s: S0(2) - .2, f: sceneEntry }, { s: W(3, 1)[1] - .05, f: sceneImpact }, { s: S0(4) - .2, f: sceneCrater }, { s: S0(5) - .2, f: sceneTsunami },
  { s: S0(6) - .2, f: sceneFireRain }, { s: S0(7) - .2, f: sceneDust }, { s: WS(7, 8) - .3, f: sceneCold }, { s: S0(8) - .2, f: sceneDino }, { s: S0(9) - .2, f: sceneDart }, { s: S0(10) - .2, f: sceneCTA },
];
const XF = .5;

// ---------- UI ----------
const CHIPS = [
  ['c1', '١٠ كم', 470, 300, 'big', WS(1, 2), WS(1, 4)], ['c2', '٢٠ كم في الثانية', 470, 300, 'big', WS(1, 6), S0(2)],
  ['c3', 'أسطع من الشمس', 360, 330, 'big', WS(2, 7), S0(3) - .2],
  ['c4', 'أقوى من كل القنابل النووية', 360, 330, '', WS(3, 4), WS(3, 12)], ['c5', '× آلاف المرّات', 360, 330, 'big red', WS(3, 12), S0(4)],
  ['c6', '١٨٠ كم', 360, 0, 'big', WS(4, 3), S0(5)],
  ['c7', 'مئات الأمتار', 360, 330, 'big', WS(5, 8), S0(6)],
  ['c8', 'الشمس محجوبة لسنوات', 400, 1060, 'dark', WS(7, 6), WS(7, 8) - .3],
  ['c9', 'قبل ٦٦ مليون سنة', 360, 330, 'big', WS(8, 4), S0(9)],
  ['c10', 'مهمة DART — ٢٠٢٢', 360, 330, '', WS(9, 6), S0(10)], ['c11', 'تغيّر المدار', 360, 960, 'big', WS(9, 16) + .6, S0(10)],
  ['c12', '@MadhaLawLab', 360, 1120, 'dark', WS(10, 6), 999],
];
$('ui').innerHTML = CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' || c[1].includes('DART') ? 'direction:rtl;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  if (F.crater) $('c6').style.top = (F.crater.y + 50) + 'px';
  $('c12').style.direction = 'ltr';
  $('note').style.opacity = 0;
}

