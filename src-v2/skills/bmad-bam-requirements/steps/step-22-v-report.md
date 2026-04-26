# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- :stop_sign: **NEVER generate content without user input** - Wait for explicit direction
- :open_book: **CRITICAL: ALWAYS read the complete step file** before taking any action
- :arrows_counterclockwise: **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- :pause_button: **ALWAYS pause after presenting findings** and await user direction
- :dart: **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive QG-PL1 validation report for the requirements analysis document, documenting the gate decision and any required remediation actions.

---

## Prerequisites

- Step 21 completed (Validate)
- Validation findings compiled

---

## Inputs

- Validation findings from Step 21
- QG-PL1 checklist results
- Severity classifications
- Recommendations

---

## Actions

Generate validation report with the following sections:

### Report Structure

```markdown
# Requirements Analysis - QG-PL1 Validation Report

## Document Information
- **Project:** {{project_name}}
- **Artifact:** requirements-analysis.md
- **Validated:** {{date}}
- **Validator:** {{author}}
- **Version Validated:** {{version}}

---

## Executive Summary

| Metric | Value |
|--------|-------|
| **Overall Status** | PASS | CONDITIONAL | FAIL |
| **Weighted Score** | {percentage}% |
| **Critical Issues** | {count} |
| **High Issues** | {count} |
| **Medium Issues** | {count} |
| **Low Issues** | {count} |

### Gate Decision

**QG-PL1 Status:** PASS | CONDITIONAL | FAIL

**Summary:** {One paragraph summary of validation results}

---

## Detailed Results

### 1. Document Completeness (25%)

| Check | Status | Notes |
|-------|--------|-------|
| Executive summary accurate | PASS/FAIL | |
| All sections populated | PASS/FAIL | |
| No placeholder text | PASS/FAIL | |
| Statistics correct | PASS/FAIL | |
| Version current | PASS/FAIL | |

**Category Score:** {n}/5 ({percentage}%)

### 2. Requirements Quality (30%)

| Check | Status | Notes |
|-------|--------|-------|
| Unique IDs | PASS/FAIL | |
| Consistent naming | PASS/FAIL | |
| No duplicates | PASS/FAIL | |
| **Source traceability** | PASS/FAIL | **CRITICAL** |
| Valid source references | PASS/FAIL | |
| Bidirectional trace | PASS/FAIL | |
| Acceptance criteria | PASS/FAIL | |
| Quantifiable NFRs | PASS/FAIL | |
| Success metrics | PASS/FAIL | |
| No ambiguity | PASS/FAIL | |
| Terms defined | PASS/FAIL | |
| Testable | PASS/FAIL | |

**Category Score:** {n}/12 ({percentage}%)

### 3. Multi-Tenant Coverage (20%)

| Check | Status | Notes |
|-------|--------|-------|
| **Isolation requirements** | PASS/FAIL | **CRITICAL** |
| **Isolation model specified** | PASS/FAIL | **CRITICAL** |
| Tier differentiation | PASS/FAIL | |
| Lifecycle requirements | PASS/FAIL | |
| Data residency | PASS/FAIL | |
| Compliance mapping | PASS/FAIL | |

**Category Score:** {n}/6 ({percentage}%)

### 4. AI/Agent Coverage (15%)

| Check | Status | Notes |
|-------|--------|-------|
| **Runtime requirements** | PASS/FAIL | **CRITICAL** |
| **Context propagation** | PASS/FAIL | **CRITICAL** |
| Memory isolation | PASS/FAIL | |
| Safety constraints | PASS/FAIL | |
| Rate limits | PASS/FAIL | |
| Error handling | PASS/FAIL | |

**Category Score:** {n}/6 ({percentage}%)

### 5. Stakeholder Alignment (10%)

| Check | Status | Notes |
|-------|--------|-------|
| Stakeholders identified | PASS/FAIL | |
| Roles documented | PASS/FAIL | |
| Review tracked | PASS/FAIL | |
| Sign-offs obtained | PASS/FAIL | |
| Feedback incorporated | PASS/FAIL | |

**Category Score:** {n}/5 ({percentage}%)

---

## Issues Found

### Critical (Must Fix for PASS)
{List of critical issues that cause gate failure}

### High (Must Address for Unconditional PASS)
{List of high issues that result in CONDITIONAL status}

### Medium (Recommended)
{List of medium issues to address}

### Low (Optional)
{List of low priority improvements}

---

## QG-PL1 Gate Decision

### Status: PASS | CONDITIONAL | FAIL

### Rationale
{Detailed explanation of the gate decision based on:
- Overall weighted score
- Critical check results
- Multi-tenant requirement coverage
- AI/agent requirement coverage}

### Conditions (if CONDITIONAL)
{If CONDITIONAL, list specific items that must be addressed:
- Item 1: {description} - Due: {date}
- Item 2: {description} - Due: {date}}

---

## Recommendations

### Immediate Actions (Required for Gate Passage)
1. {Action item}
2. {Action item}

### Short-Term Improvements
1. {Improvement}
2. {Improvement}

### Long-Term Enhancements
1. {Enhancement}
2. {Enhancement}

---

## Next Steps

### If PASS:
- Proceed to `bmad-bam-create-master-architecture` workflow
- Share requirements with architecture team

### If CONDITIONAL:
- Address listed conditions
- Re-run validation within {timeframe}
- Obtain stakeholder acknowledgment of conditions

### If FAIL:
- Address all critical issues
- Re-run Create mode for affected sections
- Re-run validation after fixes

---

## Appendix: Validation Metadata

| Attribute | Value |
|-----------|-------|
| Validation Date | {{date}} |
| Validator | {{author}} |
| Checklist Version | 1.0 |
| Pattern Registry | bam-patterns.csv |
| Configuration | {tenant_model}, {ai_runtime} |
```

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: QG-PL1 status, findings summary
- Process enhanced insights from deep questioning
- Ask user: "Accept these report additions? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-PL1 validation report for requirements: {summary}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Output to `{output_folder}/planning-artifacts/requirements-validation-report.md`

---

## Verification

- [ ] Report generated with all sections
- [ ] QG-PL1 gate decision documented
- [ ] Issues properly categorized
- [ ] Scores calculated correctly
- [ ] Recommendations prioritized
- [ ] Next steps defined for each outcome

---

## Outputs

- `{output_folder}/planning-artifacts/requirements-validation-report.md`
- Gate decision summary
- Prioritized recommendations
- Next steps based on outcome

---

## Validate Mode Complete

The requirements analysis QG-PL1 validation report has been generated.

### Post-Validation Actions

Based on gate decision:

| Decision | Action |
|----------|--------|
| **PASS** | Proceed to architecture phase |
| **CONDITIONAL** | Address conditions, then proceed |
| **FAIL** | Return to Create/Edit mode, then re-validate |
