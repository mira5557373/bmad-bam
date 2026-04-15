# Step 11: Apply Changes

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

Apply the identified modifications to the pricing tier design.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Actions

### 1. Apply Tier Changes

If modifying tier structure:
- Update tier definitions
- Validate entitlement consistency
- Document migration path

### 2. Apply Feature Changes

If modifying feature gating:
- Update entitlement mappings
- Validate cache invalidation
- Test gate behaviors

### 3. Apply Pricing Changes

If modifying pricing:
- Create new price version
- Configure grandfathering
- Plan migration

### 4. Validate Consistency

Ensure changes maintain consistency across all sections.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring analyst and architect perspectives
- **C (Continue)**: Accept changes and complete edit mode
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

---

## Verification

- [ ] All identified changes applied
- [ ] Cross-section consistency maintained
- [ ] Documentation updated

---

## Outputs

- Updated design documents
- Change summary report

---

## Next Step

Edit mode complete. Recommend running Validate mode.
