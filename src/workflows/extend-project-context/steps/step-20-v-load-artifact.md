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

Load the project-context.md with BAM section for validation.

---

## Prerequisites

- BAM section exists in project-context.md
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---


## Inputs

- Artifact file path for validation
- Quality gate checklist: `{project-root}/_bmad/bam/data/checklists/`
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Project Context

Load `**/project-context.md` from the project.

### 2. Pre-Validation Checks

| Check | Status | Notes |
|-------|--------|-------|
| File exists | ✅/❌ | |
| BAM section present | ✅/❌ | |
| Section structure valid | ✅/❌ | |

### 3. Extract BAM Section

Extract the BAM configuration section for detailed validation.

---

## COLLABORATION MENUS (A/P/C):

After loading the artifact, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure
- **P (Party Mode)**: Bring QA perspectives on validation approach
- **C (Continue)**: Proceed to detailed validation
- **[Specific concerns]**: Describe pre-validation concerns

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: loaded artifact structure, pre-validation status
- Process enhanced insights on validation readiness
- Ask user: "Accept this assessment? (y/n)"
- If yes, document caveats
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review BAM section readiness for validation"
- Process QA perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm artifact loaded
- Proceed to next step: `step-21-v-validate.md`

---

## Verification

- [ ] Project-context.md loaded
- [ ] BAM section extracted
- [ ] Pre-validation checks complete

---

## Outputs

- Loaded BAM section
- Pre-validation status

---

## Next Step

Proceed to `step-21-v-validate.md` for detailed validation.
