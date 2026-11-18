# Euskelec webgunea

New static website for **[Euskelec](https://euskelec.eus/)**, the Basque electric vehicle championship of Vocational Training (Euskadiko Ibilgailu Elektrikoen Txapelketa): students of Basque vocational training schools design and build a 100% electric vehicle on a common powertrain. It is organised by Tknika with the Basque Government's Department of Education and FP Euskadi.

It replaces the old WordPress site. Built with **[Hugo](https://gohugo.io/)** and **[Tailwind CSS v4](https://tailwindcss.com/)**, the same technology as the `cyberlehia` and `basqueunevocweek` sites. All content is Markdown, in three languages: **Euskara** (default, `/eu/`), **Castellano** (`/es/`) and **English** (`/en/`).

> Working on this repo with an AI agent? See [AGENTS.md](AGENTS.md).

## Quick start

| Tool | Version | Notes |
| --- | --- | --- |
| [Hugo **extended**](https://gohugo.io/installation/) | ≥ 0.146 (CI uses 0.168.0) | The template layout (`layouts/_partials`, `home.html`…) needs ≥ 0.146 |
| [Node.js](https://nodejs.org/) | ≥ 20 (CI uses 24) | Hugo runs the Tailwind CLI from `node_modules` |

```sh
git clone https://github.com/Tknika/euskelec.git
cd euskelec
npm ci            # installs tailwindcss + @tailwindcss/cli
hugo server --baseURL http://localhost:1313/euskelec/   # → http://localhost:1313/euskelec/eu/ (same path as GitHub Pages)
```

Production build (output in `public/`): `hugo --gc --minify`.

## Deployment

Every push to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml), which builds the site and publishes it to **GitHub Pages** (`https://tknika.github.io/euskelec/`). Pull requests are built but not deployed. The workflow overrides `baseURL`, so the same code works under the `/euskelec/` subpath and on the production domain.

To serve `euskelec.eus` from GitHub Pages: set it as the custom domain in *Settings → Pages*, point the DNS to GitHub, set `params.noindex = false` in `hugo.toml`, and redirect any old URL that changed.

## Project structure

```
.
├── hugo.toml              # Languages, menus (external "Formakuntza" link), contact, organiser/sponsor logos
├── content/{eu,es,en}/    # One folder per language
├── data/participants.yaml # Participating schools per edition
├── static/
│   ├── docs/              # Rules, challenges and poster PDFs
│   └── images/            # Logos (white, for the blue footer), test icons, galleries, video previews
├── scripts/               # fetch-video-thumbs.sh
├── themes/euskelec/       # The theme (layouts, CSS, JS, i18n, font)
└── .github/workflows/     # GitHub Pages CI
```

### Site map (same URLs as the old site)

| Euskara (`content/eu/`) | Castellano (`content/es/`) | English (`content/en/`) | `translationKey` |
| --- | --- | --- | --- |
| `_index.md` (home) | `_index.md` | `_index.md` | (automatic) |
| `lehiaketa.md` | `competicion.md` | `competition.md` | `competition` |
| `media/_index.md` (+ one page per photo album) | `media/_index.md` | `media/_index.md` | `media` |
| `dokumentazio-teknikoa.md` | `documentacion-tecnica.md` | `technical-documentation.md` | `docs` |
| *Formakuntza* (YouTube, in `hugo.toml`) | *Formación* | *Training* | |
| `kontaktua.md` | `contacto.md` | `contact.md` | `contact` |
| `lege-oharra.md` | `aviso-legal.md` | `legal-notice.md` | `legal` |
| `pribatutasun-politika.md` | `politica-de-privacidad.md` | `privacy-policy.md` | `privacy` |

There is no cookie policy: the site sets no cookies. The old cookie policy URLs redirect to the privacy policy (`aliases`).

## Editing content

Each page is Markdown with YAML front matter:

```yaml
---
title: Lehiaketa
translationKey: competition   # SAME value in eu, es and en
eyebrow: X. edizioa · 2026-2027
description: One sentence (subtitle, meta description, home card).
wide: true                    # optional: full-width content instead of a text column
menus:
  main:
    weight: 10
---
```

- **Home** (`content/<lang>/_index.md`): `edition`, `hero_video` (full-width background video, files in `static/video/`), `hero_image` (the car, next to the intro), `buttons`, `about`, `phases_title`, `sections` (cards, by `translationKey`), `poster` (last edition) and `cta`. The body is the "What is Euskelec?" text.
- **3D car**: `intro.model` in the competition page front matter (`src`: a `.glb` in `static/models/`; `still`: a picture of it) shows the car turning on itself beside the intro, with three.js (see AGENTS.md).
- **Phases and dynamic tests**: `phases` in the competition page front matter (shown there with `{{< phases >}}` and on the home page). The dynamic tests belong to phase 2 only: they are a `tests` list (name + SVG icon from `static/images/icons/`) inside that phase, shown in its card. An empty `dates` or `place` shows "Laster" / "Próximamente" / "Coming soon"; `status: active` highlights a phase. Each phase can have a photo, shown on both pages (`image`, `image_alt`, and `image_position` to choose what the 3:1 crop keeps, e.g. `"50% 75%"`). Phase photos go in `static/images/galeria/phases/`, about 1600 px wide (originals in `_originals/photos/`).
- **Documents**: put the PDFs in `static/docs/` and list them with `{{< downloads >}}` (`path | Title | Note` per line).
- **Contact map**: `map.places` in the contact page front matter (`name`, `text`, `lat`, `lon`) puts the places on one OpenStreetMap map (Leaflet, no cookies) beside the text. `venue: true` marks where the competition takes place: a big lime marker with a chequered flag, listed first.
- **Technical documentation page**: no Markdown body; its front matter holds the rules and challenges PDFs (`documents`) and a summary of them: the challenge calendar, the scoring system and the vehicle's dimensions and powertrain kit (see AGENTS.md). When new PDFs arrive, update it in the three languages.
- **Sponsors and organisers**: `params.organizers`, `params.sponsors`, `params.collaborators` in `hugo.toml` (white PNG logos). Organisers are shown bigger, all at one height. Sponsors and collaborators get the same visible area whatever their shape, so their PNGs must be trimmed to the drawing, with no transparent margin (the untrimmed originals are in `_originals/logos-padded/`).
- **Videos**: `{{< videos >}}` (`VIDEO_ID | Title | Year` per line), then run `scripts/fetch-video-thumbs.sh` to add the preview images.
- **Press room (Media page)**: press kit PDFs from `scripts/build-dossier.sh`, organisers' logos listed in `data/press-logos.yaml` (shown with `{{< press-logos >}}`).
- **Photos**: one album per edition or phase, a page in `content/<lang>/media/` with `layout: album` and its photos in the front matter (`photos`: `src` + `alt`; optional `video`, `cover`, `weight` for the order). The Media page lists them as cards (`{{< albums >}}`). Put the photos at about 1600 px and 640×480 thumbnails in a `thumbs/` folder beside them (used automatically); originals in `_originals/photos/`. The photos open in a lightbox. For a few photos inside a page's text there is also `{{< gallery >}}` (`path | alt text` per line).

### Shortcodes

`note`, `button`, `faq` + `stack`, `gallery`, `videos` (`featured="2"`: the first two big), `albums`, `downloads`, `phases`, `participants "X"` (official teams and guest teams), `social` (the networks and hashtags of `hugo.toml`, on the contact page).

## License

Content: © Tknika / Basque Government (see the legal notice). Font: Lexend, SIL Open Font License. Logos belong to their respective owners.
