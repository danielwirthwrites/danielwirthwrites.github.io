# Chapter comments — one-time setup

This is the only part of the Quest Log comment feature that needs you,
personally, in a browser. It takes about 5 minutes and you only do it once.
After this, it runs forever on its own: readers comment on a chapter, and
every morning you get one email with everything new.

## What you're building

```
reader fills out the comment box on a chapter
            │
            ▼
   Google Apps Script (doPost)  ──▶  appends a row to a Google Sheet
            │
            ▼
   once a day, a time trigger  ──▶  emails you every new row, in one message
```

## Steps

1. **Create a Google Sheet.** Go to [sheets.new](https://sheets.new). Name it
   anything, e.g. "Disposal Unit — comments."

2. **Open the script editor.** In the Sheet, go to **Extensions → Apps
   Script**. A new tab opens with an empty `Code.gs` file.

3. **Paste the code.** Delete whatever's in the editor and paste in the
   contents of [`Code.gs`](./Code.gs) from this folder. Click the save icon
   (or Ctrl/Cmd+S).

4. **Deploy it as a web app.**
   - Click **Deploy → New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Set **Execute as: Me**.
   - Set **Who has access: Anyone**.
   - Click **Deploy**.
   - It will ask you to authorize the script (it's yours, acting on your own
     Sheet and your own Gmail) — click through the consent screens
     ("Advanced" → "Go to ... (unsafe)" is normal for your own un-published
     script).
   - Copy the **Web app URL** it gives you — it ends in `/exec`.

5. **Create the daily email trigger, once.** Back in the script editor, use
   the function dropdown at the top (next to "Debug") to select
   `createDailyTrigger`, then click **Run**. You only do this once, ever —
   it sets up the "once a day" schedule. (You can test `sendDailyDigest`
   the same way, any time, to send yourself a digest immediately.)

6. **Send me the Web app URL** (the one ending in `/exec`), or if you're
   comfortable editing the repo yourself: open `quest.js` in the project
   root and replace

   ```js
   var QUEST_ENDPOINT = 'REPLACE_WITH_YOUR_APPS_SCRIPT_URL';
   ```

   with your URL, then save. Until this is set, chapter pages show a plain
   "comments aren't wired up yet" message instead of a broken form.

## Where comments go

Every comment lands as a new row in the **Comments** sheet (Timestamp, Book,
Chapter, Name, Comment, Page URL). Nothing is ever shown publicly on the
site — they come straight to you. The daily email groups them by chapter so
a day with several comments on the same chapter reads as one block.

## If you ever change the Sheet or re-deploy

Editing `Code.gs` and clicking **Deploy → Manage deployments → ✏️ → New
version** keeps the same URL. Only *re-creating* the deployment from scratch
gives you a new URL, which you'd need to update in `quest.js` again.
