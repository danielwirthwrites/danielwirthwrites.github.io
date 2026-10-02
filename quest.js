/* quest.js — the serialized-chapter reading feature ("Quest Log").
   Handles: remembering the last chapter a visitor opened (localStorage, via
   FX.QUEST from fx.js), rendering a "Continue reading" banner wherever a
   <div id="questContinue"> exists, and wiring up the per-chapter comment
   form to a Google Apps Script endpoint (see quest/apps-script/README.md). */
(function () {
  // TODO (Daniel): after you deploy the Apps Script web app (see
  // quest/apps-script/README.md), replace this with your deployment URL —
  // it ends in /exec. Until then comments are disabled with a clear message.
  var QUEST_ENDPOINT = 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL';

  function book()          { return document.body.getAttribute('data-book') || ''; }
  function chapterId()     { return document.body.getAttribute('data-chapter-id') || ''; }
  function chapterTitle()  { return document.body.getAttribute('data-chapter-title') || document.title; }

  // Mark this page as "last read" the moment a chapter loads.
  if (chapterId() && window.QUEST) {
    QUEST.save({ book: book(), chapterId: chapterId(), title: chapterTitle(), href: location.pathname });
    window.FX && FX.unlock('bookworm');
  }

  document.addEventListener('DOMContentLoaded', function () {
    /* ---- "Continue reading" banner ---- */
    var slot = document.getElementById('questContinue');
    if (slot && window.QUEST) {
      var save = QUEST.load();
      if (save && save.href && save.href !== location.pathname) {
        slot.innerHTML =
          '<a class="btn magenta" href="' + save.href + '">CONTINUE READING &rarr;' +
          '<br><span style="font-family:var(--body); font-size:1rem; display:block; margin-top:0.3rem;">' +
          (save.title || '').replace(/</g, '&lt;') + '</span></a>';
        slot.hidden = false;
      }
    }

    /* ---- comment form ---- */
    var f = document.getElementById('chapterComments');
    if (!f) return;
    var status = document.getElementById('commentStatus');
    var btn = document.getElementById('commentSend');

    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (QUEST_ENDPOINT.indexOf('REPLACE_WITH') === 0) {
        status.className = 'form-status err';
        status.textContent = 'Comments aren’t wired up on this chapter yet — the one-time backend setup hasn’t been finished.';
        return;
      }
      var name = (f.elements.name.value || '').trim() || 'Anonymous';
      var comment = (f.elements.comment.value || '').trim();
      if (!comment) return;

      btn.disabled = true;
      status.className = 'form-status';
      status.textContent = 'Sending...';

      fetch(QUEST_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',                              // Apps Script sends no CORS headers;
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // this keeps it a "simple" request
        body: JSON.stringify({
          book: book(), chapterId: chapterId(), chapterTitle: chapterTitle(),
          name: name, comment: comment, page: location.href
        })
      }).then(function () {
        f.reset();
        status.className = 'form-status ok';
        status.textContent = 'COMMENT SAVED. Daniel reads these in his daily digest.';
        window.FX && FX.unlock('commenter');
      }).catch(function () {
        status.className = 'form-status err';
        status.textContent = 'Something broke sending that. Try again in a bit.';
      }).then(function () { btn.disabled = false; });
    });
  });
})();
