(function(){
  const d=document;
  // Utility: safe query helpers
  const $ = (s, ctx=d) => ctx.querySelector(s);
  const $$ = (s, ctx=d) => Array.from(ctx.querySelectorAll(s));
  // Expose to sections that expect these helpers
  window.__pcq = { $, $$ };
})();

// character-page.js — page utilities for character profiles

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

// Timeline item animation - COMMENT THIS OUT OR REMOVE
/*
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('loaded');
          timelineObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '100px' });

    document.querySelectorAll('.timeline-item').forEach(item => {
      timelineObserver.observe(item);
    });
*/

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
  