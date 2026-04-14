# Step 20: Load Artifact (Validate Mode)

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

This step loads the Emergency Change Request artifact for validation. Emergency changes to the master architecture require strict documentation, approval tracking, and impact assessment to maintain system integrity while addressing critical issues.

---

## Prerequisites

- Emergency Change Request artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: module-boundaries
- **Load checklist:** `{project-root}/_bmad/bam/checklists/production-readiness.md`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Artifact

Load the existing emergency change documents:
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-request.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-impact.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-approval.md`
- `{output_folder}/planning-artifacts/emergency/EMG-{id}-implementation.md`

### 2. Pre-Validation Checks

Before proceeding, verify the following conditions:
- Emergency change ID is assigned and consistent across documents
- Request document contains severity classification
- Impact document lists affected architecture components
- Approval document has required sign-offs
- Implementation document includes rollback plan

### 3. Handle Errors

**If files do not exist:**
- Inform the user that there is no artifact to validate
- Suggest switching to Create mode

**If files exist but incomplete:**
- Flag as critical gaps requiring immediate resolution before proceeding

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure concerns
- **P (Party Mode)**: Bring QA and architect perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation against emergency change criteria
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, missing sections, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this validation readiness assessment? (y/n)"
- If yes, document any caveats for validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review emergency change artifact readiness for validation"
- Process QA and architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded successfully
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Document structure parsed
- Critical gaps identified

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against emergency change quality criteria.
