// Fold a Markdown heading's following blocks up to the next heading of
// equal or higher rank. Keep the original heading IDs and DOM order so
// Quartz TOC, anchor links and nested heading states remain intact.
type Fold = {
  heading: HTMLElement
  button: HTMLButtonElement
  blocks: HTMLElement[]
  collapsed: boolean
}

let folds: Fold[] = []

function headingLevel(element: Element): number {
  return /^H[1-6]$/.test(element.tagName) ? Number(element.tagName[1]) : 0
}

function updateFolds() {
  const hidden = new Set<HTMLElement>()
  for (const fold of folds) {
    fold.button.setAttribute("aria-expanded", String(!fold.collapsed))
    fold.button.title = fold.collapsed ? "Expand section" : "Collapse section"
    fold.button.setAttribute("aria-label", fold.button.title)
    if (fold.collapsed) {
      for (const block of fold.blocks) hidden.add(block)
    }
  }
  for (const fold of folds) {
    for (const block of fold.blocks) {
      block.classList.toggle("heading-fold-hidden", hidden.has(block))
    }
  }
}

function revealHash(hash: string): HTMLElement | null {
  if (!hash || hash === "#") return null
  let id: string
  try {
    id = decodeURIComponent(hash.slice(1))
  } catch {
    return null
  }
  const target = document.getElementById(id)
  if (!target) return null
  let changed = false
  for (const fold of folds) {
    if (fold.collapsed && fold.blocks.some((block) => block === target || block.contains(target))) {
      fold.collapsed = false
      changed = true
    }
  }
  if (changed) updateFolds()
  return changed ? target : null
}

function initializeHeadingFolds() {
  // The content-page plugin puts rendered Markdown in this direct child.
  // Exclude the article title, navigation, popovers and other UI headings.
  const article = document.querySelector<HTMLElement>("#quartz-body > .center > article")
  if (!article) {
    folds = []
    return
  }
  const content = article.querySelector<HTMLElement>(":scope > .markdown-rendered") ?? article
  // Be idempotent on repeated nav events.
  if (content.dataset.headingFoldsReady === "true") return
  content.dataset.headingFoldsReady = "true"
  folds = []
  const blocks = Array.from(content.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  )

  for (let index = 0; index < blocks.length; index++) {
    const heading = blocks[index]
    const level = headingLevel(heading)
    if (!level) continue
    const section: HTMLElement[] = []
    for (let next = index + 1; next < blocks.length; next++) {
      const block = blocks[next]
      const nextLevel = headingLevel(block)
      if (nextLevel && nextLevel <= level) break
      section.push(block)
    }
    if (!section.length) continue

    const button = document.createElement("button")
    button.type = "button"
    button.className = "heading-fold-toggle"
    button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'
    heading.classList.add("heading-foldable")
    heading.prepend(button)
    const fold: Fold = { heading, button, blocks: section, collapsed: false }
    folds.push(fold)
    button.addEventListener("click", () => {
      fold.collapsed = !fold.collapsed
      updateFolds()
    })
  }

  updateFolds()
  const target = revealHash(window.location.hash)
  target?.scrollIntoView()
}

// Open hidden ancestors before normal in-page anchor navigation. This also
// supports the table of contents and browser back/forward hash navigation.
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return
  const anchor = event.target.closest("a[href]")
  if (!(anchor instanceof HTMLAnchorElement)) return
  const url = new URL(anchor.href)
  if (url.origin === location.origin && url.pathname === location.pathname && url.search === location.search) {
    revealHash(url.hash)
  }
}, true)
window.addEventListener("hashchange", () => {
  revealHash(location.hash)?.scrollIntoView()
})
document.addEventListener("nav", initializeHeadingFolds)
