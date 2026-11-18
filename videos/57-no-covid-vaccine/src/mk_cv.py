# gl3d_cv.js (#57) = gl3d_zb.js with the infection patches in red (COVID) instead of green
s = open('gl3d_zb.js').read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (a[:80], s.count(a)); s = s.replace(a, b)
rep("col * vec3(0.4, 0.9, 0.34) + vec3(0.02, 0.07, 0.015) * lit", "col * vec3(0.82, 0.26, 0.22) + vec3(0.13, 0.008, 0.004) * lit")
rep("col += vec3(0.4, 1.0, 0.2) * infA", "col += vec3(1.0, 0.3, 0.2) * infA")
rep("col += vec3(0.45, 1.0, 0.2) * edge", "col += vec3(1.0, 0.34, 0.22) * edge")
rep("vec3(0.55, 1.6, 0.25), im", "vec3(1.6, 0.55, 0.38), im")
open('gl3d_cv.js', 'w').write(s); print('ok')
