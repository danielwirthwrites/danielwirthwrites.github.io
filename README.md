# danielwirthwrites.github.io — v2

The author site for Daniel Wirth, rebuilt from scratch as **"A Writer-Type
Adventure"** — the whole thing presented as a retro video-game menu system.
Title screen, character sheet, item inventory, quest log, dialogue box. No
build step; plain HTML/CSS/JS served directly by GitHub Pages.

**Live site:** https://danielwirthwrites.github.io

## Where the old site went

The previous version (dark literary theme, ring-wheel navigation, public
domain art, per-page accent colours) is **not deleted** — it's preserved:

- Branch: [`v1-toxic-flip`](../../tree/v1-toxic-flip)
- Tag: `v1-toxic-flip-final`

To bring any of it back: `git checkout v1-toxic-flip -- <path>`.

## Files

| File | Screen |
|------|--------|
| `index.html` | Title screen (main menu + starfield) |
| `about.html` | Character sheet (bio, stats, skills) |
| `books.html` | Inventory (the two real books, as items) |
| `notebook.html` | Quest log — features the ongoing serialized novel |
| `quest/disposal-unit/index.html` | Chapter select ("save file" list) for Disposal Unit |
| `quest/disposal-unit/chapter-NN.html` | One chapter: full text + a private comment form |
| `quest/apps-script/Code.gs` | Google Apps Script backend: saves comments, emails a daily digest |
| `quest/apps-script/README.md` | One-time setup steps for the comment backend (Daniel only) |
| `contact.html` | Talk to NPC (dialogue + real contact form + newsletter) |
| `achievements.html` | Hidden achievements room |
| `styles.css` | Shared pixel/JRPG-box design system |
| `fx.js` | Achievement toasts, click sparks, starfield, and the quest "save file" (localStorage) |
| `quest.js` | Chapter pages: comment form submission + "Continue reading" banner |
| `assets/` | Real book cover images |

## Content policy for this version

Per the rebuild brief: **identity and commerce stay real** (Daniel Wirth's
name, the two published books and their real Amazon links, the real
Instagram/Substack handles) — everything else (bio flavour, stats, skills,
lore) is new invented game-flavoured copy, not a factual biography.

## Chapter comments — how it works

Static sites can't run a server, so comments + the daily digest email run on
a free Google Apps Script backend that Daniel owns (not Anthropic, not this
repo's hosting). See `quest/apps-script/README.md` for the one-time setup.
Short version: a reader's comment is appended to a private Google Sheet;
once a day a trigger emails everything new, grouped by chapter, as one
message. Nothing a reader submits is shown publicly on the site.

"Continue reading" has no account system — it's a small save-file in each
visitor's own browser (`localStorage`, via `FX.QUEST` in `fx.js`) that
remembers the last chapter they opened, matching the game-save theme already
used for achievements.

## To do

- Real portrait for the character sheet.
- Real email in `contact.html`'s form `action` and the Formsubmit one-time
  activation.
- Deploy the Apps Script backend (`quest/apps-script/README.md`) and drop the
  resulting URL into `quest.js`'s `QUEST_ENDPOINT` — comments are disabled
  with a clear message until then.
- Replace `quest/disposal-unit/chapter-01.html`'s placeholder text with the
  real chapter (send it over, same as the books/poems).
- Add chapter 2+ as they're written: copy `chapter-01.html`, update its
  `data-chapter-id`/`data-chapter-title`, link it from `index.html`'s chapter
  list and from chapter 1's "next chapter" nav.
- More achievements, maybe a "New Game+" easter egg.
