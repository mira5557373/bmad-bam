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

Generate a validation report summarizing findings from the tenant requirements validation.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed against requirements criteria


---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Findings

Organize findings by category:
- Completeness issues
- Consistency issues
- Alignment issues

### 2. Assign Severity

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| Critical | Blocks downstream workflows | Must fix before proceeding |
| Warning | Potential issues | Should address before release |
| Info | Suggestions | Consider for improvement |

### 3. Generate Report

Create validation report with:
- Summary (pass/fail/conditional)
- Detailed findings
- Recommended actions

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into findings and recommendations
- **P (Party Mode)**: Bring QA and PM perspectives for report review
- **C (Continue)**: Complete Validate mode - workflow finished
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: validation results, severity assignments, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these findings? (y/n)"
- If yes, finalize report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for tenant requirements: {summary of findings and status}"
- Process collaborative analysis from QA and PM personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Validate mode complete

---

## Verification

- [ ] All findings documented
- [ ] Severity assigned to each finding
- [ ] Report generated
- [ ] Patterns align with pattern registry

## Outputs

- Validation report
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Output to:** `{output_folder}/planning-artifacts/tenant-requirements-validation-report.md`

## Next Step

This completes the Validate mode. If validation passed, proceed to downstream workflows like `bmad-bam-create-master-architecture`. If validation failed, enter Edit mode via `step-10-e-load-artifact.md` to address critical findings.

## Workflow Complete

Validation complete. Address any critical findings before proceeding to `bmad-bam-create-master-architecture`.
