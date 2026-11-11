#!/bin/bash
# contact sheet of test stills: cs.sh <out.jpg> t1 t2 ... (3 per row, 640x360 each)
O=$1; shift; TMP=$(mktemp -d); i=1
for t in "$@"; do ffmpeg -v error -y -i sunl/st/s_$t.jpg -vf "scale=640:360,drawtext=text='$t':x=8:y=330:fontsize=22:fontcolor=yellow:box=1:boxcolor=black@0.6" $TMP/$(printf %02d $i).jpg; i=$((i+1)); done
n=$#; rows=$(( (n + 2) / 3 )); ffmpeg -v error -y -i $TMP/%02d.jpg -vf tile=3x$rows -frames:v 1 -q:v 3 $O; rm -rf $TMP
