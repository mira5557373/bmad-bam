# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Validate compliance consistency** after applying changes

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to offboarding design
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving design integrity
- 🚫 Do NOT: Regenerate entire design; apply targeted changes only

---

## Purpose

Apply the identified changes to the existing offboarding design. Changes are applied incrementally while preserving design integrity, maintaining compliance, and ensuring consistency across all related sections.

---

## Prerequisites

- Step 10 (Load Existing Design) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: tenant-lifecycle

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK:

Apply requested changes to the offboarding design while maintaining consistency.

---

## Apply Sequence

### Modification Process

Based on the user's requested changes:

#### Updating Offboarding Triggers

1. Load current triggers section
2. Add/remove/modify trigger types
3. Update grace periods for affected triggers
4. Verify state machine reflects changes
5. Update notification templates if needed

| Trigger | Previous | New | Impact |
|---------|----------|-----|--------|
| {{trigger}} | {{prev}} | {{new}} | {{impact}} |

#### Updating Export Process

1. Load current export section
2. Modify formats/delivery as requested
3. Update verification checksums
4. Ensure cross-module collection remains valid
5. Update manifest schema if needed

| Component | Previous | New | Impact |
|-----------|----------|-----|--------|
| {{component}} | {{prev}} | {{new}} | {{impact}} |

#### Updating Grace Period Configuration

1. Load current grace period section
2. Adjust tier-specific periods
3. Update soft delete fields if needed
4. Verify notification schedule aligns
5. Check reactivation eligibility rules

| Tier | Previous | New | Rationale |
|------|----------|-----|-----------|
| {{tier}} | {{prev}} days | {{new}} days | {{rationale}} |

#### Updating Hard Deletion Process

1. Load current deletion section
2. Modify purge sequence as needed
3. Update storage cleanup procedures
4. Verify foreign key handling
5. Ensure audit preservation maintained

| Phase | Previous | New | Impact |
|-------|----------|-----|--------|
| {{phase}} | {{prev}} | {{new}} | {{impact}} |

#### Updating Compliance Requirements

1. Load current compliance section
2. Add/modify compliance frameworks
3. Update verification checklists
4. Modify deletion certificate if needed
5. Verify audit retention aligns

| Framework | Previous | New | Changes |
|-----------|----------|-----|---------|
| {{framework}} | {{prev}} | {{new}} | {{changes}} |

#### Updating Rollback Procedures

1. Load current rollback section
2. Modify recovery methods
3. Update time windows
4. Verify backup integration
5. Test recovery scenarios

| Scenario | Previous | New | Window |
|----------|----------|-----|--------|
| {{scenario}} | {{prev}} | {{new}} | {{window}} |

### Validation After Changes

Before saving, verify:

- [ ] All changes internally consistent
- [ ] State machine reflects modifications
- [ ] Compliance requirements still met
- [ ] Grace periods align with tier value
- [ ] Deletion sequence respects dependencies
- [ ] Notification schedule updated
- [ ] Version number incremented
- [ ] Change log updated

### Cross-Reference Verification

Ensure changes don't break related sections:

| Source Section | Dependent Section | Consistency |
|----------------|-------------------|-------------|
| Grace periods | Notification schedule | {{status}} |
| Export formats | Manifest schema | {{status}} |
| Triggers | State machine | {{status}} |
| Deletion sequence | Foreign keys | {{status}} |
| Compliance | Audit retention | {{status}} |

### Change Summary

Present a diff summary of changes made:

| Section | Change Type | Details |
|---------|-------------|---------|
| Triggers | Modified | {{details}} |
| Export | No Change | - |
| Grace Period | Updated | {{details}} |
| Deletion | Modified | {{details}} |
| Compliance | No Change | - |
| Rollback | Updated | {{details}} |

### Output

Write updated document to:
```
{output_folder}/planning-artifacts/tenant-offboarding-design.md
```

Update document metadata:
- Version: Increment
- Last Modified: Current date
- Change Log: Add entry

---

## SUCCESS METRICS:

- [ ] All requested changes applied
- [ ] Design remains internally consistent
- [ ] Compliance requirements still met
- [ ] State machine updated (if needed)
- [ ] Version incremented
- [ ] Change log updated
- [ ] Document saved successfully

---

## FAILURE MODES:

| Failure | Recovery |
|---------|----------|
| Compliance conflict | Re-verify against frameworks |
| State machine inconsistency | Update all affected transitions |
| Missing dependencies | Add required sections |
| Foreign key violation | Reorder deletion sequence |

---

## Verification

- [ ] Changes identified correctly
- [ ] No unintended side effects
- [ ] All sections consistent
- [ ] Compliance maintained
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `tenant-offboarding-design.md`
- Change summary

---

## NEXT STEP:

Edit mode complete. Options:
- Run validation mode to verify changes
- Return to workflow selection
- Proceed to implementation if design approved
