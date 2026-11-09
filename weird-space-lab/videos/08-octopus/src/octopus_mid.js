// ===================== Weird Space Lab: Octopuses have three hearts and blue blood =====================
function sea(t, deep = 0, id = 'o') {
  const top = mix('#1a6a9a', '#06142a', deep), bot = mix('#0a2a4a', '#02060e', deep);
  let s = `<defs><linearGradient id="sea${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sea${id})"/>`;
  // light shafts from the surface
  for (let i = 0; i < 6; i++) { const x = 60 + i * 120 + Math.sin(t * .4 + i) * 30; s += `<path d="M${x - 30},0 L${x + 30},0 L${x + 160},1100 L${x + 40},1100Z" fill="#bfe8ff" opacity="${(.06 + .03 * Math.sin(t + i)) * (1 - deep)}"/>`; }
  // drifting particles
  const r = RS(13); for (let i = 0; i < 60; i++) { const x = (r() * 720 + t * 6 * (r() - .5)) % 720, y = (r() * 1280 - t * 10 * r() + 1280) % 1280; s += `<circle cx="${x}" cy="${y}" r="${.8 + r() * 1.8}" fill="#dff4ff" opacity="${.15 + .25 * r()}"/>`; }
  // sea floor
  s += `<path d="M-20,1110 Q160,1070 360,1100 T740,1090 L740,1300 L-20,1300Z" fill="${mix('#6a5a3a', '#1a1a1e', deep)}"/><path d="M-20,1110 Q160,1070 360,1100 T740,1090 L740,1300 L-20,1300Z" fill="#000" filter="url(#grainR)" opacity=".35"/>`;
  [[90, 1105, 60], [560, 1095, 80], [660, 1112, 40]].forEach(([x, y, w]) => { s += `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * .45}" fill="${mix('#5a5a52', '#141418', deep)}"/><ellipse cx="${x - w * .3}" cy="${y - w * .15}" rx="${w * .4}" ry="${w * .16}" fill="#fff" opacity=".08"/>`; });
  return s;
}
// an octopus: mantle, eyes with horizontal pupils, eight tapering arms with suckers
function octopus(x, y, s, t, o = {}) {
  const col = o.col || '#c8603a', dk = mix(col, '#000000', .35), lt = mix(col, '#ffffff', .25), swim = o.swim || 0, alpha = o.alpha ?? 1;
  let arms = '';
  for (let i = 0; i < 8; i++) {
    const base = -1 + i * (2 / 7), ang = Math.PI / 2 + base * (1.25 - swim * .9), L = 230 * (1 + .1 * Math.sin(i * 1.7));
    let pts = []; for (let k = 0; k <= 16; k++) { const q = k / 16, a = ang + Math.sin(t * 2.2 + i * .9 + q * 4) * .45 * q * (1 - swim * .6) + base * q * .6 * (1 - swim);
      const px = x + Math.cos(a) * L * q * s * 1 + base * 30 * s, py = y + 40 * s + Math.sin(a) * L * q * s; pts.push([px, py, (1 - q * .92) * 26 * s]); }
    for (let k = 0; k < pts.length - 1; k++) { const [x1, y1, w] = pts[k], [x2, y2] = pts[k + 1]; arms += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="${i % 2 ? col : dk}" stroke-width="${w.toFixed(1)}" stroke-linecap="round"/>`; }
    for (let k = 2; k < pts.length - 2; k += 2) { const [px, py, w] = pts[k]; arms += `<circle cx="${px + w * .2}" cy="${py + w * .2}" r="${w * .22}" fill="#f4d4c0" opacity=".8"/>`; }
  }
  const mant = `<ellipse cx="${x - 10 * s}" cy="${y - 120 * s}" rx="${95 * s}" ry="${130 * s}" fill="${col}" transform="rotate(${-12 + swim * 12},${x},${y})"/>` +
    `<ellipse cx="${x - 40 * s}" cy="${y - 170 * s}" rx="${30 * s}" ry="${50 * s}" fill="${lt}" opacity=".45" transform="rotate(-20,${x},${y})"/>` +
    Array.from({ length: 14 }, (_, i) => { const r = RS(i + 3); return `<circle cx="${x + (r() - .6) * 140 * s}" cy="${y - (40 + r() * 200) * s}" r="${(3 + r() * 5) * s}" fill="${dk}" opacity=".5"/>`; }).join('');
  const eye = (ex) => `<ellipse cx="${ex}" cy="${y - 10 * s}" rx="${22 * s}" ry="${18 * s}" fill="${lt}"/><ellipse cx="${ex}" cy="${y - 10 * s}" rx="${15 * s}" ry="${13 * s}" fill="#e8d47a"/><rect x="${ex - 12 * s}" y="${y - 13 * s}" width="${24 * s}" height="${6 * s}" rx="${3 * s}" fill="#111"/>`;
  return `<g opacity="${alpha}">${arms}<ellipse cx="${x}" cy="${y + 10 * s}" rx="${80 * s}" ry="${50 * s}" fill="${col}"/>${mant}${eye(x - 40 * s)}${eye(x + 40 * s)}</g>`;
}
const heartIcon = (x, y, sz, col, beat = 0) => { const k = 1 + .12 * beat; return `<path transform="translate(${x},${y}) scale(${sz * k / 40})" d="M0,14 C-4,6 -22,2 -22,-10 C-22,-22 -6,-24 0,-12 C6,-24 22,-22 22,-10 C22,2 4,6 0,14Z" fill="${col}"/>`; };
const beat = (t, rate = 1.3) => Math.max(0, Math.sin(t * rate * Math.PI * 2)) ** 4;
// 0: an octopus on the reef; three hearts and a drop of blue blood appear
function sceneHook(t) {
  let s = sea(t, 0, 'h') + octopus(360, 860 + Math.sin(t * 1.2) * 8, 1, t);
  const h = [WS(0, 2), WS(0, 2) + .25, WS(0, 2) + .5].map(ts => ease(ramp(t, ts - .1, ts + .25))), d = ease(ramp(t, WS(0, 5) - .1, WS(0, 5) + .3));
  F.ov = [150, 270, 390].map((x, i) => `<g opacity="${h[i]}">` + heartIcon(x, 520, 50 * h[i] + 1, '#e04a5a', beat(t + i * .3)) + `</g>`).join('') +
    `<g opacity="${d}"><path d="M550,440 C530,480 510,500 510,530 A40,40 0 0 0 590,530 C590,500 570,480 550,440Z" fill="#3a7ae0"/><ellipse cx="536" cy="526" rx="8" ry="14" fill="#fff" opacity=".45"/></g>`;
  return s;
}
// 1: two gill hearts and one body heart, with the blood flow
function sceneHearts(t) {
  const k = ease(ramp(t, S0(1) - .1, WS(1, 6))), b = ease(ramp(t, WS(1, 11) - .2, WS(1, 13)));
  let s = sea(t, .3, 'a') + octopus(360, 900, 1.05, t, { alpha: .35 });
  const gx = [250, 470], gy = 700, by = 740;
  s += gx.map(x => `<g opacity="${k}">` + Array.from({ length: 6 }, (_, i) => `<path d="M${x},${gy - 40 + i * 14} q${x < 360 ? -40 : 40},-6 ${x < 360 ? -60 : 60},4" stroke="#f08a9a" stroke-width="5" fill="none"/>`).join('') + heartIcon(x + (x < 360 ? 30 : -30), gy + 50, 44, '#e04a5a', beat(t)) + `</g>`).join('');
  s += `<g opacity="${b}">` + heartIcon(360, by + 40, 64, '#c62838', beat(t + .4)) + `</g>`;
  // flow arrows
  let f = ''; if (k > 0) gx.forEach(x => { const d = x < 360 ? -1 : 1; f += `<path d="M${x + d * 10},${gy + 60} Q${x + d * 40},${gy} ${x + d * 70},${gy - 30}" stroke="#7ab4ff" stroke-width="4" fill="none" marker-end="url(#arrW)" opacity="${k}"/>`; });
  if (b > 0) [-1, 1].forEach(d => { f += `<path d="M360,${by + 70} Q${360 + d * 120},${by + 160} ${360 + d * 200},${by + 280}" stroke="#e04a5a" stroke-width="5" fill="none" marker-end="url(#arrY)" opacity="${b}"/>`; });
  F.ov = f + `<g opacity="${k}">` + EN('GILL HEARTS ×2', 360, 600, 24, '#fff', 'middle', 700, 'letter-spacing="1.5"') + `</g><g opacity="${b}">` + EN('BODY HEART', 360, 860, 24, '#fff', 'middle', 700, 'letter-spacing="1.5"') + `</g>`;
  return s;
}
// 2: the body heart stops while swimming – the octopus prefers to crawl
function sceneSwim(t) {
  const st = S0(2) - .2, sw = ramp(t, WS(2, 8) - .3, WS(2, 13)) * (1 - ramp(t, WS(2, 14) - .3, WS(2, 14) + .4)), crawl = ramp(t, WS(2, 14) - .3, WS(2, 14) + .4);
  const T = t - st, oy = 900 - sw * 260 + crawl * 50, ox = 300 + T * 12;
  let s = sea(t, .15, 's') + octopus(ox, oy, .9, t, { swim: sw });
  // ECG panel
  let d = ''; for (let x = 0; x <= 260; x += 3) { const tt = t - (260 - x) / 120, on = sw < .5 ? 1 : 0, ph = (tt * 1.3) % 1, spike = on * (ph < .06 ? Math.sin(ph / .06 * Math.PI) * 40 : 0); d += `${x ? 'L' : 'M'}${420 + x},${520 - spike}`; }
  F.ov = `<rect x="400" y="440" width="300" height="140" rx="16" fill="rgba(8,12,30,.7)" stroke="rgba(255,255,255,.2)"/><path d="${d}" stroke="${sw > .5 ? '#e53935' : '#4ade80'}" stroke-width="3" fill="none"/>` + EN('BODY HEART', 550, 572, 18, 'rgba(255,255,255,.7)', 'middle', 700, 'letter-spacing="1.5"') +
    `<g opacity="${sw}">` + EN('STOPPED', 550, 476, 22, '#e53935', 'middle', 800) + `</g>`;
  return s;
}
// 3: blue blood with copper vs red blood with iron
function sceneBlood(t) {
  const k = ease(ramp(t, S0(3), WS(3, 4))), m = ease(ramp(t, WS(3, 8), WS(3, 13)));
  let s = sea(t, .5, 'b') + wPanel(40, 470, 640, 640, '');
  const drop = (x, col) => `<path d="M${x},560 C${x - 30},620 ${x - 70},660 ${x - 70},720 A70,70 0 0 0 ${x + 70},720 C${x + 70},660 ${x + 30},620 ${x},560Z" fill="${col}"/><ellipse cx="${x - 26}" cy="710" rx="12" ry="24" fill="#fff" opacity=".4"/>`;
  const tile = (x, sym, name, num, col) => `<rect x="${x - 60}" y="850" width="120" height="130" rx="10" fill="${col}"/>` + EN(num, x - 44, 874, 18, '#fff', 'start', 500) + EN(sym, x, 940, 56, '#fff', 'middle', 800) + EN(name, x, 970, 18, '#fff', 'middle', 500);
  s += `<g opacity="${k}">` + drop(220, '#3a7ae0') + EN('OCTOPUS', 220, 830, 22, '#fff', 'middle', 700, 'letter-spacing="1.5"') + `</g>` + `<g opacity="${m}">` + drop(500, '#c62828') + EN('HUMAN', 500, 830, 22, '#fff', 'middle', 700, 'letter-spacing="1.5"') + `</g>`;
  s += `<g opacity="${k}">` + tile(220, 'Cu', 'copper', '29', '#b8733a') + `</g><g opacity="${m}">` + tile(500, 'Fe', 'iron', '26', '#7a7a86') + `</g>`;
  s += `<g opacity="${k}">` + EN('hemocyanin', 220, 1040, 22, 'rgba(255,255,255,.8)', 'middle', 500) + `</g><g opacity="${m}">` + EN('hemoglobin', 500, 1040, 22, 'rgba(255,255,255,.8)', 'middle', 500) + `</g>`;
  F.ov = ''; return s;
}
// 4: copper works better in cold, low-oxygen water deep down
function sceneDeep(t) {
  const st = S0(4) - .2, d = ease(ramp(t, st, WS(4, 12))), dep = Math.round(lerp(50, 1000, d)), tmp = lerp(18, 4, d).toFixed(0);
  let s = sea(t, .3 + .6 * d, 'd') + octopus(330, 880 + Math.sin(t) * 6, .85, t, { col: mix('#c8603a', '#8a3a3a', d) });
  F.ov = `<g transform="translate(600,520)"><rect x="-70" y="-50" width="140" height="300" rx="16" fill="rgba(8,12,30,.7)" stroke="rgba(255,255,255,.2)"/>` + EN(`${dep} m`, 0, 0, 30, '#fff', 'middle', 800) + EN('depth', 0, 26, 16, 'rgba(255,255,255,.6)', 'middle', 500) +
    EN(`${tmp} °C`, 0, 100, 30, '#7ab4ff', 'middle', 800) + EN('water', 0, 126, 16, 'rgba(255,255,255,.6)', 'middle', 500) + EN('LOW O₂', 0, 200, 24, '#f4c76b', 'middle', 800) + `</g>`;
  return s;
}
// 5: two thirds of the brain cells are in the arms – each arm touches, tastes and reacts
function sceneArms(t) {
  const k = ease(ramp(t, WS(5, 1) - .2, WS(5, 11))), a = ease(ramp(t, WS(5, 12), WS(5, 18)));
  let s = sea(t, .2, 'n') + octopus(360, 820, 1.05, t, { col: mix('#c8603a', '#6a3a5a', k * .4) });
  let dots = ''; const r = RS(77); for (let i = 0; i < 160; i++) { const arm = i % 8, base = -1 + arm * (2 / 7), q = .15 + r() * .8, ang = Math.PI / 2 + base * 1.25 + Math.sin(t * 2.2 + arm * .9 + q * 4) * .45 * q + base * q * .6, L = 230 * (1 + .1 * Math.sin(arm * 1.7)) * 1.05;
    dots += `<circle cx="${360 + Math.cos(ang) * L * q + base * 30 * 1.05}" cy="${820 + 42 + Math.sin(ang) * L * q}" r="2.6" fill="#f4e26a" opacity="${k * (.5 + .5 * Math.sin(t * 6 + i))}"/>`; }
  for (let i = 0; i < 50; i++) dots += `<circle cx="${360 + (r() - .5) * 120}" cy="${700 + (r() - .5) * 140}" r="2.6" fill="#f4e26a" opacity="${k * .8}"/>`;
  // a shell being touched by one arm
  dots += `<g opacity="${a}"><path d="M560,1080 q30,-60 60,0Z" fill="#f4e0c8"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M590,1080 L${566 + i * 12},${1038 + Math.abs(i - 2) * 8}" stroke="#c8a888" stroke-width="2"/>`).join('') + `</g>`;
  // 2/3 ring
  const cx = 600, cy = 520, R = 60, an = 2 / 3 * Math.PI * 2 * k;
  F.ov = dots + `<g opacity="${k}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="rgba(255,255,255,.2)" stroke-width="22"/><path d="M${cx},${cy - R} A${R},${R} 0 ${an > Math.PI ? 1 : 0},1 ${cx + Math.sin(an) * R},${cy - Math.cos(an) * R}" stroke="#f4e26a" stroke-width="22" fill="none"/>` + EN('2/3', cx, cy + 10, 30, '#fff', 'middle', 800) + EN('in the arms', cx, cy + 100, 18, 'rgba(255,255,255,.8)', 'middle', 500) + `</g>`;
  return s;
}
function sceneEnd(t) { let s = sea(t, .4, 'e'); F.ov = octopus(360, 980 + Math.sin(t * 1.5) * 10, .6, t) + endCard(t, WS(6, 0), WS(6, 6), false); return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneHearts }, { s: S0(2) - .2, f: sceneSwim }, { s: S0(3) - .2, f: sceneBlood }, { s: S0(4) - .2, f: sceneDeep },
  { s: S0(5) - .2, f: sceneArms }, { s: S0(6) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['3 hearts', S0(1)], ['Heart stops', S0(2)], ['Blue blood', S0(3)], ['Smart arms', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c1', 'Gills get 2 hearts', 360, 330, 'big', WS(1, 6), WS(1, 11) - .2],
  ['c1b', '1 heart for the body', 360, 330, 'big', WS(1, 12), S0(2) - .3],
  ['c2', 'Stops when it swims', 360, 330, 'red', WS(2, 8), WS(2, 14) - .2],
  ['c2b', 'So it prefers to crawl', 360, 330, 'big', WS(2, 17), S0(3) - .3],
  ['c3', 'Copper, not iron', 360, 330, 'big', WS(3, 9), S0(4) - .3],
  ['c4', 'Cold, low-oxygen water', 360, 330, 'dark', WS(4, 4), S0(5) - .3],
  ['c5', 'Arms that think', 360, 330, 'big', WS(5, 13), S0(6) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(6, 6), 999],
];
setupUI('OCTOPUS', TLI, CHIPS);
