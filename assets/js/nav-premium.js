/**
 * PREMIUM NAVIGATION SYSTEM
 * Path: /assets/js/nav-premium.js
 * Purpose: Premium navigation for v5.8+ templates only
 * Features: Liquid glass, smart scroll, gesture support, magnetic hover
 * Version: 1.0.0
 */

class PremiumNavigation {
  constructor(options = {}) {
    this.options = {
      currentPage: options.currentPage || '',
      hubType: options.hubType || '',
      enableHaptics: options.enableHaptics !== false,
      enableMagnetic: options.enableMagnetic !== false,
      enableGestures: options.enableGestures !== false,
      ...options
    };
    
    // Premium features
    this.lastScroll = 0;
    this.scrollVelocity = 0;
    this.isScrolling = false;
    this.magneticElements = [];
    
    this.init();
  }

  /**
   * NAVIGATION STRUCTURE
   * Update here when menu changes (also update nav-component.js)
   */
  getNavigationData() {
    return {
      logo: {
        href: '/',
        svg: `<svg viewBox="0 0 100 100" class="logo-svg" width="40" height="40">
                <defs>
                  <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#7209b7">
                      <animate attributeName="stop-color" values="#7209b7;#e11d48;#7209b7" dur="3s" repeatCount="indefinite"/>
                    </stop>
                    <stop offset="100%" style="stop-color:#e11d48">
                      <animate attributeName="stop-color" values="#e11d48;#00b4d8;#e11d48" dur="3s" repeatCount="indefinite"/>
                    </stop>
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                <path d="M 25 15 L 10 15 L 10 85 L 25 85" stroke="url(#premiumGradient)" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#glow)"/>
                <path d="M 75 15 L 90 15 L 90 85 L 75 85" stroke="url(#premiumGradient)" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#glow)"/>
                <ellipse cx="50" cy="50" rx="25" ry="15" stroke="url(#premiumGradient)" stroke-width="3" fill="none" opacity="0.8"/>
                <circle cx="50" cy="50" r="8" fill="#00b4d8">
                  <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
                </circle>
                <circle cx="50" cy="50" r="3" fill="#7209b7"/>
              </svg>`,
        text: 'Project Context'
      },
      items: [
        {
          label: 'Home',
          href: '/',
          id: 'home',
          icon: '🏠'
        },
        {
          label: 'Studies',
          href: '/studies/',
          id: 'studies',
          icon: '📚',
          dropdown: [
            { 
              label: 'Biblical Characters', 
              href: '/studies/characters/characters_hub.html', 
              id: 'characters',
              icon: '👤',
              description: 'In-depth character profiles'
            },
            { 
              label: 'Women in the Bible', 
              href: '/studies/women/women-bible-hub.html', 
              id: 'women',
              icon: '👩',
              description: 'Women\'s stories and significance'
            },
            { 
              label: 'Tanakh Studies', 
              href: '/studies/tanakh/tanakh-hub.html', 
              id: 'tanakh',
              icon: '📜',
              description: 'Hebrew Bible exploration'
            },
            { 
              label: 'Thematic Studies', 
              href: '/studies/thematic/thematic-hub.html', 
              id: 'thematic',
              icon: '🎯',
              description: 'Cross-biblical themes'
            }
          ]
        },
        {
          label: 'Resources',
          href: '/resources/',
          id: 'resources',
          icon: '🔧',
          dropdown: [
            { 
              label: 'Discussion Guides', 
              href: '/resources/discussion-guides/', 
              id: 'guides',
              icon: '💬'
            },
            { 
              label: 'Study Tools', 
              href: '/resources/study-tools/', 
              id: 'tools',
              icon: '🛠️'
            },
            { 
              label: 'Downloads', 
              href: '/resources/downloads/', 
              id: 'downloads',
              icon: '⬇️'
            }
          ]
        },
        {
          label: 'About',
          href: '/about/',
          id: 'about',
          icon: 'ℹ️'
        }
      ]
    };
  }

  getNavigationHTML() {
    const data = this.getNavigationData();
    
    return `
      <nav id="main-nav" class="nav-premium">
        <!-- Premium background effects -->
        <div class="nav-background">
          <div class="nav-gradient"></div>
          <div class="nav-noise"></div>
        </div>
        
        <div class="nav-container">
          <a href="${data.logo.href}" class="logo magnetic" data-magnetic="true">
            <div class="logo-icon">
              ${data.logo.svg}
            </div>
            <span class="logo-text gradient-text">${data.logo.text}</span>
          </a>
          
          <ul class="nav-links" id="navLinks">
            ${data.items.map(item => this.renderNavItem(item)).join('')}
          </ul>
          
          <!-- Premium mobile menu button -->
          <button class="menu-button magnetic" id="menuButton" aria-label="Menu" data-magnetic="true">
            <div class="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div class="menu-background"></div>
          </button>
        </div>
        
        <!-- Premium mobile drawer -->
        <div class="mobile-drawer" id="mobileDrawer">
          <div class="drawer-background"></div>
          <div class="drawer-content">
            ${this.renderMobileMenu(data.items)}
          </div>
        </div>
        
        <!-- Overlay -->
        <div class="nav-overlay" id="navOverlay"></div>
      </nav>
    `;
  }

  renderNavItem(item) {
    const isActive = this.isItemActive(item);
    const hasDropdown = item.dropdown && item.dropdown.length > 0;
    
    return `
      <li class="nav-item ${hasDropdown ? 'has-dropdown' : ''}">
        <a href="${item.href}" 
           class="nav-link magnetic ${isActive ? 'active' : ''}"
           data-nav-id="${item.id}"
           data-magnetic="true">
          <span class="nav-icon">${item.icon || ''}</span>
          <span class="nav-label">${item.label}</span>
          ${hasDropdown ? '<span class="nav-arrow">▾</span>' : ''}
        </a>
        ${hasDropdown ? this.renderDropdown(item.dropdown) : ''}
      </li>
    `;
  }

  renderDropdown(items) {
    return `
      <div class="dropdown-menu">
        <div class="dropdown-background"></div>
        <div class="dropdown-items">
          ${items.map(item => `
            <a href="${item.href}" class="dropdown-item" data-nav-id="${item.id}">
              <span class="dropdown-icon">${item.icon || ''}</span>
              <div class="dropdown-content">
                <span class="dropdown-label">${item.label}</span>
                ${item.description ? `<span class="dropdown-description">${item.description}</span>` : ''}
              </div>
              <span class="dropdown-arrow">→</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderMobileMenu(items) {
    return `
      <div class="mobile-menu">
        ${items.map(item => `
          <div class="mobile-menu-item ${item.dropdown ? 'has-submenu' : ''}">
            <a href="${item.href}" class="mobile-menu-link">
              <span class="mobile-icon">${item.icon || ''}</span>
              <span class="mobile-label">${item.label}</span>
              ${item.dropdown ? '<span class="mobile-arrow">›</span>' : ''}
            </a>
            ${item.dropdown ? `
              <div class="mobile-submenu">
                ${item.dropdown.map(sub => `
                  <a href="${sub.href}" class="mobile-submenu-link">
                    <span class="submenu-icon">${sub.icon || ''}</span>
                    <span class="submenu-label">${sub.label}</span>
                  </a>
                `).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  isItemActive(item) {
    if (item.id === this.options.currentPage) return true;
    if (item.id === this.options.hubType) return true;
    
    const currentPath = window.location.pathname;
    if (item.href === currentPath) return true;
    if (item.href !== '/' && currentPath.startsWith(item.href)) return true;
    
    return false;
  }

  init() {
    this.render();
    this.attachEventListeners();
    this.initPremiumEffects();
    this.initMagneticElements();
    this.initScrollEffects();
    
    if (this.options.enableGestures) {
      this.initGestures();
    }
  }

  render() {
    const existingNav = document.getElementById('main-nav');
    if (existingNav) existingNav.remove();
    
    document.body.insertAdjacentHTML('afterbegin', this.getNavigationHTML());
  }

  attachEventListeners() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    // Mobile menu
    const menuButton = nav.querySelector('#menuButton');
    const drawer = nav.querySelector('#mobileDrawer');
    const overlay = nav.querySelector('#navOverlay');
    
    menuButton?.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
    
    overlay?.addEventListener('click', () => {
      this.closeMobileMenu();
    });
    
    // Dropdown interactions
    const dropdowns = nav.querySelectorAll('.has-dropdown');
    dropdowns.forEach(dropdown => {
      let timeout;
      
      dropdown.addEventListener('mouseenter', () => {
        clearTimeout(timeout);
        dropdown.classList.add('active');
        this.animateDropdown(dropdown, true);
      });
      
      dropdown.addEventListener('mouseleave', () => {
        timeout = setTimeout(() => {
          dropdown.classList.remove('active');
          this.animateDropdown(dropdown, false);
        }, 300);
      });
    });
    
    // Mobile submenu toggles
    const mobileItems = nav.querySelectorAll('.mobile-menu-item.has-submenu');
    mobileItems.forEach(item => {
      const link = item.querySelector('.mobile-menu-link');
      link?.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('open');
      });
    });
  }

  initPremiumEffects() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    // Animated gradient on mouse move
    nav.addEventListener('mousemove', (e) => {
      const rect = nav.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      nav.style.setProperty('--mouse-x', `${x}%`);
      nav.style.setProperty('--mouse-y', `${y}%`);
    });
  }

  initMagneticElements() {
    if (!this.options.enableMagnetic) return;
    
    const magnetics = document.querySelectorAll('[data-magnetic="true"]');
    
    magnetics.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = '';
      });
    });
  }

  initScrollEffects() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    
    let ticking = false;
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const velocity = Math.abs(currentScroll - this.lastScroll);
      
      // Add scrolled state
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      // Smart hide/show based on velocity and direction
      if (window.innerWidth <= 768) {
        if (currentScroll > this.lastScroll && velocity > 5 && currentScroll > 100) {
          nav.classList.add('hidden');
        } else if (currentScroll < this.lastScroll || velocity < 2) {
          nav.classList.remove('hidden');
        }
      }
      
      this.lastScroll = currentScroll;
      this.scrollVelocity = velocity;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  initGestures() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
      touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
      touchEndY = e.changedTouches[0].screenY;
      this.handleSwipe(touchStartY, touchEndY);
    }, { passive: true });
  }

  handleSwipe(startY, endY) {
    const nav = document.getElementById('main-nav');
    const diff = startY - endY;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe up - hide nav
        nav?.classList.add('hidden');
      } else {
        // Swipe down - show nav
        nav?.classList.remove('hidden');
      }
    }
  }

  animateDropdown(dropdown, show) {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!menu) return;
    
    if (show) {
      menu.style.display = 'block';
      setTimeout(() => {
        menu.classList.add('active');
      }, 10);
    } else {
      menu.classList.remove('active');
      setTimeout(() => {
        menu.style.display = '';
      }, 300);
    }
  }

  toggleMobileMenu() {
    const button = document.getElementById('menuButton');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('navOverlay');
    const isOpen = drawer?.classList.contains('open');
    
    if (isOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }

  openMobileMenu() {
    const button = document.getElementById('menuButton');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('navOverlay');
    
    button?.classList.add('active');
    drawer?.classList.add('open');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Haptic feedback on mobile
    if (this.options.enableHaptics && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }

  closeMobileMenu() {
    const button = document.getElementById('menuButton');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('navOverlay');
    
    button?.classList.remove('active');
    drawer?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize function
window.initPremiumNav = function(options) {
  return new PremiumNavigation(options);
};

// Auto-init if data attributes present
document.addEventListener('DOMContentLoaded', () => {
  const autoInit = document.querySelector('[data-nav-auto-init]');
  if (autoInit) {
    window.initPremiumNav({
      currentPage: autoInit.dataset.navPage || '',
      hubType: autoInit.dataset.navHub || ''
    });
  }
});
