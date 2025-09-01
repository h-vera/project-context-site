# Biblical Character Profile Template Documentation
## Complete Guide for Creating Seminary-Level Character Studies

### Template Version: 5.5 | Documentation Version: 3.8

## Overview
This template creates comprehensive, seminary-level biblical character profiles with consistent structure, professional presentation, and academic rigor. Template v5.5 introduces enhanced literary analysis capabilities through optional chiastic structure documentation while maintaining all improvements from previous versions.

## Version History
- **v5.5** (Current) - Added chiastic structure section, enhanced navigation accessibility, semantic bibliography
- **v5.4** - Fixed paths, improved hub integration, added metadata, enhanced mobile UX
- **v5.3** - Updated for projectcontext.org domain, improved mobile navigation
- **v5.2** - Added reading progress bar, back-to-top button, quick navigation sidebar
- **v3.8** (Current Docs) - Documents v5.5 chiastic analysis and enhanced literary structures
- **v3.7** - Documents v5.4 hub integration, metadata requirements, and path fixes
- **v3.6** - Documents v5.3 canonical URL requirements
- **v3.5** - Documents v5.2 UX enhancements and accessibility

## Quick Start Guide
1. **Select Character Type** - Use the character type checklist to identify your character
2. **Determine Complexity Level** - Assess narrative scope (1-2, 3-5, or 6+ chapters)
3. **Copy Template** - Use the HTML template file (v5.5)
4. **Set Metadata** - Configure character-id, book-id, gender, and profile-type
5. **Fill Core Content** - Replace all `[bracketed content]` with actual information
6. **Add Literary Analysis** - Include chiastic structures if present in the text
7. **Add Enhancement Sections** - Include relevant enhancements for complex characters
8. **Configure for Women** - Add song section and body class if applicable
9. **Verify Sources** - Ensure minimum bibliography requirements are met
10. **Test Integration** - Verify hub navigation and data attributes work
11. **Quality Check** - Use the pre-publication checklist

## New Features in v5.5

### Chiastic Structure Section (Optional)
A dedicated section for documenting chiastic literary patterns, positioned between Literary Context and Theological Themes:

```html
<!-- OPTIONAL: MAJOR CHIASTIC STRUCTURE (Add when applicable) -->
<div class="chiasm-card animate-on-scroll" id="major-chiasm">
  <h3 class="chiasm-title">
    <span class="section-icon">🔍</span> 
    Major Chiastic Structure (Optional)
  </h3>
  <div class="chiasm-structure">
    <div class="chiasm-line">A  [Opening movement]</div>
    <div class="chiasm-line indent-1">B  [Threat / trial]</div>
    <div class="chiasm-line indent-2">C  [Development]</div>
    <div class="chiasm-center">CENTER: [Theological pivot]</div>
    <div class="chiasm-line indent-2">C′ [Development mirrored]</div>
    <div class="chiasm-line indent-1">B′ [Resolution]</div>
    <div class="chiasm-line">A′ [Closure]</div>
  </div>
  <div class="significance">
    <h4>Literary Significance</h4>
    <p>[Explain how the structure frames the character's role and theology]</p>
  </div>
</div>
```

#### When to Include Chiastic Analysis
- Character narratives with clear parallel structures
- Stories with theological centers emphasized through literary structure
- Texts where Hebrew/Greek scholars have identified chiastic patterns
- Multi-chapter narratives with intentional literary framing

### Enhanced Navigation Accessibility
```html
<ul class="nav-links" id="navLinks" aria-label="Main navigation">
```
Improves screen reader navigation and WCAG compliance.

### Semantic Bibliography Structure
Replaced inline styles with semantic classes for better maintainability and consistent styling:
- `.bibliography-section`
- `.bibliography-header`
- `.bibliography-inner`
- `.bibliography-icon`
- `.bibliography-text`
- `.bibliography-title`
- `.bibliography-subtitle`
- `.bibliography-content`

## Comprehensive Profile Structure

### Profile Sections Overview

#### 1. **Metadata & Overview** ✅
Core identification and introductory information:
- Character Name (Hebrew/Greek with transliteration)
- Scripture References (abbreviated format)
- Role/Title classification
- Setting (temporal and geographical)
- Etymology and name meanings
- Character type badge
- Complexity indicator
- Tags for themes and characteristics
- Summary paragraph
- Theological significance statement

#### 2. **Narrative Journey** 📖
Chronological and thematic story progression:
- Timeline of major events with scripture citations
- Key life stages and transitions
- Significant interactions with other figures
- Turning points and narrative climaxes
- Pattern recognition across story arc

#### 3. **Literary Context & Structures** 📚
Analysis of narrative positioning and devices:
- **Position in Book** - Placement significance
- **Literary Patterns** - Repetitions, parallels, keywords
- **Character Function** - Narrative role analysis
- **Narrative Techniques** - Authorial presentation methods

#### 4. **Chiastic Structures** (NEW - Optional) 🔍
When applicable, document:
- **Major Chiasms** - Multi-chapter structures
- **Minor/Local Chiasms** - Pericope-level patterns
- **Chiastic Centers** - Theological pivot points
- **Literary Significance** - How structure enhances meaning

#### 5. **Theological Themes** ✝️
Major theological concepts revealed:
- Covenant significance
- Divine-human interaction patterns
- Attributes of God revealed
- Faith and doubt dynamics
- Judgment and mercy themes
- Messianic foreshadowing
- New Testament connections

#### 6. **Ancient Near Eastern Context** 🏺
Cultural and comparative analysis:
- **ANE Parallels**
  - Archaeological evidence
  - Literary parallels
  - Cultural practices
- **Biblical Distinctives**
  - Unique theological elements
  - Ethical advancements
  - Monotheistic innovations

#### 7. **Biblical Theology** 🌍
Creation-Fall-Redemption framework:
- **Eden Echoes** - Creation themes
- **Fall Patterns** - Sin manifestations
- **Redemption Through Crisis** - Divine intervention

#### 8. **Messianic Connections** ✨
Christological trajectory:
- Messianic promise advancement
- Typological patterns
- Old Testament foundations
- New Testament fulfillment

#### 9. **Biblical Connections Tables** 📊
Intertextual relationships:
- **Old Testament Intertext** - Cross-references and echoes
- **New Testament Intertext** - Quotations and allusions

#### 10. **Related Profiles** 🔗
Network of connected studies:
- Related character profiles
- Multi-page study links
- Gender-specific collections

#### 11. **Songs & Poetry** (Conditional) 🎵
For characters with biblical songs:
- Link to song analysis
- Liturgical significance
- Theological themes in poetry

#### 12. **Application & Reflection** 💭
Contemporary relevance:
- **Personal Applications** - Individual spiritual lessons
- **Community Applications** - Church and social implications
- **Contemporary Challenges** - Modern cultural engagement

#### 13. **Study Questions** ❓
Eight thought-provoking questions covering:
- Theological reflection
- Literary comprehension
- Cultural/historical understanding
- Christological connections

#### 14. **Bibliography & Sources** 📚
Academic references organized by:
- Primary sources (Hebrew/Greek texts)
- Academic commentaries
- Journal articles
- Specialized studies
- Chicago Manual of Style, 17th edition

## File Structure & Naming

### File Naming Convention
```
# Single-page profiles
/studies/characters/[book]/[character-name].html

# Multi-page profiles (main page)
/studies/characters/[book]/[character-name]/[character-name].html

# Women's songs (separate system)
/studies/women/songs/[name]-song.html
```

### Examples
```
/studies/characters/genesis/sarah.html               # Single-page
/studies/characters/genesis/abraham/abraham.html     # Multi-page main
/studies/characters/judges/deborah/deborah.html      # Multi-page with chiasm
/studies/women/songs/hannah-song.html               # Woman's song
```

## Required Metadata Configuration

### HTML Head Metadata
```html
<meta name="character-gender" content="[male/female]">
<meta name="profile-type" content="[single-page/multi-page]">
<meta name="character-id" content="[character-id]">
<meta name="book-id" content="[book-id]">
<meta name="template-version" content="5.5">
```

### Title Element Data Attributes
```html
<h2 id="character-title" class="section-title"
    data-character-id="[character-id]"
    data-book="[book-id]">
```

### Body Tag Configuration
```html
<!-- For male characters -->
<body class="character-profile" dir="ltr">

<!-- For female characters -->
<body class="character-profile woman-profile" dir="ltr">
```

## Literary Analysis Guidelines

### Identifying Chiastic Structures
Look for these indicators:
- **Inverted Parallelism** - A-B-C-C′-B′-A′ patterns
- **Central Pivot** - Theological or narrative climax at center
- **Keyword Repetition** - Matching vocabulary in parallel sections
- **Thematic Mirroring** - Concepts that reflect across the center

### Documenting Chiasms
1. **Label Each Level** - Use letters (A, B, C) with primes for returns (A′, B′, C′)
2. **Identify the Center** - Highlight the theological pivot point
3. **Explain Significance** - Describe how structure enhances meaning
4. **Cite Scholarship** - Reference academic sources identifying the pattern

### Common Chiastic Patterns in Biblical Narrative
- **Seven-Part Structure** - Common in Hebrew narrative
- **Five-Part Structure** - Typical of wisdom literature
- **Three-Part Structure** - Simple ABA′ patterns
- **Complex Nested** - Multiple chiasms within larger structures

## Women-Specific Features

### Biblical Women with Songs
Characters requiring song sections:
- **Miriam** (Exodus 15:20-21) - Song at the Sea
- **Deborah** (Judges 5) - Victory Song with Barak
- **Hannah** (1 Samuel 2:1-10) - Prayer of Thanksgiving
- **Mary** (Luke 1:46-55) - Magnificat
- **Elizabeth** (Luke 1:42-45) - Prophetic Blessing

### Song Section Implementation
```html
<div class="theology-card animate-on-scroll" id="songs">
  <h3>Songs & Poetry</h3>
  <p>
    <a href="/studies/women/songs/[name]-song.html" class="song-link">
      🎵 View [Character]'s Song
    </a>
  </p>
  <div class="key-insight">
    <strong>Liturgical Significance:</strong>
    [Brief description of the song's context and theological importance]
  </div>
</div>
```

## Quality Assurance Checklist

### Pre-Publication Verification

#### Metadata & Integration ✓
- [ ] All meta tags properly set (gender, profile-type, character-id, book-id)
- [ ] Template version set to "5.5"
- [ ] Data attributes on title element
- [ ] Body class includes `woman-profile` if female
- [ ] Body tag includes `dir="ltr"` attribute

#### Structure & Content ✓
- [ ] All core sections completed
- [ ] Chiastic structure included if applicable
- [ ] Literary analysis properly documented
- [ ] Theological themes comprehensively covered
- [ ] ANE context researched and presented

#### Navigation & Paths ✓
- [ ] Stylesheet uses relative path `/assets/css/global-v2.css`
- [ ] Navigation dropdown links correct
- [ ] Breadcrumbs include book anchor
- [ ] Cross-references use correct paths
- [ ] Song links follow proper pattern (if applicable)

#### Scripture & References ✓
- [ ] All scripture references use abbreviated format
- [ ] Hebrew/Greek properly displayed with Unicode
- [ ] Transliterations accurate
- [ ] Etymology explained clearly

#### Bibliography & Sources ✓
- [ ] Minimum source requirements met:
  - Major characters (6+ chapters): 15+ sources
  - Moderate characters (3-5 chapters): 10+ sources
  - Minor characters (1-2 chapters): 5+ sources
- [ ] Chicago Manual of Style formatting
- [ ] Primary sources included
- [ ] Recent scholarship represented

#### Accessibility & UX ✓
- [ ] All interactive elements meet 44px minimum
- [ ] ARIA labels present
- [ ] Skip link functional
- [ ] Quick navigation sidebar configured
- [ ] Reading progress bar implemented

## Hub Integration Requirements

### Character JSON Format
```json
{
  "id": "character-id",
  "name": "Character Name",
  "hebrew": "Hebrew Text",
  "gender": "male/female",
  "profilePath": "/studies/characters/[book]/[character].html",
  "references": ["Book Ch:V"],
  "meaning": "Name meaning",
  "summary": "Brief description",
  "tags": ["Role", "Theme"],
  "hasProfile": true,
  "multiPage": false,
  "hasSong": false,
  "hasChiasm": true  // New flag for v5.5
}
```

### Hub Display Features
- **hasProfile: false** - Shows as "Coming Soon"
- **multiPage: true** - Displays multi-page indicator
- **hasSong: true** - Shows song icon (women only)
- **hasChiasm: true** - Indicates literary structure analysis

## Testing Procedures

### Console Testing Script
```javascript
// Comprehensive v5.5 testing
console.log('=== Template v5.5 Verification ===');

// Metadata checks
console.log('Template Version:', document.querySelector('meta[name="template-version"]')?.content);
console.log('Gender:', document.querySelector('meta[name="character-gender"]')?.content);
console.log('Profile Type:', document.querySelector('meta[name="profile-type"]')?.content);

// Structure checks
console.log('Has Chiasm Section:', !!document.getElementById('major-chiasm'));
console.log('Navigation ARIA:', document.querySelector('.nav-links')?.getAttribute('aria-label'));

// Bibliography checks
console.log('Bibliography Classes:', document.querySelector('.bibliography-section') ? 'Semantic' : 'Missing');

// Accessibility
const touchTargets = document.querySelectorAll('.tag, button, a');
let smallTargets = 0;
touchTargets.forEach(el => {
  if (el.offsetHeight < 44) smallTargets++;
});
console.log('Touch Target Issues:', smallTargets);
```

### Manual Testing Checklist
1. [ ] Navigate from main hub - verify load
2. [ ] Navigate from women's hub (if female) - verify filter
3. [ ] Check chiastic structure display (if present)
4. [ ] Test quick navigation sidebar
5. [ ] Verify reading progress bar
6. [ ] Check mobile view (44px targets)
7. [ ] Test print view (content expansion)
8. [ ] Validate song link (if applicable)
9. [ ] Check bibliography expand/collapse
10. [ ] Verify breadcrumb navigation

## Common Implementation Patterns

### Complex Characters (Abraham, Moses, David)
- Use multi-page structure
- Include comprehensive chiastic analysis
- Document multiple literary structures
- Extensive bibliography (20+ sources)
- Multiple cross-references

### Moderate Characters (Sarah, Hannah, Ruth)
- Single-page profile
- Include chiasms if present
- Balance literary and theological sections
- Standard bibliography (10-15 sources)
- Key cross-references

### Minor Characters (Hagar, Tamar, Lydia)
- Single-page profile
- Focus on narrative role
- Emphasize theological significance
- Concise bibliography (5-10 sources)
- Essential cross-references

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Chiastic structure not displaying properly
**Solution:** Ensure all div classes are correct: `chiasm-card`, `chiasm-structure`, `chiasm-line`, `chiasm-center`

#### Issue: Greek text displaying incorrectly
**Solution:** Add `unicode-bidi: normal` to Greek text CSS

#### Issue: Bibliography not expanding
**Solution:** Verify `<details>` and `<summary>` tags properly nested

#### Issue: Navigation dropdown not working
**Solution:** Check that mobile-menu.js is loaded with `defer` attribute

#### Issue: Quick nav sidebar not highlighting
**Solution:** Ensure section IDs match `data-target` attributes

## Migration Guide from v5.4 to v5.5

### Required Updates
1. **Update template version** - Change to "5.5" in meta tag
2. **Add chiastic structure section** - Include after Literary Context if applicable
3. **Update navigation** - Add `aria-label="Main navigation"`
4. **Refactor bibliography** - Replace inline styles with semantic classes

### Optional Enhancements
1. Document additional literary structures
2. Expand pattern recognition analysis
3. Add comparative chiastic examples
4. Include scholarly citations for structures

## Advanced Literary Analysis

### Documenting Multiple Literary Structures
When a character's narrative contains multiple literary devices:

```html
<!-- Primary Chiasm -->
<div class="chiasm-card">
  <h3>Major Chiastic Structure (Chapters X-Y)</h3>
  <!-- Structure content -->
</div>

<!-- Secondary Patterns -->
<div class="theology-card">
  <h3>Additional Literary Patterns</h3>
  <div class="panel">
    <h4>Inclusio (Chapter X)</h4>
    <p>[Description of bookending]</p>
  </div>
  <div class="panel">
    <h4>Triadic Pattern (Episodes A, B, C)</h4>
    <p>[Description of three-fold structure]</p>
  </div>
</div>
```

### Integrating Literary and Theological Analysis
The chiastic structure should inform theological interpretation:
1. Identify theological themes at chiastic center
2. Connect parallel sections thematically
3. Show how structure emphasizes key messages
4. Link literary artistry to divine inspiration

## Resource Library

### Template Files
- `fullname-5-5.template` - Current HTML template
- `biblical-character-readme-v3-8.md` - This documentation
- `biblical-character-checklist-combined.md` - Implementation checklist
- `hub-core.js` - Hub functionality
- `character-loader.js` - JSON data management

### Academic Resources for Literary Analysis
- **Dorsey, David A.** *The Literary Structure of the Old Testament*
- **Welch, John W.** *Chiasmus in Antiquity*
- **Bailey, Kenneth E.** *Poet and Peasant* (NT literary structures)
- **Walsh, Jerome T.** *Style and Structure in Biblical Hebrew Narrative*

### Online Tools
- BibleHub Interlinear: https://biblehub.com/interlinear/
- STEP Bible: https://www.stepbible.org/
- Blue Letter Bible: https://www.blueletterbible.org/

---

## Changelog

### Version 3.8 (Current - August 2025)
- **Template v5.5 Integration:** Documents chiastic structure section
- **Enhanced Literary Analysis:** Comprehensive literary structure documentation
- **Accessibility Improvements:** ARIA navigation enhancements
- **Bibliography Refactor:** Semantic class structure
- **Expanded Guidelines:** Advanced literary analysis patterns

### Version 3.7 (October 2024)
- **Template v5.4 Integration:** Hub integration requirements
- **Metadata:** Required meta tags for hub compatibility
- **Path Fixes:** Corrected stylesheet and navigation paths

### Version 3.6
- **SEO & Canonical URLs:** Full domain paths required
- **Template v5.3:** Domain updates documented

### Version 3.5
- **Template v5.2 Updates:** UX enhancements documented
- **Accessibility:** Skip link and ARIA documentation

---

*Last Updated: August 28, 2025*  
*Template Version: 5.5*  
*Documentation Version: 3.8*