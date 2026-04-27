#!/bin/bash
# V1 to V2 Checklist Consolidation Verification Script

echo "=== V1 Baseline ==="
V1_COUNT=$(ls src/data/checklists/*.md 2>/dev/null | grep -v README | wc -l)
V1_CRITICAL=$(grep -c "CRITICAL" src/data/checklists/*.md 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
echo "V1 files: $V1_COUNT"
echo "V1 CRITICAL items: $V1_CRITICAL"

echo ""
echo "=== V2 Current State ==="
V2_COUNT=$(ls src-v2/data/checklists/*.md 2>/dev/null | wc -l)
V2_CRITICAL=$(grep -c "CRITICAL" src-v2/data/checklists/*.md 2>/dev/null | awk -F: '{sum+=$2} END {print sum}')
echo "V2 files: $V2_COUNT (target: 29)"
echo "V2 CRITICAL items: $V2_CRITICAL"

echo ""
echo "=== Reference Check ==="
echo "Checking V2 step file references..."
MISSING=0
for ref in $(grep -roh "checklists/[a-z0-9_-]*\.md" src-v2/skills/ 2>/dev/null | sort -u); do
  file="src-v2/data/$ref"
  if [ ! -f "$file" ]; then
    echo "  MISSING: $ref"
    MISSING=$((MISSING + 1))
  fi
done
echo "Missing references: $MISSING"

echo ""
echo "=== YAML Frontmatter Check ==="
NO_FRONTMATTER=0
for f in src-v2/data/checklists/*.md; do
  if ! head -1 "$f" 2>/dev/null | grep -q "^---"; then
    echo "  NO FRONTMATTER: $(basename $f)"
    NO_FRONTMATTER=$((NO_FRONTMATTER + 1))
  fi
done
echo "Files without frontmatter: $NO_FRONTMATTER"

echo ""
echo "=== Summary ==="
[ "$V2_COUNT" -eq 29 ] && echo "✓ File count: PASS" || echo "✗ File count: FAIL ($V2_COUNT/29)"
[ "$V2_CRITICAL" -ge "$V1_CRITICAL" ] && echo "✓ CRITICAL preserved: PASS" || echo "✗ CRITICAL preserved: FAIL ($V2_CRITICAL < $V1_CRITICAL)"
[ "$MISSING" -eq 0 ] && echo "✓ References: PASS" || echo "✗ References: FAIL ($MISSING missing)"
[ "$NO_FRONTMATTER" -eq 0 ] && echo "✓ Frontmatter: PASS" || echo "✗ Frontmatter: FAIL ($NO_FRONTMATTER missing)"
