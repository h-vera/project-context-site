/**
 * Structure Page Enhancements
 * Path: /assets/js/structure-enhancements.js
 * Purpose: Interactive enhancements for Hosea structure page
 * Specifically targets chapters 4-11 for improved readability
 * Version: 1.0.0
 * Dependencies: structure-styles.css
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CONFIGURATION
    // ============================================
    
    const config = {
        longChapters: [4, 5, 6, 7, 8, 9, 10, 11],
        keyVerses: {
            4: ['4:1-3', '4:6'],
            5: ['5:4', '5:15'],
            6: ['6:6'],
            7: ['7:1-7', '7:11'],
            8: ['8:7', '8:14'],
            9: ['9:10', '9:17'],
            10: ['10:12', '10:13'],
            11: ['11:1', '11:8-9']
        },
        hebrewTranslations: {
            'חֶסֶד': 'steadfast love',
            'יָדַע': 'to know',
            'שׁוּב': 'return/repent',
            'רִיב': 'lawsuit/controversy',
            'דַּעַת אֱלֹהִים': 'knowledge of God',
            'זָנָה': 'to play the harlot',
            'רַחֲמִים': 'compassion/mercy',
            'אֶפְרַיִם': 'Ephraim',
            'יִשְׂרָאֵל': 'Israel',
            'בְּרִית': 'covenant',
            'תּוֹרָה': 'law/instruction',
            'נָבִיא': 'prophet',
            'כֹּהֵן': 'priest',
            'מִזְבֵּחַ': 'altar',
            'בַּעַל': 'Baal/master'
        }
    };
    
    // ============================================
    // ENHANCE LONG CHAPTERS (4-11)
    // ============================================
    
    function enhanceLongChapters() {
        config.longChapters.forEach(chapterNum => {
            // Find the chapter section (try multiple selectors)
            const chapterSection = 
                document.querySelector(`.chapter-section:has(.chapter-title:contains("${chapterNum}"))`) ||
                document.querySelector(`[id*="chapter-${chapterNum}"]`) ||
                document.querySelector(`.chapter-${chapterNum}`) ||
                document.querySelector(`#chapter-${chapterNum}`);
            
            if (!chapterSection) {
                console.log(`Chapter ${chapterNum} section not found`);
                return;
            }
            
            const chapterContent = chapterSection.querySelector('.chapter-content');
            if (!chapterContent) {
                console.log(`Chapter ${chapterNum} content not found`);
                return;
            }
            
            // Add dense content marker
            chapterContent.classList.add('dense-content');
            
            // Get all verse groups in this chapter
            const verseGroups = chapterContent.querySelectorAll('.verse-group');
            console.log(`Found ${verseGroups.length} verse groups in chapter ${chapterNum}`);
            
            // Process each verse group
            verseGroups.forEach((group, index) => {
                // Add staggered animation
                group.style.animationDelay = `${index * 0.05}s`;
                
                // Insert visual divider every 3rd verse group
                if ((index + 1) % 3 === 0 && index < verseGroups.length - 1) {
                    const divider = document.createElement('div');
                    divider.className = 'chapter-divider';
                    group.insertAdjacentElement('afterend', divider);
                }
                
                // Mark key verses
                markKeyVerses(group, chapterNum);
                
                // Add content type classes
                addContentTypeClasses(group);
            });
            
            // Add mini navigation for chapters with 5+ verse groups
            if (verseGroups.length > 5) {
                addChapterNavigation(chapterContent, verseGroups, chapterNum);
            }
            
            // Add progress bar for chapters with 8+ verse groups
            if (verseGroups.length > 8) {
                addProgressBar(chapterContent);
            }
            
            // Create collapsible sections for dense content
            createCollapsibleSections(chapterContent);
        });
    }
    
    // ============================================
    // MARK KEY VERSES
    // ============================================
    
    function markKeyVerses(verseGroup, chapterNum) {
        const verseRef = verseGroup.querySelector('.verse-ref');
        if (!verseRef) return;
        
        const refText = verseRef.textContent.trim();
        const keyVersesList = config.keyVerses[chapterNum];
        
        if (keyVersesList && keyVersesList.some(key => refText.includes(key))) {
            verseGroup.classList.add('key-verse');
        }
    }
    
    // ============================================
    // ADD CONTENT TYPE CLASSES
    // ============================================
    
    function addContentTypeClasses(verseGroup) {
        const verseContent = verseGroup.querySelector('.verse-content');
        if (!verseContent) return;
        
        const contentText = verseContent.textContent.toLowerCase();
        
        // Check for different content types
        if (contentText.match(/judgment|punishment|wrath|destroy|perish/)) {
            verseGroup.classList.add('judgment');
        } else if (contentText.match(/restoration|restore|promise|heal|return/)) {
            verseGroup.classList.add('restoration');
        } else if (contentText.match(/prophecy|oracle|thus says|declares/)) {
            verseGroup.classList.add('prophecy');
        } else if (contentText.match(/lord|yhwh|god says|divine/)) {
            verseGroup.classList.add('divine-speech');
        }
        
        // Also check sub-points for content types
        const subPoints = verseGroup.querySelectorAll('.sub-point');
        subPoints.forEach(point => {
            const pointText = point.textContent.toLowerCase();
            if (pointText.match(/judgment|punishment|wrath/)) {
                point.classList.add('judgment');
            } else if (pointText.match(/promise|restoration|heal/)) {
                point.classList.add('promise');
            } else if (pointText.match(/historical|past|days of/)) {
                point.classList.add('historical');
            }
        });
    }
    
    // ============================================
    // ADD CHAPTER NAVIGATION
    // ============================================
    
    function addChapterNavigation(chapterContent, verseGroups, chapterNum) {
        const nav = document.createElement('div');
        nav.className = 'chapter-nav';
        nav.innerHTML = '<h5>Quick Jump</h5>';
        
        // Create navigation items for major sections (every 3 verses)
        const sectionsCount = Math.ceil(verseGroups.length / 3);
        
        for (let i = 0; i < sectionsCount; i++) {
            const startIndex = i * 3;
            const verseGroup = verseGroups[startIndex];
            if (!verseGroup) continue;
            
            const verseRef = verseGroup.querySelector('.verse-ref');
            if (!verseRef) continue;
            
            // Create unique ID for this section
            const sectionId = `verse-${chapterNum}-section-${i}`;
            verseGroup.id = sectionId;
            
            // Create navigation link
            const navItem = document.createElement('a');
            navItem.className = 'chapter-nav-item';
            navItem.href = `#${sectionId}`;
            navItem.textContent = verseRef.textContent;
            
            // Add click handler for smooth scrolling
            navItem.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(sectionId);
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                    
                    // Update active state
                    nav.querySelectorAll('.chapter-nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
            
            nav.appendChild(navItem);
        }
        
        // Insert navigation at the beginning of chapter content
        chapterContent.insertBefore(nav, chapterContent.firstChild);
    }
    
    // ============================================
    // ADD PROGRESS BAR
    // ============================================
    
    function addProgressBar(chapterContent) {
        const progressBar = document.createElement('div');
        progressBar.className = 'chapter-progress';
        chapterContent.insertBefore(progressBar, chapterContent.firstChild);
        
        // Update progress on scroll (if chapter content is scrollable)
        const updateProgress = () => {
            const scrollHeight = chapterContent.scrollHeight - chapterContent.clientHeight;
            if (scrollHeight > 0) {
                const scrollPercentage = (chapterContent.scrollTop / scrollHeight) * 100;
                progressBar.style.setProperty('--progress', scrollPercentage + '%');
            }
        };
        
        chapterContent.addEventListener('scroll', updateProgress);
        
        // Also update on window scroll if content isn't independently scrollable
        if (chapterContent.scrollHeight <= chapterContent.clientHeight) {
            window.addEventListener('scroll', () => {
                const rect = chapterContent.getBoundingClientRect();
                const totalHeight = chapterContent.offsetHeight;
                const visibleHeight = window.innerHeight;
                const scrolled = Math.max(0, -rect.top);
                const scrollPercentage = Math.min(100, (scrolled / (totalHeight - visibleHeight)) * 100);
                progressBar.style.setProperty('--progress', scrollPercentage + '%');
            });
        }
    }
    
    // ============================================
    // CREATE COLLAPSIBLE SECTIONS
    // ============================================
    
    function createCollapsibleSections(chapterContent) {
        const verseGroups = chapterContent.querySelectorAll('.verse-group');
        
        verseGroups.forEach(group => {
            const subPoints = group.querySelectorAll('.sub-point');
            
            // If there are more than 5 sub-points, make them collapsible
            if (subPoints.length > 5) {
                let currentSection = null;
                let sectionCount = 0;
                
                subPoints.forEach((point, index) => {
                    // Create new section every 4 sub-points
                    if (index % 4 === 0) {
                        currentSection = document.createElement('div');
                        currentSection.className = 'verse-subsection';
                        
                        const header = document.createElement('h5');
                        header.textContent = `Details ${++sectionCount}`;
                        header.addEventListener('click', function() {
                            currentSection.classList.toggle('collapsed');
                        });
                        
                        currentSection.appendChild(header);
                        point.parentNode.insertBefore(currentSection, point);
                    }
                    
                    // Move sub-point into current section
                    if (currentSection) {
                        currentSection.appendChild(point);
                    }
                });
            }
        });
    }
    
    // ============================================
    // ENHANCE HEBREW TEXT
    // ============================================
    
    function enhanceHebrewText() {
        // Find all Hebrew text elements
        const hebrewElements = document.querySelectorAll('.hebrew, span[class*="hebrew"]');
        
        hebrewElements.forEach(element => {
            const hebrewText = element.textContent.trim();
            
            // Add translation if available
            if (config.hebrewTranslations[hebrewText]) {
                element.setAttribute('data-translation', config.hebrewTranslations[hebrewText]);
                element.classList.add('hebrew-inline');
            }
            
            // Ensure proper RTL display
            if (!element.classList.contains('hebrew-inline')) {
                element.classList.add('hebrew-inline');
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLLING FOR INTERNAL LINKS
    // ============================================
    
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip if it's just "#"
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    // Calculate offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // ============================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ============================================
    
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    
                    // Update navigation if this is a marked section
                    if (entry.target.id && entry.target.id.includes('verse-')) {
                        updateActiveNavigation(entry.target.id);
                    }
                }
            });
        }, observerOptions);
        
        // Observe all verse groups
        const verseGroups = document.querySelectorAll('.verse-group');
        verseGroups.forEach(group => {
            // Set initial state for animation
            group.style.opacity = '0';
            group.style.transform = 'translateX(-20px)';
            group.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(group);
        });
    }
    
    // ============================================
    // UPDATE ACTIVE NAVIGATION
    // ============================================
    
    function updateActiveNavigation(sectionId) {
        const navItems = document.querySelectorAll('.chapter-nav-item');
        navItems.forEach(item => {
            if (item.getAttribute('href') === `#${sectionId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // INITIALIZE ALL ENHANCEMENTS
    // ============================================
    
    function init() {
        console.log('Initializing structure page enhancements...');
        
        // Run all enhancement functions
        enhanceLongChapters();
        enhanceHebrewText();
        setupSmoothScrolling();
        setupIntersectionObserver();
        
        console.log('Structure page enhancements complete!');
    }
    
    // Start initialization
    init();
    
    // ============================================
    // UTILITY FUNCTIONS
    // ============================================
    
    // Helper function to check if element contains text (for fallback selectors)
    function findChapterByTitle(chapterNum) {
        const allHeaders = document.querySelectorAll('.chapter-title, .chapter-header, h2, h3');
        for (let header of allHeaders) {
            if (header.textContent.includes(`Chapter ${chapterNum}`)) {
                return header.closest('.chapter-section, .chapter-content, section, div');
            }
        }
        return null;
    }
    
    // Export for potential external use
    window.structureEnhancements = {
        config: config,
        enhanceLongChapters: enhanceLongChapters,
        enhanceHebrewText: enhanceHebrewText
    };
});