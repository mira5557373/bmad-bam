#!/usr/bin/env bash
# tools/generate-llms-txt.sh
#
# Generate a per-module llms.txt from module-help.csv + SKILL.md headers.
# Output is BMM-canonical (mirrors https://docs.bmad-method.org/llms.txt format).
# Per roadmap v4.2 §19.8.
#
# Usage:
#   tools/generate-llms-txt.sh <module-code>
#
# Reads:
#   src-v6/bmad-bam-<module-code>/module-help.csv
#   src-v6/bmad-bam-<module-code>/<phase-dir>/<skill>/SKILL.md (for name+description)
#
# Writes:
#   _bmad/bam-<module-code>/llms.txt (the path module-help.csv _meta row points to)

set -euo pipefail

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <module-code>  (e.g., platform)" >&2
    exit 64
fi

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODULE_CODE="$1"
MODULE_DIR="$REPO_ROOT/src-v6/bmad-bam-$MODULE_CODE"
CSV="$MODULE_DIR/module-help.csv"
OUT_DIR="$REPO_ROOT/_bmad/bam-$MODULE_CODE"
OUT="$OUT_DIR/llms.txt"

if [ ! -d "$MODULE_DIR" ]; then
    echo "ERROR: module dir not found: $MODULE_DIR" >&2
    exit 1
fi
if [ ! -f "$CSV" ]; then
    echo "ERROR: module-help.csv not found: $CSV" >&2
    exit 1
fi

mkdir -p "$OUT_DIR"

# Get module display name (from module.yaml or fallback to code)
MODULE_NAME=$(grep -E '^name:|^display_name:' "$MODULE_DIR/module.yaml" 2>/dev/null \
    | head -1 | sed -E 's/^[a-z_]+:\s*"?([^"]+)"?$/\1/' \
    || echo "BAM $MODULE_CODE")

{
    echo "# $MODULE_NAME — Skills Inventory"
    echo ""
    echo "Module code: \`bmad-bam-$MODULE_CODE\`"
    echo "Generated: $(date -u +%Y-%m-%d)"
    echo "Source: \`src-v6/bmad-bam-$MODULE_CODE/module-help.csv\`"
    echo ""
    echo "## Skills"
    echo ""

    # Parse module-help.csv with Python for proper CSV-quoting handling
    python3 - "$CSV" "$MODULE_DIR" <<'PYEOF'
import csv, os, sys, re

csv_path, mod_dir = sys.argv[1], sys.argv[2]

with open(csv_path, newline='') as f:
    reader = csv.DictReader(f)
    for row in reader:
        skill = row.get("skill", "").strip()
        if not skill or skill == "_meta":
            continue
        display = row.get("display-name", "").strip()
        menu = row.get("menu-code", "").strip()
        desc = row.get("description", "").strip()
        phase = row.get("phase", "").strip()
        outloc = row.get("output-location", "").strip()
        required = row.get("required", "").strip()

        # Find SKILL.md to extract description if not in CSV
        skill_md = None
        for phase_dir in ("1-foundation", "2-modules", "2-storage", "2-routing",
                          "2-branding-theme", "2-retrieval", "2-boundary-design",
                          "3-integration", "4-readiness", "9-infrastructure"):
            candidate = os.path.join(mod_dir, phase_dir, skill, "SKILL.md")
            if os.path.exists(candidate):
                skill_md = candidate
                break

        print(f"### `{skill}` — {display} ({menu})")
        print()
        if desc:
            print(desc)
            print()
        print(f"- **Phase:** {phase}")
        print(f"- **Required:** {required}")
        print(f"- **Output:** {outloc}")
        if skill_md:
            relpath = os.path.relpath(skill_md, os.path.dirname(os.path.dirname(mod_dir)))
            print(f"- **SKILL.md:** `{relpath}`")
        print()
PYEOF

    echo "## Invocation"
    echo ""
    echo "Workflows are invoked via the AI agent's slash command in Claude Code / Cursor"
    echo "(e.g., \`/bmad-bam-<skill-name>\`) or natural-language activation. There is no"
    echo "\`bmad run X\` CLI command (see audit check (h) in tests/audit-marketplace.sh)."

} > "$OUT"

echo "Generated: $OUT ($(wc -l < "$OUT") lines)"
