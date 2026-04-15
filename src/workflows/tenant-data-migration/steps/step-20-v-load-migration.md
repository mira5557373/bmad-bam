# Step 20: Load Migration Plan for Validation

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

Load the migration plan artifacts for validation against quality criteria. This ensures the migration design is complete, consistent, and executable before scheduling the actual migration.

---

## Prerequisites

- Migration plan has been created (Create mode completed) or updated (Edit mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: disaster-recovery`

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Migration Plan

Load the existing migration plan document:
- `{output_folder}/planning-artifacts/migration-runbook.md`

### 2. Pre-Validation Checks

Before proceeding, verify the following conditions:
- File exists at the specified path
- File is readable and contains valid markdown
- All required sections are present
- No placeholder content remaining

### 3. Expected Document Structure

The migration-runbook.md should contain:

| Section | Required | Description |
|---------|----------|-------------|
| Migration Scope | Yes | Source/target environments, data volumes |
| Strategy Selection | Yes | Big bang/phased/dual-write with rationale |
| Phase Definitions | Yes | Ordered phases with dependencies |
| Pre-Migration Checklist | Yes | Validation steps before starting |
| Execution Procedures | Yes | Step-by-step commands for each phase |
| Verification Checkpoints | Yes | Success criteria for each phase |
| Rollback Procedures | Yes | Rollback steps for each phase |
| Communication Plan | Yes | Stakeholder notifications |
| Emergency Contacts | Yes | Escalation path |
| Change Log | Optional | History of modifications |

### 4. Error Handling

If the file does not exist:
- Inform the user that there is no artifact to validate
- Suggest switching to Create mode

If required sections are missing:
- List missing sections
- Suggest returning to Create or Edit mode to complete

---

## COLLABORATION MENUS (A/P/C):

After loading the migration plan, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into document structure and completeness
- **P (Party Mode)**: Bring analyst and architect perspectives for initial review
- **C (Continue)**: Proceed to detailed validation checks
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass document context: sections present, initial structure assessment
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into validation preparation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration plan structure: {summary of sections and completeness}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm document loaded successfully
- Update frontmatter `stepsCompleted: [20]`
- Proceed to next step: `step-21-v-validate-migration.md`

---

## Verification

- [ ] Migration plan artifact exists
- [ ] All required sections present
- [ ] Document structure matches expected format
- [ ] No placeholder content remaining
- [ ] Phase definitions are complete
- [ ] Patterns align with pattern registry

---

## Outputs

- Loaded migration plan ready for validation
- Initial structure assessment

---

## Next Step

Proceed to `step-21-v-validate-migration.md` to perform detailed quality criteria checks.
