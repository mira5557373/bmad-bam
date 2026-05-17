---
step_id: 06-c-record-adr
auto_runnable: false
gate: human-approval
inputs: [recommendation.json, offboarding-policy.md]
outputs: [<NNN>-tenant-offboarding-decision.md ADR]
---

# Step 06 — Record sidecar ADR

## Purpose

Write project-level sidecar ADR documenting per-tier deletion-mode choices + regulatory profile + retention rationale + legal-holds.

## Actions

1. Determine ADR number: scan `_bmad/_memory/atlas/architecture-decisions/` for next available; format `YYYY-MM-DD-NNN-tenant-offboarding-decision.md`.

2. Write ADR with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: Tenant offboarding policy decisions for <project>
status: accepted
date: <date>
persona: atlas
related-personas: [kai]
modules: [<your-project-modules>]
supersedes: null
superseded-by: null
assumptions:
  - "Regulatory profile <profile> chosen on the basis of <reason>"
  - "Legal-holds (if any) honored over tier deletion policy"
dependencies-on-other-decisions: [<P3.1 tier-model + tenancy ADRs>, <P3.2 onboarding ADR if applicable>]
generated-by: bmad-bam-design-tenant-offboarding
authored-by: collaborative
---
```

3. Body sections:
   - Context (project scope; regulatory environment; reason for profile choice)
   - Decision (regulatory_profile; per-tier deletion-mode table from recommendation.json; tear-down hook catalog; cross-module handoffs)
   - Consequences (storage / cost / customer-trust / regulator-defensibility implications)
   - Alternatives Considered (other regulatory profiles; per-tier mode trade-offs)
   - Revisit triggers (regulatory environment change; new tier added; legal-hold expiry; vendor change for any handoff module)

4. Append row to `_bmad/_memory/atlas/architecture-decisions/INDEX.md`.

## Gate

Human approval — user reviews ADR before finalization.

## Next step

`step-07-v-verify-completeness.md`
