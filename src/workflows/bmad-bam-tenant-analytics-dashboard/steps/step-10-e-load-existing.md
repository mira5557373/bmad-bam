# Step 1: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing tenant analytics dashboard specification for modification. Edit mode allows updates to analytics requirements, data aggregation, visualization design, export capabilities, or access control without recreating the entire specification from scratch.

---

## Prerequisites

- Existing analytics dashboard specification to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,dashboard

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Artifact

- Locate artifact at `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`
- Parse document structure
- Extract modification scope

### 2. Verify Artifact State

- Check document is valid and complete
- Identify sections requiring updates
- Document current state

### 3. Prepare Edit Context

- Load relevant patterns and templates
- Identify dependencies
- Prepare modification workflow

---

## Load Artifacts

Load the existing tenant analytics dashboard documents:
- `{output_folder}/planning-artifacts/analytics-dashboard-spec.md`

If the files do not exist, inform the user that there is no artifact to edit and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Analytics requirements defined
- Data aggregation strategy
- Tenant data isolation approach
- Dashboard components
- Visualization design
- Processing architecture
- Export capabilities
- Access control

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading existing artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into current analytics configuration details
- **P (Party Mode)**: Bring data architect and product manager perspectives on modification scope
- **C (Continue)**: Accept loaded artifacts and proceed to apply changes
- **[Specific refinements]**: Describe specific sections to focus on

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current analytics design, data architecture, visualization
- Process enhanced insights on what needs modification
- Ask user: "Accept this detailed analysis? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing analytics dashboard configuration for modification"
- Process data architect and product manager perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification scope to context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current analytics configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
