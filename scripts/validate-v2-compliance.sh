#!/bin/bash
# Validate V2 BMAD compliance

echo "=== V2 BMAD Compliance Validation ==="
echo ""

PASS=0
FAIL=0

check() {
  local desc="$1"
  local expected="$2"
  local actual="$3"

  if [ "$actual" -eq "$expected" ]; then
    echo "✓ $desc: $actual (expected $expected)"
    PASS=$((PASS + 1))
  else
    echo "✗ $desc: $actual (expected $expected)"
    FAIL=$((FAIL + 1))
  fi
}

# File counts
echo "--- File Counts ---"
check "Workflows" 30 $(ls -d src-v2/skills/bmad-bam-*/ 2>/dev/null | wc -l)
check "Step files" 300 $(find src-v2/skills -name "step-*.md" | wc -l)
check "SKILL.md files" 30 $(ls src-v2/skills/*/SKILL.md 2>/dev/null | wc -l)
check "customize.toml files" 30 $(ls src-v2/skills/*/customize.toml 2>/dev/null | wc -l)
check "module-help.csv rows" 31 $(wc -l < src-v2/module-help.csv 2>/dev/null || echo 0)

echo ""
echo "--- Section Compliance ---"
check "SKILL.md with On Activation" 30 $(grep -l "## On Activation" src-v2/skills/*/SKILL.md 2>/dev/null | wc -l)
check "customize.toml with activation_steps" 30 $(grep -l "activation_steps_prepend" src-v2/skills/*/customize.toml 2>/dev/null | wc -l)
check "Steps with SUCCESS METRICS" 300 $(grep -l "SUCCESS METRICS" src-v2/skills/*/steps/*.md 2>/dev/null | wc -l)
check "Steps with MANDATORY RULES" 300 $(grep -l "MANDATORY EXECUTION RULES" src-v2/skills/*/steps/*.md 2>/dev/null | wc -l)

echo ""
echo "--- Data Files ---"
check "Domain files" 16 $(ls src-v2/data/domains/*.md 2>/dev/null | wc -l)
check "Persona files" 3 $(ls src-v2/data/personas/*.md 2>/dev/null | wc -l)
check "Pattern files" 10 $(ls src-v2/data/patterns/*.md 2>/dev/null | wc -l)
check "Checklist files" 29 $(ls src-v2/data/checklists/*.md 2>/dev/null | wc -l)
check "Template files" 40 $(ls src-v2/data/templates/*.md 2>/dev/null | wc -l)

echo ""
echo "=== Summary ==="
echo "Passed: $PASS"
echo "Failed: $FAIL"

if [ "$FAIL" -eq 0 ]; then
  echo ""
  echo "✓ V2 BMAD COMPLIANCE: PASS"
  exit 0
else
  echo ""
  echo "✗ V2 BMAD COMPLIANCE: FAIL"
  exit 1
fi
