#!/bin/bash
# BAM Post-Installation Fallback Script
# Only needed if BMB doesn't copy data/ directory correctly

BMAD_DIR="${1:-_bmad/bam}"
SCRIPT_DIR="$(dirname "$0")"
SOURCE_DIR="$SCRIPT_DIR/../src"

echo "BAM Post-Install Script"
echo "========================"
echo "Target: $BMAD_DIR"
echo "Source: $SOURCE_DIR"
echo ""

# Check if data directory already exists and has content
if [ -d "$BMAD_DIR/data/agent-guides" ] && [ -d "$BMAD_DIR/data/templates" ]; then
    GUIDE_COUNT=$(ls "$BMAD_DIR/data/agent-guides/bam/" 2>/dev/null | wc -l)
    if [ "$GUIDE_COUNT" -gt 150 ]; then
        echo "BAM data already installed ($GUIDE_COUNT agent guides found)."
        echo "Run with --force to reinstall."
        [ "$2" != "--force" ] && exit 0
    fi
fi

# Create target directory if needed
mkdir -p "$BMAD_DIR"

echo "Copying BAM data directory..."
cp -r "$SOURCE_DIR/data" "$BMAD_DIR/"

echo ""
echo "Installation verification:"
echo "  Agent guides: $(ls "$BMAD_DIR/data/agent-guides/bam/" 2>/dev/null | wc -l) files"
echo "  Templates:    $(ls "$BMAD_DIR/data/templates/" 2>/dev/null | wc -l) files"
echo "  Checklists:   $(ls "$BMAD_DIR/data/checklists/" 2>/dev/null | wc -l) files"
echo "  Extensions:   $(ls "$BMAD_DIR/data/extensions/" 2>/dev/null | wc -l) files"
echo ""
echo "BAM Post-Install: Complete"
