# BAM Incident Patterns Guide

**When to load:** During incident response design, runbook creation, communication planning, or when establishing incident management for multi-tenant SaaS platforms.

**Integrates with:** SRE teams, Support, On-call engineers.

---

## Core Concepts

### Incident Severity with Tenant Impact

| Severity | Impact | Examples | Response Time |
|----------|--------|----------|---------------|
| SEV1 | All tenants down | Platform outage | < 15 min |
| SEV2 | Multiple tenants affected | Major feature broken | < 30 min |
| SEV3 | Single tenant affected | Tenant-specific issue | < 2 hours |
| SEV4 | Degraded performance | Slow responses | < 4 hours |

### Multi-Tenant Incident Classification

| Type | Scope | Response |
|------|-------|----------|
| Platform-wide | All tenants | All-hands response |
| Tier-specific | One tier affected | Tier-focused team |
| Tenant-specific | Single tenant | Support + engineering |
| Feature-specific | One feature broken | Feature team |

### Incident Response Phases

```
Detection → Triage → Containment → Resolution → Post-mortem
    │          │           │            │            │
    │          │           │            │            └── Tenant communication
    │          │           │            └── Tenant verification
    │          │           └── Tenant isolation (if needed)
    │          └── Tenant impact assessment
    └── Tenant-aware alerting
```

### Communication Templates by Tier

| Tier | Channel | Frequency | Detail Level |
|------|---------|-----------|--------------|
| Free | Status page only | Hourly | Summary |
| Pro | Status page + email | 30 min | Detailed |
| Enterprise | Direct contact + call | 15 min | Full transparency |

### Incident Communication Structure

```
[Status: Investigating/Identified/Monitoring/Resolved]
[Severity: SEV1-4]
[Impact: Affected tenants/features]
[Timeline: When started, ETA if known]
[Next Update: Time of next communication]
```

### Post-Incident Review

| Element | Content |
|---------|---------|
| Timeline | Minute-by-minute events |
| Impact | Tenants affected, duration, data loss |
| Root Cause | Technical and process causes |
| Action Items | Preventive measures with owners |
| Tenant Follow-up | Communication plan |

---

## Application Guidelines

When managing incidents in a multi-tenant context:

1. **Assess tenant impact immediately** - Determine which tenants are affected
2. **Isolate affected tenants if possible** - Limit blast radius
3. **Communicate proactively** - Don't wait for tenant reports
4. **Track SLA impact** - Document for compliance and credits
5. **Preserve tenant context in logs** - Essential for post-mortem
6. **Follow up with enterprise tenants** - Personal outreach after resolution

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to determine severity? | Tenant count × business impact | Scale response to impact |
| When to notify tenants? | Immediately for SEV1-2, within 1hr for SEV3 | Build trust through transparency |
| Should we isolate affected tenants? | Yes if it protects others | Platform stability first |
| How to handle SLA breaches? | Automatic credit calculation | Contractual obligation |
| Who leads enterprise incidents? | Dedicated account team + engineering | High-touch for high-value |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Incident patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `incident-*`
- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `operations-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant incident management patterns {date}"
- Search: "SaaS incident communication best practices {date}"
- Search: "blameless post-mortem practices {date}"

---

## Related Workflows

- `bmad-bam-incident-response-operations` - Automate incident response
- `bmad-bam-tenant-aware-observability` - Monitor for incidents
- `bmad-bam-sli-slo-definition` - Define incident thresholds
