# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- :stop_sign: **NEVER generate content without user input** - Wait for explicit direction
- :open_book: **CRITICAL: ALWAYS read the complete step file** before taking any action
- :arrows_counterclockwise: **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- :pause_button: **ALWAYS pause after presenting findings** and await user direction
- :dart: **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- :dart: Show your analysis before taking any action
- :floppy_disk: Update document frontmatter after each section completion
- :pencil: Maintain append-only document building
- :white_check_mark: Track progress in `stepsCompleted` array

---

## Purpose

Apply targeted modifications to the requirements analysis document based on user requirements. This step handles additions, updates, and removals while maintaining document consistency.

---

## Prerequisites

- Step 10 completed (Load Existing)
- Modification targets identified
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: `requirements`

---

## Inputs

- Loaded artifact from Step 10
- Confirmed modification targets
- User change requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

Apply the identified modifications based on the target section:

### For Requirement Additions:

```yaml
requirement_addition:
  workflow:
    1. Assign unique ID following naming convention
    2. Capture source documentation
    3. Assign to appropriate category
    4. Map to target module
    5. Calculate priority score
    6. Update traceability matrix
    7. Recalculate statistics
    
  example:
    id: FR-{next_number}
    description: "{new requirement}"
    source: "{source document}"
    category: functional
    module: "{target module}"
    priority: "{calculated score}"
    added_date: "{date}"
    added_by: "{author}"
```

### For Requirement Updates:

```yaml
requirement_update:
  workflow:
    1. Load existing requirement by ID
    2. Track original values
    3. Apply modifications
    4. Update revision history
    5. Check for dependency impacts
    6. Update affected sections
    7. Recalculate if priority factors changed
    
  change_tracking:
    requirement_id: "{id}"
    field_changed: "{field}"
    original_value: "{old value}"
    new_value: "{new value}"
    change_reason: "{reason}"
    changed_date: "{date}"
    changed_by: "{author}"
```

### For Requirement Removals:

```yaml
requirement_removal:
  workflow:
    1. Verify no dependencies on requirement
    2. Capture removal justification
    3. Archive requirement (don't delete)
    4. Update module assignments
    5. Update traceability matrix
    6. Update cross-module requirements
    7. Recalculate statistics
    
  archive_entry:
    requirement_id: "{id}"
    removal_reason: "{justification}"
    dependencies_checked: true
    removed_date: "{date}"
    removed_by: "{author}"
```

### For Categorization Changes:

- Update category assignments
- Verify category criteria alignment
- Update category statistics
- Check for cross-category dependencies

### For Module Mapping Changes:

- Update module assignments
- Recalculate module complexity
- Update dependency graph
- Verify cross-module requirements

### For Gap Analysis Updates:

- Add newly identified gaps
- Close resolved gaps with resolution notes
- Update gap severity if changed
- Link gaps to requirements

### For Stakeholder Sign-off Updates:

- Record sign-off decisions
- Track approval dates
- Note any conditions or caveats
- Update approval statistics

### Change Summary

Present changes in diff format for user review:

```yaml
change_summary:
  additions:
    - type: requirement
      id: FR-025
      description: "{description}"
      
  modifications:
    - type: requirement
      id: FR-005
      field: priority
      from: P2
      to: P1
      
  removals:
    - type: requirement
      id: FR-012
      reason: "Superseded by FR-025"
      archived: true
      
  cascading_updates:
    - section: module_mapping
      change: "Added FR-025 to tenant-management"
      
    - section: statistics
      change: "Functional requirements: 24 -> 25"
```

---

## COLLABORATION MENUS (A/P/C):

After applying changes above, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into additional changes using discovery protocols
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and save updated document
- **[Specific refinements]**: Describe additional modifications needed

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications made, potential impact areas
- Process enhanced insights from deep questioning
- Ask user: "Accept these additional changes? (y/n)"
- If yes, apply additional modifications
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review applied changes to requirements document: {summary of changes}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated document
- Update frontmatter `stepsCompleted: [10, 11]`
- Update version number
- Output to `{output_folder}/planning-artifacts/requirements-analysis.md`

---

## Verification

- [ ] All requested changes applied
- [ ] Document consistency maintained
- [ ] Statistics updated correctly
- [ ] Traceability matrix updated
- [ ] Dependencies preserved
- [ ] Change history recorded
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated requirements analysis document
- Change summary log
- Updated supporting artifacts (if applicable)

---

## Edit Mode Complete

The requirements analysis document has been updated and saved.

### Post-Edit Actions

1. **Validate:** Run Validate mode to ensure document integrity
2. **Review:** Share changes with stakeholders
3. **Downstream:** Update dependent artifacts if architecture work has begun
