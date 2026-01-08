/**
 * Framework Example Page Script v2.1
 * For First-Read Framework worked examples
 * Handles phase-based navigation instead of character sections
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Framework Example Page v2.1 initializing...');
  
  // ============================================
  // MOBILE TAB GENERATION FOR PHASES
  // ============================================
  function initializeMobileTabs() {
    const phases = document.querySelectorAll('.phase-section[id]');
    if (phases.length === 0) return;
    
    const tabConfig = [];
    
    // Add phase tabs
    phases.forEach((phase, index) => {
      const phaseId = phase.id;
      const phaseNum = phaseId.replace('phase', '');
      const phaseTitle = phase.querySelector('.phase-title')?.textContent || `Phase ${phaseNum}`;
      
      tabConfig.push({
        id: phaseId,
        label: `Phase ${phaseNum}`,
        title: phaseTitle,
        icon: phaseNum
      });
    });
    
    // Add additional sections if present
    const additionalSections = [
      { id: 'translation', label: 'Translation', icon: '📖' },
      { id: 'bibliography', label: 'Sources', icon: '📚' }
    ];
    
    additionalSections.forEach(section => {
      if (document.getElementById(section.id)) {
        tabConfig.push(section);
      }
    });
    
    // Generate mobile tabs
    generateMobileTabs(tabConfig);
  }
  
  function generateMobileTabs(config) {
    // Check if mobile tabs already exist
    if (document.querySelector('.mobile-section-tabs')) return;
    
    const tabContainer = document.createElement('nav');
    tabContainer.className = 'mobile-section-tabs';
    tabContainer.setAttribute('aria-label', 'Framework phase navigation');
    
    const tabList = document.createElement('div');
    tabList.className = 'mobile-tab-list';
    
    config.forEach((tab, index) => {
      const button = document.createElement('button');
      button.className = 'mobile-tab-button';
      button.setAttribute('data-target', tab.id);
      button.innerHTML = `
        <span class="tab-icon">${tab.icon}</span>
        <span class="tab-label">${tab.label}</span>
      `;
      
      if (index === 0) button.classList.add('active');
      
      button.addEventListener('click', () => scrollToSection(tab.id));
      tabList.appendChild(button);
    });
    
    tabContainer.appendChild(tabList);
    document.body.appendChild(tabContainer);
    
    // Update active tab on scroll
    initializeTabScrollTracking(config.map(t => t.id));
  }
  
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    const offset = 150; // Account for fixed nav + tabs
    const sectionTop = section.offsetTop - offset;
    
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
  }
  
  function initializeTabScrollTracking(sectionIds) {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-150px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeId = entry.target.id;
          updateActiveTab(activeId);
        }
      });
    }, observerOptions);
    
    sectionIds.forEach(id => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
  
  function updateActiveTab(activeId) {
    document.querySelectorAll('.mobile-tab-button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === activeId);
    });
  }
  
  // ============================================
  // DESKTOP PHASE NAVIGATOR
  // ============================================
  function initializePhaseNavigator() {
    const nav = document.querySelector('.phase-navigator');
    if (!nav) return;
    
    const links = nav.querySelectorAll('.phase-nav-link');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
      });
    });
    
    // Track active phase on scroll
    const phases = document.querySelectorAll('.phase-section[id]');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '-20% 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const phaseId = entry.target.id;
          const phaseNum = phaseId.replace('phase', '');
          
          links.forEach(link => {
            link.classList.toggle('active', link.dataset.phase === phaseNum);
          });
        }
      });
    }, observerOptions);
    
    phases.forEach(phase => observer.observe(phase));
  }
  
  // ============================================
  // STANDARD SCROLL EFFECTS
  // ============================================
  function initializeScrollEffects() {
    // Reading progress bar
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.querySelector('.reading-progress');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTop?.classList.add('visible');
      } else {
        backToTop?.classList.remove('visible');
      }
    });
    
    // Animate on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    const animateObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    animateElements.forEach(el => animateObserver.observe(el));
  }
  
  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  initializeMobileTabs();
  initializePhaseNavigator();
  initializeScrollEffects();
  
  console.log('✓ Framework Example Page fully initialized');
});