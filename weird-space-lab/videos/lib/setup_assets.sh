#!/bin/bash
# usage: setup_assets.sh <video src dir>  -> copies the realistic 3D layer, planet maps and photo textures next to the page
L=$(cd "$(dirname "$0")" && pwd); D=$1
cp "$L/gl3d_wsl.js" "$D/" && mkdir -p "$D/planets" "$D/textures" && cp "$L"/assets/planets/* "$D/planets/" && cp "$L"/assets/textures/*.jpg "$D/textures/" && echo "assets ready in $D"
