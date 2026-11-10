// ===================== "what if time stopped for 5 seconds for everyone except you?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const num = (x, y, tx, a, col = '#fff', fs = 40) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".6">${tx}</text>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}`;
const YOU = { top: '#e85a2a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };
// the frozen look: desaturate towards a cold blue-grey by f (0..1); built per id so each scene can blend
function frzDef(id, f) {
  const k = 1 - f, g = [.3, .59, .11], tint = [.82, .9, 1.06], d = .92;
  const row = (c) => [0, 1, 2].map(j => ((c === j ? k : 0) + f * g[j] * tint[c] * d).toFixed(3)).join(' ') + ' 0 0';
  return `<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${row(0)} ${row(1)} ${row(2)} 0 0 0 1 0"/></filter>`;
}
// a bird in flight; w = wing phase
function bird(x, y, s, w, col = '#2a2a30') {
  const u = Math.sin(w) * 12 * s;
  return `<path d="M${x - 16 * s},${y - u} Q${x - 7 * s},${y - 4 * s - u * .4} ${x},${y} Q${x + 7 * s},${y - 4 * s - u * .4} ${x + 16 * s},${y - u}" stroke="${col}" stroke-width="${2.6 * s}" fill="none" stroke-linecap="round"/><ellipse cx="${x}" cy="${y + 1.5 * s}" rx="${4.5 * s}" ry="${2.2 * s}" fill="${col}"/>`;
}
// an umbrella held by a walker (x,y = feet, sc = person scale, face)
function umbrella(x, y, sc, face, col) {
  const k = sc / .55, hx = x + face * 16 * k, top = y - 222 * k, w = 64 * k;
  return `<path d="M${hx},${y - 118 * k} L${hx},${top}" stroke="#2a2a2a" stroke-width="${2.4 * k}"/><path d="M${hx - w},${top + 26 * k} Q${hx},${top - 34 * k} ${hx + w},${top + 26 * k} Q${hx + w * .66},${top + 16 * k} ${hx + w * .33},${top + 26 * k} Q${hx},${top + 16 * k} ${hx - w * .33},${top + 26 * k} Q${hx - w * .66},${top + 16 * k} ${hx - w},${top + 26 * k}Z" fill="${col}"/><path d="M${hx - w},${top + 26 * k} Q${hx},${top - 34 * k} ${hx},${top - 4 * k}" fill="#fff" opacity=".14"/>`;
}
// the world at world-time tf: street, walkers, birds, a ball in flight and (optionally) rain; f = frozen look
const WALK = [[60, 1088, 0, .55, 1, '#2a3a5a'], [560, 1082, 1, .52, -1, '#8a2a3a'], [330, 1094, 2, .57, 1, null], [690, 1086, 3, .5, -1, '#2a5a4a']];
function world(t, tf, o = {}) {
  const rain = o.rain || 0, f = o.f || 0, id = o.id || 'w';
  const sky = rain ? ['#56677c', '#8d9aa8', '#c4c8cc'] : ['#3e72b8', '#96bce0', '#e8e2d0'];
  let s = bareStreet(tf, { id, green: 1, sky, sunR: rain ? 0 : 30, glowR: rain ? 0 : 150, sunGlow: rain ? 0 : .28, afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: rain ? .55 : .9 }) + cumulus(560, 520, 170, 2, { a: rain ? .5 : .85 }) });
  if (rain) s += `<rect y="1116" width="720" height="170" fill="#9ab0c8" opacity=".16"/>` + Array.from({ length: 6 }, (_, i) => { const r = RS(i + 40), px = 40 + r() * 640, py = 1150 + r() * 120; return `<ellipse cx="${px}" cy="${py}" rx="${30 + r() * 40}" ry="${4 + r() * 3}" fill="#c8d8e8" opacity=".28"/>`; }).join('');
  // walkers (with umbrellas in the rain)
  WALK.forEach(([x0, y, c, sc, face, uc], i) => { const x = pmod(x0 + face * 26 * tf + 60, 840) - 60; s += castSh(x, y, sc) + onWalk(x, y, CROWD[c], sc, face, tf, { moving: 1, phase: tf * 6 + i, amp: .7 }) + (rain && uc ? umbrella(x, y, sc, face, uc) : ''); });
  // a child's ball in mid-flight over the pavement
  if (o.ball) { const ph = pmod(tf * .6, 1), bx = 180 + ph * 160, by = 1040 - Math.sin(ph * Math.PI) * 150; s += `<ellipse cx="${bx}" cy="1094" rx="${12 - 6 * Math.sin(ph * Math.PI)}" ry="3" fill="#000" opacity=".3"/><circle cx="${bx}" cy="${by}" r="13" fill="#e8463a"/><path d="M${bx - 13},${by} Q${bx},${by + 6} ${bx + 13},${by}" stroke="#fff" stroke-width="3" fill="none"/><circle cx="${bx - 4}" cy="${by - 5}" r="4" fill="#fff" opacity=".35"/>` + person(170, 1096, { s: .4, face: 1, t: tf, top: '#3a8ac8', pants: '#2a2a34', skin: '#b07850', hair: '#1a1210' }); }
  // a flock of birds crossing the sky
  for (let i = 0; i < 7; i++) { const r = RS(i + 60), bx = pmod(-80 + r() * 300 + tf * (55 + r() * 10), 900) - 90, by = 600 + r() * 150 + Math.sin(tf * 1.3 + i) * 10; s += bird(bx, by, .9 + r() * .5, tf * 11 + i * 1.7, rain ? '#2e3036' : '#2a2a30'); }
  // rain: streaks while moving, beads when frozen; splash crowns frozen on the road
  if (rain) { const mv = 1 - f; for (let i = 0; i < 170; i++) { const r = RS(i + 100), z = .4 + r() * .6, x = r() * 760 - 20 + tf * 20 * z, y = pmod(r() * 1320 + tf * 950 * z, 1320) - 30, L = (6 + 30 * mv) * z;
      s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l${(-3 * z * mv).toFixed(1)},${L.toFixed(1)}" stroke="#e8f2ff" stroke-width="${(1.1 + 1.6 * z * (1 - mv * .5)).toFixed(2)}" stroke-linecap="round" opacity="${(.35 + .4 * z).toFixed(2)}"/>`; }
    for (let i = 0; i < 16; i++) { const r = RS(i + 300), x = 20 + r() * 680, y = 1125 + r() * 150, ph = pmod(tf * 2.2 + r(), 1), w = 4 + ph * 10; s += `<path d="M${x - w},${y} q${w * .3},${-8 * (1 - ph)} ${w * .5},${-2} M${x + w},${y} q${-w * .3},${-8 * (1 - ph)} ${-w * .5},${-2} M${x},${y - 2} l0,${-10 * (1 - ph)}" stroke="#e8f2ff" stroke-width="1.4" fill="none" opacity="${(.6 * (1 - ph)).toFixed(2)}"/><ellipse cx="${x}" cy="${y + 1}" rx="${w}" ry="${w * .22}" fill="none" stroke="#e8f2ff" stroke-width="1" opacity="${(.5 * (1 - ph)).toFixed(2)}"/>`; } }
  if (f > 0) s = `<defs>${frzDef('fz' + id, f)}</defs><g filter="url(#fz${id})">${s}</g>`;
  return s;
}
// "you": in colour, walking at real time t
const you = (x, y, sc, t, mv = 1, o = {}) => castSh(x, y, sc) + person(x, y, Object.assign({ s: sc, face: 1, moving: mv, phase: t * 6, amp: .7, t }, YOU, o));
// a ripple of frozen time spreading from (x,y)
const ripple = (x, y, p) => p > 0 && p < 1 ? `<circle cx="${x}" cy="${y}" r="${40 + p * 900}" fill="none" stroke="#dfeaff" stroke-width="${10 * (1 - p) + 2}" opacity="${(.6 * (1 - p)).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x}" cy="${y}" r="${30 + p * 760}" fill="none" stroke="#fff" stroke-width="2" opacity="${(.4 * (1 - p)).toFixed(2)}"/>` : '';
// 0: a busy street; on "توقّف" everything freezes – except you
function sceneHook(t) {
  const FZ = WS(0, 6) + .1, tf = Math.min(t, FZ), f = ease(ramp(t, FZ, FZ + .5));
  let s = world(t, tf, { f, id: 'h', ball: 1 });
  s += you(250 + t * 16, 1100, .6, t);
  s += ripple(270 + t * 16, 900, clamp((t - FZ) / 1.4));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 1: an ordinary 5 seconds: ~20 births and 200+ lightning flashes on Earth; a 5-second ring
function sceneNormal(t) {
  const st = S0(1) - .2, T = t - st, k = clamp((t - WS(1, 0)) / (WS(1, 17) + .6 - WS(1, 0))), kb = ease(ramp(t, WS(1, 4) - .2, WS(1, 7) + .4)), kl = ease(ramp(t, WS(1, 10) - .2, WS(1, 14) + .4));
  let s = space(t, '#02030a', '#070a1c');
  F.earth = { x: 360, y: 720, r: 240, a: 1, sunI: 1.05, lights: .55, rot: 2.1 + t * .03, tilt: .41 }; F.light = [-300, 300]; F.moon = null; F.sun = null;
  let o = '';
  // lightning flashes over the night side (short, sharp, with a faint cloud-lit halo)
  for (let i = 0; i < 40; i++) { const r = RS(i + 7), a = r() * 6.283, rr = Math.sqrt(r()) * 200, x = 360 + Math.cos(a) * rr, y = 720 + Math.sin(a) * rr * .95, ph = pmod(T * (.6 + r() * .5) + r(), 1);
    if (x < 330 || ph > .06 || kl <= 0) continue; const b = (1 - ph / .06) * kl;
    o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="#cfe0ff" opacity="${(.35 * b).toFixed(2)}" filter="url(#blur2)"/><path d="M${x},${y - 5} l-2,4 l3,0 l-2,5" stroke="#fff" stroke-width="1.4" fill="none" opacity="${b.toFixed(2)}"/>`; }
  // 5-second ring
  const left = Math.max(0, 5 - k * 5);
  o += `<g transform="translate(360,1130)"><circle r="52" fill="#0a0e1c" opacity=".9"/><circle r="44" fill="none" stroke="#2a3048" stroke-width="7"/><circle r="44" fill="none" stroke="#f4c76b" stroke-width="7" stroke-dasharray="${(276.5 * (1 - k)).toFixed(1)} 400" transform="rotate(-90)" stroke-linecap="round"/>` + num(0, 13, left.toFixed(1), 1, '#fff', 30) + `</g>`;
  o += `<g transform="translate(150,1130)"><rect x="-120" y="-50" width="240" height="100" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 0, `+${Math.round(21 * kb)}`, kb, '#f4c76b', 40) + lbl(0, 34, 'مولوداً', kb, '#cfd8ff', 20) + `</g>`;
  o += `<g transform="translate(570,1130)"><rect x="-120" y="-50" width="240" height="100" rx="18" fill="#0a0e1c" opacity=".9"/>` + num(0, 0, `+${Math.round(220 * kl)}`, kl, '#cfe0ff', 40) + lbl(0, 34, 'بَرقاً', kl, '#cfd8ff', 20) + `</g>`;
  F.ov = o; return s;
}
// 2: rain, birds, people – then everything freezes; you keep walking among them
const FZ2 = () => WS(2, 2) + .2;
function sceneFreeze(t) {
  const FZ = FZ2(), tf = Math.min(t, FZ), f = ease(ramp(t, FZ, FZ + .6));
  let s = world(t, tf, { f, id: 'f', rain: 1, ball: 1 });
  s += you(120 + (t - S0(2)) * 22, 1100, .6, t);
  s += ripple(140 + (FZ - S0(2)) * 22, 900, clamp((t - FZ) / 1.5));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// the frozen street behind the close-ups
const frozenBG = (t, id) => world(t, FZ2(), { f: 1, id, rain: 1, ball: 1 });
// 3: light itself stops: photons hang in mid-air, short of your eye – then total darkness
function sceneDark(t) {
  const st = S0(3) - .2, T = t - st, ph = ease(ramp(t, WS(3, 3) - .2, WS(3, 7) + .3)), dk = ease(ramp(t, WS(3, 11) - .3, WS(3, 13) + .2));
  let s = frozenBG(t, 'd3') + `<rect width="720" height="1280" fill="#0a1028" opacity=".45"/>`;
  s += `<g transform="translate(250,1250) scale(3.2)">` + person(0, 120, Object.assign({ s: .9, face: 1, t }, YOU)) + `</g>`;
  // photons: three rays from the bright sky towards the eye (~285,770); each stops short, a frozen trail of dots
  const E = [292, 772];
  [[720, 700], [720, 880], [700, 1060]].forEach(([sx, sy], j) => { for (let i = 0; i < 14; i++) { const u = i / 14 * .82, x = sx + (E[0] - sx) * u, y = sy + (E[1] - sy) * u, a = ph * (1 - Math.abs(Math.sin(i * 1.3 + j)) * .25);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="#fff2c0" opacity="${(.3 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4" fill="#fffbe8" opacity="${a.toFixed(2)}"/>`; }
    const u = .86, x = sx + (E[0] - sx) * u, y = sy + (E[1] - sy) * u; s += `<path d="M${x.toFixed(1)},${(y - 10).toFixed(1)} l0,20" stroke="#ff6a5a" stroke-width="3" opacity="${ph.toFixed(2)}"/>`; });
  s += lbl(300, 560, 'ضوءٌ متوقّف', ph * (1 - dk), '#fff2c0', 26);
  s += `<rect width="720" height="1280" fill="#000" opacity="${(.94 * dk).toFixed(2)}"/>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 4: silence: sound waves frozen in the air; only your heartbeat, inside your body
function sceneSilence(t) {
  const st = S0(4) - .2, T = t - st, w = ease(ramp(t, WS(4, 0) - .2, WS(4, 4) + .3)), hb = ease(ramp(t, WS(4, 9) - .2, WS(4, 11) + .3));
  let s = frozenBG(t, 's4') + `<rect width="720" height="1280" fill="#02040c" opacity=".86"/>`;
  // a car horn's sound: rings frozen in place (dashed: no motion)
  for (let i = 0; i < 6; i++) s += `<path d="M${560 - 40 - i * 46},${1150 - 120 - i * 40} A${120 + i * 70},${120 + i * 70} 0 0 0 ${560 - 40 - i * 46},${1150 + 120 + i * 40}" stroke="#9ab8e8" stroke-width="3" stroke-dasharray="10 9" fill="none" opacity="${(w * (.7 - i * .09) * (1 - hb * .6)).toFixed(2)}"/>`;
  s += lbl(560, 1000, 'صوتٌ متجمّد', w * (1 - hb), '#9ab8e8', 24);
  // you, dimly lit, and a beating heart (≈ 72 bpm)
  const beat = Math.pow(Math.max(0, Math.sin(T * Math.PI * 2 * 1.2)), 8), hs = 1 + .16 * beat * hb;
  s += `<g transform="translate(330,1260) scale(2.4)" opacity=".55">` + person(0, 0, Object.assign({ s: 1, face: 1, t }, YOU)) + `</g>`;
  s += `<g transform="translate(352,690) scale(${hs.toFixed(3)})" opacity="${hb.toFixed(2)}"><path d="M0,22 C-30,2 -36,-18 -22,-28 C-12,-35 -2,-28 0,-18 C2,-28 12,-35 22,-28 C36,-18 30,2 0,22Z" fill="#c8202a"/><path d="M-16,-20 Q-22,-10 -14,0" stroke="#ff8a8a" stroke-width="3" fill="none" opacity=".7"/></g>`;
  // ECG trace
  let d = ''; for (let x = 0; x <= 720; x += 4) { const ph = pmod((x / 720) * 2.4 - T * 1.2, 1), y = 1090 - (ph < .04 ? Math.sin(ph / .04 * Math.PI) * 70 : ph < .07 ? -Math.sin((ph - .04) / .03 * Math.PI) * 22 : 0); d += (x ? 'L' : 'M') + x + ',' + y.toFixed(1); }
  s += `<path d="${d}" stroke="#ff4a4a" stroke-width="3" fill="none" opacity="${(hb * .9).toFixed(2)}"/>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// an air molecule (N2 or O2): two touching shaded spheres
function mol(x, y, r, a, c) { const dx = Math.cos(a) * r * .8, dy = Math.sin(a) * r * .8; return [[-1], [1]].map(([q]) => `<circle cx="${(x + q * dx).toFixed(1)}" cy="${(y + q * dy).toFixed(1)}" r="${r}" fill="url(#${c})"/>`).join(''); }
// 5: the frozen air won't move aside: a wall of fixed molecules in front of you
function sceneWall(t) {
  const st = S0(5) - .2, T = t - st, k = ease(ramp(t, WS(5, 1) - .2, WS(5, 4) + .3)), push = ease(ramp(t, WS(5, 7) - .2, WS(5, 10) + .3));
  let s = `<defs><radialGradient id="mN" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#e8f0ff"/><stop offset=".55" stop-color="#7a9ad8"/><stop offset="1" stop-color="#2a3a6a"/></radialGradient><radialGradient id="mO" cx=".35" cy=".35" r=".7"><stop offset="0" stop-color="#ffe8e8"/><stop offset=".55" stop-color="#e86a5a"/><stop offset="1" stop-color="#6a1e1a"/></radialGradient></defs>` + frozenBG(t, 'w5') + `<rect width="720" height="1280" fill="#060a1a" opacity=".78"/>`;
  // molecules: dense lattice-free gas, fixed in place, filling the space ahead (kept below the side list)
  const r = RS(23); let m = ''; for (let i = 0; i < 120; i++) { const x = 330 + r() * 400, y = 650 + r() * 520, a = r() * 3.14, rr = 7 + r() * 5, isO = r() < .21, dx = x - 300, dy = y - 900, dd = Math.hypot(dx, dy), sq = push * 26 * Math.exp(-dd / 90);
    m += `<g opacity="${k.toFixed(2)}">` + mol(x + sq * dx / dd, y + sq * dy / dd, rr, a, isO ? 'mO' : 'mN') + `</g>`; }
  s += m + `<rect x="330" y="640" width="6" height="540" fill="#9ab8e8" opacity="${(.0 + .35 * push).toFixed(2)}" filter="url(#blur2)"/>`;
  // you push against it and don't move
  s += `<g transform="translate(${180 + push * 30 + Math.sin(T * 9) * 2 * push},1180)">` + castSh(0, 0, .8) + person(0, 0, Object.assign({ s: .8, face: 1, t, moving: 1, phase: 1.2, amp: .5 * push }, YOU)) + `<path d="M${30},${-205} L${120 + push * 6},${-260}" stroke="${YOU.top}" stroke-width="16" stroke-linecap="round"/><circle cx="${126 + push * 6}" cy="-262" r="10" fill="${YOU.skin}"/></g>`;
  s += lbl(530, 1220, 'جزيئاتُ هواءٍ متجمّدة', k, '#cfd8ff', 22);
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 6: no air into your lungs – but one held breath lasts far longer than 5 seconds
function sceneBreath(t) {
  const st = S0(6) - .2, T = t - st, k = ease(ramp(t, WS(6, 0) - .2, WS(6, 2) + .3)), kb = ease(ramp(t, WS(6, 7) - .2, WS(6, 11) + .3));
  let s = frozenBG(t, 'b6') + `<rect width="720" height="1280" fill="#060a1a" opacity=".8"/>`;
  s += `<g transform="translate(300,1250) scale(2.6)" opacity=".6">` + person(0, 0, Object.assign({ s: 1, face: 1, t }, YOU)) + `</g>`;
  // lungs (semi-transparent) on the chest, not expanding
  const lx = 318, ly = 680; s += `<g opacity="${(.85 * k).toFixed(2)}"><path d="M${lx - 6},${ly - 70} L${lx - 6},${ly - 20} M${lx - 6},${ly - 20} L${lx - 30},${ly} M${lx - 6},${ly - 20} L${lx + 18},${ly}" stroke="#f2c8c8" stroke-width="5" fill="none"/>` +
    `<path d="M${lx - 16},${ly - 30} C${lx - 70},${ly - 40} ${lx - 84},${ly + 40} ${lx - 70},${ly + 90} C${lx - 50},${ly + 100} ${lx - 24},${ly + 90} ${lx - 18},${ly + 60}Z" fill="#e88a8a" opacity=".75"/><path d="M${lx + 4},${ly - 30} C${lx + 58},${ly - 40} ${lx + 72},${ly + 40} ${lx + 58},${ly + 90} C${lx + 38},${ly + 100} ${lx + 12},${ly + 90} ${lx + 6},${ly + 60}Z" fill="#e88a8a" opacity=".75"/></g>`;
  // blocked inflow at the mouth
  s += `<g opacity="${k.toFixed(2)}"><path d="M520,${520} L${400},${545}" stroke="#9ab8e8" stroke-width="4" stroke-dasharray="8 7"/><path d="M398,532 l24,26 M422,532 l-24,26" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round"/></g>`;
  // bars: 5 s vs a normal breath-hold of ~30–90 s
  s += `<g transform="translate(40,1040)"><rect width="640" height="170" rx="18" fill="#0a0e1c" opacity=".92"/>` + lbl(610, 46, 'المطلوب', kb, '#cfd8ff', 22, 'end') + `<rect x="30" y="60" width="${(540 * 5 / 90 * kb).toFixed(1)}" height="20" rx="6" fill="#f4c76b"/>` + num(110, 78, '5 s', kb, '#f4c76b', 22) +
    lbl(610, 118, 'حبسُ النفَسِ عادةً', kb, '#cfd8ff', 22, 'end') + `<rect x="30" y="132" width="${(540 * kb).toFixed(1)}" height="20" rx="6" fill="#4caf50"/>` + num(300, 168, '30–90 s', kb, '#fff', 22) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 7: time returns: colour comes back, the rain falls, nobody noticed
function sceneResume(t) {
  const GO = WS(7, 1) + .1, tf = FZ2() + Math.max(0, t - GO), f = 1 - ease(ramp(t, GO, GO + .6));
  let s = world(t, tf, { f, id: 'r', rain: 1, ball: 1 });
  s += you(300, 1100, .6, t, 0, { lookUp: .15 });
  s += ripple(320, 900, clamp((t - GO) / 1.5));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 8: "the darkest moment of your life": the dark frozen street and a 5-second ring
function sceneLast(t) {
  const st = S0(8) - .2, T = t - st, k = clamp((t - WS(8, 0)) / (WS(8, 8) + .6 - WS(8, 0)));
  let s = frozenBG(t, 'l8') + `<rect width="720" height="1280" fill="#000" opacity="${(.55 + .35 * k).toFixed(2)}"/>`;
  s += `<g transform="translate(300,1100)" opacity=".85">` + you(0, 0, .6, t, 0) + `</g>`;
  const n = Math.max(0, Math.ceil(5 - k * 5 - 1e-6));
  s += `<g transform="translate(360,720)"><circle r="120" fill="#0a0e1c" opacity=".85"/><circle r="104" fill="none" stroke="#2a3048" stroke-width="12"/><circle r="104" fill="none" stroke="#f4c76b" stroke-width="12" stroke-dasharray="${(653.5 * (1 - k)).toFixed(1)} 800" transform="rotate(-90)" stroke-linecap="round"/><text y="40" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="110" fill="#fff">${AR(n)}</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 9: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7), WS(9, 7) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneNormal }, { s: S0(2) - .2, f: sceneFreeze }, { s: S0(3) - .2, f: sceneDark }, { s: S0(4) - .2, f: sceneSilence },
  { s: S0(5) - .2, f: sceneWall }, { s: S0(6) - .2, f: sceneBreath }, { s: S0(7) - .2, f: sceneResume }, { s: S0(8) - .2, f: sceneLast }, { s: S0(9) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneDark, sceneSilence, sceneWall, sceneBreath, sceneLast]);
const XF = .5;
const TLI = [['ظلام', S0(3)], ['صمت', S0(4)], ['هواء صلب', S0(5)], ['بلا تنفّس', S0(6)]];
const LIST_ON = new Set([sceneDark, sceneSilence, sceneWall, sceneBreath]);
const CHIPS = [
  ['c1', 'في ٥ ثوانٍ عاديّة', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c2', 'الزمنُ متجمّد', 360, 330, 'red', WS(2, 2) + .3, S0(3) - .3],
  ['c3', 'ظلامٌ تامّ', 360, 330, 'red', WS(3, 12), S0(4) - .3],
  ['c4', 'لم يلاحظ أحد', 360, 330, 'big', WS(7, 7), S0(8) - .3],
  ['c5', '@MadhaLawLab', 360, 1200, 'dark', WS(9, 7), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الزمن متوقّف</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
