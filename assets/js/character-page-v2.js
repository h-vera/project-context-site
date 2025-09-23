/**
 * CHARACTER PAGE ENHANCED FUNCTIONALITY v2.3
 * Path: /assets/js/character-page-v2.js
 * Purpose: Premium interactions for biblical character profiles
 * Features: Mobile tabs, progress nav, animations, premium effects
 * Version: 2.3.0 - Fixed initialization check
 * Compatibility: global-v3.css v3.1.0, consolidated-init.js v1.1.0+
 */

(function() {
  'use strict';
  
  
  // ============================================
  // BIBLICAL ICON SYSTEM - ENHANCED
  // ============================================
  class BiblicalIconSystem {
    constructor() {
      this.registry = new Map();
      this.initializeIcons();
    }

    initializeIcons() {
      // Use global icon system if available from consolidated-init
      if (window.BiblicalApp?.iconSystem) {
        console.log('Using existing global icon system');
        return;
      }
      
      // Use global icon definitions if available
      const icons = window.EmojiIcons || {};
      const svgIcons = window.SVGIconLibrary || {};
      
      // Core navigation icons with fallbacks
      this.register('overview', icons.overview || '📋', { 
        category: 'section', 
        label: 'Overview',
        svg: svgIcons.overview 
      });
      this.register('narrative', icons.narrative || '📖', { 
        category: 'section', 
        label: 'Narrative',
        svg: svgIcons.narrative
      });
      this.register('literary', icons.literary || '✍️', { 
        category: 'section', 
        label: 'Literary',
        svg: svgIcons.literary
      });
      this.register('themes', icons.themes || '🎯', { 
        category: 'section', 
        label: 'Themes',
        svg: svgIcons.themes
      });
      this.register('theology', icons.theology || '⛪', { 
        category: 'section', 
        label: 'Theology',
        svg: svgIcons.theology
      });
      this.register('application', icons.application || '💡', { 
        category: 'section', 
        label: 'Application',
        svg: svgIcons.application
      });
      this.register('questions', icons.questions || '❓', { 
        category: 'section', 
        label: 'Questions',
        svg: svgIcons.questions
      });
      this.register('crown', icons.crown || '👑', { 
        category: 'section', 
        label: 'Messianic',
        svg: svgIcons.crown
      });
      this.register('scroll', icons.scroll || '📜', { 
        category: 'section', 
        label: 'ANE Context',
        svg: svgIcons.scroll
      });
      
      // UI icons
      this.register('collapse', '⬆️', { category: 'ui', label: 'Collapse' });
      this.register('expand', '⬇️', { category: 'ui', label: 'Expand' });
      this.register('menu', '☰', { category: 'ui', label: 'Menu' });
      this.register('close', '✕', { category: 'ui', label: 'Close' });
    }

    register(name, icon, metadata = {}) {
      this.registry.set(name, { icon, ...metadata });
    }

    get(name, options = {}) {
      // Use global icon function if available
      if (window.getIcon && typeof window.getIcon === 'function') {
        return window.getIcon(name, options);
      }
      
      const entry = this.registry.get(name);
      
      // Default to SVG unless explicitly disabled or not supported
      const useSVG = options.useSVG !== false && window.APP_CONFIG?.capabilities?.svg !== false;
      
      // Use CSS-based SVG icons (embedded in global-v3.css)
      if (useSVG) {
        const sizeClass = options.size ? this.getSizeClass(options.size) : '';
        return `<span class="icon-svg ${sizeClass}" data-icon="${name}"></span>`;
      }
      
      // Fallback to emoji if SVG not available or disabled
      if (entry) {
        if (options.size) {
          return `<span class="icon-emoji" style="font-size: ${options.size}px">${entry.icon}</span>`;
        }
        return entry.icon;
      }
      
      // Final fallback
      return window.EmojiIcons?.[name] || '📄';
    }
    
    getSizeClass(size) {
      if (size <= 16) return 'icon-sm';
      if (size <= 20) return 'icon-md';
      if (size <= 24) return 'icon-lg';
      return 'icon-xl';
    }

    getLabel(name) {
      const entry = this.registry.get(name);
      return entry ? entry.label : name;
    }
  }

  // ============================================
  // MOBILE SECTION TABS - ENHANCED
  // ============================================
  class MobileSectionTabs {
    constructor() {
      // Check if already initialized
      if (window.APP_CONFIG?.initialized?.mobileTabs) {
        console.log('Mobile tabs already initialized');
        return null;
      }
      
      this.iconSystem = window.BiblicalApp?.iconSystem || new BiblicalIconSystem();
      this.sections = [];
      this.activeSection = null;
      this.lastScrollY = 0;
      this.scrollHandler = null;
      this.resizeHandler = null;
      this.touchStartHandler = null;
      this.touchEndHandler = null;
      this.init();
    }

    init() {
      // if (window.innerWidth > 768) return; // Mobile only
      
      // Check if tabs already exist in DOM
      if (document.querySelector('.mobile-section-tabs')) {
        console.log('Mobile tabs already exist in DOM');
        window.APP_CONFIG.initialized.mobileTabs = true;
        return;
      }
      
      try {
        this.detectSections();
        if (this.sections.length > 0) {
          this.createElement();
          this.attachEventListeners();
          this.trackScrollPosition();
          this.initSwipeGestures();
          
          // Mark as initialized
          if (window.APP_CONFIG?.initialized) {
            window.APP_CONFIG.initialized.mobileTabs = true;
          }
        }
      } catch (error) {
        console.error('Failed to initialize mobile section tabs:', error);
      }
    }

    detectSections() {
      const sectionElements = document.querySelectorAll('.theology-card[id], .animate-on-scroll[id]');
      
      const sectionMap = {
        'overview': { icon: 'overview', label: 'Overview', order: 1 },
        'narrative': { icon: 'narrative', label: 'Story', order: 2 },
        'literary-context': { icon: 'literary', label: 'Literary', order: 3 },
        'themes': { icon: 'themes', label: 'Themes', order: 4 },
        'ane-context': { icon: 'scroll', label: 'ANE', order: 5 },
        'biblical-theology': { icon: 'theology', label: 'Theology', order: 6 },
        'messianic': { icon: 'crown', label: 'Messianic', order: 7 },
        'application': { icon: 'application', label: 'Apply', order: 8 },
        'questions': { icon: 'questions', label: 'Questions', order: 9 }
      };
      
      sectionElements.forEach(element => {
        const id = element.id;
        const config = sectionMap[id];
        
        if (config) {
          this.sections.push({
            id,
            element,
            icon: config.icon,
            label: config.label,
            order: config.order
          });
        }
      });
      
      // Sort by order
      this.sections.sort((a, b) => a.order - b.order);
    }

    createElement() {
      const container = document.createElement('div');
      container.className = 'mobile-section-tabs';
      container.innerHTML = `
        <div class="mobile-section-tabs-inner">
          ${this.sections.map(section => `
            <button class="tab-item" 
                    data-section="${section.id}"
                    aria-label="${section.label}"
                    role="tab"
                    aria-selected="false">
              <span class="tab-icon">${this.iconSystem.get(section.icon)}</span>
              <span class="tab-label">${section.label}</span>
            </button>
          `).join('')}
        </div>
      `;
      
      document.body.appendChild(container);
      this.container = container;
    }

    attachEventListeners() {
      // Tab clicks
      this.container.querySelectorAll('.tab-item').forEach(tab => {
        tab.addEventListener('click', () => {
          const sectionId = tab.dataset.section;
          this.scrollToSection(sectionId);
          this.announce(`Navigating to ${tab.getAttribute('aria-label')} section`);
        });
      });
      
      // Hide on scroll down, show on scroll up
      let ticking = false;
      this.scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      
      // Handle resize
      this.resizeHandler = () => {
        if (window.innerWidth > 768) {
          this.destroy();
        }
      };
      window.addEventListener('resize', this.resizeHandler);
    }

    handleScroll() {
      const currentScrollY = window.pageYOffset;
      const scrollDiff = currentScrollY - this.lastScrollY;
      
      // Hide/show based on scroll direction
      if (scrollDiff > 10 && currentScrollY > 100) {
        this.hideTabs();
      } else if (scrollDiff < -5) {
        this.showTabs();
      }
      
      this.lastScrollY = currentScrollY;
      
      // Update active section
      this.updateActiveSection();
    }

    hideTabs() {
      this.container.classList.add('hidden');
    }

    showTabs() {
      this.container.classList.remove('hidden');
    }

    trackScrollPosition() {
      window.addEventListener('scroll', () => {
        this.updateActiveSection();
      }, { passive: true });
    }

    updateActiveSection() {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const section = this.sections[i];
        const rect = section.element.getBoundingClientRect();
        const top = rect.top + scrollY;
        
        if (scrollY >= top - windowHeight / 3) {
          this.setActiveSection(section.id);
          break;
        }
      }
    }

    setActiveSection(sectionId) {
      if (this.activeSection === sectionId) return;
      
      this.container.querySelectorAll('.tab-item').forEach(tab => {
        if (tab.dataset.section === sectionId) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.classList.remove('active');
          tab.setAttribute('aria-selected', 'false');
        }
      });
      
      this.activeSection = sectionId;
    }

    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--js-scroll-offset')) || 80;
        const top = section.offsetTop - offset;
        window.scrollTo({
          top,
          behavior: 'smooth'
        });
      }
    }

    initSwipeGestures() {
      let touchStartX = 0;
      let touchEndX = 0;
      
      this.touchStartHandler = (e) => {
        touchStartX = e.changedTouches[0].screenX;
      };
      
      this.touchEndHandler = (e) => {
        touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe(touchStartX, touchEndX);
      };
      
      this.container.addEventListener('touchstart', this.touchStartHandler, { passive: true });
      this.container.addEventListener('touchend', this.touchEndHandler, { passive: true });
    }

    handleSwipe(startX, endX) {
      const swipeThreshold = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--js-swipe-threshold')) || 50;
      const diff = startX - endX;
      
      if (Math.abs(diff) > swipeThreshold) {
        const currentIndex = this.sections.findIndex(s => s.id === this.activeSection);
        
        if (diff > 0 && currentIndex < this.sections.length - 1) {
          // Swipe left - next section
          this.scrollToSection(this.sections[currentIndex + 1].id);
        } else if (diff < 0 && currentIndex > 0) {
          // Swipe right - previous section
          this.scrollToSection(this.sections[currentIndex - 1].id);
        }
      }
    }

    announce(message) {
      // Use global announcer if available
      if (window.BiblicalApp?.announce) {
        window.BiblicalApp.announce(message);
      }
    }

    destroy() {
      // Clean up event listeners
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      if (this.touchStartHandler) {
        this.container.removeEventListener('touchstart', this.touchStartHandler);
      }
      if (this.touchEndHandler) {
        this.container.removeEventListener('touchend', this.touchEndHandler);
      }
      
      // Remove element
      if (this.container) {
        this.container.remove();
      }
      
      console.log('Mobile tabs destroyed');
    }
  }

  // ============================================
  // SMART PROGRESS NAVIGATOR - ENHANCED
  // ============================================
  class SmartProgressNavigator {
    constructor() {
      // Check if already initialized
      if (window.APP_CONFIG?.initialized?.progressNav) {
        console.log('Progress navigator already initialized');
        return null;
      }
      
      this.iconSystem = window.BiblicalApp?.iconSystem || new BiblicalIconSystem();
      this.sections = [];
      this.totalHeight = 0;
      this.currentProgress = 0;
      this.scrollHandler = null;
      this.resizeHandler = null;
      this.observers = [];
      this.init();
    }

    init() {
      // if (window.innerWidth <= 1024) return; // Desktop only
      
      // Check if navigator already exists in DOM
      if (document.querySelector('.smart-progress-nav')) {
        console.log('Progress navigator already exists in DOM');
        window.APP_CONFIG.initialized.progressNav = true;
        return;
      }
      
      try {
        this.detectSections();
        if (this.sections.length > 0) {
          this.createElement();
          this.attachEventListeners();
          this.trackProgress();
          
          // Mark as initialized
          if (window.APP_CONFIG?.initialized) {
            window.APP_CONFIG.initialized.progressNav = true;
          }
        }
      } catch (error) {
        console.error('Failed to initialize progress navigator:', error);
      }
    }

    detectSections() {
      const mainSections = document.querySelectorAll('.theology-card[id], .animate-on-scroll[id]');
      
      mainSections.forEach(section => {
        const id = section.id;
        const heading = section.querySelector('h3') || section.querySelector('h2');
        const label = heading ? heading.textContent.trim() : id;
        
        // Map section IDs to icons
        const iconMap = {
          'overview': 'overview',
          'narrative': 'narrative',
          'literary-context': 'literary',
          'themes': 'themes',
          'biblical-theology': 'theology',
          'application': 'application',
          'messianic': 'crown',
          'ane-context': 'scroll',
          'questions': 'questions'
        };
        
        this.sections.push({
          id,
          label: this.truncateLabel(label),
          element: section,
          icon: iconMap[id] || 'scroll',
          progress: 0,
          top: 0,
          height: 0
        });
      });
      
      this.calculatePositions();
    }

    truncateLabel(label) {
      // Remove emoji/icons and truncate
      const cleaned = label.replace(/[^\w\s]/gi, '').trim();
      return cleaned.length > 15 ? cleaned.substring(0, 15) + '...' : cleaned;
    }

    calculatePositions() {
      this.sections.forEach(section => {
        const rect = section.element.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        section.top = rect.top + scrollTop;
        section.height = rect.height;
      });
      
      const lastSection = this.sections[this.sections.length - 1];
      if (lastSection) {
        this.totalHeight = lastSection.top + lastSection.height;
      }
    }

    createElement() {
      const nav = document.createElement('div');
      nav.className = 'smart-progress-nav';
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Section progress');
      nav.innerHTML = `
        <div class="progress-track" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        <div class="progress-sections">
          ${this.sections.map(section => `
            <div class="progress-section" 
                 data-section="${section.id}"
                 role="button"
                 tabindex="0"
                 aria-label="Go to ${section.label}">
              <span class="progress-section-icon">
                ${this.iconSystem.get(section.icon, { size: 16 })}
              </span>
              <span class="progress-section-label">${section.label}</span>
              <span class="progress-section-percent" aria-live="polite">0%</span>
            </div>
          `).join('')}
        </div>
      `;
      
      document.body.appendChild(nav);
      this.element = nav;
    }

    attachEventListeners() {
      // Click to navigate
      this.element.querySelectorAll('.progress-section').forEach(section => {
        section.addEventListener('click', () => {
          const sectionId = section.dataset.section;
          const target = document.getElementById(sectionId);
          if (target) {
            const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--js-scroll-offset')) || 80;
            window.scrollTo({
              top: target.offsetTop - offset,
              behavior: 'smooth'
            });
            this.announce(`Navigating to ${section.getAttribute('aria-label')}`);
          }
        });
        
        // Keyboard navigation
        section.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            section.click();
          }
        });
      });
      
      // Recalculate on resize
      let resizeTimeout;
      this.resizeHandler = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.calculatePositions();
          if (window.innerWidth <= 1024) {
            this.destroy();
          }
        }, 250);
      };
      window.addEventListener('resize', this.resizeHandler);
    }

    trackProgress() {
      let ticking = false;
      
      const updateProgress = () => {
        const scrollY = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Overall progress
        const totalProgress = scrollY / (documentHeight - windowHeight);
        this.currentProgress = Math.min(Math.max(totalProgress, 0), 1);
        
        // Update progress bar
        const progressTrack = this.element.querySelector('.progress-track');
        if (progressTrack) {
          progressTrack.style.setProperty('--progress', this.currentProgress);
          progressTrack.setAttribute('aria-valuenow', Math.round(this.currentProgress * 100));
        }
        
        // Section progress
        this.sections.forEach((section, index) => {
          const sectionTop = section.top;
          const sectionBottom = sectionTop + section.height;
          
          // Check if section is in viewport
          if (scrollY + windowHeight > sectionTop && scrollY < sectionBottom) {
            const sectionScrolled = scrollY + windowHeight - sectionTop;
            const sectionProgress = Math.min(sectionScrolled / section.height, 1);
            section.progress = Math.round(sectionProgress * 100);
            
            // Update UI
            const sectionEl = this.element.querySelectorAll('.progress-section')[index];
            if (sectionEl) {
              const percentEl = sectionEl.querySelector('.progress-section-percent');
              if (percentEl) {
                percentEl.textContent = `${section.progress}%`;
              }
              
              // Mark as active if in middle of viewport
              if (scrollY + (windowHeight / 2) > sectionTop && 
                  scrollY + (windowHeight / 2) < sectionBottom) {
                sectionEl.classList.add('active');
              } else {
                sectionEl.classList.remove('active');
              }
            }
          }
        });
        
        ticking = false;
      };
      
      this.scrollHandler = () => {
        if (!ticking) {
          window.requestAnimationFrame(updateProgress);
          ticking = true;
        }
      };
      
      window.addEventListener('scroll', this.scrollHandler, { passive: true });
      
      // Initial update
      updateProgress();
    }

    announce(message) {
      if (window.BiblicalApp?.announce) {
        window.BiblicalApp.announce(message);
      }
    }

    destroy() {
      // Clean up event listeners
      if (this.scrollHandler) {
        window.removeEventListener('scroll', this.scrollHandler);
      }
      if (this.resizeHandler) {
        window.removeEventListener('resize', this.resizeHandler);
      }
      
      // Remove element
      if (this.element) {
        this.element.remove();
      }
      
      console.log('Progress navigator destroyed');
    }
  }

  // ============================================
  // PREMIUM EFFECTS CONTROLLER - ENHANCED
  // ============================================
  class PremiumEffects {
    constructor() {
      // Check if already initialized
      if (window.APP_CONFIG?.initialized?.premiumEffects) {
        console.log('Premium effects already initialized');
        return null;
      }
      
      this.observers = [];
      this.eventHandlers = [];
      this.init();
    }

    init() {
      try {
        // Only initialize animations if not already done
        if (!window.APP_CONFIG?.initialized?.animations) {
          this.initScrollAnimations();
          window.APP_CONFIG.initialized.animations = true;
        }
        
        this.initHoverEffects();
        this.init3DCards();
        this.initParallax();
        this.initTextEffects();
        
        // Mark as initialized
        if (window.APP_CONFIG?.initialized) {
          window.APP_CONFIG.initialized.premiumEffects = true;
        }
      } catch (error) {
        console.error('Failed to initialize premium effects:', error);
      }
    }

    initScrollAnimations() {
      const animatedElements = document.querySelectorAll('.animate-on-scroll');
      
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              
              // Stagger children if present
              const children = entry.target.querySelectorAll(':scope > *');
              children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 50}ms`;
              });
              
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => observer.observe(el));
        this.observers.push(observer);
      } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
      }
    }

    initHoverEffects() {
      const cards = document.querySelectorAll('.theology-card');
      
      cards.forEach(card => {
        const moveHandler = (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          
          // Set CSS variables for gradient following
          card.style.setProperty('--mouse-x', `${x}%`);
          card.style.setProperty('--mouse-y', `${y}%`);
          
          // Dynamic shadow
          const shadowX = (x - 50) / 5;
          const shadowY = (y - 50) / 5;
          card.style.setProperty('--shadow-x', `${shadowX}px`);
          card.style.setProperty('--shadow-y', `${shadowY}px`);
        };
        
        const leaveHandler = () => {
          card.style.setProperty('--mouse-x', '50%');
          card.style.setProperty('--mouse-y', '50%');
          card.style.setProperty('--shadow-x', '0px');
          card.style.setProperty('--shadow-y', '10px');
        };
        
        card.addEventListener('mousemove', moveHandler);
        card.addEventListener('mouseleave', leaveHandler);
        
        this.eventHandlers.push({ element: card, event: 'mousemove', handler: moveHandler });
        this.eventHandlers.push({ element: card, event: 'mouseleave', handler: leaveHandler });
      });
    }

    init3DCards() {
      const cards3d = document.querySelectorAll('.card-3d');
      
      cards3d.forEach(card => {
        const moveHandler = (e) => {
          const rect = card.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const angleX = (e.clientY - centerY) / 20;
          const angleY = (centerX - e.clientX) / 20;
          
          card.style.transform = `
            perspective(1000px) 
            rotateX(${angleX}deg) 
            rotateY(${angleY}deg) 
            translateZ(10px)
          `;
        };
        
        const leaveHandler = () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        };
        
        card.addEventListener('mousemove', moveHandler);
        card.addEventListener('mouseleave', leaveHandler);
        
        this.eventHandlers.push({ element: card, event: 'mousemove', handler: moveHandler });
        this.eventHandlers.push({ element: card, event: 'mouseleave', handler: leaveHandler });
      });
    }

    initParallax() {
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      
      if (parallaxElements.length > 0) {
        const scrollHandler = () => {
          const scrolled = window.pageYOffset;
          
          parallaxElements.forEach(el => {
            const rate = el.dataset.parallax || 0.5;
            const yPos = -(scrolled * rate);
            el.style.transform = `translateY(${yPos}px)`;
          });
        };
        
        window.addEventListener('scroll', scrollHandler, { passive: true });
        this.eventHandlers.push({ element: window, event: 'scroll', handler: scrollHandler });
      }
    }

    initTextEffects() {
      // Gradient text animation
      const gradientTexts = document.querySelectorAll('.text-gradient-animated');
      
      gradientTexts.forEach(text => {
        const enterHandler = () => {
          text.style.animationPlayState = 'running';
        };
        
        const leaveHandler = () => {
          text.style.animationPlayState = 'paused';
        };
        
        text.addEventListener('mouseenter', enterHandler);
        text.addEventListener('mouseleave', leaveHandler);
        
        this.eventHandlers.push({ element: text, event: 'mouseenter', handler: enterHandler });
        this.eventHandlers.push({ element: text, event: 'mouseleave', handler: leaveHandler });
      });
    }

    destroy() {
      // Clean up Intersection Observers
      this.observers.forEach(observer => observer.disconnect());
      
      // Clean up event handlers
      this.eventHandlers.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler);
      });
      
      console.log('Premium effects destroyed');
    }
  }

  // ============================================
  // MAIN CHARACTER PAGE CONTROLLER - ENHANCED
  // ============================================
  class CharacterPage {
    constructor() {
      // Don't check if already exists - we want to create it fresh
      this.iconSystem = null;
      this.mobileTabs = null;
      this.progressNav = null;
      this.effects = null;
      this.announcer = null;
      
      // Register with global app
      if (window.BiblicalApp) {
        // Set up icon system if not already present
        if (!window.BiblicalApp.iconSystem) {
          window.BiblicalApp.iconSystem = new BiblicalIconSystem();
        }
        this.iconSystem = window.BiblicalApp.iconSystem;
        
        window.BiblicalApp.modules = window.BiblicalApp.modules || {};
        window.BiblicalApp.modules.characterPage = this;
      } else {
        this.iconSystem = new BiblicalIconSystem();
      }
      
      this.init();
    }

    init() {
      // Use BiblicalApp's ready system if available
      if (window.BiblicalApp?.onReady) {
        window.BiblicalApp.onReady(() => this.initialize());
      } else {
        // Fallback to DOMContentLoaded
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
          this.initialize();
        }
      }
    }

    initialize() {
      try {
        // Initialize components
        this.initializeComponents();
        this.initializeNavigation();
        this.initializeInteractions();
        this.initializeAccessibility();
        
        // Set up global announce function if not already present
        if (window.BiblicalApp && !window.BiblicalApp.announce) {
          window.BiblicalApp.announce = (message) => this.announce(message);
        }
        
        // Mark character page as fully initialized
        if (window.APP_CONFIG?.initialized) {
          window.APP_CONFIG.initialized.characterPageComplete = true;
        }
        
        // Log initialization
        console.log('Character Page v2.3.0 initialized successfully');
        console.log('Template version:', window.APP_CONFIG?.version);
        console.log('Icon system loaded:', this.iconSystem.registry?.size || 'using global', 'icons');
        console.log('Capabilities:', window.APP_CONFIG?.capabilities);
        console.log('Initialization status:', window.APP_CONFIG?.initialized);
      } catch (error) {
        console.error('Failed to initialize character page:', error);
        // Continue with degraded functionality
      }
    }

    initializeComponents() {
      try {
        // Mobile section tabs - check if not already initialized
        if (window.innerWidth <= 768 && !window.APP_CONFIG?.initialized?.mobileTabs) {
          this.mobileTabs = new MobileSectionTabs();
        }
        
        // Desktop progress navigator - check if not already initialized
        if (window.innerWidth > 1024 && !window.APP_CONFIG?.initialized?.progressNav) {
          this.progressNav = new SmartProgressNavigator();
        }
        
        // Premium effects - check if not already initialized
        if (!window.APP_CONFIG?.initialized?.premiumEffects) {
          this.effects = new PremiumEffects();
        }
      } catch (error) {
        console.error('Failed to initialize components:', error);
      }
    }

    initializeNavigation() {
      // Navigation will be handled by nav-premium.js
      console.log('Navigation initialization will be handled by nav-premium.js');
      
      try {
        // Only handle smooth scrolling for anchor links if not already done
        if (!window.APP_CONFIG?.initialized?.smoothScroll) {
          document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
              e.preventDefault();
              const target = document.querySelector(anchor.getAttribute('href'));
              if (target) {
                const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--js-scroll-offset')) || 80;
                window.scrollTo({
                  top: target.offsetTop - offset,
                  behavior: 'smooth'
                });
              }
            });
          });
          
          if (window.APP_CONFIG?.initialized) {
            window.APP_CONFIG.initialized.smoothScroll = true;
          }
        }
        
        // Only create back-to-top button if not already present
        if (!document.querySelector('.back-to-top')) {
  this.createBackToTopButton();
  // Mark as initialized AFTER creation, not as a condition
  if (window.APP_CONFIG?.initialized) {
    window.APP_CONFIG.initialized.backToTop = true;
  }
}
    createBackToTopButton() {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  // Use icon system
  if (this.iconSystem) {
    backToTop.innerHTML = this.iconSystem.get('chevron-up', { size: 24 });
  } else if (window.getIcon) {
    backToTop.innerHTML = window.getIcon('chevron-up', { size: 24, color: 'white' });
  } else {
    backToTop.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    `;
  }
  backToTop.setAttribute('aria-label', 'Back to top');

  document.body.appendChild(backToTop);

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    this.announce('Scrolling to top of page');
  });
  
  // Show/hide based on scroll
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });
  
  // Mark as initialized
  if (window.APP_CONFIG?.initialized) {
    window.APP_CONFIG.initialized.backToTop = true;
  }
} // <-- Add this closing brace to end initializeNavigation

    initializeInteractions() {
      try {
        // Timeline items hover enhancement
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          item.style.setProperty('--index', index);
        });
        
        // Bibliography toggle enhancement
        const bibliography = document.querySelector('.bibliography-section');
        if (bibliography) {
          const summary = bibliography.querySelector('summary');
          if (summary && !summary.hasAttribute('data-initialized')) {
            summary.setAttribute('data-initialized', 'true');
            summary.addEventListener('click', (e) => {
              e.preventDefault();
              bibliography.open = !bibliography.open;
              
              // Smooth animation
              if (bibliography.open) {
                bibliography.classList.add('expanding');
                setTimeout(() => {
                  bibliography.classList.remove('expanding');
                }, 600);
                this.announce('Bibliography expanded');
              } else {
                this.announce('Bibliography collapsed');
              }
            });
          }
        }
        
        // Tag interactions
        const tags = document.querySelectorAll('.tag:not([data-initialized])');
        tags.forEach(tag => {
          tag.setAttribute('data-initialized', 'true');
          tag.addEventListener('click', () => {
            // Could implement tag filtering or searching
            console.log('Tag clicked:', tag.textContent);
            this.announce(`Tag selected: ${tag.textContent}`);
          });
        });
      } catch (error) {
        console.error('Failed to initialize interactions:', error);
      }
    }

    initializeAccessibility() {
      try {
        // Skip to main content - check if not already exists
        if (!document.querySelector('.skip-link')) {
          const skipLink = document.createElement('a');
          skipLink.href = '#main-content';
          skipLink.className = 'skip-link';
          skipLink.textContent = 'Skip to main content';
          document.body.insertBefore(skipLink, document.body.firstChild);
        }
        
        // Create screen reader announcement region if not exists
        if (!this.announcer && !document.querySelector('.sr-only[aria-live]')) {
          this.announcer = document.createElement('div');
          this.announcer.className = 'sr-only';
          this.announcer.setAttribute('aria-live', 'polite');
          this.announcer.setAttribute('aria-atomic', 'true');
          document.body.appendChild(this.announcer);
        } else if (!this.announcer) {
          this.announcer = document.querySelector('.sr-only[aria-live]');
        }
        
        // Keyboard navigation - use event delegation to avoid duplicates
        if (!window.APP_CONFIG?.initialized?.keyboardNav) {
          document.addEventListener('keydown', (e) => {
            // J/K navigation for sections
            if (e.key === 'j' || e.key === 'k') {
              if (document.activeElement.tagName !== 'INPUT' && 
                  document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                this.navigateSections(e.key === 'j' ? 'next' : 'prev');
              }
            }
            
            // Escape closes mobile menu
            if (e.key === 'Escape') {
              if (this.mobileTabs && this.mobileTabs.container) {
                this.mobileTabs.showTabs();
              }
            }
          });
          
          if (window.APP_CONFIG?.initialized) {
            window.APP_CONFIG.initialized.keyboardNav = true;
          }
        }
        
        // Reduced motion support
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
          document.documentElement.classList.add('reduced-motion');
        }
        
        prefersReducedMotion.addEventListener('change', (e) => {
          if (e.matches) {
            document.documentElement.classList.add('reduced-motion');
          } else {
            document.documentElement.classList.remove('reduced-motion');
          }
        });
      } catch (error) {
        console.error('Failed to initialize accessibility:', error);
      }
    }

    announce(message) {
      if (this.announcer) {
        this.announcer.textContent = message;
        setTimeout(() => {
          this.announcer.textContent = '';
        }, 1000);
      }
    }

    navigateSections(direction) {
      const sections = document.querySelectorAll('.theology-card[id]');
      const currentSection = this.getCurrentSection(sections);
      
      if (currentSection) {
        const currentIndex = Array.from(sections).indexOf(currentSection);
        let targetIndex;
        
        if (direction === 'next') {
          targetIndex = Math.min(currentIndex + 1, sections.length - 1);
        } else {
          targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (targetIndex !== currentIndex) {
          const targetSection = sections[targetIndex];
          const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--js-scroll-offset')) || 80;
          window.scrollTo({
            top: targetSection.offsetTop - offset,
            behavior: 'smooth'
          });
          
          const heading = targetSection.querySelector('h3') || targetSection.querySelector('h2');
          const sectionName = heading ? heading.textContent.trim() : 'section';
          this.announce(`Navigating to ${sectionName}`);
        }
      }
    }

    getCurrentSection(sections) {
      const scrollY = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      for (let section of sections) {
        const rect = section.getBoundingClientRect();
        const top = rect.top + scrollY;
        const bottom = top + rect.height;
        
        if (scrollY + (windowHeight / 2) >= top && scrollY + (windowHeight / 2) <= bottom) {
          return section;
        }
      }
      
      return sections[0];
    }

    destroy() {
      // Clean up all components
      if (this.mobileTabs) this.mobileTabs.destroy();
      if (this.progressNav) this.progressNav.destroy();
      if (this.effects) this.effects.destroy();
      
      // Remove global elements only if we created them
      if (window.APP_CONFIG?.initialized?.backToTop) {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) backToTop.remove();
      }
      
      const skipLink = document.querySelector('.skip-link');
      if (skipLink) skipLink.remove();
      
      if (this.announcer) this.announcer.remove();
      
      // Clear from global registry
      if (window.BiblicalApp?.modules?.characterPage) {
        delete window.BiblicalApp.modules.characterPage;
      }
      
      console.log('Character page cleaned up');
    }
  }

  // ============================================
  // MODULE EXPORT/REGISTRATION
  // ============================================
  
  // Register classes globally for potential reuse
  window.BiblicalIconSystem = BiblicalIconSystem;
  window.MobileSectionTabs = MobileSectionTabs;
  window.SmartProgressNavigator = SmartProgressNavigator;
  window.PremiumEffects = PremiumEffects;
  window.CharacterPage = CharacterPage;
  
  // Create instance immediately - don't wait for ready callbacks
  const characterPage = new CharacterPage();
  
  // Clean up on page unload
  window.addEventListener('beforeunload', () => {
    if (window.BiblicalApp?.modules?.characterPage) {
      window.BiblicalApp.modules.characterPage.destroy();
    }
  });
  
})();

// Rest of the file remains the same (polyfills, performance monitoring, etc.)

// ============================================
// SMOOTH SCROLL POLYFILL
// ============================================
if (!('scrollBehavior' in document.documentElement.style)) {
  // Simple smooth scroll polyfill for older browsers
  window.smoothScrollTo = function(endY, duration = 400) {
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
}

// ============================================
// INTERSECTION OBSERVER POLYFILL CHECK
// ============================================
if (!('IntersectionObserver' in window)) {
  console.warn('IntersectionObserver not supported. Consider adding polyfill for better scroll animations.');
  // Fallback: immediately show all animated elements
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      el.classList.add('visible');
    });
  });
}

// ============================================
// PERFORMANCE MONITORING
// ============================================
/*class PerformanceMonitor {
  constructor() {
    this.metrics = {};
    this.init();
  }
  
  init() {
    // Track page load performance
    if (window.performance && window.performance.timing) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        this.metrics.pageLoad = perfData.loadEventEnd - perfData.navigationStart;
        this.metrics.domReady = perfData.domContentLoadedEventEnd - perfData.navigationStart;
        this.metrics.firstPaint = perfData.responseEnd - perfData.navigationStart;
        
        console.log('Performance Metrics:', this.metrics);
      });
    }
    
    // Track scroll performance
    this.trackScrollPerformance();
  }
  
  trackScrollPerformance() {
    let lastScrollTime = performance.now();
    let frameCount = 0;
    let fpsInterval;
    
    const measureFPS = () => {
      frameCount++;
    };
    
    window.addEventListener('scroll', () => {
      if (!fpsInterval) {
        frameCount = 0;
        fpsInterval = setInterval(() => {
          this.metrics.scrollFPS = frameCount;
          frameCount = 0;
          
          // Warn if FPS drops below 30
          if (this.metrics.scrollFPS < 30) {
            console.warn('Low scroll performance detected:', this.metrics.scrollFPS, 'FPS');
          }
        }, 1000);
        
        // Stop measuring after 2 seconds of no scrolling
        setTimeout(() => {
          if (fpsInterval) {
            clearInterval(fpsInterval);
            fpsInterval = null;
          }
        }, 2000);
      }
      
      requestAnimationFrame(measureFPS);
    }, { passive: true });
  }
}
*/

// ============================================
// LAZY LOADING MANAGER
// ============================================
class LazyLoadManager {
  constructor() {
    this.images = [];
    this.init();
  }
  
  init() {
    // Find all images that should be lazy loaded
    this.images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      this.initIntersectionObserver();
    } else {
      // Fallback: load all images immediately
      this.loadAllImages();
    }
  }
  
  initIntersectionObserver() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });
    
    this.images.forEach(img => imageObserver.observe(img));
  }
  
  loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    
    // Create a new image to preload
    const newImg = new Image();
    newImg.onload = () => {
      img.src = src;
      img.classList.add('loaded');
      delete img.dataset.src;
    };
    newImg.onerror = () => {
      console.error('Failed to load image:', src);
      img.classList.add('error');
    };
    newImg.src = src;
  }
  
  loadAllImages() {
    this.images.forEach(img => this.loadImage(img));
  }
} // <-- Add this closing brace to end the class definition


// ============================================
// TOUCH GESTURE HANDLER
// ============================================
class TouchGestureHandler {
  constructor() {
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.minSwipeDistance = 50;
    this.callbacks = {
      swipeLeft: [],
      swipeRight: [],
      swipeUp: [],
      swipeDown: []
    };
    
    this.init();
  }
  
  init() {
    document.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe();
    }, { passive: true });
  }
  
  handleSwipe() {
    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    if (Math.max(absX, absY) < this.minSwipeDistance) return;
    
    if (absX > absY) {
      // Horizontal swipe
      if (deltaX > 0) {
        this.trigger('swipeRight', deltaX);
      } else {
        this.trigger('swipeLeft', Math.abs(deltaX));
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        this.trigger('swipeDown', deltaY);
      } else {
        this.trigger('swipeUp', Math.abs(deltaY));
      }
    }
  }
  
  on(event, callback) {
    if (this.callbacks[event]) {
      this.callbacks[event].push(callback);
    }
  }
  
  trigger(event, distance) {
    if (this.callbacks[event]) {
      this.callbacks[event].forEach(callback => callback(distance));
    }
  }
}

// ============================================
// THEME MANAGER
// ============================================
/* class ThemeManager {
  constructor() {
    this.theme = 'auto';
    this.init();
  }
  
  init() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.setTheme(savedTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      darkModeQuery.addEventListener('change', (e) => {
        if (this.theme === 'auto') {
          this.applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }
  
  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    
    if (theme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark ? 'dark' : 'light');
    } else {
      this.applyTheme(theme);
    }
  }
  
  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme color meta tag
    const themeColor = theme === 'dark' ? '#1a1a1a' : '#7209b7';
    document.querySelector('meta[name="theme-color"]').setAttribute('content', themeColor);
  }
  
  toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }
}
*/
// ============================================
// ENHANCED MAIN CONTROLLER
// ============================================
// Update the CharacterPage class initialization
CharacterPage.prototype.initializeEnhancements = function() {
  /* Performance monitoring - COMMENTED OUT
  if (!window.BiblicalApp?.modules?.performanceMonitor) {
    this.performanceMonitor = new PerformanceMonitor();
    if (window.BiblicalApp?.modules) {
      window.BiblicalApp.modules.performanceMonitor = this.performanceMonitor;
    }
  }
  */
  
  // Lazy loading for images
  if (!window.BiblicalApp?.modules?.lazyLoader) {
    this.lazyLoader = new LazyLoadManager();
    if (window.BiblicalApp?.modules) {
      window.BiblicalApp.modules.lazyLoader = this.lazyLoader;
    }
  }
  
  // Touch gestures
  if (!window.BiblicalApp?.modules?.touchHandler) {
    this.touchHandler = new TouchGestureHandler();
    if (window.BiblicalApp?.modules) {
      window.BiblicalApp.modules.touchHandler = this.touchHandler;
    }
  }
  
  /* Theme management - COMMENTED OUT
  if (!window.BiblicalApp?.modules?.themeManager) {
    this.themeManager = new ThemeManager();
    if (window.BiblicalApp?.modules) {
      window.BiblicalApp.modules.themeManager = this.themeManager;
    }
  }
  */
  
  // Set up gesture callbacks
  if (this.touchHandler) {  // Add safety check
    this.touchHandler.on('swipeLeft', () => {
      if (this.mobileTabs && this.mobileTabs.activeSection) {
        const currentIndex = this.mobileTabs.sections.findIndex(s => s.id === this.mobileTabs.activeSection);
        if (currentIndex < this.mobileTabs.sections.length - 1) {
          this.mobileTabs.scrollToSection(this.mobileTabs.sections[currentIndex + 1].id);
        }
      }
    });
    
    this.touchHandler.on('swipeRight', () => {
      if (this.mobileTabs && this.mobileTabs.activeSection) {
        const currentIndex = this.mobileTabs.sections.findIndex(s => s.id === this.mobileTabs.activeSection);
        if (currentIndex > 0) {
          this.mobileTabs.scrollToSection(this.mobileTabs.sections[currentIndex - 1].id);
        }
      }
    });
  }
  
  console.log('✓ Enhancements initialized');
};

// Add to existing initialize method
const originalInitialize = CharacterPage.prototype.initialize;
CharacterPage.prototype.initialize = function() {
  originalInitialize.call(this);
  this.initializeEnhancements();
};

// ============================================
// ERROR BOUNDARY
// ============================================
window.addEventListener('error', function(e) {
  console.error('Global error:', e.error);
  
  // Send to analytics if available
  if (typeof gtag !== 'undefined') {
    gtag('event', 'exception', {
      description: e.message,
      fatal: false
    });
  }
});

window.addEventListener('unhandledrejection', function(e) {
  console.error('Unhandled promise rejection:', e.reason);
});

// ============================================
// PRINT SUPPORT
// ============================================
window.addEventListener('beforeprint', function() {
  // Expand all collapsed sections
  document.querySelectorAll('details').forEach(details => {
    details.open = true;
  });
  
  // Show all lazy-loaded images
  if (window.BiblicalApp?.modules?.lazyLoader || window.characterPage?.lazyLoader) {
    const loader = window.BiblicalApp?.modules?.lazyLoader || window.characterPage?.lazyLoader;
    if (loader) {
      loader.loadAllImages();
    }
  }
  
  // Add print class to body
  document.body.classList.add('printing');
});

window.addEventListener('afterprint', function() {
  document.body.classList.remove('printing');
});

// ============================================
// END OF CHARACTER PAGE V2.2 - COMPLETE
// ============================================