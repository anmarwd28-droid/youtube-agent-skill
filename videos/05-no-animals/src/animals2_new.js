// ===== same look as the earlier Shorts: illustrated street, the same people, the real 3D Earth =====
//@@FISH@@
//@@CORAL@@
function dog(x, y, s, t, ph, moving, a = 1) {
  const lg = k => { const sw = moving ? Math.sin(ph + k) * .5 : 0; return sw; };
  const leg = (lx, k, c) => { const a1 = lg(k), kx = lx + Math.sin(a1) * 26, ky = -34 + Math.cos(a1) * 26; return `<path d="M${lx},-40 L${kx},${ky} L${kx + Math.sin(a1 - .3 * (moving ? 1 : 0)) * 24},${ky + 24}" stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const tail = Math.sin(t * 8) * 10;
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><defs><linearGradient id="dgG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8925a"/><stop offset="1" stop-color="#8a5a30"/></linearGradient></defs>` +
    `<ellipse cx="0" cy="2" rx="70" ry="8" fill="#000" opacity=".25" filter="url(#blur2)"/>` + leg(-30, Math.PI, '#7a4a24') + leg(34, 0, '#7a4a24') +
    `<path d="M-50,-44 C-56,-74 -20,-86 20,-82 C46,-80 58,-66 56,-46 C54,-36 -44,-32 -50,-44Z" fill="url(#dgG)"/>` +
    `<path d="M-50,-60 q-24,${-16 - tail} -30,${-30 - tail}" stroke="#a8743e" stroke-width="8" fill="none" stroke-linecap="round"/>` +
    `<path d="M44,-70 C50,-98 72,-108 92,-100 C106,-94 110,-82 104,-74 L84,-66 C70,-62 52,-60 44,-70Z" fill="url(#dgG)"/><path d="M96,-80 l14,4 q2,6 -4,8 l-12,-2Z" fill="#a8743e"/><circle cx="111" cy="-77" r="3.4" fill="#1a1008"/>` +
    `<path d="M66,-98 C60,-112 72,-118 80,-106 C82,-96 76,-88 70,-88Z" fill="#6a3a1a"/><circle cx="88" cy="-88" r="3" fill="#1a1008"/><circle cx="89" cy="-89" r="1" fill="#fff"/>` +
    `<path d="M54,-70 L62,-62" stroke="#c83a2a" stroke-width="5"/>` + leg(-22, 0, '#a8743e') + leg(42, Math.PI, '#a8743e') + `</g>`;
}
function perchBird(x, y, s, t, a = 1, seed = 0) {
  const hop = Math.max(0, Math.sin(t * 3 + seed * 2)) * 2, tilt = Math.sin(t * 1.7 + seed) * 8;
  return `<g transform="translate(${x},${y - hop}) scale(${s})" opacity="${a}"><path d="M-16,-6 C-16,-20 8,-24 14,-12 C18,-4 10,4 -2,4 L-22,10 L-18,0Z" fill="#6a4a30"/><path d="M-10,-10 C-4,-16 8,-14 10,-8" stroke="#a8825a" stroke-width="3" fill="none"/>` +
    `<g transform="rotate(${tilt},10,-14)"><circle cx="12" cy="-16" r="8" fill="#7a5a3a"/><path d="M19,-17 l7,2 l-7,2Z" fill="#e8a020"/><circle cx="14" cy="-18" r="1.6" fill="#111"/></g>` +
    `<ellipse cx="2" cy="-4" rx="8" ry="5" fill="#d8c0a0" opacity=".7"/><path d="M-2,4 l-2,8 M4,4 l2,8" stroke="#3a2a1a" stroke-width="1.6"/></g>`;
}
function pigeon(x, y, s, t, a = 1, seed = 0) {
  const pk = Math.max(0, Math.sin(t * 2.4 + seed * 1.7)) * 10;
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><ellipse cx="0" cy="2" rx="22" ry="4" fill="#000" opacity=".25" filter="url(#blur1)"/>` +
    `<path d="M-24,-14 C-26,-30 6,-36 16,-24 C22,-16 16,-6 4,-4 L-30,-2 Z" fill="#7a8090"/><path d="M-20,-20 C-10,-28 4,-26 10,-20" stroke="#5a6070" stroke-width="5" fill="none"/>` +
    `<g transform="translate(14,${-24 + pk}) rotate(${pk * 3})"><circle r="8" fill="#6a7080"/><path d="M2,-2 C8,0 8,6 2,8" fill="#4a8a6a" opacity=".8"/><path d="M7,-1 l6,2 l-6,2Z" fill="#c8b8a0"/><circle cx="3" cy="-2" r="1.6" fill="#c84a1a"/></g>` +
    `<path d="M-2,-4 l-2,6 M6,-4 l2,6" stroke="#c86a5a" stroke-width="2"/></g>`;
}
function morningStreet(t, look, walkUntil, glow = 0) {
  let s = `<defs><linearGradient id="mnS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${mix('#4a7ac0', '#8a9aaa', glow)}"/><stop offset="1" stop-color="${mix('#f0d0a8', '#d8d4cc', glow)}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#mnS)"/>`;
  s += `<circle cx="560" cy="560" r="230" fill="#fff2c8" opacity=".55" filter="url(#soft)"/><circle cx="560" cy="560" r="44" fill="#fff6d8" opacity=".9"/>`;
  s += skyline(5, 930, '#8aa0b8', 0, 0) + skyline(8, 990, '#6a8098', 0, 0);
  s += `<rect y="985" width="720" height="295" fill="#9a9084"/><rect y="985" width="720" height="8" fill="#c8bca8"/><rect y="1090" width="720" height="190" fill="#4a4a4e"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 140 + 20}" y="1180" width="70" height="8" fill="#ddd" opacity=".6"/>`).join('');
  s += lampPost(40, 990, 300, 0) + lampPost(680, 990, 300, 0) + palm(560, 992, 250, '#3d4a3a', t);
  return s;
}
// L0: morning street: birds on the wire, pigeons, a dog on a leash; they all vanish, the people stop and look around
function sceneMorning(t) {
  const vt = W(0, 9)[1] - .3, gone = ease(ramp(t, vt, vt + .7)), look = ease(ramp(t, vt + .3, vt + 1.2));
  let s = morningStreet(t, look, vt);
  // wire with perched birds
  s += `<path d="M40,700 Q360,760 680,700" stroke="#1a1c22" stroke-width="3" fill="none"/>`;
  for (let i = 0; i < 9; i++) { const u = (i + .5) / 9, x = lerp(40, 680, u), y = 700 + 4 * u * (1 - u) * 60; s += perchBird(x, y - 1, 1, t, 1 - gone, i); }
  if (gone > 0 && gone < 1) { const r = RS(7); let m = ''; for (let i = 0; i < 80; i++) { const u = r(), x = lerp(40, 680, u), y = 700 + 4 * u * (1 - u) * 60 - 12, a = r() * 6.28, d = gone * 40; m += `<circle cx="${x + Math.cos(a) * d}" cy="${y + Math.sin(a) * d}" r="1.6" fill="#fff" opacity="${1 - gone}"/>`; } s += m; }
  // pigeons on the pavement
  [[150, 1060], [210, 1068], [600, 1062]].forEach(([x, y], i) => { s += pigeon(x, y, .9, t, 1 - gone, i); });
  // people walking, then they stop and look around; the dog owner keeps an empty leash
  CROWD.forEach((c, i) => {
    const stopT = vt + .1 + i * .12, wt = Math.min(t, stopT) + .6, SPD = 300 * c.s * 1.05 * Math.sin(.34) * 4.0 / Math.PI, x = c.x + c.dir * wt * SPD * .55;
    s += person(x, 1000 + (i % 2) * 14, { s: c.s * 1.05, face: c.dir, moving: t < stopT, phase: wt * 4.0, amp: .34, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, lookUp: look * (i % 2 ? .5 : .2), t });
    if (i === 2) { const dx = x + 150, dw = Math.min(t, stopT) + .6; s += dog(dx, 1046, .8, t, dw * 8, t < stopT, 1 - gone);
      s += `<path d="M${x + 22},${1000 - 150 * c.s} Q${x + 90},${gone > .5 ? 1020 : 960} ${gone > .5 ? x + 60 : dx + 52},${gone > .5 ? 1040 : 1046 - 56}" stroke="#c83a2a" stroke-width="2.4" fill="none"/>`; }
  });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L1: no birds in the sky (over the city), no fish in the sea, no cat in the street
function sceneEmpty2(t) {
  const c1 = WS(1, 4) - .1, c2 = WS(1, 8) - .1; let s = '';
  if (t < c1) { const gone = ease(ramp(t, WS(1, 1) + .1, WS(1, 3) + .3));
    s += `<defs><linearGradient id="e2S" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a5a8a"/><stop offset="1" stop-color="#f0c8a0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#e2S)"/>`;
    const r = RS(41); let m = ''; for (let i = 0; i < 70; i++) { const row = Math.floor(i / 10), k = i % 10, x = 120 + k * 50 + row * 14 + Math.sin(t * 2 + i) * 6 + t * 30, y = 420 + row * 40 + Math.abs(k - 5) * 14, f = Math.sin(t * 9 + i) * 5;
      m += `<path d="M${x - 12},${y} Q${x - 6},${y - 6 - f} ${x},${y} Q${x + 6},${y - 6 - f} ${x + 12},${y}" stroke="#1a1c28" stroke-width="2.6" fill="none" opacity="${(1 - gone) * (.6 + .4 * r())}"/>`; }
    s += m + skyline(5, 1040, '#5a6a80', 0, .2) + skyline(9, 1100, '#3a4458', 0, .2) + `<rect y="1095" width="720" height="185" fill="#2a2e3a"/>`;
  } else if (t < c2) { const gone = ease(ramp(t, WS(1, 6), WS(1, 7) + .4));
    s += `<defs><linearGradient id="e2W" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a7aa8"/><stop offset=".5" stop-color="#0e3a5e"/><stop offset="1" stop-color="#04121e"/></linearGradient><linearGradient id="e2R" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f6ff" stop-opacity=".35"/><stop offset="1" stop-color="#e8f6ff" stop-opacity="0"/></linearGradient></defs><rect width="720" height="1280" fill="url(#e2W)"/>` +
      [-1, -.4, .2, .8].map((u, i) => `<polygon points="${360 + u * 140},0 ${400 + u * 140},0 ${430 + u * 320},1280 ${290 + u * 320},1280" fill="url(#e2R)" opacity="${.6 + .3 * Math.sin(t + i)}"/>`).join('');
    let f = ''; for (let i = 0; i < 9; i++) { const x = pmod(t * (40 + i * 6) + i * 160, 900) - 90, y = 420 + i * 70 + Math.sin(t + i) * 12; f += `<g opacity="${1 - gone}">${fishSVG(x, y, 60 + (i % 3) * 18, 1, t, ['#9fb3c0', '#c8a878', '#d8c0b0'][i % 3], 40 + i)}</g>`; }
    s += f + `<path d="M-20,1150 C200,1120 500,1140 740,1110 L740,1300 L-20,1300Z" fill="#1a2228"/>`;
  } else { const gone = ease(ramp(t, WS(1, 10), WS(1, 10) + .7));
    s += `<defs><linearGradient id="e2N" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05070f"/><stop offset="1" stop-color="#141a2a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#e2N)"/>` + stars(.5, t);
    s += skyline(11, 900, '#0f1424', 0, .5) + `<rect y="895" width="720" height="385" fill="#14161f"/>` + lampPost(420, 1000, 360, 1);
    s += `<rect x="-20" y="900" width="560" height="120" fill="#3a3430"/>` + Array.from({ length: 3 }, (_, i) => `<line x1="-20" y1="${920 + i * 32}" x2="540" y2="${920 + i * 32}" stroke="#241e1a" stroke-width="3"/>`).join('') + `<rect x="-20" y="892" width="560" height="12" fill="#4a423c"/>`;
    s += `<g opacity="${1 - gone}">${sil('cat', 260, 894, 1.5, '#0a0b0e')}<path d="M230,892 C200,894 188,870 206,850" stroke="#0a0b0e" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="286" cy="${894 - 1.5 * 70}" r="3" fill="#c8ff6a"/><circle cx="296" cy="${894 - 1.5 * 70}" r="3" fill="#c8ff6a"/></g>`;
  }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L2: silence: the same people stand still in the street; the sound wave flattens
function sceneSilence2(t) {
  const flat = ease(ramp(t, WS(2, 4), WS(2, 10) + .5));
  let s = morningStreet(t, 1, 0, .4);
  CROWD.forEach((c, i) => { s += person(c.x * .8 + 70 + (i - 1.5) * 20, 1000 + (i % 2) * 14, { s: c.s * 1.05, face: c.dir, top: c.top, pants: c.pants, skin: c.skin, hair: c.hair, lookUp: .5 + .3 * Math.sin(t * .7 + i), t }); });
  let d = 'M40,1180'; for (let x = 40; x <= 680; x += 4) { const amp = (1 - flat) * (50 * Math.sin(x * .05 + t * 9) * Math.sin(x * .013 + t * 3) + 16 * Math.sin(x * .21 + t * 13)); d += ` L${x},${1180 + amp}`; }
  s += `<rect x="20" y="1110" width="680" height="140" rx="20" fill="rgba(8,12,30,.6)"/><path d="${d}" stroke="#fff" stroke-width="4" fill="none"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L3: a person opens the fridge at home
function sceneFridge2(t) {
  let s = `<defs><pattern id="tile" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#e8e2d6"/><rect width="60" height="60" fill="none" stroke="#c8c0b0" stroke-width="2"/></pattern></defs><rect width="720" height="1280" fill="url(#tile)"/><rect y="1040" width="720" height="240" fill="#8a6a4a"/><rect y="1040" width="720" height="10" fill="#6a4a30"/>`;
  s += `<g transform="translate(250,210) scale(.66)">` + sceneFridge(t) + `</g>`;
  s += person(150, 1060, { s: 1.15, face: 1, top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d', lookUp: .1, t });
  s += `<rect width="720" height="1280" fill="#fff6e0" opacity=".05"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L4: shoppers at the produce stand
function sceneProduce2(t) {
  let s = sceneProduce(t);
  s += person(200, 1270, { s: 1.0, face: 1, top: '#8a3b3b', pants: '#2a2533', skin: '#a46a46', hair: '#1b1410', lookUp: -.1, t }) + person(540, 1270, { s: 1.05, face: -1, top: '#3f6b5a', pants: '#24262e', skin: '#c08a66', hair: '#2a1d16', t });
  return s;
}
// L5: the reef in the same style as the Moon Short, bleaching white and losing its fish
function sceneReef2(t) {
  const st = S0(5) - .2, b = ease(ramp(t, WS(5, 2), WS(5, 4) + 1)), g = ease(ramp(t, WS(5, 6), S0(6) - .3));
  let s = `<defs><linearGradient id="r2W" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d5a86"/><stop offset=".45" stop-color="#0a2a46"/><stop offset="1" stop-color="#03101c"/></linearGradient><linearGradient id="r2R" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ecff" stop-opacity=".35"/><stop offset="1" stop-color="#d8ecff" stop-opacity="0"/></linearGradient>` +
    `<filter id="bleach"><feColorMatrix type="saturate" values="${1 - b}"/><feComponentTransfer><feFuncR type="linear" slope="${1 + b * .5 - g * .4}" intercept="${b * .25 - g * .1}"/><feFuncG type="linear" slope="${1 + b * .5 - g * .4}" intercept="${b * .25 - g * .08}"/><feFuncB type="linear" slope="${1 + b * .5 - g * .5}" intercept="${b * .22 - g * .14}"/></feComponentTransfer></filter></defs><rect width="720" height="1280" fill="url(#r2W)"/>`;
  s += [-1.1, -.55, -.1, .35, .8, 1.2].map((u, i) => { const sw = Math.sin(t * .4 + i) * 18; return `<polygon points="${360 + u * 120 + sw},230 ${360 + u * 120 + 34 + sw},230 ${360 + u * 300 + 90},1280 ${360 + u * 300 - 50},1280" fill="url(#r2R)" opacity="${.5 + .25 * Math.sin(t * .9 + i * 2)}"/>`; }).join('');
  s += `<path d="M-20,1080 C120,1050 260,1075 380,1060 C520,1044 620,1068 740,1052 L740,1300 L-20,1300Z" fill="#3a4a52"/>`;
  s += `<g filter="url(#bleach)">` + staghorn(120, 1080, 1.25, '#c46a6a', '#ffc2b0', 3, t) + staghorn(640, 1070, 1.1, '#d8a050', '#ffe6a8', 7, t) + brainCoral(330, 1090, 92, 62, 1) + seaFan(560, 1060, .95, t) + anemone(190, 1150, 1.1, t) + `</g>`;
  s += `<g opacity="${1 - ease(ramp(t, WS(5, 2), WS(5, 3) + .4))}">` + clownfish(190 + Math.sin(t * .8) * 40, 1080 + Math.cos(t * 1.1) * 12, Math.cos(t * .8) > 0 ? -1 : 1, t) + fishSVG(pmod(t * 22, 900) - 90, 760, 90, 1, t, '#9fb3c0', 31) + fishSVG(760 - pmod(t * 16 + 300, 900), 860, 70, -1, t, '#b8a890', 32) + `</g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L6–L8 with the same people
function sceneSoil2(t) { return sceneSoil(t) + person(560, 262, { s: .55, face: -1, top: '#4a3b2a', pants: '#2a2533', skin: '#8d5a3b', hair: '#17110d', coat: true, hat: '#6b2f2f', t }); }
function sceneSeeds2(t) { return sceneSeeds(t) + person(560, 1080, { s: 1.0, face: -1, top: '#7a6a4a', pants: '#2b2a30', skin: '#b07a55', hair: '#1d1612', lookUp: .8, t }); }
function sceneAlone2(t) {
  let s = sceneAlone(t);
  s = s.replace(sil('human', 560, 1092, 1.05, '#0e0806'), '');
  return s + person(560, 1094, { s: .75, face: -1, top: '#3a2e46', pants: '#22242c', skin: '#a06c4b', hair: '#17110d', coat: true, scarf: '#c9a14a', t });
}
const SCENES = [
  { s: 0, f: sceneMorning }, { s: S0(1) - .2, f: sceneEmpty2 }, { s: S0(2) - .2, f: sceneSilence2 }, { s: S0(3) - .2, f: sceneFridge2 }, { s: S0(4) - .2, f: sceneProduce2 },
  { s: S0(5) - .2, f: sceneReef2 }, { s: S0(6) - .2, f: sceneSoil2 }, { s: S0(7) - .2, f: sceneSeeds2 }, { s: S0(8) - .2, f: sceneAlone2 }, { s: S0(9) - .2, f: sceneEarth }, { s: S0(10) - .2, f: sceneCTA },
];
const XF = .5;

// ---------- UI: timeline + gold chips, as in the earlier Shorts ----------
const TLI = [['الصباح', S0(0)], ['أسابيع', S0(4)], ['سنوات', S0(7)]];
const CHIPS = [
  ['c1', 'لا تغريد', 160, 860, 'dark', WS(2, 6), S0(3)], ['c2', 'لا نباح', 360, 860, 'dark', WS(2, 8), S0(3)], ['c3', 'لا طنين', 560, 860, 'dark', WS(2, 10), S0(3)],
  ['c4', '٣/٤ أنواع المحاصيل', 360, 470, 'big', WS(4, 3), S0(5)],
  ['c5', 'المرجان حيوان', 360, 330, 'big', WS(5, 7), S0(6)],
  ['c6', 'ديدان الأرض تحرث التربة', 360, 330, '', WS(6, 3), S0(7)],
  ['c7', 'البذور لا تبتعد', 360, 330, 'big', WS(7, 9), S0(8)],
  ['c8', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 6), 999],
];
$('ui').innerHTML = `<div class="list" id="tl"><div class="hd">بعد اختفاء الحيوانات</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 88; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  const vis = ease(ramp(t, S0(1), S0(1) + .4)) * (1 - ease(ramp(t, S0(9) - .4, S0(9)))) * (t > S0(5) - .2 && t < S0(6) - .2 ? 0 : 1);
  $('tl').style.opacity = vis;
  let act = 0; TLI.forEach((x, i) => { if (t >= x[1]) act = i; });
  $('tlf').style.height = (act * 88) + 'px';
  TLI.forEach((x, i) => { const on = i <= act, cur = i === act;
    $('tli' + i).style.color = cur ? '#fff' : on ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)';
    $('tld' + i).style.background = on ? '#f4c76b' : 'rgba(255,255,255,.35)';
    $('tld' + i).style.boxShadow = cur ? '0 0 0 6px rgba(244,199,107,.25)' : 'none'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}

