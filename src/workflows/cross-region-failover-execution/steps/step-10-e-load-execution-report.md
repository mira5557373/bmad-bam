# Step 1: Load Existing Execution Report

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

This step loads the existing failover execution report for modification. Edit mode allows updates to execution timeline, exception documentation, lessons learned, or recommendations without recreating the entire report from scratch.

## Prerequisites

- Existing failover execution report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery


---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Execution Report

Load the existing failover execution report:
- `{output_folder}/planning-artifacts/failover-execution-report.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current execution report:

**Document Sections:**
- Executive Summary
- Failover Context
- Execution Timeline
- Validation Results
- Exceptions and Resolutions
- RTO/RPO Achievement
- Lessons Learned
- Recommendations
- DR Plan Updates

### 3. Identify Modification Areas

Present the following modification options:

| Section | Common Updates |
|---------|---------------|
| Executive Summary | Update summary with additional findings |
| Execution Timeline | Add missing events or correct timestamps |
| Exceptions | Add newly discovered issues |
| RTO/RPO Achievement | Update with corrected calculations |
| Lessons Learned | Add post-review insights |
| Recommendations | Refine or add recommendations |
| DR Plan Updates | Add additional update items |
| Post-Execution Actions | Update action status |

### 4. Confirm Modification Scope

Present options to user:
- Which sections need modification?
- Are there new findings driving changes?
- Should any sections be validated after changes?

Document the confirmed modification scope for the next step.

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

### Menu Options

### [A]nalyze Options
- **A1**: Review current execution report structure and completeness
- **A2**: Analyze execution timeline accuracy
- **A3**: Evaluate exception documentation completeness
- **A4**: Assess lessons learned coverage
- **A5**: Review recommendations actionability

### [P]ropose Changes
- **P1**: Propose timeline corrections based on log analysis
- **P2**: Suggest additional exception documentation
- **P3**: Recommend lessons learned additions
- **P4**: Propose recommendation refinements
- **P5**: Suggest action item updates

### [C]ontinue
- **C1**: Accept modification scope and proceed to apply changes
- **C2**: Mark step complete and load `step-11-e-apply-report-changes.md`

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] Existing execution report loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current execution report
- Confirmed list of sections to modify
- Change rationale documented

## Next Step

Proceed to `step-11-e-apply-report-changes.md` with identified modification targets.
