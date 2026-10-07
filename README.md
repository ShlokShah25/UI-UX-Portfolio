# Shlok Shah · UI/UX Portfolio

A static, dependency-free portfolio built like a printer's specimen book.

- **Hero:** one review card, redrawn live in 11 visual styles (auto-cycles; click a chip to pick one).
- **Plate 01 – Portiq:** case study with a recreated meeting recap (decisions, owners, pipeline) in Portiq's real tokens (true black, Inter, #3B82F6).
- **Plate 02 – Mirage:** case study with a recreated plan reader (traced floor plan, scan line, "change it by asking", time of day) in Mirage's real tokens (ink, Geist / Geist Mono / Doto, #5BF0D1).
- **Plate 03 – Style library:** Swiss, Neo-Brutalism, Glassmorphism, Neumorphism, Editorial Luxury, Bento, Retro Terminal, Claymorphism, Dark SaaS. Each with palette, type and best-fit use cases.
- **Plates 04–05:** process and contact.

## Files

| File | What it holds |
| --- | --- |
| `index.html` | Page structure and case-study mockups |
| `styles.css` | Portfolio tokens (light + dark) and every style specimen |
| `app.js` | Style list, hero switcher, library cards, small Mirage/Portiq interactions |

## Run

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Add a new style

1. Add an entry to `STYLES` in `app.js` (`id`, `name`, `line`, `best`, `type`, `palette`).
2. Add `.stage[data-style="<id>"]` and `[data-style="<id>"] .spec…` rules in `styles.css`.

Deploys as-is to GitHub Pages, Vercel or Netlify.
