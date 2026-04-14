# BAM Production Readiness Guide

**When to load:** During Phase 5 (Quality) when performing production readiness assessment,
or when user mentions go-live, launch readiness, or production deployment.

**Integrates with:** Platform Architect, DevOps Engineer, SRE, Security Architect

---

## Core Concepts

### Production Readiness Pillars

Multi-tenant AI platforms require verification across five pillars:

1. **Gate Verification** - All prerequisite quality gates passed
2. **Infrastructure** - Capacity, HA, and scaling verified
3. **Observability** - Metrics, logs, traces, and alerts configured
4. **Disaster Recovery** - Backups, failover, and RTO/RPO validated
5. **Operations** - Runbooks, on-call, and procedures documented

### Quality Gate Dependencies

Production readiness (QG-P1) depends on:

| Gate | Name | Purpose |
|------|------|---------|
| QG-S4 | AI Security | Model and inference protection |
| QG-I3 | Agent Safety | Guardrails and kill switch |
| QG-I2 | Tenant Safety | Cross-tenant isolation |
| QG-DR1 | Data Protection | Encryption and privacy |
| QG-CP1 | Compliance | Regulatory requirements |

### Go-Live Decision Matrix

| Outcome | Criteria | Action |
|---------|----------|--------|
| **GO** | All gates pass, no blocking issues | Proceed with launch |
| **GO WITH CAUTION** | Minor gaps with mitigation | Launch with monitoring |
| **NO GO** | Critical gaps or blocking issues | Address before launch |

## Application Guidelines

When assessing production readiness:

1. **Verify all gates first** - Don't proceed if prerequisites fail
2. **Test under realistic load** - Capacity must handle expected traffic
3. **Validate DR procedures** - Actually test failover, not just documentation
4. **Confirm on-call readiness** - Team trained and tools accessible

## Decision Framework

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| First launch | Full verification | No production track record |
| Major release | Full verification | Significant changes |
| Minor update | Incremental verification | Focused on changes |
| Hotfix | Expedited verification | Critical path only |

## Related Workflows

- `bmad-bam-production-readiness` - Production readiness assessment
- `bmad-bam-convergence-verification` - Integration verification
- `bmad-bam-runbook-creation` - Operational runbooks

## Related Patterns

Load decision criteria and `web_queries` column from pattern registry:

- **Operations patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `operations`
- **DR patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `disaster-recovery`

Use the `web_queries` column from pattern registry for current best practices.

### Web Research

Use these queries for current best practices:

- Search: "production readiness checklist SaaS {date}"
- Search: "go-live criteria multi-tenant platform {date}"
- Search: "AI platform deployment best practices {date}"
- Search: "SRE production readiness {date}"
