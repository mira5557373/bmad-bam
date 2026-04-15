# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- **NEVER generate content without user input** - Wait for explicit direction
- **CRITICAL: ALWAYS read the complete step file** before taking any action
- **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- **ALWAYS pause after presenting findings** and await user direction
- **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Maintain append-only document building
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the revenue recognition design while maintaining ASC 606 compliance.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: billing-integration

---

## Inputs

- Loaded artifact from step 10
- Confirmed modification list
- Pattern registry for validation

---

## Actions

### 1. Apply Contract Changes

If modifying contract identification:
- Update contract attributes
- Validate ASC 606 criteria
- Document effective dates

### 2. Apply Obligation Changes

If modifying performance obligations:
- Update obligation mappings
- Re-evaluate distinctness
- Adjust recognition methods

### 3. Apply Allocation Changes

If modifying price allocation:
- Update SSP methods
- Recalculate allocations
- Document rationale

### 4. Apply Scheduling Changes

If modifying revenue scheduling:
- Update timing rules
- Reconfigure period processing
- Validate calculations

### 5. Validate ASC 606 Compliance

Ensure changes maintain compliance with all five steps.

---

## COLLABORATION MENUS (A/P/C):

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and complete edit mode
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

---

## Verification

- [ ] All identified changes applied
- [ ] ASC 606 compliance maintained
- [ ] Cross-section consistency verified
- [ ] Documentation updated
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated revenue recognition design
- Change log documenting modifications
- Compliance verification notes

---

## Next Step

Edit mode complete. Recommend running Validate mode to verify compliance.
