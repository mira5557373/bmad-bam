#!/usr/bin/env bash
# Smoke test for bmad-bam-design-tenant-migration-tooling.

set -euo pipefail
SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-tenant-migration-tooling"

# 1. Required files
REQUIRED=("SKILL.md" "bmad-skill-manifest.yaml" "customize.toml" "workflow.md" "templates/migration-runbook.md.template")
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
grep -q "^name: bmad-bam-design-tenant-migration-tooling$" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md name mismatch"; exit 1; }
grep -q "^description:" "$SKILL_DIR/SKILL.md" || { echo "FAIL: SKILL.md missing description"; exit 1; }
echo "    [valid] SKILL.md frontmatter"

# 4. Manifest
python3 -c "
import yaml
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform'
assert m['persona'] == 'atlas'
assert m['cluster'] == 'lifecycle'
assert m['latency_budget'] == '90min'
# Gates: BOTH QG-D1 (primary) and QG-M2 (mirror)
gates = set(m['gates'])
assert gates == {'QG-D1', 'QG-M2'}, f'gates must be {{QG-D1, QG-M2}}; got {gates}'
# Inputs: 3 required (tier-model, deployment-topology, tenancy-decision) + 2 soft (onboarding-flow, offboarding-policy)
required_inputs = [i['artifact'] for i in m['inputs'] if i.get('required', False)]
soft_inputs = [i['artifact'] for i in m['inputs'] if not i.get('required', True)]
for art in ['tier-model.json', 'deployment-topology.json', 'tenancy-decision.json']:
    assert art in required_inputs, f'{art} must be required'
for art in ['onboarding-flow.json', 'offboarding-policy.json']:
    assert art in soft_inputs, f'{art} must be soft (required: false)'
# Outputs: 5 required — md + 2x json (QG-D1 + QG-M2 mirror) + 2 evidence narratives
outs = m['outputs']
out_arts = [(o['artifact'], o['location']) for o in outs]
# .md narrative
assert ('migration-runbook.md', '{project-root}/docs/architecture/') in out_arts, 'missing docs migration-runbook.md'
# .json at QG-D1 (primary)
assert ('migration-runbook.json', '{project-root}/_bmad/bam/evidence/QG-D1/') in out_arts, 'missing QG-D1 migration-runbook.json'
# .json at QG-M2 (mirror)
assert ('migration-runbook.json', '{project-root}/_bmad/bam/evidence/QG-M2/') in out_arts, 'missing QG-M2 migration-runbook.json mirror'
# Evidence narratives
assert ('QG-D1-migration-evidence.md', '{project-root}/_bmad/bam/evidence/QG-D1/') in out_arts, 'missing QG-D1 evidence narrative'
assert ('QG-M2-migration-evidence-mirror.md', '{project-root}/_bmad/bam/evidence/QG-M2/') in out_arts, 'missing QG-M2 mirror evidence narrative'
# Flag: --migration-axis enum [tier, region, both] default both
flag = next((f for f in m.get('flags', []) if f['name'] == '--migration-axis'), None)
assert flag is not None, 'missing --migration-axis flag'
assert flag['type'] == 'enum'
assert set(flag['values']) == {'tier', 'region', 'both'}
assert flag['default'] == 'both'
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

# 7. step-07-v has gate_id: QG-D1 (primary)
grep -q "^gate_id: QG-D1$" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07-v missing gate_id: QG-D1"; exit 1; }
echo "    [valid] step-07-v has gate_id: QG-D1 (primary)"

# 8. Template has placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/migration-runbook.md.template" || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 9. step-01 enforces --migration-axis enum (3 values: tier, region, both)
for v in tier region both; do
    grep -q "$v" "$SKILL_DIR/steps/step-01-c-elicit-context.md" || { echo "FAIL: step-01 missing --migration-axis value '$v'"; exit 1; }
done
echo "    [valid] step-01 enforces --migration-axis enum (3 values: tier, region, both)"

# 10. step-02 covers both axis playbook templates
grep -q "tier-axis\|Tier-axis" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing tier-axis templates"; exit 1; }
grep -q "region-axis\|Region-axis" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing region-axis templates"; exit 1; }
echo "    [valid] step-02 covers both tier-axis + region-axis playbook templates"

# 11. step-02 covers all 4 rollback methods (closed enum)
for rm in blue_green_flip canary_revert cell_failback dual_write_revert; do
    grep -q "$rm" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing rollback_method '$rm'"; exit 1; }
done
echo "    [valid] step-02 covers 4 rollback methods"

# 12. step-02 covers all 3 cohort selection methods (closed enum)
for csm in rollout_tier_hint_driven risk_stratified explicit; do
    grep -q "$csm" "$SKILL_DIR/steps/step-02-c-load-options.md" || { echo "FAIL: step-02 missing cohort_selection_method '$csm'"; exit 1; }
done
echo "    [valid] step-02 covers 3 cohort selection methods"

# 13. step-05 emits to 3 locations (docs + QG-D1 + QG-M2 mirror)
grep -q "docs/architecture/migration-runbook.md" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing docs/architecture/.md target"; exit 1; }
grep -q "_bmad/bam/evidence/QG-D1/migration-runbook.json" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing QG-D1/.json (primary) target"; exit 1; }
grep -q "_bmad/bam/evidence/QG-M2/migration-runbook.json" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing QG-M2/.json (mirror) target"; exit 1; }
echo "    [valid] step-05 emits to 3 locations (docs + QG-D1 primary + QG-M2 mirror)"

# 14. step-05 mentions byte-identical mirror (sha/hash compare)
grep -qE "byte-identical|hash|cmp|sha256" "$SKILL_DIR/steps/step-05-c-write-design.md" || { echo "FAIL: step-05 missing byte-identical mirror enforcement"; exit 1; }
echo "    [valid] step-05 enforces byte-identical mirror"

# 15. step-07 verifies migration_axes non-empty + subset {tier, region}
grep -q "migration_axes" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing migration_axes check"; exit 1; }
grep -qE 'migration_axes.*\[\]|len\(axes\)|axes.*non-empty|axes.*empty' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing migration_axes non-empty check"; exit 1; }
echo "    [valid] step-07 verifies migration_axes non-empty + subset"

# 16. step-07 verifies per_axis keys EXACTLY match migration_axes
grep -q "per_axis_keys" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing per_axis keys check"; exit 1; }
echo "    [valid] step-07 verifies per_axis keys match migration_axes"

# 17. step-07 verifies all 5 sub-fields per active axis
for sf in cohort_plan dry_run_plan rollback_gate abort_criteria observability_hooks; do
    grep -q "$sf" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing sub-field check '$sf'"; exit 1; }
done
echo "    [valid] step-07 verifies all 5 sub-fields per axis"

# 18. step-07 enforces invariant 12: zero_downtime_required: true ⇒ no axis uses cell_failback
grep -q "INVARIANT 12\|invariant 12" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing invariant 12 reference"; exit 1; }
grep -q "cell_failback" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing cell_failback check"; exit 1; }
grep -qE "zero_downtime_required.*cell_failback|cell_failback.*zero_downtime" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing zero_downtime ⇒ no cell_failback check"; exit 1; }
echo "    [valid] step-07 enforces invariant 12 (zero_downtime ⇒ no cell_failback)"

# 19. step-07 verifies cohorts[] non-empty (ERROR if empty)
grep -qE 'cohorts.*\[\]|cohorts.*non-empty|len\(cohorts\)' "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing cohorts non-empty check"; exit 1; }
echo "    [valid] step-07 verifies cohorts[] non-empty"

# 20. step-07 verifies references_degraded boolean + consistency
grep -q "references_degraded" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing references_degraded check"; exit 1; }
grep -qE "references_degraded.*bool|isinstance.*ref_deg.*bool" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing references_degraded boolean check"; exit 1; }
echo "    [valid] step-07 verifies references_degraded boolean + consistency"

# 21. step-07 verifies QG-D1 and QG-M2 JSON files are byte-identical (mirror semantics)
grep -qE "sha256|byte-identical|h_primary.*h_mirror|hashlib" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing byte-identical mirror check"; exit 1; }
echo "    [valid] step-07 verifies QG-D1/QG-M2 mirror byte-identical"

# 22. step-07 enforces risk_stratified ⇒ first cohort size 1 (canary)
grep -qE "risk_stratified.*1|canary.*1.*tenant" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing risk_stratified canary-1 check"; exit 1; }
echo "    [valid] step-07 enforces risk_stratified ⇒ 1-tenant canary first"

# 23. step-07 emits BOTH QG-D1-migration-evidence.md (primary) AND QG-M2-migration-evidence-mirror.md (mirror)
grep -q "QG-D1-migration-evidence.md" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing QG-D1 primary evidence narrative"; exit 1; }
grep -q "QG-M2-migration-evidence-mirror.md" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" || { echo "FAIL: step-07 missing QG-M2 mirror evidence narrative"; exit 1; }
echo "    [valid] step-07 emits BOTH primary (QG-D1) + mirror (QG-M2) evidence narratives"

# 24. workflow.md documents --migration-axis flag + 3 values
grep -q "migration-axis" "$SKILL_DIR/workflow.md" || { echo "FAIL: workflow.md missing --migration-axis flag"; exit 1; }
for v in tier region both; do
    grep -q "$v" "$SKILL_DIR/workflow.md" || { echo "FAIL: workflow.md missing --migration-axis value '$v'"; exit 1; }
done
echo "    [valid] workflow.md documents --migration-axis flag"

echo ">>> PASS: smoke test"
