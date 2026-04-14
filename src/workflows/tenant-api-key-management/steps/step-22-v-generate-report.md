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

Generate a comprehensive validation report for the API key management design.

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
- Security posture assessment

**Detailed Findings**
- Per-section validation results
- Security issues found
- Severity classification

**Remediation Plan** (if CONDITIONAL or FAIL)
- Required fixes prioritized
- Security implications
- Estimated effort

### 2. Quality Gate Contribution

Document contribution to quality gates:
- QG-M2 (Tenant Isolation): Key scoping assessment
- QG-I2 (Tenant Safety): Cross-tenant safety assessment
- QG-P1 (Production): Security readiness assessment

### 3. Save Report

Output report to:
- `{output_folder}/planning-artifacts/validation/api-key-management-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring security perspectives for report review
- **C (Continue)**: Accept report and complete Validate mode
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

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

---

## Next Step

Validate workflow complete. Proceed based on gate decision (PASS/CONDITIONAL/FAIL).

---

## Validate Mode Complete

Validation complete. Based on gate decision:
- **PASS**: Proceed to implementation
- **CONDITIONAL**: Proceed with documented limitations
- **FAIL**: Return to Create/Edit mode
