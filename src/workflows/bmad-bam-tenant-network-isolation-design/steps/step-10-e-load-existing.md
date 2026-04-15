# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction
- Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Load the existing tenant network isolation design documents for modification.

---

## Prerequisites

- Existing network isolation design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: security`

---

## Actions

### 1. Load Artifacts

Load the existing network isolation design:
- `{output_folder}/planning-artifacts/infrastructure/tenant-network-isolation-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:
- VPC architecture
- Security group design
- VPC peering configuration
- Traffic isolation mechanisms

### 3. Confirm Modification Targets

Confirm with the user which sections need modification.

---

## COLLABORATION MENUS (A/P/C):

After loading and parsing the artifacts, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Proceed to apply identified modifications
```

#### If 'C' (Continue):
- Confirm modification targets with user
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user

---

## Outputs

- Summary of current network isolation design state
- List of identified modification targets

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
