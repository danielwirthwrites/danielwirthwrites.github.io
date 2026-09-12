/* fx.js — v2. Achievement toasts (Dinniman-style), click sparks, and a tiny
   starfield for the title screen. State lives only in the visitor's browser. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KEY = 'dw2_ach_v1';

  var ACH = {
    newgame:     ['New Game', 'You pressed start.'],
    lore:        ['Lore Diver', 'Opened the character sheet.'],
    shopper:     ['Window Shopper', 'Checked the inventory.'],
    talker:      ['Small Talk', 'Opened a dialogue on the Talk screen.'],
    completion:  ['100% Save File', 'Visited every screen.'],
    nightowl:    ['Night Owl', 'Playing after midnight, Mountain Time.'],
    patient:     ['Grinding', 'Two minutes on one screen. Respect.']
  };

  function read()  { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function write(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  function unlock(id) {
    if (!ACH[id]) return;
    var g = read();
    if (g[id]) return;
    g[id] = Date.now();
    write(g);
    toast(ACH[id][0], ACH[id][1], Object.keys(g).length, Object.keys(ACH).length);
  }

  function root() {
    var seg = location.pathname.split('/').filter(Boolean);
    var depth = seg.length ? seg.length - 1 : 0;
    return depth ? new Array(depth + 1).join('../') : './';
  }

  function toast(title, blurb, n, total) {
    var t = document.createElement('a');
    t.className = 'fx-toast';
    t.href = root() + 'achievements.html';
    t.innerHTML =
      '<span class="fx-toast-tag">&#9733; ACHIEVEMENT GET &middot; ' + n + '/' + total + '</span>' +
      '<strong>' + title + '</strong>' +
      '<span class="fx-toast-blurb">' + blurb + '</span>';
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('in'); });
    setTimeout(function () {
      t.classList.remove('in');
      setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 400);
    }, 4200);
  }

  window.FX = { unlock: unlock, ACH: ACH, read: read };

  /* session tracking */
  try {
    var seen = JSON.parse(sessionStorage.getItem('dw2_seen') || '[]');
    var here = location.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
    if (seen.indexOf(here) < 0) seen.push(here);
    sessionStorage.setItem('dw2_seen', JSON.stringify(seen));
    var need = ['/', '/about.html', '/books.html', '/contact.html'];
    if (need.every(function (p) { return seen.indexOf(p) >= 0; })) unlock('completion');
  } catch (e) {}

  try {
    var hr = parseInt(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Denver', hour: '2-digit', hour12: false
    }).format(new Date()), 10);
    if (hr >= 0 && hr < 5) unlock('nightowl');
  } catch (e) {}

  setTimeout(function () { unlock('patient'); }, 120000);

  /* click sparks */
  if (!reduce) {
    window.addEventListener('pointerdown', function (e) {
      if (e.button !== 0 || e.target.closest('input, textarea, select')) return;
      for (var i = 0; i < 6; i++) spark(e.clientX, e.clientY);
    });
  }
  function spark(x, y) {
    var s = document.createElement('span');
    s.className = 'fx-spark';
    var a = Math.random() * 6.283, d = 10 + Math.random() * 26;
    s.style.left = x + 'px'; s.style.top = y + 'px';
    s.style.setProperty('--dx', (Math.cos(a) * d).toFixed(1) + 'px');
    s.style.setProperty('--dy', (Math.sin(a) * d - 10).toFixed(1) + 'px');
    document.body.appendChild(s);
    setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 520);
  }

  /* starfield, opt-in via <canvas id="fx-stars"> */
  if (!reduce) {
    var c = document.getElementById('fx-stars');
    if (c) {
      var g = c.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1), stars = [];
      function size() {
        c.width = innerWidth * dpr; c.height = innerHeight * dpr;
        c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px';
      }
      size(); window.addEventListener('resize', size);
      var N = 90;
      for (var i = 0; i < N; i++) {
        stars.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.6 * dpr, s: 0.3 + Math.random() * 1.2, p: Math.random() * 6.283 });
      }
      (function loop(t) {
        requestAnimationFrame(loop);
        g.clearRect(0, 0, c.width, c.height);
        for (var i = 0; i < stars.length; i++) {
          var st = stars[i];
          var a = 0.4 + 0.6 * Math.sin(t / 900 * st.s + st.p);
          g.fillStyle = 'rgba(238,241,255,' + (a * 0.8).toFixed(2) + ')';
          g.fillRect(st.x * c.width, st.y * c.height, st.r, st.r);
        }
      })(0);
    }
  }
})();
