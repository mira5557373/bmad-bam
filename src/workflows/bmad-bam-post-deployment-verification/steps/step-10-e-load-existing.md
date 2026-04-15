# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads existing post-deployment verification documents for modification. Edit mode allows updates to verification checklists, test results, or rollback procedures without re-running the entire verification workflow.

---

## Prerequisites

- Existing post-deployment verification artifacts to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `observability`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing post-deployment verification documents:
- `{output_folder}/operations/post-deployment-verification-report.md`
- `{output_folder}/operations/tenant-health-status.md`
- `{output_folder}/operations/rollback-readiness-checklist.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:
- Smoke test results and coverage
- Monitoring activation status
- Tenant health check results
- Rollback readiness status

### 3. Confirm Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements and impact
- **P (Party Mode)**: Bring DevOps and QA perspectives for change review
- **C (Continue)**: Proceed to apply identified modifications
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: current state, proposed changes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review verification modification: {summary of current state and proposed changes}"
- Process collaborative analysis from DevOps and QA personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm modification targets with user
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

- Summary of current verification status
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
