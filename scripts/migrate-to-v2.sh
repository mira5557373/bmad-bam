#!/bin/bash
set -e

echo "=== BAM v1 → v2 Migration ==="

SOURCE_DIR="src"
TARGET_DIR="src-v2"
BACKUP_DIR="src.v1.backup"

# Pre-flight
if [ ! -d "$TARGET_DIR" ]; then
  echo "✗ Target v2 directory not found"
  exit 1
fi

if [ -d "$BACKUP_DIR" ]; then
  echo "⚠ Backup exists. Remove and retry."
  exit 1
fi

# Backup
echo "Creating backup..."
cp -r "$SOURCE_DIR" "$BACKUP_DIR"
echo "✓ Backup: $BACKUP_DIR"

# Verify v2
TOML_COUNT=$(ls -1 "$TARGET_DIR/customize/"*.toml 2>/dev/null | wc -l)
WORKFLOW_COUNT=$(ls -1d "$TARGET_DIR/skills/bmad-bam-"*/ 2>/dev/null | wc -l)

echo "TOML files: $TOML_COUNT (expected: 8)"
echo "Workflows: $WORKFLOW_COUNT (expected: 30)"

if [ "$TOML_COUNT" -lt 8 ] || [ "$WORKFLOW_COUNT" -lt 30 ]; then
  echo "✗ v2 incomplete"
  exit 1
fi

# Activate
rm -rf "$SOURCE_DIR"
mv "$TARGET_DIR" "$SOURCE_DIR"
echo "✓ v2 activated"

echo "=== Migration Complete ==="
echo "Rollback: ./scripts/rollback-to-v1.sh"
