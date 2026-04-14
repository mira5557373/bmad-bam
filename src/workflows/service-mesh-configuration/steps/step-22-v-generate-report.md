# Step 22: Generate Validation Report

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Generate a comprehensive validation report summarizing findings from the service mesh configuration validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Service mesh configuration artifact loaded successfully
- Step 21 completed: Validation performed against infrastructure criteria
- **Load checklist:** `{project-root}/_bmad/bam/checklists/module-readiness.md`
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
| Mesh Architecture | | Selection, mTLS, HA |
| Traffic Management | | Circuit breakers, retries, load balancing |
| Tenant Routing | | Headers, namespaces, canary |
| Observability | | Tracing, metrics, dashboards |
| Cross-Cutting | | Consistency, performance |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks infrastructure validation | Must fix before proceeding |
| WARNING | Non-critical infrastructure gap | Should address before production |
| INFO | Improvement opportunity | Consider for future iterations |

**Critical Failure Examples:**
- Missing service mesh selection
- No mTLS configuration
- Undefined tenant routing
- Missing observability integration

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All 4 components defined, mTLS enabled, observability configured |
| **CONDITIONAL** | Minor gaps with mitigation plan |
| **NEEDS REVISION** | Missing mesh architecture, traffic management, or tenant routing |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by component category
- Required actions for each critical/warning item
- Next steps based on outcome

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings or remediation approach
- **P (Party Mode)**: Bring PM and architect perspectives on next steps
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific concerns]**: Describe concerns about report or next steps

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, gate decision, remediation plan
- Process enhanced insights on remediation strategy
- Ask user: "Accept this remediation approach? (y/n)"
- If yes, finalize remediation plan
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review service mesh configuration validation report and recommend next steps"
- Process PM and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete validation workflow
- Provide gate decision guidance

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with actionable recommendations

---

## Outputs

- Service Mesh Configuration Validation Report
- Component-level findings summary
- Gate decision documentation
- **Output to:** `{output_folder}/planning-artifacts/infrastructure/service-mesh-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to downstream workflows.
- **CONDITIONAL:** Document gaps with deadline and proceed with mitigation plan.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load-existing.md`) to address findings.

---

## Workflow Complete

Validation mode complete for service-mesh-configuration workflow.
