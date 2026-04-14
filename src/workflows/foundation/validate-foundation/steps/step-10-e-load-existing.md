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

Load and review existing foundation gate report to identify validation modifications needed.

---

## Prerequisites

- Existing foundation gate report to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: testing-isolation

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Load the existing foundation gate report and validation artifacts:

- `{output_folder}/planning-artifacts/foundation-gate-report.md`
- `{output_folder}/sprint-status.yaml` (foundation section)

If the gate report does not exist, inform the user and suggest switching to Create mode to perform initial validation.

Parse and display a summary of the current validation state:

- Previous gate decision (PASS / CONDITIONAL / FAIL)
- Date of last validation
- Category results from previous run
- Outstanding gaps or mitigation items
- Recovery attempt count (if applicable)

### CONDITIONAL Pass Review

If previous result was CONDITIONAL:
- Check if mitigation deadline has passed
- Review status of non-critical gaps
- Determine if gaps have been addressed

### FAIL Recovery Review

If previous result was FAIL:
- Check recovery attempt count
- Review locked categories (should not re-test)
- Identify failed categories requiring re-validation
- Load salvage report if available

Confirm with the user what modifications to the validation are needed:

1. Re-run specific categories only
2. Update mitigation plan
3. Add new findings
4. Update recovery status

---

## COLLABORATION MENUS (A/P/C):

After loading and reviewing the existing artifact above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into validation state using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for modification analysis
- **C (Continue)**: Accept modification scope and proceed to apply changes
- **[Specific refinements]**: Describe what modifications you'd like to make

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current gate status, outstanding gaps, recovery state
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into modification scope
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review existing QG-F1 foundation gate report for modifications: {summary of current state and proposed changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save modification scope summary
- Update frontmatter `stepsCompleted: [10]`
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Gate report loaded successfully
- [ ] Validation state understood
- [ ] Modifications identified
- [ ] Patterns align with pattern registry

---

## Outputs

- Summary of current validation state
- List of validation modifications needed

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modifications.
