---
step_id: 06-v-verify-plan-b
auto-runnable: true
gate: machine-checkable
inputs: [sentinel.txt, plan-a-result.txt]
outputs: [plan-b-result.txt]
---

# Step 06 — Verify Plan B (explicit customize-overlay fallback)

## Purpose

If Plan A failed (universal-glob string did NOT survive into the target skill's resolved `persistent_facts`), test whether installing an **explicit customize-overlay** in BMAD's user-tier overrides directory rescues the situation. This is the fallback when universal-glob doesn't pass through merge.

## Mechanism (per Task 0 / INVESTIGATION-NOTES.md)

The three-layer merge precedence (per `external/bmad-method/docs/how-to/customize-bmad.md:202-234`) is: base TOML (skill source) ← team TOML (`_bmad/teams/<team>.toml`) ← user TOML (`_bmad/custom/<skill>.toml`). User-tier overrides win and are appended to arrays.

Plan B installs a user-tier override that explicitly names the BAM project-context.md path, side-stepping the universal-glob. The resolver runs as in Plan A; we verify the explicit path string lands in the resolved JSON.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")
TARGET_SKILL_DIR="${BMAD_TARGET_SKILL_DIR:-$PROJECT_ROOT/.claude/skills/bmad-create-architecture}"
RESOLVER="$PROJECT_ROOT/_bmad/scripts/resolve_customization.py"

# Identify the user-override path. The resolver convention is
# _bmad/custom/<skill-basename>.toml (per customize-bmad.md).
SKILL_BASENAME=$(basename "$TARGET_SKILL_DIR")
OVERRIDE_DIR="$PROJECT_ROOT/_bmad/custom"
OVERRIDE_TOML="$OVERRIDE_DIR/$SKILL_BASENAME.toml"

mkdir -p "$OVERRIDE_DIR"

# Plan B: explicit overlay. List the BAM project-context.md path directly so it
# does NOT depend on glob expansion at activation.
cat > "$OVERRIDE_TOML" <<'EOF'
# Plan B explicit overlay — installed by bmad-bam-platform when Plan A doesn't work.
# Authored by bmad-bam-smoke-test step-06; do not edit by hand.
[agent]
persistent_facts = [
  "file:{project-root}/_bmad/platform/project-context.md",
]
EOF

if [ ! -f "$RESOLVER" ] || [ ! -d "$TARGET_SKILL_DIR" ]; then
    echo "PLAN_B_UNKNOWN: resolver or target skill missing (see Plan A diagnostics)"
    exit 2
fi

# Re-run resolver after planting the override
RESOLVED=$(python3 "$RESOLVER" --skill "$TARGET_SKILL_DIR" --key agent.persistent_facts 2>/dev/null)

EXPLICIT_PATH='file:{project-root}/_bmad/platform/project-context.md'
if echo "$RESOLVED" | grep -qF "$EXPLICIT_PATH"; then
    # Also confirm the sentinel file is present (same as Plan A part 2)
    if [ ! -f "$PROJECT_ROOT/_bmad/platform/project-context.md" ] || \
       ! grep -qF "$SENTINEL" "$PROJECT_ROOT/_bmad/platform/project-context.md"; then
        echo "PLAN_B_FAIL: explicit path in resolved JSON but sentinel file missing/mismatched"
        exit 1
    fi
    echo "PLAN_B_PASS: explicit overlay survived merge; sentinel file in place"
    exit 0
else
    echo "PLAN_B_FAIL: explicit overlay did not appear in resolved persistent_facts"
    exit 1
fi
```

## Verification

Exit 0 → Plan B works; control jumps to step 08 (skip 07).
Exit 1 → Plan B fails; control flows to step 07.
Exit 2 → environment state unknown; halt + escalate.

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-b-result.txt`:

```
result=<pass|fail|unknown>
overlay_path=_bmad/custom/<skill-basename>.toml
explicit_path_present=<true|false>
sentinel_file_present=<true|false>
verified_at=<ISO-8601 UTC>
```

## Limitation

Same as Plan A: this verifies the resolver-side string-presence only. Whether the LLM actually loads the explicit `file:` entry at activation is by-design untestable headlessly. The contract that turns `file:...` into loaded content is in 30 SKILL.md prompts and depends on LLM execution.
