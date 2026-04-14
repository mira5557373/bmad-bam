# Step 10: Load Existing (Edit Mode)

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

Load the existing project-context.md with BAM section for editing.

---

## Prerequisites

- Existing BAM section in project-context.md
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-isolation

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Project Context

Load `**/project-context.md` from the project.

### 2. Extract BAM Section

Identify and extract the existing BAM configuration section.

### 3. Present Current Configuration

Display current:
- Tenant model selection
- AI runtime selection
- Tier structure

### 4. Identify Requested Changes

Ask user what changes they want to make to the BAM section.

---

## COLLABORATION MENUS (A/P/C):

After loading the file, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into current BAM configuration
- **P (Party Mode)**: Bring architect perspectives on potential changes
- **C (Continue)**: Accept load and proceed to apply changes
- **[Specific changes]**: Describe specific changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: current BAM section, configuration analysis
- Process enhanced insights on configuration state
- Ask user: "Accept this analysis? (y/n)"
- If yes, document findings
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review current BAM configuration for potential improvements"
- Process architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Confirm changes to make
- Proceed to next step: `step-11-e-apply-changes.md`

---

## Verification

- [ ] Project-context.md loaded
- [ ] BAM section extracted
- [ ] Current configuration displayed
- [ ] Changes identified

---

## Outputs

- Current BAM section content
- List of requested changes

---

## Next Step

Proceed to `step-11-e-apply-changes.md` to apply the changes.
