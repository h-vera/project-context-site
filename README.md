# Project Context Website

This repository contains the source code for the **Project Context** website — a multi-page site that aims to make biblical teaching more accessible through contextual interpretation of Scripture.

## 🌐 Goal

To create a visually compelling, accessible website that introduces visitors to the mission and resources of Project Context, starting with a modern splash screen (landing page).

## ⚙️ Tools & Technologies

We're using:
- [ChatGPT (GPT-4-turbo)](https://chat.openai.com) for HTML/CSS generation and planning
- [Claude AI](https://claude.ai) for co-creation and editing
- HTML5 / CSS3 / JavaScript (for now — possibly React or Tailwind later)
- Hosting plan: AWS S3 + CloudFront (static site)
- GitHub for version control and collaboration

## 🖼️ Next Steps

- [x] Create GitHub repo
- [ ] Build splash page (index.html)
- [ ] Style it with responsive CSS
- [ ] Add site navigation for multi-page structure
- [ ] Include icons and visuals from user assets
- [ ] Host on AWS

## 🚧 In Progress

We’re currently designing the **splash screen (index page)** and defining the structure of the full site.

## 📂 Structure (Planned)
project-context-site/
├── index.html                     ← Splash screen / homepage
├── about.html
├── studies/
│   ├── hosea/
│   │   ├── hosea.html             ← Main Hosea page (renamed from index.html)
│   │   ├── structure.html
│   │   ├── hebrew-words.html
│   │   ├── literary-analysis.html
│   │   ├── theology.html
│   │   ├── timeline.html
│   │   ├── nt-usage.html
│   │   └── resources.html
│   └── evolution-of-satan/
│       └── index.html             ← Main page for this study (TBD content)
├── assets/
│   ├── images/
│   └── icons/
├── styles/
│   └── main.css
└── README.md
