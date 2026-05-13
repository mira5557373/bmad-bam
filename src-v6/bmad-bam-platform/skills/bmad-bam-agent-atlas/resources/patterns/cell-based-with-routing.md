---
id: cell-based-with-routing
title: Cell-Based Architecture with Tenant→Cell Routing at the Gateway
category: tenant-isolation
kind: pattern
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html"
  - "https://kubernetes.io/docs/concepts/services-networking/network-policies/"
tested_against:
  - platform: "Envoy + Redis + Kubernetes 1.29"
    verified: 2026-05-12
---

# Cell-Based Architecture with Tenant→Cell Routing at the Gateway

A concrete, implementation-ready recipe for a cell-based multi-tenant platform whose router lives at the API gateway. Each tenant resides in exactly one cell; the gateway resolves `tenant_id → cell_id` via a Redis cache backed by a canonical tenant catalog, and proxies the request to that cell's edge. Intra-cell tenant isolation is provided by an inner pattern — typically [[rls-row-level-security]] for dense SMB cells, [[schema-per-tenant-with-pgbouncer]] for regulated or enterprise cells. **Cells wrap intra-cell isolation; they do not replace it.**

This pattern is the hands-on companion to [[cell-based-architecture]] — read the fragment first for the mechanism, failure-mode theory, and cross-cell-migration deep-dive; return here to wire the routing layer, the network policy, and the onboarding workflow. This pattern is for teams that have **outgrown** the lighter options. If you are not there yet, stop and re-read [[tenancy-decision-framework]]. Cells are not free: per-cell fixed cost runs $3k–$30k/mo, and the routing layer is a tier-0 service with its own on-call rotation.

---

## When to Use

This pattern is the right cell-based recipe when **most** of the following hold. If any condition is shaky — particularly ops headcount or scaling-pain data — return to [[tenancy-decision-framework]] before committing to the routing layer and the multi-cell ops surface.

- **Active tenant count exceeds ~1,000, with credible projection past 3,000 within 12 months.** Below 1,000 active tenants the per-cell fixed cost dominates and the routing layer is added complexity with no scaling benefit. Treat 1,000 as the *yellow* threshold and 3,000 as the *green* one; the interior is where cell-based earns its keep. Cross-reference projected growth against the onboarding pipeline, not aspiration.
- **Severe blast-radius severity (high).** Customer-facing SLAs that read "tenant A's incident shall not affect tenant B's availability", or regulatory equivalents (SOX-attested financial isolation, healthcare-grade availability boundaries, AI-safety boundaries between agent-tenant cohorts). A cell's *physical* boundary (separate DB, separate cache, separate queue, often separate VPC/account) makes "blast radius = one cell" a structural guarantee.
- **Multi-region requirements.** Tenants must reside in specific geographic regions for residency (EU GDPR, Australian Privacy Principle 8, sovereign cloud, US public-sector boundaries). Each region runs one or more cells; the routing layer pins each tenant to a residency-compatible cell. Multi-region is one of cell-based's strongest properties; do not invoke it as a tie-breaker if you will not actually use it.
- **Dedicated-cell SLA tier.** "Enterprise tier gets their own infrastructure" is a commercial promise; cell-based delivers it cleanly. Enterprise tenants land in a small enterprise cell (or a single-tenant cell for the top accounts); free-tier tenants land in dense SMB cells. The cell topology *is* the SLA stratification.
- **Compliance scope includes FedRAMP-High, IL4, IL5, or CJIS.** These mandate *physical* tenant boundaries — separate databases, separate networks, often separate AWS accounts. No policy-test or schema-namespace argument satisfies the control. Cell-based is mandatory; the cell *is* the compliance boundary.
- **Ops team size ≥ 5 FTE with platform-engineering specialization.** Cell-based requires owners for: the routing layer, per-cell deployment pipelines, cross-cell observability aggregation, cell-split and cross-cell-migration runbooks, and cell-down incident rotation. Below 5 FTE this distributes too thinly; runbooks decay, cells drift, the next outage is a long one.
- **Existing observability and IaC maturity.** A deploy pipeline that worked for one cluster must work, identically, for N cells with per-cell monitoring and canary-one-cell discipline. Without solid CI/CD, IaC (Terraform / Pulumi / Crossplane), and per-environment dashboards, the first 6 months of the cell migration build those primitives before any cell-specific work begins.

---

## When NOT to Use

These conditions fire *before* any commercial or aspirational argument — they are structural exclusions.

- **Tenant count under ~500 with no credible growth projection past 1,000.** The per-cell fixed cost does not amortize. A 200-tenant platform on two cells of 100 tenants each pays 2× the infrastructure cost of a single pooled deployment for isolation properties the product doesn't sell. Use [[rls-row-level-security]] or [[schema-per-tenant-with-pgbouncer]]; revisit when growth is *signed*, not projected.
- **Single-region deployment with no residency requirements.** Cell-based's residency-aware routing is unused weight when every tenant lives in one region with no compliance / contractual constraint. Single-region cell-based can still be justified by blast-radius alone, but multi-region is the strongest part of the value proposition; do not pay the routing-layer cost for benefits you will not consume.
- **Ops team size < 5 FTE.** Empirically, cell-based under 5 platform engineers produces one of three failure modes: runbooks rot and configuration drift accumulates between cells; the routing layer is under-invested and becomes a SPOF; the team burns out and quits. Hire before committing, or defer the migration. Running cell-based understaffed is worse than running schema-per-tenant past its ceiling.
- **No scaling-pain data yet — premature optimization.** "We want enterprise customers eventually, so we should be cell-based from day one" is a recurring anti-pattern. Cell-based ops overhead is 5–10× pooled RLS at small tenant counts; that overhead is paid every day in real money against a future revenue stream that may not materialize. Falsifier: name a signed enterprise customer in pipeline whose contract requires physical isolation, with a delivery date. If you cannot, start pooled and migrate when the customer signs.
- **Highly bursty, low-baseline workload.** If 90% of your tenants are dormant and the active 10% drives all the load, you pay for 90% of the cells' resources to keep dormant tenants alive. Serverless-Postgres-backed schema-per-tenant or pooled RLS is more cost-effective. Revisit when baseline utilization exceeds ~30%.
- **Cross-tenant data relationships.** Partnership tables, marketplace co-listings, cross-tenant analytics — a cell-based architecture fragments these relationships across cells. Either restructure to keep shared data in cross-cell systems or pick a different tenancy model. "Cross-cell joins will be cheap" produces a routing layer with hot-loop SQL that never recovers.
- **Greenfield product still in pre-PMF.** <10 customers, no signed enterprise pipeline, product may pivot in six months. Cell-based commits you to a platform shape that survives pivots poorly. Start RLS; migrate later if the product validates.

---

## Architecture

The pattern binds tenant identity (from a JWT claim, subdomain, or path) at the API gateway, resolves `tenant_id → cell_id` via a Redis cache backed by the canonical tenant catalog, and routes the request to the correct cell. Intra-cell traffic is permitted; **all cross-cell traffic is denied** by network policy except for explicit calls to cross-cell systems (identity, billing, tenant catalog, observability aggregation).

### Routing flow

```
   client request (Host: api.example.com, JWT in Authorization header)
        │
        ▼
   API gateway (Envoy / nginx / AWS ALB + Lambda authorizer)
        │
        │  1. Extract tenant_id from JWT claim, subdomain, or path
        │  2. Lookup tenant_id → cell_id  ──►  Redis (hot cache, TTL ≤60s)
        │                                       │ on miss
        │                                       ▼
        │                                  tenant catalog DB
        │                                  (canonical; in control plane)
        │  3. On lookup failure: 503 with cell-routing-error code
        │
        ▼ proxy to cell upstream
   ┌─────────────────────────┐         ┌─────────────────────────┐
   │  cell-a (us-east-1)     │         │  cell-b (eu-west-1)     │
   │  ─────────────────────  │         │  ─────────────────────  │
   │  compute (app fleet)    │         │  compute (app fleet)    │
   │  database (postgres-a)  │         │  database (postgres-b)  │
   │  cache (redis-a)        │         │  cache (redis-b)        │
   │  queue (sqs-a)          │         │  queue (sqs-b)          │
   │                         │         │                         │
   │  intra-cell isolation:  │         │  intra-cell isolation:  │
   │  RLS or schema-per-     │         │  schema-per-tenant      │
   │  tenant (per cell tier) │         │  (EU regulated)         │
   └─────────────────────────┘         └─────────────────────────┘
            ▲                                    ▲
            └───── deny all cross-cell ──────────┘
                   (NetworkPolicy / VPC peering rules)

                cross-cell systems (in control plane, shared)
                ┌──────────────┬──────────────┬──────────────┐
                │   identity   │   billing    │   tenant     │
                │  (JWT signer)│  (metering)  │   catalog    │
                └──────────────┴──────────────┴──────────────┘
```

### Cell control plane vs cell data plane

- **Cell data plane** — per-cell databases, caches, queues, application instances. Holds customer data. Cross-cell traffic is denied at the network policy. This is the boundary your auditor cares about.
- **Cell control plane** — deploy pipelines, secrets management, IaC modules, observability aggregator, the **tenant catalog DB** itself. *Shared* across cells. Holds no customer data; orchestrates cells without operating on customer traffic.

Drift here is the root cause of "the control plane became a SPOF" incidents — a control-plane process that starts reading tenant data inside its orchestration loop turns a thin shared layer into a fat shared SPOF. Review every "let me just call cell-b from the control plane" PR with explicit security-engineering sign-off.

---

## Implementation Patterns

### Tenant→cell lookup

The lookup is the most frequently exercised primitive in the platform — every request pays it. Budget: **< 2 ms p99**. Topology:

- **Canonical source:** `platform.tenant_cells` table in the tenant catalog DB. Lives in the cell control plane (not inside any cell). Replicated for HA; read-replica fronts cache misses.
- **Hot cache:** Redis cluster, keyed by `tenant_id`, value `cell_id`. TTL ≤ 60 sec. Explicit invalidation on tenant-migration events (do not rely solely on TTL — see [[cell-based-architecture]] §cell-routing-complexity for the stale-mapping failure mode).
- **Process-local fallback cache:** each gateway instance caches recent resolutions in-process, with a max-staleness bound (e.g., 5 min). Returns stale-but-valid mappings when both Redis and the catalog DB are unreachable, trading a small stale window for availability.
- **Lookup-failure handling:** when *all* tiers fail (Redis unreachable + catalog DB unreachable + no local fallback), return 503 with a structured error code (`cell-routing-error` + `correlation_id`). Surface in dashboards; alert on rate.

```lua
-- envoy lua filter excerpt: tenant_id → cell_id resolution
-- shared_data is the in-process fallback cache, keyed by tenant_id.
function lookup_cell(handle, tenant_id)
  -- 1. Process-local cache (microsecond hit).
  local cached, cached_at = handle:streamInfo():dynamicMetadata():get(
    "platform.routing", tenant_id
  )
  if cached and (now() - cached_at) < 300 then  -- 5 min max staleness
    return cached, nil
  end

  -- 2. Redis hot cache (sub-millisecond hit).
  local redis_resp = handle:httpCall(
    "redis_cluster",
    { [":method"]="POST", [":path"]="/get",
      ["x-redis-key"]="tenant_cell:" .. tenant_id },
    "", 50  -- 50ms timeout; fail fast to catalog DB
  )
  if redis_resp and redis_resp.body and redis_resp.body ~= "" then
    -- Populate process-local cache for next time.
    handle:streamInfo():dynamicMetadata():set(
      "platform.routing", tenant_id, redis_resp.body
    )
    return redis_resp.body, nil
  end

  -- 3. Catalog DB (slowest tier; expected to be cold-miss only).
  local db_resp = handle:httpCall(
    "tenant_catalog",
    { [":method"]="GET", [":path"]="/v1/tenants/" .. tenant_id .. "/cell" },
    "", 200  -- 200ms timeout
  )
  if db_resp and db_resp.body then
    -- Write-through to Redis with short TTL.
    handle:httpCall("redis_cluster",
      { [":method"]="POST", [":path"]="/setex",
        ["x-redis-key"]="tenant_cell:" .. tenant_id,
        ["x-redis-ttl"]="60" },
      db_resp.body, 50)
    return db_resp.body, nil
  end

  -- 4. All tiers failed. Return error; caller responds 503.
  return nil, "cell-routing-error"
end
```

Stale-mapping during a tenant migration is a *correctness* failure, not a performance failure — a stale mapping sends a request to the old cell, where the tenant's data no longer lives. Mitigations: short TTL (≤60 sec); explicit cache invalidation on migration events; an `x-cell-version` header that cells reject on mismatch (the cell knows its own ID; if asked to serve a tenant whose binding has been moved away, it returns 410 and the router refreshes).

### Gateway routing config (Envoy)

```yaml
# envoy.yaml — production excerpt for tenant→cell routing.
static_resources:
  listeners:
  - name: cell_router
    address: { socket_address: { address: 0.0.0.0, port_value: 8443 } }
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          stat_prefix: cell_router
          http_filters:
          - name: envoy.filters.http.jwt_authn
            # validate JWT before any routing decision; extract tenant_id claim
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.jwt_authn.v3.JwtAuthentication
              providers:
                platform_jwt:
                  issuer: "https://identity.platform.example.com"
                  payload_in_metadata: "jwt_payload"
              rules:
              - match: { prefix: "/" }
                requires: { provider_name: "platform_jwt" }
          - name: envoy.filters.http.lua
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua
              inline_code: |
                function envoy_on_request(handle)
                  local md = handle:streamInfo():dynamicMetadata():get(
                    "envoy.filters.http.jwt_authn"
                  )
                  local tenant_id = md and md["jwt_payload"]
                                       and md["jwt_payload"]["tenant_id"]
                  if not tenant_id then
                    handle:respond({[":status"]="400"},
                      '{"error":"missing-tenant-claim"}')
                    return
                  end
                  local cell, err = lookup_cell(handle, tenant_id)
                  if err or not cell then
                    handle:respond({[":status"]="503"},
                      '{"error":"cell-routing-error",' ..
                      '"correlation_id":"' .. handle:streamInfo():id() .. '"}')
                    return
                  end
                  handle:headers():add("x-cell", cell)
                  handle:headers():add("x-tenant-id", tenant_id)
                end
          - name: envoy.filters.http.router
          route_config:
            virtual_hosts:
            - name: cells
              domains: ["*"]
              routes:
              - match: { prefix: "/", headers: [{name: "x-cell", exact_match: "cell-a"}] }
                route: { cluster: cell_a_upstream, timeout: "30s" }
              - match: { prefix: "/", headers: [{name: "x-cell", exact_match: "cell-b"}] }
                route: { cluster: cell_b_upstream, timeout: "30s" }
              # ... one route per cell. Updated via xDS / config reload on cell-add.

  clusters:
  - name: cell_a_upstream
    type: STRICT_DNS
    connect_timeout: 2s
    health_checks:
    - timeout: 1s
      interval: 5s
      unhealthy_threshold: 2
      healthy_threshold: 2
      http_health_check: { path: "/healthz" }
    load_assignment:
      cluster_name: cell_a_upstream
      endpoints:
      - lb_endpoints:
        - endpoint: { address: { socket_address: { address: cell-a.internal, port_value: 8443 } } }
  # cell_b_upstream, cell_c_upstream defined identically with their own DNS.
```

The Lua filter is the boundary. Resist the temptation to "just add one more thing" — every line of Lua runs on every customer request and is harder to test than application code. Keep the filter to: JWT extract → cell lookup → header annotate → 503-on-error. Per-cell business logic lives inside the cells.

### Network policy (Kubernetes default-deny + explicit allow)

```yaml
# Default-deny + explicit allow for cell-a's data-plane namespace.
# Cells cannot reach each other; only the router can reach this cell; only
# the cross-cell systems are reachable from this cell.
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: cell-a-default-deny-and-allow
  namespace: cell-a
spec:
  podSelector: {}
  policyTypes: ["Ingress", "Egress"]
  ingress:
  - from:
    - namespaceSelector:
        matchLabels: { tier: edge-gateway }      # only the router can reach this cell
    ports:
    - protocol: TCP
      port: 8443
  egress:
  # 1. Intra-cell traffic is always allowed.
  - to:
    - podSelector: {}
      namespaceSelector:
        matchLabels: { cell: cell-a }
  # 2. Explicit allow to cross-cell systems (identity, billing, catalog, obs aggregator).
  - to:
    - namespaceSelector:
        matchLabels: { tier: cross-cell-systems }
  # 3. DNS.
  - to:
    - namespaceSelector:
        matchLabels: { kubernetes.io/metadata.name: kube-system }
    ports:
    - protocol: UDP
      port: 53
  # No `cell-b`, `cell-c` egress rule. Cross-cell traffic is denied.
---
# Symmetric policy on cell-b, cell-c, etc. — same template, different cell label.
```

If you run cells in **separate AWS accounts** (a common FedRAMP-aligned topology), the network-policy story is reinforced by VPC isolation: no peering between cell accounts, and the cross-cell systems live in their own account that *each* cell can reach only via explicit IAM-scoped APIs. Treat the cross-cell systems' APIs as a versioned product, not as a runtime convenience.

Default-deny is non-negotiable. Without it, the first developer who needs "just a quick read from cell-b for an analytics query" opens a hole that is never closed and silently degrades the cell-isolation property. Review every `NetworkPolicy` change in a security-engineering rotation; the policy *is* the boundary.

### Tenant onboarding workflow (capacity-aware cell assignment)

```python
# Onboarding orchestrator pseudocode. Runs in the control plane.
# Source of truth: platform.tenant_cells (catalog DB).

def assign_cell(tenant: TenantInput) -> CellID:
    # 1. Filter cells by residency + tier.
    candidates = catalog.cells.list_active(
        region_in=tenant.allowed_regions,    # eu-west-1, us-east-1, etc.
        tier=tenant.tier,                    # smb, enterprise, dedicated
    )
    if not candidates:
        raise NoCandidateCellError(tenant)

    # 2. Within candidates, pick the cell with the lowest utilization.
    #    Utilization = max(tenant_count / ceiling, qps / ceiling, storage / ceiling).
    chosen = min(candidates, key=lambda c: c.utilization())

    # 3. If chosen cell is already >80% utilized, alert + use anyway.
    #    Hard-fail at >95%: triggers the operator to provision Cell N+1 first.
    if chosen.utilization() > 0.95:
        raise CellCapacityExhausted(chosen, tenant)
    if chosen.utilization() > 0.80:
        alerts.warn("cell-utilization-high", cell=chosen.id, util=chosen.utilization())

    return chosen.id

def onboard_tenant(tenant: TenantInput) -> Tenant:
    cell_id = assign_cell(tenant)

    # Write the binding to BOTH the canonical catalog AND the Redis cache.
    # Catalog DB is the source-of-truth; Redis is the hot path. Both writes
    # must succeed for the onboarding to be considered complete.
    with catalog.transaction():
        catalog.tenant_cells.insert(
            tenant_id=tenant.id, cell_id=cell_id, status="active",
            created_at=now(), region=tenant.region, tier=tenant.tier,
        )
        # Per-cell tenant registry write (in-cell side of the binding).
        cells[cell_id].tenant_registry.create(tenant.id, tenant.metadata)

    # Now publish to Redis. If Redis write fails, queue a retry; the catalog
    # is canonical so the router will resolve correctly on cache miss anyway.
    try:
        redis.setex(f"tenant_cell:{tenant.id}", 60, cell_id)
    except RedisError:
        retry_queue.enqueue("redis_warm_tenant", tenant.id, cell_id)

    # Issue the JWT-issuance refresh so identity sees the new tenant.
    identity.notify_tenant_created(tenant.id, cell_id)

    return tenant_from_catalog(tenant.id)
```

**Discipline:** the canonical catalog write happens *before* the Redis write. The catalog is source-of-truth; Redis is a cache. If you reverse the order, a Redis-write success followed by catalog-write failure leaves the platform with a hot cache entry that has no canonical backing — the kind of inconsistency that takes hours to diagnose and is silent until the first cache eviction.

### Cell-split runbook (one-line summary)

When cell capacity hits threshold (typically 80% of the 500-tenant SMB-cell target or the per-cell QPS / storage ceiling, whichever fires first), split the cell into two: provision a new cell, identify a tenant cohort to move, run the cross-cell migration runbook per tenant in the cohort, then update capacity dashboards. The **full runbook** — sequencing, communications template, rollback procedure, drill cadence — lives in `_bmad/bam/runbooks/cell-split.md` (forthcoming) and the failure-mode theory lives in [[cell-based-architecture]] §capacity-planning-per-cell. Splits that are first executed against a saturated production cell at 2 AM are how cell-based platforms have multi-hour outages; drill quarterly against a non-production cell.

---

## Trade-offs

| Dimension | rls-row-level-security | schema-per-tenant-with-pgbouncer | cell-based-with-routing (this pattern) |
|---|---|---|---|
| **Active tenant fit** | Best ≤ ~1,000 per instance | Best 100–1,500 per cluster | Best 1,000–100,000+; 100–800 tenants per cell depending on tier |
| **Marginal cost / tenant** | $0.50–$3 / mo | $3–$10 / mo | $10–$80 / mo (drops sharply with cell density) |
| **Per-cell fixed cost** | N/A | N/A | $3k–$30k / mo per cell (compute + DB + cache + queue + observability + control-plane share) |
| **Isolation strength** | Logical — policy is the entire boundary | Schema namespace + per-schema GRANTs | Physical — separate DBs, networks, often separate accounts |
| **Blast radius** | All tenants per instance | All tenants per cluster | One cell's worth of tenants (typ. 100–500) |
| **Audit story** | SOC2 OK with policy tests | SOC2/HIPAA/PCI clean | All including FedRAMP-High, IL4, IL5, CJIS |
| **Multi-region / residency** | Hard — requires cross-region pooling | Hard — requires cross-region replication | Native — one cell per region, routing layer pins residency |
| **Ops headcount floor** | 2–3 FTE | 3–5 FTE | **5+ FTE** (router + cells + cross-cell systems + cell-split runbook ownership) |
| **Per-query overhead** | 0.5–8 ms (planner rewrite) | ~10 µs (`SET LOCAL search_path`) | Near-zero per cell + 1–5 ms routing add |
| **Failure mode density** | High (4 silent failure modes) | Medium (4 mostly-operational) | Medium (4 mostly-operational; failures are loud — cell down, routing miss, capacity exhausted, migration botched) |
| **Migration cost in** | 2–4 eng-weeks from app-only filtering | 4–8 eng-weeks (pooler topology + per-schema migrator) | **3–6 engineer-months** (control plane + routing layer + cross-cell systems + first cell) |
| **Migration cost out** | RLS → schema: ~1 eng-week + 5 min/tenant | Schema → cell: 2–4 eng-months | Effectively terminal — consolidating loses isolation guarantees sold to customers |
| **Routing-layer SPOF risk** | None (no router) | None (no router) | Yes — the router is a tier-0 service with its own SLO and on-call rotation |
| **Greenfield-day-one cost** | $5k–$20k / mo | $10k–$40k / mo | **$30k–$80k / mo minimum** (one cell + router + cross-cell systems) |

**Reading the table:**

- **vs RLS:** cell-based wins on isolation, blast radius, multi-region, audit story. RLS wins on cost (3–20× cheaper at small tenant counts), ops simplicity, and absence of routing-layer SPOF. Crossover happens around 1,500 active tenants **and** ops-team-size ≥ 5; below either threshold, RLS is the better choice even if cell-based looks more "enterprise". The cost premium is paid in real money every month, not in abstract ops debt.
- **vs schema-per-tenant:** cell-based offers physical isolation that schema-per-tenant cannot — separate networks, separate accounts, separate DBs. Schema-per-tenant is sufficient for SOC2/HIPAA/PCI; cell-based is mandatory for FedRAMP-High / IL4 / IL5 / CJIS. Schema-per-tenant ops scale to ~1,500 schemas; cell-based scales further. Migration cost is meaningful (2–4 engineer-months); plan deliberately.
- **Per-cell cost overhead is real.** $3k–$30k / mo per cell is the floor, not the ceiling. Two cells of 100 tenants each cost more than one pooled deployment of 200 tenants by a factor of 2–4×; the isolation property must be worth that premium to your customer base, or you are over-engineering. Price the product accordingly, or defer.

---

## Quality Checks

These checks must pass before merging a cell-based tenancy design to platform main, and again as a quarterly review.

- **CRITICAL:** cell migration tooling MUST be implemented and rehearsed BEFORE any second cell is provisioned; otherwise tenant relocation requires hand-coordinated ops and risks customer-visible downtime. The cross-cell migration runbook is written, the tooling that drives it is deployed, and the runbook has been drilled end-to-end on a synthetic tenant in staging. First-production-migration-from-an-undrilled-runbook has caused every published cell-based outage with cross-cell-migration in its timeline through 2025. Treat this control as non-negotiable: a platform that has provisioned a second cell without a drilled migration runbook is in a state where its capacity-planning options have collapsed to "stand up more cells" — it can no longer rebalance tenants between cells without an emergency operation.

- **Tenant→cell lookup cache TTL discipline.** Redis TTL on `tenant_cell:*` keys is ≤ 60 seconds. Cache invalidation runs on every tenant-migration event (catalog write triggers a Redis `DEL`). A CI test asserts the TTL configuration matches the runtime value. Quarterly review: enumerate the cache-staleness budget against the migration cadence; if migrations are frequent (>1/week) consider reducing TTL further, or move to push-based invalidation only.

- **Cell capacity headroom monitoring.** Per-cell dashboards track tenant count, baseline QPS, p99 latency, and storage in use, each against the cell's design ceiling. Alert fires when any metric is projected to cross 80% within 90 days; hard-fail onboarding at >95%. The capacity-review meeting runs quarterly and produces a noop / monitor / plan-split / plan-add / migrate-out decision for every cell, with a named owner if anything other than noop.

- **Cross-cell network deny verified in CI.** A CI job stands up a synthetic two-cell environment, deploys the canonical NetworkPolicy, attempts a TCP connection from one cell's namespace to the other cell's database service, and asserts the connection is refused. The same check runs as a production-side scheduled job using a non-customer-facing probe pod. Any successful cross-cell connection is a P1 incident: review the NetworkPolicy diff, isolate the offending change, restore default-deny.

- **Control-plane vs data-plane separation audit.** A quarterly audit by a security engineer enumerates every component in the control plane and verifies: (a) no customer data is read by the component, (b) no per-customer logic lives in IaC modules, (c) no "I'll just call cell-b from the control plane" backdoor in application or orchestrator code. The audit produces a signed-off control-plane reach report; deviations are tracked to remediation. Drift here is the root cause of "the control plane became the SPOF" incidents.

- **Routing-layer SLO and stale-mapping defense.** The router has its own SLO (typically 99.99% availability) tracked separately from the cells. Stale-mapping rate is monitored — defined as the rate at which the router returned a cell that did not match the canonical catalog at request time. Synthetic monitoring continuously validates random tenant→cell resolutions against the catalog DB and the cells' local registries. Alert at any non-zero rate sustained over 5 minutes.

- **IaC parity across cells.** A CI job diffs the IaC state of each cell against the canonical cell module; cells must be identical except for parameters (region, ID, capacity, intra-cell isolation model). Drift is logged and tracked to remediation. Cells that diverge silently produce per-cell bugs that are nearly impossible to triage.

- **Per-cell intra-cell isolation discipline maintained.** Each cell still runs [[rls-row-level-security]] or [[schema-per-tenant-with-pgbouncer]] internally; the per-cell intra-cell quality checks (RLS policy coverage, `pg_policies` audit, schema migration runner discipline, etc.) run per-cell. QG-M2 evaluates every cell's intra-cell quality checks, not "the average". The cell boundary does not exempt the cells from intra-cell isolation discipline.

---

## Web Research Queries

Refresh annually. Cell-based *mechanism* is stable; *routing-layer tooling*, *service-mesh policies*, and *cross-cell migration tooling* shift fast.

- `cell-based AWS reference architecture {date}` — AWS Well-Architected SaaS Lens, "Reducing the Scope of Impact with Cell-Based Architecture" whitepaper updates, AWS SaaS Factory case studies. Cross-link findings into your `cell-design.md`.
- `Envoy tenant routing {date}` — operational guidance on Envoy + Lua filter patterns, JWT extraction, xDS-based cell-list management, alternatives (Kong plugins, Cloudflare Workers, AWS Lambda authorizers). Watch for posts that discuss cache strategies and stale-mapping handling.
- `Kubernetes multi-cell network policy {date}` — NetworkPolicy patterns for cell isolation; service-mesh policies (Istio, Linkerd, Cilium) for cross-cell traffic control; VPC peering and AWS account-separation patterns. Cross-link with the cross-cell-deny quality check.
- `cross-cell tenant migration logical replication {date}` — Postgres logical replication for live cross-cell migrations; dual-write patterns; downtime-window minimization techniques. Useful for the migration-tooling CRITICAL above.
- `multi-region tenant residency SaaS {date}` — residency-pinning patterns, cross-region data-flow controls, GDPR / Australian Privacy Principle 8 / sovereign-cloud implementations. Cross-reference with the residency-aware cell-assignment logic.

Treat results older than 18 months as orientation only — the routing-layer and service-mesh landscape (Envoy, Istio, Cilium, Linkerd, Cloudflare Workers) shifts fast enough that 2-year-old tooling guidance is often stale even when the mechanism still holds.

---

## Cross-references

**Companion fragment:**

- [[cell-based-architecture]] — mechanism, failure-mode theory (cell-routing-complexity, intra-cell-shared-resources, capacity-planning-per-cell, cross-cell-migration-is-operationally-hard), capacity-planning model, cross-cell migration deep-dive. Read first if you have not already; this pattern is the recipe, that fragment is the theory and the production-runbook detail.

**Upstream decision aid:**

- [[tenancy-decision-framework]] — the framework that should select cell-based (or not) before you reach this pattern. If you arrived here without traversing the framework, return there first; cells are not free and the framework's structural thresholds (tenant count, ops headcount, compliance scope) should gate the choice.

**Intra-cell isolation (mandatory; pick one per cell tier):**

- [[rls-row-level-security]] — the typical intra-cell isolation mechanism for dense SMB cells. Cells wrap RLS; they do not replace it. Read alongside this pattern when designing the SMB cell's data layer.
- [[schema-per-tenant-with-pgbouncer]] — the typical intra-cell isolation mechanism for enterprise or regulated cells. Schema-per-tenant inside a cell is a common variant; the per-cell ops surface inherits schema-per-tenant's discipline.

**Test catalog:**

- [[tenant-isolation-testing-patterns]] — the canonical test catalog. Cell-based deployments need both *intra-cell* isolation tests (per cell, model-specific) and *inter-cell* isolation tests (routing-staleness, cross-cell network reachability, cross-cell migration correctness). Do not treat tests as optional.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — every cell-based tenancy-model.md MUST clear QG-M2 before merging to platform main, and the inter-cell isolation tests must be green, as must each cell's intra-cell test suite.
