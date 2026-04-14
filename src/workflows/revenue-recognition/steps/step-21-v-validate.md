# Step 21: Validate Revenue Recognition Design

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step validates the completeness and ASC 606 compliance of the revenue recognition design.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: compliance

---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules

---

## Actions

### 1. Validate Content

- Check all required sections are present
- Verify ASC 606 five-step model coverage
- Validate against quality gate checklist

### 2. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## Verification

### ASC 606 Step 1: Contract Identification
- [ ] Contract attributes defined
- [ ] Validation criteria meet ASC 606 requirements
- [ ] Multi-element arrangements handled
- [ ] Contract modifications documented

### ASC 606 Step 2: Performance Obligations
- [ ] All services mapped to obligations
- [ ] Distinctness evaluation documented
- [ ] Recognition methods selected

### ASC 606 Steps 3-4: Transaction Price
- [ ] SSP determination methods documented
- [ ] Discount allocation rules defined
- [ ] Variable consideration handled
- [ ] Contract asset/liability tracking configured

### ASC 606 Step 5: Revenue Recognition
- [ ] Recognition timing rules defined
- [ ] Period-end processing documented
- [ ] Catch-up calculations specified
- [ ] Adjustment handling with approvals

### Cross-Cutting
- [ ] Tenant isolation in revenue data
- [ ] Audit trail for compliance
- [ ] Patterns align with pattern registry

## Gate Decision

- **PASS**: ASC 606 five-step model fully implemented
- **CONDITIONAL**: Minor documentation gaps
- **FAIL**: Missing ASC 606 steps or incomplete mapping

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation findings
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept validation and proceed to report
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

---

## Outputs

- Validated revenue recognition design
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- ASC 606 compliance assessment

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate validation report.
