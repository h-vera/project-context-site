/**
 * Enhanced Navigation Component v2 - CLEANED UP
 * Path: /assets/js/nav-component-v2.js
 * Purpose: Centralized, performant navigation for all pages
 * Version: 2.1.0 - MAJOR CLEANUP
 * 
 * FIXES:
 * - Simplified initialization logic
 * - Fixed duplicate event listeners
 * - Removed redundant DOM manipulation
 * - Fixed mobile menu scroll lock issues
 * - Cleaned up error handling
 * - Simplified dropdown logic
 * - Fixed z-index conflicts
 * - Removed unused features
 */

class NavigationComponent {
  constructor(options = {}) {
    this.options = {
      currentPage: options.currentPage || '',
      hubType: options.hubType || '',
      mobileBreakpoint: options.mobileBreakpoint || 768,
      stickyOffset: options.stickyOffset || 100,
      ...options
    };
    
    this.state = {
      isMobile: window.innerWidth <= this.options.mobileBreakpoint,
      isMenuOpen: false,
      scrollPosition: 0,
      isInitialized: false
    };
    
    // Prevent multiple initialization
    if (document.hasAttribute('data-nav-initialized')) {
      console.warn('Navigation already initialized');
      return;
    }
    
    this.init();
  }
  
  // Navigation HTML template - CLEANED UP
  getNavigationHTML() {
    const { currentPage, hubType } = this.options;
    
    return `
      <div class="nav-container">
        <a href="/" class="logo" aria-label="Project Context Home">
          <svg class="logo-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="40" height="40" aria-hidden="true">
            <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <ellipse cx="50" cy="50" rx="25" ry="15" stroke="currentColor" stroke-width="3" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="#00b4d8"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
          <span class="logo-text">Project Context</span>
        </a>
        
        <ul class="nav-links" id="navLinks" role="menubar" aria-label="Main menu">
          <li role="none">
            <a href="/" role="menuitem" class="${this.isActive('home')}">
              Home
            </a>
          </li>
          
          <li class="dropdown" role="none">
            <a href="/studies/" 
               role="menuitem" 
               aria-haspopup="true" 
               aria-expanded="false"
               class="dropdown-toggle ${this.isActive('studies')}">
              Studies
            </a>
            <div class="dropdown-content" role="menu" aria-label="Studies submenu">
              <a href="/studies/characters/characters_hub.html" 
                 role="menuitem" 
                 class="${this.isActive('characters')}">
                Biblical Characters
              </a>
              <a href="/studies/women/women-bible-hub.html" 
                 role="menuitem" 
                 class="${this.isActive('women')}">
                Women in the Bible
              </a>
              <a href="/studies/tanakh/tanakh-hub.html" 
                 role="menuitem" 
                 class="${this.isActive('tanakh')}">
                Tanakh Studies
              </a>
              <a href="/studies/thematic/thematic-hub.html" 
                 role="menuitem" 
                 class="${this.isActive('thematic')}">
                Thematic Studies
              </a>
            </div>
          </li>
          
          <li class="dropdown" role="none">
            <a href="/resources/" 
               role="menuitem" 
               aria-haspopup="true" 
               aria-expanded="false"
               class="dropdown-toggle ${this.isActive('resources')}">
              Resources
            </a>
            <div class="dropdown-content" role="menu" aria-label="Resources submenu">
              <a href="/resources/discussion-guides/" role="menuitem">
                Discussion Guides
              </a>
              <a href="/resources/study-tools/" role="menuitem">
                Study Tools
              </a>
              <a href="/resources/downloads/" role="menuitem">
                Downloads
              </a>
            </div>
          </li>
          
          <li role="none">
            <a href="/about/" role="menuitem" class="${this.isActive('about')}">
              About
            </a>
          </li>
        </ul>
        
        <button class="mobile-menu-toggle" 
                id="mobileMenuToggle" 
                aria-label="Toggle navigation menu" 
                aria-expanded="false"
                aria-controls="navLinks">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      
      <div class="mobile-menu-overlay" aria-hidden="true"></div>
    `;
  }
  
  // Check if nav item should be active - SIMPLIFIED
  isActive(section) {
    const { currentPage, hubType } = this.options;
    const page = currentPage.toLowerCase();
    
    switch(section) {
      case 'home':
        return (page === 'home' || page === '' || page === '/') ? 'active' : '';
        
      case 'studies':
        return (page.includes('studies') || 
                page.includes('characters') || 
                page.includes('women') || 
                page.includes('tanakh') || 
                page.includes('thematic')) ? 'active' : '';
        
      case 'characters':
        return (hubType === 'characters' || page.includes('characters')) ? 'active' : '';
        
      case 'women':
        return (hubType === 'women' || page.includes('women')) ? 'active' : '';
        
      case 'tanakh':
        return (hubType === 'tanakh' || page.includes('tanakh')) ? 'active' : '';
        
      case 'thematic':
        return (hubType === 'thematic' || page.includes('thematic')) ? 'active' : '';
        
      case 'resources':
        return page.includes('resources') ? 'active' : '';
        
      case 'about':
        return page.includes('about') ? 'active' : '';
        
      default:
        return '';
    }
  }
  
  // Initialize navigation - SIMPLIFIED
  init() {
    if (this.state.isInitialized) return;
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.render());
    } else {
      this.render();
    }
  }
  
  // Render navigation - CLEANED UP
  render() {
    try {
      // Mark as initialized early to prevent duplicates
      document.setAttribute('data-nav-initialized', 'true');
      this.state.isInitialized = true;
      
      // Get or create nav element
      let nav = document.getElementById('main-nav');
      
      if (!nav) {
        nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
        
        // Insert at the beginning of body
        document.body.insertBefore(nav, document.body.firstChild);
      }
      
      // Set content
      nav.innerHTML = this.getNavigationHTML();
      
      // Initialize functionality
      this.setupEventListeners();
      this.setupScrollEffects();
      this.updateMobileState();
      
      console.log('Navigation component v2.1.0 initialized');
      
    } catch (error) {
      console.error('Error rendering navigation:', error);
      this.renderFallback();
    }
  }
  
  // Fallback navigation for error cases - SIMPLIFIED
  renderFallback() {
    let nav = document.getElementById('main-nav');
    
    if (!nav) {
      nav = document.createElement('nav');
      nav.id = 'main-nav';
      document.body.insertBefore(nav, document.body.firstChild);
    }
    
    nav.innerHTML = `
      <div class="nav-container">
        <a href="/" class="logo">Project Context</a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/studies/">Studies</a></li>
          <li><a href="/resources/">Resources</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
      </div>
    `;
  }
  
  // Set up event listeners - FIXED DUPLICATES
  setupEventListeners() {
    // Prevent multiple event listener setup
    if (document.hasAttribute('data-nav-events-setup')) {
      return;
    }
    document.setAttribute('data-nav-events-setup', 'true');
    
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!menuToggle || !navLinks) {
      console.warn('Navigation elements not found for event setup');
      return;
    }
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.toggleMobileMenu();
    });
    
    // Overlay click closes menu
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    }
    
    // Close menu on navigation
    navLinks.addEventListener('click', (e) => {
      const link = e.target.closest('a:not(.dropdown-toggle)');
      if (link) {
        const href = link.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('#')) {
          this.closeMobileMenu();
        }
      }
    });
    
    // Dropdown handling - SIMPLIFIED
    this.setupDropdowns();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeMobileMenu();
        this.closeAllDropdowns();
      }
    });
    
    // Window resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateMobileState();
        if (!this.state.isMobile) {
          this.closeMobileMenu();
        }
      }, 150);
    });
  }
  
  // Setup dropdown functionality - SIMPLIFIED
  setupDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      
      if (!toggle) return;
      
      // Desktop hover
      if (window.innerWidth > this.options.mobileBreakpoint) {
        let hoverTimeout;
        
        dropdown.addEventListener('mouseenter', () => {
          clearTimeout(hoverTimeout);
          this.openDropdown(dropdown);
        });
        
        dropdown.addEventListener('mouseleave', () => {
          hoverTimeout = setTimeout(() => {
            this.closeDropdown(dropdown);
          }, 200);
        });
      }
      
      // Mobile/keyboard click
      toggle.addEventListener('click', (e) => {
        if (this.state.isMobile) {
          e.preventDefault();
          this.toggleDropdown(dropdown);
        }
      });
      
      // Focus handling
      toggle.addEventListener('focus', () => {
        if (!this.state.isMobile) {
          this.openDropdown(dropdown);
        }
      });
    });
  }
  
  // Initialize scroll effects - SIMPLIFIED
  setupScrollEffects() {
    if (document.hasAttribute('data-nav-scroll-setup')) {
      return;
    }
    document.setAttribute('data-nav-scroll-setup', 'true');
    
    let rafId = null;
    const nav = document.getElementById('main-nav');
    
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          
          if (scrollY > this.options.stickyOffset) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          
          this.state.scrollPosition = scrollY;
          rafId = null;
        });
      }
    }, { passive: true });
  }
  
  // Update mobile state - SIMPLIFIED
  updateMobileState() {
    const wasMobile = this.state.isMobile;
    this.state.isMobile = window.innerWidth <= this.options.mobileBreakpoint;
    
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
      navLinks.setAttribute('aria-hidden', this.state.isMobile ? 'true' : 'false');
    }
    
    // If switching from mobile to desktop, close menu
    if (wasMobile && !this.state.isMobile && this.state.isMenuOpen) {
      this.closeMobileMenu();
    }
  }
  
  // Toggle mobile menu
  toggleMobileMenu() {
    if (this.state.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  // Open mobile menu - FIXED SCROLL LOCK
  openMobileMenu() {
    if (this.state.isMenuOpen) return;
    
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!menuToggle || !navLinks) return;
    
    // Store current scroll position
    this.state.scrollPosition = window.pageYOffset;
    this.state.isMenuOpen = true;
    
    // Update UI
    menuToggle.classList.add('active');
    navLinks.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('menu-open');
    
    // Lock scroll - FIXED METHOD
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.state.scrollPosition}px`;
    document.body.style.width = '100%';
    
    // Update ARIA attributes
    menuToggle.setAttribute('aria-expanded', 'true');
    navLinks.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'false');
  }
  
  // Close mobile menu - FIXED SCROLL RESTORE
  closeMobileMenu() {
    if (!this.state.isMenuOpen) return;
    
    const menuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    if (!menuToggle || !navLinks) return;
    
    this.state.isMenuOpen = false;
    
    // Update UI
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    
    // Restore scroll - FIXED METHOD
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Restore scroll position
    window.scrollTo(0, this.state.scrollPosition);
    
    // Update ARIA attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', this.state.isMobile ? 'true' : 'false');
    if (overlay) overlay.setAttribute('aria-hidden', 'true');
    
    // Close any open dropdowns
    this.closeAllDropdowns();
  }
  
  // Toggle dropdown - SIMPLIFIED
  toggleDropdown(dropdown) {
    const isOpen = dropdown.classList.contains('open');
    
    // Close all dropdowns first
    this.closeAllDropdowns();
    
    // Open this one if it wasn't open
    if (!isOpen) {
      this.openDropdown(dropdown);
    }
  }
  
  // Open dropdown
  openDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    dropdown.classList.add('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'true');
    }
  }
  
  // Close dropdown
  closeDropdown(dropdown) {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    
    dropdown.classList.remove('open');
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  }
  
  // Close all dropdowns
  closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }
  
  // Update navigation state
  updateState(newOptions) {
    Object.assign(this.options, newOptions);
    
    // Re-render navigation content
    const nav = document.getElementById('main-nav');
    if (nav) {
      nav.innerHTML = this.getNavigationHTML();
      // Re-setup dropdowns for new content
      this.setupDropdowns();
    }
  }
  
  // Cleanup method - IMPROVED
  destroy() {
    console.log('Destroying navigation component');
    
    // Close menu
    this.closeMobileMenu();
    this.closeAllDropdowns();
    
    // Remove navigation element
    const nav = document.getElementById('main-nav');
    if (nav) {
      nav.remove();
    }
    
    // Remove overlay
    const overlay = document.querySelector('.mobile-menu-overlay');
    if (overlay) {
      overlay.remove();
    }
    
    // Reset document attributes
    document.removeAttribute('data-nav-initialized');
    document.removeAttribute('data-nav-events-setup');
    document.removeAttribute('data-nav-scroll-setup');
    
    // Reset body styles
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Reset state
    this.state = {
      isMobile: false,
      isMenuOpen: false,
      scrollPosition: 0,
      isInitialized: false
    };
  }
}

// Auto-initialize helper - SIMPLIFIED
window.initializeNavigation = function(options = {}) {
  try {
    // Prevent multiple instances
    if (window.navigationInstance) {
      console.warn('Navigation already exists, updating state instead');
      window.navigationInstance.updateState(options);
      return window.navigationInstance;
    }
    
    window.navigationInstance = new NavigationComponent(options);
    return window.navigationInstance;
    
  } catch (error) {
    console.error('Navigation initialization failed:', error);
    
    // Return mock object to prevent errors
    return {
      updateState: () => {},
      destroy: () => {},
      closeMobileMenu: () => {},
      closeAllDropdowns: () => {}
    };
  }
};

// Export for modules and global scope
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavigationComponent;
} else if (typeof window !== 'undefined') {
  window.NavigationComponent = NavigationComponent;
}

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  if (window.navigationInstance && window.navigationInstance.destroy) {
    window.navigationInstance.destroy();
  }
});