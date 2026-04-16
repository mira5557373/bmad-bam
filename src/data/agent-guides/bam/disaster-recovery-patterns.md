# BAM Disaster Recovery Patterns Guide

**When to load:** During DR planning, backup strategy design, failover architecture, or when implementing disaster recovery for multi-tenant SaaS platforms.

**Integrates with:** Winston (Architect), SRE teams, Operations.

---

## Core Concepts

### RTO/RPO by Tenant Tier

| Tier | RTO (Recovery Time) | RPO (Data Loss) | DR Strategy |
|------|---------------------|-----------------|-------------|
| Free | 24 hours | 24 hours | Backup restore |
| Pro | 4 hours | 1 hour | Warm standby |
| Enterprise | 15 minutes | 5 minutes | Hot standby |

### Multi-Tenant DR Strategies

| Strategy | Description | Cost | RTO |
|----------|-------------|------|-----|
| Backup/Restore | Restore from backups | Low | Hours |
| Pilot Light | Minimal standby infra | Medium | 30min-1hr |
| Warm Standby | Scaled-down active copy | Medium-High | 15-30min |
| Hot Standby | Full active-active | High | < 5min |

### Cross-Region Replication

```
Primary Region                    Secondary Region
┌─────────────────┐               ┌─────────────────┐
│  Load Balancer  │───DNS───────→│  Load Balancer  │
│  App Servers    │               │  App Servers    │ (standby)
│  Database       │──Replication─→│  Database       │ (replica)
│  Object Storage │──Replication─→│  Object Storage │
└─────────────────┘               └─────────────────┘
```

### Tenant-Isolated Backup Strategy

| Data Type | Backup Frequency | Retention | Isolation |
|-----------|------------------|-----------|-----------|
| Database | Continuous + Daily | 30 days | Per-tenant restore |
| Files | Daily | 90 days | Tenant-prefixed |
| Configs | On change | 90 days | Version controlled |
| Audit Logs | Continuous | 1 year | Immutable, tenant-scoped |

### Failover Decision Matrix

| Scenario | Primary Action | Failover Trigger |
|----------|---------------|------------------|
| Region outage | Automatic failover | Health check failure |
| Database failure | Promote replica | Connection errors |
| Application crash | Pod restart | Liveness probe |
| Data corruption | Point-in-time restore | Data integrity check |

### Recovery Procedures

| Phase | Actions | Duration |
|-------|---------|----------|
| Detection | Monitoring alerts, health checks | < 1 min |
| Assessment | Determine scope, impact | < 5 min |
| Decision | Failover or fix in place | < 5 min |
| Execution | Run failover playbook | 5-30 min |
| Verification | Tenant health checks | 5-15 min |
| Communication | Notify affected tenants | Ongoing |

---

## Application Guidelines

When implementing DR in a multi-tenant context:

1. **Design for tenant-level recovery** - Ability to restore single tenant without affecting others
2. **Implement tiered DR** - Enterprise gets better RTO/RPO than Free tier
3. **Test DR regularly** - Quarterly DR drills with real failover
4. **Communicate proactively** - Tenant notification during incidents
5. **Maintain runbooks** - Step-by-step recovery procedures
6. **Separate tenant data in backups** - Enable selective restore

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Should we use multi-region? | Yes for Pro+, optional for Free | Balance cost with availability |
| How often to test DR? | Quarterly full test, monthly backup verify | Ensure DR actually works |
| Can we restore a single tenant? | Yes, implement tenant-level restore | Common support request |
| What RTO/RPO for AI components? | Same as application tier + model version backup | AI is critical path |
| How to handle DR during incident? | Pre-authorized runbooks, no approval needed | Speed is critical |

---

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Disaster recovery patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `dr-*`
- **Backup patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `backup-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS disaster recovery patterns {date}"
- Search: "AWS multi-region disaster recovery {date}"
- Search: "tenant-isolated backup restore strategies {date}"

---

## Related Workflows

- `bmad-bam-disaster-recovery-design` - Design DR architecture
- `bmad-bam-multi-region-architecture` - Implement multi-region
- `bmad-bam-incident-response-operations` - Automate incident response
