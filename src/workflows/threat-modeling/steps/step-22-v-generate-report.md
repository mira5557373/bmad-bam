# Step 3: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- CYCLE **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- MEMO Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report for the threat model.

## Prerequisites

- Validation completed in Step 21
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security

---

## Actions

### 1. Compile Validation Summary

| Category | Items Checked | Passed | Failed | Status |
|----------|---------------|--------|--------|--------|
| Attack Surface | 4 | - | - | - |
| STRIDE | 6 | - | - | - |
| Mitigations | 3 | - | - | - |
| Risk Register | 3 | - | - | - |
| **Total** | **16** | - | - | - |

### 2. Document Findings by Severity

### 3. Generate Recommendations

### 4. Determine Validation Outcome

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | No Critical/High findings | Proceed |
| **CONDITIONAL** | High findings with mitigation | Proceed with plan |
| **FAIL** | Critical findings | Return to Edit mode |

---

## COLLABORATION MENUS (A/P/C)

### Menu Options

### [A]nalyze Options
- **A1**: Review validation summary
- **A2**: Analyze findings severity

### [P]ropose Changes
- **P1**: Propose findings reclassification
- **P2**: Suggest additional recommendations

### [C]ontinue
- **C1**: Accept validation report
- **C2**: Mark validation complete

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Validation summary compiled
- [ ] Findings categorized
- [ ] Recommendations prioritized
- [ ] Outcome determined

## Outputs

- `{output_folder}/planning-artifacts/threat-model-validation-report.md`

## Next Step

Validation workflow complete.
