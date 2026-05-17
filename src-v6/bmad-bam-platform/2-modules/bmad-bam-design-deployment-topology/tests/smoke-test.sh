#!/usr/bin/env bash
# Smoke test for bmad-bam-design-deployment-topology workflow.
# Verifies the skill's machinery: file presence, manifest validity, step
# frontmatter, template placeholders, required-input enforcement, and
# schema coverage in the verify step.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ">>> smoke-test: bmad-bam-design-deployment-topology"

# 1. Required files present
REQUIRED=(
    "SKILL.md"
    "bmad-skill-manifest.yaml"
    "customize.toml"
    "workflow.md"
    "templates/deployment-topology.md.template"
)
for f in "${REQUIRED[@]}"; do
    [ -f "$SKILL_DIR/$f" ] || { echo "FAIL: missing $f"; exit 1; }
    echo "    [present] $f"
done

# 2. Step files present (7 steps)
for n in 01 02 03 04 05 06 07; do
    matches=$(ls "$SKILL_DIR/steps/step-$n-"* 2>/dev/null | wc -l)
    [ "$matches" -ge 1 ] || { echo "FAIL: missing step-$n-*"; exit 1; }
    echo "    [present] steps/step-$n-*"
done

# 3. SKILL.md frontmatter has name + description (BMM-required per ADR-014)
if grep -q "^name: bmad-bam-design-deployment-topology$" "$SKILL_DIR/SKILL.md" && \
   grep -q "^description:" "$SKILL_DIR/SKILL.md"; then
    echo "    [valid] SKILL.md frontmatter (name + description)"
else
    echo "    [INVALID] SKILL.md missing required frontmatter"
    exit 1
fi

# 4. Manifest parses + has correct module + persona
python3 -c "
import yaml, sys
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform', f'module mismatch: {m[\"module\"]}'
assert m['persona'] == 'atlas', f'persona mismatch: {m[\"persona\"]}'
print(f'    [valid] manifest: {m[\"name\"]}')
"

# 5. customize.toml parses + uses [workflow] namespace + has universal-glob
python3 -c "
import tomllib
with open('$SKILL_DIR/customize.toml','rb') as f:
    c = tomllib.load(f)
assert 'workflow' in c, '[workflow] block missing'
pf = c['workflow'].get('persistent_facts', [])
assert any('project-context.md' in p for p in pf), 'universal-glob missing from persistent_facts'
print('    [valid] customize.toml: [workflow] namespace + universal-glob present')
"

# 6. Each step file has frontmatter that parses + required keys
for step in "$SKILL_DIR"/steps/step-*.md; do
    python3 -c "
import yaml, sys
content = open(sys.argv[1]).read()
parts = content.split('---', 2)
assert len(parts) >= 3, f'no frontmatter in {sys.argv[1]}'
fm = yaml.safe_load(parts[1])
required = ['step_id', 'auto_runnable', 'gate']
missing = [k for k in required if k not in fm]
assert not missing, f'missing frontmatter keys {missing} in {sys.argv[1]}'
" "$step"
done
echo "    [valid] all 7 step files have required frontmatter"

# 7. Template has Handlebars-style placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/deployment-topology.md.template" \
    || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 8. Template has required sections (Decision, Tenancy alignment, Per-tier rollout matrix,
#    Tenant cohort strategy, Rollback strategy, QG-F1)
for section in "## Decision" "## Tenancy alignment" "## Per-tier rollout matrix" \
               "## Tenant cohort strategy" "## Rollback strategy" "QG-F1"; do
    grep -q "$section" "$SKILL_DIR/templates/deployment-topology.md.template" \
        || { echo "FAIL: template missing section '$section'"; exit 1; }
done
echo "    [valid] template has all required sections"

# 9. Step-01 enforces required-input precondition for tenancy-decision.json
#    Per ADR-015 G4 spec: must exit 64 if missing, must search both canonical paths
if grep -q "exit 64" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "tenancy-decision.json" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "TENANCY_JSON_PRIMARY" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "TENANCY_JSON_ALT" "$SKILL_DIR/steps/step-01-c-elicit-context.md"; then
    echo "    [valid] step-01 enforces required-input check (exit 64 if tenancy-decision.json missing)"
else
    echo "    [INVALID] step-01 missing required-input enforcement block" >&2
    exit 1
fi

# 10. Step-02 filters rollout options by tenancy_model (per Q3 coupling matrix)
if grep -q "tenancy_model" "$SKILL_DIR/steps/step-02-c-load-options.md" && \
   grep -q "per-cell-blue-green" "$SKILL_DIR/steps/step-02-c-load-options.md" && \
   grep -q "primitives_eliminated_by_filter" "$SKILL_DIR/steps/step-02-c-load-options.md"; then
    echo "    [valid] step-02 filters rollout options by tenancy_model (per Q3 coupling matrix)"
else
    echo "    [INVALID] step-02 missing tenancy_model filtering" >&2
    exit 1
fi

# 11. Step-04 applies Q3b per-tier defaults
for default in "aggressive_canary" "canary" "blue_green_synthetics" "blue_green_pilot"; do
    grep -q "$default" "$SKILL_DIR/steps/step-04-c-recommendation.md" \
        || { echo "FAIL: step-04 missing default '$default'"; exit 1; }
done
echo "    [valid] step-04 applies Q3b per-tier defaults (aggressive_canary/canary/blue_green_synthetics/blue_green_pilot)"

# 12. Step-05 emits deployment-topology.json with exact spec §3 schema fields
if grep -q "deployment-topology\.json" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "rollout_primitive" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "rollout_per_tier" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "tenant_cohort_strategy" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "rollback_strategy" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "tenancy_input_ref" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 emits deployment-topology.json with spec §3 schema fields"
else
    echo "    [INVALID] step-05 missing required schema fields" >&2
    exit 1
fi

# 13. Step-07 enforces schema + rollout_per_tier × tier-model coherence
if grep -q "schema_version" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "rollout_primitive" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "rollout_per_tier" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "tier-model.json" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "tenant_cohort_strategy" "$SKILL_DIR/steps/step-07-v-verify-completeness.md"; then
    echo "    [valid] step-07 validates schema + rollout_per_tier × tier-model coherence"
else
    echo "    [INVALID] step-07 missing required schema/coherence verification" >&2
    exit 1
fi

echo ">>> PASS: smoke test"
