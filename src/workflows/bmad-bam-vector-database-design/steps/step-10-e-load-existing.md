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

Load and review existing vector database design documents to identify sections requiring modification.

---

## Prerequisites

- Existing vector database design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: vector-database

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Existing Documents

Load the existing vector database design documents:
- `{output_folder}/planning-artifacts/architecture/vector-database-design.md`
- `{output_folder}/planning-artifacts/architecture/vector-operations-runbook.md`

If the files do not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current documents:

| Component | Status | Key Configuration |
|-----------|--------|-------------------|
| Requirements | Present/Missing | {embedding dimensions, scale} |
| Index Strategy | Present/Missing | {algorithm, parameters} |
| Tenant Isolation | Present/Missing | {pattern selected} |
| Query Optimization | Present/Missing | {caching, filtering} |
| Scaling | Present/Missing | {sharding strategy} |
| Backup/Recovery | Present/Missing | {RPO/RTO targets} |
| Monitoring | Present/Missing | {metrics defined} |
| Security | Present/Missing | {encryption, access} |

### 3. Identify Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and presenting the existing documents, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific components before editing
- **P (Party Mode)**: Bring architect perspectives on proposed changes
- **C (Continue)**: Proceed to apply modifications
- **[Specific components]**: Describe which components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current document state, proposed modifications
- Process enhanced insights on change impact
- Ask user: "Accept this analysis of proposed changes? (y/n)"
- If yes, document change impact assessment
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review proposed modifications to vector database design"
- Process data engineer and SRE perspectives on change impact
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Document identified modification targets
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] All existing documents loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current vector database design state
- List of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
