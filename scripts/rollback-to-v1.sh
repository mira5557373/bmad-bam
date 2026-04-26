#!/bin/bash
set -e

echo "=== Rollback to v1 ==="

BACKUP_DIR="src.v1.backup"
SOURCE_DIR="src"

if [ ! -d "$BACKUP_DIR" ]; then
  echo "✗ No backup found"
  exit 1
fi

rm -rf "$SOURCE_DIR"
mv "$BACKUP_DIR" "$SOURCE_DIR"
echo "✓ v1 restored"
