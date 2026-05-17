---
id: tenancy-as-afterthought
title: Tenancy as Afterthought
kind: anti-pattern
category: foundation
qg_ref: QG-M2
last_reviewed: 2026-05-17
version: 1.0.0
status: active
severity: high
applicability:
  - greenfield: must-avoid
  - brownfield: must-fix
references:
  - "docs/v6-final-architecture.md §6.1"
  - "_bmad/_memory/atlas/architecture-decisions/ADR-008-tenancy-first-design.md"
  - "https://aws.amazon.com/blogs/apn/multi-tenant-saas-storage-strategies/"
---

# Tenancy as Afterthought

Adding multi-tenancy *after* the schema, codebase, and operational model are built. The team designed a single-tenant product (or a thinly-multi-tenant prototype) and is now retrofitting tenant boundaries onto a system that was not designed for them. This anti-pattern is the single highest-cost mistake in SaaS architecture; rough estimates put the retrofit cost at 6–18 engineer-months for a 50k-LOC system, plus the inevitable production incidents during transition.

## What it looks like

A team has built a working product that serves a handful of customers. Initially, each customer got either (a) a separate deployment with their own database, or (b) a shared deployment where customer scoping was implicit ("user X belongs to company Y" but `company_id` is not a hard boundary, just a foreign key). Growth pressure or contractual requirements now demand "real" multi-tenancy — isolation guarantees, per-tenant billing, per-tenant capacity, the works.

The team's instinct is to retrofit. They add `tenant_id` columns to tables that are missing them. They sprinkle `WHERE tenant_id = ?` filters across query layers, hoping to catch every code path. They add a "tenant context" thread-local or middleware and hope every service respects it. They add Row-Level Security policies as a defensive net, but cannot turn them on universally because some legacy reports still issue cross-tenant queries that were never identified as such. They add a billing system that joins to a `tenants` table that is now load-bearing across the entire codebase, even though half the schema does not reference it.

Six months in, the retrofit is "mostly done". RLS is enabled in production, but exempted for a list of "internal" service accounts because three teams have not finished their migration. Cross-tenant data leaks have happened twice, each fixed with a hotfix that addressed the specific leak without addressing the systemic cause. The audit team has flagged tenancy as a "control deficiency" because the operational evidence of isolation cannot be produced. Engineers describe the system as "scary to change" — every PR has to reason about tenant boundaries because they are implicit, not structural.

This is tenancy as afterthought. The product *appears* multi-tenant from the outside, but the boundary is held together by code-review vigilance rather than by structure. The first sustained cross-tenant breach is a matter of when, not if.

## Why it's wrong

The retrofit approach fails for several compounding reasons:

- **Tenant boundary is not centralized.** Every developer must remember to apply tenant scoping at every new query, every new endpoint, every new background job, every new analytics query. Human vigilance does not scale; the half-life of "everyone always remembers" in a growing engineering org is approximately one new hire.

- **Existing code paths were never written with tenancy in mind.** Reports, background jobs, batch processors, and internal admin tools were built when "the data" meant "all the data". Retrofitting these surfaces a long tail of cross-tenant queries; you find them by causing incidents.

- **RLS-as-defense is incomplete by definition.** RLS protects database queries — it does not protect ORM-level joins that fetch cross-tenant data via a relationship traversal, it does not protect cache layers that may have been populated with cross-tenant keys, it does not protect search indices that may have been built without tenant partitioning, and it does not protect log/metric pipelines that may have aggregated across tenants.

- **Operational evidence is impossible to produce.** Auditors ask "show me, for a given tenant, where their data is stored and how access is restricted". A retrofitted system cannot answer this — the data is everywhere, the restriction is "we check, mostly". This is a fail at SOC2 Type II audit.

- **Cost of full migration grows super-linearly.** Each new feature added during the retrofit must also be retrofitted; the retrofit's own surface area grows. Many teams give up at 70% completion and live with the partial fix indefinitely — paying the operational tax forever.

## What to do instead

Tenancy must be a first-class architectural commitment from day one of the multi-tenant product. Specifically:

- **Apply [[tenancy-decision-framework]] before the first schema migration.** Choose RLS, schema-per-tenant, cell-based, or hybrid. Document the choice in an ADR. Treat the decision as immutable for the first 12 months.

- **Make `tenant_id` a structural primitive.** Every data model must require it as part of its identity. Use ORM-level enforcement (a base class that requires tenant scoping) or DB-level enforcement (NOT NULL, foreign key to tenants table). Never optional.

- **Bake tenancy into the request lifecycle.** Every inbound request resolves to a tenant in the auth layer; every database connection or session inherits that tenant; every background job is enqueued with a tenant context. No code below the auth boundary needs to "remember".

- **Run [[tenant-isolation-testing-patterns]] from the first release.** Cross-tenant attack tests in CI on every PR. The test suite catches regression at code-review time, not at audit time.

- **Pass QG-M2 before shipping.** The QG-M2 checklist is the gate that prevents the afterthought pattern from accumulating. If QG-M2 is failing, the system is not ready for multi-tenant production traffic.

- **For runtime-side concerns (Nova), apply the same discipline.** AI agent contexts, vector stores, and embedding indices must be tenant-scoped from day one of those features as well. Tenancy-as-afterthought in the AI layer is the *next* generation of this anti-pattern.

## Recovery path (brownfield)

If you have already built a system with tenancy-as-afterthought, here is a defensible recovery plan. The plan is intentionally conservative — retrofitting tenancy under production load is high-risk; haste makes incidents.

1. **Inventory.** Catalog every table, every service, every background job, every analytics query, every cache key, every search index. Mark each as "tenant-scoped" or "needs scoping". This list is the migration's denominator.

2. **Choose the target model.** Apply [[tenancy-decision-framework]] to pick the target tenancy model. Greenfield-quality decision; do not let path dependency drag the choice.

3. **Add `tenant_id` (or schema/cell) to schema first.** Migrate the schema before migrating the code. Use database-level constraints (NOT NULL, FK) and let migrations fail loudly if data is incomplete; backfill before adding NOT NULL.

4. **Add isolation enforcement as overlay.** RLS policies on top of an existing schema work as long as you have a clear plan to retire bypasses. Start with policies in *log-only* or *test-only* mode; flip to enforce after observing test results. Track the bypass list explicitly; treat reducing it as a quarterly OKR.

5. **Migrate code paths in priority order.** Tenant-facing first (every API endpoint), then async (background jobs, webhooks), then operational (reports, admin tools). Each migration is a separate PR with its own test.

6. **Build the isolation test suite.** Apply [[tenant-isolation-testing-patterns]] retroactively. The suite codifies "what is broken" and "what is fixed". Run on every PR from now on.

7. **Run two tenants in pre-prod load test.** Stress-test the isolation boundary under realistic concurrent load before declaring the retrofit complete. Many isolation bugs only appear under contention (planner caching across tenants, connection pool affinity, etc.).

8. **Plan for 6–18 engineer-months.** Be honest with stakeholders. Underestimating the retrofit is a leadership failure that compounds the original architectural one.

9. **Until retrofit complete, gate new tenants.** Some teams choose to pause onboarding new tenants until tenancy is solid; others continue onboarding but flag the risk in customer contracts. Either is defensible; *not* having a stance is not.

## Cross-references

- Tenancy framework: [[tenancy-decision-framework]] — the cure for greenfield projects.
- Implementation patterns: [[rls-deep-dive]], [[schema-per-tenant]], [[cell-based-architecture]] — apply after the framework chooses one.
- Test catalog: [[tenant-isolation-testing-patterns]] — required at QG-M2 and through retrofit recovery.
- Related anti-pattern: [[deployment-without-cohorts]] — usually co-occurs.
- Gate: `QG-M2` — the gate that prevents this anti-pattern.
- ADR: `_bmad/_memory/atlas/architecture-decisions/ADR-008-tenancy-first-design.md` — establishes the tenancy-first principle.
- Spec: `docs/v6-final-architecture.md` §6.1.
