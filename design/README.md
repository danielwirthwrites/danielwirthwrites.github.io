# Design prototypes

Working files for the site's visual direction. These are standalone previews, not
part of the live site yet.

| File | What it is |
|------|-----------|
| `palettes.html` | Six dark colour schemes explored on a homepage mockup. Chosen direction: **06 "Toxic"** — matte black `#0a0b09`, bone text `#eef3e6`, lime-to-burnt-orange accent gradient. |
| `toxic-flip.html` | The Toxic palette with the accent as one continuous gradient "sheet" pinned to the viewport (`background-attachment: fixed`), flowing in one direction, ~28 stops for a smooth lime → yellow → burnt-orange blend, 22 s loop. Applied to the top bar, masthead, divider and buttons. |
| `ring-nav.html` | Navigation as a wheel. Sections sit on a circle ("About" at top to start). Cursor left/right of the wheel turns it (further out = faster); cursor on/inside the ring stops it and highlights the nearest section; cursor below the ring, or past the screen edges, also stops. Click or Tab rotates a section to the top. All motion disabled under `prefers-reduced-motion`. |

Next step: fold the Toxic gradient system and the ring nav into the real pages
(`../index.html` etc.).
