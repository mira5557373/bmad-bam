# Step 2: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- STOP **NEVER generate content without user input** - Wait for explicit direction
- READ **CRITICAL: ALWAYS read the complete step file** before taking any action
- LOAD **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- PAUSE **ALWAYS pause after presenting findings** and await user direction
- FOCUS **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- TARGET Show your analysis before taking any action
- SAVE Update document frontmatter after each section completion
- NOTES Maintain append-only document building
- CHECK Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing analytics dashboard specification. Changes are applied incrementally while preserving tenant data isolation consistency, visualization standards, and access control integrity.

---

## Prerequisites

- Step 10 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: analytics,dashboard

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Requested Changes

- Process modifications as specified
- Maintain document consistency
- Preserve unchanged sections

### 2. Validate Changes

- Verify modifications are correct
- Check for unintended side effects
- Validate cross-references

### 3. Update Metadata

- Update document timestamps
- Record change history
- Update version numbers

---

## Modification Process

Based on the user's requested changes:

1. Identify the affected sections in the analytics dashboard specification
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Tenant data isolation consistency
   - Data aggregation level integrity
   - Visualization design standards
   - Access control policies
4. If modifying analytics requirements, verify:
   - KPI definitions are consistent
   - Data sources are still valid
   - Metrics align with reporting needs
5. If modifying data architecture, verify:
   - Aggregation levels are consistent
   - Tenant partitioning is maintained
   - Processing pipelines are updated
6. If modifying access control, verify:
   - RBAC matrix is complete
   - RLS policies are consistent
   - Audit logging covers new access points
7. Validate the modified documents against completeness criteria
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific changes or their implications
- **P (Party Mode)**: Bring data architect and security perspectives on applied modifications
- **C (Continue)**: Accept applied changes and finalize updated analytics specification
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, data consistency, access control impact
- Process enhanced insights on change implications
- Ask user: "Accept this detailed change analysis? (y/n)"
- If yes, integrate into final specification
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to analytics dashboard specification"
- Process data architect and security perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated analytics dashboard specification
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Tenant data isolation consistent
- [ ] Access control policies valid
- [ ] Cross-references updated

---

## Outputs

- Updated analytics dashboard specification
- Change summary document

---

## Next Step

Run analytics validation to verify changes against completeness criteria.
