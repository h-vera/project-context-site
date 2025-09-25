/**
 * Minimal Page Initialization Script
 * Path: /assets/js/page-init-minimal.js
 * Version: 1.0.0
 * 
 * This replaces inline script tags and handles page-specific initialization
 * with proper error handling and fallbacks.
 */

(function() {
  'use strict';
  
  // Prevent multiple initialization
  if (window.pageInitialized) {
    return;
  }
  
  function initializePage() {
    try {
      console.log('🚀 Starting page initialization...');
      
      // Initialize Navigation Component with proper error handling
      if (typeof window.initializeNavigation === 'function') {
        window.navInstance = window.initializeNavigation({
          currentPage: 'studies/tanakh/ketuvim/ruth/ruth-literary',
          hubType: 'tanakh'
        });
        console.log('✅ Navigation initialized');
      } else {
        console.warn('⚠️ Navigation function not available, creating fallback');
        createEmergencyNavigation();
      }
      
      // Mark as initialized
      window.pageInitialized = true;
      console.log('✅ Ruth Literary Design & Structure page loaded successfully');
      
    } catch (error) {
      console.error('❌ Page initialization error:', error);
      // Ensure body has proper spacing as fallback
      ensureProperSpacing();
      createEmergencyNavigation();
    }
  }
  
  function createEmergencyNavigation() {
    // Only create if navigation doesn't already exist
    if (document.getElementById('main-nav')) {
      return;
    }
    
    console.log('🔧 Creating emergency navigation...');
    
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
    
    // Apply styles directly for reliability
    nav.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    `;
    
    nav.innerHTML = `
      <div style="max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
        <a href="/" style="display: flex; align-items: center; gap: 0.75rem; font-weight: 700; font-size: 1.5rem; color: #0a0a0a; text-decoration: none; letter-spacing: -0.5px;">
          <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0;">
            <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <ellipse cx="50" cy="50" rx="25" ry="15" stroke="currentColor" stroke-width="3" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="#00b4d8"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
          <span>Project Context</span>
        </a>
        
        <div style="display: flex; gap: 2rem; align-items: center;">
          <a href="/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;">Home</a>
          <a href="/studies/" style="text-decoration: none; color: #0a0a0a; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; background: rgba(0, 0, 0, 0.05);">Studies</a>
          <a href="/resources/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;">Resources</a>
          <a href="/about/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;">About</a>
        </div>
      </div>
    `;
    
    // Insert at the beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(nav, document.body.firstChild);
    } else {
      document.body.appendChild(nav);
    }
    
    // Add hover effects
    const links = nav.querySelectorAll('a:not(:first-child)');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.color = '#0a0a0a';
        link.style.background = 'rgba(0, 0, 0, 0.05)';
      });
      link.addEventListener('mouseleave', () => {
        if (!link.style.background.includes('0.05')) {
          link.style.color = '#6b7280';
          link.style.background = 'transparent';
        }
      });
    });
    
    console.log('✅ Emergency navigation created');
  }
  
  function ensureProperSpacing() {
    if (document.body) {
      // Ensure content doesn't hide behind fixed nav
      document.body.style.paddingTop = '80px';
      
      // Ensure reading progress bar is visible
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.zIndex = '1001';
        progressBar.style.position = 'fixed';
      }
      
      // Ensure back-to-top button is properly positioned
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        backToTop.style.zIndex = '999';
        backToTop.style.position = 'fixed';
      }
    }
  }
  
  // Initialize based on DOM state with proper timing
  if (document.readyState === 'loading') {
    // DOM still loading
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a moment for other scripts to load
      setTimeout(initializePage, 50);
    });
  } else if (document.readyState === 'interactive') {
    // DOM loaded but resources may still be loading
    setTimeout(initializePage, 25);
  } else {
    // DOM and resources fully loaded
    setTimeout(initializePage, 10);
  }
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.pageInitialized = false;
  });
  
  // Debug helper
  window.debugPageInit = function() {
    console.log('Page initialization debug info:');
    console.log('- Navigation instance:', window.navInstance);
    console.log('- Navigation element:', document.getElementById('main-nav'));
    console.log('- Character page app:', window.CharacterPageApp);
    console.log('- Page initialized:', window.pageInitialized);
  };
  
})();