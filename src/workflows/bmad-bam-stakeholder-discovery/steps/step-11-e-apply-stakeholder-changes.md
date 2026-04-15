# Step 11: Apply Stakeholder Map Changes

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

Apply targeted modifications to the existing stakeholder map based on the scope confirmed in the previous step, ensuring changes align with governance patterns and maintain documentation integrity.

## Prerequisites

- Stakeholder map loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: governance
- **Load template:** `{project-root}/_bmad/bam/data/templates/stakeholder-map-template.md`


---

## Inputs

- Loaded artifact from previous edit step
- Identified modification targets
- User-confirmed changes to apply
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Review Change Impact

Before applying changes, assess impact:

| Change Type | Impact Assessment |
|-------------|-------------------|
| Stakeholder addition | Communication plan update, RACI review |
| Stakeholder removal | Responsibility reassignment, gap analysis |
| Category change | Communication cadence adjustment |
| RACI update | Decision authority changes, notification |
| Contact update | Communication channel verification |

### 2. Apply Section Updates

For each section marked for modification:

**Stakeholder Registry:**
- Add new stakeholders with complete information
- Update contact details for existing stakeholders
- Remove departed stakeholders
- Reassign responsibilities

**Interest-Influence Matrix:**
- Update interest levels for changed circumstances
- Revise influence assessments
- Recategorize stakeholders in matrix quadrants
- Update engagement strategies

**Communication Plan:**
- Modify communication cadence
- Update channel preferences
- Revise templates
- Reschedule touchpoints

**RACI Matrix:**
- Reassign roles for affected decisions
- Add new decision categories
- Remove obsolete decisions
- Update decision workflows

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| All stakeholders referenced | No orphan references in RACI |
| Categories consistent | Interest matrix matches registry |
| Communication coverage | All stakeholders have defined channels |
| RACI completeness | One A per decision, no gaps |

### 4. Update Document Metadata

Update document tracking information:
- Increment version number
- Update modification date
- Document change summary
- Update next review date

### 5. Generate Change Summary

Create change documentation:

| Section | Previous Value | New Value | Rationale |
|---------|---------------|-----------|-----------|
| {Section} | {Old} | {New} | {Why} |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### PROTOCOL INTEGRATION

#### If 'A' (Advanced Elicitation):
- Conduct deeper analysis of the current step's domain
- Present additional options and trade-offs
- Return to checkpoint after elicitation

#### If 'P' (Party Mode):
- Enable collaborative exploration
- Generate creative alternatives
- Document insights before returning

#### If 'C' (Continue):
- Verify all outputs are complete
- Proceed to next step file

### Menu Options

### [A]nalyze Options
- **A1**: Review impact assessment for proposed changes
- **A2**: Analyze cross-reference consistency after changes
- **A3**: Evaluate change summary completeness
- **A4**: Assess communication plan updates
- **A5**: Review version history and change tracking

### [P]ropose Changes
- **P1**: Propose additional section updates based on impact analysis
- **P2**: Suggest cross-reference fixes for consistency
- **P3**: Recommend metadata updates
- **P4**: Propose enhanced change documentation
- **P5**: Suggest rollback plan if changes cause issues

### [C]ontinue
- **C1**: Accept applied changes and complete Edit mode
- **C2**: Mark step complete and proceed to validation
- **C3**: Load `step-20-v-load-stakeholder-map.md` to validate updated map

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes align with governance patterns
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] No orphaned references
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/stakeholder-map.md`
- Change summary for audit trail

## Next Step

This completes the Edit mode. Run `step-20-v-load-stakeholder-map.md` to enter Validate mode and verify the updated stakeholder map maintains compliance with completeness criteria.

## Quality Gate Summary

Review the updated stakeholder map:
- All changes applied correctly
- Internal consistency maintained
- Coverage complete for all stakeholder groups
- RACI matrix properly assigned
