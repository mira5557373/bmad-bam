# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the tenant analytics dashboard validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Analytics dashboard validation performed

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
| Analytics Requirements | | Business, tenant-facing, and platform analytics defined |
| Data Aggregation | | Pipeline, aggregation levels, warehouse schema |
| Tenant Data Isolation | | Isolation layers, access control, audit trail |
| Dashboard Components | | Widget library, templates, interaction patterns |
| Visualization Design | | Design system, accessibility, responsive design |
| Processing Architecture | | Real-time, batch, hybrid queries |
| Export Capabilities | | Formats, scheduling, GDPR compliance |
| Access Control | | RBAC, RLS, audit logging |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing tenant isolation, no access control, data leakage risk | Must fix before proceeding |
| WARNING | Specific widget configurations, incomplete dashboard templates | Should address |
| INFO | Design improvements, additional KPI suggestions | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All data paths include tenant context, isolation verified, access controls complete |
| **CONDITIONAL** | Minor gaps (e.g., specific widget configurations, dashboard templates) - document gaps and proceed |
| **NEEDS REVISION** | Missing tenant isolation, no access control, or data leakage risks |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by analytics domain (Requirements, Data, Components, Security)
- Tenant isolation verification results
- Access control compliance checks
- Required fixes list (if applicable)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections or recommendations
- **P (Party Mode)**: Bring data architect and compliance perspectives on final report
- **C (Continue)**: Accept generated report and complete validation workflow
- **[Specific refinements]**: Describe specific sections to refine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation outcome, findings by domain, recommendations
- Process enhanced insights on report quality
- Ask user: "Accept this detailed report analysis? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review final validation report for tenant analytics dashboard"
- Process data architect and compliance perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save final validation report
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Validation mode complete

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
- Specific findings per analytics domain

---

## Next Step

Based on completion status:
- **PASS:** Analytics dashboard design validated, proceed to implementation or downstream workflows.
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing tenant isolation, access control gaps, or data leakage risks.

## Workflow Complete

Validation mode complete for tenant-analytics-dashboard workflow.
