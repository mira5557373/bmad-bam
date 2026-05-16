# Wave 0 — BMAD Customize Resolution Investigation

> **Pre-Concern-5 note (added 2026-05-13):** Path references in this document (`_bmad/bam-platform/`, `bam-platform-project-context.md`, `src-v6/.../skills/...`) reflect module state at the time of writing. Post-Concern-5 the module code is `bbp`, the sentinel lives at `{output_folder}/bbp/project-context.md`, and skills are organized by phase dir (`1-foundation/`, `2-modules/`, `9-infrastructure/`); see ADR 008.

## BMAD version under test
- Version: 6.6.0 (from `external/bmad-method/package.json:4`)

## Files actually read
Note: the plan listed `tools/installer/core/installer.js`, `tools/installer/commands/install.js`,
and `docs/how-to/customize-bmad.md` — all three exist at those exact paths in v6.6.0.
The plan-defined paths were not divergent; no rewrites needed. Additional files were
read to fully answer Steps 3–5.

- `external/bmad-method/package.json` (version)
- `external/bmad-method/tools/installer/bmad-cli.js` (CLI entry + subcommand registration)
- `external/bmad-method/tools/installer/commands/install.js` (install command dispatcher)
- `external/bmad-method/tools/installer/core/installer.js` (Installer class — confirms `_installSharedScripts` syncs `src/scripts/*` to `_bmad/scripts/`)
- `external/bmad-method/tools/installer/ide/_config-driven.js` (per-skill `customize.toml` copy is verbatim, no transformation at install time)
- `external/bmad-method/docs/how-to/customize-bmad.md` (three-layer override model, run-time resolver invocation contract)
- `external/bmad-method/docs/how-to/project-context.md` (project-context.md contract)
- `external/bmad-method/src/scripts/resolve_customization.py` (canonical resolver — Python, stdlib `tomllib`)
- `external/bmad-method/src/bmm-skills/1-analysis/bmad-agent-analyst/customize.toml` (sample skill with universal-glob)
- `external/bmad-method/src/bmm-skills/1-analysis/bmad-agent-analyst/SKILL.md` (how the LLM consumes `{agent.persistent_facts}` at activation)
- `external/bmad-method/src/bmm-skills/3-solutioning/bmad-generate-project-context/SKILL.md` (workflow variant)
- `external/bmad-method/tools/installer/commands/` listing (only `install.js`, `status.js`, `uninstall.js` — no `customize`/`debug` subcommand exists)

## Glob resolution time
- **run-time** (two-stage; neither stage runs at install time)
- Sources:
  - **Stage 1 — TOML merge (string-level, no glob expansion):** `external/bmad-method/src/scripts/resolve_customization.py:67-93` (`load_toml`) and `:150-167` (`deep_merge`). The script merges base + team + user TOMLs and emits JSON. It does **not** expand `file:` prefixes or globs — the literal string `"file:{project-root}/**/project-context.md"` flows through unchanged from `customize.toml` into the JSON output.
  - **Stage 2 — `file:` / glob expansion (performed by the LLM at activation):** `external/bmad-method/src/bmm-skills/1-analysis/bmad-agent-analyst/SKILL.md:?` instructs the agent: *"Treat every entry in `{agent.persistent_facts}` as foundational context… Entries prefixed `file:` are paths or globs under `{project-root}` — load the referenced contents as facts."* The same prompt-instruction appears verbatim in 30 skill SKILL.md files (`grep -rln 'file:{project-root}/\*\*/project-context.md' src/` returns 30 customize.toml files in v6.6.0 — all 30 ship the universal-glob, and their paired SKILL.md files all delegate `file:` expansion to the LLM).
  - **Confirms NOT install-time:** `external/bmad-method/tools/installer/ide/_config-driven.js:417-468` (`installVerbatimSkills`) copies skill source directories byte-for-byte to the IDE target (e.g. `.claude/skills/<id>/`). The installer never opens, parses, or rewrites `customize.toml`. `external/bmad-method/tools/installer/core/installer.js:570-586` (`_installSharedScripts`) copies `src/scripts/resolve_customization.py` to `_bmad/scripts/` — the resolver is shipped to be invoked at activation, not at install.
  - **Activation invocation contract:** documented in `external/bmad-method/docs/how-to/customize-bmad.md:202-234`. SKILL.md runs `python3 {project-root}/_bmad/scripts/resolve_customization.py --skill {skill-root} --key agent` on every activation; output is JSON; if Python 3.11+ is missing, SKILL.md instructs the LLM to read the three TOMLs manually and apply the same merge rules.

## Observation point for smoke test
- Method: **invoke-resolution-fn** (run the resolver directly and inspect its JSON output) **plus** file-presence check for the dropped `project-context.md`
- Command/function: `python3 external/bmad-method/src/scripts/resolve_customization.py --skill <installed-skill-dir> --key agent.persistent_facts`
  - This emits the resolved `persistent_facts` JSON array. Because the resolver does NOT expand `file:` / globs, the smoke test instead asserts:
    1. **TOML-merge fidelity (Plan A):** the resolved JSON array contains the literal string `"file:{project-root}/**/project-context.md"` — proves the universal-glob survived install + the three-layer merge.
    2. **File-drop survival (Plan B):** after running BAM's post-install hook (Task 6), a sentinel `project-context.md` file exists at the path the glob will match (e.g. `_bmad-output/project-context.md` containing a known sentinel token). This is the only thing the smoke test can verify without a live LLM in the loop — the LLM-side `file:` expansion is by-spec not testable headlessly. The architecture spec §7.3 acknowledges this.
    3. **End-to-end (Plan C — manual):** the controller (a human or a separate Claude Code session) launches an agent and asks it to repeat the sentinel token; success = token echoed back. Documented as a manual verification step in `docs/v6-final-architecture.md` §7.3.

- Why not a BMAD CLI subcommand: only `install`, `status`, and `uninstall` are registered (`external/bmad-method/tools/installer/commands/` directory listing). No `customize --show`, `debug`, or context-dump command exists in v6.6.0.

## Refinement (post-Wave-0 remediation)

**Namespace split discovered during multi-skill runner verification.** The 30 BMAD v6.6.0 skills that ship the universal-glob are split by customize.toml namespace:

- **Agent skills (6):** `bmad-agent-analyst`, `bmad-agent-architect`, `bmad-agent-dev`, `bmad-agent-pm`, `bmad-agent-tech-writer`, `bmad-agent-ux-designer`. Customize.toml uses `[agent]` block; universal-glob lives at `agent.persistent_facts`.
- **Workflow skills (24):** `bmad-create-architecture`, `bmad-create-prd`, `bmad-create-story`, `bmad-validate-prd`, etc. Customize.toml uses `[workflow]` block; universal-glob lives at `workflow.persistent_facts`.

Initial investigation (above) examined only `bmad-agent-analyst` and recorded the resolver invocation as `--key agent.persistent_facts`. That's correct for agent skills, but returns `{}` for workflow skills. Spec §7.3 mandates testing `bmad-create-architecture` and `bmad-create-prd` — both are workflows — so the smoke-test runner / helper must query both namespaces and treat presence in either as a hit. `tests/wave-0/lib/inspect-context.sh` (post-remediation) does this.

## Risks identified

1. **LLM-side `file:` expansion is by-design untestable headlessly.** The contract that turns the TOML string `file:{project-root}/**/project-context.md` into actually-loaded file contents lives in 30 separate SKILL.md prompts, each telling the LLM to do the loading. Plans A + B (the headless portion of the smoke test) prove the universal-glob string round-trips through merge and that the file BAM drops at install time is present at a glob-matching path. They do **not** prove an LLM will actually read it. Plan C (manual agent run) is required for a true end-to-end signal.

2. **BAM custom skills must wire the universal-glob themselves.** The universal-glob ships in 30 official BMAD skills' `customize.toml` files. Any BAM v6 skill (e.g. `bmad-bam-platform`) that wants project-context-style activation must include the same `persistent_facts = ["file:{project-root}/**/project-context.md", ...]` line in its own `customize.toml`. The mechanism is opt-in per skill, not a global runtime hook. Wave 0's `bmad-bam-platform` smoke-test skill must include this line to be testable.

3. **Glob semantics depend on the LLM, not Python `glob`.** Because expansion is LLM-driven, the recursive-glob `**` token has whatever semantics the LLM applies to the SKILL.md instruction — there is no canonical Python `glob.glob(recursive=True)` call in the BMAD codebase that resolves `file:{project-root}/**/project-context.md`. Different LLMs may interpret recursion differently. For Wave 0's purposes, place the sentinel `project-context.md` at the BMAD-documented canonical location (`{output_folder}/project-context.md`, i.e. `_bmad-output/project-context.md` per `docs/how-to/project-context.md:35`) so we test against the contract the doc establishes, not a more aggressive recursive scan.

4. **Resolver requires Python 3.11+.** Per `docs/how-to/customize-bmad.md:212`, macOS without Homebrew and Ubuntu 22.04 default `python3` to <3.11. The smoke test runner must `python3 --version` check before invoking the resolver and fail fast with a clear message; otherwise Plan A's JSON check could fail for an unrelated reason and mask the real signal.

5. **Three-layer merge means override files can mask the universal-glob.** A team or user `_bmad/custom/<skill>.toml` that sets `persistent_facts = [...]` without including the universal-glob line will, due to append semantics, still preserve the base entry — but a fork-and-replace pattern (e.g. wholesale rewriting `[[agent.menu]]` arrays under a different `code` strategy) could in principle disrupt the resolved output. For Wave 0 the test fixture (Task 2) must use a clean BMAD install with **no** files in `_bmad/custom/` so the smoke test exercises only the base layer.

6. **`_cleanupSkillDirs` deletes skills from `_bmad/` after IDE install.** `tools/installer/core/installer.js:394-412` removes skill directories from `_bmad/` once the IDE has its verbatim copy. The smoke test must point `--skill` at the **IDE-side** copy (e.g. `.claude/skills/<id>/`), not at `_bmad/<module>/<skill>/` — the latter will be missing by the time the test runs.
