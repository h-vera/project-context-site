/**
 * CONSOLIDATED INITIALIZATION SCRIPT
 * Path: /assets/js/consolidated-init.js
 * Purpose: Single source of truth for all initialization
 * Version: 1.0.0
 * 
 * This script should be loaded FIRST in the HTML, before other scripts
 */

(function() {
  'use strict';
  
  // ============================================
  // STAGE 1: CRITICAL SETUP (Immediate)
  // ============================================
  
  // Detect capabilities
  window.APP_CONFIG = {
    version: '6.0-clean',
    character: document.querySelector('[data-character-id]')?.dataset.characterId || 'unknown',
    book: document.querySelector('[data-book]')?.dataset.book || 'unknown',
    capabilities: {
      touch: 'ontouchstart' in window,
      ios: /iPhone|iPad|iPod/.test(navigator.userAgent),
      android: /Android/.test(navigator.userAgent),
      mobile: window.innerWidth <= 768,
      svg: !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect),
      smoothScroll: 'scrollBehavior' in document.documentElement.style,
      intersectionObserver: 'IntersectionObserver' in window
    }
  };
  
  // Set classes early
  document.documentElement.className = 'js-enabled';
  if (window.APP_CONFIG.capabilities.mobile) {
    document.documentElement.className += ' is-mobile';
  }
  if (window.APP_CONFIG.capabilities.ios) {
    document.documentElement.className += ' is-ios';
  }
  
  // iOS scroll fix
  if (window.APP_CONFIG.capabilities.ios) {
    document.addEventListener('touchmove', function(e) {
      if (e.touches.length > 1) e.preventDefault();
    }, { passive: false });
  }
  
  // Smooth scroll
  if (window.APP_CONFIG.capabilities.smoothScroll) {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  // Global namespace
  window.BiblicalApp = {
    initialized: false,
    modules: {},
    ready: [],
    onReady: function(fn) {
      if (window.BiblicalApp.initialized) {
        fn();
      } else {
        window.BiblicalApp.ready.push(fn);
      }
    }
  };
  
  // ============================================
  // STAGE 2: SVG ICON SYSTEM
  // ============================================
  
  window.getIcon = function(name, options) {
    options = options || {};
    const size = options.size || 24;
    const color = options.color || 'currentColor';
    
    // SVG icons inline - removed giant icon library for brevity
    // In production, these would be imported from a separate file
    const svgIcons = {
      collapse: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
      expand: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
      user: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      home: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      menu: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      close: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
    };
    
    // Use CSS-based icons if available (from global-v3.css)
    if (window.APP_CONFIG?.capabilities?.svg !== false) {
      const sizeClass = size <= 16 ? 'icon-sm' : size <= 20 ? 'icon-md' : size <= 24 ? 'icon-lg' : 'icon-xl';
      
      // Check if CSS icon system is available
      if (document.styleSheets.length > 0) {
        return `<span class="icon-svg ${sizeClass}" data-icon="${name}"></span>`;
      }
    }
    
    // Return inline SVG if available
    if (svgIcons[name]) {
      return svgIcons[name];
    }
    
    // Fallback to emoji
    const emojiIcons = {
      overview: '📋',
      narrative: '📖',
      literary: '✍️',
      themes: '🎯',
      theology: '⛪',
      application: '💡',
      questions: '❓',
      crown: '👑',
      scroll: '📜',
      collapse: '⬆️',
      expand: '⬇️',
      user: '👤',
      home: '🏠',
      menu: '☰',
      close: '✕'
    };
    
    return emojiIcons[name] || '📄';
  };
  
  // ============================================
  // STAGE 3: MODULE LOADER
  // ============================================
  
  window.BiblicalApp.loadModule = function(moduleName, checkFunction, retries = 20, delay = 100) {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      
      const check = () => {
        attempts++;
        
        if (checkFunction()) {
          console.log(`✓ Module ${moduleName} loaded`);
          resolve();
        } else if (attempts >= retries) {
          console.warn(`⚠️ Module ${moduleName} not loaded after ${retries} attempts`);
          reject(new Error(`${moduleName} failed to load`));
        } else {
          setTimeout(check, delay);
        }
      };
      
      check();
    });
  };
  
  // ============================================
  // STAGE 4: MAIN INITIALIZATION
  // ============================================
  
  window.BiblicalApp.initialize = async function() {
    console.log('=== Starting BiblicalApp Initialization ===');
    
    try {
      // Wait for critical modules
      const modulePromises = [];
      
      // Check for navigation module
      if (document.querySelector('script[src*="nav-premium"]')) {
        modulePromises.push(
          window.BiblicalApp.loadModule(
            'Navigation',
            () => typeof window.initPremiumNav === 'function'
          )
        );
      }
      
      // Check for character page module
      if (document.querySelector('script[src*="character-page"]')) {
        modulePromises.push(
          window.BiblicalApp.loadModule(
            'CharacterPage',
            () => typeof window.CharacterPage === 'function'
          )
        );
      }
      
      // Wait for all modules
      await Promise.all(modulePromises);
      
      // Initialize modules in order
      await initializeNavigation();
      await initializeCharacterFeatures();
      await initializeAnimations();
      
      // Mark as initialized
      window.BiblicalApp.initialized = true;
      
      // Run queued callbacks
      window.BiblicalApp.ready.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('Error in ready callback:', e);
        }
      });
      window.BiblicalApp.ready = [];
      
      console.log('✅ BiblicalApp initialization complete');
      
    } catch (error) {
      console.error('Initialization error:', error);
      // Continue with degraded functionality
      fallbackInitialization();
    }
  };
  
  // ============================================
  // INITIALIZATION FUNCTIONS
  // ============================================
  
  async function initializeNavigation() {
    if (typeof window.initPremiumNav === 'function') {
      try {
        window.initPremiumNav({
          currentPage: 'characters',
          hubType: 'characters',
          iconSystem: window.getIcon
        });
        console.log('✓ Navigation initialized');
      } catch (e) {
        console.error('Navigation error:', e);
        insertFallbackNav();
      }
    } else {
      insertFallbackNav();
    }
  }
  
  function insertFallbackNav() {
    if (document.querySelector('nav')) return;
    
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <div class="nav-container">
        <a href="/" class="logo">
          <span class="logo-icon">${window.getIcon('home', { size: 24 })}</span>
          <span class="logo-text">Project Context</span>
        </a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/studies/">Studies</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
    console.log('✓ Fallback navigation inserted');
  }
  
  async function initializeCharacterFeatures() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
    
    // Mobile-specific features
    if (window.APP_CONFIG.capabilities.mobile) {
      // Wait for mobile tabs to be created
      await window.BiblicalApp.loadModule(
        'MobileTabs',
        () => document.querySelector('.mobile-section-tabs'),
        10,
        200
      ).catch(() => {
        console.log('Mobile tabs not created - may not be on mobile');
      });
    }
    
    console.log('✓ Character features initialized');
  }
  
  async function initializeAnimations() {
    if (window.APP_CONFIG.capabilities.intersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
      
      console.log('✓ Scroll animations initialized');
    } else {
      // Fallback: show all immediately
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('visible');
      });
    }
  }
  
  function fallbackInitialization() {
    console.log('Running fallback initialization');
    
    // Ensure basic functionality
    insertFallbackNav();
    
    // Show all content
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
    
    // Basic timeline setup
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
  }
  
  // ============================================
  // FIX FUNCTIONS
  // ============================================
  
  window.BiblicalApp.fixBackToTop = function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop && (!backToTop.innerHTML || backToTop.innerHTML.includes('undefined'))) {
      backToTop.innerHTML = window.getIcon('collapse', { size: 24, color: 'white' });
      console.log('✓ Back to top button fixed');
    }
  };
  
  // ============================================
  // AUTO-INITIALIZATION
  // ============================================
  
  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Small delay to ensure scripts are parsed
      setTimeout(() => window.BiblicalApp.initialize(), 50);
    });
  } else {
    // DOM already loaded
    setTimeout(() => window.BiblicalApp.initialize(), 50);
  }
  
  // Fix back-to-top button after a delay
  setTimeout(() => window.BiblicalApp.fixBackToTop(), 1000);
  
  // ============================================
  // ERROR HANDLING
  // ============================================
  
  window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // Don't let errors break the page
    return true;
  });
  
  window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Prevent default error handling
    e.preventDefault();
  });
  
  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  
  window.addEventListener('load', function() {
    // Final check and fixes
    setTimeout(() => {
      // Check critical elements
      if (!document.querySelector('nav')) {
        console.warn('Navigation still missing at load');
        insertFallbackNav();
      }
      
      // Fix back to top if needed
      window.BiblicalApp.fixBackToTop();
      
      // Log performance
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⏱️ Total page load time: ${pageLoadTime}ms`);
      }
    }, 100);
  });
  
})();