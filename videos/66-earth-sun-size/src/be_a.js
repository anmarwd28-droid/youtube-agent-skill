// be_a.js (#66): what if the Earth were as big as the Sun? Helpers + scenes 0-6
// The 3D Earth is always radius 1 at the origin; "growing" it = moving the camera out and scaling everything else (Sun, Moon) up by the same factor.
const BEDEF = `<radialGradient id="beSun" cx=".42" cy=".4" r=".62"><stop offset="0" stop-color="#fffbe8"/><stop offset=".45" stop-color="#ffd25a"/><stop offset=".85" stop-color="#f08a1a"/><stop offset="1" stop-color="#c0500a"/></radialGradient>` +
  `<radialGradient id="beSunG"><stop offset="0" stop-color="#fff0b0" stop-opacity=".9"/><stop offset=".5" stop-color="#ffb040" stop-opacity=".3"/><stop offset="1" stop-color="#ff8a1a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="beSh" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".1"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset=".88" stop-color="#000" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>` +
  `<linearGradient id="beBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d8a8"/><stop offset=".5" stop-color="#b89a5a"/><stop offset="1" stop-color="#6a542a"/></linearGradient>` +
  `<linearGradient id="beRock" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5a50"/><stop offset="1" stop-color="#2a2420"/></linearGradient>` +
  `<radialGradient id="beHot"><stop offset="0" stop-color="#ffffff" stop-opacity="1"/><stop offset=".25" stop-color="#ffe0a0" stop-opacity=".8"/><stop offset=".6" stop-color="#ff7a2a" stop-opacity=".3"/><stop offset="1" stop-color="#c02a0a" stop-opacity="0"/></radialGradient>` +
  `<radialGradient id="beAcc" cx=".5" cy=".5" r=".5"><stop offset=".3" stop-color="#ffffff" stop-opacity="0"/><stop offset=".42" stop-color="#fff4d0" stop-opacity=".95"/><stop offset=".6" stop-color="#ffb050" stop-opacity=".7"/><stop offset=".85" stop-color="#c8401a" stop-opacity=".25"/><stop offset="1" stop-color="#6a1a0a" stop-opacity="0"/></radialGradient>`;
const BED = () => STDEFS() + BEDEF;
const BEL = (x, y, tx, a, col = '#fff', fs = 26) => lbl(x, y, tx, a, col, fs);
const arN = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
// a small lit Earth sprite
const eIco = (x, y, r, k = 0, a = 1) => `<image href="${EICO[k % 3]}" x="${(x - r).toFixed(1)}" y="${(y - r).toFixed(1)}" width="${(2 * r).toFixed(1)}" height="${(2 * r).toFixed(1)}" opacity="${a.toFixed(2)}"/>`;
// a drawn sun ball (for diagrams), with granulation and a soft glow
function sunBall(x, y, r, t, a = 1) { if (a <= 0) return ''; return `<g opacity="${a.toFixed(2)}">` + scr(`<circle cx="${x}" cy="${y}" r="${(r * 1.9).toFixed(1)}" fill="url(#beSunG)"/>`) + `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#beSun)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#a83a0a" filter="url(#cellF)" opacity=".35" transform="rotate(${(t * 4).toFixed(1)},${x},${y})"/></g>`; }
// a circle in the 3D world (in the plane through c with normal = y), projected as a dashed path
function ring3(cam, c, R, n = 72) { let d = ''; for (let i = 0; i <= n; i++) { const a = i / n * 6.2832, [x, y] = proj3(cam, [c[0] + Math.cos(a) * R, c[1], c[2] + Math.sin(a) * R]); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return d; }

// ---------- 0: hook. The Sun above, the Earth below; the Earth swells until it is as big as the Sun ----------
function sceneHook(t) {
  const u = ease(ramp(t, .6, S0(1) - .2)), s = Math.pow(12, 1 - u);   // s = Sun radius in Earth radii (12 → 1, a hook; the true value is 109)
  const sy = s + 1 + .7 * Math.max(s, 1.6), tgY = (sy + s - 1) / 2, D = Math.max((tgY + 1) * 4.4, 9);
  const cam = orbit(D, 0, 0, [0, tgY, 0], 30);
  glE(t, { d: 9.8, el: .2, lon: 30 + t * 6, clouds: .45, lights: .25 }); F.w.cam = cam;
  F.w.L = [0, 1, .45]; F.w.sun = { pos: [0, sy, 0], r: s, a: 1, hue: 0, g: 2.2, ts: 1.2 };
  const [ex, ey] = proj3(cam, [0, 0, 0]), [sx, sy2] = proj3(cam, [0, sy, 0]);
  F.ov = `<defs>${BED()}</defs>` + BEL(ex, ey + fit3(cam, [0, 0, 0], 1)[2] + 50, 'الأرض', 1, '#bfe6ff', 30) + BEL(sx, sy2 + fit3(cam, [0, sy, 0], s)[2] + 50, 'الشمس', 1 - u, '#ffd27a', 30);
  return space(t);
}

// ---------- 1: the Sun is 109 times wider; it can hold more than a million Earths ----------
function sceneWide(t) {
  const T = t - (S0(1) - .2), row = ease(ramp(t, WS(1, 1), WS(1, 5) + .3)), fill = ease(ramp(t, WS(1, 7), WS(1, 12) + .3));
  const cam = orbit(8.8, 0, 0, [0, -.12, 0], 30);
  F.w = { set: 'space', cam, L: [0, 0, 1], sun: { pos: [0, 0, 0], r: 1, a: 1, hue: 0, g: 1.8, ts: 1.2 } }; F.earth = F.moon = F.sun = null;
  const [cx, cy, R] = fit3(cam, [0, 0, 0], 1);
  let ov = `<defs>${BED()}<pattern id="beEP" width="${(R / 54).toFixed(3)}" height="${(R / 54 * 1.732).toFixed(3)}" patternUnits="userSpaceOnUse" x="${cx}" y="${cy}"><circle cx="${(R / 108).toFixed(3)}" cy="${(R / 108).toFixed(3)}" r="${(R / 120).toFixed(3)}" fill="#5aa0ff"/><circle cx="${(R / 54).toFixed(3)}" cy="${(R / 108 * 2.732).toFixed(3)}" r="${(R / 120).toFixed(3)}" fill="#5aa0ff"/><circle cx="0" cy="${(R / 108 * 2.732).toFixed(3)}" r="${(R / 120).toFixed(3)}" fill="#5aa0ff"/></pattern></defs>`;
  // 109 Earths in a row across the Sun
  if (row > 0) { const n = Math.round(109 * row), r = R / 109; let g = `<rect x="${cx - R}" y="${cy - r * 1.6}" width="${2 * R}" height="${r * 3.2}" fill="#000" opacity=".35"/>`; for (let i = 0; i < n; i++) g += `<circle cx="${(cx - R + r + i * 2 * r).toFixed(1)}" cy="${cy}" r="${(r * .92).toFixed(2)}" fill="#4a90e8"/>`;
    ov += g + `<path d="M${cx - R},${cy - 30} V${cy + 30} M${cx + R},${cy - 30} V${cy + 30}" stroke="#fff" stroke-width="3"/>` + BEL(cx, cy - 40, `${arN(n)} أرضاً`, 1, '#fff', 36);
    const mx = cx + R * .35, my = cy + 150, mR = 92, z = 92 / (r * 5);   // a magnifier over part of the row
    let m = ''; for (let i = -6; i <= 6; i++) m += eIco(mx + i * r * 2 * z, my, r * .92 * z, i + 6);
    ov += `<defs><clipPath id="beMag"><circle cx="${mx}" cy="${my}" r="${mR}"/></clipPath></defs><path d="M${mx},${cy + 4} L${mx},${my - mR}" stroke="#fff" stroke-width="3" opacity=".8"/><circle cx="${mx}" cy="${my}" r="${mR}" fill="#02030a"/><g clip-path="url(#beMag)">${m}</g><circle cx="${mx}" cy="${my}" r="${mR}" fill="none" stroke="#e8eef4" stroke-width="8"/>`; }
  // filled with Earths: the inside of the Sun packed with tiny blue dots
  if (fill > 0) ov += `<defs><clipPath id="beFC"><circle cx="${cx}" cy="${cy}" r="${(R * fill).toFixed(1)}"/></clipPath></defs><g clip-path="url(#beFC)" opacity=".75"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="url(#beEP)"/></g>` +
    `<g opacity="${fill.toFixed(2)}">${panel(150, 1040, 420, 140)}<text x="360" y="1112" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="54" fill="#f4c76b" direction="ltr">+١٬٣٠٠٬٠٠٠</text>${BEL(360, 1158, 'أرضٍ داخلَ الشمس', 1, '#fff', 26)}</g>`;
  F.ov = ov; return space(t);
}

// ---------- 2-3: the Moon is the first victim: the growing Earth swallows its orbit ----------
function sceneMoon(t) {
  const T = t - (S0(2) - .2), u1 = ease(ramp(t, WS(2, 12), S0(3) + .2)), u2 = ease(ramp(t, S0(3), WS(3, 5) + .4));
  const g = Math.pow(40, u1) * Math.pow(109 / 40, u2);    // the Earth's radius, in today's Earth radii
  const md = 60.3 / g, mr = .27 * 6 / g, D = Math.max(4.7 * md * 1.08, 9.5);
  const cam = orbit(D, .32, .2, [0, 0, 0], 30), ma = .9 + T * .12, mp = [Math.cos(ma) * md, 0, Math.sin(ma) * md], Ld = [.9, .35, .5];
  glE(t, { d: 9.8, el: .3, lon: 10 + T * 5, clouds: .45, lights: .25 }); F.w.cam = cam; F.w.L = Ld;
  F.w.moon = { pos: mp, L: Ld, shC: NOFAR, shR: .001, r: mr, rot: T * .05 };
  let ov = `<defs>${BED()}</defs>`;
  const inside = md < 1;
  ov += `<path d="${ring3(cam, [0, 0, 0], md)}" stroke="#bfd8ff" stroke-width="2.5" fill="none" stroke-dasharray="10 9" opacity="${inside ? .25 : .7}"/>`;
  const [ex, ey] = proj3(cam, [0, 0, 0]), [qx, qy] = proj3(cam, mp), la = 1 - ease(ramp(t, WS(2, 12), WS(2, 13)));
  ov += `<g opacity="${la.toFixed(2)}"><path d="M${ex},${ey} L${qx.toFixed(1)},${qy.toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="6 6"/>${BEL((ex + qx) / 2, (ey + qy) / 2 - 18, '٣٨٤٬٠٠٠ كم', ease(ramp(t, WS(2, 6), WS(2, 8))), '#f4c76b', 30)}</g>`;
  if (!inside) ov += BEL(qx, qy - 40, 'القمر', 1, '#fff', 28);
  const er = fit3(cam, [0, 0, 0], 1)[2], small = clamp((60 - er) / 30);
  if (small > 0) ov += `<circle cx="${ex}" cy="${ey}" r="${(er + 18).toFixed(1)}" fill="none" stroke="#7ab8ff" stroke-width="3" opacity="${(.9 * small).toFixed(2)}"/>` + BEL(ex, ey + er + 56, 'الأرض', small, '#bfe6ff', 28);
  // the moment it is buried: a flash where it was
  const fl = clamp(1 - Math.abs(t - WS(3, 1)) / .5);
  if (fl > 0) ov += scr(`<circle cx="${qx.toFixed(1)}" cy="${qy.toFixed(1)}" r="${(40 + 80 * fl).toFixed(1)}" fill="url(#beHot)" opacity="${fl.toFixed(2)}"/>`);
  ov += BEL(360, 1140, `نصفُ قطرِ الأرض: ×${arN(Math.round(g))}`, ease(ramp(t, WS(2, 12), WS(2, 13))), '#bfe6ff', 30);
  F.ov = ov; return space(t);
}

// ---------- 4-5: rock and iron are 4 times denser than the Sun's gas: a balance, then the Earth weighs as much as 4 Suns ----------
function sceneScale(t) {
  const T = t - (S0(4) - .2), tip = ease(ramp(t, WS(4, 7), WS(4, 12))), four = ease(ramp(t, S0(5) - .1, WS(5, 4) + .2)), lv = tip * (1 - four);
  let s = `<defs>${BED()}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(160, 31, .7);
  const px = 360, py = 600, L = 250, ang = -14 * lv;   // beam tilts down toward the Earth (right)
  const a = ang * Math.PI / 180, lx = px - Math.cos(a) * L, ly = py - Math.sin(a) * L, rx = px + Math.cos(a) * L, ry = py + Math.sin(a) * L;
  // the stand
  s += `<path d="M${px - 70},1040 L${px - 20},${py} H${px + 20} L${px + 70},1040Z" fill="url(#beBeam)"/><rect x="${px - 130}" y="1036" width="260" height="22" rx="8" fill="#5a462a"/><circle cx="${px}" cy="${py}" r="16" fill="#e8d8a8"/>`;
  s += `<path d="M${lx.toFixed(1)},${ly.toFixed(1)} L${rx.toFixed(1)},${ry.toFixed(1)}" stroke="#c8a868" stroke-width="16" stroke-linecap="round"/><path d="M${lx.toFixed(1)},${(ly - 4).toFixed(1)} L${rx.toFixed(1)},${(ry - 4).toFixed(1)}" stroke="#f0e0b0" stroke-width="4" stroke-linecap="round" opacity=".7"/>`;
  const pan = (x, y) => `<path d="M${x.toFixed(1)},${y.toFixed(1)} L${(x - 90).toFixed(1)},${(y + 170).toFixed(1)} M${x.toFixed(1)},${y.toFixed(1)} L${(x + 90).toFixed(1)},${(y + 170).toFixed(1)}" stroke="#c8b888" stroke-width="3"/><path d="M${(x - 110).toFixed(1)},${(y + 170).toFixed(1)} Q${x.toFixed(1)},${(y + 214).toFixed(1)} ${(x + 110).toFixed(1)},${(y + 170).toFixed(1)}Z" fill="url(#beBeam)"/>`;
  s += pan(lx, ly) + pan(rx, ry);
  // left: one Sun ball, then four; right: the Earth ball (same size)
  const bR = 70;
  if (four < 1) s += sunBall(lx, ly + 170 - bR, bR, t, 1 - four);
  if (four > 0) [[-52, -44], [52, -44], [-28, -128], [30, -124]].forEach(([dx, dy], i) => { const k = clamp(four * 1.6 - i * .2); s += sunBall(lx + dx, ly + 176 + dy * k + (1 - k) * -200, 46, t, k); });
  s += eIco(rx, ry + 170 - bR, bR, 0) + `<circle cx="${rx.toFixed(1)}" cy="${(ry + 170 - bR).toFixed(1)}" r="${bR}" fill="url(#beSh)" opacity=".4"/>`;
  s += BEL(lx, ly + 260, four > .5 ? '٤ شموس' : 'غاز', 1, '#ffd27a', 32) + BEL(rx, ry + 260, 'صخورٌ وحديد', 1, '#bfe6ff', 32);
  const da = ease(ramp(t, WS(4, 3), WS(4, 5))) * (1 - four);
  s += `<g opacity="${da.toFixed(2)}">${BEL(lx, 520, '١٫٤ غ/سم³', 1, '#ffd27a', 30)}${BEL(rx, 520, '٥٫٥ غ/سم³', 1, '#bfe6ff', 30)}${BEL(px, 480, '×٤', tip, '#f4c76b', 56)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 6: gravity 109 times stronger: 70 kg becomes more than 7 tonnes ----------
function sceneWeight(t) {
  const T = t - (S0(6) - .2), up = ease(ramp(t, WS(6, 11), WS(6, 16) + .2)), kg = Math.round(lerp(70, 7630, up)), sq = ease(ramp(t, WS(6, 13), WS(6, 16) + .6));
  let s = `<defs>${BED()}${CBDEF}${ASDEF}</defs><rect x="-20" y="-20" width="760" height="1320" fill="url(#spaceK)"/>` + starsK(120, 47, .6);
  // a rocky plain under a black sky, the small Sun low on the horizon
  s += sunBall(110, 780, 26, t) + `<path d="M-20,880 Q200,850 400,870 T740,860 V1300 H-20Z" fill="url(#beRock)"/><path d="M-20,880 Q200,850 400,870 T740,860 V1300 H-20Z" fill="#000" filter="url(#rockF)" opacity=".5"/>` +
    `<path d="M-20,880 Q200,850 400,870 T740,860" stroke="#ffcf8a" stroke-width="3" fill="none" opacity=".5"/>`;
  const x = 360, y = 1110, kgS = kg.toLocaleString('en').replace(/,/g, '٬');
  s += scaleW(x, y, arN(kgS), '', '#fff');
  // the astronaut on the scale, pressed down
  s += `<g transform="translate(${x},${y - 60}) scale(1,${(1 - .22 * sq).toFixed(3)}) translate(${-x},${-(y - 60)})">` + astro(x, y - 60, { s: 1.25, face: 1 }).s + `</g>`;
  if (sq > 0) { let c = ''; const r = RS(5); for (let i = 0; i < 7; i++) { let d = `M${x + (r() - .5) * 60},${y - 30}`; for (let j = 0; j < 4; j++) d += ` l${((r() - .5) * 50).toFixed(1)},${(r() * 22).toFixed(1)}`; c += `<path d="${d}" stroke="#fff" stroke-width="2" fill="none" opacity="${(.7 * sq).toFixed(2)}"/>`; } s += c; }
  s += `<g opacity="${ease(ramp(t, WS(6, 3), WS(6, 6))).toFixed(2)}">${panel(40, 420, 210, 130)}<text x="145" y="500" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="58" fill="#f4c76b" direction="rtl">×١٠٩</text>${BEL(145, 538, 'الجاذبيّة', 1, '#fff', 22)}</g>`;
  
  noEarth(); F.ov = ''; return s;
}
