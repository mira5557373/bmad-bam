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

Generate a comprehensive validation report summarizing findings from the usage metering validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Usage metering validation performed

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
| Billable Resources | | All categories defined, tier inclusions set |
| Metering Events | | Schema defined, collection pipeline documented |
| Aggregation Configuration | | All levels defined, late event handling |
| Billing Integration | | Provider identified, API endpoints documented |
| Accuracy Validation | | Multi-layer validation, reconciliation defined |
| Cross-Cutting | | Tenant isolation in billing data verified |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing billable resources, undefined aggregation, no billing integration | Must fix before proceeding |
| WARNING | Specific pricing values (FREE $0, PRO $49-199/mo, ENTERPRISE custom), minor accuracy thresholds (99.9% billing accuracy target) | Should address |
| INFO | Additional metering optimizations, dashboard enhancements | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All resources identified, metering pipeline complete, billing integration defined, accuracy validated |
| **CONDITIONAL** | Minor gaps (e.g., specific pricing values: FREE $0, PRO $49-199/mo, ENTERPRISE custom; overage rates defined) - document gaps and proceed |
| **NEEDS REVISION** | Missing billable resources, undefined aggregation, or no billing integration |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Resources, Events, Aggregation, Billing, Accuracy, Cross-Cutting)
- Accuracy gaps documented (if CONDITIONAL)
- Pricing/configuration items (FREE $0, PRO $49-199/mo, ENTERPRISE custom; overage rates per resource type)
- Required fixes list (if FAIL)
- Reconciliation process status
- Next steps recommendation

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
- Context: "Review validation report for usage metering: {summary of outcome}"
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
- Accuracy gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

Based on completion status:
- **PASS:** Metering design complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps (pricing values: FREE $0, PRO $49-199/mo, ENTERPRISE custom; overage rates defined) and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing billable resources, aggregation gaps, or billing integration issues.

## Workflow Complete

Validation mode complete for usage-metering-design workflow.
