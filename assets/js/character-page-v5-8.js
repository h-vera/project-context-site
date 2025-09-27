/**
 * Character Page v5.8 - Dynamic Mobile Tabs
 * Path: /assets/js/character-page-v5-8.js
 * Purpose: Enhanced page utilities with dynamic mobile section navigation
 * Version: 5.8.0 - COMPLETE FIXED VERSION
 * Created: 2024
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  
  /**
   * Section configuration with metadata for dynamic tab generation
   * Priority: 1 (highest) to 5 (lowest) - used when >5 sections exist
   */
  const sectionConfig = [
    // ============================================
    // TEMPLATE SECTIONS (from v5.8 template)
    // ============================================
    
    // Priority 1 - Core template sections
    { id: 'overview', icon: '', label: 'Overview', priority: 1 },
    { id: 'narrative', icon: '', label: 'Journey', priority: 1 },
    
    // Priority 2 - Standard character template sections
    { id: 'literary-context', icon: '', label: 'Literary', priority: 2 },
    { id: 'themes', icon: '', label: 'Themes', priority: 2 },
    { id: 'ane-context', icon: '', label: 'ANE', priority: 3 },
    { id: 'biblical-theology', icon: '', label: 'Theology', priority: 2 },
    { id: 'messianic', icon: '', label: 'Messianic', priority: 3 },
    { id: 'application', icon: '', label: 'Apply', priority: 3 },
    { id: 'questions', icon: '', label: 'Questions', priority: 4 },
    { id: 'bibliography', icon: '', label: 'Sources', priority: 5 },
    
    // ============================================
    // BOOK STUDY SECTIONS (Ruth, etc.)
    // ============================================
    
    // Common book overview sections
    { id: 'opening', icon: '', label: 'Opening', priority: 1 },
    { id: 'cast', icon: '', label: 'Cast', priority: 2 },
    { id: 'journey', icon: '', label: 'Journey', priority: 2 },
    { id: 'structure', icon: '', label: 'Structure', priority: 2 },
    { id: 'chiasm', icon: '', label: 'Chiasm', priority: 3 },
    { id: 'wordplay', icon: '', label: 'Wordplay', priority: 3 },
    { id: 'providence', icon: '', label: 'Providence', priority: 3 },
    { id: 'transformation', icon: '', label: 'Transform', priority: 3 },
    { id: 'key-verses', icon: '', label: 'Verses', priority: 4 },
    { id: 'genealogy', icon: '', label: 'Genealogy', priority: 4 },
    { id: 'further-study', icon: '', label: 'Resources', priority: 5 },
    
    // Literary Design page specific sections
    { id: 'scene-rhythm', icon: '', label: 'Scene Rhythm', priority: 2 },
    { id: 'legal', icon: '', label: 'Legal', priority: 3 },
    { id: 'devices', icon: '', label: 'Devices', priority: 3 },
    { id: 'abrahamic', icon: '', label: 'Abrahamic', priority: 3 },
    { id: 'dialogue', icon: '', label: 'Dialogue', priority: 3 },
    { id: 'chorus', icon: '', label: 'Chorus', priority: 4 },
    { id: 'characters', icon: '', label: 'Characters', priority: 3 },
    
    // ============================================
    // WOMEN-SPECIFIC SECTIONS
    // ============================================
    { id: 'songs', icon: '', label: 'Songs', priority: 4 },
    { id: 'unique', icon: '', label: 'Unique', priority: 4 },
    
    // ============================================
    // THEMATIC SECTIONS
    // ============================================
    { id: 'eden', icon: '', label: 'Eden', priority: 4 },
    { id: 'covenant', icon: '', label: 'Covenant', priority: 4 },
    { id: 'second-temple', icon: '', label: '2nd Temple', priority: 5 },
    { id: 'intertext', icon: '', label: 'Intertext', priority: 4 },
  ];

  // ============================================
  // MOBILE TABS CLASS
  // ============================================
  
  class MobileSectionTabs {
    constructor() {
      this.sections = [];
      this.currentSection = null;
      this.isScrolling = false;
      this.lastScrollY = 0;
      this.tabsContainer = null;
      this.tabsElement = null;
      
      // Touch handling
      this.touchStartX = 0;
      this.touchEndX = 0;
      
      // Initialize if on mobile
      if (this.isMobile()) {
        this.init();
      }
      
      // Re-check on resize
      window.addEventListener('resize', this.debounce(() => {
        if (this.isMobile() && !this.tabsElement) {
          this.init();
        } else if (!this.isMobile() && this.tabsElement) {
          this.destroy();
        }
      }, 250));
    }
    
    /**
     * Check if device is mobile
     */
    isMobile() {
      return window.innerWidth <= 768 || ('ontouchstart' in window);
    }
    
    /**
 * Initialize mobile tabs
 */
init() {
  this.detectSections();
  
  if (this.sections.length > 0) {
    this.createTabsElement();
    
    // FORCE-FIX: Ensure tabs stick to bottom
    const forceTabs = () => {
      if (this.tabsElement) {
        this.tabsElement.style.position = 'fixed';
        this.tabsElement.style.top = '';  // Clear top
        this.tabsElement.style.bottom = '0';
        this.tabsElement.style.left = '0';
        this.tabsElement.style.right = '0';
        this.tabsElement.style.zIndex = '997';
        this.tabsElement.style.transform = 'none';
        this.tabsElement.style.webkitTransform = 'none';
      }
    };
    
    // Apply fix multiple times to ensure it sticks
    forceTabs();
    setTimeout(forceTabs, 0);
    setTimeout(forceTabs, 100);
    setTimeout(forceTabs, 500);
    
    this.generateTabs();
    this.attachListeners();
    this.observeSections();
    this.handleScrollVisibility();
    
    // Add CSS override for extra insurance
    const style = document.createElement('style');
    style.textContent = `
      .mobile-section-tabs {
        position: fixed !important;
        bottom: 0 !important;
        top: unset !important;
        top: initial !important;
        transform: none !important;
      }
    `;
    document.head.appendChild(style);
        
        // Add class to body for CSS adjustments
        document.body.classList.add('has-mobile-tabs');
        
        // Show with animation
        setTimeout(() => {
          this.tabsElement.classList.add('slide-in');
        }, 100);
      }
    }
    
    /**
     * Detect all sections with IDs on the page - ENHANCED VERSION
     */
    detectSections() {
      const configIds = sectionConfig.map(s => s.id);
      const foundSections = [];
      
      // Expanded selectors to catch more section types
      const sectionSelectors = [
        '.theology-card[id]',
        '.chiasm-card[id]',
        '.hook-section[id]',
        '.transformation-ribbon[id]',
        '.characters-section[id]',
        '.study-nav[id]',
        '.providence-note[id]',
        '.abrahamic-parallel[id]',
        '.chorus-card[id]',
        '.devices-card[id]',
        '.legal-card[id]',
        '.structure-card[id]',
        'section[id]',
        'div[id]'
      ];
      
      sectionSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
          const id = element.id;
          // Check if this ID is in our config and not already found
          if (configIds.includes(id) && !foundSections.find(s => s.id === id)) {
            const config = sectionConfig.find(s => s.id === id);
            foundSections.push({
              id: id,
              element: element,
              icon: config.icon,
              label: config.label,
              priority: config.priority
            });
          }
        });
      });
      
      // Sort by document order
      foundSections.sort((a, b) => {
        const posA = a.element.getBoundingClientRect().top;
        const posB = b.element.getBoundingClientRect().top;
        return posA - posB;
      });
      
      // If more than 5 sections, prioritize
      if (foundSections.length > 5) {
        this.sections = this.prioritizeSections(foundSections);
      } else {
        this.sections = foundSections;
      }
      
      console.log(`MobileTabs: Found ${foundSections.length} sections, using ${this.sections.length}`);
      if (this.sections.length > 0) {
        console.log('Active sections:', this.sections.map(s => `${s.label} (#${s.id})`).join(', '));
      }
    }
    
    /**
     * Prioritize sections when more than 5 exist
     */
    prioritizeSections(sections) {
      // Always include priority 1 sections
      const priority1 = sections.filter(s => s.priority === 1);
      const remaining = sections.filter(s => s.priority > 1);
      
      // Sort remaining by priority, then by document order
      remaining.sort((a, b) => {
        if (a.priority !== b.priority) {
          return a.priority - b.priority;
        }
        // If same priority, maintain document order
        return sections.indexOf(a) - sections.indexOf(b);
      });
      
      // Build final list
      const finalSections = [...priority1];
      const spotsLeft = 5 - finalSections.length;
      
      // Add remaining sections up to 5 total
      finalSections.push(...remaining.slice(0, spotsLeft));
      
      // Re-sort by document order for display
      finalSections.sort((a, b) => {
        const posA = a.element.getBoundingClientRect().top;
        const posB = b.element.getBoundingClientRect().top;
        return posA - posB;
      });
      
      return finalSections;
    }
    
/**
 * Create the tabs container element
 */
createTabsElement() {
  this.tabsElement = document.createElement('nav');
  this.tabsElement.className = 'mobile-section-tabs active';
  this.tabsElement.setAttribute('role', 'navigation');
  this.tabsElement.setAttribute('aria-label', 'Section navigation');
  
  // Use individual style properties and 'unset' for top
  this.tabsElement.style.position = 'fixed';
  this.tabsElement.style.top = 'unset';  // This is key - clear any top value
  this.tabsElement.style.bottom = '0px';
  this.tabsElement.style.left = '0px';
  this.tabsElement.style.right = '0px';
  this.tabsElement.style.zIndex = '997';
  this.tabsElement.style.display = 'block';
  
  this.tabsContainer = document.createElement('div');
  this.tabsContainer.className = 'tabs-container';
  
  this.tabsElement.appendChild(this.tabsContainer);
  document.body.appendChild(this.tabsElement);
}
    
    /**
     * Generate tab elements
     */
    generateTabs() {
      this.sections.forEach((section, index) => {
        const tab = document.createElement('button');
        tab.className = 'tab-item';
        tab.setAttribute('data-target', `#${section.id}`);
        tab.setAttribute('aria-label', `${section.label} section`);
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', '0');
        
        // Check if icon exists and is not empty
        if (section.icon && section.icon.trim() !== '') {
          // Version with icon
          tab.innerHTML = `
            <span class="tab-icon" aria-hidden="true">${section.icon}</span>
            <span class="tab-label">${section.label}</span>
          `;
        } else {
          // Text-only version for cleaner look
          tab.innerHTML = `
            <span class="tab-label-only">${section.label}</span>
          `;
        }
        
        // First tab is active by default
        if (index === 0) {
          tab.classList.add('active');
          tab.setAttribute('aria-selected', 'true');
        } else {
          tab.setAttribute('aria-selected', 'false');
        }
        
        // Store reference on section object
        section.tab = tab;
        
        this.tabsContainer.appendChild(tab);
      });
      
      // Check for scroll indicators
      this.updateScrollIndicators();
    }
    
    /**
 * Enhanced attachListeners() method for MobileSectionTabs class
 * Replace the existing attachListeners() method with this version
 */
attachListeners() {
  let isScrolling = false;
  let scrollTimeout;
  let touchStartTime;
  let touchStartX;
  let touchStartY;
  
  // Track scroll state
  this.tabsContainer.addEventListener('scroll', () => {
    this.tabsContainer.classList.add('is-scrolling');
    isScrolling = true;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      this.tabsContainer.classList.remove('is-scrolling');
      isScrolling = false;
    }, 150); // Wait 150ms after scroll ends
    
    this.updateScrollIndicators();
  }, { passive: true });
  
  // Enhanced touch handling to differentiate scroll from tap
  this.tabsContainer.addEventListener('touchstart', (e) => {
    touchStartTime = Date.now();
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    this.touchStartX = e.changedTouches[0].screenX; // For swipe detection
  }, { passive: true });
  
  this.tabsContainer.addEventListener('touchend', (e) => {
    const touchEndTime = Date.now();
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    this.touchEndX = e.changedTouches[0].screenX; // For swipe detection
    
    // Calculate touch duration and movement
    const touchDuration = touchEndTime - touchStartTime;
    const horizontalMove = Math.abs(touchEndX - touchStartX);
    const verticalMove = Math.abs(touchEndY - touchStartY);
    
    // If it was a quick tap with minimal movement, handle as click
    if (touchDuration < 300 && horizontalMove < 10 && verticalMove < 10) {
      const tab = e.target.closest('.tab-item');
      if (tab && !isScrolling) {
        const targetId = tab.getAttribute('data-target').substring(1);
        const section = this.sections.find(s => s.id === targetId);
        if (section) {
          this.scrollToSection(section);
          this.setActiveTab(tab);
        }
      }
    } else if (horizontalMove > 50) {
      // Handle horizontal swipe for section navigation
      this.handleSwipe();
    }
    
    e.preventDefault(); // Prevent click event from firing
  }, { passive: false });
  
  // Prevent regular click events - only use touch events on mobile
  this.tabsContainer.addEventListener('click', (e) => {
    // Only handle clicks on non-touch devices
    if (!('ontouchstart' in window)) {
      const tab = e.target.closest('.tab-item');
      if (tab && !isScrolling) {
        const targetId = tab.getAttribute('data-target').substring(1);
        const section = this.sections.find(s => s.id === targetId);
        if (section) {
          this.scrollToSection(section);
          this.setActiveTab(tab);
        }
      }
    } else {
      // On touch devices, prevent click events
      e.preventDefault();
      e.stopPropagation();
    }
  });
  
  // Keyboard navigation (unchanged)
  this.tabsContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      this.handleKeyboardNav(e);
    }
  });
}
    
    /**
     * Handle swipe gestures for section navigation
     */
    handleSwipe() {
      const swipeDistance = this.touchEndX - this.touchStartX;
      const minSwipeDistance = 50;
      
      if (Math.abs(swipeDistance) < minSwipeDistance) return;
      
      const currentIndex = this.sections.findIndex(s => s.tab.classList.contains('active'));
      let newIndex;
      
      if (swipeDistance > 0) {
        // Swipe right - go to previous section
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        // Swipe left - go to next section
        newIndex = Math.min(this.sections.length - 1, currentIndex + 1);
      }
      
      if (newIndex !== currentIndex) {
        this.scrollToSection(this.sections[newIndex]);
        this.setActiveTab(this.sections[newIndex].tab);
      }
    }
    
    /**
     * Handle keyboard navigation
     */
    handleKeyboardNav(e) {
      const tabs = Array.from(this.tabsContainer.querySelectorAll('.tab-item'));
      const currentTab = document.activeElement;
      const currentIndex = tabs.indexOf(currentTab);
      
      if (currentIndex === -1) return;
      
      let newIndex;
      if (e.key === 'ArrowLeft') {
        newIndex = Math.max(0, currentIndex - 1);
      } else {
        newIndex = Math.min(tabs.length - 1, currentIndex + 1);
      }
      
      tabs[newIndex].focus();
      tabs[newIndex].click();
    }
    
    /**
     * Scroll to a section
     */
    scrollToSection(section) {
      const offset = 20; // Small offset from top since nav isn't sticky
      const elementTop = section.element.getBoundingClientRect().top;
      const scrollTop = window.pageYOffset + elementTop - offset;
      
      window.scrollTo({
        top: scrollTop,
        behavior: 'smooth'
      });
    }
    
    /**
     * Set active tab
     */
    setActiveTab(tab) {
      // Remove active from all tabs
      this.sections.forEach(s => {
        s.tab.classList.remove('active');
        s.tab.setAttribute('aria-selected', 'false');
      });
      
      // Add active to current tab
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      // Ensure tab is visible in container
      this.ensureTabVisible(tab);
    }
    
    /**
     * Ensure active tab is visible in scrollable container
     */
    ensureTabVisible(tab) {
      const container = this.tabsContainer;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerScroll = container.scrollLeft;
      const containerWidth = container.offsetWidth;
      
      if (tabLeft < containerScroll) {
        container.scrollTo({
          left: tabLeft - 20,
          behavior: 'smooth'
        });
      } else if (tabLeft + tabWidth > containerScroll + containerWidth) {
        container.scrollTo({
          left: tabLeft + tabWidth - containerWidth + 20,
          behavior: 'smooth'
        });
      }
    }
    
    /**
     * Update scroll indicators
     */
    updateScrollIndicators() {
      const container = this.tabsContainer;
      const isAtStart = container.scrollLeft <= 10;
      const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.offsetWidth - 10);
      
      this.tabsElement.classList.toggle('scroll-start', !isAtStart);
      this.tabsElement.classList.toggle('scroll-end', !isAtEnd);
      this.tabsElement.classList.toggle('scroll-middle', !isAtStart && !isAtEnd);
    }
    
    /**
 * Observe sections for intersection
 */
observeSections() {
  // More aggressive intersection detection for better scroll tracking
  const options = {
    root: null,
    rootMargin: '-20% 0% -70% 0%',  // Top 20% to 30% of viewport
    threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]  // More granular detection
  };
  
  const observer = new IntersectionObserver((entries) => {
    let mostVisibleSection = null;
    let highestRatio = 0;
    
    // Find the most visible section
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
        highestRatio = entry.intersectionRatio;
        mostVisibleSection = entry.target;
      }
    });
    
    // Update active tab for most visible section
    if (mostVisibleSection) {
      const section = this.sections.find(s => s.element === mostVisibleSection);
      if (section && section.tab) {
        this.setActiveTab(section.tab);
      }
    }
  }, options);
  
  // Observe all sections
  this.sections.forEach(section => {
    observer.observe(section.element);
  });
  
  // ALSO ADD: Backup scroll listener for better detection
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollPos = window.pageYOffset + (window.innerHeight * 0.3);  // Look at top 30% of viewport
      
      // Find which section we're in
      let activeSection = null;
      this.sections.forEach(section => {
        const rect = section.element.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
          activeSection = section;
        }
      });
      
      // If no section contains scroll position, find the closest one
      if (!activeSection) {
        let closestDistance = Infinity;
        this.sections.forEach(section => {
          const rect = section.element.getBoundingClientRect();
          const sectionTop = rect.top + window.pageYOffset;
          const distance = Math.abs(scrollPos - sectionTop);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            activeSection = section;
          }
        });
      }
      
      // Update active tab
      if (activeSection && activeSection.tab) {
        this.setActiveTab(activeSection.tab);
      }
    }, 100);  // Debounce for performance
  });
}
    
    /**
     * Handle scroll visibility (keep tabs always visible for better UX)
     */
    handleScrollVisibility() {
      // Tabs stay visible always - no hiding on scroll
      // This provides better navigation UX
    }
    
    /**
     * Destroy mobile tabs
     */
    destroy() {
      if (this.tabsElement) {
        this.tabsElement.remove();
        this.tabsElement = null;
        this.tabsContainer = null;
      }
      
      document.body.classList.remove('has-mobile-tabs');
      this.sections = [];
    }
    
    /**
     * Utility: Debounce function
     */
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  }

  // ============================================
  // EXISTING CHARACTER PAGE FUNCTIONALITY
  // ============================================
  
  // Utility: safe query helpers
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  
  // Reading progress indicator
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = $('.reading-progress');
    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }
  });
  
  // Debounced scroll handler for nav and back-to-top
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      const nav = $('nav');
      const backToTop = $('.back-to-top');
      
      if (window.scrollY > 100) {
        nav?.classList.add('scrolled');
      } else {
        nav?.classList.remove('scrolled');
      }
      
      // Back to top button visibility
      if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });
  });
  
  // Intersection Observer for section animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Apply to all animated cards
  $$('.animate-on-scroll').forEach(card => {
    animationObserver.observe(card);
  });
  
  // Smooth scrolling for anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = $(this.getAttribute('href'));
      if (target) {
        // Close mobile menu if open
        $('.mobile-menu-toggle')?.classList.remove('active');
        $('.nav-links')?.classList.remove('active');
        $('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
        
        // Scroll to target
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Quick Navigation Sidebar (Desktop)
  const buildQuickNav = () => {
    const quickNavSidebar = $('.quick-nav-sidebar');
    if (!quickNavSidebar || window.innerWidth <= 1400) return;
    
    // Find all sections
    const sections = $$('.theology-card[id], .chiasm-card[id], .hook-section[id], .transformation-ribbon[id], [id^="section-"]');
    
    // Clear existing items
    quickNavSidebar.innerHTML = '';
    
    // Create nav items
    sections.forEach(section => {
      const id = section.id;
      const heading = section.querySelector('h3, h2');
      const label = heading ? heading.textContent.trim() : id;
      
      const navItem = document.createElement('div');
      navItem.className = 'quick-nav-item';
      navItem.setAttribute('data-label', label);
      navItem.setAttribute('data-target', `#${id}`);
      
      navItem.addEventListener('click', () => {
        const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
      
      quickNavSidebar.appendChild(navItem);
    });
    
    // Highlight active section in quick nav
    window.addEventListener('scroll', () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
          current = section.getAttribute('id');
        }
      });
      
      $$('.quick-nav-item').forEach(item => {
        item.classList.remove('active');
        const target = item.getAttribute('data-target');
        if (target === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  };
  
  // Enhanced table scroll for mobile
  $$('table').forEach(table => {
    if (!table.parentElement.classList.contains('table-wrapper')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('table-wrapper');
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitOverflowScrolling = 'touch';
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  });
  
  // Performance optimization - Debounce resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(() => {
      // Re-check mobile menu state
      if (window.innerWidth > 768) {
        $('.mobile-menu-toggle')?.classList.remove('active');
        $('.nav-links')?.classList.remove('active');
        $('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
      }
      
      // Rebuild quick nav if needed
      if (window.innerWidth > 1400) {
        buildQuickNav();
      }
    }, 250);
  });
  
  // Print optimization
  window.addEventListener('beforeprint', () => {
    // Expand all sections for printing
    $$('.animate-on-scroll').forEach(section => {
      section.classList.add('visible');
    });
    $$('.timeline-item').forEach(item => {
      item.classList.add('loaded');
    });
    
    // Expand bibliography if collapsed
    const bibliography = $('.bibliography-section');
    if (bibliography) {
      bibliography.setAttribute('open', 'true');
    }
  });
  
  // Bibliography expand/collapse smooth animation
  const bibliographyDetails = $('.bibliography-section');
  if (bibliographyDetails) {
    bibliographyDetails.addEventListener('toggle', (e) => {
      const indicator = bibliographyDetails.querySelector('.expand-indicator');
      if (indicator) {
        if (bibliographyDetails.open) {
          indicator.style.transform = 'rotate(180deg)';
        } else {
          indicator.style.transform = 'rotate(0deg)';
        }
      }
    });
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Character Page v5.8 initialized - Complete Fixed Version');
    
    // Initialize mobile tabs
    window.mobileTabs = new MobileSectionTabs();
    
    // Build desktop quick nav
    buildQuickNav();
    
    // Log detected sections for debugging
    if (window.mobileTabs && window.mobileTabs.sections.length > 0) {
      console.log('Mobile tabs created for sections:', 
        window.mobileTabs.sections.map(s => `${s.label} (#${s.id})`).join(', '));
    } else {
      console.log('No mobile tabs created - no matching sections found');
    }
  });
  
  // Expose utilities globally if needed
  window.__pcq = { $, $$ };
  
})();