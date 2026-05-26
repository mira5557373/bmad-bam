#!/usr/bin/env bash
# Smoke test for bmad-bam-design-tenant-onboarding.

set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-tenant-onboarding"

# 1. Required files
REQUIRED=("SKILL.md" "bmad-skill-manifest.yaml" "customize.toml" "workflow.md" "templates/onboarding-flow.md.template")
for f in "${REQUIRED[@]}"; do
    [ -f "$SKILL_DIR/$f" ] || { echo "FAIL: missing $f"; exit 1; }
    echo "    [present] $f"
done

# 2. Step files (7 steps)
for n in 01 02 03 04 05 06 07; do
    matches=$(ls "$SKILL_DIR/steps/step-$n-"* 2>/dev/null | wc -l)
    [ "$matches" -ge 1 ] || { echo "FAIL: missing step-$n-*"; exit 1; }
    echo "    [present] steps/step-$n-*"
done

# 3. SKILL.md frontmatter
grep -q "^name: bmad-bam-design-tenant-onboarding$" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md name mismatch"; exit 1; }
grep -q "^description:" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md missing description"; exit 1; }
echo "    [valid] SKILL.md frontmatter"

# 4. Manifest
python3 -c "
import yaml
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform'
assert m['persona'] == 'atlas'
assert m['cluster'] == 'lifecycle'
assert m['latency_budget'] == '60min'
assert 'QG-M2' in m['gates']
print(f'    [valid] manifest: {m[\"name\"]}')
"

# 5. customize.toml uses [workflow] + universal-glob
python3 -c "
import tomllib
c = tomllib.load(open('$SKILL_DIR/customize.toml','rb'))
assert 'workflow' in c
pf = c['workflow'].get('persistent_facts', [])
assert any('**' in p and 'project-context.md' in p for p in pf)
print('    [valid] customize.toml [workflow] + universal-glob')
"

# 6. Step file frontmatter
for step in "$SKILL_DIR"/steps/step-*.md; do
    python3 -c "
import yaml, sys
parts = open(sys.argv[1]).read().split('---', 2)
fm = yaml.safe_load(parts[1])
for k in ['step_id', 'auto_runnable', 'gate']:
    assert k in fm, f'{sys.argv[1]} missing {k}'
" "$step"
done
echo "    [valid] all step files have required frontmatter"

# 7. step-07-v has gate_id (D1)
grep -q "^gate_id: QG-M2$" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07-v missing gate_id: QG-M2"; exit 1; }
echo "    [valid] step-07-v has gate_id: QG-M2"

# 8. Template has placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/onboarding-flow.md.template" || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 9. step-05 documents live_traffic + isolation_verification_step
if grep -q "live_traffic" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "isolation_verification_step" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 documents live_traffic + isolation_verification_step"
else
    echo "    [INVALID] step-05 missing live_traffic or isolation_verification_step"; exit 1
fi

# 10. step-07 enforces blocking == true when live_traffic == true
grep -q "live_traffic" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing live_traffic check"; exit 1; }
echo "    [valid] step-07 enforces live_traffic/blocking constraint"

# 11. step-07 outputs QG-M2-onboarding-evidence.md
grep -q "QG-M2-onboarding-evidence.md" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing evidence narrative output"; exit 1; }
echo "    [valid] step-07 emits QG-M2-onboarding-evidence.md (D2)"

echo ">>> PASS: smoke test"
