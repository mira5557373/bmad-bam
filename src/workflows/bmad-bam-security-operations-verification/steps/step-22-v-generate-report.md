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

Generate a comprehensive validation report summarizing findings from the security operations verification validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifacts loaded successfully
- Step 21 completed: Security operations validation performed

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
| Security Monitoring | | Event coverage, SIEM integration, dashboards, alerts |
| Incident Response | | IR plan, tabletop exercises, response times, tools |
| Threat Detection | | Traditional threats, AI-specific threats, behavioral, intel |
| Security Controls | | Preventive, detective, corrective, effectiveness |
| AI-Specific Security | | Guardrails, audit logging, prompt injection detection |
| QG-S4 Compliance | | Gate criteria satisfaction |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing critical monitoring, untested IR, undetected threat vectors, controls below 90% | Must fix before proceeding |
| WARNING | Minor coverage gaps, partial testing, some controls need improvement | Should address |
| INFO | Enhancement suggestions, optimization opportunities | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All security operations verified, monitoring complete (100% critical events), IR tested, threat detection validated, controls >90% effective |
| **CONDITIONAL** | Minor gaps with documented remediation plan and timeline |
| **NEEDS REVISION** | Missing critical monitoring, untested IR, threat detection gaps, or controls below threshold |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Monitoring, IR, Threat Detection, Controls, AI-Specific, QG-S4)
- Critical failure remediation path (if FAIL)
- Locked categories from previous attempts (if applicable)
- Recovery attempt count
- Next steps recommendation

---

## Report Template

```markdown
# Security Operations Verification - Validation Report

**Date:** {{date}}
**Validator:** {{validator}}
**Gate:** QG-S4 Security Gate

## Executive Summary

[Overall validation outcome and key findings]

## Gate Decision: [PASS / CONDITIONAL / FAIL]

## Validation Results by Category

### Security Monitoring
| Check | Status | Evidence |
|-------|--------|----------|
| ... | ... | ... |

### Incident Response
| Check | Status | Evidence |
|-------|--------|----------|
| ... | ... | ... |

### Threat Detection
| Check | Status | Evidence |
|-------|--------|----------|
| ... | ... | ... |

### Security Controls
| Check | Status | Evidence |
|-------|--------|----------|
| ... | ... | ... |

### AI-Specific Security
| Check | Status | Evidence |
|-------|--------|----------|
| ... | ... | ... |

## Findings Summary

| Severity | Count | Categories Affected |
|----------|-------|---------------------|
| CRITICAL | | |
| WARNING | | |
| INFO | | |

## Remediation Plan (if applicable)

| Finding | Severity | Remediation | Owner | Due Date |
|---------|----------|-------------|-------|----------|
| ... | ... | ... | ... | ... |

## Recommendations

[Prioritized recommendations for security operations improvement]

## Next Steps

[Based on gate decision]
```

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring security and operations perspectives for final review
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
- Process collaborative analysis from security and operations personas
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

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Remediation recommendations (if CONDITIONAL or FAIL)
- **Save report to:** `{output_folder}/security/security-operations-validation-report.md`

---

## Next Step

Based on completion status:
- **PASS:** Security operations verified, proceed to production readiness (`bmad-bam-production-readiness`).
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode. Address critical security operations gaps before re-validation.

---

## Recovery Protocol

If FAIL persists after 2 attempts:
- Escalate to mandatory course correction
- Contact Security Architect for security operations design issues
- Contact SecOps Lead for operational readiness issues

---

## Workflow Complete

Validation mode complete for security-operations-verification workflow.
