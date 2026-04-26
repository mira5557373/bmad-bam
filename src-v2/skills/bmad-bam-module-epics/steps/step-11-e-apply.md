# Step 11: Apply Targeted Modifications (Edit Mode)

## MANDATORY EXECUTION RULES (READ FIRST)

- 🛑 **NEVER generate content without user input** - Wait for explicit direction
- 📖 **CRITICAL: ALWAYS read the complete step file** before taking any action
- 🔄 **CRITICAL: When loading next step with 'C'**, ensure entire file is read
- ⏸️ **ALWAYS pause after presenting findings** and await user direction
- 🎯 **Focus ONLY on current step scope** - do not look ahead
- ✅ **Validate consistency** after applying changes
- 📋 **Maintain tenant context** in all modifications

## EXECUTION PROTOCOLS

- 🎯 Focus: Apply targeted modifications to epic document
- 💾 Track: `stepsCompleted: [10, 11]` when complete
- 📖 Context: Incremental updates preserving document integrity
- 🚫 Do NOT: Regenerate entire document; apply targeted changes only
- ⚠️ Verify: Sprint allocation remains consistent after changes

---

## Purpose

Apply the identified changes to the existing epic document. Changes are applied incrementally while preserving document structure, maintaining tenant context in all stories, updating sprint allocation as needed, and ensuring consistency across all sections.

---

## Prerequisites

- Step 10 (Load Existing Document) completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: epic-*

---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## YOUR TASK

Apply requested changes to the epic document while maintaining consistency. Update version, change log, and related sections as needed.

---

## Main Sequence

Based on the user's requested changes, follow the appropriate modification process:

### Adding New Epic

1. Load current epic list
2. Determine next epic ID: E-{module}-{next_number}
3. Apply epic structure from Step 02 template:

```markdown
### E-{module}-{number}: {New Epic Title}

**Category:** {Core/Integration/Infrastructure/AI}
**Priority:** {P1/P2/P3}
**User Value:** {what users accomplish}

**Acceptance Criteria:**
- [ ] {AC-001}
- [ ] {AC-002}
- [ ] **TENANT:** {tenant criteria}

**Multi-Tenant Considerations:**
- Tenant Model: {tenant_model}
- Data Isolation: {isolation approach}
- Tier Availability: {tiers}
```

4. Update epic count in executive summary
5. Add stories for new epic (follow story template)

| Epic Added | ID | Category | Stories | Points |
|------------|-----|----------|---------|--------|
| {title} | E-{module}-{number} | {category} | {count} | {pts} |

### Adding Stories to Epic

1. Load target epic
2. Determine next story ID: S-{module}-{epic}-{next_number}
3. Apply story structure with tenant context:

```markdown
#### S-{module}-{epic}-{number}: {Story Title}

**User Story:**
As a **{user_role}** in tenant **{tenant_type}**,
I want to **{action}**
So that **{business_value}**

**Tenant Context:**
- Tenant Scope: tenant-scoped
- Tier Availability: {tiers}
- Data Isolation: {model}

**Acceptance Criteria:**
- [ ] {criteria}
- [ ] **TENANT:** Data scoped to requesting tenant

**Story Points:** {points}
**Priority:** {priority}
**Sprint:** {sprint}
```

4. Update story counts and point totals
5. Recalculate sprint allocation

| Story Added | Epic | Points | Sprint |
|-------------|------|--------|--------|
| S-{module}-{epic}-{number} | E-{module}-{epic} | {pts} | Sprint {n} |

### Modifying Existing Epic

1. Load target epic section
2. Apply requested changes
3. Update affected fields:

| Field Changed | Previous | New |
|---------------|----------|-----|
| {field} | {old_value} | {new_value} |

4. Verify acceptance criteria still complete
5. Verify stories still aligned with epic

### Modifying Existing Story

1. Load target story section
2. Apply requested changes:

| Field Changed | Previous | New |
|---------------|----------|-----|
| Title | {old} | {new} |
| Points | {old} | {new} |
| Priority | {old} | {new} |
| Sprint | {old} | {new} |

3. **CRITICAL:** Verify tenant context preserved:

| Check | Status |
|-------|--------|
| Tenant scope defined | YES/NO |
| Tier availability specified | YES/NO |
| Tenant acceptance criteria present | YES/NO |

4. Recalculate totals if points changed

### Re-allocating Sprint Assignment

1. Load sprint allocation section
2. Move stories between sprints:

| Story | From Sprint | To Sprint |
|-------|-------------|-----------|
| S-{module}-{epic}-{number} | Sprint {n} | Sprint {m} |

3. Recalculate sprint totals:

| Sprint | Previous Points | New Points | Change |
|--------|-----------------|------------|--------|
| Sprint 1 | {old} | {new} | {+/-} |
| Sprint 2 | {old} | {new} | {+/-} |

4. Verify capacity constraints:

| Sprint | Points | Capacity | Status |
|--------|--------|----------|--------|
| Sprint 1 | {pts} | {cap} | OK/Over |
| Sprint 2 | {pts} | {cap} | OK/Over |

### Updating Done Criteria

1. Load done criteria section
2. Apply requested changes:

| Criteria Changed | Previous | New |
|------------------|----------|-----|
| {criterion} | {old} | {new} |

3. Verify quality gate mappings still valid
4. Verify test coverage thresholds appropriate

### Removing Epic or Story

1. Identify removal target
2. Document removal:

| Removed | ID | Reason |
|---------|-----|--------|
| Epic | E-{module}-{number} | {reason} |
| Story | S-{module}-{epic}-{number} | {reason} |

3. Update all counts and totals
4. Re-allocate affected sprint capacity
5. Update dependency mappings

---

## Validation After Changes

Before saving, verify:

- [ ] All epic sections present
- [ ] All stories have tenant context
- [ ] Sprint allocation consistent
- [ ] Point totals accurate
- [ ] Dependencies still valid
- [ ] Done criteria complete
- [ ] Version number incremented
- [ ] Change log updated

### Change Summary

Present a diff summary of changes made:

| Section | Change Type | Details |
|---------|-------------|---------|
| Epics | Added/Modified/Removed | {details} |
| Stories | Added/Modified/Removed | {details} |
| Sprint Allocation | Modified | {details} |
| Done Criteria | Modified | {details} |

### Document Updates

Update document metadata:

```yaml
# Updated metadata
version: {incremented_version}
last_modified: {current_date}
stepsCompleted: [1, 2, 3, 4, 5, 10, 11]
```

Add to change log:

```markdown
| {next_version} | {current_date} | {author} | {change_summary} |
```

### Save Document

Write updated document to:
```
{output_folder}/planning-artifacts/modules/{module}/epics.md
```

---

## SUCCESS METRICS

- ✅ All requested changes applied
- ✅ Tenant context preserved in all stories
- ✅ Sprint allocation consistent
- ✅ Point totals accurate
- ✅ Version incremented
- ✅ Change log updated
- ✅ Document saved successfully

---

## FAILURE MODES

| Failure | Recovery |
|---------|----------|
| Sprint over capacity | Rebalance or add sprint |
| Missing tenant context | Add tenant context to affected stories |
| Inconsistent totals | Recalculate from source data |
| Dependency conflict | Update dependency mappings |

---

## Verification

- [ ] Changes applied correctly
- [ ] No unintended side effects
- [ ] All tenant context preserved
- [ ] Sprint allocation valid
- [ ] Document saved to correct location
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated `epics.md`
- Change summary

---

## WORKFLOW COMPLETE

Edit mode complete. Options:

- **Run Validate mode:** Verify modified document meets criteria
- **Return to Edit mode:** Make additional changes
- **Continue to development:** Use updated epics for sprint execution

---

## Related Workflows

Based on edit completion, consider:

- `bmad-bam-module-epics` Validate mode - Verify epic document
- `bmad-bam-cross-module-story` - Update cross-module dependencies
- Sprint execution - Begin implementation with updated plan

---

## NEXT STEP

Edit mode complete. Recommended next actions:

- **Run Validate mode:** Verify changes meet quality criteria
- **Return to workflow selection:** Choose next planning task
- **Proceed to development:** Start sprint execution
