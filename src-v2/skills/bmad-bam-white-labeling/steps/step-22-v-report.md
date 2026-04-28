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


## CONTEXT BOUNDARIES:

**IN SCOPE for this step:**
- Loading artifact and checklist
- Evaluating against criteria
- Documenting evidence

**OUT OF SCOPE:**
- Modifying the artifact
- Creating new content
## Purpose

Generate a comprehensive validation report documenting all findings and the quality gate decision for the white-labeling design.

---

## Prerequisites

- Step 21 completed: Validation checks executed
- Gate decision calculated
- **Load template:** `{project-root}/_bmad/bam/data/templates/validation-report.md` (if exists)

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

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All validation results documented by category
- ✅ Critical and non-critical issues classified
- ✅ Remediation plan created with priorities
- ✅ Report saved to validation folder
- ✅ Next steps aligned to gate decision

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing results:** Cannot compile incomplete report
- ❌ **Remediation plan incomplete:** All failures must have remediation guidance

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
