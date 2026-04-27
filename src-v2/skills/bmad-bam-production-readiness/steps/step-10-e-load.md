# Step 10: Load Existing Production Readiness Report (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- 📋 **VERIFY artifact exists** before proceeding to modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Load existing production readiness report for modification
- 💾 Track: `stepsCompleted: [10]` when complete
- 📖 Context: Edit mode modifies existing artifact without full recreation
- 🚫 Do NOT: Generate new content; load existing content for editing

---

## Purpose

Load the existing production readiness report for targeted modifications. Edit mode allows updating specific sections, refreshing assessment dates, adding new findings, or modifying the GO/NO-GO decision without recreating the entire assessment from scratch.

---

## Prerequisites

- Existing production readiness report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: production
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-p1.md`

---

## Inputs

- Existing artifact: `{output_folder}/planning-artifacts/production-readiness-report.md`
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Load the existing production readiness report and identify modification scope.

---

## Load Sequence

### 1. Load Production Readiness Report

Load the existing report:

```
{output_folder}/planning-artifacts/production-readiness-report.md
```

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Load Context Documents

Also load for reference:
- Production readiness checklist: `{project-root}/_bmad/bam/data/checklists/qg-p1.md`
- Convergence report: `{output_folder}/planning-artifacts/architecture/convergence-report.md`
- Master architecture: `{output_folder}/planning-artifacts/architecture/master-architecture.md`

### 3. Parse and Display Summary

Extract and present current state:

#### 3.1 Current Gate Decision

| Attribute | Value |
|-----------|-------|
| QG-P1 Decision | GO / GO WITH CONDITIONS / NO-GO |
| Assessment Date | {{date}} |
| Assessor | {{author}} |
| Environment | {{environment}} |

#### 3.2 Category Status Summary

| Category | CRITICAL | HIGH | MEDIUM | Status |
|----------|----------|------|--------|--------|
| Infrastructure | {{count}} | {{count}} | {{count}} | {{status}} |
| Observability | {{count}} | {{count}} | {{count}} | {{status}} |
| Security | {{count}} | {{count}} | {{count}} | {{status}} |
| Compliance | {{count}} | {{count}} | {{count}} | {{status}} |

#### 3.3 Conditions (if applicable)

| Condition | Deadline | Status |
|-----------|----------|--------|
| {{condition}} | {{date}} | Open/Resolved |

#### 3.4 Document Metadata

| Attribute | Value |
|-----------|-------|
| Document Path | {{path}} |
| Version | {{version}} |
| Last Modified | {{date}} |
| Author | {{author}} |

### 4. Identify Modification Scope

Ask the user which sections need modification:

- [ ] Update infrastructure findings
- [ ] Update observability findings
- [ ] Update security/compliance findings
- [ ] Add new risks
- [ ] Update risk mitigations
- [ ] Modify GO/NO-GO decision
- [ ] Update conditions/deadlines
- [ ] Refresh assessment date
- [ ] Update rollback procedures
- [ ] Add/modify runbook references

Capture the specific changes requested before proceeding.

### 5. Validate Current State

Before editing, verify:

| Check | Status |
|-------|--------|
| Report format valid | YES/NO |
| All sections present | YES/NO |
| Gate decision documented | YES/NO |
| Risk assessment exists | YES/NO |
| Rollback procedures documented | YES/NO |

### 6. Check for Stale Data

Identify sections that may need refresh:

| Section | Last Updated | Age | Refresh Needed |
|---------|--------------|-----|----------------|
| Infrastructure | {{date}} | {{days}} days | YES/NO |
| Observability | {{date}} | {{days}} days | YES/NO |
| Security | {{date}} | {{days}} days | YES/NO |
| Compliance | {{date}} | {{days}} days | YES/NO |
| Risk Assessment | {{date}} | {{days}} days | YES/NO |

**Note:** Sections older than 30 days should be flagged for review.

---

## SUCCESS METRICS:

- [ ] Production readiness report loaded successfully
- [ ] Current gate decision extracted
- [ ] Category statuses summarized
- [ ] Modification scope identified
- [ ] User confirmed changes to make

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Report not found | Switch to Create mode |
| Report format invalid | Regenerate from template |
| Missing sections | Add missing sections during edit |
| Stale data detected | Flag for re-assessment |

---

## Verification

- [ ] Production readiness report loaded correctly
- [ ] Summary accurately reflects current state
- [ ] Modification scope clearly identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current production readiness report
- Current gate decision
- Confirmed modification scope from user

---

## NEXT STEP:

Proceed to `step-11-e-apply.md` with confirmed modification scope.
