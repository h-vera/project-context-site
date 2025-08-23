#!/bin/bash

# update_womens_hub.sh
# Script to add Jephthah's Daughter to the Women's Bible Hub

echo "Updating Women's Bible Hub with Jephthah's Daughter profile..."

# Set the file path (adjust if needed)
HUB_FILE="studies/women/women-bible-hub.html"

# Check if the file exists
if [ ! -f "$HUB_FILE" ]; then
    echo "Error: $HUB_FILE not found!"
    echo "Please ensure you're running this script from the correct directory."
    exit 1
fi

# Create a backup
cp "$HUB_FILE" "${HUB_FILE}.backup-$(date +%Y%m%d-%H%M%S)"
echo "✓ Backup created"

# 1. Update the women count for Judges (from 4 to 5)
echo "Updating Judges women count..."
sed -i 's/<tr data-book="judges">.*/<tr data-book="judges">/' "$HUB_FILE"
sed -i '/<tr data-book="judges">/,/<\/tr>/{
    s/<td>4<\/td>/<td>5<\/td>/
}' "$HUB_FILE"
echo "✓ Women count updated from 4 to 5"

# 2. Add Jephthah's Daughter to the judges data
echo "Adding Jephthah's Daughter to Judges data..."

# Create the new entry
JEPHTHAHS_DAUGHTER_ENTRY='                    {
                        "id": "jephthahs-daughter",
                        "type": "unnamed",
                        "display": "Jephthah'\''s Daughter",
                        "script": {
                            "lang": "hebrew",
                            "text": "בַּת־יִפְתָּח",
                            "translit": "Bat-Yiphtach"
                        },
                        "meaning": "Daughter of Jephthah",
                        "references": ["Judg 11:29-40"],
                        "summary": "Unnamed tragic figure whose story epitomizes Israel'\''s moral collapse during the judges period. The only child of judge Jephthah, she becomes victim of her father'\''s rash vow, demonstrating remarkable faithfulness amid horrific consequences of Israel'\''s Canaanization.",
                        "tags": ["Unnamed", "Tragic Figure", "Sacrifice", "Faithful Daughter"],
                        "order_in_book": 5
                    }'

# Find the end of the Judges entries and add the new entry
# We'll add it after Delilah (order_in_book: 4)
awk -v entry="$JEPHTHAHS_DAUGHTER_ENTRY" '
    /"order_in_book": 4/ && /judges/ {
        print
        getline
        if ($0 ~ /}/) {
            print $0 ","
            print entry
            next
        }
    }
    {print}
' "$HUB_FILE" > "${HUB_FILE}.tmp" && mv "${HUB_FILE}.tmp" "$HUB_FILE"

echo "✓ Jephthah's Daughter entry added to Judges data"

# 3. Rename the profile file if it exists with underscore
PROFILE_DIR="studies/characters/judges"
if [ -f "${PROFILE_DIR}/jephthah_daughter.html" ]; then
    echo "Renaming profile file from underscore to hyphen..."
    mv "${PROFILE_DIR}/jephthah_daughter.html" "${PROFILE_DIR}/jephthahs-daughter.html"
    echo "✓ Profile file renamed to jephthahs-daughter.html"
elif [ -f "${PROFILE_DIR}/jephthahs-daughter.html" ]; then
    echo "✓ Profile file already has correct naming (jephthahs-daughter.html)"
else
    echo "⚠ Warning: Could not find profile file in ${PROFILE_DIR}"
    echo "  Please ensure the profile exists at: ${PROFILE_DIR}/jephthahs-daughter.html"
fi

# 4. Verify the changes
echo ""
echo "Verification:"
echo "-------------"

# Check if the count was updated
if grep -q '<tr data-book="judges">.*<td>5</td>' "$HUB_FILE"; then
    echo "✓ Judges women count shows 5"
else
    echo "✗ Warning: Judges women count may not be updated correctly"
fi

# Check if Jephthah's Daughter was added
if grep -q '"id": "jephthahs-daughter"' "$HUB_FILE"; then
    echo "✓ Jephthah's Daughter entry found in data"
else
    echo "✗ Warning: Jephthah's Daughter entry may not be added correctly"
fi

echo ""
echo "Update complete!"
echo "Backup saved as: ${HUB_FILE}.backup-$(date +%Y%m%d-%H%M%S)"
echo ""
echo "Please test the hub page to ensure everything displays correctly."
echo "If there are issues, you can restore from the backup."