# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

Load the existing usage alerts documents for modification.

---

## Prerequisites

- Existing usage alerts documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: usage-metering

---

## Actions

Load: `{output_folder}/planning-artifacts/billing/usage-alerts-design.md`

Parse and display summary. Confirm modification scope with user.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to apply changes

Select an option:
```

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Modification scope confirmed with user

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-11-e-apply-changes.md`.
