---
step_id: 05-v-verify-plan-a
auto_runnable: true
gate: machine-checkable
inputs: [sentinel.txt]
outputs: [plan-a-result.txt]
---

# Step 05 — Verify Plan A (universal-glob auto-load)

## Purpose

Test whether the BMAD universal-glob pattern `file:{project-root}/**/project-context.md` makes it through BMAD's three-layer customize-merge into a core skill's resolved `persistent_facts`, AND whether the sentinel-bearing `project-context.md` is dropped at a path the glob will match. This is the preferred outcome.

## Mechanism (per Task 0 / INVESTIGATION-NOTES.md)

BMAD v6.6.0's resolver is `_bmad/scripts/resolve_customization.py` (Python, stdlib `tomllib`). It does **string-level merge only** — it does NOT expand `file:` prefixes or globs. Glob expansion happens at LLM activation, when the SKILL.md prompt instructs the agent to load entries prefixed `file:`.

This means Plan A is verified headlessly by two parts:
1. The literal universal-glob string survives the three-layer merge into the target skill's resolved `agent.persistent_facts`.
2. The sentinel `bam-platform-project-context.md` exists at a path the glob would match when the LLM runs. BAM uses the BMM-aligned canonical location: `{output_folder}/bam-platform-project-context.md` (default `_bmad-output/bam-platform-project-context.md`), outside `_bmad/<module-code>/` so BMAD's install-time wipe doesn't touch it. The universal-glob `**/project-context.md` matches it because the filename ends in `project-context.md` and `**` matches arbitrary depth.

Part 3 (the LLM actually reading the file and echoing the sentinel back) is by-design untestable headlessly — see Plan C / Task 18 manual verification.

## Action

```bash
PROJECT_ROOT="${BMAD_PROJECT_ROOT:-$PWD}"
SENTINEL=$(cat "$PROJECT_ROOT/_bmad/bam/install-logs/sentinel.txt")

# Locate the IDE-side installed copy of a BMAD core skill.
# _cleanupSkillDirs (installer.js:394-412) removes skills from _bmad/ after IDE install;
# the live skill lives at the IDE target (e.g., .claude/skills/<id>/, .cursor/...).
# Smoke-test must target the IDE-side path. BMAD_TARGET_SKILL_DIR overrides.
TARGET_SKILL_DIR="${BMAD_TARGET_SKILL_DIR:-$PROJECT_ROOT/.claude/skills/bmad-create-architecture}"
RESOLVER="$PROJECT_ROOT/_bmad/scripts/resolve_customization.py"

if [ ! -f "$RESOLVER" ]; then
    echo "PLAN_A_UNKNOWN: resolver missing at $RESOLVER"
    echo "   BMAD's install may not have completed; or _bmad/scripts/ was not synced."
    exit 2
fi

if [ ! -d "$TARGET_SKILL_DIR" ]; then
    echo "PLAN_A_UNKNOWN: target skill dir missing at $TARGET_SKILL_DIR"
    echo "   Set BMAD_TARGET_SKILL_DIR to an installed IDE-side skill (e.g., .claude/skills/<id>/)."
    exit 2
fi

# Run the canonical resolver, ask for agent.persistent_facts as JSON.
RESOLVED=$(python3 "$RESOLVER" --skill "$TARGET_SKILL_DIR" --key agent.persistent_facts 2>/dev/null)
if [ -z "$RESOLVED" ]; then
    echo "PLAN_A_FAIL: resolver produced empty output"
    exit 1
fi

# Part 1: literal universal-glob string present in resolved persistent_facts?
GLOB_STRING='file:{project-root}/**/project-context.md'
if ! echo "$RESOLVED" | grep -qF "$GLOB_STRING"; then
    echo "PLAN_A_FAIL: universal-glob string not present in resolved persistent_facts"
    exit 1
fi

# Part 2: sentinel bam-platform-project-context.md exists at glob-matching path (BMM-aligned).
# Resolve {output_folder} (default _bmad-output).
OUTPUT_FOLDER_REL="$(grep -E '^[[:space:]]*output_folder[[:space:]]*=' "$PROJECT_ROOT/_bmad/config.toml" 2>/dev/null | head -1 | sed -E 's/^[[:space:]]*output_folder[[:space:]]*=[[:space:]]*"?([^"#]+)"?.*/\1/' | sed -E 's/[[:space:]]+$//' || echo)"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL:-_bmad-output}"
OUTPUT_FOLDER_REL="${OUTPUT_FOLDER_REL#\{project-root\}/}"
SENTINEL_FILE="$PROJECT_ROOT/$OUTPUT_FOLDER_REL/bam-platform-project-context.md"

if [ ! -f "$SENTINEL_FILE" ]; then
    echo "PLAN_A_FAIL: sentinel bam-platform-project-context.md not present at $SENTINEL_FILE"
    exit 1
fi

# Part 3 (sanity): the sentinel token matches what step 04 recorded
if ! grep -qF "$SENTINEL" "$SENTINEL_FILE"; then
    echo "PLAN_A_FAIL: sentinel token in bam-platform-project-context.md differs from sentinel.txt"
    exit 1
fi

echo "PLAN_A_PASS: universal-glob string survived merge; sentinel file in place at glob-matching path"
exit 0
```

## Verification

Exit 0 → Plan A passes; control jumps to step 08 (skip 06 + 07).
Exit 1 → Plan A fails; control flows to step 06.
Exit 2 → unknown environment state (resolver or target skill missing); halt + escalate to user.

## Output

Write `{project-root}/_bmad/bam/install-logs/plan-a-result.txt`:

```
result=<pass|fail|unknown>
observation_method=invoke-resolution-fn-python
target_skill_dir=<path>
glob_string_present=<true|false>
sentinel_file_present=<true|false>
sentinel_match=<true|false>
verified_at=<ISO-8601 UTC>
```

## Limitation

This step verifies Parts 1+2 only. Part 3 (the LLM actually loading the file at activation) requires a live agent run — see Task 18 manual verification or, in real-install flows, a follow-up Plan C session.
