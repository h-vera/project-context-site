(function(){
  const d=document;
  // Utility: safe query helpers
  const $ = (s, ctx=d) => ctx.querySelector(s);
  const $$ = (s, ctx=d) => Array.from(ctx.querySelectorAll(s));
  // Expose to sections that expect these helpers
  window.__pcq = { $, $$ };
})();

// character-page.js — page utilities for character profiles
// Version: 2.0 - Now with dynamic mobile tab generation

// Reading progress indicator
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.querySelector('.reading-progress');
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
    const nav = document.querySelector('nav');
    const backToTop = document.querySelector('.back-to-top');
    
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to all cards
document.querySelectorAll('.animate-on-scroll').forEach(card => {
  observer.observe(card);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Close mobile menu if open
      document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');

      // Scroll to target
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Quick Navigation Sidebar
const quickNavItems = document.querySelectorAll('.quick-nav-item');
const sections = document.querySelectorAll('.theology-card[id], .animate-on-scroll[id]');

// Click handler for quick nav
quickNavItems.forEach(item => {
  item.addEventListener('click', () => {
    const targetId = item.getAttribute('data-target');
    const target = document.querySelector(targetId);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
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
  
  quickNavItems.forEach(item => {
    item.classList.remove('active');
    const target = item.getAttribute('data-target');
    if (target === `#${current}`) {
      item.classList.add('active');
    }
  });
});

// Enhanced table scroll for mobile
const tables = document.querySelectorAll('table');
tables.forEach(table => {
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
      document.querySelector('.mobile-menu-toggle')?.classList.remove('active');
      document.querySelector('.nav-links')?.classList.remove('active');
      document.querySelector('.mobile-menu-toggle')?.setAttribute('aria-expanded', 'false');
    }
    
    // Handle mobile tabs on resize
    const mobileTabs = document.querySelector('.mobile-section-tabs');
    if (window.innerWidth <= 768 && !mobileTabs) {
      generateMobileTabs();
    } else if (window.innerWidth > 768 && mobileTabs) {
      mobileTabs.remove();
    }
  }, 250);
});

// Print optimization
window.addEventListener('beforeprint', () => {
  // Expand all sections for printing
  document.querySelectorAll('.animate-on-scroll').forEach(section => {
    section.classList.add('visible');
  });
  document.querySelectorAll('.timeline-item').forEach(item => {
    item.classList.add('loaded');
  });

  // Expand bibliography if collapsed
  const bibliography = document.querySelector('.bibliography-section');
  if (bibliography) {
    bibliography.setAttribute('open', 'true');
  }
});

// Bibliography expand/collapse smooth animation
const bibliographyDetails = document.querySelector('.bibliography-section');
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
// DYNAMIC MOBILE SECTION TABS - VERSION 2.0
// Automatically generates tabs based on present sections
// ============================================

function generateMobileTabs() {
  // Check if mobile tabs already exist (avoid duplicates)
  if (document.querySelector('.mobile-section-tabs')) return;
  
  // Define section selectors and their priority order
  // Priority is important for selecting which tabs to show when many sections exist
  const sectionConfig = [
    { id: 'overview', icon: '📋', label: 'Overview', priority: 1 },
    { id: 'narrative', icon: '📖', label: 'Journey', priority: 2 },
    { id: 'literary-context', icon: '📚', label: 'Literary', priority: 3 },
    { id: 'major-chiasm', icon: '🔍', label: 'Chiasm', priority: 4 },
    { id: 'literary-artistry', icon: '🎨', label: 'Artistry', priority: 5 },
    { id: 'themes', icon: '💡', label: 'Themes', priority: 3 },
    { id: 'ane-context', icon: '📜', label: 'ANE', priority: 4 },
    { id: 'eden', icon: '🌳', label: 'Eden', priority: 5 },
    { id: 'wordplay', icon: '✍️', label: 'Words', priority: 5 },
    { id: 'covenant', icon: '🤝', label: 'Covenant', priority: 5 },
    { id: 'unique', icon: '⭐', label: 'Unique', priority: 5 },
    { id: 'biblical-theology', icon: '🌍', label: 'Theology', priority: 2 },
    { id: 'messianic', icon: '✨', label: 'Messiah', priority: 3 },
    { id: 'second-temple', icon: '🏛️', label: '2nd Temple', priority: 5 },
    { id: 'intertext', icon: '🔗', label: 'Intertext', priority: 4 },
    { id: 'songs', icon: '🎵', label: 'Songs', priority: 5 },
    { id: 'application', icon: '🎯', label: 'Apply', priority: 2 },
    { id: 'questions', icon: '❓', label: 'Q&A', priority: 4 }
  ];
  
  // Find which sections actually exist in the document
  const existingSections = [];
  sectionConfig.forEach(config => {
    const element = document.getElementById(config.id);
    if (element) {
      existingSections.push({
        ...config,
        element: element
      });
    }
  });
  
  // If no sections found, don't create tabs
  if (existingSections.length === 0) return;
  
  // Determine how many tabs to show (max 5-6 for mobile usability)
  const MAX_TABS = 5;
  let tabsToShow = existingSections;
  
  if (existingSections.length > MAX_TABS) {
    // Sort by priority and take top 5
    tabsToShow = existingSections
      .sort((a, b) => a.priority - b.priority)
      .slice(0, MAX_TABS);
    
    // Always include Overview if it exists
    const overviewIndex = tabsToShow.findIndex(t => t.id === 'overview');
    if (overviewIndex === -1) {
      const overview = existingSections.find(s => s.id === 'overview');
      if (overview) {
        tabsToShow[MAX_TABS - 1] = overview; // Replace last item with overview
      }
    }
    
    // Re-sort by document order
    tabsToShow.sort((a, b) => {
      const posA = Array.from(document.querySelectorAll('[id]')).indexOf(a.element);
      const posB = Array.from(document.querySelectorAll('[id]')).indexOf(b.element);
      return posA - posB;
    });
  }
  
  // Create mobile tabs container
  const mobileNav = document.createElement('nav');
  mobileNav.className = 'mobile-section-tabs';
  mobileNav.setAttribute('aria-label', 'Section navigation');
  mobileNav.setAttribute('role', 'navigation');
  
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';
  
  // Create tabs
  tabsToShow.forEach((section, index) => {
    const button = document.createElement('button');
    button.className = 'tab-item';
    if (index === 0) button.classList.add('active');
    button.setAttribute('data-target', `#${section.id}`);
    button.setAttribute('aria-label', `${section.label} section`);
    
    button.innerHTML = `
      <span class="tab-icon">${section.icon}</span>
      <span class="tab-label">${section.label}</span>
    `;
    
    tabsContainer.appendChild(button);
  });
  
  mobileNav.appendChild(tabsContainer);
  document.body.appendChild(mobileNav);
  
  // Initialize tab functionality
  initializeMobileTabs();
}

function initializeMobileTabs() {
  const mobileTabsNav = document.querySelector('.mobile-section-tabs');
  const tabItems = document.querySelectorAll('.mobile-section-tabs .tab-item');
  
  if (!mobileTabsNav || !tabItems.length) return;
  
  // Track scroll position for hide/show behavior
  let lastScrollTop = 0;
  let scrollTimer = null;
  
  // Function to update active tab based on scroll position
  function updateActiveTab() {
    const sections = [];
    tabItems.forEach(tab => {
      const targetId = tab.dataset.target;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        sections.push({ tab, element: targetElement });
      }
    });
    
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    let activeSection = null;
    
    sections.forEach(({ tab, element }) => {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      
      if (absoluteTop <= scrollPosition) {
        activeSection = { tab, element };
      }
    });
    
    if (activeSection) {
      tabItems.forEach(t => t.classList.remove('active'));
      activeSection.tab.classList.add('active');
    }
  }
  
  // Tab click handler
  tabItems.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.dataset.target;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calculate offset for fixed elements
        const navHeight = document.querySelector('nav')?.offsetHeight || 65;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        
        // Smooth scroll to section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active state immediately
        tabItems.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Scroll event handler for mobile tabs
  let mobileTabScrollHandler = function() {
    // Update active tab
    if (scrollTimer) {
      clearTimeout(scrollTimer);
    }
    
    scrollTimer = setTimeout(updateActiveTab, 100);
    
    // Hide/show tabs based on scroll direction (mobile only)
    if (window.innerWidth <= 768) {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down - hide tabs
        mobileTabsNav.classList.add('hidden');
      } else {
        // Scrolling up - show tabs
        mobileTabsNav.classList.remove('hidden');
      }
      
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
  };
  
  // Add scroll listener
  window.addEventListener('scroll', mobileTabScrollHandler);
  
  // Initial active tab setup
  updateActiveTab();
  
  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(updateActiveTab, 300);
  });
  
  // Optional: Swipe gestures for tab navigation
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (mobileTabsNav) {
    mobileTabsNav.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    mobileTabsNav.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      const activeTab = document.querySelector('.mobile-section-tabs .tab-item.active');
      const activeIndex = Array.from(tabItems).indexOf(activeTab);
      
      if (diff > 0 && activeIndex < tabItems.length - 1) {
        // Swipe left - next section
        tabItems[activeIndex + 1].click();
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right - previous section
        tabItems[activeIndex - 1].click();
      }
    }
  }
  
  // Enhanced Intersection Observer for mobile tabs (more precise)
  if ('IntersectionObserver' in window && window.innerWidth <= 768) {
    const mobileObserverOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px',
      threshold: 0
    };
    
    const mobileSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = '#' + entry.target.id;
          tabItems.forEach(tab => {
            if (tab.dataset.target === sectionId) {
              tab.classList.add('active');
            } else {
              tab.classList.remove('active');
            }
          });
        }
      });
    }, mobileObserverOptions);
    
    // Observe all sections that have tabs
    tabItems.forEach(tab => {
      const targetId = tab.dataset.target;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        mobileSectionObserver.observe(targetElement);
      }
    });
  }
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  // Only generate mobile tabs on mobile devices
  if (window.innerWidth <= 768) {
    generateMobileTabs();
  }
  
  // Handle resize events to add/remove mobile tabs
  window.addEventListener('resize', () => {
    const mobileTabs = document.querySelector('.mobile-section-tabs');
    if (window.innerWidth <= 768 && !mobileTabs) {
      generateMobileTabs();
    } else if (window.innerWidth > 768 && mobileTabs) {
      mobileTabs.remove();
    }
  });
  
  // Log initialization for debugging
  console.log('Character page utilities initialized');
  console.log('Mobile tabs:', window.innerWidth <= 768 ? 'Generated' : 'Not needed (desktop)');
});
// ============================================
// iOS SCROLL FIX
// Add this section to character-page.js after DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isIOS) {
    // Add iOS class to body for CSS targeting
    document.body.classList.add('ios-device');
    
    // Option 1: Disable all scroll animations on iOS
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
      el.classList.remove('animate-on-scroll');
      el.classList.add('visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    
    // Option 2: Simplify mobile tab behavior on iOS
    const mobileTabs = document.querySelector('.mobile-section-tabs');
    if (mobileTabs) {
      let scrollTimer = null;
      let lastScrollY = window.scrollY;
      
      // Debounced scroll handler for iOS
      window.addEventListener('scroll', function() {
        if (scrollTimer) {
          clearTimeout(scrollTimer);
        }
        
        scrollTimer = setTimeout(function() {
          const currentScrollY = window.scrollY;
          
          // Only hide/show if scroll distance is significant
          if (Math.abs(currentScrollY - lastScrollY) > 50) {
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
              mobileTabs.classList.add('hidden');
            } else {
              mobileTabs.classList.remove('hidden');
            }
            lastScrollY = currentScrollY;
          }
        }, 100); // Debounce delay
      }, { passive: true });
    }
    
    // Option 3: Force repaint on problematic elements
    const fixFlickering = () => {
      const cards = document.querySelectorAll('.theology-card, .study-card');
      cards.forEach(card => {
        // Force a repaint by accessing offsetHeight
        card.style.display = 'block';
        card.offsetHeight; // Trigger reflow
      });
    };
    
    // Run after a delay to ensure layout is complete
    setTimeout(fixFlickering, 100);
    
    // Option 4: Disable Intersection Observer on iOS
    if (window.observer) {
      window.observer.disconnect();
    }
  }
});

// Alternative: Replace the existing Intersection Observer with a simpler version for iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  // Simple visibility check without animations
  window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.theology-card, .study-card');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.style.opacity = '1';
        element.style.visibility = 'visible';
      }
    });
  }, { passive: true });
} else {
  // Keep existing Intersection Observer for non-iOS devices
  // ... existing observer code ...
}
// ============================================
// FIX FOR iOS BLANK CONTENT ON SCROLL UP
// Replace the mobile tab scroll handler in character-page.js
// ============================================

// Find this section in character-page.js and REPLACE the scroll handler:
function initializeMobileTabs() {
  const mobileTabsNav = document.querySelector('.mobile-section-tabs');
  const tabItems = document.querySelectorAll('.mobile-section-tabs .tab-item');
  
  if (!mobileTabsNav || !tabItems.length) return;
  
  // SOLUTION 1: Keep mobile tabs always visible on iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isIOS) {
    // On iOS, never hide the tabs - just keep them fixed
    mobileTabsNav.classList.remove('hidden');
    
    // Only update active state on scroll
    window.addEventListener('scroll', function() {
      updateActiveTab();
    }, { passive: true });
    
  } else {
    // Original hide/show behavior for Android and other devices
    let lastScrollTop = 0;
    let scrollTimer = null;
    
    window.addEventListener('scroll', function() {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }
      
      scrollTimer = setTimeout(function() {
        updateActiveTab();
        
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Only hide/show on non-iOS devices
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
          mobileTabsNav.classList.add('hidden');
        } else {
          mobileTabsNav.classList.remove('hidden');
        }
        
        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
      }, 100);
    }, { passive: true });
  }
  
  // ... rest of the initializeMobileTabs function stays the same ...
}

// SOLUTION 2: Alternative - Disable hide/show entirely
// If Solution 1 doesn't work, try this simpler approach:
function initializeMobileTabsSimple() {
  const mobileTabsNav = document.querySelector('.mobile-section-tabs');
  const tabItems = document.querySelectorAll('.mobile-section-tabs .tab-item');
  
  if (!mobileTabsNav || !tabItems.length) return;
  
  // Never hide the tabs - always visible
  mobileTabsNav.classList.remove('hidden');
  mobileTabsNav.style.transform = 'translateY(0)';
  mobileTabsNav.style.position = 'fixed';
  mobileTabsNav.style.bottom = '0';
  
  // Only handle active state updates
  function updateActiveTab() {
    const sections = [];
    tabItems.forEach(tab => {
      const targetId = tab.dataset.target;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        sections.push({ tab, element: targetElement });
      }
    });
    
    const scrollPosition = window.scrollY + window.innerHeight / 3;
    
    let activeSection = null;
    
    sections.forEach(({ tab, element }) => {
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      
      if (absoluteTop <= scrollPosition) {
        activeSection = { tab, element };
      }
    });
    
    if (activeSection) {
      tabItems.forEach(t => t.classList.remove('active'));
      activeSection.tab.classList.add('active');
    }
  }
  
  // Simple scroll listener
  window.addEventListener('scroll', updateActiveTab, { passive: true });
  
  // Tab click handlers stay the same
  tabItems.forEach(tab => {
    tab.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.dataset.target;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navHeight = document.querySelector('nav')?.offsetHeight || 65;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight - 10;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        tabItems.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Initial setup
  updateActiveTab();
}