/**
 * NAV-PREMIUM.JS
 * Path: /assets/js/nav-premium.js
 * Purpose: Premium navigation with mobile hamburger menu
 * Version: 1.0.0
 * Compatible with global-v3.css and template v5.8
 */

(function() {
  'use strict';

  // Navigation HTML template
  const navHTML = `
    <nav role="navigation" aria-label="Main navigation">
      <div class="nav-container">
        <!-- Logo -->
        <a href="/" class="logo" aria-label="Project Context Home">
          <span class="logo-icon">👁️</span>
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
              <a href="/studies/characters/characters_hub.html" role="menuitem">Biblical Characters</a>
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

  // Initialize premium navigation
  window.initPremiumNav = function(options = {}) {
    // Insert navigation HTML
    const insertNavigation = () => {
      // Check if nav already exists
      if (document.querySelector('nav')) {
        console.log('Navigation already exists');
        return;
      }

      // Create nav element
      const navContainer = document.createElement('div');
      navContainer.innerHTML = navHTML;
      
      // Insert after skip link or at beginning of body
      const skipLink = document.querySelector('.skip-link');
      if (skipLink && skipLink.nextSibling) {
        skipLink.parentNode.insertBefore(navContainer.firstChild, skipLink.nextSibling);
      } else {
        document.body.insertBefore(navContainer.firstChild, document.body.firstChild);
      }

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
      menuOverlay.addEventListener('click', toggleMenu);

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
            if (!wasActive) {
              dropdown.classList.add('active');
            } else {
              dropdown.classList.remove('active');
            }
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
          if (window.innerWidth > 768) {
            // Close mobile menu if window is resized to desktop
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
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
        if (href && href !== '#' && currentPath.includes(href) && href !== '/') {
          link.classList.add('active');
        }
      });

      console.log('✓ Current page highlighted');
    };

    // Initialize everything
    const init = () => {
      insertNavigation();
      
      // Wait for next frame to ensure DOM is updated
      requestAnimationFrame(() => {
        setupMobileMenu();
        setupScrollBehavior();
        highlightCurrentPage();
        
        console.log('✅ Premium navigation fully initialized');
      });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  };

  // Don't auto-initialize - let the page call it when ready
// if (typeof module === 'undefined') {
//   window.initPremiumNav();
// }

})();