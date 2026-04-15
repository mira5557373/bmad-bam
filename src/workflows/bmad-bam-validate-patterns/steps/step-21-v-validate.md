# Step 21: Re-Validate Patterns

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

### EXECUTION PROTOCOLS

- 🎯 **Output Delivery:** Present outputs clearly with headers
- 💾 **State Persistence:** Update document frontmatter after changes
- 📝 **Documentation:** Record decisions with rationale
- ✅ **Verification:** Confirm completion before proceeding

---

## Purpose

Re-run all pattern validations and compare to previous results.

---

## Prerequisites

- Step 20 completed: Artifact loaded
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the validation artifact from `{output_folder}/planning-artifacts/pattern-validation-report.md`
- Parse and validate structure

### 2. Validate Content

Execute all validation checks from Create mode steps:
- Structure validation
- Dependency validation
- Query validation
- Cross-reference validation

### 3. Generate Findings

Compare new findings with previous report:

| Finding | Previous Status | Current Status | Change |
|---------|-----------------|----------------|--------|
| {issue} | {status}        | {status}       | {change} |

---

## COLLABORATION MENUS (A/P/C):

After re-validation:

```
Your options:
- **C (Continue)**: Generate updated report

Select an option:
```

---

## PROTOCOL INTEGRATION

### A/P/C Handler
- **[A] Response:** Deep-dive into requested topic, then return to current step
- **[P] Response:** Acknowledge party mode, continue with enhanced engagement
- **[C] Response:** Proceed to next logical step in workflow

---

## Verification

- [ ] Artifact loaded and parsed
- [ ] All validation checks re-executed
- [ ] Findings compared with previous results
- [ ] Status changes documented

---

## Outputs

- Re-validation results
- Comparison findings
- Status change summary

---

## Next Step

Proceed to `step-22-v-generate-report.md` to generate comparison report.
