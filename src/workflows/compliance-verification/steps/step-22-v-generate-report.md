# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the compliance verification validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Compliance verification validation performed

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Framework Coverage | | All applicable frameworks identified |
| Control Implementation | | Required controls mapped and evidenced |
| Data Handling Compliance | | Encryption, retention, deletion |
| Access Control Compliance | | RBAC, MFA, least privilege |
| Audit Logging Compliance | | Event coverage, retention, immutability |
| Tenant Isolation Compliance | | Data isolation, cross-tenant prevention |
| Remediation Plan Quality | | Gaps addressed with owners and dates |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing required control, critical compliance gap, audit logging incomplete, data handling violation | Must fix before production deployment |
| HIGH | Significant gaps with approved remediation | Should address before production |
| MEDIUM | Minor compliance documentation gaps | Address within remediation timeline |
| LOW | Enhancement recommendations | Consider for future improvements |
| INFO | Observations and best practice suggestions | No action required |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All required controls implemented, no critical gaps, audit logging verified, data handling compliant, QG-CP1 satisfied |
| **CONDITIONAL** | No critical gaps, high/medium gaps have approved remediation plans with deadlines |
| **NEEDS REVISION** | Critical gaps exist, required controls missing, audit logging incomplete, or data handling violations |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- QG-CP1 gate status with evidence
- Findings by category (Framework, Controls, Data, Access, Audit, Tenant, Remediation)
- Critical failure remediation path (if FAIL)
- Locked categories from previous attempts (if applicable)
- Recovery attempt count
- Next steps recommendation

### 5. Framework Compliance Summary

| Framework | Controls Assessed | Compliant | Gaps | Status |
|-----------|-------------------|-----------|------|--------|
| SOC2 Type II | | | | |
| GDPR | | | | |
| HIPAA | | | | |
| PCI-DSS | | | | |
| ISO 27001 | | | | |
| **Overall** | | | | |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring analyst and architect perspectives for final review
- **C (Continue)**: Finalize report and complete validation workflow
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: validation outcome, findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review compliance validation report: {summary of outcome and recommendations}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete validation workflow

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with all required sections
- [ ] Patterns align with pattern registry

---

## Outputs

- Compliance validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- QG-CP1 gate status with evidence
- Remediation recommendations (if CONDITIONAL or FAIL)
- **Load template:** `{project-root}/_bmad/bam/templates/compliance-framework-template.md`

---

## Next Step

Based on completion status:
- **PASS:** Compliance verification validated, proceed to production deployment or next quality gate.
- **CONDITIONAL:** Document gaps and proceed with noted limitations and approved remediation timeline.
- **NEEDS REVISION:** Return to Create mode for critical issues. For data handling violations, escalate to compliance officer immediately.

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to mandatory course correction
- Contact Compliance Officer for regulatory gap issues
- Contact Security Architect for control implementation issues
- Engage external compliance consultant if needed

---

## Workflow Complete

Validation mode complete for compliance-verification workflow.
