#!/bin/bash
# landscape test stills: stillsw.sh <work_dir> <name> <total> <port> t1,t2,...
W=$1; name=$2; tot=$3; P=$4; L=$5; mkdir -p $W/$name/st; cd $W
TIMING=$W/$name/timing.json PORT=$P FPS=30 VW=1280 VH=720 node render3.js $name.html x x $tot $W/$name/st $L
