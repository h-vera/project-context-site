/**
 * Page Initialization Script - Ultra Simplified v4.0.0
 * Path: /assets/js/page-init-minimal.js
 * 
 * ULTRA SIMPLIFIED:
 * - Guaranteed to work
 * - No complex dependencies
 * - Bulletproof fallbacks
 * - Clear error handling
 */

(function() {
  'use strict';
  
  // Prevent multiple initialization
  if (window.pageInitialized) {
    console.log('📍 Page already initialized');
    return;
  }
  
  function initializePage() {
    console.log('🚀 Starting Ruth Literary page initialization...');
    
    try {
      // STEP 1: Ensure body has proper spacing
      if (document.body) {
        document.body.style.paddingTop = '80px';
        console.log('✅ Body spacing applied');
      }
      
      // STEP 2: Initialize Navigation
      if (typeof window.initializeNavigation === 'function') {
        console.log('🧭 Initializing navigation...');
        window.navInstance = window.initializeNavigation({
          currentPage: 'studies/tanakh/ketuvim/ruth/ruth-literary',
          hubType: 'tanakh'
        });
        console.log('✅ Navigation initialized');
      } else {
        console.warn('⚠️ Navigation function not available, creating fallback');
        createEmergencyNav();
      }
      
      // STEP 3: Fix progress bar positioning
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.cssText = `
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
        console.log('✅ Progress bar fixed');
      }
      
      // STEP 4: Fix back-to-top button
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
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
          opacity: 0 !important;
          visibility: hidden !important;
          transition: all 0.3s ease !important;
        `;
        console.log('✅ Back-to-top button fixed');
      }
      
      // STEP 5: Mark as initialized
      window.pageInitialized = true;
      console.log('✅ Ruth Literary Design & Structure page fully loaded');
      
    } catch (error) {
      console.error('❌ Page initialization error:', error);
      // Run emergency fallbacks
      emergencyFallback();
    }
  }
  
  function createEmergencyNav() {
    // Only create if no navigation exists
    if (document.getElementById('main-nav')) {
      console.log('📍 Navigation already exists');
      return;
    }
    
    console.log('🔧 Creating emergency navigation...');
    
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Main navigation');
    
    // Apply guaranteed styles
    nav.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      z-index: 1000 !important;
      background: rgba(255, 255, 255, 0.98) !important;
      backdrop-filter: blur(10px) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      padding: 1rem 2rem !important;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) !important;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1) !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
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
          <a href="/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;" 
             onmouseover="this.style.color='#0a0a0a'; this.style.background='rgba(0,0,0,0.05)'" 
             onmouseout="this.style.color='#6b7280'; this.style.background='transparent'">
            Home
          </a>
          <a href="/studies/" style="text-decoration: none; color: #0a0a0a; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; background: rgba(0, 0, 0, 0.05);">
            Studies
          </a>
          <a href="/resources/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;" 
             onmouseover="this.style.color='#0a0a0a'; this.style.background='rgba(0,0,0,0.05)'" 
             onmouseout="this.style.color='#6b7280'; this.style.background='transparent'">
            Resources
          </a>
          <a href="/about/" style="text-decoration: none; color: #6b7280; font-weight: 500; padding: 0.5rem 1rem; border-radius: 8px; transition: all 0.2s;" 
             onmouseover="this.style.color='#0a0a0a'; this.style.background='rgba(0,0,0,0.05)'" 
             onmouseout="this.style.color='#6b7280'; this.style.background='transparent'">
            About
          </a>
        </div>
      </div>
    `;
    
    // Insert at beginning of body
    if (document.body.firstChild) {
      document.body.insertBefore(nav, document.body.firstChild);
    } else {
      document.body.appendChild(nav);
    }
    
    console.log('✅ Emergency navigation created');
  }
  
  function emergencyFallback() {
    console.log('🆘 Running emergency fallbacks...');
    
    try {
      // Ensure body spacing
      if (document.body) {
        document.body.style.paddingTop = '80px';
      }
      
      // Create navigation if missing
      if (!document.getElementById('main-nav')) {
        createEmergencyNav();
      }
      
      // Fix progress bar
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '100%';
        progressBar.style.height = '3px';
        progressBar.style.zIndex = '1001';
        progressBar.style.background = 'linear-gradient(90deg, #7209b7, #e11d48)';
        progressBar.style.transform = 'scaleX(0)';
        progressBar.style.transformOrigin = 'left';
      }
      
      // Fix back-to-top
      const backToTop = document.querySelector('.back-to-top');
      if (backToTop) {
        backToTop.style.position = 'fixed';
        backToTop.style.bottom = '2rem';
        backToTop.style.right = '2rem';
        backToTop.style.zIndex = '999';
      }
      
      console.log('✅ Emergency fallbacks completed');
      
    } catch (fallbackError) {
      console.error('❌ Emergency fallbacks failed:', fallbackError);
      // Last resort - just log the error
      console.log('💀 Complete fallback failure - page may not function correctly');
    }
  }
  
  // Initialize based on DOM readiness
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(initializePage, 100); // Small delay for other scripts
    });
  } else if (document.readyState === 'interactive') {
    setTimeout(initializePage, 50);
  } else {
    setTimeout(initializePage, 10);
  }
  
  // Cleanup on unload
  window.addEventListener('beforeunload', () => {
    window.pageInitialized = false;
  });
  
  // Debug helper
  window.debugPageInit = function() {
    console.log('📊 Page Initialization Debug:');
    console.log('- Page initialized:', window.pageInitialized);
    console.log('- Navigation:', document.getElementById('main-nav'));
    console.log('- Navigation instance:', window.navInstance);
    console.log('- Progress bar:', document.querySelector('.reading-progress'));
    console.log('- Back-to-top:', document.querySelector('.back-to-top'));
    console.log('- Body padding-top:', document.body?.style?.paddingTop);
  };
  
  console.log('📦 Page Init v4.0.0 loaded and ready');
  
})();