# Regulatory Mapping Patterns

**When to load:** When designing compliance frameworks, mapping regulatory requirements to technical controls, or when user mentions regulatory compliance, control mapping, compliance frameworks, or audit requirements in multi-tenant SaaS.

**Integrates with:** Security agent, Architect (Atlas persona), DevOps agent, Analyst agent

---

## Core Concepts

### What is Regulatory Mapping?

Regulatory mapping is the process of connecting regulatory requirements (GDPR, HIPAA, SOC 2, PCI DSS, etc.) to specific technical controls, policies, and evidence artifacts in a multi-tenant SaaS platform. This enables systematic compliance verification and audit readiness.

### Multi-Tenant Compliance Challenges

| Challenge | Impact | Mitigation |
|-----------|--------|------------|
| Shared infrastructure | Multiple regulations apply | Control inheritance matrix |
| Tenant data commingling | Cross-tenant compliance risk | Isolation verification controls |
| Jurisdiction differences | Conflicting requirements | Per-tenant regulation profiles |
| Evidence collection | Tenant-scoped audit trails | Automated evidence tagging |
| Compliance inheritance | Tenant relies on platform controls | Shared responsibility model |

### Control Framework Hierarchy

```
Regulatory Requirements (e.g., GDPR Art. 32)
        │
        ▼
Control Objectives (e.g., Data encryption at rest)
        │
        ▼
Technical Controls (e.g., AES-256 encryption)
        │
        ▼
Implementation Evidence (e.g., Key management logs)
        │
        ▼
Tenant-Scoped Verification (e.g., Per-tenant encryption status)
```

---

## Key Patterns

### Pattern 1: Regulatory Control Matrix

| Regulation | Control Domain | Control ID | Technical Implementation | Tenant Scope |
|------------|----------------|------------|--------------------------|--------------|
| GDPR | Data Protection | GDPR-32-1 | Encryption at rest | Per-tenant keys |
| HIPAA | Access Control | HIPAA-164.312(a) | RBAC with audit | Tenant-isolated |
| SOC 2 | Availability | SOC2-A1.2 | SLA monitoring | Tier-based |
| PCI DSS | Network Security | PCI-1.3 | Segmentation | Tenant VLAN |

### Pattern 2: Tenant Compliance Profile

| Component | Description | Implementation |
|-----------|-------------|----------------|
| Regulation set | Active regulations | Tenant configuration |
| Control mapping | Applicable controls | Profile template |
| Evidence requirements | Required artifacts | Collection rules |
| Audit schedule | Compliance cadence | Tenant calendar |
| Exception register | Compensating controls | Documented deviations |

### Pattern 3: Control Inheritance Model

| Control Type | Owner | Tenant Responsibility | Evidence Source |
|--------------|-------|----------------------|-----------------|
| Infrastructure | Platform | Verify SLA | Platform attestation |
| Application | Shared | Configure properly | Shared logs |
| Data | Tenant | Classify and protect | Tenant audit trail |
| Process | Tenant | Document and follow | Tenant procedures |

---

## Application Guidelines

- Designing compliance-ready multi-tenant SaaS platforms
- Implementing regulatory control mapping systems
- Building tenant-specific compliance dashboards
- Creating automated compliance verification
- Establishing shared responsibility models
- Preparing for multi-framework audits (SOC 2 + HIPAA + GDPR)

---

## Multi-Tenant Considerations

### Per-Tier Compliance Features

| Tier | Compliance Dashboard | Custom Controls | Audit Reports | Dedicated Compliance Manager |
|------|---------------------|-----------------|---------------|------------------------------|
| Free | Basic status | No | N/A | No |
| Pro | Standard dashboard | Limited | Monthly PDF | No |
| Enterprise | Full dashboard + API | Yes | Real-time + export | Optional |

### Tenant Isolation Requirements

| Isolation Aspect | Implementation | Verification |
|------------------|----------------|--------------|
| Control evidence | Tenant-tagged artifacts | Query by tenant_id |
| Audit logs | RLS-filtered access | Tenant cannot see others |
| Compliance status | Isolated dashboards | Per-tenant calculations |
| Exception handling | Tenant-scoped registers | Separate approval workflows |

---

## Decision Framework

| Question | Recommendation | Rationale |
|----------|----------------|-----------|
| How to handle overlapping regulations? | Map to unified control set with regulation tagging | Reduces duplication, simplifies maintenance |
| Should compliance status be tenant-visible? | Yes, self-service dashboard with tier-based features | Enables tenant audit preparation, reduces support |
| How to manage control exceptions? | Per-tenant exception register with expiration | Provides flexibility while maintaining accountability |
| When to automate evidence collection? | All controls where feasible, manual for process controls | Reduces audit burden, ensures consistency |
| How to handle jurisdiction-specific requirements? | Tenant compliance profile with regulation set | Supports multi-jurisdictional tenants |
| Should platform controls be tenant-configurable? | No, platform controls are inherited, document in shared responsibility | Maintains consistent security posture |

---

## Related Workflows

- `bmad-bam-compliance-design` - Design comprehensive compliance framework
- `bmad-bam-tenant-aware-observability` - Implement compliance monitoring
- `bmad-bam-security-review` - Validate compliance controls
- `bmad-bam-tenant-audit-log-design` - Design compliance audit trails

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: `compliance`, `security`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant regulatory compliance mapping patterns {date}"
- Search: "SaaS compliance control framework best practices {date}"
- Search: "GDPR HIPAA SOC2 unified control mapping {date}"
