// ---------- 6: something of us remains: radio signals travelling for more than a hundred years ----------
const STARS6 = [[4.2, 'بروكسيما', 210], [8.6, 'الشِّعرى', 330], [25, 'النسر الواقع', 60], [37, 'السِّماك الرامح', 150], [65, 'الدَّبَران', 290]];
function sceneRadio(t) {
  const t0 = S0(6) - .2, T = t - t0, cx = 360, cy = 720, sc = 34, front = 340 * ease(ramp(t, WS(6, 4) - .3, S0(7) - .3));
  let o = `<defs>${XDEFS()}</defs>`;
  // the bubble of signals: a soft filled sphere with rings moving outward inside it
  if (front > 2) { o += `<circle cx="${cx}" cy="${cy}" r="${front.toFixed(1)}" fill="#f4c76b" opacity=".06"/><circle cx="${cx}" cy="${cy}" r="${front.toFixed(1)}" fill="none" stroke="#f4c76b" stroke-width="3" opacity=".75"/>`;
    for (let i = 0; i < 7; i++) { const r = pmod(T * 70 + i * 52, 364); if (r < front) o += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="none" stroke="#ffd98a" stroke-width="1.6" opacity="${(.35 * (1 - r / 364)).toFixed(2)}" stroke-dasharray="3 6"/>`; } }
  // where the Earth was: a faint smudge of debris
  { const r = RS(171); for (let i = 0; i < 40; i++) { const a = r() * 6.28, d = 4 + 12 * r(); o += `<circle cx="${(cx + Math.cos(a) * d).toFixed(1)}" cy="${(cy + Math.sin(a) * d).toFixed(1)}" r="${(.8 + r()).toFixed(1)}" fill="#c8b8a8" opacity=".7"/>`; } }
  // nearby stars, lit gold when the signals reach them (distance on a square-root scale)
  STARS6.forEach(([ly, nm, ang], i) => { const r = sc * Math.sqrt(ly), a = ang * Math.PI / 180, x = cx + Math.cos(a) * r, y = cy - Math.sin(a) * r, hit = front >= r, k = hit ? ease(clamp((front - r) / 30)) : 0;
    o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(14 + 10 * k).toFixed(1)}" fill="url(#satGl)" opacity="${(.5 + .5 * k).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3" fill="#fff"/>` +
      lbl(x, y + (y < cy ? -22 : 36), `${nm} · ${AR(String(ly).replace('.', '٫'))}`, .55 + .45 * k, hit ? '#ffe2a0' : '#aab4c4', 21); });
  const la = ease(ramp(t, WS(6, 11) - .2, WS(6, 12)));
  o += `<g opacity="${la.toFixed(2)}"><path d="M${cx},${cy} L${cx + 340},${cy}" stroke="#f4c76b" stroke-width="2" stroke-dasharray="6 5" opacity=".6"/>${lbl(360, 1150, 'نحوَ ١٠٠ سنةٍ ضوئيّة', 1, '#f4c76b', 30)}${lbl(360, 1192, '(بالسنواتِ الضوئيّة)', 1, '#8a96a8', 20)}</g>`;
  noEarth(); F.ov = o; return space(t);
}

// ---------- 7: the two Voyager probes carry golden records with the sounds of the Earth ----------
function voyager(x, y, s, rot) {
  return `<g transform="translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(2)}) scale(${s})">` +
    // booms: the magnetometer (long, thin), the power source (three drums), the science boom with the cameras
    `<path d="M20,40 L330,150" stroke="#c8ccd2" stroke-width="3"/><path d="M20,40 L330,150" stroke="#5a5e66" stroke-width="1" stroke-dasharray="4 10"/>` +
    `<path d="M-20,40 L-150,150" stroke="#9aa0a8" stroke-width="6"/>` + [0, 1, 2].map(i => `<rect x="${-150 + i * 26 - 13}" y="${150 - i * 22 - 14}" width="26" height="26" rx="5" fill="#5a5e66" transform="rotate(-40,${-150 + i * 26},${150 - i * 22})"/>`).join('') +
    `<path d="M10,50 L120,-60" stroke="#9aa0a8" stroke-width="5"/><rect x="104" y="-82" width="40" height="30" rx="4" fill="#3a3e46"/><circle cx="134" cy="-67" r="8" fill="#1a1c22"/><circle cx="114" cy="-67" r="5" fill="#1a1c22"/>` +
    // the ten-sided bus with the golden record
    `<path d="M-46,20 L46,20 L60,46 L46,72 L-46,72 L-60,46Z" fill="#6a6e76"/><path d="M-46,20 L46,20 L52,32 L-52,32Z" fill="#9aa0a8"/><path d="M-60,46 L-46,72 L-46,20Z" fill="#000" opacity=".25"/>` +
    `<circle cx="16" cy="48" r="20" fill="url(#goldR)"/><circle cx="16" cy="48" r="20" fill="none" stroke="#8a5a14" stroke-width="1.5"/>` + [6, 11, 15].map(r => `<circle cx="16" cy="48" r="${r}" fill="none" stroke="#8a5a14" stroke-width=".8" opacity=".6"/>`).join('') +
    // the big dish on top
    `<path d="M0,20 L0,4" stroke="#9aa0a8" stroke-width="6"/><ellipse cx="0" cy="-6" rx="120" ry="44" fill="url(#dishG)"/><ellipse cx="0" cy="-2" rx="100" ry="34" fill="#c8ccd2" opacity=".55"/><ellipse cx="0" cy="-6" rx="120" ry="44" fill="none" stroke="#8a929c" stroke-width="2"/>` +
    `<path d="M-60,-10 L0,-80 L60,-10 M0,-80 V-10" stroke="#c8ccd2" stroke-width="2.5" fill="none"/><circle cx="0" cy="-82" r="6" fill="#e8eaee"/></g>`;
}
function goldRecord(cx, cy, R, rot, a) {
  if (a <= 0) return ''; let g = ''; for (let i = 0; i < 26; i++) g += `<circle r="${(R * (.36 + i * .024)).toFixed(1)}" fill="none" stroke="#7a4a10" stroke-width=".9" opacity=".45"/>`;
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy})"><circle r="${R + 14}" fill="#0a0e1c" opacity=".85"/><circle r="${R + 14}" fill="none" stroke="#f4c76b" stroke-width="4"/><g transform="rotate(${rot.toFixed(1)})"><circle r="${R}" fill="url(#goldR)"/>${g}<path d="M${-R * .9},${-R * .3} A${R},${R} 0 0 1 ${-R * .2},${-R * .92}" stroke="#fff8d8" stroke-width="6" fill="none" opacity=".35"/></g><circle r="${R * .3}" fill="#c89a3a"/><circle r="${R * .3}" fill="none" stroke="#7a4a10" stroke-width="2"/><circle r="5" fill="#2a1a08"/></g>`;
}
function sceneVoyager(t) {
  const t0 = S0(7) - .2, T = t - t0, ra = ease(ramp(t, WS(7, 3) - .2, WS(7, 3) + .4));
  let o = `<defs>${XDEFS()}</defs>` + `<circle cx="600" cy="300" r="2.5" fill="#fff8e0"/><circle cx="600" cy="300" r="26" fill="url(#satGl)" opacity=".5"/>` + lbl(600, 270, 'الشمس', ease(ramp(t, t0 + .3, t0 + .8)), '#ffe0a0', 20);
  o += voyager(330 - T * 6, 760 + Math.sin(T * .7) * 6, 1.25, -8 + T * .6);
  o += goldRecord(360, 1080, 92, T * 25, ra) + lbl(360, 1236, 'الأسطوانةُ الذهبيّة: أصواتٌ وتحيّاتٌ بـ٥٥ لغة', ra, '#f4c76b', 23);
  noEarth(); F.ov = o; return space(t);
}

// ---------- 8: the debris spreads into a ring around the Sun and may strike Mars and Venus for millions of years ----------
function planetDot(x, y, r, c1, c2) { return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 2.6).toFixed(1)}" fill="${c1}" opacity=".18" filter="url(#blur5)"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${c1}"/><circle cx="${(x + r * .35).toFixed(1)}" cy="${(y + r * .3).toFixed(1)}" r="${(r * .85).toFixed(1)}" fill="${c2}" opacity=".55"/>`; }
function sceneRing(t) {
  const t0 = S0(8) - .2, T = t - t0, R = 1.6, cam = orbit(17 - T * .15, .62, T * .02, [0, -.2, 0], 30), sp = ease(ramp(t, t0, WS(8, 4))), th0 = 1.2 + T * .05;
  F.w = { set: 'space', cam, L: [0, 1, 0], sun: { pos: [0, 0, 0], r: .2, a: 1, hue: 0, g: 6, ts: 1.5 }, debris: { c: ringPt(R, th0, 0), k: .1, spread: lerp(.18, 1, sp), R, tilt: 0, th0, size: .011, hot: 0, n: 1 }, dust: { R: R * .93, a: .45 * sp, tilt: 0 } }; F.earth = F.moon = F.sun = null;
  const orb = (Rr, col, op) => { let d = ''; for (let i = 0; i <= 96; i++) { const [x, y] = proj3(cam, ringPt(Rr, i / 96 * 6.2832, 0)); d += (i ? ' L' : 'M') + x.toFixed(1) + ',' + y.toFixed(1); } return `<path d="${d}" stroke="${col}" stroke-width="1.6" fill="none" opacity="${op}" stroke-dasharray="5 6"/>`; };
  const [vx, vy] = proj3(cam, ringPt(1.15, 2.6 + T * .3, 0)), [mx, my] = proj3(cam, ringPt(2.43, 4.9 + T * .1, 0));
  let o = `<defs>${XDEFS()}</defs>` + orb(1.15, '#e8c88a', .45) + orb(2.43, '#e87a5a', .45) + planetDot(vx, vy, 8, '#f0d8a0', '#b8904a') + planetDot(mx, my, 7, '#e0704a', '#8a3a22');
  const la = ease(ramp(t, WS(8, 6), WS(8, 7)));
  o += lbl(vx, vy - 22, 'الزهرة', la, '#f0d8a0', 22) + lbl(mx, my + 34, 'المريخ', la, '#ff9a7a', 22);
  // stray rocks strike Mars and Venus
  [[mx, my, WS(8, 8)], [vx, vy, WS(8, 9)], [mx, my, WS(8, 10) + .3]].forEach(([x, y, ti]) => { const k = ramp(t, ti, ti + .7); if (k > 0 && k < 1) o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(10 + 40 * k).toFixed(1)}" fill="url(#flashG)" opacity="${(1 - k).toFixed(2)}"/>`;
    const k0 = ramp(t, ti - .5, ti); if (k0 > 0 && k0 < 1) o += `<circle cx="${(x - 60 * (1 - k0)).toFixed(1)}" cy="${(y - 40 * (1 - k0)).toFixed(1)}" r="2.5" fill="#fff2d0"/><path d="M${(x - 60 * (1 - k0)).toFixed(1)},${(y - 40 * (1 - k0)).toFixed(1)} l-24,-16" stroke="#ffd9a0" stroke-width="2" opacity=".6"/>`; });
  o += lbl(360, 1236, 'ليس بالمقياسِ الحقيقيّ', ease(ramp(t, t0 + .3, t0 + .8)), '#9aa6b8', 20);
  F.ov = o; return space(t);
}

// ---------- 9: the twist: the Earth may really be destroyed one day: in about five billion years the Sun swells into a red giant ----------
function sceneGiant(t) {
  const t0 = S0(9) - .2, T = t - t0, g = ease(ramp(t, WS(9, 11), WS(9, 15) + .6)), eat = ease(ramp(t, WS(9, 15) - .1, WS(9, 15) + 1));
  const R = lerp(60, 980, Math.pow(g, 1.6)), cx = 360, cy = lerp(500, 120, g);
  let s = space(t);
  // the Sun today, then swelling and reddening; granulation on its face, a glowing limb
  const col = g < .15 ? 'url(#sunW)' : 'url(#rgG)';
  s += `<defs>${XDEFS()}</defs><circle cx="${cx}" cy="${cy.toFixed(1)}" r="${(R * 1.5).toFixed(1)}" fill="url(#rgH)" opacity="${(.3 + .6 * g).toFixed(2)}"/>` +
    `<g opacity="${(1 - clamp(g * 6)).toFixed(2)}">${sun3(cx, cy, 1)}</g>` +
    `<g opacity="${clamp(g * 6).toFixed(2)}"><circle cx="${cx}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#rgG)"/><circle cx="${cx}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="#ff6a2a" filter="url(#granF)" opacity=".55"/></g>`;
  // the Earth, small and close to us, scorched and then swallowed
  const G = gAt(t, 360, 1010, { d: 30, el: .1, lon: 10 - T * 4, clouds: lerp(.45, 0, g), lights: 0, off: .1, up: 1.6, heat: .9 * g });
  F.w.disc.sunI = 1 + .6 * g;
  if (eat > 0) { F.w.disc.sunI = (1 + .6 * g) * (1 - eat); }
  const ea = 1 - eat;
  s += `<circle cx="360" cy="1010" r="${(160 * eat).toFixed(1)}" fill="url(#flashG)" opacity="${(eat * (1 - eat) * 2.5).toFixed(2)}"/>`;
  const la = ease(ramp(t, WS(9, 7) - .2, WS(9, 7) + .3));
  F.ov = `<defs>${XDEFS()}</defs><g opacity="${(la * ea).toFixed(2)}">${lbl(360, 1172, 'الأرض', 1, '#cfe6ff', 24)}</g>` + (eat > 0 ? `<g opacity="${eat.toFixed(2)}"><circle cx="${cx}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="url(#rgG)"/><circle cx="${cx}" cy="${cy.toFixed(1)}" r="${R.toFixed(1)}" fill="#ff6a2a" filter="url(#granF)" opacity=".55"/></g>` : '');
  if (ea < .02) F.w.disc = null;
  return s;
}
// 10: ask and subscribe
function sceneEarth(t) {
  const q = ease(ramp(t, WS(10, 0) - .2, WS(10, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  gW(t, { d: 9.8, el: .3, tg: [0, .64, 0], lon: 30 - (t - S0(10)) * 4, clouds: .4, lights: .3 });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(10, 10) - .3, WS(10, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneEnergy }, { s: S0(2) - .2, f: sceneMoonHit }, { s: S0(3) - .2, f: sceneOrbit }, { s: S0(4) - .2, f: sceneLife }, { s: S0(5) - .2, f: sceneMars },
  { s: S0(6) - .2, f: sceneRadio }, { s: S0(7) - .2, f: sceneVoyager }, { s: S0(8) - .2, f: sceneRing }, { s: S0(9) - .2, f: sceneGiant }, { s: S0(10) - .2, f: sceneEarth }];
const NOKB = new Set([sceneHook, sceneEnergy, sceneMoonHit, sceneOrbit, sceneRadio, sceneVoyager, sceneRing, sceneGiant]);
const XF = .5;
const TLI = [['الانفجار', 0], ['القمر', S0(2)], ['المريخ', S0(5)], ['الحطام', S0(8)]];
const LIST_ON = new Set([sceneMars]);
const CHIPS = [
  ['c0', 'تتشقّقُ الأرض', 360, 330, 'red big', WS(0, 8), WS(0, 12) - .2],
  ['c0b', 'سحابةٌ من الصخور', 360, 330, 'big', WS(0, 12), S0(1) - .3],
  ['c1', 'طاقةٌ هائلة', 360, 330, 'big', WS(1, 3), WS(1, 5)],
  ['c1b', 'أسبوعٌ من طاقةِ الشمس', 360, 330, 'big', WS(1, 5) + .1, S0(2) - .3],
  ['c2', 'صخورٌ بسرعةٍ مرعبة', 360, 330, 'red big', WS(2, 1), WS(2, 4) - .1],
  ['c2b', 'تضربُ القمر', 360, 330, 'red big', WS(2, 4), S0(3) - .3],
  ['c3', 'القمرُ لا يسقط', 360, 330, 'big', WS(3, 1), WS(3, 4)],
  ['c3b', 'كوكبٌ صغيرٌ حولَ الشمس', 360, 330, 'big', WS(3, 4) + .1, S0(4) - .3],
  ['c4', 'الحياةُ الوحيدةُ المعروفة', 360, 330, 'big', WS(4, 3), S0(5) - .3],
  ['c5', 'بعدَ ٣ إلى ٢٢ دقيقة', 360, 330, 'big', WS(5, 0), WS(5, 7) - .1],
  ['c5b', 'النجمُ الأزرق يختفي', 360, 330, 'red big', WS(5, 11), S0(6) - .3],
  ['c6', 'إشاراتُ الراديو', 360, 330, 'big', WS(6, 4), WS(6, 9)],
  ['c6b', 'منذُ أكثرَ من ١٠٠ عام', 360, 330, 'big', WS(6, 9) + .1, S0(7) - .3],
  ['c7', 'فوياجر ١ و٢ (١٩٧٧)', 360, 330, 'big', WS(7, 0) + .1, WS(7, 8) - .1],
  ['c7b', 'رسالةٌ من عالمٍ زال', 360, 330, 'big', WS(7, 8), S0(8) - .3],
  ['c8', 'حلقةٌ حولَ الشمس', 360, 330, 'big', WS(8, 2), WS(8, 6)],
  ['c8b', 'ضرباتٌ لملايينِ السنين', 360, 330, 'red big', WS(8, 7), S0(9) - .3],
  ['c9', 'والمفاجأة؟', 360, 330, 'big', S0(9), WS(9, 7) - .1],
  ['c9b', 'بعدَ نحوِ ٥ مليارات سنة', 360, 330, 'big', WS(9, 7), WS(9, 12) - .1],
  ['c9c', 'عملاقٌ أحمر', 360, 330, 'red big', WS(9, 12), S0(10) - .3],
  ['c10', '@MadhaLawLab', 360, 1200, 'dark', WS(10, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:250px"><div class="hd">الأرضُ تتدمّر</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
