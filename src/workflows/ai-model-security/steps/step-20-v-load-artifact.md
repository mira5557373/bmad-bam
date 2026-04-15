# Step 20: Load Artifact

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

Load the AI model security artifacts for validation against QG-S4 quality gate criteria.

## Prerequisites

- AI model security artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: model-versioning, ai-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-s4-ai-security.md`

Load the existing AI model security documents:
- `{output_folder}/planning-artifacts/security/model-security.md`

If the file does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the document structure and prepare for validation against the quality criteria.

---

## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/qg-s4-ai-security.md`
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

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation scope and quality gate criteria
- **P (Party Mode)**: Bring Security Auditor, Compliance Officer, and MLOps Engineer perspectives
- **C (Continue)**: Accept loaded artifacts and proceed to Step 21: Validate
- **Clarify scope**: Describe specific validation focus areas

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifacts, QG-S4 criteria, validation scope
- Process enhanced insights
- Ask user: "Accept these refined validation parameters? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI model security artifacts preparation for QG-S4 validation"
- Process Security Auditor, Compliance Officer, MLOps Engineer perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context to session
- Update frontmatter `stepsCompleted: [20]`
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
