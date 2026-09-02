/* Inner-page rail behaviour.
   Clicking "Home" flags the session so the homepage plays its reverse
   (rail -> wheel) animation, and does a short exit fade first. */
(function () {
  var home = document.getElementById('nav-home');
  if (!home) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  home.addEventListener('click', function (e) {
    try { sessionStorage.setItem('fromRail', '1'); } catch (err) {}
    if (reduce) return;                       // navigate normally
    // If the browser can crossfade the navigation itself, let it — just a short
    // beat for the rail to slide out first.
    e.preventDefault();
    var href = home.href;
    document.body.classList.add('rolling');
    setTimeout(function () { window.location.href = href; }, 260);
  });

  // undo the exit fade if this page comes back from the bfcache (Back button)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) document.body.classList.remove('rolling');
  });
})();
