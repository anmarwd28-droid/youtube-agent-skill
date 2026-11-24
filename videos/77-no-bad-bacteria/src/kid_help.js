// kid_a.js (#74): what if you were 7 again, remembering everything you know today? Uses am_lib.js (room), sc_a.js (classroom defs SCD, deskC), iq_a.js (brainSide), iq_b.js (bubble), ol_a.js (streetO), oe_help.js (studio).
const KL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arK = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
const KS = .68, AD7 = 1.25, KR = AD7 * KS;   // AR/KR: adult and child scale in the room scenes (closer camera)   // a 7-year-old is about 0.68 of an adult's height (≈120 cm vs ≈175 cm)
const you = (x, y, s, o = {}) => hero(x, y, Object.assign({ s, face: 1, shade: 1 }, gp(1), { top: '#e85a2a' }, o));
// a woman: the house person with long hair behind the head and a dress over the legs
function woman(x, y, s, f, o = {}, pal = { top: '#7a4a6a', pants: '#3a2a34', skin: '#c89a74', hair: '#2a1a12' }) {
  const h = hero(x, y, Object.assign({ s, face: f, shade: 1 }, pal, o)), H = Object.assign({}, HP), [hx, hy] = H.head, [px, py] = H.hip;
  const hair = `<path d="M${hx - 24 * s * f},${hy - 6 * s} C${hx - 30 * s * f},${hy + 50 * s} ${hx - 22 * s * f},${hy + 80 * s} ${hx - 6 * s * f},${hy + 86 * s} L${hx + 8 * s * f},${hy + 40 * s} L${hx + 14 * s * f},${hy - 10 * s}Z" fill="${pal.hair}"/>`;
  const dress = `<path d="M${px - 30 * s},${py - 14 * s} L${px + 30 * s},${py - 14 * s} L${px + 44 * s},${py + 104 * s} L${px - 44 * s},${py + 104 * s}Z" fill="${pal.top}"/><path d="M${px - 30 * s},${py - 14 * s} L${px - 6 * s},${py - 14 * s} L${px - 14 * s},${py + 104 * s} L${px - 44 * s},${py + 104 * s}Z" fill="#000" opacity=".18"/>`;
  return hair + h + dress;
}
// a small hand (palm view) for the hands inset
function handK(x, y, s, col = '#c89070', st = '#8a5a40', dash = '') { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,40 L-44,-20 Q-46,-34 -36,-34 Q-28,-34 -28,-22 L-26,-60 Q-26,-74 -15,-74 Q-5,-74 -5,-60 L-4,-70 Q-4,-84 7,-84 Q18,-84 18,-70 L18,-62 Q19,-74 30,-73 Q40,-72 40,-60 L40,-40 Q41,-50 50,-49 Q60,-48 59,-36 L54,20 Q50,48 30,56 L-20,56 Q-38,52 -40,40Z" fill="${col}" stroke="${st}" stroke-width="${dash ? 2.5 : 3}" ${dash ? `stroke-dasharray="${dash}"` : ''}/></g>`; }
// a home bed (side view, head on the left); (x, y) = floor under the centre; o.sleep draws a child asleep under the blanket
function bedK(x, y, s, o = {}) {
  let g = `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="230" ry="12" fill="#000" opacity=".28" filter="url(#blur2)"/>` +
    `<rect x="-226" y="-250" width="26" height="250" rx="6" fill="#7a5232"/><rect x="200" y="-170" width="26" height="170" rx="6" fill="#7a5232"/><rect x="-226" y="-250" width="10" height="250" fill="#000" opacity=".2"/>` +
    `<rect x="-206" y="-100" width="412" height="60" rx="6" fill="#8a5e3a"/><rect x="-206" y="-100" width="412" height="8" fill="#fff" opacity=".15"/>` +
    `<rect x="-200" y="-136" width="400" height="42" rx="14" fill="#f2efe8"/><ellipse cx="-150" cy="-142" rx="52" ry="20" fill="#fbfaf6"/><path d="M-196,-142 q46,-14 92,0" stroke="#d8d4ca" stroke-width="3" fill="none"/>`;
  if (o.sleep) g += `<ellipse cx="-138" cy="-162" rx="20" ry="23" fill="${o.skin || '#8d5a3b'}"/><path d="M-158,-170 q14,-22 40,-8 q-18,-6 -40,8Z" fill="${o.hair || '#17110d'}"/><path d="M-124,-160 q4,2 7,0" stroke="#3a2418" stroke-width="2" fill="none"/>`;
  g += `<path d="M${o.sleep ? -120 : -60},-130 Q20,${o.sleep ? -176 : -150} 120,-148 Q190,-146 204,-128 L204,-96 L${o.sleep ? -120 : -60},-96Z" fill="${o.blanket || '#4a7ab8'}"/><path d="M${o.sleep ? -110 : -50},-134 Q20,-170 120,-146" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/>` +
    Array.from({ length: 6 }, (_, i) => `<circle cx="${-30 + i * 38}" cy="-118" r="6" fill="#fff" opacity=".25"/>`).join('');
  return g + `</g>`;
}
// a thought bubble: three small circles from (x0, y0) up to a cloud at (x, y)
function thought(x0, y0, x, y, w, h, a, inner) { if (a <= 0) return ''; return `<g opacity="${a.toFixed(2)}">` + [0, 1, 2].map(i => `<circle cx="${lerp(x0, x - w * .25, (i + 1) / 4).toFixed(1)}" cy="${lerp(y0, y + h * .45, (i + 1) / 4).toFixed(1)}" r="${6 + i * 5}" fill="#fff"/>`).join('') +
  `<ellipse cx="${x}" cy="${y}" rx="${w / 2}" ry="${h / 2}" fill="#fff"/><ellipse cx="${x - w * .3}" cy="${y - h * .25}" rx="${w * .25}" ry="${h * .3}" fill="#fff"/><ellipse cx="${x + w * .28}" cy="${y - h * .22}" rx="${w * .26}" ry="${h * .3}" fill="#fff"/>${inner}</g>`; }
// the adult you, small, inside a thought
const adultMini = (x, y, s) => you(x, y, s, { noShadow: 1, aF: [.15, .4], aB: [-.1, .3] });
// a football with its panels, rotating
function ballK(x, y, r, rot) { return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><circle r="${r}" fill="#f6f6f2"/><path d="M0,${-r * .38} L${r * .36},${-r * .12} L${r * .22},${r * .3} L${-r * .22},${r * .3} L${-r * .36},${-r * .12}Z" fill="#1a1a1e"/>` +
  [0, 72, 144, 216, 288].map(a => `<path d="M0,${-r * .38} L0,${-r * .8}" stroke="#1a1a1e" stroke-width="${(r * .08).toFixed(1)}" transform="rotate(${a})"/><path d="M${-r * .2},${-r * .98} L${r * .2},${-r * .98} L${r * .1},${-r * .8} L${-r * .1},${-r * .8}Z" fill="#1a1a1e" transform="rotate(${a + 36})"/>`).join('') +
  `<circle r="${r}" fill="url(#torsoSh)" opacity=".5"/><circle r="${r}" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="1.5"/></g>`; }
// ---------- 0: hook: the adult you shrinks back into a 7-year-old; the clock runs backwards ----------
function sceneHook(t) {
  const sh = ease(ramp(t, WS(0, 2), WS(0, 5) + .2)), rw = ease(ramp(t, WS(0, 1), WS(0, 6))), mm = 40 - 1440 * rw;
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: 0, id: 'k0', hh: 2 + Math.floor(mm / 60), mm: pmod(mm, 60) }) + sunBeam(1);
  for (let i = 0; i < 3; i++) s += ring(250, 1000, pmod((t - WS(0, 2)) * .9 + i / 3, 1) * (t > WS(0, 2) && t < WS(0, 6) + .6 ? 1 : 0), 40, 420);
  s += you(250, 1190, lerp(AD7, KR, sh), { aF: [.1, .3], aB: [-.1, .25] });
  const ta = ease(ramp(t, WS(0, 7), WS(0, 8) + .3)), H = [250, 1190 - 311 * KR];
  s += thought(H[0] + 30, H[1] - 10, 480, H[1] - 230, 300, 230, ta, adultMini(430, H[1] - 140, .5) + `<text x="530" y="${H[1] - 250}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#2a3040">كلُّ</text><text x="530" y="${H[1] - 218}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#2a3040">ذكرياتِك</text>`);
  const na = ease(ramp(t, WS(0, 5) - .1, WS(0, 6))) * (1 - ta);
  s += `<g opacity="${na.toFixed(2)}" transform="translate(540,760)"><text x="0" y="0" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="170" fill="#f4c76b" style="filter:drop-shadow(0 6px 18px rgba(0,0,0,.6))">٧</text>${KL(0, 70, 'سنوات', 1, '#fff', 40)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: you wake up in your old bed; small hands; mum calls you to school ----------
function sceneWake(t) {
  const T = t - (S0(1) - .2), up = ease(ramp(t, S0(1), WS(1, 2))), ha = ease(ramp(t, WS(1, 4) - .2, WS(1, 4) + .3)) * (1 - ease(ramp(t, WS(1, 6) + .1, WS(1, 6) + .5))), ma = ease(ramp(t, WS(1, 6) - .1, WS(1, 7)));
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: .1, id: 'k1', hh: 7, mm: 10 + T * .5 }) + sunBeam(.8);
  const BS = 1.3, BY = 1230, top = BY - 136 * BS;
  s += bedK(300, BY, BS);
  // sitting up: hip on the mattress, legs forward under the blanket
  s += you(140, top + 8, KR, { noShadow: 1, lF: [1.5, 1.45], lB: [1.48, 1.42], hipY: -10, lean: lerp(-60, 0, up), aF: [.4, .9], aB: [.2, .8] });
  s += `<path d="M120,${top - 6} Q230,${top - 40} 340,${top - 22} Q500,${top - 22} 562,${top + 10} L562,${BY - 96 * BS} L120,${BY - 96 * BS}Z" fill="#4a7ab8"/><path d="M130,${top - 10} Q260,${top - 50} 420,${top - 28}" stroke="#fff" stroke-width="3" fill="none" opacity=".3"/>`;
  if (ha > 0) s += `<g opacity="${ha.toFixed(2)}">${panel(380, 820, 300, 230)}${handK(530, 950, 1.35, '#fff', '#e8eef4', '8 6').replace('fill="#fff"', 'fill="none"')}${handK(530, 960, .9, '#8d5a3b', '#5a3420')}${KL(530, 1036, 'يدُك اليوم', 1, '#d8e4f0', 20)}</g>`;
  if (ma > 0) { const mx = lerp(780, 620, ma); s += woman(mx, 1150, AD7, -1, { aF: [.4, 1.6], aB: [-.1, .3], noShadow: 0 }); s += bubble(mx - 170, 600, 230, 90, ma, `<text x="${mx - 170}" y="${614}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#2a3040">إلى المدرسة!</text>`, [40, 60]); }
  noEarth(); F.ov = ''; return s;
}
// ---------- 2: in class everything is easy; you know the answer before the teacher asks ----------
function sceneClass(t) {
  const T = t - (S0(2) - .2), hu = ease(ramp(t, WS(2, 6), WS(2, 7))), qa = ease(ramp(t, WS(2, 9), WS(2, 12)));
  let s = `<defs>${SCD()}${LDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#clsWall)"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".1"/>`;
  s += `<rect x="-20" y="380" width="760" height="10" fill="#b8a888"/>`;
  [[540, 420], [540, 700]].forEach(([wx, wy]) => s += `<rect x="${wx - 10}" y="${wy - 10}" width="180" height="250" fill="#f4ecd8"/><rect x="${wx}" y="${wy}" width="160" height="230" fill="url(#winL)"/><path d="M${wx + 80},${wy} V${wy + 230} M${wx},${wy + 115} H${wx + 160}" stroke="#f4ecd8" stroke-width="8"/><rect x="${wx - 14}" y="${wy + 236}" width="188" height="10" fill="#e0d4bc"/>`);
  s += `<rect x="40" y="430" width="440" height="260" rx="6" fill="#6a4a2e"/><rect x="54" y="444" width="412" height="232" fill="url(#boardG)"/><rect x="54" y="444" width="412" height="232" fill="#fff" filter="url(#grainR)" opacity=".08"/><rect x="44" y="686" width="432" height="12" fill="#8a6a4a"/>`;
  s += `<text x="260" y="590" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="64" fill="#f4f2e8" opacity=".92">٧ × ٨ = ${qa > .5 ? '<tspan fill="#f4c76b">٥٦</tspan>' : '؟'}</text>`;
  s += `<rect x="-20" y="900" width="760" height="420" fill="url(#clsFloor)"/><rect x="-20" y="900" width="760" height="420" fill="#000" filter="url(#grainR)" opacity=".25"/>`;
  s += scr(`<path d="M540,440 L700,440 L420,1240 L80,1240Z" fill="url(#beamC)" opacity=".5"/>`);
  // the teacher at the board, pointing
  s += hero(150, 1010, Object.assign({ s: 1.0, face: 1, shade: 1, hF: [250, 600], hB: [140, 860] }, gp(0)));
  // pupils behind their desks; you (middle) raise your hand first
  [[250, 2, 0], [440, 1, 1], [620, 3, 0]].forEach(([x, pi, me]) => { s += me ? you(x, 1150, KS, { hF: [x + 30, lerp(1020, 860, hu)], aB: [-.1, .3] }) : hero(x, 1150, Object.assign({ s: KS, face: 1, shade: 1 }, gp(pi + 4))); s += deskC(x + 20, 1190, .9); });
  s += bubble(440, 770, 150, 90, qa, `<text x="440" y="786" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="40" fill="#2a8a3a">٥٦ ✓</text>`, [-10, 10]);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: a child's brain is a superpower: languages come easily, with a native accent ----------
const LANGS = ['Hello', 'Bonjour', 'Hola', 'Привет', 'Ciao', 'Merhaba', 'Olá', 'Hallo'];
function sceneBrain(t) {
  const T = t - (S0(3) - .2), la = ease(ramp(t, WS(3, 8), WS(3, 10))), pull = ease(ramp(t, WS(3, 12), WS(3, 14) + .3));
  let s = `<defs>${LDEFS()}</defs>` + studio('stK', '#2c3a5a', '#080c18', 4);
  s += scr(`<circle cx="360" cy="780" r="300" fill="#f4c76b" opacity="${(.06 + .08 * la).toFixed(2)}" filter="url(#blur16)"/>`);
  s += brainSide(360, 780, 1.25, 3, { glow: .3 + .5 * la, noShadow: 1 });
  const r = RS(13); let sp = '';
  for (let i = 0; i < 40; i++) { const x = 360 + (r() - .5) * 360, y = 780 + (r() - .5) * 240, a = Math.sin(t * 3 + i * 1.7) ** 8; sp += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + 4 * a).toFixed(1)}" fill="#fff4c0" opacity="${(a * (.4 + .6 * la)).toFixed(2)}"/>`; }
  s += sp;
  LANGS.forEach((w, i) => { const an = i / LANGS.length * Math.PI * 2 + T * .25, R = lerp(300, 120, pull), x = 360 + Math.cos(an) * R, y = 780 + Math.sin(an) * R * .9, a = ease(ramp(t, WS(3, 8) + i * .18, WS(3, 8) + i * .18 + .3)) * (1 - pull * .7);
    if (a > 0) s += `<g opacity="${a.toFixed(2)}"><rect x="${(x - 70).toFixed(1)}" y="${(y - 26).toFixed(1)}" width="140" height="52" rx="18" fill="#fff"/><text x="${x.toFixed(1)}" y="${(y + 10).toFixed(1)}" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#2a3040">${w}</text></g>`; });
  s += KL(360, 1130, 'دماغُ طفلٍ في السابعة', ease(ramp(t, S0(3), S0(3) + .6)), '#ffe0a0', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: three languages before ten, and the sport you missed: you juggle a ball in the street ----------
function sceneSkills(t) {
  const T = t - (S0(4) - .2), P = .62, ph = pmod(T / P, 1), kick = Math.max(0, 1 - Math.abs(ph - .04) / .12), x = 300, fy = 1160;
  const by = fy - 26 - 200 * 4 * ph * (1 - ph), bx = x + 46 + Math.sin(T * 1.3) * 6;
  const top = you(x, fy, KS, { lF: [.15 + .75 * kick, .15 + .55 * kick], lB: [-.08, -.18], aF: [.5, .8], aB: [-.4, -.1], lookUp: -.4 }) + ballK(bx, by, 20, T * 220);
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'k4', top });
  [['English', 'en'], ['Français', 'fr'], ['Español', 'es']].forEach(([w], i) => { const a = ease(ramp(t, WS(4, 1) + i * .35, WS(4, 1) + i * .35 + .3)) * (1 - ease(ramp(t, WS(4, 5), WS(4, 6))));
    if (a > 0) s += `<g opacity="${a.toFixed(2)}">${panel(70 + i * 200, 520, 180, 70)}<text x="${160 + i * 200}" y="566" text-anchor="middle" font-family="Inter" font-weight="700" font-size="26" fill="#fff">${w} <tspan fill="#6ad07a">✓</tspan></text></g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: you know the future: smartphones, social media, everything that will happen ----------
function crtTV(x, y, t) { return `<rect x="${x - 120}" y="${y - 170}" width="240" height="180" rx="16" fill="#3a3430"/><rect x="${x - 100}" y="${y - 152}" width="170" height="140" rx="20" fill="#2a3a3a"/><rect x="${x - 100}" y="${y - 152}" width="170" height="140" rx="20" fill="#fff" filter="url(#grainR)" opacity="${(.35 + .1 * Math.sin(t * 20)).toFixed(2)}"/>` +
  `<circle cx="${x + 92}" cy="${y - 120}" r="8" fill="#8a8078"/><circle cx="${x + 92}" cy="${y - 90}" r="8" fill="#8a8078"/><path d="M${x - 40},${y - 170} L${x - 80},${y - 240} M${x + 30},${y - 170} L${x + 70},${y - 236}" stroke="#555" stroke-width="4"/><rect x="${x - 110}" y="${y + 10}" width="220" height="70" fill="#6a4a2e"/>`; }
function smartPh(x, y, s, a, t) { if (a <= 0) return ''; const ic = [['#e8463a', '♥'], ['#3a8ae8', '✉'], ['#e8a83a', '▶'], ['#4ac87a', '☎']]; return `<g opacity="${a.toFixed(2)}" transform="translate(${x},${y}) scale(${s})"><rect x="-62" y="-116" width="124" height="232" rx="20" fill="#16181e"/><rect x="-54" y="-104" width="108" height="206" rx="12" fill="#2a4a7a"/>` +
  ic.map(([c, g], i) => `<rect x="${-42 + (i % 2) * 48}" y="${-80 + Math.floor(i / 2) * 56}" width="36" height="36" rx="9" fill="${c}"/><text x="${-24 + (i % 2) * 48}" y="${-55 + Math.floor(i / 2) * 56}" text-anchor="middle" font-size="22" fill="#fff">${g}</text>`).join('') + `<rect x="-20" y="-112" width="40" height="6" rx="3" fill="#000"/></g>`; }
function sceneFuture(t) {
  const T = t - (S0(5) - .2), ta = ease(ramp(t, WS(5, 2), WS(5, 3) + .2)), pa = ease(ramp(t, WS(5, 3), WS(5, 4) + .3)), na = ease(ramp(t, WS(5, 7) - .1, WS(5, 8) + .2));
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: .25, id: 'k5', hh: 5, mm: 30 }) + crtTV(560, 1110, t);
  s += you(240, 1200, KR, { face: 1, aF: [.6, 1.2], aB: [.2, .6] });
  const H = [262, 1200 - 311 * KR];
  s += thought(H[0] + 20, H[1] - 10, 330, 560, 330, 280, ta, smartPh(270, 560, .85, pa, t) + `<g opacity="${na.toFixed(2)}"><circle cx="410" cy="560" r="56" fill="#2a6ab8"/><path d="M372,530 q20,-10 40,6 q14,12 -4,26 q-18,10 -20,30 M430,516 q20,20 4,44" stroke="#4ac87a" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="410" cy="560" r="56" fill="none" stroke="#fff" stroke-width="3" opacity=".6"/><text x="410" y="660" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="28" fill="#2a3040">المستقبل</text></g>`);
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: but your body is a child's: 9 to 12 hours of sleep every night ----------
function sceneSleep(t) {
  const T = t - (S0(6) - .2), h = 20 + 11 * ease(ramp(t, WS(6, 4), S0(7) - .4)), pa = ease(ramp(t, WS(6, 8) - .2, WS(6, 9)));
  let s = `<defs>${LDEFS()}</defs>` + room(t, { N: 1, id: 'k6', hh: Math.floor(h) % 24, mm: (h % 1) * 60 });
  s += bedK(330, 1230, 1.35, { sleep: 1, skin: '#8d5a3b', hair: '#17110d' });
  for (let i = 0; i < 3; i++) { const k = pmod(T * .45 + i / 3, 1); s += `<text x="${(150 + k * 60 + Math.sin(k * 6) * 10).toFixed(1)}" y="${(900 - k * 200).toFixed(1)}" font-family="Inter" font-weight="800" font-size="${(26 + k * 26).toFixed(0)}" fill="#dfe8ff" opacity="${(Math.sin(k * Math.PI) * .9).toFixed(2)}">z</text>`; }
  s += `<g opacity="${pa.toFixed(2)}">${panel(380, 820, 300, 140)}<text x="530" y="900" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="800" font-size="46" fill="#f4c76b">٩–١٢ ساعة</text>${KL(530, 940, 'نومٌ كلَّ ليلة', 1, '#d8e4f0', 22)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: nobody believes you; the grown-ups laugh: "a child's imagination" ----------
function sceneWarn(t) {
  const T = t - (S0(7) - .2), wa = ease(ramp(t, WS(7, 3), WS(7, 4) + .2)), la = ease(ramp(t, WS(7, 9) - .1, WS(7, 10))), sh = Math.sin(T * 26) * 4 * la;
  const top = you(200, 1086, KS, { hF: [260, 1086 - 260 * KS * 1.0 - 40], aB: [-.1, .3] }) + hero(430, 1090, Object.assign({ s: 1.0, face: -1, shade: 1, lean: -6 * la + sh * .3, hF: [440, 940], aB: [-.2, .3] }, gp(0))) + woman(580, 1094, 1.0, -1, { lean: -5 * la - sh * .3, hF: [590, 950], aB: [-.2, .3] });
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'k7', top });
  s += bubble(190, 760, 260, 100, wa, `<text x="190" y="774" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#c8382e">⚠ سيحدثُ شيء!</text>`, [-10, 20]);
  s += bubble(400, 640, 250, 100, la, `<text x="400" y="654" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#2a3040">خيالُ أطفال! 😂</text>`, [-30, -10]);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: your friends are children and you think like a grown-up: you feel alone ----------
function bench(x, y) { return `<ellipse cx="${x}" cy="${y + 4}" rx="130" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/><rect x="${x - 120}" y="${y - 92}" width="240" height="16" rx="4" fill="#9a6a3a"/><rect x="${x - 120}" y="${y - 150}" width="240" height="14" rx="4" fill="#8a5a2e"/><rect x="${x - 120}" y="${y - 124}" width="240" height="14" rx="4" fill="#8a5a2e"/><path d="M${x - 104},${y} V${y - 150} M${x + 104},${y} V${y - 150}" stroke="#3a3a40" stroke-width="8"/>`; }
function sceneAlone(t) {
  const T = t - (S0(8) - .2), P = 1.4, u = pmod(T / P, 1), dir = Math.floor(T / P) % 2, bx = dir ? lerp(260, 60, ease(u)) : lerp(60, 260, ease(u)), kA = dir ? 0 : Math.max(0, 1 - u / .12), kB = dir ? Math.max(0, 1 - u / .12) : 0;
  const ta = ease(ramp(t, WS(8, 3), WS(8, 5))), bl = ease(ramp(t, WS(8, 7), WS(8, 8) + .3));
  let top = hero(40, 1100, Object.assign({ s: KS, face: 1, shade: 1, lF: [.15 + .7 * kA, .1 + .5 * kA], lB: [-.08, -.18] }, gp(5))) + hero(290, 1104, Object.assign({ s: KS, face: -1, shade: 1, lF: [.15 + .7 * kB, .1 + .5 * kB], lB: [-.08, -.18] }, gp(6))) + ballK(bx, 1100 - 18, 18, bx * 3);
  top += bench(560, 1110) + you(540, 1018 + 79 * KS, KS, { noShadow: 1, lF: [1.5, .1], lB: [1.45, .05], hipY: -79, lean: 10, hF: [566, 1018 - 150 * KS], aB: [.3, .8], lookUp: -.3 });
  let s = `<defs>${LDEFS()}</defs>` + streetO(t, { id: 'k8', top });
  s += thought(560, 1110 - 92 - 230, 520, 640, 260, 190, ta, adultMini(520, 700, .36));
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#2a4a7a" opacity="${(.2 * bl).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: time slows down again: one year is a seventh of a 7-year-old's life ----------
function pie(cx, cy, R, p, col, a) { const a1 = -Math.PI / 2, a2 = a1 + p * Math.PI * 2, x2 = cx + Math.cos(a2) * R, y2 = cy + Math.sin(a2) * R;
  return `<g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R}" fill="#2a3448"/><path d="M${cx},${cy} L${cx},${cy - R} A${R},${R} 0 ${p > .5 ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)}Z" fill="${col}"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#fff" stroke-width="3" opacity=".5"/></g>`; }
function hourglass(x, y, k, t) { return `<g transform="translate(${x},${y})"><rect x="-70" y="-150" width="140" height="16" rx="6" fill="#8a5a2e"/><rect x="-70" y="134" width="140" height="16" rx="6" fill="#8a5a2e"/><path d="M-56,-134 L56,-134 L8,0 L56,134 L-56,134 L-8,0Z" fill="#dfeaf4" fill-opacity=".18" stroke="#dfeaf4" stroke-width="3"/>` +
  `<path d="M${-40 + 30 * k},${-110 + 100 * k} L${40 - 30 * k},${-110 + 100 * k} L6,-4 L-6,-4Z" fill="#e8c070"/><path d="M-50,130 L50,130 L${30 - 20 * (1 - k)},${126 - 70 * k} L${-30 + 20 * (1 - k)},${126 - 70 * k}Z" fill="#e8c070"/><path d="M0,-2 V128" stroke="#e8c070" stroke-width="3" stroke-dasharray="6 6" stroke-dashoffset="${(-t * 30).toFixed(1)}"/></g>`; }
function sceneTime(t) {
  const T = t - (S0(9) - .2), hg = 1 - ease(ramp(t, WS(9, 6) - .3, WS(9, 6) + .2)), pa = ease(ramp(t, WS(9, 6), WS(9, 7) + .3)), pb = ease(ramp(t, WS(9, 12) - .2, WS(9, 13) + .3));
  let s = `<defs>${LDEFS()}</defs>` + studio('stT', '#2a3454', '#080b16', 6);
  if (hg > 0) s += `<g opacity="${hg.toFixed(2)}">${hourglass(360, 780, clamp(T / 14), t)}</g>`;
  if (pa > 0) s += pie(200, 800, 130, (1 / 7) * pa, '#f4c76b', pa) + KL(200, 990, 'عمرُك ٧', pa, '#fff', 30) + KL(200, 1036, 'سنةٌ = ١/٧', pa * pb, '#f4c76b', 30) +
    pie(520, 800, 130, (1 / 35) * pa, '#7ac8ff', pa) + KL(520, 990, 'عمرُك ٣٥', pa, '#fff', 30) + KL(520, 1036, 'سنةٌ = ١/٣٥', pa * pb, '#7ac8ff', 30);
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 30 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 9) - .3, WS(10, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
