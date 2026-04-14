# Step 11: Apply HIPAA Compliance Changes

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

Apply the confirmed modifications to the HIPAA compliance specification, ensuring changes maintain regulatory alignment and document consistency.

## Prerequisites

- HIPAA specification loaded (Step 10 complete)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: HIPAA


---

## Inputs

- Loaded HIPAA compliance specification
- Confirmed modification requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Section-Specific Changes

For each section identified in Step 10, apply modifications:

| Section | Change Type | Validation Required |
|---------|-------------|---------------------|
| PHI Inventory | Add/Remove/Update | PHI classification check |
| Safeguards | Control update | HIPAA reference verify |
| BAA Management | Procedure update | Legal review flag |
| Breach Notification | Timeline update | Regulatory compliance |

### 2. Update Cross-References

Ensure all internal references remain valid:

| Reference Type | Check | Action |
|----------------|-------|--------|
| Control mappings | Safeguard to regulation | Update if needed |
| PHI to safeguard | Data to control | Verify coverage |
| BAA to vendor | Agreement to entity | Validate linkage |
| Timeline references | Dates and periods | Update calculations |

### 3. Document Change History

Record all modifications:

| Change ID | Section | Description | Date | Author |
|-----------|---------|-------------|------|--------|
| CHG-001 | {Section} | {Description} | {Date} | {Author} |

### 4. Validate Regulatory Alignment

Verify changes maintain HIPAA compliance:

| HIPAA Requirement | Status | Notes |
|-------------------|--------|-------|
| 164.308 Administrative | {Pass/Fail} | {Notes} |
| 164.310 Physical | {Pass/Fail} | {Notes} |
| 164.312 Technical | {Pass/Fail} | {Notes} |
| 164.504 BAA | {Pass/Fail} | {Notes} |

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

### [A] Analyse - Change Impact Analysis
- **A1**: Analyze impact of PHI inventory changes on safeguards
- **A2**: Evaluate safeguard changes for regulatory compliance
- **A3**: Assess BAA procedure changes for legal adequacy
- **A4**: Review cross-reference consistency after changes

### [P] Propose - Change Recommendations
- **P1**: Propose additional changes to improve compliance posture
- **P2**: Suggest safeguard enhancements based on changes
- **P3**: Recommend documentation improvements
- **P4**: Propose validation testing for changes

### [C] Continue - Workflow Navigation
- **C1**: Save changes and export updated specification
- **C2**: Switch to Validate Mode - load `step-20-v-load-hipaa.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] All requested changes applied
- [ ] Cross-references updated and valid
- [ ] Change history documented
- [ ] Regulatory alignment verified
- [ ] Patterns align with pattern registry

## Outputs

- Updated HIPAA compliance specification
- Change history log
- Regulatory alignment verification results
- Updated document to `{output_folder}/planning-artifacts/hipaa-compliance-spec.md`

## Next Step

Edit mode complete. Options:
- Switch to Validate mode (`step-20-v-load-hipaa.md`) to verify changes
- Return to Edit mode for additional changes
- Exit workflow
