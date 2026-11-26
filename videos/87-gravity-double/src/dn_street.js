// streetD: streetO (#67) with an o.back layer drawn between the far city and the buildings (#81)
function streetD(t, o = {}) {
  const N = o.N || 0, id = o.id || 'o';
  const sky = [mix('#3e78bc', '#060c24', N), mix('#9cc4e6', '#16224a', N), mix('#f4e2c4', '#3a3660', N)];
  let s = `<defs>${DEFN()}${mulF('sf' + id, N * .9)}<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset=".6" stop-color="${sky[1]}"/><stop offset="1" stop-color="${sky[2]}"/></linearGradient></defs><rect x="-200" y="-200" width="1120" height="1500" fill="url(#sk${id})"/>`;
  s += sun3(120, 600, .7 * (1 - N)) + cumulus(300 + t * 1.5, 470, 250, 21, { a: .7 * (1 - N) }) + cumulus(640 + t, 530, 170, 23, { a: .6 * (1 - N) });
  let g = farCity(31, 905, mix(sky[2], '#58607a', .45)) + `<rect x="-20" y="780" width="760" height="125" fill="${sky[2]}" opacity=".22"/>`, e = '';
  g += o.back || '';
  (o.blocks || [[-12, 166, 400, '#c4a07a', 961, 1], [154, 144, 480, '#6a7e92', 962, 2], [298, 158, 360, '#d8c4a4', 963, 0], [456, 140, 440, '#9a6a5a', 964, 1], [596, 160, 500, '#7a8a7a', 965, 2]]).forEach(([x, w, h, c, sd, k]) => { const b = blockN(x, PV, w, h, c, sd, k); g += b.s; e += b.e; });
  const sh = o.shops ? (() => { const keep = SHOPB.slice(); SHOPB.splice(0, SHOPB.length, ...o.shops); const r = shopRowB(PV); SHOPB.splice(0, SHOPB.length, ...keep); return r; })() : shopRowO(PV); g += sh.s; e += sh.e;
  g += `<rect x="-20" y="${PV - 20}" width="760" height="20" fill="url(#aoUp)" opacity=".5"/>`;
  g += `<rect x="-200" y="${PV}" width="1120" height="${KB - PV}" fill="#c4b8a4"/><rect x="-20" y="${PV}" width="760" height="${KB - PV}" fill="#000" filter="url(#grainR)" opacity=".25"/><rect x="-20" y="${PV}" width="760" height="26" fill="url(#aoDn)" opacity=".7"/>`;
  for (let q = 0; q < 6; q++) for (let r = 0; r < 16; r++) g += `<rect x="${r * 48 - 20 + (q % 2) * 24}" y="${PV + q * 17 + 2}" width="46" height="15" fill="none" stroke="#a89c88" stroke-width="1.2"/>`;
  g += `<rect x="-200" y="${KB}" width="1120" height="12" fill="#e2ddd0"/><rect x="-200" y="${KB + 8}" width="1120" height="4" fill="#8a8478"/>`;
  g += `<rect x="-200" y="${KB + 12}" width="1120" height="${1500 - KB}" fill="#484a50"/><rect x="-20" y="${KB + 12}" width="760" height="${1290 - KB}" fill="#000" filter="url(#grainR)" opacity=".5"/><rect x="-20" y="${KB + 12}" width="760" height="16" fill="url(#aoDn)" opacity=".6"/>` +
    Array.from({ length: 8 }, (_, i) => `<rect x="${i * 120 - 30}" y="1210" width="64" height="7" fill="#e8e4d8" opacity=".8"/>`).join('');
  [[130, 280, 51], [600, 300, 53]].forEach(([px, h, sd]) => { const py = PV + 60; g += `<rect x="${px - 30}" y="${py - 8}" width="60" height="16" fill="#5a5048"/><rect x="${px - 26}" y="${py - 5}" width="52" height="10" fill="#3a2a1e"/>` + treeR(px, py - 2, h, sd, t); });
  const lamps = [[300, 0]]; lamps.forEach(([lx]) => { g += lampD(lx, PV + 80, 250); });
  g += o.fg || '';
  s += `<g filter="url(#sf${id})">${g}</g>`;
  if (N > .02) s += `<g opacity="${N.toFixed(2)}">${e}` + lamps.map(([lx]) => scr(`<circle cx="${lx + 65}" cy="${PV - 168}" r="170" fill="url(#lampG)" opacity=".85"/>`)).join('') + `</g>`;
  if (o.top) s += o.top;
  return s;
}
