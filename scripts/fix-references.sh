#!/bin/bash
# Fix all path references to new data/ structure
# Run AFTER moving directories in Phase 1

set -e

echo "Fixing path references in BAM source files..."

# Count files before
TOTAL_FILES=$(find src -name "*.md" | wc -l)
echo "Processing $TOTAL_FILES markdown files..."

# Fix relative paths (bam/templates/ → {project-root}/_bmad/bam/data/templates/)
echo "Step 1: Fixing bam/templates/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|`bam/templates/|`{project-root}/_bmad/bam/data/templates/|g' \
  -e 's|bam/templates/|{project-root}/_bmad/bam/data/templates/|g' \
  {} \;

# Fix relative paths (bam/checklists/ → {project-root}/_bmad/bam/data/checklists/)
echo "Step 2: Fixing bam/checklists/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|`bam/checklists/|`{project-root}/_bmad/bam/data/checklists/|g' \
  -e 's|bam/checklists/|{project-root}/_bmad/bam/data/checklists/|g' \
  {} \;

# Fix relative paths (bam/extensions/ → {project-root}/_bmad/bam/data/extensions/)
echo "Step 3: Fixing bam/extensions/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|`bam/extensions/|`{project-root}/_bmad/bam/data/extensions/|g' \
  -e 's|bam/extensions/|{project-root}/_bmad/bam/data/extensions/|g' \
  {} \;

# Fix already-absolute paths that used old structure
echo "Step 4: Fixing _bmad/bam/templates/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|_bmad/bam/templates/|_bmad/bam/data/templates/|g' \
  {} \;

echo "Step 5: Fixing _bmad/bam/checklists/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|_bmad/bam/checklists/|_bmad/bam/data/checklists/|g' \
  {} \;

echo "Step 6: Fixing _bmad/bam/extensions/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|_bmad/bam/extensions/|_bmad/bam/data/extensions/|g' \
  {} \;

# Also fix YAML files in extensions
echo "Step 7: Fixing YAML extension files..."
find src/data/extensions -name "*.yaml" -exec sed -i \
  -e 's|bam/templates/|{project-root}/_bmad/bam/data/templates/|g' \
  -e 's|bam/checklists/|{project-root}/_bmad/bam/data/checklists/|g' \
  -e 's|bam/extensions/|{project-root}/_bmad/bam/data/extensions/|g' \
  -e 's|_bmad/bam/templates/|_bmad/bam/data/templates/|g' \
  -e 's|_bmad/bam/checklists/|_bmad/bam/data/checklists/|g' \
  -e 's|_bmad/bam/extensions/|_bmad/bam/data/extensions/|g' \
  {} \;

# Fix bam/knowledge/ references (old pattern → new agent-guides pattern)
echo "Step 8: Fixing bam/knowledge/ references..."
find src -name "*.md" -exec sed -i \
  -e 's|`bam/knowledge/|`{project-root}/_bmad/bam/data/agent-guides/bam/|g' \
  -e 's|: bam/knowledge/|: {project-root}/_bmad/bam/data/agent-guides/bam/|g' \
  {} \;

# Fix bam/data/ references missing {project-root}/_bmad/ prefix
echo "Step 9: Fixing bam/data/ references missing prefix..."
find src -name "*.md" -exec sed -i \
  -e 's|`bam/data/|`{project-root}/_bmad/bam/data/|g' \
  -e 's|: bam/data/|: {project-root}/_bmad/bam/data/|g' \
  {} \;

# Fix docs folder too
echo "Step 10: Fixing docs/ folder references..."
find docs -name "*.md" -exec sed -i \
  -e 's|`bam/templates/|`{project-root}/_bmad/bam/data/templates/|g' \
  -e 's|`bam/checklists/|`{project-root}/_bmad/bam/data/checklists/|g' \
  -e 's|`bam/knowledge/|`{project-root}/_bmad/bam/data/agent-guides/bam/|g' \
  -e 's|`bam/data/|`{project-root}/_bmad/bam/data/|g' \
  {} \;

echo ""
echo "Path references fixed successfully!"
echo "All templates, checklists, extensions, and knowledge refs now reference _bmad/bam/data/"
