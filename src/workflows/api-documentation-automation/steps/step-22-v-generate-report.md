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

Generate a comprehensive validation report summarizing findings from the API documentation pipeline validation steps and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Documentation pipeline validation performed

---


## Inputs

- Validation results from previous steps
- Decision (COMPLETE/PARTIAL/INCOMPLETE)
- Specific findings per component
- Recommendations (if applicable)

---

## Actions

### 1. Compile Validation Results

Organize findings from Step 21:

| Category | Status | Notes |
|----------|--------|-------|
| Doc Generation Strategy | | Tool selection, structure, workflow |
| OpenAPI Integration | | Source strategy, validation, enrichment |
| Versioning Approach | | Labeling, deprecation, changelog |
| Developer Portal Sync | | Publishing, explorer, feedback |
| Implementation Readiness | | Tools, CI/CD, deployment |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| HIGH | Major section incomplete | Must address before implementation |
| MEDIUM | Missing configuration details | Should address |
| LOW | Nice-to-have improvements | Consider for future |
| INFO | Suggestions and optimizations | Optional |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All sections documented, ready for implementation |
| **PARTIAL** | Some sections need additional detail, can proceed with notes |
| **INCOMPLETE** | Major sections missing, return to Create mode |

### 4. Generate Report

Create validation report summarizing:
- Validation outcome (COMPLETE/PARTIAL/INCOMPLETE)
- Findings by category (Generation, OpenAPI, Versioning, Portal)
- Implementation readiness assessment
- Remediation path (if INCOMPLETE)
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
- Decision (COMPLETE/PARTIAL/INCOMPLETE)
- Recommendations (if applicable)

---

## Next Step

Based on completion status:
- **COMPLETE:** Documentation pipeline validated, proceed to implementation.
- **PARTIAL:** Document notes and proceed with identified gaps.
- **INCOMPLETE:** Return to Create mode to address missing sections.

---

## Workflow Complete

Validation mode complete for api-documentation-automation workflow.
