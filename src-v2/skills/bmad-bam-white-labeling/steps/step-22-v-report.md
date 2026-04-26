# Step 22: Generate Validation Report (Validate Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 **Focus:** Generate comprehensive validation report with gate decision and remediation plan
- 💾 **Track:** `stepsCompleted: [20, 21, 22]` when complete
- 📖 **Context:** Step 21 completed checks - compile results into formal report
- 🚫 **Do NOT:** Change gate decision without documented rationale or skip remediation plan for failures
- 🔍 **Use web search:** Not applicable for Validate mode - document findings only

---

## Purpose

Generate a comprehensive validation report documenting all findings and the quality gate decision for the white-labeling design.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Gate decision calculated
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report-template.md` (if exists)

---

## Actions

### 1. Compile Executive Summary

Generate executive summary:

| Attribute | Value |
|-----------|-------|
| Artifact | White-Labeling Design |
| Version | {version} |
| Validation Date | {date} |
| Gate Decision | **{PASS/CONDITIONAL/FAIL}** |
| Critical Issues | {count} |
| Non-Critical Issues | {count} |

### 2. Document Validation Results by Category

#### Branding Customization

| Check | Status | Severity | Notes |
|-------|--------|----------|-------|
| {check_name} | {PASS/FAIL} | {Critical/Non-Critical} | {notes} |

**Category Summary:** {pass_count}/{total_count} passed

#### Domain Customization

| Check | Status | Severity | Notes |
|-------|--------|----------|-------|
| {check_name} | {PASS/FAIL} | {Critical/Non-Critical} | {notes} |

**Category Summary:** {pass_count}/{total_count} passed

#### Feature Customization

| Check | Status | Severity | Notes |
|-------|--------|----------|-------|
| {check_name} | {PASS/FAIL} | {Critical/Non-Critical} | {notes} |

**Category Summary:** {pass_count}/{total_count} passed

#### Security Considerations

| Check | Status | Severity | Notes |
|-------|--------|----------|-------|
| {check_name} | {PASS/FAIL} | {Critical/Non-Critical} | {notes} |

**Category Summary:** {pass_count}/{total_count} passed

### 3. Document Gate Decision

| Gate | Decision | Rationale |
|------|----------|-----------|
| White-Labeling Quality Gate | **{PASS/CONDITIONAL/FAIL}** | {summary rationale} |

Decision criteria applied:

| Criterion | Result |
|-----------|--------|
| All critical checks passed | {Yes/No} |
| Security requirements met | {Yes/No} |
| Tier alignment complete | {Yes/No} |
| Implementation feasible | {Yes/No} |

### 4. Generate Remediation Plan (If Applicable)

For CONDITIONAL or FAIL outcomes:

| Issue | Severity | Remediation | Owner | Deadline |
|-------|----------|-------------|-------|----------|
| {issue} | {Critical/Non-Critical} | {remediation steps} | {owner} | {date} |

Remediation priority order:
1. Critical security issues (immediate)
2. Critical design gaps (before implementation)
3. Non-critical improvements (can be deferred)

### 5. Document Next Steps

| Gate Decision | Next Steps |
|---------------|------------|
| **PASS** | Proceed to implementation planning |
| **CONDITIONAL** | Complete remediation items, then proceed |
| **FAIL** | Return to Create/Edit mode, address critical issues |

### 6. Save Validation Report

Save to: `{output_folder}/planning-artifacts/validation/white-labeling-validation-report.md`

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation details
- **P (Party Mode)**: Bring perspectives on next steps and priorities
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns to address

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, remediation plan
- Process enhanced insights on prioritization
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review white-labeling validation report and determine next steps"
- Present synthesized recommendations from multiple perspectives
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter: `stepsCompleted: [20, 21, 22]`
- Validate mode complete

---

## Verification

- [ ] Executive summary generated
- [ ] All validation results documented
- [ ] Gate decision recorded with rationale
- [ ] Remediation plan created (if applicable)
- [ ] Next steps documented
- [ ] Report saved to correct location

---

## Outputs

- **Primary output:** `{output_folder}/planning-artifacts/validation/white-labeling-validation-report.md`
- Executive summary with gate decision
- Detailed validation results by category
- Remediation plan (if CONDITIONAL or FAIL)
- Next steps guidance

---

## Next Step

Validation complete. Based on gate decision:
- **PASS:** Proceed to implementation planning workflows
- **CONDITIONAL:** Complete remediation, then re-validate
- **FAIL:** Return to Create or Edit mode to address critical issues
