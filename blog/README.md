# Notebook — how it's organised

Two levels:

```
blog/index.html                     Notebook home — the list of topics
blog/<topic>/index.html             a topic hub — description + grouped list of entries
blog/<topic>/<slug>.html            one entry (article / character / poem / update)
```

Current topics: `disposal-unit/`, `notes/`.

## Adding an entry

1. Copy an existing entry of the right kind as a starting point:
   - **Article / background** → `disposal-unit/article-sample.html`
   - **Character profile** → `disposal-unit/character-sample.html`
   - **Poem / fragment** → `disposal-unit/poem-sample.html`
   - **Short update** → `disposal-unit/note-sample.html`
2. Rename it to a short slug, e.g. `the-narrator.html`, `first-chapter-notes.html`.
3. In the new file, edit: `<title>`, the `<h1 class="page-title">`, the `article-meta`
   line, the `crumbs` (topic name + section), and the body.
4. Add a `<li>` linking to it under the matching `<div class="group">` in that topic's
   `index.html`.
5. Commit and push — it's live in ~1 minute.

## Adding a topic

1. `mkdir blog/<topic>` and copy `disposal-unit/index.html` into it as `index.html`.
2. Edit the title, description, and the four group lists (delete groups you don't need).
3. Add a `<li>` for it in `blog/index.html` under `<ul class="topics">`.

## Building blocks (all defined in ../styles.css)

- `<p class="crumbs">` — breadcrumb trail
- `<h1 class="page-title">` — gradient page heading
- `<p class="article-meta">` — small dated line under the heading
- `<ul class="profile">` with `<li><span>Label</span> value</li>` — character stat rows
- `<p class="poem">` — preserves exact line breaks; blank line = stanza break
- `<blockquote>` — pulled quote
- `<ul class="posts">` with `<li><a>Title</a><span class="date">Type · date</span></li>` — entry lists
- `<nav class="entry-nav">` — the "← back to topic" line at the foot of an entry

Every Notebook page keeps the yellow accent (`--accent` / `--grad` set in the page's
`<style>` block — copy it from any sibling).
