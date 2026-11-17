// ---------- 9: from Mars, a second, red sun in the sky ----------
function sceneMars2(t) {
  const t0 = S0(9) - .2, T = t - t0, HZ = 830, ra = ease(ramp(t, WS(9, 4) - .4, WS(9, 5) + .2));
  let s = `<defs>${STDEFS()}<linearGradient id="mSky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a30"/><stop offset=".45" stop-color="#8a6250"/><stop offset=".8" stop-color="#c49470"/><stop offset="1" stop-color="#dcb08a"/></linearGradient>` +
    `<radialGradient id="mSunB"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".12" stop-color="#e8f0ff" stop-opacity=".6"/><stop offset=".4" stop-color="#8ab0e0" stop-opacity=".22"/><stop offset="1" stop-color="#6a90c8" stop-opacity="0"/></radialGradient></defs>`;
  s += `<rect x="-20" y="-20" width="760" height="${HZ + 30}" fill="url(#mSky2)"/>`;
  // the Sun: smaller from Mars, with the bluish glow Mars has around it
  const sx = 170, sy = 600; s += `<circle cx="${sx}" cy="${sy}" r="190" fill="url(#mSunB)"/><circle cx="${sx}" cy="${sy}" r="34" fill="#f4f8ff" opacity=".5" filter="url(#blur9)"/><circle cx="${sx}" cy="${sy}" r="14" fill="#ffffff"/>`;
  // the new red star
  const rx = 520, ry = 470, pu = 1 + .04 * Math.sin(t * 2.3);
  s += `<g opacity="${ra.toFixed(2)}"><circle cx="${rx}" cy="${ry}" r="${(150 * pu).toFixed(1)}" fill="url(#redGl)" opacity=".75"/><circle cx="${rx}" cy="${ry}" r="20" fill="#ff6a2a" opacity=".55" filter="url(#blur9)"/><circle cx="${rx}" cy="${ry}" r="9" fill="#ffc890"/></g>`;
  s += scr(`<rect x="-20" y="-20" width="760" height="${HZ + 30}" fill="#ff3a1a" opacity="${(.12 * ra).toFixed(2)}"/>`);
  s += mountainsR(HZ - 10, 120, 263, { rock: '#9a5a3c', haze: .5, hazeCol: '#c49478', az: 230, el: 22 }) + `<rect x="-20" y="${HZ - 20}" width="760" height="40" fill="#8a5038"/>`;
  s += dunes(t, { seed: 11, y0: HZ + 10, n: 5, lit: '#c47a4e', low: '#9a5634', dark: '#5a2c1a', haze: '#b08070' });
  s += `<rect x="-20" y="${HZ - 60}" width="760" height="90" fill="#c09080" opacity=".22" filter="url(#blur9)"/>`;
  // rocks and the rover, with a second, red shadow from the new star
  { const r = RS(44); for (let i = 0; i < 14; i++) { const x = r() * 720, y = 950 + r() * 260, w = 10 + (y - 900) * .12 * r();
    s += `<ellipse cx="${(x + w * .7).toFixed(1)}" cy="${(y + 2).toFixed(1)}" rx="${(w * 1.3).toFixed(1)}" ry="${(w * .25).toFixed(1)}" fill="#3a1a10" opacity=".4" filter="url(#blur2)"/><path d="M${(x - w).toFixed(1)},${y.toFixed(1)} Q${(x - w * .6).toFixed(1)},${(y - w * .9).toFixed(1)} ${x.toFixed(1)},${(y - w * .8).toFixed(1)} Q${(x + w * .8).toFixed(1)},${(y - w * .6).toFixed(1)} ${(x + w).toFixed(1)},${y.toFixed(1)}Z" fill="#6a3622"/><path d="M${(x - w * .8).toFixed(1)},${(y - w * .2).toFixed(1)} Q${(x - w * .5).toFixed(1)},${(y - w * .85).toFixed(1)} ${x.toFixed(1)},${(y - w * .78).toFixed(1)}" stroke="#c88a62" stroke-width="2" fill="none" opacity=".7"/>`; } }
  s += `<ellipse cx="420" cy="1152" rx="170" ry="14" fill="#3a1410" opacity="${(.3 * ra).toFixed(2)}" filter="url(#blur5)" transform="skewX(-30)"/>`;
  s += rover(360, 1150, .9);
  s += `<rect x="-20" y="-20" width="760" height="1320" fill="#2a1a2a" opacity=".2" style="mix-blend-mode:multiply"/>`;
  const la = ease(ramp(t, t0 + .5, t0 + 1)), lb = ease(ramp(t, WS(9, 6), WS(9, 7) + .2));
  s += lbl(sx, sy + 70, 'الشمس', la, '#e8f0ff', 26) + `<g opacity="${lb.toFixed(2)}"><path d="M${rx - 14},${ry + 16} L${rx - 50},${ry + 70}" stroke="#ffb090" stroke-width="2"/>${lbl(rx - 60, ry + 104, 'الأرضُ: نجمٌ أحمر', 1, '#ffb090', 26)}</g>`;
  noEarth(); F.ov = ''; return s;
}

// ---------- 10: the twist: the little red star lives more than 6 trillion years; our Sun only 10 billion ----------
function sceneTwist(t) {
  const t0 = S0(10) - .2, T = t - t0, az = .3, rt = [Math.cos(az), 0, -Math.sin(az)];
  const G = gW(t, { d: 21 - T * .12, el: .06, az, lon: 40 - T * 3, clouds: 0, lights: 0, off: -.75, tg: [-rt[0] * 1.05, -1.05, -rt[2] * 1.05] });
  Object.assign(F.w.disc, { star: 1, glow: .9, gs: 6.2, gc: [1, .42, .2] });
  const sp = [-rt[0] * 2.35, 0, -rt[2] * 2.35], dim = ease(ramp(t, WS(10, 12), WS(10, 13) + .4));
  F.w.sun = { pos: sp, r: lerp(1.15, .95, dim), a: lerp(1, .55, dim), hue: 0, g: 4.2, ts: 1.5 };
  const [sx, sy, sR] = fit3(G.cam, sp, F.w.sun.r);
  const a = ease(ramp(t, WS(10, 1), WS(10, 2) + .2)), g1 = ease(ramp(t, WS(10, 4), WS(10, 9) + .2)), g2 = ease(ramp(t, WS(10, 10), WS(10, 12) + .2));
  const yrs = Math.max(1, Math.round(6000 * Math.pow(g1, 2))), tr = Math.floor(yrs / 1000);
  let o = `<defs>${STDEFS()}</defs><g opacity="${a.toFixed(2)}">` + lbl(G.c0[0], G.c0[1] + G.R + 52, 'النجمُ الأحمر', 1, '#ff9a6a', 26) + lbl(sx, sy + sR + 52, 'شمسُنا', 1, '#ffd86a', 26) + panel(50, 930, 620, 260, 1);
  o += lbl(650, 980, 'عمرُ النجمِ الأحمر', 1, '#ff9a6a', 26, 'start') + lbl(70, 980, g1 > .999 ? 'أكثرُ من ٦ تريليونات' : yrs >= 1000 ? `${AR(tr)} ${tr < 3 ? 'تريليون' : 'تريليونات'} سنة` : `${ARK(yrs)} مليار سنة`, 1, '#fff', 26, 'end');
  o += `<rect x="70" y="996" width="580" height="30" rx="15" fill="#2a1410"/><rect x="${(650 - 580 * g1).toFixed(1)}" y="996" width="${(580 * g1).toFixed(1)}" height="30" rx="15" fill="#e8582a"/><rect x="${(650 - 580 * g1).toFixed(1)}" y="996" width="${(580 * g1).toFixed(1)}" height="11" rx="5" fill="#fff" opacity=".25"/>`;
  o += `<g opacity="${g2.toFixed(2)}">` + lbl(650, 1076, 'عمرُ شمسِنا', 1, '#ffd86a', 26, 'start') + lbl(70, 1076, '١٠ مليارات سنة', 1, '#fff', 26, 'end') +
    `<rect x="70" y="1092" width="580" height="30" rx="15" fill="#2a2410"/><rect x="${(650 - 7 * g2).toFixed(1)}" y="1092" width="${(7 * g2).toFixed(1)}" height="30" rx="3" fill="#ffd86a"/>` +
    lbl(360, 1164, 'أطولُ بأكثرَ من ٦٠٠ مرّة', ease(ramp(t, WS(10, 12) + .2, WS(10, 13) + .3)), '#f4c76b', 26) + `</g></g>`;
  F.ov = o; return space(t);
}

// ---------- 11: ask and subscribe ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(11, 0) - .2, WS(11, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(11)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(11, 8) - .3, WS(11, 8) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneSunCore }, { s: S0(2) - .2, f: sceneEarthCore }, { s: S0(3) - .2, f: sceneMass }, { s: S0(4) - .2, f: sceneMix }, { s: S0(5) - .2, f: sceneCloud },
  { s: S0(6) - .2, f: sceneMoonFall }, { s: S0(7) - .2, f: sceneBoil }, { s: S0(8) - .2, f: sceneIgnite }, { s: S0(9) - .2, f: sceneMars2 }, { s: S0(10) - .2, f: sceneTwist }, { s: S0(11) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneSunCore, sceneEarthCore, sceneMass, sceneMix, sceneCloud, sceneMoonFall, sceneIgnite, sceneTwist]);
const XF = .5;
const TLI = [['السحابة', S0(5)], ['سقوطُ القمر', S0(6)], ['الغليان', S0(7)], ['الاشتعال', S0(8)]];
const LIST_ON = new Set([sceneCloud, sceneMoonFall, sceneBoil, sceneIgnite]);
const CHIPS = [
  ['c1', '١٥ مليون °م', 360, 330, 'big', WS(1, 7), S0(2) - .3],
  ['c3', 'أكثرُ من ٢٥ ألفَ ضعف', 360, 330, 'big', WS(3, 10), S0(4) - .3],
  ['c4', 'حديدٌ وصخر', 360, 330, 'red big', WS(4, 7), S0(5) - .3],
  ['c5', 'سحابةُ هيدروجين', 360, 330, 'big', WS(5, 3), S0(6) - .3],
  ['c6', 'أقلُّ من ساعة', 360, 330, 'red big', WS(6, 9), S0(7) - .3],
  ['c7', 'لا حياة', 360, 330, 'red big', WS(7, 5), S0(8) - .3],
  ['c8', 'نجمٌ أحمر', 360, 330, 'big', WS(8, 6), S0(9) - .3],
  ['c9', 'شمسٌ ثانية', 360, 330, 'red big', WS(9, 5), S0(10) - .3],
  ['c10', 'والمفاجأة؟', 360, 330, 'big', S0(10), WS(10, 4) - .1],
  ['c10b', 'أكثرُ من ٦ تريليونات سنة', 360, 330, 'big', WS(10, 8), S0(11) - .3],
  ['c11', '@MadhaLawLab', 360, 1200, 'dark', WS(11, 8) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">ماذا يحدث؟</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
  TLI.map((x, i) => { const y = 64 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x[0]}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
  CHIPS.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
function renderUI(t) {
  let i = 0; SCENES.forEach((sc, j) => { if (t >= sc.s) i = j; });
  const on = j => SCENES[j] && LIST_ON.has(SCENES[j].f), nx = SCENES[i + 1] ? SCENES[i + 1].s : TOTAL;
  $('tl').style.opacity = (on(i) ? ease(ramp(t, SCENES[i].s + .2, SCENES[i].s + .6)) * (on(i + 1) ? 1 : 1 - ease(ramp(t, nx - .35, nx))) : 0) * (SCENES[i].f === sceneIgnite ? 1 - ease(ramp(t, WS(8, 6) - .7, WS(8, 6) - .3)) : 1);
  let act = 0; TLI.forEach((x, k) => { if (t >= x[1]) act = k; });
  $('tlf').style.height = (act * 46) + 'px';
  TLI.forEach((x, k) => { const o = t >= x[1], cur = k === act && o; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  CHIPS.forEach(c => { $(c[0]).style.opacity = ease(ramp(t, c[5], c[5] + .3)) * (1 - ease(ramp(t, c[6] - .3, c[6]))); });
  $('note').style.opacity = 0;
}
