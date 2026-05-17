#!/usr/bin/env bash
# smoke-test for bmad-bam-design-deployment-topology
# Scaffolding-phase version; full step + content checks added in Phase 6.

set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
echo ">>> smoke-test: bmad-bam-design-deployment-topology"

# File presence
for f in SKILL.md customize.toml workflow.md bmad-skill-manifest.yaml; do
    if [ -f "$SKILL_DIR/$f" ]; then
        echo "    [present] $f"
    else
        echo "    [MISSING] $f"
        exit 1
    fi
done

# SKILL.md frontmatter has name + description (BMM-required per ADR-014)
if grep -q "^name: bmad-bam-design-deployment-topology$" "$SKILL_DIR/SKILL.md" && \
   grep -q "^description:" "$SKILL_DIR/SKILL.md"; then
    echo "    [valid] SKILL.md frontmatter (name + description)"
else
    echo "    [INVALID] SKILL.md missing required frontmatter"
    exit 1
fi

# customize.toml has [workflow] namespace + universal-glob in persistent_facts
if grep -q "^\[workflow\]" "$SKILL_DIR/customize.toml" && \
   grep -q "file:{project-root}/\*\*/project-context.md" "$SKILL_DIR/customize.toml"; then
    echo "    [valid] customize.toml: [workflow] namespace + universal-glob present"
else
    echo "    [INVALID] customize.toml missing namespace or glob"
    exit 1
fi

# bmad-skill-manifest.yaml has 10 BAM-extended fields per ADR-014
python3 - "$SKILL_DIR/bmad-skill-manifest.yaml" <<'PYEOF'
import sys, yaml
with open(sys.argv[1]) as f:
    m = yaml.safe_load(f)
required_keys = ["name", "description", "module", "persona", "execution_mode",
                 "inputs", "outputs", "gates"]
missing = [k for k in required_keys if k not in m]
if missing:
    print(f"    [INVALID] manifest missing keys: {missing}")
    sys.exit(1)
print(f"    [valid] bmad-skill-manifest.yaml ({len(m)} top-level keys)")
PYEOF

echo ">>> PASS: smoke test (scaffold)"
