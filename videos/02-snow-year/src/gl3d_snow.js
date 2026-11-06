// 3D layer for the snow video: realistic Earth (NASA day/night/cloud textures) whose snow and sea ice spread from the poles.
import * as THREE from './three.module.js';

const W = 1280, H = 720;
export async function init(canvas, dpr = 1.5) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(dpr); renderer.setSize(W, H, false); renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const cam = new THREE.OrthographicCamera(0, W, 0, -H, -2000, 2000); cam.position.z = 1000;
  const load = url => new Promise((res, rej) => new THREE.TextureLoader().load(url, t => { t.colorSpace = THREE.NoColorSpace; t.anisotropy = 8; res(t); }, undefined, rej));
  const [day, night, clouds] = await Promise.all(['tex/earth_atmos_2048.jpg', 'tex/earth_lights_2048.png', 'tex/earth_clouds_1024.png'].map(load));

  const vert = `varying vec3 vN; varying vec2 vUv; void main(){ vUv = uv; vN = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
  const earthMat = new THREE.ShaderMaterial({
    uniforms: { day: { value: day }, night: { value: night }, clouds: { value: clouds }, L: { value: new THREE.Vector3(-1, 0, .3) },
                sunI: { value: 1 }, lights: { value: 0 }, cloudOff: { value: 0 }, alpha: { value: 1 }, snow: { value: 0 }, cloudy: { value: 0 } },
    vertexShader: vert, transparent: true,
    fragmentShader: `uniform sampler2D day, night, clouds; uniform vec3 L; uniform float sunI, lights, cloudOff, alpha, snow, cloudy; varying vec3 vN; varying vec2 vUv;
      float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
      float n2(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }
      float fbm(vec2 p){ float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * n2(p); p *= 2.1; a *= 0.5; } return s; }
      void main(){ vec3 n = normalize(vN); float d = dot(n, normalize(L)); float lit = smoothstep(-0.08, 0.35, d) * sunI;
        vec3 dc = texture2D(day, vUv).rgb; float cl = texture2D(clouds, vUv + vec2(cloudOff, 0.0)).a;
        cl = clamp(cl + cloudy * (fbm(vUv * vec2(18.0, 9.0) + vec2(cloudOff * 30.0, 0.0)) - 0.25), 0.0, 1.0);
        float land = smoothstep(-0.02, 0.07, dc.r - dc.b * 0.8);
        float lat = abs(vUv.y - 0.5) * 2.0;
        float nz = (fbm(vUv * vec2(60.0, 30.0)) - 0.5) * 0.22;
        float cLand = smoothstep(-0.03, 0.03, lat - (1.0 - snow * 1.15) + nz);
        float cSea = smoothstep(-0.03, 0.03, lat - (1.0 - max(0.0, snow - 0.2) * 1.3) + nz);
        float cover = mix(cSea, cLand, land);
        vec3 snowCol = mix(vec3(0.80, 0.87, 0.95), vec3(0.97, 0.98, 1.0), fbm(vUv * 90.0));
        vec3 base = mix(dc, snowCol, cover * 0.96);
        vec3 nl = texture2D(night, vUv).rgb;
        vec3 col = mix(base, vec3(1.0), cl * 0.75) * (0.012 + 0.06 * sunI + 1.05 * lit);
        float nightMask = (1.0 - lit) * (1.0 - cl * 0.7);
        col += nl * vec3(1.0, 0.82, 0.55) * nightMask * lights * 1.6;
        float rim = pow(1.0 - max(n.z, 0.0), 2.6);
        col += vec3(0.35, 0.62, 1.0) * rim * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI);
        gl_FragColor = vec4(col, alpha); }` });
  const earth = new THREE.Mesh(new THREE.SphereGeometry(1, 128, 96), earthMat);
  const atm = new THREE.Mesh(new THREE.SphereGeometry(1.06, 64, 48), new THREE.ShaderMaterial({
    uniforms: { L: earthMat.uniforms.L, sunI: earthMat.uniforms.sunI, alpha: { value: 1 } }, vertexShader: vert, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    fragmentShader: `uniform vec3 L; uniform float sunI, alpha; varying vec3 vN; void main(){ vec3 n = normalize(vN); float rim = pow(1.0 - max(n.z,0.0), 3.0);
      float d = smoothstep(-0.3, 0.7, dot(n, normalize(L))); gl_FragColor = vec4(vec3(0.3,0.6,1.0) * rim * (0.05 + d * sunI) * alpha, 1.0); }` }));
  scene.add(earth, atm);
  earth.rotation.z = 0.41;

  function draw(f) {
    const e = f.earth, vis = !!e && e.a > 0.001;
    earth.visible = atm.visible = vis;
    if (vis) {
      earth.position.set(e.x, -e.y, 0); earth.scale.setScalar(e.r); atm.position.copy(earth.position); atm.scale.setScalar(e.r);
      const lx = (f.light ? f.light[0] : e.x - 600) - e.x, ly = -((f.light ? f.light[1] : e.y - 100) - e.y);
      earthMat.uniforms.L.value.set(lx, ly, 260).normalize();
      earthMat.uniforms.sunI.value = e.sunI; earthMat.uniforms.lights.value = e.lights || 0; earthMat.uniforms.cloudOff.value = f.t * 0.004;
      earthMat.uniforms.snow.value = e.snow || 0; earthMat.uniforms.cloudy.value = e.cloudy || 0;
      earthMat.uniforms.alpha.value = e.a; atm.material.uniforms.alpha.value = e.a;
      earth.rotation.y = (e.rot ?? 4.2) + (f.t - (e.t0 || 0)) * 0.025;
    }
    canvas.style.opacity = f.opacity;
    renderer.render(scene, cam);
  }
  return { draw };
}
