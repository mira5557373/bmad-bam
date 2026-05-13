---
step_id: 04-c-emit-sentinel
auto_runnable: true
gate: machine-checkable
inputs: [install-status.txt]
outputs: [sentinel.txt]
---

# Step 04 — Read sentinel from generated bam-platform-project-context.md

## Purpose

Sanity check: read back the sentinel from the freshly generated `bam-platform-project-context.md` and stash it so the Plan A/B/C verification steps can compare against it. File location is BMM-aligned per v0.7 spec §7.6: `{output_folder}/bam-platform-project-context.md`.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"

# Resolve {output_folder} (default _bmad-output if unset)
OUTPUT_FOLDER_REL="$(grep -E '^[[:space:]]*output_folder[[:space:]]*=' "$PROJECT_ROOT/_bmad/config.toml" 2>/dev/null | head -1 | sed -E 's/^[[:space:]]*output_folder[[:space:]]*=[[:space:]]*"?([^"#]+)"?.*/\1/' | sed -E 's/[[:space:]]+$//' || echo)"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL:-_bmad-output}"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL#\{project-root\}/}"
CONTEXT_FILE="$PROJECT_ROOT/$OUTPUT_FOLDER_REL/bam-platform-project-context.md"

# Extract the sentinel token (first line matching BAM_LOAD_VERIFY_ pattern)
SENTINEL=$(grep -o 'BAM_LOAD_VERIFY_[a-f0-9]\{32\}' "$CONTEXT_FILE" | head -1)

if [ -z "$SENTINEL" ]; then
    echo "FAIL: no sentinel found in $CONTEXT_FILE"
    exit 1
fi

echo "Sentinel: $SENTINEL"

# Persist for downstream steps
mkdir -p "$PROJECT_ROOT/_bmad/bam/install-logs"
echo "$SENTINEL" > "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt"
```

## Verification

```bash
test -s "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt" || { echo "FAIL: sentinel.txt empty"; exit 1; }
grep -qE '^BAM_LOAD_VERIFY_[a-f0-9]{32}$' "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt" || { echo "FAIL: sentinel format"; exit 1; }
echo "PASS"
```
