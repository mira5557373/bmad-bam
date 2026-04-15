# Step 21: Validate Data Retention Policy

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

---

## Purpose

Validate the data retention policy design against GDPR, CCPA, and other compliance requirements.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `data-archival`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `compliance`
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S7`

## Quality Gates

**Primary Gate:** QG-P1 (Production Readiness - Compliance)

**Contributes to:** QG-S7 (Data Protection Gate) - `retention_enforced` pattern

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

---

## Actions

### 1. Validate Retention Policies

| Data Type | Required Retention | Configured | Compliant |
|-----------|-------------------|------------|-----------|
| User PII | Per regulation | | |
| Transaction Data | 7 years | | |
| Audit Logs | Per regulation | | |
| AI Conversations | Per policy | | |

### 2. Validate Archival Rules

| Check | Requirement | Status |
|-------|-------------|--------|
| Archive triggers | Time or event based | |
| Archive storage | Compliant location | |
| Archive encryption | At rest | |
| Archive retrieval | SLA defined | |

### 3. Validate Deletion Procedures

| Check | Requirement | Status |
|-------|-------------|--------|
| Soft delete | Implemented | |
| Hard delete | Scheduled jobs | |
| Cascade deletion | Defined | |
| Deletion audit | Logged | |

---

## Verification

- [ ] Retention periods defined for all data types
- [ ] GDPR Article 17 (Right to Erasure) supported
- [ ] CCPA deletion requirements met
- [ ] Archival procedures documented
- [ ] Deletion automation configured
- [ ] Audit trail for all deletions
- [ ] Tenant-specific retention supported
- [ ] Patterns align with pattern registry

### QG-S7 Contribution Verification
This workflow contributes to QG-S7 `retention_enforced` pattern:

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Retention periods defined per data type | [ ] Pass / [ ] Fail | Retention matrix |
| Archival rules with secure storage | [ ] Pass / [ ] Fail | Archival configuration |
| Deletion procedures with audit | [ ] Pass / [ ] Fail | Deletion workflow |
| Compliance reporting automated | [ ] Pass / [ ] Fail | Compliance dashboards |

**QG-S7 retention_enforced pattern:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All retention policies defined, compliant with regulations
- **CONDITIONAL**: Minor gaps - document and proceed
- **FAIL**: Missing retention policies or compliance gaps - return to Create mode

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to generate report

Select an option:
```

#### If 'C' (Continue):
- Save validation results
- Update frontmatter `stepsCompleted: [20, 21]`
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated data retention policy
- Validation gate decision (PASS/CONDITIONAL/FAIL)

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
