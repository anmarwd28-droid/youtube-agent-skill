// ===================== Weird Space Lab: What if you could run at the speed of sound? =====================
const MB = (sd) => `<filter id="mb${sd}" x="-10%" y="0" width="120%" height="100%"><feGaussianBlur stdDeviation="${sd} 0"/></filter>`;
// a runner: the walk cycle sped up, leaning forward
function runner(x, y, s, t, lean = 14, o = {}) {
  return `<g transform="rotate(${lean},${x},${y})">` + onWalk(x, y, CROWD[0], s, 1, t, Object.assign({ moving: 1, phase: t * 26, amp: .75 }, o)) + `</g>`;
}
function speedLines(t, a, n = 40, seed = 3, y0 = 380, y1 = 1250, v = 2600) {
  if (a <= .01) return ''; const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const y = y0 + r() * (y1 - y0), len = 80 + r() * 220, x = 760 - ((t * v * (.6 + r() * .8) + r() * 1200) % 1300);
    s += `<path d="M${x},${y} l${len},0" stroke="#fff" stroke-width="${1.5 + r() * 2.5}" opacity="${a * (.25 + .4 * r())}" stroke-linecap="round"/>`; }
  return s;
}
const blurStreet = (t, id, sd) => `<defs>${MB(sd)}</defs><g filter="url(#mb${sd})">${wStreet(t, { id })}</g>`;
// 0: an ordinary street; on "sound?" the runner takes off and the street smears into motion blur
function sceneHook(t) {
  const go = WS(0, 8) - .1, k = ease(ramp(t, go, go + .5));
  let s = k > .02 ? blurStreet(t, 'r0', Math.round(2 + 16 * k)) : wStreet(t, { id: 'r0' });
  const x = 240 + (t < go ? (t - .2) * 20 : 0) + k * 120;
  s += (k < .5 ? castSh(x, 1092, .58) : '') + runner(x, 1092, .58, t, 4 + 14 * k, { moving: t > .2 ? 1 : 0, phase: t * (8 + 18 * k) });
  F.ov = speedLines(t, k) + (k > 0 && k < 1 ? `<ellipse cx="${x - 60}" cy="1090" rx="${60 + 160 * k}" ry="${16 + 20 * k}" fill="#d8ccb4" opacity="${.6 * (1 - k)}" filter="url(#soft)"/>` : '');
  F.flash = 0; return s;
}
// 1: a speedometer climbs to 1,235 km/h; bars compare you with the fastest sprinter
function sceneSpeed(t) {
  const k = ease(ramp(t, WS(1, 0) - .2, WS(1, 6))), b = ease(ramp(t, WS(1, 7), WS(1, 13) + .3)), v = Math.round(1235 * k);
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t);
  const cx = 360, cy = 680, R = 170, an = Math.PI * (1 - k);
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#1a1e2e" stroke="#444" stroke-width="6"/>` + Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (1 - i / 12); return `<path d="M${cx + Math.cos(a) * (R - 6)},${cy - Math.sin(a) * (R - 6)} L${cx + Math.cos(a) * (R - 26)},${cy - Math.sin(a) * (R - 26)}" stroke="${i > 9 ? '#e53935' : '#fff'}" stroke-width="4"/>`; }).join('') +
    `<path d="M${cx},${cy} L${cx + Math.cos(an) * (R - 30)},${cy - Math.sin(an) * (R - 30)}" stroke="#f4c76b" stroke-width="7" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="14" fill="#f4c76b"/>` +
    EN(`${v.toLocaleString('en-US')}`, cx, cy + 80, 56, '#fff', 'middle', 800) + EN('km/h', cx, cy + 116, 24, 'rgba(255,255,255,.7)', 'middle', 500);
  // bars
  const by = 1000, W = 520;
  s += `<g opacity="${b}">` + EN('Usain Bolt', 100, by - 12, 22, '#fff', 'start') + `<rect x="100" y="${by}" width="${W * 44.7 / 1235 * b + 4}" height="34" rx="6" fill="#7ab4ff"/>` + EN('44.7 km/h', 130 + W * 44.7 / 1235, by + 26, 20, '#fff', 'start', 500) +
    EN('You', 100, by + 78, 22, '#fff', 'start') + `<rect x="100" y="${by + 90}" width="${W * b}" height="34" rx="6" fill="#f4c76b"/>` + `</g>`;
  F.ov = ''; F.flash = 0; return s;
}
// 2: the air pushes back with about five tonnes of force
function sceneDrag(t) {
  const k = ease(ramp(t, WS(2, 4), WS(2, 9))), w = ease(ramp(t, WS(2, 16), WS(2, 20) + .3));
  let s = `<defs><linearGradient id="skD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset="1" stop-color="${SKY[2]}"/></linearGradient>${MB(18)}</defs><rect width="720" height="1280" fill="url(#skD)"/>`;
  s += `<g filter="url(#mb18)"><rect y="1050" width="720" height="230" fill="#4e4e54"/>` + Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 + 20}" y="1150" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('') + `</g>`;
  s += runner(300, 1110, 1.15, t, 12);
  let a = ''; for (let i = 0; i < 9; i++) { const y = 640 + i * 46, x0 = 720 - ((t * 500 + i * 70) % 260); a += `<path d="M${x0},${y} L${x0 - 120},${y}" stroke="#bfe0ff" stroke-width="5" marker-end="url(#arrW)" opacity="${k * .9}"/>`; }
  // five one-tonne blocks
  let bl = ''; for (let i = 0; i < 5; i++) { const x = 470 + (i % 3) * 78 - (i > 2 ? -39 : 0), y = 900 - Math.floor(i / 3) * 64; bl += `<g opacity="${clamp(w * 5 - i)}"><rect x="${x}" y="${y}" width="70" height="56" rx="6" fill="#5a5a62"/>` + EN('1 t', x + 35, y + 36, 22, '#fff') + `</g>`; }
  F.ov = a + bl + speedLines(t, .6, 26, 9); F.flash = 0; return s;
}
// 3: breaking the sound barrier – a shock cone trails the runner and bystanders hear a crack
function sceneBoom(t) {
  const k = ease(ramp(t, WS(3, 2) - .2, WS(3, 5))), c = ramp(t, WS(3, 13) - .05, WS(3, 13) + .5), x = 380;
  let s = blurStreet(t, 'r3', 14);
  s += castSh(560, 1086, .52) + `<g>` + onWalk(560, 1086, CROWD[1], .52, -1, t, { lookUp: .3 }) + `</g>`;
  s += runner(x, 1092, .58, t, 18);
  let cone = ''; for (let i = 0; i < 4; i++) { const d = 60 + i * 70; cone += `<path d="M${x + 40},${930} L${x - d * 3},${930 - d * 1.6} M${x + 40},${930} L${x - d * 3},${930 + d * 1.6}" stroke="#fff" stroke-width="${4 - i * .7}" opacity="${k * (.8 - i * .15)}"/>`; }
  F.ov = cone + speedLines(t, .7, 30, 5) + (c > 0 && c < 1 ? `<g opacity="${1 - c}"><circle cx="560" cy="860" r="${30 + 160 * c}" fill="none" stroke="#fff" stroke-width="5"/>` + EN('CRACK!', 560, 760 - 40 * c, 54, '#f4c76b', 'middle', 800) + `</g>` : '');
  F.flash = c > 0 && c < .2 ? .25 * (1 - c * 5) : 0; return s;
}
// 4: in a quarter-second reaction time you cover 85 metres
function sceneReact(t) {
  const k = ease(ramp(t, WS(4, 10), WS(4, 17) + .2));
  let s = blurStreet(t, 'r4', 10) + `<rect width="720" height="1280" fill="#000" opacity=".25"/>`;
  s += runner(120, 1092, .5, t, 16);
  const x1 = 120, x2 = 120 + 560 * k;
  F.ov = `<g opacity="${ease(ramp(t, WS(4, 10) - .2, WS(4, 10)))}"><path d="M${x1},1160 L${x2},1160" stroke="#f4c76b" stroke-width="6"/><path d="M${x1},1140 v40 M${x2},1140 v40" stroke="#f4c76b" stroke-width="5"/>` + EN(`${Math.round(85 * k)} m`, (x1 + x2) / 2, 1215, 34, '#f4c76b', 'middle', 800) + `</g>` +
    `<g transform="translate(560,640)" opacity="${ease(ramp(t, WS(4, 0), WS(4, 2)))}"><circle r="90" fill="#f4f4f0" stroke="#333" stroke-width="7"/><path d="M0,0 L0,-90 A90,90 0 0,1 90,0Z" fill="#e53935" opacity=".35"/><rect x="-3" y="-80" width="6" height="80" fill="#c62828" transform="rotate(${90 * k})"/><circle r="8" fill="#333"/>` + EN('0.25 s', 0, 130, 30, '#fff', 'middle', 800) + `</g>` + speedLines(t, .6, 24, 8);
  F.flash = 0; return s;
}
// 5: obstacles rush in faster than you can react
function sceneHit(t) {
  const st = S0(5) - .2;
  let s = blurStreet(t, 'r5', 12);
  const items = [[WS(5, 2), 'pole'], [WS(5, 4), 'car'], [WS(5, 6), 'person']];
  let o = '';
  items.forEach(([ts, kind]) => { const q = ramp(t, ts - .4, ts + .5); if (q <= 0 || q >= 1) return; const x = 760 - q * 560;
    if (kind === 'pole') o += lampPost(x, 1100, 260, 0);
    if (kind === 'car') o += car(x + 60, 1180, .9, '#3a6aa0', -1, 0);
    if (kind === 'person') o += onWalk(x, 1092, CROWD[3], .55, -1, t, { lookUp: .2 }); });
  s += o + runner(200, 1092, .58, t, 18);
  const warn = Math.abs(Math.sin(t * 10)) * ramp(t, WS(5, 10) - .2, WS(5, 11));
  F.ov = speedLines(t, .8, 36, 12) + `<rect width="720" height="1280" fill="#e53935" opacity="${.18 * warn}"/>`; F.flash = 0; return s;
}
// 6: the air slamming into you heats the front of your body by almost 60 °C
function sceneHeat(t) {
  const k = ease(ramp(t, WS(6, 7) - .2, WS(6, 16)));
  let s = `<defs><linearGradient id="skH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${SKY[0]}"/><stop offset="1" stop-color="${SKY[2]}"/></linearGradient><radialGradient id="heatG"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".7"/><stop offset="1" stop-color="#ff3a1a" stop-opacity="0"/></radialGradient>${MB(18)}</defs><rect width="720" height="1280" fill="url(#skH)"/>`;
  s += `<g filter="url(#mb18)"><rect y="1050" width="720" height="230" fill="#4e4e54"/></g>` + runner(300, 1110, 1.15, t, 12);
  s += `<ellipse cx="${370}" cy="${880}" rx="${60 + 40 * k}" ry="${230}" fill="url(#heatG)" opacity="${k}" transform="rotate(12,370,880)"/>`;
  // thermometer
  const tx = 600, top = 520, bot = 900, lvl = lerp(bot - 60, top + 40, k);
  F.ov = `<rect x="${tx - 16}" y="${top}" width="32" height="${bot - top}" rx="16" fill="#f4f4f0"/><rect x="${tx - 8}" y="${lvl}" width="16" height="${bot - lvl}" fill="#e53935"/><circle cx="${tx}" cy="${bot + 10}" r="30" fill="#e53935"/>` + EN(`+${Math.round(58 * k)} °C`, tx, top - 20, 34, '#f4c76b', 'middle', 800) + speedLines(t, .6, 26, 9);
  F.flash = 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(7, 0), WS(7, 4)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpeed }, { s: S0(2) - .2, f: sceneDrag }, { s: S0(3) - .2, f: sceneBoom }, { s: S0(4) - .2, f: sceneReact },
  { s: S0(5) - .2, f: sceneHit }, { s: S0(6) - .2, f: sceneHeat }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Air push', S0(2)], ['Sound barrier', S0(3)], ['No time to react', S0(4)], ['Heat', S0(6)]];
const LIST_ON = new Set([sceneHit]);
const CHIPS = [
  ['c1', '≈ 1,235 km/h', 360, 330, 'big', WS(1, 2), WS(1, 7) - .2],
  ['c1b', '≈ 28 × Usain Bolt', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', '≈ 5 tonnes of air push', 360, 330, 'red', WS(2, 19), S0(3) - .3],
  ['c3', 'A sonic crack', 360, 330, 'big', WS(3, 13), S0(4) - .3],
  ['c4', '85 m before you react', 360, 330, 'red', WS(4, 16), S0(5) - .3],
  ['c5', 'Hit before you see it', 360, 330, 'red', WS(5, 11), S0(6) - .3],
  ['c6', 'Front of your body: +60 °C', 360, 330, 'big', WS(6, 15), S0(7) - .3],
  ['c7', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 4), 999],
];
setupUI('AT MACH 1', TLI, CHIPS);
