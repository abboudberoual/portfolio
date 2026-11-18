# Aboud Beroual – portfolio

A one-page static site in English and French, with light and dark themes.
Published with GitHub Pages at **https://abboudberoual.github.io/portfolio/**.
No build step, no frameworks: plain HTML, CSS and JavaScript.

```
index.html              all content, in English
assets/css/site.css     styles and colour tokens (light and dark)
assets/js/i18n.js       the French text, grouped by section
assets/js/site.js       language and theme switches, photo viewer, build stepper, landing toy
assets/img/             photos, the print time-lapse, Lectern screenshots
assets/favicon.svg      browser tab icon
assets/Aboud_Beroual_Resume.pdf
CLAUDE.md               rules and file map for Claude Code sessions
.nojekyll               tells GitHub Pages to serve the files as they are
```

Every local path is relative (no leading `/`), so the site works under `/portfolio/`.

## Edit

- **Text:** change the English in `index.html`, then the French twin in `assets/js/i18n.js`
  (same key as the element's `data-i18n` attribute). Always both.
- **Facts:** nothing on the page is invented. Do not add numbers or claims that have not been checked.
- **Rocket landing project page:** when it exists, paste its URL into `VTOL_LANDING_URL`
  at the top of `assets/js/site.js`. The "Landing page coming soon" note becomes a button.
- **Colours and fonts:** the tokens at the top of `assets/css/site.css`. The dark values are
  listed twice (system setting, and explicit choice); change both.
- **Last updated:** the `<time>` in the footer of `index.html`, and `contact.updated` in `i18n.js`.

More detail, including the design rules, is in `CLAUDE.md`.

## Preview locally

Serve over HTTP from the folder that *contains* `portfolio/`:

```bash
python -m http.server 8000
# open http://localhost:8000/portfolio/        French: http://localhost:8000/portfolio/?lang=fr
```

The VS Code "Live Server" extension also works.

## Publish

Commit to `main` and push. GitHub Pages (Settings → Pages: branch `main`, folder `/ (root)`)
redeploys in about a minute. There is deliberately no `CNAME` file.

If a custom domain is added later, also update the absolute URLs in the `<head>` of
`index.html` (`canonical`, `hreflang`, `og:url`, `og:image`, `twitter:image`).
