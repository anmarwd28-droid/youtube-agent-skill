// ===== #57 part B: scenes 5–8 =====
// big cities on every continent (lat, lon): the lives saved light up all over the world
const CITY = [[35.7, 139.7], [28.6, 77.2], [31.2, 121.5], [19.1, 72.9], [-23.5, -46.6], [19.4, -99.1], [30.0, 31.2], [40.7, -74.0], [34.7, 135.5], [23.8, 90.4], [24.9, 67.0], [6.5, 3.4], [41.0, 29.0], [-34.6, -58.4], [39.9, 116.4], [14.6, 121.0],
  [-4.3, 15.3], [51.5, -0.1], [55.8, 37.6], [-6.2, 106.8], [-12.0, -77.0], [33.3, 44.4], [35.7, 51.4], [48.9, 2.4], [24.7, 46.7], [-1.3, 36.8], [52.5, 13.4], [40.4, -3.7], [-33.9, 151.2], [43.7, -79.4], [33.6, -7.6], [15.6, 32.5], [-26.2, 28.0], [9.0, 38.7],
  [36.8, 3.1], [33.5, 36.3], [31.9, 35.9], [25.3, 55.3], [13.8, 100.5], [37.6, 127.0], [-37.8, 145.0], [4.7, -74.1], [10.5, -66.9], [45.5, -73.6], [34.1, -118.2], [41.9, -87.6], [29.8, -95.4], [59.3, 18.1], [50.1, 14.4], [38.0, 23.7], [21.0, 105.8], [3.1, 101.7], [-15.8, -47.9], [12.0, 8.5], [5.6, -0.2], [-18.9, 47.5]];
function sceneLives(t) {
  const t0 = S0(5) - .2, T = t - t0, n = ease(ramp(t, WS(5, 7), WS(5, 11) + .3)), pa = ease(ramp(t, WS(5, 7) - .4, WS(5, 7))), rm = ease(ramp(t, WS(5, 16) - .5, WS(5, 16) + .4));
  const G = gAt(t, 360, 700, { d: 8.8, el: .3, lon: 40 + T * 7, clouds: .35, lights: .45, off: -.7 });
  let ov = '';
  CITY.forEach(([la, lo], i) => { const k = clamp(n * 1.3 - (i / CITY.length) * .6); if (k <= 0) return; const v = G.vis(la, lo); if (v < .1) return; const [x, y] = G.P(la, lo, 1.01), p = .75 + .25 * Math.sin(t * 3 + i), a = k * clamp((v - .1) / .2);
    ov += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(16 * p).toFixed(1)}" fill="#f4c76b" opacity="${(.3 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="#fff6d0" opacity="${a.toFixed(2)}"/>`; });
  if (pa > 0) { const v = 19.8 * n; ov += `<g opacity="${(pa * (1 - rm)).toFixed(2)}">${panel(120, 1120, 480, 120)}${lbl(360, 1180, (n < .999 ? AR4(Math.round(v)) : '≈ ٢٠') + ' مليونَ حياة', 1, '#f4c76b', 42)}${lbl(360, 1220, 'في السنةِ الأولى من اللقاح', 1, '#fff', 22)}</g>`; }
  // most of them: the old. A grandmother and grandfather at home, with their grandson
  if (rm > 0) { let r = `<rect x="-20" y="-20" width="760" height="1320" fill="url(#roomW2)"/>` + Array.from({ length: 16 }, (_, i) => `<path d="M${i * 48},380 V980" stroke="#5a4036" stroke-width="2" opacity=".3"/>`).join('') + `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".12"/>`;
    r += `<rect x="70" y="440" width="190" height="260" fill="#f0e4d0"/><rect x="82" y="452" width="166" height="236" fill="url(#skyDay)"/>${''}<path d="M165,452 V688 M82,570 H248" stroke="#f0e4d0" stroke-width="7"/><rect x="420" y="480" width="120" height="90" fill="#5a4030"/><rect x="428" y="488" width="104" height="74" fill="#c8a878"/><circle cx="480" cy="520" r="18" fill="#8a6a4a"/><path d="M450,562 q30,-30 60,0" fill="#8a6a4a"/>`;
    r += `<rect x="-20" y="1000" width="760" height="320" fill="#6a4a32"/><rect x="-20" y="1000" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".3"/><rect x="-20" y="996" width="760" height="8" fill="#3a2618"/>`;
    const by = 1150;
    r += `<rect x="110" y="${by - 230}" width="500" height="120" rx="30" fill="#7a4a3a"/><rect x="110" y="${by - 130}" width="500" height="96" rx="20" fill="#8a5a46"/><rect x="90" y="${by - 160}" width="50" height="130" rx="20" fill="#7a4a3a"/><rect x="580" y="${by - 160}" width="50" height="130" rx="20" fill="#7a4a3a"/><rect x="110" y="${by - 130}" width="500" height="8" fill="#fff" opacity=".12"/><path d="M140,${by - 34} v26 M580,${by - 34} v26" stroke="#2a1a10" stroke-width="10"/>`;
    r += man(250, by - 30, .86, 1, 3, Object.assign({}, SEAT, { top: '#5a6a7a', hair: '#e4e4e4', lean: 6, aF: [.5, 1.2] }));
    { const [hx, hy] = HP.head; r += `<path d="M${hx + 6},${hy + 14} q8,6 18,2" stroke="#e8e8e8" stroke-width="5" fill="none" opacity=".9"/><path d="M${hx + 2},${hy - 4} h22" stroke="#3a3a3a" stroke-width="2"/><circle cx="${hx + 17}" cy="${hy - 3}" r="6" fill="none" stroke="#3a3a3a" stroke-width="2"/>`; }
    r += man(480, by - 30, .84, -1, 1, Object.assign({}, SEAT, { top: '#8a3a5a', hair: '#dcdcdc', lean: 4, aF: [.4, 1.3] }));
    { const [hx, hy] = HP.head; r += hairL(.84, -1, '#dcdcdc') + `<circle cx="${hx + 10}" cy="${hy - 24}" r="12" fill="#dcdcdc"/>`; }
    r += kid(365, by - 30, .6, 1, 4, Object.assign({}, SEAT, { top: '#4a9ad8', lean: -6, hF: [410, by - 66], hB: [398, by - 64] }), '');
    r += `<path d="M640,1000 V880" stroke="#5a4a3a" stroke-width="6"/><path d="M610,880 L670,880 L660,840 L620,840Z" fill="#f4dca0"/>` + scr(`<circle cx="640" cy="870" r="300" fill="url(#lampW)" opacity=".8"/>`);
    ov += `<g opacity="${rm.toFixed(2)}"><defs><linearGradient id="roomW2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a7a62"/><stop offset="1" stop-color="#7a5a48"/></linearGradient></defs>${r}</g>`; }
  F.ov = `<defs>${CVD()}</defs>` + ov;
  return space(t);
}

// ---------- 6: schools closed for 1.6 billion students; most flights stopped; without a vaccine, for years ----------
function sceneClosed2(t) {
  const t0 = S0(6) - .2, T = t - t0, ap = ease(ramp(t, WS(6, 10) - .4, WS(6, 10) + .3)), pa = ease(ramp(t, WS(6, 5) - .3, WS(6, 5))) * (1 - ap), nk = ease(ramp(t, WS(6, 6), WS(6, 9)));
  // the school locked: a chain and a padlock on the door, a notice, dry leaves on the steps
  const cx = 360, dt = 886;
  let fg = `<path d="M${cx - 30},${dt + 60} L${cx + 30},${dt + 84} M${cx - 30},${dt + 84} L${cx + 30},${dt + 60}" stroke="#8a8e94" stroke-width="5" stroke-dasharray="7 3"/><rect x="${cx - 10}" y="${dt + 66}" width="20" height="18" rx="3" fill="#c8a040"/><path d="M${cx - 6},${dt + 66} v-6 a6,6 0 0 1 12,0 v6" stroke="#a88a30" stroke-width="3" fill="none"/>` +
    `<rect x="${cx - 26}" y="${dt + 6}" width="52" height="40" fill="#fffef4" transform="rotate(-3,${cx},${dt + 26})"/><text x="${cx}" y="${dt + 34}" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="17" fill="#c0392b" transform="rotate(-3,${cx},${dt + 26})">مُغلَق</text>`;
  const r = RS(91); for (let i = 0; i < 26; i++) { const x = 280 + r() * 170, y = 990 + r() * 14 + (r() < .5 ? 0 : 100); fg += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(5 + r() * 4).toFixed(1)}" ry="2.6" fill="${['#b8782a', '#8a5a20', '#c89a3a'][i % 3]}" transform="rotate(${(r() * 60 - 30).toFixed(0)},${x.toFixed(1)},${y.toFixed(1)})"/>`; }
  let s = street12(t, { sk: 0, cars: 0, fg, N: .12, id: 'cl' });
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}">${panel(120, 1140, 480, 110)}${lbl(360, 1196, (nk < .999 ? AR4((1.6 * nk).toFixed(1)).replace('.', '٫') : '١٫٦') + ' مليار طالب', 1, '#f4c76b', 40)}${lbl(360, 1234, 'بلا مدارس', 1, '#fff', 22)}</g>`;
  if (ap > 0) s += `<g opacity="${ap.toFixed(2)}">${sceneAir(t)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 7: in the end almost everyone is infected and gains immunity, but it fades, and it costs millions of lives ----------
function sceneImm(t) {
  const t0 = S0(7) - .2, T = t - t0, g = ease(ramp(t, WS(7, 2), WS(7, 5))), im = ease(ramp(t, WS(7, 6) - .2, WS(7, 7) + .3)), fd = ease(ramp(t, WS(7, 10), WS(7, 12) + .3));
  const G = gAt(t, 360, 700, { d: 8.8, el: .3, lon: 120 + T * 7, clouds: .4, lights: .45, off: -.8 });
  F.w.disc.inf = { o: [-90, 0], r: -1, a: lerp(1, .35, im) + .55 * fd, g: lerp(.3, 1.02, g) * (1 - .62 * fd) + .06 * fd };
  const [x, y] = G.c0, R = G.R, sh = im * (1 - fd * (.75 + .25 * Math.sin(t * 9)));
  let ov = '';
  if (sh > .01) ov += `<defs><radialGradient id="shG"><stop offset=".86" stop-color="#6ab8ff" stop-opacity="0"/><stop offset=".96" stop-color="#8ad0ff" stop-opacity=".6"/><stop offset="1" stop-color="#cfeaff" stop-opacity="0"/></radialGradient></defs>` +
    `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(R * 1.16).toFixed(1)}" fill="url(#shG)" opacity="${sh.toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(R * 1.12).toFixed(1)}" fill="none" stroke="#a8dcff" stroke-width="3" stroke-dasharray="${(fd * 40 + 2).toFixed(0)} ${(fd * 60 + 1).toFixed(0)}" opacity="${(.7 * sh).toFixed(2)}"/>`;
  F.ov = ov; return space(t);
}

// ---------- 8: a cheap old drug, dexamethasone, cut deaths by a third among patients on ventilators; but it does not stop infection ----------
function sceneDrug(t) {
  const t0 = S0(8) - .2, T = t - t0, bx = ease(ramp(t, WS(8, 4) - .3, WS(8, 8))), ca = ease(ramp(t, WS(8, 9) - .3, WS(8, 9) + .2)), b2 = ease(ramp(t, WS(8, 15), WS(8, 16) + .4)), no = ease(ramp(t, WS(8, 17) - .2, WS(8, 18)));
  let s = `<defs>${CVD()}<linearGradient id="icuW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd0d4"/><stop offset="1" stop-color="#94aab0"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#icuW)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".08"/>`;
  // a curtain on a rail, the monitor and the ventilator on a stand
  s += `<path d="M-20,380 H740" stroke="#8a969a" stroke-width="6"/>` + Array.from({ length: 9 }, (_, i) => `<path d="M${-10 + i * 24},384 q12,300 0,560" stroke="#c8dcd8" stroke-width="22" fill="none" opacity=".9"/><path d="M${-2 + i * 24},384 q12,300 0,560" stroke="#000" stroke-width="4" fill="none" opacity=".08"/>`).join('');
  s += `<rect x="500" y="520" width="190" height="140" rx="12" fill="#2a3238"/><rect x="514" y="534" width="162" height="112" rx="5" fill="#0a1416"/>`;
  [[570, '#4af08a', 1.1], [600, '#f4d44a', .7], [628, '#4ac8f0', .5]].forEach(([yy, c, f]) => { let d = ''; for (let i = 0; i <= 70; i++) { const x = 518 + i * 2.2, p = pmod(i / 70 * 2 - T * f, 1), v = yy === 570 ? (p > .4 && p < .44 ? -22 : p > .44 && p < .47 ? 10 : 0) : Math.sin(p * 6.283) * 8 * (yy === 600 ? 1 : .6); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + (yy + v).toFixed(1); } s += `<path d="${d}" stroke="${c}" stroke-width="2.2" fill="none"/>`; });
  s += `<path d="M595,660 V1000" stroke="#8a9298" stroke-width="8"/><rect x="540" y="760" width="120" height="110" rx="10" fill="#e8ecee"/><rect x="552" y="772" width="60" height="40" rx="4" fill="#2a3a48"/><path d="M556,800 q8,-14 16,0 t16,0 t16,0" stroke="#4ac8f0" stroke-width="2" fill="none"/><circle cx="636" cy="792" r="12" fill="#c8ccd2" stroke="#6a727a" stroke-width="2"/><path d="M552,830 h96 M552,846 h70" stroke="#9aa2aa" stroke-width="4"/>`;
  // the floor, the bed with the patient on the ventilator (a tube from the mouth to the machine)
  s += `<rect x="-20" y="980" width="760" height="320" fill="#8a9a9c"/><rect x="-20" y="980" width="760" height="320" fill="#000" filter="url(#grainR)" opacity=".15"/><rect x="-20" y="976" width="760" height="6" fill="#6a7a7c"/>` + bedP(290, 1180, 1.1, { skin: '#c08a66', blanket: '#7aa8c8', o2: 0 });
  s += `<path d="M190,1013 C300,960 440,980 548,850" stroke="#d8eef0" stroke-width="10" fill="none" opacity=".9"/><path d="M190,1013 C300,960 440,980 548,850" stroke="#fff" stroke-width="2.4" fill="none" opacity=".6"/><rect x="172" y="1004" width="26" height="14" rx="4" fill="#e8f4f6"/>`;
  // the bedside table with the drug: a small box and a vial
  s += `<rect x="500" y="1084" width="200" height="14" rx="4" fill="#d8dce0"/><path d="M515,1098 V1210 M685,1098 V1210" stroke="#8a929a" stroke-width="7"/><ellipse cx="600" cy="1214" rx="110" ry="8" fill="#000" opacity=".2" filter="url(#blur2)"/>`;
  if (bx > 0) s += `<g opacity="${bx.toFixed(2)}" transform="translate(452,${(280 + (1 - bx) * 20).toFixed(1)}) scale(.75)"><ellipse cx="185" cy="1070" rx="140" ry="9" fill="#000" opacity=".25" filter="url(#blur2)"/>` +
    `<path d="M80,1068 V990 L210,990 V1068Z" fill="#f6f8fa"/><path d="M210,990 L236,976 V1054 L210,1068Z" fill="#c8ced4"/><path d="M80,990 L106,976 H236 L210,990Z" fill="#fff"/><rect x="80" y="1006" width="130" height="16" fill="#2a6ab8"/>` +
    `<text x="145" y="1046" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="15" fill="#1a2a4a">ديكساميثازون</text>` +
    `<rect x="252" y="1000" width="36" height="68" rx="6" fill="#eef6fc" opacity=".7"/><rect x="254" y="1030" width="32" height="36" rx="4" fill="#f8f4e4" opacity=".9"/><rect x="250" y="990" width="40" height="14" rx="3" fill="#c0392b"/></g>`;
  // the chart: deaths among patients on ventilators, without and with the drug (one third less)
  if (ca > 0) { let g = panel(40, 410, 420, 330); const H = 170, base = 680, h2 = lerp(H, H * 2 / 3, b2);
    g += lbl(250, 452, 'الوفيّات على أجهزةِ التنفّس', 1, '#cfd8e8', 22);
    g += `<rect x="300" y="${base - H}" width="90" height="${H}" rx="6" fill="#c0392b"/>` + lbl(345, base + 36, 'بلا دواء', 1, '#fff', 22);
    g += `<rect x="110" y="${(base - h2).toFixed(1)}" width="90" height="${h2.toFixed(1)}" rx="6" fill="#f4c76b"/>` + lbl(155, base + 36, 'مع الدواء', 1, '#f4c76b', 22);
    if (b2 > .9) g += `<rect x="110" y="${base - H}" width="90" height="${(H / 3).toFixed(1)}" rx="6" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="7 5" opacity=".8"/>` + lbl(155, base - H + H / 6 + 8, '⅓ أقلّ', 1, '#fff', 22);
    s += `<g opacity="${ca.toFixed(2)}">${g}</g>`; }
  // it does not stop the infection: the virus still drifts in
  if (no > 0) s += covV(560, 940, 44, t, { id: 'dg1', a: no * .9, ph: 1 }) + covV(250, 820, 30, t, { id: 'dg2', a: no * .7, ph: 2, simple: 1 });
  noEarth(); F.ov = ''; return s;
}
