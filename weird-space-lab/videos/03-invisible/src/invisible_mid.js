// ===================== Weird Space Lab: What if you were invisible in real life? =====================
const ghost = (x, y, c, sc, face, t, a, o = {}) => `<g opacity="${a.toFixed(3)}">` + onWalk(x, y, c, sc, face, t, o) + `</g>`;
// two floating eyeballs (front view), looking toward lx
function eyes(x, y, s, t, look = 0) {
  return [-1, 1].map(d => { const ex = x + d * 10 * s, bob = Math.sin(t * 2 + d) * 1.2;
    return `<circle cx="${ex}" cy="${y + bob}" r="${9 * s}" fill="#f8f6f0"/><circle cx="${ex}" cy="${y + bob}" r="${9 * s}" fill="none" stroke="#c8b8a8" stroke-width="1"/>` +
      `<circle cx="${ex + look * 3 * s}" cy="${y + bob}" r="${4.4 * s}" fill="#6a4a2a"/><circle cx="${ex + look * 3 * s}" cy="${y + bob}" r="${2.2 * s}" fill="#111"/><circle cx="${ex + look * 3 * s - 1.2 * s}" cy="${y + bob - 1.4 * s}" r="${1 * s}" fill="#fff"/>`; }).join('');
}
// 0: a person on the street fades away
function sceneHook(t) {
  const k = ease(ramp(t, WS(0, 4) - .1, WS(0, 4) + .6));
  let s = wStreet(t, { id: 'i0' });
  s += ghost(360, 1088, CROWD[0], .6, 1, t, 1 - .92 * k, { lookUp: 0 }) + castSh(560, 1082, .52) + onWalk(560, 1082, CROWD[1], .52, -1, t, { lookUp: .2 * k });
  F.ov = k > 0 && k < 1 ? `<g opacity="${Math.sin(k * Math.PI) * .7}">` + Array.from({ length: 14 }, (_, i) => { const r = RS(i + 9); return `<circle cx="${330 + r() * 60}" cy="${760 + r() * 320}" r="${2 + r() * 3}" fill="#fff"/>`; }).join('') + `</g>` : '';
  return s;
}
// 1: light bounces off a visible person, but passes straight through an invisible one
function sceneThrough(t) {
  const k = ease(ramp(t, WS(1, 3) - .2, WS(1, 9))), ph = (t * 1.2) % 1;
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + wPanel(30, 470, 320, 700, 'VISIBLE') + wPanel(370, 470, 320, 700, 'INVISIBLE');
  s += onWalk(210, 1110, CROWD[0], .58, -1, t) + `<g opacity=".9">` + `<path d="M520,${1110 - 330 * .58} " />` + `</g>`;
  // invisible: a dashed outline only
  s += `<g opacity=".25">${onWalk(560, 1110, CROWD[0], .58, -1, t)}</g>`;
  let rays = '';
  for (let i = 0; i < 5; i++) { const y = 640 + i * 90, x0 = 40, hit = 190;
    const q = clamp((ph + i * .13) % 1 * 1.6); // travelling dash
    rays += `<path d="M${x0},${y} L${hit},${y}" stroke="#f4c76b" stroke-width="3" opacity="${k}"/><path d="M${hit},${y} L${hit - 120},${y - 70 + i * 25}" stroke="#f4c76b" stroke-width="3" marker-end="url(#arrY)" opacity="${k * .9}"/>`;
    rays += `<path d="M${380},${y} L${680},${y}" stroke="#f4c76b" stroke-width="3" marker-end="url(#arrY)" opacity="${k}"/>`; }
  F.ov = `<g>${rays}</g>`; return s;
}
// the eye in cross-section: cornea and lens on the left, the retina lining the back (right)
function eyeX(cx, cy, R, t, o = {}) {
  const tr = o.transparent ? 1 : 0, a = 1 - .75 * tr;
  let s = `<g opacity="${a}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#f8f4ec"/><circle cx="${cx}" cy="${cy}" r="${R - 10}" fill="#e8f0f6"/>` +
    `<path d="M${cx + R * Math.cos(-1.1)},${cy + R * Math.sin(-1.1)} A${R - 6},${R - 6} 0 0 1 ${cx + R * Math.cos(1.1)},${cy + R * Math.sin(1.1)}" stroke="#d8506a" stroke-width="16" fill="none"/>` +
    `<path d="M${cx + R - 6},${cy - 22} L${cx + R + 120},${cy - 40} L${cx + R + 120},${cy + 40} L${cx + R - 6},${cy + 22}Z" fill="#e8c0a0"/>` +
    `<path d="M${cx - R + 4},${cy - 80} Q${cx - R - 40},${cy} ${cx - R + 4},${cy + 80}" fill="#cfe6f6" stroke="#9ac0dc" stroke-width="3"/>` +
    `<rect x="${cx - R + 30}" y="${cy - 90}" width="14" height="60" fill="#5a7a9a"/><rect x="${cx - R + 30}" y="${cy + 30}" width="14" height="60" fill="#5a7a9a"/>` +
    `<ellipse cx="${cx - R + 60}" cy="${cy}" rx="22" ry="62" fill="#bfe0f6" stroke="#8ab0d0" stroke-width="3"/></g>`;
  if (tr) s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 9" opacity=".7"/>`;
  s += EN('LENS', cx - R + 60, cy - 90, 20, '#fff') + `<g opacity="${1 - tr}">` + EN('RETINA', cx + R - 40, cy - R + 34, 20, '#ffb0c0') + `</g>`;
  return s;
}
// 2: the retina has to absorb light to see
function sceneEye(t) {
  const k = ease(ramp(t, WS(2, 4) - .2, WS(2, 8))), g = ease(ramp(t, WS(2, 15) - .3, WS(2, 16) + .2)), cx = 380, cy = 760, R = 220;
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + eyeX(cx, cy, R, t);
  let rays = ''; [-110, -50, 0, 50, 110].forEach((dy, i) => { const lx = cx - R + 60;
    rays += `<path d="M0,${cy + dy * .9} L${lx},${cy + dy * .5} L${cx + R - 14},${cy}" stroke="#f4c76b" stroke-width="3" fill="none" opacity="${k}" stroke-dasharray="900" stroke-dashoffset="${900 * (1 - k)}"/>`; });
  F.ov = rays + `<circle cx="${cx + R - 14}" cy="${cy}" r="${16 + 10 * g}" fill="#fff6d0" opacity="${.9 * g}" filter="url(#blur2)"/>`;
  return s;
}
// 3: a see-through eye lets the light pass – and the screen of what you see goes black
function sceneBlind(t) {
  const k = ease(ramp(t, S0(3) - .2, WS(3, 7))), b = ease(ramp(t, WS(3, 9), WS(3, 11) + .3)), cx = 330, cy = 800, R = 200;
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + eyeX(cx, cy, R, t, { transparent: 1 });
  let rays = ''; [-110, -50, 0, 50, 110].forEach(dy => { rays += `<path d="M0,${cy + dy} L${720},${cy + dy}" stroke="#f4c76b" stroke-width="3" opacity="${k}" marker-end="url(#arrY)"/>`; });
  // "what you see" screen
  const sx = 470, sy = 430, sw = 220, sh = 160;
  F.ov = rays + `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" fill="#7ab4e0"/><path d="M${sx},${sy + sh} L${sx + 60},${sy + 90} L${sx + 110},${sy + 130} L${sx + 160},${sy + 70} L${sx + sw},${sy + sh}Z" fill="#3a6a3a"/><circle cx="${sx + 170}" cy="${sy + 40}" r="16" fill="#fff6d0"/>` +
    `<rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" fill="#000" opacity="${b}"/><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" rx="12" fill="none" stroke="#fff" stroke-width="3"/>` + EN('WHAT YOU SEE', sx + sw / 2, sy + sh + 30, 18, 'rgba(255,255,255,.7)', 'middle', 700, 'letter-spacing="1.5"');
  return s;
}
// 4: keep the eyes visible – two eyeballs floating over the pavement
function sceneEyeballs(t) {
  const k = ease(ramp(t, WS(4, 14) - .3, WS(4, 15) + .2));
  let s = wStreet(t, { id: 'i4' });
  s += ghost(330, 1088, CROWD[0], .6, 1, t, .06) + castSh(560, 1082, .52) + onWalk(560, 1082, CROWD[1], .52, -1, t, { lookUp: .3 * k });
  F.ov = eyes(338, 1088 - 300, 2.1, t, 1) + `<circle cx="338" cy="${1088 - 304}" r="${46}" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${k * (.5 + .5 * Math.sin(t * 6))}"/>`;
  return s;
}
// 5: real invisibility cloaks bend light around an object – but only for some colours, or tiny things
function sceneCloak(t) {
  const k = ease(ramp(t, S0(5) - .2, WS(5, 5))), c = ease(ramp(t, WS(5, 12) - .2, WS(5, 13) + .2)), cx = 360, cy = 720, Rc = 110;
  let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.3, t) + wPanel(30, 450, 660, 760, 'INVISIBILITY CLOAK');
  let rays = ''; for (let i = -3; i <= 3; i++) { const y0 = cy + i * 46, bend = Math.max(0, 1 - Math.abs(i * 46) / (Rc + 60)) * (Rc + 30 - Math.abs(i) * 8) * Math.sign(i || 1);
    rays += `<path d="M60,${y0} L${cx - Rc - 50},${y0} C${cx - Rc},${y0} ${cx - Rc * .6},${y0 + bend} ${cx},${y0 + bend} C${cx + Rc * .6},${y0 + bend} ${cx + Rc},${y0} ${cx + Rc + 50},${y0} L660,${y0}" stroke="#f4c76b" stroke-width="3" fill="none" opacity="${k}" stroke-dasharray="1200" stroke-dashoffset="${1200 * (1 - k)}"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="${Rc + 26}" fill="none" stroke="#7ab4ff" stroke-width="10" opacity=".5"/><circle cx="${cx}" cy="${cy}" r="${Rc * .45}" fill="#c0392b"/>` + EN('hidden object', cx, cy + 6, 18, '#fff');
  // spectrum bar: only a narrow band works
  const bx = 120, by = 1060, bw = 480; let spec = '';
  ['#7a3ad0', '#3a5ad0', '#3ab0d0', '#3ad06a', '#e0d03a', '#e08a3a', '#d03a3a'].forEach((col, i) => { spec += `<rect x="${bx + i * bw / 7}" y="${by}" width="${bw / 7}" height="30" fill="${col}" opacity="${i === 3 ? 1 : .35}"/>`; });
  F.ov = rays + `<g opacity="${c}">${spec}<rect x="${bx + 3 * bw / 7 - 3}" y="${by - 6}" width="${bw / 7 + 6}" height="42" fill="none" stroke="#fff" stroke-width="3"/>` + EN('✓ works', bx + 3.5 * bw / 7, by + 72, 22, '#4ade80') + `</g>`;
  return s;
}
function sceneEnd(t) { let s = `<rect width="720" height="1280" fill="#0b1020"/>` + stars(.6, t); F.ov = eyes(360, 900 + Math.sin(t * 1.5) * 8, 2.4, t, Math.sin(t)) + endCard(t, WS(6, 0), WS(6, 12), false); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneThrough }, { s: S0(2) - .2, f: sceneEye }, { s: S0(3) - .2, f: sceneBlind }, { s: S0(4) - .2, f: sceneEyeballs },
  { s: S0(5) - .2, f: sceneCloak }, { s: S0(6) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['See-through', S0(1)], ['No light caught', S0(2)], ['Blind', S0(3)], ['Floating eyes', S0(4)]];
const LIST_ON = new Set([sceneEyeballs]);
const CHIPS = [
  ['c1', 'Light passes straight through', 360, 330, 'big', WS(1, 6), S0(2) - .3],
  ['c2', 'The retina absorbs light', 360, 330, 'big', WS(2, 9), S0(3) - .3],
  ['c3', 'Completely blind', 360, 330, 'red', WS(3, 10), S0(4) - .3],
  ['c4', 'Two floating eyeballs', 360, 330, 'big', WS(4, 14), S0(5) - .3],
  ['c5', 'Only some colours', 360, 330, 'dark', WS(5, 12), WS(5, 15) - .1],
  ['c5b', '…or tiny objects', 360, 330, 'dark', WS(5, 15), S0(6) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(6, 12), 999],
];
setupUI('INVISIBLE YOU', TLI, CHIPS);
