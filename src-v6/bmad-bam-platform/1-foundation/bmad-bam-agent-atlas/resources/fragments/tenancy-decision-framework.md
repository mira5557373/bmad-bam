---
id: tenancy-decision-framework
title: Tenancy Model Decision Framework
category: tenant-isolation
kind: fragment
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://stripe.com/blog/multi-tenant-saas"
  - "https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html"
tested_against: []
---

# Tenancy Model Decision Framework

A structural decision aid for choosing among **row-level security (RLS)**, **schema-per-tenant**, **cell-based architecture**, and **hybrid** tenancy models. This is the foundation fragment consumed by `design-tenancy-model` (skill) to produce a defensible `tenancy-model.md` design artifact and an Atlas ADR.

The framework treats tenancy as a **debt-bearing decision**: the wrong choice costs 6–18 engineer-months to unwind once production tenant data exists. Choose with intent.

---

## When to Use

This framework applies when an architect must commit (or re-commit) to a tenancy model. Use it in these situations:

- **Greenfield SaaS at design time.** You are designing a new multi-tenant product and have **not yet shipped** tenant data to production. This is the cheapest point to choose — model migration cost is near zero. Run the framework before the first schema migration that introduces a `tenant_id` column or per-tenant schema.

- **Brownfield migration prep.** You already have one tenancy model in production (typically pooled RLS) and are evaluating whether to migrate to another (typically schema-per-tenant or cell-based) because of a scale, compliance, or blast-radius pressure. Use the framework to produce the **target-state** decision; pair it with a separate migration runbook (out of scope here).

- **Scale-tier crossing trigger.** Your existing model is hitting a structural ceiling — RLS planner overhead on 2k+ active tenants per Postgres instance, schema bloat past ~3k schemas per cluster, or a single noisy-neighbor incident has caused a cross-tenant SLO breach. The framework re-evaluates against the **next** scale tier rather than re-confirming the current one.

- **New regulated customer segment.** You serve SMB on pooled RLS and are now selling into healthcare, defense, or EU public-sector. The new compliance frameworks (HIPAA BAA scope, FedRAMP boundary, EU data-residency) may force a stronger isolation tier for those tenants without forcing a full migration of existing tenants — the framework supports a **hybrid** recommendation.

- **Acquisition or merger.** You are absorbing a SaaS product with a different tenancy model and need to decide: integrate into your model, keep theirs as a cell, or run them as a separate platform. The framework's inputs and trade-off matrix scope this conversation.

- **Post-incident architectural review.** A cross-tenant data leak, a noisy-neighbor SLO breach, or an auditor finding has forced a structural review. Use the framework to ground the post-mortem's "what should the target architecture be" question in evidence, not in incident-driven panic.

- **Annual architecture review.** Many engineering orgs run a yearly platform review; the framework provides a defensible artifact for the "is our tenancy model still the right one" answer. Output the Inputs snapshot even if the recommendation does not change — the snapshot is the *diff target* for next year's review.

If none of these apply, the decision is probably already made and stable — stop here.

---

## When NOT to Use

Skip this framework when:

- **Tenancy is already chosen and stable.** You have ≥6 months of production traffic on the current model, no scale/compliance pressure, and no blast-radius incidents. Re-running the framework here is decision-theater — the cost of re-deciding (analysis paralysis, stakeholder churn) exceeds the option value.

- **Product is single-tenant by design.** Per-customer dedicated installs (on-prem, customer VPC deployments, sovereign-cloud installs) are not "multi-tenancy" — they are a software-distribution problem. Use packaging, IaC, and release-channel frameworks instead.

- **Per-customer dedicated deployment.** You sell only to a handful of large enterprises that each get a dedicated VPC, dedicated cluster, dedicated data plane. This is "silo" tenancy at the infrastructure layer; the application-layer tenancy model is trivially "one tenant per deployment". Don't run the framework — run a deployment-template skill instead.

- **Pre-PMF prototype.** You have <10 customers, no signed commercial contracts, and the product may pivot in 6 months. Premature tenancy commitment burns runway. Default to **RLS with `tenant_id` everywhere** and revisit the framework once you have a 12-month tenant projection backed by signed pipeline.

- **Decision already constrained by external mandate.** Your customer's procurement or your parent company's security org has mandated a specific isolation tier (e.g., "all PHI must be in a dedicated database"). The choice is made; use the framework's **Output Specification** section to document the *rationale*, but don't pretend the inputs are open.

---

## Decision Inputs

The framework requires the following inputs. Gather these **before** running the decision tree. Inputs missing or hand-waved should be flagged as risk items in the output.

| Input | Type | Required | Typical Source | Notes |
|---|---|---|---|---|
| `tenant_count_projection_12mo` | integer | yes | Sales pipeline × win-rate, board plan | Use P50 and P90; framework consumes P90. Distinguish *active* (paying, traffic-generating) from *signed* (contract exists, not yet onboarded). |
| `compliance_frameworks` | enum set | yes | Legal, security, customer contracts | Subset of `{SOC2, HIPAA, PCI-DSS, GDPR, FedRAMP-Moderate, FedRAMP-High, IL4, IL5, CJIS, ISO27001}`. Empty set is valid (early-stage B2B). |
| `scale_target_segment` | enum | yes | GTM strategy | One of `{SMB, mid-market, enterprise, public-sector, mixed}`. Mixed forces hybrid consideration. |
| `blast_radius_tolerance` | enum | yes | SLO + customer contracts | `{any-tenant-impacts-all, tier-scoped, single-tenant-only}`. Tier-scoped is the cell-based motivator. |
| `ops_team_size` | integer | yes | Engineering org chart | FTE count owning production. Used to evaluate ops-complexity affordability. <5 disqualifies models with high ops overhead. |
| `cost_ceiling_per_tenant` | USD / month | yes | Unit economics from finance | Includes infra + license + ops amortized. Free-tier tenants set this at $0.50–$2; enterprise can absorb $200+. |
| `multi_region` | enum | yes | Product req | `{single-region, multi-region-active-passive, multi-region-active-active, residency-pinned}`. Residency-pinned (EU data must stay in EU) interacts strongly with cell choice. |
| `data_volume_per_tenant_p90` | bytes | yes | Telemetry or analog | P90 row count, blob bytes, vector dimensions. >10 GB/tenant pushes against pooled RLS. |
| `greenfield_or_brownfield` | enum | yes | Project context | `{greenfield, brownfield-no-migration, brownfield-with-migration}`. Brownfield-with-migration enables hybrid solutions. |
| `noisy_neighbor_history` | enum | recommended | Incident review | `{none, occasional, frequent}`. Frequent pushes toward schema or cell. |
| `team_postgres_expertise` | enum | recommended | Honest team assessment | `{novice, intermediate, expert}`. RLS in production needs intermediate+. |
| `latency_p99_budget_ms` | integer | recommended | SLO doc | RLS planner overhead consumes 1–8 ms per query at scale; budget-tight workloads should know. |

**Input-gathering anti-patterns:** never accept "growth will be exponential" as a tenant-count projection; never accept "we'll figure compliance out later" if the segment touches healthcare or government; never accept hand-waved ops headcount.

### Input notes

- `tenant_count_projection_12mo`: use P90 from your sales-pipeline model, not P50. Tenancy decisions live longer than projections do; biasing toward over-provisioning costs 10–20% extra infra spend, while biasing toward under-provisioning costs an unscheduled migration.

- `compliance_frameworks`: include frameworks you have *signed contracts* for OR have *active commercial pipeline* for in the next 12 months. Do not pre-include frameworks based on long-term aspiration — that bias inflates the recommendation toward unnecessary isolation.

- `blast_radius_tolerance`: derive from customer-facing SLA, not from internal SLO. A 99.9% SLA against "any single tenant" allows pooled models; a 99.95% SLA against "any individual tenant in isolation" forces cell-based or schema-with-replica.

- `cost_ceiling_per_tenant`: must be the *fully-loaded* cost — infra, license, on-call amortization, support amortization. A "$10 infra ceiling" that ignores $40 of support labor per tenant is a fictional constraint.

- `data_volume_per_tenant_p90`: measure or analog from a comparable product. Vector-store-heavy workloads (RAG, embeddings) skew this dramatically; a 50k-document tenant with text-embedding-3-large embeddings = ~1.5 GB just in vectors.

- `team_postgres_expertise`: be honest. RLS in production with a novice team is the single highest-risk combination in the framework. If the team is novice, recommend schema-per-tenant or migrate-to-managed (Supabase, Neon) where the platform encodes some RLS guard-rails.

---

## Decision Tree

The tree below is the **primary** decision path. Treat it as a guided traversal — every leaf is an option, not an answer. The recommendation is the leaf, but the **rationale** (captured in the output) is the path. When two inputs conflict (e.g., low cost ceiling + strong isolation requirement), the conflict itself is the finding; surface it in the output rather than silently picking one input as dominant.

```
START: tenancy decision
  │
  ├─ compliance_frameworks ∩ {FedRAMP-High, IL4, IL5, CJIS} ≠ ∅ ?
  │   └─ YES ─► Strong isolation mandatory
  │             │
  │             ├─ scale_target_segment = public-sector only?
  │             │   └─ YES ──► CELL-BASED (per-segment cell, sovereign region)
  │             │   └─ NO  ──► HYBRID (cell for regulated, RLS for rest)
  │             │
  │   └─ NO ──► continue
  │
  ├─ blast_radius_tolerance = single-tenant-only ?
  │   └─ YES ──► tenant_count_projection_12mo
  │             ├─ < 100   ──► CELL-BASED (one cell per tenant; ~database-per-tenant)
  │             ├─ 100–500 ──► CELL-BASED (tiered cells, ~50 tenants/cell)
  │             └─ > 500   ──► STOP: cost model likely unviable;
  │                            re-negotiate blast-radius SLO with customer.
  │   └─ NO  ──► continue
  │
  ├─ tenant_count_projection_12mo (P90)
  │   │
  │   ├─ < 50 ─────────────────► RLS (default; cheapest, most flexible)
  │   │                          │  unless compliance_frameworks ∩ {HIPAA, PCI-DSS} ≠ ∅
  │   │                          │  AND ops_team_size ≥ 5
  │   │                          │   └─► SCHEMA-PER-TENANT (auditor-friendly,
  │   │                          │       per-tenant backup/restore trivial)
  │   │
  │   ├─ 50–1,000 ─────────────► branch on scale_target_segment
  │   │   │
  │   │   ├─ SMB / mid-market ──► RLS (pooled)
  │   │   │                       │  Watch: data_volume_per_tenant_p90 > 10 GB
  │   │   │                       │   └─► partition by tenant_id + RLS
  │   │   │
  │   │   ├─ enterprise ────────► SCHEMA-PER-TENANT
  │   │   │                       │  (auditor-pleasing, per-tenant tuning)
  │   │   │                       │  with pgBouncer transaction-pooling
  │   │   │
  │   │   └─ mixed ─────────────► HYBRID
  │   │                          (RLS for SMB tier, schema for enterprise tier)
  │   │
  │   ├─ 1,000–10,000 ─────────► branch on noisy_neighbor_history + ops_team_size
  │   │   │
  │   │   ├─ noisy=frequent OR ops≥10 ──► CELL-BASED
  │   │   │                                (~200–500 tenants/cell, deterministic routing)
  │   │   │
  │   │   └─ otherwise ────────────────► RLS + READ-REPLICAS + PARTITIONING
  │   │                                   (delay cell investment, monitor planner cost)
  │   │
  │   └─ > 10,000 ─────────────► CELL-BASED (mandatory; pooled RLS planner
  │                              overhead and connection economics break here)
  │                              │
  │                              ├─ multi_region = residency-pinned?
  │                              │   └─► CELL-BASED with residency-aware routing
  │                              │       (one or more cells per residency zone)
  │                              │
  │                              └─ otherwise ─► CELL-BASED with hash routing
  │
  └─ END
```

**Reading the tree:**

- The tree is **short-circuit**: compliance and blast-radius gates fire first because they are *constraints*, not preferences. A FedRAMP-High requirement does not negotiate with a tenant-count projection.
- Default path for a "normal" B2B SaaS — SMB/mid-market, SOC2 only, <1k tenants, 5–10 ops engineers, no noisy-neighbor history — is **RLS**. This is intentional: RLS has the lowest activation energy and is the easiest to migrate *away from* if pressure later mounts. Premature schema-per-tenant or cell choice is a more common failure mode than premature RLS.
- HYBRID recommendations always carry a **bridging cost**: two operational playbooks, two backup strategies, two query-path test matrices. Only recommend HYBRID when the segment-mix is durable (i.e., you will continue serving both SMB and enterprise for ≥3 years).

### Worked example (typical mid-market B2B)

Inputs:
- `tenant_count_projection_12mo` = 600 (P90)
- `compliance_frameworks` = {SOC2}
- `scale_target_segment` = mid-market
- `blast_radius_tolerance` = tier-scoped
- `ops_team_size` = 6
- `cost_ceiling_per_tenant` = $40/mo
- `multi_region` = single-region
- `data_volume_per_tenant_p90` = 800 MB
- `greenfield_or_brownfield` = greenfield
- `noisy_neighbor_history` = none

Traversal:
1. Compliance gate (FedRAMP-High / IL4 / IL5 / CJIS) — empty intersection, skip.
2. Blast-radius gate — `tier-scoped`, not `single-tenant-only`, skip cell forcing.
3. Tenant-count branch — 600 → `50–1,000` range → branch on segment.
4. Segment = mid-market → **RLS (pooled)** leaf, with data-volume watch (800 MB << 10 GB, no partitioning needed).

Recommendation: **RLS**. The output's *Rationale* records this path verbatim, and the *Migration path* section notes that schema-per-tenant is reachable in ~1 engineer-week setup + ~5 minutes/tenant should the segment shift toward enterprise.

### Traversal failure modes to watch

- **Premature optimization.** Architect picks cell-based because "we want to support enterprise eventually". Tenant count is 30. Cell-based ops overhead burns 1–2 FTE annually that the team does not have. Falsifier: cost ceiling cell from Trade-offs matrix.
- **Compliance theater.** Framework intersection is empty but architect picks schema-per-tenant "for auditors". Auditors do not require schema-per-tenant for SOC2; this is folklore. Falsifier: cite the actual controls (CC6.1, CC6.7) — RLS satisfies them with policy testing.
- **Single noisy-neighbor incident → cell migration.** One outage triggers a cell-based recommendation when the underlying cause was a missing query timeout. Falsifier: require `noisy_neighbor_history = frequent` AND a root-cause analysis ruling out application-layer fixes.
- **Hybrid as procrastination.** Architect cannot decide between RLS and schema, picks hybrid. This is the worst outcome: hybrid's ops cost is super-additive. Falsifier: require segment-mix durability ≥3 years AND a named seam owner.

### Worked example (regulated enterprise add-on)

Inputs differ only in:
- `compliance_frameworks` = {SOC2, HIPAA}
- `scale_target_segment` = mixed (existing SMB cohort + new healthcare enterprise cohort)

Traversal yields **HYBRID** (RLS for SMB tier, schema-per-tenant for healthcare tier). Output's *Ops implications* must call out the seam owner and the per-tenant-tier promotion runbook.

---

## Output Specification

The `design-tenancy-model` workflow uses this framework to produce a single artifact, `tenancy-model.md`, plus an Atlas ADR. The artifact MUST contain the following sections, in order:

1. **Chosen model** — one of `rls` / `schema-per-tenant` / `cell-based` / `hybrid`. If hybrid, list each sub-model and the tenant segment it applies to.

2. **Rationale** — the *path* traversed through the Decision Tree, not just the leaf. For each branch taken, cite the input value and the rule that fired. Include any input conflicts surfaced during the traversal and how they were resolved. Length target: 30–60 lines.

3. **Inputs snapshot** — the full Decision Inputs table from §"Decision Inputs", with concrete values supplied by the architect at decision time. This is the **immutable** record of "what we believed about the world when we chose". Future re-evaluations diff against this snapshot.

4. **Migration path** — if brownfield, the high-level shape of the migration from current to target model. Not the runbook itself (that is a separate artifact) but the *strategy*: lift-and-shift, dual-write + cutover, blue/green, expand/contract. Include a coarse cost estimate (engineer-weeks) and a "stop conditions" list — events that would force re-decision mid-migration.

5. **Isolation tests required** — concrete tests the QG-M2 gate will require. Examples: "cross-tenant SQL injection via `tenant_id` parameter tampering", "RLS bypass via `SET ROLE` escalation in worker process", "schema confusion via search_path manipulation". Reference the `tenant-isolation-testing-patterns` fragment for the test catalog.

6. **Ops implications** — how this choice changes day-2 operations: backup/restore granularity, schema migration strategy (single deploy vs. per-tenant), connection pooling topology, observability cardinality (per-tenant metrics — yes/no?), capacity planning unit (tenants per instance vs. instances per region).

7. **Threat-model summary** — a short STRIDE-style summary against tenant boundary crossings: which threats does the chosen model mitigate by construction, which require code-level controls, which are out of scope. **This section is verified at QG-M2.**

8. **Recommended next skills** — pointers to the deep-dive skills that elaborate this design (e.g., `bmad-bam-tenant-isolation` for RLS implementation, `bmad-bam-cell-routing` for cell-based — names are illustrative; consult `_bmad/bam/data/platform-index.csv`).

### Skeleton sub-schema

The workflow template enforces this skeleton (annotated minimum):

```markdown
# Tenancy Model — <product name>

## 1. Chosen model
<rls | schema-per-tenant | cell-based | hybrid>

## 2. Rationale
<traversal log: each branch, input value, rule that fired, any conflicts>

## 3. Inputs snapshot
<table from §"Decision Inputs" with concrete values>

## 4. Migration path
<lift-shift | dual-write+cutover | blue-green | expand-contract | N/A>
- Coarse cost: <engineer-weeks>
- Stop conditions: <bulleted list>

## 5. Isolation tests required
<bulleted test list, each linked to tenant-isolation-testing-patterns>

## 6. Ops implications
<backup granularity, migration strategy, pool topology, observability cardinality, capacity unit>

## 7. Threat-model summary
<STRIDE-style; verified by QG-M2>

## 8. Recommended next skills
<bulleted pointer list>
```

A `tenancy-model.md` that omits a section is **rejected at QG-M2**, not "fixed up later". The ADR companion captures the decision in short form (one screen) and links back to this artifact; ADR format follows `std-adr.md`.

### Length expectations per section

- §1 Chosen model: 1–3 lines.
- §2 Rationale: 30–60 lines (the bulk of the document's *intellectual* content).
- §3 Inputs snapshot: 15–25 lines (a filled-in table).
- §4 Migration path: 15–40 lines if brownfield; "N/A — greenfield" if greenfield.
- §5 Isolation tests required: 15–30 lines (bulleted, each test scoped to a threat).
- §6 Ops implications: 30–60 lines (this is where capacity math lives).
- §7 Threat-model summary: 20–40 lines.
- §8 Recommended next skills: 5–10 lines.

Total target: 130–270 lines. Documents shorter than ~100 lines are almost certainly missing depth in §2 or §6; documents longer than ~350 lines are usually padding §4 with migration *runbook* content that belongs in a separate artifact.

---

## Trade-offs

The matrix below characterizes the four options against five dimensions. Cells are calibrated against production SaaS deployments at the indicated tenant-count tiers; values shift if your inputs (data volume, ops size, latency budget) skew unusual.

| Dimension | RLS (pooled) | Schema-per-tenant | Cell-based | Hybrid (RLS + cell) |
|---|---|---|---|---|
| **Tenant-count fit** | Best ≤ ~1,500 active tenants per pg instance; planner overhead grows with policy complexity beyond that. | Best 100–3,000 tenants per cluster; schema enumeration cost (`pg_namespace` scans) degrades past ~3k schemas. | Best 1,000–100,000+ tenants; scales horizontally by cell, only bounded by control-plane routing throughput. | Tracks the higher of the two sub-models' ranges; effective ceiling = cell ceiling. |
| **Cost** | Lowest: one cluster, pooled connections via single pgBouncer, shared backups. Marginal cost per tenant ~$0.50–$3/mo at SMB scale. | Moderate: still single cluster, but per-schema migrations, per-tenant backup retention, larger connection pools. ~$3–$10/mo per tenant. | Highest: multiple clusters, routing layer, per-cell observability, per-cell deployment pipelines. ~$10–$80/mo per tenant (drops with cell density). | Sum of components weighted by tenant mix; ops overhead is super-additive (two playbooks, not one-and-a-half). |
| **Isolation strength** | Logical only. RLS policy is the *entire* boundary; one missing `USING` clause = cross-tenant leak. Auditors accept for SOC2; HIPAA and PCI-DSS treat with skepticism. | Schema boundary + per-schema GRANTs. Stronger logical separation; auditors view favorably. Still single OS process / single buffer cache — covert-channel arguments hold. | Physical: separate databases, separate networks, often separate AWS accounts. Strongest available short of dedicated hardware. Required for FedRAMP-High, IL4+, CJIS. | Variable by segment: regulated cells get cell-grade isolation, others get RLS-grade. Threat model must explicitly call out the seam. |
| **Migration cost to next tier** | Low → schema: dump-and-load per tenant, ~1 engineer-week setup + ~5 minutes per tenant. Medium → cell: requires data-plane build, ~3–6 engineer-months. | Medium → cell: per-schema export to cell-local cluster, ~2–4 engineer-months including routing. Low → RLS (downgrade): rare but feasible, ~2 engineer-weeks. | Effectively terminal: migrating *off* cells means consolidating back to pooled, which loses the isolation guarantee customers were sold. ~6–18 engineer-months and a sales conversation. | Migrating a tenant *between* sub-models is per-tenant cost, repeatable. Migrating away from hybrid altogether requires choosing a target and absorbing both cohorts' migration costs. |
| **Ops complexity** | Low. One deploy pipeline, one backup job, one alerting topology. Per-tenant metrics require tag cardinality (manageable to ~5k). RLS policy changes must be exhaustively tested (this is the main ops cost). | Medium. Per-tenant migrations require orchestration (10s of minutes for 1k tenants), per-tenant backup/restore is a feature (welcome) but doubles runbook surface. Connection pool sizing per schema is non-trivial. | High. Cell control plane is a distinct system. Capacity planning shifts to "tenants per cell"; rebalancing tenants between cells is a runbook of its own. Requires a dedicated platform team (≥5 FTE) to be sustainable. | High → very high. Inherits cell-based ops surface plus the seam itself (which-tenant-lives-where source of truth, segment-promotion workflow). Underestimate at your peril. |

**Reading the matrix:** the matrix is a *constraint* tool, not a scoring tool — do not sum cells. Use it to falsify a recommendation: if the Decision Tree leaf is "RLS" but `ops_team_size` is 2 and `data_volume_per_tenant_p90` is 50 GB, the matrix's *Tenant-count fit* and *Migration cost* cells reveal latent risk that should appear in the output's Rationale section.

### Common misreadings of the matrix

- "Cell-based has highest isolation, so we should always pick it." Wrong: cell-based isolation is *physical*, which is necessary for FedRAMP-High but overkill for SOC2. Excess isolation is not free — it is paid in cost, ops complexity, and migration debt.
- "RLS migration cost is low, so we can always retreat to it later." Wrong: the *forward* cost (RLS → schema) is low; the *reverse* cost (cell → RLS) is effectively the cost of admitting to customers you are weakening isolation. Treat the matrix's migration column as a directed graph.
- "Hybrid is a compromise so it has medium cost." Wrong: hybrid ops cost is super-additive, not the average. Two backup pipelines, two restore drills, two on-call playbooks. If the segment-mix is not durable, hybrid is the worst column.

### Anti-pattern signals from the matrix

If your inputs force the recommendation into a cell with a footnote like "drops with cell density" but your projected tenant count is 200, you are on the *unfavorable* side of the cost curve. Either:
- accept the cost premium and price the product accordingly, or
- defer the model choice until tenant count justifies the curve's good side, or
- consolidate with an adjacent product line to amortize cells.

---

## Quality Checks

Apply these checks before accepting the framework's recommendation as final. Failing any check should send the decision back for input refinement, not paper over.

- **CRITICAL:** verify no cross-tenant data path exists in the recommended option's threat model. For RLS, every table containing tenant data must have a policy *and* a corresponding test that proves cross-tenant `SELECT` returns zero rows under a non-superuser role. For schema-per-tenant, the search_path setting strategy and the role-grant model must be documented and reviewed. For cell-based, the routing layer's failure modes (stale routing → wrong cell → cross-tenant read) must be enumerated. Missing this check has been the root cause of every published multi-tenant data-leak incident through 2025 — do not skip.

- **Tenant-count projection comes from real data.** Sales pipeline × signed win-rate, board-approved plan, or trailing-12 actual count × growth multiplier. "Marketing says we'll be huge" is not data. If only a vibe-based projection is available, recommend the more conservative model and re-evaluate at 6 months.

- **Compliance scope confirmed in writing.** The list of compliance frameworks must come from a written customer requirement, a BAA, an RFP, or a signed contract — not from "the security team thinks". Audit scope changes the recommendation by a full tier in some branches.

- **Migration cost estimated for brownfield decisions.** Brownfield recommendations are incomplete without a coarse engineer-weeks estimate and a list of stop-conditions. An "ideal" target model that takes 18 engineer-months to reach may be worse than a "good-enough" target reachable in 3.

- **Ops team has been consulted.** The framework consumes `ops_team_size` as a number, but the team owning the production system should review the recommendation. A cell-based recommendation that lands on a 2-person ops team is a recipe for burnout and SLO violations regardless of the technical merits.

- **Latency budget verified against model overhead.** RLS adds 0.5–8 ms per query (median 1–2 ms for simple policies; higher for joined or recursive policies). If `latency_p99_budget_ms` minus current p99 is less than 5, RLS is risky. Schema-per-tenant has near-zero per-query overhead but higher connection-pool overhead.

- **Cost ceiling sanity-checked.** Divide the recommended model's per-tenant cost (from the Trade-offs matrix) by 3 — if it exceeds `cost_ceiling_per_tenant`, the recommendation is infeasible at unit-economics level. Surface this as a business decision, not a technical one.

- **Hybrid recommendations require explicit seam documentation.** If the leaf is HYBRID, the output's *Rationale* and *Ops implications* sections MUST describe the seam: who decides which tenant lives where, how tenants move between sub-models, who owns the migration runbook. Hybrid without a seam owner is a future-incident generator.

- **Reviewer rotation.** This decision must be reviewed by at least one engineer who is *not* the author of the framework traversal — fresh eyes catch self-justification. For decisions with cost ceilings under $5/tenant or compliance scope containing HIPAA/PCI-DSS, escalate to a principal-level reviewer.

- **Re-evaluation cadence baked in.** The output MUST specify a re-evaluation trigger (e.g., "re-run framework at 1,500 active tenants OR upon first FedRAMP-Moderate customer signing"). Decisions without an explicit re-evaluation trigger become load-bearing assumptions that are never challenged.

- **Tested in development against a synthetic tenant population.** Before the recommendation is committed to platform main, spin up a dev environment with at least 100 synthetic tenants and run the isolation tests against it. RLS and schema-per-tenant both have failure modes that only surface above ~50 tenants (planner-cache pressure, schema-enumeration cost). A green isolation-test run at 3 synthetic tenants proves very little.

- **Capacity-planning math documented.** For RLS: tenants per pg instance × P90 connections per tenant × pool ratio must fit `max_connections`. For schema: same plus `pg_namespace` size. For cell: tenants per cell × cell count × control-plane lookup latency must fit the routing-layer SLO. Show the math in the output's Ops Implications section, not in a separate spreadsheet that gets lost.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh the empirical inputs to the framework. The framework's *recommendations* are stable on a multi-year horizon; the *thresholds* (e.g., "1,500 tenants per pg instance") shift with Postgres major versions and cloud-pooler economics.

- `multi-tenant SaaS tenancy model selection {date}` — finds vendor blog posts and conference talks comparing RLS / schema / cell. Stripe, Notion, Linear, Render, Neon, AWS SaaS Factory are recurring authoritative sources.
- `Postgres row level security performance at scale {date}` — surfaces planner-overhead benchmarks; cross-check claims against `EXPLAIN ANALYZE` on your own workload before believing.
- `schema per tenant pgbouncer connection pool sizing {date}` — operational guidance on pool sizing when tenant count × per-tenant pool > effective max_connections.
- `cell-based architecture SaaS reference {date}` — AWS Well-Architected SaaS Lens, Slack's cell-based migration write-ups, Shopify pods.
- `HIPAA SOC2 multi-tenant data isolation requirements {date}` — auditor-facing guidance; note that the *letter* of the framework rarely mandates a specific tenancy model, but auditor *practice* does.
- `tenant isolation testing patterns {date}` — surfaces test-design articles; cross-link with the `tenant-isolation-testing-patterns` fragment.
- `multi-tenant database migration RLS to schema {date}` — empirical reports on migration cost and pitfalls; useful for brownfield migration-path estimation.

When a query returns content older than 18 months, treat as orientation only and seek a more recent source — the cloud-pooler and serverless-Postgres landscape (Neon, Aurora DSQL, Supavisor, etc.) is shifting fast enough that 2-year-old benchmarks may not hold.

### Source-quality heuristics

- **Vendor blogs.** Stripe, Notion, Linear, Shopify, Slack engineering blogs publish post-hoc rationalizations of decisions that worked *for them, at their scale*. Read for vocabulary and pattern names; do not lift recommendations directly without checking your inputs against theirs.
- **Cloud provider docs.** AWS SaaS Lens and Azure multi-tenant guidance are useful for vocabulary alignment; their recommendations skew toward services they sell.
- **Auditor-facing content.** ISACA, CSA, and similar publish what auditors *expect*. Useful for the compliance branch of the tree.
- **Academic / industrial-research.** SIGMOD/VLDB papers occasionally publish RLS-overhead measurements; treat as ground truth for *that* postgres version on *that* workload, not as universal numbers.

---

## Cross-references

**Companion fragments** (deeper treatment of each option):

- [[rls-deep-dive]] — RLS policy design, performance tuning, planner-overhead measurement, common policy pitfalls (recursive policies, policy-on-view-not-table).
- [[schema-per-tenant]] — schema lifecycle, pgBouncer transaction-pooling with per-schema connections, search_path strategy, per-schema migration orchestration.
- [[cell-based-architecture]] — cell sizing, routing-plane design, tenant-to-cell assignment, rebalancing, cell-local control planes.
- [[tenant-isolation-testing-patterns]] — the test catalog enforced at QG-M2: SQL-injection-as-tenant-attack, role-escalation, routing-staleness, search_path manipulation.

**Implementation patterns** (concrete how-to with code):

- [[rls-row-level-security]] — RLS policy templates, session-variable tenant-id pattern, common-table-expression interaction.
- [[schema-per-tenant-with-pgbouncer]] — connection-pool topology, schema-aware routing in application code.
- [[cell-based-with-routing]] — routing-layer design, hash vs. range vs. directory routing, residency-aware variants.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/1-foundation/bmad-bam-agent-atlas/resources/checklists/QG-M2.md`) — the gate this framework's output feeds. Every output produced via this framework MUST clear QG-M2 before merging to platform main.

**Related decisions:**

- Tenancy choice constrains AI-runtime tenant scoping (see Nova module, P3+). Decisions here propagate.
- Tenancy choice constrains observability cardinality strategy (per-tenant metrics, per-tenant logs). Surface this in the output's Ops Implications section.
- Tenancy choice interacts with the **billing model**. Per-tenant pricing requires per-tenant metering, which is cheap in schema-per-tenant and cell-based, harder in pooled RLS (every metric needs a `tenant_id` tag, raising observability-vendor cost).
- Tenancy choice constrains the **migration story for acquisitions**: cell-based platforms can absorb an acquired product as "a new cell" with minimal application changes; pooled RLS platforms must rewrite the acquired product's data model.
- Tenancy choice influences the **support engineer experience**: schema-per-tenant and cell-based allow safe per-tenant `psql` for incident response; pooled RLS makes ad-hoc tenant inspection a privilege-escalation risk. Document the chosen workflow in the output's Ops Implications section.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice), §6.2 (frontmatter schema). Defects to this framework's structure should be filed as spec patches, not unilateral changes.
- `std-frontmatter.md`, `std-validation.md`, `std-adr.md` (this module's standards). The ADR companion artifact follows `std-adr.md`.

**Downstream consumers:**

- `design-tenancy-model` skill (`src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/`) — primary consumer. The skill's `step-04-c-recommendation` consults this framework's Decision Tree directly; `step-05-c-write-design` enforces the Output Specification skeleton.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every traversal of this framework that produces a recommendation should also produce an ADR in this directory.
