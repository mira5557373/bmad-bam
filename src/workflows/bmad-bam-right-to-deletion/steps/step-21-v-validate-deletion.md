# Step 21: Validate Deletion Procedures

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- ⏸️ **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion

---

## Purpose

Execute comprehensive validation of the deletion procedure specification against GDPR Article 17 requirements.

## Prerequisites

- Deletion specification loaded (Step 20 complete)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance

---

## Actions

### 1. Validate Request Handling

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Request channels | Accessible | {Pass/Fail} | {Detail} |
| Identity verification | Appropriate | {Pass/Fail} | {Detail} |
| SLA compliance | 30 days max | {Pass/Fail} | {Detail} |

### 2. Validate Data Discovery

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Data inventory | Complete | {Pass/Fail} | {Detail} |
| All systems covered | Comprehensive | {Pass/Fail} | {Detail} |
| Third-party tracking | Documented | {Pass/Fail} | {Detail} |

### 3. Validate Deletion Execution

| Validation Check | Requirement | Status | Finding |
|------------------|-------------|--------|---------|
| Deletion methods | Effective | {Pass/Fail} | {Detail} |
| Exception handling | Documented | {Pass/Fail} | {Detail} |
| Verification | Thorough | {Pass/Fail} | {Detail} |

### 4. Validate Article 17 Compliance

| Article 17 Requirement | Status | Gap |
|------------------------|--------|-----|
| Right to erasure scope | {Pass/Fail} | {Gap} |
| Controller obligations | {Pass/Fail} | {Gap} |
| Third-party notification | {Pass/Fail} | {Gap} |
| Exception handling | {Pass/Fail} | {Gap} |

---

## COLLABORATION MENUS (A/P/C)

### [C] Continue - Workflow Navigation
- **C1**: Continue to Step 22 (Generate Report) - load `step-22-v-generate-report.md`
- **C2**: Switch to Edit Mode - load `step-10-e-load-deletion.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] Request handling validated
- [ ] Data discovery verified
- [ ] Deletion execution assessed
- [ ] Article 17 compliance checked
- [ ] All findings documented

## Outputs

- Validation report
- Gap analysis (if any)
- Recommendations

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate the validation report.
