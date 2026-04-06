# BAM SaaS Problem Solving Context

**When to load:**
- When addressing tenant isolation challenges
- When debugging noisy neighbor issues
- When handling cross-tenant feature requests
- When reducing tier upgrade friction
- When user mentions "problem solving", "noisy neighbor", or "isolation challenges"

**Integrates with:** Dev agents, Architect agents, SRE/DevOps agents

---

## Tenant Isolation Challenges

### Common Isolation Problems

| Problem | Symptoms | Root Cause |
|---------|----------|------------|
| **Data leakage** | Tenant sees other tenant's data | Missing or broken RLS policies |
| **Resource sharing** | Slow queries affect all tenants | Insufficient resource isolation |
| **Config bleed** | Tenant settings affect others | Shared configuration state |
| **Auth crossover** | User accesses wrong tenant | Improper context propagation |

### Isolation Problem Solving Framework

```
DETECT → ISOLATE → ANALYZE → FIX → VERIFY → PREVENT
   ↓         ↓         ↓       ↓       ↓         ↓
 Monitor   Scope    Root    Patch   Test    Safeguards
 alerts    impact   cause   code    fix     for future
```

### Isolation Debugging Checklist

- [ ] Verify tenant_id is set in current context
- [ ] Check RLS policies are enabled on all tables
- [ ] Validate JWT contains correct tenant claims
- [ ] Audit recent schema/policy changes
- [ ] Test with multiple tenant contexts
- [ ] Review cross-tenant query patterns

### Prevention Patterns

| Pattern | Implementation |
|---------|---------------|
| **Context middleware** | Always inject tenant_id at API boundary |
| **RLS by default** | Enable policies on table creation |
| **Query validation** | Lint queries for missing tenant filters |
| **Integration tests** | Multi-tenant test fixtures |

---

## Noisy Neighbor Problems

### Noisy Neighbor Taxonomy

| Type | Description | Impact |
|------|-------------|--------|
| **CPU hog** | Heavy computation | Slow response for all |
| **Memory bloat** | Large data processing | OOM risk |
| **I/O flood** | Bulk imports/exports | Storage bottleneck |
| **Connection storm** | Many concurrent requests | Pool exhaustion |

### Detection and Mitigation

```
BASELINE → MONITOR → DETECT → THROTTLE → NOTIFY → RESOLVE
    ↓          ↓         ↓         ↓         ↓         ↓
 Normal    Real-time  Anomaly   Rate     Alert    Root cause
 usage     metrics    detection limit    tenant   & upgrade
```

### Noisy Neighbor Solutions

| Solution | Tier | Implementation |
|----------|------|----------------|
| **Rate limiting** | All | Per-tenant request quotas |
| **Resource quotas** | All | Memory/CPU limits per tenant |
| **Queue isolation** | Pro+ | Separate job queues |
| **Connection pooling** | Pro+ | Per-tenant connection limits |
| **Dedicated resources** | Enterprise | Isolated compute/storage |

### Monitoring Queries

```sql
-- Identify resource-heavy tenants
SELECT tenant_id, 
       COUNT(*) as request_count,
       AVG(response_time) as avg_latency
FROM requests
WHERE timestamp > NOW() - INTERVAL '1 hour'
GROUP BY tenant_id
ORDER BY request_count DESC
LIMIT 10;
```

---

## Cross-Tenant Feature Requests

### Request Categories

| Category | Example | Complexity |
|----------|---------|------------|
| **Admin aggregation** | Dashboard across tenants | Medium |
| **Data sharing** | Tenant-to-tenant transfer | High |
| **Marketplace** | Tenant sells to tenant | Very High |
| **Parent-child** | Reseller manages clients | High |

### Cross-Tenant Decision Framework

```
IS IT TRULY CROSS-TENANT?
        ↓
   Yes: Requires careful design
        ↓
WHAT ISOLATION LEVEL?
        ↓
   Explicit consent → Implement with audit trail
   Implicit sharing → Reconsider requirement
        ↓
HOW IS IT AUTHORIZED?
        ↓
   Admin role → Special permissions
   User role → Never (red flag)
```

### Implementation Patterns

| Pattern | Use Case | Design |
|---------|----------|--------|
| **Shared read replica** | Aggregated analytics | Read-only cross-tenant views |
| **Consent-based sharing** | Data transfer | Explicit grant + audit log |
| **Broker pattern** | Marketplace | Isolated transaction broker |
| **Hierarchy** | Reseller model | Parent-child tenant relationship |

### Cross-Tenant Safeguards

- [ ] Explicit consent mechanism
- [ ] Comprehensive audit logging
- [ ] Revocation capability
- [ ] Data lineage tracking
- [ ] Legal/compliance review

---

## Tier Upgrade Friction

### Friction Point Analysis

| Friction Point | Cause | Solution |
|----------------|-------|----------|
| **Fear of data loss** | Unclear migration | Show "data preserved" guarantee |
| **Price shock** | Hidden costs | Transparent pricing calculator |
| **Feature confusion** | Complex comparison | Clear tier matrix |
| **Process complexity** | Too many steps | One-click upgrade |
| **Timing concerns** | Mid-billing cycle | Prorated billing |

### Upgrade Flow Optimization

```
TRIGGER → EDUCATE → COMPARE → DECIDE → EXECUTE → CONFIRM
   ↓          ↓         ↓         ↓         ↓         ↓
 Limit     Value     Clear     Simple   Instant  Success
 reached   shown     matrix    choice   access   feedback
```

### Friction Reduction Strategies

| Strategy | Implementation |
|----------|---------------|
| **Progressive disclosure** | Show upgrade benefits at limit |
| **Trial periods** | 14-day Pro trial for Free users |
| **Rollback option** | Downgrade without penalty |
| **Prorated billing** | Fair mid-cycle pricing |
| **Migration assistance** | Automated configuration transfer |

### Upgrade Friction Metrics

| Metric | Target | Red Flag |
|--------|--------|----------|
| Upgrade flow completion | >80% | <50% |
| Time to upgrade | <5 min | >15 min |
| Support tickets during upgrade | <5% | >15% |
| 7-day upgrade retention | >95% | <85% |

---

## Problem Solving Methodology

### RAPID Framework for SaaS Problems

| Step | Action | Multi-Tenant Focus |
|------|--------|-------------------|
| **R**ecognize | Identify the problem | Which tenants affected? |
| **A**nalyze | Root cause analysis | Isolation or shared resource? |
| **P**rioritize | Impact assessment | Tier-based severity |
| **I**mplement | Deploy solution | Test in tenant isolation |
| **D**ocument | Record learnings | Prevent across all tenants |

---

## Application Guidelines

1. **Tenant-first debugging** - Always identify affected tenants first
2. **Isolation by default** - Assume problems can spread
3. **Tier-aware solutions** - Different solutions for different tiers
4. **Proactive monitoring** - Detect before customers report
5. **Systemic fixes** - Prevent recurrence across all tenants

---

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` - Isolation architecture
- `bmad-bam-tenant-testing` - Multi-tenant test scenarios
- `bmad-bam-rls-documentation` - RLS policy validation
- DevOps workflows for monitoring and alerting
