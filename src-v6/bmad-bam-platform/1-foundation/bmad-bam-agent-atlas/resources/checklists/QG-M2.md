---
id: QG-M2
title: Tenant Isolation
module: bmad-bam-platform
phase: solutioning
criticality: blocking
depends-on: [QG-F1, QG-M1]
evidence-depends-on:
  - QG-F1/tenancy-decision.md
  - QG-M1/criteria-met.md
auto-checkable: 50
human-review: 50
last_reviewed: 2026-05-12
version: 1.0.0
status: active
---

# QG-M2 — Tenant Isolation

## Purpose

Verify that the chosen tenancy model (decided at QG-F1) is correctly implemented at the module-architecture level: tenant context propagates through all code paths, isolation tests exist and pass, and no cross-tenant leakage is possible by construction.

## Criteria

### Automatable (machine-checkable, 50%)

- **C1 — Tenant isolation tests exist** — Test suite has a dedicated tenant-isolation directory or tagged suite. Evidence: directory listing or test-tag query.
- **C2 — RLS policies present (if RLS chosen)** — All tenant-scoped tables have `ENABLE ROW LEVEL SECURITY` + policy. Evidence: schema introspection or migration grep.
- **C3 — Schema isolation present (if schema-per-tenant chosen)** — Connection pool routes by tenant; per-tenant schemas created on onboarding. Evidence: connection pool config + onboarding workflow inspection.
- **C4 — Cell-routing present (if cell-based chosen)** — Tenant → cell routing exists at gateway; intra-cell communication forbidden by network policy. Evidence: gateway config + network policy YAML.
- **C5 — Tenant-context-propagation linter passes** — Static analysis flags any DB query missing tenant context. Evidence: linter run output.

### Human-review (50%)

- **H1 — Tenant-isolation threat model exists** — Document enumerates attack vectors (SQL injection at tenant boundary, IDOR via session swap, cache-key collision, vector-DB cross-tenant retrieval, KV-cache cross-tenant residue). Each vector has a mitigation. Evidence: threat-model.md in design docs.
- **H2 — Onboarding/offboarding flow preserves isolation** — Reviewer confirms tenant lifecycle workflows don't introduce isolation gaps (e.g., shared resources during tenant creation). Evidence: design-tenant-onboarding output + reviewer sign-off.
- **H3 — Noisy-neighbor mitigation specified** — Quotas, rate limits, and fair-use enforcement defined per tenant tier. Evidence: design-rate-limit-per-tenant output.
- **H4 — Disaster recovery preserves isolation** — DR plan doesn't introduce isolation gaps (e.g., backup-restore-from-tenant-A-into-tenant-B). Evidence: design-disaster-recovery output (if QG-D1 ran).
- **H5 — Tenant onboarding has explicit "isolation-verified" step** — Onboarding workflow includes a check that newly-created tenant cannot see other tenants' data. Evidence: design-tenant-onboarding output step listing.

## **CRITICAL** — these must always pass for blocking-gate satisfaction

- C2/C3/C4 (whichever applies to the chosen tenancy model) MUST pass auto-check
- H1 (threat model) MUST exist and be reviewer-approved

## Pass conditions

- ALL criteria pass OR
- Some criteria waived via `waive-gate` workflow with compensating control documented

## Evidence destination

`_bmad/bam/evidence/QG-M2/YYYY-MM-DD-NNN/` with `criteria-met.md` + `decision.md` per `std-validation`.

## Web Research Queries (for refresh-knowledge)

- `multi-tenant SaaS isolation patterns {date}`
- `PostgreSQL RLS performance multi-tenant {date}`
- `cell-based architecture AWS {date}`
- `tenant isolation testing strategies {date}`
