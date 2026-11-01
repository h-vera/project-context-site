/**
 * literary-devices.js — v1.0
 * Path: /assets/js/literary-devices.js
 *
 * Page script for the Literary Devices Catalog (hub, ten category
 * pages, and the How to Read / Reading Stack page). Loads after
 * /assets/js/page-chassis-v5-9.js, which owns the section navigation
 * (mobile tabs, quick-nav dots, mini-TOC tracking), reading progress,
 * back-to-top and scroll reveal.
 *
 * This file adds only what the catalog itself needs:
 *   1. Hub search + category filter (no-op on category pages — the
 *      #deviceGrid / #searchInput elements are hub-only).
 *   1b. Reading Stack widget on how-to-read.html — level buttons
 *      (.stack-level) swap the visible .detail-panel; ↑/↓ keys move
 *      between levels. No-op elsewhere.
 *   2. The v5.9.4 reveal-animation safety net, verbatim from
 *      biblical-character-template-v5-9.html: guarantees every
 *      [data-reveal] / [data-reveal-children] element gets
 *      [data-revealed] (plus a per-child --reveal-stagger) when it
 *      enters the viewport, and force-reveals anything already
 *      on-screen at load. No-op if the chassis already revealed it;
 *      prefers-reduced-motion is honored by global-v3.css §56.
 */

(function () {
  'use strict';

  /* ------------------------------------------------------------
     1. HUB SEARCH + FILTER
     ------------------------------------------------------------ */
  function initHubSearch() {
    const grid      = document.getElementById('deviceGrid');
    const input     = document.getElementById('searchInput');
    const clearBtn  = document.getElementById('searchClear');
    const statusEl  = document.getElementById('searchStatus');
    const noResults = document.getElementById('noResults');
    if (!grid || !input) return;

    const cards = Array.from(grid.querySelectorAll('.device-card'));
    const chips = Array.from(document.querySelectorAll('.filter-chip'));
    const haystacks = cards.map(c => c.textContent.toLowerCase());

    let activeCat = 'all';
    let query = '';

    function update() {
      let visible = 0;
      const q = query.trim().toLowerCase();
      cards.forEach((card, i) => {
        const catMatch  = activeCat === 'all' || card.dataset.cat === activeCat;
        const textMatch = !q || haystacks[i].includes(q);
        if (catMatch && textMatch) { card.style.display = ''; visible++; }
        else { card.style.display = 'none'; }
      });
      if (statusEl)  statusEl.textContent = visible + ' of ' + cards.length;
      if (noResults) noResults.style.display = visible === 0 ? 'block' : 'none';
    }

    function setChip(chip) {
      chips.forEach(c => c.classList.remove('active'));
      if (chip) chip.classList.add('active');
      activeCat = chip ? chip.dataset.cat : 'all';
    }

    input.addEventListener('input', e => { query = e.target.value; update(); });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = ''; query = '';
        setChip(chips.find(c => c.dataset.cat === 'all') || null);
        update();
        input.focus();
      });
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => { setChip(chip); update(); });
    });

    // ?cat= deep link from the category tiles / external pages
    const initCat = new URLSearchParams(window.location.search).get('cat');
    if (initCat) {
      const target = chips.find(c => c.dataset.cat === initCat);
      if (target) { setChip(target); update(); }
    }
  }


  /* ------------------------------------------------------------
     1b. READING STACK WIDGET (how-to-read.html)
     ------------------------------------------------------------ */
  function initReadingStackWidget() {
    const levels = Array.from(document.querySelectorAll('.stack-level'));
    const panels = Array.from(document.querySelectorAll('.detail-panel'));
    if (!levels.length || !panels.length) return;

    function activate(levelId) {
      levels.forEach(b => {
        const isActive = b.dataset.level === levelId;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      panels.forEach(p => { p.hidden = (p.id !== 'detail-' + levelId); });
    }

    levels.forEach(btn => {
      btn.addEventListener('click', () => activate(btn.dataset.level));
      // ↑ = higher level (toward Canon, 5); ↓ = lower (toward Word, 1)
      btn.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();
        const current = parseInt(btn.dataset.level, 10);
        const next = e.key === 'ArrowUp' ? Math.min(5, current + 1) : Math.max(1, current - 1);
        activate(String(next));
        const target = document.querySelector('.stack-level[data-level="' + next + '"]');
        if (target) target.focus();
      });
    });

    // Deep link from the hub's Reading Stack panel: #detail-3 opens
    // that level and scrolls the widget under the fixed nav (the
    // panel is hidden at load, so the browser's own hash jump is a no-op).
    const hash = (window.location.hash || '').replace('#detail-', '');
    if (/^[1-5]$/.test(hash)) {
      activate(hash);
      const widget = document.getElementById('reading-stack');
      if (widget) {
        const top = widget.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: top, behavior: 'auto' });
      }
    }
  }


  /* ------------------------------------------------------------
     2. REVEAL-ANIMATION SAFETY NET (v5.9.4, template verbatim)
     ------------------------------------------------------------ */
  function initRevealSafetyNet() {
    const STAGGER_MS = 90;
    const KICKSTART_MS = 200;

    function applyStagger(parent) {
      const kids = parent.children;
      for (let i = 0; i < kids.length; i++) {
        if (!kids[i].style.getPropertyValue('--reveal-stagger')) {
          kids[i].style.setProperty('--reveal-stagger', (i * STAGGER_MS) + 'ms');
        }
      }
    }
    function reveal(el) {
      if (el.hasAttribute('data-revealed')) return;
      if (el.hasAttribute('data-reveal-children')) applyStagger(el);
      el.setAttribute('data-revealed', '');
    }
    function isInViewport(el) {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh && r.bottom > 0;
    }
    function init() {
      const targets = document.querySelectorAll('[data-reveal], [data-reveal-children]');
      if (!targets.length) return;
      targets.forEach(function (el) { if (isInViewport(el)) reveal(el); });
      if (!('IntersectionObserver' in window)) { targets.forEach(reveal); return; }
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { reveal(entry.target); io.unobserve(entry.target); }
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
      targets.forEach(function (el) {
        if (!el.hasAttribute('data-revealed')) io.observe(el);
      });
    }
    setTimeout(init, KICKSTART_MS);
  }


  /* ------------------------------------------------------------
     BOOT
     ------------------------------------------------------------ */
  function boot() {
    initHubSearch();
    initReadingStackWidget();
    initRevealSafetyNet();
    console.info('[Literary Devices] catalog v1.0 · template 5.9.4');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();