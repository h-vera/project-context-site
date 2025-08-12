#!/bin/bash

# ============================================
# Fix Navigation Links Script
# ============================================
# This script updates all navigation links in HTML files
# to match the new directory structure
# ============================================

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# ============================================
# STEP 1: Create Backup
# ============================================
print_status "Creating backup before fixing links..."
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backup_links_${TIMESTAMP}"

# Backup only HTML files
mkdir -p "$BACKUP_DIR"
find . -name "*.html" -type f | while read file; do
    dir=$(dirname "$file")
    mkdir -p "$BACKUP_DIR/$dir"
    cp "$file" "$BACKUP_DIR/$file"
done
print_success "Backup created: $BACKUP_DIR"

# ============================================
# STEP 2: Fix Hosea Directory Links
# ============================================
print_status "Fixing navigation links in Hosea files..."

HOSEA_DIR="studies/tanakh/neviim/minor-prophets/hosea"

if [ -d "$HOSEA_DIR" ]; then
    # Fix links in all Hosea HTML files
    for file in "$HOSEA_DIR"/*.html; do
        if [ -f "$file" ]; then
            filename=$(basename "$file")
            print_status "Updating $filename..."
            
            # Fix path to root index.html (5 levels up)
            sed -i.bak 's|href="../../index.html"|href="../../../../../index.html"|g' "$file"
            sed -i.bak 's|href="../../about.html"|href="../../../../../about.html"|g' "$file"
            
            # Fix path to Project Context logo/home
            sed -i.bak 's|<a href="/" class="logo">|<a href="../../../../../index.html" class="logo">|g' "$file"
            
            # Fix relative paths between Hosea pages (they stay the same - same directory)
            # No change needed for: href="structure.html", href="theology.html", etc.
            
            # Clean up backup files
            rm -f "$file.bak"
            
            print_success "Fixed $filename"
        fi
    done
else
    print_warning "Hosea directory not found at $HOSEA_DIR"
fi

# ============================================
# STEP 3: Fix Evolution of Satan Links
# ============================================
print_status "Fixing navigation links in Evolution of Satan..."

SATAN_FILE="studies/thematic/evolution-of-satan/satan-evolution.html"

if [ -f "$SATAN_FILE" ]; then
    # Fix path to root index.html (3 levels up)
    sed -i.bak 's|href="../../index.html"|href="../../../index.html"|g' "$SATAN_FILE"
    sed -i.bak 's|href="../../about.html"|href="../../../about.html"|g' "$SATAN_FILE"
    
    # Fix path to Project Context logo/home
    sed -i.bak 's|<a href="/" class="logo">|<a href="../../../index.html" class="logo">|g' "$SATAN_FILE"
    
    # Clean up backup files
    rm -f "$SATAN_FILE.bak"
    
    print_success "Fixed satan-evolution.html"
else
    print_warning "Evolution of Satan file not found at $SATAN_FILE"
fi

# ============================================
# STEP 4: Fix Main index.html Links
# ============================================
print_status "Fixing links in main index.html..."

if [ -f "index.html" ]; then
    # Update Hosea study link
    sed -i.bak 's|href="/studies/tanakh/neviim/minor-prophets/hosea/"|href="/studies/tanakh/neviim/minor-prophets/hosea/hosea.html"|g' index.html
    sed -i.bak 's|href="studies/tanakh/neviim/minor-prophets/hosea/"|href="studies/tanakh/neviim/minor-prophets/hosea/hosea.html"|g' index.html
    
    # Update Evolution of Satan link
    sed -i.bak 's|href="/studies/thematic/evolution-of-satan/"|href="/studies/thematic/evolution-of-satan/satan-evolution.html"|g' index.html
    sed -i.bak 's|href="studies/thematic/evolution-of-satan/"|href="studies/thematic/evolution-of-satan/satan-evolution.html"|g' index.html
    
    # Ensure dropdown menu links are correct
    sed -i.bak 's|href="/studies/tanakh/"|href="studies/tanakh/"|g' index.html
    sed -i.bak 's|href="/studies/characters/"|href="studies/characters/"|g' index.html
    sed -i.bak 's|href="/studies/women/"|href="studies/women/"|g' index.html
    sed -i.bak 's|href="/studies/thematic/"|href="studies/thematic/"|g' index.html
    
    # Clean up backup files
    rm -f index.html.bak
    
    print_success "Fixed main index.html"
else
    print_warning "Main index.html not found"
fi

# ============================================
# STEP 5: Create Missing Directories
# ============================================
print_status "Creating placeholder directories for future content..."

directories=(
    "studies/characters/genesis"
    "studies/characters/exodus"
    "studies/characters/judges"
    "studies/women"
    "studies/tanakh/torah"
    "studies/tanakh/ketuvim"
    "studies/tanakh/neviim/former-prophets"
    "studies/tanakh/neviim/major-prophets"
)

for dir in "${directories[@]}"; do
    if mkdir -p "$dir" 2>/dev/null; then
        print_success "Created directory: $dir"
    else
        print_status "Directory already exists: $dir"
    fi
done

# ============================================
# STEP 6: Verify Critical Links
# ============================================
print_status "Verifying critical navigation links..."

# Check if Hosea main file has correct navigation
if [ -f "$HOSEA_DIR/hosea.html" ]; then
    if grep -q 'href="../../../../../index.html"' "$HOSEA_DIR/hosea.html"; then
        print_success "✓ Hosea navigation links look correct"
    else
        print_warning "⚠ Hosea navigation might need manual review"
    fi
fi

# Check if Satan evolution has correct navigation
if [ -f "$SATAN_FILE" ]; then
    if grep -q 'href="../../../index.html"' "$SATAN_FILE"; then
        print_success "✓ Satan evolution navigation links look correct"
    else
        print_warning "⚠ Satan evolution navigation might need manual review"
    fi
fi

# ============================================
# STEP 7: Summary Report
# ============================================
echo ""
print_success "Navigation link fixes complete!"
echo ""
print_status "Summary of changes:"
echo "  • Hosea files: Updated to 5 levels deep (../../../../../)"
echo "  • Satan evolution: Updated to 3 levels deep (../../../)"
echo "  • Main index.html: Updated with full paths to studies"
echo "  • Created missing directories for future content"
echo ""
print_status "Directory structure:"
echo "  studies/"
echo "  ├── tanakh/"
echo "  │   ├── neviim/"
echo "  │   │   └── minor-prophets/"
echo "  │   │       └── hosea/ (5 levels from root)"
echo "  │   ├── torah/"
echo "  │   └── ketuvim/"
echo "  ├── thematic/"
echo "  │   └── evolution-of-satan/ (3 levels from root)"
echo "  ├── characters/"
echo "  └── women/"
echo ""
print_warning "Please test the following:"
echo "  1. Open index.html and click on Hosea study link"
echo "  2. Open index.html and click on Evolution of Satan link"
echo "  3. From Hosea page, click logo to return home"
echo "  4. From Satan page, click logo to return home"
echo ""
print_status "If everything works, commit changes:"
echo "  git add ."
echo "  git commit -m \"Fix: Update all navigation links for new directory structure\""
echo "  git push"
echo ""
print_warning "Backup saved in: $BACKUP_DIR"
print_warning "To restore if needed: cp -r $BACKUP_DIR/* ."