// meg_a.js (#85): what if the megalodon were alive today? Built on the #84 chain (hero, swimmer, uwBg, cargo sea, glE, studio).
const m1 = v => (+v).toFixed(1);
const ML = (x, y, tx, a, col = '#fff', fs = 28) => lbl(x, y, tx, a, col, fs);
const arM = n => String(n).replace(/[0-9]/g, d => '٠١٢٣٤٥٦٧٨٩'[d]).replace('.', '٫');
const arMC = n => arM(String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '٬'));
const MGD = `<linearGradient id="mgTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2c3842"/><stop offset=".55" stop-color="#46545e"/><stop offset="1" stop-color="#5e6c74"/></linearGradient>
<linearGradient id="mgTopW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5660"/><stop offset=".55" stop-color="#6c7a84"/><stop offset="1" stop-color="#8a969c"/></linearGradient>
<linearGradient id="mgBelly" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f4f2"/><stop offset=".6" stop-color="#dfe4e4"/><stop offset="1" stop-color="#aab4b8"/></linearGradient>
<linearGradient id="mgSh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".22" stop-color="#fff" stop-opacity=".05"/><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#000" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".4"/></linearGradient>
<linearGradient id="mgFin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26323a"/><stop offset="1" stop-color="#3e4c56"/></linearGradient>
<linearGradient id="mgFinW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#44505a"/><stop offset="1" stop-color="#66747e"/></linearGradient>
<linearGradient id="mgCav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a1a1e"/><stop offset=".5" stop-color="#2a0a0e"/><stop offset="1" stop-color="#14060a"/></linearGradient>
<linearGradient id="whTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e252c"/><stop offset=".6" stop-color="#2e3842"/><stop offset="1" stop-color="#3e4a54"/></linearGradient>
<linearGradient id="whFl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8dee0"/><stop offset=".6" stop-color="#eef2f2"/><stop offset="1" stop-color="#9aa6ac"/></linearGradient>
<linearGradient id="mgWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a8cae"/><stop offset=".4" stop-color="#14608a"/><stop offset="1" stop-color="#062a48"/></linearGradient>
<linearGradient id="mgDeep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c6e96"/><stop offset=".5" stop-color="#0c3c62"/><stop offset="1" stop-color="#03142a"/></linearGradient>
<linearGradient id="mgCold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7e92"/><stop offset=".5" stop-color="#2c4a60"/><stop offset="1" stop-color="#0e1e2e"/></linearGradient>
<linearGradient id="mgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3f7fc4"/><stop offset=".6" stop-color="#8fc0e6"/><stop offset="1" stop-color="#e8eef0"/></linearGradient>
<linearGradient id="mgSeaS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa8c4"/><stop offset=".25" stop-color="#2a7aa2"/><stop offset="1" stop-color="#0e4a72"/></linearGradient>
<linearGradient id="mgSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6d2a4"/><stop offset="1" stop-color="#c4a874"/></linearGradient>
<linearGradient id="mgWet" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8946a"/><stop offset="1" stop-color="#c8b080"/></linearGradient>
<linearGradient id="mgHull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f2ee"/><stop offset=".55" stop-color="#d4d6d4"/><stop offset=".56" stop-color="#2a5a8a"/><stop offset="1" stop-color="#1a3a5a"/></linearGradient>
<linearGradient id="mgBus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f4f0"/><stop offset=".7" stop-color="#dcdcd6"/><stop offset="1" stop-color="#a8aaa6"/></linearGradient>
<linearGradient id="mgGlass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a6a84"/><stop offset="1" stop-color="#1e2e3e"/></linearGradient>
<linearGradient id="mgCrown" x1="0" y1="0" x2="1" y2=".3"><stop offset="0" stop-color="#2e353c"/><stop offset=".4" stop-color="#525e68"/><stop offset=".62" stop-color="#5e6a74"/><stop offset="1" stop-color="#363e46"/></linearGradient>
<linearGradient id="mgRoot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5440"/><stop offset="1" stop-color="#9a7e5e"/></linearGradient>
<linearGradient id="gwCrown" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8d4c8"/><stop offset=".45" stop-color="#fbfaf4"/><stop offset="1" stop-color="#c8c2b4"/></linearGradient>
<radialGradient id="mgWarm"><stop offset="0" stop-color="#ffb060" stop-opacity=".6"/><stop offset=".6" stop-color="#ff8a3a" stop-opacity=".2"/><stop offset="1" stop-color="#ff7a2a" stop-opacity="0"/></radialGradient>
<radialGradient id="mgDot"><stop offset="0" stop-color="#fff2c0" stop-opacity="1"/><stop offset=".35" stop-color="#f4c76b" stop-opacity=".8"/><stop offset="1" stop-color="#f4a83a" stop-opacity="0"/></radialGradient>
<radialGradient id="mgInset" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="#5ac0d0"/><stop offset=".6" stop-color="#2a8aa8"/><stop offset="1" stop-color="#14587a"/></radialGradient>
<filter id="mgCaus" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 2.4 -1.3"/></filter>`;
const MGDEFS = () => `${TDEFS()}${MDEF}${PDEF}${UDEF}${MGD}`;
const rp = (p, a, c) => { const r = a * Math.PI / 180, dx = p[0] - c[0], dy = p[1] - c[1]; return [c[0] + dx * Math.cos(r) - dy * Math.sin(r), c[1] + dx * Math.sin(r) + dy * Math.cos(r)]; };
const ptS = P => P.map((p, i) => (i ? 'L' : 'M') + m1(p[0]) + ',' + m1(p[1])).join(' ');
// ---------- the shark (side view, facing right when f = 1). Units: snout tip x = +505, tail tip x = -565, so 1000 units ≈ the body length.
// o: jaw 0..1, tb (tail beat phase), gw (great white proportions and colour), haze 0..1, hc (haze colour), k (depth factor)
function shark(x, y, sc, f, o = {}) {
  const gw = o.gw || 0, k = o.k ?? (gw ? 1.18 : 1), jaw = o.jaw || 0, tb = o.tb ?? 0, ja = 32 * jaw, H = [318, 58];
  const Y = v => m1(v * k), top = gw ? 'url(#mgTopW)' : 'url(#mgTop)', fin = gw ? 'url(#mgFinW)' : 'url(#mgFin)';
  const BODY = `M505,${Y(16)} C503,${Y(-18)} 470,${Y(-50)} 405,${Y(-72)} C335,${Y(-96)} 225,${Y(-112)} 120,${Y(-112)} C20,${Y(-110)} -120,${Y(-90)} -240,${Y(-60)} C-310,${Y(-42)} -360,${Y(-26)} -394,${Y(-18)} L-394,${Y(14)} C-350,${Y(22)} -300,${Y(34)} -230,${Y(54)} C-120,${Y(84)} 20,${Y(104)} 150,${Y(106)} C250,${Y(108)} 330,${Y(100)} 400,${Y(80)} C460,${Y(62)} 500,${Y(40)} 505,${Y(16)} Z`;
  // dark back down to an irregular countershading line
  const CS = `M505,${Y(16)} C503,${Y(-18)} 470,${Y(-50)} 405,${Y(-72)} C335,${Y(-96)} 225,${Y(-112)} 120,${Y(-112)} C20,${Y(-110)} -120,${Y(-90)} -240,${Y(-60)} C-310,${Y(-42)} -360,${Y(-26)} -394,${Y(-18)} L-394,${Y(6)} L-350,${Y(8)} L-320,${Y(2)} L-280,${Y(14)} L-240,${Y(10)} L-200,${Y(24)} L-150,${Y(20)} L-100,${Y(34)} L-40,${Y(30)} L10,${Y(44)} L60,${Y(40)} L120,${Y(52)} L160,${Y(46)} L200,${Y(50)} L240,${Y(36)} L290,${Y(40)} L330,${Y(30)} L380,${Y(24)} L430,${Y(22)} L470,${Y(28)} L500,${Y(22)} Z`;
  const D1 = gw ? `M150,${Y(-108)} C132,${Y(-180)} 96,${Y(-246)} 54,${Y(-282)} C44,${Y(-214)} 24,${Y(-150)} 0,${Y(-104)} Z` : `M150,${Y(-108)} C130,${Y(-170)} 92,${Y(-230)} 52,${Y(-262)} C42,${Y(-200)} 22,${Y(-140)} 0,${Y(-104)} Z`;
  const D2 = `M-300,${Y(-40)} C-308,${Y(-56)} -318,${Y(-68)} -338,${Y(-74)} C-336,${Y(-58)} -335,${Y(-44)} -334,${Y(-32)} Z`;
  const PEC = `M252,${Y(64)} C214,${Y(126)} 154,${Y(196)} 84,${Y(250)} C96,${Y(236)} 112,${Y(206)} 128,${Y(170)} C142,${Y(136)} 156,${Y(110)} 172,${Y(90)} Z`;
  const PECF = `M236,${Y(70)} C206,${Y(120)} 172,${Y(168)} 128,${Y(214)} C150,${Y(170)} 166,${Y(130)} 184,${Y(92)} Z`;
  const PEL = `M-160,${Y(80)} C-182,${Y(102)} -204,${Y(114)} -236,${Y(122)} C-228,${Y(104)} -218,${Y(86)} -210,${Y(72)} Z`;
  const AN = `M-298,${Y(36)} C-308,${Y(50)} -322,${Y(60)} -340,${Y(64)} C-338,${Y(50)} -336,${Y(38)} -334,${Y(28)} Z`;
  const cw = .78 + .22 * Math.cos(tb), cy = Math.sin(tb) * 6;
  const CAUD = `M-386,${Y(-20)} C-430,${Y(-72)} -500,${Y(-162)} -562,${Y(-252)} C-548,${Y(-172)} -522,${Y(-92)} -472,${Y(-6)} C-516,${Y(60)} -540,${Y(120)} -556,${Y(178)} C-500,${Y(122)} -440,${Y(62)} -386,${Y(16)} Z`;
  // upper gape (front to the mouth corner) and the lower jaw rotated about the corner
  const U = [[460, 36], [430, 44], [395, 50], [356, 55], [318, 58]].map(p => [p[0], p[1] * k]), Hk = [H[0], H[1] * k];
  const Lw = U.map(p => rp(p, ja, Hk)), TH = [[318, 100], [356, 94], [400, 80], [440, 64], [460, 50]].map(p => rp([p[0], p[1] * k], ja, Hk));
  let s = `<g transform="translate(${m1(x)},${m1(y)}) scale(${(f * sc).toFixed(4)},${sc.toFixed(4)})">`;
  // far pectoral and the tail (behind the body)
  s += `<path d="${PECF}" fill="${fin}" opacity=".9"/><path d="${PECF}" fill="#000" opacity=".3"/>`;
  s += `<g transform="translate(-394,${m1(cy)}) scale(${cw.toFixed(3)},1) translate(394,0)"><path d="${CAUD}" fill="${fin}"/><path d="${CAUD}" fill="#000" filter="url(#grainR)" opacity=".22"/><path d="M-472,${Y(-6)} C-516,${Y(60)} -540,${Y(120)} -556,${Y(178)} C-500,${Y(122)} -440,${Y(62)} -386,${Y(16)} Z" fill="#000" opacity=".16"/><path d="M-390,${Y(-18)} C-434,${Y(-70)} -500,${Y(-160)} -560,${Y(-248)}" stroke="#fff" stroke-width="3" fill="none" opacity=".12"/></g>`;
  s += `<path d="${D2}" fill="${fin}"/><path d="${AN}" fill="${fin}" opacity=".9"/>`;
  // body: belly white, dark back, rounding shade, grain
  s += `<path d="${BODY}" fill="url(#mgBelly)"/><path d="${CS}" fill="${top}"/><path d="${CS}" fill="#000" filter="url(#grainR)" opacity=".22"/><path d="${BODY}" fill="url(#mgSh)"/>`;
  // light on the back, a lateral ridge, the caudal keel, some old scars
  s += `<path d="M470,${Y(-46)} C380,${Y(-86)} 220,${Y(-108)} 100,${Y(-106)} C0,${Y(-102)} -140,${Y(-80)} -260,${Y(-50)}" stroke="#c8dce4" stroke-width="7" fill="none" opacity=".16" stroke-linecap="round"/>` +
    `<path d="M300,${Y(8)} C150,${Y(4)} -100,${Y(-6)} -380,${Y(-2)}" stroke="#000" stroke-width="3" fill="none" opacity=".1"/><path d="M-330,${Y(-2)} L-400,${Y(-2)}" stroke="#1a2228" stroke-width="7" opacity=".45" stroke-linecap="round"/>` +
    (gw ? '' : `<path d="M60,${Y(-70)} l38,10 M74,${Y(-58)} l30,9 M-80,${Y(-52)} l26,-6" stroke="#9aa8b0" stroke-width="2.4" opacity=".35" stroke-linecap="round"/>`);
  // gill slits (5)
  for (let i = 0; i < 5; i++) { const gx = 286 - i * 20, h0 = -34 + i * 3, h1 = 62 - i * 5;
    s += `<path d="M${gx},${Y(h0)} C${gx - 9},${Y(h0 + 30)} ${gx - 9},${Y(h1 - 26)} ${gx - 2},${Y(h1)}" stroke="#10161a" stroke-width="4.2" fill="none" opacity=".75" stroke-linecap="round"/><path d="M${gx + 4},${Y(h0 + 2)} C${gx - 5},${Y(h0 + 30)} ${gx - 5},${Y(h1 - 26)} ${gx + 2},${Y(h1 - 2)}" stroke="#a8b8c0" stroke-width="1.6" fill="none" opacity=".35"/>`; }
  // pelvic fin, first dorsal, near pectoral
  s += `<path d="${PEL}" fill="${fin}"/><path d="${D1}" fill="${fin}"/><path d="${D1}" fill="#000" filter="url(#grainR)" opacity=".2"/><path d="M150,${Y(-108)} C130,${Y(-170)} 92,${Y(-230)} 52,${Y(-262)}" stroke="#b8c8d0" stroke-width="3" fill="none" opacity=".25"/>` +
    `<path d="${PEC}" fill="${fin}"/><path d="M252,${Y(64)} C214,${Y(126)} 154,${Y(196)} 84,${Y(250)}" stroke="#c0d0d8" stroke-width="3" fill="none" opacity=".3"/><path d="M84,${Y(250)} C96,${Y(236)} 112,${Y(206)} 128,${Y(170)}" stroke="#e8eef0" stroke-width="4" fill="none" opacity=".5"/>`;
  // mouth: cavity, teeth (two rows), the lower jaw
  const tooth = (p, n, len, w, col) => { const a = [p[0] - w / 2 * n[1], p[1] + w / 2 * n[0]], b = [p[0] + w / 2 * n[1], p[1] - w / 2 * n[0]], c = [p[0] + n[0] * len, p[1] + n[1] * len]; return `<path d="M${m1(a[0])},${m1(a[1])} L${m1(c[0])},${m1(c[1])} L${m1(b[0])},${m1(b[1])}Z" fill="${col}"/>`; };
  const row = (P, dir, len0, col, back = 0) => { let r = ''; for (let i = 0; i < 9; i++) { const q = (i + .5 + back * .5) / 9.4, j = Math.min(P.length - 2, Math.floor(q * (P.length - 1))), u = q * (P.length - 1) - j, p = [lerp(P[j][0], P[j + 1][0], u), lerp(P[j][1], P[j + 1][1], u)], d = [P[j + 1][0] - P[j][0], P[j + 1][1] - P[j][1]], L = Math.hypot(...d), n = [-d[1] / L * dir, d[0] / L * dir];
      r += tooth(p, n, len0 * (1 - .45 * q), 15 * (1 - .4 * q), col); } return r; };
  if (jaw > .02) {
    s += `<path d="${ptS(U)} ${ptS(Lw.slice().reverse()).replace('M', 'L')} Z" fill="url(#mgCav)"/>` + `<path d="${ptS(U)}" stroke="#b86a6a" stroke-width="7" fill="none" opacity=".8"/>`;
    s += row(U.map(p => [p[0] - 6, p[1] + 4]), -1, 18 * jaw, '#d8d0bc', 1) + row(U, -1, 26 * (.4 + .6 * jaw), '#f6f2e6');
    s += row(Lw.map(p => [p[0] - 6, p[1] - 3]), 1, 15 * jaw, '#d0c8b4', 1) + row(Lw, 1, 22 * jaw, '#f2eee0');
  } else s += row(U, -1, 9, '#f2eee0');
  s += `<path d="${ptS(Lw)} ${ptS(TH.slice().reverse()).replace('M', 'L')} Z" fill="url(#mgBelly)"/><path d="${ptS(Lw)} ${ptS(TH.slice().reverse()).replace('M', 'L')} Z" fill="#000" opacity="${m1(.05 + .12 * jaw)}"/><path d="${ptS(Lw)}" stroke="#1a1a1e" stroke-width="2.5" fill="none" opacity=".7"/>`;
  if (jaw <= .02) s += `<path d="${ptS(U)}" stroke="#14181c" stroke-width="3" fill="none" opacity=".8"/>`;
  // snout pores, nostril, eye
  s += [[476, -10], [462, -22], [448, -6], [486, 4], [440, -26], [470, 10]].map(([px, py]) => `<circle cx="${px}" cy="${Y(py)}" r="2" fill="#141a1e" opacity=".45"/>`).join('') +
    `<path d="M472,${Y(14)} q10,-3 18,2" stroke="#0e1216" stroke-width="3.5" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="400" cy="${Y(-26)}" rx="12" ry="11" fill="#0a0c0e"/><ellipse cx="398" cy="${Y(-26)}" rx="15" ry="13" fill="none" stroke="#5a6a74" stroke-width="2" opacity=".5"/><circle cx="404" cy="${Y(-30)}" r="3.4" fill="#fff" opacity=".75"/>`;
  // underwater haze over the whole silhouette
  if (o.haze) s += [BODY, D1, PEC].map(d => `<path d="${d}" fill="${o.hc || '#1a6a92'}" opacity="${m1(o.haze)}"/>`).join('') + `<g transform="translate(-394,${m1(cy)}) scale(${cw.toFixed(3)},1) translate(394,0)"><path d="${CAUD}" fill="${o.hc || '#1a6a92'}" opacity="${m1(o.haze)}"/></g>` + (jaw > .02 ? `<path d="${ptS(Lw)} ${ptS(TH.slice().reverse()).replace('M', 'L')} Z" fill="${o.hc || '#1a6a92'}" opacity="${m1(o.haze)}"/>` : '');
  return s + `</g>`;
}
// ---------- a humpback whale (side view, facing right when f = 1); 1000 units ≈ its length ----------
function whale(x, y, sc, f, t, o = {}) {
  const fl = Math.sin(t * 1.6 + (o.ph || 0)) * 9;
  const B = `M505,6 C492,-30 440,-62 350,-80 C210,-100 50,-104 -110,-84 C-230,-66 -330,-38 -404,-14 L-404,14 C-330,32 -210,70 -60,92 C110,112 300,104 420,66 C470,50 500,30 505,6 Z`;
  let s = `<g transform="translate(${m1(x)},${m1(y)}) scale(${(f * sc).toFixed(4)},${sc.toFixed(4)})">`;
  // flukes, seen a little from above, beating about the peduncle
  s += `<g transform="rotate(${m1(fl)},-404,0)"><path d="M-400,-10 C-440,-30 -500,-92 -566,-128 C-574,-110 -560,-70 -548,-46 C-560,-30 -566,-10 -540,2 C-570,18 -580,44 -566,70 C-504,52 -440,26 -400,12 Z" fill="url(#whTop)"/><path d="M-566,-128 l-8,22 l10,8 l-6,20 l10,10 M-566,70 l-10,-18 l8,-12" stroke="#d8dee0" stroke-width="3" fill="none" opacity=".35"/></g>`;
  s += `<path d="M-120,-84 C-150,-112 -174,-116 -192,-108 C-182,-94 -170,-84 -160,-78 Z" fill="url(#whTop)"/>`;
  s += `<path d="${B}" fill="url(#whTop)"/><path d="M505,6 C490,30 470,50 420,66 C300,104 110,112 -60,92 C-150,80 -230,62 -300,40 C-200,48 -60,58 60,54 C200,50 330,40 420,26 C470,18 495,12 505,6Z" fill="#c8ccc8" opacity=".85"/><path d="${B}" fill="#000" filter="url(#grainR)" opacity=".22"/><path d="${B}" fill="url(#mgSh)"/>`;
  // throat grooves, knobs on the head, barnacles, eye, the mouth line
  s += Array.from({ length: 7 }, (_, i) => `<path d="M${470 - i * 6},${30 + i * 6} C380,${58 + i * 6} 220,${78 + i * 4} 40,${74 + i * 3}" stroke="#5a6066" stroke-width="2" fill="none" opacity=".45"/>`).join('') +
    Array.from({ length: 9 }, (_, i) => `<circle cx="${480 - i * 22}" cy="${m1(-26 - i * 5.2)}" r="5" fill="#3a444c"/><circle cx="${478 - i * 22}" cy="${m1(-28 - i * 5.2)}" r="2" fill="#7a868e" opacity=".6"/>`).join('') +
    [[488, 22], [470, 36], [452, 30], [430, 44]].map(([bx, by]) => `<circle cx="${bx}" cy="${by}" r="6" fill="#b8b4a4"/><circle cx="${bx}" cy="${by}" r="2.5" fill="#6a6658"/>`).join('') +
    `<path d="M505,10 C470,22 400,26 300,26" stroke="#0e1216" stroke-width="4" fill="none" opacity=".7"/><ellipse cx="290" cy="22" rx="7" ry="6" fill="#0a0c0e"/><circle cx="292" cy="20" r="2" fill="#fff" opacity=".6"/>`;
  // the long white flipper
  const fa = Math.sin(t * 1.2 + (o.ph || 0)) * 5;
  s += `<g transform="rotate(${m1(fa)},250,60)"><path d="M262,50 C210,140 90,250 -70,330 C-62,316 -40,300 -20,286 C-30,282 -16,270 0,262 C-8,256 6,246 22,240 C14,232 32,222 50,214 C120,170 180,120 220,72 Z" fill="url(#whFl)"/><path d="M262,50 C210,140 90,250 -70,330" stroke="#2a3238" stroke-width="2" fill="none" opacity=".25"/></g>`;
  if (o.haze) s += `<path d="${B}" fill="${o.hc || '#1a6a92'}" opacity="${m1(o.haze)}"/>`;
  return s + `</g>`;
}
// ---------- a city bus (side view, generic); (x, y) = ground under its middle, s = px per metre ----------
function busSide(x, y, s) {
  const L = 12 * s, Hh = 3.1 * s, x0 = x - L / 2, wr = .5 * s;
  let g = `<ellipse cx="${m1(x)}" cy="${m1(y + 2)}" rx="${m1(L * .52)}" ry="6" fill="#000" opacity=".35" filter="url(#blur2)"/>`;
  g += `<path d="M${m1(x0)},${m1(y - .45 * s)} L${m1(x0)},${m1(y - Hh + 8)} Q${m1(x0)},${m1(y - Hh)} ${m1(x0 + 10)},${m1(y - Hh)} L${m1(x0 + L - 18)},${m1(y - Hh)} Q${m1(x0 + L)},${m1(y - Hh)} ${m1(x0 + L)},${m1(y - Hh + 22)} L${m1(x0 + L)},${m1(y - .45 * s)} Z" fill="url(#mgBus)"/>`;
  g += `<rect x="${m1(x0)}" y="${m1(y - 1.05 * s)}" width="${m1(L)}" height="${m1(.28 * s)}" fill="#d8542e"/><rect x="${m1(x0)}" y="${m1(y - .62 * s)}" width="${m1(L)}" height="${m1(.17 * s)}" fill="#3a3e44"/>`;
  // windows, doors, the windscreen
  for (let i = 0; i < 8; i++) { const wx = x0 + .25 * s + i * 1.28 * s; if (i === 1 || i === 6) continue; g += `<rect x="${m1(wx)}" y="${m1(y - 2.75 * s)}" width="${m1(1.15 * s)}" height="${m1(1.15 * s)}" rx="3" fill="url(#mgGlass)"/><path d="M${m1(wx + 4)},${m1(y - 2.7 * s)} l${m1(.4 * s)},0 l-${m1(.3 * s)},${m1(1.05 * s)}" fill="#fff" opacity=".12"/>`; }
  [1, 6].forEach(i => { const dx = x0 + .25 * s + i * 1.28 * s; g += `<rect x="${m1(dx)}" y="${m1(y - 2.75 * s)}" width="${m1(1.15 * s)}" height="${m1(2.25 * s)}" rx="3" fill="#2a3a4a"/><path d="M${m1(dx + .575 * s)},${m1(y - 2.75 * s)} v${m1(2.25 * s)}" stroke="#c8ccd0" stroke-width="2"/>`; });
  g += `<path d="M${m1(x0 + L - .25 * s)},${m1(y - 2.85 * s)} L${m1(x0 + L - .05 * s)},${m1(y - 2.85 * s)} L${m1(x0 + L - .05 * s)},${m1(y - 1.25 * s)} L${m1(x0 + L - .3 * s)},${m1(y - 1.25 * s)}Z" fill="url(#mgGlass)"/><rect x="${m1(x0 + 2)}" y="${m1(y - 3.0 * s)}" width="${m1(L - 14)}" height="4" fill="#000" opacity=".12"/>`;
  [x0 + 2.4 * s, x0 + L - 2.6 * s].forEach(wx => { g += `<path d="M${m1(wx - wr * 1.35)},${m1(y - .45 * s)} a${m1(wr * 1.35)},${m1(wr * 1.35)} 0 0 1 ${m1(wr * 2.7)},0" fill="#1a1c20"/><circle cx="${m1(wx)}" cy="${m1(y - wr)}" r="${m1(wr)}" fill="#1e2024"/><circle cx="${m1(wx)}" cy="${m1(y - wr)}" r="${m1(wr * .5)}" fill="#8a9098"/><circle cx="${m1(wx)}" cy="${m1(y - wr)}" r="${m1(wr * .18)}" fill="#3a3e44"/>`; });
  return g;
}
// ---------- a small fishing boat (side view, facing right); (x, y) = waterline middle ----------
function fishBoat(x, y, s, t, o = {}) {
  const roll = Math.sin(t * 1.3) * 2.2, bob = Math.sin(t * 1.7) * 3;
  let g = `<g transform="translate(${m1(x)},${m1(y + bob)}) rotate(${m1(roll)}) scale(${s})">`;
  g += `<path d="M-120,-14 L-112,-62 L126,-62 Q150,-62 150,-40 L118,10 L-100,10 Q-116,4 -120,-14Z" fill="url(#mgHull)"/><path d="M-112,-62 L136,-62" stroke="#6a3a2a" stroke-width="6"/><path d="M-120,-14 L-112,-62 L126,-62 Q150,-62 150,-40 L118,10 L-100,10Z" fill="#000" filter="url(#grainR)" opacity=".18"/>`;
  g += `<rect x="-20" y="-128" width="78" height="66" fill="#e8e6de"/><rect x="-20" y="-128" width="20" height="66" fill="#000" opacity=".1"/><rect x="-28" y="-136" width="94" height="10" fill="#b8402e"/><rect x="2" y="-118" width="22" height="20" fill="url(#mgGlass)"/><rect x="30" y="-118" width="22" height="20" fill="url(#mgGlass)"/>`;
  g += `<path d="M-60,-62 L-60,-210 M-60,-200 L-112,-110" stroke="#4a4e54" stroke-width="5"/><path d="M-60,-208 L60,-136" stroke="#8a8e94" stroke-width="2"/>`;
  if (o.net) g += `<path d="M-112,-110 L-136,${m1(-10 + o.net)}" stroke="#c8c0a0" stroke-width="2"/>`;
  g += `<path d="M-120,4 L150,4" stroke="#fff" stroke-width="3" opacity=".35"/></g>`;
  return g;
}
// ---------- a split frame: sky above the waterline SY, water below; drawn in two calls around the subjects ----------
function splitTop(t, SY, o = {}) {
  let s = `<rect x="-20" y="-20" width="760" height="${SY + 20}" fill="url(#mgSky)"/>` + sun3(o.sx ?? 560, o.sy ?? 380, .85, '#fff4d8') + cumulus(150 + t * 6, 440, 260, 81, { a: .85 }) + cumulus(520 + t * 4, 500, 200, 83, { a: .7 });
  s += `<rect x="-20" y="${SY - 34}" width="760" height="40" fill="#3a86ac"/><path d="M-20,${SY - 34} H740" stroke="#d8eef4" stroke-width="2" opacity=".6"/>`;
  for (let i = 0; i < 26; i++) { const r = RS(i + 40), xx = pmod(r() * 760 + t * 14 * (i % 2 ? 1 : -1), 780) - 20, yy = SY - 30 + r() * 26; s += `<path d="M${m1(xx)},${m1(yy)} q${m1(8 + r() * 14)},-3 ${m1(16 + r() * 28)},0" stroke="#e8f6fa" stroke-width="1.6" fill="none" opacity=".45"/>`; }
  return s;
}
function splitWater(t, SY, o = {}) {
  let s = `<rect x="-20" y="${SY}" width="760" height="${1320 - SY}" fill="url(#mgWater)"/>`;
  for (let i = 0; i < 6; i++) { const xx = -40 + i * 140 + Math.sin(t * .45 + i * 1.7) * 24; s += `<path d="M${m1(xx)},${SY} L${m1(xx + 60)},${SY} L${m1(xx + 230)},1300 L${m1(xx - 60)},1300Z" fill="url(#rayG)" opacity="${m1(.5 + .4 * Math.sin(t * .7 + i * 2.3) ** 2)}"/>`; }
  s += snow(t, 60, .8, o.seed || 5);
  return s;
}
function splitLine(t, SY) {
  let wv = `M-20,${SY}`; for (let x = -20; x <= 740; x += 20) wv += ` L${x},${m1(SY + Math.sin(t * 2.2 + x * .03) * 4)}`;
  return `<path d="${wv} L740,${SY + 46} L-20,${SY + 46}Z" fill="#c8eef8" opacity=".18"/><path d="${wv}" stroke="#f4fbff" stroke-width="3.5" fill="none" opacity=".9"/><rect x="-20" y="${SY + 4}" width="760" height="70" fill="#fff" filter="url(#mgCaus)" opacity=".18"/>`;
}
// ---------- 0: hook: the giant glides under a boat and a swimmer ----------
function sceneHook(t) {
  const SY = 600, x = lerp(860, 330, ease(ramp(t, 0, 3.4))), jaw = .55 * ease(ramp(t, WS(0, 5), WS(0, 6) + .2)) * (1 - ease(ramp(t, WS(0, 8), WS(0, 8) + .5)));
  let s = `<defs>${MGDEFS()}</defs>` + splitTop(t, SY) + splitWater(t, SY);
  s += school(t, { n: 10, x0: 200, v: 40, y: 760, w: 300, h: 90, s: .32, col: '#c8d8e0', seed: 15 }) + tintU(SY, .12);
  s += shark(x, 960, .8, -1, { jaw, tb: t * 2.4, haze: .2 });
  s += tintU(SY, .1);
  s += swimmer(470 + t * 10, SY - 6, .27, t, { rot: 84, kick: .3, look: .45 });
  s += fishBoat(170, SY + 4, .78, t) + hero(150, SY - 50, Object.assign({ s: .28, face: 1, shade: 1, noShadow: 1 }, gp(2)));
  s += `<g transform="translate(170,${SY + 8}) scale(.78,-.45)" opacity=".18" filter="url(#blur2)">${fishBoat(0, 0, 1, t).replace(/^<g[^>]*>/, '<g>')}</g>`;
  s += splitLine(t, SY);
  noEarth(); F.ov = ''; return s;
}
// ---------- 1: the biggest shark known: 23 to 3.6 million years ago; its teeth are found on every continent but Antarctica ----------
const MGSITES = [[35.3, -76.8], [27.2, -82.3], [9.3, -79.9], [-14.5, -75.8], [-27.1, -70.9], [11.2, -69.7], [24.3, -111], [34.3, -119.3], [35.9, 14.4], [37.2, -6.6], [23.2, 69.1], [35.6, 139.6], [-38.3, 144.3], [-44, 171.2], [-33.9, 18.4], [-7.6, 110.4], [18.3, -66.4], [31.8, -8]];
function sceneAge(t) {
  const st = S0(1) - .2, T = t - st, G = glE(t, { d: 10.2, el: .25, lon: -95 + T * 22, clouds: .4, lights: .3, tg: [0, .3, 0] });
  const dots = ease(ramp(t, WS(1, 3), WS(1, 4) + .4)), tl = ease(ramp(t, WS(1, 4) - .3, WS(1, 4) + .2)), mv = ease(ramp(t, WS(1, 5), WS(1, 15) + .3)), ex = ease(ramp(t, WS(1, 10), WS(1, 10) + .5));
  let ov = '';
  MGSITES.forEach(([la, lo], i) => { const v = G.vis(la, lo), a = dots * clamp((v - .1) / .25) * ease(ramp(t, WS(1, 3) + i * .06, WS(1, 3) + i * .06 + .3)); if (a <= 0) return; const [px, py] = G.P(la, lo, 1.01);
    ov += `<circle cx="${m1(px)}" cy="${m1(py)}" r="18" fill="url(#mgDot)" opacity="${m1(a)}"/><circle cx="${m1(px)}" cy="${m1(py)}" r="4" fill="#fff8e0" opacity="${m1(a)}"/>`; });
  ov += ML(360, 1012, 'أسنانٌ أحفوريّة في كلِّ القارّات تقريباً', m1(dots), '#f4c76b', 28);
  // the time bar: right = 23 million years ago, left = 3.6 million years ago
  if (tl > 0) { const x0 = 620, x1 = 100, Y = 1130, px = lerp(x0, x1, mv);
    ov += `<g opacity="${m1(tl)}">${panel(40, 1040, 640, 190)}<path d="M${x1},${Y} H${x0}" stroke="#3a4660" stroke-width="12" stroke-linecap="round"/><path d="M${m1(px)},${Y} H${x0}" stroke="#f4c76b" stroke-width="12" stroke-linecap="round"/>` +
      `<circle cx="${x0}" cy="${Y}" r="11" fill="#f4c76b"/>${ML(x0 - 40, Y + 62, 'قبلَ ٢٣ مليون سنة', 1, '#fff', 24)}${ML(x1 + 50, Y + 62, 'قبلَ ٣٫٦ مليون سنة', ex, '#ff8a6a', 24)}` +
      `<g opacity="${m1(1 - ex * .65)}">${shark(px, Y - 34, .1, -1, { tb: t * 3 })}</g>` + (ex > 0 ? `<path d="M${x1 - 16},${Y - 16} l32,32 M${x1 + 16},${Y - 16} l-32,32" stroke="#ff5a4a" stroke-width="6" stroke-linecap="round" opacity="${m1(ex)}"/>` : '') + `</g>`; }
  F.ov = `<defs>${MGD}</defs>` + ov; return space(t);
}
// ---------- 2: the size line-up: megalodon 15-20 m, a bus 12 m, a great white 6 m, a person 1.8 m ----------
function sceneSize(t) {
  const st = S0(2) - .2, T = t - st, PX = 31, X0 = 60, am = ease(ramp(t, st, st + .6)), ab = ease(ramp(t, WS(2, 7), WS(2, 8) + .3)), ag = ease(ramp(t, WS(2, 11), WS(2, 12) + .3)), ap = ease(ramp(t, WS(2, 0), WS(2, 2)));
  let s = `<defs>${MGDEFS()}</defs>` + studio('stM2', '#1e4a66', '#06141e', 23);
  for (let i = 0; i <= 20; i++) s += `<path d="M${X0 + i * PX},380 V1230" stroke="#9ad8ff" stroke-width="${i % 5 ? 1 : 2}" opacity="${i % 5 ? .07 : .16}"/>`;
  s += `<path d="M${X0},1230 H${X0 + 20 * PX}" stroke="#9ad8ff" stroke-width="2" opacity=".4"/>` + [0, 5, 10, 15, 20].map(m => ML(X0 + m * PX, 1262, arM(m), .7, '#bfe4ff', 22)).join('') + ML(X0 + 10 * PX, 1262, '', 0);
  // the megalodon (drawn at 18 m), and its length range 15-20 m
  const ms = 18 * PX / 1070, mx = X0 + 565 * ms;
  s += `<g opacity="${m1(am)}" transform="translate(${m1((1 - am) * 60)},0)">${shark(mx, 520, ms, 1, { tb: T * 2.2 })}</g>`;
  s += `<g opacity="${m1(ap)}"><path d="M${X0},680 H${X0 + 15 * PX}" stroke="#f4c76b" stroke-width="6"/><path d="M${X0 + 15 * PX},680 H${X0 + 20 * PX}" stroke="#f4c76b" stroke-width="6" stroke-dasharray="10 7"/><path d="M${X0},664 v32 M${X0 + 15 * PX},668 v24 M${X0 + 20 * PX},664 v32" stroke="#f4c76b" stroke-width="4"/>${ML(X0 + 10 * PX, 724, 'الميغالودون: ١٥–٢٠ متراً', 1, '#f4c76b', 32)}</g>`;
  s += `<g opacity="${m1(ab)}" transform="translate(${m1((1 - ab) * 60)},0)">${busSide(X0 + 6 * PX, 905, PX)}${ML(X0 + 6 * PX, 950, 'حافلة: ١٢ متراً', 1, '#fff', 28)}</g>`;
  const gs = 6 * PX / 1070;
  s += `<g opacity="${m1(ag)}" transform="translate(${m1((1 - ag) * 60)},0)">${shark(X0 + 565 * gs, 1060, gs, 1, { gw: 1, tb: T * 3 })}${ML(X0 + 3 * PX + 260, 1070, 'القرشُ الأبيض: نحوَ ٦ أمتار', 1, '#fff', 26)}</g>`;
  const pa = ease(ramp(t, WS(2, 11) + .3, WS(2, 13)));
  s += `<g opacity="${m1(pa)}">${hero(X0 + 20, 1222, Object.assign({ s: 1.8 * PX / 300, face: 1, shade: 1, noShadow: 1 }, gp(1)))}${ML(X0 + 150, 1210, 'إنسان: ١٫٨ م', 1, '#fff', 24)}</g>`;
  noEarth(); F.ov = ''; return s;
}
// ---------- 3: teeth up to the length of your hand; a bite above 100,000 newtons ----------
function megTooth(x, y, h, o = {}) {
  const gw = o.gw, w = h * (gw ? .74 : .94), cr = gw ? 'url(#gwCrown)' : 'url(#mgCrown)', n = gw ? 16 : 26, cb = y - h * .3;
  const tip = [x, y - h], bl = [x - w / 2, cb], br = [x + w / 2, cb];
  const edge = (a, b, side) => { let d = ''; const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * side, ny = dx / L * side;
    for (let i = 1; i <= n; i++) { const q = i / n, bu = Math.sin(Math.PI * q) * w * .035 + (i % 2 && i < n ? Math.max(1, h * .007) : 0); d += ` L${m1(a[0] + dx * q + nx * bu)},${m1(a[1] + dy * q + ny * bu)}`; } return d; };
  let g = `<ellipse cx="${x}" cy="${m1(y + 6)}" rx="${m1(w * .55)}" ry="${m1(h * .04)}" fill="#000" opacity=".4" filter="url(#blur5)"/>`;
  // root: one broad block with a shallow notch
  g += `<path d="M${m1(x - w * .52)},${m1(cb + h * .02)} C${m1(x - w * .56)},${m1(y - h * .1)} ${m1(x - w * .46)},${m1(y - h * .01)} ${m1(x - w * .28)},${m1(y)} C${m1(x - w * .12)},${m1(y + h * .005)} ${m1(x - w * .06)},${m1(y - h * .05)} ${x},${m1(y - h * .05)} C${m1(x + w * .06)},${m1(y - h * .05)} ${m1(x + w * .12)},${m1(y + h * .005)} ${m1(x + w * .28)},${m1(y)} C${m1(x + w * .46)},${m1(y - h * .01)} ${m1(x + w * .56)},${m1(y - h * .1)} ${m1(x + w * .52)},${m1(cb + h * .02)} Z" fill="${gw ? '#e2d6bc' : '#a08466'}"/>` +
    `<path d="M${m1(x - w * .5)},${m1(cb + h * .03)} C${m1(x - w * .52)},${m1(y - h * .1)} ${m1(x - w * .4)},${m1(y - h * .02)} ${m1(x - w * .28)},${m1(y - h * .01)} L${m1(x - w * .28)},${m1(cb + h * .04)}Z" fill="#000" opacity=".15"/><path d="M${m1(x - w * .5)},${m1(cb + h * .02)} H${m1(x + w * .5)} V${m1(y)} H${m1(x - w * .5)}Z" fill="#000" filter="url(#grainR)" opacity=".2"/>`;
  g += `<path d="M${m1(bl[0])},${m1(bl[1])}${edge(bl, tip, -1)}${edge(tip, br, -1)} Q${x},${m1(cb + h * .05)} ${m1(bl[0])},${m1(bl[1])} Z" fill="${cr}"/>`;
  if (!gw) g += `<path d="M${m1(x - w * .5)},${m1(cb)} Q${x},${m1(cb + h * .05)} ${m1(x + w * .5)},${m1(cb)} L${m1(x + w * .49)},${m1(cb + h * .04)} Q${x},${m1(cb + h * .1)} ${m1(x - w * .49)},${m1(cb + h * .04)} Z" fill="#4a3e34"/>`;
  g += `<path d="M${x},${m1(y - h * .95)} L${m1(x + w * .03)},${m1(cb + h * .03)}" stroke="#000" stroke-width="${m1(h * .02)}" opacity=".12"/><path d="M${m1(x - w * .05)},${m1(y - h * .86)} L${m1(x - w * .26)},${m1(cb - h * .06)}" stroke="#fff" stroke-width="${m1(h * .03)}" fill="none" opacity=".28" stroke-linecap="round"/>`;
  return g;
}
function sceneTeeth(t) {
  const st = S0(3) - .2, T = t - st, a1 = ease(ramp(t, st, st + .5)) * (1 - ease(ramp(t, WS(3, 6) - .2, WS(3, 6) + .3))), a2 = ease(ramp(t, WS(3, 6) - .2, WS(3, 6) + .3));
  let s = `<defs>${MGDEFS()}</defs>` + studio('stM3', '#2c3c56', '#080c18', 31);
  if (a1 > 0) { const hk = ease(ramp(t, WS(3, 3), WS(3, 5)));
    s += `<g opacity="${m1(a1)}">` + megTooth(250, 900, 250) + ML(250, 960, 'سنُّ الميغالودون', 1, '#f4c76b', 28) + ML(250, 600, 'حتّى ١٨ سم', 1, '#f4c76b', 34) +
      `<g opacity="${m1(hk)}">${handK(520, 830, 1.86, '#c89070', '#8a5a40')}${ML(520, 960, 'يدُك', 1, '#fff', 28)}</g>` +
      megTooth(520, 1150, 70, { gw: 1 }) + ML(520, 1200, 'سنُّ القرشِ الأبيض', ease(ramp(t, WS(3, 1), WS(3, 2))), '#fff', 24) + `</g>`; }
  if (a2 > 0) { const op = ease(ramp(t, WS(3, 6), WS(3, 7))), cl = ease(ramp(t, WS(3, 12) - .1, WS(3, 12) + .2)), jaw = op * (1 - .85 * cl), b = ease(ramp(t, WS(3, 8), WS(3, 12)));
    s += `<g opacity="${m1(a2)}">` + shark(lerp(-150, -180, ease(ramp(t, WS(3, 6), S0(4)))), 640, 1.45, 1, { jaw, tb: T * 2, k: 1 });
    const bar = (y, v0, v1, col, tx, k) => { const W = 540 / 182000, w0 = Math.max(8, v0 * W * k), w1 = v1 ? Math.max(w0, v1 * W * k) : w0; return `<g opacity="${m1(clamp(k * 3))}">${ML(360, y, tx + ': ' + (v1 ? arMC(v0) + '–' + arMC(v1) : arMC(v0)), 1, '#fff', 25)}` + (v1 ? `<rect x="90" y="${y + 12}" width="${m1(w1)}" height="30" rx="10" fill="${col}" opacity=".45"/>` : '') + `<rect x="90" y="${y + 12}" width="${m1(w0)}" height="30" rx="10" fill="${col}"/></g>`; };
    s += `<g opacity="${m1(b > 0 ? 1 : 0)}">${panel(50, 880, 620, 350)}${ML(360, 922, 'قوّةُ العضّة (نيوتن)', 1, '#f4c76b', 28)}` + bar(980, 1300, 0, '#9ad8ff', 'إنسان', clamp(b * 3)) + bar(1066, 18200, 0, '#bfc8d0', 'القرشُ الأبيض', clamp(b * 3 - 1)) + bar(1152, 108000, 182000, '#ff8a5a', 'الميغالودون', clamp(b * 3 - 2)) + `</g></g>`; }
  noEarth(); F.ov = ''; return s;
}
// ---------- 4: it hunted whales: a humpback, and the giant rising from below ----------
function sceneWhale(t) {
  const st = S0(4) - .2, T = t - st, ru = ease(ramp(t, st + .3, WS(4, 9) + .2)), jaw = .8 * ease(ramp(t, WS(4, 5), WS(4, 7)));
  let s = `<defs>${MGDEFS()}</defs>` + uwBg(t, { g: 'mgDeep', floor: 1400, rays: .9, snowN: 70, coral: 0 });
  s += school(t, { n: 12, x0: 900, v: -50, y: 560, w: 360, h: 120, s: .3, col: '#a8c0cc', seed: 22 });
  s += whale(lerp(400, 280, T / 5), 900, .52, -1, t, { haze: .14 });
  s += shark(lerp(1000, 640, ru), lerp(1240, 1000, ru), .62, -1, { jaw, tb: t * 3.2, haze: .22 }).replace('<g transform="translate(', '<g transform="rotate(14,' + m1(lerp(1000, 640, ru)) + ',' + m1(lerp(1240, 1000, ru)) + ') translate(');
  s += tintU(-20, .1, '#062a48');
  noEarth(); F.ov = ''; return s;
}
// ---------- 5: small boats in danger; beaches need barriers and watchtowers ----------
function tower(x, y, s, t) {
  const fw = Math.sin(t * 5) * 6;
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="4" rx="90" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/><path d="M-50,0 L-36,-150 M50,0 L36,-150 M-44,-70 L44,-70 M-46,-40 L40,-110 M46,-40 L-40,-110" stroke="#e8e4dc" stroke-width="9"/>` +
    `<rect x="-62" y="-160" width="124" height="14" fill="#d8d0c0"/><rect x="-54" y="-238" width="108" height="80" fill="#e8463a"/><rect x="-54" y="-238" width="30" height="80" fill="#000" opacity=".14"/><rect x="-38" y="-222" width="76" height="34" fill="url(#mgGlass)"/><path d="M-70,-238 L0,-268 L70,-238Z" fill="#f2f0ea"/>` +
    `<path d="M64,-150 L118,0" stroke="#c8c0b0" stroke-width="10"/><path d="M0,-268 V-340" stroke="#6a6a6a" stroke-width="4"/><path d="M2,-340 Q30,${m1(-334 + fw)} 58,-326 Q30,${m1(-318 + fw)} 2,-312Z" fill="#d82a2a"/></g>`;
}
function sceneBoat(t) {
  const st = S0(5) - .2, T = t - st, sw = ease(ramp(t, WS(5, 6) - .3, WS(5, 6) + .3));
  // A: a fishing boat, its net in the water, the giant under it
  let a = '';
  if (sw < 1) { const SY = 640, nd = 220 + 30 * Math.sin(t);
    a = splitTop(t + 20, SY, { sx: 140, sy: 400 }) + splitWater(t, SY, { seed: 9 });
    let net = ''; for (let i = 0; i <= 8; i++) net += `<path d="M${200 + i * 26},${SY + 10} Q${m1(196 + i * 26 + Math.sin(t + i) * 6)},${m1(SY + nd * .6)} ${m1(210 + i * 22)},${m1(SY + nd)}" stroke="#d8d0b0" stroke-width="1.6" fill="none" opacity=".55"/>`;
    for (let j = 1; j <= 6; j++) net += `<path d="M200,${m1(SY + 10 + j * nd / 6.4)} Q300,${m1(SY + 20 + j * nd / 6.4)} ${m1(380 - j * 2)},${m1(SY + 10 + j * nd / 6.4)}" stroke="#d8d0b0" stroke-width="1.4" fill="none" opacity=".45"/>`;
    a += net + tintU(SY, .1) + shark(lerp(980, 520, ease(ramp(t, st, WS(5, 5) + .4))), 1060, .74, -1, { tb: t * 2.6, jaw: .35 * ease(ramp(t, WS(5, 2), WS(5, 4))), haze: .22 }) + tintU(SY, .08);
    a += fishBoat(300, SY + 4, 1, t, { net: 30 }) + hero(250, SY - 54, Object.assign({ s: .34, face: 1, shade: 1, noShadow: 1, hF: [200, SY - 110] }, gp(3))) + splitLine(t, SY);
    a += ML(360, 1180, 'شِباكٌ وقواربُ صغيرة في خطر', ease(ramp(t, WS(5, 3), WS(5, 5))), '#ff9a7a', 30); }
  // B: a beach with a barrier of floats, a watchtower, a red flag and people kept on the sand
  let b = '';
  if (sw > 0) { const HZ = 640, SH = 900;
    b = `<rect x="-20" y="-20" width="760" height="${HZ + 20}" fill="url(#mgSky)"/>` + sun3(560, 420, .8, '#fff4d8') + cumulus(170 + T * 6, 470, 260, 91, { a: .85 }) + cumulus(520 + T * 3, 520, 180, 93, { a: .7 });
    b += `<rect x="-20" y="${HZ}" width="760" height="${SH - HZ + 20}" fill="url(#mgSeaS)"/>` + seaRows(T, HZ, 560, 31).replace(/stroke="#0e2840"/g, 'stroke="#1e5a80"');
    // the barrier: a line of floats with the net hanging below
    for (let i = 0; i < 16; i++) { const q = i / 15, bx = lerp(-10, 740, q), by = lerp(770, 720, q) + Math.sin(t * 2 + i) * 3, r = lerp(9, 6, q); b += `<path d="M${m1(bx)},${m1(by)} v${m1(28 - 10 * q)}" stroke="#2a3a44" stroke-width="1.5" opacity=".45"/><ellipse cx="${m1(bx)}" cy="${m1(by)}" rx="${m1(r)}" ry="${m1(r * .75)}" fill="#ff8a2a"/><ellipse cx="${m1(bx - r * .3)}" cy="${m1(by - r * .3)}" rx="${m1(r * .35)}" ry="${m1(r * .25)}" fill="#fff" opacity=".5"/>`; }
    b += `<path d="M-10,770 L740,720" stroke="#2a3a44" stroke-width="1.5" opacity=".6"/>`;
    // surf and sand
    let sf = `M-20,${SH}`; for (let x = -20; x <= 740; x += 30) sf += ` L${x},${m1(SH + Math.sin(T * 1.8 + x * .02) * 6)}`;
    b += `<path d="${sf} L740,1320 L-20,1320Z" fill="url(#mgSand)"/><path d="${sf} L740,${SH + 40} L-20,${SH + 40}Z" fill="url(#mgWet)" opacity=".7"/><path d="${sf}" stroke="#fff" stroke-width="7" fill="none" opacity=".8"/><path d="${sf.replace(/L(-?\d+),([\d.]+)/g, (m, x, y) => `L${x},${m1(+y + 12)}`)}" stroke="#fff" stroke-width="3" fill="none" opacity=".45"/>` +
      `<rect x="-20" y="${SH}" width="760" height="420" fill="#000" filter="url(#grainS)" opacity=".2"/>`;
    b += tower(560, 1120, .95, t);
    // a warning sign: a shark fin in a triangle
    b += `<path d="M150,1130 V960" stroke="#6a6a6a" stroke-width="7"/><path d="M150,880 L206,976 L94,976Z" fill="#f4c020" stroke="#1a1a1a" stroke-width="5" stroke-linejoin="round"/><path d="M118,960 Q150,952 180,960 Q160,950 150,912 Q140,940 118,960Z" fill="#1a1a1a"/><path d="M114,964 q12,-6 24,0 t24,0 t24,0" stroke="#1a1a1a" stroke-width="3" fill="none"/>`;
    [[290, 1150, 0, .62, 1], [380, 1196, 2, .66, -1], [230, 1238, 4, .7, 1], [460, 1240, 5, .68, -1]].forEach(([x, y, pi, sc, f], j) => { b += hero(x, y, Object.assign({ s: sc, face: f, shade: 1, aF: j === 0 ? [2.3, 2.6] : undefined }, gp(pi))); });
    // a fin far out beyond the barrier
    const fx = 540 - T * 22; b += `<path d="M${m1(fx)},686 Q${m1(fx + 10)},666 ${m1(fx + 26)},652 Q${m1(fx + 24)},670 ${m1(fx + 34)},686Z" fill="#2a3640"/><path d="M${m1(fx - 14)},688 q24,-6 60,0" stroke="#fff" stroke-width="2" fill="none" opacity=".6"/>`;
  }
  noEarth(); F.ov = ''; return `<defs>${MGDEFS()}</defs>` + (sw < 1 ? a : '') + (sw > 0 ? `<g opacity="${m1(sw)}">${b}</g>` : '');
}
// ---------- 6: today's oceans are colder: it would keep to warm seas; its young are born in shallow coasts ----------
function sceneWarm(t) {
  const st = S0(6) - .2, T = t - st, ht = ease(ramp(t, WS(6, 2), WS(6, 4) + .4)), wl = ease(ramp(t, WS(6, 9) - .2, WS(6, 10))), ni = ease(ramp(t, WS(6, 11) - .3, WS(6, 12)));
  const G = glE(t, { d: lerp(10.6, 11.6, ni), el: .12, lon: 70 + T * 9, clouds: .35, lights: .2, heat: .4 * ht, tg: [0, lerp(.35, -.55, ni), 0] });
  let ov = pin(G, -2, 85, 'مياهٌ دافئة', wl, '#ffd7a0', 30) + pin(G, 52, 70, 'أبرد', ht * (1 - ni), '#bfe4ff', 32) + pin(G, -52, 100, 'أبرد', ht * (1 - ni), '#bfe4ff', 32);
  // the nursery: shallow, sunlit water by a coast, the young sharks about 2 m long
  if (ni > 0) { const R = 200, cx = 360, cy = 1010;
    let g = `<clipPath id="mgNc"><circle cx="0" cy="0" r="${R}"/></clipPath><g clip-path="url(#mgNc)"><rect x="-220" y="-220" width="440" height="440" fill="url(#mgInset)"/><path d="M-220,-120 Q-60,-150 220,-110 L220,-220 L-220,-220Z" fill="#a8d8f0"/><path d="M-220,140 Q-80,90 60,130 T220,120 L220,220 L-220,220Z" fill="#d8c08a"/><path d="M-220,140 Q-80,90 60,130 T220,120" stroke="#fff" stroke-width="2" fill="none" opacity=".4"/>`;
    for (let i = 0; i < 5; i++) { const xx = -150 + i * 70 + Math.sin(t * 1.1 + i) * 10; g += `<path d="M${xx},-110 L${xx + 40},-110 L${xx + 120},140 L${xx - 30},140Z" fill="#fff" opacity=".07"/>`; }
    g += `<rect x="-220" y="-110" width="440" height="260" fill="#fff" filter="url(#mgCaus)" opacity=".22"/>` + shark(-20 + Math.sin(t * .6) * 30, -10, .16, 1, { tb: t * 4 }) + shark(70 - Math.sin(t * .5) * 24, 60, .14, -1, { tb: t * 4 + 1 }) + `</g><circle cx="0" cy="0" r="${R}" fill="none" stroke="#f4c76b" stroke-width="5"/>`;
    ov += `<g transform="translate(${cx},${cy}) scale(${m1(.7 + .3 * ni)})" opacity="${m1(ni)}">${g}</g>` + ML(360, 1250, 'صغارٌ بطولِ نحوِ مترَين قربَ الساحل', ni, '#fff', 26); }
  F.ov = `<defs>${MGD}</defs>` + ov; return space(t);
}
// ---------- 7: the surprise: why it died out: colder seas, less prey, and a smaller rival: the great white ----------
function sceneEnd(t) {
  const st = S0(7) - .2, T = t - st, cd = ease(ramp(t, WS(7, 4) - .2, WS(7, 5) + .3)), pr = ease(ramp(t, WS(7, 6) - .2, WS(7, 7) + .3)), cm = ease(ramp(t, WS(7, 8) - .2, WS(7, 9) + .3)), gwa = ease(ramp(t, WS(7, 11), WS(7, 13)));
  let s = `<defs>${MGDEFS()}</defs>` + uwBg(t, { g: 'mgDeep', floor: 1400, rays: .9 * (1 - cd * .6), snowN: 60, coral: 0 }) + `<rect x="-20" y="-20" width="760" height="1320" fill="url(#mgCold)" opacity="${m1(.75 * cd)}"/>`;
  // whales in the distance: many, then few
  [[150, 470, .2, 0], [420, 520, .17, 1], [600, 440, .15, 2], [300, 600, .14, 3]].forEach(([x, y, sc, i]) => { const a = i === 1 ? 1 : 1 - pr; if (a > 0) s += `<g opacity="${m1(.75 * a)}">${whale(x - T * 12, y, sc, -1, t, { ph: i, haze: .4, hc: '#1a5a82' })}</g>`; });
  s += shark(lerp(820, 470, ease(ramp(t, st, S0(8)))), 720, .6, -1, { tb: t * 2.2, haze: .25 + .25 * cm, hc: '#14405e' });
  s += `<g opacity="${m1(cm)}">${shark(lerp(-160, 300, ease(ramp(t, WS(7, 8) - .2, S0(8)))), 900, .21, 1, { gw: 1, tb: t * 3.4, haze: .05 })}</g>`;
  // three reason cards (right to left)
  const card = (x, tx, a, icon) => a <= 0 ? '' : `<g opacity="${m1(a)}" transform="translate(0,${m1((1 - a) * 30)})">${panel(x, 1050, 196, 150)}${icon}${ML(x + 98, 1180, tx, 1, '#fff', 22)}</g>`;
  s += card(484, 'برودةُ البحار', cd, `<rect x="576" y="1068" width="12" height="62" rx="6" fill="#e8eef4"/><circle cx="582" cy="1134" r="13" fill="#5ab0ff"/><rect x="579" y="1096" width="6" height="36" fill="#5ab0ff"/><path d="M608,1080 l14,14 m0,-14 l-14,14 M615,1076 v22" stroke="#bfe4ff" stroke-width="3"/>`) +
    card(262, 'فرائسُ أقلّ', pr, `<g transform="translate(360,1104)">${whale(0, 0, .09, -1, 0, { haze: .45, hc: '#a8c8d8' })}</g><path d="M318,1076 l84,52" stroke="#ff5a4a" stroke-width="5" stroke-linecap="round"/>`) +
    card(40, 'منافسٌ أصغر', cm, `<g transform="translate(138,1110)">${shark(0, 0, .14, 1, { gw: 1 })}</g>`);
  noEarth(); F.ov = ''; return s;
}
// ---------- 8: end ----------
function sceneEarth(t) {
  const q = ease(ramp(t, WS(8, 0) - .2, WS(8, 0) + .6)), b = Math.abs(Math.sin(t * 3)) * 6;
  glE(t, { d: 9.8, el: .32, lon: -150 + (t - S0(8)) * 2, clouds: .45, lights: .4, tg: [0, .64, 0] });
  F.ov = `<g opacity="${q}"><text x="360" y="440" text-anchor="middle" font-family="Amiri" font-weight="700" font-size="190" fill="#f4c76b" style="filter:drop-shadow(0 6px 20px rgba(0,0,0,.7))">؟</text></g>` +
    `<g opacity="${ramp(t, WS(8, 10) - .3, WS(8, 10) + .1)}" transform="translate(360,${1100 - b})"><rect x="-120" y="-34" width="240" height="68" rx="16" fill="#e53935"/><text x="0" y="14" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="34" fill="#fff">اشترك</text></g>`;
  return space(t);
}
const SCENES = [{ s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneAge }, { s: S0(2) - .2, f: sceneSize }, { s: S0(3) - .2, f: sceneTeeth }, { s: S0(4) - .2, f: sceneWhale },
  { s: S0(5) - .2, f: sceneBoat }, { s: S0(6) - .2, f: sceneWarm }, { s: S0(7) - .2, f: sceneEnd }, { s: S0(8) - .2, f: sceneEarth }];
const NOKB = new Set([sceneSize, sceneTeeth, sceneEnd]);
const XF = .5;
const TLI = [['الحجم', S0(2)], ['الأسنان', S0(3)], ['الحيتان', S0(4)], ['الشواطئ', S0(5)], ['البحار الدافئة', S0(6)], ['الانقراض', S0(7)]];
const LIST_ON = new Set([sceneWhale]);
const CHIPS = [
  ['c0', 'ما زالَ حيّاً!', 360, 330, 'red big', WS(0, 6), S0(1) - .3],
  ['c1', 'أكبرُ قرشٍ عرفناه', 360, 330, 'big', WS(1, 1), S0(2) - .3],
  ['c4', 'الحيتانُ فريستُه', 360, 330, 'big', WS(4, 7), S0(5) - .3],
  ['c5', 'حواجزُ وأبراجُ مراقبة', 360, 330, 'big', WS(5, 8), S0(6) - .3],
  ['c6', 'محيطاتُ اليومِ أبرد', 360, 330, 'ice big', WS(6, 3), WS(6, 9) - .1],
  ['c7', 'القرشُ الأبيض!', 360, 330, 'big', WS(7, 12), S0(8) - .3],
  ['c8', '@MadhaLawLab', 360, 1200, 'dark', WS(8, 10) - .3, 999]];
$('ui').innerHTML = `<div class="list" id="tl" style="height:340px"><div class="hd">لو عاد الميغالودون</div><div class="rail"></div><div class="fill" id="tlf"></div>` +
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
