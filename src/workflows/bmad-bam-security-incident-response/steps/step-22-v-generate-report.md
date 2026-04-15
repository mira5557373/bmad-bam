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

Generate a comprehensive validation report summarizing findings, recommendations, and compliance status for the incident response plan.

## Prerequisites

- Validation completed in Step 21
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: security


---

## Inputs

- Validation results from Step 21
- Quality gate checklist
- Pattern registry

---

## Actions

### 1. Compile Validation Summary

| Category | Items Checked | Passed | Failed | Status |
|----------|---------------|--------|--------|--------|
| Classification | 4 | - | - | - |
| Response Procedures | 4 | - | - | - |
| Notification | 4 | - | - | - |
| Compliance | 4 | - | - | - |
| **Total** | **16** | - | - | - |

### 2. Document Findings by Severity

| Severity | Count | Description |
|----------|-------|-------------|
| Critical | - | Blocking issues |
| High | - | Significant gaps |
| Medium | - | Improvements recommended |
| Low | - | Minor enhancements |

### 3. Generate Recommendations

| Priority | Recommendation | Effort | Impact |
|----------|----------------|--------|--------|
| P1 | - | - | - |
| P2 | - | - | - |
| P3 | - | - | - |

### 4. Determine Validation Outcome

| Outcome | Criteria | Action |
|---------|----------|--------|
| **PASS** | No Critical/High findings | Proceed |
| **CONDITIONAL** | High findings with mitigation | Proceed with plan |
| **FAIL** | Critical findings | Return to Edit mode |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A]nalyze Options
- **A1**: Review validation summary accuracy
- **A2**: Analyze findings severity appropriateness
- **A3**: Evaluate recommendation prioritization
- **A4**: Assess validation outcome determination

### [P]ropose Changes
- **P1**: Propose findings reclassification
- **P2**: Suggest additional recommendations
- **P3**: Recommend outcome adjustment
- **P4**: Propose remediation timeline

### [C]ontinue
- **C1**: Accept validation report and finalize
- **C2**: Mark validation complete and output report

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Validation summary compiled
- [ ] Findings categorized by severity
- [ ] Recommendations prioritized
- [ ] Validation outcome determined
- [ ] Report ready for distribution

## Outputs

- `{output_folder}/planning-artifacts/security-incident-response-validation-report.md`

## Next Step

Validation workflow complete. Output validation report to designated location.
