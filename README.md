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
│   ├── characters/                     ← Biblical character profiles
│   │   ├── index.html                  ← Characters hub
│   │   ├── README.md                   ← Character profile tracker
│   │   ├── genesis/
│   │   │   ├── abraham.html
│   │   │   ├── sarah.html             ← Complete profile
│   │   │   ├── hagar.html             ← Complete profile
│   │   │   ├── eve.html
│   │   │   ├── rebekah.html
│   │   │   └── [other characters].html
│   │   ├── exodus/
│   │   │   ├── moses.html
│   │   │   ├── miriam.html
│   │   │   └── [other characters].html
│   │   ├── judges/
│   │   │   ├── delilah.html           ← Complete profile
│   │   │   ├── deborah.html
│   │   │   ├── jael.html
│   │   │   └── [other characters].html
│   │   └── [other books]/
│   │       └── [character-name].html
│   │
│   ├── women/                          ← Women's studies hub
│   │   ├── index.html                  ← Women in the Bible hub page
│   │   └── README.md                   ← Women profiles tracker
│   │
│   ├── hosea/                          ← Book study: Hosea
│   │   ├── index.html                  ← Main Hosea study page
│   │   ├── structure.html
│   │   ├── hebrew-words.html
│   │   ├── literary-analysis.html
│   │   ├── theology.html
│   │   ├── timeline.html
│   │   ├── nt-usage.html
│   │   └── resources.html
│   │
│   └── evolution-of-satan/             ← Thematic study
│       └── index.html
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

### Character Profiles (`/studies/characters/`)
- **Structure**: Organized by biblical book, then character HTML file
- **URL Pattern**: `/studies/characters/[book]/[character-name].html`
- **Examples**: 
  - `/studies/characters/genesis/sarah.html`
  - `/studies/characters/judges/delilah.html`
  - `/studies/characters/1samuel/david.html`

### Women's Hub (`/studies/women/`)
- Special hub page highlighting all female biblical characters
- Links to individual profiles in `/studies/characters/`
- Organized by Testament and biblical division (Torah, Prophets, Writings)

### Book Studies (`/studies/[book-name]/`)
- Comprehensive studies of entire biblical books
- Multiple pages per study (structure, theology, etc.)

### Thematic Studies (`/studies/[theme-name]/`)
- Cross-biblical thematic explorations
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
  - Characters: `/studies/characters/`
  - Women's Hub: `/studies/women/`
  - Book Studies: `/studies/[book]/`
  - Thematic: `/studies/[theme]/`
- **Resources**: `/resources/`
- **About**: `/about.html`
- **Contact**: `/contact.html`

### Character Profile URLs
All character profiles follow this pattern:
- `/studies/characters/[biblical-book]/[character-name].html`

The Women's Hub (`/studies/women/`) provides an alternative entry point specifically for female characters, but all profiles live in the main characters directory as individual HTML files.

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

*Last Updated: [Current Date]*
*Version: 2.0*