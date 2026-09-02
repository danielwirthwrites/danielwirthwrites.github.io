# danielwirthwrites.github.io

The source for Daniel Wirth's author website.

**Live site:** https://danielwirthwrites.github.io

## How it works

Plain HTML and one CSS file. No build step. GitHub Pages serves the files in
this repo directly; pushing to the `main` branch updates the live site within
a minute or two.

Dark theme throughout ("Toxic" palette: matte black, bone text, a flowing
lime-to-orange accent gradient). The homepage navigation is a rotating wheel;
choosing a section unrolls it into the fixed left-hand rail the inner pages use.
Each inner page tints the accent to its own hue by overriding `--accent` and
`--grad` in a small `<style>` block: About = green, Books & Poetry = turquoise,
Notebook = yellow, Contact = orange.

## Files

| File | Page |
|------|------|
| `index.html` | Home — self-contained (wheel nav + its own CSS/JS) |
| `about.html` | About (green) |
| `books.html` | Books & Poetry (turquoise) |
| `blog/index.html` | Notebook — list of posts (yellow) |
| `blog/YYYY-MM-DD-slug.html` | An individual post |
| `contact.html` | Contact + newsletter (orange) |
| `styles.css` | Shared styling for the inner pages; tokens at the top |
| `404.html` | Shown for unknown URLs |
| `design/` | Standalone prototypes / design direction notes |

## Making changes

Send the new text (bio, book details, a blog post, the email address to show,
your Buttondown newsletter username) and it gets edited in, committed, and
pushed.

### To do

- Replace placeholder copy on every page with real text.
- Set the contact email address in `contact.html` (currently `YOUR-EMAIL@example.com`).
- Replace `USERNAME` in the newsletter form with a real Buttondown username, or
  swap in a different newsletter provider's embed code.
- Add an author photo to the About page.
- Optional: point a custom domain at the site.
