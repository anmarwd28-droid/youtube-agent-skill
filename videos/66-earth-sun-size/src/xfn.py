import sys,re
# usage: xfn.py file name1 name2 ... ; prints top-level function/const blocks with these names
src=open(sys.argv[1]).read().split('\n'); names=set(sys.argv[2:]); out=[]
i=0
while i<len(src):
  m=re.match(r'^(?:function|const)\s+([A-Za-z0-9_$]+)',src[i])
  if m and m.group(1) in names:
    blk=[src[i]]; depth=src[i].count('{')-src[i].count('}'); j=i+1
    # const one-liners / functions: continue while depth>0 or the next line is a continuation (indented)
    while j<len(src) and (depth>0 or (src[j].startswith('  ') and not src[i].startswith('function'))):
      blk.append(src[j]); depth+=src[j].count('{')-src[j].count('}'); j+=1
    out+=blk; i=j; continue
  i+=1
print('\n'.join(out))
