# BAM SaaS Problem Solving Context

**When to load:**
- When addressing tenant isolation challenges
- When debugging noisy neighbor issues
- When handling cross-tenant feature requests
- When reducing tier upgrade friction
- When user mentions "problem solving", "noisy neighbor", or "isolation challenges"

**Integrates with:** Dev agents, Architect agents, SRE/DevOps agents

---

## Core Concepts

### Problem Framing
Accurately defining problems before attempting solutions. Poor framing leads to solving symptoms rather than root causes. Effective framing identifies affected tenants, scope of impact, and distinguishes between isolated incidents and systemic issues.

### Root Cause Analysis
Systematic investigation techniques like the 5 Whys, fishbone diagrams, and fault tree analysis. In multi-tenant contexts, root causes often involve isolation failures, resource contention, or configuration propagation issues.

### Impact Assessment
Evaluating problem severity across dimensions: tenant count affected, revenue impact, SLA violations, and reputational risk. Tier-based prioritization ensures enterprise issues receive appropriate urgency.

### Solution Verification
Confirming fixes resolve the problem without introducing new issues. Multi-tenant solutions must be tested across tenant contexts, tiers, and edge cases to prevent regression.

### Multi-Tenant Considerations
Problem-solving in multi-tenant platforms requires tenant-aware debugging, understanding isolation boundaries, and recognizing that issues can cascade across tenants (noisy neighbor) or be isolated to specific configurations. Solutions must balance quick fixes for affected tenants with systemic improvements that prevent recurrence platform-wide.

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

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How do you prioritize multi-tenant incidents? | Tier-based severity: Enterprise P1, Pro P2, Free P3 for same issue | SLA commitments and revenue impact justify tier-based prioritization |
| When should you implement dedicated resources for isolation? | When noisy neighbor incidents exceed SLA thresholds | Dedicated resources eliminate contention at cost; trigger only when needed |
| How do you handle cross-tenant feature requests? | Require explicit consent, audit logging, and legal review | Cross-tenant data sharing has significant compliance and security implications |
| What friction reduction has highest ROI? | One-click upgrade with instant access and prorated billing | Reducing upgrade friction directly increases conversion and expansion revenue |
| How do you prevent isolation problems from recurring? | Add integration tests with multi-tenant fixtures for every isolation fix | Regression tests ensure fixes persist and new code doesn't reintroduce issues |

## Integration with BAM Workflows

- `bmad-bam-tenant-model-isolation` - Isolation architecture
- `bmad-bam-convergence-verification` - Multi-tenant test scenarios
- `bmad-bam-tenant-model-isolation` - RLS policy validation
- DevOps workflows for monitoring and alerting

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Problem-solving patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `problem-*`
- **SaaS patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `saas-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "SaaS problem-solving frameworks {date}"
- Search: "multi-tenant debugging strategies {date}"
- Search: "B2B SaaS root cause analysis {date}"

## Related Workflows

- `bmad-bam-tenant-model-isolation` - Design isolation to prevent problems
- `bmad-bam-chaos-engineering-design` - Verify isolation with multi-tenant tests
- `bmad-bam-performance-baseline` - Detect noisy neighbor issues
- `bmad-bam-tenant-tier-migration` - Reduce upgrade friction
- `bmad-bam-security-review` - Audit isolation boundaries
