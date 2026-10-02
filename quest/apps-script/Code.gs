/**
 * Daniel Wirth author site — chapter comments backend.
 *
 * What this does:
 *  - Receives a comment submitted from a chapter page and appends it as a
 *    row in a Google Sheet (doPost).
 *  - Once a day, a time-driven trigger calls sendDailyDigest(), which emails
 *    every comment that hasn't been sent yet — grouped by chapter, as one
 *    message — then marks them as emailed.
 *
 * You do NOT need to touch this file's logic. Setup only — see
 * quest/apps-script/README.md in the repo for the exact click-by-click steps.
 */

var SHEET_NAME = 'Comments';
var DIGEST_TO = 'danielwirthwrites@gmail.com';
var DIGEST_HOUR = 7; // comments are emailed once a day, around this hour,
                      // in whatever timezone this script is set to

function doPost(e) {
  var sheet = getSheet_();
  var data = {};
  try { data = JSON.parse(e.postData.contents); } catch (err) { data = {}; }

  sheet.appendRow([
    new Date(),
    clip_(data.book, 200),
    clip_(data.chapterId, 200),
    clip_(data.chapterTitle, 300),
    clip_(data.name, 200) || 'Anonymous',
    clip_(data.comment, 5000),
    clip_(data.page, 500),
    false // "Emailed" column — sendDailyDigest() flips this to true once sent
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  return ContentService.createTextOutput('Daniel Wirth comments endpoint is running.');
}

function clip_(v, n) {
  return String(v == null ? '' : v).slice(0, n);
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Book', 'Chapter ID', 'Chapter Title', 'Name', 'Comment', 'Page URL', 'Emailed']);
  }
  return sheet;
}

/**
 * Emails every not-yet-sent comment as ONE daily digest, grouped by chapter.
 * Runs automatically once you create the daily trigger (see README) —
 * you can also select it in the toolbar and click "Run" to test it early.
 */
function sendDailyDigest() {
  var sheet = getSheet_();
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return; // header row only, nothing to send

  var header = values[0];
  var emailedCol = header.indexOf('Emailed');
  var pending = [];
  for (var i = 1; i < values.length; i++) {
    if (values[i][emailedCol] !== true) pending.push({ row: i + 1, d: values[i] });
  }
  if (pending.length === 0) return;

  var byChapter = {};
  pending.forEach(function (p) {
    var key = (p.d[1] || 'unknown book') + ' — ' + (p.d[3] || p.d[2] || 'untitled chapter');
    (byChapter[key] = byChapter[key] || []).push(p.d);
  });

  var lines = ['New chapter comments: ' + pending.length, ''];
  Object.keys(byChapter).forEach(function (key) {
    lines.push('===== ' + key + ' =====');
    byChapter[key].forEach(function (d) {
      lines.push(d[4] + '  (' + Utilities.formatDate(new Date(d[0]), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm') + ')');
      lines.push(d[5]);
      lines.push(d[6]);
      lines.push('');
    });
  });

  MailApp.sendEmail({
    to: DIGEST_TO,
    subject: 'Chapter comments — ' + pending.length + ' new',
    body: lines.join('\n')
  });

  pending.forEach(function (p) { sheet.getRange(p.row, emailedCol + 1).setValue(true); });
}

/**
 * Run this ONCE, manually, after you first deploy (see README step 5).
 * It creates the daily trigger so sendDailyDigest() fires automatically from
 * then on — you never need to touch this again.
 */
function createDailyTrigger() {
  // Avoid creating duplicates if this is accidentally run twice.
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'sendDailyDigest') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('sendDailyDigest').timeBased().everyDays(1).atHour(DIGEST_HOUR).create();
}
