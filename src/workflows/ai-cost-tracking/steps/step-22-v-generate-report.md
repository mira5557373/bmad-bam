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

Generate a comprehensive validation report summarizing findings from the AI cost tracking architecture validation.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Validation performed
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`

---

## Inputs

- Validation results from previous steps
- Quality gate decision (PASS/CONDITIONAL/FAIL)
- Specific findings per component

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21 validation:

| Category | Status | Notes |
|----------|--------|-------|
| Token Metering | | Counting, pricing, attribution |
| Compute Attribution | | Categories, rules, multipliers |
| Aggregation Pipeline | | Streaming, windows, allocation |
| Billing Integration | | Export, alerts, anomaly detection |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks cost tracking | Must fix before proceeding |
| WARNING | Non-critical gap | Should address before production |
| INFO | Improvement opportunity | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All 4 components defined, attribution verified |
| **CONDITIONAL** | Minor gaps with mitigation plan |
| **NEEDS REVISION** | Missing metering, attribution, or billing |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome
- Findings by component
- Required actions
- Next steps

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings
- **P (Party Mode)**: Bring PM and FinOps perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report

Select an option:
```

#### If 'C' (Continue):
- Save validation report to output location
- Complete validation workflow

---

## Verification

- [ ] All findings documented
- [ ] Severity assigned
- [ ] Completion status determined
- [ ] Report generated

---

## Outputs

- AI Cost Tracking Validation Report
- **Output to:** `{output_folder}/planning-artifacts/ai-cost-tracking-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished
- **CONDITIONAL:** Document gaps and proceed
- **NEEDS REVISION:** Return to Edit mode

---

## Workflow Complete

Validation mode complete for ai-cost-tracking workflow.
