---
id: cell-based-architecture
title: Cell-Based Architecture for Multi-Tenant SaaS — Deep Dive
category: tenant-isolation
kind: fragment
qg_ref: QG-M2
last_reviewed: 2026-05-12
version: 1.0.0
status: active
author: atlas
references:
  - "https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/reducing-scope-of-impact-with-cell-based-architecture.html"
  - "https://aws.amazon.com/builders-library/avoiding-overload-in-distributed-systems-by-putting-the-smaller-service-in-control/"
tested_against: []
---

# Cell-Based Architecture for Multi-Tenant SaaS — Deep Dive

A structural deep-dive on **cell-based architecture** as the isolation mechanism for a multi-tenant SaaS platform. A *cell* is a self-contained vertical slice of infrastructure — compute, data, cache, message bus, sometimes its own VPC or cloud account — that serves a bounded subset of tenants. The platform runs multiple cells; each tenant lives in exactly one. The combination of small per-cell tenant counts plus the network/account boundary between cells gives **blast-radius containment** that pooled [[rls-deep-dive|RLS]] and [[schema-per-tenant]] cannot match. This fragment is consumed by `design-tenancy-model` (and any skill producing or reviewing a cell-based design) after the [[tenancy-decision-framework]] has selected cell-based — or is considering it — as the recommended option.

Cell-based architecture is the **most expensive** tenancy mechanism in the framework and the only one that gives you physical isolation, horizontal scalability past ~3k tenants, and tenant-aware data residency in the same package. It is also the model with the highest **ops headcount floor**: anything below ~5 FTE on the platform team produces a cell-based deployment whose runbooks rot faster than the cells can be operated. Read this fragment before you spin up a second cell in anger.

---

## When to Use

Cell-based architecture is the correct mechanism when **most** of the following hold. Mixed-mode situations — for example, a regulated cohort that needs cells while the SMB cohort runs on pooled RLS — should fall back to the [[tenancy-decision-framework]] for a hybrid recommendation rather than forcing cell-based across the whole tenant base.

- **Active tenant count exceeds ~1,000, with credible projection past 3,000–10,000.** Pooled RLS planner overhead and connection economics become structurally unfavorable past ~1,500 active tenants per Postgres instance, and schema-per-tenant hits its catalog-cost ceiling around the same point. Cell-based is the only mechanism that *horizontally* scales the tenancy substrate: more tenants → more cells, each cell sized within its sweet spot. Below ~1,000 tenants, cell-based is over-engineered — the per-cell fixed cost dominates and the routing layer is added complexity for no scaling benefit. Treat the 1,000-tenant line as a *yellow* threshold and the 3,000-tenant line as the *green* one; the interior is where cell-based earns its keep.

- **Severe blast-radius requirements.** Customer-facing SLAs that read "tenant A's incident shall not affect tenant B's availability" — or regulatory equivalents (financial-services SOX-attested isolation, healthcare-grade availability, AI-safety boundaries between agent-tenant cohorts) — are incompatible with shared-cluster mechanisms. A cell's *physical* boundary (separate DB, separate cache, separate queue, often separate VPC/account) makes "blast radius = one cell" a structural guarantee rather than a hopeful claim. SaaS platforms that have had even one cross-tenant outage with reputational fallout typically migrate to cell-based within 12–18 months; the framework is well-validated.

- **Multi-region data-residency requirements.** When tenants must keep their data in a specific geographic region — EU GDPR data-residency, Australian Privacy Principle 8, sovereign cloud mandates, US public-sector boundaries — cell-based is the cleanest fit. Each region runs one or more cells; the routing layer pins each tenant to a residency-compatible cell. Pooled RLS and schema-per-tenant can be replicated cross-region for *availability*, but they cannot pin individual tenants to specific regions without per-row routing logic that ends up looking like a cell layer anyway. Build the cell layer; do not re-implement it inside an ORM.

- **SLA tiers where premium tenants need physical isolation.** "Enterprise tier gets their own infrastructure" is a recurring commercial promise; cell-based delivers it cleanly. Enterprise tenants land in a small enterprise cell (or a single-tenant cell for the top accounts), free-tier tenants land in dense SMB cells. The cell topology *is* the SLA stratification, not a layer on top of it.

- **Re-architecture from an exhausted pooled deployment.** A platform whose RLS or schema-per-tenant cluster is at its ceiling (planner-overhead cliff, schema-enumeration cost, connection-pool fragmentation) re-architects to cells. This is the **dominant** path into cell-based — almost no platform starts cell-based on day one (and the few that do typically regret the over-engineering). Use the framework's brownfield migration-path output to scope the move; budget 3–6 engineer-months for the platform work plus a per-tenant migration cost that depends on data volume.

- **Compliance scope includes FedRAMP-High, IL4, IL5, or CJIS.** These frameworks require *physical* tenant boundaries — separate databases, separate networks, often separate AWS accounts. No amount of policy testing or schema-namespace argument satisfies the control. Cell-based is mandatory; the cell *is* the compliance boundary. Pair with cell-local control-plane discipline to keep the boundary auditable.

- **Ops team size ≥ 5 FTE with platform-engineering specialization.** Cell-based requires that *someone* owns the routing layer, *someone* owns the per-cell deployment pipelines, *someone* owns the cross-cell observability aggregation, *someone* owns the cell-split and cross-cell-migration runbooks, and *someone* is on rotation for cell-down incidents. Below 5 FTE this distributes too thinly; the runbooks decay and the cells drift in configuration. If headcount is binding, defer the cell migration until you can staff it — running cells understaffed is worse than running schema-per-tenant past its ceiling.

- **Existing observability and deployment maturity.** Cell-based amplifies operational primitives: a deploy pipeline that worked for one cluster needs to work, identically, for N cells with monitoring per cell and the ability to canary one cell before the rest. Platforms without solid CI/CD, IaC (Terraform / Pulumi / Crossplane), and per-environment observability dashboards will spend the first 6 months of their cell migration building those primitives — fine, but budget for it explicitly rather than discovering it mid-flight.

---

## When NOT to Use

Cell-based is the wrong mechanism when any of these conditions are present. Each fires before any commercial or aspirational argument — they are structural.

- **Tenant count under ~500 with no credible growth projection past 1,000.** The per-cell fixed cost (compute, control plane share, observability, on-call rotation share) does not amortize. A 200-tenant platform on two cells of 100 tenants each pays 2× the infrastructure cost of a single pooled deployment for isolation properties the product doesn't sell. Use [[rls-deep-dive|pooled RLS]] or [[schema-per-tenant]]; revisit when growth is signed, not projected.

- **Single-region deployment with no residency requirements.** If every tenant lives in one region and no compliance / contractual constraint forces residency, cell-based's residency-aware routing is unused weight. Single-region cell-based can still be justified by blast-radius alone, but multi-region is a major part of its value proposition; do not invoke it as a tie-breaker if you are not going to use it.

- **Ops team size < 5 FTE.** Empirically, cell-based with under 5 platform engineers produces one of three failure modes: (a) runbooks rot, configuration drift accumulates between cells, and the first cell-down incident reveals the drift; (b) the routing layer is under-invested and becomes a SPOF; (c) the team burns out and quits, which is the most expensive failure mode of all. Hire before committing, or defer the migration.

- **Premature optimization without scaling-pain data.** "We want enterprise customers eventually, so we should be cell-based from day one" is a recurring anti-pattern. Cell-based ops overhead is 5–10× pooled RLS at small tenant counts; that overhead is paid every day, in real money, against a future revenue stream that may not materialize. Falsifier: name a signed enterprise customer in pipeline whose contract requires physical isolation, with a delivery date. If you cannot, start pooled and migrate when the customer signs.

- **Highly bursty, low-baseline workload.** Cell-based fixed-cost infrastructure penalizes low-baseline workloads. If 90% of your tenants are dormant and the active 10% drives all the load, cell-based pays for 90% of the cells' resources just to keep the dormant tenants alive. Serverless-Postgres-backed schema-per-tenant or pooled RLS is structurally more cost-effective. Revisit cell-based when baseline utilization across the tenant population exceeds ~30%.

- **You cannot define a clean tenant→cell binding.** If your data model has tenants that share data with other tenants — partnership tables, marketplace co-listings, cross-tenant analytics — a cell-based architecture fragments these relationships across cells. Either restructure the data model to keep shared data in cross-cell systems (see [[#how-cell-based-architecture-works]]) or pick a different tenancy model. Pretending cross-cell joins will be "cheap" is the road to a routing layer with hot-loop SQL that never recovers from a slow query.

- **Greenfield product still in pre-PMF.** You have <10 customers, no signed pipeline at the scale that needs cells, and the product may pivot in six months. Cell-based commits you to a platform shape that survives pivots poorly. Start with RLS and migrate later if the product validates.

---

## How Cell-Based Architecture Works

A cell is a vertical slice of infrastructure: independent data plane (database, cache, queue), independent compute (application instances), and independent network namespace (VPC, sometimes separate cloud account). The platform's tenants are partitioned across cells — each tenant lives in **exactly one** cell, and a tenant→cell binding is the platform's source-of-truth lookup. Cells share a thin **control plane** (deployment, observability, secrets) and a set of **cross-cell systems** (identity, billing, tenant catalog) that operate *above* the cell boundary, not inside it.

### Cell topology

```
                              ┌──────────────────────────────────────┐
   client request (HTTPS)     │   Cross-Cell Systems (shared, thin)  │
              │               │                                      │
              ▼               │   ┌──────────────┐ ┌───────────────┐ │
        ┌──────────┐          │   │   Identity   │ │  Billing /     │ │
        │  Edge /  │          │   │  (Auth, JWT) │ │  Metering      │ │
        │ Gateway  │          │   └──────────────┘ └───────────────┘ │
        └────┬─────┘          │   ┌──────────────┐ ┌───────────────┐ │
             │                │   │  Tenant      │ │ Observability  │ │
             │ tenant→cell    │   │  Catalog     │ │ Aggregator     │ │
             ▼ lookup         │   │  (canonical) │ │ (metrics/logs) │ │
        ┌──────────┐          │   └──────────────┘ └───────────────┘ │
        │  Router  │◄─────────┤   ┌──────────────────────────────┐   │
        │  (cache+ │          │   │  Cell Control Plane          │   │
        │   DB)    │          │   │  (deploys, secrets, IaC)     │   │
        └─┬───┬──┬─┘          │   └──────────────────────────────┘   │
          │   │  │            └──────────────────────────────────────┘
          ▼   ▼  ▼
  ┌───────────────┐ ┌───────────────┐ ┌───────────────┐
  │   Cell A      │ │   Cell B      │ │   Cell C      │
  │  (us-east-1)  │ │  (us-east-1)  │ │  (eu-west-1)  │
  │               │ │               │ │               │
  │  App:  3 inst │ │  App:  6 inst │ │  App:  4 inst │
  │  DB:   pg-A   │ │  DB:   pg-B   │ │  DB:   pg-C   │
  │  Cache:rds-A  │ │  Cache:rds-B  │ │  Cache:rds-C  │
  │  Queue: sqs-A │ │  Queue: sqs-B │ │  Queue: sqs-C │
  │               │ │               │ │               │
  │  200 tenants  │ │  450 tenants  │ │  180 tenants  │
  │  (SMB tier)   │ │  (SMB tier)   │ │  (EU resid.)  │
  │               │ │               │ │               │
  │  Intra-cell:  │ │  Intra-cell:  │ │  Intra-cell:  │
  │   RLS or      │ │   RLS or      │ │   schema-     │
  │   schema-per- │ │   schema-per- │ │   per-tenant  │
  │   tenant      │ │   tenant      │ │   (HIPAA EU)  │
  └───────────────┘ └───────────────┘ └───────────────┘
   no cross-cell    no cross-cell     no cross-cell
   network reach    network reach     network reach
```

A few load-bearing properties of the topology:

- **The router is the only component that sees all tenants.** Every other layer is cell-scoped. The router resolves tenant identity (from JWT, subdomain, or path) to a cell ID, then proxies / redirects to that cell's edge. The router is a *new* SPOF that the pooled designs don't have; treat its design as a separate sub-architecture (see [[#routing-layer]]).

- **Cells are network-isolated.** Cell A's application instances cannot reach Cell B's database, cache, or queue. Enforce this with VPC peering rules, security groups, or — in the strongest setups — separate AWS accounts with no peering at all. Cross-cell traffic flows through the cross-cell systems (identity, billing) over explicit APIs, never via "let me just hit the other cell's DB for a sec" backdoors.

- **Cells share a control plane.** A single deployment pipeline ships application code to all cells (with canary rollout — cell-by-cell, not all-at-once). Observability metrics from each cell flow into a single aggregator. Secret rotation runs as a control-plane workflow that updates each cell. The control plane is *thin*: it orchestrates, it does not run customer traffic.

- **Cross-cell systems are also cell-aware-but-shared.** Identity (a JWT signed once, valid across cells) is the canonical example. Billing aggregates metering events from each cell into a single ledger. The tenant catalog — the authoritative tenant→cell mapping — is itself a cross-cell system, and is the input to the router. These systems are typically built as their own small platform, with their own SLA and on-call rotation.

- **Inside a cell, tenants still share infrastructure.** A cell with 300 tenants has 300 tenants sharing one Postgres database, one Redis cluster, one application fleet. The intra-cell isolation mechanism is *also* required — typically [[rls-deep-dive|RLS]] for the dense SMB cells, [[schema-per-tenant]] for the regulated or enterprise cells. **Cells don't replace intra-cell isolation; they wrap it.** This is the single most common misconception in early cell-based designs; surface it early.

### Tenant→cell binding lifecycle

The binding from a tenant to their cell is the *most load-bearing* piece of state in a cell-based platform. Its lifecycle:

1. **Assignment.** At tenant onboarding, the platform chooses a cell. Choice is constrained by: residency requirements, tier (SMB vs enterprise), current cell capacities, and any sticky-customer rules. The assignment is recorded in the **tenant catalog** (a small, well-replicated, well-monitored database).

2. **Propagation.** The assignment is propagated to (a) the router's lookup cache, (b) the cell's local tenant registry (for tenant existence checks), (c) the billing system (for metering attribution), (d) the identity system (for JWT claim issuance).

3. **Steady-state.** Every request carries a tenant identifier (JWT claim, subdomain, etc.). The router looks up tenant→cell, proxies the request. The lookup is fast (Redis cache, < 1 ms p99) backed by the canonical catalog DB for cache misses.

4. **Migration.** When a tenant must move to a different cell (capacity rebalancing, tier upgrade, residency change), a coordinated migration runs. This is the **single hardest operation in the cell-based runbook** — see [[#cross-cell-migration-is-operationally-hard]].

5. **Offboarding.** Tenant offboarding marks the catalog entry as inactive, then the cell-local cleanup runs (data deletion, backup retention per policy). The router stops resolving the tenant; further requests 404 deliberately.

### Routing layer

The router can be implemented in several ways; pick deliberately based on the platform's existing investments:

- **Gateway-based routing with cache + DB.** A reverse proxy (Envoy, Kong, AWS Application Load Balancer with Lambda authorizer, custom NGINX+Lua) extracts tenant ID from the request, consults a Redis cache for tenant→cell, falls back to the canonical catalog DB on cache miss. Cache TTL is ~60 sec; cache invalidation on migration events is the load-bearing operation. **This is the most common pattern.**

- **JWT-claim-encoded cell ID.** The identity system issues JWTs that embed the tenant's cell ID directly (`{ "tenant_id": "...", "cell": "cell-b" }`). The router reads the claim, no lookup required. Faster (no Redis hop) but binds cell migrations to JWT rotation — old JWTs encode stale cells until they expire. Used by platforms with short JWT lifetimes (5–15 min) and a tolerant cache layer.

- **DNS-based routing.** Each cell has its own subdomain (`cell-a.api.platform.example.com`); the canonical platform domain CNAME-rotates tenants to the right cell. Cheap, but DNS TTL becomes the migration coordination unit (15 minutes is the floor on most public resolvers, even with low TTLs). Rarely the primary mechanism; useful as an emergency fallback.

- **Hash routing (no lookup).** Compute `cell = hash(tenant_id) mod N` at the router. Zero lookup cost, but tenant→cell binding is implicit and *cannot be changed* without an N-rebalance that moves every tenant. Used only by platforms whose cells are fungible (no residency, no tier, no migration). Rare; mention for completeness.

#### Gateway routing config (Envoy example)

```yaml
# envoy.yaml (excerpt)
static_resources:
  listeners:
  - name: main
    address: { socket_address: { address: 0.0.0.0, port_value: 8443 } }
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          http_filters:
          - name: envoy.filters.http.lua
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.lua.v3.Lua
              inline_code: |
                function envoy_on_request(req)
                  local tenant = req:headers():get("x-tenant-id")
                  if not tenant then
                    req:respond({[":status"]="400"}, "missing tenant")
                    return
                  end
                  -- Look up cell from Redis cache; fall back to catalog DB on miss.
                  local cell, err = lookup_cell(tenant)   -- defined in companion script
                  if err or not cell then
                    req:respond({[":status"]="503"}, "tenant routing unavailable")
                    return
                  end
                  -- Set the upstream cluster for the request.
                  req:headers():add("x-cell", cell)
                end
          - name: envoy.filters.http.router
          route_config:
            virtual_hosts:
            - name: cells
              domains: ["*"]
              routes:
              - match: { prefix: "/", headers: [{name: "x-cell", exact_match: "cell-a"}] }
                route: { cluster: cell_a_upstream }
              - match: { prefix: "/", headers: [{name: "x-cell", exact_match: "cell-b"}] }
                route: { cluster: cell_b_upstream }
              - match: { prefix: "/", headers: [{name: "x-cell", exact_match: "cell-c"}] }
                route: { cluster: cell_c_upstream }

  clusters:
  - name: cell_a_upstream
    type: STRICT_DNS
    load_assignment:
      cluster_name: cell_a_upstream
      endpoints:
      - lb_endpoints:
        - endpoint: { address: { socket_address: { address: cell-a.internal, port_value: 8443 } } }
  # ... cell_b_upstream, cell_c_upstream defined similarly
```

The Lua filter's `lookup_cell` is the load-bearing primitive. Its contract: tenant ID in, cell ID out, **never** silently return a stale cell. A stale cell from cache during a tenant migration window is a cross-cell read (the tenant's data has moved but the request goes to the old cell) — a correctness bug, not a performance bug. Mitigations: short cache TTL (≤60 sec), explicit cache invalidation on migration events, an `x-cell-version` header that the cells reject if it does not match their current version.

### Network policy (Kubernetes example)

```yaml
# Cell A's namespace gets a default-deny network policy plus explicit allow
# for cross-cell systems only. Cells cannot talk to each other directly.
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
        matchLabels: { tier: edge-gateway }    # only the router can reach this cell
    ports:
    - protocol: TCP
      port: 8443
  egress:
  - to:
    - namespaceSelector:
        matchLabels: { tier: cross-cell-systems }  # identity, billing, catalog
  - to:
    - podSelector: {}                          # intra-cell traffic always allowed
      namespaceSelector:
        matchLabels: { cell: cell-a }
  - to:                                        # DNS
    - namespaceSelector:
        matchLabels: { kubernetes.io/metadata.name: kube-system }
    ports:
    - protocol: UDP
      port: 53
```

The default-deny posture is non-negotiable. Without it, the first developer who needs "just a quick read from cell-b for an analytics query" opens a hole that is never closed and silently degrades cell isolation. Make the policy the boundary; review every NetworkPolicy change in a security-engineering rotation.

---

## Failure Modes

The four production-fire modes below account for essentially every cell-based outage and silent-inconsistency event surfaced in incident reviews through 2025. None of them is exotic; all of them are operational.

### cell-routing-complexity

**Mechanism:** the router is a new SPOF the pooled designs don't have. Every customer request gates on a tenant→cell lookup before reaching any application code. The router's failure modes are *separate from* the cells' failure modes — the cells can be perfectly healthy and the platform is down because the router cannot resolve cells. The most common sub-failures:

- The router's Redis cache is unreachable; the router falls back to the catalog DB on every request; the catalog DB melts under N× the steady-state load. The platform goes from "responsive" to "fully unavailable" in under 30 seconds.
- The router's tenant→cell mapping is stale during a tenant migration; some requests land on the old cell (with no data) and some on the new cell (with the data). The 50% error rate looks like an application bug, not a routing bug.
- The router itself is deployed as a single-AZ service and an AZ outage takes down all customer traffic — including for cells that are in other AZs and perfectly healthy.

**Concrete example:** the Redis cluster fronting the router is restarted for a security patch. Cache is cold. The router sees 5,000 RPS land on the catalog DB (which was sized for ~50 RPS of cache misses). The catalog DB CPU saturates; lookups time out; the router serves 503 to every request for 4 minutes. During those 4 minutes, customers see a complete platform outage even though every cell is healthy.

**Mitigations:**

- **Multi-AZ deployment with health-based failover.** The router runs in at least three AZs. Loss of any one AZ does not impact routing capacity. Use a load balancer with active health checks against each instance, not just liveness probes.
- **Warm cache priming during deploys and Redis restarts.** Before draining the old Redis instance, bulk-load the catalog into the new one. Cold caches are an operational mistake, not a design feature.
- **Catalog DB sized for cache-miss-storm.** Size the catalog DB to handle 100% of steady-state RPS for a sustained period, not just the cache-miss rate at steady state. The math: at 5000 RPS with a 99.9% cache hit rate, miss rate is 5 RPS — but the *worst case* is 5000 RPS during cache outages. Provision for the worst case.
- **Stale-but-valid responses.** When the router cannot reach the cache *or* the catalog, return the last-known-good cell mapping (cached locally on the router instance) rather than 503. This trades a small window of stale routing for availability. Pair with an explicit max-staleness (e.g., 5 min) and alerting on stale-response rate.
- **Routing-layer SLO and on-call.** The router gets its own SLO (e.g., 99.99% availability), its own on-call rotation, and its own runbook. It is *not* "just infrastructure"; treat it as a tier-0 service.
- **Synthetic monitoring of tenant→cell lookups.** A continuous synthetic check that picks a random tenant from each tier, resolves their cell, and asserts the resolution matches the catalog DB. Catches drift between cache and DB before customers do.

### intra-cell-shared-resources

**Mechanism:** within a cell, tenants still share infrastructure. A noisy tenant in Cell A's Postgres database affects every other tenant in Cell A — same WAL, same buffer cache, same connection pool. The cell boundary does *not* solve intra-cell noisy-neighbor problems; it bounds their blast radius to one cell's worth of tenants instead of all tenants. This is **fine** as a design property, but architects routinely under-invest in intra-cell isolation because "we have cells now, the isolation is solved" — and then a single hot tenant degrades 300 other tenants in the same cell while the other cells stand idle.

**Concrete example:** Cell B has 450 SMB tenants, all on shared RLS. Tenant 0x7ab9 runs a runaway report query that scans 2 TB of data and pins shared_buffers. p99 latency for the other 449 tenants in Cell B spikes from 50 ms to 800 ms. The cell-based design is "working as intended" — Cells A and C are fine — but the platform's overall SLA against any individual tenant breaks for the duration. Customers who paid extra for cell isolation file complaints, having assumed cell isolation meant tenant isolation.

**Mitigations:**

- **Pick an intra-cell isolation model deliberately.** Each cell still runs [[rls-deep-dive|RLS]] or [[schema-per-tenant]] internally; the failure modes of each apply *within* the cell. The cell does not exempt the design from RLS policy testing or schema migration discipline. Document the intra-cell choice in the cell's `cell-design.md`.
- **Per-tenant resource limits within cells.** `statement_timeout`, per-role `work_mem` ceilings, query-cost-based limits at the application layer. Pair with per-tenant request rate-limiting at the edge.
- **Cell-level density caps.** Don't pack a cell to the point that one noisy tenant can saturate it. Empirically, 150–500 tenants per cell is a comfortable density for SMB workloads; enterprise cells are 5–50 tenants per cell. Capture the per-cell density target in cell-design.md.
- **Per-cell per-tenant observability.** Surface per-tenant load metrics *within* each cell. Trade cardinality cost for the ability to identify the noisy tenant in under a minute when an incident hits.
- **Migration of noisy tenants between cells.** Document the "this tenant is too noisy for SMB density, promote to enterprise cell" operation. Pair with commercial follow-up; noisy tenants are often legitimate enterprise-tier conversions.

### capacity-planning-per-cell

**Mechanism:** cells have bounded capacity — typically defined by tenant count, baseline QPS, or storage footprint, whichever caps first. Tenant growth requires either (a) splitting an existing cell into two (cell-split), (b) adding a new cell and routing new tenants to it (cell-add), or (c) migrating tenants from a hot cell to a cooler cell (cross-cell migration). All three operations are expensive. Capacity planning at the *cell* level becomes a continuous workstream — every quarter, every cell's headroom must be reviewed against projected tenant growth, and the next operation must be scheduled.

**Concrete example:** the platform grew faster than projected. Cell B is at 480 tenants on a design ceiling of 500. The next 20 onboardings get routed to Cell A (at 220 tenants, comfortable). Three months later, Cell A is at 380 and Cell C just absorbed 100 EU residency tenants and is at 280. The platform projects 200 more onboardings in the next quarter; the team has no clear answer for *which cell those go to* without spinning up Cell D or running a split of Cell B. The capacity plan is reactive, not proactive; new-cell provisioning takes 3 weeks, but the team didn't start 3 weeks ago.

**Mitigations:**

- **Per-cell capacity dashboards with forecasting.** For each cell, track: tenant count, baseline QPS, storage in use, p99 latency. Forecast each against onboarding projections. Alert when any metric is projected to cross 80% of cell-design ceiling within 90 days.
- **Quarterly cell-capacity review.** A formal review of every cell's headroom against the next two quarters' tenant projection. Decide: cell-add, cell-split, or noop. Schedule the operation. Capture the decision in the platform's quarterly platform-review artifact.
- **Provision new cells *before* you need them.** A cell that takes 3 weeks to provision must be ordered 6 weeks before saturation, not 1 week. The cost of an empty cell for 3 weeks is much smaller than the cost of an emergency cell provisioning under load.
- **Routing-layer "cell weight" knobs.** The router supports a per-cell weighting that shifts new-onboarding traffic between cells without migrating existing tenants. Use to drain a hot cell gradually rather than splitting it under emergency conditions.
- **Cell-split as a planned operation, not an emergency one.** Document the runbook. Run it as a drill quarterly against a non-production cell. Cell-splits that are first executed against a saturated production cell at 2 AM are how platforms have multi-hour outages.

### cross-cell-migration-is-operationally-hard

**Mechanism:** moving a tenant from Cell A to Cell B is the single hardest operation in the cell-based runbook. The tenant's data lives in Cell A's database, cache, and queue. To move them: dump from Cell A, transfer to Cell B, restore in Cell B, flip the router, invalidate caches, drain in-flight requests on Cell A, drop the tenant from Cell A. Each step has failure modes. The customer-visible failure mode is the worst: **downtime during the cutover** (typically 1–10 minutes) or, if dual-write is implemented, several days of operational complexity managing the dual-write window.

**Concrete example:** an enterprise tenant on Cell B requests EU residency due to new GDPR data-residency contract clauses. The platform must migrate them to Cell C (eu-west-1). Steps: (1) `pg_dump` from Cell B's database, (2) transfer ~80 GB across regions (~25 minutes on a 1 Gbps link), (3) `pg_restore` into Cell C, (4) drain Cell B's pending queue messages for this tenant, (5) replay any messages that arrived during the transfer window, (6) flip the router, (7) invalidate caches in Cell B's app instances. Total wall-clock: 90 minutes. During that window: either accept downtime, or run a dual-write layer (which is its own project). Customer's contract requires under 15 minutes of downtime in a calendar quarter. The migration consumes 6× the quarterly budget in a single operation.

**Mitigations:**

- **Document the cross-cell migration runbook *before* the first migration.** Not "we'll figure it out when the time comes." The first migration's value to the team is the runbook itself, validated on a synthetic tenant in staging. Run the migration drill in staging quarterly.
- **Plan migration windows with the customer.** Cross-cell migration is a customer-facing operational event. Schedule it; communicate the downtime window; capture customer sign-off. Migrations that are run "transparently" without customer awareness become customer-trust events when something goes wrong.
- **Use logical replication for live migrations where possible.** Postgres logical replication can replicate per-database (or per-schema with creative configuration) into the destination cell while the source is live. Cut over by stopping writes on source, replaying remaining WAL, and flipping the router. Reduces the downtime window from ~10 min to ~30 sec. Pair with explicit application-level dual-write only if logical replication is insufficient.
- **Practice migrations in non-production weekly.** Pick a synthetic tenant; migrate it from one staging cell to another; measure wall-clock; refine the runbook. The team that has done 50 staging migrations is the team that can do a production migration without panic.
- **Limit migration frequency.** Cross-cell migrations should be exceptional, not routine. Capacity planning that requires monthly migrations between cells means the cells are under-sized; fix the sizing instead.
- **Capture migration as a billable / contracted event.** Migrations triggered by customer-side changes (residency, tier upgrade) should be accounted for in contract terms — typical clauses include downtime windows, migration lead times, and customer-prep requirements.

---

## Operational Patterns

Cell-based architecture is a mechanism but it lives or dies on operational discipline. The patterns below are mandatory for any production cell-based deployment.

**Cell-split runbook.** Splitting a saturated cell into two:

1. Provision the new cell using the same IaC as existing cells. Wait for the new cell to be fully healthy (synthetic traffic green, all dependencies wired up).
2. Identify the tenant cohort to move. Typical strategies: bottom-N by data volume (move small tenants first to validate the runbook), or stratified by recent traffic (move dormant tenants first to minimize migration risk).
3. For each tenant in the cohort, run the cross-cell migration runbook. Sequence rather than parallel — parallel migrations multiply failure surface.
4. Update cell-capacity dashboards. Confirm the source cell is back inside its design ceiling.
5. Conduct a post-split review within 7 days; capture lessons; update the runbook.

**Cross-cell migration runbook (high level).** See [[#cross-cell-migration-is-operationally-hard]] for the concrete mechanics. The runbook must specify: customer communication template, scheduling window selection, pre-migration validation, the migration script itself, post-migration verification (data integrity, cache invalidation, observability namespace migration), rollback procedure if cutover fails. Length target: 200–400 lines, including embedded SQL and routing commands. Drill quarterly.

**Per-cell observability namespace.** Each cell emits metrics, logs, and traces with a `cell=<id>` tag. The cross-cell observability aggregator presents per-cell dashboards plus aggregated views. Cardinality cost is bounded by cell count, not tenant count — cell-based actually *helps* observability cardinality versus pooled designs.

```yaml
# Example Prometheus relabeling at the per-cell collector
relabel_configs:
- source_labels: [__address__]
  target_label: cell
  replacement: cell-a   # baked into the cell's collector config; never user-supplied
- source_labels: [job, cell]
  target_label: pipeline_id
  replacement: ${1}/${2}
```

Per-tenant metrics inside a cell follow the cell's intra-cell isolation model's observability discipline ([[rls-deep-dive]] §observability or [[schema-per-tenant]] §observability).

**Capacity planning.** For each cell, capture in cell-design.md:

- Design ceiling: max tenant count, max QPS, max storage. These come from load-testing the cell, not from aspiration.
- Current state: monthly snapshot of tenant count, peak QPS, storage in use.
- Forecast: 90-day, 180-day projection based on onboarding pipeline.
- Action: noop / monitor / plan-split / plan-add / migrate-out, with a named owner if anything other than noop.

Cell-design.md is reviewed every quarter as part of the platform-review process. Capacity drift between cells (one cell at 90%, another at 30%) is a leading indicator that the routing layer's onboarding policy needs adjustment.

**Cell control plane vs data plane.** The control plane (deploys, secrets, IaC, observability aggregation) is **shared** across cells. The data plane (customer traffic, databases, queues) is **per-cell**. The discipline:

- Control-plane changes are propagated to cells via the deploy pipeline. Canary one cell, validate, then roll forward. Cells deploy in waves of 1 → 1 → all-remaining, not all-at-once.
- Data-plane changes (schema migrations, data fixes) run per-cell, in coordination with the cells' intra-cell isolation models. A schema migration that ships to all cells in one pipeline run is a control-plane operation; the execution within each cell follows the cell's intra-cell schema-migration discipline.
- The control plane has no customer data. If you need customer data in a control-plane process (e.g., a backup orchestrator), the orchestrator runs per-cell and the data never leaves the cell boundary.

Capture this split in the platform's architecture documentation. Discipline drift here is the root cause of "the control plane became the SPOF" incidents.

**Secret rotation.** Per-cell secrets (database passwords, signing keys) rotate via the control plane on a documented schedule. Cross-cell secrets (the JWT signing keypair, the inter-cell mTLS CA) rotate via a coordinated workflow that ships to all cells before old keys are retired. A botched secret rotation that ships the new key to half the cells before retiring the old one is an outage; document the sequence and run a rotation drill quarterly.

**Cell onboarding (new cells).** Bringing up a new cell:

1. Apply the cell-IaC module with a fresh cell ID. Provisioning takes 30–60 min for a basic cell, several hours for cells with full HA replicas and cross-region backup wiring.
2. Run synthetic-traffic smoke tests. Validate intra-cell isolation, routing-layer registration, observability propagation.
3. Migrate or onboard the first tenants. Start with internal / synthetic tenants to validate, then real onboarding traffic.
4. Add the cell to the capacity-planning dashboard and quarterly review cadence.

Cell onboarding is **not** a manual operation; it is IaC end-to-end. Manual cell setup steps are the leading source of inter-cell configuration drift.

**Cell decommissioning.** Retiring an old cell (usually because tenant migration has drained it):

1. Confirm via the catalog DB that no active tenants remain in the cell. The check is mechanical, not "I'm pretty sure".
2. Take a final backup of the cell's data plane. Retain per data-retention policy.
3. Drop the cell from the routing layer's configuration; the cell's endpoints stop receiving traffic.
4. Tear down the cell's infrastructure via IaC. Verify cost reduction in the next billing cycle.
5. Update the platform's cell inventory.

Decommissioning runs through the same IaC as onboarding; an "old cell" left running because nobody owned tearing it down is a non-trivial bill line item and a residual attack surface.

---

## Trade-offs

Comparing cell-based against the alternatives surfaced by [[tenancy-decision-framework]]. Numbers calibrated against production deployments through 2026; treat as orienting, not authoritative.

| Dimension | RLS (pooled) | Schema-per-tenant | Cell-based (this fragment) | Cell-based + shared control plane variants |
|---|---|---|---|---|
| **Active tenant fit** | Best ≤ ~1,000 per instance | Best 100–1,500 per cluster | Best 1,000–100,000+ (per cell: 100–800 tenants depending on tier) | Same; variants differ in control-plane density |
| **Marginal cost per tenant** | $0.50–$3 / mo | $3–$10 / mo | $10–$80 / mo (drops sharply with cell density; thin cells of 10 tenants can cost $200+) | $8–$50 / mo (control-plane share amortizes faster) |
| **Per-cell fixed cost** | N/A (single cluster) | N/A (single cluster) | $3k–$30k / mo per cell (compute, DB, cache, queue, observability share) | Reduced by 30–50% via shared control plane |
| **Isolation strength** | Logical only | Schema + grants; single OS process | Physical: separate DBs, separate networks, often separate accounts | Same per cell; control-plane is the shared seam |
| **Blast radius** | All tenants per instance | All tenants per cluster | One cell's worth of tenants | Same; control-plane outage can affect *deploys* across cells but not traffic |
| **Audit story** | SOC2 OK with policy tests | SOC2/HIPAA/PCI clean | All including FedRAMP-High, IL4, IL5, CJIS | Same per-cell; control-plane scope must be auditor-acknowledged |
| **Multi-region / residency support** | Hard — requires cross-region pooling | Hard — requires cross-region replication | Native — one cell per region, routing layer pins residency | Same |
| **Ops headcount floor** | 2–3 FTE | 3–5 FTE | 5–10 FTE (router + cells + cross-cell systems + cell-split runbook ownership) | 4–7 FTE (control-plane share reduces some duplication) |
| **Per-query overhead** | 0.5–8 ms (RLS planner) | Near-zero | Near-zero per cell + 1–5 ms routing layer | Same |
| **Failure mode density** | High (4 silent failure modes) | Medium (4 mostly-operational failure modes) | Medium (4 mostly-operational; failures are loud — cell down, routing miss) | Same |
| **Migration cost from prior tier** | N/A (default) | RLS → schema: 1 engineer-week + 5 min/tenant | RLS → cell: 3–6 engineer-months. Schema → cell: 2–4 engineer-months. | Same; control-plane investment is reusable |
| **Migration cost to next tier** | RLS → schema: low | Schema → cell: medium | Effectively terminal; consolidating back loses isolation guarantees sold to customers | Same |
| **Greenfield-on-day-one cost** | $5k–$20k / mo | $10k–$40k / mo | $30k–$80k / mo minimum (one cell + router + cross-cell systems) | Slightly lower fixed cost |

**Reading the table:**

- **vs RLS:** cell-based wins on isolation, blast radius, multi-region, audit story. RLS wins on cost (3–20× cheaper at small tenant counts), ops simplicity, and absence of routing-layer SPOF risk. Crossover happens around 1,500 active tenants AND ops-team-size ≥ 5; below either threshold, RLS is the better choice even if cell-based looks more "enterprise". Cost premium is paid in real money every month, not in abstract ops debt.
- **vs schema-per-tenant:** cell-based offers physical isolation that schema-per-tenant cannot — separate networks, separate accounts, separate DBs. Schema-per-tenant is sufficient for SOC2/HIPAA/PCI; cell-based is mandatory for FedRAMP-High/IL4/IL5/CJIS. Schema-per-tenant ops scale to ~1,500 schemas; cell-based scales further. Migration cost is meaningful (2–4 engineer-months); plan deliberately.
- **vs cell-based with shared control plane variants:** the variants amortize fixed costs across cells and are the right choice for most platforms. Pure-isolation cells (separate AWS accounts with no shared anything) exist for FedRAMP-equivalent customers but pay the full fixed-cost penalty per cell. Most deployments are "shared control plane, isolated data plane".

### Common misreadings of the matrix

- "Cell-based is the most isolated, so it's the safest default." Wrong: cells add the **routing layer SPOF** that pooled designs don't have. A misbehaving router takes down all customers; a misbehaving cell takes down one cell's customers. Isolation is a *vector*, not a scalar; cell-based pushes pain from "all tenants" to "all routing-dependent traffic", which is a real trade-off.
- "Cells are independent so we can run them however we want." Wrong: cells must be configured *identically* via IaC, or configuration drift creates per-cell bugs that are nearly impossible to triage. Discipline here is the difference between cell-based working and cell-based being a per-cell snowflake nightmare.
- "Once we're cell-based, we can move tenants between cells freely." Wrong: cross-cell migration is the hardest operation in the runbook. Plan capacity to *minimize* migration frequency; treat migrations as exceptional events, not routine ones.

### Anti-pattern signals from the matrix

If your projected tenant count is 600 and ops headcount is 4, cell-based with even 2 cells costs ~$60k/mo in fixed infrastructure plus 4× the ops surface area of pooled — your platform's gross margin gets pulled down by 10–20% for isolation properties the customer base may not value. Either:
- accept the cost premium and price the product accordingly, with explicit messaging that customers are paying for physical isolation; or
- defer cell-based until tenant count and ops headcount cross the structural thresholds; or
- pick schema-per-tenant as the middle path and revisit when scale or compliance forces the move.

---

## Quality Checks

These checks apply before merging a cell-based tenancy design to platform main, and again as a quarterly review.

- **CRITICAL:** tenant-to-cell mapping must be deterministic and stable; tenant migration between cells = significant operational event requiring a documented runbook BEFORE the first migration is attempted. The tenant catalog DB is the canonical source-of-truth for tenant→cell binding; the router consults it (directly or via cache) on every request. Mapping ambiguity (a tenant resolving to two different cells at the same time) is a cross-cell read or a cross-cell write, both of which are correctness failures. The cross-cell migration runbook is drilled in staging before any production migration is attempted; first-production-migration-from-an-undrilled-runbook has caused every published cell-based outage with cross-cell-migration in its timeline through 2025. Treat this control as non-negotiable.

- **Cell capacity headroom monitoring.** Per-cell dashboards track tenant count, QPS, and storage against design ceilings. Alerting fires when any metric is projected to cross 80% within 90 days. Quarterly review of every cell's capacity feeds the cell-split / cell-add / migrate-out decision. Capacity drift between cells (one at 90%, another at 30%) is logged as an action item, not noise.

- **Cross-cell traffic auditing.** A scheduled job enumerates all network flows between cells (via VPC flow logs, eBPF, or service-mesh metrics). Expected flows are limited to the cross-cell systems (identity, billing, catalog, observability aggregation); any other flow is a violation of the cell-isolation property. Alert on unexpected flows. Quarterly review of the flow inventory.

- **Cell control-plane vs data-plane separation discipline.** Code review enforces: no customer data in control-plane code paths; no per-customer logic in IaC modules; no "I'll just add this one cross-cell call" backdoor in application code. Quarterly: a security engineer audits the control plane's reach (what does it call? what data does it touch?) and certifies the boundary is intact. Drift here is the root cause of "the control plane became the SPOF" incidents.

- **Routing-layer SLO and stale-mapping defense.** The router has its own SLO (typically 99.99% availability) tracked separately from the cells. Stale-mapping rate (tenant→cell resolution that returned a stale cell due to cache lag during a migration) is monitored and alerted at a per-deployment threshold. Synthetic monitoring continuously validates random tenant→cell resolutions against the canonical catalog.

- **Cell-split and cross-cell migration drills quarterly.** A drill in staging runs the cell-split runbook against a synthetic cell and validates the runbook end-to-end. A drill runs the cross-cell migration runbook on a synthetic tenant. Findings update the runbook. Drills that are skipped this quarter compound: the team that has not split a cell in 18 months will struggle when production demands a split.

- **IaC parity across cells.** A CI job diffs the IaC state of each cell against the canonical IaC module; any drift is logged and tracked to remediation. Cells should be configurationally identical except for parameters (region, ID, capacity). Drift between cells is a configuration bug regardless of whether it has surfaced as an incident yet.

- **Network-policy default-deny posture verified.** Every cell namespace has a default-deny NetworkPolicy and explicit allow-list to the cross-cell systems only. A CI / production check confirms the policy is in place and matches the canonical template. Removing the default-deny is a security-engineering-approval operation, not a runtime change.

- **Per-cell intra-cell isolation discipline maintained.** Each cell's intra-cell isolation model ([[rls-deep-dive|RLS]] or [[schema-per-tenant]]) has its own quality checks running per-cell. The cell-based design does **not** exempt the cells from intra-cell isolation; QG-M2 evaluates the intra-cell quality checks for every cell, not in aggregate.

- **Re-evaluation trigger captured.** The tenancy-model.md output includes re-evaluation triggers ("re-run the framework when cell count exceeds 12 OR when a single cell exceeds 800 tenants OR when ops-team-size drops below 5"). Cell-based designs that omit triggers end up at the next scaling cliff with no plan.

- **Reviewer rotation.** Cell-based designs are reviewed by at least one engineer who is *not* the author. For FedRAMP-High / IL4 / IL5 / CJIS scope or for migrations between tenancy models, escalate to a principal-level reviewer plus a security-engineering reviewer.

- **Ops headcount audit.** The platform's ops headcount is reviewed annually against the cell count. Empirical heuristic: 1 platform engineer per 2–3 cells, minimum 5 FTE total. Underrun triggers either a hiring plan or a cell-consolidation plan; running cell-based understaffed is the highest-risk failure mode in the framework.

---

## Web Research Queries

Use these queries (with `{date}` replaced by the current year) to refresh empirical inputs. Cell-based *mechanism* is stable, but *tooling* (routing-layer implementations, IaC patterns, observability aggregators) shifts annually.

- `cell-based architecture multi-tenant SaaS {date}` — surfaces reference architectures from AWS SaaS Lens, Slack's cell-based migration write-ups, Shopify pods, Stripe's tenancy posts. Watch for posts that describe production cell sizes, tenant densities, and migration runbooks rather than abstract architecture diagrams.
- `AWS cell-based reference architecture {date}` — AWS Well-Architected SaaS Lens, Reducing the Scope of Impact with Cell-Based Architecture whitepapers. Cross-link findings into your cell-design.md.
- `tenant routing at gateway {date}` — operational guidance on tenant→cell routing implementations: Envoy + Lua, Kong plugins, Cloudflare Workers, AWS Lambda authorizers. Watch for posts that discuss cache strategies, stale-mapping handling, and routing-layer SLO.
- `cell isolation network policy {date}` — Kubernetes NetworkPolicy patterns for cell isolation; service-mesh policies (Istio, Linkerd) for cross-cell traffic control; VPC peering and AWS account separation patterns. Useful for the network-policy default-deny quality check.
- `multi-region tenant residency SaaS {date}` — operational guidance on residency pinning, cross-region data-flow controls, GDPR / Australian Privacy Principle 8 / sovereign cloud implementations. Cross-link with the residency-aware routing variants.
- `cross-cell tenant migration logical replication {date}` — postgres logical replication for cross-cell migrations, dual-write patterns, downtime-window minimization techniques. Useful for the cross-cell migration runbook.
- `SaaS blast radius containment {date}` — surveys of blast-radius patterns, including but not limited to cell-based: bulkheads, circuit breakers, regional failover. Useful for vocabulary alignment with auditors.
- `cell-based architecture FedRAMP {date}` — auditor-facing guidance on cell-based as a control for FedRAMP-High / IL4 / IL5 / CJIS scope. Note that auditor *practice* often goes beyond the *letter* of the framework; gather both.

When a query returns content older than 18 months, treat as orientation only. The routing-layer and service-mesh landscape (Envoy, Istio, Cilium, Linkerd) is shifting fast enough that 2-year-old tooling guidance may be stale even if the *mechanism* still holds.

### Source-quality heuristics

- **AWS Well-Architected SaaS Lens and Builders Library.** Useful for vocabulary alignment (silo / pool / bridge / cell) and for the auditor-facing isolation story. Recommendations skew toward AWS services they sell.
- **Vendor write-ups** (Slack pods, Shopify pods, Stripe tenancy posts, AWS SaaS Factory case studies). High signal on real-world cell sizes, migration runbooks, and failure modes; biased toward their own platforms' constraints.
- **Auditor-facing content.** ISACA, CSA, FedRAMP PMO, FedRAMP marketplace listings. Useful for the compliance-scope conversation; rarely prescriptive about cell-based specifically but pragmatically required.
- **Academic / industrial research.** SIGMOD / VLDB papers occasionally publish cell-based or sharding tenancy benchmarks; treat as ground truth for *that* deployment shape, not as universal numbers.
- **Postgres official docs.** Ground truth for logical replication and pg_dump-based migration patterns used in cross-cell migration runbooks.

---

## Cross-references

**Companion fragments:**

- [[tenancy-decision-framework]] — the upstream decision aid that produces a cell-based recommendation in the first place. This fragment is the deep-dive consulted *after* the framework leaf lands on cell-based. Defects in cell-based scoping should propagate back to the framework as input clarifications, not stay localized here.
- [[rls-deep-dive]] — the lighter-weight alternative, and the typical *intra-cell* isolation mechanism for dense SMB cells. Cells do not replace RLS; they wrap it. Read this fragment alongside cell-based when designing the cell's intra-cell data layer.
- [[schema-per-tenant]] — the middle-tier alternative, and the typical *intra-cell* isolation mechanism for enterprise or regulated cells. Same relationship as RLS: cells wrap schema-per-tenant inside the cell; they do not replace it.
- [[tenant-isolation-testing-patterns]] — the test catalog enforced at QG-M2. Cell-based deployments need both *intra-cell* isolation tests (per cell, model-specific) and *inter-cell* isolation tests (routing-staleness, cross-cell network reachability, cross-cell migration correctness). Do not treat tests as optional.

**Implementation patterns:**

- [[cell-based-with-routing]] — concrete routing-layer designs, hash vs range vs directory routing, residency-aware variants, cache topology, stale-mapping handling. The hands-on companion to this fragment.
- [[rls-row-level-security]] — RLS policy templates, used inside cells with RLS as the intra-cell isolation model.
- [[schema-per-tenant-with-pgbouncer]] — schema-per-tenant connection-pool topology, used inside cells with schema-per-tenant as the intra-cell isolation model.
- [[secrets-and-roles-postgres]] — role and grant hygiene patterns; relevant for cell-local Postgres role separation and for the cross-cell secret rotation discipline.

**Quality gate:**

- `QG-M2` checklist (`src-v6/bmad-bam-platform/data/checklists/qg-m2-tenant-isolation.md`) — the gate this fragment's recommendations feed. Every cell-based tenancy-model.md MUST clear QG-M2 before merging to platform main, and the inter-cell isolation tests from [[tenant-isolation-testing-patterns]] must be green, as must each cell's intra-cell test suite.

**Related decisions and future workflows:**

- Cell-based choice constrains the **observability cardinality strategy**: cardinality scales with cell count, not tenant count, which is a net improvement. Per-cell namespaces in metrics/logs/traces become a first-class concept; surface this in tenancy-model.md §6 (Ops implications).
- Cell-based choice constrains **billing / metering**: per-tenant metering events flow from cells to the cross-cell billing aggregator. The aggregator must reconcile metering events that arrive out-of-order from different cells; treat reconciliation as a separate design concern.
- Cell-based choice constrains **AI-runtime tenant scoping** (Nova module, P3+). Per-cell AI runtimes (per-cell vector stores, per-cell prompt caches) are the natural shape; cross-cell AI traffic is a backdoor that must be designed out. Plan this propagation.
- Cell-based choice interacts with the **disaster-recovery design** — when `QG-D1` and the associated `design-disaster-recovery` workflow ship (future P-phase), the workflow consumes this fragment's cell topology as input. DR strategy options include cross-region cell pairs (active-passive), multi-region cells with sticky routing (active-active per residency zone), and cell-snapshot-based recovery; the choice depends on RTO/RPO targets captured in the workflow.
- Cell-based choice influences the **acquisition / migration story**: absorbing an acquired SaaS product becomes "stand up a new cell" with the acquired product's stack inside it; cross-cell systems (identity, billing) integrate at the seams. This is one of cell-based's strongest properties for M&A-active SaaS platforms.
- Cell-based choice influences the **support-engineer experience**: support engineers access cells via per-cell bastion / break-glass; their access logs flow into the cross-cell SIEM. Document the support workflow and the per-cell privilege model.

**Upstream specs:**

- `docs/v6-final-architecture.md` §6.3 (fragment schema), §4.1 (Atlas voice), §6.2 (frontmatter schema). Defects to this fragment's structure should be filed as spec patches, not unilateral changes.
- `std-frontmatter.md`, `std-validation.md` (this module's standards). The frontmatter above conforms to `std-frontmatter`.

**Downstream consumers:**

- `design-tenancy-model` skill (`src-v6/bmad-bam-platform/2-modules/bmad-bam-design-tenancy-model/`) — primary consumer. When the skill's traversal of [[tenancy-decision-framework]] lands on cell-based, `step-05-c-write-design` references this fragment for the rationale, ops implications, and isolation-tests-required sections.
- Atlas memory (`_bmad/_memory/atlas/architecture-decisions/`) — every cell-based ADR should reference this fragment by id (`cell-based-architecture`) for the rationale's mechanism description.
- Future `design-disaster-recovery` workflow (QG-D1, P-phase TBD) — consumes the cell topology and routing-layer design from this fragment as input to the DR strategy decision.
