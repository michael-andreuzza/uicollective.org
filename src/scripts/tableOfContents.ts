/**
 * Builds a table of contents from headings inside each [data-toc-root] element
 * and fills the matching [data-toc-nav-for] list.
 *
 * Levels are controlled per root via data-toc-min-level / data-toc-max-level (2–4 → h2–h4).
 */

function slugify(text: string): string {
  const base = text
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return base || "section";
}

function getOrCreateHeadingId(
  heading: HTMLElement,
  usedIds: Set<string>,
): string {
  if (heading.id) {
    usedIds.add(heading.id);
    return heading.id;
  }

  const raw = heading.textContent ?? "";
  let slug = slugify(raw);
  let id = slug;
  let n = 2;
  while (usedIds.has(id) || document.getElementById(id)) {
    id = `${slug}-${n}`;
    n += 1;
  }
  usedIds.add(id);
  heading.id = id;
  return id;
}

function clampLevel(n: number): number {
  if (!Number.isFinite(n)) return 2;
  return Math.min(4, Math.max(2, n));
}

function buildHeadingSelector(minLevel: number, maxLevel: number): string {
  const min = clampLevel(Math.min(minLevel, maxLevel));
  const max = clampLevel(Math.max(minLevel, maxLevel));
  const tags: string[] = [];
  for (let level = min; level <= max; level++) {
    tags.push(`h${level}`);
  }
  return tags.join(", ");
}

function indentClass(headingLevel: number, minLevel: number): string {
  const rel = headingLevel - minLevel;
  if (rel <= 0) return "pl-0";
  if (rel === 1) return "pl-4";
  return "pl-5";
}

const LINK_BASE = "block py-1.5 text-xs font-medium leading-snug transition";
const LINK_ACTIVE = `${LINK_BASE} text-accent`;
const LINK_INACTIVE = `${LINK_BASE} text-muted-foreground hover:text-foreground`;

/** Viewport offset from top (sticky header + breathing room). */
const TOC_SCROLL_OFFSET_PX = 112;

function getActiveHeadingId(
  headingEls: HTMLElement[],
  offsetPx: number,
): string | null {
  let activeId: string | null = null;
  for (const h of headingEls) {
    if (h.getBoundingClientRect().top <= offsetPx) {
      activeId = h.id || null;
    }
  }
  if (!activeId && headingEls.length > 0) {
    activeId = headingEls[0].id || null;
  }
  return activeId;
}

function bindTocScrollSpy(
  headingEls: HTMLElement[],
  anchorsById: Map<string, HTMLAnchorElement>,
): void {
  if (headingEls.length === 0 || anchorsById.size === 0) return;

  const update = (): void => {
    const activeId = getActiveHeadingId(headingEls, TOC_SCROLL_OFFSET_PX);
    for (const [id, a] of anchorsById) {
      const on = id === activeId;
      a.className = on ? LINK_ACTIVE : LINK_INACTIVE;
      if (on) {
        a.setAttribute("aria-current", "true");
      } else {
        a.removeAttribute("aria-current");
      }
    }
  };

  update();

  let ticking = false;
  const onScrollOrResize = (): void => {
    if (!ticking) {
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize);
}

export function initTableOfContents(): void {
  document.querySelectorAll<HTMLElement>("[data-toc-root]").forEach((root) => {
    const key = root.getAttribute("data-toc-root");
    if (!key) return;

    const navRoot = document.querySelector(
      `[data-toc-nav-for="${CSS.escape(key)}"]`,
    );
    const list = navRoot?.querySelector<HTMLUListElement>("[data-toc-list]");
    if (!list) return;

    let minLevel = clampLevel(
      Number.parseInt(root.getAttribute("data-toc-min-level") ?? "2", 10) || 2,
    );
    let maxLevel = clampLevel(
      Number.parseInt(root.getAttribute("data-toc-max-level") ?? "4", 10) || 4,
    );
    if (minLevel > maxLevel) {
      const t = minLevel;
      minLevel = maxLevel;
      maxLevel = t;
    }

    const selector = buildHeadingSelector(minLevel, maxLevel);
    const headings = root.querySelectorAll<HTMLElement>(selector);
    const usedIds = new Set<string>();
    const frag = document.createDocumentFragment();
    const headingEls: HTMLElement[] = [];
    const anchorsById = new Map<string, HTMLAnchorElement>();

    headings.forEach((heading) => {
      const id = getOrCreateHeadingId(heading, usedIds);
      headingEls.push(heading);
      const level = Number.parseInt(heading.tagName.slice(1), 10);
      const pad = indentClass(level, minLevel);

      const li = document.createElement("li");
      li.className = pad;

      const a = document.createElement("a");
      a.href = `#${id}`;
      a.textContent = heading.textContent?.trim() ?? "";
      a.className = LINK_INACTIVE;

      anchorsById.set(id, a);
      li.appendChild(a);
      frag.appendChild(li);
    });

    list.replaceChildren(frag);
    bindTocScrollSpy(headingEls, anchorsById);
  });
}
