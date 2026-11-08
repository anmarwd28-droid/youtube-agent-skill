// ===================== Weird Space Lab #1: What if gravity disappeared for 5 seconds? =====================
const tOff = () => WS(0, 3) - .05;            // "disappeared" – gravity switches off
const tOn = () => WS(8, 2) - .05;             // "snaps" – gravity switches back on
const SKY = ['#3a7cc4', '#8ab8e0', '#d2e4f0'];
const EN = (txt, x, y, sz, col = '#fff', anc = 'middle', w = 700) => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Inter Display, Space Grotesk, sans-serif" font-weight="${w}" font-size="${sz}" fill="${col}">${txt}</text>`;
const shadowE = (x, y, w, a) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * .16}" fill="#000" opacity="${a}" filter="url(#blur2)"/>`;
// a person that can hover (lift in px) and slowly tumble (rot in degrees); the shadow stays on the ground and fades with height
function floater(x, y, c, sc, face, t, lift, rot = 0, o = {}) {
  return shadowE(x, y + 2, 38 * sc / .55, .35 * Math.max(.25, 1 - lift / 160)) +
    `<g transform="rotate(${rot.toFixed(2)},${x},${y - lift - 90 * sc / .55})">` + onWalk(x, y - lift, c, sc, face, t, o) + `</g>`;
}
// the gravity switch shown as an overlay (on = 1 means ON)
function gSwitch(on, a, label2 = '') {
  if (a <= .01) return '';
  const kx = lerp(-26, 26, on), col = mix('#d64040', '#43a047', on);
  return `<g opacity="${a}" transform="translate(360,330)"><rect x="-150" y="-46" width="300" height="92" rx="46" fill="rgba(8,12,30,.78)" stroke="rgba(255,255,255,.22)"/>` +
    EN('GRAVITY', -38, 12, 30, '#fff') + `<rect x="40" y="-24" width="92" height="48" rx="24" fill="${col}"/><circle cx="${86 + kx}" cy="0" r="20" fill="#fff"/>` +
    EN(on > .5 ? 'ON' : 'OFF', 86 + kx, 6, 15, '#1c140a', 'middle', 800) + (label2 ? EN(label2, 0, 86, 26, '#f4c76b') : '') + `</g>`;
}
// street with lifted cars (bareStreet draws its own two cars; we hide them under our own lifted copies)
function liftStreet(t, o, carLift = 0, carRot = 0) {
  let s = bareStreet(t, Object.assign({ id: 'g' + (o.id || 0), green: 1, sky: SKY, sunGlow: .28 }, o));
  if (carLift > .5) {
    // repaint the road under the parked cars, then draw them hovering with their shadows left on the asphalt
    s += `<rect y="1116" width="720" height="170" fill="#4e4e54"/><rect y="1116" width="720" height="170" fill="#000" filter="url(#grainR)" opacity=".5"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1206" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
    s += shadowE(520, 1172, 110, .45 * Math.max(.3, 1 - carLift / 120)) + shadowE(150, 1252, 104, .45 * Math.max(.3, 1 - carLift / 120));
    s += `<g transform="rotate(${carRot},520,${1120 - carLift})">${car(520, 1170 - carLift, .95, '#d8d8dc', -1, 0)}</g><g transform="rotate(${-carRot * .8},150,${1200 - carLift})">${car(150, 1250 - carLift, .9, '#a83a2a', 1, 0)}</g>`;
  }
  return s;
}
// floating street bits: leaves, a ball, a hat
function bits(t, t0, k, seed = 5) {
  let s = ''; const r = RS(seed);
  for (let i = 0; i < 14; i++) {
    const x = r() * 720, y0 = 1010 + r() * 100, vy = 8 + r() * 20, T = Math.max(0, t - t0), y = y0 - k * (vy * T + 4 * T * T * r()), sp = (r() - .5) * 200 * T;
    s += `<g transform="translate(${x + Math.sin(T * 1.3 + i) * 10},${y}) rotate(${sp})"><path d="M-7,0 Q0,-6 7,0 Q0,6 -7,0Z" fill="${['#5a7e32', '#86a44a', '#a8742a'][i % 3]}"/></g>`;
  }
  return s;
}

// 0: an ordinary street; on "disappeared" the switch flips to OFF
function sceneHook(t) {
  const off = ease(ramp(t, tOff(), tOff() + .35)), wx = 210 + Math.min(t, tOff()) * 30, T = Math.max(0, t - tOff());
  let s = liftStreet(t, { id: 0 });
  s += floater(wx, 1088, CROWD[0], .55, 1, t, T * 2.5, 0, { moving: t < tOff() ? 1 : 0, phase: t * 6, lookUp: off * .4 }) + floater(520, 1082, CROWD[1], .52, -1, t, T * 2, 0, { lookUp: off * .4 });
  s += pigeon(300, 1096 - T * 6, .8, t, 1, 0) + pigeon(600, 1100 - T * 8, .8, t, 2, 0);
  F.ov = gSwitch(1 - off, ease(ramp(t, .25, .6)) * (1 - ease(ramp(t, S0(1) - .5, S0(1) - .2))));
  F.flash = t > tOff() && t < tOff() + .35 ? .22 * (1 - (t - tOff()) / .35) : 0; return s;
}
// 1: weightless – people rise off the pavement, leaves and pigeons drift up
function sceneFloat(t) {
  const st = S0(1) - .2, T = t - st, L1 = 6 + T * 7, k = 1;
  let s = liftStreet(t, { id: 1 }, Math.min(30, 4 + T * 4), Math.sin(T * .8) * 1.5);
  s += floater(250, 1088, CROWD[0], .55, 1, t, L1, Math.sin(T * .9) * 6, { lookUp: .3 }) + floater(520, 1082, CROWD[1], .52, -1, t, L1 * .9, -Math.sin(T * .7) * 7, { lookUp: .5 });
  s += pigeon(300, 1080 - T * 22, .8, t, 1, 1) + pigeon(610, 1070 - T * 28, .8, t, 2, 1) + bits(t, st, k);
  // a ball leaving the pavement
  s += shadowE(420, 1096, 18, .3) + `<g transform="translate(420,${1078 - T * 16}) rotate(${T * 40})"><circle r="17" fill="#f4f4f0"/><path d="M-17,0 A17,17 0 0 1 17,0" fill="#d64040"/><circle r="17" fill="none" stroke="#333" stroke-width="2"/></g>`;
  F.ov = ''; return s;
}
// 2: the real Earth spinning; the equator and the speed of the ground there
function sceneSpin(t) {
  const st = S0(2) - .2, k = ease(ramp(t, WS(2, 3) - .2, WS(2, 5) + .3));
  let s = space(t, '#03050f', '#0a1030');
  const ex = 360, ey = 780, er = 270, rot = 3.2 + (t - st) * .35;
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .25, rot, tilt: .41 }; F.light = [-700, 200]; F.moon = null;
  const ang = -.41, ca = Math.cos(ang), sa = Math.sin(ang), ph = ((t - st) * .7) % 2 - 1; // the dot slides across the front of the equator
  const P = u => [ex + ca * u * er, ey + sa * u * er];
  const [x1, y1] = P(-1), [x2, y2] = P(1), d = P(Math.sin(ph * Math.PI / 2));
  F.ov = `<g opacity="${k}"><path d="M${x1},${y1} L${x2},${y2}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="10 9"/>` +
    `<circle cx="${d[0]}" cy="${d[1]}" r="10" fill="#f4c76b"/><circle cx="${d[0]}" cy="${d[1]}" r="20" fill="#f4c76b" opacity=".3"/>` +
    `<path d="M${x2 + 10},${y2 - 18} l60,-30" stroke="#fff" stroke-width="2"/>` + EN('EQUATOR', x2 + 34, y2 - 58, 22, '#fff') + `</g>` +
    `<g opacity="${ease(ramp(t, WS(2, 0), WS(2, 2) + .3))}"><path d="M${ex - er - 30},${ey - 60} A${er + 40},${er + 40} 0 0 1 ${ex - 40},${ey - er - 36}" stroke="#fff" stroke-width="3" fill="none" marker-end="url(#arrW)" opacity=".75"/></g>`;
  return s;
}
// 3: not to scale – you keep going straight while the curved ground turns away beneath you
function sceneTangent(t) {
  const st = S0(3) - .2, T = ramp(t, WS(3, 5), L(3).end + .3), th = .42 * ease(T);
  const cx = 360, cy = 1430, Rr = 620, top = cy - Rr;
  let s = space(t, '#03050f', '#0a1230') + `<circle cx="${cx}" cy="${cy}" r="${Rr + 40}" fill="#4a86ff" opacity=".12" filter="url(#haze)"/>`;
  // the planet's surface with a little skyline, rotating by th (the ground moves with the spin)
  let g = `<circle cx="${cx}" cy="${cy}" r="${Rr}" fill="#2c4a2a"/><circle cx="${cx}" cy="${cy}" r="${Rr}" fill="#000" filter="url(#grainR)" opacity=".35"/><circle cx="${cx}" cy="${cy}" r="${Rr - 18}" fill="#3a3024"/>`;
  const r = RS(4); for (let i = -14; i <= 14; i++) { const a = i * .065, h = 26 + r() * 60, w = 22 + r() * 18; g += `<rect x="${cx - w / 2}" y="${top - h + 4}" width="${w}" height="${h}" fill="${mix('#20283a', '#3a4660', r())}" transform="rotate(${a * 57.3},${cx},${cy})"/>`; }
  g += `<rect x="${cx - 4}" y="${top - 30}" width="8" height="30" fill="#f4c76b" transform="rotate(0,${cx},${cy})"/>`;
  s += `<g transform="rotate(${th * 57.3},${cx},${cy})">${g}</g>`;
  // the person: straight line along the tangent
  const px = cx + Rr * Math.tan(th) * .98, py = top - 6;
  const gap = Math.hypot(px - cx, py - cy) - Rr;
  F.ov = `<path d="M${cx - 300},${top - 6} L${cx + 360},${top - 6}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="12 10" opacity="${ease(ramp(t, WS(3, 9), WS(3, 11)))}"/>` +
    (gap > 14 ? `<path d="M${px},${py + 4} L${px},${py + gap - 4}" stroke="#fff" stroke-width="2.5" marker-start="url(#arrW)" marker-end="url(#arrW)"/>` : '') +
    `<g transform="translate(${px},${py}) rotate(${-th * 20})">${onWalk(0, 0, CROWD[0], .42, 1, t, { lookUp: .2 })}</g>` +
    EN('* not to scale', 360, 1240, 20, 'rgba(255,255,255,.55)', 'middle', 500);
  return s;
}
// 4: five seconds later everything hovers about 40 cm up
function sceneLift(t) {
  const st = S0(4) - .2, k = ease(ramp(t, st, WS(4, 5) + .2)), lift = 14 + 30 * k; // ~44 px ≈ 40 cm next to a 1.7 m person
  let s = liftStreet(t, { id: 4 }, 14 + 36 * k, Math.sin(t) * 2);
  s += floater(250, 1088, CROWD[0], .55, 1, t, lift, Math.sin(t * .9) * 8, { lookUp: .3 }) + floater(520, 1082, CROWD[2], .52, -1, t, lift * .95, -6 - Math.sin(t * .7) * 5, { lookUp: .4 });
  s += bits(t, st - 2, 1, 9);
  const ra = ease(ramp(t, WS(4, 3) - .2, WS(4, 3) + .2));
  F.ov = `<g opacity="${ra}"><path d="M318,1088 L318,${1088 - lift}" stroke="#f4c76b" stroke-width="4" marker-start="url(#arrY)" marker-end="url(#arrY)"/><rect x="326" y="${1066 - lift / 2}" width="86" height="34" rx="8" fill="rgba(8,12,30,.75)"/>` + EN('40 cm', 369, 1090 - lift / 2, 22, '#f4c76b') + `</g>`;
  return s;
}
// 4b: even the sea lifts off in wobbling sheets and blobs
function sceneSea(t) {
  const st = WS(4, 8) - .3, T = t - st;
  let s = `<defs><linearGradient id="gsk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a7cc4"/><stop offset="1" stop-color="#cfe0ee"/></linearGradient></defs><rect width="720" height="1280" fill="url(#gsk)"/>`;
  s += `<rect y="760" width="720" height="520" fill="url(#seaG)"/>`;
  for (let i = 0; i < 18; i++) s += `<path d="M-20,${790 + i * 28} q45,${-6 - i * .4} 90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0 t90,0" stroke="#fff" stroke-opacity="${.08 + i * .006}" stroke-width="2" fill="none" transform="translate(${(t * (20 + i * 3)) % 90 - 90},${-Math.max(0, T) * (2 + i * .6)})"/>`;
  // a fishing boat lifting with the water under it
  const by = 860 - Math.max(0, T) * 8;
  s += `<g transform="translate(470,${by}) rotate(${Math.sin(t * 1.2) * 4})"><path d="M-80,0 L80,0 L60,34 L-62,34Z" fill="#c0392b"/><rect x="-36" y="-40" width="50" height="40" fill="#f4f0e6"/><rect x="-4" y="-110" width="5" height="110" fill="#5a4a3a"/></g>`;
  // water globules rising off the surface (surface tension pulls them round)
  const r = RS(31); for (let i = 0; i < 40; i++) { const x = r() * 720, y0 = 780 + r() * 420, sz = 4 + r() * 14, v = 6 + r() * 18, y = y0 - Math.max(0, T) * v - 2 * Math.max(0, T) ** 2 * r();
    s += `<ellipse cx="${x + Math.sin(t * 2 + i) * 4}" cy="${y}" rx="${sz * (1 + .15 * Math.sin(t * 5 + i))}" ry="${sz * (1 - .15 * Math.sin(t * 5 + i))}" fill="#7ab4e0" opacity=".85"/><ellipse cx="${x - sz * .3}" cy="${y - sz * .35}" rx="${sz * .3}" ry="${sz * .2}" fill="#fff" opacity=".7"/>`; }
  F.ov = ''; return s;
}
// 5a: air pressure is the weight of the air above you – a column of air pressing on one person
function sceneAir(t) {
  const st = S0(5) - .2, k = ease(ramp(t, WS(5, 7) - .2, WS(5, 12) + .3));
  let s = `<defs><linearGradient id="gcol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05081a"/><stop offset=".55" stop-color="#2a5a9a"/><stop offset="1" stop-color="#8ab8e0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#gcol)"/>` + stars(.8 * (1 - k * .3), t);
  s += `<rect y="1090" width="720" height="190" fill="#c8bca6"/><rect y="1090" width="720" height="190" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  // the column of air above the person, drawn as stacked translucent layers getting thinner with height
  for (let i = 0; i < 12; i++) { const y = 1080 - (i + 1) * 62, a = (.42 - i * .03) * k; s += `<rect x="300" y="${y}" width="120" height="58" rx="6" fill="#bfe0ff" opacity="${a}"/>`; }
  for (let i = 0; i < 3; i++) s += `<path d="M${330 + i * 30},${520 + ((t * 120 + i * 50) % 160)} l0,40" stroke="#fff" stroke-width="4" marker-end="url(#arrW)" opacity="${.8 * k}"/>`;
  s += castSh(360, 1090) + onWalk(360, 1090, CROWD[3], .55, 1, t, { lookUp: .5 });
  F.ov = '';
  return s;
}
// 5b: the whole sky rises – clouds stretch upward, wind streaks speed up, things are pulled skyward
function sceneSky(t) {
  const st = WS(5, 18) - .3, T = Math.max(0, t - st), k = ease(ramp(t, st, st + 1.2));
  let clouds = ''; for (let i = 0; i < 6; i++) { const r = RS(i + 3), cx = 80 + r() * 560, cy = 470 + r() * 200 - T * T * 14 * (.5 + r()); clouds += `<ellipse cx="${cx}" cy="${cy}" rx="${110 + r() * 60 - T * 6}" ry="${36 + r() * 16 + T * 16}" fill="#fff" opacity=".85" filter="url(#soft)"/>`; }
  let s = liftStreet(t, { id: 5, afterSky: clouds, sky: [mix(SKY[0], '#2a5a9a', T / 6), SKY[1], SKY[2]] }, 50, Math.sin(t) * 3);
  // rising wind streaks, faster every second
  const v = 120 + T * 160, r = RS(77); let w = '';
  for (let i = 0; i < 46; i++) { const x = r() * 720, len = 40 + r() * 90 + T * 20, y = 1280 - ((t * v * (.6 + r() * .8) + r() * 1300) % 1500); w += `<path d="M${x},${y} l${Math.sin(i) * 6},${-len}" stroke="#fff" stroke-width="${1.5 + r() * 1.5}" opacity="${(.25 + .3 * r()) * k}" stroke-linecap="round"/>`; }
  s += floater(250, 1088, CROWD[0], .55, 1, t, 44 + T * 6, Math.sin(t * .9) * 8, { lookUp: .7 }) + floater(520, 1082, CROWD[2], .52, -1, t, 42 + T * 7, -8, { lookUp: .7 }) + bits(t, st - 3, 1, 11);
  F.ov = `<g>${w}</g>`; return s;
}
// 6: a cut through the ground – squeezed rock springs back, then the street shakes
function sceneRock(t) {
  const st = S0(6) - .2, k = ease(ramp(t, WS(6, 8) - .2, WS(6, 9) + .4)), sh = ramp(t, WS(6, 11) - .1, WS(6, 11) + .2) * (1 - ramp(t, S0(7) - .6, S0(7) - .2));
  const jx = sh * (Math.sin(t * 61) * 7 + Math.sin(t * 37) * 4), jy = sh * Math.sin(t * 53) * 5;
  let s = `<rect width="720" height="1280" fill="#8ab8e0"/>`;
  const gy = 560 - k * 10, layers = ['#7a5a3a', '#6a4a30', '#5a3e28', '#4a3220', '#3a2618', '#2a1a10'];
  let g = `<rect x="-20" y="${gy - 300}" width="760" height="300" fill="#a8c8e8"/>`;
  const r = RS(8); for (let i = 0; i < 9; i++) { const x = i * 84 - 10, h = 60 + r() * 150; g += `<rect x="${x}" y="${gy - h}" width="74" height="${h}" fill="${mix('#7a8496', '#5a6476', r())}"/>` + Array.from({ length: Math.floor(h / 24) }, (_, q) => `<rect x="${x + 10}" y="${gy - h + 8 + q * 24}" width="54" height="8" fill="#e8eef6" opacity=".35"/>`).join(''); }
  g += `<rect x="-20" y="${gy}" width="760" height="20" fill="#4e4e54"/>`;
  layers.forEach((c, i) => { const y0 = gy + 20 + i * 120 - k * i * 6; g += `<path d="M-20,${y0} Q180,${y0 - 10 + i * 3} 360,${y0} T740,${y0} L740,1300 L-20,1300Z" fill="${c}"/>`; });
  g += `<rect x="-20" y="${gy + 20}" width="760" height="800" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  // arrows: first pressing in (squeezed), then pointing outward (springing back)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) { const x = 140 + j * 220, y = gy + 160 + i * 150, a = k > .5 ? 1 : -1, len = 34;
    g += `<path d="M${x},${y + a * -8} l0,${-a * len}" stroke="${k > .5 ? '#f4c76b' : '#fff'}" stroke-width="4" marker-end="url(#${k > .5 ? 'arrY' : 'arrW'})" opacity=".85"/><path d="M${x},${y + a * 8} l0,${a * len}" stroke="${k > .5 ? '#f4c76b' : '#fff'}" stroke-width="4" marker-end="url(#${k > .5 ? 'arrY' : 'arrW'})" opacity=".85"/>`; }
  // cracks once it shakes
  if (sh > 0) g += cracks(gy + 20, gy + 700, sh, 5);
  s += `<g transform="translate(${jx},${jy})">${g}</g>`;
  F.ov = ''; return s;
}
// the International Space Station, drawn flat: truss, eight solar wings, modules and radiators
function iss(x, y, sc, rot) {
  let s = `<g transform="translate(${x},${y}) rotate(${rot}) scale(${sc})">`;
  s += `<rect x="-230" y="-6" width="460" height="12" fill="#b8b4ac"/><rect x="-230" y="-6" width="460" height="4" fill="#fff" opacity=".4"/>`;
  [-200, -150, 150, 200].forEach(px => { [-1, 1].forEach(d => { s += `<rect x="${px - 18}" y="${d > 0 ? 10 : -150}" width="36" height="140" fill="#2a3a6a"/><rect x="${px - 18}" y="${d > 0 ? 10 : -150}" width="36" height="140" fill="url(#panG)"/>` + Array.from({ length: 10 }, (_, q) => `<rect x="${px - 18}" y="${(d > 0 ? 10 : -150) + q * 14}" width="36" height="1.5" fill="#c8a24a" opacity=".6"/>`).join(''); }); });
  s += `<rect x="-60" y="-22" width="120" height="44" rx="18" fill="#e8e4dc"/><rect x="-60" y="-22" width="120" height="14" rx="7" fill="#fff" opacity=".5"/><rect x="-14" y="-70" width="28" height="140" rx="12" fill="#dcd8d0"/><rect x="60" y="-14" width="70" height="28" rx="12" fill="#d4d0c8"/><rect x="-120" y="-16" width="60" height="32" rx="12" fill="#cfcac2"/>`;
  s += `<rect x="-40" y="26" width="16" height="70" fill="#f4f4f0" opacity=".9"/><rect x="24" y="26" width="16" height="70" fill="#f4f4f0" opacity=".9"/></g>`;
  return s;
}
// 7: astronauts on the ISS already float: they are always falling around Earth
function sceneISS(t) {
  const st = S0(7) - .2, T = t - st, k = ease(ramp(t, WS(7, 13) - .2, WS(7, 16) + .3));
  let s = space(t, '#02040c', '#060a1e') + `<defs><linearGradient id="panG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a6aaa" stop-opacity=".6"/><stop offset=".5" stop-color="#1a2a5a" stop-opacity=".1"/><stop offset="1" stop-color="#6a8aca" stop-opacity=".5"/></linearGradient>` +
    `<radialGradient id="helmS" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#e8e4dc" stop-opacity="0"/><stop offset="1" stop-color="#7a766e" stop-opacity=".7"/></radialGradient>` +
    `<linearGradient id="visG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b8"/><stop offset=".3" stop-color="#e0a432"/><stop offset=".65" stop-color="#8a5414"/><stop offset="1" stop-color="#3a2208"/></linearGradient></defs>`;
  F.earth = { x: 360, y: 1420, r: 640, a: 1, sunI: 1, lights: .3, rot: 2.2 + T * .05, tilt: .2 }; F.light = [-900, 200]; F.moon = null;
  // the orbit: a dashed arc; the station moves along it while "falling" (arrows toward Earth appear with k)
  const ang = -.55 + T * .045, ox = 360 + Math.sin(ang) * 860, oy = 1420 - Math.cos(ang) * 860;
  F.ov = `<path d="M-60,${1420 - Math.sqrt(860 ** 2 - 420 ** 2)} A860,860 0 0 1 780,${1420 - Math.sqrt(860 ** 2 - 420 ** 2)}" stroke="#f4c76b" stroke-width="2.5" stroke-dasharray="10 10" fill="none" opacity=".7"/>` +
    iss(ox, oy, .62, ang * 57.3) +
    `<g transform="translate(${ox + 150},${oy - 170}) rotate(${T * 14 - 30}) scale(.36)">${astro(0, 120, { s: 1, t })}</g>` +
    `<g opacity="${k}"><path d="M${ox},${oy + 70} l${-Math.sin(ang) * 60},${Math.cos(ang) * 60}" stroke="#f4c76b" stroke-width="5" marker-end="url(#arrY)"/>` +
    `<path d="M${ox + 40},${oy + 4} l${Math.cos(ang) * 110},${Math.sin(ang) * 110}" stroke="#fff" stroke-width="5" marker-end="url(#arrW)"/></g>`;
  return s;
}
// 8: gravity is back – everything drops, then wind sweeps the street
function sceneDrop(t) {
  const st = S0(8) - .2, on = ease(ramp(t, tOn(), tOn() + .3)), fall = ramp(t, WS(8, 4) - .1, WS(8, 4) + .45), lift = 50 * (1 - fall * fall), land = fall >= 1 ? 1 : 0;
  const wind = ease(ramp(t, WS(8, 11) - .2, WS(8, 15))), Tw = Math.max(0, t - WS(8, 11));
  let s = liftStreet(t, { id: 8 }, Math.max(.6, lift * 1.1), (1 - fall) * Math.sin(t) * 3);
  if (land) s += Array.from({ length: 8 }, (_, i) => { const q = ramp(t, WS(8, 4) + .35, WS(8, 4) + 1.4); return `<ellipse cx="${[150, 520, 250, 520][i % 4] + (i - 4) * 14 * q}" cy="${[1240, 1160, 1086, 1080][i % 4] - q * 20}" rx="${20 + q * 40}" ry="${8 + q * 14}" fill="#d8ccb4" opacity="${.5 * (1 - q)}" filter="url(#soft)"/>`; }).join('');
  s += floater(250 - wind * Tw * 8, 1088, CROWD[0], .55, 1, t, lift, (1 - fall) * 8 - wind * 10, { lookUp: .2 }) + floater(520, 1082, CROWD[2], .52, -1, t, lift * .95, -(1 - fall) * 6 - wind * 8, { lookUp: .2 });
  // sideways wind streaks and blowing leaves
  const r = RS(91); let w = '';
  if (wind > 0) for (let i = 0; i < 40; i++) { const y = 380 + r() * 820, len = 80 + r() * 140, x = ((t * 900 * (.6 + r()) + r() * 900) % 1100) - 200; w += `<path d="M${x},${y} q${len / 2},${-8 * r()} ${len},0" stroke="#fff" stroke-width="${1.5 + r() * 2}" fill="none" opacity="${(.2 + .35 * r()) * wind}" stroke-linecap="round"/>`; }
  for (let i = 0; i < 16 * wind; i++) { const y = 700 + r() * 500, x = ((t * 500 * (.7 + r()) + r() * 900) % 900) - 100; w += `<path d="M${x - 7},${y} Q${x},${y - 6} ${x + 7},${y} Q${x},${y + 6} ${x - 7},${y}Z" fill="${['#5a7e32', '#a8742a'][i % 2]}" transform="rotate(${t * 300 + i * 40},${x},${y})"/>`; }
  F.ov = w + gSwitch(on, ease(ramp(t, st + .1, st + .4)) * (1 - ease(ramp(t, WS(8, 6), WS(8, 7) + .2))), '5.0 s');
  F.flash = t > tOn() && t < tOn() + .3 ? .2 * (1 - (t - tOn()) / .3) : 0;
  return s;
}
// 9: the real Earth, the question and the subscribe button
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 2) - .2, WS(9, 2) + .5)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 4.8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${q}"><text x="360" y="470" text-anchor="middle" font-family="Inter Display" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">?</text></g>` +
    `<g opacity="${ramp(t, WS(9, 11), WS(9, 11) + .4)}" transform="translate(360,${1100 - b})"><rect x="-130" y="-34" width="260" height="68" rx="16" fill="#e53935"/>` + EN('SUBSCRIBE', 0, 12, 32, '#fff', 'middle', 800) + `</g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneFloat }, { s: S0(2) - .2, f: sceneSpin }, { s: S0(3) - .2, f: sceneTangent }, { s: S0(4) - .2, f: sceneLift },
  { s: WS(4, 8) - .3, f: sceneSea }, { s: S0(5) - .2, f: sceneAir }, { s: WS(5, 18) - .3, f: sceneSky }, { s: S0(6) - .2, f: sceneRock }, { s: S0(7) - .2, f: sceneISS },
  { s: S0(8) - .2, f: sceneDrop }, { s: S0(9) - .2, f: sceneEarth },
];
const XF = .5;
const TLI = [['Weightless', S0(1)], ['Drifting up', S0(3)], ['Air rising', WS(5, 18)], ['Ground shakes', S0(6)], ['Gravity back', S0(8)]];
const LIST_ON = new Set([sceneFloat, sceneSky, sceneDrop]);
const CHIPS = [
  ['c1', 'Weight: 0 kg', 360, 330, 'big', WS(1, 3), S0(2) - .3],
  ['c2', '≈ 1,670 km/h', 360, 330, 'big', WS(2, 12), S0(3) - .3],
  ['c3', 'Straight line', 360, 330, 'big', WS(3, 10), WS(3, 14) - .2],
  ['c3b', 'The ground curves away', 360, 330, 'big', WS(3, 15), S0(4) - .3],
  ['c4', '+40 cm in 5 s', 360, 330, 'big', WS(4, 3), WS(4, 8) - .4],
  ['c5', 'Air pressure = the weight of the air', 360, 330, 'dark', WS(5, 12), WS(5, 18) - .4],
  ['c6', 'The sky rises toward space', 360, 330, 'red', WS(5, 26), S0(6) - .3],
  ['c7', 'Rock springs back', 360, 330, 'big', WS(6, 8), WS(6, 11) - .2],
  ['c7b', 'Ground shakes everywhere', 360, 330, 'red', WS(6, 12), S0(7) - .3],
  ['c8', '~90% of Earth\'s gravity up there', 360, 330, 'dark', WS(7, 6), WS(7, 13) - .2],
  ['c8b', 'Always falling around Earth', 360, 330, 'big', WS(7, 15), S0(8) - .3],
  ['c9', 'Powerful winds', 360, 330, 'red', WS(8, 14), S0(9) - .3],
  ['c10', 'Weird Space Lab', 360, 1200, 'dark', WS(9, 12), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">5 SECONDS</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
