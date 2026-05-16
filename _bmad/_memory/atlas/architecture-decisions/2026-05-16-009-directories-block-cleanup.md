---
id: 2026-05-16-009
title: Drop BAM-invented literal-path directories block; rely on post-install.sh defensive mkdir
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMAD's createModuleDirectories (`external/bmad-method/tools/installer/modules/official-modules.js:587+`) only honors entries matching `^\{name\}$` (variable-reference form like BMM's `{planning_artifacts}`). Literal paths like `{project-root}/_bmad/bam` are silently skipped. Empirically verified during Concern 7 backlog filing (2026-05-13) and Plan C Round 4 install run.
  - `_bmad/bam/` and `_bmad/bam/install-logs/` are FIXED BAM-family cross-module conventions, not user-configurable paths. BMM uses `directories:` for user-config-driven values; BAM's use case doesn't fit that pattern.
  - `9-infrastructure/bmad-bam-finalize/scripts/post-install.sh` already does defensive `mkdir -p "$LOG_DIR"` at line 156. The defensive mkdir has been the canonical creation site since pre-Concern-5; verified working in every Plan C round (R1-R4).
  - Removing a declarative-but-inert block is preferable to keeping dead code that misdirects readers.
dependencies-on-other-decisions:
  - 2026-05-13-006   # Phase C / Atlas-as-skill — established the directories: block's current literal-path shape
  - 2026-05-13-008   # Concern 5 — refactored module to bbp short-code; surfaced the dead-code state during PR #3 review
generated-by: claude-opus-4-7
authored-by: collaborative

## Context

`bmad-bam-platform/module.yaml` declared two literal-path entries under `directories:`:

```yaml
directories:
  - "{project-root}/_bmad/bam"
  - "{project-root}/_bmad/bam/install-logs"
```

Concern 5 design-phase deep review (Round 2 R2 + the spawned Concern 7 backlog note at `tests/integration/CONCERN-7-DIRECTORIES-BLOCK-DEAD-CODE.md`) established that BMAD's `createModuleDirectories` (`official-modules.js:587+`) only processes entries matching the regex `^\{name\}$`. The conditional in the BMAD source:

```js
const varMatch = dirRef.match(/^\{([^}]+)\}$/);
if (!varMatch) {
    // Not a variable reference, skip
    continue;
}
```

BAM's entries (`{project-root}/_bmad/bam` and `{project-root}/_bmad/bam/install-logs`) start with `{project-root}/` plus more content; they don't match the `^\{name\}$` anchor. Both entries fall through `continue` and are never created by BMAD.

The dirs DO get created — by `bmad-bam-finalize/scripts/post-install.sh:156`:

```bash
LOG_DIR="$PROJECT_ROOT/_bmad/bam/install-logs"
mkdir -p "$LOG_DIR"
```

This defensive `mkdir -p` is what actually creates the BAM-family install-logs dir on every install. Verified working through all four Plan C ratification rounds (R1-R4) plus the live install during Plan C R4.

So the `directories:` block was BAM-invented dead code:
- Declares intent that BMAD doesn't honor
- Misdirects readers ("oh, BMAD creates these dirs at install" — false)
- Conflicts with BMM's actual `directories:` semantics (which is for user-config-driven dirs)

## Decision

**Option B: Drop the literal-path entries; keep `directories: []` as an empty marker; document the canonical creation site.**

Three coupled changes:

1. **module.yaml**: replace the two literal-path entries with a multi-line comment explaining why the block is empty + pointing at post-install.sh as the canonical creation site.

```yaml
# BAM-family cross-module dirs (_bmad/bam/, _bmad/bam/install-logs/) are
# created at runtime by 9-infrastructure/bmad-bam-finalize/scripts/post-install.sh's
# defensive `mkdir -p` (post-install.sh:156). They are NOT declared in this
# `directories:` block because: [3 reasons documented in-line].
#
# See: ADR 009.
directories: []
```

2. **post-install.sh**: add a "CANONICAL SOURCE OF TRUTH" comment immediately above the `mkdir -p "$LOG_DIR"` line, pointing back at ADR 009 + explaining the rationale.

3. **No changes to module-config, no new variable, no removal of defensive mkdir.** The defensive mkdir is load-bearing and stays.

## Consequences

- module.yaml's `directories:` block is now BMM-canonical (empty / not misused). Conforms to "use `directories:` only for user-config-driven paths" semantic.
- BAM's dead-code anti-pattern (declarative-but-inert block) is eliminated. Readers see the empty block + comment and understand the real creation mechanism.
- post-install.sh's defensive mkdir is now explicitly documented as load-bearing — future contributors won't accidentally remove it thinking module.yaml's `directories:` handles it.
- No runtime behavior change. The install pipeline produces the exact same on-disk state.
- Closes the "Concern 7" backlog note filed during PR #3 review.

## Alternatives Considered

- **Option A: Convert to BMM-canonical {name} variable form.** Add `install_logs_dir` to module_config; reference it as `{install_logs_dir}` in directories:. Strictest BMM mirror. Rejected because: (a) `_bmad/bam/install-logs/` is a fixed BAM-family convention, not user-configurable; making it user-configurable would muddy the cross-module namespace boundary; (b) adds complexity (module_config entry + prompt) for an internal-only path; (c) BMM's directories: usage is for user-config paths, not fixed conventions — Option A would be more "syntactically BMM-canonical" but less "semantically BMM-canonical".

- **Option C: Petition BMAD upstream for literal-path support.** Extend createModuleDirectories to honor entries of form `{project-root}/...` in addition to `{name}`. Long lead time (upstream change); BAM remains with dead code during the wait. Rejected as the primary fix; could be filed as a BMAD-side enhancement separately.

- **Keep the block as-is.** Accept the dead-code state; document it as known-inert. Rejected because (a) it's misdirection; (b) Concern 7 was explicitly filed to fix this; (c) the empty + commented form is just as informative without the misdirection.

## Revisit triggers

- BMAD upstream changes createModuleDirectories to honor literal paths → re-evaluate whether to repopulate the block.
- Future BAM module needs USER-CONFIGURABLE paths → introduce module_config entries and use directories: with `{name}` references (proper BMM-canonical usage).
- post-install.sh's defensive mkdir is removed by a future PR → ADR 009 must be revisited (and likely the dirs creation becomes a problem).
- If BAM decides to use BMAD's installer-side dir creation for OTHER conventions, the same Option-A pattern from this ADR's Alternatives would apply.
