
// ===================== "what if the atmosphere vanished?" =====================
const tGone = () => WS(0, 8) - .05;
const blackSky = ['#000000', '#020208', '#06070e'];
// 0: a blue Baghdad sky – then the air is gone: the clouds streak upward and the sky turns black in a heartbeat
function sceneHook(t) {
  const tg = tGone(), k = ease(ramp(t, tg, tg + .6));
  const sky = [mix('#3a7cc4', blackSky[0], k), mix('#8ab8e0', blackSky[1], k), mix('#d2e4f0', blackSky[2], k)];
  let clouds = ''; for (let i = 0; i < 6; i++) { const r = RS(i + 3), cx = 80 + r() * 560, cy = 470 + r() * 200 - k * 600 * (.5 + r()); clouds += `<ellipse cx="${cx}" cy="${cy}" rx="${110 + r() * 60}" ry="${36 + r() * 16 + k * 80}" fill="#fff" opacity="${.85 * (1 - k)}" filter="url(#soft)"/>`; }
  let s = bareStreet(t, { id: 'a0', green: 1, sky, sunGlow: .28 * (1 - k), afterSky: stars(k, t) + clouds });
  s += onWalk(280, 1088, CROWD[0], .55, 1, t, { moving: t < tg ? 1 : 0, phase: t * 6, lookUp: k * .5 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { lookUp: k * .5 });
  F.ov = ''; F.flash = t > tg && t < tg + .4 ? .25 * (1 - (t - tg) / .4) : 0; return s;
}
// 1: a black daytime sky full of stars next to a harsh white Sun; shadows hard and pitch dark
function sceneBlack(t) {
  let s = bareStreet(t, { id: 'a1', green: 1, sky: blackSky, sunGlow: 0, afterSky: stars(1, t) + `<path d="M-20,560 Q200,460 420,500 T760,430" stroke="#cfd8ff" stroke-width="80" fill="none" opacity=".08" filter="url(#haze)"/>` });
  s += `<circle cx="150" cy="470" r="30" fill="#ffffff"/><circle cx="150" cy="470" r="40" fill="#fff" opacity=".5" filter="url(#blur2)"/>`;
  const sh = (x, y) => `<path d="M${x - 10},${y} L${x + 120},${y + 6} L${x + 116},${y + 14} L${x - 10},${y + 8}Z" fill="#000" opacity=".9"/>`;
  s += sh(280, 1088) + sh(520, 1082) + onWalk(280, 1088, CROWD[0], .55, 1, t, { lookUp: .6 }) + onWalk(520, 1082, CROWD[1], .52, -1, t, { lookUp: .6 });
  F.ov = ''; return s;
}
// 2: silence: a car horn and a shop speaker still vibrate, but their sound rings die instantly – nothing carries them
function sceneSilence(t) {
  const st = S0(2) - .2, die = ease(ramp(t, WS(2, 2) - .2, WS(2, 2) + .5));
  let s = bareStreet(t, { id: 'a2', green: 1, sky: blackSky, sunGlow: 0, afterSky: stars(1, t) });
  s += `<circle cx="150" cy="470" r="30" fill="#ffffff"/>`;
  const rings = (x, y, n, col) => Array.from({ length: n }, (_, q) => { const ph = pmod(t * 1.2 + q / n, 1); return `<path d="M${x + 10 + ph * 120},${y - 50 - ph * 60} A${60 + ph * 120},${60 + ph * 120} 0 0 1 ${x + 10 + ph * 120},${y + 50 + ph * 60}" stroke="${col}" stroke-width="${4 - 2 * ph}" fill="none" opacity="${((1 - ph) * (1 - die)).toFixed(2)}"/>`; }).join('');
  s += `<g transform="translate(380,860)"><rect x="-30" y="-24" width="40" height="48" rx="6" fill="#2a2a2e"/><path d="M10,-24 L44,-46 L44,46 L10,24Z" fill="#3a3a40"/><circle cx="-10" cy="0" r="12" fill="#555"/></g>` + rings(424, 860, 4, '#f4c76b');
  s += rings(640, 1150, 4, '#ffffff');
  s += `<g opacity="${die}" transform="translate(360,620)"><circle r="70" fill="#0a0e1c" opacity=".85" stroke="#fff" stroke-width="3"/><path d="M-30,-14 h18 l22,-20 v68 l-22,-20 h-18Z" fill="#fff"/><path d="M22,-20 L50,20 M50,-20 L22,20" stroke="#e53935" stroke-width="6" stroke-linecap="round"/></g>`;
  s += onWalk(280, 1088, CROWD[0], .55, 1, t, { lookUp: .1 });
  F.ov = ''; return s;
}
// 3: wings need air: an airliner's airflow lines vanish and it noses down; birds tumble
function sceneFly(t) {
  const st = S0(3) - .2, T = t - st, k = ease(ramp(t, WS(3, 4) - .3, L(3).end + .2));
  let s = `<defs>${RDEF}</defs><rect width="720" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="600" cy="460" r="26" fill="#fff"/>`;
  s += `<path d="M-20,1060 Q200,1030 400,1050 T740,1040 L740,1290 L-20,1290Z" fill="#6a6258"/><path d="M-20,1060 Q200,1030 400,1050 T740,1040 L740,1290 L-20,1290Z" fill="#000" filter="url(#grainR)" opacity=".4"/>`;
  const px = 360 + T * 20, py = 700 + k * 220, ang = 12 * k;
  s += `<g transform="translate(${px},${py}) rotate(${ang})">` + Array.from({ length: 6 }, (_, q) => `<path d="M${-260 + q * 10},${-30 + q * 14} q120,-10 240,0" stroke="#9ccaff" stroke-width="2" fill="none" opacity="${(.6 * (1 - k)).toFixed(2)}" stroke-dasharray="20 14" stroke-dashoffset="${-t * 200}"/>`).join('') +
    `<path d="M-150,-10 Q-150,-28 -120,-28 L130,-28 Q170,-26 180,-8 Q170,10 130,12 L-120,12 Q-150,12 -150,-10Z" fill="#eef0f2"/><path d="M-150,-10 Q-150,-28 -120,-28 L130,-28 Q170,-26 180,-8 L-150,-6Z" fill="#fff" opacity=".5"/>` + Array.from({ length: 12 }, (_, q) => `<rect x="${-100 + q * 18}" y="-18" width="8" height="8" rx="2" fill="#2a3a4a"/>`).join('') +
    `<path d="M150,-24 Q168,-24 176,-10 L150,-10Z" fill="#2a3a4a"/><path d="M-20,0 L-90,70 L-60,70 L40,4Z" fill="#d8dce0"/><path d="M-130,-20 L-170,-80 L-150,-80 L-100,-24Z" fill="#c62828"/><path d="M-60,30 L-40,52 L-20,52 L-30,26Z" fill="#8a8e94"/></g>`;
  for (let i = 0; i < 5; i++) { const r = RS(i + 40), x = 120 + r() * 480, y = 500 + r() * 200 + k * k * 400, rot = t * 300 * (r() - .5); s += `<g transform="translate(${x},${y}) rotate(${rot})"><path d="M-14,0 Q-6,-8 0,0 Q6,-8 14,0" stroke="#3a3a40" stroke-width="3" fill="none"/><ellipse cx="0" cy="1" rx="5" ry="3" fill="#5a5a62"/></g>`; }
  F.ov = ''; return s;
}
// 4: without air pressure: a gauge drops from 1 atmosphere to zero; a stopwatch: consciousness lasts only seconds
function scenePressure(t) {
  const k = ease(ramp(t, WS(4, 2) - .2, WS(4, 4) + .4)), sec = Math.min(15, Math.max(0, (t - WS(4, 5)) * 8));
  let s = bareStreet(t, { id: 'a4', green: 1, sky: blackSky, sunGlow: 0, afterSky: stars(1, t) }) + `<rect width="720" height="1280" fill="#000" opacity=".45"/>`;
  const a = Math.PI * (1 - (1 - k));
  s += `<g transform="translate(220,700)"><circle r="130" fill="#f4f4f0"/><circle r="130" fill="none" stroke="#333" stroke-width="10"/><path d="M-100,0 A100,100 0 0 1 100,0" stroke="#43a047" stroke-width="14" fill="none"/>` + [0, .25, .5, .75, 1].map(v => `<text x="${-Math.cos(Math.PI * v) * 76}" y="${-Math.sin(Math.PI * v) * 76 + 8}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="18" fill="#333">${v}</text>`).join('') +
    `<path d="M0,0 L${-Math.cos(Math.PI * (1 - k)) * 96},${-Math.sin(Math.PI * (1 - k)) * 96}" stroke="#c62828" stroke-width="6" stroke-linecap="round"/><circle r="10" fill="#333"/><text y="60" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#333">ضغط الهواء</text></g>`;
  const an = Math.PI * 2 * sec / 60;
  s += `<g transform="translate(520,700)"><circle r="110" fill="#f4f4f4"/><circle r="110" fill="none" stroke="#333" stroke-width="9"/><rect x="-14" y="-142" width="28" height="26" rx="5" fill="#333"/><path d="M0,0 L0,-90 A90,90 0 ${an > Math.PI ? 1 : 0},1 ${Math.sin(an) * 90},${-Math.cos(an) * 90}Z" fill="#e53935" opacity=".35"/><rect x="-3" y="-94" width="6" height="94" fill="#c62828" transform="rotate(${an * 180 / Math.PI})"/><circle r="8" fill="#333"/><text y="56" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#222">${String(Math.floor(sec)).padStart(2, '0')}s</text></g>`;
  F.ov = ''; return s;
}
// 5: the sea boils at body temperature because the pressure is gone – then evaporation chills it and the surface freezes into a cracked crust
function sceneBoil(t) {
  const st = S0(5) - .2, boil = ease(ramp(t, WS(5, 1) - .3, WS(5, 2) + .4)) * (1 - ease(ramp(t, WS(5, 11) - .2, L(5).end))), ice = ease(ramp(t, WS(5, 10), L(5).end + .3));
  let s = `<defs>${RDEF}${RDEF2}<linearGradient id="seaB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e5a70"/><stop offset="1" stop-color="#0c2234"/></linearGradient></defs><rect width="720" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="150" cy="470" r="26" fill="#fff"/>`;
  s += `<path d="M-20,820 L120,780 L260,800 L380,760 L520,800 L740,780 L740,860 L-20,860Z" fill="#5a5048" filter="url(#reliefR)"/>`;
  s += `<rect y="850" width="720" height="440" fill="url(#seaB)"/>`;
  for (let k = 0; k < 12; k++) { const y = 860 + Math.pow(k / 11, 1.5) * 420; s += `<path d="M-20,${y} q180,${-4 - Math.sin(t * 9 + k) * 6 * boil} 380,0 t380,0" stroke="${k % 2 ? '#cfe4ee' : '#08202c'}" stroke-width="${1 + k * .2}" fill="none" opacity=".3"/>`; }
  for (let i = 0; i < 90; i++) { const r = RS(i + 7), x = r() * 720, y0 = 870 + Math.pow(r(), 1.3) * 400, ph = pmod(t * (2 + r() * 3) + r(), 1), rr = (2 + r() * 6) * (.5 + (y0 - 860) / 420); s += `<circle cx="${x}" cy="${y0 - ph * 20}" r="${rr * (.5 + ph)}" fill="none" stroke="#e8f4fa" stroke-width="1.6" opacity="${(boil * (1 - ph) * .9).toFixed(2)}"/>`; }
  for (let i = 0; i < 14; i++) { const r = RS(i + 50), ph = pmod(t * .35 + r(), 1), x = r() * 720 + ph * 40; s += `<circle cx="${x}" cy="${860 - ph * 420}" r="${40 + ph * 120}" fill="#e8f0f4" opacity="${(.45 * boil * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; }
  if (ice > 0) { s += `<rect y="850" width="720" height="440" fill="#dfeaf2" opacity="${.92 * ice}"/><rect y="850" width="720" height="440" fill="#fff" filter="url(#stainD)" opacity="${.5 * ice}"/>` + cracks(860, 1290, ice, 77, -20, 740, '#7a98b0'); }
  F.ov = ''; return s;
}
// 6a: with no ozone the full ultraviolet reaches the ground – violet rays scorch the street
function sceneUV(t) {
  const k = ease(ramp(t, WS(6, 3) - .2, WS(6, 6) + .3));
  let s = bareStreet(t, { id: 'a6', green: 0, sky: blackSky, sunGlow: 0, afterSky: stars(1, t) }) + `<circle cx="150" cy="470" r="30" fill="#fff"/>`;
  for (let i = 0; i < 10; i++) { const x2 = 60 + i * 70, y2 = 1000 + (i % 3) * 40; s += `<path d="M150,470 L${x2},${y2}" stroke="#b46aff" stroke-width="${3 + (i % 2) * 2}" opacity="${(.55 * k).toFixed(2)}" stroke-dasharray="14 10" stroke-dashoffset="${-t * 300}"/>`; }
  s += `<rect width="720" height="1280" fill="#8a3aff" opacity="${.08 * k}"/>` + onWalk(300, 1088, CROWD[0], .55, 1, t, { lookUp: .2 });
  F.ov = ''; return s;
}
// 6b: meteors no longer burn up: dark rocks hit the ground at full speed, throwing up dust – no glowing trails
function sceneMeteors(t) {
  let s = `<defs>${RDEF}${RDEF2}</defs><rect width="720" height="1280" fill="#020208"/>` + stars(1, t);
  s += `<path d="M-20,900 Q200,860 400,880 T740,870 L740,1290 L-20,1290Z" fill="#7a6e62" filter="url(#reliefR)"/><path d="M-20,900 Q200,860 400,880 T740,870 L740,1290 L-20,1290Z" fill="#000" filter="url(#pebT)" opacity=".5"/>`;
  const st = WS(6, 8) - .3;
  for (let i = 0; i < 5; i++) { const r = RS(i + 9), t0 = st + i * .6, ph = t - t0, x1 = 120 + r() * 480, y1 = 960 + r() * 220, x0 = x1 + 400, y0 = y1 - 900;
    if (ph > 0 && ph < .5) { const u = ph / .5; s += `<circle cx="${lerp(x0, x1, u)}" cy="${lerp(y0, y1, u)}" r="${5 + r() * 5}" fill="#4a4038"/>`; }
    if (ph >= .5) { const v = Math.min(1, (ph - .5) / 1.2); s += `<ellipse cx="${x1}" cy="${y1}" rx="${30 + 30 * r()}" ry="${10 + 8 * r()}" fill="#2a241e"/><ellipse cx="${x1}" cy="${y1 - 2}" rx="${(30 + 30 * r()) * .8}" ry="${(10 + 8 * r()) * .6}" fill="#4a4036"/>` + `<circle cx="${x1}" cy="${y1 - 40 * v}" r="${30 + 90 * v}" fill="#b8aa98" opacity="${(.6 * (1 - v)).toFixed(2)}" filter="url(#soft)"/>`; } }
  F.ov = ''; return s;
}
// 7: day scorching, night freezing – like the surface of the Moon (split screen)
function sceneMoonlike(t) {
  let s = `<defs>${RDEF}${RDEF2}<clipPath id="cL7"><rect width="358" height="1280"/></clipPath><clipPath id="cR7"><rect x="362" width="358" height="1280"/></clipPath></defs>`;
  s += `<g clip-path="url(#cL7)"><rect width="360" height="1280" fill="#020208"/>` + stars(1, t) + `<circle cx="180" cy="500" r="30" fill="#fff"/><path d="M-20,900 Q120,870 360,890 L360,1290 L-20,1290Z" fill="#c8b490" filter="url(#reliefR)"/><rect y="880" width="360" height="410" fill="#ff8a3a" opacity=".12"/>` +
    Array.from({ length: 6 }, (_, i) => `<path d="M-20,${900 + i * 22} q90,${Math.sin(t * 5 + i) * 6} 190,0 t190,0" stroke="#fff" stroke-width="2" fill="none" opacity=".2"/>`).join('') + `<text x="180" y="1220" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#ffb060" style="paint-order:stroke" stroke="#000" stroke-width="4">النهار: حارق</text></g>`;
  s += `<g clip-path="url(#cR7)"><rect x="360" width="360" height="1280" fill="#000"/>` + stars(1, t) + `<path d="M360,900 Q500,870 720,890 L720,1290 L360,1290Z" fill="#3a4250" filter="url(#reliefR)"/><path d="M360,900 Q500,870 720,890 L720,1290 L360,1290Z" fill="#e8f2fa" filter="url(#stainD)" opacity=".6"/>` +
    `<text x="540" y="1220" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#9ccaff" style="paint-order:stroke" stroke="#000" stroke-width="4">الليل: متجمّد</text></g><rect x="358" width="4" height="1280" fill="#f4c76b"/>`;
  s += thermoC(90, 520, 860, 38) + thermoC(450, 520, 860, -28);
  F.ov = ''; return s;
}
// 8: CTA – the thin blue line: the atmosphere is thinner, relative to Earth, than the skin of an apple
function sceneEarth(t) {
  const k = ease(ramp(t, WS(8, 2) - .2, WS(8, 4) + .3)), q = ease(ramp(t, WS(8, 9) - .2, WS(8, 9) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 760, r: 250, a: 1, sunI: 1, lights: .3, rot: 4.8, tilt: .41 }; F.light = [-800, 300]; F.moon = null;
  F.ov = `<circle cx="360" cy="760" r="254" fill="none" stroke="#7ab4ff" stroke-width="4" opacity="${k}"/><g opacity="${k}"><path d="M560,600 L640,520" stroke="#fff" stroke-width="2"/><text x="640" y="508" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff">أرقّ من قشرة التفاحة</text></g>` +
    `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="200" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 10), WS(8, 10) + .4)}" transform="translate(360,${1090 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneBlack }, { s: S0(2) - .2, f: sceneSilence }, { s: S0(3) - .2, f: sceneFly }, { s: S0(4) - .2, f: scenePressure },
  { s: S0(5) - .2, f: sceneBoil }, { s: S0(6) - .2, f: sceneUV }, { s: WS(6, 8) - .3, f: sceneMeteors }, { s: S0(7) - .2, f: sceneMoonlike }, { s: S0(8) - .2, f: sceneEarth },
];
const XF = .5;
const TLI = [['السماء', S0(1)], ['الصوت', S0(2)], ['الطيران', S0(3)], ['المحيطات', S0(5)], ['الأشعة', S0(6)]];
const LIST_ON = new Set([sceneBlack, sceneUV]);
const CHIPS = [
  ['c1', 'سماء سوداء في النهار', 360, 330, 'big', WS(1, 5), S0(2) - .3],
  ['c2', 'صمت تام', 360, 330, 'big', WS(2, 2), S0(3) - .3],
  ['c3', 'لا هواء يحمل الأجنحة', 360, 330, 'big', WS(3, 5), S0(4) - .3],
  ['c4', 'ثوانٍ فقط', 360, 330, 'red', WS(4, 7), S0(5) - .3],
  ['c5', 'تغلي… ثم تتجمّد', 360, 330, 'big', WS(5, 2), S0(6) - .3],
  ['c6', 'أشعة فوق بنفسجية كاملة', 360, 330, 'red', WS(6, 4), WS(6, 8) - .3],
  ['c7', 'النيازك تصل الأرض', 360, 330, 'red', WS(6, 9), S0(7) - .3],
  ['c8', 'مثل سطح القمر', 360, 330, 'big', WS(7, 5), S0(8) - .3],
  ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 12), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:290px"><div class="hd">بلا غلاف جوي</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0;
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = k <= act, cur = k === act; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
