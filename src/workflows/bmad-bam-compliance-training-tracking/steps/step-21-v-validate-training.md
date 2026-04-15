# Step 21: Validate Training Tracking

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Execute comprehensive validation of the training tracking specification against compliance requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance-training-tracking
---

## Actions

### 1. Validate Framework Coverage

| Framework | Training Required | Specified | Status |
|-----------|-------------------|-----------|--------|
| HIPAA | Security awareness | {Yes/No} | {Pass/Fail} |
| SOC 2 | Security training | {Yes/No} | {Pass/Fail} |
| GDPR | Privacy training | {Yes/No} | {Pass/Fail} |
| PCI DSS | Security awareness | {Yes/No} | {Pass/Fail} |

### 2. Validate Tracking Capabilities

| Capability | Required | Designed | Status |
|------------|----------|----------|--------|
| Completion tracking | Yes | {Yes/No} | {Pass/Fail} |
| Compliance reporting | Yes | {Yes/No} | {Pass/Fail} |
| Audit evidence | Yes | {Yes/No} | {Pass/Fail} |
| Reminder system | Yes | {Yes/No} | {Pass/Fail} |

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
- **C2**: Switch to Edit Mode - load `step-10-e-load-training.md`
- **C3**: Return to workflow overview

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
