# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the rate limiting validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Rate limiting design validation performed

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
| Rate Limiting Algorithm | | Algorithm selected, rationale documented |
| Tier Limits | | All tiers with rates, burst, quotas |
| Enforcement Mechanisms | | Gateway, headers, degradation |
| Monitoring | | Metrics, alerts, dashboards |
| Cross-Cutting | | Tenant model, billing alignment |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing algorithm, undefined tiers, incomplete enforcement | Must fix before proceeding |
| WARNING | Specific threshold values TBD, minor documentation gaps | Should address |
| INFO | Performance optimizations, additional monitoring | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | Algorithm selected, tiers configured, enforcement complete, monitoring ready |
| **CONDITIONAL** | Minor gaps (e.g., specific threshold values TBD) - document gaps and proceed |
| **NEEDS REVISION** | Missing algorithm, undefined tiers, or incomplete enforcement |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Algorithm, Tiers, Enforcement, Monitoring)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Remediation timeline (if applicable)
- Next steps recommendation

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

- Validation report document
- Gate decision (PASS/CONDITIONAL/FAIL)
- Configuration gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Rate limiting design complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps with remediation timeline and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing algorithm, tiers, or enforcement mechanisms.

---

## Workflow Complete

Validation mode complete for rate-limiting-design workflow.
