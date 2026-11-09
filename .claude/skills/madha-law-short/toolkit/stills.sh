#!/bin/bash
# Test stills (never skip; the user wants full test stills every time).
# usage: stills.sh <work_dir> <name> <total_seconds> <port> t1,t2,...   -> <work_dir>/<name>/st/s_<t>.jpg
W=$1; name=$2; tot=$3; P=$4; L=$5; mkdir -p $W/$name/st; cd $W
TIMING=$W/$name/timing.json PORT=$P FPS=30 VW=720 VH=1280 node render3.js $name.html x x $tot $W/$name/st $L
