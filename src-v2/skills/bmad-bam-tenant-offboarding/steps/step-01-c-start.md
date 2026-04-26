# Step 01: Initialize Tenant Offboarding Design

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Focus: Initialize tenant offboarding design scope and requirements
- 💾 Track: `stepsCompleted: [1]` when complete
- 📖 Context: Load tenant model, compliance requirements, offboarding triggers
- 🚫 Do NOT: Design export or deletion processes (that's Steps 02-04)
- 🔍 Use web search: Verify GDPR right-to-deletion and data retention best practices
- ⚠️ Note: Data retention and compliance requirements are critical for offboarding

---

## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading tenant model configuration from master architecture
- Identifying compliance and data retention requirements
- Cataloging offboarding triggers (cancellation, non-payment, violation)
- Loading offboarding design template

**OUT OF SCOPE:**
- Data export process design (Step 02)
- Grace period and soft delete design (Step 03)
- Hard deletion and cleanup design (Step 04)
- Final compilation (Step 05)

---

## Purpose

Initialize the tenant offboarding design by loading the tenant model configuration, identifying compliance requirements, and cataloging all offboarding triggers. This step establishes the foundation for designing a compliant, safe tenant deprovisioning process.

---

## Prerequisites

- Master architecture with tenant model defined
- Tenant isolation strategy documented
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle
- **Load patterns:** `{project-root}/_bmad/bam/data/tenant-models.csv`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-offboarding-design-template.md`

---

## Inputs

- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`
- Tenant isolation design: `{output_folder}/planning-artifacts/tenant-isolation.md`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Compliance frameworks: `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## YOUR TASK:

Load all required artifacts and establish the offboarding design scope.

---

## Main Sequence

### 1. Load Tenant Model Configuration

Load and parse the master architecture document:

```
{output_folder}/planning-artifacts/architecture/master-architecture.md
```

Extract tenant model configuration:

| Attribute | Value |
|-----------|-------|
| Tenant Model | {{tenant_model}} (RLS / Schema-per-Tenant / Database-per-Tenant) |
| Tenant Identifier | {{tenant_id_field}} |
| Isolation Level | {{isolation_level}} |
| Data Distribution | {{distribution}} |

If master architecture does not exist, inform user and halt workflow.

### 2. Identify Compliance Requirements

Load compliance frameworks and identify data retention requirements:

| Framework | Applicable | Retention Requirement | Right-to-Deletion |
|-----------|------------|----------------------|-------------------|
| GDPR | YES/NO | {{retention_period}} | Article 17 - Right to Erasure |
| CCPA | YES/NO | {{retention_period}} | Right to Delete |
| SOC 2 | YES/NO | {{audit_requirement}} | Controlled Deletion |
| HIPAA | YES/NO | {{retention_period}} | De-identification Required |
| PCI-DSS | YES/NO | {{retention_period}} | Secure Destruction |

**CRITICAL Compliance Considerations:**
- [ ] **CRITICAL:** Identify legal hold exceptions (litigation, investigation)
- [ ] **CRITICAL:** Document mandatory retention periods by data type
- [ ] **CRITICAL:** Map data categories to deletion/anonymization requirements

### 3. Catalog Offboarding Triggers

Identify all scenarios that trigger tenant offboarding:

| Trigger Type | Description | Grace Period | Severity |
|--------------|-------------|--------------|----------|
| Voluntary Cancellation | User-initiated subscription cancellation | {{days}} days | Standard |
| Non-Payment | Failed payment after retry exhaustion | {{days}} days | Warning |
| Terms Violation | Violation of terms of service | Immediate | Critical |
| Account Inactivity | No login/activity for extended period | {{days}} days | Standard |
| Administrative | Admin-initiated for compliance/legal | Varies | Critical |
| Contract Expiration | Fixed-term contract end without renewal | {{days}} days | Standard |

### 4. Identify Data Categories for Offboarding

Map all data owned by a tenant that must be handled during offboarding:

| Data Category | Location | Sensitive | Retention | Deletion Method |
|---------------|----------|-----------|-----------|-----------------|
| User accounts | Primary DB | PII | 30 days | Hard delete |
| Business data | Primary DB | Business | Varies | Export + Delete |
| Files/Documents | Object Storage | Mixed | Varies | Archive + Delete |
| Audit logs | Log Storage | System | Compliance | Preserve/Anonymize |
| Cache entries | Redis/Cache | Session | Immediate | Purge |
| Event history | Event Store | System | Compliance | Preserve/Anonymize |
| AI/Agent data | Vector DB | Business | 30 days | Hard delete |
| Integrations | External | API Keys | Immediate | Revoke + Delete |

### 5. Load Module Integration Points

Identify all modules that contain tenant data:

| Module | Data Types | Foreign Keys | Cleanup Order |
|--------|------------|--------------|---------------|
| {{module}} | {{types}} | {{refs}} | {{order}} |

Document cleanup dependencies:
- Which modules must be cleaned before others
- Foreign key cascade requirements
- Cross-module reference handling

### 6. Establish Offboarding States

Define the offboarding state machine:

| State | Description | Reversible | Duration |
|-------|-------------|------------|----------|
| `active` | Normal tenant operation | N/A | Ongoing |
| `pending_cancellation` | Cancellation initiated, grace period active | YES | {{days}} days |
| `suspended` | Access restricted, data preserved | YES | {{days}} days |
| `pending_deletion` | Grace period expired, scheduled for deletion | LIMITED | {{days}} days |
| `deleting` | Deletion in progress | NO | Hours |
| `deleted` | Tenant fully removed, audit trail only | NO | Final |
| `anonymized` | Data anonymized but structure preserved | NO | Final |

---

## SUCCESS METRICS:

- [ ] Tenant model configuration loaded
- [ ] Compliance requirements identified
- [ ] All offboarding triggers cataloged
- [ ] Data categories mapped
- [ ] Module dependencies documented
- [ ] Offboarding states defined

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Master architecture missing | Create master architecture first |
| Tenant model undefined | Run tenant-model-isolation workflow |
| Compliance requirements unclear | Engage legal/compliance team |
| Module dependencies unknown | Run module-boundary-design workflow |

---

## Verification

- [ ] Tenant model configuration documented
- [ ] Compliance frameworks identified
- [ ] Offboarding triggers defined with grace periods
- [ ] Data categories mapped to deletion methods
- [ ] Module cleanup dependencies established
- [ ] Patterns align with pattern registry

---

## Outputs

- Tenant model configuration summary
- Compliance requirements matrix
- Offboarding trigger catalog
- Data category inventory
- Module dependency map
- Offboarding state definitions

---

## NEXT STEP:

Proceed to `step-02-c-analyze.md` to design the tenant data export process.
