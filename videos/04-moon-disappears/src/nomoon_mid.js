// ---------- scenes ----------
let F = {};
const pt = (cx, cy, r, a) => [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
function milkyWay(t, a) {
  if (a <= 0) return '';
  let s = `<g opacity="${a}" transform="rotate(-28,360,520)"><ellipse cx="360" cy="520" rx="900" ry="120" fill="#7f8fd0" opacity=".10" filter="url(#haze)"/>` +
    `<ellipse cx="380" cy="510" rx="700" ry="60" fill="#c9b6ff" opacity=".10" filter="url(#haze)"/><ellipse cx="300" cy="530" rx="420" ry="34" fill="#ffe8c8" opacity=".08" filter="url(#haze)"/>`;
  const r = R(61); for (let i = 0; i < 420; i++) { const x = -300 + r() * 1320, y = 520 + (r() + r() + r() - 1.5) * 120, rr = r() * 1.1 + .25;
    s += `<circle cx="${x}" cy="${y}" r="${rr}" fill="#fff" opacity="${(.3 + .6 * r()) * (.6 + .4 * Math.sin(t * 2 + i))}"/>`; }
  for (let i = 0; i < 9; i++) { const x = r() * 1000 - 140, y = 520 + (r() - .5) * 60; s += `<ellipse cx="${x}" cy="${y}" rx="${30 + r() * 60}" ry="${6 + r() * 10}" fill="#05060f" opacity=".5" filter="url(#blur2)"/>`; }
  return s + `</g>`;
}
// 0: hook: the Moon above a huge Earth horizon, then it dissolves into dust
function sceneHook(t) {
  const vt = W(0, 4)[1] - .1, gone = ramp(t, vt, vt + .5);
  let s = space(t, '#03050f', '#081030');
  const MX = 360, MY = 600;
  // dust burst + shock ring
  if (t > vt) { const p = clamp((t - vt) / 1.6); let d = '';
    const r = R(5); for (let i = 0; i < 140; i++) { const a = r() * 6.28, sp = 60 + r() * 260, rr = 110 * Math.sqrt(r());
      const [x, y] = pt(MX, MY, rr + sp * p, a); d += `<circle cx="${x}" cy="${y}" r="${(1 + r() * 2.6) * (1 - p * .6)}" fill="#e8e4da" opacity="${(1 - p) * .9}"/>`; }
    s += `<circle cx="${MX}" cy="${MY}" r="${110 + p * 420}" fill="none" stroke="#dfe6ff" stroke-width="${6 * (1 - p)}" opacity="${(1 - p) * .7}"/>` + `<g filter="url(#blur2)">${d}</g>`; }
  s += `<circle cx="${MX}" cy="${MY}" r="330" fill="url(#moonGlow)" opacity="${.6 * (1 - gone)}"/>`;
  F.moon = { x: MX, y: MY, r: 110 * (1 - gone * .3), a: 1 - gone, sunI: 1 }; F.light = [-900, 450];
  F.earth = { x: 360, y: 1330, r: 560, a: 1, sunI: 1, lights: .5, rot: 1.0, tilt: .41 };
  F.flash = (1 - ramp(t, vt, vt + .35)) * (t > vt ? .45 : 0);
  F.ov = '';
  return s;
}
// 1: a dark lake under a sky that fills with stars and the Milky Way; someone with a telescope
function telescope(x, y) {
  return `<g transform="translate(${x},${y})"><line x1="0" y1="0" x2="-26" y2="80" stroke="#0a0c14" stroke-width="5"/><line x1="0" y1="0" x2="26" y2="80" stroke="#0a0c14" stroke-width="5"/><line x1="0" y1="0" x2="0" y2="82" stroke="#0a0c14" stroke-width="5"/>` +
    `<g transform="rotate(-38)"><rect x="-12" y="-14" width="110" height="26" rx="6" fill="#20263a"/><rect x="92" y="-18" width="22" height="34" rx="5" fill="#2c344d"/><rect x="-26" y="-8" width="16" height="14" fill="#151a28"/></g></g>`;
}
function sceneLake(t) {
  const st = S0(1), k = ease(ramp(t, WS(1, 11) - .3, WS(1, 18) + .5));
  let s = `<defs><linearGradient id="skL" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#010208"/><stop offset=".7" stop-color="#0a1030"/><stop offset="1" stop-color="#1a1f44"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skL)"/>`;
  s += stars(.35 + .65 * k, t) + milkyWay(t, k);
  // mountains + forest silhouettes
  s += `<path d="M-20,800 L90,700 L170,760 L280,640 L380,740 L470,680 L560,760 L650,690 L740,770 L740,860 L-20,860Z" fill="#0b0f22"/>`;
  let pines = ''; const r = R(8); for (let i = 0; i < 34; i++) { const x = i * 22 - 10 + r() * 10, h = 40 + r() * 60; pines += `<path d="M${x},860 l-12,0 l12,-${h} l12,${h}Z" fill="#05070f"/>`; }
  s += pines;
  // lake with star reflections (no moon path any more)
  s += `<rect y="860" width="720" height="420" fill="#04061a"/>`;
  const rr = R(17); for (let i = 0; i < 160; i++) { const x = rr() * 720, y = 870 + rr() * 300, w = 1 + rr() * 6;
    s += `<rect x="${x + Math.sin(t * 2 + i) * 3}" y="${y}" width="${w}" height="1.2" fill="#fff" opacity="${(.15 + .5 * rr()) * (.35 + .65 * k)}"/>`; }
  s += `<path d="M-20,1150 C150,1120 320,1140 420,1130 C560,1115 640,1140 740,1130 L740,1300 L-20,1300Z" fill="#06080f"/>`;
  // cabin with a warm window
  s += `<g transform="translate(110,1040)"><rect x="0" y="0" width="120" height="80" fill="#0a0c16"/><polygon points="-12,0 60,-50 132,0" fill="#0a0c16"/><rect x="74" y="26" width="28" height="26" fill="#ffcf87" opacity=".85"/>` +
       `<circle cx="88" cy="40" r="60" fill="url(#lampG)" opacity=".5"/></g>`;
  // stargazer with a telescope on the shore
  s += telescope(470, 1050) + person(560, 1135, { s: .75, face: -1, top: '#1a2033', pants: '#0f121c', skin: '#3a2a22', hair: '#0a0806', lookUp: .9, t });
  F.ov = '';
  return s;
}
// 2: night forest: an owl that hunts by moonlight, a rabbit that hides from it
function owl(x, y, s, t, look) {
  const hd = Math.sin(t * 1.3) * 10 * look, bl = (pmod(t, 3.2) < .12) ? .15 : 1;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-46,10 C-60,-60 -40,-120 0,-122 C40,-120 60,-60 46,10 C30,40 -30,40 -46,10Z" fill="#5a4630"/>` +
    `<path d="M-46,10 C-60,-60 -48,-90 -36,-100 C-50,-40 -40,10 -20,34 C-34,32 -42,22 -46,10Z" fill="#3e3020"/><path d="M46,10 C60,-60 48,-90 36,-100 C50,-40 40,10 20,34 C34,32 42,22 46,10Z" fill="#3e3020"/>` +
    Array.from({ length: 12 }, (_, i) => `<path d="M${-24 + (i % 4) * 16},${-40 + Math.floor(i / 4) * 18} q6,6 12,0" stroke="#2a2016" stroke-width="2" fill="none"/>`).join('') +
    `<g transform="rotate(${hd},0,-100)"><ellipse cx="0" cy="-108" rx="44" ry="38" fill="#6b5538"/><path d="M-40,-136 l-8,-26 l22,16Z M40,-136 l8,-26 l-22,16Z" fill="#4a3a26"/>` +
    `<ellipse cx="-18" cy="-110" rx="20" ry="19" fill="#c9b48a"/><ellipse cx="18" cy="-110" rx="20" ry="19" fill="#c9b48a"/>` +
    `<ellipse cx="-18" cy="-110" rx="12" ry="${12 * bl}" fill="#ffb21a"/><ellipse cx="18" cy="-110" rx="12" ry="${12 * bl}" fill="#ffb21a"/>` +
    `<circle cx="-18" cy="-110" r="${6 * bl}" fill="#111"/><circle cx="18" cy="-110" r="${6 * bl}" fill="#111"/><circle cx="-15" cy="-113" r="${2 * bl}" fill="#fff"/><circle cx="21" cy="-113" r="${2 * bl}" fill="#fff"/>` +
    `<path d="M-6,-98 L0,-84 L6,-98Z" fill="#3a2a14"/></g>` +
    `<path d="M-16,36 l-6,14 M-8,36 l0,16 M8,36 l0,16 M16,36 l6,14" stroke="#c9a14a" stroke-width="4" stroke-linecap="round"/></g>`;
}
function rabbit(x, y, s, t, hide) {
  const dy = hide * 60, ear = Math.sin(t * 6) * 4 * (1 - hide);
  return `<g transform="translate(${x},${y + dy}) scale(${s})"><ellipse cx="0" cy="-30" rx="44" ry="32" fill="#8a7a6a"/><circle cx="-40" cy="-30" r="10" fill="#e8e2d4"/>` +
    `<ellipse cx="34" cy="-58" rx="22" ry="20" fill="#9a8a78"/><path d="M30,-74 C24,-120 34,-130 40,-${116 - ear} C44,-100 40,-84 38,-74Z M42,-74 C46,-118 58,-124 60,-${110 - ear} C60,-94 52,-82 48,-72Z" fill="#9a8a78"/>` +
    `<circle cx="44" cy="-62" r="3.4" fill="#111"/><circle cx="45" cy="-63" r="1" fill="#fff"/><path d="M54,-54 l6,2" stroke="#3a2a20" stroke-width="2"/></g>`;
}
function sceneForest(t) {
  const st = S0(2), hide = ease(ramp(t, WS(2, 10), WS(2, 10) + .6)), owlOn = ease(ramp(t, WS(2, 5) - .3, WS(2, 5) + .3));
  let s = `<defs><linearGradient id="skF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#02030a"/><stop offset="1" stop-color="#0b1424"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skF)"/>` + stars(.7, t);
  // tree trunks, far and near
  const r = R(4); for (let i = 0; i < 9; i++) { const x = i * 90 + r() * 30 - 20, w = 18 + r() * 20; s += `<rect x="${x}" y="300" width="${w}" height="900" fill="#0a1018" opacity=".8"/>`; }
  s += `<rect x="-40" y="0" width="150" height="1280" fill="#05070c"/><rect x="600" y="0" width="160" height="1280" fill="#05070c"/>`;
  // branch with owl
  s += `<path d="M90,640 C260,620 380,650 520,610" stroke="#0b0d14" stroke-width="26" stroke-linecap="round"/><path d="M400,630 l60,-50" stroke="#0b0d14" stroke-width="10" stroke-linecap="round"/>`;
  s += `<g opacity="${.35 + .65 * owlOn}">${owl(300, 630, 1.2, t, owlOn)}</g>`;
  // owl eye glow
  s += `<circle cx="300" cy="498" r="${70 * owlOn}" fill="#ffb21a" opacity="${.08 * owlOn}" filter="url(#soft)"/>`;
  // ground, grass, burrow, rabbit
  s += `<path d="M-20,1050 C200,1020 420,1040 740,1010 L740,1300 L-20,1300Z" fill="#0a120c"/>` +
       `<ellipse cx="470" cy="1060" rx="60" ry="22" fill="#020302"/>`;
  s += `<g clip-path="url(#grd)">${rabbit(430, 1060, 1.1, t, hide)}</g><defs><clipPath id="grd"><rect x="0" y="0" width="720" height="1062"/></clipPath></defs>`;
  let gr = ''; const rg = R(9); for (let i = 0; i < 90; i++) { const x = rg() * 740 - 10, h = 20 + rg() * 40, sw = Math.sin(t * 1.5 + i) * 4; gr += `<path d="M${x},1080 q${sw},-${h / 2} ${sw * 2 + 4},-${h}" stroke="#16281a" stroke-width="3" fill="none"/>`; }
  s += gr;
  // fireflies
  for (let i = 0; i < 14; i++) { const rf = R(i + 70); const x = 100 + rf() * 520 + Math.sin(t * .7 + i) * 30, y = 760 + rf() * 260 + Math.cos(t * .9 + i) * 20, b = .5 + .5 * Math.sin(t * 3 + i * 2);
    s += `<circle cx="${x}" cy="${y}" r="10" fill="#d8ff7a" opacity="${.12 * b}" filter="url(#blur2)"/><circle cx="${x}" cy="${y}" r="2.4" fill="#eaff9a" opacity="${b}"/>`; }
  F.ov = '';
  return s;
}
// 3: a coral reef at night: moonlight beams trigger the spawn; without the Moon, it stops
function coral(x, y, sc, col, seed, t) {
  const r = R(seed); let s = '';
  const br = (bx, by, a, len, w, d) => { const ex = bx + Math.cos(a) * len, ey = by + Math.sin(a) * len + Math.sin(t * 1.2 + seed + d) * 1.5;
    s += `<path d="M${bx},${by} L${ex},${ey}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
    if (d < 3) { br(ex, ey, a - .4 - r() * .3, len * .72, w * .72, d + 1); br(ex, ey, a + .4 + r() * .3, len * .72, w * .72, d + 1); } };
  br(x, y, -Math.PI / 2, 60 * sc, 12 * sc, 0);
  return s;
}
function sceneReef(t) {
  const st = S0(3), beams = 1 - ease(ramp(t, WS(3, 9), WS(3, 12) + .4)), spawn = ease(ramp(t, WS(3, 7) - .2, WS(3, 7) + .6));
  let s = `<defs><linearGradient id="skR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c2a4a"/><stop offset=".5" stop-color="#061a30"/><stop offset="1" stop-color="#030b16"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skR)"/>`;
  // surface ripples + moon beams from above
  s += `<path d="M0,300 ${Array.from({ length: 12 }, (_, i) => `q30,${Math.sin(t * 2 + i) * 6} 60,0`).join(' ')}" stroke="#7fb6d9" stroke-width="2" fill="none" opacity=".4"/>`;
  s += `<g opacity="${beams}">` + [-1, -.3, .4, 1].map((u, i) => `<polygon points="${360 + u * 120},300 ${360 + u * 120 + 40},300 ${360 + u * 260 + 80},1280 ${360 + u * 260 - 40},1280" fill="#cfe6ff" opacity="${.07 + .03 * Math.sin(t + i)}"/>`).join('') + `</g>`;
  s += `<circle cx="360" cy="240" r="60" fill="#fff6dc" opacity="${.25 * beams}" filter="url(#soft)"/>`;
  // seabed and corals
  s += `<path d="M-20,1100 C120,1060 260,1090 380,1070 C520,1050 620,1080 740,1060 L740,1300 L-20,1300Z" fill="#1a1a22"/>`;
  s += coral(120, 1090, 1.4, '#c86a7a', 3, t) + coral(260, 1080, 1.1, '#d9a35a', 7, t) + coral(470, 1075, 1.5, '#8a6ac8', 11, t) + coral(620, 1085, 1.2, '#c86a7a', 13, t);
  s += `<ellipse cx="360" cy="1080" rx="70" ry="44" fill="#6a8a5a"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${300 + i * 22},1060 q10,-20 20,0" stroke="#4a6a3a" stroke-width="4" fill="none"/>`).join('');
  s += Array.from({ length: 3 }, (_, i) => `<path d="M${560 + i * 30},1080 C${555 + i * 30},${980 - i * 20} ${590 + i * 30},${960} ${580 + i * 30},${900 + i * 10}" stroke="#d0405a" stroke-width="8" fill="none" opacity=".8"/>`).join('');
  // spawn rising like pink snow while the moonlight is on
  let sp = ''; const r = R(23); for (let i = 0; i < 160; i++) { const x0 = 80 + r() * 560, sp0 = r(), y = 1060 - pmod((t - st) * (40 + r() * 50) + sp0 * 700, 760);
    sp += `<circle cx="${x0 + Math.sin(t + i) * 10}" cy="${y}" r="${2 + r() * 2.5}" fill="#ff9ab8" opacity="${spawn * beams * (.5 + .4 * r())}"/>`; }
  s += sp;
  // fish silhouettes
  for (let i = 0; i < 4; i++) { const x = pmod(t * (30 + i * 8) + i * 220, 900) - 90, y = 640 + i * 70; s += `<path d="M${x},${y} q20,-12 40,0 q-20,12 -40,0 M${x},${y} l-12,-8 l0,16Z" fill="#9fb6c8" opacity=".5"/>`; }
  F.ov = '';
  return s;
}
// 4: tides on a beach with a tide gauge: the range shrinks to a third
function sceneTide(t) {
  const st = S0(4), shrink = ease(ramp(t, WS(4, 10), WS(4, 14) + .6)), amp = lerp(110, 37, shrink);
  const lvl = 860 - Math.sin((t - st) * 1.1) * amp;
  let s = `<defs><linearGradient id="skT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2d4f7c"/><stop offset="1" stop-color="#e9c9a0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skT)"/>`;
  s += `<circle cx="560" cy="620" r="70" fill="#ffd7a0" opacity=".9"/><circle cx="560" cy="620" r="200" fill="#ffb36a" opacity=".2" filter="url(#soft)"/>`;
  // beach slope
  s += `<path d="M-20,700 C120,720 260,800 420,900 C520,960 620,1010 740,1040 L740,1300 L-20,1300Z" fill="#d9bf8a"/>`;
  // tide pool with a starfish and crab
  s += `<ellipse cx="180" cy="840" rx="70" ry="16" fill="#5a8ab0" opacity="${clamp((lvl < 860 ? .9 : .6) - shrink * .5)}"/>` +
       `<path d="M170,836 l6,-12 l6,12 l12,2 l-10,8 l4,12 l-12,-6 l-12,6 l4,-12 l-10,-8Z" fill="#e2603a"/>` +
       `<g transform="translate(250,${790})"><ellipse rx="16" ry="10" fill="#c84a2a"/><path d="M-14,-2 l-10,-10 M14,-2 l10,-10 M-10,6 l-12,6 M10,6 l12,6" stroke="#c84a2a" stroke-width="3"/></g>`;
  // sea
  s += `<path d="M-20,${lvl} ${Array.from({ length: 19 }, (_, i) => `q20,${Math.sin(t * 3 + i) * 5} 40,0`).join(' ')} L760,1300 L-20,1300Z" fill="#2a6a9a" opacity=".85"/>` +
       `<path d="M-20,${lvl} ${Array.from({ length: 19 }, (_, i) => `q20,${Math.sin(t * 3 + i) * 5} 40,0`).join(' ')}" stroke="#e8f6ff" stroke-width="4" fill="none"/>`;
  // tide gauge post
  const gx = 560; s += `<rect x="${gx - 14}" y="620" width="28" height="560" fill="#f2efe6"/>` + Array.from({ length: 14 }, (_, i) => `<rect x="${gx - 14}" y="${640 + i * 40}" width="28" height="20" fill="#c83a3a"/>`).join('');
  s += `<line x1="${gx - 60}" y1="${860 - 110}" x2="${gx + 60}" y2="${860 - 110}" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/><line x1="${gx - 60}" y1="${860 + 110}" x2="${gx + 60}" y2="${860 + 110}" stroke="#fff" stroke-width="3" stroke-dasharray="8 6"/>`;
  s += `<rect x="${gx - 50}" y="${lvl - 3}" width="100" height="6" fill="#f4c76b"/>`;
  F.ov = '';
  return s;
}
// 5: the slow danger: Earth's tilt, a spinning top, millions of years, flipped seasons
function top2d(x, y, s, t, wob) {
  const a = Math.sin(t * 2.3) * wob * 28 + Math.sin(t * 5.1) * wob * 8, spin = t * 14;
  const stripes = [0, 1, 2, 3].map(i => { const u = pmod(spin / 6.28 + i / 4, 1); return `<rect x="${-46 + u * 92}" y="-56" width="10" height="56" fill="#fff" opacity="${.5 * Math.sin(u * Math.PI)}"/>`; }).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="40" ry="8" fill="#000" opacity=".35" filter="url(#blur2)"/><g transform="rotate(${a})">` +
    `<path d="M0,0 L-50,-56 Q0,-90 50,-56Z" fill="#d0405a"/><clipPath id="tc"><path d="M0,0 L-50,-56 Q0,-90 50,-56Z"/></clipPath><g clip-path="url(#tc)">${stripes}</g>` +
    `<ellipse cx="0" cy="-64" rx="50" ry="12" fill="#f4c76b"/><rect x="-5" y="-106" width="10" height="44" rx="4" fill="#8a5a3a"/></g>` +
    (wob < .2 ? Array.from({ length: 3 }, (_, i) => `<path d="M${-70 - i * 12},-40 q-8,20 0,40" stroke="#fff" stroke-width="2" opacity=".4" fill="none"/><path d="M${70 + i * 12},-40 q8,20 0,40" stroke="#fff" stroke-width="2" opacity=".4" fill="none"/>`).join('') : '') + `</g>`;
}
function sceneTilt(t) {
  const st = S0(5) - .2, wobT = W(7, 2)[1], wob = ease(ramp(t, wobT, wobT + 1.5)), seasons = ease(ramp(t, WS(7, 9), WS(7, 9) + .6));
  const tiltDeg = 23.5 + wob * (Math.sin((t - wobT) * 1.4) * 22 + Math.sin((t - wobT) * .6) * 10);
  const tilt = tiltDeg * Math.PI / 180;
  let s = space(t, '#03050f', '#0a0f2c');
  const ex = 360, ey = lerp(620, 560, seasons), er = lerp(220, 170, seasons);
  // axis line through the Earth
  const ax = Math.sin(tilt), ay = Math.cos(tilt);
  s += `<line x1="${ex + ax * er * 1.45}" y1="${ey - ay * er * 1.45}" x2="${ex - ax * er * 1.45}" y2="${ey + ay * er * 1.45}" stroke="#f4c76b" stroke-width="4" stroke-dasharray="12 8" opacity=".9"/>` +
       `<line x1="${ex}" y1="${ey - er * 1.5}" x2="${ex}" y2="${ey + er * 1.5}" stroke="#fff" stroke-width="2" stroke-dasharray="4 8" opacity=".35"/>`;
  const arcR = er * 1.3, a0 = -Math.PI / 2, a1 = -Math.PI / 2 + tilt;
  s += `<path d="M${ex + Math.cos(a0) * arcR},${ey + Math.sin(a0) * arcR} A${arcR},${arcR} 0 0 1 ${ex + Math.cos(a1) * arcR},${ey + Math.sin(a1) * arcR}" stroke="#f4c76b" stroke-width="3" fill="none" opacity=".8"/>`;
  F.tilt = { x: ex + Math.cos(a0 + tilt / 2) * (arcR + 40), y: ey + Math.sin(a0 + tilt / 2) * (arcR + 40), deg: tiltDeg };
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .3, rot: 1.6, tilt: -tilt }; F.light = [-1400, ey - 200]; F.moon = null;
  // spinning top analogy
  let o = `<g opacity="${ease(ramp(t, W(6, 4)[1] - .3, W(6, 4)[1] + .3)) * (1 - seasons)}">${top2d(560, 1080, 1.1, t, wob)}</g>`;
  // flipped seasons: two panels
  if (seasons > 0) {
    const hotA = ease(ramp(t, W(7, 11)[1] - .2, W(7, 11)[1] + .4)), coldA = ease(ramp(t, W(7, 13)[1] - .2, W(7, 13)[1] + .4));
    o += `<g opacity="${hotA}" transform="translate(${(1 - hotA) * -40},0)"><rect x="30" y="820" width="320" height="360" rx="24" fill="#c8641e"/><circle cx="190" cy="920" r="60" fill="#ffe08a"/><circle cx="190" cy="920" r="120" fill="#ffd27a" opacity=".3" filter="url(#soft)"/>` +
         `<rect x="30" y="1060" width="320" height="120" fill="#8a4a1a"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${50 + i * 50},1080 l20,30 l-10,30 M${70 + i * 50},1110 l24,-8" stroke="#4a2410" stroke-width="3" fill="none"/>`).join('') +
         `<rect x="30" y="820" width="320" height="360" rx="24" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/></g>`;
    o += `<g opacity="${coldA}" transform="translate(${(1 - coldA) * 40},0)"><rect x="370" y="820" width="320" height="360" rx="24" fill="#2a4a6e"/>` +
         Array.from({ length: 5 }, (_, i) => `<path d="M${400 + i * 62},1100 l-24,0 l24,-${90 + (i % 2) * 30} l24,${90 + (i % 2) * 30}Z" fill="#14283e"/><path d="M${400 + i * 62},${1010 - (i % 2) * 30} l-12,40 l24,0Z" fill="#fff"/>`).join('') +
         `<rect x="370" y="1100" width="320" height="80" fill="#e8f2fa"/>` + Array.from({ length: 30 }, (_, i) => { const rr = R(i + 400); return `<circle cx="${380 + rr() * 300}" cy="${830 + pmod(rr() * 340 + t * 60 * (.5 + rr()), 340)}" r="${1.5 + rr() * 2}" fill="#fff" opacity=".9"/>`; }).join('') +
         `<rect x="370" y="820" width="320" height="360" rx="24" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="2"/></g>`;
  }
  F.ov = o;
  return s;
}
// 6: the guardian: the Moon comes back beside the Earth, tilt steady again
function sceneGuard(t) {
  const st = S0(8) - .2, k = ease(ramp(t, st, st + 1.4));
  let s = space(t, '#050820', '#0f1438');
  const ex = 330, ey = 700, er = 190, oa = -2.2 + (t - st) * .25, mx = ex + Math.cos(oa) * 300, my = ey + Math.sin(oa) * 110;
  s += `<ellipse cx="${ex}" cy="${ey}" rx="300" ry="110" fill="none" stroke="#dfe6ff" stroke-width="3" stroke-dasharray="${940 * k} 2000" opacity=".6"/>`;
  s += `<circle cx="${mx}" cy="${my}" r="${90 * k}" fill="url(#moonGlow)" opacity="${k}"/>`;
  F.earth = { x: ex, y: ey, r: er, a: 1, sunI: 1, lights: .3, rot: 1.6, tilt: -.41 }; F.moon = { x: mx, y: my, r: 44, a: k, sunI: 1 }; F.light = [-1400, 400];
  F.ov = '';
  return s;
}
// 7: CTA: Moon close-up with a question mark and a subscribe button
function sceneCTA(t) {
  const st = S0(9), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#070a1f', '#120f33');
  F.moon = { x: 360, y: 760, r: 200, a: 1, sunI: 1 }; F.light = [-600, 300]; F.earth = null;
  s += `<circle cx="360" cy="760" r="520" fill="url(#moonGlow)" opacity=".7"/>`;
  F.ov = `<g opacity="${k}"><text x="360" y="850" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="240" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(9, 4), WS(9, 4) + .4)}" transform="translate(360,${1060 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneLake }, { s: S0(2) - .2, f: sceneForest }, { s: S0(3) - .2, f: sceneReef }, { s: S0(4) - .2, f: sceneTide },
  { s: S0(5) - .2, f: sceneTilt }, { s: S0(8) - .2, f: sceneGuard }, { s: S0(9) - .2, f: sceneCTA },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['الليلة', S0(1)], ['كل يوم', S0(4)], ['ملايين السنين', S0(5)]];
const CHIPS = [
  ['c1', 'آلاف النجوم', 360, 360, 'dark', WS(1, 12), S0(2)],
  ['c2', 'يصطاد على ضوء القمر', 360, 380, 'dark', WS(2, 5), WS(2, 9)], ['c3', 'يختبئ منه', 470, 940, 'dark', WS(2, 10), S0(3)],
  ['c4', 'موعد التكاثر', 360, 420, '', WS(3, 7), WS(3, 12)], ['c5', 'بدون القمر؟', 360, 420, 'red', WS(3, 12) + .1, S0(4)],
  ['c6', 'المدّ قبل', 420, 0, 'dark', WS(4, 7), WS(4, 10)], ['c7', 'المدّ ⅓', 380, 0, 'big', WS(4, 14) - .1, S0(5)],
  ['c8', '٢٣٫٥°', 0, 0, 'big', WS(6, 2), W(7, 2)[1]], ['c9', '؟°', 0, 0, 'big red', W(7, 2)[1] + .2, WS(7, 9)],
  ['c10', '+ ملايين السنين', 360, 300, 'dark', WS(7, 7), WS(7, 10)],
  ['c11', 'صيف حارق', 190, 800, 'red', W(7, 11)[1], S0(8)], ['c12', 'شتاء جليدي', 530, 800, 'dark', W(7, 13)[1], S0(8)],
  ['c13', 'حارس الأرض', 360, 1000, 'big', WS(8, 7), S0(9)],
  ['c14', '@MadhaLawLab', 360, 1160, 'dark', WS(9, 6), 999],
];
$('ui').innerHTML = `<div class="list" id="tl"><div class="hd">بعد اختفاء القمر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 88; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  const vis = ease(ramp(t, S0(1), S0(1) + .4)) * (1 - ease(ramp(t, S0(5) + 1, S0(5) + 1.5)));
  $('tl').style.opacity = vis * (t > S0(3) - .2 && t < S0(4) - .2 ? 0 : 1) * (t > S0(4) - .2 && t < S0(5) ? 0 : 1) + (t > S0(5) - .2 && t < S0(5) + 1.5 ? ease(ramp(t, S0(5) - .2, S0(5) + .2)) * (1 - ease(ramp(t, S0(5) + 1, S0(5) + 1.5))) : 0);
  let act = 0; TLI.forEach((x, i) => { if (t >= x[1]) act = i; });
  $('tlf').style.height = (act * 88) + 'px';
  TLI.forEach((x, i) => { const on = i <= act, cur = i === act;
    $('tli' + i).style.color = cur ? '#fff' : on ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + i).style.background = on ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + i).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('c6').style.top = (860 - 150) + 'px'; $('c7').style.top = (860 - 150) + 'px';
  if (F.tilt) { ['c8', 'c9'].forEach(id => { $(id).style.left = Math.min(600, F.tilt.x + 60) + 'px'; $(id).style.top = F.tilt.y + 'px'; }); $('c9').textContent = Math.round(F.tilt.deg) + '°'; }
  $('note').style.opacity = 0;
}

