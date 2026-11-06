# AGENTS.md

Instructions for AI coding agents (and humans) working on this repository. Read [README.md](README.md) first for the overview, site map and content model; this file covers the rules and gotchas.

## Project in one paragraph

Trilingual (Basque `eu` = default, Spanish `es`, English `en`, each in its own folder: `/eu/`, `/es/`, `/en/`, with `/` redirecting to `/eu/`) static site for Euskelec, the Basque vocational training electric vehicle championship, replacing the old WordPress site at `euskelec.eus`. Built with **Hugo ≥ 0.146 (extended)** and **Tailwind CSS v4 via npm**, using a custom theme in `themes/euskelec`. It deploys to GitHub Pages through `.github/workflows/pages.yml` on every push to `main`. It shares its technology with the `cyberlehia` and `basqueunevocweek` sites, not their design or content: keep them separate.

## Commands

```sh
npm ci                                   # once: installs Tailwind (required by Hugo)
hugo server --baseURL http://localhost:1313/euskelec/   # dev server on http://localhost:1313/euskelec/eu/, the same path as GitHub Pages
hugo --gc --minify -d /tmp/check          # production build check; never into public/ while `hugo server` runs (it serves public/ and would show the production HTML, without the /euskelec/ prefix and without styles)
hugo --gc --minify --baseURL https://tknika.github.io/euskelec/ -d /tmp/out   # test a subpath build
```

There is no test suite. **A change is verified when:**
1. `hugo --gc --minify -d /tmp/check` finishes with no `ERROR` and no `WARN` lines.
2. A build with a subpath `baseURL` (command above) has no links that miss the prefix:
   `grep -rhoE '(href|src|poster)="?/[^" >]*' /tmp/out --include=*.html | grep -vE '="?/euskelec/'` prints nothing.
3. For visual changes, check the pages at ~1440px and ~390px wide, in the three languages.

## Hard rules

1. **Three languages, always.** Every content change in one of `content/eu/`, `content/es/`, `content/en/` needs the matching change in the other two, with the same `translationKey`. Every new UI string goes in `themes/euskelec/i18n/eu.yaml`, `es.yaml` and `en.yaml`; never hardcode texts in layouts.
2. **Keep the old URLs.** The slugs match the old WordPress site (`/eu/lehiaketa/`, `/es/competicion/`, `/en/competition/`, the legal pages…). Don't rename them; if one must change, add an `aliases:` entry.
3. **Never hardcode URLs** in templates: use `.RelPermalink`, `relURL`, `relLangURL` or `absURL`, and pass asset paths without a leading `/` (`images/x.jpg`). In CSS, reference `static/` files with relative URLs (`../fonts/…`). In Markdown, write internal links as `/path/` without the language prefix: `_markup/render-link.html` turns pages into `relLangURL` and files into `relURL`.
4. **Don't invent facts.** Dates, venues, rules, results and sponsors come from the organisers. While a fact is unknown, leave the field empty (it shows "Laster" / "Próximamente" / "Coming soon") or use a `{{< note >}}`, and say so in your summary.
5. **Tailwind: npm only.** Hugo 0.16x refuses the standalone `tailwindcss` binary. No PostCSS, `tailwind.config.js` or extra npm packages unless asked; Tailwind v4 is configured in CSS (`@theme` in `assets/css/main.css`).
6. **Don't commit build output:** `public/`, `resources/_gen/`, `node_modules/`, `hugo_stats.json` and `.hugo_build.lock` are git-ignored. `_originals/` (full-size photos and old-site downloads) too.
7. **Keep it static and light.** No tracking scripts, no new third-party requests. Fonts are self-hosted. YouTube is only contacted when a video tile is clicked (youtube-nocookie). The only JavaScript is that click handler and the pause button of the home video (which also stops autoplay under `prefers-reduced-motion`); the mobile menu is a `<details>`.

## Conventions

- **Template layout (Hugo ≥ 0.146):** `layouts/baseof.html`, `home.html`, `page.html`, `404.html`, with `_partials/`, `_shortcodes/` and `_markup/`. Don't create `_default/` or `partials/`.
- **Languages:** `languages.<lang>.contentDir` in `hugo.toml`, `defaultContentLanguageInSubdir = true`. Translations are matched by `translationKey`; `partial "by-key.html" "competition"` returns the page with that key in the current language.
- **Menus** come from front matter (`menus: main` / `footer`), except the external *Formakuntza / Formación / Training* entry (YouTube playlist), defined per language in `hugo.toml`.
- **Competition page:** no long paragraphs; the overview is `intro` in its front matter (steps, goals, platform), drawn by `{{< competition-intro >}}`. Phases can have `challenges` (chips) and a `note`.
- **Phases** live in the competition page front matter and are shown there and on the home page. The dynamic tests belong to **phase 2 only**: a `tests` list inside that phase, drawn in its card with inline line SVGs (`static/images/icons/`, `currentColor`). Never show them as a block of the whole competition.
- **Media = press room** (title kept as "Media"): press contact, press kit (3 PDFs), poster, organisers' logos (`{{< press-logos >}}`, from `data/press-logos.yaml`, files in `static/press/logos/`), videos and photos.
- **Press kit:** `content/<lang>/{prentsa-dossierra,dossier-de-prensa,press-kit}.md` with `layout: dossier` (`layouts/dossier.html`, four A4 pages, not listed anywhere). It takes every text from the site (home, competition page, `hugo.toml`, `data/participants.yaml`); its front matter only has labels. Sponsors are left out until the list is confirmed. After changing those texts, regenerate the PDFs with `scripts/build-dossier.sh` (dev server running; Chrome or Edge headless) and commit `static/docs/euskelec-{prentsa-dossierra,dossier-de-prensa,press-kit}.pdf`.
- **404:** each language gets its own `404.html`; CI copies `public/eu/404.html` to `public/404.html` for GitHub Pages.
- Deprecated APIs to avoid (Hugo 0.158+): `languageName`, `.Language.LanguageName`, `.Language.LanguageCode`. `templates.Defer` (in `_partials/css.html`) must be called through `partial`, never `partialCached`.

## Design

- **Palette given by the organisers (2026-11), light theme:**
  - The Euskelec blue `brand` #397FAD is the main colour: the logo, the video tint, the page headers, the test tiles, the call to action. The footer uses the deeper `brand-800`.
  - Text is the dark grey `ink` #333333 on white. Secondary text uses `ink-soft`, borders `line`, and light grey sections `paper`.
  - The Tknika lime `tknika` #BED23B is only for touches: eyebrow lines, list bullets, the active menu item and phase, the accent button (`btn-accent`, used on blue or on the video), the video play buttons, and **every hover** (button backgrounds, card borders, menu and link underlines, footer links). Never use it for text on white: its contrast is too low.
  - White on `brand` is only 4.4:1, so on `brand` write white text only when it is large (≥24px, or ≥18.7px bold). Small white text goes on `brand-700` or darker. Links and small blue text on white use `brand-700`.
  - Square corners (no `rounded-*`).
- Font: Lexend (`font-display`, self-hosted variable font) for titles, menus and labels; system sans for running text.
- The logo is redrawn as one SVG in `_partials/logo.html`, traced from the old site's 218×25 PNG (`_originals/old-site/euskelec_logo.png`): five white bars in two staggered columns and the wide EUSKELEC lettering, all white (no blue, no Lexend). It is 1em high, so the parent's font size sets its size. Replace it with the official vector logo when available.
- **The symbol** (five bars in two staggered columns, as in the logo and the favicon) is the site's graphic resource: `{{ partial "symbol.html" "classes" }}` draws it as an SVG in `currentColor`, sized and placed with the classes. It is used large and faint on the blue page headers and the footer, small on the home section cards (lime on hover), in the corner of each phase (lime when active) and on the 404 page. Keep it as a solid shape, cut by the edges when big; don't rotate or recolour it outside the palette.
- **Widths, as on basqueunevocweek:** the home page, the header and the home footer use `container-wide` (the whole window, side margins only); inner pages use `container-site` (up to 96rem), with text kept to a readable column (`max-w-3xl`, unless `wide: true`).
- **Home video:** `hero_video` in the home front matter (`large` 1920px, `small` 960px for phones, `poster`), files in `static/video/`. Muted, looping, no audio track, under a transparent header (`.header-home`: white text over the video, white with ink text once the page scrolls, through a CSS scroll-driven animation of the registered `--hdr-fg` / `--hdr-logo` colours). The source is `_originals/videos/home.mov`. It is used as it is, with straight cuts (symbol transitions at some cuts were tried in 2026-11 and dropped; `scripts/video-symbol-transitions.sh` can still render them). Encode with `ffmpeg -i home.mov -an -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p -movflags +faststart -vf scale=1920:-2 home-vN-1920.mp4` (crf 28 and `scale=960:-2` for the small one). Nothing is drawn over the video in the page itself. Keep the video short and under ~5 MB. When the video changes, give the files a new name (`home-v4-…` → `home-v5-…`, in the three `_index.md`): browsers keep the old file cached under the same name.
- Components in `@layer components` in `main.css`: `container-site`, `container-wide`, `site-header`, `header-home`, `hero-shade`, `btn-primary`, `btn-accent`, `btn-ghost`, `btn-ghost-light`, `eyebrow` (+ `eyebrow-light`), `card`, `bars-bg` (stripes, only behind the home call to action), `prose-site`. In Tailwind v4 you can't `@apply` a custom component class.
- Markdown output is wrapped in `.prose-site`; add `not-prose` to custom lists inside it (shortcodes do).
- Tailwind only sees classes present in `hugo_stats.json` or the CSS: write full class names, never build them with `printf`. In the dev server, CSS changes may need a server restart (the file keeps its name).

## Open items (as of 2026-11)

- **Edition number:** the old site says "IX edición" (May 2026, Vitoria-Gasteiz), while the 2026-27 rules are named `euskelec_x`: the site now shows "X. edizioa · 2026-2027". Confirm.
- **Phases of the X edition:** dates and venues unknown ("Laster"). The old competition page said phase 1 at AIC Center (Boroa business park, Amorebieta-Etxano, Barrio Gumuzio 0 S/N, 48340) and phase 2 on an urban circuit in Bilbao, "May-June", but the IX edition took place in Vitoria-Gasteiz: not copied until confirmed.
- **Sponsors:** names marked `# check` in `hugo.toml` were read from logo file names; the list is the one from 2021. Confirm the current sponsors.
- **English challenges PDF:** missing (the old site linked the rules PDF instead); the Spanish one is linked, marked "in Spanish".
- **Participants:** only the VIII edition list exists (`data/participants.yaml`, copied as published).
- **Legal pages** were copied from WordPress: the cookie policy still mentions Google Analytics, blog-comment cookies and a cookie banner that the static site doesn't have, and the legal notice gives two different owners (Tknika and the Basque Government). They need a legal review before launch.
- **Contact:** the old WordPress form is replaced by a `mailto:` button (`admin@euskelec.eus`).
- **News (`/blog`)** was empty on the old site and is not migrated.
- `params.noindex = true` until launch.
