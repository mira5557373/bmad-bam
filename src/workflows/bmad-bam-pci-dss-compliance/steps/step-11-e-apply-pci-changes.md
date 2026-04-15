# Step 11: Apply PCI-DSS Compliance Changes

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

Apply the confirmed modifications to the PCI-DSS compliance specification, ensuring changes maintain regulatory alignment and document consistency.

## Prerequisites

- PCI-DSS specification loaded (Step 10 complete)
- Modification scope confirmed
- **Load patterns:** `{project-root}/_bmad/bam/data/bam-patterns.csv` → filter: compliance
- **Load patterns:** `{project-root}/_bmad/bam/data/compliance-frameworks.csv` → filter: PCI-DSS


---

## Inputs

- Loaded PCI-DSS compliance specification
- Confirmed modification requirements
- Pattern registry: `{project-root}/_bmad/bam/data/bam-patterns.csv`

---

## Actions

### 1. Apply Section-Specific Changes

For each section identified in Step 10, apply modifications:

| Section | Change Type | Validation Required |
|---------|-------------|---------------------|
| CDE Scope | Add/Remove/Update | Segmentation impact |
| Security Controls | Control update | PCI reference verify |
| Tenant Isolation | Design update | Isolation integrity |
| Compliance Monitoring | Process update | Coverage check |

### 2. Update Cross-References

Ensure all internal references remain valid:

| Reference Type | Check | Action |
|----------------|-------|--------|
| Control mappings | Requirement to implementation | Update if needed |
| CDE to controls | System to control | Verify coverage |
| Tenant to controls | Isolation to requirement | Validate linkage |
| Testing references | Scope and frequency | Update schedule |

### 3. Document Change History

Record all modifications:

| Change ID | Section | Description | Date | Author |
|-----------|---------|-------------|------|--------|
| CHG-001 | {Section} | {Description} | {Date} | {Author} |

### 4. Validate Regulatory Alignment

Verify changes maintain PCI-DSS compliance:

| PCI-DSS Requirement | Status | Notes |
|---------------------|--------|-------|
| Req 1-2 (Network) | {Pass/Fail} | {Notes} |
| Req 3-4 (Data Protection) | {Pass/Fail} | {Notes} |
| Req 5-6 (Vulnerability) | {Pass/Fail} | {Notes} |
| Req 7-9 (Access Control) | {Pass/Fail} | {Notes} |
| Req 10-11 (Monitoring) | {Pass/Fail} | {Notes} |
| Req 12 (Policy) | {Pass/Fail} | {Notes} |

---

## COLLABORATION MENUS (A/P/C)

- **[A] Advanced Elicitation**: Deep dive into requirements, explore alternatives
- **[P] Party Mode**: Collaborative brainstorming, creative exploration
- **[C] Continue**: Proceed to next step with current decisions

### Menu Options

### [A] Analyse - Change Impact Analysis
- **A1**: Analyze CDE scope change impact on controls
- **A2**: Evaluate control changes for compliance
- **A3**: Assess tenant isolation changes for security
- **A4**: Review cross-reference consistency after changes

### [P] Propose - Change Recommendations
- **P1**: Propose additional changes to improve compliance
- **P2**: Suggest control enhancements based on changes
- **P3**: Recommend documentation improvements
- **P4**: Propose validation testing for changes

### [C] Continue - Workflow Navigation
- **C1**: Save changes and export updated specification
- **C2**: Switch to Validate Mode - load `step-20-v-load-pci.md`
- **C3**: Return to workflow overview

---

## Verification

- [ ] All requested changes applied
- [ ] Cross-references updated and valid
- [ ] Change history documented
- [ ] Regulatory alignment verified
- [ ] Patterns align with pattern registry

## Outputs

- Updated PCI-DSS compliance specification
- Change history log
- Regulatory alignment verification results
- Updated document to `{output_folder}/planning-artifacts/pci-dss-compliance-spec.md`

## Next Step

Edit mode complete. Options:
- Switch to Validate mode (`step-20-v-load-pci.md`) to verify changes
- Return to Edit mode for additional changes
- Exit workflow
