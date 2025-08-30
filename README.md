# Project Context Website

This repository contains the source code for the **Project Context** website — a comprehensive biblical studies platform featuring contextual interpretation of Scripture, character profiles, and thematic studies.

## 🌐 Goal

To create a visually compelling, accessible website that makes biblical teaching more accessible through:
- Contextual interpretation of Scripture
- In-depth character profiles (men and women of the Bible)
- Thematic studies and theological explorations
- Hebrew/Greek language insights

## ⚙️ Tools & Technologies

- **Content Generation**: Claude AI & ChatGPT for co-creation
- **Frontend**: HTML5 / CSS3 / JavaScript (ES6+ modules)
- **Data Format**: JSON for dynamic content
- **Hosting**: AWS Amplify (static site)
- **Version Control**: GitHub
- **Biblical Languages**: SBL Hebrew/Greek fonts

## 📋 Character Profile Guidelines v3.8

### Template Version: 5.5 | Documentation Version: 3.8

**Template v5.5 Features:**
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
- **v5.5 (Current)** - Added chiastic structure section, enhanced navigation accessibility
- **v5.4** - Fixed paths, improved hub integration, added metadata
- **v5.3** - Updated for projectcontext.org domain
- **v5.2** - Added UX enhancements: reading progress, quick nav
- **v3.8 (Current Docs)** - Documents v5.5 chiastic analysis features

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
│   ├── study-tools/                    ← Study tools
│   └── downloads/                      ← Downloadable resources
│
├── assets/
│   ├── css/
│   │   ├── global.css                  ← Main global styles
│   │   ├── global-v2.css              ← Updated global styles (v5.5 template)
│   │   ├── characters-main.css         ← Character hub styles
│   │   ├── hub-base.css               ← Base hub styles
│   │   └── hub-thematic-v1.css        ← Thematic hub styles
│   ├── js/
│   │   ├── main.js                     ← Main JavaScript
│   │   ├── mobile-menu.js             ← Mobile menu handler
│   │   ├── character-page.js          ← Character profile functionality
│   │   ├── hub-core.js                ← Hub core module
│   │   ├── hub-common.js              ← Common hub functions
│   │   └── character-loader.js        ← Character data loader
│   ├── data/                          ← JSON data files
│   │   └── books/                      ← Character data by book
│   │       ├── genesis.json
│   │       └── [book-name].json
│   └── images/
│       ├── logos/
│       ├── icons/
│       ├── characters/                 ← Character images
│       │   └── [character-name]/
│       │       └── og-image.jpg
│       └── studies/
│           └── image-of-god/
│               └── og-image.jpg
│
└── templates/                          ← Development templates
    ├── biblical-character-template-v5-5.html    ← Current HTML template
    └── biblical-character-readme-v3-8.md        ← Template documentation
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
- [x] Landing page (index.html) with modern design
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
- [x] Character template v5.5 with chiastic analysis
- [x] Documentation v3.8

### 🚧 In Progress
- [ ] Additional character profiles
- [ ] New Testament character profiles
- [ ] Additional book studies (Amos, Joel)
- [ ] Discussion guides completion
- [ ] Study tools development
- [ ] Migration of existing profiles to v5.5 template

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
  - **Thematic Hub**: `/studies/thematic/thematic-hub.html`
- **Resources**: `/resources/`
  - Discussion Guides: `/resources/discussion-guides/`
  - Study Tools: `/resources/study-tools/`
  - Downloads: `/resources/downloads/`
- **About**: `/about.html`

### Study Page URL Patterns
- **Character Profiles**: 
  - Single page: `/studies/characters/[book]/[name].html`
  - Multi-page: `/studies/characters/[book]/[name]/[name].html`
- **Book Studies**: `/studies/tanakh/[division]/[subdivision]/[book]/[book].html`
- **Thematic Studies**: `/studies/thematic/[theme]/[page].html`
- **Women's Songs**: `/studies/women/songs/[name]-song.html`

### Biblical Book Organization
Books are organized following the Hebrew Bible structure:
- **Torah** (Pentateuch)
- **Neviim** (Prophets)
  - Former Prophets
  - Major Prophets
  - Minor Prophets
- **Ketuvim** (Writings)

## 🎨 Design System

### Visual Identity
- **Primary Colors**: 
  - Dark: `#0a0a0a`
  - Light: `#ffffff`
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
- `.chiasm-card` - Chiastic structure display (v5.5)
- `.chiasm-structure` - Structure container (v5.5)
- `.chiasm-line` - Individual chiasm lines (v5.5)
- `.chiasm-center` - Chiastic pivot point (v5.5)
- `.hero` - Hero sections
- `.hebrew` - Hebrew text (RTL)
- `.greek` - Greek text
- `.featured-grid` - Featured content grid
- `.nav-grid` - Navigation cards grid
- `.quick-links` - Quick navigation links
- `.dropdown` - Dropdown navigation
- `.mobile-menu-toggle` - Mobile menu button
- `.quick-nav-sidebar` - Quick navigation sidebar (v5.5)
- `.reading-progress` - Reading progress bar (v5.5)
- `.back-to-top` - Back to top button (v5.5)

### JavaScript Modules
- `hub-core.js` - Core hub functionality
- `character-loader.js` - Dynamic character data loading
- `hub-common.js` - Shared hub utilities
- `mobile-menu.js` - Mobile navigation handler
- `character-page.js` - Character profile enhancements (v5.5)

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

### Character Profile Features (v5.5)
- **Metadata System**: Character-id, book-id, gender, profile-type
- **Chiastic Analysis**: Optional literary structure documentation
- **Bibliography**: Semantic structure with expand/collapse
- **Navigation**: Quick sidebar, breadcrumbs, dropdown menus
- **Women's Features**: Song links, special body class
- **Hub Integration**: JSON data compatibility

## 👥 Contributing

1. Check the relevant README tracker for status
2. Use character template v5.5 for new profiles
3. Follow the documentation in `biblical-character-readme-v3-8.md`
4. Maintain consistent URL structure
5. Update tracker READMEs when adding content
6. Test mobile responsiveness (44px touch targets)
7. Ensure Hebrew/Greek fonts display correctly
8. Include chiastic structures where applicable
9. Meet minimum bibliography requirements

## 📝 Documentation Files

- **Main README**: This file - overall site structure
- **Character Tracker**: `/studies/characters/README.md` - all character profiles
- **Women's Tracker**: `/studies/women/README.md` - women-specific profiles
- **Template**: `/templates/biblical-character-template-v5-5.html` - Current HTML template
- **Template Guide**: `/templates/biblical-character-readme-v3-8.md` - Comprehensive documentation

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

*Last Updated: August 2025*  
*Version: 4.0*  
*Template Version: 5.5*  
*Documentation Version: 3.8*