---
id: per-tenant-cost-attribution-with-hooks
title: Per-Tenant Cost Attribution with Instrumentation Hooks
category: foundation
kind: fragment
qg_ref: QG-F1
last_reviewed: 2026-05-17
version: 1.0.0
status: active
author: atlas
tags: [finops, cost-attribution, instrumentation, multi-tenant, hooks]
references:
  - "FinOps Foundation, FinOps Framework (2024)"
  - "https://www.finops.org/framework/principles/"
  - "AWS Well-Architected — Cost Optimization Pillar"
  - "https://cloud.google.com/finops"
---

# Per-Tenant Cost Attribution with Instrumentation Hooks

**Per-tenant cost attribution** answers the question "How much did this specific tenant cost to serve last month?" with a defensible number. It is the prerequisite for per-tier unit economics (see `[[unit-economics-saas]]`), for usage-based pricing, for chargeback in B2B-platform offerings, and for the operational discipline of pruning expensive non-paying tenants. Without attribution, gross margin is a guess and cost-optimization spends effort in the wrong places.

R3 consolidated the separate per-tenant-attribution and instrumentation-hooks fragments into this combined treatment because attribution *is* the hook design — the two cannot be specified independently without redundancy and drift.

This fragment is consumed by `design-finops-model` (skill) as the mechanism layer, and by every storage/compute/network-touching foundation skill that must emit the right tags for attribution to work downstream.

---

## When to Use

Apply per-tenant cost attribution when:

- **You report unit economics per-tier.** The COGS line in unit economics (see `[[unit-economics-saas]]`) is only as good as the attribution underneath it.

- **You charge by consumption.** Usage-based pricing (per API call, per GB stored, per LLM token) requires per-tenant consumption tracking, which is the data substrate of cost attribution.

- **You have a free tier suspected of abuse.** Without attribution, "this 5% of free-tier tenants consume 60% of free-tier cost" is invisible. With attribution, the rule-of-thumb is one query away.

- **A tenant requests a chargeback report.** Enterprise tenants increasingly require "show us our infrastructure cost" reports. Per-tenant attribution makes this a query; without it, you can't fulfill the request.

- **You're optimizing infrastructure spend.** The Pareto principle holds: ~20% of tenants drive ~80% of cost. Without attribution, optimization spends effort uniformly when it should target the 20%.

- **Multi-tenant compliance frameworks require resource isolation evidence.** SOC 2, ISO 27001, and HIPAA controls increasingly expect organizations to demonstrate which tenant consumed which resources — attribution provides this evidence.

---

## When NOT to Use

Skip per-tenant cost attribution when:

- **You have < 10 tenants.** A 10-tenant platform can read the cloud bill and the per-tenant pattern is visible in eyeball form. Attribution overhead exceeds the insight at this scale.

- **All tenants are on a flat-rate plan with uniform usage.** If the variance across tenants is small and pricing doesn't reflect usage, attribution is academic.

- **Pre-PMF / pre-revenue.** Build the product first; attribution is a year-1 investment that should follow paying customers.

- **The cost base is dominated by fixed cost (e.g., on-prem datacenter with sunk capex).** Attribution assumes marginal cost varies by tenant. If costs are dominated by fixed assets, attribution gives a misleadingly precise number.

- **Engineering team is < 5 people and burning down P0 work.** Attribution is real engineering work — months, not weeks. Don't pull off P0 product work for it unless the business case is compelling.

---

## Architecture

### Four cost dimensions

| Dimension | Examples | Attribution mechanism |
|---|---|---|
| **Compute** | CPU-seconds, request-handling time, function-invocations | Per-request tagging; container/pod tagging |
| **Storage** | Bytes-stored (durable + cache), IO operations | Row-tag (RLS) / schema-tag (per-schema) / cell-tag (per-cell) |
| **Network** | Bytes-in, bytes-out, requests across regions | Per-connection tagging at gateway; egress accounting per tenant |
| **Third-party** | LLM tokens, payment gateway fees, email provider sends | Per-API-call tenant-tag injection at adapter layer |

### Per-tenancy-model variants

Attribution mechanics vary by tenancy model:

| Tenancy model | Compute | Storage | Network |
|---|---|---|---|
| **RLS** | Per-request (no infra split) — tag every span/log with `tenant_id` | `by_predicate` — track row-count and bytes via the RLS predicate column | Per-connection tag at gateway |
| **Schema-per-tenant** | Per-request OR per-pod-shard if shards are tenant-locked | `by_schema` — query `pg_class` / `information_schema` per schema | Per-connection tag at gateway |
| **Cell-based** | `by_cell_then_intra` — cell-level coarse split, then intra-cell per-tenant tagging | `by_cell_then_intra` — cell as billing unit, intra-cell by_predicate or by_schema | Cell-level egress tracked, then attributed intra-cell |
| **Database-per-tenant** | Per-DB instance is one tenant — trivial | Per-DB — trivial | Per-DB connection — trivial |

The `by_cell_then_intra` pattern is the most common in mature systems because cells make coarse attribution cheap (whole cell's bill goes to N tenants) and intra-cell attribution is RLS/schema-flavored.

### Instrumentation hooks — five must-have

Every multi-tenant SaaS that wants reliable attribution implements these five hooks:

| Hook | Where it fires | Payload |
|---|---|---|
| **`on_request`** | API gateway / ingress | `tenant_id`, `request_id`, `started_at`, `ended_at`, `cpu_ms`, `bytes_in`, `bytes_out` |
| **`on_storage_write`** | DB write path | `tenant_id`, `table`, `bytes_written`, `rows_affected` |
| **`on_storage_read`** | DB read path (sampled if hot) | `tenant_id`, `table`, `bytes_scanned`, `io_ops` |
| **`on_third_party_call`** | Adapter to external API | `tenant_id`, `provider`, `endpoint`, `units_consumed`, `cost_usd_estimate` |
| **`on_egress`** | Network egress accounting | `tenant_id`, `destination`, `bytes`, `region_pair` |

These emit to a **cost-events stream** (Kinesis / Kafka / PubSub) that the attribution pipeline aggregates.

### Diagram — attribution pipeline

```
       ┌────────────┐    ┌──────────────┐    ┌──────────────┐
       │  Gateway   │    │   Database   │    │ Third-party  │
       │ on_request │    │  on_storage_*│    │ on_third_*   │
       └─────┬──────┘    └──────┬───────┘    └──────┬───────┘
             │                  │                   │
             ▼                  ▼                   ▼
       ┌─────────────────────────────────────────────────┐
       │           Cost-events stream                    │
       │  (tenant_id, dimension, units, ts)              │
       └────────────────────┬────────────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────────────┐
       │      Cost ETL: aggregate, price, deduplicate     │
       │   - apply tier-specific cost multipliers         │
       │   - join to shared-resource allocation           │
       │     (see [[cost-allocation-shared-resources]])   │
       └────────────────────┬────────────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────────────┐
       │   Per-tenant cost table (queryable)              │
       │   tenant_id │ dim │ amount │ period             │
       └─────────────────────────────────────────────────┘
                            │
                            ▼
       ┌─────────────────────────────────────────────────┐
       │   Reconciliation: sum(per_tenant) ≈ cloud_bill   │
       │       within 95% — see CRITICAL check            │
       └─────────────────────────────────────────────────┘
```

### Pricing model: unit cost × consumption

Each consumed unit has a unit cost. Maintain a **unit-cost table** keyed by (dimension, region, tier):

```yaml
unit_costs:
  compute_cpu_ms:
    us-east-1: 0.0000012  # USD per CPU-ms
  storage_byte_month:
    us-east-1: 0.0000000023
  network_egress_byte:
    us-east-1_to_internet: 0.00000009
  llm_token_input:
    openai_gpt4: 0.0000025
```

Multiply consumption × unit cost = attributed cost. Maintain the table in version control; revise quarterly against actual cloud bill movements.

---

## Trade-offs

| Dimension | Pro (per-tenant attribution) | Con (per-tenant attribution) |
|---|---|---|
| **Decision quality** | Surfaces loss-leader tenants, abuse, optimization targets. | High engineering cost to build; ongoing cost to maintain. |
| **Pricing options** | Enables usage-based pricing, chargeback, transparent invoicing. | Forces clarity in pricing — eliminates the comfortable "we'll figure it out later." |
| **Operational hygiene** | Per-tenant cost dashboards make ownership of optimization clear. | Dashboards proliferate; a discipline of pruning is required. |
| **Compliance evidence** | Resource-isolation claims become provable. | Attribution data itself becomes sensitive (reveals tenant relative size); access controls required. |
| **Engineering velocity** | Hooks become a standard pattern; new services inherit attribution. | Initial implementation is invasive — every code path touched. |

---

## Implementation Patterns

### 1. Tenant context propagation (the prerequisite)

Attribution starts with `tenant_id` being available at every hook. The simplest mechanism is a **tenant-context middleware** at the gateway that injects `tenant_id` into request-scoped storage (async-local-storage in Node, contextvars in Python, request scope in Go); every downstream call reads it.

```python
# middleware
def tenant_context_middleware(req, next):
    tenant_id = resolve_tenant(req)
    with set_context(tenant_id=tenant_id):
        return next(req)

# any downstream point
def write_event(...):
    emit_cost_event(
        tenant_id=get_context().tenant_id,
        ...
    )
```

Without reliable propagation, every hook firing without a `tenant_id` is unattributable — the unattributed bucket grows, and the CRITICAL reconciliation check fails.

### 2. Sampling for high-volume hooks

Storage-read events at scale would dwarf the cost-events stream. Use sampling:

```python
def on_storage_read(tenant_id, bytes_scanned, io_ops):
    if random() < SAMPLING_RATE:
        emit_event(tenant_id, bytes_scanned * (1/SAMPLING_RATE), ...)
```

Sampled events are scaled-up at aggregation time. Maintain an unsampled tally per tenant (`storage_reads_count`) to verify sampling is statistically valid.

### 3. Cell-based attribution (the `by_cell_then_intra` pattern)

For cell-based architectures:

```python
def cell_cost_breakdown(cell, period):
    cell_total = cloud_bill[cell][period]
    tenants_in_cell = list_tenants(cell)
    intra_cell_consumption = {t: sum_events(t, period) for t in tenants_in_cell}
    intra_total = sum(intra_cell_consumption.values())
    return {t: cell_total * (intra_cell_consumption[t] / intra_total)
            for t in tenants_in_cell}
```

This pattern handles the case where cell-level costs (e.g., shared cell infrastructure) are exact from the cloud bill, while intra-cell distribution uses event-stream consumption.

### 4. Third-party cost capture

Adapter layers wrap every third-party call with a hook:

```python
def call_openai(prompt, tenant_id):
    response = openai.chat.completions.create(...)
    emit_cost_event(
        hook="on_third_party_call",
        tenant_id=tenant_id,
        provider="openai",
        units_consumed=response.usage.total_tokens,
        cost_usd_estimate=price_tokens(response.usage),
    )
    return response
```

Adapter discipline matters: bypassing the adapter (e.g., calling an SDK directly from a hot path) loses attribution. Lint rule: third-party SDK imports allowed only in adapter modules.

### 5. Daily reconciliation

A daily job reconciles `sum(per_tenant_attributed_cost) ÷ cloud_bill`. Result < 95% triggers an alert (see CRITICAL check). Common causes:

- Hook fires without tenant_id (unattributed)
- Hook missing from a code path (untracked dimension)
- Sampling drift (statistical underestimate)
- New cloud resource not yet in cost ETL

---

## Quality Checks

- **CRITICAL:** the sum of per-tenant attributed cost must **reconcile to the cloud-bill total within 95%** (i.e., unattributed gap ≤ 5%) for every billing period. A larger gap signals **unattributed waste** — infrastructure being consumed without a tenant-tag, which means optimization targets are invisible and unit-economics numbers are unreliable. The 95% threshold is enforced by a daily reconciliation job that pages the FinOps owner when violated; the response is to identify the missing hook (most commonly: a new service deployed without instrumenting attribution) and fix it. A 90% reconciliation is not "good enough" — it represents 10% of infrastructure spend going to an unknown destination, and that 10% is almost always disproportionately some abusive cohort hiding in the noise.

- **Every hook fires with a `tenant_id` or is logged as unattributed.** No silent drops. The unattributed bucket is itself a metric — its size is the gap-to-95% indicator.

- **The unit-cost table is versioned and reviewed quarterly.** Cloud prices drift; tier-specific multipliers (e.g., compute cost in cell-isolated tier) need quarterly verification against the actual bill.

- **Attribution data is access-controlled.** Per-tenant cost data reveals competitive intelligence (their relative scale). Access is scoped: finance + named ops, not all-engineering.

- **Hooks are tested.** Each hook has a test that asserts the cost event is emitted with the right payload. A missing hook is invisible until reconciliation fails; tests catch it before deploy.

- **Cell-based attribution declares its intra-cell method.** `by_cell_then_intra` requires the intra-cell method to be named (RLS-predicate, per-schema, etc.); ambiguity here produces inconsistent attribution.

- **Sampling has unbiased verification.** Periodic full-rate windows verify that sampled estimates match within tolerance.

- **Third-party cost adapter coverage is enforced.** Lint or fitness function: third-party SDKs are imported only in adapter modules, ensuring every call passes through the hook.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to keep attribution practice current:

- `per tenant cost attribution multi-tenant SaaS {date}` — finds the canonical write-ups; FinOps Foundation publishes annually.
- `kubernetes cost allocation tenant labels {date}` — finds Kubecost / OpenCost / Vantage practitioner content.
- `database query cost attribution per row tenant {date}` — covers the by_predicate intra-DB attribution mechanic.
- `network egress cost per tenant tagging {date}` — egress attribution patterns at the gateway.
- `LLM token cost per tenant attribution {date}` — recent (post-2023) third-party cost pattern.
- `FinOps maturity model {date}` — surfaces the maturity ladder organizations climb.

Treat content older than 18 months as orientation; cloud cost tooling and pricing both shift quickly.

---

## Cross-references

**Companion fragments (Task 10):**

- [[unit-economics-saas]] — consumes the COGS this fragment produces.
- [[cost-allocation-shared-resources]] — handles costs that attribution cannot trace.
- [[budget-alerts-and-quotas]] — operational enforcement built on attribution data.

**Atlas existing fragments:**

- [[tenancy-decision-framework]] — tenancy choice determines attribution mechanics.
- [[rls-deep-dive]] — RLS attribution by_predicate.
- [[schema-per-tenant]] — schema attribution by_schema.
- [[cell-based-architecture]] — cell attribution by_cell_then_intra.

**Anti-patterns:**

- [[unattributed-infrastructure]] (forthcoming, Task 12) — the failure mode this fragment prevents.
- [[missing-tenant-context]] (forthcoming) — hooks fire without tenant_id.

**Quality gate:**

- `QG-F1` (foundation) — a foundation design without an attribution plan fails QG-F1 if the platform reports unit economics.
- `QG-M2` (tenant isolation) — attribution mechanics overlap with isolation evidence.

**Upstream specs:**

- `docs/v6-final-architecture.md` §3.Q3 (per-tier attribution), §6.3 (fragment schema).
- FinOps Foundation framework.

**Downstream consumers:**

- `design-finops-model` skill (P3.1) — primary consumer.
- `design-tenancy-model` skill — attribution mechanics differ per model.
