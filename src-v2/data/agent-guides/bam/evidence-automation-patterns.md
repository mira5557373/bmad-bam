# Evidence Automation Patterns

**When to load:** When designing automated compliance evidence collection, implementing continuous compliance monitoring, or when user mentions evidence collection, audit artifacts, compliance automation, or continuous compliance in multi-tenant SaaS.

**Integrates with:** Security agent, DevOps agent, Architect (Atlas persona), Analyst agent

---

## Core Concepts

### What is Evidence Automation?

Evidence automation is the systematic collection, storage, and retrieval of compliance evidence artifacts without manual intervention. In multi-tenant SaaS, this includes tenant-scoped evidence that demonstrates control effectiveness for each tenant's compliance requirements.

### Evidence Lifecycle

```
Control Implementation
        │
        ▼
Evidence Generation (automated)
        │
        ▼
Evidence Collection (scheduled/event-driven)
        │
        ▼
Evidence Storage (immutable, tenant-tagged)
        │
        ▼
Evidence Retrieval (audit queries)
        │
        ▼
Evidence Retention (regulation-specific)
        │
        ▼
Evidence Disposal (secure, documented)
```

### Evidence Types

| Type | Description | Collection Method | Tenant Scope |
|------|-------------|-------------------|--------------|
| System logs | Audit trails, access logs | Streaming ingestion | Filtered by tenant_id |
| Configuration snapshots | Infrastructure state | Scheduled exports | Tenant-specific configs |
| Test results | Penetration tests, scans | Pipeline artifacts | Platform + tenant |
| Process artifacts | Approvals, reviews | Workflow captures | Tenant workflow |
| Attestations | Certifications, assertions | Manual + automated | Platform-wide |

---

## Key Patterns

### Pattern 1: Evidence Collection Pipeline

| Stage | Component | Multi-Tenant Consideration |
|-------|-----------|---------------------------|
| Source | Log aggregator, API | Tenant context injection |
| Filter | Evidence classifier | Regulation-specific rules |
| Transform | Normalizer | Standard evidence schema |
| Store | Immutable storage | Tenant partition/tagging |
| Index | Search engine | Tenant-scoped queries |

### Pattern 2: Evidence Schema

| Field | Description | Example |
|-------|-------------|---------|
| evidence_id | Unique identifier | `evd_abc123` |
| tenant_id | Tenant context | `tenant_xyz` |
| control_id | Mapped control | `SOC2-CC6.1` |
| evidence_type | Classification | `system_log`, `config_snapshot` |
| collection_time | UTC timestamp | `2026-04-11T10:30:00Z` |
| source_system | Origin system | `auth-service` |
| content_hash | Integrity verification | SHA-256 hash |
| retention_until | Disposal date | `2033-04-11` |

### Pattern 3: Collection Triggers

| Trigger Type | Use Case | Example |
|--------------|----------|---------|
| Scheduled | Regular compliance checks | Daily config snapshots |
| Event-driven | Security-relevant events | Access denied events |
| On-demand | Audit requests | Historical evidence export |
| Continuous | Real-time compliance | Stream processing |

---

## Application Guidelines

- Building continuous compliance monitoring systems
- Implementing automated audit preparation workflows
- Designing evidence collection for multi-framework compliance
- Creating tenant self-service evidence export
- Establishing evidence integrity verification
- Supporting real-time compliance dashboards

---

## Multi-Tenant Considerations

### Per-Tier Evidence Features

| Tier | Collection Frequency | Retention Period | Export Formats | Real-time Access |
|------|---------------------|------------------|----------------|------------------|
| Free | Daily | 30 days | N/A | No |
| Pro | Hourly | 1 year | CSV, PDF | Dashboard only |
| Enterprise | Real-time | 7 years | JSON, SIEM, API | Full API access |

### Tenant Isolation for Evidence

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Storage | Tenant-partitioned buckets or RLS | Access control audit |
| Queries | Mandatory tenant_id filter | Query plan inspection |
| Export | Tenant-scoped packages | Content verification |
| Integrity | Per-tenant hash chains | Independent verification |

### Platform vs Tenant Evidence

| Evidence Category | Owner | Access Model | Example |
|-------------------|-------|--------------|---------|
| Infrastructure security | Platform | Shared attestation | SOC 2 Type II report |
| Application controls | Shared | Filtered by tenant | API access logs |
| Data handling | Tenant | Tenant-only | Data export logs |
| Custom controls | Tenant | Tenant-only | Custom workflow evidence |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| Real-time vs batch evidence collection? | Hybrid: real-time for security events, batch for configurations | Balances immediacy with cost efficiency |
| How to ensure evidence integrity? | Immutable storage + cryptographic hash chains | Prevents tampering, supports audit verification |
| Should tenants access raw evidence? | No, provide summarized views with drill-down for Enterprise tier | Raw logs may expose platform internals |
| How long to retain evidence? | Match strictest applicable regulation per tenant profile | Ensures compliance across all requirements |
| How to handle evidence gaps? | Document gaps with compensating controls, alert on collection failures | Maintains audit trail integrity |
| Should evidence collection be tenant-configurable? | Limited configuration for Enterprise tier, platform-defined baselines | Balances flexibility with consistent compliance |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design evidence collection framework
- `bmad-bam-tenant-aware-observability` - Implement evidence monitoring
- `bmad-bam-tenant-audit-log-design` - Design audit evidence trails
- `bmad-bam-data-retention-policy-design` - Design evidence retention

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Observability patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `observability`, `compliance`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "automated compliance evidence collection SaaS {date}"
- Search: "continuous compliance monitoring multi-tenant {date}"
- Search: "SOC 2 evidence automation best practices {date}"
