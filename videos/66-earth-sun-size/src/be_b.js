// be_b.js (#66): scenes 7-13 (no heart, bone or mountain holds; the Sun orbits us; why the Sun does not collapse; the collapse; the black hole; the end) + UI
// ---------- 7: no heart can pump, no bone holds, no mountain stays standing ----------
function heartI(x, y, s, beat) { const k = 1 + .08 * beat; return `<g transform="translate(${x},${y}) scale(${(s * k).toFixed(3)})"><path d="M0,40 C-70,-10 -50,-70 0,-36 C50,-70 70,-10 0,40Z" fill="#c8302a"/><path d="M-30,-40 C-44,-30 -44,-14 -34,-4" stroke="#fff" stroke-width="6" fill="none" opacity=".35" stroke-linecap="round"/><path d="M-6,-44 q-4,-20 10,-30 M10,-40 q8,-18 22,-20" stroke="#8a1a1a" stroke-width="8" fill="none" stroke-linecap="round"/></g>`; }
function boneI(x, y, s, br) {   // br = 0..1 break
  const half = (sg) => `<g transform="rotate(${(sg * 18 * br).toFixed(1)}) translate(${(sg * 10 * br).toFixed(1)},${(12 * br).toFixed(1)})"><path d="M${sg * 4},-11 H${sg * 70} M${sg * 4},11 H${sg * 70}" stroke="#e8e0cc" stroke-width="2"/><rect x="${sg > 0 ? 2 : -72}" y="-11" width="70" height="22" fill="#efe8d6"/><circle cx="${sg * 76}" cy="-14" r="17" fill="#efe8d6"/><circle cx="${sg * 76}" cy="14" r="17" fill="#efe8d6"/><path d="M${sg * 10},-6 H${sg * 60}" stroke="#fff" stroke-width="4" opacity=".6"/></g>`;
  return `<g transform="translate(${x},${y}) scale(${s})">${half(-1)}${half(1)}${br > .1 ? `<path d="M-4,-14 l6,8 l-6,6 l6,8 l-4,6" stroke="#3a2a1a" stroke-width="3" fill="none" opacity="${br.toFixed(2)}"/>` : ''}</g>`;
}
function sceneCrush(t) {
  const T = t - (S0(7) - .2), h1 = ease(ramp(t, WS(7, 1), WS(7, 4))), h2 = ease(ramp(t, WS(7, 7), WS(7, 8))), fl = ease(ramp(t, WS(7, 10), S0(8) - .1));
  let s = `<defs>${BED()}</defs><linearGradient id="beCS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1420"/><stop offset=".7" stop-color="#6a3a2a"/><stop offset="1" stop-color="#c87a3a"/></linearGradient><rect x="-20" y="-20" width="760" height="1320" fill="url(#beCS)"/>` + starsK(80, 9, .4);
  // the mountains are pressed flat into the plain; dust rolls out from their feet
  const yb = 1020;
  s += `<g transform="translate(0,${yb}) scale(1,${(1 - .88 * fl).toFixed(3)}) translate(0,${-yb})">${mountainsR(yb, 260, 77, { snowAt: .7, rock: '#6a5a52' })}</g>`;
  if (fl > 0) { let d = ''; for (let i = 0; i < 14; i++) { const x = i * 56 - 20, r = 40 + 60 * fl + (i % 3) * 14; d += `<ellipse cx="${x + Math.sin(i) * 10}" cy="${yb - r * .3}" rx="${(r * 1.4).toFixed(1)}" ry="${(r * .6).toFixed(1)}" fill="#b89a7a" opacity="${(.55 * fl).toFixed(2)}"/>`; } s += `<g filter="url(#blur9)">${d}</g>`; }
  s += `<rect x="-20" y="${yb}" width="760" height="300" fill="url(#beRock)"/><rect x="-20" y="${yb}" width="760" height="300" fill="#000" filter="url(#rockF)" opacity=".4"/>`;
  // heart and bone above
  s += `<g opacity="${h1.toFixed(2)}">${panel(40, 420, 240, 220)}${heartI(160, 530, 1.2, h2 > 0 ? 0 : Math.max(0, Math.sin(T * 7)))}${xMark(160, 520, 60, ease(ramp(t, WS(7, 4), WS(7, 5) + .3)))}${BEL(160, 620, 'القلب', 1, '#fff', 26)}</g>`;
  s += `<g opacity="${h2.toFixed(2)}">${panel(300, 420, 240, 220)}${boneI(420, 520, .95, ease(ramp(t, WS(7, 7), WS(7, 8) + .3)))}${BEL(420, 620, 'العظام', 1, '#fff', 26)}</g>`;
  s += BEL(360, 1150, 'الجبالُ تنسحق', fl, '#ffd27a', 34);
  noEarth(); F.ov = ''; return s;
}

// ---------- 8: the Sun is now 4 times lighter than us: it starts to circle the Earth ----------
function sceneOrbit(t) {
  const T = t - (S0(8) - .2), k = ease(ramp(t, S0(8) - .2, S0(8) + 1)), sp = ease(ramp(t, WS(8, 7), WS(8, 9))) ;
  const cam = orbit(27, .42, .1, [0, 0, 0], 30), R = 3.6, a = 1.2 + (T > 0 ? (T - 3) * .45 * sp + 0 : 0) + Math.max(0, T - 3) * .0;
  const ang = 2.4 + Math.max(0, t - WS(8, 7)) * .6;
  const spos = [Math.cos(ang) * R, 0, Math.sin(ang) * R];
  glE(t, { d: 9.8, el: .3, lon: 40 + T * 6, clouds: .45, lights: .25 }); F.w.cam = cam;
  F.w.L = [spos[0], spos[1] + .2, spos[2]];
  F.w.sun = { pos: spos, r: .42, a: 1, hue: 0, g: 3.4, ts: 1.2 };
  const [qx, qy] = proj3(cam, spos);
  let ov = `<defs>${BED()}</defs><path d="${ring3(cam, [0, 0, 0], R)}" stroke="#ffd27a" stroke-width="2.5" fill="none" stroke-dasharray="12 10" opacity="${(.7 * sp).toFixed(2)}"/>`;
  // an arrow along the orbit, just ahead of the Sun
  if (sp > 0) { const a2 = ang + .35, [x1, y1] = proj3(cam, [Math.cos(ang + .18) * R, 0, Math.sin(ang + .18) * R]), [x2, y2] = proj3(cam, [Math.cos(a2) * R, 0, Math.sin(a2) * R]), an = Math.atan2(y2 - y1, x2 - x1);
    ov += `<path d="M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}" stroke="#ffd27a" stroke-width="5" opacity="${sp.toFixed(2)}"/><path d="M${(x2 + Math.cos(an) * 16).toFixed(1)},${(y2 + Math.sin(an) * 16).toFixed(1)} L${(x2 + Math.cos(an + 2.5) * 16).toFixed(1)},${(y2 + Math.sin(an + 2.5) * 16).toFixed(1)} L${(x2 + Math.cos(an - 2.5) * 16).toFixed(1)},${(y2 + Math.sin(an - 2.5) * 16).toFixed(1)}Z" fill="#ffd27a" opacity="${sp.toFixed(2)}"/>`; }
  ov += BEL(qx, qy - 70, 'الشمس', k, '#ffd27a', 30);
  const [ex, ey] = proj3(cam, [0, 0, 0]);
  ov += BEL(ex, ey + fit3(cam, [0, 0, 0], 1)[2] + 46, 'الأرض: ٤ أضعاف كتلة الشمس', ease(ramp(t, WS(8, 3), WS(8, 5))), '#bfe6ff', 26);
  F.ov = ov; return space(t);
}

// ---------- 9: the Sun does not collapse because its heat pushes out; our Earth is cold ----------
function arrowR(x, y, ang, L, col, a, w = 8) { const ex = x + Math.cos(ang) * L, ey = y + Math.sin(ang) * L; return `<g opacity="${a.toFixed(2)}"><path d="M${x.toFixed(1)},${y.toFixed(1)} L${ex.toFixed(1)},${ey.toFixed(1)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M${(ex + Math.cos(ang) * 14).toFixed(1)},${(ey + Math.sin(ang) * 14).toFixed(1)} L${(ex + Math.cos(ang + 2.4) * 14).toFixed(1)},${(ey + Math.sin(ang + 2.4) * 14).toFixed(1)} L${(ex + Math.cos(ang - 2.4) * 14).toFixed(1)},${(ey + Math.sin(ang - 2.4) * 14).toFixed(1)}Z" fill="${col}"/></g>`; }
function scenePress(t) {
  const T = t - (S0(9) - .2), ha = ease(ramp(t, WS(9, 4), WS(9, 7))), ca = ease(ramp(t, WS(9, 10) + .1, WS(9, 12)));
  let s = `<defs>${BED()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(160, 13, .7);
  // the Sun: cut open, hot core; red arrows (heat) push out, blue arrows (gravity) push in: balanced
  const sx = 360, sy = 600, R = 150, pul = Math.sin(T * 3) * 6;
  s += sunBall(sx, sy, R + pul * .3, t) + cutaway('bs', sx, sy, R, -.5, .9, [[0, '#ffffff'], [.25, '#fff0a0'], [.6, '#ffa030'], [1, '#d0500a']], [[0, .7, 'flowF', .35], [.7, 1, 'cellF', .4]], t, [.35, .9]);
  for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283 + .2; s += arrowR(sx + Math.cos(an) * (R * .45), sy + Math.sin(an) * (R * .45), an, 80 + pul, '#ff6a3a', ha) + arrowR(sx + Math.cos(an + .2) * (R + 100), sy + Math.sin(an + .2) * (R + 100), an + .2 + Math.PI, 70, '#5aa8ff', ha, 7); }
  s += BEL(sx, sy + R + 150, 'الحرارةُ تدفعُ للخارج', ha * (1 - ease(ramp(t, WS(9, 9), WS(9, 10)))), '#ff9a6a', 28);
  // the Earth, cold: only blue arrows, pointing in
  const ex = 360, ey = 1110, eR = 88;
  s += `<g opacity="${ca.toFixed(2)}">${eIco(ex, ey, eR, 1)}<circle cx="${ex}" cy="${ey}" r="${eR}" fill="url(#beSh)" opacity=".5"/>`;
  for (let i = 0; i < 8; i++) { const an = i / 8 * 6.283; s += arrowR(ex + Math.cos(an) * (eR + 68), ey + Math.sin(an) * (eR + 68), an + Math.PI, 46, '#5aa8ff', 1, 7); }
  s += BEL(ex, ey - eR - 110, 'باردة: لا شيءَ يدفعُ للخارج', 1, '#bfe6ff', 26) + `</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: nothing stops it from collapsing in minutes: the planet shrinks, glowing ----------
function sceneCollapse(t) {
  const T = t - (S0(10) - .2), u = ease(ramp(t, WS(10, 4), S0(11) + .2)), d = lerp(9.8, 70, Math.pow(u, 2.2));
  glE(t, { d, el: .3, lon: 60 + T * (8 + 60 * u), clouds: .45 * (1 - u), lights: .2 });
  Object.assign(F.w.disc, { star: clamp(u * 1.4), glow: .9 * u, gs: 5 + 6 * u, gc: [1, .55 + .4 * u, .3 + .6 * u] });
  F.w.L = [.5, .4, .8];
  const mn = Math.floor(clamp((t - WS(10, 7)) / (S0(11) - WS(10, 7))) * 15);
  let ov = `<defs>${BED()}</defs>`;
  const ck = ease(ramp(t, WS(10, 7), WS(10, 8)));
  ov += `<g opacity="${ck.toFixed(2)}">${panel(230, 1010, 260, 150)}${dialF(300, 1085, 46, 12, mn * 4, {})}<text x="420" y="1100" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="44" fill="#f4c76b">${arN(mn)}</text>${BEL(420, 1140, 'دقيقة', 1, '#fff', 22)}</g>`;
  F.ov = ov; return space(t);
}

// ---------- 11: it may end as a black hole about 23 km wide ----------
function blackHole(cx, cy, R, t, a = 1) {
  if (a <= 0) return ''; let s = `<g opacity="${a.toFixed(2)}">`;
  // the far half of the hot disc, bent up over the hole (lensing)
  s += `<ellipse cx="${cx}" cy="${cy}" rx="${(R * 3.2).toFixed(1)}" ry="${(R * 2.1).toFixed(1)}" fill="url(#beAcc)" opacity=".55"/>`;
  s += `<path d="M${cx - R * 2.6},${cy} A${R * 2.6},${R * 1.5} 0 0 1 ${cx + R * 2.6},${cy}" stroke="#ffcf8a" stroke-width="${(R * .32).toFixed(1)}" fill="none" opacity=".75" filter="url(#blur5)"/>`;
  s += scr(`<circle cx="${cx}" cy="${cy}" r="${(R * 1.18).toFixed(1)}" fill="none" stroke="#fff0c8" stroke-width="${(R * .08).toFixed(1)}" opacity=".9"/>`);
  s += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#000"/>`;
  // the near half of the disc, flat, in front
  let ring = ''; for (let i = 0; i < 6; i++) ring += `<path d="M${cx - R * (1.6 + i * .25)},${cy} A${R * (1.6 + i * .25)},${R * (.32 + i * .05)} 0 0 0 ${cx + R * (1.6 + i * .25)},${cy}" stroke="${['#fff6d8', '#ffd890', '#ffb050', '#f08a3a', '#c85a2a', '#8a3a1a'][i]}" stroke-width="${(R * .14).toFixed(1)}" fill="none" opacity="${(.9 - i * .1).toFixed(2)}" stroke-dasharray="${(R * .5).toFixed(0)} ${(R * .12).toFixed(0)}" stroke-dashoffset="${(t * R * (2 - i * .2)).toFixed(0)}"/>`;
  s += scr(`<g filter="url(#blur2)">${ring}</g>`);
  return s + `</g>`;
}
function skyline(x0, x1, base, h, seed, col) { const r = RS(seed); let s = '', x = x0; while (x < x1) { const w = 6 + r() * 12, hh = h * (.25 + r() * .75 * (1 - Math.abs((x - (x0 + x1) / 2) / ((x1 - x0) / 2)) * .6)); s += `<rect x="${x.toFixed(1)}" y="${(base - hh).toFixed(1)}" width="${Math.min(w, x1 - x).toFixed(1)}" height="${hh.toFixed(1)}" fill="${col}"/>`; x += w + 1; } return s; }
function sceneHole(t) {
  const T = t - (S0(11) - .2), fl = clamp(1 - T / .6), bh = ease(ramp(t, S0(11) - .2, WS(11, 5) + .2)), cm = ease(ramp(t, WS(11, 7), WS(11, 11)));
  let s = `<defs>${BED()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(220, 57, .8);
  s += blackHole(360, 700, 90, t, bh);
  if (fl > 0) s += scr(`<circle cx="360" cy="700" r="${(200 + 300 * (1 - fl)).toFixed(1)}" fill="url(#beHot)" opacity="${fl.toFixed(2)}"/>`);
  // a city drawn under it at the same width: 23 km
  if (cm > 0) s += `<g opacity="${cm.toFixed(2)}">${skyline(270, 450, 1060, 70, 9, '#5a6a8a')}<rect x="250" y="1060" width="220" height="6" fill="#3a4a6a"/>` +
    `<path d="M270,1100 H450 M270,1088 V1112 M450,1088 V1112" stroke="#f4c76b" stroke-width="4"/>${BEL(360, 1150, '≈ ٢٣ كم', 1, '#f4c76b', 36)}<path d="M270,940 V${700 + 0} M450,940 V700" stroke="#f4c76b" stroke-width="2" stroke-dasharray="6 8" opacity=".6"/></g>`;
  s += BEL(360, 470, 'ثقبٌ أسود', ease(ramp(t, WS(11, 5), WS(11, 6))), '#fff', 36);
  noEarth(); F.ov = ''; return s;
}

// ---------- 12: a black hole where our home was; the Sun and the planets circle it ----------
function sceneSystem(t) {
  const T = t - (S0(12) - .2), k = ease(ramp(t, S0(12) - .2, S0(12) + .8)), pl = ease(ramp(t, WS(12, 5), WS(12, 6) + .3));
  let s = `<defs>${BED()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(220, 61, .8);
  const cx = 360, cy = 760, tilt = .38;
  const orb = [[100, '#c8b8a0', 7, 'عطارد'], [150, '#e8c890', 9, 'الزهرة'], [215, '#ffd27a', 20, 'الشمس'], [280, '#d8704a', 8, 'المرّيخ'], [340, '#d8b890', 16, 'المشتري']];
  orb.forEach(([R, col, r, nm], i) => { const isS = i === 2, a = (isS ? k : pl); if (a <= 0) return;
    s += `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${(R * tilt).toFixed(1)}" fill="none" stroke="${isS ? '#ffd27a' : '#8aa0c8'}" stroke-width="${isS ? 2.5 : 1.6}" stroke-dasharray="8 8" opacity="${(.6 * a).toFixed(2)}"/>`;
    const an = 1.2 + i * 1.3 + T * (1.6 / Math.pow(R / 100, 1.5)), x = cx + Math.cos(an) * R, y = cy + Math.sin(an) * R * tilt;
    s += isS ? sunBall(x, y, r, t, a) + BEL(x, y - 40, nm, a, '#ffd27a', 26) : `<g opacity="${a.toFixed(2)}"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${col}"/><circle cx="${(x - r * .3).toFixed(1)}" cy="${(y - r * .3).toFixed(1)}" r="${(r * .4).toFixed(1)}" fill="#fff" opacity=".3"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="url(#beSh)" opacity=".6"/></g>`; });
  s += blackHole(cx, cy, 26, t, 1);
  s += BEL(cx, cy + 90, 'مكانَ الأرض', ease(ramp(t, WS(12, 2), WS(12, 3))), '#fff', 26);
  noEarth(); F.ov = ''; return s;
}

// ---------- 13: the end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(13, 0) - .2, WS(13, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: 20 + t * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(13, 9) - .3, WS(13, 9) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
function xMark(x, y, R, k) { if (k <= 0) return ''; const a = R * k; return `<g opacity="${Math.min(1, k * 2).toFixed(2)}"><path d="M${x - a},${y - a} L${x + a},${y + a} M${x + a},${y - a} L${x - a},${y + a}" stroke="#e53935" stroke-width="14" stroke-linecap="round"/></g>`; }
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneWide }, { s: S0(2) - .2, f: sceneMoon }, { s: S0(4) - .2, f: sceneScale }, { s: S0(6) - .2, f: sceneWeight },
  { s: S0(7) - .2, f: sceneCrush }, { s: S0(8) - .2, f: sceneOrbit }, { s: S0(9) - .2, f: scenePress }, { s: S0(10) - .2, f: sceneCollapse }, { s: S0(11) - .2, f: sceneHole },
  { s: S0(12) - .2, f: sceneSystem }, { s: S0(13) - .2, f: sceneEarth }];
const NOKB = new Set([sceneWide, sceneMoon, sceneOrbit, sceneCollapse]);
const XF = .5;
const TLI = [['القمر', S0(2)], ['الكتلة', S0(4)], ['الجاذبيّة', S0(6)], ['الشمس تدور', S0(8)], ['الانهيار', S0(10)], ['ثقبٌ أسود', S0(11)]];
const LIST_ON = new Set([sceneCrush]);
const CHIPS = [
  ['c0', 'الأرضُ بحجمِ الشمس؟', 360, 330, 'big', WS(0, 6), S0(1) - .3],
  ['c1', 'أعرضُ ١٠٩ مرّات', 360, 330, 'big', WS(1, 4), S0(2) - .3],
  ['c2', 'الضحيّةُ الأولى: القمر', 360, 330, 'red big', WS(2, 0), S0(3) - .3],
  ['c3', 'دُفِنَ القمر', 360, 330, 'red big', WS(3, 1), S0(4) - .3],
  ['c4', 'أثقلُ ٤ مرّات', 360, 330, 'big', WS(4, 9), S0(5) - .3],
  ['c5', 'كتلتُها = ٤ شموس', 360, 330, 'big', WS(5, 2), S0(6) - .3],
  ['c6', '٧٠ كغ ← +٧ أطنان', 360, 330, 'red big', WS(6, 11), S0(7) - .3],
  ['c7', 'لا شيءَ يصمد', 360, 330, 'red big', WS(7, 0), S0(8) - .3],
  ['c8', 'الشمسُ تدورُ حولَنا', 360, 330, 'big', WS(8, 7), S0(9) - .3],
  ['c9', 'الأرضُ باردة', 360, 330, 'big', WS(9, 10), S0(10) - .3],
  ['c10', 'انهيارٌ خلالَ دقائق', 360, 330, 'red big', WS(10, 4), S0(11) - .3],
  ['c11', 'ثقبٌ أسود بعرضِ ٢٣ كم', 360, 330, 'big', WS(11, 5), S0(12) - .3],
  ['c12', 'مكانَ بيتِنا', 360, 330, 'red big', WS(12, 2), S0(13) - .3],
  ['c13', '@MadhaLawLab', 360, 1200, 'dark', WS(13, 9) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">أرضٌ بحجمِ الشمس</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
