/**
 * Workflow Page Enhancements
 * Purpose: Desktop quick-nav sidebar for workflow sections
 */

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.quick-nav-sidebar');
  if (!sidebar) return;

  // Show on normal desktops too (adjust breakpoint as you like)
  const DESKTOP_MIN = 1024;
  if (window.innerWidth < DESKTOP_MIN) return;

  const sections = [
    { id: 'sources', label: 'Sources' },
    { id: 'stage1', label: 'Overview' },
    { id: 'stage2', label: 'Text' },
    { id: 'stage3', label: 'Structure' },
    { id: 'stage4', label: 'Context' },
    { id: 'stage5', label: 'Meaning' },
    { id: 'stage6', label: 'Canon' },
    { id: 'stage7', label: 'Practice' }
  ];

  sidebar.innerHTML = '';
  sidebar.setAttribute('role', 'navigation');
  sidebar.setAttribute('aria-label', 'Section navigation');

  sections.forEach(({ id, label }) => {
    const target = document.getElementById(id);
    if (!target) return;

    const a = document.createElement('a');
    a.href = `#${id}`;
    a.className = 'quick-nav-link';
    a.setAttribute('aria-label', label);
    a.title = label;

    // Smooth scroll with header offset (pattern borrowed from your structure script)
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    });

    sidebar.appendChild(a);
  });
});