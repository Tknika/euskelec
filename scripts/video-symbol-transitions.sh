#!/usr/bin/env bash
# Symbol transitions for the home video: at some cuts (not all), the next scene comes in THROUGH the
# Euskelec symbol. The frame is split in 2 columns x 5 rows; the five "symbol" cells (right column rows
# 0,2,4 and left column rows 1,3, as in the logo) open first as bars growing from the sides and show the
# next scene, then the other five cells open and complete it. No colour blocks: only the two scenes.
# It is an ffmpeg xfade with a custom mask, so the two scenes overlap for DUR seconds and the video
# gets DUR seconds shorter per transition.
#
# Usage:
#   scripts/video-symbol-transitions.sh SOURCE DURATION OUTPUT_1920 OUTPUT_960 CUT [CUT…]
#   scripts/video-symbol-transitions.sh _originals/videos/home.mov 0.7 static/video/home-v3-1920.mp4 static/video/home-v3-960.mp4 2.12 5.48
# Find the cuts with:
#   ffmpeg -i home.mov -vf "select='gt(scene,0.25)',showinfo" -an -f null - 2>&1 | grep -o 'pts_time:[0-9.]*'
# When the video changes, give the files a new name (home-v3 → home-v4, in the three content/*/_index.md):
# browsers keep the old file cached under the same name.
set -euo pipefail
src=$1; T=$2; out1920=$3; out960=$4; shift 4
cuts=("$@")

# Mask (xfade custom: P goes from 1 to 0, so p = 1-P is the progress; A = current scene, B = next one).
# Symbol cells open from 0 to 0.55 of the transition, the others from 0.4 to 1; each row a little later.
p="(1-P)"
c="gte(X,W/2)"
r="floor(Y*5/H)"
sym="mod($r+$c,2)"
start="(if($sym,0,0.4)+$r*0.03)"
q="clip(($p-$start)/0.48,0,1)"
e="($q*$q*(3-2*$q))"
reveal="if($c,gt(X,W-W/2*$e),lt(X,W/2*$e))"
expr="if($reveal,B,A)"

tmp=$(mktemp -d); trap 'rm -rf "$tmp"' EXIT
fc="$tmp/fc.txt"
{
  n=$(( ${#cuts[@]} + 1 ))
  printf "[0:v]fps=25,format=yuv420p,split=%d" "$n"; for i in $(seq 0 $((n-1))); do printf "[s%d]" "$i"; done; echo ";"
  prevcut=0
  for i in $(seq 0 $((n-1))); do
    if [ "$i" -lt "${#cuts[@]}" ]; then end=${cuts[$i]}; echo "[s$i]trim=start=$prevcut:end=$end,setpts=PTS-STARTPTS[g$i];"; prevcut=$end
    else echo "[s$i]trim=start=$prevcut,setpts=PTS-STARTPTS[g$i];"; fi
  done
  acc="g0"; len=${cuts[0]}
  for i in $(seq 1 $((n-1))); do
    offset=$(awk "BEGIN{print $len-$T}")
    [ "$i" -lt "${#cuts[@]}" ] && seglen=$(awk "BEGIN{print ${cuts[$i]}-${cuts[$((i-1))]}}") || seglen=0
    echo "[$acc][g$i]xfade=transition=custom:duration=$T:offset=$offset:expr='$expr'[x$i];"
    acc="x$i"; len=$(awk "BEGIN{print $len+$seglen-$T}")
  done
  echo "[$acc]split[o1][o2];[o2]scale=960:-2[o960];[o1]null[o1920]"
} > "$fc"

ffmpeg -v error -y -i "$src" -/filter_complex "$fc" \
  -map "[o1920]" -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -profile:v high -movflags +faststart "$out1920" \
  -map "[o960]" -an -c:v libx264 -preset slow -crf 28 -pix_fmt yuv420p -profile:v high -movflags +faststart "$out960"
echo "Wrote $out1920 and $out960"
