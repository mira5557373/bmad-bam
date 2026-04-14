# Step 2: Update Execution Report

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

Apply targeted modifications to the existing failover execution report based on the scope confirmed in the previous step, ensuring changes maintain report integrity and accuracy.

## Prerequisites

- Execution report loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load template:** `{project-root}/_bmad/bam/templates/failover-execution-template.md`


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
| Timeline correction | Historical accuracy, audit trail |
| Exception addition | Root cause analysis completeness |
| Lesson learned addition | Future DR test improvements |
| Recommendation change | Follow-up action alignment |
| RTO/RPO update | SLA compliance reporting |

### 2. Apply Section Updates

For each section marked for modification:

**Executive Summary:**
- Update key findings
- Adjust overall assessment
- Refine impact statements
- Update action items

**Execution Timeline:**
- Correct event timestamps
- Add missing events
- Update duration calculations
- Verify sequence accuracy

**Exceptions and Resolutions:**
- Add newly discovered exceptions
- Update resolution details
- Refine root cause analysis
- Add prevention recommendations

**RTO/RPO Achievement:**
- Correct calculation errors
- Update with verified data
- Adjust tier-specific results
- Refine gap analysis

**Lessons Learned:**
- Add post-review insights
- Incorporate team feedback
- Update improvement areas
- Refine what went well

**Recommendations:**
- Add new recommendations
- Prioritize recommendations
- Assign owners
- Set deadlines

**DR Plan Updates:**
- Add update items
- Prioritize changes
- Assign implementation owners
- Set target dates

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| Timeline consistency | Events in chronological order |
| Exception references | All exceptions have resolutions |
| RTO/RPO alignment | Calculations match timeline |
| Recommendation links | Tied to lessons learned |
| Action ownership | All actions have owners |

### 4. Update Document Metadata

Update document tracking information:
- Increment version number
- Update modification date
- Document change summary
- Note reviewer/approver

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
- **A4**: Assess stakeholder communication needs
- **A5**: Review version history and change tracking

### [P]ropose Changes
- **P1**: Propose additional section updates based on impact analysis
- **P2**: Suggest cross-reference fixes for consistency
- **P3**: Recommend metadata updates
- **P4**: Propose enhanced change documentation
- **P5**: Suggest stakeholder notification plan

### [C]ontinue
- **C1**: Accept applied changes and complete Edit mode
- **C2**: Mark step complete and proceed to validation
- **C3**: Load `step-20-v-load-execution-report.md` to validate updated report

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes maintain report accuracy
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] No inconsistencies introduced
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/failover-execution-report.md`
- Change summary for audit trail

## Next Step

This completes the Edit mode. Run `step-20-v-load-execution-report.md` to enter Validate mode and verify the updated execution report maintains compliance with quality criteria.

## Quality Gate Summary

Review the updated execution report:
- All changes applied correctly
- Timeline accuracy maintained
- Lessons learned comprehensive
- Recommendations actionable
