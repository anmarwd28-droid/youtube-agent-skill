#!/bin/bash
# Numbered shot sheet for the user's review (they answer with shot numbers).
# usage: sheet.sh <video.mp4> <out.jpg> t1 t2 ... (12 times -> 6x2; 15 -> use TILE=5x3)
V=$1; O=$2; shift 2; TMP=$(mktemp -d); i=1
for t in "$@"; do ffmpeg -v error -y -ss $t -i $V -frames:v 1 -vf "scale=360:640,drawbox=x=0:y=0:w=70:h=60:color=black@0.7:t=fill,drawtext=text='$i':x=14:y=10:fontsize=44:fontcolor=yellow" $TMP/$(printf %02d $i).jpg; i=$((i+1)); done
ffmpeg -v error -y -i $TMP/%02d.jpg -vf tile=${TILE:-6x2} -frames:v 1 $O && rm -rf $TMP && ls -la $O
