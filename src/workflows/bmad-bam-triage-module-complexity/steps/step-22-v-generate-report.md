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

Generate a comprehensive validation report summarizing findings from the module complexity triage validation and determining the workflow completion status.

## Prerequisites

- Step 20 completed: Artifact loaded successfully
- Step 21 completed: Module complexity triage validation performed


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
| Score Completeness | | All 8 questions scored (0-2 scale) |
| Evidence Quality | | Supporting rationale for each score |
| Classification Accuracy | | Score range matches classification |
| Sprint Status Consistency | | sprint-status.yaml updated |
| Cross-Module Consistency | | Comparable modules scored similarly |

### 2. Assign Severity to Findings

| Severity | Description | Action Required |
|----------|-------------|-----------------|
| CRITICAL | Missing scores, incorrect classification, or sprint-status mismatch | Must fix before proceeding |
| WARNING | Thin evidence for some scores but defensible | Should document and proceed |
| INFO | Minor documentation improvements | Consider for consistency |

### 3. Determine Completion Status

| Status | Criteria |
|--------|----------|
| **COMPLETE** | All 8 questions scored, evidence provided, classification correct, sprint-status updated |
| **NEEDS REVISION** | Missing scores, incorrect classification calculation, or sprint-status mismatch |

### 4. Generate Report

Create validation report summarizing:
- Module complexity assessment outcome (SIMPLE/STANDARD/COMPLEX)
- Total score and breakdown (Q1-Q8)
- One-way upgrade rule application (if applicable)
- Sprint-status alignment
- Required actions for any gaps

## Verification

- [ ] All findings from Step 21 documented
- [ ] Severity assigned to each finding
- [ ] Completion status determined
- [ ] Report generated with score summary
- [ ] Patterns align with pattern registry

## Outputs

- Validation report document
- **Load template:** `{project-root}/_bmad/bam/data/templates/quality-gate-report-template.md`
- **Load template:** `{project-root}/_bmad/bam/data/templates/complexity-triage-template.md`
- **Output to:** `{output_folder}/planning-artifacts/{module-name}-complexity-validation-report.md`

## Next Step

Based on completion status:
- **COMPLETE:** Workflow finished. Proceed to `bmad-bam-create-module-architecture` for the module.
- **NEEDS REVISION:** Return to Edit mode to address scoring gaps or classification errors.

## Workflow Complete

Validation mode complete for module complexity triage workflow.

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file
