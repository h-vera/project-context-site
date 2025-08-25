/**
 * Mobile Menu Handler for Project Context
 * Path: /assets/js/mobile-menu.js
 * Handles hamburger menu functionality for all hub pages
 * Updated with iOS-specific fixes and improved touch handling
 * 
 * @version 2.0.0
 * @updated 2024
 * 
 * Browser Support:
 * - iOS Safari 12+
 * - Chrome 80+
 * - Firefox 75+
 * - Samsung Internet 12+
 * - Edge 80+
 */

(function() {
    'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Early exit if we're in a desktop environment
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    
    // Create mobile menu overlay if it doesn't exist
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        document.body.appendChild(overlay);
    }

    // Get menu elements
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Check if elements exist
    if (!menuToggle || !navLinks) {
        console.warn('Mobile menu elements not found');
        return;
    }

    // Track scroll position for iOS fix
    let scrollPosition = 0;

    // Toggle menu function
    function toggleMenu() {
        const isOpen = menuToggle.classList.contains('active');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    // Open menu
    function openMenu() {
        // Save scroll position before locking
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        
        // iOS-specific: Prevent background scrolling
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.top = `-${scrollPosition}px`;
        body.style.overflow = 'hidden';
        
        // Set ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
    }

    // Close menu
    function closeMenu() {
        // Don't do anything if menu is already closed
        if (!menuToggle.classList.contains('active')) {
            return;
        }
        
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // iOS-specific: Restore background scrolling
        body.style.position = '';
        body.style.width = '';
        body.style.top = '';
        body.style.overflow = '';
        
        // Restore scroll position
        window.scrollTo(0, scrollPosition);
        
        // Set ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }

    // Track if we've already handled this interaction to prevent double-firing
    let handled = false;
    
    // Event listeners - Updated for better iOS compatibility
    menuToggle.addEventListener('click', function(e) {
        if (handled) return;
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
        handled = true;
        setTimeout(() => { handled = false; }, 300);
    });

    // Add touchend event for better iOS response
    menuToggle.addEventListener('touchend', function(e) {
        if (handled) return;
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
        handled = true;
        setTimeout(() => { handled = false; }, 300);
    }, { passive: false });

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);
    
    // Also handle touch on overlay for iOS
    overlay.addEventListener('touchend', function(e) {
        e.preventDefault();
        closeMenu();
    }, { passive: false });

    // Handle dropdown toggles in mobile menu
    const dropdownToggles = navLinks.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');
        });
    });

    // Close menu when clicking a link (but not dropdown toggles)
    const menuLinks = navLinks.querySelectorAll('a:not(.dropdown-toggle)');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't close if it's a hash link to current page
            const href = this.getAttribute('href');
            if (href && href !== '#' && !href.startsWith('#')) {
                closeMenu();
            }
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuToggle.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Close menu if window is resized to desktop size
            if (window.innerWidth > 768 && menuToggle.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });

    // Prevent menu from staying open on iOS rotation
    window.addEventListener('orientationchange', function() {
        setTimeout(closeMenu, 100);
    });

    // iOS-specific fixes for smooth scrolling and bounce prevention
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        let startY = 0;
        
        navLinks.addEventListener('touchstart', function(e) {
            startY = e.touches[0].pageY;
        }, { passive: true });

        navLinks.addEventListener('touchmove', function(e) {
            const y = e.touches[0].pageY;
            const scrollTop = navLinks.scrollTop;
            const scrollHeight = navLinks.scrollHeight;
            const height = navLinks.clientHeight;
            
            const isScrollingUp = y > startY && scrollTop === 0;
            const isScrollingDown = y < startY && scrollTop + height >= scrollHeight;
            
            // Prevent rubber-band scrolling at edges
            if (isScrollingUp || isScrollingDown) {
                e.preventDefault();
            }
        }, { passive: false });

        // Prevent swipe-to-go-back when menu is open
        document.addEventListener('touchstart', function(e) {
            if (menuToggle.classList.contains('active') && e.touches[0].clientX < 20) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Set initial ARIA attributes
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    navLinks.setAttribute('aria-label', 'Main navigation');

    // Performance: Use passive listeners where possible for better scroll performance
    document.addEventListener('scroll', function() {
        // Auto-close menu on scroll if needed
        if (menuToggle.classList.contains('active') && window.scrollY > 100) {
            // Uncomment if you want menu to close on scroll
            // closeMenu();
        }
    }, { passive: true });

    // Clean up function for SPAs or dynamic content
    window.addEventListener('beforeunload', function() {
        closeMenu();
    });

    // Handle visibility change (e.g., switching tabs)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && menuToggle.classList.contains('active')) {
            closeMenu();
        }
    });

    // Debug info
    console.log('Mobile menu initialized successfully with iOS fixes');
});

/**
 * Fallback for older browsers without classList
 */
if (!('classList' in document.createElement('_'))) {
    console.error('This browser does not support classList. Please update your browser.');
}

})(); // End IIFE