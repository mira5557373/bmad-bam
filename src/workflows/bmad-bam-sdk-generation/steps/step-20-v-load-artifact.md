# Step 20: Load SDK Artifact

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

This step loads the SDK Generation artifact for validation. The configuration documents SDK generation pipeline ensuring multi-language support, authentication handling, and tenant context propagation.

## Prerequisites

- SDK generation artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: sdk-patterns
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/production-readiness.md`

Load the existing SDK generation documents:
- `{output_folder}/planning-artifacts/sdk/sdk-generation-config.md`
- `{output_folder}/planning-artifacts/sdk/sdk-structure-*.md`

If the files do not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

- Read the artifact from `{output_folder}/` specified location
- Parse and validate structure
- Verify document integrity

### 2. Validate Content

- Check all required sections are present
- Verify cross-references are valid
- Validate against quality gate checklist

### 3. Generate Findings

- Document any issues found
- Categorize by severity (Critical/High/Medium/Low)

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure and validation criteria
- **P (Party Mode)**: Bring analyst and QA perspectives for pre-validation review
- **C (Continue)**: Accept loaded artifact and proceed to validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: loaded documents, structure analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, prepare validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded SDK artifact for validation: {summary of document structure}"
- Process collaborative analysis from analyst and QA personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

## Outputs

- Validation context prepared
- Document structure parsed

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
