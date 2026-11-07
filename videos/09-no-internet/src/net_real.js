// ===== realistic shots 4–8: bank ATM at human scale, shop counter (card declined, cash), airport terminal, container port =====
const NDEF = `<filter id="stoneT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".05 .09" numOctaves="4" seed="4"/><feColorMatrix values="0 0 0 0 .3  0 0 0 0 .26  0 0 0 0 .2  0 0 0 -1.4 .8"/><feComposite in2="SourceGraphic" operator="in"/></filter>` +
  `<filter id="metalT" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9 .02" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -1.6 .5"/><feComposite in2="SourceGraphic" operator="in"/></filter>`;
// shot 4: a bank front on the pavement; the ATM is set into the wall at real size; the person stands at it
function sceneBank(t) {
  const atm = ease(ramp(t, WS(3, 2) - .2, WS(3, 4)));
  const G = 1120, M = 200; // ground line, pixels per metre (the person is ~1.75 m)
  let s = `<defs>${NDEF}<linearGradient id="skB4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ab0d8"/><stop offset="1" stop-color="#e8eef2"/></linearGradient>` +
    `<linearGradient id="wallB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8ccb4"/><stop offset="1" stop-color="#a89880"/></linearGradient>` +
    `<linearGradient id="atmB" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a7280"/><stop offset=".45" stop-color="#b8bec8"/><stop offset="1" stop-color="#585e6a"/></linearGradient>` +
    `<linearGradient id="glassB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a5a7a"/><stop offset=".5" stop-color="#7a9ab8"/><stop offset="1" stop-color="#2a4058"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="url(#skB4)"/>`;
  // building facade with stone cladding and joints
  s += `<rect x="-10" y="180" width="740" height="${G - 180}" fill="url(#wallB)"/><rect x="-10" y="180" width="740" height="${G - 180}" fill="#fff" filter="url(#stoneT)" opacity=".7"/>` +
       Array.from({ length: 14 }, (_, i) => `<line x1="-10" y1="${200 + i * 66}" x2="730" y2="${200 + i * 66}" stroke="#8a7a64" stroke-width="2" opacity=".45"/>`).join('') +
       Array.from({ length: 14 }, (_, i) => Array.from({ length: 5 }, (_, j) => `<line x1="${(j * 160 + (i % 2) * 80) - 10}" y1="${200 + i * 66}" x2="${(j * 160 + (i % 2) * 80) - 10}" y2="${266 + i * 66}" stroke="#8a7a64" stroke-width="2" opacity=".35"/>`).join('')).join('');
  // bank sign
  s += `<rect x="70" y="230" width="580" height="90" rx="6" fill="#1a3a6a"/><rect x="70" y="230" width="580" height="90" rx="6" fill="none" stroke="#c8a040" stroke-width="4"/><text x="360" y="290" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="48" fill="#f4e8c0" direction="rtl">مصرف</text>`;
  // glass door + window on the left
  s += `<rect x="30" y="${G - 2.6 * M}" width="230" height="${2.6 * M}" fill="url(#glassB)"/><rect x="30" y="${G - 2.6 * M}" width="230" height="${2.6 * M}" fill="none" stroke="#3a3e44" stroke-width="10"/><line x1="145" y1="${G - 2.6 * M}" x2="145" y2="${G}" stroke="#3a3e44" stroke-width="8"/>` +
       `<path d="M50,${G - 2.5 * M} L120,${G - 2.5 * M} L60,${G - 1.4 * M}Z" fill="#fff" opacity=".15"/><rect x="128" y="${G - 1.1 * M}" width="6" height="${.5 * M}" rx="3" fill="#c8ccd2"/><rect x="156" y="${G - 1.1 * M}" width="6" height="${.5 * M}" rx="3" fill="#c8ccd2"/>`;
  // ATM in the wall: ~0.8 m wide, top at ~1.75 m, screen centre ~1.4 m
  const ax = 430, aw = .8 * M, top = G - 1.8 * M;
  s += `<rect x="${ax - 16}" y="${top - 70}" width="${aw + 32}" height="60" rx="6" fill="#1a3a6a"/><text x="${ax + aw / 2}" y="${top - 30}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="28" fill="#f4e8c0" direction="rtl">صراف آلي</text>` +
       `<rect x="${ax - 12}" y="${top - 6}" width="${aw + 24}" height="${1.8 * M + 6 - .9 * M}" fill="#2a2e34"/>` +
       `<rect x="${ax}" y="${top}" width="${aw}" height="${.9 * M}" rx="6" fill="url(#atmB)"/><rect x="${ax}" y="${top}" width="${aw}" height="${.9 * M}" rx="6" fill="#fff" filter="url(#metalT)" opacity=".25"/>`;
  const sx = ax + aw * .14, sw = aw * .72, sy = top + .1 * M, sh = .28 * M;
  s += `<rect x="${sx - 4}" y="${sy - 4}" width="${sw + 8}" height="${sh + 8}" rx="4" fill="#1a1c22"/><rect x="${sx}" y="${sy}" width="${sw}" height="${sh}" fill="${mix('#1a4a8a', '#c82a2a', atm)}"/>` +
       `<text x="${sx + sw / 2}" y="${sy + sh / 2 + 9}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff" direction="rtl" opacity="${atm}">خارج الخدمة</text>` +
       `<text x="${sx + sw / 2}" y="${sy + sh / 2 + 9}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#cfe0ff" direction="rtl" opacity="${1 - atm}">أدخل البطاقة</text>` +
       `<path d="M${sx},${sy} L${sx + sw * .4},${sy} L${sx},${sy + sh}Z" fill="#fff" opacity=".08"/>`;
  s += `<rect x="${ax + aw * .2}" y="${top + .46 * M}" width="${aw * .4}" height="${.2 * M}" rx="4" fill="#3a3e48"/>` + Array.from({ length: 12 }, (_, i) => `<rect x="${ax + aw * .22 + (i % 3) * aw * .13}" y="${top + .48 * M + Math.floor(i / 3) * .045 * M}" width="${aw * .1}" height="${.035 * M}" rx="2" fill="#d8dce2"/>`).join('') +
       `<rect x="${ax + aw * .68}" y="${top + .5 * M}" width="${aw * .18}" height="10" rx="4" fill="#111"/><circle cx="${ax + aw * .77}" cy="${top + .5 * M - 10}" r="5" fill="${atm > .5 ? '#e53935' : '#3ac85a'}"/>` +
       `<rect x="${ax + aw * .2}" y="${top + .76 * M}" width="${aw * .6}" height="12" rx="5" fill="#111"/>`;
  // pavement with joints and a soft shadow
  s += `<rect y="${G}" width="720" height="${1280 - G}" fill="#a8a296"/>` + Array.from({ length: 6 }, (_, i) => `<line x1="${i * 140}" y1="${G}" x2="${i * 140 - 60}" y2="1280" stroke="#8a847a" stroke-width="2"/>`).join('') + `<line x1="0" y1="${G + 60}" x2="720" y2="${G + 60}" stroke="#8a847a" stroke-width="2"/>`;
  s += `<ellipse cx="400" cy="${G + 4}" rx="70" ry="10" fill="#000" opacity=".25" filter="url(#blur2)"/>`;
  s += person(400, G + 2, { s: 1.06, face: 1, top: '#2f4b7e', pants: '#1f2638', skin: '#8d5a3b', hair: '#17110d', lookUp: .05, t });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// shots 5–6: a shop counter: a real-size card terminal declines, then cash comes out and a "cash only" note appears
function sceneCounter(t) {
  const dec = ease(ramp(t, WS(3, 7) - .3, WS(3, 8))), cash = ease(ramp(t, WS(3, 9) - .2, WS(3, 11))), note = ease(ramp(t, WS(3, 12) - .3, WS(3, 12) + .3));
  let s = `<defs>${NDEF}<linearGradient id="shW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc8"/><stop offset="1" stop-color="#c8b8a0"/></linearGradient>` +
    `<linearGradient id="ctr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a3a"/><stop offset="1" stop-color="#5a3a24"/></linearGradient>` +
    `<linearGradient id="posB" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3e48"/><stop offset="1" stop-color="#1a1c22"/></linearGradient>` +
    `<linearGradient id="note2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8d8a8"/><stop offset="1" stop-color="#6a9a5a"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="url(#shW)"/>`;
  // shelves with goods behind, softly out of focus
  s += `<g filter="url(#blur2)" opacity=".8">` + [260, 420, 580].map(y => `<rect x="0" y="${y}" width="720" height="14" fill="#8a6a4a"/>` + Array.from({ length: 10 }, (_, i) => { const r = RS(y + i); return `<rect x="${20 + i * 70}" y="${y - 60 - r() * 30}" width="${40 + r() * 16}" height="${60 + r() * 30}" rx="4" fill="${['#c83a2a', '#2a6ac8', '#e8a020', '#3a8a4a', '#f4efe4'][i % 5]}"/>`; }).join('')).join('') + `</g>`;
  s += `<rect x="-10" y="760" width="740" height="520" fill="url(#ctr)"/><rect x="-10" y="760" width="740" height="18" fill="#a87a50"/><rect x="-10" y="760" width="740" height="520" fill="#000" filter="url(#woodTex)" opacity=".5"/>`;
  // cash register with a "cash only" paper note taped on it
  s += `<rect x="440" y="560" width="230" height="200" rx="12" fill="#2a2e34"/><rect x="460" y="580" width="190" height="70" rx="6" fill="#3ac85a" opacity=".85"/><text x="555" y="628" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="34" fill="#0a2a10">0.00</text>` +
       `<g opacity="${note}" transform="translate(555,700) rotate(-4)"><rect x="-80" y="-34" width="160" height="68" fill="#fffef6"/><path d="M-90,-40 l30,10 M90,-40 l-30,10" stroke="#e8e0c0" stroke-width="12" opacity=".8"/><text x="0" y="12" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="30" fill="#c82a2a" direction="rtl">نقداً فقط</text></g>`;
  // card terminal at real size with a hand holding a card in it
  s += `<g transform="translate(230,700)"><rect x="-80" y="-150" width="160" height="290" rx="22" fill="url(#posB)"/><rect x="-62" y="-130" width="124" height="90" rx="6" fill="${mix('#1a5a9a', '#c82a2a', dec)}"/>` +
       `<text x="0" y="-78" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="24" fill="#fff" direction="rtl">${dec > .5 ? 'مرفوض' : 'جاري...'}</text>` +
       Array.from({ length: 12 }, (_, i) => `<rect x="${-52 + (i % 3) * 38}" y="${-24 + Math.floor(i / 3) * 34}" width="30" height="26" rx="5" fill="${i === 9 ? '#c83a2a' : i === 11 ? '#3ac85a' : '#6a6e78'}"/>`).join('') + `<rect x="-60" y="134" width="120" height="10" rx="4" fill="#111"/></g>`;
  s += `<g opacity="${1 - cash}"><rect x="190" y="830" width="84" height="54" rx="6" fill="#d8b040" transform="rotate(-8,232,857)"/><rect x="196" y="842" width="20" height="14" rx="3" fill="#c8a030" transform="rotate(-8,232,857)"/>` +
       `<path d="M140,900 C150,860 200,850 240,860 L300,880 C320,890 318,910 300,914 L250,910 C220,960 180,980 150,980Z" fill="#b07a55"/></g>`;
  // banknotes counted onto the counter
  if (cash > 0) { const r = RS(51); for (let i = 0; i < 9; i++) { const k = clamp(cash * 9 - i), x = lerp(120, 300 + (i % 3) * 30, k), y = lerp(1200, 800 + i * 4, k), rot = -10 + i * 4;
    s += `<g transform="translate(${x},${y}) rotate(${rot})" opacity="${k > 0 ? 1 : 0}"><rect x="-70" y="-34" width="140" height="68" rx="4" fill="url(#note2)"/><rect x="-62" y="-26" width="124" height="52" rx="3" fill="none" stroke="#2a5a2a" stroke-width="2"/><circle r="16" fill="#d8ecc8" stroke="#2a5a2a" stroke-width="2"/></g>`; }
    s += `<path d="M520,1280 C510,1100 560,1000 620,960 L700,960 L720,1280Z" fill="#c08a66" opacity="${cash}"/>`; }
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// shot 7: inside a terminal: big glass wall onto the apron, a plane at the jet bridge, a hanging departures screen, seats, travellers with suitcases, a polished floor
function suitcase(x, y, s, col) { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-24" y="-70" width="48" height="70" rx="8" fill="${col}"/><rect x="-24" y="-70" width="48" height="70" rx="8" fill="#000" opacity=".12"/>${[-12, 0, 12].map(k => `<line x1="${k}" y1="-66" x2="${k}" y2="-4" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`).join('')}<rect x="-8" y="-108" width="16" height="40" fill="none" stroke="#555" stroke-width="4"/><circle cx="-14" cy="2" r="5" fill="#222"/><circle cx="14" cy="2" r="5" fill="#222"/></g>`; }
function sceneAirport(t) {
  const st = S0(4) - .2, dl = ease(ramp(t, WS(4, 1) - .2, WS(4, 1) + .4));
  let s = `<defs>${NDEF}<linearGradient id="apS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8ab0"/><stop offset="1" stop-color="#d8e2ea"/></linearGradient>` +
    `<linearGradient id="flr2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8bcc2"/><stop offset="1" stop-color="#6a6e76"/></linearGradient>` +
    `<linearGradient id="ceil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3e46"/><stop offset="1" stop-color="#5a5e66"/></linearGradient></defs>`;
  // ceiling with light strips
  s += `<rect width="720" height="300" fill="url(#ceil)"/>` + Array.from({ length: 5 }, (_, i) => `<rect x="${-40 + i * 170}" y="${60 + i * 6}" width="120" height="10" rx="4" fill="#fff6e0"/><rect x="${-40 + i * 170}" y="${60 + i * 6}" width="120" height="40" fill="#fff6e0" opacity=".12" filter="url(#blur2)"/>`).join('');
  // glass wall onto the apron
  s += `<rect y="300" width="720" height="560" fill="url(#apS2)"/><rect y="700" width="720" height="160" fill="#7a7e84"/>` + Array.from({ length: 8 }, (_, i) => `<line x1="${i * 96}" y1="720" x2="${i * 96 - 80}" y2="860" stroke="#f4e060" stroke-width="3" opacity=".6"/>`).join('');
  s += `<g transform="translate(330,640) scale(1.05)"><path d="M-250,0 C-250,-30 -220,-40 -180,-40 L180,-40 C230,-40 260,-20 270,0 C260,14 230,18 180,18 L-200,18 C-235,18 -250,12 -250,0Z" fill="#f2f4f6"/><path d="M-250,0 C-250,-30 -220,-40 -180,-40 L180,-40" stroke="#c8ccd2" stroke-width="3" fill="none"/>` +
       `<path d="M-250,0 L-282,-120 L-232,-120 L-170,-40Z" fill="#2a5b9a"/><path d="M-40,8 L-150,74 L-96,74 L60,10Z" fill="#c8ced6"/><ellipse cx="-70" cy="40" rx="40" ry="16" fill="#9aa0a8"/><rect x="-110" y="34" width="60" height="14" fill="#8a9098"/>` +
       Array.from({ length: 18 }, (_, i) => `<rect x="${-160 + i * 18}" y="-26" width="8" height="10" rx="3" fill="#2b3a4e"/>`).join('') + `<path d="M218,-26 L248,-22 L252,-10 L224,-12Z" fill="#2b3a4e"/>` +
       `<rect x="-60" y="18" width="6" height="40" fill="#333"/><circle cx="-57" cy="60" r="10" fill="#15171c"/><rect x="190" y="18" width="6" height="40" fill="#333"/><circle cx="193" cy="60" r="10" fill="#15171c"/></g>`;
  s += `<path d="M720,560 L560,600 L560,640 L720,620Z" fill="#c8ccd2"/><path d="M720,560 L560,600 L560,640 L720,620Z" fill="none" stroke="#8a9098" stroke-width="3"/>`;
  // mullions and reflections on the glass
  s += Array.from({ length: 6 }, (_, i) => `<rect x="${i * 144 - 6}" y="300" width="12" height="560" fill="#2a2e36"/>`).join('') + `<rect y="300" width="720" height="10" fill="#2a2e36"/><rect y="852" width="720" height="12" fill="#2a2e36"/>` +
       `<path d="M40,310 L180,310 L60,850 L-20,850Z" fill="#fff" opacity=".07"/><path d="M420,310 L500,310 L380,850 L320,850Z" fill="#fff" opacity=".05"/>`;
  // hanging departures screen
  const rows = [['القاهرة', '08:10'], ['دبي', '08:40'], ['إسطنبول', '09:15'], ['لندن', '09:50'], ['بغداد', '10:20']];
  s += `<line x1="220" y1="0" x2="220" y2="110" stroke="#222" stroke-width="4"/><line x1="500" y1="0" x2="500" y2="110" stroke="#222" stroke-width="4"/><rect x="110" y="110" width="500" height="250" rx="10" fill="#0e121a" stroke="#3a3e46" stroke-width="8"/>` +
       `<rect x="118" y="118" width="484" height="40" fill="#1b2438"/><text x="590" y="146" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="22" fill="#fff" direction="rtl">المغادرون</text>` +
       rows.map(([c, h], i) => `<text x="590" y="${190 + i * 36}" text-anchor="end" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="#ffd76a" direction="rtl">${c}</text><text x="360" y="${190 + i * 36}" text-anchor="middle" font-family="Space Grotesk" font-weight="700" font-size="21" fill="#ffd76a">${h}</text>` +
         `<text x="140" y="${190 + i * 36}" font-family="Noto Naskh Arabic" font-weight="700" font-size="21" fill="${mix('#7ae08a', '#ff6b6b', ease(ramp(dl, i * .12, i * .12 + .3)))}" direction="rtl">${dl > i * .12 + .15 ? 'متأخرة' : 'في الموعد'}</text>`).join('') +
       `<path d="M118,118 L300,118 L118,350Z" fill="#fff" opacity=".04"/>`;
  // polished floor with reflections of the windows and lights
  s += `<rect y="864" width="720" height="416" fill="url(#flr2)"/>` + Array.from({ length: 6 }, (_, i) => `<rect x="${i * 144 - 6}" y="864" width="12" height="200" fill="#2a2e36" opacity=".25" filter="url(#blur2)"/>`).join('') + `<rect y="864" width="720" height="120" fill="#cfe0f0" opacity=".18" filter="url(#blur2)"/>` +
       Array.from({ length: 8 }, (_, i) => `<line x1="${i * 110 - 20}" y1="864" x2="${i * 160 - 300}" y2="1280" stroke="#5a5e66" stroke-width="2" opacity=".5"/>`).join('');
  // a row of metal seats
  for (let i = 0; i < 6; i++) { const x = 70 + i * 100; s += `<rect x="${x}" y="1010" width="84" height="16" rx="6" fill="#1a1c22"/><rect x="${x + 6}" y="960" width="72" height="52" rx="8" fill="#26282e"/><rect x="${x + 36}" y="1026" width="10" height="40" fill="#8a8e96"/>`; }
  s += `<rect x="60" y="1060" width="610" height="10" fill="#8a8e96"/>`;
  // travellers with suitcases, waiting
  [[120, 1, '#c83a2a'], [300, -1, '#2a6ac8'], [470, 1, '#e8a020'], [630, -1, '#3a8a4a']].forEach(([x, f, col], i) => { s += suitcase(x + f * 46, 1196, .9, col) + person(x, 1200, { s: .78, face: f, top: CROWD[i].top, pants: CROWD[i].pants, skin: CROWD[i].skin, hair: CROWD[i].hair, phone: i % 2, lookUp: .45, t }); });
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
// shot 8: a container port: STS cranes standing idle, stacked containers, ships waiting at anchor, a tug, realistic water
function container(x, y, w, h, col) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}"/><rect x="${x}" y="${y}" width="${w}" height="${h * .18}" fill="#fff" opacity=".18"/><rect x="${x + w * .82}" y="${y}" width="${w * .18}" height="${h}" fill="#000" opacity=".22"/>` +
    Array.from({ length: Math.floor(w / 6) }, (_, k) => `<line x1="${x + 3 + k * 6}" y1="${y + 2}" x2="${x + 3 + k * 6}" y2="${y + h - 2}" stroke="#000" stroke-opacity=".16" stroke-width="1.6"/>`).join('') + `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#000" stroke-opacity=".3" stroke-width="1"/>`;
}
function ship(x, y, s, seed, t) {
  const r = RS(seed), cols = ['#c83a2a', '#2a6ac8', '#e8a020', '#3a8a4a', '#8a3ac8', '#c8c8c8', '#2a8a8a'];
  let o = `<g transform="translate(${x},${y}) scale(${s})">`;
  // reflection
  o += `<g transform="translate(0,52) scale(1,-.5)" opacity=".25"><path d="M-300,0 L300,0 L270,60 L-250,60 C-280,50 -300,30 -300,0Z" fill="#1a2028"/></g>`;
  // hull: black topsides, red anti-fouling below the waterline band
  o += `<path d="M-310,-30 L320,-30 L300,40 L-260,40 C-290,30 -312,10 -310,-30Z" fill="#1e2228"/><path d="M-300,22 L304,22 L300,40 L-260,40 C-280,34 -292,28 -300,22Z" fill="#9a2a1e"/><line x1="-308" y1="-24" x2="318" y2="-24" stroke="#fff" stroke-width="2" opacity=".5"/>`;
  // containers in bays
  for (let b = 0; b < 9; b++) for (let tier = 0; tier < 3 + (b % 3 === 1 ? 1 : 0); tier++) o += container(-280 + b * 54, -58 - tier * 28, 52, 26, cols[Math.floor(r() * cols.length)]);
  // superstructure (bridge) at the stern with windows and a funnel
  o += `<rect x="210" y="-140" width="80" height="110" fill="#f2f2f0"/><rect x="200" y="-150" width="100" height="14" fill="#e0e0dc"/>` + Array.from({ length: 4 }, (_, k) => `<rect x="${216}" y="${-130 + k * 24}" width="68" height="8" fill="#2a3442"/>`).join('') + `<rect x="270" y="-182" width="22" height="34" fill="#c83a2a"/><rect x="270" y="-182" width="22" height="8" fill="#1a1a1a"/>`;
  return o + `</g>`;
}
function scenePort(t) {
  const st = S0(5) - .2;
  let s = `<defs>${NDEF}<linearGradient id="ptS2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a8eb8"/><stop offset=".8" stop-color="#d8e2ea"/><stop offset="1" stop-color="#e8e4dc"/></linearGradient>` +
    `<linearGradient id="seaP" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a98b0"/><stop offset=".2" stop-color="#3a6a8a"/><stop offset="1" stop-color="#14344c"/></linearGradient></defs>`;
  s += `<rect width="720" height="1280" fill="url(#ptS2)"/><g filter="url(#haze)" opacity=".6">` + Array.from({ length: 4 }, (_, i) => `<ellipse cx="${pmod(i * 230 + t * 6, 900) - 90}" cy="${300 + i * 40}" rx="200" ry="14" fill="#fff"/>`).join('') + `</g>`;
  const HZ = 640;
  // sea with perspective swell lines, sparkle and a hazy horizon
  s += `<rect y="${HZ}" width="720" height="${1280 - HZ}" fill="url(#seaP)"/><rect y="${HZ - 6}" width="720" height="24" fill="#e8eef2" opacity=".5" filter="url(#blur2)"/>`;
  for (let k = 1; k < 26; k++) { const y = HZ + Math.pow(k / 25, 1.7) * 640; let d = `M-20,${y}`; for (let x = -20; x <= 740; x += 40) d += ` q20,${-1.5 - k * .2} 40,0`;
    s += `<path d="${d}" stroke="${k % 2 ? '#cfe2ee' : '#0e2a40'}" stroke-width="${1 + k * .09}" fill="none" opacity="${.12 + .015 * k}" transform="translate(${Math.sin(t * .7 + k) * 10},0)"/>`; }
  const rs = RS(44); for (let i = 0; i < 70; i++) { const u = rs(), y = HZ + 10 + u * u * 600, x = rs() * 720; s += `<rect x="${x}" y="${y}" width="${3 + u * 12}" height="1.6" fill="#fff" opacity="${(.2 + .5 * rs()) * (.5 + .5 * Math.sin(t * 5 + i))}"/>`; }
  // ships waiting at anchor (far = smaller, hazier)
  s += `<g opacity=".7">${ship(560, HZ + 26, .32, 3, t)}</g><g opacity=".85">${ship(170, HZ + 60, .46, 5, t)}</g>`;
  // a tug with a wake
  const tx = pmod(t * 22, 900) - 120; s += `<path d="M${tx - 140},${HZ + 222} Q${tx - 70},${HZ + 212} ${tx - 10},${HZ + 218}" stroke="#fff" stroke-width="4" fill="none" opacity=".6"/><g transform="translate(${tx},${HZ + 210}) scale(.55)"><path d="M-60,0 L60,0 L50,22 L-50,22Z" fill="#1e2228"/><path d="M-50,16 L52,16 L50,22 L-50,22Z" fill="#9a2a1e"/><rect x="-30" y="-36" width="50" height="36" fill="#f2f2f0"/><rect x="-24" y="-30" width="38" height="8" fill="#2a3442"/><rect x="0" y="-56" width="12" height="20" fill="#e8a020"/></g>`;
  // the quay in the foreground with stacked containers and two STS cranes
  const Q = 960;
  s += `<path d="M-20,${Q} L740,${Q - 20} L740,1300 L-20,1300Z" fill="#7a7a78"/><path d="M-20,${Q} L740,${Q - 20}" stroke="#e8e4dc" stroke-width="6"/><path d="M-20,${Q + 22} L740,${Q + 2}" stroke="#4a4a48" stroke-width="20"/>`;
  for (let i = 0; i < 6; i++) { const bx = 40 + i * 130; s += `<rect x="${bx}" y="${Q - 30 - i * 3.4}" width="16" height="22" rx="4" fill="#2a2a2a"/><path d="M${bx + 8},${Q - 26 - i * 3.4} Q${bx + 40},${Q + 30} ${bx + 70},${Q + 80}" stroke="#d8c8a0" stroke-width="4" fill="none" opacity="${i % 2 ? .0 : .9}"/>`; }
  const cols = ['#c83a2a', '#2a6ac8', '#e8a020', '#3a8a4a', '#8a3ac8', '#2a8a8a'];
  for (let r2 = 0; r2 < 5; r2++) for (let c = 0; c < 7; c++) s += container(10 + c * 100 - r2 * 6, Q + 130 - r2 * 46 + c * 2, 96, 44, cols[(r2 * 5 + c * 3) % 6]);
  [[110, '#d8402a'], [470, '#2a6ac8']].forEach(([x, col]) => { const top = 330;
    s += `<g><path d="M${x},${Q - 14} L${x + 26},${top} L${x + 46},${top} L${x + 30},${Q - 14}Z M${x + 150},${Q - 22} L${x + 130},${top} L${x + 150},${top} L${x + 180},${Q - 22}Z" fill="${col}"/>` +
      `<rect x="${x - 120}" y="${top - 24}" width="420" height="26" fill="${col}"/><path d="M${x - 120},${top - 24} L${x + 300},${top - 24}" stroke="#fff" stroke-width="2" opacity=".4"/>` +
      `<path d="M${x + 36},${top - 24} L${x + 90},${top - 120} L${x + 140},${top - 24}" stroke="${col}" stroke-width="10" fill="none"/><line x1="${x + 90}" y1="${top - 120}" x2="${x - 120}" y2="${top - 24}" stroke="#333" stroke-width="2"/><line x1="${x + 90}" y1="${top - 120}" x2="${x + 300}" y2="${top - 24}" stroke="#333" stroke-width="2"/>` +
      `<rect x="${x + 40}" y="${top + 2}" width="40" height="30" fill="#f2f2f0"/><rect x="${x + 46}" y="${top + 8}" width="28" height="12" fill="#2a3442"/><line x1="${x + 60}" y1="${top + 32}" x2="${x + 60}" y2="${top + 260}" stroke="#222" stroke-width="2"/><rect x="${x + 36}" y="${top + 260}" width="48" height="12" fill="#e8a020"/>` +
      `<rect x="${x + 50}" y="${top + 40}" width="70" height="${Q - top - 70}" fill="none" stroke="${col}" stroke-width="6" opacity=".9"/></g>`; });
  s += `<rect width="720" height="1280" fill="#d8e2ea" opacity=".06"/>`;
  F.ov = ''; F.earth = null; F.moon = null;
  return s;
}
