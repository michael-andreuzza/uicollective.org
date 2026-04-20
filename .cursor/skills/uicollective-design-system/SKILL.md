---
name: uicollective-design-system
description: Apply Uicollective's semantic Tailwind v4 design system and component reuse rules. Use when editing tokens, buttons, typography, section layout, or shared UI styling.
---

# Uicollective Design System

## Tokens

- Use semantic tokens such as `background`, `foreground`, `muted-surface`, `border`, `accent`, and inverse dark-surface text patterns.
- Keep the font direction on `Geist`.
- Do not add eyebrow labels, uppercase helper labels, or wide letter-spacing treatments.
- Do not create section bands with background colors.

## Component reuse

- Reuse local fundation components before creating new UI abstractions.
- Organize each page with its own page-specific section components, for example `components/about/*`.
- Keep page files as composition entrypoints, not as large markup dumps.
- `Wrapper` is mandatory for section structure unless there is a clear exception.
- Each section should include its own `Wrapper`.
- Do not use a single shared `Wrapper` around multiple sections.
- Prefer `Text` and `Button` over hardcoded equivalents.
- Prefer structured arrays in section frontmatter for repeated UI patterns such as card grids and simple lists, then render them with a single mapping loop.

## Tailwind rules

- Never use `@apply`.
- Prefer `mt-*` over `mb-*`.
- Never use `tracking-wide` or similar wide tracking treatments.
- Keep utility usage aligned with Tailwind v4 conventions.

## Responsiveness

- Build responsive layouts with CSS and vanilla JavaScript only when JavaScript is actually needed.
- Do not introduce framework-driven client interactivity for simple responsive behavior.
