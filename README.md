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
| `notebook.html` | Quest log (work in progress) — stub for now |
| `contact.html` | Talk to NPC (dialogue + real contact form + newsletter) |
| `achievements.html` | Hidden achievements room |
| `styles.css` | Shared pixel/JRPG-box design system |
| `fx.js` | Achievement toasts, click sparks, title-screen starfield |
| `assets/` | Real book cover images |

## Content policy for this version

Per the rebuild brief: **identity and commerce stay real** (Daniel Wirth's
name, the two published books and their real Amazon links, the real
Instagram/Substack handles) — everything else (bio flavour, stats, skills,
lore) is new invented game-flavoured copy, not a factual biography.

## To do

- Real portrait for the character sheet.
- Real email in `contact.html`'s form `action` and the Formsubmit one-time
  activation.
- Build out the Quest Log properly (characters / worldbuilding / fragments
  per project, like v1's Notebook, but styled as quests).
- More achievements, maybe a "New Game+" easter egg.
