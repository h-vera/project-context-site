/* Ephesus Across the New Testament — v4.2
 * No dependencies. The supplied HTML contains every explanation; no fetch is used.
 * Shared navigation stays with page-chassis-v5-9.js and nav-component.js.
 */
(function () {
  'use strict';

  function initNetwork(root) {
    if (root.dataset.networkReady === 'true') return;
    const panel = root.querySelector('#connection-panel');
    const controls = root.querySelector('.network-controls');
    const viewport = root.querySelector('.network-viewport');
    const svg = root.querySelector('#records-map');
    if (!panel || !controls || !svg || !viewport) return;

    const overview = panel.firstElementChild.cloneNode(true);
    const entries = new Map();
    root.querySelectorAll('[data-connection-entry]').forEach(function (entry) {
      const content = entry.querySelector('.connection-content');
      if (content) entries.set(entry.dataset.connectionEntry, content);
    });
    const selectors = Array.from(root.querySelectorAll('[data-connection]'));
    const routes = Array.from(root.querySelectorAll('[data-route]'));
    const places = Array.from(root.querySelectorAll('[data-place]'));
    let active = 'overview';
    let hoverTimer = null;

    function select(id, source) {
      if (id !== 'overview' && !entries.has(id)) return;
      if (active === id && root.dataset.networkReady === 'true') return;
      active = id;
      root.dataset.activeConnection = id;
      root.classList.toggle('has-selection', id !== 'overview');
      selectors.forEach(function (control) {
        control.setAttribute('aria-pressed', String(control.dataset.connection === id));
      });
      let endpoints = [];
      routes.forEach(function (route) {
        const selected = route.dataset.route === id;
        route.classList.toggle('is-active', selected);
        if (selected) {
          endpoints = (route.dataset.endpoints || '').split(' ');
          // Bring the selected path and its white separation above crossings.
          route.parentElement.appendChild(route);
        }
      });
      places.forEach(function (place) {
        place.classList.toggle('is-active', endpoints.includes(place.dataset.place));
      });
      const content = id === 'overview' ? overview.cloneNode(true) : entries.get(id).cloneNode(true);
      panel.replaceChildren(content);
      // Horizontal scrolling only: selection must never move the page vertically.
      if (id !== 'overview' && source === 'button' && viewport.scrollWidth > viewport.clientWidth) {
        const marker = root.querySelector('.network-marker[data-connection="' + id + '"]');
        const target = marker && marker.querySelector('.marker-target');
        const box = svg.getBoundingClientRect();
        if (target && svg.viewBox.baseVal.width) {
          const x = Number(target.getAttribute('cx')) * box.width / svg.viewBox.baseVal.width;
          const left = Math.max(0, Math.min(viewport.scrollWidth - viewport.clientWidth, x - viewport.clientWidth / 2));
          viewport.scrollLeft = left;
        }
      }
    }

    function cancelHover() {
      if (hoverTimer !== null) { window.clearTimeout(hoverTimer); hoverTimer = null; }
    }
    selectors.forEach(function (control) {
      const id = control.dataset.connection;
      const source = control.classList.contains('network-marker') ? 'marker' : 'button';
      if (source === 'marker') {
        control.setAttribute('role', 'button');
        control.setAttribute('tabindex', '0');
        control.setAttribute('aria-pressed', 'false');
        control.setAttribute('aria-controls', 'connection-panel');
      }
      control.addEventListener('click', function () { cancelHover(); select(id, source); });
      // Focus alone never changes the selection: tabbing through the controls
      // leaves the panel as it is. Selection needs a click, Enter, or Space.
      control.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse' || !window.matchMedia('(hover: hover)').matches) return;
        cancelHover();
        hoverTimer = window.setTimeout(function () { select(id, source); hoverTimer = null; }, 140);
      });
      control.addEventListener('pointerleave', cancelHover);
      if (source === 'marker') {
        control.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); cancelHover(); select(id, source);
          }
        });
      }
    });
    root.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { cancelHover(); select('overview', 'keyboard'); }
    });
    controls.hidden = false;
    // Reserve the tallest explanation at the current width so the surrounding
    // page does not move when a reader changes connections. No text is clipped.
    let measuredWidth = 0;
    function sizePanel() {
      const width = panel.getBoundingClientRect().width;
      if (width < 1) return;
      const probe = document.createElement('div');
      probe.className = 'connection-panel';
      probe.setAttribute('aria-hidden', 'true');
      Object.assign(probe.style, {
        position:'absolute', left:'-10000px', top:'0', visibility:'hidden',
        pointerEvents:'none', width:width + 'px', minHeight:'0', height:'auto'
      });
      panel.parentElement.appendChild(probe);
      let tallest = 0;
      [overview].concat(Array.from(entries.values())).forEach(function (content) {
        probe.replaceChildren(content.cloneNode(true));
        tallest = Math.max(tallest, probe.getBoundingClientRect().height);
      });
      probe.remove();
      panel.style.minHeight = Math.ceil(tallest + 2) + 'px';
      measuredWidth = width;
    }
    sizePanel();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizePanel);
    if ('ResizeObserver' in window) {
      const observer = new ResizeObserver(function () {
        if (Math.abs(panel.getBoundingClientRect().width - measuredWidth) > 1) sizePanel();
      });
      observer.observe(root);
    } else window.addEventListener('resize', sizePanel);
    root.dataset.networkReady = 'true';
    root.dataset.activeConnection = 'overview';
    const instruction = root.querySelector('#connections-instruction');
    if (instruction) instruction.textContent = 'Hover to preview or select a number. Its explanation stays open until you choose another connection.';
  }

  function openAnchor(hash, scroll) {
    if (!hash || hash === '#') return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch (_) { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target;
    while (parent && parent !== document.body) {
      if (parent.tagName === 'DETAILS') parent.open = true;
      parent = parent.parentElement;
    }
    if (scroll) window.requestAnimationFrame(function () {
      target.scrollIntoView({block:'start', behavior:'auto'});
    });
  }

  function init() {
    document.querySelectorAll('[data-ephesus-network]').forEach(initNetwork);
    // Links into notes work from the map, reading plan, or another page.
    document.addEventListener('click', function (event) {
      const anchor = event.target.closest && event.target.closest('a[href^="#"]');
      if (anchor) openAnchor(anchor.getAttribute('href'), false);
    });
    window.addEventListener('hashchange', function () { openAnchor(window.location.hash, true); });
    openAnchor(window.location.hash, true);

    // Printed copies retain all connection explanations and substantive notes.
    let printState = [];
    window.addEventListener('beforeprint', function () {
      printState = Array.from(document.querySelectorAll('.editorial-note,.connection-directory,.bibliography-section')).map(function (item) {
        const state = {item:item, open:item.open}; item.open = true; return state;
      });
    });
    window.addEventListener('afterprint', function () {
      printState.forEach(function (state) { state.item.open = state.open; });
      printState = [];
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();