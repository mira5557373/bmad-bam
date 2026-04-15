#!/bin/bash
# Verify BAM installation completeness

BMAD_DIR="${1:-_bmad/bam}"
ERRORS=0

check_count() {
    local path="$1"
    local expected="$2"
    local name="$3"
    local actual=$(ls "$path" 2>/dev/null | wc -l)
    if [ "$actual" -lt "$expected" ]; then
        echo "  [FAIL] $name: Expected $expected+, found $actual"
        ERRORS=$((ERRORS + 1))
    else
        echo "  [PASS] $name: $actual files"
    fi
}

check_file() {
    local path="$1"
    local name="$2"
    if [ -f "$path" ]; then
        echo "  [PASS] $name exists"
    else
        echo "  [FAIL] $name missing"
        ERRORS=$((ERRORS + 1))
    fi
}

echo "============================================"
echo "BAM Installation Verification"
echo "============================================"
echo "Target: $BMAD_DIR"
echo ""

echo "Module Files:"
check_file "$BMAD_DIR/config.yaml" "config.yaml"
check_file "$BMAD_DIR/module-help.csv" "module-help.csv"
echo ""

echo "Data Directory Contents:"
check_count "$BMAD_DIR/data/agent-guides/bam" 180 "Agent guides"
check_count "$BMAD_DIR/data/templates" 400 "Templates"
check_count "$BMAD_DIR/data/checklists" 30 "Checklists"
check_count "$BMAD_DIR/data/extensions" 25 "Extensions"
echo ""

echo "Pattern Registry CSVs:"
for csv in bam-patterns.csv tenant-models.csv ai-runtimes.csv quality-gates.csv compliance-frameworks.csv section-pattern-map.csv; do
    check_file "$BMAD_DIR/data/$csv" "$csv"
done
echo ""

if [ $ERRORS -gt 0 ]; then
    echo "============================================"
    echo "RESULT: INCOMPLETE ($ERRORS issues found)"
    echo "============================================"
    echo ""
    echo "To fix, run:"
    echo "  ./scripts/post-install.sh $BMAD_DIR"
    exit 1
else
    echo "============================================"
    echo "RESULT: BAM installation verified successfully"
    echo "============================================"
fi
