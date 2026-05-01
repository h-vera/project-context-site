# Biblical Character Profile Template Documentation
## Governance for Character Profile Pages

**Template Version:** 5.9.0  
**Documentation Version:** 5.0  
**Stylesheet:** `global-v3.css`  
**JavaScript:** `character-page-v5-9.js`  
**Template File:** `biblical-character-template-v5-9.html`

---

## What This Template Is For

This template governs **single-character profile pages** — pages whose subject is one biblical figure and whose job is to comprehensively introduce that figure (narrative, literary, theological, Christological).

### When this template is the right choice

- Character is the page's subject, not a vehicle for a theme
- Single page or part of a multi-page character study (Abraham, Moses, David, Noah, Daniel)
- Required sections (Overview / Narrative / Literary / Themes / ANE / Theology / Messianic / Application / Questions / Bibliography) all apply

### When to use a different template

- **Subject is a theme that traverses many characters** → use `thematic-study-template-v5-9.html` (Image of God, Resurrection as Revelation)
- **Page is a hub for a multi-page suite where pages are color-coded** → use `multi-page-suite-template-v5-9.html` (Noah hub, Daniel hub)
- **Page is a connections / arc-diagram page** → use a Connections Corner template (forthcoming; for now, study existing pages)
- **Page is a tool, workbench, or generative resource** → use a Tool/Workbench template (forthcoming; Sermon Builder, Practice Lab pattern)

---

## Quick Start Decision Matrix

### Character Type → Required & Optional Sections

| Type | Required Sections | Recommended Optionals | Mobile Tabs |
|---|---|---|---|
| **Major Patriarch/Matriarch** | All core | All 5 enhancements + Second Temple | Auto-generated (5 max) |
| **Prophet** | All core | Wordplay, Enhanced Messianic, Second Temple if NT-quoted | Auto-generated |
| **King/Ruler** | All core | Covenant Context, Unique Aspects | Auto-generated |
| **Judge** | All core | Eden Connections | Auto-generated |
| **Priest** | All core | Covenant Context | Auto-generated |
| **NT Apostle/Disciple** | All core | Enhanced Messianic crucial | Auto-generated |
| **Woman** | All core | Songs (if applicable), often all 5 enhancements | Auto-generated |
| **Minor Character** | Core only | Usually none | Auto-generated |

### Complexity Assessment

- **SIMPLE** (1–2 chapters) → core sections only, no enhancements
- **MODERATE** (3–5 chapters) → all required + 1–2 enhancements
- **COMPLEX** (6+ chapters) → all required + 3–5 enhancements
- **BOOK-SPANNING** → use multi-page suite template instead

### Essential Metadata

```html
<meta name="character-gender"  content="[male/female]">
<meta name="profile-type"      content="[single-page/multi-page]">
<meta name="character-id"      content="[character-id]">
<meta name="book-id"           content="[book-id]">
<meta name="template-version"  content="5.9.0">
<meta name="study-type"        content="character-study">
<meta name="page-category"     content="biblical-character">
```

---

## Required Sections (no exceptions)

Every character profile MUST have these nine sections. The mobile tabs auto-generate from this list, the bibliography assumes them, the QA checklist requires them.

| # | Section | ID | Component |
|---|---|---|---|
| 1 | **Overview** | `#overview` | `.theology-card` + `.meta` + `.tag` |
| 2 | **Narrative Journey** | `#narrative` | `.theology-card` + `.timeline.stagger-children` |
| 3 | **Literary Context** | `#literary-context` | `.mini-card-grid` (top-level, NOT nested in card) |
| 4 | **Themes** | `#themes` | `.mini-card-grid` (top-level, 4–6 cards) |
| 5 | **ANE Context** | `#ane-context` | `.theology-card` + `.grid-2` |
| 6 | **Biblical Theology** | `#biblical-theology` | `.theology-card` + `.pattern-summary` |
| 7 | **Messianic Trajectory** | `#messianic` | `.theology-card` + `.timeline` |
| 8 | **Application** | `#application` | `.theology-card` + `.qa-pills` |
| 9 | **Study Questions** | `#questions` | `.theology-card` + `.qa-pills` |
| 10 | **Bibliography** | `#bibliography` | `.bibliography-section` (Enhanced is default) |

Plus framing elements above and around the section stack:

- **Reading Time + TL;DR Stamp** (NEW in v5.9) — between breadcrumbs and title
- **Mini-TOC Pill Bar** (NEW in v5.9) — between title and Section 1
- **Core Logic Quote** — once per page, after Overview
- **Star Dividers** (NEW in v5.9) — between major sections
- **Cross-references** — single consolidated `.theology-card` near end
- **One-Line Takeaway** — once per page, just before Bibliography

---

## Optional Enhancement Sections

Add when the criteria are met. Major characters: 3–5 of these. Minor characters: 0.

### Eden Connections (`#eden`)
**Include when:** character has clear creation/fall/redemption parallels (New Adam/Eve typology, garden imagery, seed promise advancement).

### Hebrew/Greek Wordplay (`#wordplay`)
**Include when:** 3+ significant linguistic patterns are present in the character's narrative. Use `.word-study` cards inside a `.grid-2`.

### Covenant Context (`#covenant`)
**Include when:** character is an active covenant participant (international treaties, clan alliances, marriage covenants, personal covenants with God).

### Unique Aspects (`#unique`)
**Include when:** character has 5+ distinctive features ("only," "first to," "unprecedented," etc.).

### Second Temple & Jewish Sources (`#second-temple`)
**Include when:** NT references draw from Jewish interpretive traditions that aren't in the OT itself.

| Character | NT Passage | Why |
|---|---|---|
| Sarah / Hagar | Gal 4:21–31 | Allegorical interpretation tradition |
| Abraham | Rom 4, Heb 11 | Faith paradigm development |
| Moses | Jude 9 | Assumption of Moses |
| Enoch | Jude 14–15 | 1 Enoch quotation |
| Adam | Rom 5, 1 Cor 15 | Corporate representative theology |
| David | Multiple | Son of Man + Psalm 110 |

### Songs (`#songs`)
**Include for:** Miriam (Ex 15:20–21), Deborah (Judg 5), Hannah (1 Sam 2:1–10), Mary (Luke 1:46–55).
Use `.song-link` to the dedicated song page.

---

## Component Governance — What Goes Where

This is the section that didn't exist in v4.1 and matters most in v5.9. Stop using `.theology-card` as the universal wrapper. Use the right component for the right job.

### Themes section

- **REQUIRED:** top-level `.mini-card-grid` with 4–6 `.mini-card` items
- **FORBIDDEN:** nested `.grid-3` inside a `.theology-card` (this was the v5.8.1 pattern; it's wrong)
- **Why:** Mini-Card Grid is the component built for "4–6 short equal-weight concepts." Theology Card is for "one concept with paragraph treatment." Themes is the former.

### Literary Context section

- **REQUIRED:** top-level `.mini-card-grid` with 4 `.mini-card` items (Position / Patterns / Function / Techniques)
- **FORBIDDEN:** wrapping the four panels in a `.theology-card`
- **Closing insight:** use `.key-insight` for "here's what to notice." Use `.critical-distinction` only when correcting a misreading.

### Application section

- **Personal/Community split:** `.grid-2` of two `.panel` cards
- **Reflection Points:** `.qa-pills` with `<details class="qa-pill">` per question
- **FORBIDDEN:** `<ol>` of reflection points (was the v5.8.1 pattern)

### Study Questions section

- **REQUIRED:** `.qa-pills` (accordion). Each question is one `.qa-pill`.
- **DEPRECATED:** `.question-list <ol>` — kept in CSS for back-compat with old pages; not for new pages
- **Why:** the accordion is more usable on mobile and lets each question carry a discussion-guidance body without inflating the page

### Biblical Theology section

- **Closing synthesis:** `.pattern-summary` (NOT a generic `.panel-highlight`)
- **Why:** Pattern Summary is the catalog component for end-of-section structural synthesis. The v5.8.1 pattern of inventing a `.panel-highlight` class was an anti-pattern.

### Major Chiastic Structure (optional)

- **For ≤5 pairs:** `.chiasm-card` + `.chiasm-structure` (vertical indent ladder)
- **For 5+ pairs:** Chiastic Two-Column with Center Pivot (catalog component, not yet in template)
- **NEVER:** put a chiasm with 5+ pairs in the vertical ladder — readers can't see what mirrors what

### Single-verse pivot

- Use `.pivot-box` when there's one verse that marks the structural center of a chiasm or narrative
- Different from `.key-insight` (reader help) and `.core-logic-quote` (page thesis) — see Component Selection Matrix below

### Page closer

- **Once per page:** `.takeaway` (`<p class="takeaway">`)
- **Once per page:** `.core-logic-quote` (typically near top, after Overview)
- These are different: Core Logic = thesis (what the page argues); Takeaway = upshot (what the reader does with it)

---

## Component Selection Matrix

| If you need to show… | Use | Don't use |
|---|---|---|
| 4–6 short equal-weight concepts | `.mini-card-grid` | `.grid-3` inside `.theology-card` |
| One concept with paragraph treatment | `.theology-card` | `.mini-card` |
| Reader-help "here's what to notice" | `.key-insight` | `.critical-distinction` |
| Correction of common misreading | `.critical-distinction` | `.key-insight` |
| Page's central thesis | `.core-logic-quote` | `.key-insight` or `.takeaway` |
| Practical upshot (page closer) | `.takeaway` | `.core-logic-quote` |
| End-of-section structural synthesis | `.pattern-summary` | generic `.panel` |
| Single-verse structural pivot | `.pivot-box` | `.scripture-quote` |
| Body scripture (1–4 lines) | `.scripture-quote` | `.pivot-box` |
| Hebrew/Greek deep dive | `.word-study` | `.theology-card` |
| FAQ-style discussion questions | `.qa-pills` | `<ol class="question-list">` |
| Sequential events with chronology | `.timeline` | bullet list |

---

## Anti-Patterns (Forbidden in v5.9)

These were tolerated or accidentally reinforced in v5.8.1. They're forbidden in v5.9.

1. **Decorative gradients on body content.** No gradients on tags, badges, buttons, pills, hover states, or any body element. Gradients live on heroes and signature glyphs only.
2. **`.animate-on-scroll` as a default class.** Removed from v5.9 markup. Animation is opt-in per element. The only allowed default-animated component is `.timeline.stagger-children`, where the stagger carries semantic weight.
3. **Stacking 3+ callouts in a row.** A section gets one of: Key Insight, Critical Distinction, Pattern Summary, Pivot Box, Core Logic Quote. Not three of them back-to-back.
4. **Wrapping equal-weight concepts in a Theology Card grid.** Use Mini-Card Grid.
5. **More than 3 fonts on a page.** The budget is Cormorant Garamond, DM Sans, JetBrains Mono. Hebrew and Greek don't count against the budget; they have their own fonts.
6. **Numbered section references in bibliography usage tags.** Use descriptive names ("Narrative Journey, Themes") not numbers ("Section 2, Section 4").
7. **Greek name fields for OT characters or Hebrew name fields for NT characters.** OT primary = Hebrew. NT primary = Greek. Cross-language references go in body text, not in metadata.
8. **Chiasm with 5+ pairs in the vertical ladder.** Use Two-Column with Center Pivot.
9. **`.bibliography-section` without `.enhanced`.** In v5.9 the enhanced styling IS the default — there is no non-enhanced variant. Don't add `.enhanced` (it's a no-op now).

---

## Section-by-Section Content Standards

### Overview
- **Hebrew/Greek field:** OT chars Hebrew only; NT chars Greek primary, Hebrew/Aramaic only if relevant to NT theology
- **Etymology:** root + suffix breakdown with theological significance
- **Tags:** 5–7 maximum; 2 marked `.tag.primary`, rest plain `.tag`
- **Summary:** 3–4 sentences; what the character is, where they appear, why they matter
- **Followed by:** Core Logic Quote (page thesis)

### Narrative Journey
- **Minimum events:** 4 for moderate, 2–3 for minor, 6+ for complex
- **Format:** `<strong>Title (Reference):</strong>` then 2–3 descriptive sentences
- **Hebrew/Greek terms:** include for emotionally or theologically pivotal moments
- **Closing:** one `.key-insight` identifying the narrative pattern

### Literary Context
- **Four mini-cards:** Position in Book, Literary Patterns, Character Function, Narrative Techniques
- **Minor chiasms (≤5 pairs not central):** mention inside Literary Patterns mini-card
- **Major chiasms:** separate `.chiasm-card` section
- **Closing:** one `.key-insight` for intertextual connections

### Themes
- **Card count:** exactly 4–6 mini-cards
- **Each mini-card:** title (theme name) + 2–3 sentences of textual support
- **Order:** most prominent theme first; group related themes adjacent

### ANE Context
- **Two-column structure:** ANE Parallels left, Biblical Distinctives right
- **Closing:** Critical Distinction if correcting misreading; otherwise Key Insight ("Cultural Bridge")

### Biblical Theology
- **Two-column:** Creation/Eden Echoes left, Fall Patterns right
- **Closing:** Pattern Summary box ("Redemption Through Crisis") — NOT a Panel

### Messianic
- **Format:** Timeline (consistent with Narrative Journey component choice)
- **Four required nodes:** Promise Advancement, Typological Pattern, Contrast & Fulfillment, NT Connection
- **NT connection:** must cite specific verses, not generic theological connection

### Application
- **Personal/Community:** two `.panel` cards in `.grid-2`
- **Reflection Points:** 3 `.qa-pill` items, each summary is a question

### Study Questions
- **Count:** 6–8 questions
- **Categories:** Observation, Literary, Theological, Patterns, Connections, Typology, Application, Community
- **Format:** `.qa-pill` per question; bold the category in the summary

### Bibliography
- **Minimum sources:**
  - Major characters: 15+
  - Moderate: 10+
  - Minor: 5+
- **Required categories:** Primary Sources, Major Commentaries, Literary & Narrative Analysis
- **Conditional categories:** Second Temple (if section present), ANE Context, Theological Studies, Journal Articles, Reference Works
- **Citation format:** Chicago Manual of Style 17th ed
- **Usage tags:** descriptive names only, not section numbers
- **NEW in v5.9:** Cite-this-study button at top of bibliography content (auto-generated by JS)

---

## Page-Level Section Config (NEW in v5.9)

The v5.8.1 system kept a flat sectionConfig of 200+ entries in `character-page.js` — every page added to it. v5.9 fixes this: each page declares its own.

```html
<script id="page-section-config" type="application/json">
[
  { "id": "overview",          "label": "Overview",   "priority": 1 },
  { "id": "narrative",         "label": "Journey",    "priority": 1 },
  { "id": "literary-context",  "label": "Literary",   "priority": 2 },
  { "id": "themes",            "label": "Themes",     "priority": 2 },
  { "id": "ane-context",       "label": "ANE",        "priority": 3 },
  { "id": "biblical-theology", "label": "Theology",   "priority": 2 },
  { "id": "messianic",         "label": "Messianic",  "priority": 3 },
  { "id": "application",       "label": "Apply",      "priority": 3 },
  { "id": "questions",         "label": "Questions",  "priority": 4 },
  { "id": "bibliography",      "label": "Sources",    "priority": 5 }
]
</script>
```

**Priority rules** (used when more than 5 sections exist and mobile tabs need to drop some):
- **1** — always shown (Overview, primary content)
- **2** — shown if room (most body sections)
- **3** — shown if room (secondary body sections)
- **4** — shown only if all 1–3 fit (Questions, supplementary)
- **5** — shown last (Bibliography, references)

If a page adds optional sections (Eden, Wordplay, etc.), append them to the config with priority 3–4.

---

## Pre-Publication Checklist

### Metadata & Structure
- [ ] `template-version` is `5.9.0`
- [ ] character-gender, profile-type, character-id, book-id set
- [ ] All `[bracketed]` placeholders replaced
- [ ] Body class includes `woman-profile` if female
- [ ] Page section config script present and matches actual sections

### Required Sections
- [ ] All 9 required sections present and substantial (no `[Lorem]` left)
- [ ] Section IDs match the page section config
- [ ] Reading Time + TL;DR Stamp filled in (TL;DR is hand-authored)
- [ ] Mini-TOC links to actual section IDs

### Component Governance
- [ ] Themes uses `.mini-card-grid` (NOT nested `.grid-3` in `.theology-card`)
- [ ] Literary Context uses `.mini-card-grid` (NOT nested in card)
- [ ] Application reflections use `.qa-pills` (NOT `<ol>`)
- [ ] Study Questions use `.qa-pills` (NOT `.question-list`)
- [ ] Biblical Theology closing uses `.pattern-summary` (NOT generic panel)
- [ ] At most one `.core-logic-quote` per page
- [ ] At most one `.takeaway` per page
- [ ] No 3+ stacked callouts in any single section

### Visual & Anti-Pattern
- [ ] No body-content gradients
- [ ] No `.animate-on-scroll` classes (removed in v5.9)
- [ ] Star Dividers between major sections (NOT `<hr>`)
- [ ] Three-font budget honored (Cormorant + DM Sans + JetBrains Mono)

### Content Quality
- [ ] Hebrew/Greek text in correct fields (OT = Hebrew primary, NT = Greek primary)
- [ ] Etymology breakdown explained
- [ ] All Scripture refs in abbreviated format
- [ ] Bibliography meets minimum source count for character complexity
- [ ] Citation usage tags use descriptive names, not section numbers

### Functional Verification
- [ ] Mobile tabs render at <768px (5 max, priority-sorted)
- [ ] Quick-nav sidebar dots render at ≥1400px
- [ ] Reading progress bar tracks scroll
- [ ] Cite-this-study button copies a Chicago/SBL citation
- [ ] All cross-refs link to existing pages
- [ ] No console errors

---

## Migration Notes — v5.8.1 → v5.9

If you're updating an existing character page from v5.8.1 to v5.9:

1. **Bump `template-version` meta** from 5.8.1 to 5.9.0.
2. **Swap stylesheet** from `global-v2.css` to `global-v3.css`. Drop the separate `mobile-tabs-v5-8.css` link — consolidated.
3. **Swap script** from `character-page-v5-8.js` to `character-page-v5-9.js`.
4. **Add page section config** `<script>` block before the script imports.
5. **Add Reading Time + TL;DR Stamp** between breadcrumbs and title.
6. **Add Mini-TOC Pill Bar** between title and Section 1.
7. **Convert Themes:** strip the outer `.theology-card`, replace the two `.grid-3` rows with one `.mini-card-grid` of 6 `.mini-card` items.
8. **Convert Literary Context:** strip outer `.theology-card`, promote the four `.panel` cards to `.mini-card-grid`.
9. **Convert Application reflections:** wrap the `<ol>` items in `.qa-pills` / `<details class="qa-pill">`.
10. **Convert Study Questions:** same treatment.
11. **Replace `.panel-highlight`** in Biblical Theology with `.pattern-summary`.
12. **Remove `.animate-on-scroll`** classes from all body cards. Keep only on `.timeline.stagger-children`.
13. **Replace `<hr class="section-divider">`** with `<hr class="star-divider" aria-hidden="true">`.
14. **Bibliography:** remove `.enhanced` modifier (it's the default now).
15. **Add Cite-this-study button** to bibliography content top.
16. **Add One-Line Takeaway** before bibliography if absent.

Existing pages don't HAVE to be migrated — `global-v2.css` continues to work. But new character pages MUST be on v5.9. Migrate existing pages opportunistically when you'd be touching them anyway.

---

## Common Pitfalls

| Pitfall | Why it's wrong | Fix |
|---|---|---|
| `.theology-card` wraps Themes | Mini-Card Grid is the right component | Promote to top-level `.mini-card-grid` |
| `<ol>` of reflection points | Q&A Pills are more usable on mobile | Convert to `.qa-pills` |
| Greek name in OT character meta | Wrong primary language | Use Hebrew; cross-language goes in body |
| Section number in usage tag | Not stable; sections renumber | Use descriptive name |
| Three callouts back-to-back | Emphasis-fatigue | Pick one per section |
| Gradient on `.tag.primary` | Body-content gradient anti-pattern | Solid `--page-accent` color |
| 200-line `sectionConfig` in JS | Doesn't scale | Use per-page `<script type="application/json">` |
| `<hr class="section-divider">` between sections | Generic, doesn't read editorial | `<hr class="star-divider">` |
| Cite-this-study button missing | Required in v5.9 | Add to bibliography content top |

---

## Excellence Indicators

A v5.9 character profile is excellent when:

1. **Component governance is unambiguous.** Every section uses the right component without nesting tricks. A reader scanning the source can tell what each section is for.
2. **The TL;DR works.** Someone reading only the TL;DR + Core Logic Quote + Takeaway gets the page's argument.
3. **The mobile experience matches the desktop one.** Same 5 tabs surface; same content density; nothing breaks below 500px.
4. **Bibliography usage tags are descriptive.** A reader who's curious about the literary analysis can find the sources without scanning the whole bibliography.
5. **The character speaks, not the template.** No `[bracketed]` placeholders survived; no boilerplate sentences from the template; the prose is specific to this character.

---

## Changelog

### Documentation v5.0 (April 2026) — paired with template v5.9.0
- Aligned with `global-v3.css` v3.1 (v2 saturated triad on pure white, plus magenta / indigo / teal additions; purple→rose gradients preserved on body components — the v2 signature look).
- New required components: Reading Time + TL;DR Stamp, Mini-TOC Pill Bar, Star Divider, Cite-this-study button, Page-level Section Config.
- New component governance section with explicit per-section requirements.
- Anti-patterns section moved from "common pitfalls" to enforced rules.
- Migration guide v5.8.1 → v5.9 added.
- Family of templates introduced — character (this doc), thematic, multi-page suite.

### Documentation v4.1 (December 2025) — paired with template v5.8.1
- Dynamic mobile navigation (auto-generated tabs, priority system).
- Last version of single-template approach.

(Earlier changelog preserved in `archive/biblical-character-readme-v4-1.md`.)

---

*Last Updated: April 2026*  
*Template Version: 5.9.0*  
*Documentation Version: 5.0*