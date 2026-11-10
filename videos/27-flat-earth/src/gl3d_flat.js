// 3D layer for the flat-Earth Short: Sun, Earth, Moon (as gl3d_v2) plus F.disc: the real Earth map (Solar System Scope 8K, azimuthal
// projection) on a thick rock disc (Poly Haven rock_face_03) that can morph into a globe (m: 0 disc .. 1 sphere), with a central sea dome.
import * as THREE from './three.module.js';

const W = 720, H = 1280;
export async function init(canvas, dpr = 1.5) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true }); renderer.sortObjects = true;
  renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, W, 0, -H, -2000, 2000); cam.position.z = 1000;
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds, moonTex] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png', 'tex/moon_1024.jpg'].map(load));
  clouds.colorSpace = THREE.NoColorSpace;

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

  // ---------- the flat Earth disc ----------
  const [fDay, fNight, fCl, rock] = await Promise.all(['tex/flat_day.jpg', 'tex/flat_night.jpg', 'tex/flat_clouds.jpg', 'tex/rock_face.jpg'].map(load));
  rock.wrapS = rock.wrapT = THREE.RepeatWrapping;
  const NR = 180, NS = 400, pos = [], uvs = [], rr = [], idx = [];
  for (let i = 0; i <= NR; i++) for (let j = 0; j <= NS; j++) { const r = i / NR, th = j / NS * Math.PI * 2, u = r * Math.sin(th), v = r * Math.cos(th);
    pos.push(u, -v, 0); uvs.push(.5 + .5 * u, .5 + .5 * v); rr.push(r, th); }
  for (let i = 0; i < NR; i++) for (let j = 0; j < NS; j++) { const a0 = i * (NS + 1) + j, b0 = a0 + NS + 1; idx.push(a0, b0, a0 + 1, b0, b0 + 1, a0 + 1); }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); dg.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2)); dg.setAttribute('rt', new THREE.Float32BufferAttribute(rr, 2)); dg.setIndex(idx);
  const discMat = new THREE.ShaderMaterial({
    uniforms: { day: { value: fDay }, night: { value: fNight }, cl: { value: fCl }, L: { value: new THREE.Vector3(0, .3, 1) }, m: { value: 0 }, sunI: { value: 1 }, lights: { value: 0 }, dry: { value: 0 }, sea: { value: 0 }, alpha: { value: 1 }, clouds: { value: .8 } },
    transparent: true,
    vertexShader: `attribute vec2 rt; uniform float m; varying vec3 vN; varying vec2 vUv; varying float vR;
      void main(){ vUv = uv; vR = rt.x; float lat = 1.5707963 - rt.x * 3.14159265, lon = rt.y;
        vec3 sp = vec3(cos(lat) * sin(lon), -cos(lat) * cos(lon), sin(lat)); vec3 p = mix(position, sp, m); vec3 n = normalize(mix(vec3(0.0,0.0,1.0), sp, m));
        vN = normalize(mat3(modelMatrix) * n); gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0); }`,
    fragmentShader: `uniform sampler2D day, night, cl; uniform vec3 L; uniform float m, sunI, lights, dry, sea, alpha, clouds; varying vec3 vN; varying vec2 vUv; varying float vR;
      void main(){ vec3 n = normalize(vN); vec3 l = normalize(L); float d = dot(n, l); float lit = smoothstep(-0.08, 0.3, d) * sunI;
        vec3 c = texture2D(day, vUv).rgb; float ocean = smoothstep(0.05, 0.25, c.b - max(c.r, c.g) * 0.9);
        // dry rims: oceans drained to the centre leave pale sea floor and desert
        float rim = dry * smoothstep(0.45, 0.8, vR);
        vec3 floorC = mix(vec3(0.62, 0.55, 0.45), vec3(0.45, 0.4, 0.34), smoothstep(0.6, 1.0, vR));
        c = mix(c, mix(c * vec3(1.15, 1.0, 0.75), floorC, ocean), rim);
        // the central sea swallows the middle
        float mid = sea * smoothstep(0.42, 0.18, vR); c = mix(c, vec3(0.04, 0.16, 0.36), mid);
        float cld = texture2D(cl, vUv).r * clouds * (1.0 - rim * 0.9);
        c = mix(c, vec3(1.0), cld * 0.8);
        vec3 col = c * (0.02 + 0.05 * sunI + 1.0 * lit);
        vec3 h = normalize(l + vec3(0.0, 0.0, 1.0)); col += vec3(1.0, 0.95, 0.85) * pow(max(dot(n, h), 0.0), 60.0) * (ocean * (1.0 - rim) + mid) * 0.5 * lit;
        col += texture2D(night, vUv).rgb * vec3(1.0, 0.82, 0.55) * (1.0 - lit) * lights * 1.7 * (1.0 - cld);
        float edge = smoothstep(1.0, 0.985, vR); gl_FragColor = vec4(col, alpha * mix(edge, 1.0, m)); }` });
  const disc = new THREE.Mesh(dg, discMat);
  // the rock side wall and underside
  const sideMat = new THREE.ShaderMaterial({ uniforms: { tex: { value: rock }, L: discMat.uniforms.L, sunI: discMat.uniforms.sunI, alpha: { value: 1 } }, transparent: true,
    vertexShader: `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv * vec2(14.0, 1.0); vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform sampler2D tex; uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; varying vec2 vUv;
      void main(){ vec3 n = normalize(vN); float lit = max(dot(n, normalize(L)), 0.0) * sunI; vec3 c = texture2D(tex, vUv).rgb * vec3(0.9, 0.8, 0.7);
        float top = smoothstep(0.0, 0.15, vUv.y); gl_FragColor = vec4(c * (0.06 + 0.9 * lit + 0.25 * sunI) * mix(0.35, 1.0, top), alpha); }` });
  const sideG = new THREE.CylinderGeometry(1, .93, .12, 256, 1, true); sideG.rotateX(Math.PI / 2); sideG.translate(0, 0, -.06);
  const side = new THREE.Mesh(sideG, sideMat);
  const botG = new THREE.CircleGeometry(.93, 128); botG.rotateX(Math.PI); botG.translate(0, 0, -.12);
  const bot = new THREE.Mesh(botG, sideMat);
  // the central sea: a lens of water held by gravity at the middle
  const seaMat = new THREE.ShaderMaterial({ uniforms: { L: discMat.uniforms.L, sunI: discMat.uniforms.sunI, alpha: { value: 0 } }, transparent: true, depthWrite: false,
    vertexShader: `varying vec3 vN; varying vec3 vP; void main(){ vP = position; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; varying vec3 vP;
      void main(){ vec3 n = normalize(vN); vec3 l = normalize(L); float lit = max(dot(n, l), 0.0) * sunI; float fr = pow(1.0 - max(n.z, 0.0), 2.0);
        float dl = dot(n, l); vec3 c = vec3(0.05, 0.3, 0.55) * (0.25 + 1.0 * smoothstep(-0.2, 1.0, dl) * sunI) * (1.0 - 0.35 * fr);
        c += vec3(1.0, 0.95, 0.85) * pow(max(dot(n, normalize(l + vec3(0.0,0.0,1.0))), 0.0), 80.0) * 0.9 * sunI;
        gl_FragColor = vec4(c, alpha * 0.92); }` });
  const seaG = new THREE.SphereGeometry(1, 128, 64, 0, Math.PI * 2, 0, Math.PI / 2); seaG.rotateX(Math.PI / 2);
  const seaM = new THREE.Mesh(seaG, seaMat);
  const dTilt = new THREE.Group(), dSpin = new THREE.Group(); dTilt.add(dSpin); dSpin.add(disc, side, bot, seaM);
  scene.add(dTilt);
  scene.add(sun, earth, atm, moon); earth.renderOrder = 0; moon.renderOrder = 1; atm.renderOrder = 2;
  earth.rotation.order = 'ZYX'; earth.rotation.z = 0.41; // axial tilt (spin about the tilted axis)

  function place(m, o) { m.visible = !!o && o.a > 0.001; if (!m.visible) return; m.position.set(o.x, -o.y, 0); m.scale.setScalar(o.r); }
  function draw(f) {
    place(sun, f.sun); place(earth, f.earth); place(atm, f.earth); place(moon, f.moon); if (f.moon && f.earth && Math.abs(f.moon.x - f.earth.x) < 1 && Math.abs(f.moon.y - f.earth.y) < 1) moon.scale.multiplyScalar(1.004);
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
    dTilt.visible = !!f.disc && f.disc.a > 0.001;
    if (dTilt.visible) { const D = f.disc; dTilt.position.set(D.x, -D.y, 0); dTilt.scale.setScalar(D.r); dTilt.rotation.x = -(D.tilt || 0); dSpin.rotation.z = D.spin || 0;
      const u = discMat.uniforms; u.m.value = D.m || 0; u.sunI.value = D.sunI ?? 1; u.lights.value = D.lights || 0; u.dry.value = D.dry || 0; u.sea.value = D.sea || 0; u.alpha.value = D.a; u.clouds.value = D.clouds ?? .8;
      const lv = D.L || [0, .35, 1]; u.L.value.set(lv[0], lv[1], lv[2]).normalize();
      const sv = (D.side ?? 1) * D.a * (1 - Math.min(1, (D.m || 0) * 6)); side.visible = bot.visible = sv > .001; sideMat.uniforms.alpha.value = sv;
      seaM.visible = (D.sea || 0) > .001; seaMat.uniforms.alpha.value = (D.sea || 0) * D.a; seaM.scale.set(.46, .46, .015 + .06 * (D.sea || 0)); }
    canvas.style.opacity = f.opacity;
    renderer.render(scene, cam);
  }
  return { draw };
}
