/**
 * NAV-PREMIUM.JS - WHITE NAVIGATION VERSION
 * Path: /assets/js/nav-premium.js
 * Purpose: Premium navigation with mobile hamburger menu
 * Version: 1.2.0 - White navigation (no purple gradient)
 * Compatible with global-v3.css and consolidated initialization
 */

(function() {
  'use strict';

  // Navigation HTML template with proper icon integration
  const createNavHTML = function() {
    // Use the global icon system if available, otherwise use fallbacks
    const getIconHTML = function(name, options) {
      if (window.getIcon) {
        return window.getIcon(name, options);
      }
      // Fallback icons
      const icons = {
        'home': '🏠',
        'menu': '☰'
      };
      return icons[name] || '📄';
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
  };

  // Critical navigation styles - WHITE THEME
  const injectNavStyles = function() {
    if (document.getElementById('nav-critical-styles')) return;
    
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
      
      /* Dropdown arrow indicator */
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
      
      /* Mobile menu toggle (hamburger) */
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
      
      /* Scrolled state */
      nav.scrolled {
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }
      
      /* Mobile styles */
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
  };

  // Initialize premium navigation
  window.initPremiumNav = function(options = {}) {
    console.log('Initializing Premium Navigation (White Theme)...');
    
    // Inject critical styles first
    injectNavStyles();
    
    // Insert navigation HTML
    const insertNavigation = () => {
      // Remove any existing navigation first
      const existingNav = document.querySelector('nav');
      if (existingNav) {
        console.log('Removing existing navigation');
        existingNav.remove();
      }

      // Create nav HTML with current icon system
      const navHTML = createNavHTML();
      
      // Create nav element
      const navContainer = document.createElement('div');
      navContainer.innerHTML = navHTML;
      
      // Insert at beginning of body
      document.body.insertBefore(navContainer.firstChild, document.body.firstChild);

      // Create mobile menu overlay if it doesn't exist
      if (!document.querySelector('.mobile-menu-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
      }

      console.log('✓ Navigation HTML injected');
    };

    // Setup mobile menu functionality
    const setupMobileMenu = () => {
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
          menuOverlay.classList.remove('active');
          body.classList.remove('menu-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        } else {
          // Open menu
          menuToggle.classList.add('active');
          navLinks.classList.add('active');
          menuOverlay.classList.add('active');
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
            
            // Update aria-expanded
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
    };

    // Setup scroll behavior
    const setupScrollBehavior = () => {
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
    };

    // Highlight current page
    const highlightCurrentPage = () => {
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
    };

    // Initialize everything
    insertNavigation();
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      setupMobileMenu();
      setupScrollBehavior();
      highlightCurrentPage();
      
      // Mark navigation as initialized
      if (window.APP_CONFIG) {
        window.APP_CONFIG.initialized.navigation = true;
      }
      
      console.log('✅ Premium navigation fully initialized (White Theme)');
    });
  };

  // Make sure the function is available globally
  if (typeof window !== 'undefined') {
    window.initPremiumNav = window.initPremiumNav || initPremiumNav;
  }

  // Export for module systems if needed
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPremiumNav };
  }

})();