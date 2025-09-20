/**
 * CONSOLIDATED INITIALIZATION SCRIPT - COMPLETE VERSION
 * Path: /assets/js/consolidated-init.js
 * Purpose: Single source of truth for all initialization
 * Version: 1.3.0 - Complete production-ready version
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
      tablet: window.innerWidth > 768 && window.innerWidth <= 1024,
      desktop: window.innerWidth > 1024,
      svg: !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect),
      smoothScroll: 'scrollBehavior' in document.documentElement.style,
      intersectionObserver: 'IntersectionObserver' in window,
      cssVariables: CSS && CSS.supports && CSS.supports('--test-var', '0'),
      webp: false // Will be detected async
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
      criticalStyles: false,
      iconSystem: false,
      accessibility: false
    },
    performance: {
      startTime: performance.now(),
      metrics: {}
    }
  };
  
  // Detect WebP support
  (function checkWebP() {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      window.APP_CONFIG.capabilities.webp = webP.height === 2;
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  })();
  
  // Set classes early
  document.documentElement.className = 'js-enabled';
  if (window.APP_CONFIG.capabilities.mobile) {
    document.documentElement.className += ' is-mobile';
  }
  if (window.APP_CONFIG.capabilities.tablet) {
    document.documentElement.className += ' is-tablet';
  }
  if (window.APP_CONFIG.capabilities.desktop) {
    document.documentElement.className += ' is-desktop';
  }
  if (window.APP_CONFIG.capabilities.ios) {
    document.documentElement.className += ' is-ios';
  }
  if (window.APP_CONFIG.capabilities.android) {
    document.documentElement.className += ' is-android';
  }
  if (window.APP_CONFIG.capabilities.touch) {
    document.documentElement.className += ' touch-enabled';
  }
  
  // ============================================
  // CRITICAL STYLES INJECTION
  // ============================================
  
  function injectCriticalStyles() {
    if (window.APP_CONFIG.initialized.criticalStyles) return;
    
    const criticalCSS = `
      /* Critical visibility fixes */
      .animate-on-scroll {
        opacity: 1 !important;
        transform: none !important;
      }
      
      .animate-on-scroll.animate-in {
        animation: fadeSlideUp 0.6s ease-out;
      }
      
      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Content visibility */
      .theology-card {
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      .theology-card h2,
      .theology-card h3,
      h1, h2, h3, h4, h5, h6 {
        color: #333;
        visibility: visible !important;
        opacity: 1 !important;
      }
      
      /* Back to top button */
      .back-to-top {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
      }
      
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
      }
      
      .back-to-top:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
      }
      
      /* Skip link */
      .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        z-index: 2000;
        border-radius: 0 0 8px 0;
      }
      
      .skip-link:focus {
        top: 0;
      }
      
      /* Screen reader only */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0,0,0,0);
        white-space: nowrap;
        border: 0;
      }
      
      /* Focus visible polyfill */
      .js-focus-visible :focus:not(.focus-visible) {
        outline: none;
      }
      
      .keyboard-nav :focus {
        outline: 2px solid #667eea;
        outline-offset: 2px;
      }
      
      /* Loading state */
      .is-loading {
        pointer-events: none;
        opacity: 0.6;
      }
      
      /* Reduced motion */
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      }
    `;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'critical-styles';
    styleEl.textContent = criticalCSS;
    document.head.appendChild(styleEl);
    
    window.APP_CONFIG.initialized.criticalStyles = true;
    console.log('✓ Critical styles injected');
  }
  
  // Inject critical styles immediately
  injectCriticalStyles();
  
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
    announce: null
  };
  
  // ============================================
  // STAGE 2: COMPLETE SVG ICON SYSTEM
  // ============================================
  
  window.getIcon = function(name, options) {
    options = options || {};
    const size = options.size || 24;
    const color = options.color || 'currentColor';
    
    // Complete inline SVG icon library
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
      'clock': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
      'edit': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
      'trash': `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`
    };
    
    // Return SVG directly
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
      menu: '☰',
      close: '✕',
      'chevron-up': '⬆️',
      'chevron-down': '⬇️',
      home: '🏠',
      search: '🔍',
      star: '⭐',
      heart: '❤️'
    };
    
    return emojiIcons[name] || '📄';
  };
  
  // Make icon system globally available
  window.BiblicalApp.getIcon = window.getIcon;
  window.BiblicalApp.iconSystem = window.getIcon;
  window.APP_CONFIG.initialized.iconSystem = true;
  
  // Emoji fallbacks
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
  // STAGE 3: CONTENT VISIBILITY FIX
  // ============================================
  
  function fixContentVisibility() {
    // Remove opacity:0 from all content
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('visible');
    });
    
    // Ensure all theology cards are visible
    document.querySelectorAll('.theology-card').forEach(card => {
      card.style.opacity = '1';
      card.style.visibility = 'visible';
    });
    
    // Fix any hidden headings
    document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      heading.style.opacity = '1';
      heading.style.visibility = 'visible';
    });
    
    console.log('✓ Content visibility fixed');
  }
  
  // ============================================
  // STAGE 4: MODULE LOADER
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
          resolve(); // Resolve anyway to continue
        } else {
          setTimeout(check, delay);
        }
      };
      
      check();
    });
  };
  
  // ============================================
  // STAGE 5: MAIN INITIALIZATION
  // ============================================
  
  window.BiblicalApp.initialize = async function() {
    console.log('=== Starting BiblicalApp Initialization ===');
    console.log('Template version:', window.APP_CONFIG.version);
    console.log('Capabilities:', window.APP_CONFIG.capabilities);
    
    try {
      // Fix content visibility immediately
      fixContentVisibility();
      
      // Wait for critical modules
      const modulePromises = [];
      
      // Check for navigation module
      if (document.querySelector('script[src*="nav-premium"]')) {
        modulePromises.push(
          window.BiblicalApp.loadModule(
            'Navigation',
            () => typeof window.initPremiumNav === 'function',
            10,
            100
          )
        );
      }
      
      // Check for character page module
      if (document.querySelector('script[src*="character-page"]')) {
        modulePromises.push(
          window.BiblicalApp.loadModule(
            'CharacterPage',
            () => typeof window.CharacterPage === 'function',
            10,
            200
          )
        );
      }
      
      // Wait for all modules
      await Promise.all(modulePromises);
      
      // Initialize in order
      await initializeNavigation();
      await initializeCharacterFeatures();
      await initializeAnimations();
      await initializeAccessibility();
      await initializeLazyLoading();
      await initializePerformanceMonitoring();
      
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
      
      // Log final metrics
      const loadTime = performance.now() - window.APP_CONFIG.performance.startTime;
      window.APP_CONFIG.performance.metrics.totalInitTime = loadTime;
      console.log(`✅ BiblicalApp initialization complete in ${Math.round(loadTime)}ms`);
      console.log('Modules loaded:', Object.keys(window.BiblicalApp.modules));
      
    } catch (error) {
      console.error('Initialization error:', error);
      fallbackInitialization();
    }
  };
  
  // ============================================
  // INITIALIZATION FUNCTIONS
  // ============================================
  
  async function initializeNavigation() {
    // Always prefer the premium navigation if available
    if (typeof window.initPremiumNav === 'function') {
      try {
        // Remove any existing navigation first
        const existingNav = document.querySelector('nav');
        if (existingNav) {
          console.log('Removing existing navigation for premium replacement');
          existingNav.remove();
        }
        
        // Initialize premium navigation
        window.initPremiumNav({
          currentPage: window.location.pathname,
          iconSystem: window.getIcon
        });
        
        window.APP_CONFIG.initialized.navigation = true;
        console.log('✓ Premium navigation initialized');
        return;
      } catch (e) {
        console.error('Premium navigation error:', e);
        // Fall through to fallback
      }
    }
    
    // Only use fallback if premium nav is not available or failed
    if (!document.querySelector('nav')) {
      console.log('Using fallback navigation');
      insertFallbackNav();
    }
  }
  
  function insertFallbackNav() {
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
          <li><a href="/characters/">Characters</a></li>
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
    
    // Basic mobile menu functionality
    const toggle = nav.querySelector('.mobile-menu-toggle');
    const navLinks = nav.querySelector('.nav-links');
    if (toggle && navLinks) {
      toggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
        toggle.classList.toggle('active');
      });
    }
    
    window.APP_CONFIG.initialized.navigation = true;
    console.log('✓ Fallback navigation inserted');
  }
  
  async function initializeCharacterFeatures() {
    // Timeline animations
    if (!window.APP_CONFIG.initialized.timelines) {
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        item.style.setProperty('--index', index);
      });
      window.APP_CONFIG.initialized.timelines = true;
    }
    
    // Wait for CharacterPage module if it exists
    if (document.querySelector('script[src*="character-page"]')) {
      await window.BiblicalApp.loadModule(
        'CharacterPage',
        () => typeof window.CharacterPage === 'function',
        10,
        200
      );
    }
    
    console.log('✓ Character features initialized');
  }
  
  async function initializeAnimations() {
    if (window.APP_CONFIG.initialized.animations) return;
    
    // Only add animations if IntersectionObserver is supported
    if (window.APP_CONFIG.capabilities.intersectionObserver) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('animate-in')) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
      
      // Store observer for cleanup
      window.BiblicalApp.modules.animationObserver = observer;
    }
    
    window.APP_CONFIG.initialized.animations = true;
    console.log('✓ Animations initialized');
  }
  
  async function initializeAccessibility() {
    if (window.APP_CONFIG.initialized.accessibility) return;
    
    // Skip link
    if (!document.querySelector('.skip-link')) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-link';
      skipLink.textContent = 'Skip to main content';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    // Ensure main content has ID
    const mainContent = document.querySelector('.content-section, main, [role="main"]');
    if (mainContent && !mainContent.id) {
      mainContent.id = 'main-content';
    }
    
    // Screen reader announcements
    if (!document.querySelector('.sr-only[aria-live]')) {
      const announcer = document.createElement('div');
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
      
      // Create announce function
      window.BiblicalApp.announce = function(message) {
        announcer.textContent = message;
        setTimeout(() => {
          announcer.textContent = '';
        }, 1000);
      };
    }
    
    // Focus visible polyfill
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
    
    // Back to top button
    if (!document.querySelector('.back-to-top')) {
      createBackToTopButton();
    }
    
    window.APP_CONFIG.initialized.accessibility = true;
    console.log('✓ Accessibility initialized');
  }
  
  function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = window.getIcon('chevron-up', { size: 24, color: 'white' });
    backToTop.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      if (window.BiblicalApp.announce) {
        window.BiblicalApp.announce('Scrolling to top of page');
      }
    });
    
    // Show/hide based on scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.pageYOffset > 500) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }, 100);
    }, { passive: true });
    
    window.APP_CONFIG.initialized.backToTop = true;
  }
  
  async function initializeLazyLoading() {
    if (window.APP_CONFIG.initialized.lazyLoader) return;
    
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px'
      });
      
      images.forEach(img => imageObserver.observe(img));
      window.BiblicalApp.modules.imageObserver = imageObserver;
    } else {
      // Fallback: load all images
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
    
    window.APP_CONFIG.initialized.lazyLoader = true;
    console.log('✓ Lazy loading initialized');
  }
  
  async function initializePerformanceMonitoring() {
    if (window.APP_CONFIG.initialized.performanceMonitor) return;
    
    // Track Core Web Vitals if available
    if ('PerformanceObserver' in window) {
      try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          window.APP_CONFIG.performance.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            window.APP_CONFIG.performance.metrics.fid = entries[0].processingStart - entries[0].startTime;
          }
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              window.APP_CONFIG.performance.metrics.cls = clsValue;
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('Performance monitoring not fully supported');
      }
    }
    
    window.APP_CONFIG.initialized.performanceMonitor = true;
    console.log('✓ Performance monitoring initialized');
  }
  
  function fallbackInitialization() {
    console.log('Running fallback initialization');
    
    // Ensure navigation
    if (!document.querySelector('nav')) {
      insertFallbackNav();
    }
    
    // Show all content
    fixContentVisibility();
    
    // Timeline setup
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
    
    // Basic back-to-top
    if (!document.querySelector('.back-to-top')) {
      createBackToTopButton();
    }
    
    window.APP_CONFIG.initialized.fallback = true;
  }
  
  // ============================================
  // AUTO-INITIALIZATION
  // ============================================
  
  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => window.BiblicalApp.initialize(), 50);
    });
  } else {
    // DOM already loaded
    setTimeout(() => window.BiblicalApp.initialize(), 50);
  }
  
  // ============================================
  // ERROR HANDLING
  // ============================================
  
  window.addEventListener('error', function(e) {
    if (e.target?.tagName === 'IMG' || e.target?.tagName === 'SCRIPT') {
      console.warn('Resource failed to load:', e.target?.src);
      return true;
    }
    console.error('Global error:', e.error);
    return true;
  });
  
  window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
  });
  
  // ============================================
  // FINAL CLEANUP & VERIFICATION
  // ============================================
  
  window.addEventListener('load', function() {
    setTimeout(() => {
      // Final checks
      if (!document.querySelector('nav')) {
        console.warn('Navigation still missing at load');
        insertFallbackNav();
      }
      
      // Ensure back-to-top exists
      if (!document.querySelector('.back-to-top')) {
        createBackToTopButton();
      }
      
      // Log final state
      console.log('=== Page Load Complete ===');
      console.log('Initialization flags:', window.APP_CONFIG.initialized);
      
      // Log performance metrics
      if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const domReadyTime = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        console.log(`⏱️ DOM Ready: ${domReadyTime}ms`);
        console.log(`⏱️ Page Load: ${pageLoadTime}ms`);
        
        // Log Core Web Vitals if collected
        if (window.APP_CONFIG.performance.metrics.lcp) {
          console.log(`📊 LCP: ${Math.round(window.APP_CONFIG.performance.metrics.lcp)}ms`);
        }
        if (window.APP_CONFIG.performance.metrics.fid) {
          console.log(`📊 FID: ${Math.round(window.APP_CONFIG.performance.metrics.fid)}ms`);
        }
        if (window.APP_CONFIG.performance.metrics.cls) {
          console.log(`📊 CLS: ${window.APP_CONFIG.performance.metrics.cls.toFixed(3)}`);
        }
      }
    }, 100);
  });
  
  // ============================================
  // PUBLIC API & DEBUG TOOLS
  // ============================================
  
  window.BiblicalApp.debug = {
    checkStatus: function() {
      console.table(window.APP_CONFIG.initialized);
    },
    
    listModules: function() {
      console.log('Loaded modules:', Object.keys(window.BiblicalApp.modules));
      return window.BiblicalApp.modules;
    },
    
    forceVisibility: function() {
      fixContentVisibility();
    },
    
    testIcons: function() {
      const testIcons = ['chevron-up', 'home', 'overview', 'crown', 'star'];
      testIcons.forEach(name => {
        console.log(`${name}:`, window.getIcon(name));
      });
    },
    
    checkPerformance: function() {
      console.log('Performance Metrics:', window.APP_CONFIG.performance.metrics);
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
    },
    
    reinitialize: function(module) {
      if (module === 'navigation' && typeof window.initPremiumNav === 'function') {
        window.initPremiumNav();
      } else if (module === 'all') {
        window.BiblicalApp.initialize();
      } else {
        console.log('Available modules: navigation, all');
      }
    }
  };
  
  // Expose version
  window.BiblicalApp.version = '1.3.0';
  
})();