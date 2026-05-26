#!/usr/bin/env bash
# Smoke test for bmad-bam-design-multi-tenant-testing.

set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-multi-tenant-testing"

# 1. Required files
REQUIRED=("SKILL.md" "bmad-skill-manifest.yaml" "customize.toml" "workflow.md" "templates/test-catalogue.md.template")
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
grep -q "^name: bmad-bam-design-multi-tenant-testing$" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md name mismatch"; exit 1; }
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
# Inputs: 1 required (tenancy-decision), 1 soft (tier-model)
required_inputs = [i['artifact'] for i in m['inputs'] if i.get('required', False)]
soft_inputs = [i['artifact'] for i in m['inputs'] if not i.get('required', True)]
assert 'tenancy-decision.json' in required_inputs, 'tenancy-decision.json must be required'
assert 'tier-model.json' in soft_inputs, 'tier-model.json must be soft (required: false)'
# Outputs: 3 required
outs = [o['artifact'] for o in m['outputs']]
for art in ['test-catalogue.md', 'test-catalogue.json', 'QG-M2-test-catalogue-evidence.md']:
    assert art in outs, f'output missing: {art}'
# Flags: none
assert m.get('flags', []) == [], 'flags must be empty per spec §2.3'
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
grep -q "{{.*}}" "$SKILL_DIR/templates/test-catalogue.md.template" || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 9. step-01 has hybrid_resolution branch (spec §5.6.1 (a))
grep -q "hybrid_resolution" "$SKILL_DIR/steps/step-01-c-elicit-context.md" || { echo "FAIL: step-01 missing hybrid_resolution branch"; exit 1; }
echo "    [valid] step-01 has hybrid_resolution branch"

# 10. step-02 covers 5 categories (closed enum)
for cat in isolation noisy-neighbor quota rls-bypass cross-tenant-cache; do
    grep -q "$cat" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing category '$cat'"; exit 1; }
done
echo "    [valid] step-02 covers 5 categories"

# 11. step-05 emits universal field (spec §5.6.1 (b))
grep -q "universal" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing universal field"; exit 1; }
echo "    [valid] step-05 emits universal field"

# 12. step-05 emits to docs/architecture/ (.md) + _bmad/bam/evidence/QG-M2/ (.json)
grep -q "docs/architecture/test-catalogue.md" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing docs/architecture/.md target"; exit 1; }
grep -q "_bmad/bam/evidence/QG-M2/test-catalogue.json" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing QG-M2/.json target"; exit 1; }
echo "    [valid] step-05 emits to 2 locations (docs/.md + QG-M2/.json)"

# 13. step-07 verifies ≥1 test with category:isolation AND universal:true (spec §5.6.1 (c) + A5)
grep -q "universal_isolation_count" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing universal_isolation count check"; exit 1; }
grep -qE "category.*isolation.*universal.*true|universal.*isolation" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing C1/A5 universal-isolation invariant"; exit 1; }
echo "    [valid] step-07 verifies ≥1 universal isolation test (C1/A5)"

# 14. step-07 verifies traceable_to pattern (spec §5.6.1 (d))
grep -q 'QG-\[A-Z\]' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing traceable_to pattern check"; exit 1; }
echo "    [valid] step-07 verifies traceable_to pattern"

# 15. step-07 verifies tests[] non-empty
grep -q 'tests: \[\]\|len(tests)' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing tests[] non-empty check"; exit 1; }
echo "    [valid] step-07 verifies tests[] non-empty"

# 16. step-07 verifies evidence_signature length >= 20
grep -q "len(esig)\|evidence_signature.*20\|>= 20" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing evidence_signature length check"; exit 1; }
echo "    [valid] step-07 verifies evidence_signature length >= 20"

# 17. step-07 verifies hybrid_resolution completeness when applicable
grep -q "hybrid_resolution" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing hybrid_resolution check"; exit 1; }
echo "    [valid] step-07 verifies hybrid_resolution completeness"

# 18. step-07 verifies coverage_report counts match tests[] filter
grep -q "coverage_report\[cat" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || \
grep -q "coverage_report.*declared.*actual" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing coverage_report consistency check"; exit 1; }
echo "    [valid] step-07 verifies coverage_report counts match tests[]"

# 19. step-07 outputs QG-M2-test-catalogue-evidence.md
grep -q "QG-M2-test-catalogue-evidence.md" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing evidence narrative output"; exit 1; }
echo "    [valid] step-07 emits QG-M2-test-catalogue-evidence.md"

# 20. cross-tenant-cache deferral check (must_have: 0 + note about P5 ai)
grep -q 'P5\|model-cache-isolation' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing P5 ai deferral note check for cross-tenant-cache"; exit 1; }
echo "    [valid] step-07 verifies cross-tenant-cache P5 ai deferral"

# 21. BMM overlay (spec §5.6.1 (e)): 1 overlay customize.toml exists + parses + uses [workflow] + specific-path
overlay_toml="$SKILL_DIR/customize-template/bmad-qa-generate-e2e-tests/customize.toml"
[ -f "$overlay_toml" ] || { echo "FAIL: overlay missing at $overlay_toml"; exit 1; }
python3 -c "
import tomllib
with open('$overlay_toml','rb') as f:
    c = tomllib.load(f)
assert 'workflow' in c, 'overlay must use [workflow] namespace (BMM workflow-skill target)'
asa = c['workflow'].get('activation_steps_append', [])
assert isinstance(asa, list) and all(isinstance(s, str) and s for s in asa), 'activation_steps_append must be non-empty strings'
assert any('test-catalogue.json' in s or 'multi-tenant' in s for s in asa), 'overlay must inject BAM multi-tenant context'
pf = c['workflow'].get('persistent_facts', [])
assert any('_bmad-output/bbp/project-context.md' in p for p in pf), 'overlay must use specific path per ADR-015 G6'
assert not any('**' in p for p in pf), 'overlay persistent_facts MUST NOT use universal-glob'
print('    [valid] overlay parses + injects BAM context + uses [workflow] + specific-path')
"

# 22. BMM overlay header pins to v6.6.0
grep -q "v6.6.0\|6.6.0" "$overlay_toml" || { echo "FAIL: overlay missing BMM v6.6.0 pin comment"; exit 1; }
echo "    [valid] overlay pinned to BMM v6.6.0"

# 23. Deferred overlay NOT created (R3.2.6: bmad-design-test-strategy)
[ ! -d "$SKILL_DIR/customize-template/bmad-design-test-strategy" ] || { echo "FAIL: bmad-design-test-strategy overlay must NOT exist (R3.2.6 deferred)"; exit 1; }
echo "    [valid] bmad-design-test-strategy overlay correctly deferred (R3.2.6)"

echo ">>> PASS: smoke test"
