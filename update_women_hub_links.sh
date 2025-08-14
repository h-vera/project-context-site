#!/bin/bash

# update_women_hub_links.sh
# Script to fix the links in the Women in the Bible hub page

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# File to update
HUB_FILE="studies/women/women-bible-hub.html"

echo -e "${YELLOW}Starting Women in the Bible Hub Link Update...${NC}"

# Check if the file exists
if [ ! -f "$HUB_FILE" ]; then
    echo -e "${RED}Error: $HUB_FILE not found!${NC}"
    echo "Please run this script from your project root directory."
    exit 1
fi

# Create a backup
BACKUP_FILE="${HUB_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
cp "$HUB_FILE" "$BACKUP_FILE"
echo -e "${GREEN}✓ Created backup: $BACKUP_FILE${NC}"

# Create a temporary file for the modifications
TEMP_FILE=$(mktemp)

# Read the file and process it
awk '
BEGIN {
    in_script = 0
    found_create_tile = 0
    inserted_mapping = 0
}

# Detect when we are in the script section
/<script>/ { in_script = 1 }
/<\/script>/ { in_script = 0 }

# Insert the book name mapping before createTile function
in_script && /function createTile\(entry, bookId\)/ && !inserted_mapping {
    print "        // Map Hebrew book names to English for file paths"
    print "        const bookNameMap = {"
    print "            '\''breishit'\'': '\''genesis'\'',"
    print "            '\''shmot'\'': '\''exodus'\'',"
    print "            '\''vayikra'\'': '\''leviticus'\'',"
    print "            '\''bmidbar'\'': '\''numbers'\'',"
    print "            '\''dvarim'\'': '\''deuteronomy'\'',"
    print "            '\''yehoshua'\'': '\''joshua'\'',"
    print "            '\''shoftim'\'': '\''judges'\'',"
    print "            '\''shmuel'\'': '\''samuel'\'',"
    print "            '\''mlakhim'\'': '\''kings'\'',"
    print "            '\''yeshayahu'\'': '\''isaiah'\'',"
    print "            '\''yirmiyahu'\'': '\''jeremiah'\'',"
    print "            '\''yechezkel'\'': '\''ezekiel'\'',"
    print "            '\''hoshea'\'': '\''hosea'\'',"
    print "            '\''yoel'\'': '\''joel'\'',"
    print "            '\''amos'\'': '\''amos'\'',"
    print "            '\''ovadiah'\'': '\''obadiah'\'',"
    print "            '\''yonah'\'': '\''jonah'\'',"
    print "            '\''mikhah'\'': '\''micah'\'',"
    print "            '\''nachum'\'': '\''nahum'\'',"
    print "            '\''chavakuk'\'': '\''habakkuk'\'',"
    print "            '\''tzfanyah'\'': '\''zephaniah'\'',"
    print "            '\''chaggai'\'': '\''haggai'\'',"
    print "            '\''zkharyah'\'': '\''zechariah'\'',"
    print "            '\''malakhi'\'': '\''malachi'\'',"
    print "            '\''thillim'\'': '\''psalms'\'',"
    print "            '\''mishlei'\'': '\''proverbs'\'',"
    print "            '\''iyov'\'': '\''job'\'',"
    print "            '\''shir-hashirim'\'': '\''song-of-songs'\'',"
    print "            '\''rut'\'': '\''ruth'\'',"
    print "            '\''eikhah'\'': '\''lamentations'\'',"
    print "            '\''kohelet'\'': '\''ecclesiastes'\'',"
    print "            '\''ester'\'': '\''esther'\'',"
    print "            '\''daniel'\'': '\''daniel'\'',"
    print "            '\''ezra'\'': '\''ezra'\'',"
    print "            '\''nechemyah'\'': '\''nehemiah'\'',"
    print "            '\''divrei-hayamim'\'': '\''chronicles'\''"
    print "        };"
    print ""
    inserted_mapping = 1
    found_create_tile = 1
}

# Replace the href line in createTile function
in_script && found_create_tile && /const href = / {
    print "            // Convert Hebrew book name to English"
    print "            const englishBookName = bookNameMap[bookId] || bookId;"
    print "            "
    print "            // Generate the correct href based on your file structure"
    print "            const href = `/studies/characters/${englishBookName}/${toSlug(entry.id)}.html`;"
    next
}

# Print all other lines as-is
{ print }
' "$HUB_FILE" > "$TEMP_FILE"

# Replace the original file with the modified version
mv "$TEMP_FILE" "$HUB_FILE"

echo -e "${GREEN}✓ Updated createTile function with correct link structure${NC}"

# Verify the changes
if grep -q "bookNameMap" "$HUB_FILE"; then
    echo -e "${GREEN}✓ Book name mapping successfully added${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Book name mapping might not have been added correctly${NC}"
fi

if grep -q '/studies/characters/\${englishBookName}' "$HUB_FILE"; then
    echo -e "${GREEN}✓ Link structure successfully updated${NC}"
else
    echo -e "${YELLOW}⚠ Warning: Link structure might not have been updated correctly${NC}"
fi

# Optional: Create a diff file to show what changed
DIFF_FILE="women_hub_changes.diff"
diff -u "$BACKUP_FILE" "$HUB_FILE" > "$DIFF_FILE" 2>/dev/null || true

if [ -s "$DIFF_FILE" ]; then
    echo -e "${GREEN}✓ Changes saved to $DIFF_FILE${NC}"
    echo ""
    echo -e "${YELLOW}Summary of changes:${NC}"
    grep -E "^\+[^+]|^-[^-]" "$DIFF_FILE" | head -20
    echo "..."
else
    echo -e "${RED}No changes were made to the file${NC}"
    rm "$DIFF_FILE"
fi

echo ""
echo -e "${GREEN}✅ Update complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Review the changes in $HUB_FILE"
echo "2. Test the links in your browser"
echo "3. If everything works, you can delete the backup: $BACKUP_FILE"
echo "4. If there are issues, restore from backup: mv $BACKUP_FILE $HUB_FILE"

# Optional: Ask if user wants to see the diff
echo ""
read -p "Would you like to see the full diff? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if [ -s "$DIFF_FILE" ]; then
        less "$DIFF_FILE"
    else
        echo "No changes to show."
    fi
fi