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

Generate a comprehensive validation report summarizing findings from the agent runtime architecture validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Agent runtime architecture artifact loaded successfully
- Step 21 completed: Validation performed against QG-M3 quality gate criteria
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-m3-agent-runtime.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`

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
| Orchestration Model | | Pattern selection, escalation criteria, kill switch fallback |
| Tool Registry | | Catalog structure, permissions, sandbox config |
| Memory Tiers | | All 5 tiers defined, tenant isolation |
| Approval Workflows | | Trigger conditions, queue design, timeout handling |
| Evaluation Foundation | | Golden tasks, metrics, thresholds |
| Kill Switch Design | | Feature flags, circuit breakers, rollback |
| Cross-Cutting | | Master architecture alignment, tenant isolation |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Blocks QG-M3 gate passage | Must fix before proceeding |
| WARNING | Non-critical gap in runtime design | Should address before implementation |
| INFO | Improvement opportunity | Consider for future iterations |

**Critical Failure Examples:**
- Missing orchestration pattern selection
- Undefined tool permissions model
- No kill switch mechanism defined
- Memory tier cross-tenant leakage possible

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All 6 components defined, quality gates met, tenant isolation verified |
| **CONDITIONAL** | Minor gaps (e.g., evaluation thresholds not yet calibrated: accuracy baseline < 95%, latency p99 > 500ms, safety score < 0.9) with mitigation plan |
| **NEEDS REVISION** | Missing orchestration pattern, undefined permissions, or no kill switch |

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
- Context: "Review QG-M3 validation report and recommend next steps"
- Process PM and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
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

- Agent Runtime Architecture Validation Report
- Component-level findings summary
- QG-M3 gate decision documentation
- **Output to:** `{output_folder}/planning-artifacts/agent-runtime-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to downstream workflows (convergence-verification).
- **CONDITIONAL:** Document gaps with deadline and proceed with mitigation plan.
- **NEEDS REVISION:** Return to Edit mode (`step-10-e-load-existing.md`) to address findings.

---

## Workflow Complete

Validation mode complete for agent-runtime-architecture workflow.
