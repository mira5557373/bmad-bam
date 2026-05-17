#!/usr/bin/env bash
# Smoke test for bmad-bam-design-finops-model workflow.
# Verifies the skill's machinery: file presence, manifest validity, step
# frontmatter (8 steps incl. verify-coherence), template placeholders,
# required-input enforcement (3 inputs), step-08 algorithm + output
# declaration, and schema coverage in the verify step.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ">>> smoke-test: bmad-bam-design-finops-model"

# 1. Required files present
REQUIRED=(
    "SKILL.md"
    "bmad-skill-manifest.yaml"
    "customize.toml"
    "workflow.md"
    "templates/finops-baseline.md.template"
)
for f in "${REQUIRED[@]}"; do
    [ -f "$SKILL_DIR/$f" ] || { echo "FAIL: missing $f"; exit 1; }
    echo "    [present] $f"
done

# 2. Step files present (8 steps — 7 standard + 1 verify-coherence)
for n in 01 02 03 04 05 06 07 08; do
    matches=$(ls "$SKILL_DIR/steps/step-$n-"* 2>/dev/null | wc -l)
    [ "$matches" -ge 1 ] || { echo "FAIL: missing step-$n-*"; exit 1; }
    echo "    [present] steps/step-$n-*"
done

# 3. SKILL.md frontmatter has name + description (BMM-required per ADR-014)
if grep -q "^name: bmad-bam-design-finops-model$" "$SKILL_DIR/SKILL.md" && \
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
echo "    [valid] all 8 step files have required frontmatter"

# 7. Template has Handlebars-style placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/finops-baseline.md.template" \
    || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 8. Template has required sections (Decision, Unit economics, Per-tenant attribution,
#    Cost ceilings per tier, Budget alerts, Cross-references, QG-F1)
for section in "## Decision" "## Unit economics" "## Per-tenant attribution" \
               "## Cost ceilings per tier" "## Budget alerts" "## Cross-references" \
               "QG-F1"; do
    grep -q "$section" "$SKILL_DIR/templates/finops-baseline.md.template" \
        || { echo "FAIL: template missing section '$section'"; exit 1; }
done
echo "    [valid] template has all required sections"

# 9. Step-01 enforces 3 required-input precondition (tenancy + tier + deployment)
#    Per ADR-015 G4 spec: must exit 64 if any missing; must enumerate which
if grep -q "exit 64" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "tenancy-decision" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "tier-model" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "deployment-topology" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "INPUTS_MISSING" "$SKILL_DIR/steps/step-01-c-elicit-context.md"; then
    echo "    [valid] step-01 enforces 3 required-input check (exit 64 if any of tenancy/tier/deployment missing)"
else
    echo "    [INVALID] step-01 missing 3-input enforcement block" >&2
    exit 1
fi

# 10. Step-02 filters storage-attribution by tenancy_model (per spec §3.R1 coupling table)
if grep -q "tenancy_model" "$SKILL_DIR/steps/step-02-c-load-options.md" && \
   grep -q "by_predicate" "$SKILL_DIR/steps/step-02-c-load-options.md" && \
   grep -q "by_schema" "$SKILL_DIR/steps/step-02-c-load-options.md" && \
   grep -q "by_cell_then_intra" "$SKILL_DIR/steps/step-02-c-load-options.md"; then
    echo "    [valid] step-02 filters storage-attribution by tenancy_model (per spec §3.R1)"
else
    echo "    [INVALID] step-02 missing storage-attribution filtering" >&2
    exit 1
fi

# 11. Step-04 picks attribution + budgeting + emits cost_ceiling_per_tier
for field in "per_tenant_attribution" "budgeting_strategy" "cost_ceiling_per_tier" "budget_alert_thresholds"; do
    grep -q "$field" "$SKILL_DIR/steps/step-04-c-recommendation.md" \
        || { echo "FAIL: step-04 missing field '$field'"; exit 1; }
done
echo "    [valid] step-04 emits per_tenant_attribution + budgeting_strategy + cost_ceiling_per_tier + budget_alert_thresholds"

# 12. Step-05 emits finops-baseline.json with exact spec §3.R1 schema fields
if grep -q "finops-baseline\.json" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "unit_economics" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "per_tenant_attribution" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "cost_ceiling_per_tier" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "budget_alert_thresholds" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "tenancy_input_ref" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "tier_input_ref" "$SKILL_DIR/steps/step-05-c-write-design.md" && \
   grep -q "deployment_input_ref" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 emits finops-baseline.json with spec §3.R1 schema fields"
else
    echo "    [INVALID] step-05 missing required schema fields" >&2
    exit 1
fi

# 13. Step-07 enforces schema + per_tenant_attribution.storage × tenancy_model coupling
if grep -q "schema_version" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "per_tenant_attribution" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "tenancy-decision.json" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "expected_storage" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "cost_ceiling_per_tier" "$SKILL_DIR/steps/step-07-v-verify-completeness.md"; then
    echo "    [valid] step-07 validates schema + per_tenant_attribution.storage × tenancy_model coupling"
else
    echo "    [INVALID] step-07 missing required schema/coupling verification" >&2
    exit 1
fi

# 14. Step-08 verify-coherence: declares foundation-coherence.json output + has R2 algorithm
if grep -q "foundation-coherence\.json" "$SKILL_DIR/steps/step-08-v-verify-coherence.md" && \
   grep -q "rollout_tier_hint" "$SKILL_DIR/steps/step-08-v-verify-coherence.md" && \
   grep -q "cost_ceiling_usd_per_month_hint" "$SKILL_DIR/steps/step-08-v-verify-coherence.md" && \
   grep -q "drift_pct" "$SKILL_DIR/steps/step-08-v-verify-coherence.md" && \
   grep -q "coherent" "$SKILL_DIR/steps/step-08-v-verify-coherence.md" && \
   grep -q "mismatches" "$SKILL_DIR/steps/step-08-v-verify-coherence.md"; then
    echo "    [valid] step-08 verify-coherence: declares foundation-coherence.json + implements R2 algorithm (hint vs actual with 20% drift threshold)"
else
    echo "    [INVALID] step-08 missing foundation-coherence.json or R2 algorithm" >&2
    exit 1
fi

# 14b. Step-08 frontmatter declares foundation-coherence.json as output
python3 -c "
import yaml
content = open('$SKILL_DIR/steps/step-08-v-verify-coherence.md').read()
parts = content.split('---', 2)
fm = yaml.safe_load(parts[1])
outs = fm.get('outputs', [])
assert 'foundation-coherence.json' in outs, f'step-08 outputs must declare foundation-coherence.json; got {outs}'
print('    [valid] step-08 frontmatter declares foundation-coherence.json as output')
"

echo ">>> PASS: smoke test"
