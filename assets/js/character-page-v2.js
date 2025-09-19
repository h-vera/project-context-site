this.activeSection = sectionId;
  }

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Account for fixed header
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
    
    this.container.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    this.container.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe(touchStartX, touchEndX);
    }, { passive: true });
  }

  handleSwipe(startX, endX) {
    const swipeThreshold = 50;
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
}

// ============================================
// SMART PROGRESS NAVIGATOR
// ============================================
class SmartProgressNavigator {
  constructor() {
    this.iconSystem = new BiblicalIconSystem();
    this.sections = [];
    this.totalHeight = 0;
    this.currentProgress = 0;
    this.init();
  }

  init() {
    if (window.innerWidth <= 1024) return; // Desktop only
    
    this.detectSections();
    if (this.sections.length > 0) {
      this.createElement();
      this.attachEventListeners();
      this.trackProgress();
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
        'ane-context': 'scroll'
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
    nav.innerHTML = `
      <div class="progress-track"></div>
      <div class="progress-sections">
        ${this.sections.map(section => `
          <div class="progress-section" 
               data-section="${section.id}">
            <span class="progress-section-icon">
              ${this.iconSystem.get(section.icon, { size: 16 })}
            </span>
            <span class="progress-section-label">${section.label}</span>
            <span class="progress-section-percent">0%</span>
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
          const offset = 80;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Recalculate on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.calculatePositions();
      }, 250);
    });
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
      }
      
      // Section progress
      this.sections.forEach((section, index) => {
        const sectionTop = section.top;
        const sectionBottom = sectionTop + section.height;
        const sectionMiddle = sectionTop + (section.height / 2);
        
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
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
    
    // Initial update
    updateProgress();
  }
}

// ============================================
// PREMIUM EFFECTS CONTROLLER
// ============================================
class PremiumEffects {
  constructor() {
    this.init();
  }

  init() {
    this.initScrollAnimations();
    this.initHoverEffects();
    this.init3DCards();
    this.initParallax();
    this.initTextEffects();
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
    } else {
      // Fallback for older browsers
      animatedElements.forEach(el => el.classList.add('visible'));
    }
  }

  initHoverEffects() {
    const cards = document.querySelectorAll('.theology-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
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
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mouse-x', '50%');
        card.style.setProperty('--mouse-y', '50%');
        card.style.setProperty('--shadow-x', '0px');
        card.style.setProperty('--shadow-y', '10px');
      });
    });
  }

  init3DCards() {
    const cards3d = document.querySelectorAll('.card-3d');
    
    cards3d.forEach(card => {
      card.addEventListener('mousemove', (e) => {
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
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length > 0) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
          const rate = el.dataset.parallax || 0.5;
          const yPos = -(scrolled * rate);
          el.style.transform = `translateY(${yPos}px)`;
        });
      }, { passive: true });
    }
  }

  initTextEffects() {
    // Gradient text animation
    const gradientTexts = document.querySelectorAll('.text-gradient-animated');
    
    gradientTexts.forEach(text => {
      text.addEventListener('mouseenter', () => {
        text.style.animationPlayState = 'running';
      });
      
      text.addEventListener('mouseleave', () => {
        text.style.animationPlayState = 'paused';
      });
    });
  }
}

// ============================================
// MAIN CHARACTER PAGE CONTROLLER
// ============================================
class CharacterPage {
  constructor() {
    this.iconSystem = new BiblicalIconSystem();
    this.mobileTabs = null;
    this.progressNav = null;
    this.effects = null;
    
    this.init();
  }

  init() {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      this.initialize();
    }
  }

  initialize() {
    // Initialize components
    this.initializeComponents();
    this.initializeNavigation();
    this.initializeInteractions();
    this.initializeAccessibility();
    
    // Log initialization
    console.log('Character Page v2.0.0 initialized');
    console.log('Template version: 5.8');
    console.log('Icon system loaded:', this.iconSystem.registry.size, 'icons');
  }

  initializeComponents() {
    // Mobile section tabs
    if (window.innerWidth <= 768) {
      this.mobileTabs = new MobileSectionTabs();
    }
    
    // Desktop progress navigator
    if (window.innerWidth > 1024) {
      this.progressNav = new SmartProgressNavigator();
    }
    
    // Premium effects
    this.effects = new PremiumEffects();
  }

  initializeNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offset = 80;
          window.scrollTo({
            top: target.offsetTop - offset,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = this.iconSystem.get('collapse', { size: 24 });
    backToTop.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTop);
    
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }, { passive: true });
  }

  initializeInteractions() {
    // Timeline items hover enhancement
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      item.style.setProperty('--index', index);
    });
    
    // Bibliography toggle enhancement
    const bibliography = document.querySelector('.bibliography-section');
    if (bibliography) {
      const summary = bibliography.querySelector('summary');
      if (summary) {
        summary.addEventListener('click', (e) => {
          e.preventDefault();
          bibliography.open = !bibliography.open;
          
          // Smooth animation
          if (bibliography.open) {
            bibliography.classList.add('expanding');
            setTimeout(() => {
              bibliography.classList.remove('expanding');
            }, 600);
          }
        });
      }
    }
    
    // Tag interactions
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
      tag.addEventListener('click', () => {
        // Could implement tag filtering or searching
        console.log('Tag clicked:', tag.textContent);
      });
    });
  }

  initializeAccessibility() {
    // Skip to main content
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
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
        const offset = 80;
        window.scrollTo({
          top: targetSection.offsetTop - offset,
          behavior: 'smooth'
        });
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
}

// ============================================
// STYLES FOR BACK TO TOP BUTTON
// ============================================
const styles = `
  .back-to-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 48px;
    height: 48px;
    background: var(--gradient-hero);
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px);
    transition: all var(--duration-moderate) var(--motion-spring);
    z-index: var(--z-fixed);
    box-shadow: 0 4px 12px rgba(114, 9, 183, 0.3);
  }
  
  .back-to-top.visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  
  .back-to-top:hover {
    transform: translateY(-4px) scale(1.1);
    box-shadow: 0 8px 24px rgba(114, 9, 183, 0.4);
  }
  
  .back-to-top:active {
    transform: translateY(-2px) scale(1.05);
  }
  
  .skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-purple);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 2000;
    border-radius: 0 0 8px 0;
  }
  
  .skip-link:focus {
    top: 0;
  }
  
  @media (max-width: 768px) {
    .back-to-top {
      bottom: calc(var(--mobile-tabs-height) + 1rem);
      right: 1rem;
    }
  }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// ============================================
// INITIALIZE ON LOAD
// ============================================
const characterPage = new CharacterPage();

// Export for global access if needed
window.CharacterPage = CharacterPage;
window.BiblicalIconSystem = BiblicalIconSystem;

// ============================================
// END OF CHARACTER PAGE V2
// ============================================