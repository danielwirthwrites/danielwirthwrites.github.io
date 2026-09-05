/* fx.js — site-wide eye candy: achievement toasts, click sparks, an ambient
   drift layer, and a few hidden triggers. Loaded on every page. All motion is
   skipped when the visitor asks for reduced motion. State lives in the
   visitor's own browser only. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'dw_ach_v1';

  var ACH = {
    wander:       ['Wanderer', 'Three rooms in one visit.'],
    completion:   ['Completionist', 'You walked the whole wheel.'],
    reveille:     ['Reveille', 'You asked about 4:47.'],
    endoftext:    ['Read to the End', 'You actually finished one.'],
    overclock:    ['Overclocked', 'The old code still works.'],
    transmission: ['Transmission Received', 'The channel was listening.'],
    nightowl:     ['Night Owl', 'Here in the small hours, Mountain Time.'],
    patient:      ['Patient', 'Two minutes on one page. He appreciates it.']
  };

  function read()  { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function unlock(id) {
    if (!ACH[id]) return;
    var g = read();
    if (g[id]) return;
    g[id] = Date.now();
    write(g);
    toast(id, ACH[id][0], ACH[id][1], Object.keys(g).length, Object.keys(ACH).length);
  }

  function toast(id, title, blurb, n, total) {
    var t = document.createElement('a');
    t.className = 'fx-toast';
    t.href = fxRoot() + 'achievements.html';
    t.innerHTML =
      '<span class="fx-toast-tag">&#9672; Achievement &middot; ' + n + ' / ' + total + '</span>' +
      '<strong>' + title + '</strong>' +
      '<span class="fx-toast-blurb">' + blurb + '</span>';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () {
      t.classList.remove('in');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 500);
    }, 4600);
  }

  // path back to site root from any depth (…/blog/topic/entry.html -> ../../)
  function fxRoot() {
    var seg = location.pathname.split('/').filter(Boolean);
    var depth = seg.length ? seg.length - 1 : 0;   // last segment is the file
    return depth ? new Array(depth + 1).join('../') : './';
  }

  window.FX = { unlock: unlock, ACH: ACH, read: read };

  /* ---------- session tracking ---------- */
  try {
    var seen = JSON.parse(sessionStorage.getItem('dw_seen') || '[]');
    var here = location.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
    if (seen.indexOf(here) < 0) seen.push(here);
    sessionStorage.setItem('dw_seen', JSON.stringify(seen));
    if (seen.length >= 3) unlock('wander');
    var need = ['/', '/about.html', '/books.html', '/contact.html'];
    var okBlog = seen.some(function (s) { return s.indexOf('/blog') === 0; });
    if (okBlog && need.every(function (p) { return seen.indexOf(p) >= 0; })) unlock('completion');
  } catch (e) {}

  /* ---------- night owl ---------- */
  try {
    var hr = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver', hour: '2-digit', hour12: false
    }).format(new Date()), 10);
    if (hr >= 0 && hr < 5) unlock('nightowl');
  } catch (e) {}

  /* ---------- patience ---------- */
  setTimeout(function () { unlock('patient'); }, 120000);

  /* ---------- read to the end ---------- */
  var ended = false;
  window.addEventListener('scroll', function () {
    if (ended) return;
    var tall = document.body.scrollHeight > window.innerHeight * 1.7;
    if (tall && window.innerHeight + window.scrollY >= document.body.scrollHeight - 6) {
      ended = true; unlock('endoftext');
    }
  }, { passive: true });

  /* ---------- konami -> shimmer ---------- */
  var seq = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65], pos = 0;
  window.addEventListener('keydown', function (e) {
    pos = (e.keyCode === seq[pos]) ? pos + 1 : (e.keyCode === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; unlock('overclock'); if (!reduce) shimmer(); }
  });
  function shimmer() {
    var s = document.createElement('div');
    s.className = 'fx-shimmer';
    document.body.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 1500);
  }

  /* ---------- click sparks ---------- */
  if (!reduce) {
    window.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('input, textarea, select')) return;
      for (var i = 0; i < 7; i++) spark(e.clientX, e.clientY);
    });
  }
  function spark(x, y) {
    var s = document.createElement('span');
    s.className = 'fx-spark';
    var a = Math.random() * 6.283, d = 10 + Math.random() * 30;
    s.style.left = x + 'px';
    s.style.top = y + 'px';
    s.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px');
    s.style.setProperty('--dy', (Math.sin(a) * d - 12).toFixed(1) + 'px');
    document.body.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 680);
  }

  /* ---------- root system (body[data-bg="roots"]) ---------- */
  if (document.body.getAttribute('data-bg') === 'roots' && !reduce) requestAnimationFrame(roots);
  function roots() {
    var c = document.createElement('canvas');
    c.className = 'fx-roots';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var g = c.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1);

    function accent() {
      return getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#ffdf4a';
    }
    function branch(x, y, ang, len, w, depth) {
      if (depth <= 0 || len < 7) return;
      var x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
      var mx = (x + x2) / 2 + (Math.random() - 0.5) * len * 0.35;
      var my = (y + y2) / 2 + (Math.random() - 0.5) * len * 0.35;
      g.lineWidth = w;
      g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(mx, my, x2, y2); g.stroke();
      var n = 2 + (Math.random() * 2 | 0);
      for (var i = 0; i < n; i++) {
        branch(x2, y2, ang + (Math.random() - 0.5) * 1.15, len * (0.6 + Math.random() * 0.22), w * 0.68, depth - 1);
      }
    }
    function draw() {
      c.width = Math.floor(innerWidth * dpr);
      c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
      g.clearRect(0, 0, c.width, c.height);
      g.strokeStyle = accent();
      g.globalAlpha = 0.05;
      g.lineCap = 'round';
      var W = c.width, H = c.height;
      var trunks = Math.max(3, Math.round(innerWidth / 260));
      for (var i = 0; i < trunks; i++) {
        var x = W * ((i + 0.5) / trunks + (Math.random() - 0.5) * 0.12);
        branch(x, H + 12, -Math.PI / 2 + (Math.random() - 0.5) * 0.45, H * 0.16, 3.2 * dpr, 6);
      }
    }
    draw();
    var t;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(draw, 200); });
  }

  /* ---------- ambient drift ---------- */
  if (!reduce) requestAnimationFrame(ambient);
  function ambient() {
    var c = document.createElement('canvas');
    c.className = 'fx-ambient';
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    var g = c.getContext('2d');
    var dpr = Math.min(2, window.devicePixelRatio || 1), W, H, pts = [];

    function size() {
      W = c.width = Math.floor(innerWidth * dpr);
      H = c.height = Math.floor(innerHeight * dpr);
      c.style.width = innerWidth + 'px';
      c.style.height = innerHeight + 'px';
    }
    size();
    window.addEventListener('resize', size);

    var N = Math.max(18, Math.min(52, Math.round(innerWidth / 30)));
    for (var i = 0; i < N; i++) {
      pts.push({
        x: Math.random(), y: Math.random(),
        r: (0.5 + Math.random() * 1.5) * dpr,
        v: 0.00015 + Math.random() * 0.0004,
        drift: (Math.random() - 0.5) * 0.00012,
        a: 0.018 + Math.random() * 0.03
      });
    }
    function colour() {
      var v = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
      return v || '#c6ff00';
    }
    function loop() {
      requestAnimationFrame(loop);
      g.clearRect(0, 0, W, H);
      g.fillStyle = colour();
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.y -= p.v; p.x += p.drift;
        if (p.y < -0.03) { p.y = 1.03; p.x = Math.random(); }
        g.globalAlpha = p.a;
        g.beginPath();
        g.arc(p.x * W, p.y * H, p.r, 0, 6.283);
        g.fill();
      }
    }
    loop();
  }
})();
