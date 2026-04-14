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

Generate a comprehensive validation report summarizing findings from the module epics validation and determining the workflow completion status.

---

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Module epics validation performed

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
| Epic Structure | | Count appropriate for complexity, clear boundaries |
| Story Completeness | | Template followed, IDs unique, priority assigned |
| Module Boundary Compliance | | Stories within boundary, facade refs for cross-module |
| Acceptance Criteria Quality | | Given/When/Then format, tenant isolation criteria |
| Spike Stories | | COMPLEX modules have spikes for unknowns |
| Architecture Alignment | | Aggregates, facades, events covered by stories |
| BAM Developer Notes | | Boundary guidance, tenant context, testing reqs |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Stories cross module boundaries, missing acceptance criteria, or architecture misalignment | Must fix before sprint planning |
| WARNING | Minor gaps like BAM dev notes TBD | Should document and proceed |
| INFO | Optional improvements to story priority or spike scheduling | Consider for planning |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All applicable sections complete, stories within module boundary, acceptance criteria present |
| **NEEDS REVISION** | Stories cross module boundaries, missing acceptance criteria, or architecture misalignment |

### 4. Generate Report

Create validation report summarizing:
- Epic validation outcome
- Story count per epic with complexity alignment
- Module boundary compliance assessment
- Acceptance criteria coverage
- Architecture alignment verification
- Required fixes list (if any gaps)

---

## COLLABORATION MENUS (A/P/C):

After generating the report, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report findings and recommendations
- **P (Party Mode)**: Bring QA and analyst perspectives on report completeness
- **C (Continue)**: Accept report and complete validation workflow
- **[Specific items]**: Describe items to add or clarify in report

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation report, completion status, recommendations
- Process enhanced insights on report quality
- Ask user: "Accept these enhanced recommendations? (y/n)"
- If yes, incorporate into report
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review validation report: {completion status and key findings}"
- Process QA and analyst perspectives on report completeness
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation report
- Mark validation workflow as complete

---

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with epic summary
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/templates/module-epics-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-epics-validation-report.md`

---

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Epics validated and ready for sprint planning and implementation.
- **CONDITIONAL:** Document gaps (BAM dev notes TBD, etc.). Proceed to sprint planning with noted limitations.
- **NEEDS REVISION:** Return to Edit mode to address boundary violations, missing acceptance criteria, or architecture misalignment.

## Workflow Complete

Validation mode complete for module epics workflow.
