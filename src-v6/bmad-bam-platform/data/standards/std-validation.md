---
id: std-validation
title: BAM verify-* Workflow Output Standard
category: standard
kind: fragment
qg_ref: null
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references: ["docs/v6-final-architecture.md#8-quality-gates--release-gates"]
tested-against: []
---

# Validation Output Standard

All `verify-*` workflows MUST emit evidence in this format. Stored in `_bmad/bam/evidence/<gate-id>/YYYY-MM-DD-NNN/`.

## Required files per run

| File | Purpose | Schema |
|---|---|---|
| `criteria-met.md` | Per-criterion pass/fail/waived with evidence pointers | See §criteria-met schema |
| `decision.md` | Final outcome + signer (human or AI persona) | See §decision schema |

## Optional files

| File | When |
|---|---|
| `artifacts/` directory | If supporting docs (test reports, logs) need to live alongside |
| `retrospective.md` | Optional learnings; recommended after blocking-fail recovery |

## `criteria-met.md` schema

YAML frontmatter (required):

```yaml
gate_id: QG-M2
verified_at: <ISO-8601 UTC>
verified_by: <persona code or user>
auto_checkable_pct: <int 0-100>
human_review_pct: <int 0-100>
result: pass | fail | waived
```

Body (required sections):
- `## Criteria summary` — table of criteria with pass/fail/waived per item
- `## Evidence` — pointers to artifacts/, external logs, test runs

## `decision.md` schema

YAML frontmatter (required):

```yaml
gate_id: QG-M2
decided_at: <ISO-8601 UTC>
decided_by: <persona code or user>
outcome: pass | fail | waived
```

Body (required sections):
- `## Outcome rationale` — why this outcome
- `## Conditions` — any conditional pass; what must hold for the pass to remain valid
- `## Next gate` — what gate (if any) is unblocked by this decision
