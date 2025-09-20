/**
 * NAV-PREMIUM.JS - FIXED WHITE NAVIGATION VERSION
 * Path: /assets/js/nav-premium.js
 * Purpose: Premium navigation with mobile hamburger menu
 * Version: 1.3.0 - Fixed navigation rendering
 * Compatible with global-v3.css and consolidated initialization
 */

(function() {
  'use strict';

  // Initialize premium navigation
  window.initPremiumNav = function(options = {}) {
    console.log('Initializing Premium Navigation v1.3.0...');
    
    // First, inject critical styles
    injectNavStyles();
    
    // Then insert navigation HTML
    insertNavigation();
    
    // Setup functionality after a brief delay to ensure DOM is ready
    requestAnimationFrame(() => {
      setupMobileMenu();
      setupScrollBehavior();
      highlightCurrentPage();
      
      // Mark navigation as initialized
      if (window.APP_CONFIG) {
        window.APP_CONFIG.initialized.navigation = true;
      }
      
      console.log('✅ Premium navigation fully initialized');
    });
  };

  // Create navigation HTML
function createNavHTML() {
  // Get icon function - simplified since we know load order is correct
  const getIconHTML = function(name, options = {}) {
    // By the time this runs, consolidated-init.js has already set up window.getIcon
    if (typeof window.getIcon === 'function') {
      return window.getIcon(name, options);
    }
    
    // Create the icon system adapter that character-page-v2.js expects
    window.BiblicalApp.iconSystem = {
    get: (name, options) => window.getIcon(name, options)
    };

// Mark icon system as initialized
window.APP_CONFIG.initialized.iconSystem = true;
    // Fallback if somehow getIcon isn't available
    const fallbacks = {
      'home': '🏠',
      'menu': '☰'
    };
    return fallbacks[name] || '📄';
  };

  return `
    <nav role="navigation" aria-label="Main navigation">
      <div class="nav-container">
        <!-- Logo -->
        <a href="/" class="logo" aria-label="Project Context Home">
          <span class="logo-icon">${getIconHTML('home', { size: 24, color: 'currentColor' })}</span>
          <span class="logo-text">Project Context</span>
        </a>

        <!-- Mobile Menu Toggle (Hamburger) -->
        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation Links -->
        <ul class="nav-links">
          <li><a href="/" class="nav-link">Home</a></li>
          <li class="dropdown">
            <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Studies
            </a>
            <div class="dropdown-content" role="menu">
              <a href="/studies/characters/" role="menuitem">Biblical Characters</a>
              <a href="/studies/women/" role="menuitem">Women in the Bible</a>
              <a href="/studies/tanakh/" role="menuitem">Tanakh Studies</a>
              <a href="/studies/themes/" role="menuitem">Thematic Studies</a>
            </div>
          </li>
          <li class="dropdown">
            <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
              Resources
            </a>
            <div class="dropdown-content" role="menu">
              <a href="/resources/timelines/" role="menuitem">Timelines</a>
              <a href="/resources/maps/" role="menuitem">Maps</a>
              <a href="/resources/glossary/" role="menuitem">Glossary</a>
              <a href="/resources/bibliography/" role="menuitem">Bibliography</a>
            </div>
          </li>
          <li><a href="/about/" class="nav-link">About</a></li>
        </ul>
      </div>
    </nav>
  `;
}

    return `
      <nav role="navigation" aria-label="Main navigation">
        <div class="nav-container">
          <!-- Logo -->
          <a href="/" class="logo" aria-label="Project Context Home">
            <span class="logo-icon">${getIconHTML('home', { size: 24, color: 'currentColor' })}</span>
            <span class="logo-text">Project Context</span>
          </a>

          <!-- Mobile Menu Toggle (Hamburger) -->
          <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <!-- Navigation Links -->
          <ul class="nav-links">
            <li><a href="/" class="nav-link">Home</a></li>
            <li class="dropdown">
              <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                Studies
              </a>
              <div class="dropdown-content" role="menu">
                <a href="/studies/characters/" role="menuitem">Biblical Characters</a>
                <a href="/studies/women/" role="menuitem">Women in the Bible</a>
                <a href="/studies/tanakh/" role="menuitem">Tanakh Studies</a>
                <a href="/studies/themes/" role="menuitem">Thematic Studies</a>
              </div>
            </li>
            <li class="dropdown">
              <a href="#" class="nav-link dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                Resources
              </a>
              <div class="dropdown-content" role="menu">
                <a href="/resources/timelines/" role="menuitem">Timelines</a>
                <a href="/resources/maps/" role="menuitem">Maps</a>
                <a href="/resources/glossary/" role="menuitem">Glossary</a>
                <a href="/resources/bibliography/" role="menuitem">Bibliography</a>
              </div>
            </li>
            <li><a href="/about/" class="nav-link">About</a></li>
          </ul>
        </div>
      </nav>
    `;
  }

  // Inject critical navigation styles
  function injectNavStyles() {
    if (document.getElementById('nav-critical-styles')) {
      console.log('Navigation styles already injected');
      return;
    }
    
    const styles = `
      /* Critical Navigation Styles - White Theme */
      nav {
        position: sticky;
        top: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        z-index: 1000;
        padding: 1rem 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.08);
        border-bottom: 1px solid rgba(0,0,0,0.06);
      }
      
      nav .nav-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 0 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      nav .logo {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #1a1a1a;
        text-decoration: none;
        font-weight: bold;
        font-size: 1.25rem;
        transition: opacity 0.3s ease;
      }
      
      nav .logo:hover {
        opacity: 0.7;
      }
      
      nav .nav-links {
        display: flex;
        list-style: none;
        gap: 2rem;
        margin: 0;
        padding: 0;
      }
      
      nav .nav-links a {
        color: #6b7280;
        text-decoration: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        transition: all 0.3s;
        font-weight: 500;
      }
      
      nav .nav-links a:hover,
      nav .nav-links a.active {
        color: #1a1a1a;
        background: rgba(0, 0, 0, 0.05);
      }
      
      nav .dropdown {
        position: relative;
      }
      
      nav .dropdown-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 0.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        min-width: 200px;
        padding: 0.5rem 0;
        border: 1px solid #e5e7eb;
      }
      
      nav .dropdown:hover .dropdown-content {
        display: block;
      }
      
      nav .dropdown-content a {
        display: block;
        padding: 0.75rem 1rem;
        color: #6b7280;
      }
      
      nav .dropdown-content a:hover {
        background: #f5f5f5;
        color: #7209b7;
        padding-left: 1.5rem;
      }
      
      nav .dropdown-toggle::after {
        content: '▾';
        font-size: 0.8rem;
        margin-left: 0.25rem;
        display: inline-block;
        transition: transform 0.3s ease;
      }
      
      nav .dropdown:hover .dropdown-toggle::after {
        transform: rotate(180deg);
      }
      
      .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        flex-direction: column;
        gap: 4px;
        width: 48px;
        height: 48px;
        align-items: center;
        justify-content: center;
      }
      
      .mobile-menu-toggle span {
        display: block;
        width: 25px;
        height: 3px;
        background: #7209b7;
        transition: all 0.3s;
        border-radius: 2px;
      }
      
      .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
      
      nav.scrolled {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }
      
      @media (max-width: 768px) {
        .mobile-menu-toggle {
          display: flex;
        }
        
        nav .nav-links {
          position: fixed;
          top: 60px;
          right: -100%;
          width: 80%;
          max-width: 300px;
          height: calc(100vh - 60px);
          background: white;
          flex-direction: column;
          padding: 2rem;
          gap: 1rem;
          box-shadow: -5px 0 15px rgba(0,0,0,0.1);
          transition: right 0.3s ease;
          overflow-y: auto;
          z-index: 999;
        }
        
        nav .nav-links.active {
          right: 0;
        }
        
        nav .nav-links a {
          color: #333;
        }
        
        nav .dropdown-content {
          position: static;
          display: none;
          box-shadow: none;
          background: #f8f9fa;
          margin: 0.5rem 0 0.5rem 1rem;
          padding-left: 1rem;
          border-left: 3px solid #7209b7;
        }
        
        nav .dropdown.active .dropdown-content {
          display: block;
        }
        
        nav .dropdown-toggle::after {
          margin-left: auto;
        }
        
        nav .dropdown.active .dropdown-toggle::after {
          transform: rotate(180deg);
        }
        
        .mobile-menu-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.5);
          z-index: 998;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .mobile-menu-overlay.active {
          display: block;
          opacity: 1;
        }
        
        body.menu-open {
          overflow: hidden;
        }
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'nav-critical-styles';
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);
    
    console.log('✓ Navigation styles injected');
  }

  // Insert navigation HTML into the page
  function insertNavigation() {
    // Check if nav already exists and is visible
    const existingNav = document.querySelector('nav');
    if (existingNav && existingNav.querySelector('.nav-container')) {
    console.log('Navigation already exists and is complete');
    return;
  }
    // Remove ALL existing navigation elements first
    const existingNavs = document.querySelectorAll('nav');
    existingNavs.forEach(nav => {
      console.log('Removing existing nav:', nav);
      nav.remove();
    });
    
    // Clear nav placeholder if it exists
    const placeholder = document.getElementById('nav-placeholder');
    if (placeholder) {
      placeholder.innerHTML = '';
    }

    // Create nav HTML
    const navHTML = createNavHTML();
    
    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navHTML.trim();
    
    // Get the nav element
    const navElement = tempDiv.querySelector('nav');
    
    if (!navElement) {
      console.error('Failed to create nav element from HTML');
      return;
    }
    
    // Insert nav at the beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(navElement, document.body.firstChild);
    } else {
      document.body.appendChild(navElement);
    }

    // Create mobile menu overlay if it doesn't exist
    if (!document.querySelector('.mobile-menu-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      document.body.appendChild(overlay);
    }

    console.log('✓ Navigation HTML injected successfully');
    
    // Verify the navigation was inserted
    const verifyNav = document.querySelector('nav');
    if (verifyNav) {
      console.log('Navigation verification:');
      console.log('- Has container:', !!verifyNav.querySelector('.nav-container'));
      console.log('- Has logo:', !!verifyNav.querySelector('.logo'));
      console.log('- Has nav links:', !!verifyNav.querySelector('.nav-links'));
      console.log('- Has dropdowns:', !!verifyNav.querySelector('.dropdown-content'));
    }
  }

  // Setup mobile menu functionality
  function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.mobile-menu-overlay');
    const body = document.body;

    if (!menuToggle || !navLinks) {
      console.warn('Mobile menu elements not found');
      return;
    }

    // Toggle menu function
    const toggleMenu = () => {
      const isOpen = menuToggle.classList.contains('active');
      
      if (isOpen) {
        // Close menu
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      } else {
        // Open menu
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        if (menuOverlay) menuOverlay.classList.add('active');
        body.classList.add('menu-open');
        menuToggle.setAttribute('aria-expanded', 'true');
      }
    };

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    
    if (menuOverlay) {
      menuOverlay.addEventListener('click', toggleMenu);
    }

    // Handle dropdown toggles in mobile
    const dropdownToggles = document.querySelectorAll('.dropdown .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          
          const dropdown = this.parentElement;
          const wasActive = dropdown.classList.contains('active');
          
          // Close all other dropdowns
          document.querySelectorAll('.dropdown.active').forEach(d => {
            if (d !== dropdown) d.classList.remove('active');
          });
          
          // Toggle current dropdown
          dropdown.classList.toggle('active', !wasActive);
          this.setAttribute('aria-expanded', !wasActive);
        }
      });
    });

    // Close menu when clicking on a link (not dropdown toggle)
    const navLinksItems = document.querySelectorAll('.nav-links a:not(.dropdown-toggle)');
    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
          toggleMenu();
        }
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
          // Close mobile menu if window is resized to desktop
          menuToggle.classList.remove('active');
          navLinks.classList.remove('active');
          if (menuOverlay) menuOverlay.classList.remove('active');
          body.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          
          // Reset all dropdown states
          document.querySelectorAll('.dropdown.active').forEach(d => {
            d.classList.remove('active');
          });
        }
      }, 250);
    });

    console.log('✓ Mobile menu initialized');
  }

  // Setup scroll behavior
  function setupScrollBehavior() {
    const nav = document.querySelector('nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNav = () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class when scrolled down
      if (currentScrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });

    console.log('✓ Scroll behavior initialized');
  }

  // Highlight current page in navigation
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        // Remove any trailing slashes for comparison
        const cleanHref = href.replace(/\/$/, '');
        const cleanPath = currentPath.replace(/\/$/, '');
        
        // Check if current path matches or is a child of the link
        if (cleanPath === cleanHref || 
            (cleanHref !== '' && cleanPath.startsWith(cleanHref + '/'))) {
          link.classList.add('active');
          
          // Also mark parent dropdown as active if in a submenu
          const parentDropdown = link.closest('.dropdown');
          if (parentDropdown) {
            parentDropdown.querySelector('.dropdown-toggle')?.classList.add('active');
          }
        }
      }
    });

    console.log('✓ Current page highlighted');
  }

  // Auto-initialize if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Don't auto-initialize, wait for explicit call
      console.log('nav-premium.js loaded and ready');
    });
  } else {
    console.log('nav-premium.js loaded and ready');
  }

  // Make function globally available
  window.initPremiumNav = window.initPremiumNav || initPremiumNav;

})();