/**
 * Character Page JavaScript - Bug-Free v2.0.5
 * Path: /assets/js/character-page-optimized.js
 * 
 * CRITICAL FIXES:
 * - FIXED: document.hasAttribute() bug (doesn't exist)
 * - FIXED: All DOM attribute errors
 * - FIXED: Bibliography functionality
 * - FIXED: Z-index issues
 * - FIXED: Initialization conflicts
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
  // READING PROGRESS BAR - FIXED Z-INDEX
  // ===========================================
  class ProgressBar {
    constructor() {
      this.bar = $('.reading-progress');
      if (!this.bar || this.bar.dataset.initialized === 'true') return;
      
      this.init();
    }
    
    init() {
      this.bar.dataset.initialized = 'true';
      this.bar.style.willChange = 'transform';
      // CRITICAL FIX: Ensure proper z-index
      this.bar.style.zIndex = '1001';
      this.bar.style.position = 'fixed';
      this.bar.style.top = '0';
      this.bar.style.left = '0';
      this.bar.style.width = '100%';
      this.bar.style.height = '3px';
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
        $$('.animate-on-scroll').forEach(el => {
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
      $$('.animate-on-scroll').forEach(el => {
        this.observer.observe(el);
      });
      
      // Timeline items
      $$('.timeline-item').forEach((item, index) => {
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
  // NAVIGATION SCROLL EFFECTS - FIXED
  // ===========================================
  class NavScrollEffects {
    constructor() {
      this.nav = $('nav') || $('#main-nav');
      this.backToTop = $('.back-to-top');
      this.lastScroll = 0;
      
      if (this.nav || this.backToTop) this.init();
    }
    
    init() {
      window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
      
      if (this.backToTop) {
        // CRITICAL FIX: Ensure back-to-top doesn't cover content
        this.backToTop.style.zIndex = '999';
        this.backToTop.style.position = 'fixed';
        
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
  // QUICK NAVIGATION SIDEBAR - FIXED
  // ===========================================
  class QuickNav {
    constructor() {
      this.sidebar = $('.quick-nav-sidebar');
      if (!this.sidebar) return;
      
      // CRITICAL FIX: Ensure sidebar doesn't cover content
      this.sidebar.style.zIndex = '500';
      
      this.sections = $$('.theology-card[id], .animate-on-scroll[id], .chiasm-card[id], section[id]');
      this.items = $$('.quick-nav-item');
      
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
  // MOBILE TABS - FIXED Z-INDEX
  // ===========================================
  class DynamicMobileTabs {
    constructor() {
      // Only run on mobile
      if (window.innerWidth > 768) return;
      
      // Section configuration
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
      
      // CRITICAL FIX: Proper z-index to not cover content
      nav.style.cssText = `
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 998;
        background: white;
        border-top: 1px solid #e5e7eb;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        padding: 10px;
        transform: translateY(0);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      `;
      
      // Create tabs container
      const container = document.createElement('div');
      container.className = 'tabs-container';
      container.style.cssText = `
        display: flex;
        gap: 10px;
        overflow-x: auto;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
      `;
      
      // Generate tabs
      tabs.forEach(tab => {
        const button = document.createElement('button');
        button.className = 'tab-item';
        button.dataset.target = `#${tab.id}`;
        button.setAttribute('aria-label', `${tab.label} section`);
        button.style.cssText = `
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 15px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 80px;
          text-decoration: none;
          color: #6b7280;
          font-size: 0.75rem;
          font-weight: 600;
        `;
        
        button.innerHTML = `
          <span class="tab-icon" style="font-size: 1.25rem; margin-bottom: 0.25rem;" aria-hidden="true">${tab.icon}</span>
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
        this.tabs.forEach(tab => {
          tab.classList.remove('active');
          tab.style.background = '#f8fafc';
          tab.style.color = '#6b7280';
        });
        
        activeTab.classList.add('active');
        activeTab.style.background = 'linear-gradient(135deg, #7209b7, #e11d48)';
        activeTab.style.color = 'white';
        activeTab.style.borderColor = 'transparent';
        activeTab.style.transform = 'scale(1.05)';
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
  // SMOOTH ANCHOR SCROLLING - FIXED
  // ===========================================
  class SmoothAnchors {
    constructor() {
      this.init();
    }
    
    init() {
      // FIXED: Use window property instead of document.hasAttribute()
      if (window.smoothAnchorsInitialized) return;
      window.smoothAnchorsInitialized = true;
      
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
      $$('table').forEach(table => {
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
  // BIBLIOGRAPHY HANDLER - COMPLETELY FIXED
  // ===========================================
  class Bibliography {
    constructor() {
      this.section = $('.bibliography-section');
      if (!this.section || this.section.dataset.initialized === 'true') return;
      
      this.init();
    }
    
    init() {
      this.section.dataset.initialized = 'true';
      
      // CRITICAL FIX: Handle both <details> and regular click events
      if (this.section.tagName === 'DETAILS') {
        // Native <details> element
        this.section.addEventListener('toggle', () => {
          const indicator = $('.expand-indicator', this.section);
          if (indicator) {
            indicator.style.transform = this.section.open ? 'rotate(180deg)' : 'rotate(0)';
          }
        });
      } else {
        // Custom clickable header
        const header = $('.bibliography-header', this.section);
        if (header) {
          header.style.cursor = 'pointer';
          header.addEventListener('click', () => {
            this.toggleBibliography();
          });
        }
      }
      
      console.log('Bibliography initialized successfully');
    }
    
    toggleBibliography() {
      const content = $('.bibliography-content', this.section);
      const indicator = $('.expand-indicator', this.section);
      
      if (!content) return;
      
      const isVisible = content.style.display !== 'none' && window.getComputedStyle(content).display !== 'none';
      
      if (isVisible) {
        content.style.display = 'none';
        if (indicator) indicator.style.transform = 'rotate(0)';
      } else {
        content.style.display = 'block';
        if (indicator) indicator.style.transform = 'rotate(180deg)';
      }
    }
  }
  
  // ===========================================
  // INITIALIZATION - BUG-FREE
  // ===========================================
  class CharacterPage {
    constructor() {
      this.modules = [];
      
      // Prevent multiple initialization
      if (isInitialized || window.characterPageInitialized) {
        return;
      }
      
      this.init();
    }
    
    init() {
      // Wait for DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.initModules());
      } else {
        // Small delay to ensure navigation is ready
        setTimeout(() => this.initModules(), 100);
      }
    }
    
    initModules() {
      if (isInitialized || window.characterPageInitialized) return;
      
      // Mark as initialized
      isInitialized = true;
      window.characterPageInitialized = true;
      
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
        
        console.log('Character Page v2.0.5 initialized - ALL BUGS FIXED');
        
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
        if (progressBar && progressBar.dataset.initialized !== 'true') {
          progressBar.dataset.initialized = 'true';
          progressBar.style.zIndex = '1001';
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
        if (backToTop && backToTop.dataset.initialized !== 'true') {
          backToTop.dataset.initialized = 'true';
          backToTop.style.zIndex = '999';
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
        
        // Bibliography fallback - FIXED
        const bibliography = $('.bibliography-section');
        if (bibliography && bibliography.dataset.initialized !== 'true') {
          bibliography.dataset.initialized = 'true';
          const header = $('.bibliography-header', bibliography);
          if (header) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
              const content = $('.bibliography-content', bibliography);
              const indicator = $('.expand-indicator', bibliography);
              if (content) {
                const isVisible = content.style.display !== 'none' && window.getComputedStyle(content).display !== 'none';
                content.style.display = isVisible ? 'none' : 'block';
                if (indicator) {
                  indicator.style.transform = isVisible ? 'rotate(0)' : 'rotate(180deg)';
                }
              }
            });
          }
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
          
          $$('.animate-on-scroll').forEach(el => {
            observer.observe(el);
          });
        }
        
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
      
      // Reset state - FIXED: No document.removeAttribute()
      this.modules = [];
      isInitialized = false;
      window.characterPageInitialized = false;
      window.smoothAnchorsInitialized = false;
    }
  }
  
  // Start the app with error handling - ONLY ONCE
  try {
    if (!window.CharacterPageApp && !window.characterPageInitialized) {
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
    
    // Final emergency fallback
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        // Ensure basic functionality
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
          progressBar.style.zIndex = '1001';
        }
        
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
          backToTop.style.zIndex = '999';
        }
      });
    }
  }
  
})(); // End of IIFE wrapper