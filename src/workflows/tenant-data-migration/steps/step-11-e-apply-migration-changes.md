# Step 11: Apply Changes to Migration Plan

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

Apply targeted modifications to the existing migration plan based on the changes identified in the load step.

---

## Prerequisites

- Step 10: Load Existing Migration Plan completed
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: tenant-lifecycle`
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv → filter: event-driven`

---


## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Scope Changes (if applicable)

If modifying migration scope:

| Change Type | Action | Impact Analysis |
|-------------|--------|-----------------|
| Add data category | Add to dependency matrix | Update phase procedures |
| Remove data category | Remove from scope | Simplify procedures |
| Change data volume | Update estimates | Adjust timing, strategy |
| New constraints | Add to constraint analysis | Re-evaluate strategy |

### 2. Apply Strategy Changes (if applicable)

If changing migration strategy:

| From | To | Required Updates |
|------|-----|-----------------|
| Big Bang | Phased | Add phase boundaries, sync logic |
| Big Bang | Dual-Write | Add sync mechanism, traffic routing |
| Phased | Big Bang | Consolidate phases, increase downtime |
| Phased | Dual-Write | Add continuous sync |
| Dual-Write | Phased | Remove sync, add phase boundaries |
| Dual-Write | Big Bang | Remove sync, consolidate |

Ensure all downstream sections are updated to reflect strategy change.

### 3. Apply Phase Changes (if applicable)

If modifying phases:

| Change Type | Validation |
|-------------|------------|
| Add phase | Dependencies defined, rollback added |
| Remove phase | Dependents updated, no orphaned steps |
| Reorder phases | Dependencies still valid |
| Modify duration | Total migration window updated |

### 4. Apply Rollback Changes (if applicable)

If updating rollback procedures:

| Change Type | Validation |
|-------------|------------|
| Add failure scenario | Rollback procedure defined |
| Update procedure | Tested in staging |
| Change decision criteria | Approval obtained |

### 5. Apply Communication Changes (if applicable)

If revising communication plan:

| Change Type | Validation |
|-------------|------------|
| Add stakeholder | Contact info verified |
| Update templates | Templates created |
| Change channels | Access verified |

### 6. Validate Changes

After applying changes, validate:

- [ ] All modified sections are internally consistent
- [ ] Cross-references between sections are valid
- [ ] Phase dependencies remain valid
- [ ] Rollback procedures cover all phases
- [ ] Timing estimates are realistic
- [ ] Communication plan covers all scenarios

### 7. Document Change History

Add change log entry:

```
## Change Log

| Date | Section | Change | Author | Rationale |
|------|---------|--------|--------|-----------|
| {date} | {section} | {description} | {author} | {reason} |
```

---

## COLLABORATION MENUS (A/P/C):

After applying changes, present the user with:

```
Your options:
- **A (Advanced Elicitation)**: Deep dive into change impact and validation
- **P (Party Mode)**: Bring analyst and architect perspectives for change review
- **C (Continue)**: Accept changes and finalize migration plan update
- **[Specific refinements]**: Describe what you'd like to explore further

Select an option:
```

### PROTOCOL INTEGRATION:

#### If 'A' (Advanced Elicitation):
- Invoke the `bmad-advanced-elicitation` skill
- Pass change context: modifications applied, impact analysis
- Process enhanced insights from deep questioning
- Ask user: "Accept these enhanced findings? (y/n)"
- If yes, integrate into change validation
- Return to A/P/C menu

#### If 'P' (Party Mode):
- Invoke the `bmad-party-mode` skill
- Context: "Review migration plan changes: {summary of modifications and impact}"
- Process collaborative analysis from analyst and architect personas
- Present synthesized recommendations
- Ask user: "Accept these recommendations? (y/n)"
- Return to A/P/C menu

#### If 'C' (Continue):
- Save updated migration plan
- Update frontmatter `stepsCompleted: [10, 11]`
- Suggest validation mode if significant changes

---

## Verification

- [ ] All targeted changes applied
- [ ] Document consistency verified
- [ ] Dependencies updated
- [ ] Change log updated
- [ ] No orphaned references
- [ ] Patterns align with pattern registry

---

## Outputs

- Updated migration runbook
- Change log entry
- Impact analysis (if significant changes)

---

## Next Step

If changes are significant, proceed to Validate mode (`step-20-v-load-migration.md`) to verify completeness.

Otherwise, migration plan update complete.
