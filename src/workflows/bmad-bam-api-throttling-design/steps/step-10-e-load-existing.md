# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

This step loads the existing API throttling design documents for modification. Edit mode allows updates to traffic patterns, throttling rules, tier quotas, or burst handling without recreating the entire design from scratch.

---

## Prerequisites

- Existing API throttling design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `api-throttling`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `rate-limiting`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing API throttling design documents:
- `{output_folder}/planning-artifacts/operations/api-throttling-design.md`
- `{output_folder}/planning-artifacts/operations/throttling-rules-matrix.md` (if exists)

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:
- Traffic pattern analysis
- Throttling algorithm configurations
- Tier quota allocations
- Burst handling strategies
- Monitoring and alerting rules

### 3. Confirm Modification Targets

Confirm with the user which sections need modification:

| Section | Current Status | Modification Scope |
|---------|----------------|-------------------|
| Traffic Patterns | {loaded} | Add/update endpoints |
| Throttling Rules | {loaded} | Adjust limits/algorithms |
| Tier Quotas | {loaded} | Change allocations |
| Burst Handling | {loaded} | Update thresholds |
| Monitoring | {loaded} | Add/modify alerts |

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the artifacts, present the user with:

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
- Pass artifact context: current state, proposed changes
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review throttling modification: {summary of current state and proposed changes}"
- Process collaborative analysis from analyst and architect personas
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

- Summary of current throttling configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
