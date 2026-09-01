# danielwirthwrites.github.io

The source for Daniel Wirth's author website.

**Live site:** https://danielwirthwrites.github.io

## How it works

Plain HTML and one CSS file. No build step. GitHub Pages serves the files in
this repo directly; pushing to the `main` branch updates the live site within
a minute or two.

## Files

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About |
| `books.html` | Books & Poetry |
| `blog/index.html` | Notebook (list of posts) |
| `blog/YYYY-MM-DD-slug.html` | An individual post |
| `contact.html` | Contact + newsletter |
| `styles.css` | All styling; colours are the variables at the top |
| `404.html` | Shown for unknown URLs |

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
