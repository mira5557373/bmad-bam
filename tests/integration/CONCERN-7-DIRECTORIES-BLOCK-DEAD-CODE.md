# Concern 7 — module.yaml `directories:` block is dead code in BAM

**Status:** ✅ **RESOLVED 2026-05-16** — ADR 009 (PR #5). Option B selected: drop literal-path entries; rely on post-install.sh's defensive mkdir as canonical creation site. `directories: []` in module.yaml + canonical-source-of-truth comment in post-install.sh.
**Discovered:** Concern 5 brainstorming (PR #4 design phase).
**Scope:** standalone follow-up to Concern 5; did not block Concern 5 merge.

## Summary

BAM's `src-v6/bmad-bam-platform/module.yaml` declares:

```yaml
directories:
  - "{project-root}/_bmad/bam"
  - "{project-root}/_bmad/bam/install-logs"
```

These entries use LITERAL paths. BMAD's `createModuleDirectories` (`external/bmad-method/tools/installer/modules/official-modules.js:587+`) only honors entries matching `^\{name\}$` — pure variable references like BMM's `{design_artifacts}`. Literal paths fall through `continue` and are never created.

So BAM's `directories:` block is BAM-invented divergence from BMM-canonical and is silently inert at install time. The `_bmad/bam/install-logs/` dir gets created elsewhere (post-install.sh `mkdir -p` or test runner setup).

## BMM-canonical equivalent

```yaml
directories:
  - "{install_logs_dir}"    # value comes from module-config (user-configurable)
```

With matching `module_config` entry declaring `install_logs_dir` and its default.

## Resolution options

**A. Convert to BMM-canonical** — add `install_logs_dir` to module-config; declare `directories: ["{install_logs_dir}"]`. Default value: `{project-root}/_bmad/bam/install-logs`. User-configurable.

**B. Drop the `directories:` block** — accept it's dead, document that `post-install.sh` does the `mkdir -p`. Lower effort but doesn't follow BMM-canonical.

**C. Petition BMAD upstream** — extend `createModuleDirectories` to accept literal paths too. Requires upstream change.

Recommendation: Option A — full BMM-canonical alignment.

## Out of scope for Concern 5

Concern 5 is layout/resolver-strategy fix. This is a separate anti-pattern. File for resolution in a future PR.
