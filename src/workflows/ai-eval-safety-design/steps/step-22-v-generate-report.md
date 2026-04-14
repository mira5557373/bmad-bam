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

Generate a comprehensive validation report summarizing findings from the AI evaluation and safety design validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: AI eval/safety artifact loaded successfully
- Step 21 completed: Validation performed against safety and evaluation criteria


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
| Safety Criteria | | Harm prevention, output filtering, boundary enforcement |
| Golden Tasks | | Task coverage, edge cases, baseline metrics |
| Guardrails Configuration | | Input/output validation, rate limiting, content filtering |
| Eval Pipeline | | Metric collection, threshold configuration, alerting |
| Monitoring Setup | | Dashboards, anomaly detection, incident response |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Safety vulnerability or evaluation gap | Must fix before deployment |
| WARNING | Non-critical safety improvement | Should address before production |
| INFO | Enhancement opportunity | Consider for continuous improvement |

**Critical Failure Examples:**
- Missing harm prevention criteria
- No output filtering for sensitive data
- Guardrails not enforcing tenant boundaries
- Evaluation pipeline missing safety metrics

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All safety criteria defined, guardrails configured, eval pipeline operational |
| **CONDITIONAL** | Minor gaps with documented mitigation plan |
| **NEEDS REVISION** | Critical safety gaps or missing evaluation coverage |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (PASS/CONDITIONAL/FAIL)
- Findings by safety/evaluation category
- Required actions for each critical/warning item
- Next steps based on outcome

## COLLABORATION MENUS (A/P/C):

After completing the report generation above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and remediation planning
- **P (Party Mode)**: Bring Executive Stakeholder, Risk Manager, and Technical Lead perspectives
- **C (Continue)**: Accept validation report and complete Validate mode
- **Refine report**: Describe specific findings or recommendations to adjust

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, severity assignments, completion status, next steps
- Process enhanced insights
- Ask user: "Accept these refined report conclusions? (y/n)"
- If yes, integrate into final report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI eval safety validation report for completeness and actionability"
- Process Executive Stakeholder, Risk Manager, Technical Lead perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report to output location
- Update frontmatter `stepsCompleted: [20, 21, 22]`
- Complete Validate mode based on status

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with safety-focused recommendations
- [ ] Patterns align with pattern registry

## Outputs

- AI Eval/Safety Design Validation Report
- Category-level findings summary
- Safety readiness assessment
- **Load template:** `{project-root}/_bmad/bam/templates/golden-dataset-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/golden-tasks-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/human-eval-rubric-template.md`

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to agent deployment with safety controls.
- **CONDITIONAL:** Document gaps with timeline and proceed with enhanced monitoring.
- **NEEDS REVISION:** Return to Edit mode (step-10-e-load-existing.md) to address safety gaps.

## Workflow Complete

Validation mode complete for ai-eval-safety-design workflow.
