# Step 11: Apply Certification Program Changes

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

Apply targeted modifications to the existing partner certification program based on the scope confirmed in the previous step, ensuring changes align with partner ecosystem patterns and maintain program integrity.

## Prerequisites

- Certification program loaded (Step 10)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` -> filter: partner-ecosystem
- **Load template:** `{project-root}/_bmad/bam/templates/partner-certification-template.md`


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
| Tier structure change | Existing partner migration, benefit updates |
| Technical requirement change | Partner re-assessment, API updates |
| Assessment process change | Scoring recalibration, fairness review |
| Renewal procedure change | Timeline communication, fee adjustments |
| Maintenance requirement change | SLA updates, monitoring changes |

### 2. Apply Section Updates

For each section marked for modification:

**Tier Structure:**
- Add or modify tier definitions
- Update benefits matrix
- Adjust progression requirements
- Revise branding guidelines

**Technical Requirements:**
- Update API compatibility requirements
- Modify security standards
- Adjust performance thresholds
- Add new integration requirements

**Business Requirements:**
- Revise revenue thresholds
- Update training requirements
- Modify support commitments
- Adjust documentation standards

**Assessment Process:**
- Recalibrate scoring weights
- Update pass/fail thresholds
- Modify assessment timeline
- Add new assessment criteria

**Renewal Procedures:**
- Adjust renewal timelines
- Modify fee structure
- Update maintenance requirements
- Revise downgrade criteria

### 3. Validate Cross-References

After applying changes, verify consistency:

| Check | Validation |
|-------|------------|
| Tier progression | Requirements align across tiers |
| Assessment alignment | Criteria match requirements |
| Renewal consistency | Maintenance supports renewal |
| Benefit alignment | Benefits match tier level |
| Timeline consistency | All processes have realistic timelines |

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

**Partner Communication Plan:**
| Change | Affected Partners | Communication | Timeline |
|--------|-------------------|---------------|----------|
| {Change} | {Tiers affected} | {Method} | {When} |

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
- **A4**: Assess partner communication requirements
- **A5**: Review version history and change tracking

### [P]ropose Changes
- **P1**: Propose additional section updates based on impact analysis
- **P2**: Suggest cross-reference fixes for consistency
- **P3**: Recommend metadata updates
- **P4**: Propose enhanced change documentation
- **P5**: Suggest partner transition plan

### [C]ontinue
- **C1**: Accept applied changes and complete Edit mode
- **C2**: Mark step complete and proceed to validation
- **C3**: Load `step-20-v-load-certification-program.md` to validate updated program

**Enter your choice (e.g., A1, P2, C1):**

---

## Verification

- [ ] All identified sections updated
- [ ] Changes align with partner ecosystem patterns
- [ ] Cross-references validated
- [ ] Document metadata updated
- [ ] Change summary documented
- [ ] Partner communication plan created
- [ ] Patterns align with pattern registry

## Outputs

- Updated `{output_folder}/planning-artifacts/partner-certification-program.md`
- Change summary for audit trail
- Partner communication plan

## Next Step

This completes the Edit mode. Run `step-20-v-load-certification-program.md` to enter Validate mode and verify the updated certification program maintains compliance with completeness criteria.

## Quality Gate Summary

Review the updated certification program:
- All changes applied correctly
- Internal consistency maintained
- Tier differentiation preserved
- Assessment criteria aligned with requirements
