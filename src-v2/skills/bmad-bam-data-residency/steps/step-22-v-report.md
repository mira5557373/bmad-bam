# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report documenting all findings, the gate decision, and remediation recommendations for the data residency design.

---

## Prerequisites

- Step 21 completed: Validation checks run
- Gate decision calculated
- Issues documented

---

## Actions

### 1. Compile Executive Summary

Generate validation summary:

| Summary Element | Value |
|-----------------|-------|
| Document Validated | data-residency-design.md |
| Validation Date | {date} |
| Gate Decision | {PASS/CONDITIONAL/FAIL} |
| Critical Issues | {count} |
| Non-Critical Issues | {count} |
| Compliance Status | {status} |

### 2. Document Validation Results

Compile detailed results by category:

**Compliance Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| GDPR coverage | PASS/FAIL | {notes} |
| Cross-border restrictions | PASS/FAIL | {notes} |
| Data classification | PASS/FAIL | {notes} |
| Compliance zones defined | PASS/FAIL | {notes} |

**Architecture Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Regional databases | PASS/FAIL | {notes} |
| Storage configuration | PASS/FAIL | {notes} |
| Cache affinity | PASS/FAIL | {notes} |
| Event routing | PASS/FAIL | {notes} |

**Cross-Region Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Replication restrictions | PASS/FAIL | {notes} |
| API routing | PASS/FAIL | {notes} |
| Backup policies | PASS/FAIL | {notes} |
| DR strategy | PASS/FAIL | {notes} |

**Tenant Assignment Validation:**

| Check | Result | Notes |
|-------|--------|-------|
| Onboarding workflow | PASS/FAIL | {notes} |
| Migration workflow | PASS/FAIL | {notes} |
| Compliance verification | PASS/FAIL | {notes} |
| Edge configuration | PASS/FAIL | {notes} |

### 3. Document Gate Decision

Present gate outcome with rationale:

| Field | Value |
|-------|-------|
| Gate | Data Residency Design |
| Decision | {PASS/CONDITIONAL/FAIL} |
| Rationale | {explanation} |
| Critical Issues | {list or "None"} |
| Non-Critical Issues | {list or "None"} |

### 4. Generate Remediation Recommendations

For CONDITIONAL or FAIL outcomes:

| Issue | Severity | Remediation | Owner | Timeline |
|-------|----------|-------------|-------|----------|
| {issue} | CRITICAL/HIGH/MEDIUM | {remediation} | {role} | {timeline} |

### 5. Define Next Steps

Based on gate decision:

| Decision | Next Steps |
|----------|------------|
| **PASS** | Proceed to implementation, no further design changes required |
| **CONDITIONAL** | Address documented gaps within timeline, proceed with caveats |
| **FAIL** | Return to Create/Edit mode to address critical issues |

### 6. Save Report

Save to: `{output_folder}/planning-artifacts/validation/data-residency-validation-report.md`

**Report Frontmatter:**

```yaml
---
title: Data Residency Design Validation Report
validated_document: data-residency-design.md
validation_date: {date}
gate_decision: {PASS/CONDITIONAL/FAIL}
critical_issues: {count}
non_critical_issues: {count}
---
```

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation plan
- **P (Party Mode)**: Bring perspectives on next steps from all stakeholders
- **C (Continue)**: Complete validation workflow
- **[Specific concerns]**: Describe concerns to address before completing

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report contents, gate decision, remediation recommendations
- Process enhanced insights
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review data residency validation report and next steps"
- Present synthesized recommendations
- Return to A/P/C menu

#### If 'C' (Continue):
- Mark Validate mode complete

---

## SUCCESS METRICS

- ✅ Executive summary generated with gate decision
- ✅ All compliance validation results documented with evidence
- ✅ All regional architecture results documented
- ✅ Cross-border transfer compliance verified
- ✅ Recommendations provided based on gate outcome
- ✅ Report saved to validation folder
- ✅ Data sovereignty status clearly stated

---

## FAILURE MODES

- ❌ **Report generation failed:** Verify all Step 21 results available
- ❌ **Save failed:** Check output folder permissions
- ❌ **Missing regional evidence:** Cannot generate complete report
- ❌ **Template not found:** Verify BAM installation

---

## Verification

- [ ] Executive summary generated
- [ ] All validation results documented
- [ ] Gate decision documented with rationale
- [ ] Remediation recommendations provided (if applicable)
- [ ] Next steps defined
- [ ] Report saved to correct location

---

## Outputs

- Validation report: `{output_folder}/planning-artifacts/validation/data-residency-validation-report.md`
- Gate decision summary
- Remediation recommendations (if applicable)

---

## Next Step

Validate workflow complete. Proceed based on gate decision:

| Decision | Action |
|----------|--------|
| **PASS** | Proceed to implementation workflows |
| **CONDITIONAL** | Address gaps, then proceed |
| **FAIL** | Return to Create/Edit mode |

---

## Workflow Complete

Validate mode is complete. The validation report includes:
- Executive summary with gate decision
- Detailed validation results by category
- Compliance status assessment
- Remediation recommendations (if needed)
- Clear next steps based on outcome

Based on gate decision:
- **PASS**: Data residency design is approved for implementation
- **CONDITIONAL**: Address documented gaps within the specified timeline, then proceed
- **FAIL**: Return to Create mode (`step-01-c-*`) or Edit mode (`step-10-e-*`) to address critical issues
