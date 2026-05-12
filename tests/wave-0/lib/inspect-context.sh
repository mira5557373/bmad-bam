#!/usr/bin/env bash
# tests/wave-0/lib/inspect-context.sh
#
# Helper for the Wave 0 smoke-test runner. Inspects an installed BMAD skill's
# resolved `agent.persistent_facts` by invoking the canonical Python resolver
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
# Public interface (intentionally simple — same as the plan's pseudocode):
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
#   - On success: echoes the resolver's JSON output to stdout, returns 0.
#   - On missing resolver script: prints error to stderr, returns 2.
#   - On missing skill dir / customize.toml: prints error to stderr, returns 2.
#   - On resolver execution error (non-zero exit): prints error to stderr,
#     returns the resolver's exit code (or 1 if zero somehow).

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

    local output rc
    output="$(python3 "$resolver" --skill "$skill_dir" --key agent.persistent_facts 2>&1)"
    rc=$?
    if [ "$rc" -ne 0 ]; then
        echo "ERROR: resolver exited $rc: $output" >&2
        if [ "$rc" -eq 0 ]; then
            return 1
        fi
        return "$rc"
    fi

    printf '%s\n' "$output"
    return 0
}
