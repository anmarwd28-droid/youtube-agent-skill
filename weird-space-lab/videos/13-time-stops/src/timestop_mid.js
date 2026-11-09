// ===================== Weird Space Lab: What if time stopped for everyone except you? =====================
const tStop = () => WS(0, 3), tGo = () => WS(6, 2);
const frozenAt = (t) => (t > tStop() && t < tGo()) ? tStop() : t;          // the world's clock
const FRZ = `<filter id="frz" x="0" y="0" width="100%" height="100%"><feColorMatrix type="saturate" values=".25"/></filter>`;
// a busy street; tw is the world's time (frozen), you stay live
function cityScene(t, tw, id, f = 0) {
  let s = wStreet(tw, { id });
  // traffic that moves only with world time
  const cx = ((tw * 160) % 1000) - 140;
  s += car(cx, 1250, .9, '#3a6aa0', 1, 0);
  // walkers and birds
  s += onWalk(140 + ((tw * 40) % 300), 1088, CROWD[0], .55, 1, tw, { moving: 1, phase: tw * 6 }) + onWalk(620 - ((tw * 30) % 300), 1082, CROWD[1], .52, -1, tw, { moving: 1, phase: tw * 6 + 1 });
  for (let i = 0; i < 4; i++) s += bird(120 + i * 130 + ((tw * 60) % 200), 520 + i * 40 + Math.sin(tw * 2 + i) * 14, 1.1, tw * 12 + i, 0);
  // a ball thrown in the air
  const bt = (tw * .8) % 1.6, by = 1000 - Math.sin(Math.min(bt, 1.6) / 1.6 * Math.PI) * 220;
  s += `<circle cx="360" cy="${by}" r="16" fill="#f4f4f0"/><path d="M344,${by} A16,16 0 0 1 376,${by}" fill="#d64040"/>`;
  return `<defs>${FRZ}</defs><g ${f > .5 ? 'filter="url(#frz)"' : ''}>${s}</g>` + `<rect width="720" height="1280" fill="#6a8ab0" opacity="${.18 * f}"/>`;
}
// you: the one person who keeps moving, looking around
const you = (t, a = 1) => `<g opacity="${a}">` + castSh(470, 1094, .58) + onWalk(470, 1094, CROWD[2], .58, -1, t, { lookUp: .25 + .15 * Math.sin(t * 1.5) }) + `</g>`;
function sceneHook(t) {
  const f = ramp(t, tStop(), tStop() + .3);
  let s = cityScene(t, frozenAt(t), 't0', f) + you(t);
  F.ov = `<g opacity="${f}"><circle cx="600" cy="560" r="62" fill="#f4f4f0" stroke="#333" stroke-width="6"/><path d="M600,560 L600,512" stroke="#c62828" stroke-width="5"/><path d="M600,560 L630,575" stroke="#111" stroke-width="6"/>` + EN('00:00:00', 600, 660, 22, '#fff', 'middle', 800) + `</g>`;
  F.flash = t > tStop() && t < tStop() + .25 ? .3 * (1 - (t - tStop()) / .25) : 0; return s;
}
function sceneFrozen(t) { let s = cityScene(t, frozenAt(t), 't1', 1) + you(t); F.ov = ''; F.flash = 0; return s; }
// light freezes: photons hang in the air between the lamp and your eye – darkness
function sceneDark(t) {
  const d = ease(ramp(t, WS(2, 5), WS(2, 16)));
  let s = cityScene(t, frozenAt(t), 't2', 1) + you(t) + `<rect width="720" height="1280" fill="#000" opacity="${.92 * d}"/>`;
  let ph = ''; const r = RS(5); for (let i = 0; i < 26; i++) { const q = r(); ph += `<circle cx="${lerp(150, 455, q) + (r() - .5) * 20}" cy="${lerp(470, 790, q) + (r() - .5) * 30}" r="3" fill="#fff6d0" opacity="${.9}"/>`; }
  F.ov = `<g opacity="${ease(ramp(t, WS(2, 1), WS(2, 4)))}">${ph}` + EN('light, frozen in mid-air', 300, 440, 22, '#fff6d0', 'middle', 700) + `</g>`; F.flash = 0; return s;
}
// silence: sound waves frozen as still rings in the dark
function sceneSilence(t) {
  let s = `<rect width="720" height="1280" fill="#030305"/>`;
  F.ov = Array.from({ length: 6 }, (_, i) => `<circle cx="360" cy="760" r="${60 + i * 50}" fill="none" stroke="#7ab4ff" stroke-width="3" opacity="${.35 - i * .05}" stroke-dasharray="4 10"/>`).join('') +
    `<g transform="translate(360,760)"><path d="M-40,-20 L-10,-20 L20,-50 L20,50 L-10,20 L-40,20Z" fill="#cfd8e8"/><path d="M40,-30 L90,30 M90,-30 L40,30" stroke="#e53935" stroke-width="8"/></g>`; F.flash = 0; return s;
}
// the air itself frozen: a close-up of nitrogen and oxygen molecules stuck in place, like a wall
function sceneAir(t) {
  const k = ease(ramp(t, WS(4, 7), WS(4, 11))), w = ease(ramp(t, WS(4, 14), WS(4, 15) + .3));
  let s = `<rect width="720" height="1280" fill="#05070c"/>` + wPanel(30, 460, 660, 760, 'AIR, ZOOMED IN');
  const r = RS(9); let m = ''; for (let i = 0; i < 60; i++) { const x = 70 + r() * 580, y = 520 + r() * 640, a = r() * 180, ox = r() < .21, jig = (1 - k) * Math.sin(t * 9 + i) * 8;
    m += `<g transform="translate(${x + jig},${y + jig * .6}) rotate(${a + (1 - k) * t * 90})"><circle cx="-9" cy="0" r="10" fill="${ox ? '#e05a5a' : '#5a8ae0'}"/><circle cx="9" cy="0" r="10" fill="${ox ? '#e05a5a' : '#5a8ae0'}"/><circle cx="-12" cy="-3" r="3" fill="#fff" opacity=".5"/></g>`; }
  s += m;
  F.ov = `<g opacity="${k}">` + EN('N₂', 120, 1190, 22, '#7aa8ff', 'start') + EN('O₂', 190, 1190, 22, '#ff8a8a', 'start') + `</g>` + `<g opacity="${w}"><path d="M60,520 L660,520 L660,1180 L60,1180Z" fill="none" stroke="#f4c76b" stroke-width="4" stroke-dasharray="12 8"/></g>`;
  F.flash = 0; return s;
}
// trapped in the dark, unable to move or breathe
function sceneTrapped(t) {
  let s = `<rect width="720" height="1280" fill="#020203"/>` + `<g opacity=".18">${you(t)}</g>`;
  F.ov = `<g transform="translate(470,860)" opacity="${.6 + .4 * Math.abs(Math.sin(t * 3))}"><path d="M0,14 C-4,6 -22,2 -22,-10 C-22,-22 -6,-24 0,-12 C6,-24 22,-22 22,-10 C22,2 4,6 0,14Z" fill="#c62838" transform="scale(1.6)"/></g>`; F.flash = 0; return s;
}
// time restarts – colour and motion return, nobody noticed
function sceneRestart(t) {
  const f = 1 - ramp(t, tGo(), tGo() + .4);
  let s = cityScene(t, frozenAt(t) + (t > tGo() ? t - tGo() : 0), 't6', f) + you(t) + `<rect width="720" height="1280" fill="#000" opacity="${.9 * (1 - ramp(t, S0(6) - .2, tGo()))}"/>`;
  F.ov = ''; F.flash = t > tGo() && t < tGo() + .25 ? .25 * (1 - (t - tGo()) / .25) : 0; return s;
}
function sceneEnd(t) { let s = space(t, '#03050f', '#0a1030'); F.ov = endCard(t, WS(7, 0), WS(7, 7)); F.flash = 0; return s; }

const SCENES = [
  { s: 0, f: sceneHook }, { s: S0(1) - .2, f: sceneFrozen }, { s: S0(2) - .2, f: sceneDark }, { s: S0(3) - .2, f: sceneSilence }, { s: S0(4) - .2, f: sceneAir },
  { s: S0(5) - .2, f: sceneTrapped }, { s: S0(6) - .2, f: sceneRestart }, { s: S0(7) - .2, f: sceneEnd },
];
const XF = .5;
const TLI = [['Frozen world', S0(1)], ['Darkness', S0(2)], ['Silence', S0(3)], ['Air like a wall', S0(4)]];
const LIST_ON = new Set([sceneFrozen]);
const CHIPS = [
  ['c1', 'Everything frozen… except you', 360, 330, 'big', WS(1, 5), S0(2) - .3],
  ['c2', 'Completely dark', 360, 330, 'red', WS(2, 15), S0(3) - .3],
  ['c3', 'Total silence', 360, 330, 'big', WS(3, 8), S0(4) - .3],
  ['c4', 'Air like an invisible wall', 360, 330, 'red', WS(4, 13), S0(5) - .3],
  ['c5', 'Nobody would know', 360, 330, 'big', WS(6, 5), S0(7) - .3],
  ['c6', 'Weird Space Lab', 360, 1200, 'dark', WS(7, 7), 999],
];
setupUI('TIME STOPPED', TLI, CHIPS);
