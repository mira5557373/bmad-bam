# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate final validation report for LLM evaluation pipeline.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Gate decision determined
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: evaluation-patterns

---

## Inputs

- Validation results from Step 21
- Gate decision (PASS/CONDITIONAL/FAIL)
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Generate Report

| Category | Status | Notes |
|----------|--------|-------|
| Metrics | PASS/FAIL | {notes} |
| Benchmarks | PASS/FAIL | {notes} |
| A/B Testing | PASS/FAIL | {notes} |
| Regression | PASS/FAIL | {notes} |
| Human Eval | PASS/FAIL | {notes} |
| **Overall** | **{decision}** | {summary} |

### 2. Document Findings

| ID | Component | Severity | Finding | Remediation |
|----|-----------|----------|---------|-------------|
| F-001 | {component} | {severity} | {description} | {action} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into findings and recommendations
- **P (Party Mode)**: Bring architect perspectives on remediation
- **C (Continue)**: Accept report and complete validation
- **[Specific refinements]**: Describe report adjustments needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Save validation report
- Mark Validate mode complete

---

## Verification

- [ ] Report generated with all categories
- [ ] Findings documented with remediation
- [ ] Gate decision clearly stated
- [ ] Report saved to output location

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/llm-evaluation-validation-report.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/ai-eval-report-template.md`

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validate mode is complete.
