#!/usr/bin/env bash
# Smoke test for bmad-bam-design-modular-monolith workflow.
# Verifies the skill's machinery: file presence, manifest validity, template parses.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../../.." && pwd)"
SKILL_DIR="$REPO_ROOT/src-v6/bmad-bam-platform/2-modules/bmad-bam-design-modular-monolith"

echo ">>> smoke-test: bmad-bam-design-modular-monolith"

# 1. Required files present
REQUIRED=(
    "SKILL.md"
    "bmad-skill-manifest.yaml"
    "customize.toml"
    "workflow.md"
    "templates/module-decomposition.md.template"
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

# 3. Manifest parses + has correct module + persona
python3 -c "
import yaml, sys
m = yaml.safe_load(open('$SKILL_DIR/bmad-skill-manifest.yaml'))
assert m['module'] == 'bmad-bam-platform', f'module mismatch: {m[\"module\"]}'
assert m['persona'] == 'atlas', f'persona mismatch: {m[\"persona\"]}'
print(f'    [valid] manifest: {m[\"name\"]}')
"

# 4. customize.toml parses + uses [workflow] namespace + has universal-glob
python3 -c "
import tomllib
with open('$SKILL_DIR/customize.toml','rb') as f:
    c = tomllib.load(f)
assert 'workflow' in c, '[workflow] block missing'
pf = c['workflow'].get('persistent_facts', [])
assert any('project-context.md' in p for p in pf), 'universal-glob missing from persistent_facts'
print('    [valid] customize.toml: [workflow] namespace + universal-glob present')
"

# 5. Each step file has frontmatter that parses + required keys
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

# 6. Template has Handlebars-style placeholders
grep -q "{{.*}}" "$SKILL_DIR/templates/module-decomposition.md.template" \
    || { echo "FAIL: template missing placeholders"; exit 1; }
echo "    [valid] template has placeholders"

# 7. Step-05 emits module-decomposition.json (P3.1 contract per ADR-015)
if grep -q "module-decomposition\.json" "$SKILL_DIR/steps/step-05-c-write-design.md"; then
    echo "    [valid] step-05 emits module-decomposition.json (P3.1 contract per ADR-015)"
else
    echo "    [INVALID] step-05 missing module-decomposition.json output" >&2
    exit 1
fi

# 8. Template has Bounded contexts section
if grep -q "Bounded contexts" "$SKILL_DIR/templates/module-decomposition.md.template"; then
    echo "    [valid] template has Bounded contexts section"
else
    echo "    [INVALID] template missing Bounded contexts section" >&2
    exit 1
fi

# 9. Step-07 performs schema + topo-sort validation (QG-M1 auto-criteria)
if grep -q "schema_version" "$SKILL_DIR/steps/step-07-v-verify-completeness.md" && \
   grep -q "cycle" "$SKILL_DIR/steps/step-07-v-verify-completeness.md"; then
    echo "    [valid] step-07 validates schema + topo-sort (QG-M1 auto-criteria)"
else
    echo "    [INVALID] step-07 missing schema or topo-sort verification" >&2
    exit 1
fi

echo ">>> PASS: smoke test"
