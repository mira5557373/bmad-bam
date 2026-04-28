# Step 02: Design Metrics Collection

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Design tenant-scoped metrics, tier quota metrics, business metrics, infrastructure metrics
- 💾 Track: `stepsCompleted: [1, 2]` when complete
- 📖 Context: Tenant dimensions from Step 01, cardinality constraints
- 🚫 Do NOT: Design logging or tracing yet - those come in Steps 03-04
- 🔍 Use web search: Verify metric naming and aggregation patterns
- ⚠️ Gate: QG-OC (Observability Completeness)

---


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Gathering required inputs for this step
- Making design decisions within step scope
- Documenting decisions with rationale

**OUT OF SCOPE:**
- Decisions from other steps
- Implementation details
- Validation (separate mode)
## Purpose

Design tenant-aware metrics collection strategy covering tenant-scoped operational metrics, per-tier quota tracking, business metrics for usage and revenue attribution, and infrastructure metrics with tenant correlation.

---

## Prerequisites

- Step 01 complete: Observability foundation loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `usage-metering`

---

## Inputs

- Tenant dimension catalog from Step 01
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Tier definitions (quota limits per tier)
- Business metrics requirements

---

## Actions

### 1. Design Tenant-Scoped Metrics

Define operational metrics with `tenant_id` label:

```yaml
tenant_metrics:
  # Request metrics
  - name: tenant_api_requests_total
    type: counter
    labels: [tenant_id, endpoint, method, status_code]
    description: "Total API requests per tenant"
    cardinality: "Medium - endpoint set is bounded"
    
  - name: tenant_api_request_duration_seconds
    type: histogram
    labels: [tenant_id, endpoint]
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10]
    description: "Request latency distribution per tenant"
    
  # Agent metrics
  - name: tenant_agent_invocations_total
    type: counter
    labels: [tenant_id, agent_id, outcome]
    description: "Agent invocations per tenant"
    
  - name: tenant_agent_response_duration_seconds
    type: histogram
    labels: [tenant_id, agent_id]
    buckets: [0.5, 1, 2, 5, 10, 30, 60]
    description: "Agent response time per tenant"
    
  # Resource metrics
  - name: tenant_active_users
    type: gauge
    labels: [tenant_id]
    description: "Current active users per tenant (rolling 24h)"
```

### 2. Design Per-Tier Quota Metrics

Track usage against tier limits:

```yaml
quota_metrics:
  # Storage quotas
  - name: tenant_storage_bytes
    type: gauge
    labels: [tenant_id, storage_type]
    description: "Current storage usage per tenant"
    
  - name: tenant_storage_quota_bytes
    type: gauge
    labels: [tenant_id]
    description: "Storage quota limit per tenant (from tier)"
    
  # Token quotas (for AI agents)
  - name: tenant_llm_tokens_total
    type: counter
    labels: [tenant_id, model, direction]  # direction: input/output
    description: "LLM tokens consumed per tenant"
    
  - name: tenant_llm_tokens_quota
    type: gauge
    labels: [tenant_id]
    description: "Monthly token quota per tenant (from tier)"
    
  # Rate limiting
  - name: tenant_rate_limit_remaining
    type: gauge
    labels: [tenant_id, limit_type]
    description: "Remaining rate limit budget per tenant"
    
  - name: tenant_rate_limit_exceeded_total
    type: counter
    labels: [tenant_id, limit_type]
    description: "Rate limit exceeded events per tenant"
```

### 3. Design Business Metrics

Define usage and revenue attribution metrics:

```yaml
business_metrics:
  # Usage attribution
  - name: tenant_usage_units_total
    type: counter
    labels: [tenant_id, usage_type]
    description: "Billable usage units per tenant"
    
  - name: tenant_feature_usage_total
    type: counter
    labels: [tenant_id, feature_name]
    description: "Feature adoption tracking per tenant"
    
  # Revenue metrics (platform-level aggregation)
  - name: platform_mrr_cents
    type: gauge
    labels: [tenant_tier]
    description: "Monthly recurring revenue by tier"
    
  - name: platform_usage_revenue_cents
    type: counter
    labels: [tenant_tier, usage_type]
    description: "Usage-based revenue by tier"
    
  # Tenant lifecycle
  - name: platform_tenants_total
    type: gauge
    labels: [status, tier]
    description: "Total tenants by status and tier"
```

### 4. Design Infrastructure Metrics with Tenant Correlation

Infrastructure metrics that can be correlated to tenants:

```yaml
infrastructure_metrics:
  # Database metrics with tenant context
  - name: tenant_db_connections_active
    type: gauge
    labels: [tenant_id]
    description: "Active database connections per tenant"
    note: "Only for schema-per-tenant or database-per-tenant models"
    
  # Queue metrics with tenant attribution
  - name: tenant_queue_messages_total
    type: counter
    labels: [tenant_id, queue_name, status]
    description: "Queue messages per tenant"
    
  # Cache metrics with tenant attribution
  - name: tenant_cache_operations_total
    type: counter
    labels: [tenant_id, operation, result]
    description: "Cache operations per tenant (hit/miss)"
```

### 5. Define Aggregation Strategy

```yaml
aggregation:
  # Real-time (full cardinality)
  realtime:
    granularity: 1_minute
    retention: 1_hour
    dimensions: [tenant_id, all_labels]
    
  # Short-term (reduced cardinality)
  short_term:
    granularity: 5_minutes
    retention: 24_hours
    dimensions: [tenant_id, primary_labels]
    
  # Medium-term (tier aggregation)
  medium_term:
    granularity: 1_hour
    retention: 30_days
    dimensions: [tenant_tier, module]
    
  # Long-term (platform aggregation)
  long_term:
    granularity: 1_day
    retention: 1_year
    dimensions: [tenant_tier]
```

**Verify current best practices with web search:**
Search the web: "Prometheus multi-tenant metrics best practices {date}"
Search the web: "SaaS usage metering metrics patterns {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing metrics collection, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific metric categories or cardinality analysis
- **P (Party Mode)**: Bring SRE and billing architect perspectives on metric design
- **C (Continue)**: Accept metrics design and proceed to logging strategy
- **[Specific refinements]**: Describe additional metrics to include

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: metric categories, cardinality analysis, aggregation strategy
- Process enhanced insights on metrics design
- Ask user: "Accept this detailed metrics analysis? (y/n)"
- If yes, integrate into metrics specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review metrics collection design for tenant-aware observability"
- Process SRE and billing architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save metrics specification to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-design.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the metrics foundation design.**

Present summary of:
- Tenant-scoped operational metrics (requests, agents, resources)
- Quota metrics with tier limits
- Business metrics for usage and revenue attribution
- Infrastructure metrics with tenant correlation
- Aggregation strategy with retention policies

Ask for confirmation before proceeding to logging strategy.

---

## Verification

- [ ] Tenant-scoped metrics defined with tenant_id label
- [ ] Quota metrics track usage against tier limits
- [ ] Business metrics enable usage and revenue attribution
- [ ] Infrastructure metrics can be correlated to tenants
- [ ] Cardinality managed appropriately (no user_id in metric labels)
- [ ] Aggregation strategy defined with retention policies
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant metrics specification
- Quota metrics configuration
- Business metrics definition
- Aggregation strategy document

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-03-c-design.md` to design logging strategy.
