# Step 10: Load Existing Artifact

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

Load and review existing AI model security documents to identify sections requiring modification.

## Prerequisites

- Existing AI model security documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: model-versioning, ai-safety

---

## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing AI model security documents:
- `{output_folder}/planning-artifacts/security/model-security.md`

If the file does not exist, inform the user and suggest switching to Create mode.

Parse and display a summary of the current design:
- Model provenance tracking
- Integrity verification controls
- Access control framework
- Audit logging configuration

Confirm with the user which sections need modification.

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into existing design gaps and improvement opportunities
- **P (Party Mode)**: Bring Security Reviewer, MLOps Engineer, and Compliance Auditor perspectives
- **C (Continue)**: Accept identified modifications and proceed to Step 11: Apply Changes
- **Specify sections**: Describe specific sections or components to modify

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current design state, identified gaps, modification candidates
- Process enhanced insights
- Ask user: "Accept these refined modification targets? (y/n)"
- If yes, integrate into modification list
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing AI model security design to identify improvement areas"
- Process Security Reviewer, MLOps Engineer, Compliance Auditor perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification targets to session context
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Model security document loaded successfully
- [ ] Document structure understood
- [ ] Sections for modification identified
- [ ] Patterns align with pattern registry

## Outputs

- Summary of current AI model security state
- List of sections to modify

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
