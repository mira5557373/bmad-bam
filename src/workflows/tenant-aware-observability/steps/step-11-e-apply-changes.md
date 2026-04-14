# Step 2: Apply Targeted Modifications

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
- 📝 Maintain append-only document building
- ✅ Track progress in `stepsCompleted` array

---

## Purpose

This step applies the identified changes to the existing observability design artifacts. Changes are applied incrementally while preserving tenant dimension consistency across signals, maintaining metric cardinality management, and ensuring log context injection and trace propagation patterns remain valid.

---

## Prerequisites

- Step 01 completed with identified changes
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: observability



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

---

## Modification Process

Based on the user's requested changes:

1. Identify the affected sections in the observability documents
2. Present the current content of each affected section
3. Apply the requested modifications while preserving:
   - Tenant dimension consistency across signals
   - Metric cardinality management
   - Log context injection patterns
   - Trace propagation chain
4. If modifying tenant dimensions, verify:
   - All signals (metrics, logs, traces) are updated consistently
   - Cardinality impact is assessed
   - Propagation rules are updated
5. If modifying metric aggregation, verify:
   - Pre-aggregation rules are consistent
   - Retention policies are maintained
   - Tenant isolation is preserved
6. If modifying dashboards, verify:
   - Access control is maintained
   - Tenant filtering is applied correctly
   - Query performance is acceptable
7. Validate the modified documents against completeness criteria
8. Write updated documents back to their original locations

Present a diff summary of changes made and ask for confirmation.

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into specific changes or their implications
- **P (Party Mode)**: Bring SRE and platform architect perspectives on applied modifications
- **C (Continue)**: Accept applied changes and finalize updated observability configuration
- **[Specific refinements]**: Describe additional changes needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass context: changes applied, dimension consistency, cardinality impact
- Process enhanced insights on change implications
- Ask user: "Accept this detailed change analysis? (y/n)"
- If yes, integrate into final configuration
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied modifications to observability configuration"
- Process SRE and platform architect perspectives
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated observability documents
- Update frontmatter `stepsCompleted: [10, 11]`
- Edit mode complete

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] Patterns align with pattern registry
- [ ] Tenant dimensions consistent across signals
- [ ] Cardinality impact assessed

---

## Outputs

- Updated observability design documents
- Updated dashboard specifications (if affected)
- Updated alert rules (if affected)

---

## Next Step

Run observability validation to verify changes against completeness criteria.
