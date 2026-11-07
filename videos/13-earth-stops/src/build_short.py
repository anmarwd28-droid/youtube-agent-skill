import re, sys
name, mid_file, keys = sys.argv[1], sys.argv[2], sys.argv[3].split('|')
a = open('animals2_src.html').read()
head = a[:a.index('// ---------- scenes ----------')]; tail = a[a.index('window.render = function'):]
if '.chip.ice' not in head:
    head = head.replace('  .chip.red {', '  .chip.ice { background: rgba(225,242,255,.95); color: #0d2238; }\n  .chip.red {')
head = re.sub(r"const KEY = new Set\(\[.*?\]\);", 'const KEY = new Set(' + repr(keys).replace("'", '"') + ');', head, flags=re.S)
src = head + open(mid_file).read() + '\n' + tail
open(name + '_src.html', 'w').write(src)
sun = open('sun.html').read().split('\n')
fish = '\n'.join(sun[371:390])
src = src.replace('//@@FISH@@', fish)
open(name + '.html', 'w').write(src.replace('//@@SHARED@@', '\n'.join(sun[102:158])).replace('//@@PERSON@@', '\n'.join(sun[212:260])).replace('//@@LAMP@@', '\n'.join(sun[278:283])))
print('built', name, '.chip.ice' in head)
