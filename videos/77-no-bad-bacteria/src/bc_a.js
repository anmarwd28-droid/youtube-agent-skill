// bc_a.js (#77): what if every harmful bacterium vanished? Built on the #76 chain (mq_help.js: lens, puffQ; pl_help.js: rat; cv_a.js: maskP).
const BCL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const BCD = `<radialGradient id="bgG" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#b8f0c8"/><stop offset=".5" stop-color="#4ab87a"/><stop offset="1" stop-color="#1e5a3a"/></radialGradient>
<radialGradient id="bgR" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffc0c8"/><stop offset=".5" stop-color="#c8405a"/><stop offset="1" stop-color="#5a1424"/></radialGradient>
<radialGradient id="bgY" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#e0b040"/><stop offset="1" stop-color="#7a5a14"/></radialGradient>
<radialGradient id="bgW" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#dfe6f0"/><stop offset="1" stop-color="#9aa8c0"/></radialGradient>
<radialGradient id="micF" cx=".5" cy=".5" r=".55"><stop offset="0" stop-color="#e8f4ec"/><stop offset=".75" stop-color="#bcd8c8"/><stop offset="1" stop-color="#6a8a7a"/></radialGradient>
<linearGradient id="gutW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e89a92"/><stop offset="1" stop-color="#a8504a"/></linearGradient>
<radialGradient id="rbc" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#a0201c"/><stop offset=".55" stop-color="#d8443a"/><stop offset=".85" stop-color="#b82a24"/><stop offset="1" stop-color="#7a1410"/></radialGradient>`;
const BCDEFS = () => `${LDEFS()}${MQDF}${BCD}`;
// one bacterium: o.k 'rod' | 'coc' | 'vib'; o.bad (red-purple); o.rot; o.t; o.fl flagella; o.a
function bact(x, y, s, o = {}) {
  const a = o.a ?? 1; if (a <= 0) return ''; const t = o.t || 0, g = o.bad ? 'bgR' : (o.col || 'bgG'), st = o.bad ? '#5a1424' : '#1e5a3a';
  let p = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(o.rot || 0).toFixed(1)}) scale(${s})" opacity="${a.toFixed(2)}">`;
  if (o.fl) for (let i = 0; i < (o.k === 'rod' ? 5 : 1); i++) { const an = (o.k === 'rod' ? i * 72 + 20 : 180) * Math.PI / 180, x0 = Math.cos(an) * 34, y0 = Math.sin(an) * 12; let d = `M${x0.toFixed(1)},${y0.toFixed(1)}`;
    for (let k = 1; k <= 10; k++) { const r = k * 7, w = Math.sin(k * 1.2 - t * 8 + i) * 5; d += ` L${(x0 + Math.cos(an) * r - Math.sin(an) * w).toFixed(1)},${(y0 + Math.sin(an) * r + Math.cos(an) * w).toFixed(1)}`; }
    p += `<path d="${d}" stroke="${st}" stroke-width="1.6" fill="none" opacity=".7"/>`; }
  if (o.k === 'coc') { [[0, 0], [18, -6], [-16, -8], [8, 16], [-10, 14], [26, 12], [-26, 8], [4, -20], [-6, 30], [20, 28]].forEach(([dx, dy], i) => { if (i >= (o.n || 10)) return; p += `<circle cx="${dx}" cy="${dy}" r="11" fill="url(#${g})" stroke="${st}" stroke-width="1"/><ellipse cx="${dx - 4}" cy="${dy - 4}" rx="3.5" ry="2.4" fill="#fff" opacity=".55"/>`; }); }
  else if (o.k === 'vib') p += `<path d="M-30,-6 C-20,-22 20,-20 30,-2 C34,6 28,10 22,4 C12,-8 -12,-8 -20,6 C-26,14 -36,6 -30,-6Z" fill="url(#${g})" stroke="${st}" stroke-width="1.2"/><path d="M-22,-8 C-10,-16 12,-14 22,-4" stroke="#fff" stroke-width="2.4" fill="none" opacity=".4"/>`;
  else p += `<rect x="-34" y="-13" width="68" height="26" rx="13" fill="url(#${g})" stroke="${st}" stroke-width="1.2"/><path d="M-24,-7 H22" stroke="#fff" stroke-width="3" opacity=".4" stroke-linecap="round"/>` + [-16, 0, 14].map((dx, i) => `<circle cx="${dx}" cy="${(i % 2 ? 4 : 2)}" r="2.4" fill="${st}" opacity=".35"/>`).join('');
  if (o.bad && o.spk) for (let i = 0; i < 12; i++) { const an = i / 12 * 6.28; p += `<path d="M${(Math.cos(an) * 34).toFixed(1)},${(Math.sin(an) * 14).toFixed(1)} l${(Math.cos(an) * 6).toFixed(1)},${(Math.sin(an) * 6).toFixed(1)}" stroke="${st}" stroke-width="2"/>`; }
  return p + `</g>`;
}
// a field of bacteria (seeded), each drifting; bad ones vanish when kill > 0
function bField(t, cx, cy, R, n, seed, o = {}) { const r = RS(seed); let s = '';
  for (let i = 0; i < n; i++) { const an = r() * 6.28, d = Math.sqrt(r()) * R, x = cx + Math.cos(an) * d + Math.sin(t * .7 + i) * 6, y = cy + Math.sin(an) * d * (o.fy || 1) + Math.cos(t * .6 + i * 1.3) * 6, k = ['rod', 'rod', 'coc', 'vib'][Math.floor(r() * 4)], bad = r() < (o.pb ?? .25), rot = r() * 360 + t * (r() - .5) * 20, sc = (o.s || .9) * (.8 + r() * .4);
    if (bad && o.kill >= 1) continue;
    s += bact(x, y, sc, { k, bad, rot, t: t + i, fl: k === 'rod' && r() < .5, spk: bad, a: bad && o.kill > 0 ? 1 - o.kill : 1, n: 5 + Math.floor(r() * 5) });
    if (bad && o.kill > 0 && o.kill < 1) s += puffQ(x, y, o.kill, i + seed, '#c8405a', 14, 40 * sc); }
  return s; }
// a microscope field: a bright round view with a dark rim
function micView(cx, cy, R, inner, id) { return `<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${R + 14}" fill="#0a0e12"/><g clip-path="url(#${id})"><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#micF)"/>${inner}<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="40" filter="url(#blur9)"/></g><circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="none" stroke="#3a4048" stroke-width="10"/>`; }
// ---------- 0: hook: a microscope view full of bacteria; the harmful ones burst ----------
function sceneHook(t) {
  const k = ramp(t, WS(0, 8), WS(0, 8) + .9);
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB0', '#24343a', '#060a0c', 3);
  s += micView(360, 780, 300, bField(t, 360, 780, 300, 44, 5, { kill: k, pb: .3 }), 'mv0');
  s += BCL(360, 1150, k > .5 ? 'الضارّةُ اختفت' : 'تحتَ المجهر', ease(ramp(t, .4, .9)), k > .5 ? '#7ae08a' : '#fff', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: about 38 trillion bacteria in your body, more than your own cells ----------
function sceneCount(t) {
  const T = t - (S0(1) - .2), b1 = ease(ramp(t, WS(1, 4), WS(1, 7) + .3)), b2 = ease(ramp(t, WS(1, 8), WS(1, 11) + .3));
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB1', '#2a3448', '#080b14', 8);
  s += hero(170, 1160, Object.assign({ s: 1.5, face: 1, shade: 1, aF: [.15, .3], aB: [-.1, .25] }, gp(1), { top: '#e85a2a' }));
  const H = Object.assign({}, HP); const r = RS(4);
  for (let i = 0; i < 70; i++) { const x = 120 + r() * 110, y = 560 + r() * 580, tw = .4 + .6 * Math.sin(t * 3 + i); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.4 + r() * 1.6).toFixed(1)}" fill="#7ae08a" opacity="${(b1 * tw * .8).toFixed(2)}"/>`; }
  const bar = (y, L, col, tx, sub, a) => `<g opacity="${a.toFixed(2)}">${BCL(510, y - 22, tx, 1, col, 32)}<rect x="330" y="${y}" width="${(360 * L).toFixed(1)}" height="40" rx="10" fill="${col}"/>${BCL(510, y + 80, sub, 1, '#fff', 22)}</g>`;
  s += bar(640, b1 * 1, '#7ae08a', '≈ ٣٨ تريليون', 'بكتيريا', b1) + bar(860, b2 * 30 / 38, '#f4c76b', '≈ ٣٠ تريليون', 'خليّةٌ بشريّة', b2);
  noEarth(); F.ov = ''; return s;
}
// the inside of the gut: villi and friendly bacteria; o.bad = how many bad ones show (0..1); o.ec = E. coli mode
function gut(t, o = {}) {
  let s = `<rect x="-20" y="-20" width="760" height="1320" fill="#5a1e22"/><rect x="-20" y="-20" width="760" height="1320" fill="url(#gutW)" opacity=".5"/>`;
  for (let i = 0; i < 9; i++) { const x = -10 + i * 92, h = 340 + (i % 3) * 60, sw = Math.sin(t * .8 + i) * 10; s += `<path d="M${x - 40},1300 C${x - 40},${1300 - h * .6} ${x - 30 + sw},${1300 - h} ${x + sw},${1300 - h} C${x + 30 + sw},${1300 - h} ${x + 40},${1300 - h * .6} ${x + 40},1300Z" fill="url(#gutW)" stroke="#7a2a2a" stroke-width="2"/><path d="M${x - 20},1300 C${x - 20},${1300 - h * .5} ${x - 14 + sw},${1300 - h * .9} ${x + sw},${1300 - h * .9}" stroke="#fff" stroke-width="5" fill="none" opacity=".15"/>`; }
  for (let i = 0; i < 9; i++) { const x = 30 + i * 92, h = 300 + (i % 2) * 80, sw = Math.sin(t * .7 + i * 2) * 8; s += `<path d="M${x - 36},-20 C${x - 36},${h * .4} ${x - 26 + sw},${h} ${x + sw},${h} C${x + 26 + sw},${h} ${x + 36},${h * .4} ${x + 36},-20Z" fill="url(#gutW)" stroke="#7a2a2a" stroke-width="2" opacity=".85"/>`; }
  // food particles drifting
  const r = RS(9); for (let i = 0; i < 14; i++) { const x = pmod(r() * 800 + t * 18, 800) - 40, y = 520 + r() * 360; s += `<path d="M${x.toFixed(1)},${y.toFixed(1)} l14,-6 l8,10 l-12,8Z" fill="#e8c88a" opacity="${(.5 * (1 - (o.dig || 0) * r())).toFixed(2)}"/>`; }
  // bacteria in the gap between the villi
  const rr = RS(o.seed || 3); for (let i = 0; i < 26; i++) { const x = 30 + rr() * 660, y = 480 + rr() * 420, bad = i < 4 && (o.bad || 0) > 0, k = o.ec ? 'rod' : ['rod', 'rod', 'coc', 'vib'][Math.floor(rr() * 4)];
    s += bact(x + Math.sin(t + i) * 10, y + Math.cos(t * .8 + i) * 8, .85, { k, bad, spk: bad, rot: rr() * 360 + t * 10 * (rr() - .5), t: t + i, fl: o.ec || rr() < .4, a: bad ? o.bad : 1, n: 6 }); }
  return s; }
// ---------- 2: most are friends: they help digest and protect you; a few are killers ----------
function sceneGut(t) {
  const bad = ease(ramp(t, WS(2, 7), WS(2, 10) + .3)), dig = ease(ramp(t, WS(2, 2), WS(2, 6)));
  let s = `<defs>${BCDEFS()}</defs>` + gut(t, { bad, dig, seed: 3 });
  s += panel(150, 1100, 420, 80) + BCL(360, 1152, bad > .5 ? 'قليلٌ منها قاتل' : 'بكتيريا صديقة في أمعائك', 1, bad > .5 ? '#ff9a8a' : '#7ae08a', 28);
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: TB alone kills over a million a year; bacterial infections are linked to 1 in 8 deaths ----------
const TBC = [[20, 78], [28, 77], [23, 90], [-6, 107], [14, 121], [9, 8], [-26, 28], [-4, 30], [0, 37], [33, 70], [24, 67], [16, 100], [-12, 18], [12, 105], [-15, 35], [6, 3], [39, 116], [30, 120]];
function sceneTB(t) {
  const t0 = S0(3) - .2, T = t - t0, n = ease(ramp(t, WS(3, 0), WS(3, 3) + .5)), c = ease(ramp(t, WS(3, 3), WS(3, 8))), sw = ease(ramp(t, WS(3, 9) - .3, WS(3, 9) + .3));
  const G = gAt(t, 360, 700, { d: 8.8, el: .2, lon: 55 + T * 6, clouds: .35, lights: .35, off: -.75 });
  let ov = '';
  TBC.forEach(([la, lo], i) => { const k = clamp(n * 1.5 - i / TBC.length * .5); if (k <= 0) return; const v = G.vis(la, lo); if (v < .1) return; const [x, y] = G.P(la, lo, 1.01), p = .75 + .25 * Math.sin(t * 3 + i), a = k * clamp((v - .1) / .2) * (1 - sw * .6);
    ov += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(18 * p).toFixed(1)}" fill="#ff4a5a" opacity="${(.3 * a).toFixed(2)}" filter="url(#blur2)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" fill="#ffe0e0" opacity="${a.toFixed(2)}"/>`; });
  ov += `<g opacity="${(c * (1 - sw)).toFixed(2)}">${panel(130, 1090, 460, 130)}${BCL(360, 1150, (c < .999 ? arMQ((c * 1.2).toFixed(1)) : '+١٫٢') + ' مليون', 1, '#ff9a8a', 44)}${BCL(360, 1196, 'وفاةٍ بالسُّلِّ كلَّ عام', 1, '#fff', 24)}</g>`;
  // one in eight deaths: eight people, one red
  if (sw > 0) { let p = `<g opacity="${sw.toFixed(2)}">${panel(40, 980, 640, 270)}`; for (let i = 0; i < 8; i++) { const x = 92 + i * 77, red = i === 5 && t > WS(3, 14); p += hero(x, 1200, Object.assign({ s: .5, face: -1, shade: 1, noShadow: 1 }, gp(i % 4), red ? { top: '#e04a4a', pants: '#7a2020' } : {})); }
    p += BCL(360, 1236, '١ من كلِّ ٨ وفياتٍ في العالم', 1, '#ff9a8a', 26) + `</g>`; ov += p; }
  F.ov = `<defs>${BCD}</defs>` + ov; return space(t);
}
// ---------- 4: no cholera, no plague, no bacterial food poisoning ----------
function glassW(x, y) { return `<path d="M${x - 40},${y - 120} L${x + 40},${y - 120} L${x + 32},${y} L${x - 32},${y}Z" fill="#cfe4f0" opacity=".55" stroke="#e8f4fa" stroke-width="3"/><path d="M${x - 37},${y - 80} L${x + 37},${y - 80} L${x + 32},${y} L${x - 32},${y}Z" fill="#a8b884" opacity=".7"/>`; }
function plate(x, y) { return `<ellipse cx="${x}" cy="${y}" rx="70" ry="20" fill="#f2f0ea"/><ellipse cx="${x}" cy="${y - 3}" rx="50" ry="13" fill="#e0dcd2"/><path d="M${x - 40},${y - 8} q20,-26 40,-8 q14,-20 36,4Z" fill="#c8843a"/><circle cx="${x + 18}" cy="${y - 10}" r="9" fill="#4a9a3a"/>`; }
function sceneNo(t) {
  const T = t - (S0(4) - .2);
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB4', '#2a3a40', '#080c0e', 14);
  const P = [[150, 'الكوليرا', 4, 'vib'], [360, 'الطاعون', 6, 'rod'], [570, 'تسمّمُ الطعام', 9, 'rod']];
  P.forEach(([x, n, wi, k], i) => { const a = ease(ramp(t, S0(4) - .2 + i * .3, S0(4) + .2 + i * .3)), x2 = ease(ramp(t, WS(4, wi) + .3, WS(4, wi) + .7));
    s += `<g opacity="${a.toFixed(2)}"><rect x="${x - 98}" y="560" width="196" height="440" rx="20" fill="#0c1418" opacity=".85"/><rect x="${x - 98}" y="560" width="196" height="440" rx="20" fill="none" stroke="#f4c76b" stroke-width="3" opacity=".6"/>`;
    s += i === 0 ? glassW(x, 760) : i === 1 ? rat(x - 50, 760, .55, t) : plate(x, 760);
    s += micView(x, 870, 70, bact(x, 870, .9, { k, bad: 1, spk: 1, rot: 20 + T * 10, t, fl: 1 }), 'mvN' + i).replace('opacity="1.00"', `opacity="${(1 - x2).toFixed(2)}"`);
    s += BCL(x, 990, n, 1, '#fff', 24);
    if (x2 > 0) s += `<path d="M${x - 70},${790 - 70 * x2} L${x + 70 * x2 - 70 + 70},${790 + 70 * x2}" stroke="#7ae08a" stroke-width="0"/><g opacity="${x2.toFixed(2)}"><path d="M${x - 60},700 L${x + 60},900 M${x + 60},700 L${x - 60},900" stroke="#ff5a4a" stroke-width="12" stroke-linecap="round"/></g>`;
    s += `</g>`; });
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: surgery becomes safer; no fear of antibiotic-resistant bacteria ----------
function sceneSurgery(t) {
  const T = t - (S0(5) - .2), sb = ease(ramp(t, WS(5, 6) - .2, WS(5, 7) + .2)), kill = ramp(t, WS(5, 9), WS(5, 9) + .8);
  let s = `<defs>${BCDEFS()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="#cfe0dc"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".06"/>`;
  for (let i = 0; i < 16; i++) s += `<path d="M${i * 48},380 V1000" stroke="#b8ccc8" stroke-width="2"/>`;
  s += `<rect x="-20" y="1000" width="760" height="320" fill="#8aa8a4"/><rect x="-20" y="1000" width="760" height="10" fill="#000" opacity=".15"/>`;
  // surgical light
  s += `<path d="M360,380 v70" stroke="#6a7a82" stroke-width="8"/><ellipse cx="360" cy="470" rx="110" ry="34" fill="#dfe6ea"/><ellipse cx="360" cy="478" rx="90" ry="22" fill="#fffbe0"/><path d="M270,480 L180,940 L540,940 L450,480Z" fill="#fffbe0" opacity=".12"/>`;
  const sg = (x, f, k) => maskP(hero(x, 1010, Object.assign({ s: 1.0, face: f, shade: 1, lean: 4 * f, hF: [x + f * 70, 868 + Math.sin(T * 2 + k) * 6], hB: [x + f * 56, 876], lookUp: -.5 }, gp(k), { top: '#3a8a7a', pants: '#2e7062' })));
  s += sg(300, -1, 2) + sg(480, -1, 3);
  // the table and the patient under a blue drape
  s += `<rect x="140" y="900" width="440" height="30" rx="8" fill="#4a5a62"/><rect x="340" y="930" width="40" height="80" fill="#3a464c"/><rect x="250" y="1006" width="220" height="14" rx="6" fill="#3a464c"/>`;
  s += `<ellipse cx="178" cy="878" rx="24" ry="22" fill="#c8906a"/><path d="M196,880 C260,850 520,850 590,880 L590,900 L196,900Z" fill="#4a7ab8"/><path d="M196,880 C260,850 520,850 590,880" stroke="#fff" stroke-width="3" fill="none" opacity=".25"/>`;
  // two surgeons in green with masks
  // superbugs with a shield, vanishing
  if (sb > 0) { let g = ''; [[100, 560], [160, 650], [200, 560]].forEach(([x, y], i) => { g += bact(x, y, 1.1, { k: 'rod', bad: 1, spk: 1, rot: i * 40 + T * 15, t, fl: 1, a: 1 - kill }) + `<path d="M${x - 14},${y - 36} l14,-6 l14,6 v10 q0,14 -14,20 q-14,-6 -14,-20Z" fill="#8aa0b8" stroke="#fff" stroke-width="1.5" opacity="${(1 - kill).toFixed(2)}"/>` + puffQ(x, y, kill, i + 3, '#c8405a', 14, 50); });
    s += `<g opacity="${sb.toFixed(2)}">${panel(30, 470, 240, 260)}${g}<g opacity="${ease(ramp(t, WS(5, 9) + .3, WS(5, 9) + 1.1)).toFixed(2)}"><circle cx="150" cy="600" r="62" fill="#1f6a4a" stroke="#7ae08a" stroke-width="5"/><path d="M118,602 l22,24 l44,-50" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${BCL(150, 700, 'لا خطر', 1, '#7ae08a', 24)}</g>${BCL(150, 760, 'المقاومةُ للمضادّات', 1, '#ff9a8a', 20)}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 6: the problem: who decides which ones are harmful? ----------
function sceneWho(t) {
  const T = t - (S0(6) - .2), q = ease(ramp(t, WS(6, 3), WS(6, 6)));
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB6', '#2c3044', '#08090f', 2);
  [[200, 'bgG'], [520, 'bgR']].forEach(([x, g], i) => { s += micView(x, 780, 150, bact(x, 780, 2.2, { k: 'rod', col: 'bgY', rot: 12 - i * 24 + Math.sin(T) * 4, t }), 'mvW' + i); s += BCL(x, 990, i ? 'ضارّة؟' : 'مفيدة؟', q, '#f4c76b', 34); });
  s += `<text x="360" y="640" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="${(120 * q).toFixed(0)}" fill="#f4c76b" opacity="${q.toFixed(2)}">؟</text>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 7: Staphylococcus lives in the noses of about a third of people; in the blood it can kill ----------
function sceneStaph(t) {
  const T = t - (S0(7) - .2), ln = ease(ramp(t, WS(7, 2), WS(7, 4))), bl = ease(ramp(t, WS(7, 10), WS(7, 13)));
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB7', '#2a3a48', '#080c12', 5);
  s += hero(250, 1900, Object.assign({ s: 3.4, face: 1, shade: 1, noShadow: 1 }, gp(1), { top: '#e85a2a' }));
  const [ex, ey] = HP.eye, nx = ex + 28, ny = ey + 30;
  // a third of people: three small people, one with a green dot
  s += `<g opacity="${ln.toFixed(2)}">` + [0, 1, 2].map(i => hero(470 + i * 80, 1130, Object.assign({ s: .5, face: -1, shade: 1, noShadow: 1 }, gp(i)))).join('') + `<circle cx="474" cy="1000" r="9" fill="#e0b040"/>${BCL(550, 1180, '≈ ثلثُ البشر', 1, '#fff', 24)}</g>`;
  const nose = `<rect x="310" y="400" width="420" height="440" fill="#e8b8a8"/>` + Array.from({ length: 14 }, (_, i) => `<path d="M${330 + i * 30},840 q${10 + i % 3 * 4},-140 ${-6 + i % 2 * 12},-300" stroke="#8a5a4a" stroke-width="2" fill="none" opacity=".4"/>`).join('') + [[430, 560], [560, 640], [470, 720], [620, 520]].map(([x, y], i) => bact(x, y, 1.4, { k: 'coc', col: 'bgY', rot: i * 50 + T * 6, n: 9 })).join('');
  const blood = `<rect x="310" y="400" width="420" height="440" fill="#5a0c10"/>` + Array.from({ length: 12 }, (_, i) => { const r = RS(i + 30), x = pmod(330 + r() * 440 + T * 60, 460) + 300, y = 420 + r() * 400; return `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="34" ry="${(14 + r() * 14).toFixed(1)}" fill="url(#rbc)" transform="rotate(${(r() * 60 - 30).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`; }).join('') + [[440, 560], [580, 700]].map(([x, y], i) => bact(x, y, 1.4, { k: 'coc', bad: 1, rot: i * 50 + T * 6, n: 9 })).join('');
  s += lens(520, 620, 190, nx, ny, ln, `<g opacity="${(1 - bl).toFixed(2)}">${nose}</g><g opacity="${bl.toFixed(2)}">${blood}</g>`, 'lnB7');
  s += BCL(520, 850, bl > .5 ? 'في الدم: خطرٌ قاتل' : 'العنقوديّةُ في الأنف', ln, bl > .5 ? '#ff9a8a' : '#f4c76b', 26);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: E. coli in your gut: most strains helpful, some dangerous ----------
function sceneEcoli(t) {
  const bad = ease(ramp(t, WS(8, 7), WS(8, 8) + .3));
  let s = `<defs>${BCDEFS()}</defs>` + gut(t, { ec: 1, bad, seed: 11 });
  s += `<g>${panel(140, 1080, 440, 90)}${BCL(360, 1138, bad > .5 ? 'بعضُ السلالاتِ خطير' : 'الإشريكيّةُ القولونيّة: معظمُها مفيد', 1, bad > .5 ? '#ff9a8a' : '#7ae08a', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 9: the twist: the immune system trains on germs from birth; without them it may attack harmless things like pollen ----------
function wbc(x, y, r, t, a = 1) { let d = ''; for (let i = 0; i <= 24; i++) { const an = i / 24 * 6.28, rr = r * (1 + .08 * Math.sin(an * 5 + t * 2) + .05 * Math.sin(an * 3 - t)); d += (i ? ' L' : 'M') + (x + Math.cos(an) * rr).toFixed(1) + ',' + (y + Math.sin(an) * rr).toFixed(1); }
  return `<g opacity="${a.toFixed(2)}"><path d="${d}Z" fill="url(#bgW)" stroke="#8a98b0" stroke-width="2"/><path d="M${x - r * .3},${y - r * .1} q${r * .2},${-r * .4} ${r * .5},${-r * .1} q${r * .2},${r * .3} ${-r * .1},${r * .4} q${-r * .4},${r * .1} ${-r * .4},${-r * .3}Z" fill="#8a7ab8" opacity=".75"/><ellipse cx="${x - r * .4}" cy="${y - r * .45}" rx="${r * .2}" ry="${r * .1}" fill="#fff" opacity=".6"/></g>`; }
function pollen(x, y, r, rot) { let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)})"><circle r="${r}" fill="url(#bgY)"/>`; for (let i = 0; i < 18; i++) { const an = i / 18 * 6.28; s += `<path d="M${(Math.cos(an) * r).toFixed(1)},${(Math.sin(an) * r).toFixed(1)} l${(Math.cos(an) * r * .35).toFixed(1)},${(Math.sin(an) * r * .35).toFixed(1)}" stroke="#c89020" stroke-width="3" stroke-linecap="round"/>`; } return s + `</g>`; }
function sceneImmune(t) {
  const T = t - (S0(9) - .2), tr = ease(ramp(t, WS(9, 1), WS(9, 3) + .4)), no = ease(ramp(t, WS(9, 8) - .3, WS(9, 8) + .3)), at = ease(ramp(t, WS(9, 11), WS(9, 13) + .3));
  let s = `<defs>${BCDEFS()}</defs>` + studio('stB9', '#30283c', '#0a080e', 10);
  if (no < 1) { let g = '';
    // a baby asleep in a crib (small), and the training: white cells meeting bacteria
    g += `<rect x="70" y="1000" width="260" height="20" rx="6" fill="#c8a070"/>` + Array.from({ length: 9 }, (_, i) => `<rect x="${78 + i * 30}" y="900" width="6" height="100" fill="#c8a070"/>`).join('') + `<rect x="70" y="892" width="260" height="12" rx="6" fill="#c8a070"/><path d="M100,996 Q200,950 300,996Z" fill="#a8c8e8"/><circle cx="130" cy="975" r="18" fill="#c8906a"/>`;
    g += micView(470, 760, 200, wbc(430 + Math.sin(T) * 10, 760, 70, t) + bact(560, 720 - tr * 20, 1.1, { k: 'rod', rot: 30 + T * 20, t, fl: 1 }) + bact(540, 840, 1.1, { k: 'coc', rot: T * 10, n: 7 }) + `<path d="M500,760 L520,740" stroke="#f4c76b" stroke-width="4" opacity="${tr.toFixed(2)}"/>`, 'mvI0');
    g += BCL(470, 1010, 'المناعةُ تتدرّب', tr, '#7ae08a', 28);
    s += `<g opacity="${(1 - no).toFixed(2)}">${g}</g>`; }
  if (no > 0) { let g = micView(360, 760, 260, wbc(300 + at * 40, 760, 90, t * 1.6) + pollen(500 - at * 20, 700, 46, T * 20) + pollen(470, 860, 36, -T * 25) +
      (at > 0 ? Array.from({ length: 8 }, (_, i) => { const an = i / 8 * 6.28 + T; return `<path d="M${(400 + Math.cos(an) * 20).toFixed(1)},${(760 + Math.sin(an) * 20).toFixed(1)} l${(Math.cos(an) * 40 * at).toFixed(1)},${(Math.sin(an) * 40 * at).toFixed(1)}" stroke="#ff5a4a" stroke-width="5" stroke-linecap="round" opacity="${at.toFixed(2)}"/>`; }).join('') : ''), 'mvI1');
    g += BCL(360, 1080, at > .5 ? 'يهاجمُ حبوبَ اللقاحِ البريئة!' : 'بلا جراثيم يتدرّبُ عليها…', 1, at > .5 ? '#ff9a8a' : '#fff', 28);
    s += `<g opacity="${no.toFixed(2)}">${g}</g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 10: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + (t - S0(10)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 8) - .3, WS(10, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneCount }, { s: S0(2) - .2, f: sceneGut }, { s: S0(3) - .2, f: sceneTB }, { s: S0(4) - .2, f: sceneNo }, { s: S0(5) - .2, f: sceneSurgery },
  { s: S0(6) - .2, f: sceneWho }, { s: S0(7) - .2, f: sceneStaph }, { s: S0(8) - .2, f: sceneEcoli }, { s: S0(9) - .2, f: sceneImmune }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneCount, sceneTB, sceneNo, sceneWho, sceneImmune]);
const XF = .5;
const TLI = [['٣٨ تريليون', S0(1)], ['الأمعاء', S0(2)], ['السُّلّ', S0(3)], ['الأمراض', S0(4)], ['الجراحة', S0(5)], ['المشكلة', S0(6)]];
const LIST_ON = new Set([sceneSurgery]);
const CHIPS = [
  ['c0', 'بلا بكتيريا ضارّة', 360, 330, 'big', WS(0, 8), S0(1) - .3],
  ['c1', 'أكثرُ من خلاياك', 360, 330, 'big', WS(1, 8), S0(2) - .3],
  ['c2', 'معظمُها صديقة', 360, 330, 'big', WS(2, 1), S0(3) - .3],
  ['c3', '١ من كلِّ ٨ وفيات', 360, 330, 'red big', WS(3, 12), S0(4) - .3],
  ['c4', 'وداعاً للأوبئة', 360, 330, 'big', WS(4, 3), S0(5) - .3],
  ['c5', 'جراحةٌ أكثرُ أماناً', 360, 330, 'big', WS(5, 3), S0(6) - .3],
  ['c6', 'من يحدّدُ الضارّ؟', 360, 330, 'red big', WS(6, 3), S0(7) - .3],
  ['c7', 'ثلثُ البشر', 360, 330, 'big', WS(7, 6), S0(8) - .3],
  ['c8', 'مفيدةٌ وخطيرة', 360, 330, 'big', WS(8, 6), S0(9) - .3],
  ['c9', 'المناعةُ تتدرّب', 360, 330, 'big', WS(9, 3), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">بلا بكتيريا ضارّة</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
