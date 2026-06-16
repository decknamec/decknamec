# README assets — source

The animated SVGs in `assets/` are **generated**. Don't hand-edit them; edit the
generators here and re-run.

```bash
node assets/_src/build-carousel.cjs   # → assets/tech-stack.svg
node assets/_src/build-readme.cjs     # → hero / divider / hdr-* / chip-*
```

Icons are vendored in `assets/_src/icons/` (from [simple-icons](https://github.com/simple-icons/simple-icons), CC0). To add one:

```bash
curl -s -o assets/_src/icons/<slug>.svg \
  https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/<slug>.svg
```

## How it works / gotchas

- GitHub strips `<style>`/CSS from Markdown, so anything animated lives **inside an SVG** rendered as `<img>`. CSS animations and `@media` run client-side there; SMIL works too.
- **Theme:** `@media (prefers-color-scheme: …)` inside each SVG swaps the CSS vars, so panel + ink follow the viewer's browser theme.
- **Motion budget:** only two anchors move, each differently — the hero (aurora drift + waving hand + slow name glint) and the carousel (scroll + accent sweep). Dividers, headers and chips are static; chip variety comes from per-brand icon colour. `prefers-reduced-motion` freezes everything gracefully.
- **Caching:** the README references assets with `?v=N`. GitHub's raw CDN ignores the query for its own cache (TTL ~5 min), but bumping `N` busts the *viewer's* browser cache. **When you change an existing SVG, bump `?v=N` in `README.md`.**
