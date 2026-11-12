#!/bin/bash
# Numbered shot sheets for a long landscape video: one sheet per chapter, 12 shots (4x3), numbers run on across chapters.
# usage: sheets_long.sh <video.mp4> <chap_times.json> <total_seconds> <out_dir>   -> <out_dir>/sheet_NN.jpg
V=$1; CT=$2; TOT=$3; O=$4; mkdir -p $O
python3 - "$CT" "$TOT" > $O/_t.txt <<'PY'
import json,sys
c=json.load(open(sys.argv[1])); tot=float(sys.argv[2]); n=1
for i,ch in enumerate(c):
    a=ch["start"]; b=c[i+1]["start"] if i+1<len(c) else tot
    k=12 if b-a>=30 else 8
    for j in range(k):
        print(i+1, n, round(a+(b-a)*(j+0.5)/k,2), k); n+=1
PY
TMP=$(mktemp -d)
while read c n t k; do ffmpeg -nostdin -v error -y -ss $t -i $V -frames:v 1 -vf "scale=640:360,drawbox=x=0:y=0:w=92:h=56:color=black@0.7:t=fill,drawtext=text='$n':x=12:y=8:fontsize=40:fontcolor=yellow" $TMP/c$(printf %02d $c)_$(printf %03d $n).jpg; done < $O/_t.txt
for c in $(cut -d' ' -f1 $O/_t.txt | sort -un); do cc=$(printf %02d $c); k=$(ls $TMP/c${cc}_*.jpg | wc -l)
  ffmpeg -nostdin -v error -y -pattern_type glob -i "$TMP/c${cc}_*.jpg" -vf tile=4x$(( (k+3)/4 )) -frames:v 1 -q:v 3 $O/sheet_$cc.jpg; done
rm -rf $TMP; ls $O
