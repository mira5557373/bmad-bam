#!/usr/bin/env bash
# tests/wave-0/lib/inspect-context.sh
#
# Helper for the Wave 0 smoke-test runner. Inspects an installed BMAD skill's
# resolved `persistent_facts` by invoking the canonical Python resolver
# (BMAD v6.6.0+ ships `resolve_customization.py` to `_bmad/scripts/` via the
# installer's `_installSharedScripts`).
#
# Mechanism (per tests/wave-0/INVESTIGATION-NOTES.md):
#   - The resolver does *string-level* TOML merge only; it does NOT expand
#     `file:` prefixes or globs. The literal entries from the three layers
#     (skill base / team / user) are emitted as JSON.
#   - Glob/file expansion is the LLM's job at activation time. The smoke
#     test therefore asserts string-presence in the JSON output, not the
#     existence of any expanded sentinel inside the resolved blob.
#
# Namespace note (refined in Wave-0 remediation):
#   BMAD v6.6.0 splits skills by namespace in customize.toml:
#     - Agent skills (bmad-agent-analyst, bmad-agent-architect, ...) use
#       `[agent]` with `persistent_facts` underneath. 6 skills total.
#     - Workflow skills (bmad-create-architecture, bmad-create-prd, ...) use
#       `[workflow]` with `persistent_facts` underneath. 24 skills total.
#   Both ship the universal-glob. This helper queries BOTH keys and concatenates
#   their resolved outputs so the runner doesn't have to know which kind of
#   skill it's inspecting.
#
# Public interface (intentionally simple):
#
#   source tests/wave-0/lib/inspect-context.sh
#   resolved="$(inspect_context_for_skill <skill-dir> <project-root>)"
#
# Arguments:
#   $1 = skill_dir     Absolute path to an installed-style skill directory
#                      (must contain customize.toml).
#   $2 = project_root  Absolute path to the host project root.
#                      `_bmad/scripts/resolve_customization.py` must live here,
#                      and `_bmad/custom/<skill-basename>.toml` (if present)
#                      is treated as the user-tier override.
#
# Behavior:
#   - On success: echoes the concatenated resolver JSON for both namespaces
#     (each on its own line) to stdout, returns 0.
#   - On missing resolver script: prints error to stderr, returns 2.
#   - On missing skill dir / customize.toml: prints error to stderr, returns 2.
#   - On resolver execution error (non-zero exit): prints error to stderr,
#     returns the resolver's exit code.

inspect_context_for_skill() {
    local skill_dir="${1:-}"
    local project_root="${2:-}"

    if [ -z "$skill_dir" ] || [ -z "$project_root" ]; then
        echo "ERROR: inspect_context_for_skill <skill-dir> <project-root>" >&2
        return 2
    fi

    if [ ! -d "$skill_dir" ]; then
        echo "ERROR: skill dir not found: $skill_dir" >&2
        return 2
    fi

    if [ ! -f "$skill_dir/customize.toml" ]; then
        echo "ERROR: customize.toml missing in skill dir: $skill_dir" >&2
        return 2
    fi

    local resolver="$project_root/_bmad/scripts/resolve_customization.py"
    if [ ! -f "$resolver" ]; then
        echo "ERROR: resolver missing at $resolver" >&2
        return 2
    fi

    # Query both namespaces. The resolver returns `{}` for missing keys and
    # exits 0, so we can safely concatenate. If the resolver itself errors
    # (non-zero exit), surface that.
    local key out rc
    for key in agent.persistent_facts workflow.persistent_facts; do
        out="$(python3 "$resolver" --skill "$skill_dir" --key "$key" 2>&1)"
        rc=$?
        if [ "$rc" -ne 0 ]; then
            echo "ERROR: resolver exited $rc for key=$key: $out" >&2
            return "$rc"
        fi
        printf '%s\n' "$out"
    done

    return 0
}
