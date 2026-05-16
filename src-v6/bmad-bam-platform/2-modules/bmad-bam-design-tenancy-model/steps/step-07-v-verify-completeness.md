---
step_id: 07-v-verify-completeness
auto_runnable: true
gate: machine-checkable
inputs: [tenancy-model.md, ADR]
outputs: [QG-M2-partial-evidence.md]
---

# Step 07 — Verify completeness + emit QG-M2 partial evidence

## Purpose

Emit partial evidence for QG-M2 (Tenant Isolation gate). This step verifies the design-time portion. QG-M2 also requires runtime verification which comes from later workflows (`design-multi-tenant-testing`).

## Actions

1. Verify `tenancy-model.md` has all required sections (per Task 20 schema).
2. Verify ADR file exists with valid frontmatter.
3. Verify INDEX.md was updated.
4. Emit partial QG-M2 evidence file noting which criteria are now satisfied (H1 threat model from tenancy-model.md content; H5 onboarding implications outlined).
5. Emit retrospective note: which assumptions in the design depend on inputs that should be re-verified at QG-P1 (Production Readiness).

## Output

Write `{project-root}/_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/criteria-met-partial.md` per std-validation:

```markdown
---
gate_id: QG-M2
verified_at: <ISO>
verified_by: atlas
auto_checkable_pct: 0
human_review_pct: 30
result: pass-partial
---

## Criteria summary

| Criterion | Status | Evidence |
|---|---|---|
| H1 threat model | pass | docs/architecture/tenancy-model.md ## Risks |
| H5 onboarding implications | pass | docs/architecture/tenancy-model.md ## Migration trigger |
| C1-C5 + H2-H4 | deferred | Requires design-multi-tenant-testing, design-modular-monolith, design-tenant-onboarding workflows |

## Evidence

- docs/architecture/tenancy-model.md
- _bmad/_memory/atlas/architecture-decisions/<id>-tenancy-model.md
- _bmad/bam/cache/tenancy-design/<date>/* (intermediate cache)
```

## Gate

Machine-checkable: evidence file exists + frontmatter parses + auto_checkable_pct + human_review_pct sum reasonable.

## Workflow complete

`bmad-bam-design-tenancy-model` Create mode done.
