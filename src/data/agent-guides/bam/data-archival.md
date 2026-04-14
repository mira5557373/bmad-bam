# Data Archival Patterns

**When to load:** When designing data retention, archival policies, or when user mentions data lifecycle, archival storage, or compliance-driven data management.

**Integrates with:** Architect (Atlas persona), Dev agent, DevOps agent, Compliance officer

---

## Core Concepts

### What is Tenant Data Archival?

Data archival involves moving inactive or historical tenant data to lower-cost storage while maintaining compliance requirements and retrieval capabilities. Multi-tenant archival must respect individual tenant policies and isolation.

### Archival Strategy Comparison

| Strategy | Trigger | Use Case | Tenant Consideration |
|----------|---------|----------|---------------------|
| Time-based | Age of data | Standard retention | Per-tenant schedules |
| Storage-based | Volume threshold | Cost management | Per-tenant quotas |
| Compliance-based | Regulatory requirement | Legal/audit | Per-tenant regulations |
| Tiered | Access frequency | Performance | Per-tier policies |

---

## Key Patterns

### Pattern 1: Time-Based Archival

Archive data based on age.

| Component | Description | Tenant Consideration |
|-----------|-------------|---------------------|
| Age Threshold | Days until archive | Per-tier configuration |
| Archive Job | Scheduled migration | Tenant context |
| Metadata | Archive location | Tenant-scoped |
| Audit Trail | Archive events | Compliance logging |

### Time-Based Flow

```
Active Data ──(age > threshold)──> Archive Storage
    │                                    │
    │                                    │
    └── Hot Storage                      └── Cold Storage
        (per-tenant)                         (tenant-partitioned)
```

### Archival Timeline

| Stage | Duration | Storage | Access |
|-------|----------|---------|--------|
| Hot | 0-30 days | Primary DB | Instant |
| Warm | 30-90 days | Secondary DB | Seconds |
| Cold | 90-365 days | Object storage | Minutes |
| Glacier | 1+ years | Archive storage | Hours |

### Pattern 2: Compliance-Driven Archival

Archive based on regulatory requirements.

| Regulation | Retention Period | Archive Type |
|------------|------------------|--------------|
| GDPR | Per purpose | Encrypted, erasable |
| HIPAA | 6 years minimum | Immutable, audited |
| SOX | 7 years minimum | Tamper-evident |
| PCI-DSS | Per requirement | Encrypted, access-logged |

### Compliance Architecture

```
┌─────────────────────────────────────────┐
│      Compliance-Driven Archive          │
│                                          │
│  ┌──────────┐    ┌──────────────────┐   │
│  │ Policy   │───>│ Archive Engine   │   │
│  │ Engine   │    │ ┌──────────────┐ │   │
│  └──────────┘    │ │ Tenant A     │ │   │
│                  │ │ (GDPR)       │ │   │
│                  │ ├──────────────┤ │   │
│                  │ │ Tenant B     │ │   │
│                  │ │ (HIPAA)      │ │   │
│                  │ └──────────────┘ │   │
│                  └──────────────────┘   │
└─────────────────────────────────────────┘
```

### Pattern 3: Tiered Storage

Move data through storage tiers based on access.

| Tier | Characteristics | Use Case |
|------|-----------------|----------|
| Hot | Fast, expensive | Active data |
| Warm | Moderate cost | Recent history |
| Cold | Slow, cheap | Archival |
| Glacier | Very slow, very cheap | Long-term |

### Pattern 4: Archive with Retrieval SLA

Define retrieval guarantees per tenant tier.

| Tenant Tier | Retrieval SLA | Archive Type |
|-------------|---------------|--------------|
| Free | Best effort (24h) | Glacier |
| Pro | 4 hours | Cold storage |
| Enterprise | 15 minutes | Warm storage |

---

## Application Guidelines

When implementing archival:

1. **Define retention policies** - Per tenant and per data type
2. **Maintain audit trail** - Log all archival operations
3. **Test retrieval** - Regularly verify archive integrity
4. **Plan for deletion** - Honor right-to-erasure requests
5. **Monitor costs** - Track storage usage per tenant

---

## Per-Tier Archival Configuration

| Tier | Hot Duration | Warm Duration | Cold Duration | Glacier |
|------|--------------|---------------|---------------|---------|
| Free | 7 days | 30 days | 90 days | N/A |
| Pro | 30 days | 90 days | 1 year | 7 years |
| Enterprise | 90 days | 1 year | 7 years | Unlimited |

---

## Archive Data Structure

| Field | Required | Description |
|-------|----------|-------------|
| archive_id | Yes | Unique identifier |
| tenant_id | Yes | Tenant context |
| source_table | Yes | Original location |
| archived_at | Yes | Archive timestamp |
| retention_until | Yes | Minimum keep date |
| checksum | Yes | Integrity verification |
| encryption_key_id | Yes | Encryption reference |

---

## Retrieval Patterns

| Pattern | Description | Use Case |
|---------|-------------|----------|
| On-Demand | User-initiated | Occasional access |
| Scheduled | Pre-staged retrieval | Known access patterns |
| Streaming | Incremental retrieval | Large datasets |
| Bulk Export | Tenant data export | Offboarding |

---

## Common Pitfalls and Anti-Patterns

| Anti-Pattern | Problem | Solution |
|--------------|---------|----------|
| No tenant isolation | Data leakage in archives | Tenant-partitioned archives |
| Missing encryption | Security risk | Encrypt at rest |
| No retrieval test | Archives may be corrupt | Regular restore tests |
| Ignoring compliance | Legal liability | Map regulations to policies |
| No deletion plan | GDPR violations | Implement right-to-erasure |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| When to archive? | Based on access frequency and compliance | Balance cost vs retrieval need |
| Archive vs delete? | Archive for audit, delete only when required | Maintain compliance trail |
| Storage tier? | Match retrieval SLA to tenant tier | Cost-effective storage |
| Encryption? | Always encrypt with tenant-scoped keys | Security and compliance |

---

## Related Workflows

- `bmad-bam-tenant-offboarding-design` - Archive during offboarding
- `bmad-bam-compliance-design` - Compliance-driven archival
- `bmad-bam-disaster-recovery-design` - Archive in DR strategy

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Archival patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Compliance:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **SaaS lifecycle:** `{project-root}/_bmad/bam/data/agent-guides/bam/saas-lifecycle.md`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "data archival multi-tenant {date}"
- Search: "tenant data lifecycle {date}"
- Search: "compliance-driven data retention SaaS {date}"
