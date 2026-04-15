# Step 21: Validate PIA/DPIA

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Execute comprehensive validation of the PIA/DPIA specification against GDPR Article 35 requirements.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: privacy-impact-assessment
---

## Actions

### 1. Validate Article 35 Requirements

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Processing description | Systematic description | {Pass/Fail} | {Detail} |
| Necessity assessment | Purpose justification | {Pass/Fail} | {Detail} |
| Proportionality | Minimization check | {Pass/Fail} | {Detail} |
| Risk assessment | Rights and freedoms | {Pass/Fail} | {Detail} |
| Mitigation measures | Risk reduction | {Pass/Fail} | {Detail} |

### 2. Validate DPIA Completeness

| Section | Present | Adequate |
|---------|---------|----------|
| Processing purposes | {Yes/No} | {Yes/No} |
| Data categories | {Yes/No} | {Yes/No} |
| Necessity/proportionality | {Yes/No} | {Yes/No} |
| Risk assessment | {Yes/No} | {Yes/No} |
| Safeguards/measures | {Yes/No} | {Yes/No} |

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
- **C2**: Switch to Edit Mode - load `step-10-e-load-pia.md`
- **C3**: Return to workflow overview

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
