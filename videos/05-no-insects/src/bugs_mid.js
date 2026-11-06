// ---------- scenes ----------
let F = {};
const TEX = `<filter id="leafTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".08" numOctaves="3" seed="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.6 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="woodTex" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".5 .03" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .1  0 0 0 0 .06  0 0 0 0 .02  0 0 0 -1.8 1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="soilT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".25" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .03  0 0 0 0 .01  0 0 0 -1.5 .9"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
function bokeh(t, cols, n, seed, a = 1) {
  const r = R(seed); let s = '';
  for (let i = 0; i < n; i++) { const x = r() * 720, y = r() * 1280, rr = 20 + r() * 70, c = cols[Math.floor(r() * cols.length)];
    s += `<circle cx="${x + Math.sin(t * .2 + i) * 10}" cy="${y}" r="${rr}" fill="${c}" opacity="${a * (.08 + r() * .14)}" filter="url(#soft)"/>`; }
  return s;
}
function bee(x, y, s, t, ang = 0, a = 1) {
  const wf = .25 + .75 * Math.abs(Math.sin(t * 70)), r = R(5);
  let o = `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})" opacity="${a}">`;
  o += `<g opacity=".55"><ellipse cx="-4" cy="-22" rx="22" ry="${9 * wf}" transform="rotate(-25,-4,-22)" fill="#eef6ff" stroke="#fff" stroke-width="1"/><ellipse cx="8" cy="-20" rx="18" ry="${7 * wf}" transform="rotate(-50,8,-20)" fill="#eef6ff" stroke="#fff" stroke-width="1"/></g>`;
  o += `<defs><radialGradient id="bA" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ffd24a"/><stop offset=".7" stop-color="#d08a10"/><stop offset="1" stop-color="#6a3a00"/></radialGradient>` +
    `<radialGradient id="bT" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#e8b040"/><stop offset="1" stop-color="#5a3a10"/></radialGradient><clipPath id="bAc"><ellipse cx="-24" cy="2" rx="22" ry="15"/></clipPath></defs>`;
  o += `<ellipse cx="-24" cy="2" rx="22" ry="15" fill="url(#bA)"/><g clip-path="url(#bAc)">` + [-36, -26, -16].map(k => `<rect x="${k}" y="-14" width="5.5" height="30" fill="#1a1008" opacity=".85" transform="rotate(8,${k},0)"/>`).join('') + `</g>`;
  o += `<circle cx="0" cy="-2" r="13" fill="url(#bT)"/>` + Array.from({ length: 26 }, () => { const a2 = r() * 6.28; return `<line x1="${Math.cos(a2) * 10}" y1="${-2 + Math.sin(a2) * 10}" x2="${Math.cos(a2) * 15}" y2="${-2 + Math.sin(a2) * 15}" stroke="#e8c070" stroke-width="1" opacity=".7"/>`; }).join('');
  o += `<circle cx="15" cy="0" r="9" fill="#2a1a0c"/><ellipse cx="18" cy="-2" rx="4" ry="5" fill="#0a0604"/><circle cx="19" cy="-4" r="1.4" fill="#fff" opacity=".7"/>`;
  o += `<path d="M20,-6 q8,-12 14,-14 M18,-7 q4,-14 10,-18" stroke="#1a1008" stroke-width="1.6" fill="none"/>`;
  o += [[-4, 10, -10, 22], [4, 10, 2, 24], [10, 8, 14, 20]].map(([a1, b1, a2, b2]) => `<path d="M${a1},${b1} L${a2},${b2}" stroke="#2a1a0c" stroke-width="2.2"/>`).join('') + `<ellipse cx="0" cy="22" rx="4" ry="3" fill="#ffcf3a"/>`;
  return o + `</g>`;
}
function butterfly(x, y, s, t, c1, c2, a = 1) {
  const f = .2 + .8 * Math.abs(Math.cos(t * 9));
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><defs><radialGradient id="bw${c1.slice(1)}" cx=".2" cy=".5" r=".9"><stop offset="0" stop-color="${c2}"/><stop offset=".6" stop-color="${c1}"/><stop offset="1" stop-color="#1a0e06"/></radialGradient></defs>` +
    `<g transform="scale(${f},1)"><path d="M0,0 C20,-40 60,-46 62,-14 C64,6 30,10 0,0Z M0,0 C24,8 50,22 40,44 C30,58 6,30 0,0Z" fill="url(#bw${c1.slice(1)})"/><path d="M0,0 C-20,-40 -60,-46 -62,-14 C-64,6 -30,10 0,0Z M0,0 C-24,8 -50,22 -40,44 C-30,58 -6,30 0,0Z" fill="url(#bw${c1.slice(1)})"/>` +
    `<circle cx="40" cy="-18" r="5" fill="#fff" opacity=".7"/><circle cx="-40" cy="-18" r="5" fill="#fff" opacity=".7"/></g><ellipse cx="0" cy="6" rx="3" ry="16" fill="#1a1008"/><path d="M0,-8 q-6,-16 -12,-20 M0,-8 q6,-16 12,-20" stroke="#1a1008" stroke-width="1.4" fill="none"/></g>`;
}
function flower(x, y, s, petal, tip, center, n, t, seed) {
  const sw = Math.sin(t * 1.2 + seed) * 3, id = 'fl' + seed;
  let o = `<path d="M${x},${y + 400 * s} Q${x + sw * 3},${y + 200 * s} ${x},${y}" stroke="#3a6a2a" stroke-width="${6 * s}" fill="none"/>` +
    `<path d="M${x},${y + 260 * s} q${50 * s},${-30 * s} ${80 * s},${-10 * s} q${-30 * s},${30 * s} ${-80 * s},${10 * s}Z" fill="#4a7a30"/>`;
  o += `<defs><radialGradient id="${id}" cx="0" cy=".5" r="1"><stop offset="0" stop-color="${petal}"/><stop offset="1" stop-color="${tip}"/></radialGradient></defs><g transform="translate(${x},${y}) rotate(${sw}) scale(${s})">`;
  for (let i = 0; i < n; i++) o += `<ellipse cx="34" cy="0" rx="34" ry="14" fill="url(#${id})" transform="rotate(${i * 360 / n})"/>`;
  o += `<circle r="16" fill="${center}"/>` + Array.from({ length: 18 }, (_, i) => `<circle cx="${Math.cos(i * 2.4) * Math.sqrt(i) * 3.4}" cy="${Math.sin(i * 2.4) * Math.sqrt(i) * 3.4}" r="1.6" fill="#5a3a08" opacity=".6"/>`).join('');
  return o + `</g>`;
}
// 0: macro meadow in the morning sun; the insects dissolve into light at "tomorrow"
function sceneMeadow(t) {
  const gone = ramp(t, W(0, 7)[1] - .1, W(0, 7)[1] + .7);
  let s = `<defs><linearGradient id="skM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc8e8"/><stop offset=".55" stop-color="#e8e0b0"/><stop offset="1" stop-color="#6a9a40"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skM)"/>`;
  s += `<circle cx="560" cy="330" r="300" fill="#fff4c8" opacity=".55" filter="url(#soft)"/>` + bokeh(t, ['#fff6c8', '#d8f0a0', '#ffd8e8'], 26, 3, .9);
  s += `<rect y="700" width="720" height="580" fill="#5a8a30" opacity=".6" filter="url(#haze)"/>`;
  s += flower(150, 760, 1.2, '#fff8f0', '#f0b0c8', '#f4c030', 12, t, 1) + flower(560, 640, 1.6, '#ffd84a', '#f0a010', '#6a3a10', 14, t, 2) + flower(380, 940, 1.1, '#e070a0', '#a03060', '#f0d050', 8, t, 3);
  let gr = ''; const rg = R(9); for (let i = 0; i < 80; i++) { const gx = rg() * 740 - 10, h = 120 + rg() * 260, sw = Math.sin(t * 1.3 + i) * 8; gr += `<path d="M${gx},1300 q${sw},-${h / 2} ${sw * 2 + 10},-${h}" stroke="${['#4a7a28', '#5a8a30', '#3a6a20'][i % 3]}" stroke-width="${3 + rg() * 3}" fill="none"/>`; }
  s += gr;
  // insects, then dissolving into motes
  const ia = 1 - gone;
  s += bee(560 + Math.sin(t * 2) * 6, 610 + Math.cos(t * 3) * 4, 1.6, t, -10, ia) + bee(230 + t * 40, 520 + Math.sin(t * 3) * 30, 1.0, t, 5, ia) + butterfly(420 + Math.sin(t * .9) * 60, 420 + Math.cos(t * 1.3) * 30, 1.1, t, '#e8781a', '#ffd070', ia);
  if (gone > 0) { const r = R(12); let m = ''; for (let i = 0; i < 90; i++) { const cx = [560, 230 + t * 40, 420][i % 3], cy = [610, 520, 420][i % 3], a = r() * 6.28, d = gone * (40 + r() * 160);
    m += `<circle cx="${cx + Math.cos(a) * d}" cy="${cy + Math.sin(a) * d - gone * 60}" r="${1.5 + r() * 2.5}" fill="#fff6c8" opacity="${(1 - gone) * .9 + .1 * (gone < 1)}"/>`; } s += `<g filter="url(#blur1)">${m}</g>`; }
  F.ov = '';
  return s;
}
// 1: a summer picnic with no mosquitoes or flies
function scenePicnic(t) {
  let s = `<defs><linearGradient id="skP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8a060"/><stop offset=".5" stop-color="#f0c890"/><stop offset="1" stop-color="#7a9a48"/></linearGradient>` +
    `<pattern id="chk" width="80" height="80" patternUnits="userSpaceOnUse"><rect width="80" height="80" fill="#f4efe6"/><rect width="40" height="40" fill="#c83a3a"/><rect x="40" y="40" width="40" height="40" fill="#c83a3a"/><rect width="80" height="80" fill="#000" opacity=".04"/></pattern>` +
    `<radialGradient id="wmG" cx=".5" cy="1" r="1"><stop offset=".72" stop-color="#e83a4a"/><stop offset=".8" stop-color="#f6f0d0"/><stop offset=".9" stop-color="#5a9a3a"/><stop offset="1" stop-color="#2a5a1a"/></radialGradient></defs>` +
    `<rect width="720" height="1280" fill="url(#skP)"/><circle cx="560" cy="520" r="90" fill="#fff2c8" opacity=".8" filter="url(#soft)"/>`;
  s += `<path d="M-20,700 C200,660 500,690 740,660 L740,1300 L-20,1300Z" fill="#6a8a3a"/>` + bokeh(t, ['#fff2c8', '#ffd090'], 18, 21, .7);
  // tree on the left
  s += `<path d="M60,1300 C80,1000 40,800 90,640" stroke="#3a2a1a" stroke-width="40" fill="none"/>` + Array.from({ length: 30 }, (_, i) => { const rr = R(i + 40); return `<circle cx="${rr() * 360 - 80}" cy="${rr() * 320 + 360}" r="${50 + rr() * 50}" fill="${['#3a5a28', '#4a6a30', '#2e4a20'][i % 3]}"/>`; }).join('');
  // blanket in perspective with food
  s += `<polygon points="120,900 640,880 760,1240 -20,1260" fill="url(#chk)"/><polygon points="120,900 640,880 760,1240 -20,1260" fill="#000" opacity=".08"/>`;
  s += `<g transform="translate(300,1010)"><path d="M-80,0 A80,80 0 0 1 80,0Z" fill="url(#wmG)"/>${Array.from({ length: 9 }, (_, i) => `<ellipse cx="${-50 + i * 12}" cy="${-30 - Math.sin(i / 8 * Math.PI) * 20}" rx="2.4" ry="4" fill="#1a1008"/>`).join('')}</g>`;
  s += `<g transform="translate(500,960)"><rect x="-40" y="-110" width="80" height="120" rx="14" fill="#f4e060" opacity=".75"/><rect x="-40" y="-110" width="80" height="120" rx="14" fill="none" stroke="#fff" stroke-width="3" opacity=".7"/><rect x="-28" y="-60" width="56" height="60" fill="#f8d040" opacity=".6"/><circle cx="-10" cy="-80" r="10" fill="#c8e870" opacity=".8"/></g>`;
  s += `<g transform="translate(180,1120)"><ellipse rx="90" ry="26" fill="#d8a860"/><ellipse rx="80" ry="18" fill="#e8c070"/><rect x="-60" y="-30" width="120" height="20" rx="6" fill="#6aa040"/><rect x="-64" y="-46" width="128" height="20" rx="8" fill="#e8c070"/></g>`;
  // crossed-out mosquito and fly
  const a = ease(ramp(t, WS(1, 4), WS(1, 4) + .4)), b = ease(ramp(t, WS(1, 6), WS(1, 6) + .4));
  const ban = (x, y, k, icon) => `<g opacity="${k}" transform="translate(${x},${y}) scale(${.8 + .2 * k})"><circle r="62" fill="rgba(8,12,30,.55)"/>${icon}<circle r="56" fill="none" stroke="#e53935" stroke-width="9"/><line x1="-40" y1="-40" x2="40" y2="40" stroke="#e53935" stroke-width="9"/></g>`;
  const mosq = `<g stroke="#eee" stroke-width="2.4" fill="none"><path d="M-20,6 L20,-6"/><path d="M-6,0 l-10,22 M2,-2 l-4,26 M10,-4 l6,24 M-4,0 l-18,-12 M4,-2 l16,-20"/><path d="M20,-6 l18,-4"/></g><ellipse cx="-2" cy="-14" rx="14" ry="5" fill="#fff" opacity=".5" transform="rotate(-30)"/>`;
  const fly = `<ellipse cx="0" cy="4" rx="18" ry="12" fill="#ddd"/><circle cx="16" cy="0" r="8" fill="#ccc"/><ellipse cx="-6" cy="-14" rx="16" ry="8" fill="#fff" opacity=".5"/><ellipse cx="8" cy="-14" rx="16" ry="8" fill="#fff" opacity=".5"/>`;
  s += ban(220, 520, a, mosq) + ban(500, 520, b, fly);
  F.ov = '';
  return s;
}
// 2: apple orchard in bloom, bees carrying pollen from flower to flower
function blossom(x, y, s, t, seed) {
  const sw = Math.sin(t * 1.1 + seed) * 2;
  return `<g transform="translate(${x},${y}) rotate(${sw}) scale(${s})">` + Array.from({ length: 5 }, (_, i) => `<ellipse cx="0" cy="-13" rx="10" ry="14" fill="url(#blG)" transform="rotate(${i * 72})"/>`).join('') +
    `<circle r="5" fill="#e8d070"/>` + Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="0" x2="${Math.cos(i * .8) * 9}" y2="${Math.sin(i * .8) * 9}" stroke="#d8b040" stroke-width="1.2"/>`).join('') + `</g>`;
}
function sceneOrchard(t) {
  const st = S0(2) - .2;
  let s = `<defs><linearGradient id="skO" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8fc0e8"/><stop offset="1" stop-color="#e8f0d8"/></linearGradient>` +
    `<radialGradient id="blG" cx=".5" cy=".9" r="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#ffe8f0"/><stop offset="1" stop-color="#f0a8c0"/></radialGradient></defs><rect width="720" height="1280" fill="url(#skO)"/>`;
  // rows of blooming trees fading into distance
  for (let row = 0; row < 3; row++) { const y = 640 + row * 90, sc = .5 + row * .25, op = .45 + row * .2;
    for (let i = 0; i < 6; i++) { const x = i * 140 - 40 + row * 50; s += `<g opacity="${op}"><rect x="${x - 6 * sc}" y="${y - 40 * sc}" width="${12 * sc}" height="${140 * sc}" fill="#5a4030"/>` +
      Array.from({ length: 10 }, (_, k) => { const rr = R(row * 50 + i * 10 + k); return `<circle cx="${x + (rr() - .5) * 150 * sc}" cy="${y - 60 * sc + (rr() - .5) * 90 * sc}" r="${(30 + rr() * 26) * sc}" fill="${rr() > .5 ? '#f8e0ea' : '#fff4f8'}"/>`; }).join('') + `</g>`; } }
  s += `<path d="M-20,900 C200,880 500,900 740,880 L740,1300 L-20,1300Z" fill="#7aa848"/>`;
  // close branch with blossoms in the foreground
  s += `<path d="M-20,520 C150,480 300,560 460,500 C560,470 640,520 740,480" stroke="#4a3426" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M-20,520 C150,480 300,560 460,500" stroke="#000" stroke-width="22" fill="none" filter="url(#woodTex)" opacity=".7"/>`;
  s += `<path d="M300,540 C320,600 360,640 420,660" stroke="#4a3426" stroke-width="10" fill="none" stroke-linecap="round"/>`;
  const B = [[90, 480, 1.5], [180, 470, 1.8], [270, 540, 1.4], [380, 520, 2.0], [470, 480, 1.6], [560, 500, 1.5], [650, 470, 1.8], [350, 620, 1.7], [420, 660, 1.5]];
  B.forEach(([x, y, sc], i) => { s += `<ellipse cx="${x - 20}" cy="${y + 12}" rx="20" ry="9" fill="#5a9a3a" transform="rotate(-20,${x - 20},${y + 12})"/>` + blossom(x, y, sc, t, i); });
  // bees flying between blossoms with pollen trails
  const path = (u, off) => { const k = pmod(u + off, 1) * (B.length - 1), i = Math.floor(k), f = k - i, a = B[i], b = B[i + 1]; return [lerp(a[0], b[0], f), lerp(a[1], b[1], f) - 40 * Math.sin(f * Math.PI) - 30]; };
  for (let j = 0; j < 3; j++) { const u = (t - st) * .06, [bx, by] = path(u, j * .33);
    let tr = ''; for (let k = 1; k < 14; k++) { const [px, py] = path(u - k * .004, j * .33); tr += `<circle cx="${px}" cy="${py}" r="${2.4 - k * .14}" fill="#ffd84a" opacity="${.8 - k * .055}"/>`; }
    s += tr + bee(bx, by, 1.0, t, 0); }
  F.ov = '';
  return s;
}
// 3: fruit market stall: crates empty and prices climb
function fruitApple(x, y, r) { return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#apG)"/><path d="M${x},${y - r * .8} q2,-8 6,-10" stroke="#5a3a1a" stroke-width="2" fill="none"/><ellipse cx="${x - r * .35}" cy="${y - r * .35}" rx="${r * .25}" ry="${r * .15}" fill="#fff" opacity=".5"/>`; }
function fruitStraw(x, y, r) { return `<path d="M${x - r},${y - r * .6} C${x - r},${y + r * .3} ${x - r * .3},${y + r} ${x},${y + r * 1.1} C${x + r * .3},${y + r} ${x + r},${y + r * .3} ${x + r},${y - r * .6} Q${x},${y - r * 1.1} ${x - r},${y - r * .6}Z" fill="url(#stG)"/>` +
  Array.from({ length: 7 }, (_, i) => `<ellipse cx="${x + Math.cos(i * 1.9) * r * .55}" cy="${y + Math.sin(i * 1.9) * r * .45}" rx="1.2" ry="1.8" fill="#ffe080"/>`).join('') + `<path d="M${x - r * .7},${y - r * .7} l${r * .3},${r * .25} l${r * .4},${-r * .3} l${r * .4},${r * .3} l${r * .3},${-r * .25}" fill="#3a8a2a"/>`; }
function fruitCherry(x, y, r) { return `<path d="M${x},${y} q${r},-${r * 2.4} ${r * 2},-${r * 2.6} M${x + r * 1.6},${y + 2} q${r * .2},-${r * 2.2} ${r * .4},-${r * 2.8}" stroke="#4a6a2a" stroke-width="1.6" fill="none"/><circle cx="${x}" cy="${y}" r="${r}" fill="url(#chG)"/><circle cx="${x + r * 1.6}" cy="${y + 2}" r="${r}" fill="url(#chG)"/>`; }
function fruitCocoa(x, y, r) { return `<ellipse cx="${x}" cy="${y}" rx="${r * 1.5}" ry="${r}" fill="url(#coG)"/>` + [-.6, -.2, .2, .6].map(k => `<path d="M${x - r * 1.4},${y + k * r * .8} Q${x},${y + k * r * 1.2} ${x + r * 1.4},${y + k * r * .8}" stroke="#6a3a10" stroke-width="1.4" fill="none" opacity=".6"/>`).join(''); }
function crate(x, y, w, fruit, fill, label, price, seed) {
  let s = `<g><rect x="${x}" y="${y}" width="${w}" height="150" fill="#9a6a3a"/><rect x="${x}" y="${y}" width="${w}" height="150" fill="#000" filter="url(#woodTex)" opacity=".7"/>` +
    [0, 1, 2].map(k => `<rect x="${x}" y="${y + k * 52}" width="${w}" height="4" fill="#5a3a1a"/>`).join('') + `<rect x="${x}" y="${y}" width="${w}" height="150" fill="none" stroke="#5a3a1a" stroke-width="4"/>`;
  const r = R(seed), n = Math.round(22 * fill);
  for (let i = 0; i < n; i++) { const fx = x + 20 + (i % 6) * (w - 40) / 5 + (r() - .5) * 8, fy = y + 6 - Math.floor(i / 6) * 22 + (r() - .5) * 6; s += fruit(fx, fy, 15); }
  s += `<g transform="translate(${x + w / 2},${y + 110})"><rect x="-62" y="-26" width="124" height="52" rx="8" fill="#f4efe0"/><rect x="-62" y="-26" width="124" height="52" rx="8" fill="none" stroke="#3a2a1a" stroke-width="2"/>` +
    `<text x="0" y="-4" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="18" fill="#3a2a1a">${label}</text><text x="0" y="20" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="20" fill="${price > 1 ? '#c82a2a' : '#2a6a2a'}" direction="ltr">$${(2 * price).toFixed(0)}</text></g></g>`;
  return s;
}
function sceneMarket(t) {
  const st = S0(3), em = ease(ramp(t, st, S0(4) - .5)), pr = 1 + 9 * ease(ramp(t, WS(3, 3), S0(4) - .8));
  let s = `<defs><linearGradient id="mkB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a22"/><stop offset="1" stop-color="#1a120e"/></linearGradient>` +
    `<radialGradient id="apG" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#ff6a5a"/><stop offset=".6" stop-color="#c81e1e"/><stop offset="1" stop-color="#6a0a0a"/></radialGradient>` +
    `<radialGradient id="stG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ff5a5a"/><stop offset="1" stop-color="#a00a1a"/></radialGradient>` +
    `<radialGradient id="chG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#e83a5a"/><stop offset=".7" stop-color="#8a0a2a"/><stop offset="1" stop-color="#3a0010"/></radialGradient>` +
    `<radialGradient id="coG" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#e8a040"/><stop offset=".7" stop-color="#a85a18"/><stop offset="1" stop-color="#4a2408"/></radialGradient></defs>`;
  s += `<rect width="720" height="1280" fill="url(#mkB)"/>`;
  // awning + warm hanging bulbs
  s += Array.from({ length: 9 }, (_, i) => `<path d="M${i * 90 - 20},260 l90,0 l0,90 q-45,30 -90,0Z" fill="${i % 2 ? '#f4efe0' : '#2a7a5a'}"/>`).join('') + `<rect x="-20" y="250" width="760" height="14" fill="#1a3a2a"/>`;
  for (let i = 0; i < 4; i++) { const bx = 100 + i * 170; s += `<line x1="${bx}" y1="350" x2="${bx}" y2="420" stroke="#222" stroke-width="2"/><circle cx="${bx}" cy="430" r="14" fill="#ffe2a0"/><circle cx="${bx}" cy="430" r="120" fill="url(#lampG)" opacity=".6"/>`; }
  // two shelves of crates
  const fills = [clamp(1 - em * 1.1), clamp(1 - em * 1.25), clamp(1 - em * 1.4), clamp(1 - em * 1.2)];
  s += `<rect x="20" y="760" width="680" height="16" fill="#4a3020"/><rect x="20" y="1110" width="680" height="16" fill="#4a3020"/>`;
  s += crate(40, 600, 310, fruitApple, fills[0], 'تفاح', pr, 1) + crate(370, 600, 310, fruitStraw, fills[1], 'فراولة', pr * 1.2, 2);
  s += crate(40, 950, 310, fruitCherry, fills[2], 'كرز', pr * 1.4, 3) + crate(370, 950, 310, fruitCocoa, fills[3], 'كاكاو', pr * 1.1, 4);
  s += `<rect width="720" height="1280" fill="#ffb060" opacity=".06"/>`;
  F.ov = '';
  return s;
}
// 4: a cornfield in the wind: tassels shed pollen, the wind does the work
function cornPlant(x, y, h, t, seed, sc = 1) {
  const sw = Math.sin(t * 1.4 + seed) * 10 * sc, tx = x + sw, ty = y - h; let s = `<path d="M${x},${y} Q${x + sw * .3},${y - h * .5} ${tx},${ty}" stroke="#6a8a30" stroke-width="${8 * sc}" fill="none"/>`;
  for (let k = 0; k < 6; k++) { const u = .2 + k * .12, px = x + sw * u * u, py = y - h * u, dir = k % 2 ? 1 : -1, L = (110 - k * 8) * sc;
    s += `<path d="M${px},${py} Q${px + dir * L * .5},${py - L * .4} ${px + dir * L},${py + L * .15 + Math.sin(t * 2 + k + seed) * 6}" stroke="#7aa040" stroke-width="${10 * sc}" fill="none" stroke-linecap="round"/><path d="M${px},${py} Q${px + dir * L * .5},${py - L * .4} ${px + dir * L},${py + L * .15}" stroke="#a8c870" stroke-width="${2 * sc}" fill="none" opacity=".6"/>`; }
  s += `<g transform="translate(${x + sw * .25},${y - h * .45})"><ellipse rx="${14 * sc}" ry="${36 * sc}" fill="#c8d890" transform="rotate(14)"/><path d="M0,${-30 * sc} q${-6 * sc},${-18 * sc} ${-2 * sc},${-30 * sc}" stroke="#c8a060" stroke-width="${2 * sc}" fill="none"/></g>`;
  for (let k = 0; k < 7; k++) { const a = -Math.PI / 2 + (k - 3) * .22; s += `<path d="M${tx},${ty} q${Math.cos(a) * 20 * sc},${Math.sin(a) * 30 * sc} ${Math.cos(a) * 40 * sc + sw * .4},${Math.sin(a) * 40 * sc + 20 * sc}" stroke="#d8c070" stroke-width="${2.6 * sc}" fill="none"/>`; }
  return s;
}
function sceneCorn(t) {
  const st = S0(4), wind = ease(ramp(t, WS(4, 6) - .2, WS(4, 6) + .4));
  let s = `<defs><linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a8ac8"/><stop offset=".7" stop-color="#e8d8a0"/><stop offset="1" stop-color="#c8a858"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skC)"/>`;
  s += `<g opacity=".7" filter="url(#blur2)">` + Array.from({ length: 6 }, (_, i) => { const rr = R(i + 3); return `<ellipse cx="${pmod(rr() * 900 + t * 20, 900) - 90}" cy="${300 + rr() * 200}" rx="${100 + rr() * 80}" ry="${22 + rr() * 14}" fill="#fff"/>`; }).join('') + `</g>`;
  // distant rows
  s += `<path d="M-20,760 L740,740 L740,860 L-20,880Z" fill="#7a9a40"/>`;
  for (let i = 0; i < 30; i++) s += cornPlant(i * 26 - 10, 820, 120, t, i, .35);
  for (let i = 0; i < 16; i++) s += cornPlant(i * 48 - 20, 960, 260, t, i + 40, .65);
  s += `<rect y="940" width="720" height="340" fill="#6a5a30"/>`;
  s += cornPlant(140, 1300, 720, t, 90, 1.3) + cornPlant(560, 1320, 820, t, 91, 1.4);
  // wind lines and drifting pollen
  for (let i = 0; i < 9; i++) { const y = 380 + i * 70, x = pmod(t * 300 + i * 160, 1000) - 200; s += `<path d="M${x},${y} q60,-14 120,0 t120,0" stroke="#fff" stroke-width="3" fill="none" opacity="${.45 * wind}" stroke-linecap="round"/>`; }
  const rp = R(77); let pl = ''; for (let i = 0; i < 160; i++) { const x = pmod(rp() * 900 + t * (60 + 140 * wind) * (.5 + rp()), 900) - 90, y = 300 + rp() * 700 + Math.sin(t + i) * 10;
    pl += `<circle cx="${x}" cy="${y}" r="${1.4 + rp() * 1.8}" fill="#fff2a0" opacity="${.35 + .5 * rp()}"/>`; }
  s += `<g filter="url(#blur1)">${pl}</g>`;
  F.ov = '';
  return s;
}
// 5–6: a pond at dusk: swallows, a frog on a lily pad, a lizard; then the food chain collapses like dominoes
function frog(x, y, s, t, hungry) {
  const th = 1 + Math.sin(t * 5) * .06, sag = hungry * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><defs><radialGradient id="frG" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="${mix('#8ad050', '#9aa070', hungry)}"/><stop offset=".7" stop-color="${mix('#3a8a2a', '#5a6a3a', hungry)}"/><stop offset="1" stop-color="#1a3a10"/></radialGradient></defs>` +
    `<ellipse cx="0" cy="6" rx="70" ry="14" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M-60,0 C-70,-30 -50,-${58 - sag} -10,-${62 - sag} C30,-${66 - sag} 62,-40 58,-8 C56,4 -54,6 -60,0Z" fill="url(#frG)"/>` +
    `<ellipse cx="20" cy="${-12}" rx="${26 * th}" ry="${12 * th}" fill="#e8e0a0" opacity=".7"/>` +
    [[-30, -30], [-10, -46], [-40, -14], [10, -50]].map(([a, b]) => `<ellipse cx="${a}" cy="${b + sag}" rx="7" ry="5" fill="#2a5a1a" opacity=".7"/>`).join('') +
    [-1, 1].map(sd => `<circle cx="${18 + sd * 18}" cy="${-62 + sag}" r="15" fill="url(#frG)"/><circle cx="${18 + sd * 18}" cy="${-64 + sag}" r="10" fill="#d8b030"/><ellipse cx="${19 + sd * 18}" cy="${-64 + sag}" rx="7" ry="4" fill="#111"/><circle cx="${15 + sd * 18}" cy="${-67 + sag}" r="2.4" fill="#fff"/>`).join('') +
    `<path d="M-50,-2 q-30,10 -36,4 q10,-8 26,-10 M40,-2 q24,8 34,2" stroke="#3a7a2a" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M30,-30 q14,${6 + sag} 26,0" stroke="#1a3a10" stroke-width="2" fill="none"/></g>`;
}
function lizard(x, y, s, t) {
  const tw = Math.sin(t * 2) * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-120,${4 + tw} C-80,10 -60,0 -40,-2 L40,-8 C60,-10 76,-4 80,0 C76,6 60,8 40,6 L-40,8 C-60,10 -90,14 -120,${4 + tw}Z" fill="#8a7a4a"/>` +
    Array.from({ length: 10 }, (_, i) => `<circle cx="${-30 + i * 7}" cy="${-1}" r="2" fill="#5a4a2a"/>`).join('') + `<circle cx="66" cy="-3" r="2.4" fill="#111"/>` +
    [[-20, 6, -34, 20], [-20, -2, -34, -16], [30, 4, 40, 18], [30, -6, 42, -18]].map(([a, b, c, d]) => `<path d="M${a},${b} L${c},${d}" stroke="#7a6a3a" stroke-width="5" stroke-linecap="round"/>`).join('') + `</g>`;
}
function swallow(x, y, s, t, seed) {
  const f = Math.sin(t * 10 + seed) * .5;
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M0,0 C-20,${-20 - 20 * f} -50,${-24 - 26 * f} -70,${-10 - 30 * f} C-44,-6 -20,-2 0,4Z M0,0 C20,${-20 - 20 * f} 50,${-24 - 26 * f} 70,${-10 - 30 * f} C44,-6 20,-2 0,4Z" fill="#1a2030"/><ellipse cx="0" cy="4" rx="8" ry="14" fill="#1a2030"/><path d="M-4,16 l-8,20 M4,16 l8,20" stroke="#1a2030" stroke-width="3"/><ellipse cx="0" cy="-6" rx="5" ry="4" fill="#c84a2a"/></g>`;
}
function scenePond(t) {
  const st = S0(5) - .2, hungry = ease(ramp(t, S0(6), S0(6) + 2)), dk = ease(ramp(t, S0(6), S0(7) - .5));
  let s = `<defs><linearGradient id="skPd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#3a4a7a', '#1a2040', dk)}"/><stop offset=".55" stop-color="${mix('#e8906a', '#7a4a5a', dk)}"/><stop offset="1" stop-color="${mix('#f8c890', '#9a6a6a', dk)}"/></linearGradient>` +
    `<linearGradient id="wPd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#e8a07a', '#6a4a5a', dk)}"/><stop offset="1" stop-color="#1a2a3a"/></linearGradient>` +
    `<radialGradient id="lpG" cx=".4" cy=".4" r=".8"><stop offset="0" stop-color="#6aa848"/><stop offset="1" stop-color="#2a5a20"/></radialGradient></defs>` +
    `<rect width="720" height="720" fill="url(#skPd)"/>`;
  s += `<path d="M-20,700 C120,660 260,690 400,670 C520,650 640,690 740,670 L740,720 L-20,720Z" fill="#2a3420"/>` + Array.from({ length: 30 }, (_, i) => `<path d="M${i * 25},700 l-8,0 l8,-${40 + (i * 37) % 50} l8,${40 + (i * 37) % 50}Z" fill="#1e2818"/>`).join('');
  s += `<rect y="710" width="720" height="570" fill="url(#wPd)"/>`;
  for (let i = 0; i < 12; i++) s += `<path d="M-20,${740 + i * 40} ${Array.from({ length: 13 }, (_, k) => `q30,${-3 + Math.sin(t * 2 + i + k) * 2} 60,0`).join(' ')}" stroke="#fff" stroke-width="1.6" fill="none" opacity="${.12 + i * .01}"/>`;
  // reeds
  for (let i = 0; i < 18; i++) { const rx = i < 9 ? 10 + i * 16 : 560 + (i - 9) * 18, h = 200 + (i * 53) % 160, sw = Math.sin(t * 1.2 + i) * 6; s += `<path d="M${rx},1000 q${sw},-${h / 2} ${sw * 2},-${h}" stroke="#3a4a24" stroke-width="5" fill="none"/>` + (i % 3 === 0 ? `<ellipse cx="${rx + sw * 2}" cy="${1000 - h + 20}" rx="7" ry="26" fill="#5a3a20"/>` : ''); }
  // lily pads + lily flower
  [[200, 1020, 120], [470, 1080, 150], [600, 960, 80], [330, 1180, 100]].forEach(([x, y, r], i) => { s += `<path d="M${x},${y} m${r},0 a${r},${r * .32} 0 1 1 -${r * .25},-${r * .3} L${x},${y}Z" fill="url(#lpG)"/><path d="M${x},${y} l${r * .9},${-r * .1}" stroke="#2a4a1a" stroke-width="2" opacity=".5"/>`; });
  s += `<g transform="translate(600,950)">` + Array.from({ length: 8 }, (_, i) => `<ellipse cx="0" cy="-16" rx="8" ry="20" fill="#f8c8d8" transform="rotate(${i * 45 - 180}) scale(1,.6)"/>`).join('') + `<circle r="6" fill="#f0d050"/></g>`;
  s += frog(470, 1070, 1.3, t, hungry) + `<g transform="translate(40,860)"><path d="M0,40 C40,0 140,-10 200,20 C220,40 200,70 0,70Z" fill="#5a5048"/></g>` + lizard(140, 870, .9, t);
  // swallows hunting, then fewer and slower
  for (let i = 0; i < 4; i++) { const sx = pmod(t * (180 - 100 * hungry) + i * 230, 1000) - 140, sy = 420 + i * 50 + Math.sin(t * 2 + i) * 40; s += `<g opacity="${1 - hungry * (i % 2 ? 1 : .5)}">${swallow(sx, sy, .8, t, i)}</g>`; }
  // food chain: insect -> frog -> bird -> hawk; collapses like dominoes
  const fc = ease(ramp(t, S0(6) - .3, S0(6) + .2)), col = W(6, 2)[1];
  if (fc > 0) { const icons = ['🐞', '🐸', '🐦', '🦅'], lab = ['حشرات', 'ضفادع', 'طيور', 'صقور'];
    let o = `<g opacity="${fc}">`;
    lab.forEach((l, i) => { const x = 110 + i * 166, y = 900, fall = ease(ramp(t, col + i * .35, col + i * .35 + .6)), ang = fall * 75, dy = fall * 40;
      if (i < 3) o += `<line x1="${x + 58}" y1="${y}" x2="${x + 108}" y2="${y}" stroke="#fff" stroke-width="4" marker-end="url(#arrW)" opacity="${1 - fall}"/>`;
      o += `<g transform="translate(${x},${y + dy}) rotate(${ang})"><rect x="-56" y="-70" width="112" height="140" rx="16" fill="rgba(8,12,30,.75)" stroke="#fff" stroke-opacity=".3" stroke-width="2"/>` +
        chainIcon(i) + `<text x="0" y="54" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff">${l}</text>` +
        (i === 0 ? `<line x1="-44" y1="-56" x2="44" y2="30" stroke="#e53935" stroke-width="7" opacity="${ease(ramp(t, S0(6) + .2, S0(6) + .6))}"/>` : '') + `</g>`; });
    s += o + `</g>`; }
  s += `<rect width="720" height="1280" fill="#0a1020" opacity="${.25 * dk}"/>`;
  F.ov = '';
  return s;
}
function chainIcon(i) {
  if (i === 0) return `<g transform="translate(0,-14) scale(.9)">${bee(0, 0, .9, 0, 0)}</g>`;
  if (i === 1) return `<g transform="translate(0,6) scale(.45)">${frog(0, 0, 1, 0, 0)}</g>`;
  if (i === 2) return `<g transform="translate(0,-14) scale(.6)">${swallow(0, 0, 1, 1.2, 0)}</g>`;
  return `<g transform="translate(0,-12)"><path d="M0,-6 C-30,-30 -50,-26 -60,-8 C-40,-12 -20,-6 0,6 C20,-6 40,-12 60,-8 C50,-26 30,-30 0,-6Z" fill="#6a4a2a"/><circle cx="0" cy="-10" r="9" fill="#f4efe6"/><path d="M6,-10 l8,4 l-8,2Z" fill="#e8b030"/><circle cx="2" cy="-12" r="1.6" fill="#111"/><path d="M-8,6 L0,24 L8,6Z" fill="#6a4a2a"/></g>`;
}
// 7–8: forest floor macro: ants, beetles and a dung beetle recycle; then leaves pile up and the soil goes grey
function deadLeaf(x, y, s, rot, c1, c2, seed) {
  return `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})"><path d="M-40,0 C-30,-22 20,-24 44,0 C20,24 -30,22 -40,0Z" fill="${c1}"/><path d="M-40,0 L44,0" stroke="${c2}" stroke-width="2"/>` +
    [-20, -4, 12, 26].map(k => `<path d="M${k},0 l10,-12 M${k},0 l10,12" stroke="${c2}" stroke-width="1.2"/>`).join('') + `<path d="M-40,0 C-30,-22 20,-24 44,0 C20,24 -30,22 -40,0Z" fill="#000" filter="url(#leafTex)" opacity=".35"/></g>`;
}
function ant(x, y, s, t, ang, carry, ph = 0) {
  const lg = Math.sin(t * 14 + ph) * 8;
  let o = `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})"><defs><radialGradient id="anG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#8a3a20"/><stop offset=".6" stop-color="#4a1a0a"/><stop offset="1" stop-color="#1a0604"/></radialGradient></defs>`;
  [-14, 0, 14].forEach((k, i) => { const d = (i % 2 ? lg : -lg); o += `<path d="M${k},2 q${-6 + d},12 ${-14 + d},22 M${k},-2 q${-6 - d},-12 ${-14 - d},-22" stroke="#2a0e06" stroke-width="2.4" fill="none"/>`; });
  o += `<ellipse cx="-30" cy="0" rx="18" ry="12" fill="url(#anG)"/><ellipse cx="-2" cy="0" rx="14" ry="7" fill="url(#anG)"/><circle cx="20" cy="0" r="10" fill="url(#anG)"/>` +
    `<path d="M26,-6 q10,-14 20,-12 M26,6 q10,14 20,12" stroke="#2a0e06" stroke-width="1.8" fill="none"/><path d="M28,-3 l8,-2 M28,3 l8,2" stroke="#1a0604" stroke-width="2.4"/>` +
    `<ellipse cx="-34" cy="-4" rx="6" ry="3" fill="#fff" opacity=".25"/><ellipse cx="18" cy="-4" rx="3.6" ry="2" fill="#fff" opacity=".3"/>`;
  if (carry) o += `<g transform="translate(36,-10) rotate(-20)">${deadLeaf(0, 0, .45, 0, '#c88a3a', '#7a4a1a', 1)}</g>`;
  return o + `</g>`;
}
function beetle(x, y, s, t, ang) {
  return `<g transform="translate(${x},${y}) rotate(${ang}) scale(${s})"><defs><radialGradient id="btG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#4ab08a"/><stop offset=".5" stop-color="#1a5a4a"/><stop offset="1" stop-color="#05140e"/></radialGradient></defs>` +
    [-10, 4, 18].map((k, i) => `<path d="M${k},10 l${-8 + Math.sin(t * 12 + i) * 4},18 M${k},-10 l${-8 - Math.sin(t * 12 + i) * 4},-18" stroke="#0a1a12" stroke-width="3"/>`).join('') +
    `<ellipse cx="0" cy="0" rx="34" ry="22" fill="url(#btG)"/><line x1="-34" y1="0" x2="20" y2="0" stroke="#05140e" stroke-width="2"/><ellipse cx="30" cy="0" rx="12" ry="11" fill="#0e2a20"/><ellipse cx="-8" cy="-10" rx="14" ry="5" fill="#fff" opacity=".3"/>` +
    `<path d="M40,-4 q10,-10 16,-8 M40,4 q10,10 16,8" stroke="#05140e" stroke-width="1.6" fill="none"/></g>`;
}
function sceneFloor(t) {
  const st = S0(7) - .2, gone = ease(ramp(t, S0(8) - .2, S0(8) + .8)), pile = ease(ramp(t, S0(8), S0(9) - .4)), grey = ease(ramp(t, WS(8, 4), S0(9) - .4));
  let s = `<defs><linearGradient id="flB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a1a"/><stop offset="1" stop-color="#1a1a0e"/></linearGradient>` +
    `<linearGradient id="logG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5a3a"/><stop offset=".5" stop-color="#4a3420"/><stop offset="1" stop-color="#1a1008"/></linearGradient>` +
    `<linearGradient id="soilG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#2a1a0c', '#7a7064', grey)}"/><stop offset=".4" stop-color="${mix('#4a2e16', '#8a8274', grey)}"/><stop offset="1" stop-color="${mix('#6a4424', '#a09888', grey)}"/></linearGradient></defs>` +
    `<rect width="720" height="1280" fill="url(#flB)"/>` + bokeh(t, ['#c8e070', '#fff2b0', '#8ac050'], 22, 31, .8);
  // mossy log across the scene
  s += `<path d="M-20,520 C200,480 520,500 740,470 L740,690 C520,720 200,700 -20,740Z" fill="url(#logG)"/><path d="M-20,520 C200,480 520,500 740,470 L740,690 C520,720 200,700 -20,740Z" fill="#000" filter="url(#woodTex)" opacity=".8"/>`;
  for (let i = 0; i < 40; i++) { const rm = R(i + 7), mx = rm() * 740, my = 480 + rm() * 40; s += `<ellipse cx="${mx}" cy="${my + (mx / 740) * -30}" rx="${10 + rm() * 22}" ry="${6 + rm() * 8}" fill="${rm() > .5 ? '#5a8a2a' : '#3a6a1e'}" opacity=".85"/>`; }
  // mushrooms
  [[560, 500, 1.1], [610, 520, .8], [120, 540, .9]].forEach(([x, y, sc], i) => { s += `<g transform="translate(${x},${y}) scale(${sc})"><rect x="-8" y="-50" width="16" height="50" rx="6" fill="#efe6d4"/><path d="M-44,-46 C-44,-86 44,-86 44,-46 Q0,-36 -44,-46Z" fill="#c83a1e"/>` +
    [[-20, -62], [4, -72], [22, -56], [-4, -54]].map(([a, b]) => `<ellipse cx="${a}" cy="${b}" rx="5" ry="3.6" fill="#f4efe6"/>`).join('') + `<path d="M-30,-60 C-20,-76 10,-80 26,-70" stroke="#fff" stroke-width="3" opacity=".3" fill="none"/></g>`; });
  // ground leaf litter (grows when insects are gone)
  s += `<path d="M-20,760 C200,740 500,760 740,740 L740,1060 L-20,1060Z" fill="#2a2010"/>`;
  const nL = 60 + Math.round(240 * pile), rl = R(44); let lv = '';
  for (let i = 0; i < nL; i++) { const lx = rl() * 760 - 20, ly = 760 + rl() * (300 - 150 * pile) - pile * 110 * rl(), c = [['#a85a20', '#5a2a0a'], ['#c8902a', '#6a4010'], ['#7a4a1a', '#3a1a08'], ['#9a7a3a', '#4a3a14']][Math.floor(rl() * 4)];
    lv += deadLeaf(lx, ly, .6 + rl() * .8, rl() * 360, c[0], c[1], i); }
  s += lv;
  // soil cross-section that loses its richness
  s += `<rect y="1060" width="720" height="220" fill="url(#soilG)"/><rect y="1060" width="720" height="220" fill="#fff" filter="url(#soilT)" opacity="${.5 - .3 * grey}"/>` +
       `<path d="M-20,1060 ${Array.from({ length: 12 }, () => 'q30,-8 60,0').join(' ')}" stroke="#1a1008" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 12; i++) { const rr = R(i + 600); s += `<path d="M${rr() * 720},${1100 + rr() * 160} l${(rr() - .5) * 60},${20 + rr() * 30}" stroke="#3a2a1a" stroke-width="2" opacity="${.6 * grey}"/>`; }
  // the recyclers (fade away in the second half)
  const ia = 1 - gone; let bugs = '';
  for (let i = 0; i < 7; i++) { const u = pmod((t - st) * .07 + i / 7, 1), x = lerp(-40, 760, u), y = 520 - u * 30 + Math.sin(u * 20) * 3; bugs += ant(x, y - 10, .9, t, -2, i % 2 === 0, i); }
  bugs += beetle(lerp(500, 380, ramp(t, st, st + 7)), 860, 1.2, t, 190) + ant(220, 900, 1.1, t, 30, true, 2) + ant(300, 940, 1.0, t, -40, false, 5);
  const dbx = lerp(560, 640, ramp(t, st, st + 7)), roll = (t - st) * 90;
  bugs += `<g transform="translate(${dbx},960)"><circle cx="22" cy="-26" r="30" fill="#6a4a2a"/><circle cx="22" cy="-26" r="30" fill="#000" filter="url(#soilT)" opacity=".6"/><path d="M${22 + Math.cos(roll / 57) * 20},${-26 + Math.sin(roll / 57) * 20} l6,4" stroke="#3a2412" stroke-width="3"/>` + beetle(-26, -8, .8, t, -30) + `</g>`;
  s += `<g opacity="${ia}">${bugs}</g>`;
  s += `<rect width="720" height="1280" fill="#ffe8a0" opacity=".05"/>`;
  F.ov = '';
  return s;
}
// 9: an ant carrying the Earth
function sceneAnt(t) {
  const st = S0(9) - .2, k = ease(ramp(t, st, st + 1));
  let s = `<defs><radialGradient id="aBg" cx=".5" cy=".45" r=".8"><stop offset="0" stop-color="#3a5a2a"/><stop offset="1" stop-color="#0a1408"/></radialGradient></defs><rect width="720" height="1280" fill="url(#aBg)"/>` + bokeh(t, ['#d8f080', '#fff2b0', '#a8d060', '#ffd070'], 34, 51, 1.2);
  // big leaf the ant walks on
  s += `<path d="M-40,1060 C120,900 520,860 780,960 C560,1100 160,1160 -40,1060Z" fill="#4a8a2a"/><path d="M-40,1060 C120,900 520,860 780,960" stroke="#8ac050" stroke-width="5" fill="none"/>` +
       Array.from({ length: 9 }, (_, i) => `<path d="M${60 + i * 80},${1010 - i * 8} l40,${50 - i * 2}" stroke="#7ab040" stroke-width="2.4" opacity=".7"/>`).join('') + `<path d="M-40,1060 C120,900 520,860 780,960 C560,1100 160,1160 -40,1060Z" fill="#000" filter="url(#leafTex)" opacity=".3"/>`;
  const ax = 330 + (t - st) * 6;
  s += ant(ax, 920, 3.2, t * .5, -6, false, 0);
  F.earth = { x: ax + 60, y: 800, r: 72 * k, a: k, sunI: 1, lights: .3, rot: .6, tilt: .41 }; F.light = [-600, 400]; F.moon = null;
  F.ov = `<path d="M${ax + 76},${886} q10,-${40} -6,-${16}" stroke="#2a0e06" stroke-width="6" fill="none" opacity="${k}"/>`;
  return s;
}
// 10: CTA on a honeycomb
function sceneCTA(t) {
  const st = S0(10), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = `<defs><linearGradient id="hcB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2408"/><stop offset="1" stop-color="#140a02"/></linearGradient><radialGradient id="hcC" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#ffd24a"/><stop offset="1" stop-color="#b8700a"/></radialGradient></defs><rect width="720" height="1280" fill="url(#hcB)"/>`;
  const hx = (cx, cy, r) => Array.from({ length: 6 }, (_, i) => `${cx + r * Math.cos(i * Math.PI / 3 + Math.PI / 6)},${cy + r * Math.sin(i * Math.PI / 3 + Math.PI / 6)}`).join(' ');
  for (let row = -1; row < 16; row++) for (let col = -1; col < 9; col++) { const r = 52, cx = col * r * 1.732 + (row % 2) * r * .866, cy = row * r * 1.5, rr = R(row * 20 + col + 99), lit = rr() > .55;
    s += `<polygon points="${hx(cx, cy, r - 3)}" fill="${lit ? 'url(#hcC)' : '#5a3a10'}" opacity="${lit ? .55 : .45}" stroke="#2a1804" stroke-width="5"/>`; }
  s += `<rect width="720" height="1280" fill="#000" opacity=".35"/>`;
  s += `<g opacity="${k}"><polygon points="${hx(360, 700, 190)}" fill="url(#hcC)" stroke="#fff2c0" stroke-width="6"/><text x="360" y="790" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="240" fill="#3a2408">؟</text></g>`;
  s += bee(360 + Math.cos(t * 1.5) * 230, 700 + Math.sin(t * 1.5) * 140, 1.3, t, Math.cos(t * 1.5) > 0 ? 160 : 20, k);
  F.ov = `<g opacity="${ramp(t, WS(10, 4), WS(10, 4) + .4)}" transform="translate(360,${1020 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null;
  return s;
}
const SCENES = [
  { s: 0, f: sceneMeadow }, { s: S0(1) - .2, f: scenePicnic }, { s: S0(2) - .2, f: sceneOrchard }, { s: S0(3) - .2, f: sceneMarket }, { s: S0(4) - .2, f: sceneCorn },
  { s: S0(5) - .2, f: scenePond }, { s: S0(7) - .2, f: sceneFloor }, { s: S0(9) - .2, f: sceneAnt }, { s: S0(10) - .2, f: sceneCTA },
];
const XF = .5;

// ---------- UI ----------
const CHIPS = [
  ['c1', '٣/٤ أنواع المحاصيل', 360, 300, 'big', WS(2, 3), WS(2, 11)], ['c2', 'الملقّحات = حشرات', 360, 300, '', WS(2, 11), S0(3)],
  ['c3', 'السعر ↑', 360, 480, 'red', WS(3, 3), S0(4)],
  ['c4', 'الرياح تلقّحها', 360, 300, 'big', WS(4, 6), S0(5)],
  ['c5', 'طيور', 160, 330, 'dark', WS(5, 4), S0(6)], ['c6', 'ضفادع', 360, 330, 'dark', WS(5, 5), S0(6)], ['c7', 'سحالي', 560, 330, 'dark', WS(5, 6), S0(6)],
  ['c8', 'سلسلة غذائية', 360, 760, 'big', WS(6, 3), S0(7)],
  ['c9', 'تحلّل وإعادة تدوير', 360, 330, '', WS(7, 5), S0(8)], ['c10', 'تربة بلا خصوبة', 360, 1010, 'red', WS(8, 5), S0(9)],
  ['c11', '@MadhaLawLab', 360, 1140, 'dark', WS(10, 6), 999],
];
$('ui').innerHTML = CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}

