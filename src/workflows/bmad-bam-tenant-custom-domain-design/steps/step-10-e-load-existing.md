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

This step loads the existing tenant custom domain design documents for modification. Edit mode allows updates to domain architecture, SSL/TLS configuration, routing rules, or DNS integration without recreating the entire design from scratch.

---

## Prerequisites

- Existing custom domain design documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv -> filter: infrastructure`

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifacts

Load the existing custom domain design documents:
- `{output_folder}/planning-artifacts/infrastructure/tenant-custom-domain-design.md`

If the file does not exist, inform the user and suggest switching to Create mode.

### 2. Parse Document Structure

Parse and display a summary of the current document:
- Domain hierarchy design
- SSL/TLS configuration
- Routing configuration
- DNS integration patterns

### 3. Confirm Modification Targets

Confirm with the user which sections need modification.

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
- Context: "Review custom domain modification: {summary of current state and proposed changes}"
- Process collaborative analysis
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

- Summary of current custom domain configuration
- Confirmed list of sections to modify

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
