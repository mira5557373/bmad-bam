# Step 21: Validate Audit Readiness

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Execute comprehensive validation of the audit readiness specification against readiness criteria.

## Prerequisites

- Audit specification loaded (Step 20 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Validate Evidence Coverage

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Evidence inventory | Complete | {Pass/Fail} | {Detail} |
| Source documentation | Identified | {Pass/Fail} | {Detail} |
| Quality criteria | Defined | {Pass/Fail} | {Detail} |

### 2. Validate Collection Procedures

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Automated collection | Documented | {Pass/Fail} | {Detail} |
| Manual procedures | Runbooks exist | {Pass/Fail} | {Detail} |
| Chain of custody | Established | {Pass/Fail} | {Detail} |

### 3. Validate Testing Plan

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Testing methodology | Defined | {Pass/Fail} | {Detail} |
| Sample selection | Documented | {Pass/Fail} | {Detail} |
| Exception handling | Process exists | {Pass/Fail} | {Detail} |

---

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Verification

- [ ] All validation checks completed
- [ ] Gap analysis performed
- [ ] Recommendations documented
- [ ] No critical issues found

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-audit.md`
- **C3**: Return to workflow overview

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
