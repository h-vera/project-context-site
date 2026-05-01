# Multi-Page Suite Template Documentation
## Governance for Color-Coded Multi-Page Character & Theme Studies

**Template Version:** 5.9.0  
**Documentation Version:** 1.0  
**Stylesheet:** `global-v3.css`  
**JavaScript:** `character-page-v5-9.js`  
**Companion docs:** `biblical-character-readme-v5-9.md`, `thematic-study-readme-v5-9.md`

---

## What This Template Is For

This template governs **multi-page suites** — studies where the subject is so substantial that one page can't contain it, and the suite uses **color-coded child pages** to give each phase or facet its own visual identity while preserving suite-wide cohesion.

Examples already on the site:
- **Noah** — 8 interconnected pages with rainbow covenant theme (overview, significance, pattern, pages, timeline, bridge-forward, theology summary, sources)
- **Daniel** — multi-page suite with subprofiles (Faithful Exile, Son of Man, Prophetic Hope)
- **Abraham** — multi-page (when it ships) — patriarchal scope demands suite treatment

### When this template is the right choice

- Subject is one character or one theme but the material is **6+ pages** of substantive content
- Each page covers a distinct phase, facet, or sub-topic that deserves its own URL
- The suite benefits from **per-page color-coding** to help readers track where they are
- Pages are interconnected — readers move *between* them, not just *to* one of them

### When to use a different template

- **Single character, single page is enough** → `biblical-character-template-v5-9.html`
- **Theme studied through multiple texts but ≤4 parts** → `thematic-study-template-v5-9.html` (hub + parts pattern, no color-coding required)
- **Connections / arc-diagram pages** → Connections Corner (forthcoming)

### The Multi-Page Test

Before committing to a suite, answer all four:

1. Is there 6+ pages of genuinely distinct material? (Not "I could pad to 6 pages.")
2. Does each page have its own thesis, not just a section heading?
3. Will readers actually navigate *between* pages, not just consume one?
4. Does color-coding help readers (e.g., distinct phases of an arc, distinct facets that contrast)?

If you can't answer yes to all four, this is a single-page character profile or a 2–4 part thematic study, not a suite.

---

## Two Page Types in This Template

### A. Hub Page
The suite's entry point and synthesis page. Has its own URL (typically the suite's index) and its own content — it is *not* just a table of contents.

**Required sections (Hub):**

| # | Section | ID | Component |
|---|---|---|---|
| 1 | **Overview** | `#overview` | `.theology-card` + `.meta` + `.tag` |
| 2 | **Significance** (why this study warrants a suite) | `#significance` | `.theology-card` + `.core-logic-quote` |
| 3 | **Pattern** (the structural argument across the suite) | `#pattern` | `.mini-card-grid` or `.pattern-summary` |
| 4 | **Pages** (the suite's child pages with descriptions) | `#pages` | `.page-navigation` + `.page-nav-grid` |
| 5 | **Timeline / Trajectory** (chronology or scope-progression) | `#timeline` | `.timeline.stagger-children` |
| 6 | **Bridge Forward** (Christological / canonical reach) | `#bridge-forward` | `.theology-card` |
| 7 | **Theology Summary** (synthesis across the suite) | `#theology-summary` | `.theology-card` + `.pattern-summary` |
| 8 | **Source Note** (methodology + how sources are distributed) | `#source-note` | Methodology Card + Academic Note Box |
| 9 | **Notes / Bibliography** | `#notes` | `.bibliography-section` |

**Recommended hero:** Rainbow Covenant Hero (when the suite has covenant theme, like Noah) or Cosmic Spectrum (when the suite has multi-faceted theme, like Daniel).

### B. Child Page (one per facet)
A deep dive into one phase or facet of the suite, color-coded to its own `--page-accent`.

**Required framing elements (every child page):**

| Element | Purpose | Component |
|---|---|---|
| **Pathway Navigation** | Move between siblings + back to hub | `.page-nav-grid` (sibling-aware) |
| **Rainbow Stage Tracker** | Show current position in suite at a glance | dotted bar with current dot in `--page-accent` |
| **Reading Stamp** | Time + TL;DR | `.reading-stamp` |
| **Mini-TOC** | Section jumps within the page | `.mini-toc` |
| **Core Logic Quote** | This page's thesis | `.core-logic-quote` |
| **One-Line Takeaway** | Practical upshot | `.takeaway` |
| **Bridge to next** | Cross-ref to sibling | `.theology-card` near end |

**Body sections vary** by what the page argues — pick from the same body-component menu as thematic study part pages (see `thematic-study-readme-v5-9.md`).

---

## The Color-Coded Page System

This is the visual signature of a multi-page suite. Each child page sets its own `--page-accent` CSS variable; every component on that page consumes it automatically.

### How it works

In each child page's `<head>`:

```html
<style>
  :root { --page-accent: var(--accent-rose); }
</style>
```

That single line cascades through the entire stylesheet:

- The mini-card left border becomes rose
- Timeline dots, pivot box rings, footnote underlines become rose
- The qdot active state becomes rose
- The cite-button hover becomes rose
- The mini-toc active link becomes rose
- The Rainbow Stage Tracker's current dot becomes rose

The hub page does *not* set `--page-accent` — it inherits the default (`--accent-purple`) so it reads as the suite's anchor color, while child pages each carry their own.

### The v3.1 accent palette (six tokens)

All accents come from `:root` in `global-v3.css`. These are the only colors a multi-page suite should reach for:

| Token | Hex | Feel |
|---|---|---|
| `--accent-magenta` | `#ec4899` | hot pink, warm entry |
| `--accent-rose` | `#e11d48` | warm pivot, weight |
| `--accent-purple` | `#7209b7` | structural depth, the suite default |
| `--accent-indigo` | `#4f46e5` | cool depth, transition |
| `--accent-blue` | `#00b4d8` | clarity, horizon |
| `--accent-teal` | `#14b8a6` | new growth, forward motion |

For 7- or 8-page suites that need extra stops, derive them with `color-mix()` rather than introducing ad-hoc hex codes — see the Rainbow palette below.

### Rainbow palette for 8-page suites (Noah pattern)

The arc moves warm → cool → terminal-warm, mirroring the suite's rhetorical arc (entry → core → return).

| Page | Accent | Rationale |
|---|---|---|
| 1 — Overview | `var(--accent-magenta)` | warm entry |
| 2 — Significance | `var(--accent-rose)` | central weight |
| 3 — Pattern / Structure | `var(--accent-purple)` | structural depth |
| 4 — Pages (intertext) | `var(--accent-indigo)` | connections, depth bridge |
| 5 — Timeline | `var(--accent-blue)` | temporal horizon |
| 6 — Bridge Forward | `var(--accent-teal)` | new-growth trajectory |
| 7 — Theology Summary | `color-mix(in srgb, var(--accent-purple) 70%, var(--accent-indigo) 30%)` | deep violet — terminal weight |
| 8 — Sources | `var(--text-muted)` | utility / muted (cool gray) |

Page 8 deliberately drops out of the rainbow because the sources page is utility, not a stop in the arc.

### Spectrum palette for 4–6 page suites (Daniel pattern)

When the suite has fewer pages and the relationships are contrasted rather than sequential, use the six accent tokens directly. For shorter suites, take the first N rows.

| Page | Accent |
|---|---|
| 1 | `var(--accent-magenta)` |
| 2 | `var(--accent-rose)` |
| 3 | `var(--accent-purple)` |
| 4 | `var(--accent-indigo)` |
| 5 | `var(--accent-blue)` |
| 6 | `var(--accent-teal)` |

### Color choice rules

- **Adjacent pages must use distinguishable accents.** Don't put `--accent-magenta` next to `--accent-rose` (both warm pinks at small sizes), or `--accent-blue` next to `--accent-teal` (both cyan-leaning). Skip a stop in the rainbow rather than landing on neighbors.
- **Hub page leaves `--page-accent` at default** (`--accent-purple`) — child pages each declare their own.
- **The Rainbow Stage Tracker** on every child page uses each sibling's accent in its own dot — readers learn the system by seeing it.
- **All accent values must come from the six `:root` tokens, or `color-mix()` blends of them.** Do NOT invent ad-hoc hex codes — stay in the family. The 8-page Rainbow's page-7 stop is the canonical example of how to extend the palette without breaking it.

---

## Suite-Specific Components

### Rainbow Covenant Hero (Hub)

Used on the hub page only. The hero contains a horizontal arc (rainbow gradient) labeled with each child page's title and accent. Visual signal: "this is a multi-page covenant study."

```html
<header class="rainbow-covenant-hero">
  <h1>The Story of Noah</h1>
  <p class="hero-subtitle">8 movements of judgment, covenant, and new creation</p>
  <svg class="rainbow-arc" viewBox="0 0 800 200" aria-hidden="true">
    <!-- arc with 8 colored segments, each labeled -->
  </svg>
</header>
```

If the suite isn't covenant-themed, use **Cosmic Spectrum Hero** instead (same idea, different visual metaphor — concentric rings instead of an arc).

### Rainbow Stage Tracker (every Child Page)

A horizontal dot bar near the top of each child page. One dot per sibling, colored with that sibling's accent, current dot enlarged.

```html
<nav class="rainbow-stage-tracker" aria-label="Suite navigation">
  <a href="overview.html"     class="stage-dot" data-accent="rose">Overview</a>
  <a href="significance.html" class="stage-dot" data-accent="gold">Significance</a>
  <a href="pattern.html"      class="stage-dot current" data-accent="olive">Pattern</a>
  <a href="pages.html"        class="stage-dot" data-accent="teal">Pages</a>
  <a href="timeline.html"     class="stage-dot" data-accent="indigo">Timeline</a>
  <a href="bridge.html"       class="stage-dot" data-accent="plum">Bridge</a>
  <a href="theology.html"     class="stage-dot" data-accent="crimson">Theology</a>
  <a href="sources.html"      class="stage-dot" data-accent="ink-soft">Sources</a>
</nav>
```

This is a **suite-specific component** — defined in the suite's local CSS, not in `global-v3.css`. Each suite styles its tracker to match its theme.

### Methodology Card (Hub Source Note)

Suites accumulate sources differently than single-page studies. The hub's Source Note section explains *how* sources are distributed across the suite.

```html
<section class="theology-card" id="source-note">
  <h3>Source Methodology</h3>
  <div class="methodology-card">
    <h4>How sources are distributed across this suite</h4>
    <ul>
      <li>The hub bibliography contains works treating the entire arc</li>
      <li>Each child page has its own bibliography for sources specific to that page</li>
      <li>Primary sources (BHS, NA28) are cited on the hub; child pages reference back</li>
    </ul>
  </div>
  <div class="academic-note-box">
    <p><strong>On translation choices:</strong> [Suite-specific note about textual decisions, transliteration conventions, edition choices.]</p>
  </div>
</section>
```

### Type → Anti-Type Grid (when applicable)

If the suite includes an intertextuality page comparing OT type to NT anti-type (Noah → Christ baptism, Daniel → Son of Man), use a dedicated grid:

```html
<div class="type-antitype-grid">
  <div class="type-card">
    <h4 class="type-label">Type (OT)</h4>
    <p>[OT pattern]</p>
  </div>
  <div class="antitype-card">
    <h4 class="type-label">Anti-Type (NT)</h4>
    <p>[NT fulfillment]</p>
  </div>
  <div class="connection-rationale">
    <p>[How the NT text grounds the typological reading]</p>
  </div>
</div>
```

This is more disciplined than a generic `.grid-2` of `.theology-card`s — the labels and rationale slot are required.

### Study Complete Banner (last child page)

The final child page of a suite ends with a banner indicating the suite is complete and inviting readers to related studies.

```html
<aside class="study-complete-banner">
  <h3>Study Complete</h3>
  <p>You've finished the [Suite Name] suite. Continue with:</p>
  <div class="related-suites">
    <a href="/studies/characters/[next]/" class="cross-ref">→ [Related Suite 1]</a>
    <a href="/studies/themes/[next]/" class="cross-ref">→ [Related Theme]</a>
  </div>
</aside>
```

---

## Hub Page Pattern

```
RAINBOW COVENANT HERO (or Cosmic Spectrum)
  ↓
BREADCRUMBS
  ↓
Reading Stamp + Mini-TOC
  ↓
TITLE
  ↓
OVERVIEW (.theology-card + .meta + tags)
  ↓
SIGNIFICANCE (.theology-card)
  ↓
CORE LOGIC QUOTE (the suite's thesis in one sentence)
  ↓
[Star Divider]
  ↓
PATTERN (.mini-card-grid or .pattern-summary — the structural argument)
  ↓
[Star Divider]
  ↓
PAGES (.page-navigation with .page-nav-grid — each card uses sibling's accent)
  ↓
[Star Divider]
  ↓
TIMELINE / TRAJECTORY (.timeline.stagger-children)
  ↓
[Star Divider]
  ↓
BRIDGE FORWARD (.theology-card — Christological / canonical reach)
  ↓
THEOLOGY SUMMARY (.theology-card + .pattern-summary)
  ↓
ONE-LINE TAKEAWAY
  ↓
SOURCE NOTE (Methodology Card + Academic Note Box)
  ↓
NOTES / BIBLIOGRAPHY (.bibliography-section)
```

## Child Page Pattern

```
HEADER (smaller hero or none — suite identity is on hub)
  ↓
BREADCRUMBS (back to suite hub)
  ↓
RAINBOW STAGE TRACKER (current dot in --page-accent, others muted)
  ↓
Reading Stamp + Mini-TOC
  ↓
TITLE (with --page-accent applied)
  ↓
CORE LOGIC QUOTE (this page's thesis)
  ↓
DIAGNOSIS / SETUP (.theology-card — what this page argues)
  ↓
[Star Divider]
  ↓
BODY SECTIONS (varies — pick components from the menu in
                thematic-study-readme-v5-9.md)
  - Each major body section uses the right component
  - Star Dividers between major body sections
  - At most one Pivot Box
  - One Pattern Summary at the end of major body sections
  ↓
[Star Divider]
  ↓
SYNTHESIS (.theology-card or .pattern-summary)
  ↓
BRIDGE TO NEXT (.theology-card with cross-ref)
  ↓
ONE-LINE TAKEAWAY
  ↓
PATHWAY NAVIGATION (← prev sibling / next sibling →)
  ↓
SOURCES (.bibliography-section — page-specific)
  ↓
[On final page only] STUDY COMPLETE BANNER
```

---

## Anti-Patterns Specific to Multi-Page Suites

These are in addition to v5.9 universal anti-patterns and the thematic-study anti-patterns.

1. **Hub that's only a table of contents.** Hub must have its own argument: Significance + Pattern + Theology Summary. If the hub adds nothing beyond the parts list, the suite is just a 4-page thematic study with extra steps.

2. **Child pages without `--page-accent` set.** Every child page must declare its accent in `<head>`. Forgetting this means the page falls back to the default (`--accent-purple`) and the color-coding system silently breaks.

3. **Hub setting `--page-accent`.** The hub leaves the default. Setting an accent on the hub makes one child page's accent collide with the hub.

4. **Adjacent pages with similar accents.** Rose next to crimson, indigo next to plum — readers can't distinguish at the small sizes used in stage trackers. Use the rainbow or spectrum palettes above.

5. **Inconsistent stage tracker order across child pages.** All children must show the same order. If page 5 reorders the dots, the system breaks.

6. **More than 9 child pages.** If you need 10 pages, the suite is two suites or one suite with sub-suites. Don't push past 9 — readers can't track that many color-coded siblings.

7. **Bibliography duplication.** Each child page has its own sources for *that page's* argument. The hub bibliography is for the suite's overarching argument. Don't repeat.

8. **Child page that's shorter than a section of a single character profile.** If page 4 of an 8-page suite has 800 words, it shouldn't be its own page. Either expand it (and prove it deserves a page) or merge it back.

9. **Pathway Navigation that skips siblings.** Always link to the immediate prev/next sibling, even if you also link to "back to hub." Readers expect linear traversal to work.

10. **Study Complete Banner on intermediate pages.** Only the final page gets it. Intermediate pages get Bridge to Next.

---

## Page-Level Section Config (per-page)

Hub example (Noah pattern):

```html
<script id="page-section-config" type="application/json">
[
  { "id": "overview",          "label": "Overview",     "priority": 1 },
  { "id": "significance",      "label": "Significance", "priority": 1 },
  { "id": "pattern",           "label": "Pattern",      "priority": 2 },
  { "id": "pages",             "label": "Pages",        "priority": 1 },
  { "id": "timeline",          "label": "Timeline",     "priority": 2 },
  { "id": "bridge-forward",    "label": "Forward",      "priority": 3 },
  { "id": "theology-summary",  "label": "Theology",     "priority": 2 },
  { "id": "source-note",       "label": "Methodology",  "priority": 4 },
  { "id": "notes",             "label": "Sources",      "priority": 5 }
]
</script>
```

Child page example:

```html
<script id="page-section-config" type="application/json">
[
  { "id": "thesis",      "label": "Thesis",     "priority": 1 },
  { "id": "anchors",     "label": "Anchors",    "priority": 1 },
  { "id": "body-1",      "label": "[Topic 1]",  "priority": 2 },
  { "id": "body-2",      "label": "[Topic 2]",  "priority": 2 },
  { "id": "synthesis",   "label": "Synthesis",  "priority": 3 },
  { "id": "bridge",      "label": "Next",       "priority": 4 },
  { "id": "sources",     "label": "Sources",    "priority": 5 }
]
</script>
```

---

## Pre-Publication Checklist (Multi-Page Suites)

### Suite-Wide

- [ ] Multi-Page Test passed (4 yeses)
- [ ] Palette chosen (Rainbow for ≥7 pages, Spectrum for 4–6)
- [ ] Adjacent-page accents are visually distinguishable
- [ ] Stage tracker order is identical on every child page
- [ ] Each child page declares its own `--page-accent`
- [ ] Hub does NOT declare `--page-accent` (uses default)
- [ ] All cross-refs between siblings work both directions
- [ ] No bibliography duplication between hub and children

### Hub Page

- [ ] Rainbow Covenant Hero or Cosmic Spectrum Hero
- [ ] All 9 required hub sections present
- [ ] Significance section makes a substantive argument (not just "this character matters")
- [ ] Pattern section names the structure (not just describes content)
- [ ] Pages nav grid uses each sibling's accent on its card
- [ ] Theology Summary synthesizes across the suite (not on one part)
- [ ] Source Note has Methodology Card + Academic Note Box
- [ ] Hub bibliography covers the overarching argument
- [ ] Page section config matches actual sections

### Each Child Page

- [ ] `--page-accent` set in `<head>` `<style>` block
- [ ] Rainbow Stage Tracker present, current dot marked
- [ ] Pathway Navigation at top AND bottom (← prev / next →)
- [ ] Core Logic Quote (this page's thesis) — exactly one
- [ ] At most one Pivot Box
- [ ] At most one Critical Distinction
- [ ] At most one Pattern Summary per body section (multiple sections OK)
- [ ] One `.takeaway` near end
- [ ] Bridge to next sibling with cross-ref
- [ ] Page-specific bibliography (no duplication)
- [ ] Page section config matches actual sections
- [ ] Last page in suite has Study Complete Banner

### v5.9 Universals (apply to every page)

- [ ] `template-version` is `5.9.0`
- [ ] `study-type` is `multi-page-suite` (hub) or `multi-page-suite-child` (children)
- [ ] Reading Time + TL;DR Stamp filled in
- [ ] Mini-TOC matches actual sections
- [ ] Star Dividers between major sections
- [ ] No body-content gradients
- [ ] No `.animate-on-scroll` (opt-in only on `.timeline.stagger-children`)
- [ ] Three-font budget honored

---

## Examples on the Live Site

| Suite | Hub | Pages | Palette |
|---|---|---|---|
| **Noah** | studies/characters/genesis/noah/ | overview, significance, pattern, pages, timeline, bridge-forward, theology-summary, sources | Rainbow (8) |
| **Daniel** | studies/characters/daniel/ | faithful-exile, son-of-man, prophetic-hope (+ planned: hub, theology) | Spectrum (4–6) |
| **Abraham** | (planned) | (TBD) | Rainbow (8) likely |

---

## Migration Notes

There is no v5.8 multi-page suite template — the existing suites (Noah, Daniel) were built before formal governance. To align an existing suite with v5.9:

1. Audit the suite's hub to confirm all 9 hub-required sections present (Noah passes; Daniel needs a proper hub built)
2. Bump `template-version` to `5.9.0` on every page in the suite
3. Set `study-type` to `multi-page-suite` (hub) or `multi-page-suite-child`
4. Swap stylesheet to `global-v3.css` on every page
5. Verify each child page has `--page-accent` in its `<head>`
6. Add Rainbow Stage Tracker to every child page (suite-local CSS)
7. Add Reading Stamp, Mini-TOC, Star Dividers to every page
8. Add per-page section config JSON
9. Audit body sections — replace any that use the wrong component
10. Verify Pathway Navigation works at top and bottom of every child
11. Add Study Complete Banner to the final page
12. Audit bibliography distribution — strip duplication

---

*Last Updated: April 2026*  
*Template Version: 5.9.0*  
*Documentation Version: 1.0*