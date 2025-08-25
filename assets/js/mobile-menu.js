/**
 * Mobile Menu Handler for Characters Hub
 * Path: /assets/js/mobile-menu.js
 * Handles hamburger menu functionality for both character and women hub pages
 */

document.addEventListener('DOMContentLoaded', function() {
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
        menuToggle.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        
        // Set ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
    }

    // Close menu
    function closeMenu() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Set ARIA attributes for accessibility
        menuToggle.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
    }

    // Event listeners
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', closeMenu);

    // Close menu when clicking a link (for single-page navigation)
    const menuLinks = navLinks.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Only close if it's actually a navigation (not dropdown toggle)
            if (!this.classList.contains('dropdown-toggle')) {
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
            if (window.innerWidth > 768) {
                closeMenu();
            }
        }, 250);
    });

    // Prevent menu from staying open on iOS rotation
    window.addEventListener('orientationchange', function() {
        setTimeout(closeMenu, 100);
    });

    // iOS-specific fixes
    if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Prevent rubber-band scrolling when menu is open
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
            
            if (isScrollingUp || isScrollingDown) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // Set initial ARIA attributes
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    navLinks.setAttribute('aria-label', 'Main navigation');

    // Debug info (remove in production)
    console.log('Mobile menu initialized successfully');
});

/**
 * Fallback for older browsers without classList
 */
if (!('classList' in document.createElement('_'))) {
    console.error('This browser does not support classList. Please update your browser.');
}