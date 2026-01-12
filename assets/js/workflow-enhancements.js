/**
 * Workflow Page Enhancements
 * Purpose: Desktop quick-nav sidebar for workflow sections
 * Notes:
 * - Page-scoped (safe): does not touch character-page-v5-8.js
 * - Rebuilds on resize
 * - Smooth scroll with header offset
 * - Scrollspy active-state highlighting
 * - Optional: renders “dot” UI inside links (safe even if CSS ignores it)
 */

(function () {
  'use strict';

  const DESKTOP_MIN = 1024;     // show sidebar at/above this width
  const HEADER_OFFSET = 80;     // adjust to match your fixed header / nav height
  const ACTIVE_THRESHOLD = 0.35;

  const SECTION_LIST = [
    { id: 'sources', label: 'Sources' },
    { id: 'stage1', label: 'Overview' },
    { id: 'stage2', label: 'Text' },
    { id: 'stage3', label: 'Structure' },
    { id: 'stage4', label: 'Context' },
    { id: 'stage5', label: 'Meaning' },
    { id: 'stage6', label: 'Canon' },
    { id: 'stage7', label: 'Practice' },
    // Include if your page has this CTA section
    { id: 'explore', label: 'Explore' }
  ];

  let observer = null;

  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  function clearSidebar(sidebar) {
    sidebar.innerHTML = '';
    sidebar.classList.remove('is-ready');
  }

  function setActiveLink(sidebar, activeId) {
    sidebar.querySelectorAll('.quick-nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.target === activeId);
    });
  }

  function buildLinks(sidebar, sections) {
    const frag = document.createDocumentFragment();

    sections.forEach(({ id, label }) => {
      const target = document.getElementById(id);
      if (!target) return;

      const a = document.createElement('a');
      a.href = `#${id}`;
      a.className = 'quick-nav-link';
      a.dataset.target = id;
      a.setAttribute('aria-label', label);
      a.title = label;

      // Optional dot markup (safe even if unused by CSS)
      a.innerHTML = `<span class="dot" aria-hidden="true"></span>`;

      a.addEventListener('click', (e) => {
        e.preventDefault();

        const el = document.getElementById(id);
        if (!el) return;

        const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });

        // Immediate visual feedback
        setActiveLink(sidebar, id);
      });

      frag.appendChild(a);
    });

    sidebar.appendChild(frag);
  }

  function initScrollSpy(sidebar, observedIds) {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    const targets = observedIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!targets.length) return;

    observer = new IntersectionObserver((entries) => {
      // Pick the “most visible” intersecting section
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      setActiveLink(sidebar, visible.target.id);
    }, {
      root: null,
      threshold: [0.2, ACTIVE_THRESHOLD, 0.5],
      // Helps the “active” switch happen a bit earlier/later as you scroll
      rootMargin: `-${HEADER_OFFSET}px 0px -55% 0px`
    });

    targets.forEach(el => observer.observe(el));
  }

  function initWorkflowNav() {
    const sidebar = document.querySelector('.quick-nav-sidebar');
    if (!sidebar) return;

    // Hide / clear on non-desktop
    if (!isDesktop()) {
      clearSidebar(sidebar);
      if (observer) observer.disconnect();
      return;
    }

    // Build a list of sections that actually exist on this page
    const existing = SECTION_LIST.filter(s => document.getElementById(s.id));
    if (!existing.length) {
      clearSidebar(sidebar);
      if (observer) observer.disconnect();
      return;
    }

    // Basic ARIA
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', 'Section navigation');

    // Build links
    sidebar.innerHTML = '';
    buildLinks(sidebar, existing);
    sidebar.classList.add('is-ready');

    // Default active to first existing section
    setActiveLink(sidebar, existing[0].id);

    // Scrollspy
    initScrollSpy(sidebar, existing.map(s => s.id));
  }

  // Init + resize rebuild (debounced)
  function debounce(fn, delay) {
    let t;
    return function () {
      clearTimeout(t);
      t = setTimeout(() => fn(), delay);
    };
  }

  document.addEventListener('DOMContentLoaded', initWorkflowNav);
  window.addEventListener('resize', debounce(initWorkflowNav, 150));
})();