#!/bin/bash
# BAM Customize Files Installation Script
#
# Copies BAM customize files to the correct BMAD location.
# BMAD looks for customize files in _bmad/_config/agents/, not module-specific directories.
#
# Usage: ./scripts/install-customize-files.sh [bmad_root]
#   bmad_root: Path to _bmad directory (default: _bmad)
#
# This script should be run after BAM installation to enable extension loading.

BMAD_ROOT="${1:-_bmad}"
SCRIPT_DIR="$(dirname "$0")"
SOURCE_DIR="$SCRIPT_DIR/../src/_config/agents"
TARGET_DIR="$BMAD_ROOT/_config/agents"

echo "BAM Customize Files Installer"
echo "=============================="
echo ""

# Verify source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "ERROR: Source directory not found: $SOURCE_DIR"
    echo "Run 'npm run generate-customize' first to generate customize files."
    exit 1
fi

# Count source files
SOURCE_COUNT=$(ls "$SOURCE_DIR"/*.customize.yaml 2>/dev/null | wc -l)
if [ "$SOURCE_COUNT" -eq 0 ]; then
    echo "ERROR: No customize files found in $SOURCE_DIR"
    echo "Run 'npm run generate-customize' first to generate customize files."
    exit 1
fi

echo "Source: $SOURCE_DIR ($SOURCE_COUNT files)"
echo "Target: $TARGET_DIR"
echo ""

# Create target directory if needed
mkdir -p "$TARGET_DIR"

# Copy customize files
echo "Copying customize files..."
for file in "$SOURCE_DIR"/*.customize.yaml; do
    filename=$(basename "$file")
    cp "$file" "$TARGET_DIR/$filename"
    echo "  + $filename"
done

# Verify installation
TARGET_COUNT=$(ls "$TARGET_DIR"/*.customize.yaml 2>/dev/null | wc -l)

echo ""
echo "Installation complete!"
echo "  Customize files installed: $TARGET_COUNT"
echo ""
echo "The following agents now have BAM extensions:"
ls "$TARGET_DIR"/*.customize.yaml 2>/dev/null | while read f; do
    basename "$f" .customize.yaml
done
