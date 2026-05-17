#!/usr/bin/env bash
# Smoke test for bmad-bam-design-tenant-offboarding.

set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-tenant-offboarding"

# 1. Required files
REQUIRED=("SKILL.md" "bmad-skill-manifest.yaml" "customize.toml" "workflow.md" "templates/offboarding-policy.md.template")
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
grep -q "^name: bmad-bam-design-tenant-offboarding$" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md name mismatch"; exit 1; }
grep -q "^description:" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md missing description"; exit 1; }
echo "    [valid] SKILL.md frontmatter"

# 4. Manifest
python3 -c "
import yaml
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform'
assert m['persona'] == 'atlas'
assert m['cluster'] == 'lifecycle'
assert m['latency_budget'] == '75min'
assert 'QG-M2' in m['gates']
# Flag check
flag = next((f for f in m.get('flags', []) if f['name'] == '--regulatory-profile'), None)
assert flag is not None, 'missing --regulatory-profile flag'
assert flag['type'] == 'enum'
assert set(flag['values']) == {'gdpr_baseline', 'hipaa', 'sox_or_pci', 'none'}
assert flag['default'] == 'gdpr_baseline'
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
grep -q "{{.*}}" "$SKILL_DIR/templates/offboarding-policy.md.template" || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 9. step-01 enforces --regulatory-profile enum (4 values)
for v in gdpr_baseline hipaa sox_or_pci none; do
    grep -q "$v" "$SKILL_DIR/steps/step-01-c-elicit-context.md" || { echo "FAIL: step-01 missing regulatory_profile value '$v'"; exit 1; }
done
echo "    [valid] step-01 enforces --regulatory-profile enum (4 values)"

# 10. step-02 documents 3 deletion modes + profile pre-fill table
for mode in hard_delete soft_delete anonymize; do
    grep -q "$mode" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing deletion_mode '$mode'"; exit 1; }
done
echo "    [valid] step-02 documents 3 deletion modes"

# 11. step-05 emits to docs/architecture/ (.md) + _bmad/bam/evidence/QG-M2/ (.json)
grep -q "docs/architecture/offboarding-policy.md" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing docs/architecture/.md target"; exit 1; }
grep -q "_bmad/bam/evidence/QG-M2/offboarding-policy.json" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing QG-M2/.json target"; exit 1; }
echo "    [valid] step-05 emits to 2 locations (docs/.md + QG-M2/.json)"

# 12. step-07 enforces data_export_required + subject_erasure_fast_path as mandatory true
grep -q "data_export_required" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing data_export_required check"; exit 1; }
grep -q "subject_erasure_fast_path" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing subject_erasure_fast_path check"; exit 1; }
echo "    [valid] step-07 enforces data_export_required + subject_erasure_fast_path mandatory-true"

# 13. step-07 verifies policy_id format <tier>:<mode>
grep -qE 'policy_id.*tier_id.*deletion_mode|<tier_id>:<deletion_mode>' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing policy_id format check"; exit 1; }
echo "    [valid] step-07 verifies policy_id format <tier_id>:<deletion_mode>"

# 14. step-07 verifies tear_down_hooks[] presence (uniqueness check)
grep -q "tear_down_hook" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing tear_down_hooks check"; exit 1; }
echo "    [valid] step-07 verifies tear_down_hooks[]"

# 15. step-07 covers retention_window_source enum including legal_hold
grep -q "legal_hold" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing legal_hold retention source"; exit 1; }
echo "    [valid] step-07 retention_window_source enum includes legal_hold"

# 16. step-07 enforces regulatory retention floor (hipaa 2190, sox_or_pci 2555)
grep -q "2190" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing HIPAA floor 2190"; exit 1; }
grep -q "2555" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing SOX/PCI floor 2555"; exit 1; }
echo "    [valid] step-07 enforces regulatory retention floors"

# 17. step-07 outputs QG-M2-offboarding-evidence.md
grep -q "QG-M2-offboarding-evidence.md" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing evidence narrative output"; exit 1; }
echo "    [valid] step-07 emits QG-M2-offboarding-evidence.md (D2)"

echo ">>> PASS: smoke test"
