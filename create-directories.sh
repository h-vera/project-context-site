#!/bin/bash

# create-directories.sh
# Create Missing Project Context Website Directories
# Run this script from the root of your project (project-context-site/)
# 
# Usage:
#   ./create-directories.sh --dry-run  # See what would be created
#   ./create-directories.sh             # Actually create directories

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check for dry-run flag
DRY_RUN=false
if [[ "$1" == "--dry-run" ]] || [[ "$1" == "-n" ]]; then
    DRY_RUN=true
    echo -e "${YELLOW}🔍 DRY RUN MODE - No directories will be created${NC}"
    echo -e "${YELLOW}Showing what would be created...${NC}\n"
else
    echo -e "${GREEN}📁 Creating Project Context directory structure...${NC}"
    echo -e "${BLUE}Note: Using 'mkdir -p' - will only create directories that don't exist${NC}\n"
fi

# Function to create directory or show what would be created
create_dir() {
    local dir=$1
    if [ -d "$dir" ]; then
        if $DRY_RUN; then
            echo -e "${GREEN}✓${NC} Exists: $dir"
        fi
    else
        if $DRY_RUN; then
            echo -e "${YELLOW}→ Would create:${NC} $dir"
        else
            mkdir -p "$dir"
            echo -e "${GREEN}✓ Created:${NC} $dir"
        fi
    fi
}

# Counter for statistics
EXISTING=0
TO_CREATE=0

# Function to create directory and count
create_and_count() {
    local dir=$1
    if [ -d "$dir" ]; then
        ((EXISTING++))
    else
        ((TO_CREATE++))
    fi
    create_dir "$dir"
}

echo -e "${BLUE}═══ TANAKH STUDY DIRECTORIES ═══${NC}\n"

# Torah (Pentateuch)
echo "📖 Torah/Pentateuch:"
create_and_count "studies/tanakh/torah/genesis"
create_and_count "studies/tanakh/torah/exodus"
create_and_count "studies/tanakh/torah/leviticus"
create_and_count "studies/tanakh/torah/numbers"
create_and_count "studies/tanakh/torah/deuteronomy"
echo ""

# Former Prophets
echo "📜 Former Prophets:"
create_and_count "studies/tanakh/neviim/former-prophets/joshua"
create_and_count "studies/tanakh/neviim/former-prophets/judges"
create_and_count "studies/tanakh/neviim/former-prophets/samuel"
create_and_count "studies/tanakh/neviim/former-prophets/kings"
echo ""

# Major Prophets
echo "📯 Major Prophets:"
create_and_count "studies/tanakh/neviim/major-prophets/isaiah"
create_and_count "studies/tanakh/neviim/major-prophets/jeremiah"
create_and_count "studies/tanakh/neviim/major-prophets/ezekiel"
echo ""

# Minor Prophets
echo "📋 Minor Prophets:"
create_and_count "studies/tanakh/neviim/minor-prophets/hosea"
create_and_count "studies/tanakh/neviim/minor-prophets/joel"
create_and_count "studies/tanakh/neviim/minor-prophets/amos"
create_and_count "studies/tanakh/neviim/minor-prophets/obadiah"
create_and_count "studies/tanakh/neviim/minor-prophets/jonah"
create_and_count "studies/tanakh/neviim/minor-prophets/micah"
create_and_count "studies/tanakh/neviim/minor-prophets/nahum"
create_and_count "studies/tanakh/neviim/minor-prophets/habakkuk"
create_and_count "studies/tanakh/neviim/minor-prophets/zephaniah"
create_and_count "studies/tanakh/neviim/minor-prophets/haggai"
create_and_count "studies/tanakh/neviim/minor-prophets/zechariah"
create_and_count "studies/tanakh/neviim/minor-prophets/malachi"
echo ""

# Ketuvim (Writings)
echo "📚 Ketuvim/Writings:"
create_and_count "studies/tanakh/ketuvim/psalms"
create_and_count "studies/tanakh/ketuvim/proverbs"
create_and_count "studies/tanakh/ketuvim/job"
create_and_count "studies/tanakh/ketuvim/song-of-songs"
create_and_count "studies/tanakh/ketuvim/ruth"
create_and_count "studies/tanakh/ketuvim/lamentations"
create_and_count "studies/tanakh/ketuvim/ecclesiastes"
create_and_count "studies/tanakh/ketuvim/esther"
create_and_count "studies/tanakh/ketuvim/daniel"
create_and_count "studies/tanakh/ketuvim/ezra-nehemiah"
create_and_count "studies/tanakh/ketuvim/chronicles"
echo ""

echo -e "${BLUE}═══ CHARACTER PROFILE DIRECTORIES ═══${NC}\n"

# Character directories by book (Old Testament only)
echo "👥 Character Directories - Torah:"
create_and_count "studies/characters/genesis"
create_and_count "studies/characters/genesis/abraham"
create_and_count "studies/characters/exodus"
create_and_count "studies/characters/exodus/moses"
create_and_count "studies/characters/leviticus"
create_and_count "studies/characters/numbers"
create_and_count "studies/characters/deuteronomy"
echo ""

echo "👥 Character Directories - Historical Books:"
create_and_count "studies/characters/joshua"
create_and_count "studies/characters/judges"
create_and_count "studies/characters/judges/deborah"
create_and_count "studies/characters/ruth"
create_and_count "studies/characters/samuel"
create_and_count "studies/characters/kings"
create_and_count "studies/characters/chronicles"
create_and_count "studies/characters/ezra"
create_and_count "studies/characters/nehemiah"
create_and_count "studies/characters/esther"
echo ""

echo "👥 Character Directories - Wisdom Literature:"
create_and_count "studies/characters/job"
create_and_count "studies/characters/psalms"
create_and_count "studies/characters/proverbs"
create_and_count "studies/characters/ecclesiastes"
create_and_count "studies/characters/song-of-songs"
echo ""

echo "👥 Character Directories - Major Prophets:"
create_and_count "studies/characters/isaiah"
create_and_count "studies/characters/jeremiah"
create_and_count "studies/characters/lamentations"
create_and_count "studies/characters/ezekiel"
create_and_count "studies/characters/daniel"
echo ""

echo "👥 Character Directories - Minor Prophets:"
create_and_count "studies/characters/hosea"
create_and_count "studies/characters/joel"
create_and_count "studies/characters/amos"
create_and_count "studies/characters/obadiah"
create_and_count "studies/characters/jonah"
create_and_count "studies/characters/micah"
create_and_count "studies/characters/nahum"
create_and_count "studies/characters/habakkuk"
create_and_count "studies/characters/zephaniah"
create_and_count "studies/characters/haggai"
create_and_count "studies/characters/zechariah"
create_and_count "studies/characters/malachi"
echo ""

echo -e "${BLUE}═══ OTHER DIRECTORIES ═══${NC}\n"

echo "📂 Women's Hub:"
create_and_count "studies/women"
echo ""

echo "🎨 Thematic Studies:"
create_and_count "studies/thematic"
create_and_count "studies/thematic/evolution-of-satan"
echo ""

echo "🎨 Assets:"
create_and_count "assets/css"
create_and_count "assets/js"
create_and_count "assets/images/logos"
create_and_count "assets/images/icons"
echo ""

echo "📝 Templates:"
create_and_count "templates"
echo ""

# Summary
echo -e "${BLUE}═══ SUMMARY ═══${NC}\n"
echo -e "${GREEN}✓ Directories already existing:${NC} $EXISTING"
if $DRY_RUN; then
    echo -e "${YELLOW}→ Directories to be created:${NC} $TO_CREATE"
    echo ""
    echo -e "${YELLOW}To actually create these directories, run:${NC}"
    echo -e "${BLUE}  ./create-directories.sh${NC}"
else
    echo -e "${GREEN}✓ Directories created:${NC} $TO_CREATE"
    echo ""
    echo -e "${GREEN}✅ Directory structure complete!${NC}"
fi