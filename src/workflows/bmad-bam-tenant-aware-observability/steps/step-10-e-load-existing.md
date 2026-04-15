# Step 1: Load Existing Artifact

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

This step loads the existing tenant-aware observability documents for modification. Edit mode allows updates to tenant dimensions, metric aggregation, dashboard specifications, or alert rules without recreating the entire observability design from scratch.

---

## Prerequisites

- Existing observability documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability



---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Artifact

- Locate artifact at `{output_folder}/`
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

---

## Load Artifacts

Load the existing tenant-aware observability documents:
- `{output_folder}/planning-artifacts/observability/tenant-observability-design.md`
- `{output_folder}/planning-artifacts/observability/dashboard-specifications.md`
- `{output_folder}/planning-artifacts/observability/alert-rules.md`

If the files do not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current documents:
- Tenant dimensions defined
- Metric aggregation strategy
- Log context configuration
- Trace propagation setup
- Dashboard coverage

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading existing artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into current observability configuration details
- **P (Party Mode)**: Bring SRE and platform architect perspectives on modification scope
- **C (Continue)**: Accept loaded artifacts and proceed to apply changes
- **[Specific refinements]**: Describe specific sections to focus on

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current observability design, dimensions, metrics, dashboards
- Process enhanced insights on what needs modification
- Ask user: "Accept this detailed analysis? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing observability configuration for modification"
- Process SRE and platform architect perspectives
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

- Summary of current observability configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
