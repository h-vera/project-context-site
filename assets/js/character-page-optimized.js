/**
 * Character Page Optimized JavaScript - FIXED VERSION
 * Path: /assets/js/character-page-optimized.js
 * Version: 2.0.3 - CONFLICT FIXES
 * 
 * FIXES:
 * - Fixed DOM ready state check conflicts
 * - Simplified mobile tab generation logic
 * - Removed redundant initialization calls
 * - Fixed scroll hide/show timing
 * - Cleaned up error handling
 * - Removed duplicate event listeners
 */

(function() {
  'use strict';
  
  // Performance: Single RAF instance for all animations
  let rafId = null;
  let scrollTimeout = null;
  let isInitialized = false;
  
  // Cache DOM queries
  const cache = new Map();
  
  function $(selector, context = document) {
    const key = `${context === document ? 'doc' : 'ctx'}-${selector}`;
    if (!cache.has(key)) {
      cache.set(key, context.querySelector(selector));
    }
    return cache.get(key);
  }
  
  function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }
  
  // ===========================================
  // READING PROGRESS BAR
  // ===========================================
  class ProgressBar {
    constructor() {
      this.bar = $('.reading-progress');
      if (!this.bar || this.bar.hasAttribute('data-initialized')) return;
      
      this.init();
    }
    
    init() {
      this.bar.setAttribute('data-initialized', 'true');
      this.bar.style.willChange = 'transform';
      this.update();
      window.addEventListener('scroll', () => this.throttledUpdate(), { passive: true });
    }
    
    throttledUpdate() {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        this.update();
        rafId = null;
      });
    }
    
    update() {
      const winScroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(winScroll / height, 1);
      this.bar.style.transform = `scaleX(${scrolled})`;
      this.bar.setAttribute('aria-valuenow', Math.round(scrolled * 100));
    }
  }
  
  // ===========================================
  // INTERSECTION OBSERVER FOR ANIMATIONS
  // ===========================================
  class ScrollAnimator {
    constructor() {
      this.options = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      };
      
      this.init();
    }
    
    init() {
      if (!('IntersectionObserver' in window)) {
        // Fallback for older browsers
        $('.animate-on-scroll').forEach(el => {
          el.classList.add('visible');
        });
        return;
      }
      
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Don't unobserve immediately - let animation complete
            setTimeout(() => {
              this.observer.unobserve(entry.target);
            }, 600);
          }
        });
      }, this.options);
      
      // Observe all animated elements
      $('.animate-on-scroll').forEach(el => {
        this.observer.observe(el);
      });
      
      // Timeline items
      $('.timeline-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
        this.observer.observe(item);
      });
    }
    
    destroy() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }
  
  // ===========================================
  // NAVIGATION SCROLL EFFECTS - SIMPLIFIED
  // ===========================================
  class NavScrollEffects {
    constructor() {
      this.nav = $('nav');
      this.backToTop = $('.back-to-top');
      this.lastScroll = 0;
      
      if (this.nav || this.backToTop) this.init();
    }
    
    init() {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
      
      if (this.backToTop) {
        this.backToTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      }
    }
    
    handleScroll() {
      if (scrollTimeout) return;
      
      scrollTimeout = requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;
        
        // Nav shadow
        if (this.nav) {
          if (currentScroll > 100) {
            this.nav.classList.add('scrolled');
          } else {
            this.nav.classList.remove('scrolled');
          }
        }
        
        // Back to top visibility
        if (this.backToTop) {
          if (currentScroll > 500) {
            this.backToTop.classList.add('visible');
          } else {
            this.backToTop.classList.remove('visible');
          }
        }
        
        this.lastScroll = currentScroll;
        scrollTimeout = null;
      });
    }
  }
  
  // ===========================================
  // QUICK NAVIGATION SIDEBAR - SIMPLIFIED
  // ===========================================
  class QuickNav {
    constructor() {
      this.sidebar = $('.quick-nav-sidebar');
      if (!this.sidebar) return;
      
      this.sections = $('.theology-card[id], .animate-on-scroll[id], .chiasm-card[id], section[id]');
      this.items = $('.quick-nav-item');
      
      if (this.sections.length && this.items.length) this.init();
    }
    
    init() {
      // Click handlers
      this.items.forEach(item => {
        item.addEventListener('click', () => {
          const target = $(item.dataset.target);
          if (target) {
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        });
      });
      
      // Scroll spy
      window.addEventListener('scroll', () => this.updateActive(), { passive: true });
      this.updateActive();
    }
    
    updateActive() {
      const scrollPos = window.pageYOffset + 200;
      
      let currentSection = null;
      this.sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
          currentSection = section.id;
        }
      });
      
      this.items.forEach(item => {
        const isActive = item.dataset.target === `#${currentSection}`;
        item.classList.toggle('active', isActive);
      });
    }
  }
  
  // ===========================================
  // MOBILE TABS - SIMPLIFIED & FIXED
  // ===========================================
  class DynamicMobileTabs {
    constructor() {
      // Only run on mobile
      if (window.innerWidth > 768) return;
      
      // Section configuration - SIMPLIFIED
      this.sectionConfig = [
        { id: 'structure', icon: '🏗️', label: 'Structure', priority: 1 },
        { id: 'scene-rhythm', icon: '🎭', label: 'Scenes', priority: 2 },
        { id: 'legal', icon: '⚖️', label: 'Legal', priority: 2 },
        { id: 'major-chiasm', icon: '🔍', label: 'Chiasm', priority: 2 },
        { id: 'devices', icon: '🎨', label: 'Devices', priority: 3 },
        { id: 'abrahamic-parallel', icon: '🌟', label: 'Abraham', priority: 3 },
        { id: 'dialogue', icon: '💬', label: 'Dialogue', priority: 3 },
        { id: 'chorus', icon: '👥', label: 'Chorus', priority: 4 },
        { id: 'characters', icon: '👤', label: 'Characters', priority: 2 },
        { id: 'bibliography', icon: '📚', label: 'Sources', priority: 5 }
      ];
      
      this.maxTabs = 5;
      this.lastScrollY = 0;
      this.isHidden = false;
      this.hideTimeout = null;
      
      this.init();
      
      // Reinitialize on resize
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 768 && !this.container) {
          this.init();
        } else if (window.innerWidth > 768 && this.container) {
          this.destroy();
        }
      });
    }
    
    init() {
      try {
        const presentSections = this.detectSections();
        if (presentSections.length === 0) return;
        
        const selectedTabs = this.selectTabs(presentSections);
        this.generateNavigation(selectedTabs);
        this.setupEventListeners();
        this.setupScrollHide();
      } catch (error) {
        console.warn('Mobile tabs initialization failed:', error);
      }
    }
    
    detectSections() {
      const presentSections = [];
      
      this.sectionConfig.forEach(config => {
        const element = document.getElementById(config.id) || 
                       document.querySelector(`[id="${config.id}"]`) ||
                       document.querySelector(`.${config.id}`);
        
        if (element) {
          presentSections.push(config);
        }
      });
      
      return presentSections;
    }
    
    selectTabs(sections) {
      if (sections.length <= this.maxTabs) {
        return sections;
      }
      
      // Sort by priority and select top 5
      const sorted = sections.sort((a, b) => a.priority - b.priority);
      return sorted.slice(0, this.maxTabs);
    }
    
    generateNavigation(tabs) {
      // Remove existing tabs first
      const existingTabs = document.querySelector('.mobile-section-tabs');
      if (existingTabs) {
        existingTabs.remove();
      }
      
      // Create container
      const nav = document.createElement('nav');
      nav.className = 'mobile-section-tabs dynamic-tabs';
      nav.setAttribute('aria-label', 'Section navigation');
      
      // Add smooth transform
      nav.style.willChange = 'transform';
      nav.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      
      // Create tabs container
      const container = document.createElement('div');
      container.className = 'tabs-container';
      
      // Generate tabs
      tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = 'tab-item';
        button.dataset.target = `#${tab.id}`;
        button.setAttribute('aria-label', `${tab.label} section`);
        
        button.innerHTML = `
          <span class="tab-icon" aria-hidden="true">${tab.icon}</span>
          <span class="tab-label">${tab.label}</span>
        `;
        
        container.appendChild(button);
      });
      
      nav.appendChild(container);
      document.body.appendChild(nav);
      
      this.container = nav;
      this.tabContainer = container;
      this.tabs = Array.from(container.querySelectorAll('.tab-item'));
      
      // Set initial active state
      this.updateActive();
    }
    
    setupEventListeners() {
      // Click handlers for tabs
      this.tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = tab.dataset.target;
          const target = document.querySelector(targetId);
          
          if (target) {
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: offset, behavior: 'smooth' });
          }
        });
      });
      
      // Update active tab on scroll
      window.addEventListener('scroll', () => this.updateActive(), { passive: true });
    }
    
    setupScrollHide() {
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            this.handleScrollHide();
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
    
    handleScrollHide() {
      const currentScrollY = window.pageYOffset;
      const scrollDiff = currentScrollY - this.lastScrollY;
      
      // Only act if scroll is significant
      if (Math.abs(scrollDiff) < 10) return;
      
      // Clear any pending timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      
      // Hide on scroll down, show on scroll up
      if (scrollDiff > 0 && currentScrollY > 200) {
        // Scrolling down - hide with delay
        if (!this.isHidden) {
          this.hideTimeout = setTimeout(() => {
            if (this.container) {
              this.container.style.transform = 'translateY(100%)';
              this.isHidden = true;
            }
          }, 200);
        }
      } else if (scrollDiff < 0) {
        // Scrolling up - show immediately
        if (this.isHidden && this.container) {
          this.container.style.transform = 'translateY(0)';
          this.isHidden = false;
        }
      }
      
      // Always show at top
      if (currentScrollY < 100 && this.isHidden && this.container) {
        this.container.style.transform = 'translateY(0)';
        this.isHidden = false;
      }
      
      this.lastScrollY = currentScrollY;
    }
    
    updateActive() {
      if (!this.tabs || this.tabs.length === 0) return;
      
      const scrollPos = window.pageYOffset + 150;
      let activeTab = null;
      
      this.tabs.forEach(tab => {
        const targetId = tab.dataset.target;
        const target = document.querySelector(targetId);
        
        if (target && target.offsetTop <= scrollPos) {
          activeTab = tab;
        }
      });
      
      if (activeTab) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');
      }
    }
    
    destroy() {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      
      if (this.container) {
        this.container.remove();
        this.container = null;
        this.tabContainer = null;
        this.tabs = [];
      }
    }
  }
  
  // ===========================================
  // SMOOTH ANCHOR SCROLLING
  // ===========================================
  class SmoothAnchors {
    constructor() {
      this.init();
    }
    
    init() {
      // Avoid duplicate listeners
      if (document.hasAttribute('data-smooth-anchors')) return;
      document.setAttribute('data-smooth-anchors', 'true');
      
      document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
        e.preventDefault();
        const target = $(link.getAttribute('href'));
        
        if (target) {
          // Close mobile menu if open
          const mobileToggle = $('.mobile-menu-toggle');
          const navLinks = $('.nav-links');
          
          if (mobileToggle && mobileToggle.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
          
          // Scroll to target
          const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    }
  }
  
  // ===========================================
  // TABLE WRAPPER
  // ===========================================
  class TableWrapper {
    constructor() {
      this.init();
    }
    
    init() {
      $('table').forEach(table => {
        if (table.parentElement.classList.contains('table-wrapper')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'table-wrapper';
        wrapper.style.overflowX = 'auto';
        wrapper.style.webkitOverflowScrolling = 'touch';
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    }
  }
  
  // ===========================================
  // BIBLIOGRAPHY HANDLER
  // ===========================================
  class Bibliography {
    constructor() {
      this.section = $('.bibliography-section');
      if (!this.section || this.section.hasAttribute('data-initialized')) return;
      
      this.init();
    }
    
    init() {
      this.section.setAttribute('data-initialized', 'true');
      
      this.section.addEventListener('toggle', () => {
        const indicator = $('.expand-indicator', this.section);
        if (indicator) {
          indicator.style.transform = this.section.open ? 'rotate(180deg)' : 'rotate(0)';
        }
      });
    }
  }
  
  // ===========================================
  // INITIALIZATION - SIMPLIFIED
  // ===========================================
  class CharacterPage {
    constructor() {
      this.modules = [];
      
      // Prevent multiple initialization
      if (isInitialized || document.hasAttribute('data-character-page-init')) {
        return;
      }
      
      this.init();
    }
    
    init() {
      // Wait for DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initModules());
      } else {
        this.initModules();
      }
    }
    
    initModules() {
      if (isInitialized) return;
      
      // Mark as initialized
      isInitialized = true;
      document.setAttribute('data-character-page-init', 'true');
      
      try {
        // Initialize modules with error handling
        this.modules.push(
          new ProgressBar(),
          new ScrollAnimator(),
          new NavScrollEffects(),
          new QuickNav(),
          new DynamicMobileTabs(),
          new SmoothAnchors(),
          new TableWrapper(),
          new Bibliography()
        );
        
        console.log('Character Page Optimized v2.0.3 initialized - Fixed conflicts');
        
      } catch (error) {
        console.error('Error initializing Character Page modules:', error);
        this.fallbackInit();
      }
    }
    
    fallbackInit() {
      // Basic functionality fallbacks
      try {
        // Progress bar
        const progressBar = $('.reading-progress');
        if (progressBar && !progressBar.hasAttribute('data-initialized')) {
          progressBar.setAttribute('data-initialized', 'true');
          const updateProgress = () => {
            const winScroll = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.min(winScroll / height, 1);
            progressBar.style.transform = `scaleX(${scrolled})`;
            progressBar.setAttribute('aria-valuenow', Math.round(scrolled * 100));
          };
          
          window.addEventListener('scroll', updateProgress, { passive: true });
          updateProgress();
        }
        
        // Back to top
        const backToTop = $('.back-to-top');
        if (backToTop && !backToTop.hasAttribute('data-initialized')) {
          backToTop.setAttribute('data-initialized', 'true');
          backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
          
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
              backToTop.classList.add('visible');
            } else {
              backToTop.classList.remove('visible');
            }
          }, { passive: true });
        }
        
        // Basic animations
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        
        $('.animate-on-scroll').forEach(el => {
          observer.observe(el);
        });
        
      } catch (fallbackError) {
        console.error('Fallback initialization failed:', fallbackError);
      }
    }
    
    cleanup() {
      console.log('Cleaning up Character Page modules...');
      
      this.modules.forEach(module => {
        try {
          if (module.observer) {
            module.observer.disconnect();
          }
          if (module.destroy) {
            module.destroy();
          }
        } catch (error) {
          console.warn('Error cleaning up module:', error);
        }
      });
      
      // Clear the cache
      cache.clear();
      
      // Clear RAF if pending
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      
      if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
        scrollTimeout = null;
      }
      
      // Reset state
      this.modules = [];
      isInitialized = false;
      document.removeAttribute('data-character-page-init');
    }
  }
  
  // Start the app with error handling - ONLY ONCE
  try {
    if (!window.CharacterPageApp) {
      window.CharacterPageApp = new CharacterPage();
      
      // Add cleanup on page unload
      window.addEventListener('beforeunload', () => {
        if (window.CharacterPageApp && window.CharacterPageApp.cleanup) {
          window.CharacterPageApp.cleanup();
        }
      });
    }
    
  } catch (initError) {
    console.error('Failed to initialize Character Page:', initError);
    
    // Final fallback - ensure basic functionality
    document.addEventListener('DOMContentLoaded', () => {
      // Basic progress bar
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        const updateProgress = () => {
          const winScroll = window.pageYOffset;
          const height = document.documentElement.scrollHeight - window.innerHeight;
          const scrolled = Math.min(winScroll / height, 1);
          progressBar.style.transform = `scaleX(${scrolled})`;
        };
        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
      }
      
      // Basic back to top
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        backToTop.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        window.addEventListener('scroll', () => {
          if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
          } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
          }
        }, { passive: true });
      }
      
      // Basic animations
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
          observer.observe(el);
        });
      }
    });
  }
  
})(); // End of IIFE wrapper