// ---------- #54 scenes 8-12: GPS atomic clocks, a world without exact time, the body's own clock, the end ----------
const TMDEF3 = `<linearGradient id="foilG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4d27a"/><stop offset=".4" stop-color="#c8962a"/><stop offset=".7" stop-color="#f0c860"/><stop offset="1" stop-color="#8a6418"/></linearGradient>` +
  `<linearGradient id="pvG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a4a8a"/><stop offset="1" stop-color="#14244a"/></linearGradient>` +
  `<linearGradient id="mapB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef0ea"/><stop offset="1" stop-color="#e2e6dc"/></linearGradient>` +
  `<radialGradient id="scnG"><stop offset="0" stop-color="#fff4c8" stop-opacity=".95"/><stop offset=".4" stop-color="#f4c76b" stop-opacity=".5"/><stop offset="1" stop-color="#f4c76b" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="bodyBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1024"/><stop offset="1" stop-color="#1a2440"/></linearGradient>`;
const TMDEFS3 = () => TMDEFS2() + GDEF + TMDEF3;
// ---------- 8: GPS: an atomic clock in every satellite; a millionth of a second = 300 m ----------
function gpsSat(x, y, s) {
  let g = `<rect x="-150" y="-26" width="104" height="52" fill="url(#pvG)"/><rect x="46" y="-26" width="104" height="52" fill="url(#pvG)"/>` +
    [-150, 46].map(px => Array.from({ length: 4 }, (_, i) => `<path d="M${px + 26 * (i + 1)},-26 v52" stroke="#6a8ac8" stroke-width="1" opacity=".6"/>`).join('') + `<path d="M${px},0 h104" stroke="#6a8ac8" stroke-width="1" opacity=".6"/>`).join('') +
    `<path d="M-46,0 H46" stroke="#c8ccd2" stroke-width="4"/><rect x="-34" y="-40" width="68" height="80" rx="4" fill="url(#foilG)"/><rect x="-34" y="-40" width="68" height="80" rx="4" fill="#000" filter="url(#grainR)" opacity=".2"/>` +
    `<path d="M-22,40 l-8,22 h60 l-8,-22" fill="#d8dce0"/><circle cx="0" cy="66" r="10" fill="#e8ecf0"/>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${g}</g>`;
}
function atomI(x, y, r, t) { return `<g transform="translate(${x},${y})">${[0, 60, 120].map(a => `<ellipse rx="${r}" ry="${r * .36}" fill="none" stroke="#7fd4ff" stroke-width="2.4" transform="rotate(${a})"/>`).join('')}<circle r="${r * .18}" fill="#f4c76b"/>` +
  [0, 60, 120].map((a, i) => { const q = t * 3 + i * 2; return `<circle cx="${(Math.cos(q) * r).toFixed(1)}" cy="${(Math.sin(q) * r * .36).toFixed(1)}" r="4" fill="#fff" transform="rotate(${a})"/>`; }).join('') + `</g>`; }
function mapInset(x, y, w, h, k, t) {   // a street map: where you are, and where a clock off by 1 µs puts you (300 m away)
  let s = `<rect x="${x - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="20" fill="#0a0e1c" opacity=".9"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="url(#mapB)"/>`;
  s += `<clipPath id="mclip"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12"/></clipPath><g clip-path="url(#mclip)">`;
  s += `<path d="M${x + 300},${y} q60,${h * .4} 10,${h}" stroke="#a8d0ea" stroke-width="26" fill="none"/>` + `<rect x="${x + 30}" y="${y + 40}" width="110" height="80" rx="8" fill="#cfe4c0"/>`;
  for (let i = 0; i < 7; i++) s += `<path d="M${x},${y + 30 + i * 52} H${x + w}" stroke="#fff" stroke-width="${i % 3 ? 7 : 12}"/>`;
  for (let i = 0; i < 9; i++) s += `<path d="M${x + 20 + i * 64},${y} V${y + h}" stroke="#fff" stroke-width="${i % 4 ? 7 : 12}"/>`;
  s += `<path d="M${x},${y + 30 + 3 * 52} H${x + w}" stroke="#f4d27a" stroke-width="12"/></g>`;
  const ax = x + 120, ay = y + 186, bx = ax + 300 * k, by = ay - 40 * k;
  s += `<circle cx="${ax}" cy="${ay}" r="34" fill="#2a8aff" opacity=".18"/><circle cx="${ax}" cy="${ay}" r="12" fill="#2a8aff" stroke="#fff" stroke-width="4"/>${lbl(ax, ay + 46, 'أنتَ هنا', 1, '#1a3a6a', 22).replace('stroke="#000" stroke-width="5"', 'stroke="#fff" stroke-width="5"')}`;
  if (k > 0) s += `<path d="M${ax},${ay} L${bx.toFixed(1)},${by.toFixed(1)}" stroke="#d8281a" stroke-width="3" stroke-dasharray="8 6"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="12" fill="#d8281a" stroke="#fff" stroke-width="4"/>` +
    `<g opacity="${clamp((k - .7) / .3).toFixed(2)}">${lbl((ax + bx) / 2, (ay + by) / 2 - 18, '٣٠٠ متر', 1, '#d8281a', 26).replace('stroke="#000" stroke-width="5"', 'stroke="#fff" stroke-width="6"')}</g>`;
  return s;
}
function sceneGPS(t) {
  const t0 = S0(8) - .2, T = t - t0, ia = ease(ramp(t, WS(8, 8) - .3, WS(8, 8) + .2)) * (1 - ease(ramp(t, WS(8, 10) - .3, WS(8, 10)))), ma = ease(ramp(t, WS(8, 10) - .3, WS(8, 10) + .1));
  const G = gAt(t, 360, lerp(760, 820, ma), { d: lerp(7.6, 7.0, ease(clamp(T / 4))), el: .3, lon: 20 + T * 3, clouds: .35, lights: .4, off: -.4 });
  let o = `<defs>${TMDEFS3()}</defs>` + sats(G, t, 1);
  if (ia > 0) { const us = Math.floor((t * 1e6) % 1e6), st = String(us).padStart(6, '0');
    o += `<g opacity="${ia.toFixed(2)}">${panel(70, 400, 580, 230)}${gpsSat(230, 512, .95)}${atomI(500, 486, 54, t)}` +
      `<rect x="402" y="560" width="196" height="44" rx="8" fill="#050810"/><text x="500" y="592" text-anchor="middle" font-family="DejaVu Sans Mono,monospace" font-size="22" fill="#7fd4ff">12:00:00.${st}</text></g>`; }
  if (ma > 0) { const k = ease(ramp(t, WS(8, 12), WS(8, 16)));
    o += `<g opacity="${ma.toFixed(2)}">${mapInset(100, 400, 520, 320, k, t)}<g opacity="${ease(ramp(t, WS(8, 13), WS(8, 13) + .3)).toFixed(2)}">${panel(170, 740, 380, 60)}<text x="360" y="780" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="26" fill="#ff8a7a" direction="rtl" unicode-bidi="plaintext">خطأُ الساعة: ٠٫٠٠٠٠٠١ ثانية</text></g></g>`; }
  F.ov = o; return space(t);
}
// ---------- 9: without exact time: lost maps, dead networks, frozen banks ----------
function sceneChaos(t) {
  const t0 = S0(9) - .2, T = t - t0, pa = ease(ramp(t, WS(9, 3) - .3, WS(9, 3) + .2)), na = ease(ramp(t, WS(9, 5) + .3, WS(9, 6) + .2)), ba = ease(ramp(t, WS(9, 8) - .2, WS(9, 8) + .2));
  const PP = [[120, 1, .86, 5], [560, -1, .84, 2], [650, -1, .8, 8]];
  let fg = ''; PP.forEach(([x, f, sc, pi], j) => { fg += man(x, 1090, sc, f, pi, { lookUp: 0 }); });
  let s = street11(t, { N: .85, id: 'c', fg, cars: 0, mid: dialF(360, PV - 370, 64, 0, 0, { k: 1 }) });
  const r = RS(5), jx = Math.sin(t * 7) * 60 + Math.sin(t * 11) * 30, jy = Math.cos(t * 9) * 50;
  const inner = `<rect x="0" y="0" width="300" height="560" rx="34" fill="#e8ece4"/>` + Array.from({ length: 8 }, (_, i) => `<path d="M0,${40 + i * 70} H300" stroke="#fff" stroke-width="10"/><path d="M${20 + i * 40},0 V560" stroke="#fff" stroke-width="8"/>`).join('') +
    `<circle cx="${(150 + jx).toFixed(1)}" cy="${(300 + jy).toFixed(1)}" r="60" fill="#2a8aff" opacity=".15"/><circle cx="${(150 + jx).toFixed(1)}" cy="${(300 + jy).toFixed(1)}" r="13" fill="#2a8aff" stroke="#fff" stroke-width="4"/>` +
    `<rect x="16" y="56" width="268" height="62" rx="14" fill="#d8281a"/><text x="150" y="97" text-anchor="middle" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">الموقعُ غيرُ معروف</text>`;
  if (pa > 0) s += `<g opacity="${pa.toFixed(2)}" transform="translate(0,${((1 - pa) * 60).toFixed(1)})">${bigPhone(80, 420, 300, 560, inner)}</g>`;
  s += noSignal(540, 520, na);
  if (ba > 0) s += `<g opacity="${ba.toFixed(2)}" transform="translate(540,760)"><rect x="-96" y="-60" width="192" height="120" rx="14" fill="#2a4a8a"/><rect x="-96" y="-30" width="192" height="24" fill="#0a1a3a"/><rect x="-70" y="10" width="40" height="30" rx="5" fill="#d8b860"/>` +
    `<circle cx="70" cy="40" r="34" fill="#d8281a" stroke="#fff" stroke-width="4"/><path d="M56,26 l28,28 M84,26 l-28,28" stroke="#fff" stroke-width="7" stroke-linecap="round"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: the twist: your brain has its own clock (about 24 hours) ----------
function sceneBody(t) {
  const t0 = S0(10) - .2, T = t - t0, ha = ease(ramp(t, t0, t0 + .6)), ga = ease(ramp(t, WS(10, 6) - .2, WS(10, 8))), ra = ease(ramp(t, WS(10, 9) - .3, WS(10, 12)));
  let s = `<defs>${TMDEFS3()}${DEFN()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#bodyBg)"/>`;
  { const r = RS(61); for (let i = 0; i < 70; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(.5 + r()).toFixed(1)}" fill="#fff" opacity="${(.15 + r() * .3).toFixed(2)}"/>`; }
  const cx = 380, cy = 690, R = 300;
  // the 24-hour ring: day half gold, night half blue; the sun and the moon travel round it
  if (ra > 0) { s += `<g opacity="${ra.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5" stroke-dasharray="${(R * 6.2832 * ra / 2).toFixed(0)} 9999" transform="rotate(-90,${cx},${cy})"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#5a7ad8" stroke-width="5" stroke-dasharray="0 ${(R * 3.1416).toFixed(0)} ${(R * 6.2832 * ra / 2).toFixed(0)} 9999" transform="rotate(-90,${cx},${cy})"/>`;
    for (let h = 0; h < 24; h++) { const q = h / 24 * 6.2832 - 1.5708; s += `<path d="M${(cx + Math.cos(q) * (R - 10)).toFixed(1)},${(cy + Math.sin(q) * (R - 10)).toFixed(1)} L${(cx + Math.cos(q) * (R + 10)).toFixed(1)},${(cy + Math.sin(q) * (R + 10)).toFixed(1)}" stroke="#fff" stroke-width="${h % 6 ? 1.5 : 3.5}" opacity=".6"/>`; }
    const q = (T * .9) % 6.2832 - 1.5708, sx = cx + Math.cos(q) * R, sy = cy + Math.sin(q) * R, mx = cx - Math.cos(q) * R, my = cy - Math.sin(q) * R;
    s += `<circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="30" fill="#fff4cf" opacity=".35" filter="url(#blur9)"/><circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="18" fill="#fffbe8"/>` + moonPh(Math.round(mx), Math.round(my), 16, .62, 1) + `</g>`; }
  s += `<g opacity="${ha.toFixed(2)}" transform="translate(${cx - 400 * .78},${cy - 700 * .78}) scale(.78)">${brainSVG(0, 0, t, 1)}</g>`;
  // the master clock: the suprachiasmatic nucleus, just above where the optic nerves cross
  const nx = cx + (446 - 400) * .78, ny = cy + (668 - 700) * .78, pu = 1 + .15 * Math.sin(t * 4);
  if (ga > 0) s += `<g opacity="${ga.toFixed(2)}"><circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="${(46 * pu).toFixed(1)}" fill="url(#scnG)"/><circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="7" fill="#fff8e0"/>` +
    `<path d="M${(nx + 10).toFixed(1)},${(ny + 10).toFixed(1)} L${(nx + 120).toFixed(1)},${(ny + 230).toFixed(1)} H${(nx + 220).toFixed(1)}" stroke="#f4c76b" stroke-width="2.4" fill="none"/>${panel(nx + 60, ny + 238, 220, 64)}${lbl(nx + 170, ny + 281, 'ساعةُ الجسم', 1, '#f4c76b', 28)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 11: we didn't invent time: we found it in the sky, and in ourselves ----------
function sceneDawn(t) {
  const t0 = S0(11) - .2, T = t - t0, d = ease(ramp(t, t0, WS(11, 7) + .6)), su = ease(ramp(t, WS(11, 5), WS(11, 9) + .4));
  const top = mix('#060a1e', '#3a6ab0', d), mid = mix('#1a1e40', '#e89a6a', d), bot = mix('#2a2448', '#ffd8a0', d);
  let s = `<defs>${TMDEFS3()}<linearGradient id="skD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset=".6" stop-color="${mid}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#skD)"/>`;
  { const r = RS(19); for (let i = 0; i < 150; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 820).toFixed(1)}" r="${(.5 + r() * 1.3).toFixed(1)}" fill="#fff" opacity="${((1 - d) * (.3 + .6 * r())).toFixed(2)}"/>`; }
  const sy = lerp(980, 760, su);
  s += `<circle cx="520" cy="${sy.toFixed(1)}" r="260" fill="url(#sunW)" opacity="${(.9 * su).toFixed(2)}"/><circle cx="520" cy="${sy.toFixed(1)}" r="30" fill="#fffdf4" opacity="${su.toFixed(2)}"/>`;
  s += cumulus(160 + T * 5, 560, 260, 111, { a: .25 + .5 * d }) + cumulus(600 + T * 3, 640, 200, 113, { a: .2 + .4 * d });
  s += `<g>${mountainsR(900, 160, 31, { rock: mix('#1a1a30', '#6a5a7a', d) })}</g>`;
  s += `<path d="M-40,1300 L-40,1000 Q180,880 360,960 Q520,1030 760,980 L760,1300Z" fill="${mix('#0a0a18', '#3a3040', d)}"/><path d="M-40,1300 L-40,1080 Q200,1000 420,1080 Q600,1140 760,1100 L760,1300Z" fill="${mix('#06060e', '#2a2230', d)}"/>`;
  s += man(330, 1010, .9, 1, 3, { lookUp: 0 });
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(12, 0) - .2, WS(12, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 0 - (t - S0(12)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(12, 10) - .3, WS(12, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSky }, { s: S0(2) - .2, f: sceneNile }, { s: S0(3) - .2, f: sceneSeason }, { s: S0(4) - .2, f: sceneBabylon }, { s: S0(5) - .2, f: sceneWreck },
  { s: S0(6) - .2, f: sceneH4 }, { s: S0(7) - .2, f: sceneRail }, { s: WS(7, 7) - .25, f: sceneGreenwich }, { s: S0(8) - .2, f: sceneGPS }, { s: S0(9) - .2, f: sceneChaos }, { s: S0(10) - .2, f: sceneBody }, { s: S0(11) - .2, f: sceneDawn }, { s: S0(12) - .2, f: sceneEarth }];
const NOKB = new Set([sceneGreenwich, sceneGPS, sceneBody]);
const XF = .5;
const TLI = [['الشمسُ والقمر', S0(1)], ['التقويم', S0(2)], ['الساعةُ البحريّة', S0(6)], ['الساعةُ الذرّيّة', S0(8)]];
const LIST_ON = new Set([sceneSeason, sceneWreck, sceneDawn]);
const CHIPS = [
  ['c1', 'الشمسُ = يوم', 360, 330, 'big', WS(1, 7), WS(1, 9) - .1],
  ['c1b', 'القمرُ = شهر', 360, 330, 'big', WS(1, 9), S0(2) - .3],
  ['c2', 'تقويمُ النيل', 360, 330, 'big', WS(2, 3), S0(3) - .3],
  ['c3', 'متى نزرع؟', 360, 330, 'red big', WS(3, 3), S0(4) - .3],
  ['c4', 'العدد ٦٠', 360, 330, 'big', WS(4, 4), S0(5) - .3],
  ['c5', 'أين نحن؟', 360, 330, 'red big', WS(5, 5), WS(5, 12) - .1],
  ['c5b', '١٧٠٧ — أكثرُ من ١٤٠٠ بحّار', 360, 330, 'red big', WS(5, 12), S0(6) - .3],
  ['c6', 'السفينةُ تعرفُ مكانَها', 360, 330, 'big', WS(6, 5), S0(7) - .3],
  ['c7', 'لكلِّ مدينةٍ وقتُها', 360, 330, 'red big', WS(7, 3), WS(7, 7) - .3],
  ['c7b', 'غرينتش ١٨٨٤', 360, 330, 'big', WS(7, 10), S0(8) - .3],
  ['c8', 'ساعةٌ ذرّيّة', 360, 330, 'big', WS(8, 8), WS(8, 10) - .1],
  ['c8b', 'جزءٌ من مليونٍ من الثانية = ٣٠٠ م', 360, 330, 'red big', WS(8, 10), S0(9) - .3],
  ['c9', 'بلا وقتٍ دقيق', 360, 330, 'red big', WS(9, 0), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', S0(10), WS(10, 9) - .1],
  ['c10b', '≈ ٢٤ ساعة', 360, 330, 'big', WS(10, 11), S0(11) - .3],
  ['c11', 'في السماءِ وفي نفسِه', 360, 330, 'big', WS(11, 7), S0(12) - .3],
  ['c12', '@MadhaLawLab', 360, 1200, 'dark', WS(12, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">كيف عرفنا الوقت؟</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
