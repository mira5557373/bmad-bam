#!/usr/bin/env bash
# Smoke test for bmad-bam-design-tenant-tier-model workflow.
# Verifies the skill's machinery: file presence, manifest validity, template parses.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo ">>> smoke-test: bmad-bam-design-tenant-tier-model"

# 1. Required files present
REQUIRED=(
    "SKILL.md"
    "bmad-skill-manifest.yaml"
    "customize.toml"
    "workflow.md"
    "templates/tier-model.md.template"
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
if grep -q "^name: bmad-bam-design-tenant-tier-model$" "$SKILL_DIR/SKILL.md" && \
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
grep -q "{{.*}}" "$SKILL_DIR/templates/tier-model.md.template" \
    || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 8. Step-05 emits tier-model.json (P3.1 contract per spec §3.Q5+R2)
if grep -q "tier-model\.json" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 emits tier-model.json (P3.1 contract per spec Q5+R2)"
else
    echo "    [INVALID] step-05 missing tier-model.json output" >&2
    exit 1
fi

# 9. Template has Tier matrix section
if grep -q "Tier matrix" "$SKILL_DIR/templates/tier-model.md.template"; then
    echo "    [valid] template has Tier matrix section"
else
    echo "    [INVALID] template missing Tier matrix section" >&2
    exit 1
fi

# 10. Step-01 enforces --custom-tiers flag range [3, 7]
if grep -q "CUSTOM_TIERS" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "3" "$SKILL_DIR/steps/step-01-c-elicit-context.md" && \
   grep -q "7" "$SKILL_DIR/steps/step-01-c-elicit-context.md"; then
    echo "    [valid] step-01 handles --custom-tiers flag with [3,7] range"
else
    echo "    [INVALID] step-01 missing --custom-tiers handling" >&2
    exit 1
fi

# 11. Step-07 enforces schema + tier_count + custom_tiers_mode coherence (QG-F1 C5)
if grep -q "schema_version" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "tier_count" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "custom_tiers_mode" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "rate_arbitrage_check" "$SKILL_DIR/steps/step-07-v-verify-completeness.md"; then
    echo "    [valid] step-07 validates schema + tier_count + custom_tiers_mode + transitions (QG-F1 C5)"
else
    echo "    [INVALID] step-07 missing required schema/tier_count/transitions verification" >&2
    exit 1
fi

# 12. Step-05 documents retention_window_days_hint field (P3.2 schema 1.1)
if grep -q "retention_window_days_hint" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 documents retention_window_days_hint field (P3.2 schema 1.1)"
else
    echo "    [INVALID] step-05 missing retention_window_days_hint documentation" >&2
    exit 1
fi

echo ">>> PASS: smoke test"
