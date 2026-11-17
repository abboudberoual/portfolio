/* Aboud Beroual – portfolio. Vanilla JS, no dependencies.
   Everything here is progressive enhancement: the page reads complete
   without it. Each block is independent and fails quietly. */
(function () {
  'use strict';

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
  var money = function (v) { return '$' + v.toFixed(2); };

  /* ------------------------------------------------------------------
     1. Project filter
     ------------------------------------------------------------------ */
  safe('filter', function () {
    var bar = $('#filter'), sheets = $$('#sheets .sheet'), status = $('#filter-status');
    if (!bar || !sheets.length) return;
    bar.hidden = false;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-filter]');
      if (!btn) return;
      var type = btn.getAttribute('data-filter'), shown = 0;
      $$('button', bar).forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      sheets.forEach(function (s) {
        var show = type === 'all' || s.getAttribute('data-type').split(' ').indexOf(type) > -1;
        s.hidden = !show;
        if (show) shown++;
      });
      status.textContent = 'Showing ' + shown + ' of ' + sheets.length + ' projects.';
    });
  });

  /* ------------------------------------------------------------------
     2. Section index: mark the section in view
     ------------------------------------------------------------------ */
  safe('index', function () {
    var links = $$('.bar-nav a'), map = {};
    if (!('IntersectionObserver' in window)) return;
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { a.removeAttribute('aria-current'); });
        var a = map[en.target.id];
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(map).forEach(function (id) { var t = document.getElementById(id); if (t) io.observe(t); });
  });

  /* ------------------------------------------------------------------
     3. Lightbox (native <dialog>: focus trap and Esc come for free)
     ------------------------------------------------------------------ */
  var lightbox = (function () {
    if (!window.HTMLDialogElement) return null;
    var items = [], idx = 0;
    var img = el('img', { alt: '' });
    var cap = el('p', { class: 'lb-cap' });
    var count = el('span', { class: 'lb-count' });
    var prev = el('button', { class: 'lb-btn', type: 'button', text: 'Previous' });
    var next = el('button', { class: 'lb-btn', type: 'button', text: 'Next' });
    var close = el('button', { class: 'lb-btn', type: 'button', text: 'Close' });
    var dlg = el('dialog', { class: 'lightbox', 'aria-label': 'Image viewer' }, [
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
      count.textContent = many ? (idx + 1) + ' of ' + items.length : '';
      prev.hidden = next.hidden = !many;
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
    return {
      open: function (list, i) { items = list; show(i || 0); dlg.showModal(); close.focus(); },
      el: dlg
    };
  })();

  function itemFromLink(a) {
    var im = $('img', a), fc = a.closest('figure') && $('figcaption', a.closest('figure'));
    return {
      src: a.getAttribute('href'),
      w: +a.getAttribute('data-w'), h: +a.getAttribute('data-h'),
      alt: im ? im.alt : '',
      caption: a.getAttribute('data-caption') || (fc ? fc.textContent.trim() : '')
    };
  }

  safe('zoomable', function () {
    if (!lightbox) return;
    $$('a.zoomable').forEach(function (a) {
      a.addEventListener('click', function (e) { e.preventDefault(); lightbox.open([itemFromLink(a)], 0); });
    });
  });

  /* ------------------------------------------------------------------
     4. L1 build sequence: stage + thumbnail rail + scrubber
     ------------------------------------------------------------------ */
  safe('build', function () {
    var root = $('#build'), stage = $('#build-stage'), list = $('#build-list');
    if (!root || !stage || !list) return;
    var links = $$('a', list);
    var steps = links.map(function (a) {
      var fc = $('figcaption', a.closest('figure')), b = $('b', fc), im = $('img', a);
      var it = itemFromLink(a);
      it.title = b.textContent;
      it.text = fc.textContent.replace(b.textContent, '').trim();
      it.caption = it.title + '. ' + it.text;
      it.thumb = im.getAttribute('src'); it.tw = +im.getAttribute('width');
      return it;
    });
    var n = steps.length, cur = -1;

    var photo = el('img', { alt: '' });
    var photoBtn = el('button', { class: 'stage-photo', type: 'button' }, [photo, el('span', { class: 'stage-zoom', text: 'Enlarge' })]);
    var count = el('p', { class: 'stage-count' });
    var title = el('p', { class: 'stage-title', role: 'heading', 'aria-level': '5' });
    var text = el('p', { class: 'stage-text' });
    var prev = el('button', { class: 'btn', type: 'button', text: 'Previous' });
    var next = el('button', { class: 'btn btn-solid', type: 'button', text: 'Next step' });
    var range = el('input', { type: 'range', min: '1', max: String(n), step: '1', value: '1', id: 'build-range' });
    var scrub = el('label', { class: 'stage-scrub', for: 'build-range' }, [
      el('span', { text: 'Scrub through the build' }), range,
      el('span', { class: 'stage-ticks', 'aria-hidden': 'true' }, [el('span', { text: steps[0].title }), el('span', { text: steps[n - 1].title })])
    ]);
    var live = el('div', { 'aria-live': 'polite' }, [count, title, text]);
    stage.appendChild(photoBtn);
    stage.appendChild(el('div', { class: 'stage-side' }, [live,
      el('div', { class: 'stage-ctl' }, [el('div', { class: 'stage-btns' }, [prev, next]), scrub])]));

    function go(i) {
      i = Math.max(0, Math.min(n - 1, i));
      if (i === cur) return;
      cur = i;
      var s = steps[i];
      photo.srcset = s.thumb + ' ' + s.tw + 'w, ' + s.src + ' ' + s.w + 'w';
      photo.sizes = '(max-width: 700px) min(92vw, 352px), 384px';
      photo.src = s.src; photo.width = s.w; photo.height = s.h; photo.alt = s.alt;
      photoBtn.setAttribute('aria-label', 'Enlarge photo: ' + s.title);
      count.textContent = 'Step ' + (i + 1) + ' of ' + n;
      title.textContent = s.title;
      text.textContent = s.text;
      range.value = String(i + 1);
      range.setAttribute('aria-valuetext', 'Step ' + (i + 1) + ', ' + s.title);
      prev.disabled = i === 0; next.disabled = i === n - 1;
      links.forEach(function (a, j) {
        if (j === i) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    }
    prev.addEventListener('click', function () { go(cur - 1); });
    next.addEventListener('click', function () { go(cur + 1); });
    range.addEventListener('input', function () { go(+range.value - 1); });
    links.forEach(function (a, j) {
      a.setAttribute('aria-label', 'Show step ' + (j + 1) + ': ' + steps[j].title);
      a.addEventListener('click', function (e) { e.preventDefault(); go(j); });
    });
    list.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      var j = links.indexOf(document.activeElement);
      if (j < 0) return;
      e.preventDefault();
      j = Math.max(0, Math.min(n - 1, j + d));
      links[j].focus(); go(j);
    });
    photoBtn.addEventListener('click', function () {
      if (lightbox) lightbox.open(steps, cur); else window.open(steps[cur].src);
    });

    root.classList.add('enhanced');
    go(0);
  });

  /* ------------------------------------------------------------------
     5. Print time-lapse: play while in view (unless reduced motion)
     ------------------------------------------------------------------ */
  safe('video', function () {
    var v = $('#print-video');
    if (!v || !('IntersectionObserver' in window)) return;
    var userPaused = false, auto = false;
    v.addEventListener('pause', function () { if (!auto) userPaused = true; });
    v.addEventListener('play', function () { if (!auto) userPaused = false; });
    new IntersectionObserver(function (entries) {
      var vis = entries[0].isIntersecting;
      auto = true;
      if (vis && !reduceMotion.matches && !userPaused) {
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else if (!vis && !v.paused) { v.pause(); }
      setTimeout(function () { auto = false; }, 50);
    }, { threshold: 0.6 }).observe(v);
  });

  /* ------------------------------------------------------------------
     6. Lectern screenshots: scroll-snap strip with tabs and arrows
     ------------------------------------------------------------------ */
  safe('shots', function () {
    var strip = $('#shots');
    if (!strip) return;
    var figs = $$('figure', strip), n = figs.length, cur = 0;
    var names = figs.map(function (f) { return $('b', f).textContent.replace(/\.$/, ''); });
    var tabs = el('div', { class: 'shots-tabs', role: 'group', 'aria-label': 'Choose a screenshot' });
    var btns = names.map(function (nm, i) {
      var b = el('button', { class: 'chip', type: 'button', text: nm, 'aria-pressed': 'false' });
      b.addEventListener('click', function () { to(i); });
      tabs.appendChild(b); return b;
    });
    var prev = el('button', { class: 'btn', type: 'button', text: 'Previous' });
    var next = el('button', { class: 'btn', type: 'button', text: 'Next' });
    var pos = el('span', { 'aria-live': 'polite' });
    var nav = el('div', { class: 'shots-nav' }, [prev, next, pos]);
    strip.parentNode.insertBefore(tabs, strip);
    strip.parentNode.appendChild(nav);

    function mark(i) {
      cur = i;
      btns.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === i)); });
      pos.textContent = (i + 1) + ' of ' + n + ': ' + names[i];
      prev.disabled = i === 0; next.disabled = i === n - 1;
    }
    function to(i) {
      i = Math.max(0, Math.min(n - 1, i));
      strip.scrollTo({ left: figs[i].offsetLeft - figs[0].offsetLeft, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      mark(i);
    }
    prev.addEventListener('click', function () { to(cur - 1); });
    next.addEventListener('click', function () { to(cur + 1); });
    var t;
    strip.addEventListener('scroll', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var step = figs.length > 1 ? figs[1].offsetLeft - figs[0].offsetLeft : strip.clientWidth;
        var i = Math.round(strip.scrollLeft / step);
        if (i !== cur) mark(Math.max(0, Math.min(n - 1, i)));
      }, 80);
    });
    strip.addEventListener('keydown', function (e) {
      if (e.target !== strip) return;
      if (e.key === 'ArrowRight') { to(cur + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { to(cur - 1); e.preventDefault(); }
    });
    if (lightbox) {
      var items = $$('a', strip).map(itemFromLink);
      $$('a', strip).forEach(function (a, i) {
        a.addEventListener('click', function (e) { e.preventDefault(); lightbox.open(items, i); });
      });
    }
    mark(0);
  });

  /* ------------------------------------------------------------------
     7. Count-up for the verified Alchemy figures
     ------------------------------------------------------------------ */
  safe('counters', function () {
    var nodes = $$('[data-count]');
    if (!nodes.length || reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var fmt = function (v) { return Math.round(v).toLocaleString('en-CA'); };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        var node = en.target, end = +node.getAttribute('data-count'), t0 = null, dur = 900;
        (function tick(t) {
          if (t0 === null) t0 = t;
          var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
          node.textContent = fmt(end * e);
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.6 });
    nodes.forEach(function (nd) { io.observe(nd); });
  });

  /* ------------------------------------------------------------------
     8. Alchemy checkout router. ILLUSTRATIVE ONLY: every card, merchant,
        descriptor and rate below is invented for this demo.
     ------------------------------------------------------------------ */
  safe('router', function () {
    var body = $('#router-body');
    if (!body) return;
    var CATS = {
      groceries: { name: 'Groceries', mcc: '5411' },
      dining: { name: 'Dining', mcc: '5812' },
      gas: { name: 'Gas', mcc: '5541' },
      transit: { name: 'Transit', mcc: '4111' },
      streaming: { name: 'Streaming', mcc: '4899' },
      other: { name: 'Hardware, no bonus category', mcc: '5251' }
    };
    var CARDS = [
      { id: 'a', name: 'Tidewater Cashback', net: 'Network A', rates: { groceries: 4, gas: 4, streaming: 2 }, base: 1 },
      { id: 'b', name: 'Larch Travel', net: 'Network B', rates: { groceries: 5, dining: 5, transit: 3, streaming: 3 }, base: 1 },
      { id: 'c', name: 'Quarry Flat', net: 'Network A', rates: {}, base: 2 }
    ];
    var SHOPS = [
      { name: 'Pine & Parcel Grocer', desc: 'PINE&PARCEL #0412 MONTREAL QC', cat: 'groceries', amt: 85, noB: true },
      { name: 'Corner Bistro', desc: 'SQ *CORNER BISTRO 514', cat: 'dining', amt: 60 },
      { name: 'Fuelstop 9', desc: 'FUELSTOP 9 PUMP 04 LAVAL QC', cat: 'gas', amt: 70 },
      { name: 'Greyline Transit', desc: 'GREYLINE TRANSIT RELOAD', cat: 'transit', amt: 40 },
      { name: 'Orbit Streaming', desc: 'ORBIT*STREAM MONTHLY', cat: 'streaming', amt: 17 },
      { name: 'Hartwell Hardware', desc: 'HARTWELL HDWE 118 VERDUN QC', cat: 'other', amt: 120, noB: true }
    ];
    var shop = SHOPS[0], amt = shop.amt;

    var pick = el('div', { class: 'router-pick', role: 'group', 'aria-label': 'Choose a purchase' });
    var chips = SHOPS.map(function (s) {
      var b = el('button', { class: 'chip', type: 'button', text: s.name, 'aria-pressed': 'false' });
      b.addEventListener('click', function () { shop = s; amt = s.amt; range.value = String(amt); render(); });
      pick.appendChild(b); return b;
    });
    var range = el('input', { type: 'range', min: '5', max: '300', step: '5', value: String(amt), id: 'router-amt' });
    range.style.maxWidth = '16rem';
    var out = el('output', { for: 'router-amt' });
    var amtRow = el('div', { class: 'router-amt' }, [el('label', { for: 'router-amt', text: 'Purchase amount' }), range, out]);
    var fDesc = el('code'), fCat = el('strong'), fCard = el('strong');
    var flow = el('div', { class: 'router-flow' }, [
      el('div', {}, [el('small', { text: '1. Raw descriptor on the statement' }), fDesc]),
      el('div', {}, [el('small', { text: '2. Matched category' }), fCat]),
      el('div', {}, [el('small', { text: '3. Card to use' }), fCard])
    ]);
    var wallet = el('div', { class: 'wallet' });
    var rows = CARDS.map(function (c) {
      var bar = el('i'), val = el('span', { class: 'wcard-val' }), sub = el('small');
      var row = el('div', { class: 'wcard' }, [
        el('span', { class: 'wcard-art ' + c.id, 'aria-hidden': 'true' }),
        el('span', { class: 'wcard-name' }, [c.name, sub]),
        el('span', { class: 'wcard-bar', 'aria-hidden': 'true' }, [bar]),
        val
      ]);
      wallet.appendChild(row);
      return { row: row, bar: bar, val: val, sub: sub };
    });
    var why = el('p', { class: 'router-why', 'aria-live': 'polite' });
    body.textContent = '';
    [pick, amtRow, flow, wallet, why].forEach(function (x) { body.appendChild(x); });

    function render() {
      var cat = CATS[shop.cat];
      chips.forEach(function (b, i) { b.setAttribute('aria-pressed', String(SHOPS[i] === shop)); });
      out.textContent = '$' + amt;
      fDesc.textContent = shop.desc;
      fCat.textContent = cat.name + ' (MCC ' + cat.mcc + ')';
      var res = CARDS.map(function (c) {
        var rate = c.rates[shop.cat] || c.base;
        return { c: c, rate: rate, val: amt * rate / 100, ok: !(shop.noB && c.net === 'Network B') };
      });
      var okd = res.filter(function (r) { return r.ok; }).sort(function (x, y) { return y.val - x.val; });
      var win = okd[0], second = okd[1];
      var maxVal = Math.max.apply(null, res.map(function (r) { return r.val; }));
      res.forEach(function (r, i) {
        var u = rows[i];
        u.row.className = 'wcard' + (r === win ? ' win' : '') + (r.ok ? '' : ' out');
        u.sub.textContent = r.c.net + ', ' + r.rate + '% here';
        u.bar.style.width = (r.ok ? r.val / maxVal * 100 : 0) + '%';
        u.val.textContent = r.ok ? money(r.val) : 'Not accepted';
      });
      fCard.textContent = win.c.name;
      var s = win.c.name + ' earns ' + win.rate + '% at ' + shop.name + ', which is ' + money(win.val) +
        ' on $' + amt + ' and ' + money(win.val - second.val) + ' more than ' + second.c.name + '.';
      var blocked = res.filter(function (r) { return !r.ok && r.rate > win.rate; })[0];
      if (blocked) s += ' ' + blocked.c.name + ' would pay ' + blocked.rate + '%, but this merchant does not take ' + blocked.c.net + ', so it is ruled out first.';
      why.textContent = s;
    }
    range.addEventListener('input', function () { amt = +range.value; render(); });
    render();
  });

  /* ------------------------------------------------------------------
     9. Landing toy. A SIMPLIFIED ILLUSTRATION, not the project's Python
        simulator. Point mass, constant mass, fixed-length burn, no
        attitude control. Nothing here reproduces project results.
     ------------------------------------------------------------------ */
  safe('toy', function () {
    var body = $('#toy-body');
    if (!body || !window.HTMLCanvasElement) return;
    var G = 9.81, Y0 = 40, A_T = 30, T_BURN = 1.14, DT = 0.005, N = 100, T_MAX = 6.5;
    var T0 = 1.6, T1 = 5.6, YM = 27; // plot window: the last 27 m of the fall
    var V_OK = 2, VX_OK = 1;

    function field(id, label, min, max, step, val, unit) {
      var input = el('input', { type: 'range', id: id, min: String(min), max: String(max), step: String(step), value: String(val) });
      var o = el('output', { for: id });
      var show = function () { o.textContent = unit(+input.value); };
      input.addEventListener('input', show); show();
      return { input: input, node: el('label', { class: 'field', for: id }, [el('span', {}, [label, o]), input]) };
    }
    var fThrust = field('toy-thrust', 'Thrust spread', 0, 25, 1, 3, function (v) { return '±' + v + '%'; });
    var fTilt = field('toy-tilt', 'Tilt spread', 0, 10, 0.5, 1, function (v) { return '±' + v + '°'; });
    var fTrig = field('toy-trig', 'Burn starts at', 5, 25, 0.1, 13.1, function (v) { return v.toFixed(1) + ' m'; });
    var landedEl = el('dd', { text: '0' }), crashedEl = el('dd', { text: '0' });
    var tally = el('dl', { class: 'tally' }, [
      el('div', {}, [el('dt', { text: 'Landed' }), landedEl]),
      el('div', { class: 'crash' }, [el('dt', { text: 'Crashed' }), crashedEl])
    ]);
    var runBtn = el('button', { class: 'btn btn-solid', type: 'button', text: 'Run ' + N + ' trials' });
    var say = el('p', { class: 'visually-hidden', role: 'status' });
    var canvas = el('canvas', { role: 'img', 'aria-label': 'Altitude against time for each simulated trial, showing the last 27 metres of the fall.' });
    var wrap = el('div', { class: 'toy' }, [
      el('div', { class: 'toy-canvas' }, [canvas]),
      el('div', { class: 'toy-ctl' }, [fThrust.node, fTilt.node, fTrig.node, runBtn, tally, say]),
      el('p', { class: 'note toy-note' }, [
        'How the toy works: a point mass falls from ' + Y0 + ' m (the plot shows the last 27 m). At the trigger altitude a motor fires for a fixed ' + T_BURN +
        ' s and cannot throttle. Each trial draws a random thrust error and a random fixed tilt, with no attitude control. ' +
        'A trial counts as landed if it touches down slower than ' + V_OK + ' m/s vertically and ' + VX_OK + ' m/s sideways. ' +
        'Set both spreads to zero and the fixed trigger lands every time; add spread and it stops working. ' +
        'These numbers come from this toy only. The project’s own result so far is the 0 of 100 first sweep described above.'
      ])
    ]);
    body.textContent = '';
    body.appendChild(wrap);
    var ctx = canvas.getContext('2d');
    var trials = [], raf = 0;

    function simulate() {
      var dThrust = +fThrust.input.value / 100, dTilt = +fTilt.input.value * Math.PI / 180, H = +fTrig.input.value;
      trials = [];
      var landed = 0;
      for (var k = 0; k < N; k++) {
        var a = A_T * (1 + (Math.random() * 2 - 1) * dThrust);
        var th = (Math.random() * 2 - 1) * dTilt;
        var y = Y0, vy = 0, vx = 0, t = 0, tb = -1, pts = [0, Y0], i = 0;
        while (y > 0 && t < T_MAX) {
          if (tb < 0 && y <= H && vy < 0) tb = t;
          var burning = tb >= 0 && t - tb < T_BURN;
          var ay = (burning ? a * Math.cos(th) : 0) - G;
          var ax = burning ? a * Math.sin(th) : 0;
          vy += ay * DT; vx += ax * DT; y += vy * DT; t += DT;
          if (++i % 4 === 0) pts.push(t, Math.max(0, y));
        }
        pts.push(t, 0);
        var ok = y <= 0 && Math.abs(vy) <= V_OK && Math.abs(vx) <= VX_OK;
        if (ok) landed++;
        trials.push({ pts: pts, ok: ok, tEnd: t });
      }
      trials.sort(function (p, q) { return p.ok - q.ok; }); // landed drawn on top
      landedEl.textContent = String(landed);
      crashedEl.textContent = String(N - landed);
      say.textContent = 'Toy result: ' + landed + ' of ' + N + ' landed, ' + (N - landed) + ' crashed.';
    }

    function draw(tLimit) {
      var cs = getComputedStyle(document.documentElement);
      var c = function (n) { return cs.getPropertyValue(n).trim(); };
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = canvas.clientWidth, Hh = canvas.clientHeight;
      if (!W || !Hh) return;
      if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(Hh * dpr)) {
        canvas.width = Math.round(W * dpr); canvas.height = Math.round(Hh * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, Hh);
      var L = 42, R = 12, T = 14, B = 30, pw = W - L - R, ph = Hh - T - B;
      var X = function (t) { return L + (t - T0) / (T1 - T0) * pw; };
      var Y = function (y) { return T + (1 - y / YM) * ph; };
      ctx.font = '12px Barlow, Arial, sans-serif';
      ctx.lineWidth = 1;
      // grid and axes
      ctx.strokeStyle = c('--rule-2'); ctx.fillStyle = c('--ink-2');
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      for (var yv = 0; yv <= 25; yv += 5) {
        ctx.beginPath(); ctx.moveTo(L, Math.round(Y(yv)) + .5); ctx.lineTo(W - R, Math.round(Y(yv)) + .5); ctx.stroke();
        ctx.fillText(yv + ' m', L - 6, Y(yv));
      }
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (var tv = 2; tv <= 5; tv += 1) ctx.fillText(tv + ' s', X(tv), Hh - B + 8);
      ctx.strokeStyle = c('--ink'); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(L, Y(0) + .5); ctx.lineTo(W - R, Y(0) + .5); ctx.stroke();
      // trigger altitude
      var H = +fTrig.input.value;
      ctx.strokeStyle = c('--ink-2'); ctx.lineWidth = 1; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(L, Y(H)); ctx.lineTo(W - R, Y(H)); ctx.stroke();
      ctx.setLineDash([]);
      ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillStyle = c('--ink-2');
      ctx.fillText('burn starts, ' + H.toFixed(1) + ' m', W - R - 2, Y(H) - 3);
      // traces
      var ink = c('--ink'), acc = c('--accent');
      ctx.save(); ctx.beginPath(); ctx.rect(L, T, pw, ph + 5); ctx.clip();
      trials.forEach(function (tr) {
        ctx.strokeStyle = tr.ok ? ink : acc;
        ctx.globalAlpha = tr.ok ? 0.9 : 0.28;
        ctx.lineWidth = tr.ok ? 1.6 : 1;
        ctx.beginPath();
        var p = tr.pts;
        ctx.moveTo(X(p[0]), Y(p[1]));
        for (var j = 2; j < p.length; j += 2) {
          if (p[j] > tLimit) break;
          ctx.lineTo(X(p[j]), Y(p[j + 1]));
        }
        ctx.stroke();
        if (tr.tEnd <= tLimit && tr.tEnd < T_MAX) {
          ctx.globalAlpha = tr.ok ? 1 : 0.6;
          var x = X(tr.tEnd), y0 = Y(0);
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          if (tr.ok) { ctx.arc(x, y0, 3, 0, 6.3); ctx.fillStyle = ink; ctx.fill(); }
          else { ctx.moveTo(x - 3, y0 - 3); ctx.lineTo(x + 3, y0 + 3); ctx.moveTo(x + 3, y0 - 3); ctx.lineTo(x - 3, y0 + 3); ctx.stroke(); }
        }
      });
      ctx.restore();
      ctx.globalAlpha = 1;
      // legend
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      var lx = W - R - 160, ly = T + 8;
      ctx.strokeStyle = ink; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(lx, ly); ctx.lineTo(lx + 18, ly); ctx.stroke();
      ctx.fillStyle = c('--ink-2'); ctx.fillText('landed', lx + 24, ly);
      ctx.strokeStyle = acc; ctx.beginPath(); ctx.moveTo(lx + 78, ly); ctx.lineTo(lx + 96, ly); ctx.stroke();
      ctx.fillText('crashed', lx + 102, ly);
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
    [fThrust, fTilt, fTrig].forEach(function (f) { f.input.addEventListener('input', function () { run(false); }); });
    runBtn.addEventListener('click', function () { run(true); });
    if ('ResizeObserver' in window) new ResizeObserver(function () { cancelAnimationFrame(raf); draw(T_MAX); }).observe(canvas);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () { draw(T_MAX); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { draw(T_MAX); });
    run(false);
  });

  /* ------------------------------------------------------------------
     10. EconomicSense figures: 100-square grid, one figure at a time
     ------------------------------------------------------------------ */
  safe('figs', function () {
    var list = $('#figs');
    if (!list) return;
    var lis = $$('li', list);
    var waffle = el('div', { class: 'waffle', 'aria-hidden': 'true' });
    var cells = [];
    for (var i = 0; i < 100; i++) { var c = el('i'); cells.push(c); waffle.appendChild(c); }
    var num = el('p', { class: 'waffle-num' }), say = el('p', { class: 'waffle-say' });
    var wrap = el('div', { class: 'waffle-wrap' }, [waffle, el('div', { 'aria-live': 'polite' }, [num, say])]);
    list.parentNode.insertBefore(wrap, list);
    var btns = lis.map(function (li) {
      var b = el('button', { type: 'button', 'aria-pressed': 'false' });
      while (li.firstChild) b.appendChild(li.firstChild);
      li.appendChild(b);
      b.addEventListener('click', function () { show(li, b); });
      return b;
    });
    function show(li, b) {
      var n = +li.getAttribute('data-n');
      btns.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      cells.forEach(function (c, i) {
        c.style.transitionDelay = reduceMotion.matches ? '0s' : (i * 4) + 'ms';
        c.classList.toggle('on', i < n);
      });
      num.textContent = n + '%';
      say.textContent = n + ' of 100 squares: ' + li.getAttribute('data-say');
    }
    show(lis[0], btns[0]);
  });

  /* ------------------------------------------------------------------
     11. Latest commit for public repos. Unauthenticated GitHub API,
         cached per session, silent on any failure. Never blocks render.
     ------------------------------------------------------------------ */
  safe('commits', function () {
    var nodes = $$('.commit[data-repo]');
    if (!nodes.length || !window.fetch) return;
    function paint(node, d) {
      var when = new Date(d.date);
      if (isNaN(when)) return;
      node.textContent = 'Latest commit, ' + when.toLocaleDateString('en-CA', { day: 'numeric', month: 'short', year: 'numeric' }) + ': ' + d.msg;
      node.hidden = false;
    }
    function start() {
      nodes.forEach(function (node) {
        var repo = node.getAttribute('data-repo'), key = 'commit:' + repo, hit = null;
        try { hit = JSON.parse(sessionStorage.getItem(key)); } catch (e) {}
        if (hit) { paint(node, hit); return; }
        var ctl = window.AbortController ? new AbortController() : null;
        var timer = setTimeout(function () { if (ctl) ctl.abort(); }, 5000);
        fetch('https://api.github.com/repos/abboudberoual/' + repo + '/commits?per_page=1', {
          headers: { Accept: 'application/vnd.github+json' }, signal: ctl ? ctl.signal : undefined
        }).then(function (r) { return r.ok ? r.json() : Promise.reject(); })
          .then(function (j) {
            var cm = j[0].commit, msg = String(cm.message).split('\n')[0];
            if (msg.length > 72) msg = msg.slice(0, 69) + '...';
            var d = { date: cm.committer.date, msg: msg };
            try { sessionStorage.setItem(key, JSON.stringify(d)); } catch (e) {}
            paint(node, d);
          })
          .catch(function () { /* rate-limited, offline or private: leave hidden */ })
          .then(function () { clearTimeout(timer); });
      });
    }
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 3000 }); else setTimeout(start, 1200);
  });
})();
