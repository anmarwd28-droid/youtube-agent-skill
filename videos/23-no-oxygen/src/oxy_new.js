
// ===================== "what if the oxygen in the air vanished for 5 seconds?" =====================
const lbl = (x, y, tx, a, col = '#fff', fs = 24, anc = 'middle') => `<text x="${x}" y="${y}" text-anchor="${anc}" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const lblL = (x, y, tx, a, col = '#fff', fs = 24) => `<text x="${x}" y="${y}" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}" style="paint-order:stroke" stroke="#000" stroke-width="5" stroke-opacity=".75">${tx}</text>`;
const FIREDEF = `<radialGradient id="fireGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb040" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>`;
const DEFB = () => `${RDEF}${RDEF2}${CUDEF}${FIREDEF}`;
function flameT(x, y, h, t, seed, a = 1) {
  if (h < 2 || a <= 0) return ''; let o = `<circle cx="${x}" cy="${y - h * .35}" r="${h * .9}" fill="url(#fireGlow)" opacity="${a}"/>`;
  for (let q = 0; q < 3; q++) { const off = (q - 1) * h * .22, hh = h * (q === 1 ? 1 : .72), w = hh * .3, f1 = Math.sin(t * 13 + seed + q * 2) * .12 * hh, f2 = Math.sin(t * 8.7 + seed * 1.3 + q) * .07 * hh, xx = x + off;
    const pth = sc => `M${xx - w * sc},${y} C${xx - w * sc},${y - hh * .45 * sc} ${xx - w * .2 + f2},${y - hh * .7 * sc} ${xx + f1},${y - hh * sc} C${xx + w * .25 + f2},${y - hh * .7 * sc} ${xx + w * sc},${y - hh * .45 * sc} ${xx + w * sc},${y}Z`;
    o += `<path d="${pth(1.25)}" fill="#b8261a" opacity="${.35 * a}"/><path d="${pth(1)}" fill="#e2431a" opacity="${.8 * a}"/><path d="${pth(.7)}" fill="#ff8c1a" opacity="${.9 * a}"/><path d="${pth(.4)}" fill="#ffe680" opacity="${a}"/>`; }
  return o;
}
function cityDay(t, o = {}) { return bareStreet(t, Object.assign({ id: o.id || 'c', green: 1, sky: o.sky || ['#3e72b8', '#96bce0', '#e8e2d0'], afterSky: `<defs>${CUDEF}</defs>` + cumulus(200, 430, 220, 1, { a: .9 }) + cumulus(560, 520, 170, 2, { a: .85 }) }, o)); }
// the air as a ring chart: nitrogen 78 %, oxygen 21 %, argon and others ~1 %; the oxygen slice can fade out (k = 0..1 gone)
function airRing(cx, cy, R, k, a = 1) {
  const arc = (a0, a1, col, op) => { const p0 = [cx + Math.cos(a0) * R, cy + Math.sin(a0) * R], p1 = [cx + Math.cos(a1) * R, cy + Math.sin(a1) * R]; return `<path d="M${p0[0].toFixed(1)},${p0[1].toFixed(1)} A${R},${R} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p1[0].toFixed(1)},${p1[1].toFixed(1)}" stroke="${col}" stroke-width="${R * .32}" fill="none" opacity="${op}"/>`; };
  const s0 = -Math.PI / 2, n1 = s0 + 6.283 * .78, o1 = n1 + 6.283 * .21, e = s0 + 6.283;
  return `<g opacity="${a}"><circle cx="${cx}" cy="${cy}" r="${R * 1.25}" fill="#0a0e1c" opacity=".85"/>` + arc(s0, n1 - .02, '#6a8ac8', 1) + arc(n1, o1 - .02, '#4ad8ff', 1 - k) + arc(o1, e - .02, '#c8a0ff', 1) +
    `<path d="M${cx + Math.cos(n1) * R * .7},${cy + Math.sin(n1) * R * .7}" />` + lbl(cx, cy - 4, `نيتروجين ٧٨٪`, 1, '#cfd8ff', R * .2) + lbl(cx, cy + R * .3, `أكسجين ٢١٪`, 1 - k * .7, k > .5 ? '#ff7a6a' : '#4ad8ff', R * .19) + `</g>`;
}
// 0: a normal city day; the air's oxygen (a cyan shimmer) vanishes at "اختفى"
function sceneHook(t) {
  const g = ease(ramp(t, WS(0, 3), WS(0, 6)));
  let s = cityDay(t, { id: 'h0' });
  const r = RS(3); let mol = '';
  for (let i = 0; i < 70; i++) { const x = (r() * 760 + t * 20 * (r() - .5)) % 760, y = 300 + r() * 760; mol += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(i * 37 + t * 40) % 360})" opacity="${((1 - g) * .75).toFixed(2)}"><circle cx="-6" r="6" fill="#4ad8ff"/><circle cx="6" r="6" fill="#4ad8ff"/><circle cx="-8" cy="-2" r="2" fill="#fff" opacity=".6"/></g>`; }
  s += mol + onWalk(150 + Math.min(t, 2.4) * 30, 1088, CROWD[0], .55, 1, t, { moving: t < 2.4 ? 1 : 0, phase: t * 6, lookUp: .3 * g }) + onWalk(560, 1082, CROWD[1], .52, -1, t, { lookUp: .3 * g });
  s += `<g opacity="${ease(ramp(t, WS(0, 6) - .2, WS(0, 6) + .3))}"  transform="translate(360,560)"><circle r="70" fill="#0a0e1c" opacity=".85"/><circle r="56" fill="none" stroke="#4ad8ff" stroke-width="8" stroke-dasharray="${352 * (1 - pmod(t, 1) * .2)} 400" transform="rotate(-90)"/>` + lbl(0, 16, '٥ ث', 1, '#fff', 40) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 1: oxygen is a fifth of the air: the ring loses its 21 % slice; pressure gauge 101 -> 80 kPa; like standing 2,000 m up; ears pop
function scenePressure(t) {
  const k = ease(ramp(t, WS(1, 3) - .2, WS(1, 5) + .3)), mt = ease(ramp(t, WS(1, 6) - .2, WS(1, 9) + .3)), ear = ramp(t, WS(1, 10), WS(1, 11) + .4);
  let s = `<defs>${DEFB()}<linearGradient id="skP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e5e9e"/><stop offset="1" stop-color="#b8d0e8"/></linearGradient></defs><rect width="720" height="1280" fill="url(#skP)"/>`;
  s += cumulus(560, 470, 160, 4, { a: .8 }) + mountainsR(1010, 300, 31, { snowAt: .3, rock: '#7a7468', haze: .25, hazeCol: '#a8c0d8' }) + meadow(1000, 1280, t);
  // altitude marker on the mountain, rising with mt
  const my = lerp(1150, 640, mt);
  s += ` <path d="M90,1150 L90,${my}" stroke="#fff" stroke-width="3" stroke-dasharray="8 6" opacity="${mt}"/><g opacity="${mt}">` + lbl(110, my + 8, '≈ ٢٠٠٠ م', 1, '#fff', 30, 'start') + `</g>`;
  s += person(560, 1220, { s: .72, face: -1, top: CROWD[2].top, pants: CROWD[2].pants, skin: CROWD[2].skin, hair: CROWD[2].hair, t });
  if (ear > 0) for (let i = 0; i < 3; i++) s += `<path d="M${520 - i * 14},${1032 - i * 6} q-12,14 0,28" stroke="#ffd860" stroke-width="4" fill="none" opacity="${(Math.sin(ear * 3.14) * (1 - i * .25)).toFixed(2)}"/>`;
  s += airRing(170, 520, 95, k);
  const p = Math.round(lerp(101, 80, k));
  s += `<g transform="translate(40,680)"><rect width="270" height="150" rx="16" fill="#0a0e1c" opacity=".88"/>` + lbl(135, 38, 'ضغط الهواء', 1, '#cfd8ff', 22) + `<text x="135" y="104" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="46" fill="${k > .9 ? '#ff7a5a' : '#fff'}">${p} kPa</text>` + lbl(135, 138, k > .9 ? '−٢١٪' : '', 1, '#ff7a5a', 22) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// a forest fire on a hillside at dusk; fl = flame size 0..1, ember glow and smoke continue
function fireHill(t, fl, id) {
  let s = `<defs>${DEFB()}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2238"/><stop offset=".6" stop-color="#7a4a3a"/><stop offset="1" stop-color="#c8784a"/></linearGradient></defs><rect width="720" height="1280" fill="url(#sk${id})"/>`;
  s += mountainsR(900, 260, 44, { rock: '#4a3a34', haze: .35, hazeCol: '#8a5a48' }) + forestR(980, 26, 110, 170, 5, '#2a3a26', { haze: .25, hazeCol: '#5a3a30' });
  s += `<path d="M-20,1040 Q360,1000 740,1050 L740,1280 L-20,1280Z" fill="#2a2a20"/><path d="M-20,1040 Q360,1000 740,1050 L740,1280 L-20,1280Z" fill="#000" filter="url(#grainR)" opacity=".3"/>`;
  const r = RS(12);
  // smoke columns
  for (let i = 0; i < 7; i++) { const x = 60 + i * 100 + r() * 30, ph = pmod(t * .15 + r(), 1); s += `<ellipse cx="${x + ph * 60}" cy="${960 - ph * 520}" rx="${50 + ph * 120}" ry="${40 + ph * 70}" fill="#4a4448" opacity="${(.45 * (1 - ph)).toFixed(2)}" filter="url(#soft)"/>`; }
  // charred trunks with embers, and flames
  for (let i = 0; i < 14; i++) { const x = 20 + i * 52 + r() * 20, y = 1000 + r() * 70, h = 90 + r() * 90;
    s += `<path d="M${x},${y} L${x + 3},${y - h} L${x + 6},${y}Z" fill="#1a1412"/><circle cx="${x + 3}" cy="${y - h * .4}" r="4" fill="#ff6a1a" opacity="${(.5 + .4 * Math.sin(t * 5 + i)).toFixed(2)}" filter="url(#blur2)"/>` + flameT(x + 3, y - h * .25, h * .9 * fl * (.8 + .3 * r()), t, i * 7, Math.min(1, fl * 1.5)); }
  for (let i = 0; i < 30; i++) { const x = r() * 720, y = 1060 + r() * 200; s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2 + r() * 4).toFixed(1)}" fill="#ff7a2a" opacity="${(.4 + .4 * Math.sin(t * 4 + i)).toFixed(2)}"/>`; }
  s += `<rect width="720" height="1280" fill="#ff7a2a" opacity="${(.12 * fl).toFixed(2)}" style="mix-blend-mode:screen"/>`;
  return s;
}
// 2: every fire goes out at once: a forest fire on the hill, insets of a gas stove and a candle
function sceneFire(t) {
  const out = ease(ramp(t, WS(2, 4) - .1, WS(2, 4) + .4)), stove = ease(ramp(t, WS(2, 7) + .2, WS(2, 7) + .5)), cand = ease(ramp(t, WS(2, 8) + .2, WS(2, 8) + .5));
  let s = fireHill(t, 1 - out, 'F2');
  const inset = (x, y, title, body, a) => `<g transform="translate(${x},${y})" opacity="${a}"><rect width="210" height="220" rx="16" fill="#0a0e1c" opacity=".9"/>${body}` + lbl(105, 205, title, 1, '#cfd8ff', 22) + `</g>`;
  const gas = `<rect x="15" y="40" width="180" height="140" rx="10" fill="#1e1e22"/><ellipse cx="105" cy="120" rx="60" ry="18" fill="#3a3a40"/><ellipse cx="105" cy="118" rx="44" ry="12" fill="#5a5a62"/>` + Array.from({ length: 14 }, (_, i) => { const a = i / 14 * 6.283, x = 105 + Math.cos(a) * 44, y = 118 + Math.sin(a) * 12, h = (14 + 4 * Math.sin(t * 20 + i)) * (1 - stove); return h > 1 ? `<path d="M${(x - 4).toFixed(1)},${y.toFixed(1)} Q${x.toFixed(1)},${(y - h * 2).toFixed(1)} ${(x + 4).toFixed(1)},${y.toFixed(1)}Z" fill="${i % 2 ? '#4a8aff' : '#7ab8ff'}" opacity=".9"/>` : ''; }).join('') + `<ellipse cx="105" cy="104" rx="60" ry="30" fill="#4a8aff" opacity="${(.15 * (1 - stove)).toFixed(2)}" filter="url(#blur2)"/>`; const gasOld = `<rect x="35" y="140" width="140" height="18" rx="4" fill="#3a3a40"/><ellipse cx="105" cy="140" rx="50" ry="8" fill="#2a2a30"/>` + Array.from({ length: 9 }, (_, i) => { const a = i / 9 * 6.283, x = 105 + Math.cos(a) * 40; return `<path d="M${x - 4},${136} q4,${-20 * (1 - stove)} 8,0" fill="#4a8aff" opacity="${(1 - stove).toFixed(2)}"/>`; }).join('') + `<ellipse cx="105" cy="120" rx="60" ry="18" fill="#6a6a70"/><rect x="45" y="70" width="120" height="50" rx="8" fill="#8a8a92"/>`;
  const cnd = `<rect x="88" y="100" width="34" height="80" rx="4" fill="#f2ead8"/><path d="M105,100 v-10" stroke="#2a2a2a" stroke-width="2"/>` + flameT(105, 92, 40, t, 3, 1 - cand) + `<path d="M105,88 q-8,-20 4,-40 q-10,-20 2,-40" stroke="#aaa" stroke-width="3" fill="none" opacity="${(cand * .6).toFixed(2)}" filter="url(#blur2)"/>`;
  s += inset(40, 400, 'موقد', gas, ramp(t, WS(2, 6) - .6, WS(2, 6) - .2)) + inset(260, 640, 'شمعة', cnd, ramp(t, WS(2, 7) - .6, WS(2, 7) - .2));
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 3: car engines stall (they burn fuel with the oxygen in the air); a jet's engines flame out, then the pilots relight them
function sceneEngines(t) {
  const st = S0(3) - .2, T = t - st, stop = ease(ramp(t, WS(3, 2) - .3, WS(3, 2) + .5)), jet = ramp(t, WS(3, 8) - .3, WS(3, 8)), fo = ramp(t, WS(3, 12) - .2, WS(3, 12) + .3), rl = ramp(t, WS(3, 16) - .2, WS(3, 17) + .3);
  let s = cityDay(t, { id: 'e3' });
  const v = 140 * (1 - stop), cx = -100 + Math.min(T, WS(3, 2) - st) * 190 + Math.min(Math.max(0, T - (WS(3, 2) - st)), .6) * 130;
  for (let i = 0; i < 6; i++) { const ph = pmod(T * 1.5 + i / 6, 1); s += `<circle cx="${(cx - 130 - ph * 70).toFixed(1)}" cy="${(1158 - ph * 30).toFixed(1)}" r="${(6 + ph * 16).toFixed(1)}" fill="#b8b8b8" opacity="${(.45 * (1 - ph) * (1 - stop)).toFixed(2)}" filter="url(#blur2)"/>`; }
  s += car(cx, 1172, .85, '#2a6ac8', 1);
  s += `<g opacity="${stop}" transform="translate(${cx},1060)"><rect x="-80" y="-24" width="160" height="40" rx="10" fill="#0a0e1c" opacity=".85"/>` + lbl(0, 4, 'المحرّك توقّف', 1, '#ff9a8a', 20) + `</g>`;
  // the plane high in the sky
  s += `<g opacity="${jet}" transform="translate(${420 + T * 8},${430}) scale(.42)">${airliner()}</g>`;
  const eng = [[420 + T * 8 - 4, 430 + 16]];
  eng.forEach(([x, y]) => { const on = (1 - fo) + rl; s += `<path d="M${x - 30},${y} l-${70 * Math.min(1, on)},4" stroke="#fff" stroke-width="5" opacity="${(.35 * jet * Math.min(1, on)).toFixed(2)}" filter="url(#blur2)"/>`; });
  s += `<g opacity="${jet * fo * (1 - rl)}" transform="translate(${420 + T * 8},380)"><rect x="-90" y="-60" width="180" height="40" rx="10" fill="#c83a2a"/>` + lbl(0, -32, 'انطفاء المحرّك', 1, '#fff', 20) + `</g><g opacity="${jet * rl}" transform="translate(${420 + T * 8},380)"><rect x="-90" y="-60" width="180" height="40" rx="10" fill="#2a8a4a"/>` + lbl(0, -32, 'إعادة تشغيل', 1, '#fff', 20) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 4: you're fine: oxygen already in the blood keeps the brain working longer than 5 seconds
function sceneYou(t) {
  const st = S0(4) - .2, T = t - st, bl = ease(ramp(t, WS(4, 6) - .2, WS(4, 10) + .3));
  let s = cityDay(t, { id: 'y4' }) + `<rect width="720" height="1280" fill="#0a1028" opacity=".62"/><defs>${DEFB()}</defs>`;
  s += person(360, 1180, { s: 1.6, face: 1, top: CROWD[0].top, pants: CROWD[0].pants, skin: CROWD[0].skin, hair: CROWD[0].hair, t });
  const hb = 1 + .08 * Math.max(0, Math.sin(T * 7));
  // heart, vessels, brain
  s += `<g opacity="${bl}"><path d="M372,${1180 - 1.6 * 225} C330,${1180 - 1.6 * 245} 345,${1180 - 1.6 * 290} 362,${1180 - 1.6 * 305}" stroke="#ff4a5a" stroke-width="6" fill="none" stroke-dasharray="14 10" stroke-dashoffset="${-T * 60}"/>` +
    `<g transform="translate(374,${1180 - 1.6 * 220}) scale(${hb})"><path d="M0,10 C-22,-6 -14,-24 0,-14 C14,-24 22,-6 0,10Z" fill="#e8384a"/></g>` +
    `<ellipse cx="366" cy="${1180 - 1.6 * 305}" rx="26" ry="18" fill="#ffb0c0" opacity="${(.55 + .2 * Math.sin(T * 4)).toFixed(2)}" filter="url(#blur2)"/></g>`;
  s += `<g transform="translate(360,520)" opacity="${ramp(t, WS(4, 1), WS(4, 2))}"><rect x="-150" y="-50" width="300" height="80" rx="16" fill="#0a0e1c" opacity=".88"/>` + lbl(0, 6, '٥ ثوانٍ فقط', 1, '#f4c76b', 32) + `</g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 5: the surprise: buildings and water stay – their oxygen is bound in molecules (H₂O, silicates, carbonates), only free O₂ gas vanished
function sceneBound(t) {
  const st = S0(5) - .2, T = t - st, m = ease(ramp(t, WS(5, 7) - .2, WS(5, 10) + .3)), fr = ramp(t, WS(5, 13) - .2, WS(5, 15) + .3);
  let s = cityDay(t, { id: 'b5' });
  s += `<rect width="720" height="1280" fill="#06081a" opacity="${(.55 * m).toFixed(2)}"/>`;
  const atom = (x, y, r, c, tx) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .35}" fill="#fff" opacity=".35"/>` + lblL(x, y + r * .35, tx, 1, '#fff', r * .9);
  const wob = Math.sin(T * 2) * 4;
  let o = `<rect x="30" y="560" width="660" height="330" rx="22" fill="#0a0e1c" opacity="${(.7 * m).toFixed(2)}"/><g opacity="${m}" transform="translate(200,${680 + wob}) scale(1.35)"><path d="M0,0 L-60,50 M0,0 L60,50" stroke="#fff" stroke-width="8"/>` + atom(0, 0, 44, '#e84a3a', 'O') + atom(-60, 50, 28, '#e8e8f0', 'H') + atom(60, 50, 28, '#e8e8f0', 'H') + lbl(0, 140, 'ماء: مرتبط', 1, '#9af09a', 28) + `</g>`;
  o += `<g opacity="${m * (1 - fr * .9)}" transform="translate(520,${680 - wob}) scale(${1.35 * (1 - fr * .3)})"><path d="M-30,-6 L30,-6 M-30,6 L30,6" stroke="#fff" stroke-width="6"/>` + atom(-34, 0, 38, '#4ad8ff', 'O') + atom(34, 0, 38, '#4ad8ff', 'O') + lbl(0, 110, 'غاز حرّ', 1, '#ff9a8a', 28) + `</g>`;
  o += lbl(360, 470, 'المباني والماء باقيان', ramp(t, WS(5, 1), WS(5, 2)) * (1 - m * .0), '#fff', 30);
  F.earth = null; F.moon = null; F.sun = null; F.ov = o; return s;
}
// 6: oxygen returns: pressure back up, hot embers burst into flame again
function sceneReturn(t) {
  const back = ease(ramp(t, WS(6, 1) - .2, WS(6, 2) + .3)), re = ease(ramp(t, WS(6, 7) - .2, WS(6, 9) + .6));
  let s = fireHill(t, .9 * re, 'R6');
  const p = Math.round(lerp(80, 101, back));
  s += `<g transform="translate(225,400)"><rect width="270" height="130" rx="16" fill="#0a0e1c" opacity=".88"/>` + lbl(135, 38, 'ضغط الهواء', 1, '#cfd8ff', 22) + `<text x="135" y="104" text-anchor="middle" direction="ltr" unicode-bidi="bidi-override" font-family="Space Grotesk" font-weight="700" font-size="46" fill="${back > .9 ? '#9af09a' : '#fff'}">${p} kPa</text></g>`;
  F.earth = null; F.moon = null; F.sun = null; F.ov = ''; return s;
}
// 7: the invisible gas: Earth from space with its thin blue air; 21 % oxygen
function sceneAir(t) {
  let s = space(t, '#02030a', '#070a1c');
  F.earth = { x: 360, y: 820, r: 300, a: 1, sunI: 1.05, lights: .3, rot: 2.3 + t * .01, tilt: .41 }; F.light = [-300, 400]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${ramp(t, WS(7, 8), WS(7, 9))}">` + airRing(360, 470, 80, 0) + `</g>`;
  return s;
}
// 8: CTA
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  let s = space(t, '#03050f', '#0a1030');
  F.earth = { x: 360, y: 780, r: 250, a: 1, sunI: 1, lights: .3, rot: 2.6, tilt: .41 }; F.light = [-300, 450]; F.moon = null; F.sun = null;
  F.ov = `<g opacity="${q}"><text x="360" y="420" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 4), WS(8, 4) + .4)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return s;
}
const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: scenePressure }, { s: S0(2) - .2, f: sceneFire }, { s: S0(3) - .2, f: sceneEngines }, { s: S0(4) - .2, f: sceneYou },
  { s: S0(5) - .2, f: sceneBound }, { s: S0(6) - .2, f: sceneReturn }, { s: S0(7) - .2, f: sceneAir }, { s: S0(8) - .2, f: sceneEarth },
];
const NOKB = new Set([sceneYou, sceneAir]);
const XF = .5;
const TLI = [['الضغط يهبط', S0(1)], ['النار تنطفئ', S0(2)], ['المحرّكات تتوقّف', S0(3)], ['وأنت؟', S0(4)]];
const LIST_ON = new Set([scenePressure, sceneFire, sceneEngines]);
const CHIPS = [
  ['c1', 'خُمس الهواء', 360, 330, 'big', WS(1, 1), WS(1, 6)],
  ['c2', 'كلّ نار تنطفئ', 360, 330, 'red', WS(2, 4), S0(3) - .3],
  ['c3', 'بلا أكسجين لا احتراق', 360, 330, 'big', WS(3, 4), WS(3, 8)],
  ['c4', 'المفاجأة', 360, 330, 'big', WS(5, 0), WS(5, 7)],
  ['c5', 'الجمر يشتعل من جديد', 360, 330, 'red', WS(6, 8), S0(7) - .3],
  ['c6', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 4), 999],
];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">٥ ثوانٍ بلا أكسجين</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
