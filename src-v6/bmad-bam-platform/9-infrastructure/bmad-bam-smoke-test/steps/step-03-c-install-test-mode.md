---
step_id: 03-c-install-test-mode
auto_runnable: true
gate: machine-checkable
inputs: [universal-glob-presence.txt]
outputs: [install-status.txt]
---

# Step 03 — Install bmad-bam-platform in test mode

## Purpose

Install the skeletal `bmad-bam-platform` module into the host project. "Test mode" = uses local source (`src-v6/bmad-bam-platform/`) rather than a published location.

## Action

```bash
SOURCE_DIR="src-v6/bmad-bam-platform"
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"

# Confirm source exists
test -d "$SOURCE_DIR" || { echo "ERROR: $SOURCE_DIR missing"; exit 1; }

# Confirm host project has BMAD config
test -f "$PROJECT_ROOT/_bmad/config.toml" || { echo "ERROR: $PROJECT_ROOT not a BMAD project"; exit 1; }

# Run post-install (creates {output_folder}/bbp/, generates project-context.md)
SENTINEL=$("$SOURCE_DIR/scripts/post-install.sh" "$PROJECT_ROOT")

echo "Install complete; sentinel=$SENTINEL"
```

## Verification

```bash
# Resolve {output_folder} (default _bmad-output if unset; per BMM convention)
OUTPUT_FOLDER_REL="$(grep -E '^[[:space:]]*output_folder[[:space:]]*=' "$PROJECT_ROOT/_bmad/config.toml" 2>/dev/null | head -1 | sed -E 's/^[[:space:]]*output_folder[[:space:]]*=[[:space:]]*"?([^"#]+)"?.*/\1/' | sed -E 's/[[:space:]]+$//' || echo)"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL:-_bmad-output}"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL#\{project-root\}/}"
SENTINEL_FILE="$PROJECT_ROOT/$OUTPUT_FOLDER_REL/bbp/project-context.md"

# project-context.md must exist (BMM-aligned location)
test -f "$SENTINEL_FILE" || { echo "FAIL: $SENTINEL_FILE missing"; exit 1; }

# sentinel must be present in it
grep -q "BAM_LOAD_VERIFY_" "$SENTINEL_FILE" || { echo "FAIL: sentinel missing"; exit 1; }

# install log must exist
test -f "$PROJECT_ROOT/_bmad/bam/install-logs/platform-install.log" || { echo "FAIL: log missing"; exit 1; }

echo "PASS"
```

## Output

Write `{project-root}/_bmad/bam/install-logs/install-status.txt`:

```
status=installed
sentinel=<BAM_LOAD_VERIFY_...>
output_folder=<resolved-value>
target=<output_folder>/bbp/project-context.md
verified_at=<ISO-8601 UTC>
```
