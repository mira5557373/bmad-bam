# Step 03: Design Audit Controls (Create Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📖 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current audit logging practices

---

## Purpose

Design comprehensive audit controls including audit logging requirements, access tracking with tenant context, change management documentation, and evidence collection automation.

---

## Prerequisites

- Step 02 completed: Data governance designed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `audit-logging`, `audit-immutability`, `compliance`
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` -> filter: audit requirements

**Web Research (Required):**

Search the web: "SOC2 audit logging requirements SaaS {date}"
Search the web: "immutable audit trail implementation patterns {date}"
Search the web: "multi-tenant audit logging best practices {date}"

Document findings with citations: _Source: [URL]_

---

## Actions

### 1. Audit Logging Requirements

Define audit events by category and compliance mapping:

| Event Category | Events | Frameworks | Retention | Immutability |
|----------------|--------|------------|-----------|--------------|
| **Authentication** | Login, logout, MFA, password change, session timeout | SOC2 CC6, HIPAA 164.312(d) | 1 year | Required |
| **Authorization** | Permission grant/revoke, role assignment, access denial | SOC2 CC6, ISO27001 A.9 | 1 year | Required |
| **Data Access** | Read PII/PHI, export, bulk query, report generation | GDPR Art. 30, HIPAA 164.312(b) | 3 years | Required |
| **Data Modification** | Create, update, delete records, schema changes | SOC2 CC8, SOX | 7 years | Required |
| **Configuration** | System settings, tenant config, feature flags | SOC2 CC8, PCI-DSS Req 10 | 1 year | Required |
| **Security Events** | Failed auth, privilege escalation, suspicious activity | All | 1 year | Required |
| **AI/Agent Actions** | Tool execution, model invocation, agent decisions | EU-AI-Act Art. 12 | 3 years | Required |

### 2. Audit Log Schema with Tenant Context

Design the audit log entry schema:

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| `event_id` | UUID | Unique event identifier | Yes |
| `timestamp` | ISO8601 | Event timestamp (UTC) | Yes |
| `tenant_id` | UUID | Tenant context | Yes |
| `actor_id` | UUID | User/system performing action | Yes |
| `actor_type` | Enum | USER, SYSTEM, AGENT, API_KEY | Yes |
| `action` | String | Action performed (verb.noun) | Yes |
| `resource_type` | String | Type of resource affected | Yes |
| `resource_id` | UUID | Specific resource identifier | Yes |
| `outcome` | Enum | SUCCESS, FAILURE, PARTIAL | Yes |
| `ip_address` | String | Source IP (anonymized if required) | Yes |
| `user_agent` | String | Client information | No |
| `request_id` | UUID | Correlation ID for distributed tracing | Yes |
| `session_id` | UUID | Session identifier | No |
| `previous_value` | JSON | Before state (for modifications) | Conditional |
| `new_value` | JSON | After state (for modifications) | Conditional |
| `metadata` | JSON | Additional context | No |
| `classification` | Enum | PUBLIC, INTERNAL, CONFIDENTIAL, RESTRICTED | Yes |
| `checksum` | String | Hash for integrity verification | Yes |

### 3. Access Tracking with Tenant Context

Design access tracking controls per tenant model:

| Tenant Model | Tracking Method | Isolation | Query Pattern |
|--------------|-----------------|-----------|---------------|
| row-level-security | `tenant_id` in every query | RLS policy | `WHERE tenant_id = current_tenant()` |
| schema-per-tenant | Schema prefix in logs | Schema isolation | Per-schema audit tables |
| database-per-tenant | Separate audit databases | Full isolation | Per-database retention |

**Access Tracking Events:**

| Access Type | Tracking Detail | Alert Trigger |
|-------------|-----------------|---------------|
| Normal read | Log resource, fields accessed | None |
| Bulk export | Log count, filters, destination | > 1000 records |
| Cross-tenant attempt | Log attempt, block action | Immediate alert |
| Privileged access | Log justification, approval | All access |
| After-hours access | Log time, location | Outside business hours |

### 4. Change Management Documentation

Design change management audit trail:

| Change Type | Documentation Required | Approval Level | Audit Trail |
|-------------|------------------------|----------------|-------------|
| Code deployment | Change ticket, test results, rollback plan | Tech lead | CI/CD logs, deployment manifest |
| Schema migration | Migration script, data impact, rollback | DBA + Tech lead | Migration log, before/after |
| Configuration change | Change request, impact assessment | Admin | Config diff, approval record |
| Permission change | Access request, justification | Manager + Security | RBAC audit log |
| Tenant provisioning | Onboarding checklist, contract | Sales + Legal | Provisioning audit trail |
| Security exception | Risk assessment, compensating controls | CISO | Exception register |

### 5. Evidence Collection Automation

Design automated evidence collection for audits:

| Evidence Type | Collection Method | Frequency | Storage |
|---------------|-------------------|-----------|---------|
| Access reviews | Automated RBAC report | Quarterly | Evidence repository |
| Vulnerability scans | Scheduled scanner output | Weekly | Security dashboard |
| Penetration test | Third-party report import | Annual | Evidence repository |
| Configuration baseline | Infrastructure as Code diff | Daily | Git + compliance tool |
| Incident reports | Ticket export with resolution | Per incident | Evidence repository |
| Training records | LMS export | Per completion | HR system + compliance |
| Audit logs | Continuous streaming | Real-time | SIEM + archive |

**Evidence Repository Structure:**

| Framework | Evidence Categories | Automated Collection |
|-----------|---------------------|----------------------|
| SOC2 | CC1-CC9, Availability, Confidentiality | 85% automated |
| GDPR | Art. 5-6 compliance, DPIAs, consent records | 70% automated |
| HIPAA | Administrative, Technical, Physical safeguards | 75% automated |
| PCI-DSS | Requirements 1-12 evidence | 80% automated |

---

## COLLABORATION MENUS (A/P/C):

After designing audit controls, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific audit requirements
- **P (Party Mode)**: Bring audit and compliance perspectives
- **C (Continue)**: Proceed to compliance monitoring design
- **[Specific topic]**: Focus on logging, evidence, or change management

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: audit categories, evidence requirements, framework mappings
- Process enhanced insights on audit gaps
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review audit control design for multi-tenant compliance"
- Present synthesized recommendations from auditor, security architect, compliance officer
- Return to A/P/C menu

#### If 'C' (Continue):
- Document audit control decisions
- Update frontmatter `stepsCompleted: [1, 2, 3]`
- Proceed to next step: `step-04-c-document.md`

---

## Verification

- [ ] Audit event categories defined with framework mapping
- [ ] Audit log schema includes tenant context
- [ ] Access tracking controls designed per tenant model
- [ ] Change management documentation requirements specified
- [ ] Evidence collection automation designed
- [ ] Immutability requirements addressed
- [ ] Web research citations documented
- [ ] Patterns align with pattern registry

---

## Outputs

- Audit event category matrix with framework mapping
- Audit log schema specification
- Access tracking control design
- Change management audit requirements
- Evidence collection automation specifications

---


---

## SUCCESS METRICS:

- [ ] All required inputs gathered from user
- [ ] Design decisions documented with rationale
- [ ] User confirmed choices via A/P/C menu
- [ ] Output artifact updated with step content
- [ ] Frontmatter stepsCompleted updated

## FAILURE MODES:

- **Missing input:** Cannot proceed without required context - return to prerequisites
- **Unclear requirements:** Use Advanced Elicitation (A) to clarify
- **Conflicting constraints:** Use Party Mode (P) for multi-perspective analysis
- **User rejects output:** Iterate on design, do not force acceptance

## Next Step

Proceed to `step-04-c-document.md` for compliance monitoring design.
