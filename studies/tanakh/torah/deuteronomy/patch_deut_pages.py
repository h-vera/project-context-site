#!/usr/bin/env python3
"""
Deuteronomy Study Pages — Comprehensive Patch Script
Run against your local files to apply all standardization fixes.

Usage:
  python3 patch_deut_pages.py /path/to/deuteronomy/

This will modify files in-place (creates .bak backups first).
"""

import re
import os
import sys
import shutil

# ══════════════════════════════════════════
# STANDARD NAV HTML
# ══════════════════════════════════════════

def make_nav(active_href):
    """Generate standardized study-nav-tabs with active page."""
    pages = [
        ("deut-overview.html", "📖 Overview"),
        ("deut-literary.html", "✍️ Literary"),
        ("deut-hebrew.html", "🔤 Hebrew"),
        ("deut-structure.html", "🏛️ Structure"),
        ("deut-law.html", "⚖️ Law"),
        ("deut-theology.html", "🕊️ Theology"),
        ("deut-intertext.html", "🔗 Connections"),
        ("deut-poems.html", "🎵 Poems"),
        ("deut-study-kit.html", "📚 Study Kit"),
    ]
    lines = ['    <nav class="study-nav-tabs" aria-label="Study pages">']
    for href, label in pages:
        cls = "study-link active" if href == active_href else "study-link"
        lines.append(f'      <a href="{href}" class="{cls}">{label}</a>')
    lines.append('    </nav>')
    return "\n".join(lines)

# ══════════════════════════════════════════
# STANDARD BREADCRUMBS
# ══════════════════════════════════════════

CRUMBS = {
    "deut-overview.html": None,  # Final node = "Deuteronomy" (no trailing page name)
    "deut-literary.html": "Literary Design",
    "deut-hebrew.html": "Hebrew Vocabulary",
    "deut-structure.html": "Structural Design",
    "deut-law.html": "Law Collection",
    "deut-theology.html": "Theological Themes",
    "deut-intertext.html": "Biblical Connections",
    "deut-poems.html": "Poems &amp; Final Words",
    "deut-study-kit.html": "Study Kit",
}

def make_breadcrumbs(filename):
    page_name = CRUMBS.get(filename)
    base = '''    <div class="breadcrumbs">
      <a href="/">Home</a> ›
      <a href="/studies/">Studies</a> ›
      <a href="/studies/tanakh/">Tanakh</a> ›
      <a href="/studies/tanakh/torah/">Torah</a> ›'''
    if page_name is None:
        return base + "\n      Deuteronomy\n    </div>"
    else:
        return base + f'\n      <a href="deut-overview.html">Deuteronomy</a> ›\n      {page_name}\n    </div>'

# ══════════════════════════════════════════
# STUDY-NAV-TABS CSS (to inject)
# ══════════════════════════════════════════

STUDY_NAV_CSS = """
    /* ── Study Nav Tabs (pill-shaped, standardized) ── */
    .study-nav-tabs{display:flex;gap:.5rem;padding:1rem;margin-bottom:2rem;flex-wrap:wrap;justify-content:center;background:white;border-radius:10px;border:1px solid var(--page-accent-border, #C8D6E8);box-shadow:0 2px 8px rgba(0,0,0,.06)}
    .study-link{color:#607590;text-decoration:none;padding:.5rem 1.1rem;border-radius:999px;font-weight:500;font-size:.88rem;transition:all .25s ease;border:2px solid transparent;white-space:nowrap;display:inline-flex;align-items:center;gap:.3rem;min-height:38px}
    .study-link:hover{background:var(--page-accent-bg, #F5F8FC);color:var(--page-accent-dark, #1A3D6E);border-color:var(--page-accent-border, #C8D6E8)}
    .study-link.active{background:linear-gradient(135deg,var(--page-accent, #2B5EA7) 0%,var(--page-accent-dark, #1A3D6E) 100%);color:white;font-weight:600;border-color:transparent;box-shadow:0 4px 12px rgba(43,94,167,.3)}
"""

# ══════════════════════════════════════════
# CORE TRANSFORMATIONS
# ══════════════════════════════════════════

def replace_breadcrumbs(html, filename):
    new_bc = make_breadcrumbs(filename)
    return re.sub(
        r'<div class="breadcrumbs">.*?</div>',
        new_bc,
        html, count=1, flags=re.DOTALL
    )

def replace_nav(html, filename):
    new_nav = make_nav(filename)
    
    # Pattern 1: <div class="page-nav-bar">...</div>
    html = re.sub(
        r'<div class="page-nav-bar">.*?</div>',
        new_nav, html, count=1, flags=re.DOTALL
    )
    # Pattern 2: <nav class="page-nav-bar">...</nav>
    html = re.sub(
        r'<nav class="page-nav-bar">.*?</nav>',
        new_nav, html, count=1, flags=re.DOTALL
    )
    # Pattern 3: Existing study-nav-tabs (overview, literary already have this)
    html = re.sub(
        r'<nav class="study-nav-tabs"[^>]*>.*?</nav>',
        new_nav, html, count=1, flags=re.DOTALL
    )
    return html

def ensure_study_nav_css(html):
    """Add study-nav-tabs CSS if not already present."""
    if '.study-nav-tabs' in html and '.study-link' in html:
        return html  # Already has it
    
    # Remove old page-nav-bar CSS (various formats)
    # Pattern: the block starting with page-nav-bar selectors
    html = re.sub(
        r'/\*\s*──?\s*[Pp]age nav bar\s*──?\s*\*/.*?(?=\n\s*/\*|\n\s*\.\w)',
        '',
        html,
        flags=re.DOTALL
    )
    # Also remove standalone .page-nav-bar rules
    html = re.sub(
        r'\.page-nav-bar\{[^}]*\}',
        '',
        html
    )
    html = re.sub(
        r'\.page-nav-bar\s+a\{[^}]*\}',
        '',
        html
    )
    html = re.sub(
        r'\.page-nav-bar\s+a:hover\{[^}]*\}',
        '',
        html
    )
    html = re.sub(
        r'\.page-nav-bar\s+a\.current\{[^}]*\}',
        '',
        html
    )
    
    # Insert study-nav-tabs CSS before </style>
    html = html.replace('</style>', STUDY_NAV_CSS + '\n  </style>', 1)
    return html

def ensure_css_vars(html):
    """Add :root CSS vars if missing."""
    if '--page-accent:#2B5EA7' in html or '--page-accent: #2B5EA7' in html:
        return html
    css_vars = "\n    :root{--page-accent:#2B5EA7;--page-accent-light:#D4A940;--page-accent-dark:#1A3D6E;--page-accent-bg:#F5F8FC;--page-accent-border:#C8D6E8;--page-accent-glow:rgba(43,94,167,.12)}\n"
    html = html.replace('<style>', '<style>' + css_vars, 1)
    return html

# ══════════════════════════════════════════
# FILE-SPECIFIC FIXES
# ══════════════════════════════════════════

def fix_overview(html):
    """Add quick-nav-pills after the nav on overview page."""
    quick_nav = """
    <!-- Quick Nav Pills (standardized) -->
    <div class="quick-nav-pills" style="margin:0 0 2rem;padding:1rem 1.25rem;background:linear-gradient(135deg,rgba(43,94,167,.04),rgba(212,169,64,.03));border:1.5px solid rgba(43,94,167,.12);border-radius:14px;display:flex;align-items:center;gap:.75rem;position:relative;overflow:hidden">
      <span style="flex-shrink:0;font-size:.75rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:#1A3D6E;opacity:.6;padding-right:.5rem;border-right:2px solid rgba(43,94,167,.15)">Jump to</span>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;align-items:center">
        <a href="#overview" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">📖 Why It Matters</a>
        <a href="#at-a-glance" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">🔍 At a Glance</a>
        <a href="#cast" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">👥 Cast</a>
        <a href="#structure" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">📊 Structure</a>
        <a href="#bookends" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">📚 Bookends</a>
        <a href="#themes" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">🎨 Themes</a>
        <a href="#chapter-map" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">📜 Chapter Map</a>
        <a href="#start" style="display:inline-flex;align-items:center;padding:.35rem .75rem;border-radius:999px;font-size:.82rem;font-weight:600;text-decoration:none;color:#4A5E78;background:white;border:1.5px solid rgba(43,94,167,.18);box-shadow:0 1px 4px rgba(0,0,0,.04)">🚀 Explore</a>
      </div>
    </div>
"""
    # Insert after the nav closing tag
    html = html.replace(
        '</nav>\n\n    <!-- =',
        '</nav>\n' + quick_nav + '\n    <!-- =',
        1
    )
    # Fallback: insert after </nav> before the first theology-card
    if 'quick-nav-pills' not in html:
        html = html.replace(
            '</nav>\n\n    <div class="theology-card',
            '</nav>\n' + quick_nav + '\n    <div class="theology-card',
            1
        )
    return html

def fix_literary(html):
    """Add Connections cross-ref to literary page."""
    old_refs = '''        <a href="deut-law.html" class="cross-ref">→ The Laws as Wisdom</a>
        <a href="/studies/tanakh/neviim/minor-prophets/hosea/hosea.html" class="cross-ref">→ Book of Hosea</a>'''
    new_refs = '''        <a href="deut-law.html" class="cross-ref">→ The Laws as Wisdom</a>
        <a href="deut-intertext.html" class="cross-ref">→ Biblical Connections</a>
        <a href="/studies/tanakh/neviim/minor-prophets/hosea/hosea.html" class="cross-ref">→ Book of Hosea</a>'''
    html = html.replace(old_refs, new_refs)
    return html

def fix_law(html):
    """Add id='treaty-exemplars' anchor to law page."""
    # Add the id to the treaty exemplar heading
    old_heading = '<h4 style="color:var(--page-accent-dark);font-size:1.1rem;margin:2rem 0 .5rem;">Real Treaty Language: What These Documents Actually Sound Like</h4>'
    new_heading = '<h4 id="treaty-exemplars" style="color:var(--page-accent-dark);font-size:1.1rem;margin:2rem 0 .5rem;">Real Treaty Language: What These Documents Actually Sound Like</h4>'
    html = html.replace(old_heading, new_heading)
    return html

def fix_study_kit(html):
    """Add missing bibliography entries to study-kit master bibliography."""
    
    # 1. Add Block's NIVAC Deuteronomy commentary (separate from Gospel According to Moses)
    old_block = '''        <div class="verse-card" style="border-left-color:var(--page-accent);"><div class="verse-ref">Block, Daniel I.</div><p style="font-style:normal;"><em>The Gospel According to Moses.</em> Wipf & Stock.</p><div class="verse-theme">Application · Song · Blessing</div></div>'''
    new_block = '''        <div class="verse-card" style="border-left-color:var(--page-accent);"><div class="verse-ref">Block, Daniel I.</div><p style="font-style:normal;"><em>Deuteronomy.</em> NIVAC. Zondervan, 2012.</p><div class="verse-theme">7-Layer Design · Law Clusters · Jeshurun</div></div>
        <div class="verse-card" style="border-left-color:var(--page-accent);"><div class="verse-ref">Block, Daniel I.</div><p style="font-style:normal;"><em>The Gospel According to Moses.</em> Wipf & Stock.</p><div class="verse-theme">Application · Song · Blessing</div></div>'''
    html = html.replace(old_block, new_block)
    
    # 2. Add Thompson (cited on law page)
    old_thompson_spot = '''        <div class="verse-card" style="border-left-color:var(--page-accent-light);"><div class="verse-ref">Parpola, Simo, and Watanabe, Kazuko</div><p style="font-style:normal;"><em>Neo-Assyrian Treaties and Loyalty Oaths.</em> SAA 2.</p><div class="verse-theme">Esarhaddon oaths · Treaty corpus</div></div>'''
    new_thompson_spot = '''        <div class="verse-card" style="border-left-color:var(--page-accent-light);"><div class="verse-ref">Parpola, Simo, and Watanabe, Kazuko</div><p style="font-style:normal;"><em>Neo-Assyrian Treaties and Loyalty Oaths.</em> SAA 2.</p><div class="verse-theme">Esarhaddon oaths · Treaty corpus</div></div>
        <div class="verse-card" style="border-left-color:var(--page-accent-light);"><div class="verse-ref">Thompson, J. A.</div><p style="font-style:normal;">"The Ancient Near Eastern Treaties and the Old Testament." <em>Tyndale Bulletin.</em></p><div class="verse-theme">Treaty template · Biblical comparison</div></div>
        <div class="verse-card" style="border-left-color:var(--page-accent-light);"><div class="verse-ref">Dorsey, David A.</div><p style="font-style:normal;"><em>The Literary Structure of the Old Testament.</em> Baker, 1999.</p><div class="verse-theme">Chiastic design · Macro structure</div></div>'''
    html = html.replace(old_thompson_spot, new_thompson_spot)
    
    return html

# ══════════════════════════════════════════
# MAIN
# ══════════════════════════════════════════

def process_file(filepath, filename):
    """Apply all standard + file-specific transforms."""
    with open(filepath, 'r', encoding='utf-8') as f:
        html = f.read()
    
    original = html
    
    # Standard transforms
    html = ensure_css_vars(html)
    html = ensure_study_nav_css(html)
    html = replace_breadcrumbs(html, filename)
    html = replace_nav(html, filename)
    
    # File-specific transforms
    if filename == "deut-overview.html":
        html = fix_overview(html)
    elif filename == "deut-literary.html":
        html = fix_literary(html)
    elif filename == "deut-law.html":
        html = fix_law(html)
    elif filename == "deut-study-kit.html":
        html = fix_study_kit(html)
    
    # Clean up artifacts
    html = re.sub(r'\n{4,}', '\n\n\n', html)
    
    if html != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html)
        return True
    return False

def main():
    if len(sys.argv) < 2:
        print("Usage: python3 patch_deut_pages.py /path/to/deuteronomy/")
        print("\nThis script modifies files in-place (creates .bak backups).")
        sys.exit(1)
    
    directory = sys.argv[1]
    if not os.path.isdir(directory):
        print(f"Error: {directory} is not a directory")
        sys.exit(1)
    
    files = [
        "deut-overview.html",
        "deut-literary.html",
        # "deut-hebrew.html",  # Skip — use the complete replacement file instead
        "deut-structure.html",
        "deut-law.html",
        "deut-theology.html",
        "deut-intertext.html",
        "deut-poems.html",
        "deut-study-kit.html",
    ]
    
    print("╔══════════════════════════════════════════════════╗")
    print("║  Deuteronomy Study Pages — Standardization Patch ║")
    print("╚══════════════════════════════════════════════════╝")
    print()
    print(f"Directory: {directory}")
    print()
    
    for filename in files:
        filepath = os.path.join(directory, filename)
        if not os.path.exists(filepath):
            print(f"  ✗ {filename} — NOT FOUND (skipping)")
            continue
        
        # Create backup
        backup = filepath + ".bak"
        shutil.copy2(filepath, backup)
        
        # Apply transforms
        changed = process_file(filepath, filename)
        if changed:
            print(f"  ✓ {filename} — patched (backup: {filename}.bak)")
        else:
            print(f"  · {filename} — no changes needed")
    
    print()
    print("Done. Changes applied:")
    print("  • Nav bars → study-nav-tabs (pill-shaped, 9 standardized links)")
    print("  • Breadcrumbs → standardized directory paths")
    print("  • CSS → study-nav-tabs CSS added where needed")
    print("  • CSS vars → :root vars added where missing")
    print()
    print("File-specific fixes:")
    print("  • deut-overview.html → quick-nav-pills added")
    print("  • deut-literary.html → Connections cross-ref added")
    print("  • deut-law.html → id='treaty-exemplars' added")
    print("  • deut-study-kit.html → 3 bibliography entries added")
    print("    (Block NIVAC, Thompson Tyndale Bulletin, Dorsey Literary Structure)")
    print()
    print("NOTE: deut-hebrew.html should be replaced with the complete file")
    print("      (has animation engine, Structure link, CSS vars added).")

if __name__ == "__main__":
    main()
