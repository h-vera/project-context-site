/**
 * CONSOLIDATED INITIALIZATION SCRIPT - COMPLETE VERSION
 * Path: /assets/js/consolidated-init.js
 * Purpose: Initialize core app infrastructure BEFORE other scripts
 * Version: 1.5.0 - Complete with all required functionality
 * 
 * LOAD ORDER: This MUST load first, before nav-premium.js and character-page-v2.js
 */

(function() {
  'use strict';
  
  console.log('Consolidated Init v1.5.0 starting...');
  
  // ============================================
  // GLOBAL NAMESPACE SETUP - DO THIS FIRST
  // ============================================
  window.BiblicalApp = window.BiblicalApp || {
    version: '1.5.0',
    modules: {},
    readyCallbacks: [],
    isReady: false
  };
  
  window.APP_CONFIG = window.APP_CONFIG || {
    version: '6.0-complete',
    template: 'character-page',
    capabilities: {
      svg: true,
      intersectionObserver: 'IntersectionObserver' in window,
      smoothScroll: 'scrollBehavior' in document.documentElement.style,
      customElements: 'customElements' in window,
      cssVariables: CSS && CSS.supports && CSS.supports('--test', '0')
    },
    initialized: {
      core: false,
      iconSystem: false,
      navigation: false,
      mobileTabs: false,
      progressNav: false,
      premiumEffects: false,
      animations: false,
      smoothScroll: false,
      backToTop: false,
      keyboardNav: false
    }
  };

  // ============================================
  // DEVICE DETECTION
  // ============================================
  const detectDevice = function() {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    
    // iOS detection
    const iOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    if (iOS) {
      document.documentElement.classList.add('is-ios');
    }
    
    // Mobile detection
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    if (mobile) {
      document.documentElement.classList.add('is-mobile');
    }
    
    // Touch device detection
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      document.documentElement.classList.add('touch-device');
    }
    
    return { iOS, mobile };
  };

  // ============================================
  // EMOJI ICON LIBRARY
  // ============================================
  window.EmojiIcons = {
    // Navigation/Section icons
    'overview': '📋',
    'narrative': '📖',
    'literary': '✍️',
    'themes': '🎯',
    'theology': '⛪',
    'application': '💡',
    'questions': '❓',
    'crown': '👑',
    'scroll': '📜',
    
    // UI icons
    'menu': '☰',
    'close': '✕',
    'home': '🏠',
    'chevron-up': '⬆️',
    'chevron-down': '⬇️',
    'arrow-right': '→',
    'arrow-left': '←',
    'user': '👤',
    'users': '👥',
    'search': '🔍',
    'star': '⭐',
    'heart': '❤️',
    'check': '✓',
    'x': '✗',
    'info': 'ℹ️',
    'alert': '⚠️',
    'settings': '⚙️',
    'download': '⬇️',
    'external': '↗️',
    'calendar': '📅',
    'clock': '🕐'
  };

  // ============================================
  // SVG ICON TEMPLATES (as strings)
  // ============================================
  window.SVGIconLibrary = {
    'chevron-up': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>',
    'chevron-down': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    'menu': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>',
    'close': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
    'home': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    'user': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
    'users': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>'
  };

  // ============================================
  // GLOBAL ICON FUNCTION
  // ============================================
  window.getIcon = function(name, options = {}) {
    options = Object.assign({
      size: 20,
      color: 'currentColor',
      useSVG: true,
      useEmoji: false
    }, options);
    
    // Force emoji if requested or if SVG not supported
    if (options.useEmoji || !window.APP_CONFIG.capabilities.svg) {
      const emoji = window.EmojiIcons[name];
      if (emoji) {
        if (options.size) {
          return `<span class="icon-emoji" style="font-size: ${options.size}px">${emoji}</span>`;
        }
        return `<span class="icon-emoji">${emoji}</span>`;
      }
    }
    
    // Try SVG from library first
    if (options.useSVG && window.SVGIconLibrary[name]) {
      const svg = window.SVGIconLibrary[name];
      const wrapper = document.createElement('div');
      wrapper.innerHTML = svg;
      const svgEl = wrapper.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('width', options.size);
        svgEl.setAttribute('height', options.size);
        if (options.color) {
          svgEl.style.color = options.color;
        }
        return wrapper.innerHTML;
      }
    }
    
    // Try CSS-based SVG icons (from global-v3.css)
    if (options.useSVG !== false) {
      const sizeClass = getSizeClass(options.size);
      return `<span class="icon-svg ${sizeClass}" data-icon="${name}"></span>`;
    }
    
    // Final fallback to emoji
    const emoji = window.EmojiIcons[name] || '📄';
    if (options.size) {
      return `<span class="icon-emoji" style="font-size: ${options.size}px">${emoji}</span>`;
    }
    return `<span class="icon-emoji">${emoji}</span>`;
  };
  
  function getSizeClass(size) {
    if (size <= 16) return 'icon-sm';
    if (size <= 20) return 'icon-md';
    if (size <= 24) return 'icon-lg';
    return 'icon-xl';
  }

  // ============================================
  // READY CALLBACK SYSTEM
  // ============================================
  window.BiblicalApp.onReady = function(callback) {
    if (typeof callback !== 'function') return;
    
    if (window.BiblicalApp.isReady) {
      // Already ready, execute immediately
      callback();
    } else {
      // Queue for later
      window.BiblicalApp.readyCallbacks.push(callback);
    }
  };
  
  window.BiblicalApp.triggerReady = function() {
    if (window.BiblicalApp.isReady) return;
    
    window.BiblicalApp.isReady = true;
    
    // Execute all queued callbacks
    window.BiblicalApp.readyCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.error('Ready callback error:', error);
      }
    });
    
    // Clear the queue
    window.BiblicalApp.readyCallbacks = [];
  };

  // ============================================
  // SCREEN READER ANNOUNCEMENTS
  // ============================================
  window.BiblicalApp.announce = function(message, priority = 'polite') {
    let announcer = document.querySelector('.sr-only[aria-live]');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', priority);
      announcer.setAttribute('aria-atomic', 'true');
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
    
    // Clear after a short delay
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  };

  // ============================================
  // PERFORMANCE UTILITIES
  // ============================================
  window.BiblicalApp.debounce = function(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  window.BiblicalApp.throttle = function(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // ============================================
  // SCROLL UTILITIES
  // ============================================
  window.BiblicalApp.smoothScrollTo = function(target, offset = 80) {
    if (typeof target === 'string') {
      target = document.querySelector(target);
    }
    
    if (!target) return;
    
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
    
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback for browsers without smooth scroll
      window.smoothScrollPolyfill(targetPosition, 400);
    }
  };
  
  // Simple smooth scroll polyfill
  window.smoothScrollPolyfill = function(endY, duration = 400) {
    const startY = window.scrollY;
    const distance = endY - startY;
    const startTime = performance.now();
    
    function scroll() {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easing = progress * (2 - progress); // easeOutQuad
      
      window.scrollTo(0, startY + distance * easing);
      
      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    }
    
    requestAnimationFrame(scroll);
  };

  // ============================================
  // LOCAL STORAGE UTILITIES
  // ============================================
  window.BiblicalApp.storage = {
    set: function(key, value) {
      try {
        localStorage.setItem('biblical_' + key, JSON.stringify(value));
        return true;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return false;
      }
    },
    
    get: function(key, defaultValue = null) {
      try {
        const item = localStorage.getItem('biblical_' + key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return defaultValue;
      }
    },
    
    remove: function(key) {
      try {
        localStorage.removeItem('biblical_' + key);
        return true;
      } catch (e) {
        console.warn('LocalStorage not available:', e);
        return false;
      }
    }
  };

  // ============================================
  // LAZY LOADING UTILITIES
  // ============================================
  window.BiblicalApp.lazyLoad = function(selector = 'img[data-src]') {
    const images = document.querySelectorAll(selector);
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.classList.add('loaded');
              delete img.dataset.src;
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
      return imageObserver;
    } else {
      // Fallback: load all images immediately
      images.forEach(img => {
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.add('loaded');
          delete img.dataset.src;
        }
      });
      return null;
    }
  };

  // ============================================
  // FEATURE DETECTION HELPERS
  // ============================================
  window.BiblicalApp.supports = {
    touch: 'ontouchstart' in window,
    pointer: 'PointerEvent' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    mutationObserver: 'MutationObserver' in window,
    smoothScroll: 'scrollBehavior' in document.documentElement.style,
    customProperties: CSS && CSS.supports && CSS.supports('--test', '0'),
    grid: CSS && CSS.supports && CSS.supports('display', 'grid'),
    sticky: CSS && CSS.supports && CSS.supports('position', 'sticky'),
    backdropFilter: CSS && CSS.supports && CSS.supports('backdrop-filter', 'blur(10px)'),
    webp: false // Will be detected asynchronously
  };
  
  // Async WebP detection
  (function() {
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      window.BiblicalApp.supports.webp = webP.height === 2;
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  })();

  // ============================================
  // ANALYTICS HELPER
  // ============================================
  window.BiblicalApp.track = function(event, parameters = {}) {
    // Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event, parameters);
    }
    
    // Custom analytics
    if (window.BiblicalApp.analytics) {
      window.BiblicalApp.analytics(event, parameters);
    }
    
    // Console log in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log("Track:", event, parameters);
    }
  };

  // ============================================
  // ERROR HANDLING
  // ============================================
  window.BiblicalApp.handleError = function(error, context = '') {
    console.error(`Error in ${context}:`, error);
    
    // Track error
    window.BiblicalApp.track('error', {
      error_message: error.message || error,
      error_context: context,
      error_stack: error.stack
    });
    
    // User notification for critical errors
    if (context.includes('critical')) {
      window.BiblicalApp.announce('An error occurred. Please refresh the page.');
    }
  };

  // ============================================
  // INITIALIZE CORE FEATURES
  // ============================================
  function initializeCore() {
    console.log('Initializing core features...');
    
    // Device detection
    const device = detectDevice();
    window.BiblicalApp.device = device;
    
    // Add JavaScript enabled class
    document.documentElement.classList.add('js-enabled');
    document.documentElement.classList.remove('no-js');
    
    // Initialize lazy loading for existing images
    if (document.querySelector('img[data-src]')) {
      window.BiblicalApp.lazyLoad();
    }
    
    // Set up global error handlers
    window.addEventListener('error', function(e) {
      window.BiblicalApp.handleError(e.error || e, 'global');
    });
    
    window.addEventListener('unhandledrejection', function(e) {
      window.BiblicalApp.handleError(e.reason, 'promise');
    });
    
    // Mark core as initialized
    window.APP_CONFIG.initialized.core = true;
    window.APP_CONFIG.initialized.iconSystem = true;
    
    console.log('✅ Core features initialized');
    console.log('Device:', device);
    console.log('Capabilities:', window.APP_CONFIG.capabilities);
    console.log('Browser support:', window.BiblicalApp.supports);
  }

  // ============================================
  // DOM READY INITIALIZATION
  // ============================================
  function onDOMReady() {
    console.log('DOM Ready - initializing consolidated features');
    
    // Initialize core
    initializeCore();
    
    // Trigger ready callbacks
    window.BiblicalApp.triggerReady();
    
    // Log final status
    console.log('✅ Consolidated Init v1.5.0 complete');
    console.log('Global namespace ready:', window.BiblicalApp);
    console.log('Icon system ready: getIcon() available');
    console.log('Ready for nav-premium.js and character-page-v2.js');
  }

  // ============================================
  // INITIALIZATION TRIGGER
  // ============================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onDOMReady);
  } else {
    // DOM already loaded
    onDOMReady();
  }

})();

// ============================================
// POLYFILLS
// ============================================

// Element.matches polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

// Element.closest polyfill
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// CustomEvent polyfill
(function() {
  if (typeof window.CustomEvent === "function") return false;
  
  function CustomEvent(event, params) {
    params = params || { bubbles: false, cancelable: false, detail: null };
    var evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
    return evt;
  }
  
  window.CustomEvent = CustomEvent;
})();

console.log('Consolidated Init v1.5.0 loaded and ready');