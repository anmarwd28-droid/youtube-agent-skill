import re,sys
# report top-level names declared in more than one file (const/let duplicates are fatal; function overrides are risky)
files=sys.argv[1:]; seen={}
for f in files:
    for m in re.finditer(r'^(?:const|let|var|function)\s+([A-Za-z_$][\w$]*)',open(f).read(),re.M):
        seen.setdefault(m.group(1),[]).append(f)
mine=set(files[-int(__import__('os').environ.get('NMINE','1')):])
for k,v in seen.items():
    if len(v)>1 and any(x in mine for x in v): print(k,v)
