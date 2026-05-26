---
step_id: 06-c-record-adr
auto_runnable: false
gate: human-approval
inputs: [recommendation.json, onboarding-flow.md]
outputs: [<NNN>-tenant-onboarding-decision.md ADR]
---

# Step 06 — Record sidecar ADR

## Purpose

Write project-level sidecar ADR documenting per-tier flow choices + rationale.

## Actions

1. Determine ADR number: scan `_bmad/_memory/atlas/architecture-decisions/` for next available; format `YYYY-MM-DD-NNN-tenant-onboarding-decision.md`.

2. Write ADR with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: Tenant onboarding flow decisions for <project>
status: accepted
date: <date>
persona: atlas
related-personas: []
modules: [<your-project-modules>]
supersedes: null
superseded-by: null
assumptions: []
dependencies-on-other-decisions: [<P3.1 tier-model + tenancy ADRs>]
generated-by: bmad-bam-design-tenant-onboarding
authored-by: collaborative
---
```

3. Body sections: Context (project scope) / Decision (per-tier table from recommendation.json) / Consequences / Alternatives Considered / Revisit triggers.

4. Append row to `_bmad/_memory/atlas/architecture-decisions/INDEX.md`.

## Gate

Human approval — user reviews ADR before finalization.

## Next step

`step-07-v-verify-completeness.md`
