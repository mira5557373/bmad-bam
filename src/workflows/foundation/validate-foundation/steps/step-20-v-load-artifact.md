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

Load the foundation gate report and sprint status for meta-validation, verifying that the gate report itself is complete and properly formatted before it can serve as an official governance record.

---

## Prerequisites

- Foundation gate report artifact exists to validate
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation
- **Load checklist:** `{project-root}/_bmad/bam/data/checklists/qg-f1-foundation.md`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing foundation gate report for meta-validation:

- `{output_folder}/planning-artifacts/foundation-gate-report.md`
- `{output_folder}/sprint-status.yaml`

If the gate report does not exist, inform the user that there is no artifact to validate and suggest switching to Create mode.

Parse the report structure and prepare for validation:

1. Extract gate decision
2. Extract per-category results
3. Extract gap list and mitigation items
4. Extract recovery information (if applicable)
5. Load sprint-status.yaml foundation section

Prepare validation context:

- Verify report format matches expected template
- Check for required sections
- Identify any structural issues

**Note:** This validate mode performs meta-validation - checking that the gate report itself is complete and properly formatted, not re-running the foundation validation checks.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into report structure using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for report assessment
- **C (Continue)**: Accept artifact load and proceed to validation checks
- **[Specific refinements]**: Describe what you'd like to examine

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: report structure, sections found, preliminary issues
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation context
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review QG-F1 foundation gate report for meta-validation: {summary of report structure and gate decision}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save validation context
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Artifact loaded successfully
- [ ] Validation criteria defined
- [ ] Patterns align with pattern registry

---

## Outputs

- Validation context prepared
- Report structure verified

---

## Next Step

Proceed to `step-21-v-validate.md` to run validation checks against quality criteria.
