# Step 10: Load Migration State (Edit Mode)

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

Load the migration state to resume a partial migration.

---

## Prerequisites

- Partial migration in progress
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv`

---


## Inputs

- Existing artifact file path
- User-specified modifications or update requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Load Migration Report

Load existing migration report from `{output_folder}/planning-artifacts/migration-report.md`.

### 2. Analyze Migration State

Determine:
- Which steps completed
- Which files transformed
- What remains to migrate

### 3. Present Current State

Show migration progress and remaining work.

---

## COLLABORATION MENUS (A/P/C):

After loading migration state, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into migration state
- **P (Party Mode)**: Bring perspectives on resumption approach
- **C (Continue)**: Resume migration from current state
- **[Specific concerns]**: Describe concerns about state

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'C' (Continue):
- Confirm state loaded
- Proceed to next step: `step-11-e-resume-migration.md`

---

## Verification

- [ ] Migration report loaded
- [ ] State analyzed
- [ ] Remaining work identified

---

## Outputs

- Migration state summary
- Resume point identified

---

## Next Step

Proceed to `step-11-e-resume-migration.md` to resume migration.
