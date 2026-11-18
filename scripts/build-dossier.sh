#!/usr/bin/env bash
# Prints the press kit (layouts/dossier.html) to PDF in the three languages, with Chrome (or Edge) headless, through
# scripts/print-pdf.mjs (Node 22 or newer). The PDFs go to static/docs/ and are offered in the Media page (press room).
#
#   hugo server --baseURL http://localhost:1319/euskelec/ --port 1319   # in another terminal (or the preview)
#   scripts/build-dossier.sh [BASE_URL]                                   # default http://localhost:1319/euskelec
#
# Run it again whenever the texts it takes from the site change (home, competition page, hugo.toml organisers,
# data/participants.yaml). A PDF is only replaced when its new version printed well.
set -euo pipefail
base=${1:-http://localhost:1319/euskelec}
root="$(cd "$(dirname "$0")/.." && pwd)"
browser=""
for b in "/c/Program Files/Google/Chrome/Application/chrome.exe" "/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" \
         "/c/Program Files/Microsoft/Edge/Application/msedge.exe" "$(command -v chromium || true)" "$(command -v google-chrome || true)"; do
  [ -n "$b" ] && [ -x "$b" ] && browser="$b" && break
done
[ -n "$browser" ] || { echo "Chrome or Edge not found" >&2; exit 1; }
winpath() { if command -v cygpath >/dev/null; then cygpath -m "$1"; else echo "$1"; fi; }

# language | page path | output PDF
pages="eu|eu/prentsa-dossierra/|euskelec-prentsa-dossierra.pdf
es|es/dossier-de-prensa/|euskelec-dossier-de-prensa.pdf
en|en/press-kit/|euskelec-press-kit.pdf"

failed=0
while IFS='|' read -r lang path pdf; do
  if result=$(node "$root/scripts/print-pdf.mjs" "$(winpath "$browser")" "$base/$path" "$(winpath "$root/static/docs/$pdf")" 2>&1); then
    echo "$lang → static/docs/$pdf ($result)"
  else
    echo "$lang → $result ($base/$path); static/docs/$pdf was not changed" >&2; failed=1
  fi
done <<< "$pages"
exit $failed
