/**
 * Character Page Optimized JavaScript with Auto-Generating Mobile Tabs
 * Path: /assets/js/character-page-optimized.js
 * Version: 2.0.1 - FIXED MOBILE FLICKERING
 * 
 * FIXES:
 * - Debounced scroll events to prevent flickering
 * - Added will-change CSS for smoother animations
 * - Fixed scroll direction detection
 * - Added threshold to prevent jitter
 * - Removed aggressive hide/show on small scroll movements
 */

(function() {
  'use strict';
  
  // Performance: Single RAF instance for all animations
  let rafId = null;
  let scrollTimeout = null;
  
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
      if (!this.bar) return;
      
      this.init();
    }
    
    init() {
      // Use transform for better performance than width
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
      if (!('IntersectionObserver' in window)) return;
      
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
      
      // Timeline items with staggered animation
      $$('.timeline-item').forEach((item, index) => {
        item.style.setProperty('--index', index);
        this.observer.observe(item);
      });
    }
  }
  
  // ===========================================
  // NAVIGATION SCROLL EFFECTS
  // ===========================================
  class NavScrollEffects {
    constructor() {
      this.nav = $('nav');
      this.backToTop = $('.back-to-top');
      this.lastScroll = 0;
      
      if (this.nav) this.init();
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
        if (currentScroll > 100) {
          this.nav.classList.add('scrolled');
        } else {
          this.nav.classList.remove('scrolled');
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
  // QUICK NAVIGATION SIDEBAR
  // ===========================================
  class QuickNav {
    constructor() {
      this.sidebar = $('.quick-nav-sidebar');
      if (!this.sidebar) return;
      
      this.sections = $$('.theology-card[id], .animate-on-scroll[id], .chiasm-card[id], .abrahamic-parallel[id], .characters-section[id]');
      this.items = $$('.quick-nav-item');
      
      if (this.sections.length) this.init();
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
  // AUTO-GENERATING MOBILE TABS (v2.0) - FIXED
  // Dynamic generation based on present sections
  // ===========================================
  class DynamicMobileTabs {
    constructor() {
      // Section configuration with priorities
      this.sectionConfig = [
        // Core sections (Priority 1-2)
        { id: 'overview', icon: '📋', label: 'Overview', priority: 1 },
        { id: 'structure', icon: '🏗️', label: 'Structure', priority: 1 },
        { id: 'narrative', icon: '📖', label: 'Journey', priority: 2 },
        { id: 'scene-rhythm', icon: '🎭', label: 'Scenes', priority: 2 },
        { id: 'legal', icon: '⚖️', label: 'Legal', priority: 3 },
        { id: 'literary-context', icon: '📚', label: 'Literary', priority: 3 },
        { id: 'themes', icon: '💡', label: 'Themes', priority: 3 },
        { id: 'devices', icon: '🎨', label: 'Devices', priority: 3 },
        { id: 'ane-context', icon: '🌍', label: 'ANE', priority: 4 },
        { id: 'biblical-theology', icon: '⛪', label: 'Theology', priority: 2 },
        { id: 'messianic', icon: '✨', label: 'Messianic', priority: 3 },
        { id: 'application', icon: '🎯', label: 'Apply', priority: 2 },
        { id: 'questions', icon: '❓', label: 'Questions', priority: 4 },
        
        // Optional sections (Priority 4-5)
        { id: 'chiasm', icon: '🔄', label: 'Chiasm', priority: 4 },
        { id: 'major-chiasm', icon: '🔍', label: 'Chiasm', priority: 2 },
        { id: 'dialogue', icon: '💬', label: 'Dialogue', priority: 3 },
        { id: 'chorus', icon: '👥', label: 'Chorus', priority: 4 },
        { id: 'characters', icon: '👤', label: 'Characters', priority: 2 },
        { id: 'abrahamic-parallel', icon: '🌟', label: 'Abraham', priority: 3 },
        { id: 'literary-artistry', icon: '🎨', label: 'Artistry', priority: 5 },
        { id: 'eden', icon: '🌳', label: 'Eden', priority: 5 },
        { id: 'wordplay', icon: '✍️', label: 'Wordplay', priority: 5 },
        { id: 'covenant', icon: '💍', label: 'Covenant', priority: 5 },
        { id: 'unique', icon: '⭐', label: 'Unique', priority: 5 },
        { id: 'second-temple', icon: '🏛️', label: '2nd Temple', priority: 5 },
        { id: 'songs', icon: '🎵', label: 'Songs', priority: 4 },
        { id: 'intertext', icon: '🔗', label: 'Intertext', priority: 4 },
        { id: 'bibliography', icon: '📚', label: 'Sources', priority: 5 },
        { id: 'further-study', icon: '📖', label: 'Study', priority: 4 },
        
        // Character-specific sections
        { id: 'prophetic-messages', icon: '📜', label: 'Prophecy', priority: 3 },
        { id: 'reign-summary', icon: '👑', label: 'Reign', priority: 3 },
        { id: 'gender-dynamics', icon: '👩', label: 'Gender', priority: 4 }
      ];
      
      this.maxTabs = 5; // Maximum tabs for mobile usability
      this.lastScrollY = 0;
      this.isHidden = false;
      this.scrollDirection = null;
      this.scrollThreshold = 5; // Minimum scroll distance to trigger hide/show
      this.hideTimeout = null;
      
      // Only initialize on mobile
      if (window.innerWidth <= 768) {
        this.init();
      }
      
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
      // Detect present sections
      const presentSections = this.detectSections();
      
      if (presentSections.length === 0) return;
      
      // Select tabs based on priority
      const selectedTabs = this.selectTabs(presentSections);
      
      // Generate and insert navigation
      this.generateNavigation(selectedTabs);
      
      // Initialize functionality
      this.setupEventListeners();
      this.setupScrollHide();
    }
    
    detectSections() {
      const presentSections = [];
      
      this.sectionConfig.forEach(config => {
        // Check multiple possible selectors for each section
        const selectors = [
          `#${config.id}`,
          `[id="${config.id}"]`,
          `.theology-card#${config.id}`,
          `.chiasm-card#${config.id}`,
          `section#${config.id}`,
          `.${config.id}`
        ];
        
        const exists = selectors.some(selector => {
          try {
            return document.querySelector(selector) !== null;
          } catch (e) {
            return false;
          }
        });
        
        if (exists) {
          presentSections.push(config);
        }
      });
      
      console.log(`Dynamic Mobile Tabs: Found ${presentSections.length} sections`);
      return presentSections;
    }
    
    selectTabs(sections) {
      // If 5 or fewer, use all
      if (sections.length <= this.maxTabs) {
        return sections;
      }
      
      // Sort by priority, then select top 5
      const sorted = sections.sort((a, b) => {
        // Always include Overview or Structure if present
        if (a.id === 'overview' || a.id === 'structure') return -1;
        if (b.id === 'overview' || b.id === 'structure') return 1;
        
        // Then sort by priority
        return a.priority - b.priority;
      });
      
      const selected = sorted.slice(0, this.maxTabs);
      console.log(`Dynamic Mobile Tabs: Selected ${selected.length} high-priority tabs`);
      
      return selected;
    }
    
    generateNavigation(tabs) {
      // Create container
      const nav = document.createElement('nav');
      nav.className = 'mobile-section-tabs dynamic-tabs';
      nav.setAttribute('aria-label', 'Section navigation');
      nav.setAttribute('role', 'navigation');
      
      // Add will-change for smooth animations
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
      
      // Swipe gestures for section navigation
      this.setupSwipeGestures();
    }
    
    setupScrollHide() {
      let ticking = false;
      let lastTimestamp = 0;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          const currentTimestamp = Date.now();
          
          // Debounce - only process every 100ms minimum
          if (currentTimestamp - lastTimestamp < 100) {
            return;
          }
          
          lastTimestamp = currentTimestamp;
          
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
      
      // Only act if scroll is more than threshold
      if (Math.abs(scrollDiff) < this.scrollThreshold) {
        return;
      }
      
      // Clear any pending hide timeout
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = null;
      }
      
      // Determine scroll direction
      if (scrollDiff > 0 && currentScrollY > 200) {
        // Scrolling down - hide after a delay
        if (!this.isHidden) {
          this.hideTimeout = setTimeout(() => {
            this.container.style.transform = 'translateY(100%)';
            this.isHidden = true;
          }, 150); // Small delay prevents flicker
        }
      } else if (scrollDiff < 0) {
        // Scrolling up - show immediately
        if (this.isHidden) {
          this.container.style.transform = 'translateY(0)';
          this.isHidden = false;
        }
      }
      
      // At the top of the page, always show
      if (currentScrollY < 100 && this.isHidden) {
        this.container.style.transform = 'translateY(0)';
        this.isHidden = false;
      }
      
      this.lastScrollY = currentScrollY;
    }
    
    setupSwipeGestures() {
      let touchStartX = 0;
      let touchEndX = 0;
      
      document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      
      document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });
      
      this.handleSwipe = () => {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) < swipeThreshold) return;
        
        // Find current active tab
        const activeTab = this.tabs.find(tab => tab.classList.contains('active'));
        const activeIndex = this.tabs.indexOf(activeTab);
        
        if (diff > 0 && activeIndex < this.tabs.length - 1) {
          // Swipe left - next section
          this.tabs[activeIndex + 1].click();
        } else if (diff < 0 && activeIndex > 0) {
          // Swipe right - previous section
          this.tabs[activeIndex - 1].click();
        }
      };
    }
    
    updateActive() {
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
        
        // Scroll tab into view
        const container = this.tabContainer;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const containerScroll = container.scrollLeft;
        const containerWidth = container.offsetWidth;
        
        if (tabLeft < containerScroll) {
          container.scrollTo({ left: tabLeft - 20, behavior: 'smooth' });
        } else if (tabLeft + tabWidth > containerScroll + containerWidth) {
          container.scrollTo({ 
            left: tabLeft + tabWidth - containerWidth + 20, 
            behavior: 'smooth' 
          });
        }
      }
    }
    
    destroy() {
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
  // ENHANCED TABLE WRAPPER
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
  // BIBLIOGRAPHY HANDLER
  // ===========================================
  class Bibliography {
    constructor() {
      this.section = $('.bibliography-section');
      if (!this.section) return;
      
      this.init();
    }
    
    init() {
      this.section.addEventListener('toggle', () => {
        const indicator = $('.expand-indicator', this.section);
        if (indicator) {
          indicator.style.transform = this.section.open ? 'rotate(180deg)' : 'rotate(0)';
        }
        
        // Lazy load content
        if (this.section.open && !this.section.dataset.loaded) {
          this.loadContent();
        }
      });
    }
    
    loadContent() {
      // In production, this would fetch actual bibliography
      // For now, mark as loaded
      this.section.dataset.loaded = 'true';
    }
  }
  
  // ===========================================
  // PRINT OPTIMIZATION
  // ===========================================
  class PrintOptimizer {
    constructor() {
      window.addEventListener('beforeprint', () => this.preparePrint());
    }
    
    preparePrint() {
      // Expand all collapsible content
      $$('.animate-on-scroll').forEach(el => el.classList.add('visible'));
      $$('.timeline-item').forEach(el => el.classList.add('visible'));
      
      // Open bibliography
      const bibliography = $('.bibliography-section');
      if (bibliography) bibliography.setAttribute('open', 'true');
    }
  }
  
  // ===========================================
  // PERFORMANCE MONITOR (Development only)
  // ===========================================
  class PerformanceMonitor {
    constructor() {
      if (window.location.hostname === 'localhost' || 
          window.location.hostname === '127.0.0.1') {
        this.init();
      }
    }
    
    init() {
      // Log performance metrics
      if ('PerformanceObserver' in window) {
        try {
          // LCP
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime.toFixed(0) + 'ms');
          });
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // FID
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              console.log('FID:', entry.processingStart - entry.startTime);
            }
          });
          fidObserver.observe({ entryTypes: ['first-input'] });
          
        } catch (e) {
          // Silently fail if not supported
        }
      }
      
      // Page load time
      window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page Load Time:', loadTime + 'ms');
        
        // Log dynamic tab info
        const dynamicTabs = document.querySelector('.dynamic-tabs');
        if (dynamicTabs) {
          const tabCount = dynamicTabs.querySelectorAll('.tab-item').length;
          console.log(`Dynamic Mobile Tabs: Generated ${tabCount} tabs`);
        }
      });
    }
  }
  
  // ===========================================
  // INITIALIZATION
  // ===========================================
  class CharacterPage {
    constructor() {
      this.modules = [];
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
      // Initialize all modules
      this.modules.push(
        new ProgressBar(),
        new ScrollAnimator(),
        new NavScrollEffects(),
        new QuickNav(),
        new DynamicMobileTabs(), // Auto-generating mobile tabs
        new SmoothAnchors(),
        new TableWrapper(),
        new Bibliography(),
        new PrintOptimizer(),
        new PerformanceMonitor()
      );
      
      console.log('Character Page Optimized v2.0.1 initialized');
    }
  }
  
  // Start the app
  window.CharacterPageApp = new CharacterPage();
  
})();