# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **ALWAYS pause after presenting findings** and await user direction

---

## Purpose

Load the existing billing disputes documents for modification.


## Prerequisites

- Previous step requirements met
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-disputes
---

## Actions

Load: `{output_folder}/planning-artifacts/billing/billing-disputes-design.md`

Parse and display summary. Confirm modification scope with user.

---

## Outputs

- Loaded billing disputes documents
- Parsed document structure
- Modification targets identified

---

## Verification

- [ ] Documents loaded successfully
- [ ] Structure parsed correctly
- [ ] Modification targets identified
- [ ] No errors or warnings

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

## Next Step

Proceed to `step-11-e-apply-changes.md`.
