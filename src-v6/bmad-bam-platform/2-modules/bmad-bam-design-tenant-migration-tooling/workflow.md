# Workflow router — bmad-bam-design-tenant-migration-tooling

CEV (Create/Edit/Validate) workflow.

## Modes

### Create mode (default)

Greenfield migration-runbook design. Runs steps 01-c through 06-c, then verify (07-v).

1. `steps/step-01-c-elicit-context.md` — read 5 inputs (3 req, 2 soft); honor `--migration-axis` (tier|region|both — `both` resolves to `["tier","region"]`); elicit zero-downtime constraints, abort gates, observability hooks
2. `steps/step-02-c-load-options.md` — per active axis, load playbook templates: tier-axis (cohort-by-tier, billing-prorate, feature-flip, schema migration); region-axis (DNS cutover, dual-write, cross-DC blue-green, residency-aware cohort scoping)
3. `steps/step-03-c-decision-matrix.md` — per axis: cohort strategy × rollback approach × dry-run cadence
4. `steps/step-04-c-recommendation.md` — lock per-axis playbook (cohort_plan + dry_run_plan + rollback_gate + abort_criteria + observability_hooks)
5. `steps/step-05-c-write-design.md` — emit migration-runbook.md + .json to 3 locations (docs/architecture + QG-D1 primary + QG-M2 mirror)
6. `steps/step-06-c-record-adr.md` — write sidecar ADR
7. `steps/step-07-v-verify-completeness.md` — schema validation + per-axis 5-sub-field check + zero-downtime⇒no-cell_failback invariant + references_degraded consistency; emit QG-D1-migration-evidence.md (primary) + QG-M2-migration-evidence-mirror.md (mirror)

### Edit mode

Re-runs steps 02-06 (skipping elicit) when a previously-inactive axis is activated (e.g., the runbook had tier-only; now region is also needed). For configuration-only updates (cohort size; dry-run cadence), runs 04-06.

### Validate mode

Runs step-07-v alone against existing outputs; emits refresh report; bumps last_reviewed.

## Flags

- `--migration-axis {tier | region | both}` (default: `both`).
  - `tier`: only tier-upgrade playbook is designed; `migration_axes: ["tier"]` in output
  - `region`: only region-migration playbook is designed; `migration_axes: ["region"]` in output
  - `both`: both axes are designed; `migration_axes: ["tier", "region"]` in output (resolved at step-01)

The flag value normalizes alphabetically in step-07-v: `["region", "tier"]` and `["tier", "region"]` are equivalent.

## Convention

Outputs to `{project-root}/docs/architecture/` (narrative) and **two** evidence locations:
- `{project-root}/_bmad/bam/evidence/QG-D1/` — primary (gate sign-off)
- `{project-root}/_bmad/bam/evidence/QG-M2/` — mirror (H4 partial-proxy temporal contract until P10 ships full DR)

The `.json` file is byte-identical at both evidence locations. The two evidence narratives (`QG-D1-migration-evidence.md` primary, `QG-M2-migration-evidence-mirror.md` mirror) differ — the mirror is a short cross-link narrative pointing readers to the QG-D1 primary for detail.
