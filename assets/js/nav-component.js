/**
 * Centralized Navigation Component
 * Path: /assets/js/nav-component.js
 * Purpose: Single source of truth for navigation across all pages
 * Version: 1.2.0 - Updated with cosmic eye logo image
 */

class NavigationComponent {
    constructor(options = {}) {
        this.options = {
            currentPage: options.currentPage || '',
            hubType: options.hubType || '', // 'characters', 'women', 'tanakh', 'new-covenant', 'thematic', 'methodology'
            ...options
        };
        
        this.navHTML = this.getNavigationHTML();
        this.init();
    }

    /**
     * Get the complete navigation HTML
     * Updated: Now uses cosmic eye logo image instead of inline SVG
     */
    getNavigationHTML() {
        return `
            <nav id="main-nav" role="navigation" aria-label="Main navigation">
                <div class="nav-container">
                    <a href="/" class="logo">
                        <div class="logo-icon">
                            <img src="/assets/images/color-cosmic-nav-logo.png" alt="Project Context Logo" />
                        </div>
                        <span class="logo-text">Project Context</span>
                    </a>
                    <ul class="nav-links" id="navLinks" aria-label="Main navigation">
                        <li><a href="/" class="${this.getActiveClass('home')}">Home</a></li>
                        <li class="dropdown">
                            <a href="/studies/" class="dropdown-toggle ${this.getActiveClass('studies')}">Studies</a>
                            <div class="dropdown-content">
                                <a href="/studies/characters/characters_hub.html" class="${this.getActiveClass('characters')}">Biblical Characters</a>
                                <a href="/studies/women/women-bible-hub.html" class="${this.getActiveClass('women')}">Women in the Bible</a>
                                <a href="/studies/tanakh/tanakh-hub.html" class="${this.getActiveClass('tanakh')}">Tanakh Studies</a>
                                <a href="/studies/new-covenant/new-covenant-hub.html" class="${this.getActiveClass('new-covenant')}">New Covenant Studies</a>
                                <a href="/studies/thematic/thematic-hub.html" class="${this.getActiveClass('thematic')}">Thematic Studies</a>
                            </div>
                        </li>
                        <li class="dropdown">
                            <a href="/resources/" class="dropdown-toggle ${this.getActiveClass('resources')}">Resources</a>
                            <div class="dropdown-content">
                                <a href="/studies/methodology/lltse-orientation-methodology.html" class="${this.getActiveClass('methodology')}">Methodology (LLTSE)</a>
                                <a href="/resources/discussion-guides/">Discussion Guides</a>
                                <a href="/resources/study-tools/">Study Tools</a>
                                <a href="/resources/downloads/">Downloads</a>
                            </div>
                        </li>
                        <li><a href="/about/" class="${this.getActiveClass('about')}">About</a></li>
                    </ul>
                    <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation" aria-expanded="false">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        `;
    }

    /**
     * Determine if a nav item should be active
     */
    getActiveClass(section) {
        const currentPage = this.options.currentPage;
        const hubType = this.options.hubType;
        
        // Home page
        if (section === 'home' && (currentPage === 'home' || currentPage === '')) {
            return 'active';
        }
        
        // Studies section (main dropdown)
        if (section === 'studies' && (
            currentPage.includes('studies') || 
            currentPage.includes('characters') || 
            currentPage.includes('women') || 
            currentPage.includes('tanakh') || 
            currentPage.includes('new-covenant') ||
            currentPage.includes('thematic') ||
            currentPage.includes('methodology')
        )) {
            return 'active';
        }
        
        // Specific hub types
        if (section === 'characters' && (hubType === 'characters' || currentPage.includes('characters'))) {
            return 'active';
        }
        if (section === 'women' && (hubType === 'women' || currentPage.includes('women'))) {
            return 'active';
        }
        if (section === 'tanakh' && (hubType === 'tanakh' || currentPage.includes('tanakh'))) {
            return 'active';
        }
        if (section === 'new-covenant' && (hubType === 'new-covenant' || currentPage.includes('new-covenant'))) {
            return 'active';
        }
        if (section === 'thematic' && (hubType === 'thematic' || currentPage.includes('thematic'))) {
            return 'active';
        }
        if (section === 'methodology' && (hubType === 'methodology' || currentPage.includes('methodology'))) {
            return 'active';
        }
        
        // Other sections
        if (section === 'resources' && currentPage.includes('resources')) {
            return 'active';
        }
        if (section === 'about' && currentPage.includes('about')) {
            return 'active';
        }
        
        return '';
    }

    /**
     * Initialize the navigation
     */
    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.render());
        } else {
            this.render();
        }
    }

    /**
     * Render the navigation into the DOM
     */
    render() {
        // Find existing nav or create container
        let existingNav = document.getElementById('main-nav');
        let navContainer;
        
        if (existingNav) {
            // Replace existing nav
            navContainer = existingNav.parentNode;
            existingNav.remove();
        } else {
            // Create new container at top of body
            navContainer = document.body;
        }
        
        // Insert the navigation HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.navHTML;
        const newNav = tempDiv.firstElementChild;
        
        navContainer.insertBefore(newNav, navContainer.firstChild);
        
        // Initialize mobile menu functionality
        this.initializeMobileMenu();
        
        // Initialize scroll effects
        this.initializeScrollEffects();
        
        // Initialize dropdown functionality
        this.initializeDropdowns();
    }

    /**
     * Initialize mobile menu (consolidated from mobile-menu.js)
     */
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (!menuToggle || !navLinks) return;
        
        let scrollPosition = 0;
        
        // Create overlay if it doesn't exist
        if (!document.querySelector('.mobile-menu-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-menu-overlay';
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', () => this.closeMobileMenu());
        }
        
        // Toggle menu
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (menuToggle.classList.contains('active')) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        });
        
        // Close menu when clicking nav links (not dropdown toggles)
        navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                // Don't close for hash links to current page
                const href = link.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('#')) {
                    this.closeMobileMenu();
                }
            });
        });
        
        // Handle dropdowns in mobile menu
        navLinks.querySelectorAll('.dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                if (window.matchMedia('(max-width: 768px)').matches) {
                    e.preventDefault();
                    const dropdown = toggle.parentElement;
                    dropdown.classList.toggle('active');
                }
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
        
        // Close on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && menuToggle.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    openMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        // Save scroll position
        this.scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        overlay?.classList.add('active');
        document.body.classList.add('menu-open');
        
        // Prevent background scrolling (iOS fix)
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${this.scrollPosition}px`;
        document.body.style.overflow = 'hidden';
        
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
    }

    closeMobileMenu() {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navLinks = document.getElementById('navLinks');
        const overlay = document.querySelector('.mobile-menu-overlay');
        
        if (!menuToggle.classList.contains('active')) return;
        
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.classList.remove('menu-open');
        
        // Restore background scrolling
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        document.body.style.overflow = '';
        
        // Restore scroll position
        if (this.scrollPosition) {
            window.scrollTo(0, this.scrollPosition);
        }
        
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }

    /**
     * Initialize scroll effects
     */
    initializeScrollEffects() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(() => {
                const nav = document.getElementById('main-nav');
                if (nav) {
                    if (window.scrollY > 100) {
                        nav.classList.add('scrolled');
                    } else {
                        nav.classList.remove('scrolled');
                    }
                }
            });
        }, { passive: true });
    }

    /**
     * Initialize dropdown functionality
     */
    initializeDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            let timeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                this.classList.add('active');
            });
            
            dropdown.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    this.classList.remove('active');
                }, 700); // Small delay before closing
            });
        });
    }

    /**
     * Update navigation for current page (can be called after page load)
     */
    updateCurrentPage(currentPage, hubType = '') {
        this.options.currentPage = currentPage;
        this.options.hubType = hubType;
        this.navHTML = this.getNavigationHTML();
        this.render();
    }
}

// Auto-initialize if no custom options needed
// Pages can override by calling initializeNavigation() with options before this runs
document.addEventListener('DOMContentLoaded', function() {
    // Only auto-init if no nav exists yet (allows manual override)
    if (!document.getElementById('main-nav')) {
        new NavigationComponent();
    }
});

// Auto-initialize function for easy use with options
window.initializeNavigation = function(options = {}) {
    return new NavigationComponent(options);
};

// Export for ES6 modules
export default NavigationComponent;