// ===================== Pharaohs long video core (from #32) (1280x720 page): camera, space, wide city, widgets, UI =====================
// World scenes are drawn in the Shorts' units (pavement at y=1000) and shown through camG(inner, k, wx, wy): k=1.78 shows a 720-wide window.
const CS = i => CHT[i].start - 2.0;
const camG = (inner, k, wx, wy) => zoomG(inner, k, wx, wy, 640, 360);
const mv3 = (t, a, b, A, B) => { const q = ease(ramp(t, a, b)); return A.map((v, i) => lerp(v, B[i], q)); };
const camMv = (inner, t, a, b, A, B) => { const c = mv3(t, a, b, A, B); return camG(inner, c[0], c[1], c[2]); };
function proj3w(c, p) { const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]], dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2], nrm = a => { const l = Math.hypot(...a); return a.map(x => x / l); }, crs = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const f = nrm(sub(c.look, c.pos)), r = nrm(crs(f, [0, 1, 0])), u = crs(r, f), d = sub(p, c.pos), z = dot(d, f), fp = 360 / Math.tan(c.fov * Math.PI / 360);
  return [640 + dot(d, r) / z * fp, 360 - dot(d, u) / z * fp, fp / z]; }
const noW = () => { F.w = null; F.earth = null; F.moon = null; F.sun = null; F.ov = ''; };
const fmtT = v => v < 0 ? `${AR(Math.abs(Math.round(v)))}° تحت الصفر` : `${AR(Math.round(v))}°`;
// dark text (on papyrus, maps, stone) gets no black outline, which made it look smudged
const darkCol = c => { const m = /^#([0-9a-f]{6})$/i.exec(c); if (!m) return false; const v = parseInt(m[1], 16); return (.3 * (v >> 16) + .59 * (v >> 8 & 255) + .11 * (v & 255)) / 255 < .42; };
const txt = (x, y, tx, a = 1, col = '#fff', fs = 26, anc = 'middle') => darkCol(col) ? `<text x="${x}" y="${y}" text-anchor="${anc}" direction="rtl" font-family="Noto Naskh Arabic" font-weight="700" font-size="${fs}" fill="${col}" opacity="${a}">${tx}</text>` : lbl(x, y, tx, a, col, fs, anc);
// ---------- space behind the three.js layer: the Shorts' navy gradient and stars, landscape ----------
const STW = (() => { const r = RS(171); return Array.from({ length: 340 }, () => [r() * 1280, r() * 720, Math.pow(r(), 3) * 1.7 + .45, r() * 6, r()]); })();
const starsW = (t, a = 1, tw = 1, ymax = 720) => STW.map(s => s[1] > ymax ? '' : `<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="${s[2].toFixed(2)}" fill="${s[4] < .14 ? '#ffe2c0' : s[4] > .86 ? '#cfe0ff' : '#fff'}" opacity="${(a * (ymax < 720 ? clamp((ymax - s[1]) / 140) : 1) * (.62 + .33 * tw * Math.sin(t * 1.4 + s[3]))).toFixed(2)}"/>`).join('');
const MWS = (() => { const r = RS(77); return Array.from({ length: 620 }, () => { const u = r() * 2 - 1, g = (r() + r() + r() - 1.5) * .7; return [u * 760, g * 74 * (1 - .35 * u * u), Math.pow(r(), 4) * 1.5 + .3, r()]; }); })();
function milkyP(a, cx = 640, cy = 300, ang = -24, sc = 1) {
  if (a <= 0) return '';
  return `<g opacity="${a.toFixed(2)}" transform="translate(${cx},${cy}) rotate(${ang}) scale(${sc})"><defs><radialGradient id="mwG"><stop offset="0" stop-color="#dfe6ff" stop-opacity=".5"/><stop offset=".5" stop-color="#9fb0e8" stop-opacity=".22"/><stop offset="1" stop-color="#8090d0" stop-opacity="0"/></radialGradient>` +
    `<filter id="mwF" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency=".03 .1" numOctaves="5" seed="14"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .88  0 0 0 0 1  0 0 0 2.6 -1.3"/><feComposite in2="SourceGraphic" operator="in"/><feGaussianBlur stdDeviation="1.2"/></filter>` +
    `<filter id="mwD" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency=".014 .05" numOctaves="4" seed="31"/><feColorMatrix values="0 0 0 0 .02  0 0 0 0 .02  0 0 0 0 .06  0 0 0 3.4 -1.7"/><feComposite in2="SourceGraphic" operator="in"/><feGaussianBlur stdDeviation="3"/></filter></defs>` +
    `<ellipse rx="820" ry="120" fill="url(#mwG)" opacity=".7"/><ellipse rx="800" ry="84" fill="#fff" filter="url(#mwF)" opacity=".26"/><ellipse cx="40" rx="260" ry="62" fill="#ffe8c8" opacity=".16" filter="url(#haze)"/><ellipse rx="700" ry="30" fill="#fff" filter="url(#mwD)" opacity=".6"/>` +
    MWS.map(s => `<circle cx="${s[0].toFixed(1)}" cy="${s[1].toFixed(1)}" r="${s[2].toFixed(2)}" fill="${s[3] < .2 ? '#ffe2c0' : '#fff'}" opacity="${(.35 + .5 * s[3]).toFixed(2)}"/>`).join('') + `</g>`;
}
function spaceW(t, o = {}) {
  return `<defs><linearGradient id="spw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${o.top || '#070a1f'}"/><stop offset="1" stop-color="${o.bot || '#0b0f2b'}"/></linearGradient><radialGradient id="nbw"><stop offset="0" stop-color="#4b2fa8" stop-opacity=".2"/><stop offset="1" stop-color="#4b2fa8" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="1280" height="720" fill="url(#spw)"/><ellipse cx="1010" cy="170" rx="460" ry="330" fill="url(#nbw)"/><ellipse cx="180" cy="600" rx="380" ry="260" fill="url(#nbw)" opacity=".6"/>` + milkyP(o.mw || 0, o.mwx ?? 640, o.mwy ?? 300, o.mwa ?? -24) + starsW(t, o.st ?? 1, o.tw ?? 1);
}
// three.js globe with the house look: g3({d, el, az, tg, spin, sunI, lights, ice, amb, clouds, atm, L})
function g3(t, o = {}) {
  const az = (o.az ?? .25) + t * (o.daz ?? .012), g = o.tg || [0, 0, 0], cam = orbit(o.d || 7, o.el ?? .22, az, [g[0] * Math.cos(az), g[1], -g[0] * Math.sin(az)], o.fov || 30);
  F.w = { set: 'space', cam, L: o.L || sunFor(az, o.off ?? -.75, o.up ?? .35), disc: { m: 1, spin: (o.spin ?? 3.6) + t * (o.dspin ?? .05), clouds: o.clouds ?? .5, sunI: o.sunI ?? 1, lights: o.lights ?? .5, ice: o.ice || 0, amb: o.amb || 0, atm: o.atm ?? 1 } };
  return cam;
}
// ---------- UI: chapter cards (1..8), the day list, the chapter tag, chips ----------
const TLBL = ['الفجر', 'النيل', 'الهرم', 'الطبيب', 'السوق', 'الكاتب', 'المساء', 'السرّ'];
const CHP = [], chip = (tx, x, y, cls, a, b) => { CHP.push(['k' + CHP.length, tx, x, y, cls, a, b]); };
function uiInit() {
  $('ui').innerHTML = `<div class="list" id="tl"><div class="hd">يومُك في مصر</div><div class="rail"></div><div class="fill" id="tlf"></div>` + TLBL.map((x, i) => { const y = 66 + i * 46; return `<div class="it" id="tli${i}" style="top:${y}px">${x}</div><div class="dot" id="tld${i}" style="top:${y}px"></div>`; }).join('') + `</div>` +
    CHP.map(c => `<div class="chip ${c[4]}" id="${c[0]}" style="${c[1][0] === '@' ? 'direction:ltr;' : ''}left:${c[2]}px;top:${c[3]}px">${c[1]}</div>`).join('');
}
const PV0 = () => WS(3, 0), PV1 = () => S0(4) + 1.2;
function renderUI(t) {
  let c = 0; CHT.forEach((x, i) => { if (t >= x.start - 2.15) c = i; });
  const st = CHT[c].start, a = st - 2.15, isCh = c >= 1, card = isCh ? ease(ramp(t, a + .1, a + .5)) * (1 - ease(ramp(t, st + .5, st + 1.1))) : 0, nx = CHT[c + 1] ? CHT[c + 1].start - 2.15 : TOTAL;
  $('dim').style.opacity = card * .5; const T = $('chT'); T.style.opacity = card; T.style.transform = `translateY(${(1 - ease(ramp(t, a + .1, a + .6))) * 18}px)`;
  if (isCh) { T.querySelector('.n').textContent = c <= 7 ? `الفصل ${AR(c)} من ٧` : 'الخاتمة'; T.querySelector('.t').textContent = CHT[c].title; T.querySelector('.ln').style.width = (ease(ramp(t, a + .3, a + 1.1)) * 320) + 'px'; }
  const prev = c === 0 ? ease(ramp(t, PV0(), PV0() + .5)) * (1 - ease(ramp(t, PV1(), PV1() + .5))) : 0;
  $('tl').style.opacity = Math.max(prev, isCh ? ease(ramp(t, a + .3, a + .7)) * (1 - ease(ramp(t, st + 4.6, st + 5.3))) : 0);
  const act = c === 0 ? Math.floor(clamp(ramp(t, PV0(), S0(4))) * 7.99) : c - 1, shown = c > 0 || t >= PV0();
  $('tlf').style.height = (act * 46) + 'px';
  TLBL.forEach((x, k) => { const o = shown && k <= act, cur = k === act && shown; $('tli' + k).style.color = cur ? '#fff' : o ? 'rgba(244,199,107,.9)' : 'rgba(255,255,255,.45)'; $('tld' + k).style.background = o ? '#f4c76b' : 'rgba(255,255,255,.35)'; });
  const tg = $('chTag'); tg.style.opacity = isCh ? ease(ramp(t, st + 4.9, st + 5.5)) * (1 - ease(ramp(t, nx - .2, nx + .2))) : 0; if (isCh) tg.textContent = CHT[c].title;
  CHP.forEach(k => { $(k[0]).style.opacity = ease(ramp(t, k[5], k[5] + .3)) * (1 - ease(ramp(t, k[6] - .3, k[6]))); });
}
