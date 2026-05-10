/**
 * Project Context Page Chassis — v5.9
 * Path: /assets/js/page-chassis-v5-9.js
 * Version: 5.9.3
 *
 * Page-type-agnostic chassis used by every v5.9 template family:
 *   • biblical-character-template-v5-9.html
 *   • thematic-study-template-v5-9.html
 *   • multi-page-suite-template-v5-9.html
 *   • methodology / connections / tool pages
 *
 * Successor to /assets/js/character-page-v5-8.js. The architectural
 * change from v5.8 → v5.9 is the source of truth for sections:
 *
 *   v5.8 — hardcoded global `sectionConfig` of 200+ entries inside this
 *          chassis, shared across every page on the site.
 *   v5.9 — each page provides its own JSON manifest in the document:
 *
 *            <script id="page-section-config" type="application/json">
 *            [
 *              { "id": "overview",  "label": "Overview", "priority": 1 },
 *              { "id": "narrative", "label": "Journey",  "priority": 1 },
 *              …
 *            ]
 *            </script>
 *
 *          The chassis reads that JSON, validates each id against a real
 *          element in the page, and uses it to build:
 *            • the bottom mobile tab strip (≤768px),
 *            • the desktop quick-nav sidebar dots (≥1400px),
 *            • the active-section tracker that highlights the mini-TOC,
 *              quick-nav, and mobile tabs in sync.
 *
 * Other v5.9 additions:
 *   • Cite-this-study button — finds [data-cite-study], copies a
 *     Chicago-style citation, swaps to .copied state.
 *   • Reading-time auto-fill — finds [data-reading-time] and replaces
 *     its text with an estimate based on word count (~200 wpm).
 *   • Mini-TOC pill bar active-link tracking (matches mobile tabs).
 *   • Reduced-motion respect — staggered timeline animations skip
 *     when prefers-reduced-motion is set.
 *
 * v5.9.1 changes:
 *   • Scroll reveal system — opt-in via [data-reveal] (single element)
 *     or [data-reveal-children] (parent triggers staggered reveal of
 *     direct children, 80ms apart). CSS lives in global-v3.css §56.
 *     Honors prefers-reduced-motion via the CSS @media query.
 *
 * v5.9.2 changes:
 *   • Canonical .timeline.stagger-children now triggers via the same
 *     IntersectionObserver — adds [data-revealed] when scrolled into
 *     view, sets --reveal-stagger on each child. Replaces the earlier
 *     on-page-load animation with hardcoded :nth-child delay rules.
 *
 * v5.9.3 changes:
 *   • Cite button now reads citation metadata from <meta name="citation-*">
 *     tags (author, title, site, date) with graceful fallback to the prior
 *     behavior (document.title + current year). Pages without the meta tags
 *     keep working exactly as before.
 *   • Cite button can optionally include the full bibliography in the copy
 *     via the [data-copy-bibliography] attribute on the button. When set,
 *     the clipboard receives the page citation followed by every entry
 *     from .bibliography-section .source-citation, separated by blank lines.
 *   • Rich-text clipboard write — the new behavior uses navigator.clipboard
 *     .write() with both text/html and text/plain MIME types so that
 *     <strong>/<em> markup inside .source-citation entries (bold author,
 *     italic book title) survives paste into Word and Google Docs.
 *     Falls back to writeText() and then execCommand() on older browsers.
 */

(function () {
  'use strict';

  // ============================================================
  // UTILITIES
  // ============================================================

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function isMobile() {
    return window.innerWidth <= 768 || ('ontouchstart' in window && window.innerWidth <= 1024);
  }

  // ============================================================
  // SECTION CONFIG LOADER
  // ============================================================

  /**
   * Read the per-page <script id="page-section-config"> JSON, parse it,
   * and resolve each entry to a live DOM element. Entries whose id has
   * no matching element in the document are dropped with a console
   * warning (useful when authors copy a config from another page).
   *
   * Returns an array of { id, label, priority, element } sorted by
   * document order.
   */
  function loadSectionConfig() {
    const node = document.getElementById('page-section-config');
    if (!node) {
      console.info('[v5.9] No #page-section-config script — skipping section nav.');
      return [];
    }

    let parsed;
    try {
      parsed = JSON.parse(node.textContent || '[]');
    } catch (err) {
      console.error('[v5.9] page-section-config JSON failed to parse:', err);
      return [];
    }

    if (!Array.isArray(parsed)) {
      console.error('[v5.9] page-section-config must be a JSON array.');
      return [];
    }

    const resolved = [];
    parsed.forEach(entry => {
      if (!entry || typeof entry.id !== 'string') {
        console.warn('[v5.9] Skipping invalid config entry:', entry);
        return;
      }
      const element = document.getElementById(entry.id);
      if (!element) {
        console.warn(`[v5.9] No element found for section id "#${entry.id}" — skipping.`);
        return;
      }
      resolved.push({
        id: entry.id,
        label: entry.label || entry.id,
        priority: typeof entry.priority === 'number' ? entry.priority : 99,
        element
      });
    });

    // Sort by document order (matches reading flow)
    resolved.sort((a, b) => {
      const cmp = a.element.compareDocumentPosition(b.element);
      if (cmp & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (cmp & Node.DOCUMENT_POSITION_PRECEDING) return  1;
      return 0;
    });

    return resolved;
  }

  /**
   * When the page has more than `max` sections, drop the lowest-priority
   * ones from the mobile tab strip (priority 1 = always show). Document
   * order is preserved within the survivors. Desktop quick-nav and
   * mini-TOC keep all entries — the trim is mobile-only.
   */
  function trimToMobileLimit(sections, max = 7) {
    if (sections.length <= max) return sections.slice();

    // Always keep priority 1
    const must = sections.filter(s => s.priority === 1);
    const rest = sections.filter(s => s.priority !== 1)
                         .sort((a, b) => a.priority - b.priority);

    const survivors = must.concat(rest.slice(0, Math.max(0, max - must.length)));

    // Restore document order
    survivors.sort((a, b) => {
      const cmp = a.element.compareDocumentPosition(b.element);
      if (cmp & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
      if (cmp & Node.DOCUMENT_POSITION_PRECEDING) return  1;
      return 0;
    });

    return survivors;
  }


  // ============================================================
  // MOBILE SECTION TABS (≤768px)
  // ============================================================

  class MobileSectionTabs {
    constructor(sections) {
      this.allSections    = sections;
      this.shownSections  = trimToMobileLimit(sections, 7);
      this.tabsElement    = null;
      this.tabsContainer  = null;
      this.touchStartTime = 0;
      this.touchStartX    = 0;
      this.touchStartY    = 0;
      this.isScrolling    = false;
      this.scrollTimeout  = null;
    }

    mount() {
      if (this.shownSections.length === 0) return;

      const nav = document.createElement('nav');
      nav.className = 'mobile-section-tabs';
      nav.setAttribute('role', 'navigation');
      nav.setAttribute('aria-label', 'Section navigation');

      const container = document.createElement('div');
      container.className = 'tabs-container';

      this.shownSections.forEach((section, i) => {
        const tab = document.createElement('button');
        tab.className = 'tab-item';
        tab.type = 'button';
        tab.setAttribute('data-target', '#' + section.id);
        tab.setAttribute('aria-label', `${section.label} section`);
        tab.setAttribute('role', 'tab');
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        if (i === 0) tab.classList.add('active');

        const label = document.createElement('span');
        label.className = 'tab-label-only';
        label.textContent = section.label;
        tab.appendChild(label);

        section.tab = tab;
        container.appendChild(tab);
      });

      nav.appendChild(container);
      document.body.appendChild(nav);

      this.tabsElement   = nav;
      this.tabsContainer = container;

      // Show
      document.body.classList.add('has-mobile-tabs');
      requestAnimationFrame(() => {
        nav.classList.add('active');
        // slight delay so the slide-in transition is visible
        setTimeout(() => nav.classList.add('slide-in'), 40);
      });

      this.attachListeners();
    }

    attachListeners() {
      // Track scroll-vs-tap to avoid accidental nav during horizontal scroll
      this.tabsContainer.addEventListener('scroll', () => {
        this.tabsContainer.classList.add('is-scrolling');
        this.isScrolling = true;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = setTimeout(() => {
          this.tabsContainer.classList.remove('is-scrolling');
          this.isScrolling = false;
        }, 150);
      }, { passive: true });

      // Touch handling
      this.tabsContainer.addEventListener('touchstart', (e) => {
        this.touchStartTime = Date.now();
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      }, { passive: true });

      this.tabsContainer.addEventListener('touchend', (e) => {
        const duration = Date.now() - this.touchStartTime;
        const dx = Math.abs(e.changedTouches[0].clientX - this.touchStartX);
        const dy = Math.abs(e.changedTouches[0].clientY - this.touchStartY);
        if (duration < 300 && dx < 10 && dy < 10) {
          const tab = e.target.closest('.tab-item');
          if (tab && !this.isScrolling) {
            e.preventDefault();
            this.activate(tab);
          }
        }
      }, { passive: false });

      // Pointer click (non-touch devices)
      this.tabsContainer.addEventListener('click', (e) => {
        if ('ontouchstart' in window) return; // touch handled above
        const tab = e.target.closest('.tab-item');
        if (tab && !this.isScrolling) this.activate(tab);
      });

      // Keyboard arrow nav
      this.tabsContainer.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        const tabs = $$('.tab-item', this.tabsContainer);
        const i = tabs.indexOf(document.activeElement);
        if (i === -1) return;
        const next = e.key === 'ArrowLeft'
          ? Math.max(0, i - 1)
          : Math.min(tabs.length - 1, i + 1);
        tabs[next].focus();
      });
    }

    activate(tab) {
      const id = tab.getAttribute('data-target').slice(1);
      const section = this.shownSections.find(s => s.id === id);
      if (!section) return;
      this.scrollToSection(section);
      this.setActiveTab(tab);
    }

    scrollToSection(section) {
      const offset = 20;
      const top = section.element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }

    setActiveTab(tab) {
      this.shownSections.forEach(s => {
        if (!s.tab) return;
        s.tab.classList.remove('active');
        s.tab.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      this.ensureVisible(tab);
    }

    /**
     * Track which section is in view; receives the section id from the
     * shared IntersectionObserver. Updates the active tab.
     */
    syncActive(sectionId) {
      const section = this.shownSections.find(s => s.id === sectionId);
      if (section && section.tab) this.setActiveTab(section.tab);
    }

    /**
     * Auto-scroll the tab strip horizontally so the active tab is
     * visible, with a 20px buffer.
     */
    ensureVisible(tab) {
      const c = this.tabsContainer;
      const left = tab.offsetLeft;
      const right = left + tab.offsetWidth;
      const viewLeft = c.scrollLeft;
      const viewRight = viewLeft + c.offsetWidth;
      if (left < viewLeft) {
        c.scrollTo({ left: left - 20, behavior: 'smooth' });
      } else if (right > viewRight) {
        c.scrollTo({ left: right - c.offsetWidth + 20, behavior: 'smooth' });
      }
    }

    destroy() {
      if (this.tabsElement) {
        this.tabsElement.remove();
        this.tabsElement = null;
        this.tabsContainer = null;
      }
      document.body.classList.remove('has-mobile-tabs');
    }
  }


  // ============================================================
  // QUICK NAV SIDEBAR (≥1400px)
  // ============================================================

  class QuickNavSidebar {
    constructor(sections) {
      this.sections = sections;
      this.container = $('.quick-nav-sidebar');
    }

    mount() {
      if (!this.container || this.sections.length === 0) return;
      this.container.innerHTML = '';
      this.sections.forEach(section => {
        const dot = document.createElement('a');
        dot.className = 'qdot';
        dot.href = '#' + section.id;
        dot.setAttribute('data-target', '#' + section.id);
        dot.setAttribute('data-label', section.label);
        section.qdot = dot;
        this.container.appendChild(dot);
      });
    }

    syncActive(sectionId) {
      this.sections.forEach(s => s.qdot && s.qdot.classList.remove('active'));
      const section = this.sections.find(s => s.id === sectionId);
      if (section && section.qdot) section.qdot.classList.add('active');
    }
  }


  // ============================================================
  // MINI-TOC PILL BAR ACTIVE TRACKING
  // ============================================================

  class MiniTocTracker {
    constructor() {
      this.links = $$('.mini-toc a[href^="#"]');
    }

    syncActive(sectionId) {
      this.links.forEach(a => a.removeAttribute('aria-current'));
      const link = this.links.find(a => a.getAttribute('href') === '#' + sectionId);
      if (link) link.setAttribute('aria-current', 'true');
    }
  }


  // ============================================================
  // SECTION INTERSECTION OBSERVER
  // Single observer driving mobile tabs, qdots, and mini-TOC.
  // ============================================================

  function observeActiveSection(sections, syncTargets) {
    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      // Pick the most-visible intersecting section
      let best = null;
      let bestRatio = 0;
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          best = entry.target;
        }
      });
      if (!best) return;
      const section = sections.find(s => s.element === best);
      if (!section) return;
      syncTargets.forEach(t => t && t.syncActive && t.syncActive(section.id));
    }, {
      rootMargin: '-25% 0px -65% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0]
    });

    sections.forEach(s => observer.observe(s.element));
    return observer;
  }


  // ============================================================
  // CITE-THIS-STUDY BUTTON
  // ============================================================
  //
  // Citation inputs come from <meta name="citation-*"> tags when
  // present:
  //   citation-author   → "Project Context" (default)
  //   citation-title    → page <title> with site suffix stripped
  //   citation-site     → "Project Context"
  //   citation-date     → current year
  //
  // The canonical link supplies the URL. Per-button overrides:
  //   data-cite-text          — supply the full citation string
  //   data-cite-year          — override the year (legacy; meta wins)
  //   data-copy-bibliography  — also append the bibliography
  //
  // The clipboard write is rich-text-capable: when the modern
  // Clipboard API is available, we write both text/html and
  // text/plain so <strong>/<em> markup inside .source-citation
  // entries survives paste into Word and Google Docs. Older
  // browsers degrade to plain text via writeText() and then
  // execCommand("copy").
  // ============================================================

  /** Read a <meta name="..."> content value, falling back if absent. */
  function meta(name, fallback) {
    const node = document.querySelector(`meta[name="${name}"]`);
    const value = node && node.content ? node.content.trim() : '';
    return value || (fallback != null ? fallback : '');
  }

  /** Escape text for safe embedding in HTML output. */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /**
   * Build the Chicago/SBL-style page citation. Meta tags win; legacy
   * data-cite-year on the button still works as a year override.
   * A full custom override via data-cite-text short-circuits the build.
   */
  function buildPageCitation(button) {
    const custom = button.getAttribute('data-cite-text');
    if (custom) return custom;

    const titleFromDoc = (document.title || 'Untitled')
      .replace(/\s*[|–-]\s*Project Context.*$/i, '')
      .trim();
    const yearFromAttr = button.getAttribute('data-cite-year');

    const author = meta('citation-author', 'Project Context');
    const title  = meta('citation-title',  titleFromDoc);
    const site   = meta('citation-site',   'Project Context');
    const date   = meta('citation-date',   yearFromAttr || String(new Date().getFullYear()));
    const url    = (document.querySelector('link[rel="canonical"]') || {}).href || window.location.href;

    return `${author}. "${title}." ${site}, ${date}. ${url}.`;
  }

  /**
   * Build the plain-text bibliography block. Pulls .innerText from
   * each .source-citation inside .bibliography-section. Returns ""
   * when no entries are found (caller decides what to do).
   */
  function buildBibliographyText() {
    const entries = $$('.bibliography-section .source-citation')
      .map(el => (el.innerText || '').trim())
      .filter(Boolean);
    if (!entries.length) return '';
    return 'Bibliography\n\n' + entries.join('\n\n');
  }

  /**
   * Build the HTML bibliography block. Each .source-citation's
   * innerHTML is preserved verbatim (it already contains <strong>
   * and <em> for Chicago-style author/title formatting), wrapped
   * in <p> tags. The heading is <h3>.
   */
  function buildBibliographyHTML() {
    const entries = $$('.bibliography-section .source-citation')
      .map(el => (el.innerHTML || '').trim())
      .filter(Boolean);
    if (!entries.length) return '';
    const items = entries.map(html => `<p>${html}</p>`).join('\n');
    return `<h3>Bibliography</h3>\n${items}`;
  }

  /**
   * Build the plain-text export. Page citation alone, or page
   * citation + bibliography when the button opts in.
   */
  function buildCitationExport(button) {
    const pageCitation = buildPageCitation(button);
    if (!button.hasAttribute('data-copy-bibliography')) return pageCitation;
    const bibliography = buildBibliographyText();
    return bibliography ? `${pageCitation}\n\n${bibliography}` : pageCitation;
  }

  /**
   * Build the rich-text (HTML) export. The page citation is wrapped
   * in a <p>; the bibliography section is appended when requested.
   * Returns a complete HTML fragment ready for the clipboard.
   */
  function buildCitationExportHTML(button) {
    const pageCitation = buildPageCitation(button);
    const pagePara = `<p>${escapeHtml(pageCitation)}</p>`;
    if (!button.hasAttribute('data-copy-bibliography')) return pagePara;
    const bibliography = buildBibliographyHTML();
    return bibliography ? `${pagePara}\n${bibliography}` : pagePara;
  }

  /**
   * Write both rich-text and plain-text representations to the
   * clipboard. Returns a promise that resolves on success and
   * rejects when even the legacy fallback fails.
   */
  async function writeRichToClipboard(html, text) {
    // Modern path — ClipboardItem with both MIME types.
    if (navigator.clipboard && typeof navigator.clipboard.write === 'function'
        && typeof window.ClipboardItem === 'function') {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html':  new Blob([html], { type: 'text/html' }),
            'text/plain': new Blob([text], { type: 'text/plain' })
          })
        ]);
        return;
      } catch (err) {
        // Fall through to writeText.
      }
    }

    // Plain-text path — writeText.
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (err) {
        // Fall through to execCommand.
      }
    }

    // Legacy path — hidden textarea + execCommand("copy").
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); }
    finally { document.body.removeChild(ta); }
  }

  function bindCiteButtons() {
    const buttons = $$('[data-cite-study], .cite-button');
    buttons.forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = buildCitationExport(btn);
        const html = buildCitationExportHTML(btn);
        const withBib = btn.hasAttribute('data-copy-bibliography');
        const original = btn.innerHTML;
        const showCopied = () => {
          btn.classList.add('copied');
          btn.textContent = withBib ? '✓ Citation + sources copied' : '✓ Citation copied';
          setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = original;
          }, 2400);
        };
        try {
          await writeRichToClipboard(html, text);
          showCopied();
        } catch (err) {
          console.warn('[v5.9.3] Citation copy failed:', err);
        }
      });
    });
  }


  // ============================================================
  // READING TIME AUTO-FILL
  // ============================================================

  /**
   * Replace the contents of any [data-reading-time] node with an
   * estimate based on word count of <main>. ~200 wpm. Honors a
   * data-reading-time-wpm attribute on the node if present.
   */
  function fillReadingTime() {
    const targets = $$('[data-reading-time]');
    if (!targets.length) return;
    const main = $('main') || document.body;
    const text = (main.innerText || '').trim();
    const words = text ? text.split(/\s+/).length : 0;
    targets.forEach(el => {
      const wpm = parseInt(el.getAttribute('data-reading-time-wpm'), 10) || 200;
      const minutes = Math.max(1, Math.round(words / wpm));
      el.textContent = `~${minutes} min`;
    });
  }


  // ============================================================
  // READING PROGRESS BAR + BACK TO TOP
  // ============================================================

  function bindScrollChrome() {
    const progress = $('.reading-progress');
    const backToTop = $('.back-to-top');
    const onScroll = () => {
      const y = document.body.scrollTop || document.documentElement.scrollTop;
      const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (progress) progress.style.width = ((y / h) * 100) + '%';
      if (backToTop) {
        if (y > 300) backToTop.classList.add('visible');
        else         backToTop.classList.remove('visible');
      }
      const nav = $('#main-nav');
      if (nav) {
        if (y > 100) nav.classList.add('scrolled');
        else         nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // ============================================================
  // ANCHOR LINK SMOOTH SCROLL
  // ============================================================

  function bindAnchorScroll() {
    $$('a[href^="#"]:not(.qdot):not(.tab-item)').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }


  // ============================================================
  // QUICK-NAV / MOBILE-TABS CLICK HANDLERS
  // ============================================================

  function bindQdotClicks(sidebar) {
    if (!sidebar) return;
    sidebar.container.addEventListener('click', (e) => {
      const dot = e.target.closest('.qdot');
      if (!dot) return;
      e.preventDefault();
      const id = dot.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }


  // ============================================================
  // RESPONSIVE LIFECYCLE
  // Mount / unmount mobile tabs as the viewport crosses 768px.
  // ============================================================

  let mobileTabsInstance = null;

  function syncMobileTabs(sections) {
    if (isMobile()) {
      if (!mobileTabsInstance) {
        mobileTabsInstance = new MobileSectionTabs(sections);
        mobileTabsInstance.mount();
      }
    } else {
      if (mobileTabsInstance) {
        mobileTabsInstance.destroy();
        mobileTabsInstance = null;
      }
    }
  }


  // ============================================================
  // SCROLL REVEAL — opt-in via [data-reveal] / [data-reveal-children]
  // plus canonical .timeline.stagger-children (treated as stagger parent).
  // ============================================================
  //
  // The CSS ships the hidden initial state and the reveal keyframe.
  // This function watches three trigger patterns:
  //   • [data-reveal]               — single element fades up
  //   • [data-reveal-children]      — children stagger fade up
  //   • .timeline.stagger-children  — children stagger slide in from left
  //
  // For both stagger patterns, we set --reveal-stagger on each direct
  // child (80ms apart) so they animate in sequence.
  //
  // Reduced-motion is handled by the CSS — observer still runs (cheap)
  // but the animation is disabled.
  // ============================================================

  function bindRevealOnScroll() {
    const targets = $$('[data-reveal], [data-reveal-children], .timeline.stagger-children');
    if (!targets.length) return;
    if (typeof IntersectionObserver !== 'function') {
      // No IO support — just reveal everything immediately.
      targets.forEach(el => el.setAttribute('data-revealed', 'true'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        const isStaggerParent =
          el.hasAttribute('data-reveal-children') ||
          el.matches('.timeline.stagger-children');

        if (isStaggerParent) {
          // Apply stagger delays to direct children
          const kids = Array.from(el.children);
          const step = 80; // ms between children
          kids.forEach((kid, i) => {
            kid.style.setProperty('--reveal-stagger', `${i * step}ms`);
          });
        }

        el.setAttribute('data-revealed', 'true');
        observer.unobserve(el);
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    targets.forEach(el => observer.observe(el));
  }


  // ============================================================
  // INITIALIZATION
  // ============================================================

  function init() {
    console.info('[v5.9.3] Project Context page chassis initialized.');

    // Reading time first — body text is stable, doesn't depend on widgets
    fillReadingTime();

    // Section config
    const sections = loadSectionConfig();

    // Quick-nav sidebar (desktop)
    const quickNav = new QuickNavSidebar(sections);
    quickNav.mount();
    bindQdotClicks(quickNav);

    // Mini-TOC pill bar tracking
    const miniToc = new MiniTocTracker();

    // Mobile tabs (responsive)
    syncMobileTabs(sections);

    // Active-section observer drives all three trackers
    observeActiveSection(sections, [
      mobileTabsInstance,
      quickNav,
      miniToc
    ]);

    // Re-mount/un-mount on resize
    const onResize = debounce(() => {
      syncMobileTabs(sections);
      // Re-bind observer so the (possibly new) mobile tabs instance gets sync calls
      observeActiveSection(sections, [
        mobileTabsInstance,
        quickNav,
        miniToc
      ]);
    }, 200);
    window.addEventListener('resize', onResize);

    // Cite buttons
    bindCiteButtons();

    // Scroll chrome
    bindScrollChrome();

    // Anchor smooth-scroll for anything not already handled
    bindAnchorScroll();

    // Scroll reveal — opt-in via [data-reveal] / [data-reveal-children]
    bindRevealOnScroll();

    // Print: expand bibliography / details
    window.addEventListener('beforeprint', () => {
      $$('details').forEach(d => d.setAttribute('open', ''));
    });

    // Expose for debugging
    window.__pcChassis = {
      sections,
      quickNav,
      miniToc,
      get mobileTabs() { return mobileTabsInstance; }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();