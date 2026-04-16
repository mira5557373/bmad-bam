#!/bin/bash
# BAM Post-Installation Script
# Ensures BAM components are correctly installed:
# 1. Data directory (agent-guides, templates, checklists, extensions, CSVs)
# 2. Customize files copied to _bmad/_config/agents/ (CRITICAL for extension loading)

BMAD_DIR="${1:-_bmad/bam}"
SCRIPT_DIR="$(dirname "$0")"
SOURCE_DIR="$SCRIPT_DIR/../src"

# Derive the root _bmad directory
BMAD_ROOT=$(dirname "$BMAD_DIR")

echo "BAM Post-Install Script"
echo "========================"
echo "BAM Module: $BMAD_DIR"
echo "BMAD Root:  $BMAD_ROOT"
echo "Source:     $SOURCE_DIR"
echo ""

# Check if data directory already exists and has content
if [ -d "$BMAD_DIR/data/agent-guides" ] && [ -d "$BMAD_DIR/data/templates" ]; then
    GUIDE_COUNT=$(ls "$BMAD_DIR/data/agent-guides/bam/" 2>/dev/null | wc -l)
    if [ "$GUIDE_COUNT" -gt 150 ]; then
        echo "BAM data already installed ($GUIDE_COUNT agent guides found)."
        echo "Run with --force to reinstall data."
        [ "$2" != "--force" ] && DATA_SKIP=1
    fi
fi

# Create target directories if needed
mkdir -p "$BMAD_DIR"
mkdir -p "$BMAD_ROOT/_config/agents"

# Step 1: Copy BAM data directory (if not skipped)
if [ -z "$DATA_SKIP" ]; then
    echo "Copying BAM data directory..."
    cp -r "$SOURCE_DIR/data" "$BMAD_DIR/"
fi

# Step 2: Copy customize files to correct location (CRITICAL)
# BMAD looks for customize files in _bmad/_config/agents/, not _bmad/bam/_config/agents/
echo ""
echo "Installing customize files to _bmad/_config/agents/..."
if [ -d "$SOURCE_DIR/_config/agents" ]; then
    cp "$SOURCE_DIR/_config/agents/"*.customize.yaml "$BMAD_ROOT/_config/agents/" 2>/dev/null
    CUSTOMIZE_COUNT=$(ls "$BMAD_ROOT/_config/agents/"*.customize.yaml 2>/dev/null | wc -l)
    echo "  Copied $CUSTOMIZE_COUNT customize files"
else
    echo "  WARNING: No customize files found in source"
fi

echo ""
echo "Installation verification:"
echo "  Agent guides:    $(ls "$BMAD_DIR/data/agent-guides/bam/" 2>/dev/null | wc -l) files"
echo "  Templates:       $(ls "$BMAD_DIR/data/templates/" 2>/dev/null | wc -l) files"
echo "  Checklists:      $(ls "$BMAD_DIR/data/checklists/" 2>/dev/null | wc -l) files"
echo "  Extensions:      $(ls "$BMAD_DIR/data/extensions/" 2>/dev/null | wc -l) files"
echo "  CSVs:            $(ls "$BMAD_DIR/data/"*.csv 2>/dev/null | wc -l) files"
echo "  Customize files: $(ls "$BMAD_ROOT/_config/agents/"*.customize.yaml 2>/dev/null | wc -l) files (in _bmad/_config/agents/)"
echo ""
echo "BAM Post-Install: Complete"
