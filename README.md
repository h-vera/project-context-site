# Project Context Website

This repository contains the source code for the **Project Context** website — a comprehensive biblical studies platform featuring contextual interpretation of Scripture, character profiles, and thematic studies.

## 🌐 Goal

To create a visually compelling, accessible website that makes biblical teaching more accessible and provides multiple resources for study, teaching, and group discussion:

### Study Resources
- **Contextual interpretation of Scripture** - Historical, cultural, and theological context
- **In-depth character profiles** - Men and women of the Bible with Hebrew/Greek insights
- **Thematic studies** - Cross-biblical theological explorations
- **Hebrew/Greek language insights** - Original language word studies and analysis

### Structured Editions
- **LLTSE (Literal-Literary Translation Structure Edition)** - Formatting methodology that visualizes rhetorical structure through indentation, color-coding, and visual hierarchy for study and teaching
- **Scroll Edition** - Complementary format that removes modern overlays (chapters, verses, headings) while preserving structure for immersive, continuous reading
- **Both editions** present the same translation formatted differently for different purposes

### Educational Materials
- **Translation Journals** - Documentation of translation decisions, lexical analysis, and structural choices
- **Commentaries** - In-depth biblical commentary and theological analysis
- **Discussion Guides** - Ready-to-lead group discussion materials with speaker notes and participant views, designed to help everyone explore biblical truths together

## ⚙️ Tools & Technologies

### Content Creation
- **Founder & Creator**: Henry Rivera
- **Primary Sources**: The Bible Project (Tim Mackie's teachings and classroom sessions)
- **Reference Database**: Comprehensive biblical scholarship books and commentaries
- **AI Co-creation Tools**: Claude AI & ChatGPT for content development and refinement

### Technical Stack
- **Frontend**: HTML5 / CSS3 / JavaScript (ES6+ modules)
- **Data Format**: JSON for dynamic content
- **Hosting**: AWS Amplify (static site)
- **Version Control**: GitHub
- **Biblical Languages**: SBL Hebrew/Greek fonts

## 📋 Character Profile Guidelines v4.1

### Template Version: 5.8.1 | Documentation Version: 4.1

**Template v5.8.1 Features:**
- **Dynamic mobile navigation** - Auto-generated tabs based on present sections (no manual configuration)
- **Smart prioritization** - Maximum 5 tabs with intelligent priority system
- **Swipe gestures** - Navigate between sections with touch gestures
- **Hide on scroll** - Mobile tabs hide on scroll down, show on scroll up
- Enhanced chiastic structure documentation
- Improved navigation accessibility (ARIA labels)
- Semantic bibliography structure
- Reading progress bar and back-to-top button
- Quick navigation sidebar
- Mobile-responsive design (44px touch targets)

### Name Field Guidelines

**Old Testament (Tanakh) Characters:**
- **Hebrew Names ONLY** - Use original Hebrew forms in meta fields
- Examples: אַבְרָהָם (Abraham), שָׂרָה (Sarah), הָגָר (Hagar)

**New Testament Characters:**
- **Greek Names ONLY** - Use original Greek forms as primary name in meta fields
- Examples: Ἰησοῦς (Jesus), Μαρία (Mary), Παῦλος (Paul)

### Version History
- **v5.8.1 (Current)** - Dynamic mobile navigation with auto-generation, smart prioritization, swipe gestures
- **v5.7** - Initial mobile navigation implementation
- **v5.5** - Added chiastic structure section, enhanced navigation accessibility
- **v5.4** - Fixed paths, improved hub integration, added metadata
- **v5.3** - Updated for projectcontext.org domain
- **v5.2** - Added UX enhancements: reading progress, quick nav
- **v4.1 (Current Docs)** - Complete documentation for v5.8 dynamic mobile features

## 📂 Directory Structure

```
project-context-site/
├── index.html                          ← Main landing page
├── about.html                          ← About page
├── README.md                           ← This file
│
├── studies/                            ← All study materials
│   ├── studies-overview.html           ← Studies hub page
│   │
│   ├── methodology/                    ← Study methodologies
│   │   └── lltse-orientation-methodology.html  ← LLTSE methodology guide
│   │
│   ├── new-covenant/                   ← New Testament / New Covenant studies
│   │   ├── new-covenant-hub.html      ← New Covenant hub page
│   │   ├── ephesians/                 ← Ephesians LLTSE editions
│   │   │   ├── ephesians-hub.html     ← Ephesians study hub
│   │   │   ├── ephesians-structured-edition.html  ← Structured Edition
│   │   │   └── ephesians-scroll-edition.html      ← Scroll Edition
│   │   └── timothy/                   ← 1 Timothy LLTSE editions
│   │       ├── 1-timothy-structured-edition.html  ← Structured Edition
│   │       ├── 1-timothy-scroll-edition.html      ← Scroll Edition
│   │       └── 1-timothy-translation-journal.html ← Translation Journal
│   │
│   ├── tanakh/                         ← Hebrew Bible/Old Testament
│   │   ├── tanakh-hub.html            ← Tanakh studies hub page
│   │   ├── neviim/                    ← Prophets
│   │   │   ├── minor-prophets/        ← Minor Prophets
│   │   │   │   ├── hosea/             ← Book of Hosea
│   │   │   │   │   ├── hosea.html     ← Main Hosea study page
│   │   │   │   │   ├── structure.html
│   │   │   │   │   ├── structure-overview.html
│   │   │   │   │   ├── structure-chiastic.html
│   │   │   │   │   ├── structure-detailed.html
│   │   │   │   │   ├── hebrew-words.html
│   │   │   │   │   ├── literary-analysis.html
│   │   │   │   │   ├── theology.html
│   │   │   │   │   ├── theology-covenant.html
│   │   │   │   │   ├── theology-contemporary.html
│   │   │   │   │   ├── theology-restoration.html
│   │   │   │   │   ├── theology-sin-judgment.html
│   │   │   │   │   ├── timeline.html
│   │   │   │   │   ├── nt-usage.html
│   │   │   │   │   └── resources.html
│   │   │   │   ├── amos/
│   │   │   │   │   └── amos.html      ← Main Amos study page
│   │   │   │   ├── joel/
│   │   │   │   │   └── joel.html      ← Main Joel study page
│   │   │   │   └── [other minor prophets]/
│   │   │   │       └── [book-name].html
│   │   │   └── [major prophets]/
│   │   └── [other divisions]/
│   │
│   ├── characters/                     ← Biblical character profiles
│   │   ├── characters_hub.html         ← Characters hub
│   │   ├── README.md                   ← Character profile tracker
│   │   ├── genesis/
│   │   │   ├── abraham/                ← Abraham (multiple pages)
│   │   │   │   ├── abraham.html        ← Main Abraham profile
│   │   │   │   ├── covenant.html       ← Abraham's covenant
│   │   │   │   ├── journey.html        ← Abraham's journey
│   │   │   │   └── legacy.html         ← Abraham's legacy
│   │   │   ├── eve/                    ← Eve (multiple pages)
│   │   │   │   ├── eve-overview.html   ← Main Eve profile
│   │   │   │   └── [additional pages]
│   │   │   ├── sarah.html              ← Complete profile (single page)
│   │   │   ├── hagar.html              ← Complete profile (single page)
│   │   │   ├── rebekah.html
│   │   │   └── [other characters].html
│   │   ├── exodus/
│   │   │   ├── moses/                  ← Moses (multiple pages likely)
│   │   │   │   ├── moses.html          ← Main Moses profile
│   │   │   │   ├── exodus-event.html
│   │   │   │   ├── wilderness.html
│   │   │   │   └── laws.html
│   │   │   ├── miriam.html
│   │   │   └── [other characters].html
│   │   ├── judges/
│   │   │   ├── deborah/                ← Deborah (multiple pages)
│   │   │   │   ├── deborah.html        ← Main Deborah profile
│   │   │   │   └── song-of-deborah.html ← Song of Deborah
│   │   │   ├── delilah.html           ← Complete profile (single page)
│   │   │   ├── jael.html
│   │   │   └── [other characters].html
│   │   ├── ruth/
│   │   │   └── ruth.html               ← Ruth profile
│   │   ├── samuel1/
│   │   │   └── hannah.html             ← Hannah profile
│   │   ├── esther/
│   │   │   └── esther.html             ← Esther profile
│   │   └── [other books]/
│   │       └── [character-name].html or [character-name]/
│   │
│   ├── women/                          ← Women's studies hub
│   │   ├── women-bible-hub.html        ← Women in the Bible hub page
│   │   ├── songs/                      ← Women's biblical songs
│   │   │   ├── deborah-song.html       ← Song of Deborah
│   │   │   ├── hannah-song.html        ← Song of Hannah
│   │   │   └── miriam-song.html        ← Song of Miriam
│   │   └── README.md                   ← Women profiles tracker
│   │
│   └── thematic/                       ← Thematic studies
│       ├── thematic-hub.html           ← Thematic studies hub
│       ├── evolution-of-satan/
│       │   └── satan-evolution.html    ← Main Satan study page
│       ├── image-of-god/               ← Comprehensive Image of God study
│       │   ├── image-of-god.html       ← Main study hub
│       │   ├── overview.html           ← Overview page
│       │   ├── genesis-1-2.html        ← Genesis foundations
│       │   ├── ane-background.html     ← Ancient Near East context
│       │   ├── royal-priest-prophet.html
│       │   ├── male-female-one-image.html
│       │   ├── literary-design.html
│       │   ├── hebrew-wordplay.html
│       │   ├── nt-trajectory.html
│       │   └── bibliography.html
│       └── [other themes]/
│           └── [theme-name].html
│
├── resources/                          ← Resource materials
│   ├── discussion-guides/              ← Discussion guides for groups
│   │   ├── index.html                 ← Discussion guides hub
│   │   ├── youth/                     ← Youth discussion guides
│   │   │   ├── wonderfully-made/      ← "Wonderfully Made" guide
│   │   │   └── incarnation/           ← "Why Did Jesus Become Human?" guide
│   │   └── family/                    ← Family discussion guides
│   ├── study-tools/                    ← Study tools
│   └── downloads/                      ← Downloadable resources
│
├── assets/
│   ├── css/
│   │   ├── global.css                  ← Main global styles
│   │   ├── global-v2.css              ← Updated global styles (v5.8 template compatible)
│   │   ├── mobile-tabs-v5-8.css       ← Dynamic mobile navigation styles
│   │   ├── characters-main.css         ← Character hub styles
│   │   ├── hub-base.css               ← Base hub styles
│   │   └── hub-thematic-v1.css        ← Thematic hub styles
│   ├── js/
│   │   ├── main.js                     ← Main JavaScript
│   │   ├── mobile-menu.js             ← Mobile menu handler
│   │   ├── character-page-v5-8.js     ← Character profile with dynamic tabs
│   │   ├── hub-core.js                ← Hub core module
│   │   ├── hub-common.js              ← Common hub functions
│   │   └── character-loader.js        ← Character data loader
│   ├── data/                          ← JSON data files
│   │   └── books/                      ← Character data by book
│   │       ├── genesis.json
│   │       └── [book-name].json
│   └── images/
│       ├── logos/
│       │   ├── color-cosmic-nav-logo.png       ← Navigation logo (74px desktop, 56px mobile)
│       │   └── color-cosmic-eye-logo-2.png     ← Hero logo (transparent PNG)
│       ├── icons/
│       ├── characters/                 ← Character images
│       │   └── [character-name]/
│       │       └── og-image.jpg
│       └── studies/
│           └── image-of-god/
│               └── og-image.jpg
│
└── templates/                          ← Development templates
    ├── biblical-character-template-v5-8-1.html  ← Current HTML template (v5.8.1)
    └── biblical-character-readme-v4-1.md        ← Template documentation (v4.1)
```

## 🗂️ Content Organization

### Book Studies (`/studies/tanakh/`)
- **Structure**: Organized by biblical division, then book subdirectory
- **URL Pattern**: `/studies/tanakh/[division]/[subdivision]/[book]/[book-name].html`
- **Example**: `/studies/tanakh/neviim/minor-prophets/hosea/hosea.html`
- Each book gets its own directory containing the main book file and supporting pages

### Character Profiles (`/studies/characters/`)
- **Structure**: Organized by biblical book, then character name
- **Single-page profiles**: Direct HTML file
  - URL Pattern: `/studies/characters/[book]/[character-name].html`
  - Example: `/studies/characters/genesis/sarah.html`
- **Multi-page profiles**: Character directory with multiple files
  - URL Pattern: `/studies/characters/[book]/[character-name]/[character-name].html`
  - Example: `/studies/characters/genesis/abraham/abraham.html`
- **Template Version**: v5.5 with chiastic structure support

### Women's Hub (`/studies/women/`)
- Special hub page highlighting all female biblical characters
- Links to individual profiles in `/studies/characters/`
- Women's songs in `/studies/women/songs/`
- Gender filtering via `filterGender: 'female'` in JavaScript

### Thematic Studies (`/studies/thematic/`)
- Cross-biblical thematic explorations
- Each theme gets its own directory
- Single or multi-page format

## 📊 Current Status

### ✅ Complete
- [x] GitHub repository created
- [x] Landing page (index.html) with cosmic branding
- [x] Navigation system with dropdown menus
- [x] Women in the Bible hub page (`women-bible-hub.html`)
- [x] Character profiles hub (`characters_hub.html`)
- [x] Tanakh studies hub (`tanakh-hub.html`)
- [x] Thematic studies hub (`thematic-hub.html`)
- [x] Character profiles: Sarah, Hagar, Delilah, Ruth, Hannah, Esther
- [x] Multi-page profiles: Eve, Abraham, Deborah
- [x] Hosea book study (14 pages)
- [x] Evolution of Satan study
- [x] Image of God study (9+ pages)
- [x] Mobile-responsive navigation
- [x] JavaScript module system for hubs
- [x] JSON data structure for character profiles
- [x] Character template v5.8.1 with dynamic mobile navigation
- [x] Documentation v4.1
- [x] Cosmic eye logo branding system
- [x] LLTSE methodology orientation page
- [x] Ephesians LLTSE (Structured Edition + Scroll Edition)
- [x] 1 Timothy LLTSE (Structured Edition + Translation Journal)
- [x] Discussion guides hub with multiple youth and family resources

### 🚧 In Progress
- [ ] Additional character profiles
- [ ] New Testament character profiles
- [ ] Additional book studies (Amos, Joel)
- [ ] Additional LLTSE books (expanding New Covenant coverage)
- [ ] Translation journals for completed LLTSE books
- [ ] Discussion guides expansion (more youth and family resources)
- [ ] Biblical commentaries
- [ ] Study tools development
- [ ] Migration of existing profiles to v5.8.1 template with dynamic mobile navigation

### 📝 Planned
- [ ] Search functionality across all content
- [ ] User accounts for saved studies
- [ ] React migration for dynamic content
- [ ] Advanced filtering for character profiles
- [ ] Interactive timeline features
- [ ] PDF export functionality
- [ ] Audio/video content integration

## 🔗 URL Structure & Navigation

### Primary Navigation
- **Home**: `/`
- **Studies Hub**: `/studies/studies-overview.html`
  - **Character Profiles**: `/studies/characters/characters_hub.html`
  - **Women's Hub**: `/studies/women/women-bible-hub.html`
  - **Tanakh Hub**: `/studies/tanakh/tanakh-hub.html`
  - **New Covenant Hub**: `/studies/new-covenant/new-covenant-hub.html`
  - **Thematic Hub**: `/studies/thematic/thematic-hub.html`
- **Resources**: `/resources/`
  - **LLTSE Methodology**: `/studies/methodology/lltse-orientation-methodology.html`
  - **Discussion Guides**: `/resources/discussion-guides/`
  - **Study Tools**: `/resources/study-tools/`
  - **Downloads**: `/resources/downloads/`
- **About**: `/about.html`

### Study Page URL Patterns
- **Character Profiles**: 
  - Single page: `/studies/characters/[book]/[name].html`
  - Multi-page: `/studies/characters/[book]/[name]/[name].html`
- **Book Studies**: `/studies/tanakh/[division]/[subdivision]/[book]/[book].html`
- **Thematic Studies**: `/studies/thematic/[theme]/[page].html`
- **Women's Songs**: `/studies/women/songs/[name]-song.html`
- **LLTSE Editions**:
  - Structured Edition: `/studies/new-covenant/[book]/[book]-structured-edition.html`
  - Scroll Edition: `/studies/new-covenant/[book]/[book]-scroll-edition.html`
  - Translation Journal: `/studies/new-covenant/[book]/[book]-translation-journal.html`
- **Discussion Guides**: `/resources/discussion-guides/[category]/[guide-name]/`

### Biblical Book Organization
Books are organized following the Hebrew Bible structure:
- **Torah** (Pentateuch)
- **Neviim** (Prophets)
  - Former Prophets
  - Major Prophets
  - Minor Prophets
- **Ketuvim** (Writings)

## 🎨 Design System

### Visual Identity - Cosmic Branding

**Cosmic Gradient (Hero Section):**
- Full spectrum gradient flowing 135deg from cool to warm:
  - `#3EE4FF` (cyan - top left)
  - `#4AA5E9` (soft blue)
  - `#5B6FD6` (blue-indigo)
  - `#6B4FD8` (indigo)
  - `#7B3FCA` (purple)
  - `#8B35B8` (magenta-purple)
  - `#B03A8A` (pink-magenta)
  - `#D04070` (rose)
  - `#E85060` (coral)
  - `#F06050` (orange-red)
  - `#FF7A4A` (warm orange - bottom right)

**Logo Assets:**
- **Navigation Logo**: `color-cosmic-nav-logo.png`
  - Desktop: 74px height
  - Mobile: 56px height
- **Hero Logo**: `color-cosmic-eye-logo-2.png`
  - Transparent PNG layered over CSS gradient
  - Max-width: 400px desktop, 300px mobile
  - Drop-shadow glow effects in cyan, purple, and orange

**Primary Colors:** 
- **Cosmic Cyan**: `#3EE4FF` (theme color, primary accent)
- **Cosmic Blue**: `#57A9FF`
- **Cosmic Indigo**: `#6B4FD8`
- **Deep Space Blue**: `#001B3A` (dark text on light backgrounds)
- **Dark**: `#0a0a0a`
- **Light**: `#ffffff`

**Button Gradients:**
- **Toned Cosmic Gradient** (Biblical Studies section):
  - `#5BC0D6` → `#6A9FD9` → `#7B6BBD` → `#8E7BB8`
  - White text with indigo box-shadow `rgba(107,107,189,0.2)`
  
**Legacy Accent Colors** (still used in some pages):
- Accent Blue: `#00b4d8` / `#0ea5e9`
- Accent Purple: `#7209b7`
- Accent Rose: `#e11d48`
- Accent Gold: `#d4af37`

### Typography
- **Body**: System fonts stack
- **Hebrew**: SBL Hebrew
- **Greek**: SBL Greek

### Component Classes
- `.theology-card` - Content cards
- `.study-card` - Profile preview cards
- `.character-card` - Character profile cards
- `.woman-card` - Women-specific cards
- `.chiasm-card` - Chiastic structure display (v5.5+)
- `.chiasm-structure` - Structure container (v5.5+)
- `.chiasm-line` - Individual chiasm lines (v5.5+)
- `.chiasm-center` - Chiastic pivot point (v5.5+)
- `.hero` - Hero sections with cosmic gradient
- `.hero-logo-img` - Cosmic eye logo with glow effects
- `.featured-tag` - Glassmorphism tag on hero
- `.hebrew` - Hebrew text (RTL)
- `.greek` - Greek text
- `.featured-grid` - Featured content grid
- `.nav-grid` - Navigation cards grid
- `.quick-links` - Quick navigation links
- `.dropdown` - Dropdown navigation
- `.mobile-menu-toggle` - Mobile menu button
- `.quick-nav-sidebar` - Quick navigation sidebar (v5.5+)
- `.reading-progress` - Reading progress bar (v5.5+)
- `.back-to-top` - Back to top button (v5.5+)
- `.mobile-section-tabs` - Auto-generated mobile navigation (v5.8+)
- `.tab-item` - Individual mobile tab (v5.8+)
- `.complexity-indicator` - Profile complexity display (v5.8+)

### JavaScript Modules
- `hub-core.js` - Core hub functionality
- `character-loader.js` - Dynamic character data loading
- `hub-common.js` - Shared hub utilities
- `mobile-menu.js` - Mobile navigation handler
- `character-page-v5-8.js` - Character profile enhancements with **dynamic mobile tab generation**
  - Auto-detects present sections
  - Smart prioritization (max 5 tabs)
  - Swipe gesture support
  - Hide/show on scroll
  - No manual configuration required

## 🚀 Technical Stack

### Frontend
- **HTML5/CSS3**: Semantic markup with modern CSS features
- **JavaScript ES6+**: Module-based architecture
- **Data Format**: JSON for character/book data
- **CSS Architecture**: Component-based stylesheets

### Features
- **Responsive Design**: Mobile-first approach, 44px touch targets
- **Progressive Enhancement**: Works without JavaScript
- **Accessibility**: ARIA labels, semantic HTML, skip links
- **Performance**: Lazy loading, optimized assets
- **UX Enhancements**: Reading progress, quick nav, smooth scrolling
- **PWA Support**: Web manifest for installable app experience

### Character Profile Features (v5.8.1)
- **Dynamic Mobile Navigation**: Auto-generated tabs based on actual content sections
  - Smart prioritization (max 5 tabs for usability)
  - Swipe gestures for section navigation
  - Hide on scroll down, show on scroll up
  - No manual configuration required
- **Metadata System**: Character-id, book-id, gender, profile-type, enhanced navigation context
- **Chiastic Analysis**: Optional literary structure documentation with visual formatting
- **Bibliography**: Expandable semantic structure with usage tags and notes
- **Navigation Suite**: 
  - Desktop: Quick sidebar with scroll-triggered dots
  - Mobile: Auto-generated tab bar with priority system
  - Breadcrumbs for contextual navigation
  - Dropdown menus for related content
- **Women's Features**: Song links, special body class, gender-specific metadata
- **Hub Integration**: JSON data compatibility for character hubs
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Lazy loading, scroll animations, reading progress tracking

### LLTSE Edition Features
- **Dual Format System**: Same translation presented as Structured Edition + Scroll Edition
- **Visual Hierarchy**: Indentation, color-coding, and spacing reveal rhetorical patterns
- **Structural Markers**: Triads, chiasms, parallelisms, doxologies, and creedal formulations
- **Reading Modes**: High contrast mode, focus mode, adjustable spacing
- **Interactive Features**: Collapsible sections, verse reference toggles, keyboard navigation
- **Translation Attribution**: Clear credit to translation source and LLTSE formatting
- **Translation Journals**: Verse-by-verse documentation of lexical and structural decisions

### Cosmic Branding Implementation
- **Hero Background**: CSS gradient matching logo colors + layered transparent PNG
- **Glow Effects**: Multi-layered drop-shadows (cyan, purple, orange)
- **Button Styling**: Toned-down cosmic gradient with hover effects
- **Navigation Logo**: 74px desktop / 56px mobile with auto-scaling

## 👥 Contributing

### Character Profiles
1. Check the relevant README tracker for status
2. Use character template v5.8.1 for new profiles
3. Follow the documentation in `biblical-character-readme-v4-1.md`
4. Maintain consistent URL structure
5. Update tracker READMEs when adding content
6. Test mobile responsiveness (44px touch targets)
7. Ensure Hebrew/Greek fonts display correctly
8. Include chiastic structures where applicable
9. Meet minimum bibliography requirements
10. Use cosmic branding colors for new pages
11. **Do not manually configure mobile tabs** - they auto-generate based on content sections
12. Verify dynamic mobile navigation works correctly on mobile devices

### LLTSE Editions
1. Follow LLTSE methodology documented in `/studies/methodology/lltse-orientation-methodology.html`
2. Create both Structured Edition and Scroll Edition for each book
3. Include proper translation attribution (source translator + LLTSE formatting by Project Context)
4. Use consistent color-coding for structural elements (triads, doxologies, creeds, etc.)
5. Implement accessibility features (high contrast mode, keyboard navigation)
6. Consider creating Translation Journal for original Project Context translations

### Discussion Guides
1. Create both speaker and participant versions
2. Include scripture references, discussion questions, and practical applications
3. Test with actual groups before publishing
4. Provide estimated time requirements
5. Make mobile-friendly and printable

## 📝 Documentation Files

### Site Documentation
- **Main README**: This file - overall site structure, cosmic branding, and product overview
- **Character Tracker**: `/studies/characters/README.md` - all character profiles
- **Women's Tracker**: `/studies/women/README.md` - women-specific profiles

### Templates & Guides
- **Character Template**: `/templates/biblical-character-template-v5-8-1.html` - Current HTML template with dynamic mobile navigation
- **Character Template Guide**: `/templates/biblical-character-readme-v4-1.md` - Comprehensive documentation for v5.8.1
- **LLTSE Methodology**: `/studies/methodology/lltse-orientation-methodology.html` - LLTSE formatting system guide

### Translation & Study Materials
- **Translation Journals**: Verse-by-verse documentation of translation decisions (e.g., 1 Timothy Translation Journal)
- **Discussion Guides**: Ready-to-lead materials with speaker notes and participant views

## 🚀 Deployment

Currently configured for static hosting on AWS Amplify.

### Deployment with AWS Amplify:
1. **Connect GitHub Repository**
   - Sign in to AWS Amplify Console
   - Click "New app" → "Host web app"
   - Choose GitHub and authorize
   - Select `project-context-site` repository
   - Select `main` branch

2. **Configure Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       build:
         commands: []
     artifacts:
       baseDirectory: /
       files:
         - '**/*'
   ```

3. **Deploy**
   - Review settings
   - Click "Save and deploy"
   - Amplify automatically deploys on each git push

### Benefits of AWS Amplify:
- Continuous deployment from GitHub
- Automatic HTTPS with SSL certificates
- Global CDN distribution
- Branch deployments for testing
- Custom domain support
- Built-in redirects and rewrites

## 📞 Contact

For questions or contributions, please open an issue in the GitHub repository.

---

*Last Updated: December 2025*  
*Version: 4.1*  
*Template Version: 5.8.1*  
*Documentation Version: 4.1*  
*Branding: Cosmic Eye v2.0*