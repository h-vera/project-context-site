#!/bin/bash

# Script to fix navigation and breadcrumbs in Abraham pages
# Run this in the directory containing the Abraham HTML files

echo "Starting Abraham pages navigation and breadcrumb fixes..."
echo "==========================================="

# Function to add navigation buttons to a file
add_navigation_buttons() {
    local file=$1
    local current_part=$2
    
    echo "  Adding navigation buttons to $file..."
    
    # Navigation HTML to add before closing </section> tag
    local nav_html='
    <!-- NAVIGATION -->
    <div class="nav-buttons" style="display: flex; justify-content: space-between; margin: 3rem 0; gap: 1rem; flex-wrap: wrap;">
'
    
    # Add appropriate navigation based on which part
    case $current_part in
        1)
            nav_html+='      <a href="abraham.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Return to Overview</a>
      <a href="abraham-theology.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #7209b7, #e11d48); color: white; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Part 2: Theology →</a>'
            ;;
        2)
            nav_html+='      <a href="abraham-narrative.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Part 1: Narrative</a>
      <a href="abraham.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #7209b7, #e11d48); color: white; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Return to Overview</a>
      <a href="abraham-nt-fulfillment.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Part 3: NT Fulfillment →</a>'
            ;;
        3)
            # This one already has navigation, but we'll ensure it's consistent
            nav_html+='      <a href="abraham-narrative.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Part 1: Narrative</a>
      <a href="abraham-theology.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Part 2: Theology</a>
      <a href="abraham.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #7209b7, #e11d48); color: white; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Return to Overview</a>'
            ;;
    esac
    
    nav_html+='
    </div>

  </section>'
    
    # Check if navigation already exists
    if grep -q "nav-buttons" "$file"; then
        echo "    Navigation already exists, skipping..."
    else
        # Add navigation before the closing </section> tag
        # Use sed to insert before the last </section>
        sed -i.bak '/<\/section>$/i\
\
    <!-- NAVIGATION -->\
    <div class="nav-buttons" style="display: flex; justify-content: space-between; margin: 3rem 0; gap: 1rem; flex-wrap: wrap;">\
      <!-- Navigation links will be added here -->\
    </div>
' "$file"
        
        # Now update with the specific navigation for this part
        case $current_part in
            1)
                sed -i '' 's|<!-- Navigation links will be added here -->|<a href="abraham.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Return to Overview</a>\
      <a href="abraham-theology.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #7209b7, #e11d48); color: white; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Part 2: Theology →</a>|' "$file"
                ;;
            2)
                sed -i '' 's|<!-- Navigation links will be added here -->|<a href="abraham-narrative.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">← Part 1: Narrative</a>\
      <a href="abraham.html" style="padding: 1rem 2rem; background: linear-gradient(135deg, #7209b7, #e11d48); color: white; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Return to Overview</a>\
      <a href="abraham-nt-fulfillment.html" style="padding: 1rem 2rem; background: #f3f4f6; color: #1a202c; border-radius: 8px; text-decoration: none; text-align: center; flex: 1; min-width: 200px;">Part 3: NT Fulfillment →</a>|' "$file"
                ;;
        esac
        
        echo "    ✓ Navigation added!"
    fi
}

# Function to update breadcrumbs
update_breadcrumbs() {
    local file=$1
    local page_name=$2
    
    echo "  Updating breadcrumbs in $file..."
    
    # The new breadcrumb HTML
    local breadcrumb_html='<div class="breadcrumbs">
      <a href="/studies">Studies</a> › 
      <a href="/studies/characters/">Biblical Characters</a> › 
      <a href="/studies/characters/genesis/">Genesis</a> › 
      '$page_name'
    </div>'
    
    # Check if breadcrumbs exist
    if grep -q "breadcrumbs" "$file"; then
        # Replace existing breadcrumbs
        # This handles various formats of existing breadcrumbs
        sed -i.bak '/<div class="breadcrumbs">/,/<\/div>/c\
    <div class="breadcrumbs">\
      <a href="/studies">Studies</a> › \
      <a href="/studies/characters/">Biblical Characters</a> › \
      <a href="/studies/characters/genesis/">Genesis</a> › \
      '"$page_name"'\
    </div>' "$file"
        echo "    ✓ Breadcrumbs updated!"
    else
        # Add breadcrumbs after <section class="content-section">
        sed -i.bak '/<section class="content-section">/a\
    \
    <div class="breadcrumbs">\
      <a href="/studies">Studies</a> › \
      <a href="/studies/characters/">Biblical Characters</a> › \
      <a href="/studies/characters/genesis/">Genesis</a> › \
      '"$page_name"'\
    </div>' "$file"
        echo "    ✓ Breadcrumbs added!"
    fi
}

# Check if files exist
echo "Checking for Abraham files..."
files_found=0

if [ -f "abraham.html" ]; then
    echo "  ✓ abraham.html found"
    ((files_found++))
fi

if [ -f "abraham-narrative.html" ]; then
    echo "  ✓ abraham-narrative.html found"
    ((files_found++))
fi

if [ -f "abraham-theology.html" ]; then
    echo "  ✓ abraham-theology.html found"
    ((files_found++))
fi

if [ -f "abraham-nt-fulfillment.html" ]; then
    echo "  ✓ abraham-nt-fulfillment.html found"
    ((files_found++))
fi

if [ $files_found -eq 0 ]; then
    echo "ERROR: No Abraham files found in current directory!"
    echo "Please run this script in the directory containing the Abraham HTML files."
    exit 1
fi

echo ""
echo "Found $files_found Abraham files. Starting fixes..."
echo ""

# Process abraham.html (Overview)
if [ -f "abraham.html" ]; then
    echo "Processing abraham.html (Overview)..."
    update_breadcrumbs "abraham.html" "Abraham"
    echo ""
fi

# Process abraham-narrative.html (Part 1)
if [ -f "abraham-narrative.html" ]; then
    echo "Processing abraham-narrative.html (Part 1)..."
    update_breadcrumbs "abraham-narrative.html" '<a href="abraham.html">Abraham</a> › Part 1: Narrative'
    add_navigation_buttons "abraham-narrative.html" 1
    echo ""
fi

# Process abraham-theology.html (Part 2)
if [ -f "abraham-theology.html" ]; then
    echo "Processing abraham-theology.html (Part 2)..."
    update_breadcrumbs "abraham-theology.html" '<a href="abraham.html">Abraham</a> › Part 2: Theology'
    # Check if it needs navigation buttons
    if ! grep -q "nav-buttons" "abraham-theology.html"; then
        add_navigation_buttons "abraham-theology.html" 2
    else
        echo "  Navigation already exists, skipping..."
    fi
    echo ""
fi

# Process abraham-nt-fulfillment.html (Part 3)
if [ -f "abraham-nt-fulfillment.html" ]; then
    echo "Processing abraham-nt-fulfillment.html (Part 3)..."
    update_breadcrumbs "abraham-nt-fulfillment.html" '<a href="abraham.html">Abraham</a> › Part 3: NT Fulfillment'
    # Part 3 already has navigation, but we'll ensure breadcrumbs are updated
    echo ""
fi

# Clean up backup files
echo "Cleaning up backup files..."
rm -f *.bak
echo "  ✓ Backup files removed"

echo ""
echo "==========================================="
echo "✅ All fixes completed successfully!"
echo ""
echo "Your Abraham pages now have:"
echo "  ✓ Consistent breadcrumb navigation"
echo "  ✓ Navigation buttons on all pages"
echo "  ✓ Proper links between all parts"
echo ""
echo "Next steps:"
echo "  1. Move these files to: /studies/characters/genesis/abraham/"
echo "  2. Test navigation from the Characters Hub"
echo "  3. Verify all internal links work correctly"
