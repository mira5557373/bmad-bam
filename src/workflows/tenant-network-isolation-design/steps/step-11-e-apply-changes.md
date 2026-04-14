# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- NEVER generate content without user input - Wait for explicit direction
- CRITICAL: ALWAYS read the complete step file before taking any action
- ALWAYS pause after presenting findings and await user direction

## EXECUTION PROTOCOLS

- Show your analysis before taking any action
- Update document frontmatter after each section completion
- Track progress in `stepsCompleted` array

---

## Purpose

Apply the identified modifications to the existing network isolation design document.

---

## Prerequisites

- Step 10: Load Existing Artifact completed
- Modification targets confirmed

---

## Actions

### 1. Apply Modifications

For each confirmed modification target:
- Present proposed changes
- Get user confirmation
- Apply changes maintaining document consistency
- Update related sections if dependencies exist

### 2. Validate Consistency

After applying changes:
- Check cross-references between sections
- Verify security group consistency
- Confirm VPC peering alignment
- Validate traffic isolation rules

### 3. Document Changes

Record all modifications:
- Changed sections
- Reason for changes
- Impact on dependent configurations

---

## COLLABORATION MENUS (A/P/C):

After applying the changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change implications
- **P (Party Mode)**: Bring security perspectives for change validation
- **C (Continue)**: Finalize changes and save document
```

#### If 'C' (Continue):
- Save updated document
- Update frontmatter `stepsCompleted: [10, 11]`
- Complete Edit mode

---

## Verification

- [ ] All modifications applied
- [ ] Document consistency verified
- [ ] Cross-references updated
- [ ] Change log documented

---

## Outputs

- Updated network isolation design document
- Diff summary of applied changes

---

## Workflow Complete

Edit mode complete for tenant-network-isolation-design workflow.
