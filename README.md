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
- **Frontend**: HTML5 / CSS3 / JavaScript (considering React migration)
- **Hosting**: AWS Amplify (static site)
- **Version Control**: GitHub
- **Biblical Languages**: SBL Hebrew/Greek fonts

## 📋 Character Profile Guidelines v3.3

### Section 1: Overview - Name Field Guidelines

**Old Testament (Tanakh) Characters:**
- **Hebrew Names ONLY** - Use original Hebrew forms in meta fields
- Examples: אַבְרָהָם (Abraham), שָׂרָה (Sarah), הָגָר (Hagar)

**New Testament Characters:**
- **Greek Names ONLY** - Use original Greek forms as primary name in meta fields
- Examples: Ἰησοῦς (Jesus), Μαρία (Mary), Παῦλος (Paul)

**Important:** Greek (LXX) names should NOT be included for Old Testament characters in meta fields.

### Version History
- **v3.3 (Current)** - Clarified naming conventions: Hebrew for OT, Greek for NT only
- **v3.2** - Enhanced complexity guidelines
- **v3.1** - Added thematic studies integration
- **v3.0** - Comprehensive template restructure

### Common Pitfalls
- **Including Greek (LXX) for OT Characters** - OT characters should only have Hebrew names
- Inconsistent transliteration standards
- Missing contextual connections
- Inadequate source attribution

### Changelog

#### Version 3.3 (Current)
- **Greek Field Clarification**: Removed all references to Greek (LXX) as optional for Old Testament characters
- **Naming Convention Update**: Established clear Hebrew-only policy for Tanakh characters
- **Documentation Update**: Updated all template examples to reflect new naming standards

## 📂 Directory Structure

```
project-context-site/
├── index.html                          ← Main landing page
├── about.html                          ← About page
├── README.md                           ← This file
│
├── studies/                            ← All study materials
│   ├── index.html                      ← Studies hub page
│   │
│   ├── tanakh/                         ← Hebrew Bible/Old Testament
│   │   ├── neviim/                     ← Prophets
│   │   │   ├── minor-prophets/         ← Minor Prophets
│   │   │   │   ├── hosea/              ← Book of Hosea
│   │   │   │   │   ├── hosea.html      ← Main Hosea study page
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
│   │   ├── index.html                  ← Characters hub
│   │   ├── README.md                   ← Character profile tracker
│   │   ├── genesis/
│   │   │   ├── abraham/                ← Abraham (multiple pages)
│   │   │   │   ├── abraham.html        ← Main Abraham profile
│   │   │   │   ├── covenant.html       ← Abraham's covenant
│   │   │   │   ├── journey.html        ← Abraham's journey
│   │   │   │   └── legacy.html         ← Abraham's legacy
│   │   │   ├── sarah.html             ← Complete profile (single page)
│   │   │   ├── hagar.html             ← Complete profile (single page)
│   │   │   ├── eve.html
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
│   │   └── [other books]/
│   │       └── [character-name].html or [character-name]/
│   │
│   ├── women/                          ← Women's studies hub
│   │   ├── index.html                  ← Women in the Bible hub page
│   │   └── README.md                   ← Women profiles tracker
│   │
│   └── thematic/                       ← Thematic studies
│       ├── evolution-of-satan/         
│       │   └── satan-evolution.html    ← Main Satan study page
│       └── [other themes]/
│           └── [theme-name].html
│
├── assets/
│   ├── css/
│   │   ├── main.css                    ← Global styles
│   │   ├── characters.css              ← Character profile styles
│   │   └── studies.css                 ← Study-specific styles
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── logos/
│       └── icons/
│
└── templates/                          ← Development templates
    ├── biblical-character-template-v5.html
    └── biblical-character-readme-v3-3.md
```

## 🗂️ Content Organization

### Book Studies (`/studies/tanakh/`)
- **Structure**: Organized by biblical division, then book subdirectory
- **URL Pattern**: `/studies/tanakh/[division]/[subdivision]/[book]/[book-name].html`
- **Example**: `/studies/tanakh/neviim/minor-prophets/hosea/hosea.html`
- Each book gets its own directory containing the main book file and supporting pages
- Main entry point is always `[book-name].html` (e.g., `hosea.html`, `amos.html`)

### Character Profiles (`/studies/characters/`)
- **Structure**: Organized by biblical book, then character name
- **Single-page profiles**: Direct HTML file
  - URL Pattern: `/studies/characters/[book]/[character-name].html`
  - Example: `/studies/characters/genesis/sarah.html`
- **Multi-page profiles**: Character directory with multiple files
  - URL Pattern: `/studies/characters/[book]/[character-name]/[character-name].html`
  - Example: `/studies/characters/genesis/abraham/abraham.html`
  - Supporting pages: `/studies/characters/judges/deborah/song-of-deborah.html`
- Characters with extensive content get their own directory

### Women's Hub (`/studies/women/`)
- Special hub page highlighting all female biblical characters
- Links to individual profiles in `/studies/characters/`
- Organized by Testament and biblical division (Torah, Prophets, Writings)

### Thematic Studies (`/studies/thematic/`)
- Cross-biblical thematic explorations
- Each theme gets its own directory
- Single or multi-page format

## 📊 Current Status

### ✅ Complete
- [x] GitHub repository created
- [x] Landing page (index.html) with modern design
- [x] Women in the Bible hub page
- [x] Character profiles: Sarah, Hagar, Delilah
- [x] Hosea book study (multi-page)
- [x] Evolution of Satan study

### 🚧 In Progress
- [ ] Directory restructuring for book studies
- [ ] Additional character profiles (see tracker READMEs)
- [ ] Studies hub page
- [ ] Navigation improvements
- [ ] Mobile responsiveness optimization

### 📝 Planned
- [ ] Men's character hub page
- [ ] Additional book studies
- [ ] Search functionality
- [ ] React migration for dynamic content
- [ ] User accounts for saved studies

## 🔗 URL Structure & Navigation

### Primary Navigation
- **Home**: `/`
- **Studies**: `/studies/`
  - Book Studies: `/studies/tanakh/[division]/[book]/`
  - Characters: `/studies/characters/`
  - Women's Hub: `/studies/women/`
  - Thematic: `/studies/thematic/[theme]/`
- **Resources**: `/resources/`
- **About**: `/about.html`
- **Contact**: `/contact.html`

### Biblical Book Organization
Books are organized following the Hebrew Bible structure:
- **Torah** (Pentateuch)
- **Neviim** (Prophets)
  - Former Prophets
  - Major Prophets
  - Minor Prophets
- **Ketuvim** (Writings)

## 🎨 Design Guidelines

### Visual Identity
- **Primary Colors**: 
  - Dark: `#0a0a0a`
  - Light: `#ffffff`
  - Accent Blue: `#00b4d8` / `#0ea5e9`
  - Accent Purple: `#7209b7`
  - Accent Rose: `#e11d48`

### Typography
- **Body**: System fonts stack
- **Hebrew**: SBL Hebrew
- **Greek**: SBL Greek

### Component Classes
- `.theology-card` - Content cards
- `.study-card` - Profile preview cards
- `.hero` - Hero sections
- `.hebrew` - Hebrew text (RTL)
- `.greek` - Greek text

## 👥 Contributing

1. Check the relevant README tracker for status
2. Use the character template for new profiles
3. Maintain consistent URL structure
4. Update tracker READMEs when adding content
5. Test mobile responsiveness
6. Ensure Hebrew/Greek fonts display correctly

## 📝 Documentation Files

- **Main README**: This file - overall site structure
- **Character Tracker**: `/studies/characters/README.md` - all character profiles
- **Women's Tracker**: `/studies/women/README.md` - women-specific profiles
- **Template Guide**: `/templates/biblical-character-readme-v3-3.md`

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
*Version: 3.3*