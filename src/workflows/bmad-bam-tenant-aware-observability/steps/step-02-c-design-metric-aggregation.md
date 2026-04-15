# Step 2: Design Metric Aggregation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Define tenant-aware metric aggregation strategy for monitoring and billing.

---

## Prerequisites

- Tenant dimensions defined (Step 1)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability,usage-metering

---


## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

Define tenant-aware metric aggregation strategy:

## Metric Categories

### Platform Metrics (Control Plane)
```yaml
platform_metrics:
  - name: platform_tenants_total
    type: gauge
    labels: [status, tier]
    description: Total tenants by status and tier
    
  - name: platform_requests_total
    type: counter
    labels: [tenant_tier, module, status_code]
    description: Total requests by tier and module
```

### Tenant Metrics (Per-Tenant)
```yaml
tenant_metrics:
  - name: tenant_api_requests_total
    type: counter
    labels: [tenant_id, endpoint, status_code]
    description: API requests per tenant
    
  - name: tenant_agent_invocations_total
    type: counter
    labels: [tenant_id, agent_id, outcome]
    description: Agent invocations per tenant
    
  - name: tenant_storage_bytes
    type: gauge
    labels: [tenant_id, storage_type]
    description: Storage usage per tenant
    
  - name: tenant_active_users
    type: gauge
    labels: [tenant_id]
    description: Active users per tenant (rolling window)
```

### Resource Consumption Metrics
```yaml
resource_metrics:
  - name: tenant_llm_tokens_total
    type: counter
    labels: [tenant_id, model, direction]  # direction: input/output
    description: LLM tokens consumed per tenant
    
  - name: tenant_vector_operations_total
    type: counter
    labels: [tenant_id, operation]  # operation: insert/query/delete
    description: Vector store operations per tenant
    
  - name: tenant_compute_seconds_total
    type: counter
    labels: [tenant_id, resource_type]
    description: Compute time per tenant
```

## Aggregation Levels

```
Level 1: Per-request (high cardinality, short retention)
    └── Detailed metrics with full context
    
Level 2: Per-tenant (medium cardinality, medium retention)
    └── Aggregated per tenant_id + time bucket
    
Level 3: Per-tier (low cardinality, long retention)
    └── Aggregated per tenant_tier + time bucket
    
Level 4: Platform (minimal cardinality, longest retention)
    └── Global aggregates for capacity planning
```

## Pre-Aggregation Rules

```yaml
pre_aggregation:
  # Real-time: keep detailed for 1 hour
  realtime:
    granularity: 1_minute
    retention: 1_hour
    dimensions: [tenant_id, all_labels]
    
  # Short-term: aggregate to 5-minute buckets
  short_term:
    granularity: 5_minutes
    retention: 24_hours
    dimensions: [tenant_id, primary_labels]
    
  # Medium-term: aggregate to 1-hour buckets
  medium_term:
    granularity: 1_hour
    retention: 30_days
    dimensions: [tenant_tier, module]
    
  # Long-term: aggregate to daily buckets
  long_term:
    granularity: 1_day
    retention: 1_year
    dimensions: [tenant_tier]
```

## Tenant-Scoped Queries

All metric queries must be scoped to tenant unless explicitly platform-level:

```promql
# Tenant-specific query
rate(tenant_api_requests_total{tenant_id="abc123"}[5m])

# Tier-level aggregation
sum by (tenant_tier) (rate(tenant_api_requests_total[5m]))

# Never expose cross-tenant detailed metrics to tenant users
```

**Verify current best practices with web search:**
Search the web: "tenant metric aggregation tenant lifecycle {date}"
Search the web: "multi-tenant metrics aggregation multi-tenant SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After designing metric aggregation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific metrics or aggregation rules
- **P (Party Mode)**: Bring SRE and billing architect perspectives on metric design
- **C (Continue)**: Accept metric aggregation design and proceed to log context configuration
- **[Specific refinements]**: Describe additional metrics to define

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: metric categories, aggregation levels, pre-aggregation rules
- Process enhanced insights on metric strategy
- Ask user: "Accept this detailed metric analysis? (y/n)"
- If yes, integrate into metric specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review metric aggregation design for tenant-aware observability"
- Process SRE and billing architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save metric specification to output document
- Update frontmatter `stepsCompleted: [1, 2]`
- Proceed to next step: `step-03-c-configure-log-context.md`

---

## Soft Gate Checkpoint

**Steps 1-2 complete the metric foundation design.**

Present summary of:
- Metric categories (platform, tenant, resource consumption)
- Aggregation levels and retention policies
- Pre-aggregation rules for real-time, short-term, and long-term data

Ask for confirmation before proceeding to log context configuration.

---

## Verification

- [ ] Metric categories defined
- [ ] Aggregation levels specified
- [ ] Pre-aggregation rules configured
- [ ] Tenant-scoped queries designed
- [ ] Patterns align with pattern registry

---

## Outputs

- Metric specification document
- Aggregation rules configuration

---

## Next Step

Proceed to `step-03-c-configure-log-context.md` to define logging configuration.
