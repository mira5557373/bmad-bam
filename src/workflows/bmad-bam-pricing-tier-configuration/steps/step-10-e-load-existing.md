# Step 10: Load Existing Artifact

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Load the existing pricing tier documents for modification.

---

## Prerequisites

- Existing pricing tier documents to modify
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

Load the existing documents:
- `{output_folder}/planning-artifacts/billing/pricing-tier-design.md`

Parse and display summary. Confirm modification scope with user.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into modification requirements
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Proceed to apply changes
- **[Specific refinements]**: Describe what sections you want to modify

Select an option:
```

---

## Verification

- [ ] Existing artifacts loaded successfully
- [ ] Document structure parsed correctly
- [ ] Modification scope confirmed with user

---

## Outputs

- Loaded document content
- Parsed document structure
- Modification/validation targets identified

---

## Next Step

Proceed to `step-11-e-apply-changes.md` with identified modification targets.
