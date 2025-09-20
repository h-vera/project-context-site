/**
 * CONSOLIDATED INITIALIZATION SCRIPT
 * Path: /assets/js/consolidated-init.js
 * Purpose: Single source of truth for all initialization
 * Version: 1.1.0 - Complete version with all functionality
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
    version: '6.0-complete',
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
    },
    initialized: {
      navigation: false,
      mobileTabs: false,
      progressNav: false,
      animations: false,
      backToTop: false,
      smoothScroll: false,
      keyboardNav: false,
      premiumEffects: false,
      performanceMonitor: false,
      lazyLoader: false,
      touchHandler: false,
      themeManager: false,
      timelines: false,
      fallback: false
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
  if (window.APP_CONFIG.capabilities.android) {
    document.documentElement.className += ' is-android';
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
    iconSystem: null,
    onReady: function(fn) {
      if (window.BiblicalApp.initialized) {
        try {
          fn();
        } catch (e) {
          console.error('Error in onReady callback:', e);
        }
      } else {
        window.BiblicalApp.ready.push(fn);
      }
    },
    announce: null // Will be set by character-page-v2.js
  };
  
  // ============================================
  // STAGE 2: SVG ICON SYSTEM - COMPLETE
  // ============================================
  
  window.getIcon = function(name, options) {
    options = options || {};
    const size = options.size || 24;
    const color = options.color || 'currentColor';
    
    // Always prefer CSS-based icons when available
    if (document.styleSheets.length > 0 && window.APP_CONFIG?.capabilities?.svg !== false) {
      const sizeClass = size <= 16 ? 'icon-sm' : 
                        size <= 20 ? 'icon-md' : 
                        size <= 24 ? 'icon-lg' : 'icon-xl';
      
      // Return CSS-based icon (works with global-v3.css)
      return `<span class="icon-svg ${sizeClass}" data-icon="${name}"></span>`;
    }
    
    // Fallback: Complete inline SVG icon library
    const svgIcons = {
      // Navigation icons
      'overview': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/></svg>`,
      'narrative': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
      'literary': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      'themes': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
      'theology': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      'application': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      'questions': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      'crown': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M12 6l4 6 5-4-2 10H5L3 8l5 4 4-6z"/></svg>`,
      'scroll': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
      
      // UI Icons
      'menu': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
      'close': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      'chevron-up': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>`,
      'chevron-down': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>`,
      'arrow-right': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
      'arrow-left': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,
      'home': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      'search': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
      'user': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      'users': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
      'star': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      'heart': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      'check': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
      'x': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
      'info': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
      'alert': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      'settings': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24"/></svg>`,
      'download': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
      'external': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
      'calendar': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
      'clock': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`
    };
    
    // Check if inline SVG exists
    if (svgIcons[name]) {
      return svgIcons[name];
    }
    
    // Final fallback to emoji
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
      menu: '☰',
      close: '✕',
      'chevron-up': '⬆️',
      'chevron-down': '⬇️',
      'arrow-right': '→',
      'arrow-left': '←',
      user: '👤',
      users: '👥',
      home: '🏠',
      search: '🔍',
      star: '⭐',
      heart: '❤️',
      check: '✓',
      x: '✖',
      info: 'ℹ️',
      alert: '⚠️',
      settings: '⚙️',
      download: '⬇️',
      external: '↗️',
      calendar: '📅',
      clock: '🕐'
    };
    
    const emoji = emojiIcons[name] || '📄';
    if (options.size) {
      return `<span class="icon-emoji" style="font-size: ${options.size}px">${emoji}</span>`;
    }
    return emoji;
  };
  
  // Make icon system globally available
  window.BiblicalApp.getIcon = window.getIcon;
  
  // Additional emoji fallbacks for special cases
  window.EmojiIcons = {
    overview: '📋',
    narrative: '📖',
    literary: '✍️',
    themes: '🎯',
    theology: '⛪',
    application: '💡',
    questions: '❓',
    crown: '👑',
    scroll: '📜'
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
    console.log('Template version:', window.APP_CONFIG.version);
    console.log('Capabilities:', window.APP_CONFIG.capabilities);
    
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
      await initializeAccessibilityGlobals();
      
      // Mark as initialized
      window.BiblicalApp.initialized = true;
      
      // Run queued callbacks
      console.log(`Running ${window.BiblicalApp.ready.length} queued callbacks`);
      window.BiblicalApp.ready.forEach(fn => {
        try {
          fn();
        } catch (e) {
          console.error('Error in ready callback:', e);
        }
      });
      window.BiblicalApp.ready = [];
      
      console.log('✅ BiblicalApp initialization complete');
      console.log('Modules loaded:', Object.keys(window.BiblicalApp.modules));
      console.log('Initialization status:', window.APP_CONFIG.initialized);
      
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
    // Check if navigation already exists in DOM
    if (document.querySelector('nav')) {
      console.log('Navigation already exists in DOM');
      window.APP_CONFIG.initialized.navigation = true;
      return;
    }
    
    if (typeof window.initPremiumNav === 'function') {
      try {
        window.initPremiumNav({
          currentPage: 'characters',
          hubType: 'characters',
          iconSystem: window.getIcon
        });
        window.APP_CONFIG.initialized.navigation = true;
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
        <button class="mobile-menu-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    `;
    document.body.insertBefore(nav, document.body.firstChild);
    window.APP_CONFIG.initialized.navigation = true;
    console.log('✓ Fallback navigation inserted');
  }
  
  async function initializeCharacterFeatures() {
    // Timeline animations - only if not already done
    if (!window.APP_CONFIG.initialized.timelines) {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        if (!item.style.getPropertyValue('--index')) {
          item.style.setProperty('--index', index);
        }
      });
      window.APP_CONFIG.initialized.timelines = true;
    }
    
    // Mobile-specific features
    if (window.APP_CONFIG.capabilities.mobile) {
      // Character page module will handle mobile tabs
      console.log('Mobile features will be initialized by CharacterPage module');
    }
    
    console.log('✓ Character features initialized');
  }
  
  async function initializeAnimations() {
    // Skip if already initialized by another module
    if (window.APP_CONFIG.initialized.animations) {
      console.log('Animations already initialized');
      return;
    }
    
    if (window.APP_CONFIG.capabilities.intersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Stagger children if present
            const children = entry.target.querySelectorAll(':scope > *');
            children.forEach((child, index) => {
              if (!child.style.transitionDelay) {
                child.style.transitionDelay = `${index * 50}ms`;
              }
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
      
      window.APP_CONFIG.initialized.animations = true;
      console.log('✓ Scroll animations initialized');
    } else {
      // Fallback: show all immediately
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.classList.add('visible');
      });
      window.APP_CONFIG.initialized.animations = true;
    }
  }
  
  async function initializeAccessibilityGlobals() {
    // Skip link - character-page will handle this
    // Screen reader announcements - character-page will handle this
    
    // Focus visible polyfill for older browsers
    if (!CSS.supports('selector(:focus-visible)')) {
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-nav');
        }
      });
      
      document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
      });
    }
    
    console.log('✓ Accessibility globals initialized');
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
    
    window.APP_CONFIG.initialized.fallback = true;
  }
  
  // ============================================
  // FIX FUNCTIONS
  // ============================================
  
  window.BiblicalApp.fixBackToTop = function() {
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop && (!backToTop.innerHTML || backToTop.innerHTML.includes('undefined'))) {
      backToTop.innerHTML = window.getIcon('chevron-up', { size: 24, color: 'white' });
      console.log('✓ Back to top button fixed');
    }
  };
  
  window.BiblicalApp.checkBackToTop = function() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
      console.log('Back to top button not found');
      return false;
    }
    
    // Check if it has proper content
    const hasIcon = backToTop.querySelector('svg') || 
                    backToTop.querySelector('.icon-svg') || 
                    backToTop.textContent.trim();
    
    if (!hasIcon || backToTop.innerHTML.includes('undefined')) {
      console.log('Back to top button needs fixing');
      backToTop.innerHTML = window.getIcon('chevron-up', { size: 24, color: 'white' });
      console.log('✓ Back to top button fixed');
      return true;
    }
    
    return true;
  };
  
  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  
  window.BiblicalApp.safeReady = function(callback) {
    // Enhanced ready function that ensures all modules are loaded
    window.BiblicalApp.onReady(function() {
      // Additional check for character page
      if (window.BiblicalApp.modules?.characterPage) {
        callback();
      } else {
        // Wait a bit more for character page
        setTimeout(callback, 100);
      }
    });
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
  
  // Check and fix back-to-top button after character page loads
  window.BiblicalApp.onReady(function() {
    setTimeout(() => {
      window.BiblicalApp.checkBackToTop();
    }, 500);
  });
  
  // ============================================
  // ERROR HANDLING
  // ============================================
  
  window.addEventListener('error', function(e) {
    // Don't log errors for missing images or resources
    if (e.target?.tagName === 'IMG' || e.target?.tagName === 'SCRIPT') {
      console.warn('Resource failed to load:', e.target?.src);
      return true;
    }
    
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
      
      // Log final state
      console.log('=== Page Load Complete ===');
      console.log('Modules:', Object.keys(window.BiblicalApp.modules));
      console.log('Initialization flags:', window.APP_CONFIG.initialized);
      
      // Log performance
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        console.log(`⏱️ DOM Ready: ${domReadyTime}ms`);
        console.log(`⏱️ Total page load: ${pageLoadTime}ms`);
      }
    }, 100);
  });
  
  // ============================================
  // PUBLIC API & DEBUG TOOLS
  // ============================================
  
  // Expose useful functions for debugging
  window.BiblicalApp.debug = {
    checkStatus: function() {
      console.table(window.APP_CONFIG.initialized);
    },
    
    listModules: function() {
      console.log('Loaded modules:', Object.keys(window.BiblicalApp.modules));
      return window.BiblicalApp.modules;
    },
    
    reinitialize: function(moduleName) {
      if (moduleName === 'navigation' && typeof window.initPremiumNav === 'function') {
        window.initPremiumNav();
      } else if (moduleName === 'character' && window.CharacterPage) {
        new window.CharacterPage();
      } else {
        console.log('Unknown module:', moduleName);
      }
    },
    
    testIcons: function() {
      const testIcons = ['chevron-up', 'home', 'user', 'overview', 'crown'];
      testIcons.forEach(name => {
        console.log(`${name}:`, window.getIcon(name));
      });
    },
    
    checkPerformance: function() {
      if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const metrics = {
          'DNS Lookup': timing.domainLookupEnd - timing.domainLookupStart,
          'TCP Connection': timing.connectEnd - timing.connectStart,
          'Request Time': timing.responseStart - timing.requestStart,
          'Response Time': timing.responseEnd - timing.responseStart,
          'DOM Processing': timing.domComplete - timing.domLoading,
          'Load Event': timing.loadEventEnd - timing.loadEventStart,
          'Total Load Time': timing.loadEventEnd - timing.navigationStart
        };
        console.table(metrics);
      }
    }
  };
  
})();