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

Load the AI evaluation and safety design artifacts for validation against QG-I3 quality gate criteria covering safety dimensions, golden tasks, guardrails, and monitoring configurations.

## Prerequisites

- AI eval safety design artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-agent-safety
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-i3-agent-safety.md`

Load the existing AI eval safety design documents:
- `{output_folder}/planning-artifacts/safety/safety-criteria.md`
- `{output_folder}/planning-artifacts/safety/golden-tasks.md`
- `{output_folder}/planning-artifacts/safety/guardrail-config.md`
- `{output_folder}/planning-artifacts/safety/eval-pipeline.md`
- `{output_folder}/planning-artifacts/safety/monitoring-config.md`

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

## COLLABORATION MENUS (A/P/C):

After completing the artifact loading above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation scope and quality gate criteria
- **P (Party Mode)**: Bring Quality Assurance Lead, Compliance Auditor, and Security Architect perspectives
- **C (Continue)**: Accept loaded artifacts and proceed to Step 21: Validate
- **Clarify scope**: Describe specific validation focus areas

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifacts, QG-I3 criteria, validation scope
- Process enhanced insights
- Ask user: "Accept these refined validation parameters? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review AI eval safety artifacts preparation for QG-I3 validation"
- Process Quality Assurance Lead, Compliance Auditor, Security Architect perspectives
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
