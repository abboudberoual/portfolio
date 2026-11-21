/* Aboud Beroual – portfolio. Vanilla JS, no dependencies, no build step.
   Everything here is progressive enhancement: the page reads complete
   without it. Each block is independent and fails quietly.

   Blocks, in order:
     0. Config            (the one value the owner edits here)
     1. Helpers
     2. Language (EN/FR)  (strings live in assets/js/i18n.js)
     3. Theme             (light / dark / system)
     4. Lightbox
     5. L1 build sequence (photo, slider, previous / next)
     6. Zoomable images and the Lectern strip arrows
     7. Landing toy       (simplified illustration, NOT project results)
     8. VTOL landing-page link
     9. Contents          (left rail / "Contents" menu: marks where you are)
*/
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. Config
     ------------------------------------------------------------------ */
  // Landing page of the vertical rocket landing (VTOL) project.
  // Leave '' and nothing is shown (the site never shows placeholders).
  // Paste the full URL (https://...) when the page exists; nothing else to change.
  var VTOL_LANDING_URL = '';

  /* ------------------------------------------------------------------
     1. Helpers
     ------------------------------------------------------------------ */
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'class') n.className = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { n.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return n;
  }
  function safe(name, fn) {
    try { fn(); } catch (e) { if (window.console) console.error('[' + name + ']', e); }
  }
  function store(key, value) {
    try {
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { /* private mode or blocked storage: the choice lasts for this page view */ }
  }
  function emit(name) { document.dispatchEvent(new CustomEvent(name)); }

  /* ------------------------------------------------------------------
     2. Language. English is the HTML. French comes from window.I18N.fr
        (assets/js/i18n.js), matched by data-i18n="section.key".
        data-i18n-attrs="alt:section.key, aria-label:section.key" does
        the same for attributes. Strings created in this file use t().
     ------------------------------------------------------------------ */
  var I18N = window.I18N || { en: {}, fr: {} };
  var lang = root.lang === 'fr' ? 'fr' : 'en';

  function lookup(code, key) {
    var o = I18N[code];
    key.split('.').forEach(function (part) { o = o && o[part]; });
    return typeof o === 'string' ? o : null;
  }
  // t('toy.run', { n: 100 }) -> string in the current language, as plain text.
  function t(key, vars) {
    var s = lookup(lang, key);
    if (s === null) s = lookup('en', key);
    if (s === null) return key;
    s = s.replace(/&nbsp;/g, ' ');
    for (var k in vars || {}) s = s.replace('{' + k + '}', vars[k]);
    return s;
  }
  // Locale-aware numbers: 13.1 in English, 13,1 in French.
  function num(v, digits) {
    return v.toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA',
      { minimumFractionDigits: digits || 0, maximumFractionDigits: digits || 0 });
  }
  var unit = {
    pct: function (v) { return '±' + num(v) + (lang === 'fr' ? ' %' : '%'); },
    deg: function (v) { return '±' + num(v, v % 1 ? 1 : 0) + '°'; },
    m: function (v, d) { return num(v, d) + ' m'; },
    s: function (v) { return num(v) + ' s'; }
  };

  safe('language', function () {
    // Remember the English that shipped in the HTML so we can switch back.
    var texts = $$('[data-i18n]').map(function (n) {
      return { n: n, key: n.getAttribute('data-i18n'), en: n.innerHTML };
    });
    var attrs = [];
    $$('[data-i18n-attrs]').forEach(function (n) {
      n.getAttribute('data-i18n-attrs').split(',').forEach(function (pair) {
        var p = pair.split(':'), a = p[0].trim();
        attrs.push({ n: n, attr: a, key: p[1].trim(), en: n.getAttribute(a) });
      });
    });
    var head = [
      ['meta[name="description"]', 'meta.description'],
      ['meta[property="og:title"]', 'meta.title'],
      ['meta[property="og:description"]', 'meta.ogDescription'],
      ['meta[property="og:image:alt"]', 'meta.ogImageAlt'],
      ['meta[name="twitter:title"]', 'meta.title'],
      ['meta[name="twitter:description"]', 'meta.twDescription']
    ].map(function (h) {
      var n = $(h[0]);
      return n && { n: n, attr: 'content', key: h[1], en: n.getAttribute('content') };
    }).filter(Boolean);
    var titleEn = document.title;
    var buttons = $$('[data-lang]');

    function apply() {
      var fr = lang === 'fr';
      root.lang = lang;
      texts.forEach(function (x) {
        var s = fr ? lookup('fr', x.key) : null;
        x.n.innerHTML = s === null ? x.en : s;
      });
      attrs.concat(head).forEach(function (x) {
        var s = fr ? lookup('fr', x.key) : null;
        x.n.setAttribute(x.attr, s === null ? x.en : s.replace(/&nbsp;/g, ' '));
      });
      var title = fr ? lookup('fr', 'meta.title') : null;
      document.title = title === null ? titleEn : title;
      var loc = $('meta[property="og:locale"]'), alt = $('meta[property="og:locale:alternate"]');
      if (loc) loc.setAttribute('content', fr ? 'fr_CA' : 'en_CA');
      if (alt) alt.setAttribute('content', fr ? 'en_CA' : 'fr_CA');
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang)); });
      root.classList.remove('i18n-pending');
      emit('langchange');
    }

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        lang = b.getAttribute('data-lang');
        store('lang', lang);
        // An explicit choice wins over a ?lang= or #fr deep link from now on.
        if (/[?&]lang=/.test(location.search) || /^#(en|fr)$/.test(location.hash)) {
          try { history.replaceState(null, '', location.pathname); } catch (e) {}
        }
        apply();
      });
    });
    apply();
  });
  root.classList.remove('i18n-pending'); // even if the block above failed

  /* ------------------------------------------------------------------
     3. Theme. No attribute = follow the system. An explicit choice sets
        <html data-theme="light|dark"> and is remembered. The inline
        script in <head> applies the saved choice before first paint.
     ------------------------------------------------------------------ */
  safe('theme', function () {
    var buttons = $$('[data-theme-set]');
    var meta = $('meta[name="theme-color"]');
    function current() { return root.getAttribute('data-theme') || 'system'; }
    function paint() {
      var mode = current();
      buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-theme-set') === mode)); });
      if (meta) meta.setAttribute('content', getComputedStyle(root).getPropertyValue('--bg').trim());
      emit('themechange');
    }
    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        var mode = b.getAttribute('data-theme-set');
        if (mode === 'system') { root.removeAttribute('data-theme'); store('theme', null); }
        else { root.setAttribute('data-theme', mode); store('theme', mode); }
        paint();
      });
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paint);
    paint();
  });

  // The language and theme controls only work with JavaScript: show them now.
  safe('controls', function () { $('#controls').hidden = false; });

  /* ------------------------------------------------------------------
     4. Lightbox (native <dialog>: focus trap and Esc come for free)
     ------------------------------------------------------------------ */
  var lightbox = (function () {
    if (!window.HTMLDialogElement) return null;
    var items = [], idx = 0;
    var img = el('img', { alt: '' });
    var cap = el('p', { class: 'lb-cap' });
    var count = el('span', { class: 'lb-count' });
    var prev = el('button', { class: 'lb-btn', type: 'button' });
    var next = el('button', { class: 'lb-btn', type: 'button' });
    var close = el('button', { class: 'lb-btn', type: 'button' });
    var dlg = el('dialog', { class: 'lightbox' }, [
      el('div', { class: 'lb-in' }, [
        el('div', { class: 'lb-top' }, [count, close]),
        el('div', { class: 'lb-img' }, [img]),
        el('div', { class: 'lb-bot' }, [cap, el('div', { class: 'lb-btns' }, [prev, next])])
      ])
    ]);
    document.body.appendChild(dlg);

    function show(i) {
      idx = (i + items.length) % items.length;
      var it = items[idx];
      img.src = it.src; img.width = it.w; img.height = it.h; img.alt = it.alt || '';
      cap.textContent = it.caption || '';
      var many = items.length > 1;
      count.textContent = many ? t('ui.of', { n: idx + 1, total: items.length }) : '';
      prev.hidden = next.hidden = !many;
      prev.textContent = t('ui.prev'); next.textContent = t('ui.next'); close.textContent = t('ui.close');
      dlg.setAttribute('aria-label', t('ui.viewer'));
    }
    prev.addEventListener('click', function () { show(idx - 1); });
    next.addEventListener('click', function () { show(idx + 1); });
    close.addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.classList.contains('lb-img')) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (items.length < 2) return;
      if (e.key === 'ArrowLeft') { show(idx - 1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { show(idx + 1); e.preventDefault(); }
    });
    return { open: function (list, i) { items = list; show(i || 0); dlg.showModal(); close.focus(); } };
  })();

  // Reads a lightbox item from <a href="full.jpg" data-w data-h><img alt></a> and its figcaption.
  function itemFromLink(a) {
    var im = $('img', a), fig = a.closest('figure'), fc = fig && $('figcaption', fig);
    var title = fc && $('b', fc), text = fc && $('span', fc);
    return {
      src: a.getAttribute('href'),
      w: +a.getAttribute('data-w'), h: +a.getAttribute('data-h'),
      alt: im ? im.alt : '',
      caption: title && text ? title.textContent + '. ' + text.textContent : fc ? fc.textContent.trim() : ''
    };
  }

  /* ------------------------------------------------------------------
     5. L1 build sequence: one photo and a slider through the six steps,
        with previous / next arrows on either side of it.
        The content is the <ol id="build-list"> in index.html.
     ------------------------------------------------------------------ */
  safe('build', function () {
    var box = $('#build'), stage = $('#build-stage'), list = $('#build-list');
    if (!box || !stage || !list) return;
    var links = $$('a', list), n = links.length, cur = 0, steps = [];

    function read() { // re-read on language change: captions and alt text are translated in the list
      steps = links.map(function (a) {
        var fc = $('figcaption', a.closest('figure')), im = $('img', a), it = itemFromLink(a);
        it.title = $('b', fc).textContent;
        it.text = $('span', fc).textContent;
        it.caption = it.title + '. ' + it.text;
        it.thumb = im.getAttribute('src'); it.tw = +im.getAttribute('width');
        return it;
      });
    }

    var photo = el('img', { alt: '' });
    var photoBtn = el('button', { class: 'stage-photo', type: 'button' }, [photo]);
    var count = el('p', { class: 'stage-count' });
    var title = el('p', { class: 'stage-title' });
    var text = el('p', { class: 'stage-text' });
    var status = el('p', { class: 'visually-hidden', role: 'status' });
    var prev = el('button', { class: 'ibtn', type: 'button', 'data-ico': 'prev' });
    var next = el('button', { class: 'ibtn', type: 'button', 'data-ico': 'next' });
    var range = el('input', { class: 'scrub', type: 'range', min: '1', max: String(n), step: '1', value: '1' });
    // Step names under the slider. Mouse shortcuts only: the slider and the
    // arrows already cover the keyboard, so these stay out of the tab order.
    var labels = el('div', { class: 'scrub-labels' });
    var labelBtns = links.map(function (a, i) {
      var b = el('button', { type: 'button', tabindex: '-1' });
      b.style.setProperty('--p', String(n > 1 ? i / (n - 1) : 0));
      b.addEventListener('click', function () { go(i); });
      labels.appendChild(b);
      return b;
    });
    stage.appendChild(photoBtn);
    stage.appendChild(el('div', { class: 'stage-side' }, [count, title, text, status,
      el('div', { class: 'stage-ctl' }, [prev, range, next, labels])]));

    function render(announce) {
      var s = steps[cur], where = t('ui.stepStatus', { n: cur + 1, total: n, title: s.title });
      photo.srcset = s.thumb + ' ' + s.tw + 'w, ' + s.src + ' ' + s.w + 'w';
      photo.sizes = '(max-width: 620px) min(92vw, 320px), 320px';
      photo.src = s.src; photo.width = s.w; photo.height = s.h; photo.alt = s.alt;
      photoBtn.setAttribute('aria-label', t('ui.enlarge', { title: s.title }));
      count.textContent = t('ui.of', { n: cur + 1, total: n });
      title.textContent = s.title;
      text.textContent = s.text;
      range.value = String(cur + 1);
      range.setAttribute('aria-label', t('ui.steps'));
      range.setAttribute('aria-valuetext', where);
      labelBtns.forEach(function (b, i) {
        b.textContent = steps[i].title;
        if (i === cur) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      prev.setAttribute('aria-label', t('ui.prev')); next.setAttribute('aria-label', t('ui.next'));
      prev.title = t('ui.prev'); next.title = t('ui.next');
      prev.disabled = cur === 0; next.disabled = cur === n - 1;
      if (announce) status.textContent = where;
    }
    function go(i, quiet) { cur = Math.max(0, Math.min(n - 1, i)); render(!quiet); }
    prev.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    range.addEventListener('input', function () { go(+range.value - 1, true); }); // the slider announces itself
    photoBtn.addEventListener('click', function () {
      if (lightbox) lightbox.open(steps, cur); else window.open(steps[cur].src);
    });
    document.addEventListener('langchange', function () { read(); render(false); });

    read(); render(false);
    box.classList.add('is-enhanced');
  });

  /* ------------------------------------------------------------------
     6. Zoomable images. Inside a [data-zoom] group (the Lectern strip,
        the pictures of an index entry) a click opens the lightbox on the
        whole group; a lone a.zoomable opens by itself.
        The Lectern strip scrolls natively; the arrows are a convenience.
     ------------------------------------------------------------------ */
  safe('zoom', function () {
    if (!lightbox) return;
    $$('[data-zoom]').forEach(function (group) {
      var links = $$('a[data-w]', group);
      links.forEach(function (a, i) {
        a.addEventListener('click', function (e) { e.preventDefault(); lightbox.open(links.map(itemFromLink), i); });
      });
    });
    $$('a.zoomable').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); lightbox.open([itemFromLink(a)], 0); });
    });
  });

  safe('shots', function () {
    var strip = $('#shots');
    if (!strip) return;
    var prev = el('button', { class: 'ibtn', type: 'button', 'data-ico': 'prev' });
    var next = el('button', { class: 'ibtn', type: 'button', 'data-ico': 'next' });
    strip.parentNode.insertBefore(el('div', { class: 'shots-ctl' }, [prev, next]), strip.nextSibling);
    function step(dir) {
      var fig = $('figure', strip), gap = parseFloat(getComputedStyle(strip).columnGap) || 0;
      strip.scrollBy({ left: dir * (fig.getBoundingClientRect().width + gap), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }
    function sync() {
      prev.disabled = strip.scrollLeft < 4;
      next.disabled = strip.scrollLeft + strip.clientWidth > strip.scrollWidth - 4;
    }
    function label() {
      prev.setAttribute('aria-label', t('ui.prev')); next.setAttribute('aria-label', t('ui.next'));
      prev.title = t('ui.prev'); next.title = t('ui.next');
    }
    prev.addEventListener('click', function () { step(-1); });
    next.addEventListener('click', function () { step(1); });
    strip.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    document.addEventListener('langchange', label);
    label(); sync();
  });

  /* ------------------------------------------------------------------
     7. Landing toy. A SIMPLIFIED ILLUSTRATION, not the project's Python
        simulator. Point mass, constant mass, fixed-length burn, no
        attitude control. Nothing here reproduces project results.
        If you change the constants, update the "How the toy works" note
        in index.html and its French version in i18n.js (vtol.toyHow).
     ------------------------------------------------------------------ */
  safe('toy', function () {
    var body = $('#toy-body');
    if (!body || !window.HTMLCanvasElement) return;
    var G = 9.81, Y0 = 40, A_T = 30, T_BURN = 1.14, DT = 0.005, N = 100, T_MAX = 6.5;
    var T0 = 1.6, T1 = 5.6, YM = 27; // plot window: the last 27 m of the fall
    var V_OK = 2, VX_OK = 1;

    function field(id, key, min, max, step, val, show) {
      var input = el('input', { type: 'range', id: id, min: String(min), max: String(max), step: String(step), value: String(val) });
      var name = el('b'), out = el('output', { for: id });
      name.style.fontWeight = '400';
      var f = {
        input: input,
        node: el('label', { class: 'field', for: id }, [el('span', {}, [name, out]), input]),
        label: function () { name.textContent = t(key); out.textContent = show(+input.value); }
      };
      input.addEventListener('input', f.label);
      return f;
    }
    var fThrust = field('toy-thrust', 'toy.thrust', 0, 25, 1, 3, unit.pct);
    var fTilt = field('toy-tilt', 'toy.tilt', 0, 10, 0.5, 1, unit.deg);
    var fTrig = field('toy-trig', 'toy.trigger', 5, 25, 0.1, 13.1, function (v) { return unit.m(v, 1); });
    var fields = [fThrust, fTilt, fTrig];
    var landedDt = el('dt'), crashedDt = el('dt'), landedEl = el('dd', { text: '0' }), crashedEl = el('dd', { text: '0' });
    var tally = el('dl', { class: 'tally' }, [el('div', {}, [landedDt, landedEl]), el('div', {}, [crashedDt, crashedEl])]);
    var runBtn = el('button', { class: 'btn btn-plain', type: 'button' });
    var say = el('p', { class: 'visually-hidden', role: 'status' });
    var canvas = el('canvas', { role: 'img' });
    body.textContent = '';
    body.appendChild(el('div', { class: 'toy-grid' }, [
      canvas,
      el('div', {}, [fThrust.node, fTilt.node, fTrig.node, runBtn, tally, say])
    ]));
    var ctx = canvas.getContext('2d');
    var trials = [], raf = 0, landed = 0;

    function label() {
      fields.forEach(function (f) { f.label(); });
      landedDt.textContent = t('toy.landed'); crashedDt.textContent = t('toy.crashed');
      runBtn.textContent = t('toy.run', { n: N });
      canvas.setAttribute('aria-label', t('toy.canvas'));
      say.textContent = t('toy.status', { landed: landed, n: N, crashed: N - landed });
    }

    function simulate() {
      var dThrust = +fThrust.input.value / 100, dTilt = +fTilt.input.value * Math.PI / 180, H = +fTrig.input.value;
      trials = []; landed = 0;
      for (var k = 0; k < N; k++) {
        var a = A_T * (1 + (Math.random() * 2 - 1) * dThrust);
        var th = (Math.random() * 2 - 1) * dTilt;
        var y = Y0, vy = 0, vx = 0, tt = 0, tb = -1, pts = [0, Y0], i = 0;
        while (y > 0 && tt < T_MAX) {
          if (tb < 0 && y <= H && vy < 0) tb = tt;
          var burning = tb >= 0 && tt - tb < T_BURN;
          var ay = (burning ? a * Math.cos(th) : 0) - G;
          var ax = burning ? a * Math.sin(th) : 0;
          vy += ay * DT; vx += ax * DT; y += vy * DT; tt += DT;
          if (++i % 4 === 0) pts.push(tt, Math.max(0, y));
        }
        pts.push(tt, 0);
        var ok = y <= 0 && Math.abs(vy) <= V_OK && Math.abs(vx) <= VX_OK;
        if (ok) landed++;
        trials.push({ pts: pts, ok: ok, tEnd: tt });
      }
      trials.sort(function (p, q) { return p.ok - q.ok; }); // landed drawn on top
      landedEl.textContent = String(landed);
      crashedEl.textContent = String(N - landed);
      say.textContent = t('toy.status', { landed: landed, n: N, crashed: N - landed });
    }

    function draw(tLimit) {
      var cs = getComputedStyle(root);
      var c = function (name) { return cs.getPropertyValue(name).trim(); };
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = canvas.clientWidth, Hh = canvas.clientHeight;
      if (!W || !Hh) return;
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(Hh * dpr)) {
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(Hh * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, Hh);
      var L = 44, R = 8, T = 22, B = 28, pw = W - L - R, ph = Hh - T - B;
      var X = function (v) { return L + (v - T0) / (T1 - T0) * pw; };
      var Y = function (v) { return T + (1 - v / YM) * ph; };
      var ink = c('--ink'), muted = c('--muted'), rule = c('--rule'), accent = c('--accent');
      ctx.font = '12px ' + (c('--font-text') || 'sans-serif');
      // grid and axes
      ctx.lineWidth = 1; ctx.strokeStyle = rule; ctx.fillStyle = muted;
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      for (var yv = 0; yv <= 25; yv += 5) {
        ctx.beginPath(); ctx.moveTo(L, Math.round(Y(yv)) + .5); ctx.lineTo(W - R, Math.round(Y(yv)) + .5); ctx.stroke();
        ctx.fillText(unit.m(yv), L - 8, Y(yv));
      }
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (var tv = 2; tv <= 5; tv += 1) ctx.fillText(unit.s(tv), X(tv), Hh - B + 9);
      ctx.strokeStyle = muted;
      ctx.beginPath(); ctx.moveTo(L, Math.round(Y(0)) + .5); ctx.lineTo(W - R, Math.round(Y(0)) + .5); ctx.stroke();
      // trigger altitude
      var H = +fTrig.input.value;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.moveTo(L, Y(H)); ctx.lineTo(W - R, Y(H)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
      ctx.fillText(t('toy.burnAt', { h: unit.m(H, 1) }), W - R - 2, Y(H) - 4);
      // traces: landed in ink, crashed faint; the accent marks a touchdown
      ctx.save(); ctx.beginPath(); ctx.rect(L, T, pw, ph + 6); ctx.clip();
      trials.forEach(function (tr) {
        ctx.strokeStyle = tr.ok ? ink : muted;
        ctx.globalAlpha = tr.ok ? 0.9 : 0.3;
        ctx.lineWidth = tr.ok ? 1.5 : 1;
        ctx.beginPath();
        var p = tr.pts;
        ctx.moveTo(X(p[0]), Y(p[1]));
        for (var j = 2; j < p.length; j += 2) {
          if (p[j] > tLimit) break;
          ctx.lineTo(X(p[j]), Y(p[j + 1]));
        }
        ctx.stroke();
        if (tr.tEnd <= tLimit && tr.tEnd < T_MAX) {
          var x = X(tr.tEnd), y0 = Y(0);
          ctx.beginPath();
          if (tr.ok) {
            ctx.globalAlpha = 1;
            ctx.arc(x, y0, 3.5, 0, 6.3); ctx.fillStyle = accent; ctx.fill();
            ctx.lineWidth = 1.25; ctx.strokeStyle = ink; ctx.stroke();
          } else {
            ctx.globalAlpha = 0.55; ctx.lineWidth = 1.25;
            ctx.moveTo(x - 3, y0 - 3); ctx.lineTo(x + 3, y0 + 3); ctx.moveTo(x + 3, y0 - 3); ctx.lineTo(x - 3, y0 + 3); ctx.stroke();
          }
        }
      });
      ctx.restore();
      ctx.globalAlpha = 1;
      // legend, above the plot
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = muted;
      var lx = L, ly = 8, w1 = ctx.measureText(t('toy.legendLanded')).width;
      ctx.strokeStyle = ink; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 18, ly); ctx.stroke();
      ctx.fillText(t('toy.legendLanded'), lx + 24, ly);
      lx += 24 + w1 + 18;
      ctx.strokeStyle = muted; ctx.globalAlpha = 0.6; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 18, ly); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.fillText(t('toy.legendCrashed'), lx + 24, ly);
    }

    function run(animate) {
      cancelAnimationFrame(raf);
      simulate();
      if (!animate || reduceMotion.matches) { draw(T_MAX); return; }
      var t0 = performance.now(), dur = 1100;
      (function frame(now) {
        var p = Math.min(1, (now - t0) / dur);
        draw(T0 + p * (T1 - T0));
        if (p < 1) raf = requestAnimationFrame(frame);
      })(t0);
    }
    function redraw() { cancelAnimationFrame(raf); draw(T_MAX); }
    fields.forEach(function (f) { f.input.addEventListener('input', function () { run(false); }); });
    runBtn.addEventListener('click', function () { run(true); });
    if ('ResizeObserver' in window) new ResizeObserver(redraw).observe(canvas);
    document.addEventListener('themechange', redraw);
    document.addEventListener('langchange', function () { label(); redraw(); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redraw);
    label();
    run(false);
  });

  /* ------------------------------------------------------------------
     8. VTOL landing-page link. Driven by VTOL_LANDING_URL (block 0).
     ------------------------------------------------------------------ */
  safe('vtol', function () {
    var note = $('#vtol-landing');
    if (!note || !/^https?:\/\//.test(VTOL_LANDING_URL)) return;
    var a = el('a', { class: 'btn', href: VTOL_LANDING_URL, id: 'vtol-landing' });
    var label = function () { a.textContent = t('vtol.landingCta'); };
    note.parentNode.replaceChild(a, note);
    document.addEventListener('langchange', label);
    label();
  });

  /* ------------------------------------------------------------------
     9. Contents. The left rail (wide screens) and the header's
        "Contents" disclosure (small screens) are plain anchor links.
        This block only (a) closes the disclosure after a choice and
        (b) marks the part of the page being read: aria-current="location"
        on its link, .is-current on its group. The targets are whatever
        the links point to, so a new link needs no change here.
     ------------------------------------------------------------------ */
  safe('contents', function () {
    var toc = $('#toc'), rail = $('#rail');
    if (toc) {
      toc.addEventListener('click', function (e) { if (e.target.closest('a')) toc.open = false; });
      document.addEventListener('click', function (e) { if (toc.open && !toc.contains(e.target)) toc.open = false; });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && toc.open) { toc.open = false; $('summary', toc).focus(); }
      });
    }
    if (!('IntersectionObserver' in window)) return;

    var links = $$('#rail a[href^="#"], #toc a[href^="#"]');
    var targets = [], seen = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1), node = document.getElementById(id);
      if (!node || seen[id]) return;
      seen[id] = true;
      // A group heading (Hardware, Software, Research) points at a section that contains other targets.
      targets.push({ id: id, node: node, group: !!a.nextElementSibling });
    });
    targets.sort(function (a, b) { return a.node.compareDocumentPosition(b.node) & 4 ? -1 : 1; });

    var inBand = {}, atEnd = false, active = null;
    function paint() {
      var next = null, i;
      for (i = 0; i < targets.length && !next; i++) if (!targets[i].group && inBand[targets[i].id]) next = targets[i].id;
      for (i = 0; i < targets.length && !next; i++) if (inBand[targets[i].id]) next = targets[i].id;
      if (atEnd && targets.length) next = targets[targets.length - 1].id;
      if (next === active) return;
      active = next;
      links.forEach(function (a) {
        if (a.getAttribute('href') === '#' + active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
      $$('.rail-list > li, .toc-list > li').forEach(function (li) {
        li.classList.toggle('is-current', !!$('[aria-current]', li));
      });
      // Keep the mark in view if the rail itself has to scroll (short windows).
      var cur = rail && $('[aria-current]', rail);
      if (cur && rail.scrollHeight > rail.clientHeight) {
        var r = rail.getBoundingClientRect(), c = cur.getBoundingClientRect();
        if (c.top < r.top || c.bottom > r.bottom) rail.scrollTop += c.top - r.top - rail.clientHeight / 2;
      }
    }

    // A reading band under the header: the first target that crosses it is "here".
    var top = ($('.top') ? $('.top').offsetHeight : 56) + 34;
    var band = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { inBand[e.target.id] = e.isIntersecting; });
      paint();
    }, { rootMargin: '-' + top + 'px 0px -60% 0px', threshold: 0 });
    targets.forEach(function (x) { band.observe(x.node); });

    // The last target (Contact) is short and cannot reach the band: it is "here" once it is all on screen.
    if (targets.length) {
      new IntersectionObserver(function (entries) {
        atEnd = entries[entries.length - 1].intersectionRatio >= 0.98;
        paint();
      }, { threshold: [0.98, 1] }).observe(targets[targets.length - 1].node);
    }
  });
})();
