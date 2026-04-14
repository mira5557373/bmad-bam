# Step 20: Load Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Track progress in `stepsCompleted` array

---

## Purpose

Load the Usage Alerts artifacts for validation.

---

## Prerequisites

- Usage alerts design has been executed (Create mode completed)
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: usage-metering

---

## Actions

Load: `{output_folder}/planning-artifacts/billing/usage-alerts-design.md`

Parse and validate structure.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into artifact structure
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to validation checks

Select an option:
```

---

## Verification

- [ ] Artifact loaded successfully
- [ ] All required sections present

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to Step 21: Validate Usage Alerts Design.
