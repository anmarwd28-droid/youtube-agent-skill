#!/bin/bash
# Resumable full render in 150-frame chunks with 4 parallel workers. Finished chunks are kept.
# usage: render_chunks.sh <work_dir> <name> <total_seconds> <frames> <base_port>
#   <work_dir> holds the toolkit copy plus <name>.html; <work_dir>/<name>/ holds timing.json and mixed.wav.
# Output: <work_dir>/<name>/<name>_short.mp4. To redo part of a video, delete those chunks/cNNN.mp4 and run again.
# A chunk can die on a screenshot timeout: just run again (it retries once by itself).
W=$1; name=$2; tot=$3; N=$4; P=$5; C=150; D=$W/$name/chunks; mkdir -p $D; nc=$(( (N + C - 1) / C ))
cd $W
worker() { w=$1; for ((i=w; i<nc; i+=4)); do f=$D/c$(printf %03d $i).mp4; [ -s $f ] && continue
    F0=$((i*C)); F1=$(( (i+1)*C < N ? (i+1)*C : N ))
    FPS=30 VW=1280 VH=720 PORT=$((P+w)) F0=$F0 F1=$F1 TIMING=$W/$name/timing.json node render3.js ${name}_render.html x $D/tmp$i.mp4 $tot > $D/log$i.txt 2>&1 && mv $D/tmp$i.mp4 $f; done; }
for pass in 1 2; do
  for w in 0 1 2 3; do worker $w & done; wait
  miss=0; for ((i=0; i<nc; i++)); do [ -s $D/c$(printf %03d $i).mp4 ] || { echo "$name missing chunk $i (pass $pass)"; miss=1; }; done
  [ $miss = 0 ] && break
done
[ $miss = 0 ] || exit 1
cd $D && ls c*.mp4 | sort | sed "s/^/file '/;s/$/'/" > list.txt && ffmpeg -y -v error -f concat -safe 0 -i list.txt -i ../mixed.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t $tot -movflags +faststart ../${name}_long.mp4 && echo "$name done $(date -u +%T)"
