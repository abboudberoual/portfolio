# Aboud Beroual – portfolio

A one-page static site, published with GitHub Pages as a project site at
**https://abboudberoual.github.io/portfolio/** (repository name: `portfolio`).
No build step, no frameworks: plain HTML, CSS and JavaScript.

```
index.html              all content (edit text here)
assets/css/site.css     styles and colour tokens (light and dark)
assets/js/site.js       the interactive parts; the page reads fine without it
assets/img/             photos, the print time-lapse, Lectern screenshots
assets/favicon.svg      browser tab icon
assets/Aboud_Beroual_Resume.pdf   NOT in the repo yet: add it, the page links to it
.nojekyll               tells GitHub Pages to serve the files as they are
```

Every path in the site is relative (no leading `/`), so it works under `/portfolio/`
and would also work at a domain root.

## Publish

1. Create a public repository named `portfolio` and push this folder to `main`.
2. **Settings → Pages → Build and deployment**: Source *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. A minute later the site is at https://abboudberoual.github.io/portfolio/.

There is deliberately no `CNAME` file. A `CNAME` holding a domain you do not own breaks the site.

## Preview locally

The site must be served over HTTP (not opened as a file) for the video and the commit lookup to behave.
From the folder that *contains* `portfolio/`:

```bash
python -m http.server 8000
# open http://localhost:8000/portfolio/
```

## Edit

- **Project text**: each project is one `<article class="sheet">` in `index.html`, marked with a comment
  (`<!-- 01 Alchemy -->` and so on). Change the `<h3>`, the summary, the bullets, the links and the
  four `<dt>/<dd>` pairs in the `title-block` at the bottom of the sheet.
- **Filter type**: `data-type` on the `<article>` takes `software`, `hardware`, `research`, or two of them separated by a space.
- **Add a project**: copy an `<article>`, give it the next number (in `sheet-no` and in `data-no` on the `<h3>`),
  and update the "Sheets" count in the footer. Add `class="sheet compact"` for a half-width sheet.
- **Replace a "coming soon" drawing** (Mach 3 aft section, VT-1 enclosure, end-effector): swap the whole
  `<div class="plate-frame pending">…</div>` for
  `<div class="plate-frame"><img src="assets/img/NAME.jpg" width="W" height="H" loading="lazy" alt="…"></div>`
  and rewrite the caption. Always give images their real `width` and `height` so the page does not jump.
- **L1 build photos**: the `<ol id="build-list">`. Each step is a link to the full-size image (with its
  `data-w`/`data-h` pixel size) wrapping the 800 px version. The script builds the stepper from this list.
- **Lectern screenshots**: the `<div id="shots">`. WebP files live in `assets/img/lectern/`. The original PNGs are
  kept there too but the page does not load them; delete them if you want a smaller repository.
- **Alchemy figures**: the counters are plain numbers in the HTML (`data-count` must match the visible number).
  The checkout-router demo uses invented cards, merchants and rates, defined at the top of block 8 in
  `site.js`. Keep them fictional.
- **Landing toy**: block 9 in `site.js`. It is a simplified illustration and is labelled that way on the page.
  Do not present its output as a project result.
- **Research figures**: the four `<li>` items in `<ul id="figs">`; `data-n` is the percentage drawn.
- **Colours and fonts**: the `:root` tokens at the top of `site.css`; the dark theme is the block right under it
  and follows the visitor's system setting.
- **Last updated**: the `<time>` in the footer.

The "Latest commit" lines call GitHub's public API from the visitor's browser. They only appear for public
repositories and stay hidden when the request fails or is rate-limited.

## Add a custom domain later

1. Buy the domain. In **Settings → Pages → Custom domain**, enter it and save. GitHub then creates a `CNAME`
   file in the repository for you (or add one yourself: a single line with the domain, nothing else).
2. At your registrar, for an apex domain (`example.com`) add four `A` records:

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   and for `www` a `CNAME` record pointing to `abboudberoual.github.io.`
   Check the current values in GitHub's guide before you rely on these:
   https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
3. When the DNS check passes, tick **Enforce HTTPS**.
4. In `index.html`, change the four absolute URLs in the `<head>` (`canonical`, `og:url`, `og:image`,
   `twitter:image`) from `https://abboudberoual.github.io/portfolio/` to the new domain.
5. Verify the domain under your account (**profile Settings → Pages → Add a domain**) so nobody else can claim it.
