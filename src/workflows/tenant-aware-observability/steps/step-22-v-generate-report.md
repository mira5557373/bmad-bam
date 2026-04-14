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

Generate a comprehensive validation report summarizing findings from the tenant-aware observability validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Observability validation performed

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
| Tenant Dimensions | | Core, request, and resource dimensions defined |
| Metric Aggregation | | Platform and tenant metrics, retention policies |
| Log Context | | Structured format, tenant isolation, sensitive data handling |
| Trace Propagation | | W3C context, sampling strategy, agent tracing |
| Dashboards | | Hierarchy defined, access controls, alert routing |
| Cross-Cutting | | All signals include tenant_id, no data leakage |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing tenant dimensions, no isolation in dashboards, cardinality issues | Must fix before proceeding |
| WARNING | Specific alert thresholds (p99 latency > 500ms, error rate > 1%, CPU > 80%), minor retention gaps | Should address |
| INFO | Dashboard layout improvements, additional metric suggestions | Consider for future |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **PASS** | All signals include tenant context, isolation verified, dashboards access-controlled |
| **CONDITIONAL** | Minor gaps (e.g., specific alert thresholds: p99 latency > 500ms, error rate > 1%, CPU > 80%, memory > 85%) - document gaps and proceed |
| **NEEDS REVISION** | Missing tenant dimensions, no isolation in dashboards, or cardinality issues |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by observability domain (Dimensions, Metrics, Logs, Traces, Dashboards)
- Tenant isolation verification results
- Cross-cutting consistency checks
- Required fixes list (if applicable)
- Next steps recommendation

---

## COLLABORATION MENUS (A/P/C):

After generating report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific report sections or recommendations
- **P (Party Mode)**: Bring SRE and security architect perspectives on final report
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
- Context: "Review final validation report for tenant-aware observability"
- Process SRE and security architect perspectives
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
- Specific findings per observability domain

---

## Next Step

Based on completion status:
- **PASS:** Observability design validated, proceed to implementation or downstream workflows.
- **CONDITIONAL:** Document gaps and proceed with noted limitations.
- **NEEDS REVISION:** Return to Create mode to address missing tenant dimensions, isolation gaps, or cardinality issues.

## Workflow Complete

Validation mode complete for tenant-aware-observability workflow.
