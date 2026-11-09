// ===================== Weird Space Lab: What if friction disappeared for five seconds? =====================
const tOff = () => WS(0, 3);
// a walker whose feet slip out: rotate backwards about the feet
function slipper(x, y, sc, t, t0, c = CROWD[0]) {
  const q = ease(ramp(t, t0, t0 + .9)), fx = x + q * 60, rot = -q * 80;
  return shadowE(fx, y + 2, 36 * sc / .55, .3) + `<g transform="rotate(${rot},${fx},${y})">` + onWalk(fx, y, c, sc, 1, t, { moving: q < .1 ? 1 : 0, phase: t * 6, lookUp: q * .6 }) + `</g>`;
}
// 0: an ordinary street; on "disappeared" the walker's feet slide out
function sceneHook(t) {
  let s = wStreet(t, { id: 'f0' });
  s += slipper(260 + Math.min(t, tOff()) * 26, 1088, .55, t, tOff()) + castSh(540, 1082, .52) + onWalk(540, 1082, CROWD[1], .52, -1, t, { lookUp: .2 });
  F.ov = ''; return s;
}
// 1: walking needs grip – a close look at a shoe sole on the pavement
function sceneGrip(t) {
  const k = ease(ramp(t, WS(1, 3), WS(1, 11))), slide = ease(ramp(t, WS(1, 8), WS(1, 11) + .6));
  let s = `<rect width="720" height="1280" fill="#2a2420"/>`;
  // pavement close-up: stone tiles with grain
  s += `<rect y="860" width="720" height="420" fill="#a8a094"/><rect y="860" width="720" height="420" fill="#000" filter="url(#grainR)" opacity=".45"/>` + Array.from({ length: 4 }, (_, i) => `<rect x="${i * 240 - 40}" y="860" width="4" height="420" fill="#6a645a"/>`).join('') + `<rect y="860" width="720" height="6" fill="#6a645a"/>`;
  // a sneaker: sole with tread, upper, laces
  const sx = 330 + slide * 200, sy = 858;
  s += `<g transform="translate(${sx},${sy})"><path d="M-170,0 L170,0 Q200,0 200,-30 L196,-40 L-180,-40 Q-200,-30 -190,-10Z" fill="#f4f0e8"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${-170 + i * 24}" y="-8" width="12" height="8" fill="#c8c0b0"/>`).join('') +
    `<path d="M-180,-40 Q-190,-150 -100,-170 L40,-170 Q120,-160 196,-40Z" fill="#2a5a9a"/><path d="M-60,-160 Q20,-200 60,-170" stroke="#1a3a6a" stroke-width="10" fill="none"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${-40 + i * 22},-150 l30,10" stroke="#fff" stroke-width="4"/>`).join('') + `<path d="M-180,-40 L196,-40" stroke="#fff" stroke-width="6"/></g>`;
  F.ov = `<g opacity="${k * (1 - slide)}">` + wArrow(sx - 40, 900, sx - 150, 900, '#f4c76b', 6) + EN('grip', sx - 100, 950, 30, '#f4c76b', 'middle', 800) + `</g>` + `<g opacity="${slide}">` + EN('no grip', sx, 960, 30, '#ff8a8a', 'middle', 800) + `</g>`;
  return s;
}
// 2: cars slide helplessly – no steering, no braking (side view on the street, brake lights on, still gliding)
function sceneCars(t) {
  const st = S0(2) - .2, k = ease(ramp(t, WS(2, 2), WS(2, 14) + .4)), br = ramp(t, WS(2, 10), WS(2, 12));
  let s = wStreet(t, { id: 'f2' });
  const cx = 120 + k * 520, cy = 1180, rot = Math.sin(k * 3) * 6;
  s += shadowE(cx, cy + 4, 120, .4) + `<g transform="rotate(${rot},${cx},${cy - 40})">${car(cx, cy, 1.05, '#3a6aa0', 1, 0)}<circle cx="${cx - 120}" cy="${cy - 48}" r="12" fill="#ff2a1a" opacity="${.9 * br}" filter="url(#blur2)"/></g>`;
  F.ov = `<g opacity="${br}">` + EN('BRAKES ON', cx, cy - 150, 24, '#ff8a8a', 'middle', 800) + `</g>`; return s;
}
// 3: knots slip loose and nails slide out of the wall
function sceneHold(t) {
  const kn = ease(ramp(t, WS(3, 0), WS(3, 4))), nl = ease(ramp(t, WS(3, 5), WS(3, 12)));
  let s = `<rect width="720" height="1280" fill="#e0d4c0"/><rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".15"/>`;
  // left: a rope knot loosening
  const lace = (d) => `<path d="${d}" stroke="#f4f0e8" stroke-width="12" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#c8c0b0" stroke-width="3" fill="none" stroke-dasharray="4 6"/>`;
  const L = 1 - kn, cxk = 190, cyk = 760;
  s += wPanel(30, 470, 320, 640, 'KNOT') + `<path d="M60,900 Q190,820 320,900 L320,1100 L60,1100Z" fill="#2a5a9a"/>` + Array.from({ length: 4 }, (_, i) => `<circle cx="${120 + i * 46}" cy="${900 - (i === 1 || i === 2 ? 30 : 16)}" r="7" fill="#ddd"/>`).join('') +
    lace(`M${cxk},${cyk + 20} C${cxk - 90 * L - 10},${cyk - 90 * L - 20} ${cxk - 120 * L - 20},${cyk + 40} ${cxk},${cyk + 20}`) + lace(`M${cxk},${cyk + 20} C${cxk + 90 * L + 10},${cyk - 90 * L - 20} ${cxk + 120 * L + 20},${cyk + 40} ${cxk},${cyk + 20}`) +
    lace(`M${cxk},${cyk + 20} q-20,${60 + 140 * kn} -60,${100 + 200 * kn}`) + lace(`M${cxk},${cyk + 20} q20,${60 + 140 * kn} 70,${90 + 200 * kn}`) + `<circle cx="${cxk}" cy="${cyk + 20}" r="${12 * L + 2}" fill="#f4f0e8"/>`;
  // right: a picture hanging on a nail that slides out of the wall
  const nx = 520 - nl * 40, py = 640 + nl * nl * 380;
  s += wPanel(370, 470, 320, 640, 'NAIL') + `<rect x="${nx - 4}" y="636" width="${60 + nl * 40}" height="8" fill="#8a8a92"/><circle cx="${nx}" cy="640" r="9" fill="#9a9aa2"/><circle cx="530" cy="640" r="4" fill="#3a3028"/>`;
  s += `<g transform="rotate(${nl * 18},530,${py + 120})"><path d="M${530 - 80},${py + 60} L530,${py} L${530 + 80},${py + 60}" stroke="#555" stroke-width="2" fill="none"/><rect x="${530 - 110}" y="${py + 60}" width="220" height="160" fill="#5a4030"/><rect x="${530 - 98}" y="${py + 72}" width="196" height="136" fill="#7ab4e0"/><path d="M${530 - 98},${py + 208} L${530 - 40},${py + 140} L${530},${py + 180} L${530 + 40},${py + 150} L${530 + 98},${py + 208}Z" fill="#3a6a3a"/></g>`;
  F.ov = ''; return s;
}
// 4: fabric threads slide apart – a macro view of the weave
function sceneFabric(t) {
  const k = ease(ramp(t, WS(4, 5), WS(4, 15)));
  let s = `<rect width="720" height="1280" fill="#1a1e2a"/>`;
  const N = 12, step = 52, x0 = 360 - N * step / 2, y0 = 660 - N * step / 2;
  for (let i = 0; i < N; i++) { const off = k * ((i % 2 ? 1 : -1) * (14 + (i * 7) % 20)), y = y0 + i * step + off;
    s += `<rect x="${x0 - 40}" y="${y - 14}" width="${N * step + 80}" height="28" rx="14" fill="#2a5a9a"/><rect x="${x0 - 40}" y="${y - 10}" width="${N * step + 80}" height="6" rx="3" fill="#4a7aba" opacity=".7"/>`; }
  for (let j = 0; j < N; j++) { const off = k * ((j % 2 ? -1 : 1) * (12 + (j * 5) % 22)), x = x0 + j * step + off;
    for (let i = 0; i < N; i++) { const over = (i + j) % 2 === 0, y = y0 + i * step; if (over) s += `<rect x="${x - 14}" y="${y - 30}" width="28" height="60" rx="14" fill="#3a6aaa"/><rect x="${x - 10}" y="${y - 30}" width="6" height="60" rx="3" fill="#5a8aca" opacity=".7"/>`; } }
  s += `<rect width="720" height="1280" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  F.ov = EN('cotton, under a magnifying glass', 360, 1110, 22, 'rgba(255,255,255,.6)', 'middle', 500); return s;
}
// 5: rocks and a parked car slide downhill
function sceneSlope(t) {
  const st = S0(5) - .2, q = ease(ramp(t, WS(5, 10) - .4, L(5).end + .6)), ang = 22, A = ang * Math.PI / 180;
  let s = `<defs><linearGradient id="skS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset="1" stop-color="${SKY[2]}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skS)"/>` + mountains(760, 160, 9, '#a8b8c8', '#7a8696', 8);
  const hill = `M-20,${600} L740,${600 + 760 * Math.tan(A)} L740,1300 L-20,1300Z`;
  s += `<path d="${hill}" fill="#6a8a4a"/><path d="${hill}" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  const along = (d, h = 0) => [40 + d * Math.cos(A) - h * Math.sin(A), 600 + 20 * Math.tan(A) + d * Math.sin(A) - h * Math.cos(A)];
  [[80, 30, '#7a7468'], [220, 22, '#8a8478'], [380, 38, '#6a645a'], [520, 26, '#7a7468']].forEach(([d, r, c], i) => { const dd = d + q * q * (300 + i * 60), [x, y] = along(dd, r * .8); s += `<g transform="rotate(${q * 200 * (1 + i * .3)},${x},${y})"><path d="M${x - r},${y} Q${x - r},${y - r * 1.1} ${x},${y - r} Q${x + r * 1.2},${y - r * .9} ${x + r},${y} Q${x},${y + r * .9} ${x - r},${y}Z" fill="${c}"/></g>`; });
  const [cx, cy] = along(300 + q * q * 360);
  s += `<g transform="rotate(${ang},${cx},${cy})">${car(cx, cy, .9, '#3a6aa0', 1, 0)}</g>`;
  F.ov = ''; return s;
}
// 6: friction returns – tyres screech, smoke and skid marks
function sceneStop(t) {
  const k = ease(ramp(t, WS(6, 1), WS(6, 3))), s2 = ease(ramp(t, WS(6, 9) - .2, WS(6, 12)));
  let s = wStreet(t, { id: 'f6' }), cx = 300 + 140 * Math.min(1, s2);
  const carS = shadowE(cx, 1184, 120, .4) + car(cx, 1180, 1.05, '#3a6aa0', 1, 1);
  s += `<path d="M${cx - 300},1180 L${cx - 60},1180" stroke="#111" stroke-width="10" opacity="${.7 * s2}"/><path d="M${cx - 300},1210 L${cx - 60},1210" stroke="#111" stroke-width="10" opacity="${.7 * s2}"/>`;
  s += carS;
  F.ov = Array.from({ length: 8 }, (_, i) => { const r = RS(i + 3), q = (t * .8 + r()) % 1; return `<circle cx="${cx - 120 - q * 160}" cy="${1170 - q * 100 + r() * 30}" r="${20 + q * 60}" fill="#d8d4cc" opacity="${s2 * .5 * (1 - q)}" filter="url(#soft)"/>`; }).join('');
  return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(7, 0), WS(7, 5)); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneGrip }, { s: S0(2) - .2, f: sceneCars }, { s: S0(3) - .2, f: sceneHold }, { s: S0(4) - .2, f: sceneFabric },
  { s: S0(5) - .2, f: sceneSlope }, { s: S0(6) - .2, f: sceneStop }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['You fall', S0(1)], ['Cars slide', S0(2)], ['Things fall apart', S0(3)], ['Slopes slide', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'No grip = no walking', 360, 330, 'red', WS(1, 9), S0(2) - .3],
  ['c2', 'No steering, no brakes', 360, 330, 'red', WS(2, 10), S0(3) - .3],
  ['c3', 'Friction holds them', 360, 330, 'big', WS(3, 13), S0(4) - .3],
  ['c4', 'Threads slide loose', 360, 330, 'big', WS(4, 12), S0(5) - .3],
  ['c5', 'Everything slides downhill', 360, 330, 'red', WS(5, 12), S0(6) - .3],
  ['c6', 'SCREECH!', 360, 330, 'big', WS(6, 9), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 5), 999],
];
setupUI('NO FRICTION', TLI, CHIPS);
