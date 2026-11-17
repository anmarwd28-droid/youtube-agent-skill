// ---------- 6: if millions download it at once, the world's networks jam ----------
const NETP = [[0, 3], [1, 5], [2, 7], [3, 9], [4, 10], [5, 0], [6, 2], [7, 11], [8, 1], [9, 4], [10, 6], [11, 8], [0, 7], [2, 9], [5, 11]];
function sceneNet(t) {
  const t0 = S0(6) - .2, T = t - t0, jam = ease(ramp(t, WS(6, 4) - .2, WS(6, 6)));
  const G = gW(t, { d: 8.6, el: .25, lon: 35 + T * 3, clouds: .25, lights: 1.4, off: 2.6 });
  let o = `<defs>${GDEFS()}</defs>`;
  NETP.forEach(([a, b], i) => { const A = CITIES[a % CITIES.length], B = CITIES[b % CITIES.length]; if (!A || !B) return;
    const pts = []; for (let k = 0; k <= 12; k++) { const f = k / 12; pts.push([lerp(A[0], B[0], f) + Math.sin(f * Math.PI) * 8, lerp(A[1], B[1], f)]); }
    const P = gPath(G, pts); if (!P.d) return; const col = mix('#5ad8ff', '#ff4a3a', jam);
    o += `<path d="${P.d}" stroke="${col}" stroke-width="${(2 + 2.5 * jam).toFixed(1)}" fill="none" opacity="${(.55 + .35 * jam).toFixed(2)}" stroke-dasharray="${jam > .5 ? '3 3' : '10 8'}" stroke-dashoffset="${(-(T * (60 - 50 * jam)) - i * 7).toFixed(1)}" filter="url(#blur2)"/>` +
      `<path d="${P.d}" stroke="#fff" stroke-width="1.2" fill="none" opacity="${(.6 * (1 - jam) + .2).toFixed(2)}" stroke-dasharray="4 14" stroke-dashoffset="${(-(T * (80 - 70 * jam)) - i * 5).toFixed(1)}"/>`; });
  // download arrows piling up over the cities
  CITIES.slice(0, 12).forEach(([la, lo], i) => { const v = G.vis(la, lo); if (v < .2) return; const [x, y] = G.P(la, lo, 1.01), k = pmod(T * .9 + i * .23, 1);
    o += `<g opacity="${(Math.min(1, (v - .2) * 4) * (1 - k) * (.4 + .6 * jam)).toFixed(2)}"><path d="M${x},${(y - 40 + 30 * k).toFixed(1)} v14 m-6,-6 l6,6 l6,-6" stroke="${mix('#ffffff', '#ff6a5a', jam)}" stroke-width="3" fill="none" stroke-linecap="round"/></g>`; });
  F.ov = o; return space(t);
}

// ---------- 7: cloud gaming: the game runs on a distant computer and the phone only receives the picture ----------
function rack(x, y, w, h, t, seed) {
  const r = RS(seed); let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="#16181e"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="#3a3e48" stroke-width="2"/>`;
  for (let i = 0; i < Math.floor(h / 22); i++) { const yy = y + 8 + i * 22; s += `<rect x="${x + 6}" y="${yy}" width="${w - 12}" height="16" rx="2" fill="#262a34"/>`;
    for (let k = 0; k < 3; k++) { const on = Math.sin(t * (3 + r() * 9) + r() * 9) > .2; s += `<circle cx="${x + 14 + k * 9}" cy="${yy + 8}" r="2.4" fill="${on ? ['#4ad87a', '#5ad8ff', '#f4c74a'][k] : '#2a3a2a'}"/>`; } s += `<path d="M${x + w * .5},${yy + 8} h${w * .38}" stroke="#3a3e48" stroke-width="2" stroke-dasharray="3 3"/>`; }
  return s;
}
function sceneCloud(t) {
  const t0 = S0(7) - .2, T = t - t0, ca = ease(ramp(t, WS(7, 3) - .2, WS(7, 4))), dc = ease(ramp(t, WS(7, 5) - .2, WS(7, 8))), st = ease(ramp(t, WS(7, 10) - .2, WS(7, 12)));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // the data centre: rows of racks, blue light
  s += `<g opacity="${dc.toFixed(2)}"><rect x="40" y="420" width="640" height="300" rx="16" fill="#0e1424"/>` + Array.from({ length: 6 }, (_, i) => rack(60 + i * 104, 440, 92, 260, t, 300 + i)).join('') + `<rect x="40" y="420" width="640" height="300" rx="16" fill="#3a6aff" opacity=".08"/>${lbl(360, 760, 'Distant computer', 1, '#9ab8ff', 26)}</g>`;
  // the cloud above the link
  s += `<g opacity="${ca.toFixed(2)}" transform="translate(360,${(860).toFixed(1)})"><path d="M-80,30 C-120,30 -120,-24 -80,-26 C-76,-66 -14,-74 4,-38 C26,-66 86,-56 82,-16 C118,-12 116,30 84,30Z" fill="#e8eef8"/><path d="M-80,30 C-120,30 -120,-24 -80,-26" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/></g>`;
  // packets of picture streaming down to the player
  if (st > 0) for (let i = 0; i < 9; i++) { const k = pmod(T * 1.4 + i / 9, 1), y = 900 + k * 170, x = 360 + Math.sin(k * 3 + i) * 6; s += `<rect x="${(x - 9).toFixed(1)}" y="${y.toFixed(1)}" width="18" height="12" rx="2" fill="#5ad8ff" opacity="${(st * Math.sin(k * Math.PI)).toFixed(2)}"/>`; }
  // the player at the bottom, playing on the phone
  s += player(300, 1180, .78, 1, 4, t, { off: st < .05 });
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: the twist: your phone is several times stronger than the PlayStation 3 that ran GTA 5 in 2013 ----------
function oldConsole(x, y, s) {   // a generic glossy black console from the 2000s (no logo)
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="6" rx="150" ry="12" fill="#000" opacity=".35" filter="url(#blur5)"/><path d="M-140,0 L-140,-60 Q-140,-96 -100,-100 L100,-100 Q140,-96 140,-60 L140,0Z" fill="#14161a"/><path d="M-140,-60 Q-140,-96 -100,-100 L100,-100 Q140,-96 140,-60 L140,-52 L-140,-52Z" fill="#2a2e34"/><path d="M-120,-92 L60,-92" stroke="#fff" stroke-width="4" opacity=".18" stroke-linecap="round"/><rect x="-110" y="-36" width="150" height="6" rx="3" fill="#0a0a0c"/><circle cx="110" cy="-30" r="5" fill="#4ad87a"/></g>`;
}
function sceneTwist(t) {
  const t0 = S0(8) - .2, T = t - t0, a1 = ease(ramp(t, WS(8, 6) - .3, WS(8, 8))), a2 = ease(ramp(t, WS(8, 1) - .2, WS(8, 2))), b = ease(ramp(t, WS(8, 3), WS(8, 5) + .3)), g5 = ease(ramp(t, WS(8, 11) - .2, WS(8, 15)));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  s += `<g opacity="${a2.toFixed(2)}">${phoneL(400, 470, 250, 118, t, 'tw', { glow: .5, rot: -6 })}${lbl(525, 640, 'Your phone today', 1, '#fff', 26)}</g>`;
  s += `<g opacity="${a1.toFixed(2)}">${oldConsole(200, 640, .9)}${lbl(200, 690, 'PlayStation 3', 1, '#c8d4e8', 26)}</g>`;
  s += `<g opacity="${g5.toFixed(2)}">${panel(60, 720, 290, 74, 1)}${lbl(205, 768, 'Ran GTA 5 in 2013', 1, '#f4c76b', 22)}</g>`;
  // the bars: about 0.2 vs about 2 TFLOPS
  const bx = 90, bw = 540;
  s += `<g opacity="${Math.max(a1, a2).toFixed(2)}">${panel(60, 850, 600, 300, 1)}${lbl(630, 900, 'Graphics power (approx.)', 1, '#c8d4e8', 24, 'end')}` +
    `<rect x="${bx + bw - bw * b}" y="935" width="${bw * b}" height="44" rx="10" fill="#6affc8"/>${lbl(bx + bw - 12, 966, 'Phone ≈ 2', b, '#ffffff', 24, 'end')}` +
    `<rect x="${bx + bw - bw * .1 * a1}" y="1010" width="${bw * .1 * a1}" height="44" rx="10" fill="#8a929c"/>${lbl(bx + bw - bw * .1 - 14, 1042, 'PS3 ≈ 0.2', a1, '#c8d4e8', 24, 'end')}${lbl(360, 1120, 'TFLOPS', 1, '#7a86a0', 20)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// 9: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(9, 0) - .2, WS(9, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(9)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Inter Display" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">?</text></g>` +
    `<g opacity="${ramp(t, WS(9, 7) - .3, WS(9, 7) + .1)}" transform="translate(360,${1100 - b})"><rect x="-130" y="-34" width="260" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">SUBSCRIBE</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: WS(0, 16) - .2, f: sceneBus }, { s: WS(0, 19) - .2, f: sceneCafe }, { s: S0(1) - .2, f: sceneConsole }, { s: S0(2) - .2, f: sceneStorage }, { s: S0(3) - .2, f: sceneGpu },
  { s: S0(4) - .2, f: sceneHeat }, { s: S0(5) - .2, f: sceneBattery }, { s: S0(6) - .2, f: sceneNet }, { s: S0(7) - .2, f: sceneCloud }, { s: S0(8) - .2, f: sceneTwist }, { s: S0(9) - .2, f: sceneEarth }];
const NOKB = new Set([sceneStorage, sceneGpu, sceneHeat, sceneBattery, sceneNet, sceneCloud, sceneTwist]);
const XF = .5;
const TLI = [['Storage', S0(2)], ['Power', S0(3)], ['Temperature', S0(4)], ['Battery', S0(5)]];
const LIST_ON = new Set([]);
const CHIPS = [
  ['c0', 'Everyone plays', 360, 330, 'big', WS(0, 11), S0(1) - .3],
  ['c1', 'November 19, 2026', 360, 330, 'big', WS(1, 3), WS(1, 7) - .1],
  ['c1b', 'PS5 and Xbox only', 360, 330, 'red big', WS(1, 7), S0(2) - .3],
  ['c2', 'Over 200 GB', 360, 330, 'big', WS(2, 1), WS(2, 7) - .1],
  ['c2b', 'Phone: 128 GB', 360, 330, 'red big', WS(2, 7), S0(3) - .3],
  ['c3', 'Several times stronger', 360, 330, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'The phone heats up', 360, 330, 'red big', WS(4, 4), WS(4, 6) - .1],
  ['c4b', 'It slows itself down', 360, 330, 'red big', WS(4, 6), S0(5) - .3],
  ['c5', 'About 200 watts', 360, 330, 'big', WS(5, 2), WS(5, 7) - .1],
  ['c5b', 'Empty in 6 minutes', 360, 330, 'red big', WS(5, 9), S0(6) - .3],
  ['c6', 'Networks jam', 360, 330, 'red big', WS(6, 4), S0(7) - .3],
  ['c7', 'Cloud gaming', 360, 330, 'big', WS(7, 3), WS(7, 10) - .1],
  ['c7b', 'Your phone just gets the picture', 360, 330, 'big', WS(7, 10), S0(8) - .3],
  ['c8', 'The twist?', 360, 330, 'big', S0(8), WS(8, 3) - .1],
  ['c8b', 'Your phone is stronger', 360, 330, 'big', WS(8, 3), S0(9) - .3]
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ON A PHONE</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
