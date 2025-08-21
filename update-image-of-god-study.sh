#!/bin/bash

# Image of God Study Updater - Bash Version
# 
# Usage: ./update-image-of-god-study.sh
# or: bash update-image-of-god-study.sh
#
# Features:
# - Adds canonical links to all study pages
# - Adds reduced motion accessibility CSS
# - Standardizes navigation links
# - Creates backup before changes
# - Cross-platform compatibility (macOS/Linux/WSL)

set -e  # Exit on any error

# ========================
# CONFIGURATION
# ========================

BASE_URL="https://project-context.org"
STUDY_DIR="studies/thematic/image-of-god"
BACKUP_SUFFIX=$(date +%Y%m%d-%H%M%S)
BACKUP_DIR="${STUDY_DIR}-backup-${BACKUP_SUFFIX}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Page definitions: filename|canonical_path pairs
PAGES=(
    "image-of-god.html|/studies/thematic/image-of-god/"
    "overview.html|/studies/thematic/image-of-god/overview.html"
    "genesis-1-2.html|/studies/thematic/image-of-god/genesis-1-2.html"
    "ane-background.html|/studies/thematic/image-of-god/ane-background.html"
    "royal-priest-prophet.html|/studies/thematic/image-of-god/royal-priest-prophet.html"
    "male-female-one-image.html|/studies/thematic/image-of-god/male-female-one-image.html"
    "literary-design.html|/studies/thematic/image-of-god/literary-design.html"
    "hebrew-wordplay.html|/studies/thematic/image-of-god/hebrew-wordplay.html"
    "nt-trajectory.html|/studies/thematic/image-of-god/nt-trajectory.html"
    "bibliography.html|/studies/thematic/image-of-god/bibliography.html"
)

# ========================
# UTILITY FUNCTIONS
# ========================

log_info() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')] 🔄 $1${NC}"
}

log_success() {
    echo -e "${GREEN}[$(date '+%H:%M:%S')] ✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}[$(date '+%H:%M:%S')] ⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}[$(date '+%H:%M:%S')] ❌ $1${NC}"
}

log_note() {
    echo -e "[$(date '+%H:%M:%S')] 📝 $1"
}

# Check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Get file size (cross-platform)
get_file_size() {
    if command_exists stat; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            stat -f%z "$1" 2>/dev/null || echo "0"
        else
            # Linux
            stat -c%s "$1" 2>/dev/null || echo "0"
        fi
    else
        # Fallback using wc
        wc -c < "$1" 2>/dev/null || echo "0"
    fi
}

# ========================
# VALIDATION FUNCTIONS
# ========================

validate_environment() {
    local issues=()
    
    # Check if study directory exists
    if [ ! -d "$STUDY_DIR" ]; then
        issues+=("Study directory not found: $STUDY_DIR")
    fi
    
    # Check for required commands
    if ! command_exists sed; then
        issues+=("'sed' command not found (required for text processing)")
    fi
    
    if ! command_exists cp; then
        issues+=("'cp' command not found (required for backup)")
    fi
    
    # Check if files exist
    for page_entry in "${PAGES[@]}"; do
        local filename="${page_entry%%|*}"
        if [ ! -f "$STUDY_DIR/$filename" ]; then
            issues+=("File not found: $STUDY_DIR/$filename")
        fi
    done
    
    if [ ${#issues[@]} -gt 0 ]; then
        log_error "Environment validation failed:"
        for issue in "${issues[@]}"; do
            log_error "  • $issue"
        done
        return 1
    fi
    
    return 0
}

# ========================
# BACKUP FUNCTIONS
# ========================

create_backup() {
    log_info "Creating backup..."
    
    if [ -d "$BACKUP_DIR" ]; then
        log_warning "Backup directory already exists: $BACKUP_DIR"
        return 0
    fi
    
    if cp -r "$STUDY_DIR" "$BACKUP_DIR"; then
        log_success "Backup created: $(pwd)/$BACKUP_DIR"
        return 0
    else
        log_error "Failed to create backup"
        return 1
    fi
}

# ========================
# UPDATE FUNCTIONS
# ========================

add_canonical_link() {
    local file="$1"
    local canonical_url="$2"
    local canonical_link="  <link rel=\"canonical\" href=\"${BASE_URL}${canonical_url}\">"
    
    # Check if canonical link already exists
    if grep -q 'rel="canonical"' "$file"; then
        log_note "    Canonical link already exists"
        return 1
    fi
    
    # Find </head> and insert canonical link before it
    if grep -q '</head>' "$file"; then
        # Use different sed syntax for macOS vs Linux
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed
            sed -i '' "s|</head>|${canonical_link}\\
</head>|" "$file"
        else
            # Linux sed
            sed -i "s|</head>|${canonical_link}\\n</head>|" "$file"
        fi
        return 0
    else
        log_warning "    Could not find </head> tag"
        return 1
    fi
}

add_reduced_motion_css() {
    local file="$1"
    
    # Check if reduced motion CSS already exists
    if grep -q 'prefers-reduced-motion' "$file"; then
        log_note "    Reduced motion CSS already exists"
        return 1
    fi
    
    # Create the CSS block
    local reduced_motion_css="
    /* Accessibility: Reduced Motion */
    @media (prefers-reduced-motion: reduce) {
      html { scroll-behavior: auto; }
      .animate-on-scroll,
      .nav-card,
      .vocation-card,
      .timeline-item,
      .comparison-card,
      .application-card,
      .concept-item,
      .theological-card,
      .mandate-card,
      .culture-card,
      .reception-item,
      .source-entry { 
        transition: none !important; 
        transform: none !important; 
        animation: none !important;
      }
    }"
    
    # Find </style> and insert CSS before it
    if grep -q '</style>' "$file"; then
        # Use different sed syntax for macOS vs Linux
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS sed - use a temporary file approach for complex multiline
            local temp_file=$(mktemp)
            awk -v css="$reduced_motion_css" '
                /<\/style>/ { print css; print; next }
                { print }
            ' "$file" > "$temp_file" && mv "$temp_file" "$file"
        else
            # Linux sed
            sed -i "s|</style>|${reduced_motion_css}\\n</style>|" "$file"
        fi
        return 0
    else
        log_warning "    Could not find </style> tag"
        return 1
    fi
}

standardize_navigation() {
    local file="$1"
    local changes=0
    
    # Fix hub links - look for image-of-god.html and make them absolute
    if grep -q 'href="[^"]*image-of-god\.html"' "$file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' 's|href="[^"]*image-of-god\.html"|href="/studies/thematic/image-of-god/image-of-god.html"|g' "$file"
        else
            sed -i 's|href="[^"]*image-of-god\.html"|href="/studies/thematic/image-of-god/image-of-god.html"|g' "$file"
        fi
        changes=$((changes + 1))
    fi
    
    # Fix logo links
    if grep -q 'class="logo"[^>]*href="[^"]*image-of-god' "$file"; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' 's|\(class="logo"[^>]*href="\)[^"]*image-of-god[^"]*\(>\)|\1/studies/thematic/image-of-god/image-of-god.html\2|g' "$file"
        else
            sed -i 's|\(class="logo"[^>]*href="\)[^"]*image-of-god[^"]*\(>\)|\1/studies/thematic/image-of-god/image-of-god.html\2|g' "$file"
        fi
        changes=$((changes + 1))
    fi
    
    if [ $changes -gt 0 ]; then
        log_note "    Updated navigation links"
        return 0
    else
        return 1
    fi
}

# ========================
# MAIN PROCESSING
# ========================

process_file() {
    local filename="$1"
    local canonical_path="$2"
    local filepath="$STUDY_DIR/$filename"
    local changes=()
    
    log_info "Processing: $filepath"
    
    # Get original file size
    local original_size=$(get_file_size "$filepath")
    
    # 1. Add canonical link
    if add_canonical_link "$filepath" "$canonical_path"; then
        changes+=("canonical link")
    fi
    
    # 2. Add reduced motion CSS
    if add_reduced_motion_css "$filepath"; then
        changes+=("reduced motion CSS")
    fi
    
    # 3. Standardize navigation
    if standardize_navigation "$filepath"; then
        changes+=("navigation links")
    fi
    
    # Report results
    if [ ${#changes[@]} -gt 0 ]; then
        local new_size=$(get_file_size "$filepath")
        local change_list=$(IFS=', '; echo "${changes[*]}")
        log_success "  Updated: $change_list | Size: $original_size → $new_size bytes"
        return 0
    else
        log_note "  No changes needed for $filename"
        return 1
    fi
}

show_header() {
    echo
    echo "============================================================"
    echo "📚 IMAGE OF GOD STUDY UPDATER (Bash Version)"
    echo "============================================================"
    echo "📁 Study Directory: $(pwd)/$STUDY_DIR"
    echo "🌐 Base URL: $BASE_URL"
    echo "📄 Pages to process: ${#PAGES[@]}"
    echo
    echo "🔧 Updates to apply:"
    echo "   • Add canonical links for SEO"
    echo "   • Add reduced motion CSS for accessibility"
    echo "   • Standardize navigation links"
    echo
    echo "⚠️  A backup will be created before making changes"
    echo "============================================================"
    echo
}

show_summary() {
    local total_files=${#PAGES[@]}
    local files_changed=$1
    local files_processed=$2
    
    echo
    echo "============================================================"
    echo "📊 UPDATE SUMMARY"
    echo "============================================================"
    echo "✅ Files processed successfully: $files_processed/$total_files"
    echo "🔧 Files with changes: $files_changed"
    
    if [ $files_changed -gt 0 ]; then
        echo
        echo "📝 Manual updates still needed:"
        echo "   1. Add Tough Texts sidebar to male-female-one-image.html"
        echo "   2. Verify BibleProject sources in bibliography.html"
        echo "   3. Test all pages load correctly"
        echo
        echo "   See the manual updates guide for details."
    fi
    
    echo
    echo "🎉 Automated updates complete!"
    echo "============================================================"
    echo
}

# ========================
# MAIN EXECUTION
# ========================

main() {
    show_header
    
    # Validate environment
    log_info "Validating environment..."
    if ! validate_environment; then
        log_error "Environment validation failed. Please fix the issues above."
        exit 1
    fi
    log_success "Environment validation passed"
    
    # Create backup
    if ! create_backup; then
        log_error "Failed to create backup. Aborting for safety."
        exit 1
    fi
    
    # Process files
    log_info "Starting file processing..."
    echo
    
    local files_changed=0
    local files_processed=0
    
    for page_entry in "${PAGES[@]}"; do
        local filename="${page_entry%%|*}"
        local canonical_path="${page_entry##*|}"
        
        if process_file "$filename" "$canonical_path"; then
            files_changed=$((files_changed + 1))
        fi
        files_processed=$((files_processed + 1))
    done
    
    # Show summary
    show_summary $files_changed $files_processed
    
    # Success
    exit 0
}

# Make sure we're in the right directory context
if [ ! -d "$STUDY_DIR" ] && [ -d "../$STUDY_DIR" ]; then
    log_info "Moving up one directory to find study files..."
    cd ..
fi

# Run main function
main "$@"