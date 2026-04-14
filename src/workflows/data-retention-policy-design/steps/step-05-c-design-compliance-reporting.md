# Step 5: Design Compliance Reporting

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array
- Use web search to verify current best practices when making technology decisions
- Reference pattern registry `web_queries` for search topics

---

## Purpose

Design compliance audit and reporting capabilities including retention policy audit logs, deletion certificates, GDPR Article 30 records, and compliance dashboards.

---

## Prerequisites

- Deletion procedures designed (Step 4)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv`

---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Design Audit Logging

| Event Type | Data Captured | Retention | Access Level |
|------------|---------------|-----------|--------------|
| Policy Creation | Policy details, creator, timestamp | 10 years | Admin |
| Policy Modification | Before/after, modifier, reason | 10 years | Admin |
| Retention Trigger | Data category, action, timestamp | 10 years | System |
| Archival Execution | Data volume, source/destination, duration | 7 years | System |
| Deletion Request | Requester, scope, legal basis | 10 years | Admin/Legal |
| Deletion Execution | Data deleted, verification hash, duration | 10 years | System |
| Legal Hold Applied | Scope, reason, requestor, duration | Indefinite | Legal |
| Legal Hold Released | Scope, reason, authorizer | Indefinite | Legal |

### 2. Design Deletion Certificates

Certificate structure:

| Field | Description | Source |
|-------|-------------|--------|
| Certificate ID | Unique identifier | UUID generation |
| Request ID | Original deletion request | Request system |
| Requester | Identity of deletion requestor | Auth system |
| Data Subject | Identity of data owner | User record |
| Scope | Data categories deleted | Deletion manifest |
| Execution Date | Timestamp of deletion | System clock |
| Verification Hash | Hash of deleted data manifest | Computed |
| Operator | System/admin that executed | Execution context |
| Witness | Secondary verification (if applicable) | Audit system |

Certificate delivery:
- Automatic email to requester
- Stored in compliance archive (10 years)
- Available via admin portal
- API retrieval for enterprise tenants

### 3. Design GDPR Article 30 Records

Records of Processing Activities (ROPA):

| Record Field | Description | Update Frequency |
|--------------|-------------|------------------|
| Data Controller | Platform operator details | On change |
| Data Processor | Third-party processors | On change |
| Processing Purposes | Purpose per data category | On change |
| Data Categories | PII, transactions, logs, etc. | On change |
| Recipients | Who receives data | On change |
| Transfers | Cross-border transfers | On change |
| Retention Periods | Per data category | On change |
| Security Measures | Technical/org measures | Quarterly review |
| Processing Start Date | When processing began | On start |

ROPA automation:
- Auto-populate from retention policies
- Version control for changes
- Export in standard format (JSON, CSV, PDF)
- Regulator access portal (read-only)

### 4. Design Compliance Dashboards

| Dashboard | Audience | Key Metrics | Refresh |
|-----------|----------|-------------|---------|
| Retention Overview | Compliance team | Data volumes by tier, policy compliance % | Daily |
| Deletion Tracker | Legal/Compliance | Pending requests, SLA compliance, certificates issued | Real-time |
| GDPR Status | DPO | ROPA status, deletion request trends, breach tracking | Daily |
| Audit Summary | Auditors | Policy changes, execution logs, anomalies | On-demand |
| Tenant Compliance | Enterprise admins | Per-tenant retention status, deletions | Daily |

### 5. Design Compliance Alerts

| Alert Type | Trigger | Recipients | Priority |
|------------|---------|------------|----------|
| Deletion SLA Warning | 80% of deadline elapsed | Compliance team | High |
| Deletion SLA Breach | Deadline exceeded | Legal + Compliance | Critical |
| Policy Violation | Data retained beyond max | Compliance team | High |
| Legal Hold Conflict | Deletion blocked by hold | Legal team | Medium |
| Archival Failure | Archive job failed | Ops + Compliance | High |
| Certificate Generation Failed | Could not generate cert | Compliance team | High |

### 6. Design Compliance Reports

| Report | Frequency | Content | Distribution |
|--------|-----------|---------|--------------|
| Retention Compliance | Monthly | Policy adherence, violations, remediation | Compliance leadership |
| Deletion Summary | Monthly | Requests processed, SLA metrics, certificates | DPO |
| ROPA Update | Quarterly | Changes to processing activities | Regulator-ready |
| Annual Compliance | Yearly | Full compliance status, auditor summary | Board/Auditors |
| Tenant Data Report | On-demand | Per-tenant data inventory, retention status | Enterprise customers |

**Verify current best practices with web search:**
Search the web: "GDPR Article 30 records automation {date}"
Search the web: "data retention compliance reporting SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C):

After completing the compliance reporting design above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into audit logging and reporting requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for compliance review
- **C (Continue)**: Accept compliance reporting design and complete Create mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass compliance context: audit events, certificates, dashboards
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into compliance reporting
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance reporting: {summary of audit and reporting design}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save compliance reporting to output document
- Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5]`
- Generate final data retention policy document
- Complete Create mode workflow

---

## Verification

- [ ] Audit logging events defined
- [ ] Deletion certificate structure specified
- [ ] GDPR Article 30 records automated
- [ ] Compliance dashboards designed
- [ ] Compliance alerts configured
- [ ] Compliance reports scheduled
- [ ] Patterns align with pattern registry

---

## Outputs

- `{output_folder}/planning-artifacts/compliance/data-retention-policy.md`
- Audit logging specification
- Deletion certificate template
- ROPA automation design
- Compliance dashboard specifications
- Alert and report catalog

---

## Next Step

Create workflow complete. Data retention policy design ready for validation using Validate mode (`step-20-v-*`).

---

## Workflow Complete (Create Mode)

Create mode complete for data-retention-policy-design workflow.

The following artifacts have been generated:
- Data retention policy document
- Retention period matrix
- Archival rules catalog
- Deletion procedures runbook
- Compliance reporting specifications

**Quality Gate:** QG-P1 (Production Readiness) - Verify retention policies meet compliance requirements before production deployment.

---

## Quality Gate Contribution: QG-S7 Data Protection Gate

This workflow contributes to QG-S7 `retention_enforced` pattern:

| QG-S7 Requirement | Addressed In | Status |
|-------------------|--------------|--------|
| Retention periods defined | Step 2 - Retention Policies | Data type retention matrix |
| Archival rules configured | Step 3 - Archival Rules | Archive triggers and storage |
| Deletion procedures documented | Step 4 - Deletion Procedures | Soft/hard delete workflow |
| Compliance reporting automated | Step 5 - Compliance Reporting | Dashboards and alerts |

**Gate Reference:** Load from `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`
