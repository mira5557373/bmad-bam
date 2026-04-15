# Step 3: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- BOOK **CRITICAL: ALWAYS read the complete step file** before taking any action
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- TARGET **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action

---

## Purpose

Generate a comprehensive validation report for the encryption design.

## Prerequisites

- Validation completed in Step 21

---

## Actions

### 1. Compile Validation Summary

| Category | Items Checked | Passed | Failed | Status |
|----------|---------------|--------|--------|--------|
| Data Classification | 3 | - | - | - |
| Encryption at Rest | 3 | - | - | - |
| Encryption in Transit | 3 | - | - | - |
| Compliance | 4 | - | - | - |
| **Total** | **13** | - | - | - |

### 2. Document Findings
### 3. Generate Recommendations
### 4. Determine Outcome

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | No Critical/High findings | Proceed |
| **CONDITIONAL** | High findings with mitigation | Proceed with plan |
| **FAIL** | Critical findings | Return to Edit mode |

---

## COLLABORATION MENUS (A/P/C)

### [C]ontinue
- **C1**: Accept validation report
- **C2**: Mark validation complete

---

## Verification

- [ ] Summary compiled
- [ ] Findings documented
- [ ] Outcome determined

## Outputs

- `{output_folder}/planning-artifacts/data-encryption-validation-report.md`

## Next Step

Validation workflow complete.
