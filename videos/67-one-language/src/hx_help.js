// hx_help.js: cellT (#57 cv_c.js), scaleW (#61 cb_b.js), deskP (#63 iq_c.js) without their scenes
function cellT(x, y, R, seed, t, col) {   // an immune cell: a pale sphere with short bumps
  const r = RS(seed); let d = '';
  for (let i = 0; i <= 40; i++) { const a = i / 40 * 6.283, k = 1 + .05 * Math.sin(a * 9 + seed) + .03 * Math.sin(a * 17 + t * 2 + seed); d += (i ? ' L' : 'M') + (x + Math.cos(a) * R * k).toFixed(1) + ',' + (y + Math.sin(a) * R * k).toFixed(1); }
  return `<path d="${d}Z" fill="url(#tc${col})"/>` + Array.from({ length: 14 }, (_, i) => { const a = i / 14 * 6.283 + seed, bx = x + Math.cos(a) * R * .98, by = y + Math.sin(a) * R * .98; return `<circle cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" r="${(R * .08).toFixed(1)}" fill="#e8f4ff" opacity=".7"/>`; }).join('') +
    `<ellipse cx="${(x - R * .3).toFixed(1)}" cy="${(y - R * .35).toFixed(1)}" rx="${(R * .35).toFixed(1)}" ry="${(R * .22).toFixed(1)}" fill="#fff" opacity=".3"/>`;
}
function scaleW(x, y, kg, title, col) {
  let g = `<ellipse cx="${x}" cy="${y + 64}" rx="104" ry="12" fill="#000" opacity=".45" filter="url(#blur2)"/>` +
    `<rect x="${x - 100}" y="${y - 50}" width="200" height="112" rx="26" fill="#6a707a"/><rect x="${x - 100}" y="${y - 58}" width="200" height="112" rx="26" fill="url(#helG)"/>` +
    `<rect x="${x - 100}" y="${y - 58}" width="200" height="112" rx="26" fill="#000" filter="url(#grainR)" opacity=".12"/>` +
    `<rect x="${x - 58}" y="${y - 44}" width="116" height="46" rx="8" fill="#1a2a22"/><rect x="${x - 58}" y="${y - 44}" width="116" height="16" rx="8" fill="#fff" opacity=".07"/>` +
    `<text x="${x}" y="${y - 9}" text-anchor="middle" font-family="DejaVu Sans Mono,monospace" font-weight="700" font-size="34" fill="#9cf0b0">${kg}</text><text x="${x}" y="${y + 30}" text-anchor="middle" font-family="Noto Naskh Arabic" font-weight="700" font-size="20" fill="#5a6270">كغ</text>` +
    `<ellipse cx="${x - 62}" cy="${y + 26}" rx="20" ry="11" fill="#000" opacity=".1"/><ellipse cx="${x + 62}" cy="${y + 26}" rx="20" ry="11" fill="#000" opacity=".1"/>`;
  return g + lbl(x, y + 112, title, 1, col, 26);
}
function deskP(x, y, s, i, t) {   // a person seated at a desk, facing right, writing; (x, y) = floor under the hips
  let g = `<path d="M${x - 34 * s},${y - 76 * s} h${54 * s} M${x - 30 * s},${y - 76 * s} V${y} M${x + 16 * s},${y - 76 * s} V${y} M${x - 34 * s},${y - 80 * s} V${y - 190 * s}" stroke="#3a3a42" stroke-width="${6 * s}"/><rect x="${x - 36 * s}" y="${y - 84 * s}" width="${58 * s}" height="${10 * s}" rx="${3 * s}" fill="#5a4a3a"/>`;
  const wr = Math.sin(t * 9 + i * 2) * 4 * s;
  g += hero(x - 4 * s, y, Object.assign({}, SEAT, { s, face: 1, shade: 1, lean: 14, hF: [x + 74 * s + wr, y - 150 * s], hB: [x + 60 * s, y - 146 * s], lookUp: -.45, noShadow: 1 }, gp(i)));
  g += `<rect x="${x + 36 * s}" y="${y - 148 * s}" width="${110 * s}" height="${10 * s}" fill="#b08a5a"/><path d="M${x + 44 * s},${y - 138 * s} V${y} M${x + 138 * s},${y - 138 * s} V${y}" stroke="#4a3a2a" stroke-width="${6 * s}"/><rect x="${x + 56 * s}" y="${y - 152 * s}" width="${50 * s}" height="${4 * s}" fill="#f6f4ee"/>`;
  return g;
}
