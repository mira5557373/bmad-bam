# Step 21: Validate Module Epics (Validate Mode)

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

This step validates the completeness and quality of the module epics, ensuring proper story structure, module boundary compliance, acceptance criteria quality, and architecture alignment.

---

## Prerequisites

- Step 20: Load Artifact completed successfully
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: facade-contracts
- **Load quality gate:** `{project-root}/_bmad/bam/data/quality-gates.csv` -> filter: `QG-S2`



---

## Inputs

- Loaded artifact from validation step 20
- Quality gate criteria and checklist
- Pattern registry for validation rules
- Previous validation findings (if re-validating)

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

---

## Verification

### Epic Structure

- [ ] Epic count appropriate for module complexity (SIMPLE: 1-2, STANDARD: 3-5, COMPLEX: 5+)
- [ ] Each epic has clear boundary definition
- [ ] Each epic owns complete operations for its aggregates
- [ ] No overlapping aggregate ownership between epics
- [ ] Dependencies between epics are documented

### Story Completeness

- [ ] Each story follows the standard template
- [ ] All stories have unique IDs
- [ ] Priority assigned to all stories (P1/P2/P3)
- [ ] User story format complete (As a/I want/So that)
- [ ] Module scope section present
- [ ] Tenant context section present

### Module Boundary Compliance

- [ ] All stories implementable within module boundary
- [ ] Cross-module needs reference facade contracts
- [ ] No stories require internal access to other modules
- [ ] Aggregate references match module architecture

### Acceptance Criteria Quality

- [ ] Every story has at least one acceptance criterion
- [ ] Given/When/Then format used consistently
- [ ] Tenant isolation criteria present where applicable
- [ ] Facade contract criteria present for facade-modifying stories
- [ ] AI behavior criteria present for AI-enabled stories

### Spike Stories (COMPLEX modules)

- [ ] Spike stories exist for all identified unknowns
- [ ] Spike stories have clear research objectives
- [ ] Spike stories are scheduled before dependent implementation stories

### Architecture Alignment

- [ ] All aggregates from architecture are covered by stories
- [ ] All facade methods have corresponding stories
- [ ] All published events have stories for emission
- [ ] AI behaviors from architecture have stories

### BAM Developer Notes

- [ ] Module boundary enforcement guidance present
- [ ] Tenant context access documented
- [ ] Facade dependencies listed with versions
- [ ] Testing requirements specified

### QG-S2 Module Implementation Readiness Verification
This workflow produces artifacts for QG-S2:

| QG-S2 Pattern | Status | Evidence |
|---------------|--------|----------|
| `stories_defined` | [ ] Pass / [ ] Fail | All architecture elements have stories |
| `acceptance_criteria` | [ ] Pass / [ ] Fail | Given/When/Then format on all stories |
| `test_plan` | [ ] Pass / [ ] Fail | Testing requirements section complete |

**QG-S2 Module Implementation Readiness:** [ ] SATISFIED / [ ] NOT SATISFIED

---

## Gate Decision

- **PASS**: All applicable sections complete, stories within module boundary, acceptance criteria present
- **CONDITIONAL**: Minor gaps (e.g., some BAM dev notes TBD) - document gaps and proceed
- **FAIL**: Stories cross module boundaries, missing acceptance criteria, or architecture misalignment - return to Create/Edit mode

Present validation results with specific findings for each section.

---

## COLLABORATION MENUS (A/P/C):

After completing validation, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific validation findings
- **P (Party Mode)**: Bring QA and analyst perspectives on gate decision
- **C (Continue)**: Accept validation results and proceed to generate report
- **[Specific findings]**: Describe concerns about specific findings

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: validation findings, gate decision rationale
- Process enhanced insights on quality concerns
- Ask user: "Accept this enhanced validation analysis? (y/n)"
- If yes, incorporate into findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review module epics validation: {findings summary and gate decision}"
- Process QA and analyst perspectives on gate decision
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document validation findings
- Proceed to next step: `step-22-v-generate-report.md`

---

## Outputs

- Validated module epics document
- Validation gate decision (PASS/CONDITIONAL/FAIL)
- Story gaps documented (if CONDITIONAL)
- Required fixes list (if FAIL)

---

## Next Step

If PASS: Epics validated, ready for sprint planning and implementation.
If CONDITIONAL: Document gaps (BAM dev notes TBD, etc.) and proceed to sprint planning with noted limitations.
If FAIL: Return to Create/Edit mode to address boundary violations, missing acceptance criteria, or architecture misalignment.
