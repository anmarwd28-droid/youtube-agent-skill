// ---------- 2: more than 200 GB, while many phones have 128 GB ----------
function bigPhone(x, y, w, h, inner) {   // a portrait phone, screen content passed in (local coords 0..w, 0..h)
  return `<rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="46" fill="url(#phB)"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="34" fill="#0e1018"/><g transform="translate(${x},${y})">${inner}</g><rect x="${x + w / 2 - 40}" y="${y + 10}" width="80" height="22" rx="11" fill="#000"/><path d="M${x},${y + h * .6} L${x + w * .7},${y} L${x + w * .85},${y} L${x},${y + h * .75}Z" fill="#fff" opacity=".05"/>`;
}
function sceneStorage(t) {
  const t0 = S0(2) - .2, T = t - t0, g = ease(ramp(t, WS(2, 1), WS(2, 4) + .3)), pa = ease(ramp(t, WS(2, 7), WS(2, 12))), warn = ease(ramp(t, WS(2, 12), WS(2, 13) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  const W = 420, H = 760, X = 150, Y = 420;
  let in1 = `<rect x="0" y="0" width="${W}" height="${H}" rx="34" fill="#141826"/>` + lbl(W / 2, 90, 'Storage', 1, '#fff', 34);
  // the phone's storage bar and the game's size bar
  const bw = W - 80, phoneG = 128, gameG = 210, sc = bw / 128;
  in1 += lbl(W - 40, 170, 'Phone storage: 128 GB', pa, '#aab4c4', 22, 'end') + `<rect x="40" y="186" width="${bw}" height="34" rx="17" fill="#2a3044" opacity="${pa.toFixed(2)}"/>`;
  const gw = gameG * sc * g; in1 += lbl(W - 40, 290, 'Game: over 200 GB', g, '#ffd86a', 22, 'end') + `<rect x="${(40 + bw - Math.min(gw, bw)).toFixed(1)}" y="306" width="${Math.min(gw, bw).toFixed(1)}" height="34" rx="17" fill="#f4c76b" opacity="${g.toFixed(2)}"/>`;
  if (gw > bw) in1 += `<rect x="${(40 + bw - gw).toFixed(1)}" y="306" width="${(gw - bw).toFixed(1)}" height="34" rx="0" fill="#e8584a"/>`;
  in1 += `<g opacity="${warn.toFixed(2)}"><rect x="30" y="420" width="${W - 60}" height="160" rx="22" fill="#2a1418" stroke="#e8584a" stroke-width="3"/><circle cx="${W / 2}" cy="470" r="22" fill="#e8584a"/><path d="M${W / 2},456 v18 M${W / 2},480 v2" stroke="#fff" stroke-width="5" stroke-linecap="round"/>${lbl(W / 2, 540, 'Not enough storage', 1, '#fff', 28)}</g>`;
  s += `<g transform="translate(0,${(10 * Math.sin(T * .8)).toFixed(1)})">` + bigPhone(X, Y, W, H, in1) + `</g>`;
  // the overflowing part spills past the phone's edge
  noEarth(); F.ov = ''; return s;
}

// ---------- 3: the console's graphics chip is several times stronger than the best phones ----------
function chipDie(cx, cy, S, col, lab, a) {
  if (a <= 0) return ''; let p = ''; for (let i = 0; i < 8; i++) { const q = -S / 2 + S * (i + .5) / 8; p += `<path d="M${q},${-S / 2 - 12} v12 M${q},${S / 2} v12 M${-S / 2 - 12},${q} h12 M${S / 2},${q} h12" stroke="#c8a24a" stroke-width="3"/>`; }
  let g = ''; for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) g += `<rect x="${-S * .38 + i * S * .13}" y="${-S * .38 + j * S * .13}" width="${S * .1}" height="${S * .1}" fill="${col}" opacity="${(.35 + .4 * ((i * 7 + j * 3) % 5) / 5).toFixed(2)}"/>`;
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy})">${p}<rect x="${-S / 2}" y="${-S / 2}" width="${S}" height="${S}" rx="6" fill="#2a2e38"/>${g}<rect x="${-S / 2}" y="${-S / 2}" width="${S}" height="${S}" rx="6" fill="none" stroke="#5a6070" stroke-width="2"/>${lbl(0, S / 2 + 50, lab, 1, '#fff', 26)}</g>`;
}
function sceneGpu(t) {
  const t0 = S0(3) - .2, a1 = ease(ramp(t, t0 + .2, t0 + .7)), a2 = ease(ramp(t, WS(3, 8) - .3, WS(3, 9))), b = ease(ramp(t, WS(3, 5), WS(3, 7) + .4));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  { const r = RS(201); for (let i = 0; i < 40; i++) { const y = 420 + r() * 860; s += `<path d="M${(r() * 720).toFixed(0)},${y.toFixed(0)} h${(40 + r() * 120).toFixed(0)} v${(r() > .5 ? 30 : -30)}" stroke="#3a4a7a" stroke-width="2" fill="none" opacity=".4"/>`; } }
  s += chipDie(220, 560, 200, '#6a9aff', 'PlayStation 5', a1) + chipDie(540, 600, 110, '#6affc8', 'Best phone', a2);
  // bars: about 10 TFLOPS vs about 2-3
  const bx = 90, bw = 540;
  s += `<g opacity="${a1.toFixed(2)}">${panel(60, 900, 600, 280, 1)}${lbl(630, 950, 'Graphics power (TFLOPS)', 1, '#c8d4e8', 24, 'end')}<rect x="${bx + bw - bw * b}" y="990" width="${bw * b}" height="44" rx="10" fill="#6a9aff"/>${lbl(bx + bw - 10, 1022, '≈ 10', b, '#ffffff', 26, 'end')}</g>`;
  s += `<g opacity="${a2.toFixed(2)}"><rect x="${bx + bw - bw * .28 * a2}" y="1070" width="${bw * .28 * a2}" height="44" rx="10" fill="#6affc8"/>${lbl(bx + bw - bw * .28 - 14, 1102, '≈ 2 to 3', 1, '#6affc8', 26, 'end')}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 4: the phone heats up fast and slows itself down to protect its parts ----------
function sceneHeat(t) {
  const t0 = S0(4) - .2, T = t - t0, h = ease(ramp(t, WS(4, 3), WS(4, 6) + .4)), sl = ease(ramp(t, WS(4, 6), WS(4, 9) + .3));
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // close-up: the phone in two hands, the game stuttering as it slows down
  const fs = 1 - .7 * sl, tt = sl > .5 ? Math.floor(t * 8) / 8 : t;
  s += `<ellipse cx="360" cy="660" rx="${(260 + 60 * h).toFixed(1)}" ry="${(200 + 50 * h).toFixed(1)}" fill="url(#hotG)" opacity="${(h * .9).toFixed(2)}"/>`;
  s += `<g transform="translate(${(Math.sin(t * 40) * 2 * h).toFixed(1)},0)">${phoneL(100, 530, 520, 246, tt, 'heat', { sp: fs, glow: .3 })}</g>`;
  // heat shimmer over the phone
  for (let i = 0; i < 6; i++) { const x = 160 + i * 80, ph = pmod(T * .8 + i * .17, 1); s += `<path d="M${x},${(520 - ph * 160).toFixed(1)} q12,-20 0,-40 q-12,-20 0,-40" stroke="#ff9a6a" stroke-width="4" fill="none" opacity="${(h * .5 * Math.sin(ph * Math.PI)).toFixed(2)}" filter="url(#blur2)"/>`; }
  // the thermometer and the frame rate
  const temp = Math.round(lerp(34, 47, h)), fps = Math.round(lerp(30, 12, sl));
  s += `<g opacity="${ease(ramp(t, t0 + .3, t0 + .8)).toFixed(2)}">${panel(70, 1010, 270, 170, 1)}${lbl(205, 1060, 'Temperature', 1, '#c8d4e8', 24)}<text x="205" y="1140" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="${mix('#ffffff', '#ff5a3a', h)}">${AR(temp)}°</text>` +
    `${panel(380, 1010, 270, 170, 1)}${lbl(515, 1060, 'FPS', 1, '#c8d4e8', 24)}<text x="515" y="1140" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="${mix('#6affc8', '#ff5a3a', sl)}">${AR(fps)}</text></g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: the console draws about 200 W while playing; at that power a phone battery empties in about six minutes ----------
function battery(cx, cy, k, a) {
  const w = 300, h = 140, c = k > .5 ? '#4ad87a' : k > .2 ? '#f4c74a' : '#e8584a';
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="20" fill="none" stroke="#e8eef6" stroke-width="10"/><rect x="${w / 2 + 4}" y="-28" width="18" height="56" rx="6" fill="#e8eef6"/><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${((w - 28) * k).toFixed(1)}" height="${h - 28}" rx="10" fill="${c}"/>${lbl(0, 18, AR(Math.round(k * 100)) + '%', 1, '#fff', 48)}</g>`;
}
function sceneBattery(t) {
  const t0 = S0(5) - .2, a1 = ease(ramp(t, t0 + .2, t0 + .7)), a2 = ease(ramp(t, WS(5, 7) - .3, WS(5, 7) + .2)), dr = ease(ramp(t, WS(5, 9), WS(5, 15) + .3)), m = dr * 6;
  let s = `<defs>${GDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#techBg)"/>`;
  // the console with its power cord and a meter reading 200 W
  s += `<g opacity="${(a1 * (1 - .65 * a2)).toFixed(2)}">${consoleBox(220, 760, 1, 0)}<path d="M240,750 C300,760 330,800 360,800 C420,800 440,740 520,740" stroke="#2a2e34" stroke-width="7" fill="none"/>${panel(470, 630, 200, 120, 1)}<text x="570" y="712" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="56" fill="#f4c76b">${AR(200)}</text>${lbl(570, 735, 'watts', 1, '#c8d4e8', 20)}</g>`;
  // the phone battery draining while a timer runs to six minutes
  s += battery(360, 980, 1 - dr, a2);
  const tm = `${AR(Math.floor(m))}:${AR(String(Math.floor((m % 1) * 60)).padStart(2, '0'))}`;
  s += `<g opacity="${a2.toFixed(2)}">${lbl(360, 1130, 'Phone battery (~20 Wh)', 1, '#aab4c4', 22)}<text x="360" y="1220" text-anchor="middle" direction="ltr" font-family="Noto Naskh Arabic" font-weight="700" font-size="62" fill="#fff">${tm}</text></g>`;
  noEarth(); F.ov = ''; return s;
}
