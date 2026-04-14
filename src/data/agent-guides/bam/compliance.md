# BAM Compliance Patterns Guide

**When to load:** During Phase 3 (Solutioning) when designing regulatory compliance, or when implementing GDPR, SOC2, HIPAA controls, audit logging, or data retention policies.

**Integrates with:** Architect (Atlas persona), Security agent, DevOps agent

---

## Core Concepts

### What is SaaS Compliance?

Compliance ensures a multi-tenant platform meets regulatory requirements while maintaining tenant isolation. It encompasses data protection, access controls, audit trails, and retention policies across the tenant boundary.

### Compliance Framework Overview

| Framework | Focus | Tenant Impact |
|-----------|-------|---------------|
| GDPR | Data privacy (EU) | Data residency, deletion |
| SOC2 | Security controls | Access audit, encryption |
| HIPAA | Healthcare data (US) | PHI isolation, BAA |
| PCI-DSS | Payment data | Cardholder data scope |
| ISO 27001 | Information security | Control framework |

---

## Application Guidelines

When implementing compliance in multi-tenant systems:

1. **Map frameworks to tenant requirements**: Different tenants may have different compliance needs based on industry and region
2. **Build evidence collection into core workflows**: Audit logs and attestations should be automatic, not afterthoughts
3. **Implement data residency controls**: Allow tenants to specify and verify where their data resides
4. **Design for right-to-erasure**: Tenant deletion must be complete and verifiable
5. **Maintain compliance documentation**: Keep policies, procedures, and evidence organized for audits

---

## Implementation Patterns

### Pattern 1: Compliance Architecture

```
┌─────────────────────────────────────────────────────────┐
│             Compliance Control Layers                    │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │            Policy Layer                      │       │
│   │   [Data Classification] [Retention] [Access] │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Enforcement Layer                  │       │
│   │   [Encryption] [RLS] [Audit] [DLP]          │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Evidence Layer                     │       │
│   │   [Logs] [Reports] [Attestations]           │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: GDPR Implementation

```
┌─────────────────────────────────────────────────────────┐
│               GDPR Control Matrix                        │
│                                                          │
│   Right               │ Implementation                  │
│   ────────────────────┼─────────────────────────────    │
│   Access (Art. 15)    │ Data export API                │
│   Rectification (16)  │ Self-service update            │
│   Erasure (17)        │ Tenant deletion workflow       │
│   Portability (20)    │ Standard export format         │
│   Object (21)         │ Consent management             │
│                                                          │
│   Data Residency:                                        │
│   ┌────────┐  ┌────────┐  ┌────────┐                   │
│   │   EU   │  │   US   │  │  APAC  │                   │
│   │ Region │  │ Region │  │ Region │                   │
│   └───┬────┘  └───┬────┘  └───┬────┘                   │
│       └───────────┴───────────┘                         │
│              Tenant config selects region               │
└─────────────────────────────────────────────────────────┘
```

**GDPR Checklist:**

| Requirement | Control | Verification |
|-------------|---------|--------------|
| Lawful basis | Consent tracking | Audit log |
| Data minimization | Field-level access | Schema review |
| Storage limitation | Retention policies | Automated purge |
| Encryption | At-rest + in-transit | Key management |
| Breach notification | Incident workflow | 72-hour SLA |

### Pattern 3: SOC2 Controls

```
┌─────────────────────────────────────────────────────────┐
│              SOC2 Trust Service Criteria                 │
│                                                          │
│   ┌─────────────┐                                        │
│   │  Security   │ Access control, encryption, MFA       │
│   └──────┬──────┘                                        │
│          │                                               │
│   ┌──────▼──────┐                                        │
│   │Availability │ SLA, DR, monitoring                   │
│   └──────┬──────┘                                        │
│          │                                               │
│   ┌──────▼──────┐                                        │
│   │ Processing  │ Data accuracy, completeness           │
│   │ Integrity   │                                        │
│   └──────┬──────┘                                        │
│          │                                               │
│   ┌──────▼──────┐                                        │
│   │Confidential-│ Data classification, tenant isolation│
│   │   ity       │                                        │
│   └──────┬──────┘                                        │
│          │                                               │
│   ┌──────▼──────┐                                        │
│   │   Privacy   │ GDPR alignment, consent               │
│   └─────────────┘                                        │
└─────────────────────────────────────────────────────────┘
```

### Pattern 4: Audit Logging

```
┌─────────────────────────────────────────────────────────┐
│              Audit Event Categories                      │
│                                                          │
│   Authentication Events                                  │
│   └── login, logout, mfa_challenge, password_reset      │
│                                                          │
│   Authorization Events                                   │
│   └── permission_grant, permission_revoke, access_deny  │
│                                                          │
│   Data Events                                            │
│   └── create, read, update, delete, export              │
│                                                          │
│   System Events                                          │
│   └── config_change, deployment, maintenance            │
│                                                          │
│   Tenant Events                                          │
│   └── onboard, offboard, tier_change, settings_update   │
└─────────────────────────────────────────────────────────┘
```

**Audit Log Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event_id | UUID | Yes | Unique identifier |
| timestamp | ISO8601 | Yes | Event time (UTC) |
| tenant_id | UUID | Yes | Tenant context |
| actor_id | UUID | Yes | User/system actor |
| action | string | Yes | Event type |
| resource | string | Yes | Affected resource |
| outcome | enum | Yes | success/failure |
| ip_address | string | No | Source IP |
| details | JSON | No | Additional context |

---

## Data Retention

### Retention Policy Matrix

| Data Type | Minimum | Maximum | Purge Method |
|-----------|---------|---------|--------------|
| Transaction logs | 7 years | 10 years | Archive + delete |
| Audit logs | 1 year | 7 years | Compress + archive |
| User data | Active | +30 days | Hard delete |
| Backups | 30 days | 90 days | Rotate + destroy |
| PII | Active | +30 days | Cryptographic erase |

### Tenant Deletion Workflow

```
┌─────────────────────────────────────────────────────────┐
│             Tenant Deletion Timeline                     │
│                                                          │
│   Day 0          Day 30          Day 60      Day 90     │
│     │              │               │           │         │
│     ▼              ▼               ▼           ▼         │
│   Request ──► Soft Delete ──► Hard Delete ──► Purge     │
│     │              │               │           │         │
│   Access     Data retained    Data removed  Backups     │
│   disabled   (recoverable)    (logs kept)   purged      │
└─────────────────────────────────────────────────────────┘
```

---

## HIPAA Considerations

| Control | Requirement | Implementation |
|---------|-------------|----------------|
| PHI isolation | Separate from non-PHI | Dedicated schema |
| Access logging | All PHI access | Enhanced audit |
| Encryption | At-rest required | AES-256 |
| BAA | With all subprocessors | Legal agreement |
| Minimum necessary | Role-based access | RBAC + field mask |

---

## Compliance Monitoring

### Key Metrics

| Metric | Alert Threshold | Action |
|--------|-----------------|--------|
| Failed auth attempts | > 5/min | Lock account |
| Unauthorized access | Any | Security incident |
| Data export requests | > 10/day | Review queue |
| Audit log gaps | > 1 hour | System alert |
| Encryption failures | Any | Immediate fix |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| EU customer data? | GDPR controls + EU residency option |
| Enterprise customers? | SOC2 Type II certification |
| Healthcare data? | HIPAA compliance + dedicated tenant |
| Financial data? | PCI-DSS scope isolation |
| Government customers? | FedRAMP consideration |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design comprehensive compliance controls
- `bmad-bam-security-review` - Validate security compliance requirements
- `bmad-bam-tenant-offboarding-design` - Implement compliant data deletion workflows

## Related Patterns

- `security-guide` for security implementation
- `tenant-isolation` guide for data separation
- `compliance-frameworks.csv` in pattern registry
- `tenant-offboarding-design` workflow for deletion
- **encryption-key-management:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `encryption-key-management`
- **data-archival:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-archival`
- **data-residency:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `data-residency`
- **session-management:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `session-management`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `compliance` | `SaaS compliance patterns multi-tenant SaaS {date}` |
| `compliance` | `data sovereignty multi-tenant SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
