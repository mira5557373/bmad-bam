# Step 20: Load Artifacts for Validation (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 🔍 **LOAD QG-P1 checklist** - Required for validation

## EXECUTION PROTOCOLS

- 🎯 Focus: Load production readiness report and QG-P1 checklist
- 💾 Track: `stepsCompleted: [20]` when complete
- 📖 Context: Validate mode verifies existing artifact against criteria
- 🚫 Do NOT: Generate new content; Edit mode handles modifications
- ⚠️ Gate: QG-P1 - Production readiness validation

---

## Purpose

Load the production readiness report and QG-P1 quality gate checklist for formal validation. This step prepares all artifacts needed to execute production readiness validation checks and verify the GO/NO-GO decision is justified.

---

## Prerequisites

- Existing production readiness report to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1.md`

---

## Inputs

- Production readiness report: `{output_folder}/planning-artifacts/production-readiness-report.md`
- QG-P1 checklist from `{project-root}/_bmad/bam/data/checklists/`
- Prerequisite gate reports (QG-F1, QG-M1-M3, QG-I1-I3)

---

## YOUR TASK:

Load all artifacts required for production readiness validation.

---

## Validation Sequence

### 1. Load Production Readiness Report

Load the production readiness report:

```
{output_folder}/planning-artifacts/production-readiness-report.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load QG-P1 Checklist

Load the production readiness checklist:

```
{project-root}/_bmad/bam/data/checklists/qg-p1.md
```

| Checklist | Path | Status |
|-----------|------|--------|
| QG-P1 | `checklists/qg-p1.md` | Loaded/Missing |

### 3. Load Prerequisite Gate Reports

Load all prerequisite gate verification reports:

| Gate | Artifact | Status |
|------|----------|--------|
| QG-F1 | Foundation validation | Loaded/Missing |
| QG-I1 | Convergence report | Loaded/Missing |
| QG-I2 | Tenant safety verification | Loaded/Missing |
| QG-I3 | Agent safety verification | Loaded/Missing |

### 4. Load Supporting Documents

Load context documents for cross-reference:

| Document | Path | Status |
|----------|------|--------|
| Master Architecture | `architecture/master-architecture.md` | Loaded/Missing |
| Convergence Report | `architecture/convergence-report.md` | Loaded/Missing |
| Deployment Runbook | {{path}} | Loaded/Missing |
| Rollback Runbook | {{path}} | Loaded/Missing |

### 5. Display Report Summary

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Assessor | {{author}} |

#### Current Gate Decision

| Attribute | Value |
|-----------|-------|
| QG-P1 Decision | GO / GO WITH CONDITIONS / NO-GO |
| Assessment Date | {{date}} |
| Conditions (if any) | {{list}} |

#### Category Status

| Category | CRITICAL Issues | High Issues | Status |
|----------|-----------------|-------------|--------|
| Infrastructure | {{count}} | {{count}} | {{status}} |
| Observability | {{count}} | {{count}} | {{status}} |
| Security | {{count}} | {{count}} | {{status}} |
| Compliance | {{count}} | {{count}} | {{status}} |

### 6. Identify Validation Scope

Determine which categories to validate:

- [ ] Validate Infrastructure readiness
- [ ] Validate Observability readiness
- [ ] Validate Security/Compliance
- [ ] Validate Prerequisite gate status
- [ ] Validate Runbook completeness
- [ ] Validate Rollback procedures
- [ ] Full re-validation of all categories

Default: Full validation of all QG-P1 criteria

### 7. Prepare Validation Criteria

Extract critical checks from QG-P1 checklist:

#### Infrastructure CRITICAL Checks

- [ ] Database migration strategy documented
- [ ] Rollback procedures tested
- [ ] IaC coverage 100%
- [ ] DR tested within 6 months

#### Observability CRITICAL Checks

- [ ] All SLOs have alerting
- [ ] Distributed tracing with tenant attribution
- [ ] Synthetic monitoring configured
- [ ] Incident escalation paths documented

#### Security CRITICAL Checks

- [ ] No open critical/high pen test findings
- [ ] Secrets in approved vault
- [ ] MFA for all admin access
- [ ] Encryption at rest and in transit

#### Operations CRITICAL Checks

- [ ] Deployment runbook documented
- [ ] Rollback runbook tested
- [ ] On-call rotation configured
- [ ] Incident response plan documented

---

## SUCCESS METRICS:

- [ ] Production readiness report loaded successfully
- [ ] QG-P1 checklist loaded
- [ ] Prerequisite gate reports loaded
- [ ] Supporting documents loaded
- [ ] Validation scope confirmed
- [ ] Ready for validation execution

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Report not found | Run Create mode first |
| Checklist missing | Check BAM installation |
| Prerequisite gate missing | Run missing gate validation |
| Supporting docs missing | Document as validation gap |

---

## Verification

- [ ] Production readiness report loaded correctly
- [ ] QG-P1 checklist available
- [ ] Validation criteria prepared
- [ ] User confirmed validation scope

---

## Outputs

- Loaded production readiness report
- QG-P1 checklist ready
- Validation scope confirmed
- Critical checks identified

---

## NEXT STEP:

Proceed to `step-21-v-validate.md` to execute QG-P1 validation checks.
