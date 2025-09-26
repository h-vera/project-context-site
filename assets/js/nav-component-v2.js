/**
 * Navigation Component v2.2.0 - COMPLETE REWRITE
 * Path: /assets/js/nav-component-v2.js
 * 
 * CRITICAL FIXES:
 * - Simplified initialization
 * - Guaranteed DOM insertion
 * - Fixed all rendering issues
 * - Bulletproof fallback system
 */

(function() {
  'use strict';
  
  // Prevent multiple initialization
  if (window.navigationInitialized) {
    console.log('Navigation already initialized');
    return;
  }
  
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
      
      this.init();
    }
    
    // Create navigation HTML
    createNavigationHTML() {
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
    
    // Check if nav item should be active
    isActive(section) {
      const { currentPage, hubType } = this.options;
      const page = currentPage.toLowerCase();
      
      switch(section) {
        case 'home':
          return (page === 'home' || page === '' || page === '/') ? 'active' : '';
        case 'studies':
          return (page.includes('studies') || page.includes('characters') || 
                  page.includes('women') || page.includes('tanakh') || 
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
    
    // Initialize navigation
    init() {
      if (this.state.isInitialized) return;
      
      // Always try to render immediately if DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      } else {
        // DOM is ready, render immediately
        this.render();
      }
    }
    
    // Render navigation - BULLETPROOF VERSION
    render() {
      try {
        console.log('🚀 Starting navigation render...');
        
        // Mark as initialized first
        this.state.isInitialized = true;
        window.navigationInitialized = true;
        
        // Remove any existing navigation first
        const existingNav = document.getElementById('main-nav');
        if (existingNav) {
          existingNav.remove();
          console.log('🗑️ Removed existing navigation');
        }
        
        // Create new navigation element
        const nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
        
        // CRITICAL: Apply styles directly to guarantee visibility
        nav.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          background: rgba(255, 255, 255, 0.98) !important;
          backdrop-filter: blur(10px) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          padding: 1rem 2rem !important;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
          border-bottom: 1px solid rgba(229, 231, 235, 0.8) !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          height: auto !important;
          min-height: 60px !important;
        `;
        
        // Set the HTML content
        nav.innerHTML = this.createNavigationHTML();
        
        // Insert at the very beginning of body
        if (document.body) {
          if (document.body.firstChild) {
            document.body.insertBefore(nav, document.body.firstChild);
          } else {
            document.body.appendChild(nav);
          }
          console.log('✅ Navigation inserted into DOM');
        } else {
          throw new Error('document.body not available');
        }
        
        // Wait a frame to ensure DOM insertion, then setup
        requestAnimationFrame(() => {
          this.setupEventListeners();
          this.setupScrollEffects();
          this.updateMobileState();
          console.log('✅ Navigation fully initialized');
        });
        
      } catch (error) {
        console.error('❌ Navigation render failed:', error);
        this.renderFallback();
      }
    }
    
    // Emergency fallback navigation
    renderFallback() {
      console.log('🔧 Rendering fallback navigation...');
      
      try {
        // Remove any existing nav
        const existingNav = document.getElementById('main-nav');
        if (existingNav) existingNav.remove();
        
        // Create simple, guaranteed-to-work navigation
        const nav = document.createElement('nav');
        nav.id = 'main-nav';
        nav.style.cssText = `
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          background: white !important;
          padding: 1rem 2rem !important;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
          z-index: 1000 !important;
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        `;
        
        nav.innerHTML = `
          <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
            <a href="/" style="font-size:1.5rem;font-weight:bold;text-decoration:none;color:#0a0a0a;display:flex;align-items:center;gap:0.75rem;">
              <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
                <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
                <ellipse cx="50" cy="50" rx="25" ry="15" stroke="currentColor" stroke-width="3" fill="none"/>
                <circle cx="50" cy="50" r="8" fill="#00b4d8"/>
                <circle cx="50" cy="50" r="3" fill="currentColor"/>
              </svg>
              Project Context
            </a>
            <div style="display:flex;gap:2rem;">
              <a href="/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">Home</a>
              <a href="/studies/" style="text-decoration:none;color:#0a0a0a;font-weight:500;padding:0.5rem 1rem;border-radius:8px;background:rgba(0,0,0,0.05);">Studies</a>
              <a href="/resources/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">Resources</a>
              <a href="/about/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">About</a>
            </div>
          </div>
        `;
        
        document.body.insertBefore(nav, document.body.firstChild);
        
        // Add hover effects
        const links = nav.querySelectorAll('a:not(:first-child)');
        links.forEach(link => {
          link.addEventListener('mouseenter', () => {
            link.style.color = '#0a0a0a';
            link.style.background = 'rgba(0, 0, 0, 0.05)';
          });
          link.addEventListener('mouseleave', () => {
            if (!link.style.background.includes('0.05')) {
              link.style.color = '#666';
              link.style.background = 'transparent';
            }
          });
        });
        
        console.log('✅ Fallback navigation rendered successfully');
        
      } catch (fallbackError) {
        console.error('❌ Even fallback failed:', fallbackError);
        // Last resort - create absolute minimal nav
        document.body.insertAdjacentHTML('afterbegin', `
          <nav id="main-nav" style="position:fixed;top:0;left:0;right:0;background:white;padding:1rem;z-index:1000;border-bottom:1px solid #ccc;">
            <div style="text-align:center;">
              <a href="/" style="font-weight:bold;text-decoration:none;color:#0a0a0a;">Project Context</a>
              <span style="margin:0 1rem;">|</span>
              <a href="/studies/" style="text-decoration:none;color:#666;">Studies</a>
            </div>
          </nav>
        `);
      }
    }
    
    // Setup event listeners
    setupEventListeners() {
      const menuToggle = document.getElementById('mobileMenuToggle');
      const navLinks = document.getElementById('navLinks');
      const overlay = document.querySelector('.mobile-menu-overlay');
      
      if (!menuToggle || !navLinks) {
        console.warn('⚠️ Navigation elements not found for event setup');
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
      
      // Dropdown handling
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
    
    // Setup dropdown functionality
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
      });
    }
    
    // Initialize scroll effects
    setupScrollEffects() {
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
    
    // Update mobile state
    updateMobileState() {
      const wasMobile = this.state.isMobile;
      this.state.isMobile = window.innerWidth <= this.options.mobileBreakpoint;
      
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.setAttribute('aria-hidden', this.state.isMobile ? 'true' : 'false');
      }
      
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
    
    // Open mobile menu
    openMobileMenu() {
      if (this.state.isMenuOpen) return;
      
      const menuToggle = document.getElementById('mobileMenuToggle');
      const navLinks = document.getElementById('navLinks');
      const overlay = document.querySelector('.mobile-menu-overlay');
      
      if (!menuToggle || !navLinks) return;
      
      this.state.scrollPosition = window.pageYOffset;
      this.state.isMenuOpen = true;
      
      // Update UI
      menuToggle.classList.add('active');
      navLinks.classList.add('active');
      if (overlay) overlay.classList.add('active');
      document.body.classList.add('menu-open');
      
      // Lock scroll
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.state.scrollPosition}px`;
      document.body.style.width = '100%';
      
      // Update ARIA
      menuToggle.setAttribute('aria-expanded', 'true');
      navLinks.setAttribute('aria-hidden', 'false');
      if (overlay) overlay.setAttribute('aria-hidden', 'false');
    }
    
    // Close mobile menu
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
      
      // Restore scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      window.scrollTo(0, this.state.scrollPosition);
      
      // Update ARIA
      menuToggle.setAttribute('aria-expanded', 'false');
      navLinks.setAttribute('aria-hidden', this.state.isMobile ? 'true' : 'false');
      if (overlay) overlay.setAttribute('aria-hidden', 'true');
      
      this.closeAllDropdowns();
    }
    
    // Toggle dropdown
    toggleDropdown(dropdown) {
      const isOpen = dropdown.classList.contains('open');
      this.closeAllDropdowns();
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
      
      const nav = document.getElementById('main-nav');
      if (nav) {
        nav.innerHTML = this.createNavigationHTML();
        this.setupDropdowns();
      }
    }
    
    // Cleanup method
    destroy() {
      console.log('🗑️ Destroying navigation component');
      
      this.closeMobileMenu();
      this.closeAllDropdowns();
      
      const nav = document.getElementById('main-nav');
      if (nav) {
        nav.remove();
      }
      
      const overlay = document.querySelector('.mobile-menu-overlay');
      if (overlay) {
        overlay.remove();
      }
      
      // Reset body styles
      document.body.classList.remove('menu-open');
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      this.state = {
        isMobile: false,
        isMenuOpen: false,
        scrollPosition: 0,
        isInitialized: false
      };
      
      // Clear instance
      window.navigationInstance = null;
      window.navigationInitialized = false;
    }
  }
  
  // Auto-initialize helper function
  window.initializeNavigation = function(options = {}) {
    try {
      // Prevent multiple instances
      if (window.navigationInstance) {
        console.log('📍 Navigation already exists, updating state instead');
        window.navigationInstance.updateState(options);
        return window.navigationInstance;
      }
      
      console.log('🚀 Initializing navigation with options:', options);
      window.navigationInstance = new NavigationComponent(options);
      return window.navigationInstance;
      
    } catch (error) {
      console.error('❌ Navigation initialization failed:', error);
      
      // Create emergency fallback nav - GUARANTEED TO WORK
      const nav = document.createElement('nav');
      nav.id = 'main-nav';
      nav.style.cssText = `
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        background: white !important;
        padding: 1rem 2rem !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
        z-index: 1000 !important;
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
      `;
      
      nav.innerHTML = `
        <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;">
          <a href="/" style="font-size:1.5rem;font-weight:bold;text-decoration:none;color:#0a0a0a;display:flex;align-items:center;gap:0.75rem;">
            <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
              <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
              <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
              <ellipse cx="50" cy="50" rx="25" ry="15" stroke="currentColor" stroke-width="3" fill="none"/>
              <circle cx="50" cy="50" r="8" fill="#00b4d8"/>
              <circle cx="50" cy="50" r="3" fill="currentColor"/>
            </svg>
            Project Context
          </a>
          <div style="display:flex;gap:2rem;">
            <a href="/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">Home</a>
            <a href="/studies/" style="text-decoration:none;color:#0a0a0a;font-weight:500;padding:0.5rem 1rem;border-radius:8px;background:rgba(0,0,0,0.05);">Studies</a>
            <a href="/resources/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">Resources</a>
            <a href="/about/" style="text-decoration:none;color:#666;font-weight:500;padding:0.5rem 1rem;border-radius:8px;transition:all 0.2s;">About</a>
          </div>
        </div>
      `;
      
      document.body.insertBefore(nav, document.body.firstChild);
      console.log('🔧 Emergency fallback navigation created');
      
      // Return mock object to prevent errors
      return {
        updateState: function() { console.log('Navigation mock: updateState called'); },
        destroy: function() { console.log('Navigation mock: destroy called'); },
        closeMobileMenu: function() { console.log('Navigation mock: closeMobileMenu called'); },
        closeAllDropdowns: function() { console.log('Navigation mock: closeAllDropdowns called'); }
      };
    }
  };
  
  // Export for modules
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
  
  console.log('📦 Navigation Component v2.2.0 loaded successfully');
  
})();