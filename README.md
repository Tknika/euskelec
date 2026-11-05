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
hugo server       # → http://localhost:1313/ (redirects to /eu/)
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
| `media.md` | `media.md` | `media.md` | `media` |
| `dokumentazio-teknikoa.md` | `documentacion-tecnica.md` | `technical-documentation.md` | `docs` |
| *Formakuntza* (YouTube, in `hugo.toml`) | *Formación* | *Training* | |
| `kontaktua.md` | `contacto.md` | `contact.md` | `contact` |
| `lege-oharra.md` | `aviso-legal.md` | `legal-notice.md` | `legal` |
| `pribatutasun-politika.md` | `politica-de-privacidad.md` | `privacy-policy.md` | `privacy` |
| `cookie-politika.md` | `politica-de-cookies.md` | `cookies-policy.md` | `cookies` |

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
- **Phases and dynamic tests**: `phases` and `tests` in the competition page front matter (shown there with `{{< phases >}}` / `{{< tests >}}` and on the home page). An empty `dates` or `place` shows "Laster" / "Próximamente" / "Coming soon"; `status: active` highlights a phase.
- **Documents**: put the PDFs in `static/docs/` and list them with `{{< downloads >}}` (`path | Title | Note` per line).
- **Sponsors and organisers**: `params.organizers`, `params.sponsors`, `params.collaborators` in `hugo.toml` (white PNG logos). Organisers are shown bigger, all at one height. Sponsors and collaborators get the same visible area whatever their shape, so their PNGs must be trimmed to the drawing, with no transparent margin (the untrimmed originals are in `_originals/logos-padded/`).
- **Videos**: `{{< videos >}}` (`VIDEO_ID | Title | Year` per line), then run `scripts/fetch-video-thumbs.sh` to add the preview images.

### Shortcodes

`note`, `button`, `faq` + `stack`, `gallery`, `videos`, `downloads`, `phases`, `tests`, `participants "VIII"`.

## License

Content: © Tknika / Basque Government (see the legal notice). Font: Lexend, SIL Open Font License. Logos belong to their respective owners.
