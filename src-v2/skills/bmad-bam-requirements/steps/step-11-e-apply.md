# Step 11: Apply Changes to Requirements Analysis

## MANDATORY EXECUTION RULES

- 🛑 NEVER apply changes that break requirement traceability
- 📖 ALWAYS validate changes against QG-PL1 critical checks before applying
- 🔄 ALWAYS preserve document structure and unmodified sections
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- ✅ UPDATE frontmatter version after any successful edit
- 📋 DOCUMENT change rationale in Change Log section
- 💬 PRESENT diff summary before final save
- ⚠️ FLAG if changes require QG-PL1 re-validation
- 🔒 PRESERVE requirement ID assignments to maintain traceability

---

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply user-requested changes while maintaining consistency
- 💾 Track: Changes applied, version increment, QG-PL1 impact
- 📖 Context: Preserve all unmodified content exactly
- 🚫 Do NOT: Auto-modify unrelated sections or reassign requirement IDs
- ⚠️ Gate: Module mapping changes require re-validation
- 🔍 Use web search: If user requests updated requirements patterns

---

## YOUR TASK

Apply the user's requested changes to the requirements analysis document, validate traceability across all requirement categories, update document metadata, and present a summary of modifications with any re-validation requirements.

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

### Change Summary

Present changes in diff format for user review:

```
================================================================================
REQUIREMENTS ANALYSIS EDIT SUMMARY
================================================================================
Document: requirements-analysis.md
Previous Version: {old_version}
New Version: {new_version}
================================================================================

CHANGES APPLIED:

[Requirement Changes]
{list of requirement additions/modifications/removals}

[Module Mapping Changes]
{list of module assignment changes}

[Traceability Changes]
{list of traceability updates}

================================================================================
VALIDATION STATUS:

QG-PL1 Status: {PASS|CONDITIONAL|PENDING}
Re-validation Required: {Yes/No}
{if yes: Run `bmad-bam-requirements` Validate mode (step-20-v-*)}

================================================================================
[S] Save changes to {output_folder}/planning-artifacts/requirements-analysis.md
[R] Review changes before saving
[U] Undo and return to edit selection
================================================================================
```

---

## SUCCESS METRICS

- ✅ All requested changes captured and validated
- ✅ Requirement ID assignments preserved
- ✅ Traceability matrix updated correctly
- ✅ Module mappings consistent
- ✅ Frontmatter version incremented
- ✅ Change Log updated with modification summary
- ✅ Document saved to correct location
- ✅ Re-validation requirements communicated
- ✅ Stakeholder notification list generated

---

## FAILURE MODES

- ❌ **Traceability break:** Block change, require source/test linkage before saving
- ❌ **Orphaned requirement:** Require module assignment before saving
- ❌ **Duplicate requirement ID:** Reassign ID with user confirmation
- ❌ **Module not found:** Clarify module name or create module reference
- ❌ **Save failure:** Retry with backup to alternate location

---

## Verification

- [ ] All requested changes applied
- [ ] Document consistency maintained
- [ ] Statistics updated correctly
- [ ] Traceability matrix updated
- [ ] Dependencies preserved
- [ ] Change history recorded
- [ ] Patterns align with pattern registry
- [ ] Module assignments valid
- [ ] Requirement IDs unique

---

## Outputs

- Updated requirements analysis document
- Change summary log
- Updated supporting artifacts (if applicable)

---

## NEXT STEP

Edit mode complete.

**If QG-PL1 status is PENDING:**
Run validation workflow: `step-20-v-load.md` through `step-22-v-report.md`

**If QG-PL1 status is PASS or CONDITIONAL:**
Proceed to architecture workflows or downstream planning.
