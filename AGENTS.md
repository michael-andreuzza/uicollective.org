# Uicollective Agent Guidance

- Reuse local fundation primitives before creating new components.
- Every page should have its own component folder with its page-specific sections.
- Example structure: `components/about/Heading.astro`, `components/about/SectionMission.astro`, `components/about/SectionScope.astro`.
- Do not keep multiple page sections inline inside a page file when they should be extracted into page-specific components.
- `Wrapper` is required for page section structure unless a documented exception exists.
- Each section should include its own `Wrapper`.
- Do not wrap an entire page in one shared `Wrapper` that spans multiple sections.
- Prefer structured arrays in section frontmatter for repeated cards, grids, and simple lists, then map them in the template instead of duplicating markup blocks.
- Prefer `Text` and `Button` over hardcoded replacements.
- Keep styling aligned with semantic Tailwind v4 tokens in `src/styles/global.css`.
- Never use `@apply`.
- Prefer `mt-*` and avoid `mb-*`.
- Do not add eyebrow labels, uppercase helper text, or wide tracking styles.
- Do not create section background color bands.
- Use CSS first for responsiveness and vanilla JavaScript only when needed.
- Keep public-facing pages consistent, calm, and credible in tone.
