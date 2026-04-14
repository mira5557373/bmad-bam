# Step 10: Load Existing Migration Plan

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

Load an existing migration plan for modification. Edit mode allows updates to migration scope, strategy, runbook procedures, or rollback plans without recreating the entire migration design from scratch.

---

## Prerequisites

- Existing migration plan documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Migration Plan

Load the existing migration plan documents:
- `{output_folder}/planning-artifacts/migration-runbook.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current migration plan:

| Section | Status | Last Modified |
|---------|--------|---------------|
| Migration Scope | Present/Missing | {date} |
| Strategy Selection | Present/Missing | {date} |
| Phase Definitions | Present/Missing | {date} |
| Execution Procedures | Present/Missing | {date} |
| Rollback Plan | Present/Missing | {date} |
| Communication Plan | Present/Missing | {date} |

### 3. Identify Modification Scope

Present the following modification options:

| Option | Description |
|--------|-------------|
| A | Update migration scope (new data categories, changed volumes) |
| B | Change migration strategy (switch from big bang to phased) |
| C | Modify phase procedures (add/remove steps) |
| D | Update rollback procedures (new failure scenarios) |
| E | Revise communication plan (new stakeholders) |
| F | Full revision (multiple sections) |

### 4. Confirm Modification Targets

Confirm with the user which sections need modification and gather:
- Reason for modification
- Specific changes required
- Impact on dependent sections

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the migration plan, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements and impact analysis
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Proceed to apply identified modifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass modification context: current state, proposed changes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration plan modification: {summary of current state and proposed changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification targets with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-migration-changes.md`

---

## Verification

- [ ] Existing artifact loaded successfully
- [ ] Document structure parsed correctly
- [ ] All sections identified and summarized
- [ ] Modification scope confirmed with user
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current migration plan
- Confirmed list of sections to modify
- Change rationale documented

---

## Next Step

Proceed to `step-11-e-apply-migration-changes.md` with identified modification targets.
