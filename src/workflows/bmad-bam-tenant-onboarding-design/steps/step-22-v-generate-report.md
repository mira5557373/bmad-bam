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

Generate a comprehensive validation report summarizing findings from the tenant onboarding validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Onboarding design validation performed

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
| Provisioning Stages | | All stages defined, rollback strategies present |
| Data Initialization | | Seeding, reference data, admin user creation |
| Tier Configuration | | All tiers configured, quotas and feature flags |
| Isolation Boundaries | | Database, cache, storage, search, vector isolation |
| Runbook Completeness | | Automated flow, manual interventions, monitoring |
| Cross-Cutting | | Consistent with tenant model, no orphaned resources |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing provisioning stages, undefined tier configurations, incomplete isolation | Must fix before proceeding |
| WARNING | Specific timeout values (30s API, 5m batch, 15m total provisioning), minor documentation gaps | Should address |
| INFO | Onboarding UX improvements, additional welcome content | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All stages defined, all tiers configured, isolation complete, runbook operational |
| **CONDITIONAL** | Minor gaps (e.g., specific timeout values: 30s API calls, 5m batch operations, 15m total provisioning) - document gaps and proceed |
| **NEEDS REVISION** | Missing provisioning stages, undefined tier configurations, or incomplete isolation |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by category (Stages, Initialization, Tiers, Isolation, Runbook, Cross-Cutting)
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
- **PASS:** Onboarding design complete, ready for implementation sprint planning.
- **CONDITIONAL:** Document gaps with remediation timeline and proceed to implementation with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing provisioning stages, tier configurations, or isolation boundaries.

---

## Workflow Complete

Validation mode complete for tenant-onboarding-design workflow.
