# Step 2: Update DR Plan

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

Apply targeted modifications to the existing disaster recovery plan based on the scope confirmed in the previous step, ensuring changes align with disaster recovery patterns and maintain plan integrity.

## Prerequisites

- DR plan loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: disaster-recovery
- **Load template:** `{project-root}/_bmad/bam/templates/disaster-recovery-plan-template.md`


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
| RTO/RPO adjustment | SLA compliance, cost implications |
| Backup frequency change | Storage costs, RPO alignment |
| Failover architecture | Complexity, recovery time |
| Contact updates | Communication effectiveness |
| Procedure changes | Training requirements |

### 2. Apply Section Updates

For each section marked for modification:

**RTO/RPO Objectives:**
- Update tier-specific targets
- Verify alignment with SLA commitments
- Recalculate max monthly downtime
- Update service criticality mappings

**Backup Strategy:**
- Modify backup frequency or retention
- Update storage locations or encryption
- Adjust verification procedures
- Recalculate storage costs

**Failover Architecture:**
- Update component configurations
- Modify failover triggers or thresholds
- Revise failover/failback procedures
- Update replication monitoring

**Recovery Procedures:**
- Refine step-by-step actions
- Update owners and checkpoints
- Adjust phase timing estimates
- Add or remove procedure steps

**Testing Schedule:**
- Reschedule test dates
- Update test types or scope
- Modify participant lists
- Adjust test acceptance criteria

**Communication Plan:**
- Update contact information
- Modify notification channels
- Revise message templates
- Update escalation paths

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| RTO alignment | Failover time <= RTO target |
| RPO alignment | Backup frequency <= RPO target |
| Tier consistency | All tiers have complete coverage |
| Contact validity | All contacts are current |
| Procedure completeness | All phases have defined steps |

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
- **A4**: Assess training requirements for procedure changes
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
- **C3**: Load `step-20-v-load-dr-plan.md` to validate updated plan

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes align with DR patterns
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] No orphaned references
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/disaster-recovery-plan.md`
- Change summary for audit trail

## Next Step

This completes the Edit mode. Run `step-20-v-load-dr-plan.md` to enter Validate mode and verify the updated DR plan maintains compliance with quality criteria.

## Quality Gate Summary

Review the updated DR plan:
- All changes applied correctly
- Internal consistency maintained
- Alignment with tier capabilities
- Realistic RTO/RPO targets preserved
