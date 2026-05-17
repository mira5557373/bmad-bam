---
step_id: 06-c-record-adr
auto_runnable: false
gate: human-approval
inputs: [recommendation.json, test-catalogue.md]
outputs: [<NNN>-multi-tenant-testing-decision.md ADR]
---

# Step 06 — Record sidecar ADR

## Purpose

Write project-level sidecar ADR documenting the test catalogue scope, coverage profile, per-category severity bands, and (when applicable) hybrid_resolution mechanism map.

## Actions

1. Determine ADR number: scan `_bmad/_memory/atlas/architecture-decisions/` for next available; format `YYYY-MM-DD-NNN-multi-tenant-testing-decision.md`.

2. Write ADR with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: Multi-tenant test catalogue decisions for <project>
status: accepted
date: <date>
persona: atlas
related-personas: [kai]
modules: [<your-project-modules>]
supersedes: null
superseded-by: null
assumptions:
  - "Tenancy model is <isolation_model>; bypass attack surface enumerated per model"
  - "Coverage profile <profile> chosen on the basis of <release-cadence / regulatory posture>"
  - "Cross-tenant-cache category deferred to P5 ai (design-model-cache-isolation); must_have: 0 at this wave"
  - "(if hybrid) hybrid_resolution maps EVERY tier_id to a base mechanism; per-tier bypass tests selected per mechanism"
dependencies-on-other-decisions: [<P3.1 tenancy-decision ADR>, <P3.1 tier-model ADR if soft input present>]
generated-by: bmad-bam-design-multi-tenant-testing
authored-by: collaborative
---
```

3. Body sections:
   - Context (project scope; tenancy_model; tier list; release-cadence posture; regulatory posture if applicable)
   - Decision (coverage profile; per-category counts table from recommendation.json; per-test severity overrides + rationale; hybrid_resolution map if applicable)
   - Consequences (CI runtime impact; QG-M2 sign-off dependency; downstream `bmad-qa-generate-e2e-tests` consumes test-catalogue.json via the BMM overlay shipped by this skill)
   - Alternatives Considered (other coverage profiles; alternative severity bands; alternative per-model bypass enumerations)
   - Revisit triggers (tenancy_model migration; auth/routing/pool layer change; published peer-incident with test-translatable root cause; P5 ai ships design-model-cache-isolation → upgrade cross-tenant-cache from deferred to active; BMM ships bmad-design-test-strategy → revisit R3.2.6 deferred overlay)

4. Append row to `_bmad/_memory/atlas/architecture-decisions/INDEX.md`.

## Gate

Human approval — user reviews ADR before finalization.

## Next step

`step-07-v-verify-completeness.md`
