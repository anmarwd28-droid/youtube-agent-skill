// ===================== "what if all humans had only one eye?" (Short #37) =====================
const OEDEF = `<radialGradient id="skF" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#e2ad8a"/><stop offset=".55" stop-color="#c89070"/><stop offset="1" stop-color="#9a6448"/></radialGradient>` +
  `<linearGradient id="skSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3a1a10" stop-opacity=".38"/></linearGradient>` +
  `<radialGradient id="scF" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="#fbf7f0"/><stop offset=".7" stop-color="#ece2d6"/><stop offset="1" stop-color="#c8a89c"/></radialGradient>` +
  `<radialGradient id="irF"><stop offset="0" stop-color="#1a0c04"/><stop offset=".3" stop-color="#4a2a12"/><stop offset=".75" stop-color="#8a5c2c"/><stop offset=".92" stop-color="#5a3a1c"/><stop offset="1" stop-color="#2a1608"/></radialGradient>` +
  `<radialGradient id="stuG" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#3a4258"/><stop offset=".6" stop-color="#1c2236"/><stop offset="1" stop-color="#0a0e1a"/></radialGradient>` +
  `<radialGradient id="boneG" cx=".42" cy=".3" r=".85"><stop offset="0" stop-color="#f2e8d2"/><stop offset=".55" stop-color="#d4c4a2"/><stop offset="1" stop-color="#8a7a5c"/></radialGradient>` +
  `<linearGradient id="pmSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".3" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3a2a14" stop-opacity=".35"/></linearGradient><radialGradient id="holeG" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#050302"/><stop offset=".7" stop-color="#1e1408"/><stop offset="1" stop-color="#5a4628"/></radialGradient>` +
  `<radialGradient id="micG" cx=".46" cy=".42" r=".6"><stop offset="0" stop-color="#f2fbe8"/><stop offset=".6" stop-color="#cfe8c8"/><stop offset=".92" stop-color="#9cc4a4"/><stop offset="1" stop-color="#5a8a72"/></radialGradient>` +
  `<radialGradient id="ballG" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ffd27a"/><stop offset=".6" stop-color="#e8782a"/><stop offset="1" stop-color="#8a3a12"/></radialGradient>` +
  `<radialGradient id="spotG" cx=".5" cy="0" r="1"><stop offset="0" stop-color="#fff2d0" stop-opacity=".55"/><stop offset=".6" stop-color="#ffe2a8" stop-opacity=".12"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/></radialGradient>` +
  `<linearGradient id="fovG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffe7a8" stop-opacity=".55"/><stop offset="1" stop-color="#f4c76b" stop-opacity=".05"/></linearGradient>` +
  `<linearGradient id="shirtF" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient>` +
  `<filter id="blur16" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="16"/></filter>`;
const DEFO = () => `${DEFN()}${OEDEF}`;
// studio background with soft bokeh
function studio(id, c0 = '#2c3650', c1 = '#0a0e1a', seed = 3) {
  let s = `<defs><radialGradient id="${id}" cx=".5" cy=".42" r=".8"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#${id})"/>`;
  const r = RS(seed); for (let i = 0; i < 22; i++) s += `<circle cx="${(r() * 720).toFixed(1)}" cy="${(r() * 1280).toFixed(1)}" r="${(14 + r() * 46).toFixed(1)}" fill="${r() < .5 ? '#ffd9a0' : '#8aa8ff'}" opacity="${(.03 + .05 * r()).toFixed(3)}" filter="url(#blur9)"/>`;
  return s + `<rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
}
// one eye of the front face: almond opening, sclera, iris, catch-light; op = how open (0..1)
function eyeF(id, x, y, w, op, look = 0) {
  const h = w * .36 * Math.max(op, .02);
  const lid = `M${x - w / 2},${y} Q${x - w * .06},${y - h * 1.5} ${x + w / 2},${y - h * .1} Q${x + w * .04},${y + h * 1.15} ${x - w / 2},${y}Z`;
  let s = `<path d="M${x - w * .62},${y - w * .02} Q${x},${y - w * .5} ${x + w * .62},${y - w * .06}" stroke="#7a4a32" stroke-width="${(w * .03).toFixed(1)}" fill="none" opacity=".45"/>` + // the crease above the lid
    `<ellipse cx="${x}" cy="${y + w * .2}" rx="${w * .46}" ry="${w * .1}" fill="#6a3a2a" opacity=".16" filter="url(#blur5)"/>`;
  if (op > .04) { const ix = x + look * w * .14 + w * .02, iy = y - h * .12, ir = w * .2;
    s += `<defs><clipPath id="${id}"><path d="${lid}"/></clipPath></defs><g clip-path="url(#${id})"><rect x="${x - w}" y="${y - w}" width="${2 * w}" height="${2 * w}" fill="url(#scF)"/>` +
      `<circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${ir.toFixed(1)}" fill="url(#irF)"/><circle cx="${ix.toFixed(1)}" cy="${iy.toFixed(1)}" r="${(ir * .44).toFixed(1)}" fill="#060302"/>` +
      Array.from({ length: 16 }, (_, i) => { const a = i / 16 * 6.283; return `<path d="M${(ix + Math.cos(a) * ir * .5).toFixed(1)},${(iy + Math.sin(a) * ir * .5).toFixed(1)} L${(ix + Math.cos(a) * ir * .95).toFixed(1)},${(iy + Math.sin(a) * ir * .95).toFixed(1)}" stroke="#d8a860" stroke-width="${(w * .008).toFixed(2)}" opacity=".35"/>`; }).join('') +
      `<circle cx="${(ix + ir * .35).toFixed(1)}" cy="${(iy - ir * .38).toFixed(1)}" r="${(ir * .2).toFixed(1)}" fill="#fff" opacity=".92"/><circle cx="${(ix - ir * .3).toFixed(1)}" cy="${(iy + ir * .35).toFixed(1)}" r="${(ir * .08).toFixed(1)}" fill="#fff" opacity=".5"/>` +
      `<path d="M${x - w},${y - h * .55} Q${x},${y - h * 1.5} ${x + w},${y - h * .6} L${x + w},${y - w} L${x - w},${y - w}Z" fill="#3a1a0c" opacity=".28"/></g>` +
      `<path d="M${x - w / 2},${y} Q${x - w * .06},${y - h * 1.5} ${x + w / 2},${y - h * .1}" stroke="#2a140a" stroke-width="${(w * .045).toFixed(1)}" fill="none" stroke-linecap="round"/>` +
      `<path d="M${x - w * .44},${y + h * .25} Q${x},${y + h * 1.2} ${x + w * .46},${y + h * .05}" stroke="#8a4a3a" stroke-width="${(w * .02).toFixed(1)}" fill="none" opacity=".6"/>`;
  } else s += `<path d="M${x - w / 2},${y} Q${x},${y + w * .1} ${x + w / 2},${y - w * .02}" stroke="#2a140a" stroke-width="${(w * .045).toFixed(1)}" fill="none" stroke-linecap="round"/>`;
  return s;
}
// the front face portrait. o: {m: 0 two eyes .. 1 one central eye (with a blink between), patch: {L, R, C}, top, hair, look, glasses, skinMul}
function faceF(id, cx, cy, S, o = {}) {
  const m = o.m || 0, blink = m > 0 && m < 1 ? Math.sin(Math.PI * Math.min(1, m)) : 0, op = (o.open ?? 1) * (1 - blink * .98), one = m >= .5;
  const top = o.top || '#2a5a8a', hair = o.hair || '#2a1a12';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})">`;
  // shoulders and shirt
  s += `<path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="${top}"/><path d="M-300,520 C-292,380 -250,300 -150,262 C-100,244 -64,232 -48,214 L48,214 C64,232 100,244 150,262 C250,300 292,380 300,520Z" fill="url(#shirtF)"/>` +
    `<path d="M-48,214 Q0,276 48,214" fill="#000" opacity=".22"/><path d="M-70,236 Q0,300 70,236" stroke="#000" stroke-width="5" fill="none" opacity=".18"/>`;
  // neck
  s += `<path d="M-50,110 L-52,236 Q0,268 52,236 L50,110Z" fill="#b47c5a"/><path d="M-50,140 Q0,190 50,140 L50,110 L-50,110Z" fill="#000" opacity=".18"/>`;
  // ears
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 128}" cy="8" rx="22" ry="38" fill="${k < 0 ? '#c08868' : '#a87050'}"/><path d="M${k * 132},-14 Q${k * 142},8 ${k * 130},34" stroke="#7a4a32" stroke-width="4" fill="none" opacity=".5"/>`; });
  // the head
  const HD = 'M-126,-20 C-128,-122 -72,-168 0,-168 C72,-168 128,-122 126,-20 C124,64 92,132 0,164 C-92,132 -124,64 -126,-20Z';
  s += `<path d="${HD}" fill="url(#skF)"/><path d="${HD}" fill="url(#skSide)"/><path d="${HD}" fill="#000" filter="url(#grainR)" opacity=".1"/>` +
    `<ellipse cx="-62" cy="52" rx="34" ry="18" fill="#e07a6a" opacity=".16" filter="url(#blur5)"/><ellipse cx="62" cy="52" rx="34" ry="18" fill="#c0604a" opacity=".14" filter="url(#blur5)"/>` +
    `<path d="M-60,120 Q0,170 60,120" stroke="#000" stroke-width="10" fill="none" opacity=".08" filter="url(#blur5)"/>`;
  // hair
  s += `<path d="M-134,-6 C-146,-136 -72,-196 0,-194 C82,-196 146,-136 134,-6 C126,-58 108,-98 66,-112 C18,-128 -36,-124 -78,-104 C-108,-84 -126,-50 -134,-6Z" fill="${hair}"/>` +
    `<path d="M-110,-110 C-70,-160 20,-176 90,-130" stroke="#fff" stroke-width="5" fill="none" opacity=".08"/>` +
    `<path d="M-6,80 L-6,96 M6,80 L6,96" stroke="#8a5a40" stroke-width="2.4" opacity=".35"/><ellipse cx="0" cy="146" rx="30" ry="8" fill="#000" opacity=".1" filter="url(#blur5)"/>` +
    (o.wild ? `<path d="M-120,30 C-126,120 -70,196 0,204 C70,196 126,120 120,30 C104,90 70,112 40,120 Q0,128 -40,120 C-70,112 -104,90 -120,30Z" fill="${hair}"/>` + Array.from({ length: 22 }, (_, i) => { const x0 = -100 + i * 9.5; return `<path d="M${x0},${120 + Math.abs(x0) * -.2} q${(i % 2 ? 4 : -4)},30 ${(i % 3 - 1) * 6},${50 - Math.abs(x0) * .25}" stroke="${mix(hair, '#ffffff', .2)}" stroke-width="2" fill="none" opacity=".18"/>`; }).join('') : '');
  // brows and eyes
  if (!one) {
    s += `<path d="M-84,-56 Q-52,-74 -18,-58" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M18,-58 Q52,-74 84,-56" stroke="${hair}" stroke-width="9" fill="none" stroke-linecap="round"/>`;
    const d = 50 * (1 - Math.min(1, m * 2) * .55);
    s += eyeF(id + 'L', -d, -14, 58, op * (o.patch && o.patch.L > .5 ? 0 : 1), o.look) + eyeF(id + 'R', d, -14, 58, op, o.look);
  } else {
    s += `<path d="M-58,-92 Q0,-118 58,-92" stroke="${hair}" stroke-width="11" fill="none" stroke-linecap="round"/>`;
    s += eyeF(id + 'C', 0, -40, 84, op * (o.patch && o.patch.C > .5 ? 0 : 1), o.look);
  }
  // nose and mouth
  s += `<path d="M-4,${one ? 14 : -12} C-8,30 -22,50 -20,62 C-14,74 14,74 20,62 C22,50 8,30 4,${one ? 6 : -12}" fill="#b47858" opacity=".55"/><path d="M8,${one ? 18 : -6} C14,34 26,52 20,64" stroke="#7a4a32" stroke-width="3" fill="none" opacity=".45"/>` +
    `<ellipse cx="-11" cy="66" rx="7" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="11" cy="66" rx="7" ry="3.6" fill="#4a2418" opacity=".7"/><ellipse cx="-4" cy="54" rx="6" ry="3" fill="#fff" opacity=".18"/>` +
    `<path d="M-36,104 Q-14,96 0,100 Q14,96 36,104 Q16,114 0,113 Q-16,114 -36,104Z" fill="#a4504a"/><path d="M-36,104 Q0,108 36,104" stroke="#5a2420" stroke-width="2.5" fill="none"/><path d="M-20,112 Q0,120 20,112" stroke="#fff" stroke-width="2" fill="none" opacity=".18"/>`;
  // eye patches
  const P = o.patch || {};
  const patch = (x, y, w, k) => k > 0 ? `<g opacity="${k.toFixed(2)}"><path d="M${x - w * .55},${y - w * .5} L-134,-40 M${x + w * .55},${y - w * .5} L134,-40" stroke="#1a1612" stroke-width="7" fill="none"/><ellipse cx="${x}" cy="${y + 2}" rx="${w * .66}" ry="${w * .5}" fill="#1a1612"/><ellipse cx="${x - w * .16}" cy="${y - w * .14}" rx="${w * .3}" ry="${w * .16}" fill="#fff" opacity=".1"/></g>` : '';
  if (!one) s += patch(-50 * (1 - Math.min(1, m * 2) * .55), -14, 58, P.L || 0); else s += patch(0, -40, 84, P.C || 0);
  // 3D glasses made for two eyes (red and cyan); the single eye sits under the bridge
  if (o.glasses) { const g = o.glasses;
    s += `<g opacity="${g.toFixed(2)}"><path d="M-134,-22 L-118,-26 M134,-22 L118,-26" stroke="#f2f2f2" stroke-width="7"/><rect x="-120" y="-50" width="72" height="54" rx="12" fill="#e02a2a" opacity=".55"/><rect x="48" y="-50" width="72" height="54" rx="12" fill="#2ad4e8" opacity=".55"/>` +
      `<rect x="-120" y="-50" width="72" height="54" rx="12" fill="none" stroke="#f4f4f4" stroke-width="7"/><rect x="48" y="-50" width="72" height="54" rx="12" fill="none" stroke="#f4f4f4" stroke-width="7"/><path d="M-48,-40 Q0,-110 48,-40" stroke="#f4f4f4" stroke-width="8" fill="none"/></g>`; }
  return s + `</g>`;
}
// profile hero with one big central eye (replaces the side-view eye)
function heroC(x, y, o = {}) {
  let s = hero(x, y, o);
  s = s.replace(/<ellipse cx="([-\d.]+)" cy="([-\d.]+)" rx="2.4" ry="3" fill="#1a120d"\/>/, (_, ex, ey) => { const X = +ex + 3, Y = +ey - 3.4;
    return `<ellipse cx="${X.toFixed(1)}" cy="${Y.toFixed(1)}" rx="4.6" ry="5" fill="#f6f0e6"/><circle cx="${(X + 1.4).toFixed(1)}" cy="${Y.toFixed(1)}" r="2.8" fill="#3a2010"/><circle cx="${(X + 2.2).toFixed(1)}" cy="${(Y - 1).toFixed(1)}" r=".9" fill="#fff"/>`; });
  s = s.replace(/<path d="M([-\d.]+),([-\d.]+) q6,-3 11,0"/, (_, bx, by) => `<path d="M${(+bx + 2).toFixed(1)},${(+by - 4.5).toFixed(1)} q7,-3 13,1"`);
  return s.replace(/<circle cx="[-\d.]+" cy="[-\d.]+" r="\.8" fill="#fff" opacity="[.\d]+"\/>/, '');
}
const CYC = { top: '#3a7a5a', pants: '#2a2a34', skin: '#c89070', hair: '#2a1e18' };

// 0: a face; the two eyes blink and open again as one eye in the middle
function sceneHook(t) {
  const m = clamp((t - WS(0, 5) + .1) / (WS(0, 8) - WS(0, 5) + .3)), z = 1 + .06 * ease(clamp(t / 4.2));
  let s = `<defs>${DEFO()}</defs>` + studio('stH', '#3a4664', '#0a0e1a', 5);
  s += `<ellipse cx="360" cy="1180" rx="320" ry="60" fill="#000" opacity=".35" filter="url(#blur16)"/>`;
  s += `<g transform="translate(360,760) scale(${z.toFixed(4)}) translate(-360,-760)">` + faceF('fh', 360, 700, 1.55, { m, top: '#2a5a8a', look: .2 * Math.sin(t * .9) }) + `</g>`;
  // a soft gold ring around the new eye
  const k = ease(ramp(t, WS(0, 8) - .1, WS(0, 10) + .2)); if (k > 0) s += `<circle cx="360" cy="${(760 + (700 - 40 * 1.55 - 760) * z).toFixed(1)}" r="${(92 + 8 * Math.sin(t * 4)).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="12 9" opacity="${(.85 * k).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 1: two eyes see two slightly different pictures; the brain compares them to measure distance
function miniView(x, y, w, h, dx, id, a = 1) {
  const cupX = x + w / 2 + dx, trX = x + w * .3 + dx * .12;
  return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/></clipPath><linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa0d8"/><stop offset="1" stop-color="#d8e6ee"/></linearGradient></defs>` +
    `<g opacity="${a.toFixed(2)}" clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#${id}s)"/>` +
    `<path d="M${x},${y + h * .62} Q${x + w * .3},${y + h * .5} ${x + w * .6},${y + h * .58} T${x + w},${y + h * .55} L${x + w},${y + h} L${x},${y + h}Z" fill="#7a9a6a"/>` +
    `<rect x="${(trX - 3).toFixed(1)}" y="${y + h * .36}" width="6" height="${h * .26}" fill="#5a4030"/><circle cx="${trX.toFixed(1)}" cy="${y + h * .32}" r="${h * .14}" fill="#3e6a3a"/><circle cx="${(trX - 6).toFixed(1)}" cy="${y + h * .28}" r="${h * .08}" fill="#5a8a4a"/>` +
    `<rect x="${x}" y="${y + h * .74}" width="${w}" height="${h * .26}" fill="#8a6244"/><rect x="${x}" y="${y + h * .74}" width="${w}" height="4" fill="#fff" opacity=".2"/>` +
    `<path d="M${(cupX - 22).toFixed(1)},${y + h * .46} L${(cupX + 22).toFixed(1)},${y + h * .46} L${(cupX + 17).toFixed(1)},${y + h * .78} L${(cupX - 17).toFixed(1)},${y + h * .78}Z" fill="#d8402a"/><path d="M${(cupX - 22).toFixed(1)},${y + h * .46} L${(cupX - 12).toFixed(1)},${y + h * .46} L${(cupX - 9).toFixed(1)},${y + h * .78} L${(cupX - 17).toFixed(1)},${y + h * .78}Z" fill="#fff" opacity=".25"/>` +
    `<path d="M${(cupX + 22).toFixed(1)},${y + h * .52} q16,4 0,18" stroke="#b0301e" stroke-width="5" fill="none"/><ellipse cx="${cupX.toFixed(1)}" cy="${y + h * .46}" rx="22" ry="5" fill="#7a1a10"/></g>` +
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="#f4c76b" stroke-width="3" opacity="${(.8 * a).toFixed(2)}"/>`;
}
function headTop(x, y, S, one) {
  return `<g transform="translate(${x},${y}) scale(${S})"><ellipse cx="0" cy="40" rx="130" ry="50" fill="#2a5a8a"/><ellipse cx="0" cy="40" rx="130" ry="50" fill="url(#shirtF)"/><ellipse cx="0" cy="10" rx="62" ry="66" fill="#c89070"/>` +
    `<path d="M-60,22 C-66,-40 -30,-64 0,-62 C30,-64 66,-40 60,22 C40,4 -40,4 -60,22Z" fill="#2a1e18" transform="rotate(180,0,0) translate(0,-24)"/><ellipse cx="0" cy="20" rx="52" ry="50" fill="#2a1e18"/>` +
    `<ellipse cx="0" cy="-58" rx="13" ry="10" fill="#c08868"/>` + (one ? `<circle cx="0" cy="-48" r="9" fill="#fff"/><circle cx="0" cy="-50" r="4" fill="#3a2010"/>` : `<circle cx="-26" cy="-44" r="8" fill="#fff"/><circle cx="26" cy="-44" r="8" fill="#fff"/><circle cx="-26" cy="-46" r="3.6" fill="#3a2010"/><circle cx="26" cy="-46" r="3.6" fill="#3a2010"/>`) + `</g>`;
}
function sceneStereo(t) {
  const a = ease(ramp(t, S0(1) - .1, S0(1) + .5)), fu = ease(ramp(t, WS(1, 6) - .2, WS(1, 7) + .3)), ms = ease(ramp(t, WS(1, 8) - .2, WS(1, 9) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stS', '#24304a', '#080b16', 7);
  // a table seen from above with the red cup, the head at the bottom
  s += `<rect x="150" y="610" width="420" height="190" rx="14" fill="#6a4a30"/><rect x="150" y="610" width="420" height="190" rx="14" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="150" y="610" width="420" height="10" rx="5" fill="#fff" opacity=".12"/>` +
    `<ellipse cx="372" cy="712" rx="40" ry="36" fill="#000" opacity=".3" filter="url(#blur5)"/><circle cx="360" cy="700" r="34" fill="#d8402a"/><circle cx="360" cy="700" r="24" fill="#7a1a10"/><circle cx="348" cy="688" r="8" fill="#fff" opacity=".25"/>`;
  s += headTop(360, 1070, 1, false);
  // sight lines from each eye to the cup
  const L = [334, 1026], Rr = [386, 1026];
  [[L, '#f4c76b'], [Rr, '#8ad8ff']].forEach(([e, c]) => { s += `<path d="M${e[0]},${e[1]} L360,700" stroke="${c}" stroke-width="4" stroke-dasharray="12 8" stroke-dashoffset="${(-t * 40).toFixed(1)}" opacity="${(.9 * a).toFixed(2)}"/>`; });
  // the two pictures, then laid over each other
  const w = 240, h = 170, y0 = 384, xl = lerp(70, 240, fu), xr = lerp(410, 240, fu);
  s += miniView(xl, y0, w, h, -26, 'mvL', a * (1 - .45 * fu)) + miniView(xr, y0, w, h, 26, 'mvR', a * (1 - .45 * fu));
  if (fu < .5) s += lbl(xl + w / 2, y0 + h + 34, 'العينُ اليسرى', a * (1 - fu * 2), '#ffe7a8', 24) + lbl(xr + w / 2, y0 + h + 34, 'العينُ اليمنى', a * (1 - fu * 2), '#bfe8ff', 24);
  // the measured distance
  if (ms > 0) s += arrow(560, 1010, 560, 720, ms, '#f4c76b', 5) + arrow(560, 720, 560, 1010, ms, '#f4c76b', 5) + lbl(620, 870, 'المسافة', ms, '#f4c76b', 30);
  noEarth(); F.ov = ''; return s;
}

// 2: with one eye the world loses depth: catching a ball, pouring water
function pourInset(cx, cy, R, t, a) {
  if (a <= 0) return '';
  const T = t - WS(2, 8) + .4, fl = clamp(T / .5), pool = clamp((T - .3) / 1.6);
  let g = `<rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#e8dcc8"/><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<rect x="${cx - R}" y="${cy + 40}" width="${2 * R}" height="${R}" fill="#8a6244"/><rect x="${cx - R}" y="${cy + 40}" width="${2 * R}" height="6" fill="#fff" opacity=".18"/>`;
  // the glass (empty) and the puddle beside it
  const gx = cx - 40;
  g += `<ellipse cx="${cx + 6}" cy="${cy + 62}" rx="${(10 + 70 * pool).toFixed(1)}" ry="${(3 + 12 * pool).toFixed(1)}" fill="#9cc8e8" opacity=".75"/><ellipse cx="${cx}" cy="${cy + 60}" rx="${(6 + 40 * pool).toFixed(1)}" ry="${(2 + 6 * pool).toFixed(1)}" fill="#fff" opacity=".35"/>` +
    `<path d="M${gx - 26},${cy - 30} L${gx + 26},${cy - 30} L${gx + 21},${cy + 58} L${gx - 21},${cy + 58}Z" fill="#dff0fa" opacity=".35"/><path d="M${gx - 26},${cy - 30} L${gx - 21},${cy + 58} M${gx + 26},${cy - 30} L${gx + 21},${cy + 58}" stroke="#fff" stroke-width="3" opacity=".8"/><ellipse cx="${gx}" cy="${cy - 30}" rx="26" ry="6" fill="none" stroke="#fff" stroke-width="2.5" opacity=".8"/><ellipse cx="${gx}" cy="${cy + 58}" rx="21" ry="5" fill="#a8c8d8" opacity=".5"/>`;
  // the jug, tilted, and the stream landing beside the glass
  const jx = cx + 60, jy = cy - 70;
  g += `<g transform="rotate(-38,${jx},${jy})"><path d="M${jx - 30},${jy - 50} L${jx + 30},${jy - 50} L${jx + 36},${jy + 50} L${jx - 36},${jy + 50}Z" fill="#cfe4f0" opacity=".75"/><path d="M${jx - 30},${jy - 50} L${jx - 36},${jy + 50}" stroke="#fff" stroke-width="4" opacity=".7"/><path d="M${jx - 30},${jy - 50} L${jx - 44},${jy - 58}" stroke="#cfe4f0" stroke-width="6"/><path d="M${jx + 34},${jy - 30} q26,14 4,50" stroke="#b8d0de" stroke-width="7" fill="none"/>` +
    `<rect x="${jx - 33}" y="${jy - 10}" width="66" height="58" fill="#7ab8e0" opacity=".6"/></g>`;
  if (fl > 0) { const sx = jx - 64, sy = jy - 20, ex = cx + 4, ey = cy + 58; g += `<path d="M${sx},${sy} Q${sx - 14},${sy + 60} ${ex},${lerp(sy, ey, fl).toFixed(1)}" stroke="#7ab8e0" stroke-width="7" fill="none" opacity=".85"/><path d="M${sx},${sy} Q${sx - 14},${sy + 60} ${ex},${lerp(sy, ey, fl).toFixed(1)}" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
    if (fl >= 1) for (let i = 0; i < 6; i++) { const p = pmod(t * 2.2 + i / 6, 1); g += `<circle cx="${(ex + Math.cos(i * 2.1) * 26 * p).toFixed(1)}" cy="${(ey - 18 * Math.sin(p * 3.14)).toFixed(1)}" r="3" fill="#9cd0f0" opacity="${(1 - p).toFixed(2)}"/>`; } }
  g += `<path d="M${gx - 20},${cy - 76} l40,40 M${gx + 20},${cy - 76} l-40,40" stroke="#e0483a" stroke-width="7" stroke-linecap="round" opacity="${clamp((T - 1.2) * 3).toFixed(2)}"/>`;
  return `<defs><clipPath id="poC"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g opacity="${a.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".45" filter="url(#blur9)"/><g clip-path="url(#poC)">${g}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
}
function sceneCatch(t) {
  const tt = WS(2, 5) - .25, u = (t - tt) / 1.0, y0 = PV + 74;
  // the thrower (two eyes) at the left, the catcher (one eye) at the right
  const throwK = clamp((t - tt + .5) / .5), relK = clamp((t - tt) / .2);
  const th = hero(150, y0, Object.assign({ s: .64, face: 1, shade: 1, hF: [150 + lerp(-10, 70, relK), y0 - lerp(150, 230, throwK) + 60 * relK], hB: [150 - 30, y0 - 110] }, pal(1)));
  const ballStart = [214, y0 - 190], H = [548, y0 - 182];
  let bx, by, hit = 0;
  if (u < 0) { bx = HP.hand[0]; by = HP.hand[1] - 6; }
  else if (u < 1) { bx = lerp(ballStart[0], H[0], u); by = lerp(ballStart[1], H[1], u) - 120 * 4 * u * (1 - u); }
  else { const d = u - 1; hit = 1; bx = H[0] - 150 * d; const g = H[1] - 210 * d + 620 * d * d; by = Math.min(PV + 66, g); if (g > PV + 66) { const d2 = d - .42; bx = H[0] - 150 * .42 - 60 * Math.min(d2, .6); by = PV + 66 - 36 * Math.abs(Math.sin(Math.min(d2, .6) * 6)) * Math.exp(-d2 * 3); } }
  // the catcher reaches too early and too low
  const rk = ease(ramp(t, tt + .35, tt + .7)), flinch = hit ? Math.exp(-(u - 1) * 4) : 0;
  const cx = 560, ct = heroC(cx, y0, Object.assign({ s: .66, face: -1, shade: 1, lean: -6 * flinch, hF: [cx - lerp(20, 70, rk), y0 - lerp(120, 150, rk)], hB: [cx - lerp(10, 62, rk), y0 - lerp(110, 132, rk)] }, CYC));
  const head = HP.head;
  let fg = th + ct;
  fg += `<ellipse cx="${bx.toFixed(1)}" cy="${(PV + 70).toFixed(1)}" rx="13" ry="4" fill="#000" opacity="${(.3 * clamp(1 - (PV + 70 - by) / 300)).toFixed(2)}"/><circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="13" fill="url(#ballG)"/><path d="M${(bx - 12).toFixed(1)},${by.toFixed(1)} Q${bx.toFixed(1)},${(by - 6).toFixed(1)} ${(bx + 12).toFixed(1)},${by.toFixed(1)}" stroke="#7a2a0a" stroke-width="1.6" fill="none"/>`;
  if (hit && u < 1.5) { const k = 1 - (u - 1) / .5; fg += lbl(head[0] + 4, head[1] - 46, 'طَق!', k, '#fff', 30) + [0, 1, 2, 3].map(i => { const a = i * 1.57 + t * 3; return `<circle cx="${(head[0] + Math.cos(a) * 30).toFixed(1)}" cy="${(head[1] - 26 + Math.sin(a) * 8).toFixed(1)}" r="4" fill="#f4c76b" opacity="${k.toFixed(2)}"/>`; }).join(''); }
  let s = `<defs>${OEDEF}</defs>` + street3(t, { N: 0, id: 'k', fg, cars: 1, carX: 620 });
  s += pourInset(320, 560, 150, t, ease(ramp(t, WS(2, 8) - .45, WS(2, 8) - .05)));
  noEarth(); F.ov = ''; return s;
}

// 3: the field of view shrinks from about 200° to about 150°; a car at your side is not seen
function carTop(x, y, ang, col) {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang})"><rect x="-80" y="-38" width="160" height="76" rx="22" fill="#000" opacity=".35" filter="url(#blur5)" transform="translate(6,8)"/>` +
    [[-48, -38], [48, -38], [-48, 32], [48, 32]].map(([a, b]) => `<rect x="${a - 15}" y="${b}" width="30" height="6" rx="2" fill="#111"/>`).join('') +
    `<rect x="-78" y="-36" width="156" height="72" rx="22" fill="${col}"/><rect x="-78" y="-36" width="156" height="20" rx="10" fill="#fff" opacity=".12"/>` +
    `<path d="M-46,-28 L-18,-30 L-18,30 L-46,28 Q-54,0 -46,-28Z" fill="#1a2430"/><path d="M30,-28 L48,-26 Q56,0 48,26 L30,28Z" fill="#1a2430"/><rect x="-18" y="-30" width="48" height="60" rx="6" fill="${mix(col, '#ffffff', .12)}"/>` +
    `<path d="M-40,-24 L-24,-26 L-24,-8Z" fill="#fff" opacity=".25"/><rect x="-80" y="-30" width="6" height="14" rx="3" fill="#fff6d8"/><rect x="-80" y="16" width="6" height="14" rx="3" fill="#fff6d8"/><rect x="74" y="-30" width="5" height="12" rx="2" fill="#c02a2a"/><rect x="74" y="18" width="5" height="12" rx="2" fill="#c02a2a"/></g>`;
}
function bikeTop(x, y, t) {
  const p = Math.sin(t * 8) * 6;
  return `<g transform="translate(${x.toFixed(1)},${y})"><ellipse cx="6" cy="10" rx="70" ry="18" fill="#000" opacity=".3" filter="url(#blur5)"/><rect x="-62" y="-4" width="34" height="8" rx="4" fill="#1a1a1a"/><rect x="26" y="-4" width="34" height="8" rx="4" fill="#1a1a1a"/><path d="M-40,0 L40,0" stroke="#2a6ab0" stroke-width="5"/><path d="M-34,-16 L-34,16" stroke="#333" stroke-width="5" stroke-linecap="round"/>` +
    `<path d="M-10,-14 Q-26,-12 -32,-14 M-10,14 Q-26,12 -32,14" stroke="#e0a070" stroke-width="7" stroke-linecap="round" fill="none"/><ellipse cx="0" cy="0" rx="16" ry="26" fill="#d8402a"/><ellipse cx="0" cy="${(-12 + p * .3).toFixed(1)}" rx="9" ry="6" fill="#1a1a1a" opacity=".5"/><ellipse cx="${(8 + p * .2).toFixed(1)}" cy="${(-14 - p).toFixed(1)}" rx="8" ry="5" fill="#2a2a34"/><ellipse cx="${(8 - p * .2).toFixed(1)}" cy="${(14 + p).toFixed(1)}" rx="8" ry="5" fill="#2a2a34"/><circle cx="-6" cy="0" r="13" fill="#f2f2f2"/><circle cx="-6" cy="0" r="13" fill="none" stroke="#999" stroke-width="2"/><path d="M-14,-6 L2,-6" stroke="#666" stroke-width="2"/></g>`;
}
function canopy(x, y, r, seed) {
  const q = RS(seed); let s = `<circle cx="${x + 14}" cy="${y + 16}" r="${r}" fill="#000" opacity=".35" filter="url(#blur9)"/>`;
  for (let i = 0; i < 14; i++) { const a = q() * 6.28, d = q() * r * .6, rr = r * (.35 + q() * .3); s += `<circle cx="${(x + Math.cos(a) * d).toFixed(1)}" cy="${(y + Math.sin(a) * d).toFixed(1)}" r="${rr.toFixed(1)}" fill="${['#3e6a34', '#4a7a3a', '#2e5a2a', '#5a8a44'][Math.floor(q() * 4)]}"/>`; }
  for (let i = 0; i < 8; i++) { const a = q() * 6.28, d = q() * r * .5; s += `<circle cx="${(x - r * .2 + Math.cos(a) * d).toFixed(1)}" cy="${(y - r * .2 + Math.sin(a) * d).toFixed(1)}" r="${(r * .18).toFixed(1)}" fill="#8ab85a" opacity=".45"/>`; }
  return s;
}
function sceneFOV(t) {
  const sh = ease(ramp(t, WS(3, 6) - .1, WS(3, 9) + .3)), A = lerp(200, 150, sh), a = ease(ramp(t, S0(3) - .2, S0(3) + .5));
  const hx = 360, hy = 1000, Rf = 620;
  let s = `<defs>${DEFO()}</defs>`;
  // the street from above: asphalt, lane marks, a zebra crossing, the pavement with tiles, two trees
  s += `<rect x="-200" y="-200" width="1120" height="1700" fill="#4c4c54"/><rect x="-20" y="-20" width="760" height="1320" fill="#000" filter="url(#grainR)" opacity=".45"/>` +
    Array.from({ length: 7 }, (_, i) => `<rect x="${i * 120 - 40}" y="806" width="70" height="8" fill="#e8e4d8" opacity=".8"/>`).join('') +
    Array.from({ length: 6 }, (_, i) => `<rect x="${250 + i * 40}" y="610" width="24" height="150" fill="#e8e4d8" opacity=".85"/>`).join('') +
    `<rect x="-20" y="900" width="760" height="400" fill="#bfb3a0"/><rect x="-20" y="900" width="760" height="400" fill="#000" filter="url(#grainR)" opacity=".22"/><rect x="-20" y="892" width="760" height="12" fill="#e2ddd0"/>` +
    Array.from({ length: 16 }, (_, i) => `<path d="M${i * 50},904 L${i * 50},1300" stroke="#a0947e" stroke-width="1.5"/>`).join('') + Array.from({ length: 8 }, (_, i) => `<path d="M-20,${940 + i * 50} L740,${940 + i * 50}" stroke="#a0947e" stroke-width="1.5"/>`).join('') +
    `<rect x="-20" y="-20" width="760" height="560" fill="#5a5a62"/><rect x="-20" y="520" width="760" height="12" fill="#e2ddd0"/><rect x="-20" y="-20" width="760" height="540" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  s += canopy(80, 1150, 90, 51) + canopy(650, 1190, 80, 52) + canopy(620, 400, 100, 53);
  // the car coming from the right at the side
  const T = t - S0(3), cxp = lerp(820, 540, ease(clamp(T / 6.6))), cyp = 1016;
  s += carTop(lerp(900, 420, clamp(T / 7.5)), 840, 180, '#c8322a') + carTop(lerp(-200, 300, clamp(T / 7.5)), 700, 0, '#e2e2e6') + bikeTop(cxp, cyp, t);
  // the field of view fan (gold) and the blind sides (dark)
  const fan = (deg, r) => { const h = deg / 2 * Math.PI / 180, x1 = hx + Math.sin(-h) * r, y1 = hy - Math.cos(-h) * r, x2 = hx + Math.sin(h) * r, y2 = hy - Math.cos(h) * r; return `M${hx},${hy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${deg > 180 ? 1 : 0} 1 ${x2.toFixed(1)},${y2.toFixed(1)}Z`; };
  s += `<defs><mask id="fovM"><rect x="-20" y="-20" width="760" height="1320" fill="#fff"/><path d="${fan(A, 2000)}" fill="#000"/></mask></defs>` +
    `<rect x="-20" y="-20" width="760" height="1320" fill="#0a0814" opacity="${(.62 * a).toFixed(2)}" mask="url(#fovM)"/><rect x="-20" y="-20" width="760" height="1320" fill="#c0302a" opacity="${(.12 * a * sh).toFixed(2)}" mask="url(#fovM)"/>` +
    `<path d="${fan(A, Rf)}" fill="url(#fovG)" opacity="${(.55 * a).toFixed(2)}"/><path d="${fan(A, Rf)}" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${(.9 * a).toFixed(2)}"/>`;
  s += headTop(hx, hy, .62, sh > .5);
  // the angle label
  s += `<g opacity="${a.toFixed(2)}">` + panel(250, 1170, 220, 74) + lbl(360, 1222, sh < .5 ? '٢٠٠ درجة' : '١٥٠ درجة', 1, sh < .5 ? '#ffe7a8' : '#ff9a8a', 40) + `</g>`;
  // the car in the blind side
  const ang = Math.atan2(cxp - hx, -(cyp - hy)) * 180 / Math.PI, inV = Math.abs(ang) < A / 2;
  if (cxp < 740 && !inV) { const fl = .6 + .4 * Math.sin(t * 10); s += `<circle cx="${cxp.toFixed(1)}" cy="${cyp}" r="80" fill="none" stroke="#ff5a4a" stroke-width="5" opacity="${fl.toFixed(2)}"/>` + lbl(cxp - 4, cyp - 96, 'لا تراه!', ease(ramp(t, WS(3, 14) - .2, WS(3, 14) + .2)), '#ff8a7a', 34); }
  noEarth(); F.ov = ''; return s;
}

// 4: no spare eye: one injury and you are blind
function viewBox(x, y, w, h, dark, id) {
  return miniView(x, y, w, h, 0, id, 1) + (dark > 0 ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="#000" opacity="${(.97 * dark).toFixed(2)}"/>` : '');
}
function sceneSpare(t) {
  const inj = ease(ramp(t, WS(4, 4) - .15, WS(4, 4) + .2)), dk = ease(ramp(t, WS(4, 6) - .2, WS(4, 7) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stP', '#2a3450', '#090c18', 11);
  s += faceF('fa', 192, 660, .66, { m: 0, top: '#2a5a8a', patch: { L: inj }, look: .3 }) + faceF('fb', 528, 660, .66, { m: 1, top: '#3a7a5a', patch: { C: inj }, hair: '#3a2416', look: -.3 });
  s += lbl(192, 470, 'عينان', 1, '#ffe7a8', 34) + lbl(528, 470, 'عينٌ واحدة', 1, '#ffe7a8', 34);
  // what each one sees after the injury
  s += viewBox(72, 960, 240, 160, 0, 'vbA') + viewBox(408, 960, 240, 160, dk, 'vbB');
  if (inj > 0) s += lbl(192, 1168, 'ما زالَ يرى', inj, '#f4c76b', 30) + lbl(528, 1168, 'ظلامٌ تامّ', dk, '#ff8a7a', 30);
  // the hit: a small flash at the moment of injury
  const fl = Math.exp(-Math.max(0, t - WS(4, 4)) * 6) * (t > WS(4, 4) - .05 ? 1 : 0); if (fl > .02) s += `<rect x="-20" y="-20" width="760" height="1320" fill="#fff" opacity="${(.35 * fl).toFixed(2)}"/>`;
  noEarth(); F.ov = ''; return s;
}

// 5: the brain copes: moving the head (near things slide faster), sizes and shadows
function sceneCues(t) {
  const T = t - S0(5), sw = 46 * Math.sin(T * 1.7) * ease(ramp(t, WS(5, 3) - .3, WS(5, 3) + .3));
  const L = (k, inner) => `<g transform="translate(${(sw * k).toFixed(2)},0)">${inner}</g>`;
  let s = `<defs>${DEFO()}<linearGradient id="skC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a74bc"/><stop offset=".6" stop-color="#94bee4"/><stop offset="1" stop-color="#e8e0c8"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#skC)"/>`;
  s += L(.04, `<circle cx="590" cy="300" r="150" fill="#fff6d8" opacity=".25" filter="url(#soft)"/><circle cx="590" cy="300" r="48" fill="#fffbe8" opacity=".45" filter="url(#blur9)"/><circle cx="590" cy="300" r="22" fill="#fffef6"/>` + cumulus(220, 420, 240, 61, { a: .9 }) + cumulus(560, 520, 170, 63, { a: .8 }));
  s += L(.1, mountainsR(760, 90, 77, { rock: '#7e8aa0' }) + `<rect x="-200" y="740" width="1120" height="80" fill="#7e8aa0"/>` + mountainsR(800, 50, 79, { rock: '#6a7a68' }) + `<rect x="-200" y="790" width="1120" height="60" fill="#6a7a68"/><rect x="-200" y="700" width="1120" height="120" fill="#e8e0c8" opacity=".3" filter="url(#soft)"/>`);
  s += L(.3, forestR(840, 40, 20, 46, 81, '#4a6a3a', { dy: 8 }) + `<rect x="-200" y="830" width="1120" height="480" fill="#8aa060"/>`);
  s += meadow(840, 1300, t, { c0: '#94a868', c1: '#5e7240' });
  // a path across the meadow; two people of the same height: one near, one far
  s += L(.45, `<path d="M-200,930 Q300,900 920,940 L920,980 Q300,940 -200,972Z" fill="#c8b48a"/>` + `<ellipse cx="300" cy="934" rx="40" ry="6" fill="#000" opacity=".25" filter="url(#blur2)"/>` + hero(282, 930, Object.assign({ s: .34, face: -1, shade: 1, walk: T * 3, amp: .4 }, pal(2))));
  s += L(.62, treeR(150, 1010, 260, 91, t));
  s += L(.9, `<path d="M450,1122 L640,1160 L652,1146 L470,1112Z" fill="#1a2a10" opacity=".45" filter="url(#blur2)"/>` + hero(470, 1120, Object.assign({ s: .74, face: -1, shade: 1 }, pal(2))));
  s += L(1.6, treeR(700, 1290, 520, 93, t) + `<path d="M-60,1300 Q40,1180 120,1210 Q200,1240 260,1300Z" fill="#3a5a2a"/><path d="M-60,1300 Q40,1200 120,1226" stroke="#6a8a4a" stroke-width="5" fill="none" opacity=".5"/>`);
  // labels
  const k1 = ease(ramp(t, WS(5, 3), WS(5, 4) + .2)), k2 = ease(ramp(t, WS(5, 7) - .1, WS(5, 7) + .3)), k3 = ease(ramp(t, WS(5, 8) - .1, WS(5, 8) + .3));
  if (k1 > 0) s += `<g opacity="${k1.toFixed(2)}">` + panel(452, 560, 236, 110) + lbl(570, 604, 'القريبُ يتحرّك', 1, '#fff', 26) + lbl(570, 646, 'أسرعَ من البعيد', 1, '#f4c76b', 26) + `</g>` + arrow(600 + sw * 1.6 - 60, 1000, 600 + sw * 1.6 + 60, 1000, k1, '#f4c76b', 5);
  if (k2 > 0) s += `<g opacity="${k2.toFixed(2)}"><path d="M${(282 + sw * .45).toFixed(1)},${(930 - 70).toFixed(1)} L${(470 + sw * .9).toFixed(1)},${(1120 - 210).toFixed(1)}" stroke="#f4c76b" stroke-width="3" stroke-dasharray="8 7"/>` + panel(40, 700, 200, 60) + lbl(140, 740, 'الحجم', 1, '#f4c76b', 30) + `</g>`;
  if (k3 > 0) s += `<g opacity="${k3.toFixed(2)}">` + panel(470, 1180, 200, 60) + lbl(570, 1220, 'الظلّ', 1, '#f4c76b', 30) + `<path d="M${(600 + sw * .9).toFixed(1)},1180 L${(590 + sw * .9).toFixed(1)},1158" stroke="#f4c76b" stroke-width="3"/></g>`;
  noEarth(); F.ov = ''; return s;
}

// 6: no 3D films: they trick two eyes, not one
function sceneCinema(t) {
  const x3 = ease(ramp(t, WS(6, 6) - .3, WS(6, 6) + .2)), no = ease(ramp(t, WS(6, 9) - .2, WS(6, 10) + .1)), T = t - S0(6);
  let s = `<defs>${DEFO()}<linearGradient id="hallG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a1018"/><stop offset="1" stop-color="#0a0608"/></linearGradient><clipPath id="scrC"><rect x="50" y="390" width="620" height="350"/></clipPath></defs><rect x="-200" y="-200" width="1120" height="1700" fill="url(#hallG)"/>`;
  // the side curtains and the screen
  s += `<rect x="-20" y="340" width="70" height="460" fill="#5a1418"/><rect x="670" y="340" width="70" height="460" fill="#5a1418"/>` + Array.from({ length: 6 }, (_, i) => `<path d="M${-10 + i * 12},340 v460 M${680 + i * 12},340 v460" stroke="#000" stroke-width="4" opacity=".3"/>`).join('') +
    `<rect x="40" y="380" width="640" height="370" fill="#ddd8d0" opacity=".08" filter="url(#blur16)"/><g clip-path="url(#scrC)"><rect x="50" y="390" width="620" height="350" fill="#0e1428"/>`;
  const r = RS(71); for (let i = 0; i < 40; i++) { const x = 50 + r() * 620, y = 390 + r() * 350; s += `<circle cx="${(x - 5).toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#ff5a5a" opacity=".8"/><circle cx="${(x + 5).toFixed(1)}" cy="${y.toFixed(1)}" r="1.6" fill="#5af0ff" opacity=".8"/>`; }
  // a ringed planet in red and cyan (anaglyph), coming out of the screen
  const px = 360 + 20 * Math.sin(T * .6), py = 566, pr = 92 + T * 3;
  const planet = (dx, col) => `<g transform="translate(${dx},0)" style="mix-blend-mode:screen"><circle cx="${px}" cy="${py}" r="${pr}" fill="${col}" opacity=".7"/><ellipse cx="${px}" cy="${py}" rx="${pr * 1.8}" ry="${pr * .36}" fill="none" stroke="${col}" stroke-width="12" opacity=".65" transform="rotate(-14,${px},${py})"/></g>`;
  s += planet(-16, '#ff3a3a') + planet(16, '#2ae8ff') + `<circle cx="${px - pr * .3}" cy="${py - pr * .35}" r="${pr * .25}" fill="#fff" opacity=".12" filter="url(#blur9)"/></g>`;
  s += `<path d="M360,140 L50,390 L670,390Z" fill="#fff6e0" opacity=".05"/>`;
  // rows of seats with heads seen from behind
  [[860, .8, 0], [990, .9, 1], [1130, 1, 2]].forEach(([y, k, rw]) => { for (let i = -1; i < 8; i++) { const x = 40 + i * 100 * k + (rw % 2) * 46, rr = RS(rw * 20 + i + 50);
    s += `<ellipse cx="${x}" cy="${y - 54 * k}" rx="${30 * k}" ry="${36 * k}" fill="${['#2a1e18', '#1a120c', '#3a2a1e', '#4a3a2a'][Math.floor(rr() * 4)]}"/><rect x="${x - 46 * k}" y="${y - 30 * k}" width="${92 * k}" height="${110 * k}" rx="${18 * k}" fill="#6a1a20"/><rect x="${x - 46 * k}" y="${y - 30 * k}" width="${92 * k}" height="${12 * k}" rx="${6 * k}" fill="#fff" opacity=".1"/>` +
      `<path d="M${x - 30 * k},${y - 60 * k} L${x + 30 * k},${y - 60 * k}" stroke="#f2f2f2" stroke-width="${3 * k}" opacity=".5"/>`; } });
  s += `<rect x="-20" y="780" width="760" height="520" fill="#000" opacity=".25"/>`;
  // the inset: a one-eyed face behind 3D glasses
  if (x3 > 0) { const cx = 360, cy = 1040, R = 170;
    s += `<defs><clipPath id="g3C"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath></defs><g opacity="${x3.toFixed(2)}"><circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#000" opacity=".5" filter="url(#blur9)"/><g clip-path="url(#g3C)"><rect x="${cx - R}" y="${cy - R}" width="${2 * R}" height="${2 * R}" fill="#20182a"/>` +
      faceF('fc', cx, cy + 10, .62, { m: 1, top: '#3a7a5a', glasses: 1, look: .2 * Math.sin(t * 2) }) + `</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/></g>`;
    if (no > 0) s += `<path d="M${cx - 120},${cy - 120} L${cx + 120},${cy + 120} M${cx + 120},${cy - 120} L${cx - 120},${cy + 120}" stroke="#e0483a" stroke-width="14" stroke-linecap="round" opacity="${(.85 * no).toFixed(2)}"/>`; }
  noEarth(); F.ov = ''; return s;
}

// 7: the twist: the one-eyed giant myth may come from dwarf elephant skulls (the big nasal opening looks like one eye)
function skull(cx, cy, S, a) {
  if (a <= 0) return '';
  // front view of a dwarf elephant skull: a wide domed cranium, the big nasal opening high in the middle,
  // small eye sockets low at the sides behind the cheek arches, and the broad tusk sheaths below
  const CR = 'M-210,30 C-220,-110 -128,-200 0,-204 C128,-200 220,-110 210,30 C206,80 186,112 160,126 L120,130 C110,150 100,160 92,170 L-92,170 C-100,160 -110,150 -120,130 L-160,126 C-186,112 -206,80 -210,30Z';
  const PM = 'M-120,110 C-118,190 -110,250 -96,300 L-40,312 L0,300 L40,312 L96,300 C110,250 118,190 120,110Z';
  let s = `<g transform="translate(${cx},${cy}) scale(${S})" opacity="${a.toFixed(2)}"><ellipse cx="0" cy="350" rx="240" ry="26" fill="#000" opacity=".5" filter="url(#blur9)"/>`;
  s += `<path d="${PM}" fill="url(#boneG)"/><path d="${PM}" fill="url(#pmSh)"/><path d="${PM}" fill="#000" filter="url(#grainR)" opacity=".18"/><path d="M0,140 L0,300" stroke="#6a5a40" stroke-width="4" opacity=".5"/>`;
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 66}" cy="300" rx="30" ry="14" fill="#2a1e10"/><path d="M${k * 56},300 C${k * 60},336 ${k * 78},366 ${k * 108},372 C${k * 100},352 ${k * 92},326 ${k * 90},300Z" fill="#efe4c8"/><path d="M${k * 60},304 C${k * 64},334 ${k * 78},356 ${k * 100},366" stroke="#fff" stroke-width="3" fill="none" opacity=".4"/>` +
    `<path d="M${k * 100},150 C${k * 104},210 ${k * 98},260 ${k * 90},296" stroke="#7a6a4c" stroke-width="5" fill="none" opacity=".45"/>`; });
  s += `<path d="${CR}" fill="url(#boneG)"/><path d="${CR}" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  // cheek arches and the side eye sockets
  [-1, 1].forEach(k => { s += `<path d="M${k * 150},70 C${k * 186},74 ${k * 214},96 ${k * 222},140 C${k * 206},132 ${k * 186},118 ${k * 156},110Z" fill="#cdbd98"/><path d="M${k * 156},110 C${k * 186},118 ${k * 206},132 ${k * 222},140" stroke="#6a5a40" stroke-width="3" fill="none" opacity=".6"/>` +
    `<ellipse cx="${k * 160}" cy="74" rx="26" ry="30" fill="url(#holeG)"/><path d="M${k * 136},56 C${k * 150},40 ${k * 176},42 ${k * 186},62" stroke="#f6eedc" stroke-width="3" fill="none" opacity=".45"/>`; });
  // the big nasal opening
  s += `<path d="M-80,-50 C-86,-118 -40,-146 0,-146 C40,-146 86,-118 80,-50 C76,0 40,26 0,26 C-40,26 -76,0 -80,-50Z" fill="url(#holeG)"/><path d="M-80,-50 C-86,-118 -40,-146 0,-146 C40,-146 86,-118 80,-50" stroke="#f6eedc" stroke-width="4" fill="none" opacity=".45"/>` +
    `<path d="M-84,-40 C-88,10 -50,44 0,46 C50,44 88,10 84,-40" stroke="#7a6a4c" stroke-width="5" fill="none" opacity=".45"/><path d="M-8,-30 C-4,-8 -2,10 0,22" stroke="#3a2a18" stroke-width="5" fill="none" opacity=".6"/>`;
  // wear, cracks and light from the upper left
  s += `<path d="M-130,-150 l20,26 l-6,22 l18,18 M106,-168 l-14,30 l10,20 M-180,60 l20,10 l8,22 M150,10 l-18,14" stroke="#5a4a32" stroke-width="2.4" fill="none" opacity=".55"/>` +
    `<path d="${CR}" fill="none" stroke="#5a4a32" stroke-width="4" opacity=".4"/><path d="M-160,-110 C-110,-180 40,-196 120,-156" stroke="#fff" stroke-width="12" fill="none" opacity=".2" filter="url(#blur5)"/><path d="M120,-120 C190,-60 200,40 170,110" stroke="#000" stroke-width="24" fill="none" opacity=".16" filter="url(#blur9)"/>`;
  return s + `</g>`;
}
function sceneSkull(t) {
  const my = ease(ramp(t, S0(7) - .3, S0(7) + .5)) * (1 - ease(ramp(t, WS(7, 5) - .2, WS(7, 7)))), sk = ease(ramp(t, WS(7, 6) - .3, WS(7, 9) + .1)), ns = ease(ramp(t, WS(7, 12) - .2, WS(7, 13) + .2));
  let s = `<defs>${DEFO()}</defs>` + studio('stK', '#2e2620', '#080604', 17);
  s += `<path d="M300,-40 L420,-40 L640,1240 L80,1240Z" fill="url(#spotG)"/>`;
  // the legendary giant, in the shadows
  if (my > 0) s += `<g opacity="${my.toFixed(2)}" style="filter:brightness(.55) sepia(.5)">` + faceF('fk', 360, 660, 1.45, { m: 1, top: '#5a4a36', hair: '#1a120c', wild: 1, look: .3 * Math.sin(t) }) + `</g>`;
  // the skull on a stone base
  s += `<g opacity="${sk.toFixed(2)}"><path d="M130,1110 L590,1110 L620,1240 L100,1240Z" fill="#4a4038"/><rect x="150" y="1104" width="420" height="12" fill="#6a5e52"/><rect x="120" y="1110" width="480" height="140" fill="#000" filter="url(#grainR)" opacity=".3"/></g>` + skull(360, 730, 1.0, sk);
  if (sk > 0) s += `<g opacity="${sk.toFixed(2)}">` + panel(230, 1150, 260, 56) + lbl(360, 1188, 'جمجمةُ فيلٍ قزم', 1, '#f2e8d2', 26) + `</g>`;
  if (ns > 0) { const r = 100 + 6 * Math.sin(t * 4); s += `<ellipse cx="360" cy="${(730 - 60).toFixed(1)}" rx="${r.toFixed(1)}" ry="${(r * .95).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="5" stroke-dasharray="14 10" opacity="${ns.toFixed(2)}"/>` +
    arrow(560, 520, 460, 640, ns, '#f4c76b', 5) + lbl(560, 500, 'فتحةُ الأنف', ns, '#f4c76b', 32) + arrow(110, 900, 180, 818, ns, '#c8ccd6', 4) + lbl(110, 940, 'العينان هنا', ns, '#d8dce6', 26); }
  noEarth(); F.ov = ''; return s;
}

// 8: a real one-eyed animal: the tiny copepod Cyclops, under a microscope
function copepod(x, y, S, ang, t) {
  let s = `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${ang.toFixed(1)}) scale(${S})">`;
  // the long first antennae with fine hairs
  [-1, 1].forEach(k => { const w = Math.sin(t * 3 + k) * 4; let d = `M${k * 14},-96`; const pts = []; for (let i = 1; i <= 8; i++) { const u = i / 8, px = k * (14 + 150 * u), py = -96 - 50 * Math.sin(u * 1.6) + 60 * u * u + w * u; pts.push([px, py]); d += ` L${px.toFixed(1)},${py.toFixed(1)}`; }
    s += `<path d="${d}" stroke="#a8784a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#e8c898" stroke-width="1.6" fill="none" opacity=".6"/>` + pts.map(([px, py], i) => `<path d="M${px.toFixed(1)},${py.toFixed(1)} l${(k * 6).toFixed(1)},${-14 + i}" stroke="#a8784a" stroke-width="1.2" opacity=".7"/>`).join(''); });
  // egg sacs at the sides of the tail
  [-1, 1].forEach(k => { s += `<ellipse cx="${k * 36}" cy="96" rx="24" ry="44" fill="#4a5a2a" opacity=".85"/>` + Array.from({ length: 14 }, (_, i) => `<circle cx="${(k * 36 + ((i % 3) - 1) * 12).toFixed(1)}" cy="${(64 + Math.floor(i / 3) * 14).toFixed(1)}" r="6" fill="#6a7a3a" stroke="#2a3418" stroke-width="1"/>`).join(''); });
  // the tail with its fork
  s += `<path d="M-14,40 L14,40 L10,150 L-10,150Z" fill="#c8a070" opacity=".85"/>` + [70, 96, 122].map(yy => `<path d="M-12,${yy} L12,${yy}" stroke="#8a6a44" stroke-width="2"/>`).join('') +
    `<path d="M-8,150 L-18,184 M8,150 L18,184" stroke="#c8a070" stroke-width="6" stroke-linecap="round"/><path d="M-18,184 l-10,40 M-18,184 l2,44 M18,184 l10,40 M18,184 l-2,44" stroke="#a8784a" stroke-width="1.6"/>`;
  // the body: translucent amber with segments and the gut
  s += `<path d="M0,-120 C44,-120 54,-60 50,-10 C46,30 30,50 0,52 C-30,50 -46,30 -50,-10 C-54,-60 -44,-120 0,-120Z" fill="#d8b07a" opacity=".85"/><path d="M0,-120 C44,-120 54,-60 50,-10 C46,30 30,50 0,52 C-30,50 -46,30 -50,-10 C-54,-60 -44,-120 0,-120Z" fill="none" stroke="#8a6a44" stroke-width="3"/>` +
    [-40, -12, 14, 34].map(yy => `<path d="M-48,${yy} Q0,${yy + 10} 48,${yy}" stroke="#8a6a44" stroke-width="2" fill="none" opacity=".7"/>`).join('') +
    `<path d="M0,-90 C-8,-40 8,0 0,46" stroke="#7a4a20" stroke-width="10" fill="none" opacity=".55"/><ellipse cx="-14" cy="-80" rx="12" ry="20" fill="#fff" opacity=".25"/>`;
  // the single eye: a red spot in the middle of the head
  s += `<circle cx="0" cy="-98" r="16" fill="#ff3a2a" opacity=".35" filter="url(#blur5)"/><circle cx="0" cy="-98" r="9" fill="#c81a12"/><circle cx="-2.5" cy="-101" r="3" fill="#ffb0a0"/>`;
  return s + `</g>`;
}
function sceneCopepod(t) {
  const T = t - S0(8), a = ease(ramp(t, S0(8) - .2, S0(8) + .5)), ek = ease(ramp(t, WS(8, 9) - .2, WS(8, 10) + .2));
  let s = `<defs>${DEFO()}<clipPath id="micC"><circle cx="360" cy="760" r="320"/></clipPath><radialGradient id="micV" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".8"/></radialGradient></defs><rect x="-200" y="-200" width="1120" height="1700" fill="#050607"/>`;
  s += `<g clip-path="url(#micC)"><rect x="40" y="440" width="640" height="640" fill="url(#micG)"/>`;
  const r = RS(41); for (let i = 0; i < 46; i++) { const x = 40 + r() * 640 + Math.sin(T * .5 + i) * 6, y = 440 + r() * 640 + T * (4 + r() * 6), rr = 2 + r() * 7; s += `<circle cx="${x.toFixed(1)}" cy="${pmod(y - 440, 640) + 440}" r="${rr.toFixed(1)}" fill="${r() < .5 ? '#7aa860' : '#a8c890'}" opacity="${(.25 + .35 * r()).toFixed(2)}"/>`; }
  for (let i = 0; i < 5; i++) { const x = 90 + r() * 540, y = 500 + r() * 520, an = r() * 180; s += `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${an.toFixed(0)})"><rect x="-22" y="-5" width="44" height="10" rx="5" fill="#b8c87a" opacity=".55"/><path d="M-18,0 L18,0" stroke="#7a8a4a" stroke-width="1.2" opacity=".6"/></g>`; }
  // the copepod hops in short jerks
  const hop = T * 1.3, ph = hop - Math.floor(hop), jump = Math.floor(hop) * 18 + 18 * (1 - Math.exp(-ph * 9)), cx = 360 + Math.sin(T * .7) * 20, cy = 800 - jump * .5;
  s += copepod(cx, cy, 1.12, -6 + 4 * Math.sin(T * 1.1), t);
  if (ek > 0) s += `<circle cx="${(cx - 12).toFixed(1)}" cy="${(cy - 110).toFixed(1)}" r="${(34 + 4 * Math.sin(t * 5)).toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="4" opacity="${ek.toFixed(2)}"/>`;
  s += `<rect x="40" y="440" width="640" height="640" fill="url(#micV)"/></g><circle cx="360" cy="760" r="320" fill="none" stroke="#1a1c20" stroke-width="18"/><circle cx="360" cy="760" r="330" fill="none" stroke="#3a3e46" stroke-width="4"/>`;
  // the scale bar
  s += `<g opacity="${a.toFixed(2)}"><path d="M150,950 L250,950" stroke="#1a2a1a" stroke-width="5"/><path d="M150,940 v20 M250,940 v20" stroke="#1a2a1a" stroke-width="4"/>` + lbl(200, 928, 'نصفُ ملّيمتر', 1, '#fff', 24) + `</g>`;
  noEarth(); F.ov = ''; return s;
}

