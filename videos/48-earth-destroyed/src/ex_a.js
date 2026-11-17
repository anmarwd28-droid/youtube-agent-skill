// ===================== "what if the Earth were destroyed?" (Short #48) =====================
// gl3d_ex.js = gl3d_mx.js (#43) + the moon slot can show the Earth: w.moon.ex (0 Moon → 1 Earth day map with clouds and a blue rim), w.moon.crack (glowing fissures);
// w.debris (instanced rocks: c, k, spread, R, tilt, th0, size, hot, gather, n) and w.dust (ring) as in #43.
const XDEF = `<radialGradient id="rgG" cx=".42" cy=".4" r=".62"><stop offset="0" stop-color="#ffd9a0"/><stop offset=".35" stop-color="#ff8a3a"/><stop offset=".75" stop-color="#d8401c"/><stop offset="1" stop-color="#7a160a"/></radialGradient>` +
  `<radialGradient id="rgH"><stop offset=".55" stop-color="#ff6a2a" stop-opacity=".55"/><stop offset=".8" stop-color="#ff4a1a" stop-opacity=".15"/><stop offset="1" stop-color="#ff3a1a" stop-opacity="0"/></radialGradient>` +
  `<filter id="granF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="3" seed="4"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .1  0 0 0 0 0  0 0 0 -1.6 1.15"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<radialGradient id="blueSt"><stop offset="0" stop-color="#ffffff"/><stop offset=".15" stop-color="#cfe6ff"/><stop offset=".45" stop-color="#6aa8ff" stop-opacity=".45"/><stop offset="1" stop-color="#3a7aff" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="marsSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0c1a"/><stop offset=".55" stop-color="#2a2236"/><stop offset=".82" stop-color="#5a4a5a"/><stop offset="1" stop-color="#8a6a62"/></linearGradient>` +
  `<radialGradient id="goldR" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff2c0"/><stop offset=".45" stop-color="#e8b84a"/><stop offset="1" stop-color="#8a5a14"/></radialGradient>` +
  `<radialGradient id="dishG" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#d8dce2"/><stop offset="1" stop-color="#8a929c"/></radialGradient>` +
  `<linearGradient id="lifeSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a82c8"/><stop offset=".55" stop-color="#a8cce8"/><stop offset="1" stop-color="#f0e6c8"/></linearGradient>`;
const XDEFS = () => `${LDEFS()}${MDEF}${XDEF}`;
// the moon slot shows the Earth: rotation that puts longitude `lon` facing a camera at azimuth `az`
const exRot = (lon, az) => az - Math.PI / 2 - lon * Math.PI / 180 - 4.4;

// ---------- 0: the Earth cracks with glowing fissures and bursts into a cloud of rocks ----------
const TX = () => WS(0, 12) - .15;   // the moment it bursts
function sceneHook(t) {
  const lon = 30 - t * 3, az = .3, tc = WS(0, 8) - .3, te = TX();
  const G = gW(t, { d: lerp(8.4, 7.2, ease(ramp(t, 0, te))), el: .2, az, lon, clouds: lerp(.4, 0, ease(ramp(t, 1.5, tc))), lights: .3, off: -.6 });
  let o = `<defs>${XDEFS()}</defs>`;
  if (t >= tc) {
    F.w.disc = null;
    if (t < te) { const sh = t > te - 1 ? (te - t < .5 ? .02 : .01) * Math.sin(t * 70) : 0; F.w.moon = { pos: [sh, sh * .6, 0], L: F.w.L, shC: NOFAR, shR: .001, r: 1.0, ex: 1, crack: ease(ramp(t, tc, te)), rot: exRot(lon, az) }; }
    else F.w.debris = { c: [0, 0, 0], k: 1.05 + 3.2 * (1 - Math.exp(-(t - te) * 1.1)), size: .026, hot: .8 * Math.pow(1 - ramp(t, te, te + 1.4), 2), n: 1 };
  }
  F.flash = t > te ? .45 * Math.pow(1 - ramp(t, te, te + .35), 2) : 0;
  const [cx, cy] = proj3(G.cam, [0, 0, 0]);
  if (t > te - .05) { const k = ramp(t, te, te + 1.6); o += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${(150 + 300 * k).toFixed(1)}" fill="url(#flashG)" opacity="${(.85 * (1 - k)).toFixed(2)}"/>` + ring(cx, cy, ramp(t, te, te + 1.3), 120, 520, '#ffd9a0'); }
  F.ov = o; return space(t);
}
// ---------- 1: blowing the Earth apart takes all the energy the Sun gives out in a whole week ----------
function sceneEnergy(t) {
  const T = t - S0(1) + .2, cam = orbit(7.2 - T * .08, 0, 0, [0, 0, 0], 30), m = ease(ramp(t, WS(1, 5), WS(1, 11) + .3));
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: [0, .15, 0], r: .62, a: 1, hue: 0, g: 6, ts: 1.5 } }; F.earth = F.moon = F.sun = null;
  const a = ease(ramp(t, S0(1), S0(1) + .5)), d = 7 * m, dd = Math.floor(d);
  let cal = ''; for (let i = 0; i < 7; i++) { const on = clamp(d - i), x = 560 - i * 66; cal += `<rect x="${x}" y="1084" width="54" height="54" rx="8" fill="${on > .5 ? '#f4c76b' : '#ffffff'}" opacity="${on > .5 ? 1 : .14}"/>` + lbl(x + 27, 1121, AR(i + 1), on > .5 ? 1 : .5, on > .5 ? '#2a1a08' : '#c8d4e8', 24); }
  F.ov = `<defs>${XDEFS()}</defs><g opacity="${a.toFixed(2)}">` + panel(90, 920, 540, 270, 1) + lbl(360, 970, 'كلُّ طاقةِ الشمس', 1, '#ffd86a', 30) +
    lbl(360, 1050, `${AR(Math.min(7, dd))} ${dd >= 3 && dd <= 10 ? 'أيام' : dd === 1 ? 'يوم' : dd === 2 ? 'يومان' : 'أيام'}`, 1, '#fff', 54) + cal + lbl(360, 1172, '= تفجيرُ الأرض', ease(ramp(t, WS(1, 10), WS(1, 11) + .3)), '#ff9a6a', 26) + `</g>`;
  return space(t);
}
// ---------- 2: the rocks race outward and hit the Moon a few hours later ----------
function sceneMoonHit(t) {
  const t0 = S0(2) - .2, T = t - t0, cam = orbit(9 - T * .15, .08, 0, [0, 0, 0], 30), fp = fpx(cam);
  const mp = [1.15, .55, .6], mr = .95, Ld = [-.9, .25, .45];
  const k = lerp(1.2, 4.6, ease(ramp(t, t0, WS(2, 6))));
  F.w = { set: 'space', cam, L: Ld, moon: { pos: mp, L: Ld, shC: NOFAR, shR: .001, r: mr, ex: 0, rot: .3 + t * .02 }, debris: { c: [-3.4, -1.1, -2.2], k, size: .045, hot: .25 * (1 - ramp(t, t0, WS(2, 4))), n: 1 } }; F.earth = F.moon = F.sun = null;
  const [mx, my] = proj3(cam, mp), dist = Math.hypot(cam.pos[0] - mp[0], cam.pos[1] - mp[1], cam.pos[2] - mp[2]), R = mr * fp / dist;
  let o = `<defs>${XDEFS()}</defs>`;
  const hit = ramp(t, WS(2, 4) - .1, S0(3) + .2);
  if (hit > 0) { const r = RS(Math.floor(t * 8)); for (let i = 0; i < 5; i++) { const a = 2.2 + r() * 2.2, d = R * (.35 + .6 * r()), x = mx + Math.cos(a) * d, y = my + Math.sin(a) * d * .9, s = 6 + 14 * r(); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(s * 2.2).toFixed(1)}" fill="url(#flashG)" opacity="${(.85 * r()).toFixed(2)}"/>`; } }
  const ca = ease(ramp(t, WS(2, 6) - .2, WS(2, 6) + .3));
  o += `<g opacity="${ca.toFixed(2)}">${panel(210, 1110, 300, 84, 1)}${lbl(360, 1164, 'بعدَ نحوِ ٧ ساعات', 1, '#f4c76b', 30)}</g>`;
  F.ov = o; return space(t);
}
// ---------- 3: the Moon does not fall: it goes on around the Sun on its own ----------
function sceneOrbit(t) {
  const t0 = S0(3) - .2, T = t - t0, R = 1.6, cam = orbit(14, 1.0, 0, [0, -.25, 0], 30);
  const th = 1.9 + T * .08, sp = ease(ramp(t, t0, S0(4))) * .18;
  F.w = { set: 'space', cam, L: [0, 1, 0], sun: { pos: [0, 0, 0], r: .2, a: 1, hue: 0, g: 6, ts: 1.5 }, debris: { c: ringPt(R, th - .05, 0), k: .14, spread: sp, R, tilt: 0, th0: th - .05, size: .009, hot: 0, n: .6 } }; F.earth = F.moon = F.sun = null;
  const mp = ringPt(R, th + .32, 0); F.w.moon = { pos: mp, L: [-mp[0], -mp[1], -mp[2]], shC: NOFAR, shR: .001, r: .07, ex: 0, rot: t * .1 };
  let d = ''; for (let i = 0; i <= 96; i++) { const [x, y] = proj3(cam, ringPt(R, i / 96 * 6.2832, 0)); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); }
  const [mx, my] = proj3(cam, mp), [ex, ey] = proj3(cam, ringPt(R, th - .05, 0)), [sx, sy] = proj3(cam, [0, 0, 0]);
  const arrow = (() => { const [ax, ay] = proj3(cam, ringPt(R, th + .3, 0)); return `<path d="M${(mx + 12).toFixed(1)},${(my - 4).toFixed(1)} Q${((mx + ax) / 2).toFixed(1)},${((my + ay) / 2 - 10).toFixed(1)} ${ax.toFixed(1)},${ay.toFixed(1)}" stroke="#f4c76b" stroke-width="4" fill="none" stroke-dasharray="8 6"/>`; })();
  const la = ease(ramp(t, t0 + .3, t0 + .8)), lb = ease(ramp(t, WS(3, 4), WS(3, 6)));
  F.ov = `<defs>${XDEFS()}</defs><path d="${d}" stroke="#8ab0ff" stroke-width="2" fill="none" stroke-dasharray="6 7" opacity=".55"/>` +
    lbl(sx, sy + 70, 'الشمس', la, '#ffe0a0', 26) + lbl(mx, my - 26, 'القمر', la, '#fff', 26) + lbl(ex + 10, ey + 48, 'حطامُ الأرض', la, '#c8b8a8', 22) + `<g opacity="${lb.toFixed(2)}">${arrow}</g>` +
    lbl(360, 1236, 'ليس بالمقياسِ الحقيقيّ', la, '#9aa6b8', 20);
  return space(t);
}

// ---------- 4: with the Earth goes the only life we know of in the universe ----------
function sceneLife(t) {
  const t0 = S0(4) - .2, T = t - t0, HZ = 760, g = ease(ramp(t, WS(4, 2), WS(4, 6))), fade = .7 * ease(ramp(t, WS(4, 5), S0(5) - .3));
  let s = `<defs>${XDEFS()}<filter id="desat"><feColorMatrix type="saturate" values="${(1 - g).toFixed(3)}"/></filter></defs><g filter="url(#desat)" opacity="${(1 - fade).toFixed(2)}"><rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#lifeSky)"/>` + sun3(170, 450) + cumulus(430 + T * 6, 470, 260, 141, { a: .9 }) + cumulus(650 + T * 4, 560, 180, 143, { a: .75 });
  s += mountainsR(HZ - 20, 120, 145, { rock: '#7d8e9e', haze: .55, hazeCol: '#d2dce6', snowAt: .55 }) + `<rect x="-20" y="${HZ - 30}" width="760" height="50" fill="#9aa898"/>` + forestR(HZ + 10, 26, 34, 80, 147, '#3f6b35', { haze: .3, hazeCol: '#c4d0c0' });
  s += meadow(HZ + 14, 1300, t, { c0: '#8fb058', c1: '#4e7a2e' });
  // a river curving to the front
  s += `<path d="M300,${HZ + 18} C340,${HZ + 80} 220,${HZ + 160} 260,900 C320,1010 560,1060 520,1300 L760,1300 L760,1240 C700,1100 420,1010 360,900 C320,820 380,${HZ + 70} 330,${HZ + 18}Z" fill="url(#rivG)" opacity=".92"/>`;
  s += deer(150, 1040, .9, 1, T * 1.2) + deer(250, 1070, .6, 1, T * 1.2 + 1, { doe: 1 }) + deer(600, 950, .55, -1, T, { fawn: 1 });
  for (let i = 0; i < 7; i++) s += bird(200 + i * 40 + T * 28, 540 - i * 9 + (i % 2) * 16, .38, Math.sin(t * 9 + i * 1.3), -4);
  const px = 470 + T * 22; s += hero(px, 1210, Object.assign({ s: .82, face: 1, shade: 1, walk: px / 26 }, palS(2))) + hero(px - 70, 1226, Object.assign({ s: .62, face: 1, shade: 1, walk: px / 22 + 1 }, palS(6)));
  s += `</g>`;
  // a dust of light rises as everything fades
  if (g > 0) { const r = RS(151); for (let i = 0; i < 90; i++) { const x = r() * 720, y0 = 600 + r() * 680, y = y0 - g * (120 + 260 * r()); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.2 + 2 * r()).toFixed(1)}" fill="#fff4d8" opacity="${(g * (1 - fade * .7) * .7 * r()).toFixed(2)}"/>`; } }
  noEarth(); F.ov = ''; return s;
}

// ---------- 5: minutes later the flash reaches Mars: the blue star in its sky flares and is gone ----------
function rover(x, y, s) {   // a six-wheeled Mars rover facing right; (x, y) = the ground under the middle wheel
  const wh = (cx) => `<circle cx="${cx}" cy="-26" r="26" fill="#2a2420"/><circle cx="${cx}" cy="-26" r="17" fill="#9a9690"/><circle cx="${cx}" cy="-26" r="6" fill="#4a4640"/>` + Array.from({ length: 10 }, (_, i) => `<path d="M${(cx + Math.cos(i * .628) * 22).toFixed(1)},${(-26 + Math.sin(i * .628) * 22).toFixed(1)} L${(cx + Math.cos(i * .628) * 26).toFixed(1)},${(-26 + Math.sin(i * .628) * 26).toFixed(1)}" stroke="#14100c" stroke-width="4"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="2" rx="150" ry="12" fill="#000" opacity=".35" filter="url(#blur5)"/>` +
    `<path d="M-100,-26 L-50,-70 L0,-26 M-50,-70 L40,-70 L100,-26 M40,-70 L60,-90" stroke="#c8ccd2" stroke-width="7" fill="none" stroke-linejoin="round"/>` + wh(-100) + wh(0) + wh(100) +
    `<rect x="-110" y="-130" width="200" height="52" rx="6" fill="#e8e6e0"/><rect x="-110" y="-130" width="200" height="12" fill="#fff" opacity=".5"/><rect x="-110" y="-92" width="200" height="14" fill="#9a9690"/><rect x="-104" y="-122" width="80" height="26" fill="#c8a24a" opacity=".85"/>` +
    `<path d="M-150,-110 L-110,-120 L-110,-96 L-150,-90Z" fill="#8a8e96"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-146 + i * 6},-108 v16" stroke="#5a5e66" stroke-width="2"/>`).join('') +
    `<path d="M60,-130 V-250" stroke="#c8ccd2" stroke-width="8"/><rect x="40" y="-284" width="56" height="34" rx="5" fill="#e8e6e0"/><circle cx="84" cy="-268" r="8" fill="#1a1c22"/><circle cx="64" cy="-268" r="6" fill="#1a1c22"/><rect x="40" y="-284" width="56" height="8" fill="#fff" opacity=".4"/>` +
    `<path d="M90,-96 L150,-80 L170,-40" stroke="#c8ccd2" stroke-width="7" fill="none"/><rect x="160" y="-48" width="26" height="22" rx="4" fill="#9a9690"/>` +
    `<path d="M-60,-130 L-70,-180 M-80,-180 h20" stroke="#c8ccd2" stroke-width="4"/></g>`;
}
function sceneMars(t) {
  const t0 = S0(5) - .2, T = t - t0, HZ = 840, fl = ramp(t, WS(5, 11) - .15, WS(5, 12)), gone = ease(ramp(t, WS(5, 12), WS(5, 13) + .4)), sx = 470, sy = 470;
  let s = `<defs>${XDEFS()}</defs><rect x="-20" y="-20" width="760" height="${HZ + 30}" fill="url(#marsSky)"/>`;
  { const r = RS(161); for (let i = 0; i < 160; i++) { const y = r() * (HZ - 60); s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${y.toFixed(1)}" r="${(.5 + r() * 1.3).toFixed(1)}" fill="#fff" opacity="${((.3 + .6 * r()) * (1 - y / HZ) * (.8 + .2 * Math.sin(t * 3 + i))).toFixed(2)}"/>`; } }
  // the Earth as a blue star: steady, then a flare, then nothing
  const st = (1 - gone), flare = fl > 0 && fl < 1 ? Math.sin(fl * Math.PI) : 0, rr = 10 + 70 * flare;
  s += `<circle cx="${sx}" cy="${sy}" r="${(rr * 3).toFixed(1)}" fill="url(#blueSt)" opacity="${(Math.max(st * .7, flare)).toFixed(2)}"/><circle cx="${sx}" cy="${sy}" r="${(2.6 + 6 * flare).toFixed(1)}" fill="#fff" opacity="${st.toFixed(2)}"/>` +
    (flare > .05 ? `<path d="M${sx - 120 * flare},${sy} H${sx + 120 * flare} M${sx},${sy - 120 * flare} V${sy + 120 * flare}" stroke="#dff0ff" stroke-width="2" opacity="${(.8 * flare).toFixed(2)}"/>` : '');
  // Phobos low in the sky
  s += `<ellipse cx="160" cy="320" rx="9" ry="6" fill="#8a7a6a"/><ellipse cx="158" cy="318" rx="5" ry="3" fill="#b8a898" opacity=".6"/>`;
  s += mountainsR(HZ - 10, 90, 163, { rock: '#8a4a32', haze: .55, hazeCol: '#6a4a52' }) + `<rect x="-20" y="${HZ - 20}" width="760" height="40" fill="#7a4434"/>`;
  s += dunes(t, { seed: 7, y0: HZ + 10, n: 5, lit: '#b86a44', low: '#8a4a30', dark: '#4a2418', haze: '#6a4a4e' });
  s += `<rect x="-20" y="${HZ - 60}" width="760" height="90" fill="#8a6a6a" opacity=".22" filter="url(#blur9)"/>`;
  s += rover(330, 1150, .95);
  // dusk light on everything, a faint blue glow when the star flares
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#1a1a3a" opacity=".32" style="mix-blend-mode:multiply"/>` + (flare > .02 ? scr(`<rect x="-20" y="-20" width="760" height="1320" fill="#3a6aff" opacity="${(.12 * flare).toFixed(2)}"/>`) : '');
  const la = ease(ramp(t, t0 + .5, t0 + 1)) * (1 - ease(ramp(t, WS(5, 11) - .5, WS(5, 11))));
  s += `<g opacity="${la.toFixed(2)}"><path d="M${sx + 18},${sy + 18} L${sx + 60},${sy + 60}" stroke="#cfe6ff" stroke-width="2"/>${lbl(sx + 90, sy + 96, 'الأرض', 1, '#cfe6ff', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}
