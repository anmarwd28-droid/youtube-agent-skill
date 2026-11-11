# makes gl3d_wide.js (1280x720) from gl3d_world.js and adds: Earth ice cover, a faint starlight ambient, an atmosphere factor, Moon brightness
s = open('gl3d_world.js').read()
def rep(a, b):
    global s
    assert s.count(a) == 1, a[:60]
    s = s.replace(a, b)
rep("const W = 720, H = 1280;", "const W = 1280, H = 720;")
rep("clouds: { value: .75 }, camP", "clouds: { value: .75 }, ice: { value: 0 }, amb: { value: 0 }, camP")
rep("uniform float m, sunI, lights, dry, sea, clouds, tm; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW;\n      void main(){ vec3 n", "uniform float m, sunI, lights, dry, sea, clouds, tm, ice, amb; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW;\n      void main(){ vec3 n")
rep("c = mix(c, vec3(0.04, 0.16, 0.36), mid);", "c = mix(c, vec3(0.04, 0.16, 0.36), mid); float lum = dot(c, vec3(0.3, 0.59, 0.11)); float pd = abs(vR - 0.5) * 2.0; float im = smoothstep(0.85 - ice * 1.3, 1.1 - ice * 1.3, pd + (lum - 0.3) * 0.25) * step(0.001, ice); vec3 iceC = mix(vec3(0.84, 0.89, 0.94), vec3(0.6, 0.74, 0.9), ocean) * (0.78 + 0.5 * lum); c = mix(c, iceC, im);")
rep("float cld = texture2D(cl, cuv).r * clouds * (1.0 - rim * 0.9);", "float cld = texture2D(cl, cuv).r * clouds * (1.0 - rim * 0.9) * (1.0 - 0.6 * im);")
rep("vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit);", "vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit) + c * amb * vec3(0.6, 0.75, 1.0);")
rep("(ocean * (1.0 - rim) * (1.0 - cld) + mid) * 0.55 * lit;", "(ocean * (1.0 - rim) * (1.0 - cld) * (1.0 - im) + mid) * 0.55 * lit;")
rep("discU.tm.value = t * .012;", "discU.tm.value = t * .012; discU.ice.value = D.ice || 0; discU.amb.value = D.amb || 0;")
rep("atm.material.uniforms.a.value = m * m; }", "atm.material.uniforms.a.value = m * m * (D.atm ?? 1); }")
rep("shR: { value: 2.7 } };", "shR: { value: 2.7 }, mI: { value: 1 }, mA: { value: 0 } };")
rep("uniform sampler2D tex; uniform vec3 L, shC, shD; uniform float shR;", "uniform sampler2D tex; uniform vec3 L, shC, shD; uniform float shR, mI, mA;")
rep("vec3 col = c * (0.025 + 1.15 * pow(lit, 0.8));", "vec3 col = c * (0.025 + mA + 1.15 * pow(lit, 0.8) * mI);")
rep("moonU.shR.value = M.shR;", "moonU.shR.value = M.shR ?? 0.001; moonU.mI.value = M.i ?? 1; moonU.mA.value = M.amb || 0; moon.scale.setScalar(M.r || 1);")
rep("moonU.shC.value.copy(V3(M.shC));", "moonU.shC.value.copy(V3(M.shC || [99, 99, 99]));")
rep("ringM.position.copy(V3(M.shC));", "ringM.position.copy(V3(M.shC || [99, 99, 99]));")
open('gl3d_wide.js', 'w').write(s); print('gl3d_wide ok')
