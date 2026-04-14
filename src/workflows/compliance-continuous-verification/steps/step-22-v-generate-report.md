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

Generate a comprehensive validation report documenting all findings and the gate decision.

---

## Prerequisites

- Step 21 completed: Validation checks run
- Gate decision calculated

---

## Actions

### 1. Compile Report

Generate validation report with:
- Executive summary
- Validation checklist results
- Gate decision with rationale
- Remediation recommendations (if applicable)

### 2. Save Report

Save to: `{output_folder}/planning-artifacts/validation/compliance-verification-validation-report.md`

### 3. Present Summary

Display gate outcome:

| Gate | Decision | Notes |
|------|----------|-------|
| Compliance Verification | {PASS/CONDITIONAL/FAIL} | {summary} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring perspectives on next steps
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report contents, gate decision
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance verification validation report"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete

---

## Verification

- [ ] Report generated successfully
- [ ] Report saved to correct location
- [ ] Gate decision documented

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/compliance-verification-validation-report.md`
- Gate decision summary

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Workflow Complete

Validate mode is complete. Based on gate decision:
- **PASS**: Proceed to next workflow
- **CONDITIONAL**: Address documented gaps, then proceed
- **FAIL**: Return to Create/Edit mode to address critical issues
