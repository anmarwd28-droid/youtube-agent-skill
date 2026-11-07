
// ===================== "what if all humans vanished?" =====================
// a four-legged animal in side view with a real walk cycle (far legs darker); kinds: dog, wolf, fox, horse, cat
function quad(x, y, sc, o = {}) {
  const k = o.kind || 'dog', f = o.face || 1, ph = o.phase || 0, mv = o.moving ? 1 : 0;
  const P = { dog: { L: 72, H: 50, leg: 46, neck: 24, hd: 17, col: '#b08a5a', dark: '#6a4e30', belly: '#dcc49e' },
    wolf: { L: 96, H: 62, leg: 62, neck: 30, hd: 23, col: '#8e887c', dark: '#4e4a44', belly: '#cec8bc' },
    fox: { L: 60, H: 38, leg: 32, neck: 20, hd: 16, col: '#c8641e', dark: '#2a1a10', belly: '#f4e8d8' },
    horse: { L: 150, H: 104, leg: 100, neck: 56, hd: 30, col: '#c0a06a', dark: '#2e2216', belly: '#e6d4ae' },
    cat: { L: 44, H: 28, leg: 24, neck: 10, hd: 13, col: o.col || '#8a827a', dark: '#3a3634', belly: '#c2bcb6' } }[k];
  const col = o.col || P.col, dk = P.dark, L = P.L, H = P.H, leg = P.leg, ty = -(leg + H * .22), bob = mv ? Math.abs(Math.sin(ph)) * 2 : 0;
  const limb = (jx, jy, a, hind, c, w) => { const u = leg * .55, l = leg * .52, kx = jx + Math.sin(a) * u, ky = jy + Math.cos(a) * u, b = hind ? -.55 : .25, fx = kx + Math.sin(a * .6 + b) * l, fy = ky + Math.cos(a * .6 + b) * l * .98;
    return `<path d="M${jx},${jy} L${kx},${ky} L${fx},${fy}" stroke="${c}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${fx + w * .3}" cy="${fy}" rx="${w * .65}" ry="${w * .35}" fill="${k === 'horse' ? '#1a1410' : dk}"/>`; };
  const sw = a => Math.sin(ph + a) * .5 * mv, shX = L * .34, hpX = -L * .36, jy = ty + H * .12, lw = k === 'horse' ? 13 : k === 'cat' ? 6 : 9;
  const farC = mix(col, '#000000', .3), legC = k === 'horse' || k === 'fox' ? mix(col, dk, .55) : col;
  let s = `<g transform="translate(${x},${y - bob * sc}) scale(${f * sc},${sc})"><ellipse cx="0" cy="2" rx="${L * .62}" ry="${L * .07}" fill="#000" opacity=".28"/>`;
  s += limb(shX - 4, jy, sw(Math.PI), false, farC, lw) + limb(hpX - 4, jy, sw(0), true, farC, lw);
  // tail
  if (k === 'dog') s += `<path d="M${-L * .5},${ty - H * .1} q${-L * .22},${-H * .35} ${-L * .12},${-H * .62}" stroke="${col}" stroke-width="${lw * .8}" fill="none" stroke-linecap="round"/>`;
  if (k === 'wolf') s += `<path d="M${-L * .5},${ty - H * .05} q${-L * .25},${H * .2} ${-L * .3},${H * .6}" stroke="${mix(col, '#000000', .1)}" stroke-width="${lw * 1.5}" fill="none" stroke-linecap="round"/>`;
  if (k === 'fox') s += `<path d="M${-L * .5},${ty} q${-L * .35},${H * .05} ${-L * .55},${H * .4}" stroke="${col}" stroke-width="${lw * 2}" fill="none" stroke-linecap="round"/><circle cx="${-L * 1.04}" cy="${ty + H * .42}" r="${lw * .9}" fill="#f8f0e4"/>`;
  if (k === 'horse') s += `<path d="M${-L * .5},${ty - H * .12} q${-L * .12},${H * .1} ${-L * .14},${H * .75}" stroke="${dk}" stroke-width="${lw * 1.4}" fill="none" stroke-linecap="round"/>`;
  if (k === 'cat') s += `<path d="M${-L * .5},${ty} q${-L * .3},${-H * .2} ${-L * .25},${-H * 1.2}" stroke="${col}" stroke-width="${lw}" fill="none" stroke-linecap="round"/>`;
  // torso: barrel, chest, back shading, lighter belly
  s += `<path d="M${-L * .5},${ty - H * .18} C${-L * .45},${ty - H * .42} ${L * .3},${ty - H * .46} ${L * .48},${ty - H * .2} C${L * .56},${ty + H * .06} ${L * .44},${ty + H * .36} ${L * .22},${ty + H * .34} C${0},${ty + H * .3} ${-L * .3},${ty + H * .36} ${-L * .46},${ty + H * .22} C${-L * .56},${ty + H * .1} ${-L * .55},${ty - H * .02} ${-L * .5},${ty - H * .18}Z" fill="${col}"/>`;
  s += `<path d="M${-L * .4},${ty + H * .26} C${-L * .1},${ty + H * .34} ${L * .2},${ty + H * .34} ${L * .36},${ty + H * .22}" stroke="${P.belly}" stroke-width="${H * .12}" fill="none" opacity=".7" stroke-linecap="round"/>`;
  s += `<path d="M${-L * .46},${ty - H * .24} C${-L * .2},${ty - H * .42} ${L * .2},${ty - H * .44} ${L * .42},${ty - H * .26}" stroke="#000" stroke-width="${H * .08}" fill="none" opacity=".18" stroke-linecap="round"/>`;
  s += limb(shX + 4, jy, sw(0), false, legC, lw) + limb(hpX + 4, jy, sw(Math.PI), true, legC, lw);
  // neck and head (thick neck; head drawn pointing forward then rotated down)
  const nx = L * .44, ny = ty - H * .18, hd = P.hd, gz = o.graze ? 1 : 0, ang = (k === 'horse' ? 38 : k === 'wolf' ? 14 : k === 'cat' ? 0 : 8) + gz * 52;
  const hx = nx + P.neck * (k === 'horse' ? .55 : .75) + gz * P.neck * .5, hy = ny - P.neck * (k === 'horse' ? 1.0 : .7) + gz * P.neck * 1.9;
  s += `<path d="M${nx - L * .06},${ny - H * .18} Q${(nx + hx) / 2 - hd * .2},${(ny + hy) / 2 - hd * .6} ${hx - hd * .2},${hy - hd * .42} L${hx + hd * .25},${hy + hd * .38} Q${(nx + hx) / 2 + hd * .4},${(ny + hy) / 2 + hd * .4} ${nx + L * .08},${ny + H * .3}Z" fill="${col}"/>`;
  if (k === 'horse') s += `<path d="M${nx - L * .06},${ny - H * .2} Q${(nx + hx) / 2 - hd * .3},${(ny + hy) / 2 - hd * .75} ${hx - hd * .25},${hy - hd * .5}" stroke="${dk}" stroke-width="${hd * .32}" fill="none" stroke-linecap="round"/>`;
  let hdS = '';
  if (k === 'horse') hdS = `<path d="M0,${-hd * .45} C${hd * .5},${-hd * .55} ${hd * 1.3},${-hd * .35} ${hd * 1.7},${-hd * .15} C${hd * 1.86},${-hd * .05} ${hd * 1.86},${hd * .3} ${hd * 1.66},${hd * .36} C${hd * 1.2},${hd * .46} ${hd * .5},${hd * .62} 0,${hd * .5}Z" fill="${col}"/><ellipse cx="${hd * 1.55}" cy="${hd * .12}" rx="${hd * .3}" ry="${hd * .26}" fill="#ecdcc0"/><ellipse cx="${hd * 1.72}" cy="${hd * .04}" rx="${hd * .06}" ry="${hd * .05}" fill="#2a1a10"/>` +
      `<ellipse cx="${hd * .42}" cy="${-hd * .18}" rx="${hd * .08}" ry="${hd * .07}" fill="#120c08"/><path d="M${hd * .02},${-hd * .4} L${-hd * .05},${-hd * .82} L${hd * .2},${-hd * .48}Z" fill="${dk}"/>`;
  else if (k === 'cat') hdS = `<ellipse cx="${hd * .2}" cy="0" rx="${hd * .62}" ry="${hd * .55}" fill="${col}"/><path d="M${-hd * .2},${-hd * .35} L${-hd * .1},${-hd * .95} L${hd * .2},${-hd * .5}Z M${hd * .3},${-hd * .45} L${hd * .55},${-hd * .95} L${hd * .7},${-hd * .3}Z" fill="${col}"/><ellipse cx="${hd * .45}" cy="${-hd * .08}" rx="${hd * .1}" ry="${hd * .12}" fill="#d8c040"/><ellipse cx="${hd * .78}" cy="${hd * .15}" rx="${hd * .08}" ry="${hd * .06}" fill="#c87a7a"/>`;
  else hdS = `<ellipse cx="${hd * .15}" cy="0" rx="${hd * .6}" ry="${hd * .5}" fill="${col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02} Q${hd * 1.5},${hd * .12} ${hd * 1.36},${hd * .2} L${hd * .45},${hd * .4}Z" fill="${k === 'fox' ? '#f4e8d8' : col}"/><path d="M${hd * .45},${-hd * .28} L${hd * 1.4},${-hd * .02}" stroke="${k === 'fox' ? col : mix(col, '#000000', .15)}" stroke-width="${hd * .14}"/>` +
      `<ellipse cx="${hd * 1.4}" cy="${hd * .06}" rx="${hd * .12}" ry="${hd * .1}" fill="#1a1210"/><ellipse cx="${hd * .55}" cy="${-hd * .15}" rx="${hd * .08}" ry="${hd * .09}" fill="#120c08"/>` +
      `<path d="M${-hd * .25},${-hd * .3} L${-hd * .12},${-hd * (k === 'dog' ? .95 : 1.05)} L${hd * .15},${-hd * .38}Z" fill="${k === 'fox' ? '#2a1a10' : mix(col, '#000000', .15)}"/><path d="M${hd * .15},${hd * .38} Q${hd * .7},${hd * .55} ${hd * 1.2},${hd * .25}" stroke="${P.belly}" stroke-width="${hd * .14}" fill="none" opacity=".8"/>`;
  s += `<g transform="translate(${hx - hd * .1},${hy}) rotate(${ang})">${hdS}</g>`;
  return s + `</g>`;
}
function pigeon(x, y, s, t, seed = 0, fly = 0) {
  if (fly) { const fl = Math.sin(t * 16 + seed) * 10; return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-16,${-fl} Q-8,-4 0,0 Q8,-4 16,${-fl}" stroke="#3a3a40" stroke-width="3" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="1" rx="5" ry="3" fill="#5a5a62"/></g>`; }
  const pk = Math.max(0, Math.sin(t * 3 + seed)) ** 6 * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="-8" rx="11" ry="7" fill="#8a8c96"/><path d="M-10,-8 l-8,3 l8,2Z" fill="#4a4c54"/><ellipse cx="9" cy="${-15 + pk}" rx="5" ry="4.5" fill="#7a7c88"/><path d="M13,${-15 + pk} l4,1 l-4,1Z" fill="#c8a880"/><ellipse cx="4" cy="-9" rx="4" ry="3" fill="#6a9a8a" opacity=".6"/><path d="M-2,-1 v4 M3,-1 v4" stroke="#c86a5a" stroke-width="1.5"/></g>`;
}
function trafficLight(x, y, t, mode) {
  const on = mode === 'blink' ? (Math.sin(t * 6) > 0 ? 1 : .15) : 1;
  return `<rect x="${x - 4}" y="${y - 300}" width="8" height="300" fill="#4a4c50"/><rect x="${x - 16}" y="${y - 380}" width="32" height="84" rx="6" fill="#1e2024"/>` +
    `<circle cx="${x}" cy="${y - 364}" r="9" fill="#5a1a1a"/><circle cx="${x}" cy="${y - 338}" r="9" fill="${mode === 'blink' ? '#ffc23a' : '#5a4a1a'}" opacity="${mode === 'blink' ? on : 1}"/><circle cx="${x}" cy="${y - 312}" r="9" fill="${mode === 'green' ? '#3ae07a' : '#1a4a2a'}"/>` +
    (mode === 'blink' ? `<circle cx="${x}" cy="${y - 338}" r="24" fill="#ffc23a" opacity="${.3 * on}" filter="url(#blur2)"/>` : '');
}

// 0: a busy Baghdad street – then every person vanishes at once; a phone and a shopping bag drop, a car rolls to the kerb
function sceneHook(t) {
  const tv = WS(0, 4) + .25, gone = ramp(t, tv, tv + .35);
  let s = street(t, { id: 'h0', sky: ['#3f7fc4', '#8ab8e0', '#cfe4f2'], sun: 1, sunX: 150, sunY: 480 });
  s += trafficLight(660, 1060, t, 'green');
  const roll = Math.min(t, tv) * 90 + Math.max(0, t - tv) * 90 * Math.max(0, 1 - (t - tv) / 1.6) + 0;
  s += car(-40 + Math.min(roll + 60, 420), 1214, .9, '#c83a2a', 1, 0) + car(560 - Math.min(t, tv) * 60, 1262, .95, '#d8d8dc', -1, 0);
  const walkers = [[120, 50, 0, .5], [300, -40, 1, .52], [430, 36, 2, .5], [600, -46, 3, .48], [220, 30, 1, .46]];
  walkers.forEach(([x0, sp, c, sc], i) => { const x = x0 + sp * Math.min(t, tv), y = 1044 + (i % 2) * 6;
    if (gone < 1) s += `<g opacity="${1 - gone}">` + person(x, y, { s: sc, face: sp > 0 ? 1 : -1, moving: 1, phase: t * 6 + i, top: CROWD[c].top, pants: CROWD[c].pants, skin: CROWD[c].skin, hair: CROWD[c].hair, t }) + `</g>`;
    if (gone > 0 && gone < 1) for (let q = 0; q < 10; q++) { const r = RS(i * 20 + q), a = r() * 6.28, d = 20 + gone * 60 * r(); s += `<circle cx="${x + Math.cos(a) * d}" cy="${y - 100 * sc * 2 + Math.sin(a) * d}" r="${2 + 2 * r()}" fill="#fff" opacity="${(1 - gone) * .9}"/>`; } });
  { const x = 300 - 40 * tv, fall = clamp((t - tv) / .45), y = lerp(1044 - 125 * .52, 1046, fall * fall); if (t > tv - .05) s += `<rect x="${x - 6}" y="${y - 10}" width="12" height="20" rx="2" fill="#151515" transform="rotate(${fall * 80},${x},${y})"/><rect x="${x - 4}" y="${y - 8}" width="8" height="14" fill="#3a6ad0" opacity="${.9 * (1 - fall * .3)}" transform="rotate(${fall * 80},${x},${y})"/>`; }
  { const x = 430 + 36 * tv + 14, fall = clamp((t - tv) / .4), y = lerp(1044 - 70, 1044, fall * fall); if (t > tv - .05) s += `<path d="M${x - 14},${y - 26} L${x + 14},${y - 26} L${x + 12},${y} L${x - 12},${y}Z" fill="#e8e8e0" transform="rotate(${fall * 20},${x},${y})"/><circle cx="${x + 18 * fall}" cy="${1040}" r="${6 * fall}" fill="#e88a1a"/>`; }
  F.ov = ''; return s;
}
// 1: the same street empty: cars left where they stopped, a door open, the light blinking amber, pigeons on the road, a bag blowing
function sceneEmpty(t) {
  let s = street(t, { id: 'e1', sky: ['#4a86c6', '#92bce0', '#d2e4f0'], sun: 1, sunX: 150, sunY: 480 });
  s += trafficLight(660, 1060, t, 'blink');
  s += car(300, 1218, .9, '#c83a2a', 1, 0);
  s += `<g transform="rotate(-8,560,1250)">${car(560, 1262, .95, '#d8d8dc', -1, 0)}</g>` + car(120, 1270, .9, '#2a4a7a', 1, 0);
  for (let i = 0; i < 6; i++) { const r = RS(i + 30); s += pigeon(120 + r() * 480, 1110 + r() * 40, .9 + r() * .3, t, i); }
  const bx = pmod(t * 80, 900) - 90; s += `<path d="M${bx},${1150 - Math.abs(Math.sin(t * 3)) * 30} q12,-14 26,-2 q-4,14 -14,18 q-12,-2 -12,-16Z" fill="#f4f4f0" opacity=".9"/>`;
  F.ov = ''; return s;
}
// 2: night over the city: windows and street lamps go dark district by district; the power station's lights and plume die; the stars come out
function sceneLights(t) {
  const st = S0(2) - .2, off0 = WS(2, 2) - .1, plantOff = WS(2, 6), sk = ease(ramp(t, off0 + .6, L(2).end));
  let s = `<defs>${RDEF}<linearGradient id="nsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050816"/><stop offset=".7" stop-color="${mix('#2a2440', '#0c1024', sk)}"/><stop offset="1" stop-color="${mix('#5a3e4a', '#141a30', sk)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#nsk)"/>`;
  s += stars(.25 + .75 * sk, t);
  if (sk > 0) s += `<path d="M-20,520 Q200,420 420,470 T760,400" stroke="#cfd8ff" stroke-width="90" fill="none" opacity="${.07 * sk}" filter="url(#haze)"/>`;
  s += `<circle cx="560" cy="460" r="22" fill="#f4f0e0"/><circle cx="552" cy="456" r="22" fill="#141a30" opacity=".75"/>`;
  // power station on the right: stacks with aviation lights, plume, lit halls
  const pOn = 1 - ramp(t, plantOff, plantOff + .4);
  s += `<rect x="560" y="760" width="160" height="90" fill="#1c1e26"/>` + [590, 640, 690].map((x, i) => `<path d="M${x - 14},860 L${x - 9},600 L${x + 9},600 L${x + 14},860Z" fill="#24262e"/><circle cx="${x}" cy="604" r="5" fill="#ff2a2a" opacity="${pOn * (.5 + .5 * Math.sin(t * 4 + i))}"/>` +
    (pOn > 0 ? Array.from({ length: 5 }, (_, q) => { const ph = pmod(t * .3 + q / 5 + i * .2, 1); return `<circle cx="${x + ph * 60}" cy="${600 - ph * 160}" r="${14 + ph * 40}" fill="#8a8a96" opacity="${.35 * (1 - ph) * pOn}" filter="url(#soft)"/>`; }).join('') : '')).join('') +
    Array.from({ length: 8 }, (_, i) => `<rect x="${570 + i * 18}" y="790" width="10" height="8" fill="#ffd27a" opacity="${pOn}"/>`).join('');
  // skyline: each window has its own off-time, earlier near the plant
  const r = RS(11); let x = -20;
  while (x < 560) { const w = 40 + r() * 60, h = 120 + r() * 260, base = 860; s += `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="#141824"/>`;
    for (let yy = base - h + 12; yy < base - 10; yy += 18) for (let xx = x + 6; xx < x + w - 8; xx += 13) { if (r() > .55) continue; const toff = off0 + (560 - x) / 560 * 1.4 + r() * .5, a = 1 - ramp(t, toff, toff + .08); if (a > .02) s += `<rect x="${xx}" y="${yy}" width="7" height="9" fill="${r() > .3 ? '#ffd27a' : '#cfe4ff'}" opacity="${(.85 * a).toFixed(2)}"/>`; }
    x += w + 6; }
  s += `<path d="M376,860 L380,560 L392,560 L396,860Z" fill="#181c28"/><ellipse cx="386" cy="580" rx="22" ry="12" fill="#181c28"/><circle cx="386" cy="548" r="4" fill="#ff2a2a" opacity="${1 - ramp(t, off0 + 1.2, off0 + 1.3)}"/>`;
  // the river with lamp reflections
  s += `<rect y="860" width="720" height="420" fill="#0c1424"/>`;
  for (let i = 0; i < 14; i++) { const lx = 20 + i * 52, toff = off0 + (560 - lx) / 560 * 1.4 + .3, a = 1 - ramp(t, toff, toff + .1); s += `<rect x="${lx - 2}" y="830" width="4" height="30" fill="#2a2e3a"/>` + (a > 0 ? `<circle cx="${lx}" cy="828" r="4" fill="#ffd27a" opacity="${a}"/><circle cx="${lx}" cy="828" r="18" fill="#ffb84a" opacity="${.25 * a}" filter="url(#blur2)"/><rect x="${lx - 3}" y="870" width="6" height="${120 + 40 * Math.sin(t * 2 + i)}" fill="#ffd27a" opacity="${.25 * a}" filter="url(#blur2)"/>` : ''); }
  for (let k = 0; k < 10; k++) s += `<path d="M-20,${880 + k * 36} q180,-6 380,0 t380,0" stroke="#3a4a6a" stroke-width="1.4" fill="none" opacity=".35" transform="translate(${Math.sin(t + k) * 10},0)"/>`;
  F.ov = ''; return s;
}
// 3: a New York subway tunnel: the pumps stop, the lights fail, groundwater rises over the tracks toward the platform
function sceneSubway(t) {
  const st = S0(3) - .2, k = ease(ramp(t, st + .5, WS(3, 13) + .3)), lights = 1 - ramp(t, st + .3, st + .5), emer = .8;
  const VPx = 430, VPy = 640, near = 1280, P = (xN, yN, z) => [lerp(xN, VPx, z), lerp(yN, VPy, z)];
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="tnW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6a6e"/><stop offset="1" stop-color="#1e2a2e"/></linearGradient></defs><rect width="720" height="1280" fill="#1a1e22"/>`;
  // far tunnel mouth darkness
  s += `<path d="M${VPx - 60},${VPy + 40} L${VPx - 60},${VPy - 50} Q${VPx},${VPy - 90} ${VPx + 60},${VPy - 50} L${VPx + 60},${VPy + 40}Z" fill="#050607"/>`;
  // ceiling and walls
  s += `<path d="M-20,-20 L740,-20 L${VPx + 60},${VPy - 50} L${VPx - 60},${VPy - 50}Z" fill="#3a3e40"/><path d="M740,-20 L740,1300 L${VPx + 60},${VPy + 40} L${VPx + 60},${VPy - 50}Z" fill="#4a4e4c"/><path d="M740,-20 L740,1300 L${VPx + 60},${VPy + 40} L${VPx + 60},${VPy - 50}Z" fill="#000" filter="url(#stainD)" opacity=".5"/>`;
  for (let i = 0; i < 12; i++) { const z = 1 - Math.pow(i / 12, .6), a = P(740, 1300, z), b = P(740, -20, z); s += `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#2a2e2e" stroke-width="${lerp(10, 1, z)}"/>`; }
  for (let q = 0; q < 3; q++) { const a = P(740, 200 + q * 60, 0), b = P(740, 200 + q * 60, .98); s += `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="${['#1a1a1a', '#5a3a1a', '#2a2a5a'][q]}" stroke-width="${6 - q}"/>`; }
  // platform on the left: tiled wall with the station band, I-beam columns, edge strip
  s += `<path d="M-20,-20 L${VPx - 60},${VPy - 50} L${VPx - 60},${VPy + 4} L-20,880Z" fill="#cfcabc"/><path d="M-20,-20 L${VPx - 60},${VPy - 50} L${VPx - 60},${VPy + 4} L-20,880Z" fill="#000" filter="url(#stainD)" opacity=".45"/>`;
  for (let q = 0; q < 10; q++) { const a = P(-20, 80 + q * 80, 0), b = P(-20, 80 + q * 80, .98); s += `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#9a968c" stroke-width="1.2" opacity=".6"/>`; }
  { const a = P(-20, 330, 0), b = P(-20, 330, .9), c = P(-20, 410, .9), d = P(-20, 410, 0); s += `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]} L${c[0]},${c[1]} L${d[0]},${d[1]}Z" fill="#7a2a1e"/><text x="40" y="420" font-family="Space Grotesk" font-weight="700" font-size="54" fill="#f4efe4" transform="skewY(29)" opacity=".95">14 ST</text>`; }
  s += `<path d="M-20,880 L${VPx - 60},${VPy + 4} L${VPx - 40},${VPy + 8} L250,1300 L-20,1300Z" fill="#8a8680"/><path d="M-20,880 L${VPx - 60},${VPy + 4} L${VPx - 40},${VPy + 8} L250,1300 L-20,1300Z" fill="#000" filter="url(#grainR)" opacity=".4"/><path d="M${VPx - 40},${VPy + 8} L250,1300" stroke="#e8c84a" stroke-width="14"/>`;
  for (let i = 0; i < 7; i++) { const z = 1 - Math.pow((i + 1) / 8, .55), b = P(250, 1300, z), tp = P(250, -20, z), w = lerp(18, 2, z); s += `<rect x="${b[0] - w / 2}" y="${tp[1]}" width="${w}" height="${b[1] - tp[1]}" fill="#2a4a3a"/><rect x="${b[0] - w / 2}" y="${tp[1]}" width="${w * .3}" height="${b[1] - tp[1]}" fill="#4a6a5a"/>`; }
  // track bed: ties, rails, third rail; then the rising water
  s += `<path d="M250,1300 L${VPx - 40},${VPy + 8} L${VPx + 60},${VPy + 40} L740,1300Z" fill="#2a2622"/>`;
  for (let i = 0; i < 18; i++) { const z = 1 - Math.pow((i + .5) / 18, .5), a = P(300, 1290, z), b = P(700, 1290, z); s += `<path d="M${a[0]},${a[1]} L${b[0]},${b[1]}" stroke="#4a3a2a" stroke-width="${lerp(14, 1.5, z)}"/>`; }
  [380, 600, 690].forEach((xr, i) => { s += `<path d="M${xr},1300 L${VPx + (xr - 500) * .05},${VPy + 20}" stroke="${i === 2 ? '#8a7a5a' : '#b8b4ac'}" stroke-width="${i === 2 ? 10 : 7}"/>`; });
  const wl = lerp(1310, 1000, k), wz = (1300 - wl) / 660;
  if (k > 0) { const a = P(250, 1300, 0), lft = [lerp(250, VPx - 40, wz * 2.4 > 1 ? 1 : wz * 2.4), wl]; s += `<path d="M${lerp(250, 330, (1300 - wl) / 640)},${wl} L740,${wl} L740,1300 L240,1300Z" fill="#3a5e66" opacity=".9"/><rect x="560" y="${wl + 4}" width="60" height="${1300 - wl}" fill="#ff6a4a" opacity=".12" filter="url(#blur2)"/>` +
    Array.from({ length: 6 }, (_, q) => `<path d="M250,${wl + 8 + q * 22} L740,${wl + 6 + q * 22}" stroke="#8ab0b8" stroke-width="1.2" opacity=".35" transform="translate(${Math.sin(t * 2 + q) * 8},0)"/>`).join('') + `<path d="M240,${wl} L740,${wl}" stroke="#cfe4e8" stroke-width="2" opacity=".6"/>` +
    Array.from({ length: 4 }, (_, q) => { const xx = 300 + q * 110 + Math.sin(t + q) * 10; return `<rect x="${xx}" y="${wl - 4}" width="${18 + q * 4}" height="6" fill="${['#e8e0d0', '#c83a2a', '#4a7ac8', '#e8c84a'][q]}" opacity=".8"/>`; }).join(''); }
  // the sump pump with its stopped indicator, ceiling lights failing to dim emergency lamps
  s += `<rect x="640" y="980" width="70" height="90" fill="#5a5e60"/><rect x="648" y="990" width="54" height="22" fill="#1a1a1a"/><text x="675" y="1006" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="14" fill="#ff4a3a">PUMP OFF</text><circle cx="675" cy="1040" r="10" fill="#ff2a2a" opacity="${.5 + .5 * Math.sin(t * 6)}"/>`;
  for (let i = 0; i < 8; i++) { const z = 1 - Math.pow((i + .5) / 8, .55), a = P(360, -20, z), w = lerp(150, 8, z); s += `<rect x="${a[0] - w / 2}" y="${a[1] + lerp(30, 2, z)}" width="${w}" height="${lerp(12, 1.5, z)}" fill="#f4f8f0" opacity="${.25 + .75 * lights}"/>` + (lights > 0 ? `<ellipse cx="${a[0]}" cy="${a[1] + lerp(60, 4, z)}" rx="${w}" ry="${w * .4}" fill="#f4f8e0" opacity="${.15 * lights}" filter="url(#soft)"/>` : ''); }
  s += `<rect width="720" height="1280" fill="#000" opacity="${.3 * (1 - lights)}"/>`;
  if (lights < 1) [[120, 260], [600, 200]].forEach(([x, y]) => { s += `<rect x="${x - 14}" y="${y}" width="28" height="12" fill="#ff5a3a" opacity="${emer}"/><circle cx="${x}" cy="${y + 6}" r="60" fill="#ff5a3a" opacity="${.12 * (1 - lights)}" filter="url(#soft)"/>`; });
  F.ov = ''; return s;
}
// 4: weeks later: the brown haze over the city thins away, distant hills appear, the factory stacks are cold
function sceneAir(t) {
  const k = ease(ramp(t, WS(4, 2) - .2, WS(4, 4) + .6));
  let s = `<defs>${RDEF}<linearGradient id="skA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#9a8a6a', '#3a7cc8', k)}"/><stop offset=".7" stop-color="${mix('#b8a07a', '#9cc4e6', k)}"/><stop offset="1" stop-color="${mix('#c8a878', '#dcebf4', k)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skA)"/>`;
  s += `<path d="M-20,800 L80,700 L180,740 L300,660 L420,720 L540,650 L640,700 L740,670 L740,860 L-20,860Z" fill="#8aa0b4" opacity="${.15 + .7 * k}"/>`;
  s += `<circle cx="160" cy="470" r="34" fill="#fffdf2" opacity="${.5 + .5 * k}"/>`;
  const r = RS(23); let x = -20; while (x < 740) { const w = 40 + r() * 70, h = 100 + r() * 250; s += bldg(x, 960, w, h, mix('#a89276', '#c8b89a', r()), Math.floor(r() * 99), .12); x += w + 8; }
  [100, 160].forEach(sx => { s += `<path d="M${sx - 10},960 L${sx - 7},700 L${sx + 7},700 L${sx + 10},960Z" fill="#7a6a5a"/><rect x="${sx - 8}" y="704" width="16" height="6" fill="#c83a2a"/>`; });
  s += `<rect y="960" width="720" height="320" fill="#a8987e"/><rect y="960" width="720" height="320" fill="#000" filter="url(#grainR)" opacity=".4"/>` + palmG(300, 1000, 230, t) + palmG(560, 1010, 250, t);
  s += `<rect width="720" height="1280" fill="#a88a5a" opacity="${.5 * (1 - k)}"/><rect y="560" width="720" height="420" fill="#8a6a4a" opacity="${.35 * (1 - k)}" filter="url(#haze)"/>`;
  F.ov = ''; return s;
}
// 5a: animals walk the street: a pack of dogs, a fox, cats on the wall, pigeons and swallows
function sceneAnimals(t) {
  const st = S0(5) - .2, T = t - st;
  let s = street(t, { id: 'a5', sky: ['#4a86c6', '#92bce0', '#d2e4f0'], sun: 1, sunX: 150, sunY: 480, dry: .2 });
  s += `<g transform="rotate(-8,560,1250)">${car(560, 1262, .95, '#c8c8cc', -1, 0)}</g>` + car(300, 1218, .9, '#a83a2a', 1, 0);
  s += quad(120 + T * 40, 1150, 1.2, { kind: 'dog', moving: 1, phase: t * 7, face: 1 }) + quad(40 + T * 40, 1176, 1.25, { kind: 'dog', moving: 1, phase: t * 7 + 1, face: 1, col: '#5a4a3a' }) + quad(-50 + T * 42, 1158, 1.2, { kind: 'dog', moving: 1, phase: t * 7 + 2, face: 1, col: '#d8c8a8' });
  s += quad(620 - T * 30, 1108, 1.1, { kind: 'fox', moving: 1, phase: t * 8, face: -1 });
  s += quad(200, 998, .9, { kind: 'cat', face: 1 }) + quad(260, 998, .85, { kind: 'cat', face: -1, col: '#c8843a' });
  for (let i = 0; i < 5; i++) { const r = RS(i + 50); s += pigeon(380 + r() * 300, 1080 + r() * 30, .9, t, i); }
  for (let i = 0; i < 7; i++) { const r = RS(i + 60), ph = pmod(T * .12 + r(), 1); s += pigeon(pmod(r() * 760 + T * 120, 800) - 40, 560 + r() * 160 - ph * 40, .9 + r() * .4, t, i, 1); }
  F.ov = ''; return s;
}
// 5b: Pripyat by Chernobyl, abandoned since 1986: Soviet blocks, the Ferris wheel, trees through the square; wild horses and a wolf
function scenePripyat(t) {
  const st = WS(5, 4) - .3, T = t - st;
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a92aa"/><stop offset="1" stop-color="#d8dcd8"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skP)"/>`;
  [[-10, 160, 330], [170, 130, 280], [470, 170, 360]].forEach(([x, w, h], i) => { s += `<rect x="${x}" y="${860 - h}" width="${w}" height="${h}" fill="#b8b4a8"/><rect x="${x}" y="${860 - h}" width="${w}" height="${h}" fill="#000" filter="url(#stainD)" opacity=".5"/>`;
    for (let yy = 860 - h + 14; yy < 850; yy += 24) for (let xx = x + 8; xx < x + w - 14; xx += 22) { const r = RS(xx * 7 + yy + i); s += `<rect x="${xx}" y="${yy}" width="14" height="14" fill="${r() > .6 ? '#1a1a1a' : '#4a5a64'}"/>`; } });
  // the Ferris wheel
  const wx = 380, wy = 640, wr = 140; s += `<path d="M${wx - 60},860 L${wx},${wy} L${wx + 60},860" stroke="#7a7a72" stroke-width="7" fill="none"/><circle cx="${wx}" cy="${wy}" r="${wr}" fill="none" stroke="#8a8a80" stroke-width="5"/><circle cx="${wx}" cy="${wy}" r="${wr * .85}" fill="none" stroke="#8a8a80" stroke-width="2"/>`;
  for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; s += `<path d="M${wx},${wy} L${wx + Math.cos(a) * wr},${wy + Math.sin(a) * wr}" stroke="#8a8a80" stroke-width="2"/><rect x="${wx + Math.cos(a) * wr - 12}" y="${wy + Math.sin(a) * wr}" width="24" height="20" rx="4" fill="#e8b830"/><rect x="${wx + Math.cos(a) * wr - 9}" y="${wy + Math.sin(a) * wr + 3}" width="18" height="8" fill="#5a6a6a" opacity=".6"/>`; }
  for (let i = 0; i < 9; i++) { const r = RS(i + 70); s += treeB(-20 + i * 92 + r() * 30, 900 + r() * 30, 220 + r() * 120, i + 70); }
  s += `<rect y="900" width="720" height="380" fill="#7a8a4a"/><rect y="900" width="720" height="380" fill="#000" filter="url(#grainR)" opacity=".4"/><path d="M-20,1010 L740,980" stroke="#9a9888" stroke-width="40" opacity=".5"/>`;
  for (let i = 0; i < 80; i++) { const r = RS(i + 80), x = r() * 720, y = 905 + Math.pow(r(), 1.2) * 370, h = 8 + (y - 900) * .05; s += `<path d="M${x},${y} l${(r() - .5) * 6},${-h} M${x + 3},${y} l${2 + r() * 3},${-h * .8}" stroke="${mix('#5a7a32', '#9ab858', r())}" stroke-width="1.6"/>`; }
  s += quad(170 + T * 18, 1120, 1.15, { kind: 'horse', moving: 1, phase: t * 4.5, face: 1 }) + quad(60 + T * 16, 1170, 1.25, { kind: 'horse', graze: 1, face: 1, col: '#b89460' }) + quad(560 - T * 26, 1210, 1.3, { kind: 'wolf', moving: 1, phase: t * 6.5, face: -1 });
  s += `<text x="360" y="1196" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بريبيات قرب تشيرنوبل — مهجورة منذ ١٩٨٦</text>`;
  F.ov = ''; return s;
}
// 6a: close on the asphalt: cracks open and weeds push through
function sceneCrack(t) {
  const st = S0(6) - .2, k = ease(ramp(t, WS(6, 3) - .4, WS(6, 6)));
  let s = `<defs>${RDEF}${RDEF2}</defs><rect width="720" height="1280" fill="#4a4a4e"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".7"/><rect width="720" height="1280" fill="#000" filter="url(#pebT)" opacity=".5"/>`;
  s += `<rect x="300" y="-20" width="30" height="1320" fill="#e8e4d0" opacity=".75"/><rect x="300" y="-20" width="30" height="1320" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  const r = RS(7); let cr = '';
  for (let b = 0; b < 9; b++) { let x = 360 + (r() - .5) * 500, y = 380 + r() * 880, d = `M${x},${y}`; for (let q = 0; q < 8; q++) { x += (r() - .5) * 90; y += (r() - .5) * 70; d += ` L${x.toFixed(1)},${y.toFixed(1)}`; } cr += `<path d="${d}" stroke="#141414" stroke-width="${4 + r() * 5}" fill="none" stroke-linecap="round" stroke-dasharray="${900 * k} 900"/>`; }
  s += cr;
  for (let i = 0; i < 22; i++) { const r2 = RS(i + 40), x = 80 + r2() * 560, y = 420 + r2() * 840, g = clamp(k * 1.4 - r2() * .5); if (g <= 0) continue;
    for (let q = 0; q < 7; q++) { const a = (-90 + (q - 3) * 22 + Math.sin(t * 1.5 + i + q) * 4) * Math.PI / 180, L_ = (30 + r2() * 50) * g; s += `<path d="M${x},${y} q${Math.cos(a) * L_ * .3},${Math.sin(a) * L_ * .6} ${Math.cos(a) * L_},${Math.sin(a) * L_}" stroke="${q % 2 ? '#5a8a2a' : '#7aa83a'}" stroke-width="${3 + 2 * g}" fill="none" stroke-linecap="round"/>`; }
    if (g > .8 && r2() > .6) s += `<circle cx="${x + 4}" cy="${y - 50 * g}" r="6" fill="#f4d84a"/><circle cx="${x + 4}" cy="${y - 50 * g}" r="2.5" fill="#c8841a"/>`; }
  F.ov = ''; return s;
}
// 6b: the street turned green: grass, shrubs and young trees, rusting cars wrapped in vines
function sceneGreen(t) {
  let s = street(t, { id: 'g6', sky: ['#4a86c6', '#92bce0', '#d2e4f0'], sun: 1, sunX: 150, sunY: 480 });
  s += `<rect y="1000" width="720" height="290" fill="#6a8a3a"/><rect y="1000" width="720" height="290" fill="#000" filter="url(#grainR)" opacity=".5"/>`;
  for (let i = 0; i < 4; i++) s += `<path d="M${40 + i * 180},${1000} q20,-120 0,-240 q40,100 30,240Z" fill="#3e6a26" opacity=".85"/>`;
  s += car(300, 1218, .9, '#8a4a2a', 1, 0).replace(/#c83a2a|#a83a2a/g, '#8a4a2a') + car(560, 1262, .95, '#8a7a6a', -1, 0);
  for (let i = 0; i < 14; i++) { const r = RS(i + 90), x = 220 + r() * 440, y = 1120 + r() * 120; s += `<path d="M${x},${y} q${(r() - .5) * 40},-${40 + r() * 40} ${(r() - .5) * 60},-${70 + r() * 50}" stroke="#3a6a22" stroke-width="3" fill="none"/>` + Array.from({ length: 4 }, (_, q) => `<ellipse cx="${x + (r() - .5) * 50}" cy="${y - 30 - r() * 80}" rx="9" ry="5" fill="#4a8a2e" transform="rotate(${r() * 90},${x},${y})"/>`).join(''); }
  for (let i = 0; i < 140; i++) { const r = RS(i + 120), x = r() * 720, y = 1004 + Math.pow(r(), 1.3) * 280, h = 10 + (y - 1000) * .07; s += `<path d="M${x},${y} l${(r() - .5) * 6},${-h} M${x + 3},${y} l${2 + r() * 3},${-h * .8}" stroke="${mix('#4a7a2a', '#9ac04e', r())}" stroke-width="1.8"/>`; }
  s += treeB(90, 1180, 300, 5) + treeB(650, 1120, 260, 6);
  F.ov = ''; return s;
}
// 7: decades later: a rusting steel truss bridge sags and a span drops into the river; untended houses lose their roofs
function sceneBridge(t) {
  const st = S0(7) - .2, rust = ease(ramp(t, st, WS(7, 7))), fall = ease(ramp(t, WS(7, 5) - .2, WS(7, 5) + 1.0)), roof = ease(ramp(t, WS(7, 3), WS(7, 3) + .8));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#dfe6e8"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skB)"/>`;
  for (let i = 0; i < 10; i++) { const r = RS(i + 10); s += treeB(-20 + i * 80, 820, 120 + r() * 60, i + 10); }
  // houses on the bank, roofs caving in
  [[30, 130, 150], [180, 110, 120]].forEach(([x, w, h], i) => { s += `<rect x="${x}" y="${840 - h}" width="${w}" height="${h}" fill="#b8a888"/><rect x="${x}" y="${840 - h}" width="${w}" height="${h}" fill="#000" filter="url(#stainD)" opacity=".6"/>` +
    `<path d="M${x - 8},${840 - h} L${x + w / 2},${840 - h - 50 + 60 * roof * (i ? .6 : 1)} L${x + w + 8},${840 - h}" stroke="#6a4a2e" stroke-width="10" fill="none"/>` + [0, 1].map(q => `<rect x="${x + 16 + q * 50}" y="${840 - h + 30}" width="30" height="40" fill="#1a1a1a"/>`).join('') + `<path d="M${x + 10},${840 - h + 10} q20,40 0,${h - 20}" stroke="#3e6a26" stroke-width="6" fill="none"/>`; });
  s += riverW(840, 1280, t, { id: 'b7', col: ['#5a7a7a', '#2e4a4e'] });
  // the bridge: three truss spans on piers; the middle one tilts and falls
  const deckY = 760, spans = [[-20, 230], [230, 480], [480, 740]], tc = mix('#8a8e94', '#8a4a22', rust);
  [230, 480].forEach(px => { s += `<rect x="${px - 16}" y="${deckY + 10}" width="32" height="${1000 - deckY}" fill="#a8a092"/><rect x="${px - 16}" y="980" width="32" height="40" fill="#5a6a5a" opacity=".5"/>`; });
  spans.forEach(([a, b], i) => { const mid = i === 1, rot = mid ? 22 * fall : 0, dy = mid ? 260 * fall * fall : 0; let tr = `<g transform="translate(0,${dy}) rotate(${rot},${a},${deckY})">`;
    tr += `<rect x="${a}" y="${deckY}" width="${b - a}" height="12" fill="${mix('#6a6a6a', '#5a3a1e', rust)}"/><path d="M${a},${deckY} L${a + 30},${deckY - 80} L${b - 30},${deckY - 80} L${b},${deckY}" stroke="${tc}" stroke-width="8" fill="none"/>`;
    for (let q = 0; q < 6; q++) { const x0 = a + 30 + q * (b - a - 60) / 6, x1 = a + 30 + (q + 1) * (b - a - 60) / 6; tr += `<path d="M${x0},${deckY - 80} L${x1},${deckY} M${x1},${deckY - 80} L${x1},${deckY}" stroke="${tc}" stroke-width="4"/>`; }
    tr += `<path d="M${a},${deckY + 12} L${b},${deckY + 12}" stroke="#000" stroke-width="2" opacity=".3"/></g>`; s += tr; });
  if (fall > .6) for (let i = 0; i < 8; i++) { const r = RS(i + 30), ph = pmod(t * 1.5 + r(), 1); s += `<ellipse cx="${300 + r() * 160}" cy="${1000 + ph * 10}" rx="${30 + ph * 60}" ry="${8 + ph * 10}" fill="#fff" opacity="${(.7 * (1 - ph)).toFixed(2)}"/>`; }
  F.ov = ''; return s;
}
// 8: centuries: a tower falls in a cloud of dust and the forest closes over the city
function sceneForest(t) {
  const st = S0(8) - .2, fall = ease(ramp(t, WS(8, 3) - .1, WS(8, 3) + 1.3)), grow = ease(ramp(t, WS(8, 6) - .4, L(8).end + .2));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac4"/><stop offset="1" stop-color="#d8e4e4"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF)"/>`;
  const towers = [[40, 110, 520], [180, 90, 420], [300, 120, 620], [450, 100, 480], [580, 120, 560]];
  towers.forEach(([x, w, h], i) => { const fallen = i === 2; let g = `<g transform="${fallen ? `rotate(${-64 * fall},${x + w},1000) translate(0,${40 * fall})` : ''}">` + bldg(x, 1000, w, h * (1 - (i % 2) * .1 * grow), mix('#8a8e92', '#6a6e66', grow), i + 40, .12);
    g += `<rect x="${x}" y="${1000 - h}" width="${w}" height="${h}" fill="#000" filter="url(#stainD)" opacity=".5"/>`;
    for (let q = 0; q < 4; q++) g += `<path d="M${x + 10 + q * w / 4},1000 q${(q % 2 ? 1 : -1) * 18},-${h * .4} 0,-${h * (.3 + .5 * grow)}" stroke="#3e6a26" stroke-width="${5 + 3 * grow}" fill="none" opacity=".9"/>`;
    s += g + `</g>`; });
  if (fall > 0 && fall < 1) for (let i = 0; i < 10; i++) { const r = RS(i + 50); s += `<circle cx="${300 + r() * 360 * fall}" cy="${960 - r() * 140 * fall}" r="${60 + r() * 80}" fill="#c8bca8" opacity="${.55 * Math.sin(Math.PI * fall)}" filter="url(#soft)"/>`; }
  for (let i = 0; i < 16; i++) { const r = RS(i + 60), h = (160 + r() * 260) * (.35 + .65 * grow); s += treeB(-30 + i * 50 + r() * 20, 1040 + r() * 40, h, i + 60); }
  s += `<rect y="1060" width="720" height="230" fill="#4a6a2e"/><rect y="1060" width="720" height="230" fill="#000" filter="url(#grainR)" opacity=".45"/>`;
  for (let i = 0; i < 6; i++) { const r = RS(i + 90); s += treeB(40 + i * 130, 1240, 260 + r() * 120, i + 90); }
  F.ov = ''; return s;
}
// 9: a river bank where plastic bottles, bags and caps lie half-buried in sand between reeds
function scenePlastic(t) {
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="skPl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ad0"/><stop offset="1" stop-color="#e8eef0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skPl)"/>`;
  s += riverW(700, 860, t, { id: 'p9', col: ['#5a8a9a', '#3a6a7a'], sunX: 520 });
  s += `<path d="M-20,860 Q200,840 400,870 T740,860 L740,1290 L-20,1290Z" fill="#d8c49a"/><path d="M-20,860 Q200,840 400,870 T740,860 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".35"/><path d="M-20,860 Q200,840 400,870 T740,860" stroke="#f4ecd8" stroke-width="5" fill="none" opacity=".7"/>`;
  for (let i = 0; i < 26; i++) { const r = RS(i + 10), x = r() * 720, y = 880 + r() * 40; s += `<path d="M${x},${y} q${(r() - .5) * 20},-${60 + r() * 60} ${(r() - .5) * 30},-${110 + r() * 80}" stroke="${mix('#6a7a3a', '#a8a05a', r())}" stroke-width="3" fill="none"/>`; }
  const bottle = (x, y, a, c, sc) => `<g transform="translate(${x},${y}) rotate(${a}) scale(${sc})"><rect x="-46" y="-14" width="78" height="28" rx="10" fill="${c}" opacity=".75"/><rect x="30" y="-7" width="16" height="14" rx="3" fill="${c}" opacity=".8"/><rect x="44" y="-8" width="8" height="16" rx="2" fill="#2a6ad0"/><rect x="-30" y="-14" width="34" height="28" fill="#e84a3a" opacity=".55"/><rect x="-40" y="-10" width="60" height="6" fill="#fff" opacity=".35"/></g>`;
  s += bottle(180, 1060, -12, '#bfe4f4', 1.3) + bottle(520, 1150, 18, '#d8f0d8', 1.5) + bottle(380, 980, 4, '#e8f4f8', 1.0);
  s += `<path d="M560,1010 q40,-50 90,-10 q20,40 -20,60 q-50,10 -70,-50Z" fill="#f4f4f4" opacity=".7"/><path d="M90,1180 q30,-40 80,-16 q10,40 -30,50 q-40,0 -50,-34Z" fill="#4a4a4a" opacity=".75"/>`;
  [[300, 1220, '#e8c84a'], [640, 1240, '#c83a2a'], [80, 1000, '#2a6ad0']].forEach(([x, y, c]) => { s += `<ellipse cx="${x}" cy="${y}" rx="12" ry="7" fill="${c}"/><ellipse cx="${x}" cy="${y - 2}" rx="9" ry="4" fill="#fff" opacity=".3"/>`; });
  s += `<rect y="1100" width="720" height="190" fill="#d0bc92" opacity=".55"/>`;
  F.ov = ''; return s;
}
// 10: our broadcasts: a bubble of radio and TV signals around Earth, ~100 light-years across by now
function sceneRadio(t) {
  const st = S0(10) - .2, k = ramp(t, WS(10, 3) - .3, L(10).end);
  let s = space(t, '#020309', '#060818');
  F.earth = { x: 360, y: 800, r: 70, a: 1, sunI: 1, lights: .6, rot: 1.2, tilt: .41 }; F.light = [-600, 300];
  let ov = '';
  for (let i = 0; i < 9; i++) { const ph = pmod(t * .35 + i / 9, 1), rr = 80 + ph * 560; ov += `<circle cx="360" cy="800" r="${rr}" fill="none" stroke="#7ac8ff" stroke-width="${3 - 2 * ph}" opacity="${(.6 * (1 - ph) * (.3 + .7 * k)).toFixed(2)}"/>`; }
  ov += `<circle cx="360" cy="800" r="420" fill="none" stroke="#f4c76b" stroke-width="2" stroke-dasharray="8 10" opacity="${ramp(t, WS(10, 9), WS(10, 9) + .5)}"/><text x="360" y="372" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#f4c76b" opacity="${ramp(t, WS(10, 9), WS(10, 9) + .5)}">نحو ١٠٠ سنة ضوئية</text>`;
  [[150, 560, 'ألفا قنطورس'], [600, 650, 'سيريوس'], [210, 1080, 'فيغا']].forEach(([x, y, n]) => { ov += `<circle cx="${x}" cy="${y}" r="4" fill="#fff"/><circle cx="${x}" cy="${y}" r="12" fill="#cfe4ff" opacity=".25" filter="url(#blur2)"/><text x="${x}" y="${y + 30}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#cfd8ff">${n}</text>`; });
  F.ov = ov; return s;
}
// 11: CTA – the night side of Earth with no city lights
function sceneEarth(t) {
  const st = S0(11), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: .9, lights: 0, rot: 2.2, tilt: .41 }; F.light = [-800, 200]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 5), WS(11, 5) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneEmpty }, { s: S0(2) - .2, f: sceneLights }, { s: S0(3) - .2, f: sceneSubway },
  { s: S0(4) - .2, f: sceneAir }, { s: S0(5) - .2, f: sceneAnimals }, { s: WS(5, 4) - .3, f: scenePripyat }, { s: S0(6) - .2, f: sceneCrack },
  { s: WS(6, 6) - .3, f: sceneGreen }, { s: S0(7) - .2, f: sceneBridge }, { s: S0(8) - .2, f: sceneForest }, { s: S0(9) - .2, f: scenePlastic },
  { s: S0(10) - .2, f: sceneRadio }, { s: S0(11) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['ساعات', S0(2)], ['يومان', S0(3)], ['أسابيع', S0(4)], ['سنوات', S0(6)], ['عقود', S0(7)], ['قرون', S0(8)]];
const LIST_ON = new Set([sceneAir, sceneGreen, sceneBridge]);
const CHIPS = [
  ['c1', '٨ مليارات إنسان… اختفوا', 360, 330, 'big', WS(0, 5), S0(1) - .3],
  ['c2', 'خلال ساعات: انطفاء', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', 'نيويورك: ≈ ٣٦ ساعة', 360, 330, 'big', WS(3, 10), S0(4) - .3],
  ['c4', 'هواء أنقى', 360, 330, 'big', WS(4, 3), S0(5) - .3],
  ['c5', 'الحيوانات تعود', 360, 330, 'big', WS(5, 1), WS(5, 4) - .3],
  ['c6', 'تشيرنوبل: الذئاب والخيول البرية', 360, 330, 'big', WS(5, 7), S0(6) - .3],
  ['c7', 'بعد سنوات', 360, 330, 'big', WS(6, 1), S0(7) - .3],
  ['c8', 'بعد عقود: الصدأ', 360, 330, 'big', WS(7, 1), S0(8) - .3],
  ['c9', 'بعد قرون', 360, 330, 'big', WS(8, 1), S0(9) - .3],
  ['c10', 'البلاستيك: مئات السنين', 360, 330, 'big', WS(9, 1), S0(10) - .3],
  ['c11', 'إشارات الراديو', 360, 330, 'big', WS(10, 3), S0(11) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:320px"><div class="hd">بعد اختفاء البشر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 42; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  const vis = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 42) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act;
    $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + k).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = SCENES[i].f === sceneRadio ? .9 * ease(ramp(t, SCENES[i].s + .3, SCENES[i].s + .7)) : 0;
}
