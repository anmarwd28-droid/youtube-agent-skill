// ---- realistic macro subjects for the new opening ----
const RS = s => { const r = R(s * 7919 + 13); r(); return r; };
function macroBee(x, y, s, t, a = 1) {
  const r = RS(5), wf = .55 + .45 * Math.abs(Math.sin(t * 38));
  let o = `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><defs>` +
    `<radialGradient id="mbT" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f0c060"/><stop offset=".6" stop-color="#b07820"/><stop offset="1" stop-color="#4a2c08"/></radialGradient>` +
    `<radialGradient id="mbA" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ffd860"/><stop offset=".55" stop-color="#d08c18"/><stop offset="1" stop-color="#5a3404"/></radialGradient>` +
    `<radialGradient id="mbE" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#5a4a3a"/><stop offset=".6" stop-color="#1a120a"/><stop offset="1" stop-color="#000"/></radialGradient>` +
    `<linearGradient id="mbW" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8f4ff" stop-opacity=".55"/><stop offset=".5" stop-color="#c8b8ff" stop-opacity=".25"/><stop offset="1" stop-color="#a8f0d8" stop-opacity=".35"/></linearGradient>` +
    `<clipPath id="mbAc"><ellipse cx="-46" cy="6" rx="44" ry="30" transform="rotate(12,-46,6)"/></clipPath></defs>`;
  o += `<ellipse cx="-10" cy="58" rx="80" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
  // far legs
  o += [[-20, 20, -40, 54], [0, 22, -6, 60], [16, 20, 30, 58]].map(([a1, b1, a2, b2]) => `<path d="M${a1},${b1} L${(a1 + a2) / 2 - 6},${(b1 + b2) / 2} L${a2},${b2}" stroke="#2a1808" stroke-width="5" fill="none" stroke-linejoin="round" opacity=".7"/>`).join('');
  // abdomen with fuzzy bands
  o += `<ellipse cx="-46" cy="6" rx="44" ry="30" transform="rotate(12,-46,6)" fill="url(#mbA)"/><g clip-path="url(#mbAc)">` + [-70, -50, -30].map(k => `<rect x="${k}" y="-30" width="11" height="70" fill="#1a0e04" opacity=".88" transform="rotate(20,${k},0)"/>`).join('');
  for (let i = 0; i < 160; i++) { const px = -90 + r() * 90, py = -24 + r() * 60; o += `<line x1="${px}" y1="${py}" x2="${px - 3 + r() * 2}" y2="${py - 4 - r() * 3}" stroke="${r() > .5 ? '#ffe090' : '#3a2008'}" stroke-width=".9" opacity=".6"/>`; }
  o += `</g><path d="M-88,10 l-10,4" stroke="#1a0e04" stroke-width="4" stroke-linecap="round"/>`;
  // thorax: dense fuzz
  o += `<circle cx="0" cy="-4" r="28" fill="url(#mbT)"/>`;
  for (let i = 0; i < 220; i++) { const a2 = r() * 6.283, d = 20 + r() * 12; o += `<line x1="${Math.cos(a2) * (d - 6)}" y1="${-4 + Math.sin(a2) * (d - 6)}" x2="${Math.cos(a2) * d}" y2="${-4 + Math.sin(a2) * d}" stroke="${r() > .3 ? '#f0c878' : '#6a4410'}" stroke-width="1.1" opacity=".75"/>`; }
  // pollen grains clinging to the fuzz
  for (let i = 0; i < 40; i++) { const a2 = r() * 6.283, d = r() * 30; o += `<circle cx="${Math.cos(a2) * d}" cy="${-4 + Math.sin(a2) * d}" r="${1 + r() * 1.4}" fill="#ffe14a"/>`; }
  // wings with veins (flutter)
  o += `<g transform="translate(-4,-26)"><g transform="rotate(-30) scale(1,${wf})"><path d="M0,0 C20,-50 90,-66 110,-40 C120,-22 70,-4 0,0Z" fill="url(#mbW)" stroke="#fff" stroke-opacity=".6" stroke-width="1.2"/>` +
    `<path d="M4,-2 C30,-24 70,-38 104,-40 M10,-4 C40,-16 70,-20 96,-18 M30,-14 L46,-44 M56,-24 L70,-52" stroke="#3a3040" stroke-width=".9" fill="none" opacity=".55"/></g>` +
    `<g transform="rotate(-8) scale(1,${wf})"><path d="M0,0 C14,-30 64,-40 78,-22 C84,-10 50,0 0,0Z" fill="url(#mbW)" stroke="#fff" stroke-opacity=".5" stroke-width="1"/><path d="M4,-2 C24,-14 50,-22 74,-20" stroke="#3a3040" stroke-width=".8" fill="none" opacity=".5"/></g></g>`;
  // head with compound eye
  o += `<ellipse cx="34" cy="2" rx="19" ry="22" fill="#2a1a0a"/><ellipse cx="38" cy="-2" rx="11" ry="16" fill="url(#mbE)"/>`;
  for (let i = 0; i < 30; i++) { const ex = 32 + r() * 12, ey = -14 + r() * 24; o += `<circle cx="${ex}" cy="${ey}" r=".9" fill="#7a6a5a" opacity=".55"/>`; }
  o += `<ellipse cx="35" cy="-9" rx="4" ry="6" fill="#fff" opacity=".55"/><path d="M44,-16 q14,-24 26,-30 q6,-2 8,2 M42,-18 q8,-26 18,-34" stroke="#1a0e04" stroke-width="2.4" fill="none"/>` +
    `<path d="M48,14 q10,10 6,22" stroke="#3a2008" stroke-width="3" fill="none"/>`;
  // near legs with pollen basket
  o += [[-10, 22, -26, 62], [10, 22, 16, 64], [24, 18, 44, 56]].map(([a1, b1, a2, b2]) => `<path d="M${a1},${b1} L${(a1 + a2) / 2 - 8},${(b1 + b2) / 2} L${a2},${b2}" stroke="#2a1808" stroke-width="6" fill="none" stroke-linejoin="round"/>`).join('') +
    `<ellipse cx="-20" cy="46" rx="9" ry="7" fill="#ffb21a"/><ellipse cx="-22" cy="44" rx="4" ry="3" fill="#ffe08a"/>`;
  return o + `</g>`;
}
function bigFlower(x, y, s, t, petal, tip, wilt = 0, seed = 1) {
  const r = RS(seed + 40), id = 'bf' + seed; let o = `<defs><radialGradient id="${id}" cx="0" cy=".5" r="1"><stop offset="0" stop-color="${mix(petal, '#8a6a3a', wilt)}"/><stop offset="1" stop-color="${mix(tip, '#5a3a1a', wilt)}"/></radialGradient></defs>`;
  o += `<path d="M${x},${y + 900 * s} C${x + 20 * s},${y + 500 * s} ${x - 10 * s},${y + 200 * s} ${x},${y}" stroke="${mix('#3a6a2a', '#6a5a30', wilt)}" stroke-width="${14 * s}" fill="none"/>`;
  o += `<g transform="translate(${x},${y}) scale(${s})">`;
  for (let i = 0; i < 16; i++) { const a = i / 16 * 360 + Math.sin(t + i) * 1.5, droop = wilt * (30 + r() * 30);
    o += `<g transform="rotate(${a}) translate(0,${droop * .6}) rotate(${droop * (i % 2 ? 1 : -1) * .3})"><path d="M14,0 C40,-20 110,-22 130,0 C110,22 40,20 14,0Z" fill="url(#${id})"/>` +
      `<path d="M20,0 L122,0 M40,-6 L110,-4 M40,6 L110,4" stroke="${mix(tip, '#3a2a10', .4)}" stroke-width="1" opacity=".35"/></g>`; }
  o += `<circle r="44" fill="${mix('#6a3a08', '#3a2a14', wilt)}"/>`;
  for (let i = 0; i < 160; i++) { const rr = Math.sqrt(i) * 3.4, a = i * 2.39996; o += `<circle cx="${Math.cos(a) * rr}" cy="${Math.sin(a) * rr}" r="${1.6 + rr * .03}" fill="${mix(i % 3 ? '#e8a020' : '#ffd24a', '#6a5a3a', wilt)}"/>`; }
  return o + `</g>`;
}
// L0: macro shot: a pollen-covered bee on a sunflower, gone in a puff of light on "not a single insect"
function sceneMacro(t) {
  const vt = W(0, 6)[1], gone = ramp(t, vt, vt + .5), push = ease(ramp(t, 0, vt));
  let s = `<defs><radialGradient id="mcB" cx=".65" cy=".3" r="1"><stop offset="0" stop-color="#fff2c0"/><stop offset=".35" stop-color="#a8c868"/><stop offset="1" stop-color="#2a4a1a"/></radialGradient></defs><rect width="720" height="1280" fill="url(#mcB)"/>`;
  s += bokeh(t, ['#fff6c8', '#d8f090', '#ffd890', '#ffffff'], 40, 77, 1.4);
  s += `<g opacity=".8" filter="url(#soft)">${bigFlower(120, 260, .6, t, '#f8d040', '#e09010', 0, 7)}${bigFlower(640, 360, .45, t, '#f070a0', '#b03060', 0, 8)}</g>`;
  const z = 1 + .08 * push;
  s += `<g transform="translate(360,760) scale(${z}) translate(-360,-760)">` + bigFlower(360, 820, 1.5, t, '#ffd84a', '#f0a010', 0, 1) + macroBee(360 + Math.sin(t * 2) * 3, 700, 2.6, t, 1 - gone) + `</g>`;
  if (gone > 0) { const r = RS(12); let m = ''; for (let i = 0; i < 120; i++) { const a = r() * 6.28, d = gone * (30 + r() * 260); m += `<circle cx="${360 + Math.cos(a) * d}" cy="${700 + Math.sin(a) * d * .8 - gone * 80}" r="${1.5 + r() * 3}" fill="#fff6c8" opacity="${(1 - gone) * .95}"/>`; } s += `<g filter="url(#blur1)">${m}</g>`; }
  s += `<g opacity=".7" filter="url(#haze)">${bigFlower(80, 1180, .9, t, '#f8e060', '#e8a020', 0, 9)}</g>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L1: macro: a mosquito on skin, then gone
function mosquito(x, y, s, t, a = 1) {
  const leg = (x1, y1, x2, y2, x3, y3) => `<path d="M${x1},${y1} L${x2},${y2} L${x3},${y3}" stroke="#2a2420" stroke-width="2.2" fill="none" stroke-linejoin="round"/>` +
    [.3, .55, .8].map(u => `<circle cx="${lerp(x2, x3, u)}" cy="${lerp(y2, y3, u)}" r="1.8" fill="#f4f0e8"/>`).join('');
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${a}"><ellipse cx="0" cy="30" rx="70" ry="10" fill="#4a2a1a" opacity=".2" filter="url(#blur2)"/>` +
    leg(-10, 0, -60, -30, -110, 30) + leg(0, 2, -20, -40, -40, 32) + leg(8, 2, 40, -36, 90, 30) +
    `<g opacity=".5"><path d="M-4,-8 C-30,-40 -90,-50 -110,-36 C-90,-20 -40,-14 -4,-8Z" fill="#e8eef4" stroke="#fff" stroke-width="1"/><path d="M-10,-12 L-100,-38 M-20,-16 L-80,-26" stroke="#6a6a70" stroke-width=".8"/></g>` +
    `<path d="M-6,0 C-30,-6 -70,-2 -96,10 C-70,14 -30,10 -6,4Z" fill="#3a3028"/>` + [-80, -64, -48, -32].map(k => `<path d="M${k},${-2 + (k + 80) * .05} l0,10" stroke="#f4f0e8" stroke-width="3" opacity=".85"/>`).join('') +
    `<ellipse cx="6" cy="-2" rx="16" ry="10" fill="#2a2420"/><path d="M0,-10 l12,0" stroke="#f4f0e8" stroke-width="2"/><circle cx="24" cy="-2" r="8" fill="#1a1614"/><circle cx="26" cy="-4" r="2.4" fill="#fff" opacity=".6"/>` +
    `<path d="M30,0 L78,26" stroke="#1a1614" stroke-width="2.4"/><path d="M28,-6 q10,-20 24,-26 M28,-4 q16,-14 30,-14" stroke="#3a3028" stroke-width="1.4" fill="none"/>` +
    `<ellipse cx="-60" cy="4" rx="${8 + Math.sin(t * 3) * .5}" ry="5" fill="#8a1a1a" opacity=".55"/></g>`;
}
function sceneSkin(t) {
  const st = S0(1) - .2, gone = ease(ramp(t, WS(1, 3), WS(1, 3) + .5)), dream = ease(ramp(t, WS(1, 4), WS(1, 4) + 1));
  let s = `<defs><radialGradient id="skG" cx=".5" cy=".4" r=".9"><stop offset="0" stop-color="#e8b898"/><stop offset=".7" stop-color="#c88a6a"/><stop offset="1" stop-color="#7a4a34"/></radialGradient>` +
    `<filter id="poreT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .4  0 0 0 0 .2  0 0 0 0 .14  0 0 0 -1.4 .7"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<filter id="creaseT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".01 .06" numOctaves="3" seed="8"/><feColorMatrix values="0 0 0 0 .5  0 0 0 0 .25  0 0 0 0 .18  0 0 0 -1.8 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter></defs>`;
  s += `<rect width="720" height="1280" fill="url(#skG)"/><rect width="720" height="1280" fill="#fff" filter="url(#poreT)" opacity=".5"/><rect width="720" height="1280" fill="#fff" filter="url(#creaseT)" opacity=".4"/>`;
  const r = RS(21); for (let i = 0; i < 70; i++) { const hx = r() * 720, hy = r() * 1280; s += `<path d="M${hx},${hy} q${6 + r() * 8},${-4} ${14 + r() * 14},${2}" stroke="#5a3424" stroke-width="1.1" fill="none" opacity=".45"/>`; }
  s += `<ellipse cx="360" cy="660" rx="60" ry="40" fill="#e07a6a" opacity=".15" filter="url(#soft)"/>`;
  s += mosquito(330, 640, 2.6, t, 1 - gone);
  if (gone > 0 && gone < 1) { const rr = RS(31); let m = ''; for (let i = 0; i < 50; i++) { const a = rr() * 6.28, d = gone * (20 + rr() * 160); m += `<circle cx="${330 + Math.cos(a) * d}" cy="${640 + Math.sin(a) * d}" r="${1 + rr() * 2}" fill="#fff" opacity="${1 - gone}"/>`; } s += m; }
  s += `<rect width="720" height="1280" fill="#fff6e8" opacity="${.25 * dream}" filter="url(#haze)"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// L2: the dream turns into a nightmare: the same field drains of colour and wilts as months pass
function sceneWilt(t) {
  const st = S0(2) - .2, w = ease(ramp(t, WS(2, 5) - .3, S0(3) - .2)), sat = 1 - .85 * w;
  let s = `<defs><radialGradient id="mcB2" cx=".65" cy=".3" r="1"><stop offset="0" stop-color="${mix('#fff2c0', '#b8b0a0', w)}"/><stop offset=".35" stop-color="${mix('#a8c868', '#8a8460', w)}"/><stop offset="1" stop-color="${mix('#2a4a1a', '#2a2618', w)}"/></radialGradient>` +
    `<filter id="desat"><feColorMatrix type="saturate" values="${sat}"/></filter></defs>`;
  s += `<g filter="url(#desat)"><rect width="720" height="1280" fill="url(#mcB2)"/>` + bokeh(t, ['#fff6c8', '#d8f090', '#ffd890'], 30, 77, 1.2 * (1 - w * .6));
  s += bigFlower(360, 820, 1.5, t, '#ffd84a', '#f0a010', w, 1) + `<g opacity=".8" filter="url(#soft)">${bigFlower(120, 300, .6, t, '#f8d040', '#e09010', w, 7)}${bigFlower(640, 380, .45, t, '#f070a0', '#b03060', w, 8)}</g>`;
  for (let i = 0; i < 18; i++) { const rr = RS(i + 90), x = rr() * 720, y = pmod(rr() * 1280 + (t - st) * 90 * w, 1280); s += `<ellipse cx="${x}" cy="${y}" rx="10" ry="5" transform="rotate(${t * 60 + i * 20},${x},${y})" fill="#8a6a3a" opacity="${w * .8}"/>`; }
  s += `</g>`;
  F.ov = ''; F.earth = null; F.moon = null; F.months = Math.min(6, Math.floor(w * 6.99));
  return s;
}
// realistic frog (replaces the cartoon one)
function frog(x, y, s, t, hungry) {
  const th = 1 + Math.sin(t * 5) * .08, sag = hungry * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><defs><radialGradient id="frG" cx=".4" cy=".25" r=".85"><stop offset="0" stop-color="${mix('#9ad060', '#a8a070', hungry)}"/><stop offset=".55" stop-color="${mix('#4a8a2a', '#6a6a3a', hungry)}"/><stop offset="1" stop-color="#14280a"/></radialGradient>` +
    `<radialGradient id="frI" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#f0d060"/><stop offset=".7" stop-color="#c88a10"/><stop offset="1" stop-color="#3a2400"/></radialGradient>` +
    `<filter id="frT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".12" numOctaves="3" seed="5"/><feColorMatrix values="0 0 0 0 .05  0 0 0 0 .15  0 0 0 0 .02  0 0 0 -1.6 1"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
    `<clipPath id="frC"><path d="M-62,0 C-72,-32 -52,-${60 - sag} -10,-${64 - sag} C32,-${68 - sag} 64,-42 60,-8 C58,4 -56,6 -62,0Z"/></clipPath></defs>` +
    `<ellipse cx="0" cy="8" rx="78" ry="14" fill="#000" opacity=".3" filter="url(#blur2)"/>` +
    `<path d="M-54,-2 q-34,12 -42,6 q12,-10 30,-12" stroke="#3a6a22" stroke-width="11" fill="none" stroke-linecap="round"/>` +
    `<path d="M-62,0 C-72,-32 -52,-${60 - sag} -10,-${64 - sag} C32,-${68 - sag} 64,-42 60,-8 C58,4 -56,6 -62,0Z" fill="url(#frG)"/>` +
    `<g clip-path="url(#frC)"><rect x="-80" y="-80" width="160" height="90" fill="#fff" filter="url(#frT)" opacity=".7"/>` +
    [[-34, -34, 9], [-12, -48, 7], [-44, -16, 8], [10, -52, 6], [26, -36, 7], [-20, -20, 6]].map(([a, b, rr]) => `<ellipse cx="${a}" cy="${b + sag}" rx="${rr}" ry="${rr * .7}" fill="#1e3a10" opacity=".7"/>`).join('') +
    `<path d="M-60,-6 C-30,-2 20,-2 58,-12" stroke="#d8e0a0" stroke-width="3" opacity=".35" fill="none"/></g>` +
    `<ellipse cx="22" cy="-10" rx="${26 * th}" ry="${12 * th}" fill="#e8e4b0" opacity=".75"/>` +
    [-1, 1].map(sd => `<circle cx="${20 + sd * 20}" cy="${-64 + sag}" r="17" fill="url(#frG)"/><circle cx="${20 + sd * 20}" cy="${-66 + sag}" r="12" fill="url(#frI)"/><ellipse cx="${20 + sd * 20}" cy="${-66 + sag}" rx="9" ry="3.6" fill="#0a0806"/>` +
      `<ellipse cx="${16 + sd * 20}" cy="${-71 + sag}" rx="4" ry="2.4" fill="#fff" opacity=".9"/><path d="M${8 + sd * 20},${-74 + sag} q12,-6 24,0" stroke="#2a4a14" stroke-width="3" fill="none"/>`).join('') +
    `<path d="M40,-2 q24,8 34,2" stroke="#3a7a2a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M30,-30 q16,${6 + sag} 30,0" stroke="#14280a" stroke-width="2" fill="none"/>` +
    `<path d="M-40,-50 C-10,-${64 - sag} 30,-${66 - sag} 50,-40" stroke="#fff" stroke-width="2.4" opacity=".35" fill="none"/></g>`;
}
