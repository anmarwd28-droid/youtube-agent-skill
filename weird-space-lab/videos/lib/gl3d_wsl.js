// 3D layer: realistic Sun, Earth (NASA day/night/cloud textures) and Moon, drawn in screen pixel space.
import * as THREE from './three.module.js';

const W = 720, H = 1280;
export async function init(canvas, dpr = 1.5) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, W, 0, -H, -2000, 2000); cam.position.z = 1000;
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds, moonTex] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png', 'tex/moon_1024.jpg'].map(load));
  clouds.colorSpace = THREE.NoColorSpace;
  // real planet maps (Solar System Scope, CC BY 4.0, based on NASA imagery), loaded on demand
  const PL = {}; const plNames = ['mars', 'jupiter', 'saturn', 'sun', 'venus_atmosphere', 'mercury', 'moon', 'neptune', 'uranus'];
  await Promise.all(plNames.map(n => load('planets/2k_' + n + '.jpg').then(t => { PL[n] = t; }).catch(() => {})));

  const vert = `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const earthMat = new THREE.ShaderMaterial({
    uniforms: { day: { value: day }, night: { value: night }, clouds: { value: clouds }, L: { value: new THREE.Vector3(-1, 0, .3) },
                sunI: { value: 1 }, lights: { value: 0 }, cloudOff: { value: 0 }, alpha: { value: 1 } },
    vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D day, night, clouds; uniform vec3 L; uniform float sunI, lights, cloudOff, alpha; varying vec3 vN; varying vec2 vUv;
      vec3 toLin(vec3 c){ return pow(c, vec3(2.2)); }
      void main(){ vec3 n = normalize(vN); float d = dot(n, normalize(L)); float lit = smoothstep(-0.08, 0.35, d) * sunI;
        vec3 dc = texture2D(day, vUv).rgb; float cl = texture2D(clouds, vUv + vec2(cloudOff, 0.0)).a;
        vec3 nl = texture2D(night, vUv).rgb;
        vec3 col = mix(dc, vec3(1.0), cl * 0.75) * (0.012 + 0.06 * sunI + 1.05 * lit);
        float nightMask = (1.0 - lit) * (1.0 - cl * 0.7);
        col += nl * vec3(1.0, 0.82, 0.55) * nightMask * lights * 1.6;
        float rim = pow(1.0 - max(n.z, 0.0), 2.6);
        col += vec3(0.35, 0.62, 1.0) * rim * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
        gl_FragColor = vec4(col, alpha); }` });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), earthMat);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 48), new THREE.ShaderMaterial({
    uniforms: { L: earthMat.uniforms.L, sunI: earthMat.uniforms.sunI, alpha: { value: 1 } }, vertexShader: vert, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    fragmentShader: `uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; void main(){ vec3 n = normalize(vN); float rim = pow(1.0 - max(n.z,0.0), 3.0);
      float d = smoothstep(-0.3, 0.7, dot(n, normalize(L))); gl_FragColor = vec4(vec3(0.3,0.6,1.0) * rim * (0.05 + d * sunI) * alpha, 1.0); }` }));
  const moonMat = new THREE.ShaderMaterial({
    uniforms: { tex: { value: moonTex }, L: { value: new THREE.Vector3(-1, 0, .3) }, sunI: { value: 1 }, alpha: { value: 1 } }, vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; varying vec2 vUv;
      void main(){ vec3 n = normalize(vN); float lit = max(dot(n, normalize(L)), 0.0) * sunI; vec3 c = texture2D(tex, vUv).rgb;
        gl_FragColor = vec4(c * (0.025 + 1.15 * lit), alpha); }` });
  const moon = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), moonMat);
  const sunMat = new THREE.ShaderMaterial({
    uniforms: { t: { value: 0 }, alpha: { value: 1 } }, vertexShader: `varying vec3 vP; varying vec3 vN; void main(){ vP = position; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    transparent: true,
    fragmentShader: `uniform float t, alpha; varying vec3 vP; varying vec3 vN;
      float h(vec3 p){ return fract(sin(dot(p, vec3(127.1,311.7,74.7))) * 43758.5453); }
      float n3(vec3 p){ vec3 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x), mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x), f.y),
                   mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x), mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x), f.y), f.z); }
      float fbm(vec3 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 5; i++) { s += a * n3(p); p *= 2.03; a *= 0.5; } return s; }
      void main(){ vec3 n = normalize(vN); float mu = max(n.z, 0.0);
        float g = fbm(vP * 6.0 + vec3(0.0, 0.0, t * 0.25)); float g2 = fbm(vP * 18.0 - vec3(t * 0.4));
        vec3 c = mix(vec3(1.0,0.55,0.12), vec3(1.0,0.93,0.65), g * 0.8 + g2 * 0.35);
        c *= 0.45 + 0.65 * pow(mu, 0.45);   // limb darkening
        gl_FragColor = vec4(c * 1.15, alpha); }` });
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), sunMat);
  const planetMat = new THREE.ShaderMaterial({
    uniforms: { tex: { value: null }, L: { value: new THREE.Vector3(-1, 0, .3) }, sunI: { value: 1 }, alpha: { value: 1 }, haze: { value: new THREE.Vector3(0, 0, 0) } }, vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L, haze; uniform float sunI, alpha; varying vec3 vN; varying vec2 vUv;
      void main(){ vec3 n = normalize(vN); float lit = smoothstep(-0.05, 0.4, dot(n, normalize(L))) * sunI; vec3 c = texture2D(tex, vUv).rgb;
        float rim = pow(1.0 - max(n.z, 0.0), 2.4);
        gl_FragColor = vec4(c * (0.03 + 1.1 * lit) + haze * rim * (0.2 + lit), alpha); }` });
  const planet = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 64), planetMat);
  scene.add(sun, earth, atm, moon, planet);
  earth.rotation.order = 'ZYX'; earth.rotation.z = 0.41; // axial tilt (spin about the tilted axis)


  // ---------- a real 3D underwater set: sand seabed (photo texture) with moving caustics, 3D rocks (photo texture), fog ----------
  const texL = (u, rep) => load(u).then(t => { if (rep) { t.wrapS = t.wrapT = THREE.RepeatWrapping; } return t; }).catch(() => null);
  const [sandT, rockT, gravT] = await Promise.all([texL('textures/coast_sand_01.jpg', 1), texL('textures/rock_face.jpg', 1), texL('textures/coral_gravel.jpg', 1)]);
  const seaScene = new THREE.Scene(); const seaCam = new THREE.PerspectiveCamera(55, W / H, .1, 400);
  const SEA_FOG = new THREE.Color(0x0b3d5c);
  const seaVert = `varying vec3 vW; varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vN = normalize(mat3(modelMatrix)*normal); gl_Position = projectionMatrix * viewMatrix * w; }`;
  const seaFrag = (body) => `uniform sampler2D tex, tex2; uniform float t, rep, fogD, deep; uniform vec3 fogC; varying vec3 vW; varying vec3 vN; varying vec2 vUv;
    float caus(vec2 p){ float c = 0.0; for (int i = 0; i < 3; i++) { float fi = float(i); vec2 q = p * (1.3 + fi * .7) + vec2(t * (.35 + fi * .1), t * (.27 - fi * .08));
      c += abs(sin(q.x + sin(q.y * 1.7 + t))) * abs(sin(q.y + sin(q.x * 1.3 - t * .8))); } return pow(1.0 - c / 3.0, 6.0); }
    void main(){ ${body}
      float d = length(vW - cameraPosition); float f = 1.0 - exp(-d * fogD); vec3 fc = fogC * (1.0 - deep * .8);
      gl_FragColor = vec4(mix(col, fc, clamp(f, 0.0, 1.0)), 1.0); }`;
  const sandMat = new THREE.ShaderMaterial({ uniforms: { tex: { value: sandT }, tex2: { value: gravT }, t: { value: 0 }, rep: { value: 14 }, fogD: { value: .045 }, fogC: { value: SEA_FOG }, deep: { value: 0 } }, vertexShader: seaVert,
    fragmentShader: seaFrag(`vec3 a = texture2D(tex, vUv * rep).rgb; vec3 b = texture2D(tex2, vUv * rep * .6).rgb; float m = smoothstep(.45, .65, texture2D(tex2, vUv * 2.0).g);
      vec3 base = mix(a, b, m * .5) * vec3(.62, .82, .9); float sh = clamp(dot(normalize(vN), normalize(vec3(.2, 1.0, .3))), 0.0, 1.0);
      vec3 col = base * (.35 + .65 * sh) * (1.0 - deep * .75) + vec3(.55, .85, .95) * caus(vW.xz * .9) * .55 * (1.0 - deep);`) });
  const sandGeo = new THREE.PlaneGeometry(240, 240, 240, 240); sandGeo.rotateX(-Math.PI / 2);
  { const p = sandGeo.attributes.position; for (let i = 0; i < p.count; i++) { const x = p.getX(i), z = p.getZ(i); p.setY(i, Math.sin(x * .35 + z * .12) * .25 + Math.sin(z * .5 - x * .2) * .18 + Math.sin(x * 1.7) * Math.sin(z * 1.3) * .05); } sandGeo.computeVertexNormals(); }
  const sand = new THREE.Mesh(sandGeo, sandMat); seaScene.add(sand);
  const rockMat = new THREE.ShaderMaterial({ uniforms: { tex: { value: rockT }, tex2: { value: gravT }, t: { value: 0 }, rep: { value: 2 }, fogD: { value: .045 }, fogC: { value: SEA_FOG }, deep: { value: 0 } }, vertexShader: seaVert,
    fragmentShader: seaFrag(`vec3 n = normalize(vN); vec3 base = texture2D(tex, vUv * rep).rgb * vec3(.7, .85, .88); float sh = clamp(dot(n, normalize(vec3(.3, 1.0, .4))), 0.0, 1.0);
      vec3 col = base * (.18 + .9 * sh) * (1.0 - deep * .75) + vec3(.55, .85, .95) * caus(vW.xz * .9 + vW.y) * .35 * smoothstep(.2, .9, n.y) * (1.0 - deep);`) });
  const hash = (x, y, z) => { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); };
  const rocks = [];
  for (let k = 0; k < 9; k++) { const g = new THREE.IcosahedronGeometry(1, 4); const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) { const v = new THREE.Vector3(p.getX(i), p.getY(i), p.getZ(i)); const n = .75 + .35 * hash(Math.round(v.x * 3) + k, Math.round(v.y * 3), Math.round(v.z * 3)) + .12 * Math.sin(v.x * 5 + k) * Math.cos(v.z * 4);
      v.multiplyScalar(n); v.y *= .65; p.setXYZ(i, v.x, v.y, v.z); }
    g.computeVertexNormals(); const m = new THREE.Mesh(g, rockMat); seaScene.add(m); rocks.push(m); }
  const ROCK_POS = [[-6, -14, 2.2], [5, -10, 1.6], [-2.5, -6, .9], [8, -22, 3.2], [-11, -26, 3.4], [2, -30, 2.6], [-4, -42, 4], [12, -40, 3.8], [0, -18, 1.2]];
  ROCK_POS.forEach(([x, z, s], k) => { rocks[k].position.set(x, s * .25 - .2, z); rocks[k].scale.setScalar(s); rocks[k].rotation.y = k * 1.3; });
  function drawSea(f) {
    const s = f.sea3d, deep = s.deep || 0; seaScene.background = SEA_FOG.clone().multiplyScalar(1 - deep * .8);
    [sandMat, rockMat].forEach(m => { m.uniforms.t.value = f.t; m.uniforms.deep.value = deep; m.uniforms.fogD.value = .04 + deep * .05; });
    seaCam.position.set(s.camX || 0, s.camY ?? 3.2, (s.camZ ?? 8) - f.t * (s.drift ?? .25)); seaCam.lookAt(s.camX || 0, s.lookY ?? 1.2, seaCam.position.z - 12); seaCam.updateProjectionMatrix();
    renderer.render(seaScene, seaCam);
  }
  function place(m, o) { m.visible = !!o && o.a > 0.001; if (!m.visible) return; m.position.set(o.x, -o.y, 0); m.scale.setScalar(o.r); }
  function draw(f) {
    place(sun, f.sun); place(earth, f.earth); place(atm, f.earth); place(moon, f.moon); place(planet, f.planet && PL[f.planet.tex] ? f.planet : null);
    if (f.planet && PL[f.planet.tex]) { const p = f.planet, lx = (f.light ? f.light[0] : p.x - 400) - p.x, ly = -((f.light ? f.light[1] : p.y) - p.y);
      planetMat.uniforms.tex.value = PL[p.tex]; planetMat.uniforms.L.value.set(lx, ly, 120).normalize(); planetMat.uniforms.sunI.value = p.sunI ?? 1; planetMat.uniforms.alpha.value = p.a;
      const h = p.haze || [0, 0, 0]; planetMat.uniforms.haze.value.set(h[0], h[1], h[2]); planet.rotation.y = (p.rot ?? 0) + f.t * (p.spin ?? .03); planet.rotation.z = p.tilt ?? 0; }
    if (f.sun) { sunMat.uniforms.t.value = f.t; sunMat.uniforms.alpha.value = f.sun.a; }
    if (f.earth) {
      const e = f.earth, lx = (f.light ? f.light[0] : e.x - 400) - e.x, ly = -((f.light ? f.light[1] : e.y) - e.y);
      earthMat.uniforms.L.value.set(lx, ly, 120).normalize();
      earthMat.uniforms.sunI.value = e.sunI; earthMat.uniforms.lights.value = e.lights; earthMat.uniforms.cloudOff.value = f.t * 0.004;
      earthMat.uniforms.alpha.value = e.a; atm.material.uniforms.alpha.value = e.a;
      earth.rotation.y = (e.rot ?? 0.6) + f.t * 0.03; earth.rotation.z = e.tilt ?? 0.41;
    }
    if (f.moon) { const m = f.moon, lx = (f.light ? f.light[0] : m.x - 400) - m.x, ly = -((f.light ? f.light[1] : m.y) - m.y);
      moonMat.uniforms.L.value.set(lx, ly, 120).normalize(); moonMat.uniforms.sunI.value = m.sunI; moonMat.uniforms.alpha.value = m.a; moon.rotation.y = 4.2; }
    canvas.style.opacity = f.opacity;
    if (f.sea3d) { renderer.autoClear = true; drawSea(f); renderer.autoClear = false; renderer.render(scene, cam); renderer.autoClear = true; } else renderer.render(scene, cam);
  }
  return { draw };
}
