#!/usr/bin/env bash
# Prints the press kit (layouts/dossier.html) to PDF in the three languages, with Chrome (or Edge) headless.
# The PDFs go to static/docs/ and are offered in the Media page (press room).
#
#   hugo server --baseURL http://localhost:1319/euskelec/ --port 1319   # in another terminal (or the preview)
#   scripts/build-dossier.sh [BASE_URL]                                   # default http://localhost:1319/euskelec
#
# Run it again whenever the texts it takes from the site change (home, competition page, hugo.toml organisers).
set -euo pipefail
base=${1:-http://localhost:1319/euskelec}
root="$(cd "$(dirname "$0")/.." && pwd)"
browser=""
for b in "/c/Program Files/Google/Chrome/Application/chrome.exe" "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
         "/c/Program Files/Microsoft/Edge/Application/msedge.exe" "$(command -v chromium || true)" "$(command -v google-chrome || true)"; do
  [ -n "$b" ] && [ -x "$b" ] && browser="$b" && break
done
[ -n "$browser" ] || { echo "Chrome or Edge not found" >&2; exit 1; }

# A separate, throwaway profile: headless printing fails when it shares the profile of an open browser
profile=$(mktemp -d)
trap 'rm -rf "$profile"' EXIT
winpath() { if command -v cygpath >/dev/null; then cygpath -w "$1"; else echo "$1"; fi; }

# language | page path | output PDF
pages="eu|eu/prentsa-dossierra/|euskelec-prentsa-dossierra.pdf
es|es/dossier-de-prensa/|euskelec-dossier-de-prensa.pdf
en|en/press-kit/|euskelec-press-kit.pdf"

while IFS='|' read -r lang path pdf; do
  out="$root/static/docs/$pdf"
  rm -f "$out"
  "$browser" --headless=new --disable-gpu --no-pdf-header-footer --user-data-dir="$(winpath "$profile")" \
    --run-all-compositor-stages-before-draw --virtual-time-budget=8000 \
    --print-to-pdf="$(winpath "$out")" "$base/$path" >/dev/null 2>&1 || true
  if [ -s "$out" ]; then echo "$lang → static/docs/$pdf ($(wc -c < "$out") bytes)"; else echo "$lang → FAILED ($base/$path)" >&2; fi
done <<< "$pages"
