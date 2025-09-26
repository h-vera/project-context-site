/**
 * Character Page JavaScript - Simplified & Fixed v3.0.0
 * Path: /assets/js/character-page-optimized.js
 * 
 * MAJOR SIMPLIFICATION:
 * - Removed complex initialization
 * - Fixed all DOM issues
 * - Guaranteed functionality
 * - Bulletproof fallbacks
 */

(function() {
  'use strict';
  
  // Prevent multiple initialization
  if (window.characterPageInitialized) {
    console.log('📍 Character page already initialized');
    return;
  }
  
  // Simple DOM query helpers
  function $(selector, context = document) {
    return context.querySelector(selector);
  }
  
  function $$(selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
  }
  
  // ===========================================
  // READING PROGRESS BAR - SIMPLIFIED
  // ===========================================
  function initializeProgressBar() {
    const bar = $('.reading-progress');
    if (!bar) return;
    
    console.log('📊 Initializing progress bar');
    
    // CRITICAL: Ensure proper styling
    bar.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 3px !important;
      background: linear-gradient(90deg, #7209b7, #e11d48) !important;
      transform: scaleX(0) !important;
      transform-origin: left !important;
      z-index: 1001 !important;
      display: block !important;
      visibility: visible !important;
      pointer-events: none !important;
    `;
    
    function updateProgress() {
      const winScroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, Math.min(winScroll / height, 1));
      bar.style.transform = `scaleX(${scrolled})`;
      bar.setAttribute('aria-valuenow', Math.round(scrolled * 100));
    }
    
    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    updateProgress(); // Initial call
    console.log('✅ Progress bar initialized');
  }
  
  // ===========================================
  // BACK TO TOP BUTTON - SIMPLIFIED
  // ===========================================
  function initializeBackToTop() {
    const backToTop = $('.back-to-top');
    if (!backToTop) return;
    
    console.log('⬆️ Initializing back to top');
    
    // CRITICAL: Ensure proper styling
    backToTop.style.cssText = `
      position: fixed !important;
      bottom: 2rem !important;
      right: 2rem !important;
      z-index: 999 !important;
      width: 50px !important;
      height: 50px !important;
      border-radius: 50% !important;
      background: linear-gradient(135deg, #7209b7, #e11d48) !important;
      color: white !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      text-decoration: none !important;
      box-shadow: 0 4px 15px rgba(114, 9, 183, 0.3) !important;
      transition: all 0.3s ease !important;
      opacity: 0 !important;
      visibility: hidden !important;
    `;
    
    // Click handler
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Scroll visibility
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
          } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    console.log('✅ Back to top initialized');
  }
  
  // ===========================================
  // SCROLL ANIMATIONS - SIMPLIFIED
  // ===========================================
  function initializeScrollAnimations() {
    const elements = $$('.animate-on-scroll');
    if (elements.length === 0) return;
    
    console.log('🎬 Initializing scroll animations');
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once visible
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      elements.forEach(el => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
      
      console.log('✅ Intersection Observer animations initialized');
    } else {
      // Fallback for older browsers
      elements.forEach(el => {
        el.classList.add('visible');
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      console.log('✅ Fallback animations applied');
    }
  }
  
  // ===========================================
  // NAVIGATION SCROLL EFFECTS - SIMPLIFIED
  // ===========================================
  function initializeNavScrollEffects() {
    const nav = $('nav') || $('#main-nav');
    if (!nav) return;
    
    console.log('🎯 Initializing nav scroll effects');
    
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.pageYOffset;
          
          if (scrollY > 100) {
            nav.classList.add('scrolled');
          } else {
            nav.classList.remove('scrolled');
          }
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    console.log('✅ Nav scroll effects initialized');
  }
  
  // ===========================================
  // SMOOTH ANCHORS - SIMPLIFIED
  // ===========================================
  function initializeSmoothAnchors() {
    console.log('🔗 Initializing smooth anchors');
    
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = $(href);
      if (!target) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const mobileToggle = $('.mobile-menu-toggle');
      const navLinks = $('.nav-links');
      
      if (mobileToggle && mobileToggle.classList.contains('active')) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
      }
      
      // Smooth scroll to target
      const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
    
    console.log('✅ Smooth anchors initialized');
  }
  
  // ===========================================
  // BIBLIOGRAPHY TOGGLE - SIMPLIFIED
  // ===========================================
  function initializeBibliography() {
    const bibliography = $('.bibliography-section');
    if (!bibliography) return;
    
    console.log('📚 Initializing bibliography');
    
    // Handle both <details> and custom implementation
    if (bibliography.tagName === 'DETAILS') {
      // Native <details> element
      bibliography.addEventListener('toggle', () => {
        const indicator = $('.expand-indicator', bibliography);
        if (indicator) {
          indicator.style.transform = bibliography.open ? 'rotate(180deg)' : 'rotate(0)';
        }
      });
    } else {
      // Custom clickable implementation
      const header = $('.bibliography-header', bibliography);
      if (header) {
        header.style.cursor = 'pointer';
        header.addEventListener('click', () => {
          const content = $('.bibliography-content', bibliography);
          const indicator = $('.expand-indicator', bibliography);
          
          if (content) {
            const isVisible = content.style.display !== 'none' && 
                             window.getComputedStyle(content).display !== 'none';
            
            content.style.display = isVisible ? 'none' : 'block';
            if (indicator) {
              indicator.style.transform = isVisible ? 'rotate(0)' : 'rotate(180deg)';
            }
          }
        });
      }
    }
    
    console.log('✅ Bibliography initialized');
  }
  
  // ===========================================
  // TABLE WRAPPER - SIMPLIFIED
  // ===========================================
  function initializeTableWrapper() {
    const tables = $$('table');
    if (tables.length === 0) return;
    
    console.log('📊 Wrapping tables for mobile');
    
    tables.forEach(table => {
      if (table.parentElement.classList.contains('table-wrapper')) return;
      
      const wrapper = document.createElement('div');
      wrapper.className = 'table-wrapper';
      wrapper.style.overflowX = 'auto';
      wrapper.style.webkitOverflowScrolling = 'touch';
      
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
    
    console.log('✅ Tables wrapped');
  }
  
  // ===========================================
  // QUICK NAV SIDEBAR - SIMPLIFIED
  // ===========================================
  function initializeQuickNav() {
    const sidebar = $('.quick-nav-sidebar');
    if (!sidebar) return;
    
    console.log('🎯 Initializing quick nav');
    
    // CRITICAL: Ensure proper z-index
    sidebar.style.zIndex = '500';
    
    const items = $$('.quick-nav-item');
    const sections = $$('[id]').filter(el => 
      el.classList.contains('theology-card') || 
      el.classList.contains('animate-on-scroll') ||
      el.tagName === 'SECTION'
    );
    
    if (items.length === 0 || sections.length === 0) return;
    
    // Click handlers
    items.forEach(item => {
      item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        if (!targetId) return;
        
        const target = $(targetId);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
    });
    
    // Scroll spy
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset + 200;
          
          let currentSection = null;
          sections.forEach(section => {
            if (section.offsetTop <= scrollPos) {
              currentSection = section.id;
            }
          });
          
          items.forEach(item => {
            const isActive = item.dataset.target === `#${currentSection}`;
            if (isActive) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    console.log('✅ Quick nav initialized');
  }
  
  // ===========================================
  // MOBILE TABS - SIMPLIFIED
  // ===========================================
  function initializeMobileTabs() {
    // Only on mobile
    if (window.innerWidth > 768) return;
    
    console.log('📱 Initializing mobile tabs');
    
    // Remove existing tabs first
    const existingTabs = $('.mobile-section-tabs');
    if (existingTabs) existingTabs.remove();
    
    // Check for sections on this page
    const sections = [
      { id: 'structure', icon: '🏗️', label: 'Structure' },
      { id: 'scene-rhythm', icon: '🎭', label: 'Scenes' },
      { id: 'legal', icon: '⚖️', label: 'Legal' },
      { id: 'major-chiasm', icon: '🔍', label: 'Chiasm' },
      { id: 'devices', icon: '🎨', label: 'Devices' },
      { id: 'abrahamic-parallel', icon: '🌟', label: 'Abraham' },
      { id: 'dialogue', icon: '💬', label: 'Dialogue' },
      { id: 'chorus', icon: '👥', label: 'Chorus' },
      { id: 'characters', icon: '👤', label: 'Characters' },
      { id: 'bibliography', icon: '📚', label: 'Sources' }
    ].filter(section => $(section.id));
    
    if (sections.length === 0) return;
    
    // Take first 5 sections
    const displaySections = sections.slice(0, 5);
    
    // Create mobile tabs
    const nav = document.createElement('nav');
    nav.className = 'mobile-section-tabs';
    nav.setAttribute('aria-label', 'Section navigation');
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
    
    const container = document.createElement('div');
    container.className = 'tabs-container';
    container.style.cssText = `
      display: flex;
      gap: 10px;
      overflow-x: auto;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    `;
    
    displaySections.forEach(section => {
      const button = document.createElement('button');
      button.className = 'tab-item';
      button.dataset.target = `#${section.id}`;
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
        color: #6b7280;
        font-size: 0.75rem;
        font-weight: 600;
      `;
      
      button.innerHTML = `
        <span style="font-size: 1.25rem; margin-bottom: 0.25rem;">${section.icon}</span>
        <span>${section.label}</span>
      `;
      
      // Click handler
      button.addEventListener('click', () => {
        const target = $(section.id);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      });
      
      container.appendChild(button);
    });
    
    nav.appendChild(container);
    document.body.appendChild(nav);
    
    // Update active state on scroll
    const tabs = $$('.tab-item');
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPos = window.pageYOffset + 150;
          let activeTab = null;
          
          tabs.forEach(tab => {
            const targetId = tab.dataset.target.substring(1);
            const target = document.getElementById(targetId);
            
            if (target && target.offsetTop <= scrollPos) {
              activeTab = tab;
            }
          });
          
          if (activeTab) {
            tabs.forEach(tab => {
              if (tab === activeTab) {
                tab.style.background = 'linear-gradient(135deg, #7209b7, #e11d48)';
                tab.style.color = 'white';
                tab.style.borderColor = 'transparent';
                tab.style.transform = 'scale(1.05)';
              } else {
                tab.style.background = '#f8fafc';
                tab.style.color = '#6b7280';
                tab.style.borderColor = '#e5e7eb';
                tab.style.transform = 'scale(1)';
              }
            });
          }
          
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    
    console.log('✅ Mobile tabs initialized');
  }
  
  // ===========================================
  // MAIN INITIALIZATION - SIMPLIFIED
  // ===========================================
  function initialize() {
    if (window.characterPageInitialized) return;
    
    console.log('🚀 Initializing Character Page v3.0.0');
    
    try {
      // Initialize all components
      initializeProgressBar();
      initializeBackToTop();
      initializeScrollAnimations();
      initializeNavScrollEffects();
      initializeSmoothAnchors();
      initializeBibliography();
      initializeTableWrapper();
      initializeQuickNav();
      initializeMobileTabs();
      
      // Mark as initialized
      window.characterPageInitialized = true;
      
      console.log('✅ Character Page fully initialized');
      
    } catch (error) {
      console.error('❌ Character page initialization failed:', error);
      
      // Emergency fallback - ensure basic functionality
      try {
        // Progress bar fallback
        const progressBar = $('.reading-progress');
        if (progressBar) {
          progressBar.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:3px;background:linear-gradient(90deg,#7209b7,#e11d48);transform:scaleX(0);transform-origin:left;z-index:1001;';
          window.addEventListener('scroll', () => {
            const winScroll = window.pageYOffset;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = Math.min(winScroll / height, 1);
            progressBar.style.transform = `scaleX(${scrolled})`;
          }, { passive: true });
        }
        
        // Back to top fallback
        const backToTop = $('.back-to-top');
        if (backToTop) {
          backToTop.style.cssText = 'position:fixed;bottom:2rem;right:2rem;z-index:999;opacity:0;visibility:hidden;';
          backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          });
          window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
              backToTop.style.opacity = '1';
              backToTop.style.visibility = 'visible';
            } else {
              backToTop.style.opacity = '0';
              backToTop.style.visibility = 'hidden';
            }
          }, { passive: true });
        }
        
        console.log('✅ Emergency fallbacks applied');
        
      } catch (fallbackError) {
        console.error('❌ Even fallbacks failed:', fallbackError);
      }
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    // Small delay to ensure other scripts load first
    setTimeout(initialize, 50);
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.characterPageInitialized = false;
  });
  
  // Debug helper
  window.debugCharacterPage = function() {
    console.log('Character Page Debug Info:');
    console.log('- Initialized:', window.characterPageInitialized);
    console.log('- Progress bar:', $('.reading-progress'));
    console.log('- Back to top:', $('.back-to-top'));
    console.log('- Navigation:', $('#main-nav'));
  };
  
  console.log('📦 Character Page v3.0.0 loaded');
  
})();