# Compliance Officer Guide - BAM Extension

**When to load:** When designing compliance programs, implementing regulatory controls, conducting audits, or when user mentions GDPR, SOC2, HIPAA, compliance, DPO, audit, or regulatory requirements.
**Integrates with:** Architect (bmad-agent-architect), PM (bmad-agent-pm), Analyst (bmad-agent-analyst)

This guide provides BAM-specific context for compliance officers and data protection officers managing regulatory requirements in multi-tenant agentic AI platforms.

---

## Role Context

As a compliance officer on a BAM project, you focus on:
- Managing per-tenant compliance requirements and evidence
- Ensuring platform-wide compliance posture (SOC2, GDPR, HIPAA)
- Coordinating audits across platform and tenant scope
- Implementing data protection controls with tenant isolation
- Preparing for AI-specific regulations (EU AI Act)

---

## Core Concepts

### Multi-Tenant Compliance Model

Compliance in multi-tenant environments requires managing per-tenant regulatory obligations while maintaining platform-wide compliance posture. Different tenants may have different compliance requirements based on their industry, geography, and data types processed.

### Compliance Complexity in Multi-Tenant

| Challenge | Single-Tenant | Multi-Tenant |
|-----------|--------------|--------------|
| Scope | One compliance boundary | Multiple compliance boundaries |
| Evidence | One set of evidence | Per-tenant evidence isolation |
| Audits | Single audit process | Platform audit + tenant audits |
| Controls | Uniform controls | Controls vary by tenant requirement |
| Data handling | Single policy | Per-tenant data policies |

### Tenant Compliance Profiles

| Tier | Typical Requirements | Compliance Support |
|------|---------------------|-------------------|
| Free | Basic security | Platform SOC2 coverage |
| Pro | SOC2, GDPR | Standard compliance package |
| Enterprise | SOC2, HIPAA, GDPR, FedRAMP, PCI | Custom compliance configuration |

---

## Regulatory Framework Matrix

### Framework Requirements by Category

| Framework | Data Protection | Access Control | Audit | Breach Notification |
|-----------|-----------------|----------------|-------|---------------------|
| SOC2 | Encryption at rest/transit | RBAC + MFA | Continuous logging | Required |
| GDPR | Purpose limitation, minimization | Consent-based | Processing records | 72 hours |
| HIPAA | PHI safeguards | Role-based + BAA | 6-year retention | 60 days |
| PCI-DSS | Cardholder data isolation | Need-to-know | 1-year logs | Immediate |
| FedRAMP | Data sovereignty | PIV/CAC | Continuous monitoring | Per FISMA |

### AI-Specific Compliance Considerations

| Regulation | AI Requirement | Implementation |
|------------|---------------|----------------|
| GDPR Art 22 | Automated decision explanation | Explainability logging |
| EU AI Act | Risk classification, transparency | Risk assessment, documentation |
| CCPA | Opt-out of AI profiling | Preference management |
| HIPAA | PHI in AI context | De-identification before AI |
| SOC2 | AI model change management | Version control, testing |

---

## Decision Framework

| Scenario | Recommendation | Rationale |
|----------|---------------|-----------|
| New tenant with HIPAA needs | Verify BAA, enable PHI controls | Contractual and legal requirement |
| GDPR data subject request | Execute within 30 days | Regulatory deadline |
| Audit finding | Remediate and document | Maintain compliance posture |
| New AI model deployment | Risk assessment first | EU AI Act preparation |
| Cross-border data transfer | Verify SCCs/adequacy | GDPR Chapter V |
| Tenant requests compliance report | Provide SOC2 report + tenant addendum | Common enterprise request |

---

## Compliance Program Structure

### Compliance Governance

```
Compliance Committee
├── Chief Compliance Officer
├── Data Protection Officer
├── Security Officer
├── Engineering Representative
└── Legal Representative

Responsibilities:
├── Policy approval
├── Risk assessment review
├── Incident escalation decisions
├── Audit response coordination
└── Regulatory change monitoring
```

### Compliance Calendar

| Activity | Frequency | Owner | Deliverable |
|----------|-----------|-------|-------------|
| Policy review | Annual | CCO | Updated policies |
| Risk assessment | Annual | DPO | Risk register |
| Control testing | Quarterly | Security | Test results |
| Compliance training | Annual | HR + Compliance | Training records |
| Audit preparation | Pre-audit | Compliance | Evidence package |
| Regulatory monitoring | Continuous | Legal | Change analysis |

### Per-Tenant Compliance Tracking

| Tenant Attribute | Tracked | Purpose |
|------------------|---------|---------|
| Compliance requirements | List of frameworks | Control mapping |
| Data residency | Required regions | Infrastructure config |
| Retention policies | Per data type | Automated enforcement |
| Consent records | Per data subject | GDPR compliance |
| Processing purposes | Documented purposes | Purpose limitation |
| DPA/BAA status | Signed/pending | Contractual compliance |

---

## Data Protection Controls

### Tenant Data Isolation Evidence

| Control | Evidence Type | Collection Method |
|---------|--------------|-------------------|
| RLS enforcement | Policy configuration | Automated scan |
| Schema isolation | Database architecture | Architecture diagram |
| Encryption at rest | Key management config | Automated report |
| Encryption in transit | TLS configuration | Certificate scan |
| Access logging | Audit log samples | Automated export |
| Cross-tenant testing | Test results | Quarterly testing |

### Data Subject Rights (GDPR)

| Right | Implementation | SLA |
|-------|---------------|-----|
| Access (Art 15) | Self-service export | 30 days |
| Rectification (Art 16) | Self-service edit | 30 days |
| Erasure (Art 17) | Tenant admin + automated | 30 days |
| Portability (Art 20) | Machine-readable export | 30 days |
| Restriction (Art 18) | Processing freeze | Immediate |
| Objection (Art 21) | Opt-out mechanism | Immediate |

### Data Processing Records (GDPR Art 30)

For each processing activity, maintain:
- Processing purpose
- Data categories
- Data subject categories
- Recipients (including processors)
- International transfers and safeguards
- Retention period
- Security measures

---

## Audit Management

### Audit Types and Frequency

| Audit Type | Scope | Frequency | Output |
|------------|-------|-----------|--------|
| SOC2 Type II | Platform controls | Annual | SOC2 report |
| Penetration test | Security controls | Annual | Remediation report |
| Internal audit | All controls | Quarterly | Findings report |
| Tenant audit | Tenant-specific | As requested | Custom report |
| Compliance self-assessment | All frameworks | Monthly | Gap analysis |

### Evidence Collection Automation

| Evidence Category | Collection Method | Retention |
|-------------------|-------------------|-----------|
| Access logs | Automated export | Per framework |
| Configuration | GitOps snapshot | Continuous |
| Change records | Version control | Indefinite |
| Test results | CI/CD artifacts | 3 years |
| Training records | LMS export | 6 years |
| Incident records | Ticketing export | 6 years |

### Audit Response Process

```
Audit Notification Received
├── Assess scope and timeline
├── Assign audit coordinator
├── Gather evidence per request list
│   ├── Automated evidence collection
│   ├── Manual evidence gathering
│   └── Evidence review and packaging
├── Conduct audit sessions
│   ├── Walkthrough meetings
│   ├── Evidence presentation
│   └── Q&A documentation
├── Address findings
│   ├── Acknowledge findings
│   ├── Create remediation plan
│   └── Track remediation
└── Finalize audit
    ├── Review draft report
    ├── Provide management response
    └── Archive audit package
```

---

## Incident and Breach Management

### Breach Assessment Matrix

| Factor | Assessment Questions |
|--------|---------------------|
| Data types | What data was potentially compromised? |
| Data subjects | How many individuals affected? |
| Tenant scope | Which tenants affected? |
| Risk level | What harm could result? |
| Containment | Is the breach contained? |
| Notification | Which regulators and subjects require notification? |

### Notification Timelines

| Framework | Regulator Notification | Data Subject Notification |
|-----------|----------------------|---------------------------|
| GDPR | 72 hours | "Without undue delay" |
| HIPAA | 60 days (500+ individuals) | 60 days |
| State laws | 30-90 days (varies) | 30-90 days |
| PCI-DSS | Immediate | Per card brand rules |

### Per-Tenant Breach Process

```
Breach Detected
├── Contain and assess
├── Identify affected tenants
├── For each affected tenant:
│   ├── Determine data types
│   ├── Assess notification requirements
│   ├── Prepare tenant-specific notice
│   └── Coordinate with tenant compliance contact
├── Execute notifications
│   ├── Regulator notifications
│   ├── Tenant notifications
│   └── Data subject notifications (if required)
└── Post-incident
    ├── Root cause analysis
    ├── Control improvements
    └── Documentation update
```

---

## AI Compliance Considerations

### AI Risk Assessment (EU AI Act Preparation)

| Risk Level | Criteria | Requirements |
|------------|----------|--------------|
| Unacceptable | Social scoring, manipulation | Prohibited |
| High | HR, credit, law enforcement | Conformity assessment |
| Limited | Chatbots, emotion detection | Transparency |
| Minimal | Most AI applications | None specific |

### AI Documentation Requirements

| Document | Purpose | Update Frequency |
|----------|---------|------------------|
| Model cards | Model purpose and limitations | Per model version |
| Training data documentation | Data sources and processing | Per training run |
| Risk assessment | Risk level and mitigations | Annual or per change |
| Performance metrics | Accuracy, bias metrics | Continuous |
| Incident log | AI-related incidents | As occurred |

### AI Transparency Controls

| Control | Implementation | Evidence |
|---------|---------------|----------|
| AI disclosure | In-app notice of AI use | UI screenshots |
| Explanation | Decision factors logging | Explanation logs |
| Human oversight | Escalation mechanisms | Escalation records |
| Opt-out | AI preference settings | Configuration logs |

---

## Tenant Compliance Portal

### Compliance Self-Service Features

| Feature | Description | Tier Availability |
|---------|-------------|-------------------|
| SOC2 report access | Download current SOC2 | All tiers |
| Compliance questionnaire | Pre-filled security questionnaire | Pro + Enterprise |
| Data processing addendum | DPA template and signing | Pro + Enterprise |
| Custom compliance config | Retention, residency settings | Enterprise |
| Audit support | Direct audit assistance | Enterprise |
| Compliance API | Programmatic evidence access | Enterprise |

### Tenant Compliance Dashboard

```
Tenant Compliance Portal
├── Compliance Status
│   ├── Framework coverage
│   ├── Control status
│   └── Recent assessments
├── Documents
│   ├── SOC2 report
│   ├── DPA/BAA
│   ├── Security whitepaper
│   └── Penetration test summary
├── Configuration
│   ├── Data residency
│   ├── Retention policies
│   ├── Processing purposes
│   └── Consent management
├── Data Rights
│   ├── Export request
│   ├── Deletion request
│   └── Processing restriction
└── Audit Support
    ├── Evidence request
    ├── Questionnaire response
    └── Audit scheduling
```

---

## Application Guidelines

When managing multi-tenant compliance:

1. **Track requirements per tenant** - Maintain tenant compliance profiles
2. **Automate evidence collection** - Reduce manual evidence gathering burden
3. **Isolate audit trails** - Ensure per-tenant evidence isolation
4. **Monitor regulatory changes** - Stay ahead of new requirements
5. **Build compliance into product** - Make compliance self-service where possible

When responding to audits:

1. **Centralize coordination** - Single point of contact for auditors
2. **Pre-package evidence** - Have standard evidence packages ready
3. **Document controls clearly** - Map controls to framework requirements
4. **Address findings promptly** - Track and remediate audit findings
5. **Learn and improve** - Update controls based on audit learnings

When handling AI compliance:

1. **Assess AI risk early** - Before deployment, assess risk level
2. **Document thoroughly** - Model cards, training data, decisions
3. **Enable transparency** - Disclosure, explanation, opt-out
4. **Monitor continuously** - Performance, bias, incidents
5. **Prepare for regulation** - EU AI Act and similar upcoming laws

---

## Related Workflows

- `bmad-bam-compliance-design` - Design compliance controls
- `bmad-bam-privacy-impact-assessment` - Conduct privacy assessments
- `bmad-bam-security-audit-execution` - Execute security audits
- `bmad-bam-data-retention-policy-design` - Design retention policies
- `bmad-bam-tenant-incident-response` - Handle compliance incidents

## Related Patterns

Load decision criteria and web search queries from pattern registry:

- **Compliance patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Security patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter by category: `security-*`

### Web Research

Use the `web_queries` column from pattern registry to search for current best practices:
- Search: "multi-tenant SaaS compliance best practices {date}"
- Search: "EU AI Act compliance requirements {date}"
- Search: "SOC2 multi-tenant evidence collection {date}"
- Search: "GDPR multi-tenant data controller processor {date}"
