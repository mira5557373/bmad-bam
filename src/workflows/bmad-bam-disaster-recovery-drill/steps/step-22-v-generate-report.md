# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the DR drill validation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: DR drill validation performed

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| DR Plan Execution | | Procedures followed |
| Failover Testing | | Failover successful |
| Recovery Validation | | Data integrity verified |
| RTO/RPO Verification | | Targets met |
| QG-DR1 Compliance | | All patterns verified |

### 2. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All required QG-DR1 patterns verified |
| **CONDITIONAL** | Minor gaps documented |
| **NEEDS REVISION** | Critical pattern failing |

### 3. Generate Report

Create validation report summarizing:
- Validation outcome
- Findings by category
- QG-DR1 pattern status
- Recommendations for improvement

---

## COLLABORATION MENUS (A/P/C):

After generating the report, if 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete validation workflow

---

## Verification

- [ ] All findings documented
- [ ] Completion status determined
- [ ] Report generated

---

## Outputs

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Improvement recommendations

---

## Workflow Complete

Validation mode complete for disaster-recovery-drill workflow.
