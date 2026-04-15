# Step 20: Load Artifact for Validation

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input
- 📖 CRITICAL: ALWAYS read the complete step file before taking any action
- 🔄 CRITICAL: When loading next step with 'C', ensure entire file is read
- ⏸️ ALWAYS pause after presenting findings and await user direction
- 🎯 Focus ONLY on current step scope - do not look ahead

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load the tenant requirements analysis for validation against BAM patterns.

## Prerequisites

- Existing analysis at `{output_folder}/planning-artifacts/tenant-requirements-analysis.md`


---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Analysis Document

Read the existing tenant requirements analysis.

### 2. Prepare Validation Context

Load relevant patterns for validation:
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-residency

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure and validation scope
- **P (Party Mode)**: Bring analyst and QA perspectives for pre-validation review
- **C (Continue)**: Accept loaded artifact and proceed to validation
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass artifact context: loaded sections, validation scope
- Process enhanced insights from deep questioning
- Ask user: "Accept this analysis? (y/n)"
- If yes, prepare validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review loaded tenant requirements for validation: {summary of document structure}"
- Process collaborative analysis from analyst and QA personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded
- Proceed to next step: `step-21-v-validate-requirements.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation context prepared
- [ ] Patterns align with pattern registry

## Outputs

- Loaded artifact content

## Next Step

Proceed to `step-21-v-validate-requirements.md` with loaded artifact.
