function thermoC(x, top, bot, v) {
  const yOf = c => lerp(bot - 50, top + 30, (c + 30) / 70);
  let s = `<rect x="${x - 28}" y="${top}" width="56" height="${bot - top}" rx="28" fill="#f4f6f8" opacity=".94"/><rect x="${x - 10}" y="${top + 16}" width="20" height="${bot - top - 50}" rx="10" fill="#d8dee4"/><circle cx="${x}" cy="${bot - 32}" r="22" fill="#d32f2f"/><rect x="${x - 6}" y="${yOf(v)}" width="12" height="${bot - 32 - yOf(v)}" fill="#d32f2f"/>`;
  for (let c = -30; c <= 40; c += 10) s += `<rect x="${x + 12}" y="${yOf(c) - 1}" width="12" height="2" fill="#333"/><text x="${x + 30}" y="${yOf(c) + 6}" font-family="Space Grotesk" font-weight="700" font-size="17" fill="#fff" style="paint-order:stroke" stroke="#000" stroke-width="3">${c}°</text>`;
  return s;
}
// 2: just 10% farther: the same Baghdad street in thinner, cooler light; people in coats; the thermometer falls
