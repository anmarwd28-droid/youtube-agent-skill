# makes gl3d_tr.js (#56) from gl3d_ap.js: the Earth can morph into a regular tetrahedron of the same volume
# disc.tet 0..1 (shape), disc.pool 0..1 (water and air run into four round seas at the face centres), disc.quake 0..1 (glowing edges while it collapses)
s = open('gl3d_ap.js').read()
def R(a, b):
    global s
    assert s.count(a) == 1, a[:60]; s = s.replace(a, b)
FN = "const vec3 F0 = vec3(0.0, 0.0, -1.0), F1 = vec3(-0.9428090, 0.0, 0.3333333), F2 = vec3(0.4714045, -0.8164966, 0.3333333), F3 = vec3(0.4714045, 0.8164966, 0.3333333);"
R("star: { value: 0 }, st: { value: 0 } };", "star: { value: 0 }, st: { value: 0 }, tet: { value: 0 }, pool: { value: 0 }, quake: { value: 0 } };")
R("vertexShader: `attribute vec2 rt; uniform float m; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW; varying vec3 vS;",
  "vertexShader: `attribute vec2 rt; uniform float m, tet; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW; varying vec3 vS; varying vec3 vF0, vF1, vF2, vF3; " + FN)
R("vec3 sp = vec3(cos(lat) * sin(lon), -cos(lat) * cos(lon), sin(lat)); vS = sp; vec3 p = mix(position, sp, m);",
  "vec3 sp = vec3(cos(lat) * sin(lon), -cos(lat) * cos(lon), sin(lat)); vS = sp; float kk = max(max(dot(sp, F0), dot(sp, F1)), max(dot(sp, F2), dot(sp, F3))); vec3 tp = sp * (0.6708 / max(kk, 0.3)); vec3 p = mix(position, mix(sp, tp, tet), m);\n        vF0 = normalize(mat3(modelMatrix) * F0); vF1 = normalize(mat3(modelMatrix) * F1); vF2 = normalize(mat3(modelMatrix) * F2); vF3 = normalize(mat3(modelMatrix) * F3);")
R("uniform float m, sunI, lights, dry, sea, clouds, tm, swap, ridgeA, trenchA, heat, boil, venus, scorch, star, st; uniform vec3 lc; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW; varying vec3 vS;",
  "uniform float m, sunI, lights, dry, sea, clouds, tm, swap, ridgeA, trenchA, heat, boil, venus, scorch, star, st, tet, pool, quake; uniform vec3 lc; varying vec3 vN; varying vec2 vUv; varying float vR; varying vec3 vW; varying vec3 vS; varying vec3 vF0, vF1, vF2, vF3; " + FN)
R("void main(){ vec3 n = normalize(vN); vec3 l = normalize(L);",
  "void main(){ vec3 n = normalize(vN); vec3 ps = normalize(vS); float e0 = dot(ps, F0), e1 = dot(ps, F1), e2 = dot(ps, F2), e3 = dot(ps, F3); float k1 = max(max(e0, e1), max(e2, e3));\n"
  "        float k2 = (k1 == e0) ? max(max(e1, e2), e3) : (k1 == e1) ? max(max(e0, e2), e3) : (k1 == e2) ? max(max(e0, e1), e3) : max(max(e0, e1), e2); vec3 fw = (k1 == e0) ? vF0 : (k1 == e1) ? vF1 : (k1 == e2) ? vF2 : vF3;\n"
  "        n = normalize(mix(n, fw, tet)); vec3 l = normalize(L);")
R("        vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit * lc);",
  "        float sea2 = 0.0; if (pool > 0.0) { float sh = sf3(ps * 30.0) - 0.5; sea2 = smoothstep(0.962, 0.967, k1 + 0.006 * sh); float shore = smoothstep(0.952, 0.962, k1 + 0.004 * sh) * (1.0 - sea2);\n"
  "          float e = clamp((1.0 / k1 - 1.0) / 2.0, 0.0, 1.0); vec3 tq = ps / k1; float rn = sf3(tq * 5.0); vec3 rock = mix(vec3(0.40, 0.33, 0.27), vec3(0.64, 0.56, 0.47), rn);\n"
  "          rock = mix(rock, vec3(0.30, 0.30, 0.33), smoothstep(0.15, 0.7, e)); rock = mix(rock, vec3(0.80, 0.83, 0.88), smoothstep(0.55, 0.9, e) * (0.4 + 0.4 * sn3(tq * 14.0)));\n"
  "          rock *= 0.88 + 0.24 * sf3(tq * 22.0); float ridge = 1.0 - abs(2.0 * sf3(tq * 3.2 + vec3(3.1)) - 1.0); rock *= 0.82 + 0.3 * pow(ridge, 5.0);\n"
  "          vec3 g = mix(rock, mix(vec3(0.22, 0.40, 0.16), vec3(0.55, 0.50, 0.36), smoothstep(0.958, 0.952, k1)), shore); vec3 seaC = mix(vec3(0.06, 0.27, 0.48), vec3(0.02, 0.10, 0.26), smoothstep(0.967, 0.99, k1)); g = mix(g, seaC, sea2);\n"
  "          c = mix(c, g, pool); ocean = mix(ocean, sea2, pool); cld *= mix(1.0, smoothstep(0.945, 0.97, k1), pool); c = mix(c, vec3(1.0), cld * 0.7 * pool); }\n"
  "        vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit * lc);")
R("* (1.0 - lit) * (1.0 - cld * 0.7) * (1.0 - venus) * lights * 1.6;", "* (1.0 - lit) * (1.0 - cld * 0.7) * (1.0 - venus) * lights * 1.6 * (1.0 - pool);")
R("* rimA * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI) * (1.0 - star);", "* rimA * (0.08 + 0.9 * smoothstep(-0.4, 0.6, d) * sunI) * (1.0 - star) * (1.0 - 0.9 * tet);\n"
  "        col += vec3(1.0, 0.42, 0.12) * (1.0 - smoothstep(0.0, 0.035, k1 - k2)) * quake * 1.6; col = mix(col, col * 0.75 + vec3(0.05, 0.02, 0.0), quake * 0.3);")
R("atm.material.uniforms.a.value = m * m * (", "discU.tet.value = D.tet || 0; discU.pool.value = D.pool || 0; discU.quake.value = D.quake || 0; atm.material.uniforms.a.value = (1 - (D.tet || 0)) * m * m * (")
R('const NR = 180, NS = 400', 'const NR = 360, NS = 900')
R('        vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit * lc);\n        col += vec3(0.22', '        vec3 col = c * (0.012 + 0.07 * sunI + 1.15 * lit * lc); col += c * 0.07 * tet; col += vec3(0.25, 0.5, 0.95) * 0.22 * smoothstep(0.935, 0.962, k1) * (1.0 - sea2) * pool * (0.3 + lit);\n        col += vec3(0.22')
open('gl3d_tr.js', 'w').write(s); print('ok')
