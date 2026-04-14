# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report documenting the penetration testing design validation results, findings, and recommendations.

---

## Prerequisites

- Step 21 completed: Validation checks executed with scores

---

## Actions

### 1. Generate Executive Summary

| Metric | Value |
|--------|-------|
| Validation Date | {date} |
| Overall Score | {score}/100 |
| Pass/Fail Status | **{status}** |
| Critical Gaps | {count} |
| Recommendations | {count} |

### 2. Document Findings

**Critical Findings:**

| ID | Category | Finding | Remediation |
|----|----------|---------|-------------|
| {id} | {category} | {description} | {action} |

**Recommendations:**

| Priority | Recommendation | Benefit |
|----------|---------------|---------|
| {priority} | {recommendation} | {benefit} |

### 3. QG-I3 Gate Status

| Status | Description |
|--------|-------------|
| **{PASS/CONDITIONAL/FAIL}** | {Summary} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present options and finalize.

---

## Outputs

- Validation report
- QG-I3 gate status
- **Output to:** `{output_folder}/planning-artifacts/security/pentest-validation-report.md`

---

## Verification

- [ ] Executive summary generated
- [ ] Critical findings documented
- [ ] Recommendations provided
- [ ] QG-I3 gate status determined
- [ ] Patterns align with pattern registry

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validation mode complete. Report saved.

**Gate Status: {PASS/CONDITIONAL/FAIL}**
