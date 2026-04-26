# Step 11: Apply Changes

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead

## EXECUTION PROTOCOLS

- 🎯 Show your analysis before taking any action
- 💾 Update document frontmatter after each section completion
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
