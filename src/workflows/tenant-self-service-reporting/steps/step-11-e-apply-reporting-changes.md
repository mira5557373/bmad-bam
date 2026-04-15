# Step 2: Update Reporting Design

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

Apply targeted modifications to the existing tenant self-service reporting design based on the scope confirmed in the previous step, ensuring changes align with reporting patterns and maintain design integrity.

## Prerequisites

- Reporting design loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: reporting
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`


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
| Report type changes | Data source access, tier value |
| Builder capability changes | User experience, performance |
| Scheduling changes | System load, user expectations |
| Export format changes | Integration requirements |
| Security changes | Compliance, access control |

### 2. Apply Section Updates

For each section marked for modification:

**Report Types:**
- Add or remove report types
- Modify tier availability
- Update data source mappings
- Adjust retention periods

**Report Builder:**
- Modify capability limits
- Add or remove features
- Update performance guardrails
- Adjust tier differentiation

**Scheduling:**
- Update frequency options
- Modify quotas per tier
- Add notification channels
- Adjust execution limits

**Export Formats:**
- Add or remove formats
- Modify delivery channels
- Update security requirements
- Adjust size limits

**Security:**
- Update encryption settings
- Modify access control rules
- Add compliance requirements
- Update audit logging

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| Tier alignment | All tiers have consistent coverage |
| Data source access | Builder fields match report types |
| Quota consistency | Scheduling aligns with tier value |
| Security coverage | All channels have security settings |
| Feature parity | Enterprise >= Pro >= Free |

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
- **A4**: Assess tier alignment after modifications
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
- **C3**: Load `step-20-v-load-reporting-design.md` to validate updated design

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes align with reporting patterns
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] No orphaned references
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/tenant-self-service-reporting.md`
- Change summary for audit trail
- **Load template:** `{project-root}/_bmad/bam/data/templates/tenant-self-service-reporting-template.md`

## Next Step

This completes the Edit mode. Run `step-20-v-load-reporting-design.md` to enter Validate mode and verify the updated reporting design maintains compliance with quality criteria.

## Quality Gate Summary

Review the updated reporting design:
- All changes applied correctly
- Internal consistency maintained
- Alignment with tier capabilities
- Data isolation requirements preserved
