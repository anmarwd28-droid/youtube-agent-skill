// three.js-only world for "ماذا لو؟ Lab" (first used for the flat-Earth Short). No outside assets:
// Earth and Moon use the three.js textures already in tex/ (the same Earth as the published Shorts); everything else is
// geometry, lights, the three.js Sky and Water objects, and textures generated in code (brick, plaster, asphalt, paving, rock, bark, leaves).
// Sets, chosen per frame by F.w.set: space | street | sea | edge.  Crossfades: GLA.draw(prev) then GL.draw(cur).
import * as THREE from 'three';
import { Water } from './jsm/objects/Water.js';
import { Sky } from './jsm/objects/Sky.js';
import { mergeVertices } from './jsm/utils/BufferGeometryUtils.js';

const W = 720, H = 1280; let PREV = null;
const RNG = s => () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
// ---------- procedural textures (tileable value noise) ----------
const hsh = (x, y, s) => { let h = (x * 374761393 + y * 668265263 + s * 982451653) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967295; };
function vn(x, y, s, P) { const i = Math.floor(x), j = Math.floor(y), fx = x - i, fy = y - j, ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy), m = v => ((v % P) + P) % P;
  const a = hsh(m(i), m(j), s), b = hsh(m(i + 1), m(j), s), c = hsh(m(i), m(j + 1), s), d = hsh(m(i + 1), m(j + 1), s); return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy; }
const fbm = (x, y, s, P, oct = 5) => { let v = 0, a = .5, f = 1, n = 0; for (let o = 0; o < oct; o++) { v += a * vn(x * f, y * f, s + o, P * f); n += a; a *= .5; f *= 2; } return v / n; };
function texFrom(N, fn, srgb, rep, hscale = 3) {   // fn(x,y) -> [r,g,b,h] ; returns {map, normalMap}
  const col = new Uint8ClampedArray(N * N * 4), hh = new Float32Array(N * N);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const [r, g, b, h] = fn(x, y), i = y * N + x; col[i * 4] = r; col[i * 4 + 1] = g; col[i * 4 + 2] = b; col[i * 4 + 3] = 255; hh[i] = h; }
  const nor = new Uint8ClampedArray(N * N * 4);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) { const H0 = (a, b) => hh[((b + N) % N) * N + ((a + N) % N)], dx = (H0(x + 1, y) - H0(x - 1, y)) * hscale, dy = (H0(x, y + 1) - H0(x, y - 1)) * hscale, l = Math.hypot(dx, dy, 1), i = (y * N + x) * 4;
    nor[i] = (-dx / l * .5 + .5) * 255; nor[i + 1] = (dy / l * .5 + .5) * 255; nor[i + 2] = (1 / l * .5 + .5) * 255; nor[i + 3] = 255; }
  const mk = (data, cs) => { const c = document.createElement('canvas'); c.width = c.height = N; c.getContext('2d').putImageData(new ImageData(data, N, N), 0, 0); const t = new THREE.CanvasTexture(c); t.colorSpace = cs; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; if (rep) t.repeat.set(rep[0], rep[1]); return t; };
  return { map: mk(col, srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace), normalMap: mk(nor, THREE.NoColorSpace) };
}
const hex = c => [(c >> 16) & 255, (c >> 8) & 255, c & 255];
const lerpC = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const GEN = {
  brick(seed, base) { const N = 512, rows = 26, rh = N / rows, per = 9, bw = N / per, B = hex(base), M = [196, 190, 178];
    return texFrom(N, (x, y) => { const row = Math.floor(y / rh), off = (row % 2) * bw / 2, bx = Math.floor(((x + off) % N) / bw), lx = (x + off) % bw, ly = y - row * rh, mort = lx < 3 || ly < 3;
      const v = hsh(bx, row, seed), n = fbm(x / 32, y / 32, seed, N / 32, 4), c = lerpC(B, v < .2 ? [90, 52, 40] : v > .85 ? [190, 120, 90] : B, .6) .map(q => q * (.82 + .3 * n + .12 * (hsh(x, y, seed + 9) - .5)));
      const e = Math.min(lx, bw - lx, ly, rh - ly); return mort ? [...M.map(q => q * (.85 + .2 * n)), 0] : [...c, Math.min(1, (e - 2) / 3) * (.9 + .1 * n)]; }, true, null, 2.5); },
  plaster(seed, base) { const N = 512, B = hex(base);
    return texFrom(N, (x, y) => { const n = fbm(x / 64, y / 64, seed, N / 64, 5), f = fbm(x / 8, y / 8, seed + 3, N / 8, 3), st = fbm(x / 32, y / 32, seed + 7, N / 32, 3);
      const k = .86 + .16 * n + .06 * (f - .5) - .14 * Math.max(0, st - .58) * 3; return [...B.map(q => q * k), n * .6 + f * .4]; }, true, null, 1.5); },
  panels(seed, base) { const N = 512, B = hex(base);
    return texFrom(N, (x, y) => { const gx = x % 256, gy = y % 128, j = gx < 3 || gy < 3, n = fbm(x / 64, y / 64, seed, N / 64, 5), v = hsh(Math.floor(x / 256), Math.floor(y / 128), seed);
      const k = j ? .55 : (.9 + .12 * n + .08 * (v - .5)); return [...B.map(q => q * k), j ? 0 : .8 + .2 * n]; }, true, null, 2); },
  asphalt(seed) { const N = 512;
    return texFrom(N, (x, y) => { const n = fbm(x / 64, y / 64, seed, N / 64, 5), g = hsh(x, y, seed), sp = g > .93 ? .35 : g < .06 ? -.25 : 0, c = 54 + 22 * n + 60 * sp;
      return [c, c, c * 1.03, g * .6 + n * .4]; }, true, [24, 4], 1.2); },
  paving(seed) { const N = 512;
    return texFrom(N, (x, y) => { const rw = 128, row = Math.floor(y / 85.3), off = (row % 2) * 64, bx = Math.floor((x + off) / rw), lx = (x + off) % rw, ly = y - row * 85.3, gap = lx < 3 || ly < 3;
      const v = hsh(bx, row, seed), n = fbm(x / 32, y / 32, seed, N / 32, 4), c = 170 + 30 * (v - .5) + 26 * (n - .5); return gap ? [92, 88, 82, 0] : [c, c * .97, c * .92, .7 + .3 * n]; }, true, [40, 3], 2); },
  rock(seed, a = [176, 150, 118], b = [96, 82, 68], rep, strata = 0, crk = 1) { const N = 512;
    return texFrom(N, (x, y) => { const f = fbm(x / 128, y / 128, seed, N / 128, 6), g = fbm(x / 16, y / 16, seed + 3, N / 16, 3), sp = hsh(x, y, seed), rg = 1 - Math.abs(2 * fbm(x / 64, y / 64, seed + 5, N / 64, 5) - 1), cr = Math.max(0, (rg - .975) / .025) * .55 * crk;
      const st = strata ? .5 + .5 * Math.sin(y / 6.5 + f * 9) : .5, tt = Math.min(1, Math.max(0, .62 * f + .22 * g + strata * .22 * (st - .5) + .1));
      const c = lerpC(a, b, tt).map(q => q * (.9 + .16 * sp) * (1 - .55 * Math.min(1, cr))); return [...c, .55 * f + .35 * g + .1 * sp - .5 * Math.min(1, cr) + strata * .15 * st]; }, true, rep, 3.2); },
  bark(seed) { const N = 256;
    return texFrom(N, (x, y) => { const n = fbm(x / 10, y / 60, seed, N / 10, 4), c = 58 + 40 * n; return [c * 1.05, c * .82, c * .62, n]; }, true, [2, 2], 4); },
  ribs(seed) { const N = 256;
    return texFrom(N, (x, y) => { const s = .5 + .5 * Math.sin(x / N * Math.PI * 2 * 22), n = fbm(x / 32, y / 32, seed, N / 32, 4), c = 215 * (.85 + .15 * n) - 20 * Math.max(0, n - .6) * 3; return [c, c, c, s * .9]; }, true, null, 3); },
};
function leafTex() { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'); const r = RNG(5);
  for (let i = 0; i < 9; i++) { const x = 40 + r() * 176, y = 40 + r() * 176, a = r() * 6.28, L = 34 + r() * 30; g.save(); g.translate(x, y); g.rotate(a);
    const gr = g.createLinearGradient(-L, 0, L, 0); const k = r(); gr.addColorStop(0, `rgb(${40 + 30 * k},${90 + 40 * k},${30 + 20 * k})`); gr.addColorStop(1, `rgb(${70 + 30 * k},${130 + 40 * k},${45 + 20 * k})`);
    g.fillStyle = gr; g.beginPath(); g.moveTo(-L, 0); g.quadraticCurveTo(0, -L * .42, L, 0); g.quadraticCurveTo(0, L * .42, -L, 0); g.fill(); g.strokeStyle = 'rgba(30,60,20,.5)'; g.lineWidth = 1.5; g.beginPath(); g.moveTo(-L, 0); g.lineTo(L, 0); g.stroke(); g.restore(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
const glowTex = () => { const c = document.createElement('canvas'); c.width = c.height = 256; const g = c.getContext('2d'), gr = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  gr.addColorStop(0, 'rgba(255,250,235,1)'); gr.addColorStop(.12, 'rgba(255,240,210,.55)'); gr.addColorStop(.4, 'rgba(255,220,170,.12)'); gr.addColorStop(1, 'rgba(255,220,170,0)'); g.fillStyle = gr; g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };
const std = (t, o = {}) => new THREE.MeshStandardMaterial(Object.assign({ map: t.map, normalMap: t.normalMap, roughness: .9 }, o));
function rep(m, x, y) { const c = m.clone(); ['map', 'normalMap'].forEach(k => { if (c[k]) { c[k] = c[k].clone(); c[k].repeat.set(x, y); c[k].needsUpdate = true; } }); return c; }

export async function init(canvas, dpr = 1.5) {
  if (canvas.id === 'glA') return { draw(f) { PREV = f; } };
  const glA = document.getElementById('glA'); glA.width = W * dpr; glA.height = H * dpr; const ctxA = glA.getContext('2d');
  const R = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true }); R.setClearColor(0x000000, 0);
  R.setPixelRatio(dpr); R.setSize(W, H, false); R.outputColorSpace = THREE.SRGBColorSpace; R.toneMapping = THREE.ACESFilmicToneMapping;
  R.shadowMap.enabled = true; R.shadowMap.type = THREE.PCFSoftShadowMap;
  const cam = new THREE.PerspectiveCamera(30, W / H, .05, 30000);
  const TL = new THREE.TextureLoader(), raw = u => new Promise((res, rej) => TL.load(u, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const V3 = a => new THREE.Vector3(a[0], a[1], a[2]);
  const setCam = c => { cam.fov = c.fov || 30; cam.position.copy(V3(c.pos)); cam.up.set(0, 1, 0); cam.lookAt(V3(c.look)); if (c.roll) cam.rotateZ(c.roll); cam.updateProjectionMatrix(); };
  const pm = new THREE.PMREMGenerator(R);
  const mkSky = (elev, azim, o = {}) => { const s = new Sky(); s.scale.setScalar(10000); const u = s.material.uniforms; u.turbidity.value = o.turb ?? 6; u.rayleigh.value = o.ray ?? 1.6; u.mieCoefficient.value = .005; u.mieDirectionalG.value = .8;
    const sp = new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - elev), THREE.MathUtils.degToRad(azim)); u.sunPosition.value.copy(sp); return { sky: s, sun: sp }; };
  const envOf = sky => { const sc = new THREE.Scene(); sc.add(sky.clone()); return pm.fromScene(sc).texture; };
  const glow = glowTex();
  // starfield (points with per-star size) and a navy gradient + faint Milky Way band, like the published Shorts' space
  const starField = (n, seed, bright = 1) => { const r = RNG(seed), p = new Float32Array(n * 3), s = new Float32Array(n), c = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const u = r() * 2 - 1, a = r() * 6.283, q = Math.sqrt(1 - u * u); p.set([q * Math.cos(a) * 9000, u * 9000, q * Math.sin(a) * 9000], i * 3); s[i] = Math.pow(r(), 5) * 3.6 + 1.0; const w = r(); c.set(w < .15 ? [1, .85, .7] : w > .85 ? [.75, .85, 1] : [1, 1, 1], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3)); g.setAttribute('sz', new THREE.BufferAttribute(s, 1)); g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    return new THREE.Points(g, new THREE.ShaderMaterial({ uniforms: { k: { value: bright * dpr } }, transparent: true, depthWrite: false, vertexColors: true,
      vertexShader: `attribute float sz; uniform float k; varying vec3 vC; varying float vA; void main(){ vC = color; vA = clamp(sz / 2.0, 0.55, 1.0); gl_PointSize = sz * k; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w * 0.9999; }`,
      fragmentShader: `varying vec3 vC; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); float a = 1.0 - smoothstep(0.1, 0.5, d); gl_FragColor = vec4(vC, a * vA); }` })); };
  const skyDome = (top, bot, band) => new THREE.Mesh(new THREE.SphereGeometry(9500, 64, 32), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, uniforms: { top: { value: new THREE.Color(top) }, bot: { value: new THREE.Color(bot) }, band: { value: band } },
    vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w * 0.99995; }`,
    fragmentShader: `uniform vec3 top, bot; uniform float band; varying vec3 vD;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y), mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 6; i++) { s += a * n3(p); p *= 2.07; a *= 0.5; } return s; }
      void main(){ vec3 d = normalize(vD); vec3 c = mix(bot, top, smoothstep(-0.6, 0.8, d.y));
        vec3 bn = normalize(vec3(0.35, 0.8, -0.48)); float b = exp(-pow(dot(d, bn) / 0.22, 2.0)); float f = fbm(d * 5.0); float dust = smoothstep(0.45, 0.75, fbm(d * 9.0 + 3.0));
        c += vec3(0.32, 0.34, 0.5) * b * f * f * band * (1.0 - 0.7 * dust); gl_FragColor = vec4(pow(max(c, 0.0), vec3(1.0 / 2.2)), 1.0); }` }));

  // ======================= SPACE =======================
  const space = new THREE.Scene();   // transparent: the published SVG space (navy gradient + stars) shows through
  const sunL = new THREE.DirectionalLight(0xffffff, 2.5); space.add(sunL, sunL.target, new THREE.AmbientLight(0x404858, .35));
  const [fDay, fNight, fCl, moonTex] = await Promise.all(['tex/flat3_day.jpg', 'tex/flat3_night.jpg', 'tex/flat3_clouds.jpg', 'tex/moon_1024.jpg'].map(raw));
  const NR = 180, NS = 400, pos = [], uvs = [], rr = [], idx = [];
  for (let i = 0; i <= NR; i++) for (let j = 0; j <= NS; j++) { const r = i / NR, th = j / NS * Math.PI * 2, u = r * Math.sin(th), v = r * Math.cos(th); pos.push(u, -v, 0); uvs.push(.5 + .5 * u, .5 + .5 * v); rr.push(r, th); }
  for (let i = 0; i < NR; i++) for (let j = 0; j < NS; j++) { const a0 = i * (NS + 1) + j, b0 = a0 + NS + 1; idx.push(a0, b0, a0 + 1, b0, b0 + 1, a0 + 1); }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); dg.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); dg.setAttribute('rt', new THREE.Float32BufferAttribute(rr, 2)); dg.setIndex(idx);
  const discU = { day: { value: fDay }, night: { value: fNight }, cl: { value: fCl }, L: { value: new THREE.Vector3(0, 1, 0) }, m: { value: 0 }, sunI: { value: 1 }, lights: { value: 0 }, dry: { value: 0 }, sea: { value: 0 }, clouds: { value: .75 }, camP: { value: new THREE.Vector3() }, tm: { value: 0 } };
  const disc = new THREE.Mesh(dg, new THREE.ShaderMaterial({ uniforms: discU,
    vertexShader: `attribute vec2 rt; uniform float m; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW;
      void main(){ vUv = uv; vR = rt.x; float lat = 1.5707963 - rt.x * 3.14159265, lon = rt.y;
        vec3 sp = vec3(cos(lat) * sin(lon), -cos(lat) * cos(lon), sin(lat)); vec3 p = mix(position, sp, m); vec3 n = normalize(mix(vec3(0.0,0.0,1.0), sp, m));
        vN = normalize(mat3(modelMatrix) * n); vec4 w = modelMatrix * vec4(p, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    // same look as the published Shorts' Earth (gl3d_v2): day map, clouds, warm city lights on the night side, a blue atmosphere rim
    fragmentShader: `uniform sampler2D day, night, cl; uniform vec3 L, camP; uniform float m, sunI, lights, dry, sea, clouds, tm; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW;
      void main(){ vec3 n = normalize(vN); vec3 l = normalize(L); float d = dot(n, l); float lit = smoothstep(-0.08, 0.35, d) * sunI;
        vec2 q = vUv - 0.5; float ca = cos(tm), sa = sin(tm); vec2 cuv = vec2(ca * q.x - sa * q.y, sa * q.x + ca * q.y) + 0.5;
        vec3 c = texture2D(day, vUv).rgb; float ocean = smoothstep(0.03, 0.16, c.b - max(c.r, c.g) * 0.85);
        c = mix(vec3(dot(c, vec3(0.3, 0.59, 0.11))), c, 1.3); c = pow(c, vec3(1.12)) * mix(1.12, 0.82, ocean); c *= mix(1.0, 0.7, smoothstep(0.86, 0.98, vR) * (1.0 - m));
        float rim = dry * smoothstep(0.45, 0.8, vR); vec3 floorC = mix(vec3(0.62, 0.55, 0.45), vec3(0.45, 0.4, 0.34), smoothstep(0.6, 1.0, vR));
        c = mix(c, mix(c * vec3(1.15, 1.0, 0.75), floorC, ocean), rim);
        float mid = sea * smoothstep(0.46, 0.2, vR); c = mix(c, vec3(0.04, 0.16, 0.36), mid);
        float cld = texture2D(cl, cuv).r * clouds * (1.0 - rim * 0.9); c *= 1.0 - 0.32 * texture2D(cl, cuv + vec2(0.006, -0.004)).r * clouds * (1.0 - m); c = mix(c, vec3(1.0), cld * 0.8);
        vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit);
        col += vec3(0.22, 0.42, 0.9) * 0.06 * smoothstep(0.9, 1.0, vR) * lit * (1.0 - m);
        vec3 vd = normalize(camP - vW); vec3 h = normalize(l + vd); col += vec3(1.0, 0.95, 0.85) * pow(max(dot(n, h), 0.0), 90.0) * (ocean * (1.0 - rim) * (1.0 - cld) + mid) * 0.55 * lit;
        col += texture2D(night, vUv).rgb * vec3(1.0, 0.82, 0.55) * (1.0 - lit) * (1.0 - cld * 0.7) * lights * 1.6;
        float rimA = pow(1.0 - max(dot(n, vd), 0.0), 2.6) * m; col += vec3(0.35, 0.62, 1.0) * rimA * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
        gl_FragColor = vec4(col, 1.0); }` }));
  const rockT = GEN.rock(11, [150, 128, 104], [80, 68, 58]);
  const sideMat = std(rockT, { color: 0xc8b8a0 }); sideMat.map.repeat.set(16, 1); sideMat.normalMap.repeat.set(16, 1);
  const sideG = new THREE.CylinderGeometry(1, .9, .14, 256, 1, true); sideG.rotateX(Math.PI / 2); sideG.translate(0, 0, -.07);
  const side = new THREE.Mesh(sideG, sideMat); const botG = new THREE.CircleGeometry(.9, 128); botG.rotateX(Math.PI); botG.translate(0, 0, -.14); const bot = new THREE.Mesh(botG, sideMat);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(1.035, 64, 48), new THREE.ShaderMaterial({ uniforms: { L: discU.L, a: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor,
    vertexShader: `varying vec3 vN; varying vec3 vW; void main(){ vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
    fragmentShader: `uniform vec3 L; uniform float a; varying vec3 vN; varying vec3 vW; void main(){ vec3 n = normalize(vN); vec3 v = normalize(cameraPosition - vW); float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0);
      float d = smoothstep(-0.3, 0.7, dot(n, normalize(L))); gl_FragColor = vec4(vec3(0.3, 0.6, 1.0) * rim * (0.05 + d) * a, 1.0); }` }));
  const seaMat = new THREE.MeshPhysicalMaterial({ color: 0x0a3a68, roughness: .06, metalness: 0, transparent: true, opacity: .94, clearcoat: 1, clearcoatRoughness: .04 });
  const seaG = new THREE.SphereGeometry(1, 128, 64, 0, Math.PI * 2, 0, Math.PI / 2); seaG.rotateX(Math.PI / 2); const seaM = new THREE.Mesh(seaG, seaMat);
  const discFlat = new THREE.Group(), discSpin = new THREE.Group(); discFlat.rotation.x = -Math.PI / 2; discFlat.add(discSpin); discSpin.add(disc, side, bot, seaM, atm); space.add(discFlat);
  const goldM = new THREE.MeshStandardMaterial({ color: 0xf4c76b, emissive: 0x7a5a18, metalness: .3, roughness: .35, transparent: true }), pale = new THREE.MeshStandardMaterial({ color: 0xcfd8ff, emissive: 0x404a70, roughness: .5, transparent: true });
  const arrowG = { shaft: new THREE.CylinderGeometry(.012, .012, 1, 16), head: new THREE.ConeGeometry(.035, .09, 24) };
  const xTex = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d'); g.strokeStyle = '#ff4a3a'; g.lineWidth = 20; g.lineCap = 'round'; g.beginPath(); g.moveTo(24, 24); g.lineTo(104, 104); g.moveTo(104, 24); g.lineTo(24, 104); g.stroke(); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const arrows = Array.from({ length: 14 }, () => { const g = new THREE.Group(), s = new THREE.Mesh(arrowG.shaft, goldM), h = new THREE.Mesh(arrowG.head, goldM); g.add(s, h);
    const x = new THREE.Sprite(new THREE.SpriteMaterial({ map: xTex, transparent: true, depthTest: false })); x.scale.setScalar(.09); g.add(x); g.userData = { s, h, x }; discFlat.add(g); return g; });
  const setArrow = (g, a, b, al, kind) => { g.visible = al > .01; if (!g.visible) return; const A = V3(a), B = V3(b), d = B.clone().sub(A), L = d.length(); g.position.copy(A); g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().normalize());
    const { s, h, x } = g.userData; s.scale.set(1, Math.max(.001, L - .08), 1); s.position.set(0, (L - .08) / 2, 0); h.position.set(0, L - .045, 0); s.material = h.material = kind ? pale : goldM; x.visible = !!kind; x.position.set(0, L * .5, 0); x.material.opacity = al; };
  const sunMat = new THREE.ShaderMaterial({ uniforms: { t: { value: 0 } }, vertexShader: `varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float t; varying vec3 vP; varying vec3 vN; float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y), mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * n3(p); p *= 2.03; a *= 0.5; } return s; }
      void main(){ float mu = max(normalize(vN).z, 0.0); float g = fbm(vP * 6.0 + vec3(0.0, 0.0, t * 0.25)); vec3 c = mix(vec3(1.0,0.55,0.12), vec3(1.0,0.95,0.7), g); c *= 0.5 + 0.6 * pow(mu, 0.45); gl_FragColor = vec4(c * 1.2, 1.0); }` });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), sunMat), sunGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, depthWrite: false, transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor, blendSrcAlpha: THREE.ZeroFactor, blendDstAlpha: THREE.OneFactor })); space.add(sun, sunGlow);
  const moonU = { tex: { value: moonTex }, L: { value: new THREE.Vector3(0, 0, 1) }, shC: { value: new THREE.Vector3(-9, 0, 0) }, shD: { value: new THREE.Vector3(0, 0, 1) }, shR: { value: 2.7 } };
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), new THREE.ShaderMaterial({ uniforms: moonU,
    vertexShader: `varying vec3 vN; varying vec2 vUv; varying vec3 vW; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix)*normal); vec4 w = modelMatrix*vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L, shC, shD; uniform float shR; varying vec3 vN; varying vec2 vUv; varying vec3 vW;
      void main(){ vec3 n = normalize(vN); float lit = max(dot(n, normalize(L)), 0.0); vec3 c = texture2D(tex, vUv).rgb; vec3 col = c * (0.025 + 1.15 * pow(lit, 0.8));
        vec3 d = vW - shC; vec3 perp = d - dot(d, shD) * shD; float r = length(perp); float um = 1.0 - smoothstep(shR * 0.985, shR * 1.02, r); float pen = 1.0 - smoothstep(shR, shR * 1.35, r);
        col *= 1.0 - 0.45 * pen * (1.0 - um); col = mix(col, c * vec3(0.62, 0.17, 0.07) * (0.35 + 0.4 * lit), um); gl_FragColor = vec4(col, 1.0); }` }));
  const ringM = new THREE.Mesh(new THREE.RingGeometry(.985, 1.0, 256), new THREE.ShaderMaterial({ uniforms: { a: { value: 0 } }, transparent: true, depthTest: false,
    vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `uniform float a; varying vec2 vP; void main(){ float k = step(0.45, fract(atan(vP.y, vP.x) / 6.2831853 * 90.0)); gl_FragColor = vec4(0.96, 0.78, 0.42, a * k); }` }));
  ringM.renderOrder = 10; space.add(moon, ringM);
  function drawSpace(w, t) {
    setCam(w.cam); R.toneMappingExposure = 1;
    const D = w.disc; discFlat.visible = !!D;
    if (D) { discSpin.rotation.z = D.spin || 0; const m = D.m || 0; discU.m.value = m; discU.sunI.value = D.sunI ?? 1; discU.lights.value = D.lights ?? .35; discU.dry.value = D.dry || 0; discU.sea.value = D.sea || 0; discU.clouds.value = D.clouds ?? .75; discU.camP.value.copy(cam.position); discU.tm.value = t * .012;
      side.visible = bot.visible = m < .16; seaM.visible = (D.sea || 0) > .01; seaM.scale.set(.48, .48, .015 + .07 * (D.sea || 0)); atm.visible = m > .05; atm.material.uniforms.a.value = m * m; }
    const Ls = V3(w.L || [-.5, .8, .6]).normalize(); discU.L.value.copy(Ls); sunL.position.copy(Ls.clone().multiplyScalar(20)); sunL.intensity = 2.5 * (D ? (D.sunI ?? 1) : 1);
    const A = w.arrows || []; arrows.forEach((g, i) => { const a = A[i]; if (!a) { g.visible = false; return; } setArrow(g, a.from, a.to, a.a, a.kind); });
    sun.visible = sunGlow.visible = !!w.sun; if (w.sun) { sun.position.copy(V3(w.sun.pos)); sun.scale.setScalar(w.sun.r); sunGlow.position.copy(sun.position); sunGlow.scale.setScalar(w.sun.r * 9); sunGlow.material.opacity = w.sun.a ?? 1; sunMat.uniforms.t.value = t; }
    moon.visible = !!w.moon; ringM.visible = !!w.moon && (w.moon.ring || 0) > .01;
    if (w.moon) { const M = w.moon; moon.position.copy(V3(M.pos || [0, 0, 0])); moon.rotation.y = 4.4; moonU.L.value.copy(V3(M.L || [0, 0, 1]).normalize()); moonU.shC.value.copy(V3(M.shC)); moonU.shR.value = M.shR; moonU.shD.value.copy(cam.position.clone().sub(moon.position).normalize());
      ringM.position.copy(V3(M.shC)); ringM.scale.setScalar(M.shR); ringM.lookAt(cam.position); ringM.material.uniforms.a.value = M.ring || 0; }
    R.render(space, cam);
  }

  // ======================= STREET (procedural city, new buildings for every seed) =======================
  const street = new THREE.Scene(); const stS = mkSky(36, 35, { turb: 4, ray: 1.3 }); street.add(stS.sky); street.environment = envOf(stS.sky); seaMat.envMap = street.environment;
  const stSun = new THREE.DirectionalLight(0xfff0dc, 5.5); stSun.position.copy(stS.sun.clone().multiplyScalar(80)); stSun.castShadow = true; stSun.shadow.mapSize.set(2048, 2048); Object.assign(stSun.shadow.camera, { left: -40, right: 40, top: 40, bottom: -30, near: 1, far: 220 }); stSun.shadow.bias = -.0004; stSun.shadow.normalBias = .04;
  street.add(stSun, stSun.target, new THREE.HemisphereLight(0xbcd4ff, 0x6a5a48, .6));
  const SG = new THREE.Group(), SGi = new THREE.Group(); SG.add(SGi); street.add(SG); const PIV = new THREE.Vector3(0, .15, -8); SG.position.copy(PIV); SGi.position.copy(PIV).multiplyScalar(-1);
  const asphalt = std(GEN.asphalt(3), { roughness: .92 }), paving = std(GEN.paving(4), { roughness: .85 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(160, 16), asphalt); road.rotation.x = -Math.PI / 2; road.position.set(0, 0, 3); road.receiveShadow = true; SGi.add(road);
  const walkTop = new THREE.Mesh(new THREE.PlaneGeometry(160, 6.2), paving); walkTop.rotation.x = -Math.PI / 2; walkTop.position.set(0, .15, -8.1); walkTop.receiveShadow = true; SGi.add(walkTop);
  const concrete = std(GEN.plaster(21, 0xcfcac0), { roughness: .8 });
  const curb = new THREE.Mesh(new THREE.BoxGeometry(160, .17, .32), concrete); curb.position.set(0, .085, -5.05); curb.castShadow = curb.receiveShadow = true; SGi.add(curb);
  const lineM = new THREE.MeshStandardMaterial({ color: 0xe8e4d8, roughness: .7 });
  for (let i = -16; i < 16; i++) { const m = new THREE.Mesh(new THREE.PlaneGeometry(3, .15), lineM); m.rotation.x = -Math.PI / 2; m.position.set(i * 6, .006, 1.2); m.receiveShadow = true; SGi.add(m); }
  await document.fonts.load('700 80px "Noto Naskh Arabic"');
  const signTex = (txt, bg) => { const c = document.createElement('canvas'); c.width = 512; c.height = 96; const g = c.getContext('2d'); g.fillStyle = bg; g.fillRect(0, 0, 512, 96); g.fillStyle = 'rgba(255,255,255,.12)'; g.fillRect(0, 0, 512, 10);
    g.fillStyle = '#fff'; g.font = '700 58px "Noto Naskh Arabic"'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.direction = 'rtl'; g.fillText(txt, 256, 52); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return t; };
  const glassM = new THREE.MeshStandardMaterial({ color: 0x222c36, metalness: .9, roughness: .05, envMapIntensity: 1.3 }), frameM = new THREE.MeshStandardMaterial({ color: 0x8c8a84, roughness: .6, metalness: .2 }), darkM = new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: .8 });
  const facadeKinds = [s => GEN.brick(s, 0x9a4e38), s => GEN.brick(s, 0xb88a62), s => GEN.plaster(s, 0xe6d6bc), s => GEN.plaster(s, 0xd8c4b0), s => GEN.panels(s, 0xb8b4ac), s => GEN.plaster(s, 0xc8d0d0)];
  const lampM = new THREE.MeshStandardMaterial({ color: 0x1e2a26, metalness: .7, roughness: .4 });
  const makeLamp = () => { const g = new THREE.Group(); const pole = new THREE.Mesh(new THREE.CylinderGeometry(.06, .09, 4.6, 16), lampM); pole.position.y = 2.3; const base = new THREE.Mesh(new THREE.CylinderGeometry(.15, .19, .5, 16), lampM); base.position.y = .25;
    const arm = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, 4.5, 0), new THREE.Vector3(0, 5.0, .5), new THREE.Vector3(0, 4.85, 1.3)), 20, .04, 8), lampM);
    const head = new THREE.Mesh(new THREE.CylinderGeometry(.06, .26, .22, 20), lampM); head.position.set(0, 4.75, 1.3); const bulb = new THREE.Mesh(new THREE.CircleGeometry(.2, 20), new THREE.MeshStandardMaterial({ color: 0xfff4dc, emissive: 0x887755 })); bulb.rotation.x = Math.PI / 2; bulb.position.set(0, 4.63, 1.3);
    g.add(pole, base, arm, head, bulb); g.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } }); return g; };
  const barkM = std(GEN.bark(8), { color: 0xd8c8b8 }), leafMap = leafTex();
  const leafM = new THREE.MeshStandardMaterial({ map: leafMap, alphaTest: .45, side: THREE.DoubleSide, roughness: .7 }), leafDepth = new THREE.MeshDepthMaterial({ map: leafMap, alphaTest: .45, depthPacking: THREE.RGBADepthPacking });
  const makeTree = seed => { const r = RNG(seed), g = new THREE.Group(), h = 3.2 + r() * .8; const tr = new THREE.Mesh(new THREE.CylinderGeometry(.1, .17, h, 12), barkM); tr.position.y = h / 2; tr.castShadow = true; g.add(tr);
    for (let b = 0; b < 5; b++) { const a = b / 5 * 6.28 + r(), L = 1.2 + r() * .8, br = new THREE.Mesh(new THREE.CylinderGeometry(.03, .07, L, 8), barkM); br.position.set(Math.cos(a) * L * .35, h - .2 + r() * .5 + L * .3, Math.sin(a) * L * .35); br.rotation.set(Math.sin(a) * .9, 0, -Math.cos(a) * .9); br.castShadow = true; g.add(br); }
    const n = 2600, im = new THREE.InstancedMesh(new THREE.PlaneGeometry(.42, .42), leafM, n), o = new THREE.Object3D(), col = new THREE.Color();
    for (let i = 0; i < n; i++) { let x, y, z; do { x = r() * 2 - 1; y = r() * 2 - 1; z = r() * 2 - 1; } while (x * x + y * y + z * z > 1); const k = Math.pow(x * x + y * y + z * z, .18) || .1;
      o.position.set(x / k * 2.1, h + 1.3 + y / k * 1.5, z / k * 2.1); o.rotation.set(r() * 6.28, r() * 6.28, r() * 6.28); o.updateMatrix(); im.setMatrixAt(i, o.matrix); col.setHSL(.24 + r() * .06, .45 + r() * .2, .32 + r() * .18 + (y > .3 ? .08 : 0)); im.setColorAt(i, col); }
    im.castShadow = true; im.receiveShadow = true; im.customDepthMaterial = leafDepth; g.add(im); return g; };
  function buildStreet(seed) {
    const r = RNG(seed), shops = [['مخبز', '#b03a2e'], ['صيدلية', '#2a8a4a'], ['مقهى', '#6a4a2a'], ['سوبرماركت', '#2a5a9a'], ['حلويات', '#d9822b'], ['ملابس', '#6a3a8a'], ['كتب', '#2a6a6a'], ['زهور', '#c8486a'], ['مطعم', '#8a2a2a'], ['أحذية', '#3a3a3a']];
    const facMats = facadeKinds.map((f, i) => std(f(seed * 7 + i), { roughness: .88 }));
    let x = -60;
    while (x < 60) { const w = 7 + r() * 7, fl = 2 + Math.floor(r() * 6), h = 4.2 + fl * 3.2, fm = rep(facMats[Math.floor(r() * facMats.length)], w / 2, h / 2), setback = r() < .25 ? .6 : 0;
      const b = new THREE.Mesh(new THREE.BoxGeometry(w, h, 12), fm); b.position.set(x + w / 2, h / 2, -11.2 - 6 - setback); b.castShadow = b.receiveShadow = true; SGi.add(b);
      const zf = -11.2 - setback, cap = new THREE.Mesh(new THREE.BoxGeometry(w + .3, .35, .55), concrete); cap.position.set(x + w / 2, h + .17, zf + .1); cap.castShadow = true; SGi.add(cap);
      const band = new THREE.Mesh(new THREE.BoxGeometry(w, .25, .25), concrete); band.position.set(x + w / 2, 4.15, zf + .12); band.castShadow = true; SGi.add(band);
      const [nm, col] = shops[Math.floor(r() * shops.length)], sw = w - 1.2;
      const sg = new THREE.Mesh(new THREE.PlaneGeometry(sw, 2.6), glassM); sg.position.set(x + w / 2, 1.5, zf + .02); SGi.add(sg);
      const inner = new THREE.Mesh(new THREE.PlaneGeometry(sw, 2.6), new THREE.MeshStandardMaterial({ color: 0xffe0b0, emissive: 0x4a3420, roughness: .9, transparent: true, opacity: .3 })); inner.position.set(x + w / 2, 1.5, zf + .03); SGi.add(inner);
      for (let q = 0; q <= 3; q++) { const mu = new THREE.Mesh(new THREE.BoxGeometry(.08, 2.7, .1), darkM); mu.position.set(x + .6 + sw * q / 3, 1.5, zf + .05); SGi.add(mu); }
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(Math.min(sw, 5.5), 1.0), new THREE.MeshStandardMaterial({ map: signTex(nm, col), roughness: .6, emissive: 0x111111 })); sign.position.set(x + w / 2, 3.45, zf + .06); SGi.add(sign);
      const aw = new THREE.Mesh(new THREE.BoxGeometry(sw, .05, 1.4), new THREE.MeshStandardMaterial({ color: new THREE.Color(col).lerp(new THREE.Color(0xffffff), .2), roughness: .85 })); aw.position.set(x + w / 2, 2.95, zf + .65); aw.rotation.x = .32; aw.castShadow = true; SGi.add(aw);
      const cols = Math.max(2, Math.floor(w / 2.6)), ww = 1.1 + r() * .35, wh = 1.5 + r() * .3, bal = r() < .4;
      for (let f = 0; f < fl; f++) for (let c = 0; c < cols; c++) { const wx = x + (c + .5) * w / cols, wy = 4.6 + f * 3.2 + 1.05;
        const rec = new THREE.Mesh(new THREE.BoxGeometry(ww + .1, wh + .1, .02), darkM); rec.position.set(wx, wy, zf + .005); SGi.add(rec);
        const g = new THREE.Mesh(new THREE.PlaneGeometry(ww, wh), glassM); g.position.set(wx, wy, zf + .012); SGi.add(g);
        const fr = new THREE.Mesh(new THREE.BoxGeometry(.06, wh, .06), frameM); fr.position.set(wx, wy, zf + .04); SGi.add(fr);
        const si = new THREE.Mesh(new THREE.BoxGeometry(ww + .3, .1, .3), concrete); si.position.set(wx, wy - wh / 2 - .05, zf + .13); si.castShadow = true; SGi.add(si);
        const li = new THREE.Mesh(new THREE.BoxGeometry(ww + .3, .12, .18), concrete); li.position.set(wx, wy + wh / 2 + .06, zf + .07); li.castShadow = true; SGi.add(li);
        if (bal && f % 2 === 0) { const bl = new THREE.Mesh(new THREE.BoxGeometry(ww + .9, .12, .9), concrete); bl.position.set(wx, wy - wh / 2 - .1, zf + .45); bl.castShadow = bl.receiveShadow = true; SGi.add(bl);
          for (let k = 0; k < 9; k++) { const p = new THREE.Mesh(new THREE.BoxGeometry(.03, .85, .03), lampM); p.position.set(wx - (ww + .8) / 2 + k * (ww + .8) / 8, wy - wh / 2 + .38, zf + .88); p.castShadow = true; SGi.add(p); }
          const rail = new THREE.Mesh(new THREE.BoxGeometry(ww + .9, .05, .05), lampM); rail.position.set(wx, wy - wh / 2 + .82, zf + .88); SGi.add(rail); } }
      x += w; }
    [-45, -27, -9, 9, 27, 45].forEach(lx => { const l = makeLamp(); l.position.set(lx, .15, -5.6); SGi.add(l); });
    [-36, -18, 18, 36].forEach((tx, i) => { const t = makeTree(seed + i * 13); t.position.set(tx + (r() - .5) * 2, .15, -9.9); SGi.add(t); });
  }
  buildStreet(27);
  const ballTex = (() => { const c = document.createElement('canvas'); c.width = 256; c.height = 128; const g = c.getContext('2d'); g.fillStyle = '#d8342a'; g.fillRect(0, 0, 256, 128); g.fillStyle = '#fff'; g.fillRect(0, 54, 256, 20); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const ball = new THREE.Mesh(new THREE.SphereGeometry(.12, 32, 24), new THREE.MeshStandardMaterial({ map: ballTex, roughness: .45 })); ball.castShadow = true; SGi.add(ball);
  function drawStreet(w, t) {
    setCam(w.cam); R.toneMappingExposure = w.exp ?? .62;
    SG.rotation.z = w.tilt || 0; ball.visible = w.ball != null; if (ball.visible) { ball.position.set(w.ball, .27, -7.2); ball.rotation.z = -w.ball / .12; }
    R.render(street, cam);
  }

  // ======================= SEA (three.js Water + Sky, a procedural container ship) =======================
  const sea = new THREE.Scene(); const seS = { sun: new THREE.Vector3().setFromSphericalCoords(1, THREE.MathUtils.degToRad(90 - 14), THREE.MathUtils.degToRad(190)) };
  seS.sky = new THREE.Mesh(new THREE.SphereGeometry(9500, 64, 32), new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: { sd: { value: seS.sun.clone() } },
    vertexShader: `varying vec3 vD; void main(){ vD = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w * 0.99995; }`,
    fragmentShader: `uniform vec3 sd; varying vec3 vD; void main(){ vec3 d = normalize(vD); float y = d.y;
      vec3 zen = vec3(0.2, 0.42, 0.72), hor = mix(vec3(0.88, 0.87, 0.82), vec3(0.46, 0.65, 0.86), smoothstep(0.0, 0.07, y)), low = vec3(0.3, 0.48, 0.68);
      vec3 c = y > 0.0 ? mix(hor, zen, pow(clamp(y, 0.0, 1.0), 0.45)) : mix(hor, low, clamp(-y * 6.0, 0.0, 1.0));
      float s = max(dot(d, normalize(sd)), 0.0); c += vec3(1.0, 0.9, 0.7) * (pow(s, 12.0) * 0.35 + pow(s, 400.0) * 1.6); c = min(c, vec3(1.0));
      gl_FragColor = vec4(c, 1.0); }` }));
  sea.add(seS.sky); sea.environment = envOf(seS.sky); sea.fog = new THREE.FogExp2(0xbdd0e2, .00005);
  const seaSun = new THREE.DirectionalLight(0xffe8cc, 3.2); seaSun.position.copy(seS.sun.clone().multiplyScalar(500)); seaSun.castShadow = true; seaSun.shadow.mapSize.set(2048, 2048); Object.assign(seaSun.shadow.camera, { left: -150, right: 150, top: 150, bottom: -150, near: 1, far: 2000 });
  sea.add(seaSun, seaSun.target, new THREE.HemisphereLight(0xbcd4ff, 0x1a3040, .7));
  const wn = await raw('tex/waternormals.jpg'); wn.wrapS = wn.wrapT = THREE.RepeatWrapping;
  const water = new Water(new THREE.PlaneGeometry(40000, 40000), { textureWidth: 768, textureHeight: 768, waterNormals: wn, sunDirection: seS.sun.clone(), sunColor: 0x9a8a74, waterColor: 0x0b3f6a, distortionScale: 3.2, fog: true, alpha: 1 });
  water.rotation.x = -Math.PI / 2; water.material.uniforms.size.value = 1.2; sea.add(water);
  const makeShip = () => { const g = new THREE.Group(), L = 170, B = 27, xs = 64, sec = [[5, 1], [2.5, 1], [-1, 1], [-4.5, .98], [-6.8, .9], [-8.2, .72], [-8.9, .42], [-9.1, 0]];
    const hw = x => { const f = THREE.MathUtils.clamp((L / 2 - x) / 38, 0, 1), s = THREE.MathUtils.clamp((x + L / 2) / 14, 0, 1); return B / 2 * (.06 + .94 * Math.sqrt(f)) * (.86 + .14 * s); };
    const P = [], C = [], I = [], prof = [...sec.map(([y, k]) => [y, -k]), ...sec.slice().reverse().slice(1).map(([y, k]) => [y, k])], np = prof.length, red = new THREE.Color(0x7a2420), blk = new THREE.Color(0x1a2230), wht = new THREE.Color(0xe8e8e8);
    for (let i = 0; i <= xs; i++) { const x = -L / 2 + L * i / xs, w = hw(x), bowRake = Math.max(0, x - (L / 2 - 20)) * .35;
      prof.forEach(([y, k]) => { const yy = y < 0 && x > L / 2 - 20 ? y + bowRake * (1 + y / 9.1) * .9 : y; P.push(x, yy, k * w); const c = yy < -.1 ? red : yy < .5 ? wht : blk; C.push(c.r, c.g, c.b); }); }
    for (let i = 0; i < xs; i++) for (let j = 0; j < np - 1; j++) { const a = i * np + j, b = a + np; I.push(a, a + 1, b, b, a + 1, b + 1); }
    const hg = new THREE.BufferGeometry(); hg.setAttribute('position', new THREE.Float32BufferAttribute(P, 3)); hg.setAttribute('color', new THREE.Float32BufferAttribute(C, 3)); hg.setIndex(I); hg.computeVertexNormals();
    const hull = new THREE.Mesh(hg, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: .55, metalness: .3, side: THREE.DoubleSide })); hull.castShadow = hull.receiveShadow = true; g.add(hull);
    const sh = new THREE.Shape(); for (let i = 0; i <= xs; i++) { const x = -L / 2 + L * i / xs; i ? sh.lineTo(x, hw(x)) : sh.moveTo(x, hw(x)); } for (let i = xs; i >= 0; i--) { const x = -L / 2 + L * i / xs; sh.lineTo(x, -hw(x)); }
    const deck = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshStandardMaterial({ color: 0x5a3a2a, roughness: .8 })); deck.rotation.x = -Math.PI / 2; deck.position.y = 5; deck.receiveShadow = true; g.add(deck);
    // containers: 40 ft boxes stacked in bays
    const ribs = GEN.ribs(2), cm = new THREE.MeshStandardMaterial({ map: ribs.map, normalMap: ribs.normalMap, roughness: .6, metalness: .35 }), r = RNG(77), pal = [0x2a6ab0, 0xc0392b, 0x3a8a5a, 0xe8a23a, 0x8a8a8a, 0x2a4a7a, 0xf2f2f2, 0x7a3a2a, 0x1e6a7a];
    const cont = []; for (let bay = 0; bay < 9; bay++) { const bx = -40 + bay * 13.2, rows = Math.floor(hw(bx) * 2 / 2.5) - 1, tiers = 3 + Math.floor(r() * 3) + (bay > 1 && bay < 7 ? 1 : 0);
      for (let row = 0; row < rows; row++) for (let tr = 0; tr < tiers; tr++) if (r() > .05) cont.push([bx, 5 + 1.3 + tr * 2.6, (row - (rows - 1) / 2) * 2.5]); }
    const ci = new THREE.InstancedMesh(new THREE.BoxGeometry(12.2, 2.55, 2.42), cm, cont.length), o = new THREE.Object3D(), cc = new THREE.Color();
    cont.forEach((p, i) => { o.position.set(...p); o.updateMatrix(); ci.setMatrixAt(i, o.matrix); cc.setHex(pal[Math.floor(r() * pal.length)]).multiplyScalar(.85 + r() * .2); ci.setColorAt(i, cc); }); ci.castShadow = ci.receiveShadow = true; g.add(ci);
    // superstructure at the stern: white tiers with window bands, bridge wings, funnel, mast
    const wM = new THREE.MeshStandardMaterial({ color: 0xeeeeea, roughness: .5 }), winM = new THREE.MeshStandardMaterial({ color: 0x1a2028, metalness: .8, roughness: .1 });
    [[0, 18, 22], [1, 14, 20], [2, 11, 18]].forEach(([k, len, wid]) => { const bx = new THREE.Mesh(new THREE.BoxGeometry(len, 4, wid), wM); bx.position.set(-64 + k * .6, 7 + k * 4, 0); bx.castShadow = bx.receiveShadow = true; g.add(bx);
      [-1, 1].forEach(sd => { const wb = new THREE.Mesh(new THREE.BoxGeometry(len * .9, .9, .05), winM); wb.position.set(-64 + k * .6, 7.6 + k * 4, sd * (wid / 2 + .03)); g.add(wb); });
      const wf = new THREE.Mesh(new THREE.BoxGeometry(.05, .9, wid * .9), winM); wf.position.set(-64 + k * .6 + len / 2 + .03, 7.6 + k * 4, 0); g.add(wf); });
    const brg = new THREE.Mesh(new THREE.BoxGeometry(8, 3, B + 2), wM); brg.position.set(-62, 20.5, 0); brg.castShadow = true; g.add(brg); const bw = new THREE.Mesh(new THREE.BoxGeometry(.05, 1.2, B + 1), winM); bw.position.set(-57.97, 20.8, 0); g.add(bw);
    const fun = new THREE.Mesh(new THREE.BoxGeometry(5, 9, 5), new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: .6 })); fun.position.set(-73, 15, 0); fun.castShadow = true; g.add(fun);
    const fb = new THREE.Mesh(new THREE.BoxGeometry(5.1, 1.6, 5.1), new THREE.MeshStandardMaterial({ color: 0x2a6ab0, roughness: .5 })); fb.position.set(-73, 17.5, 0); g.add(fb);
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(.2, .3, 8, 8), wM); mast.position.set(-62, 26, 0); g.add(mast); const fm = new THREE.Mesh(new THREE.CylinderGeometry(.2, .3, 10, 8), wM); fm.position.set(78, 10, 0); g.add(fm);
    const fc = new THREE.Mesh(new THREE.BoxGeometry(14, 2.4, 1), new THREE.MeshStandardMaterial({ color: 0x1a2230, roughness: .6 })); return g; };
  const ship = makeShip(), shipG = new THREE.Group(); shipG.add(ship); sea.add(shipG);
  // wake: a foam trail drawn in a canvas, fading behind the ship
  const wakeT = (() => { const c = document.createElement('canvas'); c.width = 128; c.height = 512; const g = c.getContext('2d'), r = RNG(3); for (let i = 0; i < 2600; i++) { const y = r() * 512, sp = 10 + y / 512 * 50, x = 64 + (r() - .5) * sp * 2 * (r() < .5 ? 1 : .4); g.fillStyle = `rgba(255,255,255,${(.5 * (1 - y / 512) * r()).toFixed(3)})`; g.beginPath(); g.arc(x, y, 1 + r() * 3, 0, 6.3); g.fill(); }
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; })();
  const wake = new THREE.Mesh(new THREE.PlaneGeometry(40, 380), new THREE.MeshBasicMaterial({ map: wakeT, transparent: true, depthWrite: false, fog: true })); wake.rotation.x = -Math.PI / 2; wake.position.set(-85 - 190, .05, 0); wake.rotation.z = Math.PI / 2; shipG.add(wake);
  function drawSea(w, t) {
    setCam(w.cam); R.toneMappingExposure = w.exp ?? .55;
    water.material.uniforms.time.value = t * .7; sea.fog.density = w.fog ?? .0001;
    const S = w.ship; shipG.visible = !!S; if (S) { shipG.position.set(S.x, Math.sin(t * .7) * .25, S.z); shipG.rotation.set(Math.sin(t * .5) * .008, S.yaw ?? 0, Math.sin(t * .6 + 1) * .012); }
    R.render(sea, cam);
  }

  // ======================= EDGE (procedural plateau, cliff and boulders; airless black sky) =======================
  const edge = new THREE.Scene(); edge.add(skyDome(0x02030a, 0x010106, .9), starField(6000, 9, 1.2));
  const edSun = new THREE.DirectionalLight(0xffffff, 4.0); edSun.position.set(70, 40, 45); edSun.castShadow = true; edSun.shadow.mapSize.set(2048, 2048); Object.assign(edSun.shadow.camera, { left: -70, right: 70, top: 70, bottom: -70, near: 1, far: 300 }); edSun.shadow.bias = -.0005; edSun.shadow.normalBias = .05;
  edge.add(edSun, edSun.target, new THREE.AmbientLight(0x8090a8, .18));
  const nz = (() => { const vnz = (x, y) => vn(x, y, 7, 1 << 20); return (x, y) => { let s = 0, a = 1, f = 1; for (let o = 0; o < 5; o++) { s += a * vnz(x * f + o * 17, y * f); a *= .5; f *= 2.03; } return s; }; })();
  const gTex = GEN.rock(31, [176, 156, 130], [128, 112, 94], [40, 40], 0, 0); const groundM = std(gTex, { roughness: .95 });
  const gG = new THREE.PlaneGeometry(220, 220, 300, 300); gG.rotateX(-Math.PI / 2); gG.translate(-110, 0, -60);
  { const p = gG.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); let y = (nz(x * .05, z * .05) - 1) * 1.6 + (nz(x * .4, z * .4) - 1) * .2; y -= Math.max(0, x + 2) * .5; p.setY(i, y); } gG.computeVertexNormals(); }
  const ground = new THREE.Mesh(gG, groundM); ground.receiveShadow = ground.castShadow = true; edge.add(ground);
  const cTex = GEN.rock(37, [158, 136, 110], [98, 84, 70], [22, 9], 1); const cliffM = std(cTex, { roughness: .95 });
  const cG = new THREE.PlaneGeometry(220, 100, 300, 140); cG.rotateY(Math.PI / 2); cG.translate(0, -50, -60);
  { const p = cG.attributes.position; for (let i = 0; i < p.count; i++) { const y = p.getY(i), z = p.getZ(i); p.setX(i, -1.2 + (nz(z * .07, y * .07) - 1) * 4 + (nz(z * .5, y * .5) - 1) * .6 + Math.sin(y * .9 + nz(z * .2, y * .2) * 3) * .25); } cG.computeVertexNormals(); }
  const cliff = new THREE.Mesh(cG, cliffM); cliff.receiveShadow = cliff.castShadow = true; edge.add(cliff);
  const rockG = (seed) => { const g = mergeVertices(new THREE.IcosahedronGeometry(1, 5)), p = g.attributes.position, r = RNG(seed), ox = r() * 50, oy = r() * 50; for (let i = 0; i < p.count; i++) { const v = new THREE.Vector3().fromBufferAttribute(p, i), k = .6 + .55 * nz(v.x * 1.1 + ox, v.y * 1.1 + v.z * .8 + oy) + .12 * nz(v.x * 5 + ox, v.z * 5 + v.y * 3 + oy) - .1 * Math.abs(v.y); v.multiplyScalar(k); v.y *= .78; p.setXYZ(i, v.x, v.y, v.z); } g.computeVertexNormals(); return g; };
  const bTex = GEN.rock(43, [164, 144, 120], [112, 98, 82], [2, 2]); const bM = std(bTex, { roughness: .9 }); const rocks = [rockG(1), rockG(2), rockG(3), rockG(4)];
  { const r = RNG(41); for (let i = 0; i < 70; i++) { const x = -5 - r() * 90, z = 25 - r() * 160, s = .3 + Math.pow(r(), 2.2) * 3.4, b = new THREE.Mesh(rocks[i % 4], bM); b.scale.set(s * (1 + r() * .5), s, s * (1 + r() * .4)); b.position.set(x, (nz(x * .05, z * .05) - 1) * 1.6 - Math.max(0, x + 2) * .5 + s * .25, z); b.rotation.y = r() * 6.28; b.castShadow = b.receiveShadow = true; edge.add(b); } }
  const edSunM = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), new THREE.MeshBasicMaterial({ color: 0xfffdf4 })), edGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glow, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: .85 }));
  edSunM.position.set(900, 420, -260); edSunM.scale.setScalar(10); edGlow.position.copy(edSunM.position); edGlow.scale.setScalar(130); edge.add(edSunM, edGlow);
  function drawEdge(w, t) { setCam(w.cam); R.toneMappingExposure = w.exp ?? 1; R.render(edge, cam); }

  const SETS = { space: drawSpace, street: drawStreet, sea: drawSea, edge: drawEdge };
  function draw(f) {
    const prev = PREV && PREV.w && PREV.opacity > 0 ? PREV : null; PREV = null;
    if (prev) { SETS[prev.w.set](prev.w, f.t); ctxA.clearRect(0, 0, glA.width, glA.height); ctxA.drawImage(canvas, 0, 0, glA.width, glA.height); glA.style.opacity = f.w ? 1 : prev.opacity; } else glA.style.opacity = 0;
    if (f.w) { SETS[f.w.set](f.w, f.t); canvas.style.opacity = prev ? f.opacity : 1; } else canvas.style.opacity = 0;
  }
  return { draw };
}
