# Concern 5 — BAM marketplace layout falls into PluginResolver Strategy 5

**Status:** open / backlog. Referenced from ADR 007.
**Discovered:** PR #3 review (Concern 4 deep dive).
**Scope:** does not block PR #3; tracks a follow-up that unblocks Tier-2 PASS-mode.

## Summary

When `bmad install --custom-source <path-to-bmad-bam>` runs against BAM, BMAD's `PluginResolver` (`external/bmad-method/tools/installer/modules/plugin-resolver.js`) tries 5 strategies in order. For BAM's current post-Phase-C layout, **only Strategy 5 (synthesized fallback) matches**. The real `module.yaml` is bypassed; a stub is synthesized from `marketplace.json` metadata.

## Empirical chain

PluginResolver Strategy 1 (`plugin-resolver.js:72-99`) requires `module.yaml` + `module-help.csv` at the **common parent of all listed skills**.

BAM's `.claude-plugin/marketplace.json` lists 4 skills, all under `src-v6/bmad-bam-platform/skills/`:

- `./src-v6/bmad-bam-platform/skills/bmad-bam-agent-atlas`
- `./src-v6/bmad-bam-platform/skills/bmad-bam-smoke-test`
- `./src-v6/bmad-bam-platform/skills/bmad-bam-finalize`
- `./src-v6/bmad-bam-platform/skills/bmad-bam-design-tenancy-model`

`_computeCommonParent` (`plugin-resolver.js:278-296`) computes the longest shared path prefix:

```
common parent = /<repo>/src-v6/bmad-bam-platform/skills/
```

Strategy 1 looks for:
- `<common>/module.yaml` = `<...>/skills/module.yaml` → **does not exist**
- `<common>/module-help.csv` = `<...>/skills/module-help.csv` → **does not exist**

BAM's actual files are at:
- `<...>/bmad-bam-platform/module.yaml`
- `<...>/bmad-bam-platform/module-help.csv`

One level above the common parent. Strategy 1 fails.

Strategies 2-4 also don't match: no `-setup` skill, multiple skills (not single standalone), no `assets/module.yaml` per skill. Strategy 5 (synthesized fallback at `plugin-resolver.js:229-`) always succeeds; it returns a `ResolvedModule` with `moduleYamlPath: null` and `synthesizedModuleYaml: { code, name, description, module_version, default_selected }` built from `marketplace.json` plugin metadata.

`installFromResolution` (`external/bmad-method/tools/installer/modules/official-modules.js:344-410`) then:
- Copies each skill dir to `<bmadDir>/<code>/<skill-leaf>/` ✅
- Writes synthesized `module-help.csv` to `<bmadDir>/<code>/module-help.csv` ✅
- Does NOT write any `module.yaml` to disk — neither real nor synthesized. The `synthesizedModuleYaml` object exists only inside `CustomModuleManager._resolutionCache` (per-process, in-memory). BMAD's own comment at `official-modules.js:145` confirms: "Check resolution cache for strategy 5 modules (no module.yaml on disk)".

Downstream, `resolveInstalledModuleYaml` (`external/bmad-method/tools/installer/project-root.js:102-`) searches standard candidate paths for the real module.yaml in the local source. Its search order:
1. `<root>/skills/module.yaml`
2. `<root>/skills/<entry>/module.yaml`
3. `<root>/src/module.yaml`
4. `<root>/src/<entry>/module.yaml`
5. `<root>/{root,src/skills,skills}/<name>-setup/assets/module.yaml`
6. `<root>/module.yaml`

For `localPath = /<repo>/bmad-bam`, none of these match BAM's `src-v6/bmad-bam-platform/module.yaml`. So `resolveInstalledModuleYaml` returns null; downstream consumers (`collectAgentsFromModuleYaml`, `writeCentralConfig` in `manifest-generator.js`) silently get nothing from BAM's real module.yaml.

## Reference: bmad-tea's working layout

bmad-tea (`external/bmad-tea/.claude-plugin/marketplace.json`) lists skills that span TWO top-level dirs:
- `./src/agents/bmad-tea`
- `./src/workflows/testarch/bmad-testarch-atdd` (and 8 more under workflows/testarch/)

`_computeCommonParent` of all those = `./src/`. And bmad-tea has `./src/module.yaml` + `./src/module-help.csv` at exactly that location — Strategy 1 passes cleanly.

BMM (`external/bmad-method/src/bmm-skills/`) has the same pattern: skills span multiple phase dirs (`1-analysis/`, `2-plan/`, `3-solutioning/`), so common parent = `bmm-skills/`, matching `bmm-skills/module.yaml`.

**BAM is the outlier** because all its skills sit in a single `skills/` dir, collapsing the common parent to `skills/`. Phase C's "everything is a skill" refactor (which moved Atlas into `skills/bmad-bam-agent-atlas/` and dropped module-root `agents/` + `data/`) is correct as BMM-empirical, but it produced a marketplace.json common-parent that doesn't match the canonical (module-root) module.yaml location.

## Resolution options (for a future Concern 5 PR)

Three viable paths:

**A. Add a phase-grouping layer inside `skills/`.**
Move skills under category subdirs, mirroring BMM's phase pattern:
- `skills/agents/bmad-bam-agent-atlas/`
- `skills/workflows/bmad-bam-design-tenancy-model/`
- `skills/test/bmad-bam-smoke-test/`
- `skills/test/bmad-bam-finalize/`

Common parent of `agents/<x>` + `workflows/<y>` + `test/<z>` = `skills/`. Putting `module.yaml` + `module-help.csv` at `skills/module.yaml` then matches Strategy 1. Trade-off: module.yaml lives inside `skills/`, which feels semantically odd but matches BMM (whose `bmm-skills/module.yaml` is alongside phase dirs).

**B. Restructure to BMM-canonical: skills span `agents/` + `workflows/` at module root.**
Move:
- Atlas → `src-v6/bmad-bam-platform/agents/bmad-bam-agent-atlas/` (NOTE: this reverses part of Phase C; would need spec re-litigation)
- Workflow skills → `src-v6/bmad-bam-platform/workflows/bmad-bam-design-tenancy-model/`, etc.

Common parent of `agents/<x>` + `workflows/<y>` = `src-v6/bmad-bam-platform/`. module.yaml + module-help.csv already there. Strategy 1 matches. Trade-off: contradicts ADR 006 ("everything is a skill" refactor); would need a new ADR re-grounded against bmad-tea (which actually uses `agents/` and `workflows/` paths inside its plugin, suggesting BMAD's flexibility is broader than ADR 006 assumed).

**C. Petition BMAD upstream for a stricter resolver.**
Patch PluginResolver to also try `<plugin.source>/module.yaml` if Strategy 1 fails. BAM's `marketplace.json` has `"source": "./"` — the patch would check `<repoRoot>/./module.yaml`. Doesn't help BAM unless we also set `"source": "./src-v6/bmad-bam-platform"`, in which case Strategy 1 could check `<source>/module.yaml` directly. Trade-off: requires an upstream change with long lead time.

**Recommendation for Concern 5 brainstorming:** option B (BMM-canonical agents/ + workflows/) needs serious empirical re-grounding against bmad-tea before being chosen, because bmad-tea DOES use both `src/agents/` and `src/workflows/testarch/` paths internally — suggesting Phase C's "everything is a skill, no agents/ at module root" stance may have been over-broad.

## What this means for Tier-2

Until Concern 5 resolves, automated `bmad install --custom-source $(pwd)` against BAM exercises only the partial-install path (Strategy 5). It validates:
- ✅ marketplace.json is read and parsed
- ✅ Listed skill paths exist
- ✅ Skill content gets copied to `_bmad/<code>/<skill>/`
- ✅ `bmad run bmad-bam-finalize` can run from the installed location

It does NOT validate:
- ❌ Real module.yaml's `agents:`, `directories:`, `x-bam-*` extensions, `post-install-notes`
- ❌ BMAD's agent-registration pathway picking up Atlas

Tier-1's audit + cp-based simulators (Wave 0, P2.1) substitute for the missing coverage. Once Concern 5 lands, Tier-2 PASS-mode unblocks.

## Files touched (none yet)

This is a tracking note only. Resolution would change:
- `.claude-plugin/marketplace.json` (skill paths)
- `src-v6/bmad-bam-platform/` (directory restructure)
- `docs/v6-final-architecture.md` §6.1 (module shape spec)
- New ADR 008 documenting the resolution
- ADR 006 annotated with supersession or refinement note
