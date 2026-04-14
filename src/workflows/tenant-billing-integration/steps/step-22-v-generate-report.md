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

Generate a comprehensive validation report summarizing findings from the billing integration validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Billing integration validation performed

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
| Billing Requirements | | Provider selected, compliance documented |
| Pricing Models | | All tiers defined, overage pricing set |
| Usage Tracking | | Metrics mapped, quota integration configured |
| Invoice Generation | | Structure defined, delivery channels set |
| Payment Processing | | Retry logic, dunning workflow complete |
| Subscription Management | | Lifecycle states, operations documented |
| Tier Changes | | Upgrade/downgrade with proration |
| Notifications | | Events, templates, delivery configured |
| Reconciliation | | All types defined, audit trail set |
| Cross-Cutting | | Tenant isolation verified |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing pricing models, undefined payment processing, no reconciliation | Must fix before proceeding |
| WARNING | Specific notification templates, exact retry timings, edge case handling | Should address |
| INFO | Additional payment methods, enhanced reporting, optimization opportunities | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All billing components defined, payment processing complete, reconciliation documented |
| **CONDITIONAL** | Minor gaps (specific templates, timing values) - document gaps and proceed |
| **NEEDS REVISION** | Missing pricing models, undefined payment processing, or no reconciliation |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category
- Gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)
- Recommendations for implementation
- Next steps

---

## COLLABORATION MENUS (A/P/C):

After generating the report above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report review
- **C (Continue)**: Accept report and complete Validate mode
- **[Specific refinements]**: Describe what you'd like to adjust in the report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass report context: findings, recommendations
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced recommendations? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report for billing integration: {summary of outcome}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validate mode complete

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
- Gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Billing integration design complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing pricing models, payment processing gaps, or reconciliation issues.

## Workflow Complete

Validation mode complete for tenant-billing-integration workflow.
