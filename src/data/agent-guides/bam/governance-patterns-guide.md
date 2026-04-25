# BAM Governance Patterns Guide

**When to load:** During compliance architecture design, regulatory controls implementation, audit preparation, data governance, risk management, or when user mentions GDPR, SOC2, HIPAA, SOX, FedRAMP, EU AI Act, compliance, audit, or regulatory requirements for multi-tenant SaaS platforms.
**Integrates with:** Architect (Winston/Atlas), Security agents, Compliance Officer, DPO, Legal teams, Analyst (Mary)

---

## Core Concepts

Governance in multi-tenant platforms requires managing per-tenant regulatory obligations while maintaining platform-wide compliance posture. Different tenants may have different compliance requirements based on their industry, geography, and data types processed.

### Key Principles

| Principle | Description |
|-----------|-------------|
| Per-Tenant Compliance | Each tenant may have unique regulatory requirements |
| Evidence Automation | Audit evidence collected continuously, not point-in-time |
| Shared Responsibility | Platform provides controls, tenants configure for their needs |
| Tenant Isolation | Compliance evidence and audit trails isolated by tenant |
| Continuous Compliance | Real-time monitoring, not annual assessments |

### Compliance Complexity in Multi-Tenant

| Challenge | Single-Tenant | Multi-Tenant |
|-----------|--------------|--------------|
| Scope | One compliance boundary | Multiple compliance boundaries |
| Evidence | One set of evidence | Per-tenant evidence isolation |
| Audits | Single audit process | Platform audit + tenant audits |
| Controls | Uniform controls | Controls vary by tenant requirement |
| Data handling | Single policy | Per-tenant data policies |

### Tenant Compliance Tiers

| Tier | Typical Requirements | Compliance Support |
|------|---------------------|-------------------|
| Free | Basic security | Platform SOC2 coverage |
| Pro | SOC2, GDPR | Standard compliance package |
| Enterprise | SOC2, HIPAA, GDPR, FedRAMP, PCI | Custom compliance configuration |

---

## BAM Conventions

> **CRITICAL:** These conventions are BAM-specific and MUST be followed exactly.

### Tenant Compliance Profile

Every tenant MUST have a compliance profile tracking:
- List of applicable frameworks
- Data residency requirements (regions)
- Retention policies per data type
- Consent records per data subject
- Processing purposes documented
- DPA/BAA status (signed/pending)

### Audit Log Schema

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

### Evidence Metadata Schema

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

### Quality Gate IDs

| Gate | Purpose |
|------|---------|
| QG-C1 | Compliance framework coverage verified |
| QG-C2 | Audit logging configured correctly |
| QG-C3 | Data residency controls enforced |
| QG-C4 | Evidence automation operational |
| QG-C5 | Policy-as-code enforced |
| QG-C6 | Risk assessment complete |
| QG-C7 | AI governance controls verified |

---

## Decision Framework

### Compliance Framework Selection

| Situation | Recommendation | Rationale |
|-----------|---------------|-----------|
| EU customer data | GDPR controls + EU residency option | Regulatory requirement |
| Enterprise B2B SaaS | SOC2 Type II as baseline | Table stakes for enterprise |
| Healthcare data | HIPAA compliance + BAA | PHI protection required |
| Financial data | SOX + PCI-DSS scope isolation | Regulatory requirement |
| Government customers | FedRAMP consideration | Public sector requirement |
| AI system deployment | EU AI Act risk assessment | High penalties for non-compliance |

### Decision Tree

```
START: What compliance requirement?
│
├─► Data Protection
│   └─► EU data subjects?
│       ├─► Yes → GDPR with EU data residency
│       └─► No → Check local data protection laws
│
├─► Industry Specific
│   └─► What industry?
│       ├─► Healthcare → HIPAA + BAA per tenant
│       ├─► Financial → SOX + PCI-DSS
│       └─► Government → FedRAMP (Moderate baseline)
│
├─► AI Systems
│   └─► Risk level?
│       ├─► High-risk → Full EU AI Act compliance
│       └─► Limited → Transparency requirements
│
└─► General Security
    └─► Customer size?
        ├─► Enterprise → SOC2 Type II + ISO27001
        └─► SMB → SOC2 Type II minimum
```

---

## §compliance-frameworks

### Pattern: Multi-Framework Compliance

**When to use:** When serving tenants with different regulatory requirements
**Phase:** solutioning

#### Framework Requirements Matrix

| Framework | Data Protection | Access Control | Audit | Breach Notification |
|-----------|-----------------|----------------|-------|---------------------|
| SOC2 | Encryption at rest/transit | RBAC + MFA | Continuous logging | Required |
| GDPR | Purpose limitation, minimization | Consent-based | Processing records | 72 hours |
| HIPAA | PHI safeguards | Role-based + BAA | 6-year retention | 60 days |
| PCI-DSS | Cardholder data isolation | Need-to-know | 1-year logs | Immediate |
| FedRAMP | Data sovereignty | PIV/CAC | Continuous monitoring | Per FISMA |
| SOX | Financial accuracy | Segregation of duties | 7-year retention | Immediate |

#### Shared vs Dedicated Compliance

| Aspect | Shared Model | Dedicated Model |
|--------|--------------|-----------------|
| Certification | Platform-wide SOC2 | Per-tenant attestation |
| Audit Scope | Single audit covers all | Individual tenant audits |
| Cost | Amortized across tenants | Higher, tenant-specific |
| Use Case | SMB tenants | Enterprise, regulated |
| BAM Tier | Free, Pro | Enterprise |

#### Control Implementation Categories

| Control Type | Description | Examples |
|--------------|-------------|----------|
| Technical | Automated enforcement | Encryption, access controls |
| Administrative | Policies and procedures | Security training, background checks |
| Physical | Facility security | Data center access, hardware disposal |

#### Multi-Tenant Control Mapping

| Control Requirement | Platform Responsibility | Tenant Responsibility |
|--------------------|-------------------------|----------------------|
| Data encryption at rest | Implement and manage | Enable/configure |
| Access control | Provide RBAC framework | Configure roles |
| Audit logging | Capture and store | Review and respond |
| Incident response | Platform-level response | Tenant notification |
| Data retention | Provide policies | Set tenant preferences |

#### Web Research

- "multi-tenant SaaS compliance architecture {date}"
- "SOC2 multi-tenant best practices {date}"
- "compliance framework unification patterns {date}"

---

## §audit-logging

### Pattern: Compliance Audit Trails

**When to use:** When implementing audit logging for compliance requirements
**Phase:** foundation

#### Audit Event Categories

| Category | Events | Retention |
|----------|--------|-----------|
| Authentication | login, logout, mfa_challenge, password_reset | Per framework |
| Authorization | permission_grant, permission_revoke, access_deny | Per framework |
| Data Events | create, read, update, delete, export | 7 years (SOX) |
| System Events | config_change, deployment, maintenance | 5 years |
| Tenant Events | onboard, offboard, tier_change, settings_update | Indefinite |

#### Audit Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Audit Logging Architecture                  │
│                                                          │
│   Application Layer                                      │
│   └── Events: auth, data, admin actions                 │
│                    │                                     │
│   Collection Layer │                                     │
│   └── Tenant context injection                          │
│                    │                                     │
│   Storage Layer    │                                     │
│   └── Immutable, tenant-partitioned                     │
│                    │                                     │
│   Query Layer      │                                     │
│   └── RLS-filtered access                               │
└─────────────────────────────────────────────────────────┘
```

#### Per-Tier Audit Features

| Feature | Free | Pro | Enterprise |
|---------|------|-----|------------|
| Retention | 90 days | 1 year | 7+ years |
| Export | None | CSV | SIEM integration |
| Real-time access | No | Dashboard | Full API |
| Custom events | No | 10 types | Unlimited |

#### Audit Log Integrity

| Control | Purpose | Implementation |
|---------|---------|----------------|
| Immutability | Prevent tampering | Append-only storage |
| Hash chains | Detect modification | Per-tenant hash chains |
| Timestamps | Prove timing | Cryptographic timestamps |
| Replication | Durability | Multi-region storage |

#### Web Research

- "immutable audit logs multi-tenant {date}"
- "compliance audit trail patterns SaaS {date}"

---

## §data-residency

### Pattern: Tenant Data Location Requirements

**When to use:** When tenants require data to remain in specific geographic regions
**Phase:** foundation

#### Data Residency Architecture

```
┌─────────────────────────────────────────────────┐
│              Data Residency Control              │
│                                                  │
│  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │   EU   │  │   US   │  │  APAC  │            │
│  │ Region │  │ Region │  │ Region │            │
│  └───┬────┘  └───┬────┘  └───┬────┘            │
│      └───────────┴───────────┘                  │
│              Tenant config selects region       │
└─────────────────────────────────────────────────┘
```

#### Cross-Border Transfer Mechanisms

| Mechanism | Description | Multi-Tenant Use |
|-----------|-------------|------------------|
| Adequacy Decision | EU-approved countries | Default for approved regions |
| SCCs | Standard contractual clauses | Per-tenant agreements |
| BCRs | Binding corporate rules | Enterprise tier requirement |
| Data Residency | Keep data in-region | Tier-based regional isolation |

#### Per-Tier Residency Options

| Tier | Available Regions | Data Location Control | Transfer Restrictions |
|------|-------------------|----------------------|----------------------|
| Free | Multi-region | None | None |
| Pro | Region selection | Basic | Region-locked |
| Enterprise | Custom regions | Full control | Custom SCCs |

#### Residency Enforcement

| Component | Enforcement | Verification |
|-----------|-------------|--------------|
| Database | Region-specific clusters | Infrastructure audit |
| Object storage | Bucket regions | Storage configuration |
| Caching | Regional cache instances | Network topology |
| Processing | Compute region | Deployment constraints |
| Backups | Same-region backups | Backup location audit |

#### Web Research

- "GDPR data residency multi-tenant SaaS {date}"
- "cross-border data transfer patterns {date}"

---

## §evidence-automation

### Pattern: Automated Compliance Evidence Collection

**When to use:** When preparing for audits or implementing continuous compliance
**Phase:** solutioning

#### Evidence Lifecycle

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

#### Evidence Types and Collection

| Evidence Type | Source | Collection Method | Tenant Scope |
|---------------|--------|-------------------|--------------|
| Configuration | Infrastructure | API snapshot | Tenant-specific configs |
| Access Logs | Auth system | Log export | Filtered by tenant_id |
| Audit Trail | Application | Log aggregation | Per-tenant partition |
| Test Results | CI/CD | Pipeline artifacts | Platform + tenant |
| Attestations | Humans | Workflow | Quarterly per tenant |
| Policies | Documentation | Git snapshot | On change |

#### Collection Triggers

| Trigger Type | Use Case | Example |
|--------------|----------|---------|
| Scheduled | Regular compliance checks | Daily config snapshots |
| Event-driven | Security-relevant events | Access denied events |
| On-demand | Audit requests | Historical evidence export |
| Continuous | Real-time compliance | Stream processing |

#### Per-Tier Evidence Features

| Tier | Collection Frequency | Retention Period | Export Formats |
|------|---------------------|------------------|----------------|
| Free | Daily | 30 days | N/A |
| Pro | Hourly | 1 year | CSV, PDF |
| Enterprise | Real-time | 7 years | JSON, SIEM, API |

#### Web Research

- "automated compliance evidence collection SaaS {date}"
- "continuous compliance monitoring multi-tenant {date}"
- "SOC2 evidence automation best practices {date}"

---

## §policy-enforcement

### Pattern: Policy-as-Code

**When to use:** When implementing consistent policy enforcement across tenants
**Phase:** solutioning

#### Policy Architecture

```
┌─────────────────────────────────────────────────────────┐
│             Policy Enforcement Layers                    │
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

#### Policy Types

| Policy Type | Scope | Enforcement | Example |
|-------------|-------|-------------|---------|
| Platform | All tenants | Automatic | Encryption requirements |
| Tenant Default | Inherited | Configurable | Retention periods |
| Tenant Custom | Enterprise only | Admin-configured | Custom access rules |

#### Data Classification Levels

| Classification | Description | Agent Access |
|----------------|-------------|--------------|
| Public | Non-sensitive, shareable | All agents |
| Internal | Business confidential | Authorized agents only |
| Confidential | PII, financial data | Tenant-scoped agents only |
| Restricted | Highly sensitive | Human approval required |

#### Retention Policy Matrix

| Data Type | Minimum | Maximum | Purge Method |
|-----------|---------|---------|--------------|
| Transaction logs | 7 years | 10 years | Archive + delete |
| Audit logs | 1 year | 7 years | Compress + archive |
| User data | Active | +30 days | Hard delete |
| Backups | 30 days | 90 days | Rotate + destroy |
| PII | Active | +30 days | Cryptographic erase |

#### Web Research

- "policy-as-code SaaS compliance {date}"
- "data classification multi-tenant {date}"

---

## §risk-management

### Pattern: Multi-Tenant Risk Assessment

**When to use:** When implementing ISO 27001 ISMS or NIST CSF 2.0 risk management
**Phase:** solutioning

#### Risk Assessment Methodology

| Risk Rating | Likelihood x Impact | Treatment Priority | Review Frequency |
|-------------|--------------------|--------------------|------------------|
| Critical | High x High | Immediate mitigation required | Weekly |
| High | High x Medium or Medium x High | Treatment plan within 30 days | Bi-weekly |
| Medium | Medium x Medium | Treatment plan within 90 days | Monthly |
| Low | Low x Any or Any x Low | Accept or monitor | Quarterly |

#### Risk Treatment Options

| Option | Description | Use Case |
|--------|-------------|----------|
| Mitigate | Implement controls to reduce likelihood or impact | Most common |
| Transfer | Shift risk to third party through insurance or contracts | High cost risks |
| Accept | Acknowledge and monitor risk within defined tolerance | Low risks |
| Avoid | Eliminate risk by removing the activity or asset | Unacceptable risks |

#### Multi-Tenant Risk Considerations

| Risk Category | Tenant Impact | Platform Response |
|---------------|---------------|-------------------|
| Noisy neighbor | Performance degradation | Resource quotas, tenant isolation |
| Data breach | Cross-tenant exposure | Encryption, access controls, isolation |
| Compliance violation | Platform liability | Tenant attestations, monitoring |
| Vendor dependency | Supply chain risk | Third-party risk assessment, alternatives |

#### Tenant Risk Profiling

| Profile Factor | Assessment | Tier Mapping |
|----------------|------------|--------------|
| Data sensitivity | PII, PHI, financial | Controls level |
| Regulatory scope | GDPR, HIPAA, SOX | Framework requirements |
| Volume | Requests, storage | Resource allocation |
| Industry | Healthcare, finance, government | Compliance profile |

#### Web Research

- "ISO 27001 risk management SaaS {date}"
- "NIST CSF 2.0 risk governance {date}"
- "multi-tenant risk assessment patterns {date}"

---

## §ai-governance

### Pattern: AI-Specific Compliance

**When to use:** When deploying AI systems subject to EU AI Act or similar regulations
**Phase:** solutioning

#### EU AI Act Risk Classification

| Risk Level | Examples | Requirements | Multi-Tenant Consideration |
|------------|----------|--------------|---------------------------|
| Unacceptable | Social scoring, subliminal manipulation | Prohibited | Blocked at platform level |
| High-Risk | Credit scoring, hiring, medical diagnosis | Full compliance | Per-tenant assessment required |
| Limited Risk | Chatbots, emotion recognition | Transparency | Disclosure per tenant UI |
| Minimal Risk | AI-enabled games, spam filters | No requirements | Standard deployment |

#### AI Transparency Requirements

| Requirement | Regulation | Implementation |
|-------------|------------|----------------|
| AI Interaction Notice | EU AI Act Art. 52 | "You are interacting with an AI system" |
| Emotion Recognition Notice | EU AI Act Art. 52 | Inform subjects of emotion detection |
| Deepfake Labeling | EU AI Act Art. 52 | Mark AI-generated content |
| Automated Decision Notice | GDPR Art. 22 | Explain automated decision-making |
| Right to Human Review | GDPR Art. 22 | Offer human review option |

#### NIST AI RMF Core Functions

| Function | Purpose | Multi-Tenant Implementation |
|----------|---------|----------------------------|
| GOVERN | Establish AI governance | Platform-level policies, tenant-level customization |
| MAP | Understand AI context | Per-tenant use case mapping |
| MEASURE | Assess AI risks | Tenant-specific risk metrics |
| MANAGE | Mitigate AI risks | Tenant-configurable controls |

#### AI Compliance Monitoring

| Metric | Description | Alert Threshold |
|--------|-------------|-----------------|
| Disclosure Rate | % of AI interactions with disclosure | <99% |
| Human Override Rate | % of decisions with human review | Below configured minimum |
| Explanation Availability | % of decisions with explanation | <100% |
| Bias Metrics | Fairness metrics by protected class | Deviation >5% |
| Audit Log Completeness | % of decisions logged | <100% |

#### Agent Data Governance

| Control | Purpose | Implementation |
|---------|---------|----------------|
| PII Filtering | Remove personal data from outputs | Pattern matching + ML detection |
| Tenant Boundary | Prevent cross-tenant leakage | Output scope validation |
| Confidence Thresholds | Flag uncertain responses | Configurable per agent |
| Human-in-Loop | Require approval for actions | Risk-based workflow |

#### Web Research

- "EU AI Act compliance requirements {date}"
- "NIST AI RMF implementation guide {date}"
- "AI transparency explainability requirements {date}"
- "multi-tenant AI governance frameworks {date}"

---

## Quality Gates

| Gate | Key Checks | Related Patterns |
|------|------------|------------------|
| QG-C1 | All applicable frameworks identified per tenant | §compliance-frameworks |
| QG-C2 | Audit logs immutable, tenant-partitioned | §audit-logging |
| QG-C3 | Data residency enforced per tenant config | §data-residency |
| QG-C4 | Evidence collection automated | §evidence-automation |
| QG-C5 | Policies enforced at all layers | §policy-enforcement |
| QG-C6 | Risk register complete and current | §risk-management |
| QG-C7 | AI systems classified and compliant | §ai-governance |

### Gate Verification Checklist

- [ ] **CRITICAL:** Per-tenant compliance profiles documented
- [ ] Applicable frameworks mapped to technical controls
- [ ] Audit logs capture all required event categories
- [ ] Audit storage is immutable and tenant-isolated
- [ ] Data residency requirements enforced
- [ ] Cross-border transfers have legal basis
- [ ] Evidence collection automated for all controls
- [ ] Evidence integrity verified (hash chains)
- [ ] Policies defined and enforced at all layers
- [ ] Retention policies automated
- [ ] Risk registry maintained and reviewed
- [ ] Third-party risks assessed
- [ ] AI systems risk-classified per EU AI Act
- [ ] AI transparency disclosures implemented
- [ ] AI decision audit trails complete

---

## Web Research

| Topic | Query |
|-------|-------|
| Compliance architecture | "multi-tenant SaaS compliance architecture {date}" |
| GDPR multi-tenant | "GDPR multi-tenant data controller processor {date}" |
| SOC2 evidence | "SOC2 evidence collection automation {date}" |
| EU AI Act | "EU AI Act compliance requirements {date}" |
| FedRAMP | "FedRAMP authorization SaaS requirements {date}" |
| Risk management | "ISO 27001 risk management SaaS {date}" |
| Data residency | "data sovereignty multi-tenant SaaS {date}" |

---

## Related Patterns

Cross-references to other domain guides:

- `tenant-patterns-guide.md` §tenant-lifecycle - Tenant onboarding/offboarding compliance
- `security-patterns-guide.md` §encryption - Encryption for compliance
- `security-patterns-guide.md` §rbac - Access control for compliance
- `observability-patterns-guide.md` §audit-logging - Audit trail infrastructure
- `ai-runtime-patterns-guide.md` §run-contracts - AI agent governance

Load from pattern registry:
- `compliance-frameworks.csv` → all frameworks
- `bam-patterns.csv` → filter: `compliance-*`, `governance-*`

Use the `web_queries` column from pattern registry for current best practices.

---

## Related Workflows

| Workflow | When to Use |
|----------|-------------|
| `bmad-bam-compliance-design` | Design compliance architecture |
| `bmad-bam-privacy-impact-assessment` | Conduct privacy assessments |
| `bmad-bam-security-audit-execution` | Execute security audits |
| `bmad-bam-data-retention-policy-design` | Design retention policies |
| `bmad-bam-tenant-incident-response` | Handle compliance incidents |
| `bmad-bam-tenant-offboarding-design` | GDPR-compliant tenant data deletion |
| `bmad-bam-tenant-audit-log-design` | Configure audit logging |
| `bmad-bam-ai-eval-safety-design` | AI-specific risk evaluation |

---

## Change Log

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-04-25 | Initial consolidated guide from 14 source files |
