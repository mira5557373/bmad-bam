---
step_id: 06-c-record-adr
auto_runnable: false
gate: human-approval
inputs: [recommendation.json, migration-runbook.md]
outputs: [<NNN>-tenant-migration-tooling-decision.md ADR]
---

# Step 06 — Record sidecar ADR

## Purpose

Write project-level sidecar ADR documenting per-axis migration playbook choices: active axes, cohort strategies, rollback methods, dry-run cadences, zero-downtime constraint, references state.

## Actions

1. Determine ADR number: scan `_bmad/_memory/atlas/architecture-decisions/` for next available; format `YYYY-MM-DD-NNN-tenant-migration-tooling-decision.md`.

2. Write ADR with frontmatter:

```yaml
---
id: YYYY-MM-DD-NNN
title: Tenant migration tooling decisions for <project>
status: accepted
date: <date>
persona: atlas
related-personas: [kai]
modules: [<your-project-modules>]
supersedes: null
superseded-by: null
assumptions:
  - "Active migration axes: <list from migration_axes>"
  - "Zero-downtime required: <true|false> — drives rollback-method eligibility (cell_failback blocked when true per spec invariant 12)"
  - "(if tier-axis) Billing proration mandatory at upgrade timestamp; full-price-from-day-N is anti-pattern (tier-upgrade-without-billing-prorate.md)"
  - "(if region-axis) Residency consent obtained BEFORE any boundary-crossing data movement (GDPR Art 6 + Schrems II)"
  - "(if risk_stratified) First cohort is 1-tenant canary; subsequent cohorts ≥10 tenants (migration-cohort-selection.md)"
  - "(if references_degraded) <which soft input> was malformed; downstream consumes generic provisioning/tear-down instead"
dependencies-on-other-decisions: [<P3.1 tier-model + tenancy + deployment-topology ADRs>, <P3.2 onboarding/offboarding ADRs if soft inputs present>]
generated-by: bmad-bam-design-tenant-migration-tooling
authored-by: collaborative
---
```

3. Body sections:
   - **Context** (project scope; migration triggers driving this design — e.g., adding new tier, regulatory deadline for EU residency; tenant count; zero-downtime business requirements)
   - **Decision** (per-axis playbook table from recommendation.json; cohort strategies; rollback methods; dry-run cadences; abort criteria; observability hooks; references state including degraded flag)
   - **Consequences** (cost — 2x capacity for blue-green; operational overhead — per-cohort sign-off for risk_stratified; cross-region replication cost when region-axis active; billing-engine integration burden for tier-axis; regulatory dependencies for region-axis)
   - **Alternatives Considered** (other rollback methods; other cohort strategies; not-doing-region-axis if tier-only was viable; not-doing-tier-axis if pricing model is static)
   - **Revisit triggers** (new tier added → re-run tier-axis Edit mode; new region added → re-run region-axis Edit mode; pricing-model change; residency regulation change; P10 ships full DR → re-evaluate QG-M2 mirror requirement → remove mirror copy + simplify to single-location write under QG-D1 only)

4. Append row to `_bmad/_memory/atlas/architecture-decisions/INDEX.md`.

## Gate

Human approval — user reviews ADR before finalization.

## Next step

`step-07-v-verify-completeness.md`
