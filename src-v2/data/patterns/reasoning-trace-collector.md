---
pattern_id: reasoning-trace-collector
shortcode: ZRX
category: observability
qg_ref: QG-S5
version: 1.0.0
last_reviewed: 2026-04-30
---

# Reasoning Trace Collector - BAM Pattern

**Loaded by:** ZRX  
**Applies to:** Multi-tenant AI systems requiring reasoning audit trails  
**See also:** [ai-observability.md](ai-observability.md), [invisible-failure-detector.md](invisible-failure-detector.md)

---

## When to Use

- Enterprise AI deployments requiring audit trails
- Debugging complex multi-step agent workflows
- Model fine-tuning based on production traces
- Compliance scenarios requiring decision explanations

## When NOT to Use

- High-volume, low-value interactions
- Privacy-sensitive contexts without consent
- Cost-constrained deployments

## Architecture

### Trace Collection Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│               Reasoning Trace Collector                      │
│                                                              │
│  Agent Execution                                             │
│       │                                                      │
│       ├──► Input ──────────────────────────────┐             │
│       ├──► Tool Selection ─────────────────────┤             │
│       ├──► Tool Execution ─────────────────────┤             │
│       ├──► Decision Branch ────────────────────┼──► Trace    │
│       └──► Output ─────────────────────────────┘    Store    │
│                                                      │       │
│            ┌──────────────────────────────────────────┘      │
│            ▼                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐      │
│  │ Index       │    │ Search      │    │ Analyze     │      │
│  │ (Tenant)    │    │ (Query)     │    │ (Anomaly)   │      │
│  └─────────────┘    └─────────────┘    └─────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### Configuration Schema (P2-04)

```yaml
reasoning_trace_collector:
  version: "1.0.0"
  bam_controlled: true
  
  collection:
    capture_points:
      - input_received
      - context_retrieved
      - tool_selection
      - tool_execution
      - decision_branch
      - output_generation
      
    detail_level: enum[minimal, standard, verbose, debug]
    
    include:
      prompts: bool
      tool_calls: bool
      tool_results: bool
      intermediate_outputs: bool
      timing: bool
      token_counts: bool
      
  storage:
    backend: enum[database, object_storage, time_series]
    retention_days: int
    compression: bool
    tenant_isolation: bool
    
  tenant_configuration:
    per_tenant_retention: bool
    tier_detail_level:
      free: enum[minimal]
      pro: enum[standard]
      enterprise: enum[verbose, debug]
```

## Trade-offs

| Approach | Pros | Cons | Best For |
|----------|------|------|----------|
| Minimal tracing | Low overhead | Limited debugging | High-volume |
| Standard tracing | Good balance | Moderate storage | Most deployments |
| Verbose tracing | Full visibility | High storage cost | Debugging, audit |
| Debug tracing | Complete picture | Performance impact | Development |


## Quality Checks

- [ ] Metrics collection configured per tenant
- [ ] Trace sampling appropriate for load
- [ ] Log retention policies defined
- [ ] Dashboards accessible per tenant tier
- [ ] **CRITICAL:** No sensitive data in telemetry

## Web Research Queries

- "AI agent reasoning trace collection {date}"
- "LLM observability tracing patterns {date}"
- "agent decision audit logging enterprise {date}"
- "LangSmith tracing integration {date}"

---

## Quality Gate Alignment

| Gate | Verification |
|------|--------------|
| QG-S5 | Trace collection active, anomaly detection configured |

## Related Patterns

- [ai-observability.md](ai-observability.md) - Broader observability
- [invisible-failure-detector.md](invisible-failure-detector.md) - Silent failure detection
