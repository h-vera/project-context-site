/** Tabernacle thematic study — page-specific interactions. Companion to the shared /assets/js/page-chassis-v5-9.js.
 * Progressive enhancement: every diagram, table and paragraph is in the document before this runs.
 * The chassis owns scrollspy, reading progress, back-to-top, quick-nav, mobile tabs and the cite button;
 * this file adds the station highlighter, route toggles, the diagram viewer, the reference filter and print state.
 * A minimal fallback (progress bar, reading time, citation copy) covers local previews where the chassis is absent.
 * v1.2 — site navigation is injected by nav-component.js; the v1.1 local menu fallback has been removed.
 * v1.3 — hero route animation pauses while off-screen; reference filter highlights matches and re-stripes rows.
 */
(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const safeScroll = (target) => {
    if (!target) return;
    let ancestor = target.parentElement;
    while (ancestor) { if (ancestor.tagName === 'DETAILS') ancestor.open = true; ancestor = ancestor.parentElement; }
    if (target.tagName === 'DETAILS') target.open = true;
    const offset = ($('#main-nav')?.getBoundingClientRect().height || 70) + 24;
    window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset), behavior: reducedMotion() ? 'auto' : 'smooth' });
  };

  function init() {
    $$('[data-print]').forEach(btn => btn.addEventListener('click', () => window.print()));

    // The hero routes loop (CSS). Pause the loop while the figure is off-screen so it costs nothing mid-page.
    const heroFigure = $('.hero-figure');
    if (heroFigure && 'IntersectionObserver' in window) {
      new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) heroFigure.removeAttribute('data-offscreen'); else heroFigure.setAttribute('data-offscreen', ''); }), { threshold: 0.05 }).observe(heroFigure);
    }

    // Give the chassis's quick-nav dots accessible names and route its mobile tab strip through
    // the same header-offset scroll used for in-page links. The chassis may initialise after this
    // script (both are deferred), so poll briefly until it is present.
    const tuneChassis = () => {
      const chassis = window.__pcChassis; if (!chassis) return false;
      $$('.qdot').forEach(a => { if (a.dataset.label && !a.getAttribute('aria-label')) a.setAttribute('aria-label', a.dataset.label + ' section'); });
      const mobile = chassis.mobileTabs;
      if (mobile && !mobile.__tabernaclePatched) {
        if (typeof mobile.scrollToSection === 'function') mobile.scrollToSection = section => safeScroll(section && section.element ? section.element : section);
        if (typeof mobile.setActiveTab === 'function') {
          const originalSync = mobile.setActiveTab.bind(mobile);
          mobile.setActiveTab = (tab) => {
            originalSync(tab);
            $$('.tab-item').forEach(b => { b.removeAttribute('aria-selected'); b.removeAttribute('role'); if (b === tab) b.setAttribute('aria-current', 'location'); else b.removeAttribute('aria-current'); });
          };
        }
        $$('.tab-item').forEach(b => { b.removeAttribute('role'); b.removeAttribute('aria-selected'); });
        mobile.__tabernaclePatched = true;
      }
      return true;
    };
    if (!tuneChassis()) {
      let tries = 0;
      const poll = setInterval(() => { if (tuneChassis() || ++tries > 30) clearInterval(poll); }, 100);
    }
    let resizeTimer;
    window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(tuneChassis, 280); }, { passive: true });

    // Capture in-page anchors so native hash jumps, closed <details> targets and reduced motion
    // behave consistently under the fixed header. The chassis keeps owning scrollspy and progress.
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href^="#"]'); if (!a) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const hash = a.getAttribute('href'); if (!hash || hash === '#') return;
      let target; try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch { return; }
      if (!target) return;
      e.preventDefault(); e.stopImmediatePropagation();
      try { history.replaceState(null, '', hash); } catch { /* file: hosts may deny history writes. */ }
      safeScroll(target);
      if (a.classList.contains('skip-link')) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }
    }, true);
    // Keyboard activation of the chassis mobile tabs (their touch path does not cover Enter/Space).
    document.addEventListener('keydown', e => {
      const tab = e.target.closest('.tab-item'); if (!tab || !['Enter', ' '].includes(e.key)) return;
      const mobile = window.__pcChassis?.mobileTabs; if (!mobile) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (typeof mobile.activate === 'function') mobile.activate(tab); else tab.click();
    }, true);

    // Worshiper's walk: seven explanation cards cover nine numbered stations (7–9 share a card).
    let selectedStep = 0;
    function chooseStep(n) {
      selectedStep = selectedStep === n ? 0 : n;
      $$('[data-step]').forEach(el => el.setAttribute('aria-pressed', String(+el.dataset.step === selectedStep)));
      $$('[data-step-card]').forEach(el => el.classList.toggle('selected', +el.dataset.stepCard === selectedStep || (+el.dataset.stepCard === 7 && selectedStep >= 7)));
      const hint = $('#step-hint'); if (hint) hint.textContent = selectedStep ? 'Step ' + selectedStep + ' highlighted. Select it again to clear.' : 'Select a numbered station to highlight its explanation.';
    }
    $$('[data-step]').forEach(el => {
      el.addEventListener('click', () => chooseStep(+el.dataset.step));
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); chooseStep(+el.dataset.step); } });
    });
    $$('input[name="route"]').forEach(input => input.addEventListener('change', () => {
      const v = input.value; $$('[data-visibility="individual"],[data-visibility="atonement"]').forEach(g => g.style.opacity = (v === 'both' || g.dataset.visibility === v) ? '1' : '.16');
    }));
    $('#blood-toggle')?.addEventListener('change', e => $$('[data-visibility="markers"]').forEach(g => g.style.opacity = e.target.checked ? '1' : '0'));
    $$('.diagram-viewport.wide-diagram').forEach(el => {
      el.setAttribute('tabindex', '0'); el.setAttribute('role', 'region'); el.setAttribute('aria-label', 'Scrollable study diagram');
      const hint = document.createElement('p'); hint.className = 'mobile-figure-hint'; hint.textContent = 'Swipe across the diagram, or open the enlarged view.'; el.parentElement.appendChild(hint);
    });

    // Diagram viewer: clones the SVG with unique IDs so <defs>, markers and filters keep resolving.
    const dialog = $('#diagram-dialog'), content = $('#dialog-content'); let opener = null, scale = 1;
    function setScale(next) {
      scale = Math.max(1, Math.min(4, next)); const svg = $('svg', content); if (!svg) return;
      const base = Math.max(1, content.clientWidth - 2); svg.style.width = Math.round(base * scale) + 'px'; svg.style.maxWidth = 'none';
      $('#zoom-level').textContent = Math.round(scale * 100) + '%'; $('#zoom-out').disabled = scale <= 1; $('#zoom-in').disabled = scale >= 4;
    }
    $$('[data-zoom]').forEach(btn => btn.addEventListener('click', () => {
      const original = document.getElementById(btn.dataset.zoom); if (!original || !dialog || !content || typeof dialog.showModal !== 'function') return;
      opener = btn; const clone = original.cloneNode(true); const map = new Map();
      [clone, ...$$('[id]', clone)].forEach(el => { if (el.id) { map.set(el.id, 'zoom-' + el.id); el.id = 'zoom-' + el.id; } });
      [clone, ...$$('*', clone)].forEach(el => {
        for (const a of [...el.attributes]) {
          let value = a.value; map.forEach((to, from) => { if (value === '#' + from) value = '#' + to; value = value.split('url(#' + from + ')').join('url(#' + to + ')'); }); el.setAttribute(a.name, value);
        }
        if (el.hasAttribute('data-step')) ['data-step', 'tabindex', 'role', 'aria-pressed'].forEach(a => el.removeAttribute(a));
      });
      clone.setAttribute('role', 'img');
      content.replaceChildren(clone); $('#diagram-dialog-title').textContent = original.getAttribute('aria-label') || 'Enlarged diagram';
      document.body.classList.add('viewer-open'); dialog.showModal(); content.scrollTop = 0; content.scrollLeft = 0;
      requestAnimationFrame(() => setScale(1));
    }));
    $('#zoom-in')?.addEventListener('click', () => setScale(scale + .25)); $('#zoom-out')?.addEventListener('click', () => setScale(scale - .25)); $('#zoom-reset')?.addEventListener('click', () => setScale(1));
    $('#close-dialog')?.addEventListener('click', () => dialog.close());
    dialog?.addEventListener('close', () => { content.replaceChildren(); document.body.classList.remove('viewer-open'); opener?.focus(); });
    dialog?.addEventListener('click', e => { if (e.target !== dialog) return; const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); });
    dialog?.addEventListener('keydown', e => { if (e.key === '+' || e.key === '=') { e.preventDefault(); setScale(scale + .25); } if (e.key === '-') { e.preventDefault(); setScale(scale - .25); } });
    window.addEventListener('resize', () => { if (dialog?.open) setScale(scale); }, { passive: true });

    // Reference table filter (client-side only; the table is complete without it).
    const search = $('#reference-search'), group = $('#reference-group'), rows = $$('[data-ref-group]'), heads = $$('[data-ref-heading]');
    const normalize = t => t.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    rows.forEach(row => { row.__search = normalize(row.textContent); row.__html = row.innerHTML; });
    const escapeRe = t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Wrap query matches in <mark> inside text nodes only, so links and markup stay intact.
    function highlight(row, words) {
      row.innerHTML = row.__html;
      if (!words.length) return;
      const re = new RegExp('(' + words.map(escapeRe).join('|') + ')', 'gi');
      const walker = document.createTreeWalker(row, NodeFilter.SHOW_TEXT);
      const nodes = []; while (walker.nextNode()) nodes.push(walker.currentNode);
      nodes.forEach(node => {
        if (!re.test(node.nodeValue)) return; re.lastIndex = 0;
        const frag = document.createDocumentFragment(); let last = 0, m;
        while ((m = re.exec(node.nodeValue))) { frag.appendChild(document.createTextNode(node.nodeValue.slice(last, m.index))); const mark = document.createElement('mark'); mark.textContent = m[0]; frag.appendChild(mark); last = m.index + m[0].length; }
        frag.appendChild(document.createTextNode(node.nodeValue.slice(last))); node.parentNode.replaceChild(frag, node);
      });
    }
    function filterReferences() {
      const words = normalize(search?.value || '').trim().split(/\s+/).filter(Boolean), category = group?.value || 'all'; let count = 0; const seen = {};
      rows.forEach(row => {
        const show = (category === 'all' || row.dataset.refGroup === category) && words.every(word => row.__search.includes(word));
        row.hidden = !show; highlight(row, show ? words : []);
        const g = row.dataset.refGroup; seen[g] = seen[g] || 0; row.classList.toggle('alt', show && seen[g] % 2 === 1); if (show) { seen[g]++; count++; }
      });
      heads.forEach(row => row.hidden = !rows.some(r => !r.hidden && r.dataset.refGroup === row.dataset.refHeading));
      $('#reference-count').textContent = count === rows.length ? `${count} reference entries` : `${count} of ${rows.length} reference entries`;
      $('#reference-empty').hidden = count !== 0;
    }
    $$('[data-js-control]').forEach(el => el.hidden = false); search?.addEventListener('input', filterReferences); group?.addEventListener('change', filterReferences); filterReferences();
    $('#reference-reset')?.addEventListener('click', () => { search.value = ''; group.value = 'all'; filterReferences(); search.focus(); });

    // Print: expand everything (the chassis also expands <details>), then restore the reader's state.
    let detailState = null;
    const beforePrint = () => { if (detailState === null) detailState = window.__tabernaclePrintState || $$('details').map(d => [d, d.open]); $$('details').forEach(d => d.open = true); [...rows, ...heads].forEach(r => r.hidden = false); };
    window.addEventListener('beforeprint', beforePrint, true);
    window.addEventListener('afterprint', () => { if (detailState) detailState.forEach(([d, open]) => d.open = open); detailState = null; window.__tabernaclePrintState = null; filterReferences(); });
    const printMedia = window.matchMedia('print'); printMedia.addEventListener?.('change', e => { if (e.matches) beforePrint(); });

    // Resolve deep links once the DOM and chassis have settled.
    if (location.hash) { setTimeout(() => { let id; try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; } safeScroll(document.getElementById(id)); }, 150); }
    window.__tabernacleStudy = { chooseStep, filterReferences, setScale, version: '1.3' };
  }

  // Fallback for previews where /assets/js/page-chassis-v5-9.js is not loaded. No-ops on the live site.
  function chassisFallback() {
    if (window.__pcChassis) return;
    const bar = $('.reading-progress');
    const onScroll = () => { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; if (bar) bar.style.width = (max > 0 ? Math.min(100, window.scrollY / max * 100) : 0) + '%'; $('.back-to-top')?.classList.toggle('visible', window.scrollY > 600); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    const main = $('#main-content'); const rt = $('[data-reading-time]');
    if (main && rt) { const words = main.innerText.trim().split(/\s+/).length; rt.textContent = '~' + Math.max(1, Math.round(words / 220)) + ' min'; }
    $$('[data-cite-study]').forEach(btn => btn.addEventListener('click', async () => {
      if (window.__pcChassis) return;
      const meta = n => document.querySelector('meta[name="citation-' + n + '"]')?.content || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.href || location.href.split('#')[0];
      const cite = meta('author') + '. “' + meta('title') + '.” ' + meta('site') + ', ' + meta('date') + '. ' + canonical;
      const sources = $$('.source-citation').map(s => s.textContent.trim()).join('\n');
      const text = cite + '\n\nSources\n' + sources;
      const label = $('.cite-button-label', btn);
      try { await navigator.clipboard.writeText(text); if (label) { const prior = label.textContent; label.textContent = 'Copied'; setTimeout(() => { label.textContent = prior; }, 1800); } } catch { window.prompt('Copy the citation:', text); }
    }));
  }
  const boot = () => { init(); if (document.readyState === 'complete') setTimeout(chassisFallback, 400); else window.addEventListener('load', () => setTimeout(chassisFallback, 400)); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();