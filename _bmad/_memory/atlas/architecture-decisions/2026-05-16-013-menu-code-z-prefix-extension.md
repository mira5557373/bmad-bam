---
id: 2026-05-16-013
title: Adopt 3-char Z-prefix menu codes as deliberate BMM extension (e.g., ZTI, ZAH, ZRP)
status: accepted
date: 2026-05-16
persona: atlas
related-personas: []
modules: [bmad-bam-platform]
supersedes: null
superseded-by: null
assumptions:
  - BMM uses predominantly 2-char menu codes (31 of 32 codes; `DP`, `WB`, `CR`, etc.) with one 3-char exception (`GPC`). Verified empirically at external/bmad-method/src/bmm-skills/module-help.csv.
  - BMM does not allocate any Z-prefix codes as of BMAD 6.6.0. Verified empirically (zero matches for `^Z` in menu-code column).
  - BMAD installer's menu-code parser accepts 2-3 char codes (proven by BMM's `GPC` example).
  - BAM has many workflows (135 target; 9 already in BAM v6 PR #2-7 work) — 2-char namespace (676 codes total) doesn't comfortably accommodate the catalog at scale.
dependencies-on-other-decisions: []
generated-by: claude-opus-4-7
authored-by: collaborative
---

## Context

Roadmap v4 §19.7 surfaced the menu-code namespace question: BMM's predominantly-2-char convention gives 676 total codes. BAM targets 135 skills across 8 modules — that's ~20% of namespace if every BAM skill is 2-char, with no growth headroom for v6.x patches or community contributions.

BAM v3 used 3-char codes with Z prefix (e.g., `ZTI` for "tenant isolation", `ZAH` for "agent handoff"). The convention is established; the question is whether to preserve it in v6 as a deliberate BMM extension or migrate to 2-char.

Empirical findings:
- BMM has one 3-char code already (`GPC`) — BMAD installer's parser handles 3-char codes correctly
- BMM allocates zero Z-prefix codes — Z-prefix collision impossible

## Decision

**BAM extends BMM's menu-code enum with 3-char Z-prefix codes.** All BAM workflows use `Z<2 chars>` format. The Z prefix is reserved BAM-wide; collision with BMM's namespace is impossible.

**Namespace structure:**
- BMM: 2-char alphanumeric, ~32 currently allocated (out of 676 possible)
- BAM: 3-char `Z<XX>`, 676 possible codes (entire `Z?_?_` space)
- No overlap

**Per-module sub-prefix (deferred decision):**
- Currently all BAM codes use `Z<XX>` with no module sub-prefix
- Future option: sub-prefix by module (e.g., `ZA*` = AI module, `ZT*` = Trust module). Decision deferred to Wave P5 brainstorm (when ai module joins).

**Existing platform module codes** (post-PR #7): `A` (Atlas — 1-char), `S` (smoke-test), `F` (finalize), `D` (design-tenancy-model). These predate this ADR; will be migrated to Z-prefix during Wave P3.0 prereq cleanup.

## Consequences

- BAM has comfortable namespace headroom (676 codes vs ~135 target skills)
- BMM-ecosystem tooling (BMAD installer, menu parsers) handles BAM codes natively (3-char already supported by BMM's GPC precedent)
- Future Z-prefix sub-grouping (per-module) becomes possible without code re-allocation
- Documentation MUST cite Z-prefix convention so contributors understand the extension intent
- Tier-1 audit check (i) — workflow-name allow-list — also verifies menu-code Z-prefix conformance

## Alternatives Considered

- **Use 2-char BAM codes** — rejected for namespace pressure (135 target / 676 available = 20%, with BMM also growing). At scale this becomes constraining.
- **Use longer codes (4-char)** — rejected; BMM precedent caps at 3-char (`GPC`). Going to 4-char would itself be an unforced BMM-incompatibility.
- **Petition BMM for namespace partition** — deferred. BAM's Z-prefix self-allocation is non-invasive and doesn't require upstream change.
