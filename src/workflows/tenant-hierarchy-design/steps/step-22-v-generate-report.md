# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report for the tenant hierarchy design.

---

## Prerequisites

- Step 21: Validate completed with gate decision

---

## Actions

### 1. Compile Report

Generate validation report with:

**Executive Summary**
- Overall gate decision (PASS/CONDITIONAL/FAIL)
- Key findings summary
- Recommended actions

**Detailed Findings**
- Per-section validation results
- Specific issues found
- Severity classification

**Remediation Plan** (if CONDITIONAL or FAIL)
- Required fixes prioritized
- Estimated effort
- Dependencies

### 2. Quality Gate Contribution

Document contribution to quality gates:
- QG-M2 (Tenant Isolation): Hierarchy isolation assessment
- QG-I2 (Tenant Safety): Cross-hierarchy safety assessment
- QG-P1 (Production): Operational readiness assessment

### 3. Save Report

Output report to:
- `{output_folder}/planning-artifacts/validation/tenant-hierarchy-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete Validate mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: findings, recommendations, remediation plan
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report: {summary of gate decision and recommendations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validate mode complete

---

## Verification

- [ ] Executive summary complete
- [ ] All findings documented
- [ ] Severity levels assigned
- [ ] Remediation plan included (if needed)
- [ ] Quality gate contributions documented
- [ ] Report saved successfully

---

## Outputs

- Comprehensive validation report
- Quality gate contribution summary
- Remediation plan (if applicable)

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Validate Mode Complete

Validation complete. Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Proceed with documented limitations
- **FAIL**: Return to Create/Edit mode
