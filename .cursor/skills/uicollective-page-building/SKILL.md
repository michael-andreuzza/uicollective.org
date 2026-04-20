---
name: uicollective-page-building
description: Build or refactor Uicollective pages with existing Astro fundation primitives. Use when creating sections, landing pages, navigation, footer updates, or new public-facing site pages.
---

# Uicollective Page Building

## Core workflow

1. Start from existing fundation primitives.
2. Create a page-specific component folder for the page sections.
3. Keep the page file focused on assembling imported section components.
4. Use `Wrapper` inside each section component.
5. Use `Text` for typography when possible.
6. Use the local `Button` component instead of hardcoded button markup when a CTA is needed.
7. Prefer semantic Tailwind tokens from `src/styles/global.css`.
8. For repeated cards, grids, and bullet-like lists, define the content as arrays in the section frontmatter and map over them in the template.

## Do not do this

- Do not create ad hoc replacement button or text components.
- Do not keep all page sections inline inside a page file when they should be extracted.
- Do not bypass `Wrapper` for normal section layout.
- Do not wrap multiple sections in one shared `Wrapper`.
- Do not introduce one-off spacing systems.
- Do not add eyebrow text, uppercase section labels, or wide tracking treatments.
- Do not create section designs that rely on colored background bands.
- Do not hardcode many repeated sibling blocks when they can be represented as structured data and rendered with a single loop.

## Spacing

- Default to `mt-*`.
- Avoid `mb-*`.

## Styling

- Never use `@apply`.
- Keep pages aligned with the semantic token model already defined in the project.
- Do not use `tracking-wide`.

## Responsiveness

- Make layouts responsive with CSS first.
- If JavaScript is needed, use vanilla JavaScript only.
