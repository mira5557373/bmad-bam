# Step 2: Update Reconciliation Design

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

Apply targeted modifications to the existing data reconciliation design based on the scope confirmed in the previous step, ensuring changes align with data integrity patterns and maintain design integrity.

## Prerequisites

- Reconciliation design loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: data-integrity
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`


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
| Scope changes | Verification coverage, resource requirements |
| Verification changes | Accuracy, execution time |
| Check schedule changes | System load, detection latency |
| Alert threshold changes | False positives/negatives |
| Remediation changes | Recovery time, risk level |
| Escalation changes | Response time, coverage |

### 2. Apply Section Updates

For each section marked for modification:

**Reconciliation Scope:**
- Add or remove data assets
- Modify priority tiers
- Update data source mappings
- Adjust scope boundaries

**Verification Procedures:**
- Modify verification methods
- Update tolerances
- Add or remove checklist items
- Adjust manual steps

**Automated Checks:**
- Update check types
- Modify scheduling
- Adjust alert thresholds
- Update automated remediation rules

**Remediation Procedures:**
- Modify resolution steps
- Update rollback options
- Adjust escalation paths
- Update sign-off requirements

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| Scope coverage | All critical data assets included |
| Verification alignment | Methods support scope |
| Check coverage | Automated checks cover scope |
| Remediation coverage | Procedures exist for all categories |
| Escalation completeness | All levels have contacts |

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
- **A4**: Assess scope alignment after modifications
- **A5**: Review version history and change tracking

### [P]ropose Changes
- **P1**: Propose additional section updates based on impact analysis
- **P2**: Suggest cross-reference fixes for consistency
- **P3**: Recommend metadata updates
- **P4**: Propose enhanced change documentation
- **P5**: Suggest validation after changes

### [C]ontinue
- **C1**: Accept applied changes and complete Edit mode
- **C2**: Mark step complete and proceed to validation
- **C3**: Load `step-20-v-load-reconciliation-design.md` to validate updated design

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes align with data integrity patterns
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] No orphaned references
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/data-reconciliation-dr.md`
- Change summary for audit trail
- **Load template:** `{project-root}/_bmad/bam/templates/data-reconciliation-dr-template.md`

## Next Step

This completes the Edit mode. Run `step-20-v-load-reconciliation-design.md` to enter Validate mode and verify the updated reconciliation design maintains compliance with quality criteria.

## Quality Gate Summary

Review the updated reconciliation design:
- All changes applied correctly
- Internal consistency maintained
- Alignment with DR requirements
- Data integrity verification preserved
