# Aboud Beroual – portfolio (notes for Claude Code)

A one-page personal engineering portfolio. Static, no build step, no dependencies.
Live at **https://abboudberoual.github.io/portfolio/** (GitHub Pages project site, so the
page lives under `/portfolio/`: **every URL in the site must be relative**, never start with `/`).

## File map

```
index.html              All content, in English. Sections are marked with comment banners.
assets/css/site.css     All styles. Design tokens (light + dark) at the top.
assets/js/i18n.js       French strings (I18N.fr), grouped by section, plus the few
                        English strings that scripts create (I18N.en).
assets/js/site.js       Language switch, theme switch, lightbox, L1 build slider,
                        Lectern strip arrows, landing toy, VTOL landing-page link.
                        Numbered blocks, one job each.
assets/img/             Photos, print time-lapse (mp4 + poster), Lectern screenshots,
                        simulator figures (vtol-*), CAD views and renders (WebP).
assets/favicon.svg      Tab icon (flight arc with the apogee dot).
assets/Aboud_Beroual_Resume.pdf
.nojekyll               Tells GitHub Pages to serve files as they are.
README.md               Short guide for humans.
```

Page order: header, hero (name, one line, photo), four featured projects (Averell 1, Lectern,
Alchemy, vertical landing simulator), "More projects" index, Research, Experience,
About, Contact. The project with the strongest pictures goes first.

## Rules that matter most

1. **Facts.** Never invent or "improve" a number, date, claim, user count, quote or result.
   The text on the page was verified by the owner; treat it as the fact base. You may cut or
   rephrase; anything new must come from the owner. The landing toy is a simplified JavaScript
   illustration and must stay labelled that way; its output is never a project result.
   The two `vtol-*.webp` figures are the opposite: real output of the Python simulator
   (repo `scoudouc`, `sim/examples/land_s2.py`, seed 1), saved from its own Matplotlib
   functions. Regenerate them from the repo; never redraw or restyle them by hand.
2. **English and French move together.** Any change to an English string in `index.html`
   needs the matching change in `assets/js/i18n.js`, in the same commit. New text needs a
   `data-i18n` key and a French entry. Ask the owner (a native French speaker) to proofread.
3. **Privacy.** No phone number anywhere. No internal Canadian Space Agency system names or
   screenshots. The Alchemy repository is private: link only its landing page, never a repo.
   Any Alchemy example shown must use fictional cards and merchants.
4. **Relative URLs only** for local files (`assets/...`). Absolute URLs are used only for the
   canonical / Open Graph tags in `<head>` and for external links.

## Content and translations

- English is the HTML: it is what works without JavaScript and what search engines read.
- `data-i18n="section.key"` on an element: its inner HTML is replaced by `I18N.fr.section.key`.
  Do not nest a `data-i18n` element inside another one (the outer replaces the inner).
- `data-i18n-attrs="alt:section.key, aria-label:section.key"` translates attributes
  (alt text, aria-labels, titles, and the CSA link `href`).
- Strings built in `site.js` (widget buttons, canvas labels) go through `t('ui.key')` and
  exist in both `I18N.en` and `I18N.fr`.
- `<title>`, meta description and Open Graph text are in `I18N.fr.meta`.
- French style: natural Québec French, not literal. `&nbsp;` before `% $ :` and inside
  numbers (`2&nbsp;100&nbsp;pi`, `8,8&nbsp;%`, `14&nbsp;$`), abbreviated months
  (`janv.`, `oct.`), no space before `;` `?` `!`. Product names and tech terms stay as they are.
- Language choice: saved choice (`localStorage.lang`), else `?lang=fr` / `#fr` deep link,
  else the browser language, else English. The inline script in `<head>` and block 2 of
  `site.js` share these rules; keep them in sync.
- A quick check that every key has a French string: search `index.html` for `data-i18n` keys
  and confirm each exists in `i18n.js` (a missing key silently falls back to English).

## Things the owner edits in one place

- **VTOL landing-page URL:** `VTOL_LANDING_URL` at the top of `assets/js/site.js` (block 0).
  Empty string = the quiet "Landing page coming soon" note. Paste the full `https://` URL
  and the note becomes the project's primary button, in both languages. Nothing else to change.
- **"Last updated"** date: `contact.updated` in `index.html` and in `i18n.js`.
- **A new featured project:** copy an `<article class="project">`. **A new index entry:**
  copy an `<article class="row">`. Images always carry real `width`/`height` and
  `loading="lazy"` (except the hero photo).
- **L1 build photos:** the `<ol id="build-list">`; the script builds the slider from it.
- **Pictures in an index entry:** a `<div class="row-media" data-zoom>` of links to 3:2 images
  (three per line), then a one-line `<p class="row-cap">`.
- **Toy constants:** block 7 of `site.js`. If they change, update the "How the toy works"
  note in `index.html` and `vtol.toyHow` in `i18n.js`.

## Design rules (do not drift)

The look is quiet and editorial: left-aligned, lots of whitespace, few boxes.

- **Tokens** live on `:root` in `site.css`. The dark values appear twice on purpose (system
  preference block and `[data-theme="dark"]` block): change both together. Use tokens, never
  raw colours, in new CSS.
- **Palette:** overcast-sky ground (`--bg`), slate ink (`--ink`), one muted grey (`--muted`),
  hairlines (`--rule`), and ONE accent: flight yellow (`--accent`), from the Averell 1 rocket.
- **Accent usage:** fills and marks only, never text colour. It appears on primary buttons
  (one per project at most: the landing-page / install / read call to action), status dots,
  the apogee dot in the logo, the build slider thumb, the key research bar and link hover. If a new
  element wants the accent, something else should probably lose it.
- **Type:** Radio Canada Big (display: hero line, project titles, big numbers) and Radio
  Canada (everything else), from Google Fonts, with system fallbacks. Two families, no third.
  Sentence case. No all-caps labels, no letter-spaced eyebrows.
- **Spacing:** sections are separated by a hairline and generous padding
  (`clamp()` values in `.section`, `.project`). Wide screens use a 200 px left margin column
  (`--aside`) for section names and project status; keep it.
- **Signature details:** the apogee logo (flight arc with the yellow dot) and the filled-dot /
  ring status marks. Keep them few. Do not add more decorative motifs. (The flight-line
  diagram under the hero was removed at the owner's request; do not bring it back.)
- **Hero:** the name is the headline. One short line under it, then the links. Keep it short.
- **Icons:** one set, defined once as CSS masks at the top of `site.css` (16 px grid, 1.5 px
  stroke, text colour). `data-ico="github|linkedin|mail|download|prev|next"` puts one before
  the text; `class="ext"` adds the outbound arrow after it. Add to that set; no icon fonts,
  no second style.
- **Outside figures** (Matplotlib output, CAD views, app screenshots) are shown as they came
  out of the tool, on their own background, inside a hairline border. Do not recolour them.
- **Motion:** nothing moves on its own. Things move only in response to the visitor.
  Respect `prefers-reduced-motion`.
- **Widgets:** three, no more: L1 build slider (with previous / next arrows), Lectern
  screenshot strip, landing toy (now folded inside a disclosure under the real simulator
  figures), plus the lightbox they share. Everything must stay readable with JavaScript off.
- **Do not drift into:** cream + serif + terracotta; near-black + neon accent; purple/blue
  gradients; Inter or Space Grotesk; emoji; centred everything; rounded shadow cards;
  hatching, title blocks or other "engineering drawing" ornaments (the previous design).
- **Accessibility floor:** semantic landmarks, skip link, visible focus ring, AA contrast in
  both themes, keyboard-operable controls, alt text in both languages, no horizontal scroll
  down to 360 px.

## Theme

No `data-theme` attribute = follow the system. The header control sets
`<html data-theme="light|dark">` and saves it in `localStorage.theme`; "system" removes both.
The inline script in `<head>` applies the saved choice before first paint.

## Preview locally

The page must be served over HTTP. From the folder that *contains* `portfolio/`:

```bash
python -m http.server 8000
# open http://localhost:8000/portfolio/     (French: add ?lang=fr)
```

Or use the VS Code "Live Server" extension on `index.html`. Check light and dark, English
and French, at about 1440 px and 390 px wide before publishing.

## Publish

Commit to `main` and push. GitHub Pages deploys from `main` / root in about a minute.
Do not add a `CNAME` file unless the owner has bought a domain.
