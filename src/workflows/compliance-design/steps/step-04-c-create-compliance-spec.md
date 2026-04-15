# Step 4: Create Compliance Specification Document

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array
- 🔍 Use web search to verify current best practices when making technology decisions
- 📎 Reference pattern registry `web_queries` for search topics


---

## Purpose

Generate the comprehensive compliance specification document that consolidates all compliance design decisions into a single authoritative reference.

## Prerequisites

- Compliance frameworks identified
- Audit logging architecture designed
- Controls mapped to frameworks
- **Load template:** `{project-root}/_bmad/bam/data/templates/compliance-checklist-template.md`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance


---

## Inputs

- Output from previous step(s) in this workflow
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`
- Relevant templates from `{project-root}/_bmad/bam/data/templates/`
- User feedback and refinements from previous steps

---

## Actions

### 1. Compile Framework Requirements Summary

Document summary of each applicable framework:

| Framework | Version | Scope | Key Requirements | Certification Target |
|-----------|---------|-------|------------------|---------------------|
| SOC 2 Type II | 2017 TSC | Platform operations | CC1-CC9, A1, C1, PI1 | {Target date} |
| GDPR | 2016/679 | EU personal data | Art. 5-49, 77-84 | Ongoing |
| HIPAA | 45 CFR 160-164 | PHI processing | Security/Privacy Rules | {Target date} |

### 2. Document Audit Logging Implementation

Create audit logging implementation guide:

#### Event Schema Specification

```yaml
audit_event_schema:
  version: "1.0"
  fields:
    id:
      type: uuid
      required: true
    timestamp:
      type: datetime
      format: ISO8601
      timezone: UTC
      required: true
    tenant_id:
      type: string
      required: true
    actor:
      type: object
      properties:
        type: enum[user, service, system, agent]
        id: string
        name: string
        roles: array[string]
    action:
      type: object
      properties:
        type: string
        category: enum[authentication, authorization, data_access, ...]
        outcome: enum[success, failure, partial]
    resource:
      type: object
      properties:
        type: string
        id: string
        attributes: object
```

#### Logging Infrastructure Requirements

| Component | Technology | Purpose |
|-----------|------------|---------|
| Event Ingestion | Message queue (Kafka/SQS) | Reliable event capture |
| Storage (Hot) | Immutable append-only store | Real-time querying |
| Storage (Cold) | Object storage with WORM | Long-term retention |
| Search | Full-text search engine | Compliance investigations |
| Alerting | SIEM integration | Real-time monitoring |

### 3. Generate Control Matrix Document

Using the template structure, populate the control matrix:

#### Control Summary by Domain

| Domain | Total Controls | Compliant | Partial | Non-Compliant | Gap Items |
|--------|----------------|-----------|---------|---------------|-----------|
| Access Control | {count} | {count} | {count} | {count} | {count} |
| Data Protection | {count} | {count} | {count} | {count} | {count} |
| Audit & Accountability | {count} | {count} | {count} | {count} | {count} |
| Incident Response | {count} | {count} | {count} | {count} | {count} |

### 4. Define Retention Policy Document

Document formal retention policies:

| Policy ID | Name | Categories | Hot Retention | Cold Retention | Deletion |
|-----------|------|------------|---------------|----------------|----------|
| RET-001 | Security Events | authentication, authorization, security | 90 days | 7 years | Secure wipe |
| RET-002 | Data Access | data_access, data_modification | 90 days | 7 years | Secure wipe |
| RET-003 | Administrative | administrative, configuration | 30 days | 7 years | Secure wipe |
| RET-004 | Billing | billing | 90 days | 7 years | Archive |

### 5. Design Compliance Monitoring Dashboard

Define dashboard requirements:

| Dashboard | Purpose | Key Metrics | Refresh |
|-----------|---------|-------------|---------|
| Compliance Overview | Executive summary | Overall compliance %, critical gaps | Daily |
| Control Status | Control health | Per-control compliance status | Real-time |
| Audit Log Health | Log integrity | Event volume, processing lag, errors | Real-time |
| Evidence Collection | Evidence status | Collection status, expiring evidence | Daily |
| Remediation Tracking | Gap resolution | Open items, SLA compliance, trends | Daily |

### 6. Document Remediation Tracking Procedures

Define remediation workflow:

| Severity | Response SLA | Escalation Path | Review Cadence |
|----------|--------------|-----------------|----------------|
| Critical | 7 days | Security Lead → CISO → CEO | Daily |
| High | 30 days | Control Owner → Security Lead → CISO | Weekly |
| Medium | 90 days | Control Owner → Security Lead | Bi-weekly |
| Low | 180 days | Control Owner | Monthly |

### 7. Generate Compliance Specification Document

Compile all sections into `compliance-spec.md` at `{output_folder}/planning-artifacts/compliance-spec.md`:

1. Executive Summary
2. Framework Requirements Overview
3. Audit Logging Architecture
4. Control Inventory and Mapping
5. Evidence Collection Procedures
6. Retention Policy Definitions
7. Compliance Monitoring Requirements
8. Remediation Tracking Procedures
9. Appendices (schemas, templates, checklists)

**Verify current best practices with web search:**
Search the web: "create compliance specification document best practices {date}"
Search the web: "create compliance specification document enterprise SaaS {date}"

_Source: [URL]_

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A] Analyse - Compliance Spec Analysis
- **A1**: Analyze specification completeness against SOC 2 Type II requirements
- **A2**: Evaluate HIPAA BAA and compliance documentation alignment
- **A3**: Assess GDPR Data Protection Impact Assessment (DPIA) coverage
- **A4**: Review multi-tenant compliance isolation in specification

### [P] Propose - Specification Recommendations
- **P1**: Propose compliance specification structure optimizations
- **P2**: Suggest automated evidence collection implementations
- **P3**: Recommend compliance monitoring alert thresholds
- **P4**: Propose certification audit preparation timeline

### [C] Continue - Workflow Navigation
- **C1**: Continue to Edit Mode - load `step-10-e-load-compliance.md`
- **C2**: Continue to Validate Mode - load `step-20-v-load-compliance.md`
- **C3**: Export compliance specification document

---

## Verification

- [ ] Framework requirements documented
- [ ] Audit logging implementation specified
- [ ] Control matrix complete
- [ ] Retention policies defined
- [ ] Monitoring dashboards specified
- [ ] Remediation procedures documented
- [ ] Compliance specification generated
- [ ] Patterns align with pattern registry

## Outputs

- `{output_folder}/planning-artifacts/compliance-spec.md` - Main compliance specification
- Audit event schema definition
- Control mapping matrix
- Evidence collection procedures
- Retention policy document
- Dashboard specifications
- **Load template:** `{project-root}/_bmad/bam/data/templates/module-compliance-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ccpa-compliance-template.md`

## Quality Gate Summary

### Compliance Design Complete
- [ ] All applicable frameworks identified and documented
- [ ] Audit logging architecture satisfies all framework requirements
- [ ] Every control mapped to framework requirements
- [ ] Evidence collection procedures operational
- [ ] Retention policies comply with longest requirement
- [ ] Compliance monitoring configured and tested

## Next Steps

With the compliance specification complete:
- Implement audit logging per specification
- Configure evidence collection automation
- Build compliance monitoring dashboards
- Establish remediation tracking workflow
- Schedule initial compliance assessment
