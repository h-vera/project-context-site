# Thematic Study Template Documentation
## Governance for Multi-Part Theological Studies

**Template Version:** 5.9.0  
**Documentation Version:** 1.0  
**Stylesheet:** `global-v3.css`  
**JavaScript:** `character-page-v5-9.js` (shared chassis; renamed `study-page-v5-9.js` if you prefer)  
**Companion docs:** `biblical-character-readme-v5-9.md`, `multi-page-suite-readme-v5-9.md`

---

## What This Template Is For

This template governs **thematic studies** — pages whose subject is a *theological theme that traverses Scripture* rather than a single character. The argument is built across multiple texts; the structure is the *theme's* development through the canon.

Examples already on the site:
- **Resurrection as Revelation** (Paul's letters: Ephesians, 1 Corinthians, 1 Timothy, 2 Timothy)
- **Image of God** (Genesis foundation → NT trajectory → Royal/Priest/Prophet vocation → ANE background → Literary design → Male & Female)
- **Luke-Acts Levitical Arc** (Leviticus pattern → Luke-Acts fulfillment)
- **Genesis 6–9 ⇄ 19 Inversion** (Noah/Lot typology and reversal)

### When this template is the right choice

- The page argues a *theme*, not a character
- The theme develops through 2+ distinct passages, books, or traditions
- The argument has phases or facets that can each be a separate page (hub + parts)
- A character profile would force the theme into a single character's frame

### When to use a different template

- **Single character is the subject** → `biblical-character-template-v5-9.html`
- **Page is a hub for a color-coded multi-page character study** (Noah, Daniel) → `multi-page-suite-template-v5-9.html` (the multi-page suite recipe is built around character studies; thematic studies use this template's hub-and-parts pattern instead)
- **Page is a connections / arc-diagram** → Connections Corner template (forthcoming)
- **Page is a tool / workbench** → Tool template (forthcoming)

---

## Two Page Types in This Template

A thematic study consists of:

### A. Hub Page
The entry point. Frames the argument, navigates to parts, holds the synthesis.

**Required sections (Hub):**

| # | Section | ID | Component |
|---|---|---|---|
| 1 | **Thesis** (the page's central claim) | `#thesis` | `.theology-card` + `.core-logic-quote` |
| 2 | **Parts navigation** | `#parts` | `.page-navigation` + `.page-nav-grid` |
| 3 | **Functions** (what each part does in the argument) | `#functions` | `.mini-card-grid` (4–6 cards) |
| 4 | **Anchor Texts** (the canonical evidence) | `#anchor-texts` | `.theology-card` + `.timeline` OR `.atlas-tracks` |
| 5 | **Context** (background needed to read the parts) | `#context` | `.theology-card` |
| 6 | **Bibliography** | `#bibliography` | `.bibliography-section` |

**Recommended hero:** Cosmic Halo (capstone thematic studies) or Animated Gradient (lay-friendly).

### B. Part Page (one per part of the argument)
A deep dive into one phase or facet of the theme.

**Required sections (Part):**

| # | Section | ID | Component |
|---|---|---|---|
| 1 | **Diagnosis / Setup** (what this part addresses) | `#thesis` or `#diagnosis` | `.theology-card` + `.core-logic-quote` |
| 2 | **Anchors** (the part's anchor passages) | `#anchors` | `.theology-card` |
| 3 | **Body sections** (page-specific — see below) | various | various |
| 4 | **Bridge** (what comes next) | `#bridge` | `.theology-card` + cross-ref |
| 5 | **Sources** (part-specific bibliography) | `#sources` | `.bibliography-section` |

Plus framing elements common to all v5.9 pages:
- Reading Time + TL;DR Stamp
- Mini-TOC Pill Bar
- Star Dividers between major sections
- One-Line Takeaway near end
- Pathway Navigation (← prev part / next part →)

**Recommended hero:** Cosmic Halo for major parts, Animated Gradient for lay-friendly parts.

---

## Body Sections (Part Pages) — Pick the Right Components

Unlike character profiles where the section list is fixed, thematic study part pages have **content-driven body sections**. Pick from this menu based on what the part argues:

### Argument-shape body components

| If the part argues… | Use | Anti-pattern |
|---|---|---|
| Two passages compared point-by-point | **Atlas Node Card** (left passage / right passage / rationale) | Two `.theology-card`s side-by-side |
| OT pattern → NT fulfillment | **Paired Flow Tracks** | Generic timeline |
| Symptom → diagnosis → solution | **Iceberg Diagram** | Linear `.timeline` |
| Mirror structure with theological pivot | **Chiasm** (≤5 pairs) or **Chiastic Two-Column with Center Pivot** (5+ pairs) or **Mirror+Center Infographic** (book-level) | ASCII pre-formatted text |
| Sequential stages where increase in scope is the point | **Expansion Track** | `.timeline` (chronology, not scope) |
| 4 facets of one concept | **Four-Circle Venn (Flippable)** (≤30 words/face) or **Portrait Venn 2×2 + Center** (paragraph-length) | `.grid-2 + .grid-2` of cards |
| 4–6 short equal-weight concepts | **Mini-Card Grid** | nested `.grid-3` in a card |
| Closed lexical system (e.g., 4 opposing Hebrew terms) | **Hebrew Vocab Color-Coded Grid** | individual `.word-study` cards |
| One verse marking the structural center | **Pivot Box** | `.scripture-quote` |
| Page's central thesis (italic, central) | **Core Logic Quote** | `.key-insight` |
| End-of-section structural synthesis | **Pattern Summary Box** | generic panel |
| Page-closer practical upshot | **One-Line Takeaway** | another `.key-insight` |
| Mid-section pattern-flip moment | **Revolutionary Inversion Box** | bold paragraph |
| Correction of common misreading | **Critical Distinction Box** | `.key-insight` |

### Required-once-per-page

- **Core Logic Quote** — exactly once per part page (the page's thesis)
- **One-Line Takeaway** — exactly once per part page (the practical upshot, max 1)
- **Reading Time + TL;DR Stamp** — exactly once
- **Mini-TOC Pill Bar** — exactly once

### Forbidden combinations

- Core Logic Quote + Takeaway right next to each other (separate by 2+ sections)
- 3+ callout boxes back-to-back (Key Insight + Critical Distinction + Pattern Summary stacked is emphasis-fatigue)
- Two pivot boxes on one page (the structural center can only happen once)

---

## Hub Page Pattern (proven on Resurrection-as-Revelation, Image of God)

```
HERO (Cosmic Halo or Animated Gradient)
  ↓
BREADCRUMBS + Reading Stamp + Mini-TOC
  ↓
THESIS (.theology-card)
  ↓
CORE LOGIC QUOTE (the argument in one sentence)
  ↓
[Star Divider]
  ↓
PARTS NAVIGATION (.page-navigation with .page-nav-grid)
  ↓
[Star Divider]
  ↓
FUNCTIONS (.mini-card-grid — what does each part do?)
  ↓
[Star Divider]
  ↓
ANCHOR TEXTS (.theology-card with .timeline of canonical evidence,
                or .atlas-tracks-grid if comparing many passage pairs)
  ↓
CONTEXT (.theology-card — what background does the reader need?)
  ↓
[Star Divider]
  ↓
ONE-LINE TAKEAWAY
  ↓
BIBLIOGRAPHY (.bibliography-section)
```

---

## Part Page Pattern (proven on Resurrection Part 1: Ephesians, Image of God Royal-Priest-Prophet)

```
HERO (smaller than hub — Animated Gradient or none)
  ↓
BREADCRUMBS (back to hub)
  ↓
PATHWAY NAVIGATION (← prev part / part indicator / next part →)
  ↓
Reading Stamp + Mini-TOC
  ↓
TITLE
  ↓
CORE LOGIC QUOTE (this part's thesis)
  ↓
DIAGNOSIS / THESIS (.theology-card — what does this part argue?)
  ↓
[Star Divider]
  ↓
ANCHORS (.theology-card or .scripture-quote stack — the canonical evidence
         this part rests on)
  ↓
[Star Divider]
  ↓
BODY SECTIONS (varies by part — pick from "Argument-shape body components" menu)
  - Each major body section uses the right component for its argument shape
  - Star Dividers between major body sections
  - At most one Pivot Box (if the part has a structural center)
  - One Pattern Summary at the end of each major body section
  ↓
[Star Divider]
  ↓
SYNTHESIS (.theology-card or .pattern-summary)
  ↓
BRIDGE (.theology-card with cross-ref to next part)
  ↓
ONE-LINE TAKEAWAY
  ↓
PATHWAY NAVIGATION (← prev / next →)
  ↓
SOURCES (.bibliography-section — part-specific)
```

---

## Anti-Patterns Specific to Thematic Studies

These are in addition to the v5.9 universal anti-patterns (no body gradients, no animate-on-scroll defaults, three-font budget, etc.).

1. **Forcing thematic content into character template sections.** If your "Narrative Journey" is actually about how a theme develops through Genesis → Exodus → Isaiah → Romans, that's not a Narrative Journey — it's a Trajectory or Anchor Text Timeline. Use the right component.

2. **Hub page that just lists parts.** A hub is not a table of contents. It frames the argument so readers know *why* they should read the parts. Required: Thesis, Core Logic Quote, Functions (what each part does), Anchor Texts (the evidence the parts examine).

3. **Part pages without a Pathway Navigation.** Readers must be able to navigate prev/next without going back to the hub. Required at top and bottom of every part.

4. **Repeating the hub's bibliography on every part.** Each part has its own sources for *that part's* argument. The hub's bibliography is for the overarching argument. They should not duplicate.

5. **More than 7 parts.** If your theme needs more than 7 parts, the theme is two themes. Split it.

6. **Mismatched hero across parts.** All parts in a study should share a hero family (all Cosmic Halo, or all Animated Gradient). Mixing breaks visual continuity.

7. **A part that has no anchor texts.** Every part is grounded in canonical evidence. If a part is purely systematic-theology synthesis with no anchor passages, it doesn't belong in a thematic study — it belongs in a different format.

---

## Page-Level Section Config (per-part)

Each part page declares its own sectionConfig. The mobile tabs auto-generate from this:

```html
<script id="page-section-config" type="application/json">
[
  { "id": "thesis",           "label": "Thesis",      "priority": 1 },
  { "id": "anchors",          "label": "Anchors",     "priority": 1 },
  { "id": "ephesians",        "label": "Ephesians",   "priority": 1 },
  { "id": "double-revelation","label": "Double Rev",  "priority": 2 },
  { "id": "ephesians-apocalypse", "label": "Apocalypse", "priority": 2 },
  { "id": "bridge",           "label": "Bridge",      "priority": 4 },
  { "id": "sources",          "label": "Sources",     "priority": 5 }
]
</script>
```

Hub pages declare their own:

```html
<script id="page-section-config" type="application/json">
[
  { "id": "thesis",       "label": "Thesis",    "priority": 1 },
  { "id": "parts",        "label": "Parts",     "priority": 1 },
  { "id": "functions",    "label": "Functions", "priority": 2 },
  { "id": "anchor-texts", "label": "Anchors",   "priority": 2 },
  { "id": "context",      "label": "Context",   "priority": 3 },
  { "id": "bibliography", "label": "Sources",   "priority": 5 }
]
</script>
```

---

## Pre-Publication Checklist (Thematic Studies)

### Hub Page

- [ ] Thesis section with `.core-logic-quote`
- [ ] Parts navigation with all parts linked
- [ ] Each part-card in nav has accent matching the part's `--page-accent` (if using color-coding)
- [ ] Functions section explains what each part does in the argument
- [ ] Anchor texts cited and linked to the parts that examine them
- [ ] One `.takeaway` near end
- [ ] Bibliography covers the overarching argument (not part-specific)
- [ ] Page section config matches actual sections

### Part Page

- [ ] Pathway Navigation at top AND bottom (← prev / next →)
- [ ] Core Logic Quote (the part's thesis) — exactly one
- [ ] Anchors section with specific passages (not generic theological framing)
- [ ] Body sections each use the right component for their argument shape (see menu above)
- [ ] At most one Pivot Box (if applicable)
- [ ] At most one Critical Distinction (if applicable)
- [ ] Bridge to next part with cross-ref link
- [ ] One `.takeaway` at end
- [ ] Sources are part-specific
- [ ] Page section config matches actual sections

### Both

- [ ] `template-version` is `5.9.0`
- [ ] `study-type` is `thematic-study`
- [ ] Reading Time + TL;DR Stamp filled in
- [ ] Mini-TOC Pill Bar matches actual section IDs
- [ ] Star Dividers between major sections (not `<hr>`)
- [ ] No body-content gradients
- [ ] No `.animate-on-scroll` (use opt-in `.fade-in` only where motion is meaning)
- [ ] Three-font budget honored
- [ ] Mobile tabs render at <768px
- [ ] All cross-refs link to existing pages

---

## Examples on the Live Site

| Study | Hub | Parts | Notes |
|---|---|---|---|
| **Resurrection as Revelation** | hub.html | Ephesians, 1 Cor, 1 Tim, 2 Tim | Pauline corpus theme |
| **Image of God** | hub.html | NT Trajectory, Royal/Priest/Prophet, ANE Background, Literary Design, Male & Female | 6-part canonical theme |
| **Luke-Acts Levitical Arc** | index.html | (single deep page with internal sections) | Inversion/typology subset |
| **Genesis 6–9 ⇄ 19 Inversion** | single page | (no parts — single page is sufficient) | Not all themes need parts |

---

## Migration Notes

There is no v5.8 or v4.1 thematic-study template — this is the first formal governance for thematic studies. Existing thematic study pages were governed informally by the character template even though the fit was poor. To align an existing thematic study with v5.9:

1. Bump `template-version` to `5.9.0`, set `study-type` to `thematic-study`
2. Swap stylesheet to `global-v3.css`
3. Add Reading Stamp, Mini-TOC, Star Dividers, Core Logic Quote, Takeaway
4. Audit body sections — replace any that use the wrong component (e.g., a Themes-style Mini-Card Grid that's actually a sequential argument should become Expansion Track or Timeline)
5. Add per-page section config JSON
6. Add Pathway Navigation if it's a part page
7. Verify each part has a Bridge section + cross-ref to next part

---

*Last Updated: April 2026*  
*Template Version: 5.9.0*  
*Documentation Version: 1.0*