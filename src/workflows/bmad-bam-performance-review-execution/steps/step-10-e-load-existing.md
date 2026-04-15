# Step 10: Load Existing Artifact (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST):

- NEVER generate content without user input
- CRITICAL: ALWAYS read the complete step file before taking any action
- CRITICAL: When loading next step with 'C', ensure entire file is read
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Load and review existing performance review to identify sections requiring modification or updates.

---

## Prerequisites

- Existing performance review to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: performance

---

## Inputs

- Existing artifact file path
- User-specified modifications
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing performance review documents:
- `{output_folder}/operations/performance/performance-review-{date}.md`
- `{output_folder}/operations/performance/optimization-recommendations-{date}.md` (if exists)

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current review:

| Component | Status | Key Information |
|-----------|--------|-----------------|
| Baseline comparison | Complete/Incomplete | {summary} |
| Capacity assessment | Complete/Incomplete | {summary} |
| SLA verification | Complete/Incomplete | {summary} |
| Tenant analysis | Complete/Incomplete | {summary} |
| Cost efficiency | Complete/Incomplete | {summary} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification:
- [ ] Update baseline metrics
- [ ] Revise capacity assessment
- [ ] Modify SLA findings
- [ ] Update tenant analysis
- [ ] Revise cost analysis
- [ ] Add optimization recommendations

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific sections before editing
- **P (Party Mode)**: Bring SRE perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific sections]**: Describe which sections to modify

Select an option:
```

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified

---

## Outputs

- Summary of current performance review state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
