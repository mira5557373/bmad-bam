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

Generate a comprehensive validation report summarizing findings from the tenant safety validation steps and determining the workflow completion status for QG-AI2 (AI Safety Gate).

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Tenant safety validation performed

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
| Data Isolation Audit | | All storage layers verified |
| Resource Boundary Tests | | All resource limits enforced |
| AI Context Separation | | All AI/LLM context isolated |
| Cross-Tenant Attack Tests | | All attack vectors blocked |
| Compliance | | Documentation complete |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Isolation gap, context leakage, attack vector not mitigated | Must fix before proceeding |
| WARNING | Minor compliance gaps, documentation pending | Should address |
| INFO | Additional security hardening suggestions | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All isolation verified, all boundaries enforced, AI context separated, all attacks blocked |
| **CONDITIONAL** | Minor gaps (e.g., some compliance docs pending) - document gaps and proceed |
| **NEEDS REVISION** | Any isolation gap, boundary bypass, context leakage, or attack vector not mitigated |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Data Isolation, Resource Boundaries, AI Context, Cross-Tenant, Compliance)
- Critical failure remediation path (if FAIL)
- Locked categories from previous attempts (if applicable)
- Recovery attempt count
- Next steps recommendation

---

## Report Template

```markdown
# Tenant Safety Validation Report

**Date:** {{date}}
**Quality Gate:** QG-AI2 (AI Safety Gate)
**Outcome:** [PASS/CONDITIONAL/FAIL]

## Executive Summary

[Brief summary of validation outcome and key findings]

## Validation Results

### Data Isolation Audit
- **Status:** [Pass/Fail]
- **Findings:** [Details]

### Resource Boundary Tests
- **Status:** [Pass/Fail]
- **Findings:** [Details]

### AI Context Separation
- **Status:** [Pass/Fail]
- **Findings:** [Details]

### Cross-Tenant Attack Tests
- **Status:** [Pass/Fail]
- **Findings:** [Details]

### Compliance
- **Status:** [Pass/Fail]
- **Findings:** [Details]

## QG-AI2 Gate Decision

**Gate Status:** [SATISFIED/NOT SATISFIED]

| Requirement | Status | Evidence |
|-------------|--------|----------|
| data_isolation_verified | | |
| resource_boundaries_enforced | | |
| ai_context_separated | | |
| cross_tenant_attacks_blocked | | |
| compliance_documented | | |

## Recommendations

[List of recommendations based on findings]

## Next Steps

[Based on outcome - proceed to production, address gaps, or remediate critical issues]
```

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
- Context: "Review validation report: {summary of outcome and recommendations}"
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

- Validation report document: `{output_folder}/planning-artifacts/tenant-safety-validation-report.md`
- Gate decision (PASS/CONDITIONAL/FAIL)
- Remediation recommendations (if CONDITIONAL or FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Tenant safety validated (QG-AI2 satisfied), proceed to QG-P1 (Production Readiness).
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode. For AI context leakage issues, escalate to security architect immediately.

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to mandatory course correction
- Contact Security Architect for context leakage or cross-tenant issues
- Contact Platform Architect for isolation design issues

---

## Workflow Complete

Validation mode complete for tenant-safety workflow.
