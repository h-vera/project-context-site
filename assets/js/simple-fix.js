/**
 * Simple Working JavaScript - Replace all your JS files with this one file
 * Save as: /assets/js/simple-fix.js
 */

(function() {
  'use strict';
  
  console.log('🚀 Simple fixes starting...');
  
  // Function 1: Create Navigation
  function createNavigation() {
    // Don't create if already exists
    if (document.getElementById('main-nav')) {
      console.log('Navigation already exists');
      return;
    }
    
    console.log('Creating navigation...');
    
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.innerHTML = `
      <div class="nav-container">
        <a href="/" class="logo">
          <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round"/>
            <ellipse cx="50" cy="50" rx="25" ry="15" stroke="currentColor" stroke-width="3" fill="none"/>
            <circle cx="50" cy="50" r="8" fill="#00b4d8"/>
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
          </svg>
          <span>Project Context</span>
        </a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/studies/" class="active">Studies</a></li>
          <li><a href="/resources/">Resources</a></li>
          <li><a href="/about/">About</a></li>
        </ul>
      </div>
    `;
    
    // Insert at beginning of body
    document.body.insertBefore(nav, document.body.firstChild);
    console.log('✅ Navigation created successfully');
  }
  
  // Function 2: Setup Progress Bar
  function setupProgressBar() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) {
      console.log('No progress bar found');
      return;
    }
    
    function updateProgress() {
      const winScroll = window.pageYOffset;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? winScroll / height : 0;
      progressBar.style.transform = 'scaleX(' + Math.min(scrolled, 1) + ')';
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
    console.log('✅ Progress bar working');
  }
  
  // Function 3: Setup Bibliography Toggle
  function setupBibliography() {
    const bibliography = document.querySelector('.bibliography-section');
    if (!bibliography) {
      console.log('No bibliography found');
      return;
    }
    
    const header = bibliography.querySelector('.bibliography-header');
    const content = bibliography.querySelector('.bibliography-content');
    const indicator = bibliography.querySelector('.expand-indicator');
    
    if (!header || !content) {
      console.log('Bibliography elements missing');
      return;
    }
    
    // Make sure content starts hidden
    content.style.display = 'none';
    
    header.addEventListener('click', function() {
      const isVisible = content.style.display === 'block';
      
      if (isVisible) {
        content.style.display = 'none';
        if (indicator) indicator.style.transform = 'rotate(0deg)';
      } else {
        content.style.display = 'block';
        if (indicator) indicator.style.transform = 'rotate(180deg)';
      }
      
      console.log('Bibliography toggled:', !isVisible);
    });
    
    console.log('✅ Bibliography toggle working');
  }
  
  // Function 4: Setup Back to Top
  function setupBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) {
      console.log('No back to top button found');
      return;
    }
    
    // Click handler
    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Show/hide on scroll
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
    
    console.log('✅ Back to top working');
  }
  
  // Function 5: Simple animations
  function setupAnimations() {
    if (!window.IntersectionObserver) {
      // Fallback: just show all elements
      document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.classList.add('visible');
      });
      console.log('✅ Animations (fallback mode)');
      return;
    }
    
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
    
    console.log('✅ Animations working');
  }
  
  // Main initialization function
  function init() {
    console.log('Starting initialization...');
    
    try {
      createNavigation();
      setupProgressBar();
      setupBibliography();
      setupBackToTop();
      setupAnimations();
      
      console.log('🎉 All features initialized successfully!');
      
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }
  
  // Start when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // DOM already loaded
    setTimeout(init, 100);
  }
  
})();