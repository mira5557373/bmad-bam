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

Generate a comprehensive validation report summarizing findings from the security assessment validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Security assessment artifact loaded successfully
- Step 21 completed: Validation performed against quality criteria
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`

---


## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component
- Recommendations for remediation (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Scope Assessment | | Components, boundaries, actors |
| Threat Model | | STRIDE, attack trees, risk |
| Tenant Isolation | | Model security, data access |
| AI Safety | | Injection, tools, kill switch |
| Findings Report | | Completeness, accuracy |
| Remediation Roadmap | | Priorities, timelines |
| Cross-Cutting | | Currency, compliance |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks security approval | Must fix before release |
| WARNING | Non-critical gap | Should address before production |
| INFO | Improvement opportunity | Consider for next assessment |

**Critical Failure Examples:**
- Missing threat model for critical boundaries
- Incomplete tenant isolation review
- No AI safety assessment for agent features
- Missing remediation roadmap
- Critical findings without remediation

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All sections complete, critical checks pass, roadmap actionable |
| **CONDITIONAL** | Minor gaps with documented mitigation plan |
| **NEEDS REVISION** | Missing critical components, return to Edit mode |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by component category
- Required actions for each critical/warning item
- Next steps based on outcome

### 5. Security Posture Assessment

Provide overall security posture:

| Area | Rating | Rationale |
|------|--------|-----------|
| Tenant Isolation | Strong/Moderate/Weak | {rationale} |
| AI Safety | Strong/Moderate/Weak | {rationale} |
| Authentication | Strong/Moderate/Weak | {rationale} |
| Data Protection | Strong/Moderate/Weak | {rationale} |
| Overall | Strong/Moderate/Weak | {rationale} |

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation approach
- **P (Party Mode)**: Bring CISO and engineering perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, security posture
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation approach? (y/n)"
- If yes, finalize remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review security assessment validation report and recommend next steps"
- Process CISO and engineering perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow
- Provide gate decision guidance

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Security posture assessed
- [ ] Report generated with actionable recommendations

---

## Outputs

- Security Assessment Validation Report
- Component-level findings summary
- Security posture assessment
- Gate decision documentation
- **Output to:** `{output_folder}/planning-artifacts/security/security-assessment-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Security assessment is ready for stakeholder review.
- **CONDITIONAL:** Document gaps with deadline and proceed with mitigation plan.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load-existing.md`) to address findings.

---

## Workflow Complete

Validation mode complete for security-review workflow.
