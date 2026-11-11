// ===================== "what if dragons were real?" (Short #31) =====================
const DDEF = `<pattern id="sclP" width="14" height="10" patternUnits="userSpaceOnUse"><path d="M0,10 Q7,-2 14,10" fill="none" stroke="#0c2a18" stroke-width="1.6"/><path d="M-7,5 Q0,-7 7,5 M7,5 Q14,-7 21,5" fill="none" stroke="#0c2a18" stroke-width="1.2" opacity=".6"/><path d="M2,8 Q7,1 12,8" fill="none" stroke="#9fe0a8" stroke-width=".8" opacity=".5"/></pattern><linearGradient id="drSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".28"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></linearGradient><linearGradient id="drM" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8684a" stop-opacity=".95"/><stop offset=".6" stop-color="#9a3a2a" stop-opacity=".9"/><stop offset="1" stop-color="#5a1e1a" stop-opacity=".95"/></linearGradient><linearGradient id="drB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7a4a"/><stop offset=".55" stop-color="#2a5a3a"/><stop offset="1" stop-color="#c8b06a"/></linearGradient><linearGradient id="drW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b0503a"/><stop offset="1" stop-color="#6a2a22"/></linearGradient><radialGradient id="fbG2"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#fff0a0"/><stop offset=".75" stop-color="#ff9a2a" stop-opacity=".85"/><stop offset="1" stop-color="#ff4a1a" stop-opacity="0"/></radialGradient>`;
// a wyvern-style dragon seen from the side, facing +x. o: {flap (phase), legs4, fire 0..1, t, grey, walk}
function dragon(x, y, s, o = {}) {
  const fl = Math.sin(o.flap || 0), up = -70 - 60 * fl, c1 = o.grey ? '#7a7f88' : 'url(#drB)', cw = o.grey ? '#5a5f68' : 'url(#drM)', dk = o.grey ? '#4a4f58' : '#1e3f2a', fold = o.fold || 0;
  let g = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) scale(${(o.face || 1) * s},${s}) rotate(${o.rot || 0})">`;
  const wing = (ox, back) => { const tipX = lerp(-40, -10, fold) + ox, tipY = lerp(up * 2.1, -40, fold), sh = back ? .7 : 1;
    return `<g opacity="${back ? .75 : 1}"><path d="M${ox},-30 L${ox + 30},${(up * .9 * sh).toFixed(1)} L${tipX + 150},${(tipY * sh).toFixed(1)} Q${tipX + 110},${(tipY * .55 * sh + 30).toFixed(1)} ${tipX + 70},${(tipY * .5 * sh + 60).toFixed(1)} Q${tipX + 30},${(tipY * .3 * sh + 40).toFixed(1)} ${tipX - 10},${(tipY * .3 * sh + 80).toFixed(1)} Q${tipX - 50},${(tipY * .15 * sh + 50).toFixed(1)} ${ox - 70},${(40 + 20 * fl).toFixed(1)} Z" fill="${cw}"/>` +
      [150, 70, -10].map(dx => `<path d="M${ox + 30},${(up * .9 * sh).toFixed(1)} L${tipX + dx},${((dx === 150 ? tipY : dx === 70 ? tipY * .5 + 60 : tipY * .3 + 80) * (dx === 150 ? sh : 1)).toFixed(1)}" stroke="${dk}" stroke-width="5" fill="none"/>`).join('') + [110, 30, -30].map(dx => `<path d="M${ox + 30},${(up * .9 * sh).toFixed(1)} Q${tipX + dx},${(tipY * .35 + 20).toFixed(1)} ${tipX + dx - 10},${(tipY * .32 + 66).toFixed(1)}" stroke="#3a120e" stroke-width="1.6" fill="none" opacity=".55"/>`).join('') + `<path d="M${ox},-30 L${ox + 30},${(up * .9 * sh).toFixed(1)}" stroke="${dk}" stroke-width="9" stroke-linecap="round"/><path d="M${ox + 2},-32 L${ox + 30},${(up * .9 * sh).toFixed(1)}" stroke="#fff" stroke-width="2" opacity=".3"/><circle cx="${ox + 30}" cy="${(up * .9 * sh).toFixed(1)}" r="6" fill="#e8e0c0"/></g>`; };
  g += wing(10, 1);
  // tail, body, neck
  g += `<path d="M-90,0 C-170,10 -230,-30 -290,10 C-240,0 -180,40 -90,30Z" fill="${c1}"/><path d="M-290,10 l-34,-18 l10,22 l-14,16Z" fill="${dk}"/>`;
  const lg = (lx, ph) => { const a = o.walk ? Math.sin((o.walk || 0) + ph) * 14 : 0; return `<path d="M${lx},20 L${lx + 10 + a},66 L${lx - 6 + a},104" stroke="${dk}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${lx - 6 + a},104 l26,4 M${lx - 6 + a},104 l22,-8" stroke="#e8e0c0" stroke-width="5" stroke-linecap="round"/>`; };
  g += lg(-50, 0) + (o.legs4 ? lg(70, 2) : '');
  g += `<ellipse cx="0" cy="0" rx="112" ry="52" fill="${c1}"/><path d="M-100,18 Q0,62 100,16 Q0,44 -100,18Z" fill="#e8d89a" opacity="${o.grey ? .2 : .7}"/>`;
  g += `<path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="${c1}"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M${-60 + i * 34},${-50 + Math.abs(i - 2) * 3} l10,-22 l12,20Z" fill="${dk}"/>`).join('');
  if (!o.grey) g += `<g><path d="M-90,0 C-170,10 -230,-30 -290,10 C-240,0 -180,40 -90,30Z" fill="url(#sclP)" opacity=".55"/><ellipse cx="0" cy="0" rx="112" ry="52" fill="url(#sclP)" opacity=".55"/><path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="url(#sclP)" opacity=".55"/><ellipse cx="0" cy="0" rx="112" ry="52" fill="url(#drSh)"/><path d="M70,-30 C120,-70 150,-120 170,-150 L206,-130 C180,-90 150,-30 104,10Z" fill="url(#drSh)" opacity=".7"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M${-84 + i * 26},${26 + Math.sin(i * .5) * 12} q13,10 26,0" stroke="#8a7a3a" stroke-width="2" fill="none" opacity=".7"/>`).join('') + `</g>`;
  g += lg(-30, 3.14) + (o.legs4 ? lg(90, 5) : '');
  // head
  g += `<g transform="translate(190,-146) rotate(${o.head || 0})"><path d="M-20,-22 C10,-34 60,-26 92,-8 L96,6 C60,12 20,22 -18,18Z" fill="${c1}"/><path d="M30,8 L94,6 L88,${(18 + 22 * (o.fire || o.jaw || 0)).toFixed(1)} C60,${(26 + 22 * (o.fire || o.jaw || 0)).toFixed(1)} 30,26 0,20Z" fill="${dk}"/>` +
    `<path d="M-14,-22 l-40,-34 l22,30Z M0,-26 l-22,-44 l30,36Z" fill="#e8e0c0"/><path d="M-20,-22 C10,-34 60,-26 92,-8 L96,6 C60,12 20,22 -18,18Z" fill="url(#sclP)" opacity="${o.grey ? 0 : .5}"/><path d="M6,-24 Q28,-30 44,-16" stroke="${dk}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="26" cy="-10" r="12" fill="#ffb02a" opacity=".3"/><circle cx="26" cy="-10" r="8" fill="#ffd23a"/><ellipse cx="27" cy="-10" rx="2.6" ry="7" fill="#1a1208"/><circle cx="80" cy="-6" r="3" fill="#1a1208"/>` + [40, 54, 68, 80].map(xx => `<path d="M${xx},7 l4,9 l4,-9Z" fill="#fff"/>`).join('') + `</g>`;
  g += wing(-10, 0);
  return g + `</g>`;
}
// fire jet from (x,y) along angle a (deg), length L
function fire(x, y, a, L, k, t) {
  if (k <= 0) return ''; let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${a})" opacity="${Math.min(1, k * 1.5).toFixed(2)}">`;
  for (let i = 0; i < 5; i++) { const u = .65 + (i + pmod(t * 1.5, 1)) / 5 * .6, r = 30 + u * L * .22; s += `<ellipse cx="${(u * L * k).toFixed(1)}" cy="${(-u * 30 + Math.sin(t * 7 + i) * 10).toFixed(1)}" rx="${(r * 1.2).toFixed(1)}" ry="${r.toFixed(1)}" fill="#2a2422" opacity="${(.3 * (1.3 - u)).toFixed(2)}" filter="url(#blur9)"/>`; }
  for (let i = 0; i < 12; i++) { const u = (i + pmod(t * 3, 1)) / 12, r = 12 + u * L * .26, xx = u * L * k; s += `<ellipse cx="${xx.toFixed(1)}" cy="${(Math.sin(t * 20 + i * 2) * 9 * u).toFixed(1)}" rx="${(r * 1.35).toFixed(1)}" ry="${r.toFixed(1)}" fill="url(#fbG2)" opacity="${(1 - u * .65).toFixed(2)}"/>`; }
  s += `<path d="M0,-7 L${(L * k * .55).toFixed(1)},-3 L${(L * k * .55).toFixed(1)},3 L0,7Z" fill="#fffbe0" opacity=".9" filter="url(#blur2)"/>`;
  const r = RS(3); for (let i = 0; i < 16; i++) { const u = pmod(t * (1.2 + r()) + r(), 1); s += `<circle cx="${(u * L * k * 1.1).toFixed(1)}" cy="${((r() - .5) * 90 * u - 40 * u * u).toFixed(1)}" r="${(1.5 + r() * 2.5).toFixed(1)}" fill="#ffd27a" opacity="${(1 - u).toFixed(2)}"/>`; }
  return s + `</g>`;
}
function burnBld(t, svg, x0, x1, base, h0, h1, c, id) {
  if (c <= 0) return svg; const r = RS(id.length * 13 + 5); let pts = `-60,-60 ${x0},-60`, x = x0;
  while (x < x1) { const w = 12 + r() * 26, hh = h0 + (h1 - h0) * Math.pow(r(), 1.4), y = lerp(-60, base - hh, ease(clamp(c * 1.3 - r() * .3))); pts += ` ${x.toFixed(1)},${y.toFixed(1)} ${Math.min(x1, x + w * .6).toFixed(1)},${(y + (r() - .3) * 24 * c).toFixed(1)}`; x += w; }
  pts += ` ${x1},-60 780,-60 780,1340 -60,1340`;
  let s = `<defs><clipPath id="bb${id}"><polygon points="${pts}"/></clipPath><linearGradient id="bk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a6fb8"/><stop offset=".6" stop-color="#93bbe2"/><stop offset="1" stop-color="#e0a070"/></linearGradient></defs><rect x="${x0}" y="-60" width="${x1 - x0}" height="${base + 60}" fill="url(#bk${id})"/><g clip-path="url(#bb${id})">${svg}</g>`;
  s += `<rect x="${x0}" y="${base - h1 - 40}" width="${x1 - x0}" height="${h1 + 40}" fill="#1a0e08" opacity="${(.35 * c).toFixed(2)}"/>`;
  const q = RS(id.length + 9); for (let i = 0; i < 22; i++) { const px = x0 + q() * (x1 - x0), sz = 4 + q() * 9, f = clamp(c * 1.3 - q() * .3), y0 = base - h1 - q() * 160, py = y0 + (base - y0) * f * f; s += `<rect x="${px.toFixed(1)}" y="${py.toFixed(1)}" width="${sz.toFixed(1)}" height="${(sz * .7).toFixed(1)}" fill="${q() > .5 ? '#5a4a40' : '#8a7a6a'}" transform="rotate(${(f * 320 * (q() - .5)).toFixed(0)},${px.toFixed(1)},${py.toFixed(1)})"/>`; }
  for (let i = 0; i < 7; i++) { const fx = x0 + (i + .5) * (x1 - x0) / 7, fl = (50 + 40 * Math.sin(t * 9 + i * 1.7)) * c, fy = base - h0 - (h1 - h0) * q() * c; s += `<path d="M${(fx - 16).toFixed(1)},${fy.toFixed(1)} q10,${(-fl).toFixed(1)} 6,${(-fl * 1.7).toFixed(1)} q14,${(fl * .7).toFixed(1)} 16,${(fl * 1.7).toFixed(1)}Z" fill="url(#flameG)"/>`; }
  s += `<ellipse cx="${(x0 + x1) / 2}" cy="${base - h1 * .5}" rx="${(x1 - x0) * .9}" ry="${h1 * .9}" fill="url(#fireGlow)" opacity="${(.7 * c).toFixed(2)}"/>`;
  for (let j = 0; j < 9; j++) { const ph = pmod(t * .22 + j / 9, 1), w = 40 + ph * 130; s += `<ellipse cx="${((x0 + x1) / 2 + Math.sin(ph * 5 + j) * 30 + ph * 50).toFixed(1)}" cy="${(base - h1 - ph * 700).toFixed(1)}" rx="${w.toFixed(1)}" ry="${(w * .7).toFixed(1)}" fill="#141010" opacity="${(.5 * c * Math.sin(Math.min(1, ph * 4) * 1.57)).toFixed(2)}" filter="url(#blur9)"/>`; }
  return s;
}
const skyBG = (id, a = '#3a6fb8', b = '#93bbe2', c = '#ebe3d0') => `<defs>${DEFB()}${DDEF}<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient></defs><rect width="720" height="1280" fill="url(#${id})"/>`;
const field = (t, y0 = 860) => mountainsR(y0 + 10, 190, 12, { snow: .25 }) + meadow(y0, 1280, t);
// 0: a dragon flies over the city and breathes fire
function sceneHook(t) {
  const x = -200 + t * 250, y = 540 + Math.sin(t * 2) * 26, f = clamp(1 - Math.abs(t - 1.25) / .75), c = ease(ramp(t, 1.05, 2.7));
  let s = `<defs>${DDEF}</defs>` + burnBld(t, streetS(t, { id: 'h' }), 574, 760, 1000, 90, 240, c, 'h');
  [[120, 0, 1], [330, 2, -1], [470, 1, 1]].forEach(([x0, cc, fc], i) => { const run = t > 1.3 ? 1 : 0, xx = x0 - 150 * Math.max(0, t - 1.3); s += castSh(xx, 1090, .52) + onWalk(xx, 1090, CROWD[cc], .52, run ? -1 : fc, t, run ? { moving: 1, phase: t * 12, amp: .9 } : { lookUp: ease(ramp(t, .2, .6)) }); });
  s += `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.16 * f).toFixed(2)}"/><ellipse cx="${x.toFixed(1)}" cy="1120" rx="170" ry="26" fill="#000" opacity=".22" filter="url(#blur9)"/>` + dragon(x, y, .75, { flap: t * 9, fire: f, head: 20 }) + fire(x + 200, y - 66, 30, 420, f, t);
  noEarth(); F.ov = ''; return s;
}
// 1: no giants: the largest flying animal ever had an 11 m wingspan and weighed about 250 kg
function sceneSize(t) {
  const a1 = ease(ramp(t, WS(1, 2) - .1, WS(1, 3) + .2)), x1 = ease(ramp(t, WS(1, 3), WS(1, 3) + .4)), a2 = ease(ramp(t, WS(1, 4), WS(1, 6))), aw = ease(ramp(t, WS(1, 11), WS(1, 14))), am = ease(ramp(t, WS(1, 15), WS(1, 17)));
  let s = skyBG('sz') + cumulus(200, 430, 220, 3, { a: .8 }) + field(t, 900);
  s += `<g opacity="${(a1 * (1 - .75 * ease(ramp(t, WS(1, 4), WS(1, 5))))).toFixed(2)}">` + dragon(330, 640, 1.25, { grey: 1, flap: 1.2 }) + `<g opacity="${x1}"><path d="M180,470 L500,800 M500,470 L180,800" stroke="#ff4a3a" stroke-width="16" stroke-linecap="butt"/></g></g>`;
  s += `<g opacity="${a2.toFixed(2)}">` + dragon(380, 860, .42, { flap: t * 5 }) + person(170, 1010, Object.assign({ s: .3, face: 1, t }, YOU)) + `</g>`;
  s += `<g opacity="${aw.toFixed(2)}"><path d="M250,1010 H520 M250,996 v28 M520,996 v28" stroke="#fff" stroke-width="4" fill="none"/>` + lbl(385, 1062, '١١ متراً', 1, '#f4c76b', 34) + `</g>` + `<g opacity="${am.toFixed(2)}">` + panel(230, 1110, 260, 80) + lbl(360, 1164, '≈ ٢٥٠ كغ', 1, '#fff', 34) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 2: four limbs only: wings are arms
function sceneLimbs(t) {
  const a1 = ease(ramp(t, WS(2, 2) - .2, WS(2, 4))), x1 = ease(ramp(t, WS(2, 5), WS(2, 5) + .4)), a2 = ease(ramp(t, WS(2, 8), WS(2, 10))), ok = ease(ramp(t, WS(2, 11), WS(2, 13)));
  let s = dimSt(t, 'l', .72) + `<defs>${DDEF}</defs>`;
  s += `<g opacity="${a1.toFixed(2)}">` + panel(40, 400, 640, 330) + dragon(330, 590, .62, { legs4: 1, flap: .6 }) + lbl(360, 716, '٦ أطراف', 1, '#ffc2b8', 30) + `<g opacity="${x1}"><path d="M560,430 l70,70 M630,430 l-70,70" stroke="#ff4a3a" stroke-width="14"/></g></g>`;
  s += `<g opacity="${a2.toFixed(2)}">` + panel(40, 770, 640, 360) + dragon(330, 980, .62, { flap: .6 }) + lbl(360, 1116, '٤ أطراف: الجناحُ ذراع', 1, '#b8f0c0', 30) + `<g opacity="${ok}"><path d="M556,840 l26,28 l52,-60" stroke="#4ad06a" stroke-width="14" fill="none"/><path d="M340,950 L360,880 L480,${(820).toFixed(0)}" stroke="#f4c76b" stroke-width="7" fill="none" stroke-dasharray="10 8"/></g></g>`;
  noEarth(); F.ov = ''; return s;
}
// 3: fire is possible: cows burp methane every day; a dragon that stores it only needs a spark
function sceneFire(t) {
  const st = S0(3) - .2, T = t - st, cut = WS(3, 9) - .15;
  let s = skyBG('fr') + cumulus(520, 420, 200, 4, { a: .8 });
  if (t < cut) { s += field(t, 880) + quad(250, 1060, 1.5, { kind: 'cow', face: 1 }) + quad(520, 990, 1.0, { kind: 'cow', face: -1, graze: 1 });
    for (let i = 0; i < 7; i++) { const p = pmod(T * .45 + i / 7, 1), a = ease(ramp(t, WS(3, 3), WS(3, 5))); s += `<g opacity="${(a * (1 - p)).toFixed(2)}"><circle cx="${(370 + p * 120 + Math.sin(i + T) * 14).toFixed(1)}" cy="${(950 - p * 330).toFixed(1)}" r="${(16 + p * 20).toFixed(1)}" fill="#cfe8ff" opacity=".45" stroke="#fff" stroke-width="2"/></g>`; }
    s += lbl(430, 640, 'ميثان CH₄', ease(ramp(t, WS(3, 5), WS(3, 6) + .2)), '#dff0ff', 34); }
  else { const u = t - cut, sp = clamp(1 - Math.abs(u - .9) / .25), f = ease(ramp(u, 1.0, 1.5)); s += field(t, 940) + dragon(210, 900, .95, { fold: 1, fire: f, jaw: .6, head: -6 });
    s += `<ellipse cx="250" cy="880" rx="60" ry="30" fill="#cfe8ff" opacity="${(.35 * (1 - f)).toFixed(2)}"/>` + (sp > 0 ? `<path d="M476,770 l14,-22 l4,18 l20,-10 l-12,20 l20,6 l-22,6 l8,20 l-18,-12 l-10,18Z" fill="#fff6a0" opacity="${sp.toFixed(2)}"/>` : '') + fire(478, 772, -4, 300, f, t);
    s += lbl(250, 1150, 'شرارة + ميثان = نار', ease(ramp(u, 1.2, 1.6)), '#ffe4a0', 34); }
  noEarth(); F.ov = ''; return s;
}
// 4: to fly it needs hollow, light bones like a bird's, and huge chest muscles
function sceneFly(t) {
  const ab = ease(ramp(t, WS(4, 3) - .1, WS(4, 5))), am = ease(ramp(t, WS(4, 8), WS(4, 10)));
  let s = skyBG('fl') + cumulus(180, 420, 210, 7, { a: .8 }) + cumulus(560, 560, 160, 2, { a: .7 }) + field(t, 980);
  s += `<ellipse cx="330" cy="1100" rx="150" ry="20" fill="#000" opacity=".2" filter="url(#blur9)"/>` + dragon(330, 760, .95, { flap: t * 6 });
  s += `<g opacity="${am.toFixed(2)}"><ellipse cx="372" cy="772" rx="52" ry="34" fill="#e0483a" opacity=".75"/>` + [0, 1, 2, 3].map(i => `<path d="M${336 + i * 16},750 q14,22 4,44" stroke="#8a1e16" stroke-width="3" fill="none"/>`).join('') + lbl(470, 900, 'عضلاتُ الطيران', 1, '#ffc2b8', 28) + `<path d="M400,800 L440,872" stroke="#ffc2b8" stroke-width="3"/></g>`;
  s += `<g opacity="${ab.toFixed(2)}">` + panel(40, 400, 280, 250) + `<ellipse cx="180" cy="508" rx="96" ry="70" fill="#efe6cf" stroke="#b8a878" stroke-width="5"/><ellipse cx="180" cy="508" rx="76" ry="52" fill="#141a30"/>` + [[-60, -30, 50, 36], [-20, -50, 30, 48], [40, -44, -30, 46], [66, -12, -64, 20]].map(([a, b, c2, d]) => `<path d="M${180 + a},${508 + b} L${180 + c2},${508 + d}" stroke="#efe6cf" stroke-width="6" stroke-linecap="butt"/>`).join('') + lbl(180, 624, 'عظمٌ مجوَّف', 1, '#ffe4a0', 28) + `<path d="M300,560 L270,700" stroke="#f4c76b" stroke-width="3" stroke-dasharray="6 6"/></g>`;
  noEarth(); F.ov = ''; return s;
}
// 4: a one-tonne dragon needs about a sheep of meat every day (Kleiber's law)
function sceneFood(t) {
  const st = S0(5) - .2, T = t - st, n = Math.min(7, Math.floor(ramp(t, WS(5, 4), S0(6) - .4) * 7.99));
  let s = skyBG('fd') + cumulus(180, 400, 200, 6, { a: .8 }) + field(t, 880) + dragon(190, 960, .8, { fold: 1, jaw: .3 + .3 * Math.abs(Math.sin(T * 6)), head: 14 });
  for (let i = 0; i < 7; i++) { const gone = i < n; s += `<g opacity="${gone ? .15 : 1}">` + sheep(380 + (i % 4) * 86 + (i > 3 ? 40 : 0), 1040 + Math.floor(i / 4) * 110, .9, i % 2) + `</g>`; }
  s += panel(400, 440, 270, 150) + lbl(535, 492, 'اليوم', 1, '#cfd8ff', 24) + lbl(535, 562, AR(Math.max(1, n)), 1, '#f4c76b', 60);
  noEarth(); F.ov = ''; return s;
}
// 5: closed airports, fire-proof roofs
function sceneCity(t) {
  const st = S0(6) - .2, T = t - st, x = 860 - T * 190, y = 470 + Math.sin(T * 2) * 22, k = ease(ramp(t, WS(6, 2), WS(6, 4) + .3)), f = clamp(1 - Math.abs(T - 1.5) / .8), c = ease(ramp(T, 1.4, 3.4));
  let s = `<defs>${DDEF}</defs>` + burnBld(t, streetS(t, { id: 'c', cars: 0 }), 284, 448, 1000, 100, 300, c, 'c');
  s += `<g opacity="${k.toFixed(2)}">` + [[-10, 696, 158], [148, 628, 136], [448, 762, 126], [574, 682, 160]].map(([bx, by, w]) => `<path d="M${bx - 6},${by + 4} L${bx + w / 2},${by - 46} L${bx + w + 6},${by + 4}Z" fill="#7a8088"/><path d="M${bx - 6},${by + 4} L${bx + w / 2},${by - 46} L${bx + w / 2},${by + 4}Z" fill="#fff" opacity=".2"/>` + [0, 1, 2, 3].map(i => `<path d="M${bx + w * .1 + i * w * .26},${by + 2} l${w * .06},-14" stroke="#4a5058" stroke-width="2"/>`).join('')).join('') + `</g>`;
  s += `<rect width="720" height="1280" fill="#ff8a3a" opacity="${(.14 * f).toFixed(2)}"/>` + dragon(x, y, .62, { flap: t * 9, face: -1, fire: f, head: 16 }) + `<g transform="translate(${(x - 124).toFixed(1)},${(y - 55).toFixed(1)}) scale(-1,1)">` + fire(0, 0, 32, 360, f, t) + `</g>`;
  const a = ease(ramp(t, WS(6, 0), WS(6, 1))) * (1 - ease(ramp(t, WS(6, 2), WS(6, 2) + .3)));
  s += `<g opacity="${a.toFixed(2)}">` + panel(170, 1010, 380, 150) + `<path d="M230,1085 l70,-22 l-10,22 l10,22Z M300,1076 l40,-30 M300,1094 l40,30" stroke="#dfe6ff" stroke-width="8" fill="#dfe6ff"/><path d="M214,1040 l110,90 M324,1040 l-110,90" stroke="#ff4a3a" stroke-width="9"/>` + lbl(440, 1100, 'المطارُ مغلق', 1, '#ffc2b8', 30) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
// 6: the dragon is real: the Komodo dragon, about 3 m long, with a venomous bite
function komodo(x, y, s, t) {
  const w = Math.sin(t * 5), tg = clamp(Math.sin(t * 4) * 2);
  const leg = (lx, ph) => { const a = Math.sin(t * 5 + ph) * 16; return `<path d="M${lx},10 L${lx + 14 + a},44 L${lx + 30 + a},56" stroke="#5a5444" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M${lx + 30 + a},56 l16,2 M${lx + 30 + a},56 l14,-6" stroke="#2a2620" stroke-width="4" stroke-linecap="round"/>`; };
  return `<g transform="translate(${x.toFixed(1)},${y}) scale(${s})">` + `<ellipse cx="0" cy="62" rx="250" ry="14" fill="#000" opacity=".25"/>` + leg(-70, 0) + leg(80, 3.14) +
    `<path d="M-110,0 C-200,${6 + w * 6} -280,${20 - w * 10} -350,${44 + w * 8} C-270,${36 - w * 8} -190,34 -110,30Z" fill="#6a6450"/><ellipse cx="0" cy="8" rx="130" ry="40" fill="#7a745e"/><path d="M-120,22 Q0,56 120,20 Q0,40 -120,22Z" fill="#b8ae8a" opacity=".6"/>` +
    `<path d="M100,-14 C150,-30 190,-30 232,-22 L262,-8 C264,4 250,12 226,14 C180,18 140,20 104,30Z" fill="#7a745e"/><circle cx="214" cy="-10" r="5" fill="#1a1208"/><path d="M196,8 L258,2" stroke="#3a3428" stroke-width="3"/>` +
    `<path d="M262,-2 L${(262 + 44 * tg).toFixed(1)},-6 l${(12 * tg).toFixed(1)},-8 M${(262 + 44 * tg).toFixed(1)},-6 l${(12 * tg).toFixed(1)},6" stroke="#e86a7a" stroke-width="4" fill="none" stroke-linecap="round"/>` + `<ellipse cx="0" cy="8" rx="130" ry="40" fill="#000" filter="url(#grainR)" opacity=".4"/>` + leg(-40, 3.14) + leg(110, 0) + `</g>`;
}
function sceneKomodo(t) {
  const st = S0(7) - .2, T = t - st, x = 200 + T * 26, al = ease(ramp(t, WS(7, 6), WS(7, 8)));
  let s = skyBG('km', '#2a6aa8', '#8ac4e0', '#f4e0b0') + cumulus(200, 400, 220, 2, { a: .85 }) + `<rect y="760" width="720" height="120" fill="#2a7aa8"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M${pmod(i * 97 + T * 20, 780) - 30},${770 + (i % 5) * 20} q20,-5 40,0" stroke="#dff0ff" stroke-width="2.5" fill="none" stroke-opacity=".5"/>`).join('') +
    `<path d="M-20,800 Q200,760 380,790 T740,770 L740,880 L-20,880Z" fill="#3a6a3a"/>` + forestR(840, 12, 110, 190, 5, '#2a5a2a', {}) + `<path d="M-20,880 Q240,850 420,875 T740,865 L740,1300 L-20,1300Z" fill="#e8d4a0"/><rect y="880" width="720" height="400" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += komodo(x, 1060, .95, t) + `<g opacity="${al.toFixed(2)}"><path d="M${(x - 330).toFixed(0)},1180 H${(x + 250).toFixed(0)} M${(x - 330).toFixed(0)},1166 v28 M${(x + 250).toFixed(0)},1166 v28" stroke="#fff" stroke-width="4" fill="none"/>` + lbl(x - 40, 1232, '٣ أمتار', 1, '#f4c76b', 34) + `</g>`;
  noEarth(); F.ov = ''; return s;
}
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6, az = .3 + (t - S0(8)) * .04;
  F.w = { set: 'space', cam: orbit(9.8, .3, az, [0, .64, 0]), L: sunFor(az), disc: { m: 1, spin: 3.3 + (t - S0(8)) * .08, clouds: .45 } };
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSize }, { s: S0(2) - .2, f: sceneLimbs }, { s: S0(3) - .2, f: sceneFire }, { s: S0(4) - .2, f: sceneFly }, { s: S0(5) - .2, f: sceneFood }, { s: S0(6) - .2, f: sceneCity }, { s: S0(7) - .2, f: sceneKomodo }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSize, sceneLimbs, sceneFire, sceneFly, sceneFood, sceneKomodo]);
const XF = .5;
const TLI = [['ليس عملاقاً', S0(1)], ['أربعةُ أطراف', S0(2)], ['نارٌ حقيقيّة', S0(3)], ['عظامٌ خفيفة', S0(4)]];
const LIST_ON = new Set([sceneFire, sceneFly]);
const CHIPS = [
  ['c1', 'أكبرُ طائرٍ في التاريخ', 360, 330, 'big', WS(1, 5), S0(2) - .3], ['c2', 'الجناحُ = ذراع', 360, 330, 'big', WS(2, 11), S0(3) - .3], ['c3', 'النارُ ممكنة!', 360, 330, 'red', WS(3, 2), S0(4) - .3], ['c3b', 'خفيفٌ وقويّ', 360, 330, 'big', WS(4, 5), S0(5) - .3],
  ['c4', 'خروفٌ كلَّ يوم', 360, 330, 'big', WS(5, 6), S0(6) - .3], ['c5', 'أسقفٌ لا تحترق', 360, 330, 'big', WS(6, 4), S0(7) - .3], ['c6', 'تنّينُ كومودو', 360, 330, 'big', WS(7, 4), S0(8) - .3], ['c9', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">تنانين</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
function sheep(x, y, s, graze) {
  const r = RS(Math.round(x)); let w = ''; for (let i = 0; i < 12; i++) w += `<circle cx="${(-30 + (i % 6) * 12 + r() * 4).toFixed(1)}" cy="${(-44 + Math.floor(i / 6) * 16 + r() * 4).toFixed(1)}" r="14" fill="#f4f0e6"/>`;
  return `<g transform="translate(${x},${y}) scale(${-s},${s})"><ellipse cx="0" cy="2" rx="44" ry="6" fill="#000" opacity=".25"/>` + [-22, -10, 14, 26].map(lx => `<rect x="${lx}" y="-22" width="7" height="24" fill="#2a2420"/>`).join('') + `<ellipse cx="0" cy="-36" rx="40" ry="24" fill="#e8e2d4"/>${w}<g transform="rotate(${graze ? 40 : 0},38,-40)"><ellipse cx="50" cy="-46" rx="15" ry="12" fill="#2a2420"/><ellipse cx="42" cy="-56" rx="6" ry="4" fill="#2a2420"/><circle cx="54" cy="-49" r="2" fill="#fff"/></g></g>`;
}
