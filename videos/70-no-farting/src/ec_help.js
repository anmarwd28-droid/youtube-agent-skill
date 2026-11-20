// ec_help.js: ecg from nt_b.js (#68)
function ecg(x0, x1, y, t, a) { let d = ''; for (let x = x0; x <= x1; x += 3) { const ph = pmod((x - x0) / 160 - t * 1.2, 1); let v = 0; if (ph > .4 && ph < .44) v = -(ph - .4) * 1500; else if (ph >= .44 && ph < .48) v = -60 + (ph - .44) * 3000; else if (ph >= .48 && ph < .52) v = 60 - (ph - .48) * 1500; else if (ph > .62 && ph < .74) v = -16 * Math.sin((ph - .62) / .12 * Math.PI); d += (x === x0 ? 'M' : ' L') + x + ',' + (y + v).toFixed(1); }
  return `<path d="${d}" stroke="#4af09a" stroke-width="4" fill="none" opacity="${a.toFixed(2)}"/>`; }
