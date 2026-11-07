
// ===================== "what if the Earth stopped spinning?" =====================
const tStop = () => WS(0, 6) - .1;
// 0: the 3D Earth spinning (faster than real, to read as motion) – then it halts with a jolt
function sceneHook(t) {
  const ts = tStop(), k = clamp((t - ts) / .25), spin = t < ts ? t * 1.6 : ts * 1.6 + (1 - Math.pow(1 - k, 3)) * .25;
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360 + (t > ts && t < ts + .4 ? Math.sin(t * 90) * 8 * (1 - k) : 0), y: 760, r: 240, a: 1, sunI: 1.05, lights: .3, rot: spin - t * .03, tilt: .41 }; F.light = [-700, 300];
  let ov = '';
  if (t < ts) for (let i = 0; i < 3; i++) { const a0 = (t * 3 + i * 2.1) % 6.283; ov += `<path d="M${360 + Math.cos(a0) * 290},${760 + Math.sin(a0) * 90} A290,90 0 0 1 ${360 + Math.cos(a0 + .7) * 290},${760 + Math.sin(a0 + .7) * 90}" stroke="#f4c76b" stroke-width="5" fill="none" opacity=".7" stroke-linecap="round"/>`; }
  if (t > ts) ov += `<circle cx="360" cy="760" r="${250 + 300 * k}" fill="none" stroke="#fff" stroke-width="${8 * (1 - k)}" opacity="${1 - k}"/>`;
  F.ov = ov; F.flash = t > ts ? .5 * (1 - clamp((t - ts) / .3)) : 0; return s;
}
// 1: how fast we are moving: the equator ≈1,670 km/h, Baghdad (33°N) ≈1,400 km/h
function sceneSpeed(t) {
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 760, r: 240, a: 1, sunI: 1.05, lights: .2, rot: .9 + t * .25 - t * .03, tilt: 0 }; F.light = [-600, 300];
  const R_ = 240, by = 760 - R_ * Math.sin(33 * Math.PI / 180), bw = R_ * Math.cos(33 * Math.PI / 180), eq = ramp(t, WS(1, 12) - .2, WS(1, 12) + .3), bg = ramp(t, WS(1, 4), WS(1, 4) + .4);
  let ov = `<g opacity="${eq}"><path d="M120,760 L600,760" stroke="#f4c76b" stroke-width="4"/><path d="M600,760 l-16,-9 l0,18Z" fill="#f4c76b"/><text x="360" y="745" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">خط الاستواء ≈ ١٦٧٠ كم/س</text></g>`;
  ov += `<g opacity="${bg}"><path d="M${360 - bw},${by} L${360 + bw},${by}" stroke="#7ac8ff" stroke-width="3" stroke-dasharray="8 6"/><circle cx="${360 + bw * .25}" cy="${by}" r="7" fill="#ff5a3a"/><text x="${360 + bw * .25}" y="${by - 16}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="4">بغداد ≈ ١٤٠٠ كم/س</text></g>`;
  F.ov = ov; return s;
}
// 2: the stop: everything not anchored keeps going east – cars, bins, signs, fronds and dust shoot to the right; then speed bars vs a jet
function sceneFling(t) {
  const ts = WS(2, 2), u = Math.max(0, t - ts), shake = u > 0 && u < .6 ? Math.sin(t * 80) * 10 * (1 - u / .6) : 0;
  let s = `<g transform="translate(${shake},0)">` + street(t, { id: 'f2', sky: ['#4a86c6', '#92bce0', '#d2e4f0'], sun: 1, sunX: 150, sunY: 480, dry: clamp(u * 2) * .5 }) + `</g>`;
  const fly = (x0, y0, sp, w) => [x0 + u * u * sp * 900 + u * sp * 400, y0 - u * w * 80];
  [[120, 1214, 1, '#c83a2a', 1], [470, 1262, 1.2, '#d8d8dc', -1], [-60, 1262, .9, '#2a4a7a', 1]].forEach(([x, y, sp, c, fc]) => { const p = fly(x, y, sp, .6); s += `<g transform="rotate(${u * 40 * sp},${p[0]},${p[1]})">${car(p[0], p[1], .9, c, fc, 0)}</g>`; if (u > 0) s += `<path d="M${p[0] - 140},${p[1] - 40} L${p[0] - 20},${p[1] - 40}" stroke="#fff" stroke-width="18" opacity=".25" filter="url(#blur2)"/>`; });
  for (let i = 0; i < 26; i++) { const r = RS(i + 30), p = fly(r() * 720, 980 + r() * 280, .6 + r() * .8, r()); if (u > 0) s += `<rect x="${p[0]}" y="${p[1]}" width="${8 + r() * 20}" height="${5 + r() * 10}" fill="${mix('#8a7a5a', '#d8d0c0', r())}" transform="rotate(${u * 600 * r()},${p[0]},${p[1]})"/>`; }
  if (u > 0) s += `<rect x="-40" y="900" width="800" height="400" fill="#c8a878" opacity="${.5 * clamp(u * 2)}" filter="url(#haze)"/>` + Array.from({ length: 40 }, (_, i) => { const r = RS(i + 70), y = 300 + r() * 980, x = pmod(r() * 900 + t * 2400, 900) - 90; return `<path d="M${x},${y} l-${60 + r() * 80},0" stroke="#fff" stroke-width="2" opacity=".5"/>`; }).join('');
  const bars = ramp(t, WS(2, 10) - .2, WS(2, 10) + .3);
  if (bars > 0) s += `<g opacity="${bars}"><rect x="60" y="420" width="600" height="190" rx="18" fill="#0a0e1c" opacity=".78"/>` +
    `<text x="640" y="470" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">بغداد: ١٤٠٠ كم/س</text><rect x="${640 - 520 * bars}" y="484" width="${520 * bars}" height="22" rx="8" fill="#f4c76b"/>` +
    `<text x="640" y="550" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#fff">طائرة نفاثة: ٩٠٠ كم/س</text><rect x="${640 - 334 * bars}" y="564" width="${334 * bars}" height="22" rx="8" fill="#7ac8ff"/>` +
    `<path d="M150,580 l40,-6 l8,-14 l6,0 l-2,14 l26,-4 l6,-8 l4,0 l-2,10 l4,4 l-4,2 l2,10 l-4,0 l-6,-8 l-26,-2 l2,14 l-6,0 l-8,-14 l-40,-4Z" fill="#cfe4ff"/></g>`;
  F.ov = ''; return s;
}
// 3: the air keeps moving: a storm stronger than any hurricane – palms bent flat, dust, debris, torn roofs
function sceneWind(t) {
  const st = S0(3) - .2, k = ease(ramp(t, st, st + 1.2));
  let s = `<defs>${RDEF}<linearGradient id="skW3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#4a86c6', '#5a4a3a', k)}"/><stop offset="1" stop-color="${mix('#d2e4f0', '#b08a5a', k)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skW3)"/>`;
  const r = RS(7); let x = -20; while (x < 740) { const w = 40 + r() * 70, h = 120 + r() * 260; s += bldg(x, 980, w, h, mix('#a89276', '#c8b89a', r()), Math.floor(r() * 99), .12); x += w + 8; }
  s += `<rect y="980" width="720" height="300" fill="#8a7a62"/><rect y="980" width="720" height="300" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  [[120, 1000, 230], [420, 1010, 260], [640, 1000, 210]].forEach(([px, py, h], i) => { s += `<g transform="rotate(${18 * k + Math.sin(t * 9 + i) * 3 * k},${px},${py})">${palmG(px, py, h, t * 3, 0, .2)}</g>`; });
  for (let i = 0; i < 18; i++) { const r2 = RS(i + 40), y = 380 + r2() * 860, xx = pmod(r2() * 900 + t * (1400 + r2() * 900), 900) - 90; s += `<g transform="translate(${xx},${y}) rotate(${t * 900 * r2()})"><rect x="-${6 + r2() * 14}" y="-4" width="${12 + r2() * 28}" height="${4 + r2() * 8}" fill="${mix('#6a5a4a', '#d8d0c0', r2())}"/></g>`; }
  s += `<rect x="-40" y="-40" width="800" height="1360" fill="#fff" filter="url(#dustR)" opacity="${.45 * k}"/>`;
  for (let i = 0; i < 70; i++) { const r2 = RS(i + 90), y = r2() * 1280, xx = pmod(r2() * 900 + t * (1800 + r2() * 800), 900) - 90; s += `<path d="M${xx},${y} l-${80 + r2() * 120},${4 + r2() * 4}" stroke="#f0d8b0" stroke-width="${1 + r2() * 2}" opacity="${.5 * k}"/>`; }
  F.ov = ''; return s;
}
// 4: the oceans keep moving: a wall of water taller than the towers rises behind a coastal city and breaks over it
function sceneWave(t) {
  const st = S0(4) - .2, k = ease(ramp(t, st, L(4).end + .3)), top = lerp(760, 300, k);
  let s = `<defs>${RDEF}<linearGradient id="skV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e3a4a"/><stop offset="1" stop-color="#8a98a4"/></linearGradient><linearGradient id="wallW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a9aa6"/><stop offset=".25" stop-color="#2a6070"/><stop offset="1" stop-color="#0c2a34"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skV)"/>`;
  // the wave wall across the whole horizon, with a lighter, translucent upper face and a curling, foaming lip
  let lip = `M-20,${top + 60}`; for (let x = -20; x <= 740; x += 20) lip += ` L${x},${(top + 40 * Math.sin(x * .012 + t * 1.5) + 18 * Math.sin(x * .05 - t * 3)).toFixed(1)}`;
  s += `<path d="${lip} L740,1060 L-20,1060Z" fill="url(#wallW)"/>`;
  for (let q = 0; q < 14; q++) { const y = top + 60 + q * (1000 - top) / 14; s += `<path d="M-20,${y} Q180,${y - 10} 360,${y + 4} T740,${y - 6}" stroke="#cfe8ee" stroke-width="${1 + q * .1}" fill="none" opacity="${.18 - q * .008}" transform="translate(${Math.sin(t + q) * 12},0)"/>`; }
  s += `<path d="${lip}" stroke="#f4fafc" stroke-width="26" fill="none" opacity=".9"/><path d="${lip}" stroke="#ffffff" stroke-width="10" fill="none" transform="translate(0,22)" opacity=".55"/>`;
  for (let i = 0; i < 60; i++) { const r = RS(i + 60), x = r() * 760 - 20, ph = pmod(t * .9 + r(), 1), y = top + 40 * Math.sin(x * .012 + t * 1.5) - ph * 120; s += `<circle cx="${x + ph * 30}" cy="${y}" r="${10 + r() * 26 + ph * 20}" fill="#f4fafc" opacity="${(.7 * (1 - ph)).toFixed(2)}" filter="url(#blur2)"/>`; }
  s += `<rect x="-20" y="${top - 160}" width="760" height="200" fill="#e8f2f4" opacity="${.25 * k}" filter="url(#haze)"/>`;
  // the city in front: towers, palms, the corniche and the harbour
  const r = RS(13); let x = -20; while (x < 740) { const w = 40 + r() * 60, h = 150 + r() * 260; s += bldg(x, 1040, w, h, mix('#b8a888', '#d8ccb4', r()), Math.floor(r() * 99), .12); x += w + 8; }
  s += palmG(80, 1070, 200, t * 3, 0, 0) + palmG(330, 1070, 220, t * 3, 0, 0) + palmG(600, 1070, 200, t * 3, 0, 0);
  s += `<rect y="1040" width="720" height="40" fill="#b8b0a0"/><rect y="1080" width="720" height="210" fill="#24505a"/>` + Array.from({ length: 6 }, (_, q) => `<path d="M-20,${1100 + q * 30} q180,-8 380,0 t380,0" stroke="#cfe4e8" stroke-width="1.5" fill="none" opacity=".3" transform="translate(${-t * 40 % 80},0)"/>`).join('');
  s += `<rect width="720" height="1280" fill="#0a1420" opacity="${.25 * k}"/>`;
  F.ov = ''; return s;
}
// 5: if it stays stopped, the oceans drain toward the poles and one giant equatorial continent emerges (real map, then the change)
function sceneMap(t) {
  const st = S0(5) - .2, k = ease(ramp(t, WS(5, 3), WS(5, 15) + .3)), mx = 20, my = 560, mw = 680, mh = 340;
  let s = `<defs><clipPath id="mapC"><rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="14"/></clipPath><linearGradient id="landEq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8a670" stop-opacity="0"/><stop offset=".25" stop-color="#b89660"/><stop offset=".5" stop-color="#a8864e"/><stop offset=".75" stop-color="#b89660"/><stop offset="1" stop-color="#c8a670" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="seaN" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e4a7a"/><stop offset="1" stop-color="#2a5a8a" stop-opacity="0"/></linearGradient><linearGradient id="seaS" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#1e4a7a"/><stop offset="1" stop-color="#2a5a8a" stop-opacity="0"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="#0a1020"/>` + stars(.6, t);
  s += `<g clip-path="url(#mapC)"><image href="tex/earth_atmos_2048.jpg" x="${mx}" y="${my}" width="${mw}" height="${mh}" preserveAspectRatio="none"/>`;
  s += `<rect x="${mx}" y="${my + mh * .25}" width="${mw}" height="${mh * .5}" fill="url(#landEq)" opacity="${.92 * k}"/><rect x="${mx}" y="${my}" width="${mw}" height="${mh * (.18 + .12 * k)}" fill="url(#seaN)" opacity="${.95 * k}"/><rect x="${mx}" y="${my + mh * (.82 - .12 * k)}" width="${mw}" height="${mh * (.18 + .12 * k)}" fill="url(#seaS)" opacity="${.95 * k}"/>`;
  for (let q = 0; q < 4; q++) { const y = my + mh * (.06 + q * .03); s += `<path d="M${mx},${y} L${mx + mw},${y}" stroke="#cfe4ff" stroke-width="1.4" opacity="${.3 * k}" stroke-dasharray="10 14" stroke-dashoffset="${-t * 30}"/><path d="M${mx},${my + mh - (y - my)} L${mx + mw},${my + mh - (y - my)}" stroke="#cfe4ff" stroke-width="1.4" opacity="${.3 * k}" stroke-dasharray="10 14" stroke-dashoffset="${-t * 30}"/>`; }
  s += `</g><rect x="${mx}" y="${my}" width="${mw}" height="${mh}" rx="14" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/><path d="M${mx},${my + mh / 2} L${mx + mw},${my + mh / 2}" stroke="#f4c76b" stroke-width="2" stroke-dasharray="6 8" opacity=".8"/>`;
  [[my - 20, 'محيط القطب الشمالي', '#9ccaff', WS(5, 8)], [my + mh / 2 + 10, 'قارّة واحدة عملاقة', '#f4c76b', WS(5, 13)], [my + mh + 44, 'محيط القطب الجنوبي', '#9ccaff', WS(5, 8)]].forEach(([y, txt, c, a]) => { s += `<text x="360" y="${y}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="${c}" style="paint-order:stroke" stroke="#000" stroke-width="5" opacity="${ramp(t, a, a + .4)}">${txt}</text>`; });
  s += `<text x="360" y="${my + mh + 100}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#cfd8ff" opacity="${ramp(t, WS(5, 13), WS(5, 13) + .4)}">بعد آلاف السنين من التوقّف</text>`;
  F.ov = ''; return s;
}
// 6: one day lasts a year: six months of scorching day, then six months of freezing night, in the same Baghdad street
function sceneDayNight(t) {
  const n = ease(ramp(t, WS(6, 9) - .3, WS(6, 9) + .7));
  const sky = [mix('#7aa8d8', '#03050f', n), mix('#e8eef0', '#0c1024', n), mix('#fff6e0', '#1a2034', n)];
  let s = street(t, { id: 'dn' + Math.round(n * 10), sky, sun: 1 - n, sunX: 360, sunY: 430, dry: .9 * (1 - n) });
  if (n < 1) s += `<rect width="720" height="1280" fill="#fff4d0" opacity="${.18 * (1 - n)}"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M-20,${960 + i * 18} q180,${Math.sin(t * 4 + i) * 6} 380,0 t380,0" stroke="#fff" stroke-width="2" fill="none" opacity="${.12 * (1 - n)}"/>`).join('');
  if (n > 0) s += stars(n, t) + `<rect y="990" width="720" height="300" fill="#e8f0f8" opacity="${.75 * n}"/><rect width="720" height="1280" fill="#0a1430" opacity="${.35 * n}"/>` + Array.from({ length: 5 }, (_, i) => `<path d="M${i * 150 + 20},1000 l30,-6 l40,4 l50,-4" stroke="#f4fbff" stroke-width="6" fill="none" opacity="${n}"/>`).join('');
  s += car(300, 1218, .9, '#8a8a8a', 1, 0);
  const lbl = (txt, a, c) => `<g opacity="${a}"><rect x="200" y="440" width="320" height="64" rx="16" fill="${c}"/><text x="360" y="484" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#1c140a">${txt}</text></g>`;
  s += lbl('٦ أشهر نهار ☀', ramp(t, WS(6, 5), WS(6, 5) + .3) * (1 - n), '#f4c76b') + lbl('٦ أشهر ليل', n, '#9ccaff');
  F.ov = ''; return s;
}
// 7: the good news: the real Earth slows very gently – the day grows by about 2 thousandths of a second per century
function sceneSlow(t) {
  const st = S0(7) - .2, k = ease(ramp(t, WS(7, 8), L(7).end));
  let s = space(t, '#020309', '#070a1c');
  F.earth = { x: 360, y: 820, r: 220, a: 1, sunI: 1.05, lights: .4, rot: 1.4, tilt: .41 }; F.light = [-700, 300];
  const yr = Math.round(lerp(2026, 2126, k)), ms = (.002 * k).toFixed(3);
  F.ov = `<g opacity="${ramp(t, WS(7, 8) - .3, WS(7, 8))}"><rect x="150" y="440" width="420" height="130" rx="18" fill="#0a0e1c" opacity=".8" stroke="#f4c76b" stroke-opacity=".5"/><text x="360" y="490" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#cfd8ff">طول اليوم — سنة ${AR(yr)}</text><text x="360" y="548" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="44" fill="#f4c76b" style="direction:ltr">24:00:00.${ms.split('.')[1]}</text></g>`;
  return s;
}
// 8: CTA
function sceneEarth(t) {
  const st = S0(8), k = ease(ramp(t, st - .2, st + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: 1, lights: .4, rot: .8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<g opacity="${k}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 2), WS(8, 2) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSpeed }, { s: S0(2) - .2, f: sceneFling }, { s: S0(3) - .2, f: sceneWind }, { s: S0(4) - .2, f: sceneWave },
  { s: S0(5) - .2, f: sceneMap }, { s: S0(6) - .2, f: sceneDayNight }, { s: S0(7) - .2, f: sceneSlow }, { s: S0(8) - .2, f: sceneEarth },
];
const XF = .5;

// ---------- UI ----------
const TLI = [['التوقّف', S0(2)], ['الرياح', S0(3)], ['الأمواج', S0(4)], ['المحيطات', S0(5)], ['يوم = سنة', S0(6)]];
const LIST_ON = new Set([sceneWind]);
const CHIPS = [
  ['c1', 'خلال ثانية واحدة', 360, 330, 'red', WS(2, 2), WS(2, 10) - .3],
  ['c2', 'رياح أقوى من أي إعصار', 360, 330, 'red', WS(3, 3), S0(4) - .3],
  ['c3', 'أمواج عملاقة', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c4', 'يوم = سنة', 360, 330, 'big', WS(6, 3), S0(7) - .3],
  ['c5', '≈ ٠٫٠٠٢ ثانية كل قرن', 360, 330, 'big', WS(7, 11), S0(8) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 5), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">لو توقّفت الأرض</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  const vis = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act;
    $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + k).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
