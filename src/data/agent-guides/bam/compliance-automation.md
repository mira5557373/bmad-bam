# BAM Compliance Automation Guide

**When to load:** During Phase 3 (Solutioning) when designing compliance automation, evidence collection, audit workflows, or certification tracking for multi-tenant platforms.

**Integrates with:** Analyst (Mary persona), Security agent, DevOps agent

---

## Core Concepts

### What is Multi-Tenant Compliance Automation?

Compliance automation in multi-tenant SaaS provides continuous monitoring, evidence collection, and audit preparation capabilities while respecting tenant boundaries. It enables platforms to maintain certifications and meet regulatory requirements efficiently across all tenants.

### Compliance Automation Pillars

| Pillar | Purpose | Tenant Impact |
|--------|---------|---------------|
| Control Automation | Automated control checks | Tenant-specific controls |
| Evidence Collection | Gather audit evidence | Tenant-scoped evidence |
| Certification Tracking | Track certifications | Platform + tenant certs |
| Compliance Reporting | Generate reports | Tenant-filtered dashboards |
| Remediation Management | Track finding fixes | Tenant remediation workflows |

---

## Application Guidelines

When implementing compliance automation in multi-tenant systems:

1. **Automate evidence collection early**: Build evidence gathering into core workflows from the start
2. **Support tenant-specific compliance**: Different tenants may have different regulatory requirements
3. **Maintain platform-level certifications**: SOC2, ISO27001 apply to the entire platform
4. **Enable tenant audit cooperation**: Enterprise tenants may need to share evidence with their auditors
5. **Preserve evidence chain of custody**: Ensure evidence is immutable and traceable

---

## Compliance Control Patterns

### Pattern 1: Control Framework Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Control Framework Architecture              │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │           Control Catalog                    │       │
│   │   [SOC2] [GDPR] [HIPAA] [ISO27001] [Custom] │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Control Engine                     │       │
│   │   [Automated Checks] [Manual Attestations]  │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Results Store                      │       │
│   │   [Findings] [Evidence] [Remediation]       │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Control Categories

| Category | Framework | Automation Level | Examples |
|----------|-----------|------------------|----------|
| Access Control | SOC2/ISO27001 | High | MFA enabled, RBAC configured |
| Encryption | All | High | TLS 1.3, AES-256 at rest |
| Logging | All | High | Audit trail, retention |
| Change Management | SOC2 | Medium | PR reviews, deploy approvals |
| Incident Response | SOC2/ISO27001 | Medium | Playbook tests, SLA tracking |
| Business Continuity | SOC2 | Low | DR tests, backup verification |

### Pattern 3: Multi-Tenant Control Scope

```
┌─────────────────────────────────────────────────────────┐
│              Control Scope by Layer                      │
│                                                          │
│   Platform Controls (Apply to all tenants)               │
│   ├── Infrastructure security                           │
│   ├── Network isolation                                  │
│   ├── Platform encryption                               │
│   └── Shared service security                           │
│                                                          │
│   Tenant Controls (Per-tenant configuration)             │
│   ├── Tenant-specific encryption keys                   │
│   ├── Tenant data retention policies                    │
│   ├── Tenant access configurations                      │
│   └── Tenant audit settings                             │
│                                                          │
│   Custom Controls (Enterprise only)                      │
│   ├── Tenant-defined control requirements               │
│   ├── Custom compliance frameworks                      │
│   └── Integration with tenant GRC systems               │
└─────────────────────────────────────────────────────────┘
```

---

## Evidence Collection Patterns

### Pattern 1: Evidence Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Evidence Collection Architecture            │
│                                                          │
│   ┌─────────────────────────────────────────────┐       │
│   │           Evidence Sources                   │       │
│   │                                              │       │
│   │  [Configs] [Logs] [Screenshots] [Metrics]   │       │
│   │  [Attestations] [Policies] [Test Results]   │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Collection Engine                  │       │
│   │                                              │       │
│   │  Scheduled │ Event-driven │ On-demand       │       │
│   └──────────────────┬──────────────────────────┘       │
│                      │                                   │
│   ┌──────────────────▼──────────────────────────┐       │
│   │           Evidence Store                     │       │
│   │                                              │       │
│   │  Immutable │ Versioned │ Tenant-partitioned │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Evidence Types and Collection

| Evidence Type | Source | Collection Method | Frequency |
|---------------|--------|-------------------|-----------|
| Configuration | Infrastructure | API snapshot | Daily |
| Access Logs | Auth system | Log export | Continuous |
| Audit Trail | Application | Log aggregation | Continuous |
| Screenshots | UI | Automated capture | Weekly |
| Attestations | Humans | Workflow | Quarterly |
| Test Results | CI/CD | Pipeline output | Per deploy |
| Policies | Documentation | Git snapshot | On change |
| Metrics | Monitoring | Metrics export | Daily |

### Pattern 3: Evidence Metadata Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| evidence_id | UUID | Yes | Unique identifier |
| tenant_id | UUID | Yes | Tenant scope (null for platform) |
| control_id | string | Yes | Related control |
| type | enum | Yes | Evidence type |
| collected_at | ISO8601 | Yes | Collection timestamp |
| collected_by | string | Yes | Collector (system/user) |
| hash | SHA256 | Yes | Content hash for integrity |
| storage_uri | URI | Yes | Evidence location |
| retention_until | ISO8601 | Yes | Retention expiration |

---

## Certification Tracking Patterns

### Pattern 1: Certification Lifecycle

```
┌─────────────────────────────────────────────────────────┐
│              Certification Lifecycle                     │
│                                                          │
│   ┌─────────┐                                           │
│   │Planning │ -120 days: Scope definition               │
│   └────┬────┘                                           │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────┐                                           │
│   │ Pre-    │ -90 days: Gap analysis, remediation       │
│   │ Audit   │                                           │
│   └────┬────┘                                           │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────┐                                           │
│   │ Audit   │ -60 to 0: External assessment            │
│   └────┬────┘                                           │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────┐                                           │
│   │Remediate│ 0 to +30: Fix findings                    │
│   └────┬────┘                                           │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────┐                                           │
│   │Certified│ +30 to +60: Receive certification        │
│   └────┬────┘                                           │
│        │                                                 │
│        ▼                                                 │
│   ┌─────────┐                                           │
│   │Maintain │ Continuous compliance                     │
│   └─────────┘                                           │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Certification Types

| Certification | Scope | Renewal | Tenant Impact |
|---------------|-------|---------|---------------|
| SOC2 Type II | Platform | Annual | All tenants benefit |
| ISO 27001 | Platform | 3-year cycle | All tenants benefit |
| HIPAA | Platform + BAA | Continuous | Healthcare tenants |
| GDPR | Platform | Continuous | EU tenants |
| PCI-DSS | Payment scope | Annual | Payment processing |
| FedRAMP | Government | Annual | Government tenants |
| SOC2 + HIPAA | Combined | Annual | Regulated industries |

### Pattern 3: Tenant Certification Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Platform cert visibility | Yes | Yes | Yes |
| Certification documents | No | View | Download |
| BAA execution | No | Request | Included |
| Custom audit support | No | No | Yes |
| Evidence sharing | No | Limited | Full |
| Compliance attestation | No | No | Custom |

---

## Compliance Dashboard Patterns

### Pattern 1: Dashboard Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Compliance Dashboard Views                  │
│                                                          │
│   Executive View                                         │
│   ┌─────────────────────────────────────────────┐       │
│   │ Overall Compliance Score: 94%               │       │
│   │ ████████████████████░░░░                   │       │
│   │                                             │       │
│   │ Critical Findings: 2   High: 5   Medium: 12│       │
│   └─────────────────────────────────────────────┘       │
│                                                          │
│   Framework View                                         │
│   ┌─────────────────────────────────────────────┐       │
│   │ SOC2:    ████████████████░░ 87%            │       │
│   │ ISO27001:████████████████████ 95%          │       │
│   │ GDPR:    ███████████████░░░ 82%            │       │
│   │ HIPAA:   ████████████████░░ 88%            │       │
│   └─────────────────────────────────────────────┘       │
│                                                          │
│   Tenant View (Multi-tenant admin)                       │
│   ┌─────────────────────────────────────────────┐       │
│   │ Tenant   │ Score │ Findings │ Status       │       │
│   │ ─────────┼───────┼──────────┼─────────     │       │
│   │ Acme Inc │ 96%   │ 3        │ Compliant    │       │
│   │ Beta Co  │ 78%   │ 12       │ At Risk      │       │
│   │ Gamma    │ 91%   │ 5        │ Compliant    │       │
│   └─────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Key Compliance Metrics

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Control Coverage | % controls with automated checks | < 80% |
| Open Findings | Count of unresolved findings | > SLA |
| Finding Age | Days since finding opened | > 30 days critical |
| Evidence Freshness | Days since last collection | > 30 days |
| Certification Status | Days until expiration | < 90 days |
| Audit Readiness | % evidence collected | < 95% |
| Remediation Rate | Findings closed / opened | < 0.9 |

### Pattern 3: Role-Based Dashboard Access

| Role | Platform View | Tenant View | Export |
|------|---------------|-------------|--------|
| Platform Admin | All tenants | All tenants | Full |
| Tenant Admin | Own tenant | Own tenant | Own data |
| Auditor | Scoped | Scoped | Scoped |
| Executive | Summary | Aggregate | Reports |
| Compliance Officer | All | All | Full |

---

## Remediation Management Patterns

### Pattern 1: Finding Workflow

```
┌─────────────────────────────────────────────────────────┐
│              Finding Remediation Workflow                │
│                                                          │
│   Finding Created                                        │
│         │                                               │
│         ▼                                               │
│   ┌─────────────┐                                       │
│   │   Triage    │ Assign severity, owner, deadline      │
│   └──────┬──────┘                                       │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │   Assign    │ Route to responsible team             │
│   └──────┬──────┘                                       │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │ Remediate   │ Implement fix                         │
│   └──────┬──────┘                                       │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │   Verify    │ Confirm fix is effective              │
│   └──────┬──────┘                                       │
│          │                                               │
│          ▼                                               │
│   ┌─────────────┐                                       │
│   │   Close     │ Update evidence, close finding        │
│   └─────────────┘                                       │
└─────────────────────────────────────────────────────────┘
```

### Pattern 2: Finding SLAs by Severity

| Severity | Triage | Remediation | Verification |
|----------|--------|-------------|--------------|
| Critical | 4 hours | 24 hours | 48 hours |
| High | 24 hours | 7 days | 14 days |
| Medium | 72 hours | 30 days | 45 days |
| Low | 7 days | 90 days | 120 days |

---

## Decision Framework

| Question | Recommendation |
|----------|----------------|
| Need continuous compliance? | Implement automated control checks |
| Preparing for audit? | Deploy evidence collection automation |
| Multiple certifications? | Build unified control framework |
| Enterprise tenants need attestations? | Enable tenant-scoped evidence sharing |
| Compliance visibility needed? | Deploy role-based dashboards |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance framework
- `bmad-bam-soc2-evidence-collection` - Design evidence system
- `bmad-bam-compliance-training-tracking` - Track certifications and training
- `bmad-bam-tenant-analytics-dashboard` - Design dashboards
- `bmad-bam-security-review` - Security compliance review

## Related Patterns

- **compliance-frameworks:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **tenant-isolation:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `tenant-isolation`
- **audit-logging:** `{project-root}/_bmad/bam/data/agent-guides/bam/audit-logging-patterns.md`

### Web Research

For current best practices, use the `web_queries` column from the pattern registry:

| Pattern | Web Search Query |
|---------|------------------|
| `compliance-automation` | `compliance automation SaaS best practices {date}` |
| `evidence-collection` | `audit evidence collection automation {date}` |
| `grc-platform` | `GRC platform multi-tenant patterns {date}` |
| `continuous-compliance` | `continuous compliance monitoring SaaS {date}` |

**Note:** Replace `{date}` with the current year for up-to-date results.
